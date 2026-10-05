export interface SummaryTheme {
  bg?: string;
  main?: string;
  contentFontSize?: string;
  title?: string;
  content?: string;
  gptName?: string;
  contentBg?: string;
  border?: string;
  shadow?: string;
  tagBg?: string;
  tagColor?: string;
  cursor?: string;
}

export interface SummaryWidgetConfig {
  logo: string;
  summaryTitle: string;
  gptName: string;
  typeSpeed: number;
  darkSelector: string;
  uiStyle: string;
  fixedTone: string;
  fixedDensity: string;
  themeName: string;
  theme: SummaryTheme | string;
  typewriter: boolean;
  readingDefaultCollapsed: boolean;
}

export interface SummaryContentResponse {
  summaryContent?: string;
  /** 后端 updateContent 的成败标记：没有对应摘要记录时会返回 success:false（HTTP 仍是 200）。 */
  success?: boolean;
  message?: string;
  blackList?: boolean;
}

/** 摘要框最终渲染口径：星港（stellar）与既有四种口径并列，由白名单解析得出。 */
export type SummaryUiStyle = 'classic' | 'inline' | 'simple' | 'stellar';

/** 星港模式的根类名，样式表与组件共用这一份契约。 */
export const STELLAR_SUMMARY_CLASS = 'likcc-summaraidGPT-stellar';

/** 星港模式的深色口径类名，只在没有主题变量可继承时兜底微调描边与括线强度。 */
export const STELLAR_SUMMARY_DARK_CLASS = `${STELLAR_SUMMARY_CLASS}--dark`;

/** 星港模式默认标题：站点没改过原标题时映射为本站口径，改过则原样保留。 */
export const STELLAR_SUMMARY_TITLE = '本舱信号摘要';

/**
 * 旧版内置标题，命中即视为“站点未自定义”。
 * 只收插件自己写下的默认值：后端默认「文章摘要」，简约/内联卡片在标题为空时兜底「AI 总结」。
 * 文档推荐站长改用的「本文摘要」「AI 摘要」「快速导读」都算自定义口径，一律原样保留。
 */
const LEGACY_SUMMARY_TITLES = ['文章摘要', 'AI 总结'];

export type StellarSignalState = 'decoding' | 'ready' | 'empty' | 'interrupted';

/** 星港模式的状态文案：正文说明与 HUD 状态词成对出现，避免两处口径打架。 */
const STELLAR_SIGNAL_COPY: Record<Exclude<StellarSignalState, 'ready'>, { status: string; message: string }> = {
  decoding: { status: '解码中', message: '正在解码本舱信号…' },
  empty: { status: '待信号', message: '尚未收到导读信号' },
  interrupted: { status: '信号中断', message: '导读信号暂时中断，请稍后重试' },
};

export const SUMMARY_API_BASE = '/apis/api.summary.summaraidgpt.lik.cc/v1alpha1';

export const DEFAULT_SUMMARY_THEME: SummaryTheme = {
  bg: '#f7f9fe',
  main: '#4F8DFD',
  contentFontSize: '16px',
  title: '#3A5A8C',
  content: '#222',
  gptName: '#7B88A8',
  contentBg: '#fff',
  border: '#e3e8f7',
  shadow: '0 2px 12px 0 rgba(60,80,180,0.08)',
  tagBg: '#f0f4ff',
  tagColor: '#4F8DFD',
  cursor: '#4F8DFD',
};

export const DEFAULT_SUMMARY_CONFIG: SummaryWidgetConfig = {
  logo: 'icon.svg',
  summaryTitle: '文章摘要',
  gptName: '智阅GPT',
  typeSpeed: 20,
  darkSelector: '',
  uiStyle: 'simple',
  fixedTone: 'violet',
  fixedDensity: 'compact',
  themeName: 'custom',
  theme: DEFAULT_SUMMARY_THEME,
  typewriter: true,
  readingDefaultCollapsed: false,
};

export function parseTheme(theme: SummaryTheme | string | null | undefined): SummaryTheme {
  if (!theme) {
    return { ...DEFAULT_SUMMARY_THEME };
  }

  if (typeof theme === 'string') {
    try {
      const parsed = JSON.parse(theme) as SummaryTheme;
      return { ...DEFAULT_SUMMARY_THEME, ...parsed };
    } catch {
      return { ...DEFAULT_SUMMARY_THEME };
    }
  }

  return { ...DEFAULT_SUMMARY_THEME, ...theme };
}

/**
 * 解析摘要框实际渲染口径。保留既有白名单口径（quiet/note/minimal/stripe 归入简约，spotlight 主题归入简约），
 * 仅新增 stellar 直通，因此旧站点的观感不会因为新增风格而改变。
 */
