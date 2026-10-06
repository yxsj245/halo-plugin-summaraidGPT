import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  READING_EMPTY_POST_NAME_MESSAGE,
  READING_SIGNAL_PENDING_MESSAGE,
  STELLAR_SUMMARY_CLASS,
  STELLAR_SUMMARY_DARK_CLASS,
  STELLAR_SUMMARY_TITLE,
  buildThemeObserver,
  hasReadingPollBudget,
  matchesDarkSelector,
  resolveReadingShellClass,
  resolveStellarSignalState,
  resolveStellarSummaryClass,
  resolveStellarTitle,
  resolveSummarySignal,
  resolveSummaryUiStyle,
  shouldTypewrite,
  stellarStateMessage,
  stellarStatusLabel,
} from '../src/article-summary/shared';

/**
 * 星港摘要与洞察图谱的纯逻辑定向测试。
 * 这些用例只依赖 shared 里的可判定逻辑，用最小 DOM 桩替代真实浏览器；
 * Lit 组件的渲染路径需要真 DOM，另行在浏览器环境验证。
 */

interface StubElement {
  getAttribute: (name: string) => string | null;
  classList: { contains: (name: string) => boolean };
}

interface StubDomOptions {
  htmlAttributes?: Record<string, string>;
  bodyAttributes?: Record<string, string>;
  htmlClasses?: string[];
  bodyClasses?: string[];
  prefersDark?: boolean;
}

class FakeMutationObserver {
  static instances: FakeMutationObserver[] = [];

  target?: unknown;
  config?: MutationObserverInit;

  constructor(public callback: () => void) {
    FakeMutationObserver.instances.push(this);
  }

  observe(target: unknown, config?: MutationObserverInit): void {
    this.target = target;
    this.config = config;
  }

  disconnect(): void {
    // 测试桩不需要真正断开
  }
}

const originalDocument = globalThis.document;
const originalWindow = globalThis.window;
const originalMutationObserver = globalThis.MutationObserver;

function stubElement(attributes: Record<string, string>, classes: string[]): StubElement {
  return {
    getAttribute: (name: string) => attributes[name] ?? null,
    classList: { contains: (name: string) => classes.includes(name) },
  };
}

function installDom(options: StubDomOptions = {}): void {
  const { htmlAttributes = {}, bodyAttributes = {}, htmlClasses = [], bodyClasses = [], prefersDark = false } = options;

  globalThis.document = {
    documentElement: stubElement(htmlAttributes, htmlClasses),
    body: stubElement(bodyAttributes, bodyClasses),
  } as unknown as Document;

  globalThis.window = {
    matchMedia: (query: string) => ({ matches: query.includes('dark') ? prefersDark : false }),
  } as unknown as Window & typeof globalThis;

  globalThis.MutationObserver = FakeMutationObserver as unknown as typeof MutationObserver;
}

beforeEach(() => {
  FakeMutationObserver.instances = [];
  installDom();
});

afterEach(() => {
  globalThis.document = originalDocument;
  globalThis.window = originalWindow;
  globalThis.MutationObserver = originalMutationObserver;
});

describe('摘要框风格白名单', () => {
  it('新增 stellar 直通', () => {
    expect(resolveSummaryUiStyle('stellar', 'custom')).toBe('stellar');
    expect(resolveSummaryUiStyle('stellar', 'spotlight')).toBe('stellar');
  });

  it('保留既有口径，不改变旧站点的渲染分支', () => {
    expect(resolveSummaryUiStyle('simple', 'custom')).toBe('simple');
    expect(resolveSummaryUiStyle('quiet', 'custom')).toBe('simple');
    expect(resolveSummaryUiStyle('note', 'custom')).toBe('simple');
    expect(resolveSummaryUiStyle('minimal', 'custom')).toBe('simple');
    expect(resolveSummaryUiStyle('stripe', 'custom')).toBe('simple');
    expect(resolveSummaryUiStyle('inline', 'custom')).toBe('inline');
    expect(resolveSummaryUiStyle('classic', 'custom')).toBe('classic');
    expect(resolveSummaryUiStyle('', 'custom')).toBe('classic');
  });

  it('未配置风格时按旧规则回落到 spotlight 简约口径', () => {
    expect(resolveSummaryUiStyle('', 'spotlight')).toBe('simple');
    expect(resolveSummaryUiStyle('未知风格', 'spotlight')).toBe('simple');
    expect(resolveSummaryUiStyle('未知风格', 'custom')).toBe('classic');
  });
});

