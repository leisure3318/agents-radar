# AI CLI 工具社区动态日报 2026-11-27

> 生成时间: 2026-11-27 05:19 UTC | 覆盖工具: 9 个

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
**日期：2026-11-27｜统计窗口：过去 24 小时**

> 本报告仅依据所提供摘要。Issue、PR 数量均指窗口内更新的记录，不等于新增数量；PR 关闭不代表已合并，Issue 关闭不代表修复已发布。单日活跃度也不能直接代表产品成熟度或市场份额。

## 1. 生态全景

本次样本共覆盖 **9 款工具、21 条 Issue 和 17 条 PR，均未报告新 Release**，工程活动主要集中在 OpenCode、OpenAI Codex 和 Qwen Code。当天关注点以可靠性和工作流完善为主，包括后台服务阻塞、异步工具调用、技能加载、跨平台路径和交互状态保持。虽然统称为 AI CLI，实际反馈已延伸至桌面端、Web Shell、SDK 与长期运行服务，产品形态不再局限于终端问答。多个项目出现“配置已启用、实际能力却未生效”或“任务仍在运行、状态却不可见”的问题，说明**运行状态的可观测性与可控性**正成为重要工程议题。

## 2. 各工具活跃度对比

| 工具 | Issues | PR | PR 状态概况 | Release 情况 | 今日主要关注 |
|---|---:|---:|---|---|---|
| Claude Code | 4 | 0 | 无更新 | 无新发布 | Linux 快捷键、Desktop 目录辨识 |
| OpenAI Codex | 4 | 5 | 5 条关闭，合并状态未知 | 无新发布 | 桌面端一致性、TUI 侧栏与内容预览 |
| Gemini CLI | 0 | 0 | 无活动记录 | 无新发布记录 | 无可分析信号 |
| GitHub Copilot CLI | 1 | 0 | 无更新 | 无新发布 | 唯一报告信息不足 |
| Kimi Code CLI | 0 | 0 | 无活动记录 | 无新发布记录 | 无可分析信号 |
| OpenCode | 7 | 8 | 5 条开放、3 条关闭 | 无新发布 | Windows 兼容、工具生命周期、技能加载 |
| Pi | 1 | 0 | 无更新 | 无新发布 | SSE 流错误的重试识别 |
| Qwen Code | 4 | 4 | 4 条均开放 | 无新发布 | 大工作区性能、发布保障、模型配置 |
| DeepSeek TUI | 0 | 0 | 无活动记录 | 无新发布记录 | 无可分析信号 |
| **合计** | **21** | **17** | **9 条开放、8 条关闭** | **均未报告新发布** | — |

**数据注意：**Pi 唯一 Issue 的链接指向 `earendil-works/pi`，与所列数据源 `badlogic/pi-mono` 不一致，仓库归属仍需核实。

## 3. 共同关注的功能方向

| 共同方向 | 涉及工具 | 具体诉求与进展 |
|---|---|---|
| **长任务状态可见、可持续管理** | Codex、Qwen Code、OpenCode | Codex 用户提出持久化可编辑进度面板；Qwen 用户希望滚动历史后保留未提交输入；OpenCode 用户提出回答完成时间展示。分别涉及任务进度、输入状态和执行记录。 |
| **配置与能力加载结果可验证** | Codex、OpenCode | Codex 出现插件已启用但会话技能不可见；OpenCode 出现技能解析失败静默跳过、配置路径解析失败。共同诉求是让用户知道“实际加载了什么”。 |
| **跨平台交互与兼容性** | Claude Code、Codex、OpenCode | Claude Code 涉及 Linux Ctrl+Z 行为；Codex 涉及 Windows Markdown 预览闪烁；OpenCode 有两项 Windows 路径解析问题及对应开放修复 PR。 |
| **慢操作不阻塞核心体验** | Qwen Code、Codex | Qwen 大型快照据报导致服务冻结 6–8 分钟，已有开放修复 PR；Codex PR 尝试将 worktree 解析移至后台，降低文件系统访问对界面的阻塞。 |
| **异步执行与异常恢复正确性** | OpenCode、Pi | OpenCode 涉及延迟工具结果、子代理报告保留及权限检查生命周期；Pi 涉及 SSE 错误未触发自动重试。共同点是异常与交错完成场景，具体根因不同。 |
| **减少工作流上下文切换** | Codex、Claude Code | Codex PR 涉及侧栏 diff、内联图片与侧栏恢复；Claude Code 的目录预设反馈则强调当前工作上下文必须清晰，避免进入错误项目。 |

这些是跨项目的**当日信号**，并非已经得到广泛投票或长期数据验证的高频需求。

## 4. 差异化定位分析

以下定位是对当天功能与问题分布的解读，不代表各产品完整能力边界。

| 工具 | 当日体现的功能侧重 | 对应使用场景／用户 | 技术路线信号 |
|---|---|---|---|
| **Claude Code** | 终端交互与 Desktop 项目上下文 | 在终端和桌面会话间工作的开发者 | 强调快捷键与工作目录语义一致；没有足够 PR 数据判断实现方向 |
| **OpenAI Codex** | 对话、代码变更、图片和任务状态的整合 | 需要在同一界面完成多步骤开发工作的用户 | 侧栏化、富内容展示、后台解析，减少界面切换和等待 |
| **OpenCode** | 工具编排、模型适配、技能及跨平台配置 | 使用插件、多模型和复杂自动化的开发者 | 开放扩展接口与异步执行链路并重，但边界场景治理较突出 |
| **Qwen Code** | 多工作区服务、Web Shell、SDK 与发布工程 | 大仓库、多工作区及服务化部署用户 | 关注后台算法复杂度、分作用域模型配置和发布质量门禁 |
| **Pi** | 模型接口异常处理与自动恢复 | 使用 OpenAI 兼容服务、依赖自动重试的用户 | 当日仅能观察到错误分类与兼容性处理信号 |

**GitHub Copilot CLI** 的唯一报告不足以支撑定位判断；**Gemini CLI、Kimi Code CLI、DeepSeek TUI** 当日无活动数据，也不宜据此推断其产品方向或开发停滞。

## 5. 社区热度与成熟度

### 工程活动集中，但讨论热度普遍较低

- **OpenCode 最活跃：**7 条 Issue、8 条 PR，共 15 条更新，占全部记录约 **39%**；PR 占全部 PR 的约 **47%**。活动覆盖协议、路径、权限、资源释放等多个层面。
- **Codex 与 Qwen Code 次之：**分别为 9 条、8 条更新。三者合计贡献 **全部 17 条 PR**，占总更新量约 **84%**。
- **没有形成高互动热点：**所给 Issue 均为 0 个 👍，最高评论数仅为 Qwen 性能回归报告的 3 条。这里的“活跃”主要指工程记录密度，而不是大规模社区讨论。

