package com.handsome.summary.service.impl;

import static run.halo.app.extension.MetadataUtil.nullSafeAnnotations;
import static run.halo.app.extension.index.query.Queries.and;
import static run.halo.app.extension.index.query.Queries.equal;
import static run.halo.app.extension.index.query.Queries.isNull;

import com.handsome.summary.extension.Summary;
import com.handsome.summary.service.AiFoundationAiService;
import com.handsome.summary.service.ArticleSummaryService;
import com.handsome.summary.service.SettingConfigGetter;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.util.HashMap;
import java.util.HexFormat;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;
import reactor.util.retry.Retry;
import run.halo.app.content.PostContentService;
import run.halo.app.core.extension.content.Post;
import run.halo.app.extension.ListOptions;
import run.halo.app.extension.Metadata;
import run.halo.app.extension.ReactiveExtensionClient;
import run.halo.app.extension.router.selector.FieldSelector;

/** 文章摘要的生成、只读查询、后端回写与批量同步。 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ArticleSummaryServiceImpl implements ArticleSummaryService {
    private final AiFoundationAiService aiFoundationAiService;
    private final SettingConfigGetter settingConfigGetter;
    private final PostContentService postContentService;
    private final ReactiveExtensionClient client;

    public static final String AI_SUMMARY_UPDATED = "summary.lik.cc/ai-summary-updated";
    public static final String AI_SUMMARY_HASH = "summary.lik.cc/ai-summary-hash";
    public static final String SUMMARY_SNAPSHOT = "summary.lik.cc/release-snapshot";
    public static final String ENABLE_BLACK_LIST = "summary.xhhao.com/enable-black-list";
    public static final String UPDATE_SUMMARY = "summary.xhhao.com/update-summary";
    public static final String DEFAULT_AI_SYSTEM_PROMPT = "你是专业摘要助手，请为以下文章生成简明摘要：";

    // 合并同一进程内同篇文章的生成请求，避免发布和批量任务重复调用 AI。
    private record GenerationResult(String text, Map<String, Object> writeResult) { }

    private final Map<String, Mono<GenerationResult>> generationTasks = new ConcurrentHashMap<>();
    private final AtomicBoolean running = new AtomicBoolean();
    private final AtomicInteger total = new AtomicInteger();
    private final AtomicInteger finished = new AtomicInteger();
    private final AtomicInteger succeeded = new AtomicInteger();
    private final AtomicInteger failed = new AtomicInteger();
    private final AtomicInteger skipped = new AtomicInteger();
    private final AtomicInteger generated = new AtomicInteger();
    private final AtomicInteger written = new AtomicInteger();
    private final AtomicInteger taskFailed = new AtomicInteger();

    @Override
    public Mono<String> getSummary(Post post) {
        return generateShared(post.getMetadata().getName()).map(GenerationResult::text);
    }

    private Mono<GenerationResult> generateShared(String name) {
        return Mono.defer(() -> {
            synchronized (generationTasks) {
                return generationTasks.computeIfAbsent(name, key -> generateAndWrite(key)
                    .doFinally(signal -> {
                        synchronized (generationTasks) {
                            generationTasks.remove(key);
                        }
                    }).cache());
            }
        });
    }

    private Mono<GenerationResult> generateAndWrite(String name) {
        return ensureEnabled().then(fetchPost(name))
            .flatMap(post -> {
                if (!eligible(post) || isProtected(post)) {
                    return Mono.empty();
                }
                var snapshot = post.getSpec().getReleaseSnapshot();
                return settingConfigGetter.getAiConfigForFunction("summary")
                    .flatMap(config -> generateSummaryWithAiConfig(post, config))
                    .filter(summary -> !summary.isBlank())
                    .switchIfEmpty(Mono.error(new IllegalStateException("AI 摘要为空或没有发布版正文")))
                    .map(String::trim)
                    .flatMap(summary -> fetchPost(name).flatMap(latest -> {
                        if (!eligible(latest) || !Objects.equals(snapshot, latest.getSpec().getReleaseSnapshot())) {
                            return Mono.error(new IllegalStateException("文章发布版已变化，请重新生成摘要"));
                        }
                        return saveSummaryToDatabase(summary, latest)
                            .then(writeSummary(name, summary, snapshot))
                            .map(result -> new GenerationResult(summary, result));
                    }));
            })
            .doOnError(error -> log.error("文章摘要生成或回写失败，文章: {}", name, error));
    }

    private Mono<Void> ensureEnabled() {
        return settingConfigGetter.getSummaryConfig().flatMap(config ->
            Boolean.FALSE.equals(config.getEnable())
                ? Mono.error(new IllegalStateException("文章摘要功能已关闭")) : Mono.empty());
    }

    private Mono<Post> fetchPost(String name) {
        return Mono.defer(() -> client.fetch(Post.class, name))
            .switchIfEmpty(Mono.error(new IllegalArgumentException("文章不存在：" + name)));
    }

    private boolean eligible(Post post) {
        return post.getSpec() != null && !post.isDeleted() && post.isPublished();
    }

    private boolean isProtected(Post post) {
        var annotations = nullSafeAnnotations(post);
        if (Boolean.parseBoolean(annotations.get(ENABLE_BLACK_LIST))
            || Boolean.parseBoolean(annotations.get(UPDATE_SUMMARY))) {
            return true;
        }
        var excerpt = post.getSpec().getExcerpt();
        if (excerpt == null || !Boolean.FALSE.equals(excerpt.getAutoGenerate())
            || excerpt.getRaw() == null || excerpt.getRaw().isBlank()) {
            return false;
        }
        var hash = annotations.get(AI_SUMMARY_HASH);
        if (hash != null) {
            // AI 回写后用户修改了摘要：即使历史成功标记仍在，也不覆盖手动内容。
            return !Objects.equals(hash, summaryHash(excerpt.getRaw()));
        }
        // 兼容旧版只有成功标记的数据；没有标记的非空手动摘要默认受保护。
        return !Boolean.parseBoolean(annotations.get(AI_SUMMARY_UPDATED));
    }

    @Override
    public Flux<Summary> findSummaryByPostName(String name) {
        var options = new ListOptions();
        options.setFieldSelector(FieldSelector.of(and(
            equal("summarySpec.postMetadataName", name), isNull("summarySpec.postSummary").not())));
        return client.listAll(Summary.class, options, Sort.by("metadata.creationTimestamp").descending())
            .filter(summary -> summary.getMetadata().getDeletionTimestamp() == null)
            .filter(summary -> summary.getSummarySpec() != null
                && summary.getSummarySpec().getPostSummary() != null
                && !summary.getSummarySpec().getPostSummary().isBlank());
    }

    @Override
    public Mono<Map<String, Object>> readSummaryContent(String name) {
        // 公开读取不写文章，不泄露草稿、私有文章或黑名单文章的摘要。
        return fetchPost(name).flatMap(post -> {
            if (!eligible(post) || !Post.isPublic(post.getSpec())
                || Boolean.parseBoolean(nullSafeAnnotations(post).get(ENABLE_BLACK_LIST))) {
                return Mono.just(response(false, "摘要不可用", "", true, false, false));
            }
            return findSummaryByPostName(name).filter(summary -> matchesSnapshot(summary, post)).next()
                .map(summary -> response(true, "成功", summary.getSummarySpec().getPostSummary(), false, false, false))
                .defaultIfEmpty(response(false, "未找到摘要内容", "", false, false, false));
        });
    }

    @Override
    public Mono<Map<String, Object>> updatePostContentWithSummary(String name) {
        return findSummaryByPostName(name).next()
            .flatMap(summary -> writeSummary(name, summary.getSummarySpec().getPostSummary(),
                nullSafeAnnotations(summary).get(SUMMARY_SNAPSHOT)))
            .defaultIfEmpty(response(false, "未找到摘要内容", "", false, false, false));
    }

    private Mono<Map<String, Object>> writeSummary(String name, String summary, String snapshot) {
        // 每次重试重新读取文章，只修改摘要字段；不重复调用模型或用旧文章覆盖其它字段。
        return fetchPost(name).flatMap(post -> {
            if (!eligible(post)) {
                return Mono.just(response(true, "文章未发布，跳过回写", summary, false, false, true));
            }
            if (snapshot != null && !Objects.equals(snapshot, post.getSpec().getReleaseSnapshot())) {
                return Mono.error(new IllegalStateException("文章发布版已变化，跳过旧摘要回写"));
            }
            if (isProtected(post)) {
                var blackList = Boolean.parseBoolean(nullSafeAnnotations(post).get(ENABLE_BLACK_LIST));
                return Mono.just(response(!blackList, "文章摘要受保护，跳过回写",
                    blackList ? "" : summary, blackList, false, true));
            }
            var excerpt = post.getSpec().getExcerpt();
            var annotations = nullSafeAnnotations(post);
            var hash = summaryHash(summary);
            if (excerpt != null && Boolean.FALSE.equals(excerpt.getAutoGenerate())
                && Objects.equals(excerpt.getRaw(), summary)
                && Objects.equals(post.getStatusOrDefault().getExcerpt(), summary)
                && "true".equals(annotations.get(AI_SUMMARY_UPDATED))
                && Objects.equals(hash, annotations.get(AI_SUMMARY_HASH))) {
                return Mono.just(response(true, "摘要内容未发生变化，无需更新", summary, false, false, false));
            }
            if (excerpt == null) {
                excerpt = new Post.Excerpt();
                post.getSpec().setExcerpt(excerpt);
            }
            excerpt.setRaw(summary);
            excerpt.setAutoGenerate(false);
            post.getStatusOrDefault().setExcerpt(summary);
            annotations.put(AI_SUMMARY_UPDATED, "true");
            annotations.put(AI_SUMMARY_HASH, hash);
            return client.update(post)
                .thenReturn(response(true, "摘要已回写", summary, false, true, false));
        }).retryWhen(writeRetry());
    }

    private Retry writeRetry() {
        return Retry.backoff(3, Duration.ofMillis(100))
            .filter(OptimisticLockingFailureException.class::isInstance)
            .onRetryExhaustedThrow((spec, signal) -> signal.failure());
    }

    private String summaryHash(String summary) {
        try {
            return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256")
                .digest(summary.getBytes(StandardCharsets.UTF_8)));
        } catch (NoSuchAlgorithmException error) {
            throw new IllegalStateException("摘要指纹计算失败", error);
        }
    }

    private Mono<String> generateSummaryWithAiConfig(Post post, SettingConfigGetter.AiConfigResult config) {
        return postContentService.getReleaseContent(post.getMetadata().getName())
            .flatMap(content -> {
                if (content.getSnapshotName() != null
                    && !Objects.equals(content.getSnapshotName(), post.getSpec().getReleaseSnapshot())) {
                    return Mono.error(new IllegalStateException("读取正文期间发布版已变化，请重新生成摘要"));
                }
                if (content.getRaw() == null || content.getRaw().isBlank()) {
                    return Mono.error(new IllegalStateException("文章发布版正文为空"));
                }
                var prompt = config.getSystemPrompt() != null ? config.getSystemPrompt() : DEFAULT_AI_SYSTEM_PROMPT;
                return aiFoundationAiService.generateText(prompt + "\n" + content.getRaw(), config);
            });
    }

    private Mono<Void> saveSummaryToDatabase(String text, Post post) {
        return Mono.defer(() -> findSummaryByPostName(post.getMetadata().getName()).next()
            .flatMap(summary -> {
                summary.getSummarySpec().setPostSummary(text);
                stampSnapshot(summary, post);
                return client.update(summary);
            })
            .switchIfEmpty(Mono.defer(() -> {
                var summary = new Summary();
                summary.setMetadata(new Metadata());
                summary.getMetadata().setGenerateName("summary-");
                var spec = new Summary.SummarySpec();
                spec.setPostMetadataName(post.getMetadata().getName());
                spec.setPostSummary(text);
                spec.setPostUrl(post.getStatusOrDefault().getPermalink());
                summary.setSummarySpec(spec);
                stampSnapshot(summary, post);
                return client.create(summary);
            }))).retryWhen(writeRetry()).then();
    }

    private void stampSnapshot(Summary summary, Post post) {
        var snapshot = post.getSpec().getReleaseSnapshot();
        if (snapshot != null) {
            nullSafeAnnotations(summary).put(SUMMARY_SNAPSHOT, snapshot);
        }
    }

    private boolean matchesSnapshot(Summary summary, Post post) {
        var snapshot = nullSafeAnnotations(summary).get(SUMMARY_SNAPSHOT);
        // 旧记录没有发布版标记，保留其可用性；新版记录则严格匹配正文版本。
        return snapshot == null || Objects.equals(snapshot, post.getSpec().getReleaseSnapshot());
    }

    @Override
    public Mono<Void> syncAllSummariesAsync() {
        return runSync(SyncMode.FILL);
    }

    @Override
    public Mono<Map<String, Object>> startSummarySync(SyncMode mode) {
        return Mono.defer(() -> {
            if (!running.compareAndSet(false, true)) {
                return Mono.error(new ResponseStatusException(HttpStatus.CONFLICT, "已有摘要同步任务正在运行"));
            }
            resetProgress();
            executeSync(mode).subscribeOn(Schedulers.boundedElastic())
                .subscribe(ignored -> { }, error -> log.error("摘要批量同步任务失败", error));
            return Mono.just(Map.<String, Object>of("accepted", true, "mode", mode.name().toLowerCase(),
                "message", "摘要同步任务已启动，请查看进度"));
        });
    }

    private Mono<Void> runSync(SyncMode mode) {
        return Mono.defer(() -> {
            if (!running.compareAndSet(false, true)) {
                return Mono.error(new ResponseStatusException(HttpStatus.CONFLICT, "已有摘要同步任务正在运行"));
            }
            resetProgress();
            return executeSync(mode);
        });
    }

    private void resetProgress() {
        total.set(0);
        finished.set(0);
        succeeded.set(0);
        failed.set(0);
        skipped.set(0);
        generated.set(0);
        written.set(0);
        taskFailed.set(0);
    }

    private Mono<Void> executeSync(SyncMode mode) {
        return ensureEnabled().thenMany(client.listAll(Post.class, new ListOptions(), Sort.unsorted()))
            .filter(this::eligible)
            .collectList()
            .flatMapMany(posts -> {
                total.set(posts.size());
                return Flux.fromIterable(posts);
            })
            .flatMap(post -> syncOne(post, mode)
                .doOnNext(result -> {
                    if (Boolean.TRUE.equals(result.get("skipped"))) {
                        skipped.incrementAndGet();
                    } else {
                        succeeded.incrementAndGet();
                    }
                    if (Boolean.TRUE.equals(result.get("updated"))) {
                        written.incrementAndGet();
                    }
                })
                .onErrorResume(error -> {
                    failed.incrementAndGet();
                    log.error("摘要同步失败，文章: {}", post.getMetadata().getName(), error);
                    return Mono.empty();
                })
                .then(Mono.fromRunnable(() -> finished.incrementAndGet())), 3)
            .then()
            .doOnError(error -> taskFailed.set(1))
            .doOnSuccess(ignored -> running.set(false))
            .doOnError(error -> running.set(false))
            .doOnCancel(() -> running.set(false));
    }

    private Mono<Map<String, Object>> syncOne(Post listedPost, SyncMode mode) {
        var name = listedPost.getMetadata().getName();
        return fetchPost(name).flatMap(post -> {
            if (!eligible(post) || isProtected(post)) {
                return Mono.just(response(true, "文章摘要受保护或未发布，跳过", "", false, false, true));
            }
            if (mode == SyncMode.REGENERATE) {
                return generateForSync(post);
            }
            return findSummaryByPostName(name).filter(summary -> matchesSnapshot(summary, post)).next()
                .flatMap(summary -> writeSummary(name, summary.getSummarySpec().getPostSummary(),
                    post.getSpec().getReleaseSnapshot()))
                .switchIfEmpty(Mono.defer(() -> mode == SyncMode.REPAIR
                    ? Mono.just(response(true, "没有已有摘要，跳过", "", false, false, true))
                    : generateForSync(post)));
        });
    }

    private Mono<Map<String, Object>> generateForSync(Post post) {
        return generateShared(post.getMetadata().getName())
            .doOnNext(result -> generated.incrementAndGet())
            .map(GenerationResult::writeResult)
            .defaultIfEmpty(response(true, "文章摘要受保护，跳过", "", false, false, true));
    }

    @Override
    public Mono<Map<String, Integer>> getSyncProgress() {
        return Mono.fromSupplier(() -> Map.of("total", total.get(), "finished", finished.get(),
            "succeeded", succeeded.get(), "failed", failed.get(), "skipped", skipped.get(),
            "generated", generated.get(), "written", written.get(), "running", running.get() ? 1 : 0,
            "taskFailed", taskFailed.get()));
    }

    private Map<String, Object> response(boolean success, String message, String content,
        boolean blackList, boolean updated, boolean skippedWrite) {
        Map<String, Object> result = new HashMap<>();
        result.put("success", success);
        result.put("message", message);
        result.put("summaryContent", content);
        result.put("available", !blackList && content != null && !content.isBlank());
        result.put("blackList", blackList);
        result.put("updated", updated);
        result.put("skipped", skippedWrite);
        return result;
    }
}