describe('星港标题口径', () => {
  it('未自定义时映射为本舱信号摘要', () => {
    expect(resolveStellarTitle('')).toBe(STELLAR_SUMMARY_TITLE);
    expect(resolveStellarTitle('   ')).toBe(STELLAR_SUMMARY_TITLE);
    expect(resolveStellarTitle('文章摘要')).toBe(STELLAR_SUMMARY_TITLE);
    expect(resolveStellarTitle(' 文章摘要 ')).toBe(STELLAR_SUMMARY_TITLE);
    expect(resolveStellarTitle('AI 总结')).toBe(STELLAR_SUMMARY_TITLE);
  });

  it('站点自定义标题完整保留，含文档推荐的替代名', () => {
    expect(resolveStellarTitle('本舱信号摘要')).toBe('本舱信号摘要');
    expect(resolveStellarTitle('星港导读')).toBe('星港导读');
    expect(resolveStellarTitle('AI 摘要 Signal')).toBe('AI 摘要 Signal');
    expect(resolveStellarTitle('本文摘要')).toBe('本文摘要');
    expect(resolveStellarTitle('AI 摘要')).toBe('AI 摘要');
    expect(resolveStellarTitle('快速导读')).toBe('快速导读');
  });
});

describe('星港状态文案', () => {
  it('三个状态各自给出 HUD 状态词与正文说明', () => {
    expect(resolveStellarSignalState({ loading: true, failed: false, empty: false })).toBe('decoding');
    expect(stellarStatusLabel('decoding')).toBe('解码中');
    expect(stellarStateMessage('decoding')).toBe('正在解码本舱信号…');

    expect(resolveStellarSignalState({ loading: false, failed: false, empty: true })).toBe('empty');
    expect(stellarStatusLabel('empty')).toBe('待信号');
    expect(stellarStateMessage('empty')).toBe('尚未收到导读信号');

    expect(resolveStellarSignalState({ loading: false, failed: true, empty: false })).toBe('interrupted');
    expect(stellarStatusLabel('interrupted')).toBe('信号中断');
    expect(stellarStateMessage('interrupted')).toBe('导读信号暂时中断，请稍后重试');
  });

  it('中断优先于解码，就绪时不再附加提示', () => {
    expect(resolveStellarSignalState({ loading: true, failed: true, empty: true })).toBe('interrupted');
    expect(resolveStellarSignalState({ loading: false, failed: false, empty: false })).toBe('ready');
    expect(stellarStatusLabel('ready')).toBe('');
    expect(stellarStateMessage('ready')).toBe('');
  });
});

