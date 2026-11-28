# AI CLI 工具社区动态日报 2026-11-28

> 生成时间: 2026-11-28 03:43 UTC | 覆盖工具: 9 个

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
**日期：2026-11-28｜基于所提供的过去 24 小时社区动态**

> **口径说明：**以下统计为窗口内更新条目，并非当日新建数量；部分仓库只展示了部分明细。Issue 反馈不等于已确认故障，PR 关闭不等于合并，代码变更也不等于已进入发布版本。各仓库开放程度和数据完整性不同，数量不宜直接作为产品质量排名。

## 1. 生态全景

AI CLI 的竞争重点正在从“能生成代码、能调用工具”转向**执行是否可信、长任务是否可控、跨环境行为是否一致**。权限策略、沙箱隔离、取消与恢复机制在多个社区同时出现，表明无人值守与多代理工作流正在暴露更深层的工程边界。MCP、ACP 和模型兼容接口扩大了生态连接面，但认证恢复、协议字段保真及扩展生命周期成为新的可靠性瓶颈。与此同时，企业证书、托管 Worker、工作区退役和机器级部署等需求，显示部分工具正从个人终端助手向团队级执行基础设施延伸。

## 2. 各工具活跃度对比

| 工具 | Issues 更新数 | PR 更新数 | Release 情况 | 本期主要焦点 |
|---|---:|---:|---|---|
| **Claude Code** | 50，展示 30 | 提供 1 条 | 无新 Release | 权限覆盖边界、云端认证、无人值守与会话恢复 |
| **OpenAI Codex** | 50，展示 30 | 21，展示 20 | 1 个：`0.174.0-alpha.9` | 沙箱权限、审批取消、错误与历史状态一致性 |
| **Gemini CLI** | 6 | 6 | 无；Nightly 发布失败标为 P0 | MCP 协议与 OAuth 恢复、检查点恢复 |
| **GitHub Copilot CLI** | 9 | 0，未收录更新 | 4 个：`v1.0.117`、`v1.0.118-{0,1,2}` | 企业证书、MCP 配置、ACP 与扩展一致性 |
| **Kimi Code CLI** | 0 | 0 | 无活动 | 本窗口无可分析信号 |
| **OpenCode** | 50，展示 30 | 50，展示 20 | 无新 Release | v2 会话稳定性、执行安全、模型与 MCP 适配 |
| **Pi** | 23 | 8 | 1 个：`v1.7.0` | 终端会话恢复、内存边界、模型协议保真 |
| **Qwen Code** | 29 | 50，展示 20 | 1 个：TypeScript SDK `v0.1.39`；另有 CLI 发布失败报告 | Managed Agent 调度、共享 Worker、工作区生命周期 |
| **DeepSeek TUI*** | 0 | 9* | 无新 Release | 数据记录以依赖升级与压缩保真修复为主 |

\* **归属异常：**DeepSeek TUI 的全部 PR 链接实际指向 `codewhale-hq/Codewhale`，不能直接计为其自身开发活跃度。Pi 数据源标注与条目链接仓库也不同，本文沿用原摘要并保留这一限制。Qwen SDK 发布说明存在版本矛盾，不能确认最终捆绑的 CLI 版本。

## 3. 共同关注的功能方向

| 共同方向 | 涉及工具 | 具体诉求与横向判断 |
|---|---|---|
| **权限声明与实际执行一致** | Claude Code、Codex、Copilot CLI、OpenCode | 既要避免应受限操作被放行，也要减少合法操作反复审批。问题横跨 MCP、Shell、路径别名与子代理，说明单一工具规则不足以表达完整执行边界。 |
| **任务生命周期可控** | Claude Code、Codex、Gemini CLI、OpenCode | 子代理完成后能否唤醒父任务、取消是否及时、中断后能否恢复、失败是否触发意外重放，正在成为自动化的关键契约。 |
| **长会话与上下文管理可靠** | Claude Code、Copilot CLI、OpenCode、Pi | 需求从“支持更大窗口”深入到压缩频率、图片保留、消息完整性、请求体大小和内存有界。压缩不再只是成本优化，也关系到结果正确性。 |
| **协议与扩展互操作** | Gemini CLI、OpenCode、Copilot CLI、Pi | MCP 版本头和认证状态、ACP 路由与错误反馈、模型思考签名与流式字段，都要求端到端保真，而非仅通过首次连接测试。 |
| **会话与工作区可恢复** | Claude Code、Pi、Qwen Code、OpenCode | 覆盖终端重启、IDE Worktree 恢复、排队输入恢复，以及工作区退役后的历史数据管理。运行环境生命周期与用户数据生命周期需要解耦。 |
| **企业部署与运维适配** | Copilot CLI、Qwen Code、Claude Code | 关注额外 CA 证书、机器级配置、托管 Worker、私有仓库认证及内网访问，体现集中管理场景的增长。 |

**一个重要共性：**用户并非单纯要求“更少安全限制”，而是要求**限制边界明确、授权结果稳定、失败原因可解释**。

## 4. 差异化定位分析

以下是依据本期动态观察到的侧重，不代表完整产品能力或官方定位。

| 工具 | 功能与技术路线侧重 | 更匹配的用户或场景 |
|---|---|---|
| **Claude Code** | 终端、IDE、桌面、远程及云端定时任务相互衔接，当前挑战集中在跨入口权限与状态连续性 | 已将代理嵌入日常开发、私有仓库和多代理自动化的团队 |
| **Codex** | 本期代码变更突出沙箱底层、线程权限、审批事件及持久化历史，强调执行状态的准确表达 | 需要通过 CLI、app-server 或事件流接入 CI 和代理编排的开发者 |
| **Gemini CLI** | 本期聚焦 MCP 标准兼容、OAuth 恢复、检查点及 Google Cloud 配置约定 | 依赖 MCP 服务或 Google 云环境、重视协议互操作的用户 |
| **Copilot CLI** | 围绕 GitHub 协作、ACP 客户端、扩展与企业网络适配持续修补 | GitHub/VS Code 工作流及存在集中网络、安全管理要求的组织 |
| **OpenCode** | 多模型、插件、ACP/MCP、后台任务与原生 Worker 并行推进；能力面广，同时暴露组合复杂度 | 重视模型选择和可扩展性、愿意承担集成验证成本的高级用户 |
| **Pi** | 终端与可组合组件路线突出，关注模型适配细节、RPC/codemode 和长会话资源控制 | 构建自定义代理、模型网关或终端工作流的开发者 |
| **Qwen Code** | 本期明显偏向控制面、Harness、共享 Worker 和外部工作区管理，向托管执行体系延伸 | 建设内部 Agent 平台、嵌入式宿主和多工作区服务的团队 |
| **Kimi Code CLI** | 本窗口无活动 | 无法据此判断定位变化或迭代节奏 |
| **DeepSeek TUI** | PR 数据归属未核实 | 暂不据本批记录判断其技术路线 |

## 5. 社区热度与成熟度

### 活跃度：OpenCode、Qwen Code 的代码侧活动最突出

- **OpenCode：50 条 Issue、50 条 PR 更新**，讨论与开发同时覆盖安全、上下文、连接、模型和平台支持，呈现较强的并行演进特征。
- **Qwen Code：29 条 Issue、50 条 PR 更新**，开发活动明显集中在托管架构与生命周期管理，属于本期架构扩展信号最强的工具之一。
- **Codex：50 条 Issue、21 条 PR 更新**，用户反馈与底层可靠性变更均较密集。
- **Claude Code：50 条 Issue 更新**，反馈活跃，但仅提供 1 条 PR，不能据此推断实际研发投入或修复速度。

### 发布节奏：Copilot CLI 最密集，但不能等同于整体迭代最快

Copilot CLI 本窗口有 **4 个发布记录**，说明小步修补节奏较快；Codex 发布 Alpha，Pi 发布终端恢复功能，分别体现预发布验证与面向用户的能力交付。Gemini CLI 和 Qwen Code 出现发布链路失败报告，提示需将“有标签”“构建成功”“可安装交付”分开核验。

### 讨论深度：整体仍是低互动样本

Qwen Code 单条最高 **7 评论**，OpenCode **5 评论**，Codex **4 评论**；Claude Code 和 Gemini CLI 最高均为 **2 评论**，Copilot CLI 本批 Issue 均无评论。因此，“热点”主要意味着潜在影响较高，而非已形成广泛共识。

### 成熟度：更适合按能力维度判断，而非给出单一排名

本期反馈显示，多个工具已进入复杂工作流，但权限一致性、失败处理和状态恢复仍需补强。**Issue 多可能来自使用规模，也可能来自版本回归；PR 多可能是快速建设，也可能是维护负担。**单日数量不足以判定产品成熟度或稳定性优劣。

## 6. 值得关注的趋势信号

### ① 执行可信度正在成为比功能数量更重要的指标

Codex 的“失败却返回退出码 0”、Copilot ACP 的“过滤后正常结束”、Claude 的任务历史不一致，都说明正常退出或界面完成不必然代表任务成功。

**开发者参考：**自动化应联合验证结构化终态、错误事件和产物检查，不只依赖退出码。

### ② 安全边界必须覆盖整条工具链

Claude 的原生工具、Bash 与 MCP 覆盖差异，Codex 的路径别名和挂载处理，以及 OpenCode 的嵌套 Shell 风险，都指向同一问题：权限不能只按界面按钮或工具名称理解。

**开发者参考：**企业应把进程、文件系统、网络、凭据和远程工具纳入统一威胁模型，避免将单层规则误当作全局隔离。

### ③ 模型兼容的验收标准将从“首轮能答”升级为“多轮能执行”

Pi 的签名丢失、OpenCode 的工具选择循环、Copilot 的推理 token 估算，表明兼容接口并不保证完整语义兼容。

**开发者参考：**模型接入测试至少覆盖多轮工具调用、历史回放、流式参数、多模态输入和上下文压缩。

### ④ 上下文工程正在成为资源与数据完整性工程

OpenCode 图片丢失、Pi 内存溢出与字节上限、Copilot 频繁压缩，说明 token 窗口只是约束之一。

**开发者参考：**长任务同时设置 token、请求字节、内存、工具调用次数与等待时间上限，并保存可恢复检查点。

### ⑤ CLI 正逐步成为可托管的执行组件

Qwen 的 Harness 拉取调度和共享 Worker、OpenCode 的 machine worker、Claude 的云端定时任务，显示 CLI 能力正在被平台化部署。

**开发者参考：**平台选型除模型效果外，还应评估租约与所有权、工作区隔离、任务取消、凭据生命周期、历史数据清理和审计接口。

---

**决策结论：**本期最值得优先验证的不是“谁新增功能最多”，而是目标工作流中的**权限一致性、失败可识别性、恢复完整性和资源可控性**。个人开发者应重点测试长会话与跨端恢复；自动化团队应优先验证任务终态和取消语义；企业平台团队则需进一步审查沙箱、凭据、工作区与托管调度的完整生命周期。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-11-28｜基于所提供的 PR 与 Issue 样本**

> **数据说明：**所有展示的 PR 评论数均为 `undefined`、👍 均为 0，因此无法验证“按评论数排序”的热度，也无法判断哪些 PR 讨论活跃。下文以 **Issue 讨论信号、问题影响及 PR 内容**筛选重点，非严格评论数榜。展示的 PR 均为 **OPEN**，没有已合并或 Draft 的明确记录。

## 1. 热门 Skills 排行：8 个重点关注项

以下为分析性排序，不代表可量化的 PR 热度排名。

