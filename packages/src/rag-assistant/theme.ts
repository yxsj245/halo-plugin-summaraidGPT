import type { RagAssistantStyleConfig } from './types';

export const DEFAULT_RAG_ASSISTANT_STYLE: RagAssistantStyleConfig = {
  stylePreset: 'default',
  primaryColor: '#a16207',
  secondaryColor: '#f4f4f5',
  surfaceColor: '#fafafa',
  textColor: '#18181b',
  borderRadius: 'soft',
  colorMode: 'light',
};

/**
 * 站点风格（stellar）的宿主标记：
 * 样式表只认这两个属性，DOM 上的状态与样式表的选择器由此对齐。
 * 其他风格不会写这两个属性，样式表里那份星港配色因此完全不会生效。
 */
export const STELLAR_STYLE_ATTRIBUTE = 'data-assistant-style';
export const STELLAR_SCHEME_ATTRIBUTE = 'data-assistant-scheme';
export const STELLAR_STYLE_VALUE = 'stellar';

/** 站点的昼夜口径：与主题 html[data-scheme] 取值一致。 */
export type AssistantScheme = 'dark' | 'light';

type RgbColor = {
  r: number;
  g: number;
  b: number;
};

type RadiusTokens = {
  panel: string;
  card: string;
  control: string;
};

const DARK_DEFAULTS = {
  surfaceColor: '#171717',
  textColor: '#f7f2e8',
  secondaryColor: '#292524',
};

/**
 * 固定色板：仅用于 default/graphite/ocean/azure/forest/rose/custom。
 * stellar 不在此列参与取色，这里的两组值只是配置层的占位（读写配置时用的十六进制），
 * 真正落到 CSS 上的颜色由站点变量与 styles/stellar.ts 的兜底令牌决定。
 */
const STYLE_PRESETS: Record<
  Exclude<RagAssistantStyleConfig['stylePreset'], 'custom'>,
  Pick<RagAssistantStyleConfig, 'primaryColor' | 'secondaryColor' | 'surfaceColor' | 'textColor'>
> = {
  default: {
    primaryColor: '#a16207',
    secondaryColor: '#f4f4f5',
    surfaceColor: '#fafafa',
    textColor: '#18181b',
  },
  graphite: {
    primaryColor: '#d6b46c',
    secondaryColor: '#2a2a28',
    surfaceColor: '#171717',
    textColor: '#f7f2e8',
  },
  ocean: {
    primaryColor: '#1f7a8c',
    secondaryColor: '#d9f0f3',
    surfaceColor: '#fbfeff',
    textColor: '#142326',
  },
  azure: {
    primaryColor: '#3b82f6',
    secondaryColor: '#dbeafe',
    surfaceColor: '#f8fafc',
    textColor: '#0f172a',
  },
  forest: {
    primaryColor: '#2f7d50',
    secondaryColor: '#dceedd',
    surfaceColor: '#fbfdf8',
    textColor: '#18251b',
  },
  rose: {
    primaryColor: '#b85c7a',
    secondaryColor: '#f8dfe8',
    surfaceColor: '#fffafc',
    textColor: '#2b1720',
  },
  stellar: {
    primaryColor: '#22d3ee',
    secondaryColor: '#101827',
    surfaceColor: '#0b1018',
    textColor: '#e6e9f2',
  },
};

const RADIUS_TOKENS: Record<RagAssistantStyleConfig['borderRadius'], RadiusTokens> = {
  standard: {
    panel: '10px',
    card: '8px',
    control: '10px',
  },
  soft: {
    panel: '18px',
    card: '13px',
    control: '999px',
  },
  round: {
    panel: '26px',
    card: '18px',
    control: '999px',
  },
};

/**
 * 站点风格的可变量表：每个 --rag-* 都指向站点变量，站点变量缺席时回落到
 * styles/stellar.ts 里的 --rag-stellar-* 兜底令牌（该文件按昼夜给了两套）。
 * 变量值是引用而不是取色后的十六进制，因此站点切换昼夜时无需重新计算：
 * --cyan 一变，这里所有引用它的属性在下一帧就是新颜色。
 */
const STELLAR_TOKEN_PREFIX = '--rag-stellar-';

