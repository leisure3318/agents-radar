# AI CLI 工具社区动态日报 2026-11-19

> 生成时间: 2026-11-19 04:29 UTC | 覆盖工具: 9 个

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

# AI CLI 工具生态横向分析报告
**日期：2026-11-19｜基于所提供的社区动态样本**

## 1. 生态全景

当前 AI CLI 的竞争焦点正从“支持更多模型和工具”，转向**长任务能否可靠执行、权限是否可控、状态是否可恢复**。产品边界持续扩展到桌面端、Web、移动接续和托管 Agent，随之增加的是跨平台路径、认证、会话恢复与环境一致性问题。MCP、ACP 和多模型网关让集成能力增强，但工具调用格式、停止原因、空消息等协议边界正在成为稳定性瓶颈。本期 9 个工具合计记录 **171 条 Issue 更新、119 条 PR 更新和 5 个 Release**；这些是给定窗口内的更新量，并非新增量，也不能直接代表用户规模或质量水平。

## 2. 各工具活跃度对比

| 工具 | Issues 更新数 | PR 更新数 | Release 情况 | 本期主要信号 |
|---|---:|---:|---|---|
| **Claude Code** | 50（展示30） | 0 | **v2.1.328** | 扩展 auto mode；升级、长会话与远程控制可靠性反馈集中 |
| **OpenAI Codex** | 50（展示30） | 45（展示20） | **0.172.0-alpha.1** | Apps 结果传递、沙箱及跨平台路径改进 |
| **Gemini CLI** | 1 | 9 | **v0.69.0**、**v0.70.0-preview.0** | 用量可视化、输入正确性；Nightly 发布失败 |
| **GitHub Copilot CLI** | 7 | 0 | 无 | ACP 错误语义、PDF 上下文估算、企业模型配置 |
| **Kimi Code CLI** | 0 | 0 | 无 | 给定窗口内无活动 |
| **OpenCode** | 41（展示30） | 40（展示20） | 无；production 晋级 PR 开放中 | Code Mode、插件权限与多模型兼容性 |
| **Pi** | 11 | 0 | 无 | 模型接入容错、扩展生命周期、会话恢复 |
| **Qwen Code** | 11 | 25（展示20） | **v0.28.0-nightly.20261118.d9ac287c9f** | Managed Agent、记忆一致性与 Web Shell 性能 |
| **DeepSeek TUI** | 0 | 0 | 无 | 给定窗口内无活动 |
| **合计** | **171** | **119** | **5 个 Release** | — |

> **口径限制：**部分记录更新时间为 11 月 18 日，沿用来源窗口；PR 的 `CLOSED` 不等于已合并，Issue 关闭也不等于已修复。Pi 的来源仓库与 Issue 归属标注不一致，跨仓库统计需谨慎。零活动仅描述本窗口，不代表项目停滞。

## 3. 共同关注的功能方向

| 共同方向 | 涉及工具 | 具体诉求与横向判断 |
|---|---|---|
| **长任务连续性与恢复** | Claude Code、Codex、OpenCode、Pi、Qwen Code | 长会话崩溃、线程恢复失败、异常消息污染历史、工具调用中断等，说明“失败后继续工作”已成为核心能力 |
| **权限可控与安全治理** | Claude Code、Codex、OpenCode、Copilot CLI、Qwen Code | Hook 失败阻断、权限设置与实际行为一致、历史授权审计、协议失败与用户拒绝区分；需求从审批弹窗走向权限全生命周期管理 |
| **跨端、远程与环境一致性** | Claude Code、Codex、Copilot CLI、OpenCode、Qwen Code | 移动接续、Windows/WSL 路径、远端执行环境、远程插件 GUI、Linux 隔离模式兼容性 |
| **模型与工具协议正确性** | Claude Code、Codex、Gemini CLI、Copilot CLI、OpenCode、Pi、Qwen Code | MCP 取消请求、工具结果传递、ACP 停止原因、XML/JSON 工具调用、推理片段边界与空消息校验 |
| **上下文、记忆与成本控制** | Claude Code、Gemini CLI、Copilot CLI、OpenCode、Pi、Qwen Code | 缓存命中、附件 token 估算、重复提示词、输出预算、记忆索引与用量展示；效率问题正在直接转化为成本问题 |
| **模型选择与编排透明度** | Claude Code、Codex、Copilot CLI | 模型家族别名、独立 effort、自适应多 Agent、组织模型推理强度与上下文容量展示 |

**共同点不是单纯增加功能，而是让能力“真实生效且可验证”。**连接成功却无法调用、权限界面与执行策略不一致、项目指令静默未加载，都反映出配置可观测性的不足。

## 4. 差异化定位分析

以下定位依据本期功能与工程方向推断，不代表完整产品能力清单。

| 工具 | 功能侧重与技术路线 | 更匹配的用户或场景 |
|---|---|---|
| **Claude Code** | auto mode 扩展至多云平台，结合 MCP Hook 和远程控制，强化自动化与既有开发工作流接入 | 已采用 Claude、需要云平台接入及跨设备接续的团队 |
| **Codex** | App、CLI、沙箱服务与线程接口协同；Apps 工具结果传递和采样接口成为重点 | 重视隔离执行、复杂工作区及应用工具集成的开发团队 |
| **Gemini CLI** | 本期可见投入偏向 CLI 输入正确性、ACP 反馈、用量可视化与发布工程 | 重视终端使用、协议集成和使用量观察的开发者 |
| **Copilot CLI** | 企业模型、身份认证、记忆作用域与编辑器衔接问题突出 | GitHub 组织用户，以及依赖企业身份和 VS Code/WSL 的团队 |
| **OpenCode** | 多模型网关、插件规则、Code Mode、远程服务器与多端界面并进 | 需要模型选择自由度、插件扩展和自建远程环境的用户 |
| **Pi** | 反馈聚焦扩展生命周期、状态接口和细粒度 conversation 数据管理，呈现可组合基础设施特征 | 构建定制 Agent、扩展或分叉聊天应用的开发者 |
| **Qwen Code** | Managed Agent、通道身份隔离、数据库锁、持久化记忆与 Web Shell 并行推进 | 需要托管运行、企业通道接入和长期会话管理的团队 |
| **Kimi Code CLI / DeepSeek TUI** | 本期无可见活动 | 不足以据此更新定位判断 |

横向看，**Claude Code 与 Codex 更突出执行工作流整合，OpenCode 与 Pi 更突出扩展和组合能力，Qwen Code 的托管运行与控制面工程特征更明显**。

## 5. 社区热度与成熟度

### 活跃度：Codex 与 OpenCode 的公开工程活动最突出

- **Codex：50 条 Issue、45 条 PR**，是本期更新量最高的项目。
- **OpenCode：41 条 Issue、40 条 PR**，问题反馈与功能开发均较密集。
- **Qwen Code：11 条 Issue、25 条 PR**，PR 多于 Issue，且覆盖性能、记忆、身份隔离与生命周期治理，呈现工程加固特征。
- **Claude Code：50 条 Issue、1 个版本，但无 PR 更新**，反馈活跃且仍在发布；不能因本仓库无 PR 就推断开发停滞。

### 讨论热度：总体偏低，尚未形成广泛共识

多数工具可见 Issue 的评论数仅 **0–4 条**，点赞多为零。OpenCode 的特殊标记兼容性 Issue 有 **9 条评论**，是样本中相对突出的讨论，但仍不足以判断大规模影响。Gemini 唯一 Issue 为机器人生成，Qwen 部分记录也来自测试或评审跟踪，不能全部算作用户需求热度。

### 成熟度：应看工程闭环，而非只看发布频率

- **快速试验信号：**Codex Alpha、Gemini Preview/Nightly、Qwen Nightly，以及 OpenCode 的 Code Mode 实验开关。
- **工程成熟化信号：**权限审计、身份隔离、故障恢复、限额语义、端到端测试和有界锁等待。
- **尚待验证的薄弱环节：**Windows/WSL 兼容、会话恢复、工作目录生命周期与异常协议容错。

因此，现有数据可以比较**迭代强度与投入方向**，不足以建立可靠的产品稳定性排名。

## 6. 值得关注的趋势信号

### ① Agent 的可靠性正在变成“状态管理”问题

Codex 的活动 worktree 清理报告、Pi 的工作目录失效和异常工具调用持久化、Qwen 的 JSONL 边界修复，共同表明：Agent 不只是聊天客户端，而是需要管理进程、文件、历史和外部状态的运行系统。

**开发者参考：**评测应增加中断恢复、目录被删除、记录损坏和重复执行测试，而不只测试任务成功率。

### ② 安全边界必须由执行层保证，不能只依赖提示词

Claude 的 Hook 失败阻断、OpenCode 的插件拒绝规则和权限审计需求，以及 Qwen 的权限行为报告，都指向更明确的执行层约束。

**开发者参考：**区分“提示中要求先询问”和“运行时必须审批”；验证失败是否阻断、授权是否可撤销、历史权限是否可审计。

### ③ 多模型支持正从“接得上”转向“长期运行兼容”

OpenCode 的空消息和推理片段异常、Pi 的非法工具调用、Qwen 的 XML/JSON 格式问题，说明兼容性主要风险位于多轮工具交互与异常路径。

**开发者参考：**模型选型应测试真实工具链、长会话及错误恢复，不能只以模型列表或单轮回答作为依据。

### ④ Token 效率正在成为运行质量指标

Copilot 的 PDF 估算、Claude 的缓存失效、Pi 的输出预算、Qwen 的提示压缩和 Gemini 的用量热力图，覆盖了估算、缓存、预算与观察多个环节。

**开发者参考：**比较每个已完成任务的总 token、缓存命中率、压缩次数与重试成本，而非只比较模型单价。

### ⑤ 产品入口越多，跨端一致性越可能决定体验上限

桌面端、CLI、Web、移动端和远程服务之间，权限、路径、认证与能力暴露容易产生偏差。

**开发者参考：**优先验证团队真实组合，例如 Windows＋WSL＋远程服务器，而非依赖单平台演示结果。

---

## 决策结论

**本期最值得关注的不是谁新增功能最多，而是谁能把“授权—执行—持久化—恢复—审计”做成可靠闭环。**短期试用可按模型生态和部署方式筛选工具；生产选型则应把工作成果保护、长任务恢复、权限强制执行和成本可观测性列为硬性验收项。

此外，Claude 的疑似会话隔离异常、Codex 的活动 worktree 清理及 OpenCode 的凭据持久化报告值得优先跟踪，但**目前均不能据此认定为已确认事故或普遍性缺陷**。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-11-19｜基于所提供的 20 条 PR、15 条 Issue**

> **数据说明：**PR 评论数均为 `undefined`、👍 均为 0，无法核实其热度排序或讨论活跃度。以下榜单按 **Issue 反馈、实际影响与功能价值**综合选取，不代表真实评论数排名。展示的 20 个 PR 均为 **OPEN**，不能据此判断合并时间。

