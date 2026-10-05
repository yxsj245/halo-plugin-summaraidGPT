import { beforeEach, describe, expect, it, vi } from 'vitest';

// 入口只按标签名创建元素、再按属性赋值，不需要真实 Lit 组件；
// 这里把两个组件模块换成空壳，测试就不依赖 lit 的依赖是否安装到位。
vi.mock('../src/article-summary/widget', () => ({ ArticleSummaryWidget: class {} }));
vi.mock('../src/article-reading/widget', () => ({ ArticleReadingWidget: class {} }));

/**
 * 入口挂载编排的定向测试（最小 DOM 桩，不需要真浏览器）。
 * 覆盖三件事：同一批占位在配置请求期间只挂载一轮；请求期间被换进来的新正文占位由补扫兜住；
 * 摘要 UI 关闭（只注入图谱占位）时图谱独立挂载并按站点口径渲染。
 * Lit 组件自身的渲染与视觉仍需要在浏览器里验证。
 */

interface FakeNodeShape {
  tagName: string;
  isConnected: boolean;
  postName?: string;
  uiStyle?: string;
  darkSelector?: string;
  setAttribute: (name: string, value: string) => void;
  getAttribute: (name: string) => string | null;
  replaceWith: (next: FakeNodeShape) => void;
}

const documentNodes: FakeNodeShape[] = [];
const pendingTimers: Array<() => unknown> = [];

let configPayload: Record<string, unknown> = { uiStyle: 'stellar', summaryTitle: '文章摘要' };
let firstFetchGated = false;
let releaseFirstFetch: (() => void) | undefined;