/** 引用站点变量，缺省回落到同名的兜底令牌（--text-dim → --rag-stellar-text-dim）。 */
function siteVariable(name: string): string {
  return `var(${name}, var(${STELLAR_TOKEN_PREFIX}${name.slice(2)}))`;
}

/** 站点变量的投影色。 */
function siteAlpha(name: string, percent: number): string {
  return `color-mix(in srgb, ${siteVariable(name)} ${percent}%, transparent)`;
}

/** 站点变量的混色，用于主光到紫调的过渡。 */
function siteBlend(from: string, to: string, fromPercent: number): string {
  return `color-mix(in srgb, ${siteVariable(from)} ${fromPercent}%, ${siteVariable(to)})`;
}

/** 只用兜底令牌的属性（站点没有对应变量，例如阴影与主色上的文字）。 */
function stellarToken(name: string): string {
  return `var(${STELLAR_TOKEN_PREFIX}${name})`;
}

const STELLAR_VARIABLES: ReadonlyArray<readonly [string, string]> = [
  // 文字与描线
  ['--rag-text', siteVariable('--text')],
  ['--rag-ink', siteVariable('--text')],
  ['--rag-muted', siteVariable('--text-dim')],
  ['--rag-line', siteVariable('--panel-border')],
  ['--rag-soft-line', siteVariable('--hairline')],
  ['--rag-divider', siteVariable('--hairline')],
  // 面板与纸面：直接取站点玻璃面板，昼夜由站点变量自己切
  ['--rag-paper', siteVariable('--panel')],
  ['--rag-panel', siteVariable('--panel')],
  ['--rag-secondary', siteVariable('--panel-soft')],
  ['--rag-secondary-soft', 'color-mix(in srgb, var(--rag-secondary) 62%, transparent)'],
  ['--rag-control-surface', siteVariable('--panel-soft')],
  ['--rag-assistant-message-bg', siteVariable('--panel-soft')],
  ['--rag-messages-surface', siteVariable('--chip-bg')],
  ['--rag-window-surface', siteVariable('--panel')],
  ['--rag-window-surface-2', siteVariable('--chip-bg')],
  ['--rag-input-surface-resolved', siteVariable('--chip-bg')],
  ['--rag-window-border', siteVariable('--panel-border')],
  ['--rag-assistant-message-border', siteVariable('--panel-border')],
  ['--rag-header-surface', siteAlpha('--panel', 92)],
  ['--rag-footer-surface', siteAlpha('--panel', 94)],
  ['--rag-frost', siteAlpha('--panel', 78)],
  // 主色：星港主光（青）与紫调，按钮、引用、用户气泡都走这两支
  ['--rag-gold', siteVariable('--cyan')],
  ['--rag-gold-strong', siteBlend('--cyan', '--violet', 72)],
  ['--rag-gold-soft', siteAlpha('--cyan', 24)],
  ['--rag-gold-faint', siteAlpha('--cyan', 8)],
  ['--rag-ring', siteAlpha('--cyan', 46)],
  ['--rag-primary-contrast', stellarToken('contrast')],
  // 用户气泡是青→紫的两支主光渐变，不掺底色：两支在昼夜下都能托住主色上的文字
  ['--rag-user-message-start', siteBlend('--cyan', '--violet', 88)],
  ['--rag-user-message-end', siteBlend('--violet', '--cyan', 88)],
  // 阴影没有站点变量，交给兜底令牌按昼夜给两套
  ['--rag-shadow', stellarToken('shadow-panel')],
  ['--rag-card-shadow', stellarToken('shadow-card')],
  ['--rag-control-shadow', stellarToken('shadow-control')],
];

const STELLAR_RADIUS_VARIABLES = [
  '--rag-radius-panel',
  '--rag-radius-card',
  '--rag-radius-control',
] as const;

/** 由本模块写在宿主上的全部内联变量：离开 stellar 时按这份名单逐条清理。 */
const STELLAR_OWNED_VARIABLES: readonly string[] = [
  ...STELLAR_VARIABLES.map(([name]) => name),
  ...STELLAR_RADIUS_VARIABLES,
];

