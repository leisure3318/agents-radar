# OpenClaw 生态日报 2026-11-21

> Issues: 12 | PRs: 33 | 覆盖项目: 13 个 | 生成时间: 2026-11-21 04:15 UTC

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
**日期：2026-11-21｜统计范围：过去 24 小时**

## 1. 今日速览

OpenClaw 今日保持较高开发活跃度：**12 条 Issue 更新、33 条 PR 更新**，其中 11 条 Issue 仍开放、22 条 PR 待合并，另有 1 条 Issue 和 11 条 PR 已关闭或合并。工作重点集中在 **Claude CLI 会话可靠性、实时语音链路、低内存环境运行和更新机制**，同时持续推进移动端重构与测试维护。稳定性方面，一项涉及长会话失效与消息丢失风险的 P0 问题仍待维护者审查，FaceTime 也集中出现多项故障报告。今日没有新版本发布，整体呈现“开发活跃、修复与重构并行，但关键可靠性问题尚未闭环”的状态。代表性事项：[P0 会话问题 #202518](https://github.com/openclaw/openclaw/issues/202518)、[共享 Worker Host #202495](https://github.com/openclaw/openclaw/pull/202495)。

> **数据口径**：所提供 PR 明细仅覆盖 33 条中的 30 条；`CLOSED` 未区分“合并”与“直接关闭”，本文不将其自动视为已落地主干。PR 评论数均为 `undefined`，Issue 仅提供评论数量、未提供评论正文，因此无法可靠建立 PR 热度排名或提炼评论原话。

## 2. 项目进展

### 今日已关闭的重要事项

| 事项 | 推进方向与实际意义 | 状态边界 |
|---|---|---|
| [Claude CLI 插件会话分叉 #202369](https://github.com/openclaw/openclaw/pull/202369)、[订阅 CLI 会话使用原 CLI 分叉 #202659](https://github.com/openclaw/openclaw/pull/202659) | 两项方案均针对插件后台分叉仍走 Provider API、导致仅使用 Claude 订阅且无 API Key 的用户无法使用提示词助手、审查等能力的问题。 | 均已关闭；无法确认哪项实现获采用，且涉及兼容性与安全边界审查。 |
| [异步 stdin 提示后的 secret 输入 #202646](https://github.com/openclaw/openclaw/pull/202646) | 针对前台 Gateway 中后台 CLI 运行报 `secret input file descriptor 3 is unavailable`，补齐订阅认证相关进程交互路径。 | 已关闭，是否合并未提供。 |
| [插件内存后端与 Provider Store 契约测试 #202919](https://github.com/openclaw/openclaw/pull/202919) | 新增 19 项测试，覆盖变异测试暴露的边界行为，提升插件基础设施回归防护。 | 已关闭；仅测试变更，无生产行为变更。 |
| [Resource Host 测试使用正确 Node 运行时 #202909](https://github.com/openclaw/openclaw/pull/202909) | 避免在 Bun 下启动子进程时因缺少 Node `registerHooks` 能力而提前退出，让生命周期测试真正覆盖目标行为。 | 已关闭，是否合并未提供。 |
| [Matrix 插件会话绑定元数据丢失 #202908](https://github.com/openclaw/openclaw/issues/202908) | 涉及文档化绑定 API 在 Matrix 上无法创建插件自有会话绑定的问题。 | Issue 已关闭，但未提供关联修复及关闭原因，不能据此断言已修复。 |

**进展判断：**今日的重要关闭事项覆盖了订阅 CLI 可用性、插件契约和测试可信度，但缺少明确合并记录与新版本，尚不能量化为“用户已获得多少修复”。与此同时，[MCP 工具目录缓存优化 #202902](https://github.com/openclaw/openclaw/pull/202902)、[Git 克隆超时改进 #202924](https://github.com/openclaw/openclaw/pull/202924)仍在开放阶段，说明启动性能与任务执行可靠性也是当前投入方向。

## 3. 社区热点

**可见讨论量整体不高。**Issue 评论最多的是 [#202518](https://github.com/openclaw/openclaw/issues/202518)，共 2 条；其余多数为 1 条，最新 macOS 更新问题为 0 条。所有展示条目的 👍 均为 0，不能用反应数证明广泛共识。

- **长会话中的 Claude CLI 生命周期失效**  
  [#202518](https://github.com/openclaw/openclaw/issues/202518) 同时带有 P0、会话状态、消息丢失及用户体验发布阻断标签，是今日最高优先级的可靠性信号。背后诉求是：多智能体任务完成、让出执行权之后，主会话必须能够正常收尾并接续下一轮，而不是复用失效运行实例。

- **实时语音从“能接通”转向“能稳定完成任务”**  
  FaceTime 连续出现 [播放进程退出 #202916](https://github.com/openclaw/openclaw/issues/202916)、[Agent 咨询失败 #202915](https://github.com/openclaw/openclaw/issues/202915)、[过早接听导致静音 #202917](https://github.com/openclaw/openclaw/issues/202917)；另有 [GPT-Live 委派策略不兼容 #202910](https://github.com/openclaw/openclaw/issues/202910)。这些问题共同反映音频、模型就绪、工具调用与会话生命周期之间仍有衔接缺口。

- **自动化通知与处置入口脱节**  
  [#202913](https://github.com/openclaw/openclaw/issues/202913) 指出失败或逾期自动化增加 Inbox 计数，但排障仍需进入 Automations。对应 [PR #202921](https://github.com/openclaw/openclaw/pull/202921) 提议用侧栏时钟红点替代 Inbox 通知，诉求是减少噪声并统一处理入口。

- **更新可靠性受到关注**  
  [macOS 更新激活失败 #202925](https://github.com/openclaw/openclaw/issues/202925) 与 [并排更新模型提案 #202922](https://github.com/openclaw/openclaw/pull/202922)同时出现。后者引用单个维护者主机 53 次更新仅 22 次成功的记录，说明更新流程值得专项治理；该样本不能外推为项目整体成功率。

## 4. Bug 与稳定性

以下按现有优先级排列；“未见修复 PR”仅指本次数据未提供对应记录。

| 优先级 | 问题及影响 | 修复进度 |
|---|---|---|
| **P0** | [#202518：Claude CLI 长会话在 `sessions_spawn` + `sessions_yield` 后不结束](https://github.com/openclaw/openclaw/issues/202518)。后续轮次复用失效会话，涉及消息丢失与会话状态风险；报告覆盖 2026.11.5/11.6。 | **未见 fix PR**；待维护者审查。 |
| **P1** | [#202916：FaceTime SoX 播放重启后很快收到音频，导致通话挂断](https://github.com/openclaw/openclaw/issues/202916)。 | **未见 fix PR**；仍需现场复现。 |
| **P1** | [#202915：FaceTime `openclaw_agent_consult` 持续返回 Gateway 暂不可用](https://github.com/openclaw/openclaw/issues/202915)。报告指向咨询任务运行于已释放的根上下文。 | **未见 fix PR**；已有源码复现与可排队修复标签。 |
| **P2** | [#202900：Stream Automation 的 relay 退出后立即耗尽重启额度](https://github.com/openclaw/openclaw/issues/202900)。重新启用无效，需重启 Gateway，且缺少用户提示。 | **未见 fix PR**；待维护者审查及产品决策。 |
| **P2** | [#202910：`consultPolicy: "substantive"` 与 GPT-Live/Discord 不兼容](https://github.com/openclaw/openclaw/issues/202910)。Voice Call 指示模型调用不存在的工具，Discord 则拒绝该配置值。 | **已有开放 PR [#202918](https://github.com/openclaw/openclaw/pull/202918)**；需补充验证，带兼容性风险标签。 |
| **P2** | [#202917：FaceTime 在实时 Provider 就绪前接听](https://github.com/openclaw/openclaw/issues/202917)。来电约 0.4 秒即被接起，用户随后等待静音。 | **未见 fix PR**；已有源码复现与可排队修复标签。 |
| **P2，已关闭** | [#202908：Matrix 会话绑定丢失插件元数据](https://github.com/openclaw/openclaw/issues/202908)。影响插件自有绑定创建，报告称旧版亦存在。 | Issue 已关闭；**未提供修复依据**。 |
| **未标优先级** | [#202925：macOS 更新修复拒绝执行器所有权](https://github.com/openclaw/openclaw/issues/202925)。从 2026.11.3 升至 2026.11.5 时包已安装，但激活失败，涉及 SQLite 锁及迁移后无法回滚状态。 | **未见 fix PR**；0 条评论，建议尽快分诊。 |

此外，[Telegram 多 Agent 媒体发送修复 #202899](https://github.com/openclaw/openclaw/pull/202899) 为开放 P1 PR，针对显式 Agent 所有权配置下媒体发送触发 `AgentSelectionRequiredError`，当前仍需验证证据。

## 5. 功能请求与路线图信号

以下为基于开放 PR 的方向判断，**并非下一版本承诺**。

- **实时语音策略与通知体验：已有对应实现，路径较明确。**  
  [语音委派策略 PR #202918](https://github.com/openclaw/openclaw/pull/202918) 和 [自动化通知 PR #202921](https://github.com/openclaw/openclaw/pull/202921)均直接关联当日 Issue；但前者尚需验证，后者涉及较大 UI 改动，仍需评审。

- **低内存部署：形成连续优化方向。**  
  [共享核心 Worker Host #202495](https://github.com/openclaw/openclaw/pull/202495)减少重复代码加载，[Worker 内存预算 #202507](https://github.com/openclaw/openclaw/pull/202507)限制资源增长，面向 1–2 GiB 主机、容器和笔记本。两者均为 XL 级改动且等待作者，不能按小型性能补丁估计落地速度。

- **单会话协作权限：从“全局写权限”向最小授权演进。**  
  [#202552](https://github.com/openclaw/openclaw/pull/202552)拟允许邀请他人仅参与一个会话，而不开放 Gateway 全局写权限。使用价值明确，但涉及自动化与兼容性边界，仍待作者推进。

- **更新架构：目前是方案讨论，不是已完成能力。**  
  [#202922](https://github.com/openclaw/openclaw/pull/202922)提出统一的并排更新模型及迁移路线，属于文档提案；不宜据此预期下一版本已解决升级失败。

- **模块边界与能力一致性：持续降低维护成本。**  
  [Rerank 延迟加载 Issue #202893](https://github.com/openclaw/openclaw/issues/202893)已有 [PR #202914](https://github.com/openclaw/openclaw/pull/202914)；[CLI 能力结果契约拆分 #202923](https://github.com/openclaw/openclaw/issues/202923)与 [BytePlus/OpenRouter 视频能力去重 #202904](https://github.com/openclaw/openclaw/issues/202904)尚未见对应 PR。此类事项主要改善内部一致性，不能等同于新增用户功能。

## 6. 用户反馈摘要

**由于没有评论正文，本节依据 Issue 描述与 PR 中的用户影响摘要归纳，不引用或虚构评论。**

| 使用场景 | 可确认的痛点与诉求 |
|---|---|
| 长会话、多 Agent 协作 | 任务让出执行权之后会话无法正常结束，后续消息继续进入失效状态，削弱对持续工作流的信任。[#202518](https://github.com/openclaw/openclaw/issues/202518) |
| 语音助手接听与办事 | 用户面对的不只是音质问题，而是接听后静音、突然挂断、无法咨询 Agent，直接影响端到端任务完成。[#202917](https://github.com/openclaw/openclaw/issues/202917)、[#202916](https://github.com/openclaw/openclaw/issues/202916)、[#202915](https://github.com/openclaw/openclaw/issues/202915) |
| 无人值守自动化 | 任务停止后既不正确重试，也缺少明确通知；用户期望自动恢复，或至少能够发现并定位故障。[#202900](https://github.com/openclaw/openclaw/issues/202900) |
| 日常通知管理 | Inbox 数量被自动化告警占用，但不能直接完成排障，产生额外跳转与认知负担。[#202913](https://github.com/openclaw/openclaw/issues/202913) |
| 本地安装与升级 | 更新后激活失败、修复流程又受所有权判断阻塞，使升级变成手工恢复任务。[#202925](https://github.com/openclaw/openclaw/issues/202925) |

本次样本没有足够的正向评价证据，不能推断整体满意度；报告中的具体复现条件和相关修复提案，则说明反馈正在进入可执行的工程处理流程。

## 7. 待处理积压与维护者关注清单

本批可见事项主要创建于 11 月 20–21 日，**不足以认定存在“长期未响应”积压**。更值得关注的是以下短期阻塞：

1. **优先确认 P0 的处理责任人与回归范围。**  
   [#202518](https://github.com/openclaw/openclaw/issues/202518)仍无可见修复 PR；建议与 CLI 分叉及 stdin 修复分别验证，避免将不同触发条件视作同一问题。

2. **及时分诊尚无评论的更新失败报告。**  
   [#202925](https://github.com/openclaw/openclaw/issues/202925)涉及升级激活和恢复能力，应补齐日志、执行器所有权及数据库锁状态证据。

3. **推动已有源码复现的 FaceTime 问题进入修复。**  
   [#202915](https://github.com/openclaw/openclaw/issues/202915)、[#202917](https://github.com/openclaw/openclaw/issues/202917)已具备可排队修复标签；[#202916](https://github.com/openclaw/openclaw/issues/202916)则需优先补足现场复现。

4. **补齐高影响修复 PR 的证明材料。**  
   [语音策略 #202918](https://github.com/openclaw/openclaw/pull/202918)、[Telegram 媒体发送 #202899](https://github.com/openclaw/openclaw/pull/202899)均处于需验证状态；补充跨配置测试比仅扩大改动范围更有利于尽快闭环。

5. **控制大型 PR 的评审与返工成本。**  
   [共享 Worker Host #202495](https://github.com/openclaw/openclaw/pull/202495)、[内存预算 #202507](https://github.com/openclaw/openclaw/pull/202507)、[单会话邀请 #202552](https://github.com/openclaw/openclaw/pull/202552)均等待作者，且覆盖运行架构或权限边界，建议明确分阶段验收标准。

**健康度结论：**项目开发吞吐保持活跃，测试和架构治理也在持续投入；当前最需要改善的是高严重度问题的验证与闭环速度。尤其应将 P0 会话状态、实时语音可用性、升级恢复能力作为后续发布观察重点，而不是仅以 PR 数量衡量进展。

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向分析
**日期：2026-11-21｜观察窗口：过去 24 小时**

> **统计口径：**以下仅依据所提供摘要；Issues、PR 数指窗口内更新条目，不一定是新增数量。`CLOSED` 不等于已合并，“无活动”不等于停止维护。单日数据不能替代长期社区规模、交付速度或产品成熟度评估。

## 1. 生态全景

本次覆盖的 **13 个项目合计记录 20 条 Issue 更新、44 条 PR 更新**，其中 OpenClaw 与 Hermes Agent 贡献了约 **95% 的可见活动**，开发活动高度集中。技术重心正在从扩展助手能力，转向解决持续运行中的会话生命周期、更新恢复、资源释放和任务状态一致性问题。插件权限治理、使用量可观测性及交易审计也出现需求信号，但成熟程度不同：既有具体实现提案，也有尚无维护者回应的第三方服务介绍。**今日未记录新版本发布，开放提案明显多于可确认交付**；其余九个项目在窗口内无活动，不宜据此推断项目衰退。

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release 情况 | 当日健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | **12** | **33** | 无新发布 | 开发输入最活跃，测试与架构治理并行；P0 会话问题、语音及更新可靠性仍待闭环 |
| **Hermes Agent** | **6** | **10** | 无新发布 | 插件与任务治理持续扩展；全部条目开放，更新恢复和资源释放是重点风险 |
| **NanoBot** | 1 | 0 | 无新发布 | 可见活动低；唯一议题为机器人提交的第三方合规集成介绍 |
| **ZeroClaw** | 1 | 1 | 无新发布 | 有依赖维护输入；会话状态异常、Stop 无法恢复的问题待分诊 |
| PicoClaw | 0 | 0 | 未记录发布 | 窗口内无活动，健康度证据不足 |
| NanoClaw | 0 | 0 | 未记录发布 | 同上 |
| NullClaw | 0 | 0 | 未记录发布 | 同上 |
| IronClaw | 0 | 0 | 未记录发布 | 同上 |
| LobsterAI | 0 | 0 | 未记录发布 | 同上 |
| TinyClaw | 0 | 0 | 未记录发布 | 同上 |
| Moltis | 0 | 0 | 未记录发布 | 同上 |
| CoPaw | 0 | 0 | 未记录发布 | 同上 |
| ZeptoClaw | 0 | 0 | 未记录发布 | 同上 |
| **合计** | **20** | **44** | **无已记录新发布** | 活动集中，交付状态需进一步核实 |

**交付口径提醒：**OpenClaw 有 11 条 PR 已关闭或合并，但状态未区分，且明细仅覆盖 33 条中的 30 条，不能计算可靠的合并率。Hermes Agent 与 ZeroClaw 的本日 PR 均仍开放。

## 3. OpenClaw 在生态中的定位

### 优势：本日可见覆盖面与工程投入最广

- **覆盖场景更丰富。**同时涉及 Claude CLI、多 Agent、实时语音、消息渠道、自动化、移动端、插件和本地升级，体现出综合个人助手平台的特征。
- **工程治理投入较完整。**除功能与缺陷处理外，还推进插件契约测试、测试运行时修正、共享 Worker Host 和内存预算机制。
- **更关注个人部署约束。**面向 1–2 GiB 主机的优化，以及仅使用 Claude 订阅、没有 API Key 的使用路径，说明其投入不仅面向高资源云环境。

### 技术路线差异

相较 Hermes Agent 当日集中于**插件接口、任务治理与 Gateway 运维**，OpenClaw 更突出**多渠道交互、语音与主会话协同，以及端侧运行架构**。ZeroClaw 的当日信号主要是 Rust 依赖维护和网关状态可靠性；NanoBot 的唯一议题不足以代表其核心技术路线。

### 社区规模：只能确认活动量领先

OpenClaw 的 Issue、PR 更新量分别约为 Hermes Agent 的 **2 倍和 3.3 倍**，但不能据此断言用户数或贡献者规模领先。现有互动信号普遍较弱：OpenClaw 可见 Issue 最多仅 2 条评论，Hermes Agent 的 Issue 均无评论，PR 评论数据也不完整。

**定位判断：**OpenClaw 是本日样本中覆盖面最广、工程输入最多的平台型项目；与此同时，其跨渠道、跨进程和跨会话的复杂性，也带来了更大的可靠性治理负担。

## 4. 共同关注的技术方向

| 共同方向 | 涉及项目 | 具体诉求 | 技术含义 |
|---|---|---|---|
| **生命周期与状态一致性** | OpenClaw、Hermes Agent、ZeroClaw | 会话让出后失效、fallback 后资源未释放、状态卡在 `running` | 完成、取消、释放资源、持久化状态必须形成一致的状态机 |
| **更新失败后的恢复能力** | OpenClaw、Hermes Agent | 更新安装后无法激活；依赖同步失败后 Gateway 未恢复 | 更新不能只关注安装成功，还需验证服务恢复与回滚路径 |
| **插件与工具调用治理** | OpenClaw、Hermes Agent | 单会话最小授权；审批状态查询；模型外部的允许、询问、阻止决策 | 权限控制正在向宿主和插件边界下沉 |
| **任务状态可观测、可处置** | OpenClaw、Hermes Agent、ZeroClaw | 自动化告警入口脱节、Kanban 错误不明确、Stop 无法清除异常状态 | 用户需要准确状态和有效操作，而不只是收到通知 |
| **资源与运行环境治理** | OpenClaw、Hermes Agent | Worker 内存预算、线程释放、工具之间 PATH 不一致 | 长期运行质量依赖资源边界及运行环境契约 |
| **渠道适配与交互一致性** | OpenClaw、Hermes Agent | FaceTime/GPT-Live 协同、Photon/iMessage 流式消息适配 | 不同渠道需要独立处理就绪、输出与工具调用语义 |

其中，生命周期和恢复能力的证据最强；插件治理已有具体 PR，但仍不能视为已交付能力。

## 5. 差异化定位分析

以下定位仅依据当日工程信号，目标用户属于分析推断，而非项目完整产品定义。

| 项目 | 当日功能侧重 | 更相关的用户群体 | 可见架构差异及代价 |
|---|---|---|---|
| **OpenClaw** | 多渠道助手、语音、多 Agent、自动化、低内存部署 | 希望统一管理日常交互和持续任务的个人用户、自托管用户 | Gateway、CLI、插件、Worker 与渠道深度协同；能力广，但生命周期协调成本高 |
| **Hermes Agent** | 插件 API、任务编排、Kanban、profile、使用统计 | 插件开发者、开发工作流用户、持续运行 Gateway 的运营者 | 强调任务配置、profile 路由、插件 hooks 和工具环境；需保证控制语义一致 |
| **ZeroClaw** | 本日主要是网关状态恢复与依赖维护 | 依赖网关状态和停止操作的使用者 | 可见 Rust/Tokio 技术栈及后端状态写入路径；重点是错误处理与状态校正 |
| **NanoBot** | 当日仅出现外部交易合规提议 | 议题指向多 Agent 运营者，尚非已验证用户画像 | 无配套实现，无法判断核心架构变化 |
| **其余九个项目** | 无新增证据 | 无法据此判断 | 不宜仅依据名称或单日静默推断技术定位 |

**选型启示：**从本日信号看，OpenClaw 更值得用于评估综合助手场景，Hermes Agent 更值得用于评估插件和任务治理需求；但最终仍应以目标版本实测，而非 PR 数量做决定。

## 6. 社区热度与成熟度

### 活跃度分层

- **高活跃：OpenClaw。**45 条更新，功能扩展、架构重构与质量修复并行，呈现快速迭代特征。
- **中高活跃：Hermes Agent。**16 条更新，开发输入明确，但当日没有可确认合并；需继续观察审查与交付。
- **低活跃：ZeroClaw、NanoBot。**分别为 2 条、1 条更新；前者有维护与缺陷信号，后者主要是外部生态提议。
- **观察不足：其余九个项目。**24 小时无活动，无法判定其处于稳定维护、开发间歇还是其他状态。

### 成熟度不能按更新数量排序

OpenClaw 和 Hermes Agent 都表现出**扩展能力与巩固质量同时进行**的特点，而非单一阶段。前者已有测试和运行架构治理投入，后者正在补齐插件状态、审批与任务取消语义，但两者均存在持续运行可靠性问题。

目前没有充分证据将任何静默项目归类为“已经成熟稳定”。同样，缺陷报告较多也不必然意味着质量更差，可能与使用范围、测试覆盖和反馈渠道有关。

## 7. 值得关注的趋势信号

### ① 智能体竞争正延伸到“异常后能否继续工作”

OpenClaw 的失效会话、Hermes Agent 的 Gateway 恢复问题、ZeroClaw 的异常状态无法清除，共同说明：**持续可用性正在成为核心产品能力**。

**开发建议：**优先建立可测试的生命周期状态机，覆盖失败、取消、重试、超时、进程退出和资源回收，而非只验证正常执行路径。

### ② “停止”与“取消”需要成为有明确保证的操作

Hermes Agent 推进真正的 Kanban 取消，ZeroClaw 暴露 Stop 无法恢复状态的问题。停止按钮的 UI 存在，并不代表底层任务、资源和持久化状态同步终止。

**开发建议：**分别验证任务是否停止、资源是否释放、状态是否更新，以及重复取消是否安全。

### ③ 权限治理正在从提示词约束转向宿主机制

OpenClaw 的单会话授权与 Hermes Agent 的审批接口、工具调用 Guard，都指向更细粒度、模型之外的控制层。

**开发建议：**将授权范围、审批状态、无人值守策略和审计记录设计为明确接口，避免插件自行猜测权限。

### ④ 多模态助手的难点在端到端协同

FaceTime 的静音、挂断和 Agent 咨询失败表明，接入实时模型并不等于实现可靠语音助手；Hermes Agent 的消息气泡方案也说明渠道能力存在实质差异。

**开发建议：**测试应覆盖“渠道接入—模型就绪—工具调用—结果交付”的完整链路，而不只是音频或消息组件。

### ⑤ 成本可观测性已有实现，交易合规仍是早期信号

Hermes Stats 已有 PR；NanoBot 的交易筛查与支出审计则仅有机器人提交的服务提议。两者提示治理需求正在扩展，但**不能将单条第三方介绍视为行业共识**。

**开发建议：**先把调用量、费用和任务归属记录清楚；涉及自主付费时，再引入预算上限、交易授权和外部风险审查。

---

**综合结论：**本日生态的主要矛盾不是缺少新能力，而是已有能力在长会话、异常恢复和跨组件协同下能否保持可信。OpenClaw 的优势在覆盖广度和工程投入，Hermes Agent 的鲜明信号在插件与任务治理；对技术决策者而言，下一步最值得追踪的是高影响缺陷的验证、合并与版本发布，而不是开放 PR 的增长。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报
**日期：2026-11-21**  
**项目：[HKUDS/nanobot](https://github.com/HKUDS/nanobot)**  
**统计范围：所提供的过去 24 小时 GitHub 更新数据**

## 1. 今日速览
过去 24 小时，NanoBot 有 **1 条新开 Issue**，无 PR 更新，也无新版本发布，今日可见活跃度较低。唯一新增议题围绕多智能体集群的外部交易合规，涉及卖家风险筛查与支出审计，由 `cursor[bot]` 提交。该 Issue 暂无评论或点赞，尚未形成社区讨论，也没有配套 PR 表明已进入实现阶段。当前数据不足以判断长期项目健康度，但今日未观察到可验证的代码交付进展或新增稳定性问题。  
来源：[项目仓库](https://github.com/HKUDS/nanobot) · [Issue #6742](https://github.com/HKUDS/nanobot/issues/6742)

## 2. 项目进展
**今日未记录 PR 更新，暂无可确认的功能合并或修复落地。** 提供的数据中，待合并及已合并/关闭 PR 更新均为 0，因此不能据此认定项目在代码层面取得了推进；这也不等同于仓库没有直接提交或其他开发活动。  
参考：[项目 PR 列表](https://github.com/HKUDS/nanobot/pulls)

## 3. 社区热点
### [#6742：Screwtape.ai agent_fleet_compliance for nanobot agent fleets](https://github.com/HKUDS/nanobot/issues/6742)
- **状态与互动**：OPEN；今日创建并更新；0 条评论、0 个 👍。
- **提交者**：`cursor[bot]`。
- **主要内容**：介绍面向多智能体集群的第三方合规服务，针对智能体向外部工具或卖家付款的场景，提供卖家风险筛查与可导出的支出审计。
- **需求解读**：指向智能体从执行任务走向自主采购、付费调用后的治理需求，尤其是交易风险控制与费用可追溯性。
- **热度判断**：这是今日唯一更新的议题，但尚无互动，不能视为已获社区认可的热点。其内容更接近第三方服务介绍或集成提议，而非已确认的 NanoBot 功能缺口。

## 4. Bug 与稳定性
今日提供的数据中，**未发现 Bug、崩溃或回归问题报告**，也没有可关联的修复 PR。唯一新增 Issue 属于第三方服务介绍/集成提议，因此暂无可按严重程度排序的问题。

需要注意，“未收到报告”不等于“已验证稳定”，当前样本不足以评估整体稳定性趋势。  
参考：[今日唯一新增 Issue #6742](https://github.com/HKUDS/nanobot/issues/6742)

## 5. 功能请求与路线图信号
### 多智能体集群的交易合规与支出审计
[#6742](https://github.com/HKUDS/nanobot/issues/6742) 提出了两个潜在能力方向：
1. **卖家风险筛查**：辅助判断智能体即将交易的外部卖家或服务是否存在风险。
2. **可导出的支出审计**：帮助运营者追踪智能体支出，减少自行搭建合规系统的成本。

**路线图判断：信号较弱，尚未进入可确认的交付阶段。** 当前没有维护者回复、配套 PR 或版本计划，无法判断是否会被纳入下一版本。若维护者考虑接纳，首先需要明确这属于核心能力、可选集成，还是仅适合放入生态资源列表。

## 6. 用户反馈摘要
今日 **没有 Issue 评论可供提炼**，因此无法总结真实使用体验、满意度或故障痛点。

[#6742](https://github.com/HKUDS/nanobot/issues/6742) 正文描述的目标场景是：多智能体运营者需要向外部工具或卖家付款，希望获得风险筛查与支出审计，同时避免自建合规系统。但这来自机器人账号提交的服务介绍，**不能等同于独立用户的已验证需求或产品使用反馈**。

## 7. 待处理积压
**当前数据不足以识别长期未响应的重要 Issue 或 PR。** 今日唯一开放议题 [#6742](https://github.com/HKUDS/nanobot/issues/6742) 为当日新建，不应归类为长期积压。

建议维护者对该议题做初步分流：确认其是否符合项目范围、是否需要补充具体集成方案，以及是否应作为第三方生态介绍处理。完整积压情况仍需结合[开放 Issues](https://github.com/HKUDS/nanobot/issues) 与[开放 PR](https://github.com/HKUDS/nanobot/pulls) 的历史响应数据评估。

---
**健康度结论：今日活动量低，无可见交付，也无新增故障信号。** 唯一新增议题提供了智能体交易治理方向的弱需求线索，但尚无社区互动或工程实现支撑，不宜据此推断路线图变化。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-11-21**  
项目：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

## 1. 今日速览

过去 24 小时，项目新增或活跃 **6 条 Issue、10 条 PR**，全部仍处于开放状态，未记录合并、关闭或新版本发布。提交活跃度较高，工作主要集中在 **插件生态、Gateway 稳定性、任务编排和安装更新可靠性**，但本日尚无可确认的已交付成果。稳定性方面，最值得关注的是更新失败后 Gateway 未恢复的 **P1 修复提案**，以及 provider fallback 后资源未释放的 **P2 问题报告**。社区互动信号较弱：6 条 Issue 均为 0 评论、0 👍；PR 评论数缺失，不能据此评估讨论热度。

## 2. 项目进展

**今日无已合并或关闭的重要 PR。** 以下均为待审进展，不代表功能已经进入主分支或正式版本。

| 方向 | 今日待合并进展 | 对项目的意义 |
|---|---|---|
| 更新可靠性 | [#158449](https://github.com/NousResearch/hermes-agent/pull/158449)：修复依赖同步失败后，被暂停的 Gateway 持续停止的问题 | 面向无人值守更新的可用性修复，标注 P1，应优先审查 |
| 任务配置一致性 | [#158462](https://github.com/NousResearch/hermes-agent/pull/158462)：拒绝分配对象 profile 配置不支持的任务级模型/provider 固定设置 | 减少任务配置与实际运行模型不一致的风险 |
| 插件状态与任务控制 | [#158454](https://github.com/NousResearch/hermes-agent/pull/158454)：插件状态接口、`delivery.status` 与真正的 Kanban 取消 | 补充外部插件对任务状态和生命周期的控制能力 |
| 消息渠道适配 | [#158455](https://github.com/NousResearch/hermes-agent/pull/158455)：Photon 多消息气泡流式输出及原生 iOS 生态适配 | 尝试改善 iMessage 等不支持编辑已发送消息的平台体验 |

**进展判断：** 今日体现出较强的开发输入，但合并吞吐量为零，不能将提案数量等同于交付速度。后续应重点观察 P1/P2 修复的审查和落地情况。

## 3. 社区热点

### 当前无法按互动量识别“最热讨论”

全部 Issue 均无评论和点赞，PR 评论字段为 `undefined`，所有所列 PR 的 👍 也均为 0。因此，以下是**议题关注点**，而非按讨论量统计出的热点。

- **插件安全决策与宿主审批状态衔接。**  
  [Issue #158457](https://github.com/NousResearch/hermes-agent/issues/158457) 请求插件能够查询 Hermes 是否会免人工审批；同一提交方的 [PR #158461](https://github.com/NousResearch/hermes-agent/pull/158461) 提交 LumoAuth Guard，在 `pre_tool_call` 阶段执行允许、询问或阻止决策。两者共同体现出对模型外部工具调用治理的需求，但前者并未因此获得直接修复。

- **长期运行的 Gateway 可用性。**  
  [Issue #158456](https://github.com/NousResearch/hermes-agent/issues/158456) 报告 fallback 后 memory provider writer 线程累积；[PR #158449](https://github.com/NousResearch/hermes-agent/pull/158449) 处理更新失败后的 Gateway 恢复。核心诉求是减少无人值守运行中的资源泄漏与服务中断。

- **任务执行结果应当可解释、可控制。**  
  [Issue #158452](https://github.com/NousResearch/hermes-agent/issues/158452) 指出 Kanban 完成操作的错误提示未揭示缺少 PR 凭证；[PR #158454](https://github.com/NousResearch/hermes-agent/pull/158454) 则推进真实取消与状态查询。用户需要的不只是任务运行，还包括准确理解和干预任务状态。

## 4. Bug 与稳定性

下表按已有优先级及潜在影响排序；**有 fix PR 不等于已经修复**。

| 严重程度 | 问题及影响 | 修复状态 |
|---|---|---|
| **P1** | 更新完成代码替换后若依赖同步失败，已暂停的 Gateway 可能保持停止，影响定时或无人值守更新。[#158449](https://github.com/NousResearch/hermes-agent/pull/158449) | 已有开放 fix PR |
| **P2** | Gateway 在 provider fallback 后驱逐 agent 时未释放相关资源，memory provider writer 线程可能累积。[#158456](https://github.com/NousResearch/hermes-agent/issues/158456) | 所给数据中未见直接 fix PR |
| **未标级，执行阻断** | `execute_code` 会话内核的 `PATH` 缺少 `$HERMES_HOME/bin`；部分 store/PM 安装下调用 `uv` 等托管运行时会触发 `FileNotFoundError`。[#158463](https://github.com/NousResearch/hermes-agent/issues/158463) | 未见直接 fix PR |
| **P2** | profile 重命名后，多路复用 Gateway 的路由及会话仍保留旧 `transport_profile`。[#158450](https://github.com/NousResearch/hermes-agent/pull/158450) | 已有开放 fix PR |
| **P2** | worktree 清理未考虑关联会话近期活动，存在将仍在使用的工作树判为空闲的风险。[#158451](https://github.com/NousResearch/hermes-agent/issues/158451) | 未见直接 fix PR；实际影响需进一步验证 |
| **P2** | 从符号链接路径进入仓库时，Node 构建脚本可能未运行 `main()`，却以退出码 0 结束。[#158458](https://github.com/NousResearch/hermes-agent/pull/158458) | 已有开放 fix PR |
| **P2** | 桌面端未知斜杠命令被拒绝后，原始输入草稿未恢复。[#158459](https://github.com/NousResearch/hermes-agent/pull/158459) | 已有开放 fix PR |
| **P2** | Kanban 任务缺少 `published_pr` 时，完成操作错误提示为“未知 ID 或终态”，掩盖真实拒绝原因。[#158452](https://github.com/NousResearch/hermes-agent/issues/158452) | 未见直接 fix PR |
| **P3，测试可靠性** | PM 下载器并发 range 请求超出单线程测试服务器的默认等待队列，macOS 上可能连接重置。[#158460](https://github.com/NousResearch/hermes-agent/pull/158460) | 已有开放 fix PR；这是测试夹具问题，不宜直接视为生产下载器缺陷 |

## 5. 功能请求与路线图信号

### 仅有需求，尚未看到对应实现

- **插件调用审批状态查询**：希望通过类似 `ctx.approval_state()` 的公开接口，获知免审批状态及原因，包括 `--yolo`、配置关闭审批或无人值守上下文。涉及安全语义，值得结合插件安全扩展统一设计。[#158457](https://github.com/NousResearch/hermes-agent/issues/158457)
- **插件 LLM API 的逐次 reasoning effort 设置**：希望 `ctx.llm.complete`、`complete_structured` 支持按调用指定推理强度，避免后台任务只能沿用整个 profile 的设置。[#158448](https://github.com/NousResearch/hermes-agent/issues/158448)

### 已有 PR，具备后续版本候选基础

- **工具调用安全插件**：LumoAuth Guard 0.1.1 申请进入插件目录，将调用治理放在模型之外。[#158461](https://github.com/NousResearch/hermes-agent/pull/158461)
- **使用统计面板**：Hermes Stats 拟汇总各 profile 的 `state.db`，并在存在时读取语音 traces，增强使用量可观测性。[#158453](https://github.com/NousResearch/hermes-agent/pull/158453)
- **插件状态与任务生命周期接口**：覆盖状态查询、投递状态和 Kanban 取消。[#158454](https://github.com/NousResearch/hermes-agent/pull/158454)
- **Photon 流式消息适配**：以离散消息气泡适配无法修改已发送文本的平台。[#158455](https://github.com/NousResearch/hermes-agent/pull/158455)

**路线图判断：** 插件治理、状态可观测性和多渠道交互是较清晰的演进方向。已有 PR 比纯需求更接近交付，但当前没有合并、评审结论或版本计划，不能确认哪些会进入下一版本。

## 6. 用户反馈摘要

**数据限制：今日 Issue 均为 0 评论，无法从评论中提炼反馈共识。** 以下来自提交者的问题描述，不代表社区普遍评价。

- **“同一个运行时，换个工具就找不到。”** `terminal` 与 `execute_code` 的环境差异影响托管安装用户，反映出工具间运行环境一致性不足。[#158463](https://github.com/NousResearch/hermes-agent/issues/158463)
- **“任务不能完成，但提示没有说明真正原因。”** Kanban 用户需要明确获知缺少发布 PR 证明，而不是排查不存在的任务 ID 问题。[#158452](https://github.com/NousResearch/hermes-agent/issues/158452)
- **“对话仍活跃，不应只凭文件时间判断工作树闲置。”** 会话驱动开发要求清理逻辑理解会话活动，而非仅依赖文件和进程信号。[#158451](https://github.com/NousResearch/hermes-agent/issues/158451)
- **“后台插件调用需要独立的推理预算。”** 插件开发者希望区分不同调用的推理强度，而不改变全局 profile 配置。[#158448](https://github.com/NousResearch/hermes-agent/issues/158448)

现有数据没有可据以总结的明确满意度反馈。

## 7. 待处理积压

**无法确认长期未响应积压。** 所列 16 条记录均在今日创建并更新；Issue 无评论不等于长期无人处理，PR 评论数缺失也不能推断其审查状态。

建议维护者优先跟进以下当前待办：

1. **优先审查 P1 更新恢复修复**，验证依赖失败后的 Gateway 生命周期及恢复路径。[PR #158449](https://github.com/NousResearch/hermes-agent/pull/158449)
2. **复现并定位 fallback 资源释放问题**，关注连续回退情况下的线程增长。[Issue #158456](https://github.com/NousResearch/hermes-agent/issues/158456)
3. **补齐托管运行时环境一致性测试**，覆盖仅在 `$HERMES_HOME/bin` 中存在 `uv` 的安装场景。[Issue #158463](https://github.com/NousResearch/hermes-agent/issues/158463)
4. **核查 worktree 清理的会话保护条件**，降低活跃工作环境被误判的风险。[Issue #158451](https://github.com/NousResearch/hermes-agent/issues/158451)

---

**健康度结论：开发输入活跃，交付与审查进度仍待观察。** 今日最重要的不是新增提案数量，而是尽快闭环更新恢复、资源释放和运行环境一致性问题；插件生态扩展则提供了积极的中期增长信号。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

过去24小时无活动。

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

过去24小时无活动。

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

过去24小时无活动。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：2026-11-21**  
**统计范围：所提供的过去 24 小时 GitHub 更新数据**

## 1. 今日速览

过去 24 小时，ZeroClaw 有 **1 条 Issue 更新、1 条 PR 更新**，均为当日新建且仍处于开放状态，未记录到合并、关闭或版本发布，整体活跃度偏低。今日最值得关注的是网关会话状态持久化失败后，状态可能持续停留在 `running`，且 Stop 操作无法清除的问题，涉及运行状态一致性与故障恢复能力。维护方面，Dependabot 提交了包含 40 项 Rust 依赖更新的分组 PR，但尚未合并。当前样本较小，适合判断当日工作重心，不足以据此推断项目长期健康度。

## 2. 项目进展

**今日没有已合并或已关闭的重要 PR，尚无可确认的功能交付或修复落地。**

- **Rust 依赖维护进入待审阶段：[PR #12620](https://github.com/zeroclaw-labs/zeroclaw/pull/12620)**  
  Dependabot 提交根目录下 `rust-all` 依赖组的 **40 项更新**。已提供的信息包括：
  - `clap`：`4.6.6 → 4.6.8`
  - `clap_complete`：`4.6.9 → 4.6.12`
  - `tokio`：列入更新范围，但摘要未完整展示目标版本。

  该 PR 的推进主要属于依赖维护，而非新功能交付。虽然带有 `size:XS` 标签，但涉及 40 项依赖，不能仅凭标签判断兼容性风险；后续应关注 CI、依赖变更说明及回归验证结果。

## 3. 社区热点

今日没有形成可确认的高热度讨论，两条更新的已知点赞数均为 0。

| 条目 | 互动情况 | 主要诉求或关注点 |
|---|---|---|
| [Issue #12619：会话状态卡在 `running`，Stop 无法清除](https://github.com/zeroclaw-labs/zeroclaw/issues/12619) | 0 评论、0 👍 | 状态写入失败不应使会话陷入无法正常恢复的状态 |
| [PR #12620：Rust 依赖组更新](https://github.com/zeroclaw-labs/zeroclaw/pull/12620) | 评论数未提供、0 👍 | 持续维护依赖版本，后续需确认兼容性 |

从问题影响看，**#12619 比依赖更新更值得优先人工分诊**：它直接涉及用户对“任务是否仍在运行”和“停止是否生效”的判断。但目前没有社区跟帖，不能将其描述为已被广泛复现的问题。

## 4. Bug 与稳定性

### 较高关注：网关会话状态可能卡死，Stop 无法恢复
**[Issue #12619](https://github.com/zeroclaw-labs/zeroclaw/issues/12619)｜OPEN｜未见关联 fix PR**

- **报告现象：** 会话状态写入失败后，状态可能一直保留为 `running`，直到重启；Stop 操作无法清除该状态。
- **报告指向：** 网关 `ws.rs` 中多处调用 `backend.set_session_state(...)` 时使用 `let _ = ...` 丢弃返回结果。报告列出了 `running`、`idle`、`error` 等会话状态写入相关路径。
- **潜在影响：** 用户可能无法准确判断会话是否结束，停止操作也无法恢复正常状态，增加排障和重启成本。该现象本身并不证明底层任务仍在执行。
- **严重程度判断：** 属于会话可用性与故障恢复问题，建议较高优先级排查；现有材料未提供崩溃、数据丢失或安全影响证据。
- **修复进度：** 所提供数据中未见维护者响应或对应修复 PR。

建议维护者优先确认：状态写入失败如何被记录、Stop 路径是否依赖同一失败操作，以及是否需要重试或状态校正机制。以上属于排查建议，并非已确定的修复方案。

## 5. 功能请求与路线图信号

**今日未见明确的新功能请求，也没有足够证据判断下一版本的功能范围。**

- **可靠性信号：[Issue #12619](https://github.com/zeroclaw-labs/zeroclaw/issues/12619)**  
  该报告体现了对“状态可信、停止可恢复”的需求，更接近现有能力的可靠性补强，而非新增功能。目前没有 fix PR 或版本安排，不能判断是否会进入下一版本。

- **维护信号：[PR #12620](https://github.com/zeroclaw-labs/zeroclaw/pull/12620)**  
  依赖更新已有具体 PR，是当前可观察到的候选变更；但尚未合并，也未提供 CI 与审查结果，不应视为下一版本已确定内容。

## 6. 用户反馈摘要

**没有可供提炼的 Issue 评论对话。** 唯一 Issue 为 0 评论，以下仅基于提交者的问题描述，而非多位用户的共同反馈。

- **痛点：** 会话状态异常后，Stop 无法将其清除，报告中描述需要重启才能恢复。  
- **使用场景：** 通过网关运行会话，并依赖 `running`、`idle`、`error` 状态及 Stop 操作管理会话。
- **核心诉求：** 状态持久化失败应可感知、可处理，用户不应只能通过重启恢复。
- **反馈边界：** 暂无满意度评价、受影响用户数量或发生频率数据。

来源：[Issue #12619](https://github.com/zeroclaw-labs/zeroclaw/issues/12619)。

## 7. 待处理积压

**当前数据无法识别长期未响应的积压。** 两条记录均在今日创建，不能将其归类为长期滞留事项，也不能据此判断维护者响应迟缓。

| 待跟进事项 | 当前状态 | 建议关注 |
|---|---|---|
| [Issue #12619](https://github.com/zeroclaw-labs/zeroclaw/issues/12619) | 当日新建、开放、0 评论 | 补充复现步骤、后端类型与失败日志，确认影响范围并关联修复 |
| [PR #12620](https://github.com/zeroclaw-labs/zeroclaw/pull/12620) | 当日新建、开放 | 检查 CI、兼容性和依赖变更，必要时拆分高风险更新 |

**健康度结论：** 今日呈现“低更新量、依赖维护持续、一个待确认的可靠性缺陷”的状态。后续最有价值的观察点，是会话状态问题能否获得及时分诊，以及依赖更新能否通过验证并完成合并。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*