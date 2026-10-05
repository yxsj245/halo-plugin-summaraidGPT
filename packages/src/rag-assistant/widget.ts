import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { UIMessage } from '@halo-dev/ai-foundation-sdk';
import {
  askRagStream,
  DEFAULT_RAG_ASSISTANT_CONFIG,
  fetchRagAssistantConfig,
  fetchRagConversation,
} from './api';
import { RAG_INPUT_PLACEHOLDER, RAG_SOURCE_LIMIT } from './constants';
import { formatTime } from './format';
import { ragAssistantStyles } from './styles';
import {
  DEFAULT_RAG_PET_SIZE,
  DEFAULT_RAG_PET_SPEECH_MESSAGES,
  PETDEX_THINKING_SPEECH_MESSAGE,
  getPetdexFrame,
  getPetdexFrames,
  getPetdexMetrics,
  type PetdexDirection,
} from './petdex';
import {
  createMessage,
  createMessageId,
  updateMessageById,
} from './messages';
import {
  EMPTY_SELECTION_POPUP,
  resolveSelectionPopup,
} from './selection';
import { AgentChatClient } from './agent/chat';
import {
  consumeAgentAfterNavigationIntent,
  type AgentAfterNavigationResume,
} from './agent/navigation-intent';
import { renderPetPanel as renderPetPanelTemplate } from './renderers/pet-panel';
import { renderPetStage as renderPetStageTemplate } from './renderers/pet-stage';
import { renderSelectionPopover } from './renderers/selection-popover';
import { applyAssistantTheme } from './theme';
import { buildThemeObserver } from '../article-summary/shared';
import { renderStellarDrone } from './renderers/stellar-identity';
import { isDefaultAssistantAvatar, resolveStellarName, resolveStellarWelcome } from './stellar-identity';
import { copyAssistantText } from './clipboard';
import type {
  RagAssistantConfig,
  RagAssistantActivity,
  RagAssistantMessage,
  RagConversation,
  RagConversationMessage,
  RagSourceReference,
  SelectionPopupState,
} from './types';

const MAX_SELECTION_LENGTH = 1600;
const FLOATING_POSITION_STORAGE_KEY = 'likcc_summaraidgpt_rag_assistant_position';
const CONVERSATION_ID_STORAGE_KEY = 'likcc_summaraidgpt_rag_conversation_id';
const VISITOR_ID_STORAGE_KEY = 'likcc_summaraidgpt_rag_visitor_id';
const PET_PANEL_HEIGHT_STORAGE_KEY = 'likcc_summaraidgpt_rag_panel_height';
const FLOATING_MARGIN = 16;
const DRAG_THRESHOLD = 4;
const PET_PANEL_DEFAULT_HEIGHT = 318;
const PET_PANEL_MIN_HEIGHT = PET_PANEL_DEFAULT_HEIGHT;
const PET_PANEL_TOP_GAP = 12;

interface FloatingPosition {
  x: number;
  y: number;
}

interface BubbleDragState {
  pointerId: number;
  target: HTMLElement;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
  lastX: number;
  moved: boolean;
}

interface PanelResizeState {
  pointerId: number;
  target: HTMLElement;
  startY: number;
  startHeight: number;
}

@customElement('summaraid-rag-assistant')
export class RagAssistantWidget extends LitElement {
  static styles = ragAssistantStyles;

  @property({ type: String, reflect: true })
  position: 'left' | 'right' = 'right';

  @state()
  private config: RagAssistantConfig = DEFAULT_RAG_ASSISTANT_CONFIG;

  @state()
  private configLoaded = false;

  @state()
  private open = false;

  @state()
  private petPanelOpen = false;

  @state()
  private input = '';

  @state()
  private selectedContext = '';

  @state()
  private messages: RagAssistantMessage[] = [];

  @state()
  private agentActivities: RagAssistantActivity[] = [];

  @state()
  private streaming = false;

  private composingInput = false;

  @state()
  private expandedSourceMessageIds: string[] = [];

  @state()
  private selectionPopup: SelectionPopupState = EMPTY_SELECTION_POPUP;

  @state()
  private floatingPosition?: FloatingPosition;

  @state()
  private floatingPositionReady = false;

  @state()
  private petSpriteReady = false;

  @state()
  private draggingBubble = false;

  @state()
  private petFrameIndex = 0;

  @state()
  private petHovering = false;

  @state()
  private petDragDirection: PetdexDirection = '';

  @state()
  private petErrorUntil = 0;

  @state()
  private petSpeechVisible = false;

  @state()
  private petSpeechIndex = 0;

  @state()
  private petSpeechText = '';

  @state()
  private petPanelHeight = PET_PANEL_DEFAULT_HEIGHT;

  @state()
  private resizingPetPanel = false;

  @query('.pet-stage-output')
  private messagesElement?: HTMLElement;

  @query('.conversation-input')
  private inputElement?: HTMLTextAreaElement;

  @query('.pet-composer-input')
  private petInputElement?: HTMLTextAreaElement;

  @query('.pet-panel-thread')
  private petPanelThreadElement?: HTMLElement;

  private abortController?: AbortController;
  private agentChatClient?: AgentChatClient;
  private agentHistoryMessages: UIMessage[] = [];
  private conversationId?: string;
  private visitorId = this.loadOrCreateVisitorId();
  private bubbleDragState?: BubbleDragState;
  private panelResizeState?: PanelResizeState;
  private suppressNextBubbleClick = false;
  private floatingPositionLocked = false;
  private petAnimationTimer = 0;
  private petSpeechTimer = 0;
  private petSpeechHideTimer = 0;
  private petSpeechStartTimer = 0;
  private petPrepareGeneration = 0;
  private lifecycleGeneration = 0;
  private themeObservers: MutationObserver[] = [];
  private colorSchemeQuery?: MediaQueryList;
  private readonly refreshAssistantTheme = () => this.applyTheme();
  private readonly welcomeTime = formatTime();
  private readonly handleDocumentMouseUp = () => {
    window.setTimeout(() => this.updateSelectionPopup(), 0);
  };
  private readonly handleDocumentKeyUp = () => {
    window.setTimeout(() => this.updateSelectionPopup(), 0);
  };
  private readonly handleDocumentMouseDown = (event: MouseEvent) => {
    if (event.composedPath().includes(this)) {
      return;
    }
    this.clearSelectionPopup();
    if (!this.streaming && !this.open) {
      this.petPanelOpen = false;
    }
  };
  private readonly handleWindowScroll = () => {
    this.clearSelectionPopup();
  };
  private readonly handleWindowResize = () => {
    this.clampCurrentFloatingPosition();
    this.petPanelHeight = this.clampPetPanelHeight(this.petPanelHeight);
  };
  private readonly handleAgentStatus = (event: Event) => {
    const detail = (event as CustomEvent<{
      message?: string;
      kind?: RagAssistantActivity['kind'];
    }>).detail;
    const message = detail?.message?.trim();
    if (!message) {
      return;
    }
    this.petSpeechText = message;
    this.petSpeechVisible = true;
    this.appendAgentActivity(message, detail?.kind || 'pending');
  };
  private readonly handleBubblePointerMove = (event: PointerEvent) => {
    const state = this.bubbleDragState;
    if (!state || event.pointerId !== state.pointerId) {
      return;
    }

    const deltaX = event.clientX - state.startX;
    const deltaY = event.clientY - state.startY;
    const distance = Math.hypot(deltaX, deltaY);
    if (!state.moved && distance < DRAG_THRESHOLD) {
      return;
    }

    state.moved = true;
    this.draggingBubble = true;
    this.petDragDirection = event.clientX >= state.lastX ? 'right' : 'left';
    state.lastX = event.clientX;
    event.preventDefault();

    this.setFloatingPosition(
      this.clampFloatingPosition(
        {
          x: state.originX + deltaX,
          y: state.originY + deltaY,
        },
        this.bubbleWidth,
        this.bubbleHeight,
      ),
      false,
    );
  };
  private readonly handleBubblePointerEnd = (event: PointerEvent) => {
    const state = this.bubbleDragState;
    if (!state || event.pointerId !== state.pointerId) {
      return;
    }

    if (state.target.hasPointerCapture(event.pointerId)) {
      state.target.releasePointerCapture(event.pointerId);
    }
    this.unbindBubbleDragListeners();
    this.bubbleDragState = undefined;
    this.draggingBubble = false;
    this.petDragDirection = '';

    if (state.moved && this.floatingPosition) {
      event.preventDefault();
      this.suppressNextBubbleClick = true;
      this.floatingPositionLocked = true;
      this.saveFloatingPosition(this.floatingPosition);
      window.setTimeout(() => {
        this.suppressNextBubbleClick = false;
      }, 0);
    }
  };
  private readonly handlePanelResizePointerMove = (event: PointerEvent) => {
    const state = this.panelResizeState;
    if (!state || event.pointerId !== state.pointerId) {
      return;
    }

    event.preventDefault();
    const deltaY = event.clientY - state.startY;
    this.petPanelHeight = this.clampPetPanelHeight(state.startHeight - deltaY);
  };
  private readonly handlePanelResizePointerEnd = (event: PointerEvent) => {
    const state = this.panelResizeState;
    if (!state || event.pointerId !== state.pointerId) {
      return;
    }

    if (state.target.hasPointerCapture(event.pointerId)) {
      state.target.releasePointerCapture(event.pointerId);
    }
    this.unbindPanelResizeListeners();
    this.panelResizeState = undefined;
    this.resizingPetPanel = false;
    this.savePetPanelHeight(this.petPanelHeight);
  };

