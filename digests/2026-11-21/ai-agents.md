# OpenClaw 生态日报 2026-11-21

> Issues: 61 | PRs: 68 | 覆盖项目: 13 个 | 生成时间: 2026-11-21 02:59 UTC

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
**日期：2026-11-21｜统计窗口：过去 24 小时**

> 数据口径：共 61 条 Issue 更新、68 条 PR 更新；明细仅覆盖其中 50 条 Issue 和 30 条 PR。PR 的 `CLOSED` 状态不等同于已合并，且本批 PR 评论数为 `undefined`，因此无法准确排名 PR 讨论热度。以下用户反馈基于报告正文摘要，不代表已读取完整评论。

## 1. 今日速览

OpenClaw 今日保持**高活跃度**：61 条 Issue 更新中，50 条新开或活跃、11 条关闭；68 条 PR 更新中，50 条待合并、18 条已合并或关闭。开发重点集中在 **Gateway／沙箱可靠性、消息附件投递、升级恢复，以及移动端架构与测试去重**，代表性工作包括 [工作区清理不阻塞会话读写 #202874](https://github.com/openclaw/openclaw/pull/202874) 和 [Telegram 附件代理归属修复 #202868](https://github.com/openclaw/openclaw/pull/202868)。当日无新版本发布，多项重要修复仍在审阅或补充验证阶段，尚不能视为已向用户交付。整体健康度表现为**贡献活跃、问题定位较具体，但高优先级稳定性问题和待审队列仍需关注**，例如 [升级回滚后的 SQLite 锁冲突 #202772](https://github.com/openclaw/openclaw/issues/202772)。

## 2. 项目进展

### 已关闭的重要工作

本批明细中，以下 PR 已关闭，但缺少合并标记；应将其视为处理进展，而非确认进入主分支或发布版本。

| 工作 | 推进内容 | 状态与判断 |
|---|---|---|
| [#202824：修正 npx onboarding 后续命令](https://github.com/openclaw/openclaw/pull/202824) | 针对未全局安装 CLI 的试用用户，避免引导输出无法执行的裸 `openclaw` 命令 | PR 与关联 [Issue #202822](https://github.com/openclaw/openclaw/issues/202822) 均关闭；标记 P0，直接影响首次使用体验 |
| [#202573：隐藏过期认证冷却窗口](https://github.com/openclaw/openclaw/pull/202573) | 避免 `models auth list` 将已过期的冷却／禁用状态展示为仍有效 | PR 已关闭，有助于减少认证状态排查误导；是否合并待确认 |
| [#202879：收回工作区链接辅助函数导出](https://github.com/openclaw/openclaw/pull/202879) | 处理依赖检查中的无用导出，收紧内部实现边界 | PR 已关闭；类似目标的 [#202875](https://github.com/openclaw/openclaw/pull/202875) 仍开放，需确认最终采用路径 |

此外，[SQLite worker 中途死亡后会话拒绝发送 #202366](https://github.com/openclaw/openclaw/issues/202366)、[PostgreSQL 向量索引维度校验 #202761](https://github.com/openclaw/openclaw/issues/202761) 等 Issue 已关闭，但给定数据不足以确认关闭原因或对应修复是否已落地。

### 尚未落地、但值得关注的推进

- **会话与工作区可靠性**：[PR #202874](https://github.com/openclaw/openclaw/pull/202874) 试图隔离递归文件删除造成的 I/O 阻塞，避免清理工作区拖慢无关会话；[PR #202803](https://github.com/openclaw/openclaw/pull/202803) 减少首次沙箱发送的重复扫描。两者均待维护者审阅。
- **沙箱资源保护**：[PR #202815](https://github.com/openclaw/openclaw/pull/202815) 修复 Git wrapper 被转发 shim 递归调用、耗尽进程与内存的问题，已有充分验证标记，但仍涉及兼容性和安全敏感变更。
- **移动端维护性**：[iOS 唤醒词复用 #202856](https://github.com/openclaw/openclaw/pull/202856)、[Talk 配置测试共享 #202890](https://github.com/openclaw/openclaw/pull/202890)、[Android 模型策略解耦 #202870](https://github.com/openclaw/openclaw/pull/202870) 主要减少重复实现和测试，不应解读为新增用户功能。

**进度判断：**今日呈现出多项具体修复和系统性维护工作的推进，但缺少明确合并明细、且没有新发布，无法量化实际交付增量。

## 3. 社区热点

已展示 Issue 的讨论规模较小：最高 4 条评论，所有已列条目的 👍 均为 0，尚无广泛共识型热点。

| 热点 | 可见热度 | 背后的诉求 |
|---|---:|---|
| [#202741：Telegram 附件在 GUI 可见但未送达](https://github.com/openclaw/openclaw/issues/202741) | 4 评论，最高 | 用户需要“界面显示成功”与“外部渠道实际送达”保持一致，尤其是压缩包等文件交付 |
| [#202672：MiniMax-M3.1-Flash 工具参数间歇性被拒](https://github.com/openclaw/openclaw/issues/202672) | 3 评论 | 模型兼容性必须覆盖完整工具调用链，而不只是文本生成；当前仍需现场复现 |
| [#202366：SQLite worker 故障后会话无法继续发送](https://github.com/openclaw/openclaw/issues/202366) | 2 评论，已关闭 | 底层存储故障不应让会话持续处于不可恢复状态 |
| [#202499：原生 Codex 自动化更新被权限错误拒绝](https://github.com/openclaw/openclaw/issues/202499) | 2 评论，已关闭 | 已认证 owner 希望获得一致的权限判断及可操作的错误解释 |

PR 侧无法按评论数排名。按产品与风险影响，[工作区显式恢复 #202800](https://github.com/openclaw/openclaw/pull/202800) 值得关注：方案已从自动恢复调整为显式恢复，反映出对工作区生命周期和用户知情控制的重视。

## 4. Bug 与稳定性

以下按数据中的优先级排序；窗口内同时包含新报告和前一日持续活跃的问题。“未见 fix PR”仅指所提供数据中未出现。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **P0** | [#202822：npx 引导输出不可执行命令](https://github.com/openclaw/openclaw/issues/202822)，阻断未安装 CLI 用户继续设置 | [PR #202824](https://github.com/openclaw/openclaw/pull/202824) 已关闭；合并状态未确认 |
| **P1** | [#202794：多代理 Gateway 发送媒体失败](https://github.com/openclaw/openclaw/issues/202794)，文本可发送但附件触发 `AgentSelectionRequiredError` | [PR #202868](https://github.com/openclaw/openclaw/pull/202868) 开放，标记需补充验证 |
| **P1** | [#202772：升级回滚恢复 SQLite DELETE 模式](https://github.com/openclaw/openclaw/issues/202772)，导致下次更新 Doctor 遇到 `sqlite-busy` | 修复方向清晰、可排队；未见对应 fix PR |
| **P1** | [#202672：MiniMax 工具参数终端校验失败](https://github.com/openclaw/openclaw/issues/202672)，间歇性中断工具调用 | 待维护者审阅与现场复现；未见 fix PR |
| **P1（PR 标记）** | [#202878：有界面 Chrome 新标签页截图挂起](https://github.com/openclaw/openclaw/pull/202878)，后台标签页不绘制使截图无法完成 | 修复 PR 开放，已有充分验证，待维护者审阅 |
| **P2** | [#202741：Telegram 原生回合附件未送达](https://github.com/openclaw/openclaw/issues/202741)，GUI 附件卡片不能代表外部送达 | 待补充信息与审阅；未见明确关联 fix PR，不宜与 #202794 混为同一问题 |
| **P2** | [#202802：SQLite 同步打开失败泄漏客户端及输入](https://github.com/openclaw/openclaw/issues/202802)，报告涉及夜间记忆任务实际完成失败 | 已有源码级复现，修复方向清晰；未见 fix PR |
| **P2** | [#202830：增加 manifest 后插件不再随 Gateway 启动](https://github.com/openclaw/openclaw/issues/202830)，影响仅注册 hooks 的插件 | 标记存在开放关联 PR，但明细未给出编号；需安全审阅 |

另有 [Windows package-update 失败 #202888](https://github.com/openclaw/openclaw/issues/202888) 与 [Linux candidate-doctor 失败 #202811](https://github.com/openclaw/openclaw/issues/202811)，尚不足以确定根因或判断是否同一回归。

## 5. 功能请求与路线图信号

### 已有实现 PR：具备近期进入版本的可能，但并非承诺

- **WhatsApp 联系人自助管理私人提醒**：[Issue #202884](https://github.com/openclaw/openclaw/issues/202884) 已有 [PR #202880](https://github.com/openclaw/openclaw/pull/202880)。目标是在不授予 owner 权限的前提下允许联系人管理自己的提醒，是共享个人助手场景的重要权限细分；仍需产品决策与安全审阅。
- **ChatGPT 登录使用 GPT-Live-1.1 实时语音**：[Issue #202806](https://github.com/openclaw/openclaw/issues/202806) 标记已有开放关联 PR。需求明确覆盖 Talk 和 Discord，但给定 PR 明细未提供对应编号，不能判断成熟度。

### 仍处于需求或产品决策阶段

- **自动化运维能力**：[按完成状态筛选 #202820](https://github.com/openclaw/openclaw/issues/202820)、[按时间窗口筛选 #202804](https://github.com/openclaw/openclaw/issues/202804)、[保留失败条件脚本日志 #202853](https://github.com/openclaw/openclaw/issues/202853)，共同指向“可排障、可审计”的自动化系统。
- **自动化推理选择一致性**：[Issue #202699](https://github.com/openclaw/openclaw/issues/202699) 希望未显式固定模型的定时任务沿用会话或代理选择；涉及账号及权限边界，不能简单视为默认行为调整。
- **更可控的记忆迁移**：[Issue #202814](https://github.com/openclaw/openclaw/issues/202814) 希望选择 Claude Code 记忆集合，避免所有项目共同触发 2,000 文件上限。
- **原生渠道交互**：[Matrix 原生投票 #202873](https://github.com/openclaw/openclaw/issues/202873) 希望用可点击选项替代文本回退，尚待维护者及产品判断。

## 6. 用户反馈摘要

- **“生成成功”不等于“任务完成”。** [Telegram 附件问题 #202741](https://github.com/openclaw/openclaw/issues/202741) 与 [自动化完成状态筛选 #202820](https://github.com/openclaw/openclaw/issues/202820) 都反映出用户关注最终交付，而非仅模型执行成功。
- **无头运维需要更完整的 CLI。** [归档会话列表 #202787](https://github.com/openclaw/openclaw/issues/202787) 和 [备份内容清单 #202779](https://github.com/openclaw/openclaw/issues/202779) 面向 SSH 排查、保留审查和灾难恢复场景。
- **共享助手不能依靠过度授权实现便利。** [WhatsApp 私人提醒 #202884](https://github.com/openclaw/openclaw/issues/202884) 明确体现“允许联系人自助服务，但不开放全局管理权”的诉求。
- **静默失败损害可用性。** [个人头像上传无反馈 #202728](https://github.com/openclaw/openclaw/issues/202728) 与 [trusted-proxy 错误原因丢失 #202750](https://github.com/openclaw/openclaw/issues/202750) 表明，用户不仅需要功能恢复，也需要准确、可操作的错误信息。

本批数据没有明确的正向满意度评价，不宜以活跃贡献或零点赞推断用户满意程度。

## 7. 待处理积压与维护者关注

**无法确认长期积压：**所列条目主要创建于 11 月 20—21 日，缺少首次响应时间与完整历史。以下是建议优先跟踪的待处理项，而非认定为长期无人响应。

1. **优先处理高影响、修复路径已清晰的问题。** [SQLite 升级回滚 #202772](https://github.com/openclaw/openclaw/issues/202772) 为 P1 且已有源码复现；[SQLite 打开失败泄漏 #202802](https://github.com/openclaw/openclaw/issues/202802) 同样具备可排队修复条件。
2. **尽快完成高价值修复审阅。** [Chrome 截图 #202878](https://github.com/openclaw/openclaw/pull/202878) 和 [Git shim 递归 #202815](https://github.com/openclaw/openclaw/pull/202815) 均有充分验证标记，前者影响浏览器工具链，后者影响沙箱资源安全。
3. **补齐附件投递验证。** [PR #202868](https://github.com/openclaw/openclaw/pull/202868) 仍需证据；建议重点验证多代理、显式账号绑定及媒体暂存，避免仅凭文本发送成功判断修复有效。
4. **控制跨模块变更风险。** [工作区显式恢复 #202800](https://github.com/openclaw/openclaw/pull/202800) 为 XL、P1，并带兼容性及安全敏感标签，需确认交互、权限与恢复流程后再推进。
5. **持续澄清关闭与交付状态。** 对 [onboarding #202824](https://github.com/openclaw/openclaw/pull/202824) 等已关闭 PR，应明确最终采用方案及可用版本，避免用户误将关闭理解为已经获得修复。

**总体结论：**今日是以可靠性修复和内部治理为主的高活跃开发日。最值得关注的不是新增功能数量，而是消息送达、升级恢复、沙箱资源隔离这些核心链路能否完成验证、合并并进入后续发布。

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向分析
**日期：2026-11-21｜观察窗口：所提供的过去 24 小时动态**

> **口径说明：**Issue、PR 数均指窗口内更新条目，不等同于新增量或全仓库积压；`CLOSED` 不等同于已合并。部分项目明细不完整、PR 评论数缺失，因此下文区分开发活动、讨论热度和实际交付。NanoClaw、CoPaw 的明细分别指向 `nanocoai/nanoclaw`、`agentscope-ai/QwenPaw`，仓库归属需另行核验。

## 1. 生态全景

本次覆盖的 **13 个项目中，8 个有活动、5 个无窗口内活动**，合计记录 **139 条 Issue 更新、171 条 PR 更新和 3 个版本发布记录**。生态当日重心明显偏向可靠性与工程治理：消息是否实际送达、长任务能否恢复、配置是否安全保存，比新增模型或工具数量更突出。产品路线继续分化，既有 OpenClaw、Hermes 这样覆盖多渠道与复杂任务的综合型助手，也有强调凭据隔离的 NanoClaw，以及聚焦桌面创作体验的 LobsterAI。贡献供给较活跃，但多数关键补丁仍待审或缺少发布对应关系，**开发活跃尚不能直接转化为交付成熟度判断**。

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | Release 情况 | 当日健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | **61** | **68** | 无 | 活动量最高；稳定性问题定位具体，但 P0/P1 问题与待审修复需优先闭环 |
| **Hermes Agent** | **50** | **50** | 1 个 Canary：`v0.23.3+canary…` | 贡献覆盖广；长任务、数据保护及网关一致性仍承压 |
| **NanoClaw** | 10 | 11 | **`v2026.11.0` stable** | 稳定发布证据明确；渠道完整性、依赖与镜像交付仍需跟进 |
| **CoPaw** | 8 | 6 | 无 | 缺陷反馈与补丁推进积极；CLI、配置与进程治理尚未确认交付 |
| **ZeroClaw** | 8 | 12 | 无 | 清理与修复提案密集；安全补丁和破坏性变更均待审核 |
| **NanoBot** | 1 | 10 | 无 | WebUI 打磨集中；10 条 PR 均关闭但合并未知，且来自同一贡献者 |
| **Moltis** | 1 | 1 | 无 | 活动量低，成本控制与执行语义议题明确；方案仍开放 |
| **LobsterAI** | 0 | 13 | **`2026.11.20`** | 发布与引擎迁移并行；历史资产、工具能力恢复仍需核验版本覆盖 |
| PicoClaw | 0 | 0 | 无记录 | 单日无活动，无法据此判断长期健康度 |
| NullClaw | 0 | 0 | 无记录 | 同上 |
| IronClaw | 0 | 0 | 无记录 | 同上 |
| TinyClaw / TinyAGI | 0 | 0 | 无记录 | 同上 |
| ZeptoClaw | 0 | 0 | 无记录 | 同上 |
| **合计** | **139** | **171** | **3 个发布记录** | 交付证据与开发活动量应分开评价 |

**关键对比：**OpenClaw 与 Hermes 合计贡献 **111 条 Issue、118 条 PR 更新**，约占本批总量的 **80% 和 69%**，是当日最主要的活动中心；但明确的 stable 发布来自 NanoClaw，而非活动量最大的项目。

## 3. OpenClaw 在生态中的定位

### 优势：覆盖复杂个人助手场景的综合集成路线

OpenClaw 的当日工作横跨 Gateway、沙箱、存储、自动化、多渠道以及 iOS/Android，显示其关注的是**长期运行、多入口、多代理协作的个人助手系统**，而不只是对话界面或单一任务执行器。

相较其他活跃项目，其突出特点是：

- **渠道与执行基础设施覆盖广。** Telegram 附件、多代理媒体路由、浏览器截图和沙箱资源保护同时推进，涉及完整的“接收—执行—交付”链路。
- **复杂运行场景暴露充分。** SQLite 回滚、工作区恢复、进程递归和插件启动问题，说明维护压力已深入升级恢复、资源隔离与生命周期管理。
- **共享助手权限开始细化。** WhatsApp 联系人管理私人提醒的提案，试图在便利性与 owner 权限之间建立更细的授权边界。

### 技术路线差异

| 对比项目 | OpenClaw 的相对侧重 |
|---|---|
| **Hermes Agent** | 两者均偏综合型；OpenClaw 当日更聚焦 Gateway、沙箱和渠道投递，Hermes 更突出 Kanban/Goal 长任务、judge 控制与插件扩展 |
| **NanoClaw** | OpenClaw 展现更广的运行面；NanoClaw 的发布信息更明确强调按 agent 分配密钥及容器、依赖治理 |
| **NanoBot** | OpenClaw 偏运行基础设施，NanoBot 当日主要打磨 WebUI 与流式交互 |
| **LobsterAI** | OpenClaw 偏通用助手基础设施，LobsterAI 更强调桌面创作入口和 dsh 引擎下的产品体验 |

### 社区规模：活动领先，但不能推导用户规模领先

OpenClaw 的 **61 条 Issue、68 条 PR** 均为本批最高，体现较大的当日维护与贡献吞吐。然而，缺少独立贡献者数、活跃用户数、首次响应时间与合并周期，不能据此认定其社区人数、审查效率或用户满意度领先。其已展示 Issue 最高仅 **4 条评论**，更适合描述为“问题与补丁活动密集”，而非“讨论高度集中”。

**定位结论：**OpenClaw 是本批样本中最活跃的综合型助手基础设施项目之一；优势在覆盖面，代价是跨模块耦合、验证矩阵和升级风险更大。

## 4. 共同关注的技术方向

| 共同方向 | 涉及项目 | 具体诉求与共性 |
|---|---|---|
| **端到端消息可靠性** | OpenClaw、NanoClaw、NanoBot、CoPaw、ZeroClaw | 附件实际送达、断连补处理、线程归属、响应路由回收、引用回复；“能连接”不等于“能可靠完成任务” |
| **长任务与无人值守运行** | OpenClaw、Hermes、CoPaw、NanoClaw | 自动化完成状态、Cron 认证、worker 超时、进程残留及主机休眠恢复，需要持久状态与故障恢复机制 |
| **配置与历史资产完整性** | OpenClaw、NanoBot、Hermes、LobsterAI、CoPaw | SQLite 恢复、凭据误覆盖、SOUL.md 空保存、历史图片与人设迁移、环境变量覆盖风险 |
| **权限与人工控制** | OpenClaw、Hermes、NanoClaw | 联系人最小授权、技能/记忆写入审核、可理解的命令审批、按 agent 分配密钥及显式恢复 |
| **工具与模型接口契约** | OpenClaw、Hermes、Moltis、CoPaw、ZeroClaw | 工具参数校验、模型别名和 provider 一致性、shell 语义、HTTP 方法与路径、MCP 结果去重 |
| **可观察性与状态可信度** | OpenClaw、Hermes、LobsterAI、CoPaw | 真实完成状态、锁屏进度、子智能体面板、可操作错误提示，减少静默失败与界面误导 |
| **维护成本与资源治理** | OpenClaw、NanoClaw、ZeroClaw、Moltis | 测试去重、镜像和依赖加固、失效代码与低收益缓存退役、单次运行美元预算 |

其中，**消息完整性、配置安全和长期运行可靠性**跨项目出现最频繁，是当前技术投入的主要交集。

## 5. 差异化定位分析

以下为本次动态体现的侧重，不代表各项目完整能力边界。

| 项目 | 功能侧重 | 更匹配的用户/场景 | 可见技术架构特征 |
|---|---|---|---|
| **OpenClaw** | 多渠道个人助手、自动化、多代理及移动交互 | 需要长期运行、多入口协作的用户与部署者 | Gateway、沙箱、工作区、存储及移动端协同 |
| **Hermes Agent** | 长任务编排、桌面助手、技能与插件 | 重度自动化、并发 profile 与人机协作场景 | Kanban/Goal、worker/judge、网关与插件体系 |
| **NanoClaw** | 聊天渠道助手、agent 凭据隔离 | 重视部署隔离与聊天协作的自托管用户 | 容器/镜像治理、按 agent 授权、独立 channels 分支 |
| **NanoBot** | WebUI 交互与会话连续性 | 以浏览器管理助手和渠道配置的用户 | 流式路由、输入辅助与组件化界面维护 |
| **LobsterAI** | PPT、图像/视频与桌面创作 | 内容创作及桌面工作流用户 | dsh 引擎迁移、Electron、多媒体与子会话集成 |
| **CoPaw** | Console、CLI、本地模型与渠道服务 | 本地部署、Windows 和 CLI 使用者 | 前后端配置联动、本地进程与响应路由治理 |
| **ZeroClaw** | 工具与配置治理、安全及代码精简 | 关注 Rust 工程、安全边界与可维护性的开发者 | Rust、WASI 相关依赖、MCP、架构约束与 CI 风险检查 |
| **Moltis** | 配对节点执行、运行预算 | 分布式执行及成本敏感场景 | Rust 工具执行路径、迭代次数与费用双重约束提案 |

其余五个项目缺少当日动态，**不宜仅凭名称或单日静默补充定位判断**。

## 6. 社区热度与成熟度

### 活跃度分层

- **高吞吐、广覆盖：OpenClaw、Hermes。**  
  两者均有至少 50 条 Issue 更新，处于快速演进与可靠性补强并行阶段。主要挑战是将跨模块补丁转化为可验证发布，而非继续增加提交量。

- **中等规模、集中推进：NanoClaw、LobsterAI、ZeroClaw、CoPaw、NanoBot。**  
  各有清晰工作主题，但阶段不同：NanoClaw 偏稳定发布与运行环境治理；LobsterAI 偏引擎迁移及能力恢复；ZeroClaw 偏技术债清理；CoPaw 偏运行与配置修复；NanoBot 偏 WebUI 精修。

- **低量、定向改进：Moltis。**  
  议题有价值，但不足以判断长期开发节奏。

- **窗口内静默：PicoClaw、NullClaw、IronClaw、TinyClaw、ZeptoClaw。**  
  单日无活动既不证明停滞，也不证明成熟稳定。

### 热度与成熟度应分别判断

**讨论热度整体不高。** 已展示 Issue 的最高评论数，OpenClaw 为 4、CoPaw 为 2、Hermes 和 NanoClaw 为 1；PR 评论数据普遍缺失，无法可靠比较讨论强度。

**质量巩固是当日共同主题，但不等于已成熟。** NanoClaw 有 stable 发布及 9 个预发布版本测试的明确记录，是较清晰的发布流程信号；Hermes 的 Canary 只能证明持续提供预览构建；LobsterAI 虽有正式版本记录，仍需确认迁移修复的包含关系。缺少回归率、故障恢复时间和用户验证数据，无法给出可信的总体成熟度排名。

## 7. 值得关注的趋势信号

### 1）竞争指标正从“模型完成”转向“任务真正完成”

OpenClaw 附件未送达、NanoClaw 离线消息遗漏、Hermes 长任务中断，都显示推理成功只是中间状态。

**开发参考：**将任务状态拆分为生成、工具执行、外部投递、最终确认；关键操作增加幂等、重试、恢复与送达证据，避免用单一“成功”状态掩盖失败。

### 2）记忆与配置正在成为需要治理的长期资产

ZeroClaw 的记忆冲突、Hermes 的 SOUL.md 覆盖风险、LobsterAI 的人设与图片迁移、CoPaw 的环境变量丢失，指向同一问题：错误写入的影响可能长期累积。

**开发参考：**为持久写入提供版本记录、差异预览、原子保存和回滚；区分“加载失败”与“用户清空”，避免把未知状态当作空数据保存。

### 3）面向模型的文档与 schema 已进入安全边界

Moltis 的 shell 描述、CoPaw 的 PUT 语义、OpenClaw 的工具参数兼容问题说明，接口说明会直接影响智能体行动，而不只是帮助人类理解。

**开发参考：**对工具 schema、API 示例与真实执行路径做契约测试；明确覆盖、追加、取消及重试语义，把文档错误视为潜在运行缺陷。

### 4）权限设计正由“可信管理员”走向“按主体、资源和动作授权”

OpenClaw 的联系人私人提醒、NanoClaw 的密钥隔离、Hermes 的写入审核，均在细化助手的授权模型。

**开发参考：**尽早将身份、资源所有权、操作权限与人工审批拆开设计，避免随着共享场景增加只能不断扩大 owner 权限。

### 5）成本控制开始成为智能体运行时能力

Moltis 提出美元预算，Hermes 暴露图像请求大小约束，OpenClaw 处理扫描和进程资源浪费，说明迭代次数并不足以约束实际消耗。

**开发参考：**联合设置调用次数、费用、时间、上下文和进程资源预算；同时说明价格未知或费用延迟统计时的行为，避免把预算上限误当作绝对账单保证。

### 6）能力扩张之外，“删减与收敛”正在成为明确工程方向

ZeroClaw 退役低收益缓存并批量清理代码，OpenClaw 去重移动端实现，CoPaw 清理弃用 CLI，表明维护面本身正在成为负担。

**开发参考：**以实际使用率、故障率和维护成本评估能力，而非只统计工具数量；对功能退役提供兼容提示与迁移路径。

---

**综合判断：**本次快照呈现的竞争焦点，是谁能把多渠道、长任务、长期记忆和权限控制组合成**可恢复、可审计、可追踪交付的系统**。OpenClaw 与 Hermes 值得持续观察其复杂场景覆盖和修复吞吐；NanoClaw、LobsterAI 可重点跟踪发布验证与迁移完整性；其他活跃项目则提供了界面、配置、成本及技术债治理方面的具体实践。技术选型时，应优先核查关键缺陷是否进入可用版本，而不是依据单日 PR 数或功能清单作决定。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报
**日期：2026-11-21**  
**项目：[HKUDS/nanobot](https://github.com/HKUDS/nanobot)**

> **数据口径**：本报依据提供的过去 24 小时更新清单，条目时间均显示为 2026-11-20。10 条 PR 均标记为 `CLOSED`，但未提供合并信息，因此下文不将“已关闭”等同于“已合并或已上线”；PR 评论数为 `undefined`，不能视为零。

## 1. 今日速览

过去 24 小时，NanoBot 有 **1 条 Issue 关闭、10 条 PR 关闭，无新版本发布**，更新高度集中于 WebUI。工作覆盖渠道凭据保护、流式回复路由、键盘焦点及聊天界面体验，体现出以稳定性修补和交互打磨为主的迭代方向。最值得关注的是浏览器自动填充可能覆盖渠道凭据的问题，已有对应修复 PR，但是否合入及发布仍需核实。整体开发活动较密集，不过本批 PR 均由同一位贡献者提交，且缺少可用的讨论量数据，尚不能据此判断社区参与广度或审查效率。  
相关：[凭据问题 #6732](https://github.com/HKUDS/nanobot/issues/6732) · [修复 PR #6733](https://github.com/HKUDS/nanobot/pull/6733)

## 2. 项目进展

| 方向 | 重要 PR 与状态 | 推进内容与价值 |
|---|---|---|
| 渠道配置可靠性 | [#6733](https://github.com/HKUDS/nanobot/pull/6733) · 已关闭 | 为渠道密钥输入设置 `autocomplete="new-password"` 等防护，针对浏览器将 WebUI 登录密码误填入渠道凭据的问题。直接关系到配置完整性和渠道可用性。 |
| 多渠道与流式会话 | [#6736](https://github.com/HKUDS/nanobot/pull/6736) · 已关闭 | 保留旁路命令回复的路由上下文，处理 `/dream`、`/dream-log`、`/dream-restore`、`/pairing` 在 WebUI 流式回复期间触发的文本前缀丢失、历史或线程归属异常。 |
| 键鼠交互一致性 | [#6734](https://github.com/HKUDS/nanobot/pull/6734)、[#6735](https://github.com/HKUDS/nanobot/pull/6735) · 已关闭 | 将焦点指示与键盘导航模式关联，并补充点击后使用快捷键时恢复键盘焦点表现的处理，兼顾视觉整洁和键盘可用性。 |
| 长消息阅读 | [#6739](https://github.com/HKUDS/nanobot/pull/6739) · 已关闭 | 默认折叠自然高度超过可见线程视口 50% 的用户文本气泡，并设置最低阈值，减少超长输入对阅读空间的占用。 |
| 输入辅助与样式维护 | [#6738](https://github.com/HKUDS/nanobot/pull/6738)、[#6740](https://github.com/HKUDS/nanobot/pull/6740) · 已关闭 | 提取并统一斜杠命令、技能和提及建议面板，将相关动画、减弱动态效果及强制颜色样式与组件就近组织，提升交互一致性和维护便利性。 |
| 目标与设置界面 | [#6737](https://github.com/HKUDS/nanobot/pull/6737)、[#6741](https://github.com/HKUDS/nanobot/pull/6741) · 已关闭 | 将 `GoalIsland` 改为悬浮式视觉形态，并修正设置侧栏底部控件的对齐与间距，属于界面细节优化。 |
| 自动化删除流程 | [#6731](https://github.com/HKUDS/nanobot/pull/6731) · 已关闭 | 删除关联自动化的话题时，改用不自动消失的确认提示，并通过现有接口预检查关联关系；摘要明确不涉及后端或 API schema 变化。 |

**进展判断**：本批更新更接近一次覆盖多个使用环节的 WebUI 质量打磨，而非核心智能体能力扩张。若相关 PR 已合入，主要收益将体现在配置安全、会话连续性和日常操作体验；当前数据不足以确认实际交付程度。

## 3. 社区热点

**本日无法按讨论热度可靠排名**：唯一 Issue 为 **0 评论、0 👍**；10 条 PR 均为 **0 👍**，评论数未提供有效值。以下是按影响范围筛选的重点，而非互动量榜单。

- **渠道凭据被自动填充覆盖**：用户报告保存渠道配置时，真实 token 或密码可能被 WebUI 登录密码替换。其核心诉求是“保存配置不能静默损坏现有凭据”，影响比普通表单体验问题更大。  
  链接：[Issue #6732](https://github.com/HKUDS/nanobot/issues/6732) · [PR #6733](https://github.com/HKUDS/nanobot/pull/6733)

- **流式回答与管理命令并行使用**：修复摘要反映用户需要在回答生成期间运行辅助命令，而不破坏当前回答、历史记录和线程上下文。  
  链接：[PR #6736](https://github.com/HKUDS/nanobot/pull/6736)

- **键鼠混用的焦点反馈**：相邻两条 PR 展示了“避免多余焦点框”和“保留键盘操作反馈”之间的平衡需求，是 WebUI 精细化交互的重要信号。  
  链接：[PR #6734](https://github.com/HKUDS/nanobot/pull/6734) · [PR #6735](https://github.com/HKUDS/nanobot/pull/6735)

## 4. Bug 与稳定性

以下按**潜在用户影响**排序，并非项目官方严重度；部分 PR 的官方标签为 `priority: p2`。

| 影响排序 | 问题及风险 | 修复状态 |
|---|---|---|
| **较高：配置完整性与渠道可用性** | 浏览器自动填充将 WebUI 密码写入渠道凭据字段，保存后覆盖 `config.json` 中的真实值，可能导致 Telegram 等渠道后续启动失败。现有摘要未表明发生凭据外泄。 | [Issue #6732](https://github.com/HKUDS/nanobot/issues/6732) 已关闭；已有 [fix PR #6733](https://github.com/HKUDS/nanobot/pull/6733)，已关闭，合入与发布状态未知。 |
| **中：流式回复与历史上下文** | 流式输出期间运行旁路命令，可能清除已显示的回答前缀，并导致回复缺少历史或线程路由上下文。不能据摘要进一步认定持久化数据已丢失。 | 已有 [fix PR #6736](https://github.com/HKUDS/nanobot/pull/6736)，已关闭。 |
| **中低：键盘可用性及交互回归** | 指针操作后的非导航按键可能错误触发焦点框；限制焦点显示后，又需处理快捷键无法恢复键盘模式的问题。 | 已有 [fix PR #6734](https://github.com/HKUDS/nanobot/pull/6734) 和 [后续修正 #6735](https://github.com/HKUDS/nanobot/pull/6735)，均已关闭。 |
| **低：界面对齐** | 设置侧栏底部 Local、Restart、Sign out 行存在横向偏移、行高和间距不一致。 | 已有 [fix PR #6741](https://github.com/HKUDS/nanobot/pull/6741)，已关闭。 |

本批数据**未提供崩溃报告**。建议优先核实凭据修复的合入及版本覆盖情况，并验证浏览器已有保存密码时的实际行为。

## 5. 功能请求与路线图信号

本日没有新增开放的功能请求 Issue；以下方向来自 PR，属于**近期开发信号，不代表已承诺的版本计划**。

- **提升长对话可读性**：长用户消息自动折叠已有具体实现 PR，显示界面正在优化大段提示词、日志或上下文输入的展示方式。  
  链接：[PR #6739](https://github.com/HKUDS/nanobot/pull/6739)

- **统一命令、技能与提及入口**：建议面板模块化及样式就近组织，说明输入辅助体验和前端可维护性正被共同推进。  
  链接：[PR #6738](https://github.com/HKUDS/nanobot/pull/6738) · [PR #6740](https://github.com/HKUDS/nanobot/pull/6740)

- **细化自动化管理流程**：删除话题前检查关联自动化，并采用持续确认提示，体现对关联操作风险和非阻塞交互的关注。  
  链接：[PR #6731](https://github.com/HKUDS/nanobot/pull/6731)

- **强化目标状态的界面呈现**：`GoalIsland` 的悬浮式重设计属于目标展示层的演进，不能据此推断后台目标执行能力发生变化。  
  链接：[PR #6737](https://github.com/HKUDS/nanobot/pull/6737)

上述改动均已有关闭的 PR，若已合入，可能进入后续发布；由于没有版本公告及合并记录，暂不能确认下一版本范围。

## 6. 用户反馈摘要

**可直接确认的用户反馈仅来自 Issue 正文，未提供评论内容。**

- **真实痛点：配置被无声覆盖。** 报告者描述浏览器密码管理器将已保存的 WebUI 密码填入渠道凭据，点击保存后破坏真实配置。问题发生在普通设置操作中，用户可能直到渠道后续启动失败才察觉，增加了排查成本。  
  链接：[Issue #6732](https://github.com/HKUDS/nanobot/issues/6732)

- **满意度证据不足。** 该 Issue 无评论、无点赞，关闭本身不能证明报告者已验证修复，也没有用户确认问题解决的记录。  
  链接：[Issue #6732](https://github.com/HKUDS/nanobot/issues/6732)

- **开发侧反映的场景，不等同于用户评价。** 长文本输入、流式回复期间执行命令、键鼠混用是本批改动覆盖的典型场景，但不能将 PR 作者描述包装为社区普遍反馈。  
  链接：[长消息 #6739](https://github.com/HKUDS/nanobot/pull/6739) · [流式命令 #6736](https://github.com/HKUDS/nanobot/pull/6736) · [键盘焦点 #6735](https://github.com/HKUDS/nanobot/pull/6735)

## 7. 待处理积压

**当前清单未显示开放 Issue 或待合并 PR，也未提供历史积压数据，因此无法识别“长期未响应”的具体条目，更不能据此认定项目无积压。** 建议维护者重点完成以下闭环核查：

| 待核查事项 | 原因与建议 |
|---|---|
| **凭据问题是否真正交付** | 确认 [#6733](https://github.com/HKUDS/nanobot/pull/6733) 是否合入、覆盖哪个版本，并在 [#6732](https://github.com/HKUDS/nanobot/issues/6732) 补充验证结果；对已经被覆盖的凭据，应明确恢复方式。 |
| **流式路由修复是否覆盖命令组合** | 核实 [#6736](https://github.com/HKUDS/nanobot/pull/6736) 的合入状态，并验证各相关命令对当前回答、历史与线程归属的影响。 |
| **焦点修复是否形成完整回归验证** | 联合复核 [#6734](https://github.com/HKUDS/nanobot/pull/6734) 与 [#6735](https://github.com/HKUDS/nanobot/pull/6735)，避免视觉修正损害快捷键或键盘导航体验。 |

**健康度结论**：NanoBot 本日呈现出较强的 WebUI 维护活动，且关注到了凭据完整性与会话连续性等实质性问题。当前最大的观测缺口不是改动数量，而是 **PR 合入情况、用户验证与发布覆盖范围**；补齐这些信息后，才能更准确评估修复闭环和交付质量。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-11-21** · [GitHub 仓库](https://github.com/NousResearch/hermes-agent)

> **统计口径**：依据提供的过去 24 小时更新数据；明细仅覆盖 30 条 Issue、20 条 PR。PR 评论数缺失，Release 正文被截断，未提供评论原文及已合并/关闭 PR 明细，因此下文明确区分“用户报告”“待审修复”与“已交付”。

## 1. 今日速览

过去 24 小时，项目有 **50 条 Issue 更新、50 条 PR 更新和 1 个版本发布记录**，贡献活动密集，覆盖 Agent 核心、桌面端、网关、工具及插件生态。Issues 中 48 条仍开放，PR 中 47 条待合并，说明需求与修复提交活跃，但本批更新的处理结果仍以待审为主。今日主要信号是：**稳定性补强与插件扩展并行**，其中 Kanban 长任务、桌面网关、文件处理和多模态兼容问题值得优先关注。已展示 Issue 最高仅 1 条评论、全部 👍 为 0，尚无证据表明存在高热度讨论；整体更接近广泛的问题上报与补丁提交，而非集中争议。  
来源：[Issues](https://github.com/NousResearch/hermes-agent/issues) · [Pull requests](https://github.com/NousResearch/hermes-agent/pulls)

## 2. 版本发布

### Canary：`v0.23.3+canary.20261120T064609Z`

- **发布日期**：2026-11-20；日报窗口中记录到该发布，不应视作 11 月 21 日新打包的稳定版。
- **已知内容**：Release 提供 Hermes Desktop 下载表，已展示 macOS Apple Silicon 的 DMG 条目。
- **更新内容与破坏性变更**：正文被截断，无法确认功能清单、修复列表或是否存在破坏性变更。
- **迁移注意事项**：未提供官方迁移说明。建议生产环境先验证，再决定是否切换 Canary；升级前保留配置、会话及数据备份。当前另有待审备份修复，但不能据此认定该 Canary 已包含修复。

链接：[Release 详情](https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.3%2Bcanary.20261120T064609Z) · [备份修复 PR #158433](https://github.com/NousResearch/hermes-agent/pull/158433)

## 3. 项目进展

### 已交付进展：本批数据无法核实具体内容

统计显示 **3 条 PR 已合并或关闭**，但没有对应明细，无法区分“成功合并”与“未合并关闭”，也无法判断其实际交付价值。已展示的 20 条 PR 全部为 **OPEN**，不应写成已经上线的成果。  
来源：[PR 列表](https://github.com/NousResearch/hermes-agent/pulls)

### 待审进展：修复方案已覆盖多个关键环节

| 方向 | 代表性待审 PR | 推进价值 |
|---|---|---|
| 配置数据保护 | [#158445](https://github.com/NousResearch/hermes-agent/pull/158445) | SOUL.md 加载失败时禁用保存，避免真实人格文件被空内容覆盖 |
| 桌面与网关一致性 | [#158443](https://github.com/NousResearch/hermes-agent/pull/158443) | 避免将繁忙网关误判为失效并连接第二个进程 |
| 文件工具正确性 | [#158428](https://github.com/NousResearch/hermes-agent/pull/158428) | 固定搜索排序，解决分页重复与遗漏 |
| MCP 文件可读性 | [#158429](https://github.com/NousResearch/hermes-agent/pull/158429) | 根据文件头识别通用二进制下载中的 PDF、图片等格式 |
| 长任务连续执行 | [#158422](https://github.com/NousResearch/hermes-agent/pull/158422) | 让 Goal 模式 worker 在中间结果后交由 judge 判断并继续执行 |

**进展判断**：修复准备较充分，但缺少合并记录与测试结果，今天能够确认的是“方案推进”，而不是“稳定性问题已经解决”。

## 4. 社区热点

本批 Issue 的最高评论数仅为 **1**，PR 评论数为 `undefined`，不能据此给出可信的 PR 热度排名。以下是具有代表性的低评论量讨论：

- **消息平台表达能力**：希望 Discord、Telegram 回复支持剧透图片，分别适配附件命名与 `has_spoiler`。诉求是让 Agent 的输出遵循平台原生交互习惯。**1 条评论**。  
  [Issue #158416](https://github.com/NousResearch/hermes-agent/issues/158416)

- **移动端运行状态可见性**：iOS 锁屏 Live Activity 停留在“Thinking · 0 tools”，无法展示后续工具调用或写作状态，影响用户判断任务是否仍在运行。**1 条评论**。  
  [Issue #158390](https://github.com/NousResearch/hermes-agent/issues/158390)

- **本地模型无人值守运行**：托管 llama.cpp 的 Cron 任务被报告每次执行均出现 401，说明交互式模型配置与定时任务持久化之间存在一致性诉求。**1 条评论**。  
  [Issue #158383](https://github.com/NousResearch/hermes-agent/issues/158383)

- **人工审批的可理解性**：长命令审批预览可能截掉真正执行的命令；用户要求优先保留命令结构、摘要化 heredoc 等长内容。核心诉求不是减少审批，而是让审批具有实际判断价值。**1 条评论**。  
  [Issue #158342](https://github.com/NousResearch/hermes-agent/issues/158342)

## 5. Bug 与稳定性

以下按潜在影响排序；所列主要问题均标为 **P2**，排序为日报分析判断，不代表项目重新定级。“未见 fix”仅指提供的明细中未出现。

| 优先关注 | 问题与影响 | Fix 状态 |
|---|---|---|
| 数据完整性 | SOUL.md 加载失败后仍能保存空内容，可能覆盖真实人格配置 | 已有待审 [PR #158445](https://github.com/NousResearch/hermes-agent/pull/158445) |
| 审批透明度 | 长命令预览截断，用户可能看不到实际执行内容便批准 | [Issue #158342](https://github.com/NousResearch/hermes-agent/issues/158342)；未见 fix |
| 并发任务可用性 | Windows、多 profile 并发环境下，control socket 的 2 秒硬超时被报告会导致 Kanban worker 崩溃 | [Issue #158441](https://github.com/NousResearch/hermes-agent/issues/158441)；未见 fix |
| 定时任务可用性 | llama.cpp Cron 捕获错误 provider，执行时报 401 | [Issue #158383](https://github.com/NousResearch/hermes-agent/issues/158383)；未见 fix |
| 桌面进程一致性 | 繁忙网关被误判失效，桌面可能连接到第二个网关进程 | 已有待审 [PR #158443](https://github.com/NousResearch/hermes-agent/pull/158443) |
| 对话顺序正确性 | 当前回合尚无工具结果时，插入用户消息或 steer 可能落到历史回合中 | [#158388](https://github.com/NousResearch/hermes-agent/issues/158388)、[#158385](https://github.com/NousResearch/hermes-agent/issues/158385)；症状相关，未确认同一根因，未见 fix |
| 多模态请求失败 | 原生用户图片未缩放且未被预算淘汰，多张手机照片可能触发约 10 MB 限额提供商的 HTTP 413 | [Issue #158409](https://github.com/NousResearch/hermes-agent/issues/158409)；未见 fix |
| 文件搜索阻塞 | 缺失路径提示探测无独立超时，在 macOS 受保护目录上可能等待默认 180 秒 | [Issue #158400](https://github.com/NousResearch/hermes-agent/issues/158400)；已有待审 [PR #158442](https://github.com/NousResearch/hermes-agent/pull/158442) |
| 测试环境兼容 | fast-echo 测试受 tmux 的 `TERM` 影响；桌面测试另有 arm64 Linux 假设问题 | [#158404](https://github.com/NousResearch/hermes-agent/issues/158404) 对应待审 [PR #158427](https://github.com/NousResearch/hermes-agent/pull/158427)；[#158405](https://github.com/NousResearch/hermes-agent/issues/158405) 未见 fix |

**Kanban 是集中风险点**：除并发超时外，还出现评论注入过滤、review 结束后的错误反馈、延续任务依赖阻塞、judge 非法 JSON 导致交接失败等报告。现有 [PR #158422](https://github.com/NousResearch/hermes-agent/pull/158422) 处理的是中间回合继续执行，不能视为覆盖上述全部问题。  
相关：[评论注入 #158371](https://github.com/NousResearch/hermes-agent/issues/158371) · [review #158397](https://github.com/NousResearch/hermes-agent/issues/158397) · [依赖阻塞 #158396](https://github.com/NousResearch/hermes-agent/issues/158396) · [judge JSON #158395](https://github.com/NousResearch/hermes-agent/issues/158395)

另需注意，[停滞检测 Issue #158366](https://github.com/NousResearch/hermes-agent/issues/158366) 的作者已撤回“整个分支都是死代码”的初始判断，后续排查应以修正后的描述为准。

## 6. 功能请求与路线图信号

### 已有 PR，具备近期候选条件，但尚无合并承诺

- **技能与记忆写入审核**：Skill Review 插件拟以可视化 diff 支持逐块接受或拒绝写入；同时有人请求公开写入审批队列 API。信号是长期记忆与技能更新正转向更明确的人工治理。  
  [PR #158425](https://github.com/NousResearch/hermes-agent/pull/158425) · [API 请求 #158426](https://github.com/NousResearch/hermes-agent/issues/158426)

- **跨设备通知降噪**：桌面端拟上报用户活跃状态，让手机通知在用户使用电脑时保持安静。  
  [PR #158424](https://github.com/NousResearch/hermes-agent/pull/158424)

- **模型服务档位适配**：OpenRouter 的 `-fast` / `-flex` 别名支持，目标是将档位映射到基础模型端点，而不是直接发送无效模型 ID。  
  [PR #158446](https://github.com/NousResearch/hermes-agent/pull/158446)

- **个人助手插件扩展**：UniFi 网络健康与排障插件、macOS 完成/待输入提示音插件申请进入社区目录。  
  [UniFi #158447](https://github.com/NousResearch/hermes-agent/pull/158447) · [PipoPapo #158421](https://github.com/NousResearch/hermes-agent/pull/158421)

### 仍处需求讨论阶段

- 原生 rootless Podman 终端后端：[Issue #158346](https://github.com/NousResearch/hermes-agent/issues/158346)
- 面向视觉 QA 的可选高保真截图模式：[Issue #158434](https://github.com/NousResearch/hermes-agent/issues/158434)
- 托管命令 allowlist 与 profile“Always”列表采用叠加而非替换：[Issue #158352](https://github.com/NousResearch/hermes-agent/issues/158352)

## 7. 用户反馈摘要

**未提供评论正文，以下来自 Issue 描述，不能视为评论共识或满意度调查。**

- **重度自动化已进入真实并发环境**：单机约 35 个 profile、Cron 与 Kanban 同时运行的报告，表明部分用户已将 Hermes 当作持续运行的任务基础设施使用。  
  [#158441](https://github.com/NousResearch/hermes-agent/issues/158441)

- **用户在意“能否看懂当前状态”**：锁屏状态不更新、Claude 用量读数停滞、OAuth 过期后静默展示回退模型目录，都会削弱界面信息的可信度。  
  [#158390](https://github.com/NousResearch/hermes-agent/issues/158390) · [#158347](https://github.com/NousResearch/hermes-agent/issues/158347) · [#158389](https://github.com/NousResearch/hermes-agent/issues/158389)

- **视觉任务存在质量与资源预算的双向压力**：视觉 QA 用户希望保留细微渲染缺陷，手机照片用户则需要缩放与请求大小控制，说明单一图像预处理策略难以覆盖所有场景。  
  [#158434](https://github.com/NousResearch/hermes-agent/issues/158434) · [#158409](https://github.com/NousResearch/hermes-agent/issues/158409)

- **暂无足够正向反馈证据**：插件投稿体现参与意愿，但不能替代对稳定性、易用性或用户满意度的直接评价。  
  [插件 PR #158447](https://github.com/NousResearch/hermes-agent/pull/158447)

## 8. 待处理积压

**无法确认“长期未响应”积压**：展示条目均创建于 11 月 20—21 日，且缺少维护者回复、首次响应时间与完整历史。47 条待合并 PR 也只是本次更新集合，不能当作全仓库积压总量。  
来源：[Issues](https://github.com/NousResearch/hermes-agent/issues) · [PRs](https://github.com/NousResearch/hermes-agent/pulls)

建议维护者重点跟踪以下近期队列：

1. **优先审核数据与审批安全相关修复**：SOUL.md 防空覆盖，以及长命令审批预览。  
   [PR #158445](https://github.com/NousResearch/hermes-agent/pull/158445) · [Issue #158342](https://github.com/NousResearch/hermes-agent/issues/158342)

2. **对 Kanban 做跨模块回归，而非只验单个补丁**：覆盖并发控制、任务依赖、judge 异常和中间回合继续执行。  
   [#158441](https://github.com/NousResearch/hermes-agent/issues/158441) · [#158396](https://github.com/NousResearch/hermes-agent/issues/158396) · [#158395](https://github.com/NousResearch/hermes-agent/issues/158395) · [PR #158422](https://github.com/NousResearch/hermes-agent/pull/158422)

3. **尽快验证已有明确对应关系的修复**：搜索超时与 tmux 测试隔离均已有候选 PR，适合优先复现、验证并关闭问题。  
   [PR #158442](https://github.com/NousResearch/hermes-agent/pull/158442) · [PR #158427](https://github.com/NousResearch/hermes-agent/pull/158427)

**健康度结论**：Hermes Agent 当前呈现出活跃的贡献供给与广泛的实际使用场景，但核心可靠性问题涉及任务执行、数据保护和状态一致性。短期最值得观察的不是新增提交数量，而是这些 P2 修复能否完成审核、跨平台验证并进入可追踪的发布版本。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报
**日期：2026-11-21｜统计范围：所提供的过去 24 小时 GitHub 更新**

> **数据口径**：项目入口标为 `qwibitai/nanoclaw`，但明细指向 `nanocoai/nanoclaw`，以下链接按明细仓库生成。PR 数据仅区分 OPEN/CLOSED，未提供合并标记，因此不将“已关闭”一律视为“已合并”。版本说明、Issue 正文均有截断，PR 评论数缺失，相关结论已注明边界。

## 1. 今日速览

过去 24 小时共更新 **10 条 Issue、11 条 PR，并发布 1 个稳定版本**，项目呈现较高的发布与维护活跃度，核心事件是 [v2026.11.0 进入 stable 通道](https://github.com/nanocoai/nanoclaw/releases/tag/v2026.11.0)。工作重心集中在稳定版收尾、容器与依赖加固，以及多聊天渠道的可靠性。社区反馈暴露了 Slack 离线消息无法补处理、WhatsApp 引用上下文缺失、Discord 卡片发送失败等问题，说明渠道体验仍是主要稳定性压力点。整体来看，发布与质量治理持续推进，但 **6 条待处理 PR 和 8 条开放 Issue** 中仍有影响消息完整性及依赖安全的事项需要优先跟进。

## 2. 版本发布

### [v2026.11.0：新稳定版上线](https://github.com/nanocoai/nanoclaw/releases/tag/v2026.11.0)

**已确认的更新信息：**
- 默认 `stable` 通道的 `/update-nanoclaw` 已提供该版本。
- 覆盖自 `2026.10.0` 以来的变更，发布前通过 `beta` 通道经历了 **9 个预发布版本**测试。
- 发布说明强调“每个 agent 只获得你分配给它的密钥”，体现凭据隔离方向；但所给说明在此处截断，无法确认具体配置方式及完整变更清单。

**发布收尾内容：**
- [#4508：稳定版发布 PR，已关闭](https://github.com/nanocoai/nanoclaw/pull/4508) 将版本从 `2026.11.0-rc.3` 更新至 `2026.11.0`，摘要列出了纳入发布的后续变更。
- [#4506：README 事实性修订，已关闭](https://github.com/nanocoai/nanoclaw/pull/4506) 与 [#4498：CLI 测试重写，已关闭](https://github.com/nanocoai/nanoclaw/pull/4498) 均出现在发布 PR 列出的变更中。

**破坏性变更与迁移注意事项：**
- **现有材料不足以确认是否存在破坏性变更**，不宜据此认定可无条件平滑升级。
- 使用密钥注入或多 agent 配置的部署，应结合完整发布说明核对凭据授权行为。
- 使用 `channels` 分支的用户，应确认部署提交是否已包含稳定版同步；[#4512](https://github.com/nanocoai/nanoclaw/pull/4512) 已关闭，但给定数据没有明确合并标记。
- 不应把尚开放的 [Bun 升级 PR #4499](https://github.com/nanocoai/nanoclaw/pull/4499) 视为已包含在稳定版中的修复。

## 3. 项目进展

| 已关闭的重要 PR | 推进内容与意义 |
|---|---|
| [#4508：发布 v2026.11.0](https://github.com/nanocoai/nanoclaw/pull/4508) | 完成稳定版发布收尾，是今日最明确的交付成果。 |
| [#4512：将 main 同步到 channels](https://github.com/nanocoai/nanoclaw/pull/4512) | 摘要称同步前 main 领先 171 个提交，上次同步为 10 月 23 日；该工作旨在缩小核心与渠道分支的差距。最终合并情况仍需核验。 |
| [#4506：修正 README 与实际行为不符的描述](https://github.com/nanocoai/nanoclaw/pull/4506) | 改善数据流向等重要行为的说明准确性，也有助于避免依赖 README 的安装故障辅助逻辑给出错误信息。 |
| [#4498：重写无法有效失败的 CLI 测试](https://github.com/nanocoai/nanoclaw/pull/4498) | 修复测试预期来自被测实现、断言无法捕捉回归等问题，提升测试的实际保护能力。 |
| [#4509：允许白名单维护者批准自己的稳定版发布](https://github.com/nanocoai/nanoclaw/pull/4509) | 旨在减少特定维护者发布时等待第二审核人的阻塞；其他人仍需第二位审核者。效率提升的同时，应保持白名单与审计透明。 |

**进展判断：**今日主要完成了“预发布验证 → 稳定交付”的阶段性推进，并补强文档和测试基础；尚不能据此认定多渠道可靠性问题已随版本发布解决。

## 4. 社区热点

当前互动量偏低：Issue 中仅 **[#4501](https://github.com/nanocoai/nanoclaw/issues/4501) 有 1 条评论**，其余为 0；所有条目点赞数均为 0，PR 评论数不可用。因此，以下区分“互动最高”与“问题聚集方向”，不以条目数量代替社区热度。

- **互动最高：WhatsApp 引用消息缺失**——[#4501](https://github.com/nanocoai/nanoclaw/issues/4501)。用户回复某条消息时，agent 未收到被引用的内容，反映出用户对“回复这一条”语义能够完整传递的期待。
- **渠道可靠性问题集中出现**——[Slack 离线消息 #4502](https://github.com/nanocoai/nanoclaw/issues/4502)、[Discord 卡片 #4511](https://github.com/nanocoai/nanoclaw/issues/4511)、[Mattermost 命令 #4503](https://github.com/nanocoai/nanoclaw/issues/4503)。共同诉求是渠道集成不仅能连接，还应覆盖断连恢复、交互组件和原生命令发现。
- **透明度与信任边界**——[安装提示 #4507](https://github.com/nanocoai/nanoclaw/issues/4507) 和 [README 描述 #4505](https://github.com/nanocoai/nanoclaw/issues/4505)。用户关注的不只是功能，还包括认证过程发送什么数据、项目文档是否准确描述实际行为。

## 5. Bug 与稳定性

下表为基于影响范围的**日报分析优先级**，并非统一的官方严重性评级。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **优先核查：依赖加固** | [#4496：Bun 1.4.4 落入上游公告影响范围](https://github.com/nanocoai/nanoclaw/issues/4496)。涉及 agent 镜像与 CI；报告者明确表示这不是可利用漏洞，不能直接推断 NanoClaw 存在可利用攻击路径。 | 有开放修复 [#4499](https://github.com/nanocoai/nanoclaw/pull/4499)，拟升级至 1.4.5。 |
| **高：消息完整性** | [#4502：Slack Socket Mode 断连或主机休眠期间的消息未处理，重连后不补处理](https://github.com/nanocoai/nanoclaw/issues/4502)。可能造成用户任务被遗漏。 | 所给数据中无对应 fix PR。 |
| **中：消息上下文** | [#4501：WhatsApp 引用回复缺少被引用消息](https://github.com/nanocoai/nanoclaw/issues/4501)。可能导致 agent 理解错指代、要求用户重复说明。 | 无对应 fix PR；官方标记为 `priority/medium`。 |
| **中：发送失败** | [#4511：Discord 仅含链接按钮的 send_card 被拒绝](https://github.com/nanocoai/nanoclaw/issues/4511)。空 embed description 触发 `BASE_TYPE_REQUIRED`。 | 无对应 fix PR。 |
| **中：CI 阻塞** | [#4513：旧镜像 pin 无法读取时，verify-agent-image 失败](https://github.com/nanocoai/nanoclaw/issues/4513)。影响镜像变更验证流程。 | 有开放修复 [#4514](https://github.com/nanocoai/nanoclaw/pull/4514)，拟在旧镜像不可读时跳过体积比较。 |
| **中：告知准确性** | [#4507：安装流程对采集信息的描述少于 registry 登录实际发送的信息](https://github.com/nanocoai/nanoclaw/issues/4507)。属于隐私告知与用户信任问题，尚待核查具体范围。 | 无对应 fix PR。 |
| **较低：可发现性** | [#4503：Mattermost slash commands 未注册到自动补全](https://github.com/nanocoai/nanoclaw/issues/4503)。文本解析仍可工作，但原生发现与使用体验受损。 | 无对应 fix PR。 |

另有 [#4497：CLI 测试有效性问题](https://github.com/nanocoai/nanoclaw/issues/4497) 已关闭，对应 [#4498](https://github.com/nanocoai/nanoclaw/pull/4498) 也已关闭。现有数据未提供进程崩溃报告，不宜将上述问题描述为崩溃回归。

## 6. 功能请求与路线图信号

- **跨渠道多 agent 协作**：[#4504](https://github.com/nanocoai/nanoclaw/issues/4504) 请求将 Slack 的 agent-to-agent 共享房间能力移植到 Mattermost，满足“人类与多个机器人在同一房间协作”的场景。当前未见对应 PR，属于明确需求信号，尚不能判断会进入下一版本。
- **新线程响应速度**：开放 PR [#4510](https://github.com/nanocoai/nanoclaw/pull/4510) 拟避免新线程首条消息等待同级会话邮箱，并提前显示输入状态。已有实现提交，比纯需求更接近交付，但仍待合并。
- **依赖与镜像持续加固**：开放的 [Iron Proxy 升级 #4495](https://github.com/nanocoai/nanoclaw/pull/4495)、[Bun 升级 #4499](https://github.com/nanocoai/nanoclaw/pull/4499)，以及面向 [2026.11.0 的镜像刷新 #4515](https://github.com/nanocoai/nanoclaw/pull/4515)、[2026.10.0 的镜像刷新 #4500](https://github.com/nanocoai/nanoclaw/pull/4500)，显示维护重点正延伸到发布后的运行环境治理。镜像刷新不等同于已纳入上述所有依赖升级。

## 7. 用户反馈摘要

**未提供评论正文，以下仅提炼 Issue 报告者明确描述的场景，不虚构评论观点或满意度。**

- **常驻助手需要容忍主机断连**：Slack 用户在 Linux、systemd 用户服务及休眠场景下遇到消息遗漏，表明“服务恢复”不等于“任务恢复”。见 [#4502](https://github.com/nanocoai/nanoclaw/issues/4502)。
- **自然聊天依赖上下文完整传递**：WhatsApp 用户使用引用回复定位对象，agent 却无法获得原文，破坏了熟悉的聊天交互方式。见 [#4501](https://github.com/nanocoai/nanoclaw/issues/4501)。
- **渠道能力应符合平台原生习惯**：Mattermost 用户希望通过自动补全发现命令，并让多个 agent 在同一空间协作。见 [#4503](https://github.com/nanocoai/nanoclaw/issues/4503)、[#4504](https://github.com/nanocoai/nanoclaw/issues/4504)。
- **部署前需要可信的数据说明**：安装提示与 README 被指出存在描述偏差，反映用户对数据流向和认证边界的关注。见 [#4507](https://github.com/nanocoai/nanoclaw/issues/4507)、[#4505](https://github.com/nanocoai/nanoclaw/issues/4505)。

## 8. 待处理积压

**本批条目均创建于 11 月 20—21 日，不能据此认定存在“长期未响应”积压。**零评论也不等于维护者未处理。建议优先追踪：

1. **Slack 消息遗漏的复现与恢复策略**：[#4502](https://github.com/nanocoai/nanoclaw/issues/4502)，目前未见修复 PR，且影响任务完整性。
2. **依赖加固闭环**：[Bun #4499](https://github.com/nanocoai/nanoclaw/pull/4499)、[Iron Proxy #4495](https://github.com/nanocoai/nanoclaw/pull/4495)，应明确验证、合并及镜像分发状态。
3. **镜像验证与刷新链路**：[#4514](https://github.com/nanocoai/nanoclaw/pull/4514)、[#4515](https://github.com/nanocoai/nanoclaw/pull/4515)、[#4500](https://github.com/nanocoai/nanoclaw/pull/4500)，避免验证逻辑阻碍加固镜像交付。
4. **跨版本残留问题核查**：[Discord #4511](https://github.com/nanocoai/nanoclaw/issues/4511) 的摘要称该问题在较早版本中已有报告且仍存在；虽当前 Issue 很新，但值得按持续性缺陷跟踪。
5. **隐私告知核查**：[#4507](https://github.com/nanocoai/nanoclaw/issues/4507)，建议确认实际发送字段与提示文案是否一致。

**健康度结论：发布与维护动能较强，文档、测试及依赖治理均有具体动作；当前最需要补强的是多渠道消息可靠性，以及从安全加固 PR 到实际部署镜像的交付闭环。**

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
**日期：2026-11-21｜统计窗口：过去 24 小时**

> 数据说明：本日报仅依据所提供的 GitHub 快照。PR 的 `CLOSED` 状态不等同于已合并；评论数为 `undefined`，不能视为零。版本说明与部分 PR 摘要存在截断，以下不推断未提供的内容。  
> 项目：[netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)

## 1. 今日速览

过去 24 小时，LobsterAI 有 **13 条 PR 更新、1 个新版本发布、0 条 Issue 更新**，开发侧活跃度较高，但没有可供分析的新增 Issue 讨论。13 条 PR 中，**12 条已关闭、1 条仍开放**；关闭项是否合并，需要进一步核验。工作重点集中于 **dsh 引擎迁移后的能力恢复与兼容性修复**，覆盖子智能体、图像与视频生成、会话历史、专家人设和交互问答。版本侧则突出 PPT 封面向导、首页快捷入口及会话导航体验，整体呈现“用户体验迭代与迁移稳定性收敛并行”的状态。  
相关入口：[PR 列表](https://github.com/netease-youdao/LobsterAI/pulls) · [版本列表](https://github.com/netease-youdao/LobsterAI/releases)

## 2. 版本发布

### LobsterAI 2026.11.20

本期新增发布版本 **2026.11.20**，当前可见的更新亮点包括：

| 更新方向 | 已披露内容 | 用户价值 |
|---|---|---|
| PPT 封面制作 | 新增分步式封面创建向导，并支持可配置的首页示例 | 降低从空白开始制作演示文稿封面的门槛 |
| 会话导航与提示词历史 | 支持会话前进、后退，以及历史提示词调用 | 减少多会话切换与重复输入成本 |
| 首页交互打磨 | 统一快捷操作组件，优化相关面板布局及 PPT 向导导航 | 提升入口一致性与操作连贯性 |

相关链接：[版本发布页](https://github.com/netease-youdao/LobsterAI/releases/tag/2026.11.20) · [#3072](https://github.com/netease-youdao/LobsterAI/pull/3072) · [#3107](https://github.com/netease-youdao/LobsterAI/pull/3107) · [#3129](https://github.com/netease-youdao/LobsterAI/pull/3129)

**破坏性变更与迁移注意事项：**

- 可见 Release 片段**未列出明确的破坏性变更**，但说明已截断，不能据此认定不存在。
- 今日 PR 显示，dsh 迁移涉及历史图片、专家人设、旧媒体资源及会话分叉等兼容问题。升级验证应重点检查这些数据与能力是否完整保留；**不能仅凭 PR 已关闭就认定相关修复已进入该版本**。
- 对保有重要历史数据的用户，建议升级前备份配置与会话资料，并核对完整发布说明。

迁移相关：[历史图片与预览 #3134](https://github.com/netease-youdao/LobsterAI/pull/3134) · [专家人设 #3132](https://github.com/netease-youdao/LobsterAI/pull/3132) · [会话分叉 #3135](https://github.com/netease-youdao/LobsterAI/pull/3135)

## 3. 项目进展

以下重要 PR 均标记为 **CLOSED，合并情况未确认**。

### dsh 能力恢复：覆盖核心任务链路

| 方向 | 主要推进 | PR |
|---|---|---|
| 子智能体 | 将委派调用、结果与 dsh 子会话 ID 关联，修复父任务有结果但子智能体面板为空的情况 | [#3123](https://github.com/netease-youdao/LobsterAI/pull/3123) |
| 图像生成 | 接入现有模型选择、确认、计费及产物交付流程，并恢复旧图像模型偏好等兼容能力 | [#3125](https://github.com/netease-youdao/LobsterAI/pull/3125) |
| 视频生成 | 恢复视频生成及旧视频播放相关能力，涵盖参数、引用、轮询和取消流程 | [#3127](https://github.com/netease-youdao/LobsterAI/pull/3127) |
| 皮肤创作 | 将 Skin Designer 接入 dsh，并衔接背景、徽标保存与应用流程 | [#3130](https://github.com/netease-youdao/LobsterAI/pull/3130) |
| 人机问答 | 保留稳定问题 ID、选项、跳过状态及自由文本回答，并传递取消信号 | [#3131](https://github.com/netease-youdao/LobsterAI/pull/3131) |

### 数据连续性与桌面体验

- **会话分叉准确性：**按选定助手事件创建分叉，将保存的序号绑定到来源 dsh 会话；当前原生日志找不到位置时，使用复制的本地前缀继续。[#3135](https://github.com/netease-youdao/LobsterAI/pull/3135)
- **历史视觉内容保留：**迁移时保存上传、粘贴的图片，并提供原生 `read_image` 可读取的本地文件引用；标题同时涉及资料库预览恢复。[#3134](https://github.com/netease-youdao/LobsterAI/pull/3134)
- **专家人设恢复：**启动迁移时从 SQLite 恢复缺失的人设文件，同时保留已编辑文件和主动清空字段。[#3132](https://github.com/netease-youdao/LobsterAI/pull/3132)
- **桌面与首页体验：**修复窗口显示时序、多显示器及 Windows DPI 下悬浮球停靠问题，并打磨首页快捷操作和 PPT 向导导航。[#3126](https://github.com/netease-youdao/LobsterAI/pull/3126) · [#3124](https://github.com/netease-youdao/LobsterAI/pull/3124) · [#3129](https://github.com/netease-youdao/LobsterAI/pull/3129)
- **发布分支处理：**`Release/2026.11.17` PR 已关闭，但无摘要，无法判断具体变更及其与新版本的对应关系。[#3133](https://github.com/netease-youdao/LobsterAI/pull/3133)

**整体判断：**本期进展更偏向“恢复迁移前能力、补齐端到端链路”，而不是单纯增加新工具。覆盖范围较广，但实际完成度仍需结合合并记录、发布包含关系及回归测试确认。

## 4. 社区热点

**无法建立可靠的讨论热度排名。**本期没有 Issue 更新，13 条 PR 的评论数均缺失，已提供的 👍 数均为 0；这不代表没有讨论，也不能据此判断用户满意度。

从开发活动密度看，值得关注的议题是：

- **dsh 迁移后的功能一致性：**媒体生成、问答、子智能体等链路集中恢复，反映维护侧正优先消除新旧引擎体验差异。[#3123](https://github.com/netease-youdao/LobsterAI/pull/3123) · [#3125](https://github.com/netease-youdao/LobsterAI/pull/3125) · [#3131](https://github.com/netease-youdao/LobsterAI/pull/3131)
- **历史资产与配置连续性：**图片、人设和会话分叉的修复，体现对迁移后既有工作成果可用性的重视。[#3134](https://github.com/netease-youdao/LobsterAI/pull/3134) · [#3132](https://github.com/netease-youdao/LobsterAI/pull/3132)
- **浏览器能力恢复：**这是本期唯一仍开放的 PR，涉及可访问性树、元素 ID、截图和标签页操作，是值得跟踪的开发议题，而非已证实的社区热议。[#3128](https://github.com/netease-youdao/LobsterAI/pull/3128)

## 5. Bug 与稳定性

本期没有新增 Bug Issue。以下问题来自 PR 描述，**严重程度为按潜在影响作出的分析判断，并非项目官方分级**。

| 优先级 | 问题与潜在影响 | Fix PR 状态 |
|---|---|---|
| 高 | preload 过早设置缩放触发 Electron 回归，可能导致 `ready-to-show` 事件丢失、窗口无法正常显示 | 已有修复 PR，[#3126](https://github.com/netease-youdao/LobsterAI/pull/3126)，已关闭 |
| 高 | 迁移后历史图片不可供模型读取、专家人设文件缺失，影响旧会话及配置可用性 | [#3134](https://github.com/netease-youdao/LobsterAI/pull/3134)、[#3132](https://github.com/netease-youdao/LobsterAI/pull/3132)，已关闭 |
| 中高 | 会话分叉位置或来源序号处理不正确，可能导致分叉上下文与用户选择不一致 | [#3135](https://github.com/netease-youdao/LobsterAI/pull/3135)，已关闭 |
| 中高 | 用户回答、跳过状态或取消信号未正确传递，影响交互式任务继续执行 | [#3131](https://github.com/netease-youdao/LobsterAI/pull/3131)，已关闭 |
| 中高 | dsh 下内置浏览器能力需要恢复，涉及页面理解、操作与截图 | [#3128](https://github.com/netease-youdao/LobsterAI/pull/3128)，**开放中** |
| 中 | 子智能体面板为空，削弱委派任务的可观察性 | [#3123](https://github.com/netease-youdao/LobsterAI/pull/3123)，已关闭 |
| 中 | 多显示器与 Windows DPI 场景下悬浮球停靠位置异常 | [#3124](https://github.com/netease-youdao/LobsterAI/pull/3124)，已关闭 |

**稳定性观察：**修复范围涉及启动、迁移、上下文正确性和任务交互等关键路径。修复活动积极，但应优先核验上述关闭 PR 是否合并、是否随版本发布，以及跨平台回归测试结果。

## 6. 功能请求与路线图信号

本期**没有可确认的用户新功能请求**。从现有 PR 可识别的路线图信号为：

1. **内置浏览器接入 dsh 是近期候选工作。**唯一开放 PR 已覆盖页面结构、截图及 Cowork 活动联动，但是否进入下一版本尚无承诺。[#3128](https://github.com/netease-youdao/LobsterAI/pull/3128)
2. **媒体与个性化工具向 dsh 收敛。**图像、视频及皮肤工具集中推进，显示既有工具链兼容是当前工程重点。[#3125](https://github.com/netease-youdao/LobsterAI/pull/3125) · [#3127](https://github.com/netease-youdao/LobsterAI/pull/3127) · [#3130](https://github.com/netease-youdao/LobsterAI/pull/3130)
3. **创作入口继续向引导式体验发展。**PPT 封面向导与首页快捷操作已出现在发布亮点中，属于较明确的产品方向。[#3129](https://github.com/netease-youdao/LobsterAI/pull/3129) · [版本说明](https://github.com/netease-youdao/LobsterAI/releases/tag/2026.11.20)

## 7. 用户反馈摘要

**缺少可直接引用的真实用户反馈。**本期没有 Issue 更新或评论正文，因此无法提炼用户明确表达的满意、不满或需求。

仅从修复目标可推断，维护侧正在处理的使用场景包括：升级后继续使用历史图片与专家配置、在已有会话中准确分叉、查看子智能体执行过程，以及在多显示器环境中使用桌面悬浮球。上述内容是**工程问题对应的场景分析，不是用户评价或用户原话**。  
依据：[历史图片 #3134](https://github.com/netease-youdao/LobsterAI/pull/3134) · [人设 #3132](https://github.com/netease-youdao/LobsterAI/pull/3132) · [子智能体 #3123](https://github.com/netease-youdao/LobsterAI/pull/3123) · [悬浮球 #3124](https://github.com/netease-youdao/LobsterAI/pull/3124)

## 8. 待处理积压

- **当前可见待处理项：**内置浏览器恢复 PR [#3128](https://github.com/netease-youdao/LobsterAI/pull/3128)，创建于 2026-11-20，仍处于开放状态。它是近期待处理事项，**不能归类为长期积压**。
- **长期未响应事项：**快照不包含历史 Issue/PR 队列、最近维护者回复时间等信息，无法识别长期无人响应的重要条目。[Issue 队列](https://github.com/netease-youdao/LobsterAI/issues) · [PR 队列](https://github.com/netease-youdao/LobsterAI/pulls)
- **建议维护者优先核验：**明确本期 12 条关闭 PR 的合并结果与目标版本，尤其是窗口显示、迁移数据保留和会话正确性修复，避免将“关闭数量”误当作“已交付数量”。[#3126](https://github.com/netease-youdao/LobsterAI/pull/3126) · [#3134](https://github.com/netease-youdao/LobsterAI/pull/3134) · [#3135](https://github.com/netease-youdao/LobsterAI/pull/3135)

**健康度结论：开发活动较活跃、迁移收敛方向清晰；发布交付与稳定性改善程度仍待验证，社区反馈数据不足。**

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报｜2026-11-21

> 数据范围：所提供的过去 24 小时 GitHub 更新快照。Issue #1324 的创建与更新时间标记为 11 月 20 日，本报按其被纳入统计窗口处理；不将其认定为 11 月 21 日新建。

## 1. 今日速览

Moltis 今日更新规模较小，共有 **1 条 Issue、1 条 PR** 活跃，未记录到合并、关闭或新版本发布。主要变化集中在两方面：代理运行的美元成本上限，以及配对节点执行命令时的接口描述一致性。新增成本控制 PR 尚待合并，当前没有可确认已经交付的功能或修复。整体呈现**低活跃度、改进议题明确**的状态，但仅凭单日快照不足以判断长期维护健康度。  
相关：[成本上限 PR #1325](https://github.com/moltis-org/moltis/pull/1325) · [命令执行 Issue #1324](https://github.com/moltis-org/moltis/issues/1324)

## 2. 项目进展

### 已交付进展：本窗口未记录到合并或关闭

今日没有已合并/关闭的重要 PR，因此不能将本日变化视为已进入主分支的功能增量。可见开发进展主要是提出了以下待合并方案：

- **为单次代理运行增加美元成本上限**  
  [PR #1325：`agents: add tools.agent_max_cost_usd per-run USD cap`](https://github.com/moltis-org/moltis/pull/1325)  
  作者 Mattbusel 提出新增 `tools.agent_max_cost_usd`。PR 摘要指出，现有 `tools.agent_max_iterations` 限制的是 provider 调用次数，而不是实际费用；相同调用次数在不同模型、上下文长度下可能产生明显不同的成本。  
  **进展判断：**成本治理已有具体实现提案，但仍为 OPEN；现有摘要不足以确认默认值、费用统计范围、超限行为及兼容性影响。

## 3. 社区热点

本窗口没有形成可验证的高热度讨论：Issue 评论数为 **0**，PR 评论数未提供，两者均为 **0 个 👍**。因此，以下属于关注议题，而非依据互动量确认的“热门话题”。

| 议题 | 可见互动 | 背后诉求 |
|---|---|---|
| [#1325：单次运行美元成本上限](https://github.com/moltis-org/moltis/pull/1325) | 评论数未知，👍 0 | 用货币预算补充迭代次数限制，提高代理运行费用的可预测性。 |
| [#1324：exec 参数描述与配对节点行为不一致](https://github.com/moltis-org/moltis/issues/1324) | 评论 0，👍 0 | 让工具声明与真实执行语义一致，减少用户及模型对执行能力的误判。 |

## 4. Bug 与稳定性

### 1）exec 的“shell command”描述与配对节点执行方式不一致
**严重程度：暂评中等，属于接口契约与执行可靠性问题。**  
链接：[Issue #1324](https://github.com/moltis-org/moltis/issues/1324)

- **报告内容：**`exec` 工具的 `command` 参数被描述为 shell 命令，但配对节点执行路径不使用 shell；报告指向 `crates/tools/src/exec.rs:427` 的参数描述。
- **潜在影响：**若用户或代理据此构造依赖 shell 语义的命令，可能出现预期与实际执行行为不一致。具体受影响语法和失败范围仍需完整复现信息确认。
- **当前状态：**OPEN，0 条评论；**所给数据中未发现对应 fix PR**。
- **风险边界：**现有摘要没有提供崩溃、数据丢失、命令注入或已确认回归的证据，不宜上调为高危安全问题。

## 5. 功能请求与路线图信号

### 运行预算控制是最明确的近期候选方向
[PR #1325](https://github.com/moltis-org/moltis/pull/1325) 表明，项目正在尝试从“限制调用次数”扩展到“限制单次运行费用”。这对使用高价模型、长上下文或多轮代理工作流的场景具有直接价值。

由于已有 OPEN PR，其进入后续版本的可能性比单纯功能建议更具体，但**没有合并、评审或版本排期信息，不能确认会进入下一版本**。建议后续重点观察：

- 预算达到上限后的终止与提示行为；
- 费用计算口径及价格不可用时的处理方式；
- 与 `tools.agent_max_iterations` 的共同生效规则。

另一个潜在修复方向是对齐 exec 的描述与执行行为，但 [Issue #1324](https://github.com/moltis-org/moltis/issues/1324) 暂未显示维护者采用哪一种方案。

## 6. 用户反馈摘要

**本次数据没有可供提炼的 Issue 评论。**以下仅依据 Issue 正文与 PR 提案，不代表广泛社区共识。

- **执行行为的可理解性不足：**[#1324](https://github.com/moltis-org/moltis/issues/1324) 的报告者指出，工具参数描述会引导使用者形成 shell 执行预期，而配对节点实际并非如此。这反映的是接口说明可信度与跨执行路径一致性诉求。
- **次数限制无法替代费用控制：**[#1325](https://github.com/moltis-org/moltis/pull/1325) 提案强调，同样的迭代次数可能带来不同账单。这是贡献者提出的成本治理痛点，尚无评论数据证明其普遍程度。
- **满意度信息不足：**没有可核验的正面评价、修复后反馈或用户满意度变化。

## 7. 待处理积压

当前两条记录均较新，**没有证据可将其归类为长期未响应积压**；同时，数据未覆盖完整历史 Issue/PR，无法评估整体积压规模。

| 待跟进项 | 建议维护者关注 |
|---|---|
| [Issue #1324](https://github.com/moltis-org/moltis/issues/1324) | 确认配对节点执行语义及复现方式，决定修正文档/schema，还是调整执行实现。 |
| [PR #1325](https://github.com/moltis-org/moltis/pull/1325) | 评审成本统计准确性、超限边界行为和测试覆盖，明确是否具备合并条件。 |

**健康度结论：**今日可见活动量有限，但两个议题都指向代理系统的重要工程能力——**执行可靠性与费用可控性**。目前只能确认问题识别与方案提出，尚不能确认修复交付；后续应关注维护者响应、PR 合并及验证结果。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报
**日期：2026-11-21｜统计范围：所提供的过去 24 小时数据**

> **数据口径**：日报沿用 CoPaw 项目名称，但本批条目的仓库路径均为 `agentscope-ai/QwenPaw`，下文链接按原始数据生成。多数条目更新时间为 11 月 20 日；PR 评论数缺失，且未提供评论正文、合并记录或完整历史积压，因此不对讨论内容、合并状态和长期响应情况作额外推断。

## 1. 今日速览

过去 24 小时共有 **8 条 Issue 更新、6 条 PR 更新**，其中 7 条 Issue、5 条 PR 仍处于开放状态，项目呈现较活跃的缺陷反馈与修复节奏。工作重点集中在 **Console 交互、CLI 可用性、Windows 本地进程与配置稳定性**，而非新增功能。CLI 健康检查和工具配置异常均已有对应修复 PR，但仍待合并验证（[#8838](https://github.com/agentscope-ai/QwenPaw/pull/8838)、[#8842](https://github.com/agentscope-ai/QwenPaw/pull/8842)）。本期无新版本发布；唯一关闭的 PR 未提供合并证据，因此当前更适合判断为“修复推进中”，而非“修复已交付”。

## 2. 项目进展

### 已关闭事项：有推进，但交付状态需要核实

- **Windows 配置保存与安装器进程处理 PR 已关闭**：[#8835](https://github.com/agentscope-ai/QwenPaw/pull/8835) 拟为 `agent.json` 原子替换遇到的临时访问、共享及锁错误增加最多两次重试，并在安装器超时或取消时等待子进程退出。目标是减少 Windows 偶发保存失败和安装任务生命周期不一致的问题。**数据仅标记 CLOSED，不能认定已合并或已生效。**
- **Android 平板输入区按钮溢出问题已关闭**：[#8839](https://github.com/agentscope-ai/QwenPaw/issues/8839) 涉及 Chrome 横竖屏下发送按钮难以点击。未提供关闭原因或关联修复，暂不能判断是已修复、重复报告还是其他处理结果。

### 待合并工作的主要推进方向

- **CLI 恢复可用性**：[#8838](https://github.com/agentscope-ai/QwenPaw/pull/8838) 将守护进程健康检查从 `HEAD` 改为 `GET`；[#8837](https://github.com/agentscope-ai/QwenPaw/pull/8837) 则选择清理已弃用的 Mission CLI 实现，而不是继续修补旧命令。
- **本地运行与长时间运行稳定性**：[#8841](https://github.com/agentscope-ai/QwenPaw/pull/8841) 处理后端崩溃后残留的 `llama-server.exe`；[#8834](https://github.com/agentscope-ai/QwenPaw/pull/8834) 在响应路由容量耗尽时回收陈旧路由，避免渠道持续无法接收新响应。

**整体判断**：修复覆盖面较广，但本期没有可确认的合并或发布成果，项目进展主要体现在问题定位和补丁准备阶段。

## 3. 社区热点

本批 Issue 合计 **9 条评论、全部 0 个 👍**，讨论量较低，尚未形成高热度议题；PR 评论数缺失，无法参与热度排名。

| 议题 | 可见热度 | 背后的诉求 |
|---|---:|---|
| [Android 平板按钮溢出 #8839](https://github.com/agentscope-ai/QwenPaw/issues/8839) | 2 条评论，本批最高 | 移动端需要保证输入区和发送按钮始终可操作；该 Issue 已关闭，仍需确认处理结果。 |
| [Markdown 表格溢出 #8845](https://github.com/agentscope-ai/QwenPaw/issues/8845) | 1 条评论 | 助手生成的结构化内容必须可完整阅读，宽表格需要横向滚动能力。 |
| [会话列表无法键盘滚动 #8844](https://github.com/agentscope-ai/QwenPaw/issues/8844) | 1 条评论 | 无鼠标及键盘优先场景需要基本可访问性支持。 |
| [环境变量 API 文档误导 #8843](https://github.com/agentscope-ai/QwenPaw/issues/8843) | 1 条评论 | 文档不仅供人阅读，也会影响指导型智能体的操作建议，必须明确覆盖更新与局部修改的区别。 |

## 4. Bug 与稳定性

以下为按**潜在影响**排序的建议优先级，并非维护者正式定级。

| 优先级 | 问题及影响 | 修复状态 |
|---|---|---|
| **高** | [环境变量更新语义不清 #8843](https://github.com/agentscope-ai/QwenPaw/issues/8843)：报告称文档使指导智能体建议使用 `PUT`，导致其他环境变量被删除，存在配置丢失风险。 | **未见对应 fix PR**。建议优先补充覆盖语义、操作示例及风险提示。 |
| **高** | [CLI 健康检查误判 #8832](https://github.com/agentscope-ai/QwenPaw/issues/8832)：正常服务对 `HEAD /api/version` 返回 405，被误判为不可用，阻断自动生成的 CLI 命令。 | 已有 [#8838](https://github.com/agentscope-ai/QwenPaw/pull/8838)，**待合并**。 |
| **高** | [含 password 组件的工具配置页循环刷新 #8836](https://github.com/agentscope-ai/QwenPaw/issues/8836)：影响配置页面正常使用。 | 已有相关 [#8842](https://github.com/agentscope-ai/QwenPaw/pull/8842)，处理加载配置时误触发自动保存；**完整解决效果待验证**。 |
| **中高** | 后端崩溃后本地模型进程残留：可能持续占用系统资源。 | [#8841](https://github.com/agentscope-ai/QwenPaw/pull/8841) **待合并**，关联的问题 #8830 未包含在本批 Issue 明细中。 |
| **中高** | 响应路由达到容量上限后无法继续接受新响应，影响渠道持续运行。 | [#8834](https://github.com/agentscope-ai/QwenPaw/pull/8834) **待合并**，包含旧检查点时间戳兼容处理。 |
| **中** | [Mission CLI 重复 `/api` 前缀 #8833](https://github.com/agentscope-ai/QwenPaw/issues/8833)：请求落到错误路径。 | [#8837](https://github.com/agentscope-ai/QwenPaw/pull/8837) 拟删除弃用实现；仍开放，带有 `invalid`、`Under Review` 标签，需确认最终处置。 |
| **中** | [键盘无法滚动会话 #8844](https://github.com/agentscope-ai/QwenPaw/issues/8844)、[表格超出消息边界 #8845](https://github.com/agentscope-ai/QwenPaw/issues/8845)。 | **均未见对应 fix PR**。 |
| **低** | [LICENSE 文本疑似多余单词 #8840](https://github.com/agentscope-ai/QwenPaw/issues/8840)。 | **未见对应 fix PR**；应先核对标准许可证文本再修改。 |

此外，[Windows 保存与安装器问题 #8835](https://github.com/agentscope-ai/QwenPaw/pull/8835) 和 [Android 按钮溢出 #8839](https://github.com/agentscope-ai/QwenPaw/issues/8839) 虽已关闭，但仍需核实是否真正修复。现有数据未提供足够版本对比，不能将上述问题确认为新引入的回归。

## 5. 功能请求与路线图信号

本批数据**没有明确的独立新功能请求**，路线图信号以可靠性和体验补齐为主：

- **近期候选：CLI 与配置页修复。** [#8838](https://github.com/agentscope-ai/QwenPaw/pull/8838)、[#8842](https://github.com/agentscope-ai/QwenPaw/pull/8842) 已有范围较小的补丁，是较明确的近期修复候选，但尚无下一版本承诺。
- **运行时治理受到重视。** [#8841](https://github.com/agentscope-ai/QwenPaw/pull/8841)、[#8834](https://github.com/agentscope-ai/QwenPaw/pull/8834) 指向进程清理、容量回收和长期运行可靠性。
- **旧能力可能收缩而非增强。** [#8837](https://github.com/agentscope-ai/QwenPaw/pull/8837) 体现清理弃用 Mission CLI 的方向，不应解读为恢复其功能。
- **可访问性与内容展示存在补齐需求。** [#8844](https://github.com/agentscope-ai/QwenPaw/issues/8844)、[#8845](https://github.com/agentscope-ai/QwenPaw/issues/8845) 提供了明确需求，但目前尚无实现 PR，进入下一版本的确定性较低。

## 6. 用户反馈摘要

**未提供评论正文，以下仅依据 Issue 描述提炼，不代表对评论内容的归纳。**

- **“能看到但用不了”的交互障碍突出**：平板发送按钮难以点击、宽表格列不可见、键盘无法滚动，分别影响触屏、数据阅读及无鼠标使用场景。[#8839](https://github.com/agentscope-ai/QwenPaw/issues/8839) · [#8845](https://github.com/agentscope-ai/QwenPaw/issues/8845) · [#8844](https://github.com/agentscope-ai/QwenPaw/issues/8844)
- **用户期待无操作就无副作用**：打开配置弹窗不应自动写回配置，更不应触发循环刷新。[#8836](https://github.com/agentscope-ai/QwenPaw/issues/8836) · [#8842](https://github.com/agentscope-ai/QwenPaw/pull/8842)
- **自动化入口需要与实际服务契约一致**：错误的 HTTP 方法和路径前缀，会让服务正常却无法通过 CLI 使用。[#8832](https://github.com/agentscope-ai/QwenPaw/issues/8832) · [#8833](https://github.com/agentscope-ai/QwenPaw/issues/8833)
- **智能体指导的可信度依赖文档精确度**：配置文档中的简略 API 说明可能转化为有破坏性的操作建议。[#8843](https://github.com/agentscope-ai/QwenPaw/issues/8843)

本批未提供明确的正向满意度反馈，不能据此判断整体用户满意度升降。

## 7. 待处理积压

本批条目均较新，**无法识别“长期未响应”积压**。建议维护者优先跟踪以下未闭环事项：

1. **配置丢失风险优先分诊**：为 [#8843](https://github.com/agentscope-ai/QwenPaw/issues/8843) 明确文档修复责任人，并核查是否需要额外的接口防误用措施。
2. **未见补丁的 Console 问题**：为 [#8844](https://github.com/agentscope-ai/QwenPaw/issues/8844)、[#8845](https://github.com/agentscope-ai/QwenPaw/issues/8845) 补充复现测试与修复计划。
3. **厘清评审状态**：说明 [#8837](https://github.com/agentscope-ai/QwenPaw/pull/8837) 的 `invalid` 标签与当前删除方案是否一致，并同步关联 Issue 的处置预期。
4. **核实关闭结果**：为 [#8835](https://github.com/agentscope-ai/QwenPaw/pull/8835)、[#8839](https://github.com/agentscope-ai/QwenPaw/issues/8839) 补充合并、替代修复或关闭原因，形成可追踪闭环。

**健康度结论**：项目具有积极的缺陷发现和补丁响应能力，但发布交付证据不足。近期最重要的不是扩展功能，而是完成高影响修复的评审、验证和状态闭环。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：2026-11-21**  
**数据范围：所提供的过去 24 小时 GitHub 更新记录**

## 1. 今日速览

过去 24 小时，ZeroClaw 有 **8 条 Issue、12 条 PR 更新**，均处于开放状态，未记录 Issue 关闭、PR 合并或关闭，也没有新版本发布。开发提案较活跃，工作重心集中在[代码与仓库清理](https://github.com/zeroclaw-labs/zeroclaw/issues/12613)、[本地 LLM 响应缓存退役](https://github.com/zeroclaw-labs/zeroclaw/pull/12612)，以及 MCP、CI 和依赖安全修复。本期可见讨论较少：Issue 合计仅 1 条评论、点赞均为 0，PR 评论数未提供，不能据此判断评审热度。整体表现为**变更供给活跃、交付仍待验证**；尤其需要关注高风险重构与安全补丁的评审进展。

## 2. 项目进展

### 已交付进展：本期没有合并记录

本期 **合并/关闭 PR 为 0**，因此不能将以下改动视为已进入主分支或已对用户生效。项目的主要进展体现为形成了较完整的清理与修复方案，而非已完成交付。

| 方向 | 待合并进展 | 意义与注意事项 |
|---|---|---|
| 仓库清理 | [#12618](https://github.com/zeroclaw-labs/zeroclaw/pull/12618) 拟删除 69 个产物、失效脚本等文件，并调整相关导航和路径规则 | 有望减少维护噪声，需确认文档与工作流引用完整 |
| 前端精简 | [#12617](https://github.com/zeroclaw-labs/zeroclaw/pull/12617) 拟删除 165 个未使用英文键及其翻译，共涉及 31 个语言块、4,756 条条目 | 减少国际化维护负担，不代表新增界面能力 |
| Rust 源码整理 | [#12615](https://github.com/zeroclaw-labs/zeroclaw/pull/12615) 拟删除 70 个未被 crate 编译的源码文件；[#12616](https://github.com/zeroclaw-labs/zeroclaw/pull/12616) 移除无使用者的根模块 | 降低源码检索与评审成本；后者带有破坏性变更标记和 `risk:high` 标签 |
| 缓存退役 | [#12612](https://github.com/zeroclaw-labs/zeroclaw/pull/12612) 拟移除几乎不命中的本地 LLM 响应缓存 | 属于功能收缩与配置简化，带有破坏性变更标记；合并后需关注旧配置迁移说明 |
| 身份认证设计 | [#12608](https://github.com/zeroclaw-labs/zeroclaw/pull/12608)、[#12609](https://github.com/zeroclaw-labs/zeroclaw/pull/12609) 提议补充 ADR-016 例外，覆盖 Okta/Entra ID 令牌兼容及守护进程持有 OIDC refresh grant | 当前是文档与架构约束层面的推进，不等同于功能已上线；#12609 依赖 #12608 |

**进展判断：**本期主要在降低技术债、修复集成边界问题。清理规模较大，但实际收益仍取决于测试、评审和后续合并结果。

## 3. 社区热点

### 代码与文档“去冗余”是最明显的工作焦点

[#12613 清理追踪 Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/12613) 是本期唯一有评论的 Issue，**1 条评论、0 个点赞**。其目标包括删除不可达代码、无法生效的功能和配置，以及误导性注释、闲置文档与脚本；同一作者提交的多项清理 PR 表明，这已从倡议进入具体实施阶段。

背后的诉求是提升仓库可理解性，避免贡献者把历史残留代码误认为仍在运行的实现。不过，当前数据不足以称其为“广泛热议”。

### 记忆可靠性与工具完整性体现直接用户需求

- [#12607 记忆召回与纠错问题](https://github.com/zeroclaw-labs/zeroclaw/issues/12607)：涉及“已有事实未召回、错误答案被保存、纠正后新旧版本并存”，直接影响个人助手的可信度。
- [#12614 浏览器缺少文件上传动作](https://github.com/zeroclaw-labs/zeroclaw/issues/12614)：指出底层 CLI 有上传能力，但上层工具未暴露，导致需要附件的表单流程无法完成。

两项均为 **0 评论、0 点赞**，应视为值得关注的使用反馈，而非已验证的社区共识。PR 评论字段缺失，本期无法可靠评选“讨论最多的 PR”。

## 4. Bug 与稳定性

以下按已知严重性及潜在影响排序；未标注官方等级的项目采用影响判断，不视为项目正式定级。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **高：安全依赖** | `wasmtime-wasi` 被报告存在 Windows 下通过盘符前缀路径组件逃逸 WASI 文件系统沙箱的问题；PR 摘要注明 **RUSTSEC-2026-0587、CVSS 7.5**，且已导致 `cargo audit` CI 失败 | [#12610](https://github.com/zeroclaw-labs/zeroclaw/pull/12610) 拟升级至 48.0.10，**待合并**；不能据此推断所有部署均可被利用 |
| **较高：记忆正确性** | 已保存事实召回失败，并保存错误回答；纠正后仍保留冲突版本，可能影响后续回答 | [Issue #12607](https://github.com/zeroclaw-labs/zeroclaw/issues/12607)，本期未见对应 fix PR |
| **S2：配置能力退化** | `a2a.client.peers` 在 config set/patch 中被解析到错误前缀，无法通过这些配置入口创建或编辑 peer | [Issue #12606](https://github.com/zeroclaw-labs/zeroclaw/issues/12606)，本期未见对应 fix PR |
| **S2：工具结果重复** | FastMCP 工具返回字符串时，文本与结构化包装仍可能重复传入模型，增加上下文冗余 | [Issue #12604](https://github.com/zeroclaw-labs/zeroclaw/issues/12604)；已有 [fix PR #12605](https://github.com/zeroclaw-labs/zeroclaw/pull/12605)，待合并 |
| **流程阻塞：CI 风险报告** | 删除文件的 PR 因文件证据无法绑定 head SHA 而被风险报告拒绝，可能影响当前清理工作 | 已有 [fix PR #12600](https://github.com/zeroclaw-labs/zeroclaw/pull/12600)，拟使用 merge-base 绑定删除文件证据，待合并 |
| **S3：CI 判定基准不一致** | test-only proof 从 `base.sha` 读取源码，但待验证补丁基于 merge-base，可能造成判定失准 | [Issue #12601](https://github.com/zeroclaw-labs/zeroclaw/issues/12601)；已有 [fix PR #12602](https://github.com/zeroclaw-labs/zeroclaw/pull/12602)，待合并 |

本期未提供明确的进程崩溃报告。稳定性风险主要落在**安全边界、记忆一致性、工具结果处理与 CI 可靠性**。

## 5. 功能请求与路线图信号

| 需求或方向 | 当前信号 | 纳入后续版本的判断 |
|---|---|---|
| **Telegram 自动确认表情可配置** | [PR #12599](https://github.com/zeroclaw-labs/zeroclaw/pull/12599) 已提出 `ack_reaction_emojis`：单个表情固定使用，多个表情替换默认随机池；省略或空数组保留默认行为 | 已有实现提案，落地路径较明确，但尚无合并或发布承诺 |
| **浏览器文件上传** | [Issue #12614](https://github.com/zeroclaw-labs/zeroclaw/issues/12614) 请求为文件输入框设置本地文件 | 需求明确、底层已有能力，但本期未见对应 PR |
| **WhatsApp 群聊引用回复** | [Issue #12598](https://github.com/zeroclaw-labs/zeroclaw/issues/12598) 希望机器人以 quoted reply 回复，弥补当前提及信息不足的问题 | 对群聊可用性有直接价值，本期未见实现 PR |
| **退役本地 LLM 响应缓存** | [Issue #12611](https://github.com/zeroclaw-labs/zeroclaw/issues/12611) 已有对应 [PR #12612](https://github.com/zeroclaw-labs/zeroclaw/pull/12612)，拟移除缓存及四个配置键并提供迁移提示 | 是较明确的配置简化信号，但属于破坏性调整，仍需等待评审 |

路线图倾向不是单纯扩充功能，而是同时推进**交互可配置、工具补齐和低收益能力退役**。

## 6. 用户反馈摘要

**数据限制：未提供评论正文。**以下依据 Issue 描述提炼，不能冒充评论内容或推断整体满意度。

- **个人助手必须能稳定记住并纠正事实。**Telegram 使用场景中的记忆问题显示，用户不仅需要“存进去”，还需要可靠召回和冲突消解；仅追加一条纠正记录不足以解决体验问题。[#12607](https://github.com/zeroclaw-labs/zeroclaw/issues/12607)
- **自动化价值取决于流程能否完整闭环。**浏览器即使能点击、输入和截图，缺少上传附件仍会阻断整类表单任务。[#12614](https://github.com/zeroclaw-labs/zeroclaw/issues/12614)
- **群聊回复需要明确指向被回复者。**WhatsApp 用户关注的不是是否收到消息，而是能否判断机器人回答了谁。[#12598](https://github.com/zeroclaw-labs/zeroclaw/issues/12598)
- **配置入口应与配置结构保持一致。**A2A peer 配置前缀错误暴露出自动化配置接口与实际配置模型之间的不一致。[#12606](https://github.com/zeroclaw-labs/zeroclaw/issues/12606)

## 7. 待处理积压与维护建议

本期条目均创建于 **11 月 20—21 日**，不足以认定存在“长期未响应”积压；也没有完整历史或评审记录。以下属于**新增待办与短期关注项**：

1. **优先评审安全补丁。**核实受影响平台、依赖版本及升级后的审计结果，尽快明确修复交付安排。[#12610](https://github.com/zeroclaw-labs/zeroclaw/pull/12610)
2. **为记忆问题与 A2A 配置问题补充诊断闭环。**本期未见对应修复 PR，建议确认复现条件、负责人和回归测试范围。[#12607](https://github.com/zeroclaw-labs/zeroclaw/issues/12607)、[#12606](https://github.com/zeroclaw-labs/zeroclaw/issues/12606)
3. **检查 CI 修复与批量删除工作的先后关系。**删除文件证据校验问题可能阻碍仓库清理，应明确是否需要先合并 CI 修复。[#12600](https://github.com/zeroclaw-labs/zeroclaw/pull/12600)、[#12618](https://github.com/zeroclaw-labs/zeroclaw/pull/12618)
4. **避免高风险清理同时堆积。**根模块移除与缓存退役均带高风险或破坏性标记，建议分批验证，并分别说明兼容性与迁移影响。[#12616](https://github.com/zeroclaw-labs/zeroclaw/pull/12616)、[#12612](https://github.com/zeroclaw-labs/zeroclaw/pull/12612)

**健康度结论：**项目具有积极的维护投入和较具体的修复方案，但本期尚未体现为合并交付。下一观察重点应是安全补丁落地、用户正确性问题获得响应，以及大规模清理能否在不引入回归的前提下完成。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*