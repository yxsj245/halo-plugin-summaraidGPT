interface SummaryPostState {
  metadata: { annotations?: Record<string, string> };
  spec: { excerpt?: { autoGenerate?: boolean; raw?: string } };
}

/** 图标只表示已有非空摘要回写记录，不把字符串 false 或空摘要当作成功。 */
export function hasWrittenAiSummary(article: SummaryPostState): boolean {
  return article.metadata.annotations?.['summary.lik.cc/ai-summary-updated'] === 'true'
    && article.spec.excerpt?.autoGenerate === false
    && Boolean(article.spec.excerpt.raw?.trim())
}
