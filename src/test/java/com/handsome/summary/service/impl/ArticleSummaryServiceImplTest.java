package com.handsome.summary.service.impl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.awaitility.Awaitility.await;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import com.handsome.summary.extension.Summary;
import com.handsome.summary.service.AiFoundationAiService;
import com.handsome.summary.service.ArticleSummaryService.SyncMode;
import com.handsome.summary.service.SettingConfigGetter;
import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Sinks;
import run.halo.app.content.ContentWrapper;
import run.halo.app.content.PostContentService;
import run.halo.app.core.extension.content.Post;
import run.halo.app.extension.Metadata;
import run.halo.app.extension.ReactiveExtensionClient;

class ArticleSummaryServiceImplTest {
    private final AiFoundationAiService ai = mock(AiFoundationAiService.class);
    private final SettingConfigGetter settings = mock(SettingConfigGetter.class);
    private final PostContentService content = mock(PostContentService.class);
    private final ReactiveExtensionClient client = mock(ReactiveExtensionClient.class);
    private ArticleSummaryServiceImpl service;
    private Post post;
    private Summary saved;

    @BeforeEach
    void setUp() {
        service = new ArticleSummaryServiceImpl(ai, settings, content, client);
        post = post("post-1", true);
        saved = summary("已有摘要");
        var config = new SettingConfigGetter.SummaryConfig();
        config.setEnable(true);
        when(settings.getSummaryConfig()).thenReturn(Mono.just(config));
        when(settings.getAiConfigForFunction("summary")).thenReturn(Mono.just(new SettingConfigGetter.AiConfigResult()));
        when(client.fetch(Post.class, "post-1")).thenAnswer(invocation -> Mono.just(post));
        when(client.listAll(eq(Summary.class), any(), any())).thenReturn(Flux.just(saved));
        when(client.listAll(eq(Post.class), any(), any())).thenReturn(Flux.just(post));
        when(client.update(any(Post.class))).thenAnswer(invocation -> Mono.just(invocation.getArgument(0)));
        when(client.update(any(Summary.class))).thenAnswer(invocation -> Mono.just(invocation.getArgument(0)));
        when(client.create(any(Summary.class))).thenAnswer(invocation -> Mono.just(invocation.getArgument(0)));
        when(content.getReleaseContent("post-1")).thenReturn(Mono.just(ContentWrapper.builder().raw("文章正文").build()));
        when(ai.generateText(any(), any())).thenReturn(Mono.just(" 新摘要 "));
    }

    @Test
    @DisplayName("前台读取不生成、不回写，重复读取始终可展示")
    void readIsSideEffectFree() {
        var first = service.readSummaryContent("post-1").block();
        var second = service.readSummaryContent("post-1").block();
        assertThat(first).containsEntry("success", true).containsEntry("available", true)
            .containsEntry("summaryContent", "已有摘要");
        assertThat(second).isEqualTo(first);
        verify(client, never()).update(any(Post.class));
        verify(client, never()).update(any(Summary.class));
        verifyNoInteractions(ai, content);
    }

    @Test
    @DisplayName("草稿、私有和黑名单文章的摘要不能通过公开接口读取")
    void readHidesUnpublishedAndPrivatePosts() {
        post.getMetadata().getLabels().put(Post.PUBLISHED_LABEL, "false");
        assertThat(service.readSummaryContent("post-1").block()).containsEntry("available", false);
        post.getMetadata().getLabels().put(Post.PUBLISHED_LABEL, "true");
        post.getSpec().setVisible(Post.VisibleEnum.PRIVATE);
        assertThat(service.readSummaryContent("post-1").block()).containsEntry("available", false);
        post.getSpec().setVisible(Post.VisibleEnum.PUBLIC);
        post.getMetadata().getAnnotations().put(ArticleSummaryServiceImpl.ENABLE_BLACK_LIST, "true");
        assertThat(service.readSummaryContent("post-1").block()).containsEntry("available", false);
    }

