# OpenClaw 生态日报 2026-11-18

> Issues: 50 | PRs: 61 | 覆盖项目: 13 个 | 生成时间: 2026-11-18 04:42 UTC

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
**日期：2026-11-18｜观察窗口：过去 24 小时**  
项目：[openclaw/openclaw](https://github.com/openclaw/openclaw)

> **数据口径**：本报依据提供的 GitHub 快照。PR 的 `CLOSED` 状态无法区分“已合并”与“关闭未合并”；发布说明存在截断；未提供评论正文，因此用户反馈依据 Issue 描述提炼，不将评论数量等同于支持度或满意度。

## 1. 今日速览

过去 24 小时，OpenClaw 有 **50 条 Issue 更新、61 条 PR 更新和 2 个版本发布**，开发与问题分诊活跃度高。Issue 中 39 条处于新开或活跃状态、11 条关闭；PR 中 27 条待合并、34 条已合并或关闭，但这些数字不能直接视为新增量或修复完成量。今日主线是 **升级可靠性、重启后的会话连续性、模型接入与沙箱性能**，而非大规模新增功能。项目持续推进稳定性工程，但升级链路仍出现跨平台故障，另有 P0 更新阻断、P1 会话准入与启动循环问题，发布后的可靠性仍需重点观察。  
相关入口：[Issues](https://github.com/openclaw/openclaw/issues)｜[PRs](https://github.com/openclaw/openclaw/pulls)｜[Releases](https://github.com/openclaw/openclaw/releases)

## 2. 版本发布

| 版本 | 已知更新内容 | 升级与迁移注意事项 |
|---|---|---|
| **[v2026.11.5](https://github.com/openclaw/openclaw/releases/tag/v2026.11.5)** | 强调“重启安全的对话”：Gateway 重启后保留排队消息、发送权限及最终聊天写入；另强调更新失败时的回滚保护。 | 发布摘要的回滚描述被截断，无法确认完整触发条件与覆盖范围。当前仍有 `package-doctor`、Gateway 恢复校验等更新失败报告，不能将该版本理解为已消除全部升级故障。 |
| **[v2026.10.33](https://github.com/openclaw/openclaw/releases/tag/v2026.10.33)** | **仅面向 Gateway 的 `extended-stable` 版本**，项目将其视为当前类似 LTS 的发布渠道；以 2026 年 10 月末代码为基础，补入关键安全更新、可靠性与性能修复及新模型支持。 | 不应默认它覆盖桌面应用或与主线版本功能完全一致。摘要未列出具体安全问题、兼容性变更及迁移步骤。 |

**破坏性变更判断：**提供的发布摘要中未明确列出破坏性变更，但资料不完整，不能据此认定“无破坏性变更”。

**操作建议：**生产环境升级前备份状态数据库和配置，升级后检查 Gateway 实际运行版本、通道收发、会话恢复与记忆检索；源码版与正式版混用尤其要留意数据库 schema 兼容性。相关问题：[源码迁移后旧版本拒绝数据库 #200886](https://github.com/openclaw/openclaw/issues/200886)、[macOS 更新后旧 Gateway 仍运行 #200833](https://github.com/openclaw/openclaw/issues/200833)。

## 3. 项目进展

以下重要 PR 已标记为 **CLOSED**，代表相关工作已结束处理，但是否合并及进入哪个版本仍需核实。

| 重要 PR | 推进方向与实际价值 |
|---|---|
| [#200946：保持健康的备用模型可用](https://github.com/openclaw/openclaw/pull/200946) | 修正模型不存在错误被升级为账户级冷却的问题，避免两个模型失败后，健康的第三个模型也无法尝试。 |
| [#200930：冷历史恢复期间保持其他聊天响应](https://github.com/openclaw/openclaw/pull/200930) | 针对大型归档会话恢复占用数据库写入资源的问题，改善多会话并发体验。 |
| [#200967：同批子任务等待消息时仍交付已完成结果](https://github.com/openclaw/openclaw/pull/200967) | 处理多智能体批次中“部分已完成、部分等待”造成的结果长期挂起，直接涉及任务交付可靠性。 |
| [#200979：降低共享状态读取的主机 CPU 开销](https://github.com/openclaw/openclaw/pull/200979) | 减少反复解析已捕获的数据库引擎选择信息，优化高频共享状态读取。 |
| [#200900：保留 Node 24 下 Codex 原生启动错误](https://github.com/openclaw/openclaw/pull/200900) | 避免权限或可执行文件问题被泛化为 app-server 故障，提高排障可解释性。 |
| [#200942：解释重启恢复不可用的原因](https://github.com/openclaw/openclaw/pull/200942) | 增强恢复失败的诊断信息，帮助运维区分哪些客户端或捕获条件阻止了恢复。 |

**整体进展评价：**今日工作主要在补齐“运行—失败—恢复—交付”的边界条件，对长期运行的个人助手和多智能体系统有实际价值。不过，仅凭关闭状态，尚不能把上述收益全部计入已发布能力。

## 4. 社区热点

可见 Issue 的最高评论数为 13；PR 评论数均为 `undefined`，因此无法可靠评出 PR 讨论热度。可见点赞最高仅为 1，尚不足以代表广泛社区共识。

| 热点 | 互动情况 | 背后的诉求 |
|---|---:|---|
| [Windows beta.2 → beta.4 更新失败 #200756](https://github.com/openclaw/openclaw/issues/200756) | **13 条评论，OPEN** | 候选包验证通过后仍在包交换阶段失败，用户需要的是可完成、可回滚、可解释的升级流程。 |
| [Home Assistant OS 安装不持久 #200692](https://github.com/openclaw/openclaw/issues/200692) | **6 条评论，OPEN** | CLI 安装成功不等于可长期运行，社区希望获得明确支持的部署方式与持久化文档。 |
| [候选 Doctor 插件迁移冲突 #200606](https://github.com/openclaw/openclaw/issues/200606) | **6 条评论、1 个赞，CLOSED** | 更新保护机制需要准确诊断迁移冲突，避免在 `changed=[]` 等难以解释的状态下阻断升级。 |
| [P0 更新失败：repairing 阶段 #200540](https://github.com/openclaw/openclaw/issues/200540) | **5 条评论，OPEN** | 旧版本向新版本迁移的恢复路径仍需关注，目前标签显示仍待补充信息与维护者审查。 |
| [低配主机 onboarding 超时 #200672](https://github.com/openclaw/openclaw/issues/200672) | **5 条评论，OPEN** | Raspberry Pi 上 Gateway 约 168 秒才监听，但 onboarding 约 88 秒就放弃；用户需要适应慢硬件的启动预算。 |

## 5. Bug 与稳定性

### 优先处理：P0 / P1

| 严重程度 | 问题与影响 | 状态 / fix PR |
|---|---|---|
| **P0** | [#200540：旧版本更新在 repairing 阶段失败](https://github.com/openclaw/openclaw/issues/200540)，标记为发布阻断问题。 | **OPEN**；当前数据未提供对应 fix PR，仍需补充信息。 |
| **P1** | [#200849：一条无效 `session_nodes` 记录阻断 main agent 全部会话准入](https://github.com/openclaw/openclaw/issues/200849)，且 `doctor --fix` 无法清除。 | **OPEN**；标记可从源码复现，未提供对应 fix PR。 |
| **P1** | [#200671：Gateway 启动失败却退出 0，systemd 持续重启](https://github.com/openclaw/openclaw/issues/200671)，服务看似运行但实际不可达。 | **OPEN**；未提供对应 fix PR。 |
| **P1** | [#200920：8,192-token 本地模型通过 setup 后首条消息即溢出](https://github.com/openclaw/openclaw/issues/200920)。 | **OPEN**；已有开放修复 [PR #200923](https://github.com/openclaw/openclaw/pull/200923)，等待维护者处理。 |
| **P1** | [#200833：macOS 从 Git 安装切换到 release launcher 后仍运行旧 Gateway](https://github.com/openclaw/openclaw/issues/200833)。 | **OPEN**；未提供对应 fix PR。 |
| **P1** | [#200881：iPad 上输入框落到视口外](https://github.com/openclaw/openclaw/issues/200881)，导致无法输入。 | **OPEN**；未提供对应 fix PR。 |
| **P1，已关闭** | [#200744：Claude CLI 输出预算溢出触发模型回退，重放长时间且有副作用的任务](https://github.com/openclaw/openclaw/issues/200744)。 | **CLOSED**；未提供可核实的修复 PR 或发布归属。此类问题需重点回归验证，避免重复执行外部操作。 |

### P2 与其他值得关注的问题

- **升级故障仍跨平台出现**：包括 Linux 的运行时产物发布失败、macOS/ARM 的 package-doctor 失败、Linux/ARM 的 package-doctor 失败，以及 Gateway 恢复校验失败。现有 [PR #200994](https://github.com/openclaw/openclaw/pull/200994)仅针对“更新被杀死且机器重启后，下次更新不能继续”的场景，不能视为这些报告的统一修复。相关：[#200982](https://github.com/openclaw/openclaw/issues/200982)、[#200926](https://github.com/openclaw/openclaw/issues/200926)、[#200921](https://github.com/openclaw/openclaw/issues/200921)、[#200939](https://github.com/openclaw/openclaw/issues/200939)。
- **记忆完整性风险**：[异常结束的运行已发送内容未进入记忆索引 #200986](https://github.com/openclaw/openclaw/issues/200986)，可能造成用户“看过回复，但助手之后无法回忆”；另有 [FTS 重建后校验异常及备份残留 #200922](https://github.com/openclaw/openclaw/issues/200922)。均为 OPEN，当前未提供对应 fix PR。
- **飞书流式卡片生命周期问题**：[重复渲染历史消息 #200996](https://github.com/openclaw/openclaw/issues/200996)与[卡片关闭后继续写入 #200997](https://github.com/openclaw/openclaw/issues/200997)均处于新报告阶段，尚无可见 fix PR。
- **后台智能体工具声明与权限不一致**：[自学习后台 review 宣称可用 `skills_search`，实际却不能执行 #200907](https://github.com/openclaw/openclaw/issues/200907)。OPEN，已标记修复形态清晰、可排队，未提供对应 PR。

## 6. 功能请求与路线图信号

| 方向 | 需求与现有进展 | 短期判断 |
|---|---|---|
| **模型目录及时刷新** | [PR #200988](https://github.com/openclaw/openclaw/pull/200988)拟在模型选择器读取时重新拉取超过 15 分钟的供应商模型列表。 | 已待维护者审阅，是较明确的近期候选，但存在兼容性风险标签。 |
| **插件会话访问授权整合** | [PR #200961](https://github.com/openclaw/openclaw/pull/200961)拟将会话访问权限纳入安装时的能力审核，减少手工改配置。 | 等待作者处理，尚不能判断下一版是否纳入。 |
| **Code Mode 工具可发现性** | 用户要求[工具名匹配优先 #200850](https://github.com/openclaw/openclaw/issues/200850)及[少量工具固定可见 #200851](https://github.com/openclaw/openclaw/issues/200851)。 | 体现“节约上下文”与“关键工具可见”之间的产品取舍；暂无可见实现 PR。 |
| **不采集内容的可观测性** | [#200906](https://github.com/openclaw/openclaw/issues/200906)请求可选的 OpenTelemetry 来源标识，服务于多 Gateway、多 Slack 通道运维。 | 需产品与安全审查，仍属需求阶段。 |
| **PostgreSQL 生产可靠性验证** | [PR #200991](https://github.com/openclaw/openclaw/pull/200991)补充凭据故障转移及认证健康状态持久化测试。 | 属验证覆盖而非新运行时功能，显示项目持续加强多存储后端支持。 |

此外，[沙箱准备期间避免 exec 任务丢失 #200989](https://github.com/openclaw/openclaw/pull/200989)、[降低沙箱刷新暂停 #200984](https://github.com/openclaw/openclaw/pull/200984)、[减少独立 completion 内存抖动 #200966](https://github.com/openclaw/openclaw/pull/200966)说明性能与长任务可靠性仍是近期工程重点，均尚未完成合并确认。

## 7. 用户反馈摘要

由于没有评论正文，以下是**报告者描述的真实使用痛点**，而非评论情绪统计：

- **“安装成功”与“可长期运行”存在落差。** Home Assistant OS 用户缺少持久化和服务化路径；低配树莓派用户遇到启动超时或重启循环。项目需要更清晰的支持矩阵与资源预期。相关：[HAOS #200692](https://github.com/openclaw/openclaw/issues/200692)、[慢主机 #200672](https://github.com/openclaw/openclaw/issues/200672)。
- **用户需要可操作的错误提示，而不只是错误名称。** 远程未配对客户端被提示自行批准，却同样因未配对失败；token 冲突提示又被脱敏和截断。相关：[#200904](https://github.com/openclaw/openclaw/issues/200904)、[#200937](https://github.com/openclaw/openclaw/issues/200937)，后者已有 [PR #200940](https://github.com/openclaw/openclaw/pull/200940)。
- **长期助手的信任建立在记忆和成本记录完整性上。** 异常运行可能丢失记忆索引，没有持久化可见回复的 Claude CLI 调用可能未计入 Usage，影响回忆能力与成本核对。相关：[#200986](https://github.com/openclaw/openclaw/issues/200986)、[#200861](https://github.com/openclaw/openclaw/issues/200861)。
- **多通道体验需要更健壮的清理机制。** 飞书卡片重复内容、关闭后继续更新，以及 Telegram 草稿删除失败后无法重试，都会留下明显的交互残留。相关：[#200996](https://github.com/openclaw/openclaw/issues/200996)、[#200997](https://github.com/openclaw/openclaw/issues/200997)、[#200862](https://github.com/openclaw/openclaw/issues/200862)。

本批数据没有足够证据判断整体满意度；缺陷导向样本也不宜外推为全部用户体验。

## 8. 待处理积压与维护提醒

**无法确认“长期未响应”积压：**所列条目主要创建于 11 月 17—18 日，且缺少首次维护者响应时间。以下属于值得优先跟踪的待处理事项，而非已证实的长期失管问题。

1. **优先收敛更新失败分类与恢复证据。** P0 [#200540](https://github.com/openclaw/openclaw/issues/200540)及高讨论度 Windows 问题 [#200756](https://github.com/openclaw/openclaw/issues/200756)应明确复现条件、当前绕行方式和修复归属，避免不同更新阶段的错误被笼统归为同一故障。
2. **优先隔离状态损坏的影响范围。** [#200849](https://github.com/openclaw/openclaw/issues/200849)涉及单条坏记录阻断全部会话，应重点确认受影响版本、恢复方案及修复测试。
3. **尽快处理已有验证的 P1 修复。** [PR #200923](https://github.com/openclaw/openclaw/pull/200923)已标记证明充分、等待维护者，能直接减少本地模型“配置成功但不可用”的落差。
4. **子智能体交付修复需兼顾安全边界。** [PR #200760](https://github.com/openclaw/openclaw/pull/200760)拟解决存储路径或权限身份检查导致的结果丢弃，但体量为 XL，带安全边界风险且等待作者，应避免为恢复交付而弱化授权检查。
5. **提前处理外部服务弃用。** [Atlassian 插件端点弃用 #200928](https://github.com/openclaw/openclaw/issues/200928)报告的移除日期为 **2027-03-01**，目前尚非已发生的全面中断，但应建立迁移计划。

### 项目健康度结论

**开发吞吐高、可靠性投入明显，但升级与状态恢复仍是主要风险面。** 下一观察窗口最值得验证的不是关闭数量，而是：P0/P1 是否有明确修复归属、开放 PR 是否实际合并、修复是否进入发布，以及真实升级和长任务恢复是否通过回归验证。

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向分析
**观察日期：2026-11-18｜窗口：过去 24 小时**

> **口径说明：**以下仅依据所给快照。Issue、PR 数为窗口内更新条目数，不等于新增数；`CLOSED` 不等于已合并或已修复。单日活动不能代表长期社区规模、维护效率或产品成熟度。NanoClaw 的 PR 数采用明细的 **18 条**，而非概览的 17 条。

## 1. 生态全景

个人 AI 助手生态正从“接通模型、调用工具”转向“长期运行、可靠恢复、受控执行”，升级、会话恢复、任务终态和权限边界成为共同工程重点。13 个项目中，7 个有可见活动，合计 **131 条 Issue 更新、172 条 PR 更新、4 个版本发布**，但其中包含 Canary、RC 及 Gateway 专用稳定渠道，不能等同于四次稳定版交付。OpenClaw 与 Hermes Agent 占本批 Issue 更新约 **76%**、PR 更新约 **65%**，是最活跃的两个观察对象。多模型、多智能体和跨端访问持续扩展，但安全报告与状态一致性问题表明：**能力扩展速度已经对运行治理提出更高要求。**

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release 情况 | 本期健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 50 | 61 | 2：主线 v2026.11.5；Gateway extended-stable v2026.10.33 | 活动领先，可靠性投入明显；P0 更新阻断、P1 会话与启动问题未闭环 |
| **Hermes Agent** | 50 | 50 | 1：v0.23.2 Canary | 功能与修复提案密集；48 条 PR 仍开放，网关与恢复风险突出 |
| **ZeroClaw** | 8 | 23 | 无 | 修复供给充足，但当日无合并/关闭；S0 审批风险优先级最高 |
| **NanoClaw** | 9 | 18* | 1：v2026.11.0-rc.1 | 进入候选版验证；安装链路、类型检查与技能兼容性待确认 |
| **CoPaw** | 3 | 12 | 无；版本号 PR 不等于发布 | 稳定性修复与跨端扩展并行；大型 PR 的验证成本较高 |
| **NanoBot** | 10 | 5 | 无 | 执行治理持续推进；安全报告集中，尚无可确认修复闭环 |
| **LobsterAI** | 1 | 3 | 无 | 小步客户端改进；样本不足以评价整体维护效率 |
| PicoClaw | 0 | 0 | 无可见发布 | 本窗口无活动，不据此判断失维护 |
| NullClaw | 0 | 0 | 无可见发布 | 同上 |
| IronClaw | 0 | 0 | 无可见发布 | 同上 |
| TinyClaw / TinyAGI | 0 | 0 | 无可见发布 | 同上 |
| Moltis | 0 | 0 | 无可见发布 | 同上 |
| ZeptoClaw | 0 | 0 | 无可见发布 | 同上 |

\* NanoClaw 概览为 17 条，明细为 18 条。其明细链接指向 `nanocoai/nanoclaw`；CoPaw 明细指向 `agentscope-ai/QwenPaw`，仓库归属需后续核验。

## 3. OpenClaw 在生态中的定位

### 核心定位：覆盖面广、强调持续运行治理的助手平台

**相对优势**

- **本期工程活动最广。**61 条 PR 更新覆盖模型回退、会话恢复、子智能体交付、沙箱性能、数据库与通道适配；相较单点功能扩展，更接近完整运行平台的治理。
- **发布渠道分层更明确。**同时维护主线与 Gateway 专用 extended-stable，为功能迭代和保守部署提供不同选择；但后者不应视为覆盖桌面端的全面 LTS。
- **长期助手的核心环节受到持续投入。**重启后消息、发送权限与最终写入的保留，以及记忆和成本记录完整性，直接关系到个人助手的可信度。

**技术路线差异**

- 相比 **Hermes** 的子智能体通信、MoA 策略和供应商扩展，OpenClaw 本期更偏向“故障后仍能恢复并交付结果”。
- 相比 **NanoClaw** 的容器边界、技能扩展与安装流程，OpenClaw 的可见治理范围更广，同时也承担更多跨平台和状态迁移复杂性。
- 相比 **LobsterAI** 的客户端体验、**CoPaw** 的云端连接本地工作区，OpenClaw 本期更突出 Gateway、状态存储与执行基础设施。

**社区规模判断**

OpenClaw 是本窗口内**活动量最大的项目**，且可见最高 Issue 评论数为 **13**，高于其他项目展示的单条记录。但缺少活跃贡献者、用户量和长期趋势数据，不能据此认定其总体社区最大；与 Hermes 的对比也受展示明细不完整影响。

**主要短板：**平台覆盖面尚未转化为已证实的升级可靠性领先。跨平台更新故障、状态损坏导致会话整体阻断，以及副作用任务重放，仍是生产部署的重要风险。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **长期运行与故障恢复** | OpenClaw、Hermes、NanoBot、ZeroClaw | 重启后恢复队列；停止和替换任务无竞态；失败后进入明确终态；慢任务不阻塞调度 |
| **多模型接入与透明回退** | OpenClaw、Hermes、NanoClaw、CoPaw、ZeroClaw | 健康备用模型不被误封；供应商协议保真；配额错误可分类回退；避免 MoA 静默降级 |
| **多智能体执行一致性** | OpenClaw、Hermes、CoPaw | 已完成子任务及时交付；批内通信；派发前整批校验；advisor 建议遵守 worker 约束 |
| **安全与授权边界** | NanoBot、ZeroClaw、NanoClaw、CoPaw、OpenClaw | URL/SSRF 校验、凭证保护、不可绕过的审批、容器与挂载限制、插件会话访问授权 |
| **升级与发布验证** | OpenClaw、Hermes、NanoClaw、CoPaw | 更新中断可恢复；保留本地定制；避免检查遗漏和“退出 0 的假成功”；构件一致性 |
| **记忆与历史可信度** | OpenClaw、ZeroClaw、Hermes | 防止索引遗漏或消息覆盖；压缩与恢复不重复；重放保持文本、顺序和协议字段 |
| **跨端与通道体验** | Hermes、CoPaw、OpenClaw、NanoClaw、LobsterAI | 桌面与服务端状态一致；移动安全区；聊天卡片生命周期；长代码和本地文件正确展示 |

共同点不是单纯追求“更多自主性”，而是让自主执行具备**明确边界、可恢复状态和可核验结果**。

## 5. 差异化定位分析

以下为本期工作所体现的侧重，并非完整产品或架构评测。

| 项目 | 功能与架构侧重 | 更相关的目标用户/场景 | 关键取舍 |
|---|---|---|---|
| **OpenClaw** | Gateway、状态存储、沙箱、多通道与子任务交付 | 长期运行个人助手、多通道和复杂自动化部署 | 覆盖面广，但升级与状态兼容性成本高 |
| **Hermes** | 多供应商、MoA、子智能体协作，Desktop/TUI/ACP 多入口 | 多模型编排、协作型 Agent、跨端工作流 | 扩展积极，运行协调与协议兼容压力大 |
| **NanoBot** | 会话执行所有权、持续目标、Apps/Plugins/MCP 管理 | 关注执行可控性与统一扩展体验的用户 | 执行治理与安全加固尚待形成交付闭环 |
| **NanoClaw** | 容器目录边界、按需技能、提供商与 OneCLI 集成 | 偏好按需扩展、容器化部署的开发者 | 默认安全/测试约束与技能组合需要协调 |
| **ZeroClaw** | Rust/Cargo 工具链、SOP 审批、cron、可选记忆后端 | 重视流程控制、定时自动化与配置治理的部署者 | 审批安全、后端收敛和预算默认值需谨慎迁移 |
| **CoPaw** | worker–advisor、渠道 worker、审批与本地工作区跨端访问 | 本地部署并希望手机/云端访问的用户 | 跨端便利性增加身份、访问隔离与授权验证要求 |
| **LobsterAI** | 客户端、服务端配置展示、Windows 文件预览 | 中文桌面办公与本地文件处理用户 | 体验导向明显，内置服务可用性还受账号策略影响 |

其余六个项目本窗口无活动，不能仅凭名称或既有印象补充定位结论。

## 6. 社区热度与成熟度

### 活跃度分层

- **第一层：高活动量——OpenClaw、Hermes。**两者均覆盖大量运行问题和能力扩展。OpenClaw 更偏质量巩固与发布治理；Hermes 更体现功能扩张和稳定性修复并行。
- **第二层：集中迭代——ZeroClaw、NanoClaw、CoPaw、NanoBot。**ZeroClaw 偏稳定性与安全收敛；NanoClaw 处于 RC 验证；CoPaw 同时推进修复与大型跨端功能；NanoBot 聚焦执行内核和安全边界。
- **第三层：局部维护——LobsterAI。**以桌面体验和兼容性改进为主，不能把单日低活动解释为成熟或衰退。
- **观察不足——其余六个项目。**需要更长窗口才能判断节奏。

### 热度不等于成熟度

NanoBot 的 **9/10 条 Issue 来自同一报告者**，NanoClaw 的 **7/9 条来自同一报告者**，更像集中审查，而非广泛用户反馈。多数项目评论少、点赞少或 PR 评论数据缺失，无法建立可靠的社区支持度排名。

成熟度更应看“**问题确认—修复合并—版本发布—部署验证**”的闭环。本批数据中，没有足够证据认定任何项目已经完成关键风险的全面闭环；有发布渠道和高 PR 吞吐，也不代表故障率更低。

## 7. 值得关注的趋势信号

### ① 竞争焦点从功能数量转向运行可信度
队列卡死、任务失败却仍显示活跃、服务监听但健康检查挂起，在多个项目出现。  
**开发参考：**将任务状态机、取消语义、重启恢复和真实健康探测列为核心设计，而非上线后的补丁。

### ② 多智能体系统需要“副作用治理”
OpenClaw 的任务重放、CoPaw 的部分派发、Hermes 的工具回退副作用，说明重复或部分执行可能比失败本身更危险。  
**开发参考：**引入幂等键、派发前校验、操作回执和明确重试边界；不要默认重新调用就是安全恢复。

### ③ 模型适配正在成为独立的协议工程
thinking 签名、加密推理回放、Responses 顺序、本地上下文预算及配额错误分类，均超出简单 API 封装。  
**开发参考：**按供应商与协议维护契约测试，覆盖多轮、工具循环、压缩和恢复路径。

### ④ 权限必须由执行层强制落实
ZeroClaw 的审批绕过、NanoBot 的 URL 信任边界、CoPaw 的审批范围文案，共同表明提示词和界面提示不能代替授权机制。  
**开发参考：**执行前重新校验权限，确保审批绑定正确的操作、会话和有效期。

### ⑤ 本地助手正向跨端服务演进
CoPaw 的共享 Web App、Hermes 的远程客户端需求，以及 OpenClaw 的多 Gateway 运维需求，显示“本地运行、随处访问”正在成为重要形态。  
**开发参考：**提前定义服务端状态权威、设备身份、工作区隔离和不采集内容的可观测性。

### ⑥ 发布工程已成为产品能力的一部分
回滚、更新中断恢复、数据库兼容和本地定制保留，直接决定助手能否持续使用。  
**开发参考：**把升级矩阵与故障注入纳入发布门禁，同时验证日志、退出码和实际运行版本，避免“安装成功但服务不可用”。

---

**决策结论：**若关注覆盖面与长期运行平台治理，OpenClaw 值得优先评估；若关注多模型、多智能体协作，Hermes 的提案更密集；NanoClaw、ZeroClaw、CoPaw、NanoBot 则分别在容器/技能边界、流程控制、跨端访问和执行治理上呈现差异化信号。**生产选型应以目标场景的恢复测试、安全边界和已发布修复为准，而不是以单日 PR 数或功能清单排序。**

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报
**日期：2026-11-18** · [GitHub 仓库](https://github.com/HKUDS/nanobot)

## 1. 今日速览

过去 24 小时，NanoBot 共记录 **10 条 Issue 更新、5 条 PR 更新**；Issue 均处于开放状态，PR 中 3 条开放、2 条关闭，**没有新版本发布**。项目开发活动主要集中在 Agent 执行生命周期治理和 WebUI 体验整合，而新增问题明显偏向安全加固、依赖风险及异常处理。贡献来源较集中：9 条 Issue 来自同一报告者，5 条 PR 来自同一贡献者，体现出集中的问题排查与开发活动，而非广泛社区讨论。整体判断为：**开发保持活跃，但本批次问题尚未形成可确认的修复闭环，安全问题分级与执行稳定性值得优先关注**。

> **统计说明：**以下依据所提供快照分析。两条 PR 仅标注 `CLOSED`，不能据此认定已合并；所有 Issue 评论与点赞均为 0，PR 评论数未提供。安全风险为报告者提出的问题，尚无维护者确认信息。

## 2. 项目进展

### 已关闭 PR：WebUI 分类与状态文案整理

| PR | 变更内容 | 进展判断 |
|---|---|---|
| [#6687 — 分离 Agent Plugins 与 CLI Apps](https://github.com/HKUDS/nanobot/pull/6687) | 区分 CLI Apps、Agent Plugins、MCP；保留 Ready 聚合和分类搜索；提供插件专属详情及启停操作，并关联 CLI 生成插件与已安装应用。 | 改善不同扩展类型的识别和管理体验；**关闭状态不代表已合并**。 |
| [#6689 — 优化推理与 Shell 活动文案](https://github.com/HKUDS/nanobot/pull/6689) | 调整全部 10 种支持语言中的工具调用、运行中、超时和重试等状态文案。 | 属于文案层面的可用性改进，旨在减少用户将“等待超时”误解为“命令结束”；**是否落地主干尚无法确认**。 |

### 开放 PR：执行正确性是更重要的推进方向

- **[#6699 — 统一会话执行所有权](https://github.com/HKUDS/nanobot/pull/6699)**  
  针对 `/stop`、替代任务、自动化提交和关闭流程之间的竞态，集中管理执行生命周期。若合并，有望减少任务永久等待、旧任务尚未清理完成便启动新任务等问题，是本批次较重要的底层稳定性工作。

- **[#6688 — 终止性执行失败后阻塞目标](https://github.com/HKUDS/nanobot/pull/6688)**  
  处理执行已终止但持续目标仍保持活跃，以及部分拒绝、截断响应被记为成功的问题。它推进的是长期任务的状态一致性，而不仅是界面反馈。

- **[#6700 — 统一 Apps 目录](https://github.com/HKUDS/nanobot/pull/6700)**  
  整合 Tools、Skills、Chat Platforms 的导航与目录布局，同时改善 Apps/Automations 内容宽度和 MCP 空状态跳转问题。

**整体推进程度：**提案覆盖了执行内核与产品界面两条主线，但缺少合并记录和发布版本，当前应将其视为“正在推进”，不能表述为已经交付。

## 3. 社区热点

本批次**没有足够的评论或反应数据支持“最热讨论”排名**。更适合按问题集中度识别以下关注主题：

1. **网络工具的信任边界**  
   [#6701：NUL 字节主机名](https://github.com/HKUDS/nanobot/issues/6701)、[#6691：IDNA 异常](https://github.com/HKUDS/nanobot/issues/6691)、[#6690：特殊地址段遗漏](https://github.com/HKUDS/nanobot/issues/6690) 都指向 URL 解析和网络访问防护。背后诉求是：Agent 接收外部或模型生成 URL 时，应有一致、可预测的校验与失败行为。

2. **WebUI 与依赖供应链安全**  
   [#6697：开发工具链依赖告警](https://github.com/HKUDS/nanobot/issues/6697)、[#6696：KaTeX 风险](https://github.com/HKUDS/nanobot/issues/6696)、[#6695：pyasn1 依赖风险](https://github.com/HKUDS/nanobot/issues/6695) 集中要求依赖治理。其中开发工具链风险与运行时渲染风险需要分开评估，不能简单按告警数量衡量部署风险。

3. **长任务的可控性与状态真实性**  
   [#6698：Shell 长任务占用回合](https://github.com/HKUDS/nanobot/issues/6698) 与 [#6699：执行所有权重构](https://github.com/HKUDS/nanobot/pull/6699)、[#6688：终止失败状态修正](https://github.com/HKUDS/nanobot/pull/6688) 共同反映：用户需要能停止、能收敛、能正确反馈结果的自主执行流程。

## 4. Bug 与稳定性

以下按**建议排查优先级**排序，并非官方漏洞评级；实际严重性仍取决于可达性、部署方式和复现结果。

| 优先级 | 问题与影响 | Fix PR 状态 |
|---|---|---|
| **高** | [#6701 — 主机名中的 NUL 字节未被拒绝](https://github.com/HKUDS/nanobot/issues/6701)：报告指出底层 `getaddrinfo` 可能截断主机名，存在校验输入与实际解析目标不一致的风险。 | 所给数据中未见对应 PR |
| **高** | [#6696 — KaTeX 原型污染风险](https://github.com/HKUDS/nanobot/issues/6696)：报告称受影响版本可能绕过 trust 限制，且渲染输入可由 LLM 输出提供。 | 未见对应 PR |
| **高** | [#6694 — 配对码以明文写入 info 日志](https://github.com/HKUDS/nanobot/issues/6694)：具有日志读取权限者可能获取待使用配对码。 | 未见对应 PR |
| **高** | [#6698 — Exec 超时与累计输出限制缺口](https://github.com/HKUDS/nanobot/issues/6698)：长时间无输出命令可能占用 Agent 回合；部分路径缺少累计缓冲硬上限，涉及可用性和资源耗尽风险。 | 未见直接对应 PR；[#6699](https://github.com/HKUDS/nanobot/pull/6699) 涉及执行治理，但不能视为已修复此问题 |
| **中高** | [#6693 — API token 可通过 URL 查询参数传入](https://github.com/HKUDS/nanobot/issues/6693)：可能增加访问日志、浏览历史及部分 Referer 场景下的凭证泄露风险。 | 未见对应 PR |
| **中高** | [#6690 — SSRF 阻断列表遗漏特殊地址段](https://github.com/HKUDS/nanobot/issues/6690)：涉及组播、保留、基准测试和文档地址范围，需验证策略覆盖面。 | 未见对应 PR |
| **待核验** | [#6697 — WebUI 开发工具链 32 条依赖告警](https://github.com/HKUDS/nanobot/issues/6697)：报告包含 4 critical、8 high；摘要明确属于构建/开发工具链，不应直接等同于生产运行时可利用。 | 未见对应 PR |
| **待核验** | [#6695 — pyasn1 0.6.4 被审计工具标记 4 个 CVE](https://github.com/HKUDS/nanobot/issues/6695)：报告建议将最低版本提高至 `>=0.6.5`，仍需确认实际解析版本与影响路径。 | 未见对应 PR |
| **中** | [#6691 — 畸形主机名触发未捕获的 IDNA 异常](https://github.com/HKUDS/nanobot/issues/6691)：如空标签域名可能使 `UnicodeError` 逃逸，影响工具调用的错误处理。 | 未见对应 PR |
| **中低** | [#6692 — 超长 JSON 整数触发裸 `ValueError`](https://github.com/HKUDS/nanobot/issues/6692)：配置加载未统一包装为 `ConfigLoadError`，降低异常提示与处理的一致性。 | 未见对应 PR |

此外，[#6688](https://github.com/HKUDS/nanobot/pull/6688) 已有针对终止失败后目标状态错误的修复提案，[#6699](https://github.com/HKUDS/nanobot/pull/6699) 已有针对会话停止、替换及关闭竞态的重构提案，均尚待合并。

## 5. 功能请求与路线图信号

本批次 Issue 以缺陷和加固为主，**没有明确的新功能请求**。可从开放 PR 观察到三条近期方向，但不能据此确认下一版本计划：

- **统一扩展入口与应用发现体验**：[#6700](https://github.com/HKUDS/nanobot/pull/6700) 已有具体实现，若通过评审，可能成为近期 WebUI 的主要用户可见变化。
- **强化多来源任务调度与停止语义**：[#6699](https://github.com/HKUDS/nanobot/pull/6699) 表明项目正在处理交互任务、自动化提交和资源清理之间的所有权边界。
- **提高持续目标执行的可靠性**：[#6688](https://github.com/HKUDS/nanobot/pull/6688) 强调失败后正确收敛，体现长期运行 Agent 对明确终态的需求。

## 6. 用户反馈摘要

**数据限制：10 条 Issue 均无评论，无法提炼评论中的真实使用体验、满意度或维护者回应。**仅从报告正文与 PR 动机，可以识别以下痛点：

- **无人值守任务需要可控的资源边界**：长命令可能占住回合，累计输出限制不足也会影响稳定运行。来源：[#6698](https://github.com/HKUDS/nanobot/issues/6698)。
- **任务状态必须反映实际结果**：运行已经失败，目标却仍显示活跃，会误导后续判断。来源：[#6688](https://github.com/HKUDS/nanobot/pull/6688)，属于 PR 动机而非用户评论。
- **部署便利不能以凭证暴露为代价**：日志中的配对码和 URL 中的 token 都增加敏感信息进入周边系统的机会。来源：[#6694](https://github.com/HKUDS/nanobot/issues/6694)、[#6693](https://github.com/HKUDS/nanobot/issues/6693)。
- **扩展分类与运行提示需要更清晰**：Apps 分类、MCP 跳转和 Shell 状态文案的连续调整，反映界面信息架构仍在打磨。来源：[#6700](https://github.com/HKUDS/nanobot/pull/6700)、[#6689](https://github.com/HKUDS/nanobot/pull/6689)。

## 7. 待处理积压

当前条目均创建于 **11 月 17—18 日**，**没有证据表明存在长期未响应积压**。Issue 的零评论也不能证明维护者没有进行内部排查。建议将以下事项列入近期跟进清单：

1. **优先完成安全问题确认与分级**：关注 [#6701](https://github.com/HKUDS/nanobot/issues/6701)、[#6696](https://github.com/HKUDS/nanobot/issues/6696)、[#6694](https://github.com/HKUDS/nanobot/issues/6694)，明确复现、影响版本与缓解办法。
2. **统一审查网络安全边界**：联合处理 [#6701](https://github.com/HKUDS/nanobot/issues/6701)、[#6691](https://github.com/HKUDS/nanobot/issues/6691)、[#6690](https://github.com/HKUDS/nanobot/issues/6690)，避免分散修复造成校验规则不一致。
3. **审查执行治理 PR 并补齐关联测试**：重点关注 [#6699](https://github.com/HKUDS/nanobot/pull/6699)、[#6688](https://github.com/HKUDS/nanobot/pull/6688)，同时确认其是否覆盖 [#6698](https://github.com/HKUDS/nanobot/issues/6698) 的相关场景。
4. **明确已关闭 PR 的去向**：核实 [#6687](https://github.com/HKUDS/nanobot/pull/6687)、[#6689](https://github.com/HKUDS/nanobot/pull/6689) 是已合并、被替代还是撤回，避免将关闭误计为交付。

**健康度结论：**NanoBot 当前体现出持续开发与集中问题发现能力，但贡献集中、缺少讨论反馈，且本批次安全报告尚无可确认的修复闭环。下一阶段最值得追踪的指标，是高优先级问题的确认速度、修复 PR 覆盖率，以及执行稳定性改动的实际合并结果。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-11-18** · [GitHub 仓库](https://github.com/NousResearch/hermes-agent)

> **统计口径**：基于提供的过去 24 小时更新数据；共 50 条 Issue、50 条 PR，正文仅展示其中 30 条 Issue、20 条 PR。发布说明被截断，PR 评论数为 `undefined`，未提供评论正文。因此，下文区分“用户报告”“待合并方案”和“已确认交付”，不将关闭等同于已修复或已合并。

## 1. 今日速览

- **开发与反馈活跃度较高**：过去 24 小时有 50 条 Issue 更新、50 条 PR 更新，另有 1 个 Canary 版本进入统计窗口；Issue 中 49 条为新开或活跃状态，PR 中 48 条仍待合并。
- 工作重心呈现两条主线：一是网关、会话恢复、工具调用与更新流程的稳定性；二是多智能体协作、模型供应商接入和插件策略扩展。代表性进展包括[子智能体批内通信 PR #157232](https://github.com/NousResearch/hermes-agent/pull/157232)。
- **稳定性风险值得优先关注**：已有用户报告网关永久死锁、重启后会话队列卡死，以及更新后本地提交未被重新应用等问题，可能直接影响个人助手的持续可用性。参见 [#157239](https://github.com/NousResearch/hermes-agent/issues/157239)、[#157169](https://github.com/NousResearch/hermes-agent/issues/157169)、[#157230](https://github.com/NousResearch/hermes-agent/issues/157230)。
- 当前更适合评价为“**贡献活跃、修复与功能提案充足，但交付成效尚待验证**”：不能凭本次快照判断积压是否持续增长，也不能把待合并 PR 视为已发布能力。

## 2. 版本发布

### [v0.23.2+canary.20261117T064624Z](https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.2%2Bcanary.20261117T064624Z)

| 项目 | 已知信息 |
|---|---|
| 发布日期 | 2026-11-17，进入本次日报统计窗口 |
| 发布性质 | Canary 构建，不应等同于稳定版发布 |
| 可见内容 | 发布页包含 Hermes Desktop 下载表，能确认 macOS Apple Silicon DMG 条目 |
| 功能与修复清单 | 所给说明被截断，无法确认 |
| 破坏性变更及迁移要求 | 数据未提供，不能认定“无破坏性变更” |

**升级注意事项：**
- 有本地定制提交的安装，应先保留独立分支或备份；用户报告 `hermes update` 切换到发布版本后不会重新应用本地提交。该问题不应直接归因于本次 Canary。见 [Issue #157230](https://github.com/NousResearch/hermes-agent/issues/157230)。
- Windows 用户应关注更新期间待机导致网关暂停、更新状态不明确的报告。见 [Issue #157196](https://github.com/NousResearch/hermes-agent/issues/157196)。
- 建议先在非关键环境验证会话恢复、定时任务和 MCP 工具可用性，再升级长期运行的个人助手实例。

## 3. 项目进展

### 已关闭事项：有状态变化，但交付结论有限

| 条目 | 推进方向 | 可确认程度 |
|---|---|---|
| [PR #157220：插件注入绑定目标会话](https://github.com/NousResearch/hermes-agent/pull/157220) | 拟为 `PluginContext.inject_message` 增加 `expected_session_id`，将定向注入接入会话归属与谱系校验，减少消息进入错误会话的风险 | 显示为 **CLOSED**，无法确认是否合并 |
| [Issue #157115：Codex OAuth 缓存读取缺口](https://github.com/NousResearch/hermes-agent/issues/157115) | 涉及长对话和工具循环中的缓存命中、成本与性能 | 已关闭，但未提供关闭原因或对应修复 |

概览显示共有 **2 条 PR 合并或关闭**，但展示列表中仅能识别上述 1 条关闭 PR，另一条详情缺失。因此，**今日已落地功能数量无法可靠量化**。

### 值得跟踪的待合并进展

- **多智能体协作**：[PR #157232](https://github.com/NousResearch/hermes-agent/pull/157232) 允许同一批次的子智能体在运行中互发简短发现，目标是减少并行任务之间的信息孤岛。
- **供应商扩展**：[PR #157237](https://github.com/NousResearch/hermes-agent/pull/157237) 提议将 Perplexity Agent API 作为内置模型供应商。
- **协议回放保真**：[PR #157216](https://github.com/NousResearch/hermes-agent/pull/157216) 拟保留 Responses 输出顺序和精确助手文本，改善多轮调用一致性。
- **会话压缩修复**：[PR #157226](https://github.com/NousResearch/hermes-agent/pull/157226)、[PR #157218](https://github.com/NousResearch/hermes-agent/pull/157218) 分别处理摘要时间戳与恢复合并中的压缩重复记录。

**进展判断**：工程覆盖面较广，但当前证据主要反映“方案进入评审”，而非“用户已获得修复”。

## 4. 社区热点

展示的 Issue 最高仅 **1 条评论**，点赞均为 **0**；PR 评论数缺失，无法形成可靠的讨论热度排名。以下按“已有互动 + 影响范围”筛选，而非声称存在高热讨论。

| 关注主题 | 数据与诉求 |
|---|---|
| [重启后会话 FIFO 永久卡死 #157169](https://github.com/NousResearch/hermes-agent/issues/157169) | 1 条评论。用户期望持久化队列在网关重启后可靠恢复，而不是持续 `queued` |
| [MCP 空闲回收导致 Cron 丢失工具 #157167](https://github.com/NousResearch/hermes-agent/issues/157167) | 1 条评论。后台自动化需要在无人干预下恢复 MCP 连接与工具能力 |
| [Desktop 侧栏切换导致工作区空白 #157119](https://github.com/NousResearch/hermes-agent/issues/157119) | 1 条评论。基础界面操作影响整个工作区，属于直接可感知的体验故障 |
| [TUI 忙碌时发送图片无法补发 #157095](https://github.com/NousResearch/hermes-agent/issues/157095) | 1 条评论。用户要求图片与纯文本在 steer/interrupt 模式下具有一致的投递语义 |
| [自定义供应商推理内容回放报错 #157091](https://github.com/NousResearch/hermes-agent/issues/157091) | 1 条评论。诉求是不同模型后端在工具循环中的协议兼容性 |

## 5. Bug 与稳定性

以下按**实际影响排序**，不改变仓库中的 P2/P3 标签。“未见修复 PR”仅表示所给展示数据中没有明确对应项。

| 严重程度 | 问题及影响 | 修复状态 |
|---|---|---|
| **高：服务不可用** | [#157239](https://github.com/NousResearch/hermes-agent/issues/157239)：Windows 网关预热导入期间收到请求可能永久死锁，端口仍监听但 `/health` 等请求挂起 | 未见对应 PR |
| **高：会话不可用** | [#157169](https://github.com/NousResearch/hermes-agent/issues/157169)：重启后残留 `unknown` admission，使会话队列持续阻塞 | 未见对应 PR |
| **高：本地定制丢失风险** | [#157230](https://github.com/NousResearch/hermes-agent/issues/157230)：更新后本地已提交补丁不被重新应用；报告称仅保留有期限的救援引用 | 未见对应 PR；不等同于已证实提交立即被物理删除 |
| **高：更新中断** | [#157196](https://github.com/NousResearch/hermes-agent/issues/157196)：Windows S0 待机可能中断更新，留下暂停的网关与不明确状态 | 未见对应 PR |
| **较高：工具调用失败** | [#157091](https://github.com/NousResearch/hermes-agent/issues/157091)：自定义 Chat Completions 路由回放加密推理内容后返回 HTTP 400 | 未见明确对应 PR；不能将 #157216 直接视为其修复 |
| **较高：自动化工具缺失** | [#157167](https://github.com/NousResearch/hermes-agent/issues/157167)：Cron 在 stdio MCP 空闲回收后失去工具；[#157221](https://github.com/NousResearch/hermes-agent/issues/157221)：多 profile ACP 会话后续轮次看不到配置的 MCP 服务 | 均未见对应 PR |
| **较高：交互阻断** | [#157119](https://github.com/NousResearch/hermes-agent/issues/157119)：Desktop 工作区空白；[#157094](https://github.com/NousResearch/hermes-agent/issues/157094)：特定 Firefox/Wayland/fcitx5 环境聊天输入失效 | 未见对应 PR |
| **中：会话与重启一致性** | [#157142](https://github.com/NousResearch/hermes-agent/issues/157142)：分支会话无法恢复；[#157165](https://github.com/NousResearch/hermes-agent/issues/157165)：仍有排队输入时被误判为空闲并重启 | 未见对应 PR |
| **中：工具参数兼容及副作用** | [#157209](https://github.com/NousResearch/hermes-agent/issues/157209)：Kanban 拒绝字符串形式 metadata，模型回退尝试可能提交占位交接 | 有待合并 [PR #157228](https://github.com/NousResearch/hermes-agent/pull/157228)；摘要明确覆盖 complete/request_review，是否完整覆盖 `kanban_block` 仍需核实 |
| **中：控制标记泄漏** | [#157236](https://github.com/NousResearch/hermes-agent/issues/157236)：`[NO_REPLY]` 可能作为正文或流式片段发送 | 有明确待合并修复 [PR #157240](https://github.com/NousResearch/hermes-agent/pull/157240) |

另外，[Issue #157231](https://github.com/NousResearch/hermes-agent/issues/157231) 报告包同步回执覆盖更新回执，可能削弱故障追踪和重启义务记录，建议与更新安全问题一并处理。

## 6. 功能请求与路线图信号

| 方向 | 用户需求与现有方案 | 纳入近期版本的信号 |
|---|---|---|
| **MoA 可靠性策略** | [Issue #157199](https://github.com/NousResearch/hermes-agent/issues/157199) 要求避免静默退化到单模型；已有 [PR #157214](https://github.com/NousResearch/hermes-agent/pull/157214) 增加 fan-out 判定和辅助回退策略钩子 | **较强**：需求与实现直接对应，但尚未合并 |
| **子智能体运行中协作** | [PR #157232](https://github.com/NousResearch/hermes-agent/pull/157232) 提供同批次子任务消息互通 | **较强**：已有实现提案 |
| **主循环请求参数配置** | [PR #157215](https://github.com/NousResearch/hermes-agent/pull/157215) 提议开放 `model.request_overrides` | **中等**：仍需确认参数约束及供应商兼容性 |
| **跨来源恢复会话** | [PR #157238](https://github.com/NousResearch/hermes-agent/pull/157238) 增加 `/resume --all-sources`，与 `/sessions all` 对齐 | **中等**：已有独立 PR |
| **实时信息检索** | [Issue #157235](https://github.com/NousResearch/hermes-agent/issues/157235) 请求 `web_search` 按日、周、月、年筛选 | **需求阶段**：未见对应 PR |
| **远程客户端部署** | [Issue #157223](https://github.com/NousResearch/hermes-agent/issues/157223) 请求 `gateway.client_only`，避免纯远程 Desktop 主机自动启动本地网关 | **需求阶段** |
| **长上下文与多模态** | [Issue #157241](https://github.com/NousResearch/hermes-agent/issues/157241) 请求从账户目录发现扩展上下文；[Issue #157176](https://github.com/NousResearch/hermes-agent/issues/157176) 请求 ACP 转发图片内容块 | **需求阶段** |

整体路线图信号是：从“单助手能调用工具”，向“多模型、多客户端、多智能体在长期运行中保持一致与可控”演进。**有 PR 不代表已承诺进入下一版本。**

## 7. 用户反馈摘要

由于未提供评论正文，以下仅提炼 Issue 描述中的真实场景，不虚构评论观点或满意度。

- **无人值守自动化对恢复能力要求更高**：Cron 与 MCP 生命周期问题说明，工具“首次能用”还不够，闲置后也必须自动恢复。见 [#157167](https://github.com/NousResearch/hermes-agent/issues/157167)。
- **用户需要可执行的错误信息**：统一显示 `runtime_coordination_required` 无法解释失败原因与下一步操作。见 [#157224](https://github.com/NousResearch/hermes-agent/issues/157224)。
- **用户已将 Hermes 用于多端协作**：服务器取消置顶后，被 Desktop 本地存储重新覆盖，暴露客户端与服务端状态权威性冲突。见 [#157222](https://github.com/NousResearch/hermes-agent/issues/157222)。
- **企业聊天内容需要完整保真**：Teams 中 SharePoint 超链接只留下文件名，导致助手缺少实际资源地址。见 [#157194](https://github.com/NousResearch/hermes-agent/issues/157194)。
- **高风险推理场景重视透明降级**：MoA 用户明确不接受静默退化为单模型，关注策略控制而不仅是成功返回。见 [#157199](https://github.com/NousResearch/hermes-agent/issues/157199)。

当前样本以故障与需求为主，**不足以判断整体用户满意度**。

## 8. 待处理积压与维护建议

**无法识别“长期未响应”条目**：展示记录主要创建于 11 月 17—18 日，缺少历史等待时间、维护者响应和评审记录。下列是建议优先跟踪的待处理事项，而非已证实的长期积压。

1. **优先分诊网关存活性与会话恢复**：为 [#157239](https://github.com/NousResearch/hermes-agent/issues/157239)、[#157169](https://github.com/NousResearch/hermes-agent/issues/157169) 明确复现条件、负责人和回归测试。
2. **统一审视更新安全链路**：联动处理[本地补丁保留 #157230](https://github.com/NousResearch/hermes-agent/issues/157230)、[回执覆盖 #157231](https://github.com/NousResearch/hermes-agent/issues/157231)、[Windows 待机中断 #157196](https://github.com/NousResearch/hermes-agent/issues/157196)，避免只修单点。
3. **优先评审已有明确问题映射的修复**：[PR #157240](https://github.com/NousResearch/hermes-agent/pull/157240)、[PR #157228](https://github.com/NousResearch/hermes-agent/pull/157228)；同时核查后者是否完整覆盖原 Issue 的全部工具。
4. **补齐交付状态追踪**：确认 [PR #157220](https://github.com/NousResearch/hermes-agent/pull/157220) 的关闭原因，并为已关闭的 [Issue #157115](https://github.com/NousResearch/hermes-agent/issues/157115) 标明修复、重复或外部原因。
5. **防止新增能力放大既有一致性问题**：评审[批内子智能体通信 #157232](https://github.com/NousResearch/hermes-agent/pull/157232) 时，应同步关注取消、消息边界、会话归属和失败恢复。

**总体健康度结论：开发活动充足，生态与能力扩展积极；短期维护重点应是运行可靠性和可验证交付，而不是仅以新增 PR 数量衡量进展。**

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报
**日期：2026-11-18｜统计范围：所提供的过去 24 小时更新数据**

> **数据说明**：概览记录 9 条 Issue、17 条 PR 更新；但明细实际列出 **18 条 PR（11 条 OPEN、7 条 CLOSED）**，以下逐项分析以明细为准。`CLOSED` 不等于已合并，本文不将关闭项直接视为已上线。项目名称给出的仓库为 `qwibitai/nanoclaw`，明细则指向 `nanocoai/nanoclaw`；下文链接按明细生成。部分记录日期为 11 月 17 日，沿用输入的统计窗口。

## 1. 今日速览

NanoClaw 进入 **2026.11.0 首个发布候选版的验证阶段**，开发重点集中在多模型提供商接入、安装体验和安全加固。[版本说明](https://github.com/nanocoai/nanoclaw/releases/tag/v2026.11.0-rc.1)  
本期更新频率较高：9 条 Issue 全部仍开放，PR 明细中有 7 条关闭，显示开发与问题发现同时活跃，但暂未看到 Issue 闭环。  
已出现 Slack 引导提示、Codex 登录、安装日志等问题对应的修复 PR；更新流程漏做类型检查、OneCLI 下图像生成失败等问题尚无明确对应修复。[#4456](https://github.com/nanocoai/nanoclaw/pull/4456)、[#4455](https://github.com/nanocoai/nanoclaw/pull/4455)、[#4454](https://github.com/nanocoai/nanoclaw/issues/4454)  
整体健康度可评为 **“开发活跃，候选版稳定性仍待验证”**；讨论热度无法判断，因为 Issue 评论均为 0，PR 评论数缺失。

## 2. 版本发布

### v2026.11.0-rc.1：进入稳定版前验证阶段
[Release](https://github.com/nanocoai/nanoclaw/releases/tag/v2026.11.0-rc.1) · [发布 PR #4444](https://github.com/nanocoai/nanoclaw/pull/4444)

- **发布定位**：这是 2026.11.0 的首个 RC；维护者预期在测试未发现问题时将其作为稳定版发布，不再安排此前的 beta 阶段。
- **版本替代关系**：2026.11.0 将取代原计划的 2026.10.1，后者不会发布稳定版。
- **变更范围**：发布 PR 摘要称，自 `v2026.11.0-beta.4` 起，`main` 累计包含 15 个 PR；`channels` 仍停留在 beta.4 对应的 `b563b332`。
- **破坏性变更**：提供的发布说明已截断，未明确列出破坏性变更，不能据此认定不存在。
- **升级注意事项**：
  - 无 Bun 的主机应重点核验 `agent-runner` 类型检查是否实际执行；已有报告指出 `/update-nanoclaw` 会漏过这一环节。[#4454](https://github.com/nanocoai/nanoclaw/issues/4454)
  - 使用 Codex、Cursor 或 Slack 的用户，建议验证首次安装、失败诊断和首次私聊引导；相关问题被报告影响该 RC。[#4448](https://github.com/nanocoai/nanoclaw/issues/4448)、[#4450](https://github.com/nanocoai/nanoclaw/issues/4450)、[#4452](https://github.com/nanocoai/nanoclaw/issues/4452)

**判断**：发布阶段已前移，但“RC 已发布”不代表本期关闭的所有 PR 均包含其中；具体纳入范围仍需核对提交记录。

## 3. 项目进展

以下为本期重要 **已关闭 PR**，合并状态尚未提供：

| 方向 | 重要进展 | 实际意义 |
|---|---|---|
| 模型兼容性 | [#4446](https://github.com/nanocoai/nanoclaw/pull/4446)：将 Codex 固定至 0.169.0，面向 ChatGPT 登录下 GPT-6.2 Astra/Sol 的访问问题 | 针对旧版 Codex 导致的 `model_not_found` 回复失败 |
| 主机安全 | [#4440](https://github.com/nanocoai/nanoclaw/pull/4440)：以 `O_NONBLOCK` 打开容器可写目录内的两个文件 | 防止同名 FIFO 导致主机打开操作阻塞，并改善拒绝日志 |
| 凭据安全 | [#4439](https://github.com/nanocoai/nanoclaw/pull/4439)：为 OneCLI 本地数据库生成独立随机密码 | 减少依赖固定默认密码；新安装写入权限为 `0600` 的 `.env` |
| 能力扩展 | [#4435](https://github.com/nanocoai/nanoclaw/pull/4435)：增加会话唤醒时的上下文扩展点 | 为技能注入上下文提供接口，避免修改核心代码；未注册扩展时不主动增加功能 |
| 排障文档 | [#4437](https://github.com/nanocoai/nanoclaw/pull/4437)：纠正 OneCLI `access_restricted` 的含义 | 避免误导用户要求管理员关联可能不存在的账号 |
| 回归测试 | [#4436](https://github.com/nanocoai/nanoclaw/pull/4436)：验证干净检出不应报告已安装频道技能 | 加强技能安装状态判断的测试约束 |

**整体推进幅度**：本期主要是稳定化与基础设施改进，而非大规模终端功能交付；上下文扩展点是较明确的长期架构信号。上述成果是否已进入默认分支或发行版本，需要进一步核验。

## 4. 社区热点

**本期无法按评论或反应选出真实“讨论热点”**：9 条 Issue 的评论和 👍 均为 0，PR 的评论字段为 `undefined`，不能视为零。以下按问题聚集度和关联开发动作列出关注主题：

- **非 Claude 提供商的安装体验**：Codex/Cursor 调试助手缺失、登录警告、Docker 日志刷屏形成集中反馈。诉求不是单纯“支持更多模型”，而是让替代提供商具备完整的安装与排障体验。[#4448](https://github.com/nanocoai/nanoclaw/issues/4448)、[#4450](https://github.com/nanocoai/nanoclaw/issues/4450)、[#4453](https://github.com/nanocoai/nanoclaw/pull/4453)
- **Slack 助手首次使用体验**：欢迎语要求选择建议提示，但实际不显示；对应 PR 同时补上提示和新私聊线程标题，反映频道适配层与上层引导能力之间存在接口缺口。[#4452](https://github.com/nanocoai/nanoclaw/issues/4452)、[#4456](https://github.com/nanocoai/nanoclaw/pull/4456)
- **技能与安全/测试边界的兼容性**：用户按技能说明添加 RTK 或 Vercel 后，分别遭遇挂载策略拒绝和测试断言冲突。诉求是“按需扩展”能与默认安全及测试约束一致工作。[#4458](https://github.com/nanocoai/nanoclaw/issues/4458)、[#4459](https://github.com/nanocoai/nanoclaw/issues/4459)

## 5. Bug 与稳定性

以下为基于影响范围的分析优先级，**不是官方严重性评级**。本期未提供明确崩溃或数据丢失报告。

| 优先级 | 问题与影响 | 对应 fix PR |
|---|---|---|
| **高** | 无 Bun 的主机更新时不检查 `agent-runner` 源码类型，形成发布前验证盲区；尚不能据此认定已经发生运行故障。[#4454](https://github.com/nanocoai/nanoclaw/issues/4454) | 未见 |
| **中高** | 通过 OneCLI、以 ChatGPT 登录的 Codex Agent 无法生成图像，目标能力不可用。[#4451](https://github.com/nanocoai/nanoclaw/issues/4451) | 未见；Codex 升级 PR 未明确覆盖此问题 |
| **中** | `/add-rtk` 将二进制挂载到 `/usr/local/bin/rtk`，被挂载安全规则拒绝，技能步骤无法完成。[#4458](https://github.com/nanocoai/nanoclaw/issues/4458) | 未见 |
| **中** | 应用 `/add-vercel` 后，“不得包含 vercel”的默认测试仍生效，造成测试与合法扩展冲突。[#4459](https://github.com/nanocoai/nanoclaw/issues/4459) | 未见 |
| **中** | Cursor 安装没有 setup 调试助手；Codex 则要求主机已安装并登录后才提供助手，削弱首次安装故障的自助恢复能力。[#4450](https://github.com/nanocoai/nanoclaw/issues/4450)、[#4448](https://github.com/nanocoai/nanoclaw/issues/4448) | 未见明确对应修复 |
| **中低** | Slack 欢迎语引用不存在的建议提示，首次引导中断。[#4452](https://github.com/nanocoai/nanoclaw/issues/4452) | [#4456，OPEN](https://github.com/nanocoai/nanoclaw/pull/4456) |
| **低** | Codex 设备登录时出现 `/tmp` 下辅助二进制/PATH 别名警告，降低可理解性与信任感。[#4449](https://github.com/nanocoai/nanoclaw/issues/4449) | [#4455，OPEN](https://github.com/nanocoai/nanoclaw/pull/4455) |
| **低** | 非 Claude 提供商安装后的镜像重建直接输出完整 Docker 日志，破坏安装向导展示。[#4447](https://github.com/nanocoai/nanoclaw/issues/4447) | [#4453，OPEN](https://github.com/nanocoai/nanoclaw/pull/4453) |

另有两个待审稳定性修复值得关注：

- **OneCLI 网关就绪检查失败却可能退出 0**：会让自动化误判安装成功。[#4434](https://github.com/nanocoai/nanoclaw/pull/4434)
- **长回复跨消息拆分时破坏代码围栏**：影响 Discord、Telegram 等频道的代码展示。[#4443](https://github.com/nanocoai/nanoclaw/pull/4443)

## 6. 功能请求与路线图信号

本期 Issue 均以缺陷报告为主，新增能力信号主要来自 PR：

| 信号 | 当前状态 | 下一版本判断 |
|---|---|---|
| **Antigravity/Gemini 提供商接入**：新增 `/add-antigravity`，支持按组切换 provider | [#4442，OPEN](https://github.com/nanocoai/nanoclaw/pull/4442) | 明确的多提供商扩展方向；尚不能确认进入 2026.11.0，尤其当前已进入 RC 阶段 |
| **会话唤醒上下文扩展机制** | [#4435，CLOSED](https://github.com/nanocoai/nanoclaw/pull/4435) | 为后续技能能力铺路，但关闭状态不足以确认交付 |
| **跨频道长代码消息正确展示** | [#4443，OPEN](https://github.com/nanocoai/nanoclaw/pull/4443) | 属于兼容性修复，可作为候选版稳定化事项，未有版本承诺 |
| **Slack 原生引导与线程标题** | [#4456，OPEN](https://github.com/nanocoai/nanoclaw/pull/4456) | 已有明确实现，后续重点是审查与验证 |

## 7. 用户反馈摘要

**输入未包含 Issue 评论正文，不能提炼评论中的情绪或满意度。** 从 Issue 描述可确认以下使用痛点：

- **“首次安装失败时，最需要调试助手，却拿不到。”** Codex 的前置条件和 Cursor 的实现缺口，使尚未完成安装的用户更难恢复。[#4448](https://github.com/nanocoai/nanoclaw/issues/4448)、[#4450](https://github.com/nanocoai/nanoclaw/issues/4450)
- **“文档给出的操作路径不一定能走通。”** RTK 挂载被拒、Vercel 扩展触发默认测试失败，体现技能组合后的验证不足。[#4458](https://github.com/nanocoai/nanoclaw/issues/4458)、[#4459](https://github.com/nanocoai/nanoclaw/issues/4459)
- **“接通模型不等于能力完整。”** OneCLI 下 Codex 可以登录使用，但图像生成仍存在能力缺口。[#4451](https://github.com/nanocoai/nanoclaw/issues/4451)
- **“安装和首次交互需要更一致。”** 日志刷屏与 Slack 空缺提示会降低用户对完成状态和下一步操作的确定性。[#4447](https://github.com/nanocoai/nanoclaw/issues/4447)、[#4452](https://github.com/nanocoai/nanoclaw/issues/4452)

9 条 Issue 中有 **7 条由同一报告者 glifocat 提交**，因此更适合视为集中排查发现的问题集合，而非广泛用户不满的统计证据。

## 8. 待处理积压

**本批数据仅覆盖约一天，无法识别真正“长期未响应”的积压。** 建议维护者优先关注：

1. **RC 验证缺口**：确认无 Bun 环境下更新检查的替代路径，并判断是否应阻塞稳定版发布。[#4454](https://github.com/nanocoai/nanoclaw/issues/4454)
2. **安装自动化的错误状态传播**：优先审查 OneCLI 就绪失败仍可能成功退出的问题，避免形成“假成功”。[#4434](https://github.com/nanocoai/nanoclaw/pull/4434)
3. **尚无修复的功能阻断**：为 RTK 挂载和 Codex/OneCLI 图像生成问题明确负责人、复现用例与处理计划。[#4458](https://github.com/nanocoai/nanoclaw/issues/4458)、[#4451](https://github.com/nanocoai/nanoclaw/issues/4451)
4. **镜像刷新 PR 去重**：同一 `v2026.10.0` 存在三个开放的镜像更新 PR，需核对替代关系，避免重复审查或误用较旧摘要。[#4438](https://github.com/nanocoai/nanoclaw/pull/4438)、[#4445](https://github.com/nanocoai/nanoclaw/pull/4445)、[#4457](https://github.com/nanocoai/nanoclaw/pull/4457)

**结论**：NanoClaw 的积极信号是修复与安全加固持续推进；当前最需要改善的是候选版验证完整性、非 Claude 安装链路，以及技能扩展后的端到端一致性。稳定版发布前，应以可复现测试和实际合并记录确认闭环，而非仅依赖 PR 关闭数量。

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
**日期：2026-11-18** · [项目仓库](https://github.com/netease-youdao/LobsterAI)

> **统计口径**：以下基于提供的过去 24 小时更新列表。3 条 PR 的明细更新时间均为 11 月 17 日，与日报日期存在差异，可能涉及统计窗口或时区口径；本文将其作为本期观察项。`CLOSED` 仅表示已关闭，**不能据此确认已合并**。

## 1. 今日速览

LobsterAI 本期记录到 **1 条 Issue、3 条 PR 更新，无新版本发布**，从可见样本看，活跃度偏低，工作集中于客户端体验与兼容性改进。两项服务端配置驱动的界面功能 PR 已关闭，但是否进入主线仍需核实。另有一项 Windows 文件预览修复 PR 待合并，针对 CSV 中文乱码和本地链接打开方式两个实际使用痛点。社区唯一可见反馈是账号停用申诉，涉及内置模型访问受限，尚不能视为已确认的软件缺陷。整体呈现小步改进态势，但数据不足以评估响应效率和长期项目健康度。[PR #3111](https://github.com/netease-youdao/LobsterAI/pull/3111) · [PR #3110](https://github.com/netease-youdao/LobsterAI/pull/3110) · [PR #3109](https://github.com/netease-youdao/LobsterAI/pull/3109) · [Issue #3112](https://github.com/netease-youdao/LobsterAI/issues/3112)

## 2. 项目进展

### 已关闭：账号菜单增加服务端配置入口
[PR #3111 — feat(account-menu): add server-configured more links](https://github.com/netease-youdao/LobsterAI/pull/3111)

- 在个人账号菜单中增加常驻“更多”入口，支持服务端配置 HTTPS 链接和一级分组子菜单。
- 包含预取、缓存、每次打开时刷新，以及本地化标签、加载态和空状态。
- **推进意义**：为客户端提供更灵活的导航入口，减少此类入口调整对客户端发版的依赖。
- **状态边界**：已关闭，未提供合并记录，不能认定已交付。

### 已关闭：模型选择器展示自定义标签
[PR #3110 — feat(models): show server-configured custom tags in model selector](https://github.com/netease-youdao/LobsterAI/pull/3110)

- 展示服务端配置的模型标签，支持可选图标和颜色。
- 调整标签与现有徽标的排列，保持费用、状态列对齐。
- **推进意义**：增强模型信息表达与选择界面的可读性，属于渐进式体验优化。
- **状态边界**：已关闭，是否合并及何时发布尚不明确。

### 待合并：Windows 文件预览兼容性修复
[PR #3109 — fix(artifacts): support CSV encodings and in-app Windows links](https://github.com/netease-youdao/LobsterAI/pull/3109)

- 修复 Windows 下 GBK CSV 中文预览乱码。
- 将正文中的 Windows 本地文件链接导向应用内预览，避免误用系统打开方式。
- 为 CSV/TSV 增加编码自动识别和手动切换，且预览不写回原文件。
- **推进意义**：直接改善中文表格与本地文件工作流；目前仍处于待合并阶段，不能视为已解决。

**整体判断**：本期可见进展以界面增强和兼容性修补为主，尚无足够证据表明发生了重大能力升级或完成了新版本交付。

## 3. 社区热点

### 账号停用申诉是唯一可见讨论点
[Issue #3112 — 账号被禁用，申请解封](https://github.com/netease-youdao/LobsterAI/issues/3112)

- **互动数据**：1 条评论、0 个 👍，是本期唯一提供有效评论数的条目。
- **用户报告**：调用内置模型接口返回 HTTP 403、业务码 `40302`，账号状态为 `DISABLED`。
- **背景**：用户自述曾使用本机第三方脚本定时调用内置模型接口完成签到，并请求恢复账号服务。
- **背后诉求**：除恢复访问外，也反映出自动化使用边界、账号限制说明和申诉流程透明度的重要性。

**热度限制**：3 条 PR 的评论数均缺失，不能按零评论处理，也无法据此进行完整的讨论热度排名。当前没有证据表明存在高热度社区议题。

## 4. Bug 与稳定性

以下按**单用户影响程度**排序；现有数据不足以判断影响范围。

| 优先级 | 问题与影响 | 性质及当前状态 | Fix PR |
|---|---|---|---|
| 高：服务访问受阻 | 账号停用导致内置模型调用失败 | 属于账号访问限制报告，**未确认是软件 Bug**；申诉仍开放 | 未见关联修复 PR。[Issue #3112](https://github.com/netease-youdao/LobsterAI/issues/3112) |
| 中：内容可读性受损 | Windows 下 GBK CSV 中文乱码，影响表格预览 | PR 描述引用了用户反馈，暂无关联 Issue 编号 | 已有待合并修复：[PR #3109](https://github.com/netease-youdao/LobsterAI/pull/3109) |
| 中：文件工作流异常 | 正文中的 Windows 本地路径链接误调用系统打开方式 | 预期改为应用内预览 | 已有待合并修复：[PR #3109](https://github.com/netease-youdao/LobsterAI/pull/3109) |

本期未提供崩溃、数据丢失或已确认回归的报告；这不等同于不存在相关问题。

## 5. 功能请求与路线图信号

本期没有独立的新功能请求 Issue，主要信号来自已有 PR：

- **服务端驱动的界面配置正在增强**：账号菜单链接与模型标签均由服务端配置，显示客户端正增强动态展示能力。但两条 PR 只有关闭状态，进入下一版本的可能性仍需合并记录支持。[PR #3111](https://github.com/netease-youdao/LobsterAI/pull/3111) · [PR #3110](https://github.com/netease-youdao/LobsterAI/pull/3110)
- **Windows 与中文文件兼容性是明确候选方向**：CSV/TSV 编码识别、手动切换和本地链接预览已有开放修复 PR，是较具体的后续交付候选，但没有发布时间承诺。[PR #3109](https://github.com/netease-youdao/LobsterAI/pull/3109)
- **账号规则说明值得完善**：停用申诉提示可考虑加强第三方自动化使用边界和申诉指引；这是分析建议，并非已确认的产品计划。[Issue #3112](https://github.com/netease-youdao/LobsterAI/issues/3112)

## 6. 用户反馈摘要

> 数据仅包含 Issue 正文摘要及评论数量，未提供评论正文，因此不能声称已提炼评论观点或维护者回复。

- **自动化便利性诉求**：用户希望减少多账号切换，通过本机脚本完成重复操作；账号停用后，主要痛点是内置模型访问中断。用户对行为目的的说明属于其自述，不能替代项目方审核结论。[Issue #3112](https://github.com/netease-youdao/LobsterAI/issues/3112)
- **中文表格处理痛点**：PR 引用的用户反馈指出，相同内容的 GBK CSV 在 Windows 11 下乱码，而 UTF-8 文件正常，说明非 UTF-8 文件兼容性会直接影响预览可用性。[PR #3109](https://github.com/netease-youdao/LobsterAI/pull/3109)
- **满意度信息不足**：当前没有可核实的修复后反馈、正向评价或申诉处理结果，不宜推断用户满意度变化。[Issue #3112](https://github.com/netease-youdao/LobsterAI/issues/3112) · [PR #3109](https://github.com/netease-youdao/LobsterAI/pull/3109)

## 7. 待处理积压与维护提醒

**本期无法识别“长期未响应”积压**：提供的条目均创建于 11 月 17—18 日，且缺少历史响应记录。可关注以下近期待办：

| 待办 | 建议关注点 | 链接 |
|---|---|---|
| 账号停用申诉 | 明确处理进度与申诉路径；避免公开收集更多敏感账号材料 | [Issue #3112](https://github.com/netease-youdao/LobsterAI/issues/3112) |
| Windows 预览修复 | 审查编码识别、手动切换、本地路径解析及“不写回原文件”的测试覆盖 | [PR #3109](https://github.com/netease-youdao/LobsterAI/pull/3109) |
| 已关闭功能 PR | 核实关闭原因、是否合并及目标版本，避免将关闭误报为交付 | [PR #3111](https://github.com/netease-youdao/LobsterAI/pull/3111) · [PR #3110](https://github.com/netease-youdao/LobsterAI/pull/3110) |

**健康度结论**：可见维护活动仍在持续，并有面向真实使用痛点的修复工作；但本期样本较少、合并状态和评论内容不完整，暂不宜对整体维护效率或积压健康度作更强判断。

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
**日期：2026-11-18｜统计窗口：所提供的过去 24 小时数据**

> **数据口径**：项目按 CoPaw 报道，但所提供的条目均指向 `agentscope-ai/QwenPaw`，以下链接沿用数据中的仓库归属。PR 仅提供 OPEN/CLOSED 状态，无法确认 CLOSED 是否代表已合并；Issue 评论正文、PR 评论数未提供，因此不推断评论内容或讨论热度。

## 1. 今日速览

过去 24 小时共有 **3 条 Issue 更新、12 条 PR 更新**，其中 **9 条 PR 待合并、3 条已关闭**，未提供新 Release，项目开发活动较活跃。工作重点集中在 **发布链路、模型配额容错、多智能体任务校验，以及移动端与审批交互体验**，整体偏向稳定性补强。功能侧最显著的信号是通过共享 Platform Web App 访问本地工作区，以及改进 worker–advisor 协作，但均仍处于待合并阶段。当前健康度可概括为：**修复响应积极、功能演进持续，但发布落地和复杂改动的验证结果仍需跟踪**。  
相关：[批量任务校验 #8792](https://github.com/agentscope-ai/QwenPaw/pull/8792) · [Web App 访问本地工作区 #8793](https://github.com/agentscope-ai/QwenPaw/pull/8793) · [发布修复 #8801](https://github.com/agentscope-ai/QwenPaw/pull/8801)

## 2. 项目进展

### 已关闭的重要 PR

| PR | 涉及进展 | 状态与解读 |
|---|---|---|
| [#8799：防止技能池删除点击打开详情](https://github.com/agentscope-ai/QwenPaw/pull/8799) | 修正删除操作与详情打开之间的交互冲突 | 已关闭；若已合并，将减少误触，但数据未确认合并结果 |
| [#8795：下调渠道最低版本至 `2.3.0.post1`](https://github.com/agentscope-ai/QwenPaw/pull/8795) | 调整渠道兼容性门槛 | 已关闭；需核实实际生效范围 |
| [#8794：版本号调整至 `2.3.0.post1`](https://github.com/agentscope-ai/QwenPaw/pull/8794) | 推进版本元数据维护 | 已关闭；**不能据此认定已有新 Release** |

**整体推进判断：**已关闭条目以小规模维护和体验修正为主；更具影响力的功能与稳定性改动仍在开放 PR 中。因此，今日体现出持续迭代，但不能将待合并能力计入已交付成果。

## 3. 社区热点

### 可确认的讨论焦点

- **模型额度耗尽导致使用受阻**：[#8798](https://github.com/agentscope-ai/QwenPaw/issues/8798) 有 **3 条评论**，是已提供 Issue 中评论最多的一条，目前已关闭。用户报告 `kilo-auto/free` 返回 `MODEL_QUOTA_EXCEEDED`，并表达明显不满。背后的诉求是任务连续性、额度提示清晰度及失败后的恢复路径；关闭本身不代表根因已解决。
- **移动端顶部内容被系统状态栏遮挡**：[#8796](https://github.com/agentscope-ai/QwenPaw/issues/8796) 有 **1 条评论**。报告指出此前适配覆盖了底部安全区，但顶部仍缺失，反映出移动控制台需要完整的安全区处理。
- **批量子智能体任务应先全部校验再派发**：[#8789](https://github.com/agentscope-ai/QwenPaw/issues/8789) 有 **1 条评论**。诉求不仅是拒绝非法参数，还包括避免失败批次产生部分执行副作用。

**热度限制：**所列条目均为 0 个 👍，PR 评论数缺失，无法建立可靠的 PR 讨论榜；上述热点仅按已知 Issue 评论数及问题影响归纳。

## 4. Bug 与稳定性

以下按潜在影响排序，**不等同于维护者正式严重性评级**。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **高** | **无效批量任务可能先触发同批子智能体执行**：预检将任务转为字符串判断，但派发原值，导致 `null`、数字等非法值漏检，可能产生部分派发或 fork 副作用。[Issue #8789](https://github.com/agentscope-ai/QwenPaw/issues/8789) | 已有开放修复 [#8792](https://github.com/agentscope-ai/QwenPaw/pull/8792)，要求派发前校验任务为非空字符串 |
| **高** | **模型配额错误造成任务阻断**：用户报告额度耗尽；另有 PR 指出部分供应商用 HTTP 400 返回配额/限流错误，导致跨模型回退失效。[Issue #8798](https://github.com/agentscope-ai/QwenPaw/issues/8798) | Issue 已关闭；相关容错 PR [#8788](https://github.com/agentscope-ai/QwenPaw/pull/8788) 开放中，但不能确认覆盖该用户案例 |
| **中高** | **渠道诊断日志缺失**：官方渠道隔离到 worker 后，多类 SDK 与项目诊断日志未到达终端及日志文件，削弱故障定位能力 | 修复 [#8790](https://github.com/agentscope-ai/QwenPaw/pull/8790) 开放中，覆盖 18 个官方渠道插件及 Console、channel host |
| **中高** | **审批文案与实际授权范围不清晰**：会话范围规则可能被描述为“仅一次”或“始终允许”，失败、过期提交也可能丢失上下文或反馈失真 | 修复 [#8791](https://github.com/agentscope-ai/QwenPaw/pull/8791) 开放中；需重点验证文案与真实权限语义一致 |
| **中** | **发布构件校验受阻**：CloudPaw 文档变更使 ZIP 与已发布 `0.0.4` 构件不一致；PR 标题还涉及 Docker 构建与空聊天处理，但摘要未展开后两者细节 | [#8801](https://github.com/agentscope-ai/QwenPaw/pull/8801) 开放中，提出暂时回退文档变更并复用已发布构件 |
| **中** | **移动端顶部安全区缺失**：全屏控制台内容被状态栏遮挡，报告将其追溯到引入 `viewport-fit=cover` 的改动。[Issue #8796](https://github.com/agentscope-ai/QwenPaw/issues/8796) | 当前数据中未见对应 fix PR |

## 5. 功能请求与路线图信号

- **本地助手向跨端访问延伸**：[#8793](https://github.com/agentscope-ai/QwenPaw/pull/8793) 拟支持从 Console 连接云账户、手机扫码登录，并在云端与已连接工作区之间切换。该 PR 标记为 XXXL，属于显著功能扩展；进入后续版本值得期待，但审查、身份认证与跨版本兼容验证成本较高。
- **提高 worker–advisor 协作质量**：[#8797](https://github.com/agentscope-ai/QwenPaw/pull/8797) 将 worker 当前系统指令带入 advisor 请求，并让建议更依赖已有证据，意在减少脱离实际约束或证据不足的建议。摘要称其为草案，短期交付时间仍不确定。
- **完善插件主题扩展**：[#8787](https://github.com/agentscope-ai/QwenPaw/pull/8787) 在已有六类基础颜色角色上进一步暴露语义颜色，回应插件主题定制需求，体现插件生态接口继续完善。
- **优化插件发布基础设施**：[#8800](https://github.com/agentscope-ai/QwenPaw/pull/8800) 标题指向版本化 OSS bucket 发布支持，但正文仍为模板，暂不足以判断实现范围和成熟度。

**下一版本判断：**批量任务校验、配额回退及发布修复等边界明确的改动，更适合作为近期稳定性更新候选；大型 Web App 接入能力不宜仅凭开放 PR 推断将在下一版本发布。

## 6. 用户反馈摘要

由于未提供评论正文，以下仅提炼 **Issue 描述中的直接反馈**，不将推测写成社区共识。

- **可用性痛点：免费模型额度成为任务阻断点。** [#8798](https://github.com/agentscope-ai/QwenPaw/issues/8798) 的用户多次遭遇配额错误并明显不满，提示产品需要更清晰地区分供应商额度限制与应用故障。
- **移动场景：手机上的完整显示仍有缺口。** [#8796](https://github.com/agentscope-ai/QwenPaw/issues/8796) 表明顶部安全区问题已影响控制台内容可见性，而不仅是视觉细节。
- **多智能体场景：用户期待批次校验具有一致性。** [#8789](https://github.com/agentscope-ai/QwenPaw/issues/8789) 给出具体复现，强调错误输入不应导致其他任务先被执行。

本批数据没有明确的正向满意度反馈，不能据此评估整体用户满意度。

## 7. 待处理积压与维护提醒

**无法识别长期积压：**所列条目均创建于 11 月 17—18 日，缺少更长历史及维护者响应记录，不能认定任何条目“长期未响应”。当前建议关注：

1. **补齐移动端回归修复闭环**：[#8796](https://github.com/agentscope-ai/QwenPaw/issues/8796) 尚无已知对应 PR，建议补充顶部/底部安全区及虚拟键盘组合测试。
2. **优先审查任务派发前校验**：[#8792](https://github.com/agentscope-ai/QwenPaw/pull/8792) 应验证非法类型、空白任务及混合批次，并确认失败前没有派发副作用。
3. **对大型改动实施针对性验证**：Web App 接入 [#8793](https://github.com/agentscope-ai/QwenPaw/pull/8793)、渠道日志恢复 [#8790](https://github.com/agentscope-ai/QwenPaw/pull/8790)、审批交互 [#8791](https://github.com/agentscope-ai/QwenPaw/pull/8791) 的变更规模较大，应分别关注访问隔离、日志敏感信息与授权语义。
4. **补充发布 PR 的验收信息**：[#8800](https://github.com/agentscope-ai/QwenPaw/pull/8800) 缺少有效说明；[#8801](https://github.com/agentscope-ai/QwenPaw/pull/8801) 采用临时回退方案，建议明确后续恢复条件及构件一致性验证结果。

**结论：今日项目呈现“开发活跃、稳定性优先、跨端能力扩展”的态势。下一观察重点应是开放修复是否合并并完成验证，而非仅看 PR 数量增长。**

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：2026-11-18**  
**项目：[zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)**

## 1. 今日速览

过去 24 小时，ZeroClaw 有 **8 条 Issue、23 条 PR 更新**，但没有 Issue 关闭、PR 合并/关闭或新版本发布，呈现出“提交活跃、交付尚未兑现”的状态。工作重点集中在 Anthropic 对话兼容性、记忆保存、定时任务调度，以及依赖安全与 CI 稳定性。最值得优先关注的是 supervised SOP 可能绕过审批的 **S0 安全风险**，以及已导致 Security 检查失败的依赖维护告警。整体来看，修复供给较充足，但多个修复及高风险行为变更仍等待评审，不能视为已经解决或上线。  
相关：[SOP 审批风险 #12514](https://github.com/zeroclaw-labs/zeroclaw/issues/12514) · [依赖处理 PR #12516](https://github.com/zeroclaw-labs/zeroclaw/pull/12516)

> **数据口径：**23 条 PR 更新中仅提供了 20 条详情，且评论数均为 `undefined`；Issue 评论正文未提供。因此，下文不推断 PR 讨论热度，也不将问题描述改写为评论中的用户评价。今日无新版本，省略版本发布章节。

## 2. 项目进展

### 已交付进展：本期没有合并或关闭记录

本期没有可确认已进入主分支的功能或修复。以下均是 **待合并工作**，体现修复方向，而非已完成成果。

| 方向 | 待合并进展 | 预期价值 |
|---|---|---|
| 模型兼容性 | [#12509](https://github.com/zeroclaw-labs/zeroclaw/pull/12509) 拟在 Anthropic 历史重放时过滤无签名 thinking 块 | 避免请求持续遭遇 400 错误、重试无效 |
| 记忆完整性 | [#12503](https://github.com/zeroclaw-labs/zeroclaw/pull/12503)、[#12508](https://github.com/zeroclaw-labs/zeroclaw/pull/12508) 均针对自动保存固定键导致的覆盖问题 | 保留独立用户消息；两项方案存在重叠，需要协调 |
| 调度可靠性 | [#12511](https://github.com/zeroclaw-labs/zeroclaw/pull/12511) 拟让任务运行期间调度器继续轮询 | 减少慢任务拖延其他 cron 任务的情况 |
| 上下文一致性 | [#12506](https://github.com/zeroclaw-labs/zeroclaw/pull/12506) 拟统一预算估算和最终摘要使用的折叠历史视图 | 降低估算上下文与实际发送内容不一致的风险 |
| 消息投递 | [#12502](https://github.com/zeroclaw-labs/zeroclaw/pull/12502) 阻止经禁用渠道投递；[#12528](https://github.com/zeroclaw-labs/zeroclaw/pull/12528) 将原生投票纳入同一收件人的发送队列 | 加强渠道配置约束与发送节奏一致性 |
| CI 与平台支持 | [#12524](https://github.com/zeroclaw-labs/zeroclaw/pull/12524) 隔离测试 composition consumer；[#12526](https://github.com/zeroclaw-labs/zeroclaw/pull/12526) 保留 Windows 文件重命名错误码 | 改善特性隔离验证和 Windows 恢复路径可靠性 |

**进展判断：**本期主要是在为稳定性补齐修复与回归测试，尚无可量化的合并交付增量。

## 3. 社区热点

可见 Issue 中，只有两条各有 **1 条评论**，其余均为 0；所有已展示条目的 👍 均为 0，尚未形成高互动热点。

- **依赖维护与安全门禁：[#12505](https://github.com/zeroclaw-labs/zeroclaw/issues/12505)**  
  `chrono`、`chrono-tz` 被标记为无人维护，且 `cargo-deny` 没有提供安全升级路径。背后诉求是兼顾短期 CI 恢复与长期依赖替换，不能仅靠接受告警结束处理。对应 [PR #12516](https://github.com/zeroclaw-labs/zeroclaw/pull/12516) 正尝试处理当前门禁问题。

- **Anthropic 多轮调用失败：[#12504](https://github.com/zeroclaw-labs/zeroclaw/issues/12504)**  
  无签名 thinking 块被重新发送后，API 返回 `signature: Field required`。用户需要的是对话历史、工具调用与重试流程的完整兼容性，而不只是单次请求成功。已有 [修复 PR #12509](https://github.com/zeroclaw-labs/zeroclaw/pull/12509)，但尚未合并。

**热度解读：**当前更像维护者驱动的缺陷治理窗口，而不是由大量用户投票推动的功能扩张期。

## 4. Bug 与稳定性

以下按已标注严重程度及潜在影响排序；未给出级别的项目不额外赋予官方严重性。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **最高：S0 / 安全风险** | supervised SOP 的第一步若由 `decide` 回答“否”而跳过，可能同时绕过唯一的 SOP 级审批门。[Issue #12514](https://github.com/zeroclaw-labs/zeroclaw/issues/12514) | **所给数据未见对应 fix PR**，应优先确认后续步骤的执行边界 |
| **高：构建与供应链风险** | `chrono`、`chrono-tz` 维护状态告警导致 Security 检查失败；另有 `zip` 安全公告需处理。[Issue #12505](https://github.com/zeroclaw-labs/zeroclaw/issues/12505) | [PR #12516](https://github.com/zeroclaw-labs/zeroclaw/pull/12516) 拟更新 `zip` 并接受两项维护告警；长期替换仍待跟踪 |
| **S2：核心调用受阻** | Anthropic 历史重放携带无签名 thinking 块，导致请求和重试失败。[Issue #12504](https://github.com/zeroclaw-labs/zeroclaw/issues/12504) | 已有 [PR #12509](https://github.com/zeroclaw-labs/zeroclaw/pull/12509)，待合并 |
| **数据完整性，未标级** | 自动保存使用固定 `user_msg` 键，后续消息可能覆盖此前消息。[PR #12503](https://github.com/zeroclaw-labs/zeroclaw/pull/12503) | 两个待合并修复：[#12503](https://github.com/zeroclaw-labs/zeroclaw/pull/12503)、[#12508](https://github.com/zeroclaw-labs/zeroclaw/pull/12508) |
| **调度可靠性，未标级** | 调度器等待整批任务完成才继续轮询，慢任务拖延其他到期任务。[PR #12511](https://github.com/zeroclaw-labs/zeroclaw/pull/12511) | 已有 fix PR，待合并 |
| **S3：界面问题** | Web 聊天重载后显示运行时日期前缀及合成时间戳，偏离原始输入和保存时间。[Issue #12507](https://github.com/zeroclaw-labs/zeroclaw/issues/12507) | 已有 [PR #12515](https://github.com/zeroclaw-labs/zeroclaw/pull/12515)，待合并 |

此外，[Issue #12520](https://github.com/zeroclaw-labs/zeroclaw/issues/12520) 要求验证显式上下文重载与带签名 thinking 历史的组合路径。这是与 Anthropic 修复相关的验证缺口，不能仅因过滤无签名块就判断整个历史恢复链路已可靠。

## 5. 功能请求与路线图信号

本期没有明显的高互动新增功能诉求，更多是维护跟进、行为调整和架构收敛。

- **v0.9.1 候选偏向稳定性。**依赖处理 [#12516](https://github.com/zeroclaw-labs/zeroclaw/pull/12516)、cron 修复 [#12511](https://github.com/zeroclaw-labs/zeroclaw/pull/12511)、Windows 测试调整 [#12510](https://github.com/zeroclaw-labs/zeroclaw/pull/12510) 均带有 `release:v0.9.1` 标签。这是版本候选信号，而非发布承诺。

- **记忆后端拟做破坏性收敛。**[PR #12521](https://github.com/zeroclaw-labs/zeroclaw/pull/12521) 拟移除 Lucid 后端及配置、CLI、Quickstart、网关等入口，并带有破坏性变更标记。若推进，需明确现有用户的后端迁移与数据保留方案；目前尚未合并。

- **费用控制拟改为显式配置。**[PR #12512](https://github.com/zeroclaw-labs/zeroclaw/pull/12512) 拟取消默认美元日/月限额，仅在运营者设置时启用。这会改变未显式配置用户的预算保护预期，应重点审查默认值和文档。

- **原生 SSH 替代仍受条件约束。**[Issue #12518](https://github.com/zeroclaw-labs/zeroclaw/issues/12518) 将 Python SSH helper 的退役绑定于原生 broker 功能对等与迁移验证；扩展凭据能力则由 [PR #12517](https://github.com/zeroclaw-labs/zeroclaw/pull/12517) 暂存，等待 RFC 12422，不能视为已确定交付范围。

## 6. 用户反馈摘要

**由于未提供评论正文，以下仅归纳 Issue 报告所呈现的真实使用痛点，不作满意度判断。**

- **依赖长对话与工具调用的用户，首先需要会话可持续。**Anthropic 重放失败会让重试失去作用，直接中断代理工作流。[#12504](https://github.com/zeroclaw-labs/zeroclaw/issues/12504)
- **Web 用户需要可信的历史记录。**离开聊天页再返回后，运行时前缀和不准确的显示时间使记录偏离原始交互。[#12507](https://github.com/zeroclaw-labs/zeroclaw/issues/12507)
- **受监督自动化场景需要不可绕过的人工确认。**首步分支选择不应意外消除流程级审批保障。[#12514](https://github.com/zeroclaw-labs/zeroclaw/issues/12514)
- **维护者需要可执行的安全升级路线。**依赖没有可用安全升级时，单纯阻断构建与永久忽略告警都不是完整解决方案。[#12505](https://github.com/zeroclaw-labs/zeroclaw/issues/12505)

## 7. 待处理积压与维护提醒

本批条目均创建于 **11 月 17—18 日**，无法据此识别“长期未响应”积压。以下是应尽快跟进的风险项，而非已证实的长期滞留事项。

1. **先为 S0 审批问题建立修复闭环。**明确影响范围、临时规避方式，并覆盖“首步被跳过、后续步骤继续”的回归场景。[#12514](https://github.com/zeroclaw-labs/zeroclaw/issues/12514)
2. **协调重复的自动保存修复。**两项 PR 指向同一覆盖问题，应统一实现和测试，避免重复评审与合并冲突。[#12503](https://github.com/zeroclaw-labs/zeroclaw/pull/12503) · [#12508](https://github.com/zeroclaw-labs/zeroclaw/pull/12508)
3. **跟踪被阻塞的 SOP 路由验证。**忽略决策答案时，`switch` 路由的实际语义、日志和文档仍需对齐。[#12513](https://github.com/zeroclaw-labs/zeroclaw/issues/12513)
4. **发布后及时补齐镜像扫描。**`dist-broad` 首次发布后应加入每周 Trivy 扫描矩阵，避免新增分发变体落在扫描范围之外。[#12523](https://github.com/zeroclaw-labs/zeroclaw/issues/12523)
5. **将短期告警接受与长期依赖替换分开验收。**恢复 CI 不代表 `chrono`、`chrono-tz` 的维护风险已经消除。[#12505](https://github.com/zeroclaw-labs/zeroclaw/issues/12505) · [#12516](https://github.com/zeroclaw-labs/zeroclaw/pull/12516)

**总体健康度判断：开发响应积极，修复方向清晰；主要短板是高风险问题尚未闭环、当日无合并交付。下一观察点应是 S0 审批风险是否进入修复，以及现有稳定性 PR 能否完成验证并合并。**

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*