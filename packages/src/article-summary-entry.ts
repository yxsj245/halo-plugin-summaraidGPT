import './article-summary/widget';
import './article-reading/widget';
import {
  fetchSummaryConfig,
  fetchSummaryContent,
  type SummaryWidgetConfig,
} from './article-summary/shared';
import type { ArticleSummaryWidget } from './article-summary/widget';
import type { ArticleReadingWidget } from './article-reading/widget';

declare global {
  interface Window {
    likcc_summaraidGPT_scriptLoaded?: boolean;
    likcc_summaraidGPT_initSummaryBox?: (
      userConfig?: Partial<SummaryWidgetConfig>,
    ) => Promise<(ArticleSummaryWidget | ArticleReadingWidget)[]>;
    likcc_summaraidGPT_reinit?: (
      userConfig?: Partial<SummaryWidgetConfig>,
    ) => Promise<(ArticleSummaryWidget | ArticleReadingWidget)[]>;
    swup?: {
      hooks?: {
        on: (event: string, handler: () => void) => void;
      };
    };
  }
}

const SUMMARY_WIDGET_SELECTOR = 'ai-summaraidGPT';
const SUMMARY_DATA_SELECTOR = 'ai-summaraidGPT-data';
const SUMMARY_COMPONENT_TAG = 'likcc-article-summary';
const READING_WIDGET_SELECTOR = 'ai-summaraidGPT-reading';
const READING_COMPONENT_TAG = 'likcc-article-reading';
const PROCESSED_DATA_ATTR = 'data-summary-lit-mounted';
const PROCESSED_SILENT_ATTR = 'data-summary-silent-processed';
let initTimer: number | undefined;
let domObserver: MutationObserver | undefined;
/** 在途挂载：配置请求期间同一批占位标签只能被处理一次，避免并发事件重复挂载。 */
let mountInFlight: Promise<(ArticleSummaryWidget | ArticleReadingWidget)[]> | undefined;

function printBanner(): void {
  if (window.likcc_summaraidGPT_scriptLoaded) {
    return;
  }

  console.log('%c智阅GPT-智能AI助手', 'color: #4F8DFD; font-size: 16px; font-weight: bold;');
  console.log('%c智阅点睛，一键洞见——基于AI大模型的Halo智能AI助手', 'color: #666; font-size: 12px;');
  console.log('%c作者: Handsome | 网站: https://lik.cc', 'color: #999; font-size: 11px;');
  window.likcc_summaraidGPT_scriptLoaded = true;
}

function applyConfig(
  element: ArticleSummaryWidget,
  config: Partial<SummaryWidgetConfig>,
  source: Element,
): void {
  element.postName = source.getAttribute('name') || '';
  element.logo = config.logo || '';
  element.summaryTitle = config.summaryTitle || '文章摘要';
  element.gptName = config.gptName || '智阅GPT';
  element.typeSpeed = config.typeSpeed ?? 20;
  element.typewriter = config.typewriter ?? true;
  element.darkSelector = config.darkSelector || '';
  element.uiStyle = config.uiStyle || 'simple';
  element.fixedTone = config.fixedTone || 'violet';
  element.fixedDensity = config.fixedDensity || 'compact';
  element.themeName = config.themeName || 'custom';
  element.theme = config.theme || {};
}

function applyReadingConfig(
  element: ArticleReadingWidget,
  config: Partial<SummaryWidgetConfig>,
  source: Element,
): void {
  element.postName = source.getAttribute('name') || '';
  element.darkSelector = config.darkSelector || '';
  // 洞察图谱跟随摘要框选择的界面口径（含星港），站点未选时维持既有的简约观感
  element.uiStyle = config.uiStyle || 'simple';
  element.defaultCollapsed = config.readingDefaultCollapsed ?? false;
}

/**
 * 真正执行挂载。占位标签在请求配置之前就标记为已处理，
 * 这样并发的 DOM 观察事件不会把同一批标签再选一遍；配置返回后只替换仍在文档里的标签。
 */
async function performMount(
  userConfig: Partial<SummaryWidgetConfig>,
): Promise<(ArticleSummaryWidget | ArticleReadingWidget)[]> {
  const widgets = Array.from(
    document.querySelectorAll<HTMLElement>(
      `${SUMMARY_WIDGET_SELECTOR}:not([${PROCESSED_DATA_ATTR}="true"])`,
    ),
  );
  const readingWidgets = Array.from(
    document.querySelectorAll<HTMLElement>(
      `${READING_WIDGET_SELECTOR}:not([${PROCESSED_DATA_ATTR}="true"])`,
    ),
  );

  if (widgets.length === 0 && readingWidgets.length === 0) {
    return [];
  }

  const placeholders = [...widgets, ...readingWidgets];
  placeholders.forEach((widget) => widget.setAttribute(PROCESSED_DATA_ATTR, 'true'));

  const apiConfig = await fetchSummaryConfig();
  const config = { ...apiConfig, ...userConfig };

  const mounted: (ArticleSummaryWidget | ArticleReadingWidget)[] = [];

  widgets.forEach((widget) => {
    // 配置请求期间页面可能已被导航替换，离场标签不再替换，标记随节点一起消失
    if (!widget.isConnected) {
      return;
    }
    const summary = document.createElement(SUMMARY_COMPONENT_TAG) as ArticleSummaryWidget;
    applyConfig(summary, config, widget);
    widget.replaceWith(summary);
    mounted.push(summary);
  });

  readingWidgets.forEach((widget) => {
    if (!widget.isConnected) {
      return;
    }
    const reading = document.createElement(READING_COMPONENT_TAG) as ArticleReadingWidget;
    applyReadingConfig(reading, config, widget);
    widget.replaceWith(reading);
    mounted.push(reading);
  });

  return mounted;
}

