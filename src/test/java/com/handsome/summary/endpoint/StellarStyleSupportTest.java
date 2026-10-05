package com.handsome.summary.endpoint;

import static org.assertj.core.api.Assertions.assertThat;

import com.handsome.summary.service.SettingConfigGetter;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

/**
 * 星港模式归一化逻辑的单元测试。
 *
 * <p>覆盖旧白名单行为回归、助手名称与欢迎语映射、默认文案替换与自定义保留。</p>
 */
class StellarStyleSupportTest {

    private static final String LEGACY_ASSISTANT_NAME = "智阅助手";

    @Test
    @DisplayName("摘要框风格：旧白名单逐字保留，仅 exact stellar 新增直通")
    void resolveUiStyleKeepsLegacyWhitelist() {
        assertThat(StellarStyleSupport.resolveUiStyle("simple", null)).isEqualTo("simple");
        assertThat(StellarStyleSupport.resolveUiStyle("inline", null)).isEqualTo("inline");
        assertThat(StellarStyleSupport.resolveUiStyle("classic", "custom")).isEqualTo("classic");
        assertThat(StellarStyleSupport.resolveUiStyle("note", null)).isEqualTo("simple");
        assertThat(StellarStyleSupport.resolveUiStyle("minimal", null)).isEqualTo("simple");
        assertThat(StellarStyleSupport.resolveUiStyle("stripe", null)).isEqualTo("simple");
        assertThat(StellarStyleSupport.resolveUiStyle("quiet", null)).isEqualTo("simple");
        assertThat(StellarStyleSupport.resolveUiStyle("unknown-style", null)).isEqualTo("classic");
        // 旧实现不 strip、大小写敏感：带空白或大小写不同的值一律落 classic
        assertThat(StellarStyleSupport.resolveUiStyle(" inline ", null)).isEqualTo("classic");
        assertThat(StellarStyleSupport.resolveUiStyle(" SIMPLE", null)).isEqualTo("classic");
        assertThat(StellarStyleSupport.resolveUiStyle(" STELLAR ", null)).isEqualTo("classic");
        assertThat(StellarStyleSupport.resolveUiStyle("stellar", null)).isEqualTo("stellar");
    }

    @Test
    @DisplayName("摘要框风格：null 落 simple，空串与空白串落 classic（旧口径）")
    void resolveUiStyleKeepsLegacyNullAndBlankSplit() {
        assertThat(StellarStyleSupport.resolveUiStyle(null, "custom")).isEqualTo("simple");
        assertThat(StellarStyleSupport.resolveUiStyle(null, "spotlight")).isEqualTo("simple");
        assertThat(StellarStyleSupport.resolveUiStyle(null, null)).isEqualTo("simple");
        assertThat(StellarStyleSupport.resolveUiStyle("", null)).isEqualTo("classic");
        assertThat(StellarStyleSupport.resolveUiStyle("", "spotlight")).isEqualTo("classic");
        assertThat(StellarStyleSupport.resolveUiStyle("   ", null)).isEqualTo("classic");
    }

    @Test
    @DisplayName("助手配色方案：旧白名单口径不变，stellar 直通")
    void resolveStylePresetKeepsLegacyWhitelist() {
        assertThat(StellarStyleSupport.resolveStylePreset(null)).isEqualTo("default");
        assertThat(StellarStyleSupport.resolveStylePreset("  ")).isEqualTo("default");
        assertThat(StellarStyleSupport.resolveStylePreset("graphite")).isEqualTo("graphite");
        assertThat(StellarStyleSupport.resolveStylePreset("ocean")).isEqualTo("ocean");
        assertThat(StellarStyleSupport.resolveStylePreset("azure")).isEqualTo("azure");
        assertThat(StellarStyleSupport.resolveStylePreset("forest")).isEqualTo("forest");
        assertThat(StellarStyleSupport.resolveStylePreset("rose")).isEqualTo("rose");
        assertThat(StellarStyleSupport.resolveStylePreset("custom")).isEqualTo("custom");
        assertThat(StellarStyleSupport.resolveStylePreset("unknown")).isEqualTo("default");
        assertThat(StellarStyleSupport.resolveStylePreset("stellar")).isEqualTo("stellar");
        assertThat(StellarStyleSupport.resolveStylePreset(" stellar ")).isEqualTo("stellar");
    }