### 快速迭代迹象不等于修复已交付

- **OpenCode** 呈现多线并行修复特征，尤其关注扩展能力背后的异步边界与兼容性。
- **Qwen Code** 同时推进性能回归修复、模型配置增量和发布保障，体现服务化能力与工程质量同步建设。
- **Codex** 的改动更集中于已有工作流的连续性和易用性，属于明显的体验完善信号，但 5 条关闭 PR 均缺少合并确认。

**成熟度不能由问题数量直接排名。**问题多可能来自覆盖面扩大、用户使用更深入或记录更充分；无活动也不能证明产品更稳定。更可靠的成熟度指标应包括修复时延、回归率、测试覆盖和发布后的实际验证。

## 6. 值得关注的趋势信号

### ① 产品评估正在从“能否完成任务”扩展到“能否持续可靠运行”
Qwen 的健康检查阻塞、OpenCode 的 PTY 释放及异步报告保留，都涉及长时间运行后的系统行为。

**开发者参考：**选型测试应覆盖大仓库、多工作区、长会话和后台任务交错完成，而不只比较一次性代码生成效果。

### ② 技能与插件需要从“可配置”走向“可验证”
Codex 与 OpenCode 的反馈都说明，配置成功并不保证会话实际获得能力。

**开发者参考：**重点检查是否提供技能加载清单、解析失败告警、配置来源与作用域展示，降低依赖模型表现反推配置故障的成本。

### ③ CLI 正在与图形化工作台融合
Codex 的侧栏 diff、图片预览和进度面板需求，以及 Qwen 的 Web Shell 模型设置，体现终端能力向多界面工作流延伸。

**开发者参考：**除模型能力外，应评估代码审阅、任务追踪、工作目录切换和多端状态是否一致。

### ④ 多模型兼容的难点正在深入失败语义
Pi 的 SSE 重试遗漏、OpenCode 的延迟工具结果处理表明，接口格式兼容只是基础，恢复策略与工具调用语义同样关键。

**开发者参考：**对目标 Provider 实测流中断、超时、延迟工具返回和重试行为；不能仅凭“OpenAI 兼容”判断生产可用性。

### ⑤ 发布与验证证据应成为升级决策的一部分
当天没有新 Release，多项修复仍开放或仅显示关闭；Qwen 的 SDK 发布流程本身也出现失败。

**开发者参考：**采用“**已报告 → 有修复 PR → 已合并 → 已发布 → 场景验证通过**”的分层跟踪方式，避免将代码活动误认为可用版本。

---

**决策摘要：**今天最值得优先跟踪的是 **Qwen Code 大工作区服务冻结、OpenCode 异步工具协议与 Windows 路径修复、Codex 工作流整合进展**。短期选型不宜按单日活跃度排名；更有价值的判断标准是：工具能否在目标仓库规模、操作系统和 Provider 组合下，提供可观察、可恢复且不丢失上下文的执行体验。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-11-27**

> **数据口径**：所展示 PR 的评论数均为 `undefined`、👍 均为 0，因此无法验证其真实热度排名或“评论活跃”程度。下文依据给定热门列表、相关 Issue 的讨论量及影响范围，筛选重点关注项；**所有展示 PR 均为 OPEN，不代表已合并或即将发布**。分析仅覆盖展示的 20 条 PR 和 15 条 Issue。

## 1. 热门 Skills 排行

以下是**重点关注清单，而非可验证的评论数排行榜**。其中，既有新增 Skill，也有现有 Skill 的修复。

