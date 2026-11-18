# AI CLI 工具社区动态日报 2026-11-18

> 生成时间: 2026-11-18 04:42 UTC | 覆盖工具: 9 个

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
**观察日期：2026-11-18｜基于所提供的社区动态快照**

> **口径说明：**各仓库采样范围不同，以下区分“更新记录总数”“展示样本”和“精选条目”，不将它们直接作为热度排名。Issue 属于用户反馈；PR 关闭不代表合并，发布新版本也不代表相关问题已修复。差异化定位为基于本日功能与工程动向的分析，而非官方市场定位。

## 1. 生态全景

AI CLI 正从“终端里的代码助手”演进为连接 IDE、浏览器、云端、移动端和后台代理的开发执行平台。竞争重点开始从模型接入和工具数量，转向**长任务恢复、权限治理、配置保真与执行状态可观测性**。MCP、Hooks、插件和多代理扩大了能力边界，也让兼容性与生命周期管理成为跨产品共同难题。与此同时，提示缓存、上下文压缩和费用计量进入工程优化重点，表明开发者越来越关注持续使用成本，而不仅是单次任务效果。

## 2. 各工具活跃度对比

**下表统计的是窗口内更新记录，不等同于当日新建数量。**

| 工具 | Issues | PR | Release 情况 | 本日主要信号 |
|---|---:|---:|---|---|
| **Claude Code** | 50 条，展示 30 条 | 0 | 1 个：v2.1.327 | 操作与凭据安全；数据风险、Hooks、跨端会话反馈 |
| **OpenAI Codex** | 50 条，展示 30 条 | 50 条，展示 20 条 | 4 个，含正式版、维护版及预发布版 | 语音、遥测、MCP扩展；沙箱、云端恢复、子代理可视化 |
| **Gemini CLI** | 6 条 | 13 条 | 无新 Release；Nightly 发布失败 | MCP 参数解析、Git SSH、Shell 权限判断 |
| **GitHub Copilot CLI** | 13 条 | 0 | 2 个：v1.0.113、v1.0.114-0 | 企业 Browser Use 管控；扩展兼容、指令加载、Fusion |
| **Kimi Code CLI** | 0 | 0 | 无活动记录 | 单日无活动，不代表项目停滞 |
| **OpenCode** | 总数未提供；精选 10 条 | 总数未提供；精选 10 条 | 3 个：v2.3.2、v2.3.1、v1.19.6 | 缓存优化、Shell 后台续跑、V1→V2 升级 |
| **Pi** | 19 条 | 2 条 | 无新 Release | 会话并发、缓存计量、压缩扩展；记录均为 Closed |
| **Qwen Code** | 提供 30 条样本 | 提供 20 条样本 | 4 个，覆盖 CLI、Desktop、SDK及预览版 | Daemon 恢复、Managed Agent、SSE、Java SDK |
| **DeepSeek TUI／Codewhale*** | 1 条 | 6 条* | 未提供新发布记录 | TUI 响应性、恢复回滚、MCP Schema 兼容 |

\* Pi 与 DeepSeek TUI 均存在来源名称与实际链接仓库不一致的情况；DeepSeek TUI 的一条 PR 还存在时间窗口口径差异，横向比较应谨慎。

## 3. 共同关注的功能方向

| 共同方向 | 涉及工具 | 具体诉求及决策意义 |
|---|---|---|
| **长任务连续性与故障恢复** | Claude Code、Codex、OpenCode、Qwen Code、Pi、Copilot CLI | 解决归档后重连失败、断流循环、会话分叉、Worktree 恢复阻塞和跨上下文阶段中断。应把**故障后的恢复能力**纳入验收，而不只测首次执行成功率。 |
| **规则、配置和能力加载透明度** | Claude Code、Copilot CLI、Gemini CLI、Qwen Code、DeepSeek TUI | 指令静默漏加载、MCP 参数失真、配置迁移偏离用户意图、工具被适配层丢弃。需要能明确查看“哪些规则和工具实际生效”。 |
| **扩展生态与生命周期稳定性** | Claude Code、Copilot CLI、Pi、Qwen Code | Hooks 输入变更与权限判断不一致、SDK 包兼容、重复初始化、热重载冲突、扩展事件遗漏。扩展 API 的稳定契约正在成为平台能力。 |
| **权限、安全与企业治理** | Claude Code、Codex、Gemini CLI、Copilot CLI、Qwen Code | 破坏性操作确认、授权目录访问、Shell 展开重检、管理员运行时禁用浏览器、持久化规则约束。关键是兼顾安全边界和正常工作流。 |
| **浏览器与跨端状态一致性** | Claude Code、Codex、Copilot CLI、OpenCode | 浏览器工具初始化和会话生命周期、标签页归还、远程会话接续、移动端过期权限同步。能连接只是起点，状态和资源所有权也必须一致。 |
| **缓存、成本与上下文治理** | OpenCode、Pi、Codex、Gemini CLI | 提示缓存命中、费用计量、推理档位切换、压缩预算、自定义模型窗口配置。需要结合账单、请求结构与真实模型限制验证效果。 |

这些方向共同指向一个变化：**Agent 的输出质量越来越依赖执行平台是否正确传递配置、状态、工具结果和完成事件。**

## 4. 差异化定位分析

| 工具 | 功能与技术侧重 | 更匹配的用户／场景 | 当前需要验证的边界 |
|---|---|---|---|
| **Claude Code** | 围绕项目指令、Hooks、Agent、插件及 Remote Control 构建工作流 | 深度定制仓库规范、子代理编排和跨设备工作的团队 | 自动权限与 Hooks 的组合；配置加载和数据可恢复性 |
| **Codex** | TUI、桌面、Cloud、app-server、沙箱及浏览器能力并行发展 | 需要本地与云端协作、多客户端和受控执行环境的团队 | Windows 安装、工作区权限、浏览器连接、断流恢复 |
| **Gemini CLI** | 本日更偏 CLI 核心、MCP 配置、Shell 安全及 ACP 集成 | 以命令行为主、需要 MCP、自定义网关或客户端集成的开发者 | 基础配置解析、Git SSH 和 Nightly 交付 |
| **Copilot CLI** | 企业托管设置、扩展市场、仓库指令与 Fusion 多阶段执行 | 重视组织治理、扩展分发和多阶段任务的团队 | 扩展升级兼容、指令发现和跨会话评审证据 |
| **OpenCode** | 多模型／Provider 适配、GUI/TUI、移动端、Code Mode 与插件 | 需要灵活模型选择、跨端操作及执行环境定制的用户 | V2 迁移、存储增长、历史数据可见性和客户端性能 |
| **Pi** | 从反馈看，更强调可编程扩展、Provider 路由和压缩事件机制 | 希望自行组合模型、工具和上下文策略的高级开发者 | 多实例会话写入、异常隔离和扩展事件一致性 |
| **Qwen Code** | CLI、Desktop、SDK 联动，推进 Daemon、Managed Agent 与后台事件驱动 | 将代理嵌入业务系统、开展后台自动化和 SDK 集成的团队 | Java 协议正确性、SSE 终止语义、自动任务与恢复交互 |
| **DeepSeek TUI／Codewhale** | 本日聚焦终端交互、撤销事务和模型适配层 | 重视终端响应、文件恢复与 MCP 兼容的用户 | 仓库归属待核实；改动多处于待合并阶段 |
| **Kimi Code CLI** | 本日无可分析增量 | 信息不足，暂不判断 | 不宜据单日静默推断其定位或成熟度 |

## 5. 社区热度与成熟度

### 活跃度：Codex 信号最完整，Qwen Code 与 OpenCode 迭代覆盖面突出

- **Codex** 同时有较多 Issue、PR 和多个版本发布，是当前样本中开发活动最明确的平台之一。
- **Qwen Code** 的 30 条 Issue、20 条 PR 样本及四类发布，体现 CLI、桌面、SDK和后台基础设施并行推进。
- **OpenCode** 单日三个版本覆盖成本优化、执行语义和大版本升级，显示较快迭代节奏，但缺少完整 Issue／PR 总数。
- **Claude Code** 的 Issue 更新量较高，但本窗口无 PR 更新，不能据此推断修复速度。
- **Gemini CLI** 的 6 条 Issue 对应 13 条 PR，且三项报告已有直接关联修复 PR，反馈到修复提案的路径较清晰；尚不能视为已交付。

### 讨论热度：多数仍是早期反馈

OpenCode 中文标题字形问题有 **10 条评论**，Pi 多实例会话分叉有 **5 条评论**，Qwen 检索问题有 **5 条评论**；Codex Windows npm 启动问题有 **4 个 👍**。Claude Code 和 Copilot CLI 的展示反馈互动更少。

这些数字不足以形成稳健的跨社区热度排名。尤其是数据丢失、协议损坏或规则漏加载，即便互动为零，也应按影响优先评估。

### 成熟度：不能用版本数或 Closed 数替代判断

多客户端、多扩展和长任务能力说明产品范围扩大，也意味着更多状态一致性问题。Pi 全部记录为 Closed，不代表全部修复；OpenCode 与 Qwen 的高频发布，也不等同于更高稳定性。更有价值的成熟度指标是：**回归测试覆盖、故障恢复率、兼容承诺、迁移可逆性，以及修复是否进入可用版本。**

## 6. 值得关注的趋势信号

### ① “可恢复”正在成为 Agent 的核心能力
断流、进程重启、跨上下文和多实例写入，都是长任务中的常见边界。  
**开发者参考：**选型测试应主动注入网络中断、进程退出和重启，检查任务能否继续，以及是否重复执行有副作用的操作。

### ② 指令文件不等于强制策略
Claude Code、Copilot CLI 的加载反馈，以及 Qwen 对规则执行约束的需求，都说明“写了规则”不等于“规则已加载并被强制执行”。  
**开发者参考：**将高风险约束放在工具权限、Hooks、沙箱和 CI 验证中，不只依赖自然语言提示。

### ③ 多代理竞争开始转向状态与证据管理
Codex 推进子代理可视化，OpenCode出现完成通知遗漏，Copilot Fusion 涉及跨会话证据关联，Gemini 用户质疑完成声明可信度。  
**开发者参考：**多代理验收应包含明确的完成条件、可追溯产物和独立测试，而不是只看代理自报成功。

### ④ 成本优化已深入请求构造与上下文机制
OpenCode 发布缓存相关调整，Pi 同时出现缓存复用和计量反馈。  
**开发者参考：**模型升级后重新测量缓存命中与实际费用，不能只比较单价，也不能将统计异常直接认定为缓存失效。

### ⑤ 企业适配的难点在环境边界
Windows、WSL、挂载卷、沙箱、组织插件市场和应用控制策略反复出现。  
**开发者参考：**以真实企业环境开展试点，并记录客户端、插件、SDK、执行引擎和操作系统的完整版本链。

---

**综合建议：**现阶段不宜仅凭模型能力、功能数量或发布频率选型。对生产团队，更值得优先比较的是 **任务恢复、规则可验证性、扩展兼容、数据可恢复性和成本透明度**；这五项比单次演示效果更能预测 AI CLI 的长期使用价值。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-11-18**

> **数据说明：**所给 PR 的评论数均为 `undefined`、👍 均为 0，因此无法验证其真实热度排名。以下按**列表位置、关联 Issue 的讨论量及功能影响**筛选重点，不代表精确人气榜。展示的 20 个 PR 全部为 **OPEN**，没有可确认的 merged 或 draft 项目；Issue 中的问题描述也应视为报告者反馈，而非已验证结论。

## 1. 热门 Skills 排行：8 个重点关注 PR

