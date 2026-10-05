import { css } from 'lit';

export const articleSummaryStyles = css`
  :host {
    display: block;
    width: 100%;
    --likcc-summaraid-bg: #f7f9fe;
    --likcc-summaraid-main: #425AEF;
    --likcc-summaraid-title: #363636;
    --likcc-summaraid-content: #222;
    --likcc-summaraid-gptName: #999999;
    --likcc-summaraid-contentBg: #fff;
    --likcc-summaraid-border: #e3e8f7;
    --likcc-summaraid-shadow: 0 4px 24px rgba(66, 90, 239, 0.08);
    --likcc-summaraid-tagBg: #f0f4ff;
    --likcc-summaraid-tagColor: #425AEF;
    --likcc-summaraid-cursor: #425AEF;
    --likcc-summaraid-contentFontSize: 14px;
  }

  .likcc-summaraidGPT-summary--dark {
    --likcc-summaraid-bg: #23272e;
    --likcc-summaraid-main: #90caf9;
    --likcc-summaraid-title: #fff;
    --likcc-summaraid-content: #e3e8f7;
    --likcc-summaraid-gptName: #b0b8c9;
    --likcc-summaraid-contentBg: #2a2d32;
    --likcc-summaraid-border: #444;
    --likcc-summaraid-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.18);
    --likcc-summaraid-tagBg: rgba(255, 255, 255, 0.12);
    --likcc-summaraid-tagColor: #7ca6ff;
    --likcc-summaraid-cursor: #90caf9;
  }

  .likcc-summaraidGPT-summary--default {
    --likcc-summaraid-bg: #f7f9fe;
    --likcc-summaraid-main: #4F8DFD;
    --likcc-summaraid-title: #3A5A8C;
    --likcc-summaraid-content: #222;
    --likcc-summaraid-gptName: #7B88A8;
    --likcc-summaraid-contentBg: #fff;
    --likcc-summaraid-border: #e3e8f7;
    --likcc-summaraid-shadow: 0 2px 12px 0 rgba(60, 80, 180, 0.08);
    --likcc-summaraid-tagBg: #f0f4ff;
    --likcc-summaraid-tagColor: #4F8DFD;
    --likcc-summaraid-cursor: #4F8DFD;
  }

  .likcc-summaraidGPT-summary--blue {
    --likcc-summaraid-bg: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    --likcc-summaraid-main: #1976d2;
    --likcc-summaraid-title: #1976d2;
    --likcc-summaraid-content: #22577a;
    --likcc-summaraid-gptName: #fff;
    --likcc-summaraid-contentBg: #fafdff;
    --likcc-summaraid-border: #90caf9;
    --likcc-summaraid-shadow: 0 2px 12px 0 rgba(66, 165, 245, 0.1);
    --likcc-summaraid-tagBg: linear-gradient(90deg, #b3e5fc 0%, #e3f2fd 100%);
    --likcc-summaraid-tagColor: #1976d2;
    --likcc-summaraid-cursor: #1976d2;
  }

  .likcc-summaraidGPT-summary--green {
    --likcc-summaraid-bg: linear-gradient(135deg, #e0f7fa 0%, #a5d6a7 100%);
    --likcc-summaraid-main: #43a047;
    --likcc-summaraid-title: #2e7d32;
    --likcc-summaraid-content: #225744;
    --likcc-summaraid-gptName: #fff;
    --likcc-summaraid-contentBg: #fafdff;
    --likcc-summaraid-border: #a5d6a7;
    --likcc-summaraid-shadow: 0 2px 12px 0 rgba(67, 160, 71, 0.1);
    --likcc-summaraid-tagBg: linear-gradient(90deg, #b2dfdb 0%, #e0f7fa 100%);
    --likcc-summaraid-tagColor: #43a047;
    --likcc-summaraid-cursor: #43a047;
  }

  .likcc-summaraidGPT-fixed {
    --likcc-summaraid-fixed-accent: #5f67f8;
    --likcc-summaraid-fixed-accent-soft: rgba(95, 103, 248, 0.1);
    --likcc-summaraid-fixed-accent-faint: rgba(95, 103, 248, 0.04);
    --likcc-summaraid-fixed-line: rgba(95, 103, 248, 0.18);
    --likcc-summaraid-fixed-text: #273142;
    --likcc-summaraid-fixed-muted: #667085;
    --likcc-summaraid-fixed-surface: #ffffff;
    --likcc-summaraid-fixed-shell-y: 0.72rem;
    --likcc-summaraid-fixed-shell-x: 0.92rem;
    --likcc-summaraid-fixed-gap: 0.52rem;
    --likcc-summaraid-fixed-title-size: 0.76rem;
    --likcc-summaraid-fixed-content-size: 0.96rem;
    --likcc-summaraid-fixed-content-line: 1.68;
  }

  .likcc-summaraidGPT-tone--graphite {
    --likcc-summaraid-fixed-accent: #27303f;
    --likcc-summaraid-fixed-accent-soft: rgba(39, 48, 63, 0.09);
    --likcc-summaraid-fixed-accent-faint: rgba(39, 48, 63, 0.035);
    --likcc-summaraid-fixed-line: rgba(39, 48, 63, 0.16);
  }

  .likcc-summaraidGPT-tone--copper {
    --likcc-summaraid-fixed-accent: #b4682d;
    --likcc-summaraid-fixed-accent-soft: rgba(180, 104, 45, 0.12);
    --likcc-summaraid-fixed-accent-faint: rgba(180, 104, 45, 0.04);
    --likcc-summaraid-fixed-line: rgba(180, 104, 45, 0.2);
  }

  .likcc-summaraidGPT-density--comfortable {
    --likcc-summaraid-fixed-shell-y: 0.94rem;
    --likcc-summaraid-fixed-shell-x: 1.08rem;
    --likcc-summaraid-fixed-gap: 0.64rem;
    --likcc-summaraid-fixed-title-size: 0.82rem;
    --likcc-summaraid-fixed-content-size: 1rem;
    --likcc-summaraid-fixed-content-line: 1.74;
  }

  .likcc-summaraidGPT-fixed--dark {
    --likcc-summaraid-fixed-accent: #8fa0ff;
    --likcc-summaraid-fixed-accent-soft: rgba(143, 160, 255, 0.14);
    --likcc-summaraid-fixed-accent-faint: rgba(143, 160, 255, 0.07);
    --likcc-summaraid-fixed-line: rgba(143, 160, 255, 0.26);
    --likcc-summaraid-fixed-text: #e8edf7;
    --likcc-summaraid-fixed-muted: #aab6cc;
    --likcc-summaraid-fixed-surface: #171c25;
  }

  .likcc-summaraidGPT-simple-container,
  .likcc-summaraidGPT-inline-container {
    margin: 0.16rem 0 0.1rem;
  }

  .likcc-summaraidGPT-simple-icon,
  .likcc-summaraidGPT-inline-icon {
    width: 0.92rem;
    height: 0.92rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
  }

  .likcc-summaraidGPT-simple-icon svg,
  .likcc-summaraidGPT-inline-icon svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  .likcc-summaraidGPT-simple-title,
  .likcc-summaraidGPT-inline-title {
    font-size: var(--likcc-summaraid-fixed-title-size);
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-wrap: pretty;
  }

  .likcc-summaraidGPT-simple-content,
  .likcc-summaraidGPT-inline-content {
    color: var(--likcc-summaraid-fixed-text);
    font-size: var(--likcc-summaraid-fixed-content-size);
    line-height: var(--likcc-summaraid-fixed-content-line);
    letter-spacing: 0;
    word-break: break-word;
  }

  .likcc-summaraidGPT-simple-shell {
    background: var(--likcc-summaraid-fixed-surface);
    border: 1px solid var(--likcc-summaraid-fixed-line);
    border-radius: 1.15rem;
    padding: calc(var(--likcc-summaraid-fixed-shell-y) + 0.18rem)
      calc(var(--likcc-summaraid-fixed-shell-x) + 0.14rem);
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03);
  }

  .likcc-summaraidGPT-simple-header,
  .likcc-summaraidGPT-inline-header {
    display: flex;
    align-items: center;
    gap: 0.42rem;
    color: var(--likcc-summaraid-fixed-accent);
  }

  .likcc-summaraidGPT-simple-header {
    margin-bottom: 0.76rem;
  }

  .likcc-summaraidGPT-simple-title {
    font-size: calc(var(--likcc-summaraid-fixed-title-size) + 0.18rem);
    letter-spacing: 0.04em;
    text-transform: none;
  }

  .likcc-summaraidGPT-simple-content {
    font-size: calc(var(--likcc-summaraid-fixed-content-size) + 0.16rem);
    line-height: calc(var(--likcc-summaraid-fixed-content-line) + 0.08);
    letter-spacing: 0;
    text-wrap: pretty;
  }

  .likcc-summaraidGPT-inline-header {
    margin-bottom: 0.34rem;
  }

  .likcc-summaraidGPT-inline-header {
    position: relative;
  }

  .likcc-summaraidGPT-inline-shell {
    padding-top: 0.12rem;
  }

  .likcc-summaraidGPT-inline-header::after {
    content: '';
    flex: 1;
    min-width: 28px;
    height: 1px;
    margin-left: 0.18rem;
    background: linear-gradient(90deg, var(--likcc-summaraid-fixed-line) 0%, rgba(255, 255, 255, 0) 100%);
  }

  /* ── 星港信号简报（stellar） ──
     结构与经典/简约/内联卡片完全独立：斜切角外壳 + 四角括线 + 一条扫描光 + HUD 状态行。
     所有颜色只从站点变量取值（--cyan/--violet/--panel/--panel-soft/--panel-border/--reader-text/--text/--text-dim），
     站点未提供这些变量时用 currentColor 与 color-mix 兜底，昼夜都不会糊出一块黑板；
     字体同样只复用 --sans/--hud/--mono，不引入第三款字体。 */
  .likcc-summaraidGPT-stellar {
    --likcc-stellar-surface: var(--panel, color-mix(in srgb, currentColor 8%, transparent));
    --likcc-stellar-surface-soft: var(--panel-soft, color-mix(in srgb, currentColor 5%, transparent));
    --likcc-stellar-line: var(--panel-border, color-mix(in srgb, currentColor 18%, transparent));
    --likcc-stellar-strong: var(--text, currentColor);
    --likcc-stellar-body: var(--text, currentColor);
    --likcc-stellar-muted: var(--text-dim, currentColor);
    --likcc-stellar-accent: var(--cyan, currentColor);
    --likcc-stellar-accent-alt: var(--violet, currentColor);
    --likcc-stellar-cut: 15px;
    --likcc-stellar-bracket: 0.55;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    margin: 0.35rem 0;
    font-family: var(--sans, inherit);
    color: var(--likcc-stellar-body);
  }

  /* 浅底上括线与扫描光要更实一点才看得见，深色则保持克制 */
  .likcc-summaraidGPT-stellar--dark {
    --likcc-stellar-bracket: 0.48;
  }

  .likcc-summaraidGPT-stellar-shell {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0.78rem 0.95rem 0.92rem;
    border: 1px solid color-mix(in srgb, var(--likcc-stellar-accent) 22%, var(--likcc-stellar-line));
    background: linear-gradient(
      165deg,
      color-mix(in srgb, var(--likcc-stellar-accent) 10%, var(--likcc-stellar-surface)),
      var(--likcc-stellar-surface)
    );
    -webkit-backdrop-filter: blur(16px) saturate(1.2);
    backdrop-filter: blur(16px) saturate(1.2);
    clip-path: polygon(
      0 0,
      calc(100% - var(--likcc-stellar-cut)) 0,
      100% var(--likcc-stellar-cut),
      100% 100%,
      var(--likcc-stellar-cut) 100%,
      0 calc(100% - var(--likcc-stellar-cut))
    );
    animation: likcc-summaraidGPT-stellar-in 0.62s cubic-bezier(0.22, 1, 0.36, 1) both;
    transition: border-color 0.3s ease;
  }

  .likcc-summaraidGPT-stellar-shell:hover {
    border-color: color-mix(in srgb, var(--likcc-stellar-accent) 46%, var(--likcc-stellar-line));
  }

  /* 四角括线 */
  .likcc-summaraidGPT-stellar-shell::before {
    content: '';
    position: absolute;
    inset: 5px;
    pointer-events: none;
    background:
      linear-gradient(var(--likcc-stellar-accent), var(--likcc-stellar-accent)) left top / 12px 1.5px,
      linear-gradient(var(--likcc-stellar-accent), var(--likcc-stellar-accent)) left top / 1.5px 12px,
      linear-gradient(var(--likcc-stellar-accent), var(--likcc-stellar-accent)) right bottom / 12px 1.5px,
      linear-gradient(var(--likcc-stellar-accent), var(--likcc-stellar-accent)) right bottom / 1.5px 12px;
    background-repeat: no-repeat;
    opacity: var(--likcc-stellar-bracket);
    transition: opacity 0.3s ease;
  }

  .likcc-summaraidGPT-stellar-shell:hover::before {
    opacity: 1;
  }

  /* 顶部扫描光：一次性入场之后的唯一持续动效，减弱动态效果时被媒体查询整体关掉 */
  .likcc-summaraidGPT-stellar-shell::after {
    content: '';
    position: absolute;
    top: 0;
    left: -42%;
    width: 42%;
    height: 1px;
    pointer-events: none;
    background: linear-gradient(
      90deg,
      transparent,
      color-mix(in srgb, var(--likcc-stellar-accent) 88%, transparent),
      transparent
    );
    animation: likcc-summaraidGPT-stellar-scan 4.2s linear infinite;
  }

  .likcc-summaraidGPT-stellar-rail {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    margin-bottom: 0.62rem;
  }

  .likcc-summaraidGPT-stellar-code {
    display: inline-flex;
    align-items: center;
    padding: 0.14rem 0.42rem;
    border: 1px solid color-mix(in srgb, var(--likcc-stellar-accent) 40%, transparent);
    border-radius: 3px;
    background: var(--likcc-stellar-surface-soft);
    color: var(--likcc-stellar-accent);
    font-family: var(--hud, inherit);
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    line-height: 1.2;
    clip-path: polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 0 100%);
  }

  .likcc-summaraidGPT-stellar-status {
    display: inline-flex;
    align-items: center;
    gap: 0.32rem;
    color: var(--likcc-stellar-muted);
    font-family: var(--hud, inherit);
    font-size: 0.58rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    line-height: 1.2;
    white-space: nowrap;
  }

  .likcc-summaraidGPT-stellar-status::before {
    content: '';
    width: 5px;
    height: 5px;
    background: currentColor;
    transform: rotate(45deg);
  }

  .likcc-summaraidGPT-stellar-status--decoding {
    color: var(--likcc-stellar-accent);
  }

  .likcc-summaraidGPT-stellar-status--interrupted {
    color: var(--likcc-stellar-accent-alt);
  }

  .likcc-summaraidGPT-stellar-head {
    display: flex;
    align-items: center;
    gap: 0.46rem;
    margin-bottom: 0.58rem;
  }

  .likcc-summaraidGPT-stellar-mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: 0.92rem;
    height: 0.92rem;
    color: var(--likcc-stellar-accent-alt);
  }

  .likcc-summaraidGPT-stellar-mark svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  .likcc-summaraidGPT-stellar-title {
    min-width: 0;
    color: var(--likcc-stellar-strong);
    font-family: var(--sans, inherit);
    font-size: 0.98rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    line-height: 1.35;
    text-wrap: pretty;
  }

  .likcc-summaraidGPT-stellar-model {
    flex: none;
    margin-left: auto;
    padding: 0.1rem 0.38rem;
    border: 1px solid color-mix(in srgb, var(--likcc-stellar-accent) 28%, transparent);
    border-radius: 999px;
    color: var(--likcc-stellar-accent);
    font-family: var(--mono, inherit);
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    line-height: 1.3;
    white-space: nowrap;
  }

  /* 正文只靠一条上引线分区，不再套第二层卡片 */
  .likcc-summaraidGPT-stellar-body {
    padding-top: 0.6rem;
    border-top: 1px solid var(--likcc-stellar-line);
  }

  .likcc-summaraidGPT-stellar-text {
    margin: 0;
    color: var(--likcc-stellar-body);
    font-family: var(--sans, inherit);
    font-size: 0.95rem;
    line-height: 1.85;
    letter-spacing: 0.01em;
    word-break: break-word;
    text-wrap: pretty;
  }

  .likcc-summaraidGPT-stellar-text--state {
    color: var(--likcc-stellar-muted);
  }

  .likcc-summaraidGPT-stellar-cursor {
    display: inline-block;
    width: 2px;
    height: 1.1em;
    margin-left: 2px;
    vertical-align: middle;
    background-color: var(--likcc-stellar-accent);
    animation: likcc-summaraidGPT-blink 1.1s steps(1, end) infinite;
  }

  .likcc-summaraidGPT-summary-container {
    width: 100%;
    box-sizing: border-box;
    border-radius: 0.7rem;
    background: var(--likcc-summaraid-bg, rgba(250, 245, 255, 0.85));
    border: 1px solid var(--likcc-summaraid-border, #f3e6f9);
    box-shadow: var(--likcc-summaraid-shadow, 0 1px 4px 0 rgba(177, 108, 234, 0.04));
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
    z-index: 0;
    line-height: 1.5;
    padding: 0.5rem;
    font-size: 0.98rem;
    transition: box-shadow 0.25s, background 0.2s, transform 0.18s;
    opacity: 0;
    transform: translateY(12px);
    animation: likcc-summaraidGPT-fadein 0.7s cubic-bezier(0.4, 1.4, 0.6, 1) forwards;
    margin: 0.25rem 0;
  }

  .likcc-summaraidGPT-summary-container:hover {
    box-shadow: 0 10px 32px 0 rgba(60, 80, 180, 0.13), 0 2px 8px 0 rgba(60, 80, 180, 0.07);
    transform: translateY(-1.5px) scale(1.01);
  }

  .likcc-summaraidGPT-summary-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.4rem;
    margin-bottom: 0.5rem;
  }

  .likcc-summaraidGPT-header-left {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .likcc-summaraidGPT-logo {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 0.3rem;
    background: #fff;
    border: 1px solid var(--likcc-summaraid-border, #f3e6f9);
    object-fit: cover;
  }

  .likcc-summaraidGPT-summary-title {
    font-weight: 600;
    font-size: 0.97rem;
    color: var(--likcc-summaraid-title, #5a3a7a);
    margin-right: 0.4rem;
    text-wrap: pretty;
  }

  .likcc-summaraidGPT-gpt-name {
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--likcc-summaraid-tagColor, var(--likcc-summaraid-gptName, #a16cea));
    background: var(--likcc-summaraid-tagBg, linear-gradient(90deg, #b3e5fc 0%, #e3f2fd 100%));
    border-radius: 0.35rem;
    padding: 1px 7px;
    margin-left: auto;
    min-width: 24px;
    position: relative;
    overflow: hidden;
    box-shadow: none;
  }

  .likcc-summaraidGPT-gpt-name::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(120deg, transparent, rgba(66, 90, 239, 0.13), transparent);
    animation: likcc-summaraidGPT-shine 3s infinite linear;
    pointer-events: none;
  }

  .likcc-summaraidGPT-summary-content {
    background: var(--likcc-summaraid-contentBg, rgba(255, 255, 255, 0.92));
    border-radius: 0.45rem;
    padding: 0.4rem 0.4rem 0.3rem;
    font-size: var(--likcc-summaraid-contentFontSize, 14px);
    color: var(--likcc-summaraid-content, #4b2e5c);
    border: 1px solid var(--likcc-summaraid-border, #f3e6f9);
    margin: 0;
    word-break: break-word;
    line-height: 1.85;
    box-shadow: var(--likcc-summaraid-shadow, none);
    transition: background 0.3s, box-shadow 0.2s;
    opacity: 0;
    transform: translateY(6px);
    animation: likcc-summaraidGPT-contentin 0.7s 0.12s cubic-bezier(0.4, 1.4, 0.6, 1) forwards;
  }

  .likcc-summaraidGPT-cursor {
    display: inline-block;
    width: 2px;
    height: 1.2em;
    background-color: var(--likcc-summaraid-cursor);
    margin-left: 2px;
    animation: likcc-summaraidGPT-blink 1.1s steps(1, end) infinite;
    vertical-align: middle;
    border-radius: 1px;
  }

  @media (max-width: 768px) {
    .likcc-summaraidGPT-simple-shell {
      border-radius: 0.98rem;
      padding: calc(var(--likcc-summaraid-fixed-shell-y) + 0.06rem) calc(var(--likcc-summaraid-fixed-shell-x) - 0.04rem);
    }

    .likcc-summaraidGPT-simple-header {
      margin-bottom: 0.62rem;
    }

    .likcc-summaraidGPT-inline-title {
      font-size: 0.74rem;
    }

    .likcc-summaraidGPT-simple-title {
      font-size: 0.98rem;
    }

    .likcc-summaraidGPT-simple-content {
      font-size: 1rem;
      line-height: 1.76;
    }

    .likcc-summaraidGPT-inline-content {
      font-size: 0.92rem;
      line-height: 1.66;
    }

    /* 窄屏：收紧斜切角与内距，HUD 行不换行、状态词不挤到标题上 */
    .likcc-summaraidGPT-stellar {
      --likcc-stellar-cut: 12px;
    }

    .likcc-summaraidGPT-stellar-shell {
      padding: 0.68rem 0.78rem 0.8rem;
    }

    .likcc-summaraidGPT-stellar-title {
      font-size: 0.94rem;
    }

    .likcc-summaraidGPT-stellar-text {
      font-size: 0.92rem;
      line-height: 1.78;
    }

    .likcc-summaraidGPT-stellar-model {
      padding: 0.08rem 0.3rem;
      font-size: 0.56rem;
      letter-spacing: 0.03em;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .likcc-summaraidGPT-summary-container,
    .likcc-summaraidGPT-summary-content,
    .likcc-summaraidGPT-gpt-name::before,
    .likcc-summaraidGPT-cursor,
    .likcc-summaraidGPT-stellar-shell,
    .likcc-summaraidGPT-stellar-shell::after,
    .likcc-summaraidGPT-stellar-cursor {
      animation: none !important;
      transition: none !important;
      transform: none !important;
      opacity: 1 !important;
    }

    .likcc-summaraidGPT-summary-container:hover {
      transform: none;
    }
  }

  @keyframes likcc-summaraidGPT-fadein {
    0% {
      opacity: 0;
      transform: translateY(12px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes likcc-summaraidGPT-contentin {
    0% {
      opacity: 0;
      transform: translateY(6px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes likcc-summaraidGPT-shine {
    0% {
      left: -100%;
    }
    20% {
      left: 100%;
    }
    100% {
      left: 100%;
    }
  }

  @keyframes likcc-summaraidGPT-stellar-in {
    0% {
      opacity: 0;
      transform: translateY(8px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes likcc-summaraidGPT-stellar-scan {
    0% {
      left: -42%;
    }
    100% {
      left: 108%;
    }
  }

  @keyframes likcc-summaraidGPT-blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }
`;
