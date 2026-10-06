import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchSummaryContent } from '../src/article-summary/shared';

afterEach(() => vi.unstubAllGlobals());

describe('摘要只读接口', () => {
  it('读取走 GET，文章名称编码且不再发送文章写入请求', async () => {
    const content = { success: true, available: true, summaryContent: '摘要正文' };
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => content });
    vi.stubGlobal('fetch', fetchMock);
    expect(await fetchSummaryContent('post/name ?')).toEqual(content);
    expect(fetchMock).toHaveBeenCalledExactlyOnceWith(
      '/apis/api.summary.summaraidgpt.lik.cc/v1alpha1/summaryContent/post%2Fname%20%3F',
    );
  });

  it('HTTP 失败传播给组件，不假装是空摘要', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503, statusText: '不可用' }));
    await expect(fetchSummaryContent('post-1')).rejects.toThrow('HTTP 503');
  });
});
