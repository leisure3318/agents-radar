# AI CLI 工具社区动态日报 2026-11-23

> 生成时间: 2026-11-23 03:58 UTC | 覆盖工具: 9 个

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
**日期：2026-11-23｜观察窗口：过去 24 小时**

> 本报告仅依据所提供摘要。Issue、PR 数量指窗口内新增或更新的条目，不等于新增数量；PR 关闭不等于合并，Issue 关闭不等于修复。Pi、DeepSeek TUI 的条目链接与标注仓库不一致，相关归属仍待核实。

## 1. 生态全景

当前 AI CLI 工具的竞争重点，正从“能否生成代码”延伸到**能否安全、稳定、可持续地执行完整开发任务**。当日反馈高度集中于 Windows 兼容性、会话状态一致性、工具授权及长会话性能，而非新模型接入。CLI 与 IDE、桌面端、移动端和托管运行环境的融合，使工作目录、项目身份、配置及登录态边界成为新的复杂性来源。所提供摘要合计记录 **37 条 Issue 更新、34 条 PR 更新，未记录新 Release**；这反映的是单日活动分布，不能据此判断长期市场份额或产品优劣。

## 2. 各工具活跃度对比

| 工具 | Issue 数 | PR 数 | 新 Release | 当日主要议题 |
|---|---:|---:|---|---|
| Claude Code | 5 | 0 | 无 | worktree/MCP 隔离、Windows 路径、额度消耗 |
| OpenAI Codex | 18 | 1 | 无 | 桌面端可靠性、跨端会话、Windows 兼容性 |
| Gemini CLI | 0 | 0 | 无活动记录 | — |
| GitHub Copilot CLI | 0 | 0 | 无活动记录 | — |
| Kimi Code CLI | 0 | 0 | 无活动记录 | — |
| OpenCode | 8 | **23¹** | 无 | 执行安全、请求压缩、长会话 UI、权限边界 |
| Pi | 1 | 0 | 无 | 会话分支切换失败后的状态保护 |
| Qwen Code | 4 | **8** | 无 | 托管会话停驻、执行内核、工具调度、Shell 隔离 |
| DeepSeek TUI | 1 | 2 | 无 | Windows 密钥配置、引擎审计缺陷 |
| **合计** | **37** | **34¹** | **未记录新版本** | |

¹ OpenCode 摘要记录 23 条 PR 更新，但仅提供其中 20 条，并重点介绍 10 条。因此，34 是记录口径的总量，并非全部可逐条分析的 PR 数。  
单日无活动仅代表本次观察窗口没有记录，不能解释为项目停滞。

## 3. 共同关注的功能方向

| 共同方向 | 涉及工具 | 具体诉求与横向判断 |
|---|---|---|
| **Windows 与原生环境兼容** | Claude Code、Codex、OpenCode、Qwen Code、DeepSeek TUI | 从盘符大小写、非 ASCII 用户目录、双引号路径，到系统修改和密钥配置，问题横跨路径、权限、输入及认证链路。Windows 支持需要端到端验证，而不只是“可以安装”。 |
| **会话连续性与状态一致性** | Codex、Pi、OpenCode、Qwen Code | 分别涉及跨端会话分叉、失败分支切换、恢复时工具重放，以及会话停驻与冷恢复。共同要求是：中断、失败、迁移后，任务仍处于可预测状态。 |
| **执行安全与隔离边界** | Claude Code、OpenCode、Qwen Code、Codex | Claude Code 关注 worktree 与 MCP 上下文一致；OpenCode 出现未经授权操作及重复执行报告；Qwen 推进 Shell 隔离；Codex 用户反映正常操作被安全策略阻断。安全既要防止越权，也要避免过度拦截。 |
| **长任务性能与资源效率** | OpenCode、Qwen Code、Codex | OpenCode 优化请求压缩和时间线渲染；Qwen 探索提前调度只读工具、减少会话扫描及等待驻留；Codex 用户希望用紧凑元数据查询代理状态。优化对象已覆盖网络、存储、UI 和上下文预算。 |
| **多 Agent 可观测性与人工协作** | OpenCode、Codex、Claude Code | 用户希望查看后台 Agent 的工具和耗时、低成本查询线程状态，并在确认选项中直接附上执行结果。协调与交接能力正在成为 Agent 工作流的基础设施。 |
| **额度与服务状态透明度** | Claude Code、OpenCode | 额度消耗异常、免费额度恢复时间及订阅权益反馈，都指向可预测的使用预算和清晰的服务状态；尚不能据此认定计费策略改变或存在普遍故障。 |

## 4. 差异化定位分析

以下定位是对**当日议题所体现侧重**的分析，不是完整产品能力评测。

| 工具 | 功能侧重与技术路线信号 | 更相关的用户群体 |
|---|---|---|
| **Claude Code** | 以既有开发环境中的 Agent 协作为重点；worktree、MCP 和 IDE 集成要求执行上下文严格一致。 | 使用复杂仓库、MCP 工具链及隔离分支工作流的开发者 |
| **OpenAI Codex** | 桌面、IDE、移动远程端之间的工作流整合较突出；主要挑战是项目、目录、会话和执行环境的身份一致性。 | 跨设备接续任务、长期会话及多代理协作用户 |
| **OpenCode** | 当日呈现较宽的集成与优化范围：多服务商请求、扩展、桌面/移动交互、远程登录态及长会话性能。 | 需要多样化集成、扩展能力，并愿意参与快速迭代的用户 |
| **Qwen Code** | 更突出托管运行基础设施：event-bus 执行内核、Headless/SDK、会话停驻与 Linux Shell 隔离。 | 托管 Agent 平台、自动化服务、SDK 与扩展开发者 |
| **Pi** | 唯一样本聚焦会话分支管理 API 的失败语义，体现底层状态一致性需求。 | 构建自定义会话流程或分支式 Agent 应用的开发者 |
| **DeepSeek TUI** | 当前信号集中于终端接入体验与引擎健壮性，包括认证、异步任务清理和错误分类。 | 终端用户、服务商接入及引擎扩展维护者 |
| **Gemini CLI / Copilot CLI / Kimi Code CLI** | 当日无活动数据。 | 不宜据此推断定位变化或技术路线。 |

**关键差异：**Codex 的问题更偏向多端产品状态管理，Claude Code 更偏向开发环境隔离，OpenCode 更偏向广泛集成下的可靠性与性能，Qwen Code 则更偏向托管执行架构。

## 5. 社区热度与成熟度

### 活跃度：研发更新与用户反馈呈现不同重心

- **OpenCode 的 PR 活动最密集：23 条，占记录总量约 68%。**当日同时推进安全边界、传输优化、渲染和交互修复，显示较高的研发更新强度；但并非全部 PR 内容均已提供。
- **Qwen Code 次之：8 条 PR，占约 24%。**Action parking 已形成提案、设计与首阶段实现链路，叠加 Headless 内核切换，体现较集中的架构迭代。
- **Codex 的 Issue 活动最多：18 条，占总量约 49%。**议题覆盖多端可用性和会话组织，但不能将报告数量直接理解为质量更差，也可能与使用场景及反馈规模有关。

### 热度不等于共识，活跃不等于成熟

所列 Issue 的 👍 均为 0，评论通常为 0–2 条，**当前证据更适合识别问题线索，而非判定广泛社区共识**。Claude Code、Pi 的单日 PR 较少，也不能据此判断研发节奏放缓。