export function normalizeAssistantStyle(
  style?: Partial<RagAssistantStyleConfig>,
): RagAssistantStyleConfig {
  const stylePreset = normalizeStylePreset(style?.stylePreset);
  const presetPalette = stylePreset === 'custom'
    ? STYLE_PRESETS.default
    : STYLE_PRESETS[stylePreset];
  const custom = stylePreset === 'custom';

  return {
    stylePreset,
    primaryColor: normalizeHexColor(
      custom ? style?.primaryColor : presetPalette.primaryColor,
      DEFAULT_RAG_ASSISTANT_STYLE.primaryColor,
    ),
    secondaryColor: normalizeHexColor(
      custom ? style?.secondaryColor : presetPalette.secondaryColor,
      DEFAULT_RAG_ASSISTANT_STYLE.secondaryColor,
    ),
    surfaceColor: normalizeHexColor(
      custom ? style?.surfaceColor : presetPalette.surfaceColor,
      DEFAULT_RAG_ASSISTANT_STYLE.surfaceColor,
    ),
    textColor: normalizeHexColor(
      custom ? style?.textColor : presetPalette.textColor,
      DEFAULT_RAG_ASSISTANT_STYLE.textColor,
    ),
    borderRadius: normalizeBorderRadius(style?.borderRadius),
    colorMode: normalizeColorMode(style?.colorMode),
  };
}

export function applyAssistantTheme(
  host: HTMLElement,
  style: RagAssistantStyleConfig,
): void {
  const normalized = normalizeAssistantStyle(style);

  if (normalized.stylePreset === STELLAR_STYLE_VALUE) {
    applyStellarTheme(host, normalized);
    return;
  }

  clearStellarTheme(host);

  const resolvedStyle = resolveModePalette(normalized);
  const primary = parseHexColor(resolvedStyle.primaryColor);
  const surface = parseHexColor(resolvedStyle.surfaceColor);
  const text = parseHexColor(resolvedStyle.textColor);
  const secondary = parseHexColor(resolvedStyle.secondaryColor);
  const radii = RADIUS_TOKENS[resolvedStyle.borderRadius];
  const dark = isDarkStyle(resolvedStyle);
  const black = { r: 0, g: 0, b: 0 };
  const white = { r: 255, g: 255, b: 255 };

  setCssVar(host, '--rag-text', resolvedStyle.textColor);
  setCssVar(host, '--rag-muted', toHex(mixColors(text, surface, 0.42)));
  setCssVar(host, '--rag-line', withAlpha(text, 0.095));
  setCssVar(host, '--rag-soft-line', withAlpha(text, 0.06));
  setCssVar(host, '--rag-paper', withAlpha(surface, 0.97));
  setCssVar(host, '--rag-panel', resolvedStyle.surfaceColor);
  setCssVar(host, '--rag-ink', resolvedStyle.textColor);
  setCssVar(host, '--rag-secondary', resolvedStyle.secondaryColor);
  setCssVar(host, '--rag-gold', resolvedStyle.primaryColor);
  setCssVar(host, '--rag-gold-strong', toHex(mixColors(primary, { r: 0, g: 0, b: 0 }, 0.18)));
  setCssVar(host, '--rag-gold-soft', withAlpha(primary, 0.16));
  setCssVar(host, '--rag-gold-faint', withAlpha(primary, 0.05));
  setCssVar(host, '--rag-primary-contrast', readableTextOn(primary));
  setCssVar(host, '--rag-secondary-soft', withAlpha(secondary, 0.48));
  setCssVar(host, '--rag-radius-panel', radii.panel);
  setCssVar(host, '--rag-radius-card', radii.card);
  setCssVar(host, '--rag-radius-control', radii.control);
  setCssVar(host, '--rag-shadow', shadowFor(text, dark));
  setCssVar(host, '--rag-window-surface', toHex(mixColors(surface, dark ? white : primary, dark ? 0.055 : 0.018)));
  setCssVar(host, '--rag-window-surface-2', toHex(mixColors(surface, dark ? black : white, dark ? 0.1 : 0.42)));
  setCssVar(host, '--rag-header-surface', withAlpha(mixColors(surface, dark ? white : primary, dark ? 0.075 : 0.035), dark ? 0.96 : 0.985));
  setCssVar(host, '--rag-messages-surface', toHex(mixColors(surface, dark ? black : white, dark ? 0.045 : 0.36)));
  setCssVar(host, '--rag-footer-surface', withAlpha(mixColors(surface, dark ? black : white, dark ? 0.035 : 0.28), 0.98));
  setCssVar(host, '--rag-control-surface', withAlpha(mixColors(surface, dark ? white : white, dark ? 0.07 : 0.68), dark ? 0.78 : 0.9));
  setCssVar(host, '--rag-input-surface-resolved', toHex(mixColors(surface, dark ? white : white, dark ? 0.065 : 0.62)));
  setCssVar(host, '--rag-assistant-message-bg', toHex(mixColors(surface, white, dark ? 0.075 : 0.82)));
  setCssVar(host, '--rag-assistant-message-border', withAlpha(mixColors(dark ? text : primary, surface, dark ? 0.78 : 0.72), dark ? 0.2 : 0.18));
  setCssVar(host, '--rag-window-border', withAlpha(mixColors(text, surface, dark ? 0.74 : 0.86), dark ? 0.18 : 0.13));
  setCssVar(host, '--rag-divider', withAlpha(text, dark ? 0.075 : 0.08));
  setCssVar(host, '--rag-card-shadow', dark
    ? '0 8px 18px rgba(0, 0, 0, 0.18)'
    : `0 10px 24px ${withAlpha(text, 0.055)}`);
  setCssVar(host, '--rag-control-shadow', dark
    ? '0 8px 18px rgba(0, 0, 0, 0.16)'
    : `0 8px 18px ${withAlpha(text, 0.05)}`);
  setCssVar(host, '--rag-user-message-start', toHex(mixColors(primary, white, dark ? 0.08 : 0.16)));
  setCssVar(host, '--rag-user-message-end', toHex(mixColors(primary, black, 0.18)));
}

