// 优先使用安全上下文的剪贴板 API，HTTP 或权限拒绝时保留旧式复制通道。
export async function copyAssistantText(content: string): Promise<boolean> {
  if (!content) return false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(content);
      return true;
    }
  } catch {
    // 浏览器拒绝现代接口时，仍尝试当前点击手势允许的降级通道。
  }
  if (!document.body || typeof document.execCommand !== 'function') return false;
  const active = deepActiveElement();
  const selection = window.getSelection();
  const ranges = selection ? Array.from({ length: selection.rangeCount }, (_, index) => selection.getRangeAt(index).cloneRange()) : [];
  const inputSelection = active instanceof HTMLTextAreaElement || active instanceof HTMLInputElement
    ? { start: active.selectionStart, end: active.selectionEnd, direction: active.selectionDirection }
    : undefined;
  const area = document.createElement('textarea');
  area.value = content;
  area.readOnly = true;
  area.setAttribute('aria-label', '复制信号文本');
  area.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0;font-size:16px;';
  try {
    document.body.appendChild(area);
    area.focus({ preventScroll: true });
    area.select();
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    area.remove();
    active?.focus({ preventScroll: true });
    if (inputSelection && (active instanceof HTMLTextAreaElement || active instanceof HTMLInputElement)) {
      try { active.setSelectionRange(inputSelection.start, inputSelection.end, inputSelection.direction ?? undefined); } catch { /* 部分输入类型不支持选区。 */ }
    } else if (selection) {
      selection.removeAllRanges();
      ranges.forEach((range) => selection.addRange(range));
    }
  }
}

function deepActiveElement(): HTMLElement | undefined {
  let active: Element | null = document.activeElement;
  while (active?.shadowRoot?.activeElement) active = active.shadowRoot.activeElement;
  return active instanceof HTMLElement ? active : undefined;
}