  connectedCallback(): void {
    super.connectedCallback();
    this.lifecycleGeneration += 1;
    this.applyTheme();
    this.themeObservers = buildThemeObserver('', this.refreshAssistantTheme);
    this.colorSchemeQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
    this.bindColorSchemeListener(this.colorSchemeQuery);
    this.petPanelHeight = this.clampPetPanelHeight(this.loadSavedPetPanelHeight());
    this.floatingPositionLocked = this.applySavedFloatingPosition();
    this.bindSelectionListeners();
    window.addEventListener('resize', this.handleWindowResize, { passive: true });
    window.addEventListener('summaraid:agent-status', this.handleAgentStatus);
    void this.initializeAssistant();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.lifecycleGeneration += 1;
    this.petPrepareGeneration += 1;
    this.themeObservers.forEach((observer) => observer.disconnect());
    this.themeObservers = [];
    this.unbindColorSchemeListener(this.colorSchemeQuery);
    this.colorSchemeQuery = undefined;
    this.unbindSelectionListeners();
    window.removeEventListener('resize', this.handleWindowResize);
    window.removeEventListener('summaraid:agent-status', this.handleAgentStatus);
    this.unbindBubbleDragListeners();
    this.unbindPanelResizeListeners();
    this.stopPetAnimation();
    this.stopPetSpeechCycle();
    this.abortCurrentRequest();
  }

  protected updated(changedProperties: Map<PropertyKey, unknown>): void {
    if (
      changedProperties.has('open')
      || changedProperties.has('petPanelOpen')
      || changedProperties.has('streaming')
    ) {
      this.syncPetThinkingSpeech();
    }
    if (changedProperties.has('messages') || changedProperties.has('petPanelOpen')) {
      this.scrollPetPanelToBottom();
    }
  }

  public openAssistant(question?: string, autoSubmit = false): void {
    if (this.isPetOnlyMode) {
      this.petPanelOpen = false;
      this.open = false;
      this.clearSelectionPopup();
      this.showNextPetSpeech();
      return;
    }

    this.petPanelOpen = true;
    this.petPanelHeight = this.clampPetPanelHeight(this.petPanelHeight);
    this.petSpeechVisible = false;
    this.clearSelectionPopup();

    if (question?.trim()) {
      if (autoSubmit) {
        void this.submitQuestion(question);
      } else {
        this.input = question;
        void this.updateComplete.then(() => this.focusPetInput());
      }
      return;
    }

    void this.updateComplete.then(() => this.focusPetInput());
  }

  protected render(): TemplateResult {
    return html`
      ${this.renderSelectionPopup()}
      ${this.renderBubble()}
      ${this.open && !this.isPetOnlyMode ? this.renderStage() : nothing}
    `;
  }

  private async loadConfig(): Promise<void> {
    const generation = this.lifecycleGeneration;
    const config = await fetchRagAssistantConfig();
    if (!this.isConnected || generation !== this.lifecycleGeneration) return;
    this.config = config;
    this.configLoaded = true;
    this.applyTheme(config);
    if (!this.floatingPositionLocked) {
      this.position = config.buttonPosition;
      this.applyDefaultFloatingPosition(config);
    } else {
      this.clampCurrentFloatingPosition();
    }
    this.petPanelHeight = this.clampPetPanelHeight(this.petPanelHeight);
    this.floatingPositionReady = true;
    await this.preparePetSprite(config);
  }

  private async initializeAssistant(): Promise<void> {
    const generation = this.lifecycleGeneration;
    await this.loadConfig();
    if (!this.isConnected || generation !== this.lifecycleGeneration) return;
    if (this.isPetOnlyMode) {
      this.open = false;
      this.petPanelOpen = false;
      this.clearSelectionPopup();
      return;
    }
    await this.loadStoredConversation();
    if (!this.isConnected || generation !== this.lifecycleGeneration) return;
    await this.resumeAgentAfterNavigationIfNeeded();
  }

  private async resumeAgentAfterNavigationIfNeeded(): Promise<void> {
    if (this.isPetOnlyMode) {
      return;
    }
    const intent = consumeAgentAfterNavigationIntent();
    if (!intent?.openChat) {
      return;
    }
    this.open = intent.displayMode === 'stage';
    this.petPanelOpen = intent.displayMode !== 'stage';
    this.petSpeechVisible = false;
    this.clearSelectionPopup();
    await this.updateComplete;
    if (intent.focusChatInput) {
      this.focusCurrentInput();
    }
    if (intent.resume) {
      await this.resumeAgentAfterNavigation(intent.resume);
    }
  }

  private bindSelectionListeners(): void {
    document.addEventListener('mouseup', this.handleDocumentMouseUp, { passive: true });
    document.addEventListener('keyup', this.handleDocumentKeyUp, { passive: true });
    document.addEventListener('mousedown', this.handleDocumentMouseDown);
    window.addEventListener('scroll', this.handleWindowScroll, { passive: true });
  }

  private unbindSelectionListeners(): void {
    document.removeEventListener('mouseup', this.handleDocumentMouseUp);
    document.removeEventListener('keyup', this.handleDocumentKeyUp);
    document.removeEventListener('mousedown', this.handleDocumentMouseDown);
    window.removeEventListener('scroll', this.handleWindowScroll);
  }

  private renderBubble(): TemplateResult | typeof nothing {
    if (!this.canRenderFloatingPet || (this.isStellar && this.open)) {
      return nothing;
    }

    const speech = this.petPanelOpen ? '' : this.getCurrentPetSpeech();

    return html`
      <span class=${this.petPanelOpen ? 'bubble-wrapper panel-open' : 'bubble-wrapper'} style=${this.petButtonStyle}>
        ${this.petPanelOpen && !this.open ? this.renderPetPanel() : nothing}
        <button
          class=${this.draggingBubble ? 'bubble pet-button dragging' : 'bubble pet-button'}
          style=${this.petButtonStyle}
          type="button"
          @pointerdown=${this.handleBubblePointerDown}
          @click=${this.handleBubbleClick}
          @mouseenter=${this.handlePetMouseEnter}
          @mouseleave=${this.handlePetMouseLeave}
          aria-label=${this.isStellar
            ? (this.isPetOnlyMode ? '向星枢领航员打招呼' : `接通${this.assistantName}`)
            : (this.isPetOnlyMode ? '互动宠物' : '打开智能助手')}
        >
          ${speech
            ? html`<span class=${this.petSpeechVisible ? 'pet-speech visible' : 'pet-speech'}>${speech}</span>`
            : nothing}
          ${this.isStellar
            ? html`<span class="stellar-pet" data-state=${this.stellarPetState} data-direction=${this.petDragDirection} aria-hidden="true">${renderStellarDrone()}</span>`
            : html`<span class="pet-sprite" style=${this.petSpriteStyle} aria-hidden="true"></span>`}
        </button>
      </span>
    `;
  }

  private renderPetPanel(): TemplateResult {
    return renderPetPanelTemplate({
      assistantName: this.assistantName,
      assistantAvatar: this.effectiveAssistantAvatar,
      stellar: this.isStellar,
      avatarFallbackText: this.avatarFallbackText,
      streaming: this.streaming,
      statusText: this.panelStatusText,
      selectedContext: this.selectedContext,
      selectedContextPreview: this.selectedContextPreview,
      messages: this.messages,
      welcomeMessage: this.welcomeMessage,
      quickQuestions: this.quickQuestions,
      input: this.input,
      petInputPlaceholder: this.petInputPlaceholder,
      panelStyle: this.petPanelStyle,
      resizing: this.resizingPetPanel,
      onOpenStage: () => this.openPetStage(),
      onResizePointerDown: (event) => this.handlePetPanelResizePointerDown(event),
      onNewConversation: () => this.newConversation(),
      onUsePrompt: (prompt) => this.usePrompt(prompt),
      onStop: () => this.stopCurrentResponse(),
      onCopyMessage: (message) => this.copyMessage(message),
      onRetryMessage: (message) => this.retryMessage(message),
      onClearSelectedContext: () => this.clearSelectedContext(),
      onSubmit: (event) => this.handleSubmit(event),
      onInput: (event) => this.handleInput(event),
      onKeydown: (event) => this.handleInputKeydown(event),
      onCompositionStart: () => this.handleCompositionStart(),
      onCompositionEnd: () => this.handleCompositionEnd(),
    });
  }

