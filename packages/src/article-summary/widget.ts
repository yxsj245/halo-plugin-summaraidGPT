import { LitElement, html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { customElement, property, state } from 'lit/decorators.js';
import { articleSummaryStyles } from './styles';
import {
  buildThemeObserver,
  fetchSummaryContent,
  matchesDarkSelector,
  parseTheme,
  resolveLogoUrl,
  resolveStellarSignalState,
  resolveStellarSummaryClass,
  resolveStellarTitle,
  resolveSummarySignal,
  resolveSummaryUiStyle,
  shouldTypewrite,
  stellarStateMessage,
  stellarStatusLabel,
  type SummaryTheme,
  type SummaryUiStyle,
} from './shared';

type ThemeVariant = 'default' | 'dark' | 'blue' | 'green' | 'custom';
type FixedToneVariant = 'violet' | 'graphite' | 'copper';
type FixedDensityVariant = 'compact' | 'comfortable';

const DEFAULT_SUMMARY_CONTENT_HINT = '暂无摘要内容';
const SUMMARY_FAILURE_HINT = '摘要加载失败，请稍后重试';

/** 系统级“减弱动态效果”：星港模式据此跳过逐字计时。 */
function prefersReducedMotion(): boolean {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

@customElement('likcc-article-summary')
export class ArticleSummaryWidget extends LitElement {
  static styles = articleSummaryStyles;

  @property({ type: String, attribute: 'post-name' })
  postName = '';

  @property({ type: String })
  logo = '';

  @property({ type: String, attribute: 'summary-title' })
  summaryTitle = '文章摘要';

  @property({ type: String, attribute: 'gpt-name' })
  gptName = '智阅GPT';

  @property({ type: Number, attribute: 'type-speed' })
  typeSpeed = 20;

  @property({ type: Boolean })
  typewriter = true;

  @property({ type: String, attribute: 'dark-selector' })
  darkSelector = '';

  @property({ type: String, attribute: 'theme-name' })
  themeName = 'custom';

  @property({ type: String, attribute: 'ui-style' })
  uiStyle = 'simple';

  @property({ type: String, attribute: 'fixed-tone' })
  fixedTone = 'violet';

  @property({ type: String, attribute: 'fixed-density' })
  fixedDensity = 'compact';

  @property({ attribute: false })
  theme: SummaryTheme | string = {};

  @state()
  private content = '';

  @state()
  private displayContent = '';

  @state()
  private loading = true;

  @state()
  private typing = false;

  @state()
  private loadFailed = false;

  @state()
  private contentEmpty = false;

  @state()
  private isDark = false;

  private themeObservers: MutationObserver[] = [];
  private typewriterTimer?: number;
  private initialized = false;
  private prefersColorSchemeQuery?: MediaQueryList;
  /** 请求代次：切换 postName 或断开连接后，迟到响应不得再改写正文与打字机。 */
  private loadSequence = 0;
  /** 已发起加载的文章名：挂载时 postName 已赋值，首次 updated 会再看到一次同名变更，据此避免重复请求。 */
  private loadedPostName = '';
  private readonly handleSystemColorSchemeChange = () => {
    this.refreshThemeMode();
  };

  connectedCallback(): void {
    super.connectedCallback();
    this.refreshThemeMode();
    this.bindThemeObservers();
    this.bindSystemColorSchemeListener();

    // 元素被导航重新插入时（原位复用），补一次加载；空文章名的收尾也交给 loadSummary 统一处理
    if (this.initialized) {
      void this.loadSummary();
    }
  }

  protected firstUpdated(): void {
    void this.loadSummary();
    this.initialized = true;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    // 断开即作废在途请求，迟到响应不会在已离场的元素上重启打字机
    this.loadSequence += 1;
    this.unbindThemeObservers();
    this.unbindSystemColorSchemeListener();
    this.stopTypewriter();
  }

  protected updated(changedProperties: Map<PropertyKey, unknown>): void {
    if (changedProperties.has('darkSelector')) {
      this.refreshThemeMode();
      this.bindThemeObservers();
    }

    if (!this.initialized) {
      return;
    }

    // 只对“文章名真的变了”重新取数：首次挂载由 firstUpdated 负责，updated 不再补一枪重复请求。
    // 清空文章名也算变化，必须照样走 loadSummary，否则空值分支作废在途请求的动作永远不会执行。
    if (changedProperties.has('postName') && this.postName !== this.loadedPostName) {
      void this.loadSummary();
    }
  }

  private async loadSummary(): Promise<void> {
    if (!this.postName) {
      // 没有文章名就没有可取的摘要：作废在途请求并停掉打字机，避免迟到响应把旧正文写回新页面
      this.loadSequence += 1;
      this.loadedPostName = '';
      this.stopTypewriter();
      this.markLoadFailed();
      return;
    }

    const sequence = this.loadSequence + 1;
    this.loadSequence = sequence;
    this.loadedPostName = this.postName;

    this.stopTypewriter();
    this.loading = true;
    this.loadFailed = false;
    this.displayContent = '';
    this.contentEmpty = false;

    try {
      const data = await fetchSummaryContent(this.postName);
      if (!this.isCurrentLoad(sequence)) {
        return;
      }

      const signal = resolveSummarySignal(data);
      this.contentEmpty = signal.empty;
      this.content = signal.content || DEFAULT_SUMMARY_CONTENT_HINT;
      this.applyContent();
    } catch (error) {
      if (!this.isCurrentLoad(sequence)) {
        return;
      }

      console.warn('获取摘要失败:', error);
      this.markLoadFailed();
    } finally {
      if (this.isCurrentLoad(sequence)) {
        this.loading = false;
      }
    }
  }

  /** 代次与连接状态双检查：旧请求或已离场元素的响应一律丢弃。 */
  private isCurrentLoad(sequence: number): boolean {
    return sequence === this.loadSequence && this.isConnected;
  }

  private markLoadFailed(): void {
    this.loading = false;
    this.loadFailed = true;
    this.contentEmpty = false;
    this.content = SUMMARY_FAILURE_HINT;
    this.displayContent = SUMMARY_FAILURE_HINT;
  }

  private applyContent(): void {
    this.stopTypewriter();

    // 星港在没有信号时根本不渲染正文，逐字计时没有落点，这里直接整段落定；
    // 其余风格保持原口径不变（提示语仍按打字机逐字出现）。
    const skipTypewriter = (this.effectiveUiStyle === 'stellar' && this.contentEmpty)
      || !shouldTypewrite({
        typewriter: this.typewriter,
        uiStyle: this.effectiveUiStyle,
        prefersReducedMotion: prefersReducedMotion(),
      });

    if (skipTypewriter) {
      this.displayContent = this.content;
      this.typing = false;
      return;
    }

    this.typing = true;
    this.displayContent = '';

    const speed = Number.isFinite(this.typeSpeed) ? Math.max(this.typeSpeed, 0) : 20;
    let index = 0;

    const tick = () => {
      index += 1;
      this.displayContent = this.content.slice(0, index);

      if (index >= this.content.length) {
        this.typing = false;
        this.typewriterTimer = undefined;
        return;
      }

      this.typewriterTimer = window.setTimeout(tick, speed);
    };

    if (!this.content) {
      this.typing = false;
      return;
    }

    tick();
  }

  private stopTypewriter(): void {
    this.typing = false;
    if (this.typewriterTimer) {
      window.clearTimeout(this.typewriterTimer);
      this.typewriterTimer = undefined;
    }
  }

  private refreshThemeMode(): void {
    this.isDark = matchesDarkSelector(this.darkSelector);
  }

  private bindThemeObservers(): void {
    this.unbindThemeObservers();
    this.themeObservers = buildThemeObserver(this.darkSelector, () => {
      this.refreshThemeMode();
    });
  }

  private unbindThemeObservers(): void {
    this.themeObservers.forEach((observer) => observer.disconnect());
    this.themeObservers = [];
  }

  private bindSystemColorSchemeListener(): void {
    if (!window.matchMedia) {
      return;
    }

    this.prefersColorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (typeof this.prefersColorSchemeQuery.addEventListener === 'function') {
      this.prefersColorSchemeQuery.addEventListener('change', this.handleSystemColorSchemeChange);
      return;
    }

    this.prefersColorSchemeQuery.addListener?.(this.handleSystemColorSchemeChange);
  }

  private unbindSystemColorSchemeListener(): void {
    if (!this.prefersColorSchemeQuery) {
      return;
    }

    if (typeof this.prefersColorSchemeQuery.removeEventListener === 'function') {
      this.prefersColorSchemeQuery.removeEventListener('change', this.handleSystemColorSchemeChange);
    } else {
      this.prefersColorSchemeQuery.removeListener?.(this.handleSystemColorSchemeChange);
    }

    this.prefersColorSchemeQuery = undefined;
  }

  private get effectiveThemeName(): ThemeVariant {
    if (this.isDark) {
      return 'dark';
    }

    if (
      this.themeName === 'dark' ||
      this.themeName === 'blue' ||
      this.themeName === 'green' ||
      this.themeName === 'custom'
    ) {
      return this.themeName;
    }

    return 'default';
  }

  private get effectiveUiStyle(): SummaryUiStyle {
    return resolveSummaryUiStyle(this.uiStyle, this.themeName);
  }

  private get customThemeStyles(): Record<string, string> {
    if (this.effectiveThemeName !== 'custom') {
      return {};
    }

    const theme = parseTheme(this.theme);

    return {
      '--likcc-summaraid-bg': theme.bg ?? '',
      '--likcc-summaraid-main': theme.main ?? '',
      '--likcc-summaraid-contentFontSize': theme.contentFontSize ?? '',
      '--likcc-summaraid-title': theme.title ?? '',
      '--likcc-summaraid-content': theme.content ?? '',
      '--likcc-summaraid-gptName': theme.gptName ?? '',
      '--likcc-summaraid-contentBg': theme.contentBg ?? '',
      '--likcc-summaraid-border': theme.border ?? '',
      '--likcc-summaraid-shadow': theme.shadow ?? '',
      '--likcc-summaraid-tagBg': theme.tagBg ?? '',
      '--likcc-summaraid-tagColor': theme.tagColor ?? '',
      '--likcc-summaraid-cursor': theme.cursor ?? '',
    };
  }

  private get effectiveFixedTone(): FixedToneVariant {
    if (this.fixedTone === 'graphite' || this.fixedTone === 'copper') {
      return this.fixedTone;
    }
    return 'violet';
  }

  private get effectiveFixedDensity(): FixedDensityVariant {
    if (this.fixedDensity === 'comfortable') {
      return 'comfortable';
    }
    return 'compact';
  }

  private get fixedStyleClassName(): string {
    const classes = [
      'likcc-summaraidGPT-fixed',
      `likcc-summaraidGPT-tone--${this.effectiveFixedTone}`,
      `likcc-summaraidGPT-density--${this.effectiveFixedDensity}`,
    ];

    if (this.isDark) {
      classes.push('likcc-summaraidGPT-fixed--dark');
    }

    return classes.join(' ');
  }

  protected render() {
    if (this.effectiveUiStyle === 'stellar') {
      return this.renderStellarCard();
    }
    if (this.effectiveUiStyle === 'simple') {
      return this.renderSimpleCard();
    }
    if (this.effectiveUiStyle === 'inline') {
      return this.renderInlineCard();
    }

    return this.renderClassicCard();
  }

  /**
   * 星港信号简报：独立渲染，不复用经典/简约卡片的任何结构。
   * 全部取色都回到主题变量（--cyan/--violet 作强调，--panel/--panel-soft/--panel-border 作玻璃与描边，
   * --text/--text-dim 作文字层级），因此昼夜随 [data-scheme] 自动切换，组件本身不写死颜色。
   */
  private renderStellarCard() {
    const state = resolveStellarSignalState({
      loading: this.loading,
      failed: this.loadFailed,
      empty: this.contentEmpty,
    });
    const status = stellarStatusLabel(state);
    const message = stellarStateMessage(state);

    return html`
      <div class=${resolveStellarSummaryClass(this.isDark)}>
        <div class="likcc-summaraidGPT-stellar-shell">
          <div class="likcc-summaraidGPT-stellar-rail">
            <span class="likcc-summaraidGPT-stellar-code">SIGNAL BRIEF</span>
            ${status
              ? html`<span class=${`likcc-summaraidGPT-stellar-status likcc-summaraidGPT-stellar-status--${state}`}>${status}</span>`
              : nothing}
          </div>
          <div class="likcc-summaraidGPT-stellar-head">
            ${this.renderSparklesIcon('likcc-summaraidGPT-stellar-mark')}
            <span class="likcc-summaraidGPT-stellar-title">${resolveStellarTitle(this.summaryTitle)}</span>
            ${this.gptName
              ? html`<span class="likcc-summaraidGPT-stellar-model">${this.gptName}</span>`
              : nothing}
          </div>
          <div class="likcc-summaraidGPT-stellar-body">
            ${state === 'ready'
              ? html`<p class="likcc-summaraidGPT-stellar-text">${this.displayContent}${this.typing
                  ? html`<span class="likcc-summaraidGPT-stellar-cursor"></span>`
                  : nothing}</p>`
              : html`<p class="likcc-summaraidGPT-stellar-text likcc-summaraidGPT-stellar-text--state">${message}</p>`}
          </div>
        </div>
      </div>
    `;
  }

  private renderClassicCard() {
    const themeClass = `likcc-summaraidGPT-summary--${this.effectiveThemeName}`;
    const logoUrl = resolveLogoUrl(this.logo);
    const content = this.loading ? '正在生成摘要…' : this.displayContent;

    return html`
      <div class="likcc-summaraidGPT-summary-container ${themeClass}" style=${styleMap(this.customThemeStyles)}>
        <div class="likcc-summaraidGPT-summary-header">
          <div class="likcc-summaraidGPT-header-left">
            ${logoUrl
              ? html`<img class="likcc-summaraidGPT-logo not-prose" src=${logoUrl} alt=${this.gptName || 'AI Logo'} width="20" height="20" />`
              : nothing}
            <span class="likcc-summaraidGPT-summary-title">${this.summaryTitle || '文章摘要'}</span>
          </div>
          <span class="likcc-summaraidGPT-gpt-name">${this.gptName || '智阅GPT'}</span>
        </div>
        <div class="likcc-summaraidGPT-summary-content">
          ${this.loading || this.loadFailed
            ? html`<span style="color:#bbb;">${content}</span>`
            : content}
          ${this.typing ? html`<span class="likcc-summaraidGPT-cursor"></span>` : nothing}
        </div>
      </div>
    `;
  }

  private renderInlineCard() {
    const content = this.loading ? '正在生成摘要…' : this.displayContent;
    const title = this.summaryTitle || 'AI 总结';

    return html`
      <div class="likcc-summaraidGPT-inline-container ${this.fixedStyleClassName}">
        <div class="likcc-summaraidGPT-inline-shell">
          <div class="likcc-summaraidGPT-inline-header">
            ${this.renderSparklesIcon('likcc-summaraidGPT-inline-icon')}
            <span class="likcc-summaraidGPT-inline-title">${title}</span>
          </div>
          <div class="likcc-summaraidGPT-inline-content">
            ${this.loading || this.loadFailed
              ? html`<span style="color:#8892a6;">${content}</span>`
              : content}
            ${this.typing ? html`<span class="likcc-summaraidGPT-cursor"></span>` : nothing}
          </div>
        </div>
      </div>
    `;
  }

  private renderSimpleCard() {
    const content = this.loading ? '正在生成摘要…' : this.displayContent;
    const title = this.summaryTitle || 'AI 总结';

    return html`
      <div class="likcc-summaraidGPT-simple-container ${this.fixedStyleClassName}">
        <div class="likcc-summaraidGPT-simple-shell">
          <div class="likcc-summaraidGPT-simple-header">
            ${this.renderSparklesIcon('likcc-summaraidGPT-simple-icon')}
            <span class="likcc-summaraidGPT-simple-title">${title}</span>
          </div>
          <div class="likcc-summaraidGPT-simple-content">
            ${this.loading || this.loadFailed
              ? html`<span style="color:#8892a6;">${content}</span>`
              : content}
            ${this.typing ? html`<span class="likcc-summaraidGPT-cursor"></span>` : nothing}
          </div>
        </div>
      </div>
    `;
  }

  private renderSparklesIcon(className: string) {
    return html`
      <span class=${className} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M10.22 3.39a.35.35 0 0 1 .66 0l1.52 4.23a.38.38 0 0 0 .22.22l4.23 1.52a.35.35 0 0 1 0 .66l-4.23 1.52a.38.38 0 0 0-.22.22l-1.52 4.23a.35.35 0 0 1-.66 0l-1.52-4.23a.38.38 0 0 0-.22-.22L4.25 10.02a.35.35 0 0 1 0-.66l4.23-1.52a.38.38 0 0 0 .22-.22l1.52-4.23Z" />
          <path d="M18.38 4.18a.24.24 0 0 1 .45 0l.59 1.66c.02.07.08.13.15.15l1.66.59a.24.24 0 0 1 0 .45l-1.66.59a.25.25 0 0 0-.15.15l-.59 1.66a.24.24 0 0 1-.45 0l-.59-1.66a.25.25 0 0 0-.15-.15l-1.66-.59a.24.24 0 0 1 0-.45l1.66-.59a.24.24 0 0 0 .15-.15l.59-1.66Z" />
        </svg>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'likcc-article-summary': ArticleSummaryWidget;
  }
}