| Skill / PR | 功能与本次变化 | 社区关注点 | 当前状态 |
|---|---|---|---|
| **skill-creator** · [#1298](https://github.com/anthropics/skills/pull/1298) | 用于创建、评估和优化 Skills；本次隔离触发评估，并处理 Windows 与运行时失败 | **评估结果是否可信**。相关 Issue [#556](https://github.com/anthropics/skills/issues/556) 有 13 条评论、[#1352](https://github.com/anthropics/skills/issues/1352) 有 6 条评论，分别反馈零触发率和并行评估串扰 | **OPEN**；最近更新 09-16 |
| **mcp-builder** · [#1742](https://github.com/anthropics/skills/pull/1742) | 辅助构建 MCP 服务；适配 MCP 2.x 的客户端导入名称及自定义 HTTP headers 配置 | **依赖升级兼容性与认证接入**，直接影响现有 MCP 工作流能否继续运行；PR 标注修复 #1668 | **OPEN**；最近更新 10-08 |
| **webapp-testing** · [#1980](https://github.com/anthropics/skills/pull/1980) | 支持 Web 应用测试及服务启动；移除启动脚本对 `shell=True` 的依赖 | **命令执行安全**：PR 指出未净化的用户或 Agent 命令字符串可能带来命令注入风险 | **OPEN**；最近更新 11-01 |
| **docx** · [#1792](https://github.com/anthropics/skills/pull/1792) | 处理 Word 文档修订；LibreOffice 超时后返回错误，并检查输出是否仍含修订标记 | **避免“假成功”**，将完成判定从“命令执行过”提升为“输出经过检查” | **OPEN**；最近更新 11-01 |
| **Notion Spec to Implementation 等** · [#1245](https://github.com/anthropics/skills/pull/1245) | 将 Notion 产品或技术规格拆成可实施任务、验收标准和进度跟踪；同时提交量化简历审计 Skill | **规格到执行的工作流自动化**；注意该 PR 包含两个 Skill，不能把关注度单独归于其中之一 | **OPEN**；最近更新 10-15 |
| **md2video-audio** · [#1703](https://github.com/anthropics/skills/pull/1703) | 将 Markdown 经幻灯片流程转换为带配音的 MP4 视频 | **内容生产多模态化**：从文档直接交付视频；“零成本”和配音质量属于提交者描述，尚不能据此确认实际效果 | **OPEN**；最近更新 09-15 |
| **Pyxel** · [#525](https://github.com/anthropics/skills/pull/525) | 支持 Python 复古游戏开发、调试，以及无界面输入驱动运行、画面和状态检查 | **生成代码后的可验证性**，不仅创建游戏，还提供运行与检查流程 | **OPEN**；最近更新 11-01 |
| **xlsx** · [#2019](https://github.com/anthropics/skills/pull/2019) | 改进电子表格重算中的外部链接风险检测，覆盖工作表级名称及间接别名引用 | **复杂 Excel 文件的检测完整性**，减少外部引用风险漏报；PR 标注修复 #2013 | **OPEN**；最近更新 11-03 |

**整体信号：**上述重点项目中，基础能力修复与可靠性改进占据显著位置；社区贡献并不只是增加新 Skill，也在补齐现有 Skills 的工程质量。

## 2. 社区需求趋势

### ① 安全可信与来源治理：讨论最集中的议题
- [#492](https://github.com/anthropics/skills/issues/492)：**46 条评论、3 👍**，是展示 Issues 中评论最多的一条。报告者担忧社区 Skills 使用 `anthropic/` 命名空间，导致用户误认来源、授予过高权限。
- [#412](https://github.com/anthropics/skills/issues/412)：**6 条评论，已关闭**，提出 Agent 治理 Skill，覆盖策略执行、威胁检测、信任评分和审计。

**需求判断：**既需要安全治理类 Skills，也需要分发机制明确区分“官方”和“社区来源”；后者不能仅靠增加 Skill 解决。

### ② 企业工作流与团队复用：从个人工具走向组织资产
- [#228](https://github.com/anthropics/skills/issues/228)：**17 条评论、8 👍**，希望在 Claude.ai 内直接进行组织级共享，替代下载文件、聊天转发、逐人上传。
- [#189](https://github.com/anthropics/skills/issues/189)：**6 条评论、9 👍**，反馈插件安装内容重复，并占用上下文。

**需求判断：**共享库、分发去重和统一管理，比单纯增加 Skills 数量更迫切。这里主要是 **Claude.ai/生态管理需求**，不应全部归为 Claude Code 功能需求。

### ③ Skill 触发、评估与质量门禁：先证明它能正确工作
- [#556](https://github.com/anthropics/skills/issues/556) 与 [#1352](https://github.com/anthropics/skills/issues/1352) 集中反馈触发评估异常。
- [#1385](https://github.com/anthropics/skills/issues/1385)：**7 条评论、1 👍**，提出“任务前校准 → 对抗审查 → 交付验证”三阶段质量门禁。
- [#2064](https://github.com/anthropics/skills/issues/2064)：**5 条评论**，指出 `theme-factory` 描述解释了“做什么”，却未明确“何时使用”。

**需求判断：**自动审查、交付验证、触发条件设计是明确方向；本样本不足以证明“代码审查”或“测试生成”已成为独立的头部需求。

### ④ 长任务记忆与上下文效率：降低运行成本
- [#1329](https://github.com/anthropics/skills/issues/1329)：**10 条评论**，提议 `compact-memory`，以紧凑符号表示长期 Agent 状态。
- [#1487](https://github.com/anthropics/skills/issues/1487)：**5 条评论**，报告 `claude-api` 一次注入约 156k tokens，耗尽上下文。
- [#202](https://github.com/anthropics/skills/issues/202)：**8 条评论，已关闭**，批评 skill-creator 偏重说明文档、执行指导不足且 token 效率低。

**需求判断：**紧凑记忆、按需加载和更精炼的操作指令，是长流程 Skills 的重要演进方向。

### ⑤ 文档交付质量：从“生成文件”走向“可安全交付”
- [#2018](https://github.com/anthropics/skills/issues/2018)：**4 条评论**，报告 DOCX 合并脚本可能丢失命名空间声明、写出无效 XML。
- 对应的贡献方向还包括 [DOCX 输出验证 #1792](https://github.com/anthropics/skills/pull/1792)、[文档排版质检 #514](https://github.com/anthropics/skills/pull/514)。

**需求判断：**格式正确、结构完整、结果可验证，比“能生成文档”更接近当前质量诉求。

## 3. 高潜力待合并 Skills

**无法根据现有数据筛出“评论活跃”的 PR，也无法预测近期合并时间。**以下是按需求关联度、修复范围和最近更新筛选的观察名单，而非合并概率排名：

| 候选 | 值得跟进的原因 | 仍需观察 |
|---|---|---|
| [skill-creator #1298](https://github.com/anthropics/skills/pull/1298) | 直接对应高讨论度的评估可靠性问题，影响其他 Skills 的开发与优化 | 并发、Windows 和失败分类是否获得充分回归验证；最近更新为 09-16 |
| [webapp-testing #1980](https://github.com/anthropics/skills/pull/1980) | 安全导向、影响明确，最近更新为 11-01 | 移除 shell 后，既有启动命令链的兼容性如何处理 |
| [docx #1792](https://github.com/anthropics/skills/pull/1792) | 直击超时误报成功与交付验证问题，最近更新为 11-01 | 对复杂文档的验证覆盖率及兼容性 |
| [xlsx #2019](https://github.com/anthropics/skills/pull/2019) | 修复有明确关联 Issue，聚焦外部引用漏检，最近更新为 11-03 | 工作表级名称、别名链等边界案例的测试覆盖 |
| [Pyxel #525](https://github.com/anthropics/skills/pull/525) | 新增方向中具备“开发—运行—验证”闭环，且 11-01 仍有更新 | 长期开启并不等于即将合并，仍需维护者审查和接纳信号 |

## 4. Skills 生态洞察

**一句话总结：社区最集中的诉求不是“更多 Skills”，而是让 Skills 来源可信、触发准确、运行可验证，并能在团队中低成本复用——安全信任与评估可靠性是最鲜明的两条主线。**（[安全来源 #492](https://github.com/anthropics/skills/issues/492) · [触发评估 #556](https://github.com/anthropics/skills/issues/556) · [组织共享 #228](https://github.com/anthropics/skills/issues/228)）

---

# Claude Code 社区动态日报
**2026-11-18｜数据源：[anthropics/claude-code](https://github.com/anthropics/claude-code)**

## 1. 今日速览

Claude Code 发布 **v2.1.327**，已提供的更新说明主要涉及 GitHub App 安装确认与 MCP 配置凭据保护。社区值得优先关注的反馈包括**潜在数据丢失、自动权限模式与 Hooks 的兼容性，以及跨端会话体验不一致**；这些仍是用户报告，不能视为已确认根因或普遍故障。

本批数据记录了 50 条更新 Issue，但仅展示 30 条；以下分析基于这 30 条。样本中单条 Issue 最多仅 1 条评论、均为 0 个 👍，因此本文按影响与可复现性筛选，而非按讨论热度排名。

## 2. 版本发布

### [v2.1.327](https://github.com/anthropics/claude-code/releases/tag/v2.1.327)

- **GitHub 操作确认**：`/install-github-app` 修改仓库前增加确认步骤，强化仓库变更的用户知情与控制。
- **MCP 支持从标准输入读取 JSON**：新增 `claude mcp add-json <name> -`，可避免将 token 直接放在命令行参数中；**不支持在 Claude Code 会话内部使用**。
- **恢复会话相关提示**：提供的第三条更新说明已截断，无法确认完整行为，不作进一步推断。

**分析：**本次可确认的变化侧重操作安全与配置安全，发布摘要未说明是否修复下述社区问题。

## 3. 社区热点 Issues

> 下列 10 项均处于 **OPEN** 状态，尚不能据此认定官方已确认问题。

| Issue | 核心反馈与重要性 | 社区反应 |
|---|---|---|
| **[ #110850：Windows 本地仓库疑似被误删](https://github.com/anthropics/claude-code/issues/110850)** | 用户报告 v2.1.322 执行未请求的 `rmdir /s /q`，删除本地仓库。带有 `data-loss` 标签，是本日风险优先级最高的反馈之一，但执行上下文与根因尚不明确。 | 0 评论、0 👍；暂无可见交叉验证。 |
| **[ #110842：项目配置目录文件消失](https://github.com/anthropics/claude-code/issues/110842)** | Docker、NAS 与 Remote Control 场景下，用户报告 `.claude`、`.agents` 文件部分或全部消失。涉及技能、插件及项目配置持久化，可能影响工作流恢复能力。 | 0 评论、0 👍；带 `data-loss` 标签，尚无可见确认。 |
| **[ #110847：Auto 模式拒绝被 Hook 改写的 Agent 调用](https://github.com/anthropics/claude-code/issues/110847)** | 报告称自 2.1.326 起，`PreToolUse` 通过 `updatedInput` 修改 Agent 输入后，Auto 模式直接拒绝而非重新检查。影响依赖 Hooks 的代理编排与策略注入。 | 0 评论、0 👍；标记 `has repro`、`regression`，适合优先复现。 |
| **[ #110857：CLAUDE.md 导入被静默跳过](https://github.com/anthropics/claude-code/issues/110857)** | `@import` 紧接 HTML/XML 标签行、两者无空行时可能被忽略。此类静默失败容易被误判为模型不遵守项目规范。 | 0 评论、0 👍；带 `has repro` 标签。 |
| **[ #110849：heredoc 导致 Bash 标准输入不关闭](https://github.com/anthropics/claude-code/issues/110849)** | macOS VS Code 扩展用户报告，含 heredoc 的命令可能保留未关闭的 stdin，使读取输入的程序挂起至超时。影响脚本执行可靠性与故障定位。 | 0 评论、0 👍；带 `has repro`，报告版本为 2.1.323。 |
| **[ #110851：Arc 浏览器工具链超时](https://github.com/anthropics/claude-code/issues/110851)** | 用户报告 Arc 中 `chrome.tabs.group()` 一直不返回，阻塞 `tabs_context_mcp(createIfEmpty)`，继而导致页面工具超时。反映浏览器 API 差异可能造成整条工具链不可用。 | 0 评论、0 👍；带 `has repro`，暂无可见修复信息。 |
| **[ #110861：会话自动归档且无法重连](https://github.com/anthropics/claude-code/issues/110861)** | 用户报告包括置顶会话在内的会话被自动归档，取消归档后 Remote Control 无法重连。影响长期任务与跨设备连续性。 | 0 评论、0 👍；报告包含时间线，但根因未定。 |
| **[ #110855：希望 VS Code 接续其他机器的远程会话](https://github.com/anthropics/claude-code/issues/110855)** | 用户希望扩展不仅能托管 Remote Control，也能作为客户端打开其他机器启动的会话。这是多设备开发体验的重要功能缺口反馈。 | 0 评论、0 👍；为 `enhancement`，尚无可见实施承诺。 |
| **[ #110859：编辑差异默认折叠，缺少恢复设置](https://github.com/anthropics/claude-code/issues/110859)** | 用户报告 Edit diff 从展开变为折叠，需要 `Ctrl+O` 查看。核心诉求是恢复逐次审阅修改的可见性，并提供明确配置。 | 0 评论、0 👍；标记为功能改进，尚不能确认由哪个版本引入。 |
| **[ #110845：插件 Toast 显示在错误窗口](https://github.com/anthropics/claude-code/issues/110845)** | macOS 多窗口场景下，`$.ui.toast()` 被报告显示在主窗口，而非触发会话所在窗口。多显示器开发者可能错过反馈，暴露插件 UI 与会话窗口绑定问题。 | 1 评论、0 👍；带 `has repro`，讨论仍处早期。 |

## 4. 重要 PR 进展

**本批数据中，过去 24 小时更新的 PR 为 0 条**，因此没有可列出的重要 PR，也无法据此判断上述 Issue 是否已有对应修复提交。

可继续关注：[仓库 Pull Requests](https://github.com/anthropics/claude-code/pulls)。

## 5. 功能需求趋势

以下为可见样本中的方向性信号，不代表全部 50 条 Issue 的统计排名。

- **跨设备会话与展示能力一致性**  
  需求不仅是远程连接，还包括在 IDE 中接续会话、在远程桌面视图中完整显示主题与插件 UI。相关：[VS Code 远程客户端诉求 #110855](https://github.com/anthropics/claude-code/issues/110855)、[Remote Control 主题不显示 #110848](https://github.com/anthropics/claude-code/issues/110848)。

- **更可控、可审阅的交互界面**  
  用户希望保留 diff 可见性、恢复提示建议，并获得更自然的字号缩放方式。相关：[diff 展示 #110859](https://github.com/anthropics/claude-code/issues/110859)、[提示建议回归 #110858](https://github.com/anthropics/claude-code/issues/110858)、[触控板缩放 #110852](https://github.com/anthropics/claude-code/issues/110852)。

- **Hooks、插件与 Agent 的稳定组合**  
  扩展开发者关注权限重检、工具调用上下文和文本改写能否一致传递给模型。相关：[Hook 修改输入后被拒 #110847](https://github.com/anthropics/claude-code/issues/110847)、[`$.model.fork` 上下文问题 #110840](https://github.com/anthropics/claude-code/issues/110840)、[文本改写不可见 #110839](https://github.com/anthropics/claude-code/issues/110839)。

- **更准确的模型行为与安全边界**  
  多条反馈涉及用户认为的误拒绝，以及简洁输出指令未被遵守。现有材料不足以判断各请求是否确属误判，也不能据此推断新模型支持计划。相关：[科研场景反馈 #110853](https://github.com/anthropics/claude-code/issues/110853)、[网络安全场景反馈 #110838](https://github.com/anthropics/claude-code/issues/110838)、[简洁指令失效 #110865](https://github.com/anthropics/claude-code/issues/110865)。

## 6. 开发者关注点

1. **先保障数据可恢复，再扩大自动化权限。**  
   对仓库、`.claude` 和 `.agents` 保持独立备份；涉及破坏性命令时保留审阅与确认，不宜仅依赖会话历史恢复。[相关反馈 #110850](https://github.com/anthropics/claude-code/issues/110850)、[#110842](https://github.com/anthropics/claude-code/issues/110842)。

2. **排查“不遵守指令”时，先验证配置是否真正加载。**  
   `CLAUDE.md` 导入解析和工作目录元信息都可能成为干扰因素；应区分模型行为、配置加载与环境状态问题。[相关反馈 #110857](https://github.com/anthropics/claude-code/issues/110857)、[#110841](https://github.com/anthropics/claude-code/issues/110841)。

3. **升级回归测试应覆盖真实工具链。**  
   使用 Auto 模式、Hooks、子代理、heredoc 或浏览器自动化的团队，应分别验证权限判断、stdin 生命周期与浏览器兼容性，而不只测试基本对话。[相关反馈 #110847](https://github.com/anthropics/claude-code/issues/110847)、[#110849](https://github.com/anthropics/claude-code/issues/110849)、[#110851](https://github.com/anthropics/claude-code/issues/110851)。

**今日判断：**可见反馈更强调“可靠、可控、可观察”的工程体验，而非单纯增加功能；但互动量仍低，后续应重点跟踪复现结果、维护者回应与修复版本。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**2026-11-18｜数据来源：[openai/codex](https://github.com/openai/codex)**

> 统计口径：基于提供的过去 24 小时数据，包括 4 个 Release，以及 50 条更新 Issues 中展示的 30 条、50 条更新 PR 中展示的 20 条。Issue 内容属于用户反馈，未经独立验证；PR 的 `CLOSED` 状态不代表已合并或已发布。

## 1. 今日速览

Codex **0.170.0** 发布，新增 TUI 实时语音通话的 WebRTC 协商、OpenTelemetry HTTP 导出器认证头自动刷新，以及跨环境同名 MCP 服务器的实验性支持。社区反馈集中在 **Windows 可用性、浏览器工具连接、工作区权限与桌面端稳定性**，其中 Windows npm 安装启动故障获得了本次展示样本中最多的 👍。PR 动向则聚焦于 TUI 子代理可视化、云端断流恢复、沙箱启动与 app-server 协议完善。

## 2. 版本发布

| 版本 | 更新摘要 |
|---|---|
| **[0.170.0](https://github.com/openai/codex/releases/tag/rust-v0.170.0)** | TUI 增加实时语音通话的 **WebRTC 协商**；OpenTelemetry HTTP 导出器支持**自动刷新认证头**；实验性支持**跨环境使用同名 MCP 服务器**。提供的 Bug Fixes 部分未列出具体内容。 |
| [0.169.1](https://github.com/openai/codex/releases/tag/rust-v0.169.1) | 仅提供维护类说明，没有可核实的发布亮点；可查看[完整版本差异](https://github.com/openai/codex/compare/rust-v0.169.0...rust-v0.169.1)。 |
| [0.170.0-alpha.4.2](https://github.com/openai/codex/releases/tag/rust-v0.170.0-alpha.4.2) | 预发布版本，未提供具体变更说明。 |
| [0.171.0-alpha.12](https://github.com/openai/codex/releases/tag/rust-v0.171.0-alpha.12) | 下一版本线的预发布版本，未提供具体变更说明。 |

**升级提示：** Windows npm 用户应重点核查安装与启动链路。下述 0.169.1 故障尚不能据此判断已在 0.170.0 中修复。

## 3. 社区热点 Issues

以下 10 项均处于 **OPEN** 状态。当前评论量整体不高，关注度主要结合影响范围、阻断程度及互动数据判断。

| Issue | 核心问题与重要性 | 社区反应 |
|---|---|---|
| **[62123｜Windows npm 安装后 CLI 无法启动](https://github.com/openai/codex/issues/62123)** | 用户报告 0.169.1 的 Windows x64 npm 依赖不可用，故障发生在认证之前，直接阻断使用；报告称回退 0.169.0 可恢复。 | **2 评论、4 👍**，为展示样本中获赞最多的 Issue。 |
| **[62143｜CLI 的 @Chrome/@Browser 无法工作](https://github.com/openai/codex/issues/62143)** | 报告称 bundled plugin 26.1023 起，worker 无法获取浏览器访问 host；在 CLI 0.169.0/0.169.1 复现。若影响范围属实，将阻断浏览器自动化。 | **2 评论、0 👍**；标题称跨平台，但提供摘要仅明确列出 Linux 环境。 |
| **[62082｜桌面端长期持有写锁](https://github.com/openai/codex/issues/62082)** | Windows 桌面端被报告长时间持有 heartbeat thread 写锁，导致 VS Code 提示“已在其他应用中打开”，影响桌面端与 IDE 协作。 | **3 评论、0 👍**，讨论量在展示样本中居前。 |
| **[62101｜插件列表遗漏组织托管市场](https://github.com/openai/codex/issues/62101)** | `plugin list` 与 `plugin marketplace list` 的组织市场可见性不一致，增加企业插件分发、配置和排障成本。 | **4 评论、0 👍**，是展示样本中评论最多的 Issue。 |
| **[62185｜Windows 沙箱拒绝读取已授权工作区](https://github.com/openai/codex/issues/62185)** | 报告涉及 NTFS、exFAT 工作区，暴露“用户已授权”与实际文件访问之间的落差。具体 Windows 构建和沙箱实现尚未核实。 | **1 评论、0 👍**，仍需进一步确认复现条件。 |
| **[62152｜Cloud 选择下无法访问 Project Sources](https://github.com/openai/codex/issues/62152)** | Windows 新建 Work 会话无法访问项目资料，影响以项目上下文为基础的开发流程。 | **2 评论、0 👍**；应重点观察工作区选择与资源绑定过程。 |
| **[62170｜macOS 桌面端卡在加载标志](https://github.com/openai/codex/issues/62170)** | 报告将界面卡死与 512 MiB RPC budget 拒绝、MessagePort 关闭联系起来，提示运行时通信或资源限制可能影响会话可用性。 | **1 评论、0 👍**；尚不能将报告中的关联视为已确认根因。 |
| **[62169｜响应流断开后持续重连](https://github.com/openai/codex/issues/62169)** | `response.completed` 前流关闭，用户报告无法继续任务。此类问题直接影响长任务完成率与恢复体验。 | **1 评论、0 👍**；与云端恢复相关 PR 方向接近，但没有明确修复关联。 |
| **[62087｜Linux 递归 deny glob 导致启动高 CPU](https://github.com/openai/codex/issues/62087)** | 大型工作树与递归拒绝规则下，文件系统辅助程序被报告占满单核 CPU，值得大型仓库及受管权限环境关注。 | **1 评论、0 👍**；报告给出了扫描深度和目录特征等排查线索。 |
| **[62187｜Windows 模型目录缺少新模型](https://github.com/openai/codex/issues/62187)** | 用户报告刷新后仍缺少 GPT-6.2 Astra/Sol，更新器却显示已是最新，反映模型目录与客户端分发的一致性问题。 | **0 评论、0 👍**，属于早期反馈；摘要中提及的官方可用性公告未在本数据中独立核实。 |

## 4. 重要 PR 进展

**以下 10 项在数据中均标记为 `CLOSED`；未提供合并信息、发布归属或有效评论数，因此仅总结变更内容，不视为已交付功能。**

| PR | 功能或修复内容 |
|---|---|
| **[62190｜统一 rollout 预算检查](https://github.com/openai/codex/pull/62190)** | 将工作准入移入 `RolloutWorkGate`，通过 `ThreadBudgetPolicy` 处理压缩延后，并在接收采样响应及 checkpoint 时检查预算，集中资源控制逻辑。 |
| **[62186｜及时刷新 HTTP/2 隧道数据](https://github.com/openai/codex/pull/62186)** | 每个 HTTP/2 数据块写入本地 TCP 后立即 flush，再释放接收流控容量，避免交互式隧道因缓冲数据未送出而停滞。 |
| **[62183｜在启动准备阶段选择进程沙箱](https://github.com/openai/codex/pull/62183)** | 基于执行主机的工作区根目录解析相对权限规则，并检查主机能否提供所需沙箱，改善权限落地与启动前校验。 |
| **[62176｜app-server v2 暴露 `bioPolicy` 错误](https://github.com/openai/codex/pull/62176)** | 将生物学策略错误从通用 `other` 映射为独立错误码，便于客户端识别和提示。**这并不等于调整策略或修复误拦截。** |
| **[62175｜修复 TUI 即时重绘使用旧尺寸](https://github.com/openai/codex/pull/62175)** | 处理终端缩放事件尚未到达时的即时重绘，避免继续使用旧尺寸渲染。 |
| **[62157｜在 TUI 侧栏打开子代理记录](https://github.com/openai/codex/pull/62157)** | 将选中的子代理放入侧栏标签页，而非切走主会话，便于在保留父任务上下文的同时审阅子代理工作。 |
| **[62149｜侧栏选择器展示子代理状态](https://github.com/openai/codex/pull/62149)** | 增加 `Subagents` 区域，统一查看子代理及其状态，提升多代理任务的可观察性。 |
| **[62151｜限制云端连续断流后的恢复](https://github.com/openai/codex/pull/62151)** | 按当前恢复循环已替换的流数量递增恢复延迟，每个增加 500 ms，旨在缓解反复断开与重连循环。 |
| **[62150｜取消阻塞 TUI 导航的 Cloud 刷新](https://github.com/openai/codex/pull/62150)** | 避免进行中的云任务概览刷新长期占用 Cloud worker，阻塞恢复选择器、会话请求等操作。 |
| **[62145｜账户通知标识工作区路由就绪](https://github.com/openai/codex/pull/62145)** | 为账户更新中的工作区路由就绪状态提供显式信号，帮助客户端区分初始化就绪与登录、退出、切换工作区等事件。 |

## 5. 功能需求趋势

结合全部展示 Issues，社区需求更多体现为**现有能力的可靠性与一致性**，而非单纯增加功能。

- **浏览器与 Computer Use 的持续可用性。** CLI、Windows、macOS 和 Cloud 均出现工具不可用、初始化失败或会话中途消失的报告；用户需要稳定的工具生命周期管理，而不只是“能打开浏览器”。参见 [#62143](https://github.com/openai/codex/issues/62143)、[#62147](https://github.com/openai/codex/issues/62147)、[#62077](https://github.com/openai/codex/issues/62077)、[#62118](https://github.com/openai/codex/issues/62118)。
- **工作区、权限与组织配置的一致性。** 项目资料访问、已授权目录读取、组织插件市场和 WSL 切换问题共同指向跨环境配置衔接。参见 [#62152](https://github.com/openai/codex/issues/62152)、[#62185](https://github.com/openai/codex/issues/62185)、[#62101](https://github.com/openai/codex/issues/62101)、[#62081](https://github.com/openai/codex/issues/62081)。
- **模型可见性与控制能力。** 用户关注新模型是否及时进入目录，以及模型选择、推理控制是否正常；缓存反馈也体现了对长会话效率的关注。参见 [#62187](https://github.com/openai/codex/issues/62187)、[#62111](https://github.com/openai/codex/issues/62111)、[#62109](https://github.com/openai/codex/issues/62109)。
- **长会话导航与稳定恢复。** 明确的功能请求包括持久化上一条/下一条、跳到开头/结尾导航；断流与加载卡死则说明“可持续工作”仍是基本诉求。参见 [#62188](https://github.com/openai/codex/issues/62188)、[#62169](https://github.com/openai/codex/issues/62169)、[#62170](https://github.com/openai/codex/issues/62170)。
- **更准确的安全判断与可解释反馈。** 用户报告合法文献综述、发音编辑及直接授权场景受到阻断，需求重点是减少误判并提供清晰的处理路径，而非取消安全边界。参见 [#62184](https://github.com/openai/codex/issues/62184)、[#62108](https://github.com/openai/codex/issues/62108)、[#62115](https://github.com/openai/codex/issues/62115)。

## 6. 开发者关注点

1. **升级前先验证关键路径。** Windows npm 启动、桌面端初始化和浏览器调用均有阻断性报告，建议升级时保留可回退版本，并测试真实工作流。[#62123](https://github.com/openai/codex/issues/62123) · [#62182](https://github.com/openai/codex/issues/62182)
2. **区分界面状态与实际工具状态。** 浏览器窗口仍在、已选择 Cloud、已授权目录，并不意味着 agent 已获得对应访问能力；排障应同时记录客户端、插件、执行环境与权限状态。[#62147](https://github.com/openai/codex/issues/62147) · [#62152](https://github.com/openai/codex/issues/62152) · [#62185](https://github.com/openai/codex/issues/62185)
3. **关注后台开销和跨工具资源占用。** 文件锁、递归权限扫描及 WSL 轮询日志都可能影响宿主开发环境。WSL 日志问题虽已关闭，但数据未说明关闭原因，不能认定已修复。[#62082](https://github.com/openai/codex/issues/62082) · [#62087](https://github.com/openai/codex/issues/62087) · [#62097](https://github.com/openai/codex/issues/62097)
4. **故障报告需要更完整的版本链。** Linux 桌面端存在“界面任务不启动，但 bundled engine 可通过 `codex exec` 工作”的反馈；仅记录 CLI 版本不足以定位 UI、app-server 与执行引擎之间的问题。[#62086](https://github.com/openai/codex/issues/62086)

**今日判断：** 新版本继续扩展语音、遥测与 MCP 能力，但社区当前最迫切的诉求仍是：**让浏览器、工作区、权限和长任务恢复在不同客户端上稳定、可预测地工作。**

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-11-18**  
数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)，统计范围为所提供的过去 24 小时更新记录。

## 1. 今日速览

今日重点是 **Nightly 发布失败**，以及 MCP 配置解析、Git SSH 操作等基础可靠性问题；其中三项用户报告已有对应修复 PR，但均尚未合并。开发工作还涉及 Shell 权限判断、ACP 钩子反馈和 Windows PowerShell 性能；过去 24 小时无新 Release。

## 2. 社区热点 Issues

> 数据仅包含 **6 个 Issue**，以下全部列出，不补足为 10 个。全部仍处于 OPEN 状态；除发布故障外，其余均标记为 `status/need-triage`。当前讨论量有限，不宜据此判断问题的普遍程度。

### 1. Nightly 发布失败：当日最高优先级
**[#30346](https://github.com/google-gemini/gemini-cli/issues/30346)** · `priority/p0` / `release-failure`

- **问题**：`v0.70.0-nightly.20261118.g2fd679bbf` 的 nightly-release 工作流失败。
- **重要性**：影响该 Nightly 版本的正常交付，应优先跟踪发布恢复。
- **社区反应**：由 GitHub Actions 自动创建，暂无评论；现有摘要未提供失败根因。
- **排查入口**：[失败的工作流](https://github.com/google-gemini/gemini-cli/actions/runs/44206921501)。

### 2. MCP 工具过滤参数未拆分逗号列表
**[#30330](https://github.com/google-gemini/gemini-cli/issues/30330)** · 3 条评论，0 👍

- **问题**：`--include-tools tool1,tool2`、`--exclude-tools` 将整段字符串存为单个数组元素，与参数帮助说明不符。
- **重要性**：可能导致实际工具过滤结果偏离预期，影响 MCP 工具可用范围的控制。
- **社区反应**：是本批 Issue 中评论最多的一项；已有修复 PR [#30332](https://github.com/google-gemini/gemini-cli/pull/30332)，尚未合并。

### 3. 自定义模型网关需要独立的上下文窗口配置
**[#30333](https://github.com/google-gemini/gemini-cli/issues/30333)** · 2 条评论，0 👍

- **需求**：支持按模型覆盖输入上下文窗口；目前未知模型统一使用 `1,048,576` 的默认 token 限制。
- **重要性**：自定义网关背后的模型能力可能不同，统一默认值可能造成预算估算与实际限制不一致。
- **社区反应**：已有初步讨论；所给数据中未见对应实现 PR。

### 4. Agent 被报告反复将未完成任务标记为完成
**[#30345](https://github.com/google-gemini/gemini-cli/issues/30345)** · 1 条评论，0 👍

- **反馈**：报告者称，在 Antigravity 中约九天、九次尝试里，Agent 多次将未完成的多组件集成任务报告为完成，并使新增验证门槛失去预期作用。
- **重要性**：涉及完成状态可信度、验收机制与长期任务执行可靠性。
- **社区反应**：讨论尚少；目前是用户报告，不能据此认定已复现，也不能直接归因为 Gemini CLI 核心缺陷。

### 5. MCP 环境变量含 `=` 或空值时被静默破坏
**[#30329](https://github.com/google-gemini/gemini-cli/issues/30329)** · 1 条评论，0 👍

- **问题**：`gemini mcp add -e KEY=value` 会截断值中的后续 `=`，并丢弃空值，命令仍返回成功。
- **重要性**：可能破坏令牌等配置，且“配置成功、运行失败”的表现增加排障难度。
- **社区反应**：已有修复 PR [#30331](https://github.com/google-gemini/gemini-cli/pull/30331)，尚未合并。

### 6. 空 `core.sshCommand` 导致 Git SSH 操作失败
**[#30328](https://github.com/google-gemini/gemini-cli/issues/30328)** · 1 条评论，0 👍

- **问题**：`getSafeGitEnv()` 将 `core.sshCommand` 设置为空字符串，可能导致 `git push` 报错 `fatal: unable to fork`。
- **重要性**：阻断依赖 SSH 的代码提交工作流，是直接影响开发体验的基础故障。
- **社区反应**：已有修复 PR [#30335](https://github.com/google-gemini/gemini-cli/pull/30335)，尚未合并。

## 3. 重要 PR 进展

> 从 13 条记录中选取 10 条。**CLOSED 仅表示已关闭，现有数据不足以确认是否合并；OPEN 也不代表修复已可用。**

| PR | 状态 | 功能或修复内容及意义 |
|---|---|---|
| **[#30332：支持 MCP 逗号分隔工具过滤](https://github.com/google-gemini/gemini-cli/pull/30332)** | OPEN | 复用 `coerceCommaSeparated` 逻辑处理 include/exclude 参数，并添加回归测试，对应 #30330。 |
| **[#30331：保留 MCP 环境变量中的 `=` 与空值](https://github.com/google-gemini/gemini-cli/pull/30331)** | OPEN | 修复直接拆分 `=` 造成的值截断，以及空字符串被丢弃的问题，对应 #30329。 |
| **[#30335：停止将 `core.sshCommand` 覆盖为空](https://github.com/google-gemini/gemini-cli/pull/30335)** | OPEN | 调整安全 Git 环境及沙箱 Shell 默认设置，修复 SSH 操作启动失败，对应 #30328。 |
| **[#30338：未解析 Shell 展开时保留用户确认](https://github.com/google-gemini/gemini-cli/pull/30338)** | OPEN | 对执行前会被 Bash 重写、且展开结果未确定的命令保留 `ASK_USER`，避免仅凭原始文本的只读判断自动放行。 |
| **[#30339：ACP 展示钩子拒绝与停止原因](https://github.com/google-gemini/gemini-cli/pull/30339)** | OPEN | 修复 ACP 消费端丢弃相关事件的问题，使客户端能够感知 `BeforeAgent` / `AfterAgent` 的阻止或停止信号。 |
| **[#30334：异步解析 PowerShell 命令](https://github.com/google-gemini/gemini-cli/pull/30334)** | OPEN · P2 | 针对 Windows 下 PowerShell AST 解析造成的多秒 UI 卡顿，避免 Thinking 动画和计时器停止刷新。 |
| **[#30343：升级 Git 参数解析相关依赖](https://github.com/google-gemini/gemini-cli/pull/30343)** | OPEN · P1 | 联动更新 `@simple-git/argv-parser` 至 3.0.0 及其上层依赖 `simple-git`；摘要未说明具体优先级原因。 |
| **[#30344：批量更新 npm 依赖](https://github.com/google-gemini/gemini-cli/pull/30344)** | OPEN | 包含 62 项依赖更新，属于大规模维护变更，需关注兼容性与回归测试结果。 |
| **[#30340：隔离 IDE 发现目录并原子写入端口文件](https://github.com/google-gemini/gemini-cli/pull/30340)** | CLOSED | 提议在 POSIX 使用用户专属 `0700` 临时目录，并以 `0600` 临时文件加重命名方式写入端口发现文件，增强隔离与写入可靠性。 |
| **[#30342：预拉取分诊镜像并清理 Docker 登录态](https://github.com/google-gemini/gemini-cli/pull/30342)** | CLOSED | 调整 Issue 去重工作流：预拉取固定镜像，随后清理 Docker 客户端登录状态，减少凭据状态持续时间。 |

## 4. 功能需求趋势

本批 Issue 数量较少，以下是**当日需求信号**，而非长期热度排名。

- **MCP 配置需要准确、可预测**：工具过滤和环境变量均出现“命令成功但结果错误”的反馈，说明参数语义与配置保真度是当前明确痛点。关联：[工具过滤 #30330](https://github.com/google-gemini/gemini-cli/issues/30330)、[环境变量 #30329](https://github.com/google-gemini/gemini-cli/issues/30329)。
- **自定义模型适配需要更细粒度的能力配置**：社区希望上下文窗口不再只依赖模型名称推断，而能匹配网关后的真实模型限制。关联：[#30333](https://github.com/google-gemini/gemini-cli/issues/30333)。
- **Agent 的“完成”需要独立、可信的验证**：用户反馈关注点已从能否执行任务，延伸到完成声明是否可靠、验证门槛是否有效。关联：[#30345](https://github.com/google-gemini/gemini-cli/issues/30345)。
- **基础工作流与交付稳定性仍是底线需求**：Git SSH 故障和 Nightly 失败分别影响日常开发与版本获取。关联：[#30328](https://github.com/google-gemini/gemini-cli/issues/30328)、[#30346](https://github.com/google-gemini/gemini-cli/issues/30346)。

## 5. 开发者关注点

1. **优先检查“静默成功”的配置操作**  
   使用 `gemini mcp add` 后，建议核对落盘的工具列表、含 `=` 的变量值和空字符串是否符合预期；不要仅依赖退出码。关联：[#30330](https://github.com/google-gemini/gemini-cli/issues/30330)、[#30329](https://github.com/google-gemini/gemini-cli/issues/30329)。

2. **安全限制不能牺牲正常工作流，也不能误放行**  
   Git SSH 空配置问题反映安全环境设置的兼容性风险；Shell 展开修复则强调自动放行决策必须保守。关联：[#30335](https://github.com/google-gemini/gemini-cli/pull/30335)、[#30338](https://github.com/google-gemini/gemini-cli/pull/30338)。

3. **集成端需要明确的执行状态与失败原因**  
   ACP 钩子拒绝信息不应被静默丢弃；Agent 的完成声明也应结合独立测试和实际产物验收。关联：[#30339](https://github.com/google-gemini/gemini-cli/pull/30339)、[#30345](https://github.com/google-gemini/gemini-cli/issues/30345)。

4. **Windows 响应性仍值得关注**  
   PowerShell 解析造成的界面冻结已有针对性 PR，但尚未合并，可继续跟踪测试反馈。关联：[#30334](https://github.com/google-gemini/gemini-cli/pull/30334)。

**后续重点**：跟踪 Nightly 发布恢复，以及 MCP 两项解析修复、Git SSH 修复的合并与实际发布状态。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-18** ｜ **仓库：[github/copilot-cli](https://github.com/github/copilot-cli)**

> 本日报基于所提供的过去 24 小时数据。Issue 中的故障及原因均为提交者报告，尚不能视为官方确认结论。

## 1. 今日速览

今日发布列表包含 **v1.0.114-0** 与 **v1.0.113**，明确披露的更新是：管理员可通过 `features.browserUse` 禁用内置 Browser Use，且对运行中的会话生效。社区反馈集中在 **1.0.113 扩展兼容性与生命周期、指令文件漏加载，以及 Fusion 多阶段执行可靠性**。

本期共收录 **13 条 Issue，全部为 OPEN、带 triage 标签，评论和 👍 均为 0**；暂无足够互动数据判断社区热度，以下按潜在影响和开发者相关性选取重点。过去 24 小时没有 PR 更新。

## 2. 版本发布

| 版本 | 更新内容 | 开发者关注点 |
|---|---|---|
| [v1.0.114-0](https://github.com/github/copilot-cli/releases/tag/v1.0.114-0) | 发布说明仅提供“Fixes and changes”，未列出具体变更。 | 暂无法判断修复范围，也不能据此认定下述 Issue 已获修复。 |
| [v1.0.113](https://github.com/github/copilot-cli/releases/tag/v1.0.113) | 管理员可通过托管设置 `features.browserUse` 禁用内置 Browser Use，包括运行中的会话。发布说明标注日期为 2026-11-17。 | 企业管理员获得会话运行期间的功能管控能力；使用扩展或特殊 Windows 挂载环境的团队应重点验证兼容性。 |

## 3. 社区热点 Issues

**社区反应说明：以下 10 项目前均为 0 评论、0 👍，尚无讨论反馈或修复确认；排序代表分析优先级，不代表热度排名。**

| Issue | 核心反馈 | 为什么值得关注 |
|---|---|---|
| [#5492：扩展 SDK 包名变更导致加载失败](https://github.com/github/copilot-cli/issues/5492) | 提交者称，1.0.113 中 SDK 从 `@github/copilot-sdk` 改为 `@microsoft/copilot-sdk`，旧名称无兼容别名，已有扩展出现 `ERR_MODULE_NOT_FOUND`。 | 涉及既有扩展的升级兼容性，以及破坏性变更的迁移说明是否充分，应优先验证。 |
| [#5498：交互会话启动后扩展被重启](https://github.com/github/copilot-cli/issues/5498) | 1.0.113 在交互会话启动数秒后停止并重新启动插件扩展，导致初始化代码执行两次。 | 对带有注册、连接或其他副作用的初始化逻辑构成风险，也会增加启动开销。 |
| [#5490：扩展热重载后工具名称冲突](https://github.com/github/copilot-cli/issues/5490) | 执行 `extensions_reload` 后，旧连接仍占用外部工具名称，新进程在 `session.resume` 阶段失败；报告称需重启应用或会话恢复。 | 热重载是扩展开发的重要工作流，连接清理不完整会直接打断调试迭代。 |
| [#5497：按需指令发现依赖先执行 `view`](https://github.com/github/copilot-cli/issues/5497) | 开启 `enableOnDemandInstructionDiscovery` 后，嵌套 `AGENTS.md` 和 `applyTo` 指令仅在成功查看文件后加载；直接编辑、新建文件或通过 shell 修改可能跳过规则，且没有警告。 | 影响仓库规范的可靠执行，尤其值得依赖分目录规则的团队关注。 |
| [#5496：Windows 无盘符卷上的仓库指令被跳过](https://github.com/github/copilot-cli/issues/5496) | 在 1.0.113 中，通过文件夹挂载点访问无盘符卷上的仓库时，仓库指令文件未加载，会话内无错误提示。 | 暴露特殊文件系统布局下的兼容性与可观测性问题；用户可能误以为规则已生效。 |
| [#5491：大型插件市场添加过程缺少进度与取消保障](https://github.com/github/copilot-cli/issues/5491) | 添加 Git marketplace 时会克隆整个仓库以读取 `marketplace.json`；报告还涉及无进度、取消无效、退出后残留 Git 进程和暂存目录。 | 同时影响安装耗时、资源清理和操作可控性，大型目录场景尤为明显。 |
| [#5493：Fusion 上下文续接后评审空结果](https://github.com/github/copilot-cli/issues/5493) | 报告称 `new_context` 结束了未完成的 solver 阶段，而非继续执行，随后 judge 拒绝空结果并进入 repair。 | 涉及长任务跨上下文的状态连续性，可能造成不必要的修复流程。 |
| [#5494：Fusion 无法定位跨会话动作证据](https://github.com/github/copilot-cli/issues/5494) | 提交者称日志已记录会话所有权转移相关动作，但 judge 无法确认其证据，因而拒绝已完成的操作。 | 指向跨会话证据关联与评审准确性问题，会降低多会话协作的可信度。 |
| [#5488：技能目录截断时提供结构化告警](https://github.com/github/copilot-cli/issues/5488) | 请求在 `<available_skills>` 超过 `SKILL_CHAR_BUDGET`（默认 30,000 字符）发生截断时，发出结构化警告或会话事件。 | 技能规模扩大后，开发者需要知道哪些能力未进入上下文，避免难以解释的能力缺失。 |
| [#5487：向内置插件暴露稳定的运行时 turn ID](https://github.com/github/copilot-cli/issues/5487) | Browser Use 需要精确、由宿主持有的轮次标识，以便在所属轮次结束时归还占用的用户标签页。 | 关系到插件资源所有权、生命周期和清理时机，是可靠浏览器自动化的基础接口需求。 |

## 4. 重要 PR 进展

**本期数据中没有过去 24 小时更新的 PR，因此无法列出 10 个重要 PR，也没有可确认的合并或修复进展。**

后续可关注上述扩展兼容性、指令发现及 Fusion 问题是否关联修复 PR。  
链接：[仓库 Pull Requests](https://github.com/github/copilot-cli/pulls)

## 5. 功能需求趋势

从全部 13 条 Issue 看，需求重心并非新模型或 IDE 集成，而是以下方向：

- **扩展生态稳定性与升级兼容性**：SDK 导入兼容、重复初始化、热重载工具冲突，以及大型 marketplace 安装体验，共同指向“扩展能否稳定安装、启动和迭代”。  
  相关：[ #5492](https://github.com/github/copilot-cli/issues/5492)、[#5498](https://github.com/github/copilot-cli/issues/5498)、[#5490](https://github.com/github/copilot-cli/issues/5490)、[#5491](https://github.com/github/copilot-cli/issues/5491)。

- **指令与技能加载的可观测性**：作用域规则漏加载、Windows 路径兼容和技能目录截断，反映开发者希望明确知道“哪些规则与能力实际生效”。  
  相关：[#5497](https://github.com/github/copilot-cli/issues/5497)、[#5496](https://github.com/github/copilot-cli/issues/5496)、[#5488](https://github.com/github/copilot-cli/issues/5488)。

- **长任务与跨会话协作可靠性**：Fusion 反馈集中于上下文续接、阶段切换和证据关联，而非单次回答质量。  
  相关：[#5493](https://github.com/github/copilot-cli/issues/5493)、[#5494](https://github.com/github/copilot-cli/issues/5494)。

- **自动化能力的治理与生命周期**：除稳定 turn ID 外，另有用户报告 Windows Computer Use 对 ChatGPT 桌面应用的操作被内置安全策略阻止，而 Claude 应用可用；这体现了对策略边界和行为一致性的关注，不能据此推断限制原因。  
  相关：[#5487](https://github.com/github/copilot-cli/issues/5487)、[#5495](https://github.com/github/copilot-cli/issues/5495)。

- **终端交互与贡献体验打磨**：用户希望 `ask_user` 单选表单支持数字键快捷选择，同时指出贡献文档仍引用不存在的 `script/bootstrap`、`script/cibuild`。  
  相关：[#5486](https://github.com/github/copilot-cli/issues/5486)、[#5489](https://github.com/github/copilot-cli/issues/5489)。

## 6. 开发者关注点

1. **升级前先验证扩展链路。** 使用 1.0.113 的团队应重点检查 SDK 导入、扩展初始化次数和热重载恢复能力；目前数据中没有对应修复确认。  
   参考：[#5492](https://github.com/github/copilot-cli/issues/5492)、[#5498](https://github.com/github/copilot-cli/issues/5498)、[#5490](https://github.com/github/copilot-cli/issues/5490)。

2. **不要将“没有报错”等同于“规则已加载”。** 分层指令、Windows 挂载路径和较大技能集合均出现静默缺失或缺少告警的反馈，建议在关键任务前验证实际生效情况。  
   参考：[#5497](https://github.com/github/copilot-cli/issues/5497)、[#5496](https://github.com/github/copilot-cli/issues/5496)、[#5488](https://github.com/github/copilot-cli/issues/5488)。

3. **长任务需要可追踪的状态与证据。** Fusion 的两项反馈说明，执行日志、阶段结果和评审所见证据之间的关联，是排查跨会话失败的关键。  
   参考：[#5493](https://github.com/github/copilot-cli/issues/5493)、[#5494](https://github.com/github/copilot-cli/issues/5494)。

4. **生命周期控制是共同痛点。** 从 marketplace 下载取消、扩展重载到浏览器标签页归还，开发者需要更明确的停止、清理和资源释放保证。  
   参考：[#5491](https://github.com/github/copilot-cli/issues/5491)、[#5490](https://github.com/github/copilot-cli/issues/5490)、[#5487](https://github.com/github/copilot-cli/issues/5487)。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期：2026-11-18｜仓库：[anomalyco/opencode](https://github.com/anomalyco/opencode)**

> 本报基于提供的 GitHub 快照整理。Release 摘要存在截断；Issue/PR 的 **Closed 不等同于已修复或已合并**，未获明确证据的条目不作此推断。PR 评论数缺失，不据此评价讨论热度。

## 1. 今日速览

OpenCode 过去 24 小时发布了 **v2.3.2、v2.3.1 和 v1.19.6**，重点涉及 GPT-6.2 提示缓存、Shell 超时任务后台续跑，以及 OpenCode 1 向 2 的升级入口。社区反馈集中在 **V2 会话与存储可靠性、模型目录更新、跨平台执行兼容性**；PR 侧则持续推进 Windows Shell、网络 TLS 兼容和 Code Mode 改进。

## 2. 版本发布

| 版本 | 核心更新 | 开发者影响 |
|---|---|---|
| [v2.3.2](https://github.com/anomalyco/opencode/releases/tag/v2.3.2) | 将 Responses 路由中的系统提示改为前置 `developer` 消息，避免 GPT-6.2 对顶层 `instructions` 不缓存的问题 | 减少多步骤调用中系统提示重复按未缓存输入计费的情况；实际收益取决于工作负载 |
| [v2.3.1](https://github.com/anomalyco/opencode/releases/tag/v2.3.1) | Shell 命令超时后转入后台，而不是直接终止；前台 `timeout: 0` 改为默认 120 秒 | 长构建、长测试可继续完成并回报结果；需要注意超时参数的语义变化 |
| [v1.19.6](https://github.com/anomalyco/opencode/releases/tag/v1.19.6) | 提供升级至 OpenCode 2 的入口，支持后台下载，选择重启升级、退出时升级或稍后处理 | 声明保留会话、项目和设置；**OpenCode 1 插件需要更新** |

## 3. 社区热点 Issues

以下结合影响范围、数据风险和讨论量选出 10 项；评论数仅反映当前快照中的讨论规模。

| Issue | 状态 / 讨论 | 问题与关注价值 |
|---|---|---|
| [#64543 中文会话标题显示错误字形](https://github.com/anomalyco/opencode/issues/64543) | **Open · 10 条评论** | 英文界面下，标签页和面包屑中的中文显示异常，但复制出的文字正确，指向渲染而非存储问题。是所列 Issue 中讨论最多的一项，影响多语言开发者的日常使用。 |
| [#64481 Provider 失败后会话陷入空工具调用循环](https://github.com/anomalyco/opencode/issues/64481) | **Closed · 6 条评论** | 用户报告 `response.failed` 被持久化为空参数工具调用，后续持续触发参数错误。涉及失败响应如何进入会话历史，是长上下文任务的可靠性问题；关闭原因未提供。 |
| [#64489 模型目录缓存不自动刷新](https://github.com/anomalyco/opencode/issues/64489) | **Open · 5 条评论** | 报告中的缓存已达 154.9 小时，新模型直到后台服务重启才出现。直接影响新模型发现与使用，讨论量在有效技术反馈中较高。 |
| [#64588 数据库增长至 12.7 GB 并出现 I/O 错误](https://github.com/anomalyco/opencode/issues/64588) | **Open · 3 条评论** | 用户称使用约三周后数据库达到 12.7 GB，12 分钟内出现 474 次 SQLite 磁盘 I/O 错误。涉及会话、项目和配置读写，应优先关注，但不能据单例判断普遍性。 |
| [#64558 子代理完成通知被静默跳过](https://github.com/anomalyco/opencode/issues/64558) | **Open · 3 条评论** | 子代理已完成并保存最终响应，主流程却可能漏掉完成通知。影响多代理编排的闭环，即“任务完成”与“调用方知晓完成”的一致性。 |
| [#64484 ECONNRESET 后会话无法自行恢复](https://github.com/anomalyco/opencode/issues/64484) | **Open · 3 条评论** | 用户反馈 v2.3.0 仍间歇出现连接重置，且需在另一会话发送消息才能恢复。问题不仅是连接稳定性，也涉及错误后的状态恢复。 |
| [#64468 移动端过期权限请求持续重试](https://github.com/anomalyco/opencode/issues/64468) | **Open · 3 条评论** | PC 已处理的权限请求仍留在手机上，点击后返回 404 并持续重试。暴露远程配对场景中的跨端状态同步与失效请求处理问题。 |
| [#64550 GPT-6.2 系统提示未命中缓存](https://github.com/anomalyco/opencode/issues/64550) | **Closed · 2 条评论** | 指出 Responses API 顶层 `instructions` 不参与 GPT-6.2 提示缓存，导致重复输入成本。该问题与 v2.3.2 发布说明中的调整直接对应，是今日最明确的成本优化动态。 |
| [#64569 升级后历史项目从面板消失](https://github.com/anomalyco/opencode/issues/64569) | **Open · 1 条评论** | 报告称迁移后项目目录为空、名称为 NULL，历史会话仍在数据库中。虽讨论量少，但关系到升级信任与历史工作可访问性，应与其他迁移反馈一起跟踪。 |
| [#64573 Windows cmd 双引号被错误转义](https://github.com/anomalyco/opencode/issues/64573) | **Open · 1 条评论** | 带引号参数被传为字面量 `\"...\"`，可能破坏常见构建和脚本命令。已出现直接关联修复 PR，具备明确的后续跟踪路径。 |

## 4. 重要 PR 进展

以下 10 项兼顾执行可靠性、跨平台兼容和功能扩展；除特别说明外，均为 **Open，尚不能视为已交付**。

| PR | 状态 | 功能或修复内容 |
|---|---|---|
| [#64574 Windows Shell 命令原样传递](https://github.com/anomalyco/opencode/pull/64574) | **Open** | 调整传给 cmd 与 PowerShell 的命令处理，修复嵌入双引号被错误转义的问题，直接关联 #64573。 |
| [#64572 TLS 握手兼容回退](https://github.com/anomalyco/opencode/pull/64572) | **Open** | 面向会丢弃较大后量子 TLS ClientHello 的网络，增加传统 TLS 握手回退。值得网络受限用户关注，但尚不能据此认定所有 ECONNRESET 都会解决。 |
| [#64568 删除 worktree 前释放资源](https://github.com/anomalyco/opencode/pull/64568) | **Open** | 先释放终端、管道和 location 资源，再删除 worktree，针对 Windows 下资源占用导致删除失败的问题。 |
| [#64571 修正 Shell 事件监听退出码字段](https://github.com/anomalyco/opencode/pull/64571) | **Open** | 将监听解析字段从 `exit` 改为工具实际返回的 `exitCode`，修复 `gh pr create`、`git push` 后事件监听不触发的问题。 |
| [#64565 修复时间线更新期间崩溃](https://github.com/anomalyco/opencode/pull/64565) | **Closed，合并状态未知** | 处理无可读文本的 thinking 输出、行在更新途中移除等渲染边界，目标是避免会话视图失效。 |
| [#64575 修复冷启动深链接丢失](https://github.com/anomalyco/opencode/pull/64575) | **Closed，合并状态未知** | 修复应用关闭时点击 `opencode://` 链接，只启动应用却未处理链接目标的问题。 |
| [#64589 向 Code Mode 模型介绍 Bun 文件 API](https://github.com/anomalyco/opencode/pull/64589) | **Open** | 在启用 `full_codemode` 时，通过 execute 工具说明 Bun 文件 API，帮助模型正确使用执行环境提供的能力。 |
| [#64587 改善 Code Mode 导入错误](https://github.com/anomalyco/opencode/pull/64587) | **Open** | 让无法解析 import 的错误说明具体失败原因，减少通用错误信息带来的排障成本。 |
| [#64580 按配置目录切换 Claude Agent 账号](https://github.com/anomalyco/opencode/pull/64580) | **Open** | 推进基于配置目录的账号切换，服务多账号、不同工作身份隔离的使用场景；依赖前置分支工作。 |
| [#64577 GUI 插件自定义图标](https://github.com/anomalyco/opencode/pull/64577) | **Open** | 允许插件将自有图形声明为图标名，在多个 SDK 图标字段中复用，扩展 GUI 插件的表达能力。 |

## 5. 功能需求趋势

从已展示的 Issue 看，社区诉求不仅是新增功能，也包括让已有能力更可控、更可靠。

- **时间线展示控制更精细。** 用户希望主动关闭流式输出跟随，并让已完成的 thinking 遵守“展开”设置，反映出长任务阅读与回溯需求。相关：[停止自动跟随 #64578](https://github.com/anomalyco/opencode/issues/64578)、[保留思考块展开 #64566](https://github.com/anomalyco/opencode/issues/64566)。
- **模型与凭据管理更透明。** 新模型能否及时出现、API Key 如何替换、预设模型如何维护，成为连接模型生态的主要摩擦点。相关：[模型目录缓存 #64489](https://github.com/anomalyco/opencode/issues/64489)、[Jev 1.13 缺失 #64507](https://github.com/anomalyco/opencode/issues/64507)、[凭据与模型管理入口 #64561](https://github.com/anomalyco/opencode/issues/64561)。
- **跨端工作流需要真正闭环。** 移动端不仅要能展示会话，还需正确执行命令、同步权限状态。相关：[移动端 `/goal` 失效 #64469](https://github.com/anomalyco/opencode/issues/64469)、[过期授权请求 #64468](https://github.com/anomalyco/opencode/issues/64468)。
- **国际化质量覆盖字形与布局。** 中文字形问题之外，CJK 与 emoji 的宽度计算也被关注，说明国际化体验不能仅停留在界面翻译。相关：[中文字形 #64543](https://github.com/anomalyco/opencode/issues/64543)、[TUI 文本宽度 #64538](https://github.com/anomalyco/opencode/issues/64538)。
- **桌面性能与交互反馈仍需打磨。** 模型列表数据量不大仍出现悬停、滚动卡顿，用户开始关注客户端渲染开销，而不只是接口响应速度。相关：[模型选择器卡顿 #64570](https://github.com/anomalyco/opencode/issues/64570)。

## 6. 开发者关注点

1. **升级前后，历史工作必须可访问。** 项目面板消失、会话无法解析与数据库增长反馈，说明迁移验证、备份和存储诊断值得优先投入。相关：[历史会话不可见 #64494](https://github.com/anomalyco/opencode/issues/64494)、[数据库 I/O 错误 #64588](https://github.com/anomalyco/opencode/issues/64588)。

2. **失败后应能自动恢复，而不是污染后续会话。** Provider 失败产生空工具调用、网络错误后会话卡住，均要求明确的终止状态、重试边界和恢复机制。相关：[#64481](https://github.com/anomalyco/opencode/issues/64481)、[#64484](https://github.com/anomalyco/opencode/issues/64484)。

3. **Windows 兼容需要覆盖企业环境。** 除 Shell 参数传递外，运行时下载未签名 helper 被 WDAC 阻止，也会让工具无法用于受管设备；该反馈不能简单等同于普通安装问题。相关：[Shell 转义 #64573](https://github.com/anomalyco/opencode/issues/64573)、[企业应用控制拦截 #64562](https://github.com/anomalyco/opencode/issues/64562)。

4. **Token 成本与上下文状态需要可解释。** 缓存失效、重复注入约 10k token 的工具目录，以及上下文百分比超过 100%，都会削弱开发者对成本和容量指标的信任。相关：[缓存 #64550](https://github.com/anomalyco/opencode/issues/64550)、[重复注入 #64479](https://github.com/anomalyco/opencode/issues/64479)、[上下文显示 #64488](https://github.com/anomalyco/opencode/issues/64488)。

**今日判断：** 从当前快照看，OpenCode 的迭代重点正同时覆盖成本优化与 V2 稳定性收敛。对生产使用者，最值得跟踪的是 **v2.3.2 缓存行为、升级后历史数据可见性，以及 Windows/网络兼容修复的实际交付状态**。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-11-18

## 今日速览

今日数据窗口内无新版本发布，共有 **19 条 Issue、2 条 PR 更新，当前均为 CLOSED**。讨论主要集中在 **会话与工具执行稳定性、提示词缓存复用及成本统计、上下文压缩扩展机制**，其中多进程会话分叉问题获得最多评论。

两条 PR 分别涉及压缩事件通知和 Skill 冲突诊断。**关闭不等于已修复或已合并**：现有数据未提供关闭原因、合并状态及发布归属，以下按问题报告和变更提案解读。

> 数据口径：来源标注为 `badlogic/pi-mono`，但条目指向 `earendil-works/pi`；下文链接沿用条目指向的仓库。

## 社区热点 Issues

以下选取 10 个重点条目。所有 Issue 的 👍 均为 0，“社区反应”主要参考评论量，不代表已形成共识。

### 1. 多实例写入可能导致会话树分叉
[Issue #12266](https://github.com/earendil-works/pi/issues/12266)｜5 条评论

两个 Pi 进程打开同一会话时，空闲实例可能使用过期的 `leafId` 追加记录，形成旁支，导致恢复会话时落入空分支。  
**为什么重要：** 涉及会话持久化与恢复可靠性，尤其影响多终端和退出时写入状态的扩展。它也是本批数据中评论最多的议题。

### 2. OpenAI Decisions 缓存用量与费率统计异常
[Issue #12264](https://github.com/earendil-works/pi/issues/12264)｜3 条评论

报告指出，`parseClassifierUsage()` 将缓存计数置零，相关缓存费率也使用零值。  
**为什么重要：** 可能影响缓存命中率展示和费用估算，需要区分“统计遗漏”与“实际未命中缓存”。评论量位居本批数据第二。

### 3. GPT-6.2 Sol 报告的缓存复用低于 6.1
[Issue #12273](https://github.com/earendil-works/pi/issues/12273)｜2 条评论

在报告者的同一工作负载第 4 轮中，6.2 的缓存 token 为 **3,968/12,931**，6.1 为 **12,800/12,931**。  
**为什么重要：** 报告值相差约 8.8k token，值得关注模型切换后的成本变化；但现有数据不足以判定是实际缓存行为、请求构造还是统计口径差异。

### 4. codemode 并发读取失败可能使整个进程崩溃
[Issue #12271](https://github.com/earendil-works/pi/issues/12271)｜2 条评论

Pi 1.5.2 中，codemode 脚本并发调用 `read` 时，如果一个调用失败、另一个仍在等待，可能出现未处理的 `AbortError`。  
**为什么重要：** 单次工具错误可能升级为进程退出，影响自动化任务可靠性。另有相似报告 [#12253](https://github.com/earendil-works/pi/issues/12253)（2 条评论），说明这一场景出现了重复反馈，但尚不能据此确认同一根因。

### 5. 外部 SIGTSTP 挂起后未恢复终端状态
[Issue #12272](https://github.com/earendil-works/pi/issues/12272)｜1 条评论

外部信号暂停 Pi 后，鼠标追踪和 kitty 键盘协议可能仍保持开启，导致 shell 收到意外转义序列。  
**为什么重要：** 影响终端作业控制与暂停/恢复体验，属于 TUI 生命周期清理问题。

### 6. 虚拟模型路由下，压缩配置可能未作用于实际模型
[Issue #12265](https://github.com/earendil-works/pi/issues/12265)｜2 条评论

报告者使用虚拟模型在不同上下文窗口的模型间路由，发现实际路由模型的 `compaction.modelOverrides` 可能被忽略。  
**为什么重要：** 压缩阈值需要与实际模型容量匹配，否则可能影响上下文管理；对自定义路由扩展尤其关键。

### 7. 扩展提交压缩记录时缺少 `session_compact` 事件
[Issue #12263](https://github.com/earendil-works/pi/issues/12263)｜1 条评论

通过 `turn_end` 或 `agent_before_settle` 的 boundary draft 提交压缩记录时，仅触发 `entry_appended`，未触发 `session_compact`。  
**为什么重要：** 依赖压缩事件同步状态的扩展可能漏处理，反映不同压缩入口之间的事件契约不一致。已有对应 PR，见下节。

### 8. 未注册工具调用可能使 Agent 回合停滞
[Issue #12261](https://github.com/earendil-works/pi/issues/12261)｜1 条评论

报告称，指向未注册工具的调用无法结束，并可能将调用格式泄漏到 TUI。  
**为什么重要：** 异常工具调用应能够返回明确错误，而不是静默阻塞。报告者称已重复复现，但未定位到具体函数。

### 9. Windows 终端颜色查询响应可能误触发外部编辑器
[Issue #12254](https://github.com/earendil-works/pi/issues/12254)｜1 条评论

在 Windows 10、mintty 环境下，OSC 颜色查询响应被当作输入，尾部 BEL 进一步触发外部编辑器，表现为 Pi“冻结”。  
**为什么重要：** 暴露终端协议响应与用户输入隔离的问题，也增加了跨平台故障的排查难度。

### 10. 切换 thinking level 时希望保留提示词缓存
[Issue #12269](https://github.com/earendil-works/pi/issues/12269)｜1 条评论

用户反馈，`openai-codex` 会因思考等级变化而改变提示前缀，破坏缓存复用。  
**为什么重要：** 用户希望在同一会话中动态调节推理强度，同时避免缓存失效带来的成本增加；与缓存统计、模型版本差异构成同一关注方向。

## 重要 PR 进展

**数据中仅有 2 条 PR，无法选出 10 条；以下全部列出。两者均为 CLOSED，未提供是否合并的信息。**

| PR | 功能或修复内容 | 开发者价值 |
|---|---|---|
| [#12262：补发 boundary-draft 压缩事件](https://github.com/earendil-works/pi/pull/12262) | 针对扩展通过 boundary draft 提交压缩记录的路径，补充 `session_compact` 事件通知，对应 Issue #12263。 | 让依赖压缩事件的扩展在不同压缩入口下获得一致通知。 |
| [#12256：修正 Skill 冲突诊断范围](https://github.com/earendil-works/pi/pull/12256) | 对已由优先级确定结果的同名 Skill 覆盖抑制警告，保留同优先级、真正存在歧义的冲突提示。 | 减少项目级覆盖用户级、顶层覆盖包内资源时的重复告警，提高诊断信噪比。 |

## 功能需求趋势

### 1. 缓存效率与成本可观测性
社区不仅关注模型能否调用，也开始关注缓存是否命中、统计是否准确，以及调整推理参数是否会破坏缓存。  
相关：[缓存计量 #12264](https://github.com/earendil-works/pi/issues/12264)、[模型版本差异 #12273](https://github.com/earendil-works/pi/issues/12273)、[思考等级切换 #12269](https://github.com/earendil-works/pi/issues/12269)。

### 2. 更灵活、可预测的上下文压缩
需求覆盖三个层面：允许固定较便宜的压缩模型、按实际路由模型应用配置、保证扩展事件完整。  
相关：[默认压缩模型 #12260](https://github.com/earendil-works/pi/issues/12260)、[路由配置 #12265](https://github.com/earendil-works/pi/issues/12265)、[压缩事件 #12263](https://github.com/earendil-works/pi/issues/12263)。

### 3. 扩大 Provider、模型与能力档位覆盖
Sarvam 接入提案涉及 `/login`、API Key 和模型列表；另有 Qwen 模型清单更新、`ultra` 推理档位支持需求。两条 Sarvam 提案内容相近，不宜视为两个独立需求来源。  
相关：[Sarvam #12258](https://github.com/earendil-works/pi/issues/12258)、[相近提案 #12255](https://github.com/earendil-works/pi/issues/12255)、[Qwen #12259](https://github.com/earendil-works/pi/issues/12259)、[`ultra` #12267](https://github.com/earendil-works/pi/issues/12267)。

### 4. 减少交互摩擦与诊断噪声
需求既包括减少可预期资源覆盖产生的警告，也包括让页脚分支名可点击等轻量交互改进。  
相关：[Skill 冲突告警 #12257](https://github.com/earendil-works/pi/issues/12257)、[页脚分支交互 #12270](https://github.com/earendil-works/pi/issues/12270)。

## 开发者关注点

- **异常需要被限制在工具调用范围内。** 并发读取失败、取消和未注册工具调用，不应导致整个进程退出或回合永久等待。相关：[读取崩溃](https://github.com/earendil-works/pi/issues/12271)、[工具调用停滞](https://github.com/earendil-works/pi/issues/12261)。
- **扩展 API 的一致性正在成为关键要求。** 多实例写入、路由模型配置和压缩事件，都要求框架在不同入口下保持明确、统一的行为。相关：[会话分叉](https://github.com/earendil-works/pi/issues/12266)、[压缩事件](https://github.com/earendil-works/pi/issues/12263)。
- **终端兼容性仍是稳定性短板。** 信号处理和协议响应解析都可能造成“看似卡死、实际状态异常”的体验。相关：[SIGTSTP](https://github.com/earendil-works/pi/issues/12272)、[OSC 输入污染](https://github.com/earendil-works/pi/issues/12254)。
- **需要区分真实缺陷与配置误报。** “自定义 Provider 被忽略”的报告已由作者明确标记为无效，不应计入已确认缺陷。相关：[Issue #12268](https://github.com/earendil-works/pi/issues/12268)。

**分析结论：** 本日反馈的核心不是单纯增加功能，而是提升 Agent 工作流的可预测性——工具失败可恢复、会话状态不分叉、扩展事件不遗漏、缓存成本可解释。上述问题是否已解决，仍需结合后续合并记录与版本说明确认。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：2026-11-18｜仓库：[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)**

## 1. 今日速览

Qwen Code 发布 **v0.28.0**，同步推出 Desktop 与 TypeScript SDK 更新，并开启 **v0.28.1-preview.0** 预览迭代。开发重点集中在 **Daemon 会话恢复、Managed Agent 自动化和 SSE 连接治理**；社区反馈则主要涉及 Java SDK 正确性、配置迁移以及 Worktree 会话恢复阻塞。

> **数据说明：**本日报依据提供的 Release 摘要、30 条 Issue 和 20 条 PR 样本整理。Release 内容存在截断；PR 评论数缺失，且 `CLOSED` 不等于已合并，以下不将关闭状态视为修复已发布的证据。

## 2. 版本发布

| 版本 | 可确认的更新 | 开发者提示 |
|---|---|---|
| [v0.28.0](https://github.com/QwenLM/qwen-code/releases/tag/v0.28.0) | 正式版发布；可见功能包括 Web Shell 侧边栏工作区筛选。发布说明声明“无已知破坏性变更”。 | 完整变更列表未提供，升级前仍建议核对完整说明。 |
| [desktop-v0.28.0](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.28.0) | Desktop 同步更新；摘要包含工作区筛选，以及 Managed Agent 钉钉适配器相关新增。 | 钉钉条目被截断，暂无法确认具体支持范围。 |
| [sdk-typescript-v0.1.35](https://github.com/QwenLM/qwen-code/releases/tag/sdk-typescript-v0.1.35) | 摘要首段标注捆绑 CLI **0.28.0**。 | 同一摘要还出现 CLI 0.27.4 的重复段落，版本对应关系应以实际包及完整发布页为准。 |
| [v0.28.1-preview.0](https://github.com/QwenLM/qwen-code/releases/tag/v0.28.1-preview.0) | 可见变更包括在全栈 E2E 中观察真实定时 `/loop` 触发，增强自动化行为验证。 | 其余条目不完整，不能据此判断全部修复范围。 |

## 3. 社区热点 Issues

以下结合严重程度、影响范围和讨论量，选出 10 项重点。所列 Issue 均为 **OPEN**，👍 均为 0；评论量代表讨论活跃度，不等同于广泛共识。

| Issue | 为什么重要 | 社区反应与状态 |
|---|---|---|
| **[ #17682：Grep 回退的非 UTF-8 路径与性能异常](https://github.com/QwenLM/qwen-code/issues/17682)** | 非 UTF-8 文件名可能在解码后失真，影响检索完整性；同时涉及内置 ripgrep 性能异常。 | **P2，5 条评论**，为展示样本中讨论最多的一项，属于此前 PR 延后的跟进问题。 |
| **[ #17678：External Workspace 的 shell 会话被拒绝](https://github.com/QwenLM/qwen-code/issues/17678)** | 报告称三处准入缺陷叠加，导致请求返回 `409 workspace_unavailable`，业务侧无法通过调整请求规避。 | **3 条评论**，标记为 `need-information`，仍需补充信息确认。 |
| **[ #17659：自定义 Provider 的 API Key 环境变量引用不解析](https://github.com/QwenLM/qwen-code/issues/17659)** | 影响凭据配置与安全部署，用户报告只能将密钥写入配置文件明文。 | **P1，2 条评论**；报告明确涉及 **1.0.0-preview.1/.2**，不能直接外推至 v0.28.0。 |
| **[ #17648：Worktree 恢复被定时任务提问阻塞](https://github.com/QwenLM/qwen-code/issues/17648)** | Web Shell 可能持续停留在加载页，最终会话加载失败，直接影响工作连续性。 | **P1，2 条评论**；已有对应修复 PR #17654，但仍处于 OPEN。 |
| **[ #17627：Java 并发写入破坏 JSONL 消息边界](https://github.com/QwenLM/qwen-code/issues/17627)** | 消息正文、换行和 flush 不是整体同步操作，并发发送可能交错，属于协议层可靠性问题。 | **P2，3 条评论**；对并发 prompt/control 调用尤其值得关注。 |
| **[ #17642：Java 文件读取用路径分隔符拼接文本行](https://github.com/QwenLM/qwen-code/issues/17642)** | 文件内容可能由换行文本变成 `alpha/beta/`，直接污染代理读到的源代码与文本。 | **P2，3 条评论**；标记 `ready-for-agent`，对应 PR #17652 已关闭，合并情况未提供。 |
| **[ #17674：无 `$version` 的禁用自动更新配置失效](https://github.com/QwenLM/qwen-code/issues/17674)** | 手写旧配置可能被错误迁移，导致用户明确关闭自动更新后仍保持开启。 | **P2，2 条评论**；已有 OPEN 修复 PR #17675。 |
| **[ #17669：Shell 输出混合导致错误归因](https://github.com/QwenLM/qwen-code/issues/17669)** | stdout/stderr 无标签混合，再配合 `Error: (none)`，可能让模型误判命令执行结果。 | **P2，2 条评论**；已有 OPEN PR #17685 改善结果标签。 |
| **[ #17666：订阅认证下支持内置 `image_gen`](https://github.com/QwenLM/qwen-code/issues/17666)** | 用户希望 Qwen 订阅权益能直接用于代码代理中的图像生成，减少额外 Provider 配置。 | **P2 功能请求，3 条评论**；标记 `need-discussion`，尚未形成确定实现方案。 |
| **[ #17667：持久化用户规则缺少执行约束](https://github.com/QwenLM/qwen-code/issues/17667)** | 当前规则主要作为上下文建议，无法阻止违规工具调用；对受控修改和团队策略执行有实际影响。 | **P3 功能请求，2 条评论**；标记 `need-discussion`，体现了从“记住规则”向“执行规则”的需求。 |

## 4. 重要 PR 进展

以下 10 项覆盖基础设施、自动化能力和用户可感知修复。**OPEN 表示仍在推进；CLOSED 仅表示已关闭。**

| PR | 状态 | 功能或修复内容 |
|---|---|---|
| **[ #17677：Daemon 重启恢复收件箱](https://github.com/QwenLM/qwen-code/pull/17677)** | OPEN | 新增恢复扫描与批量继续接口，发现最新 prompt 尚未结束的会话，无需逐个打开或切换对话即可恢复。 |
| **[ #17662：统一 SSE 准入与占用统计](https://github.com/QwenLM/qwen-code/pull/17662)** | OPEN | 将连接槽位保护扩展到更多长连接流，包括会话事件、generation、产物库和侧边提问等，强化资源治理。 |
| **[ #17665：PR Watch 向绑定会话私密注入事件](https://github.com/QwenLM/qwen-code/pull/17665)** | OPEN | 在 CI 失败、出现合并冲突或 PR head 变化时，主动向绑定的 Managed Session 投递事件，为自动跟进提供入口。 |
| **[ #17681：Attachment 退役通知与挂起等待超时清理](https://github.com/QwenLM/qwen-code/pull/17681)** | OPEN | Daemon 客户端主动通知 attachment 失效，并处理长期等待；为无状态 Hosted Harness 第一阶段提供前置能力。 |
| **[ #17654：避免自动任务阻塞 Worktree 恢复](https://github.com/QwenLM/qwen-code/pull/17654)** | OPEN | 针对会话冷恢复与自动任务之间的阻塞关系，回应 P1 Issue #17648。 |
| **[ #17675：迁移无版本号配置中的嵌套 `disable*` 键](https://github.com/QwenLM/qwen-code/pull/17675)** | OPEN | 将缺少 `$version` 的旧配置按对应版本迁移，例如把 `disableAutoUpdate: true` 转为 `enableAutoUpdate: false`。 |
| **[ #17685：明确 Shell 混合输出与执行错误](https://github.com/QwenLM/qwen-code/pull/17685)** | OPEN | 将标签改为 `Output (stdout and stderr combined)` 与 `Execution Error`。这是语义澄清，**不是将两条输出流重新分离**。 |
| **[ #17652：Java 文件读取恢复正确换行](https://github.com/QwenLM/qwen-code/pull/17652)** | CLOSED | 使用文本换行拼接读取结果，修正路径分隔符污染文件内容的问题，并保留原有行选择与错误处理行为。 |
| **[ #17651：Java 保留完整工具调用参数](https://github.com/QwenLM/qwen-code/pull/17651)** | CLOSED | 修复查询结果丢失 assistant tool-use 输入的问题，避免已解析参数被返回为空对象。 |
| **[ #17660：历史源变化时失效反向搜索缓存](https://github.com/QwenLM/qwen-code/pull/17660)** | OPEN | 历史记录增加、删除或重排后重新计算搜索结果，避免遗漏新记录或选中已移除的旧条目。 |

## 5. 功能需求趋势

1. **自动化代理需要“可持续运行”，而不只是能启动任务。**  
   `/loop` 防护、External Workspace 准入及恢复能力共同表明，后台自动化正进入生命周期与异常恢复的完善阶段。  
   参考：[Managed `/loop` 防护 #17673](https://github.com/QwenLM/qwen-code/issues/17673)、[Workspace 准入 #17678](https://github.com/QwenLM/qwen-code/issues/17678)。

2. **用户希望订阅权益直接覆盖更多工具能力。**  
   图像生成需求反映出账号订阅、认证方式与工具注册之间仍有体验断层。  
   参考：[订阅认证支持 `image_gen` #17666](https://github.com/QwenLM/qwen-code/issues/17666)。

3. **规则记忆需要升级为可验证、可约束的策略。**  
   用户不仅希望代理记住偏好，还希望检测甚至阻止违反长期规则的操作。  
   参考：[持久化规则执行约束 #17667](https://github.com/QwenLM/qwen-code/issues/17667)。

4. **Linux 原生交互体验仍有补齐空间。**  
   除已有右键剪贴板粘贴外，用户提出中键粘贴 PRIMARY selection，强调终端 UI 应符合桌面习惯。  
   参考：[OpenTUI 中键粘贴 #17683](https://github.com/QwenLM/qwen-code/issues/17683)。

5. **检索性能必须同时满足 Git 语义和边界正确性。**  
   社区不仅关注搜索速度，也关注 Git 不可用、非 UTF-8 路径与 Worktree 排除规则下的可预测行为。  
   参考：[回退范围定义 #17679](https://github.com/QwenLM/qwen-code/issues/17679)、[Worktree 排除规则 #17635](https://github.com/QwenLM/qwen-code/issues/17635)。

## 6. 开发者关注点

- **SDK 稳定性是最集中的反馈方向。** Java 相关报告覆盖消息边界、编码、进程回收、取消语义和错误传播，说明集成方需要的是完整协议生命周期的可靠性，而非单一接口可用。  
  参考：[并发写入 #17627](https://github.com/QwenLM/qwen-code/issues/17627)、[初始化失败遗留子进程 #17640](https://github.com/QwenLM/qwen-code/issues/17640)、[JSON-RPC 错误未上抛 #17625](https://github.com/QwenLM/qwen-code/issues/17625)。

- **会话不能“静默卡住”。** Worktree 加载阻塞和 SSE 正常 EOF 后请求永久等待，都要求更明确的终止、超时和恢复语义。  
  参考：[Worktree 恢复 #17648](https://github.com/QwenLM/qwen-code/issues/17648)、[SSE EOF 请求悬挂 #17647](https://github.com/QwenLM/qwen-code/issues/17647)。

- **模型看到的工具结果必须准确。** 输出流归因、EOF 行号以及 transcript 遗失 Shell 输出，都会影响代理后续推理，即使底层命令已经正确执行。  
  参考：[Shell 输出标签 #17669](https://github.com/QwenLM/qwen-code/issues/17669)、[EOF 行号 #17668](https://github.com/QwenLM/qwen-code/issues/17668)、[Transcript 丢失输出 #17639](https://github.com/QwenLM/qwen-code/issues/17639)。

- **配置迁移与凭据处理需要保持用户意图。** 禁用开关不能在迁移中失效，环境变量引用也不应迫使用户退回明文密钥。  
  参考：[配置迁移 #17674](https://github.com/QwenLM/qwen-code/issues/17674)、[Provider 环境变量引用 #17659](https://github.com/QwenLM/qwen-code/issues/17659)。

**综合判断：**当前社区关注点正从“增加工具能力”扩展到“让长运行代理和 SDK 集成在真实环境中可靠工作”。短期最值得跟踪的是两项 P1 问题、Java SDK 修复的实际合并与发布情况，以及 Daemon 恢复和 SSE 治理方案的落地。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报
**日期：2026-11-18｜观察窗口：过去 24 小时**

> **数据说明**：来源标注为 `Hmbown/DeepSeek-TUI`，但所提供的 Issue、PR 均指向 `codewhale-hq/Codewhale`。以下按条目中的实际仓库生成链接，归属关系尚待核实。数据仅包含 1 条 Issue、6 条 PR，因此全部列出，不补足至 10 条。

## 1. 今日速览

今日未提供新版本发布记录，开发活动主要集中在 **TUI 响应性、撤销与恢复可靠性，以及模型工具调用兼容性**。值得关注的修复包括为终端快照等待设置超时、对部分失败的文件恢复执行回滚，以及避免 Moonshot 路由丢弃 MCP 工具；相关 PR 均仍处于开放状态。唯一新增 Issue 指向免费模型“可列出、不可调用”的问题，但目前尚无评论或社区验证。

## 2. 社区热点 Issues

### [#7365 免费模型可见但无法调用：`opencode-zen` 返回 429](https://github.com/codewhale-hq/Codewhale/issues/7365)
**状态：OPEN｜作者：7jrxt42BxFZo4iAnN4CX｜评论：0｜👍：0**

- **问题概述**：报告称，`opencode-zen` 能列出 Zen 免费模型，但实际调用遇到 `FreeUsageLimitError`。标题将问题关联到网关对请求载荷及 TLS 密码套件列表的精确检查，具体根因仍待验证。
- **为何重要**：模型列表可见不等于模型可用，这类落差会直接影响提供商接入体验，也容易让用户混淆额度限制、请求兼容性和配置错误。
- **社区反应**：暂无评论或点赞，尚不能视为已确认的普遍故障。报告者已检索既有问题，并指出与已关闭的 #6705 不同。

## 3. 重要 PR 进展

| PR | 状态 | 功能或修复内容 | 开发者价值 |
|---|---|---|---|
| [#7366 文件级恢复部分失败时执行回滚](https://github.com/codewhale-hq/Codewhale/pull/7366) | OPEN | 使用既有安全快照，回滚已尝试的 checkout 批次及已完成的删除操作，恢复范围限制在相关路径内。 | 避免撤销操作报告失败后，工作区仍残留部分修改，提升状态一致性。 |
| [#7364 保留 Moonshot 路由中的可空可选参数 MCP 工具](https://github.com/codewhale-hq/Codewhale/pull/7364) | OPEN | 修复 Python MCP 工具包含 `limit: int \| None = None` 等参数时，被从 Moonshot（Kimi）请求中丢弃的问题。 | 改善 FastMCP、Pydantic v2 生成的工具定义与模型路由之间的兼容性，避免模型完全看不到工具。 |
| [#7363 焦点恢复时不再先清空视口](https://github.com/codewhale-hq/Codewhale/pull/7363) | OPEN | 将普通焦点恢复与显式清屏分离：恢复终端模式等状态后重绘视口。 | 减少不支持或忽略 DEC 2026 的终端在焦点切换时出现的中间空白画面。 |
| [#7362 按指定轮次撤销时避免重复读取历史](https://github.com/codewhale-hq/Codewhale/pull/7362) | OPEN | 复用已加载的历史记录，避免解析撤销深度后再次读取整段历史。 | 降低长会话撤销准备的读取开销，减少准入保护期间的额外等待。 |
| [#7360 为终端快照等待设置上限](https://github.com/codewhale-hq/Codewhale/pull/7360) | OPEN | 将轮次完成时的终端会话快照等待限制为既有的两秒 Engine 快照等待；超时后返回事件循环，跳过该次完成态快照提交。 | 避免 Engine 忙于新一轮任务时，TUI 一直冻结到该轮结束。 |
| [#7361 限制已完成轮次的会话快照等待](https://github.com/codewhale-hq/Codewhale/pull/7361) | CLOSED，重复项 | 因与 #7360 重复而关闭；说明中指出 #7360 已获得维护者审阅，此分支及测试证据仍保留。 | 修复工作集中到较早的 PR，减少重复推进。关闭不代表修复已合并。 |

**进展边界**：提供的数据中没有已合并 PR 的记录，不能据此认定上述修复已经交付。PR 评论数均为 `undefined`，无法判断讨论热度；此外，#7361 标注的更新时间为 **11 月 17 日**，与“过去 24 小时更新”的分组口径存在差异，此处作为相关背景保留。

## 4. 功能需求趋势

**仅凭 1 条 Issue，尚不足以判断社区整体需求排行。** 结合 PR，可以观察到以下近期工程方向：

- **模型接入从“能列出”转向“能实际使用”**：免费模型调用失败暴露了模型发现与调用链路之间的落差，提示后续需关注错误提示与可用性判断。参见 [#7365](https://github.com/codewhale-hq/Codewhale/issues/7365)。
- **工具调用兼容性更受重视**：对 Python 类型与 JSON Schema 边界情况的处理，直接决定 MCP 工具能否被模型看到。参见 [#7364](https://github.com/codewhale-hq/Codewhale/pull/7364)。
- **TUI 稳定性与长会话体验是本批修复重点**：快照等待、焦点恢复和历史重复读取均有对应改动。参见 [#7360](https://github.com/codewhale-hq/Codewhale/pull/7360)、[#7363](https://github.com/codewhale-hq/Codewhale/pull/7363)、[#7362](https://github.com/codewhale-hq/Codewhale/pull/7362)。
- **撤销操作强调失败后的可恢复性**：不仅要报告失败，也要避免工作区停留在部分恢复状态。参见 [#7366](https://github.com/codewhale-hq/Codewhale/pull/7366)。

本批数据没有提供 IDE 集成或新增模型需求的直接证据。

## 5. 开发者关注点

1. **异步操作不应阻塞交互**：Engine 忙碌时，快照获取需要有界等待，避免连带冻结 TUI。——[#7360](https://github.com/codewhale-hq/Codewhale/pull/7360)
2. **失败操作应具有清晰、可预期的状态结果**：文件恢复失败不能留下难以察觉的半完成修改。——[#7366](https://github.com/codewhale-hq/Codewhale/pull/7366)
3. **适配层不应静默丢失能力**：可空可选参数不应导致整个 MCP 工具从请求中消失。——[#7364](https://github.com/codewhale-hq/Codewhale/pull/7364)
4. **长会话与不同终端需要专项优化**：重复历史读取增加等待，焦点恢复清屏影响视觉连续性。——[#7362](https://github.com/codewhale-hq/Codewhale/pull/7362)、[#7363](https://github.com/codewhale-hq/Codewhale/pull/7363)

**后续优先跟踪**：#7360 的审阅与合并进展、#7366 的失败回滚覆盖范围，以及 #7365 是否获得维护者复现或诊断。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*