/** 仍有未被这一轮挂载处理掉的占位标签（多半是配置请求期间被导航换进来的新正文）。 */
function hasUnprocessedPlaceholders(): boolean {
  return document.querySelector(
    `${SUMMARY_WIDGET_SELECTOR}:not([${PROCESSED_DATA_ATTR}="true"]),`
    + `${READING_WIDGET_SELECTOR}:not([${PROCESSED_DATA_ATTR}="true"])`,
  ) !== null;
}

/**
 * 对外入口。刻意不加 async：并发调用必须拿到同一个 promise 对象，
 * 否则每次调用都会包一层新 promise，调用方无法判断“这是正在跑的那一轮”。
 */
function mountSummaryWidgets(
  userConfig: Partial<SummaryWidgetConfig> = {},
): Promise<(ArticleSummaryWidget | ArticleReadingWidget)[]> {
  if (mountInFlight) {
    return mountInFlight;
  }

  const task = performMount(userConfig).finally(() => {
    if (mountInFlight === task) {
      mountInFlight = undefined;
    }

    // 在途期间的并发调用拿到的是同一个 promise，此时如果已经进来一批新占位（导航替换正文），
    // 它们既没被这一轮选中、也没人再触发观察回调，必须由这里补一轮重扫，否则会永久漏挂。
    if (hasUnprocessedPlaceholders()) {
      scheduleAutoInit();
    }
  });
  mountInFlight = task;
  return task;
}

async function fetchSummaryContentSilent(): Promise<void> {
  const dataWidgets = Array.from(
    document.querySelectorAll<HTMLElement>(
      `${SUMMARY_DATA_SELECTOR}:not([${PROCESSED_SILENT_ATTR}="true"])`,
    ),
  );

  await Promise.all(
    dataWidgets.map(async (widget) => {
      const postName = widget.getAttribute('name');
      if (!postName || !widget.isConnected) {
        return;
      }

      widget.setAttribute(PROCESSED_SILENT_ATTR, 'true');

      try {
        await fetchSummaryContent(postName);
      } catch (error) {
        console.warn('读取摘要失败:', error);
      }
    }),
  );
}

async function autoInitSummaryBox(): Promise<void> {
  const widgets = document.querySelectorAll(SUMMARY_WIDGET_SELECTOR);
  const readingWidgets = document.querySelectorAll(READING_WIDGET_SELECTOR);
  const dataWidgets = document.querySelectorAll(SUMMARY_DATA_SELECTOR);
  const mountedSummary = document.querySelector(SUMMARY_COMPONENT_TAG);

  // 摘要框 UI 关闭时后端只注入 <ai-summaraidGPT-reading>（甚至只注入隐藏数据标签），
  // 这里按占位标签各自判断：图谱只要占位存在就独立挂载，不依赖摘要框是否注入。
  if (widgets.length > 0 || readingWidgets.length > 0) {
    await mountSummaryWidgets();
    return;
  }

  if (dataWidgets.length > 0 && !mountedSummary) {
    await fetchSummaryContentSilent();
  }
}

function scheduleAutoInit(): void {
  if (initTimer) {
    window.clearTimeout(initTimer);
  }

  initTimer = window.setTimeout(() => {
    initTimer = undefined;
    // 定时触发的初始化失败不应变成未处理的 promise 拒绝，静默记一条日志即可
    void autoInitSummaryBox().catch((error: unknown) => {
      console.warn('摘要框初始化失败:', error);
    });
  }, 0);
}

function shouldHandleMutation(mutation: MutationRecord): boolean {
  if (mutation.type !== 'childList') {
    return false;
  }

  const addedNodes = Array.from(mutation.addedNodes);
  return addedNodes.some((node) => {
    if (!(node instanceof Element)) {
      return false;
    }

    return (
      node.matches(SUMMARY_WIDGET_SELECTOR) ||
      node.matches(SUMMARY_DATA_SELECTOR) ||
      node.matches(READING_WIDGET_SELECTOR) ||
      node.querySelector(SUMMARY_WIDGET_SELECTOR) !== null ||
      node.querySelector(SUMMARY_DATA_SELECTOR) !== null ||
      node.querySelector(READING_WIDGET_SELECTOR) !== null
    );
  });
}

function observeDomChanges(): void {
  if (domObserver) {
    return;
  }

  domObserver = new MutationObserver((mutations) => {
    if (mutations.some(shouldHandleMutation)) {
      scheduleAutoInit();
    }
  });

  domObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}

function bindNavigationEvents(): void {
  const eventNames = [
    'pjax:success',
    'pjax:complete',
    'swup:content-replaced',
    'swup:page:view',
    'swup:animation:in:end',
  ];

  eventNames.forEach((eventName) => {
    document.addEventListener(eventName, scheduleAutoInit);
  });

  window.swup?.hooks?.on?.('page:view', scheduleAutoInit);
  window.swup?.hooks?.on?.('content:replace', scheduleAutoInit);
}

printBanner();

window.likcc_summaraidGPT_initSummaryBox = mountSummaryWidgets;
window.likcc_summaraidGPT_reinit = mountSummaryWidgets;
observeDomChanges();
bindNavigationEvents();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    scheduleAutoInit();
  }, { once: true });
} else {
  scheduleAutoInit();
}