    @Test
    @DisplayName("缺失、空白或已删除的摘要不会当成正文")
    void readMissingAndBlankSummary() {
        when(client.listAll(eq(Summary.class), any(), any())).thenReturn(Flux.empty());
        assertThat(service.readSummaryContent("post-1").block())
            .containsEntry("available", false).containsEntry("summaryContent", "");
        saved.getSummarySpec().setPostSummary("  ");
        when(client.listAll(eq(Summary.class), any(), any())).thenReturn(Flux.just(saved));
        assertThat(service.readSummaryContent("post-1").block()).containsEntry("available", false);
    }

    @Test
    @DisplayName("生成后存库并立即回写，无需访客打开文章")
    void generateWritesPostAndNormalizesText() {
        assertThat(service.getSummary(post).block()).isEqualTo("新摘要");
        assertThat(saved.getSummarySpec().getPostSummary()).isEqualTo("新摘要");
        assertThat(post.getSpec().getExcerpt().getRaw()).isEqualTo("新摘要");
        assertThat(post.getSpec().getExcerpt().getAutoGenerate()).isFalse();
        assertThat(post.getStatus().getExcerpt()).isEqualTo("新摘要");
        assertThat(post.getMetadata().getAnnotations()).containsEntry(ArticleSummaryServiceImpl.AI_SUMMARY_UPDATED, "true");
        assertThat(post.getMetadata().getAnnotations().get(ArticleSummaryServiceImpl.AI_SUMMARY_HASH)).hasSize(64);
        var order = inOrder(client);
        order.verify(client).update(saved);
        order.verify(client).update(post);
    }

    @Test
    @DisplayName("没有已有记录时创建摘要，空 excerpt 和 status 可安全回写")
    void createsNewSummaryAndInitializesNullFields() {
        when(client.listAll(eq(Summary.class), any(), any())).thenReturn(Flux.empty());
        post.getSpec().setExcerpt(null);
        post.setStatus(null);
        assertThat(service.getSummary(post).block()).isEqualTo("新摘要");
        verify(client).create(any(Summary.class));
        assertThat(post.getSpec().getExcerpt().getRaw()).isEqualTo("新摘要");
        assertThat(post.getStatus().getExcerpt()).isEqualTo("新摘要");
    }

    @Test
    @DisplayName("相同摘要回写幂等，返回成功且不重复写数据库")
    void unchangedIsSuccessful() {
        service.updatePostContentWithSummary("post-1").block();
        clearInvocations(client);
        var result = service.updatePostContentWithSummary("post-1").block();
        assertThat(result).containsEntry("success", true).containsEntry("available", true)
            .containsEntry("updated", false);
        verify(client, never()).update(any(Post.class));
    }

    @Test
    @DisplayName("旧成功标记即使存在也要补齐空摘要和新增指纹")
    void legacyFlagDoesNotSkipRepair() {
        post.getMetadata().getAnnotations().put(ArticleSummaryServiceImpl.AI_SUMMARY_UPDATED, "true");
        post.getSpec().setExcerpt(null);
        service.syncAllSummariesAsync().block();
        assertThat(post.getSpec().getExcerpt().getRaw()).isEqualTo("已有摘要");
        assertThat(service.getSyncProgress().block()).containsEntry("finished", 1)
            .containsEntry("succeeded", 1).containsEntry("written", 1).containsEntry("generated", 0);
        verifyNoInteractions(ai);
    }

    @Test
    @DisplayName("已有非空手动摘要或保护标记不会被覆盖或浪费 AI 调用")
    void protectsManualAndBlacklistedPosts() {
        post.getSpec().getExcerpt().setAutoGenerate(false);
        post.getSpec().getExcerpt().setRaw("我的手动摘要");
        assertThat(service.getSummary(post).block()).isNull();
        assertThat(service.updatePostContentWithSummary("post-1").block()).containsEntry("skipped", true);
        post.getSpec().getExcerpt().setAutoGenerate(true);
        post.getMetadata().getAnnotations().put(ArticleSummaryServiceImpl.UPDATE_SUMMARY, "true");
        assertThat(service.getSummary(post).block()).isNull();
        post.getMetadata().getAnnotations().remove(ArticleSummaryServiceImpl.UPDATE_SUMMARY);
        post.getMetadata().getAnnotations().put(ArticleSummaryServiceImpl.ENABLE_BLACK_LIST, "true");
        assertThat(service.getSummary(post).block()).isNull();
        verifyNoInteractions(ai, content);
        verify(client, never()).update(any(Post.class));
    }