export function resolveSummaryUiStyle(uiStyle: string, themeName: string): SummaryUiStyle {
  if (uiStyle === 'stellar') {
    return 'stellar';
  }
  if (uiStyle === 'simple' || uiStyle === 'quiet') {
    return 'simple';
  }
  if (uiStyle === 'note' || uiStyle === 'minimal' || uiStyle === 'stripe') {
    return 'simple';
  }
  if (uiStyle === 'inline') {
    return 'inline';
  }
  if (themeName === 'spotlight') {
    return 'simple';
  }
  return 'classic';
}

/** 星港模式的标题口径：留空或仍是旧默认标题时换成本站文案，站点自定义一律保留。 */
export function resolveStellarTitle(summaryTitle: string): string {
  const title = (summaryTitle || '').trim();
  if (!title || LEGACY_SUMMARY_TITLES.includes(title)) {
    return STELLAR_SUMMARY_TITLE;
  }
  return title;
}

/** 由摘要加载状态推导星港信号状态；中断优先于解码，避免失败被加载态盖住。 */
export function resolveStellarSignalState(input: {
  loading: boolean;
  failed: boolean;
  empty: boolean;
}): StellarSignalState {
  if (input.failed) {
    return 'interrupted';
  }
  if (input.loading) {
    return 'decoding';
  }
  if (input.empty) {
    return 'empty';
  }
  return 'ready';
}

/** HUD 状态词，就绪时不需要额外提示。 */
export function stellarStatusLabel(state: StellarSignalState): string {
  return state === 'ready' ? '' : STELLAR_SIGNAL_COPY[state].status;
}

/** 正文状态说明；就绪时由调用方渲染摘要正文。 */
export function stellarStateMessage(state: StellarSignalState): string {
  return state === 'ready' ? '' : STELLAR_SIGNAL_COPY[state].message;
}

/**
 * 是否逐字计时。星港摘要在“减弱动态效果”下直接整段落地：
 * 逐字是纯装饰计时，关掉它比把动画按到 0.01ms 更省电，也更符合该系统偏好的语义。
 */
export function shouldTypewrite(input: {
  typewriter: boolean;
  uiStyle: SummaryUiStyle;
  prefersReducedMotion: boolean;
}): boolean {
  if (!input.typewriter) {
    return false;
  }
  if (input.uiStyle === 'stellar' && input.prefersReducedMotion) {
    return false;
  }
  return true;
}

/**
 * 摘要接口的真实返回口径：`POST updateContent` 即使没有摘要记录也会以 HTTP 200 返回
 * `{ success: false, message, summaryContent: '未找到摘要内容', blackList: false }`。
 * 因此“有没有收到导读信号”看 success 与文本，而不是只看 HTTP 状态。
 */
export interface SummarySignal {
  /** 既有口径直接展示的文本：后端文案原样透传，保持旧风格观感不变。 */
  content: string;
  /** 是否视为没有信号：星港口径据此显示待信号状态，而不是把提示语当成正文。 */
  empty: boolean;
}

export function resolveSummarySignal(data: SummaryContentResponse | null | undefined): SummarySignal {
  const content = data?.summaryContent?.trim() || '';
  const declined = data?.success === false;
  return { content, empty: declined || !content };
}

/** 文章名为空时洞察图谱的提示。 */
export const READING_EMPTY_POST_NAME_MESSAGE = '文章名称为空';

/** 轮询预算用尽后的提示：不再假装“稍后自动刷新”，改为请读者手动刷新的明确收束。 */
export const READING_SIGNAL_PENDING_MESSAGE = '星图信号仍未就位，请稍后刷新重试';

/** 洞察图谱的轮询预算是否还有余量；用尽后必须停下并给出明确文案，不能无限自动刷新。 */
export function hasReadingPollBudget(attempts: number, maxAttempts: number): boolean {
  return attempts < maxAttempts;
}

/** 星港摘要根类名：昼夜由主题变量决定，深色类只在缺少主题变量时兜底。 */
export function resolveStellarSummaryClass(isDark: boolean): string {
  return isDark ? `${STELLAR_SUMMARY_CLASS} ${STELLAR_SUMMARY_DARK_CLASS}` : STELLAR_SUMMARY_CLASS;
}

/** 洞察图谱外壳类名：is-stellar 是所有星港覆盖样式的唯一入口，未选该风格时一张样式都不生效。 */
export function resolveReadingShellClass(input: { isDark: boolean; isStellar: boolean }): string {
  return [
    'reading-shell',
    input.isStellar ? 'is-stellar' : '',
    input.isDark ? 'is-dark' : '',
  ].filter(Boolean).join(' ');
}

