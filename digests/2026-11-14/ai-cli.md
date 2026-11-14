# AI CLI 工具社区动态日报 2026-11-14

> 生成时间: 2026-11-14 09:55 UTC | 覆盖工具: 9 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Kimi Code CLI](https://github.com/MoonshotAI/kimi-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/badlogic/pi-mono)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [DeepSeek TUI](https://github.com/Hmbown/DeepSeek-TUI)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# AI CLI 工具生态横向对比报告
**日期：2026-11-14｜基于所提供的社区动态摘要**

> **口径说明：**统计为过去 24 小时的更新记录，不等于新增条目数；部分工具仅提供样本。Issue 是用户反馈，不代表官方确认；PR 的 `CLOSED` 不等于已合并，修复提案也不等于已发布。以下定位与趋势判断仅依据本期信号，不构成完整产品能力排名。

## 1. 生态全景

AI CLI 的竞争焦点正在从“支持多少模型、工具和子 Agent”，转向**长任务能否稳定完成，以及成本、权限和执行状态是否可控**。CLI、Desktop、IDE、云端和 Web Shell 的边界逐渐融合，但跨入口的会话状态、权限和插件配置一致性成为共同挑战。MCP 和扩展生态开始面临进程回收、认证、重试、凭据管理等长期运行问题，关注点已不只是“能否连接”。与此同时，Windows、Node 新版本、数据库迁移和发布流水线暴露的兼容性问题表明，基础工程质量正成为规模化采用的重要门槛。

## 2. 各工具活跃度对比

| 工具 | Issues 更新数 | PR 更新数 | Release 情况 | 今日主要信号 |
|---|---:|---:|---|---|
| **Claude Code** | 50；提供 30 条样本 | 0 | **v2.1.325**，含 zstd 解码安全修复 | Agent 配置回归、长任务可靠性、多 Agent 成本 |
| **OpenAI Codex** | 50；提供 30 条样本 | 50；提供 20 条样本 | **0.171.0-alpha.4、alpha.5** 两个预发布版本 | Windows 稳定性、权限解释、云端会话与插件刷新 |
| **Gemini CLI** | 7 | 18 | 无新 Release；Nightly 发布失败，标记 P0 | Node 26 超时兼容、MCP 与扩展安全加固 |
| **GitHub Copilot CLI** | 5 | 2 | **v1.0.111、v1.0.112-0、v1.0.112** 三条发布记录 | 企业权限、错误透明度、模型权益与上下文效率 |
| **Kimi Code CLI** | 0 | 0 | 无活动 | 单日数据不足以判断发展节奏 |
| **OpenCode** | 提供 30 条样本；总量未明 | 提供 20 条样本；总量未明 | 无新 Release | v2 升级、数据库迁移、会话结束与 MCP 生命周期 |
| **Pi** | 15 | 9 | 无新 Release | 工具调用、长会话、大输出与扩展 API |
| **Qwen Code** | 35；提供 30 条样本 | 50；提供 20 条样本 | 无新 Release | CI 修复、ACP、Web Shell 与企业自动化 |
| **DeepSeek TUI†** | 0 | 11 | 无新 Release | 10 条依赖维护 PR，1 条 Synap 接入 PR |

† **归属核验：**DeepSeek TUI 提供的 PR 实际指向 `codewhale-hq/Codewhale`，不能直接归为 DeepSeek TUI 的开发成果。Pi 来源标注为 `badlogic/pi-mono`，条目则指向 `earendil-works/pi`，同样需核实仓库关系。

**直接观察：**在统计口径明确的工具中，Codex 和 Qwen Code 的 PR 更新量最高，均为 **50 条**；Claude Code 与 Codex 的 Issue 更新量均为 **50 条**。但公开仓库的用途与代码开放范围不同，不能将 PR 数直接等同于研发投入。

## 3. 共同关注的功能方向

| 共同方向 | 涉及工具 | 具体诉求与证据 |
|---|---|---|
| **长任务可观测、可终止、可恢复** | Claude Code、Codex、OpenCode、Pi、Qwen Code | Claude 请求后台任务时间与活跃度；Codex 出现历史恢复 panic；OpenCode 报告等待接口挂起；Pi 暴露超长会话加载边界；Qwen ACP 长时间运行后无法推理 |
| **成本与有效上下文透明度** | Claude Code、Codex、Copilot CLI、OpenCode、Pi | 多 Agent 额度耗尽、短任务高消耗、固定上下文增加、剩余额度查询，以及工具输出限额配置 |
| **权限与凭据管理** | Codex、Gemini CLI、Copilot CLI、OpenCode、Qwen Code | 拒绝原因与授权路径、MCP 命令权限检查、企业正则策略、原生密钥引用、运维策略与工作区设置的优先级 |
| **配置与实际执行一致** | Claude Code、Codex、OpenCode、Qwen Code、Pi | `effort` 被忽略、技能初始化缺失、Ollama 上下文被覆盖、模型能力映射错误、自定义模型分类不准确 |
| **MCP 与扩展生命周期治理** | Gemini CLI、Copilot CLI、OpenCode、Codex | 执行目标可信性、OAuth 登录兼容、进程泄漏与重试风暴、插件和技能目录刷新 |
| **升级、运行时与交付可靠性** | Gemini CLI、OpenCode、Qwen Code、Codex、Pi | Node 26 超时、Windows 更新与启动、数据库迁移、CI 路由、依赖安全更新 |

这些需求的共同点是：**用户需要的不只是“能力存在”，而是能够验证能力何时生效、消耗多少、为何失败，以及如何恢复。**

## 4. 差异化定位分析

以下是本期动态反映的侧重，不代表各工具的全部定位。

| 工具 | 功能侧重与潜在目标用户 | 技术路线信号 |
|---|---|---|
| **Claude Code** | 复杂编码、多 Agent 协作和长期任务；适合重度 Agent 用户与团队工作流 | Agent 配置、Skills、插件及 Desktop/worktree 联动；当前挑战偏向约束执行与预算控制 |
| **Codex** | 本地、云端、桌面和远程环境的一体化任务执行；面向跨环境开发者及宿主集成方 | 按环境表达权限、云目录刷新、实时历史持久化；强调跨入口状态协调 |
| **Gemini CLI** | CLI 自动化、扩展与 MCP；适合重视脚本集成和执行策略的用户 | Node/Undici 请求链路、命令权限校验、安全正则与退出码规范化 |
| **Copilot CLI** | 企业策略管理、远程会话和订阅模型使用；适合 GitHub 企业用户 | 托管权限规则、临时会话授权、提供商错误透传及成本建议 |
| **OpenCode** | 多 Provider、本地模型与高度可配置工作流；适合希望自主选择模型和部署方式的用户 | Ollama/Bedrock 兼容、MCP 管理和 v2 状态迁移；灵活性伴随兼容治理成本 |
| **Pi** | 可扩展 Agent 内核、RPC 和嵌入式集成；适合扩展作者及工具构建者 | 事件处理器、工具 schema、消息生命周期和输出控制等底层语义 |
| **Qwen Code** | Web Shell、多工作区、ACP 与企业消息自动化；适合平台集成和团队协作 | 托管 worktree、共享执行循环、daemon 状态监听与企业渠道投递 |
| **Kimi Code CLI** | 本期无足够信号 | 无法据单日无活动判断定位或维护状态 |
| **DeepSeek TUI** | 本期无法可靠归因 | 所给实际仓库记录体现 Rust 依赖维护与兼容服务接入，需先核实归属 |

**核心差别：**Claude Code、Codex 更突出复杂任务与多入口协同；Gemini CLI、Pi 的本期信号更偏执行底层与扩展机制；Qwen Code 明显向 Web 工作台和企业自动化延伸；OpenCode 强调 Provider 灵活性；Copilot CLI 更突出企业策略和账户权益衔接。

## 5. 社区热度与成熟度

### 活跃度高，但讨论深度仍有限

- **Codex、Qwen Code**：公开 PR 更新最密集，同时覆盖功能扩展与基础设施修复，是本期快速迭代信号最明确的两项。
- **Claude Code**：Issue 更新量高，集中暴露复杂 Agent 工作流的可靠性问题；公开 PR 为零不能推断内部开发停滞。
- **OpenCode**：样本覆盖升级、MCP、多 Provider 和无障碍，讨论面较广；但总更新量未明，不宜硬性排名。
- **Gemini CLI、Pi**：更新量较小，但技术议题具体，偏向运行时、安全和扩展机制。
- **Copilot CLI**：Issue、PR 数不高，发布记录较密集，显示其迭代节奏不能只通过 PR 数观察。

**更新量并不等于社区共识。**例如 Claude Code 样本最高仅 2 条评论，Codex 为 3 条，多数条目为零点赞；部分同类请求还来自同一作者，不能当作独立用户需求累加。

### 成熟度更应按维度判断

| 维度 | 本期信号 | 判断边界 |
|---|---|---|
| **治理与安全机制** | 安全补丁、最小权限、凭据管理、错误追踪持续增加 | 表明治理议题深入，不代表风险已消除 |
| **跨环境产品化** | 云端、Desktop、Web Shell、远程会话持续扩展 | 接口更多，也带来状态与权限一致性负担 |
| **快速演进阶段** | Codex alpha、OpenCode v2 迁移、Qwen Web Shell/ACP 扩展 | 宜采用灰度验证，而非直接全量升级 |
| **运行成熟度不足之处** | 挂起、恢复失败、迁移冲突、配置静默失效跨工具出现 | 无人值守工作流仍需外部监控和回滚机制 |

因此，本期数据更适合识别**各工具的风险面和工程重心**，不足以给出单一的“最成熟工具”排名。

## 6. 值得关注的趋势信号

### ① Agent 评估将从单次效果转向端到端可靠性

多个社区同时出现“已消耗额度却未交付”“工具成功退出却无输出”“会话无法结束”等反馈。  
**开发者参考：**评测应纳入任务完成率、恢复成功率、超时率和单位成功任务成本，而不只比较生成质量或吞吐量。

### ② 多 Agent 需要预算管理，而不只是并行编排

Claude 的高 token 消耗、Codex 的额度透明度争议，以及 Copilot 的模型权益不匹配，反映了三个不同层面：预算、计量和可用性。  
**开发者参考：**设置并发、工具调用和 token 上限，采用阶段验收；执行前检查模型权益，避免运行中才发现不可用。

### ③ 权限必须随执行环境明确表达

Codex 的环境权限上下文、Gemini 的 MCP 执行目标校验、Qwen 的信任策略讨论，共同表明“一次授权、到处适用”的方式难以覆盖复杂环境。  
**开发者参考：**分别管理本地、容器、云端和远程环境权限，并要求错误信息说明拒绝原因及申请路径。

### ④ MCP 正从接入问题转向运行治理问题

进程泄漏、重试风暴、登录阻塞、凭据轮换和命令权限成为共同议题。  
**开发者参考：**将 MCP 服务作为长期运行组件管理，配置健康检查、退避重试、进程清理及凭据生命周期策略。

### ⑤ 有效上下文与状态管理比标称窗口更重要

Copilot 的固定开销反馈、OpenCode 的上下文配置覆盖、Pi 的超长会话加载问题表明，大窗口不自动等于可靠的长期记忆。  
**开发者参考：**同时测量系统提示开销、工具输出占比、压缩频率和历史恢复能力，并把关键任务状态保存到会话之外。

### ⑥ 发布与迁移质量正在成为选型因素

安全更新、Windows 自更新、数据库迁移、Nightly 和 CI 失败，直接影响工具能否稳定进入日常生产流程。  
**开发者参考：**将版本固定、数据备份、回滚能力及真实工作流回归纳入采购和升级标准。

---

## 结论

**本期最明确的行业信号是：AI CLI 正从“功能扩张”进入“运行治理”阶段。**对技术决策者而言，应优先验证目标工具在自身环境中的任务完成、权限解释、用量核对和故障恢复能力；对开发者而言，多 Agent、MCP 和长会话工作流都应配套预算、超时、检查点与回滚机制，不能仅依赖模型自身维持执行秩序。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-11-14｜基于所提供的 20 条 PR、15 条 Issue**

> **数据口径：**PR 评论数均为 `undefined`、👍 均为 0，因此无法核实“按评论数排序”的热度，也无法判断哪些 PR 评论活跃。以下按**关联 Issue 热度、影响范围及最近更新情况**整理关注清单，不代表真实评论排名。所有展示 PR 均为 **OPEN**，尚不能视为官方已上线能力。

## 1. 热门 Skills 排行：8 个重点关注 PR

| 关注顺序 | Skill / PR | 功能与社区关注点 | 当前状态 |
|---|---|---|---|
| 1 | **skill-creator** · [#1298](https://github.com/anthropics/skills/pull/1298) | 改进 Skill 触发评测，处理并发隔离、Windows 子进程与运行失败。相关 Issues 分别有 13、6 条评论，核心痛点是**评测得到近零触发率，无法可靠判断 Skill 是否有效**。 | **OPEN**；9 月 16 日更新 |
| 2 | **mcp-builder** · [#1742](https://github.com/anthropics/skills/pull/1742) | 适配 MCP ≥2 的 `streamable_http_client` 导入方式及自定义 HTTP headers。重点是**依赖升级后连接脚本的兼容性**，而非新增业务能力。 | **OPEN**；10 月 8 日更新 |
| 3 | **docx** · [#1792](https://github.com/anthropics/skills/pull/1792) | 修复接受修订时 LibreOffice 超时仍报告成功的问题，并检查输出是否仍有修订标记。体现文档工作流对**真实成功、输出验证和文件完整性**的要求。 | **OPEN**；11 月 1 日更新 |
| 4 | **webapp-testing** · [#1980](https://github.com/anthropics/skills/pull/1980) | 调整测试服务器启动方式，避免使用 `shell=True`。关注点是 Agent 执行命令时的**命令注入风险与安全边界**；风险描述来自 PR，不能据此认定已获官方确认。 | **OPEN**；11 月 1 日更新 |
| 5 | **xlsx** · [#2019](https://github.com/anthropics/skills/pull/2019) | 改进外部链接风险检测，覆盖工作表级命名区域与间接别名引用。重点是减少**复杂 Excel 文件的风险漏报**。 | **OPEN**；11 月 3 日更新 |
| 6 | **notion-spec-to-implementation 等** · [#1245](https://github.com/anthropics/skills/pull/1245) | 将 Notion 产品/技术规格拆成实施任务、验收标准和进度跟踪；同一 PR 还包含简历审计 Skill。代表**规格到开发任务的工作流自动化**方向，但不能把关注度归因于其中单个 Skill。 | **OPEN**；10 月 15 日更新 |
| 7 | **Pyxel 游戏开发** · [#525](https://github.com/anthropics/skills/pull/525) | 支持 Python 复古游戏开发、调试及验证，包含无头运行、输入驱动测试和画面检查。亮点是把**生成—运行—验证**串成闭环。 | **OPEN**；11 月 1 日更新，3 月创建 |
| 8 | **md2video-audio** · [#1703](https://github.com/anthropics/skills/pull/1703) | 将 Markdown 经幻灯片流程转换为带配音的 MP4。代表**文档向多媒体内容复用**的扩展方向；“零成本”“专业级”等属于提交者描述，尚非验证结论。 | **OPEN**；9 月 15 日更新 |

**总体判断：**这批样本中，最明确的需求信号来自现有 Skills 的可靠性、安全性与兼容性修复，而不是新 Skill 数量增长。

## 2. 社区需求趋势

### ① 可信分发与组织级复用，比新增业务 Skill 更紧迫
- **来源与权限边界：**[#492](https://github.com/anthropics/skills/issues/492) 有 **46 条评论、3 个赞**，是所展示 Issues 中讨论最多的一项。用户担忧社区 Skill 借官方命名空间造成来源混淆和权限误授。
- **组织共享：**[#228](https://github.com/anthropics/skills/issues/228) 有 **17 条评论、8 个赞**，期待共享库或分享链接，取代手动传递 `.skill` 文件。该需求针对 Claude.ai，属于跨产品分发能力，而非 Claude Code 新 Skill 本身。

### ② Skill 创建与触发评测，需要可信的工程工具链
- [#556](https://github.com/anthropics/skills/issues/556)（**13 评论、7 赞**）与 [#1352](https://github.com/anthropics/skills/issues/1352)（**6 评论、3 赞**）集中反映触发率异常、并发评测假阴性。
- 用户期待的不只是“帮助写 Skill”，而是**能正确测试、定位失败并支持持续优化**的创建工具链。触发描述规范也受到关注，见 [theme-factory #2064](https://github.com/anthropics/skills/issues/2064)。

### ③ 长任务记忆与上下文效率，是清晰的新能力方向
- [compact-memory #1329](https://github.com/anthropics/skills/issues/1329)（**10 评论**）提出用紧凑符号表示 Agent 状态，降低长期任务中的记忆开销。
- [claude-api #1487](https://github.com/anthropics/skills/issues/1487) 报告一次加载约 156k tokens；[重复安装 #189](https://github.com/anthropics/skills/issues/189) 获 **9 个赞**。这些信号指向**按需加载、去重和上下文预算管理**。

### ④ 审查与交付验证，正从单点工具走向完整流程
- [质量门禁提案 #1385](https://github.com/anthropics/skills/issues/1385)（**7 评论**）提出任务前校准、对抗审查和交付验证。
- [agent-governance #412](https://github.com/anthropics/skills/issues/412)（**6 评论，已关闭**）讨论策略执行、威胁检测与审计轨迹。它表明存在治理需求，但**关闭不等于已实现或合并**。

### ⑤ 文档方向更强调“不损坏”和“可验证”
- [docx XML 问题 #2018](https://github.com/anthropics/skills/issues/2018) 报告合并文本片段可能生成无效 XML，直接影响文档完整性。
- 结合文档相关 PR，需求重点是**结构保真、错误显式报告和结果校验**，而不只是生成内容。

**边界判断：**仅凭本批 Issues，不能认定“代码审查”或“测试生成”已成为最热门的新 Skill 类别；现有证据更偏向评测、治理、记忆和分发基础设施。

## 3. 高潜力待合并 Skills / 改进

**无法确认“评论活跃”或预测近期合并。**以下是按需求明确性、修复范围和近期维护信号筛选的优先跟踪项：

| PR | 值得跟踪的理由 | 落地判断边界 |
|---|---|---|
| **[skill-creator #1298](https://github.com/anthropics/skills/pull/1298)** | 对应多条高讨论度评测问题，修复后可改善其他 Skills 的开发与验证。 | 需求价值高，但最后更新在 9 月，不能推断即将合并。 |
| **[xlsx #2019](https://github.com/anthropics/skills/pull/2019)** | 修复目标具体，关联 #2013；11 月 3 日仍有更新。 | 适合持续跟踪，缺少审查与 CI 数据。 |
| **[docx #1792](https://github.com/anthropics/skills/pull/1792)** | 从“脚本退出”转向“验证实际输出”，可减少静默失败；11 月 1 日更新。 | 属于明确的可靠性改进，尚未合并。 |
| **[webapp-testing #1980](https://github.com/anthropics/skills/pull/1980)** | 涉及命令执行安全，潜在影响重要；11 月 1 日更新。 | 应关注替代实现是否兼容原有命令链用法。 |
| **[Pyxel #525](https://github.com/anthropics/skills/pull/525)** | 新 Skill 中工作流较完整，长期开放后仍于 11 月更新。 | 有持续维护信号，但长时间开放不代表进入合并阶段。 |

## 4. Skills 生态洞察

**当前社区最集中的诉求，是让 Skills 从“能安装、能生成”走向“来源可信、触发可测、执行安全、结果可验证”的可靠工作流基础设施。**——代表信号见 [信任边界 #492](https://github.com/anthropics/skills/issues/492)、[触发评测 #556](https://github.com/anthropics/skills/issues/556) 与 [文档验证 #1792](https://github.com/anthropics/skills/pull/1792)。

---

# Claude Code 社区动态日报｜2026-11-14

> 数据来源：[anthropics/claude-code](https://github.com/anthropics/claude-code)。过去 24 小时有 50 条 Issue 更新，以下分析基于提供的 30 条样本；PR 更新为 0 条。Issue 中的故障与模型行为描述均为用户反馈，不代表官方已确认。

## 1. 今日速览

Claude Code 发布 **v2.1.325**，修复 zstd 压缩响应解码中的安全问题，是今日最值得优先关注的更新。社区反馈主要集中在 **Agent 配置回归、长时间任务可靠性、多 Agent 成本控制，以及 Desktop 跨会话状态一致性**。当前讨论仍处早期：展示的 Issue 均为 OPEN，最高评论数为 2，尚不足以判断问题的普遍程度。

## 2. 版本发布

### [v2.1.325](https://github.com/anthropics/claude-code/releases/tag/v2.1.325)

- **安全修复**：修复 zstd 压缩响应解码中的安全问题。所给发布说明未提供漏洞影响范围、严重级别或利用条件，建议优先评估升级。
- **Notebook 使用提示**：在 VS Code 等集成终端中，Claude 读取或编辑 Jupyter Notebook 后，增加重新运行单元格的 spinner 提示。
- **其他错误提示调整**：发布说明第三项在组织相关错误提示处被截断，无法准确总结。

**建议**：升级后重点回归 Agent 配置、SDK 错误追踪及常用 Desktop 工作流；目前没有证据表明下述 Issue 已被本版本修复。

## 3. 社区热点 Issues

以下按潜在影响、可复现性及开发工作流相关性筛选，而非仅按评论数排序。

| Issue | 反馈内容与重要性 | 社区反应 |
|---|---|---|
| [#109779：`--agent` 忽略 frontmatter 中的 `effort`](https://github.com/anthropics/claude-code/issues/109779) | 用户报告自 2.1.322 起，以 `claude --agent <name>` 启动的主线程不再应用 Agent 的推理强度配置。影响配置可预测性与团队工作流一致性，标记为回归且有复现。 | **2 评论、0 👍**，为样本中评论最多的条目。 |
| [#109799：多 Agent 工作流耗尽额度且未交付结果](https://github.com/anthropics/claude-code/issues/109799) | 报告称单次会话执行四轮 Workflow，涉及 36 个子 Agent、约 3,100 次工具调用和约 1,320 万子 Agent tokens；最后一轮约 446 万 tokens 未返回结果。凸显并行扩展的预算与产出控制风险。 | **0 评论、0 👍**；数据来自单个用户报告，尚无独立验证。 |
| [#109798：长期协调会话反复遗漏任务](https://github.com/anthropics/claude-code/issues/109798) | 用户描述持续一个月的协调会话在语言约束、任务跟踪等方面反复出错。对长期自主执行与多会话协调的可靠性具有参考价值，但不能据此认定模型能力被下调。 | **1 评论、0 👍**。 |
| [#109811：跨模型指令遵循问题的后续反馈](https://github.com/anthropics/claude-code/issues/109811) | 报告称规则、Skills 和流程被读取后仍遭违反，并涉及多个模型。核心诉求是让已加载约束真正转化为稳定执行行为。 | 本条 **0 评论、0 👍**；作者称原帖 #105477 有 19 👍、另有 3 位用户补充案例，属其转述。 |
| [#109815：回收 worktree 后恢复线程失败](https://github.com/anthropics/claude-code/issues/109815) | Windows Desktop 用户报告，重建的 worktree 未获得工作区信任，导致 `spawn_failed`。这类问题直接阻断历史任务恢复，涉及权限与工作区生命周期衔接。 | **0 评论、0 👍**，尚待进一步确认。 |
| [#109796：远程会话重命名未同步到可寻址名称](https://github.com/anthropics/claude-code/issues/109796) | 从另一台机器重命名会话后，侧栏名称更新，但其他会话仍无法按新名称访问。影响跨机器、多会话协调；已标记有复现。 | **1 评论、0 👍**。 |
| [#109793：插件快捷键冲突与绘制顺序回归](https://github.com/anthropics/claude-code/issues/109793) | 两个插件使用相同快捷键时，后绘制者获胜，插件又无法声明优先级。涉及 2.1.296 至 2.1.323 间的行为变化，影响插件组合的确定性。 | **1 评论、0 👍**，带回归及复现标签。 |
| [#109805：失败请求缺少 journal `requestRef`](https://github.com/anthropics/claude-code/issues/109805) | 在 Claude Code 2.1.325、Agent SDK 0.3.325 环境下，用户通过合成端点复现失败请求关联标识缺失。影响错误追踪和请求级诊断。 | **0 评论、0 👍**，已有复现。 |
| [#109801：云端会话 Git LFS 认证失败](https://github.com/anthropics/claude-code/issues/109801) | 当仓库配置 `lfs.<endpoint>.access = basic` 时，Git LFS 网络请求报凭据缺失。可能阻断依赖大文件资产的云端开发流程。 | **0 评论、0 👍**，已有复现。 |
| [#109809：后台任务缺乏时间与活跃度信息](https://github.com/anthropics/claude-code/issues/109809) | 请求展示开始时间、运行时长和最后输出时间，避免把挂起数小时的任务误判为正常等待。对无人值守任务和上下文压缩后的状态恢复尤其重要。 | **0 评论、0 👍**；属于增强需求，而非已确认缺陷。 |

## 4. 重要 PR 进展

**过去 24 小时没有 PR 更新，无法列出 10 个重要 PR。** 本次数据也未提供上述 Issue 对应的修复 PR，因此不能据此判断其实现或合并进度。

入口：[仓库 Pull Requests](https://github.com/anthropics/claude-code/pulls)

## 5. 功能需求趋势

### ① 长任务可观测性与执行控制
社区需要的不只是“让任务持续运行”，还包括知道任务是否仍有进展、消耗了多少预算、何时应停止。后台任务时间信息与多 Agent 额度耗尽报告共同指向这一方向。  
相关：[任务状态信息 #109809](https://github.com/anthropics/claude-code/issues/109809) · [成本控制反馈 #109799](https://github.com/anthropics/claude-code/issues/109799)

### ② 跨设备、跨会话的一致性
远程会话命名、Projects 与现有项目的关系，以及账号切换体验，反映出用户希望统一管理分散在不同入口中的工作状态。  
相关：[远程命名 #109796](https://github.com/anthropics/claude-code/issues/109796) · [Projects 体验 #109806](https://github.com/anthropics/claude-code/issues/109806)

### ③ 更细粒度的权限与账号管理
需求从“能否连接”转向“哪些设备、哪些站点可以使用，以及使用多少”；同时仍有修改账号邮箱等基础管理诉求。  
相关：[设备与站点限制 #109797](https://github.com/anthropics/claude-code/issues/109797) · [修改账号邮箱 #109819](https://github.com/anthropics/claude-code/issues/109819)

### ④ IDE 内闭环与界面可访问性
用户希望在 VS Code 内直接查看发布的 artifacts，并通过更明显的侧栏状态提示识别会话进展，减少切换与辨识成本。  
相关：[VS Code artifacts 编辑器页签 #109808](https://github.com/anthropics/claude-code/issues/109808) · [侧栏状态高亮 #109792](https://github.com/anthropics/claude-code/issues/109792)

## 6. 开发者关注点

- **配置必须可验证地生效**：`effort` 被忽略、插件快捷键优先级不可控，都削弱了自动化环境的确定性。建议升级测试加入配置生效与插件组合检查。  
  [#109779](https://github.com/anthropics/claude-code/issues/109779) · [#109793](https://github.com/anthropics/claude-code/issues/109793)

- **指令遵循比单次回答质量更关键**：样本中有多条重复提问、忽略约束及语言漂移反馈。其中 Fable 5.2 的五条报告来自同一作者，不能按五个独立用户事件解读。  
  [#109812](https://github.com/anthropics/claude-code/issues/109812) · [#109820](https://github.com/anthropics/claude-code/issues/109820) · [#109810](https://github.com/anthropics/claude-code/issues/109810)

- **自主执行需要预算与进度护栏**：针对长时间、多 Agent 任务，开发者可考虑分阶段验收、并发限制和外部超时监控；这些是风险控制建议，并非本次发布新增功能。  
  [#109799](https://github.com/anthropics/claude-code/issues/109799) · [#109809](https://github.com/anthropics/claude-code/issues/109809)

- **恢复与排障路径仍有薄弱点**：worktree 信任恢复、失败请求追踪和云端 LFS 凭据问题说明，异常路径与正常执行路径同样需要回归覆盖。  
  [#109815](https://github.com/anthropics/claude-code/issues/109815) · [#109805](https://github.com/anthropics/claude-code/issues/109805) · [#109801](https://github.com/anthropics/claude-code/issues/109801)

**今日判断：**在所给样本中，社区关注点更偏向“可控、可观测、可恢复”，而非单纯扩展能力。短期应优先评估安全更新，并为高成本、长时间运行的 Agent 工作流增加验证与止损机制。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-11-14｜数据来源：[openai/codex](https://github.com/openai/codex)**

> 统计口径：过去 24 小时共有 50 条 Issue、50 条 PR 更新；本日报基于所提供的 30 条 Issue 和 20 条 PR 摘要筛选。Issue 反馈不等于官方确认；`CLOSED` 不代表问题已修复或 PR 已合并。

## 1. 今日速览

Codex 过去 24 小时发布了 **0.171.0-alpha.4、alpha.5 两个预发布版本**，但提供的发布说明未披露具体变更。社区反馈主要集中在 **Windows 桌面稳定性与权限限制、CLI 会话可靠性，以及额度消耗和模型归属的透明度**。

代码侧的重点则是云端会话切换、插件与技能目录刷新、实时历史持久化及权限上下文表达；这些 PR 均显示为关闭，是否合并及进入哪个版本仍需进一步核实。

## 2. 版本发布

| 版本 | 发布说明与关注点 |
|---|---|
| [rust-v0.171.0-alpha.5](https://github.com/openai/codex/releases/tag/rust-v0.171.0-alpha.5) | 预发布版本；说明仅包含版本号，无法据此确认新增功能或修复范围。 |
| [rust-v0.171.0-alpha.4](https://github.com/openai/codex/releases/tag/rust-v0.171.0-alpha.4) | 预发布版本；同样未提供具体变更清单。 |

**升级建议：** 不宜仅凭版本号判断下述问题已修复；生产工作流升级前应重点回归会话恢复、插件发现和工具执行权限。

## 3. 社区热点 Issues

所选条目的讨论量为 **0–3 条评论，均为 0 个 👍**；以下按影响范围、阻断程度和技术价值排序，而非认定为已形成社区共识。

| Issue | 主要反馈与重要性 | 状态 / 社区反应 |
|---|---|---|
| [#61476 特定账号触发 Windows 启动死锁](https://github.com/openai/codex/issues/61476) | 报告称某个账号登录后可稳定复现主进程死锁，直接阻断应用使用；账号相关触发条件值得排查。 | **已关闭，3 条评论**；展示样本中评论最多，但未提供关闭原因。 |
| [#61460 Windows 启动后持续无响应](https://github.com/openai/codex/issues/61460) | 用户报告应用每次启动约 20–40 秒后永久无响应，已尝试的 renderer/app-server 相关规避方法无效。属于基础可用性问题。 | **开放，1 条评论**；尚无已验证解决方案。 |
| [#61496 已授权清理操作仍被策略阻止](https://github.com/openai/codex/issues/61496) | Windows 原生 PowerShell 清理操作在进程创建前被拒绝，且缺少可操作的理由，暴露权限诊断与错误解释不足。 | **开放，1 条评论**。 |
| [#61459 Dot 无法控制已连接的 Windows VM](https://github.com/openai/codex/issues/61459) | `GetCursorPos` 返回访问拒绝；同一 VM 在另一 ChatGPT Work 会话中可控制浏览器，提示需核对不同入口的执行权限。 | **开放，2 条评论**。 |
| [#61450 macOS Dot 主聊天缺少内部 DNS 与进程检查能力](https://github.com/openai/codex/issues/61450) | 同一 Mac 上独立 Codex 任务可以访问内部服务，但 Dot 主聊天不能；企业环境需要明确沙箱边界及受限授权路径。 | **开放，2 条评论**。 |
| [#61471 单次任务迅速耗尽额度](https://github.com/openai/codex/issues/61471) | 用户称 7 分 33 秒任务耗尽五小时额度，且本地工具记录的模型归属与界面选择不同。关系到成本预期与计量透明度。 | **开放，1 条评论**；本地捕获结果不能单独证明实际模型路由。 |
| [#61489 zstd 高压缩比请求触发 HTTP 400](https://github.com/openai/codex/issues/61489) | 报告称请求体压缩比超过约 110 倍时后端返回 `Bad Request`，值得关注压缩请求的兼容性和错误可诊断性。 | **开放，1 条评论**；阈值来自用户报告。 |
| [#61491 CLI 恢复历史时发生 panic](https://github.com/openai/codex/issues/61491) | CLI 0.169.0 在历史分页加载中出现切片范围错误，影响长会话恢复和工作连续性。 | **开放，0 条评论**；暂无公开讨论反馈。 |
| [#61485 新建 exec 会话经常缺失远程插件技能](https://github.com/openai/codex/issues/61485) | 用户报告约 90% 的新会话未列出账号插件技能，并将其归因于技能快照早于远程同步完成；影响自动化执行的一致性。 | **开放，0 条评论**；复现比例及根因尚待验证。 |
| [#61479 Linux TUI 读取输入可能停在 1,024 字节后](https://github.com/openai/codex/issues/61479) | 报告将问题关联到 crossterm 边沿触发就绪事件处理，并指出多个版本使用同一受影响修订，值得终端集成开发者关注。 | **开放，0 条评论**；跨版本影响范围仍需维护者确认。 |

## 4. 重要 PR 进展

**以下 10 条 PR 均显示为 `CLOSED`；数据未提供合并标记，不能视为已交付功能。评论字段为 `undefined`，不据此评估讨论热度。**

| PR | 功能或修复内容及意义 |
|---|---|
| [#61494 按环境描述上下文与权限](https://github.com/openai/codex/pull/61494) | 增加默认关闭的 `per_environment_context` 功能开关，让上下文能够表达不同环境各自的文件系统与网络权限，减少仅描述主环境造成的歧义。 |
| [#61490 云任务切换就绪前保留当前任务](https://github.com/openai/codex/pull/61490) | 先准备目标任务历史，再提交切换；避免加载失败时破坏当前聊天、草稿和回复流。 |
| [#61488 加固 Git remote 收集与元数据限制](https://github.com/openai/codex/pull/61488) | 改用 NUL 分隔的 fetch URL 读取方式，避免误解析部分克隆信息，并限制远程 URL 元数据，防止触及 API 长度上限。 |
| [#61486 归档线程只读与 TUI 取消归档](https://github.com/openai/codex/pull/61486) | 归档线程冻结输入，同时保留已缓存记录和草稿；支持按 `U` 取消归档并继续会话。 |
| [#61480 为持久化实时历史添加快照分页](https://github.com/openai/codex/pull/61480) | 增加实验性 `thread/realtime/list`，独立于 turn 分页和实时运行时读取历史，支持会话、观测时间和事件 ID 筛选。 |
| [#61473 完成确认前持久化带时间戳的实时帧](https://github.com/openai/codex/pull/61473) | 为符合条件的线程记录 `voice_transcript` 通道的 frame，并保留旧转录兼容路径，强化实时记录持久化。 |
| [#61449 在 turn 接入前显式刷新云目录](https://github.com/openai/codex/pull/61449) | 提供 `CodexThread::refresh_cloud_plugins()` 及独立于 turn 的扩展回调，让宿主无需启动推理即可刷新插件和技能目录。 |
| [#61429 在步骤准备阶段刷新云插件与技能](https://github.com/openai/codex/pull/61429) | 使不包含 connector 工具的插件安装也能更新技能目录。与 #61485 反馈方向相关，但不能据此认定该问题已解决。 |
| [#61428 Portals TCP 隧道要求 OAuth CONNECT 元数据](https://github.com/openai/codex/pull/61428) | 连接已知 Portals 网关时要求 `x-portals-auth-mode: oauth`，在读取凭据前拒绝缺失或非 OAuth 元数据，强化认证边界。 |
| [#61426 Amazon Bedrock 默认启用增量工具](https://github.com/openai/codex/pull/61426) | 为两个 Bedrock provider 默认启用 `incremental_tools_legacy`，通过 `additional_tools` 输入项发布工具声明，并保留显式关闭选项。 |

## 5. 功能需求趋势

### ① 多智能体需要更清晰的组织与通信能力
需求从“创建子聊天”延伸到可折叠父子层级、经授权的跨聊天通信，以及把新云聊天直接放入既有项目。三条请求来自同一作者，更适合作为完整工作流诉求，而非广泛共识。  
相关：[层级展示 #61456](https://github.com/openai/codex/issues/61456) · [同级通信 #61455](https://github.com/openai/codex/issues/61455) · [项目归属 #61454](https://github.com/openai/codex/issues/61454)

### ② 权限边界需要可解释、可申请
用户不仅希望工具能够运行，也希望知道为何被拒绝、不同执行入口有何差异，以及如何申请最小范围权限。  
相关：[#61496](https://github.com/openai/codex/issues/61496) · [#61450](https://github.com/openai/codex/issues/61450) · [#61451](https://github.com/openai/codex/issues/61451)

### ③ 模型与额度计量需要更透明
多条反馈涉及模型用量归属、短任务高消耗，以及不同调用方式下额度限制表现不一致。核心需求是可核对的用量解释，而不只是提高额度。  
相关：[#61493](https://github.com/openai/codex/issues/61493) · [#61471](https://github.com/openai/codex/issues/61471) · [#61487](https://github.com/openai/codex/issues/61487)

### ④ 远程操作需要补齐安全交互
移动端配置 MCP 时，用户希望有私密凭据输入入口；Windows 聊天创建原生计划任务的能力也被要求与其他入口保持一致。  
相关：[私密凭据输入 #61448](https://github.com/openai/codex/issues/61448) · [计划任务创建 #61495](https://github.com/openai/codex/issues/61495)

### ⑤ 功能不可用时，应直接解释原因
图像生成报错被反馈为过于笼统，导致不必要的重启、登录和版本排查。用户希望明确区分套餐限制、环境限制与真实故障。  
相关：[#61468](https://github.com/openai/codex/issues/61468)

## 6. 开发者关注点

- **优先保障基本工作流可用。** 启动死锁、持续无响应与本地工作启动失败，会直接阻断开发任务。相关：[#61476](https://github.com/openai/codex/issues/61476)、[#61460](https://github.com/openai/codex/issues/61460)、[#61492](https://github.com/openai/codex/issues/61492)。
- **会话连续性仍需重点回归。** CLI 恢复崩溃、浏览器被判属于其他任务，以及跨 provider 写入冲突，都涉及状态恢复或会话归属。相关：[#61491](https://github.com/openai/codex/issues/61491)、[#61464](https://github.com/openai/codex/issues/61464)、[#61453](https://github.com/openai/codex/issues/61453)。
- **自动化需要确定性的初始化与执行。** 插件技能偶发缺失、请求压缩触发错误，都会让相同脚本在不同会话中表现不一致。相关：[#61485](https://github.com/openai/codex/issues/61485)、[#61489](https://github.com/openai/codex/issues/61489)。
- **交互问题可能波及其他应用。** Windows 抢占键盘焦点、macOS 听写及麦克风异常，不只影响 Codex 内部体验，也可能打断桌面工作流。相关：[#61466](https://github.com/openai/codex/issues/61466)、[#61484](https://github.com/openai/codex/issues/61484)。

**今日判断：** 展示样本中的核心诉求并非单纯增加工具，而是让已有能力具备更高的稳定性、跨入口一致性，以及可解释的权限和用量行为。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-11-14**  
**数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)**｜过去 24 小时更新：7 条 Issues、18 条 PR

## 1. 今日速览

今日最值得关注的是 **Nightly 发布失败**，相关 Issue 已标记为 `priority/p0`；过去 24 小时没有新 Release。开发工作主要集中在 **Node 26 请求超时兼容、安全边界加固和 Agent 执行可靠性**，包括全局调度器修复、MCP 命令权限检查及工具调用历史一致性修复。

以下重点修复 PR 均仍处于 **OPEN** 状态，不能视为已合入或已发布。

## 2. 社区热点 Issues

> 本次数据仅有 7 条 Issue，因此全部列出，不补造至 10 条。各条目均为 OPEN、点赞数均为 0；当前讨论量有限，不宜将其解读为已形成广泛社区共识。

| Issue | 核心内容与重要性 | 社区反应 |
|---|---|---|
| **[#30291 Nightly 发布失败](https://github.com/google-gemini/gemini-cli/issues/30291)** | `v0.70.0-nightly.20261114.g4ed06ed0d` 发布工作流失败，影响该次预览构建交付。现有摘要未提供失败原因。 | 标记 `priority/p0`、`release-failure`；0 条评论，是今日优先级最高的发布问题。 |
| **[#30280 Node 26 下模型请求绕过 CLI 超时配置](https://github.com/google-gemini/gemini-cli/issues/30280)** | 用户报告 Node 26.13.0、CLI 0.68.0 下，SDK 使用的内置 `fetch` 与 CLI 所用 Undici 的全局调度器符号不一致，导致模型请求不受既定超时控制，可能影响请求耗时的可预测性。 | 2 条评论，为本批 Issue 中讨论最多的一条；待分诊，已有对应修复 PR #30281。 |
| **[#30285 Node.js 24 全局安装警告](https://github.com/google-gemini/gemini-cli/issues/30285)** | 全局安装可以完成，但出现 `@github/keytar` 弃用及 `@github/keytar`、`node-pty` 安装脚本审批警告，增加安装排障和依赖安全评估成本。 | 1 条评论，待分诊；当前不能据此判断安装失败或功能不可用。 |
| **[#30294 扩展商店卡片信息过期](https://github.com/google-gemini/gemini-cli/issues/30294)** | `@azmartone67/dchub-mcp-server` 卡片仍显示 2.12.29、92 个工具，而仓库已到 2.12.54。诉求是刷新现有条目，关系到扩展发现与信息准确性。 | 1 条评论，待分诊。 |
| **[#30276 官网反馈内容不足](https://github.com/google-gemini/gemini-cli/issues/30276)** | 正文缺乏可理解的问题描述和复现信息，暂无法识别实际缺陷；主要值得关注的是反馈质量与分诊成本。 | 1 条评论，带扩展、文档及待分诊标签；无法判断有效技术诉求。 |
| **[#30275 官网反馈内容不足](https://github.com/google-gemini/gemini-cli/issues/30275)** | 问题与预期行为均只有极短字符，不能据此推导产品需求。 | 1 条评论，带扩展、文档及待分诊标签。 |
| **[#30274 官网反馈内容不足](https://github.com/google-gemini/gemini-cli/issues/30274)** | 与 #30275 来自同一作者，同样缺少可执行的缺陷信息，建议补充上下文后再评估。 | 1 条评论，带扩展、文档及待分诊标签。 |

## 3. 重要 PR 进展

> 以下精选 10 条，**均为 OPEN**。PR 评论字段缺失，因此不评估讨论热度；测试结果若有提及，均来自提交者摘要。

| PR | 功能或修复内容 | 开发者价值 |
|---|---|---|
| **[#30281 修复 Node 26 请求超时](https://github.com/google-gemini/gemini-cli/pull/30281)** | 将 core 的 Undici 升级至 7.30.2，使全局调度器使用 Node 26 内置 `fetch` 识别的符号，并补充新旧符号回归测试。 | 直接响应 #30280；摘要报告 31 项定向测试通过。 |
| **[#30289 扩展链接展示真实路径、同意提示默认拒绝](https://github.com/google-gemini/gemini-cli/pull/30289)** | 使用 `fs.realpathSync` 解析扩展的规范路径，并调整扩展授权流程中的默认选择。 | `priority/p1`；提升链接目标透明度，减少误授权风险。 |
| **[#30283 跳过命令权限不安全的系统 MCP 服务](https://github.com/google-gemini/gemini-cli/pull/30283)** | 检查系统级配置所引用的本地 MCP 命令及脚本参数的所有权、写权限。 | 将权限校验从配置文件延伸到实际执行目标，收紧系统级配置的信任边界。 |
| **[#30282 使用 re2js 评估策略正则](https://github.com/google-gemini/gemini-cli/pull/30282)** | 为 `argsPattern`、`commandRegex`、`commandPrefix` 引入 `SafeRegExp` 包装，改用线性时间匹配。 | 旨在降低正则回溯造成的性能与可用性风险；带 `status/need-issue` 标签。 |
| **[#30292 保留超长后台日志尾部](https://github.com/google-gemini/gemini-cli/pull/30292)** | 修正 `read_background_output` 在非零偏移读取时无条件丢弃首行的问题，并标记截断读取。 | 避免超 64KB 单行日志在读取窗口内被整体丢弃，改善 Agent 排障信息完整性；`priority/p2`。 |
| **[#30279 统一工具调用名称与历史记录](https://github.com/google-gemini/gemini-cli/pull/30279)** | 将去除首尾空白后的函数名保留到历史记录，避免工具调用与响应名称不一致。 | 针对 `400 INVALID_ARGUMENT`，减少工具执行后对话链路中断。 |
| **[#30278 改善 Gemini API 网络失败提示](https://github.com/google-gemini/gemini-cli/pull/30278)** | 在尚未收到 HTTP 响应时提供网络排障指引，并与 503 等 HTTP 错误区分。 | 帮助区分传输故障和服务端错误；摘要报告 78 项定向测试通过。 |
| **[#30277 改善沙箱权限拒绝识别](https://github.com/google-gemini/gemini-cli/pull/30277)** | 改进容器、受限环境中的权限拒绝检测和不支持环境处理。 | `priority/p2`；有助于解释沙箱失败原因，改善受限部署环境的兼容体验。 |
| **[#30273 统一退出码与致命错误层次](https://github.com/google-gemini/gemini-cli/pull/30273)** | 集中整理退出码，消除错误类型中散落的硬编码数值。 | 提升脚本和 CI 对失败类型的判断一致性；带 `status/need-issue` 标签。 |
| **[#30272 根据 CLI 路径判断源码运行环境](https://github.com/google-gemini/gemini-cli/pull/30272)** | 标题表明拟从 CLI 路径而非当前工作目录判断是否处于源码检出环境。 | `priority/p1`；意在减少工作目录引发的环境误判，但摘要模板未填写，具体实现仍需审阅。 |

## 4. 功能需求趋势

本批 Issues 以故障与维护反馈为主，**尚不足以证明存在 IDE 集成、新模型支持等新增功能热点**。可提炼出三个方向：

- **运行时兼容与请求可控性**：Node 26 超时失效、Node 24 安装警告共同反映出新 Node 环境下的兼容性和依赖治理需求。[#30280](https://github.com/google-gemini/gemini-cli/issues/30280) · [#30285](https://github.com/google-gemini/gemini-cli/issues/30285)
- **发布链路可靠性**：P0 Nightly 失败表明，预览版本交付与失败恢复是当前明确的维护重点。[#30291](https://github.com/google-gemini/gemini-cli/issues/30291)
- **扩展生态信息准确性**：扩展商店版本与工具数量滞后，暴露出元数据刷新需求；这是展示信息维护问题，而非新增扩展上架请求。[#30294](https://github.com/google-gemini/gemini-cli/issues/30294)

此外，三条低信息量官网反馈提示可考虑加强反馈表单校验，但这属于治理建议，不能视为已被验证的用户需求。[#30276](https://github.com/google-gemini/gemini-cli/issues/30276) · [#30275](https://github.com/google-gemini/gemini-cli/issues/30275) · [#30274](https://github.com/google-gemini/gemini-cli/issues/30274)

## 5. 开发者关注点

1. **请求失败需要更可控、更易诊断。** 超时配置是否生效，以及网络失败与 HTTP 错误能否区分，会直接影响自动化任务的稳定性。[#30280](https://github.com/google-gemini/gemini-cli/issues/30280) · [#30278](https://github.com/google-gemini/gemini-cli/pull/30278)
2. **扩展与 MCP 的安全边界正在细化。** 今日 PR 从真实路径披露、默认拒绝到可执行文件权限检查，均在强化授权和执行目标的可信性。[#30289](https://github.com/google-gemini/gemini-cli/pull/30289) · [#30283](https://github.com/google-gemini/gemini-cli/pull/30283)
3. **Agent 可靠性取决于细节一致性。** 日志截断不能悄然丢失关键内容，函数调用名称也必须在执行与历史中保持一致。[#30292](https://github.com/google-gemini/gemini-cli/pull/30292) · [#30279](https://github.com/google-gemini/gemini-cli/pull/30279)
4. **自动化环境需要明确的失败信号。** 沙箱权限识别、统一退出码和清晰的安装警告处理，都是降低 CI 与受限环境排障成本的重要方向。[#30277](https://github.com/google-gemini/gemini-cli/pull/30277) · [#30273](https://github.com/google-gemini/gemini-cli/pull/30273) · [#30285](https://github.com/google-gemini/gemini-cli/issues/30285)

**后续观察重点：** P0 Nightly 发布故障是否恢复，以及 Node 26 超时修复与扩展/MCP 安全加固 PR 的审阅、合入进度。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-14**  
**仓库：[github/copilot-cli](https://github.com/github/copilot-cli)**

> 数据范围：所提供的过去 24 小时更新记录。共包含 3 条 Release、5 条 Issue 和 2 条 PR；以下不补造至 10 条。部分发布说明被截断，PR 的 CLOSED 状态也不代表已合并。

## 1. 今日速览

Copilot CLI 发布 **v1.0.112、v1.0.112-0 和 v1.0.111**，更新涉及错误提示、输入保留、模型上下文配置及企业权限管理。社区反馈主要集中在**免费计划与子代理默认模型不匹配、MCP 登录受阻、上下文开销增加**；这些问题均尚未解决，且当前样本互动量较低，暂不能视为广泛共识。另有两项依赖更新 PR 已关闭，但所给数据未显示是否合并。

## 2. 版本发布

| 版本 | 主要更新 | 开发者价值 |
|---|---|---|
| [v1.0.112](https://github.com/github/copilot-cli/releases/tag/v1.0.112) | `/compact` 失败时直接显示模型提供商错误，去除内部重抛前缀；尚未发送的提示保留粘贴文本，例如托管账户策略仍在加载时 | 改善故障诊断，降低输入内容丢失风险 |
| [v1.0.112-0](https://github.com/github/copilot-cli/releases/tag/v1.0.112-0) | 改善 macOS Ventura 13.5 及以上版本的尽力启动体验，但**不扩大官方系统支持范围**；默认使用模型推荐上下文窗口，保留显式配置；`/chronicle cost-tips` 纳入 Copilot App 会话并推荐更便宜的模型 | 优化兼容性、上下文配置和成本分析 |
| [v1.0.111](https://github.com/github/copilot-cli/releases/tag/v1.0.111) | 企业托管的 Shell、Bash、PowerShell 权限规则支持正则表达式；新增 `--host-allow-session-creation`，允许远程客户端在本次主机启动期间创建会话，不修改持久化设置；更新 `/usage` 高级请求用量展示 | 增强企业策略表达能力与远程会话控制 |

**说明：**v1.0.112 的输入保留说明、v1.0.112-0 的成本建议说明及 v1.0.111 的用量说明均有截断，以上仅概括可确认内容。

## 3. 社区热点 Issues

按潜在影响排序，收录全部 5 条记录，其中 4 条具有实质讨论内容。

### ① 免费计划无法使用子代理默认模型
**[#5456 · OPEN · triage](https://github.com/github/copilot-cli/issues/5456)**

- **反馈内容：**用户报告至少在 v1.0.112 中，`explore`、`task` 默认使用 `gpt-6-luna`，`research` 使用 `claude-sonnet-5.5`，但这些模型当前不向免费计划开放，导致执行报错。
- **为什么重要：**默认配置若不匹配账户权益，会直接阻断子代理工作流。值得关注是否增加模型可用性检测或降级机制。
- **社区反应：**0 条评论、0 个 👍；仍待维护者确认。

### ② MCP 的 Entra OAuth 原生登录窗口阻止粘贴
**[#5452 · OPEN · authentication / mcp](https://github.com/github/copilot-cli/issues/5452)**

- **反馈内容：**用户报告自 v1.0.109 起，执行 `/mcp auth azure-devops` 会打开 Microsoft OneAuth 原生窗口；窗口禁止复制粘贴，且缺少浏览器回退方式。
- **为什么重要：**可能影响密码管理器使用及企业 Azure DevOps MCP 接入，属于工作流阻断型问题。
- **社区反应：**0 条评论、0 个 👍；已标注认证与 MCP 领域标签。

### ③ 会话固定上下文开销据报增加约 20K tokens
**[#5450 · OPEN · context-memory](https://github.com/github/copilot-cli/issues/5450)**

- **反馈内容：**用户报告升级至桌面应用 1.4.0、CLI 1.0.106 后，固定上下文开销增加约 20K tokens；其示例中可用工作空间由约 112K 降至 93K，并更早触发自动压缩。
- **为什么重要：**若得到复现，将影响长任务的连续性与有效上下文容量。发布中的推荐上下文窗口调整值得对照观察，但**暂无证据表明两者直接相关或问题已修复**。
- **社区反应：**0 条评论、0 个 👍；尚无维护者结论。

### ④ 请求构造逻辑的版本对应源码与来源说明需求
**[#5455 · OPEN · triage](https://github.com/github/copilot-cli/issues/5455)**

- **反馈内容：**请求提供与 `@github/copilot` 1.0.110 对应的 CAPI `GET /meta` 请求构造源码片段，或与构建关联的规范说明。
- **为什么重要：**体现对版本可追溯性、请求行为透明度及审计材料的需求；本身不构成缺陷或安全漏洞证明。
- **社区反应：**0 条评论、0 个 👍；仍处于分诊阶段。

### ⑤ 无实质内容的 Issue 已关闭
**[#5451 · CLOSED · triage / invalid](https://github.com/github/copilot-cli/issues/5451)**

- **反馈内容：**标题为“V”，问题描述、方案和场景等字段均为空。
- **关注价值：**仅作分诊记录，不纳入功能趋势判断。
- **社区反应：**1 条评论、0 个 👍；已标记无效并关闭，未提供评论正文。

## 4. 重要 PR 进展

本期仅提供 2 条 PR，均由 Dependabot 提交，属于依赖维护，未见直接面向用户的功能改动。

| PR | 内容 | 状态与影响 |
|---|---|---|
| [#5454：更新容器 Debian 基础镜像](https://github.com/github/copilot-cli/pull/5454) | `/container` 中 Debian 镜像引用从 `f6b08b0` 更新至 `a72b443`，标签仍为 `trixie-slim` | **CLOSED，合并情况未知**。属于基础镜像维护；数据未给出具体修复项，不能断言包含安全修复 |
| [#5453：更新 docker/login-action](https://github.com/github/copilot-cli/pull/5453) | 从 4.7.0 更新至 4.8.0 | **CLOSED，合并情况未知**。涉及 CI 中的 Docker 登录步骤；发布说明截断，无法确认具体行为变化 |

两条 PR 均为 0 个 👍，评论数未提供。

## 5. 功能需求趋势

当前有效 Issue 样本仅 4 条，以下是**需求信号，而非热度排名**：

- **账户权益感知的模型配置：**默认子代理模型应与订阅可用范围匹配，并在不可用时提供明确提示或回退路径。参考 [#5456](https://github.com/github/copilot-cli/issues/5456)。
- **企业认证兼容性：**MCP 认证需要兼顾原生登录、浏览器回退和密码管理器操作。参考 [#5452](https://github.com/github/copilot-cli/issues/5452)。
- **上下文效率与可解释性：**用户关心固定开销、实际可用容量及自动压缩频率，而不仅是标称窗口大小。参考 [#5450](https://github.com/github/copilot-cli/issues/5450)。
- **版本行为透明度：**对网络请求构造和构建对应材料的需求，提示可追溯文档具有价值。参考 [#5455](https://github.com/github/copilot-cli/issues/5455)。

## 6. 开发者关注点

1. **升级后先验证关键工作流。**免费计划用户应检查子代理模型是否可用；企业用户应验证 Azure DevOps MCP 登录是否仍能完成。参考 [#5456](https://github.com/github/copilot-cli/issues/5456)、[#5452](https://github.com/github/copilot-cli/issues/5452)。
2. **长任务关注有效上下文，而非只看窗口上限。**若发现自动压缩明显提前，可对照升级前后的固定开销、模型和会话配置记录复现信息。参考 [#5450](https://github.com/github/copilot-cli/issues/5450)。
3. **排障时优先保留提供商原始错误。**v1.0.112 改善了 `/compact` 错误展示，有利于区分模型提供商返回错误与 CLI 内部异常。参考 [v1.0.112](https://github.com/github/copilot-cli/releases/tag/v1.0.112)。
4. **远程会话权限可按单次启动授权。**新增参数无需更改已保存设置，适合需要临时允许远程客户端创建会话的场景。参考 [v1.0.111](https://github.com/github/copilot-cli/releases/tag/v1.0.111)。

**后续重点：**关注默认模型兼容性是否获得确认、MCP 认证是否提供替代路径，以及上下文开销回归是否有可复现结论。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报｜2026-11-14

> 数据来源：[anomalyco/opencode](https://github.com/anomalyco/opencode)。本期基于提供的 30 条 Issue、20 条 PR 摘要分析；统计窗口标注为过去 24 小时，部分条目的更新时间仍为 11 月 13 日。**Closed 仅表示已关闭，不等同于修复已发布或 PR 已合并。**

## 1. 今日速览

今日讨论主要集中在 **v2 升级与运行稳定性**：Windows 自更新损坏、2.3.0 数据库迁移冲突，以及会话无法结束等问题，直接影响工具可用性。MCP 的进程生命周期、失败恢复和权限匹配也是重点；贡献者同时提交了 WebFetch、模型提供商兼容性及无障碍体验相关改进。

过去 24 小时无新 Release，以下 PR 中的修复不能视为已随版本交付。

## 2. 社区热点 Issues

以下按影响范围、阻断程度和讨论热度综合选择，而非仅按评论数排序。

| Issue | 主要问题与关注价值 | 社区反应与状态 |
|---|---|---|
| [#63904：OpenCode Go 回合无法结束](https://github.com/anomalyco/opencode/issues/63904) | Windows、CLI 2.3.0 下已记录 token，却未写入 `time_idle`，导致 `/session/{id}/wait` 挂起。对自动化调用和无人值守任务影响明显。 | **5 条评论，已关闭**；为展示样本中评论最多的 Issue，带模拟复现标签，但摘要未说明关闭原因。 |
| [#63912：程序内自更新后无法使用](https://github.com/anomalyco/opencode/issues/63912) | 用户报告 Windows 上 v2 自更新损坏安装，回退也无法恢复。升级路径可靠性是基础使用门槛。 | **4 条评论，开放、分诊中**；报告环境包含插件，尚不能据此确定根因。 |
| [#63913：2.3.0 数据库迁移冲突](https://github.com/anomalyco/opencode/issues/63913) | Debian 13 / arm64 的 V1→V2 数据库升级出现 `table blob already exists`，同时阻断 Desktop 和后台服务启动。 | **1 条评论，开放**；带模拟复现标签，属于高影响启动阻断。 |
| [#63876：MCP 无退避重试拖垮服务](https://github.com/anomalyco/opencode/issues/63876) | 远程 MCP 的 `resources/list` 超时后持续高频重试，后续连接也可能长时间停滞，故障影响超出单个连接。 | **2 条评论，已关闭**；摘要未提供修复或交付信息。 |
| [#63847：配置重载泄漏 MCP 进程](https://github.com/anomalyco/opencode/issues/63847) | 每次保存配置启动新进程，却不终止旧进程；长期运行的服务可能持续累积资源占用。 | **3 条评论，已关闭**；需继续核实关闭原因及是否有对应版本修复。 |
| [#63899：Ollama 覆盖用户上下文配置](https://github.com/anomalyco/opencode/issues/63899) | 内置集成以 GGUF 架构最大上下文覆盖 `limit.context`，与实际 `num_ctx` 上限不一致，影响上下文压缩判断。 | **1 条评论，开放**；本地模型用户应重点关注配置是否真正生效。 |
| [#63857：Bedrock 推理历史重放失败](https://github.com/anomalyco/opencode/issues/63857) | `invalid encrypted view` 导致当前步骤及重试持续失败，暴露跨提供商推理内容兼容性问题。 | **3 条评论，已关闭**；对应修复 [PR #63858](https://github.com/anomalyco/opencode/pull/63858) 仍开放。 |
| [#63909：Windows TUI 的 NVDA 支持不足](https://github.com/anomalyco/opencode/issues/63909) | 会话标签、实时进度和斜杠菜单焦点无法被正确朗读，属于操作可达性问题，而非单纯视觉体验优化。 | **2 条评论，开放**；覆盖多个关键交互环节。 |
| [#63867：原生密钥引用能力](https://github.com/anomalyco/opencode/issues/63867) | 希望通过系统凭据库或密钥管理器引用 Provider、MCP 凭据，改善凭据管理与配置共享方式。 | **2 条评论、1 个 👍，开放**；作者指出此前已有类似请求被关闭，体现需求持续存在。 |
| [#63916：CLI 查询剩余额度](https://github.com/anomalyco/opencode/issues/63916) | Console 用户希望直接在 CLI 查看剩余用量，避免直到请求失败才发现额度不足。 | **1 条评论，开放**；与已关闭的用量计数需求 [#63878](https://github.com/anomalyco/opencode/issues/63878) 形成同类信号。 |

## 3. 重要 PR 进展

**以下 10 个 PR 在提供的数据中均为 Open，尚不能视为已合并或已上线。** PR 评论数字段缺失，因此不以评论热度评价进展。

| PR | 功能或修复内容 | 开发者价值 |
|---|---|---|
| [#63917：保留无 `href` 锚点的文本](https://github.com/anomalyco/opencode/pull/63917) | 修复 WebFetch 将无链接目标的 `<a>` 转成空 Markdown 链接，以及行内代码被拆分的问题。 | 对应 [#63890](https://github.com/anomalyco/opencode/issues/63890)，提升网页提取结果的可读性与结构完整性。 |
| [#63889：WebFetch 支持 XHTML 转换](https://github.com/anomalyco/opencode/pull/63889) | 使用归一化 MIME 类型，让 `application/xhtml+xml` 进入既有 HTML 转换流程；`html` 模式仍返回原文。 | 对应 [#63888](https://github.com/anomalyco/opencode/issues/63888)，减少 Markdown、文本模式返回原始标记的情况。 |
| [#63915：MCP 连接失败后自动重试](https://github.com/anomalyco/opencode/pull/63915) | 为工作区启动时因超时失败的 MCP 连接增加自动恢复逻辑。 | 改善 `npx` 或重型容器启动较慢时的体验；带 `needs:compliance` 标签，重试策略也值得结合重试风暴问题审查。 |
| [#63881：统一 MCP 权限动作命名](https://github.com/anomalyco/opencode/pull/63881) | 规范化连字符与下划线差异，不重命名已注册工具，并保留已有连字符规则的兼容性。 | 降低“权限已配置但匹配不到”的排障成本；带 `needs:compliance` 标签。 |
| [#63858：Bedrock 拒绝推理内容时降级重试](https://github.com/anomalyco/opencode/pull/63858) | 遇到 `invalid encrypted view` 时尝试不携带推理内容重试。 | 避免不可重放的 reasoning 历史持续阻断会话。 |
| [#63861：默认提供商未注册时禁止跨提供商回退](https://github.com/anomalyco/opencode/pull/63861) | 处理 Provider 配置校验失败、但默认模型仍引用该 Provider 的情况。 | 提升路由可预测性，避免配置错误后意外使用其他提供商。 |
| [#63895：保存设置时清理重复配置键](https://github.com/anomalyco/opencode/pull/63895) | 编辑 JSONC 前移除被后续同名键覆盖的属性，保持与解析时“最后一个值生效”的行为一致。 | 减少界面保存结果与实际运行配置不一致的问题。 |
| [#63897：跳过尚无提交的嵌套仓库](https://github.com/anomalyco/opencode/pull/63897) | 避免将不存在 HEAD 的嵌套仓库记录为 gitlink，引发快照失败。 | 改善多仓库工作区和新建子仓库场景下的快照可靠性。 |
| [#63873：合并 claude-agent 的 catch-up 文本块](https://github.com/anomalyco/opencode/pull/63873) | 将按角色、文本和工具事件拆分的追赶内容合并为一个文本块。 | 针对缓存查找受内容块数量影响的问题，优化长会话的缓存利用条件。 |
| [#63851：为未命名控件补充无障碍名称](https://github.com/anomalyco/opencode/pull/63851) | 为会话搜索结果列表、目录相关控件等补充可访问名称。 | 帮助屏幕阅读器用户理解控件用途，是持续无障碍改进的一部分。 |

## 4. 功能需求趋势

### ① 用量、成本与缓存状态更透明
用户不仅希望知道“用了多少”，也希望知道“还剩多少”以及会话闲置后缓存是否可能仍有效。相关需求包括 [CLI 剩余额度查询 #63916](https://github.com/anomalyco/opencode/issues/63916)、[用量计数 #63878](https://github.com/anomalyco/opencode/issues/63878) 和 [显示最后响应距今时间 #63896](https://github.com/anomalyco/opencode/issues/63896)。其中最后一项提供的是缓存状态判断线索，并非直接验证缓存命中。

### ② MCP 需要更强的运行可观测性
除了连接成功，用户也需要确认配置是否生效、工具究竟在哪里执行。例如 [旧协议服务器静默忽略连接池 #63848](https://github.com/anomalyco/opencode/issues/63848)，以及 [browse 调用进入错误沙箱 #63902](https://github.com/anomalyco/opencode/issues/63902)，都指向运行状态与执行路径不透明。

### ③ 凭据生命周期管理走向原生化
[密钥引用 #63867](https://github.com/anomalyco/opencode/issues/63867) 与 [插件 OAuth 凭据替换、删除能力 #63905](https://github.com/anomalyco/opencode/issues/63905) 表明，需求已从“能够登录”延伸到安全存储、重复账号清理和插件管理权限。

### ④ 无障碍与长输出操作体验受到关注
[NVDA 支持 #63909](https://github.com/anomalyco/opencode/issues/63909) 关注核心交互可达性；[在展开内容底部提供折叠控制 #63900](https://github.com/anomalyco/opencode/issues/63900) 则关注长推理、长工具输出的导航成本。

### ⑤ 多代理运行需要更细粒度的控制
[后台子代理唤醒父会话 #63894](https://github.com/anomalyco/opencode/issues/63894) 希望区分用户派发任务和插件内部任务，避免隐藏代理的每轮结果都打断父会话。与此同时，[默认集成 SparseRead #63906](https://github.com/anomalyco/opencode/issues/63906) 显示社区也在探索新的读取机制，但当前数据不足以判断收益。

## 5. 开发者关注点

- **升级前优先备份，特别关注跨版本数据库。** [迁移冲突 #63913](https://github.com/anomalyco/opencode/issues/63913)、[Windows 自更新失败 #63912](https://github.com/anomalyco/opencode/issues/63912) 和 [Fedora RPM 升级后启动失败 #63908](https://github.com/anomalyco/opencode/issues/63908) 涉及不同安装路径，不能简单归为同一根因。
- **自动化必须能判断会话是否真正完成。** [CLI 等待挂起 #63904](https://github.com/anomalyco/opencode/issues/63904) 与 [Desktop 持续产生 Thought #63901](https://github.com/anomalyco/opencode/issues/63901) 表现不同，但都暴露了运行状态和终止条件的重要性。
- **MCP 恢复机制需要同时防泄漏、防重试风暴。** [进程未回收 #63847](https://github.com/anomalyco/opencode/issues/63847) 与 [无退避重试 #63876](https://github.com/anomalyco/opencode/issues/63876) 提醒维护者：自动重试应配套退避、并发限制和生命周期管理。
- **配置必须可解释、可验证。** [Ollama 上下文被覆盖 #63899](https://github.com/anomalyco/opencode/issues/63899)、[连接池静默失效 #63848](https://github.com/anomalyco/opencode/issues/63848) 都说明，“配置被接受”不等于“配置已生效”。
- **Windows 工具链兼容性仍需重点回归。** 除升级与会话问题外，[Store PowerShell 管道模式启动失败 #63892](https://github.com/anomalyco/opencode/issues/63892) 会直接阻断 shell 工具执行。

**今日判断：** 当前最值得跟进的不是功能数量，而是升级可恢复性、会话终止语义，以及 MCP 长期运行稳定性；这些基础能力决定了 OpenCode 能否可靠进入日常开发和无人值守工作流。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-11-14

## 今日速览

过去 24 小时未有新 Release，数据中共有 **15 条 Issue、9 条 PR 更新**，讨论重点集中在工具调用可靠性、长会话稳定性和依赖安全。Mistral Large 4 工具调用挂起仍处于开放状态；PR 侧则出现了工具输出限额配置、大型工具结果渲染防崩溃、网络错误重试等改进提案。

> **数据说明**：来源标注为 `badlogic/pi-mono`，但条目指向 `earendil-works/pi`，下文按条目仓库生成链接。Issue 与 PR 的 **CLOSED 不代表已修复或已合并**；当前数据未提供关闭原因、合并状态及 PR 评论数。

## 社区热点 Issues

以下按技术影响与使用风险筛选 10 项。所有条目均为 **0 👍**，社区反应主要参考评论数，不能据此认定已形成广泛共识。

### 1. Mistral Large 4 工具调用挂起
[Issue #12148](https://github.com/earendil-works/pi/issues/12148) · **OPEN｜4 条评论**

用户报告在预期触发工具调用的提示下，模型持续挂起，等待数分钟仍无结果。这直接影响该模型用于编码代理任务的可用性，是本批数据中评论最多、且唯一仍开放的 Issue，值得优先跟踪复现条件与后续处理。

### 2. `undici` 精确版本锁定引发安全更新诉求
[Issue #12159](https://github.com/earendil-works/pi/issues/12159) · **CLOSED｜1 条评论**

报告称 `@earendil-works/pi-coding-agent` 1.5.2 将 `undici` 固定为 `8.12.3`，而 `8.12.4` 修复了六项安全公告，其中一项为高危。提议升级或放宽版本约束，涉及依赖安全与补丁获取能力；漏洞信息及是否已升级，仍需结合安全公告和代码确认。

### 3. Codex SSE 对不可重试 HTTP 错误重复请求
[Issue #12153](https://github.com/earendil-works/pi/issues/12153) · **CLOSED｜2 条评论**

启用 provider 重试后，HTTP 400 仍可能按 1/2/4 秒退避，累计发送四次。该问题会放大失败延迟，并产生无效请求，说明重试机制需要准确区分临时故障和终止性错误。

### 4. 命令成功退出却丢失输出
[Issue #12157](https://github.com/earendil-works/pi/issues/12157) · **CLOSED｜1 条评论**

报告指出，事件循环繁忙时，`NodeExecutionEnv.exec()` 可能返回退出码 0，却未返回命令输出，连 `echo hi` 都可能呈现空结果。这类静默丢失会误导代理判断，嵌入式宿主与任务恢复场景尤其需要关注。

### 5. 超长会话无法加载
[Issue #12154](https://github.com/earendil-works/pi/issues/12154) · **CLOSED｜1 条评论**

最后一次压缩后累积约 12 万条以上记录的会话，在 `buildContextEntries` 中触发调用栈溢出，影响上下文重建、`ctx.getContextUsage()` 及启动加载。它暴露了长周期代理任务在会话规模与恢复能力上的边界。

### 6. 非法 `codemode` 调用导致后续会话异常
[Issue #12150](https://github.com/earendil-works/pi/issues/12150) · **CLOSED｜1 条评论**

模型生成缺失 `code` 参数的工具调用，本地校验虽能拒绝，但报告称随后会话受到影响。关键不只是参数验证，而是验证失败后能否维持可继续执行的会话状态。

### 7. Steering 消息被反复注入
[Issue #12149](https://github.com/earendil-works/pi/issues/12149) · **CLOSED｜1 条评论**

一次性排队的 steering 消息被报告为在后续每个 turn 边界重复进入上下文。这可能造成重复指令、上下文膨胀和行为偏移，反映出消息队列“投递一次、消费一次”的语义需要可靠保障。

### 8. RPC 启动阶段的扩展对话框无法响应
[Issue #12147](https://github.com/earendil-works/pi/issues/12147) · **CLOSED｜1 条评论**

在 `--mode rpc` 下，`session_start` 触发的扩展弹窗发出请求后，程序未读取客户端响应便退出。该问题影响外部客户端与扩展初始化交互，是程序化集成的重要阻塞点。

### 9. 自定义模型无法声明为 classifier
[Issue #12140](https://github.com/earendil-works/pi/issues/12140) · **CLOSED｜1 条评论**

用户通过 `models.json` 配置 `typesafe-system-one` API，但模型仍被注册为 `chat`。这涉及模型能力分类与配置一致性，影响非聊天模型接入及基于类型的调用路径。

### 10. 为用户消息增加文本附件块
[Issue #12135](https://github.com/earendil-works/pi/issues/12135) · **CLOSED｜2 条评论**

提议为 `UserMessage.content` 增加 `attachedText` 类型，并配套扩展生成、折叠展示和安全出队行为。这有助于将长文本材料与普通指令分开管理，也是本批数据中相对有讨论度的功能需求。

## 重要 PR 进展

**本次仅提供 9 条 PR，因此全部列出，不补造第 10 条。以下均为 CLOSED，是否合并无法从现有数据判断。**

| PR | 功能或修复内容 | 技术意义 |
|---|---|---|
| [#12163](https://github.com/earendil-works/pi/pull/12163) | 增加 `toolOutput.maxBytes`、`toolOutput.maxLines`；默认保持 51,200 字节和 2,000 行。Bash/read 按配置向模型展示节选，并提示如何读取剩余内容。 | 在上下文开销和完整输出可访问性之间提供可配置平衡。 |
| [#12145](https://github.com/earendil-works/pi/pull/12145) | 修复超大自渲染工具结果的渲染崩溃，涉及 `lines.push(...contentLines)` 处理大量显示行的场景。 | 提升大型编辑差异等结果的终端稳定性。 |
| [#12139](https://github.com/earendil-works/pi/pull/12139) | 将“不支持图片”的提示从发送给模型的内容中分离，避免该提示随会话保存后，在切换视觉模型时继续进入请求。 | 减少过期能力提示对多模态上下文的干扰。 |
| [#12136](https://github.com/earendil-works/pi/pull/12136) | 补充仅包含 Node socket 错误码的 provider 故障重试，如 `ECONNRESET`、`EPIPE`、`ETIMEDOUT`。 | 改善网络瞬时故障下的恢复能力；与“不可重试错误被重试”的 Issue 共同凸显错误分类的重要性。 |
| [#12142](https://github.com/earendil-works/pi/pull/12142) | 标题提出“保存临时会话”功能，未提供摘要。 | 指向会话保留需求，但具体交互与保存机制尚不明确。 |
| [#12162](https://github.com/earendil-works/pi/pull/12162) | 在 `coder/` 下增加 Docker 工作区模板，克隆作者 fork，并让 code-server 打开 `~/pi`。 | 面向容器化开发环境，模板当前指向作者仓库。 |
| [#12143](https://github.com/earendil-works/pi/pull/12143) | 在仓库根目录增加 `Dockerfile.pi`。 | 提供容器化相关改动，但缺少构建方式和运行用途说明。 |
| [#12151](https://github.com/earendil-works/pi/pull/12151) | 标题为 `Sync`，无摘要。 | 属于同步类记录，无法确认具体功能变化。 |
| [#12144](https://github.com/earendil-works/pi/pull/12144) | 描述为 `sync pi` 的同步改动。 | 未提供足够信息，不宜将其视为独立功能交付。 |

## 功能需求趋势

### 1. 扩展 API 正向更完整的任务编排能力发展
除文本附件外，社区还希望事件处理器至少能在 `before_agent_start` 阶段，通过受限的 `ctx.executeTool()` 调用工具。两类需求共同指向：扩展不仅要修改提示，还需要组织输入和执行准备工作。  
相关：[文本附件 #12135](https://github.com/earendil-works/pi/issues/12135)｜[事件处理器执行工具 #12137](https://github.com/earendil-works/pi/issues/12137)

### 2. 包管理安全策略需要覆盖完整生命周期
依赖安全版本诉求之外，还有建议为扩展安装、更新和更新提示统一应用 `packages.minimumReleaseAge`。关注点既包括及时获取补丁，也包括避免过早采用刚发布的扩展版本。  
相关：[依赖升级 #12159](https://github.com/earendil-works/pi/issues/12159)｜[扩展最低发布年龄 #12141](https://github.com/earendil-works/pi/issues/12141)

### 3. 配置、状态与消息生命周期需要更清晰的边界
社区提出将 `lastChangelogVersion`、`deviceId` 等机器写入状态移出 `settings.json`；steering 重复注入则反映消息消费边界问题。两者都体现了对可预测、可维护状态管理的需求。  
相关：[状态文件拆分 #12158](https://github.com/earendil-works/pi/issues/12158)｜[Steering 消费语义 #12149](https://github.com/earendil-works/pi/issues/12149)

### 4. 模型与工具支持开始强调语义正确性
除“能否接入”外，开发者也关注模型分类是否准确、工具 schema 的约束是否完整表达，以及非法调用后能否恢复。`schemaToType` 忽略数组元素限制，是这一方向的另一例子。  
相关：[模型分类 #12140](https://github.com/earendil-works/pi/issues/12140)｜[数组元素约束 #12156](https://github.com/earendil-works/pi/issues/12156)｜[非法调用恢复 #12150](https://github.com/earendil-works/pi/issues/12150)

## 开发者关注点

- **失败应当可见、可恢复**：挂起、空输出和异常调用后会话受损，比明确返回错误更难排查。建议关注超时、错误隔离与故障后的继续执行能力。  
  参考：[工具调用挂起 #12148](https://github.com/earendil-works/pi/issues/12148)、[输出丢失 #12157](https://github.com/earendil-works/pi/issues/12157)。

- **长会话与大输出正在触及实现边界**：会话加载和工具结果渲染均出现调用栈或规模问题，重度用户需要关注上下文压缩、输出节选与恢复策略。  
  参考：[长会话加载 #12154](https://github.com/earendil-works/pi/issues/12154)、[大型结果渲染 #12145](https://github.com/earendil-works/pi/pull/12145)。

- **自动化集成需要严格的生命周期保证**：RPC 初始化交互、steering 消费、事件处理器工具权限，都影响外部客户端能否可靠控制代理。  
  参考：[RPC 对话框 #12147](https://github.com/earendil-works/pi/issues/12147)、[事件工具调用 #12137](https://github.com/earendil-works/pi/issues/12137)。

**总体判断：** 本期更突出的信号不是新功能扩张，而是让 Pi 在长时间运行、复杂工具链和外部集成中更可靠。由于未提供合并与发布信息，开发者仍应以实际版本和后续修复记录确认这些问题是否已解决。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**2026-11-14 · [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)**

## 今日速览

今天的主线是 **CI 稳定性修复与 Web Shell 多工作区能力扩展**：ACP 一致性测试出现大面积失败，已有修复 PR；托管 worktree、跨工作区 Goals 页面等能力也在推进。企业微信 Webhook 投递、ACP 冷启动优化和 Windows 更新修复值得关注，过去 24 小时暂无新 Release。

> **数据口径：**本期基于提供的 30 条 Issue、20 条 PR 摘要筛选，完整更新量分别为 35 条、50 条。PR 评论数缺失，不据此判断讨论热度；OPEN PR 均为待合并方案，CLOSED 也不等同于已合并。

## 社区热点 Issues

### 1. ACP 一致性测试 25 项中有 23 项失败
**[Issue #17234](https://github.com/QwenLM/qwen-code/issues/17234)** · P1 · 审查中 · 3 条评论

多个无关分支合入当前 `main` 后出现相同失败，表现为 `kernelRounds` 只有 `sharedRounds` 的一半，直接影响 PR 验证。关联修复指出日志标记重复可能导致计数偏差，**目前不宜将其直接解读为 Agent 实际执行轮次异常**。

### 2. Fork 内部 PR 被错误分配到上游自托管 Runner
**[Issue #17222](https://github.com/QwenLM/qwen-code/issues/17222)** · P2 · 开放 · 3 条评论

`pick_runner` 缺少对规范仓库身份的完整约束，可能使 Fork 内部 PR 一直排队，阻断外部贡献者验证。已有对应修复 PR，属于影响贡献体验的基础设施问题。

### 3. Windows 独立安装版在 PowerShell 7 中更新失败
**[Issue #17211](https://github.com/QwenLM/qwen-code/issues/17211)** · P2 · 开放 · 2 条评论

用户报告从 0.26.9 更新至 0.27.3 时，解压阶段因 `Expand-Archive` 失败而中断，错误提示又缺乏细节。对应修复尝试隔离 PowerShell 模块路径，兼顾兼容性与故障可诊断性。

### 4. ACP 订阅登录运行一段时间后无法推理
**[Issue #17210](https://github.com/QwenLM/qwen-code/issues/17210)** · P2 · 待补充信息 · 2 条评论

用户在 `1.0.0-preview.1` 中报告，登录约 60–90 分钟后，新 ACP 会话提示缺少 `ModelProvider`。这关系到长时间运行的 ACP 客户端可靠性，但认证续期或会话状态是否为根因仍待确认。

### 5. 工作区设置能否覆盖 `qwen serve` 启动信任策略？
**[Issue #17236](https://github.com/QwenLM/qwen-code/issues/17236)** · P2 · 待讨论 · 2 条评论

讨论焦点是：已受信任工作区是否可以覆盖运维侧配置的文件夹信任开关。该议题需要维护者明确权限边界，重要性在于**安全策略归属**，而非普通配置兼容问题。

### 6. Web Shell worktree 后续规划：保留策略、快照与自定义根目录
**[Issue #17237](https://github.com/QwenLM/qwen-code/issues/17237)** · P3 · 阻塞／待讨论 · 2 条评论

在托管 worktree 的基础阶段之外，继续追踪保留策略、快照及可配置根目录。它决定多会话隔离能力能否进一步具备可控的磁盘占用和恢复体验，目前仍属后续规划。

### 7. 为 Channels 和 Web Shell 增加企业微信群 Webhook 投递
**[Issue #17215](https://github.com/QwenLM/qwen-code/issues/17215)** · P3 · 开放 · 2 条评论

需求覆盖群消息推送、Web Shell 配置和定时任务投递目的地，后端与前端均已有 PR。其价值是为自动化结果提供轻量、仅发送的企业协作出口，而不必依赖完整交互式机器人。

### 8. Ollama Llama 4 模型被错误关闭图像输入
**[Issue #17189](https://github.com/QwenLM/qwen-code/issues/17189)** · P2 · 开放 · 2 条评论

模型 ID 归一化将 `llama4:scout`、`llama4:maverick` 截成标签部分，导致无法命中视觉能力配置。问题说明模型名称处理不仅影响展示，也会直接影响能力判定。

### 9. DeepSeek V3.1／V3.2 输出上限回退到通用值
**[Issue #17188](https://github.com/QwenLM/qwen-code/issues/17188)** · P2 · 开放 · 2 条评论

部分模型别名未匹配目录中的专用配置，使输出上限落到 32,000，而目录值为 65,536 tokens。对长代码生成和复杂任务而言，这类映射错误可能导致能力被低估。

### 10. 聊天记录大文档导出测试持续不稳定
**[Issue #17158](https://github.com/QwenLM/qwen-code/issues/17158)** · P2 · 待人工处理／自动修复进行中 · 4 条评论

覆盖最大文档的打开、搜索、复制和打印，是展示样本中评论最多的 Issue。机器人要求通过同提交重跑区分随机失败与确定性缺陷，后续还拆出了测试预算机制整理任务，说明问题不宜仅靠延长超时处理。

## 重要 PR 进展

以下 **10 项均为 OPEN**，尚不能视为已交付功能。

| PR | 核心内容与意义 |
|---|---|
| **[#17241：修复 ACP 轮次重复计数](https://github.com/QwenLM/qwen-code/pull/17241)** | 为 shared-batch 轮次使用独立日志行，避免一致性测试把同一轮计算两次，直接回应 #17234 的大面积 CI 失败。 |
| **[#17231：修正自托管 Runner 路由](https://github.com/QwenLM/qwen-code/pull/17231)** | 在实际分配 Runner 标签时要求仓库为规范上游仓库，防止 Fork 内部 PR 误入 ECS 执行池。 |
| **[#17212：隔离 Windows 更新的 PowerShell 环境](https://github.com/QwenLM/qwen-code/pull/17212)** | 隔离继承的 PowerShell 7 模块路径，使 Windows PowerShell 5.1 能加载兼容的 Archive 模块，并改进解压错误呈现。 |
| **[#17228：Web Shell 托管 worktree 会话](https://github.com/QwenLM/qwen-code/pull/17228)** | 提议在可信 Git 工作区中默认使用隔离 worktree，首条消息时延迟创建，支持 detached HEAD、创建分支及交接等流程。 |
| **[#17218：Agent Host 接入共享工具批处理](https://github.com/QwenLM/qwen-code/pull/17218)** | 将带实时工具和只读 Agent Host 会话接入共享循环的工具批处理，继续统一 ACP 与核心执行路径。 |
| **[#17223：企业微信群 Webhook 后端投递](https://github.com/QwenLM/qwen-code/pull/17223)** | 新增仅发送的群消息 Channel，可用于通知、显式提示结果和受支持的计划任务投递。 |
| **[#17224：Web Shell 企业微信 Webhook 配置](https://github.com/QwenLM/qwen-code/pull/17224)** | 为现有企业微信平台增加 Webhook 连接方式，支持配置、启停及选择定时任务投递群组，与后端 PR 配套。 |
| **[#17239：用量面板增量缓存](https://github.com/QwenLM/qwen-code/pull/17239)** | 按 transcript 缓存用量汇总，避免每次刷新都重新读取和完整解析近期记录；暂无量化性能结果。 |
| **[#17209：减少 ACP 冷启动工作](https://github.com/QwenLM/qwen-code/pull/17209)** | 并行读取独立扩展资源，并让 ripgrep 检查与初始化重叠，目标是缩短首个原生 ACP 会话的初始化等待。 |
| **[#17214：将 PR 状态监听交由 daemon 和运维侧管理](https://github.com/QwenLM/qwen-code/pull/17214)** | 由 daemon 管理 PR 状态转换，运维侧通过 `serve.sessionPrWatch` 配置订阅、唤醒和指令模板，强化后台自动化控制边界。 |

## 功能需求趋势

- **多会话隔离走向完整生命周期管理。** 需求已从“创建独立 worktree”扩展至保留策略、快照、恢复与存储位置控制，显示社区关注可长期使用的并行开发工作流。参考 [#17237](https://github.com/QwenLM/qwen-code/issues/17237)。

- **企业消息渠道与后台自动化联动。** 企业微信 Webhook、QQ 富媒体发送、钉钉适配后续测试共同体现出“把 Agent 结果送到协作平台”的方向，但成熟度各异。参考 [#17215](https://github.com/QwenLM/qwen-code/issues/17215)、[#17167](https://github.com/QwenLM/qwen-code/issues/17167)、[#17173](https://github.com/QwenLM/qwen-code/issues/17173)。

- **配置需要持久化，安全配置需要明确归属。** 聊天宽度仍停留在浏览器本地存储，文件夹信任则涉及旧字段迁移与工作区覆盖权限，反映出配置可管理性和策略一致性的需求。参考 [#17200](https://github.com/QwenLM/qwen-code/issues/17200)、[#17154](https://github.com/QwenLM/qwen-code/issues/17154)、[#17236](https://github.com/QwenLM/qwen-code/issues/17236)。

- **模型支持的重点转向准确识别已有能力。** Llama 4 视觉和 DeepSeek 输出上限问题都指向模型别名、归一化与能力目录的一致性，而非单纯增加模型数量。参考 [#17189](https://github.com/QwenLM/qwen-code/issues/17189)、[#17188](https://github.com/QwenLM/qwen-code/issues/17188)。

## 开发者关注点

1. **先恢复可信的 CI，再推进功能合入。** 确定性计数错误、随机测试失败和 Runner 路由故障需要分别处理，不能全部归为 flaky test。参考 [#17234](https://github.com/QwenLM/qwen-code/issues/17234)、[#17158](https://github.com/QwenLM/qwen-code/issues/17158)、[#17222](https://github.com/QwenLM/qwen-code/issues/17222)。

2. **长期运行可靠性与错误透明度不足。** ACP 登录后延迟失效、持续“模型繁忙”和 Windows 更新泛化错误，都增加了定位成本；其中服务忙碌问题仍待补充信息。参考 [#17210](https://github.com/QwenLM/qwen-code/issues/17210)、[#17204](https://github.com/QwenLM/qwen-code/issues/17204)、[#17211](https://github.com/QwenLM/qwen-code/issues/17211)。

3. **审查吞吐也是交付瓶颈。** QQ 富媒体功能的提交者反馈，PR 已获 merge-ready 判断，但仍等待审批和 CI 重跑；这提示功能完成与最终交付之间仍有流程阻力。参考 [#17167](https://github.com/QwenLM/qwen-code/issues/17167)。

**今日判断：**功能扩展继续围绕 Web Shell、ACP 和企业自动化展开，但短期交付节奏更取决于 CI 恢复、信任策略定界，以及审查流程能否顺畅收敛。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报
**日期：2026-11-14**

> **数据说明**：标注的数据源为 `Hmbown/DeepSeek-TUI`，但提供的 PR 均指向 `codewhale-hq/Codewhale`，仓库归属存在不一致。以下仅依据所给数据整理，链接保留实际指向；统计窗口沿用输入的“过去 24 小时”，不另行推断时区。

## 1. 今日速览

本次数据中没有新版本发布，也没有更新的 Issue；11 条 PR 均处于 **OPEN** 状态，其中 10 条为 Dependabot 依赖维护。最值得关注的是外部贡献者提交的 **Synap 模型服务接入**，其余工作主要集中在 Rust 依赖和 CI/CD 工具链更新，尚不能视为已交付功能。

## 2. 社区热点 Issues

**本次窗口内没有更新的 Issue，无法筛选出 10 个热点，也无法评估相关社区反应。**

这仅表示当前数据未包含 Issue 活动，并不代表仓库没有存量问题或功能需求。可在核实仓库归属后查看：[DeepSeek-TUI Issues](https://github.com/Hmbown/DeepSeek-TUI/issues)。

## 3. 重要 PR 进展

以下从 11 条记录中选取 10 条。**所有 PR 均未合并；评论数均为 `undefined`，不能解读为零评论，👍 均为 0。**

| PR | 功能或维护内容 | 关注价值 |
|---|---|---|
| **[#7340：新增 Synap 服务描述符](https://github.com/codewhale-hq/Codewhale/pull/7340)** | 外部贡献者 `weare-linkrra` 提交，通过现有兼容服务描述符接入 `https://synap402.com/v1` 的 OpenAI-compatible Chat Completions；使用 `SYNAP_API_KEY`，以 `qwen3-coder-30b` 为初始模型。 | 今日唯一的功能增强 PR。模型 ID 和 token 价格以实时 `GET /v1/models` 发现结果为准，值得关注模型发现与配置体验。 |
| **[#7334：升级 tokio](https://github.com/codewhale-hq/Codewhale/pull/7334)** | `1.53.3 → 1.54.1`。 | 涉及 Rust 异步运行时；评审应关注并发任务、网络请求和退出流程的回归验证，摘要不足以确认具体收益。 |
| **[#7337：升级 jsonschema](https://github.com/codewhale-hq/Codewhale/pull/7337)** | `0.57.0 → 0.61.1`。 | 跨多个次版本，值得检查 schema 校验行为及 API 兼容性；不能仅依据截断的发布说明判断变更内容。 |
| **[#7336：升级 lru](https://github.com/codewhale-hq/Codewhale/pull/7336)** | `0.18.5 → 0.19.0`，标记涉及核心模块。 | 缓存依赖变更值得检查接口兼容性及缓存行为，尚无性能改善证据。 |
| **[#7339：升级 flate2](https://github.com/codewhale-hq/Codewhale/pull/7339)** | `1.1.10 → 1.1.11`。 | 属于压缩依赖维护，应验证相关压缩、解压路径；现有摘要未提供完整修复细节。 |
| **[#7338：升级 globset](https://github.com/codewhale-hq/Codewhale/pull/7338)** | `0.4.20 → 0.4.21`。 | 涉及 glob 模式匹配依赖，适合关注文件匹配规则的回归测试。 |
| **[#7335：升级 actions/setup-java](https://github.com/codewhale-hq/Codewhale/pull/7335)** | `6.1.0 → 6.2.0`。 | CI 环境维护，重点在于 Java 配置步骤与既有工作流的兼容性。 |
| **[#7333：升级 docker/login-action](https://github.com/codewhale-hq/Codewhale/pull/7333)** | `4.7.0 → 4.8.0`。 | 涉及容器镜像仓库认证，需关注登录及后续镜像推送流程。 |
| **[#7332：升级 action-gh-release](https://github.com/codewhale-hq/Codewhale/pull/7332)** | `3.0.3 → 3.0.4`。 | 发布自动化依赖维护，重点验证 Release 创建及产物上传流程。 |
| **[#7331：更新 Codewhale Action 固定提交](https://github.com/codewhale-hq/Codewhale/pull/7331)** | 固定提交由 `b0b2b9a…` 更新至 `43c87b4…`。 | 属于 CI/CD 依赖引用更新，实际影响需要结合提交差异确认。 |

## 4. 功能需求趋势

**没有 Issue 样本，无法可靠提炼“社区最关注”的功能方向。** 从 PR 只能观察到以下开发动向，不能等同于用户需求排名：

- **模型服务接入扩展**：Synap PR 显示项目正尝试复用兼容服务描述符扩展供应商支持，并采用动态模型发现机制。[#7340](https://github.com/codewhale-hq/Codewhale/pull/7340)
- **Rust 技术栈维护**：异步运行时、schema 校验、缓存等依赖集中更新，说明本批工作以基础依赖维护为主，不能据此宣称性能提升。[#7334](https://github.com/codewhale-hq/Codewhale/pull/7334) · [#7337](https://github.com/codewhale-hq/Codewhale/pull/7337) · [#7336](https://github.com/codewhale-hq/Codewhale/pull/7336)
- **构建与发布链路维护**：多个 GitHub Actions 更新涉及环境配置、镜像认证和版本发布。[#7335](https://github.com/codewhale-hq/Codewhale/pull/7335) · [#7333](https://github.com/codewhale-hq/Codewhale/pull/7333) · [#7332](https://github.com/codewhale-hq/Codewhale/pull/7332)

## 5. 开发者关注点

当前没有可读取的 Issue 反馈或评论数据，**无法认定实际痛点或高频需求**。基于变更内容，建议评审重点关注：

1. **新服务接入的异常处理**：验证 API Key 配置、模型发现失败、初始模型不可用，以及模型价格信息更新时的行为。[#7340](https://github.com/codewhale-hq/Codewhale/pull/7340)
2. **依赖更新的兼容性**：重点检查异步运行时、schema 校验和缓存相关变更，避免将升级本身等同于稳定性改善。[#7334](https://github.com/codewhale-hq/Codewhale/pull/7334) · [#7337](https://github.com/codewhale-hq/Codewhale/pull/7337) · [#7336](https://github.com/codewhale-hq/Codewhale/pull/7336)
3. **发布链路的回归验证**：确认 Action 升级后，认证、发布和产物上传仍按预期运行。[#7333](https://github.com/codewhale-hq/Codewhale/pull/7333) · [#7332](https://github.com/codewhale-hq/Codewhale/pull/7332)

**结论：今日可见动态以自动化维护为主，Synap 接入是主要功能看点；在仓库归属核实、PR 合并和测试结果明确之前，不宜将这些变化表述为 DeepSeek TUI 已上线能力。**

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*