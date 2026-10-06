# AI 设置

配置组：`basic`

AI 设置用于选择模型、控制生成参数，以及保护前台 AI 接口。这里是插件所有 AI 能力的基础配置。

## 使用前提

请先安装并启用 Halo AI Foundation，并在 AI 基座插件中配置可用模型。本插件会通过 AI 基座调用模型，不直接维护模型 API Key。

## 同步摘要

AI 设置页提供三种摘要批量操作，只处理已发布且未删除的文章，不把草稿计入总数：

| 操作 | 行为 | AI 费用 |
| --- | --- | --- |
| 补齐缺失摘要并同步 | 优先复用当前发布版已有摘要并回写；缺失或已过期才生成。 | 仅缺失或已过期文章会调用 AI。 |
| 仅回写已有摘要（不调用AI） | 将已有摘要同步到文章摘要字段；无记录或记录已过期则跳过。 | 不调用 AI。 |
| 强制重新生成摘要 | 重新调用模型生成已发布文章摘要并回写，操作前需确认。 | 会调用 AI。 |

调整模型或角色提示词后，应使用“强制重新生成摘要”，而不是默认补齐。已有摘要存库但没回写时，优先选择“仅回写已有摘要”。

生成和回写由后端完成，不依赖访客打开文章页面。前台仅通过只读接口读取已有摘要，刷新不会修改文章，也不会调用模型。

任务启动后显示已处理、成功、失败、跳过、生成和回写数量；只有后台任务结束才显示完成。一次只允许一个批量任务，重复启动返回冲突。离开设置页面只会停止页面查询，不会取消后台任务。可以重新打开设置页点击“查看同步进度”。

手动摘要、手动保护标记和黑名单均受保护，强制重新生成也不绕过保护。完整升级验证与兼容说明见 [摘要同步修复与使用说明](./summary-sync.md)。

## 模型选择

| 配置项 | 字段 | 说明 |
| --- | --- | --- |
| 主语言模型 | `languageModelName` | 插件默认语言模型。各功能未单独选择模型时会回退到这里。 |
| 摘要语言模型 | `textModelSetting.summaryModelName` | 用于文章摘要生成。 |
| 标签语言模型 | `textModelSetting.tagModelName` | 用于文章标签生成。 |
| 对话语言模型 | `textModelSetting.assistantModelName` | 用于控制台编辑器里的选中文本对话。 |
| 润色语言模型 | `textModelSetting.polishModelName` | 用于文章润色。 |
| 文章生成语言模型 | `textModelSetting.generateModelName` | 用于文章草稿生成。 |
| 标题生成语言模型 | `textModelSetting.titleModelName` | 用于标题候选生成。 |
| 知识库问答语言模型 | `textModelSetting.ragLanguageModelName` | 用于前台 RAG 智能助手和知识库问答。 |

### 配置建议

- 小站点可以只配置主语言模型，让所有功能复用同一个模型。
- 对问答质量要求较高时，建议为 `知识库问答语言模型` 单独选择更强的模型。
- 润色、标题、标签这类短任务可以选择速度更快、成本更低的模型。

## 向量模型

| 配置项 | 字段 | 说明 |
| --- | --- | --- |
| 知识库 Embedding 模型 | `vectorModelSetting.embeddingModelName` | 用于内容向量化和查询向量化。修改后需要重建知识库索引。 |
| 知识库 Rerank 模型 | `vectorModelSetting.rerankModelName` | 用于对混合召回结果精排。未配置或调用失败时会回退到召回顺序。 |

### 注意事项

- 使用 RAG 知识库前必须配置可用的 Embedding 模型。
- 更换 Embedding 模型后，旧向量和新模型不兼容，需要重建索引。
- Rerank 是可选增强项，适合内容较多、搜索结果需要精排的站点。

## 生成配置

| 配置项 | 字段 | 默认值 | 范围 | 说明 |
| --- | --- | --- | --- | --- |
| 标签生成数量 | `generationSetting.tagGenerationCount` | `5` | `1-20` | 每篇文章生成的标签数量。 |
| 最大润色长度 | `generationSetting.polishMaxLength` | `2000` | `100-8000` | 单次润色最大字符数，超过后需要分段润色。 |

## AI 接口安全

| 配置项 | 字段 | 默认值 | 说明 |
| --- | --- | --- | --- |
| 启用 AI 接口防盗链 | `aiSecuritySetting.antiHotlinkEnabled` | `true` | 校验 `Sec-Fetch-Site`、`Origin` 和 `Referer`，只允许本站或白名单来源调用 AI 接口。 |
| AI 助手访问模式 | `aiSecuritySetting.accessMode` | `anonymous_chat_agent` | 控制访客能否对话，以及是否允许 Agent 能力。 |
| 允许缺失来源 | `aiSecuritySetting.allowMissingOrigin` | `false` | 仅在反代、旧浏览器或特殊客户端无法携带来源时开启。 |
| 额外允许的 Origin | `aiSecuritySetting.allowedOrigins` | `[]` | 每项填写完整 Origin，例如 `https://www.example.com`。 |
| 启用 AI 接口限流 | `aiSecuritySetting.rateLimitEnabled` | `true` | 按登录用户名或匿名 IP 限制 AI 接口调用频率。 |
| 窗口内允许请求次数 | `aiSecuritySetting.rateLimitRequests` | `20` | 限流窗口内允许的请求次数。 |
| 限流窗口 | `aiSecuritySetting.rateLimitWindowSeconds` | `60` | 限流窗口时长，单位秒。 |

## 访问模式说明

| 选项 | 值 | 说明 |
| --- | --- | --- |
| 匿名用户可对话 | `anonymous_chat` | 未登录访客可以问答，但不能使用 Agent 工具。 |
| 匿名用户可对话和使用 Agent | `anonymous_chat_agent` | 未登录访客可以问答，也可以使用已开放的 Agent 工具。 |
| 登录用户可对话 | `authenticated_chat` | 只有登录用户可以问答，不能使用 Agent 工具。 |
| 登录用户可对话和使用 Agent | `authenticated_chat_agent` | 只有登录用户可以问答，并允许使用已开放的 Agent 工具。 |

## 安全建议

- 公网站点建议保持防盗链和限流开启。
- 如果站点允许匿名问答，建议降低 `rateLimitRequests` 或关闭高风险 Agent 工具。
- 不建议随意开启 `allowMissingOrigin`，除非确认当前反代链路确实不会传递来源头。
- `allowedOrigins` 只填写可信站点，不要填写不受控的公共域名。
