# OpenClaw 生态日报 2026-11-22

> Issues: 46 | PRs: 46 | 覆盖项目: 13 个 | 生成时间: 2026-11-22 01:55 UTC

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
**日期：2026-11-22｜统计范围：所提供的过去 24 小时 GitHub 更新数据**  
项目：[openclaw/openclaw](https://github.com/openclaw/openclaw)

## 1. 今日速览

过去 24 小时共有 **46 条 Issue、46 条 PR 更新**，其中 36 条 Issue 处于新开/活跃状态、10 条已关闭；PR 中 29 条待合并、17 条已合并或关闭，开发与问题分流活动较活跃。今日**没有新版本发布**，工作重心集中在 Gateway 生命周期、模型路由与认证、会话状态，以及多渠道消息投递的可靠性。当前最值得关注的是 macOS 客户端的两项开放 P0 问题，以及长期记忆损坏、备份失败后租约残留、工具调用无限重试等 P1 风险。整体呈现“修复提案持续产出，但关键稳定性问题仍待闭环”的状态，尚不能据此判断已恢复到稳定发布水平。

> **数据口径说明：** PR 明细仅展示 30 条，且均未提供有效评论数，也未提供合并标记；以下不会将 `CLOSED` 等同于“已合并”。用户反馈依据 Issue 正文摘要提炼，不代表已阅读评论全文。

## 2. 项目进展

### 今日已关闭事项：工作已推进，落地结果仍需核验

| 事项 | 解决方向与潜在价值 | 状态判断 |
|---|---|---|
| [PR #203356：隔离不同模型的冷却期限](https://github.com/openclaw/openclaw/pull/203356) | 避免单个模型的长限流被扩散成整个提供商不可用，改善可用路由识别 | 已关闭，不能确认合并 |
| [PR #203357：将更新提示移出对话](https://github.com/openclaw/openclaw/pull/203357) | 减少升级过程对聊天的干扰，并使失败提示持续可见 | 已关闭，不能确认合并 |
| [PR #203346：加快完整 30 天用量报告呈现](https://github.com/openclaw/openclaw/pull/203346) | 缩短缺失汇总时的等待，减少部分统计造成的误解 | 已关闭，不能确认合并 |
| [PR #203358：在设置中选择模型执行框架](https://github.com/openclaw/openclaw/pull/203358) | 让主模型、备用模型能够区分 OpenClaw 与 Codex 执行路径 | 已关闭，不能确认功能落地 |

Issue 侧，以下重要问题已经关闭：

- [#203124：macOS 内置 Bun Gateway 的欢迎设置检测失败](https://github.com/openclaw/openclaw/issues/203124)，涉及 P0 首次使用阻塞。
- [#203273：macOS 重启后本地客户端凭据失效](https://github.com/openclaw/openclaw/issues/203273)，正文关联修复提案 [PR #188973](https://github.com/openclaw/openclaw/pull/188973)。
- [#203208：飞书云盘默认根目录下创建文件夹失败](https://github.com/openclaw/openclaw/issues/203208)，影响实际工具操作。
- [#203320：Skill Workshop 经验审查因上下文预算不匹配而无法完成](https://github.com/openclaw/openclaw/issues/203320)。

**进展评估：** 本轮更新覆盖安装引导、模型可用性、工具执行和可观测性，修复范围较广。但关闭原因、合并记录和新版本均不完整，今日更适合评价为“问题处理与修复管线推进”，而不是“已交付稳定性提升”。

## 3. 社区热点

当前展示的 Issue 最高为 **5 条评论**，所有条目 👍 均为 0；热点主要体现为问题讨论，而非高反应量共识。PR 评论字段为 `undefined`，无法可靠排序 PR 讨论热度。

| 热点 | 互动 | 背后诉求 |
|---|---:|---|
| [#203191：iOS 梦境日记文本被截断](https://github.com/openclaw/openclaw/issues/203191) | 5 条评论 | 日记是长文本场景，换行或滚动缺失直接影响已有内容的阅读 |
| [#202954：systemd 自动更新每约两小时重复失败](https://github.com/openclaw/openclaw/issues/202954) | 4 条评论 | 用户需要升级流程可靠，而不是服务正常却持续累积失败记录；报告称已有约 330 次失败 |
| [#203065：macOS 内置 Gateway 停留在旧版本](https://github.com/openclaw/openclaw/issues/203065) | 4 条评论 | 用户期待 App、后台服务与修复 CLI 自动保持一致，避免凭据恢复死循环 |
| [#203167：成功请求后 Codex 冷却仍未解除](https://github.com/openclaw/openclaw/issues/203167) | 4 条评论 | 用户需要限流状态反映账户的真实可用性，而不是长期受历史失败影响 |
| [#203121：启动升级先复制大量模型历史数据](https://github.com/openclaw/openclaw/issues/203121) | 3 条评论 | 运维用户关心升级停机窗口；报告涉及约 33 GB、138,511 个文件 |

**观察：** 社区最突出的矛盾不是功能缺少，而是“后台状态与用户看到的状态不一致”：服务仍可用但升级反复失败、请求成功但冷却未解除、App 已升级但运行时仍旧。

## 4. Bug 与稳定性

以下按现有优先级及实际影响排列；“未见 PR”仅指本次数据没有明确关联，不表示仓库中不存在修复。

| 严重度 | 问题与影响 | 修复状态 |
|---|---|---|
| **P0** | [#203065：macOS App 未替换旧 Gateway，进入凭据恢复循环](https://github.com/openclaw/openclaw/issues/203065) | 已有源码复现、修复形态明确；未见明确 fix PR |
| **P0** | [#203343：macOS 提示需要无法安装的匹配 CLI，启动循环失败](https://github.com/openclaw/openclaw/issues/203343) | 标记回归，仍需补充信息；未见明确 fix PR |
| **P1 · 数据损坏风险** | [#203373：memoryFlush 将空或过期输出写入 MEMORY.md](https://github.com/openclaw/openclaw/issues/203373)，用户报告长期记忆缩为 1 字节或静默回退 | 待维护者审查；未见明确 fix PR |
| **P1 · 服务恢复风险** | [#203359：PostgreSQL 模式备份失败后残留状态租约](https://github.com/openclaw/openclaw/issues/203359)，后续备份、Doctor、Gateway 启动均可能被拒绝 | 待现场复现；未见明确 fix PR |
| **P1 · 启动不可用** | [#203121：启动 schema 升级复制大型 rollout 目录后才监听端口](https://github.com/openclaw/openclaw/issues/203121) | 已有源码复现；未见明确 fix PR |
| **P1 · 无效重试** | [#203365：子任务完成回合持续调用被永久拒绝的 message 工具](https://github.com/openclaw/openclaw/issues/203365)，报告约两小时内出现 999 次相同拒绝 | 待维护者审查；未见明确 fix PR |
| **P1 · 平台回归** | [#203211：LanceDB 插件仅发布 Linux 原生绑定，macOS arm64 Doctor 失败](https://github.com/openclaw/openclaw/issues/203211) | 修复形态明确、可排队处理；未见明确 fix PR |
| **P1 · 会话卡死** | [#203374：纯文本模型生成图片后，后续回合失败并持续重试](https://github.com/openclaw/openclaw/issues/203374) | 已有开放 [PR #203375](https://github.com/openclaw/openclaw/pull/203375)，仍需验证证据 |
| **P1 · 消息丢失** | [#203329：发往 iMessage 会话的系统事件回复无法投递](https://github.com/openclaw/openclaw/issues/203329) | 已有源码复现；未见明确 fix PR |
| **P2 · 数据编辑** | [#203240：编辑名为 null 的 Markdown frontmatter 键误删相邻字段](https://github.com/openclaw/openclaw/issues/203240) | 标注已有开放关联 PR，但本次未提供编号 |
| **P2 · 预算失真** | [#203350：上下文大小不变时 Goal 低估 token 消耗](https://github.com/openclaw/openclaw/issues/203350) | 已有开放 [PR #203364](https://github.com/openclaw/openclaw/pull/203364)，待维护者审阅 |
| **未分级 · 限流恢复** | [#203381：OpenRouter 免费模型遇到 429 后反复重试主模型](https://github.com/openclaw/openclaw/issues/203381) | 新报告、0 评论；未见明确 fix PR |

**稳定性判断：** 应优先保障数据完整性、启动恢复和重试终止条件。尤其 [长期记忆写入异常](https://github.com/openclaw/openclaw/issues/203373) 与 [永久拒绝后仍循环调用工具](https://github.com/openclaw/openclaw/issues/203365)，分别触及个人助手的“记忆可信度”和自主智能体的“执行可控性”。

## 5. 功能请求与路线图信号

### 已有实现提案，较接近进入评审或发布管线

- **在插件设置直接提供登录入口。** [Issue #203371](https://github.com/openclaw/openclaw/issues/203371) 已对应 [PR #203379](https://github.com/openclaw/openclaw/pull/203379)。方向明确，但涉及认证界面与安全审查，尚不能确认进入下一版本。
- **在同一 Workboard 卡片请求返工。** [PR #202961](https://github.com/openclaw/openclaw/pull/202961) 提议让评审者在已完成卡片上发起修改，体现多智能体协作从“执行完成”向“评审—返工闭环”扩展。
- **允许访客从项目对话提交 GitHub Issue。** [PR #203369](https://github.com/openclaw/openclaw/pull/203369) 已待维护者审阅；功能价值明确，但变更较大且涉及安全敏感代码。

### 仍需产品或安全决策

- **预算耗尽前交付部分成果：** [#203354](https://github.com/openclaw/openclaw/issues/203354)。与预算计数修复 [PR #203364](https://github.com/openclaw/openclaw/pull/203364) 形成连续需求，但计数正确不等于已实现提前收尾。
- **只重试失败子任务、保留成功分支：** [#203353](https://github.com/openclaw/openclaw/issues/203353)。反映用户希望降低多智能体任务恢复成本。
- **将审批记录绑定到具体执行结果：** [#203352](https://github.com/openclaw/openclaw/issues/203352)；**将验证结论绑定到产物版本：** [#203351](https://github.com/openclaw/openclaw/issues/203351)。两者共同指向可审计、可追溯的智能体工作流。
- **断线后认证恢复已完成的 Node 调用结果：** [#203248](https://github.com/openclaw/openclaw/issues/203248)。解决“操作已产生副作用，但智能体不知道是否成功”的不确定性，仍需安全评审。

**路线图信号：** 产品需求正在从增加工具，转向预算治理、身份与授权上下文、结果证据和失败恢复。短期最接近落地的是已有 PR 的登录入口和预算计数修复，但没有发布承诺。

## 6. 用户反馈摘要

以下来自报告正文，而非未提供的评论内容：

- **“我需要的是可靠记忆，不只是能聊天。”** 多 Agent 用户报告长期记忆文件被截断或回退；此类问题即使发生频率低，也会显著损害个人助手的信任基础。[#203373](https://github.com/openclaw/openclaw/issues/203373)
- **“升级不应要求我理解 App、CLI 和后台服务的版本关系。”** macOS 用户陷入“运行匹配 CLI 修复—无法取得匹配 CLI—再次失败”的恢复流程，说明安装包与运行时一致性仍是明显痛点。[#203343](https://github.com/openclaw/openclaw/issues/203343)
- **“显示成功不代表任务真正送达。”** iMessage 系统事件接口返回成功、智能体也生成回复，但投递最终失败，暴露成功状态与端到端结果之间的差距。[#203329](https://github.com/openclaw/openclaw/issues/203329)
- **“订阅聊天能用，不代表语音和系统管理路径能用。”** 用户在普通聊天、系统 Agent、Browser Talk 间遇到不同的认证或路由判断，配置心智负担较高。[#203019](https://github.com/openclaw/openclaw/issues/203019)、[#203326](https://github.com/openclaw/openclaw/issues/203326)
- **“高频自动化需要可管理的历史。”** 隔离自动化每次运行累积会话窗口，历史过大后又无法通过支持路径删除，影响长期运行维护。[#203361](https://github.com/openclaw/openclaw/issues/203361)

本次数据以缺陷和需求报告为主，**没有足够依据归纳用户满意度或正向口碑趋势**。

## 7. 待处理积压与维护者提醒

本次条目的创建日期集中在 11 月 21—22 日，无法识别真正“长期未响应”的工单；PR 也没有有效评论数据。以下应视为**高价值待处理队列**，而非已证实的长期积压。

| 建议顺序 | 待处理项 | 关注理由 |
|---|---|---|
| **立即** | [#203065](https://github.com/openclaw/openclaw/issues/203065)、[#203343](https://github.com/openclaw/openclaw/issues/203343) | 开放 P0；需要厘清是否同源，并验证 App、Gateway、CLI 的版本一致性 |
| **立即** | [#203373](https://github.com/openclaw/openclaw/issues/203373) | 涉及持久记忆损坏，宜优先复现并提供数据保护建议 |
| **高** | [#203359](https://github.com/openclaw/openclaw/issues/203359)、[#203365](https://github.com/openclaw/openclaw/issues/203365) | 分别影响故障恢复能力与无效调用的成本控制 |
| **高** | [PR #203375](https://github.com/openclaw/openclaw/pull/203375) | 已对应明确的 P1 会话卡死问题，当前缺验证证据 |
| **高** | [PR #203271](https://github.com/openclaw/openclaw/pull/203271) | 修复未配置模型却隐式请求 OpenAI 的行为，但改动大，涉及兼容性、认证和会话状态；另有聊天命令受阻报告 [#203304](https://github.com/openclaw/openclaw/issues/203304)，需联合验证 |
| **可优先评审** | [PR #203377](https://github.com/openclaw/openclaw/pull/203377) | FaceTime 中断后播放修复为 P1、XS 改动，已有充分证据，等待维护者 |
| **可优先评审** | [PR #202960](https://github.com/openclaw/openclaw/pull/202960) | 已就绪模板被后台刷新阻塞的修复，证据充分，可改善会话启动等待 |

**总结：** OpenClaw 今日保持了较强的修复供给与社区反馈活跃度，但关键风险仍集中于持久状态、升级恢复和自主执行边界。下一轮最有价值的健康度改善，不是更多关闭数量，而是将 P0/P1 问题推进到“复现明确—修复合并—发布可用—用户验证”的完整闭环。

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向分析
**日期：2026-11-22｜依据所提供的过去 24 小时 GitHub 动态**

> **统计口径：**Issue、PR 数量均指窗口内更新条目数，不等于新增数；`CLOSED` 不等于已合并。各项目展示明细完整度不同，以下健康度仅评价本次可见信号，不代表长期质量排名。NanoClaw、CoPaw 的条目路径与项目标识存在差异，涉及具体条目时沿用原始数据链接。

## 1. 生态全景

本次覆盖的 **13 个项目共记录 116 条 Issue、135 条 PR 更新，合计 251 条，只有 NanoBot 发布新版本**。OpenClaw 与 Hermes Agent 合计贡献 **192 条更新，占约 76.5%**，是本窗口工程活动与问题反馈最集中的项目。生态关注点正从“接入更多工具和模型”转向**长期运行可靠性、预算约束、持久状态安全及失败恢复**。与此同时，桌面、多渠道和多智能体协作持续扩展，但多数重要修复仍处于待审或交付未确认阶段，不能将开发活跃直接等同于产品稳定。

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | Release | 今日健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 46 | 46 | 无 | 高活跃、稳定性承压；开放 P0 与记忆损坏等 P1 风险尚待闭环 |
| **Hermes Agent** | 50 | 50 | 无 | 更新量最高；费用循环、工具调用和升级兼容问题突出，修复供给活跃 |
| **ZeroClaw** | 9 | 12 | 无 | 预算与语音可靠性治理集中；全部 PR 待审，交付效果未验证 |
| **NanoClaw** | 8 | 9 | 无 | 多项问题已有修复候选；Codex 执行边界与安全相关依赖需优先跟进 |
| **LobsterAI** | 0 | 8 | 无 | DSH 运行时和跨 Agent 协作集中推进；PR 全部关闭但合并状态不明 |
| **NanoBot** | 0 | 6 | **v0.4.2** | 本窗口唯一确认版本交付；聚焦 SSH、Windows 兼容与发布流程加固 |
| **CoPaw** | 2 | 4 | 无 | 小规模维护活跃；插件加载和上下文恢复提示尚无可见修复闭环 |
| **IronClaw** | 1 | 0 | 无 | 可见活动限于提供商接入需求，无法充分评估工程健康度 |
| PicoClaw | 0 | 0 | 无 | 本窗口无活动，不能据此判断停滞 |
| NullClaw | 0 | 0 | 无 | 同上 |
| TinyClaw / TinyAGI | 0 | 0 | 无 | 同上 |
| Moltis | 0 | 0 | 无 | 同上 |
| ZeptoClaw | 0 | 0 | 无 | 同上 |
| **合计** | **116** | **135** | **1 个版本** | 活动高度集中，已确认发布较少 |

**解读：**NanoBot 的版本交付证据最明确，但这不意味着其稳定性必然优于其他项目；OpenClaw、Hermes 的高缺陷可见度也可能受到使用场景和反馈覆盖面影响，不能简单按 Bug 数排名。

## 3. OpenClaw 在生态中的定位

### 优势：覆盖面广，复杂运行场景暴露充分

- **个人助手链路覆盖较广。**可见议题横跨 macOS/iOS、Gateway、模型路由、认证、长期记忆、消息投递、备份和多 Agent 工作流，呈现出综合型助手平台的特征。
- **治理需求更深入。**审批绑定执行结果、验证绑定产物版本、预算耗尽前交付部分成果等需求，已经超出“能否调用工具”，进入**结果可信、执行可审计**层面。
- **修复与反馈流量处于第一梯队。**92 条更新与 Hermes 的 100 条接近，明显高于本窗口其他项目，为发现复杂边界问题提供了更充分的样本。

### 技术路线差异：综合平台能力带来状态协调成本

| 对比对象 | OpenClaw 的相对侧重 | 对方本窗口的相对侧重 |
|---|---|---|
| Hermes Agent | 多渠道个人助手、持久记忆、客户端与 Gateway 一致性 | Kanban 自动化、后台 worker、费用循环和工具执行 |
| NanoBot | 更广的运行与状态治理问题面 | SSH 接入、跨客户端体验、Windows 兼容和版本分发 |
| NanoClaw | 综合会话、路由及协作治理 | Codex/Claude 运行时集成、事件归属与认证恢复 |
| ZeroClaw | 端到端助手状态与任务结果可信度 | 委派预算执行、语音状态和费用可视化 |
| LobsterAI | 多渠道与 Gateway 运行链路 | 桌面 DSH 运行时、专业 Agent 委派和办公产物体验 |

**核心代价是组件间一致性。**App、Gateway、CLI 版本错位，成功请求与冷却状态不一致，以及接口成功但消息未送达，都表明其短期瓶颈更多在协调多个子系统，而非单项能力不足。

### 社区规模：只能确认活动规模，不能确认用户规模

OpenClaw 与 Hermes 是本窗口的**活动规模第一梯队**，但缺少活跃贡献者、独立报告者、下载量及历史留存数据，无法断言谁拥有更大的用户社区。OpenClaw 可见 Issue 最高 5 条评论，高于 Hermes 的 2 条；绝对互动量仍低，不能据此认定存在强社区共识。

## 4. 共同关注的技术方向

| 共同方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **预算治理与有界重试** | OpenClaw、Hermes、ZeroClaw | 永久拒绝后停止调用；配额耗尽后避免反复计费；子代理遵守委派成本上限；超限时提示、降级或交付部分成果 |
| **持久状态与故障恢复** | OpenClaw、Hermes、LobsterAI、CoPaw | 保护长期记忆；清理失败租约；支持幂等重试；保存停止状态；压缩失败后避免破坏性恢复建议 |
| **升级与运行时一致性** | OpenClaw、Hermes、NanoClaw、LobsterAI | 协调 App/CLI/Gateway 版本；避免旧进程加载新代码；同步 SDK、容器和迁移分支修复 |
| **多 Agent 执行边界** | OpenClaw、Hermes、NanoClaw、ZeroClaw、LobsterAI | 保留成功分支、仅重试失败任务；隔离子代理完成事件；实现专业委派；明确预算与结果归属 |
| **真实状态与界面一致** | OpenClaw、NanoBot、Hermes、ZeroClaw | 区分启用意图与连接状态；恢复正确 Gateway；避免旧页面覆盖配置；确保成功状态对应实际送达 |
| **跨平台与远程接入** | OpenClaw、NanoBot、Hermes、LobsterAI | macOS 启动与原生绑定、Windows SSH/任务环境、远端路径、多显示器与 DPI 适配 |
| **模型及执行后端兼容** | OpenClaw、Hermes、NanoClaw、IronClaw | 冷却与认证路由、流式工具解析、Codex/Claude 集成、OpenAI 兼容提供商接入 |

其中，**预算治理、状态完整性和恢复语义**最具跨项目普遍性，值得作为智能体基础设施的核心能力，而不是上线后的补丁功能。

## 5. 差异化定位分析

以下定位依据本窗口议题归纳，不替代项目的完整产品定义。

| 项目 | 功能侧重 | 更匹配的用户场景 | 可见架构特征或关键挑战 |
|---|---|---|---|
| **OpenClaw** | 综合个人助手、多渠道、长期记忆与协作治理 | 需要长期运行和多入口使用的个人及团队 | Gateway、客户端、插件与持久状态协同；一致性复杂度高 |
| **Hermes Agent** | Kanban 自动化、工具执行、后台任务 | 重视任务编排和无人值守的开发者、自动化用户 | worker、Profile、流式工具及升级生命周期管理 |
| **NanoBot** | SSH 网关连接、跨客户端交互与本地化 | 有远程接入、Windows 和多语言需求的用户 | WebUI/TUI/文本渠道体验及可追溯发布流程 |
| **NanoClaw** | Codex/Claude 集成、消息渠道执行 | 使用相关运行时构建消息型助手的开发者 | 容器及 SDK 依赖、事件归属、认证与重连语义 |
| **ZeroClaw** | 成本控制、语音、仪表盘与桌面通知 | 对预算和交互控制要求较高的用户 | 委派预算传播、配置并发更新、语音自动发送边界 |
| **LobsterAI** | 桌面助手、专业 Agent 委派、办公产物 | 桌面任务和办公自动化用户 | DSH 运行时迁移、独立 Agent 配置、多屏与文件兼容 |
| **CoPaw** | 插件应用、控制台、技能与配置管理 | 扩展插件、维护长会话的开发者与用户 | 前端 bundle 加载、上下文恢复、配置 API 语义 |
| **IronClaw** | 本窗口体现为提供商目录扩展 | 希望降低兼容模型服务接入成本的用户 | 提供商注册与端点兼容验证；架构信息不足 |

PicoClaw、NullClaw、TinyClaw、Moltis、ZeptoClaw 本窗口无新增信号，不宜据此补推其定位或技术优劣。

## 6. 社区热度与成熟度

### 活跃度分层

- **高强度迭代：OpenClaw、Hermes Agent。**更新量显著领先，但核心执行与生命周期问题仍多，属于“能力扩展与可靠性补课并行”。
- **专项快速迭代：ZeroClaw、NanoClaw。**问题面相对集中，多个缺陷已有修复候选；下一步应观察评审、合并和发布吞吐。
- **定向工程推进：LobsterAI。**运行时迁移和协作能力建设突出，同时修复桌面体验；单作者集中提交不等于广泛社区热度。
- **质量与交付巩固：NanoBot。**发布、构建产物校验、交互修复和跨平台兼容构成本窗口主线。
- **小规模维护或需求收集：CoPaw、IronClaw。**前者有维护候选，后者主要是需求输入。
- **暂不可判断：其余五个无活动项目。**单日静默可能来自维护节奏或采集范围，不能等同于不活跃项目。

### 成熟度应看闭环，而不是看数量

本次 Issue 评论普遍较少，PR 评论数据又大面积缺失，因此更适合比较**工程活动密度**，不适合给出社区人气排名。判断生产成熟度，应重点查看：

1. 高影响缺陷是否有可复现测试和已发布修复；
2. 重试、预算、授权及持久写入是否有明确边界；
3. 升级、回滚与中断恢复是否经过端到端验证；
4. 关闭事项能否追溯至提交、版本和用户验证。

## 7. 值得关注的趋势信号

### ① 从“任务能完成”转向“失败也必须可控”
OpenClaw 的永久拒绝循环、Hermes 的重复计费拉起、ZeroClaw 的子代理预算约束共同表明：**失败成本已成为智能体质量的重要维度。**

**开发参考：**将不可重试错误分类、重试上限、预算继承和熔断恢复条件设计为运行时机制，而非仅依赖提示词。

### ② 记忆与上下文进入数据工程范畴
长期记忆异常、压缩失败提示和状态持久化问题表明，助手保存的不只是聊天记录，而是用户持续依赖的工作资产。

**开发参考：**采用原子写入、版本快照、空输出保护、恢复演练和明确的破坏性操作确认。

### ③ 多智能体竞争重点转向责任边界
子代理提前结束主回合、委派成本未受限、审批未绑定具体结果，说明“可以创建多个 Agent”已不足以证明协作可靠。

**开发参考：**显式建模任务 ID、事件来源、产物版本、审批对象、预算归属及幂等键，避免只靠对话文本协调。

### ④ 桌面化与多渠道化放大一致性问题
App 与后台版本错位、旧设置页覆盖新配置、渠道显示状态与真实状态不一致，都是分布式状态协调问题在个人助手中的体现。

**开发参考：**建立单一权威状态来源、配置版本检查、兼容性握手，以及与实际投递结果对应的完成状态。

### ⑤ 发布可追溯性正在成为竞争能力
NanoBot 的产物校验与发布自动化是积极信号；多个项目关闭 PR 却无法确认交付，也暴露了证据链缺口。

**开发参考：**维护“问题—修复 PR—测试—构建产物—发布版本—用户验证”的完整关联，避免以关闭数代替交付质量。

---

## 决策结论

**OpenClaw 与 Hermes 值得作为复杂能力和真实故障模式的重点观察对象；NanoBot 提供了本窗口最明确的版本交付信号；ZeroClaw、NanoClaw 和 LobsterAI 则分别体现预算治理、执行后端集成与桌面协作的专项演进。**

对技术选型而言，当前比功能清单更重要的是验证三件事：**失败是否有界、状态是否可信、升级后能否恢复。**这三项能力，比单日更新量更能决定个人助手和自主智能体能否长期投入使用。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报
**日期：2026-11-22**  
**项目：[HKUDS/nanobot](https://github.com/HKUDS/nanobot)**

> 数据口径：基于所提供的过去 24 小时快照，PR 时间字段均为 2026-11-21。`CLOSED` 未区分“已合并”和“直接关闭”；评论数为 `undefined`，不视为 0。Release 说明存在截断，以下结论仅覆盖可确认的信息。

## 1. 今日速览

过去 24 小时，NanoBot 有 **6 条 PR 更新、1 个新版本发布，未记录到 Issue 更新**，整体呈现以版本交付和维护工作为主的中等活跃状态。新版本 **[v0.4.2](https://github.com/HKUDS/nanobot/releases/tag/v0.4.2)** 重点涉及 SSH 网关连接及 Windows 主机兼容性。PR 工作集中于 WebUI 交互稳定性、跨客户端本地化，以及发布流程与文档维护。当前 3 条 PR 待合并、3 条已关闭，但无法据此确认全部关闭项均已进入主分支；社区讨论热度也因评论数据缺失而无法量化。

## 2. 版本发布

### [v0.4.2](https://github.com/HKUDS/nanobot/releases/tag/v0.4.2)

**已确认更新**
- 支持通过 SSH 连接同时公布公共 WebSocket URL 的网关。
- **“Use existing SSH settings”** 支持 Windows 主机，前提是可通过 `python` 命令运行 Python 3。

**使用限制与升级注意事项**
- 快速配对命令仍仅支持 Linux，Windows 用户不应将其视为本次新增能力。
- 发布说明提及网关原生 TLS 与 `trustedProxyAuth` 仍有不支持的情形，但原文在 “over” 后截断，**无法确认完整限制范围**；依赖这些认证或传输配置的用户，应先核对完整发布说明再升级。
- 所提供内容**未明确列出破坏性变更或必需迁移步骤**，这不等同于确认不存在。建议重点验证 SSH 连接、Windows Python 命令可用性及现有网关认证配置。

**配套工作**
- [PR #6744：准备 v0.4.2](https://github.com/HKUDS/nanobot/pull/6744) 已关闭，涉及包版本和源码回退版本更新为 `0.4.2`。
- [PR #6746：保持最新版链接有效](https://github.com/HKUDS/nanobot/pull/6746) 仍开放，拟将 README 改为 GitHub 动态 Latest Release 链接，并补充版本归档。

## 3. 项目进展

以下重要 PR 已标记为关闭，**合并状态仍需核验**：

| PR | 工作内容 | 推进价值 |
|---|---|---|
| [#6743：修复模型选择器重开时的焦点问题](https://github.com/HKUDS/nanobot/pull/6743) | 重开选择器时清除待执行的焦点回退，并忽略旧选择器的关闭回调 | 避免快速操作时新选择器意外关闭，改善模型及推理强度配置体验 |
| [#6744：准备 v0.4.2](https://github.com/HKUDS/nanobot/pull/6744) | 更新两处版本声明，并提出从主分支精确提交构建、校验 CI 矩阵与五个平台包的要求 | 推动正式版本交付与构建一致性检查 |
| [#6745：一键发布已验收构建至 PyPI](https://github.com/HKUDS/nanobot/pull/6745) | 拟以发布 GitHub Release 触发上传五个 wheel 和源码包，并校验标签、文件及 CI 清单一致性 | 降低发布时误用构建产物、文件变化或版本错配的风险 |

**进展判断：**今日属于“小步迭代、交付加固”，而非大规模功能扩张。已确认的新版本发布是主要交付成果；上述关闭 PR 的实际落地范围不能仅凭状态确定。

## 4. 社区热点

**无法可靠评选“讨论最多”的条目**：本次无 Issue 更新，所有 PR 评论数缺失，👍 均为 0。以下按用户影响筛选关注点，不代表热度排名。

- **多语言交互一致性：[PR #6747](https://github.com/HKUDS/nanobot/pull/6747)**  
  拟让 17 个内置斜杠命令在 WebUI、TUI 和文本渠道中按阅读者语言返回结果。背后的诉求是减少多语言用户理解操作反馈的成本，同时保持提示词等原始内容不被误改。

- **失败渠道的可控性：[PR #6748](https://github.com/HKUDS/nanobot/pull/6748)**  
  微信登录过期后，渠道仍启用，但开关看似关闭，点击反而重试连接。核心诉求是明确区分“用户启用意图”和“当前连接状态”。

- **发布可信度：[PR #6745](https://github.com/HKUDS/nanobot/pull/6745)**  
  工作重点从“能够上传”转向“只上传与验收记录一致的产物”，体现对发布可追溯性和分发可靠性的重视。

## 5. Bug 与稳定性

以下为快照中涉及的缺陷，并不表示都在当日首次报告。严重程度为基于影响的分析判断，非项目官方分级。

| 严重程度 | 问题与影响 | Fix PR 状态 |
|---|---|---|
| **中等：渠道控制行为异常** | 微信登录失效后，开关外观与启用状态不一致，用户尝试关闭时可能触发重连，妨碍停用故障渠道 | [#6748](https://github.com/HKUDS/nanobot/pull/6748) 已有修复 PR，**OPEN**，标签为 `priority: p2` |
| **较低：模型选择器焦点竞争** | 选择预设后快速重开选择器，旧实例可能将焦点送回输入框，导致新选择器关闭，影响推理强度调整 | [#6743](https://github.com/HKUDS/nanobot/pull/6743) 已有修复 PR，**CLOSED**，是否合并未确认 |

本次快照**未出现崩溃、数据丢失或安全漏洞报告**，但不能据此推断项目不存在此类问题。

## 6. 功能请求与路线图信号

- **跨客户端命令结果本地化——已有具体实现候选。**  
  [PR #6747](https://github.com/HKUDS/nanobot/pull/6747) 覆盖 17 个内置命令，并拟确保 `/model` 成功切换后更新当前会话徽标、失败时保持不变；还支持以另一种语言展示新保存的回复。该工作显示项目正推进跨客户端体验一致性，但尚无下一版本纳入承诺。

- **渠道状态与操作语义分离——近期维护重点。**  
  [PR #6748](https://github.com/HKUDS/nanobot/pull/6748) 已开放且标记 P2，是后续补丁版本的候选；具体排期未知。

- **发布入口与文档同步——配套完善信号。**  
  [PR #6746](https://github.com/HKUDS/nanobot/pull/6746) 仅涉及两份 Markdown 文件，并报告 `git diff --check` 通过，可减少未来版本发布后的手动链接维护。

以上信号来自已有 PR，**并非独立用户功能请求或正式路线图承诺**。

## 7. 用户反馈摘要

本次没有可用的 [Issue 评论](https://github.com/HKUDS/nanobot/issues) 或用户原话，**无法提炼真实满意度、抱怨频率或需求规模**。仅能从 PR 的问题描述识别以下使用痛点：

- 微信登录过期后，用户希望直接停用渠道，而不是被迫重试连接——见 [#6748](https://github.com/HKUDS/nanobot/pull/6748)。
- 用户快速切换模型并继续调整推理强度时，需要选择器保持稳定——见 [#6743](https://github.com/HKUDS/nanobot/pull/6743)。
- 多语言用户需要命令反馈可读，同时避免修改提示词等原始内容——见 [#6747](https://github.com/HKUDS/nanobot/pull/6747)。

这些是**贡献者描述的使用场景**，不应当作已验证的广泛用户反馈。

## 8. 待处理积压

**无法识别长期未响应积压。**所列开放 PR 均创建于 2026-11-21，且无审查、评论及维护者响应记录，不具备“长期搁置”的判断依据。

建议近期跟进：

1. **优先验证渠道关闭行为**：[PR #6748](https://github.com/HKUDS/nanobot/pull/6748)，重点检查登录失效、关闭和重新启用流程。
2. **审查本地化的一致性边界**：[PR #6747](https://github.com/HKUDS/nanobot/pull/6747)，重点检查语言回退、原始内容保留及 `/model` 状态同步。
3. **同步发布文档入口**：[PR #6746](https://github.com/HKUDS/nanobot/pull/6746)，避免 v0.4.2 发布后 README 仍指向旧版。

**项目健康度结论：**本次快照显示发布活动持续，维护工作覆盖实际交互缺陷与发布可靠性，工程侧信号积极；但缺少评论、审查和历史积压数据，尚不足以判断社区响应效率及长期维护压力。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-11-22**  
项目：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

> **数据口径**：过去 24 小时共有 50 条 Issue、50 条 PR 更新；本日报基于其中展示的 30 条 Issue 和 20 条 PR 分析。PR 评论数为 `undefined`，且未提供评论正文，因此不能判断 PR 讨论热度，也不能将 Issue 摘要视为评论共识。

## 1. 今日速览

过去 24 小时，项目共有 **100 条 Issue/PR 更新**，提交与反馈活跃；其中 47 条 Issue 处于新开或活跃状态，48 条 PR 待合并。工作重点集中于 **Kanban 自动化任务的费用与重试控制、升级兼容性、工具调用可靠性，以及 Desktop/Windows 使用体验**。多个问题已出现对应修复 PR，但展示的 20 条 PR 均为 OPEN，当前更适合评价为“修复供给活跃”，而非“修复已交付”。本日无新版本发布；整体健康度呈现 **活跃度较高、稳定性压力突出、落地效果仍待验证** 的状态。[项目动态](https://github.com/NousResearch/hermes-agent/pulse)

## 2. 项目进展

### 已完成事项：可确认范围有限

- **全量概览显示 2 条 PR 已合并或关闭，但未提供其明细**，无法确定具体交付内容，也不能将其等同于两项修复已合入。所展示 PR 全部待合并，因而无法量化今天主分支实际前进了多少。[PR 列表](https://github.com/NousResearch/hermes-agent/pulls)
- **Desktop 按 Profile 设置主题的问题已关闭**：问题描述指出主题写入使用当前 Gateway Profile，读取却优先使用连接描述中的 Profile，可能出现设置与显示不一致。但数据未给出关闭原因或关联提交，尚不能确认修复方式。[Issue #158700](https://github.com/NousResearch/hermes-agent/issues/158700)
- 其余两条已关闭 Issue 为测试性质的 “perm probe” 和 “t”，不宜计入实质产品进展。[#158709](https://github.com/NousResearch/hermes-agent/issues/158709) · [#158708](https://github.com/NousResearch/hermes-agent/issues/158708)

### 在途工作：可靠性治理是主线

| 方向 | 今日可见推进 | 状态 |
|---|---|---|
| Kanban 成本控制 | 限制配额耗尽后的反复拉起，避免失败任务持续产生费用 | [PR #158748](https://github.com/NousResearch/hermes-agent/pull/158748)，待合并 |
| 自动化循环治理 | 防止已被熔断器升级到 triage 的卡片又被自动扫描重新启动 | [PR #158743](https://github.com/NousResearch/hermes-agent/pull/158743)，待合并 |
| 升级兼容性 | 处理旧进程跨越 `hermes update` 后延迟导入新代码树的兼容问题 | [PR #158747](https://github.com/NousResearch/hermes-agent/pull/158747)，待合并 |
| 定时消息投递 | 推进 Bot Chat 持久化投递归属处理，并补充回归测试 | [PR #158741](https://github.com/NousResearch/hermes-agent/pull/158741)，待合并 |
| RE2 迁移准备 | 增加模式检查、调整导入期行为、演练升级并设置启动保护 | [#158718](https://github.com/NousResearch/hermes-agent/pull/158718) · [#158719](https://github.com/NousResearch/hermes-agent/pull/158719) · [#158720](https://github.com/NousResearch/hermes-agent/pull/158720) · [#158721](https://github.com/NousResearch/hermes-agent/pull/158721)，均待合并 |

**进展判断**：当前可见贡献主要是在为长时间运行、自动重试和跨版本升级补齐可靠性边界；方向明确，但尚需通过合并、测试和后续发布转化为用户可获得的收益。

## 3. 社区热点

可见 Issue 的最高评论数仅为 **2 条**，所有展示条目的 👍 均为 0，尚无强烈的社区共识信号。以下是相对活跃的话题，而非高热度排行。

| 话题 | 可见互动 | 背后的诉求 |
|---|---:|---|
| [按 Profile 的主题设置失效 #158700](https://github.com/NousResearch/hermes-agent/issues/158700) | 2 条评论，已关闭 | 多 Profile 用户希望设置、连接状态和界面表现一致 |
| [Windows 启动未激活主 Cloud Gateway #158640](https://github.com/NousResearch/hermes-agent/issues/158640) | 2 条评论，开放 | 已保存的主连接应在重启后可靠恢复，避免会话进入 Local |
| [辅助视觉分析回答过度详尽 #158699](https://github.com/NousResearch/hermes-agent/issues/158699) | 1 条评论，开放 | 针对性问题应得到聚焦回答，而非先生成完整图像描述；已有 [修复 PR #158745](https://github.com/NousResearch/hermes-agent/pull/158745) |
| [MiniMax 仍展示退役模型 #158636](https://github.com/NousResearch/hermes-agent/issues/158636) | 1 条评论，开放 | 模型目录应及时反映上游可用性，减少选择后才收到 404 的失败体验 |
| [实时语音接通提示 #158674](https://github.com/NousResearch/hermes-agent/issues/158674) | 1 条评论，开放 | 语音助手需要明确告知用户“已经可以开始说话” |

## 4. Bug 与稳定性

以下按**潜在用户影响**排序，不替代项目自身的 P2/P3 标签。所有列出的修复 PR 均未合并；“未见”仅表示本次展示数据未提供。

| 风险顺序 | 问题与影响 | Fix PR |
|---|---|---|
| **高：持续费用风险** | 配额墙后的 Kanban 卡片可能在每次冷却结束后重新启动，重复加载付费上下文；PR 摘要报告单张卡片出现 244 次计费拉起 | [#158748](https://github.com/NousResearch/hermes-agent/pull/158748) |
| **高：任务执行受阻** | Kimi K3 的 deferred-tool 桥接收到空参数 `{}`，报告称影响所有带参数的 MCP/插件延迟调用 | [Issue #158734](https://github.com/NousResearch/hermes-agent/issues/158734)；未见 |
| **高：流式工具调用丢失** | 同一流式分块含文本与首个工具调用增量时，提前 `continue` 可能丢弃工具名，触发 `Unknown tool ''` | [Issue #158731](https://github.com/NousResearch/hermes-agent/issues/158731)；未见 |
| **高：会话中断** | Gateway 在流式生成期间清理缓存，可能释放仍在使用的客户端并终止请求 | [Issue #158726](https://github.com/NousResearch/hermes-agent/issues/158726)；未见 |
| **高：后台任务误终止** | Kanban worker 首次持久化回执超时即被判为致命失败，导致 worker 被杀、卡片自动阻塞 | [Issue #158691](https://github.com/NousResearch/hermes-agent/issues/158691)；未见 |
| **高：升级后运行故障** | 老进程跨更新存活，延迟导入新模块时与已加载旧模块不兼容 | [Issue #158723](https://github.com/NousResearch/hermes-agent/issues/158723) → [PR #158747](https://github.com/NousResearch/hermes-agent/pull/158747) |
| **中高：审批路径崩溃** | Smart approvals 对列表形态的模型内容直接调用 `.strip()`，触发 `AttributeError`；数据未显示存在审批绕过 | [Issue #158737](https://github.com/NousResearch/hermes-agent/issues/158737) → [PR #158739](https://github.com/NousResearch/hermes-agent/pull/158739) |
| **中高：连接目标异常** | Windows Desktop 重启后未激活已配置的主 Cloud Gateway，转而路由至 Local | [Issue #158640](https://github.com/NousResearch/hermes-agent/issues/158640)；未见 |
| **中：浏览器不可用** | Bot Desktop 已开启屏幕时仍无头启动共享浏览器，导致空白屏幕及 `SingletonLock` 冲突 | [Issue #158738](https://github.com/NousResearch/hermes-agent/issues/158738) → [PR #158740](https://github.com/NousResearch/hermes-agent/pull/158740) |
| **中：Windows 平台兼容** | WhatsApp 次级 Profile 在计划任务环境下启动失败；缓存同步为 POSIX 远端生成反斜杠路径 | [#158736](https://github.com/NousResearch/hermes-agent/issues/158736) · [#158690](https://github.com/NousResearch/hermes-agent/issues/158690)；均未见 |
| **中：性能与成本退化** | 会话切换报告 1–2 秒 UI 冻结；压缩摘要端点拒绝 tool 消息后反复回退主模型 | [#158689](https://github.com/NousResearch/hermes-agent/issues/158689) · [#158684](https://github.com/NousResearch/hermes-agent/issues/158684)；均未见 |

**稳定性信号**：问题横跨模型响应格式、流式处理、进程生命周期和跨平台路径，不是单一组件故障。尤其应优先验证“失败是否有界、在途任务是否被保护、升级是否允许旧进程安全退出”。

## 5. 功能请求与路线图信号

### 已有实现候选，更接近交付

- **可选的终端输出无损裁剪**：在压缩边界对旧终端结果进行确定性精简，保留唯一输出行、顺序、重复次数及退出状态等信息。已有实现 PR，但尚无版本承诺。[PR #158724](https://github.com/NousResearch/hermes-agent/pull/158724)
- **hermes-talk 插件目录更新**：拟从插件的 0.22.1 catalog build 更新到 0.24.1 catalog build；这是插件目录版本，不代表 Hermes Agent 核心版本发布。[PR #158730](https://github.com/NousResearch/hermes-agent/pull/158730)

### 用户需求明确，尚未见对应实现

- **Skills 管理优先于商店浏览**：希望更容易找到当前 Profile 已安装技能、开关和使用频次，反映能力扩展之后的管理成本。[Issue #158746](https://github.com/NousResearch/hermes-agent/issues/158746)
- **托管配置可选择 fail-closed**：共享配置缺失或格式错误时应可拒绝继续运行，并由 `config check / doctor` 报告，面向多 Profile、集中管理场景。[Issue #158744](https://github.com/NousResearch/hermes-agent/issues/158744)
- **多语言自动切换 TTS 声线**：希望按回复语言选择不同语音，改善多语言个人助手体验。[Issue #158735](https://github.com/NousResearch/hermes-agent/issues/158735)
- **配置与界面一致**：关闭 STT 后隐藏听写入口，避免展示无法使用的按钮。[Issue #158729](https://github.com/NousResearch/hermes-agent/issues/158729)
- **Kanban 幂等创建能力**：需要 board 级键查询，以及能区分相同请求与键冲突的 create-or-reuse 机制，支撑中断后的安全重试。[Issue #158682](https://github.com/NousResearch/hermes-agent/issues/158682)

**下一版本判断**：已有 PR 的终端裁剪与插件目录更新，比纯需求条目更接近交付；但当前没有发布计划或合并证据，不能确认进入下一版本。

## 6. 用户反馈摘要

*未提供评论正文，以下仅提炼 Issue 描述中的使用场景与痛点，不代表评论区一致意见。*

- **“能长期无人值守”比“能启动任务”更关键。** Kanban 用户遇到回执超时终止任务、失败卡片重新进入执行循环等边界问题，诉求是稳定重试和可预测的失败处理。[#158691](https://github.com/NousResearch/hermes-agent/issues/158691) · [PR #158743](https://github.com/NousResearch/hermes-agent/pull/158743)
- **Desktop 用户希望界面反映真实状态。** 包括技能是否启用、子代理是否仍在运行、当前连接是否恢复正确；不一致会增加人工核查成本。[#158746](https://github.com/NousResearch/hermes-agent/issues/158746) · [#158715](https://github.com/NousResearch/hermes-agent/issues/158715) · [#158640](https://github.com/NousResearch/hermes-agent/issues/158640)
- **跨系统部署是实际使用场景。** Windows 原生 Gateway、WSL2 中的 Signal、SSH 隧道和 Linux 远端组合，暴露端口校验与路径表示差异。[#158702](https://github.com/NousResearch/hermes-agent/issues/158702) · [#158690](https://github.com/NousResearch/hermes-agent/issues/158690)
- **用户期待更少冗余、更低运行开销。** 定向视觉问答不应生成全面描述，持久 SSH 主机不应反复接收未变化文件。[#158699](https://github.com/NousResearch/hermes-agent/issues/158699) · [#158688](https://github.com/NousResearch/hermes-agent/issues/158688)

本次数据以问题报告为主，**不足以推断整体满意度或满意度变化**。

## 7. 待处理积压与维护建议

所展示条目均创建于 11 月 21–22 日，缺少维护者响应时间，**无法识别真正“长期未响应”的积压**。建议先将以下事项列为近期跟踪队列：

1. **优先审查费用与自动重试控制**：验证配额墙重试上限、熔断升级后是否仍会被自动扫描拉起，并覆盖恢复条件。[PR #158748](https://github.com/NousResearch/hermes-agent/pull/158748) · [PR #158743](https://github.com/NousResearch/hermes-agent/pull/158743)
2. **跟进尚无可见修复的执行阻断问题**：Kimi 空参数、流式工具名丢失、在途会话被释放，均直接影响 Agent 完成任务。[#158734](https://github.com/NousResearch/hermes-agent/issues/158734) · [#158731](https://github.com/NousResearch/hermes-agent/issues/158731) · [#158726](https://github.com/NousResearch/hermes-agent/issues/158726)
3. **联合验证升级与 RE2 迁移链路**：关注堆叠 PR 的依赖关系、旧进程兼容，以及依赖同步失败后的启动行为，避免只验证单个提交。[PR #158747](https://github.com/NousResearch/hermes-agent/pull/158747) · [PR #158720](https://github.com/NousResearch/hermes-agent/pull/158720) · [PR #158721](https://github.com/NousResearch/hermes-agent/pull/158721)
4. **补齐关闭与交付证据**：对已关闭主题问题补充修复关联，并在后续日报核实两条已合并/关闭 PR 的实际内容，避免将状态变化误记为交付。[Issue #158700](https://github.com/NousResearch/hermes-agent/issues/158700) · [PR 列表](https://github.com/NousResearch/hermes-agent/pulls)

**结论**：今日最积极的信号是多个高影响问题迅速获得修复候选；最需要警惕的是费用循环、在途任务生命周期和升级兼容性。短期项目健康度的关键，不在新增需求数量，而在这些修复能否完成审查、回归验证并形成可确认的交付。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报
**日期：2026-11-22｜统计范围：所提供的过去 24 小时 GitHub 更新**

> 数据说明：条目更新时间均标为 2026-11-21，本报沿用输入中的“过去 24 小时”统计口径。项目名称指向 `qwibitai/nanoclaw`，但条目链接标识为 `nanocoai/nanoclaw`，以下按条目所示仓库生成链接。PR 的 `CLOSED` 不等于已合并；提供的数据未包含合并标记、PR 评论数或评论正文。

## 1. 今日速览

过去 24 小时共有 **8 条 Issue 更新、9 条 PR 更新**，其中 6 条 Issue 仍开放、7 条 PR 待合并，未发布新版本，整体呈现**较活跃的稳定性维护节奏**。工作主要集中在 Codex 认证与事件处理、Claude 运行时依赖、消息渠道兼容和安装升级体验，例如 [Codex 登录修复 #4531](https://github.com/nanocoai/nanoclaw/pull/4531) 与 [Claude 运行时升级 #4524](https://github.com/nanocoai/nanoclaw/pull/4524)。6 条开放 Issue 中有 4 条可匹配到修复 PR，说明问题响应较积极，但这些修复尚不能视为已经交付。当前主要风险是 [Codex 子代理提前结束主回合 #4528](https://github.com/nanocoai/nanoclaw/issues/4528) 和 [短暂断连导致回复失败 #4530](https://github.com/nanocoai/nanoclaw/issues/4530)，两者均未见对应修复 PR。

## 2. 项目进展

### 已关闭的重要 PR：有推进迹象，但合并状态待核实

| PR | 变更内容与价值 | 当前可确认状态 |
|---|---|---|
| [#4518 Telegram 语音消息标记修复](https://github.com/nanocoai/nanoclaw/pull/4518) | 将语音便笺与普通音频区分，与 WhatsApp 的处理语义对齐，帮助智能体正确理解附件类型。关联 [Issue #4517](https://github.com/nanocoai/nanoclaw/issues/4517) 也已关闭。 | PR、Issue 均已关闭；不能据此确认已合并或发布。 |
| [#4520 加固镜像刷新](https://github.com/nanocoai/nanoclaw/pull/4520) | 为 `v2026.11.0` 指定 `v2026.11.0-20261121T0916` 加固镜像及新摘要，属于镜像维护，不是新版本发布。 | PR 已关闭，是否实际采用需核实。 |

此外，[Claude token 解析问题 #4519](https://github.com/nanocoai/nanoclaw/issues/4519) 已关闭，但列表未提供对应修复 PR或关闭原因，不能断言已修复。

**整体判断：**今天的进展以维护收敛和修复准备为主，而非新功能扩张。待合并改动覆盖多个关键路径，但“提出修复”到“用户可用”之间仍有审查、合并和发布环节。

## 3. 社区热点

当前互动量不高，更接近集中缺陷反馈，而非广泛社区讨论：全部 Issue 的 👍 均为 0，PR 评论数未提供。

1. **Claude token 解析异常：3 条评论，为已知讨论最多的条目。**  
   终端重绘 token 尾部时，解析逻辑可能拼接出过长 token，暴露出终端输出清洗与认证可靠性问题。该问题已关闭，但评论正文缺失，无法判断最终处理方案。  
   链接：[Issue #4519](https://github.com/nanocoai/nanoclaw/issues/4519)

2. **Telegram 语音便笺识别：1 条评论。**  
   用户诉求不是“能收到音频”，而是让智能体知道“这是语音消息”。这反映出跨渠道附件语义一致性的重要性。  
   链接：[Issue #4517](https://github.com/nanocoai/nanoclaw/issues/4517) · [PR #4518](https://github.com/nanocoai/nanoclaw/pull/4518)

3. **Codex 集成是问题最集中的方向。**  
   今日出现认证失效后无法替换、重连被误判失败、子代理事件干扰主回合三类问题，覆盖“接入—执行—恢复”链路；不过三条 Issue 均无评论，不能把问题集中度等同于社区讨论热度。  
   链接：[认证 #4529](https://github.com/nanocoai/nanoclaw/issues/4529) · [重连 #4530](https://github.com/nanocoai/nanoclaw/issues/4530) · [子代理 #4528](https://github.com/nanocoai/nanoclaw/issues/4528)

## 4. Bug 与稳定性

以下为依据潜在影响给出的分析优先级，并非项目官方严重性评级。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **高：安全相关** | WhatsApp 渠道依赖仍使用受消息伪造公告影响的 Baileys `7.0.0-rc.9`，依赖声明与既有更新不一致。 | [PR #4516](https://github.com/nanocoai/nanoclaw/pull/4516) 待合并，拟升级至 `7.0.0-rc14`；未提供部署受影响范围。 |
| **高：任务正确性** | Codex 子代理完成事件被当作主代理事件，导致主回合提前结束，影响多代理任务完整性。 | [Issue #4528](https://github.com/nanocoai/nanoclaw/issues/4528) 开放；未见 fix PR。 |
| **高：执行可靠性** | 短暂网络中断时，Codex 即使声明将重试并恢复，NanoClaw 仍可能提前将回复判为失败。 | [Issue #4530](https://github.com/nanocoai/nanoclaw/issues/4530) 开放；未见 fix PR。 |
| **中高：认证阻断** | OpenAI 凭据失效后，Codex 设置流程仍提示“已连接”，阻碍替换凭据及恢复使用。 | [Issue #4529](https://github.com/nanocoai/nanoclaw/issues/4529)；已有待合并 [PR #4531](https://github.com/nanocoai/nanoclaw/pull/4531)。 |
| **中：运行时维护** | 容器固定的 Claude Code `2.1.321` 未包含后续会话恢复、上下文压缩等修复；不等于所有相关故障已在 NanoClaw 中复现。 | [Issue #4523](https://github.com/nanocoai/nanoclaw/issues/4523)；[PR #4524](https://github.com/nanocoai/nanoclaw/pull/4524) 拟升级 Code/SDK 至 `2.1.330` / `0.3.330`。 |
| **中：升级体验** | detached HEAD 状态下运行 `/update-nanoclaw`，直接暴露 `git symbolic-ref` 错误。 | [Issue #4525](https://github.com/nanocoai/nanoclaw/issues/4525)；[PR #4527](https://github.com/nanocoai/nanoclaw/pull/4527) 提供位置说明及恢复指引，并非承诺自动完成升级。 |
| **中：初始化误判** | 首次聊天检查可能把正常回复中的 “not logged in” 当成认证失败。 | 已有待合并 [PR #4526](https://github.com/nanocoai/nanoclaw/pull/4526)，改为仅检查带失败标记的通知或 stderr。 |
| **加固项** | Restamp 对代理可写文件先做类型检查、再按路径读取，存在检查与读取之间的竞态风险。报告明确声明其不是可利用漏洞。 | [Issue #4521](https://github.com/nanocoai/nanoclaw/issues/4521)；[PR #4522](https://github.com/nanocoai/nanoclaw/pull/4522) 拟使用不跟随符号链接、不等待命名管道的文件描述符读取。 |

已关闭、仍需确认交付结果的缺陷包括：[token 解析 #4519](https://github.com/nanocoai/nanoclaw/issues/4519) 和 [Telegram 语音语义 #4517](https://github.com/nanocoai/nanoclaw/issues/4517)。

## 5. 功能请求与路线图信号

**本批数据没有明确的新功能请求，也没有足够证据推断长期路线图。**近期信号主要是提升既有能力的可靠性：

- **认证自愈与错误诊断更清晰。**凭据替换、首次聊天误判和 detached HEAD 提示均已有 PR，属于较明确的近期候选改动。  
  链接：[PR #4531](https://github.com/nanocoai/nanoclaw/pull/4531) · [#4526](https://github.com/nanocoai/nanoclaw/pull/4526) · [#4527](https://github.com/nanocoai/nanoclaw/pull/4527)
- **运行时及渠道依赖维护持续推进。**Claude Code/SDK、Baileys 和开发依赖更新均在队列中，但没有合并或版本承诺。  
  链接：[PR #4524](https://github.com/nanocoai/nanoclaw/pull/4524) · [#4516](https://github.com/nanocoai/nanoclaw/pull/4516) · [#4532](https://github.com/nanocoai/nanoclaw/pull/4532)
- **Codex 多代理与重连语义需要进一步完善。**这是缺陷所揭示的技术需求，尚不是已确认的版本计划。  
  链接：[Issue #4528](https://github.com/nanocoai/nanoclaw/issues/4528) · [#4530](https://github.com/nanocoai/nanoclaw/issues/4530)

## 6. 用户反馈摘要

由于没有评论正文，以下仅归纳 Issue 描述中的使用痛点，不虚构用户引语或满意度结论。

- **恢复操作不应被旧状态阻塞。**凭据已经失效，设置流程却仍判定“已连接”，用户缺少明确的重新授权入口。  
  链接：[Issue #4529](https://github.com/nanocoai/nanoclaw/issues/4529)
- **底层重试成功，不应仍被上层判为失败。**用户需要短暂网络波动后的连续执行体验，而非手动重发任务。  
  链接：[Issue #4530](https://github.com/nanocoai/nanoclaw/issues/4530)
- **复杂任务需要准确的完成边界。**子代理完成不代表主任务完成，多代理场景对事件归属尤其敏感。  
  链接：[Issue #4528](https://github.com/nanocoai/nanoclaw/issues/4528)
- **安装方式与输入类型都需要被正确理解。**检出版本标签后的升级应给出可执行指引；Telegram 语音便笺则应保留区别于音乐文件的语义。  
  链接：[Issue #4525](https://github.com/nanocoai/nanoclaw/issues/4525) · [#4517](https://github.com/nanocoai/nanoclaw/issues/4517)

## 7. 待处理积压

**无法识别“长期未响应”积压：本批条目均在 2026-11-21 创建或更新，缺少历史等待时间。**建议维护者优先关注：

1. **尚无修复 PR 的核心执行问题**：确认 Codex 子代理事件隔离与重连处理的负责人、复现测试和修复计划。  
   链接：[Issue #4528](https://github.com/nanocoai/nanoclaw/issues/4528) · [#4530](https://github.com/nanocoai/nanoclaw/issues/4530)
2. **安全相关依赖更新**：核实 Baileys 升级的兼容性测试及实际受影响安装范围，避免渠道依赖继续滞后。  
   链接：[PR #4516](https://github.com/nanocoai/nanoclaw/pull/4516)
3. **已关闭事项的交付可追溯性**：补充关闭原因、关联提交和镜像采用状态，避免将“关闭”误读为“已修复并上线”。  
   链接：[Issue #4519](https://github.com/nanocoai/nanoclaw/issues/4519) · [PR #4518](https://github.com/nanocoai/nanoclaw/pull/4518) · [#4520](https://github.com/nanocoai/nanoclaw/pull/4520)

**健康度结论：维护响应积极，交付结果仍待验证。**修复工作覆盖面较广，但贡献主要集中于 glifocat；现有样本不足以判断长期社区多样性。下一观察重点应是关键 PR 是否合并、Codex 两项执行缺陷是否获得修复，以及关闭事项是否形成清晰的发布记录。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报｜2026-11-22

> 数据范围：所提供的过去 24 小时 GitHub 更新。唯一 Issue 的创建、更新时间均标为 2026-11-21，以下按其被纳入本次统计窗口处理；不代表它于 11 月 22 日新建。  
> 项目：[nearai/ironclaw](https://github.com/nearai/ironclaw)

## 1. 今日速览

过去 24 小时，IronClaw 记录到 **1 条 Issue 更新、0 条 PR 更新、0 个新版本发布**，可见活跃度较低。唯一议题是将 LLMTR 纳入内置 LLM 提供商目录，反映出用户对扩展 OpenAI 兼容服务接入的需求。当前没有可见的代码交付、合并或关闭记录，尚不能确认该需求已进入实施阶段。本次数据未出现 Bug 报告，但仅凭单日、单条 Issue 的样本，不足以判断整体稳定性或维护响应水平。  
相关链接：[功能请求 #8174](https://github.com/nearai/ironclaw/issues/8174) · [PR 列表](https://github.com/nearai/ironclaw/pulls)

## 2. 项目进展

- **本统计窗口未记录重要 PR 的合并或关闭。** 没有可据以确认的新功能落地或修复交付，今日可见进展主要停留在需求收集层面；这不代表仓库没有其他提交活动，只是所给数据未覆盖。  
  链接：[PR 列表](https://github.com/nearai/ironclaw/pulls)
- **提供商生态新增一项接入提议。** #8174 请求将 LLMTR 与 Groq、Together、Cerebras、MiniMax 一样纳入内置提供商目录，目前状态为 OPEN，未提供关联实现 PR。  
  链接：[#8174](https://github.com/nearai/ironclaw/issues/8174)

## 3. 社区热点

### #8174：将 LLMTR 作为内置 OpenAI 兼容 LLM 提供商

| 指标 | 数据 |
|---|---|
| 作者 | knowhycodata |
| 状态 | OPEN |
| 创建 / 更新日期 | 2026-11-21 / 2026-11-21 |
| 评论数 | 1 |
| 👍 数 | 0 |

该议题是本次数据中唯一、也是评论最多的讨论，但 **1 条评论、0 个赞尚不足以构成广泛社区共识**。

请求的核心是将 LLMTR 添加至 `crates/domains/ironclaw_llm/assets/providers.json`，服务地址为 `https://llmtr.com/v1`，模型标识采用 `vendor/model` 格式。其背后诉求是让这一网关成为可直接发现、选择的内置服务，而不只是具备协议兼容性。  
链接：[#8174](https://github.com/nearai/ironclaw/issues/8174)

## 4. Bug 与稳定性

- **本次数据未出现 Bug、崩溃或回归报告**，因此没有可按严重程度排序的问题，也没有可确认的关联 fix PR。唯一 Issue 属于功能请求，不能将其计入稳定性缺陷。该结论仅限所给统计窗口，不代表项目不存在已知问题。  
  链接：[Issue 列表](https://github.com/nearai/ironclaw/issues) · [#8174](https://github.com/nearai/ironclaw/issues/8174)

## 5. 功能请求与路线图信号

### 内置 LLMTR 提供商支持

- **明确需求：** 在提供商目录中增加 LLMTR，接入其 OpenAI 兼容端点，并支持 `vendor/model` 形式的模型 ID。
- **路线图信号：** 用户关注点是扩充模型服务选择与降低接入配置成本，而非新增智能体执行能力。
- **下一版本判断：** 当前没有关联 PR、维护者承诺或排期信息，**无法判断是否会进入下一版本**。虽然提议落点是目录文件，但不能据此认定仅需修改配置；端点兼容性和模型 ID 处理仍需验证。

链接：[#8174](https://github.com/nearai/ironclaw/issues/8174)

## 6. 用户反馈摘要

- **已明确表达的需求：** 提出者希望 LLMTR 获得与现有内置提供商同等的目录入口，使用其 OpenAI 兼容网关及命名空间模型 ID。  
  链接：[#8174](https://github.com/nearai/ironclaw/issues/8174)
- **可推断的使用场景：** 通过 LLMTR 网关访问采用不同厂商命名空间的模型；内置支持可能减少手动配置与查找接入信息的成本。这是基于请求内容的分析，不是评论原话。  
  链接：[#8174](https://github.com/nearai/ironclaw/issues/8174)
- **反馈证据有限：** 数据仅包含 Issue 摘要及“1 条评论”的计数，未提供评论正文，因此无法提炼评论中的实际使用体验、满意度或维护者回应。  
  链接：[#8174](https://github.com/nearai/ironclaw/issues/8174)

## 7. 待处理积压

- **未发现可确认的长期未响应项。** #8174 创建于 2026-11-21，仍是近期请求，不应归类为长期积压；同时，缺少评论内容，无法判断维护者是否已响应。建议后续关注其是否获得需求确认、负责人或实现 PR。  
  链接：[#8174](https://github.com/nearai/ironclaw/issues/8174)
- **完整积压状况无法评估。** 本次只提供统计窗口内的更新，没有历史未关闭事项及等待时长，不能据此判断项目是否存在持续积压。  
  链接：[Issue 列表](https://github.com/nearai/ironclaw/issues) · [PR 列表](https://github.com/nearai/ironclaw/pulls)

---

**健康度结论：** 今日呈现“低活跃、需求收集为主、无可见交付”的状态，没有新增稳定性风险信号，也没有足够证据证明风险下降。后续最值得跟踪的是 [#8174](https://github.com/nearai/ironclaw/issues/8174) 能否从用户提议推进至维护者确认和实现 PR。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报
**日期：2026-11-22**  
**项目：[netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)**

> **数据口径**：本日报依据所提供的过去 24 小时更新清单。8 条 PR 均标记为 `CLOSED`，但缺少合并状态字段，不能直接认定已合并；其创建、更新时间均显示为 2026-11-21。以下将“已关闭”与“已交付”严格区分。

## 1. 今日速览

过去 24 小时记录到 **8 条 PR 更新、0 条 Issue 更新、0 个新版本**，开发活动主要集中在运行时集成、多智能体协作和桌面体验修复。最重要的方向是 DeepSeek Harness（DSH）桌面运行时完善，以及跨 Agent 的专业任务委派，体现出项目正在推进底层运行能力与协作能力建设。稳定性工作覆盖 XLSX 导出、多屏与 Windows DPI 适配、任务停止状态持久化等实际使用环节。整体呈现“**工程侧集中推进、社区反馈可见度有限**”的状态：本批 PR 均由同一作者提交，且评论数据缺失，尚不足以判断社区讨论热度或功能落地程度。  
[项目仓库](https://github.com/netease-youdao/LobsterAI) · [PR 列表](https://github.com/netease-youdao/LobsterAI/pulls)

## 2. 项目进展

以下重点 PR 均已关闭，**是否合并、是否进入发布版本仍需核验**。

| 方向 | 重要进展 | 对项目的意义 |
|---|---|---|
| 多智能体协作 | [#3137](https://github.com/netease-youdao/LobsterAI/pull/3137) 为 DSH 恢复并升级跨 Agent 协作，支持发现并委派任务给已配置的专业 Agent；被委派 Agent 可使用各自的人设、长期记忆、技能、工作目录和模型 | 从单 Agent 执行向专业分工协作推进，是本批更新中最明确的能力扩展 |
| 桌面运行时 | [#3136](https://github.com/netease-youdao/LobsterAI/pull/3136) 完善计划任务、本地技能和媒体工具集成，包括保存已停止任务运行记录、协调重启中断的运行状态，以及在详情和历史筛选中显示停止状态 | 提高长时间任务与重启场景下的状态可追踪性，补齐桌面运行闭环 |
| 迁移分支维护 | [#3142](https://github.com/netease-youdao/LobsterAI/pull/3142) 将 `release/2026.11.17` 的三项引擎无关修复同步至 DSH 迁移分支 | 降低运行时迁移期间遗漏既有修复的风险；属于修复同步，不宜重复计算为新增能力 |
| 结果展示 | [#3139](https://github.com/netease-youdao/LobsterAI/pull/3139) 将文件卡片、内联图片和视频路径等产物移至最终回复元信息与操作行上方 | 改善任务交付物的阅读顺序和操作体验 |
| 首页入口 | [#3141](https://github.com/netease-youdao/LobsterAI/pull/3141) 标题涉及首页快捷操作和 PPT 导航，但正文为未填写的模板 | 可视为界面优化信号，无法据此确认具体功能范围 |

**整体判断**：本批变更同时覆盖底层能力和用户体验，但由于缺少合并记录、测试结果及发布信息，目前更适合评价为“推进了一组关键实现与修复”，而非确认已完成一次可用版本交付。

## 3. 社区热点

**无法按讨论热度可靠排名**：本批数据没有活跃 Issue，PR 评论数均为 `undefined`，不能视作零评论；8 条 PR 的 👍 均为 0，也未形成可辨识的点赞热点。

从技术影响而非社区热度看，值得关注的主题是：

- **多 Agent 的专业分工与上下文隔离**：[#3137](https://github.com/netease-youdao/LobsterAI/pull/3137) 指向不同 Agent 保留独立工作环境和能力配置的协作方式，适合复杂任务拆解，但目前不能确认这是高频用户诉求。
- **桌面助手的连续使用体验**：[#3140](https://github.com/netease-youdao/LobsterAI/pull/3140) 与 [#3138](https://github.com/netease-youdao/LobsterAI/pull/3138) 分别处理悬浮球停靠和悬停形象跳动，说明维护工作正在关注多屏、高 DPI 与视觉交互细节。

## 4. Bug 与稳定性

本期没有新增 Bug Issue。以下问题来自修复 PR 摘要，按**潜在影响**排序，非项目官方严重性评级；均已有对应 PR，但合并状态未确认。

| 优先级 | 问题及影响 | 修复状态 |
|---|---|---|
| 较高：文件兼容性 | 向 `openpyxl` 生成的 XLSX 添加工作表时，新增 `<sheet>` 可能使用未绑定的 `r` 命名空间前缀，导致 `openpyxl` 或严格解析器读取失败 | [#3143](https://github.com/netease-youdao/LobsterAI/pull/3143) 补齐工作簿关系命名空间；已关闭 |
| 中等：任务状态一致性 | 已停止运行的持久化、重启中断运行的协调和状态展示需要完善，涉及计划任务的可追踪性 | [#3136](https://github.com/netease-youdao/LobsterAI/pull/3136) 包含相关修复与集成；已关闭 |
| 中等：跨屏定位 | 悬浮球在显示器变化及 Windows DPI 场景下的停靠、位置持久化存在问题 | [#3140](https://github.com/netease-youdao/LobsterAI/pull/3140) 引入边缘、纵向比例和显示器标识等停靠元数据；已关闭 |
| 较低：视觉回归 | 8 款桌面伙伴皮肤在悬停时出现形象缩小、向下跳动 | [#3138](https://github.com/netease-youdao/LobsterAI/pull/3138) 调整图集缩放和垂直居中；已关闭 |
| 较低：布局体验 | 回合产物与最终回复元信息、操作行的排列顺序不理想 | [#3139](https://github.com/netease-youdao/LobsterAI/pull/3139) 调整产物位置；已关闭 |

**未见明确的崩溃、安全漏洞或数据丢失报告**；这仅代表本批数据未包含相关记录。

## 5. 功能请求与路线图信号

本期没有可核实的用户功能请求，路线图只能从 PR 推断：

- **较强信号：DSH 运行时继续完善。** 桌面集成与迁移分支修复同步同时出现，表明 DSH 是当前重要工程方向；但无法确认正式切换时间或是否进入下一版本。  
  [#3136](https://github.com/netease-youdao/LobsterAI/pull/3136) · [#3142](https://github.com/netease-youdao/LobsterAI/pull/3142)
- **较强信号：跨 Agent 专业委派。** 已有明确功能实现描述，是后续版本值得关注的候选能力，仍需核实合并与发布归属。  
  [#3137](https://github.com/netease-youdao/LobsterAI/pull/3137)
- **较弱信号：首页快捷入口与 PPT 导航。** 仅有标题，缺少功能说明、验收范围和测试信息，暂不宜据此预测上线。  
  [#3141](https://github.com/netease-youdao/LobsterAI/pull/3141)

## 6. 用户反馈摘要

**没有可提炼的真实用户评论样本。** 本期 Issue 更新为 0，PR 评论正文未提供，因此无法客观判断用户满意度、抱怨频率或需求优先级。

修复内容涉及的使用场景包括 Excel 文件二次编辑、多显示器桌面使用、计划任务重启恢复及任务产物查看；这些是**工程侧暴露的体验问题，不应替代用户原话或满意度结论**。  
[Excel 兼容性](https://github.com/netease-youdao/LobsterAI/pull/3143) · [跨屏体验](https://github.com/netease-youdao/LobsterAI/pull/3140) · [任务状态](https://github.com/netease-youdao/LobsterAI/pull/3136)

## 7. 待处理积压

现有数据不包含长期未响应的 Issue 或开放 PR 清单，**无法认定项目不存在积压，也无法列出可靠的长期积压项**。

建议维护者优先核查以下信息缺口：

1. **确认关键关闭 PR 的去向**：核验 DSH 集成与协作功能是已合并、被替代还是撤回，避免将关闭误报为交付。  
   [#3136](https://github.com/netease-youdao/LobsterAI/pull/3136) · [#3137](https://github.com/netease-youdao/LobsterAI/pull/3137)
2. **补齐 PR 描述**：首页快捷操作 PR 仍保留模板占位符，不利于评审、回归测试和发布说明整理。  
   [#3141](https://github.com/netease-youdao/LobsterAI/pull/3141)
3. **核实修复验证记录**：重点关注 XLSX 解析兼容性、多显示器与 Windows DPI、任务重启后的状态一致性。所给摘要未提供测试结果，不能认定尚未测试。  
   [#3143](https://github.com/netease-youdao/LobsterAI/pull/3143) · [#3140](https://github.com/netease-youdao/LobsterAI/pull/3140) · [#3136](https://github.com/netease-youdao/LobsterAI/pull/3136)

**健康度结论**：工程活动较集中，能力建设与稳定性修复并行；当前最大的观察盲区是合并确认、发布归属和真实用户反馈，而非已知的新增高危故障。

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

# CoPaw 项目动态日报｜2026-11-22

> **统计口径**：基于所提供的过去 24 小时 GitHub 数据，条目创建及更新时间均标注为 2026-11-21。项目名称沿用 CoPaw；因数据中的条目路径指向 `agentscope-ai/QwenPaw`，下文链接按该路径生成。

## 1. 今日速览

过去 24 小时共更新 **2 条 Issue、4 条 PR**，均处于开放状态，没有 Issue 关闭、PR 合并或关闭，也没有新版本发布。当前活动主要集中在控制台稳定性、上下文操作提示、配置文档和基础维护，未出现新增核心能力的明确交付。两条 Issue 各有 1 条评论、均无点赞；PR 评论数未提供，因此讨论热度暂不突出。整体呈现**小规模、维护型活跃**：贡献持续流入，但本统计窗口尚未体现修复落地，需优先关注插件路由失效及可能导致信息丢失的操作引导。

## 2. 项目进展

**今日没有已合并或关闭的重要 PR，不能将以下改动视为已交付。** 当前待审贡献均标记为 `size/XS`，主要改善使用体验和文档准确性。

| 待合并 PR | 推进方向与价值 | 当前状态 |
|---|---|---|
| [#8847：宽 Markdown 表格在消息气泡内滚动](https://github.com/agentscope-ai/QwenPaw/pull/8847) | 修正表格横向溢出且无法滚动的问题，改善长表格在对话中的阅读体验 | OPEN，待审核 |
| [#8846：补充环境变量合并、替换和重置语义](https://github.com/agentscope-ai/QwenPaw/pull/8846) | 澄清 `/envs` 接口行为，尤其是 `PUT` 整体替换可能删除其他已存变量的风险 | OPEN，待审核 |
| [#8850：修复 Terraform 技能文档失效链接](https://github.com/agentscope-ai/QwenPaw/pull/8850) | 修复 AWS 安全最佳实践引用的 404 链接，改善技能参考资料可用性 | OPEN，待审核 |
| [#8849：修正 LICENSE 中的文字错误](https://github.com/agentscope-ai/QwenPaw/pull/8849) | 删除 Contribution 定义中多余的 “the”，使文本与官方 Apache License 2.0 保持一致 | OPEN，待审核 |

**进展判断**：今天形成了若干范围明确的维护候选改动，但“提出改进”尚未转化为“合并交付”。其中 [#8846](https://github.com/agentscope-ai/QwenPaw/pull/8846) 对降低配置误操作风险的价值，值得在小型文档修复中优先关注。

## 3. 社区热点

按已知评论数，两条 Issue 并列最活跃，**各 1 条评论、0 个 👍**。PR 评论数为缺失值，不能按零评论处理或参与准确排名。

- **插件明明注册路由，却仍无法打开**  
  [Issue #8851](https://github.com/agentscope-ai/QwenPaw/issues/8851) 报告前端插件出现 `PawApp <id> did not register its app route`。报告者将原因定位到入口 chunk 被 import map 重映射为带 `?v=<hash>` 的 URL，导致 bundle 重复加载。背后的核心诉求是插件加载链路可靠、错误提示能够指向真实原因，避免开发者反复排查本已正确的路由注册代码。

- **压缩失败后建议 `/clear`，是否会误导用户丢弃上下文？**  
  [Issue #8848](https://github.com/agentscope-ai/QwenPaw/issues/8848) 质疑 `_process_compact` 失败分支中的提示。用户关注的不只是文案，而是长期对话中的信息保留与恢复路径：压缩失败不应让“清空上下文”看起来像默认补救步骤。

## 4. Bug 与稳定性

以下按潜在影响排序，**优先级为本日报分析判断，并非项目官方定级**。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **高** | [#8851：插件路由未注册、插件应用不可用](https://github.com/agentscope-ai/QwenPaw/issues/8851)。据报告，入口 bundle 重复加载导致插件路由注册失效，影响对应前端插件的核心使用路径 | Issue OPEN；提供的数据中未见对应 fix PR |
| **中高** | [#8848：压缩失败提示可能诱导清空上下文](https://github.com/agentscope-ai/QwenPaw/issues/8848)。这是交互安全与信息保留风险；材料不足以确认已发生实际数据丢失 | Issue OPEN；提供的数据中未见对应 fix PR |
| **中** | [#8847：宽 Markdown 表格溢出对话区域](https://github.com/agentscope-ai/QwenPaw/pull/8847)。现有 `overflow-x: auto` 直接作用于表格未达到预期滚动效果，影响内容阅读 | 已有修复 PR，但尚未合并 |

本批数据未提供崩溃报告，也没有足够信息判断上述问题是否属于近期回归。

## 5. 功能请求与路线图信号

本窗口**没有明确的新功能请求**，信号主要指向现有能力的可靠性与安全性。

- **安全的上下文失败恢复**：[#8848](https://github.com/agentscope-ai/QwenPaw/issues/8848) 体现出用户对非破坏性恢复提示的需求。它可能推动失败文案或恢复流程调整，但目前没有对应 PR，不能视为已进入下一版本。
- **更清晰的环境变量管理说明**：[#8846](https://github.com/agentscope-ai/QwenPaw/pull/8846) 已有具体文档改动，属于近期可交付候选；它是在解释现有接口语义，而非新增合并接口能力。
- **对话内容展示完善**：[#8847](https://github.com/agentscope-ai/QwenPaw/pull/8847) 已提供针对性修复，具备进入后续维护版本的条件，但是否纳入仍取决于审核、测试与合并。

## 6. 用户反馈摘要

> 数据仅包含 Issue 摘要及评论数量，未提供评论正文；以下提炼自提交者描述，不代表评论区共识。

- **插件开发场景**：用户认为插件路由已正确注册，却收到“未注册”错误，痛点在于应用不可用且排错方向容易被误导。见 [#8851](https://github.com/agentscope-ai/QwenPaw/issues/8851)。
- **长会话与上下文管理场景**：用户担心压缩失败后的 `/clear` 建议造成信息丢失，希望系统区分“恢复失败”与“主动重置”。见 [#8848](https://github.com/agentscope-ai/QwenPaw/issues/8848)。
- **配置维护场景**：贡献者指出，仅列出接口方法不足以说明覆盖风险；用户需要明确知道更新单个变量是否会删除其他变量。见 [#8846](https://github.com/agentscope-ai/QwenPaw/pull/8846)。

本批材料以问题反馈为主，没有可据以判断用户满意度的正向评价或整体调查数据。

## 7. 待处理积压

**无法确认长期积压或长期未响应条目**：所列 Issue 和 PR 均为近期创建、更新，且缺少完整历史及维护者回复信息。

建议维护者按以下顺序跟进当前待处理项：

1. **先确认插件故障影响范围与复现条件**，核查入口 bundle 重复加载及其与插件路由注册的关系。见 [#8851](https://github.com/agentscope-ai/QwenPaw/issues/8851)。
2. **审视破坏性操作提示**，明确 `/clear` 的后果及压缩失败后的安全处理建议。见 [#8848](https://github.com/agentscope-ai/QwenPaw/issues/8848)。
3. **优先审核配置语义文档与展示修复**，分别降低环境变量误覆盖风险和对话阅读障碍。见 [#8846](https://github.com/agentscope-ai/QwenPaw/pull/8846)、[#8847](https://github.com/agentscope-ai/QwenPaw/pull/8847)。

**健康度结论**：当前有持续的小型贡献流入，且两条 PR 带有首次贡献者标签，是积极的参与信号；但单日无合并、无关闭不足以判断维护效率下降。接下来更值得观察的是，高影响问题能否获得维护者确认，以及现有修复能否完成审核并落地。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：2026-11-22**  
**项目：[zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)**

> 本日报基于所提供的过去 24 小时更新数据。Issue 评论均为 0；PR 评论字段为 `undefined`，不能据此判断评论数量。以下严格区分“已提交方案”与“已合并交付”。

## 1. 今日速览

过去 24 小时共有 **9 条 Issue、12 条 PR 更新**，贡献活动较活跃，工作主要集中在成本控制、Web 仪表盘和语音交互可靠性。当前窗口内 **没有 Issue 关闭、PR 合并或关闭，也没有新版本发布**，因此今日进展主要体现为问题识别和待审修复，而非已交付成果。9 条 Issue 中有 **5 条可与本批次 PR 明确对应**，说明多个问题已有具体处理方案，但仍待审查与合并。需要优先关注的是子代理成本上限约束、语音自动发送边界，以及配置中成本执行模式与实际行为的一致性。

## 2. 项目进展

### 已完成交付：本窗口暂无

本批次 12 条 PR 全部处于 OPEN 状态，不能将以下工作视为已进入主分支或已对用户生效。

| 方向 | 待合并进展 | 状态与意义 |
|---|---|---|
| 成本展示 | [#12639](https://github.com/zeroclaw-labs/zeroclaw/pull/12639) 将零花费显示为 `$0.00`；[#12637](https://github.com/zeroclaw-labs/zeroclaw/pull/12637) 让成本进度条按配置限额缩放 | 改善预算可视化，避免“零成本看似有消费”“月度条看似总是满额”等误导 |
| 语音可靠性 | [#12635](https://github.com/zeroclaw-labs/zeroclaw/pull/12635) 保留其他页面修改的语音设置；[#12634](https://github.com/zeroclaw-labs/zeroclaw/pull/12634) 在草稿被编辑时取消自动发送 | 针对设置覆盖和意外发送风险；后者标记为 `needs-author-action` |
| 仪表盘布局 | [#12631](https://github.com/zeroclaw-labs/zeroclaw/pull/12631) 让 Channels 列表利用卡片可用高度 | 小范围体验修复，改善多渠道场景下的信息密度 |
| 工程稳定性 | [#12636](https://github.com/zeroclaw-labs/zeroclaw/pull/12636) 为 CI 工具下载增加重试；[#12623](https://github.com/zeroclaw-labs/zeroclaw/pull/12623) 补齐本地 CI 镜像依赖 | 分别减少网络瞬时故障导致的失败、改善本地检查环境完整性 |
| 治理与维护 | [#12640](https://github.com/zeroclaw-labs/zeroclaw/pull/12640) 补记 OIDC 验证例外的批准信息；[#12622](https://github.com/zeroclaw-labs/zeroclaw/pull/12622) 提议移除旧树莓派部署脚本 | 前者完善审批记录；后者收敛旧部署路径，并非取消树莓派支持 |

**整体判断：**修复供给较充足，但本窗口交付吞吐为零；仅凭一天数据，尚不能认定项目存在持续性合并瓶颈。

## 3. 社区热点

**没有足够数据评出“讨论最热”条目。**9 条 Issue 均为 0 评论、0 👍；12 条 PR 均为 0 👍，评论数量未知。以下按议题集中度与潜在影响归纳，而非按讨论热度排名。

- **成本控制从“展示”深入到“执行”。**  
  [#12627：子代理成本约束](https://github.com/zeroclaw-labs/zeroclaw/issues/12627)、[#12628：超限警告](https://github.com/zeroclaw-labs/zeroclaw/issues/12628)、[#12626：超限降级模型](https://github.com/zeroclaw-labs/zeroclaw/issues/12626) 同时出现，反映出对多代理预算边界、透明提示和不中断服务的共同诉求。

- **语音输入需要更明确的状态隔离。**  
  [#12632：自动发送包含后续手输文本](https://github.com/zeroclaw-labs/zeroclaw/issues/12632)、[#12633：旧页面覆盖新设置](https://github.com/zeroclaw-labs/zeroclaw/issues/12633) 表明，识别结束、编辑草稿及跨页面保存之间的状态管理是当前体验薄弱点。

- **个人助手的桌面集成正在扩展。**  
  [#12624](https://github.com/zeroclaw-labs/zeroclaw/pull/12624) 提议增加可选 macOS stdio MCP 服务，通过原生通知并在点击后打开对应对话，为主动提醒和返回任务上下文提供入口。

## 4. Bug 与稳定性

以下按报告严重程度及潜在影响排序；S2、S3 为原始 Issue 标注。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **S2／预算约束** | [#12627](https://github.com/zeroclaw-labs/zeroclaw/issues/12627)：受限委派中通过 `spawn_subagent` 启动的子代理，不受该委派逐跳成本上限约束。可能削弱多代理任务的预算隔离 | **本批次未见对应 fix PR** |
| **S2／意外发送** | [#12632](https://github.com/zeroclaw-labs/zeroclaw/issues/12632)：识别结束后静默计时器仍生效，可能把用户随后输入的文本一并发送 | 已有 [#12634](https://github.com/zeroclaw-labs/zeroclaw/pull/12634)，待作者处理 |
| **S2／设置覆盖** | [#12633](https://github.com/zeroclaw-labs/zeroclaw/issues/12633)：未刷新的设置页保存旧记录，可能覆盖其他位置的修改，使设备切回浏览器服务识别 | 已有 [#12635](https://github.com/zeroclaw-labs/zeroclaw/pull/12635)，待合并 |
| **S3／费用显示** | [#12638](https://github.com/zeroclaw-labs/zeroclaw/issues/12638)：实际花费为零仍显示 `<$0.01`，影响免费本地模型场景下的准确表达 | 已有 [#12639](https://github.com/zeroclaw-labs/zeroclaw/pull/12639)，待合并 |
| **S3／布局** | [#12630](https://github.com/zeroclaw-labs/zeroclaw/issues/12630)：Channels 列表高度被固定上限限制，卡片仍有空白却需滚动 | 已有 [#12631](https://github.com/zeroclaw-labs/zeroclaw/pull/12631)，待合并 |

另有成本图表语义修复 [#12637](https://github.com/zeroclaw-labs/zeroclaw/pull/12637)：拟改为按配置预算限额绘制进度条，提升预算状态的可解释性。**本批数据未报告崩溃，也未提供足够证据将上述问题认定为回归。**

## 5. 功能请求与路线图信号

| 需求 | 当前信号 | 纳入后续版本的判断 |
|---|---|---|
| 超限后给予非阻塞提示 | [#12628](https://github.com/zeroclaw-labs/zeroclaw/issues/12628) 要求 `warn` 模式每轮向会话提示一次 | 需求明确，但本批次没有直接实现 PR |
| 超限后切换低成本模型 | [#12626](https://github.com/zeroclaw-labs/zeroclaw/issues/12626) 要求兑现 `route_down_model`，或移除该配置模式 | 存在相关治理 PR [#12629](https://github.com/zeroclaw-labs/zeroclaw/pull/12629)，为 #12500 申请架构例外；仍有审批和作者处理环节，不能视为即将交付 |
| 技能工具直接执行程序 | [#12625](https://github.com/zeroclaw-labs/zeroclaw/issues/12625) 希望绕过 shell，让参数可靠携带自由文本 | 有利于减少引号、转义和参数解释问题；本批次未见实现 PR，不宜直接推断为已确认安全漏洞 |
| 查询 Codex 订阅用量 | [#12641](https://github.com/zeroclaw-labs/zeroclaw/pull/12641) 新增 `zeroclaw auth usage --model-provider openai.<alias>`，展示服务返回的五小时、每周利用率及 UTC 重置时间，并支持 JSON | 已有实现提案，但标记 `size:XL`，审查范围较大 |
| macOS 通知直达对话 | [#12624](https://github.com/zeroclaw-labs/zeroclaw/pull/12624) 提供可选原生通知集成 | 已进入 PR 阶段，是值得跟踪的个人助手体验增强 |
| 退役旧树莓派部署工具 | [#12621](https://github.com/zeroclaw-labs/zeroclaw/issues/12621) 对应 [#12622](https://github.com/zeroclaw-labs/zeroclaw/pull/12622) | 已有具体删除方案；依赖旧脚本的用户需关注后续替代流程与配置保留方式 |

**近期观察重点：**小范围 UI 修复已有明确方案；成本执行模式涉及运行时语义与架构例外，落地不确定性更高。当前没有发布计划，无法确认任何条目会进入“下一版本”。

## 6. 用户反馈摘要

本批次没有可供提炼的 Issue 评论，以下仅来自报告正文，**不代表社区共识或满意度调查**：

- **免费本地推理用户希望看到准确的零成本。**“完全没花钱”与“小于一美分”并不等价，费用显示应避免制造疑虑。见 [#12638](https://github.com/zeroclaw-labs/zeroclaw/issues/12638)。
- **语音输入用户需要明确的发送控制权。**口述结束后继续手动编辑，不应被尚未取消的计时器自动提交。见 [#12632](https://github.com/zeroclaw-labs/zeroclaw/issues/12632)。
- **跨页面操作不应撤销已有设置。**旧页面保存时覆盖其他位置的新值，会造成配置“自行回退”的体验。见 [#12633](https://github.com/zeroclaw-labs/zeroclaw/issues/12633)。
- **多代理运营者需要预算规则可预测。**委派上限、超限提示和降级策略应与文档配置保持一致。见 [#12627](https://github.com/zeroclaw-labs/zeroclaw/issues/12627)、[#12628](https://github.com/zeroclaw-labs/zeroclaw/issues/12628)、[#12626](https://github.com/zeroclaw-labs/zeroclaw/issues/12626)。

## 7. 待处理积压与维护提醒

**无法识别长期未响应积压：**本批条目均创建于 2026-11-21，缺少历史等待时长，不能将其归类为长期搁置。建议优先跟踪以下新近待办：

1. **明确子代理预算边界及测试覆盖。**[#12627](https://github.com/zeroclaw-labs/zeroclaw/issues/12627) 影响核心成本约束，且本批次没有对应修复。
2. **推进语音自动发送修复的作者处理。**[#12634](https://github.com/zeroclaw-labs/zeroclaw/pull/12634) 已标记 `needs-author-action`，宜优先验证“识别结束后编辑草稿”等边界场景。
3. **厘清成本执行模式的审批与实现依赖。**[#12629](https://github.com/zeroclaw-labs/zeroclaw/pull/12629) 同时带有 `risk:high`、`risk:manual` 和 `needs-author-action`，需明确例外审批与相关运行时变更的推进路径。
4. **为大型新增能力安排审查。**[#12641](https://github.com/zeroclaw-labs/zeroclaw/pull/12641) 为 XL 级 PR，建议重点核对订阅用量展示、缺失字段处理及命令输出兼容性。

**健康度结论：**项目呈现出活跃的问题发现与修复准备能力；当前最需要观察的是待审方案能否及时转化为合并，以及成本控制和语音状态管理能否得到完整验证。单日数据不足以判断长期维护效率或社区满意度。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*