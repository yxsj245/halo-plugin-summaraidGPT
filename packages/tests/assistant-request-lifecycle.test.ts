import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/**
 * 助手问答请求生命周期的接线契约测试。
 *
 * 这里以静态文本断言代替真 DOM 渲染：Lit 组件的流式问答要跑起来需要真实的
 * fetch / SSE / Agent SDK，成本高且易脆。真正要钉住的是一条并发纪律——
 * 一次请求独享一个 AbortController，实例字段只作“当前请求”的索引；
 * 旧请求结算时不得清掉后来者的 streaming / abortController / agentChatClient，
 * 迟到回调与迟到返回值也不得写进新会话。真实浏览器行为由主线程的受控验证覆盖。
 */

function read(relativePath: string): string {
  return readFileSync(fileURLToPath(new URL(relativePath, import.meta.url)), 'utf8');
}

const widget = read('../src/rag-assistant/widget.ts');

/** 取某个声明之后的完整块（按花括号配对），参数列表跨行也适用。 */
function blockAfter(source: string, marker: string): string {
  const start = source.indexOf(marker);
  expect(start, `未找到标记：${marker}`).toBeGreaterThan(-1);

  const open = source.indexOf('{', start);
  expect(open, `标记后没有块：${marker}`).toBeGreaterThan(-1);

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

const submitQuestion = blockAfter(widget, 'private async submitQuestion(');
const askAgentStream = blockAfter(widget, 'private async askAgentStream(');
const resumeAfterNavigation = blockAfter(widget, 'private async resumeAgentAfterNavigation(');
const askRagStream = blockAfter(widget, 'private async askRagStream(');
const abortCurrentRequest = blockAfter(widget, 'private abortCurrentRequest(');
const ownsRequest = blockAfter(widget, 'private ownsRequest(');
const isActiveRequest = blockAfter(widget, 'private isActiveRequest(');
const bindColorSchemeListener = blockAfter(widget, 'private bindColorSchemeListener(');
const unbindColorSchemeListener = blockAfter(widget, 'private unbindColorSchemeListener(');
const connectedCallback = blockAfter(widget, 'connectedCallback(): void {');
const disconnectedCallback = blockAfter(widget, 'disconnectedCallback(): void {');

/** 两条提问路径：各自建 controller，各自负责收尾。 */
const REQUEST_METHODS: Array<[string, string]> = [
  ['submitQuestion', submitQuestion],
  ['resumeAgentAfterNavigation', resumeAfterNavigation],
];

/** 两条提问路径的“启动请求流”位置，用于确认首帧之后的复检确实挡在前面。 */
const STREAM_STARTS: Array<[string, string, string]> = [
  ['submitQuestion', submitQuestion, 'await this.askAgentStream('],
  ['resumeAgentAfterNavigation', resumeAfterNavigation, 'const client = new AgentChatClient();'],
];

/** 取方法体里的 finally 块：共享状态的归还语句只应该出现在这里。 */
function finallyBlock(body: string): string {
  return blockAfter(body, 'finally {');
}

/** 某个片段在文本里出现的次数。 */
function countOf(source: string, pattern: RegExp): number {
  return (source.match(pattern) ?? []).length;
}

describe('助手请求归属判据', () => {
  it('归属判据同时要求元素在线与实例字段指向本次请求', () => {
    expect(ownsRequest).toContain('this.isConnected');
    expect(ownsRequest).toContain('this.abortController === controller');
  });

  it('生效判据在归属之上排除已中止的请求', () => {
    expect(isActiveRequest).toContain('this.ownsRequest(controller)');
    expect(isActiveRequest).toContain('!controller.signal.aborted');
  });
});

describe('每次提问独占一个 controller', () => {
  it.each(REQUEST_METHODS)('%s 建局部 controller 并登记为当前请求', (_name, body) => {
    expect(body).toContain('const controller = new AbortController();');
    expect(body).toContain('this.abortController = controller;');
  });

  it.each(REQUEST_METHODS)('%s 的 catch 按归属判据决定是否报错', (_name, body) => {
    expect(body).toContain('if (!this.isActiveRequest(controller))');
    expect(body).not.toContain('this.abortController.signal.aborted');
  });

  it.each(REQUEST_METHODS)('%s 的 finally 只在仍是当前请求时才归还共享状态', (_name, body) => {
    const cleanup = finallyBlock(body);
    const owned = cleanup.indexOf('const owned = this.abortController === controller;');
    expect(owned, '缺少身份判断').toBeGreaterThan(-1);

    const releaseBlock = cleanup.indexOf('if (owned) {');
    expect(releaseBlock, '缺少按身份归还的分支').toBeGreaterThan(owned);

    // 三处共享字段的归还必须全部落在身份判断之内，否则旧请求会抹掉后来者的流。
    for (const release of ['this.streaming = false;', 'this.abortController = undefined;', 'this.agentChatClient = undefined;']) {
      const index = cleanup.indexOf(release);
      expect(index, `缺少归还语句：${release}`).toBeGreaterThan(-1);
      expect(index, `${release} 逃出了身份判断`).toBeGreaterThan(releaseBlock);
    }

    // 本条消息的收尾与身份无关：旧消息必须停止转圈，但不得动后来者的流。
    const finish = cleanup.indexOf('this.finishAssistantMessage(assistantMessageId);');
    expect(finish, '缺少本条消息的收尾').toBeGreaterThan(-1);
    expect(finish, '本条消息的收尾被身份判断挡住了').toBeLessThan(releaseBlock);

    // 滚动只属于仍在生效的请求：被接管的旧请求不该抢位置。
    expect(cleanup.indexOf('this.scrollToBottom();'), '滚动没有按归属收口').toBeGreaterThan(releaseBlock);
  });

  it.each(STREAM_STARTS)('%s 在首帧之后、启动请求流之前复检归属', (_name, body, startMarker) => {
    const wait = body.indexOf('await this.updateComplete;');
    const guard = body.indexOf('if (!this.isActiveRequest(controller)) {');
    const start = body.indexOf(startMarker);

    expect(wait, '缺少首帧等待').toBeGreaterThan(-1);
    expect(guard, '缺少启动前复检').toBeGreaterThan(wait);
    expect(start, `缺少启动点：${startMarker}`).toBeGreaterThan(guard);
  });

  it('两条提问路径都把 controller 交给流式实现', () => {
    expect(submitQuestion).toContain('this.askAgentStream(requestQuestion, assistantMessageId, controller)');
    expect(submitQuestion).toContain('this.askRagStream(requestQuestion, assistantMessageId, controller)');
  });

  it('恢复会话沿用同一套纪律', () => {
    expect(resumeAfterNavigation).toContain('signal: controller.signal');
    expect(resumeAfterNavigation).toContain('this.askRagStream(resume.message, assistantMessageId, controller)');
  });
});

describe('流式回调全部按归属判据放行', () => {
  it('Agent 流的四个回调带守卫，入口另有守卫', () => {
    // 四个回调各一处 + 入口一处
    expect(countOf(askAgentStream, /if \(!this\.isActiveRequest\(controller\)\) return;/g)).toBe(5);
    expect(askAgentStream).not.toContain('this.abortController?.signal');
  });

  it('恢复会话的 Agent 回调同样都带守卫', () => {
    expect(countOf(resumeAfterNavigation, /if \(!this\.isActiveRequest\(controller\)\) return;/g)).toBe(4);
  });

  it('RAG 流的 UI 回调带守卫，入口另有守卫，会话号落库只要求归属', () => {
    expect(countOf(askRagStream, /if \(!this\.isActiveRequest\(controller\)\) return;/g)).toBe(5);
    expect(askRagStream).toContain('if (!this.ownsRequest(controller)) return;');
    expect(askRagStream).toContain('this.persistConversationId(conversationId)');
  });

  it('两个流式入口都先复检归属', () => {
    expect(askAgentStream).toContain('if (!this.isActiveRequest(controller)) return;');
    expect(askRagStream).toContain('if (!this.isActiveRequest(controller)) return;');
  });

  it('RAG 流按传入的 controller 中止，不再读实例字段', () => {
    expect(askRagStream).toContain('controller.signal,');
    expect(askRagStream).not.toContain('this.abortController?.signal');
  });

  it('停用的请求不会改写消息：失败与收尾都经过守卫', () => {
    expect(askAgentStream).toContain('if (!this.isActiveRequest(controller)) {');
    expect(askRagStream).toContain('this.failAssistantMessage(assistantMessageId, error);');
  });
});

describe('Agent 回退、历史与会话句柄', () => {
  it('回退到知识库问答时沿用同一个 controller', () => {
    expect(askAgentStream).toContain('await this.askRagStream(question, assistantMessageId, controller);');
    expect(resumeAfterNavigation).toContain('await this.askRagStream(resume.message, assistantMessageId, controller);');
  });

  it('Agent 历史只在本次请求仍生效时落库', () => {
    for (const body of [askAgentStream, resumeAfterNavigation]) {
      const guard = body.indexOf('if (this.isActiveRequest(controller)) {');
      const assign = body.indexOf('this.agentHistoryMessages = messages;');
      expect(guard, '缺少历史落库守卫').toBeGreaterThan(-1);
      expect(assign, '缺少历史落库').toBeGreaterThan(guard);
    }
  });

  it('Agent 客户端只在仍是自己那一份时才被清空', () => {
    expect(askAgentStream).toContain('if (this.agentChatClient === client) {');
    expect(resumeAfterNavigation).toContain('if (this.agentChatClient === client) {');
  });

  it('主动停止仍由实例字段驱动，语义不变', () => {
    expect(abortCurrentRequest).toContain('this.abortController.abort();');
    expect(abortCurrentRequest).toContain('this.agentChatClient?.stop();');
  });

  it('三个请求方法里不再出现直接读实例 controller 的旧写法', () => {
    const joined = REQUEST_METHODS.map(([, body]) => body).join('\n') + askRagStream;
    expect(joined).not.toContain('this.abortController.signal');
    expect(joined).not.toContain('this.abortController?.signal');
  });
});

describe('昼夜偏好监听兼容老接口', () => {
  it('绑定走 addEventListener，缺失时回落 addListener', () => {
    expect(bindColorSchemeListener).toContain("typeof query.addEventListener === 'function'");
    expect(bindColorSchemeListener).toContain('query.addListener?.(this.refreshAssistantTheme);');
  });

  it('解绑同步回落 removeListener', () => {
    expect(unbindColorSchemeListener).toContain("typeof query.removeEventListener === 'function'");
    expect(unbindColorSchemeListener).toContain('query.removeListener?.(this.refreshAssistantTheme);');
  });

  it('连接与断开都只经这对方法，不直接摸 MediaQueryList 接口', () => {
    expect(connectedCallback).toContain('this.bindColorSchemeListener(this.colorSchemeQuery);');
    expect(disconnectedCallback).toContain('this.unbindColorSchemeListener(this.colorSchemeQuery);');
    expect(connectedCallback).not.toContain('this.colorSchemeQuery?.addEventListener');
    expect(disconnectedCallback).not.toContain('this.colorSchemeQuery?.removeEventListener');
  });
});