| 关注项 | 功能与本次变化 | 社区关注焦点 | 当前状态 |
|---|---|---|---|
| **1. skill-creator：触发评估可靠性** | 创建、评估和优化 Skills；修复并发评估隔离、Windows 子进程及运行时错误处理。[PR #1298](https://github.com/anthropics/skills/pull/1298) | 相关 Issue 分别有 **13 条、6 条评论**，报告零触发率和并发误判。核心问题是“评估工具本身是否可信”。 | **OPEN** |
| **2. mcp-builder：MCP 2.x 兼容** | 辅助构建 MCP 服务；适配 `streamable_http_client` 更名及自定义 HTTP headers 配置方式。[PR #1742](https://github.com/anthropics/skills/pull/1742) | 依赖升级导致的连接兼容性，以及带认证信息的 HTTP 接入。 | **OPEN** |
| **3. webapp-testing：执行安全** | 支持 Web 应用测试；提议避免通过 `shell=True` 启动服务器命令。[PR #1980](https://github.com/anthropics/skills/pull/1980) | 用户或 Agent 生成的命令字符串可能引发命令注入，安全边界比新增测试功能更紧迫。 | **OPEN** |
| **4. docx：修订处理验证** | 处理 Word 文档；将 LibreOffice 超时报为错误，并验证输出是否仍含修订标记。[PR #1792](https://github.com/anthropics/skills/pull/1792) | 避免“脚本报告成功，文档实际未处理完成”，提升交付可信度。 | **OPEN** |
| **5. xlsx：外部链接风险检测** | 处理与重算表格；识别工作表级名称及别名间接引用的外部链接。[PR #2019](https://github.com/anthropics/skills/pull/2019) | 降低复杂公式中的漏检风险，增强表格处理的正确性。 | **OPEN** |
| **6. notion-spec-to-implementation** | 将 Notion 产品或技术规格转成实施计划、任务和验收标准；该 PR 同时包含简历审计 Skill。[PR #1245](https://github.com/anthropics/skills/pull/1245) | 打通“规格→任务→Claude Code 实现”的工作流；两个 Skill 打包提交，不宜视为单一功能。 | **OPEN** |
| **7. md2video-audio** | 将 Markdown 经幻灯片流程生成带配音的 MP4 视频。[PR #1703](https://github.com/anthropics/skills/pull/1703) | 文档内容向多媒体交付延伸；“零成本、专业级”等属于提交者描述，效果尚未由所给数据验证。 | **OPEN** |
| **8. pyxel** | 辅助 Python 复古游戏开发、调试与验证，包括无界面输入驱动运行和帧检查。[PR #525](https://github.com/anthropics/skills/pull/525) | 将代码生成与运行证据结合；3 月创建、11 月仍有更新，属于持续维护的垂直方向。 | **OPEN** |

## 2. 社区需求趋势

### ① 安全与治理：热度最高的是“能否信任 Skill”
- **命名空间与来源可信度**：社区 Skill 使用 `anthropic/` 命名空间，可能让用户误认为官方内容并授予额外权限。该议题以 **46 条评论**显著领先，指向来源标识、发布治理与权限边界的需求。[Issue #492](https://github.com/anthropics/skills/issues/492)
- **Agent 治理能力**：已有政策执行、威胁检测、信任评分和审计轨迹的 Skill 提案；Issue 已关闭，但不能据此判断功能已落地。[Issue #412](https://github.com/anthropics/skills/issues/412)

### ② 企业工作流：组织共享比手动分发更受期待
- 用户希望组织内共享 Skill 库或直接分享链接，替代下载文件、通过聊天工具转发、再逐人上传；有 **17 条评论、8 个赞**。这是分发与协作能力诉求，不是单一新 Skill。[Issue #228](https://github.com/anthropics/skills/issues/228)

### ③ 评估与质量门禁：从“能调用”转向“结果可验证”
- 零触发率和并行评估误判说明，社区急需可信的 Skill 测试与优化基础设施。[Issue #556](https://github.com/anthropics/skills/issues/556)、[Issue #1352](https://github.com/anthropics/skills/issues/1352)
- 新 Skill 方向包括“任务前校准→对抗审查→交付验证”的质量门禁，且该提案最近更新于 **11 月 25 日**。它更接近通用输出质量审查，而非仅限代码审查。[Issue #1385](https://github.com/anthropics/skills/issues/1385)

### ④ 长任务与上下文效率：减少 Skills 自身的开销
- `compact-memory` 提议用紧凑符号表示 Agent 状态，服务长时间运行任务。[Issue #1329](https://github.com/anthropics/skills/issues/1329)
- 用户同时报告重复安装造成上下文冗余，以及 `claude-api` 一次注入约 156k tokens，指向按需加载、去重和内容精简。[Issue #189](https://github.com/anthropics/skills/issues/189)、[Issue #1487](https://github.com/anthropics/skills/issues/1487)

### ⑤ 文档自动化：重点由生成转向保真与完整性
- DOCX 合并操作被报告可能丢失命名空间声明、产生无效 XML，体现用户对“不损坏原文件”的底线要求。[Issue #2018](https://github.com/anthropics/skills/issues/2018)

**趋势判断**：这份样本不足以支持“代码审查或测试生成是最热门新方向”；更明确的信号是**安全治理、评估可靠性、组织协作和上下文效率**。

## 3. 高潜力待合并 Skills

由于缺少有效 PR 评论数，以下是**值得跟踪的待合并候选**，不能认定其评论活跃或即将落地。

| 候选 PR | 入选理由 | 落地判断边界 |
|---|---|---|
| **skill-creator 评估修复** [#1298](https://github.com/anthropics/skills/pull/1298) | 对应多条高讨论度 Issue，修复价值覆盖整个 Skills 开发流程。 | 社区需求证据最强，但最后更新为 9 月 16 日，不能据此预测近期合并。 |
| **skill-creator 打包脚本修复** [#1681](https://github.com/anthropics/skills/pull/1681) | 修复直接运行 `package_skill.py` 的导入错误及过期路径说明，11 月 19 日仍有更新。 | 修复目标明确且更新较近，值得优先跟踪；仍缺少评审与 CI 信息。 |
| **skill-creator YAML 解析修复** [#1997](https://github.com/anthropics/skills/pull/1997) | 避免评估和描述优化使用失真的元数据，与触发评估可靠性直接相关。 | 技术范围相对集中，但不能仅凭摘要判断是否可合并。 |
| **webapp-testing 安全修复** [#1980](https://github.com/anthropics/skills/pull/1980) | 涉及命令注入风险，具有较高修复优先级。 | 移除 shell 执行还需兼顾现有命令链的兼容性。 |
| **Pyxel 游戏开发 Skill** [#525](https://github.com/anthropics/skills/pull/525) | 新增方向中验证流程较具体，且长期持续更新。 | 可作为垂直开发 Skill 观察项；长期 OPEN 不等于临近合并。 |

## 4. Skills 生态洞察

**当前社区最集中的诉求，不是单纯增加更多 Skills，而是让 Skills 的来源可信、调用与评估可靠、交付结果可验证，并能高效融入团队工作流。** [安全信任](https://github.com/anthropics/skills/issues/492) · [触发评估](https://github.com/anthropics/skills/issues/556) · [组织共享](https://github.com/anthropics/skills/issues/228)

---

# Claude Code 社区动态日报｜2026-11-27

> 数据范围：[anthropics/claude-code](https://github.com/anthropics/claude-code) 过去 24 小时内更新的记录：4 条 Issue、0 条 PR，无新 Release。以下判断仅基于所提供数据，不代表社区整体趋势。

## 1. 今日速览

今日反馈主要涉及 **Linux 终端快捷键行为**与 **Desktop Code 页面的项目目录选择体验**，尚未形成高热度讨论。另有一条 Windows 蓝屏报告和一条信息不足的功能请求均被标记为 `invalid`，不宜据此认定产品缺陷或明确需求；过去 24 小时无新版本发布、无 PR 更新。

## 2. 社区热点 Issues

本次仅有 4 条 Issue，全部列出，不补足至 10 条。所有条目均为 OPEN，但需结合 `duplicate`、`invalid` 标签判断其跟进价值。

### ① Linux：Ctrl+Z 导致应用挂起或退出
**[#112651](https://github.com/anthropics/claude-code/issues/112651)** · `duplicate` · `platform:linux` · `area:tui`

- **问题概况：** 用户报告，在 Linux、VTE 系终端、Claude Code `2.1.326` 环境下，按下 Ctrl+Z 会挂起或退出应用，希望忽略该按键或重新映射。
- **为什么重要：** 涉及交互中断和快捷键预期。Ctrl+Z 在常见 Unix 终端中通常用于挂起前台进程；此报告反映了终端惯例与应用交互预期之间的冲突，但现有摘要不足以确定实际是挂起还是退出。
- **社区反应：** 2 条评论、0 👍，是本批数据中唯一有评论的条目；已标记为重复问题，后续应优先追踪关联的原始 Issue。

### ② macOS Desktop：保存的预设容易被误认为当前目录提示
**[#112653](https://github.com/anthropics/claude-code/issues/112653)** · `bug` · `platform:macos` · `area:ui` · `area:desktop`

- **问题概况：** 用户在 Code 标签页新建会话、选择 Folder A 后，界面仍展示以另一项目 Folder B 命名的预设。该元素看起来像当前环境提示，点击却会切换会话目录。
- **为什么重要：** “当前目录”与“可切换预设”的视觉语义不清，可能让开发者在非预期项目目录中启动会话。值得关注目录状态展示、预设命名以及切换反馈是否足够明确。
- **社区反应：** 0 条评论、0 👍；目前是单条用户反馈，尚无广泛影响证据。

### ③ Windows 10：启动 Claude Desktop 时蓝屏的报告
**[#112654](https://github.com/anthropics/claude-code/issues/112654)** · `invalid`

- **问题概况：** 标题称启动 MSIX 版 Claude Desktop 时，可复现 `0x50` 蓝屏，涉及 `bindflt!BfMergeEnumerationContexts`。
- **为什么重要：** 蓝屏属于严重系统级症状，但此条已被标记为 `invalid`。现有信息不能确认其与 Claude Code 的关系，也不能判定根因或责任组件。
- **社区反应：** 0 条评论、0 👍；应作为待核实线索，而非已确认的 Claude Code 稳定性问题。

### ④ 信息不足的功能请求
**[#112652](https://github.com/anthropics/claude-code/issues/112652)** · `invalid`

- **问题概况：** 标题仅为 `[FEATURE]`，提供的摘要未呈现明确需求。
- **为什么重要：** 缺少具体场景、现有障碍和期望行为，无法评估功能价值，也无法归入可靠的需求趋势。
- **社区反应：** 0 条评论、0 👍；当前没有可分析的需求共识。

## 3. 重要 PR 进展

过去 24 小时内，所提供数据中 **无 PR 更新**，因此没有可列出的功能实现或修复进展，也不能据此推断上述问题已进入修复阶段。

仓库入口：[Pull Requests](https://github.com/anthropics/claude-code/pulls)

## 4. 功能需求趋势

样本较少，且唯一显式功能请求内容不足，今日更适合提炼**体验改进方向**，而非判断高频功能趋势：

| 方向 | 需求信号 | 证据与限制 |
|---|---|---|
| 终端快捷键行为可预期 | 希望 Ctrl+Z 不意外中断交互，或允许重映射 | [#112651](https://github.com/anthropics/claude-code/issues/112651)；单条重复报告 |
| 工作目录与预设状态清晰化 | 区分“当前环境提示”与“可点击切换项”，明确目录切换结果 | [#112653](https://github.com/anthropics/claude-code/issues/112653)；单条 UI 缺陷反馈 |

当前数据**不足以支持 IDE 集成、性能优化或新模型支持成为今日热点**；信息不足的 [#112652](https://github.com/anthropics/claude-code/issues/112652) 不纳入趋势判断。

## 5. 开发者关注点

- **避免交互被意外中断：** 终端控制键的处理应有明确预期，尤其需要区分“挂起”与“退出”的实际行为。参见 [#112651](https://github.com/anthropics/claude-code/issues/112651)。
- **确保会话工作目录可辨认：** 目录是代码操作的关键上下文，预设选择不应与当前状态提示混淆。参见 [#112653](https://github.com/anthropics/claude-code/issues/112653)。
- **严重故障需要先核实归属与根因：** Windows 蓝屏报告值得留意，但 `invalid` 标签和有限摘要不支持将其视为已确认缺陷。参见 [#112654](https://github.com/anthropics/claude-code/issues/112654)。
- **功能请求需要具体使用场景：** 清晰的问题陈述和预期行为，是有效分流与评估的前提。参见 [#112652](https://github.com/anthropics/claude-code/issues/112652)。

**今日结论：** 优先关注 Linux 快捷键中断与 Desktop 目录选择歧义；目前讨论量有限，尚不能将其视为社区高频需求。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-11-27**  
**数据范围：** [openai/codex](https://github.com/openai/codex) 过去 24 小时内更新的 4 条 Issue、5 条 PR。

## 今日速览

今日动态主要围绕桌面端体验与 TUI 工作流：社区反馈了浏览器插件技能未出现在会话中、Windows Markdown 预览闪烁等问题，并提出持久化任务进度面板需求。PR 涉及后台解析 worktree 分组、侧栏查看 diff、内联图片预览及状态刷新等改进；**5 条 PR 均标记为 CLOSED，但现有数据无法确认是否已合并**。过去 24 小时无新 Release。

## 社区热点 Issues

*本次仅提供 4 条 Issue，以下全部列出，不补足至 10 条。所有 Issue 均为 OPEN，互动量较低，暂不足以判断广泛社区共识。*

### 1. 浏览器插件已启用，但会话技能仍不可见
**[#64261](https://github.com/openai/codex/issues/64261)** · `bug` `app` `skills` `browser`

- **问题：** macOS 桌面端中，Browser/Chrome 插件已启用，且对应捆绑技能文件已恢复，但技能仍未出现在会话中。
- **为什么重要：** 暴露出“插件启用状态、技能文件与会话实际可用能力”之间可能存在不一致，影响浏览器能力的使用与排障。
- **社区反应：** 1 条评论、0 个 👍。报告未核实桌面应用版本，不能将插件包版本视为应用版本。

### 2. Windows Markdown 预览路径栏持续闪烁
**[#64260](https://github.com/openai/codex/issues/64260)** · `bug` `windows-os` `app`

- **问题：** Windows 桌面端从聊天链接打开本地 Markdown 文件后，预览上方的面包屑路径反复闪烁；关闭后重新打开仍可复现。
- **为什么重要：** 影响文档阅读稳定性，报告提供了具体应用版本 `26.1120.6357.0 (x64)` 和复现步骤，便于定位。
- **社区反应：** 1 条评论、0 个 👍；尚无已解决的信息。

### 3. 为长对话提供持久化、可编辑的任务进度面板
**[#64255](https://github.com/openai/codex/issues/64255)** · `enhancement` `app` `plan`

- **需求：** 在长时间运行的对话中，用持久化且可由用户编辑的面板管理多步骤任务与进度。
- **为什么重要：** 多阶段实现、调查与验证工作容易被长对话淹没；独立进度面板有助于保持任务状态可见，并支持用户修正计划。
- **社区反应：** 0 条评论、0 个 👍，目前属于待验证的产品需求。

### 4. 独立调节透明侧栏的背景着色强度
**[#64257](https://github.com/openai/codex/issues/64257)** · `enhancement` `app`

- **需求：** 开启透明侧栏后，允许独立于 Windows 背景效果调节应用叠加色的不透明度；设为 0% 时仅显示原生背景效果。
- **为什么重要：** 为侧栏外观和可读性提供更细粒度的控制，而不只是透明效果开关。
- **社区反应：** 0 条评论、0 个 👍，尚无明显讨论热度。

## 重要 PR 进展

*本次仅提供 5 条 PR，以下全部列出。均为 CLOSED；关闭不等于合并，也不代表功能已发布。评论数据未提供，不作互动量判断。*

| PR | 功能或修复内容 | 开发者价值 |
|---|---|---|
| [#64259 后台解析 Command Center 的 worktree 分组](https://github.com/openai/codex/pull/64259) | 先按会话保存的工作目录分组，将 worktree 解析放到后台，减少慢速或无响应文件系统上的 Git 查询阻塞。 | 降低 Command Center 被存储访问拖慢的风险。 |
| [#64258 在 TUI 侧栏标签页打开 `/diff`](https://github.com/openai/codex/pull/64258) | 侧栏可用时打开只读 `Diff` 标签页，否则回退至全屏查看器。 | 同时查看代码变更与对话，减少上下文切换。 |
| [#64256 关闭动画后仍更新 TUI 状态计时器](https://github.com/openai/codex/pull/64256) | 为静态状态行安排重绘，避免耗时显示停留在旧值，直到其他事件触发刷新。 | 保证禁用动画时仍能获得及时的运行状态反馈。 |
| [#64254 在 TUI 回复中内联显示本地 Markdown 图片](https://github.com/openai/codex/pull/64254) | 在受支持终端的富文本对话视图中显示图片预览，而不只是替代文本。 | 减少为查看生成图片而单独打开文件的操作。 |
| [#64253 使用工作区快捷键恢复隐藏侧栏](https://github.com/openai/codex/pull/64253) | 修正默认 `Ctrl+X`、`s` 快捷键隐藏侧栏后无法恢复原内容的问题。 | 提升键盘工作流的可预测性，保留用户查看上下文。 |

## 功能需求趋势

基于今日全部 4 条 Issue，可观察到以下方向；**样本较小，不宜据此推断长期热度排名**。

- **桌面端交互稳定性：** 插件技能不可见与 Markdown 路径栏闪烁，分别指向能力状态一致性和界面渲染稳定性。[#64261](https://github.com/openai/codex/issues/64261) · [#64260](https://github.com/openai/codex/issues/64260)
- **长任务的可视化管理：** 用户希望计划和执行进度成为可持续查看、可编辑的工作状态，而非仅保留在对话文本中。[#64255](https://github.com/openai/codex/issues/64255)
- **更细粒度的界面定制：** 透明侧栏需求体现出对背景效果与应用着色独立控制的诉求。[#64257](https://github.com/openai/codex/issues/64257)

## 开发者关注点

1. **配置成功不等于能力可用。** 插件排障需要区分应用版本、插件版本、技能文件状态及会话实际加载结果，避免仅凭“已启用”判断能力可用。[#64261](https://github.com/openai/codex/issues/64261)
2. **长任务需要持续、可靠的状态反馈。** 可编辑进度面板需求与计时器修复分别涉及任务状态管理、运行时间展示，反映出状态可见性的重要性。[#64255](https://github.com/openai/codex/issues/64255) · [#64256](https://github.com/openai/codex/pull/64256)
3. **减少工作流中的上下文切换。** 侧栏 diff、内联图片和侧栏恢复改动，都在降低离开当前对话或重新寻找内容的成本。[#64258](https://github.com/openai/codex/pull/64258) · [#64254](https://github.com/openai/codex/pull/64254) · [#64253](https://github.com/openai/codex/pull/64253)
4. **慢速外部依赖不应阻塞核心界面。** worktree 分组后台化针对文件系统与 Git 查询造成的等待，值得关注后续合并及发布状态。[#64259](https://github.com/openai/codex/pull/64259)

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-27**  
**仓库：[github/copilot-cli](https://github.com/github/copilot-cli)**

## 1. 今日速览
过去 24 小时内，未发现新版本发布或 PR 更新，仅有 1 条 Issue 更新。该 Issue 缺少有效问题描述和复现信息，暂无法据此识别明确的产品缺陷或社区需求。

## 2. 社区热点 Issues
今日数据仅包含 1 条 Issue，因此不扩展为 10 条，也不将其视为已形成社区热度的话题。

### [#5598：标题为本地 PDF 文件路径的问题报告](https://github.com/github/copilot-cli/issues/5598)
- **状态**：Open，标记为 `triage`；由 `dpseoul-hue` 于今日创建并更新。
- **内容**：标题包含本地 PDF 文件路径；问题描述、受影响版本、复现步骤、预期行为及补充信息均未填写。
- **关注价值**：目前无法判断其是否涉及文件引用、附件处理或其他 CLI 行为，需要作者补充上下文后才能开展技术排查。
- **社区反应**：0 条评论、0 个 👍，暂无可见讨论或共鸣信号。

## 3. 重要 PR 进展
过去 24 小时内，提供的数据中无 PR 更新，因此没有可报告的功能或修复进展。  
[查看仓库 PR 列表](https://github.com/github/copilot-cli/pulls)

## 4. 功能需求趋势
**样本不足，无法提炼可靠趋势。** 唯一的 [Issue #5598](https://github.com/github/copilot-cli/issues/5598) 未提出明确功能诉求，不能仅凭 PDF 路径推断社区关注文件处理、IDE 集成、性能或新模型支持。

## 5. 开发者关注点
- **问题排查信息不足**：[#5598](https://github.com/github/copilot-cli/issues/5598) 缺少版本、操作步骤、实际表现和预期结果，当前主要障碍是无法复现与定位，而非已确认的技术缺陷。
- **暂无高频痛点信号**：仅有 1 条不完整报告，且无评论或点赞，尚不足以判断开发者的共性需求。
- **后续观察重点**：关注 [#5598](https://github.com/github/copilot-cli/issues/5598) 是否补充有效上下文，以及维护者后续的分流结论。

---
*本日报仅基于所提供的过去 24 小时数据，不代表仓库全部未解决问题或长期需求趋势。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报｜2026-11-27

> 数据来源：[anomalyco/opencode](https://github.com/anomalyco/opencode)，统计范围为过去 24 小时。仅提供 7 条 Issue、8 条 PR，以下全部覆盖，不补造至 10 条；PR 的 `CLOSED` 状态不等同于已合并。

## 1. 今日速览

今日动态集中在 **v2 稳定性、Windows 路径兼容与工具执行生命周期**：两项 Windows 路径问题均已有对应修复 PR，Anthropic 延迟工具结果处理和技能静默加载失败也值得关注。共更新 7 条 Issue、8 条 PR，暂无新版本发布；PR 中 5 条开放、3 条关闭，修复是否已合并或进入可用版本仍需确认。

## 2. 社区热点 Issues

本批 Issue 均为 1 条评论、0 个 👍，尚未出现明显的互动热度分化。以下按潜在影响和处理进展排序，而非按热度排名。

| Issue | 问题与重要性 | 社区反应与进展 |
|---|---|---|
| [#66727 Anthropic 延迟托管工具结果被判定为缺失](https://github.com/anomalyco/opencode/issues/66727) | 据报告，混合客户端/服务端工具交互中，刻意延迟返回的托管调用会被提前判为失败，后续请求还会携带无效的合成结果。影响多阶段工具调用协议的正确性。 | **开放**，标记 `status/repro-simulated`；本批数据中未见对应修复 PR。 |
| [#66725 Windows 配置路径未展开 `~\`](https://github.com/anomalyco/opencode/issues/66725) | 影响 `{file:...}`、worktree、skills 和 instructions 等配置；文件变量解析失败还可能替换为空字符串，导致配置未按预期加载。 | **开放**，标记 `status/repro-plausible`；已有修复 [PR #66726](https://github.com/anomalyco/opencode/pull/66726)。 |
| [#66722 Windows 本地 references 被误识别为 Git 远程地址](https://github.com/anomalyco/opencode/issues/66722) | 盘符绝对路径、UNC 路径，以及 home 路径展开存在问题，阻碍 Windows 用户引用本地资料。 | **开放、已复现**；已有修复 [PR #66723](https://github.com/anomalyco/opencode/pull/66723)。 |
| [#66716 SKILL.md 元数据解析失败时静默跳过](https://github.com/anomalyco/opencode/issues/66716) | frontmatter 格式错误仅记录 debug 日志，默认日志级别下技能会直接“消失”。用户可能误以为指令已加载，影响行为可预测性和排障。 | **开放、已复现**；本批数据中未见对应修复 PR。 |
| [#66724 Web 提示词输入框无法用鼠标选择文本](https://github.com/anomalyco/opencode/issues/66724) | 报告将原因指向全局 `user-select: none !important` 样式，影响输入框内选中、复制、剪切等基本编辑操作。 | **开放**，涉及 Linux/Web v2；本批数据中未见复现标签或对应 PR。 |
| [#66719 Provider 请求返回 HTTP 404](https://github.com/anomalyco/opencode/issues/66719) | 请求失败直接阻断模型使用，但现有描述缺少具体 Provider、模型和请求信息，暂不能判断根因。 | **开放、分诊中**；需要补充配置与日志。 |
| [#66714 TUI 消息页脚无法显示回答完成时间](https://github.com/anomalyco/opencode/issues/66714) | 用户希望回溯每条回答的完成时刻，同时指出插件缺少可扩展页脚的插槽，反映会话可观测性和界面扩展需求。 | **已关闭**；数据未说明关闭原因，不能据此判断功能已经实现。 |

## 3. 重要 PR 进展

### 开放中的修复

- **[#66728 保留合并子代理报告中的早期终结回复](https://github.com/anomalyco/opencode/pull/66728)**  
  修复后台 shell 先完成、子代理随后结束时，短小后续回复可能覆盖此前主要报告的问题，目标是避免关键执行结果丢失。关联 #66712，当前带有 `needs:compliance` 标签。

- **[#66726 修复 Windows 配置字段的 home 路径展开](https://github.com/anomalyco/opencode/pull/66726)**  
  对应 #66725，为多处配置路径加载逻辑补充 `~\` 支持，并处理目录设置中的裸 `~`。直接改善 Windows 配置兼容性。

- **[#66723 修复 references 的 Windows 绝对路径与 home 路径解析](https://github.com/anomalyco/opencode/pull/66723)**  
  对应 #66722，调整本地路径识别，避免 Windows 盘符与 UNC 路径被当成 Git 远程引用。

- **[#66718 限制首次标题请求输入，并跳过缓存标记](https://github.com/anomalyco/opencode/pull/66718)**  
  对应 #66708，处理首条用户消息包含粘贴文件时，完整内容被带入标题生成请求的问题，旨在控制辅助请求的输入规模。

- **[#66715 将 Promise 工具权限检查限定到单次调用](https://github.com/anomalyco/opencode/pull/66715)**  
  对应 #66698，修复权限检查在插件初始化上下文执行的问题，避免无人值守调用触发的交互提示生命周期失控。

### 已关闭、合并状态未提供

- **[#66721 在共享协议路由中传递 effort 与工具更新支持信息](https://github.com/anomalyco/opencode/pull/66721)**  
  针对基于共享协议构建的路由补齐能力信息传递，减少路由层与模型能力声明不一致的问题。

- **[#66720 shell 自行退出时释放原生 PTY](https://github.com/anomalyco/opencode/pull/66720)**  
  处理用户输入 `exit` 等 shell 自行结束场景下的终端资源释放，来自对服务端内存与文件描述符使用情况的审查。

- **[#66717 从 models.dev 读取 effort 与 system update 标志](https://github.com/anomalyco/opencode/pull/66717)**  
  补充模型能力元数据读取，为请求构建与能力适配提供依据；与 #66721 所涉及的能力传递工作相关。

## 4. 功能需求趋势

基于本批全部 7 条 Issue，社区关注点以可靠性和兼容性为主，而非大规模新增功能：

1. **Windows 路径支持需要一致化**  
   两条 Issue 分别涉及配置加载和 references 解析，说明路径识别、home 展开在不同入口间存在不一致。值得关注统一路径处理逻辑及跨平台测试。  
   相关：[ #66725](https://github.com/anomalyco/opencode/issues/66725)、[#66722](https://github.com/anomalyco/opencode/issues/66722)。

2. **工具协议正确性与 Provider 可用性**  
   Anthropic 延迟结果处理涉及协议语义，HTTP 404 则反映模型访问链路的可诊断性问题；二者根因不同，不宜混为同一类故障。  
   相关：[#66727](https://github.com/anomalyco/opencode/issues/66727)、[#66719](https://github.com/anomalyco/opencode/issues/66719)。

3. **配置与技能加载的可观测性**  
   社区需要明确知道配置是否生效、技能是否加载，而不只是依赖最终模型表现反推问题。  
   相关：[#66716](https://github.com/anomalyco/opencode/issues/66716)、[#66725](https://github.com/anomalyco/opencode/issues/66725)。

4. **基础交互体验与会话信息展示**  
   Web 文本选择属于基础可用性，TUI 完成时间和页脚插槽则体现更精细的会话追踪与插件扩展需求。  
   相关：[#66724](https://github.com/anomalyco/opencode/issues/66724)、[#66714](https://github.com/anomalyco/opencode/issues/66714)。

## 5. 开发者关注点

- **优先排查“静默失效”**：技能解析失败无警告、配置变量替换为空，都可能使实际运行状态偏离用户预期。建议关注默认日志级别下的告警与加载状态反馈。  
  参考：[#66716](https://github.com/anomalyco/opencode/issues/66716)、[#66725](https://github.com/anomalyco/opencode/issues/66725)。

- **回归测试要覆盖异步边界，而非只有正常路径**：延迟工具结果、后台任务与子代理交错完成、权限提示上下文，都是本轮暴露的边界场景。  
  参考：[#66727](https://github.com/anomalyco/opencode/issues/66727)、[PR #66728](https://github.com/anomalyco/opencode/pull/66728)、[PR #66715](https://github.com/anomalyco/opencode/pull/66715)。

- **长会话和无人值守运行需要资源与请求规模控制**：PTY 释放和标题请求限长，分别关系到服务端资源生命周期与辅助请求开销。  
  参考：[PR #66720](https://github.com/anomalyco/opencode/pull/66720)、[PR #66718](https://github.com/anomalyco/opencode/pull/66718)。

**后续重点跟踪：**Windows 两项修复是否合并、Anthropic 工具协议问题是否出现修复，以及技能加载失败能否获得默认可见的告警。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-11-27

## 今日速览

过去 24 小时，提供的数据中仅有 **1 条 Issue 更新**，无新版本发布，也无 PR 更新。今日重点是 `pi-ai` 对上游 SSE 流错误的自动重试识别问题：用户报告 Pi 1.6.1 遇到特定错误后直接停止当前轮次，而非重试；该 Issue 已关闭，但现有信息不足以确认是否已修复。

> 数据说明：数据源标注为 `badlogic/pi-mono`，但唯一 Issue 的链接标识指向 `earendil-works/pi`。下文按所提供的 Issue 标识生成链接，仓库归属需进一步核实。由于样本有限，不补足 10 条 Issue 或 PR。

## 社区热点 Issues

### 1. 自动重试未覆盖上游 SSE 流失败错误
**[#12605｜pi-ai: retry classifier misses `upstream_error: upstream SSE stream failed`](https://github.com/earendil-works/pi/issues/12605)**

- **状态**：已关闭，带有 `untriaged` 标签；当天创建并更新。
- **问题描述**：用户在 Pi 1.6.1 中开启自动重试后，OpenAI 兼容服务返回：
  ```text
  Error: upstream_error: upstream SSE stream failed
  ```
  Pi 随后停止当前轮次，没有触发重试。报告指出，现有分类器已匹配 `upstream_error: Upstream request failed` 等错误，但未覆盖上述表述。
- **为什么重要**：OpenAI 兼容接口的错误文案可能存在差异。如果重试判断未覆盖某类可恢复错误，开发者即使启用了自动重试，也可能需要手动恢复任务。
- **社区反应**：目前有 **1 条评论、0 个 👍**，讨论规模较小。提供的数据未包含评论内容或关闭原因，不能据此认定修复已合入或发布。

## 重要 PR 进展

过去 24 小时内，提供的数据中**没有 PR 更新**，因此无可列出的重要 PR，也无法确认上述 Issue 是否存在对应修复。

## 功能需求趋势

今日只有一条 Issue，尚不足以判断社区整体趋势；可以提炼出的需求信号是：

- **自动重试与错误分类的健壮性**：重试逻辑需要覆盖不同服务商对上游错误、流式传输失败的不同表述，降低已开启重试却仍中断的概率。参考：[#12605](https://github.com/earendil-works/pi/issues/12605)。
- **OpenAI 兼容接口的异常处理一致性**：该案例提示，兼容性不仅涉及请求与响应格式，也涉及失败场景下能否采取符合预期的恢复行为。参考：[#12605](https://github.com/earendil-works/pi/issues/12605)。

## 开发者关注点

- **配置预期与实际行为不一致**：用户已启用自动重试，但特定上游错误仍导致轮次终止，这是本次反馈最直接的痛点。参考：[#12605](https://github.com/earendil-works/pi/issues/12605)。
- **错误文案变体带来的覆盖缺口**：现有分类器能够识别部分 `upstream_error`，却遗漏 SSE 流失败表述，值得检查同类错误的测试覆盖。参考：[#12605](https://github.com/earendil-works/pi/issues/12605)。
- **关闭状态不等于修复可用**：受影响开发者仍需核实关闭原因、对应代码变更及发布版本，再判断是否需要升级或采取临时措施。参考：[#12605](https://github.com/earendil-works/pi/issues/12605)。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：2026-11-27**  
数据来源：[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)｜统计范围：过去 24 小时

## 1. 今日速览

今日最值得关注的是 **v0.28.7 的 `qwen serve` 性能回归**：用户报告大型工作区快照会导致事件循环冻结 6–8 分钟，相关修复 PR 已提交。SDK v0.1.39 发布工作流失败也有对应修复；功能侧则新增了 Web Shell 按模型、按配置作用域设置新任务默认参数的提案。

过去 24 小时无新 Release；本次数据仅包含 **4 条 Issue 和 4 条 PR**，以下全部列出，不补足至 10 条。所有条目目前均为 **OPEN**，修复尚不能视为已合并或已发布。

## 2. 社区热点 Issues

### ① P1：大型工作区快照导致服务长时间无响应
[Issue #18489](https://github.com/QwenLM/qwen-code/issues/18489)

- **问题**：用户升级至 v0.28.7 后，长期运行、注册了 23 个工作区的 `qwen serve` 出现反复的 **6–8 分钟事件循环冻结**，连 `/health` 等路由也无法响应，同时伴随数 GB 的后台快照活动。
- **关键线索**：报告指向约 30 万文件快照上的 `regularFiles.includes` 二次复杂度检查，以及随工作区数量平方增长的 30 秒定时器开销。
- **为什么重要**：影响的不只是单次任务速度，而是守护进程整体可用性；大型仓库和多工作区部署应优先关注。
- **社区反应**：3 条评论、0 个 👍，是所给 Issue 中评论最多的一条；已有对应修复 [PR #18494](https://github.com/QwenLM/qwen-code/pull/18494)。

### ② P2：TUI 滚动后丢失待回答问题的输入状态
[Issue #18492](https://github.com/QwenLM/qwen-code/issues/18492)

- **问题**：用户在多选问题中勾选选项并输入自定义文本，向上滚动查看历史消息后返回，选中项与输入内容均被清空，但 CLI 仍在等待回答。
- **为什么重要**：破坏交互状态连续性，迫使用户重复输入，尤其影响需要回看上下文的长会话。
- **社区反应**：2 条评论、0 个 👍；标记为 P2，涉及交互与渲染，所给 PR 中尚无明确对应修复。

### ③ P2：Web Shell 新会话展示测试疑似不稳定
[Issue #18495](https://github.com/QwenLM/qwen-code/issues/18495)

- **问题**：CI Failure Patrol 标记了一项冒烟测试：从输入框创建独立会话后，应在首轮执行结束前显示该会话。
- **为什么重要**：测试覆盖新会话的即时可见性。不稳定测试会干扰 CI 信号，但若同一提交重跑仍确定性失败，则应按真实产品缺陷处理，而不是仅调整测试。
- **社区反应**：机器人创建，2 条评论、0 个 👍；带有 `status/ready-for-agent`、`autofix/approved` 标签，但现有信息不足以确认已完成重跑判定。

### ④ SDK v0.1.39 发布工作流失败
[Issue #18493](https://github.com/QwenLM/qwen-code/issues/18493)

- **问题**：自动化系统报告 SDK 发布流程失败，具体失败日志见 [Actions 运行记录](https://github.com/QwenLM/qwen-code/actions/runs/45935253272)。
- **为什么重要**：发布流水线异常可能延迟 SDK 交付，下游开发者需区分“计划发布版本”与“已可用版本”。
- **社区反应**：机器人创建，1 条评论、0 个 👍；已有针对发布认证方式的修复 [PR #18496](https://github.com/QwenLM/qwen-code/pull/18496)。

## 3. 重要 PR 进展

> 以下 4 条 PR 均处于 OPEN 状态；提供的数据未包含有效评论数，无法据此判断评审热度。

| PR | 功能或修复内容 | 技术价值与关注点 |
|---|---|---|
| [#18494：修复快照捕获阻塞守护进程](https://github.com/QwenLM/qwen-code/pull/18494) | 修复由 #18009 引入的 worktree 保留快照路径中的三处缺陷。摘要明确说明，将文件成员检查从逐项线性扫描改为 `Set` 查询，使该检查由 **O(N²) 降至 O(N)**。 | 今日优先级最高的修复。需重点验证大型快照、多工作区下的事件循环响应性，以及后台快照开销是否得到控制。 |
| [#18496：使用 CI Bot PAT 创建 SDK Release](https://github.com/QwenLM/qwen-code/pull/18496) | 将 SDK 工作流中创建 GitHub Release 和 Tag 的 `gh` 认证，从 `GITHUB_TOKEN` 改为 `CI_BOT_PAT`，与相邻发布步骤保持一致，并增加回归测试。 | 对应 SDK 发布失败；后续仍需观察合并后的工作流是否成功重跑。 |
| [#18491：收紧 Linux AppImage 冒烟检查](https://github.com/QwenLM/qwen-code/pull/18491) | 当 AppImage 打包了应由宿主系统提供的库时，让发布冒烟检查失败，补齐此前只检查依赖是否缺失的验证缺口。 | 强化桌面端发布质量门禁，防止不符合宿主库约定的镜像通过检查；不代表已有安装包完成修复。 |
| [#18490：新增分作用域的模型默认配置](https://github.com/QwenLM/qwen-code/pull/18490) | 在 Web Shell 的 Settings → Model 中，为新任务设置各模型默认参数：精确上下文窗口 token 数、模型上限展示，以及受模型支持的 thinking、effort 配置；User 与 Workspace 保留独立草稿。 | 提升多模型、多项目场景的配置可控性，减少每次创建任务时重复调整参数的成本。 |

## 4. 功能需求趋势

**样本说明：今日 4 条 Issue 均偏向缺陷或发布运维，无法据此确认长期“高频需求”。以下是当天可观察的方向。**

- **大规模工作区性能与后台服务稳定性**：快照处理的算法复杂度、后台任务开销及健康检查可用性成为最突出的风险点。[#18489](https://github.com/QwenLM/qwen-code/issues/18489)
- **长会话中的交互状态持久性**：用户需要在滚动查看历史消息时保留尚未提交的选择与文本，而非重新填写。[#18492](https://github.com/QwenLM/qwen-code/issues/18492)
- **Web Shell 会话生命周期可靠性**：新会话何时出现在列表中，以及相关测试能否稳定验证这一行为，受到关注。[#18495](https://github.com/QwenLM/qwen-code/issues/18495)
- **SDK 发布链路可靠性**：发布认证和自动化流程是当天工程保障重点，而非新的 SDK 功能需求。[#18493](https://github.com/QwenLM/qwen-code/issues/18493)

补充开发侧信号：模型参数正朝**按模型、按用户/工作区作用域配置**发展，但这来自 PR，不能直接等同于已验证的社区需求热度。[#18490](https://github.com/QwenLM/qwen-code/pull/18490)

## 5. 开发者关注点

1. **服务是否仍能响应，比任务是否变慢更关键。** 快照工作阻塞事件循环后，连健康检查也会受影响；运营多工作区守护进程的开发者应优先跟踪修复与验证结果。[#18489](https://github.com/QwenLM/qwen-code/issues/18489) · [#18494](https://github.com/QwenLM/qwen-code/pull/18494)
2. **未提交输入不应因浏览历史而丢失。** TUI 的状态保存需要与滚动、渲染行为保持一致，避免长会话中反复录入。[#18492](https://github.com/QwenLM/qwen-code/issues/18492)
3. **CI 修复必须区分随机失败与真实回归。** 对 Web Shell 冒烟测试，应先确认同提交重跑结果，再决定修产品还是修测试。[#18495](https://github.com/QwenLM/qwen-code/issues/18495)
4. **发布成功需要端到端验证。** SDK 认证方式和 AppImage 依赖检查均在补强发布保障，但当前 PR 尚未合并，仍需关注后续流水线结果。[#18496](https://github.com/QwenLM/qwen-code/pull/18496) · [#18491](https://github.com/QwenLM/qwen-code/pull/18491)

**总体判断：今日以稳定性治理为主。首要跟踪大型工作区快照修复，其次确认 SDK 发布恢复；模型默认配置则是值得持续观察的功能增量。**

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*