describe('摘要接口真实返回口径', () => {
  it('没有摘要记录时后端以 200 返回 success:false，星港按待信号处理，文案仍留给旧风格展示', () => {
    const declined = { success: false, message: '未找到摘要内容', summaryContent: '未找到摘要内容', blackList: false };
    expect(resolveSummarySignal(declined)).toEqual({ content: '未找到摘要内容', empty: true });
    expect(resolveStellarSignalState({ loading: false, failed: false, empty: resolveSummarySignal(declined).empty }))
      .toBe('empty');
    expect(stellarStateMessage('empty')).toBe('尚未收到导读信号');
  });

  it('命中黑名单或更新失败的响应同样不算信号', () => {
    expect(resolveSummarySignal({ success: false, message: '更新失败：xx', blackList: true }).empty).toBe(true);
    expect(resolveSummarySignal({ success: false, message: '系统异常', summaryContent: '' }).empty).toBe(true);
  });

  it('重复访问的旧版无需更新响应仍显示真实摘要', () => {
    const result = resolveSummarySignal({
      success: false,
      message: '摘要内容未发生变化，无需更新',
      summaryContent: '已经成功同步的摘要',
    });
    expect(result).toEqual({ content: '已经成功同步的摘要', empty: false });
    expect(resolveStellarSignalState({ loading: false, failed: false, empty: result.empty })).toBe('ready');
  });

  it('新接口以 available 表达内容可用性，而不是是否发生写入', () => {
    expect(resolveSummarySignal({ success: false, available: true, summaryContent: '真实摘要' }).empty).toBe(false);
    expect(resolveSummarySignal({ success: true, available: false, summaryContent: '后端提示' }).empty).toBe(true);
    expect(resolveSummarySignal({ available: true, blackList: true, summaryContent: '真实摘要' }).empty).toBe(true);
    expect(resolveSummarySignal({ available: true, summaryContent: '  ' }).empty).toBe(true);
  });

  it('正常摘要按文本裁剪后作为信号', () => {
    expect(resolveSummarySignal({ success: true, summaryContent: '  本舱信号正文  ', blackList: false }))
      .toEqual({ content: '本舱信号正文', empty: false });
    expect(resolveSummarySignal({ success: true, summaryContent: '正文', message: 'ok' }).empty).toBe(false);
  });

  it('缺字段、空文本、空响应都算没有信号', () => {
    expect(resolveSummarySignal(undefined)).toEqual({ content: '', empty: true });
    expect(resolveSummarySignal({})).toEqual({ content: '', empty: true });
    expect(resolveSummarySignal({ success: true, summaryContent: '   ' })).toEqual({ content: '', empty: true });
  });
});

describe('洞察图谱轮询预算', () => {
  it('预算内继续轮询，用尽后停下', () => {
    expect(hasReadingPollBudget(0, 600)).toBe(true);
    expect(hasReadingPollBudget(599, 600)).toBe(true);
    expect(hasReadingPollBudget(600, 600)).toBe(false);
    expect(hasReadingPollBudget(601, 600)).toBe(false);
  });

  it('收束文案明确，不再承诺自动刷新', () => {
    expect(READING_SIGNAL_PENDING_MESSAGE).toBe('星图信号仍未就位，请稍后刷新重试');
    expect(READING_SIGNAL_PENDING_MESSAGE).toContain('刷新');
    expect(READING_SIGNAL_PENDING_MESSAGE).not.toContain('自动');
    expect(READING_EMPTY_POST_NAME_MESSAGE).toBe('文章名称为空');
  });
});

describe('逐字计时门禁', () => {
  it('星港摘要在减弱动态效果下不逐字', () => {
    expect(shouldTypewrite({ typewriter: true, uiStyle: 'stellar', prefersReducedMotion: true })).toBe(false);
    expect(shouldTypewrite({ typewriter: true, uiStyle: 'stellar', prefersReducedMotion: false })).toBe(true);
  });

  it('关闭打字机时任何风格都不逐字，其他风格口径不变', () => {
    expect(shouldTypewrite({ typewriter: false, uiStyle: 'stellar', prefersReducedMotion: false })).toBe(false);
    expect(shouldTypewrite({ typewriter: false, uiStyle: 'simple', prefersReducedMotion: false })).toBe(false);
    expect(shouldTypewrite({ typewriter: true, uiStyle: 'simple', prefersReducedMotion: true })).toBe(true);
    expect(shouldTypewrite({ typewriter: true, uiStyle: 'classic', prefersReducedMotion: true })).toBe(true);
  });
});

describe('类名契约', () => {
  it('星港摘要根类名', () => {
    expect(resolveStellarSummaryClass(false)).toBe(STELLAR_SUMMARY_CLASS);
    expect(resolveStellarSummaryClass(true)).toBe(`${STELLAR_SUMMARY_CLASS} ${STELLAR_SUMMARY_DARK_CLASS}`);
  });

  it('图谱外壳只有在选择星港时才带 is-stellar', () => {
    expect(resolveReadingShellClass({ isDark: false, isStellar: false })).toBe('reading-shell');
    expect(resolveReadingShellClass({ isDark: true, isStellar: false })).toBe('reading-shell is-dark');
    expect(resolveReadingShellClass({ isDark: false, isStellar: true })).toBe('reading-shell is-stellar');
    expect(resolveReadingShellClass({ isDark: true, isStellar: true })).toBe('reading-shell is-stellar is-dark');
  });
});

