import { css } from 'lit';

/**
 * 星港风格（stellar）的配色与形态。
 *
 * 三条口径：
 * 1. 全部规则都以 :host([data-assistant-style='stellar']) 收口，未选该风格时这份样式表不产生任何效果；
 * 2. 主色/文字/面板一律引用站点变量（--cyan、--text、--panel…），引用链在 theme.ts 里建立，
 *    这里只提供它们缺席时的兜底令牌 --rag-stellar-*，并按 data-assistant-scheme 给昼夜两套；
 * 3. 圆角、阴影、光泽都从变量取，不写死具体品牌色，换配色时不改这份文件。
 */
export const stellarStyles = css`
  /* ═══════════ 兜底色板 · 深夜（标记缺席或为 dark） ═══════════ */
  :host([data-assistant-style='stellar']) {
    /* 站点变量缺席时的回落色，取值与星港主题的深夜口径一致 */
    --rag-stellar-cyan: #22d3ee;
    --rag-stellar-violet: #a78bfa;
    --rag-stellar-bg: #05070d;
    --rag-stellar-text: #e6e9f2;
    --rag-stellar-text-dim: #9aa3b8;
    --rag-stellar-panel: rgba(16, 19, 26, 0.86);
    --rag-stellar-panel-soft: rgba(255, 255, 255, 0.05);
    --rag-stellar-panel-border: rgba(255, 255, 255, 0.12);
    --rag-stellar-chip-bg: rgba(9, 13, 22, 0.55);
    --rag-stellar-hairline: rgba(255, 255, 255, 0.08);
    --rag-stellar-reader-text: #b9c1d4;
    --rag-stellar-contrast: #04121a;
    --rag-stellar-glow: rgba(34, 211, 238, 0.3);
    --rag-stellar-halo: rgba(167, 139, 250, 0.26);
    --rag-stellar-signal: #f87171;
    --rag-stellar-signal-soft: rgba(248, 113, 113, 0.14);
    --rag-stellar-code-bg: #060a12;
    --rag-stellar-code-text: #d7e3ff;
    --rag-stellar-drop: rgba(2, 4, 9, 0.46);
    --rag-stellar-text-shadow: 0 1px 14px rgba(0, 0, 0, 0.5);
    --rag-stellar-drone-filter: drop-shadow(0 10px 18px var(--rag-stellar-drop));
    --rag-stellar-shadow-panel: 0 26px 64px rgba(2, 4, 9, 0.6), 0 2px 0 rgba(255, 255, 255, 0.04) inset;
    --rag-stellar-shadow-card: 0 10px 26px rgba(2, 4, 9, 0.44);
    --rag-stellar-shadow-control: 0 8px 20px rgba(2, 4, 9, 0.36);

    /* 宿主层级：正文 261 / 目录 265 / 装载 290 / 跃迁 300。
       内层沿用原有的极大 z-index，它们只在宿主这一个层叠上下文里排序。 */
    z-index: 280;
    font-family: var(--sans, sans-serif);
  }

  /* ═══════════ 兜底色板 · 白昼 ═══════════ */
  :host([data-assistant-style='stellar'][data-assistant-scheme='light']) {
    --rag-stellar-cyan: #0e7490;
    --rag-stellar-violet: #6d28d9;
    --rag-stellar-bg: #eef1f7;
    --rag-stellar-text: #131a2a;
    --rag-stellar-text-dim: #3d4759;
    --rag-stellar-panel: rgba(255, 255, 255, 0.9);
    --rag-stellar-panel-soft: rgba(255, 255, 255, 0.62);
    --rag-stellar-panel-border: rgba(19, 26, 42, 0.14);
    --rag-stellar-chip-bg: rgba(255, 255, 255, 0.68);
    --rag-stellar-hairline: rgba(19, 26, 42, 0.12);
    --rag-stellar-reader-text: #2c3444;
    --rag-stellar-contrast: #ffffff;
    --rag-stellar-glow: rgba(14, 116, 144, 0.2);
    --rag-stellar-halo: rgba(109, 40, 217, 0.16);
    --rag-stellar-signal: #be123c;
    --rag-stellar-signal-soft: rgba(190, 18, 60, 0.1);
    --rag-stellar-code-bg: #f4f7fc;
    --rag-stellar-code-text: #1b2231;
    --rag-stellar-drop: rgba(19, 26, 42, 0.18);
    /* 白昼底本身就是亮的，投影只会把字糊掉，与主题在浅色下的口径一致 */
    --rag-stellar-text-shadow: none;
    --rag-stellar-shadow-panel: 0 22px 54px rgba(19, 26, 42, 0.18), 0 1px 0 rgba(255, 255, 255, 0.6) inset;
    --rag-stellar-shadow-card: 0 10px 24px rgba(19, 26, 42, 0.12);
    --rag-stellar-shadow-control: 0 8px 18px rgba(19, 26, 42, 0.1);
  }

  /* ═══════════ 浏览器表面：选区、光标、焦点、滚动条 ═══════════ */
  :host([data-assistant-style='stellar']) ::selection {
    background: color-mix(in srgb, var(--rag-gold) 30%, transparent);
    color: var(--rag-text);
  }

  :host([data-assistant-style='stellar']) .input,
  :host([data-assistant-style='stellar']) .pet-composer-input {
    caret-color: var(--rag-gold);
  }

  :host([data-assistant-style='stellar']) button:focus-visible,
  :host([data-assistant-style='stellar']) textarea:focus-visible,
  :host([data-assistant-style='stellar']) summary:focus-visible,
  :host([data-assistant-style='stellar']) a:focus-visible {
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--rag-gold) 30%, transparent),
      var(--rag-control-shadow);
  }

  :host([data-assistant-style='stellar']) .pet-panel-thread,
  :host([data-assistant-style='stellar']) .pet-answer-body,
  :host([data-assistant-style='stellar']) .pet-stage-output {
    scrollbar-color: color-mix(in srgb, var(--rag-gold) 36%, transparent) transparent;
  }

  /* ═══════════ 悬浮角色：切角机甲无人机 ═══════════ */
  :host([data-assistant-style='stellar']) .stellar-pet {
    position: relative;
    display: block;
    width: var(--rag-pet-width, 76px);
    height: var(--rag-pet-height, 82px);
    /* 角色只做展示，指针事件照旧落在 .bubble 按钮上，拖动逻辑不受影响 */
    pointer-events: none;
  }

  /* 星尘信标：角色身后的一圈柔光，只在等待应答时呼吸 */
  :host([data-assistant-style='stellar']) .stellar-pet::before {
    content: '';
    position: absolute;
    inset: 16% 10% 8%;
    border-radius: 50%;
    background: radial-gradient(circle at 50% 56%, var(--rag-stellar-glow), transparent 68%);
    filter: blur(6px);
    opacity: 0.7;
  }

  :host([data-assistant-style='stellar']) .stellar-drone {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100%;
    /* 轨道与推进尾焰允许溢出画布 */
    overflow: visible;
    color: var(--rag-gold);
    filter: var(--rag-stellar-drone-filter);
    transform-origin: 50% 56%;
    /* 待机只有整机轻悬浮与一圈慢轨道，其余部件静置 */
    animation: stellar-hover 4.6s ease-in-out infinite;
    transition: color 0.22s ease, filter 0.22s ease;
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-direction='left'] .stellar-drone {
    scale: -1 1;
  }

  :host([data-assistant-style='stellar']) .drone-orbit {
    color: color-mix(in srgb, var(--rag-gold) 58%, transparent);
    transform-box: fill-box;
    transform-origin: center;
    animation: stellar-orbit 18s linear infinite;
  }

  /* 舱体给一层面板底，空心线稿才会有实体感 */
  :host([data-assistant-style='stellar']) .drone-hull {
    color: var(--rag-gold);
    fill: color-mix(in srgb, var(--rag-panel) 88%, transparent);
  }

  :host([data-assistant-style='stellar']) .drone-wing {
    color: var(--rag-gold);
    fill: color-mix(in srgb, var(--rag-panel) 62%, transparent);
  }

  :host([data-assistant-style='stellar']) .drone-visor {
    color: color-mix(in srgb, var(--rag-gold) 74%, var(--rag-text));
    fill: var(--chip-bg, var(--rag-stellar-chip-bg));
  }

  :host([data-assistant-style='stellar']) .drone-status {
    color: color-mix(in srgb, var(--rag-text) 46%, transparent);
  }

  :host([data-assistant-style='stellar']) .drone-eye {
    color: var(--rag-gold);
    filter: drop-shadow(0 0 4px var(--rag-stellar-glow));
  }

  :host([data-assistant-style='stellar']) .drone-core {
    color: var(--violet, var(--rag-stellar-violet));
    fill: color-mix(in srgb, var(--violet, var(--rag-stellar-violet)) 30%, transparent);
    filter: drop-shadow(0 0 5px var(--rag-stellar-halo));
    transform-box: fill-box;
    transform-origin: center;
  }

  :host([data-assistant-style='stellar']) .drone-thruster {
    color: color-mix(in srgb, var(--rag-gold) 68%, transparent);
    opacity: 0.55;
  }

  /* 悬停：主光提亮，悬浮略快，指示灯与星核开始呼吸 */
  :host([data-assistant-style='stellar']) .stellar-pet[data-state='hover'] .stellar-drone {
    filter: var(--rag-stellar-drone-filter) brightness(1.14);
    animation-duration: 3s;
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-state='hover'] .drone-orbit {
    animation-duration: 9s;
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-state='hover'] .drone-eye {
    animation: stellar-eye 3.4s ease-in-out infinite;
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-state='hover'] .drone-core {
    animation: stellar-core 5s ease-in-out infinite;
  }

  /* 等待应答：轨道提速、星核与指示灯频繁起落，一眼可辨 */
  :host([data-assistant-style='stellar']) .stellar-pet[data-state='thinking'] .drone-orbit {
    color: color-mix(in srgb, var(--rag-gold) 78%, var(--violet, var(--rag-stellar-violet)));
    animation-duration: 2.4s;
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-state='thinking'] .drone-core {
    animation: stellar-core 1.1s ease-in-out infinite;
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-state='thinking'] .drone-eye {
    animation: stellar-eye 0.9s ease-in-out infinite;
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-state='thinking'] .drone-thruster {
    animation: stellar-thruster 0.9s ease-out infinite;
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-state='thinking']::before {
    animation: stellar-beacon 1.8s ease-in-out infinite;
  }

  /* 出错：整机停在警示色，描边加粗，轨道停转 */
  :host([data-assistant-style='stellar']) .stellar-pet[data-state='error'] .stellar-drone {
    color: var(--rag-stellar-signal);
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-state='error'] .drone-eye,
  :host([data-assistant-style='stellar']) .stellar-pet[data-state='error'] .drone-core {
    color: var(--rag-stellar-signal);
    filter: none;
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-state='error'] .drone-hull {
    stroke-width: 2.4;
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-state='error'] .drone-orbit,
  :host([data-assistant-style='stellar']) .stellar-pet[data-state='error'] .drone-thruster {
    animation: none;
    opacity: 0.32;
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-state='error']::before {
    background: radial-gradient(circle at 50% 56%, color-mix(in srgb, var(--rag-stellar-signal) 30%, transparent), transparent 68%);
  }

  /* 拖拽：不悬浮，轻微侧倾，姿态跟手 */
  :host([data-assistant-style='stellar']) .stellar-pet[data-state='dragging'] .stellar-drone {
    animation: none;
    transform: rotate(-5deg) scale(0.98);
  }

  :host([data-assistant-style='stellar']) .stellar-pet[data-state='dragging']::before {
    animation: none;
    opacity: 0.34;
  }

  /* 徽记：小尺寸出现，落在头像里时改取主色上的文字色，避免青底压青 */
  :host([data-assistant-style='stellar']) .stellar-emblem {
    display: block;
    width: var(--rag-emblem-size, 20px);
    height: auto;
    max-width: 100%;
    aspect-ratio: 1 / 1;
    color: var(--rag-gold);
    filter: drop-shadow(0 0 6px var(--rag-stellar-glow));
  }

  /* 徽记刻度：按出现的场合定尺寸，免得各处的 svg 图标规则互相顶掉 */
  :host([data-assistant-style='stellar']) .stellar-message-emblem {
    display: inline-flex;
    align-items: center;
    --rag-emblem-size: 16px;
  }

  :host([data-assistant-style='stellar']) .selection-popover .stellar-emblem,
  :host([data-assistant-style='stellar']) .pet-panel-quick .stellar-emblem {
    --rag-emblem-size: 18px;
  }

  :host([data-assistant-style='stellar']) .pet-panel-sources summary .stellar-emblem,
  :host([data-assistant-style='stellar']) .pet-stage-sources summary .stellar-emblem {
    --rag-emblem-size: 14px;
  }

  :host([data-assistant-style='stellar']) .pet-panel-action .stellar-emblem,
  :host([data-assistant-style='stellar']) .pet-stage-action .stellar-emblem,
  :host([data-assistant-style='stellar']) .pet-stage-close .stellar-emblem {
    --rag-emblem-size: 15px;
  }

  :host([data-assistant-style='stellar']) .pet-panel-avatar .stellar-emblem,
  :host([data-assistant-style='stellar']) .pet-stage-avatar .stellar-emblem {
    --rag-emblem-size: 62%;
    color: var(--rag-primary-contrast);
  }

  /* ═══════════ 小窗：星港舷窗 ═══════════ */
  :host([data-assistant-style='stellar']) .pet-panel {
    border: 1px solid var(--rag-line);
    border-radius: var(--rag-radius-panel, 18px);
    background:
      linear-gradient(var(--rag-gold), var(--rag-gold)) left 7px top 7px / 12px 1.5px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) left 7px top 7px / 1.5px 12px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) right 7px top 7px / 12px 1.5px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) right 7px top 7px / 1.5px 12px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) left 7px bottom 7px / 12px 1.5px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) left 7px bottom 7px / 1.5px 12px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) right 7px bottom 7px / 12px 1.5px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) right 7px bottom 7px / 1.5px 12px,
      radial-gradient(120% 80% at 14% 0%, color-mix(in srgb, var(--rag-gold) 12%, transparent), transparent 46%),
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--rag-panel) 96%, transparent),
        color-mix(in srgb, var(--rag-panel) 88%, transparent)
      );
    background-repeat: no-repeat;
    box-shadow: var(--rag-shadow);
    backdrop-filter: blur(20px) saturate(1.18);
    -webkit-backdrop-filter: blur(20px) saturate(1.18);
  }

  :host([data-assistant-style='stellar']) .pet-panel-resize::before {
    background: color-mix(in srgb, var(--rag-gold) 48%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-panel-resize:hover::before,
  :host([data-assistant-style='stellar']) .pet-panel-resize:focus-visible::before,
  :host([data-assistant-style='stellar']) .pet-panel.resizing .pet-panel-resize::before {
    background: var(--rag-gold);
  }

  :host([data-assistant-style='stellar']) .pet-panel-kicker {
    color: var(--rag-muted);
    letter-spacing: 0.1em;
  }

  :host([data-assistant-style='stellar']) .pet-panel-title strong,
  :host([data-assistant-style='stellar']) .pet-stage-title strong {
    color: var(--rag-text);
    font-family: var(--sans, sans-serif);
  }

  :host([data-assistant-style='stellar']) .pet-panel-avatar-fallback,
  :host([data-assistant-style='stellar']) .pet-stage-avatar-fallback {
    font-family: var(--hud, sans-serif);
    letter-spacing: 0.04em;
  }

  :host([data-assistant-style='stellar']) .pet-panel-avatar,
  :host([data-assistant-style='stellar']) .pet-stage-avatar {
    color: var(--rag-primary-contrast);
  }

  /* 面板与来源里的说明文字，原先是按浅色底写死的深蓝灰 */
  :host([data-assistant-style='stellar']) .pet-panel-bubble,
  :host([data-assistant-style='stellar']) .pet-answer-body,
  :host([data-assistant-style='stellar']) .pet-panel-welcome,
  :host([data-assistant-style='stellar']) .pet-context p,
  :host([data-assistant-style='stellar']) .pet-source-row {
    color: var(--rag-text);
  }

  :host([data-assistant-style='stellar']) .pet-panel-bubble {
    border-color: var(--rag-line);
    background: color-mix(in srgb, var(--rag-panel) 70%, transparent);
    box-shadow: inset 0 1px 0 color-mix(in srgb, var(--rag-text) 7%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-panel-bubble.error,
  :host([data-assistant-style='stellar']) .pet-answer.error {
    color: var(--rag-stellar-signal);
    border-color: color-mix(in srgb, var(--rag-stellar-signal) 32%, transparent);
    background: var(--rag-stellar-signal-soft);
  }

  :host([data-assistant-style='stellar']) .pet-panel-sources summary {
    color: var(--rag-gold-strong);
    border-color: color-mix(in srgb, var(--rag-gold) 30%, transparent);
    background: color-mix(in srgb, var(--rag-gold) 12%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-answer,
  :host([data-assistant-style='stellar']) .pet-panel-empty {
    border-color: var(--rag-line);
    background: color-mix(in srgb, var(--rag-panel) 70%, transparent);
    box-shadow: var(--rag-control-shadow);
  }

  :host([data-assistant-style='stellar']) .pet-context {
    border-color: color-mix(in srgb, var(--rag-gold) 26%, transparent);
    background: color-mix(in srgb, var(--rag-gold) 8%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-context span {
    color: var(--rag-gold-strong);
  }

  :host([data-assistant-style='stellar']) .pet-panel-action.is-danger {
    color: var(--rag-stellar-signal);
    border-color: color-mix(in srgb, var(--rag-stellar-signal) 28%, transparent);
    background: var(--rag-stellar-signal-soft);
  }

  :host([data-assistant-style='stellar']) .pet-panel-quick button,
  :host([data-assistant-style='stellar']) .pet-panel-action,
  :host([data-assistant-style='stellar']) .pet-message-actions button,
  :host([data-assistant-style='stellar']) .pet-source-link {
    box-shadow: var(--rag-control-shadow);
  }

  :host([data-assistant-style='stellar']) .pet-panel-avatar.has-image {
    background: color-mix(in srgb, var(--rag-panel) 88%, transparent);
  }

  /* 来源入口原先是「主色淡底 + 白」的浅色画法，深夜会糊出一块白 */
  :host([data-assistant-style='stellar']) .pet-source-link {
    color: var(--rag-gold-strong);
    border-color: color-mix(in srgb, var(--rag-gold) 28%, transparent);
    background: color-mix(in srgb, var(--rag-gold) 12%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-source-row:hover {
    color: var(--rag-text);
    background: color-mix(in srgb, var(--rag-gold) 12%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-panel-action[data-tooltip]::before {
    border-color: var(--rag-line);
    background: color-mix(in srgb, var(--rag-panel) 96%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-panel-action[data-tooltip]::after {
    border-color: var(--rag-line);
    color: var(--rag-text);
    background: color-mix(in srgb, var(--rag-panel) 96%, transparent);
    box-shadow: var(--rag-shadow);
  }

  :host([data-assistant-style='stellar']) .pet-panel-message-meta,
  :host([data-assistant-style='stellar']) .pet-panel-message-meta time,
  :host([data-assistant-style='stellar']) .pet-source-meta {
    font-family: var(--mono, monospace);
  }

  /* ═══════════ 角色气泡与输入区 ═══════════ */
  :host([data-assistant-style='stellar']) .pet-speech {
    border: 1px solid var(--rag-line);
    border-radius: 4px 14px 14px 14px;
    padding: 9px 14px 10px 12px;
    background: color-mix(in srgb, var(--rag-panel) 94%, transparent);
    color: var(--rag-text);
    box-shadow: var(--rag-control-shadow);
    /* 切角位置留出内边距，首行末字不会被斜边切到 */
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
  }

  :host([data-assistant-style='stellar']) .pet-composer,
  :host([data-assistant-style='stellar']) .composer {
    border-color: var(--rag-line);
    background: color-mix(in srgb, var(--rag-input-surface-resolved) 92%, transparent);
    box-shadow: var(--rag-control-shadow);
  }

  :host([data-assistant-style='stellar']) .pet-composer:focus-within,
  :host([data-assistant-style='stellar']) .composer:focus-within {
    border-color: color-mix(in srgb, var(--rag-gold) 52%, transparent);
    background: color-mix(in srgb, var(--rag-panel) 92%, transparent);
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--rag-gold) 18%, transparent),
      var(--rag-control-shadow);
  }

  :host([data-assistant-style='stellar']) .pet-composer-input,
  :host([data-assistant-style='stellar']) .input {
    color: var(--rag-text);
  }

  :host([data-assistant-style='stellar']) .pet-composer-input::placeholder,
  :host([data-assistant-style='stellar']) .input::placeholder {
    color: color-mix(in srgb, var(--rag-muted) 86%, transparent);
  }

  /* 代码与来源元信息走等宽字，正文继续走站点正文栈 */
  :host([data-assistant-style='stellar']) .markdown-body code,
  :host([data-assistant-style='stellar']) .markdown-body pre {
    font-family: var(--mono, monospace);
  }

  :host([data-assistant-style='stellar']) .markdown-body pre {
    padding: 12px 13px;
    border: 1px solid var(--rag-line);
    border-radius: 12px;
    background: var(--rag-stellar-code-bg);
    color: var(--rag-stellar-code-text);
  }

  /* ═══════════ 全屏会话：舷桥控制台 ═══════════ */
  :host([data-assistant-style='stellar']) .pet-stage-backdrop {
    background:
      radial-gradient(58% 44% at 50% 22%, var(--rag-stellar-glow), transparent 70%),
      radial-gradient(52% 40% at 62% 78%, var(--rag-stellar-halo), transparent 72%),
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--bg, var(--rag-stellar-bg)) 66%, transparent),
        color-mix(in srgb, var(--bg, var(--rag-stellar-bg)) 88%, transparent)
      );
    backdrop-filter: blur(7px) saturate(1.06);
    -webkit-backdrop-filter: blur(7px) saturate(1.06);
  }

  /* 屏角括线：整屏按控制台处理，取色只从站点变量来 */
  :host([data-assistant-style='stellar']) .pet-stage {
    grid-template-columns: minmax(0, 1fr);
    color: var(--rag-text);
    background:
      linear-gradient(var(--rag-gold), var(--rag-gold)) left clamp(14px, 3vw, 42px) top 44px / 18px 1.5px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) left clamp(14px, 3vw, 42px) top 44px / 1.5px 18px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) right clamp(14px, 3vw, 42px) top 44px / 18px 1.5px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) right clamp(14px, 3vw, 42px) top 44px / 1.5px 18px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) left clamp(14px, 3vw, 42px) bottom 26px / 18px 1.5px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) left clamp(14px, 3vw, 42px) bottom 26px / 1.5px 18px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) right clamp(14px, 3vw, 42px) bottom 26px / 18px 1.5px,
      linear-gradient(var(--rag-gold), var(--rag-gold)) right clamp(14px, 3vw, 42px) bottom 26px / 1.5px 18px;
    background-repeat: no-repeat;
  }

  :host([data-assistant-style='stellar']) .pet-stage-title span {
    color: var(--rag-muted);
    text-shadow: var(--rag-stellar-text-shadow);
  }

  :host([data-assistant-style='stellar']) .pet-stage-title strong {
    text-shadow: var(--rag-stellar-text-shadow);
  }

  :host([data-assistant-style='stellar']) .pet-stage-action,
  :host([data-assistant-style='stellar']) .pet-stage-close {
    border-color: var(--rag-line);
    color: var(--rag-text);
    background: color-mix(in srgb, var(--rag-panel) 72%, transparent);
    box-shadow: var(--rag-control-shadow);
    backdrop-filter: blur(14px) saturate(1.1);
    -webkit-backdrop-filter: blur(14px) saturate(1.1);
  }

  :host([data-assistant-style='stellar']) .pet-stage-action:hover,
  :host([data-assistant-style='stellar']) .pet-stage-close:hover {
    color: var(--rag-text);
    border-color: color-mix(in srgb, var(--rag-gold) 48%, transparent);
    background: color-mix(in srgb, var(--rag-gold) 14%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage-action.is-danger {
    color: var(--rag-stellar-signal);
    border-color: color-mix(in srgb, var(--rag-stellar-signal) 30%, transparent);
    background: var(--rag-stellar-signal-soft);
  }

  :host([data-assistant-style='stellar']) .pet-stage-output::-webkit-scrollbar-thumb {
    background:
      linear-gradient(
        color-mix(in srgb, var(--rag-gold) 34%, transparent),
        color-mix(in srgb, var(--rag-gold) 34%, transparent)
      )
      content-box;
  }

  :host([data-assistant-style='stellar']) .pet-stage-avatar.has-image {
    background: color-mix(in srgb, var(--rag-panel) 88%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage-bubble {
    border-color: var(--rag-line);
    color: var(--rag-text);
    background: color-mix(in srgb, var(--rag-panel) 68%, transparent);
    box-shadow: var(--rag-control-shadow);
  }

  /* 助手的长回答按正文口径取色，原先是为了压在深色罩上写死的白字 */
  :host([data-assistant-style='stellar']) .pet-stage-message.assistant .pet-stage-bubble {
    color: var(--reader-text, var(--rag-stellar-reader-text));
    text-shadow: var(--rag-stellar-text-shadow);
  }

  :host([data-assistant-style='stellar']) .pet-stage-bubble.error {
    color: var(--rag-stellar-signal);
    border-color: color-mix(in srgb, var(--rag-stellar-signal) 32%, transparent);
    background: var(--rag-stellar-signal-soft);
  }

  :host([data-assistant-style='stellar']) .pet-stage-message-actions button {
    border-color: var(--rag-line);
    color: var(--rag-muted);
    background: color-mix(in srgb, var(--rag-panel) 66%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage-message-actions button:hover:not(:disabled) {
    color: var(--rag-text);
    background: color-mix(in srgb, var(--rag-gold) 16%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage-message.user .pet-stage-message-actions button {
    color: var(--rag-muted);
    border-color: var(--rag-line);
    background: color-mix(in srgb, var(--rag-panel) 60%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage .markdown-body h1,
  :host([data-assistant-style='stellar']) .pet-stage .markdown-body h2,
  :host([data-assistant-style='stellar']) .pet-stage .markdown-body h3,
  :host([data-assistant-style='stellar']) .pet-stage .markdown-body h4,
  :host([data-assistant-style='stellar']) .pet-stage .markdown-body h5,
  :host([data-assistant-style='stellar']) .pet-stage .markdown-body h6 {
    color: var(--rag-text);
  }

  :host([data-assistant-style='stellar']) .pet-stage .markdown-body hr {
    background: var(--rag-line);
  }

  :host([data-assistant-style='stellar']) .pet-stage .markdown-body code {
    color: var(--rag-text);
    background: color-mix(in srgb, var(--rag-gold) 12%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage .markdown-body pre {
    background: color-mix(in srgb, var(--rag-panel) 78%, transparent);
    color: var(--rag-text);
  }

  :host([data-assistant-style='stellar']) .pet-stage .markdown-body blockquote {
    color: var(--rag-muted);
    background: color-mix(in srgb, var(--rag-panel) 60%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage .markdown-body th,
  :host([data-assistant-style='stellar']) .pet-stage .markdown-body td {
    border-color: var(--rag-line);
  }

  :host([data-assistant-style='stellar']) .pet-stage .markdown-body th {
    background: color-mix(in srgb, var(--rag-panel) 66%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage .markdown-body a {
    color: var(--rag-gold-strong);
    border-bottom-color: color-mix(in srgb, var(--rag-gold) 38%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage-time {
    color: var(--rag-muted);
    font-family: var(--mono, monospace);
    letter-spacing: 0.06em;
    text-shadow: var(--rag-stellar-text-shadow);
  }

  :host([data-assistant-style='stellar']) .pet-stage-sources summary {
    border-color: var(--rag-line);
    color: var(--rag-text);
    background: color-mix(in srgb, var(--rag-panel) 70%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage-sources .pet-source-list {
    border-color: var(--rag-line);
    background: color-mix(in srgb, var(--rag-panel) 76%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage-sources .pet-source-row {
    color: var(--rag-text);
  }

  :host([data-assistant-style='stellar']) .pet-stage-sources .pet-source-row:hover {
    color: var(--rag-text);
    background: color-mix(in srgb, var(--rag-gold) 14%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage-sources .pet-source-icon,
  :host([data-assistant-style='stellar']) .pet-stage-sources .pet-source-open {
    color: var(--rag-gold-strong);
  }

  :host([data-assistant-style='stellar']) .pet-stage-sources .pet-source-icon {
    background: color-mix(in srgb, var(--rag-gold) 14%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage-head,
  :host([data-assistant-style='stellar']) .pet-stage-output,
  :host([data-assistant-style='stellar']) .pet-stage-footer,
  :host([data-assistant-style='stellar']) .pet-stage-output-inner,
  :host([data-assistant-style='stellar']) .composer-wrap {
    min-width: 0;
    max-width: 100%;
  }

  :host([data-assistant-style='stellar']) .pet-stage-shortcuts {
    min-width: 0;
    max-width: 100%;
    overflow-x: auto;
    border-color: var(--rag-line);
    background: color-mix(in srgb, var(--rag-panel) 66%, transparent);
    box-shadow: var(--rag-control-shadow);
  }

  :host([data-assistant-style='stellar']) .pet-stage-shortcuts button {
    color: var(--rag-muted);
  }

  :host([data-assistant-style='stellar']) .pet-stage-shortcuts button:hover:not(:disabled) {
    color: var(--rag-text);
    background: color-mix(in srgb, var(--rag-gold) 14%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage-note {
    color: var(--rag-muted);
    text-shadow: var(--rag-stellar-text-shadow);
  }

  /* 全屏输入区：切角舷窗 + 一层斜向星尘光泽 */
  :host([data-assistant-style='stellar']) .pet-stage .composer {
    border-color: var(--rag-line);
    border-radius: 6px 18px 18px 18px;
    background:
      radial-gradient(120% 140% at 12% 10%, color-mix(in srgb, var(--rag-gold) 14%, transparent), transparent 52%),
      linear-gradient(
        112deg,
        color-mix(in srgb, var(--rag-panel) 92%, transparent),
        color-mix(in srgb, var(--rag-panel) 74%, transparent) 58%,
        color-mix(in srgb, var(--violet, var(--rag-stellar-violet)) 14%, transparent)
      );
    box-shadow: var(--rag-shadow);
    clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
    backdrop-filter: blur(22px) saturate(1.1);
    -webkit-backdrop-filter: blur(22px) saturate(1.1);
  }

  :host([data-assistant-style='stellar']) .pet-stage .composer:focus-within {
    border-color: color-mix(in srgb, var(--rag-gold) 46%, transparent);
    background:
      radial-gradient(120% 140% at 12% 10%, color-mix(in srgb, var(--rag-gold) 20%, transparent), transparent 54%),
      linear-gradient(
        112deg,
        color-mix(in srgb, var(--rag-panel) 94%, transparent),
        color-mix(in srgb, var(--rag-panel) 78%, transparent) 58%,
        color-mix(in srgb, var(--violet, var(--rag-stellar-violet)) 18%, transparent)
      );
    box-shadow:
      var(--rag-shadow),
      0 0 0 1px color-mix(in srgb, var(--rag-gold) 22%, transparent);
  }

  :host([data-assistant-style='stellar']) .pet-stage .input {
    color: var(--rag-text);
    font-family: var(--sans, sans-serif);
  }

  :host([data-assistant-style='stellar']) .pet-stage .input::placeholder {
    color: color-mix(in srgb, var(--rag-muted) 82%, transparent);
  }

  /* 发送键：原先是压在深色罩上的白玻璃，白昼会白底白字，这里换成主光渐变 */
  :host([data-assistant-style='stellar']) .pet-stage .send {
    color: var(--rag-primary-contrast);
    background: linear-gradient(150deg, var(--rag-user-message-start), var(--rag-user-message-end));
    box-shadow: var(--rag-control-shadow);
  }

  :host([data-assistant-style='stellar']) .pet-stage .send:hover:not(:disabled) {
    background: linear-gradient(150deg, var(--rag-user-message-start), var(--rag-user-message-end));
    filter: brightness(1.06);
  }

  /* ═══════════ 选区气泡 ═══════════ */
  :host([data-assistant-style='stellar']) .selection-popover {
    border-color: var(--rag-line);
    background: color-mix(in srgb, var(--rag-panel) 92%, transparent);
    box-shadow: var(--rag-shadow);
    backdrop-filter: blur(18px) saturate(1.2);
    -webkit-backdrop-filter: blur(18px) saturate(1.2);
  }

  :host([data-assistant-style='stellar']) .selection-popover button {
    color: var(--rag-text);
    font-family: var(--sans, sans-serif);
  }

  :host([data-assistant-style='stellar']) .selection-popover button:hover {
    color: var(--rag-text);
    background: color-mix(in srgb, var(--rag-gold) 16%, transparent);
  }

  :host([data-assistant-style='stellar']) .selection-popover svg,
  :host([data-assistant-style='stellar']) .selection-popover .iconify-icon {
    color: var(--rag-gold);
  }

  /* ═══════════ 动效：一个角色 + 一处轨道，够用就好 ═══════════ */
  @keyframes stellar-hover {
    0%,
    100% {
      transform: translateY(-2px);
    }
    50% {
      transform: translateY(2px);
    }
  }

  @keyframes stellar-beacon {
    0%,
    100% {
      opacity: 0.5;
      transform: scale(0.94);
    }
    50% {
      opacity: 0.9;
      transform: scale(1.04);
    }
  }

  @keyframes stellar-orbit {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes stellar-eye {
    0%,
    100% {
      opacity: 1;
    }
    46%,
    58% {
      opacity: 0.42;
    }
  }

  @keyframes stellar-core {
    0%,
    100% {
      opacity: 0.85;
      transform: scale(0.94);
    }
    50% {
      opacity: 1;
      transform: scale(1.08);
    }
  }

  @keyframes stellar-thruster {
    0%,
    100% {
      opacity: 0.32;
    }
    50% {
      opacity: 0.88;
    }
  }

  /* ═══════════ 窄屏与触屏：够大的命中区 + 安全区 ═══════════ */
  @media (max-width: 860px) {
    :host([data-assistant-style='stellar']) .pet-panel {
      width: min(368px, calc(100vw - 24px));
      max-height: calc(100dvh - 24px);
    }

    :host([data-assistant-style='stellar']) .pet-panel-action {
      width: 44px;
      min-width: 44px;
      min-height: 44px;
    }

    :host([data-assistant-style='stellar']) .pet-panel-quick button,
    :host([data-assistant-style='stellar']) .pet-source-row {
      min-height: 40px;
    }

    :host([data-assistant-style='stellar']) .pet-stage {
      gap: 10px;
      /* 窄屏首行会贴到屏边，屏角括线退场，只留背景罩与光晕 */
      background: none;
      padding:
        14px
        max(12px, env(safe-area-inset-right))
        max(16px, env(safe-area-inset-bottom))
        max(12px, env(safe-area-inset-left));
    }

    :host([data-assistant-style='stellar']) .pet-stage-head {
      flex-wrap: wrap;
      align-items: start;
      gap: 10px;
    }

    :host([data-assistant-style='stellar']) .pet-stage-actions {
      flex: 1 1 auto;
      flex-wrap: wrap;
      justify-content: flex-end;
      min-width: 0;
    }

    :host([data-assistant-style='stellar']) .pet-stage-action {
      min-height: 44px;
      padding: 0 10px;
    }

    :host([data-assistant-style='stellar']) .pet-stage-close {
      width: 44px;
      height: 44px;
    }

    :host([data-assistant-style='stellar']) .pet-stage-shortcuts button {
      min-height: 40px;
    }

    :host([data-assistant-style='stellar']) .pet-stage .send {
      width: 44px;
      height: 44px;
    }

    :host([data-assistant-style='stellar']) .pet-stage .composer {
      border-radius: 6px 16px 16px 16px;
      clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
    }
  }

  @media (hover: none) {
    :host([data-assistant-style='stellar']) .pet-stage-action,
    :host([data-assistant-style='stellar']) .pet-panel-quick button {
      min-height: 44px;
    }
  }

  /* 主题的减动效规则在页面样式表里，跨不进 Shadow DOM，这里补一份 */
  @media (prefers-reduced-motion: reduce) {
    :host([data-assistant-style='stellar']) .stellar-drone,
    :host([data-assistant-style='stellar']) .stellar-pet::before,
    :host([data-assistant-style='stellar']) .drone-orbit,
    :host([data-assistant-style='stellar']) .drone-eye,
    :host([data-assistant-style='stellar']) .drone-core,
    :host([data-assistant-style='stellar']) .drone-thruster {
      animation: none !important;
      transition: none !important;
    }

    :host([data-assistant-style='stellar']) .stellar-drone {
      transform: none;
    }

    :host([data-assistant-style='stellar']) .drone-thruster {
      opacity: 0.5;
    }
  }
`;
