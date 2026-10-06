import { describe, expect, it } from 'vitest'
import { hasWrittenAiSummary } from './summary-status'

describe('文章摘要回写图标', () => {
  const state = (flag?: string, raw?: string, autoGenerate = false) => ({
    metadata: { annotations: flag === undefined ? undefined : { 'summary.lik.cc/ai-summary-updated': flag } },
    spec: { excerpt: { autoGenerate, raw } },
  })

  it('只有 true 标记与非空手动模式摘要才显示图标', () => {
    expect(hasWrittenAiSummary(state('true', 'AI 摘要'))).toBe(true)
    expect(hasWrittenAiSummary(state('false', 'AI 摘要'))).toBe(false)
    expect(hasWrittenAiSummary(state(undefined, '手动摘要'))).toBe(false)
    expect(hasWrittenAiSummary(state('true', '   '))).toBe(false)
    expect(hasWrittenAiSummary(state('true', 'AI 摘要', true))).toBe(false)
  })

  it('缺少 excerpt 时不报错也不显示图标', () => {
    expect(hasWrittenAiSummary({ metadata: {}, spec: {} })).toBe(false)
  })
})
