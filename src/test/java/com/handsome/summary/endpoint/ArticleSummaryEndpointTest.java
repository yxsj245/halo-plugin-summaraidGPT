package com.handsome.summary.endpoint;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.handsome.summary.service.AiRequestSecurityService;
import com.handsome.summary.service.ArticleSummaryService;
import com.handsome.summary.service.ArticleSummaryService.SyncMode;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

class ArticleSummaryEndpointTest {
    private final ArticleSummaryService service = mock(ArticleSummaryService.class);
    private final AiRequestSecurityService security = mock(AiRequestSecurityService.class);
    private WebTestClient web;

    @BeforeEach
    void setUp() {
        web = WebTestClient.bindToRouterFunction(new ArticleSummaryEndpoint(security, service).endpoint()).build();
        when(security.secure(any())).thenReturn(Mono.empty());
        when(service.readSummaryContent("post-1")).thenReturn(Mono.just(Map.of(
            "success", true, "available", true, "summaryContent", "已有摘要")));
        when(service.startSummarySync(any())).thenReturn(Mono.just(Map.of("accepted", true)));
    }

    @Test
    @DisplayName("新 GET 和旧 POST 接口都只读摘要，不再回写文章")
    void readAndLegacyReadNeverWrite() {
        web.get().uri("/summaryContent/post-1").exchange().expectStatus().isOk()
            .expectBody().jsonPath("$.summaryContent").isEqualTo("已有摘要")
            .jsonPath("$.available").isEqualTo(true);
        web.post().uri("/updateContent").contentType(MediaType.APPLICATION_JSON).bodyValue("post-1")
            .exchange().expectStatus().isOk().expectBody().jsonPath("$.available").isEqualTo(true);
        verify(service, times(2)).readSummaryContent("post-1");
        verify(service, never()).updatePostContentWithSummary(any());
        verify(service, never()).getSummary(any());
    }

    @Test
    @DisplayName("三种同步模式均路由到后台任务，默认补齐，启动响应不是任务完成")
    void syncModesAreExplicit() {
        for (var mode : new String[] { "fill", "repair", "regenerate" }) {
            web.post().uri("/syncAll?mode=" + mode).exchange().expectStatus().isAccepted()
                .expectBody().jsonPath("$.accepted").isEqualTo(true);
        }
        web.post().uri("/syncAll").exchange().expectStatus().isAccepted();
        verify(service, times(2)).startSummarySync(SyncMode.FILL);
        verify(service).startSummarySync(SyncMode.REPAIR);
        verify(service).startSummarySync(SyncMode.REGENERATE);
    }

    @Test
    @DisplayName("非法模式与已有任务冲突返回真实 HTTP 错误")
    void invalidModeAndConflictAreNotSuccess() {
        web.post().uri("/syncAll?mode=invalid").exchange().expectStatus().isBadRequest();
        verify(service, never()).startSummarySync(any());
        when(service.startSummarySync(SyncMode.REPAIR)).thenReturn(Mono.error(
            new ResponseStatusException(HttpStatus.CONFLICT, "已有任务")));
        web.post().uri("/syncAll?mode=repair").exchange().expectStatus().isEqualTo(409);
    }

    @Test
    @DisplayName("存库或回写失败不会返回 HTTP 200 的成功文本")
    void generationFailureReturnsServerError() {
        when(service.getSummary(any())).thenReturn(Mono.error(new IllegalStateException("回写失败")));
        web.post().uri("/summaries").contentType(MediaType.APPLICATION_JSON)
            .bodyValue(Map.of("apiVersion", "content.halo.run/v1alpha1", "kind", "Post",
                "metadata", Map.of("name", "post-1")))
            .exchange().expectStatus().is5xxServerError();
    }

    @Test
    @DisplayName("安全校验失败不启动批量任务")
    void secureFailurePreventsSync() {
        when(security.secure(any())).thenReturn(Mono.error(new ResponseStatusException(HttpStatus.FORBIDDEN)));
        web.post().uri("/syncAll").exchange().expectStatus().isForbidden();
        verify(service, never()).startSummarySync(any());
    }
}
