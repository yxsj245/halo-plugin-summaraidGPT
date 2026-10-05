import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/**
 * 星港摘要与洞察图谱的样式/接线契约测试。
 * 这里以静态文本断言代替真 DOM 渲染：目的是把“只取主题变量、昼夜成对、语义节点仍可区分、
 * 减弱动态效果有落点、摘要与图谱的星港入口没被摘掉”这几条硬约束钉在测试里。
 */

function read(relativePath: string): string {
  return readFileSync(fileURLToPath(new URL(relativePath, import.meta.url)), 'utf8');
}

const summaryStyles = read('../src/article-summary/styles.ts');
const readingStyles = read('../src/article-reading/styles.ts');
const summaryWidget = read('../src/article-summary/widget.ts');
const readingWidget = read('../src/article-reading/widget.ts');
const entry = read('../src/article-summary-entry.ts');
const shared = read('../src/article-summary/shared.ts');

const THEME_TOKENS = [
  '--cyan',
  '--violet',
  '--panel',
  '--panel-soft',
  '--panel-border',
  '--text',
  '--text-dim',
];

/** 取某个选择器片段命中的全部规则体（从 { 到最近的 }）。 */
function ruleBodies(source: string, selectorFragment: string): string[] {
  const bodies: string[] = [];
  let index = source.indexOf(selectorFragment);

  while (index !== -1) {
    const open = source.indexOf('{', index);
    const close = open === -1 ? -1 : source.indexOf('}', open);
    if (open === -1 || close === -1) {
      break;
    }
    bodies.push(source.slice(open + 1, close));
    index = source.indexOf(selectorFragment, close);
  }

  return bodies;
}

/** 取某个标记之后的完整块（按花括号配对），用于 @media 这类嵌套块。 */
function blockAfter(source: string, marker: string): string {
  const start = source.indexOf(marker);
  expect(start, `未找到标记：${marker}`).toBeGreaterThan(-1);

  const open = source.indexOf('{', start);
  let depth = 0;
  for (let index = open; index < source.length; index += 1) {
    if (source[index] === '{') {
      depth += 1;
    } else if (source[index] === '}') {
      depth -= 1;
      if (depth === 0) {
        return source.slice(open + 1, index);
      }
    }
  }

  throw new Error(`未闭合的块：${marker}`);
}

/** 取某个方法体的文本（从方法定义到下一个同级成员），兼容 `private/protected` 与 `async`。 */
function methodBody(source: string, methodName: string): string {
  const pattern = new RegExp(`(?:private|protected|public)\\s+(?:async\\s+)?${methodName}\\(`);
  const match = pattern.exec(source);
  expect(match, `未找到方法：${methodName}`).not.toBeNull();

  const start = match!.index;
  const tail = source.slice(start + match![0].length);
  const nextMember = /\n  (?:private|protected|public) (?:async )?/.exec(tail);
  const next = nextMember ? start + match![0].length + nextMember.index : -1;
  return next === -1 ? source.slice(start) : source.slice(start, next);
}

/** 取某个模块级函数体的文本：先跳过参数列表（可能含 `= {}` 默认值），再按花括号配对取体。 */
function functionBody(source: string, functionName: string): string {
  const marker = `function ${functionName}(`;
  const start = source.indexOf(marker);
  expect(start, `未找到函数：${functionName}`).toBeGreaterThan(-1);

  let index = start + marker.length - 1;
  let parenDepth = 0;
  for (; index < source.length; index += 1) {
    if (source[index] === '(') {
      parenDepth += 1;
    } else if (source[index] === ')') {
      parenDepth -= 1;
      if (parenDepth === 0) {
        break;
      }
    }
  }

  return blockAfter(source.slice(index), '{');
}

function fontFamilies(bodies: string[]): string[] {
  return bodies.flatMap((body) =>
    [...body.matchAll(/font-family:\s*([^;]+);/g)].map((match) => match[1]!.trim()),
  );
}