  private renderStage(): TemplateResult {
    return renderPetStageTemplate({
      assistantName: this.assistantName,
      assistantAvatar: this.effectiveAssistantAvatar,
      stellar: this.isStellar,
      avatarFallbackText: this.avatarFallbackText,
      messages: this.messages,
      statusText: this.panelStatusText,
      welcomeMessage: this.welcomeMessage,
      welcomeTime: this.welcomeTime,
      quickQuestions: this.quickQuestions,
      input: this.input,
      inputPlaceholder: this.petInputPlaceholder,
      streaming: this.streaming,
      hasSources: this.hasLatestSources,
      isSourceReferencesOpen: (messageId) => this.isSourceReferencesOpen(messageId),
      onToggleSourceReferences: (messageId, event) => this.toggleSourceReferences(messageId, event),
      onClose: () => this.close(),
      onNewConversation: () => this.newConversation(),
      onExpandLatestSources: () => this.expandLatestSources(),
      onUsePrompt: (prompt) => this.usePrompt(prompt),
      onStop: () => this.stopCurrentResponse(),
      onCopyMessage: (message) => this.copyMessage(message),
      onRetryMessage: (message) => this.retryMessage(message),
      onSubmit: (event) => this.handleSubmit(event),
      onInput: (event) => this.handleInput(event),
      onKeydown: (event) => this.handleInputKeydown(event),
      onCompositionStart: () => this.handleCompositionStart(),
      onCompositionEnd: () => this.handleCompositionEnd(),
    });
  }

  private renderSelectionPopup(): TemplateResult | typeof nothing {
    if (this.isPetOnlyMode) {
      return nothing;
    }
    return renderSelectionPopover(
      this.selectionPopup,
      () => this.askWithSelection(),
      this.selectionActionLabel,
      this.isStellar,
    );
  }

  private handleSubmit(event: Event): void {
    event.preventDefault();
    void this.submitQuestion(this.input);
  }

  private handleInput(event: Event): void {
    const target = event.currentTarget;
    if (target instanceof HTMLTextAreaElement) {
      this.input = target.value;
      this.resizeInput(target);
    }
  }

  private handleCompositionStart(): void {
    this.composingInput = true;
  }

  private handleCompositionEnd(): void {
    this.composingInput = false;
  }