    @Test
    @DisplayName("AI 回写后用户手动修改内容，历史标记不能绕过保护")
    void fingerprintProtectsLaterManualEdits() {
        service.updatePostContentWithSummary("post-1").block();
        post.getSpec().getExcerpt().setRaw("用户修改后的摘要");
        assertThat(service.updatePostContentWithSummary("post-1").block()).containsEntry("skipped", true);
        assertThat(service.getSummary(post).block()).isNull();
        assertThat(post.getSpec().getExcerpt().getRaw()).isEqualTo("用户修改后的摘要");
        verifyNoInteractions(ai);
    }

    @Test
    @DisplayName("关闭摘要功能、草稿和已删除文章不调用模型")
    void disabledOrUnpublishedSkipsGeneration() {
        var config = new SettingConfigGetter.SummaryConfig();
        config.setEnable(false);
        when(settings.getSummaryConfig()).thenReturn(Mono.just(config));
        assertThatThrownBy(() -> service.getSummary(post).block()).hasMessageContaining("功能已关闭");
        config.setEnable(true);
        post.getMetadata().getLabels().put(Post.PUBLISHED_LABEL, "false");
        assertThat(service.getSummary(post).block()).isNull();
        post.getMetadata().getLabels().put(Post.PUBLISHED_LABEL, "true");
        post.getSpec().setDeleted(true);
        assertThat(service.getSummary(post).block()).isNull();
        verifyNoInteractions(ai);
    }

    @Test
    @DisplayName("存库、回写失败和 AI 空完成必须传播错误，不返回假成功")
    void failuresAreNotSuccessfulText() {
        when(client.update(any(Summary.class))).thenReturn(Mono.error(new IllegalStateException("存库失败")));
        assertThatThrownBy(() -> service.getSummary(post).block()).hasMessageContaining("存库失败");
        when(client.update(any(Summary.class))).thenReturn(Mono.just(saved));
        when(client.update(any(Post.class))).thenReturn(Mono.error(new IllegalStateException("回写失败")));
        assertThatThrownBy(() -> service.getSummary(post).block()).hasMessageContaining("回写失败");
        when(ai.generateText(any(), any())).thenReturn(Mono.empty());
        post.getSpec().getExcerpt().setAutoGenerate(true);
        assertThatThrownBy(() -> service.getSummary(post).block()).hasMessageContaining("AI 摘要为空");
    }

    @Test
    @DisplayName("文章版本冲突时重新 fetch，保留其它字段，不再次调用 AI")
    void retryRefetchesLatestPost() {
        var latest = post("post-1", true);
        latest.getSpec().setTitle("别人修改的新标题");
        when(client.fetch(Post.class, "post-1")).thenReturn(Mono.just(post), Mono.just(latest));
        when(client.update(any(Post.class))).thenReturn(
            Mono.error(new OptimisticLockingFailureException("并发修改")), Mono.just(latest));
        service.updatePostContentWithSummary("post-1").block();
        assertThat(latest.getSpec().getTitle()).isEqualTo("别人修改的新标题");
        assertThat(latest.getSpec().getExcerpt().getRaw()).isEqualTo("已有摘要");
        verify(client, times(2)).fetch(Post.class, "post-1");
        verifyNoInteractions(ai);
    }

