import { afterEach, describe, expect, it } from 'vitest';
import {
  STELLAR_SCHEME_ATTRIBUTE,
  STELLAR_STYLE_ATTRIBUTE,
  STELLAR_STYLE_VALUE,
  applyAssistantTheme,
  normalizeAssistantStyle,
} from '../src/rag-assistant/theme';
import type { RagAssistantStyleConfig } from '../src/rag-assistant/types';

interface HostStub {
  host: HTMLElement;
  attributes: Map<string, string>;
  properties: Map<string, string>;
}

interface SiteEnvironment {
  /** theme 不应自己创建任何观察者，这里留个记录器好断言 */
  observers: unknown[];
  documentElement: { getAttribute(name: string): string | null };
  setScheme(scheme: 'dark' | 'light'): void;
  restore(): void;
}

function createHost(): HostStub {
  const attributes = new Map<string, string>();
  const properties = new Map<string, string>();
  const host = {
    setAttribute: (name: string, value: string) => {
      attributes.set(name, value);
    },
    getAttribute: (name: string) => attributes.get(name) ?? null,
    removeAttribute: (name: string) => {
      attributes.delete(name);
    },
    style: {
      setProperty: (name: string, value: string) => {
        properties.set(name, value);
      },
      removeProperty: (name: string) => {
        properties.delete(name);
      },
    },
  };
  return { host: host as unknown as HTMLElement, attributes, properties };
}

function stellarStyle(overrides: Partial<RagAssistantStyleConfig> = {}): RagAssistantStyleConfig {
  return normalizeAssistantStyle({ stylePreset: 'stellar', ...overrides });
}

/** 用最小实现替掉 window/document/MutationObserver，够 theme.ts 判断昼夜即可。 */
function installSite(scheme: 'dark' | 'light' | null): SiteEnvironment {
  const observers: unknown[] = [];
  let current = scheme;
  const documentElement = {
    getAttribute: (name: string) => (name === 'data-scheme' ? current : null),
  };

  class ObserverStub {
    constructor() {
      observers.push(this);
    }

    observe(): void {}

    disconnect(): void {}

    takeRecords(): MutationRecord[] {
      return [];
    }
  }

  const previousDocument = Reflect.get(globalThis, 'document');
  const previousObserver = Reflect.get(globalThis, 'MutationObserver');
  Reflect.set(globalThis, 'document', { documentElement });
  Reflect.set(globalThis, 'MutationObserver', ObserverStub);

  return {
    observers,
    documentElement,
    setScheme: (next) => {
      current = next;
    },
    restore: () => {
      if (previousDocument === undefined) {
        Reflect.deleteProperty(globalThis, 'document');
      } else {
        Reflect.set(globalThis, 'document', previousDocument);
      }
      if (previousObserver === undefined) {
        Reflect.deleteProperty(globalThis, 'MutationObserver');
      } else {
        Reflect.set(globalThis, 'MutationObserver', previousObserver);
      }
    },
  };
}

let activeEnvironment: SiteEnvironment | undefined;

afterEach(() => {
  activeEnvironment?.restore();
  activeEnvironment = undefined;
});