    @Test
    @DisplayName("助手名称：留空或旧默认名映射为星枢领航员，自定义名称保留")
    void normalizeAssistantNameMapsOnlyLegacyDefault() {
        assertThat(StellarStyleSupport.normalizeAssistantName(null))
            .isEqualTo(StellarStyleSupport.ASSISTANT_NAME);
        assertThat(StellarStyleSupport.normalizeAssistantName("   "))
            .isEqualTo(StellarStyleSupport.ASSISTANT_NAME);
        assertThat(StellarStyleSupport.normalizeAssistantName(LEGACY_ASSISTANT_NAME))
            .isEqualTo(StellarStyleSupport.ASSISTANT_NAME);
        assertThat(StellarStyleSupport.normalizeAssistantName(" 智阅助手 "))
            .isEqualTo(StellarStyleSupport.ASSISTANT_NAME);
        assertThat(StellarStyleSupport.normalizeAssistantName("小舟助手")).isEqualTo("小舟助手");
        assertThat(StellarStyleSupport.normalizeAssistantName(" 星海向导 "))
            .isEqualTo("星海向导");
    }

    @Test
    @DisplayName("欢迎语：留空或旧默认欢迎语换成星港文案，自定义欢迎语保留")
    void resolveWelcomeMessageMapsOnlyLegacyDefault() {
        assertThat(StellarStyleSupport.resolveWelcomeMessage(null))
            .isEqualTo(StellarStyleSupport.WELCOME_MESSAGE);
        assertThat(StellarStyleSupport.resolveWelcomeMessage("  "))
            .isEqualTo(StellarStyleSupport.WELCOME_MESSAGE);
        assertThat(StellarStyleSupport.resolveWelcomeMessage(
            new SettingConfigGetter.AssistantConfig().getWelcomeMessage()))
            .isEqualTo(StellarStyleSupport.WELCOME_MESSAGE);
        assertThat(StellarStyleSupport.resolveWelcomeMessage(
            "  你好，我是 {assistantName}。\r\n我可以帮你检索站内知识库、总结当前页，也可以带你打开相关页面。  "))
            .isEqualTo(StellarStyleSupport.WELCOME_MESSAGE);
        assertThat(StellarStyleSupport.resolveWelcomeMessage("欢迎来到本舱，{assistantName} 在此值守。"))
            .isEqualTo("欢迎来到本舱，{assistantName} 在此值守。");
    }

    @Test
    @DisplayName("有效名称先解析，再替换欢迎语占位符")
    void resolvedNameFeedsWelcomePlaceholder() {
        var defaults = new SettingConfigGetter.AssistantConfig();

        var name = StellarStyleSupport.normalizeAssistantName(LEGACY_ASSISTANT_NAME);
        var welcome = StellarStyleSupport.resolveWelcomeMessage(defaults.getWelcomeMessage())
            .replace("{assistantName}", name);
        assertThat(name).isEqualTo(StellarStyleSupport.ASSISTANT_NAME);
        assertThat(welcome).contains(StellarStyleSupport.ASSISTANT_NAME);
        assertThat(welcome).doesNotContain("{assistantName}");
        assertThat(welcome).doesNotContain(LEGACY_ASSISTANT_NAME);

        var customName = StellarStyleSupport.normalizeAssistantName("小舟助手");
        var customWelcome = StellarStyleSupport.resolveWelcomeMessage(null)
            .replace("{assistantName}", customName);
        assertThat(customName).isEqualTo("小舟助手");
        assertThat(customWelcome).contains("小舟助手");
        assertThat(customWelcome).doesNotContain("{assistantName}");
    }