describe('昼夜识别', () => {
  it('认站点落在 html[data-scheme] 的显式口径，并压过系统偏好', () => {
    installDom({ htmlAttributes: { 'data-scheme': 'light' }, prefersDark: true });
    expect(matchesDarkSelector('')).toBe(false);

    installDom({ htmlAttributes: { 'data-scheme': 'dark' }, prefersDark: false });
    expect(matchesDarkSelector('')).toBe(true);
  });

  it('落在 body 上的 data-scheme 同样生效', () => {
    installDom({ bodyAttributes: { 'data-scheme': 'dark' }, prefersDark: false });
    expect(matchesDarkSelector('')).toBe(true);
  });

  it('data-scheme-preference 为 auto 时回到系统偏好', () => {
    installDom({ htmlAttributes: { 'data-scheme-preference': 'auto' }, prefersDark: true });
    expect(matchesDarkSelector('')).toBe(true);

    installDom({ htmlAttributes: { 'data-scheme-preference': 'auto' }, prefersDark: false });
    expect(matchesDarkSelector('')).toBe(false);
  });

  it('保留旧主题的全部既有判据', () => {
    installDom({ htmlAttributes: { 'data-color-scheme': 'light' }, prefersDark: true });
    expect(matchesDarkSelector('')).toBe(false);

    installDom({ htmlAttributes: { 'data-theme': 'dark' }, prefersDark: false });
    expect(matchesDarkSelector('')).toBe(true);

    installDom({ htmlAttributes: { 'data-bs-theme': 'light' }, prefersDark: true });
    expect(matchesDarkSelector('')).toBe(false);

    installDom({ htmlClasses: ['dark'], prefersDark: false });
    expect(matchesDarkSelector('')).toBe(true);

    installDom({ bodyClasses: ['color-scheme-light'], prefersDark: true });
    expect(matchesDarkSelector('')).toBe(false);
  });

  it('没有显式口径时回落到系统偏好', () => {
    installDom({ prefersDark: true });
    expect(matchesDarkSelector('')).toBe(true);

    installDom({ prefersDark: false });
    expect(matchesDarkSelector('')).toBe(false);
  });

  it('站点在后台配的自定义暗色选择器仍然生效', () => {
    installDom({ htmlAttributes: { 'data-mood': 'night' }, prefersDark: false });
    expect(matchesDarkSelector('data-mood=night')).toBe(true);
    expect(matchesDarkSelector('data-mood=day')).toBe(false);

    installDom({ bodyClasses: ['theme-night'], prefersDark: false });
    expect(matchesDarkSelector('class=theme-night')).toBe(true);
  });
});

describe('昼夜监听', () => {
  it('同时监听 html 与 body 上的 data-scheme', () => {
    installDom();
    const observers = buildThemeObserver('', () => {});
    expect(observers).toHaveLength(2);

    const [htmlObserver] = FakeMutationObserver.instances;
    const filter = htmlObserver?.config?.attributeFilter as string[];
    expect(filter).toContain('class');
    expect(filter).toContain('data-color-scheme');
    expect(filter).toContain('data-theme');
    expect(filter).toContain('data-scheme');
    expect(filter).toContain('data-scheme-preference');
  });

  it('自定义 data 选择器是追加而不是覆盖既有属性', () => {
    installDom();
    buildThemeObserver('data-mood=night', () => {});

    const filter = FakeMutationObserver.instances.at(-1)?.config?.attributeFilter as string[];
    expect(filter).toContain('data-mood');
    expect(filter).toContain('data-scheme');
    expect(filter).toContain('class');
  });

  it('自定义选择器与内置属性重名时不产生重复项', () => {
    installDom();
    buildThemeObserver('data-scheme=dark', () => {});

    const filter = FakeMutationObserver.instances.at(-1)?.config?.attributeFilter as string[];
    expect(filter.filter((name) => name === 'data-scheme')).toHaveLength(1);
  });
});
