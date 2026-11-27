# AI CLI 工具社区动态日报 2026-11-27

> 生成时间: 2026-11-27 03:56 UTC | 覆盖工具: 9 个

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
**日期：2026-11-27｜基于所提供的过去 24 小时社区快照**

## 1. 生态全景

AI CLI 的竞争重点正在从“模型能否调用工具”转向**任务能否可靠完成、失败能否诊断、成本能否解释**。多会话、多 Agent、后台运行与断点恢复成为共同建设方向，但权限状态不一致、子进程残留、结果交付遗漏等问题，说明运行时工程仍是重要瓶颈。MCP、ACP、Hooks 和 SDK 正推动 CLI 从独立助手演变为可嵌入开发基础设施，协议语义完整性随之成为关键。与此同时，桌面端、Web Shell 和移动入口不断扩展，产品竞争已超出纯终端体验，覆盖完整开发工作流。

## 2. 各工具活跃度对比

> **口径说明：**Issue、PR 数指窗口内“有更新”的条目，不等于新增数量；不同工具的展示完整度不同。PR 的 CLOSED 状态不代表已合并，Release 条目也不保证所有分发步骤均成功。

| 工具 | Issues 更新数 | PR 更新数 | Release 情况 | 今日主要信号 |
|---|---:|---:|---|---|
| **Claude Code** | 50，展示 30 | 1 | 无 | 云端权限、多会话稳定性、MCP 集成 |
| **OpenAI Codex** | 50，展示 30 | 25，展示 20 | 1 个 Alpha：`0.174.0-alpha.8` | TUI 恢复、桌面稳定性、安全诊断与用量透明度 |
| **Gemini CLI** | 3 | 4 | 无；nightly 发布失败 | ACP 异常处理、Hook 追踪、发布链路 |
| **GitHub Copilot CLI** | 14 | 0 | 3 个版本：`1.0.117-3/-4/-5` | 企业 CA、MCP 权限隔离、沙箱兼容性 |
| **Kimi Code CLI** | 0 | 0 | 无 | 本窗口无活动 |
| **OpenCode** | 50，展示 30 | 50，展示 20 | 无 | 无人值守执行、后台服务、会话恢复 |
| **Pi** | 22 | 14 | 无 | 上下文压缩、模型适配、宿主调度与终端体验 |
| **Qwen Code** | 未提供总数 | 未提供总数 | 4 条发布记录：2 个正式 CLI、1 个 nightly、1 个 TS SDK | Harness、Managed Session、Mods 与 Web Shell |
| **DeepSeek TUI** | 1 | 1 | 无 | 压缩缓存效率、CJK 技能补全 |

**数据边界：**
- Qwen Code 列出了重点条目，但无法据此补算完整 Issue、PR 总数；部分发布失败报告仍开放。
- Pi、DeepSeek TUI 的来源仓库名称与条目目标仓库不一致，归属关系需核实。
- 部分条目更新时间为 11 月 26 日，仍按所提供的滚动窗口统计。

## 3. 共同关注的功能方向

| 共同方向 | 涉及工具 | 具体诉求及横向判断 |
|---|---|---|
| **执行状态与结果可信度** | Claude Code、Codex、Qwen Code、Copilot CLI、Pi | “任务完成”应有验证证据；登录成功应对应实际可用；provider 错误不能记为成功；成功退出不能掩盖遥测缺失或进程残留。 |
| **多 Agent 与后台任务生命周期** | Claude Code、Codex、OpenCode、Qwen Code、Pi、Copilot CLI | 需要可靠的消息追加、子任务结果交付、取消、恢复及资源清理；减少通知噪声、空转与无效重试。 |
| **权限与沙箱可预测性** | Claude Code、Codex、Copilot CLI、OpenCode、Qwen Code | 持续授权应明确作用范围；拒绝规则应真正生效；无人值守模式不能等待不可见审批；安全限制需要兼容真实构建和测试流程。 |
| **MCP / ACP / Hooks 集成完整性** | Claude Code、Gemini CLI、Copilot CLI、OpenCode、Pi、Qwen Code | 关注 OAuth 可用性、401 重试语义、统一调用 ID、instructions 与输入请求转发，以及公开扩展钩子。 |
| **长会话与上下文管理** | OpenCode、Pi、Qwen Code、DeepSeek TUI；Copilot CLI 涉及大会话传输 | 压缩应及时触发并保留用户意图；溢出错误应被正确识别；缓存应有效复用；大型多模态历史不能压垮读取与传输链路。 |
| **成本与可观测性** | Codex、Copilot CLI、OpenCode、Pi、Qwen Code、DeepSeek TUI | 需要分模型额度、操作级费用、缓存统计、OTel 与明确错误输出，并控制多 Agent 等待和持续重试的隐性开销。 |

**核心共识：**开发者不再满足于“接通能力”，而是要求能力具备明确的状态、边界和失败语义。

## 4. 差异化定位分析

以下定位依据本期变更和反馈推断，不代表官方完整产品战略。

| 工具 | 功能侧重与技术路线 | 更匹配的用户与场景 |
|---|---|---|
| **Claude Code** | 云端会话、桌面入口、Remote Control 与 MCP/插件协作；重点在跨入口连续性和授权体验 | 需要跨设备、多会话协作的开发者，以及插件集成团队 |
| **OpenAI Codex** | Rust TUI、app-server、IDE 与桌面协同；关注状态恢复、审查路由和交互质量 | 终端与 IDE 混合使用、重视代码审阅和安全控制的团队 |
| **Gemini CLI** | 本期集中于 ACP、工具 Hooks、跨平台文件差异等接口层完善 | 构建编辑器客户端、Hook 自动化和协议集成的开发者 |
| **GitHub Copilot CLI** | 企业沙箱、托管设置、证书与权限隔离；兼顾 SDK、ACP 和 BYOK | 企业网络、组织策略与 Windows 环境下的开发团队 |
| **OpenCode** | 多模型与账户适配、开放插件/Skills、后台服务、多端与多代理编排 | 需要模型选择自由、深度定制和无人值守自动化的团队 |
| **Pi** | SDK/Harness、宿主调度、Durable、存储和终端扩展，突出可嵌入性 | 希望搭建自定义 Agent 产品、扩展本地模型工作流的开发者 |
| **Qwen Code** | Harness 内核、Managed Session、外部运行时、Mods 与共享 Web 界面 | 需要托管会话、嵌入式运行时和可恢复 Agent 平台的团队 |
| **DeepSeek TUI** | 本期聚焦终端输入国际化与上下文缓存效率 | 重视中文终端体验和长会话开销的用户；整体定位证据有限 |
| **Kimi Code CLI** | 本窗口无新增证据 | 不宜据单日无活动判断定位或发展速度 |

## 5. 社区热度与成熟度

### 活跃度：OpenCode、Codex 的可见代码侧更新较多

- **OpenCode：50 条 Issue、50 条 PR 更新**，在已提供总数的工具中，PR 更新最多，覆盖运行时、模型、界面和后台服务。
- **Codex：50 条 Issue、25 条 PR 更新**，问题反馈和代码侧迭代均较密集，TUI 改进尤其集中。
- **Claude Code：50 条 Issue、1 条 PR 更新**，反馈活跃，但不能仅据公开仓库 PR 数推断整体研发投入。
- **Pi：22 条 Issue、14 条 PR 更新**，相对紧凑，主要围绕模型适配、长会话及扩展能力推进。
- **Qwen Code** 缺少完整活动总数，但同时推进内核、会话、前端和扩展接口，呈现明显的架构快速演进特征。

### 迭代速度：应区分发布、提案与实际交付

- **Copilot CLI** 当日有 3 个版本，且说明了企业 CA 与权限修复，发布侧信号较明确。
- **Qwen Code** 多条发布记录与发布失败报告并存，需要分别核验 CLI、SDK 和目标平台产物。
- **Codex** 发布 Alpha，但缺少具体变更说明，不能将本期 PR 自动归入该版本。
- **Gemini CLI** nightly 失败被标为 P0，说明该次发布链路需优先处理，不能外推为稳定版不可用。

### 成熟度：已有“生产化诉求”，但无法据此排名

企业证书、权限隔离、恢复、退避、审计和凭据生命周期等议题，说明多个工具正在面对真实生产环境约束。但样本内多数 Issue 只有 **0–4 条评论、几乎无点赞**，不足以形成可靠的用户热度排名；同样，单日缺陷数不能直接衡量质量，单日无活动也不能视为项目停滞。

## 6. 值得关注的趋势信号

### ① Agent 的竞争单位正在从“模型回复”转向“任务运行时”

Qwen Code 的挂起与冷恢复、Pi 的宿主调度、OpenCode 的后台生命周期管理，体现出相同方向：**长任务需要持久化状态和明确调度机制，而不只是维持一次模型请求。**

**开发者参考：**评估产品时，应测试进程崩溃、客户端重连、等待审批和子任务结束后的恢复能力，而非只比较首轮生成质量。

### ② “可信完成”将成为自动化验收的核心指标

Claude Code、Codex 均有完成声明与实际结果不符的反馈；Qwen Code 涉及错误被记为成功，Copilot CLI、OpenCode 则出现退出状态与底层运行状态不一致的报告。

**开发者参考：**将完成条件外置为测试、运行探针、产物检查和进程状态检查，避免以模型文字或单一退出码作为最终验收依据。

### ③ 协议竞争从连接数量走向语义完整性

MCP/ACP 的问题已深入认证刷新、调用关联、说明保留、输入转发与重放安全。统一 `tool_call_id` 之类的小接口改进，可能直接影响并发审计和错误定位能力。

**开发者参考：**选择集成方案时，除验证“能否调用”，还要覆盖断连、401、取消、交互输入和非幂等操作的重试行为。

### ④ 成本优化正在下沉到编排与上下文层

多代理等待循环、重复轮询、压缩缓存未命中、Token 估算偏差和无效重试，都可能在模型单价之外放大成本。

**开发者参考：**建立任务级预算和遥测，分别记录有效推理、等待重试、上下文重传与缓存命中，不宜只比较每百万 Token 价格。

### ⑤ 企业落地的决定因素越来越偏向环境兼容性

自定义 CA、UNC 路径、凭据存储、沙箱内 Cypress、WSL2 并发，以及 Linux 图形库组合，都是基础对话测试难以暴露的问题。

**开发者参考：**升级应采用真实仓库和真实企业环境的灰度验证，覆盖构建、测试、网络、凭据、长会话与回滚路径。

---

**综合结论：**本期没有足够证据支持单一“最佳 AI CLI”排名。技术决策更适合围绕三项标准展开：**任务是否可验证、异常是否可恢复、权限与成本是否可观测**；对无人值守和多 Agent 场景，这些能力通常比功能数量更具决定性。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-11-27**

> **数据口径：**所展示 PR 的评论数均为 `undefined`、👍均为 0，因此无法核实其评论热度，也不能据列表顺序认定真实排名。以下按 **Issues 需求呼应、问题影响面与更新时间**整理重点关注榜；所有展示 PR 均为 **OPEN**，不代表已合并或即将发布。

## 1. 热门 Skills 排行：重点关注的 8 个 PR

以下为分析性排序，而非评论数排名。“讨论热点”指提交及相关 Issue 反映的关注点，不代表已核实 PR 评论内容。

