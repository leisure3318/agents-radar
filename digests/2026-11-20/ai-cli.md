# AI CLI 工具社区动态日报 2026-11-20

> 生成时间: 2026-11-20 04:14 UTC | 覆盖工具: 9 个

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
**2026-11-20｜基于所提供的社区动态样本**

> **口径说明：**活跃度统计采用来源给出的更新总量，分析基于实际展示条目；“今日更新”不等于“今日新建”。Issue 属于用户报告，PR 的 `CLOSED` 不代表已合并，发布说明截断也限制了版本间比较。以下定位为样本推断，不代表官方产品定位。

## 1. 生态全景

AI CLI 正从单轮代码生成工具，扩展为连接终端、桌面、IDE、移动端及常驻服务的 Agent 工作平台。能力扩张的同时，社区关注重点明显转向**长任务可靠性、运行状态可见性、上下文完整性与权限边界**，而非单纯增加模型数量。MCP、Hooks、插件和第三方模型适配成为关键基础设施，也带来了配置不一致、接口不兼容和初始化阻塞等新问题。整体呈现“功能继续扩张、工程可靠性需要同步补齐”的态势，但单日低互动样本不足以判断各产品的总体质量。

## 2. 各工具活跃度对比

| 工具 | 更新 Issues | 更新 PR | Release 情况 | 本期主要活动 |
|---|---:|---:|---|---|
| **Claude Code** | 50（展示30） | 1 | **v2.1.329** | Hooks 可观测性、跨客户端一致性、多会话管理 |
| **OpenAI Codex** | 50（展示30） | 44（展示20） | **3 个**：0.171.0 正式版及2个 Alpha | TUI workspace、模型目录、内存与线程管理 |
| **Gemini CLI** | 2 | 7 | **3 个**：稳定版、预览版、Nightly | 用量热力图、文档修复、Windows 路径 |
| **GitHub Copilot CLI** | 9 | 0 | 无新 Release | 模型配置一致性、授权提示、长会话体验 |
| **Kimi Code CLI** | 0 | 0 | 无活动记录 | 本窗口无可分析信号 |
| **OpenCode** | 42（展示30） | 50（展示20） | 无新 Release | v2 稳定性、权限、插件、Provider 适配 |
| **Pi** | 4 | 7 | 无新 Release | 终端生命周期、执行可信度、模型能力映射 |
| **Qwen Code** | 12 | 24（展示20） | 无新 Release | `qwen serve` 性能、持久状态、CI 与发布 |
| **DeepSeek TUI** | 3 | 0 | 无新 Release | 命令策略解析、tmux 执行入口、输入一致性 |

**解读：**
- **Codex 与 OpenCode** 的 Issue、PR 活动均较密集；**Qwen Code** 的 PR 活动也较突出。
- Claude Code 的反馈量高，但所给 PR 仅1条，**不能据此比较其整体研发投入**。
- Gemini CLI 的发布通道活动明显，但7条 PR 中有4条属于版本号或 Changelog 维护，不能将发布维护量直接等同于功能开发量。
- Pi、DeepSeek TUI 的条目链接与来源仓库标注不一致，相关归属仍需核实；部分工具也存在时间窗口标注差异。

## 3. 共同关注的功能方向

| 共同方向 | 涉及工具 | 具体诉求与横向判断 |
|---|---|---|
| **长任务与多 Agent 可观测性** | Claude Code、Codex、Copilot CLI、OpenCode、Qwen Code | 统一任务视图、子代理活动状态、审批阻塞提示、重启后恢复。需求从“能执行”转向“知道执行到哪里、为何暂停、如何继续”。 |
| **配置、能力声明与实际行为一致** | Claude Code、Codex、Copilot CLI、OpenCode、Pi | Desktop/CLI 的 MCP 加载差异、app-server 接口不匹配、模型切换未生效、严格工具调用能力未传递。配置可选不等于运行时生效。 |
| **上下文完整性与生命周期管理** | Claude Code、Codex、Qwen Code | Hooks 改写或输出是否进入模型、重复注入、子代理历史继承、压缩保留用户原文。上下文管理同时影响成本、正确性与数据处理边界。 |
| **权限与信任边界** | Claude Code、Codex、OpenCode、DeepSeek TUI | fork PR 自动化触发限制、账号变化后的审批策略刷新、PowerShell 审批、复杂 shell/tmux 语义识别。需核验真实执行路径，而非只检查配置。 |
| **资源效率与用量透明度** | Claude Code、Codex、Gemini CLI、OpenCode、Qwen Code | MCP Schema 开销、内存副本与缓存、Token 热力图、额度解释、逐请求用量统计及常驻服务内存观测。 |
| **终端和跨平台可靠性** | Copilot CLI、Gemini CLI、OpenCode、Pi、Qwen Code | 滚动锚定、Windows 路径与参数长度、安装隔离环境、终端恢复和长命令完整执行。基础交互仍直接决定生产可用性。 |

其中，**人工交接提示**是一个明确的跨产品痛点：Codex 的任务可能等待本地审批却未充分暴露状态，Copilot CLI 的设备登录信息则可能隐藏在折叠输出中。无人值守流程不仅需要更强自主性，也需要可靠的“等待用户”状态。

## 4. 差异化定位分析

| 工具 | 功能与技术侧重 | 更匹配的用户及关注点 |
|---|---|---|
| **Claude Code** | 跨客户端工作流、Hooks/MCP/插件扩展、多会话协调；本期强化配置来源与异常可见性 | 深度扩展及受管配置团队；重点验证客户端差异、脱敏链路和插件迁移 |
| **Codex** | Rust CLI/TUI workspace、app-server、远程任务与多代理；持续细化线程、缓存、预算和审批管理 | 需要并行 Agent 与跨设备工作的团队；重点验证版本组合、账号上下文和审批闭环 |
| **Gemini CLI** | 多发布通道、终端用量观测、策略及技能文档体系；本期以维护性改进为主 | 重视终端使用与通道选择的开发者；需区分稳定版与 Nightly 能力 |
| **Copilot CLI** | GitHub/VS Code 工作流连接、Autopilot、终端代码审阅和远程会话 | GitHub、VS Code 用户；重点关注模型配置生效与远程能力迁移 |
| **OpenCode** | 多 Provider、插件与 API 集成，覆盖桌面、终端和多客户端会话 | 需要模型选择自由及可定制工作流的团队；适配灵活性伴随更复杂的兼容矩阵 |
| **Pi** | 终端基础设施、扩展消息 API、模型能力适配与严格工具调用 | 构建自定义 Agent/扩展的开发者；本期更强调底层执行和接口语义 |
| **Qwen Code** | `qwen serve` 常驻服务、Web Shell、ACP、持久化恢复及多副本状态 | 需要服务化或自托管部署的团队；重点关注内存、历史加载和事件循环成本 |
| **DeepSeek TUI** | 命令执行策略的语义建模与 TUI 输入处理 | 关注命令解析边界的开发者；当前样本不足以判断完整产品覆盖面 |
| **Kimi Code CLI** | 本期无动态 | 无法基于该窗口判断定位变化或迭代节奏 |

**核心差异：**Claude Code、Codex 更突出跨端与任务编排；OpenCode 更突出开放集成；Qwen Code 的服务化方向最鲜明；Pi 与 DeepSeek TUI 本期则更聚焦底层正确性。

## 5. 社区热度与成熟度

### 活跃度：Codex、OpenCode 最突出，但互动深度普遍有限

- 按更新量，**Codex：50 Issues / 44 PR；OpenCode：42 Issues / 50 PR**，是本窗口工程活动最密集的两项。
- Claude Code 同样有50条更新 Issue，但可见 PR 较少，呈现出不同的活动结构。
- Qwen Code 为12条 Issue、24条 PR，表现出较强的工程推进信号；其中包含 CI、发布和自动化维护，不能全部解释为用户功能开发。
- 大多数可见 Issue 仅有 **0–3条评论**。Qwen Code 的国际化检查条目达6条评论，OpenCode 的 Beam Free 反馈为4条，但仍不足以形成广泛社区共识。

### 成熟度：应区分能力广度与运行可靠性

本期样本显示，多端、多代理、插件和服务化能力越丰富，暴露出的状态同步、资源治理和兼容问题也越复杂。**问题数量多可能来自使用面更广，不能直接推断产品更不稳定；PR 多也不代表修复已交付。**

Codex 的线程、背压、预算和策略刷新改动，Qwen Code 的延迟加载与持久状态恢复，以及 OpenCode 的存储和后台状态调整，都体现出向长期运行场景补强的方向。Pi 的终端清理与错误透传则体现了较窄范围内的工程打磨。Kimi 的单日无活动、Copilot CLI 的无 PR 更新，均不能据此判断项目停滞。

## 6. 值得关注的趋势信号

### ① CLI 正成为 Agent 的执行与控制入口
TUI workspace、任务日历诉求、远程委派、Web Shell 和持久会话共同表明，“CLI 工具”的边界正在扩大。

**开发者参考：**选型应评估终端、IDE、桌面和服务端的状态一致性，而不只比较一次性编码效果。

### ② “真实状态可验证”成为信任基础
模型选择显示与实际运行不一致、Hooks 日志成功但输入未改写、命令执行不完整却返回成功，属于不同层面的同类风险。

**开发者参考：**验收测试应覆盖实际模型、实际输入和最终产物，不能仅依赖界面提示或退出码。

### ③ 上下文开始需要明确的数据生命周期规则
压缩保留、子代理继承、历史可见性、工具结果持久化和脱敏改写，已超出简单的 Token 优化范畴。

**开发者参考：**涉及敏感数据或多 Agent 的部署，应明确“谁能接收什么、保留多久、压缩后保留什么”。

### ④ 常驻与并发运行正在改变技术门槛
Qwen Code 的事件循环阻塞与 OOM 报告、OpenCode 的 SQLite 并发写入问题、Codex 的内存释放与背压改动，指向长期运行的工程挑战。

**开发者参考：**生产评估应加入大历史、多客户端、并发会话、慢客户端和重启恢复测试，而非只做短会话体验。

### ⑤ 开放适配的竞争力取决于兼容性测试深度
多模型、多 Provider、多插件提供了选择自由，但工具调用字段、推理档位、图片输入、错误信息和缓存隔离都可能出现落差。

**开发者参考：**维护具体的“客户端版本 × Provider × 模型 × 工具能力”验证矩阵，比笼统判断“支持某模型”更有价值。

---

**决策结论：**本期最重要的选型分界，不是“谁支持更多模型”，而是**谁能在目标工作流中提供可验证的执行、可见的阻塞状态和可恢复的长任务**。建议围绕权限、上下文完整性、资源占用与恢复能力建立统一验收基线，再比较模型能力和交互效率。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-11-20**

> **数据口径：**所展示 PR 的评论数均为 `undefined`、👍 均为 0，因此无法核实其热度排名或“评论活跃”程度。以下以**相关 Issue 讨论量、同类改进集中度及最近更新时间**作为关注度代理指标，不代表真实评论榜。展示的 20 个 PR 全部为 **OPEN**，没有已合并或明确标记为 Draft 的记录。

## 1. 热门 Skills 排行

以下为基于现有证据的**关注优先级排序**，包含已有 Skill 的改进，而不只是新增 Skill。

