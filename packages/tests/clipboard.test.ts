import { afterEach, describe, expect, it, vi } from 'vitest';
import { copyAssistantText } from '../src/rag-assistant/clipboard';

afterEach(() => vi.unstubAllGlobals());

function setupFallback(success = true) {
  const focus = vi.fn();
  const remove = vi.fn();
  const select = vi.fn();
  const setSelectionRange = vi.fn();
  class TextArea {
    value = ''; readOnly = false; style = { cssText: '' };
    selectionStart = 2; selectionEnd = 5; selectionDirection = 'forward';
    shadowRoot = undefined; setAttribute = vi.fn(); focus = focus; select = select;
    remove = remove; setSelectionRange = setSelectionRange;
  }
  const active = new TextArea();
  const area = new TextArea();
  const appendChild = vi.fn();
  const execCommand = vi.fn(() => success);
  vi.stubGlobal('HTMLElement', TextArea);
  vi.stubGlobal('HTMLTextAreaElement', TextArea);
  vi.stubGlobal('HTMLInputElement', class {});
  vi.stubGlobal('document', { body: { appendChild }, activeElement: active, createElement: () => area, execCommand });
  vi.stubGlobal('window', { getSelection: () => null });
  return { area, appendChild, execCommand, focus, remove, select, setSelectionRange };
}

describe('HTTP 剪贴板降级', () => {
  it('现代接口可用时不创建临时节点', async () => {
    const writeText = vi.fn(async () => {});
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    expect(await copyAssistantText('信号')).toBe(true);
    expect(writeText).toHaveBeenCalledWith('信号');
  });
  it('不安全 HTTP 缺少 Clipboard API 时降级并恢复输入选区', async () => {
    const fallback = setupFallback();
    vi.stubGlobal('navigator', {});
    expect(await copyAssistantText('本舱记录')).toBe(true);
    expect(fallback.execCommand).toHaveBeenCalledWith('copy');
    expect(fallback.area.value).toBe('本舱记录');
    expect(fallback.remove).toHaveBeenCalledTimes(1);
    expect(fallback.setSelectionRange).toHaveBeenCalledWith(2, 5, 'forward');
  });
  it('权限拒绝后仍尝试降级', async () => {
    const fallback = setupFallback();
    vi.stubGlobal('navigator', { clipboard: { writeText: vi.fn(async () => { throw new Error('权限拒绝'); }) } });
    expect(await copyAssistantText('信号')).toBe(true);
    expect(fallback.execCommand).toHaveBeenCalledOnce();
  });
  it('旧式复制返回失败时不报告成功且清理节点', async () => {
    const fallback = setupFallback(false);
    vi.stubGlobal('navigator', {});
    expect(await copyAssistantText('信号')).toBe(false);
    expect(fallback.remove).toHaveBeenCalledOnce();
  });
  it('两种接口不可用与空内容不抛异常', async () => {
    vi.stubGlobal('navigator', {});
    vi.stubGlobal('document', { body: {} });
    expect(await copyAssistantText('信号')).toBe(false);
    expect(await copyAssistantText('')).toBe(false);
  });
});
