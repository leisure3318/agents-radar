# OpenClaw 生态日报 2026-11-25

> Issues: 47 | PRs: 66 | 覆盖项目: 13 个 | 生成时间: 2026-11-25 04:47 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [NullClaw](https://github.com/nullclaw/nullclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyagi)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报
**日期：2026-11-25｜项目：[openclaw/openclaw](https://github.com/openclaw/openclaw)**

> **数据口径**：基于所提供的过去 24 小时更新快照。PR 仅展示 66 条中的 30 条，且评论数均为 `undefined`；Release 正文被截断，Issue 评论正文未提供。因此，本文不将 `CLOSED` 等同于已合并、不推断未披露的发布内容，用户反馈仅依据 Issue 标题与摘要提炼。

## 1. 今日速览

OpenClaw 今日保持**高活跃度**：47 条 Issue 更新，其中 40 条新开或活跃、7 条关闭；66 条 PR 更新，其中 39 条待合并、27 条合并或关闭，并有 2 个版本发布。研发主线集中在**更新与回滚可靠性、会话状态一致性、多人协作权限，以及 Gateway 响应性**，其中更新路径的设计协调讨论最为活跃。稳定性方面，pnpm 升级后命令失效、冷存储转录阻塞升级、会话静默结束等 P1 报告值得优先处理。整体呈现“交付频繁、修复投入大，但升级与权限边界仍承压”的状态，不能仅凭关闭数量判断问题已解决。  
相关：[更新设计 #204775](https://github.com/openclaw/openclaw/issues/204775) · [pnpm 升级故障 #204836](https://github.com/openclaw/openclaw/issues/204836) · [协作功能 PR #204899](https://github.com/openclaw/openclaw/pull/204899)

## 2. 版本发布

| 版本 | 发布页披露规模 | 可确认内容 |
|---|---:|---|
| [v2026.11.9](https://github.com/openclaw/openclaw/releases/tag/v2026.11.9) | 13 commits、15 PR、14 位贡献者 | 相对小规模发布；快照未包含具体变更清单 |
| [v2026.11.8](https://github.com/openclaw/openclaw/releases/tag/v2026.11.8) | 314 commits、210 PR、86 位贡献者 | 变更规模较大；快照未包含具体变更清单 |

**更新内容与破坏性变更：**所给发布说明仅包含开头及截断的文档链接，无法确认新增功能、API 变化、破坏性变更或官方迁移步骤。上述规模为各版本发布页数据，不能视为当天完成的开发量。

**升级注意事项：**

- **pnpm 全局安装用户应先验证升级与恢复流程。**Issue 报告升级到 2026.11.7、11.8、11.9 后命令损坏、Gateway 停止；该问题仍开放，但带有 `not-repro-on-main` 标签，不能直接推断当前主分支仍可复现。相关 [PR #205078](https://github.com/openclaw/openclaw/pull/205078) 处理的是涉及 2026.11.10 的后续更新场景，**并非已证明完整修复所有旧版本升级故障**。[Issue #204836](https://github.com/openclaw/openclaw/issues/204836)
- **启用会话冷存储的用户应关注 Doctor 校验。**从 2026.11.6 升级到 11.8 被报告因 `TRANSCRIPT_COLD` 导致 `doctor-failed` 并回滚，目前未见所给 PR 列表中的对应修复。[Issue #204834](https://github.com/openclaw/openclaw/issues/204834)
- **升级前建议备份配置与状态数据，并验证平台专属服务路径。**macOS 服务刷新、Windows TEMP 前缀服务修复均存在独立故障报告；这属于基于风险的操作建议，而非已披露的官方迁移要求。[macOS #204735](https://github.com/openclaw/openclaw/issues/204735) · [Windows #205035](https://github.com/openclaw/openclaw/issues/205035)

## 3. 项目进展

### 今日进入关闭状态的重要 PR

以下 PR 均显示 `CLOSED`，**未提供 `merged_at`，不能认定已合并或已进入发布版本**。

| PR | 拟推进的能力或修复 | 意义 |
|---|---|---|
| [#204866：安装归属与更新所有权](https://github.com/openclaw/openclaw/pull/204866) | 防止不同更新路径争用同一安装，避免重新安装覆盖 resident launcher | 涉及更新架构的核心安全边界 |
| [#204915：候选版本自有恢复清单](https://github.com/openclaw/openclaw/pull/204915) | 用显式恢复意图替代 launcher 扫描 `.pre-*` 文件推测恢复范围 | 有助于降低恢复逻辑与目录结构的耦合 |
| [#205083：保留云配置输入](https://github.com/openclaw/openclaw/pull/205083) | 避免翻译目录刷新时覆盖编辑中的字段、丢失焦点或输入 | 直接改善设置页编辑可靠性 |
| [#205022：CI 检测批量数据迁移](https://github.com/openclaw/openclaw/pull/205022) | 识别更新中扫描、重写大体量会话表的迁移 | 将升级性能风险前移至 CI |
| [#205036：发布时处理 SDK 前序版本漂移](https://github.com/openclaw/openclaw/pull/205036) | 处理 11.9 提升至 `latest` 后，11.10 发布证据仍绑定旧前序版本的问题 | 针对发布流水线阻塞，而非用户运行时功能 |

### 可确认的已合并基础

多人协作 PR 摘要明确指出，**会话成员访问级别存储与 Participate 协议基础 #204783 已合并至主分支**；但数据不能证明其合并发生于今日。其上层的运行权限限制、执行审批路由与邀请参与功能仍处于开放 PR 阶段。[基础 PR #204783](https://github.com/openclaw/openclaw/pull/204783) · [权限限制 #204847](https://github.com/openclaw/openclaw/pull/204847)

**进展判断：**今日可见的推进以更新基础设施与质量保障为主，面向用户的多人协作仍在分层集成。由于缺少合并详情，无法量化“今日已交付多少功能”。

## 4. 社区热点

Issue 反应数均为 0；PR 评论数缺失，因此以下依据 **Issue 评论数**排序，不作 PR 热度排名。

| 热点 | 评论数 | 背后诉求 |
|---|---:|---|
| [#204775：prepared-release 更新设计](https://github.com/openclaw/openclaw/issues/204775) | 12 | 需要统一状态模型、责任归属和实施计划，避免多名开发者以不同设计修改相同文件 |
| [#204931：`/stop` 排在运行任务之后](https://github.com/openclaw/openclaw/issues/204931) | 5 | 用户希望停止指令具备即时中断语义，而不是成为普通队列消息 |
| [#205007：设备与账户安全求助](https://github.com/openclaw/openclaw/issues/205007) | 4 | 需要安全分诊和补充信息；现有摘要不能建立其与 OpenClaw 漏洞的关联 |
| [#204982：固定选项问题锁住聊天](https://github.com/openclaw/openclaw/issues/204982) | 3 | 人工确认机制需要允许澄清、取消或恢复普通对话，而非拒绝所有非选项回复 |
| [#204744：每轮发送约 1.9 秒固定开销](https://github.com/openclaw/openclaw/issues/204744) | 3 | 用户开始关注工具与基础设施带来的固定延迟，而不仅是模型生成速度 |

另有两项各获 3 条评论的平台服务问题：Windows 重启/健康检查等待，以及 macOS 服务刷新死锁，说明**本地常驻助手的服务生命周期管理**仍是社区关注点。[Windows #204704](https://github.com/openclaw/openclaw/issues/204704) · [macOS #204735](https://github.com/openclaw/openclaw/issues/204735)

## 5. Bug 与稳定性

### 优先级最高：P1 与核心运行可靠性

| 问题 | 影响与限定条件 | 修复状态 |
|---|---|---|
| [#204836：pnpm 升级后命令失效、Gateway 停止](https://github.com/openclaw/openclaw/issues/204836) | 影响升级可用性；主分支有不可复现标签 | 有相关开放 [PR #205078](https://github.com/openclaw/openclaw/pull/205078)，覆盖范围有限 |
| [#205035：Windows 服务修复触发 SQLite `EPERM`](https://github.com/openclaw/openclaw/issues/205035) | 原生 ARM64、TEMP 前缀修复路径无法发布状态；普通 LOCALAPPDATA 路径通过 | 所给列表未见明确 fix PR |
| [#204952：provider 发现阻塞 Gateway 事件循环](https://github.com/openclaw/openclaw/issues/204952) | Windows beta.3 下可能拖慢健康检查、就绪检测与心跳 | 开放 [PR #204977](https://github.com/openclaw/openclaw/pull/204977)，标记需补充证明 |
| [#204834：冷存储转录阻塞升级](https://github.com/openclaw/openclaw/issues/204834) | Doctor 拒绝有效冷转录，升级反复回滚 | 未见明确 fix PR |
| [#204651：`sessions_yield` 后无法回复](https://github.com/openclaw/openclaw/issues/204651) | WebChat、`visibleReplies: message_tool` 下，子任务完成后父任务回复被拒绝 | 标记可排队修复，未见明确 fix PR |
| [#205006：伪工具调用文本导致会话静默结束](https://github.com/openclaw/openclaw/issues/205006) | 11.7 回归报告；未产生结构化 `tool_calls` 却被视为成功结束 | 标记可排队修复，未见明确 fix PR |
| [#204931：`/stop` 无法即时中断](https://github.com/openclaw/openclaw/issues/204931) | 活跃运行中停止指令进入队列，削弱人工控制能力 | 仍需现场复现，未见明确 fix PR |
| [#205063：Caps Lock 下 Redo 再次执行 Undo](https://github.com/openclaw/openclaw/issues/205063) | 富提及编辑器中可能删减待发送文本 | 标签显示有关联开放 PR，但未提供编号 |

### 安全边界：P2，但建议单独优先审查

- **ACP 工具策略疑似未生效**：启用 OpenClaw Tools MCP bridge 时，被报告忽略全局及 agent 的 `tools.deny` 与 profile。已标记源码复现和待安全审查，尚不能当作完成验证的安全公告。[#205000](https://github.com/openclaw/openclaw/issues/205000)
- **WhatsApp 多账户白名单来源错误**：`security audit --fix` 被报告使用默认账户 pairing store 初始化各账户 `groupAllowFrom`，涉及账户隔离及消息访问策略。未见明确 fix PR。[#204997](https://github.com/openclaw/openclaw/issues/204997)

### 其他值得跟进的 P2

- **交互锁死**：固定选项 harness 问题拒绝其他聊天输入，需带外解除；尚待维护者与产品决策。[#204982](https://github.com/openclaw/openclaw/issues/204982)
- **转录统计读放大**：报告称 SQLite 列顺序与非覆盖主键导致最高 538 倍读放大；该数值是报告者场景测量，非普遍性能结论。[#205040](https://github.com/openclaw/openclaw/issues/205040)
- **多标签令牌登录竞争**：首次同时打开两个标签可能被退回登录页，已有开放修复 [PR #205081](https://github.com/openclaw/openclaw/pull/205081)。[#205077](https://github.com/openclaw/openclaw/issues/205077)

**关闭不等于修复已发布：**Windows 重启等待和浏览器深层控件遗漏的 Issue 均已关闭，但仍带有关联 PR 开放标签；记忆 Dream Diary 丢失问题也已关闭，所给数据未说明关闭原因或发布归属。[#204704](https://github.com/openclaw/openclaw/issues/204704) · [#204905](https://github.com/openclaw/openclaw/issues/204905) · [#204746](https://github.com/openclaw/openclaw/issues/204746)

## 6. 功能请求与路线图信号

| 方向 | 需求与现有进展 | 近期信号 |
|---|---|---|
| **多人参与同一会话** | 邀请用户按角色读取、建议或发送；运行权限限制及审批发送给会话创建者已有分层 PR | 信号强，但涉及安全边界及多层依赖，不能认定下一版本必含。[#204899](https://github.com/openclaw/openclaw/pull/204899) · [#204858](https://github.com/openclaw/openclaw/pull/204858) |
| **兼容数据库变化后的回滚** | 允许旧 Gateway 读取可兼容的新状态，并准备 release 分支回移 | 明确开发主线；回移依赖主线及其他修复先落地。[#204956](https://github.com/openclaw/openclaw/pull/204956) · [#204957](https://github.com/openclaw/openclaw/pull/204957) |
| **设置项直达与高亮** | 错误或提示中的链接直接定位 Settings 行 | 已有实现，但 PR 等待作者且标记兼容性风险。[#204987](https://github.com/openclaw/openclaw/pull/204987) |
| **电脑工具截图质量可配置** | 允许突破当前 1280 px、JPEG 0.85 限制 | 仍在产品决策阶段，未见实现 PR。[#205064](https://github.com/openclaw/openclaw/issues/205064) |
| **自动化阻塞状态与通知合并** | 表达持久的“等待所有者操作”，合并重复通知并按条件恢复 | 与账户配额耗尽后任务反复失败的痛点一致，但尚无明确实现。[#205034](https://github.com/openclaw/openclaw/issues/205034) · [#205076](https://github.com/openclaw/openclaw/issues/205076) |
| **跨客户端个人体验** | macOS 使用登录者个人会话固定项；Talk 设置页重设计 | 已有开放 PR，均仍待作者推进。[#204973](https://github.com/openclaw/openclaw/pull/204973) · [#205068](https://github.com/openclaw/openclaw/pull/205068) |

## 7. 用户反馈摘要

> 未提供评论正文，以下是从 Issue 描述提炼的反馈，不代表对评论内容或社区满意度的统计。

- **“自动化应交付结果，而不是重复报错。”**定时任务在一个 OpenAI 账户额度耗尽后连续失败，手动重试也无效；对时效性检查而言，漏执行比收到错误通知更严重。[#205076](https://github.com/openclaw/openclaw/issues/205076)
- **“长期记忆不应因归档变得不可搜索。”**冷存储启用后，窗口之外的转录无法通过会话搜索命中，暴露成本控制与长期知识可检索性之间的矛盾。[#204970](https://github.com/openclaw/openclaw/issues/204970)
- **“配置显示必须对应真实生效行为。”**外部 memory provider 可通过 Gateway 工作，但 agent 的 `memory_search/get` 仍读取本地；模型 fallback 列表又可能忽略 `--agent`，增加排障误判。[#205032](https://github.com/openclaw/openclaw/issues/205032) · [#204996](https://github.com/openclaw/openclaw/issues/204996)
- **“聊天应保持可控、可恢复。”**停止指令排队、确认问题锁住输入、子任务返回后无法发言，均影响用户对助手的掌控感。[#204931](https://github.com/openclaw/openclaw/issues/204931) · [#204982](https://github.com/openclaw/openclaw/issues/204982) · [#204651](https://github.com/openclaw/openclaw/issues/204651)
- **正面体验证据有限。**快照未包含明确赞扬或满意度评论，全部所列反应数为 0，不能据此推断用户满意或不满意的比例。[Issue 列表](https://github.com/openclaw/openclaw/issues)

## 8. 待处理积压与维护者提醒

**无法据此识别“长期未响应”条目：**展示的 Issue/PR 大多创建于 11 月 24—25 日，且缺少维护者回复内容。以下为高价值待跟进事项，而非已经证实长期无人处理的积压。

1. **优先闭环升级故障矩阵。**将 pnpm 安装方式、冷存储、Windows 特殊修复路径分开验证，避免一个相关 PR 被误认为覆盖全部升级故障。[#204836](https://github.com/openclaw/openclaw/issues/204836) · [#204834](https://github.com/openclaw/openclaw/issues/204834) · [#205035](https://github.com/openclaw/openclaw/issues/205035)
2. **为安全策略报告明确负责人和结论。**MCP bridge 工具拒绝策略与 WhatsApp 多账户白名单均应记录影响范围、复现结果和修复版本。[#205000](https://github.com/openclaw/openclaw/issues/205000) · [#204997](https://github.com/openclaw/openclaw/issues/204997)
3. **补齐已有修复的验证证据。**Gateway provider 发现修复仍标记 `needs proof`，应优先补充事件循环、心跳和健康检查测试。[PR #204977](https://github.com/openclaw/openclaw/pull/204977)
4. **推动会话与冷存储的产品决策。**历史搜索排除、无效 archive 引用反复告警、固定选项锁住对话，不完全是局部代码问题，需要明确交互与数据生命周期契约。[#204970](https://github.com/openclaw/openclaw/issues/204970) · [#204968](https://github.com/openclaw/openclaw/issues/204968) · [#204982](https://github.com/openclaw/openclaw/issues/204982)
5. **控制大型功能栈的集成风险。**多人协作、数据库回滚和更新架构同时修改 Gateway、权限与状态层，宜继续按依赖顺序评审，避免跨栈设计冲突。[协作 #204847](https://github.com/openclaw/openclaw/pull/204847) · [回滚 #204956](https://github.com/openclaw/openclaw/pull/204956) · [更新协调 #204775](https://github.com/openclaw/openclaw/issues/204775)

---

**健康度结论：高活跃、可靠性仍需重点投入。**可见工作显示项目在恢复能力、权限模型和测试证据方面持续投入；下一阶段最重要的验收标准，是升级后服务可恢复、任务执行可控、会话回复不丢失，以及权限配置与实际执行一致。相关：[更新 #204775](https://github.com/openclaw/openclaw/issues/204775) · [会话回复 #204651](https://github.com/openclaw/openclaw/issues/204651) · [工具权限 #205000](https://github.com/openclaw/openclaw/issues/205000)

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向分析
**观察日期：2026-11-25｜基于所提供的过去 24 小时快照**

> **口径说明：**Issue、PR 数均为窗口内更新条目数，不是新增量或仓库总量；`CLOSED` 不等于已合并，更不等于已发布。部分项目明细不完整、评论数据缺失，以下健康度评价仅针对当日可见信号，不构成长期排名。

## 1. 生态全景

个人 AI 助手开源生态呈现出**能力继续扩展、可靠性加固成为主要工程投入**的共同态势：升级恢复、会话连续性、模型配置一致性和消息完整性，比新增工具数量更受关注。OpenClaw 与 Hermes Agent 构成当日最活跃的两个开发中心，但较高的问题与待审修复量，也说明复杂部署和长期运行正在带来维护压力。NanoBot、NanoClaw、CoPaw、ZeroClaw 主要围绕兼容性与执行可靠性推进，LobsterAI 则同时开展运行时迁移和桌面办公体验扩展。项目之间的竞争正从“能否调用工具”，转向“能否长期、可控、可恢复地完成任务”；单日无活动的项目则不足以判断其长期维护状态。

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | Release 情况 | 当日健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | **47** | **66**：39 开放，27 合并或关闭 | 记录 2 个版本：11.8、11.9；正文截断 | **高活跃、稳定性承压**；升级、会话及权限边界需优先闭环 |
| **Hermes Agent** | **50** | **50**：46 开放，4 合并或关闭 | 列示 11-23 稳定版、11-24 Canary，非当日新发 | **高活跃、待验证队列较大**；大库性能与数据安全突出 |
| **LobsterAI** | 0 | 14：1 开放，13 关闭 | 无新版本 | **工程推进密集**；迁移修复与产品扩展并行，交付状态待核实 |
| **NanoClaw** | 4 | 10：9 开放，1 关闭 | 无新版本 | **修复响应积极**；消息交付风险尚未完全覆盖 |
| **NanoBot** | 3 | 9：3 开放，6 关闭 | 无新版本 | **响应较快、质量打磨持续**；模型兼容与 Windows 修复待落地 |
| **CoPaw** | 6 | 8：5 开放，3 关闭 | 无新版本 | **持续维护**；模型元数据、媒体上下文和配置作用域存在缺口 |
| **ZeroClaw** | 3 | 6：全部开放 | 无新版本 | **持续修复、尚无当日合并交付**；重复邮件回复值得优先处理 |
| **ZeptoClaw** | 0 | 1：开放，Dependabot 提交 | 无新版本 | **自动化维护信号可见**；不足以评估人工维护强度 |
| PicoClaw | 0 | 0 | 未记录活动 | 单日静默，长期健康度未知 |
| NullClaw | 0 | 0 | 未记录活动 | 同上 |
| IronClaw | 0 | 0 | 未记录活动 | 同上 |
| TinyClaw | 0 | 0 | 未记录活动 | 同上 |
| Moltis | 0 | 0 | 未记录活动 | 同上 |

**比较要点：**

- OpenClaw 的 PR 更新量最高，Hermes 的 Issue 更新量最高；二者明显领先于本次样本中的其他项目。
- LobsterAI 的 13 条关闭 PR，**不能解释为 13 条已交付变更**；同样不能据开放比例推导其他项目的处理效率。
- NanoClaw 条目指向 `nanocoai/nanoclaw`，CoPaw 条目指向 `agentscope-ai/QwenPaw`；仓库命名关系尚未确认，统计沿用输入分组。

## 3. OpenClaw 在生态中的定位

### 优势：广覆盖的常驻助手平台演进

从可见工作看，OpenClaw 同时覆盖更新与恢复、Gateway、多渠道接入、长期记忆、桌面客户端以及多人协作，表现出较广的平台化范围。其差异不仅是功能多，而是开始系统处理**安装所有权、数据库兼容回滚、会话成员权限和执行审批**等基础契约。

相较之下，其他项目当日更鲜明的信号是：

- **NanoBot：**标准化 Python 嵌入接口，强化宿主应用内的 Agent 运行时能力。
- **LobsterAI：**围绕 Electron、DSH 和产物工作空间，强化桌面办公闭环。
- **Hermes：**面向多 profile、多插件和长期会话积累，集中处理复杂使用场景。
- **NanoClaw、ZeroClaw：**更集中于容器/守护进程、渠道状态和消息执行可靠性。

这些是当日路线差异，不代表完整架构优劣排序。

### 社区规模：开发活动领先，用户规模无法直接比较

OpenClaw 当日有 **66 条 PR、47 条 Issue 更新**，与 Hermes 的 **50/50** 共同构成第一活跃梯队。OpenClaw 大版本发布页列示 **86 位贡献者、210 条 PR**，说明该发布周期具有较广的协作参与，但不能当作当天贡献规模，也无法与其他项目缺失的同口径数据直接比较。

讨论层面，OpenClaw 更新设计 Issue 有 **12 条评论**，是可见样本中最突出的单一讨论；多数其他项目的 Issue 仅有 0—2 条评论。不过，缺少完整评论、活跃贡献者和用户数据，**无法据此推断安装量、总体社区人数或满意度**。

### 主要代价：跨模块复杂性

多人协作、状态迁移和更新架构同时触及 Gateway、权限与持久化层，增加了集成风险。OpenClaw 当前最重要的竞争指标不是继续增加能力，而是证明这些能力能够在升级、恢复和权限约束下可靠协同。

## 4. 共同关注的技术方向

| 共同方向 | 涉及项目 | 具体诉求与判断 |
|---|---|---|
| **任务完成与结果交付一致** | OpenClaw、NanoClaw、Hermes | 静默结束、子任务完成后无法回复、长回复为空。必须区分模型结束、任务成功与用户收到结果 |
| **长期会话与上下文恢复** | OpenClaw、NanoBot、Hermes、CoPaw | 冷存储检索、thinking 签名、旧数据库兼容、媒体上下文持续报错；恢复链路成为核心测试对象 |
| **升级、迁移与生命周期** | OpenClaw、LobsterAI、NanoClaw、Hermes、CoPaw | 安装失败、凭据与预设保留、数据库路径迁移、长时间检查无反馈；升级需要被视为完整产品流程 |
| **配置与实际行为一致** | OpenClaw、CoPaw、ZeroClaw、Hermes | 模型选择、fallback、记忆 provider、profile 展示与实际请求不一致；需要明确配置优先级和运行时可观测性 |
| **渠道状态与重复执行防护** | ZeroClaw、NanoClaw、Hermes、CoPaw | 邮件重启后重复回复、空闲容器无响应、消息丢弃、worker 停止确认；状态持久化比单次调用成功更关键 |
| **权限与身份边界** | OpenClaw、NanoBot、Hermes、ZeroClaw | 工具拒绝策略、按轮工具选择、profile 隔离、OIDC 刷新授权；多用户和多身份场景推动授权机制细化 |
| **依赖与交付质量保障** | OpenClaw、NanoClaw、Hermes、ZeroClaw、ZeptoClaw | 迁移风险 CI、依赖版本对齐、SBOM、测试稳定性和工具链更新；质量控制逐步前移 |

这些问题**不能简单共用一种修复**。例如，空输出、容器恢复失败和渠道长消息丢失都表现为“无回复”，但故障层级不同，需要分别验证。

## 5. 差异化定位分析

以下定位依据本次动态归纳，而非完整产品定义。

| 项目 | 功能与目标用户侧重 | 可见技术路线及关键取舍 |
|---|---|---|
| **OpenClaw** | 多渠道常驻助手、自动化重度用户，并向多人参与演进 | Gateway 与共享状态、角色权限、恢复式更新；覆盖广，但跨层一致性成本高 |
| **Hermes Agent** | 长期使用、多 profile、多插件的复杂部署用户 | Desktop/CLI/渠道与持久会话结合；重点挑战是存量数据、容量与隔离 |
| **NanoBot** | 独立助手用户及 Python 应用开发者 | Python Agent 嵌入、直接/流式调用统一；强调可集成性与模型适配 |
| **NanoClaw** | 通过聊天渠道使用容器化助手的用户 | 容器空闲恢复、渠道依赖一致性、明确消息输出；执行环境生命周期是关键 |
| **LobsterAI** | 桌面办公与产物管理用户 | Electron、DSH、宿主原生工具及 Office 工作区；更强调可见、可编辑的交付物 |
| **CoPaw** | 多智能体、多供应商、Console 工作流用户 | 模型目录、MCP、通道 worker、Creator；配置作用域和媒体兼容需收敛 |
| **ZeroClaw** | 常驻渠道自动化、本地记忆及多模型路由用户 | daemon、profile/route/凭据协同、OIDC 与本地存储扩展；状态和身份边界突出 |
| **ZeptoClaw** | 本次信息不足 | 只能确认 Rust Docker 工具链维护，不能据此推断完整定位 |

PicoClaw、NullClaw、IronClaw、TinyClaw、Moltis 缺少当日技术信号，不宜仅凭项目名称推断目标用户或架构。

## 6. 社区热度与成熟度

### 活跃度分层

- **第一梯队：OpenClaw、Hermes。** 开发与问题反馈密集，跨模块协调及验证压力突出。
- **第二梯队：LobsterAI、NanoClaw、NanoBot、CoPaw、ZeroClaw。** 持续有具体工程投入，但互动证据普遍有限，不能把贡献数量等同于广泛社区参与。
- **自动化维护或单日静默：ZeptoClaw 及其余五个无活动项目。** 应观察更长周期，而非判断停滞。

### 快速迭代与质量巩固正在重叠

- **扩展与巩固并行：**OpenClaw 推进多人协作，LobsterAI 扩展办公工作区，NanoBot 推进嵌入 SDK；同时均在修复基础体验。
- **质量巩固信号更强：**Hermes 聚焦大型数据库和存量兼容；NanoClaw、CoPaw、ZeroClaw 聚焦消息、配置和生命周期正确性。
- **尚不能量化成熟度：**缺少同口径的合并时间、回归率、测试覆盖、问题关闭原因和发布后表现。

**高活跃不等于高成熟，问题多也不必然意味着质量更差。** 更复杂的真实使用场景可能暴露更多缺陷；决策时应重点比较“复现—修复—验证—发布”的闭环能力。

## 7. 值得关注的趋势信号

### ① Agent 正从一次性工具走向有状态的长期服务
数万会话、GB 级数据库、冷存储和长期任务恢复，说明持久化已不再只是附属能力。

**开发参考：**将数据库迁移、压缩、归档、搜索和恢复纳入兼容性契约，并使用大型真实数据集做回归测试。

### ② “完成”必须成为可验证的端到端语义
多个项目出现任务结束但结果不可见；ZeroClaw 的邮件报告还显示，重启可能再次触发外部动作。

**开发参考：**分别记录执行状态、结果持久化状态和投递状态；对有副作用的操作增加幂等控制、去重与失败恢复。

### ③ 多模型竞争正在转化为适配层工程竞争
thinking 签名、推理参数、上下文窗口、工具消息字段、429 配额粒度，都可能直接破坏任务连续性。

**开发参考：**不要把“OpenAI 兼容”视为行为完全一致；应建立按模型能力、供应商字段和恢复场景划分的契约测试。

### ④ 个人助手正在出现多身份与协作需求
OpenClaw 的多人参与、Hermes 的多 profile、ZeroClaw 的刷新授权，分别指向共享访问、身份隔离和持续授权。

**开发参考：**从单一用户配置转向显式的主体、资源、操作与审批模型，避免将个人环境中的默认信任直接扩展到协作场景。

### ⑤ 升级能力正在成为产品竞争力
从 pnpm、Git 签名到授权迁移和数据库检查，失败往往发生在模型之外，却直接决定助手是否可用。

**开发参考：**把可回滚更新、进度反馈、凭据保留、跨平台路径及故障注入测试，纳入正式发布验收。

### ⑥ 产品形态继续分化：运行时平台与桌面工作台并进
NanoBot 强化嵌入接口，OpenClaw 扩展协作平台能力，LobsterAI 强化可编辑产物工作区，说明生态并未收敛为单一聊天入口。

**技术决策建议：**选型应先确定自身需要的是**可嵌入运行时、常驻自动化平台，还是桌面办公产品**，再比较工具能力和社区活跃度。当前最值得优先验证的共同指标，是任务可恢复、结果不丢失、配置真实生效，以及权限可被可靠执行。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报
**日期：2026-11-25** · [项目仓库](https://github.com/HKUDS/nanobot)  
统计范围：所提供的过去 24 小时 GitHub 更新数据。

## 1. 今日速览

过去 24 小时，NanoBot 有 **3 条 Issue 更新、9 条 PR 更新**，其中 3 条 PR 待合并、6 条已关闭，开发活动主要集中在稳定性修复与 WebUI 体验打磨。新增问题集中于 Anthropic thinking 兼容性和 Windows 原生 TUI 启动，两组问题均已有对应的待合并修复 PR，体现出较快的响应速度。功能方向上，Python SDK 标准化嵌入 PR 为宿主应用集成 Agent 提供了新的演进信号。整体呈现出**开发活跃、修复响应及时，但关键修复仍待验证落地**的状态；今日无新版本发布，且数据中的 `CLOSED` 不足以确认 PR 已合并。  
相关：[Anthropic 修复 #6792](https://github.com/HKUDS/nanobot/pull/6792) · [Windows 修复 #6791](https://github.com/HKUDS/nanobot/pull/6791) · [SDK #6789](https://github.com/HKUDS/nanobot/pull/6789)

## 2. 项目进展

以下 6 条 PR 已关闭，**是否合并、是否进入主分支或发布版本，需进一步核实**。从提交内容看，推进重点是减少界面交互摩擦、改善流式内容展示，以及修正会话时间记录。

| 方向 | 已关闭 PR | 内容与价值 |
|---|---|---|
| 编辑差异交互 | [#6790](https://github.com/HKUDS/nanobot/pull/6790) | 点击可折叠编辑行的文件路径或状态图标，也能展开/折叠 inline diff，减少误打开侧栏文件的情况。 |
| Mermaid 流式展示 | [#6788](https://github.com/HKUDS/nanobot/pull/6788) | Markdown 图表代码块闭合后即可渲染，不必等待整段回复结束；同时改善渲染组件加载失败后的原地重试体验。 |
| 子智能体面板 | [#6783](https://github.com/HKUDS/nanobot/pull/6783) | 将消息操作面板限制在子智能体详情区域内，避免窄面板操作遮罩覆盖整个窗口。 |
| 撤销操作辨识度 | [#6782](https://github.com/HKUDS/nanobot/pull/6782) | 区分 Undo 与通知标题的视觉层级，并调整中英文混排间距。 |
| 输入区错误反馈 | [#6781](https://github.com/HKUDS/nanobot/pull/6781) | 将模型切换等错误改为 toast 提示，避免内联错误信息引起输入区布局跳动。 |
| 会话时间准确性 | [#6780](https://github.com/HKUDS/nanobot/pull/6780) | 为新输入保留时区偏移，防止跨网关时区读取历史时，活动计时被放大数小时。 |

**进展判断：**今日属于“小步密集修复”，而非大型功能交付。改动覆盖展示、交互、错误反馈与时间记录多个日常使用环节；其实际可用性仍取决于合并及发布状态。

## 3. 社区热点

### Anthropic thinking 兼容性是最集中的问题主题
- [Issue #6785](https://github.com/HKUDS/nanobot/issues/6785)：Haiku 5.5 使用 `medium` 等 reasoning effort 时请求被拒绝，**1 条评论、0 个赞**，是已提供数据中评论最多的 Issue。
- [Issue #6786](https://github.com/HKUDS/nanobot/issues/6786)：上下文压缩后，恢复会话出现 thinking 签名错误，且 `nanobot -m` 未清晰呈现错误；**0 条评论、0 个赞**。
- 两者已有统一修复提案 [PR #6792](https://github.com/HKUDS/nanobot/pull/6792)。

**背后诉求：**用户不仅需要模型参数兼容，还需要长任务压缩后的会话可恢复性，以及足够明确的失败反馈。

### Windows 首次启动可靠性受到关注
- [Issue #6784](https://github.com/HKUDS/nanobot/issues/6784) 报告杀毒软件锁定 `bun.exe`，导致原生 TUI 首次启动失败，**0 条评论、0 个赞**。
- [PR #6791](https://github.com/HKUDS/nanobot/pull/6791) 提议先将校验后的文件原子移动至缓存，再运行版本探测，规避探测后文件被锁定时仍需重命名的问题。

**热度边界：**3 条 Issue 均来自同一报告者；全部条目均为 0 个赞，PR 评论数未提供。因此，更适合将今日热点理解为“问题集中度高”，而非广泛社区讨论升温。

## 4. Bug 与稳定性

以下按潜在影响排序，属于本日报的分析优先级，不替代项目官方定级。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **高** | **Anthropic 会话压缩后无法继续使用**：长工具任务可能在检查点后停止，后续恢复仍出现 `Invalid signature in thinking block`；命令行错误反馈不足又增加排障难度。 | [Issue #6786](https://github.com/HKUDS/nanobot/issues/6786)；已有 [fix PR #6792](https://github.com/HKUDS/nanobot/pull/6792)，**待合并**。 |
| **高** | **Haiku 5.5 特定配置下请求全部失败**：`reasoningEffort` 使用 `medium` 等非 `adaptive`/`none` 值时，手动 thinking budget 被模型拒绝。 | [Issue #6785](https://github.com/HKUDS/nanobot/issues/6785)；已有 [fix PR #6792](https://github.com/HKUDS/nanobot/pull/6792)，**待合并**。 |
| **中** | **Windows 原生 TUI 首次启动受阻**：杀毒扫描器锁定 Bun 可执行文件，缓存安装阶段触发 `WinError 32`。报告者指出可使用 `--no-tui` 绕过 TUI 启动路径。 | [Issue #6784](https://github.com/HKUDS/nanobot/issues/6784)；已有 [fix PR #6791](https://github.com/HKUDS/nanobot/pull/6791)，**待合并**。 |
| **中** | **跨时区会话计时不准确**：无时区偏移的时间戳被不同网关解释后，可能将分钟级活动显示为数小时。 | [PR #6780](https://github.com/HKUDS/nanobot/pull/6780) **已关闭，合并状态未知**。 |

**稳定性关注点：**应优先验证 Anthropic 修复是否同时覆盖“长任务压缩—持久化—恢复执行”和错误可见性，而不只是消除单次 API 报错。

## 5. 功能请求与路线图信号

### Python Agent 嵌入接口走向标准化
[PR #6789：standardize Python agent embedding](https://github.com/HKUDS/nanobot/pull/6789) 仍开放，拟推进：

- 直接调用与流式调用共享 turn 执行逻辑；
- 宿主应用提供 Agent 指令、注册工具，并按轮次选择可用工具；
- 支持显式空工具选择，同时保留运行时的会话与工作区权限约束；
- 暴露运行状态；具体接口范围仍需查看完整 PR。

**路线图判断：**这表明 NanoBot 正加强作为 Python 应用内嵌 Agent 运行时的能力，而不仅是独立助手入口。该功能有机会进入后续版本，但当前没有合并状态、里程碑或发布时间可供确认。

### 近期更明确的候选项是兼容性修复
[Anthropic #6792](https://github.com/HKUDS/nanobot/pull/6792) 与 [Windows #6791](https://github.com/HKUDS/nanobot/pull/6791) 都直接对应现有阻塞问题，是值得优先跟踪的近期修复候选。今日 Issue 数据中没有独立的新功能请求，不能据此推断更广泛的用户功能偏好。

## 6. 用户反馈摘要

**数据限制：**仅 #6785 显示有 1 条评论，但未提供评论正文，因此不能从评论中提炼真实观点或满意度。以下仅依据 Issue 描述归纳：

- **长任务用户关注会话连续性。**用户在 `nanobot -m` 长时间工具执行、上下文压缩与恢复场景中遇到持续失败，痛点是任务中断后难以继续，而非单次回复失败。[#6786](https://github.com/HKUDS/nanobot/issues/6786)
- **模型使用者希望推理配置可靠适配。**Haiku 5.5 在常见 effort 设置下直接拒绝请求，说明模型特定参数映射会影响基本可用性。[#6785](https://github.com/HKUDS/nanobot/issues/6785)
- **Windows 用户需要适应常见安全软件环境的安装流程。**Bun 已下载并通过校验，仍因文件锁无法完成安装，首次启动体验受到影响。[#6784](https://github.com/HKUDS/nanobot/issues/6784)

当前没有足够数据判断用户总体满意或不满意，也不宜将单一报告者的经历扩大为普遍反馈。

## 7. 待处理积压

**本批数据未显示长期未响应的重要积压。**所有条目均为 11 月 24—25 日创建或更新，不能据此判断全仓库积压规模。

建议维护者优先关注：

1. **完成 Anthropic 修复审查与回归验证**，确认两条 Issue 的复现条件均被覆盖，再决定关闭问题。[PR #6792](https://github.com/HKUDS/nanobot/pull/6792)
2. **验证 Windows 文件锁场景**，重点确认最终缓存路径版本探测及失败后重试行为。[PR #6791](https://github.com/HKUDS/nanobot/pull/6791)
3. **明确 SDK 接口契约与测试边界**，尤其是直接/流式执行一致性、显式空工具选择和权限约束。[PR #6789](https://github.com/HKUDS/nanobot/pull/6789)

**健康度结论：**当前样本显示，项目具备较快的问题响应与持续的体验维护能力；主要未决风险是关键修复尚未合并，以及关闭 PR 的实际落地状态不明。下一步应关注验证与发布闭环，而非仅以关闭数量衡量进展。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-11-25**  
项目：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

> **统计口径**：依据提供的过去 24 小时更新数据；明细仅覆盖 30 条 Issue、20 条 PR。PR 评论数缺失，且未提供评论正文，因此不能据此判断 PR 讨论热度或引用用户评论。版本日期按发行说明单独标注，不将其视为今天发布。

## 1. 今日速览

过去 24 小时，项目有 **50 条 Issue 更新、50 条 PR 更新**，开发与问题反馈均较活跃；Issue 中 49 条新开或活跃、1 条关闭，PR 中 46 条待合并、4 条已合并或关闭。可见明细主要围绕 **大型会话库性能、Desktop 稳定性、多配置档案及插件兼容**，体现出长期运行和复杂部署场景带来的维护压力。SQLite 历史数据兼容、React 界面异常等问题已有修复 PR，但仍处于 OPEN 状态，不能视为已交付。整体判断：**迭代活跃、修复响应可见，但待验证与待合并工作较多**；当天净新增积压及实际合并吞吐无法由当前快照确定。  
[Issues](https://github.com/NousResearch/hermes-agent/issues) · [PRs](https://github.com/NousResearch/hermes-agent/pulls)

## 2. 版本发布

### v0.23.4：稳定补丁版本
**发行说明日期：2026-11-23**

- 汇总自 v0.23.3 以来合并的约 **229 个 PR**。
- 面向 GitHub 发布渠道的 CLI/安装器、Microsoft Store、Docker 和 Hermes Cloud。
- 该版本说明未逐项列出功能与修复，完整精选说明计划随 **v0.24.0** 提供。
- **破坏性变更与迁移**：所给说明未声明破坏性变更，也未提供迁移步骤；这不等于已确认不存在兼容风险。使用历史 `state.db`、多 profile 或自建插件的用户，升级前宜备份配置及数据库并验证关键流程。

[发行说明](https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.4)

### canary.20261124T064706Z-v0.23.3：预发布构建
**发行说明日期：2026-11-24**

当前摘录仅能确认版本标识及 Desktop 下载入口，未提供完整变更清单，无法可靠判断相对稳定版的修复范围、破坏性变更或迁移要求。建议在独立环境验证，不据版本名称推断其包含全部稳定版修复。  
[Canary 发行页](https://github.com/NousResearch/hermes-agent/releases/tag/canary.20261124T064706Z-v0.23.3)

## 3. 项目进展

**已完成进展的可见证据有限。** 汇总显示 4 条 PR 已合并或关闭，但展示的 20 条 PR 均为 OPEN，无法识别其中哪些已合并、哪些仅关闭，也不能列出“今日已交付”的具体功能。

- **Skills API 问题已关闭**：`GET /v1/skills` 因 `include_editorial` 参数不匹配而持续返回 500 的 [#159844](https://github.com/NousResearch/hermes-agent/issues/159844) 已关闭；未提供关闭原因、关联修复或发布版本，仍需核实交付状态。
- **历史数据兼容进入修复阶段**：[PR #159911](https://github.com/NousResearch/hermes-agent/pull/159911) 针对旧数据库 BLOB 提示词及消息内容解码问题提交修复，尚未合并。
- **桌面端恢复能力继续完善**：[PR #159899](https://github.com/NousResearch/hermes-agent/pull/159899) 拟扩展 React DOM 异常自动恢复；[PR #159883](https://github.com/NousResearch/hermes-agent/pull/159883) 拟修复 macOS 退出后残留无窗口进程。
- **长期会话与交互可靠性改善**：[PR #159881](https://github.com/NousResearch/hermes-agent/pull/159881) 修复恢复会话的空闲压缩触发逻辑；[PR #159880](https://github.com/NousResearch/hermes-agent/pull/159880) 防止 TUI 快速输入执行错误斜杠命令。

**进展判断**：可见成果更多是“问题定位与修复候选增加”，而非已确认上线的大规模功能推进。

## 4. 社区热点

可见 Issue 最高评论数仅 **1 条**，点赞均为 **0**，没有明确的高热度单一议题。以下属于评论数并列靠前、影响具有代表性的问题，而非热度排名。

| 议题 | 可见讨论量 | 背后的诉求 |
|---|---:|---|
| [大型数据库导致会话控制超时 #159886](https://github.com/NousResearch/hermes-agent/issues/159886) | 1 评论 | 约 4 万会话、2.86 GiB 数据库场景下，用户需要可扩展的持久化与锁竞争治理，而不只是提高超时阈值。 |
| [Skills 本地化阻碍更新 #159912](https://github.com/NousResearch/hermes-agent/issues/159912) | 1 评论 | 希望将本地化触发描述与上游技能正文分离，兼顾检索体验和持续更新。 |
| [秘密输入后仍被聊天追问 #159882](https://github.com/NousResearch/hermes-agent/issues/159882) | 1 评论 | 安全输入流程与技能缓存状态需一致，避免用户误以为必须在聊天中再次提交秘密。 |
| [ACP 推理强度菜单不完整 #159858](https://github.com/NousResearch/hermes-agent/issues/159858) | 1 评论 | 多模型客户端需要完整能力发现，不能只暴露会话初始模型的控制选项。 |
| [多 profile 的 Honcho 记忆隔离 #159804](https://github.com/NousResearch/hermes-agent/issues/159804) | 1 评论 | Windows、自托管记忆、无消息网关用户需要更清晰的会话归属与隔离文档。 |

## 5. Bug 与稳定性

以下按**潜在用户影响**排序，并非重新定义仓库优先级。未列出修复 PR，表示提供的数据中未见，不代表仓库中不存在。

| 风险层级 | 问题及影响 | 修复状态 |
|---|---|---|
| **高：潜在数据损失** | 空闲 scratch 清理器被报告删除约 979 MB 独有归档内容，暴露保护规则与清理边界风险。 | [PR #159913](https://github.com/NousResearch/hermes-agent/pull/159913) OPEN，拟遵守保护模式并在不确定时停止清理。 |
| **高：核心会话不可用** | 全量路由索引持久化反复改写约 3.5 万行，出现长写锁、读池耗尽及 Desktop 30 秒超时。 | [Issue #159886](https://github.com/NousResearch/hermes-agent/issues/159886)，未见 fix PR。 |
| **高：历史数据兼容崩溃** | 旧 `state.db` 的 BLOB 值引发提示词哈希崩溃、消息内容解码失败。 | [Issue #159863](https://github.com/NousResearch/hermes-agent/issues/159863) → [PR #159911](https://github.com/NousResearch/hermes-agent/pull/159911)，OPEN。 |
| **高：消息丢失或不可读** | Bot Mode 超约 2,000 字符回复显示为空；WhatsApp 用户名用户的无手机号消息被丢弃，且无法向 BSUID 回复。 | [#159916](https://github.com/NousResearch/hermes-agent/issues/159916)、[#159907](https://github.com/NousResearch/hermes-agent/issues/159907)，均未见 fix PR。 |
| **中高：服务生命周期误伤** | Linux 前台终端命令继承网关 cgroup，网关重启可能终止 adb 等外部守护进程。 | [#159897](https://github.com/NousResearch/hermes-agent/issues/159897)，未见 fix PR。 |
| **中高：降级链失效** | 单模型 429 被提升为整个凭据耗尽，跳过同提供商、不同配额模型的 fallback。 | [#159870](https://github.com/NousResearch/hermes-agent/issues/159870)，未见 fix PR。 |
| **中高：升级长时间无反馈** | `hermes update` 被报告在完整性检查中静默耗时约 57 分钟。 | [#159917](https://github.com/NousResearch/hermes-agent/issues/159917)，未见 fix PR。 |
| **中：界面与会话恢复失败** | React `removeChild` 异常无法自动恢复；profile 网关激活失败时，历史会话持续加载。 | [#159898](https://github.com/NousResearch/hermes-agent/issues/159898) 有 [PR #159899](https://github.com/NousResearch/hermes-agent/pull/159899)；[#159831](https://github.com/NousResearch/hermes-agent/issues/159831) 未见 fix PR。 |
| **中：工具安装与恢复** | Windows 插件安装无法启动捆绑 Git；macOS Computer Use 存在路径硬编码及启动失败缓存问题。 | [#159901](https://github.com/NousResearch/hermes-agent/issues/159901)、[#159878](https://github.com/NousResearch/hermes-agent/issues/159878)、[#159879](https://github.com/NousResearch/hermes-agent/issues/159879)，未见 fix PR。 |

**安全维护提醒**：[Issue #159895](https://github.com/NousResearch/hermes-agent/issues/159895) 请求将捆绑 Node.js 从 26.12.1 升至报告所述安全版本 26.13.1。当前摘要不足以评估具体漏洞暴露面，应核对上游公告及实际打包依赖。

**避免误判**：[Telegram #159909](https://github.com/NousResearch/hermes-agent/issues/159909) 报告了大量重复发送风险告警，但作者明确未确认实际重复投递，不能将告警次数等同于用户受影响次数。

## 6. 功能请求与路线图信号

| 方向 | 当前信号 | 下一版本判断 |
|---|---|---|
| **约束自生成 Skills 数量** | [PR #159906](https://github.com/NousResearch/hermes-agent/pull/159906) 增加 `curator.max_agent_created: N`，控制技能持续膨胀及未来提示词开销。 | 已有实现候选，比纯提案更接近交付；未承诺版本。 |
| **Slack 轻量处理反馈** | [PR #159888](https://github.com/NousResearch/hermes-agent/pull/159888) 提出 `reactions: progress`，保留处理中提示、取消成功勾选。 | 改动范围较集中，具备近期合入可能。 |
| **Docker 供应链透明度** | [PR #159900](https://github.com/NousResearch/hermes-agent/pull/159900) 为发布镜像附加 SPDX SBOM 证明。 | 方向明确，仍待合并验证。 |
| **连接器与业务工具扩展** | [Notion #159894](https://github.com/NousResearch/hermes-agent/issues/159894) 请求数据库/数据源查询；[Keystone PR #159890](https://github.com/NousResearch/hermes-agent/pull/159890) 添加托管 MCP 目录项。 | Keystone 已有 PR；Notion 仍为需求阶段，不能视为已排期。 |
| **本地化与 JS 运行时探索** | [Skills 本地化 #159912](https://github.com/NousResearch/hermes-agent/issues/159912)、[Bun 可选运行时 #159903](https://github.com/NousResearch/hermes-agent/issues/159903)。 | 未见实现 PR，属于路线图观察项，不宜预期下一版必然纳入。 |

## 7. 用户反馈摘要

**以下来自 Issue 描述，而非未提供的评论正文。**

- **重度用户开始触及容量边界**：数万会话、GB 级数据库和近一小时升级检查，说明长期积累的数据正在放大存储与维护成本。[#159886](https://github.com/NousResearch/hermes-agent/issues/159886) · [#159917](https://github.com/NousResearch/hermes-agent/issues/159917)
- **多 profile 已是实际生产场景**：用户在 Windows 上运行多个本地 bot、经 SSH 访问远端 profile，并接入自托管记忆；隔离、模型发现和恢复行为的一致性更加重要。[#159916](https://github.com/NousResearch/hermes-agent/issues/159916) · [#159884](https://github.com/NousResearch/hermes-agent/issues/159884) · [#159804](https://github.com/NousResearch/hermes-agent/issues/159804)
- **“成功执行但结果不可见”损害信任**：任务正常完成却空回复、模型切换已接受但按钮仍显示旧模型，均使用户难以判断真实系统状态。[#159916](https://github.com/NousResearch/hermes-agent/issues/159916) · [PR #159891](https://github.com/NousResearch/hermes-agent/pull/159891)
- **正向反馈证据有限**：Notion 普通页面读取被明确报告可用，但数据库查询缺失阻碍进一步使用；不能由此推断总体满意度。[#159894](https://github.com/NousResearch/hermes-agent/issues/159894)

## 8. 待处理积压

**无法确认长期未响应项**：可见条目主要创建于 11 月 24—25 日，且缺少维护者回复及历史等待时长。以下是建议优先跟踪的风险队列，而非“长期无人处理”名单。

1. **数据安全与存量兼容**：优先审查 scratch 清理保护修复，并联合验证旧数据库的提示词、消息、频道目录读取路径。[PR #159913](https://github.com/NousResearch/hermes-agent/pull/159913) · [PR #159911](https://github.com/NousResearch/hermes-agent/pull/159911) · [Issue #159862](https://github.com/NousResearch/hermes-agent/issues/159862)
2. **大库性能与升级体验**：建立大型会话库回归样本，重点监控持久化锁时长、读池占用及完整性检查进度。[#159886](https://github.com/NousResearch/hermes-agent/issues/159886) · [#159917](https://github.com/NousResearch/hermes-agent/issues/159917)
3. **跨平台消息与降级可靠性**：补齐长回复、BSUID 用户和模型级限流的测试覆盖。[#159916](https://github.com/NousResearch/hermes-agent/issues/159916) · [#159907](https://github.com/NousResearch/hermes-agent/issues/159907) · [#159870](https://github.com/NousResearch/hermes-agent/issues/159870)
4. **核实关闭到发布的闭环**：为已关闭的 Skills API 故障补充修复提交及首个包含修复的版本，避免用户误以为关闭即代表当前稳定版已解决。[#159844](https://github.com/NousResearch/hermes-agent/issues/159844)

**结论**：今天最值得关注的不是新增功能数量，而是项目能否将活跃的修复队列转化为经过验证的稳定交付。数据安全、大型数据库性能和消息完整性，应优先于外围功能扩张。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报
**日期：2026-11-25｜统计窗口：过去 24 小时**

> **数据口径**：本报仅依据所提供的 GitHub 快照。项目入口标注为 `qwibitai/nanoclaw`，但条目来源均指向 `nanocoai/nanoclaw`，下文沿用条目来源构造链接，不推断仓库迁移关系。PR 评论数为 `undefined`，不能视为零评论。

## 1. 今日速览

过去 24 小时共有 **4 条 Issue、10 条 PR 更新**，其中 9 条 PR 仍待合并，1 条已关闭；没有新版本发布。开发活动主要围绕**聊天无回复、更新失败、依赖兼容与渠道配置一致性**展开，整体活跃度较高，但当前成果以待审修复为主，不能等同于已交付。4 条新报告的 Bug 中，3 条已有对应修复 PR，反映出较快的修复响应；空闲容器后的消息无回复问题则尚未见对应修复。社区讨论热度暂无法量化：Issue 均为零评论、零点赞，PR 评论数缺失，且本次活动主要由 glifocat 贡献。

## 2. 项目进展

### 已关闭：镜像维护 PR，尚不能认定为已交付

- **[#4569：为 `v2.3.0` 发布线更新 hardened image](https://github.com/nanocoai/nanoclaw/pull/4569)**  
  这是窗口内唯一标记为 CLOSED 的 PR，拟将该发布线的镜像指向 `v2026.11.0-20261124T1354`。数据未提供合并标记或关闭原因，因此**不能将其计为已合并或已生效的镜像升级**。

### 待合并：修复覆盖面较广，但实际落地仍待确认

- **交互可靠性**：[#4568](https://github.com/nanocoai/nanoclaw/pull/4568) 为没有产生任何回答的聊天轮次增加一次补充提示，避免静默结束。
- **更新流程**：[#4567](https://github.com/nanocoai/nanoclaw/pull/4567) 在创建备份标签时禁用标签签名，处理启用 Git `tag.gpgsign` 后的更新失败。
- **渠道一致性**：[#4560](https://github.com/nanocoai/nanoclaw/pull/4560) 对齐 Resend adapter 与 pino 版本；[#4559](https://github.com/nanocoai/nanoclaw/pull/4559) 增加 CI 防止渠道依赖与 skills 固定版本发生偏离，且**明确要求先合并 #4560**。
- **镜像维护**：[#4561](https://github.com/nanocoai/nanoclaw/pull/4561)、[#4570](https://github.com/nanocoai/nanoclaw/pull/4570) 均拟更新 `v2026.11.0` 的 hardened image，目标时间戳不同；维护者需确认最终采用版本，不能据此推断存在已披露安全漏洞。

**进展判断**：今日推进主要体现在修复方案与预防性 CI 已提交，而非已确认的主线交付。

## 3. 社区热点

由于缺少可比较的讨论数据，以下按**用户影响及关联开发活动**筛选，并非评论热度排名。

| 关注主题 | 相关条目 | 背后诉求 |
|---|---|---|
| 聊天不能“无声完成” | [Issue #4564](https://github.com/nanocoai/nanoclaw/issues/4564)、[PR #4568](https://github.com/nanocoai/nanoclaw/pull/4568) | 用户需要明确的回答或后续动作，而不是任务结束却没有可见结果。 |
| 空闲后恢复会话的可靠性 | [Issue #4558](https://github.com/nanocoai/nanoclaw/issues/4558) | 长期运行的个人助手应能可靠承接间歇性消息，不能因容器空闲边界丢失响应。 |
| 测试环境与实际安装保持一致 | [PR #4560](https://github.com/nanocoai/nanoclaw/pull/4560)、[PR #4559](https://github.com/nanocoai/nanoclaw/pull/4559) | 减少“测试通过、用户安装却使用另一依赖版本”的验证盲区。 |

## 4. Bug 与稳定性

以下优先级为依据用户影响作出的分析判断，并非项目官方严重等级。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **高** | **空闲 30 分钟后发送消息可能无回复，却被标记为完成**。报告涉及 macOS、`v2026.11.0` 及 main，影响任务交付可信度。[#4558](https://github.com/nanocoai/nanoclaw/issues/4558) | 本次数据中**未见对应 fix PR**。 |
| **高** | **聊天轮次无输出时静默结束**。未调用 `send_message`、未生成 `<message>` 且提供方返回空文本时，用户收不到回答；报告称 Codex 场景后续可能更明显。[#4564](https://github.com/nanocoai/nanoclaw/issues/4564) | 已有 [#4568](https://github.com/nanocoai/nanoclaw/pull/4568)，待合并；拟增加一次 nudge。 |
| **中** | **启用 Git 标签签名导致更新在 prepare 阶段失败**。Linux 报告显示备份标签创建受 `tag.gpgsign` 配置影响；涉及 `v2026.10.0`，相关调用在 main 仍存在。[#4566](https://github.com/nanocoai/nanoclaw/issues/4566) | 已有 [#4567](https://github.com/nanocoai/nanoclaw/pull/4567)，待合并。 |
| **中／开发阻塞** | **`@types/bun` 1.4.4 导致容器类型检查失败**，阻塞依赖升级 #4274；属于应用升级后的兼容问题，并非已证实的运行时崩溃。[#4563](https://github.com/nanocoai/nanoclaw/issues/4563) | 已有 [#4562](https://github.com/nanocoai/nanoclaw/pull/4562)，待合并，适配数值型 `signalCode`。 |

此外，[#4557](https://github.com/nanocoai/nanoclaw/pull/4557) 提议同步升级 `@clack/core` 与 `@clack/prompts`，避免两者独立升级引发版本及取消标记兼容问题，体现出依赖联动治理需求。

## 5. 功能请求与路线图信号

- **Teams 一对一聊天中的线程回复**  
  [#4565](https://github.com/nanocoai/nanoclaw/pull/4565) 已提交实现，拟识别 Teams 预览功能通过 `channelData.replyChain.id` 表示的私聊线程，让机器人在正确线程内回复。这是本窗口最明确的新增功能信号，但尚无证据表明已确定进入下一版本。

- **从功能扩展转向交付可靠性加固**  
  [#4568](https://github.com/nanocoai/nanoclaw/pull/4568) 的空回答补充提示，以及 [#4559](https://github.com/nanocoai/nanoclaw/pull/4559) 的依赖一致性检查，表明近期工程重点包括可观察的交互结果和环境一致性。它们均已有具体实现提案，但合并与发布安排仍未确认。

## 6. 用户反馈摘要

**本次没有可用的 Issue 评论正文，以下仅提炼自问题描述，不代表社区共识或满意度调查。**

- **“显示完成”不等于“实际得到答复”**：两条独立报告涉及无回复体验，分别对应空闲边界和空输出轮次，应分开排查，不能假设由同一修复覆盖。[#4558](https://github.com/nanocoai/nanoclaw/issues/4558)、[#4564](https://github.com/nanocoai/nanoclaw/issues/4564)
- **用户已有的开发环境配置会影响维护操作**：Git 标签签名是正常配置，更新流程需要兼容无人值守执行，而不应依赖交互式标签创建。[#4566](https://github.com/nanocoai/nanoclaw/issues/4566)
- **依赖升级需要验证完整工具链**：Bun 类型变化首先暴露在测试辅助代码中，说明升级验证不能只覆盖业务运行路径。[#4563](https://github.com/nanocoai/nanoclaw/issues/4563)

## 7. 待处理积压

**快照仅覆盖近期活动，无法识别真正“长期未响应”的事项。** 当前应优先关注：

1. **为 #4558 建立明确修复跟踪**：其影响用户消息交付，且在本次数据中是唯一尚未见对应修复 PR 的新 Bug。[Issue #4558](https://github.com/nanocoai/nanoclaw/issues/4558)
2. **推动三个已提交修复完成审查与验证**：重点确认空回答补充提示、签名配置兼容及 Bun 类型适配的覆盖范围。[#4568](https://github.com/nanocoai/nanoclaw/pull/4568)、[#4567](https://github.com/nanocoai/nanoclaw/pull/4567)、[#4562](https://github.com/nanocoai/nanoclaw/pull/4562)
3. **按顺序落地依赖对齐与 CI 防护**：先 #4560，再 #4559，避免校验先行而基础版本尚未对齐。[#4560](https://github.com/nanocoai/nanoclaw/pull/4560)、[#4559](https://github.com/nanocoai/nanoclaw/pull/4559)
4. **澄清镜像 PR 的最终采用关系**：两个待合并更新面向同一发布版本，另有一条跨发布线更新已关闭，需要明确最终镜像及关闭原因。[#4561](https://github.com/nanocoai/nanoclaw/pull/4561)、[#4570](https://github.com/nanocoai/nanoclaw/pull/4570)、[#4569](https://github.com/nanocoai/nanoclaw/pull/4569)

**健康度结论**：修复响应积极，依赖治理开始加入预防机制；主要风险仍是聊天交付可靠性，以及待合并方案尚未转化为可确认的用户侧改进。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报
**日期：2026-11-25**｜[GitHub 仓库](https://github.com/netease-youdao/LobsterAI)

> **数据口径**：本报告依据提供的“过去 24 小时”列表整理。其中部分 PR 的更新时间为 11 月 24 日，是否落在统计窗口内需结合时区核验；`CLOSED` 仅表示已关闭，不能据此确认已合并。评论字段均为 `undefined`，不按“零评论”处理。

## 1. 今日速览

LobsterAI 本期共列出 **14 条 PR 更新：1 条开放、13 条关闭**，未记录到 Issue 更新或新版本发布，开发侧活跃度较高。工作主要集中在 **DSH 迁移稳定性、桌面交互优化和产物工作空间扩展**，13 条关闭 PR 中，按标题分类有 7 条功能增强、6 条修复。迁移相关修复覆盖微信授权、会话上下文、模型预设、媒体预览和 MCP 工具注册，反映项目正处于能力扩展与兼容性收敛并行的阶段。整体工程推进较密集，但当前数据不足以确认合并率、发布可用性或社区满意度。  
相关：[PR 列表](https://github.com/netease-youdao/LobsterAI/pulls)

## 2. 项目进展

### DSH 工具能力与可观测性增强
- **本地 HTML 转图片**：新增宿主工具 `lobsterai_render_html_to_image`，利用 Electron 内置 Chromium 将本地 HTML 渲染为 PNG/JPEG；支持单文件、最多 20 个文件的批处理，以及固定视口或整页截图。它扩展了智能体生成可视化交付物的能力。**状态：已关闭，合并待核验。**  
  [PR #3183](https://github.com/netease-youdao/LobsterAI/pull/3183)
- **统一宿主诊断日志**：将 DSH 宿主的 Cordis 日志转发至 Electron 主日志，并进行凭据过滤、颜色清理和单条长度限制，有助于降低跨进程排障成本。**状态：已关闭。**  
  [PR #3174](https://github.com/netease-youdao/LobsterAI/pull/3174)

### 产物工作空间向“可编辑工作台”演进
- 新增产物工作空间新标签页、文件名内联修改、空白 `.docx` / `.xlsx` / `.pptx` 创建及媒体预览等能力。项目由“查看智能体生成文件”进一步迈向“创建、整理和编辑工作产物”。**状态：已关闭。**  
  [PR #3181](https://github.com/netease-youdao/LobsterAI/pull/3181)

### 桌面产品体验持续完善
- **任务组织**：增加置顶任务区域、手动拖拽排序、任务悬浮卡片及模型切换确认，改善多任务管理体验。  
  [PR #3179](https://github.com/netease-youdao/LobsterAI/pull/3179)
- **首页发现与额度展示**：增加首页案例展示中心，以及额度徽标、详情弹层和轻量刷新机制，分别改善功能发现与额度信息可见性。  
  [PR #3175](https://github.com/netease-youdao/LobsterAI/pull/3175) · [PR #3176](https://github.com/netease-youdao/LobsterAI/pull/3176)
- **皮肤定制**：支持直接复用会话附图，并增加背景清晰度预设，减少图片在聊天与皮肤设计之间流转的步骤。  
  [PR #3180](https://github.com/netease-youdao/LobsterAI/pull/3180)

**推进评估**：本期进展横跨工具执行、文件工作空间和桌面交互，范围较广；但关闭数量不等于交付数量，仍需核验合并记录、测试结果及后续发布情况。

## 3. 社区热点

**无法可靠评选“讨论最热”条目**：本期没有 Issue 更新，PR 评论数缺失，所有 PR 的 👍 均为 0。以下仅为按变更内容识别的关注主题，不代表社区热度排名。

| 关注主题 | 代表 PR | 背后的需求 |
|---|---|---|
| DSH 升级连续性 | [#3182](https://github.com/netease-youdao/LobsterAI/pull/3182)、[#3177](https://github.com/netease-youdao/LobsterAI/pull/3177) | 升级后保留授权、消息编辑和会话绑定，避免重新配置 |
| 办公产物闭环 | [#3181](https://github.com/netease-youdao/LobsterAI/pull/3181) | 在同一工作区完成创建、命名、预览与后续编辑 |
| 智能体可视化输出 | [#3183](https://github.com/netease-youdao/LobsterAI/pull/3183) | 将 HTML 内容直接转换为可交付图片 |

## 4. Bug 与稳定性

以下按**潜在影响范围与工作流阻断程度**排序，并非维护者官方严重性评级。均已有修复 PR，但当前只确认“已关闭”，不能确认已合并或已发布。

| 优先级 | 问题与影响 | 修复进展 |
|---|---|---|
| 高 | **微信授权在升级后丢失**：OpenClaw 转 DSH 后，已绑定机器人可能需要重新扫码；设置页还会重复提示同一失败。 | 保留并导入旧插件凭据。[#3182](https://github.com/netease-youdao/LobsterAI/pull/3182) |
| 高 | **MCP 就绪判断与产物索引问题**：安装软件包不等于服务已连接；工具注册未完成可能影响调用，历史链接文件也可能未出现在文件库。 | 等待工具注册，并重新扫描历史文件引用。[#3173](https://github.com/netease-youdao/LobsterAI/pull/3173) |
| 中 | **桌面迁移后交互回归**：已发送消息编辑、回复版本切换及对应会话绑定需要恢复。手动备份和导入入口暂被禁用，并保留底层逻辑。 | 恢复相关交互，限制未就绪入口。[#3177](https://github.com/netease-youdao/LobsterAI/pull/3177) |
| 中 | **媒体预览及模型标签异常**：图像编辑原图快照、无扩展名图片 MIME 判断和实际模型显示存在问题。 | 补齐快照保存、类型识别与模型展示。[#3178](https://github.com/netease-youdao/LobsterAI/pull/3178) |
| 中 | **现有会话模型预设保留异常；导出日志提示缺失文件**。 | 保留 DSH 会话预设，跳过不存在的可选日志。[#3172](https://github.com/netease-youdao/LobsterAI/pull/3172) |
| 中 | **首次回复后上下文长度选择器不可用**：DSH 分配原生会话 ID 后，托管会话识别需要调整。 | 根据保存的模型预设维持上下文控制。[#3171](https://github.com/netease-youdao/LobsterAI/pull/3171) |

**稳定性判断**：主要风险集中在迁移兼容性，而非本期新报告的崩溃事件。建议重点回归验证“旧会话升级—授权保留—模型与上下文设置—工具调用—产物查看”的完整链路。

## 5. 功能请求与路线图信号

本期没有新增 Issue，**无法确认来自用户的新功能请求**；以下为 PR 所体现的开发方向。

- **近期明确待处理：应用更新界面统一。** 唯一开放 PR 重做更新卡片、侧栏折叠行、徽标和弹窗样式，向中性、低饱和的侧栏设计体系对齐；若完成审查与合并，可能进入后续版本。  
  [PR #3184](https://github.com/netease-youdao/LobsterAI/pull/3184)
- **办公工作区增强。** 空白 Office 文档、内联重命名与媒体预览，显示产物管理正向更完整的工作台演进。  
  [PR #3181](https://github.com/netease-youdao/LobsterAI/pull/3181)
- **宿主原生工具扩展。** HTML 渲染工具为智能体生成图片类交付物提供新路径。  
  [PR #3183](https://github.com/netease-youdao/LobsterAI/pull/3183)

上述均是开发信号，**不构成下一版本承诺**。

## 6. 用户反馈摘要

**本期没有可引用的 Issue 或评论正文，无法提炼真实用户评价、满意度或需求频次。** 从修复说明可间接识别的使用痛点包括：

- 升级后重新扫码、重新配置会话，增加迁移成本。  
  [PR #3182](https://github.com/netease-youdao/LobsterAI/pull/3182) · [PR #3172](https://github.com/netease-youdao/LobsterAI/pull/3172)
- 编辑历史消息、切换回复版本、调整上下文等日常操作，在迁移后需要保持一致。  
  [PR #3177](https://github.com/netease-youdao/LobsterAI/pull/3177) · [PR #3171](https://github.com/netease-youdao/LobsterAI/pull/3171)
- 图片与文件能否正确展示，直接影响用户检查和复用智能体产出的效率。  
  [PR #3178](https://github.com/netease-youdao/LobsterAI/pull/3178) · [PR #3173](https://github.com/netease-youdao/LobsterAI/pull/3173)

这些是**由工程变更反推的痛点**，不应替代直接用户反馈。

## 7. 待处理积压

- **当前唯一明确待处理 PR：更新卡片样式改造。** [#3184](https://github.com/netease-youdao/LobsterAI/pull/3184) 于当日创建，尚不属于长期积压，可关注侧栏折叠态、弹窗和字体尺度的一致性验证。
- **长期积压无法评估。** 数据未提供历史开放 Issue/PR 或维护者响应记录，不能据此判断是否存在长期未响应事项。建议后续补充开放超过 7/30 天的条目及最后维护者回复时间。  
  [开放 Issues](https://github.com/netease-youdao/LobsterAI/issues) · [开放 PR](https://github.com/netease-youdao/LobsterAI/pulls)

**总体结论**：LobsterAI 本期呈现“开发活跃、迁移修复集中、桌面能力扩展明显”的状态。下一阶段的健康度关键不在关闭数量，而在于确认修复已合并、完成端到端回归，并通过正式版本交付。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报
**日期：2026-11-25｜统计范围：过去 24 小时**

> **数据口径**：输入以 CoPaw 为项目名，但 Issue/PR 记录均指向 `agentscope-ai/QwenPaw`，下文链接按记录生成。PR 的 `CLOSED` 状态不等于已合并；由于缺少合并标记，本文统一称“已关闭”，不将其视为已交付。

## 1. 今日速览

过去 24 小时，共有 **6 条 Issue、8 条 PR 更新**，其中 5 条 PR 开放、3 条已关闭，未有新版本发布，整体呈现**持续活跃、以稳定性修复为主**的节奏。问题集中在模型配置与上下文元数据、工具媒体结果兼容性，以及 Console 交互体验，表明多模型、多智能体使用中的边界问题正在显现（[#8893](https://github.com/agentscope-ai/QwenPaw/issues/8893)、[#8887](https://github.com/agentscope-ai/QwenPaw/issues/8887)）。开发侧正在推进 MCP 错误处理、智能体模型展示、通道停止与 Discord 消息格式修复，但这些 PR 尚未合并，不能计入已交付成果（[#8895](https://github.com/agentscope-ai/QwenPaw/pull/8895)、[#8894](https://github.com/agentscope-ai/QwenPaw/pull/8894)）。从健康度看，贡献活动持续且有首次贡献者参与，但目前讨论量较低，现有数据也不足以判断维护响应速度或问题解决效率。

## 2. 项目进展

### 今日已关闭的重要 PR

| PR | 涉及进展 | 状态与交付判断 |
|---|---|---|
| [#8897 Windows 存储迁移路径修复](https://github.com/agentscope-ai/QwenPaw/pull/8897) | 标题指向存储迁移时对 Windows 路径前缀的处理，有助于跨平台迁移兼容性。 | **已关闭，是否合并未知**；摘要为模板，无法确认实现细节。 |
| [#8896 技能池自动同步菜单 E2E 测试更新](https://github.com/agentscope-ai/QwenPaw/pull/8896) | 涉及自动同步菜单相关端到端测试维护，主要价值在回归保障。 | **已关闭，是否合并未知**；不能据此认定新增了自动同步功能。 |
| [#8886 Creator 2.0.7 相关变更](https://github.com/agentscope-ai/QwenPaw/pull/8886) | 涉及审核恢复与媒体修复；摘要提到清理被拒绝产物版本的陈旧引用，并处理产物槽或时间线引用完整性问题。 | **已关闭，是否合并未知**；PR 标题虽含“release”，但本次数据没有新 Release，不能认定版本已正式发布。 |

**整体推进判断**：今日关闭事项覆盖跨平台兼容、测试维护和 Creator 工作流，方向偏向质量收敛。不过，缺少合并状态与发布记录，**可确认的是变更处理活动，而非已交付功能增量**。

## 3. 社区热点

Issue 评论量最高为 **2 条**，以下三项并列；全部 Issue 的 👍 均为 0，因此尚未形成明显的高热度议题。PR 评论数为 `undefined`，不能用于热度排序。

- **智能体模型配置与实际展示不一致**：[#8893](https://github.com/agentscope-ai/QwenPaw/issues/8893)，2 条评论。用户指出，智能体卡片的“模型”入口跳转至全局模型页，聊天模型选择仅作用于会话，已配置模型还可能显示为“无模型”。核心诉求是明确**全局、智能体、会话三级配置的作用域与优先级**；开放 PR [#8894](https://github.com/agentscope-ai/QwenPaw/pull/8894) 仅针对其中的模型解析与展示问题。
- **内置供应商上下文信息不完整**：[#8891](https://github.com/agentscope-ai/QwenPaw/issues/8891)，2 条评论。`glm-5.3/5.4` 缺少静态上下文配置，且 `catalog_only` 供应商不获取上下文元数据，导致回退至 128k。诉求是官方模型目录能够及时反映模型真实能力。
- **自定义 OpenAI 兼容供应商字段适配不足**：[#8890](https://github.com/agentscope-ai/QwenPaw/issues/8890)，2 条评论。模型发现忽略 `max_input_tokens`，可能向上或向下误判上下文窗口。其背后是 LiteLLM 等兼容服务接入后的元数据一致性需求。

## 4. Bug 与稳定性

以下按**潜在用户影响**排序，并非维护者确认的严重等级；所列问题均仍处于 OPEN 状态。

| 优先级 | 问题与影响 | Fix PR 状态 |
|---|---|---|
| **高** | [#8887 工具媒体结果导致非多模态模型持续报错](https://github.com/agentscope-ai/QwenPaw/issues/8887)：视频或压缩包等媒体引用进入会话上下文后，后续请求反复触发 400，用户看到持续的 “Internal error”。影响可从单次工具调用扩散到整个会话。 | 提供的数据中**未见对应修复 PR**。 |
| **中高** | [#8890 自定义供应商上下文窗口识别错误](https://github.com/agentscope-ai/QwenPaw/issues/8890)：忽略 `max_input_tokens`，可能造成上下文容量误判，影响长对话与请求预算管理。 | **未见对应修复 PR**。 |
| **中高** | [#8891 内置供应商上下文元数据缺失](https://github.com/agentscope-ai/QwenPaw/issues/8891)：新模型及部分目录型供应商回退到 128k 默认值，能力展示与实际限制可能不一致。 | **未见对应修复 PR**。 |
| **中** | [#8893 模型作用域与“无模型”展示问题](https://github.com/agentscope-ai/QwenPaw/issues/8893)：用户难以判断模型配置究竟作用于哪个智能体或会话。 | **有部分修复 PR，尚开放**：[ #8894](https://github.com/agentscope-ai/QwenPaw/pull/8894) 处理智能体绑定的已发现模型未被正确解析的问题，不覆盖全部配置作用域诉求。 |
| **中** | [#8888 Console 对话滚动位置跳跃](https://github.com/agentscope-ai/QwenPaw/issues/8888)：发送消息、上下文压缩或推理块收起导致内容高度缩小时，对话回跳数屏；报告环境为 Windows 桌面端。 | **未见对应修复 PR**。 |

### 正在推进的其他稳定性修复

- [#8895 MCP HTTP 拒绝错误处理](https://github.com/agentscope-ai/QwenPaw/pull/8895)：拟将 HTTP 层拒绝正确报告给调用方，并保留会话，避免误判为连接丢失；对应问题为 [#8875](https://github.com/agentscope-ai/QwenPaw/issues/8875)。**开放，尚未交付。**
- [#8899 通道正常停止需等待 worker 确认](https://github.com/agentscope-ai/QwenPaw/pull/8899) 与 [#8898 SDK 通道 worker 停止测试稳定化](https://github.com/agentscope-ai/QwenPaw/pull/8898)：共同指向通道生命周期可靠性，但摘要不足以判断二者是否直接关联。**均开放。**
- [#8889 Discord 代码围栏拆分修复](https://github.com/agentscope-ai/QwenPaw/pull/8889)：处理消息长度边界处多余闭合围栏、重复起始围栏等格式问题。**开放，尚未交付。**

## 5. 功能请求与路线图信号

- **输入框内置“AI 提示词润色”**：[#8892](https://github.com/agentscope-ai/QwenPaw/issues/8892) 请求一键优化已输入的提示词，减少手动改写成本。当前有 1 条评论、0 个 👍，未见实现 PR，**只能视为需求收集，不能判断已纳入下一版本**。
- **智能体级模型配置与可观测性**：[#8893](https://github.com/agentscope-ai/QwenPaw/issues/8893) 暴露出配置作用域的产品设计需求；[#8894](https://github.com/agentscope-ai/QwenPaw/pull/8894) 已提供局部实现方案。相比完整配置体验改造，**模型展示修复更接近可交付状态**，但合并与版本安排仍未知。
- **近期更偏向可靠性打磨，而非新增能力扩张**：MCP 会话保留、通道停止确认和 Discord 格式修复均有开放 PR，说明已有具体修复投入；没有里程碑或发布计划数据，不能进一步推断下一版本的收录清单（[#8895](https://github.com/agentscope-ai/QwenPaw/pull/8895)、[#8899](https://github.com/agentscope-ai/QwenPaw/pull/8899)、[#8889](https://github.com/agentscope-ai/QwenPaw/pull/8889)）。

## 6. 用户反馈摘要

> 输入仅包含 Issue 正文摘要与评论数量，没有评论正文。以下提炼自问题描述，不代表评论区共识。

- **“配置了，但不知道是否生效”**：多智能体用户需要清晰的模型绑定与作用域反馈，而不是依靠全局页面或会话选择器推断状态（[#8893](https://github.com/agentscope-ai/QwenPaw/issues/8893)）。
- **“一次工具调用不应让后续会话全部失效”**：视频查看、文件发送等工具使用场景需要模型能力检查与媒体结果兼容处理，避免错误在上下文中持续传播（[#8887](https://github.com/agentscope-ai/QwenPaw/issues/8887)）。
- **“长对话需要可信的上下文容量信息”**：内置供应商与自定义兼容端点都存在元数据缺口，反映出用户对跨供应商一致性的要求（[#8891](https://github.com/agentscope-ai/QwenPaw/issues/8891)、[#8890](https://github.com/agentscope-ai/QwenPaw/issues/8890)）。
- **“阅读位置应保持稳定”**：长对话中，推理块收起或上下文压缩不应打断阅读连续性（[#8888](https://github.com/agentscope-ai/QwenPaw/issues/8888)）。

当前样本以缺陷和需求反馈为主，**没有足够信息总结用户满意度或正向评价**。

## 7. 待处理积压与维护提醒

**无法识别长期未响应积压**：所列条目均创建于 11 月 24—25 日，且缺少维护者回复内容、审核记录与更长期历史，不宜将其标记为长期搁置。

建议优先跟进：

1. **确认会话持续报错的止损方案**：优先复现并处理 [#8887](https://github.com/agentscope-ai/QwenPaw/issues/8887)，明确媒体引用过滤、能力判断及受影响会话恢复方式。
2. **统筹上下文元数据问题**：联合排查 [#8890](https://github.com/agentscope-ai/QwenPaw/issues/8890) 与 [#8891](https://github.com/agentscope-ai/QwenPaw/issues/8891)，同时覆盖字段识别、静态表与供应商元数据获取路径。
3. **明确局部修复边界**：审核 [#8894](https://github.com/agentscope-ai/QwenPaw/pull/8894) 时，区分“已发现模型展示修复”与 [#8893](https://github.com/agentscope-ai/QwenPaw/issues/8893) 中更广泛的配置作用域问题，避免过早判定整项解决。
4. **补齐关闭 PR 的结果信息**：核验 [#8897](https://github.com/agentscope-ai/QwenPaw/pull/8897)、[#8896](https://github.com/agentscope-ai/QwenPaw/pull/8896)、[#8886](https://github.com/agentscope-ai/QwenPaw/pull/8886) 的合并或关闭原因，确保日报与发布说明准确反映交付状态。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报
**日期：2026-11-25**  
**统计范围：所提供的过去 24 小时 GitHub 更新数据**  
**项目地址：[qhkm/zeptoclaw](https://github.com/qhkm/zeptoclaw)**

## 1. 今日速览
过去 24 小时，ZeptoClaw 未记录到 Issue 更新、新版本发布或 PR 合并/关闭，仅有 **1 条待合并的依赖更新 PR**。该 PR 由 Dependabot 提交，拟将 Docker 中的 Rust 镜像从 `1.98-slim-trixie` 升级至 `1.99-slim-trixie`，属于工具链与构建环境维护。今日可见活跃度较低，未出现功能交付或社区讨论升温的信号。单日数据不足以判断项目长期健康度；当前能够确认的是依赖更新自动化仍在运行，但更新是否通过验证、何时合并尚不明确。  
来源：[项目仓库](https://github.com/qhkm/zeptoclaw) · [PR #728](https://github.com/qhkm/zeptoclaw/pull/728)

## 2. 项目进展
### Rust Docker 镜像升级待合并
- **PR：**[#728 — fix(deps): bump rust from 1.98-slim-trixie to 1.99-slim-trixie](https://github.com/qhkm/zeptoclaw/pull/728)
- **状态：**OPEN；作者为 `dependabot[bot]`；标签为 `dependencies`、`docker`。
- **变更内容：**将 Rust Docker 镜像标签从 `1.98-slim-trixie` 更新至 `1.99-slim-trixie`。
- **推进价值：**旨在更新容器构建所用的 Rust 工具链，不属于直接面向用户的功能交付。
- **当前边界：**尚未合并，数据也未提供 CI、测试或兼容性验证结果，因此不能确认升级已落地或已改善稳定性。

**进展判断：**今日没有已合并/关闭的 PR，整体处于维护准备阶段，未见可确认的新功能或修复交付。

## 3. 社区热点
今日唯一可见的更新是 [PR #728](https://github.com/qhkm/zeptoclaw/pull/728)，其核心诉求是保持 Rust Docker 工具链版本更新。

- **互动情况：**👍 为 **0**；评论字段为 `undefined`，应视为数据缺失，不能认定为零评论。
- **热度判断：**没有足够证据将其认定为社区热点，也无法进行讨论活跃度排名。
- **性质判断：**这是自动化维护请求，而非已得到用户讨论支持的需求信号。

## 4. Bug 与稳定性
今日数据中**没有新增或更新的 Bug、崩溃、回归问题报告**，因此无可按严重程度排序的条目；这也不代表项目不存在未解决缺陷。  
来源：[项目 Issues](https://github.com/qhkm/zeptoclaw/issues)

唯一需要关注的潜在验证项是工具链升级兼容性：建议合并前确认 Docker 构建及现有测试是否通过。当前未提供失败记录，也没有证据表明该升级已引入回归；[#728](https://github.com/qhkm/zeptoclaw/pull/728) 不是针对已报告 Bug 的 fix PR。

## 5. 功能请求与路线图信号
今日无新增功能请求或相关 Issue 更新，未见可据此判断下一版本功能范围的信号。现有 [PR #728](https://github.com/qhkm/zeptoclaw/pull/728) 仅体现工具链维护方向；若验证通过并合并，可能进入后续构建流程，但不能据此推断下一版本的发布时间或功能计划。

## 6. 用户反馈摘要
所提供数据中没有 Issue 评论，无法提炼真实用户的使用场景、痛点或满意度。Dependabot 提交的依赖升级也不应被当作用户反馈。**今日反馈不足，应保持观察，而非推断用户满意或不满。**  
来源：[项目 Issues](https://github.com/qhkm/zeptoclaw/issues) · [PR #728](https://github.com/qhkm/zeptoclaw/pull/728)

## 7. 待处理积压
| 待处理事项 | 当前状态 | 建议关注 |
|---|---|---|
| [PR #728：Rust Docker 镜像升级](https://github.com/qhkm/zeptoclaw/pull/728) | 11 月 24 日创建，仍为 OPEN | 检查 CI 与兼容性结果，再决定是否合并 |

该 PR 刚创建约一天，**不宜归类为长期积压或维护者响应迟缓**。由于输入仅覆盖过去 24 小时的更新，无法识别仓库中长期未响应的重要 Issue 或 PR。

---

**健康度结论：**今日呈现“低活跃、以自动化依赖维护为主”的状态；没有观察到新的缺陷报告，也没有已完成的功能交付。短期关注点是 [PR #728](https://github.com/qhkm/zeptoclaw/pull/728) 的验证与合并进展，长期健康度仍需结合更长周期的发布、响应和交付数据判断。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：2026-11-25**  
**项目：[zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)**

> 统计依据：所提供的近 24 小时更新清单。部分条目的更新时间为 11 月 24 日，可能涉及统计窗口或时区差异；本文沿用清单口径。PR 评论数缺失，不视为零。

## 1. 今日速览

近 24 小时共记录 **3 条 Issue、6 条 PR 更新**，均处于开放状态，**没有 PR 合并或关闭，也没有新版本发布**。开发活动主要集中在聊天渠道的模型选择与凭据一致性、工具调用兼容性，以及 CI 稳定性，属于以修复和工程维护为主的一天。功能方向出现了本地嵌入式 Turso 记忆后端，以及由守护进程持有 OIDC 刷新授权两项信号。整体有持续贡献活动，但当日交付吞吐为零；现有数据不足以判断长期活跃度趋势或社区讨论热度。  
相关入口：[Issues](https://github.com/zeroclaw-labs/zeroclaw/issues) · [Pull Requests](https://github.com/zeroclaw-labs/zeroclaw/pulls)

## 2. 项目进展

**今日没有已合并或已关闭的重要 PR。** 以下进展均为待审方案，不能视为已经进入主分支或可供用户使用。

| 方向 | 待合并进展 | 对项目的意义 |
|---|---|---|
| 模型选择一致性 | [#12702](https://github.com/zeroclaw-labs/zeroclaw/pull/12702)：修复固定 profile 下，`/model` 显示已切换但实际请求仍使用配置模型的问题 | 让聊天界面的选择与实际推理请求保持一致 |
| 路由与凭据一致性 | [#12701](https://github.com/zeroclaw-labs/zeroclaw/pull/12701)：让路由 API key 随路由选择保持一致 | 降低多模型、多凭据场景下的鉴权与路由异常 |
| 工具调用兼容性 | [#12704](https://github.com/zeroclaw-labs/zeroclaw/pull/12704)：为恢复出的工具结果补齐配对工具名称 | 解决 Groq 拒绝缺少 `name` 的工具消息的问题 |
| CI 与脚本可靠性 | [#12705](https://github.com/zeroclaw-labs/zeroclaw/pull/12705)、[#12706](https://github.com/zeroclaw-labs/zeroclaw/pull/12706)：改善运行时测试中断处理、参数校验与 macOS 超时配置 | 改善开发反馈流程，但实际效果仍需验证 |
| 安全治理记录 | [#12708](https://github.com/zeroclaw-labs/zeroclaw/pull/12708)：补录 OIDC 刷新授权例外条目的批准信息 | 完善审批记录，不等同于认证功能实现完成 |

**进展判断：** 当前推进主要体现在修复方案和治理材料的准备，尚未转化为当日可确认的交付成果。

## 3. 社区热点

**无法按讨论热度可靠排名：** 3 条 Issue 均为 **0 评论、0 👍**；6 条 PR 均为 **0 👍**，但评论数未提供。以下是值得关注的议题，而非已形成广泛讨论的“热门话题”。

- **本地记忆存储的可选性**：[Issue #12709](https://github.com/zeroclaw-labs/zeroclaw/issues/12709) 提议增加原生嵌入式 Turso 后端，SQLite 仍为默认。诉求是提供另一种本地存储引擎，而不是引入 Turso Cloud、libSQL 或额外索引。
- **设备会话的持续可用性与安全边界**：[Issue #12707](https://github.com/zeroclaw-labs/zeroclaw/issues/12707) 跟踪 daemon 持有 OIDC refresh grant 的实现。其 `risk:high` 标签说明需要重点安全审查，**并不代表已确认存在高危漏洞**。
- **邮件自动回复的重复执行**：[Issue #12703](https://github.com/zeroclaw-labs/zeroclaw/issues/12703) 报告已回复邮件仍保持未读，重启后再次处理。该问题直接关系到个人助手长期运行的可信度。

## 4. Bug 与稳定性

以下按已知用户影响作初步排序，**不是官方严重性评级**。

| 优先级 | 问题与影响 | Fix PR 状态 |
|---|---|---|
| **高** | **邮件重启后重复回复**：默认 `observer_mode = false` 时，实时处理的邮件未设置 IMAP `\Seen`，下次启动会再次处理未读积压，可能重复对外发送回复。[#12703](https://github.com/zeroclaw-labs/zeroclaw/issues/12703) | 提供清单中未见对应修复 PR |
| **中高** | **模型切换显示与实际请求不一致**：固定 profile 配置了 `model` 时，`/model` 的成功提示未反映实际使用模型。[#12702](https://github.com/zeroclaw-labs/zeroclaw/pull/12702) | 已有，待合并 |
| **中高** | **路由选择与 API key 一致性问题**：涉及聊天渠道中路由自带凭据的保存与使用；摘要不足以确认完整触发路径及是否存在安全外溢。[#12701](https://github.com/zeroclaw-labs/zeroclaw/pull/12701) | 已有，待合并 |
| **中** | **Groq 工具消息被拒绝**：损坏消息恢复分支补回 `tool_call_id`，但遗漏工具名称，导致特定工具调用链路失败。[#12704](https://github.com/zeroclaw-labs/zeroclaw/pull/12704) | 已有，待合并 |
| **工程稳定性** | **测试中断与参数校验问题**：并行运行时测试的 Ctrl-C 停止行为，以及零填充参数处理需要修正。[#12705](https://github.com/zeroclaw-labs/zeroclaw/pull/12705) | 已有，待合并 |
| **工程稳定性** | **macOS CI 安装阶段超时**：PR 拟将超时由 45 分钟延长至 90 分钟；摘要同时提及 rustup 与路径环境问题，因此延长超时是否足以解决仍需验证。[#12706](https://github.com/zeroclaw-labs/zeroclaw/pull/12706) | 已有，待合并 |

## 5. 功能请求与路线图信号

- **可选本地 Turso 记忆后端——提案阶段。** [#12709](https://github.com/zeroclaw-labs/zeroclaw/issues/12709) 明确保留 SQLite 默认地位，属于可选能力扩展。当前没有配套实现 PR，不能据此判断将进入下一版本。
- **daemon 持有 OIDC 刷新授权——已有实施跟踪。** [#12707](https://github.com/zeroclaw-labs/zeroclaw/issues/12707) 基于已合并的 ADR-017 修订建立实施 tracker，另有审批记录 PR [#12708](https://github.com/zeroclaw-labs/zeroclaw/pull/12708)。相较 Turso 提案，实施信号更明确，但缺少完成时间与发布承诺。
- **近期版本候选更偏向修复。** 模型切换、路由凭据和工具消息修复已有具体 PR，比尚无实现的功能提案更接近交付；是否进入下一版本仍取决于审查、测试与合并。[#12702](https://github.com/zeroclaw-labs/zeroclaw/pull/12702) · [#12701](https://github.com/zeroclaw-labs/zeroclaw/pull/12701) · [#12704](https://github.com/zeroclaw-labs/zeroclaw/pull/12704)

## 6. 用户反馈摘要

**数据限制：未提供 Issue 评论正文，且 Issue 评论数均为零，因此不能声称存在评论共识或满意度趋势。** 从报告正文和 PR 描述可提炼出：

- **常驻邮件助手需要避免重复执行。** 用户期待已处理邮件在重启后不再被当作待办，当前行为破坏了这一预期。[#12703](https://github.com/zeroclaw-labs/zeroclaw/issues/12703)
- **模型切换需要“所见即所得”。** `/model` 的反馈与实际请求不一致，使用户难以确认助手正在使用哪个模型；该信号来自 PR 描述，而非评论。[#12702](https://github.com/zeroclaw-labs/zeroclaw/pull/12702)
- **本地部署用户希望有存储选择。** Turso 提案反映了对本地记忆后端扩展性的需求，但目前仅有单条提案，不能外推为普遍诉求。[#12709](https://github.com/zeroclaw-labs/zeroclaw/issues/12709)

## 7. 待处理积压

**当前清单条目均创建于 11 月 24—25 日，不能认定存在“长期未响应”的积压。** 建议维护者优先关注以下待办：

1. **优先分诊邮件重复回复问题**：确认影响范围、补充重启复现测试，并给出临时规避方案；当前未见关联修复。[#12703](https://github.com/zeroclaw-labs/zeroclaw/issues/12703)
2. **协调审查模型选择与凭据修复**：两项 PR 涉及相邻状态流，建议联合验证 profile、route、model 与 API key 的切换一致性。[#12702](https://github.com/zeroclaw-labs/zeroclaw/pull/12702) · [#12701](https://github.com/zeroclaw-labs/zeroclaw/pull/12701)
3. **跟踪高风险认证能力的实施与审查**：将审批记录补全与具体实现验收区分开，避免把文档完成视为能力交付。[#12707](https://github.com/zeroclaw-labs/zeroclaw/issues/12707) · [#12708](https://github.com/zeroclaw-labs/zeroclaw/pull/12708)

**健康度结论：** 项目仍有持续修复与功能规划活动，但今日没有合并交付，社区互动证据也较有限。短期最值得跟踪的是用户可感知的重复执行、模型选择和工具兼容问题能否尽快完成验证与合并。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*