describe('RAG 助手星港风格 · 配置归一化', () => {
  it('保留 stellar，并继续忽略未知取值', () => {
    expect(normalizeAssistantStyle({ stylePreset: 'stellar' }).stylePreset).toBe('stellar');
    expect(normalizeAssistantStyle({ stylePreset: 'graphite' }).stylePreset).toBe('graphite');
    expect(normalizeAssistantStyle({ stylePreset: 'unknown' as never }).stylePreset).toBe('default');
    expect(normalizeAssistantStyle(undefined).stylePreset).toBe('default');
  });

  it('圆角与昼夜偏好对 stellar 照旧生效', () => {
    const style = normalizeAssistantStyle({ stylePreset: 'stellar', borderRadius: 'round', colorMode: 'auto' });
    expect(style).toMatchObject({ stylePreset: 'stellar', borderRadius: 'round', colorMode: 'auto' });
    expect(style.primaryColor).toMatch(/^#[0-9a-f]{6}$/);
  });
});

describe('RAG 助手星港风格 · 宿主标记与变量映射', () => {
  it('打上风格与昼夜标记，并把 --rag-* 映射到站点变量', () => {
    activeEnvironment = installSite(null);
    const { host, attributes, properties } = createHost();

    applyAssistantTheme(host, stellarStyle({ colorMode: 'light' }));

    expect(attributes.get(STELLAR_STYLE_ATTRIBUTE)).toBe(STELLAR_STYLE_VALUE);
    expect(attributes.get(STELLAR_SCHEME_ATTRIBUTE)).toBe('light');
    expect(properties.get('--rag-gold')).toBe('var(--cyan, var(--rag-stellar-cyan))');
    expect(properties.get('--rag-text')).toBe('var(--text, var(--rag-stellar-text))');
    expect(properties.get('--rag-muted')).toBe('var(--text-dim, var(--rag-stellar-text-dim))');
    expect(properties.get('--rag-paper')).toBe('var(--panel, var(--rag-stellar-panel))');
    expect(properties.get('--rag-line')).toBe('var(--panel-border, var(--rag-stellar-panel-border))');
    expect(properties.get('--rag-input-surface-resolved')).toBe('var(--chip-bg, var(--rag-stellar-chip-bg))');
    expect(properties.get('--rag-gold-strong')).toContain('var(--cyan, var(--rag-stellar-cyan))');
    expect(properties.get('--rag-gold-strong')).toContain('var(--violet, var(--rag-stellar-violet))');
    expect(properties.get('--rag-primary-contrast')).toBe('var(--rag-stellar-contrast)');
    expect(properties.get('--rag-shadow')).toBe('var(--rag-stellar-shadow-panel)');
    expect(properties.get('--rag-radius-panel')).toBe('18px');
  });

  it('全部颜色变量都是引用，不出现十六进制取色', () => {
    activeEnvironment = installSite(null);
    const { host, properties } = createHost();

    applyAssistantTheme(host, stellarStyle({ colorMode: 'dark' }));

    // 圆角是长度而非颜色，单独放行
    const colorVariables = [...properties].filter(([name]) => !name.startsWith('--rag-radius-'));
    expect(colorVariables.length).toBeGreaterThan(20);
    for (const [name, value] of colorVariables) {
      expect(value, `${name} 不应写成固定色`).not.toMatch(/#[0-9a-f]{3}/i);
      expect(value, `${name} 应引用站点变量或兜底令牌`).toMatch(/var\(--|color-mix\(/);
    }
  });

  it('站点 data-scheme 优先于助手自己的 colorMode', () => {
    activeEnvironment = installSite('light');
    const { host, attributes } = createHost();

    applyAssistantTheme(host, stellarStyle({ colorMode: 'dark' }));

    expect(attributes.get(STELLAR_SCHEME_ATTRIBUTE)).toBe('light');
  });

  it('站点没有声明配色时，才回落到 colorMode', () => {
    activeEnvironment = installSite(null);
    const first = createHost();
    applyAssistantTheme(first.host, stellarStyle({ colorMode: 'dark' }));
    expect(first.attributes.get(STELLAR_SCHEME_ATTRIBUTE)).toBe('dark');

    const second = createHost();
    applyAssistantTheme(second.host, stellarStyle({ colorMode: 'light' }));
    expect(second.attributes.get(STELLAR_SCHEME_ATTRIBUTE)).toBe('light');
  });

  it('其他风格：不打标记，着色仍是取色后的十六进制', () => {
    activeEnvironment = installSite('dark');
    const { host, attributes, properties } = createHost();

    applyAssistantTheme(host, normalizeAssistantStyle({ stylePreset: 'graphite', colorMode: 'light' }));

    expect(attributes.has(STELLAR_STYLE_ATTRIBUTE)).toBe(false);
    expect(attributes.has(STELLAR_SCHEME_ATTRIBUTE)).toBe(false);
    // 站点是深夜也不影响非星港风格：它只认自己的 colorMode
    expect(properties.get('--rag-gold')).toBe('#d6b46c');
    expect(properties.get('--rag-panel')).toBe('#171717');
  });

  it('从星港切回其他风格时收回标记与星港内联覆盖', () => {
    activeEnvironment = installSite(null);
    const { host, attributes, properties } = createHost();

    applyAssistantTheme(host, stellarStyle({ colorMode: 'dark' }));
    expect(attributes.get(STELLAR_STYLE_ATTRIBUTE)).toBe(STELLAR_STYLE_VALUE);

    applyAssistantTheme(host, normalizeAssistantStyle({ stylePreset: 'azure' }));

    expect(attributes.has(STELLAR_STYLE_ATTRIBUTE)).toBe(false);
    expect(attributes.has(STELLAR_SCHEME_ATTRIBUTE)).toBe(false);
    for (const [name, value] of properties) {
      expect(value, `${name} 应换回取色结果`).not.toContain('var(');
    }
    expect(properties.get('--rag-gold')).toBe('#3b82f6');
  });
});

describe('RAG 助手星港风格 · 昼夜口径', () => {
  // 站点昼夜的监听由组件侧的共享观察者负责；theme 只在每次应用时按站点口径打标
  it('站点切昼夜后重新应用，标记跟着站点走', () => {
    activeEnvironment = installSite('dark');
    const { host, attributes } = createHost();

    applyAssistantTheme(host, stellarStyle({ colorMode: 'light' }));
    expect(attributes.get(STELLAR_SCHEME_ATTRIBUTE)).toBe('dark');

    activeEnvironment.setScheme('light');
    applyAssistantTheme(host, stellarStyle({ colorMode: 'light' }));
    expect(attributes.get(STELLAR_SCHEME_ATTRIBUTE)).toBe('light');
  });

  it('theme 不持有任何监听：应用过程中不创建 MutationObserver', () => {
    activeEnvironment = installSite('dark');
    const { host } = createHost();

    applyAssistantTheme(host, stellarStyle({ colorMode: 'dark' }));
    applyAssistantTheme(host, normalizeAssistantStyle({ stylePreset: 'rose' }));

    expect(activeEnvironment.observers).toHaveLength(0);
  });

  it('切走再切回仍然干净，重新打标时按当下站点口径', () => {
    activeEnvironment = installSite('light');
    const { host, attributes, properties } = createHost();

    applyAssistantTheme(host, stellarStyle({ colorMode: 'dark' }));
    applyAssistantTheme(host, normalizeAssistantStyle({ stylePreset: 'rose' }));
    expect(attributes.has(STELLAR_SCHEME_ATTRIBUTE)).toBe(false);

    applyAssistantTheme(host, stellarStyle({ colorMode: 'dark' }));
    expect(attributes.get(STELLAR_STYLE_ATTRIBUTE)).toBe(STELLAR_STYLE_VALUE);
    expect(attributes.get(STELLAR_SCHEME_ATTRIBUTE)).toBe('light');
    expect(properties.get('--rag-gold')).toBe('var(--cyan, var(--rag-stellar-cyan))');
  });
});