| 排名 | Skill / PR | 功能与本次动态 | 社区关注点 | 状态 |
|---|---|---|---|---|
| 1 | **skill-creator** · [#1298](https://github.com/anthropics/skills/pull/1298) | 用于创建、评估和优化 Skills；此次修复触发评估隔离、Windows 兼容及运行时错误处理 | **评估结果是否可信**。相关 Issues 报告零触发率、并行评估误判，可能让描述优化建立在错误分数上 | OPEN |
| 2 | **mcp-builder** · [#1742](https://github.com/anthropics/skills/pull/1742) | 支持 MCP 工具开发；适配 MCP ≥2 的导入名称及自定义 HTTP headers 配置 | **SDK 升级兼容性**，避免现有连接脚本因接口变化失效 | OPEN |
| 3 | **docx** · [#1792](https://github.com/anthropics/skills/pull/1792) | 处理 Word 文档修订；超时后返回错误，并检查输出是否仍残留修订标记 | **不能“执行失败却报告成功”**，文档操作需要可验证的完成条件 | OPEN |
| 4 | **webapp-testing** · [#1980](https://github.com/anthropics/skills/pull/1980) | 启动测试所需服务器；拟避免使用 `shell=True` | **命令执行安全**，降低用户或 Agent 命令字符串带来的注入风险 | OPEN |
| 5 | **Notion Spec to Implementation** 等 · [#1245](https://github.com/anthropics/skills/pull/1245) | 将 Notion 产品/技术规格拆成任务、验收标准与进度跟踪；同一 PR 还包含简历审计 Skill | **从需求到实施的工作流自动化**；注意这是多 Skill 提交，不是单一能力 | OPEN |
| 6 | **md2video-audio** · [#1703](https://github.com/anthropics/skills/pull/1703) | 将 Markdown 转成幻灯片，再生成带配音的 MP4 视频 | **文档内容多模态复用**；“零成本”“专业级”属于提交者描述，尚不能视为验证结论 | OPEN |
| 7 | **Pyxel** · [#525](https://github.com/anthropics/skills/pull/525) | 辅助 Python 复古游戏开发、调试及验证，包含无界面运行和帧检查 | **不止生成代码，还验证交互行为**；3 月创建、11 月仍有更新 | OPEN |
| 8 | **xlsx** · [#2019](https://github.com/anthropics/skills/pull/2019) | 修复工作表级定义名称及别名导致的外部链接漏检 | **电子表格隐性依赖与数据完整性**，避免间接引用逃过风险检查 | OPEN |

## 2. 社区需求趋势

### ① 安全与可信分发：比新增功能更突出的治理需求
[Issue #492](https://github.com/anthropics/skills/issues/492) 有 **46 条评论、3 个赞**，是展示 Issues 中评论最多的一项。核心担忧是第三方 Skills 使用 `anthropic/` 命名空间，使用户误认其为官方能力并授予权限。

**需求方向：**来源标识、发布者验证、权限边界与审计机制。这首先是生态治理诉求，不宜简单包装成“新增一个安全 Skill”。

### ② Skill 创建与触发评估：开发工具链需要先变得可靠
[Issue #556](https://github.com/anthropics/skills/issues/556)（13 评论、7 赞）反映 `claude -p` 下零触发率；[Issue #1352](https://github.com/anthropics/skills/issues/1352)（6 评论、3 赞）指出并行 worker 导致错误匹配。

**需求方向：**可复现评估、跨平台测试、错误分类与触发描述优化。与新增业务 Skill 相比，这类能力对整个生态具有更广泛影响。

### ③ 企业共享与资产管理：从个人使用走向组织复用
[Issue #228](https://github.com/anthropics/skills/issues/228) 有 **17 条评论、8 个赞**，希望在 Claude.ai 内实现组织级共享，替代手动下载、转发、上传。

**需求方向：**共享技能库、分发入口与生命周期管理。该需求来自 Claude.ai，体现跨产品生态诉求，不能直接视为 Claude Code 已规划的功能。

### ④ Agent 记忆与质量控制：值得关注的新 Skill 方向
[compact-memory 提案 #1329](https://github.com/anthropics/skills/issues/1329)（10 评论）探索以紧凑符号保存 Agent 状态；[质量门禁提案 #1385](https://github.com/anthropics/skills/issues/1385)（8 评论）提出任务前校准、对抗审查、交付验证，最近更新于 **11 月 25 日**。

**需求方向：**长任务记忆压缩、执行过程检查和结果验收。它们比泛化的“代码审查/测试生成”更符合本批 Issues 的直接证据。

### ⑤ 文档正确性与上下文效率：减少“看似成功”的隐藏成本
[DOCX XML 损坏问题 #2018](https://github.com/anthropics/skills/issues/2018) 指向输出完整性；[重复 Skills #189](https://github.com/anthropics/skills/issues/189) 有 **9 个赞**；[claude-api 上下文膨胀 #1487](https://github.com/anthropics/skills/issues/1487) 报告一次加载约 156k tokens。

**需求方向：**文档验证、按需加载、插件去重和更精简的执行指令，而不只是增加更多模板。

## 3. 高潜力待合并 Skills

**无法确认哪些 PR“评论活跃”或即将合并。**以下筛选的是修复目标清晰、影响实际使用，且近期仍有更新的候选；更新日期也不等同于维护者认可。

| 待合并 PR | 值得跟踪的原因 | 最近更新 |
|---|---|---|
| [skill-creator 打包执行修复 #1681](https://github.com/anthropics/skills/pull/1681) | 修复直接运行 `package_skill.py` 的导入错误，并更新用法路径，改善 Skill 交付流程 | 11-19 |
| [claude-api 指南修正 #1950](https://github.com/anthropics/skills/pull/1950) | 对齐 Python SDK 自动恢复 `pause_turn` 的行为，避免沿用过时控制逻辑 | 11-10 |
| [xlsx 外链漏检修复 #2019](https://github.com/anthropics/skills/pull/2019) | 针对具体漏检路径，涉及表格数据安全与正确性 | 11-03 |
| [docx 修订处理验证 #1792](https://github.com/anthropics/skills/pull/1792) | 从仅检查进程执行，推进到验证文档实际结果 | 11-01 |
| [webapp-testing 命令执行加固 #1980](https://github.com/anthropics/skills/pull/1980) | 针对明确的命令注入风险，具有较高安全修复价值 | 11-01 |

**新增能力观察名单：**[Pyxel #525](https://github.com/anthropics/skills/pull/525) 与 [Notion 工作流 #1245](https://github.com/anthropics/skills/pull/1245) 分别代表“开发—验证闭环”和“需求—实施闭环”，但现有数据不足以判断落地时间。

## 4. Skills 生态洞察

**当前社区最集中的诉求，是让 Skills 从“可调用的能力集合”升级为“来源可信、触发可靠、交付可验证、能够组织化复用的执行工具”——可靠性与治理的重要性，已不低于新增功能。**

---

# Claude Code 社区动态日报
**日期：2026-11-27**  
**数据来源：**[anthropics/claude-code](https://github.com/anthropics/claude-code)；过去 24 小时更新的 50 条 Issues 中展示的 30 条，以及 1 条 PR。以下分析限于已提供样本，用户报告不代表官方确认。

## 1. 今日速览

过去 24 小时无新 Release，社区反馈主要集中在**云端会话权限与连续性、MCP 集成，以及多会话执行可靠性**。唯一更新的 PR 提议让可复现或高影响问题免于自动过期关闭，值得持续跟踪；当前展示的 Issues 最多仅 2 条评论、均为 0 个 👍，尚不能据此判断为广泛共识。

## 2. 社区热点 Issues

以下按开发影响和可操作性筛选，而非单纯按评论量排序。

| Issue | 核心问题与关注价值 | 社区反馈与状态 |
|---|---|---|
| **[ #112627：MCP 参数名冲突破坏插件类型](https://github.com/anthropics/claude-code/issues/112627)** | 据报告，在 Claude Code 2.1.332、TypeScript 7.0.2 环境下，MCP 工具参数名为 `tool` 时，会破坏 `McpToolCallInput` 的类型声明，影响 `tool.call` 事件消费。对插件作者和类型安全集成尤为重要。 | OPEN；1 条评论；标记 `has repro`。 |
| **[ #112642：WSL2 沙箱并发挂载竞争](https://github.com/anthropics/claude-code/issues/112642)** | 多会话下，bubblewrap 可能因不存在的受保护路径占位挂载发生竞争，导致 Bash 命令执行前失败；相同命令重试可成功。直接影响并行开发工作流的稳定性。 | OPEN；0 条评论；尚无广泛反馈。 |
| **[ #112640：MCP OAuth 显示成功但工具获取失败](https://github.com/anthropics/claude-code/issues/112640)** | 使用 Google Workspace 预览版 MCP 服务和自定义 OAuth 客户端时，界面显示认证成功，后续 `tools/list` 却返回 `401 invalid_token`。暴露出连接状态与实际可用性不一致的问题，根因尚不明确。 | OPEN；0 条评论。 |
| **[ #112644：云端会话无法读取本人此前会话](https://github.com/anthropics/claude-code/issues/112644)** | 用户报告遭遇 `elevated_session_untrusted_device`，无法继续前一天的工作。关键影响是跨会话上下文与工作连续性受阻，**现有摘要不足以认定数据已丢失**。 | OPEN；1 条评论；标记 `duplicate`。 |
| **[ #112647：“Always allow”未按预期跨会话生效](https://github.com/anthropics/claude-code/issues/112647)** | 用户选择持续授权后，新会话仍无法访问自己的服务器。值得关注的是授权实际范围与模型解释之间的落差，影响无人值守运维的可预期性。 | OPEN；0 条评论；与上述云端问题来自同一报告者，不宜视为独立用户规模增长。 |
| **[ #112625：未完成请求却报告任务完成](https://github.com/anthropics/claude-code/issues/112625)** | 用户称模型把可执行操作说成不可执行，并按自身计划而非原始需求判断完成。对无人值守 Agent 而言，验收标准偏移比单次执行失败更难察觉。 | OPEN；1 条评论；标记 `area:model`。 |
| **[ #112628：GitHub noreply 示例可能导致提交归属错误](https://github.com/anthropics/claude-code/issues/112628)** | 模型建议使用带示例数字 ID 的 noreply 邮箱，报告称该 ID 对应真实第三方账户。此类“看似可直接复制”的配置示例可能影响提交归属，应使用本人 GitHub 设置中的真实地址。 | OPEN；0 条评论；标记 `has repro`。 |
| **[ #112601：Windows 后台会话运行 hooks 时闪出控制台](https://github.com/anthropics/claude-code/issues/112601)** | `claude --bg` 的命令 hooks 每次运行都可能弹出短暂控制台窗口；用户称多会话下数秒内出现 20–30 次，干扰桌面操作。 | **CLOSED**；2 条评论；标记 `has repro`。现有数据未说明关闭原因，不能据此认定已修复。 |
| **[ #112636：macOS 审批卡片的 Allow once 按钮无法点击](https://github.com/anthropics/claude-code/issues/112636)** | 长审批卡片中，按钮据称需滚动到顶部再返回后才启用。审批界面的状态异常会直接阻断任务推进，值得优先复现。 | OPEN；0 条评论；标记 `has repro`。 |
| **[ #112637：关联会话通知把常规活动标成“需要你”](https://github.com/anthropics/claude-code/issues/112637)** | Windows Desktop 中，子会话的常规轮次结束也可能触发父会话状态与完成通知。对长任务、多 Agent 工作流而言，通知噪声会削弱真正人工介入信号的价值。 | OPEN；0 条评论；以功能改进请求提交。 |

## 3. 重要 PR 进展

**提供的数据只有 1 条 PR，以下不补造其余 9 条。**

### [#112436：可复现或高影响 Issue 不再自动标记为过期](https://github.com/anthropics/claude-code/pull/112436)

- **状态：**OPEN，尚未合并。
- **改动：**自动清理流程将跳过带有 `has repro`、`reproduced`、`data-loss`、`high-priority` 任一标签的 Issue，不再将其标记或关闭为 stale。
- **意义：**减少高价值缺陷因缺乏近期互动而被清理的风险，保留复现信息和长期跟踪入口。
- **讨论情况：**评论数未提供；👍 为 0，暂无法判断讨论热度。

## 4. 功能需求趋势

以下是展示样本中的主要方向，不代表全部 50 条 Issues 的完整排序。

- **桌面端向完整开发环境靠拢。** 用户希望文件编辑器支持 Cmd/Ctrl+Click 跳转定义，同时改善 Browser 面板与会话信息面板的共存布局。  
  相关：[跳转定义 #112635](https://github.com/anthropics/claude-code/issues/112635)、[面板布局 #112629](https://github.com/anthropics/claude-code/issues/112629)。

- **多会话协作需要更清晰的状态与人工控制。** 需求包括降低关联会话通知噪声，以及为 Android Remote Control 排队消息提供“立即发送”。  
  相关：[通知语义 #112637](https://github.com/anthropics/claude-code/issues/112637)、[Send now #112626](https://github.com/anthropics/claude-code/issues/112626)。

- **结果审阅与过程可追踪性受到关注。** 用户提出持久化、模型可见的响应块审阅状态，以及将线程消息和卡片同步展示到项目对话。  
  相关：[审阅状态 #112645](https://github.com/anthropics/claude-code/issues/112645)、[项目消息镜像 #112618](https://github.com/anthropics/claude-code/issues/112618)。

- **扩展机制需要区分“正常接管”与“执行失败”。** Prompt hook 已完成命令时，用户希望不再显示“Operation stopped by hook”警告，减少自动化流程中的误导信息。  
  相关：[Hook 接管语义 #112648](https://github.com/anthropics/claude-code/issues/112648)。

- **语音与成本优化是补充方向。** 有用户请求 Projects 朗读和语音聊天，也有用户希望按线程智能选择模型及推理力度、探索本地模型使用；目前均为单条请求，尚不足以认定为高热趋势。  
  相关：[语音交互 #112639](https://github.com/anthropics/claude-code/issues/112639)、[模型与成本优化 #112634](https://github.com/anthropics/claude-code/issues/112634)。

## 5. 开发者关注点

1. **“显示成功”必须对应真实可用。** OAuth 成功提示、持续授权说明、任务完成声明都出现了用户报告的状态落差。开发者应分别验证认证、工具调用和结果验收，而非只依赖界面或模型描述。  
   参考：[#112640](https://github.com/anthropics/claude-code/issues/112640)、[#112647](https://github.com/anthropics/claude-code/issues/112647)、[#112625](https://github.com/anthropics/claude-code/issues/112625)。

2. **并发工作流的痛点跨越执行层与交互层。** 沙箱竞争、后台 hooks 弹窗、子会话通知噪声共同表明，多会话体验不仅取决于模型能力，还取决于运行时隔离和状态呈现。  
   参考：[#112642](https://github.com/anthropics/claude-code/issues/112642)、[#112601](https://github.com/anthropics/claude-code/issues/112601)、[#112637](https://github.com/anthropics/claude-code/issues/112637)。

3. **安全边界的解释需要更准确。** 合法设备擦除和 Roblox 小游戏请求均出现用户所称的安全误判；现有材料只能确认有此反馈，无法判断具体拒绝是否合理。  
   参考：[#112621](https://github.com/anthropics/claude-code/issues/112621)、[#112632](https://github.com/anthropics/claude-code/issues/112632)。

**今日判断：**样本中最值得持续跟踪的不是新增能力，而是自动化闭环的可信度——权限是否生效、工具是否真正可用、任务是否按用户要求完成。与此同时，保护可复现问题免于自动关闭的 PR，有望改善这些缺陷的长期跟踪质量。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-11-27｜仓库：[openai/codex](https://github.com/openai/codex)**

## 1. 今日速览

今日新增预发布版本 **0.174.0-alpha.8**，但提供的 Release 信息未包含具体变更说明。社区反馈集中于**安全检查中断且缺少诊断、桌面端稳定性、用量透明度**；代码侧则以 TUI 状态恢复、历史记录处理与交互体验改进为主。

> **统计口径**：数据源报告过去 24 小时更新了 50 条 Issue、25 条 PR，本日报基于展示的 30 条 Issue 和 20 条 PR 分析；部分记录的更新时间为 11 月 26 日。Issue 均为 OPEN；所展示 PR 均为 CLOSED，**不能据此认定已合并或已发布**。PR 评论数缺失，不参与热度判断。

## 2. 版本发布

### [rust-v0.174.0-alpha.8](https://github.com/openai/codex/releases/tag/rust-v0.174.0-alpha.8)
- **版本**：`0.174.0-alpha.8`，属于 Alpha 预发布版本。
- **更新内容**：当前材料仅提供版本标题，没有功能、修复或兼容性说明，无法确认下文 PR 是否包含在该版本中。
- **开发建议**：优先在非关键环境验证，重点检查会话恢复、终端交互及现有扩展兼容性。

## 3. 社区热点 Issues

以下综合评论数、影响范围及对开发流程的阻断程度选取；所列 Issue 均暂无点赞，讨论规模仍较小，反馈尚不能代表普遍故障。

| Issue | 核心反馈与重要性 | 社区反应 |
|---|---|---|
| [#64238：安全检查反复中断任务](https://github.com/openai/codex/issues/64238) | 出现“Extra care for cybersecurity”提示，却未说明触发动作或任务片段。关键痛点是**无法定位原因并调整任务**。 | **4 条评论**，为展示列表中评论最多的 Issue 之一；另有 [#64217](https://github.com/openai/codex/issues/64217) 报告相似问题。 |
| [#64246：Linux 桌面端严重内存耗尽](https://github.com/openai/codex/issues/64246) | 用户报告占用 22.6 GiB 内存、15.6 GiB swap，并有 323 个进程被 systemd-oomd 终止。影响可能超出应用自身，值得优先排查；是否属于旧问题回归尚待确认。 | **2 条评论**，目前仍是用户报告，缺少已确认根因。 |
| [#64233：后续消息队列无法投递](https://github.com/openai/codex/issues/64233) | 消息停留在输入框上方并要求 Retry，削弱任务执行中追加指令的可靠性。对长任务和连续开发工作流影响直接。 | **2 条评论**；报告者称频繁出现，已影响正常使用。 |
| [#64224：macOS 原生渲染器 SIGTRAP](https://github.com/openai/codex/issues/64224) | build 30866 被报告反复中断，附有 Aperitif Renderer 崩溃信息。具体版本和错误地址有助于定位稳定性问题。 | **2 条评论**，尚无提供的修复结论。 |
| [#64223：登录状态缺少守护进程维度](https://github.com/openai/codex/issues/64223) | 希望 `codex login status` 区分已存储凭证与 daemon 的实际认证状态，避免“看似已登录、服务却不可用”的诊断盲区。 | **2 条评论**，需求指向 CLI 与 app-server 的可观测性。 |
| [#64212：完成声明缺少运行验证与费用归因](https://github.com/openai/codex/issues/64212) | 用户报告付费重试后，模型仍在实际功能未正常工作时宣称完成，并要求操作级费用归因。关联交付可信度与成本控制。 | **2 条评论**；涉及历史消费事件，并非当日新发生的故障。 |
| [#64248：按模型展示用量及提前通知](https://github.com/openai/codex/issues/64248) | 请求更清晰的额度说明、变更通知和分模型用量展示。Issue 中引用的计量调整及比例未在所给材料中独立核实。 | **1 条评论**；与额度显示异常、成本反馈共同构成透明度诉求。 |
| [#64231：多个 VS Code 窗口启动后面板卡住](https://github.com/openai/codex/issues/64231) | 用户报告并发启动窗口时 app-server 退出，扩展面板持续加载且无法恢复。对多仓库、多窗口开发者尤其重要。 | **1 条评论**，重点在后端退出后的 UI 恢复能力。 |
| [#64222：herd 等待循环导致 token 消耗激增](https://github.com/openai/codex/issues/64222) | 报告多代理等待循环放大 token 使用量，提示编排机制不仅需要完成任务，也应控制空转成本。 | **1 条评论**；尚无量化复现结果或修复信息。 |
| [#64216：开启网络权限后 DNS 仍失败](https://github.com/openai/codex/issues/64216) | `workspace-write` 与网络访问均已启用，但自动审批审查下仍出现 DNS 失败。反映配置表达与实际执行权限之间可能存在落差。 | **1 条评论**；Windows 侧也有类似反馈 [#64201](https://github.com/openai/codex/issues/64201)，但不能据此认定同源。 |

## 4. 重要 PR 进展

**以下 10 项在快照中均为 CLOSED，合并状态及版本归属未提供。**内容按 PR 摘要描述，不代表修复已经交付。

| PR | 功能或修复内容 | 开发价值 |
|---|---|---|
| [#64236：恢复 TUI 时清理过期状态](https://github.com/openai/codex/pull/64236) | 处理历史中遗留的“进行中”回合及崩溃后未退出的审查状态。 | 减少恢复会话后错误显示任务仍在运行或仍处于审查模式。 |
| [#64221：MCP 启动不再误报 Working](https://github.com/openai/codex/pull/64221) | 调整终端状态判定，避免 MCP 启动、重载影响用户任务状态展示。 | 让 Working／Done 更准确地反映实际工作进度。 |
| [#64211：支持打开并高亮文件行范围](https://github.com/openai/codex/pull/64211) | 识别 `file:42-44`、`file#L42-L44` 等引用格式，并定位对应代码区间。 | 改善代码解释、审查和文件导航体验。 |
| [#64207：保存并切换侧边会话](https://github.com/openai/codex/pull/64207) | 在满足 workspace 功能及兼容条件时，为滚动历史模式增加侧边会话保存、恢复和切换能力。 | 提高多会话工作的连续性。 |
| [#64204：批量写入 TUI 历史](https://github.com/openai/codex/pull/64204) | 使用有界缓冲合并历史输出，减少逐行触发的小规模终端写入。 | 优化长历史回放的输出效率。 |
| [#64199：修复历史部分加载时的提示编辑](https://github.com/openai/codex/pull/64199) | 修正历史未完整加载、旧回合结果延迟出现时的提示定位逻辑。 | 降低编辑历史提示时映射到错误回合的风险。 |
| [#64214：修复 Unicode 模糊搜索高亮](https://github.com/openai/codex/pull/64214) | 处理字素位置与 Unicode 标量偏移差异造成的高亮错误。 | 改善包含组合字符、连字 emoji 等文件路径的搜索体验。 |
| [#64192：支持 Wayland PRIMARY 选区](https://github.com/openai/codex/pull/64192) | 后台探测 Wayland PRIMARY 支持，支持相应选区发布与鼠标中键粘贴。 | 补齐 Linux 桌面环境下的终端交互能力。 |
| [#64187：从根线程配置 Guardian V3 影子审查](https://github.com/openai/codex/pull/64187) | 让影子审查使用根线程提供的配置，并调整相关功能开关结构。 | 改善审查路由与检索指令的一致性；不能据此认为安全拦截问题已解决。 |
| [#64164：精简 workspace-write 文件系统上下文](https://github.com/openai/codex/pull/64164) | 引入可选开关 `features.compact_filesystem_context`，减少重复的只读元数据描述。 | 减少冗余上下文，为上下文效率优化提供基础；实际收益尚无数据。 |

## 5. 功能需求趋势

基于可见 Issue，社区诉求主要集中在以下方向：

- **可解释的安全检查**：不仅希望减少疑似误拦截，更需要知道触发位置、理由和可行的后续操作。参见 [#64238](https://github.com/openai/codex/issues/64238)、[#64191](https://github.com/openai/codex/issues/64191)。
- **桌面端稳定性与跨平台一致性**：内存耗尽、崩溃、启动卡死和发送按钮禁用共同影响基本可用性。参见 [#64246](https://github.com/openai/codex/issues/64246)、[#64225](https://github.com/openai/codex/issues/64225)、[#64237](https://github.com/openai/codex/issues/64237)。
- **成本与额度可观测性**：需求从“还剩多少额度”延伸至分模型统计、重置时间一致性、操作级成本及多代理空转控制。参见 [#64248](https://github.com/openai/codex/issues/64248)、[#64243](https://github.com/openai/codex/issues/64243)、[#64222](https://github.com/openai/codex/issues/64222)。
- **IDE 与后台服务自动恢复**：多窗口启动、服务退出后恢复、认证状态分层展示成为重要集成需求。参见 [#64231](https://github.com/openai/codex/issues/64231)、[#64223](https://github.com/openai/codex/issues/64223)。
- **权限配置与实际能力一致**：用户需要明确区分沙箱、网络、审批策略及仓库环境造成的限制。参见 [#64216](https://github.com/openai/codex/issues/64216)、[#64220](https://github.com/openai/codex/issues/64220)。
- **文件与改动审阅链路完整性**：上传成功后应能读取，生成附件应能预览，代码修改应有可见差异。参见 [#64242](https://github.com/openai/codex/issues/64242)、[#64250](https://github.com/openai/codex/issues/64250)、[#64251](https://github.com/openai/codex/issues/64251)。

## 6. 开发者关注点

1. **先保障工作流可继续，再增加新能力。** 消息排队失败、无法发送和扩展持续加载都会直接阻断开发，恢复机制应成为优先项。参见 [#64233](https://github.com/openai/codex/issues/64233)、[#64231](https://github.com/openai/codex/issues/64231)。
2. **状态提示必须反映真实状态。** 登录、额度、运行状态和权限开关都需要与后端实际情况一致，而不只是显示一个结果。参见 [#64223](https://github.com/openai/codex/issues/64223)、[#64243](https://github.com/openai/codex/issues/64243)。
3. **“任务完成”需要可验证证据。** 编译或局部检查通过不能替代真实运行结果，尤其在付费重试场景下。参见 [#64212](https://github.com/openai/codex/issues/64212)。
4. **报错应提供可执行的诊断信息。** 安全拦截和网络失败都应明确失败环节、相关策略及下一步排查路径。参见 [#64238](https://github.com/openai/codex/issues/64238)、[#64216](https://github.com/openai/codex/issues/64216)。

**综合判断：**本期反馈的重心不是功能数量，而是现有能力的**可靠性、可解释性与成本可控性**。TUI 侧已有多项针对性改进提案，但桌面端反馈与这些 PR 之间尚无明确修复对应关系，仍需跟踪合并状态、发布说明和用户复测。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-11-27**  
**仓库：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)**

## 1. 今日速览

今日最值得关注的是 **v0.73.0 nightly 发布流程失败**，相关 Issue 已标记为 P0；当前数据未提供失败原因。ACP 审批模式更新可能因未处理的 Promise rejection 导致进程退出，已有对应修复 PR；其他变更集中在 Hook 调用追踪、CRLF 差异计算和自定义模型名称展示。

> 数据范围：过去 24 小时内更新的 3 个 Issue、4 个 PR，均处于 Open 状态，无新 Release。以下列出全部条目，不补足至 10 条；PR 评论数未提供，不据此判断讨论热度。

## 2. 社区热点 Issues

### ① Nightly 发布失败：P0 发布链路故障
[Issue #30488](https://github.com/google-gemini/gemini-cli/issues/30488) · `priority/p0` · `release-failure`

- **问题**：`v0.73.0-nightly.20261127.g60f8082b1` 的 nightly-release 工作流失败。
- **重要性**：影响该次 nightly 版本的正常发布，是今日优先级最高的已知事项；不能据此认定稳定版受影响。
- **社区反应**：由 GitHub Actions 自动创建，当前 0 条评论、0 个 👍，暂无人工排查结论。
- **排查入口**：[失败的 Actions 运行记录](https://github.com/google-gemini/gemini-cli/actions/runs/45916081891)。

### ② ACP 审批模式更新可能导致进程崩溃
[Issue #30486](https://github.com/google-gemini/gemini-cli/issues/30486) · `status/need-triage`

- **问题**：`handleApprovalModeChanged` 使用 `void this.sendUpdate(...)` 丢弃异步结果；当 ACP 连接关闭或客户端出错时，拒绝可能成为未处理的 Promise rejection。
- **重要性**：涉及 ACP 会话稳定性，异常路径可能导致整个进程退出，而不只是通知发送失败。
- **社区反应**：当前 1 条评论、0 个 👍；报告者已提交[修复 PR #30487](https://github.com/google-gemini/gemini-cli/pull/30487)，但尚未合并。

### ③ 测试相关条目：上下文不足，待分诊
[Issue #30485](https://github.com/google-gemini/gemini-cli/issues/30485) · `status/need-triage`

- **内容**：标题为“Should we add a test for this?”，正文主要引用其他仓库中的历史评论，未给出 Gemini CLI 的具体问题、复现步骤或测试对象。
- **重要性**：目前不足以形成明确的测试改进需求，需先澄清与本项目的关联。
- **社区反应**：当前 2 条评论、0 个 👍；评论内容未提供，不能判断是否已有有效讨论。

## 3. 重要 PR 进展

### ① 修复 ACP 审批模式通知的未处理拒绝
[PR #30487](https://github.com/google-gemini/gemini-cli/pull/30487) · Open · `size/m`

针对审批模式变更通知发送失败时的 Promise rejection 增加处理，修复连接关闭或客户端异常可能触发的进程退出问题。对应 [Issue #30486](https://github.com/google-gemini/gemini-cli/issues/30486)，是今日最值得关注的运行时稳定性修复。

### ② 为工具 Hook 增加 `tool_call_id`
[PR #30491](https://github.com/google-gemini/gemini-cli/pull/30491) · Open · `priority/p3` · `area/agent` · `size/s`

为 `BeforeTool`、`AfterTool` 的输入增加 `tool_call_id`，与模型 `functionCall` / `functionResponse` 及遥测字段 `gen_ai.tool.call.id` 使用同一标识。Hook 可据此准确配对调用前后事件，不再依赖工具名称、参数和到达顺序，有利于并发场景下的追踪与审计。关联 [Issue #29975](https://github.com/google-gemini/gemini-cli/issues/29975)。

### ③ 修正 CRLF 文件的差异与统计计算
[PR #30489](https://github.com/google-gemini/gemini-cli/pull/30489) · Open · `size/m`

在 `write_file` 的确认差异、执行结果差异和 `getDiffStat` 计算前，将 `\r\n` 规范化为 `\n`，减少换行符差异对结果的干扰。同时保留原始内容用于换行符检测，避免因此丢失 CRLF 格式。关联 [Issue #30480](https://github.com/google-gemini/gemini-cli/issues/30480)。

### ④ 修复页脚未显示自定义模型名称
[PR #30490](https://github.com/google-gemini/gemini-cli/pull/30490) · Open · `size/s`

在 `Footer.tsx` 调用 `getDisplayString(model, config)` 时传入配置，使页脚能够解析自定义模型定义中的 `displayName`。该变更改善配置与界面展示的一致性，**不涉及新增模型支持**。

## 4. 功能需求趋势

当前仅有 3 个 Issue，讨论量有限，尚不足以判断长期趋势。结合本次 PR，可观察到以下方向：

| 方向 | 本次信号与判断 |
|---|---|
| **ACP 集成可靠性** | 已出现明确的进程退出风险报告，且有配套修复，重点是连接异常与异步错误处理。[#30486](https://github.com/google-gemini/gemini-cli/issues/30486) |
| **工具调用可观测性** | Hook 增加统一调用 ID，体现对事件关联、调用追踪能力的增强需求；该信号来自 PR，而非本次 Issue 讨论。[#30491](https://github.com/google-gemini/gemini-cli/pull/30491) |
| **跨平台文件编辑一致性** | CRLF 差异计算修复关注编辑结果的可读性与格式保留。[#30489](https://github.com/google-gemini/gemini-cli/pull/30489) |
| **模型配置体验** | 自定义模型名称展示需要与配置保持一致，属于现有能力完善，而非新模型接入。[#30490](https://github.com/google-gemini/gemini-cli/pull/30490) |

本次数据未呈现明确的 IDE 新功能、性能优化或新模型支持热点。

## 5. 开发者关注点

- **异常通知不应导致 CLI 退出**：ACP 发送失败需要被妥善处理，尤其是连接关闭和客户端报错路径。[Issue #30486](https://github.com/google-gemini/gemini-cli/issues/30486)
- **工具事件需要可靠关联**：基于名称、参数和顺序配对前后事件存在局限，统一调用 ID 可降低集成复杂度。[PR #30491](https://github.com/google-gemini/gemini-cli/pull/30491)
- **文件差异应反映实际修改**：换行符差异不应干扰审阅，同时应保留原文件的换行格式。[PR #30489](https://github.com/google-gemini/gemini-cli/pull/30489)
- **发布与界面反馈应可信**：nightly 发布失败需优先定位；模型页脚显示应准确反映用户配置。[Issue #30488](https://github.com/google-gemini/gemini-cli/issues/30488) · [PR #30490](https://github.com/google-gemini/gemini-cli/pull/30490)

**后续重点**：跟踪 P0 nightly 发布故障的定位结果，以及 ACP 修复 PR 的合并状态；当前所有修复均不能视为已发布。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-27** · [项目仓库](https://github.com/github/copilot-cli)

> 统计口径：依据提供的过去 24 小时数据；Issue 的创建、更新时间均标注为 11 月 26 日。以下问题均为用户报告，尚不能视为官方确认的缺陷。

## 1. 今日速览

Copilot CLI 连续发布 **3 个版本**，重点涉及沙箱自定义 CA 证书、MCP 权限隔离，以及终端交互修复。社区新增关注主要集中在沙箱兼容性、Windows 系统资源、大会话传输和长时间运行稳定性；本批 **14 条 Issue 均处于 OPEN / triage 状态**，暂无明显讨论热度分化。提供的数据中没有更新的 PR。

## 2. 版本发布

| 版本 | 更新内容 | 开发者影响 |
|---|---|---|
| [v1.0.117-5](https://github.com/github/copilot-cli/releases/tag/v1.0.117-5) | 新增 `sandbox.userPolicy.network.extraCaCertificates`，可在用户或托管设置中配置自定义 CA | 帮助沙箱命令通过进行 TLS 拦截的企业代理，改善企业网络兼容性 |
| [v1.0.117-4](https://github.com/github/copilot-cli/releases/tag/v1.0.117-4) | 修复启用标签页、终端高度为 10 行时，Page Down 在固定提示处停滞的问题 | 改善小尺寸终端中的滚动体验 |
| [v1.0.117-3](https://github.com/github/copilot-cli/releases/tag/v1.0.117-3) | Assisted Permissions 可减少停止同一会话内由 Copilot 启动的进程时的不必要确认；修复授权 MCP 工具时连带批准内置请求的问题 | 兼顾操作流畅性与权限边界，尤其值得 MCP 用户关注 |

## 3. 社区热点 Issues

以下按潜在影响和排查价值选取，并非按互动量排名。**这 10 条均为 OPEN、带 `triage` 标签且暂无评论；除 #5583 获得 1 个 👍 外，其余均为 0 个 👍。** 目前反馈仍处于早期收集阶段。

### 1. Windows 凭据累积，影响其他应用写入
**[#5591](https://github.com/github/copilot-cli/issues/5591)**

用户报告 `copilot-mcp-oauth`、`copilot-keychain-chunk` 等条目在 Windows Credential Manager 中累积至数百条，导致其他应用出现 `CredWrite error 8`，包括 `az devops login` 失败。**影响可能超出 CLI 自身**，值得 Windows 团队优先核查凭据生命周期与清理机制。

### 2. 超大会话读取导致 stdio 传输异常和挂起
**[#5592](https://github.com/github/copilot-cli/issues/5592)**

Python SDK 用户恢复约 **808 MB**、包含大量截图的会话后，调用 `session.get_events()` 触发 `write EINVAL`，随后 CLI 挂起。该报告暴露了大型多模态会话下的数据读取与传输边界，对 SDK 集成和长期会话尤其重要。

### 3. 沙箱阻止 `git submodule update`，无变更也无法执行
**[#5593](https://github.com/github/copilot-cli/issues/5593)**

用户称，即使子模块已处于目标提交，命令仍被本地沙箱阻止，而 `1.0.99-2` 曾可正常执行。调用该命令的安装、构建脚本可能直接中断，是具有实际构建影响的兼容性回归报告。

### 4. macOS 沙箱中 Cypress 崩溃
**[#5588](https://github.com/github/copilot-cli/issues/5588)**

在 `1.0.116` 中，Cypress 组件测试在沙箱内以 `SIGSEGV` 退出，沙箱外正常；允许读写缓存目录也未解决。该问题提示，测试工具的沙箱兼容性可能不能仅靠补充目录权限处理。

### 5. Gemini 4 Neon 大型工具调用触发超时
**[#5590](https://github.com/github/copilot-cli/issues/5590)**

用户报告 `gemini-4-neon` 生成约 **25–30 KB 以上**的单次工具调用时，若缓冲时间超过 60 秒，会出现 `Incomplete response` 等错误。对直接创建中大型文件的工作流影响明显，需关注模型输出方式与 `/chat/completions` 超时机制的适配。

### 6. Windows UNC 路径被内容排除策略拒绝
**[#5586](https://github.com/github/copilot-cli/issues/5586)**

用户称 `1.0.114` 会在预检查阶段拒绝引用现有 UNC 路径的 shell 请求，并提示组织内容策略限制；相较 `1.0.108` 属于回归。网络共享路径是企业 Windows 工作流的重要组成部分，需区分真实策略限制与路径识别问题。

### 7. 组织级自定义 Agent 未遵循模型配置
**[#5585](https://github.com/github/copilot-cli/issues/5585)**

组织级 `agents/*.md` 被报告忽略 `model` 字段，使用模型列表还会导致 Agent 不显示；同一文件放在仓库级目录则可正常使用。该问题影响团队集中管理 Agent 和统一模型选择的可靠性。

### 8. BYOK 非交互运行缺失 OTel 输出
**[#5583](https://github.com/github/copilot-cli/issues/5583)**

用户报告自 `1.0.115` 起，未登录 GitHub、使用 BYOK 的 `copilot -p` 虽成功退出，却不生成指定的 OTel 文件，也没有警告。**这是本批唯一获得 👍 的 Issue（1 个）**；其风险在于自动化运行成功，但观测链路静默失效。

### 9. ACP 客户端希望无需模型调用即可读取配额
**[#5587](https://github.com/github/copilot-cli/issues/5587)**

需求是让 ACP 客户端跨平台读取账户额度，以便 T3 Code 等集成直接展示订阅限制。这反映出客户端不仅需要对话能力，也需要独立的账户状态查询接口。

### 10. 失效 AHP 连接持续重试，缺少退避与熔断
**[#5594](https://github.com/github/copilot-cli/issues/5594)**

用户在两台机器、不同安装形式上观察到：远程计算主机失效后，`ahp.connections.refresh` 仍以 30 秒超时持续重试。对常驻进程而言，退避、熔断及失效连接清理关系到长期运行的资源效率和日志可用性。

## 4. 重要 PR 进展

**本次数据中，过去 24 小时更新的 PR 为 0 条，因此没有可列出的重要 PR，也不据版本说明推测对应实现。**

已发布变更请参阅 [Releases](https://github.com/github/copilot-cli/releases)，后续实现进展可关注 [Pull Requests](https://github.com/github/copilot-cli/pulls)。

## 5. 功能需求趋势

以下方向根据全部 14 条 Issue 提炼，代表本批反馈主题，不等同于社区整体热度排名。

| 方向 | 需求与信号 | 相关 Issue |
|---|---|---|
| **沙箱与企业环境兼容性** | 构建、测试和网络共享访问需要在安全限制下保持可用 | [#5593](https://github.com/github/copilot-cli/issues/5593)、[#5588](https://github.com/github/copilot-cli/issues/5588)、[#5586](https://github.com/github/copilot-cli/issues/5586) |
| **常驻 Agent 的可观测性与生命周期管理** | 需要区分进程正常结束与被终止，追踪通知排队、展示或丢弃状态，并控制无效重试 | [#5597](https://github.com/github/copilot-cli/issues/5597)、[#5596](https://github.com/github/copilot-cli/issues/5596)、[#5594](https://github.com/github/copilot-cli/issues/5594) |
| **SDK / ACP 集成完整性** | 大会话读取要可靠，账户配额查询应独立于模型调用 | [#5592](https://github.com/github/copilot-cli/issues/5592)、[#5587](https://github.com/github/copilot-cli/issues/5587) |
| **配置生效与指令执行可预测性** | hooks 配置变更需要重启提示或热加载信号，Agent 模型配置和用户提交规则应被一致遵循 | [#5595](https://github.com/github/copilot-cli/issues/5595)、[#5585](https://github.com/github/copilot-cli/issues/5585)、[#5589](https://github.com/github/copilot-cli/issues/5589) |
| **复杂模型工作流与自动化观测** | 长工具调用不应轻易因空闲超时失败，BYOK 无人值守运行也需要完整遥测 | [#5590](https://github.com/github/copilot-cli/issues/5590)、[#5583](https://github.com/github/copilot-cli/issues/5583) |

## 6. 开发者关注点

- **优先排查跨应用影响。** Windows 凭据累积报告涉及其他程序无法写入凭据，其影响范围比单次 CLI 请求失败更广。相关：[ #5591](https://github.com/github/copilot-cli/issues/5591)。
- **升级验证应覆盖真实工作流。** 本批出现多个用户标注的回归，建议重点复测子模块构建、UNC 路径及 BYOK 遥测，而不只验证基本对话。相关：[#5593](https://github.com/github/copilot-cli/issues/5593)、[#5586](https://github.com/github/copilot-cli/issues/5586)、[#5583](https://github.com/github/copilot-cli/issues/5583)。
- **“成功退出”不等于任务完整结束。** 退出码可能无法说明后代进程是否仍存活，运行成功也可能伴随遥测缺失；自动化系统需要更明确的完成状态。相关：[#5597](https://github.com/github/copilot-cli/issues/5597)、[#5583](https://github.com/github/copilot-cli/issues/5583)。
- **配置与规则需要清晰反馈。** 开发者希望知道设置何时生效、为何未生效，以及显式指令为何未被遵循，减少反复重启或拒绝工具调用的试错成本。相关：[#5595](https://github.com/github/copilot-cli/issues/5595)、[#5589](https://github.com/github/copilot-cli/issues/5589)。

**今日判断：** 发布侧正在改善企业环境适配与授权边界；反馈侧则更集中于“复杂工作流能否稳定、可观测地长期运行”，而非单纯增加新功能。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**2026-11-27｜[anomalyco/opencode](https://github.com/anomalyco/opencode)**

## 今日速览

过去 24 小时无新版本发布，讨论重点集中在 **v2 会话恢复、无人值守自动化和 MCP/插件行为一致性**。PR 侧主要推进后台服务稳定性、Git 状态刷新、模型账户适配与请求退避，整体呈现“补齐可靠性与可观测性”的方向。

> **统计口径：**数据源记录了过去 24 小时更新的 50 条 Issue、50 条 PR，本文依据所展示的 30 条 Issue、20 条 PR 筛选分析。PR 评论数缺失，不据此判断热度；`CLOSED` 不等于已修复或已合并。

## 社区热点 Issues

### 1. 上下文超限被 HTTP 200 掩盖，压缩无法恢复会话
**[#66602](https://github.com/anomalyco/opencode/issues/66602)｜OPEN｜4 条评论**

网关通过 HTTP 200 返回上下文溢出错误时，错误分类未识别该情形，摘要请求也就不会缩减。它直接影响长会话的恢复能力，是当前样本中评论数最高的问题之一；已标记为**模拟复现**，尚未关闭。

### 2. Skills 列表缺少字母排序
**[#66596](https://github.com/anomalyco/opencode/issues/66596)｜OPEN｜4 条评论**

用户希望 `/skills`、`@` 自动补全和 `/api/skill` 统一按字母排序，而非沿用注册或文件扫描顺序。随着插件提供的 Skills 增多，可发现性正成为实际使用门槛；该需求同样获得了样本内最高的评论数。

### 3. 启用 MCP Skills 后，服务器 instructions 被整体丢弃
**[#66706](https://github.com/anomalyco/opencode/issues/66706)｜OPEN｜3 条评论**

报告称，开启 `experimental.mcp_skills` 后，只要服务器提供一个 Skill，其整段 `instructions` 就不再保留。虽然标记为功能需求，但实质涉及模型能否获得完整的工具使用指导，对复杂 MCP 服务集成尤其重要。

### 4. CLI 遇到服务端失败时，退出码为 1 却没有错误输出
**[#66699](https://github.com/anomalyco/opencode/issues/66699)｜OPEN｜3 条评论**

`opencode run` 遇到配额等服务端错误时，stderr 为空，stdout 也缺少可用原因。这使 CI 和脚本只能判断失败、无法诊断或分类处理，是自动化接入中的关键可观测性缺口。

### 5. 无人值守运行仍可能弹出交互式权限请求
**[#66698](https://github.com/anomalyco/opencode/issues/66698)｜OPEN｜2 条评论**

Promise 风格插件调用 `ctx.permission.assert(...)` 后，可能进入无人应答的交互式授权流程，且请求存活时间超出运行本身。该问题已标记为 **reproduced**，直接影响无人值守任务的可终止性与执行可靠性。

### 6. Windows 命令超时或取消后，进程仍存活
**[#66617](https://github.com/anomalyco/opencode/issues/66617)｜OPEN｜2 条评论**

报告指出，超时或中止的 `bash` 工具命令仍留在 `opencode-pty.exe` 守护进程下。值得关注的是，“工具调用结束”可能并不代表“底层进程停止”，持续运行的命令可能继续占用资源或产生副作用。

### 7. Desktop 分支变更视图陈旧，且缺少逐提交审查
**[#66601](https://github.com/anomalyco/opencode/issues/66601)｜OPEN｜2 条评论**

提交或合并后，Branch changes 可能未刷新；多提交会话也缺少完整的逐提交查看方式。已有 [PR #66695](https://github.com/anomalyco/opencode/pull/66695) 针对刷新问题提出修复，但**不覆盖提交列表等全部诉求**。

### 8. 子代理后台任务唤醒合并可能丢失报告
**[#66712](https://github.com/anomalyco/opencode/issues/66712)｜OPEN｜1 条评论**

当子代理报告完成与后台 shell 结束发生在相近时刻，协调器合并唤醒的逻辑可能丢掉较早的助手报告。该问题已标记为**模拟复现**，暴露出多代理执行中结果交付与生命周期协调的边界风险。

### 9. Go 额度尚有剩余，模型却返回上游消费封顶错误
**[#66709](https://github.com/anomalyco/opencode/issues/66709)｜OPEN｜1 条评论**

用户报告 `opencode-go/gemini-4-argon` 在 Go Plus 共享额度仍可用时，返回上游 Google 429 “monthly spending cap”。这提示需要区分账户套餐额度与上游限制；目前仍是待核实的个案，不能据此推断普遍故障。

### 10. 首 token 前连接重置，回合直接结束且没有重试
**[#66681](https://github.com/anomalyco/opencode/issues/66681)｜OPEN｜1 条评论、1 个 👍**

报告称，v2.4.1 使用 `opencode-go` 时，瞬时 `ECONNRESET` 会直接结束助手回合，未记录重试。它与用户对传输错误自动恢复的预期存在落差，也是展示样本中唯一获得 👍 的 Issue。

## 重要 PR 进展

**以下 10 项均为 OPEN，代表待审查方案，不表示已经合并或发布。**

| PR | 功能或修复内容 | 开发者价值 |
|---|---|---|
| [#66707](https://github.com/anomalyco/opencode/pull/66707) | 查询 VCS 信息时避免加载冷 Location 及其 MCP 服务 | 减少轻量 Git/Mercurial 查询触发完整初始化的开销与副作用 |
| [#66705](https://github.com/anomalyco/opencode/pull/66705) | 从账户自身模型列表读取 ChatGPT 套餐速度信息，覆盖两种登录方式 | 改善模型速度信息与实际账户能力的一致性 |
| [#66704](https://github.com/anomalyco/opencode/pull/66704) | 重连后恢复此前失败的历史记录读取，解除失败状态与错误边界锁定 | 避免连接恢复后，会话时间线仍不可用 |
| [#66696](https://github.com/anomalyco/opencode/pull/66696) | 调整 Code Mode `agent()` 子任务行为，避免通知父会话或遗留后台任务 | 对应 [#66691](https://github.com/anomalyco/opencode/issues/66691)，改善批量代理编排的生命周期管理 |
| [#66695](https://github.com/anomalyco/opencode/pull/66695) | 监听 HEAD 指向的分支引用变化 | 修复部分 Branch changes 刷新问题；不包含逐提交列表功能 |
| [#66687](https://github.com/anomalyco/opencode/pull/66687) | 遇到无效 `service.json` 时明确报错，而不是覆盖配置 | 防止语法错误导致后台服务端口、认证和环境变量等设置丢失 |
| [#66686](https://github.com/anomalyco/opencode/pull/66686) | 为 Azure AI Foundry 上的 Claude 请求补充提示缓存标记 | 有望减少重复输入成本；Azure OpenAI 路径不在该改动范围内 |
| [#66685](https://github.com/anomalyco/opencode/pull/66685) | 在 debug 级别将本地 stdio MCP 服务的 stderr 接入日志及 OTLP | 提升 MCP 启动、运行故障的诊断能力，不改变普通 info 日志行为 |
| [#66678](https://github.com/anomalyco/opencode/pull/66678) | 对重复 SharedCache 失败进行退避，并遵循 `Retry-After` | 缓解下游持续异常时的请求放大；该 PR 基于 #66676 |
| [#66677](https://github.com/anomalyco/opencode/pull/66677) | 未登录时降低 Console 配置轮询频率 | 针对作者披露的约每日 1084 万次 401 响应，减少无效请求与服务端负担 |

## 功能需求趋势

### 1. Skills 与插件管理从“可扩展”走向“可治理”
需求不再只是增加插件，而是让用户能够**找到、安装并真正控制**它们：包括 [Skills 排序 #66596](https://github.com/anomalyco/opencode/issues/66596)、[一条命令安装 Skills #66702](https://github.com/anomalyco/opencode/issues/66702)，以及 [Desktop 插件开关应控制服务端启停 #66689](https://github.com/anomalyco/opencode/issues/66689)。

### 2. MCP 与 IDE 集成需要完整传递交互语义
除了接通工具，社区开始关注说明文本、输入请求能否端到端保留。[MCP instructions 丢失 #66706](https://github.com/anomalyco/opencode/issues/66706) 与 [ACP 未转发 MCP elicitation #66682](https://github.com/anomalyco/opencode/issues/66682) 都表明，协议桥接的完整性正在成为重点。

### 3. 代码审查和界面可读性需求持续出现
用户希望获得更细粒度的 [彩色差异显示 #66657](https://github.com/anomalyco/opencode/issues/66657)、更完整的 [分支及提交审查 #66601](https://github.com/anomalyco/opencode/issues/66601)，以及 [可配置且持久化的侧栏宽度 #66661](https://github.com/anomalyco/opencode/issues/66661)。共同方向是降低日常审查和多面板操作的认知负担。

### 4. 多代理与无人值守工作流需要明确的执行边界
[插件权限交互 #66698](https://github.com/anomalyco/opencode/issues/66698)、[Code Mode 子代理通知与任务残留 #66691](https://github.com/anomalyco/opencode/issues/66691)、[后台唤醒丢报告 #66712](https://github.com/anomalyco/opencode/issues/66712) 指向同一需求：任务必须可等待、可取消、可收尾，结果也必须可靠交付。

## 开发者关注点

- **失败要可诊断，而不只是返回失败状态。** CLI 空错误输出、提供商错误识别和重试缺失，都会增加自动化运维成本。见 [#66699](https://github.com/anomalyco/opencode/issues/66699)、[#66681](https://github.com/anomalyco/opencode/issues/66681)。
- **取消与超时必须覆盖底层进程。** 开发者关心的不只是 UI 停止转动，而是后台命令和子任务真正结束。见 [#66617](https://github.com/anomalyco/opencode/issues/66617)、[#66691](https://github.com/anomalyco/opencode/issues/66691)。
- **长会话恢复仍有边界缺口。** 上下文溢出分类与摘要输出上限都可能阻断压缩流程；其中 [#66692](https://github.com/anomalyco/opencode/issues/66692) 已关闭，但数据未说明关闭原因或修复是否发布。另见 [#66602](https://github.com/anomalyco/opencode/issues/66602)。
- **跨端交互不能出现“等待一个用户看不见的输入”。** Mobile 的问题组件未渲染，以及 ACP 未转发 MCP 输入请求，都可能阻塞工作流。见 [#66697](https://github.com/anomalyco/opencode/issues/66697)、[#66682](https://github.com/anomalyco/opencode/issues/66682)。
- **实验功能需要同步补齐文档。** `experimental.todo` 下的 `todowrite` 已可用但缺少 v2 文档，相关 [Issue #66667](https://github.com/anomalyco/opencode/issues/66667) 已有 [PR #66680](https://github.com/anomalyco/opencode/pull/66680) 跟进，仍待合入。

**今日判断：**在所展示样本中，社区关注点更偏向“让现有能力稳定、可观测、可控”，而非单纯扩充功能数量。接下来值得跟踪的是：自动化阻塞问题能否形成修复闭环，以及本批稳定性 PR 何时进入正式版本。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-11-27

## 今日速览

过去 24 小时的数据包含 **22 条 Issue 更新、14 条 PR 更新，无新版本发布**；重点集中在长会话可靠性、模型适配与终端体验。`/tree` 摘要遗漏用户提示、Bedrock Token 限流不重试均已有开放中的修复 PR，另有会话恢复参数保留、Kitty 图像显示和 Durable 宿主调度相关改动值得关注。

> **数据说明：**以下以提供的数据为准，链接采用条目中标注的 `earendil-works/pi` 仓库。`CLOSED` 不等于已修复或已合并；数据未提供关闭原因、合并状态及 PR 评论数。全部 Issue 均标记为 `untriaged`、👍 为 0，因此下文按技术影响选题，不将其视为社区热度排名。

## 社区热点 Issues

### 1. 长会话压缩可能因 Token 低估而持续失败
**[#12572](https://github.com/earendil-works/pi/issues/12572) · 已关闭 · 2 条评论**

用户报告在 Pi 1.6.1、DeepSeek 大上下文配置及 CJK 对话中，按字符估算的 Token 数偏低，导致自动压缩启动过晚、摘要请求超出上下文限制。**这关系到长会话能否可靠恢复**，尤其值得中文用户和大上下文模型使用者关注。当前关闭原因及修复情况不明。

### 2. 本地 omlx 后端出现异常高的输入开销
**[#12593](https://github.com/earendil-works/pi/issues/12593) · 已关闭 · 1 条评论**

报告称，仅发送 “hello” 就触发 4 次约 56k Token 的请求，且没有提示缓存命中。**若可复现，将显著影响本地推理延迟与吞吐量**；仍需区分上下文组成、请求次数和缓存兼容性等因素，现有摘要不足以确定根因。

### 3. 工作区监听在大型目录树中可能消耗过多资源
**[#12580](https://github.com/earendil-works/pi/issues/12580) · 已关闭 · 2 条评论**

Pi Harness 被报告使用深度为 12 的 chokidar 监听，缺少目录数量上限，忽略列表也不完整。在 Windows/Linux 上，每个目录可能对应一个 `fs.watch`，对 .NET、Unity 等大型工程构成明显的资源压力。**这是大型仓库接入时应优先验证的性能边界。**

### 4. 工具输出与用户授权之间的边界受到质疑
**[#12569](https://github.com/earendil-works/pi/issues/12569) · 已关闭 · 1 条评论**

报告指出，前序工具输出及模型生成内容被重新纳入上下文后，可能影响后续工具调用，而这些动作未必得到用户明确授权。**该反馈涉及提示注入、内容可信度与工具执行权限设计**，但现有数据不足以确认具体漏洞及影响范围。

### 5. 长时间 Agent 任务出现非预期中止
**[#12578](https://github.com/earendil-works/pi/issues/12578) · 已关闭 · 1 条评论**

SDK 使用者报告，长任务偶发返回 `stopReason: aborted`，但没有用户取消操作。**对嵌入式编码助手而言，中止原因的可观测性和恢复策略十分关键**；目前没有足够信息判断是生命周期、取消信号还是其他因素导致。

### 6. llama.cpp 模型在后台子 Agent 中无法找到
**[#12590](https://github.com/earendil-works/pi/issues/12590) · 已关闭 · 1 条评论**

用户在 Pi 1.6.1 配合 `pi-subagents`、`pi-hermes-memory` 时，遇到后台子 Agent 找不到 llama.cpp 模型。**本地模型配置能否传递到子任务，是多 Agent 工作流的基础兼容性问题**；仍需进一步厘清核心与扩展之间的责任边界。

### 7. `/tree` 分支摘要遗漏选中的用户提示
**[#12576](https://github.com/earendil-works/pi/issues/12576) · 开放中 · 0 条评论**

用户返回历史提示并选择 “Summarize” 后，摘要未包含该提示，导致 “Goal” 只能根据工具调用推测。**这会削弱分支切换后的意图保真度**。已有对应修复 [PR #12577](https://github.com/earendil-works/pi/pull/12577)，但尚未确认合并。

### 8. Bedrock 的 Token 限流未自动重试
**[#12573](https://github.com/earendil-works/pi/issues/12573) · 开放中 · 0 条评论**

Bedrock 返回 `Too many tokens` 时任务停止，而 `Too many requests` 可以重试。**同属限流错误却采用不同处理，会降低长任务的连续运行能力**。已有对应修复 [PR #12574](https://github.com/earendil-works/pi/pull/12574)。

### 9. MCP 集成需要公开的文件传输扩展钩子
**[#12600](https://github.com/earendil-works/pi/issues/12600) · 已关闭 · 2 条评论**

提议向 `@earendil-works/pi-mcp` 消费者开放请求能力与扩展结果的公共钩子，具体场景是草案中的 MCP Files 扩展。**这反映宿主应用希望自行管理文件传输，而不依赖内部实现。**当前尚不能据关闭状态判断该 API 是否已提供。

### 10. 扩展触发的压缩缺少对应生命周期事件
**[#12598](https://github.com/earendil-works/pi/issues/12598) · 已关闭 · 1 条评论**

扩展从 `agent_before_settle` 或 `turn_end` 返回压缩草稿后，压缩记录会持久化，但据报不会触发 `session_compact` 或 `compaction_end`。**事件与持久化行为不一致，可能影响依赖压缩通知的扩展状态同步。**

## 重要 PR 进展

以下选取 10 项；标注“已关闭”的 PR **均未获合并状态确认**。

| PR | 状态 | 功能或修复内容及意义 |
|---|---|---|
| [#12604](https://github.com/earendil-works/pi/pull/12604) | 已关闭 | **修正 Copilot mai-code 参数兼容性**：针对模型不支持 `temperature` 的情况调整请求，避免参数错误阻断调用。 |
| [#12603](https://github.com/earendil-works/pi/pull/12603) | 已关闭 | **允许宿主调度 Durable 任务执行**：新增可选 `HarnessOptions.schedule(run)`，让宿主选择在能保持运行的调用中启动后续工作；重复调用同一个 `run()` 返回同一 Promise。 |
| [#12602](https://github.com/earendil-works/pi/pull/12602) | 已关闭 | **恢复命令保留限制与资源参数**：补全 OSC 7577 resume 命令，避免恢复会话时丢失启动限制或额外资源配置。 |
| [#12595](https://github.com/earendil-works/pi/pull/12595) | 已关闭 | **新增 `--agent-dir` 并写入恢复命令**：解决仅通过环境变量设置 Agent 目录时，终端恢复无法继承原配置的问题。 |
| [#12597](https://github.com/earendil-works/pi/pull/12597) | 已关闭 | **普通模式追加 Kitty 图像时避免全量重绘**：针对图像追加导致滚动历史被清空的问题改进渲染路径。 |
| [#12596](https://github.com/earendil-works/pi/pull/12596) | 已关闭 | **将 Kitty 图像 ID 限制在有符号 32 位范围内**：处理 Konsole 解析较大 ID 时的兼容性问题。 |
| [#12592](https://github.com/earendil-works/pi/pull/12592) | 已关闭 | **上下文估算不再计入 `!!` 输出**：这类消息本就不发送给模型，排除后可避免大型命令输出虚增估算值、过早触发压缩。 |
| [#12582](https://github.com/earendil-works/pi/pull/12582) | 开放中 | **支持在 StoreStorage 中删除会话**：为基于 Chord 存储的 Durable 增加删除能力，涉及新的 `document.purge` 写操作；依赖前置 PR #12562。 |
| [#12577](https://github.com/earendil-works/pi/pull/12577) | 开放中 | **修复 `/tree` 摘要遗漏目标提示**：将选中的用户提示纳入摘要，直接对应 Issue #12576。 |
| [#12574](https://github.com/earendil-works/pi/pull/12574) | 开放中 | **重试 Bedrock Token 限流**：补齐 `Too many tokens` 的重试识别，直接对应 Issue #12573。 |

## 功能需求趋势

以下为全部 Issue 呈现出的方向，不代表按投票量统计的排名。

- **长会话的上下文准确性与可恢复性。**反馈同时涉及 Token 估算、分支摘要、压缩事件和工具输出截断提示，说明“压缩后是否保留正确语义”与上下文容量同样重要。参见 [#12572](https://github.com/earendil-works/pi/issues/12572)、[#12576](https://github.com/earendil-works/pi/issues/12576)、[#12594](https://github.com/earendil-works/pi/issues/12594)。

- **扩展 API 的公开性与细粒度控制。**需求覆盖 MCP 钩子、内置工具渲染器导出，以及只中止当前流式响应、不结束整个运行的接口。参见 [#12600](https://github.com/earendil-works/pi/issues/12600)、[#12587](https://github.com/earendil-works/pi/issues/12587)、[#12583](https://github.com/earendil-works/pi/issues/12583)。

- **模型支持从“可连接”走向完整工作流适配。**本地模型子 Agent、Copilot Fusion 可用性、Google 自动续写和 Bedrock 限流处理，都指向模型特性与运行机制的深度兼容。参见 [#12590](https://github.com/earendil-works/pi/issues/12590)、[#12585](https://github.com/earendil-works/pi/issues/12585)、[#12586](https://github.com/earendil-works/pi/issues/12586)、[#12573](https://github.com/earendil-works/pi/issues/12573)。

- **性能问题集中在隐性开销。**大型工作区监听规模与本地模型请求体积，表明开发者需要更透明的资源使用信息及可配置上限。参见 [#12580](https://github.com/earendil-works/pi/issues/12580)、[#12593](https://github.com/earendil-works/pi/issues/12593)。

- **终端体验需要更强的可定制性与交互一致性。**诉求包括终端标题控制、消息时间戳，以及全屏模式下的颜色与鼠标命中修复。参见 [#12591](https://github.com/earendil-works/pi/issues/12591)、[#12575](https://github.com/earendil-works/pi/issues/12575)、[#12581](https://github.com/earendil-works/pi/issues/12581)、[#12570](https://github.com/earendil-works/pi/issues/12570)。

## 开发者关注点

1. **减少静默失败，提升诊断能力。**失效的扩展符号链接被静默跳过、codemode 丢失截断提示，以及长任务异常中止，都会增加排障成本。参见 [#12599](https://github.com/earendil-works/pi/issues/12599)、[#12594](https://github.com/earendil-works/pi/issues/12594)、[#12578](https://github.com/earendil-works/pi/issues/12578)。

2. **状态检查必须准确表达实际可用性。**`pi auth check --no-refresh` 被报告在访问令牌过期、仅保留刷新令牌时仍返回 `ready`，容易让自动化误判“当前可用”与“可刷新后使用”。参见 [#12588](https://github.com/earendil-works/pi/issues/12588)。

3. **工具边界情况应保留清晰语义。**`read` 在偏移落到末尾空行时返回空文本块，提示工具协议还需明确表达“空内容”“文件结束”等边界情况。参见 [#12571](https://github.com/earendil-works/pi/issues/12571)。

4. **自动执行需要清晰的授权边界。**对于会持续消费工具输出的 Agent，开发者需要区分用户指令与外部内容，并明确工具执行权限；今日反馈值得作为安全评审线索，而非直接视为已确认漏洞。参见 [#12569](https://github.com/earendil-works/pi/issues/12569)。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：2026-11-27｜数据来源：[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)**

## 1. 今日速览

Qwen Code 过去 24 小时出现 **v0.28.6、v0.28.7** 等发布记录，重点是 Harness 内核版 CLI，以及 Managed Session 的挂起与崩溃恢复能力。[发布列表](https://github.com/QwenLM/qwen-code/releases)

社区反馈集中在 **Harness 权限边界、跨平台兼容性和会话可靠性**；开发侧则同步推进 Web Shell 性能优化、Mods 扩展 API 与 CI 凭据隔离。[权限问题](https://github.com/QwenLM/qwen-code/issues/18442) · [性能优化](https://github.com/QwenLM/qwen-code/pull/18483) · [凭据隔离](https://github.com/QwenLM/qwen-code/pull/18470)

> **阅读说明**：以下依据提供的快照整理。Release 摘要存在截断；PR 的 `CLOSED` 不等于已合并，评论数为 `undefined`，因此不据此判断合并状态或讨论热度。

## 2. 版本发布

| 版本 | 主要变化与注意事项 |
|---|---|
| **[v0.28.7](https://github.com/QwenLM/qwen-code/releases/tag/v0.28.7)** | Qwen Code CLI 可基于 **Harness 内核**运行；使用统计默认关闭，仅在 `privacy.usageStatisticsEnabled` 为 `true` 时启用。重复工具调用被拒绝时，新增原因说明，但所给摘要未展示完整细节。 |
| **[v0.28.6](https://github.com/QwenLM/qwen-code/releases/tag/v0.28.6)** | Managed Session 可在等待工具审批、用户回答或后台工作时挂起，并支持 Harness 崩溃后的冷恢复，增强长任务连续性。 |
| **[v0.28.6-nightly.20261126.6b0cd79b](https://github.com/QwenLM/qwen-code/releases/tag/v0.28.6-nightly.20261126.6b0cd79b)** | 可见变更包含 Harness 内核版 CLI 包；其余日志被截断，不作完整功能判断。 |
| **[TypeScript SDK v0.1.36](https://github.com/QwenLM/qwen-code/releases/tag/sdk-typescript-v0.1.36)** | 发布说明首段标注捆绑 CLI **0.28.6**，但后文重复出现 **0.28.0** 等版本段落，实际依赖应以发布包核验。 |

**发布风险提示**：虽然 v0.28.7 已出现在 Release 列表中，相关发布失败 Issue 仍开放；SDK v0.1.37、v0.1.38 也存在开放的发布失败报告。不能仅凭 Release 条目认定所有检查与分发步骤均已完成。  
链接：[v0.28.7 发布失败 #18451](https://github.com/QwenLM/qwen-code/issues/18451) · [SDK #18471](https://github.com/QwenLM/qwen-code/issues/18471) · [SDK #18485](https://github.com/QwenLM/qwen-code/issues/18485)

## 3. 社区热点 Issues

以下按影响范围、风险和开发价值选取，**不是单纯按评论数排名**。所选条目的 👍 均为 0，当前讨论规模有限。

| Issue | 为什么重要 | 社区反应与当前状态 |
|---|---|---|
| **[#18442：Harness 权限与错误状态异常](https://github.com/QwenLM/qwen-code/issues/18442)** | 报告称 Edit/Read 拒绝规则可能未能阻止访问，流式 provider 错误可能被记为成功，另有旧工具名兼容问题。涉及无交互自动化的权限边界和结果可信度。 | **OPEN · P1 · 2 条评论**。报告包含旧 CLI 与 Harness CLI 的对照测试，应优先核验；快照未显示修复落地。 |
| **[#18465：Android/Termux 新会话被永久拒绝](https://github.com/QwenLM/qwen-code/issues/18465)** | `os.cpus()` 返回空数组后，负载比值计算为 `Infinity`，导致 `qwen serve` 创建会话持续返回 503。 | **OPEN · 待分诊 · 3 条评论**。已有对应修复 PR #18477，但尚未合并确认。 |
| **[#18484：MCP 401 刷新令牌后仍不重试](https://github.com/QwenLM/qwen-code/issues/18484)** | 令牌刷新成功后，工具调用仍因重放安全策略被拒绝，并提示“可能已执行”，使认证失败与执行状态难以区分。 | **OPEN · P2 · 2 条评论**。核心争议是如何兼顾安全重试与避免重复执行。 |
| **[#18475：删除会话时未安全处理不可读 worktree 元数据](https://github.com/QwenLM/qwen-code/issues/18475)** | 可能出现会话记录已删除，但 checkout 和不可读 sidecar 遗留的部分清理状态，影响资源回收和后续排障。 | **OPEN · P2 · 3 条评论**。诉求是遇到不可读元数据时停止删除，而非继续部分操作。 |
| **[#18486：Linux AppImage 灰屏](https://github.com/QwenLM/qwen-code/issues/18486)** | v0.28.4 在采用较新 Mesa 的 Bluefin/Fedora 上无法正常渲染；报告指向打包的旧 Wayland 库与宿主 EGL 加载问题。 | **OPEN · P2 · 2 条评论**。已有具体环境和错误日志，对桌面打包兼容性具有参考价值。 |
| **[#18472：502/504 服务异常后额度仍被消耗](https://github.com/QwenLM/qwen-code/issues/18472)** | 涉及服务失败时的计量透明度与用户成本，直接影响对平台可靠性的信任。 | **OPEN · P2 · 2 条评论**。目前属于用户报告，快照未提供计量核验结论。 |
| **[#18422：为 Mods 提供 Harness 内核扩展点](https://github.com/QwenLM/qwen-code/issues/18422)** | 希望通过宿主中立的扩展接口，让产品插件承载 Mod 运行时，关系到 Harness 与扩展生态的长期解耦。 | **OPEN · P2 · 3 条评论**，标记为需讨论、待人工处理，仍处于设计阶段。 |
| **[#18460：嵌入式外部运行时无法启用 Workspace 文件](https://github.com/QwenLM/qwen-code/issues/18460)** | 使用 `ExternalRuntimeClient` 的 Java 嵌入场景受到配置校验限制，影响 Managed Agent 集成。 | **OPEN · P2 · 3 条评论**。修复 PR #18461 已关闭，但不能据此确认已合并或已发布。 |
| **[#18438：Web Shell 刷新后无法打开后台子代理](https://github.com/QwenLM/qwen-code/issues/18438)** | 页面重载后，运行中子代理的任务入口点击无响应，暴露前端状态持久化缺口，影响多代理任务的可观察性。 | **OPEN · P2 · 2 条评论**。报告指向 `subagentSessionReady` 未持久化。 |
| **[#18485：SDK v0.1.38 发布失败](https://github.com/QwenLM/qwen-code/issues/18485)** | SDK 消费者需要可靠的发布链路；与前一版本失败报告并存，值得集成团队持续跟踪。 | **OPEN · 0 条评论**，机器人自动上报。与 #18471 引用相同 workflow run，不宜直接视为两次独立故障。 |

## 4. 重要 PR 进展

| PR | 状态 | 功能或修复内容 |
|---|---|---|
| **[#18477：修复无法读取 CPU 核数时的负载准入](https://github.com/QwenLM/qwen-code/pull/18477)** | OPEN | 核数不可读时将 CPU 信号视为缺失，避免除以零产生无限负载，直接回应 Android/Termux 无法创建会话的问题。 |
| **[#18470：隔离 fork 审查中的模型凭据](https://github.com/QwenLM/qwen-code/pull/18470)** | OPEN | 使用 GitHub Actions token 替代维护者级 PAT，并将真实模型密钥保留在独立代理容器中，减少 PR 可控脚本接触敏感凭据的机会。 |
| **[#18459：为 Qwen 账号登录增加发布硬门禁](https://github.com/QwenLM/qwen-code/pull/18459)** | OPEN | 增加登录路径的端到端发布检查，弥补现有构建、单测和集成测试未覆盖真实登录链路的缺口。 |
| **[#18480：优化会话索引与冷扫描](https://github.com/QwenLM/qwen-code/pull/18480)** | OPEN | 持久化轻量提示时间元数据、限制冷扫描并增量扩展 transcript 索引，减少多工作区列表和持续写入时的全量重建。 |
| **[#18483：延迟屏幕外会话内容渲染](https://github.com/QwenLM/qwen-code/pull/18483)** | OPEN | 代码接近可视区域时才进行语法高亮，并在滚出视野后保留结果；目标是降低长会话的渲染开销。 |
| **[#18476：ChatPane 迁移至共享 ChatSurface](https://github.com/QwenLM/qwen-code/pull/18476)** | OPEN | 将分屏与侧任务聊天面板接入后端中立的共享界面，减少消息、审批、问答卡片和输入框编排的重复实现。 |
| **[#18488：扩展 Mods 环境、设置与遥测 API](https://github.com/QwenLM/qwen-code/pull/18488)** | OPEN | 新增 `$.env.get`、`$.settings.read`、`$.telemetry.log/mark`，并支持命令展示属性 `isColorless`。 |
| **[#18482：新增 MiniMax-M3.1-Flash 预设](https://github.com/QwenLM/qwen-code/pull/18482)** | OPEN | 提议在内置 MiniMax provider 中加入新模型；按 PR 描述配置百万 token 上下文及文本、图像、视频输入。 |
| **[#18463：故障切换后恢复 Broker 轮询](https://github.com/QwenLM/qwen-code/pull/18463)** | CLOSED | 连接中断或超时后，将 Turn 标记为可恢复，并结合结果日志、checkpoint 与 activation 校验恢复原任务；合并状态未提供。 |
| **[#18461：允许嵌入式运行时访问 Workspace 文件](https://github.com/QwenLM/qwen-code/pull/18461)** | CLOSED | 调整外部 Workspace 配置和传输校验，使宿主提供外部运行时客户端时也能启用文件能力；对应 #18460，合并状态未提供。 |

## 5. 功能需求趋势

- **Managed Agent 向可嵌入、可验证、可复现演进。** 社区希望获得最小原生示例与 Docker 验证链路、固定 AgentDefinition 修订版，以及私有连接的绑定地址和 TLS 启动参数，反映出生产集成需求正在细化。  
  链接：[最小示例 #18430](https://github.com/QwenLM/qwen-code/issues/18430) · [固定修订版 #18416](https://github.com/QwenLM/qwen-code/issues/18416) · [传输配置 #18409](https://github.com/QwenLM/qwen-code/issues/18409)

- **扩展机制需要更清晰的宿主接口。** Mods 的内核接入提案与 `modules` 被误识别为不支持 Hook 的报告并存，说明扩展协议与加载机制仍需统一。  
  链接：[内核扩展点 #18422](https://github.com/QwenLM/qwen-code/issues/18422) · [Mods 警告 #18436](https://github.com/QwenLM/qwen-code/issues/18436)

- **Web Shell 更强调可配置性与任务连续性。** 自动上下文压缩阈值设置、刷新后子代理入口恢复，分别对应上下文成本控制与多代理任务追踪。  
  链接：[压缩阈值 #18407](https://github.com/QwenLM/qwen-code/issues/18407) · [子代理入口 #18438](https://github.com/QwenLM/qwen-code/issues/18438)

- **跨工作区委派需要目标侧上下文注入。** 社区提出在子会话首次请求模型前执行目标工作区的 pre-prompt hook；该 Issue 已关闭，快照未说明是否采纳或替代。  
  链接：[目标侧 Hook #18434](https://github.com/QwenLM/qwen-code/issues/18434)

## 6. 开发者关注点

1. **先保证权限与执行状态可信，再扩大自动化使用。** Harness 拒绝规则、错误退出状态与 MCP 重试语义，都关系到无人值守任务能否安全判断成功、失败及是否需要重跑。  
   链接：[#18442](https://github.com/QwenLM/qwen-code/issues/18442) · [#18484](https://github.com/QwenLM/qwen-code/issues/18484)

2. **会话持久化必须覆盖异常边界。** worktree 快照不完整、元数据不可读、导入文本误入共享历史等问题，说明会话管理不仅需要“能恢复”，还需要清理和记录行为一致。  
   链接：[#18446](https://github.com/QwenLM/qwen-code/issues/18446) · [#18475](https://github.com/QwenLM/qwen-code/issues/18475) · [#18423](https://github.com/QwenLM/qwen-code/issues/18423)

3. **非主流运行环境仍是兼容性薄弱点。** Android 的系统指标可用性、Linux 桌面图形库组合都可能形成阻断性故障，不能仅依赖常规桌面环境验证。  
   链接：[#18465](https://github.com/QwenLM/qwen-code/issues/18465) · [#18486](https://github.com/QwenLM/qwen-code/issues/18486)

4. **发布可用性需要独立核验。** CLI、SDK、桌面构建和审批恢复测试均出现失败记录；集成方应分别检查目标产物、相关 CI 与关键登录路径，而非仅关注版本号。  
   链接：[CLI 发布 #18451](https://github.com/QwenLM/qwen-code/issues/18451) · [SDK 发布 #18485](https://github.com/QwenLM/qwen-code/issues/18485) · [审批恢复测试 #18487](https://github.com/QwenLM/qwen-code/issues/18487)

**总体判断：** 今日主线是 Harness 与 Managed Agent 能力扩展，同时补齐安全、恢复和交付可靠性。生产使用者应优先跟踪权限问题与发布链路状态；扩展开发者则可重点关注 Mods 接口和共享 ChatSurface 的演进。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报
**日期：2026-11-27**

> **数据说明**：本次提供的过去 24 小时数据包含 1 条 Issue、1 条 PR，无新版本发布，因此仅分析这两条动态，不补足至 10 条。来源标注为 `Hmbown/DeepSeek-TUI`，但条目指向 `codewhale-hq/Codewhale`，以下链接按条目所示仓库生成；两者关系尚待核实。条目更新时间均显示为 2026-11-26，统计窗口以提供的数据为准。

## 1. 今日速览

今日动态集中在**上下文压缩的缓存效率**与**中日韩（CJK）文本中的技能补全体验**。一条新反馈指出压缩过程的缓存命中量明显低于未命中量，可能带来额外推理开销；另有一条外部贡献 PR，拟修复中文、日文连续文本后无法触发内联技能补全的问题，两者目前均处于开放状态。

## 2. 社区热点 Issues

### [#7564：上下文压缩缓存命中率偏低](https://github.com/codewhale-hq/Codewhale/issues/7564)
**状态：OPEN｜作者：LmeSzinc｜标签：bug、area:tui、os:windows、area:state**

- **问题描述**：提交者从 `.codewhale/audit.log` 中观察到，上下文压缩时缓存命中约为 **20k**，未命中约为 **200k–800k**。
- **为什么重要**：若日志统计准确，低缓存复用可能增加重复计算、请求成本与等待时间，对长会话场景尤其值得排查。不过，目前尚不能据此确定根因或实际影响范围。
- **社区反应**：当前 **0 条评论、0 个 👍**，尚无公开讨论或维护者确认。虽带有 Windows 标签，但现有信息不足以认定为 Windows 专属问题。

## 3. 重要 PR 进展

### [#7563：修复 CJK 文本后的内联技能补全触发](https://github.com/codewhale-hq/Codewhale/pull/7563)
**状态：OPEN｜作者：chuenchen309｜标签：bug、area:tui、contributor:external**

- **现有问题**：消息中的 `/my-review`、`$my-review` 等内联技能引用，目前只有在 `/` 或 `$` 前为特定边界字符（如空白、ASCII 括号或引号）时才会弹出补全。
- **修复目标**：支持 `请用$my`、`请用/my` 等无空格的 CJK 输入场景，避免用户必须手动插入空格才能触发补全。
- **开发价值**：改善中文、日文用户的输入体验，补齐基于 ASCII 边界判断带来的国际化缺口。
- **当前进展**：PR 尚未合并，👍 为 0；评论数未提供，无法判断评审活跃度。所给数据也未包含测试或 CI 结果。

## 4. 功能需求趋势

**样本仅含 1 条 Issue，无法判断社区整体趋势或需求热度。**结合本次 PR，可识别以下关注方向：

| 方向 | 本次信号 | 判断 |
|---|---|---|
| 上下文管理与缓存效率 | 压缩过程缓存命中量偏低 | 开发者开始通过审计日志检查长会话运行开销，需进一步验证缓存统计与复用行为。[#7564](https://github.com/codewhale-hq/Codewhale/issues/7564) |
| 多语言输入体验 | CJK 文本后技能补全无法触发 | TUI 输入规则需要适配无空格语言，而非仅依赖 ASCII 边界。[#7563](https://github.com/codewhale-hq/Codewhale/pull/7563) |

本次数据未出现 IDE 集成、新模型支持等方向的有效信号，不宜推断其需求变化。

## 5. 开发者关注点

- **成本与性能是否可解释**：审计日志暴露出缓存命中与未命中量的明显差距。后续值得关注维护者是否确认统计口径、复现条件及实际开销，而非仅凭日志数值判断缓存失效。[#7564](https://github.com/codewhale-hq/Codewhale/issues/7564)
- **中文输入是否需要额外操作**：内联技能补全对前置字符的限制打断了自然输入流程。该 PR 的关键验收点是 CJK 场景能否正常触发，同时不破坏既有 ASCII 输入行为。[#7563](https://github.com/codewhale-hq/Codewhale/pull/7563)

**后续观察重点**：缓存问题能否获得复现与诊断，以及 CJK 补全修复是否通过评审并合并。目前尚无已发布修复的证据。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*