/** 站点风格：打标记 + 映射变量，颜色解析全部交给浏览器，不做十六进制拆分。 */
function applyStellarTheme(
  host: HTMLElement,
  style: RagAssistantStyleConfig,
): void {
  const scheme = resolveAssistantScheme(style.colorMode);
  const radii = RADIUS_TOKENS[style.borderRadius];

  host.setAttribute(STELLAR_STYLE_ATTRIBUTE, STELLAR_STYLE_VALUE);
  host.setAttribute(STELLAR_SCHEME_ATTRIBUTE, scheme);

  for (const [name, value] of STELLAR_VARIABLES) {
    setCssVar(host, name, value);
  }

  setCssVar(host, '--rag-radius-panel', radii.panel);
  setCssVar(host, '--rag-radius-card', radii.card);
  setCssVar(host, '--rag-radius-control', radii.control);
}

/**
 * 换回其他风格时，把本模块写在宿主上的标记与内联变量收回，避免残留星港配色。
 * 昼夜切换不在这里监听：组件的配色观察者会在站点 data-scheme 变化时重新调用本函数。
 */
function clearStellarTheme(host: HTMLElement): void {
  if (host.getAttribute(STELLAR_STYLE_ATTRIBUTE) !== null) {
    host.removeAttribute(STELLAR_STYLE_ATTRIBUTE);
  }
  if (host.getAttribute(STELLAR_SCHEME_ATTRIBUTE) !== null) {
    host.removeAttribute(STELLAR_SCHEME_ATTRIBUTE);
  }

  for (const name of STELLAR_OWNED_VARIABLES) {
    host.style?.removeProperty(name);
  }
}

/**
 * 昼夜口径：站点显式声明优先于助手自己的 colorMode 设置。
 * 站点没有声明（例如插件被放到别的站点上）时，才按 colorMode 判断。
 */
function resolveAssistantScheme(colorMode: RagAssistantStyleConfig['colorMode']): AssistantScheme {
  return readSiteScheme() ?? (shouldUseDarkMode(colorMode) ? 'dark' : 'light');
}

function readSiteScheme(): AssistantScheme | null {
  if (typeof document === 'undefined') {
    return null;
  }
  const value = document.documentElement?.getAttribute('data-scheme');
  return value === 'dark' || value === 'light' ? value : null;
}