export function matchesDarkSelector(selector: string): boolean {
  const html = document.documentElement;
  const body = document.body;
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;

  const dataScheme = html.getAttribute('data-color-scheme') || body.getAttribute('data-color-scheme');
  if (dataScheme === 'dark') {
    return true;
  }
  if (dataScheme === 'light') {
    return false;
  }
  if (dataScheme === 'auto') {
    return prefersDark;
  }

  const themeValue =
    html.getAttribute('data-theme') ||
    body.getAttribute('data-theme') ||
    html.getAttribute('data-mode') ||
    body.getAttribute('data-mode') ||
    html.getAttribute('data-bs-theme') ||
    body.getAttribute('data-bs-theme');
  if (themeValue === 'dark') {
    return true;
  }
  if (themeValue === 'light') {
    return false;
  }
  if (themeValue === 'auto' || themeValue === 'system') {
    return prefersDark;
  }

  // 星港主题把最终配色落在 html[data-scheme]（见主题 base-head 的内联脚本），
  // 该属性属于站点显式口径，优先级高于系统偏好；只有 auto/system 才回到系统设置。
  const schemeValue = html.getAttribute('data-scheme') || body.getAttribute('data-scheme');
  if (schemeValue === 'dark') {
    return true;
  }
  if (schemeValue === 'light') {
    return false;
  }
  if (schemeValue === 'auto' || schemeValue === 'system') {
    return prefersDark;
  }

  const schemePreference =
    html.getAttribute('data-scheme-preference') || body.getAttribute('data-scheme-preference');
  if (schemePreference === 'dark') {
    return true;
  }
  if (schemePreference === 'light') {
    return false;
  }
  if (schemePreference === 'auto' || schemePreference === 'system') {
    return prefersDark;
  }

  if (
    html.classList.contains('color-scheme-dark') ||
    body.classList.contains('color-scheme-dark') ||
    html.classList.contains('dark') ||
    body.classList.contains('dark')
  ) {
    return true;
  }

  if (
    html.classList.contains('color-scheme-light') ||
    body.classList.contains('color-scheme-light') ||
    html.classList.contains('light') ||
    body.classList.contains('light')
  ) {
    return false;
  }

  if (html.classList.contains('color-scheme-auto') || body.classList.contains('color-scheme-auto')) {
    return prefersDark;
  }

  if (!selector) {
    return prefersDark;
  }

  const dataAttrMatch = selector.match(/^data-([\w-]+)=(.+)$/);
  if (dataAttrMatch) {
    const attribute = `data-${dataAttrMatch[1]}`;
    const value = dataAttrMatch[2];
    return html.getAttribute(attribute) === value || body.getAttribute(attribute) === value;
  }

  const classMatch = selector.match(/^class=(.+)$/);
  if (classMatch) {
    const className = classMatch[1];
    return html.classList.contains(className) || body.classList.contains(className);
  }

  return html.classList.contains(selector) || body.classList.contains(selector);
}

export function buildThemeObserver(
  selector: string,
  callback: () => void,
): MutationObserver[] {
  const html = document.documentElement;
  const body = document.body;
  const baseAttributeFilter = [
    'class',
    'data-color-scheme',
    'data-theme',
    'data-mode',
    'data-bs-theme',
    'data-scheme',
    'data-scheme-preference',
  ];
  const observerConfig: MutationObserverInit = {
    attributes: true,
    attributeFilter: baseAttributeFilter,
  };

  const dataAttrMatch = selector.match(/^data-([\w-]+)=(.+)$/);
  if (dataAttrMatch) {
    const attribute = `data-${dataAttrMatch[1]}`;
    observerConfig.attributeFilter = baseAttributeFilter.includes(attribute)
      ? baseAttributeFilter
      : [...baseAttributeFilter, attribute];
  }

  const htmlObserver = new MutationObserver(callback);
  const bodyObserver = new MutationObserver(callback);

  htmlObserver.observe(html, observerConfig);
  bodyObserver.observe(body, observerConfig);

  return [htmlObserver, bodyObserver];
}

export async function fetchSummaryConfig(): Promise<SummaryWidgetConfig> {
  try {
    const response = await fetch(`${SUMMARY_API_BASE}/summaryConfig`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = (await response.json()) as Partial<SummaryWidgetConfig>;
    return {
      ...DEFAULT_SUMMARY_CONFIG,
      ...data,
      theme: data.theme ?? DEFAULT_SUMMARY_CONFIG.theme,
    };
  } catch {
    return { ...DEFAULT_SUMMARY_CONFIG };
  }
}

export async function fetchSummaryContent(postName: string): Promise<SummaryContentResponse> {
  const response = await fetch(`${SUMMARY_API_BASE}/updateContent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: postName,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return (await response.json()) as SummaryContentResponse;
}

export function resolveLogoUrl(logo: string): string {
  if (!logo) {
    return '';
  }

  if (
    logo.startsWith('http://') ||
    logo.startsWith('https://') ||
    logo.startsWith('/') ||
    logo.startsWith('data:')
  ) {
    return logo;
  }

  return `/plugins/summaraidGPT/assets/static/${logo}`;
}
