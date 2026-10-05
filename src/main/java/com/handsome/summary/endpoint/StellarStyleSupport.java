package com.handsome.summary.endpoint;

import com.handsome.summary.service.SettingConfigGetter;

import java.util.List;
import org.springframework.util.StringUtils;

/**
 * 星港模式（stellar）的纯归一化逻辑。
 *
 * <p>这里只做可测的字符串与列表判定，不依赖 Spring 容器；颜色与视觉口径一律由前台读取
 * 站点样式变量，Java 侧仅提供兜底色板，保证不写死视觉效果。</p>
 *
 * @author handsome
 */
final class StellarStyleSupport {

    static final String UI_STYLE_STELLAR = "stellar";
    static final String STYLE_PRESET_STELLAR = "stellar";
    static final String ASSISTANT_NAME = "星枢领航员";
    static final String WELCOME_MESSAGE = """
        星港通讯已接通，我是 {assistantName}。
        可为你检索站内信号、梳理本舱记录，或指引下一段航线。""";
    // 下列星港默认文案需与 packages/src/rag-assistant/stellar-identity.ts 中的同名常量保持一致，
    // 否则前台会认不出这是默认列表而不再做替换，两侧文案就会打架。
    static final List<String> QUICK_QUESTIONS = List.of(
        "这座星港由谁维护？",
        "最近接收了哪些新信号？",
        "梳理当前舱段的记录",
        "为我推荐值得探索的航线"
    );
    static final List<String> PET_SPEECH_MESSAGES = List.of(
        "星港通讯在线，需要我指引航线吗？",
        "选中一段记录，我来协助解码。",
        "正在守望本站星图，随时可以发来问题。",
        "想追溯信号来源？我陪你一起找。"
    );
    static final List<String> PET_ONLY_SPEECH_MESSAGES = List.of(
        "航标已点亮，我在这里守望星港。",
        "稍作停泊，再启程也不迟。",
        "今日的星图，又多了一段记录。",
        "路过星港，记得向我打个招呼。"
    );

    private StellarStyleSupport() {
    }

    /**
     * 解析有效摘要框风格。逐字复刻旧实现的判定口径（只判 null、不 strip、大小写敏感），
     * 仅在 value 恰好等于 stellar 时新增一个直通分支。
     */
    static String resolveUiStyle(String uiStyle, String themeName) {
        if (uiStyle != null) {
            if ("simple".equals(uiStyle)) {
                return "simple";
            }
            if ("inline".equals(uiStyle)) {
                return "inline";
            }
            if (UI_STYLE_STELLAR.equals(uiStyle)) {
                return UI_STYLE_STELLAR;
            }
            if ("note".equals(uiStyle)
                || "minimal".equals(uiStyle)
                || "stripe".equals(uiStyle)
                || "quiet".equals(uiStyle)) {
                return "simple";
            }
            return "classic";
        }
        // 旧实现此处两个分支返回值相同，保留原结构以便对照
        if ("spotlight".equals(themeName)) {
            return "simple";
        }
        return "simple";
    }

    /**
     * 解析有效助手配色方案。保留既有白名单行为，仅新增 stellar 直通。
     */
    static String resolveStylePreset(String stylePreset) {
        if (!StringUtils.hasText(stylePreset)) {
            return "default";
        }
        return switch (stylePreset.strip()) {
            case "graphite", "ocean", "azure", "forest", "rose", "custom", STYLE_PRESET_STELLAR ->
                stylePreset.strip();
            default -> "default";
        };
    }

    /**
     * 助手名称归一化：站点留空或仍是旧默认名时映射为星港领航员，自定义名称完整保留。
     */
    static String normalizeAssistantName(String assistantName) {
        if (!StringUtils.hasText(assistantName)) {
            return ASSISTANT_NAME;
        }
        var value = assistantName.strip();
        return isLegacyDefaultName(value) ? ASSISTANT_NAME : value;
    }

    /**
     * 欢迎语模板选择：站点留空或仍是旧默认欢迎语时换成星港通讯文案，其余原样返回。
     */
    static String resolveWelcomeMessage(String welcomeMessage) {
        if (!StringUtils.hasText(welcomeMessage) || isLegacyDefaultWelcome(welcomeMessage)) {
            return WELCOME_MESSAGE;
        }
        return welcomeMessage.strip();
    }

    /**
     * 星港模式下的默认快捷问题；站点自定义过则原样保留。
     */
    static List<String> resolveQuickQuestions(List<String> quickQuestions) {
        if (matchesDefault(quickQuestions, defaults().getQuickQuestions())) {
            return QUICK_QUESTIONS;
        }
        return quickQuestions;
    }

    /**
     * 星港模式下的默认宠物气泡；站点自定义过则原样保留。
     */
    static List<String> resolvePetSpeechMessages(List<String> messages, boolean petOnly) {
        var defaultMessages = petOnly
            ? defaults().getPetOnlySpeechMessages()
            : defaults().getPetSpeechMessages();
        if (matchesDefault(messages, defaultMessages)) {
            return petOnly ? PET_ONLY_SPEECH_MESSAGES : PET_SPEECH_MESSAGES;
        }
        return messages;
    }

    /**
     * 判断助手是否命中星港模式。唯一开关是助手配色方案 stylePreset（去空白后精确匹配）；
     * 摘要框 uiStyle 只控制摘要框观感，不得联动助手身份与宠物口径，故此处不接收该参数。
     */
    static boolean isStellar(String stylePreset) {
        if (!StringUtils.hasText(stylePreset)) {
            return false;
        }
        return STYLE_PRESET_STELLAR.equals(stylePreset.strip());
    }

    private static SettingConfigGetter.AssistantConfig defaults() {
        return new SettingConfigGetter.AssistantConfig();
    }

    private static boolean isLegacyDefaultName(String value) {
        return value.equals(defaults().getAssistantName());
    }

    private static boolean isLegacyDefaultWelcome(String welcomeMessage) {
        if (!StringUtils.hasText(welcomeMessage)) {
            return true;
        }
        return compact(welcomeMessage).equals(compact(defaults().getWelcomeMessage()));
    }

    /**
     * 判定站点是否仍在使用内置默认列表。与前台 resolveStellarList 同口径：
     * 长度一致且逐项 trim 后按位相等；空列表视为未自定义，因此取星港默认。
     * 顺序或重复被改过（例如调换排列、去重）即视为自定义，原样保留。
     */
    private static boolean matchesDefault(List<String> values, List<String> defaultValues) {
        if (values == null || values.isEmpty() || defaultValues == null) {
            return true;
        }
        if (values.size() != defaultValues.size()) {
            return false;
        }
        for (var index = 0; index < values.size(); index++) {
            var value = values.get(index);
            var defaultValue = defaultValues.get(index);
            if (!compact(value).equals(compact(defaultValue))) {
                return false;
            }
        }
        return true;
    }

    private static String compact(String value) {
        return value == null ? "" : value.replaceAll("\\s+", "").strip();
    }
}