function variableValue(source: string, name: string): string {
  const match = source.match(new RegExp(`${name}:\\s*([^;]+);`));
  expect(match, `未找到变量：${name}`).not.toBeNull();
  return match![1]!.trim();
}

describe('星港摘要样式', () => {
  const stellarBodies = ruleBodies(summaryStyles, '.likcc-summaraidGPT-stellar');

  it('星港规则确实存在，且玻璃底、细描边、角标括线齐备', () => {
    expect(stellarBodies.length).toBeGreaterThan(0);
    expect(stellarBodies.some((body) => body.includes('clip-path'))).toBe(true);
    expect(stellarBodies.some((body) => body.includes('linear-gradient(var(--likcc-stellar-accent'))).toBe(true);
    expect(stellarBodies.some((body) => body.includes('backdrop-filter'))).toBe(true);
  });

  it('取色只走主题变量', () => {
    const joined = stellarBodies.join('\n');
    THEME_TOKENS.forEach((token) => {
      expect(joined, `星港摘要缺少主题变量 ${token}`).toContain(`var(${token}`);
    });
  });

  it('字体只用 --sans/--hud/--mono，不引入第三款字体', () => {
    const families = fontFamilies(stellarBodies);
    expect(families.length).toBeGreaterThan(0);
    families.forEach((value) => {
      expect(value).toMatch(/^var\(--(sans|hud|mono)/);
    });
  });

  it('减弱动态效果下不逐字计时，并关掉入场与扫描动效', () => {
    const reduced = blockAfter(summaryStyles, '@media (prefers-reduced-motion: reduce)');
    expect(reduced).toContain('.likcc-summaraidGPT-stellar-shell');
    expect(reduced).toContain('.likcc-summaraidGPT-stellar-cursor');
    expect(reduced).toContain('animation: none !important');
  });
});

describe('星港摘要渲染接线', () => {
  it('stellar 有独立渲染分支，不是复用简约卡片', () => {
    expect(summaryWidget).toContain("if (this.effectiveUiStyle === 'stellar')");
    expect(summaryWidget).toContain('renderStellarCard');
    expect(summaryWidget).toContain('resolveSummaryUiStyle');
    expect(summaryWidget).toContain('resolveStellarSignalState');
  });

  it('渲染里没有内联固定颜色，状态文案来自共享口径', () => {
    const body = methodBody(summaryWidget, 'renderStellarCard');
    expect(body).not.toContain('style=');
    expect(body).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(body).toContain('stellarStateMessage');
    expect(body).toContain('stellarStatusLabel');
    expect(body).toContain('resolveStellarTitle');
  });

  it('渲染用到的星港类名都在样式表里有落点', () => {
    const used = new Set(
      [...methodBody(summaryWidget, 'renderStellarCard').matchAll(/likcc-summaraidGPT-stellar[\w-]*/g)]
        .map((match) => match[0].replace(/-+$/, '')),
    );

    expect(used.size).toBeGreaterThan(8);
    used.forEach((className) => {
      expect(summaryStyles, `样式表缺少 .${className}`).toContain(`.${className}`);
    });
  });

  it('迟到响应被代次与连接检查挡在打字机之前', () => {
    expect(summaryWidget).toContain('isCurrentLoad');
    expect(summaryWidget).toContain('this.loadSequence');
    expect(summaryWidget).toContain('this.isConnected');
  });
});

describe('星港图谱样式', () => {
  const stellarBodies = ruleBodies(readingStyles, '.reading-shell.is-stellar');

  it('is-stellar 覆盖存在，且把图谱变量整体改挂到主题色', () => {
    expect(stellarBodies.length).toBeGreaterThan(0);
    const joined = stellarBodies.join('\n');
    expect(joined).toContain('--likcc-reading-node');
    expect(joined).toContain('--likcc-reading-line');
    expect(joined).toContain('--likcc-reading-text');
    expect(joined).toContain('--likcc-reading-muted');
    expect(joined).toContain('--likcc-reading-accent');
  });

  it('取色只走主题变量（含 --reader-text）', () => {
    const joined = stellarBodies.join('\n');
    [...THEME_TOKENS, '--reader-text'].forEach((token) => {
      expect(joined, `星港图谱缺少主题变量 ${token}`).toContain(`var(${token}`);
    });
  });

  it('字体只用 --sans/--hud/--mono 组合，中文仍回落 --sans', () => {
    const families = fontFamilies(stellarBodies);
    expect(families.length).toBeGreaterThan(0);
    families.forEach((value) => {
      expect(value).toMatch(/^var\(--(sans|hud|mono)/);
    });
    expect(families.some((value) => value.startsWith('var(--sans'))).toBe(true);
    expect(families.some((value) => value.startsWith('var(--hud'))).toBe(true);
    expect(families.some((value) => value.startsWith('var(--mono'))).toBe(true);
  });

  it('四类语义节点在同色域内仍然互相区分', () => {
    const declarations = ruleBodies(readingStyles, '.reading-shell.is-stellar')
      .find((body) => body.includes('--likcc-reading-core')) ?? '';
    const tones = ['conclusion', 'background', 'core', 'argument'].map((tone) =>
      variableValue(declarations, `--likcc-reading-${tone}`),
    );

    expect(new Set(tones).size).toBe(4);
    tones.forEach((value) => {
      expect(value).toMatch(
        /var\(--(cyan|violet|text-dim|likcc-stellar-(accent|accent-alt|muted))/,
      );
    });
  });

  it('根节点与浮窗不再持有写死的深蓝与纯白底', () => {
    expect(readingStyles).toContain('.reading-shell.is-stellar .graph-node--root');
    expect(readingStyles).toContain('.reading-shell.is-stellar .node-popover');

    const joined = ruleBodies(readingStyles, '.reading-shell.is-stellar').join('\n');
    expect(joined).toContain('--likcc-stellar-surface');
    expect(joined).not.toMatch(/#(111827|1a2432|0f1722|ffffff)\b/i);
  });

  it('图谱各组件都在 is-stellar 覆盖范围内', () => {
    [
      '.graph-node',
      '.graph-node--root',
      '.graph-node--leaf',
      '.node-icon',
      '.node-popover',
      '.node-title',
      '.graph-links',
      '.graph-dot',
      '.reading-collapse',
      '.reading-collapsed',
      '.collapsed-title',
      '.collapsed-summary',
      '.state-box',
      '.payload-list',
      '.source-anchor',
      '.question-input',
      '.answer-box',
      '.primary-action',
    ].forEach((selector) => {
      expect(readingStyles, `星港覆盖缺少 ${selector}`).toContain(`.reading-shell.is-stellar ${selector}`);
    });
  });
});

describe('星港图谱接线与摘要独立', () => {
  it('图谱按 ui-style 决定是否加 is-stellar', () => {
    expect(readingWidget).toContain("@property({ type: String, attribute: 'ui-style' })");
    expect(readingWidget).toContain('resolveReadingShellClass');
    expect(readingWidget).toContain('this.uiStyle ===');
  });

  it('图谱迟到响应同样被代次与连接检查挡住，轮询只服务当前文章', () => {
    expect(readingWidget).toContain('isCurrentRequest');
    expect(readingWidget).toContain('this.requestSequence');
    expect(readingWidget).toContain('this.postName !== postName');
  });

  it('入口把摘要口径传给图谱，并在配置请求前就标记占位标签', () => {
    expect(entry).toContain('element.uiStyle = config.uiStyle');
    expect(entry).toContain('mountInFlight');
    expect(entry).toContain('const placeholders = [...widgets, ...readingWidgets]');
    expect(entry).toContain('widget.isConnected');
  });

  it('在途挂载结束后重扫未处理占位，换页进来的新正文不会永久漏挂', () => {
    expect(entry).toContain('function hasUnprocessedPlaceholders');
    expect(entry).toContain(':not([${PROCESSED_DATA_ATTR}="true"])');

    const mountBody = functionBody(entry, 'mountSummaryWidgets');
    expect(mountBody).toContain('finally');
    expect(mountBody).toContain('hasUnprocessedPlaceholders');
    expect(mountBody).toContain('scheduleAutoInit');
    // 并发调用必须拿到同一个 promise，调用方才判断得出“这是正在跑的那一轮”
    expect(mountBody).toContain('return mountInFlight');
  });

  it('首次挂载不会重复请求：两个组件都只对“文章名真的变了”重新取数', () => {
    [summaryWidget, readingWidget].forEach((source) => {
      expect(source).toContain('private loadedPostName = ');
      expect(source).toContain('this.loadedPostName = this.postName');
      expect(source).toContain('this.postName !== this.loadedPostName');
    });
  });

  it('文章名清空也走加载入口，空值分支的清理不会被短路掉', () => {
    // 旧写法在 updated 里单独判断 `if (!this.postName)` 只改 loadedPostName，
    // 结果是 loadReading/loadSummary 的空值分支永远进不去，这类短路必须不存在。
    [['summary', summaryWidget, 'loadSummary'], ['reading', readingWidget, 'loadReading']].forEach(
      ([, source, loader]) => {
        const updatedBody = methodBody(source as string, 'updated');
        expect(updatedBody, `${loader} 的上游 updated 不应再自行短路空文章名`)
          .not.toContain('if (!this.postName)');
        expect(updatedBody).toContain('this.postName !== this.loadedPostName');
        expect(updatedBody).toContain(`void this.${loader}()`);
      },
    );
  });

  it('摘要空文章名作废在途请求并停掉打字机', () => {
    const loadBody = methodBody(summaryWidget, 'loadSummary');
    expect(loadBody).toContain('if (!this.postName)');
    expect(loadBody).toContain('this.loadSequence += 1');
    expect(loadBody).toContain('this.stopTypewriter()');
    expect(loadBody).toContain('this.markLoadFailed()');
    expect(loadBody).toContain("this.loadedPostName = ''");
    expect(methodBody(summaryWidget, 'firstUpdated')).toContain('void this.loadSummary()');
  });

  it('失败响应走 resolveSummarySignal，星港不把后端提示当正文', () => {
    expect(shared).toContain('success?: boolean');
    expect(shared).toContain('blackList?: boolean');
    expect(summaryWidget).toContain('resolveSummarySignal');
    expect(summaryWidget).toContain('this.contentEmpty = signal.empty');
    // 旧风格仍按打字机逐字展示后端文案，只有星港在无信号时整段落定
    expect(summaryWidget).toContain("this.effectiveUiStyle === 'stellar' && this.contentEmpty");
  });

  it('图谱空文章名清干净残留，轮询预算用尽给明确收束文案', () => {
    const loadBody = methodBody(readingWidget, 'loadReading');
    expect(loadBody).toContain('if (!this.postName)');
    expect(loadBody).toContain('this.requestSequence += 1');
    expect(loadBody).toContain('this.reading = undefined');
    expect(loadBody).toContain('this.notGenerated = false');
    expect(loadBody).toContain('this.clearPollTimer()');
    expect(loadBody).toContain('this.pollAttempts = 0');
    expect(loadBody).toContain('READING_EMPTY_POST_NAME_MESSAGE');
    expect(loadBody).toContain('this.loadedPostName = this.postName');
    expect(methodBody(readingWidget, 'firstUpdated')).toContain('void this.loadReading()');

    const pollBody = methodBody(readingWidget, 'scheduleExistingPoll');
    expect(pollBody).toContain('hasReadingPollBudget');
    expect(pollBody).toContain('this.notGenerated = false');
    expect(pollBody).toContain('READING_SIGNAL_PENDING_MESSAGE');
    expect(readingWidget).toContain('信号未就位');
  });
});