    @Test
    @DisplayName("AI 生成期间重新发布，不把旧正文的摘要写入新发布版")
    void changedSnapshotRejectsOldGeneration() {
        var output = Sinks.<String>one();
        when(ai.generateText(any(), any())).thenReturn(output.asMono());
        var failure = new AtomicReference<Throwable>();
        service.getSummary(post).subscribe(ignored -> { }, failure::set);
        post.getSpec().setReleaseSnapshot("release-2");
        output.tryEmitValue("旧正文的摘要");
        assertThat(failure.get()).hasMessageContaining("发布版已变化");
        verify(client, never()).update(any(Summary.class));
        verify(client, never()).update(any(Post.class));
    }

    @Test
    @DisplayName("发布与批量请求并发时，同篇文章只调用一次模型且任务完成后可再生成")
    void coalescesConcurrentGeneration() {
        var output = Sinks.<String>one();
        when(ai.generateText(any(), any())).thenReturn(output.asMono());
        var result1 = new AtomicReference<String>();
        var result2 = new AtomicReference<String>();
        service.getSummary(post).subscribe(result1::set);
        service.getSummary(post).subscribe(result2::set);
        output.tryEmitValue("合并生成摘要");
        assertThat(result1.get()).isEqualTo("合并生成摘要");
        assertThat(result2.get()).isEqualTo(result1.get());
        verify(ai, times(1)).generateText(any(), any());
        service.getSummary(post).block();
        verify(ai, times(2)).generateText(any(), any());
    }

    @Test
    @DisplayName("批量补齐只对缺失记录调用 AI，草稿不计入总数")
    void fillOnlyGeneratesMissingAndExcludesDrafts() {
        when(client.listAll(eq(Summary.class), any(), any())).thenReturn(Flux.empty());
        when(client.listAll(eq(Post.class), any(), any())).thenReturn(Flux.fromIterable(List.of(post, post("draft", false))));
        service.syncAllSummariesAsync().block();
        assertThat(service.getSyncProgress().block()).containsEntry("total", 1).containsEntry("finished", 1)
            .containsEntry("succeeded", 1).containsEntry("generated", 1).containsEntry("written", 1)
            .containsEntry("running", 0);
        verify(ai, times(1)).generateText(any(), any());
    }

    @Test
    @DisplayName("仅回写已有摘要，不调用 AI；缺失记录计入跳过")
    void repairDoesNotInvokeAi() {
        when(client.listAll(eq(Summary.class), any(), any())).thenReturn(Flux.empty());
        service.startSummarySync(SyncMode.REPAIR).block();
        awaitFinished();
        assertThat(service.getSyncProgress().block()).containsEntry("skipped", 1)
            .containsEntry("generated", 0).containsEntry("written", 0);
        verifyNoInteractions(ai);
    }

    @Test
    @DisplayName("强制生成即使有历史标记与已有摘要也会调用 AI")
    void regenerateDoesNotTrustHistoricalFlag() {
        post.getMetadata().getAnnotations().put(ArticleSummaryServiceImpl.AI_SUMMARY_UPDATED, "true");
        service.startSummarySync(SyncMode.REGENERATE).block();
        awaitFinished();
        assertThat(service.getSyncProgress().block()).containsEntry("generated", 1).containsEntry("written", 1);
        assertThat(saved.getSummarySpec().getPostSummary()).isEqualTo("新摘要");
    }

    @Test
    @DisplayName("批量存库失败计入失败而不是成功，已完成数保持一致")
    void batchCountsActualFailure() {
        when(client.listAll(eq(Summary.class), any(), any())).thenReturn(Flux.empty());
        when(client.create(any(Summary.class))).thenReturn(Mono.error(new IllegalStateException("数据库失败")));
        service.syncAllSummariesAsync().block();
        assertThat(service.getSyncProgress().block()).containsEntry("finished", 1)
            .containsEntry("failed", 1).containsEntry("succeeded", 0).containsEntry("running", 0);
    }