    @Test
    @DisplayName("快捷问题：默认与空列表换成星港口径，自定义排列与重复保留")
    void resolveQuickQuestionsReplacesOnlyDefault() {
        var defaults = new SettingConfigGetter.AssistantConfig();
        var defaultQuestions = defaults.getQuickQuestions();

        assertThat(StellarStyleSupport.resolveQuickQuestions(defaultQuestions))
            .isEqualTo(StellarStyleSupport.QUICK_QUESTIONS);
        assertThat(StellarStyleSupport.resolveQuickQuestions(List.of()))
            .isEqualTo(StellarStyleSupport.QUICK_QUESTIONS);
        assertThat(StellarStyleSupport.resolveQuickQuestions(null))
            .isEqualTo(StellarStyleSupport.QUICK_QUESTIONS);
        // 站长的自定义排列必须保留，不能被当成默认列表
        var reordered = List.of(defaultQuestions.get(3), defaultQuestions.get(0),
            defaultQuestions.get(1), defaultQuestions.get(2));
        assertThat(StellarStyleSupport.resolveQuickQuestions(reordered)).isEqualTo(reordered);
        var duplicated = List.of(defaultQuestions.get(0), defaultQuestions.get(0),
            defaultQuestions.get(1), defaultQuestions.get(2));
        assertThat(StellarStyleSupport.resolveQuickQuestions(duplicated)).isEqualTo(duplicated);
        assertThat(StellarStyleSupport.resolveQuickQuestions(List.of("自定义问题", "再问一句")))
            .isEqualTo(List.of("自定义问题", "再问一句"));
    }

    @Test
    @DisplayName("宠物气泡：默认与空列表换成星港口径，自定义排列与重复保留")
    void resolvePetSpeechMessagesReplacesOnlyDefault() {
        var defaults = new SettingConfigGetter.AssistantConfig();
        var defaultMessages = defaults.getPetSpeechMessages();

        assertThat(StellarStyleSupport.resolvePetSpeechMessages(defaultMessages, false))
            .isEqualTo(StellarStyleSupport.PET_SPEECH_MESSAGES);
        assertThat(StellarStyleSupport.resolvePetSpeechMessages(
            defaults.getPetOnlySpeechMessages(), true))
            .isEqualTo(StellarStyleSupport.PET_ONLY_SPEECH_MESSAGES);
        assertThat(StellarStyleSupport.resolvePetSpeechMessages(List.of(), false))
            .isEqualTo(StellarStyleSupport.PET_SPEECH_MESSAGES);
        assertThat(StellarStyleSupport.resolvePetSpeechMessages(null, true))
            .isEqualTo(StellarStyleSupport.PET_ONLY_SPEECH_MESSAGES);
        var reordered = List.of(defaultMessages.get(2), defaultMessages.get(1),
            defaultMessages.get(0), defaultMessages.get(3));
        assertThat(StellarStyleSupport.resolvePetSpeechMessages(reordered, false))
            .isEqualTo(reordered);
        assertThat(StellarStyleSupport.resolvePetSpeechMessages(List.of("自定义气泡"), false))
            .isEqualTo(List.of("自定义气泡"));
    }

    @Test
    @DisplayName("星港模式判定：唯一开关是助手配色方案 stylePreset")
    void isStellarMatchesPresetOnly() {
        assertThat(StellarStyleSupport.isStellar("stellar")).isTrue();
        assertThat(StellarStyleSupport.isStellar(" stellar ")).isTrue();
        assertThat(StellarStyleSupport.isStellar("default")).isFalse();
        assertThat(StellarStyleSupport.isStellar(null)).isFalse();
        assertThat(StellarStyleSupport.isStellar("")).isFalse();
        assertThat(StellarStyleSupport.isStellar("   ")).isFalse();
        // 摘要框单独选星港导读（uiStyle=stellar）时助手不切换，静态契约断言：
        // isStellar 只接收 preset，摘要框风格经 resolveUiStyle 独立解析
        assertThat(StellarStyleSupport.resolveUiStyle("stellar", null)).isEqualTo("stellar");
    }
}