function resolveModePalette(style: RagAssistantStyleConfig): RagAssistantStyleConfig {
  if (!shouldUseDarkMode(style.colorMode)) {
    return style;
  }

  return {
    ...style,
    surfaceColor: replaceDefault(style.surfaceColor, DEFAULT_RAG_ASSISTANT_STYLE.surfaceColor, DARK_DEFAULTS.surfaceColor),
    textColor: replaceDefault(style.textColor, DEFAULT_RAG_ASSISTANT_STYLE.textColor, DARK_DEFAULTS.textColor),
    secondaryColor: replaceDefault(style.secondaryColor, DEFAULT_RAG_ASSISTANT_STYLE.secondaryColor, DARK_DEFAULTS.secondaryColor),
  };
}

function shouldUseDarkMode(colorMode: RagAssistantStyleConfig['colorMode']): boolean {
  if (colorMode === 'dark') {
    return true;
  }
  if (colorMode === 'light') {
    return false;
  }
  if (typeof window === 'undefined') {
    return false;
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
}

function isDarkStyle(style: RagAssistantStyleConfig): boolean {
  return relativeLuminance(parseHexColor(style.surfaceColor)) < 0.28;
}

function normalizeHexColor(value: string | undefined, fallback: string): string {
  const color = value?.trim();
  return color && isHexColor(color) ? expandHexColor(color).toLowerCase() : fallback;
}

function normalizeStylePreset(
  value: RagAssistantStyleConfig['stylePreset'] | undefined,
): RagAssistantStyleConfig['stylePreset'] {
  return value === 'graphite'
    || value === 'ocean'
    || value === 'azure'
    || value === 'forest'
    || value === 'rose'
    || value === 'stellar'
    || value === 'custom'
    ? value
    : DEFAULT_RAG_ASSISTANT_STYLE.stylePreset;
}

function normalizeBorderRadius(
  value: RagAssistantStyleConfig['borderRadius'] | undefined,
): RagAssistantStyleConfig['borderRadius'] {
  return value === 'standard' || value === 'round' ? value : DEFAULT_RAG_ASSISTANT_STYLE.borderRadius;
}

function normalizeColorMode(
  value: RagAssistantStyleConfig['colorMode'] | undefined,
): RagAssistantStyleConfig['colorMode'] {
  return value === 'auto' || value === 'light' || value === 'dark'
    ? value
    : DEFAULT_RAG_ASSISTANT_STYLE.colorMode;
}

function replaceDefault(value: string, defaultValue: string, replacement: string): string {
  return value.toLowerCase() === defaultValue.toLowerCase() ? replacement : value;
}

function isHexColor(value: string): boolean {
  return /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(value);
}

function expandHexColor(value: string): string {
  if (value.length === 4) {
    return `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`;
  }
  return value;
}

function parseHexColor(value: string): RgbColor {
  const color = expandHexColor(value).slice(1);
  return {
    r: Number.parseInt(color.slice(0, 2), 16),
    g: Number.parseInt(color.slice(2, 4), 16),
    b: Number.parseInt(color.slice(4, 6), 16),
  };
}

function mixColors(from: RgbColor, to: RgbColor, toWeight: number): RgbColor {
  const fromWeight = 1 - toWeight;
  return {
    r: Math.round(from.r * fromWeight + to.r * toWeight),
    g: Math.round(from.g * fromWeight + to.g * toWeight),
    b: Math.round(from.b * fromWeight + to.b * toWeight),
  };
}

function withAlpha(color: RgbColor, alpha: number): string {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
}

function toHex(color: RgbColor): string {
  return `#${hexPart(color.r)}${hexPart(color.g)}${hexPart(color.b)}`;
}

function hexPart(value: number): string {
  return Math.min(Math.max(value, 0), 255).toString(16).padStart(2, '0');
}

function readableTextOn(color: RgbColor): string {
  return relativeLuminance(color) > 0.55 ? '#171717' : '#ffffff';
}

function relativeLuminance(color: RgbColor): number {
  const channels = [color.r, color.g, color.b].map((channel) => {
    const value = channel / 255;
    return value <= 0.03928
      ? value / 12.92
      : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function shadowFor(text: RgbColor, dark: boolean): string {
  return dark
    ? `0 20px 56px ${withAlpha(text, 0.1)}, 0 6px 18px rgba(0, 0, 0, 0.34)`
    : `0 20px 56px ${withAlpha(text, 0.12)}, 0 6px 18px ${withAlpha(text, 0.07)}`;
}

function setCssVar(host: HTMLElement, name: string, value: string): void {
  host.style.setProperty(name, value);
}