    @Test
    @DisplayName("已有记录属于旧发布版时不展示，补齐模式重新生成当前发布版")
    void staleSnapshotIsNotDisplayedOrReused() {
        saved.getMetadata().setAnnotations(new HashMap<>(Map.of(
            ArticleSummaryServiceImpl.SUMMARY_SNAPSHOT, "old-release")));
        assertThat(service.readSummaryContent("post-1").block()).containsEntry("available", false);
        service.syncAllSummariesAsync().block();
        assertThat(saved.getMetadata().getAnnotations())
            .containsEntry(ArticleSummaryServiceImpl.SUMMARY_SNAPSHOT, "release-1");
        assertThat(post.getSpec().getExcerpt().getRaw()).isEqualTo("新摘要");
        verify(ai).generateText(any(), any());
    }

    @Test
    @DisplayName("仅回写模式确实更新已有记录，不调用 AI")
    void repairWritesExistingRecord() {
        service.startSummarySync(SyncMode.REPAIR).block();
        awaitFinished();
        assertThat(post.getSpec().getExcerpt().getRaw()).isEqualTo("已有摘要");
        assertThat(service.getSyncProgress().block()).containsEntry("written", 1)
            .containsEntry("generated", 0).containsEntry("succeeded", 1);
        verifyNoInteractions(ai);
    }

    @Test
    @DisplayName("任务级列表读取失败会结束任务并保留任务失败标记")
    void listFailureEndsBatch() {
        when(client.listAll(eq(Post.class), any(), any())).thenReturn(Flux.error(new IllegalStateException("读取失败")));
        assertThatThrownBy(() -> service.syncAllSummariesAsync().block()).hasMessageContaining("读取失败");
        assertThat(service.getSyncProgress().block()).containsEntry("running", 0).containsEntry("taskFailed", 1);
    }

    @Test
    @DisplayName("持续乐观锁冲突有限重试且回写失败传播")
    void exhaustedConflictIsFailure() {
        // 模拟真实数据库返回独立对象：失败写入不能修改下一次 fetch 的存储状态。
        when(client.fetch(Post.class, "post-1")).thenAnswer(invocation -> Mono.just(post("post-1", true)));
        when(client.update(any(Post.class))).thenReturn(Mono.error(new OptimisticLockingFailureException("持续冲突")));
        assertThatThrownBy(() -> service.updatePostContentWithSummary("post-1").block())
            .isInstanceOf(OptimisticLockingFailureException.class);
        verify(client, times(4)).fetch(Post.class, "post-1");
        verifyNoInteractions(ai);
    }

    @Test
    @DisplayName("任务启动后禁止重复启动，原任务进度不会被重置")
    void rejectsDuplicateBatchStart() {
        when(client.listAll(eq(Post.class), any(), any())).thenReturn(Flux.never());
        service.startSummarySync(SyncMode.REPAIR).block();
        assertThatThrownBy(() -> service.startSummarySync(SyncMode.REPAIR).block())
            .isInstanceOf(ResponseStatusException.class).hasMessageContaining("409");
        assertThat(service.getSyncProgress().block()).containsEntry("running", 1);
    }

    private void awaitFinished() {
        await().atMost(Duration.ofSeconds(5)).untilAsserted(() ->
            assertThat(service.getSyncProgress().block()).containsEntry("running", 0));
    }

    private Post post(String name, boolean published) {
        var article = new Post();
        article.setMetadata(new Metadata());
        article.getMetadata().setName(name);
        article.getMetadata().setAnnotations(new HashMap<>());
        article.getMetadata().setLabels(new HashMap<>(Map.of(Post.PUBLISHED_LABEL, String.valueOf(published))));
        article.setSpec(new Post.PostSpec());
        article.getSpec().setReleaseSnapshot("release-1");
        article.getSpec().setDeleted(false);
        var excerpt = new Post.Excerpt();
        excerpt.setAutoGenerate(true);
        article.getSpec().setExcerpt(excerpt);
        article.getStatusOrDefault().setPermalink("/archives/" + name);
        return article;
    }

    private Summary summary(String text) {
        var item = new Summary();
        item.setMetadata(new Metadata());
        item.getMetadata().setName("summary-1");
        var spec = new Summary.SummarySpec();
        spec.setPostMetadataName("post-1");
        spec.setPostSummary(text);
        item.setSummarySpec(spec);
        return item;
    }
}
