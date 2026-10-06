package com.handsome.summary.endpoint;

import static org.springdoc.core.fn.builders.apiresponse.Builder.responseBuilder;
import static org.springdoc.core.fn.builders.parameter.Builder.parameterBuilder;

import com.handsome.summary.service.AiRequestSecurityService;
import com.handsome.summary.service.ArticleSummaryService;
import com.handsome.summary.service.ArticleSummaryService.SyncMode;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import java.util.Locale;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.webflux.core.fn.SpringdocRouteBuilder;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.server.ServerWebInputException;
import reactor.core.publisher.Mono;
import run.halo.app.core.extension.content.Post;
import run.halo.app.core.extension.endpoint.CustomEndpoint;
import run.halo.app.extension.GroupVersion;

/** 文章摘要 API，前台读取与后台生成回写分离。 */
@Slf4j
@Component
@RequiredArgsConstructor
public class ArticleSummaryEndpoint implements CustomEndpoint {
    private final AiRequestSecurityService aiRequestSecurityService;
    private final ArticleSummaryService articleSummaryService;

    @Override
    public RouterFunction<ServerResponse> endpoint() {
        final var tag = "api.summary.summaraidgpt.lik.cc/v1alpha1/ArticleSummary";
        return SpringdocRouteBuilder.route()
            .POST("summaries", this::generateSummary,
                builder -> builder.operationId("GenerateSummary").tag(tag)
                    .description("生成并回写文章 AI 摘要")
                    .response(responseBuilder().implementation(String.class)))
            .GET("findSummaries/{postName}", this::findSummary,
                builder -> builder.operationId("FindSummary").tag(tag)
                    .description("根据文章名称查询已生成的摘要记录")
                    .parameter(parameterBuilder().name("postName").in(ParameterIn.PATH).required(true)
                        .implementation(String.class))
                    .response(responseBuilder().implementation(String.class)))
            .GET("summaryContent/{postName}", this::readSummary,
                builder -> builder.operationId("ReadSummaryContent").tag(tag)
                    .description("只读查询公开文章的 AI 摘要，不生成或回写")
                    .parameter(parameterBuilder().name("postName").in(ParameterIn.PATH).required(true)
                        .implementation(String.class)))
            .POST("updateContent", this::legacyReadSummary,
                builder -> builder.operationId("UpdateContent").tag(tag)
                    .description("兼容旧前台的只读摘要查询，不再修改文章"))
            .POST("syncAll", this::syncAllSummaries,
                builder -> builder.operationId("SyncAllSummaries").tag(tag)
                    .description("启动摘要批量任务，mode 支持 fill、repair、regenerate")
                    .parameter(parameterBuilder().name("mode").in(ParameterIn.QUERY)
                        .implementation(String.class)))
            .GET("syncProgress", this::getSyncProgress,
                builder -> builder.operationId("GetSyncProgress").tag(tag)
                    .description("查询摘要任务进度与生成、回写、失败、跳过数量"))
            .build();
    }

    private Mono<ServerResponse> generateSummary(ServerRequest request) {
        return aiRequestSecurityService.secure(request)
            .then(request.bodyToMono(Post.class))
            .flatMap(articleSummaryService::getSummary)
            .flatMap(summary -> ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).bodyValue(summary))
            .switchIfEmpty(ServerResponse.noContent().build());
    }

    private Mono<ServerResponse> findSummary(ServerRequest request) {
        return articleSummaryService.findSummaryByPostName(normalizePostName(request.pathVariable("postName")))
            .collectList()
            .flatMap(summaries -> ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).bodyValue(summaries));
    }

    private Mono<ServerResponse> readSummary(ServerRequest request) {
        return respondWithSummary(normalizePostName(request.pathVariable("postName")));
    }

    private Mono<ServerResponse> legacyReadSummary(ServerRequest request) {
        return request.bodyToMono(String.class)
            .map(this::normalizePostName)
            .flatMap(this::respondWithSummary);
    }

    private Mono<ServerResponse> respondWithSummary(String name) {
        return articleSummaryService.readSummaryContent(name)
            .flatMap(result -> ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).bodyValue(result));
    }

    private String normalizePostName(String name) {
        if (name == null || name.isBlank()) {
            throw new ServerWebInputException("文章名称不能为空");
        }
        return name.trim();
    }

    private Mono<ServerResponse> syncAllSummaries(ServerRequest request) {
        return aiRequestSecurityService.secure(request).then(Mono.defer(() -> {
            final SyncMode mode;
            try {
                mode = SyncMode.valueOf(request.queryParam("mode").orElse("fill").toUpperCase(Locale.ROOT));
            } catch (IllegalArgumentException error) {
                return Mono.error(new ServerWebInputException("同步模式只能为 fill、repair 或 regenerate"));
            }
            return articleSummaryService.startSummarySync(mode)
                .flatMap(result -> ServerResponse.accepted().contentType(MediaType.APPLICATION_JSON).bodyValue(result));
        }));
    }

    private Mono<ServerResponse> getSyncProgress(ServerRequest request) {
        return articleSummaryService.getSyncProgress()
            .flatMap(progress -> ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).bodyValue(progress));
    }

    @Override
    public GroupVersion groupVersion() {
        return GroupVersion.parseAPIVersion("api.summary.summaraidgpt.lik.cc/v1alpha1");
    }
}