## 1. 热门 Skills 排行：8 个重点关注项

| 重点 Skill / PR | 功能与改进 | 社区关注点 | 当前状态 |
|---|---|---|---|
| **1. skill-creator：评估可靠性** · [#1298](https://github.com/anthropics/skills/pull/1298) | 隔离触发评估、兼容 Windows，正确处理运行时故障 | 关联方向的 Issues 报告“零触发率”和并发串扰，分别有 **13、6 条评论**。关键是避免将工具故障误判为 Skill 不触发 | **OPEN** |
| **2. webapp-testing：安全执行** · [#1980](https://github.com/anthropics/skills/pull/1980) | 避免 `with_server.py` 使用 `shell=True` 启动服务 | PR 指出用户或 Agent 命令进入系统 Shell 的注入风险；焦点是测试自动化的安全边界 | **OPEN** |
| **3. docx：结果真实性校验** · [#1792](https://github.com/anthropics/skills/pull/1792) | LibreOffice 超时报错，并验证修订标记确实已清除 | 从“脚本执行结束”转向“交付物确实正确”，减少文档处理假成功 | **OPEN** |
| **4. mcp-builder：MCP 2.x 兼容** · [#1742](https://github.com/anthropics/skills/pull/1742) | 适配 `streamable_http_client` 新名称及自定义 HTTP headers 配置 | SDK 升级后的连接兼容性，以及需要认证 headers 的服务接入 | **OPEN** |
| **5. xlsx：外部链接风险检测** · [#2019](https://github.com/anthropics/skills/pull/2019) | 识别工作表级定义名称、别名间接引用的外部链接 | 修复风险检测漏报，提高电子表格重算与处理的可靠性 | **OPEN** |
| **6. Notion Spec → Implementation** · [#1245](https://github.com/anthropics/skills/pull/1245) | 将产品或技术规格拆成 Notion 任务、验收标准与进度跟踪 | 将需求文档直接转为 Claude Code 可执行的开发计划；同一 PR 还包含简历审计 Skill | **OPEN** |
| **7. md2video-audio** · [#1703](https://github.com/anthropics/skills/pull/1703) | 将 Markdown 经幻灯片流程生成带配音的 MP4 | 拓展文档到多媒体的自动化链路；“零成本”等表述属于提交者描述，尚未由所给数据验证 | **OPEN** |
| **8. Pyxel 游戏开发** · [#525](https://github.com/anthropics/skills/pull/525) | 支持 Python 复古游戏创建、调试、无头运行及画面检查 | 不只生成代码，还强调输入驱动运行和状态验证；3 月提交、11 月仍有更新 | **OPEN** |

**主要信号：**在这批样本中，比“新增多少 Skill”更突出的，是对现有 Skill 的**可靠性、安全性和可验证性**进行补强。

## 2. 社区需求趋势

### ① 安全治理与可信分发：讨论最集中的议题
- [#492](https://github.com/anthropics/skills/issues/492) 有 **46 条评论、3 个 👍**，是所给 Issues 中讨论最多的一项：社区 Skill 使用 `anthropic/` 命名空间，可能使用户误认其为官方内容。
- [#412](https://github.com/anthropics/skills/issues/412) 提出 Agent 治理 Skill，覆盖策略执行、威胁检测、信任评分和审计轨迹；该 Issue 已关闭，但不能据此认定功能已交付。
- **需求方向：**可信来源标识、权限边界、Agent 安全治理与审计。

### ② 企业工作流：组织级共享比手动分发更迫切
- [#228](https://github.com/anthropics/skills/issues/228) 有 **17 条评论、8 个 👍**，希望通过组织 Skill 库或链接共享，替代下载文件、聊天工具转发、逐人上传。
- **需求方向：**组织知识复用、团队工作流标准化。该需求明确针对 **Claude.ai**，不应直接视为 Claude Code 已有或计划中的能力。

### ③ Skill 工程化：先保证触发与评估可信
- [#556](https://github.com/anthropics/skills/issues/556) 报告评估中始终出现 0% 触发率；[#1352](https://github.com/anthropics/skills/issues/1352) 指出并发 worker 串扰导致假阴性。
- [#2064](https://github.com/anthropics/skills/issues/2064) 则指出 `theme-factory` 描述只说明“做什么”，未说明“何时使用”。
- **需求方向：**可靠评估、触发描述优化、跨平台执行，而非单纯增加 Skill 数量。

### ④ 长任务与上下文效率：减少无效占用
- [#1329](https://github.com/anthropics/skills/issues/1329) 提议 `compact-memory`，用紧凑符号表示长期 Agent 状态，已有 **10 条评论**。
- [#1487](https://github.com/anthropics/skills/issues/1487) 报告 `claude-api` 一次注入约 **156k tokens**；[#189](https://github.com/anthropics/skills/issues/189) 反馈插件内容重复导致 Skill 重复加载。
- **需求方向：**紧凑记忆、按需加载、去重，以及更低的上下文成本。

### ⑤ 质量门禁与文档完整性：交付必须可验证
- [#1385](https://github.com/anthropics/skills/issues/1385) 提出“任务前校准 → 对抗审查 → 交付验证”的三阶段质量门禁。
- [#2018](https://github.com/anthropics/skills/issues/2018) 报告 DOCX 合并脚本会丢失命名空间声明，生成无效 XML，甚至覆盖输入文件。
- **需求方向：**审查与验证流程、文档结构校验、防止静默损坏。

> **趋势边界：**当前样本不足以证明“代码审查、测试生成”已是独立热门新增 Skill 方向；更明确的证据指向通用质量门禁和现有测试工具修复。另如账号邮箱变更 [#1143](https://github.com/anthropics/skills/issues/1143) 虽有 18 个 👍，但属于平台账户需求，不宜计入 Skills 功能趋势。

## 3. 高潜力待合并 Skills

**以下是值得跟踪的候选，不是“即将合并”预测。**由于缺少 PR 评论数、审查记录和维护者反馈，无法确认哪些 PR 真正讨论活跃。

| 候选 PR | 值得跟踪的原因 | 尚不能确认的事项 |
|---|---|---|
| **[skill-creator #1298](https://github.com/anthropics/skills/pull/1298)** | 对应高讨论度的评估失真问题，影响 Skill 作者判断触发效果 | 是否完整覆盖相关故障、是否通过维护者审查 |
| **[webapp-testing #1980](https://github.com/anthropics/skills/pull/1980)** | 安全收益明确；最近更新于 11 月 1 日 | 对现有 Shell 命令链的兼容性及修复验证情况 |
| **[docx #1792](https://github.com/anthropics/skills/pull/1792)** | 同时处理超时和结果校验，直接改善交付可信度；11 月 1 日更新 | 回归测试覆盖与合并意向 |
| **[xlsx #2019](https://github.com/anthropics/skills/pull/2019)** | 问题边界清晰，针对外部引用漏检；11 月 3 日更新 | 复杂别名与公式场景的覆盖程度 |
| **[Notion 工作流 #1245](https://github.com/anthropics/skills/pull/1245)** | 新增能力中具有较强工作流价值：连接规格、任务与实施；10 月 15 日仍有更新 | 同一 PR 包含两个不同用途 Skill，审查进展未知 |

## 4. Skills 生态洞察

**当前社区最集中的诉求，是让 Skills 从“能执行的提示与脚本”升级为“来源可信、触发可靠、结果可验证、便于团队复用”的生产级能力。**

---

# Claude Code 社区动态日报
**日期：2026-11-19**  
**数据来源：[anthropics/claude-code](https://github.com/anthropics/claude-code)**

> 统计口径：所给数据包含过去 24 小时发布的 1 个版本、更新的 50 条 Issue（仅展示其中 30 条），以及 0 条 PR。下文趋势分析基于可见样本；Issue 中的故障与安全问题均为用户报告，不代表官方已确认。

## 1. 今日速览

[v2.1.328](https://github.com/anthropics/claude-code/releases/tag/v2.1.328) 扩展了 auto mode 的平台覆盖，并为 MCP 工具 Hook 增加失败阻断配置。社区反馈主要集中在桌面端远程控制、Windows 更新、长会话稳定性，以及 MCP 和第三方后端兼容性；其中一条疑似跨用户提示词泄露报告值得优先核查，但目前尚无确认结论。可见 Issue 的讨论量普遍较低，过去 24 小时没有 PR 更新记录。

## 2. 版本发布

### [v2.1.328](https://github.com/anthropics/claude-code/releases/tag/v2.1.328)

- **扩展 auto mode 支持**：Claude Opus 4.6 与 Sonnet 4.6 可在 Amazon Bedrock、Google Cloud Agent Platform、Microsoft Foundry 和 Claude apps gateway 上使用 auto mode；未指定权限模式的交互会话将以该模式启动。
- **MCP Hook 增加失败阻断配置**：`mcp_tool` Hook 新增 `"onFailure": "block"`，有助于显式配置 Hook 失败后的阻断行为。

**开发者影响：**升级后应检查未显式指定权限模式的启动流程，并验证 MCP Hook 的失败处理逻辑。所给 Release 说明在第二项末尾截断，以上仅总结可确认内容，不视为完整更新日志。

## 3. 社区热点 Issues

以下按潜在影响、可复现性与开发工作流相关性筛选，而非单纯按评论数排序。**这 10 条目前均为 OPEN，且均为 0 👍。**

| Issue | 核心反馈与关注理由 | 社区反应 |
|---|---|---|
| [#111061：疑似跨用户提示词泄露](https://github.com/anthropics/claude-code/issues/111061) | 用户称 macOS / VS Code 上的 2.1.327 在关闭 Remote Control 时，仍出现疑似其他用户的请求。若属实涉及会话隔离与隐私，需优先核查；目前不能据此认定发生数据泄露。 | 1 条评论；带安全标签，尚无所给官方确认信息。 |
| [#111067：Windows 原生更新后可执行文件缺失](https://github.com/anthropics/claude-code/issues/111067) | 从 2.1.318 更新到 2.1.327 时出现 `Failed to create executable`，用户称原文件被重命名后 PATH 上不再有可用的 `claude`。直接影响工具可用性与升级可靠性。 | 1 条评论；带 `has repro` 标签。 |
| [#111042：Linux 长时间 Bash 调用内存增长](https://github.com/anthropics/claude-code/issues/111042) | 报告称部分会话约 30 分钟内从约 250 MB 增长至 8–9 GB RSS，而同机其他会话保持稳定。对并行 Agent、长任务与资源受限环境影响较大。 | 1 条评论；尚不能由摘要确定根因。 |
| [#111085：2.1.328 在 Linux / WSL2 长会话中崩溃](https://github.com/anthropics/claude-code/issues/111085) | 用户报告交互会话运行约 4.8 小时后发生段错误，标题指向 Bun mimalloc 的内存清理步骤。是新版长时运行稳定性的重点观察项，但不宜直接认定为新版回归。 | 0 条评论；提供了较具体的版本与环境。 |
| [#111057：macOS Remote Control 自动关闭](https://github.com/anthropics/claude-code/issues/111057) | 即使开启“新会话连接 Remote Control”，本地会话仍会断开。对主要通过手机操作的用户，恢复连接意味着必须返回 Mac。 | 2 条评论，为可见样本中评论最多的 Issue；带回归标签。 |
| [#111086：Windows 桌面端压缩会话循环](https://github.com/anthropics/claude-code/issues/111086) | 用户称会话持续 compact，消耗速率额度。问题同时涉及上下文管理、任务推进和使用成本。 | 0 条评论；当前摘要信息有限，需进一步复现。 |
| [#111068：ToolSearch 加载工具导致提示词缓存失效](https://github.com/anthropics/claude-code/issues/111068) | 本地 Ollama 后端用户报告，延迟工具加载会使整个提示词缓存失效，并称 2.1.309 正常、2.1.310 起异常。长上下文第三方后端可能因此承担额外重算开销。 | 0 条评论；带回归标签，并提供版本对照。 |
| [#111077：MCP 无法取消 requestId 为 0 的请求](https://github.com/anthropics/claude-code/issues/111077) | 客户端被报告忽略 `requestId: 0` 的 `notifications/cancelled`，导致待处理的输入征询弹窗无法撤回。属于边界明确的协议兼容性问题。 | 0 条评论；带 `has repro` 标签，适合针对性回归测试。 |
| [#111064：Windows 连续两行 @import 静默失败](https://github.com/anthropics/claude-code/issues/111064) | 用户称 `~/.claude/CLAUDE.md` 中相邻两条导入均未生效。静默失败容易使团队误以为项目规范已加载，影响行为一致性。 | 0 条评论；带 `has repro` 标签。 |
| [#111063：连接器显示已连接，调用却要求认证](https://github.com/anthropics/claude-code/issues/111063) | Windows 桌面端自定义连接器可列出 222 个工具，但所有调用均返回认证要求。暴露出连接状态与实际调用能力不一致的问题。 | 0 条评论；涉及认证、MCP 与桌面端多个环节。 |

**热度判断：**当前更像是新一轮故障反馈汇集，而非已形成广泛共识的热点讨论；评论数和点赞数不足以支持“大面积故障”的结论。

## 4. 重要 PR 进展

**所给数据中，过去 24 小时更新的 PR 为 0 条，因此无法列出 10 个重要 PR，也没有可确认的修复合并进展。**

可通过 [PR 列表](https://github.com/anthropics/claude-code/pulls)继续跟踪。上述 Issue 的存在或标签状态，不应被解读为已有修复正在合并。

## 5. 功能需求趋势

### ① 模型与 effort 配置需要更灵活
用户希望定时任务支持“Opus latest”等模型家族别名、独立 effort，以及通过接口更新配置；多会话编排也出现了对子会话模型与 effort 自主配置的需求。  
相关：[定时任务配置 #111079](https://github.com/anthropics/claude-code/issues/111079)、[子会话配置 #111072](https://github.com/anthropics/claude-code/issues/111072)。后者已关闭，但所给数据未说明原因，不能视为已实现。

### ② 项目指令加载需要一致、可验证
连续 `@import` 失败，以及附加目录中的 `CLAUDE.md` 导入展开需求，表明开发者希望不同入口共享一致的项目上下文加载规则。  
相关：[#111064](https://github.com/anthropics/claude-code/issues/111064)、[#111082](https://github.com/anthropics/claude-code/issues/111082)。

### ③ 桌面端需要更可靠的移动接续
Remote Control 自动关闭、会话自动归档，以及 Windows 本地会话连接失败，共同指向跨设备会话连续性问题，但目前不能认定它们有共同根因。  
相关：[#111057](https://github.com/anthropics/claude-code/issues/111057)、[#111056](https://github.com/anthropics/claude-code/issues/111056)、[#111087](https://github.com/anthropics/claude-code/issues/111087)。

### ④ 插件与终端界面需要更多控制和反馈
需求包括面板停靠位置、Write 新文件的新增行高亮，以及长 Artifact 名称的完整展示，重点是降低多任务工作流中的识别成本。  
相关：[#111071](https://github.com/anthropics/claude-code/issues/111071)、[#111065](https://github.com/anthropics/claude-code/issues/111065)、[#111083](https://github.com/anthropics/claude-code/issues/111083)。

## 6. 开发者关注点

- **升级与长会话可靠性优先于功能扩张。** Windows 更新失败、Linux 内存增长和 WSL2 崩溃分别影响安装、资源与运行连续性。建议先在非关键环境验证升级及长任务。相关：[#111067](https://github.com/anthropics/claude-code/issues/111067)、[#111042](https://github.com/anthropics/claude-code/issues/111042)、[#111085](https://github.com/anthropics/claude-code/issues/111085)。
- **状态需要可观测，不能只显示“成功”。** 连接器显示已连接但无法调用、项目指令静默未加载，都增加了排障成本；明确的认证检测与指令加载诊断更有价值。相关：[#111063](https://github.com/anthropics/claude-code/issues/111063)、[#111064](https://github.com/anthropics/claude-code/issues/111064)。
- **成本问题与性能问题正在交汇。** compact 循环消耗额度，缓存失效增加重算，模型返工则带来额外使用成本；三类问题应分别排查，避免混为单一“模型变差”。相关：[#111086](https://github.com/anthropics/claude-code/issues/111086)、[#111068](https://github.com/anthropics/claude-code/issues/111068)、[#111039](https://github.com/anthropics/claude-code/issues/111039)。
- **安全边界需要准确，也需要可解释。** 疑似会话隔离异常应优先核查；授权安全研究被拦截的反馈，则说明用户需要更清晰的拒绝原因与申诉路径。两者均需独立验证。相关：[#111061](https://github.com/anthropics/claude-code/issues/111061)、[#111076](https://github.com/anthropics/claude-code/issues/111076)。

**今日结论：**新版本继续扩展自动化能力，但社区当前最值得跟踪的是工作流可靠性——能否安全升级、持续运行、保持远程连接，并确认工具和项目指令真正生效。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-11-19｜仓库：[openai/codex](https://github.com/openai/codex)**

> 数据口径：所提供的统计包含 50 条更新 Issues、45 条更新 PR，本文基于其中展示的 30 条 Issues 和 20 条 PR 筛选分析。部分记录的更新时间为 11 月 18 日，按来源给定的统计窗口纳入；Issue 内容属于用户报告，PR 的 `CLOSED` 状态不等同于已合并。

## 1. 今日速览

今日发布 **`0.172.0-alpha.1`**，但提供的 Release 信息没有具体变更说明。社区反馈集中在 **Windows 桌面端稳定性、沙箱权限和会话恢复**，其中自动清理活动 worktree 的潜在数据丢失风险值得优先关注。PR 方向则集中于 **Apps 工具结果传递、跨平台远程路径兼容和线程采样接口增强**。

## 2. 版本发布

### [rust-v0.172.0-alpha.1](https://github.com/openai/codex/releases/tag/rust-v0.172.0-alpha.1)
- **版本性质**：Alpha 预发布版本。
- **已知信息**：Release 正文仅包含版本号，没有功能、修复或兼容性说明。
- **使用建议**：目前无法确认下文 PR 是否包含在该版本中；生产工作流升级前应先验证关键任务与沙箱行为。

## 3. 社区热点 Issues

以下按潜在影响和技术价值筛选，而非单纯按评论排序。**这 10 条均为 OPEN、👍 为 0，讨论量仅 1–2 条，不宜视为已形成广泛共识。**

| Issue | 核心反馈与重要性 | 社区反应 |
|---|---|---|
| [#62410 自动清理删除活动 worktree](https://github.com/openai/codex/issues/62410) | 用户报告 Windows 自动清理会强制移除仍被聊天和运行中 worker 使用的 worktree。涉及工作成果保护，是本期最需优先核查的风险。 | 1 条评论；尚无修复结论。 |
| [#62397 桌面端配置沙箱后，CLI 无法执行命令](https://github.com/openai/codex/issues/62397) | 报告涉及多个 CLI 版本，指向沙箱初始化及代理端口配置差异。可能阻断 App 与 CLI 混用工作流。 | 1 条评论；提供了版本和复现线索。 |
| [#62413 Windows 重启后无法恢复聊天](https://github.com/openai/codex/issues/62413) | 已有聊天恢复失败，新消息也会停滞，直接影响长任务连续性和客户端可用性。 | 1 条评论；仍待定位。 |
| [#62349 Windows 使用中整个界面消失](https://github.com/openai/codex/issues/62349) | 报告称账户／MessagePort 桥接重置后，`authLoading` 持续为 true。问题涉及认证状态与桌面 UI 生命周期。 | 2 条评论，是所展示样本中评论较多的条目之一。 |
| [#62361 打开线程停滞数分钟](https://github.com/openai/codex/issues/62361) | Windows 打开线程时长时间卡住，但无关请求仍可响应，为排查线程加载路径提供了线索。 | 2 条评论；附带版本与日志环境信息。 |
| [#62408 Full access 在新聊天中变为 workspace-write](https://github.com/openai/codex/issues/62408) | 用户所选权限与实际生效策略不一致，而旧聊天仍保持不受限。影响权限可预测性和配置排障。 | 1 条评论；报告涉及两个模型。 |
| [#62409 Computer Use 遍历大型 ListView 导致冻结](https://github.com/openai/codex/issues/62409) | 报告指向 UI Automation 对大型原生列表的穷举遍历，体现桌面自动化在复杂控件上的性能边界。 | 1 条评论；问题场景较明确。 |
| [#62416 限额错误流丢失重置时间等信息](https://github.com/openai/codex/issues/62416) | `usage_limit_reached` 在流式处理和远程压缩路径中丢失部分限额状态，可能影响客户端提示与重试决策。 | 1 条评论；提供无需真实账户的模拟复现。 |
| [#62364 未完成任务却反复在检查点结束](https://github.com/openai/codex/issues/62364) | 用户明确给出完成标准后，代理仍在保存部分进度后结束回合。痛点是长任务执行持续性，而非是否诚实报告完成。 | 2 条评论；属于模型行为反馈，尚不能推断普遍性。 |
| [#62394 自适应多 Agent 编排与模型路由](https://github.com/openai/codex/issues/62394) | 提议提供 Manual／Adaptive 双模式，减少模型切换与任务编排的人工负担。代表从“手动使用工具”向“按任务自动组织执行”的需求。 | 2 条评论；仍处于功能提案阶段。 |

## 4. 重要 PR 进展

**以下 10 个 PR 均标记为 CLOSED；数据未提供合并状态，不能据此认定已合并或发布。PR 评论数字段为 `undefined`，无法比较讨论热度。**

| PR | 功能或修复内容 | 技术意义 |
|---|---|---|
| [#62392 向 ChatGPT Responses 透传连接器结果](https://github.com/openai/codex/pull/62392) | 新增默认关闭的 `features.connector_tool_result_passthrough`，捕获符合条件的原始 MCP 文本和结构化内容。 | 为后续请求保留更完整的工具结果，而不只依赖处理后的输出。 |
| [#62388 Responses 请求支持可选 Apps 工具结果](https://github.com/openai/codex/pull/62388) | 在 HTTP／WebSocket 请求的指定工具调用中附加 `tool_result`，支持文本及对象型 `structuredContent`。 | 为 Apps 结果传递提供协议层支持。 |
| [#62423 捕获 Code Mode 内嵌 Apps 调用结果](https://github.com/openai/codex/pull/62423) | 将结果正文捕获范围从直接 Apps 调用扩展至 Code Mode 内符合条件的嵌套 MCP 调用。 | 补齐嵌套调用场景的采样元数据。 |
| [#62421 拒绝带 provider 查询参数的结果透传](https://github.com/openai/codex/pull/62421) | 针对查询参数可能改变请求、却仍满足 URL 与请求头检查的情况增加限制。 | 收紧连接器结果透传的请求资格边界。 |
| [#62419 `thread/sample` 支持单次模型覆盖](https://github.com/openai/codex/pull/62419) | 实验性采样请求新增可选 `model`；省略或传 `null` 时继承源线程模型。 | 便于在同一线程上下文上进行不同模型采样。 |
| [#62378 移除采样提示词 4,000 字节限制](https://github.com/openai/codex/pull/62378) | 允许更长的 `thread/sample` 提示词，仍要求 `expectedTurnId` 和 `prompt` 非空白。 | 放宽复杂采样和评测输入的接口约束。 |
| [#62377 跨平台保留 workspace roots](https://github.com/openai/codex/pull/62377) | 避免客户端按本机路径规则解析远端服务器的工作区根目录。 | 改善 Windows／Unix 混合远程开发兼容性。 |
| [#62376 跨平台保留沙箱可写根目录](https://github.com/openai/codex/pull/62376) | 防止客户端因异构系统路径格式而无法解码 `workspace-write` 策略。 | 提升远程权限策略传递的可靠性。 |
| [#62386 每条沙箱命令只准备一次代理设置](https://github.com/openai/codex/pull/62386) | 避免启动阶段再次准备代理配置，覆盖已绑定的环境设置或凭据。 | 减少命令执行环境不一致；尚不能确认与具体 Issue 的修复关系。 |
| [#62389 暂停运行时沙箱完整性检查](https://github.com/openai/codex/pull/62389) | 在共享入口关闭仅用于遥测、且与沙箱强制执行策略准备重复的检查。 | 精简执行路径；**不等于关闭沙箱权限强制执行**。 |

## 5. 功能需求趋势

以下趋势基于已展示 Issues，不能代表全部 50 条的完整分布。

- **任务感知的自动编排与模型透明度**  
  社区既希望按任务自动组织多 Agent 和模型，也希望看到实际生效的模型版本与推理强度。  
  相关：[自适应开发模式 #62394](https://github.com/openai/codex/issues/62394)、[Dots 模型与推理强度展示 #62418](https://github.com/openai/codex/issues/62418)。

- **远程开发中的环境一致性与输入能力**  
  需求从“能连接远端”进一步延伸到恢复线程时选对执行环境，以及 Windows 到远端 CLI 的图片输入。  
  相关：[恢复线程的环境选择 #62385](https://github.com/openai/codex/issues/62385)、[远程会话粘贴图片 #62422](https://github.com/openai/codex/issues/62422)。

- **可理解、可验证的权限体验**  
  用户需要设置、审批提示和实际执行权限保持一致，而不只是更多权限开关。  
  相关：[Full access 不一致 #62408](https://github.com/openai/codex/issues/62408)、[按需提权未提示即拒绝 #62406](https://github.com/openai/codex/issues/62406)。

- **跨重启的任务与工具能力连续性**  
  会话恢复不仅要保留聊天记录，还应保留执行能力、工具暴露状态与有效工作目录。  
  相关：[Windows 聊天恢复失败 #62413](https://github.com/openai/codex/issues/62413)、[macOS 恢复聊天后 Computer Use 不再暴露 #62412](https://github.com/openai/codex/issues/62412)。

- **模型可用性与日常交互完善**  
  模型选择器缺项、移动端项目目录折叠状态等反馈，反映跨端体验仍有补齐需求；模型名称在此仅作为用户报告内容引用。  
  相关：[Windows 模型选择器缺项 #62425](https://github.com/openai/codex/issues/62425)、[Android 记住目录折叠状态 #62341](https://github.com/openai/codex/issues/62341)。

## 6. 开发者关注点

1. **先保护工作成果，再优化自动清理。**  
   活动聊天和 worker 使用中的 worktree 应有明确保护机制。相关开发者可优先备份、提交关键改动，并关注 [#62410](https://github.com/openai/codex/issues/62410) 的后续核查。

2. **App、CLI、沙箱服务混用增加排障复杂度。**  
   桌面端配置影响 CLI、卸载后服务残留、委派任务无法启动 WSL 等报告，说明需要清晰的组件状态诊断和生命周期管理。相关：[#62397](https://github.com/openai/codex/issues/62397)、[#62379](https://github.com/openai/codex/issues/62379)、[#62399](https://github.com/openai/codex/issues/62399)。

3. **性能问题横跨启动、会话加载和文件交互。**  
   除线程加载停滞外，还有 skill discovery 启动额外耗时、大 PDF 打开卡顿等反馈。Skill discovery Issue 虽已关闭，但数据未说明关闭原因，不能认定已修复。相关：[#62361](https://github.com/openai/codex/issues/62361)、[#62340](https://github.com/openai/codex/issues/62340)、[#62424](https://github.com/openai/codex/issues/62424)。

4. **限额信息需要准确传达，避免客户端误判。**  
   应区分配额展示／计量反馈与错误流字段丢失，不能直接将两者归为同一根因。相关：[#62365](https://github.com/openai/codex/issues/62365)、[#62416](https://github.com/openai/codex/issues/62416)。

**综合判断：**本期最值得关注的是**可靠执行链路**：工作区不被误清理、会话能恢复、权限符合预期、跨端环境保持一致。PR 已呈现协议和兼容性改进方向，但仍需等待明确的合并、发布及验证信息。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报｜2026-11-19

> 数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)。本次数据仅包含 **1 条 Issue、9 条 PR**，以下按实际数量整理，不补造条目；部分发布说明与 PR 摘要被截断，结论以可见信息为限。

## 1. 今日速览

今日发布 **v0.69.0 稳定版**与 **v0.70.0-preview.0 预览版**，可见更新包括模板替换时保留字面量 `$`，以及新增每日 Token 用量热力图命令。与此同时，Nightly 发布流程失败，被标记为 **P0**，是当前最值得关注的发布风险。代码侧重点集中在提示词历史去重、ACP 停止原因反馈，以及依赖与命令策略维护。  
相关链接：[稳定版](https://github.com/google-gemini/gemini-cli/releases/tag/v0.69.0) · [预览版](https://github.com/google-gemini/gemini-cli/releases/tag/v0.70.0-preview.0) · [发布失败 #30364](https://github.com/google-gemini/gemini-cli/issues/30364)

## 2. 版本发布

### v0.69.0：模板处理修复与用量可视化
- **修复字面量 `$` 被替换逻辑误处理的问题**：涉及 core、CLI 的模板占位符替换，改善含美元符号文本的处理准确性。[修复 PR #30136](https://github.com/google-gemini/gemini-cli/pull/30136)
- **新增 `/stats heatmap` 子命令**：用于查看每日 Token 用量热力图，便于开发者观察使用分布与消耗趋势。提供的数据未包含该功能完整 PR 链接，详见[版本页面](https://github.com/google-gemini/gemini-cli/releases/tag/v0.69.0)。

### v0.70.0-preview.0：可见记录以发布维护为主
- 已提供的变更包括 v0.69.0-preview.0、v0.68.0 的 Changelog，以及 Nightly 版本号调整。
- **暂无法从截断记录中确认更多功能变化**，不宜据此判断为重大功能更新。  
链接：[Release](https://github.com/google-gemini/gemini-cli/releases/tag/v0.70.0-preview.0) · [Changelog #30222](https://github.com/google-gemini/gemini-cli/pull/30222) · [Changelog #30224](https://github.com/google-gemini/gemini-cli/pull/30224)

## 3. 社区热点 Issues

本次仅提供 **1 条 Issue**，不足以筛选 10 条。

### #30364：Nightly 发布失败 — OPEN / P0
- **问题**：`v0.70.0-nightly.20261119.g615d6bc8c` 的 nightly-release 工作流失败。
- **为什么重要**：直接影响当日 Nightly 分发及依赖该渠道进行验证的开发者；但现有信息**不能证明稳定版受到影响**。
- **社区反应**：由 `github-actions[bot]` 自动创建，目前 **0 条评论、0 个赞**。P0 标签体现处理优先级，不代表已有广泛社区讨论。
- **待确认**：失败原因、是否重跑成功，以及 Nightly 包是否最终可用。  
链接：[Issue #30364](https://github.com/google-gemini/gemini-cli/issues/30364) · [失败工作流](https://github.com/google-gemini/gemini-cli/actions/runs/44428105108)

## 4. 重要 PR 进展

本次共有 **9 条 PR：7 条 OPEN、2 条 CLOSED**。其中 CLOSED 不等于已合并，数据未提供合并状态。

| PR | 状态 | 内容与关注价值 |
|---|---|---|
| [#30363：避免待处理提示词重复进入历史](https://github.com/google-gemini/gemini-cli/pull/30363) | OPEN | 当历史加固已将提示词合入 `apiHistory` 时，避免再次追加原始提示词；若仍独立存在，则保留完整待处理片段，确保当前处理后的提示词只发送一次。关联 #30069。 |
| [#30362：向 ACP 客户端报告 Agent 停止原因](https://github.com/google-gemini/gemini-cli/pull/30362) | OPEN | 处理 `AgentExecutionStopped` 事件，将停止原因作为助手消息返回，避免以空轮次静默结束；无原因时提供稳定的兜底信息。关联 #30199。 |
| [#30355：收紧命令策略匹配范围](https://github.com/google-gemini/gemini-cli/pull/30355) | CLOSED | 让 `commandPrefix`、`commandRegex` 生成的规则只匹配序列化工具参数中的顶层 `command`，并为正则添加非捕获分组。关注点是策略匹配准确性；是否已合并待确认。 |
| [#30359：core 升级 Zod](https://github.com/google-gemini/gemini-cli/pull/30359) | OPEN / P2 | 将 Zod 从 `3.25.76` 升至 `4.6.6`，跨越主版本，需关注兼容性。摘要引用的上游说明包含安全相关文字，但信息截断，无法据此确认项目受影响范围。 |
| [#30356：依赖固定调整与 simple-git 升级](https://github.com/google-gemini/gemini-cli/pull/30356) | CLOSED | 调整工作区依赖固定版本、根目录 `overrides` 与 Stage 2 沙箱 Dockerfile 子包版本，并将 `simple-git` 从 `3.36.0` 升至 `4.0.2`。是否已落地待确认。 |
| [#30360：批量更新 npm 依赖](https://github.com/google-gemini/gemini-cli/pull/30360) | OPEN | 一次涉及 **67 项更新**，标记为 XL；审查重点是依赖组合兼容性与回归测试。 |
| [#30366：准备下一轮 Nightly 版本](https://github.com/google-gemini/gemini-cli/pull/30366) | OPEN | 自动将版本调整为 `0.71.0-nightly.20261118.g615d6bc8c`。它与失败 Issue 中的目标版本不同，不能据此认定发布故障已解决。 |
| [#30365：v0.69.0 Changelog](https://github.com/google-gemini/gemini-cli/pull/30365) | OPEN | 自动生成稳定版变更日志，待维护者审核合并，方便用户核对升级内容。 |
| [#30361：v0.70.0-preview.0 Changelog](https://github.com/google-gemini/gemini-cli/pull/30361) | OPEN | 自动生成预览版变更日志，待维护者审核合并，有助于追踪预览渠道变化。 |

**互动说明**：PR 评论数均未提供有效值，不能视为零评论；所有条目的点赞数为 0，暂无证据支持按讨论热度排序。

## 5. 功能需求趋势

**严格从 Issue 看，目前只能确认“发布可靠性”这一关注方向**：唯一 Issue 指向 Nightly 发布失败，样本不足以判断 IDE 集成、性能优化或新模型支持等需求是否升温。[#30364](https://github.com/google-gemini/gemini-cli/issues/30364)

结合 PR 与 Release，可观察到以下**开发方向，而非已证实的社区需求排名**：

- **交互与执行可观测性**：每日 Token 热力图、ACP 停止原因反馈，都在帮助开发者理解“用了多少、为何停止”。[v0.69.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.69.0) · [#30362](https://github.com/google-gemini/gemini-cli/pull/30362)
- **上下文与输入处理正确性**：提示词历史去重、字面量 `$` 保留，聚焦输入在处理链路中不被重复或误改。[#30363](https://github.com/google-gemini/gemini-cli/pull/30363) · [#30136](https://github.com/google-gemini/gemini-cli/pull/30136)
- **依赖与策略维护**：多项依赖更新和命令规则匹配调整，显示工程维护仍是重要投入方向。[#30360](https://github.com/google-gemini/gemini-cli/pull/30360) · [#30355](https://github.com/google-gemini/gemini-cli/pull/30355)

## 6. 开发者关注点

当前数据不足以认定“高频反馈”，但可归纳出四个具体痛点：

1. **Nightly 是否按时可用**：关注失败工作流后续处理，不应把版本号更新视为发布恢复的证据。[#30364](https://github.com/google-gemini/gemini-cli/issues/30364)
2. **提示词是否被正确、且仅发送一次**：历史去重修复针对上下文组装的确定性问题，值得持续跟进测试与合并进展。[#30363](https://github.com/google-gemini/gemini-cli/pull/30363)
3. **Agent 停止时缺少解释**：ACP 的空轮次结束会增加排障成本，停止原因回传有助于客户端展示与调试。[#30362](https://github.com/google-gemini/gemini-cli/pull/30362)
4. **大规模依赖升级的回归风险**：67 项批量更新与 Zod 跨主版本升级，需要重点观察 CI、兼容性验证和最终合并结果。[#30360](https://github.com/google-gemini/gemini-cli/pull/30360) · [#30359](https://github.com/google-gemini/gemini-cli/pull/30359)

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-19**  
**仓库：[github/copilot-cli](https://github.com/github/copilot-cli)**

## 今日速览
今日提供的数据中暂无新 Release 或 PR 更新，反馈主要集中在上下文估算、权限与认证流程，以及 WSL 环境兼容性。值得优先关注的是：PDF 上下文估算偏高导致不必要的压缩，以及 ACP 权限请求错误被记为用户拒绝、进而静默终止代理回合的问题。

> **数据口径：**来源标注为“过去 24 小时内更新”，但其中 5 条 Issue 的更新时间为 11 月 18 日；以下按提供清单汇总。全部 7 条 Issue 均为 **OPEN / triage**，且均为 **0 评论、0 👍**，尚无明显社区热度或维护者确认信号。由于样本不足，不补足至 10 条。

## 社区热点 Issues
*以下按潜在影响排序，不代表官方优先级；问题表现均来自提交者报告。*

### 1. PDF 上下文估算偏高，触发不必要的压缩
**[#5517](https://github.com/github/copilot-cli/issues/5517)**  
用户报告，粘贴一个 1.9 MB 的 PDF 后，上下文估算增加约 **62 万 token**，而实际输入约为 **3.1 万 token**，随即触发自动压缩。

- **为什么重要：**估算偏差可能提前压缩仍有容量容纳的会话，影响长文档分析的上下文保留与使用体验。
- **社区反应：**暂无评论或点赞；报告提到其表现类似此前的图片估算问题。

### 2. ACP 权限请求失败被误记为用户拒绝
**[#5514](https://github.com/github/copilot-cli/issues/5514)**  
在 Copilot CLI 1.0.114、Linux/WSL2 的 ACP 模式下，客户端对 `session/request_permission` 返回 JSON-RPC 错误后，CLI 将其记录为用户交互拒绝，并静默结束代理或子代理的当前回合。

- **为什么重要：**协议错误与真实授权拒绝未被区分，可能使客户端难以判断中断原因，影响代理集成的可靠性和排障。
- **社区反应：**暂无评论或点赞，尚待维护者确认。

### 3. Entra MCP 浏览器认证静默停滞
**[#5510](https://github.com/github/copilot-cli/issues/5510)**  
用户报告，在 Linux/WSL 缺少 `xdg-open` 时，Entra MCP 浏览器登录无明显提示地停滞；通过 `/mcp` 的 Authenticate 获取链接后，又遇到 `State mismatch`。

- **为什么重要：**认证链路直接影响 MCP 工具可用性，尤其涉及无桌面组件的 Linux 或 WSL 开发环境。
- **社区反应：**暂无评论或点赞；该问题按维护者要求从 #4017 拆出，但当前条目尚无进一步讨论。

### 4. 不支持用户级记忆时，仍暴露 `scope: "user"`
**[#5516](https://github.com/github/copilot-cli/issues/5516)**  
账户无法使用用户级记忆时，`store_memory` 仍提供用户作用域选项，写入均返回 HTTP 404；仓库级写入正常，但 `/memory off` 会同时关闭两类记忆。

- **为什么重要：**能力暴露与账户实际权限不一致，且缺少按作用域关闭的控制方式，妨碍保留可用的仓库级记忆。
- **社区反应：**暂无评论或点赞，尚待分诊。

### 5. 组织托管模型缺少推理强度控制与上下文容量展示
**[#5511](https://github.com/github/copilot-cli/issues/5511)**  
通过 GitHub 组织级自定义模型设置配置的 GPT 模型可以正常选择和使用，但 `/model` 中 **Context** 与 **Reasoning** 均显示为 `—`，也没有推理强度选项。

- **为什么重要：**企业用户难以了解模型能力边界，也无法通过界面调整推理配置。
- **社区反应：**暂无评论或点赞；当前反馈针对组织托管模型场景，不能据此推断所有模型均受影响。

### 6. WSL 中 `/code` 将 Linux 路径交给 Windows VS Code
**[#5515](https://github.com/github/copilot-cli/issues/5515)**  
用户在 1.0.114-0 中报告，`/code` 生成包含 Linux 路径的 `vscode://file` URL，Windows VS Code 将其作为 Windows 路径处理，提示路径不存在。

- **为什么重要：**影响 WSL 到编辑器的工作流衔接，暴露跨系统路径与远程环境识别问题。
- **社区反应：**暂无评论或点赞，尚无已确认修复信息。

### 7. iTerm2 后台标签页启动后持续使用简化样式
**[#5512](https://github.com/github/copilot-cli/issues/5512)**  
CLI 启动时等待终端颜色响应约 2 秒；若从未选中的 iTerm2 标签页启动、响应较晚到达，报告称该响应会被丢弃，整个会话保持简化外观。

- **为什么重要：**主要影响终端界面一致性，提示启动时的终端能力探测缺少迟到响应恢复机制。
- **社区反应：**暂无评论或点赞，影响范围仍待确认。

## 重要 PR 进展
提供的数据中，过去 24 小时内更新的 PR 为 **0 条**，暂无可报告的重要进展，也无法确认上述问题是否已有对应修复。

[查看仓库 PR 列表](https://github.com/github/copilot-cli/pulls)

## 功能需求趋势
本批样本以缺陷报告为主，以下是从中体现的能力诉求，**不代表已形成社区共识**：

| 方向 | 体现的诉求 | 相关 Issues |
|---|---|---|
| **跨平台与 IDE 集成** | 正确识别 WSL 路径、完善 Linux 外部依赖检测、恢复迟到的终端能力响应 | [#5515](https://github.com/github/copilot-cli/issues/5515)、[#5510](https://github.com/github/copilot-cli/issues/5510)、[#5512](https://github.com/github/copilot-cli/issues/5512) |
| **代理执行可靠性** | 区分协议失败、认证异常与用户拒绝，避免静默中断 | [#5514](https://github.com/github/copilot-cli/issues/5514)、[#5510](https://github.com/github/copilot-cli/issues/5510) |
| **上下文与记忆管理** | 更准确的附件 token 估算，以及按作用域控制记忆能力 | [#5517](https://github.com/github/copilot-cli/issues/5517)、[#5516](https://github.com/github/copilot-cli/issues/5516) |
| **企业模型能力一致性** | 组织托管模型也应展示上下文容量，并提供适用的推理强度控制 | [#5511](https://github.com/github/copilot-cli/issues/5511) |

## 开发者关注点
- **失败原因应可见、可区分。**认证停滞和权限请求错误都涉及错误语义或提示不足，增加集成排障成本。[#5510](https://github.com/github/copilot-cli/issues/5510) · [#5514](https://github.com/github/copilot-cli/issues/5514)
- **能力展示应与实际可用性一致。**不可用的记忆作用域仍被提供，而可用的组织模型缺少能力信息，均削弱使用预期。[#5516](https://github.com/github/copilot-cli/issues/5516) · [#5511](https://github.com/github/copilot-cli/issues/5511)
- **自动化行为需要准确依据。**上下文压缩依赖可靠估算；错误估算可能让正常文档输入触发不必要的会话处理。[#5517](https://github.com/github/copilot-cli/issues/5517)
- **WSL 是本批反馈中的突出兼容性场景。**路径打开、浏览器认证和 ACP 权限流程均涉及该环境，值得持续观察，但尚不足以判断整体故障率。[#5515](https://github.com/github/copilot-cli/issues/5515) · [#5510](https://github.com/github/copilot-cli/issues/5510) · [#5514](https://github.com/github/copilot-cli/issues/5514)

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报｜2026-11-19

> 数据来源：[anomalyco/opencode](https://github.com/anomalyco/opencode)。过去 24 小时共 41 条 Issue、40 条 PR 更新；以下分析基于提供的 30 条 Issue、20 条 PR 摘要。**Closed 不等于已修复或已合并**；PR 评论数缺失，不据此判断讨论热度。

## 一、今日速览

今天没有新 Release，但已有将 `dev` 推向 `production` 的[发布晋级 PR #64784](https://github.com/anomalyco/opencode/pull/64784)，仍处于开放状态。社区反馈集中在**模型协议兼容性、凭据与权限安全、多端状态一致性**；开发侧则持续推进 Code Mode、插件权限规则和远程服务器连接能力。

## 二、社区热点 Issues

以下按影响范围、风险和开发者相关性筛选，不单纯按评论数排序。

| Issue | 主要问题与重要性 | 社区反应与状态 |
|---|---|---|
| [#64750：v2 凭据持久化与敏感 URL 执行](https://github.com/anomalyco/opencode/issues/64750) | 报告称 v2.3.2 默认配置下，秘密信息未经脱敏写入日志和会话存储，含凭据的远程 URL 执行前也未确认。关系到 Agent 的安全边界，应优先核实。 | **Open，2 条评论**。是已关闭 v1 报告 #64745 的后续；目前只能视为用户报告，不能据此认定漏洞已确认。 |
| [#64724：模型输出特殊标记导致停止](https://github.com/anomalyco/opencode/issues/64724) | 使用 Qwen3.8-Flash-Next 时，输出包含 `<\|im_end\|>` 会导致 OpenCode 停止，暴露模型输出与控制标记处理的兼容性问题。 | **Closed，9 条评论**，是展示样本中讨论最多的 Issue；摘要未说明关闭原因或修复情况。 |
| [#64777：TUI 文件内容缓存未及时刷新](https://github.com/anomalyco/opencode/issues/64777) | Windows 下，外部编辑器修改文件后，内置打开文件功能仍可能显示旧内容，影响开发者对工作区状态的判断。 | **Open，4 条评论**，属于当日较受关注的工作流问题。 |
| [#64773：非交互式管理员任务凭据来源](https://github.com/anomalyco/opencode/issues/64773) | 希望接入 Windows Credential Manager／DPAPI 等本地凭据源，解决无头环境或无法操作 UAC 时的提权任务，同时避免明文存储。 | **Open，4 条评论**。体现自动化能力与最小权限、安全存储之间的设计需求。 |
| [#64788：远程服务器插件没有 GUI](https://github.com/anomalyco/opencode/issues/64788) | Desktop 仅从自身 sidecar 加载插件 GUI，连接远程服务器时虽然能列出插件，却无法获得对应界面，限制远程插件体验。 | **Open，3 条评论**，带有 `triaging`、`pending close` 标签，后续处理方式尚待观察。 |
| [#64792：推理片段边界重叠导致会话中断](https://github.com/anomalyco/opencode/issues/64792) | 报告称经 Vercel AI Gateway 调用部分 Gemini 模型时，出现 `reasoning start before end`，工具调用轮次停止且无法恢复。 | **Open，1 条评论**，标记 `status/repro-simulated`；重点在协议适配和异常恢复能力。 |
| [#64771：空 assistant 消息被上游拒绝](https://github.com/anomalyco/opencode/issues/64771) | 空内容消息仍会发送至 Bedrock、DeepSeek 等严格校验的服务，触发 400，后续请求持续失败，可能使会话陷入不可用状态。 | **Open，1 条评论**，标记 `status/repro-simulated`。说明请求规范化需要覆盖更多边界情况。 |
| [#64752：Shell 输出目录缺失导致命令无法执行](https://github.com/anomalyco/opencode/issues/64752) | macOS v2.3.2 无法自动创建 Shell 输出捕获目录，导致命令执行失败，直接影响核心工具链可用性。 | **Open，2 条评论**，标记 `status/repro-simulated`，值得优先排查初始化流程。 |
| [#64714：winget 安装无法及时升级](https://github.com/anomalyco/opencode/issues/64714) | 用户报告 winget CLI 清单停留在 2.2.7，且 `opencode upgrade` 因识别到 winget 安装而跳过更新，形成升级阻塞。 | **Open，2 条评论**，带 `reproduced` 标签，是证据较明确的分发渠道问题。 |
| [#64753：无需模型参与的权限审计](https://github.com/anomalyco/opencode/issues/64753) | 希望直接查看项目累积保存的全部权限，用于重新评估长期授权风险，补足“授权之后如何治理”的能力。 | **Open，1 条评论**。讨论量不高，但与凭据保护、插件权限控制形成清晰的安全需求链。 |

## 三、重要 PR 进展

以下功能均应结合 PR 状态理解，**不能视为已经进入正式版本**。

| PR | 状态 | 功能或修复内容 |
|---|---|---|
| [#64784：将 dev 晋级 production](https://github.com/anomalyco/opencode/pull/64784) | **Open** | 汇集上一轮晋级以来的 core、app、CLI 变更，以及 Tidepool Alpha Free、Gemini 4 Neon 的 Console 文档，是下一轮发布内容的观察入口。 |
| [#64789：插件权限钩子支持拒绝规则](https://github.com/anomalyco/opencode/pull/64789) | **Open** | 新增 `permission` hook 的 `experimental.rules`，让服务端插件为会话中的 Agent 添加拒绝规则，不再局限于逐次调用时作出决定。 |
| [#64790：展示运行中的 Code Mode 脚本](https://github.com/anomalyco/opencode/pull/64790) | **Open** | 在桌面／Web 应用中将 Code Mode 脚本纳入运行任务展示，并让输入区活动提示计入转入后台的脚本，提高执行过程可见性。 |
| [#64761：开发构建默认启用 full_codemode](https://github.com/anomalyco/opencode/pull/64761) | **Closed** | 提案使 `full_codemode` 在 local／dev 构建中默认开启、正式构建默认关闭，并纳入全量实验开关。摘要未提供合并信息。 |
| [#64775：Todo 保持显式选择启用](https://github.com/anomalyco/opencode/pull/64775) | **Closed** | 针对 #64761 涉及的开关行为，恢复 Todo 必须单独启用的设置；即便开启 `all`，也不应自动启用实验性 `todowrite`。 |
| [#64774：文件工具依据目标路径选择执行环境](https://github.com/anomalyco/opencode/pull/64774) | **Closed** | 将文件操作从固定使用会话环境，调整为依据解析后的路径确定环境，为本地磁盘与远程工作区的环境区分提供基础。 |
| [#64781：支持带路径前缀的服务器地址](https://github.com/anomalyco/opencode/pull/64781) | **Open** | 允许通过配对链接或服务器地址连接部署在路径前缀下的服务，改善反向代理、子路径部署场景；当前依赖另一分支。 |
| [#64770：图像生成转为后台任务](https://github.com/anomalyco/opencode/pull/64770) | **Open** | 将服务器端图像生成调整为类似视频生成的后台任务模式，改变长耗时生成请求的处理方式。 |
| [#64764：自动更新 `name@latest` 插件](https://github.com/anomalyco/opencode/pull/64764) | **Open** | 对明确声明 `@latest` 的插件自动更新，其他版本声明维持现有流程，在便利性与版本可控性之间作出区分。 |
| [#64743：修复 Windows 灰度检查例外匹配](https://github.com/anomalyco/opencode/pull/64743) | **Closed** | 针对路径分隔符不一致导致例外规则失效的问题，处理 Windows 上 172 项误报，与 Issue #64740 对应；是否合并仍需确认。 |

## 四、功能需求趋势

### 1. 权限治理从“弹窗确认”走向完整生命周期管理
需求同时覆盖安全凭据来源、授权查询、历史权限审计和敏感数据脱敏。用户不仅希望 Agent 能执行任务，也需要清楚知道它**已获准做什么、凭据留在哪里**。  
相关：[凭据来源 #64773](https://github.com/anomalyco/opencode/issues/64773) · [权限审计 #64753](https://github.com/anomalyco/opencode/issues/64753) · [插件无提示权限查询 #64787](https://github.com/anomalyco/opencode/issues/64787)

### 2. 模型支持的重点转向协议正确性与成本可预测性
特殊标记、推理片段、空消息、模型可见性和提示词缓存共同表明：“能列出模型”并不等于“能稳定、经济地使用模型”。  
相关：[空消息 #64771](https://github.com/anomalyco/opencode/issues/64771) · [自定义路由缓存 #64783](https://github.com/anomalyco/opencode/issues/64783) · [移动端模型缺失 #64762](https://github.com/anomalyco/opencode/issues/64762)

### 3. 本地、远程、多端体验需要一致
远程插件 GUI 缺失、移动 Web 底栏占用空间、ACP 模型标签暴露内部 ID，说明跨客户端功能一致性和展示质量仍有改进空间。  
相关：[远程插件 #64788](https://github.com/anomalyco/opencode/issues/64788) · [移动布局 #64712](https://github.com/anomalyco/opencode/issues/64712) · [ACP 标签 #64785](https://github.com/anomalyco/opencode/issues/64785)

### 4. 会话和工作区状态应可靠恢复
文件缓存、Todo 历史分页、会话内执行 `git init` 后无法正确恢复文件，都指向状态刷新和恢复机制的边界问题。  
相关：[文件缓存 #64777](https://github.com/anomalyco/opencode/issues/64777) · [Todo 恢复 #64759](https://github.com/anomalyco/opencode/issues/64759) · [Git 状态检测 #64758](https://github.com/anomalyco/opencode/issues/64758)

## 五、开发者关注点

- **先保证失败后能继续工作。** 协议错误或非法消息可能让整个会话持续失败；请求校验、错误隔离和会话修复能力，比单次错误提示更重要。见 [#64792](https://github.com/anomalyco/opencode/issues/64792)、[#64771](https://github.com/anomalyco/opencode/issues/64771)。
- **权限需要可解释、可审计。** 已保存授权和敏感信息处理应有独立于模型的检查入口；凭据报告也需要明确的验证与处置反馈。见 [#64753](https://github.com/anomalyco/opencode/issues/64753)、[#64750](https://github.com/anomalyco/opencode/issues/64750)。
- **基础工作流仍存在平台差异。** Windows 更新渠道、路径处理及 macOS Shell 初始化问题，都会直接增加安装、贡献和日常使用成本。见 [#64714](https://github.com/anomalyco/opencode/issues/64714)、[#64740](https://github.com/anomalyco/opencode/issues/64740)、[#64752](https://github.com/anomalyco/opencode/issues/64752)。
- **额度与计费反馈需要更透明。** 免费模型限流、递增冷却时间和自定义路由缓存未命中，影响用户对可用性和成本的预期。见 [#64754](https://github.com/anomalyco/opencode/issues/64754)、[#64756](https://github.com/anomalyco/opencode/issues/64756)、[#64783](https://github.com/anomalyco/opencode/issues/64783)。

**分析结论：** 当前样本反映的核心诉求不是单纯增加功能，而是让 Agent 的**执行更可靠、授权更透明、跨端行为更一致**。后续应重点跟踪上述高影响问题的验证结果，以及 [production 晋级 PR](https://github.com/anomalyco/opencode/pull/64784) 最终实际包含的变更。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-11-19

## 1. 今日速览

本次数据窗口内共更新 **11 条 Issue，均已关闭**；未发现新版本发布或 PR 更新。讨论主要集中在 **模型接口兼容性、会话恢复与上下文处理、扩展生命周期及状态接口**，其中进程误杀风险和异常工具调用持久化问题值得优先排查。

> **数据说明**：关闭状态不代表问题已修复；所给数据未包含关闭原因或关联提交。数据来源标注为 `badlogic/pi-mono`，但 Issue 归属标注为 `earendil-works/pi`，下文链接按后者生成。

## 2. 社区热点 Issues

以下按潜在影响与开发者相关性筛选 10 条。**全部已关闭、均为 0 个 👍**；评论量较少，暂不足以判断广泛共识。

### 1. 进程 PID 复用可能导致误杀无关进程
**[#12299](https://github.com/earendil-works/pi/issues/12299)｜1 条评论**

报告指出，Unix 下 `pi-env` 的 `kill_tree` 在进程组终止失败后回退到 `kill(pid)`；若原命令已退出且 PID 被复用，延迟的超时或取消操作可能终止无关进程。**涉及宿主环境安全与任务隔离**，运行并行任务或自动清理流程的开发者应重点关注；目前反馈主要来自代码审查发现，数据中未提供实际事故记录。

### 2. 异常工具调用被持久化，导致会话无法恢复
**[#12302](https://github.com/earendil-works/pi/issues/12302)｜1 条评论**

OpenAI 兼容端点若返回空 `id`、空函数名的工具调用，相关记录可能被保存，恢复会话时触发 HTTP 400、缺少 `tool_call_id`。**影响不仅是单次请求失败，还可能污染后续会话恢复**，凸显工具调用校验与历史数据容错的重要性。

### 3. Anthropic 上下文计量异常，可能陷入极低输出额度循环
**[#12293](https://github.com/earendil-works/pi/issues/12293)｜2 条评论**

用户报告，使用 Anthropic 服务端工具时，上下文读取量出现重复计量，随后额度限制逻辑可能持续将 `max_tokens` 压至 1。**关系到长上下文代理能否继续执行任务**，值得核查 token 用量统计、输出预算及异常恢复策略。

### 4. Anthropic 流缺少停止原因，回答被丢弃并回退提示缓存
**[#12301](https://github.com/earendil-works/pi/issues/12301)｜1 条评论**

当服务端流结束却未提供停止原因时，当前路径会抛出错误；报告称这会丢弃已生成回答并回退提示缓存。**核心问题是如何兼顾协议严格性与部分结果保留**，对不稳定网络或兼容服务接入尤其重要。

### 5. 扩展启动阶段触发运行，遗漏动态发现的技能与提示
**[#12297](https://github.com/earendil-works/pi/issues/12297)｜3 条评论**

扩展在 `session_start` 或 `resources_discover` 中主动启动运行时，可能早于动态资源应用完成，导致该轮未加载返回的技能与提示。**暴露扩展生命周期的时序边界**；这是本批数据中评论最多的条目，但讨论规模仍较小。

### 6. 工作目录被删除后，`codemode` 沙箱持续失败
**[#12300](https://github.com/earendil-works/pi/issues/12300)｜2 条评论**

用户在 Git worktree 被外部清理后，遇到后续所有 `codemode` 调用因 `process.cwd()` 的 `ENOENT` 失败。**与 worktree 自动清理、多代理开发流程直接相关**，反映长会话需要更明确的工作目录失效检测与恢复机制。

### 7. 扩展修改编辑器内容后，TUI 未及时重绘
**[#12295](https://github.com/earendil-works/pi/issues/12295)｜2 条评论**

使用 `pi-file` 扩展时，生成的 `<file>` 标签有时延迟显示；报告推测 `pasteToEditor()` 修改状态后未请求重绘，标题也涉及 `setEditorText()`。**影响扩展操作的即时反馈与界面一致性**；根因仍应以代码或修复记录为准。

### 8. 希望只读访问其他扩展设置的状态
**[#12298](https://github.com/earendil-works/pi/issues/12298)｜1 条评论**

开发者希望读取、监控通过 `ctx.ui.setStatus()` 设置的状态，以同步到远程 Web 界面。**需求指向扩展间互操作和会话状态可观测性**，而不只是终端状态展示。

### 9. 希望按单个 conversation 截断或删除持久化记录
**[#12296](https://github.com/earendil-works/pi/issues/12296)｜1 条评论**

一个 Session 内可能包含分叉、根对话与任务子对话，当前需求是只删除其中某个 conversation 的记录，而非移除整个 Session。**对分叉聊天产品的数据生命周期管理很重要**，提议接口为 `Tx.truncateConversation`。

### 10. 扩展选择器希望可选择不报告“阻塞”
**[#12292](https://github.com/earendil-works/pi/issues/12292)｜1 条评论**

当前 `select()` 总会通过 OSC 7501 报告会话处于 blocked 状态，即便弹窗并不需要用户作出关键决策。提议为 `ExtensionUIDialogOptions` 增加 `blocked?: BlockedStatus | false`，**让外部监控能区分普通交互与真正的等待决策**。

## 3. 重要 PR 进展

**本次数据窗口内无 PR 更新，无法列出 10 个重要 PR。** 同时，所给 Issue 数据未附关联 PR，不能据此确认修复是否已实现或合并。

仓库入口：[badlogic/pi-mono](https://github.com/badlogic/pi-mono)

## 4. 功能需求趋势

以下是本批样本呈现的方向，并非基于长期数据的热度排名。

| 方向 | 需求信号与意义 | 相关 Issues |
|---|---|---|
| **模型接入容错与上下文管理** | 异常工具调用、缺失停止原因、token 计量与网关错误均影响连续执行；接入质量不止是“支持某模型” | [#12302](https://github.com/earendil-works/pi/issues/12302)、[#12301](https://github.com/earendil-works/pi/issues/12301)、[#12293](https://github.com/earendil-works/pi/issues/12293)、[#12294](https://github.com/earendil-works/pi/issues/12294) |
| **扩展生命周期与状态互操作** | 希望明确资源何时可用、状态如何读取、哪些交互应标记为阻塞，为远程界面和自动化集成提供可靠接口 | [#12297](https://github.com/earendil-works/pi/issues/12297)、[#12298](https://github.com/earendil-works/pi/issues/12298)、[#12292](https://github.com/earendil-works/pi/issues/12292) |
| **细粒度会话数据管理** | 从整体 Session 管理走向单 conversation 的删除与截断，以支持分叉聊天应用 | [#12296](https://github.com/earendil-works/pi/issues/12296) |
| **动态开发环境韧性** | worktree 删除、任务退出和 PID 复用等环境变化，需要安全且可恢复的处理方式 | [#12300](https://github.com/earendil-works/pi/issues/12300)、[#12299](https://github.com/earendil-works/pi/issues/12299) |

## 5. 开发者关注点

- **避免一次异常破坏后续工作流**：错误工具调用不应让会话恢复持续失败，缺失停止原因时也需要考虑保留已有输出。见 [#12302](https://github.com/earendil-works/pi/issues/12302)、[#12301](https://github.com/earendil-works/pi/issues/12301)。
- **让扩展行为可预测、可观测**：资源加载完成时间、状态读取能力、编辑器刷新和阻塞信号需要清晰契约。见 [#12297](https://github.com/earendil-works/pi/issues/12297)、[#12298](https://github.com/earendil-works/pi/issues/12298)、[#12295](https://github.com/earendil-works/pi/issues/12295)、[#12292](https://github.com/earendil-works/pi/issues/12292)。
- **提高错误归因清晰度**：`radius` / `recursive/flint` 请求返回 HTTP 402，却展示 “Describe-file request failed”，容易让用户难以判断是计费、网关还是 Pi 自身问题。见 [#12294](https://github.com/earendil-works/pi/issues/12294)。
- **将安全与恢复能力纳入自动化设计**：进程终止应防止误杀，工作目录消失后应提供明确恢复路径。见 [#12299](https://github.com/earendil-works/pi/issues/12299)、[#12300](https://github.com/earendil-works/pi/issues/12300)。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报｜2026-11-19

> 数据来源：[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)。本期窗口内有 1 个 Nightly 发布、11 条 Issue 更新、25 条 PR 更新；PR 分析基于提供的 20 条记录。PR 评论数缺失，且 `CLOSED` 不等同于已合并，以下不据此推断合并状态。

## 1. 今日速览

今天的开发重点集中在 **Managed Agent 可靠性、Web Shell 性能和会话记忆优化**，涉及通道注册身份隔离、锁等待超时、历史回放输入延迟及首请求提示压缩。用户侧值得重点跟进的是“询问权限”设置疑似未被遵守、工具调用格式异常，以及 Linux 扩展执行模式兼容性问题；这些仍是待核实或待解决的反馈。与此同时，社区发布了新 Nightly，可见更新包括对真实定时 `/loop` 触发的端到端测试。

## 2. 版本发布

### [v0.28.0-nightly.20261118.d9ac287c9f](https://github.com/QwenLM/qwen-code/releases/tag/v0.28.0-nightly.20261118.d9ac287c9f)

- **已知更新**：Managed Agent 全栈 E2E 测试开始观察真实的定时 `/loop` 触发，而不只是验证调度配置，有助于发现调度链路的集成问题。关联 [PR #17506](https://github.com/QwenLM/qwen-code/pull/17506)。
- **信息边界**：提供的 Release Notes 在下一条 `fix(verify-pr…` 处截断，无法完整总结本次修复范围。这是 Nightly 构建，不应视为稳定版发布。

## 3. 社区热点 Issues

以下按潜在影响与可行动性筛选，而非按热度排名；所选 Issue 均为 **0 👍**，讨论量为 1–4 条，尚不足以代表广泛共识。

| Issue | 重要性与当前进展 | 社区反应 |
|---|---|---|
| [#17757 “询问权限”设置疑似未被遵守](https://github.com/QwenLM/qwen-code/issues/17757) | **P2，开放，待补充信息**。用户报告 Qwen 3.7 plus 在要求审批或明确禁止修改后仍执行更改。直接关系到代理操作的可控性，但尚不能据此判定为已确认的权限机制漏洞。 | 3 条评论；报告者称多次发生，并表达明显担忧。 |
| [#17774 工具调用使用 XML 而非 JSON](https://github.com/QwenLM/qwen-code/issues/17774) | **P3，开放**。用户反馈模型输出 XML 工具调用、混淆工具桥接与直接调用，导致当前轮次停止，影响长时间运行任务的连续性。 | 3 条评论；用户称近几周持续更新后出现，具体根因未定。 |
| [#17754 Linux 扩展执行模式存在兼容性空档](https://github.com/QwenLM/qwen-code/issues/17754) | **P2，开放，需讨论**。现有 `linux-cgroup` 依赖 cgroup v2，`developer-process-group` 仅支持 macOS，使部分 Linux 主机缺少可用执行模式。 | 2 条评论；需要兼顾平台覆盖与进程隔离保障。 |
| [#17787 Managed Runtime 调用结果未知时阻塞会话的测试失败](https://github.com/QwenLM/qwen-code/issues/17787) | **P1，开放，待人工处理**。涉及“无法获知工具调用结果时阻塞会话”的关键行为测试，应先区分确定性缺陷和偶发失败，避免通过弱化测试掩盖问题。 | 机器人报告，3 条评论；标记为 `autofix/skip`。 |
| [#17772 归档会话缺少搜索、筛选与排序](https://github.com/QwenLM/qwen-code/issues/17772) | **P2，开放，功能请求**。Web Shell 归档面板缺少名称搜索、工作区筛选、排序及归档时间，随着会话积累会明显增加检索成本。 | 2 条评论；需求集中在长期使用后的信息管理能力。 |
| [#17769 钉钉注册身份隔离的后续诊断与去重范围](https://github.com/QwenLM/qwen-code/issues/17769) | **P3，开放**。在 #17742 将账本绑定完整注册身份的基础上，继续跟踪诊断和去重范围问题，关系到多所有权场景下的事件处理正确性。 | 4 条评论，为本批 Issue 中最多；属于评审后续项。 |
| [#17778 工作区产物库测试加固](https://github.com/QwenLM/qwen-code/issues/17778) | **P3，开放**。围绕已交付的 Managed workspace artifact library，补充测试并跟踪一项读取路径优化，体现功能上线后的质量收敛。 | 3 条评论；记录了从 #17728 评审中延期处理的事项。 |
| [#17781 服务关闭跟踪与配对限流测试补齐](https://github.com/QwenLM/qwen-code/issues/17781) | **P3，开放**。补齐 shutdown tracker 覆盖并推动配对限流测试共享夹具，减少重复测试代码及生命周期边界遗漏。 | 3 条评论；明确作为 #17737 的非阻塞评审后续工作。 |
| [#17761 SSE 配对监听器限流测试不稳定](https://github.com/QwenLM/qwen-code/issues/17761) | **P2，已关闭**。关联 PR 将清理顺序调整为先关闭 daemon、再删除日志临时目录，是本期 CI 稳定性治理的具体案例；关联 PR 的合并状态未提供。 | 机器人报告，3 条评论；关联 [PR #17764](https://github.com/QwenLM/qwen-code/pull/17764) 也已关闭。 |
| [#17770 助手回复朗读与本地 TTS](https://github.com/QwenLM/qwen-code/issues/17770) | **开放，待分诊**。希望在 Desktop / Web Shell 为回复增加朗读按钮，并支持本地离线引擎，兼顾可访问性和文本隐私。 | 1 条评论；目前仍是早期需求信号。 |

## 4. 重要 PR 进展

以下 10 项均处于 **OPEN** 状态，描述的是拟议变更，不代表已发布。

| PR | 功能或修复内容 | 预期价值 |
|---|---|---|
| [#17789 压缩内联记忆与首请求提示](https://github.com/QwenLM/qwen-code/pull/17789) | 缩短文件记忆策略提示，同时保留保存、更新和遗忘规则；新会话省略空记忆目录，并处理最后一条记忆清除后的目录快照失效。 | 减少常驻提示负担，同时维持记忆语义一致性。 |
| [#17788 降低历史回放期间的输入延迟](https://github.com/QwenLM/qwen-code/pull/17788) | 将转录列表 overscan 从 20 行降至 15 行；首次挂载采用缓存或估算尺寸，再由 `ResizeObserver` 校正，并恢复表格滚动位置。 | 改善长会话回放时的交互流畅度，保留增强 Markdown 表格。 |
| [#17786 批量处理主题变量读写](https://github.com/QwenLM/qwen-code/pull/17786) | 先读取 CSS 自定义属性快照，再向 portal 根节点及可选 Shadow DOM host 写入主题属性。 | 减少样式读写交错，为 Web Shell 渲染性能提供针对性优化。 |
| [#17785 由运行时重建记忆提取索引](https://github.com/QwenLM/qwen-code/pull/17785) | 提取器负责去重和写主题文档；运行时依据成功写入回执重建用户、项目索引，并禁止提取器直接写根索引。 | 明确索引维护责任，降低记忆文档与索引不一致的风险。 |
| [#17777 将配额耗尽的回退模型标为会话内终止不可用](https://github.com/QwenLM/qwen-code/pull/17777) | 扩展可选启用的模型可用性账本，对永久配额耗尽的 fallback 模型停止后续轮次重复探测。 | 减少无效重试及重复失败带来的延迟。 |
| [#17776 为外部所有权锁等待设置上限](https://github.com/QwenLM/qwen-code/pull/17776) | 外部 Workspace 所有权检查获取 tenant placement lock 时，应用现有 10 秒语句超时，并增加 MySQL 回归测试。 | 限制锁竞争造成的长时间等待，同时保留原事务与锁顺序。 |
| [#17775 GitHub 通道账本绑定完整注册身份](https://github.com/QwenLM/qwen-code/pull/17775) | 将 Managed GitHub adapter 的持久化账本绑定到完整控制面注册身份，对齐企业微信、钉钉方案。 | 强化注册身份之间的状态隔离，降低跨身份复用账本的风险。 |
| [#17773 修复钉钉连接挂起导致进程日志被静音](https://github.com/QwenLM/qwen-code/pull/17773) | 自行管理端点发现，支持中止且保持静默，移除 SDK connect 外层的进程级 console 抑制。 | 避免连接挂起影响全进程日志，改善故障可观测性。 |
| [#17771 中断追加后保持 JSONL 记录边界](https://github.com/QwenLM/qwen-code/pull/17771) | 追加前检查文件尾字节；若存在未终止尾部，则在下一条记录前加入换行。 | 让后续完整记录保持可读，避免残缺尾部继续污染新记录。 |
| [#17782 预先显示工作流声明的全部阶段](https://github.com/QwenLM/qwen-code/pull/17782) | 在执行视图展示 `meta.phases` 中尚未到达的阶段，按声明顺序排列在已访问阶段之后。 | 提升工作流进度的可解释性，让用户提前了解后续步骤。 |

## 5. 功能需求趋势

从全部 11 条 Issue 看，需求主要集中在以下方向：

- **代理可控性与工具调用正确性**：权限确认疑似失效、XML/JSON 调用格式混淆，都指向“代理是否按预期执行”的基础信任问题。见 [#17757](https://github.com/QwenLM/qwen-code/issues/17757)、[#17774](https://github.com/QwenLM/qwen-code/issues/17774)。
- **Managed 部署兼容性与身份边界**：Linux 执行环境覆盖、钉钉注册身份诊断及去重，反映托管运行场景对平台适配和状态隔离的要求。见 [#17754](https://github.com/QwenLM/qwen-code/issues/17754)、[#17769](https://github.com/QwenLM/qwen-code/issues/17769)。
- **长期会话的信息管理**：归档搜索、工作区筛选、排序和时间信息，是本期最明确的会话管理功能诉求。见 [#17772](https://github.com/QwenLM/qwen-code/issues/17772)。
- **测试稳定性与上线后加固**：调用结果未知时的会话阻塞、SSE 限流、关闭流程和产物库测试占据多条记录。部分由机器人或评审跟踪产生，反映工程治理重点，不能直接等同于用户需求热度。见 [#17787](https://github.com/QwenLM/qwen-code/issues/17787)、[#17781](https://github.com/QwenLM/qwen-code/issues/17781)、[#17778](https://github.com/QwenLM/qwen-code/issues/17778)、[#17755](https://github.com/QwenLM/qwen-code/issues/17755)。
- **隐私友好的可访问性交互**：本地离线 TTS 将朗读便利性与“不上传回复文本”的隐私诉求结合，但目前仅有单条早期请求。见 [#17770](https://github.com/QwenLM/qwen-code/issues/17770)。

## 6. 开发者关注点

1. **优先复现权限与工具协议问题。** 需要核查具体模型、权限配置、调用路径和长会话上下文，区分模型行为、提示约束与执行层权限问题，避免仅凭现象定位根因。见 [#17757](https://github.com/QwenLM/qwen-code/issues/17757)、[#17774](https://github.com/QwenLM/qwen-code/issues/17774)。
2. **CI 去抖应修复生命周期问题，而非放宽断言。** 当前案例涉及 daemon 关闭、日志排空和临时目录清理顺序；P1 测试报告也明确要求先判断是否为确定性缺陷。见 [#17764](https://github.com/QwenLM/qwen-code/pull/17764)、[#17787](https://github.com/QwenLM/qwen-code/issues/17787)。
3. **长会话需要同时优化“运行体验”和“事后检索”。** 历史回放卡顿已有优化 PR，但归档查找能力仍是开放需求，两者分别影响使用中和使用后的效率。见 [#17788](https://github.com/QwenLM/qwen-code/pull/17788)、[#17772](https://github.com/QwenLM/qwen-code/issues/17772)。
4. **持久化状态与外部依赖应有清晰边界。** 记忆索引、JSONL 追加、注册身份账本和锁等待的改进，共同指向状态一致性、可恢复性与有界等待。见 [#17785](https://github.com/QwenLM/qwen-code/pull/17785)、[#17771](https://github.com/QwenLM/qwen-code/pull/17771)、[#17775](https://github.com/QwenLM/qwen-code/pull/17775)、[#17776](https://github.com/QwenLM/qwen-code/pull/17776)。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*