function matchesSimple(node: FakeNodeShape, selectorPart: string): boolean {
  const tag = selectorPart.match(/^([a-zA-Z0-9-]+)/)?.[1];
  if (tag && node.tagName !== tag) {
    return false;
  }

  const notMatch = selectorPart.match(/:not\(\[([\w-]+)="([^"]*)"\]\)/);
  if (notMatch && node.getAttribute(notMatch[1]!) === notMatch[2]) {
    return false;
  }

  return true;
}

function matchesAny(node: FakeNodeShape, selector: string): boolean {
  return selector.split(',').some((part) => matchesSimple(node, part.trim()));
}

function createNode(tagName: string, connected = true): FakeNodeShape {
  const node: FakeNodeShape = {
    tagName,
    isConnected: connected,
    setAttribute(name, value) {
      attributes.set(name, String(value));
    },
    getAttribute(name) {
      return attributes.get(name) ?? null;
    },
    replaceWith(next) {
      const index = documentNodes.indexOf(node);
      if (index >= 0) {
        documentNodes.splice(index, 1, next);
      }
      next.isConnected = true;
      node.isConnected = false;
    },
    matches(selector: string) {
      return matchesAny(node, selector);
    },
    querySelector() {
      return null;
    },
    addEventListener() {
      // 桩不需要事件
    },
    classList: { contains: () => false },
  } as FakeNodeShape;

  const attributes = new Map<string, string>();
  return node;
}

function attach(placeholder: FakeNodeShape): FakeNodeShape {
  placeholder.isConnected = true;
  documentNodes.push(placeholder);
  return placeholder;
}

function detach(placeholder: FakeNodeShape): void {
  const index = documentNodes.indexOf(placeholder);
  if (index >= 0) {
    documentNodes.splice(index, 1);
  }
  placeholder.isConnected = false;
}

function installDomStubs(): void {
  documentNodes.length = 0;
  pendingTimers.length = 0;
  firstFetchGated = false;
  releaseFirstFetch = undefined;
  configPayload = { uiStyle: 'stellar', summaryTitle: '文章摘要' };

  const globals = globalThis as Record<string, unknown>;
  globals.HTMLElement = class {};
  globals.Element = class {};
  globals.customElements = { define: () => {}, get: () => undefined };
  globals.MutationObserver = class {
    observe(): void {}
    disconnect(): void {}
  };
  globals.NodeFilter = { SHOW_TEXT: 4, FILTER_ACCEPT: 1, FILTER_REJECT: 2, FILTER_SKIP: 3 };

  globals.document = {
    documentElement: createNode('html'),
    body: createNode('body'),
    readyState: 'complete',
    createElement: (tagName: string) => createNode(tagName, false),
    querySelectorAll: (selector: string) => documentNodes.filter((node) => matchesAny(node, selector)),
    querySelector: (selector: string) => documentNodes.find((node) => matchesAny(node, selector)) ?? null,
    addEventListener: () => {},
    createTreeWalker: () => ({ nextNode: () => null }),
  };

  globals.window = {
    setTimeout: (callback: () => unknown) => {
      pendingTimers.push(callback);
      return pendingTimers.length;
    },
    clearTimeout: (handle: number) => {
      if (handle > 0) {
        pendingTimers.splice(handle - 1, 1);
      }
    },
    matchMedia: () => ({
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
    crypto: {},
    localStorage: { getItem: () => null, setItem: () => {} },
    addEventListener: () => {},
  };

  const fakeResponse = {
    ok: true,
    status: 200,
    statusText: 'OK',
    json: async () => configPayload,
  };

  globals.fetch = () => {
    if (firstFetchGated) {
      firstFetchGated = false;
      return new Promise((resolve) => {
        releaseFirstFetch = () => resolve(fakeResponse);
      });
    }
    return Promise.resolve(fakeResponse);
  };
}

/** 放行第一次（被门控的）配置请求 */
function releaseGatedFetch(): void {
  releaseFirstFetch?.();
}

async function flush(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

/** 跑掉被入口登记的全部定时回调（补扫走的就是这条路径） */
async function runTimers(): Promise<void> {
  const callbacks = pendingTimers.splice(0, pendingTimers.length);
  callbacks.forEach((callback) => callback());
  await flush();
}

async function importEntry() {
  vi.resetModules();
  return import('../src/article-summary-entry');
}

beforeEach(() => {
  installDomStubs();
});

describe('入口挂载编排', () => {
  it('在途调用共享同一轮挂载，换成新正文后由补扫补齐', async () => {
    const stalePlaceholder = attach(createNode('ai-summaraidGPT'));
    stalePlaceholder.setAttribute('name', 'old-post');

    firstFetchGated = true;
    const entry = await importEntry();
    // 丢掉入口导入时登记的首次初始化定时器，后面只统计补扫
    pendingTimers.length = 0;
    const init = window.likcc_summaraidGPT_initSummaryBox!;

    const first = init();
    const concurrent = init();
    expect(concurrent).toBe(first);

    // 配置请求还没回来，导航已经把正文换成新的一篇：旧占位离场，新图谱占位进场
    detach(stalePlaceholder);
    const freshPlaceholder = attach(createNode('ai-summaraidGPT-reading'));
    freshPlaceholder.setAttribute('name', 'new-post');

    releaseGatedFetch();
    const mounted = await first;

    // 离场的旧占位被跳过，换代进来的新占位不在这一轮快照里
    expect(mounted).toHaveLength(0);
    expect(freshPlaceholder.getAttribute('data-summary-lit-mounted')).toBeNull();
    expect(documentNodes.some((node) => node.tagName === 'likcc-article-summary')).toBe(false);

    // finally 补了一轮重扫：新占位在下一轮被标记并替换成图谱组件
    expect(pendingTimers.length).toBe(1);
    await runTimers();

    expect(freshPlaceholder.getAttribute('data-summary-lit-mounted')).toBe('true');
    const mountedReading = documentNodes.find((node) => node.tagName === 'likcc-article-reading');
    expect(mountedReading).toBeDefined();
    expect(mountedReading?.postName).toBe('new-post');
    expect(mountedReading?.uiStyle).toBe('stellar');
  });

  it('没有漏挂时不补扫，同一批占位只挂载一次', async () => {
    const placeholder = attach(createNode('ai-summaraidGPT'));
    placeholder.setAttribute('name', 'demo-post');

    const entry = await importEntry();
    // 丢掉入口导入时登记的首次初始化定时器，后面只统计补扫
    pendingTimers.length = 0;
    const init = window.likcc_summaraidGPT_initSummaryBox!;

    const first = init();
    expect(init()).toBe(first);

    const mounted = await first;

    expect(mounted.map((item) => item.tagName)).toEqual(['likcc-article-summary']);
    expect(mounted[0]?.postName).toBe('demo-post');
    expect(mounted[0]?.uiStyle).toBe('stellar');
    expect(placeholder.getAttribute('data-summary-lit-mounted')).toBe('true');
    expect(documentNodes.filter((node) => node.tagName === 'ai-summaraidGPT')).toHaveLength(0);
    expect(pendingTimers.length).toBe(0);
  });

  it('只有图谱占位时独立挂载图谱（摘要 UI 关闭场景）', async () => {
    const readingPlaceholder = attach(createNode('ai-summaraidGPT-reading'));
    readingPlaceholder.setAttribute('name', 'only-reading');

    const entry = await importEntry();
    const mounted = await window.likcc_summaraidGPT_initSummaryBox!({ uiStyle: 'stellar' });

    expect(mounted.map((item) => item.tagName)).toEqual(['likcc-article-reading']);
    expect(mounted[0]?.postName).toBe('only-reading');
    expect(mounted[0]?.uiStyle).toBe('stellar');
    expect(documentNodes.some((node) => node.tagName === 'likcc-article-summary')).toBe(false);
  });

  it('站点没选星港时图谱仍按简约口径挂载', async () => {
    configPayload = { uiStyle: 'simple' };
    attach(createNode('ai-summaraidGPT-reading'));

    const entry = await importEntry();
    const mounted = await window.likcc_summaraidGPT_initSummaryBox!();

    expect(mounted[0]?.uiStyle).toBe('simple');
  });
});
