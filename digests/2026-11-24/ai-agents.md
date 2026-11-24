# OpenClaw 生态日报 2026-11-24

> Issues: 37 | PRs: 62 | 覆盖项目: 13 个 | 生成时间: 2026-11-24 05:45 UTC

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
**日期：2026-11-24｜项目：[openclaw/openclaw](https://github.com/openclaw/openclaw)**

> **数据口径**：活跃度采用所给过去 24 小时汇总；PR 分析仅覆盖展示的 30 条。数据中的 `CLOSED` 不等于已合并，以下不将其直接视为已交付；Release 正文被截断，PR 评论数为 `undefined`，且未提供评论正文，因此无法确认完整变更、PR 热度排名或评论中的用户态度。

## 1. 今日速览

过去 24 小时，OpenClaw 有 **37 条 Issue 更新、62 条 PR 更新及 2 个 Beta 版本发布**，开发活动密集，其中 28 条 Issue 为新开或活跃，44 条 PR 仍待合并。今日工作主要围绕**升级恢复、智能体任务连续性、Control UI 可读性与多模态/语音可靠性**展开，发布重点可见于 [beta.3](https://github.com/openclaw/openclaw/releases/tag/v2026.11.10-beta.3)。稳定性方面，外置数据库回滚、PostgreSQL 迁移后恢复及 Windows 更新激活均出现 P1 报告，说明升级安全仍是当前最需要验证的环节（[#204394](https://github.com/openclaw/openclaw/issues/204394)、[#204363](https://github.com/openclaw/openclaw/issues/204363)、[#204421](https://github.com/openclaw/openclaw/issues/204421)）。整体判断为：**贡献活跃、修复响应较快，但持续集成覆盖和升级边界条件仍对发布信心构成压力**，尤其需要关注定时测试遗漏问题 [#204366](https://github.com/openclaw/openclaw/issues/204366)。

## 2. 版本发布

| 版本 | 已确认更新内容 | 完整性与采用提醒 |
|---|---|---|
| [v2026.11.10-beta.3](https://github.com/openclaw/openclaw/releases/tag/v2026.11.10-beta.3) | 强化包安装及源码更新被中断后的恢复，覆盖跨数据库 Schema 变更及机器重启场景；另有“Reliable delegated work”亮点，但正文缺失。 | 属于 Beta；无法据摘要确认完整任务委派改动、破坏性变更及迁移步骤。 |
| [v2026.11.10-beta.2](https://github.com/openclaw/openclaw/releases/tag/v2026.11.10-beta.2) | 包替换中断时保持 OpenClaw 可运行，并允许崩溃或重启后的下一次更新安全完成；另提及后台工作可靠性，但内容被截断。 | 无法确认相对 beta.3 的完整差异，不宜据此判断所有恢复路径均已修复。 |

**迁移注意事项——基于今日风险报告，而非官方新增迁移要求：**

- **PostgreSQL 部署**：升级前准备数据库备份和恢复预案；报告显示，新版完成迁移后崩溃，即使旧版文件恢复，Gateway 仍可能无法运行。[#204363](https://github.com/openclaw/openclaw/issues/204363)
- **自定义数据库位置**：单独备份状态目录外的 agent 数据库；当前报告指出，这些数据库可能未纳入更新试运行的隔离副本和回滚范围。[#204394](https://github.com/openclaw/openclaw/issues/204394)
- **Windows 部署**：避免更新期间手动重启 Gateway，并关注激活阶段维护模式失败；目前没有已展示的对应 fix PR。[#204421](https://github.com/openclaw/openclaw/issues/204421)

## 3. 项目进展

### 今日已关闭的重要 PR / Issue

以下是**状态推进记录，不代表全部已合并或已随版本发布**。

| 条目 | 推进方向 | 当前可确认状态 |
|---|---|---|
| [PR #204313](https://github.com/openclaw/openclaw/pull/204313) | 修正上下文压缩后的重放历史，避免重试持续写入隐藏用户轮次，改善会话历史一致性。 | PR 已关闭，合并状态未知。 |
| [PR #204325](https://github.com/openclaw/openclaw/pull/204325) | 让未显式配置的 Cyber 模型在 Control UI 之外使用所需的 Daybreak Red 访问计划，针对 `invalid_access_program` 错误。 | PR 已关闭，合并状态未知。 |
| [PR #204397](https://github.com/openclaw/openclaw/pull/204397) | 修复 SQLite 测试支持代码的未绑定方法引用；作者摘要称核心 lint 检查恢复通过。 | PR 已关闭，仍需合并记录确认交付。 |
| [PR #204413](https://github.com/openclaw/openclaw/pull/204413) | 修复 Plugin SDK API 比较对仅运行时导入的误判，改善发布检查。 | PR 已关闭，合并状态未知。 |
| [Issue #204319](https://github.com/openclaw/openclaw/issues/204319) | P1：后台命令完成后 Goal 不再自动推进、必须等待新用户消息。 | Issue 已关闭，所给数据未展示解决依据。 |
| [Issue #204324](https://github.com/openclaw/openclaw/issues/204324) | 固定完整 Git SHA 的合法插件被错误标为来源不可验证。 | Issue 已关闭，修复交付情况待确认。 |

**进展评价**：今日关闭工作触及任务连续性、会话状态、模型接入和发布工具链，具有实际价值；但汇总中的 **18 条“已合并/关闭”无法拆分**，不能据此量化实际合并量。与此同时，关键升级风险仍开放，项目尚不能仅凭高关闭量判断稳定性已明显改善。

## 4. 社区热点

可见 Issue 的最高评论数仅为 **2**，所有展示条目的 👍 均为 **0**，因此更适合识别“问题聚集方向”，而非宣称存在高热度讨论。

- **Gemini 视频附件失效：2 条评论，出现两份候选修复。** 发布包重复定义 `PROVIDER_CONTEXT_HANDOFF`，导致原生视频未传入模型；[Issue #204386](https://github.com/openclaw/openclaw/issues/204386) 对应 [PR #204415](https://github.com/openclaw/openclaw/pull/204415) 与 [PR #204417](https://github.com/openclaw/openclaw/pull/204417)。核心诉求是**已安装构建与源码运行行为一致**，维护者需要协调重复修复及发布包验证。
- **会话观察器与模型输出兼容：2 条评论。** Haiku 输出虽然是合法 JSON，却因回显额外 `revision` 字段而被严格 Schema 拒绝，连续两次后观察器自行停用。诉求是提高结构化输出处理韧性，而非单纯解决 JSON 语法问题。[#203956](https://github.com/openclaw/openclaw/issues/203956)
- **Telegram“已发送却超时”：2 条评论，Issue 已关闭。** 命令 cron 重试造成重复发帖，反映用户需要区分“投递失败”和“确认超时”，并保证重试幂等；关闭原因未提供。[#204338](https://github.com/openclaw/openclaw/issues/204338)
- **聊天工具活动可读性形成集中贡献。** 多个 PR 尝试将内部工具名替换为具体动作，覆盖文件、浏览器、设备、记忆和消息操作。其背后是让用户看懂“智能体做了什么”，提升可监督性，而不仅是视觉优化。[#204402](https://github.com/openclaw/openclaw/pull/204402)、[#204404](https://github.com/openclaw/openclaw/pull/204404)、[#204408](https://github.com/openclaw/openclaw/pull/204408)

## 5. Bug 与稳定性

### P1：优先处理数据安全、服务可用性与关键能力失效

| 问题 | 影响与状态 | 是否有 fix PR |
|---|---|---|
| [#204394](https://github.com/openclaw/openclaw/issues/204394) 外置 agent 数据库未随失败试运行恢复 | **数据损失风险**；隔离环境可能直接写入真实外置数据库。开放。 | 未展示 |
| [#204363](https://github.com/openclaw/openclaw/issues/204363) PostgreSQL 迁移后崩溃无法恢复 Gateway | **服务不可用风险**；回滚文件不足以恢复数据库兼容性。开放。 | 未展示 |
| [#204192](https://github.com/openclaw/openclaw/issues/204192) 旧 Git launcher 执行状态检查触发回滚 | 健康 Gateway 被回退并离线；标签注明 **main 上未复现**，需区分旧版本与当前主线。开放。 | 未展示 |
| [#204421](https://github.com/openclaw/openclaw/issues/204421) Windows 更新激活回滚 | 长时间更新后因维护模式失败而撤销；涉及更新期间 Gateway 重启。开放。 | 未展示 |
| [#204386](https://github.com/openclaw/openclaw/issues/204386) Gemini 原生视频未抵达提供商 | 已安装构建中的关键多模态能力失效；报告明确不是 Beta blocker。开放。 | [#204415](https://github.com/openclaw/openclaw/pull/204415)、[#204417](https://github.com/openclaw/openclaw/pull/204417)，均开放 |
| [#204319](https://github.com/openclaw/openclaw/issues/204319) Goal 在后台任务完成后停滞 | 自主任务推进被打断。已关闭，解决依据未展示。 | 未展示 |

### P2：会话、语音及提供商接入

- **历史图片在后续轮次被错误替换为“请重发”**：影响多轮视觉任务，仍需补充信息；未展示 fix PR。[#204387](https://github.com/openclaw/openclaw/issues/204387)
- **浏览器 split Talk 静音且麦克风不恢复**：音频解锁片段卡住阻塞后续播放；已有开放修复，但标记为需要证明。[Issue #204390](https://github.com/openclaw/openclaw/issues/204390) → [PR #204393](https://github.com/openclaw/openclaw/pull/204393)
- **新会话无法先执行 `/login`、卸载提供商遗留失效默认模型、设置入口丢失提供商选择**：形成接入生命周期上的一组故障，均未展示 fix PR。[#204418](https://github.com/openclaw/openclaw/issues/204418)、[#204419](https://github.com/openclaw/openclaw/issues/204419)、[#204420](https://github.com/openclaw/openclaw/issues/204420)
- **切换提供商后仍沿用旧 runtime**：可能选择错误认证路径；已有开放修复，带兼容性风险标签。[PR #203973](https://github.com/openclaw/openclaw/pull/203973)

### 测试与发布保障风险

- **定时 CI 未覆盖全部测试文件**，且已有三个主线 e2e 失败只在 PR 测试选择中暴露，容易将主线问题误归因于贡献 PR。[#204366](https://github.com/openclaw/openclaw/issues/204366)、[#204331](https://github.com/openclaw/openclaw/issues/204331)
- **Convex 实时传输 QA 最近 100 次定时运行均未成功**，五个消息渠道测试分支持续失败；这是测试信号失效，不应直接推断所有渠道生产环境均不可用。[#204372](https://github.com/openclaw/openclaw/issues/204372)
- **macOS CodeQL 超时、测试分片耗时校准任务近 8 次失败或超时 5 次**，削弱安全扫描完成率及 CI 效率。[#204373](https://github.com/openclaw/openclaw/issues/204373)、[#204374](https://github.com/openclaw/openclaw/issues/204374)

## 6. 功能请求与路线图信号

| 方向 | 需求及实现信号 | 下一版本判断 |
|---|---|---|
| 小模型 Agent Profiles | 按模型规模缩小系统提示与聊天上下文；报告称默认提示可占 32K 窗口约 40%。[Issue #204354](https://github.com/openclaw/openclaw/issues/204354)，[PR #204132](https://github.com/openclaw/openclaw/pull/204132)、[#204133](https://github.com/openclaw/openclaw/pull/204133) | **已有实质实现，但落地不确定**：均为 XL，涉及兼容性和安全审查。 |
| 上下文压缩内联显示 | 将醒目的全宽分隔条改为普通活动记录，减少长会话干扰。[Issue #204356](https://github.com/openclaw/openclaw/issues/204356)、[PR #204358](https://github.com/openclaw/openclaw/pull/204358) | **近期候选较明确**：已等待维护者审阅。 |
| 免手持 Talk 声音提示 | 用声音告知正在监听或通话结束。[Issue #204311](https://github.com/openclaw/openclaw/issues/204311)、[PR #204355](https://github.com/openclaw/openclaw/pull/204355) | 浏览器实现已提出，但仍需验证；不能推断 iOS/macOS 同步交付。 |
| 会话内只读插件助手 | 允许聊天写入者在自己的会话运行辅助插件，不授予通用 Gateway 写权限。[Issue #204405](https://github.com/openclaw/openclaw/issues/204405)、[PR #204411](https://github.com/openclaw/openclaw/pull/204411) | 已有候选实现，但权限边界仍需产品与安全决策。 |
| stdio MCP 重新登录 | 将 URL-mode elicitation 接入 Connect 卡片，解决本地 MCP 登录过期后无法续登。[#204401](https://github.com/openclaw/openclaw/issues/204401) | 未展示实现 PR，尚属需求阶段。 |
| 聊天内 tokens/sec | 为本地模型提供实时或轮次结束后的输出速度指标。[#204334](https://github.com/openclaw/openclaw/issues/204334) | 未展示实现 PR，需维护者产品判断。 |

## 7. 用户反馈摘要

以下来自 **Issue 描述**，而非未提供的评论正文；目前没有足够证据总结正面满意度。

- **“更新失败后应能继续运行”是核心底线。** Windows 用户报告约 25 分钟更新最终回滚；PostgreSQL 和外置数据库用户则面临更高恢复成本，说明升级体验不仅是速度问题，也是状态安全问题。[#204421](https://github.com/openclaw/openclaw/issues/204421)、[#204394](https://github.com/openclaw/openclaw/issues/204394)
- **长会话用户期待媒体记忆保持连续。** 图片本轮可读、后续却要求重发，会打断基于历史材料继续分析的工作流。[#204387](https://github.com/openclaw/openclaw/issues/204387)
- **免手持语音用户需要可感知的系统状态。** 静音、麦克风不恢复和缺少监听提示，会迫使用户回看屏幕，削弱语音助手的使用价值。[#204390](https://github.com/openclaw/openclaw/issues/204390)、[#204311](https://github.com/openclaw/openclaw/issues/204311)
- **错误提示需要给出真实恢复路径。** 通用计费建议掩盖提供商的套餐限制及恢复链接，容易让用户错误排查余额或配额。[#204403](https://github.com/openclaw/openclaw/issues/204403)
- **本地模型用户更关注上下文预算和推理效率。** 精简提示及 tokens/sec 需求共同表明：接入模型之后，用户开始要求可量化的运行效率。[#204354](https://github.com/openclaw/openclaw/issues/204354)、[#204334](https://github.com/openclaw/openclaw/issues/204334)

## 8. 待处理积压

**本批 Issue/PR 大多创建于 11 月 23—24 日，无法证明存在“长期无人响应”的条目。** 更值得提醒维护者的是：部分新报告揭示了长期存在的工程债务。

| 优先级 | 积压信号 | 建议关注 |
|---|---|---|
| 高 | 实时传输 QA 最近 100 次定时运行无成功记录。[#204372](https://github.com/openclaw/openclaw/issues/204372) | 明确负责人，区分产品失败、环境故障和测试失效，恢复可信基线。 |
| 高 | 定时 CI 漏跑测试，主线失败被转嫁到 PR CI。[#204366](https://github.com/openclaw/openclaw/issues/204366)、[#204331](https://github.com/openclaw/openclaw/issues/204331) | 优先建立全文件覆盖检查及明确的失败归属。 |
| 高 | 11 月 17—19 日间部分 Git checkout 更新器无法完成跨数据库迁移更新；候选修复仍等待作者，且为 XL 兼容性变更。[PR #204322](https://github.com/openclaw/openclaw/pull/204322) | 尽快确定支持范围、回归矩阵及用户恢复指引。 |
| 中 | Kova live OpenAI 定时任务自 11 月 12 日以来无成功记录。[#204375](https://github.com/openclaw/openclaw/issues/204375) | 区分执行失败与性能回归，避免长期丧失性能观测。 |
| 低 | 外部文档链接审计自 8 月 31 日以来未通过，报告已明确低优先级暂缓。[#204376](https://github.com/openclaw/openclaw/issues/204376) | 为慢主机设置时限与并发边界，避免反复消耗运行资源。 |

**维护优先级建议**：先保证升级失败不损伤状态、Gateway 可恢复，再修复定时 CI 的覆盖与可信度，最后推进 UI 可读性和新增能力。当前项目的主要瓶颈不是贡献数量，而是如何将密集贡献转化为**可验证、可安全发布的交付**。

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向分析
**日期：2026-11-24｜核心参照：OpenClaw**

> **口径说明**：以下基于所给 24 小时快照，Issues、PR 数均指更新条目数，不代表新增量；`CLOSED` 不等于已合并。部分项目仅展示部分条目，发布说明及评论正文也不完整，因此健康度判断侧重风险与交付信号，不等同于长期质量排名。

## 1. 生态全景

本次覆盖的 **13 个项目共记录 110 条 Issue 更新、164 条 PR 更新和 3 个预发布版本**，活动主要集中在 OpenClaw 与 Hermes Agent，两者合计贡献约 **77% 的 PR 更新量**。生态的共同重心正在从“增加模型和工具入口”转向“长时间运行、故障恢复、可靠投递与状态可观察性”。与此同时，多会话控制台、企业 IM、远程文件和垂直 MCP 服务仍在扩张，说明产品边界正从聊天助手走向工作流执行平台。当前最突出的约束不是功能供给不足，而是**如何将修复提案转化为经过验证、可安全升级的版本交付**。

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release 情况 | 当日健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 37 | 62 | 2 个 Beta | 活跃度最高；升级恢复、数据状态与 CI 可信度承压 |
| **Hermes Agent** | 50 | 50 | 1 个 Canary | 反馈与贡献密集；长时运行、恢复重复执行及资源泄漏风险突出 |
| **NanoBot** | 3 | 13 | 无 | 集中打磨消息与会话质量；13 条 PR 来自同一贡献者，维护力量集中 |
| **LobsterAI** | 1 | 13 | 无 | DSH 迁移修复密集；启动与企业微信修复交付待核实 |
| **ZeroClaw** | 7 | 11 | 无 | 功能扩展与工程治理并进；安全检查阻塞影响交付确定性 |
| **NanoClaw** | 2 | 9 | 无 | 依赖加固为主；7 条机器人 PR，人工评审与合并进展待观察 |
| **CoPaw** | 10 | 5 | 无 | 反馈活跃；小修复已有响应，流式恢复与记忆问题尚无可见 fix |
| **NullClaw** | 0 | 1 | 无 | 聚焦 MCP 生命周期修复；存在潜在内存安全风险，尚待验证 |
| PicoClaw | 0 | 0 | 无 | 窗口内无活动，不能据此判断长期健康度 |
| IronClaw | 0 | 0 | 无 | 同上 |
| TinyClaw | 0 | 0 | 无 | 同上 |
| Moltis | 0 | 0 | 无 | 同上 |
| ZeptoClaw | 0 | 0 | 无 | 同上 |
| **合计** | **110** | **164** | **3 个预发布版本** | 活动集中，已验证交付证据有限 |

**数据识别提醒**：NanoClaw 条目指向 `nanocoai/nanoclaw`，与标题仓库路径不同；CoPaw 条目指向 `agentscope-ai/QwenPaw`。两者仓库关系未核实，正式选型前应确认。

## 3. OpenClaw 在生态中的定位

### 优势：广覆盖的平台型路线

OpenClaw 的可见工作同时覆盖数据库迁移、Gateway、任务委派、多模型、多模态、语音、插件权限和 Control UI，呈现出较强的**综合助手平台**特征。

- **贡献吞吐领先**：62 条 PR 更新，高于 Hermes 的 50 条，明显高于其余项目。
- **产品面覆盖广**：既处理底层状态安全，也改善用户对工具活动、语音状态和上下文压缩的理解。
- **发布活动明确**：当日两个 Beta 均强调更新中断后的恢复，说明升级可靠性已经成为显式发布目标，而不只是零散修复。

### 技术路线与同类的差异

| 对比对象 | OpenClaw 的相对特点 |
|---|---|
| Hermes Agent | 两者都面向复杂自主任务；OpenClaw 今日更聚焦跨数据库升级与恢复，Hermes 更突出多 Profile、长时运行和进程/会话管理 |
| NanoBot | OpenClaw 覆盖更多基础设施与接入边界；NanoBot 当日更集中于消息完整性和多项目会话体验 |
| LobsterAI | OpenClaw 更像通用助手基础平台；LobsterAI 更侧重桌面 Cowork、企业 IM 与 DSH 迁移后的产品体验 |
| ZeroClaw | OpenClaw 更强调完整助手体验；ZeroClaw 当日更突出 Rust runtime 治理、受限远程文件访问及构建可靠性 |

### 社区规模：只能确认当日活跃度领先

OpenClaw 与 Hermes 是本窗口的第一梯队，但不能据此认定谁拥有更大的长期社区。当前缺少独立贡献者数、活跃安装量、维护者响应时间和真实合并吞吐；尤其 Hermes 的 Issue 更新更多，可能同时反映使用广度与故障报告压力。

**核心判断**：OpenClaw 的优势在于广覆盖与高贡献吞吐，其代价是更复杂的兼容矩阵。升级安全和回归验证能力，将决定平台广度能否转化为可靠性优势。

## 4. 共同关注的技术方向

| 共同方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **故障恢复与任务连续性** | OpenClaw、Hermes、NanoBot、CoPaw | 升级失败可恢复、崩溃后不重复执行、空回复不误报成功、流中断后有恢复策略 |
| **消息交付完整性与重试语义** | OpenClaw、Hermes、NanoBot、NanoClaw、CoPaw | 区分发送成功与确认超时；避免最终消息丢失、附件后正文缺失、卡片被拒绝和流式回答截断 |
| **长期运行与状态管理** | Hermes、OpenClaw、NanoBot、CoPaw | 控制会话与内存积累，保证后台任务推进、上下文统计准确及记忆后端实际生效 |
| **MCP 集成可靠性** | OpenClaw、Hermes、NanoBot、NullClaw、CoPaw、LobsterAI | 续登、进程隔离、元数据展示、共享对象生命周期、错误保真及 OAuth 接入 |
| **可观察、可监督的交互** | OpenClaw、NanoBot、Hermes、LobsterAI | 用具体动作解释工具执行，展示并发任务状态、运行进度和通道连接状态 |
| **权限与凭据边界** | OpenClaw、ZeroClaw、LobsterAI、Hermes | 会话级最小权限、限定远程目录、显式高权限确认、按入口控制记忆能力 |
| **本地模型与资源效率** | OpenClaw、NanoBot、Hermes | 精简提示、区分上下文与累计用量、显示推理速度、正确识别本地硬件资源 |
| **CI 与依赖治理** | OpenClaw、ZeroClaw、NanoClaw、CoPaw、LobsterAI | 补齐测试覆盖、恢复可信基线、处理安全依赖、校验跨版本及开发环境兼容性 |

这些方向的共同含义是：**智能体的竞争单位正在从“一次模型调用”变为“完整任务生命周期”。**

## 5. 差异化定位分析

以下“目标用户”是根据当日功能信号推断，并非官方定位；技术架构仅列快照可确认内容。

| 项目 | 功能侧重与目标用户信号 | 可见技术架构特征 |
|---|---|---|
| **OpenClaw** | 需要多入口、语音、多模态和持续任务的综合助手用户及自托管运营者 | Gateway、Control UI、插件 SDK、多数据库状态管理 |
| **Hermes Agent** | 多 Profile、多代理、后台自动化与本地推理重度用户 | Gateway + Desktop，cron、插件与 MCP 子进程管理 |
| **NanoBot** | 需要管理多项目、并发会话和文件交付的用户 | WebUI、运行器、目标与会话管理；大型控制台改版仍为提案 |
| **LobsterAI** | 桌面办公、企业协作和垂直业务服务用户 | DSH 后端、Cowork 桌面交互、原生企业 IM 通道 |
| **ZeroClaw** | 关注部署控制、远程文件工作流和工程可维护性的开发者 | Rust crate/runtime 模块化；WebDAV 目录与独立加密授权提案 |
| **NanoClaw** | 使用容器化 Agent 与多通道能力的部署维护者 | Hardened Agent 镜像、Anthropic SDK、SQLite 及技能固定依赖 |
| **CoPaw** | 使用 Console、本地模型、记忆和定时任务的助手用户 | 模型与记忆插件化、多记忆后端、流式响应与 MCP 接入 |
| **NullClaw** | 当日主要体现 MCP 工具定制场景 | 多工具共享 `McpServer`；正在修正引用计数与所有权管理 |

其余五个无活动项目，本窗口不足以支持功能与架构定位。**项目名称中的 Nano、Pico、Tiny、Zero 等不能替代实际资源占用和架构证据。**

## 6. 社区热度与成熟度

### 活跃度分层

- **高强度迭代：OpenClaw、Hermes Agent**  
  两者合计 87 条 Issue、112 条 PR 更新。复杂工作流带来大量边界问题，属于功能扩展与可靠性治理同步发生的阶段。

- **专项迭代与质量巩固：NanoBot、LobsterAI、ZeroClaw、CoPaw**  
  NanoBot 主要巩固消息和会话体验；LobsterAI 收敛架构迁移风险；ZeroClaw 同时推进功能与工程治理；CoPaw 则面临核心可靠性分诊和小修复交付的双重任务。

- **维护型活动：NanoClaw、NullClaw**  
  前者依赖机器人维护占比较高，后者仅有一个针对性修复。PR 数不能直接解释为人工社区活跃度。

- **单日静默：PicoClaw、IronClaw、TinyClaw、Moltis、ZeptoClaw**  
  无法判断是迭代间歇、维护模式还是活跃度下降，需要更长时间序列。

### 热度不等于成熟度

可见 Issue 的最高评论数仅为 **3**，各摘要展示条目的点赞均为 0，PR 评论数普遍缺失。因此，本日更适合讨论**工程活动密度**，而非大众社区热度。

成熟度更值得观察的指标是：

1. 高影响问题是否有责任人、测试与明确交付版本；
2. 恢复流程是否保护数据、避免重复副作用；
3. CI 是否稳定且覆盖真实发布路径；
4. 关闭 Issue、合并代码与发布版本之间是否形成可追踪链路。

按这些标准，目前没有足够证据将任何项目直接评为“已成熟稳定”；高活跃项目同样存在重要可靠性缺口。

## 7. 值得关注的趋势信号

### ① 自主智能体正在进入“事务与恢复语义”阶段
OpenClaw 的数据库回滚、Hermes 的崩溃后重复执行、Telegram 的确认超时重试，表面不同，实质都涉及状态与外部副作用的一致性。

**开发参考**：优先设计持久化执行记录、幂等键、确认状态和补偿路径，而不是简单增加重试次数。

### ② “成功”的定义开始从生成文本转向完成交付
NanoBot 拟将空回复标记为结构化失败；多项目暴露附件、正文和最终投递缺失问题。

**开发参考**：分别记录模型生成、工具执行、渠道投递和用户可见结果，避免以 HTTP 成功或运行器退出作为任务完成的唯一依据。

### ③ MCP 的重点从“能连接”转向“可运营”
续登、OAuth、错误保真、进程隔离和对象生命周期问题同时出现，说明接入标准化之后，运维质量成为下一道门槛。

**开发参考**：把认证续期、资源回收、权限隔离和错误分类纳入 MCP 接入验收，而不只测试工具列表与调用成功。

### ④ 多代理产品需要控制台，而不只是聊天框
NanoBot 的 Mission Control 提案、Hermes 的任务进度诉求、OpenClaw 的工具动作可读性改进，均指向更强的任务监督界面。

**开发参考**：为任务提供独立身份、状态、进度、结果入口和停止控制，减少对聊天历史的依赖。

### ⑤ 本地模型优化开始进入产品层
上下文预算、提示占用、tokens/sec 和硬件识别问题，说明“支持本地模型”已不再等于“提供兼容接口”。

**开发参考**：按模型能力提供提示与工具配置，明确区分上下文占用、累计 token 和推理吞吐。

### ⑥ 企业化扩张与最小权限需要同步推进
LobsterAI 的企业 IM、爱企查合作意向，以及 ZeroClaw 的受限远程文件访问，显示业务执行范围正在扩大。

**开发参考**：优先建设可审计授权、限定资源范围和凭据隔离；第三方合作意向应与真实终端需求、已交付能力分别评估。

---

**决策结论**：OpenClaw 与 Hermes 值得作为综合自主助手平台重点跟踪；NanoBot、LobsterAI、ZeroClaw 和 CoPaw 分别提供会话管理、企业办公、受控工具执行及插件化助手的差异化观察样本。近期选型应将**升级可恢复性、长时运行表现、投递一致性和修复交付证据**置于功能数量之前——这比单日 PR 排名更能预测实际部署成本。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报
**日期：2026-11-24｜项目：[HKUDS/nanobot](https://github.com/HKUDS/nanobot)**

> **统计口径**：基于提供的 GitHub 快照。PR 的 `CLOSED` 状态不等同于已合并，下文统一按“已关闭”描述，相关改动是否进入主分支仍需核实。PR 评论数为 `undefined`，不能视为零评论。

## 1. 今日速览

过去 24 小时，NanoBot 有 **3 条 Issue 更新、13 条 PR 更新**，其中 2 条 PR 仍开放、11 条已关闭，开发活跃度较高。工作重点集中在 **WebUI 消息完整性、会话交互和运行异常处理**，属于以可靠性与体验打磨为主的一天。全部 13 条 PR 均由同一位贡献者提交，体现持续推进能力，也提示评审与维护力量相对集中。今日没有新版本发布；社区讨论热度暂不高，已知 Issue 合计仅 1 条评论，尚不足以判断广泛用户共识。  
[项目仓库](https://github.com/HKUDS/nanobot) · [PR 列表](https://github.com/HKUDS/nanobot/pulls) · [Issue 列表](https://github.com/HKUDS/nanobot/issues)

## 2. 项目进展

### 消息交付与会话可靠性

| 重要 PR | 状态 | 进展与实际意义 |
|---|---|---|
| [#6766 附件后继续显示流式回答](https://github.com/HKUDS/nanobot/pull/6766) | 已关闭 | 处理“附件和说明正常显示，但随后正文丢失”的问题，覆盖实时展示与历史回放，对应用户报告 [#6764](https://github.com/HKUDS/nanobot/issues/6764)。这是今日最直接影响回答完整性的修复方向。 |
| [#6775 预设切换草稿、命令确认与通知清理](https://github.com/HKUDS/nanobot/pull/6775) | 已关闭 | 避免重试预设切换时产生仅含内部命令的可见会话，同时处理慢速通道下 `/restart` 确认丢失及 Dream 通知留下轮次序列记录的问题。 |
| [#6767 展开目标面板显示全文](https://github.com/HKUDS/nanobot/pull/6767) | 已关闭 | 目标快照传输完整 objective、summary 和 recap，解决目标正文在 600 字符后被截断、重连后仍不完整的问题。 |
| [#6770 修正诊断与过时说明](https://github.com/HKUDS/nanobot/pull/6770) | 已关闭 | cron 存储损坏时，按备份重命名实际成功或失败报告结果，避免恢复提示声称“已备份”却并未完成。重点是提高故障诊断可信度，并非消除存储损坏本身。 |

### WebUI 细节与 MCP 可观测性

- **消息布局更一致**：[#6776](https://github.com/HKUDS/nanobot/pull/6776) 调整自动触发回复与普通回复的对齐；[#6772](https://github.com/HKUDS/nanobot/pull/6772) 减少子智能体历史刷新时的跳动；[#6771](https://github.com/HKUDS/nanobot/pull/6771) 统一会话分叉与上下文压缩分隔线样式。
- **操作与信息展示更简洁**：[#6768](https://github.com/HKUDS/nanobot/pull/6768) 移除时间戳重复弹层；[#6762](https://github.com/HKUDS/nanobot/pull/6762) 按聊天面板实际宽度安排消息操作按钮，更适合多窗格场景。
- **MCP 工具身份更清晰**：[#6769](https://github.com/HKUDS/nanobot/pull/6769) 读取标准初始化响应中的服务图标，减少自定义 MCP 服务统一显示默认插头图标的情况。
- **测试维护成本下降**：[#6763](https://github.com/HKUDS/nanobot/pull/6763) 整合 86 个测试文件中的重复覆盖，静态测试声明由 **12,185 降至 12,029**，净减少 156 个；摘要明确不修改生产代码、覆盖率门槛或 CI 选择规则，不能据此推断覆盖质量下降。

**整体判断**：今日主要是增量质量提升，而非已确认落地的架构升级；改动集中改善复杂智能体工作流中“能否完整看到结果、能否信任状态、能否顺畅管理会话”。上述收益仍取决于 PR 是否实际合并。

## 3. 社区热点

### 唯一有已知评论的 Issue：上下文占用统计失真
**[#6774 `/status` 将轮次累计输入误作当前上下文](https://github.com/HKUDS/nanobot/issues/6774)**  
状态：开放｜评论：**1**｜👍：0

当提示词估算返回零或抛错时，`/status` 回退使用 `last_usage.input_tokens`；但该字段累计了同一轮多次模型请求的输入。因此，工具调用较多时，界面可能显示超过模型输入预算的“上下文占用”。

**背后诉求**：用户需要区分“累计处理量”和“当前上下文大小”，以便可靠判断是否需要压缩上下文、切换模型或排查异常。

### 其他值得关注、但不能称为高讨论热度的议题

- **自动化中的模型拒答与工具调用中断**：[Issue #6765](https://github.com/HKUDS/nanobot/issues/6765) 请求内置 bf16.ai 网关，反映无人值守任务对连续执行和结构化工具调用的需求。该 Issue 已关闭，0 评论、0 点赞；关闭原因及功能是否接受均未知。
- **多项目、并发智能体的会话管理**：[PR #6761](https://github.com/HKUDS/nanobot/pull/6761) 提出 Mission Control、Live Pulse 和 Active Drawer，是当前最显著的产品形态变化信号，但缺少评论数据，无法判断社区接受度。

## 4. Bug 与稳定性

以下按**潜在用户影响**排序，并非官方严重性评级；提供的数据未显示安全漏洞或明确的数据破坏事件。

| 优先关注程度 | 问题与影响 | 当前状态 / Fix PR |
|---|---|---|
| **较高** | **附件后正文丢失**：实时展示及历史回放均可能遗漏回答，直接影响用户获得完整结果。 | [Issue #6764](https://github.com/HKUDS/nanobot/issues/6764) 已关闭；有对应 [PR #6766](https://github.com/HKUDS/nanobot/pull/6766)，已关闭，待核实合并。 |
| **较高** | **空最终回答被记作成功**：运行器写入英文兜底文本并报告成功，可能误导用户或上层自动化。 | [PR #6773](https://github.com/HKUDS/nanobot/pull/6773) **开放**，拟改为结构化失败，并区分确认达到输出上限与其他空回复。 |
| **中等** | **命令确认与内部会话污染**：慢速通道可能丢失重启确认，预设重试可能产生内部命令会话。 | 有 [PR #6775](https://github.com/HKUDS/nanobot/pull/6775)，已关闭。 |
| **中等** | **上下文统计误报**：多次模型请求的累计输入被显示为当前上下文，可能造成错误诊断。 | [Issue #6774](https://github.com/HKUDS/nanobot/issues/6774) **开放**；所给列表中无明确 Fix PR。 |
| **中等** | **目标内容截断**：长目标被网关截短，重连后也无法恢复完整展示。 | 有 [PR #6767](https://github.com/HKUDS/nanobot/pull/6767)，已关闭。 |
| **中等** | **损坏 cron 存储的恢复提示不准确**：备份重命名失败时仍可能声称已备份，影响运维判断。 | 有 [PR #6770](https://github.com/HKUDS/nanobot/pull/6770)，已关闭；未证明启动失败根因被消除。 |
| **较低** | 子智能体历史刷新跳动、消息对齐与窄面板操作布局问题。 | 对应 [#6772](https://github.com/HKUDS/nanobot/pull/6772)、[#6776](https://github.com/HKUDS/nanobot/pull/6776)、[#6762](https://github.com/HKUDS/nanobot/pull/6762)，均已关闭。 |

## 5. 功能请求与路线图信号

- **会话管理向多项目控制台演进——信号明确，尚未落地确认。**  
  开放中的 [PR #6761](https://github.com/HKUDS/nanobot/pull/6761) 是纯前端重设计，试图突破固定 272px 历史侧栏，适配多项目和并发智能体。它是后续版本值得重点观察的候选，但较大的交互变更仍需要评审与回归验证。

- **运行结果的结构化表达——可靠性优先方向。**  
  [PR #6773](https://github.com/HKUDS/nanobot/pull/6773) 将空回复从“成功加兜底文本”调整为失败状态。若进入主分支，有助于调用方和界面更准确地区分完成与失败。

- **MCP 标准元数据适配——较小范围的增强候选。**  
  [PR #6769](https://github.com/HKUDS/nanobot/pull/6769) 已关闭，内容聚焦标准服务图标展示；若已合并，可望成为后续版本的体验改进项。

- **新增模型网关——目前仅能确认需求存在。**  
  [Issue #6765](https://github.com/HKUDS/nanobot/issues/6765) 已关闭，但没有提供对应实现 PR 或关闭说明，不能判断 bf16.ai 已获支持或进入下一版本计划。

## 6. 用户反馈摘要

**资料限制**：仅提供 Issue 正文摘要和评论数量，没有评论正文，因此无法真实提炼评论观点，也没有证据支持“用户普遍满意/不满”的结论。

从问题报告本身，可确认三类痛点：

1. **“看到了附件，却没看到后续解释。”**  
   用户期待一次回答中的附件、说明和流式正文完整呈现，且历史回放一致。这反映多模态或文件交付工作流的完整性要求。[Issue #6764](https://github.com/HKUDS/nanobot/issues/6764)

2. **“工具调用多了，状态统计看起来不可信。”**  
   重度工具使用者需要准确理解当前上下文，而不是被累计 token 数误导。[Issue #6774](https://github.com/HKUDS/nanobot/issues/6774)

3. **“无人值守任务不应因意外拒答而中断工具链。”**  
   用户提出的场景包括多步工具链、安全与日志分诊、IM 群组工作流，关注的是自动化连续性与模型选择灵活性，而非仅聊天体验。[Issue #6765](https://github.com/HKUDS/nanobot/issues/6765)

## 7. 待处理积压与维护提醒

当前快照仅覆盖近期更新，**没有足够证据识别长期未响应的积压项**。建议优先跟进以下开放事项：

| 待跟进项 | 建议关注点 |
|---|---|
| [Issue #6774](https://github.com/HKUDS/nanobot/issues/6774) | 补充估算失败及多次工具调用的复现用例，明确当前上下文与累计用量的统计语义。 |
| [PR #6773](https://github.com/HKUDS/nanobot/pull/6773) | 优先验证空回复、输出上限，以及已通过消息工具发送同聊天回复等边界，避免错误标记成功或失败。 |
| [PR #6761](https://github.com/HKUDS/nanobot/pull/6761) | 对多项目切换、并发会话、窄屏和多窗格执行针对性回归，控制界面重设计风险。 |

**数据核验提醒**：[PR #6762](https://github.com/HKUDS/nanobot/pull/6762) 的更新时间为 **2026-11-23**，与日报日期相邻；由于缺少精确时间和时区，无法独立核实其是否位于 24 小时窗口内。本报告保留其在提供清单中的位置，不额外修正统计。

**健康度结论**：项目呈现高频修复、重视消息完整性与复杂工作流体验的积极信号；但不能用“关闭数量”替代合并与发布成果。下一步最值得关注的是空回复失败处理、上下文统计修复，以及大型会话管理重设计的评审进展。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-11-24**  
**项目：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)**

> **数据口径**：过去 24 小时有 50 条 Issue、50 条 PR 更新；本文基于其中展示的 30 条 Issue、20 条 PR 摘要分析。未提供评论正文、完整发布说明及已合并/关闭 PR 明细，因此不将修复提案视为已交付，也不推断未展示的讨论结论。

## 1. 今日速览

- 项目保持**高活跃度**：Issue 更新中 48 条处于新开/活跃状态、2 条已关闭；PR 更新中 48 条待合并、2 条已合并或关闭。但这些是更新状态分布，不能据此计算净新增积压或合并率。[Issues](https://github.com/NousResearch/hermes-agent/issues) · [PRs](https://github.com/NousResearch/hermes-agent/pulls)
- 今日主要压力集中在 **Gateway 长时运行、多 Profile、会话恢复与消息投递可靠性**，包括内存持续增长、定时任务会话泄漏和中断后重复执行风险。[#159451](https://github.com/NousResearch/hermes-agent/issues/159451) · [#159395](https://github.com/NousResearch/hermes-agent/issues/159395) · [#159438](https://github.com/NousResearch/hermes-agent/issues/159438)
- 开发侧以稳定性修复为主，同时继续扩展电话代理、ChatGPT 接入和本地记忆生态；所展示的 PR 均为 OPEN，交付效果仍需等待合并与验证。[#159489](https://github.com/NousResearch/hermes-agent/pull/159489) · [#159485](https://github.com/NousResearch/hermes-agent/pull/159485) · [#159474](https://github.com/NousResearch/hermes-agent/pull/159474)
- 综合判断：**贡献活跃，但运行可靠性仍是当前健康度的主要约束**；尤其需要关注多代理、后台任务和桌面端复杂工作流中的状态一致性。[#159446](https://github.com/NousResearch/hermes-agent/issues/159446) · [#159448](https://github.com/NousResearch/hermes-agent/issues/159448)

## 2. 版本发布

### Canary：`canary.20261123T065600Z-v0.23.3`

- **版本标识**：`v0.23.3+canary.20261123T065600Z`
- **发布日期**：2026-11-23，出现在本次过去 24 小时发布数据中。
- **已知内容**：发布摘要包含 Hermes Desktop 下载区，并展示 macOS Apple Silicon 的 DMG 下载入口。
- **更新内容、破坏性变更、迁移事项**：提供的发布说明被截断，**无法确认**新增功能、修复清单或是否存在破坏性变更，不能将本文列出的待合并 PR 归入该版本。
- **升级建议**：将其视为 Canary 测试构建；生产环境升级前应核对完整说明，备份配置和状态数据，并重点回归后台任务、多 Profile、消息投递与恢复流程。

[发布详情](https://github.com/NousResearch/hermes-agent/releases/tag/canary.20261123T065600Z-v0.23.3)

## 3. 项目进展

### 已关闭事项：有状态进展，但修复交付尚不能确认

| 事项 | 潜在推进价值 | 当前证据 |
|---|---|---|
| Worker 以 `kanban_request_review` 结束时被判为 `unknown` 并反复崩溃 | 改善 Kanban 审核工作流的生命周期处理 | Issue 已关闭，未提供关联修复或关闭原因。[#159391](https://github.com/NousResearch/hermes-agent/issues/159391) |
| AWS Bedrock 模型 ID 被错误地将点号替换为连字符 | 改善 Bedrock 模型调用兼容性 | Issue 已关闭，未提供关联修复或发布信息。[#159343](https://github.com/NousResearch/hermes-agent/issues/159343) |

**合并交付可见性不足**：总览中的 2 条“已合并/关闭”PR 未出现在展示列表，无法逐项说明今日实际合并了什么。

### 正在推进的关键修复

- **多 Profile 配置读取优化**：减少持久化读取路径中重复解析 `config.yaml`，面向资源占用问题；是否完整解决所报告的 Gateway 内存增长，仍需验证。[PR #159486](https://github.com/NousResearch/hermes-agent/pull/159486)
- **MCP 进程隔离**：拟将 Linux systemd 环境下的 stdio MCP 子进程放入独立临时 scope，降低共享 cgroup 带来的故障影响。[PR #159494](https://github.com/NousResearch/hermes-agent/pull/159494)
- **停止行为与后台通知**：阻止已停止回合继续触发 `/goal` 判断，并让后台进程通知进入正在运行的回合。[PR #159476](https://github.com/NousResearch/hermes-agent/pull/159476) · [PR #159475](https://github.com/NousResearch/hermes-agent/pull/159475)
- **视觉路由降级**：修复自动视觉路由解析后丢失配置 fallback 的问题。[PR #159487](https://github.com/NousResearch/hermes-agent/pull/159487)

**进展评价**：可见进展主要在“问题定位与修复提案”阶段，尚不足以认定稳定性改善已经交付。

## 4. 社区热点

可见 Issue 的最高评论数为 **3**，所有展示条目的 👍 均为 **0**；PR 评论字段为 `undefined`，不能据此排名 PR 热度。

| 热点 | 活跃度 | 背后诉求 |
|---|---:|---|
| 定时任务被门控抑制后仍留下空会话，最终拖累事件循环 | 3 评论 | 长期无人值守部署需要资源占用可控，而不只是单次任务成功。[#159395](https://github.com/NousResearch/hermes-agent/issues/159395) |
| Windows 技能更新遭只读目录阻挡 | 2 评论 | `--force` 更新应能可靠替换已安装技能，减少系统属性导致的维护失败。[#159440](https://github.com/NousResearch/hermes-agent/issues/159440) |
| Gateway 中途死亡后，恢复会话丢失工具调用记录，模型再次执行 | 2 评论 | 用户需要可信的恢复语义，避免有副作用命令被重复执行。[#159438](https://github.com/NousResearch/hermes-agent/issues/159438) |
| Telegram 连接超时后循环触发限流 | 1 评论 | 通信适配器需要更稳健的连接与重试策略。[#159490](https://github.com/NousResearch/hermes-agent/issues/159490) |

**观察**：讨论量尚不支持“广泛共识”的判断，但热点明显围绕持久运行与自动化可靠性，而非单纯模型能力。

## 5. Bug 与稳定性

以下按**潜在影响**排序，并非官方优先级重标。除特别注明外，均为 OPEN；“未见 fix”仅指本次展示数据中未见。

| 风险级别 | 问题与影响 | Fix 状态 |
|---|---|---|
| **高：操作一致性** | Gateway 崩溃后恢复记录遗漏在途命令，模型可能重复执行。[#159438](https://github.com/NousResearch/hermes-agent/issues/159438) | 未见对应 PR |
| **高：存储互斥** | 打破孤儿锁后，两个进程可能同时持有存储锁，削弱数据库维护操作的跨进程互斥保障。[#159357](https://github.com/NousResearch/hermes-agent/issues/159357) | 未见对应 PR；尚无已发生数据损坏的证据 |
| **高：长期可用性** | 25 个 Profile 的报告环境中，Gateway RSS 每小时增长约 0.7–1.0 GB，峰值达 9.07 GB。[#159451](https://github.com/NousResearch/hermes-agent/issues/159451) | 有相关优化 [PR #159486](https://github.com/NousResearch/hermes-agent/pull/159486)，覆盖范围待验证 |
| **高：长期可用性** | Agent-mode cron 在被门控抑制时仍创建空会话，积累后使 Gateway 事件循环饱和。[#159395](https://github.com/NousResearch/hermes-agent/issues/159395) | 未见对应 PR |
| **较高：服务迁移** | systemd 拒绝 stop/disable 时，迁移仍可能删除旧 unit 并报告成功。[#159419](https://github.com/NousResearch/hermes-agent/issues/159419) | 未见对应 PR |
| **较高：消息完整性** | Discord 最终投递未完成仍可能清理消息；Bot Mode 达跳数上限后消息静默消失。[#159459](https://github.com/NousResearch/hermes-agent/issues/159459) · [#159446](https://github.com/NousResearch/hermes-agent/issues/159446) | 未见对应 PR |
| **中：对话展示** | Desktop 历史分页把隐藏内部提示显示成用户消息；压缩阻塞切换；上下文重置后旧会话难以找回。[#159492](https://github.com/NousResearch/hermes-agent/issues/159492) · [#159448](https://github.com/NousResearch/hermes-agent/issues/159448) · [#159428](https://github.com/NousResearch/hermes-agent/issues/159428) | 未见对应 PR |
| **中：Windows 生命周期与安装** | Profile 删除遭子进程占用、技能更新被只读属性阻挡、插件快照超出路径长度限制。[#159497](https://github.com/NousResearch/hermes-agent/issues/159497) · [#159440](https://github.com/NousResearch/hermes-agent/issues/159440) · [#159414](https://github.com/NousResearch/hermes-agent/issues/159414) | 未见对应 PR |
| **中：模型与插件可用性** | 含空格 Provider 名称导致切换失败；Gemini fallback 缺少 `thought_signature` 返回 400；多 Profile 插件发现存在竞态。[#159470](https://github.com/NousResearch/hermes-agent/issues/159470) · [#159444](https://github.com/NousResearch/hermes-agent/issues/159444) · [#159442](https://github.com/NousResearch/hermes-agent/issues/159442) | 未见对应 PR |
| **较低：扫描器健壮性** | 技能文件中的孤立代理码点导致 Unicode 编码异常，扫描器崩溃。[#159406](https://github.com/NousResearch/hermes-agent/issues/159406) | 已有两个 OPEN 修复：[#159495](https://github.com/NousResearch/hermes-agent/pull/159495)、[#159491](https://github.com/NousResearch/hermes-agent/pull/159491)，建议协调去重 |

## 6. 功能请求与路线图信号

| 方向 | 请求或提案 | 下一版本信号 |
|---|---|---|
| **按入口控制外部记忆** | Webhook 路由增加 `memory_provider: off\|tools\|full`。[Issue #159435](https://github.com/NousResearch/hermes-agent/issues/159435) | 已有明确配置设计，但未见实现 PR |
| **更轻量的安装** | 为体积较大的 ffmpeg 提供可选安装/跳过机制。[Issue #159427](https://github.com/NousResearch/hermes-agent/issues/159427) | 需求清晰，未见实现 PR |
| **电话代理** | Phone Bud 插件拟支持向美国、加拿大号码拨打电话并返回摘要、结果和转录。[PR #159489](https://github.com/NousResearch/hermes-agent/pull/159489) | 已有目录接入 PR，待审核 |
| **ChatGPT 互联** | 提议连接 Custom GPT、ChatGPT Desktop/Codex MCP 与 OpenAI Provider。[PR #159485](https://github.com/NousResearch/hermes-agent/pull/159485) | 已有实现提案，兼容与权限边界仍需验证 |
| **本地记忆生态** | Forever Brain 可选 MCP，以及 mindgraph 目录版本升级。[PR #159474](https://github.com/NousResearch/hermes-agent/pull/159474) · [PR #159493](https://github.com/NousResearch/hermes-agent/pull/159493) | 已有接入/升级 PR，但未承诺发行版本 |
| **浏览器兼容性** | 将 Helium 纳入真实 Chromium Profile 支持。[PR #159482](https://github.com/NousResearch/hermes-agent/pull/159482) | 范围相对明确，已有 PR |

**判断**：已有 OPEN PR 的目录扩展、兼容性修复，比只有 Issue 的需求更接近交付；但缺少里程碑、评审和 CI 信息，不能承诺进入下一版本。

## 7. 用户反馈摘要

*本节依据用户提交的 Issue 描述，而非未提供的评论正文。*

- **“任务在运行，但我不知道进展。”** 一项约两小时、涉及主会话和 4 个子代理的 cron 工作流，在原始聊天中没有运行状态、步骤更新或实时会话链接。用户需要的是自动化任务的可观察性。[#159447](https://github.com/NousResearch/hermes-agent/issues/159447)
- **“后台维护不应阻塞整个桌面工作流。”** 上下文压缩期间无法切换 Agent/会话，且缺少进度反馈，影响多任务使用。[#159448](https://github.com/NousResearch/hermes-agent/issues/159448)
- **“本地硬件资源没有被正确利用。”** WSL2 显存估算偏低导致不必要的 CPU spill；另一报告称 128 GB RAM 的 Ryzen AI Halo 被识别为 32 GB。两者反映本地推理资源探测的兼容性压力。[#159488](https://github.com/NousResearch/hermes-agent/issues/159488) · [#159434](https://github.com/NousResearch/hermes-agent/issues/159434)
- **“安装完成后应立即可用。”** 本地 STT 在后端启动后安装依赖仍持续提示无 Provider，暴露运行时依赖发现与环境接管问题。[#159425](https://github.com/NousResearch/hermes-agent/issues/159425)

样本以缺陷报告为主，**没有足够正向反馈可评估满意度**；也不能据此推断整体用户普遍不满。

## 8. 待处理积压

**无法确认“长期未响应”项目**：展示记录主要创建于 11 月 23—24 日，且缺少维护者回复时间和历史记录。以下是应优先跟踪的待办，而非已证实的长期积压：

1. **补齐高风险问题的责任人与回归方案**：优先处理崩溃恢复重复执行、存储锁互斥失效和 cron 会话泄漏，避免仅靠重启缓解。[#159438](https://github.com/NousResearch/hermes-agent/issues/159438) · [#159357](https://github.com/NousResearch/hermes-agent/issues/159357) · [#159395](https://github.com/NousResearch/hermes-agent/issues/159395)
2. **验证内存修复的长时间效果**：关联配置读取优化与多 Profile 内存增长报告，在接近报告规模的环境中持续运行验证。[#159451](https://github.com/NousResearch/hermes-agent/issues/159451) · [PR #159486](https://github.com/NousResearch/hermes-agent/pull/159486)
3. **协调重复修复提案**：技能扫描器同一异常已有两个 PR，宜明确主线并整合测试，减少重复评审。[PR #159495](https://github.com/NousResearch/hermes-agent/pull/159495) · [PR #159491](https://github.com/NousResearch/hermes-agent/pull/159491)
4. **补充关闭事项的交付链路**：为已关闭的 Kanban Worker、Bedrock 问题关联修复提交和首个包含修复的版本，让用户能够判断何时升级。[#159391](https://github.com/NousResearch/hermes-agent/issues/159391) · [#159343](https://github.com/NousResearch/hermes-agent/issues/159343)

---

**今日结论**：Hermes Agent 的贡献与生态扩展保持活跃，但“长时间运行是否稳定、消息是否可靠交付、用户能否理解并控制任务状态”比新增入口更值得优先投入。下一阶段项目健康度的关键证据，应是高风险修复的实际合并、回归验证和版本交付，而不仅是 PR 数量增长。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报
**日期：2026-11-24**

> **统计口径**：依据所提供的近 24 小时数据，共 2 条 Issue、9 条 PR 更新。部分记录标注日期为 11 月 23 日，本文按给定统计窗口纳入。项目名称对应 `qwibitai/nanoclaw`，但条目链接指向 `nanocoai/nanoclaw`，以下沿用条目提供的仓库路径，未核实两者关系。

## 1. 今日速览

今日项目活动以**依赖维护、安全加固和稳定性修复提案**为主，共有 9 条待合并 PR、2 条开放 Bug Issue，未记录合并、关闭或新版本发布。9 条 PR 中有 7 条由机器人提交，说明自动化维护较活跃，但不能据此认定人工评审同样活跃。最值得关注的是 [AnyDoc 安全依赖升级 #4553](https://github.com/nanocoai/nanoclaw/pull/4553)、[Anthropic SDK 跨主版本升级 #4546](https://github.com/nanocoai/nanoclaw/pull/4546)，以及 [CLI 参数解析缺陷 #4555](https://github.com/nanocoai/nanoclaw/issues/4555)。整体健康度信号是“维护任务持续进入队列，但本窗口尚无交付闭环”，后续应重点观察评审、测试及合并进度。

## 2. 项目进展

**本统计窗口内没有已合并或已关闭的重要 PR，暂不能将下列改动视为已落地成果。** 当前推进中的工作如下：

| 方向 | 待合并改动 | 预期价值与注意事项 |
|---|---|---|
| 安全依赖 | [#4553：AnyDoc CLI 固定版本升级至 0.2.5](https://github.com/nanocoai/nanoclaw/pull/4553) | PR 称旧版 0.1.6 使用的 `zip` 依赖涉及严重 CVE；升级面向文档解析链路的安全加固 |
| Agent 镜像 | [#4554：更新至时间戳镜像 20261123T1629](https://github.com/nanocoai/nanoclaw/pull/4554)、[#4551：更新至 20261123T0325](https://github.com/nanocoai/nanoclaw/pull/4551) | 两条均为 hardened image 更新；应确认是否存在替代关系，避免重复或逆序合并 |
| 通道兼容性 | [#4550：为仅含链接按钮的展示卡片补充文本](https://github.com/nanocoai/nanoclaw/pull/4550) | 使用 fallback 文本或首个有效按钮标签，解决 Discord 拒绝无描述 embed 的问题 |
| Agent 运行依赖 | [#4546：`@anthropic-ai/sdk` 0.108.0 → 1.6.0](https://github.com/nanocoai/nanoclaw/pull/4546)、[#4545：`claude-agent-sdk` 0.3.321 → 0.3.325](https://github.com/nanocoai/nanoclaw/pull/4545) | 更新运行时依赖；其中前者跨主版本，需重点验证 API 与类型兼容性，不能仅凭版本号认定无破坏性变化 |
| 基础依赖 | [#4549：`@clack/prompts`](https://github.com/nanocoai/nanoclaw/pull/4549)、[#4548：`@clack/core`](https://github.com/nanocoai/nanoclaw/pull/4548)、[#4547：`better-sqlite3`](https://github.com/nanocoai/nanoclaw/pull/4547) | 分别推进命令行交互及数据库依赖维护；摘要未提供测试结果 |

**进展判断**：工作重心偏向维护与风险收敛，而非新增产品能力；已有具体修复提案，但实际交付增量仍待合并确认。

## 3. 社区热点

**目前无法识别真正的“高讨论热度”条目。** 两条 Issue 均为 0 评论、0 👍；PR 评论数为 `undefined`，属于数据缺失，不能按 0 评论处理。按影响面而非互动量，建议关注：

- **文档处理安全**：[AnyDoc 升级 #4553](https://github.com/nanocoai/nanoclaw/pull/4553)。背后的诉求是降低 docx、xlsx、pptx 等 ZIP 容器文档解析链路的依赖风险；摘要未包含完整 CVE 编号或实际利用条件。
- **命令行行为可预期性**：[CLI 参数解析 #4555](https://github.com/nanocoai/nanoclaw/issues/4555)。用户期待 `--name=value` 这种常见写法被正确识别，涉及手工操作和自动化脚本的使用体验。
- **多通道依赖一致性**：[版本漂移 #4552](https://github.com/nanocoai/nanoclaw/issues/4552)。核心诉求是避免 channels 分支与 main 上技能固定版本各自演进、却缺少自动校验。

## 4. Bug 与稳定性

以下为基于摘要的**建议处理优先级**，不是维护者正式定级；当前数据没有崩溃、数据丢失或已确认回归的报告。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| 高：安全风险待核实 | [#4553](https://github.com/nanocoai/nanoclaw/pull/4553) 报告旧版 AnyDoc 所用 `zip` 依赖涉及严重 CVE，可能影响 ZIP 格式文档处理链路 | **已有升级 PR，未合并**；具体暴露范围仍需核实 |
| 中：明确功能缺陷 | [#4555](https://github.com/nanocoai/nanoclaw/issues/4555)：`ncl` 将 `--rebuild=true` 解析成名为 `rebuild=true` 的标志，而不是拆分参数名和值；报告环境为 macOS、提交 `53099d28` | **所给数据中无对应 fix PR**；状态为 `triage/unresolved` |
| 中：消息展示兼容性 | [#4550](https://github.com/nanocoai/nanoclaw/pull/4550)：仅含链接按钮的卡片因 embed 无描述被 Discord 拒绝 | **已有 fix PR，未合并**，关联 [Issue #4511](https://github.com/nanocoai/nanoclaw/issues/4511) |
| 中低：潜在一致性隐患 | [#4552](https://github.com/nanocoai/nanoclaw/issues/4552)：channels 的依赖声明与技能固定版本可能漂移，缺少检查；摘要未给出具体运行故障 | **所给数据中无对应 fix PR**；状态为 `triage/unresolved` |

## 5. 功能请求与路线图信号

本窗口**没有明确的新功能请求**，主要信号来自修复与维护工作：

- **更规范的 CLI 参数支持**：[#4555](https://github.com/nanocoai/nanoclaw/issues/4555) 指向参数解析兼容性改进，但尚无实现 PR，不能判断是否会进入下一版本。
- **依赖一致性自动检查**：[#4552](https://github.com/nanocoai/nanoclaw/issues/4552) 暗示需要校验 channels 依赖与技能固定版本的一致性；这是潜在工程治理方向，并非已确认路线图。
- **近期候选交付偏向加固和兼容性**：[AnyDoc 升级 #4553](https://github.com/nanocoai/nanoclaw/pull/4553) 与 [卡片修复 #4550](https://github.com/nanocoai/nanoclaw/pull/4550) 已有具体提案，相比尚无 PR 的问题更接近可交付状态，但没有证据确认其发布安排。

## 6. 用户反馈摘要

**没有可供提炼的 Issue 评论**；以下仅来自两条 Issue 正文，且均由同一位报告者提交，不应泛化为社区共识。

- **CLI 使用痛点**：在 macOS 上使用 `--name=value` 形式时，参数没有按预期生效，反映出常见命令行习惯与实际解析行为之间的落差。来源：[#4555](https://github.com/nanocoai/nanoclaw/issues/4555)。
- **维护与部署痛点**：通道依赖与技能固定版本缺乏联动检查，增加版本一致性验证成本。来源：[#4552](https://github.com/nanocoai/nanoclaw/issues/4552)。
- **满意度证据不足**：当前条目没有正面评价、评论讨论或明确情绪表达，无法据此判断整体用户满意度。

## 7. 待处理积压

数据仅覆盖短窗口，**无法识别“长期未响应”的积压项，也不能据此评估长期响应效率**。当前应优先跟进：

1. **安全升级评审**：核实 [#4553](https://github.com/nanocoai/nanoclaw/pull/4553) 的漏洞适用范围及升级验证结果。
2. **未分诊 Bug**：对 [#4555](https://github.com/nanocoai/nanoclaw/issues/4555) 和 [#4552](https://github.com/nanocoai/nanoclaw/issues/4552) 完成复现、影响面判断与责任分派。
3. **重复镜像提案整理**：明确 [#4554](https://github.com/nanocoai/nanoclaw/pull/4554) 与 [#4551](https://github.com/nanocoai/nanoclaw/pull/4551) 的取舍。
4. **跨主版本升级验证**：为 [#4546](https://github.com/nanocoai/nanoclaw/pull/4546) 补足 Agent 运行链路的兼容性测试证据。

**总体结论**：NanoClaw 当前展现出持续的自动化维护和具体问题发现能力；本日的关键不在新增功能数量，而在能否把安全、兼容性与依赖更新提案转化为经过验证的合并成果。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报
**日期：2026-11-24**  
**统计范围：所提供的过去 24 小时 GitHub 更新数据**

## 1. 今日速览

NullClaw 今日公开活动较少：统计窗口内有 **1 条 PR 更新、0 条 Issue 更新，无新版本发布**。唯一更新是仍待合并的 [PR #1095](https://github.com/nullclaw/nullclaw/pull/1095)，聚焦 MCP 工具包装器共享服务器实例时的生命周期管理。今日没有已合并或关闭的 PR，因此尚无可确认已落地主干的新增修复。整体呈现**低活跃度、以稳定性维护为主**的状态，但仅凭单日数据不足以判断项目长期健康趋势。

## 2. 项目进展

- **待合并：共享 MCP 服务器的引用计数修复。**  
  [PR #1095 — fix(mcp): refcount shared McpServer across tool wrappers](https://github.com/nullclaw/nullclaw/pull/1095) 由 **timosha** 提交，当前状态为 **OPEN**。根据摘要，旧实现仅让 MCP 服务器的第一个工具包装器持有服务器所有权，即 `owns_server = idx == 0`。当 `applyToolCustomizations` 清理被禁用工具的包装器时，若清理对象恰好持有服务器，可能提前释放其他工具仍在共享的 `McpServer`。该 PR 拟通过引用计数修正共享对象的生命周期管理。
  
  **推进程度：**已提出修复方案，但尚未合并；现有数据未提供测试结果或审查意见，不能确认修复已验证或交付给用户。

## 3. 社区热点

- **唯一可见关注点：工具禁用配置与 MCP 资源所有权之间的冲突。**  
  [PR #1095](https://github.com/nullclaw/nullclaw/pull/1095) 对应的核心诉求是：用户通过 `tool_customizations` 禁用部分工具后，其余启用的工具仍应正常工作，而不受共享服务器被提前释放的影响。这反映出配置定制能力与底层资源管理之间需要保持一致。
  
  **热度判断受限：**该 PR 的 👍 为 **0**，评论数为 `undefined`，应视为**未知**而非零。由于没有其他更新记录，不能将其认定为高热度讨论，只能称为今日唯一可见的技术议题。

## 4. Bug 与稳定性

| 优先级 | 问题与潜在影响 | 修复状态 |
|---|---|---|
| **高优先级关注，实际严重性待验证** | 禁用持有服务器所有权的工具包装器，可能导致共享 `McpServer` 被提前释放，剩余包装器继续持有失效引用。按摘要所述机制，存在释放后使用（use-after-free）及潜在崩溃风险，但提供的数据未包含复现记录、实际崩溃报告或受影响版本范围。 | 已有 [fix PR #1095](https://github.com/nullclaw/nullclaw/pull/1095)，尚未合并。 |

**建议验证重点：**禁用首个工具、禁用非首个工具、禁用全部工具，以及剩余工具继续调用和最终清理时的行为，确认引用计数既不会提前释放，也不会造成泄漏。以上为基于问题机制提出的验证建议，不代表 PR 已包含这些测试。详见 [PR #1095](https://github.com/nullclaw/nullclaw/pull/1095)。

## 5. 功能请求与路线图信号

- **未观察到新增功能请求。**统计窗口内没有 Issue 更新，唯一 PR 属于缺陷修复。它提示当前可见工作更偏向 MCP 集成可靠性，而非新增用户功能；若通过审查，可能进入后续维护版本，但没有发布计划或里程碑数据支撑具体版本判断。来源：[PR #1095](https://github.com/nullclaw/nullclaw/pull/1095)。

## 6. 用户反馈摘要

- **缺少可直接归纳的真实用户评论。**本次数据没有 Issue 或评论正文，不能据此判断用户满意度、不满意程度或问题普遍性。能够确认的使用场景来自 PR 描述：通过 `tool_customizations` 禁用部分 MCP 工具，同时继续使用同一服务器提供的其他工具。该场景暴露的是配置操作可能影响未禁用工具的可靠性风险，而非已证实的大规模用户投诉。来源：[PR #1095](https://github.com/nullclaw/nullclaw/pull/1095)。

## 7. 待处理积压

- **近期待审查项：PR #1095。**该 PR 创建于 **2026-11-23**，截至本日报仍为 OPEN，属于近期待处理工作，**不能归为长期未响应积压**。建议维护者优先核验共享对象释放时机及回归测试覆盖。链接：[PR #1095](https://github.com/nullclaw/nullclaw/pull/1095)。
- **长期积压无法评估。**提供的数据仅覆盖最近 24 小时更新，未包含完整开放列表、最后维护者响应时间或历史审查记录，因此无法识别长期无人响应的重要事项。可进一步核查：[开放 Issues](https://github.com/nullclaw/nullclaw/issues)、[开放 PRs](https://github.com/nullclaw/nullclaw/pulls)。

---

**健康度结论：**今日有明确的稳定性修复投入，但尚未形成合并或发布成果。近期最值得跟踪的是 [PR #1095](https://github.com/nullclaw/nullclaw/pull/1095) 的审查、回归验证与合并进度；单日活动较少本身不构成项目健康恶化的证据。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报
**日期：2026-11-24** · [GitHub 仓库](https://github.com/netease-youdao/LobsterAI)

> **统计口径**：依据提供的过去 24 小时更新数据，包含部分 11 月 23 日的记录。PR 标记为 `CLOSED` 时，仅能确认已关闭，无法据此确认已合并；下文涉及功能交付的判断均受此限制。今日无新版本发布。

## 1. 今日速览

过去 24 小时，LobsterAI 有 **13 条 PR 更新，其中 11 条已关闭、2 条仍开放**；另有 **1 条开放 Issue 更新**，开发侧活跃度较高，社区讨论量相对有限。工作重点集中在 **DeepSeek Harness（DSH）迁移后的启动稳定性、企业 IM 接入，以及 Cowork 交互体验**。启动卡顿、冷启动超时和企业微信连接问题均出现对应修复 PR，但尚无新版本或运行验证数据证明修复已交付。外部生态方面，百度爱企查团队提出 MCP/Skill 与 OAuth 集成意向，为企业信息查询、法律办公场景释放了新的合作信号。  
关联：[启动修复 #3168](https://github.com/netease-youdao/LobsterAI/pull/3168) · [企业微信修复 #3169](https://github.com/netease-youdao/LobsterAI/pull/3169) · [爱企查集成 #3163](https://github.com/netease-youdao/LobsterAI/issues/3163)

## 2. 项目进展

以下重要 PR 均为 **CLOSED，合并状态未提供**。

| 方向 | 关键进展 | 意义 |
|---|---|---|
| 启动性能与迁移 | [#3157](https://github.com/netease-youdao/LobsterAI/pull/3157) 将主界面启动与 DSH 后台启动解耦；[#3168](https://github.com/netease-youdao/LobsterAI/pull/3168) 处理迁移卡住及冷启动超时 | 同时改善“尽早进入可交互界面”和“后端可靠就绪”两个环节，是本轮最关键的工程进展 |
| 企业 IM | [#3160](https://github.com/netease-youdao/LobsterAI/pull/3160) 新增 DSH 原生 POPO 通道，包含消息投递、签名回调、访问策略与配对；[#3169](https://github.com/netease-youdao/LobsterAI/pull/3169) 恢复企业微信直聊并展示机器人连接状态 | 扩展企业协作入口，同时补齐迁移后的通道兼容与可观测性 |
| Cowork 操作与权限 | [#3164](https://github.com/netease-youdao/LobsterAI/pull/3164) 重构首页输入区、Agent 选择与默认权限设置；[#3165](https://github.com/netease-youdao/LobsterAI/pull/3165) 增加完全访问权限确认对话框 | 提升任务发起体验，并让高权限操作的授权边界更明确 |
| 桌面伴随体验 | [#3156](https://github.com/netease-youdao/LobsterAI/pull/3156) 将主动提示改为按需上下文操作，仅在打开快捷面板或悬浮入口时采集上下文 | 产品方向转向用户主动触发，减少主动打扰与非必要上下文采集 |
| 界面与状态表达 | [#3159](https://github.com/netease-youdao/LobsterAI/pull/3159) 移除正常启动过程中的旧网关提示；[#3166](https://github.com/netease-youdao/LobsterAI/pull/3166) 优化侧栏字体与对比度；[#3167](https://github.com/netease-youdao/LobsterAI/pull/3167) 为精选专家场景增加 NEW 标记 | 降低状态误解，改善可读性及新场景发现效率 |
| 文档与架构同步 | [#3158](https://github.com/netease-youdao/LobsterAI/pull/3158) 更新中英文 README、贡献指南和 `AGENTS.md`，覆盖 DSH 架构、迁移及打包流程 | 减少代码演进与开发者文档之间的偏差 |

**整体判断**：本轮主要是在完善 DSH 迁移后的可用性，而非单纯堆叠功能。启动、通信、权限和文档同步推进，显示项目正加强新架构的使用闭环；但不能将 11 条已关闭 PR 等同于 11 项已上线成果。

## 3. 社区热点

### 百度爱企查 MCP/Skill 集成：唯一可量化的讨论焦点

[#3163：LobsterAI 客户端内置百度爱企查 MCP 集成（OAuth 模式）](https://github.com/netease-youdao/LobsterAI/issues/3163) 为开放状态，记录 **1 条评论、0 个 👍**。提出者自述来自百度爱企查团队，希望向平台用户开放企业信息查询、法律办公两类 MCP/Skill 能力，并支持 OAuth，包括 DCR 等鉴权机制。

其核心诉求不仅是增加一个工具入口，还包括**第三方能力接入、用户授权体验以及合作流程明确化**。这反映出平台开始吸引垂直服务提供方，但目前没有足够证据判断合作成熟度或实际用户需求规模。

**热度限制**：所有 PR 的评论数均为 `undefined`，不能视为零，也无法据此进行讨论热度排名；提供的数据中所有条目的 👍 均为 0。

## 4. Bug 与稳定性

以下按潜在影响排序，严重程度为基于描述的分析判断。本窗口没有新增 Bug Issue，问题线索主要来自修复 PR。

| 严重程度 | 问题与影响 | 修复状态 |
|---|---|---|
| **高** | 从 OpenClaw 升级至 DSH 时，首次启动可能长时间卡住；PR 引用的 Windows QA 日志曾观察到最长约 **38 分钟**，另有间歇性 **35 秒冷启动超时**。这可能阻断用户正常进入工作流程 | 已有 fix PR [#3168](https://github.com/netease-youdao/LobsterAI/pull/3168)，已关闭；是否合并、发布及回归验证未知 |
| **高（企业微信用户）** | DSH 迁移后企业微信直聊连接受损。修复涉及使用内置 `ws` 客户端，按网关要求发送大小写匹配的 `Sec-WebSocket-Key`，并读取机器人订阅状态与错误信息 | 已有 fix PR [#3169](https://github.com/netease-youdao/LobsterAI/pull/3169)，已关闭；实际恢复情况待验证 |
| **中：启动体验** | 主界面可交互时间受 DSH 启动耦合影响；正常启动时的旧“网关启动中”提示也容易造成故障误判 | 相关 PR [#3157](https://github.com/netease-youdao/LobsterAI/pull/3157)、[#3159](https://github.com/netease-youdao/LobsterAI/pull/3159) 均已关闭 |
| **低：视觉可读性** | 侧栏字体缩放、对比度及 Windows 半像素模糊风险 | 改进 PR [#3166](https://github.com/netease-youdao/LobsterAI/pull/3166) 已关闭 |

**验证建议**：优先回归 Windows 升级迁移、DSH 冷启动及启动早期提交任务的流程，并验证企业微信连接状态是否与真实收发消息一致。当前没有独立崩溃报告，也没有修复后性能测量，不能认定上述风险已经消除。

## 5. 功能请求与路线图信号

- **明确的外部需求：爱企查 MCP/Skill + OAuth。**  
  [#3163](https://github.com/netease-youdao/LobsterAI/issues/3163) 尚处于合作意向询问阶段，未见配套实现 PR、维护者承诺或排期。**暂不足以判断会进入下一版本**，应先明确 MCP 接入与 OAuth/DCR 支持范围。

- **更接近后续交付的候选：POPO 通道与企业 IM 状态展示。**  
  [#3160](https://github.com/netease-youdao/LobsterAI/pull/3160)、[#3169](https://github.com/netease-youdao/LobsterAI/pull/3169) 已有具体实现描述，显示多 IM 通道及连接可观测性是近期重点；是否随下一版本发布仍需确认。

- **权限可控、按需调用的个人助手体验。**  
  [#3164](https://github.com/netease-youdao/LobsterAI/pull/3164)、[#3165](https://github.com/netease-youdao/LobsterAI/pull/3165)、[#3156](https://github.com/netease-youdao/LobsterAI/pull/3156) 共同指向更清晰的权限选择、显式高权限确认和用户主动触发的上下文操作。这是从现有实现推断的产品方向，而非官方路线图承诺。

## 6. 用户反馈摘要

**当前无法从评论正文提炼真实用户满意度**：数据仅提供 Issue 主帖及评论数量，没有给出那 1 条评论的内容。

可确认的反馈来自 [#3163](https://github.com/netease-youdao/LobsterAI/issues/3163)：外部服务团队希望借助 LobsterAI 覆盖**企业信息查询和法律办公**场景，并将 OAuth 鉴权及合作流程视为接入前提。该反馈属于供给侧合作意向，不应等同于终端用户的普遍痛点。

启动卡顿、企业微信连接与界面提示问题目前属于 PR 中披露的工程/QA 线索，也不应表述为用户集中投诉。

## 7. 待处理积压

**本批数据未显示长期未响应的重要条目。** 现有开放事项均创建于 11 月 23 日，不能归类为长期积压。

| 开放事项 | 建议关注点 |
|---|---|
| [Issue #3163：爱企查 MCP 集成](https://github.com/netease-youdao/LobsterAI/issues/3163) | 明确合作对接入口、MCP/Skill 接入要求及 OAuth/DCR 能力边界；现有评论内容未知，无法判断是否已获维护者答复 |
| [PR #3162：`actions/setup-node` v4 → v7](https://github.com/netease-youdao/LobsterAI/pull/3162) | 跨主要版本升级，建议核查工作流与 runner 兼容性并验证 CI |
| [PR #3161：`softprops/action-gh-release` v1 → v3](https://github.com/netease-youdao/LobsterAI/pull/3161) | 核查发布权限、参数及产物上传行为，避免影响后续版本发布 |

---

**健康度结论**：LobsterAI 当前呈现出“**开发活跃、迁移修复集中、外部生态出现合作信号**”的状态。短期最重要的不是继续增加功能数量，而是确认 [启动修复](https://github.com/netease-youdao/LobsterAI/pull/3168) 与 [企业微信修复](https://github.com/netease-youdao/LobsterAI/pull/3169) 的合并、回归和发布情况，将代码侧进展转化为可验证的用户体验改善。

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

# CoPaw 项目动态日报｜2026-11-24

> **数据口径**：基于提供的过去 24 小时更新清单。项目名称沿用 CoPaw，但条目指向 `agentscope-ai/QwenPaw`，下文链接据此生成。部分条目的更新时间为 11 月 23 日，可能涉及统计窗口或时区差异；本文保留原始统计，不将全部条目视为今日新建。

## 1. 今日速览

过去 24 小时，共有 **10 条 Issue 更新、5 条 PR 更新**；其中 9 条 Issue 仍开放、1 条已关闭，5 条 PR 均待合并，**没有新版本或已合并 PR**。社区报告和修复投稿较活跃，但当前可见进展主要停留在问题定位与待审修复阶段，尚未形成交付闭环。稳定性关注点集中在**流式响应重试、记忆后端初始化、Windows 记忆索引和 MCP 错误处理**，涉及助手核心运行链路。另有 3 组明确的 Issue—修复 PR 对应关系，说明部分范围较小的问题已获得快速响应；整体呈现“反馈活跃、局部修复跟进、核心可靠性问题待处理”的状态。

## 2. 项目进展

**今日没有已合并或关闭的 PR，不能将以下改动计为已交付成果。** 待合并进展如下：

| 方向 | 待合并进展 | 当前状态与意义 |
|---|---|---|
| Console 交互 | [PR #8876](https://github.com/agentscope-ai/QwenPaw/pull/8876)：恢复聊天记录原生滚动 | 移除拦截滚轮事件的手动滚动逻辑，旨在改善滚动惯性与卡顿体验；带有首次贡献者标签。 |
| CLI 引导 | [PR #8873](https://github.com/agentscope-ai/QwenPaw/pull/8873)：停止推荐不可用的模型下载命令 | 已标记 **Under Review**；改为引导用户前往 Console 的 Settings → Models，并增加回归测试。 |
| Discord 输出 | [PR #8871](https://github.com/agentscope-ai/QwenPaw/pull/8871)：修复分块边界代码围栏失衡 | 针对代码块跨消息分块时的格式错误，已有待合并修复。 |
| 定时任务 | [PR #8866](https://github.com/agentscope-ai/QwenPaw/pull/8866)：支持命名星期列表 | 修复 `mon,wed,fri` 等合法 cron 表达式被误判的问题；带有首次贡献者标签。 |
| 文档 | [PR #8869](https://github.com/agentscope-ai/QwenPaw/pull/8869)：更新面向 2.3.1 的双语文档 | 标记为 XL；标题构成版本准备信号，但摘要仍包含模板占位内容，无法核实具体文档变化。 |

**进度判断**：5 个 PR 中有 4 个标记为 XS，修复范围相对集中，适合尽快完成针对性验证；但本期尚无合并结果，项目推进主要体现为修复供给，而非发布完成度。

## 3. 社区热点

按已知评论数排序，关注度较高的议题如下。**所有条目点赞均为 0，PR 评论数缺失，因此不能据此判断 PR 热度。**

| 议题 | 已知互动 | 背后诉求 |
|---|---:|---|
| [#8864：流式回复中途断开后不重试](https://github.com/agentscope-ai/QwenPaw/issues/8864) | 3 条评论 | 用户需要长回复在网络异常后具备可靠恢复能力，而非输出部分内容后直接终止。报告中的上下文占用约 9%，不支持将其简单归因为上下文溢出。 |
| [#8877：流内过载错误绕过重试](https://github.com/agentscope-ai/QwenPaw/issues/8877) | 2 条评论 | OpenAI 兼容网关可能以 HTTP 200 返回 SSE 错误，用户期待客户端识别错误语义，而不只依赖 HTTP 状态码。 |
| [#8867：记忆后端启动竞态导致静默降级](https://github.com/agentscope-ai/QwenPaw/issues/8867) | 2 条评论 | 配置了 OpenViking 却长期运行于 ReMeLight，反映用户对配置确定性、启动可观测性和自动恢复的需求。 |
| [#8874：本地 pre-commit 环境与 CI 不一致](https://github.com/agentscope-ai/QwenPaw/issues/8874) | 2 条评论 | 贡献者需要可复现的开发环境，避免按文档操作仍与 CI 结果不一致。 |

这些议题的共同点是：用户关注的不只是“能否运行”，而是**失败是否可恢复、配置是否真实生效、开发流程是否可信**。

## 4. Bug 与稳定性

以下优先级按潜在影响评估，**不是维护者正式定级**；“未见修复 PR”仅指本次提供的数据中未出现。

### 高优先级：核心运行与记忆可靠性

| 问题 | 影响与复现线索 | 修复状态 |
|---|---|---|
| [#8864：流式回复中断且部分输出后不重试](https://github.com/agentscope-ai/QwenPaw/issues/8864) | Windows 10、2.3.0、DeepSeek 场景；`RemoteProtocolError` 导致回答不完整。 | 未见修复 PR |
| [#8877：无状态码的流内过载错误不触发重试](https://github.com/agentscope-ai/QwenPaw/issues/8877) | 在 2.3.0.post1 观察到，并报告已使用 mock HTTP transport 在 main 复现；影响兼容网关的容错。 | 未见修复 PR |
| [#8867：OpenViking 初始化竞态与永久降级](https://github.com/agentscope-ai/QwenPaw/issues/8867) | 插件已安装但尚未注册时回退至 ReMeLight，且进程内不自愈，实际后端与配置不符。 | 未见修复 PR |
| [#8863：Windows ReMe 标签索引持续失败](https://github.com/agentscope-ai/QwenPaw/issues/8863) | 两台 Windows 机器、2.3.0 与 2.3.0.post1 均报告复现，均内置 `reme-ai 0.4.2.0`；升级至 post1 未解决该报告中的问题。 | 未见修复 PR |

### 中优先级：工具调用与任务执行

| 问题 | 影响 | 修复状态 |
|---|---|---|
| [#8875：MCP 将服务端 4xx 掩盖为“未连接”](https://github.com/agentscope-ai/QwenPaw/issues/8875) | `streamable_http` 场景中，错误信息失真并触发不必要的会话拆除，增加排障与连接维护成本。 | 未见修复 PR |
| [#8865：命名星期列表 cron 回退到 30 分钟间隔](https://github.com/agentscope-ai/QwenPaw/issues/8865) | 用户设定的执行时间可能被替换为默认周期，导致任务运行频率偏离预期。 | 已有 [PR #8866](https://github.com/agentscope-ai/QwenPaw/pull/8866)，待合并 |
| [#8874：本地检查依赖配置与 CI 不一致](https://github.com/agentscope-ai/QwenPaw/issues/8874) | 影响贡献流程的可复现性与开发效率。 | 未见修复 PR |

### 较低优先级：引导与展示

| 问题 | 影响 | 修复状态 |
|---|---|---|
| [#8872：模型列表推荐不存在的下载命令](https://github.com/agentscope-ai/QwenPaw/issues/8872) | 本地模型管理插件化后，CLI 空状态仍引用已移除命令，用户操作受阻。 | 已有 [PR #8873](https://github.com/agentscope-ai/QwenPaw/pull/8873)，审核中 |
| [#8870：Discord 分块边界重复代码围栏](https://github.com/agentscope-ai/QwenPaw/issues/8870) | 影响代码消息排版与阅读。 | 已有 [PR #8871](https://github.com/agentscope-ai/QwenPaw/pull/8871)，待合并 |
| Console 滚轮滚动不自然 | 聊天记录拦截滚轮事件，导致惯性丢失、滚动不顺畅。 | 已有 [PR #8876](https://github.com/agentscope-ai/QwenPaw/pull/8876)，待合并 |

另有已关闭的 [Issue #8868](https://github.com/agentscope-ai/QwenPaw/issues/8868)，与 #8867 标题、作者和摘要一致，**疑似重复报告**；数据未给出关闭原因，不能将其关闭视为记忆后端问题已修复。

## 5. 功能请求与路线图信号

本批数据**没有明确的新增功能请求**，主要反映可靠性和已有功能体验完善。

- **短期可能落地的改进**：CLI 引导、Discord 格式、cron 星期列表和 Console 滚动均已有待合并 PR，是更明确的近期交付候选，但尚无下一版本收录承诺。参见 [#8873](https://github.com/agentscope-ai/QwenPaw/pull/8873)、[#8871](https://github.com/agentscope-ai/QwenPaw/pull/8871)、[#8866](https://github.com/agentscope-ai/QwenPaw/pull/8866)、[#8876](https://github.com/agentscope-ai/QwenPaw/pull/8876)。
- **插件化后的集成质量值得加强**：本地模型命令残留与记忆插件注册竞态，分别暴露了插件拆分后的用户入口一致性、启动顺序问题；这是质量改进信号，而非已确认路线图。参见 [#8872](https://github.com/agentscope-ai/QwenPaw/issues/8872)、[#8867](https://github.com/agentscope-ai/QwenPaw/issues/8867)。
- **2.3.1 存在准备迹象**：双语文档 PR 标题指向 2.3.1，但不足以推断发布时间、功能清单或升级要求。参见 [#8869](https://github.com/agentscope-ai/QwenPaw/pull/8869)。

## 6. 用户反馈摘要

> 未提供评论正文，以下仅从 Issue 描述提炼，不代表对评论内容的直接归纳。

- **长回复可靠性不足**：Windows Console 用户在流式输出过程中遭遇中断，部分内容已生成却无法自动恢复，影响连续使用体验。[#8864](https://github.com/agentscope-ai/QwenPaw/issues/8864)
- **记忆功能缺乏确定性**：一类用户遇到配置后端与实际后端不一致，另一类在 Windows 上持续遇到标签索引失败；这会降低用户对长期记忆能力的信任。[#8867](https://github.com/agentscope-ai/QwenPaw/issues/8867)、[#8863](https://github.com/agentscope-ai/QwenPaw/issues/8863)
- **远端工具故障难定位**：MCP 用户得到“未连接”而非原始服务端错误，难以区分请求问题、权限问题或连接问题。[#8875](https://github.com/agentscope-ai/QwenPaw/issues/8875)
- **使用与贡献入口存在摩擦**：不可用的 CLI 命令、与 CI 不一致的环境说明，分别增加终端用户与贡献者的试错成本。[#8872](https://github.com/agentscope-ai/QwenPaw/issues/8872)、[#8874](https://github.com/agentscope-ai/QwenPaw/issues/8874)

当前样本以缺陷报告为主，**没有足够证据判断整体用户满意度，也未见可核实的正向满意反馈**。

## 7. 待处理积压与维护建议

本批条目均创建于 11 月 23—24 日，缺少历史列表、维护者回复身份与完整时间线，**无法识别真正“长期未响应”的积压**。当前更适合关注以下待办：

1. **优先分诊流式错误恢复**：对照“部分输出后连接断开”和“HTTP 200 内嵌 SSE 过载错误”两类场景，明确各自重试与恢复边界。[#8864](https://github.com/agentscope-ai/QwenPaw/issues/8864)、[#8877](https://github.com/agentscope-ai/QwenPaw/issues/8877)
2. **推进记忆问题定位**：确认插件就绪检查、回退提示和恢复策略，并补充 Windows 路径兼容性验证。[#8867](https://github.com/agentscope-ai/QwenPaw/issues/8867)、[#8863](https://github.com/agentscope-ai/QwenPaw/issues/8863)
3. **尽快闭环已有小范围修复**：优先审查会改变任务执行频率的 cron 修复，再推进 CLI 与 Discord 体验修复。[#8866](https://github.com/agentscope-ai/QwenPaw/pull/8866)、[#8873](https://github.com/agentscope-ai/QwenPaw/pull/8873)、[#8871](https://github.com/agentscope-ai/QwenPaw/pull/8871)
4. **补齐发布准备证据**：完善文档 PR 描述与变更范围，便于核对 2.3.1 文档与实际行为是否一致。[#8869](https://github.com/agentscope-ai/QwenPaw/pull/8869)

**健康度结论**：社区反馈与修复参与度良好，但本期尚无合并交付，核心可靠性问题也未见对应修复 PR。下一步最值得观察的是：高影响缺陷是否获得维护者分诊，以及已有小型修复能否及时完成验证、合并与发布。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报｜2026-11-24

> 数据口径：基于提供的过去 24 小时更新记录。PR 的 `CLOSED` 状态不等同于已合并；PR 评论数缺失，无法据此比较讨论热度。今日无新版本发布。

## 1. 今日速览

过去 24 小时，ZeroClaw 有 **7 条 Issue、11 条 PR 更新**，其中 9 条 PR 仍待合并，开发活跃度较高，但交付成果尚需结合合并状态确认。工作重点集中在**远程文件工具、模型与搜索服务扩展，以及 CI 和跨平台测试可靠性**，代表性工作包括 [Remote Files PR #12695](https://github.com/zeroclaw-labs/zeroclaw/pull/12695) 和[测试可移植性 PR #12700](https://github.com/zeroclaw-labs/zeroclaw/pull/12700)。当前最突出的健康度风险是 `cookie` 安全公告导致的 CI 阻塞；对应修复 PR 已关闭，但现有数据不能确认问题已解除（[Issue #12693](https://github.com/zeroclaw-labs/zeroclaw/issues/12693)）。社区讨论量总体有限，今日活跃更偏向代码贡献与工程治理，而非高热度用户讨论。

## 2. 项目进展

### 今日关闭的 PR：处理动作明确，合并成果尚不明确

| PR | 主要内容 | 进展判断 |
|---|---|---|
| [#12694：更新 cookie 并记录安全公告](https://github.com/zeroclaw-labs/zeroclaw/pull/12694) | 针对 RUSTSEC-2026-0594，更新依赖并处理 webdriver 所引入版本的公告记录 | **已关闭，未确认合并**。这是解除安全检查阻塞的关键处理项，但不能据此认定 CI 已恢复 |
| [#12683：30 项 Rust 补丁依赖更新](https://github.com/zeroclaw-labs/zeroclaw/pull/12683) | Dependabot 批量更新依赖 | **已关闭，未确认合并**。另有 [#12698](https://github.com/zeroclaw-labs/zeroclaw/pull/12698) 提交 31 项更新，但数据未明确两者是否为替代关系 |

### 仍在推进的关键工作

- **远程文件能力进入实现阶段**：[PR #12695](https://github.com/zeroclaw-labs/zeroclaw/pull/12695) 增加操作员定义的 WebDAV 资源目录、独立加密授权及可选 `remote_files` 工具；摘要明确列出目录与元数据能力，并涉及传输实现。它将相关需求从 RFC 推向代码评审，但尚未合并。
- **跨平台 CI 加固**：[PR #12700](https://github.com/zeroclaw-labs/zeroclaw/pull/12700) 修复 Windows 路径、轮询时序和 gateway drain 测试假设；[PR #12688](https://github.com/zeroclaw-labs/zeroclaw/pull/12688) 调整 macOS、Windows 上 nextest 的安装方式。
- **硬件历史代码清理**：[PR #12687](https://github.com/zeroclaw-labs/zeroclaw/pull/12687) 拟删除不可达的硬件工具注册体系，且明确依赖 #12663 先合并。其价值主要是减少维护负担，不代表新增硬件支持。

**总体判断：**今日进展主要体现在功能实现与工程修复的提交端；现有数据不足以确认新增功能已经进入主分支或可发布状态。

## 3. 社区热点

### Remote Files：唯一可确认有评论的议题

[Issue #12690](https://github.com/zeroclaw-labs/zeroclaw/issues/12690) 有 **1 条评论、0 个赞**，是所给 Issues 中评论最多的一条；对应实现为 [PR #12695](https://github.com/zeroclaw-labs/zeroclaw/pull/12695)。

其核心诉求是：让智能体处理远程文件，同时由操作员显式限定远程根目录与操作权限。议题中的 PDF 跨目录整理示例，体现了从聊天助手向实际文档工作流执行者扩展的需求。**授权边界与凭据隔离**是这一方向的关键评审点，而不只是文件协议接入。

### 工程维护议题密集，但不能等同于讨论热度高

安全检查阻塞、runtime 拆分和硬件清理均由 JordanTheJet 提出，反映近期工程治理工作较集中；不过这些 Issue 当前均为 0 评论，不能判断已有社区共识。

- [#12693：安全检查阻塞](https://github.com/zeroclaw-labs/zeroclaw/issues/12693)
- [#12697：拆分 zeroclaw-runtime](https://github.com/zeroclaw-labs/zeroclaw/issues/12697)
- [#12686：移除不可达硬件注册体系](https://github.com/zeroclaw-labs/zeroclaw/issues/12686)

所有条目的点赞均为 0，PR 评论数又未提供，因此本日报不对 PR 讨论热度排名。

## 4. Bug 与稳定性

以下按已知影响范围及阻塞程度排序，而非重新定义项目官方严重等级。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **最高：研发流程阻塞** | [#12693](https://github.com/zeroclaw-labs/zeroclaw/issues/12693)：`cookie` 的 RUSTSEC-2026-0594 公告导致每个 PR 和 merge group 的 Security 检查失败；报告标注 **S1**。公告涉及 fork 后私有 cookie nonce 可能重复，实际运行时暴露面仍需验证 | 有 [fix PR #12694](https://github.com/zeroclaw-labs/zeroclaw/pull/12694)，已关闭，合并及修复效果未知 |
| **较高：用户交互失效** | [#12685](https://github.com/zeroclaw-labs/zeroclaw/issues/12685)：Telegram 任意 `callback_data` 被静默丢弃，仅模型选择和工具审批回调被分发，影响自定义内联按钮工作流 | 所给数据中未见对应 fix PR |
| **中等：构建可靠性风险** | [#12699](https://github.com/zeroclaw-labs/zeroclaw/issues/12699)：新 CI builder 上 Docker 依赖缓存不可靠，并提出占位 workspace 构件混入生产构建的风险 | 未见对应修复 PR；仍在评估现有方案、cargo-chef 或直接源码构建 |
| **中等：跨平台测试与 CI 安装问题** | Windows 路径、轮询时序、gateway drain 测试假设及 nextest 安装方式需要修正；目前不能推断为生产运行时故障 | [#12700](https://github.com/zeroclaw-labs/zeroclaw/pull/12700)、[#12688](https://github.com/zeroclaw-labs/zeroclaw/pull/12688) 均待合并 |

另有 [Issue #12681](https://github.com/zeroclaw-labs/zeroclaw/issues/12681) 缺乏有效复现步骤、环境和预期行为，暂无法判断是否为真实缺陷，应先补充信息。

## 5. 功能请求与路线图信号

| 方向 | 当前信号 | 纳入后续版本的判断 |
|---|---|---|
| **受限授权的远程文件访问** | [RFC #12690](https://github.com/zeroclaw-labs/zeroclaw/issues/12690) 已有 [实现 PR #12695](https://github.com/zeroclaw-labs/zeroclaw/pull/12695) | 已进入评审阶段，但改动范围较大，安全与跨平台验证可能影响落地节奏 |
| **bf16.ai 模型提供商** | [PR #12696](https://github.com/zeroclaw-labs/zeroclaw/pull/12696) 新增规范化的 OpenAI 兼容 provider 配置入口 | 实现已提交、规模较小，是较明确的近期候选 |
| **DeepSeek 网页搜索** | [PR #12692](https://github.com/zeroclaw-labs/zeroclaw/pull/12692) 支持独立搜索凭据，并将结果映射到现有工具格式 | 有利于将搜索服务与模型提供商解耦，已具备代码实现 |
| **Web 聊天展示 Codex 订阅用量** | [PR #12691](https://github.com/zeroclaw-labs/zeroclaw/pull/12691) 依赖 #12641 的 CLI/provider 工作 | 功能方向明确，但合并节奏取决于前置 PR |
| **runtime 模块化** | [Tracker #12697](https://github.com/zeroclaw-labs/zeroclaw/issues/12697) 协调 crate 拆分、模块归属和实施顺序 | 更接近中期架构治理，暂无依据判断下一版本可完成 |

以上均为基于实现状态的判断，不构成发布承诺。

## 6. 用户反馈摘要

**数据限制：**提供的数据没有评论正文，因此无法从评论中提炼真实满意度；以下仅归纳 Issue 描述中的直接诉求。

- **按钮交互缺少可靠反馈。** Telegram 用户希望自定义内联按钮的回调能够传递给智能体，而不是被静默忽略；问题集中在“事件被接收但业务没有响应”的可观察性缺口。[#12685](https://github.com/zeroclaw-labs/zeroclaw/issues/12685)
- **需要可控的远程文档自动化。** 用户希望以命名目录和相对路径执行文档整理，同时保留明确授权边界，避免给智能体过宽的文件访问权限。[#12690](https://github.com/zeroclaw-labs/zeroclaw/issues/12690)
- **贡献者需要可复现的构建流程。** 安全检查全局失败和新 builder 缓存不稳定，直接影响贡献提交与验证效率。[#12693](https://github.com/zeroclaw-labs/zeroclaw/issues/12693)、[#12699](https://github.com/zeroclaw-labs/zeroclaw/issues/12699)

当前没有足够证据总结正面评价或整体用户满意度。

## 7. 待处理积压与维护提醒

所给条目均创建于 11 月 23—24 日，**无法识别“长期未响应”积压**。建议优先跟踪以下近期未决事项：

1. **确认安全修复闭环。** 核实 [#12694](https://github.com/zeroclaw-labs/zeroclaw/pull/12694) 的关闭原因、主分支实际状态及 Security 检查结果，并同步更新仍开放的 [#12693](https://github.com/zeroclaw-labs/zeroclaw/issues/12693)。
2. **为 Telegram 回调问题建立处理路径。** [#12685](https://github.com/zeroclaw-labs/zeroclaw/issues/12685) 暂无可见修复 PR，宜优先复现并明确通用回调分发策略。
3. **管理堆叠 PR 的依赖顺序。** [#12687](https://github.com/zeroclaw-labs/zeroclaw/pull/12687) 与 [#12691](https://github.com/zeroclaw-labs/zeroclaw/pull/12691) 都有前置依赖，需避免重复评审或合并阻塞。
4. **补齐低信息量报告。** 对 [#12681](https://github.com/zeroclaw-labs/zeroclaw/issues/12681) 请求最小复现与日志，降低无效分诊成本。

**健康度结论：开发活跃、功能供给充足，但交付确定性仍受 CI 阻塞与待合并工作影响。**近期应优先完成安全修复验证和跨平台 CI 加固，再推进远程文件等较大功能的合并。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*