| Skills / PR | 功能与本次变化 | 社区关注焦点 | 当前状态 |
|---|---|---|---|
| **1. skill-creator** · [#1298](https://github.com/anthropics/skills/pull/1298) | 改善 Skill 触发评测，隔离并行任务，处理 Windows 与运行时异常 | **评测结果能否信任**。相关 Issues 报告零触发率、并行串扰；错误评分会误导后续描述优化 | OPEN |
| **2. mcp-builder** · [#1742](https://github.com/anthropics/skills/pull/1742) | 适配 MCP ≥2.0 的客户端导入名称及自定义 HTTP 请求头配置 | SDK 升级兼容性，以及带认证头的 MCP 服务连接能否正常工作 | OPEN |
| **3. docx** · [#1792](https://github.com/anthropics/skills/pull/1792) | LibreOffice 超时明确报错，并验证输出文件是否真正移除修订标记 | **避免“报告成功、结果错误”**，提升文档自动化的交付可靠性 | OPEN |
| **4. webapp-testing** · [#1980](https://github.com/anthropics/skills/pull/1980) | 修改测试服务启动脚本，避免使用 `shell=True` | 用户或 Agent 生成的命令进入系统 Shell 时，如何控制命令注入风险 | OPEN |
| **5. notion-spec-to-implementation 等** · [#1245](https://github.com/anthropics/skills/pull/1245) | 将 Notion 产品/技术规格拆成实施任务、验收标准与进度跟踪；同一 PR 还包含简历量化审计 Skill | 从“理解需求”走向“生成可执行工作计划”，连接规格文档与代码实施 | OPEN |
| **6. md2video-audio** · [#1703](https://github.com/anthropics/skills/pull/1703) | 将 Markdown 经幻灯片生成流程转换为带配音的 MP4 视频 | 内容生产流水线，尤其是文档到多媒体的自动化复用；“零成本”等效果仍属提交者描述 | OPEN |
| **7. Pyxel** · [#525](https://github.com/anthropics/skills/pull/525) | 支持 Python 复古游戏开发、调试、无界面输入驱动运行和画面检查 | 不只生成游戏代码，还提供运行验证与状态检查的完整闭环 | OPEN |
| **8. proofcore-contract-auditor** · [#1771](https://github.com/anthropics/skills/pull/1771) | 面向 Solidity/Rust 智能合约静态分析，并将审计证明锚定至 TON | 垂直领域审计与可验证交付；链上证明不应被等同于合约安全保证 | OPEN |

**整体观察：**新增 Skill 的场景跨度很大，但已有 Skill 的兼容性、评测准确性、安全性和输出验证，是更集中的工程议题。

## 2. 社区需求趋势

### ① 信任与治理：首先要知道“谁提供了这个 Skill”
- **最强讨论信号**是社区 Skill 使用 `anthropic/` 命名空间可能造成的官方身份混淆：**46 评论、3 👍**。
- 社区还提出策略执行、威胁检测、信任评分和审计轨迹等治理方向，但对应提案已关闭，不能据此认定已实现。
- **需求判断：**来源标识、权限边界和可审计性，是 Skill 分发体系的基础需求。  
  链接：[命名空间信任边界 #492](https://github.com/anthropics/skills/issues/492) · [agent-governance 提案 #412](https://github.com/anthropics/skills/issues/412)

### ② 团队工作流：从个人安装走向组织共享
- 组织级共享诉求获得 **17 评论、8 👍**：用户希望摆脱下载 `.skill`、通过聊天工具发送、逐个手动上传的流程。
- **需求判断：**共享技能库、直接分享入口与集中分发，比继续增加孤立的个人 Skill 更能支撑团队采用。该需求来自 Claude.ai，不应直接视为 Claude Code 已规划功能。  
  链接：[组织级 Skill 共享 #228](https://github.com/anthropics/skills/issues/228)

### ③ Skill 开发工具：触发正确，比描述写得漂亮更重要
- 零触发率问题有 **13 评论、7 👍**；并行评测交叉匹配问题有 **6 评论、3 👍**。
- 另有反馈指出描述只说明“能做什么”，没有说明“何时调用”。
- **需求判断：**社区需要可靠的触发测试、运行故障与未触发的区分，以及可操作的描述编写规则。  
  链接：[零触发率 #556](https://github.com/anthropics/skills/issues/556) · [并行评测错误 #1352](https://github.com/anthropics/skills/issues/1352) · [触发描述改进 #2064](https://github.com/anthropics/skills/issues/2064)

### ④ 长任务与交付质检：压缩记忆，设置质量关卡
- `compact-memory` 提案关注长期 Agent 状态的紧凑表达：**10 评论**。
- 推理质量门禁提案覆盖任务前校准、对抗审查与交付验证：**8 评论**，最近更新于 **11 月 25 日**。
- **需求判断：**新 Skill 的潜力方向不只是执行任务，还包括减少上下文负担、检查推理与验证最终交付。  
  链接：[compact-memory #1329](https://github.com/anthropics/skills/issues/1329) · [质量门禁流水线 #1385](https://github.com/anthropics/skills/issues/1385)

### ⑤ 文档与上下文管理：避免损坏、重复和一次性加载过量
- DOCX XML 损坏、插件重复安装 Skill，以及 `claude-api` 据报一次注入约 156k tokens，都指向使用过程中的可靠性与资源问题。
- **需求判断：**文档完整性验证、去重及按需加载，比单纯增加文档生成能力更紧迫。  
  链接：[DOCX XML 问题 #2018](https://github.com/anthropics/skills/issues/2018) · [重复 Skills #189](https://github.com/anthropics/skills/issues/189) · [上下文耗尽 #1487](https://github.com/anthropics/skills/issues/1487)

> **边界提示：**当前样本不足以认定“通用代码审查”或“测试生成”是最高热度的新 Skill 需求；更明确的信号是治理、评测、团队共享和交付验证。

## 3. 高潜力待合并 Skills / 改进

**无法确认“评论活跃”或“近期必将落地”**。以下按问题价值、改动聚焦程度及可见更新情况，列为优先跟踪对象：

| 待合并 PR | 潜力依据 | 最新可见更新 |
|---|---|---|
| [skill-creator 评测隔离 #1298](https://github.com/anthropics/skills/pull/1298) | 对应社区反复反馈的评测失真问题，影响 Skill 优化工具链的可信度 | 09-16 |
| [skill-creator 打包脚本 #1681](https://github.com/anthropics/skills/pull/1681) | 修复独立执行时的导入失败，直接改善创建到打包的开发者体验 | **11-19** |
| [claude-api `pause_turn` 指南 #1950](https://github.com/anthropics/skills/pull/1950) | 跟进 Python SDK 自动恢复行为，避免旧示例继续误导实现 | **11-10** |
| [xlsx 外链风险识别 #2019](https://github.com/anthropics/skills/pull/2019) | 补齐工作表作用域名称和别名导致的漏检，增强电子表格处理可靠性 | **11-03** |
| [webapp-testing 命令启动安全 #1980](https://github.com/anthropics/skills/pull/1980) | 安全边界清晰，面向 Agent 执行命令这一高风险环节 | **11-01** |

新增功能方面，可继续观察 [Notion 规格到实施 #1245](https://github.com/anthropics/skills/pull/1245) 和 [Pyxel 游戏开发 #525](https://github.com/anthropics/skills/pull/525)：前者连接业务需求与实施，后者强调生成后的验证；但现有数据不足以判断合并优先级。

## 4. Skills 生态洞察

**当前社区最集中的诉求，是让 Skills 从“可安装的能力包”变成“来源可信、触发准确、执行安全、交付可验证”的生产级工作流组件。**  
代表信号：[信任边界 #492](https://github.com/anthropics/skills/issues/492) · [触发评测 #556](https://github.com/anthropics/skills/issues/556) · [交付质量门禁 #1385](https://github.com/anthropics/skills/issues/1385)

---

# Claude Code 社区动态日报
**日期：2026-11-28**  
**数据来源：** [anthropics/claude-code](https://github.com/anthropics/claude-code) 过去 24 小时更新数据；共 50 条 Issue，本报依据提供的 30 条明细分析。

## 1. 今日速览

过去 24 小时无新 Release，社区反馈重点集中在**权限规则覆盖边界、无人值守执行可靠性，以及桌面端与 IDE 的状态恢复问题**。GitHub 云端仓库访问、沙箱局域网连接和 Remote Control 连接管理也出现故障报告，值得相关工作流用户优先排查。

当前讨论热度有限：所展示 Issue 最高为 2 条评论，全部为 0 个 👍；以下排序依据潜在影响与排查价值，而非社区共识。唯一提供的 PR 聚焦 stale Issue 通知，尚未合并。

## 2. 社区热点 Issues

> 以下均为用户报告，不代表已获官方确认；`has repro` 表示带有该标签，不等于已由维护者复现。

| Issue | 核心内容与关注价值 | 社区反应 / 状态 |
|---|---|---|
| **[ #112787：MCP 工具与文件权限规则的覆盖边界](https://github.com/anthropics/claude-code/issues/112787)** | 报告称 Read/Edit 的 deny、ask 规则及工作目录限制不适用于 MCP 工具，并要求补充文档说明。**关系到企业托管策略是否被正确理解和配置**，接入文件访问类 MCP 服务时尤其值得核查。 | OPEN；`has repro`；0 评论、0 👍 |
| **[ #112786：Bash 命令替换可能绕过匹配规则](https://github.com/anthropics/claude-code/issues/112786)** | 报告称命令替换形式可避开特定 Bash deny/ask 规则，同时指出文档与 2.1.328 实际行为存在差异。重点在于**命令匹配边界与文档准确性**，不宜将其直接等同于完整的安全隔离机制。 | OPEN；`security`、`has repro`；0 评论、0 👍 |
| **[ #112785：Git 间接文件访问不受 Read/Edit 规则覆盖](https://github.com/anthropics/claude-code/issues/112785)** | 报告涉及 `.git` 文件中的 `gitdir:` 指针：Git 间接打开的文件可能不受 Read/Edit deny 规则约束。提示开发者区分**工具级权限与底层进程实际访问能力**。 | OPEN；`security`、`has repro`；0 评论、0 👍 |
| **[ #112797：子代理未继承权限绕过设置](https://github.com/anthropics/claude-code/issues/112797)** | Linux 用户报告子代理仍停在授权提示上，并提出记忆保留范围问题。若可复现，将影响长时间、无人值守的多代理任务；修复方向应是权限传播一致性，而非简单扩大授权。 | OPEN；0 评论、0 👍 |
| **[ #112795：Auto mode 阻止同账户定时会话通信](https://github.com/anthropics/claude-code/issues/112795)** | 用户报告已授权的 `fire_trigger` 被判定为 “Unsanctioned Communication”。反映**安全分类与合法自动化编排之间的冲突**，可能阻断多阶段定时任务。 | OPEN；`has repro`；0 评论、0 👍 |
| **[ #112802：云端定时会话无法访问私有 GitHub 仓库](https://github.com/anthropics/claude-code/issues/112802)** | 报告称自 11 月 27 日晚间起，项目定时任务中的 `GH_TOKEN` 为代理占位值，认证检查和克隆失败。可能直接中断依赖私有仓库的云端自动化；另有仓库连接失败报告，但尚不能认定同源。 | OPEN；0 评论、0 👍 |
| **[ #112775：沙箱代理访问已放行 LAN IP 返回 502](https://github.com/anthropics/claude-code/issues/112775)** | macOS 用户称，即使局域网 IP 已加入 `sandbox.network.allowedDomains`，请求仍返回 502；约 2.1.306 时可用。对调用内网 API、本地测试服务的开发者影响较大。 | OPEN；`regression`、`has repro`；1 评论、0 👍 |
| **[ #112796：Remote Control 持续重连触发主机连接限制](https://github.com/anthropics/claude-code/issues/112796)** | Linux 2.1.332 报告多个会话触发网络的单主机连接上限后仍不断尝试重连，进而影响该主机的新出站连接。值得关注连接生命周期、重试退避及故障扩散范围。 | OPEN；`has repro`；0 评论、0 👍 |
| **[ #112803：VS Code 重启后无法恢复 Worktree 会话](https://github.com/anthropics/claude-code/issues/112803)** | 使用 `EnterWorktree` 的会话在重启后显示为 “Untitled”。影响多分支开发中的会话识别与恢复，但现有摘要不足以判断是否存在实际数据丢失。 | OPEN；`has repro`；0 评论、0 👍 |
| **[ #112798：macOS Spotlight 索引重复重建](https://github.com/anthropics/claude-code/issues/112798)** | 用户报告桌面端每次刷新 OS 入口都会删除整个相关索引域，再重新索引近期会话，造成索引膨胀和搜索变慢。关注点已超出应用内体验，涉及系统级性能。 | OPEN；0 评论、0 👍 |

## 3. 重要 PR 进展

**提供的数据仅含 1 条 PR，因此不补足至 10 条。**

### [PR #112684：标记 stale 时自动发布通知评论](https://github.com/anthropics/claude-code/pull/112684)
- **作者：** bpasero-ant
- **状态：** OPEN，尚未合并
- **改动内容：** 自动清理流程在添加 stale 标签时同步发布通知评论，并将每轮标记数量限制为最多 100 条。
- **意义：** 提升 Issue 生命周期管理的透明度，让提交者更容易发现状态变化，并限制单轮批处理规模。
- **数据限制：** 评论数未提供，无法判断讨论活跃度；该 PR 不涉及上述产品故障的直接修复。

## 4. 功能需求趋势

### ① 更明确的权限边界与更一致的自动化授权
权限相关反馈同时呈现两类诉求：**该限制的访问需要覆盖清楚，该允许的操作不应反复被拦截**。除上述权限报告外，用户还反馈明确要求创建的 PR 被 Auto mode 多次拒绝。  
相关：[MCP 规则边界 #112787](https://github.com/anthropics/claude-code/issues/112787) · [创建 PR 被阻止 #112788](https://github.com/anthropics/claude-code/issues/112788)

### ② IDE 集成从“可用”转向连续性与交互效率
需求集中在 Worktree 会话恢复、跨窗口焦点稳定性，以及引用历史消息的便捷操作，而非单纯增加入口。  
相关：[会话恢复 #112803](https://github.com/anthropics/claude-code/issues/112803) · [查找框导致焦点切换 #112782](https://github.com/anthropics/claude-code/issues/112782) · [引用历史消息 #112783](https://github.com/anthropics/claude-code/issues/112783)

### ③ 桌面端需要更稳定的扩展入口和项目控制
Windows 用户希望提供正式插件侧栏位置，并恢复或补充账户记忆开关、聊天移入移出项目等控制能力。体现出用户对**可扩展性与配置自主权**的需求。  
相关：[插件侧栏入口 #112800](https://github.com/anthropics/claude-code/issues/112800) · [项目记忆与聊天管理 #112801](https://github.com/anthropics/claude-code/issues/112801)

### ④ 定时任务与远程执行需要更好的可观测性
除执行是否成功外，用户还需要历史记录、API 返回状态和界面显示保持一致，以支撑自动化监控。  
相关：[运行历史不一致 #112780](https://github.com/anthropics/claude-code/issues/112780) · [云端仓库访问失败 #112802](https://github.com/anthropics/claude-code/issues/112802)

### ⑤ 用量管理与移动端运维仍有需求信号
反馈涉及周额度未重置，以及移动端查看用量、管理 API Key 的需求。不过移动 Console 请求已标为 `invalid`，不宜据此推断为 Claude Code 的产品路线方向。  
相关：[周额度未重置 #112755](https://github.com/anthropics/claude-code/issues/112755) · [移动 Console 请求 #112768](https://github.com/anthropics/claude-code/issues/112768)

## 5. 开发者关注点

- **无人值守任务的可预测性不足。** 权限提示、自动分类拒绝和仓库认证失败，都可能让完整任务链停滞；应重点验证实际执行账户、子代理权限和外部服务访问路径。  
  参考：[子代理权限 #112797](https://github.com/anthropics/claude-code/issues/112797) · [定时会话通信 #112795](https://github.com/anthropics/claude-code/issues/112795)

- **权限配置需要说明“覆盖什么、不覆盖什么”。** 当前报告提示，应分别审视原生文件工具、Bash 和 MCP 的访问边界，避免把单类规则误认为全局文件隔离。  
  参考：[MCP 权限文档 #112787](https://github.com/anthropics/claude-code/issues/112787) · [Git 间接访问 #112785](https://github.com/anthropics/claude-code/issues/112785)

- **长会话状态恢复与信息保真值得优先测试。** Worktree 会话恢复、上下文压缩后任务标题显示异常，都影响开发者对当前工作状态的判断。  
  参考：[Worktree 恢复 #112803](https://github.com/anthropics/claude-code/issues/112803) · [压缩后任务标题丢失 #112794](https://github.com/anthropics/claude-code/issues/112794)

- **模型是否真正遵循资料与指令，仍是信任痛点。** 有用户反馈未按参考材料执行、产生不可靠输出；目前缺少充分复现信息，应视为质量反馈信号，而非已确认的模型回归。  
  参考：[忽略参考资料 #112790](https://github.com/anthropics/claude-code/issues/112790) · [指令遵循投诉 #112792](https://github.com/anthropics/claude-code/issues/112792)

**今日判断：** 当前样本更突出的主题是“工作流可靠性”，而非新增能力。建议优先跟踪权限覆盖边界、云端 GitHub 认证和网络重连问题；现有数据尚不足以判断故障普遍程度或官方修复时间。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**2026-11-28｜数据来源：[openai/codex](https://github.com/openai/codex)**

> **统计口径**：提供的数据包含过去 24 小时更新的 50 条 Issues、21 条 PR，分别展示其中 30 条和 20 条；以下基于已展示内容分析。部分记录标注的更新时间为 11 月 27 日，沿用数据源窗口，不视为今日新建。PR 的 `CLOSED` 不等于已合并，Issue 关闭也不代表修复已发布。

## 一、今日速览

Codex 发布 **`0.174.0-alpha.9`** 预发布版本，但提供的 Release 信息未披露具体变更。代码侧重点集中于**沙箱权限边界、审批取消与命令历史一致性**；用户侧则集中反馈安全检查疑似误拦截、连接与自动化可靠性、额度消耗等问题。

当前讨论规模仍较小：展示的 Issue 最高仅 4 条评论，因此更适合将其视为待验证的风险信号，而非已确认的普遍故障。

## 二、版本发布

### [`rust-v0.174.0-alpha.9`](https://github.com/openai/codex/releases/tag/rust-v0.174.0-alpha.9)
- **版本性质**：Alpha 预发布版。
- **已知信息**：Release 正文仅包含版本号，没有功能、修复或兼容性说明。
- **升级判断**：不能确认下文 PR 已包含在该版本中。生产自动化环境建议先验证沙箱权限、审批流程与退出码行为，再决定升级。

## 三、社区热点 Issues：10 项重点关注

| Issue | 问题与重要性 | 社区反应及状态 |
|---|---|---|
| [#64403 流断连错误分类不准确](https://github.com/openai/codex/issues/64403) | 报告称 app-server 将 `CodexErr::Stream` 映射为 `codexErrorInfo: "other"`，而不是 `responseStreamDisconnected`。这可能影响客户端识别可重试错误、执行重连与诊断故障。 | **OPEN，4 评论**，展示样本中讨论最多。报告引用 `0.167.0` 代码，最新版是否受影响仍需确认。 |
| [#64394 Remote Control 重复出现 WebSocket 400](https://github.com/openai/codex/issues/64394) | 报错要求 Responses WebSocket 消息类型为 `response.create`，直接涉及远程控制连接的可用性与协议兼容性。 | **OPEN，2 评论**。用户称约每五分钟出现一次，该频率未经独立测量。 |
| [#64362 Linux 沙箱在首轮前失败](https://github.com/openai/codex/issues/64362) | `/tmp/codex-daemon-<uid>` 内的 deny 配置触发 bubblewrap 只读文件系统错误，导致线程无法启动，属于阻断型问题。 | **OPEN，2 评论**。报告称 `0.172.0` 与 `0.169.0` 均可复现。 |
| [#64358 Code Mode 启动失败但 CLI 返回成功](https://github.com/openai/codex/issues/64358) | 必需的 Code Mode host bootstrap 失败后，`codex exec --json` 仍退出为 0。对 CI、批处理和代理编排而言，可能造成“任务失败但流水线通过”。 | **OPEN，2 评论**。报告覆盖 `0.164.0` 与 `0.172.0`。 |
| [#64410 子代理完成后无法唤醒父线程](https://github.com/openai/codex/issues/64410) | Windows App 中，即使启用 `wake_on_agent_messages`，原生子代理完成也无法唤醒已卸载的父线程，影响长任务与多代理协作闭环。 | **OPEN，1 评论**，尚待更多复现与处理信息。 |
| [#64395 Windows 沙箱内核池分配疑似泄漏](https://github.com/openai/codex/issues/64395) | 用户报告每次沙箱命令遗留约 6 个 `Toke`、23 个 `SeAt` 分配，直到重启才释放。若属实，长时间自动化执行的累积风险较高。 | **OPEN，1 评论**。报告版本为 App 附带的 `0.167.0-alpha.3.2`，不能直接推及当前版本。 |
| [#64373 正常开发遭网络安全检查误拦截](https://github.com/openai/codex/issues/64373) | 用户称常规应用开发反复触发网络安全限制。这类反馈涉及安全策略与正常开发任务之间的边界，是当前样本中反复出现的主题。 | **OPEN，1 评论**。另有多条相似报告，但尚不能确认具有同一根因。 |
| [#64378 CLI `/ide` 无法识别扩展](https://github.com/openai/codex/issues/64378) | Windows 用户报告升级后 CLI 无法检测 VS Code 扩展，影响终端与 IDE 之间的协同工作流。 | **OPEN，1 评论、1 👍**，是展示样本中唯一获得点赞的 Issue；支持规模仍很小。 |
| [#64353 五小时额度在 34 分钟内耗尽](https://github.com/openai/codex/issues/64353) | 用户报告在输入 token 缓存率为 99.49% 的情况下耗尽额度，引出缓存、子代理和额度核算之间的可解释性问题。 | **OPEN，1 评论**。以上为用户报告，不能据此确认计量异常或缓存应对应何种额度折扣。 |
| [#64354 常规任务原生暂停／恢复](https://github.com/openai/codex/issues/64354) | 希望在不丢失任务状态的情况下暂停执行，以控制额度消耗并支持人工介入，体现任务生命周期管理需求。 | **OPEN，enhancement，1 评论**。是展示样本中明确的功能增强请求。 |

## 四、重要 PR 进展：10 项重点变更

**以下 PR 均标为 `CLOSED`；数据未提供合并状态、发布日期或有效评论数，不能据此认定已合并、已上线或没有讨论。**

| PR | 功能或修复内容 | 开发者价值 |
|---|---|---|
| [#64416 Windows 沙箱遵循声明的文件系统权限](https://github.com/openai/codex/pull/64416) | 处理卷扩展产生的子授权覆盖目录别名限制，以及 restricted-token 后端误拒有效工作区策略的问题。 | 同时关注权限约束准确性与合法配置兼容性。 |
| [#64415 保留 Linux 符号链接别名下的沙箱限制](https://github.com/openai/codex/pull/64415) | 调整可写 bind 挂载的处理，避免父挂载覆盖先前设置的 deny mask 或只读挂载。 | 降低路径别名和挂载顺序导致权限失效的风险。 |
| [#64398 封闭只读受限沙箱中的合成挂载](https://github.com/openai/codex/pull/64398) | 针对合成文件系统的底层挂载可写问题，限制命令修改明确可写路径之外的合成目录。 | 强化文件系统隔离边界。 |
| [#64396 TUI 显示线程已确认权限](https://github.com/openai/codex/pull/64396) | 权限与审批状态展示以当前线程确认的设置为依据，避免本地配置或待应用配置造成误导。 | 让界面显示更接近实际执行权限。 |
| [#64369 远程插件审批遵循沙箱读取限制](https://github.com/openai/codex/pull/64369) | 插件命令归属判断使用远程环境的沙箱策略与授权，避免读取当前任务无权访问的脚本。 | 将权限边界延伸到审批辅助逻辑。 |
| [#64368 取消审批后及时中断运行命令](https://github.com/openai/codex/pull/64368) | 避免拒绝命令时的历史写入阻塞取消流程，导致同级命令继续执行。 | 提升停止操作的及时性和可预期性。 |
| [#64349 中断任务时保留命令审批条目](https://github.com/openai/codex/pull/64349) | 处理命令已在实时界面等待审批、但核心尚未记录启动时的中断场景。 | 减少实时状态与持久化历史不一致。 |
| [#64341 持久化审批拒绝或失败后的命令结束状态](https://github.com/openai/codex/pull/64341) | 避免命令结束状态只出现在实时流中，重新加载线程后丢失。 | 改善历史回放、故障审计和客户端恢复。 |
| [#64391 移除 TUI hook 详情的暗淡样式](https://github.com/openai/codex/pull/64391) | hook 详情中的单行与换行值改用默认文本样式，并扩展测试。 | 与已关闭的 [Issue #64361](https://github.com/openai/codex/issues/64361) 描述相呼应，改善低对比度主题下的可读性。 |
| [#64384 向终端宿主报告启动对话框阻塞状态](https://github.com/openai/codex/pull/64384) | 等待目录信任、启动 hook 等决策时，发出独立的 `OSC 7501` blocked 状态记录。 | 帮助终端宿主区分“正在执行”与“等待用户决策”。 |

## 五、功能需求趋势

基于全部已展示 Issues，需求主要聚焦以下方向，而非集中于新增模型支持：

1. **安全检查的准确性与可解释性**  
   多条报告称常规开发触发网络安全限制或 Daybreak 提示。核心诉求是减少疑似误判，并清楚说明阻断原因及后续处理方式。  
   参考：[ #64417](https://github.com/openai/codex/issues/64417)、[#64407](https://github.com/openai/codex/issues/64407)、[#64371](https://github.com/openai/codex/issues/64371)、[#64359](https://github.com/openai/codex/issues/64359)。

2. **额度可观测性与任务成本控制**  
   反馈覆盖不同模型的额度消耗差异、剩余额度骤降，以及暂停／恢复能力。用户需要的不只是更多额度，也包括更可预测的任务成本。  
   参考：[#64383](https://github.com/openai/codex/issues/64383)、[#64351](https://github.com/openai/codex/issues/64351)、[#64354](https://github.com/openai/codex/issues/64354)。

3. **跨端、远程与 IDE 工作流一致性**  
   远程控制协议错误、移动端遗漏本地线程、CLI 无法识别 IDE 扩展，说明“已连接”并不总能保证功能完整可用。  
   参考：[#64394](https://github.com/openai/codex/issues/64394)、[#64397](https://github.com/openai/codex/issues/64397)、[#64378](https://github.com/openai/codex/issues/64378)。

4. **长任务与多代理执行的可控性**  
   子代理唤醒失败、乱码后持续重试、Full Access 下反复要求确认，反映用户对任务完成、停止、恢复与人工介入机制的需求。  
   参考：[#64410](https://github.com/openai/codex/issues/64410)、[#64409](https://github.com/openai/codex/issues/64409)、[#64381](https://github.com/openai/codex/issues/64381)。

5. **桌面性能与平台能力稳定性**  
   Windows 输入卡顿、沙箱资源疑似泄漏，以及 macOS Computer Use 坐标输入失败，均影响日常开发体验。  
   参考：[#64379](https://github.com/openai/codex/issues/64379)、[#64395](https://github.com/openai/codex/issues/64395)、[#64376](https://github.com/openai/codex/issues/64376)。

## 六、开发者关注点

- **自动化不能只依赖退出码。** 对接 `codex exec --json` 的流水线，应同时检查任务终态、错误事件及必需工具初始化结果，防范“退出成功、任务失败”。参考：[#64358](https://github.com/openai/codex/issues/64358)。
- **权限配置、显示与实际执行需要一致。** 排查权限问题时应记录线程实际策略，而不仅是 Full Access 或本地配置；相关 PR 正在处理显示和执行边界，但不能据此认定用户报告已解决。参考：[#64381](https://github.com/openai/codex/issues/64381)、[PR #64396](https://github.com/openai/codex/pull/64396)。
- **长运行代理需要明确的停止与恢复语义。** 子代理完成通知、取消审批和历史持久化共同决定任务能否可靠闭环。参考：[#64410](https://github.com/openai/codex/issues/64410)、[PR #64368](https://github.com/openai/codex/pull/64368)、[PR #64341](https://github.com/openai/codex/pull/64341)。
- **高质量复现比单纯报错更有价值。** 建议附上版本、平台、最小复现、预期终态和脱敏事件日志；涉及额度时补充模型、时间窗口、子代理数量及用量记录。参考：[#64403](https://github.com/openai/codex/issues/64403)、[#64353](https://github.com/openai/codex/issues/64353)。

**总体判断：今天的主线是“执行可信度”——权限是否准确、失败是否可识别、取消是否及时、历史是否完整。对于依赖 Codex 的开发流水线，这些可靠性信号比 Alpha 版本号本身更值得优先验证。**

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-11-28｜仓库：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)**

## 1. 今日速览

今日重点集中在 **Nightly 发布失败、MCP HTTP 兼容性与认证恢复、检查点恢复可靠性**：Nightly 发布失败已标记为 P0，MCP 协议版本头缺失与 `/restore` 失败后的状态异常均已有修复 PR，但尚未合入。过去 24 小时无新 Release；提供的数据包含 6 条 Issue、6 条 PR，以下全部列出，不补足至 10 条。

## 2. 社区热点 Issues

### 1. Nightly 发布失败，标记为 P0
**[#30502](https://github.com/google-gemini/gemini-cli/issues/30502)｜OPEN｜`priority/p0`、`release-failure`**

- **问题**：`v0.73.0-nightly.20261128.g60f8082b1` 的 nightly-release 工作流失败。
- **重要性**：直接影响该 Nightly 构建的交付，是当前明确标记优先级最高的问题；现有摘要未说明失败根因。
- **社区反应**：由 GitHub Actions 自动创建，暂无评论。可追踪[失败工作流](https://github.com/google-gemini/gemini-cli/actions/runs/46087135009)。

### 2. MCP HTTP 请求缺失协议版本头
**[#30500](https://github.com/google-gemini/gemini-cli/issues/30500)｜OPEN｜待分诊**

- **问题**：初始化协商 `2025-11-25` 后，后续 `tools/list`、`tools/call` 请求未携带 `MCP-Protocol-Version`。报告指向 `McpComplianceTransport` 未转发 `setProtocolVersion`。
- **重要性**：对于不返回 `Mcp-Session-Id` 的无状态服务端，缺少该请求头会妨碍其判断协商后的协议版本，影响互操作性。
- **社区反应**：2 条评论，为本批 Issue 中最多；已有对应修复 [PR #30504](https://github.com/google-gemini/gemini-cli/pull/30504)。

### 3. MCP OAuth 令牌撤销后无法正常重新登录
**[#30501](https://github.com/google-gemini/gemini-cli/issues/30501)｜OPEN｜待分诊**

- **问题**：服务端撤销已存储令牌后，CLI 收到 `401`，恢复流程却以缺少 `redirect_uris` 的信息注册客户端，且不提示重新登录。
- **重要性**：影响 MCP 授权失效后的自恢复能力，可能让用户陷入无法恢复连接的状态。
- **社区反应**：1 条评论；本批数据中未见对应修复 PR。

### 4. `/restore` 失败仍可能替换历史并重放工具
**[#30495](https://github.com/google-gemini/gemini-cli/issues/30495)｜OPEN｜待分诊**

- **问题**：检查点恢复失败后，当前对话仍可能被旧历史替换；部分错误路径还可能继续返回工具动作，触发重放。
- **重要性**：涉及对话状态一致性与工具执行边界，尤其值得在具有文件修改等副作用的工作流中关注。
- **社区反应**：1 条评论；报告者已提交修复 [PR #30496](https://github.com/google-gemini/gemini-cli/pull/30496)。

### 5. 关于规则文件的预注册研究通告
**[#30499](https://github.com/google-gemini/gemini-cli/issues/30499)｜OPEN｜待分诊**

- **内容**：研究者公布使用 Gemini CLI `0.65.0` 的规则文件研究，并提供论文及实验记录；其表示此前私下提交的通知不在相关安全项目范围内。
- **重要性**：为规则文件相关行为提供外部研究材料，值得维护者进一步核查。
- **社区反应**：1 条评论。现有摘要不足以判断研究结论，也不能据此认定存在已确认漏洞。

### 6. 提议“执行优先验证”、项目快照与移动端桥接
**[#30494](https://github.com/google-gemini/gemini-cli/issues/30494)｜OPEN｜待分诊**

- **需求**：生成完整模块或原型后执行可用检查、修复错误并返回验证结果，同时提出可移植项目快照及经授权的 Mobile/Termux 桥接。
- **重要性**：反映用户希望 CLI 从“生成代码”进一步转向“交付可验证结果”，并支持跨环境工作流。
- **社区反应**：1 条评论，尚处提案阶段，未见实施承诺。

> **热度说明**：上述 Issue 均为 0 👍，评论数为 0–2；当前排序主要依据影响与优先级，而非广泛社区共识。

## 3. 重要 PR 进展

| PR | 状态 | 功能或修复内容 | 关注点 |
|---|---|---|---|
| [#30504](https://github.com/google-gemini/gemini-cli/pull/30504) | OPEN | 为 `McpComplianceTransport` 转发 `setProtocolVersion` 与 `sessionId`，修复 [#30500](https://github.com/google-gemini/gemini-cli/issues/30500) | 直接回应 MCP HTTP 协议版本头缺失问题，尚待合入 |
| [#30503](https://github.com/google-gemini/gemini-cli/pull/30503) | OPEN · P1 | 标题指向 CI release patch 评论认证修复 | 正文主要为模板，具体改动与验证信息不足；不能确认其与本次 Nightly 失败有关 |
| [#30498](https://github.com/google-gemini/gemini-cli/pull/30498) | OPEN · P2 | 让后台输出读取遵守 `AbortSignal`：已取消时立即报 `AbortError`，等待期间也可及时取消 | 改善后台任务取消响应，避免取消后仍持续等待；关联 [#29945](https://github.com/google-gemini/gemini-cli/issues/29945) |
| [#30496](https://github.com/google-gemini/gemini-cli/pull/30496) | OPEN | 检查点恢复成功后才加载历史；失败时保留当前 UI 与模型历史，并阻止工具重放 | 重点修复恢复操作的状态一致性与错误路径行为 |
| [#30493](https://github.com/google-gemini/gemini-cli/pull/30493) | OPEN · P2 | 在 core、CLI、a2a-server 中统一支持 `GOOGLE_CLOUD_PROJECT_ID` 作为 `GOOGLE_CLOUD_PROJECT` 的回退值，并改善 Vertex AI 配置错误提示 | 缩小文档与实现差异，降低云项目配置排障成本 |
| [#30492](https://github.com/google-gemini/gemini-cli/pull/30492) | CLOSED · P2 | 与 #30493 同标题、摘要高度一致，涉及云项目变量回退支持 | 数据未说明关闭原因，也未提供合并状态，不应视为已交付 |

**状态小结**：本批 PR 为 **5 条开放、1 条关闭**；未提供已合并记录，评论数据亦不可用，暂无法判断审查活跃度。

## 4. 功能需求趋势

基于这 6 条 Issue，当前主要方向是：

- **MCP 互操作性与认证恢复**：协议头传递和令牌撤销后的重授权均出现问题，说明接入后的长期稳定运行仍有改进空间。[#30500](https://github.com/google-gemini/gemini-cli/issues/30500) · [#30501](https://github.com/google-gemini/gemini-cli/issues/30501)
- **可控、可恢复的 Agent 工作流**：用户关注恢复失败时能否保留现场、避免意外执行，以及生成结果是否经过实际验证。[#30495](https://github.com/google-gemini/gemini-cli/issues/30495) · [#30494](https://github.com/google-gemini/gemini-cli/issues/30494)
- **项目可移植性与移动端使用**：项目快照、Mobile/Termux 桥接进入提案，但目前仅有单条需求，不能视为广泛共识。[#30494](https://github.com/google-gemini/gemini-cli/issues/30494)
- **规则文件行为的外部研究**：社区出现针对规则文件的研究材料，后续值得关注维护者是否开展复核。[#30499](https://github.com/google-gemini/gemini-cli/issues/30499)

本批样本未出现明确的 IDE 集成或新模型支持需求，不宜据此推断这些方向的整体热度。

## 5. 开发者关注点

1. **失败路径需要可靠兜底**：授权撤销应能重新登录，恢复失败应保留当前状态，而不是进入更难排查的异常状态。[#30501](https://github.com/google-gemini/gemini-cli/issues/30501) · [#30495](https://github.com/google-gemini/gemini-cli/issues/30495)
2. **工具执行必须可控、可取消**：恢复失败后的工具重放，以及后台输出读取的取消响应，均涉及执行边界与用户控制权。[#30496](https://github.com/google-gemini/gemini-cli/pull/30496) · [#30498](https://github.com/google-gemini/gemini-cli/pull/30498)
3. **协议与配置应符合约定**：MCP 包装层需完整传递底层能力，云项目环境变量行为也应与文档一致。[#30504](https://github.com/google-gemini/gemini-cli/pull/30504) · [#30493](https://github.com/google-gemini/gemini-cli/pull/30493)
4. **发布链路稳定性仍需优先关注**：建议 Nightly 用户关注 P0 发布故障处理结果，避免将失败构建视为可用更新。[#30502](https://github.com/google-gemini/gemini-cli/issues/30502)

**后续重点**：追踪 Nightly 发布恢复情况、MCP 协议修复与 `/restore` 修复的合入状态，以及 OAuth 恢复问题是否出现对应补丁。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-28**  
**项目：[github/copilot-cli](https://github.com/github/copilot-cli)**

> 统计口径：基于所提供的过去 24 小时数据；Issue 的创建、更新时间均标为 11 月 27 日。部分 Release 说明存在截断，以下仅总结可确认内容。

## 1. 今日速览

过去 24 小时共收录 **4 个版本发布、9 条 Issue 更新，未收录 PR 更新**。版本迭代聚焦沙箱证书信任、MCP 配置并发写入与终端交互修复；社区反馈则集中在 **ACP 行为一致性、扩展可用性和企业环境兼容性**。

9 条 Issue 均处于 **OPEN / triage**，暂无评论；当前反馈属于待验证的问题报告，尚不能视为官方确认的缺陷。

## 2. 版本发布

| 版本 | 主要更新 | 开发者价值 |
|---|---|---|
| [v1.0.118-2](https://github.com/github/copilot-cli/releases/tag/v1.0.118-2) | 修复 `Ctrl+R` 搜索命中后，使用上下方向键浏览提示历史时可能应用隐藏建议的问题。 | 改善终端历史导航的可预测性。 |
| [v1.0.118-1](https://github.com/github/copilot-cli/releases/tag/v1.0.118-1) | 修复同时执行 `copilot mcp enable` / `disable` 时，对不同 MCP 服务器的修改无法完整保留的问题。 | 降低并发操作导致配置更新丢失的风险。 |
| [v1.0.118-0](https://github.com/github/copilot-cli/releases/tag/v1.0.118-0) | `/sandbox policy` 展示沙箱信任的额外 CA 证书路径，包括托管设置中的证书；为会继续启动子代理的子代理，在 `/tasks` 页脚展示推理强度与上下文层级。 | 提升企业证书配置与多层代理任务的可观测性。 |
| [v1.0.117](https://github.com/github/copilot-cli/releases/tag/v1.0.117) | 新增 `sandbox.userPolicy.network.extraCaCertificates`，可在用户或托管设置中配置，以支持经 TLS 拦截代理访问网络的沙箱命令；支持自定义代理显式选择启用工具。 | 改善企业网络适配，并细化代理工具暴露控制。 |

**说明：** `v1.0.118-0` 的详细转录匹配计数条目，以及 `v1.0.117` 的 Page Down 修复条目均被截断，无法确认完整行为与适用条件。

## 3. 社区热点 Issues

本次仅有 **9 条 Issue**，以下全部列出，不补足至 10 条。**所有条目均无评论；除 #5601 获得 1 个 👍 外，其余均为 0 个 👍**，暂不宜按互动量判断热度。

### 1. 推理模型上下文估算偏高，导致频繁压缩
[#5607](https://github.com/github/copilot-cli/issues/5607) · 作者：felipecrs

- **问题：** 用户通过 VS Code 中的 CLI agent host 使用自带密钥的推理模型，报告旧推理 token 持续计入上下文估算，导致实际窗口使用约 30%–40% 时即触发压缩；107 分钟内发生 19 次。
- **为何重要：** 影响工具密集型长任务的连续性，也暴露了不同模型上下文记账方式的适配问题。
- **社区反应：** 暂无评论或点赞，需进一步验证 token 估算与压缩阈值。

### 2. ACP 模式未遵循高档位路由配置
[#5604](https://github.com/github/copilot-cli/issues/5604) · 作者：idocinthebox

- **问题：** 用户报告配置 `fusionTier=high` 后，`copilot -p` 使用 HydraFusion，而相同提示经 `copilot --acp` 发送时仍走 `auto_v2` 标准路由。
- **为何重要：** 不同调用入口若无法保持配置一致，会影响集成客户端的结果可预测性和效果对比。
- **社区反应：** 暂无评论或点赞。

### 3. ACP 内容过滤后返回空白回合
[#5602](https://github.com/github/copilot-cli/issues/5602) · 作者：torerik81

- **问题：** 模型响应被内容过滤时，ACP 未发送消息更新，却以 `stopReason: "end_turn"` 正常结束。
- **为何重要：** 客户端无法区分“正常完成”与“响应被拦截”，用户也得不到原因说明，影响错误处理和可观测性。
- **社区反应：** 暂无评论或点赞。

### 4. 关联 PR 的 Copilot app 会话无法启动用户扩展
[#5606](https://github.com/github/copilot-cli/issues/5606) · 作者：eriklindharoskapital

- **问题：** 用户报告，关联 PR 的会话不会启动 `~/.copilot/extensions/` 下的扩展，因此缺少扩展提供的工具与 hooks；未关联 PR 的会话则正常加载。
- **为何重要：** 可能使本地开发与 PR 工作流中的自动化能力不一致，影响依赖扩展的团队流程。
- **社区反应：** 暂无评论或点赞。

### 5. 扩展设置工作目录的 RPC 调用被拒绝
[#5599](https://github.com/github/copilot-cli/issues/5599) · 作者：MattPD

- **问题：** 在 1.0.116 中，用户扩展调用 `session.rpc.metadata.setWorkingDirectory({ workingDirectory })` 失败并产生拒绝警告。
- **为何重要：** 工作目录切换是多仓库、项目初始化等扩展流程的基础能力；API 行为变化可能破坏现有集成。
- **社区反应：** 暂无评论或点赞。

### 6. 已授权可写的 skills 目录仍要求绕过沙箱审批
[#5601](https://github.com/github/copilot-cli/issues/5601) · 作者：JonasSeibert1234

- **问题：** 1.0.117 用户报告，skills 目录已显式授予读写权限，编辑 skill 时仍触发 sandbox-bypass 审批。
- **为何重要：** 权限声明与执行行为不一致会增加审批负担；这是一条**额外审批问题报告**，并非已证实的沙箱逃逸漏洞。
- **社区反应：** **1 个 👍**，暂无评论，是本批数据中唯一获得点赞的 Issue。

### 7. macOS 上 Azure DevOps MCP 登录无法缓存
[#5600](https://github.com/github/copilot-cli/issues/5600) · 作者：kunukn

- **问题：** Entra broker 登录成功后，MSAL 写入钥匙串失败，错误码为 `-34018`，导致每次新会话都弹出账户选择窗口。
- **为何重要：** 影响企业 MCP 工作流的连续性，排查重点涉及认证代理与系统凭据存储。
- **社区反应：** 暂无评论或点赞。

### 8. Windows 非 ASCII 用户路径导致 Browser Use 激活失败
[#5603](https://github.com/github/copilot-cli/issues/5603) · 作者：odedrich

- **问题：** 用户在包含非 ASCII 字符的配置文件路径、控制台代码页 850 的环境下，报告注册信息读取与原生启动器存在编码问题。
- **为何重要：** 涉及国际化路径兼容性，可能阻碍部分 Windows 用户启用浏览器能力。
- **社区反应：** 暂无评论或点赞。

### 9. Copilot app 创建的 fork PR 无法启用维护者编辑
[#5605](https://github.com/github/copilot-cli/issues/5605) · 作者：chalin

- **问题：** 使用 Copilot app 提供的 `GH_TOKEN` 创建 fork PR 时，“Allow edits by maintainers”未启用，后续设置 `maintainer_can_modify` 也被报告为静默忽略。
- **为何重要：** 阻碍上游维护者直接修改贡献分支，影响代理生成 PR 后的协作效率。
- **社区反应：** 暂无评论或点赞。

## 4. 重要 PR 进展

**提供的数据中，过去 24 小时没有更新的 PR，无法列出 10 个重要 PR。**

发布日志虽包含多项修复，但未提供对应 PR 编号，因此不推断实现细节或合并状态。可通过 [PR 列表](https://github.com/github/copilot-cli/pulls)继续跟踪。

## 5. 功能需求趋势

本批 Issue 主要是缺陷报告，反映的需求更偏向**可靠性与行为一致性**，而非新增功能。

| 方向 | 需求信号 | 相关 Issue |
|---|---|---|
| **ACP 协议一致性与可观测性** | 不同入口应遵循相同路由配置；过滤、失败与正常结束应有可区分的反馈。 | [#5604](https://github.com/github/copilot-cli/issues/5604)、[#5602](https://github.com/github/copilot-cli/issues/5602) |
| **扩展生命周期与 API 稳定性** | PR 会话应能加载扩展，工作目录 API 应具有清晰、稳定的权限语义。 | [#5606](https://github.com/github/copilot-cli/issues/5606)、[#5599](https://github.com/github/copilot-cli/issues/5599) |
| **长任务与推理模型适配** | 更准确地估算上下文，避免过早、频繁压缩。 | [#5607](https://github.com/github/copilot-cli/issues/5607) |
| **企业环境与安全策略兼容性** | 提升认证缓存可靠性，让沙箱执行符合显式授权。 | [#5600](https://github.com/github/copilot-cli/issues/5600)、[#5601](https://github.com/github/copilot-cli/issues/5601) |
| **跨平台与 PR 协作完整性** | 支持国际化路径，确保代理创建的 PR 可顺畅交接维护者。 | [#5603](https://github.com/github/copilot-cli/issues/5603)、[#5605](https://github.com/github/copilot-cli/issues/5605) |

## 6. 开发者关注点

- **减少静默失败。** 空白响应、扩展未加载和 PR 权限设置被忽略，都需要更明确的诊断反馈。参考：[ACP 空白回合](https://github.com/github/copilot-cli/issues/5602)、[扩展加载](https://github.com/github/copilot-cli/issues/5606)、[PR 权限](https://github.com/github/copilot-cli/issues/5605)。
- **让配置真正决定行为。** 用户期望高档位路由和目录写权限在执行时得到一致落实。参考：[路由配置](https://github.com/github/copilot-cli/issues/5604)、[沙箱权限](https://github.com/github/copilot-cli/issues/5601)。
- **降低长任务中的重复开销。** 频繁上下文压缩、反复账户选择和额外审批都会打断代理工作流。参考：[上下文压缩](https://github.com/github/copilot-cli/issues/5607)、[认证缓存](https://github.com/github/copilot-cli/issues/5600)、[审批提示](https://github.com/github/copilot-cli/issues/5601)。

**综合判断：** 本期发布在持续补强底层可靠性，但新增报告显示，跨入口、跨会话及跨平台的行为一致性仍是值得优先跟踪的方向。由于互动量较低，这些信号应作为排查线索，而非社区共识或已确认的普遍故障。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报｜2026-11-28

## 今日速览

过去 24 小时无新 Release，社区讨论主要围绕 **v2 会话可靠性、工具执行安全和模型兼容性**：权限询问失效、Esc 中断导致历史消息丢失，以及上下文压缩丢失图片等问题值得优先关注。开发侧持续推进 MCP 生命周期与连接优化、后台压缩等待保护，同时出现自动化入口常态化、原生 Windows worker 支持等功能动向。

> **统计口径**：数据源报告过去 24 小时更新了 50 条 Issues、50 条 PR；以下基于展示的 30 条 Issues、20 条 PR 筛选。`CLOSED` 仅表示已关闭，不等同于已修复或已合并；PR 评论数缺失，无法据此判断讨论热度。

## 社区热点 Issues

按风险、影响范围与讨论活跃度综合筛选，而非单纯按评论数排序。

| Issue | 状态 / 评论 | 核心问题与关注理由 |
|---|---|---|
| **[策略为 `ask` 的工具未经询问直接执行 #66861](https://github.com/anomalyco/opencode/issues/66861)** | 已关闭 · 3 条 | 报告称 Linux TUI 的 2.4.1、2.4.2 在相同配置下直接放行 `shell`、`webfetch`，而 2.3.2 正常提示。带有 **high** 严重性标签，涉及权限边界；关闭原因及修复落地情况未提供。 |
| **[Windows 嵌套 Shell 引号处理可能导致误删 #66771](https://github.com/anomalyco/opencode/issues/66771)** | 开放 · 3 条 | 报告称 PowerShell 与 `cmd /c` 的多层解析可能改变删除目标，权限扫描未识别风险。虽标为功能请求，但影响实质上涉及破坏性命令安全，Windows 用户应重点关注。 |
| **[Esc 中断可能删除多条历史消息 #66824](https://github.com/anomalyco/opencode/issues/66824)** | 已关闭 · 3 条 | 报告将问题关联到 v2.4.2 中断时自动执行的 `revert.stage`、`revert.commit`，可能破坏长会话记录。带有 **high** 标签，但不能仅凭关闭状态认定已修复。 |
| **[后台压缩丢失未消费的工具结果图片 #66826](https://github.com/anomalyco/opencode/issues/66826)** | 开放 · 4 条 | 近期上下文被转换为纯文本时，图片信息可能丢失，导致模型反复读取同一图片。带有模拟复现标签，是多模态长会话可靠性的关键问题。 |
| **[`interrupt({resume:true})` 无法恢复排队输入 #66797](https://github.com/anomalyco/opencode/issues/66797)** | 已关闭 · 5 条 | 忙碌会话接收的 `steer` 消息可能滞留收件箱，重新发送又返回 409。属于所展示 Issues 中评论最多的条目之一，直接影响中断、恢复与交互式引导工作流。 |
| **[Inkling 2 mini 无法调用 `edit` 工具 #66840](https://github.com/anomalyco/opencode/issues/66840)** | 开放 · 5 条 | 用户报告模型持续调用 `shell`，而非使用 `edit`，并陷入循环。与上一条并列评论最多，反映模型接入不仅需要接口兼容，还需要验证实际工具行为。 |
| **[`workdir` 在设置超时等参数后被忽略 #66916](https://github.com/anomalyco/opencode/issues/66916)** | 开放 · 1 条 | Windows 用户报告，指定 `timeout` 后命令回到会话默认目录执行，`background` 也疑似受影响。对依赖 worktree 隔离的开发流程风险较高，可能在错误目录执行命令。 |
| **[长会话后台压缩发生上下文超限 #66791](https://github.com/anomalyco/opencode/issues/66791)** | 已关闭 · 2 条 | 报告称 v2.3.1、v2.3.2 中 `/compact` 与后台压缩可能持续报输入超限且无法恢复。带有模拟复现标签，说明压缩机制本身仍是长任务稳定性的薄弱环节。 |
| **[ACP 连接多个 MCP 服务时串行阻塞 #66790](https://github.com/anomalyco/opencode/issues/66790)** | 开放 · 2 条 | `session/new`、`session/load` 传入的 MCP 服务逐个连接，并阻塞 RPC 至最后一个完成或超时。多服务 IDE 集成场景容易放大启动延迟，带有模拟复现标签。 |
| **[Cookie 删除未同步，重新绑定后恢复 #66896](https://github.com/anomalyco/opencode/issues/66896)** | 开放 · 1 条 | CookieMirror 忽略 `expired-overwrite` 删除事件，可能使已删除 Cookie 再次出现，影响退出登录等状态一致性。已有对应修复 PR [#66903](https://github.com/anomalyco/opencode/pull/66903)，尚处开放状态。 |

## 重要 PR 进展

以下均为代码变更提案或已关闭条目，**不代表已进入可下载版本**。

| PR | 状态 | 功能或修复内容 |
|---|---|---|
| **[避免对不支持的模型强制设置 `tool_choice` #66925](https://github.com/anomalyco/opencode/pull/66925)** | 开放 | 针对结构化输出流程强制指定工具、被部分模型拒绝的问题调整调用策略。PR 摘要提及 Claude Sonnet 5.5、Opus 5.5，重点是降低模型能力差异导致的请求失败。 |
| **[为后台压缩摘要等待设置边界 #66913](https://github.com/anomalyco/opencode/pull/66913)** | 开放 | 避免自动压缩等待尚未完成的预计算摘要时无限阻塞。对应 #66766，与当前社区集中反馈的长会话卡住问题方向一致。 |
| **[连接销毁期间保留 MCP 认证状态与事件跟随 #66923](https://github.com/anomalyco/opencode/pull/66923)** | 开放 | 修复 MCP 生命周期中的两类状态问题，避免连接清理过程破坏 `needs_auth` 状态及事件跟随逻辑。 |
| **[等价配置共享池化 MCP 连接 #66914](https://github.com/anomalyco/opencode/pull/66914)** | 已关闭 | 调整等价配置下的连接复用行为，属于 MCP 连接池持续整治的一部分。是否合并需进一步核实。 |
| **[避免启动时加载 MCP SDK，并明确错误类型 #66915](https://github.com/anomalyco/opencode/pull/66915)** | 已关闭 | 处理未配置 MCP 服务时仍因间接导入加载 SDK 的问题，意在减少不必要的启动依赖。 |
| **[允许工具通过 `context.tool.call` 调用其他工具 #66919](https://github.com/anomalyco/opencode/pull/66919)** | 已关闭 | 为工具组合提供正式调用路径，替代直接调用其他工具 `execute`、绕过输入检查的方式。对插件与复合工具开发具有较高价值。 |
| **[支持原生 Windows machine worker #66912](https://github.com/anomalyco/opencode/pull/66912)** | 已关闭 | 调整原先偏向 POSIX 路径和 `sh` 的假设，并配套 worker 仓库变更，拓展 Windows 执行环境支持。 |
| **[自动化功能不再置于实验设置之后 #66899](https://github.com/anomalyco/opencode/pull/66899)** | 已关闭 | 提案让自动化入口常驻侧边栏、标题栏和首页，并整理列表体验，是本批变更中较明确的产品功能推进。 |
| **[将过期 Cookie 删除同步到另一存储端 #66903](https://github.com/anomalyco/opencode/pull/66903)** | 开放 | 对应 Issue #66896，处理 `Max-Age=0` 或过去时间的 `Expires` 删除事件，避免已删除 Cookie 在后续绑定时恢复。 |
| **[将 `@opentui/core` 改为可选 peer 依赖 #66917](https://github.com/anomalyco/opencode/pull/66917)** | 开放 | 处理 SDK 经 server、simulation 间接引入终端 UI 依赖的问题，避免无关消费者被迫满足其 Node ≥26.4 要求，改善 SDK 集成兼容性。 |

## 功能需求趋势

### 1. 长任务需要可控的等待、恢复与退出机制
用户不只希望任务“能运行”，也需要后台任务等待上限、压缩失败恢复，以及会话退出后的资源管理。相关反馈覆盖 CLI 无限等待和 Linux 常驻服务内存占用。  
参考：[后台任务等待控制 #66885](https://github.com/anomalyco/opencode/issues/66885)、[退出 TUI 后服务驻留内存 #66901](https://github.com/anomalyco/opencode/issues/66901)。

### 2. 模型适配从“能连接”转向“能可靠执行工具”
工具选择、历史消息修改、图片输入能力与压缩模型配置之间的兼容性，正在成为接入质量的核心。  
参考：[Inkling 工具调用 #66840](https://github.com/anomalyco/opencode/issues/66840)、[插件导致 Claude 会话逐轮分叉 #66910](https://github.com/anomalyco/opencode/issues/66910)、[文本压缩模型收到图片 #66911](https://github.com/anomalyco/opencode/issues/66911)。

### 3. Windows 需求同时覆盖安全、生命周期和系统集成
除原生执行支持外，用户还要求插件退出清理正确、工作目录可靠，以及资源管理器右键入口，表明 Windows 需求已深入完整开发工作流。  
参考：[插件 cleanup 未执行 #66868](https://github.com/anomalyco/opencode/issues/66868)、[资源管理器入口 #66837](https://github.com/anomalyco/opencode/issues/66837)、[工作目录异常 #66916](https://github.com/anomalyco/opencode/issues/66916)。

### 4. 上下文成本与工具目录需要更多配置权
用户希望控制 Code Mode 工具目录的 token 预算；报告称新会话简单问候也可能消耗约一万输入 token，但这一数字不能视为所有配置的通用基准。  
参考：[目录 token 预算可配置 #66894](https://github.com/anomalyco/opencode/issues/66894)。

### 5. 浏览器与终端体验需要补齐状态一致性和国际化
反馈涉及浏览器控制权切换后的剪贴板能力、Cookie 同步、阿拉伯语 RTL 布局，以及 Unicode 搜索与 Mermaid 渲染。  
参考：[剪贴板权限 #66830](https://github.com/anomalyco/opencode/issues/66830)、[RTL 浏览器布局 #66905](https://github.com/anomalyco/opencode/issues/66905)、[Unicode 搜索 #66815](https://github.com/anomalyco/opencode/issues/66815)、[Mermaid 渲染 #66773](https://github.com/anomalyco/opencode/issues/66773)。

## 开发者关注点

- **安全默认值必须与实际执行一致。** 权限规则为 `ask` 却直接放行，以及跨 Shell 解析改变命令目标，均值得纳入高优先级回归测试。参考：[权限提示 #66861](https://github.com/anomalyco/opencode/issues/66861)、[嵌套 Shell #66771](https://github.com/anomalyco/opencode/issues/66771)。
- **压缩不能以丢失上下文或永久卡住为代价。** 当前痛点同时覆盖图片保留、上下文超限和等待无界，建议将多模态长会话纳入专项测试。参考：[图片丢失 #66826](https://github.com/anomalyco/opencode/issues/66826)、[等待保护 PR #66913](https://github.com/anomalyco/opencode/pull/66913)。
- **中断、恢复与退出应具备明确契约。** 历史消息完整性、排队输入恢复、插件 cleanup 和后台任务收尾，需要作为一套生命周期验证。参考：[恢复输入 #66797](https://github.com/anomalyco/opencode/issues/66797)、[退出清理 #66868](https://github.com/anomalyco/opencode/issues/66868)。
- **集成成本不应随依赖与服务数量无谓增长。** MCP 串行连接和 SDK 间接依赖终端组件，分别影响启动时延与部署兼容性。参考：[ACP/MCP 连接 #66790](https://github.com/anomalyco/opencode/issues/66790)、[可选依赖 PR #66917](https://github.com/anomalyco/opencode/pull/66917)。

**今日判断：** 从所展示条目看，稳定性与执行安全比新增界面功能更值得优先跟踪；下一步应重点确认高风险 Issue 的关闭原因、修复 PR 的合并情况及其实际发布版本。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-11-28

> 数据范围：所提供的过去 24 小时 GitHub 更新，共 1 个 Release、23 个 Issues、8 个 PR。数据来源标注为 `badlogic/pi-mono`，条目链接指向 `earendil-works/pi`，下文沿用条目链接。**Closed 不等于已修复或已合并**，具体落地情况需核对提交和发布记录。

## 1. 今日速览

Pi 发布 **v1.7.0**，已知新增终端会话恢复能力，可在兼容终端重启后恢复当前会话及其配置。社区反馈主要集中在 **长会话与内存稳定性、Gemini 等模型适配中的协议完整性**；PR 侧则涉及 codemode 内存控制、跨平台环境识别和 HTML 导出修复。当前样本讨论量较低，多数 Issue 仅有 1–3 条评论，尚不足以判断广泛社区共识。

## 2. 版本发布

### [v1.7.0：终端会话恢复](https://github.com/earendil-works/pi/releases/tag/v1.7.0)

- **新增能力**：兼容终端可在重启后重新打开当前 Pi 会话，保留原有 profile、工具限制和指令。
- **开发者价值**：减少终端重启后的环境重建成本，尤其有利于依赖特定工具权限和指令配置的工作流。
- **信息边界**：提供的 Release 正文被截断，只能确认上述功能，不能据此推断其他更新。

参考：[终端恢复文档](https://github.com/earendil-works/pi/blob/v1.7.0/packages/coding-agent/docs/terminal-setup.md#program-resume)。

## 3. 社区热点 Issues

以下按潜在影响和技术代表性筛选，不以评论数作为唯一排序依据。

| Issue | 核心问题与重要性 | 社区反应 / 当前状态 |
|---|---|---|
| [#12624：codemode 嵌套工具调用导致 OOM](https://github.com/earendil-works/pi/issues/12624) | 报告称 RPC 模式下约 7 秒内发生 1,700 次嵌套调用，进度更新持续携带历史调用行，最终触及 4 GB 堆限制。对自动化代理和高频重试工作流影响较大。 | **Closed，1 评论**；有对应修复 PR #12623，但合并情况未提供。 |
| [#12626：缺失时间戳导致 `max_tokens` 被压至 1](https://github.com/earendil-works/pi/issues/12626) | 报告指出缺失 `message.timestamp` 会使使用量计算产生 `NaN`，导致上下文尚未用满时也只能输出 1 token，影响本地 OpenAI 兼容服务的可用性。 | **Closed，1 评论**；带 `bug`、`untriaged` 标签，不能据关闭状态认定已修复。 |
| [#12632：虚拟模型路由触发空会话压缩](https://github.com/earendil-works/pi/issues/12632) | 虚拟模型预留 token 与实际路由模型窗口不匹配，可能导致空会话也触发压缩。暴露出动态路由与上下文预算之间的边界问题。 | **Closed，2 评论**；报告称可在无扩展、无模型调用条件下复现阈值检查。 |
| [#12625：请求体超限未触发压缩](https://github.com/earendil-works/pi/issues/12625) | opencode-go 将 48 MiB 请求体限制返回为 HTTP 400，Pi 未进入压缩流程，导致会话无法继续。说明恢复逻辑还需要考虑字节限制，而不只是 token 限制。 | **Closed，1 评论**；暂无可确认的修复信息。 |
| [#12616：以异步迭代器读取持久化上下文](https://github.com/earendil-works/pi/issues/12616) | 提议增加可选的 `Conversation.contextMessages()`，按序输出消息，避免一次性保留全部消息体，同时保留原有 `context()`。对长会话内存效率具有直接价值。 | **Open，2 评论**，标记为 `durable`；是本批次唯一仍开放的 Issue。 |
| [#12637：Gemini 的 base64url 思考签名被丢弃](https://github.com/earendil-works/pi/issues/12637) | 校验逻辑只接受标准 base64，而部分兼容主机返回 URL-safe 编码，导致回放丢失 `thoughtSignature`，后续工具调用请求报 400。企业代理接入尤其需要关注。 | **Closed，1 评论**；标记为 `untriaged`。 |
| [#12613：OpenAI 兼容适配器丢失 Gemini 工具签名](https://github.com/earendil-works/pi/issues/12613) | 流式工具调用中的 `extra_content.google.thought_signature` 未被保留，首次调用成功但后续回放失败，影响跨协议模型接入。 | **Closed，1 评论、1 👍**；是本批 Issue 中唯一获得点赞的条目，但互动仍有限。 |
| [#12615：不同索引的推理详情被错误合并](https://github.com/earendil-works/pi/issues/12615) | `reasoning_details` 增量合并只比较类型、未区分 `index`，报告称会丢失第二个签名。流式协议实现需要保留分段身份，而非仅拼接文本。 | **Closed，1 评论**；未提供处理结论。 |
| [#12621：支持 Vertex 流式工具参数](https://github.com/earendil-works/pi/issues/12621) | 请求解析 `partialArgs`、`willContinue`，补齐 Google Vertex 工具参数流式传输能力，关系到增量展示和上层工具编排。 | **Closed，1 评论**；是否落地无法从状态确认。 |
| [#12630：可选浏览器 Web UI](https://github.com/earendil-works/pi/issues/12630) | 提议通过类似 `pi --web port 3000` 的方式提供浏览器入口，反映出 CLI 之外的交互需求。 | **Closed，1 评论**，标记为 `no-action`；当前数据不支持将其视为已采纳路线。 |

## 4. 重要 PR 进展

**本次只提供 8 个 PR，以下全部列出，不补造至 10 个。** PR 评论数字段均缺失，不据此判断讨论热度。

| PR | 状态 | 功能或修复内容 |
|---|---|---|
| [#12635：macOS / BSD 进程锁改进](https://github.com/earendil-works/pi/pull/12635) | **Open** | 针对以临时 socket 文件作为锁所有权标记的方案，改用随持有进程结束而释放的内核锁，避免进程被信号终止后遗留锁文件、阻塞后续启动。涉及 Chord、p3 等组件。 |
| [#12614：Google AI plan](https://github.com/earendil-works/pi/pull/12614) | **Open** | 标题显示与 Google AI plan 相关；未提供正文，无法确认接入方式、认证机制或模型范围。 |
| [#12623：限制 codemode 嵌套调用进度行](https://github.com/earendil-works/pi/pull/12623) | **Closed** | 对应 #12624，尝试限制嵌套调用记录及进度数据规模，降低高频调用下的内存与序列化压力。 |
| [#12634：无 WSL 环境变量时仍能识别 WSL](https://github.com/earendil-works/pi/pull/12634) | **Closed** | 处理剪贴板、按键绑定等路径使用不同 WSL 检测条件的问题，提升环境变量不完整时的识别一致性。 |
| [#12609：保留 HTML 导出中的 `$`](https://github.com/earendil-works/pi/pull/12609) | **Closed** | 对应 #12608，修复字符串替换时 `$` 特殊序列被展开的问题；除费用符号外，也涉及嵌入脚本内容的完整性。 |
| [#12610：资源文件变更自动重载](https://github.com/earendil-works/pi/pull/12610) | **Closed** | 提议监听用户级和项目级扩展、技能、提示词及主题目录，减少手动 `/reload`，并提供退出自动监听的选项。 |
| [#12611：新增 CTYUN Token Plan provider](https://github.com/earendil-works/pi/pull/12611) | **Closed** | 提议接入 CTYUN Token Plan 的 OpenAI 兼容模型；关联需求 #12619 同样已关闭并标记 `no-action`，不能视为已内置支持。 |
| [#12628：补充 p3 参考资料入口](https://github.com/earendil-works/pi/pull/12628) | **Closed** | 为 p3 文档增加 Reference artifacts，链接组织内可见的 Radius 工作方法、产品定义、概念及组件规格材料。 |

## 5. 功能需求趋势

### ① 长会话处理：从“可运行”走向“有界内存”
上下文异步迭代、请求体流式构建、codemode 进度限制等反馈，都指向同一诉求：**避免每一步都保留、复制或序列化完整历史数据**。  
相关：[上下文迭代 #12616](https://github.com/earendil-works/pi/issues/12616)、[Codex SSE 请求流式化 #12617](https://github.com/earendil-works/pi/issues/12617)、[OOM #12624](https://github.com/earendil-works/pi/issues/12624)。

### ② 模型接入：协议细节比模型目录更关键
签名保留、推理分段索引、工具参数流式解析，以及不同 provider 的错误重试一致性成为集中反馈点。  
相关：[Gemini 签名 #12637](https://github.com/earendil-works/pi/issues/12637)、[推理详情合并 #12615](https://github.com/earendil-works/pi/issues/12615)、[原生 Google 重试一致性 #12622](https://github.com/earendil-works/pi/issues/12622)。

### ③ 交互体验：更灵活的呈现与扩展初始化
需求覆盖仅对正文限制行宽、浏览器入口、编辑器和页脚在首次绘制前注册等，但多项已关闭，尚不能认定为产品规划。  
相关：[正文换行 #12607](https://github.com/earendil-works/pi/issues/12607)、[Web UI #12630](https://github.com/earendil-works/pi/issues/12630)、[扩展首屏注册 #12631](https://github.com/earendil-works/pi/issues/12631)。

### ④ 运行环境与模型配置兼容性
NixOS Node.js 版本、模型推理等级变更、新 provider 接入等反馈，反映开发者对环境可配置性和升级兼容性的要求。  
相关：[NixOS #12627](https://github.com/earendil-works/pi/issues/12627)、[Baseten `medium` 等级 #12612](https://github.com/earendil-works/pi/issues/12612)、[CTYUN #12619](https://github.com/earendil-works/pi/issues/12619)。

## 6. 开发者关注点

- **优先验证长会话恢复能力**：除 token 窗口外，还应测试请求体大小上限、模型路由变化和元数据缺失时的行为，避免会话陷入不可继续状态。参考 [#12625](https://github.com/earendil-works/pi/issues/12625)、[#12626](https://github.com/earendil-works/pi/issues/12626)、[#12632](https://github.com/earendil-works/pi/issues/12632)。
- **代理或兼容接口接入需做多轮工具调用测试**：首轮成功不代表适配完整；思考签名往往在后续回放时才暴露问题。参考 [#12613](https://github.com/earendil-works/pi/issues/12613)、[#12637](https://github.com/earendil-works/pi/issues/12637)。
- **自动化工作流需要限制进度数据增长**：工具重试循环不仅消耗调用资源，也可能通过历史进度复制放大内存压力。参考 [#12624](https://github.com/earendil-works/pi/issues/12624)、[PR #12623](https://github.com/earendil-works/pi/pull/12623)。
- **第三方扩展还需核查服务条款**：`pi-antigravity` 出现关于使用方式可能违反 Google Antigravity 条款的报告；这属于报告者陈述，不能据此认定包具有恶意行为。参考 [#12618](https://github.com/earendil-works/pi/issues/12618)。

**结论：** 本批动态中，最值得开发者跟进的不是功能数量，而是长会话资源控制与模型协议保真度；升级验证应优先覆盖这两类场景。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：2026-11-28｜仓库：[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)**

> 统计口径：基于提供的过去 24 小时数据，包含 1 条 Release、29 条更新的 Issue，以及 50 条更新 PR 中展示的 20 条。PR 的 `CLOSED` 不等于已合并，下文按数据所示状态描述；PR 评论数缺失，不进行讨论热度排名。

## 1. 今日速览

今天的主线是 **Managed Agent 的托管调度与外部工作区生命周期管理**：Harness 拉取调度进入设计讨论，共享 Worker、工作区退役和保留会话删除等场景持续完善。用户侧问题集中在 Web Shell 会话恢复、Artifacts 入口及配置可靠性；发布侧则出现 **v0.29.0 和 nightly 的 quality 任务失败报告**，值得升级用户关注。

## 2. 版本发布

### [sdk-typescript-v0.1.39](https://github.com/QwenLM/qwen-code/releases/tag/sdk-typescript-v0.1.39)

- 发布名称为 **SDK TypeScript Release sdk-typescript-v0.1.39**。
- 发布说明首段标注捆绑 **CLI 0.28.7**，CLI 从与 SDK 相同的分支或引用构建。
- **信息限制**：提供的说明存在重复段落，后续还出现 CLI 0.28.6，且正文被截断。因此，本次只能确认发布记录，无法据此归纳完整 SDK 功能变更或最终捆绑版本。

**发布风险提醒**：[v0.29.0 发布失败 #18564](https://github.com/QwenLM/qwen-code/issues/18564) 与 [v0.28.7 nightly 发布失败 #18569](https://github.com/QwenLM/qwen-code/issues/18569) 均指向 `quality` 任务失败；不能将发布标签出现视为成功发布。

## 3. 社区热点 Issues

以下按技术影响和讨论活跃度综合选择。**所选 Issue 均处于 OPEN 状态，点赞均为 0**；评论数仅反映当前讨论量，不代表社区共识。

| Issue | 核心问题与关注价值 | 社区反应 |
|---|---|---|
| [#18514：Hosted Harness 拉取调度提案](https://github.com/QwenLM/qwen-code/issues/18514) | 让 Harness 通过出站 HTTP 长轮询领取可运行 Session，并上报能力与空闲槽位。关系到托管执行架构、网络连通方式和调度扩展性。 | **7 条评论**，样本中讨论最多；P2，标记需要讨论。 |
| [#18508：Artifacts 应先展示列表](https://github.com/QwenLM/qwen-code/issues/18508) | 报告称在 v0.28.7 和 main 上，打开 Artifacts 会自动选中并预览条目，而非停留在列表。影响导航可预期性。 | **6 条评论**；P2，是用户体验类讨论焦点。 |
| [#18544：不同工作目录的 Files 会话共享 Worker](https://github.com/QwenLM/qwen-code/issues/18544) | 希望多个授权会话在注册挂载下选择不同目录，同时复用 Worker，有助于提高托管资源利用率。 | **3 条评论**，标记 `in-progress`。 |
| [#18541：可信次级工作区支持 branch/fork](https://github.com/QwenLM/qwen-code/issues/18541) | 为可信次级工作区的活动会话开放分支能力，补齐多工作区协作体验；需要覆盖所有权路由测试。 | **3 条评论**；P2，承接此前暂不计划的需求。 |
| [#18498：Anthropic 图片/PDF 结尾缺少缓存断点](https://github.com/QwenLM/qwen-code/issues/18498) | 当前缓存断点逻辑仅处理末尾为文本或工具结果的块，可能影响多模态对话的缓存命中与成本表现。 | **2 条评论**；P2，归入性能与缓存问题。 |
| [#18565：外部工作区退役后无法删除保留会话](https://github.com/QwenLM/qwen-code/issues/18565) | 工作区永久退役后，历史会话删除因缺少执行授权失败，暴露数据清理与运行时生命周期耦合问题。 | **1 条评论**；已有对应 PR #18566，但 Issue 仍开放。 |
| [#18571：自动保留的 worktree 无法恢复](https://github.com/QwenLM/qwen-code/issues/18571) | 恢复请求使用已删除的 checkout 作为 workspace，导致恢复路径受阻。直接影响归档会话的可恢复性。 | **0 条评论**；11 月 28 日更新，仍待进一步反馈。 |
| [#18562：`/advisor` 模型选择破坏配置](https://github.com/QwenLM/qwen-code/issues/18562) | v0.28.7 被报告将空字符和 URL 写入 `advisorModel`，阻止 advisor 初始化，属于功能阻断型配置问题。 | **0 条评论**，待分诊。 |
| [#18564：v0.29.0 发布失败](https://github.com/QwenLM/qwen-code/issues/18564) | 发布工作流的 `quality` 任务失败，影响版本交付，需要关注后续重跑与正式发布状态。 | **0 条评论**；机器人报告，已标记可由 Agent 处理及自动修复获批。 |
| [#18575：Windows 企业部署需要机器级运行时目录配置](https://github.com/QwenLM/qwen-code/issues/18575) | 希望支持 HKLM 级 CLI runtime 目录固定，适配按机器安装、集中管理的企业部署。 | **0 条评论**；新提出的部署能力需求。 |

## 4. 重要 PR 进展

以下 10 项覆盖调度架构、工作区可靠性、验证安全与 CI 稳定性。

| PR | 状态 | 功能或修复内容 |
|---|---|---|
| [#18561：Harness 拉取已释放 Session 的设计](https://github.com/QwenLM/qwen-code/pull/18561) | OPEN | 为 #18514 的 P1 阶段提供中英文设计，面向空闲挂起或 Action park 后释放的 Session；**不含生产代码变更**。 |
| [#18557：将新 Turn 的事件投递交给 Harness](https://github.com/QwenLM/qwen-code/pull/18557) | CLOSED | 衔接此前的控制面接收路由与 Harness 推送器，通过新设置启用，是事件接入工作的第三部分。 |
| [#18566：退役后删除保留会话](https://github.com/QwenLM/qwen-code/pull/18566) | CLOSED | 允许可信 Java 宿主携带原工作区、代次及退役操作信息，完成外部工作区永久删除后的会话清理。 |
| [#18560：按存储所有者限定挂载路径恢复](https://github.com/QwenLM/qwen-code/pull/18560) | CLOSED | 区分相同绝对挂载路径背后的不同存储所有者，避免独立外部工作区互相阻塞。 |
| [#18551：共享 Files Worker 退役排空](https://github.com/QwenLM/qwen-code/pull/18551) | CLOSED | 支持 Broker 为工作区级外部 Files Worker 请求排空停止回执，同时保留租约、epoch 等身份校验。 |
| [#18555：切换失败时仍展示分支来源警告](https://github.com/QwenLM/qwen-code/pull/18555) | OPEN | 分支创建完成后立即展示来源警告，即使后续会话切换被拒绝或中止，也不丢失提示。 |
| [#18552：`/verify-pr` 主机能力探测与逐轮 VM 准备](https://github.com/QwenLM/qwen-code/pull/18552) | OPEN | 补齐硬件隔离 microVM 验证的主机就绪检查和每轮运行目录准备，减少运维脚本依赖。 |
| [#18549：对抗式验证与发布保护](https://github.com/QwenLM/qwen-code/pull/18549) | OPEN | 针对破坏性 diff 增加验证协议，捕获顶层评审意见，并设置机械化发布保护，防范静默数据丢失及过期提交结论。 |
| [#18546：加固自动修复的状态与同意检查](https://github.com/QwenLM/qwen-code/pull/18546) | CLOSED | 针对 11 项评审发现，防范 PR 分支伪造已跟踪 watch 状态文件，要求显式 watch 同意，并修正原地 skill 规则。 |
| [#18568：降低发行测试进程观察器干扰](https://github.com/QwenLM/qwen-code/pull/18568) | OPEN | 将进程观察器移出 PTY 事件循环，限制扫描频率与后代进程探测数量，处理 #18567 所涉发行测试问题。 |

## 5. 功能需求趋势

### ① Managed Agent：从“可执行”走向“可运营”
需求覆盖拉取调度、Worker 共享、宿主动作调用和退役清理，显示讨论重点正扩展到托管资源调度与完整生命周期管理。  
相关：[拉取调度 #18514](https://github.com/QwenLM/qwen-code/issues/18514) · [共享 Worker #18544](https://github.com/QwenLM/qwen-code/issues/18544) · [宿主级动作 #18578](https://github.com/QwenLM/qwen-code/issues/18578)

### ② 多工作区与会话分支能力持续深化
用户期待次级工作区获得更完整的分支、分组和恢复能力；能力扩展同时带来所有权路由与状态一致性挑战。  
相关：[次级工作区分支 #18541](https://github.com/QwenLM/qwen-code/issues/18541) · [分组恢复 #18527](https://github.com/QwenLM/qwen-code/issues/18527) · [worktree 恢复 #18571](https://github.com/QwenLM/qwen-code/issues/18571)

### ③ 企业部署与嵌入式集成需求增加
机器级运行时配置、可选 Worker 控制端口、嵌入宿主保存草稿等需求，体现出桌面之外的集中部署和产品集成场景。  
相关：[Windows HKLM 配置 #18575](https://github.com/QwenLM/qwen-code/issues/18575) · [Worker 端口选择 #18501](https://github.com/QwenLM/qwen-code/issues/18501) · [嵌入式草稿历史 #18515](https://github.com/QwenLM/qwen-code/issues/18515)

### ④ 性能关注落到多模态缓存细节
本批数据中，性能方向最明确的用户反馈是 Anthropic 图片/PDF 消息的缓存断点覆盖，而非新模型支持。  
相关：[#18498](https://github.com/QwenLM/qwen-code/issues/18498)

## 6. 开发者关注点

- **恢复与删除必须可靠。** worktree 恢复、外部工作区退役和历史会话删除形成同一类痛点：运行环境消失后，用户仍需要管理已有数据。  
  参考：[#18571](https://github.com/QwenLM/qwen-code/issues/18571)、[#18565](https://github.com/QwenLM/qwen-code/issues/18565)。

- **界面提示必须忠实反映状态。** Artifacts 自动预览、侧任务错误显示“interrupted”、分支警告丢失，都可能让用户误判系统行为。  
  参考：[#18508](https://github.com/QwenLM/qwen-code/issues/18508)、[#18574](https://github.com/QwenLM/qwen-code/issues/18574)、[#18553](https://github.com/QwenLM/qwen-code/issues/18553)。

- **配置与环境诊断需要更稳健。** `/advisor` 配置损坏与 Windows `/doctor` 误报 npm 不可用，都会增加排障成本；开发文档中的 npm 指令与 CI 使用的 pnpm 锁文件也需保持一致。  
  参考：[#18562](https://github.com/QwenLM/qwen-code/issues/18562)、[#18563](https://github.com/QwenLM/qwen-code/issues/18563)、[#18524](https://github.com/QwenLM/qwen-code/issues/18524)。

- **CI 必须区分真实缺陷与测试不稳定。** 当前反馈同时涉及发行测试、Web Shell 更新流程和关键帧超时测试；发布质量门禁失败也说明交付链路仍需重点观察。  
  参考：[#18567](https://github.com/QwenLM/qwen-code/issues/18567)、[#18540](https://github.com/QwenLM/qwen-code/issues/18540)、[#18536](https://github.com/QwenLM/qwen-code/issues/18536)、[#18564](https://github.com/QwenLM/qwen-code/issues/18564)。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报
**日期：2026-11-28｜统计范围：所提供的过去 24 小时数据**

> **数据归属提示：**标注的数据源为 [Hmbown/DeepSeek-TUI](https://github.com/Hmbown/DeepSeek-TUI)，但全部 PR 均指向 [codewhale-hq/Codewhale](https://github.com/codewhale-hq/Codewhale)。以下按所提供记录整理，**这些变更是否属于 DeepSeek TUI 尚需核实**；PR 更新时间均显示为 2026-11-27，因缺少具体时间与时区，无法独立确认其统计窗口归属。

## 1. 今日速览

本批数据没有新版本或更新的 Issue，共收录 **9 个 PR：8 个开放、1 个已关闭**，主要活动是 Dependabot 发起的 Rust 依赖与 CI 工作流升级。最值得关注的是上下文压缩过程中误替换真实用户消息的修复，以及 `gix`、`sha2` 等升级的兼容性验证；其中修复 PR 虽已关闭，但**数据未说明是否合并**。

## 2. 社区热点 Issues

**本批数据未收录过去 24 小时更新的 Issue，因此没有可供筛选的热点条目。**不能据此判断项目不存在未解决问题，也无法评估 Issue 讨论热度或社区诉求。

仓库入口：[DeepSeek-TUI Issues](https://github.com/Hmbown/DeepSeek-TUI/issues)

## 3. 重要 PR 进展

实际仅有 9 个 PR，以下全部列出，按关注优先级排序。

| PR | 状态 | 内容与关注价值 |
|---|---|---|
| [#7565：保留粘贴的摘要标题](https://github.com/codewhale-hq/Codewhale/pull/7565) | 已关闭，合并情况未知 | 修复上下文压缩可能将以旧版摘要标题开头的真实用户消息误当成摘要并替换的问题。改用检查点结构及来源信息判断替换对象，降低误处理用户文本的风险。由外部贡献者 NieZhuZhu 提交。 |
| [#7568：升级 gix](https://github.com/codewhale-hq/Codewhale/pull/7568) | 开放 | `0.90.0 → 0.91.0`。摘要中的上游发布说明包含 **BREAKING** 提示，建议重点检查相关 API 适配，并验证项目实际使用的 Git 操作路径。 |
| [#7573：升级 sha2](https://github.com/codewhale-hq/Codewhale/pull/7573) | 开放 | `0.10.9 → 0.11.1`。属于 `0.x` 次版本升级，应关注哈希 API、类型及依赖兼容性；现有摘要未说明该升级是否涉及安全修复。 |
| [#7572：升级 qrcode](https://github.com/codewhale-hq/Codewhale/pull/7572) | 开放 | `0.14.1 → 0.15.0`，带有 `area:runtime-api` 标签。需要验证项目相关二维码生成流程，摘要未提供具体功能变化。 |
| [#7570：更新发布 Action 引用](https://github.com/codewhale-hq/Codewhale/pull/7570) | 开放 | 将 `scripts/github-action/publish` 从 `43c87b4…` 更新至 `03c673e…`。涉及发布工作流，应关注目标提交变更及发布链路回归。 |
| [#7566：更新 Codewhale Action 引用](https://github.com/codewhale-hq/Codewhale/pull/7566) | 开放 | 将 `codewhale-hq/Codewhale` 引用从 `836ba65…` 更新至 `03c673e…`。与 #7570 指向同一目标提交，适合联动审查工作流兼容性。 |
| [#7567：升级 GitHub App Token Action](https://github.com/codewhale-hq/Codewhale/pull/7567) | 开放 | `actions/create-github-app-token` 从 `3.3.0 → 3.4.0`。建议验证令牌生成、权限及依赖该令牌的自动化流程。 |
| [#7569：升级 ahash](https://github.com/codewhale-hq/Codewhale/pull/7569) | 开放 | `0.8.12 → 0.8.13`。摘要提及上游修复，但内容不完整，尚不能判断项目能获得哪些具体收益。 |
| [#7571：升级 lru](https://github.com/codewhale-hq/Codewhale/pull/7571) | 开放 | `0.19.0 → 0.19.2`。属于补丁升级，建议结合完整变更日志及缓存相关测试评估，不能直接推断存在性能提升。 |

**社区反应：**9 个 PR 的 👍 均为 0，评论数均为 `undefined`（缺失值），因此不能认定“无人讨论”，也不宜据此进行热度排名。8 个开放 PR 均由 Dependabot 发起。

## 4. 功能需求趋势

**没有 Issue 样本，无法提炼可靠的社区功能需求趋势。**仅从 PR 可观察到以下工程维护方向，不应将其等同于用户需求：

- **上下文压缩的内容保真：**避免把用户粘贴的摘要样式文本误判为系统摘要，体现对消息来源识别与内容保留边界的关注。参见 [#7565](https://github.com/codewhale-hq/Codewhale/pull/7565)。
- **Rust 依赖兼容性维护：**涉及 Git 操作、哈希、缓存及二维码库，当前记录以升级维护为主，而非新增面向用户的能力。参见 [#7568](https://github.com/codewhale-hq/Codewhale/pull/7568)、[#7573](https://github.com/codewhale-hq/Codewhale/pull/7573)。
- **CI 与发布链路维护：**3 个 PR 涉及 GitHub Actions 或其提交引用，显示自动化工具链正在更新。参见 [#7570](https://github.com/codewhale-hq/Codewhale/pull/7570)、[#7567](https://github.com/codewhale-hq/Codewhale/pull/7567)、[#7566](https://github.com/codewhale-hq/Codewhale/pull/7566)。

本批数据没有足够证据支持 IDE 集成、新模型支持或性能优化成为社区热点。

## 5. 开发者关注点

当前可确认的是**单项缺陷与维护事项**，尚不足以归纳高频反馈：

1. **上下文压缩不能误处理真实用户输入。**建议重点复测以旧摘要标题开头的粘贴文本及其保留行为，并确认修复是否已合并、进入哪个版本。关联 [#7565](https://github.com/codewhale-hq/Codewhale/pull/7565)。
2. **依赖升级应优先检查兼容性风险。**尤其是带有上游破坏性变更提示的 `gix`，以及跨 `0.x` 次版本的 `sha2`、`qrcode`。关联 [#7568](https://github.com/codewhale-hq/Codewhale/pull/7568)、[#7573](https://github.com/codewhale-hq/Codewhale/pull/7573)、[#7572](https://github.com/codewhale-hq/Codewhale/pull/7572)。
3. **发布工作流更新需要端到端验证。**重点确认新提交引用与令牌 Action 升级后，权限、构建和发布步骤仍能正常执行。关联 [#7570](https://github.com/codewhale-hq/Codewhale/pull/7570)、[#7567](https://github.com/codewhale-hq/Codewhale/pull/7567)。

**后续优先事项：先核实仓库归属与 #7565 的合并状态，再评估依赖升级测试结果，避免把待审变更误当成已交付能力。**

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*