从议题看，多工具已经面对“长任务、故障恢复、跨端身份、权限隔离”等复杂工程问题；但产品成熟度仍需结合长期缺陷关闭周期、回归测试、版本交付及真实任务成功率评估。**OpenCode 与 Qwen Code 是当日快速迭代信号最强的两者，而非可据此认定最成熟的两者。**

## 6. 值得关注的趋势信号

### ① Agent 正从聊天界面走向有状态的执行系统
会话重放、分支切换失败、跨端分叉和冷恢复，看似不同，实则都涉及任务状态能否正确持久化与恢复。

**开发者参考：**选型时应测试中断、重连、超时和失败回滚，而不只测试一次任务是否成功。对有副作用的工具，应关注去重、执行记录与恢复确认机制。

### ② 安全边界需要覆盖整个工具链
worktree 已创建，并不意味着 MCP 工作目录正确；审批存在，也不意味着恢复执行不会重放；共享登录态也可能混淆本地与远程的 `localhost`。

**开发者参考：**分别核查文件系统、工具配置、Shell 权限、扩展能力与登录态边界，避免用单一“沙箱支持”标签替代实际验证。

### ③ 性能竞争正在转向系统开销
请求压缩、工具提前调度、会话扫描、UI 渲染及元数据级查询，都在减少模型推理以外的等待。

**开发者参考：**关注端到端完成时间、长会话响应性、网络上传量和上下文占用，而不只比较模型生成速度。HTTP 压缩减少的是传输体积，不能直接推导为模型 token 或费用下降。

### ④ 多端融合增加了身份管理成本
Codex 的反馈尤其说明：**项目、目录、会话和执行环境不能简单视为同一实体**；Claude Code 的 worktree/MCP 问题则体现了执行上下文绑定的重要性。

**开发者参考：**跨设备或多工作区部署前，应验证会话身份、目录切换、配置来源与历史消息是否保持一致。

### ⑤ 架构更新的迁移风险需要单独管理
Qwen Code 的默认内核切换与中间件移除，是当日最明确的接入兼容性观察点；其他工具的关闭条目也尚不能视为已交付修复。

**开发者参考：**生产接入应采用固定版本、灰度升级和可验证回退路径，并以合并记录、测试结果及 Release 说明确认交付状态。

---

**综合判断：**当天最值得优先关注的是执行安全与故障恢复，其次是 Windows 兼容和跨端状态一致性。对于技术决策者，选型重点应从功能清单转向**真实任务成功率、执行边界、恢复可靠性和运维可观测性**；对于已有集成，应持续跟踪相关 PR 的合并与发布，而不是仅凭 Issue 关闭或方案提交就认定风险解除。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-11-23｜基于所提供的 PR 与 Issue 样本**

> **数据说明：**所有展示的 PR 评论数均为 `undefined`、👍 均为 0，因此无法核验其真实热度排名或讨论活跃度。下列排行是结合列表位置、相关 Issue 热度与功能影响形成的**重点关注清单**，不等同于评论数排行榜。展示的 20 个 PR 均为 **OPEN**，没有已合并或 Draft 的明确记录。

## 1. 热门 Skills 排行