| 排名 | Skill / 相关 PR | 功能与关注焦点 | 当前状态 |
|---|---|---|---|
| **1** | **skill-creator**：[评测隔离 #1298](https://github.com/anthropics/skills/pull/1298)、[打包修复 #1681](https://github.com/anthropics/skills/pull/1681)、[YAML 解析 #1997](https://github.com/anthropics/skills/pull/1997) | 支持 Skill 创建、评测与打包。最集中痛点是**触发率评测是否可信**：并发串扰、Windows 兼容、运行失败误判，以及元数据解析偏差。对应 Issue [#556](https://github.com/anthropics/skills/issues/556) 有 **13 条评论**、[#1352](https://github.com/anthropics/skills/issues/1352) 有 **6 条评论**。 | 均 **OPEN**；#1681 最近于 **11-19** 更新 |
| **2** | **docx**：[修订接受校验 #1792](https://github.com/anthropics/skills/pull/1792)、[孤立评论检测 #1734](https://github.com/anthropics/skills/pull/1734) | 处理 Word 文档。关注点从“生成成功”转向**输出确实有效**：超时不能报成功、修订必须真正清除、评论结构需要检查。另有 XML 损坏反馈 [#2018](https://github.com/anthropics/skills/issues/2018)，共 **4 条评论**。 | 均 **OPEN**；#1792 最近于 **11-01** 更新 |
| **3** | **webapp-testing**：[进程启动安全 #1980](https://github.com/anthropics/skills/pull/1980)、[元素识别修复 #1976](https://github.com/anthropics/skills/pull/1976) | 支持 Web 应用测试。改进集中于**执行安全与测试准确性**：避免 `shell=True` 带来的命令注入风险，并正确识别 `textarea`、`select`。这里的安全风险来自提交者描述，不能视为已确认漏洞。 | 均 **OPEN**；#1980 最近于 **11-01** 更新 |
| **4** | **mcp-builder**：[MCP 2.x 兼容 #1742](https://github.com/anthropics/skills/pull/1742) | 支持 MCP 服务开发与连接。修复客户端导入名称变化，并适配新版自定义 HTTP 请求头配置方式，体现**依赖升级与鉴权连接兼容性**需求。 | **OPEN**；最近于 **10-08** 更新 |
| **5** | **xlsx**：[外部链接风险检测 #2019](https://github.com/anthropics/skills/pull/2019) | 处理电子表格及重算。补足工作表级命名范围、别名间接引用导致的外链漏检，重点是**公式依赖与数据完整性**。 | **OPEN**；最近于 **11-03** 更新 |
| **6** | **notion-spec-to-implementation**：[新增提案 #1245](https://github.com/anthropics/skills/pull/1245) | 将产品或技术规格拆成 Notion 任务、验收标准及进度跟踪，连接**需求文档到开发执行**。同一 PR 还包含简历审计 Skill，提交范围较宽；当前没有可验证的讨论热度。 | **OPEN**；最近于 **10-15** 更新 |
| **7** | **Pyxel**：[复古游戏开发 #525](https://github.com/anthropics/skills/pull/525) | 指导 Python 复古游戏实现、调试，以及无头运行、画面检查和状态验证。亮点是把**生成代码与可验证执行**结合；从 3 月持续至 11 月仍有更新，但不能据此判断即将合并。 | **OPEN**；最近于 **11-01** 更新 |

## 2. 社区需求趋势

### ① 安全、来源可信与治理：讨论最强的信号
社区首先关心的是：**这个 Skill 来自谁，是否值得授予权限？**  
命名空间信任边界问题 [#492](https://github.com/anthropics/skills/issues/492) 有 **46 条评论、3 个赞**，是展示样本中讨论最多的 Issue。治理 Skill 提案 [#412](https://github.com/anthropics/skills/issues/412) 则提出策略执行、威胁检测、信任评分与审计轨迹，已关闭，但关闭不等于已实现或已合并。

### ② 企业级共享与分发：期待从“个人文件”走向“组织资产”
组织内共享需求 [#228](https://github.com/anthropics/skills/issues/228) 获 **17 条评论、8 个赞**，希望摆脱下载、聊天工具转发、逐人上传的流程。重复安装问题 [#189](https://github.com/anthropics/skills/issues/189) 有 **6 条评论、9 个赞**，说明共享之外，**去重、版本与分发一致性**也是关键需求。前者发生在 Claude.ai 场景，不应完全归为 Claude Code 功能诉求。

### ③ 评测与质量门禁：需要知道 Skill “是否真的有效”
触发评测问题 [#556](https://github.com/anthropics/skills/issues/556) 和并发误判问题 [#1352](https://github.com/anthropics/skills/issues/1352)，反映社区对可靠评测基础设施的需求。新的方向是贯穿任务全程的质量门禁：任务前校准、对抗审查、交付验证，见 [#1385](https://github.com/anthropics/skills/issues/1385)，**7 条评论**。这支持“质量审查”方向，但不足以认定代码审查或测试生成已经成为最热门新增类别。

### ④ 长任务记忆与上下文效率：更少占用，更稳定执行
`compact-memory` 提案 [#1329](https://github.com/anthropics/skills/issues/1329) 有 **10 条评论**，希望用紧凑符号保存 Agent 状态；`claude-api` 被报告一次加载约 156k tokens 的问题 [#1487](https://github.com/anthropics/skills/issues/1487) 有 **5 条评论**。两者共同指向**紧凑记忆、按需加载与上下文预算管理**。

### ⑤ 文档工作流：从内容生成走向交付质量
DOCX 非法 XML 问题 [#2018](https://github.com/anthropics/skills/issues/2018)，以及排版质检提案 [#514](https://github.com/anthropics/skills/pull/514)，体现对文件结构、分页、孤行和编号质量的关注。相比新增一种文档生成器，现有信号更偏向**让生成结果可用、可检查、可交付**。

## 3. 高潜力待合并 Skills

**无法从现有数据筛出“评论活跃”的 PR，也无法预测近期合并。**以下是按痛点明确性、关联反馈及最近更新选出的观察名单：

| 优先观察项 | 潜力依据 | 主要不确定性 |
|---|---|---|
| **[skill-creator 打包修复 #1681](https://github.com/anthropics/skills/pull/1681)** | 修复独立执行失败和过时路径；**11-19** 仍有更新，是所展示 PR 中更新最新的一项。 | 缺少审核、CI 与维护者反馈信息。 |
| **[skill-creator 评测隔离 #1298](https://github.com/anthropics/skills/pull/1298)** | 对应多条高讨论度评测反馈，改善评测可信度，影响整个 Skill 开发链路。 | 涉及并发、跨平台及错误分类，验证范围较大。 |
| **[DOCX 输出验证 #1792](https://github.com/anthropics/skills/pull/1792)** | 避免超时报成功和修订残留，直接改善文档交付可靠性。 | 尚无证据表明审核通过或已排入发布。 |
| **[Web 测试启动安全 #1980](https://github.com/anthropics/skills/pull/1980)** | 针对明确的命令执行风险，具有安全审查价值。 | 需要兼顾现有命令链和启动方式的兼容性。 |
| **[md2video-audio 新 Skill #1703](https://github.com/anthropics/skills/pull/1703)** | 将 Markdown 转成带配音的 MP4，具备清晰的内容生产自动化场景。 | 属于产品潜力判断；没有可验证的讨论热度或合并信号。 |

## 4. Skills 生态洞察

**当前社区最集中的诉求，不只是“更多 Skills”，而是让 Skills 成为来源可信、触发准确、评测可靠、可组织化分发且输出可验证的工作流组件。**——代表性信号见 [安全边界 #492](https://github.com/anthropics/skills/issues/492)、[组织共享 #228](https://github.com/anthropics/skills/issues/228) 与 [触发评测 #556](https://github.com/anthropics/skills/issues/556)。

---

# Claude Code 社区动态日报
**2026-11-20｜数据来源：[anthropics/claude-code](https://github.com/anthropics/claude-code)**

> **统计口径**：提供的数据包含过去 24 小时更新的 50 条 Issue 中的 30 条，以及 1 条 PR。以下分析仅基于已展示内容；Issue 均为 OPEN，用户报告不等于官方确认。

## 1. 今日速览

Claude Code 发布 **v2.1.329**，可见更新主要增强 Hooks 来源提示与加载失败告警。社区反馈集中于 **Desktop 与 CLI 行为不一致、Code Mode 的 Hooks 处理可靠性，以及多会话管理与上下文开销**。当前讨论热度有限，单条 Issue 最多 2 条评论，尚不足以判断问题的普遍性。

## 2. 版本发布

### [v2.1.329](https://github.com/anthropics/claude-code/releases/tag/v2.1.329)

已提供的更新说明包含：

- **Hooks 来源透明化**：信任对话框新增警告，说明文件夹的 Hooks 在何处声明。
- **Hooks 加载失败可见性**：在 Claude Desktop 等非交互式宿主中，受管设置中的 Hooks 加载失败时，会在对话中显示警告。
- **会话调度信息相关更新**：说明提到当前会话的计划任务、`/loop` 唤醒及目标，但原文被截断，无法确认完整功能与展示位置。

**解读**：本次可确认的重点是让 Hooks 配置与异常更容易被发现；没有足够信息证明下述社区问题已获修复。

## 3. 社区热点 Issues

以下按潜在影响与可复现性筛选，并非单纯按评论数排序。**这 10 条 Issue 的 👍 均为 0。**

| Issue | 核心问题与重要性 | 社区反应 / 当前信号 |
|---|---|---|
| [#111283：Windows Desktop 未按需加载 MCP 工具](https://github.com/anthropics/claude-code/issues/111283) | 用户报告设置 `ENABLE_TOOL_SEARCH=true` 后，CLI 延迟加载工具，但 Desktop 仍在会话启动时载入全部工具 Schema。可能增加初始上下文占用，值得大型 MCP 配置用户关注。 | **2 条评论**；带 `has repro` 标签，具备复现线索。 |
| [#111260：附件改写显示成功，模型却收到原始内容](https://github.com/anthropics/claude-code/issues/111260) | Code Mode 中，`prompt.attachment` 对 `poll_events` 附件的改写据报未实际作用于模型输入。若用于内容过滤或脱敏，日志与实际输入不一致尤其值得排查。 | **1 条评论**；带 `has repro`，涉及 macOS/Linux。 |
| [#111259：REPL 输出未触发预期的 PostToolUse](https://github.com/anthropics/claude-code/issues/111259) | 用户报告 Hooks 模块收不到 REPL 输出对应的 `classic.PostToolUse`，导致 mod 无法对脚本结果脱敏。反映 Code Mode 与既有工具处理链的兼容性风险。 | **0 条评论**；带 `has repro`，尚未形成讨论。 |
| [#111258：会话注册 JSON 损坏，运行中会话从 ListAgents 消失](https://github.com/anthropics/claude-code/issues/111258) | 报告称 `sessions/<pid>.json` 多出一个尾随 `}`，使记录无法解析，但会话仍在运行。直接影响多 Agent 的发现与协调。 | **1 条评论**；报告环境为 macOS、**v2.1.329**。 |
| [#111282：更换同名 marketplace 来源后插件被移除](https://github.com/anthropics/claude-code/issues/111282) | 在 Desktop 受管/网关配置中，更改 marketplace 来源据报会删除市场及其已安装插件，且不会恢复。企业配置迁移和插件分发应重点验证。 | **0 条评论**；目前为单条用户报告。 |
| [#111274：VS Code 对含全角空格的项目路径丢失设置](https://github.com/anthropics/claude-code/issues/111274) | Windows 扩展 **v2.1.327** 据报无法正确加载路径包含 `U+3000` 的文件夹的项目/本地设置，影响国际化路径兼容性与配置一致性。 | **0 条评论**；带 `has repro`、`regression` 标签。 |
| [#111265：项目使用量异常消耗](https://github.com/anthropics/claude-code/issues/111265) | 用户报告项目用量大幅消耗，直接涉及成本可预期性。但当前摘要缺少用量明细，无法定位原因。 | **2 条评论**；标记 `needs-info`。同作者另有相似报告 [#111266](https://github.com/anthropics/claude-code/issues/111266)，不能据此视为独立用户集中反馈。 |
| [#111269：每轮 AskUserQuestion 调用明显增加](https://github.com/anthropics/claude-code/issues/111269) | 用户称自 11 月 18 日起，Opus 5.5 每轮提问次数约增至三倍，并表示相邻客户端版本的提示未变。问题指向自主执行与交互打断之间的平衡，但归因仍待验证。 | **0 条评论**；带 `regression` 标签，尚无广泛佐证。 |
| [#111254：子会话上下文重复注入](https://github.com/anthropics/claude-code/issues/111254) | Desktop 据报重复注入“由另一会话启动”的说明，并在压缩后再次注入。可能造成冗余上下文与额外消耗，值得多会话用户检查。 | **0 条评论**；报告版本为 macOS **v2.1.325**，不能直接认定最新版仍受影响。 |
| [#111278：统一任务日历 Claude Calendar](https://github.com/anthropics/claude-code/issues/111278) | 请求统一查看计划中、运行中和已完成的 Claude 任务，体现用户对跨会话任务可见性、调度与追踪的需求。 | **1 条评论**；属于功能提案，尚无实现或采纳信息。 |

## 4. 重要 PR 进展

**本次仅提供 1 条 PR，无法据此列出 10 条；不补造其他条目。**

### [PR #111198：不在来自 fork 的 PR 上执行 `@claude` 提及](https://github.com/anthropics/claude-code/pull/111198)

- **作者**：mhegazy
- **状态**：OPEN；提供数据中的最后更新时间为 2026-11-19。
- **拟议变更**：限制来自 fork 的 Pull Request 通过 `@claude` 提及触发执行。
- **重要性**：涉及外部贡献触发自动化的信任边界，值得使用 Claude GitHub 自动化的维护者关注。
- **进展限制**：摘要不完整，评论数未提供，无法确认具体实现、评审结果或合并时间；该变更尚不能视为已生效。

## 5. 功能需求趋势

以下是已展示样本中的方向性信号，不代表全部 50 条 Issue 的完整统计。

- **多会话与任务统一管理**：从任务日历到将既有会话归入协调会话，用户希望从单会话操作转向统一编排。参见 [#111278](https://github.com/anthropics/claude-code/issues/111278)、[#111263](https://github.com/anthropics/claude-code/issues/111263)。
- **上下文与界面可控性**：希望随时手动压缩上下文，并将思考/工具日志与主要聊天分屏展示，减少信息淹没。参见 [#111255](https://github.com/anthropics/claude-code/issues/111255)、[#111257](https://github.com/anthropics/claude-code/issues/111257)。
- **跨客户端配置一致性**：Desktop、CLI、VS Code 对工具加载和项目设置的行为差异，是开发工作流中的明显摩擦点。参见 [#111283](https://github.com/anthropics/claude-code/issues/111283)、[#111274](https://github.com/anthropics/claude-code/issues/111274)。
- **扩展机制的可靠性与可观测性**：Hooks 是否执行、改写是否真正进入模型输入、插件配置迁移是否可恢复，成为扩展生态的关键诉求。参见 [#111260](https://github.com/anthropics/claude-code/issues/111260)、[#111259](https://github.com/anthropics/claude-code/issues/111259)、[#111282](https://github.com/anthropics/claude-code/issues/111282)。
- **模型选择界面简化**：有用户希望隐藏旧模型，仅展示最新系列；目前只是低互动的单条需求，不能推断为广泛共识。参见 [#111268](https://github.com/anthropics/claude-code/issues/111268)。

## 6. 开发者关注点

1. **成本是否可解释、上下文是否被浪费**  
   用量异常、MCP Schema 预加载、重复上下文注入及 `/btw` 分支重跑查询，均指向减少不必要消耗的需求；这些报告尚无证据属于同一根因。参见 [#111265](https://github.com/anthropics/claude-code/issues/111265)、[#111283](https://github.com/anthropics/claude-code/issues/111283)、[#111254](https://github.com/anthropics/claude-code/issues/111254)、[#111271](https://github.com/anthropics/claude-code/issues/111271)。

2. **扩展日志不能替代端到端验证**  
   使用 Code Mode Hooks 做脱敏或结果改写的团队，应验证模型实际接收的内容，而不只看“已应用”日志。参见 [#111260](https://github.com/anthropics/claude-code/issues/111260)、[#111259](https://github.com/anthropics/claude-code/issues/111259)。

3. **Agent 需要兼顾自主性与范围约束**  
   一方面有用户抱怨提问过多，另一方面有用户报告越界修改和不实陈述。共同诉求是明确授权范围内的可靠自主执行，而非单纯减少确认步骤。参见 [#111269](https://github.com/anthropics/claude-code/issues/111269)、[#111270](https://github.com/anthropics/claude-code/issues/111270)。

4. **连接与授权故障仍会阻断工作流**  
   Chrome 扩展授权失败、移动端 GitHub 连接循环跳转，均属于进入开发流程前的阻断点，值得与模型能力问题分开排查。参见 [#111276](https://github.com/anthropics/claude-code/issues/111276)、[#111261](https://github.com/anthropics/claude-code/issues/111261)。

**今日建议**：优先验证 Hooks 的实际处理结果、Desktop 的 MCP 加载行为，以及多会话的可发现性；对于用量异常和模型行为变化，应补充版本、复现步骤及对照数据，再判断影响范围。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-11-20｜数据来源：[openai/codex](https://github.com/openai/codex)**

> **统计口径**：所提供数据包含过去 24 小时更新的 50 条 Issue、44 条 PR，本文依据其中展示的 30 条 Issue 和 20 条 PR 分析。Issue 为用户报告，尚不能视为已确认缺陷；所列 PR 均标记为 `CLOSED`，但未提供是否合并的信息，不能据此认定已上线。PR 评论数缺失，不作热度比较。

## 1. 今日速览

Codex **0.171.0** 发布，模型目录新增 GPT-6.2 Sol、Astra，并默认启用 TUI workspace，强化文档、图片和子代理记录的并行查看能力。社区反馈主要集中在桌面端卡顿、MCP 接口兼容，以及跨设备任务派发与审批可见性；相关 PR 则着重优化内存、缓存、线程恢复和上下文管理。当前展示的 Issue 最高仅 2 条评论、均为 0 👍，因此以下重点按技术影响筛选，而非代表已形成广泛共识。

## 2. 版本发布

| 版本 | 更新摘要 | 开发者关注 |
|---|---|---|
| [**rust-v0.171.0**](https://github.com/openai/codex/releases/tag/rust-v0.171.0) | 模型目录新增 **GPT-6.2 Sol、Astra**，Sol 成为目录默认选择；默认启用 **TUI workspace**，可在主对话旁查看可搜索文档预览、图片预览和子代理记录。 | 升级后关注默认模型选择及终端交互变化。提供的发布说明已截断，不能据此概括全部更新。 |
| [rust-v0.173.0-alpha.1](https://github.com/openai/codex/releases/tag/rust-v0.173.0-alpha.1) | 发布新一轮 Alpha 构建，未提供具体变更说明。 | 适合测试验证，不宜仅凭版本号判断功能差异。 |
| [rust-v0.171.0-alpha.13.1](https://github.com/openai/codex/releases/tag/rust-v0.171.0-alpha.13.1) | 发布 Alpha 构建，未提供具体变更说明。 | 稳定性敏感场景优先评估正式版。 |

## 3. 社区热点 Issues：值得关注的 10 项

| Issue | 问题与重要性 | 社区反应 |
|---|---|---|
| [**#62666：后台 Git 操作导致桌面端严重卡顿**](https://github.com/openai/codex/issues/62666) | Linux 用户报告后台 Git 操作反复导致电脑冻结。若复现，将影响整机开发环境，而不只是单次会话。 | OPEN；1 条评论、0 👍。标题中的“Critical”为报告者表述。 |
| [**#62668：Windows 最大化窗口后整机无响应**](https://github.com/openai/codex/issues/62668) | 用户报告桌面窗口最大化或全屏一段时间后，系统严重变慢甚至失去响应。与 Linux 卡顿反馈共同提示需关注资源使用，但不能认定原因相同。 | OPEN；0 条评论、0 👍，尚待更多复现。 |
| [**#62631：macOS MCP 目录反复加载失败**](https://github.com/openai/codex/issues/62631) | 日志记录 156 次警告，明确报错为不支持 `mcpServerStatus/list`。提示桌面客户端与所选 app-server 之间可能存在接口兼容问题，影响工具发现。 | OPEN；2 条评论、0 👍，为本批评论数最高之一。 |
| [**#62663：Dot 已连接 Windows，但无法创建本机任务**](https://github.com/openai/codex/issues/62663) | 重新授权、重启后仍失败；报告称能力发现返回旧缓存，Windows 未收到创建请求。说明“连接成功”并不一定意味着原生任务派发可用。 | OPEN；2 条评论、0 👍。 |
| [**#62646：Dot 委派任务整夜等待本地审批**](https://github.com/openai/codex/issues/62646) | macOS 本地任务等待审批，但 Dot 中没有可操作状态。对无人值守工作流而言，缺少阻塞原因和处理入口会使长任务失效。 | OPEN；1 条评论、0 👍。 |
| [**#62665：Goal 模式工具输出缺少 `call_id`**](https://github.com/openai/codex/issues/62665) | 用户报告 CLI 0.169.0 / 0.170.0 发出的 `function_call_output` 缺失必要字段，导致自定义 Responses API 提供商调用失败。关系到第三方模型兼容性。 | OPEN；1 条评论、0 👍。 |
| [**#62660：SSH 远程线程返回桌面账号的云环境**](https://github.com/openai/codex/issues/62660) | 当桌面和远端使用不同账号时，`list_cloud_environments` 据报返回桌面账号环境。需优先核查身份上下文与账号边界，但目前不能据此认定发生越权。 | OPEN；0 条评论、0 👍。 |
| [**#62658：`cacheable: false` 后仍共享工具定义**](https://github.com/openai/codex/issues/62658) | 报告指出实验性工具目录缓存的退出配置未完全阻止跨连接共享。对依赖动态工具目录及连接隔离语义的集成尤其重要。 | OPEN；0 条评论、0 👍。 |
| [**#62662：Windows worktree 创建停在检出阶段**](https://github.com/openai/codex/issues/62662) | 报告将阻塞指向 `AGENTS.override.md` 扫描及 `git ls-files --ignored` 遍历 pnpm junction 链。对大型 Node.js 仓库和托管 worktree 工作流有直接影响。 | OPEN；0 条评论、0 👍。 |
| [**#62611：长任务需要事件驱动暂停与自动恢复**](https://github.com/openai/codex/issues/62611) | 希望 CI/CD、配额等待和多代理流程能智能挂起，并在条件满足后恢复，减少人工守候与无效轮询。 | OPEN；2 条评论、0 👍，是值得跟踪的长任务编排需求。 |

## 4. 重要 PR 进展：10 项技术变化

**以下均为 CLOSED，合并及发布状态未提供；内容描述的是 PR 提出的变更。**

| PR | 功能或修复内容 | 技术意义 |
|---|---|---|
| [**#62641：释放已持久化的 MCP 工具结果**](https://github.com/openai/codex/pull/62641) | 在分页线程中，确认完整结果已持久化后，释放活跃轮次内存中的副本。 | 减少重复占用，同时避免将截断预览误当成完整结果。 |
| [**#62640：跨轮次复用 Discovery V2 清单**](https://github.com/openai/codex/pull/62640) | 执行器上下文不变时复用发现缓存，避免每轮重新构建 MCP 清单。 | 降低工具发现开销，并减少同一步骤所用清单不一致的风险。 |
| [**#62609：线程恢复时对请求重放施加背压**](https://github.com/openai/codex/pull/62609) | 调整待处理服务端请求的重放方式，避免慢客户端填满出站队列或阻塞线程监听器。 | 提升大量待处理请求下的恢复可靠性。 |
| [**#62636：降低线程列表的 rollout 扫描开销**](https://github.com/openai/codex/pull/62636) | 使用缓冲读取器扫描所需元数据和预览事件，减少无关记录处理。 | 优化历史线程较多时的列表加载路径。 |
| [**#62654：拆分注入项的线程保留与子代理继承策略**](https://github.com/openai/codex/pull/62654) | 将跨上下文窗口保留与派生代理继承解耦，新增 `alwaysInThread` 等控制。 | 为多代理上下文传递提供更精细的生命周期管理。 |
| [**#62644：将继承历史可见性传入线程存储**](https://github.com/openai/codex/pull/62644) | 在建线程和 fork 流程中传递 `InheritedHistoryVisibility`，区分 `Full` 与 `ModelContextOnly`。 | 明确继承历史在存储和查询侧的可见性语义。 |
| [**#62621：分别处理各计费路径的预算决策**](https://github.com/openai/codex/pull/62621) | 将 `SamplingUsage` 传入用量核算；区分宿主级耗尽与单轮预算耗尽。 | 让全局停止新工作和返回 `SessionBudgetExceeded` 的行为更明确。 |
| [**#62614：配置或账号变化时刷新 Guardian 策略**](https://github.com/openai/codex/pull/62614) | 在重载配置、登录或退出后更新运行中线程的审批要求与 Guardian 策略。 | 降低长会话继续使用旧安全配置的风险。 |
| [**#62627：后台重试 Guardian 模型发现**](https://github.com/openai/codex/pull/62627) | 对目录获取失败后缺少分类器的情况，在后台重试发现。 | 改善恢复能力，避免在工具派发时同步等待目录请求。 |
| [**#62648：修复 macOS 安装器旧版本清理**](https://github.com/openai/codex/pull/62648) | 显式使用系统 `stat`，避免 PATH 中 GNU `stat` 对 `-f` 的不同解释破坏设备检查。 | 修复安装 GNU coreutils 的 macOS 开发环境中的安装器兼容问题。 |

## 5. 功能需求趋势

以下方向由可见 Issue 归纳，**不是全部 50 条 Issue 的定量排名**。

- **长任务需要“可暂停、可恢复、可解释”**  
  从事件驱动恢复到 Dot 审批阻塞，诉求不只是运行更久，而是明确何时暂停、为何暂停、如何继续。  
  相关：[自动暂停与恢复 #62611](https://github.com/openai/codex/issues/62611)、[审批状态 #62646](https://github.com/openai/codex/issues/62646)。

- **多代理可观测性向 CLI 延伸**  
  用户希望直接在 `/subagents` 选择器中看到各代理活动状态，减少切换和猜测。正式版已增强子代理记录展示，但记录可见不等于实时状态可见。  
  相关：[/subagents 状态 #62623](https://github.com/openai/codex/issues/62623)。

- **TUI 编辑体验继续向日常编辑器靠拢**  
  鼠标定位光标、拖选及删除等基础交互成为明确需求，反映 CLI 已被用于高频、长时间提示词编辑。  
  相关：[鼠标编辑支持 #62606](https://github.com/openai/codex/issues/62606)。

- **执行前可行性判断与可信结果汇报**  
  用户希望代理先识别不可完成的约束，减少无效编码、Token 消耗和误导性成功汇报。  
  相关：[执行前可行性评估 #62645](https://github.com/openai/codex/issues/62645)。

- **工具与自定义提供商需要稳定契约**  
  MCP 方法不匹配、状态轮询超时后停止，以及工具调用字段缺失，表明集成稳定性与新功能同样重要。  
  相关：[MCP 目录 #62631](https://github.com/openai/codex/issues/62631)、[状态轮询 #62629](https://github.com/openai/codex/issues/62629)、[Responses API 兼容 #62665](https://github.com/openai/codex/issues/62665)。

## 6. 开发者关注点

1. **性能故障的影响范围可能超出应用本身。**  
   当前报告覆盖后台 Git、全屏窗口和 worktree 创建等不同路径。排查时应分别记录资源占用、仓库规模、触发步骤，不能将所有冻结归为同一缺陷。  
   链接：[#62666](https://github.com/openai/codex/issues/62666)、[#62668](https://github.com/openai/codex/issues/62668)、[#62662](https://github.com/openai/codex/issues/62662)。

2. **桌面端、CLI 与 app-server 的版本组合值得重点记录。**  
   桌面端存在模型加载停滞和明确的接口不支持报告。提交问题时附带桌面版本、内置 CLI 版本与实际 app-server 配置，有助于缩小兼容性排查范围。  
   链接：[#62622](https://github.com/openai/codex/issues/62622)、[#62631](https://github.com/openai/codex/issues/62631)。

3. **无人值守流程缺少清晰的阻塞反馈。**  
   连接、任务派发、本地审批是不同阶段；开发者需要端到端状态，而不只是“设备已连接”。  
   链接：[#62663](https://github.com/openai/codex/issues/62663)、[#62646](https://github.com/openai/codex/issues/62646)。

4. **多账号和跨连接缓存需要明确隔离边界。**  
   SSH 远端账号选择、工具目录共享及缓存退出语义都值得集成方验证；目前没有足够信息将相关报告定性为安全漏洞。  
   链接：[#62660](https://github.com/openai/codex/issues/62660)、[#62658](https://github.com/openai/codex/issues/62658)。

5. **安装更新不应破坏正在运行的开发任务。**  
   Windows 用户报告 MSIX 更新打断构建，以及 CLI 缺少可选平台依赖。关键任务期间应谨慎安排客户端更新，并保留版本与安装日志。  
   链接：[#62605](https://github.com/openai/codex/issues/62605)、[#62634](https://github.com/openai/codex/issues/62634)。

**今日判断：** 产品侧继续扩展模型与终端工作区能力；从本批社区样本看，开发者更迫切需要的是稳定的本地执行、可观测的长任务，以及可预测的工具和身份上下文。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报｜2026-11-20

> 数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)。本期提供 3 个 Release、2 条 Issue、7 条 PR；以下按实际数量整理，不补造“10 条”榜单。发布说明存在截断，PR 的 CLOSED 状态不等同于已合并。

## 1. 今日速览

Gemini CLI 同时更新稳定版、预览版和 Nightly 发布通道；已提供的 Nightly 说明中，值得关注的是 **`/stats heatmap` 每日 Token 用量热力图**和模板替换时保留字面量 `$` 的修复。[查看版本](https://github.com/google-gemini/gemini-cli/releases)

社区反馈主要集中在文档链接失效，两条 Issue 均已有对应修复 PR；另有 Windows `~\...` 用户目录路径展开修复待审，涉及策略路径、扩展注册表和包含目录的正确解析。[文档修复](https://github.com/google-gemini/gemini-cli/pull/30375) · [Windows 路径修复](https://github.com/google-gemini/gemini-cli/pull/30376)

## 2. 版本发布

| 版本 | 已知更新与关注点 |
|---|---|
| [v0.71.0-nightly.20261120.gd4cb1713f](https://github.com/google-gemini/gemini-cli/releases/tag/v0.71.0-nightly.20261120.gd4cb1713f) | 新增 **`/stats heatmap`**，用于查看每日 Token 用量；修复模板占位符替换过程中，字面量 `$` 未被正确保留的问题，后者关联 [PR #30136](https://github.com/google-gemini/gemini-cli/pull/30136)。 |
| [v0.71.0-preview.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.71.0-preview.0) | 预览版已发布。提供的说明主要展示历史 Changelog 与版本号更新，无法据此确认完整功能差异。 |
| [v0.70.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.70.0) | 稳定版已发布。当前摘要主要包含发布维护记录，具体功能及修复清单需查看完整 Release。 |

**升级提示：**不要直接将 Nightly 中列出的功能视为已进入 v0.70.0 稳定版或 v0.71.0 预览版；当前数据不足以确认其跨版本归属。

## 3. 社区热点 Issues

本期仅有 **2 条 Issue**，均为 OPEN、`status/need-triage`，各有 1 条评论、0 个 👍。现有互动量较低，尚不能视为大规模社区热点。

### ① [#30374：文档中多处内部链接失效](https://github.com/google-gemini/gemini-cli/issues/30374)

- **问题：**部分链接缺少 `.md` 扩展名、使用 `/docs/...` 绝对路径，或仍指向标题改名之前的旧锚点，涉及 Hooks、Subagents、Policy Engine、Plan Mode 等文档。
- **为什么重要：**跨文档导航失效会增加功能学习和配置排障成本，尤其影响需要连续查阅多个参考页面的开发者。
- **社区反应：**1 条评论、0 个 👍；已有对应 [PR #30375](https://github.com/google-gemini/gemini-cli/pull/30375)，问题已进入修复流程，但尚未关闭。

### ② [#30371：Auto Memory 指向技能发现优先级的锚点不存在](https://github.com/google-gemini/gemini-cli/issues/30371)

- **问题：**Auto Memory 指南引用 `skills.md#skill-discovery-tiers`，但实际章节锚点为 `#discovery-tiers`。
- **为什么重要：**该链接用于解释技能发现的层级与优先关系，失效会阻断相关机制的查阅。
- **社区反应：**1 条评论、0 个 👍；已有小范围修复 [PR #30372](https://github.com/google-gemini/gemini-cli/pull/30372)，仍待审查。

## 4. 重要 PR 进展

本期共 **7 条 PR：6 条 OPEN、1 条 CLOSED**。未提供有效评论数量，不据此判断讨论热度。

| PR | 状态 | 内容与意义 |
|---|---|---|
| [#30376：修复 Windows `~\...` 路径展开](https://github.com/google-gemini/gemini-cli/pull/30376) | OPEN | 让 `resolvePath()` 支持以波浪号和反斜杠表示的用户目录路径，避免 Windows 下保留字面量 `~`，影响策略路径、扩展注册表和包含目录解析。**本期最值得关注的运行行为修复。** |
| [#30375：修复文档内部链接](https://github.com/google-gemini/gemini-cli/pull/30375) | OPEN | 修正缺失 `.md`、绝对路径及过期锚点；仅修改链接目标，不修改正文。标记为 `priority/p1`，对应 Issue #30374。 |
| [#30372：修复 Auto Memory 技能发现章节锚点](https://github.com/google-gemini/gemini-cli/pull/30372) | OPEN | 将失效的 `#skill-discovery-tiers` 指向实际存在的 `#discovery-tiers`，对应 Issue #30371。 |
| [#30382：更新当日 Nightly 版本号](https://github.com/google-gemini/gemini-cli/pull/30382) | OPEN | 自动更新至 `0.71.0-nightly.20261120.gd4cb1713f`，属于发布维护，不代表新增功能。 |
| [#30379：准备下一轮 Nightly 版本](https://github.com/google-gemini/gemini-cli/pull/30379) | OPEN | 自动更新至 `0.72.0-nightly.20261119.g808199f5c`。这是待处理的版本号 PR，不能据此认定 v0.72.0 已发布。 |
| [#30378：生成 v0.71.0-preview.0 更新日志](https://github.com/google-gemini/gemini-cli/pull/30378) | OPEN | 机器人生成预览版 Changelog，等待维护者审查。 |
| [#30380：生成 v0.70.0 更新日志](https://github.com/google-gemini/gemini-cli/pull/30380) | CLOSED | 稳定版 Changelog 维护。数据仅显示关闭，未提供是否合并的信息。 |

## 5. 功能需求趋势

**从本期全部 Issue 看，明确的共同方向是文档可用性，而非新增功能诉求。**样本只有两条，不宜外推为整个社区的长期需求排名。

- **文档导航与信息一致性：**两条 Issue 都涉及链接目标和实际文档结构不同步，反映章节重命名、路径调整后的链接维护需求。[#30374](https://github.com/google-gemini/gemini-cli/issues/30374) · [#30371](https://github.com/google-gemini/gemini-cli/issues/30371)
- **复杂功能的可发现性：**反馈涉及 Auto Memory、Skills、Hooks、Subagents 和 Policy Engine，说明这些机制的使用体验也依赖可靠的参考文档串联。[#30374](https://github.com/google-gemini/gemini-cli/issues/30374)

作为补充，Release 和 PR 还体现出 **Token 用量可视化**与 **Windows 兼容性**两个开发方向，但它们不是本期 Issue 样本证明的高频需求。[Nightly 发布](https://github.com/google-gemini/gemini-cli/releases/tag/v0.71.0-nightly.20261120.gd4cb1713f) · [#30376](https://github.com/google-gemini/gemini-cli/pull/30376)

## 6. 开发者关注点

- **文档“找得到但跳不过去”。**失效链接横跨多个功能页面，建议维护流程增加相对路径和 Markdown 锚点检查，降低文档重构后的回归风险。[#30375](https://github.com/google-gemini/gemini-cli/pull/30375)
- **跨平台路径语义需要一致。**Windows 用户使用原生 `~\...` 写法时，路径未展开可能影响多类配置；相关用户应关注修复合并与后续版本收录情况。[#30376](https://github.com/google-gemini/gemini-cli/pull/30376)
- **特殊字符处理影响模板可靠性。**Nightly 的 `$` 保留修复值得依赖模板占位符替换的开发者验证，重点检查替换结果是否保持原始字面内容。[#30136](https://github.com/google-gemini/gemini-cli/pull/30136)
- **用量观测正在细化。**新增每日 Token 热力图，为观察使用频率和用量分布提供入口；当前摘要未说明统计口径、历史范围或导出能力。[Nightly 发布](https://github.com/google-gemini/gemini-cli/releases/tag/v0.71.0-nightly.20261120.gd4cb1713f)

**今日判断：**本期以发布维护和使用体验修补为主。优先跟踪 Windows 路径修复与两项文档修复是否合并；需要试用用量热力图的开发者，则应关注 Nightly 通道。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-20**  
**仓库：[github/copilot-cli](https://github.com/github/copilot-cli)**

## 1. 今日速览

今日提供的数据中无新 Release、无 PR 更新，社区反馈主要集中在**模型配置生效一致性、长会话交互体验，以及自动化流程中的人工介入提示**。远程控制能力变化与 Gemini 推理配置兼容性也值得关注，但当前讨论量较低：9 条 Issue 均处于 `OPEN / triage`，暂无评论，仅一条获得 1 个 👍。

> **数据口径：**来源共提供 9 条 Issue，以下全部纳入，不补足至 10 条。其中 4 条标注的更新时间为 11 月 19 日；因缺少具体时间和时区，按来源给定的“过去 24 小时”列表收录。下述问题均为用户报告，尚不能视为已确认缺陷。

## 2. 社区热点 Issues

### 1. 模型与上下文窗口切换未可靠生效
[Issue #5535](https://github.com/github/copilot-cli/issues/5535)

- **反馈：**在 VS Code agent host 的 harness 模式长会话中，显式切换模型可能被静默忽略；用户称客户端显示另一模型时，会话仍在 `auto` 状态停留约 12 分钟。
- **为何重要：**界面选择与实际执行状态不一致，会削弱开发者对模型能力、上下文容量及运行结果的可预期性，尤其影响 IDE 集成场景。
- **社区反应：**0 评论、0 👍，待分诊。

### 2. 设备登录指令被折叠，Autopilot 流程停滞
[Issue #5530](https://github.com/github/copilot-cli/issues/5530)

- **反馈：**Agent 调用需要设备授权登录的 CLI 时，登录链接和验证码被放在折叠输出块中，用户未察觉需要操作，流程持续等待。
- **为何重要：**自动执行流程中的人工授权是关键交接点；提示不可见，会让正常等待看起来像任务卡死。
- **社区反应：**0 评论、0 👍；与 #5529 反映同类痛点，且由同一作者提交，不宜视为多个独立用户的共识。

### 3. 请求将“需要用户操作”提示提升到折叠输出之外
[Issue #5529](https://github.com/github/copilot-cli/issues/5529)

- **诉求：**设备登录等必须由用户完成的操作，应在折叠的工具输出块之外明确展示。
- **为何重要：**该需求不局限于登录，可作为长任务中“等待用户介入”的通用交互机制，减少授权超时与无效等待。
- **社区反应：**0 评论、0 👍，尚无实现方案讨论。

### 4. 远程会话在 Mobile/Web 端变为只读
[Issue #5528](https://github.com/github/copilot-cli/issues/5528)

- **反馈：**用户称自 1.0.110 移除旧版 remote steering、远程连接要求 AHP 环境后，通过 `/remote on` 共享的会话仍可见，但无法在 GitHub Mobile 或网页端继续操控。
- **为何重要：**可能影响既有跨设备工作流，需要关注新环境要求、迁移路径以及用户预期是否清晰。
- **社区反应：**0 评论、0 👍；当前资料无法判断这是缺陷、环境限制还是预期行为。

### 5. Gemini 模型的 `xhigh` 推理档位未暴露
[Issue #5527](https://github.com/github/copilot-cli/issues/5527)

- **反馈：**报告者称 CAPI 已声明 Gemini 4 Hydrogen / Neon 支持 `xhigh`，但运行时从 `supportedReasoningEfforts` 中移除了该档位。
- **为何重要：**若属实，说明上游能力声明与 CLI 可用配置存在落差，影响开发者选择推理强度。
- **社区反应：**0 评论、1 👍，是本批数据中唯一获得点赞的 Issue，但不足以据此认定为广泛共识。

### 6. 回看历史时，时间线被新输出向前推移
[Issue #5533](https://github.com/github/copilot-cli/issues/5533)

- **反馈：**向上滚动阅读历史消息或通过 `Ctrl+T` 查看推理时，新输出会使时间线跳转，丢失阅读位置；报告称 Linux、Windows 终端均可遇到。
- **为何重要：**长会话需要同时支持后台持续执行与前台历史审阅，滚动位置不稳定会直接打断排查和代码审阅。
- **社区反应：**0 评论、0 👍，待确认复现范围。

### 7. Gemini 的 `showReasoning` 设置未按预期生效
[Issue #5532](https://github.com/github/copilot-cli/issues/5532)

- **反馈：**设置 `showReasoning: true` 后，Gemini 的思考块仍默认折叠，需要逐次点击或使用 `Ctrl+T` 展开。
- **为何重要：**反映不同模型之间的展示配置一致性问题，增加切换模型后的操作成本。
- **社区反应：**0 评论、0 👍，待分诊。

### 8. 希望思考结束后自动折叠推理块
[Issue #5531](https://github.com/github/copilot-cli/issues/5531)

- **诉求：**启用推理展示时，每个 “Thought for…” 块在结束后自动折叠，避免历史推理占满屏幕。
- **为何重要：**与 #5532 并不矛盾：用户既需要即时查看推理，也希望完成后收起，说明可配置的展示生命周期比简单开关更有价值。
- **社区反应：**0 评论、0 👍，尚无方案讨论。

### 9. `/diff` 希望支持多行评论
[Issue #5534](https://github.com/github/copilot-cli/issues/5534)

- **诉求：**除现有单行评论键 `c` 外，希望通过 `C` 或 `V` 等方式选择多行，并将评论纳入提交。
- **为何重要：**多行评论更适合针对代码块提供反馈，可减少逐行标注及绕行操作。
- **社区反应：**0 评论、0 👍，属于审阅体验增强需求。

## 3. 重要 PR 进展

提供的数据中，过去 24 小时内更新的 PR 为 **0 条**，因此不列出或推测相关实现进展。当前也没有足够信息将上述 Issue 关联到具体修复。

[查看仓库 Pull Requests](https://github.com/github/copilot-cli/pulls)

## 4. 功能需求趋势

| 方向 | 本批反馈体现的趋势 | 相关 Issues |
|---|---|---|
| **模型配置一致性** | 模型选择、上下文窗口及推理档位，需要在界面、会话运行时和上游能力声明之间保持一致 | [#5535](https://github.com/github/copilot-cli/issues/5535)、[#5527](https://github.com/github/copilot-cli/issues/5527) |
| **长会话信息管理** | 稳定滚动位置、可靠展开推理、完成后自动折叠，成为持续运行场景中的体验诉求 | [#5533](https://github.com/github/copilot-cli/issues/5533)、[#5532](https://github.com/github/copilot-cli/issues/5532)、[#5531](https://github.com/github/copilot-cli/issues/5531) |
| **自动化中的人工交接** | 需要用户授权时，应以显式状态和提示打断“静默等待” | [#5530](https://github.com/github/copilot-cli/issues/5530)、[#5529](https://github.com/github/copilot-cli/issues/5529) |
| **远程工作流连续性** | 远程架构变化需要兼顾移动端、网页端操控及迁移说明 | [#5528](https://github.com/github/copilot-cli/issues/5528) |
| **终端内代码审阅** | `/diff` 需要更细致的选择与评论能力 | [#5534](https://github.com/github/copilot-cli/issues/5534) |

## 5. 开发者关注点

- **“我选的配置是否真的生效？”** 建议优先关注会话实际模型状态与客户端显示的一致性，以及推理档位的能力映射。[#5535](https://github.com/github/copilot-cli/issues/5535)、[#5527](https://github.com/github/copilot-cli/issues/5527)
- **“任务在执行，还是在等我？”** 必要操作不应隐藏在折叠输出中；显式等待状态和授权入口比增加输出量更关键。[#5530](https://github.com/github/copilot-cli/issues/5530)、[#5529](https://github.com/github/copilot-cli/issues/5529)
- **“能否不中断地回看长会话？”** 滚动锚定与推理块折叠策略共同影响阅读效率，应避免新输出抢占用户视角。[#5533](https://github.com/github/copilot-cli/issues/5533)、[#5531](https://github.com/github/copilot-cli/issues/5531)
- **“升级后原有流程还能否使用？”** 远程控制行为变化需要清晰说明支持范围、环境要求与迁移方式。[#5528](https://github.com/github/copilot-cli/issues/5528)

**总体判断：**本批反馈的主线并非新增能力数量，而是让已有能力更可靠、更可见、更可控。由于评论和点赞样本有限，这些应视为值得验证的产品信号，而非已形成广泛共识的社区优先级。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报｜2026-11-20

> 数据来源：[anomalyco/opencode](https://github.com/anomalyco/opencode)。本次数据包含过去 24 小时更新的 42 条 Issues、50 条 PR，以下分析基于展示的 30 条 Issues 和 20 条 PR；部分条目的更新时间与统计窗口存在出入，以所给记录为准。PR 的 `CLOSED` 不等于已合并，本文不将其视为已发布。

## 一、今日速览

今日无新版本发布，社区讨论主要集中在 **v2 稳定性、模型服务可用性与后台任务状态展示**。Windows 权限提示、插件认证阻塞，以及 SQLite 并发写入等问题值得开发者重点关注；与此同时，安装兼容性、权限文档和后台任务指示已有相关 PR 推进。

功能需求方面，社区希望 OpenCode 从单次工具调用走向更完整的开发工作流，包括交互式终端、独立模型配置，以及更便捷的会话检索。

## 二、社区热点 Issues

> 展示样本中，单条 Issue 评论数为 1–4，点赞均为 0，暂未形成高热度共识。以下综合影响范围、风险与工作流价值选取，而非仅按评论数排序。

| Issue | 核心问题与重要性 | 社区反应及进展 |
|---|---|---|
| **[ #65027：Beam Free 能力反馈](https://github.com/anomalyco/opencode/issues/65027)** | 用户认为模型处理简单任务需要反复尝试，并反馈不支持图片输入。反映免费层的能力预期与实际体验存在落差。 | **4 条评论，OPEN**，为展示样本中讨论最多的 Issue；仍属用户体验反馈，不能据此推断模型整体表现。 |
| **[ #65008：Windows PowerShell 未出现权限确认](https://github.com/anomalyco/opencode/issues/65008)** | 用户报告在配置通用 shell `ask` 规则后，执行 PowerShell 脚本仍未弹出审批。涉及代理执行命令的权限边界，应优先核查。 | **3 条评论，OPEN**，带有 `triaging`、`pending close` 标签；尚不能视为已确认漏洞或已解决。 |
| **[ #65044：snap curl 导致安装失败](https://github.com/anomalyco/opencode/issues/65044)** | 受限 curl 无法访问宿主 shell 创建的 `/tmp` 暂存目录，错误信息却指向磁盘空间，增加 Linux 安装排障成本。 | **3 条评论，OPEN**，标记为 `status/repro-simulated`；已有对应修复 PR #65051。 |
| **[ #64967：Gemini 经 OpenRouter 输出大量闭合括号](https://github.com/anomalyco/opencode/issues/64967)** | 用户报告回答末尾及工具调用前出现连续 `}`，不仅污染输出，还可能破坏工具调用。 | **3 条评论，OPEN**；涉及特定 provider/model 组合，尚不能归因于模型或适配层中的某一方。 |
| **[ #65015：私有 Git 插件认证阻塞模型加载](https://github.com/anomalyco/opencode/issues/65015)** | 后台安装私有仓库插件时等待凭据输入，导致插件激活无法完成，模型和 provider 接口返回 503。单个插件问题可能阻断整个使用入口。 | **2 条评论，OPEN**，标记为 `status/repro-simulated`，体现插件初始化与核心可用性的耦合风险。 |
| **[ #65017：增加可持续交互的 PTY 工具](https://github.com/anomalyco/opencode/issues/65017)** | 希望代理跨多步操作 Python/Node REPL、调试器、数据库 CLI 等，而不局限于一次性 shell 命令。对复杂调试工作流价值较高。 | **2 条评论，OPEN**；当前为功能提案，未提供对应实现进展。 |
| **[ #65029：未使用却提示免费额度耗尽](https://github.com/anomalyco/opencode/issues/65029)** | 用户称过去 24 小时未使用，仍被提示当天免费消息用尽。额度状态不透明会直接影响服务信任。 | **1 条评论，CLOSED**；另有同类报告 [#65040](https://github.com/anomalyco/opencode/issues/65040)（2 条评论，CLOSED）。关闭原因和解决结果未提供。 |
| **[ #65057：子代理运行时主会话显示空闲](https://github.com/anomalyco/opencode/issues/65057)** | 桌面端可能在子代理仍运行时停止显示进度，用户难以区分任务完成、等待与卡住。 | **1 条评论，OPEN**；PR #65059 涉及相近的后台工作状态展示，但未明确关联该 Issue。 |
| **[ #65020：并发运行触发 SQLite 写入失败](https://github.com/anomalyco/opencode/issues/65020)** | 多个 `opencode run` 共享数据库时，用户报告会话中途失败，并指出 `SQLITE_BUSY` 未重试、错误缺少代码。对批量自动化场景影响较大。 | **1 条评论，OPEN**；目前提供的是用户报告，尚无已展示的对应修复 PR。 |
| **[ #64999：默认权限文档与实际策略矛盾](https://github.com/anomalyco/opencode/issues/64999)** | 文档同时描述“无匹配规则则询问”和默认通配 `allow`，容易使开发者误判默认安全边界。 | **1 条评论，OPEN**，标记为 `status/repro-simulated`；已有文档 PR #65042 澄清规则。 |

## 三、重要 PR 进展

> PR 评论数在源数据中为 `undefined`，因此不据此判断讨论热度；以下状态均为数据快照状态。

| PR | 状态 | 功能或修复内容 |
|---|---|---|
| **[ #65059：后台工作期间保持加载指示](https://github.com/anomalyco/opencode/pull/65059)** | OPEN | 调整侧栏和标签页 spinner 的判断，避免仅依据会话 `running` 状态而过早停止，改善后台工作可见性。 |
| **[ #65051：curl 无法访问 `/tmp` 时重试下载](https://github.com/anomalyco/opencode/pull/65051)** | OPEN | 针对受限 snap curl 的暂存目录可见性问题增加重试逻辑，对应 Issue #65044。 |
| **[ #65052：跟踪 Git 分支的插件自动更新](https://github.com/anomalyco/opencode/pull/65052)** | OPEN | 让从 Git 分支安装的插件也能自动更新，减少开发版或私有插件的手动维护。 |
| **[ #65056：修正插件更新检查周期](https://github.com/anomalyco/opencode/pull/65056)** | CLOSED | 修正预期每 24 小时检查、实际约每 48 小时才检查的问题；是否合并需进一步核实。 |
| **[ #65042：澄清默认权限规则](https://github.com/anomalyco/opencode/pull/65042)** | OPEN | 解释默认继承的通配 `allow`、后匹配规则的覆盖关系，以及 `ask` 仅在无规则匹配时作为回退。 |
| **[ #65054：说明 API 如何执行斜杠命令](https://github.com/anomalyco/opencode/pull/65054)** | OPEN | 明确 `session.prompt` 将斜杠命令视为普通文本，执行命令应使用 `session.command`，对应 Issue #64995。 |
| **[ #65043：增强 provider 流中断诊断](https://github.com/anomalyco/opencode/pull/65043)** | OPEN | 补充流式生成中断位置的记录，改善只有底层 socket 错误、难以定位问题的情况。 |
| **[ #65039：默认按 `session_part` 行存储助手内容](https://github.com/anomalyco/opencode/pull/65039)** | CLOSED | 提议默认启用 `experimental.part_rows`，将流式助手内容分段写入独立行，属于会话持久化路径的重要调整。 |
| **[ #65035：增加 Claude Agent 用量控制](https://github.com/anomalyco/opencode/pull/65035)** | CLOSED | 允许 `configDir` 配置多个 Claude 配置目录，并在某账户达到用量上限后切换至下一账户。 |
| **[ #65037：Google Interactions 支持 Office 文档](https://github.com/anomalyco/opencode/pull/65037)** | CLOSED | 调整 `packages/ai` 的文档输入适配，支持相关 Office/OpenDocument MIME 类型，拓展文档处理场景。 |

## 四、功能需求趋势

### 1. 从一次性命令转向持续交互与可观测工具链
社区希望代理能直接操作 REPL、调试器及交互式 CLI，同时要求 shell 输出暴露结构化截断统计和输出文件路径。关注点正从“能否执行”转向“能否持续操作、准确读取结果”。  
相关：[交互式 PTY #65017](https://github.com/anomalyco/opencode/issues/65017)、[shell 输出元数据 #65018](https://github.com/anomalyco/opencode/issues/65018)。

### 2. 更细粒度的模型选择与能力适配
需求不仅是新增模型，还包括让不同任务使用不同模型，以及使已具备资格的账户正确显示可用选项。这体现了社区对成本、速度与能力分层配置的需求。  
相关：[/btw 独立模型 #65060](https://github.com/anomalyco/opencode/issues/65060)、[GPT-6.2 Ultrafast 可见性 #64968](https://github.com/anomalyco/opencode/issues/64968)、[Claude 内置 WebSearch #64996](https://github.com/anomalyco/opencode/issues/64996)。

### 3. 提升会话检索与多客户端协同体验
会话 ID 检索、跨客户端同步 `/btw` 状态，说明用户开始在多个终端、日志与 API 之间切换，需要更可靠的会话定位和共享状态。  
相关：[按 ID 查找会话 #65023](https://github.com/anomalyco/opencode/issues/65023)、[/btw 多端同步 #65010](https://github.com/anomalyco/opencode/issues/65010)。

### 4. 减少上下文准备中的操作摩擦
图片粘贴后直接裁剪或标注、文件提及搜索时优先展示目录，都是让开发者更快提供准确上下文的需求。  
相关：[图片附件编辑 #65005](https://github.com/anomalyco/opencode/issues/65005)、[目录排序优化 #64992](https://github.com/anomalyco/opencode/issues/64992)。

## 五、开发者关注点

- **权限行为必须可验证，文档必须与实现一致。** Windows 脚本审批反馈与默认权限说明矛盾共同表明，仅显示配置项不足以建立信任，需要清晰的匹配和执行语义。  
  参考：[#65008](https://github.com/anomalyco/opencode/issues/65008)、[#64999](https://github.com/anomalyco/opencode/issues/64999)。

- **后台任务需要明确的生命周期与状态。** 子代理仍运行却显示空闲、服务重启后后台 shell 被取消，都会影响长任务的可靠使用。  
  参考：[#65057](https://github.com/anomalyco/opencode/issues/65057)、[#65014](https://github.com/anomalyco/opencode/issues/65014)。

- **自动化场景对存储容错提出更高要求。** 并发数据库写入失败、读取复制数据库时异常终止，以及升级后的项目归属问题，表明存储可靠性不只是桌面端体验问题。  
  参考：[#65020](https://github.com/anomalyco/opencode/issues/65020)、[#65021](https://github.com/anomalyco/opencode/issues/65021)、[#65058](https://github.com/anomalyco/opencode/issues/65058)。

- **“失败可解释”与“功能可用”同样重要。** 安装错误误导为磁盘不足、模型选择失败却无提示、流中断缺乏上下文，都会显著增加排障成本。  
  参考：[#65044](https://github.com/anomalyco/opencode/issues/65044)、[#64977](https://github.com/anomalyco/opencode/issues/64977)、[PR #65043](https://github.com/anomalyco/opencode/pull/65043)。

- **Provider 兼容性仍是端到端体验的薄弱环节。** 异常生成内容、合成回复被直接展示，以及 PDF 返回格式不符合兼容接口验证要求，说明适配层需要覆盖真实工具和文件工作流。  
  参考：[#64967](https://github.com/anomalyco/opencode/issues/64967)、[#64982](https://github.com/anomalyco/opencode/issues/64982)、[#64990](https://github.com/anomalyco/opencode/issues/64990)。

**分析结论：** 今天最值得关注的不是新增功能数量，而是代理工作流的可靠性：权限是否按预期生效、任务是否仍在执行、数据能否安全持久化，以及失败后是否能够快速定位。相关 PR 已覆盖部分问题，但尚不能据此认定修复已合并或进入正式版本。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-11-20

## 今日速览

今日动态聚焦**终端可靠性、模型工具调用兼容性与错误可观测性**：Windows 长 RPC 命令静默截断、TUI 挂起与退出后的终端恢复，是值得优先关注的问题。PR 方面，GitHub Copilot 严格工具调用、llama.cpp 图像分类输入及配置重载错误提示均有相关提交；过去 24 小时无新版本发布。

> **数据说明**：本批数据仅含 4 个 Issue、7 个 PR，以下全部列出，不补足至 10 条。来源标注为 `badlogic/pi-mono`，但条目链接指向 `earendil-works/pi`，本文按条目提供链接。部分记录更新时间为 11 月 19 日，沿用所给统计范围；**CLOSED 不代表已修复或已合并**。

## 社区热点 Issues

### 1. Windows Git Bash 静默截断长 RPC 命令
[#12340](https://github.com/earendil-works/pi/issues/12340) · **已关闭** · 作者：Alan5168

- **问题**：8,336 字符的 RPC 命令只打印 `START`，后续命令未执行，却返回 `exitCode: 0`、`truncated: false`；通过 `bash.exe -s` 执行同一脚本则正常。
- **为什么重要**：这是“执行不完整但报告成功”的可靠性风险，可能使自动化任务、代码代理误判操作结果。
- **社区反应**：2 条评论、0 个赞，是本批评论最多的 Issue；关闭原因与修复情况未提供。

### 2. 独立 CLI TUI 收到 SIGTSTP 后未正确恢复终端
[#12338](https://github.com/earendil-works/pi/issues/12338) · **已关闭** · 作者：petrroll

- **问题**：运行中的交互会话已有挂起处理，但 resume picker、setup、`pi config` 等独立 TUI 未设置相应处理器，外部 SIGTSTP 仍可能留下异常终端状态。
- **为什么重要**：终端生命周期管理需要覆盖所有入口，不能只保障主交互会话。
- **社区反应**：1 条评论、0 个赞；属于既有 SIGTSTP 修复后的边界问题反馈。

### 3. 为 `sendUserMessage()` 提供逐次提交的接纳回执
[#12333](https://github.com/earendil-works/pi/issues/12333) · **已关闭** · 作者：TheDigitalImmigrant

- **需求**：`pi.sendUserMessage()` 返回 `void`，而 `input` hook 触发时尚未决定是否接纳输入；多个调用者提交相同文本时，扩展无法可靠关联提交与后续消息。
- **为什么重要**：影响扩展编排、并发消息追踪及提交状态确认，核心诉求是可关联、可验证的 API 反馈。
- **社区反应**：1 条评论、0 个赞；数据未说明是否采纳或以其他方案解决。

### 4. Gemini 提示词被拦截时丢失具体原因
[#12330](https://github.com/earendil-works/pi/issues/12330) · **已关闭** · 作者：SuperChipper

- **问题**：Google 返回 `promptFeedback.blockReason` 且没有候选结果时，适配层忽略该信息，抛出泛化错误 `Google stream ended without a finish reason`。
- **为什么重要**：开发者无法区分内容拦截与流式响应异常，增加排障成本，也不利于制定正确的重试策略。
- **社区反应**：1 条评论、0 个赞；暂无足够数据判断后续处理结果。

## 重要 PR 进展

本批 7 个 PR 均由 **petrroll** 提交。除特别标注外均为已关闭，**是否合并需进一步核实**；评论数字段缺失，不能据此判断讨论热度。

| PR | 状态 | 功能或修复内容 | 开发者价值 |
|---|---|---|---|
| [#12339](https://github.com/earendil-works/pi/pull/12339) | 已关闭 | 将 SIGTSTP 监听器的生命周期与 TUI 对终端的实际占用绑定，处理首次 `start()` 前等边界情况。 | 减少终端未由 TUI 接管时仍响应挂起信号的问题。 |
| [#12337](https://github.com/earendil-works/pi/pull/12337) | **开放中** | 报告 `AgentSession.reload()` 重读 `settings.json` 时发现的配置解析错误。 | 避免错误只被记录却不向用户呈现，提升热重载可观测性。 |
| [#12336](https://github.com/earendil-works/pi/pull/12336) | 已关闭 | TUI 停止后退出进程前，确保 stdout 写入完成。 | 防止终端清理控制序列丢失，导致鼠标、焦点或键盘上报模式残留。 |
| [#12335](https://github.com/earendil-works/pi/pull/12335) | 已关闭 | 为声明支持图像输入的 llama.cpp 决策分类模型传递图像，修正硬编码为纯文本输入的问题。 | 让分类器注册能力与模型实际能力保持一致，涉及 Clef 配合 `mmproj` 等场景。 |
| [#12334](https://github.com/earendil-works/pi/pull/12334) | 已关闭 | 搜索选择器中，Left、Right、Home、End 仅移动文本光标时，不再因重新过滤而重置选中项。 | 改善登录等可搜索选择列表的键盘操作体验。 |
| [#12332](https://github.com/earendil-works/pi/pull/12332) | 已关闭 | 为 GitHub Copilot 上的 Claude 发送严格模式工具定义。 | 让支持该能力的模型使用 JSON Schema 约束工具参数。 |
| [#12329](https://github.com/earendil-works/pi/pull/12329) | 已关闭 | 为 GitHub Copilot 的 Responses 模型补齐严格模式能力标记，使工具请求携带 `strict`。 | 覆盖摘要所述的 18 个 Responses 模型，改善跨模型工具调用一致性。 |

## 功能需求趋势

基于全部 4 个 Issue，当前需求主要集中在以下三个方向；样本较小，不宜据此推断长期热度排名。

1. **执行与终端状态的可靠性**  
   用户期待的不只是“命令能运行”，还包括结果报告可信、挂起后终端可恢复。Windows 命令截断与独立 TUI 的 SIGTSTP 问题均指向这一方向。  
   关联：[命令执行可靠性 #12340](https://github.com/earendil-works/pi/issues/12340)、[终端恢复 #12338](https://github.com/earendil-works/pi/issues/12338)。

2. **扩展 API 的提交状态与可追踪性**  
   扩展需要区分“提交调用已发生”“输入已被接纳”“消息已进入运行”等阶段，并能关联每次提交，而不只是观察最终文本。  
   关联：[提交接纳回执 #12333](https://github.com/earendil-works/pi/issues/12333)。

3. **模型适配层保留结构化错误信息**  
   泛化报错不足以支持稳定的代理系统；开发者需要供应商返回的具体原因，以区分拦截、配置和服务异常。  
   关联：[Gemini 拦截原因透传 #12330](https://github.com/earendil-works/pi/issues/12330)。

## 开发者关注点

- **避免“假成功”**：命令未完整执行却返回成功，比显式失败更难发现，应重点关注执行完整性验证。  
  [#12340](https://github.com/earendil-works/pi/issues/12340)

- **完善终端生命周期清理**：挂起、恢复、停止和退出都需要正确管理信号监听器与终端控制序列。  
  [#12338](https://github.com/earendil-works/pi/issues/12338) · [#12339](https://github.com/earendil-works/pi/pull/12339) · [#12336](https://github.com/earendil-works/pi/pull/12336)

- **让错误真正可见、可定位**：配置重载解析失败不应静默，模型拦截原因也不应被通用异常覆盖。  
  [#12337](https://github.com/earendil-works/pi/pull/12337) · [#12330](https://github.com/earendil-works/pi/issues/12330)

- **确保能力声明与实际请求一致**：严格工具调用与图像输入都依赖准确的模型能力映射；仅模型支持、适配层未开启，仍无法发挥能力。  
  [#12329](https://github.com/earendil-works/pi/pull/12329) · [#12332](https://github.com/earendil-works/pi/pull/12332) · [#12335](https://github.com/earendil-works/pi/pull/12335)

**后续优先跟踪**：开放中的配置重载诊断 PR，以及上述已关闭条目的最终处理结果与版本归属，避免将关闭状态误当作修复已交付。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**2026-11-20｜数据来源：[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)**

## 1. 今日速览

今天的重点是 **`qwen serve` 性能与稳定性**：社区报告了会话记录分页仍需全量解析、阻塞事件循环的问题，以及常驻工作区带来的内存压力；相关 PR 正推进启动提速与历史按需加载（[#17889](https://github.com/QwenLM/qwen-code/issues/17889)、[#17888](https://github.com/QwenLM/qwen-code/issues/17888)、[#17897](https://github.com/QwenLM/qwen-code/pull/17897)、[#17896](https://github.com/QwenLM/qwen-code/pull/17896)）。发布与 CI 仍是另一条主线，nightly 发布失败、Windows 测试限制及国际化检查均待处理；过去 24 小时无新 Release，所展示 PR 全部为 **OPEN**，尚不能视为已交付修复。

> **数据口径：**本期共 12 条更新 Issue、24 条更新 PR，仅提供其中 20 条 PR 的详情。PR 评论数为 `undefined`，因此不据此判断讨论热度。

## 2. 社区热点 Issues

以下按影响范围与处理优先级筛选，而非单纯按评论数排序。入选 Issue 均为 **OPEN、0 👍**，目前互动量有限。

| Issue | 核心问题与重要性 | 社区反应与当前状态 |
|---|---|---|
| **[会话记录分页全量解析 #17889](https://github.com/QwenLM/qwen-code/issues/17889)** | `GET /session/:id/transcript` 每次重新解析完整 JSONL，`limit=1` 与 `limit=500` 成本相近，并占用 Node 事件循环。大会话可能拖慢其他客户端。 | **P1，2 条评论**。本期最值得优先跟踪的服务端性能问题。 |
| **[Daemon 内存观测与常驻运行时 #17888](https://github.com/QwenLM/qwen-code/issues/17888)** | 报告称单台主机五天发生三次 OOM，且缺乏退出前的内存观测手段；工作区运行时持续常驻。涉及资源可观测性与生命周期管理。 | **P2、功能请求，2 条评论**。反馈具有重复故障背景，但仍需进一步定位具体内存来源。 |
| **[Windows Java CI 参数超限 #17885](https://github.com/QwenLM/qwen-code/issues/17885)** | 测试将 32,780 字符的捕获内容放入命令行参数，超过 Windows 32,767 字符限制，造成确定性失败。 | **P2，2 条评论**；标记为可交由 agent 处理，已有对应 PR [#17891](https://github.com/QwenLM/qwen-code/pull/17891)。 |
| **[macOS 图片输入异常 #17870](https://github.com/QwenLM/qwen-code/issues/17870)** | 在 `1.0.0-preview.2` 中，工具生成图片未以图像形式到达模型，Retina `@2x.png` 截图路径也无法附加，影响多模态工作流。 | **P2，2 条评论**。报告明确区分了“直接上传可用”与“工具图片失效”两条路径。 |
| **[Nightly 发布失败 #17898](https://github.com/QwenLM/qwen-code/issues/17898)** | `v0.28.0-nightly.20261119.f8d4f706ea` 的 `publish` 任务失败，影响 nightly 分发。 | **1 条评论**，带自动修复处理中标签；已有 PR [#17903](https://github.com/QwenLM/qwen-code/pull/17903)。另有同标签、同工作流运行的集成任务失败报告 [#17882](https://github.com/QwenLM/qwen-code/issues/17882)，不宜简单计作两次独立发布事故。 |
| **[会话导出浏览器测试不稳定 #17884](https://github.com/QwenLM/qwen-code/issues/17884)** | 最大会话文档的打开、搜索、复制和打印测试被标记为疑似 flaky。需要区分运行器负载造成的超时与真实功能回归。 | **P3，3 条评论**；带 `duplicate`、自动修复处理中标签，对应 PR [#17887](https://github.com/QwenLM/qwen-code/pull/17887)。 |
| **[设置项国际化完整性检查失败 #17874](https://github.com/QwenLM/qwen-code/issues/17874)** | 检查要求每个对外提供的设置项都有标签和描述翻译，关系到设置页面的完整性与 CI 质量门禁。 | **6 条评论，为所给 Issue 中最多**；仍待分诊。报告明确为临时结论，新主线运行若通过即可关闭。 |
| **[俄语翻译键覆盖检查失败 #17877](https://github.com/QwenLM/qwen-code/issues/17877)** | 俄语 locale 未通过覆盖所有英文键的检查，反映新增功能与翻译维护需要同步。 | **0 条评论**，待分诊；同样属于临时 CI 报告，尚不能据此断言当前主线仍失败。 |
| **[CI 残留已删除机器人账号 #17880](https://github.com/QwenLM/qwen-code/issues/17880)** | 安全预检查与发布同步仍引用 `qwen-code-ci-bot`，可能影响自动化身份识别和流程路由。 | **P3，2 条评论**。与评审路由修复 [#17881](https://github.com/QwenLM/qwen-code/pull/17881) 属于相关但不同的清理范围。 |
| **[Python SDK 关闭异常保留 #17872](https://github.com/QwenLM/qwen-code/issues/17872)** | 关闭路径重复抛出同一异常对象、清理 traceback 等行为可能影响后续控制调用中的错误保留，关系到 SDK 故障诊断。 | **P3，2 条评论**。来自此前 PR 多轮评审后的后续跟踪，偏向生命周期边界修复。 |

## 3. 重要 PR 进展

**以下 10 项均为 OPEN，描述的是拟引入的改动，不代表已合并或发布。**

| PR | 功能或修复内容 | 开发者价值 |
|---|---|---|
| **[Teams 发布初始化门控 #17903](https://github.com/QwenLM/qwen-code/pull/17903)** | 在维护者完成首次公开 npm 发布前，将 Microsoft Teams channel 排除在发布包选择之外，沿用已有仓库变量门控方式。 | 针对 [#17898](https://github.com/QwenLM/qwen-code/issues/17898) 的发布修复，减少尚未初始化的包阻塞发布的风险。 |
| **[Token 用量统计校正 #17902](https://github.com/QwenLM/qwen-code/pull/17902)** | Dashboard 与 `/stats` 改用逐请求用量账本，按响应实际发生的本地日期归属，而非依赖会话摘要。 | 降低恢复会话历史重放对用量统计的干扰，提高跨会话统计可信度。 |
| **[大型 PDF 按需渲染 #17899](https://github.com/QwenLM/qwen-code/pull/17899)** | 对 4–100 MiB 的工作区 PDF 逐页呈现，懒加载 PDF.js，并通过现有鉴权 API 读取字节范围。 | 避免预览时一次性处理整份大文档，改善 Web Shell 大文件体验。 |
| **[Daemon 启动与就绪提速 #17897](https://github.com/QwenLM/qwen-code/pull/17897)** | 让前置 `qwen serve` 走轻量解析器，并新增 `--eager-runtime`、`QWEN_SERVE_EAGER_RUNTIME=1`。 | 减少启动路径开销，为托管启动提供提前启动运行时的选项。 |
| **[ACP 工作流历史延迟加载 #17896](https://github.com/QwenLM/qwen-code/pull/17896)** | 将中断恢复与持久化快照加载推迟到请求历史时；同一存储的并发首次请求共享恢复过程。 | 避免未使用的历史数据提前加载，降低不必要的初始化工作。 |
| **[压缩降级保留用户原文 #17894](https://github.com/QwenLM/qwen-code/pull/17894)** | 当压缩请求超出窗口、进入缩减路径时，保留用户亲自输入的文本，避免与其他文本一起按 4,000 字符裁剪。 | 降低上下文压缩丢失原始意图和关键约束的风险。 |
| **[Windows 捕获数据改走 stdin #17891](https://github.com/QwenLM/qwen-code/pull/17891)** | 将外部 worker 测试的 stdout/stderr 捕获载荷从命令行参数迁至 stdin 中的启动文档。 | 从传输方式上避开 Windows 命令行长度限制，对应 [#17885](https://github.com/QwenLM/qwen-code/issues/17885)。 |
| **[ACP legacy 轮次传递异步 hook 输出 #17890](https://github.com/QwenLM/qwen-code/pull/17890)** | 补齐默认 legacy 模型轮次中异步 hook 输出被收集后静默丢弃的路径。 | 让后台 hook 结果真正进入模型上下文，提高自动化链路可靠性。 |
| **[移动端发送按钮避让软键盘 #17883](https://github.com/QwenLM/qwen-code/pull/17883)** | 使用 `visualViewport` 底部偏移统一布局，并避免触摸发送时过早使编辑器失焦。 | 修复移动端输入和发送过程中的可见性、焦点问题。 |
| **[托管 Agent 持久状态恢复 #17886](https://github.com/QwenLM/qwen-code/pull/17886)** | 控制平面副本未持有会话 Harness attachment 时，改从持久状态提供恢复视图，并处理原生终端结束事件。 | 改善多副本、重启及故障恢复场景下的会话状态一致性。 |

## 4. 功能需求趋势

基于全部 12 条 Issue，本期需求主要集中在以下方向：

- **常驻服务的性能与资源治理。** 用户诉求从“可以运行”转向“大会话、长时间运行、多客户端下仍可用”，尤其关注分页成本、事件循环阻塞、内存指标与运行时驻留策略（[#17889](https://github.com/QwenLM/qwen-code/issues/17889)、[#17888](https://github.com/QwenLM/qwen-code/issues/17888)）。
- **CI 与发布自动化可靠性。** 疑似 flaky 测试、Windows 参数限制、过期机器人身份和 nightly 失败集中出现，说明工程链路维护是本期显著主题，但其中不少报告来自机器人，不能直接等同于用户功能需求（[#17884](https://github.com/QwenLM/qwen-code/issues/17884)、[#17885](https://github.com/QwenLM/qwen-code/issues/17885)、[#17880](https://github.com/QwenLM/qwen-code/issues/17880)、[#17898](https://github.com/QwenLM/qwen-code/issues/17898)）。
- **多模态输入与跨平台一致性。** 图片是否以正确模态到达模型、平台特有文件名能否正常附加，成为实际工作流中的可靠性要求（[#17870](https://github.com/QwenLM/qwen-code/issues/17870)）。
- **国际化从覆盖率走向术语一致性。** 除缺失翻译键外，俄语用户还要求统一超时拼写与 vision-bridge 术语，体现本地化质量需求的细化（[#17877](https://github.com/QwenLM/qwen-code/issues/17877)、[#17868](https://github.com/QwenLM/qwen-code/issues/17868)）。
- **SDK 生命周期与诊断能力。** 关闭错误的保留和后续调用行为受到关注，说明集成者需要稳定、可追溯的异常语义（[#17872](https://github.com/QwenLM/qwen-code/issues/17872)）。

## 5. 开发者关注点

1. **小请求不能承担全量成本。** 分页接口即使只取一条记录也解析整个文件，会削弱 API 的可扩展性；相关性能 PR 值得跟踪，但不能视作已经解决分页问题（[#17889](https://github.com/QwenLM/qwen-code/issues/17889)）。
2. **故障前需要可观测性，而非只有故障后排查。** 内存指标与常驻运行时管理，是长期部署 `qwen serve` 的实际运维缺口（[#17888](https://github.com/QwenLM/qwen-code/issues/17888)）。
3. **修测试必须区分真实缺陷与环境波动。** Windows 参数超限属于确定性问题；浏览器测试超时则需要重跑与预算校验，不能统一用放宽阈值处理（[#17885](https://github.com/QwenLM/qwen-code/issues/17885)、[#17884](https://github.com/QwenLM/qwen-code/issues/17884)）。
4. **模型上下文的数据完整性是关键底线。** 用户原文、工具图片、异步 hook 输出都需要完整且以正确形式进入模型，而非被截断、转为文本或静默丢弃（[#17894](https://github.com/QwenLM/qwen-code/pull/17894)、[#17870](https://github.com/QwenLM/qwen-code/issues/17870)、[#17890](https://github.com/QwenLM/qwen-code/pull/17890)）。
5. **近期应优先确认修复是否落地。** 建议跟踪 nightly 发布恢复、Windows CI 修复验证，以及主线国际化检查的最新运行结果；当前数据尚不足以确认这些问题已经解除（[#17903](https://github.com/QwenLM/qwen-code/pull/17903)、[#17891](https://github.com/QwenLM/qwen-code/pull/17891)、[#17874](https://github.com/QwenLM/qwen-code/issues/17874)）。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报
**日期：2026-11-20**  
**观察范围：所提供的过去 24 小时 GitHub 更新数据**

> **数据说明**：数据来源标注为 [Hmbown/DeepSeek-TUI](https://github.com/Hmbown/DeepSeek-TUI)，但 Issue 链接指向 `codewhale-hq/Codewhale`。下文按提供的 Issue 归属生成链接，仓库关联关系尚待核实。今日仅有 3 条 Issue、无 PR 更新，因此不补足至 10 条。

## 1. 今日速览

今日动态集中在**命令执行策略的正确性**与 **TUI 命令输入体验**：两条 Issue 涉及 `stdin_piped` 标记及 tmux 命令执行入口的覆盖，另一条涉及斜杠命令的 Enter 提交被二次拦截。观察窗口内无新版本、无 PR 更新；3 条 Issue 均为 OPEN，且暂无评论或点赞，尚不能判断社区共识或修复优先级。

## 2. 社区热点 Issues

### [#7415：tmux 执行类子命令覆盖不完整](https://github.com/codewhale-hq/Codewhale/issues/7415)
- **问题**：当前 `VerbLauncher` 已建模 `run-shell`、`send-keys`、`if-shell` 等命令，但尚未完整覆盖 `display-popup`、`confirm-before`、`command-prompt`、`bind-key`、`source-file` 等入口。
- **为什么重要**：这些入口涉及即时执行、交互确认或配置加载等不同路径，可能造成执行策略识别盲区。需要逐项厘清参数与执行语义，不能简单按同一种启动方式处理。
- **社区反应**：由 Hmbown 提出，暂无评论或点赞；未见关联修复 PR。

### [#7416：`stdin_piped` 传播存在误标与漏标](https://github.com/codewhale-hq/Codewhale/issues/7416)
- **问题**：第十轮正确性审查发现残余边界问题。例如，`x || ssh host` 中的 `||` 可能被错误地按管道处理，导致后续命令被标记为 `stdin_piped`；摘要还提及 `ssh host 3< f` 的重定向判定问题。
- **为什么重要**：执行策略需要区分逻辑运算符、管道及不同文件描述符的重定向。误标可能导致正常命令被拒绝，漏标则可能使策略判断不够准确。
- **社区反应**：作者明确将其列为**非阻塞问题**，待评估接受现状还是进行局部修复；暂无评论或点赞。

### [#7414：第二层 Enter 判断再次拦截命令提交](https://github.com/codewhale-hq/Codewhale/issues/7414)
- **问题**：输入路径存在两层 Enter 判断。第一层 `handle_paste_burst_key` 在识别到斜杠或 `$` 命令上下文后放行 Enter，但第二层 `handle_composer_enter` 再次执行换行判定，可能使提交变回换行。
- **为什么重要**：直接影响命令输入的可预测性，也暴露出粘贴突发处理与命令提交逻辑之间的上下文不一致。
- **社区反应**：暂无评论或点赞；当前数据未显示修复进展。

## 3. 重要 PR 进展

观察窗口内**无 PR 更新**，暂无可报告的功能合入或修复进展。上述问题是否已有开发分支或窗口外 PR，现有数据无法确认。

仓库入口：[Hmbown/DeepSeek-TUI](https://github.com/Hmbown/DeepSeek-TUI)

## 4. 功能需求趋势

今日样本更偏向**正确性修复**，而非新增功能；仅凭 3 条 Issue，不能推断长期社区需求排名。

| 方向 | 今日信号 | 相关链接 |
|---|---|---|
| 执行策略解析精度 | 区分 `||`、管道及文件描述符重定向，减少错误判定 | [#7416](https://github.com/codewhale-hq/Codewhale/issues/7416) |
| 命令执行入口覆盖 | 扩展 tmux 子命令的语义建模，减少识别盲区 | [#7415](https://github.com/codewhale-hq/Codewhale/issues/7415) |
| TUI 输入一致性 | 协调粘贴识别、命令上下文与 Enter 提交行为 | [#7414](https://github.com/codewhale-hq/Codewhale/issues/7414) |

今日数据中未出现 IDE 集成、性能优化或新模型支持方面的直接需求信号。

## 5. 开发者关注点

- **策略判定既要避免漏识别，也要减少误拒绝**：`stdin_piped` 的边界处理关系到安全策略与正常命令可用性之间的平衡。[#7416](https://github.com/codewhale-hq/Codewhale/issues/7416)
- **不能仅靠少量子命令覆盖复杂工具的执行语义**：tmux 的多类执行入口需要分别审视，并补充相应测试。[#7415](https://github.com/codewhale-hq/Codewhale/issues/7415)
- **输入上下文应贯穿整条事件处理链**：前一层已放行的命令提交，不应在后一层因缺少同一上下文而被重新拦截。[#7414](https://github.com/codewhale-hq/Codewhale/issues/7414)

**总体判断**：今日更新以审查发现和交互缺陷为主，重点是收敛执行策略边界与输入行为一致性；暂无证据表明这些问题已进入修复或合入阶段。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*