  private handleInputKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter'
      || event.shiftKey
      || this.streaming
      || event.isComposing
      || this.composingInput
      || event.keyCode === 229) {
      return;
    }

    event.preventDefault();
    void this.submitQuestion(this.input);
  }

  private handleBubblePointerDown(event: PointerEvent): void {
    if (!event.isPrimary || event.button !== 0) {
      return;
    }

    const bubble = event.currentTarget;
    if (!(bubble instanceof HTMLElement)) {
      return;
    }

    const rect = bubble.getBoundingClientRect();
    const origin = this.currentFloatingPosition(rect);
    this.bubbleDragState = {
      pointerId: event.pointerId,
      target: bubble,
      startX: event.clientX,
      startY: event.clientY,
      originX: origin.x,
      originY: origin.y,
      lastX: event.clientX,
      moved: false,
    };

    this.petSpeechVisible = false;
    event.preventDefault();
    bubble.setPointerCapture(event.pointerId);
    bubble.addEventListener('pointermove', this.handleBubblePointerMove);
    bubble.addEventListener('pointerup', this.handleBubblePointerEnd);
    bubble.addEventListener('pointercancel', this.handleBubblePointerEnd);
  }

  private handleBubbleClick(event: MouseEvent): void {
    if (this.suppressNextBubbleClick) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (this.isPetOnlyMode) {
      this.petPanelOpen = false;
      this.open = false;
      if (this.petSpeechVisible) {
        this.petSpeechVisible = false;
      } else {
        this.showNextPetSpeech();
      }
      return;
    }

    this.petPanelOpen = !this.petPanelOpen;
    this.petSpeechVisible = false;
    if (this.petPanelOpen) {
      this.petPanelHeight = this.clampPetPanelHeight(this.petPanelHeight);
      void this.updateComplete.then(() => this.focusPetInput());
    }
  }

  private unbindBubbleDragListeners(): void {
    const target = this.bubbleDragState?.target;
    if (!target) {
      return;
    }

    target.removeEventListener('pointermove', this.handleBubblePointerMove);
    target.removeEventListener('pointerup', this.handleBubblePointerEnd);
    target.removeEventListener('pointercancel', this.handleBubblePointerEnd);
  }

  private handlePetPanelResizePointerDown(event: PointerEvent): void {
    if (!event.isPrimary || event.button !== 0) {
      return;
    }

    const target = event.currentTarget;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const panel = target.closest('.pet-panel');
    if (!(panel instanceof HTMLElement)) {
      return;
    }

    const rect = panel.getBoundingClientRect();
    this.panelResizeState = {
      pointerId: event.pointerId,
      target,
      startY: event.clientY,
      startHeight: rect.height || this.petPanelHeight,
    };

    this.resizingPetPanel = true;
    event.preventDefault();
    event.stopPropagation();
    target.setPointerCapture(event.pointerId);
    target.addEventListener('pointermove', this.handlePanelResizePointerMove);
    target.addEventListener('pointerup', this.handlePanelResizePointerEnd);
    target.addEventListener('pointercancel', this.handlePanelResizePointerEnd);
  }

  private unbindPanelResizeListeners(): void {
    const target = this.panelResizeState?.target;
    if (!target) {
      return;
    }

    target.removeEventListener('pointermove', this.handlePanelResizePointerMove);
    target.removeEventListener('pointerup', this.handlePanelResizePointerEnd);
    target.removeEventListener('pointercancel', this.handlePanelResizePointerEnd);
  }

  private applySavedFloatingPosition(): boolean {
    const savedPosition = this.loadSavedFloatingPosition();
    if (!savedPosition) {
      return false;
    }

    this.setFloatingPosition(this.clampFloatingPosition(savedPosition), false);
    return true;
  }

  private applyDefaultFloatingPosition(config: RagAssistantConfig): void {
    this.setFloatingPosition(this.clampFloatingPosition(this.defaultFloatingPosition(config)), false);
  }

  private currentFloatingPosition(fallbackRect?: DOMRect): FloatingPosition {
    if (this.floatingPosition) {
      return this.floatingPosition;
    }

    if (fallbackRect && Number.isFinite(fallbackRect.left) && Number.isFinite(fallbackRect.top)) {
      return {
        x: fallbackRect.left,
        y: fallbackRect.top,
      };
    }

    return this.defaultFloatingPosition(this.config);
  }

  private defaultFloatingPosition(config: RagAssistantConfig): FloatingPosition {
    const horizontalOffset = this.normalizeFloatingOffset(config.horizontalOffset);
    const verticalOffset = this.normalizeFloatingOffset(config.verticalOffset);
    const x = config.buttonPosition === 'left'
      ? horizontalOffset
      : window.innerWidth - this.bubbleWidth - horizontalOffset;

    return {
      x,
      y: window.innerHeight - this.bubbleHeight - verticalOffset,
    };
  }

  private clampCurrentFloatingPosition(): void {
    if (!this.floatingPosition) {
      return;
    }

    const nextPosition = this.clampFloatingPosition(
      this.floatingPosition,
      this.bubbleWidth,
      this.bubbleHeight,
    );

    if (nextPosition.x !== this.floatingPosition.x || nextPosition.y !== this.floatingPosition.y) {
      this.setFloatingPosition(nextPosition, true);
    } else {
      // 视口变化时坐标可能仍合法，但面板应该展开的方向已经改变。
      this.position = nextPosition.x + this.bubbleWidth / 2 < window.innerWidth / 2 ? 'left' : 'right';
    }
  }

  private clampFloatingPosition(
    position: FloatingPosition,
    width = this.bubbleWidth,
    height = this.bubbleHeight,
  ): FloatingPosition {
    const maxX = Math.max(FLOATING_MARGIN, window.innerWidth - width - FLOATING_MARGIN);
    const maxY = Math.max(FLOATING_MARGIN, window.innerHeight - height - FLOATING_MARGIN);

    return {
      x: this.clamp(position.x, FLOATING_MARGIN, maxX),
      y: this.clamp(position.y, FLOATING_MARGIN, maxY),
    };
  }

  private clampPetPanelHeight(height: number): number {
    const value = Number.isFinite(height) ? height : PET_PANEL_DEFAULT_HEIGHT;
    return this.clamp(value, PET_PANEL_MIN_HEIGHT, this.maxPetPanelHeight());
  }

  private maxPetPanelHeight(): number {
    const bubbleTop = this.floatingPosition?.y ?? this.defaultFloatingPosition(this.config).y;
    const panelBottom = bubbleTop - PET_PANEL_TOP_GAP;
    const viewportMax = window.innerHeight - FLOATING_MARGIN * 2;
    return Math.max(
      PET_PANEL_MIN_HEIGHT,
      Math.min(viewportMax, panelBottom - FLOATING_MARGIN),
    );
  }

  private setFloatingPosition(position: FloatingPosition, persist: boolean): void {
    this.floatingPosition = position;
    this.position = position.x + this.bubbleWidth / 2 < window.innerWidth / 2 ? 'left' : 'right';
    this.style.left = `${Math.round(position.x)}px`;
    this.style.top = `${Math.round(position.y)}px`;
    this.style.right = 'auto';
    this.style.bottom = 'auto';
    this.petPanelHeight = this.clampPetPanelHeight(this.petPanelHeight);

    if (persist) {
      this.saveFloatingPosition(position);
    }
  }

  private applyTheme(config: RagAssistantConfig = this.config): void {
    applyAssistantTheme(this, config.styleConfig);
  }

  private async preparePetSprite(config: RagAssistantConfig): Promise<void> {
    const generation = ++this.petPrepareGeneration;
    this.stopPetAnimation();
    this.stopPetSpeechCycle();
    this.petSpriteReady = false;
    this.petSpeechVisible = false;
    this.petSpeechText = '';

    // 星港角色是本地 SVG，不依赖 PetDex、精灵图下载或逐帧计时。
    if (this.isStellar) {
      this.petSpriteReady = true;
      this.startPetSpeechCycle();
      return;
    }
    const spritesheetUrl = config.pet?.spritesheetUrl?.trim();
    if (!spritesheetUrl) {
      return;
    }

    try {
      await this.preloadImage(spritesheetUrl);
      if (!this.isConnected || generation !== this.petPrepareGeneration || this.isStellar || this.petSpriteUrl !== spritesheetUrl) {
        return;
      }
      this.petSpriteReady = true;
      this.startPetAnimation();
      this.startPetSpeechCycle();
    } catch {
      if (this.isConnected && generation === this.petPrepareGeneration && !this.isStellar && this.petSpriteUrl === spritesheetUrl) {
        this.petSpriteReady = false;
      }
    }
  }

  private preloadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      let settled = false;
      const settle = (callback: () => void) => {
        if (settled) {
          return;
        }
        settled = true;
        callback();
      };

      image.onload = () => settle(() => resolve());
      image.onerror = () => settle(() => reject(new Error('Pet spritesheet failed to load')));
      image.src = url;
    });
  }

  private startPetAnimation(): void {
    if (this.isStellar || this.petAnimationTimer || !this.canRenderFloatingPet) {
      return;
    }
    this.petAnimationTimer = window.setInterval(() => {
      this.petFrameIndex = (this.petFrameIndex + 1) % getPetdexFrames(this.petAnimationState).length;
    }, 150);
  }

  private stopPetAnimation(): void {
    if (!this.petAnimationTimer) {
      return;
    }
    window.clearInterval(this.petAnimationTimer);
    this.petAnimationTimer = 0;
  }

  private startPetSpeechCycle(): void {
    if (this.petSpeechTimer || !this.canRenderFloatingPet) {
      return;
    }
    this.petSpeechStartTimer = window.setTimeout(() => {
      this.petSpeechStartTimer = 0;
      if (this.isConnected) this.showNextPetSpeech();
    }, 1600);
    this.petSpeechTimer = window.setInterval(() => this.showNextPetSpeech(), 15000);
  }

  private stopPetSpeechCycle(): void {
    if (this.petSpeechStartTimer) {
      window.clearTimeout(this.petSpeechStartTimer);
      this.petSpeechStartTimer = 0;
    }
    if (this.petSpeechTimer) {
      window.clearInterval(this.petSpeechTimer);
      this.petSpeechTimer = 0;
    }
    if (this.petSpeechHideTimer) {
      window.clearTimeout(this.petSpeechHideTimer);
      this.petSpeechHideTimer = 0;
    }
  }

  private showNextPetSpeech(): void {
    if (!this.canShowPetSpeech()) {
      this.petSpeechVisible = false;
      return;
    }
    if (this.isPetThinkingOutsideWindow()) {
      this.showPetThinkingSpeech();
      return;
    }

    const messages = this.petSpeechMessages;
    this.petSpeechText = messages[this.petSpeechIndex % messages.length] || '';
    this.petSpeechVisible = true;

    if (this.petSpeechHideTimer) {
      window.clearTimeout(this.petSpeechHideTimer);
    }
    this.petSpeechHideTimer = window.setTimeout(() => {
      this.petSpeechVisible = false;
      this.petSpeechHideTimer = 0;
    }, 7200);
    this.petSpeechIndex = (this.petSpeechIndex + 1) % messages.length;
  }

  private syncPetThinkingSpeech(): void {
    if (!this.canRenderFloatingPet) {
      this.petSpeechVisible = false;
      this.petSpeechText = '';
      return;
    }
    if (this.isPetThinkingOutsideWindow()) {
      this.showPetThinkingSpeech();
      return;
    }
    if (this.petSpeechText === this.thinkingSpeechMessage) {
      this.petSpeechVisible = false;
      this.petSpeechText = '';
    }
  }

  private showPetThinkingSpeech(): void {
    if (this.draggingBubble) {
      return;
    }
    this.petSpeechText = this.thinkingSpeechMessage;
    this.petSpeechVisible = true;
    if (this.petSpeechHideTimer) {
      window.clearTimeout(this.petSpeechHideTimer);
      this.petSpeechHideTimer = 0;
    }
  }

  private canShowPetSpeech(): boolean {
    return this.canRenderFloatingPet
      && !this.open
      && !this.petPanelOpen
      && !this.draggingBubble
      && (this.isPetThinkingOutsideWindow() || this.petSpeechMessages.length > 0);
  }

  private isPetThinkingOutsideWindow(): boolean {
    return !this.open && !this.petPanelOpen && this.streaming;
  }

  private handlePetMouseEnter(): void {
    this.petHovering = true;
  }

  private handlePetMouseLeave(): void {
    this.petHovering = false;
  }

  private triggerPetError(): void {
    if (!this.canRenderFloatingPet) {
      return;
    }
    this.petErrorUntil = Date.now() + 3600;
    this.petFrameIndex = 0;
  }

  private loadSavedFloatingPosition(): FloatingPosition | undefined {
    try {
      const rawValue = window.localStorage.getItem(FLOATING_POSITION_STORAGE_KEY);
      if (!rawValue) {
        return undefined;
      }

      const position = JSON.parse(rawValue) as Partial<FloatingPosition>;
      if (typeof position.x === 'number'
        && Number.isFinite(position.x)
        && typeof position.y === 'number'
        && Number.isFinite(position.y)
      ) {
        return {
          x: Number(position.x),
          y: Number(position.y),
        };
      }
    } catch {
      return undefined;
    }

    return undefined;
  }

  private saveFloatingPosition(position: FloatingPosition): void {
    try {
      window.localStorage.setItem(FLOATING_POSITION_STORAGE_KEY, JSON.stringify(position));
    } catch {
      // localStorage may be unavailable in strict privacy modes.
    }
  }

  private loadSavedPetPanelHeight(): number {
    try {
      const rawValue = window.localStorage.getItem(PET_PANEL_HEIGHT_STORAGE_KEY);
      const height = rawValue ? Number(rawValue) : PET_PANEL_DEFAULT_HEIGHT;
      return Number.isFinite(height) ? height : PET_PANEL_DEFAULT_HEIGHT;
    } catch {
      return PET_PANEL_DEFAULT_HEIGHT;
    }
  }

  private savePetPanelHeight(height: number): void {
    try {
      window.localStorage.setItem(
        PET_PANEL_HEIGHT_STORAGE_KEY,
        String(Math.round(this.clampPetPanelHeight(height))),
      );
    } catch {
      // localStorage may be unavailable in strict privacy modes.
    }
  }

  private async submitQuestion(rawQuestion: string): Promise<void> {
    if (this.isPetOnlyMode) {
      return;
    }
    const question = rawQuestion.trim();
    if (!question || this.streaming) {
      return;
    }
    if (!this.canUseAssistantChat) {
      this.showLoginRequiredMessage();
      return;
    }
    if (!this.canUseSelectedChatMode) {
      this.showChatModeUnavailableMessage();
      return;
    }

    const selectedContext = this.selectedContext.trim();
    const requestQuestion = selectedContext
      ? `请结合我选中的内容回答：\n\n${selectedContext}\n\n我的问题：${question}`
      : question;
    const visibleQuestion = selectedContext
      ? `${question}\n\n选中内容：${this.truncateText(selectedContext, 180)}`
      : question;
    const assistantMessageId = createMessageId();
    this.input = '';
    this.selectedContext = '';
    this.petPanelOpen = true;
    this.streaming = true;
    this.agentActivities = [];
    this.appendAgentActivity(this.useAgentChat ? '正在准备 Agent' : '正在检索知识库', 'pending');
    // 本次请求独占一个 controller：实例字段只作“当前请求”的索引，
    // 旧请求结算时据此判断自己是否仍是当前请求，不会清掉后来者的状态。
    const controller = new AbortController();
    this.abortController = controller;

    this.messages = [
      ...this.messages,
      createMessage('user', visibleQuestion),
      createMessage('assistant', '', {
        id: assistantMessageId,
        streaming: true,
      }),
    ];

    await this.updateComplete;
    this.resizeInput(this.inputElement);
    this.resizeInput(this.petInputElement);
    this.scrollToBottom();

    // 等首帧期间可能已被停止、被新请求接管或已离场：不再启动请求流，也不覆盖后来者的 client。
    if (!this.isActiveRequest(controller)) {
      this.finishAssistantMessage(assistantMessageId);
      if (this.abortController === controller) {
        this.streaming = false;
        this.abortController = undefined;
        this.agentChatClient = undefined;
      }
      return;
    }

    try {
      if (this.useAgentChat) {
        await this.askAgentStream(requestQuestion, assistantMessageId, controller);
      } else {
        await this.askRagStream(requestQuestion, assistantMessageId, controller);
      }
    } catch (error) {
      // 已停止、已离场或已被新请求接管时不报错：这次请求的结果不该再影响界面。
      if (!this.isActiveRequest(controller)) {
        return;
      }
      const message = error instanceof Error ? error.message : '智能助手回答失败';
      this.failAssistantMessage(assistantMessageId, `抱歉，暂时无法回答，请稍后重试。${message ? `（${message}）` : ''}`);
    } finally {
      // 收尾只针对本条消息；共享字段仅在仍是当前请求时才归还，避免抹掉后来者的流。
      const owned = this.abortController === controller;
      this.finishAssistantMessage(assistantMessageId);
      if (owned) {
        this.streaming = false;
        this.abortController = undefined;
        this.agentChatClient = undefined;
      }
      await this.updateComplete;
      if (owned) {
        this.scrollToBottom();
      }
    }
  }

  private async askAgentStream(
    question: string,
    assistantMessageId: string,
    controller: AbortController,
  ): Promise<void> {
    // 入口守卫：已停止、已离场或被新请求接管时一律不启动，避免覆盖后来者的 client。
    if (!this.isActiveRequest(controller)) return;
    this.appendAgentActivity('正在调用 Agent', 'pending');
    const client = new AgentChatClient();
    this.agentChatClient = client;
    const conversationId = this.ensureConversationId();
    try {
      const messages = await client.sendMessage(
        question,
        {
          agent: this.config.agent,
          historyMessages: this.agentHistoryMessages,
          conversationId,
          visitorId: this.visitorId,
          ragEnabledForAgent: this.shouldAttachRagToAgent,
          afterNavigationDisplayMode: this.open ? 'stage' : 'panel',
          signal: controller.signal,
        },
        {
          onText: (text) => {
            if (!this.isActiveRequest(controller)) return;
            this.setAssistantContent(assistantMessageId, text);
          },
          onSources: (sources) => {
            if (!this.isActiveRequest(controller)) return;
            this.receiveSources(assistantMessageId, sources);
          },
          onError: (error) => {
            if (!this.isActiveRequest(controller)) return;
            if (this.isAgentToolCallStreamProtocolError(error)) {
              this.appendAgentActivity('当前模型的工具调用流格式不兼容', 'warning');
              return;
            }
            this.failAssistantMessage(assistantMessageId, error);
          },
          onFinish: (historyMessages) => {
            if (!this.isActiveRequest(controller)) return;
            this.agentHistoryMessages = historyMessages;
          },
        },
      );
      // 旧请求的返回值不得覆盖新会话历史：只有仍属本次请求时才落库。
      if (this.isActiveRequest(controller)) {
        this.agentHistoryMessages = messages;
      }
    } catch (error) {
      if (!this.isAgentToolCallStreamProtocolError(error)) {
        throw error;
      }
      client.stop();
      if (this.agentChatClient === client) {
        this.agentChatClient = undefined;
      }
      // 已停止或已离场：不回退、不改写消息，交给外层按“非当前请求”静默收尾。
      if (!this.isActiveRequest(controller)) {
        return;
      }
      if (!this.canFallbackToRagChat) {
        throw new Error('当前模型的工具调用流格式不兼容，无法继续使用 Agent 模式');
      }
      this.resetAssistantMessageForFallback(assistantMessageId);
      this.appendAgentActivity('已切换为知识库问答模式', 'warning');
      // 回退沿用同一个 controller：归属与停止语义都不变。
      await this.askRagStream(question, assistantMessageId, controller);
    }
  }

  private async resumeAgentAfterNavigation(resume: AgentAfterNavigationResume): Promise<void> {
    if (this.isPetOnlyMode || this.streaming || !this.useAgentChat) {
      return;
    }
    const assistantMessageId = createMessageId();
    this.petPanelOpen = true;
    this.streaming = true;
    // 与手动提问同一口径：本次请求独占 controller，实例字段只作当前请求索引。
    const controller = new AbortController();
    this.abortController = controller;
    this.agentActivities = [];
    this.appendAgentActivity('页面已打开，正在继续回答', 'pending');
    this.messages = [
      ...this.messages,
      createMessage('assistant', '', {
        id: assistantMessageId,
        streaming: true,
      }),
    ];
    await this.updateComplete;
    this.scrollToBottom();

    // 等首帧期间可能已被停止、被新请求接管或已离场：不再启动请求流。
    if (!this.isActiveRequest(controller)) {
      this.finishAssistantMessage(assistantMessageId);
      if (this.abortController === controller) {
        this.streaming = false;
        this.abortController = undefined;
        this.agentChatClient = undefined;
      }
      return;
    }

    const client = new AgentChatClient();
    this.agentChatClient = client;
    try {
      const messages = await client.sendMessage(
        resume.message,
        {
          agent: this.config.agent,
          historyMessages: resume.historyMessages,
          conversationId: this.ensureConversationId(),
          visitorId: this.visitorId,
          recordUserMessage: false,
          ragEnabledForAgent: this.shouldAttachRagToAgent,
          afterNavigationDisplayMode: this.open ? 'stage' : 'panel',
          signal: controller.signal,
        },
        {
          onText: (text) => {
            if (!this.isActiveRequest(controller)) return;
            this.setAssistantContent(assistantMessageId, text);
          },
          onSources: (sources) => {
            if (!this.isActiveRequest(controller)) return;
            this.receiveSources(assistantMessageId, sources);
          },
          onError: (error) => {
            if (!this.isActiveRequest(controller)) return;
            if (this.isAgentToolCallStreamProtocolError(error)) {
              this.appendAgentActivity('当前模型的工具调用流格式不兼容', 'warning');
              return;
            }
            this.failAssistantMessage(assistantMessageId, error);
          },
          onFinish: (historyMessages) => {
            if (!this.isActiveRequest(controller)) return;
            this.agentHistoryMessages = historyMessages;
          },
        },
      );
      // 旧请求的返回值不得覆盖新会话历史：只有仍属本次请求时才落库。
      if (this.isActiveRequest(controller)) {
        this.agentHistoryMessages = messages;
      }
    } catch (error) {
      if (this.isActiveRequest(controller)) {
        if (this.isAgentToolCallStreamProtocolError(error)) {
          client.stop();
          if (this.agentChatClient === client) {
            this.agentChatClient = undefined;
          }
          if (!this.canFallbackToRagChat) {
            this.failAssistantMessage(
              assistantMessageId,
              '当前模型的工具调用流格式不兼容，无法继续使用 Agent 模式',
            );
            return;
          }
          this.resetAssistantMessageForFallback(assistantMessageId);
          this.appendAgentActivity('已切换为知识库问答模式', 'warning');
          // 回退沿用同一个 controller：归属与停止语义都不变。
          await this.askRagStream(resume.message, assistantMessageId, controller);
          return;
        }
        const message = error instanceof Error ? error.message : 'Agent 恢复回答失败';
        this.failAssistantMessage(assistantMessageId, message);
      }
    } finally {
      // 收尾只针对本条消息；共享字段仅在仍是当前请求时才归还，避免抹掉后来者的流。
      const owned = this.abortController === controller;
      this.finishAssistantMessage(assistantMessageId);
      if (owned) {
        this.streaming = false;
        this.abortController = undefined;
        this.agentChatClient = undefined;
      }
      await this.updateComplete;
      if (owned) {
        this.scrollToBottom();
      }
    }
  }

  private async askRagStream(
    question: string,
    assistantMessageId: string,
    controller: AbortController,
  ): Promise<void> {
    if (!this.useRagChat) {
      throw new Error('当前模式没有启用 RAG 知识库问答');
    }
    // 入口守卫：已停止、已离场或被新请求接管时不发起新流。
    if (!this.isActiveRequest(controller)) return;
    await askRagStream(
      {
        question,
        limit: RAG_SOURCE_LIMIT,
        conversationId: this.conversationId,
        visitorId: this.visitorId,
      },
      {
        // 会话号只要求“仍属本次请求且没被新请求接管”，用户主动停止也照样落库。
        onConversationId: (conversationId) => {
          if (!this.ownsRequest(controller)) return;
          this.persistConversationId(conversationId);
        },
        onSources: (sources) => {
          if (!this.isActiveRequest(controller)) return;
          this.appendAgentActivity(
            sources.length ? `知识库命中 ${sources.length} 个来源` : '知识库没有命中来源',
            sources.length ? 'success' : 'warning',
          );
          this.receiveSources(assistantMessageId, sources);
        },
        onDelta: (delta) => {
          if (!this.isActiveRequest(controller)) return;
          this.appendAssistantDelta(assistantMessageId, delta);
        },
        onError: (error) => {
          if (!this.isActiveRequest(controller)) return;
          this.failAssistantMessage(assistantMessageId, error);
        },
        onDone: () => {
          if (!this.isActiveRequest(controller)) return;
          this.finishAssistantMessage(assistantMessageId);
        },
      },
      controller.signal,
    );
  }

  private receiveSources(messageId: string, sources: RagSourceReference[]): void {
    if (!sources.length) {
      return;
    }
    this.updateMessage(messageId, (message) => ({
      ...message,
      sources,
    }));
    this.appendAgentActivity(`已关联 ${sources.length} 个资源`, 'success');
  }

  private appendAgentActivity(
    message: string,
    kind: RagAssistantActivity['kind'] = 'pending',
  ): void {
    const value = message.trim();
    if (!value) {
      return;
    }
    const latest = this.agentActivities[this.agentActivities.length - 1];
    if (latest?.message === value && latest.kind === kind) {
      return;
    }
    this.agentActivities = [
      ...this.agentActivities,
      {
        id: createMessageId(),
        message: value,
        kind,
        time: formatTime(),
      },
    ].slice(-8);
    void this.updateComplete.then(() => this.scrollPetPanelToBottom());
  }

  private async loadStoredConversation(): Promise<void> {
    const conversationId = this.loadConversationId();
    if (!conversationId) {
      return;
    }
    try {
      const conversation = await fetchRagConversation(conversationId, this.visitorId);
      if (!conversation) {
        this.clearConversationId();
        return;
      }
      this.conversationId = conversation.metadata.name;
      this.messages = this.toAssistantMessages(conversation);
      this.agentHistoryMessages = this.toAgentHistoryMessages(conversation);
      await this.updateComplete;
      this.scrollToBottom();
    } catch {
      this.clearConversationId();
    }
  }

  private toAssistantMessages(conversation: RagConversation): RagAssistantMessage[] {
    return (conversation.spec?.messages || [])
      .filter((message) => message.role === 'user' || message.role === 'assistant')
      .filter((message) => Boolean(message.content?.trim()))
      .map((message) => createMessage(message.role as RagAssistantMessage['role'], message.content || '', {
        id: message.id,
        time: this.messageTime(message),
        sources: message.sources,
        error: message.error,
      }));
  }

  private toAgentHistoryMessages(conversation: RagConversation): UIMessage[] {
    return (conversation.spec?.messages || [])
      .filter((message) => message.role === 'user' || message.role === 'assistant')
      .filter((message) => Boolean(message.content?.trim()))
      .map((message) => {
        const messageId = message.id || createMessageId();
        return {
          id: messageId,
          role: message.role === 'assistant' ? 'assistant' : 'user',
          parts: [
            {
              type: 'text',
              id: `${messageId}-text`,
              text: message.content || '',
            },
          ],
        };
      });
  }

  private messageTime(message: RagConversationMessage): string {
    if (!message.createdAt) {
      return formatTime();
    }
    const date = new Date(message.createdAt);
    return Number.isNaN(date.getTime()) ? formatTime() : formatTime(date);
  }

  private persistConversationId(conversationId: string): void {
    if (!conversationId.trim()) {
      return;
    }
    this.conversationId = conversationId;
    try {
      window.localStorage.setItem(CONVERSATION_ID_STORAGE_KEY, conversationId);
    } catch {
      // localStorage may be unavailable in strict privacy modes.
    }
  }

  private ensureConversationId(): string {
    if (this.conversationId) {
      return this.conversationId;
    }
    const stored = this.loadConversationId();
    if (stored) {
      this.conversationId = stored;
      return stored;
    }
    const conversationId = `rag-conv-${this.randomId().toLowerCase()}`;
    this.persistConversationId(conversationId);
    return conversationId;
  }

  private loadConversationId(): string | undefined {
    try {
      return window.localStorage.getItem(CONVERSATION_ID_STORAGE_KEY) || undefined;
    } catch {
      return undefined;
    }
  }

  private loadOrCreateVisitorId(): string {
    try {
      const existing = window.localStorage.getItem(VISITOR_ID_STORAGE_KEY);
      if (existing) {
        return existing;
      }
      const visitorId = `rag-visitor-${this.randomId()}`;
      window.localStorage.setItem(VISITOR_ID_STORAGE_KEY, visitorId);
      return visitorId;
    } catch {
      return `rag-visitor-${this.randomId()}`;
    }
  }

  private randomId(): string {
    if (window.crypto?.randomUUID) {
      return window.crypto.randomUUID();
    }
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }

  private clearConversationId(): void {
    this.conversationId = undefined;
    try {
      window.localStorage.removeItem(CONVERSATION_ID_STORAGE_KEY);
    } catch {
      // localStorage may be unavailable in strict privacy modes.
    }
  }

  private setAssistantContent(messageId: string, content: string): void {
    this.updateMessage(messageId, (message) => ({
      ...message,
      content,
    }));
    void this.updateComplete.then(() => this.scrollToBottom());
  }

  private appendAssistantDelta(messageId: string, delta: string): void {
    if (!delta) {
      return;
    }

    this.updateMessage(messageId, (message) => ({
      ...message,
      content: `${message.content}${delta}`,
    }));
    void this.updateComplete.then(() => this.scrollToBottom());
  }

  private failAssistantMessage(messageId: string, error: string): void {
    this.triggerPetError();
    this.updateMessage(messageId, (message) => ({
      ...message,
      content: error,
      error: true,
      streaming: false,
    }));
    this.streaming = false;
  }

  private resetAssistantMessageForFallback(messageId: string): void {
    this.updateMessage(messageId, (message) => ({
      ...message,
      content: '',
      error: false,
      streaming: true,
      sources: undefined,
    }));
  }

  private isAgentToolCallStreamProtocolError(error: unknown): boolean {
    const message = typeof error === 'string'
      ? error
      : error instanceof Error
        ? error.message
        : String(error ?? '');
    return /tool-call stream part toolCallId must not be blank|toolCallId must not be blank/i
      .test(message);
  }

  private showLoginRequiredMessage(): void {
    const content = '请登录后再使用智能助手。';
    const lastMessage = this.messages[this.messages.length - 1];
    this.petPanelOpen = true;
    this.petSpeechVisible = false;
    this.appendAgentActivity('请登录后再使用智能助手', 'warning');
    if (lastMessage?.role === 'assistant' && lastMessage.content === content) {
      return;
    }
    this.messages = [
      ...this.messages,
      createMessage('assistant', content, { error: true }),
    ];
    void this.updateComplete.then(() => this.scrollPetPanelToBottom());
  }

  private showChatModeUnavailableMessage(): void {
    const content = this.chatModeUnavailableMessage;
    const lastMessage = this.messages[this.messages.length - 1];
    this.petPanelOpen = true;
    this.petSpeechVisible = false;
    this.appendAgentActivity(content, 'warning');
    if (lastMessage?.role === 'assistant' && lastMessage.content === content) {
      return;
    }
    this.messages = [
      ...this.messages,
      createMessage('assistant', content, { error: true }),
    ];
    void this.updateComplete.then(() => this.scrollPetPanelToBottom());
  }

  private finishAssistantMessage(messageId: string): void {
    this.updateMessage(messageId, (message) => ({
      ...message,
      content: message.content || (message.error ? message.content : '未找到相关资料，可尝试换个问题。'),
      streaming: false,
    }));
  }

  private updateMessage(
    messageId: string,
    updater: (message: RagAssistantMessage) => RagAssistantMessage,
  ): void {
    this.messages = updateMessageById(this.messages, messageId, updater);
  }

  private toggleSourceReferences(messageId: string, event: Event): void {
    const target = event.currentTarget;
    if (!(target instanceof HTMLDetailsElement)) {
      return;
    }

    const expandedIds = new Set(this.expandedSourceMessageIds);
    if (target.open) {
      expandedIds.add(messageId);
    } else {
      expandedIds.delete(messageId);
    }
    this.expandedSourceMessageIds = Array.from(expandedIds);
  }

  private close(): void {
    this.open = false;
    this.clearSelectionPopup();
  }

  private newConversation(): void {
    if (this.isPetOnlyMode) {
      return;
    }
    this.abortCurrentRequest();
    this.clearConversationId();
    this.agentHistoryMessages = [];
    this.messages = [];
    this.agentActivities = [];
    this.input = '';
    this.selectedContext = '';
    this.streaming = false;
    this.petPanelOpen = true;
    void this.updateComplete.then(() => this.focusCurrentInput());
  }

  private askWithSelection(): void {
    if (this.isPetOnlyMode) {
      this.clearSelectionPopup();
      return;
    }
    const text = this.selectionPopup.text.trim();
    if (!text) {
      return;
    }

    this.selectedContext = text;
    this.petPanelOpen = true;
    this.petSpeechVisible = false;
    this.clearSelectionPopup();
    void this.updateComplete.then(() => this.focusPetInput());
  }

  private updateSelectionPopup(): void {
    if (this.isPetOnlyMode) {
      this.selectionPopup = EMPTY_SELECTION_POPUP;
      return;
    }
    this.selectionPopup = resolveSelectionPopup(MAX_SELECTION_LENGTH);
  }

  private clearSelectionPopup(): void {
    if (!this.selectionPopup.visible) {
      return;
    }

    this.selectionPopup = EMPTY_SELECTION_POPUP;
  }

  private resizeInput(target?: HTMLTextAreaElement): void {
    if (!target) {
      return;
    }

    target.style.height = 'auto';
    target.style.height = `${Math.min(Math.max(target.scrollHeight, 38), 118)}px`;
  }

  private focusInput(): void {
    this.inputElement?.focus();
  }

  private focusPetInput(): void {
    this.petInputElement?.focus();
  }

  private focusCurrentInput(): void {
    if (this.open) {
      this.focusInput();
      return;
    }
    this.focusPetInput();
  }

  private openPetStage(): void {
    if (this.isPetOnlyMode) {
      return;
    }
    this.open = true;
    this.petPanelOpen = false;
    void this.updateComplete.then(() => {
      this.scrollToBottom();
      this.focusInput();
    });
  }

  private clearSelectedContext(): void {
    this.selectedContext = '';
    void this.updateComplete.then(() => this.focusPetInput());
  }

  private expandLatestSources(): void {
    const messageId = this.latestAssistantMessageWithSources?.id;
    if (!messageId) {
      return;
    }
    const expandedIds = new Set(this.expandedSourceMessageIds);
    expandedIds.add(messageId);
    this.expandedSourceMessageIds = Array.from(expandedIds);
    this.open = true;
    void this.updateComplete.then(() => this.scrollToBottom());
  }

  private usePrompt(prompt: string): void {
    if (prompt) {
      this.input = prompt;
    }
    void this.updateComplete.then(() => this.focusCurrentInput());
  }

  private scrollToBottom(): void {
    if (!this.messagesElement) {
      return;
    }

    this.messagesElement.scrollTop = this.messagesElement.scrollHeight;
  }

  private scrollPetPanelToBottom(): void {
    void this.updateComplete.then(() => {
      if (!this.petPanelThreadElement) {
        return;
      }
      this.petPanelThreadElement.scrollTop = this.petPanelThreadElement.scrollHeight;
    });
  }

  /**
   * 请求归属判据：元素仍在线，且实例字段指向的就是这次请求。
   * 不看中止状态，供“用户主动停止也要保留”的落库型回调使用。
   */
  private ownsRequest(controller: AbortController): boolean {
    return this.isConnected && this.abortController === controller;
  }

  /**
   * 请求仍生效判据：在归属之上再排除已中止的请求。
   * 所有会改写界面或消息的回调都要先过这一关，否则旧请求的迟到回调会写进新会话。
   */
  private isActiveRequest(controller: AbortController): boolean {
    return this.ownsRequest(controller) && !controller.signal.aborted;
  }

  /** 昼夜偏好监听：老 Safari 只有 addListener/removeListener，两条通道都要接住。 */
  private bindColorSchemeListener(query?: MediaQueryList): void {
    if (!query) {
      return;
    }
    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', this.refreshAssistantTheme);
      return;
    }
    query.addListener?.(this.refreshAssistantTheme);
  }

  private unbindColorSchemeListener(query?: MediaQueryList): void {
    if (!query) {
      return;
    }
    if (typeof query.removeEventListener === 'function') {
      query.removeEventListener('change', this.refreshAssistantTheme);
      return;
    }
    query.removeListener?.(this.refreshAssistantTheme);
  }

  private abortCurrentRequest(): void {
    this.agentChatClient?.stop();
    this.agentChatClient = undefined;
    if (!this.abortController || this.abortController.signal.aborted) {
      return;
    }

    this.abortController.abort();
  }

  private stopCurrentResponse(): void {
    if (!this.streaming) {
      return;
    }
    const streamingMessage = [...this.messages]
      .reverse()
      .find((message) => message.role === 'assistant' && message.streaming);
    if (streamingMessage) {
      this.updateMessage(streamingMessage.id, (message) => ({
        ...message,
        content: message.content || '已停止生成。',
        streaming: false,
      }));
    }
    this.appendAgentActivity('已停止生成', 'warning');
    this.streaming = false;
    this.abortCurrentRequest();
  }

  private async copyMessage(message: RagAssistantMessage): Promise<void> {
    const content = message.content.trim();
    if (!content) {
      return;
    }
    const copied = await copyAssistantText(content);
    this.appendAgentActivity(
      copied ? '已复制到剪贴板' : '复制未能完成，请手动选择文本',
      copied ? 'success' : 'error',
    );
  }

  private retryMessage(message: RagAssistantMessage): void {
    if (this.streaming) {
      return;
    }
    const question = message.role === 'user'
      ? message.content
      : this.previousUserQuestion(message.id);
    if (!question.trim()) {
      return;
    }
    void this.submitQuestion(question);
  }

  private previousUserQuestion(messageId: string): string {
    const index = this.messages.findIndex((message) => message.id === messageId);
    if (index <= 0) {
      return '';
    }
    for (let i = index - 1; i >= 0; i -= 1) {
      const message = this.messages[i];
      if (message.role === 'user' && message.content.trim()) {
        return message.content;
      }
    }
    return '';
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  private normalizeFloatingOffset(value: number): number {
    return Number.isFinite(value)
      ? Math.max(0, value)
      : DEFAULT_RAG_ASSISTANT_CONFIG.horizontalOffset;
  }

  private isSourceReferencesOpen(messageId: string): boolean {
    return this.expandedSourceMessageIds.includes(messageId);
  }

  private get isStellar(): boolean {
    return this.config.styleConfig.stylePreset === 'stellar';
  }

  private get effectiveAssistantAvatar(): string | undefined {
    return this.isStellar && isDefaultAssistantAvatar(this.config.assistantAvatar)
      ? undefined : this.config.assistantAvatar;
  }

  private get stellarPetState(): 'idle' | 'hover' | 'thinking' | 'error' | 'dragging' {
    if (this.draggingBubble) return 'dragging';
    if (this.petErrorUntil > Date.now()) return 'error';
    if (this.streaming) return 'thinking';
    return this.petHovering ? 'hover' : 'idle';
  }

  private get thinkingSpeechMessage(): string {
    return this.isStellar ? '正在校准星图，解码你的问题…' : PETDEX_THINKING_SPEECH_MESSAGE;
  }

  private get assistantName(): string {
    return this.isStellar ? resolveStellarName(this.config.assistantName)
      : this.config.assistantName || DEFAULT_RAG_ASSISTANT_CONFIG.assistantName;
  }

  private get isPetOnlyMode(): boolean {
    return this.config.displayMode === 'petOnly';
  }

  private get isRagAgentMode(): boolean {
    return this.config.displayMode === 'ragAgent';
  }

  private get isRagOnlyMode(): boolean {
    return this.config.displayMode === 'rag';
  }

  private get isAgentOnlyMode(): boolean {
    return this.config.displayMode === 'agent';
  }

  private get canUseAssistantChat(): boolean {
    return this.config.access.allowAnonymous || this.config.access.authenticated;
  }

  private get canUseSelectedChatMode(): boolean {
    return this.useAgentChat || this.useRagChat;
  }

  private get canFallbackToRagChat(): boolean {
    return this.isRagAgentMode && this.useRagChat;
  }

  private get petInputPlaceholder(): string {
    if (!this.canUseAssistantChat) {
      return '请登录后使用智能助手';
    }
    if (!this.canUseSelectedChatMode) {
      return this.chatModeUnavailableMessage;
    }
    if (this.isStellar) return this.selectedContext ? '发来问题，一起解读这段信号…' : '发来问题，检索星港记录…';
    if (this.selectedContext) {
      return '想问这段内容什么？';
    }
    if (this.isAgentOnlyMode) {
      return '请输入要让助手处理的问题...';
    }
    if (this.isRagAgentMode) {
      return '请输入问题，助手会按需使用站点工具或知识库...';
    }
    return RAG_INPUT_PLACEHOLDER;
  }

  private get selectedContextPreview(): string {
    return this.truncateText(this.selectedContext, 120);
  }

  private get petPanelStyle(): string {
    const height = Math.round(this.clampPetPanelHeight(this.petPanelHeight));
    const sizeStyle = `--rag-pet-panel-height:${height}px`;
    if (!this.isStellar) return sizeStyle;
    // 面板独立钳制在视口内：拖动到中间、靠近顶部或缩放窗口都不能把输入区挤出屏幕。
    const margin = 12;
    const width = Math.min(window.innerWidth <= 860 ? 368 : 410, window.innerWidth - margin * 2);
    const position = this.floatingPosition || this.defaultFloatingPosition(this.config);
    const rightSide = position.x + this.bubbleWidth / 2 >= window.innerWidth / 2;
    const preferredLeft = rightSide ? position.x + this.bubbleWidth - width : position.x;
    const left = this.clamp(preferredLeft, margin, window.innerWidth - width - margin);
    const panelHeight = Math.min(height, window.innerHeight - margin * 2);
    const top = this.clamp(position.y - PET_PANEL_TOP_GAP - panelHeight, margin, window.innerHeight - panelHeight - margin);
    return `${sizeStyle};position:fixed;left:${Math.round(left)}px;right:auto;top:${Math.round(top)}px;bottom:auto;height:${panelHeight}px`;
  }

  private get latestAssistantMessageWithSources(): RagAssistantMessage | undefined {
    return [...this.messages]
      .reverse()
      .find((message) => message.role === 'assistant' && Boolean(message.sources?.length));
  }

  private get hasLatestSources(): boolean {
    return Boolean(this.latestAssistantMessageWithSources);
  }

  private get panelStatusText(): string {
    const latest = this.agentActivities[this.agentActivities.length - 1]?.message;
    if (this.streaming && latest) {
      return latest;
    }
    if (this.isStellar) return this.streaming ? '正在解码信号' : '星港通讯已就绪';
    return this.streaming ? '正在找答案' : '想问我什么？';
  }

  private get useAgentChat(): boolean {
    return (this.isRagAgentMode || this.isAgentOnlyMode)
      && this.config.agent?.enabled !== false
      && this.config.access.agentAllowed !== false;
  }

  private get useRagChat(): boolean {
    return (this.isRagAgentMode || this.isRagOnlyMode) && this.config.ragEnabled !== false;
  }

  private get shouldAttachRagToAgent(): boolean {
    return this.isRagAgentMode && this.config.ragEnabled !== false;
  }

  private get chatModeUnavailableMessage(): string {
    if (this.isPetOnlyMode) {
      return '当前为纯宠物模式，不提供问答面板。';
    }
    if (this.isRagOnlyMode && this.config.ragEnabled === false) {
      return '当前为 RAG 模式，但 RAG 知识库未启用。';
    }
    if (this.isAgentOnlyMode) {
      if (this.config.agent?.enabled === false) {
        return '当前为 Agent 模式，但 Agent 能力未启用。';
      }
      if (this.config.access.agentAllowed === false) {
        return '当前访问模式未开放 Agent。';
      }
    }
    if (this.isRagAgentMode) {
      if (this.config.agent?.enabled === false && this.config.ragEnabled === false) {
        return '当前为知识库问答 + Agent 模式，但知识库问答和 Agent 都未启用。';
      }
      if (this.config.agent?.enabled !== false && this.config.access.agentAllowed === false
        && this.config.ragEnabled === false) {
        return '当前访问模式未开放 Agent，且知识库问答未启用。';
      }
    }
    return '当前前台显示模式暂不可用，请联系站长检查配置。';
  }

  private get selectionActionLabel(): string {
    if (this.isStellar) return `询问${this.assistantName}`;
    return this.isRagOnlyMode ? '问知识库' : '问助手';
  }

  private get avatarFallbackText(): string {
    return Array.from(this.assistantName.trim())[0] || '智';
  }

  private get petSize(): number {
    return this.config.petSize || DEFAULT_RAG_PET_SIZE;
  }

  private get petMetrics(): ReturnType<typeof getPetdexMetrics> {
    if (this.isStellar) {
      const width = this.petSize;
      return { width, height: Math.round(width * 108 / 96), sheetWidth: width, sheetHeight: Math.round(width * 108 / 96) };
    }
    return getPetdexMetrics(this.petSize);
  }

  private get bubbleWidth(): number {
    return this.petMetrics.width;
  }

  private get bubbleHeight(): number {
    return this.petMetrics.height;
  }

  private get petButtonStyle(): string {
    const metrics = this.petMetrics;
    return [
      `--rag-pet-width:${metrics.width}px`,
      `--rag-pet-height:${metrics.height}px`,
      `--rag-pet-sheet-width:${metrics.sheetWidth}px`,
      `--rag-pet-sheet-height:${metrics.sheetHeight}px`,
    ].join(';');
  }

  private get petSpriteStyle(): string {
    const metrics = this.petMetrics;
    const frame = getPetdexFrame(this.petAnimationState, this.petFrameIndex);
    return [
      `background-image:url("${this.escapeCssUrl(this.petSpriteUrl)}")`,
      `--rag-pet-frame-x:${-frame.col * metrics.width}px`,
      `--rag-pet-frame-y:${-frame.row * metrics.height}px`,
    ].join(';');
  }

  private get petAnimationState() {
    return {
      errorActive: this.petErrorUntil > Date.now(),
      direction: this.petDragDirection,
      thinking: this.isPetThinkingOutsideWindow(),
      hovering: this.petHovering,
    };
  }

  private get petSpeechMessages(): string[] {
    const messages = this.config.petSpeechMessages || [];
    return messages.length ? messages : DEFAULT_RAG_PET_SPEECH_MESSAGES;
  }

  private get quickQuestions(): string[] {
    const questions = this.config.quickQuestions || [];
    return questions.filter((question) => question.trim()).slice(0, 8);
  }

  private getCurrentPetSpeech(): string {
    return this.petSpeechText;
  }

  private get hasActivePet(): boolean {
    return this.isStellar || Boolean(this.config.pet?.spritesheetUrl);
  }

  private get canRenderFloatingPet(): boolean {
    return this.configLoaded
      && this.floatingPositionReady
      && this.hasActivePet
      && this.petSpriteReady;
  }

  private get petSpriteUrl(): string {
    return this.config.pet?.spritesheetUrl || '';
  }

  private escapeCssUrl(value: string): string {
    return value.replace(/["\\\n\r\f]/g, '');
  }

  private truncateText(value: string, maxLength: number): string {
    const normalized = value.replace(/\s+/g, ' ').trim();
    if (normalized.length <= maxLength) {
      return normalized;
    }
    return `${normalized.slice(0, Math.max(0, maxLength - 1))}…`;
  }

  private get welcomeMessage(): string {
    if (this.isStellar) return resolveStellarWelcome(this.config.welcomeMessage, this.assistantName);
    return (this.config.welcomeMessage || DEFAULT_RAG_ASSISTANT_CONFIG.welcomeMessage)
      .replace('{assistantName}', this.assistantName);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'summaraid-rag-assistant': RagAssistantWidget;
  }
}