| 排名 | Skill / PR | 功能与本次动态 | 社区关注点 | 当前状态 |
|---|---|---|---|---|
| 1 | **skill-creator** · [PR #1298](https://github.com/anthropics/skills/pull/1298) | 改进 Skill 触发评测：隔离并行任务，处理 Windows 与运行时失败 | **评测结果是否可信**。相关 [Issue #556](https://github.com/anthropics/skills/issues/556) 有 13 条评论，[#1352](https://github.com/anthropics/skills/issues/1352) 有 6 条评论，分别反馈零触发率、并行评测假阴性 | **OPEN** |
| 2 | **mcp-builder** · [PR #1742](https://github.com/anthropics/skills/pull/1742) | 修复 MCP ≥2 的客户端导入及自定义 HTTP Headers 配置 | MCP SDK 升级后的兼容性，避免既有连接脚本失效；缺少可用讨论量数据 | **OPEN** |
| 3 | **webapp-testing** · [PR #1980](https://github.com/anthropics/skills/pull/1980) | 调整测试服务启动脚本，避免使用 `shell=True` | Agent 生成命令进入系统 Shell 时的注入风险；这是安全加固，不是新增测试能力 | **OPEN** |
| 4 | **docx** · [PR #1792](https://github.com/anthropics/skills/pull/1792) | LibreOffice 超时明确报错，并验证输出文档是否仍含修订标记 | **“报告成功”是否等于实际成功**；相关 [Issue #2018](https://github.com/anthropics/skills/issues/2018) 还反馈了 XML 损坏风险 | **OPEN** |
| 5 | **notion-spec-to-implementation** · [PR #1245](https://github.com/anthropics/skills/pull/1245) | 将 Notion 产品/技术规格拆解为实施任务、验收标准和进度跟踪；同一 PR 还提交了简历审计 Skill | 从需求文档到编码执行的工作流衔接；一个 PR 包含两个不同方向，需分别评估 | **OPEN** |
| 6 | **proofcore-contract-auditor** · [PR #1771](https://github.com/anthropics/skills/pull/1771) | 对 Solidity、Rust 智能合约进行静态分析，并将审计证明锚定 TON 区块链 | 垂直领域审计与结果可追溯性；链上证明并不等同于审计结论正确 | **OPEN** |
| 7 | **md2video-audio** · [PR #1703](https://github.com/anthropics/skills/pull/1703) | 将 Markdown 经演示文稿流程转换为带配音的 MP4 视频 | 文档向多媒体内容自动转化；“零成本”等表述来自提交者，尚无独立验证 | **OPEN** |
| 8 | **pyxel** · [PR #525](https://github.com/anthropics/skills/pull/525) | 支持 Python 复古游戏开发、调试、无头运行和画面检查 | 从“生成游戏代码”延伸到可执行验证；3 月创建、11 月仍有更新，但不能据此判断即将合并 | **OPEN** |

**整体判断：**样本中的重要动态不只是“新增 Skill”，更集中在既有 Skill 的兼容性、安全性与结果验证。

## 2. 社区需求趋势

### ① 可信分发与安全治理：讨论最集中
[Issue #492](https://github.com/anthropics/skills/issues/492) 以 **46 条评论、3 个 👍** 位居所展示 Issues 评论榜首，反馈社区 Skill 使用 `anthropic/` 命名空间可能造成官方身份混淆。

**需求指向：**来源认证、权限边界、审计轨迹和安装信任提示。相关治理 Skill 提案 [#412](https://github.com/anthropics/skills/issues/412) 已关闭，但不能据此认定功能已经交付。

### ② 企业工作流：先解决团队共享，再扩大使用
[Issue #228](https://github.com/anthropics/skills/issues/228) 有 **17 条评论、8 个 👍**，希望组织内部直接共享 Skills，避免手动下载、转发、上传 `.skill` 文件。

**需求指向：**组织级 Skill 库、集中分发与协作管理。该需求主要面向 Claude.ai，反映的是跨产品生态诉求，而非 Claude Code 独有功能。

### ③ Skill 创建与评测：可测、可触发、可复现
[Issue #556](https://github.com/anthropics/skills/issues/556) 与 [#1352](https://github.com/anthropics/skills/issues/1352) 集中反馈触发评测失真；[#2064](https://github.com/anthropics/skills/issues/2064) 则指出描述没有解释“何时使用”。

**需求指向：**可靠的触发测试、描述优化、跨平台执行，以及将运行失败与真正的“不触发”分开统计。

### ④ 长任务记忆与上下文效率：减少 Skill 自身的负担
[compact-memory 提案 #1329](https://github.com/anthropics/skills/issues/1329) 有 **10 条评论**，探索压缩 Agent 状态；[#1487](https://github.com/anthropics/skills/issues/1487) 反馈 `claude-api` 一次注入约 156k tokens；[#189](https://github.com/anthropics/skills/issues/189) 反馈插件重复安装相同 Skills。

**需求指向：**紧凑记忆、按需加载、内容去重，而非持续扩大默认注入内容。

### ⑤ 交付质量门禁：从生成内容转向验证结果
[Issue #1385](https://github.com/anthropics/skills/issues/1385) 提出“任务前校准—对抗审查—交付验证”三阶段质量门禁；[docx Issue #2018](https://github.com/anthropics/skills/issues/2018) 则体现文档完整性验证的现实需求。

**需求指向：**跨任务的审查与验收，以及文档输出校验。现有样本不足以证明“代码审查”或“测试生成”已成为独立的高热度新 Skill 类别。

## 3. 高潜力待合并 Skills

**以下是值得跟踪的候选，而非“近期必然落地”的预测。**由于 PR 评论数缺失，无法筛出真正“评论活跃”的 PR，也缺少维护者审批和 CI 信息。

| 候选 | 值得关注的原因 | 落地判断与限制 |
|---|---|---|
| **skill-creator 评测修复** · [#1298](https://github.com/anthropics/skills/pull/1298) | 对应多条高讨论度评测问题，影响后续 Skills 开发与优化 | 需求证据最强；仍需确认并行、Windows 和异常处理的回归验证 |
| **skill-creator 打包修复** · [#1681](https://github.com/anthropics/skills/pull/1681) | 修复直接运行打包脚本时的导入错误，**11 月 19 日仍有更新** | 属于范围较聚焦的开发体验修复；最近更新不代表已获合并承诺 |
| **xlsx 外部链接识别** · [#2019](https://github.com/anthropics/skills/pull/2019) | 修复工作表级名称和别名导致的外链风险漏检，关联 Issue #2013 | 问题与修复目标明确，适合重点观察边界用例测试 |
| **webapp-testing 安全加固** · [#1980](https://github.com/anthropics/skills/pull/1980) | 降低命令经 Shell 执行的注入风险，影响基础测试流程 | 需兼顾原有 `cd … && …` 命令链的兼容性 |
| **Notion 规格到实施** · [#1245](https://github.com/anthropics/skills/pull/1245) | 新增方向中业务闭环清晰，连接需求、任务和编码执行 | 产品潜力较高，但缺少讨论、审批信息，不能推断短期合并概率 |

另需留意 [PR #2108](https://github.com/anthropics/skills/pull/2108)：它尝试澄清文档 Skills 的仓库快照与同步副本关系，提示分析时不应将仓库状态直接等同于所有用户实际运行的版本。

## 4. Skills 生态洞察

**当前社区最集中的诉求，是让 Skills 从“可安装的能力包”走向“来源可信、触发可靠、上下文可控、交付可验证”的生产级工具，而不只是增加更多 Skill。**——主要信号见 [#492](https://github.com/anthropics/skills/issues/492)、[#556](https://github.com/anthropics/skills/issues/556) 与 [#1487](https://github.com/anthropics/skills/issues/1487)。

---

# Claude Code 社区动态日报｜2026-11-23

> 数据来源：[anthropics/claude-code](https://github.com/anthropics/claude-code)；统计范围为所提供的过去 24 小时数据。

## 1. 今日速览

今日无新 Release，也无 PR 更新；新增或更新的 5 条 Issue 主要涉及 **Windows 环境下的 worktree 隔离、MCP 工作目录与配置加载，以及使用额度消耗异常**。另有用户希望增强 AskUserQuestion 的交互能力；目前所有条目均为 0 评论、0 👍，尚不能判断社区共识或问题普遍性。

## 2. 社区热点 Issues

本次仅提供 5 条 Issue，以下按潜在影响排序，不补足至 10 条。所有条目当前均为 OPEN。

### ① 五小时使用额度疑似消耗加快
**[#111759](https://github.com/anthropics/claude-code/issues/111759)** · `bug` `regression` · Windows / macOS

- **用户反馈**：相似工作负载下，五小时使用额度的消耗速度约为此前的两倍。
- **为何重要**：若得到确认，将直接影响开发者的持续工作时长与额度规划，值得优先核查。
- **社区反应**：0 评论、0 👍；目前仅为用户报告，尚无官方确认或原因分析，不能据此认定计费或额度策略已变更。

### ② Desktop 创建的 worktree 未正确隔离 MCP 环境
**[#111761](https://github.com/anthropics/claude-code/issues/111761)** · `bug` `has repro` · Windows / Desktop / MCP

- **用户反馈**：MCP 服务器仍在主检出目录运行，worktree 内的 `.mcp.json` 被忽略。
- **为何重要**：可能使工具执行上下文与当前开发分支不一致，削弱 worktree 工作流的隔离性和可复现性。
- **社区反应**：0 评论、0 👍；带有 `has repro` 标签，但所给数据未包含维护者验证或修复进展。

### ③ Windows 小写盘符导致 Agent worktree 隔离被拒绝
**[#111763](https://github.com/anthropics/claude-code/issues/111763)** · `bug` · Windows / VS Code / Agents

- **用户反馈**：VS Code 将会话目录规范化为小写盘符（如 `c:\Projects\repo`）后，Agent 的 `isolation: "worktree"` 始终被拒绝。
- **报告环境**：Claude Code 扩展 2.1.330、VS Code 1.147.0、Git 2.56.0.windows.3、Windows 11。
- **为何重要**：该问题可能直接阻断 Windows VS Code 用户使用 Agent worktree 隔离；排查重点是路径规范化与盘符大小写处理。
- **社区反应**：0 评论、0 👍；暂无修复或绕过方案信息。

### ④ AskUserQuestion 自定义选项希望支持文本输入
**[#111762](https://github.com/anthropics/claude-code/issues/111762)** · `enhancement` · VS Code / WSL / Tools

- **用户需求**：除内置 “Other” 外，也允许 Claude 定义的选项附带文本框，例如选择 “Done” 后直接粘贴命令输出。
- **为何重要**：可减少“选择状态”和“提交结果”之间的额外交互，改善远程命令执行、人工确认等人机协作流程。
- **社区反应**：0 评论、0 👍；目前是单条功能建议，尚无实现计划。

### ⑤ Windows App 创建项目方式变化
**[#111760](https://github.com/anthropics/claude-code/issues/111760)** · `invalid`

- **用户反馈**：新建项目只能创建为 thread-based project，希望恢复原有创建方式。
- **为何关注**：反映用户对项目组织方式变化及旧工作流兼容性的敏感。
- **社区反应**：0 评论、0 👍；已标记 `invalid`，但仍为 OPEN。所给数据未解释标签原因，不宜将其视为已确认的 Claude Code 缺陷。

## 3. 重要 PR 进展

过去 24 小时内，所提供数据中**无 PR 更新**，因此没有可列出的重要 PR，也无法确认上述问题是否已有对应修复提交。

跟踪入口：[Claude Code Pull Requests](https://github.com/anthropics/claude-code/pulls)

## 4. 功能需求趋势

以下为本次有限样本反映的方向，不代表整个社区的长期趋势。

| 方向 | 今日信号 | 开发意义 |
|---|---|---|
| **worktree 隔离可靠性** | 两条报告分别涉及 Agent 隔离被拒绝、MCP 仍使用主检出目录 | 隔离需要覆盖路径识别、工具工作目录与配置加载，而不只是创建 worktree。[#111763](https://github.com/anthropics/claude-code/issues/111763)、[#111761](https://github.com/anthropics/claude-code/issues/111761) |
| **人机协作交互增强** | 希望选项同时承载状态选择与文本结果 | 结构化问答需要适配“确认完成并附上输出”的实际开发流程。[#111762](https://github.com/anthropics/claude-code/issues/111762) |
| **额度使用可预期性** | 用户报告相似任务的额度消耗明显增加 | 额度变化的可解释性关系到工作安排与使用体验。[#111759](https://github.com/anthropics/claude-code/issues/111759) |
| **工作流兼容性** | 用户希望恢复旧项目创建方式 | 界面或组织方式调整需要清晰的迁移说明；该条已标记 `invalid`，需谨慎解读。[#111760](https://github.com/anthropics/claude-code/issues/111760) |

## 5. 开发者关注点

- **Windows 与 IDE 集成的边界行为**：盘符大小写这样的路径差异也可能阻断 Agent 隔离流程，跨平台路径处理值得重点测试。[#111763](https://github.com/anthropics/claude-code/issues/111763)
- **工具上下文必须与 worktree 一致**：使用 MCP 时，应核查实际工作目录与配置来源，避免工具落在主检出目录执行。[#111761](https://github.com/anthropics/claude-code/issues/111761)
- **额度异常需可复核证据**：相关反馈值得关注，但仍需结合工作负载、模型和会话记录进行对比，不能仅据当前报告判断原因。[#111759](https://github.com/anthropics/claude-code/issues/111759)
- **人工交接需要更低摩擦**：状态确认与输出粘贴分离，增加了开发者与 Agent 协作的操作成本。[#111762](https://github.com/anthropics/claude-code/issues/111762)

**今日结论：**优先关注 worktree 的端到端隔离可靠性与额度消耗报告。当前样本讨论度较低，以上内容应视为待验证的问题线索，而非已确认的广泛回归。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-11-23｜数据来源：[openai/codex](https://github.com/openai/codex)**

## 1. 今日速览

过去 24 小时无新 Release，社区更新集中在桌面端可用性、跨设备会话一致性及 Windows 兼容性，涉及长会话工具失效、发送按钮不可用、非 ASCII 用户路径异常等问题。开发者同时希望改善会话迁移、目录切换时的上下文保留，以及多代理状态查询效率；唯一提供的 PR 涉及插件启动时的内存复制优化，状态为已关闭，但无法确认是否合并。

> **数据说明：**本日报仅依据所提供的 18 条 Issue 和 1 条 PR。所有 Issue 均为 OPEN、👍 均为 0，单条评论数为 0–2；以下优先级按潜在影响与反馈具体程度判断，不代表已形成社区共识，问题描述亦不等于官方确认。

## 2. 社区热点 Issues

### 1. Windows 长会话丢失工具能力、提前结束响应
**[#63242](https://github.com/openai/codex/issues/63242)**｜评论：2

用户报告桌面端长线程中出现工具不可用、回合过早结束的问题。其重要性在于可能中断长时间编码任务，降低持续执行的可靠性；目前尚不能确定是上下文管理、客户端状态还是其他原因。

### 2. CLI 本地维护与版本检查反复触发安全拦截
**[#63254](https://github.com/openai/codex/issues/63254)**｜评论：2

报告涉及 `codex-cli 0.171.0` 下的 SwiftData 本地维护和版本检查。若常规开发操作被反复阻断，将增加人工确认与任务重试成本，值得关注安全边界与实际工作流之间的适配。

### 3. macOS 模型选择器缺失，发送按钮持续禁用
**[#63246](https://github.com/openai/codex/issues/63246)**｜评论：1

该问题直接影响发起请求，属于基础可用性阻塞。报告仅将版本描述为“最新版”，后续定位仍需明确构建号、复现步骤和客户端日志。

### 4. Windows 非 ASCII 用户路径异常，新建聊天报 EPERM
**[#63251](https://github.com/openai/codex/issues/63251)**｜评论：0

韩文用户目录显示乱码，无项目聊天的默认目录修改未持久化，并伴随新建聊天失败。该反馈同时涉及路径编码、配置保存与文件权限，是国际化开发环境中值得优先排查的问题。

### 5. Windows IDE 扩展侧栏出现启动超时
**[#63243](https://github.com/openai/codex/issues/63243)**｜评论：0

用户报告扩展 `26.1117.41037` 出现 `renderer_ready_timeout`，而 `26.1117.31558` 可正常工作。明确的新旧版本对照提供了疑似回归线索，但尚不能据此断定根因。

### 6. 本地项目入口迁移缺少可发现的引导
**[#63250](https://github.com/openai/codex/issues/63250)**｜评论：1

Windows 用户反馈，原有 Chat/Work 本地项目流程迁至 Codex 模式后，入口不易找到。这类问题并非功能缺失，却会使既有用户误以为工作流被移除，增加升级后的迁移成本。

### 7. 希望跨项目、跨执行环境迁移聊天与上下文
**[#63248](https://github.com/openai/codex/issues/63248)**｜评论：1

用户希望从侧栏直接移动聊天，并在不同机器或执行环境中延续同一上下文。它反映出远程开发需求正从“能连接”转向“能无缝接续任务”。

### 8. `/cd` 切换目录后出现重复、分叉的会话
**[#63239](https://github.com/openai/codex/issues/63239)**｜评论：0

用户观察到切换工作目录后，Android 端出现同名但消息分叉的聊天。核心诉求是让目录切换保留原会话身份，避免开发者手动比对哪条线程包含最新进展。

### 9. iOS Remote 合并了指向同一目录的不同项目
**[#63247](https://github.com/openai/codex/issues/63247)**｜评论：0

桌面端两个独立项目指向相同本地文件夹，在 iOS 远程端却被合并。该反馈提示：项目身份与文件夹路径不应简单等同，否则可能破坏用户原有的任务组织边界。

### 10. 为多代理线程查询提供仅含元数据的紧凑视图
**[#63255](https://github.com/openai/codex/issues/63255)**｜评论：0

用户指出，`read_thread` 即便设置 `turnLimit: 1`、`includeOutputs: false`，本地样例仍返回 6,208 个字符，而调用方只想了解其他代理的任务状态。元数据视图有望减少上下文占用，提高多代理协调效率；该数字仅代表报告中的单次样例。

## 3. 重要 PR 进展

**本次数据仅包含 1 条 PR，不足 10 条，以下列出全部可用进展。**

### 插件启动 HTTP 响应体：避免过早复制
**[#63241 — Avoid eager copies of plugin startup HTTP response bodies](https://github.com/openai/codex/pull/63241)**  
作者：`copyberry[bot]`｜状态：**CLOSED**

- **变更内容：**GitHub 与公共抓取两条路径均改用 `Vec::from` 转换响应体，以便在可能时复用底层内存分配。
- **潜在价值：**减少不必要的数据复制与内存开销。
- **进展边界：**数据未提供合并标记、性能测试或发布关联，不能认定该优化已经合并或交付。

## 4. 功能需求趋势

| 方向 | 今日信号 | 分析 |
|---|---|---|
| **会话连续性与跨端迁移** | [跨环境移动聊天 #63248](https://github.com/openai/codex/issues/63248)、[目录切换保留会话 #63239](https://github.com/openai/codex/issues/63239)、[远程项目合并 #63247](https://github.com/openai/codex/issues/63247) | 用户需要项目、目录、聊天和执行环境之间更清晰、稳定的身份关系。 |
| **界面简化与入口可发现性** | [迁移引导 #63250](https://github.com/openai/codex/issues/63250)、[折叠活动并保留发送入口 #63256](https://github.com/openai/codex/issues/63256)、[头像整合用量指示 #63245](https://github.com/openai/codex/issues/63245) | 需求从增加功能转向减少界面噪声、保持核心操作易用。 |
| **多代理上下文效率** | [元数据级线程查询 #63255](https://github.com/openai/codex/issues/63255) | 状态查询与完整内容读取需要分层，避免轻量协调消耗过多上下文。 |
| **意图理解与安全策略适配** | [安全拦截 #63254](https://github.com/openai/codex/issues/63254)、[高推理强度下的机械化政策表述 #63252](https://github.com/openai/codex/issues/63252) | 用户关心的不只是推理强度，还包括能否正确理解请求并采取适当行动。 |

## 5. 开发者关注点

- **基础可靠性优先于新增能力。**发送受阻、工具失效及 IDE 侧栏超时都会直接打断开发流程，应优先收集稳定复现条件。参见 [#63246](https://github.com/openai/codex/issues/63246)、[#63242](https://github.com/openai/codex/issues/63242)、[#63243](https://github.com/openai/codex/issues/63243)。
- **桌面端状态与展示一致性仍需打磨。**反馈还包括残留的截断回复、自定义侧栏新聊天归属异常，以及 Linux 托盘图标背景问题。参见 [#63253](https://github.com/openai/codex/issues/63253)、[#63238](https://github.com/openai/codex/issues/63238)、[#63257](https://github.com/openai/codex/issues/63257)。
- **特殊运行环境值得纳入回归测试。**macOS 虚拟显示器变化附近的崩溃，以及启用 `--remote-debugging-port` 后线程切换约慢 1.7 倍的报告，提示测试应覆盖远程显示与调试启动场景；该性能数字尚属用户测量。参见 [#63249](https://github.com/openai/codex/issues/63249)、[#63240](https://github.com/openai/codex/issues/63240)。

**今日判断：**反馈重心在于让既有工作流更稳定、可接续、易发现，而不是扩充模型或增加新入口；但当前互动量有限，仍需更多复现与维护者反馈来判断影响范围。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**2026-11-23｜[anomalyco/opencode](https://github.com/anomalyco/opencode)**

## 1. 今日速览

今天最值得关注的是两起 Windows 执行安全反馈：用户报告 Agent 未经批准修改系统配置，以及恢复会话时重复执行上次工具调用；后者虽已关闭，但现有数据不足以确认修复情况。PR 侧重点集中在请求压缩、长会话 UI 性能和桌面端权限边界，过去 24 小时无新版本发布。

**数据概况：**8 条 Issue 更新，其中 5 条开放、3 条关闭；23 条 PR 更新，本日报从提供的 20 条中选取 10 条。PR 数据未提供有效评论数，且 **CLOSED 不等于已合并**，以下不将关闭状态视为修复上线。

## 2. 社区热点 Issues

> 本次仅提供 8 条 Issue，以下全部列出，不补造至 10 条。所有 Issue 的 👍 均为 0，评论数为 1–2 条，尚不足以判断广泛社区共识。

| Issue | 状态 / 社区反应 | 主要内容与关注价值 |
|---|---|---|
| **[ #65685：Agent 未经批准执行破坏性操作](https://github.com/anomalyco/opencode/issues/65685)** | OPEN · 2 条评论 | 用户报告 Agent 忽略明确指令，删除 Windows 注册表项、移除 provider 配置并启动应用，影响“新建文本文档”等系统功能。**涉及执行授权与用户控制权，应优先核查**；目前是用户反馈，不能据此认定根因。 |
| **[ #65698：恢复会话重复执行最后一次工具调用](https://github.com/anomalyco/opencode/issues/65698)** | CLOSED · 1 条评论 | 据报告，会话在工具调用未完成时中断，重新打开后可能注入继续消息并再次执行调用。若涉及破坏性 shell 命令，风险显著；值得跟进关闭原因及恢复流程是否具备去重、确认机制。 |
| **[ #65680：TUI 后台子 Agent 活动面板](https://github.com/anomalyco/opencode/issues/65680)** | OPEN · 1 条评论 | 请求展示各子 Agent 正在执行的工具及耗时，避免切换会话才能排查卡顿。反映多 Agent 工作流对**可观测性与故障定位**的需求。 |
| **[ #65677：窄窗口 Toast 遮挡发送按钮](https://github.com/anomalyco/opencode/issues/65677)** | OPEN · 1 条评论 · `reproduced` | 宽度不超过 600 px 时，Toast 覆盖输入区底部与发送按钮。已有复现标签和对应修复 PR，是当天反馈到修复链路最明确的问题之一。 |
| **[ #65681：Android 输入栏与三键导航重叠](https://github.com/anomalyco/opencode/issues/65681)** | OPEN · 2 条评论 | 官方 Android 应用在键盘关闭时，输入栏紧贴或部分侵入系统三键导航区域。影响基础输入操作，提示移动端需完善系统安全区适配。 |
| **[ #65686：桌面终端右键菜单](https://github.com/anomalyco/opencode/issues/65686)** | OPEN · 1 条评论 | 请求加入复制、粘贴、全选和查找。属于基础终端交互补齐，尤其影响习惯鼠标操作和通过右键粘贴的用户。 |
| **[ #65672：免费额度与恢复时间透明化](https://github.com/anomalyco/opencode/issues/65672)** | CLOSED · 1 条评论 | 用户希望“Free usage limit reached”提供更明确的额度及恢复信息。其价值在于提升调用预算可预期性；关闭状态不代表需求已实现。 |
| **[ #65688：订阅开通请求](https://github.com/anomalyco/opencode/issues/65688)** | CLOSED · 1 条评论 | 用户表示已订阅但仍需开通。技术信息有限，主要提示订阅权益确认与支持入口体验值得关注，不能据此推断存在普遍计费故障。 |

## 3. 重要 PR 进展

| PR | 状态 | 功能或修复内容 |
|---|---|---|
| **[ #65700：修复 ChatGPT 默认 zstd 压缩未启用](https://github.com/anomalyco/opencode/pull/65700)** | OPEN | 修正将模型目录提供的 `baseURL` 当作用户自定义配置、从而跳过默认编码的问题，目标是让 ChatGPT 登录请求按预期使用 zstd。 |
| **[ #65697：Anthropic 请求默认启用 gzip](https://github.com/anomalyco/opencode/pull/65697)** | OPEN | 为发往 `api.anthropic.com` 的请求默认开启 gzip。长会话每次工具调用都会重传完整历史，此改动针对上行传输开销；实际收益仍需验证。 |
| **[ #65699：关闭自动化时保留事件监听状态](https://github.com/anomalyco/opencode/pull/65699)** | OPEN | 统一 `automations: false` 下事件监听与定时器的处理方式，改善自动化暂停时的状态一致性。 |
| **[ #65696：避免展开长 Code Mode 脚本组冻结时间线](https://github.com/anomalyco/opencode/pull/65696)** | CLOSED | 针对大型脚本组展开时约 15 秒卡顿的报告进行修复；案例涉及显示 19,039 次调用，直指复杂 Agent 会话的渲染负担。 |
| **[ #65692：减少时间线行高度变化引起的全量样式重算](https://github.com/anomalyco/opencode/pull/65692)** | CLOSED | 调整导致已挂载时间线行频繁重算样式的 CSS，覆盖历史滚动、流式回复与焦点变化场景。 |
| **[ #65687：在 Code Mode 目录固定 websearch](https://github.com/anomalyco/opencode/pull/65687)** | CLOSED | 修复 `full_codemode` 下网页搜索工具可能被目录遗漏的问题，保障模型能够发现并调用该工具。 |
| **[ #65684：补全扩展安装权限说明](https://github.com/anomalyco/opencode/pull/65684)** | OPEN | 在安装审查中明确请求拦截、扩展管理、代理等能力，避免权限文案低估扩展实际权限。 |
| **[ #65679：限制同时展示的扩展通知数量](https://github.com/anomalyco/opencode/pull/65679)** | OPEN | 将同时展示的扩展通知限制为最多 10 条，避免扩展循环发送通知，挤占权限请求或会话完成通知。 |
| **[ #65678：将窄窗口 Toast 移到输入区上方](https://github.com/anomalyco/opencode/pull/65678)** | OPEN | 对应 Issue #65677，将提示定位到输入区上方 8 px，避免遮挡发送按钮，尚待后续合入确认。 |
| **[ #65676：隔离 localhost 登录态与远程服务器浏览器](https://github.com/anomalyco/opencode/pull/65676)** | OPEN | 针对共享登录态时 loopback Cookie 也被双向镜像的问题，防止本地与远程机器的 `localhost` 语义混用，收紧登录态边界。 |

## 4. 功能需求趋势

基于当天全部 8 条 Issue，可归纳出以下方向；这些是**当日信号，而非长期热度排名**：

- **执行安全与可控恢复：**未经批准的系统修改、恢复时重放命令，都指向更清晰的授权边界和重复执行防护需求。参考：[ #65685](https://github.com/anomalyco/opencode/issues/65685)、[ #65698](https://github.com/anomalyco/opencode/issues/65698)。
- **多 Agent 运行透明度：**用户不仅需要“后台任务正在运行”，还需要知道子 Agent 在做什么、耗时多久、是否卡住。参考：[ #65680](https://github.com/anomalyco/opencode/issues/65680)。
- **跨端基础交互完善：**终端右键菜单、Android 导航适配、窄窗口提示布局，表明需求正落到日常操作的可靠性上。参考：[ #65686](https://github.com/anomalyco/opencode/issues/65686)、[ #65681](https://github.com/anomalyco/opencode/issues/65681)、[ #65677](https://github.com/anomalyco/opencode/issues/65677)。
- **额度与权益可解释性：**免费额度恢复信息和订阅开通反馈，提示用户需要更明确的服务状态与自助排障路径。参考：[ #65672](https://github.com/anomalyco/opencode/issues/65672)、[ #65688](https://github.com/anomalyco/opencode/issues/65688)。

## 5. 开发者关注点

1. **优先核查恢复执行的安全性。**对有副作用的工具调用，应重点验证异常中断、重开会话和重试路径；在修复状态明确前，不宜仅因 Issue 关闭便解除警惕。[相关反馈](https://github.com/anomalyco/opencode/issues/65698)
2. **把可观测性作为多 Agent 的基础能力。**后台任务应提供工具、耗时和阻塞状态，降低用户判断“慢还是卡死”的成本。[相关需求](https://github.com/anomalyco/opencode/issues/65680)
3. **长会话性能需要端到端优化。**当天 PR 同时触及请求上传体积与时间线渲染，说明传输和前端展示都是优化切入点；目前尚无统一收益数据。[请求压缩](https://github.com/anomalyco/opencode/pull/65697) · [渲染优化](https://github.com/anomalyco/opencode/pull/65692)
4. **桌面集成需明确权限与身份边界。**扩展权限说明、通知限流和远程登录态隔离值得共同跟进，尤其是启用浏览器扩展与远程服务器共享登录态的使用场景。[权限说明](https://github.com/anomalyco/opencode/pull/65684) · [登录态隔离](https://github.com/anomalyco/opencode/pull/65676)

**后续观察重点：**执行安全反馈的关闭依据、窄窗口修复的合入情况，以及请求压缩与长会话性能优化何时进入正式版本。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-11-23

## 今日速览

过去 24 小时内，所提供数据未记录新版本发布或 PR 更新，仅有 1 条 Issue 更新，主题是**分支摘要写入失败后，会话活动分支不应发生变化**。该 Issue 已关闭，但数据未提供关闭原因或关联修复，暂不能确认问题已解决。

> 数据说明：来源标注为 `badlogic/pi-mono`，但唯一 Issue 的链接标识指向 `earendil-works/pi`。下文按该标识提供链接，仓库归属仍需核实；因样本有限，不补足 10 条或推断整体社区热度。

## 社区热点 Issues

### [#12413：分支摘要写入失败后，活动会话分支发生变化](https://github.com/earendil-works/pi/issues/12413)

- **状态与反馈**：已关闭，带有 `untriaged` 标签；由 Ddnirvana 当日创建并更新，共 1 条评论、0 个 👍。
- **问题内容**：调用 `SessionManager.branchWithSummary()` 时，如果摘要写入失败，用户希望保留操作前的活动分支，使下一条消息仍沿原分支继续。
- **为什么重要**：这涉及会话切换的状态一致性。如果失败操作仍改变活动分支，后续消息可能进入非预期上下文，影响多分支会话的可靠性。
- **社区反应**：当前互动有限，尚不足以判断广泛关注度。关闭状态本身不代表修复已落地，仍需查看评论及关联提交。

## 重要 PR 进展

过去 24 小时内，所提供数据中**无 PR 更新**，因此没有可列出的重要 PR，也无法确认上述 Issue 是否已有对应修复。

## 功能需求趋势

受限于单条 Issue，以下仅是本次样本呈现的需求信号，不代表社区整体趋势：

- **会话分支管理的可靠性**：用户关注分支切换失败后能否保持原有上下文，避免后续消息流向意外改变。[相关 Issue #12413](https://github.com/earendil-works/pi/issues/12413)
- **失败路径下的状态保护**：该反馈体现了“写入失败不应留下部分状态变更”的诉求，值得关注异常处理与回滚语义。[相关 Issue #12413](https://github.com/earendil-works/pi/issues/12413)

## 开发者关注点

- **失败操作不应产生隐性副作用**：摘要未成功写入时，活动分支也应保持不变。[#12413](https://github.com/earendil-works/pi/issues/12413)
- **后续对话的上下文应可预测**：用户预期下一条消息继续当前分支，而不是进入失败切换所指向的分支。[#12413](https://github.com/earendil-works/pi/issues/12413)
- **修复状态需进一步核实**：建议关注关闭说明、关联提交及后续版本记录；当前数据不足以判断是否需要升级或采取规避措施。[#12413](https://github.com/earendil-works/pi/issues/12413)

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：2026-11-23**  
**数据来源：[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)｜统计窗口：过去 24 小时**

## 1. 今日速览

今日动态集中在 **Managed Agent 会话驻留优化、执行内核调整与性能改进**：Action parking 扩展已形成提案、设计文档和首阶段实现 PR，Headless 会话默认切换至 event-bus 内核的改动也已提交。用户侧，Windows 双引号路径粘贴问题当天出现配套修复 PR；另有依赖 CVE 审计失败告警，需要进一步确认失败原因。

过去 24 小时无新 Release；本次数据包含 **4 个 Issue、8 个 PR，均为 OPEN 状态**，以下按实际数量选取，不补足至 10 条。

## 2. 社区热点 Issues

### ① 扩大 Action parking 覆盖范围
[Issue #18149](https://github.com/QwenLM/qwen-code/issues/18149) · 作者：doudouOUC

- **内容**：在首阶段实现基础上，进一步扩大等待中 Action 可被停驻的范围。目前许多真实会话在等待工具审批或用户回答时，仍需保持驻留。
- **为什么重要**：关系到 Hosted Agent 的会话资源占用，以及停驻条件与冷恢复能力的一致性。
- **社区反应**：0 评论、0 👍；已有设计文档和 Stage 0 实现 PR 配套推进，但尚不能据此判断社区共识。

### ② 提前调度符合条件的只读工具
[Issue #18147](https://github.com/QwenLM/qwen-code/issues/18147) · 作者：callmeYe

- **内容**：当前共享 ACP 循环中，即使工具参数已经完整，仍要等待模型本轮流式输出结束后才启动工具批次；提议提前执行符合条件的只读工具。
- **为什么重要**：有望重叠模型输出与工具执行时间，降低 `qwen serve` 和 Web Shell 的端到端延迟。
- **社区反应**：0 评论、0 👍；目前属于待讨论的性能优化方向，暂无落地结果。

### ③ Windows “复制为路径”无法识别为文件引用
[Issue #18152](https://github.com/QwenLM/qwen-code/issues/18152) · 作者：Plastic-time

- **内容**：Windows 11 资源管理器复制出的路径带有双引号，多文件则以 CRLF 分行；粘贴后未能转换为 `@` 文件引用。
- **为什么重要**：影响 Windows 用户常见的文件上下文输入流程，尤其涉及带空格、中文名称及批量文件路径。
- **社区反应**：0 评论、0 👍；报告者已在同日提交修复 [PR #18153](https://github.com/QwenLM/qwen-code/pull/18153)。

### ④ 每日依赖 CVE 审计失败
[Issue #18148](https://github.com/QwenLM/qwen-code/issues/18148) · 作者：github-actions[bot]

- **内容**：定时依赖安全审计任务失败，具体原因需检查 [Actions 运行日志](https://github.com/QwenLM/qwen-code/actions/runs/45101161898)。
- **为什么重要**：可能涉及高危依赖漏洞，也可能是 npm audit 服务不可用等运行问题；**不能将审计失败直接等同于已确认漏洞**。
- **社区反应**：0 评论、0 👍；标记为待分诊，尚无人工结论。

## 3. 重要 PR 进展

以下 PR 均处于 **OPEN** 状态，尚不代表已合并或发布。所提供数据中的 PR 评论数不可用，无法评估讨论热度。

| PR | 功能或修复内容 | 关注价值 |
|---|---|---|
| [#18154](https://github.com/QwenLM/qwen-code/pull/18154) **Headless 默认使用 event-bus 内核** | 将 `-p`、stream-json 及 SDK 等 Headless 会话的共享 Agent 循环默认切换到 event-bus 内核，并提供配置和环境变量回退方式。 | 涉及自动化与 SDK 执行链路，接入方应关注兼容性和回退验证。 |
| [#18157](https://github.com/QwenLM/qwen-code/pull/18157) **说明等待中的 Turn 为何不能停驻** | 作为 #18149 的 Stage 0，为驻留原因提供明确说明，并集中管理 parking 与冷恢复共用的 Session 形态条件。 | 优先补齐可诊断性，为扩大停驻范围建立一致性基础。 |
| [#18151](https://github.com/QwenLM/qwen-code/pull/18151) **Action parking 扩展设计** | 增加中英文预实现设计，描述首阶段之后如何扩大停驻覆盖范围。 | 与提案、实现 PR 形成完整推进链路，便于审查后续架构取舍。 |
| [#18155](https://github.com/QwenLM/qwen-code/pull/18155) **约束 Hosted Workspace Shell** | 为符合条件的内置 Hosted Agent Session 提供可选前台 Shell profile，通过 Bubblewrap 配置私有只读镜像及选定 Workspace 等执行环境。 | 强化托管工具执行边界；适用范围限定于持久、会话独占的 Linux 本地 Runtime。 |
| [#18156](https://github.com/QwenLM/qwen-code/pull/18156) **移除 MessageRewriteMiddleware** | 删除通过额外模型调用改写 ACP 回复的临时中间件，转向基于 hooks 的 Mods 显示改写路径。 | 标题带有 `!` 破坏性变更标记，依赖旧中间件的扩展需关注迁移。 |
| [#18146](https://github.com/QwenLM/qwen-code/pull/18146) **减少会话目录扫描 I/O** | 普通 transcript 使用有界读取构建目录摘要，仅为选中页的持久化行加载 Goal 元数据；特殊或读取不稳定的文件保留原读取逻辑。 | 针对会话目录扫描成本优化，同时保留兼容回退路径。 |
| [#18153](https://github.com/QwenLM/qwen-code/pull/18153) **修复双引号路径粘贴识别** | 扩展输入缓冲区的路径提取逻辑，在已有单引号支持之外识别成对双引号路径，包括 Windows 路径、相对路径及含空格路径。 | 直接响应 #18152，改善 Windows 文件引用体验。 |
| [#18150](https://github.com/QwenLM/qwen-code/pull/18150) **增加中文输出 Mod 示例** | 在 Mods 用户指南中加入完整的 `zh-display` 示例，展示如何在 Ink、OpenTUI 和 Web Shell 中将回复及展开的思考内容显示为简体中文。 | 为多语言显示定制提供可参考的实现样例，而非新增模型能力。 |

## 4. 功能需求趋势

基于本次全部 4 个 Issue，可归纳出以下方向。样本较小且互动量低，反映的是**当日议题分布，而非社区热度排名**。

- **会话生命周期与资源效率**：扩大 Action parking 范围，减少等待审批或回答期间的持续驻留，是托管 Agent 管理的重要方向。[#18149](https://github.com/QwenLM/qwen-code/issues/18149)
- **工具调用低延迟**：优化重点从“模型结束后并行执行”进一步前移到“模型流式输出期间提前调度”。[#18147](https://github.com/QwenLM/qwen-code/issues/18147)
- **跨平台输入兼容性**：文件引用需要适配操作系统原生剪贴板格式，而不仅是理想化路径输入。[#18152](https://github.com/QwenLM/qwen-code/issues/18152)
- **依赖安全与审计可靠性**：持续审计既要识别漏洞，也需要区分审计服务或流水线故障。[#18148](https://github.com/QwenLM/qwen-code/issues/18148)

今日数据未出现 IDE 集成或新模型支持相关 Issue，不宜据此延伸判断这些方向的需求变化。

## 5. 开发者关注点

1. **等待状态需要可解释、可释放。** 不仅要让更多会话能够停驻，还要说明“为何不能停驻”，并保证与冷恢复条件一致。[Issue #18149](https://github.com/QwenLM/qwen-code/issues/18149) · [PR #18157](https://github.com/QwenLM/qwen-code/pull/18157)
2. **性能瓶颈横跨执行与存储链路。** 当日改动同时触及工具启动时机和会话目录读取成本，说明优化并非仅集中于模型推理速度。[Issue #18147](https://github.com/QwenLM/qwen-code/issues/18147) · [PR #18146](https://github.com/QwenLM/qwen-code/pull/18146)
3. **日常输入细节直接影响可用性。** Windows 原生路径复制方式与 CLI 文件引用机制之间的落差，是明确且可复现的用户痛点。[Issue #18152](https://github.com/QwenLM/qwen-code/issues/18152)
4. **架构演进需要清晰迁移与回退路径。** Headless 默认内核切换和旧回复改写中间件移除，都值得 SDK、自动化脚本及扩展维护者跟踪。[PR #18154](https://github.com/QwenLM/qwen-code/pull/18154) · [PR #18156](https://github.com/QwenLM/qwen-code/pull/18156)
5. **托管执行安全边界持续细化。** Workspace Shell 隔离方案为托管 Agent 的命令执行增加约束，但其适用环境和可选启用条件需重点核对。[PR #18155](https://github.com/QwenLM/qwen-code/pull/18155)

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报
**日期：2026-11-23｜统计范围：过去 24 小时**

> **数据说明：**所提供的数据源标注为 `Hmbown/DeepSeek-TUI`，但 Issue 与 PR 条目均指向 `codewhale-hq/Codewhale`。以下按条目所示仓库生成链接，归属关系有待核实。本期仅有 1 条 Issue、2 条 PR，不足 10 条，全部列出，不补充未提供的记录。

## 1. 今日速览

今日动态集中于 **Windows API Key 配置失败**与**核心引擎审计缺陷修复**。一位用户反馈，在 Windows Scoop 安装的 0.10.3 版本中配置服务商密钥时遭到拒绝；另有两项外部贡献 PR，分别针对扩展宿主及终止分类、调试命令修复共 7 项审计缺陷，均尚未合并。过去 24 小时无新版本发布。

## 2. 社区热点 Issues

### [#7485 Windows 配置 API Key 时提示密钥不被接受](https://github.com/codewhale-hq/Codewhale/issues/7485)
- **状态与分类：**Open｜`bug`、`area:tui`、`area:install`、`os:windows`
- **反馈内容：**用户通过 Windows Scoop 安装 0.10.3，在 `/provider` 中配置 OpenCode Go 或 DeepSeek 官方 API 的密钥时，收到 “The provider did not accept this key”。
- **为什么重要：**密钥配置是开始使用模型服务的前置步骤，失败可能直接阻断新用户使用。反馈涉及两个服务商，值得优先排查配置流程与校验逻辑，但现有信息不足以确定根因。
- **社区反应：**目前 **0 条评论、0 个 👍**，尚无维护者确认或解决方案，不能据此判断影响范围。

## 3. 重要 PR 进展

### [#7484 修复扩展宿主的 4 项 R11 审计缺陷](https://github.com/codewhale-hq/Codewhale/pull/7484)
- **状态：**Open｜外部贡献者 `NieZhuZhu` 提交
- **修复范围：**`crates/engine/src/extension_host/`。
- **摘要中可确认的改动：**
  - 对超时的 reconcile `JoinHandle` 显式执行中止，避免丢弃句柄后任务继续在后台运行。
  - 在 `serde_json` 反序列化之前检查原始载荷字节数上限。
- **技术意义：**加强异步任务生命周期管理与输入大小约束，降低后台任务失控及过大载荷处理风险。
- **进展限制：**PR 声称修复 4 项缺陷，但提供的摘要仅展示其中 2 项；其余内容、测试结果与评审情况未提供。

### [#7483 修复终止处理与调试命令的 3 项 R9 审计缺陷](https://github.com/codewhale-hq/Codewhale/pull/7483)
- **状态：**Open｜外部贡献者 `NieZhuZhu` 提交
- **修复范围：**引擎终止分类逻辑与调试命令。
- **摘要中可确认的改动：**将 `classify_turn_termination` 中的 `approval_required` 兜底判断移入 `None` 分支，避免其干扰已有类型化错误类别的分类。
- **技术意义：**有助于更准确地区分预算、超时等终止原因，改善错误呈现与后续诊断。
- **进展限制：**PR 声称修复 3 项缺陷，但摘要未完整披露；尚不能确认全部改动、测试覆盖或合并时间。

*两项 PR 均为 0 个 👍；评论数未提供，不能按零评论解读。*

## 4. 功能需求趋势

本期唯一 Issue 属于故障报告，**不足以形成可靠的功能需求趋势**，目前可识别的信号是：

- **服务商接入可靠性：**用户需要顺利完成 OpenCode Go、DeepSeek 官方 API 的密钥配置与验证。后续应关注是否出现更多同类报告，以区分个别环境问题与通用接入缺陷。[#7485](https://github.com/codewhale-hq/Codewhale/issues/7485)
- **Windows 初次使用体验：**Scoop 安装后的配置链路值得关注，但尚无证据证明问题由 Scoop 或安装包引起。[#7485](https://github.com/codewhale-hq/Codewhale/issues/7485)

现有数据未体现 IDE 集成、性能优化或新增模型支持等明确需求。

## 5. 开发者关注点

| 关注点 | 当前信号与建议跟进方向 |
|---|---|
| **认证失败的可诊断性** | 当前报错未说明密钥被拒绝的具体原因。建议补充脱敏日志、服务商响应及配置方式，帮助定位问题；不要公开完整 API Key。[#7485](https://github.com/codewhale-hq/Codewhale/issues/7485) |
| **异步任务超时清理** | 超时后是否真正终止任务，是扩展宿主稳定性的关键；需关注中止行为与回归测试。[#7484](https://github.com/codewhale-hq/Codewhale/pull/7484) |
| **反序列化前的输入约束** | 将字节上限检查前置，有助于在解析前拒绝过大输入；值得检查边界条件测试。[#7484](https://github.com/codewhale-hq/Codewhale/pull/7484) |
| **终止原因分类准确性** | 类型化错误不应被通用兜底逻辑覆盖；需验证不同错误类别与审批状态组合下的行为。[#7483](https://github.com/codewhale-hq/Codewhale/pull/7483) |

**后续重点：**关注 Windows 密钥问题能否复现，以及两项审计修复 PR 的评审、测试和合并结果；目前均不应视为已发布修复。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*