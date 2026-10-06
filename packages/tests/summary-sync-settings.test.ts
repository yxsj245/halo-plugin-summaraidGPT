import { readFileSync } from 'node:fs';
import { afterEach, describe, expect, it, vi } from 'vitest';

const settings = readFileSync(new URL('../../src/main/resources/extensions/settings.yaml', import.meta.url), 'utf8')
  .replace(/\r\n/g, '\n');
const script = settings.split('              children: |\n')[1].split('            - $el: button')[0]
  .split('\n').map(line => line.replace(/^ {16}/, '')).join('\n');

interface SyncProgress {
  total: number;
  finished: number;
  succeeded: number;
  failed: number;
  skipped: number;
  generated: number;
  written: number;
  running: number;
  taskFailed: number;
}

function prepare(progress: Partial<SyncProgress> = {}) {
  const status = { textContent: '', isConnected: true };
  const button = { disabled: false };
  vi.stubGlobal('document', {
    querySelectorAll: () => [button],
    getElementById: () => status,
  });
  vi.stubGlobal('confirm', vi.fn().mockReturnValue(true));
  const fetchMock = vi.fn()
    .mockResolvedValueOnce({ ok: true, status: 202 })
    .mockResolvedValue({ ok: true, json: async () => ({
      total: 1, finished: 1, succeeded: 1, failed: 0, skipped: 0,
      generated: 0, written: 1, running: 0, taskFailed: 0, ...progress,
    }) });
  vi.stubGlobal('fetch', fetchMock);
  const actions = Function(`${script}; return { syncAllSummary, viewSummarySyncProgress };`)() as {
    syncAllSummary(mode?: string): Promise<void>;
    viewSummarySyncProgress(): Promise<void>;
  };
  return { status, button, fetchMock, actions };
}

afterEach(() => vi.unstubAllGlobals());

describe('设置页摘要同步脚本', () => {
  it('启动后查询进度，到后台结束才显示完成，并恢复按钮', async () => {
    const { status, button, fetchMock, actions } = prepare();
    await actions.syncAllSummary('repair');
    expect(fetchMock.mock.calls[0][0]).toContain('/syncAll?mode=repair');
    expect(fetchMock.mock.calls[1][0]).toContain('/syncProgress');
    expect(status.textContent).toContain('任务完成：');
    expect(status.textContent).toContain('回写 1');
    expect(button.disabled).toBe(false);
  });

  it('有失败时不能提示同步成功', async () => {
    const { status, actions } = prepare({ failed: 1, succeeded: 0, written: 0 });
    await actions.syncAllSummary();
    expect(status.textContent).toContain('任务结束，存在失败');
    expect(status.textContent).toContain('失败 1');
  });

  it('任务级失败即使总数为零也必须提示失败', async () => {
    const { status, actions } = prepare({ taskFailed: 1, total: 0, finished: 0 });
    await actions.syncAllSummary();
    expect(status.textContent).toContain('存在失败');
  });

  it('取消费用确认不发送强制生成请求', async () => {
    const { fetchMock, actions } = prepare();
    vi.stubGlobal('confirm', () => false);
    await actions.syncAllSummary('regenerate');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('已有任务冲突如实提示，不查询或伪报完成', async () => {
    const { status, button, fetchMock, actions } = prepare();
    fetchMock.mockReset().mockResolvedValue({ ok: false, status: 409 });
    await actions.syncAllSummary();
    expect(status.textContent).toContain('已有任务正在运行');
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(button.disabled).toBe(false);
  });

  it('查询按钮的网络错误被处理，不产生未处理异常', async () => {
    const { status, fetchMock, actions } = prepare();
    fetchMock.mockReset().mockRejectedValue(new Error('网络不可用'));
    await actions.viewSummarySyncProgress();
    expect(status.textContent).toContain('查询同步进度失败：网络不可用');
  });
});
