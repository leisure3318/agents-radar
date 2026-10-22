# OpenClaw 生态日报 2026-10-22

> Issues: 21 | PRs: 89 | 覆盖项目: 13 个 | 生成时间: 2026-10-22 01:48 UTC

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
**日期：2026-10-22｜项目：[openclaw/openclaw](https://github.com/openclaw/openclaw)**

> **数据口径**：基于提供的过去 24 小时更新快照。PR 仅展示 89 条中的 30 条，且评论数字段均为 `undefined`；Issue 未提供评论正文，Release 说明也存在截断。因此，下文区分“已关闭”“待合并”“需求提案”，不将关闭等同于修复，也不推断未展示的合并内容。

## 1. 今日速览

- 今日共有 **21 条 Issue 更新、89 条 PR 更新和 1 个版本发布记录**，开发活动密集，展示的 PR 主要集中在 Web UI 的 Solid 异步状态重构、测试提速和运行环境兼容性。
- Issue 中 **18 条仍开放、3 条已关闭**；PR 更新中 **87 条仍待合并、2 条已合并或关闭**。这说明本窗口以在途开发和审查为主，不能据此计算项目整体合并效率。
- 稳定性关注点覆盖 **密钥配置边界、Ubuntu 本地嵌入服务、Windows 原生插件、SQLite 生命周期与模型工具调用兼容性**，其中部分问题仍需维护者或安全审查。
- **健康度判断：开发活跃，但交付效果尚待验证。** 当前最值得关注的是高优先级问题的实际修复落地，以及大规模 UI 重构的审查与回归验证。[项目动态](https://github.com/openclaw/openclaw/pulse)

## 2. 版本发布

### [v2026.10.10-beta.3](https://github.com/openclaw/openclaw/releases/tag/v2026.10.10-beta.3)

本次快照列出 1 个新版本记录；版本号中的日期不等同于实际发布日期，提供的数据未包含发布时间。

**可确认的更新重点：Windows 可靠性。**

- 恢复全新状态初始化与 Gateway 启动。
- 应用更新期间隐藏 SQLite 辅助程序窗口。
- 强制重装 Gateway 时，容忍启动器文件时间戳尚未稳定的情况。

发布说明关联：[ #176194](https://github.com/openclaw/openclaw/pull/176194)、[#174969](https://github.com/openclaw/openclaw/pull/174969)、[#176174](https://github.com/openclaw/openclaw/pull/176174)、[#176945](https://github.com/openclaw/openclaw/pull/176945)。

**破坏性变更与迁移注意事项：**
- 当前发布说明被截断，**无法确认完整变更、是否包含破坏性变更及具体迁移步骤**。
- Windows 用户可重点验证首次初始化、Gateway 启动、应用更新和强制重装路径；生产环境升级前应先检查完整发布说明并保留配置与数据备份。
- 下文 heartbeat SDK 移除属于**未合并 PR**，不能视为本版本已经生效的变更。

## 3. 项目进展

### 已交付进展：当前数据不足以核验

汇总显示有 **2 条 PR 已合并或关闭**，但展示的 30 条 PR 全部为 OPEN，未提供这两条的编号与内容。因此，无法可靠列举今日已合并的重要功能，也不能把待合并修复计为交付成果。[PR 列表](https://github.com/openclaw/openclaw/pulls)

### 主要在途工作

| 方向 | 代表 PR | 进展与意义 |
|---|---|---|
| 自动化架构收敛 | [#180106](https://github.com/openclaw/openclaw/pull/180106) | 拟移除旧 heartbeat SDK 与调度入口，统一到 Automations 和 session events；**插件作者未来可能需要迁移**。 |
| Codex 启动恢复 | [#180100](https://github.com/openclaw/openclaw/pull/180100) | 处理 Homebrew Node 升级后旧可执行路径消失导致的 `ENOENT`；当前等待作者处理。 |
| UI 异步状态统一 | [#180130](https://github.com/openclaw/openclaw/pull/180130)、[#179513](https://github.com/openclaw/openclaw/pull/179513)、[#179801](https://github.com/openclaw/openclaw/pull/179801) | 覆盖审批读取、Agent 工具控件和渠道写入，以 Solid 原生异步计算与 actions 管理呈现状态。 |
| 配置保存体验 | [#179724](https://github.com/openclaw/openclaw/pull/179724) | 修正手动保存期间配置错误状态的清理，已标记可供维护者审查。 |
| CI 与测试成本 | [#180123](https://github.com/openclaw/openclaw/pull/180123)、[#180122](https://github.com/openclaw/openclaw/pull/180122)、[#180102](https://github.com/openclaw/openclaw/pull/180102) | 复用连接、复用编译产物、精简重复测试；目标是提速与降低维护成本，并非新增用户功能。 |

**整体推进判断：** 实现层面的推进面较广，但本日可确认的“合并后收益”有限。UI 迁移和测试精简同时进行，后续应重点检查行为覆盖是否保持，而非只看代码或测试数量下降。

## 4. 社区热点

### 可量化的讨论热点

1. **升级失败：[#179769](https://github.com/openclaw/openclaw/issues/179769)**  
   **4 条评论，为所列 Issue 中最多**。涉及 macOS ARM64、2026.10.5 的 `git-runtime-backup-retention` 更新失败，仍需补充信息和维护者审查。反映用户对升级流程可恢复性、错误诊断能力的需求。

2. **Windows 企业管控兼容性：[#179923](https://github.com/openclaw/openclaw/issues/179923)**  
   **2 条评论，已关闭**。Microsoft Purview Endpoint DLP 环境下，携带原生二进制的插件加载失败。核心诉求是安全准入检查与企业端点防护软件能够兼容；关闭原因和修复版本未提供。

### 工程议题热点，而非评论热度排名

- **大规模 Solid UI 重构**覆盖审批、渠道、技能、Agent 和自动化页面，显示维护工作正在集中处理状态与生命周期一致性。[#180130](https://github.com/openclaw/openclaw/pull/180130)、[#179935](https://github.com/openclaw/openclaw/pull/179935)
- **旧 heartbeat 接口退役**涉及插件生态兼容性，值得插件开发者提前跟踪。[#180106](https://github.com/openclaw/openclaw/pull/180106)

**热度限制：** 所列条目点赞均为 0，其余 Issue 多为 1 条评论；PR 评论数缺失，无法可靠判断“讨论最多的 PR”。

## 5. Bug 与稳定性

以下按标签优先级及影响范围排列；“未见 fix PR”仅表示本次快照未提供关联修复，不代表仓库内绝对不存在。

| 严重程度 | 问题与影响 | 状态 / fix PR |
|---|---|---|
| **P1 · 安全** | 项目 `.env` 可设置 Vault、1Password 相关变量，覆盖受信任全局 SecretRef 设置，涉及配置可信边界。[#180054](https://github.com/openclaw/openclaw/issues/180054) | OPEN；需安全审查，未见 fix PR。当前不能据此断言已发生密钥泄露。 |
| **P1 · 本地记忆服务回归** | Ubuntu 26.10 升级后，托管 `llama-server` 因缺少 `libssl.so.3` 以 127 退出，影响本地嵌入能力。[#179989](https://github.com/openclaw/openclaw/issues/179989) | OPEN；修复方向明确、可排队，未见 fix PR。 |
| **P1 · Windows 插件回归** | Endpoint DLP 环境下原生插件准入失败。[#179923](https://github.com/openclaw/openclaw/issues/179923) | CLOSED；未提供修复 PR 或关闭原因。 |
| **P1 · Workboard 持续不可用** | SQLite worker 达到 512 MB 堆上限后，存储操作持续失败，需重启 Gateway。[#179990](https://github.com/openclaw/openclaw/issues/179990) | CLOSED；未提供修复 PR 或关闭原因。 |
| **P2 · Beta 阻塞报告** | DeepSeek V4.1 thinking 在工具调用后未回放 `reasoning_content`，后续请求出现 400。[#180086](https://github.com/openclaw/openclaw/issues/180086) | CLOSED；报告标记为 beta blocker，但不能确认已修复。 |
| **P2 · 配置误写 / 消息处理** | `channels add` 参数冲突可能将凭据写入另一渠道；Telegram 混合大小写账户键使群组配置和提及规则被忽略。[#180060](https://github.com/openclaw/openclaw/issues/180060)、[#180066](https://github.com/openclaw/openclaw/issues/180066) | 均 OPEN；未见 fix PR，前者仍需产品决策。 |
| **P2 · 草稿丢失 / 无障碍** | Dreaming 设置刷新会清除未提交输入；高对比度模式下输入框无可见焦点。[#179994](https://github.com/openclaw/openclaw/issues/179994)、[#180134](https://github.com/openclaw/openclaw/issues/180134) | 均 OPEN；**#180134 已标记有关联开放 PR**，编号未提供；#179994 未见 fix PR。 |
| **P2 · 升级与会话生命周期** | 更新在 `git-runtime-backup-retention`、`finalize:doctor` 阶段失败；boot-md 临时会话清理触发 SQLite 生命周期保护。[#179769](https://github.com/openclaw/openclaw/issues/179769)、[#180070](https://github.com/openclaw/openclaw/issues/180070)、[#180083](https://github.com/openclaw/openclaw/issues/180083) | 均 OPEN；未见 fix PR。boot-md 仅报告一次观察，重复性未验证。 |
| **P2 · 插件与搜索配置一致性** | 混合大小写插件 ID 重装后忽略既有配置；部分搜索后端忽略全局结果数与超时设置。[#180071](https://github.com/openclaw/openclaw/issues/180071)、[#180062](https://github.com/openclaw/openclaw/issues/180062) | 均 OPEN；修复方向明确，未见 fix PR。 |

## 6. 功能请求与路线图信号

| 需求 | 背后诉求 | 近期落地信号 |
|---|---|---|
| Codex connected-app 工具只读模式 | 不只屏蔽破坏性操作，而是只允许明确标注为只读的工具。[#180029](https://github.com/openclaw/openclaw/issues/180029) | **已有开放关联 PR**，但仍需产品与安全审查；属于相对较强信号，不是版本承诺。 |
| Agent-to-Agent 渠道支持 `ask_user` | Agent 间通信仍需将问题转交所有者确认。[#180140](https://github.com/openclaw/openclaw/issues/180140) | 需求阶段，未见实现 PR。 |
| 多 Agent 共享模型默认配置 | 显式所有权舰队希望统一配置 `agents.defaults`，减少逐个 Agent 设置。[#180126](https://github.com/openclaw/openclaw/issues/180126) | 待产品决策和维护者审查。 |
| `doctor --rebuild` | 在定点修复失败后重建运行基线，同时保留用户数据。[#180113](https://github.com/openclaw/openclaw/issues/180113) | 与升级失败反馈方向一致，但尚无实现信号。 |
| 用户锁定技能开关 | 防止非交互调用重新启用用户禁用的技能，强化人工控制权。[#180112](https://github.com/openclaw/openclaw/issues/180112) | 待产品决策；未见实现 PR。 |
| 远程客户端设置完整 TTS 自动模式 | 远程语音设置需要选择 `off/always/inbound/tagged`。[#180018](https://github.com/openclaw/openclaw/issues/180018) | 修复/实现形态较清晰，但仍待审查。 |
| 外部消息 CLI 提前并发准入 | 防止轮询脚本不断启动重量级进程，控制初始化成本。[#179999](https://github.com/openclaw/openclaw/issues/179999) | 当前为设计咨询，未见实现 PR。 |

**路线图判断：** 近期更明确的方向是 **UI 状态统一、自动化接口收敛、环境升级后的恢复能力与权限治理**。除已有 PR 的条目外，不能可靠预测其他需求会进入下一版本。

## 7. 用户反馈摘要

> 未提供评论正文，以下仅提炼 Issue 描述中的使用场景与痛点，不作为评论原话或满意度调查。

- **“更新后应能继续工作”是突出诉求。** macOS 更新失败、Homebrew Node 路径失效、Ubuntu 动态库缺失共同说明，依赖与系统升级是实际使用中的薄弱环节。[#179769](https://github.com/openclaw/openclaw/issues/179769)、[#180100](https://github.com/openclaw/openclaw/pull/180100)、[#179989](https://github.com/openclaw/openclaw/issues/179989)
- **多 Agent 与企业环境带来更复杂的治理需求。** 用户需要共享默认值、所有者确认以及端点安全软件兼容性。[#180126](https://github.com/openclaw/openclaw/issues/180126)、[#180140](https://github.com/openclaw/openclaw/issues/180140)、[#179923](https://github.com/openclaw/openclaw/issues/179923)
- **静默忽略配置会削弱信任。** 插件 ID、Telegram 账户键大小写及搜索后端参数问题，使“配置成功”与“实际生效”不一致。[#180071](https://github.com/openclaw/openclaw/issues/180071)、[#180066](https://github.com/openclaw/openclaw/issues/180066)、[#180062](https://github.com/openclaw/openclaw/issues/180062)
- **交互可靠性直接影响日常可用性。** 草稿被清除和键盘焦点不可见分别影响配置编辑与无障碍操作。[#179994](https://github.com/openclaw/openclaw/issues/179994)、[#180134](https://github.com/openclaw/openclaw/issues/180134)

当前数据没有足够证据提炼正面满意反馈；Issue 已关闭也不能直接视为用户满意。

## 8. 待处理积压与维护提醒

**无法确认长期未响应积压：** 所列条目创建时间均集中于 10 月 21—22 日，且没有维护者回复时间。以下属于优先跟进队列，而非已证实的长期积压。

1. **优先完成安全定性：** 明确项目 `.env` 对 SecretRef 配置的影响范围、信任边界和临时规避措施。[#180054](https://github.com/openclaw/openclaw/issues/180054)
2. **推动高影响回归进入修复：** Ubuntu 本地嵌入服务不可用已有明确故障线索，应尽快补齐 fix PR 与验证方案。[#179989](https://github.com/openclaw/openclaw/issues/179989)
3. **补齐关闭问题的交付证据：** Windows DLP、DeepSeek 工具调用、Workboard worker 故障应明确关闭原因、修复提交及覆盖版本，便于用户判断是否可升级解决。[#179923](https://github.com/openclaw/openclaw/issues/179923)、[#180086](https://github.com/openclaw/openclaw/issues/180086)、[#179990](https://github.com/openclaw/openclaw/issues/179990)
4. **消化可审查 PR，管理迁移风险：** 配置保存修复和 Agent 工具控件重构已标记可供维护者审查；heartbeat 接口移除则需同步迁移文档与兼容性说明。[#179724](https://github.com/openclaw/openclaw/pull/179724)、[#179513](https://github.com/openclaw/openclaw/pull/179513)、[#180106](https://github.com/openclaw/openclaw/pull/180106)

**结论：** OpenClaw 今日呈现“高开发活动、广泛重构、稳定性问题待闭环”的状态。下一观察重点不是 PR 数量继续增长，而是 **安全问题完成审查、高影响回归获得可验证修复，以及在途重构转化为明确发布收益**。

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向分析
**观察日期：2026-10-22｜依据：所提供的过去 24 小时社区快照**

> **口径说明：**Issue、PR 数量均为窗口内“更新条目数”，不是新增数或仓库总量；`CLOSED` 不等于已合并。健康度仅评价本日可见信号，不代表长期维护质量。NanoClaw、CoPaw 的项目入口与条目链接仓库名存在差异，归属关系仍需核实。

## 1. 生态全景

本次覆盖的 **13 个项目共出现 83 条 Issue、201 条 PR 更新和 3 个版本发布记录**，其中 8 个项目有活动，5 个项目在本窗口内无活动。开发重心正从“增加工具与渠道”转向 **会话状态一致性、消息与附件完整性、升级恢复和权限治理**，说明复杂使用场景正在增加工程压力。OpenClaw 与 Hermes Agent 合计贡献约 **69% 的 PR 更新、86% 的 Issue 更新**，但这些数字衡量的是活动集中度，而非社区人数或产品质量。MCP、插件与应用契约持续扩展能力边界，不过大量工作仍在待审阶段，生态目前更需要可验证的交付闭环，而不只是功能数量增长。

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | Release 情况 | 本日健康度与主要观察 |
|---|---:|---:|---|---|
| **OpenClaw** | 21 | **89** | 1 条：`v2026.10.10-beta.3` | 高活跃；UI 与自动化重构密集，安全和环境回归待闭环 |
| **Hermes Agent** | **50** | 50 | 2 条：`v0.22.3`、`v0.22.4` | 高活跃且有版本交付；会话恢复、Gateway 与隔离问题带来验证压力 |
| **NanoBot** | 1 | 21 | 无 | 稳定性修复密集；附件覆盖、重复交付和重复执行风险应优先处理 |
| **ZeroClaw** | 6 | 15 | 无 | 安全响应有实质进展；依赖修复已确认合入，容器 CA 闭环未完成 |
| **NanoClaw** | 2 | 13 | 无 | 修复提案集中；全部 PR 开放，且贡献来源集中 |
| **LobsterAI** | 1 | 7 | 无 | 客户端体验与质量巩固；7 条 PR 已关闭，但合并、发布状态未确认 |
| **CoPaw** | 2 | 5 | 无 | PawApp 扩展与可用性修复并行；大型 PR 增加审查负担 |
| **Moltis** | 0 | 1 | 无 | 低活动、维护导向；唯一 PR 标题与摘要不一致，需先核实范围 |
| PicoClaw | 0 | 0 | 无 | 本窗口无活动，不能据此判断停滞 |
| NullClaw | 0 | 0 | 无 | 同上 |
| IronClaw | 0 | 0 | 无 | 同上 |
| TinyClaw | 0 | 0 | 无 | 同上 |
| ZeptoClaw | 0 | 0 | 无 | 同上 |
| **合计** | **83** | **201** | **3 条记录** | 活动集中于少数项目，交付证据完整度不一 |

**解读重点：**OpenClaw 的 PR 更新最多，Hermes 的 Issue 更新最多，但不能由此直接推导前者效率最高或后者缺陷率最高。Hermes v0.22.3 所述约 620 个合并 PR 是跨版本累计成果，也不应计入今日吞吐量。

## 3. OpenClaw 在生态中的定位

### 相对优势：工程覆盖面广，围绕完整运行体系演进

- **开发活动领先。**89 条 PR 更新约占样本总量的 **44%**，涉及 UI、渠道、Agent、自动化、测试、安装和运行环境，显示其并非只围绕单一交互入口迭代。
- **系统化治理信号较强。**只读工具模式、所有者确认、共享模型默认值和技能锁定等需求，说明用户正推动项目支持更复杂的多 Agent 与人工控制场景。
- **跨平台可靠性有明确投入。**可见版本说明重点改善 Windows 初始化与 Gateway 启动；在途工作又覆盖 Homebrew Node 路径、Ubuntu 本地嵌入服务等问题。

这些是工程投入与需求覆盖优势，**并不等于其当前稳定性已优于其他项目**。

### 技术路线差异

OpenClaw 的可见路线更偏向 **既有平台内部的状态与接口收敛**：一方面统一 Solid UI 异步状态，另一方面拟将旧 heartbeat 入口收敛到 Automations 和 session events。

相较之下：

- **Hermes Agent** 更突出 Profile、多智能体、Desktop、插件和多部署形态的协同。
- **NanoBot** 本日重点是 WebUI 会话、渠道交付与 MCP 交互扩展。
- **CoPaw** 更强调通过共享任务契约连接主聊天与独立应用。
- **ZeroClaw** 更突出依赖审计、容器证书信任和发布验证。
- **NanoClaw** 则在推进渠道适配器向技能载荷迁移。

### 社区规模：只能比较活动，不能确认人数排名

当前证据支持将 OpenClaw 与 Hermes 归为本样本的**高活动项目**，但缺少独立贡献者、活跃用户、下载量和完整讨论数据，不能断言谁拥有最大社区。NanoClaw 的 13 条 PR 中有 12 条来自同一贡献者，更说明 **PR 数量不等于社区参与广度**。

## 4. 共同关注的技术方向

| 共同方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **状态一致性与会话连续性** | OpenClaw、NanoBot、Hermes、NanoClaw、CoPaw | UI 异步状态统一、历史与流式消息有序、会话恢复、父子 Agent 事件隔离、草稿按会话保存 |
| **人工控制与权限边界** | OpenClaw、Hermes、NanoClaw、ZeroClaw | 工具只读白名单、停止控制不可绕过、审批显示须以授权结果为准、统一配对授权路径 |
| **配置与凭据隔离** | OpenClaw、Hermes、CoPaw | 防止项目配置覆盖受信任设置、跨 Profile 环境污染、凭据路由错误、界面参数与实际请求不一致 |
| **消息、附件与文档完整性** | NanoBot、NanoClaw、Hermes | 防止附件覆盖或遗漏、确保 PDF 真正可读、避免媒体静默丢弃、保留原始文件 |
| **部署、升级与故障恢复** | OpenClaw、Hermes、LobsterAI、CoPaw | 系统依赖升级适配、Gateway 自恢复、离线重连恢复、容器健康检查可用 |
| **插件与应用化扩展** | OpenClaw、NanoBot、Hermes、NanoClaw、CoPaw | 接口收敛、MCP Apps、插件目录扩展、渠道技能化、共享应用任务生命周期 |
| **供应链与发布安全** | ZeroClaw、Hermes；Moltis 待核实 | 依赖漏洞修复、完整锁文件审计、最终镜像证书验证；Moltis 的 TLS 变更范围尚不清晰 |
| **测试效率与可观测性** | OpenClaw、NanoBot、NanoClaw、LobsterAI、ZeroClaw | 降低 CI 成本、补齐组合测试、保持测试门禁覆盖、关联任务 trace 与运行归属 |

**共同问题不是“功能有没有”，而是“配置是否生效、执行是否可控、结果是否完整、故障是否可恢复”。**

## 5. 差异化定位分析

以下是根据本日工作重心归纳的定位信号，并非完整产品能力排名。

| 项目 | 功能侧重 | 更相关的用户场景 | 可见架构取向 |
|---|---|---|---|
| **OpenClaw** | 多渠道助手、Agent 与自动化治理 | 需要统一管理复杂助手环境的用户与插件作者 | Gateway、Solid UI、自动化与会话事件收敛 |
| **Hermes Agent** | 多 Profile、多智能体与桌面协作 | 多身份、多部署形态的复杂使用场景 | 核心、插件、Desktop 与 Gateway 协同，强化 Profile 隔离 |
| **NanoBot** | 会话体验、消息交付、MCP | 重视 WebUI 与渠道可靠性的助手用户 | 统一网络配置，探索 MCP 交互应用托管 |
| **NanoClaw** | 渠道附件、审批、Codex 运行正确性 | 文档问答、长任务、多渠道 Agent | 容器依赖、运行时事件隔离、渠道技能载荷 |
| **ZeroClaw** | 安全交付、程序化接入与运维 | 重视容器安全、Webhook 和 CLI 自动化的开发者 | Rust 依赖治理、镜像验证、网关与 CLI |
| **LobsterAI** | 桌面交互、专家管理、生成任务反馈 | 重视客户端开箱体验的用户 | 客户端与 Gateway 就绪状态协调，补齐用量追踪 |
| **CoPaw** | 主聊天与专用应用协同 | 希望集成文件、数据分析等应用的开发者 | PawApp 契约、持久化 Host 生命周期、AgentScope 组件复用 |
| **Moltis** | 本日仅见底层维护 | 现有数据不足以可靠细分 | TLS 或浏览器锁生命周期修复，范围待核实 |

对本窗口无活动的五个项目，不宜仅凭项目名称推断其架构、用户定位或竞争力。

## 6. 社区热度与成熟度

### 活跃度分层

- **高活动、广范围迭代：OpenClaw、Hermes Agent。**两者同时面对扩展、重构和可靠性反馈，测试矩阵与兼容性管理压力最大。
- **持续迭代、质量修复密集：NanoBot、ZeroClaw、NanoClaw。**NanoBot 偏交付完整性；ZeroClaw 偏安全闭环；NanoClaw 偏运行正确性与渠道交付结构。
- **中等活动、方向分化：LobsterAI、CoPaw。**前者偏客户端质量巩固，后者偏应用平台扩展。
- **低活动或观察不足：Moltis 及五个无活动项目。**单日数据不足以评价长期维护节奏。

### 热度与成熟度应分开判断

可见 Issue 评论峰值仅为 **5 条**，且 PR 评论数缺失，因此本报告中的“高活跃”主要指工程活动，不能解释为广泛用户共识。

成熟度更应看三个闭环：

1. **问题 → 修复合入：**ZeroClaw 的依赖安全修复有明确证据。
2. **修复 → 发布版本：**OpenClaw、Hermes 有发布记录，但完整说明和问题覆盖关系仍不充分。
3. **发布 → 用户验证：**多数项目缺少修复后的确认反馈；Hermes 已出现升级后会话恢复失败的报告。

因此，现阶段不宜给出简单的成熟度总排名。**版本多、PR 多、关闭多，都不是稳定性已经得到验证的充分条件。**

## 7. 值得关注的趋势信号

### ① Agent 竞争正在转向“可靠完成任务”

附件覆盖、PDF 不可读、重复交付、会话永久冲突等问题，都会让“已接收任务”与“实际完成任务”脱节。

**开发参考：**把输入完整性、重试幂等性、输出交付和最终状态纳入端到端测试，而不只测试模型是否调用了工具。

### ② 安全边界正在从提示与界面下沉到执行层

只读工具白名单、MCP 传输前守卫、统一配对 guard 和紧急停止一致性，都指向更强的执行约束。

**开发参考：**授权检查应覆盖定时、手动、后台和重试入口；界面显示或模型指令不能替代强制校验。

### ③ 多 Agent 的瓶颈是状态与身份隔离

跨 Profile 环境继承、父子事件串扰、消息来源丢失和重复催答，说明增加 Agent 数量比保持协作正确性容易。

**开发参考：**将身份、配置、凭据、会话和事件归属显式建模，并建立串扰回归测试。

### ④ 助手正在成为应用宿主，但契约质量决定扩展成本

NanoBot 的 MCP Apps、CoPaw 的 PawApp、NanoClaw 的渠道技能化，以及 OpenClaw 的接口收敛，分别体现不同的模块化路径。

**开发参考：**优先稳定权限、生命周期、结构化结果和失败恢复契约，再扩展应用数量；避免一次性集中合入大型集成。

### ⑤ 安全交付的验证对象正在延伸到最终产物

ZeroClaw 的工作显示，语言依赖修复并不自动解决容器原生 CA 信任问题。

**开发参考：**分别验证源码依赖、系统包、镜像和多平台发布产物，并将验证结果绑定到实际交付版本或摘要。

---

## 决策结论

**OpenClaw 是本样本中开发覆盖面与 PR 活动最突出的项目之一；Hermes 展现出较强的多形态交付活动，但两者都需要重点验证复杂状态、升级兼容和安全隔离。**NanoBot、NanoClaw 的近期观察重点是任务与内容完整性，ZeroClaw 是安全发布流程的重要观察对象；CoPaw 值得跟踪应用契约演进，LobsterAI 则更偏客户端质量巩固。

选型时，建议把 **目标场景实测、权限与凭据边界、故障恢复能力、修复进入发布的证据** 放在 PR 数量之前。下一窗口最有价值的信号，是高风险问题是否完成“复现—修复—发布—验证”，而不是活动总量是否继续上升。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报
**日期：2026-10-22**  
**项目：[HKUDS/nanobot](https://github.com/HKUDS/nanobot)**

> **统计口径**：以下基于提供的过去 24 小时快照。共更新 1 条 Issue、21 条 PR，其中 10 条 PR 待合并、11 条已合并或关闭；明细仅展示 20 条 PR。明细中的 `CLOSED` 无法单独证明已合并，本文统一标为“已关闭”。PR 评论数均为 `undefined`，不能据此判断讨论热度。今日无新版本发布。

## 1. 今日速览

NanoBot 今日保持较高的代码协作活跃度：21 条 PR 更新明显多于 Issue 更新，工作重点集中在 **WebUI 会话一致性、消息交付可靠性及渠道附件完整性**。已关闭 PR 涵盖历史加载、流式输出顺序、跨会话来源展示和中文 Markdown 渲染，体现出以稳定性与体验打磨为主的迭代方向。待合并队列中，Signal 附件覆盖问题被标记为 **P0**，重试放大与退避资源占用问题被标记为 **P1**，应优先跟进。集中代理配置与 MCP Apps 托管则提供了新的功能扩展信号，但仍处于开放 PR 阶段，尚不能视为下一版本承诺。整体来看，项目开发活跃，但修复是否进入主分支、以及最终发布验证结果，仍需进一步确认。  
关联：[PR 列表](https://github.com/HKUDS/nanobot/pulls) · [P0 #6365](https://github.com/HKUDS/nanobot/pull/6365) · [P1 #6367](https://github.com/HKUDS/nanobot/pull/6367)

## 2. 项目进展

### WebUI：重点收敛会话记录与实时输出的一致性问题

| 方向 | 今日已关闭 PR | 推进价值 |
|---|---|---|
| 历史与实时消息并存 | [#6373](https://github.com/HKUDS/nanobot/pull/6373) | 处理实时回复先到时，历史页被整体拒收、分页却继续推进的问题；该 PR 带有 `conflict` 标签，关闭不代表方案已落地。 |
| 流式答案顺序 | [#6368](https://github.com/HKUDS/nanobot/pull/6368) | 保留答案检查点与流式顺序，针对切回活跃会话后，结束事件可能误更新旧答案、改变显示顺序的问题。 |
| 跨会话来源保留 | [#6379](https://github.com/HKUDS/nanobot/pull/6379) | 修正展示持久化对事件字段的假设，避免消息到达智能体后，在实时界面或重载历史中丢失来源标识。 |
| 跨会话消息呈现 | [#6369](https://github.com/HKUDS/nanobot/pull/6369) | 将输入显示为左对齐气泡，并在气泡外保留来源 `@handle`，提升多会话协作的可辨识性。 |

这组变更针对的不只是视觉细节，更涉及“历史记录是否完整、实时答案是否有序、跨会话消息能否追溯”。若确认合入，将有助于改善长会话和多会话使用体验；当前数据不足以量化实际改善幅度。

### 渲染与交互：减少界面噪声，改善中文内容展示

- **中文强调解析**：[#6381](https://github.com/HKUDS/nanobot/pull/6381) 已关闭，将 CJK 强调边界处理移至解析阶段，针对标点紧邻强调符号、或强调内容跨越链接及行内代码时暴露字面 `**` 的问题。
- **后台压缩提示**：[#6374](https://github.com/HKUDS/nanobot/pull/6374) 已关闭，拟在实时更新和历史回放中忽略无 `turn_id` 的后台空闲压缩事件，同时保留回合内压缩提示。
- **展示降噪**：[#6380](https://github.com/HKUDS/nanobot/pull/6380) 移除 Mermaid 的“Preparing diagram…”文本；[#6371](https://github.com/HKUDS/nanobot/pull/6371) 调整侧栏活动环的同步与中性色表现。两者均已关闭。

### 工程质量：处理事件循环兼容性与 CI 成本

- **版本检查与 HTTP MCP 共用传输的兼容性**：[#6376](https://github.com/HKUDS/nanobot/pull/6376) 已关闭，针对在线程中创建临时事件循环引发版本检查失败、并干扰 HTTP MCP 连接的问题。
- **CI 验收范围优化**：[#6378](https://github.com/HKUDS/nanobot/pull/6378) 已关闭，提出分离代码验证与发布包验收，并绑定候选发布产物。摘要指出，所检查的一次 Windows packaged-recovery 步骤耗时约 **21 分 30 秒**，显示出优化动机，但未提供优化后的实测结果。
- **浏览器测试修正**：[#6362](https://github.com/HKUDS/nanobot/pull/6362) 已关闭，使历史顶部边界测试与运行时 `scrollTop <= 1` 的容忍规则一致，跟进此前合并后的浏览器测试失败。

## 3. 社区热点

**目前无法按评论数或反应数评选“最热讨论”**：唯一 Issue 为 0 评论、0 👍，展示的 PR 均为 0 👍，评论数缺失。以下是按问题关联性与影响面筛选的关注主题，而非热度排名。

1. **上下文压缩需要可理解、低干扰的反馈**  
   [Issue #6370](https://github.com/HKUDS/nanobot/issues/6370) 指出，后台空闲维护与上下文窗口压力触发的压缩使用相同提示，用户无法理解原因。[PR #6374](https://github.com/HKUDS/nanobot/pull/6374) 的应对方向是隐藏后台事件，而不是增加原因说明。其背后诉求是：让系统行为可解释，同时避免无关维护信息打断阅读。

2. **网络配置应跨组件统一**  
   [PR #6372](https://github.com/HKUDS/nanobot/pull/6372) 提议集中设置代理，并为模型提供商、Web、消息渠道及 HTTP/SSE MCP 分别提供使用开关。它反映的是多组件部署时减少重复配置、保持网络路径可控的需求。

3. **MCP 从工具调用延伸至交互式应用**  
   [PR #6363](https://github.com/HKUDS/nanobot/pull/6363) 提出可选的 MCP Apps 托管：结构化结果不进入模型上下文，HTML 应用在 WebUI 中呈现并调用来源 MCP 上获准的工具。该 PR 仍开放且带有冲突标签，集成状态需要关注。

## 4. Bug 与稳定性

以下优先列出高风险开放修复；P0/P1/P2 为原始标签，其余风险判断基于摘要，不代表已验证的实际影响范围。

| 优先级 / 风险 | 问题与影响 | Fix PR 状态 |
|---|---|---|
| **P0：附件内容完整性** | Signal 同名附件或文件名清洗后的重名可能覆盖旧文件，使历史消息指向后来的内容。 | [#6365](https://github.com/HKUDS/nanobot/pull/6365)，**OPEN** |
| **P1：重试放大与资源占用** | 嵌套重试可能放大实际请求、重放已交付的 Telegram 内容；失败目的地退避时占用发送槽位。 | [#6367](https://github.com/HKUDS/nanobot/pull/6367)，**OPEN** |
| **执行可靠性** | 同一 Cron 任务可能在手动运行之间、或手动与定时触发之间重叠执行，存在重复执行风险。 | [#6375](https://github.com/HKUDS/nanobot/pull/6375)，**OPEN** |
| **P2：附件遗漏** | 单 MIME 部分且标为附件的邮件，可能因非 multipart 的提前返回而丢失附件。 | [#6366](https://github.com/HKUDS/nanobot/pull/6366)，**OPEN** |
| **P2：搜索漏检** | BOM 标记的 UTF-16/32 文本被当作二进制跳过；UTF-8 BOM 影响首行锚定匹配。 | [#6364](https://github.com/HKUDS/nanobot/pull/6364)，**OPEN** |
| **P2：搜索摘要错误** | Unicode case-folding 扩展字符后，匹配位置被错误用于原文切片，导致摘要遗漏实际命中文本。 | [#6361](https://github.com/HKUDS/nanobot/pull/6361)，**OPEN** |
| **交互可用性** | macOS Dock 或 Command-Tab 激活时，可能未恢复既有 WebUI 窗口，而是打开新页面或激活空助手。 | [#6377](https://github.com/HKUDS/nanobot/pull/6377)，**OPEN** |
| **提示可解释性** | 后台压缩与窗口压力压缩显示相同提示，无法辨别原因。 | [Issue #6370](https://github.com/HKUDS/nanobot/issues/6370) 仍 **OPEN**；关联 [#6374](https://github.com/HKUDS/nanobot/pull/6374) 已关闭，是否合并待确认 |

今日材料未明确报告进程崩溃或安全漏洞；高优先级风险主要集中在**附件完整性、重复交付与重复执行**。

## 5. 功能请求与路线图信号

| 方向 | 当前信号 | 下一版本判断 |
|---|---|---|
| **统一代理与 MCP 路由** | [#6372](https://github.com/HKUDS/nanobot/pull/6372) 已有开放实现 PR，覆盖设置入口及多个网络组件。 | 是明确的候选功能，但涉及面广，仍需等待评审、测试与合并。 |
| **WebUI 托管 MCP Apps** | [#6363](https://github.com/HKUDS/nanobot/pull/6363) 提供可选方案，同时显示冲突标签。 | 属于较强的功能扩展信号；冲突使短期落地确定性降低。 |
| **更清晰的压缩体验** | [#6370](https://github.com/HKUDS/nanobot/issues/6370) 提出原因不可见问题，关联修复选择隐藏后台提示。 | 当前实现方向偏“降噪”，尚不能据此认定会增加完整的压缩原因展示。 |

以上均未见发布计划或版本归属，不能作为下一版本已确认内容。

## 6. 用户反馈摘要

**本次没有可供提炼的 Issue 评论正文**，因此不能声称社区普遍满意或不满意。唯一可直接归于 Issue 提报者的反馈是：

- **痛点**：所有压缩都显示相同的两阶段提示，无法知道是后台维护还是上下文压力所致。
- **场景**：在 WebUI 阅读会话记录时，需要理解压缩提示为何出现，以及它是否与当前交互有关。
- **反馈边界**：该 Issue 目前无评论、无点赞，尚无证据表明其他用户的共鸣程度，也无修复后的满意度反馈。  
  来源：[Issue #6370](https://github.com/HKUDS/nanobot/issues/6370)

## 7. 待处理积压与维护建议

本次展示的条目均创建于 **2026-10-21**，不足以认定存在“长期未响应”的积压。建议关注以下**当前待处理项**：

1. **优先推进高风险修复**：先确认 Signal 附件覆盖的影响范围与修复验证，再处理重试放大及发送槽位占用。  
   [#6365](https://github.com/HKUDS/nanobot/pull/6365) · [#6367](https://github.com/HKUDS/nanobot/pull/6367)

2. **补齐 Issue 与 PR 的闭环状态**：#6370 仍开放，而关联 #6374 已关闭，应确认是已合并待验证、方案撤回，还是需要替代修复，避免将“关闭 PR”误作“问题解决”。  
   [#6370](https://github.com/HKUDS/nanobot/issues/6370) · [#6374](https://github.com/HKUDS/nanobot/pull/6374)

3. **处理冲突与方案去向**：明确 MCP Apps 的冲突处理计划，以及历史加载修复在关闭后的承接方案。  
   [#6363](https://github.com/HKUDS/nanobot/pull/6363) · [#6373](https://github.com/HKUDS/nanobot/pull/6373)

**综合判断**：NanoBot 当前呈现“开发活跃、稳定性修复密集、功能扩展并行”的健康信号；短期最重要的不是新增功能数量，而是确认高风险修复完成合并、回归验证并进入可用发布。由于缺少合并标记、完整 CI 结果及发布信息，尚不能将今日活跃度直接等同于已交付质量。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-10-22｜项目：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)**

> **统计口径**：基于所提供的过去 24 小时数据：50 条 Issue 更新、50 条 PR 更新、2 个版本发布。明细仅展示 30 条 Issue、20 条 PR；Release 正文被截断，Issue 评论正文未提供，PR 评论数为 `undefined`。因此，下文不将“关闭”视为“已合并”，也不据此推断完整修复率、评论观点或长期积压情况。

## 1. 今日速览

Hermes Agent 保持高活跃度：过去 24 小时有 **50 条 Issue、50 条 PR 更新**，同时发布两个补丁版本，但 Issue 统计中尚无关闭记录，PR 更新中有 **45 条仍待合并、5 条已合并或关闭**。发布说明显示，v0.22.3 将自 v0.22.2 以来约 620 个已合并 PR 汇入稳定版本；这属于跨版本累计成果，不能计作今日交付。当前反馈集中在 **Gateway 生命周期、会话恢复、多智能体群聊与 Desktop 状态一致性**，表明复杂部署的可靠性仍是主要压力点。安全隔离与依赖升级也出现重要待审变更，整体呈现“开发吞吐高、稳定性验证负担重”的状态。  
相关：[v0.22.3](https://github.com/NousResearch/hermes-agent/releases/tag/v0.22.3) · [会话恢复问题 #142731](https://github.com/NousResearch/hermes-agent/issues/142731) · [依赖升级 PR #142831](https://github.com/NousResearch/hermes-agent/pull/142831)

## 2. 版本发布

### v0.22.4：Desktop 交互与小范围修复
**发布说明日期：2026-10-21**

- Desktop 不再在输入框上方显示建议提示条（suggestion pills）。
- 包含小范围插件与 Dashboard 修复。
- 发布覆盖 CLI/安装器、Microsoft Store 应用、Docker 和 Hermes Cloud。
- **破坏性变更**：可见说明未声明；由于正文截断，不能确认不存在其他兼容性影响。

来源：[v0.22.4 Release](https://github.com/NousResearch/hermes-agent/releases/tag/v0.22.4)

### v0.22.3：大规模累计变更进入稳定版
**发布说明日期：2026-10-21**

- 将 v0.22.2 以来约 **620 个已合并 PR** 汇入稳定版本。
- 完整整理后的更新说明计划随 **v0.23.0** 提供，目前无法逐项核实该窗口的变化。
- **迁移与升级验证重点**：用户报告 DirectSDK 历史会话在 v0.22.3 后恢复失败，v0.22.4 仍可复现；另有 v0.22.3 Docker 全新环境启动循环崩溃报告。相关环境宜先在测试配置中验证会话恢复与 Gateway 启动。

来源：[v0.22.3 Release](https://github.com/NousResearch/hermes-agent/releases/tag/v0.22.3) · [DirectSDK #142779](https://github.com/NousResearch/hermes-agent/issues/142779) · [Docker #142743](https://github.com/NousResearch/hermes-agent/issues/142743)

## 3. 项目进展

### 已关闭 PR：迁移功能向插件侧收敛
可见明细中，唯一标为 `CLOSED` 的条目是 **#142810**：更新官方 `agent-importers` 插件目录固定版本，使目录安装能够获取已从核心迁出的 OpenClaw 迁移功能。这体现了迁移工具向插件化交付的方向；**数据未提供 merged 标记，不能认定该 PR 已合并或功能已上线**。  
链接：[PR #142810](https://github.com/NousResearch/hermes-agent/pull/142810)

### 待合并工作：修复与能力补齐并行
- **运维可靠性**：#142825 处理不可读 systemd unit 文件导致的 CLI 崩溃，与当天 Issue #142822 直接对应；#142821 避免远程主连接不可达时，每次后台调用都重新驱动启动流程。  
  链接：[PR #142825](https://github.com/NousResearch/hermes-agent/pull/142825) · [PR #142821](https://github.com/NousResearch/hermes-agent/pull/142821)
- **数据与输出正确性**：#142823 修正 v16 迁移误隐藏无父会话的情况；#142808 修复代理流式响应在 UTF-8 分块边界损坏中文、日文、韩文及 emoji 的问题。  
  链接：[PR #142823](https://github.com/NousResearch/hermes-agent/pull/142823) · [PR #142808](https://github.com/NousResearch/hermes-agent/pull/142808)
- **平台适配**：#142833 修复飞书话题中的异步完成消息投递；#142809 调整部分 GPT-6 型号经 Azure Foundry 或自定义网关调用时的参数兼容性。两者均尚未合并。  
  链接：[PR #142833](https://github.com/NousResearch/hermes-agent/pull/142833) · [PR #142809](https://github.com/NousResearch/hermes-agent/pull/142809)

**进展判断**：版本交付与修复供给活跃，但当前明细不足以量化今日真正落地的功能数量；大量开放 PR 仍需审核、测试与发布验证。

## 4. 社区热点

以下按可见 Issue 评论数排序；所有展示条目的 👍 均为 0，不能以点赞量判断共识强弱，PR 讨论热度也无法排序。

| 热点 | 评论数 | 背后的诉求 |
|---|---:|---|
| [#142741：macOS Gateway 重启失败](https://github.com/NousResearch/hermes-agent/issues/142741) | 5 | launchd 任务“已注册但未运行”时，重试逻辑未能真正启动进程，用户需要可靠的一键恢复。 |
| [#142820：手动 cron 执行未遵守紧急停止](https://github.com/NousResearch/hermes-agent/issues/142820) | 4 | `hermes pause` 应在自动与手动入口间保持统一语义，而不是只约束调度器。 |
| [#142740：群聊重复催答](https://github.com/NousResearch/hermes-agent/issues/142740) | 3 | 已回答的指向性消息仍触发提醒，暴露多智能体对话状态同步问题。 |
| [#142731：会话永久拒绝后续请求](https://github.com/NousResearch/hermes-agent/issues/142731) | 3 | 用户希望并发冲突只是暂态，而非令整个会话持续返回 409。 |
| [#142670：Discord 重连永久挂起](https://github.com/NousResearch/hermes-agent/issues/142670) | 3 | 消息平台接入必须具备失败超时与自动恢复，避免一次断线演变为持续不可用。 |

## 5. Bug 与稳定性

下列按**潜在影响与恢复难度**排序，不替代仓库原有 P2/P3 标签。除明确关联条目外，“未见 fix PR”仅指本次提供的明细。

| 关注级别 | 问题及影响 | 修复状态 |
|---|---|---|
| **优先审查：依赖安全** | [PR #142831](https://github.com/NousResearch/hermes-agent/pull/142831) 提议 Pillow 12.3.0 → 13.0.0；按 PR 描述，涉及 28 项公告，其中 3 项严重漏洞。实际可利用范围仍需结合依赖与调用路径核验。 | **修复 PR 开放中** |
| **高：凭据路由** | [#142714](https://github.com/NousResearch/hermes-agent/issues/142714)：ACP 自定义提供商会话可能向错误端点发送请求，并携带另一提供商的密钥。 | 未见直接 fix PR |
| **高：配置隔离** | [#142798](https://github.com/NousResearch/hermes-agent/issues/142798)：多 Profile 共用 Gateway 时，终端命令继承启动宿主 Gateway 的环境，存在跨配置污染风险。 | 未见直接 fix PR |
| **高：停止控制一致性** | [#142820](https://github.com/NousResearch/hermes-agent/issues/142820)：`hermes cron run` 可绕过全局紧急停止。 | 未见直接 fix PR |
| **高：持续不可用** | [#142731](https://github.com/NousResearch/hermes-agent/issues/142731) 会话持续返回 409；[#142670](https://github.com/NousResearch/hermes-agent/issues/142670) Discord 重连挂起；[#142743](https://github.com/NousResearch/hermes-agent/issues/142743) Docker 启动循环崩溃。 | 均未见直接 fix PR |
| **中高：升级兼容性** | [#142779](https://github.com/NousResearch/hermes-agent/issues/142779)：历史 DirectSDK 会话的 `process://` 地址触发新的 HTTP(S) 校验，无法恢复。 | 未见直接 fix PR |
| **中高：服务管理** | [#142741](https://github.com/NousResearch/hermes-agent/issues/142741) macOS 重启失败；[#142822](https://github.com/NousResearch/hermes-agent/issues/142822) systemd 文件权限导致 status/migrate 崩溃。 | 后者已有开放 [PR #142825](https://github.com/NousResearch/hermes-agent/pull/142825) |
| **中：消息与记录完整性** | [#142806](https://github.com/NousResearch/hermes-agent/issues/142806) 企业微信语音/视频被静默丢弃；[#142811](https://github.com/NousResearch/hermes-agent/issues/142811) clarify 回答提交后无法在可见聊天记录回看。 | 均未见直接 fix PR |

此外，[MCP “Always allow” 不持久化 #142803](https://github.com/NousResearch/hermes-agent/issues/142803) 与 [Desktop 心跳误判断线 #142738](https://github.com/NousResearch/hermes-agent/issues/142738) 值得纳入回归测试，分别影响授权交互一致性与健康连接的可用性。

## 6. 功能请求与路线图信号

- **Desktop 插件设置 API：短期候选较明确。** 用户要求插件能够读取、设置和订阅状态栏可见性；已有同日对应 PR，但尚无合并或版本承诺。  
  链接：[Issue #142817](https://github.com/NousResearch/hermes-agent/issues/142817) · [PR #142818](https://github.com/NousResearch/hermes-agent/pull/142818)
- **视频理解：优先改善工具使用引导。** #142819 让 `read_file` 遇到视频时提示使用 ffprobe、ffmpeg 抽帧，再调用 `vision_analyze`；这是工作流补齐，不是原生视频解码能力。  
  链接：[PR #142819](https://github.com/NousResearch/hermes-agent/pull/142819)
- **MCP 授权边界：从建议性 Hook 走向传输层约束。** #142816 提议在 MCP 传输前执行 Profile 范围的分发守卫，反映共享连接、多 Slack 身份场景的隔离需求。  
  链接：[PR #142816](https://github.com/NousResearch/hermes-agent/pull/142816)
- **插件生态继续扩展。** 待审目录条目包括以等距办公室展示 Profile 工作状态的 `office-3d`，以及记忆提供商 Severian；目录 PR 不代表已获官方稳定性背书。  
  链接：[PR #142827](https://github.com/NousResearch/hermes-agent/pull/142827) · [PR #142812](https://github.com/NousResearch/hermes-agent/pull/142812)
- **尚无可见配套实现的需求**：图像生成超时可配置、保留上传 PDF 原文件，以及 Desktop/Bot Profile 显式使用 Azure CLI 登录。  
  链接：[#142699](https://github.com/NousResearch/hermes-agent/issues/142699) · [#142723](https://github.com/NousResearch/hermes-agent/issues/142723) · [#142722](https://github.com/NousResearch/hermes-agent/issues/142722)

## 7. 用户反馈摘要

由于没有评论正文，以下仅提炼 **Issue 描述中的使用反馈**，不虚构评论观点或满意度。

- **生产多智能体用户更关心“状态可信”，而非单纯增加功能。** 用户报告输入延迟、按回车后约 0.5 秒停顿、群聊上下文放大与重复催答；其中一份报告称部分症状跨多次更新持续数月。  
  链接：[#142732](https://github.com/NousResearch/hermes-agent/issues/142732) · [#142740](https://github.com/NousResearch/hermes-agent/issues/142740)
- **桌面端对后台执行的可观测性不足。** Telegram 会话产生的子智能体只有静态标签，无法显示运行状态或打开子会话；群聊会话碎片化又使待输入提示指向旧会话。  
  链接：[#142715](https://github.com/NousResearch/hermes-agent/issues/142715) · [#142718](https://github.com/NousResearch/hermes-agent/issues/142718)
- **本地部署用户需要更可控的等待策略。** 自托管图像服务和本地视觉模型的超时反馈，说明固定时限可能不适配本地推理性能。  
  链接：[#142699](https://github.com/NousResearch/hermes-agent/issues/142699) · [#142676](https://github.com/NousResearch/hermes-agent/issues/142676)
- **个人知识管理场景需要原始资产保留。** Android 上传扫描 PDF 后虽能被读取，但原文件未保存在服务器，阻碍后续归档到 Obsidian。现有数据没有足够正向评价，无法判断整体满意度。  
  链接：[#142723](https://github.com/NousResearch/hermes-agent/issues/142723)

## 8. 待处理积压

**无法确认“长期未响应”条目**：展示的 Issue 均创建于 10 月 21—22 日，且没有维护者回复时间或旧 PR 明细。以下应视为优先跟踪队列，而非已证实的长期积压。

1. **凭据与环境隔离**：优先复现 ACP 错误端点路由、多 Profile 环境继承，明确影响范围与临时缓解方式。  
   链接：[#142714](https://github.com/NousResearch/hermes-agent/issues/142714) · [#142798](https://github.com/NousResearch/hermes-agent/issues/142798)
2. **不可自动恢复的故障**：为会话永久 409、Discord 重连挂起、Docker 冷启动失败建立回归用例。  
   链接：[#142731](https://github.com/NousResearch/hermes-agent/issues/142731) · [#142670](https://github.com/NousResearch/hermes-agent/issues/142670) · [#142743](https://github.com/NousResearch/hermes-agent/issues/142743)
3. **用户声称长期存在的体验问题**：对 Desktop 输入延迟与群聊上下文放大提供明确复现、性能基线与处理计划；“持续数月”是用户报告，不代表该 Issue 已积压数月。  
   链接：[#142732](https://github.com/NousResearch/hermes-agent/issues/142732)
4. **高影响修复审核**：重点跟进 Pillow 升级、会话迁移修复和 systemd 权限修复，并将结果补入后续发布说明。  
   链接：[PR #142831](https://github.com/NousResearch/hermes-agent/pull/142831) · [PR #142823](https://github.com/NousResearch/hermes-agent/pull/142823) · [PR #142825](https://github.com/NousResearch/hermes-agent/pull/142825)

**健康度结论**：项目贡献与交付活动旺盛，但当前最重要的质量信号不是 PR 数量，而是安全隔离、升级兼容和故障自恢复能否形成可验证的修复闭环。现有数据尚不足以证明问题收敛速度已跟上新增反馈速度。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报
**日期：2026-10-22｜统计范围：所提供的过去 24 小时 GitHub 更新**

> **数据说明**：项目入口为 `qwibitai/nanoclaw`，但本次数据中的条目链接均指向 `nanocoai/nanoclaw`，下文按条目来源生成链接，仓库归属关系有待核实。PR 评论数为 `undefined`，不能视为零；分析仅依据所给标题、摘要与状态。

## 1. 今日速览

过去 24 小时共有 **2 条 Issue、13 条 PR 更新**，全部处于开放状态，**没有 PR 合并或关闭，也没有新版本发布**。提交侧活跃度较高，但活动集中：13 条 PR 中有 12 条来自 glifocat，另 1 条为镜像刷新机器人提交，尚不能据此判断社区参与广度。工作重点是 **附件与 PDF 可用性、审批交互一致性、Codex 事件处理，以及渠道适配器向技能载荷迁移**。整体呈现“修复提案密集、等待评审验证”的状态；当前只能确认待合并方案增加，不能认定相关问题已在主线解决。

代表性条目：[PDF 修复 #4174](https://github.com/nanocoai/nanoclaw/pull/4174) · [审批修复 #4168](https://github.com/nanocoai/nanoclaw/pull/4168) · [渠道 CI #4177](https://github.com/nanocoai/nanoclaw/pull/4177)

## 2. 项目进展

### 已落地进展：本统计窗口内无新增合并记录

今日没有已合并或关闭的重要 PR，因此无法确认主线功能或稳定性取得了多少实际增量。以下均为**待合并进展**：

| 方向 | 当前推进内容 | 状态与意义 |
|---|---|---|
| 渠道交付架构 | [#4177](https://github.com/nanocoai/nanoclaw/pull/4177) 增加渠道载荷及全渠道组合测试；[#4178](https://github.com/nanocoai/nanoclaw/pull/4178) 将 Google Chat 适配器迁入技能载荷 | #4177 摘要明确为 Draft；两者旨在减少渠道修复需要同时维护 main 与 `channels` 分支的成本 |
| 运行时精简 | [#4172](https://github.com/nanocoai/nanoclaw/pull/4172) 删除 OpenCode 中核心流程无法触达的附件 file-part 路径 | 降低不可达代码及相关配置、测试的维护负担 |
| 镜像维护 | [#4179](https://github.com/nanocoai/nanoclaw/pull/4179) 将 `v2026.10.0` 的加固镜像引用更新为 `v2026.10.0-20261021T1608` | 属于镜像引用更新提案，不是新版本发布；摘要未提供具体漏洞或补丁清单 |

**进度判断**：当前推进主要体现在修复覆盖面扩大及交付基础设施准备，真正的用户收益仍取决于后续评审、测试与合并。

## 3. 社区热点

**无法按讨论热度可靠排名**：两条 Issue 均为 **0 评论、0 👍**；所有 PR 均为 **0 👍**，评论数缺失。以下按问题关联度与潜在影响筛选，而非称为“讨论最热”。

- **PDF 读取能力缺口**  
  [Issue #4175](https://github.com/nanocoai/nanoclaw/issues/4175) 已有对应 [修复 PR #4174](https://github.com/nanocoai/nanoclaw/pull/4174)。其核心诉求是：用户上传文档后，助手必须真正读取内容，而不能因容器缺少工具而在无文档依据的情况下回答。

- **长任务的上下文连续性**  
  [Issue #4173](https://github.com/nanocoai/nanoclaw/issues/4173) 请求智能体自行重置会话，并从交接文件恢复。背后需求是让研究型长任务主动管理上下文，减少自动压缩造成的细节丢失。

- **审批状态必须与授权结果一致**  
  [PR #4168](https://github.com/nanocoai/nanoclaw/pull/4168) 与 [#4171](https://github.com/nanocoai/nanoclaw/pull/4171) 将“主机接受点击”作为卡片或问题状态更新的前提，体现出对人工审批可信度及多渠道行为一致性的关注。

## 4. Bug 与稳定性

以下为基于摘要的**影响优先级评估**，并非项目官方严重性评级。所有列出的修复 PR 均仍开放，**尚不能视为已修复**。

| 优先级 | 问题与影响 | 是否已有 fix PR |
|---|---|---|
| **高：审批状态一致性** | 渠道在主机校验点击者之前就更新审批卡片或关闭待答问题，可能造成界面显示与实际授权状态不一致；摘要未证明存在授权绕过 | 有：[#4168](https://github.com/nanocoai/nanoclaw/pull/4168)、[#4171](https://github.com/nanocoai/nanoclaw/pull/4171) |
| **高：父子智能体事件串扰** | Codex 子智能体事件可能结束、填充或重定向父级回合，影响多智能体执行正确性 | 有：[#4165](https://github.com/nanocoai/nanoclaw/pull/4165) |
| **高：PDF 无法读取** | 镜像缺少 `pdftoppm` 所属的 `poppler-utils`，导致 Claude 的 PDF 读取失败；报告涉及 Linux、本地构建的 main `a62a8d2f` | 有：[Issue #4175](https://github.com/nanocoai/nanoclaw/issues/4175) → [#4174](https://github.com/nanocoai/nanoclaw/pull/4174) |
| **中高：邮件发送失败** | Resend 非线程邮件路径的标识处理异常，影响智能体回复及首次连接问候发送 | 有：[#4169](https://github.com/nanocoai/nanoclaw/pull/4169) |
| **中高：附件被丢弃** | 消息 ID 含 `/` 时，附件暂存流程拒绝该 ID，影响使用资源路径式消息标识的渠道 | 有：[#4170](https://github.com/nanocoai/nanoclaw/pull/4170) |
| **中：可重试错误被提前判失败** | Codex 发出 `willRetry: true` 的暂时性错误时，NanoClaw 仍可能结束回合 | 有：[#4166](https://github.com/nanocoai/nanoclaw/pull/4166) |
| **中：Drive 文件未送达且原因不清** | Google Chat 仅传入 Drive 文件 ID，智能体未获得文件；提案增加明确提示，引导用户直接上传，**不是实现 Drive 文件下载** | 有：[#4176](https://github.com/nanocoai/nanoclaw/pull/4176) |
| **中：图像生成能力受限** | OneCLI 的订阅信息表示方式影响 Codex 内置图像生成可用性，提案同时处理图像送达聊天的问题 | 有：[#4164](https://github.com/nanocoai/nanoclaw/pull/4164) |

本批数据未提供崩溃日志、修复后的测试结果或回归验证结论。

## 5. 功能请求与路线图信号

- **自主会话重置与交接恢复：明确需求，尚无对应实现。**  
  [Issue #4173](https://github.com/nanocoai/nanoclaw/issues/4173) 希望智能体在上下文耗尽前保存交接材料、主动重置并继续执行。当前列表中没有对应 PR，不能判断其会进入下一版本。

- **渠道适配器技能化：已有实现路径，但仍在基础设施准备阶段。**  
  [#4177](https://github.com/nanocoai/nanoclaw/pull/4177) 与 [#4178](https://github.com/nanocoai/nanoclaw/pull/4178) 表明 Google Chat 正作为载荷渠道的验证案例。若测试与迁移顺利，可能为更多渠道采用同一交付方式铺路，但未见确定发布计划。

- **近期更可能体现为可靠性改善，而非全新大功能。**  
  PDF、邮件发送、Codex 重试等已有具体修复提案，相比尚无实现的会话重置需求，更接近可评审交付阶段；这仍不构成版本承诺。参见 [#4174](https://github.com/nanocoai/nanoclaw/pull/4174)、[#4169](https://github.com/nanocoai/nanoclaw/pull/4169)、[#4166](https://github.com/nanocoai/nanoclaw/pull/4166)。

## 6. 用户反馈摘要

**两条 Issue 均无评论，因此以下来自 Issue 正文摘要，不是评论讨论或满意度调查。**

- **文档问答场景要求可靠读取。** 用户向 Claude 智能体发送一份 **60 页 PDF**，询问第 **47 页**，却遇到读取工具失败。痛点是附件看似已提交，但底层环境不具备实际读取能力。来源：[Issue #4175](https://github.com/nanocoai/nanoclaw/issues/4175)。
- **长时间研究任务要求可控交接。** 用户指出上下文填满后 SDK 自动压缩会丢失细节；智能体虽能监控上下文并写交接文件，却缺少干净的自助重置流程。来源：[Issue #4173](https://github.com/nanocoai/nanoclaw/issues/4173)。

当前没有可提炼的正向满意度反馈，也没有修复后体验反馈。

## 7. 待处理积压与维护提醒

**无法识别长期未响应积压**：本次条目均创建于 10 月 21—22 日，缺少更早历史、评审与响应记录，不能将它们归类为长期积压。

建议优先关注以下待办：

1. **优先评审审批与事件隔离修复**：核验拒绝点击后的 UI 状态、重复点击及父子线程隔离，降低状态错乱风险。  
   [#4168](https://github.com/nanocoai/nanoclaw/pull/4168) · [#4171](https://github.com/nanocoai/nanoclaw/pull/4171) · [#4165](https://github.com/nanocoai/nanoclaw/pull/4165)

2. **闭环 PDF 报告与镜像交付**：验证依赖安装后 PDF 实际可读，并明确修复进入哪些镜像；不能假设今日镜像刷新已包含该补丁。  
   [Issue #4175](https://github.com/nanocoai/nanoclaw/issues/4175) · [#4174](https://github.com/nanocoai/nanoclaw/pull/4174) · [#4179](https://github.com/nanocoai/nanoclaw/pull/4179)

3. **明确渠道迁移的评审顺序**：先确认载荷发现与组合测试覆盖，再推进 Google Chat 迁移，避免把交付问题带入新结构。  
   [#4177](https://github.com/nanocoai/nanoclaw/pull/4177) · [#4178](https://github.com/nanocoai/nanoclaw/pull/4178)

**健康度结论**：问题识别与修复提案较活跃，多项缺陷已有对应方案；但本窗口合并数为零、贡献集中、讨论数据不足。下一步应重点观察这些提案能否通过测试并进入主线，而非仅以 PR 数量衡量项目进展。

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

# LobsterAI 项目动态日报｜2026-10-22

## 1. 今日速览

本次统计窗口内，LobsterAI 有 **1 条 Issue 更新、7 条 PR 更新**，开发活动主要集中在客户端稳定性、悬浮球问答、专家广场与用量追踪。7 条 PR 均标记为 **CLOSED**，但数据未提供合并标识，因此只能确认已关闭，不能认定全部代码已进入主分支。社区新增需求聚焦退出确认带来的操作摩擦，暂无新增 Bug 报告或版本发布。整体呈现出**修复与体验打磨较活跃、公开讨论量有限**的状态，但缺少测试、CI 与发布数据，尚不足以全面判断项目健康度。

> **统计口径提醒：**所列 PR 的创建、更新时间均为 2026-10-21，与“过去24小时更新”的汇总口径存在日期差异。以下按提供的统计窗口收录，不将其表述为已确认在 10 月 22 日合并。

## 2. 项目进展

### 交互与功能体验

- **专家广场入口恢复与管理页面统一**  
  [#2916](https://github.com/netease-youdao/LobsterAI/pull/2916) 恢复侧边栏、新任务专家选择器和智能体创建对话框中的专家广场入口；[#2920](https://github.com/netease-youdao/LobsterAI/pull/2920) 刷新专家广场，并统一 Kits、Skills、Connectors、定时任务页面的搜索栏、操作按钮与卡片风格。两项工作共同改善功能可发现性和管理体验。**状态：均已关闭，是否合并未确认。**

- **图片、视频生成反馈完善**  
  [#2918](https://github.com/netease-youdao/LobsterAI/pull/2918) 优化生成前确认与提交后的进度反馈：模型目录支持时展示视频积分估算，长请求期间保持输入可用，并移除提交后通常无法生效的取消按钮。重点是减少等待过程中的不确定性，而非扩展生成能力。**状态：已关闭，是否合并未确认。**

### 稳定性与可观测性

- **悬浮球问答链路补齐两处关键防护**  
  [#2919](https://github.com/netease-youdao/LobsterAI/pull/2919) 在调用推理接口前解析“快速／旗舰”模型预设，避免直接发送 `yd-fast`、`yd-ultra` 导致服务端拒绝；[#2917](https://github.com/netease-youdao/LobsterAI/pull/2917) 延后展示悬浮球和任务面板，直至 gateway 进入 `running`，并补齐失败分类与日志关联。**状态：均已关闭，是否合并未确认。**

- **离线启动后的账号恢复**  
  [#2914](https://github.com/netease-youdao/LobsterAI/pull/2914) 针对“离线启动后重新联网，模型和个人资料仍不可用”的问题，改为恢复完整账号状态，而非仅重试模型加载。**状态：已关闭，是否合并未确认。**

- **原生任务与用量明细建立追踪关联**  
  [#2915](https://github.com/netease-youdao/LobsterAI/pull/2915) 为原生 IM、定时任务执行补充会话、原始输入和账号范围的用量上下文，每次定时执行获得独立 trace，并将当前轮次 trace 带入 Portal 用量详情链接。该工作有助于排查任务执行与用量归属问题。**状态：已关闭，是否合并未确认。**

**整体判断：**本轮更接近一次围绕现有功能的质量收敛，而非大型能力扩张；实际交付程度仍需以合并记录和后续版本为准。

## 3. 社区热点

- **唯一可确认的讨论热点：退出确认可配置化**  
  [Issue #2921](https://github.com/netease-youdao/LobsterAI/issues/2921) 当前 **OPEN，1 条评论、0 个 👍**。用户希望新增“退出前不再确认”设置，覆盖 Cmd+Q、应用菜单、Dock 和托盘退出场景。背后的诉求是：对把客户端当作日常常驻工具、又需要频繁启停的用户，统一二次确认增加了重复操作成本。

- **PR 讨论热度暂不可比较**  
  所列 PR 的评论数字段均为 `undefined`，不能按 0 条评论处理；点赞均为 0。因此，无法可靠评选“讨论最活跃 PR”。从改动主题看，悬浮球可用性是本轮较集中的工程议题，但不等同于社区热度最高。参见 [#2917](https://github.com/netease-youdao/LobsterAI/pull/2917)、[#2919](https://github.com/netease-youdao/LobsterAI/pull/2919)。

## 4. Bug 与稳定性

**本次 Issue 数据没有新增 Bug 报告。**以下为 PR 摘要披露的既有问题，按对功能可用性的影响排序；严重程度为分析判断，并非项目官方分级。

| 优先级 | 问题与影响 | Fix PR 与状态 |
|---|---|---|
| 高 | 默认模型为“快速／旗舰”时，悬浮球快捷问答可能因预设标识未解析而被服务端拒绝 | [#2919](https://github.com/netease-youdao/LobsterAI/pull/2919)，已有修复 PR，已关闭 |
| 高 | 离线启动后重连，账号恢复不完整，模型和个人资料仍不可用，需重启客户端 | [#2914](https://github.com/netease-youdao/LobsterAI/pull/2914)，已有修复 PR，已关闭 |
| 中高 | gateway 尚未就绪即显示任务入口，用户提交后立即失败 | [#2917](https://github.com/netease-youdao/LobsterAI/pull/2917)，已有修复 PR，已关闭 |
| 中 | 专家广场入口被 UI 开关隐藏，影响用户访问现有功能 | [#2916](https://github.com/netease-youdao/LobsterAI/pull/2916)，已有修复 PR，已关闭 |
| 中 | 图片／视频生成的费用确认、等待反馈及取消操作存在体验问题 | [#2918](https://github.com/netease-youdao/LobsterAI/pull/2918)，已有修复 PR，已关闭 |

以上修复是否已合并、是否随可下载版本交付，均未获数据确认；本次也未见崩溃、数据丢失或安全漏洞报告。

## 5. 功能请求与路线图信号

- **新需求：允许跳过退出二次确认**  
  [#2921](https://github.com/netease-youdao/LobsterAI/issues/2921) 提议增加设置开关。当前仅能确认需求已提出，未见对应 PR、维护者承诺或版本安排，不能判断下一版本一定支持。

- **近期候选方向：专家管理体验与核心链路可靠性**  
  专家广场入口恢复、管理页统一，以及悬浮球与账号恢复修复，均已有关闭的 PR，具备比纯需求更具体的实现信号。若已合并，可能成为后续版本内容；但仍需核实合并与发布状态。参见 [#2920](https://github.com/netease-youdao/LobsterAI/pull/2920)、[#2919](https://github.com/netease-youdao/LobsterAI/pull/2919)、[#2914](https://github.com/netease-youdao/LobsterAI/pull/2914)。

- **工程方向：提升自动化任务的可追踪性**  
  [#2915](https://github.com/netease-youdao/LobsterAI/pull/2915) 将原生 IM、定时任务与用量详情串联，显示项目正加强多入口任务的运行追踪能力；这属于已有实现信号，不代表已公布长期路线图。

## 6. 用户反馈摘要

- **可直接确认的痛点：频繁启停时，退出确认形成重复摩擦。**  
  [#2921](https://github.com/netease-youdao/LobsterAI/issues/2921) 的作者明确描述了常驻工具使用场景，并希望由用户自行决定是否保留确认，而非所有退出路径都强制弹窗。

- **反馈证据边界：暂无评论正文可供提炼。**  
  数据仅提供 [#2921](https://github.com/netease-youdao/LobsterAI/issues/2921) 的描述及“1 条评论”计数，未提供评论内容，因此不能推断维护者态度、其他用户共识或满意度。PR 摘要中的故障描述也不应直接当作用户评论引用。

## 7. 待处理积压

- **未发现可确认的长期未响应事项。**  
  唯一开放条目 [#2921](https://github.com/netease-youdao/LobsterAI/issues/2921) 当日创建、当日更新，不属于长期积压。建议维护者明确是否接受该设置需求，并说明默认行为及与更新安装、系统退出等现有 bypass 场景的关系。

- **建议核实已关闭 PR 的最终归宿。**  
  本次统计窗口内没有待合并 PR，但“无待合并”不等于所有工作均已交付。建议核实如 [#2919](https://github.com/netease-youdao/LobsterAI/pull/2919)、[#2914](https://github.com/netease-youdao/LobsterAI/pull/2914) 等关键修复是否合并，以及目标发布版本，避免将关闭数量误作修复交付数量。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报
**日期：2026-10-22**  
**项目：[moltis-org/moltis](https://github.com/moltis-org/moltis)**

## 1. 今日速览

过去 24 小时，Moltis 未出现 Issue 更新，仅有 **1 条待合并 PR 更新**，没有 PR 合并或关闭，也没有新版本发布，整体活跃度较低。今日唯一变动为 [PR #1313](https://github.com/moltis-org/moltis/pull/1313)，其标题涉及 TLS 证书验证与 CA 不信任处理，但所提供的摘要主要描述浏览器配置目录锁竞争修复，两者存在明显不一致。现有材料显示项目仍在推进稳定性维护，但相关改动尚未合并，不能视为已交付成果。单日活动量不足以判断长期项目健康度，尤其需要关注该 PR 的实际修复范围与验证结果。

## 2. 项目进展

**今日无已合并或已关闭 PR，暂无可确认的主分支交付进展。**

唯一在推进的变更是 [PR #1313：fix(tls): update certificate verifier and roots for CA distrust](https://github.com/moltis-org/moltis/pull/1313)：

- **状态与时间**：作者 `penso`，2026-10-21 创建，2026-10-22 更新，当前为 OPEN。
- **标题所示方向**：更新证书验证器及根证书，以应对 CA 不信任处理。
- **摘要所示方向**：修复测试覆盖过程中发现的浏览器配置目录锁竞争问题；通过持有锁的 guard 在释放时显式解锁，并在无法确认容器清理完成时保留 guard。
- **测试补充**：摘要提到三个确定性回归测试，覆盖释放、后续持有者排他性及隔离场景，涉及重复文件描述符。

**进展判断**：该 PR 显示出对并发资源生命周期与回归测试的关注，但标题、摘要不一致且摘要被截断，需核对完整描述及代码差异，才能确认实际覆盖范围。

## 3. 社区热点

### 唯一活跃条目：PR #1313

[PR #1313](https://github.com/moltis-org/moltis/pull/1313) 是今日唯一更新的协作条目，👍 为 **0**；评论字段为 `undefined`，应视为**评论数未知**，不能按零评论处理，也无法判断讨论热度。

从技术诉求看，标题指向 TLS 信任链维护，摘要则指向浏览器配置目录并发访问安全。二者都属于可靠性议题，但当前数据不足以确定社区更关注哪一项，也没有可引用的讨论内容。

## 4. Bug 与稳定性

今日没有新报告或更新的 Bug Issue。以下仅为唯一活跃 PR 所涉及的修复线索，按潜在影响列示，**不等同于已确认的严重性评级**。

| 优先关注项 | 已知问题与潜在影响 | 修复状态 |
|---|---|---|
| 安全相关，严重性待确认 | PR 标题涉及证书验证器、根证书与 CA 不信任处理；缺少具体 CA、触发条件和影响版本，不能认定存在已确认安全漏洞。 | 已有 [PR #1313](https://github.com/moltis-org/moltis/pull/1313)，待合并；需核实实际代码范围。 |
| 并发与资源清理，严重性待确认 | 摘要明确提及浏览器配置目录锁竞争，涉及锁释放、后续持有者排他性，以及容器清理未确认时的锁保留。可能影响目录访问互斥及清理安全，但没有生产影响数据。 | [PR #1313](https://github.com/moltis-org/moltis/pull/1313) 描述了修复方案及三个回归测试，尚未合并。 |

目前没有崩溃日志、受影响版本或用户复现报告，无法进一步量化影响范围。

## 5. 功能请求与路线图信号

今日没有新增功能请求，也没有可确认的功能型 PR。唯一活跃的 [PR #1313](https://github.com/moltis-org/moltis/pull/1313) 指向修复和加固，而非新增用户能力。

若该 PR 完成审查并合并，其内容可能成为后续版本的稳定性更新候选；但当前没有发布计划、里程碑或维护者承诺，不能据此确认下一版本的内容或时间。

## 6. 用户反馈摘要

今日提供的数据中没有 Issue 评论或其他用户反馈文本，无法提炼真实用户的使用场景、满意度或痛点。[PR #1313](https://github.com/moltis-org/moltis/pull/1313) 中的锁竞争问题来自测试覆盖发现，不应转述为用户投诉。

当前可确认的是维护者正在处理技术可靠性问题，而非出现了可观测的用户反馈热点。

## 7. 待处理积压

**现有数据无法识别长期未响应的重要积压。** 唯一待处理的 [PR #1313](https://github.com/moltis-org/moltis/pull/1313) 创建约一天，且今日仍有更新，不属于长期滞留条目。

建议维护者优先关注：

- **澄清 PR 范围**：核实 TLS 标题与浏览器锁修复摘要之间的差异，必要时调整描述或拆分变更，降低审查与发布说明歧义。
- **确认回归验证结果**：重点检查摘要所述三个锁相关回归测试，以及清理失败时保留 guard 的处理是否符合预期。

**健康度结论**：今日表现为低活跃度、修复导向的维护状态，尚无合并或发布成果；也没有足够证据表明存在长期积压或维护失速。该判断仅限本次提供的 24 小时数据，不代表全仓库长期趋势。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报｜2026-10-22

> **数据口径**：基于提供的过去 24 小时更新清单。项目名称按 CoPaw 展示，但条目指向 `agentscope-ai/QwenPaw`，下文保留实际仓库链接。部分条目更新时间为 10 月 21 日，因未提供时区与统计窗口边界，按清单纳入观察，不将其全部视为 10 月 22 日新提交。

## 1. 今日速览

过去 24 小时，项目有 **2 条 Issue、5 条 PR 更新**，全部处于开放状态，**无 PR 合并或关闭，也无新版本发布**。开发活动主要集中于 PawApp 应用集成、模型参数一致性、安全组件复用和聊天草稿隔离，整体呈现“**开发活跃、交付尚待验证**”的状态。社区反馈则暴露出容器化 Hub 启动失败、自动记忆搜索无法正常收尾两项可用性风险，值得优先排查。两项 PawApp 集成分别标记为 XL、XXXL，意味着功能扩展明显，但审查和验证负担也较重。[Issue 清单](https://github.com/agentscope-ai/QwenPaw/issues) · [PR 清单](https://github.com/agentscope-ai/QwenPaw/pulls)

## 2. 项目进展

**本期没有已合并或关闭的重要 PR，因此尚不能确认新增能力或修复已经进入主线。** 当前进展主要体现为以下待审实现：

| 方向 | 待合并进展 | 项目价值与当前边界 |
|---|---|---|
| PawApp 参考集成 | [#8364：文件浏览器集成](https://github.com/agentscope-ai/QwenPaw/pull/8364)，XL | 提供不依赖模型的参考应用，支持从主聊天或 App UI 请求授权目录列表、返回结构化结果，并在缺少默认目录时引导配置；有助于验证共享 PawApp 契约。 |
| 数据分析任务统一 | [#8363：Data App 接入任务契约](https://github.com/agentscope-ai/QwenPaw/pull/8363)，XXXL | 将主聊天委派分析与 Data Console 提交任务接入同一持久化 Host 生命周期，注册公开 `analyze` 和仅限 Direct 的 `analyze-session` 动作。 |
| 安全组件复用 | [#8360：使用 AgentScope Jev 分类器](https://github.com/agentscope-ai/QwenPaw/pull/8360)，L | 拟用 AgentScope 内置分类器及凭据组件替代手写 HTTP 调用，降低自维护集成代码的负担；尚无合并后的验证结果。 |
| 交互与模型配置修复 | [#8362：会话草稿隔离](https://github.com/agentscope-ai/QwenPaw/pull/8362)、[#8358：thinking 参数修复](https://github.com/agentscope-ai/QwenPaw/pull/8358) | 分别改善多会话使用体验和模型配置的实际生效一致性，均仍待合并。 |

**进展判断**：本期是“功能候选与修复方案增加”，而非“已交付能力增加”。尤其需要关注两项大型 PawApp PR 的接口一致性、权限边界和回归测试。

## 3. 社区热点

当前可量化的讨论量较低：两条 Issue 共 **3 条评论、0 个 👍**；PR 评论数为缺失值，不能据此判断 PR 无人讨论，也无法对其热度排序。

- **容器化部署阻塞是讨论最多的话题**：[#8359](https://github.com/agentscope-ai/QwenPaw/issues/8359) 有 **2 条评论**。报告者在容器中运行 Hub，随后 Docker 运行时启动失败，指向 readiness 探测硬编码 `127.0.0.1`。背后诉求是：容器化部署路径需要具备可用的网络寻址与健康检查机制。
- **自动记忆搜索的可靠性紧随其后**：[#8361](https://github.com/agentscope-ai/QwenPaw/issues/8361) 有 **1 条评论**。用户关注的不只是重复工具调用，而是保护机制触发后仍无法得到正常答复，说明异常恢复与最终回复生成同样需要保障。
- **PawApp 是开发侧最明显的投入方向**：同一作者提交了[文件浏览器集成 #8364](https://github.com/agentscope-ai/QwenPaw/pull/8364)和[数据应用集成 #8363](https://github.com/agentscope-ai/QwenPaw/pull/8363)。这属于实现投入信号，而非已证实的社区热度。

## 4. Bug 与稳定性

以下按**对受影响用户的潜在阻断程度**排序，非维护者官方定级。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **高：部署阻断** | [#8359](https://github.com/agentscope-ai/QwenPaw/issues/8359)：QwenPaw 2.2.2，Hub 自身运行于容器内时，Docker 运行时因 readiness 探测失败而无法启动，出现 `Errno 111`。影响范围目前限于所述部署场景，不能推定所有部署均受影响。 | **提供的数据中未见对应 fix PR。** |
| **高：对话无法完成** | [#8361](https://github.com/agentscope-ai/QwenPaw/issues/8361)：2.2.2 开启 Automatic Memory Search 后，同轮反复执行相同或近似 `memory_search`；第 4 次被保护机制拦截后，正常回复仍无法生成。 | **提供的数据中未见对应 fix PR。** |
| **中：模型配置与请求不一致** | [#8358](https://github.com/agentscope-ai/QwenPaw/pull/8358)：Console 展示的 thinking 设置与 OpenAI-compatible provider 实际发送参数不一致，涉及默认关闭及模型声明的控制能力。 | **已有修复 PR，尚未合并。** |
| **中：跨会话草稿串用** | [#8362](https://github.com/agentscope-ai/QwenPaw/pull/8362)：草稿仅按 agent 保存，导致同一 agent 的不同会话显示同一未发送文本；拟改为按 agent 与 session 隔离。 | **已有修复 PR，尚未合并。** |

目前没有足够信息确认上述问题是否属于近期版本回归，也没有数据证明修复已发布。

## 5. 功能请求与路线图信号

本期两条 Issue 均为 Bug，**未出现独立的新功能请求**。路线图信号主要来自开放 PR：

- **PawApp 共享任务契约正在从抽象接口走向实际应用**：[文件浏览器 #8364](https://github.com/agentscope-ai/QwenPaw/pull/8364)承担参考实现角色，[Data App #8363](https://github.com/agentscope-ai/QwenPaw/pull/8363)验证分析任务与持久化生命周期，显示主聊天与应用协同是当前重点。
- **安全能力倾向复用 AgentScope 官方组件**：[#8360](https://github.com/agentscope-ai/QwenPaw/pull/8360)体现减少自定义适配层、统一分类器与凭据接入方式的方向。
- **下一版本候选包括体验修复与应用集成**：[#8362](https://github.com/agentscope-ai/QwenPaw/pull/8362)、[#8358](https://github.com/agentscope-ai/QwenPaw/pull/8358)已有具体修复实现，但所有 PR 均未合并，且未提供里程碑或发布计划，**不能确认纳入下一版本**。

## 6. 用户反馈摘要

> 未提供 Issue 评论正文，以下仅依据报告者的 Issue 描述提炼，不代表评论区共识。

- **容器化部署用户需要可复现、可运行的部署路径**：[#8359](https://github.com/agentscope-ai/QwenPaw/issues/8359)报告称其采用了维护者此前建议的 Hub 容器部署方式，却遇到运行时启动失败。痛点在于部署建议与实际运行条件之间存在落差。
- **记忆增强用户首先需要稳定完成对话**：[#8361](https://github.com/agentscope-ai/QwenPaw/issues/8361)显示，重复搜索保护虽被触发，但未恢复正常回复。用户需要的是“停止无效调用后仍能回答”，而非仅阻止循环。
- **满意度无法量化**：现有两条 Issue 都是负面故障反馈，没有正向体验或修复确认信息；不能据此推断整体用户满意度。[#8359](https://github.com/agentscope-ai/QwenPaw/issues/8359) · [#8361](https://github.com/agentscope-ai/QwenPaw/issues/8361)

## 7. 待处理积压

**本批条目均创建于 10 月 21 日，不能认定为长期积压；也无法判断是否长期未获维护者回应。** 建议优先跟进以下待办：

1. **先完成两项高影响 Bug 的复现与分诊**：明确容器网络拓扑、readiness 探测目标，以及记忆搜索拦截后的退出与回复生成路径。[#8359](https://github.com/agentscope-ai/QwenPaw/issues/8359) · [#8361](https://github.com/agentscope-ai/QwenPaw/issues/8361)
2. **控制大型 PR 的审查风险**：对 PawApp 契约、授权边界、任务生命周期与失败恢复进行分层验证，避免大型集成集中进入主线。[#8363](https://github.com/agentscope-ai/QwenPaw/pull/8363) · [#8364](https://github.com/agentscope-ai/QwenPaw/pull/8364)
3. **关注首次贡献者修复的反馈闭环**：草稿隔离 PR 带有 `first-time-contributor` 标签，及时审查有助于解决用户问题并改善贡献体验。[#8362](https://github.com/agentscope-ai/QwenPaw/pull/8362)

**健康度结论**：项目具备持续开发投入和较明确的应用扩展方向，但本期尚无合并或发布成果。短期最值得关注的是两项可用性故障能否获得明确修复路径，以及大型 PawApp 集成能否在充分验证后完成交付。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：2026-10-22**  
**项目：[zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)**  
*统计口径：所提供的过去 24 小时更新记录；不代表仓库全部未解决事项。*

## 1. 今日速览

过去 24 小时，ZeroClaw 有 **6 条 Issue、15 条 PR 更新**，其中 5 条 Issue 仍开放、14 条 PR 待合并，开发活动较活跃。今日主线是安全加固：TLS/Wasmtime 依赖修复已合入，但容器原生 CA 信任库及发布镜像验证仍在推进，不能视为整条证书信任链问题已经解决。功能侧，邮件引用原文、Webhook 长任务超时、定时任务输出查询等改进已进入 PR 阶段，尚不能视为已交付。当前未发布新版本；整体呈现“安全修复有实质进展、用户体验改进并行、待审队列较集中”的状态。相关：[已合入安全修复 #11924](https://github.com/zeroclaw-labs/zeroclaw/pull/11924)、[容器 CA 修复 #11925](https://github.com/zeroclaw-labs/zeroclaw/pull/11925)。

## 2. 项目进展

### 已完成：依赖层安全修复合入

- **[#11924：修复 Wasmtime 与 TLS 安全公告涉及的依赖](https://github.com/zeroclaw-labs/zeroclaw/pull/11924)**  
  合并 TLS 验证器/根证书更新与 Wasmtime 48.0.7 安全修复，并调整可选 MQTT 依赖。摘要显示，先前分开修复时会因另一组依赖问题无法通过完整审计，因此本次采取联合修复。虽然列表状态仅标为 `CLOSED`，但 [#11925](https://github.com/zeroclaw-labs/zeroclaw/pull/11925) 明确说明其已合入 `master`，可确认该项已经合并。
- **关联问题 [#11923](https://github.com/zeroclaw-labs/zeroclaw/issues/11923) 已关闭**，对应 TLS 验证器和根证书包更新。

**进展判断：** 今日可确认的落地成果主要集中于依赖安全，而非新增用户功能。依赖修复是重要一步，但容器系统 CA 与发布流程验证仍分别由 [#11925](https://github.com/zeroclaw-labs/zeroclaw/pull/11925)、[#11942](https://github.com/zeroclaw-labs/zeroclaw/pull/11942) 跟进，安全闭环尚未完成。

## 3. 社区热点

**数据限制：6 条 Issue 的评论数和 👍 均为 0；PR 评论数为 `undefined`，不能按 0 处理。因此无法可靠评选“讨论最多”的事项。** 以下按关联开发活动与影响范围列出重点，而非互动热度排名。

| 关注主题 | 活动与背后诉求 |
|---|---|
| **证书信任与供应链安全** | [Issue #11932](https://github.com/zeroclaw-labs/zeroclaw/issues/11932)、[PR #11925](https://github.com/zeroclaw-labs/zeroclaw/pull/11925)、[PR #11942](https://github.com/zeroclaw-labs/zeroclaw/pull/11942) 形成从问题报告、容器修复到发布验证的工作链。核心诉求是：不仅 Rust 依赖安全，最终交付镜像也必须拒绝已撤信证书链。 |
| **同步 Agent 长任务** | [Issue #11930](https://github.com/zeroclaw-labs/zeroclaw/issues/11930) 与 [PR #11931](https://github.com/zeroclaw-labs/zeroclaw/pull/11931) 聚焦非流式 `POST /webhook`，希望长任务可等待更久，同时不放宽普通网关路由超时。 |
| **邮件回复可读性** | [Issue #11938](https://github.com/zeroclaw-labs/zeroclaw/issues/11938) 与 [PR #11939](https://github.com/zeroclaw-labs/zeroclaw/pull/11939) 希望回复携带原文，使 AI 邮件交互更接近常规邮件客户端。 |

## 4. Bug 与稳定性

以下按潜在影响排序；“已有修复 PR”不代表修复已经生效。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **高：容器证书信任风险** | [#11932](https://github.com/zeroclaw-labs/zeroclaw/issues/11932) 报告发布容器的原生 CA 包仍信任已公开撤信的 emSign 证书链；报告者标为 S0，标签为 `risk:high`。仅更新 Rust 验证器不足以覆盖系统 CA。 | [#11925](https://github.com/zeroclaw-labs/zeroclaw/pull/11925) 待合并，带 `needs-author-action`；[#11942](https://github.com/zeroclaw-labs/zeroclaw/pull/11942) 拟在镜像签名前按摘要和平台验证证书拒绝行为。 |
| **高：注册配对授权路径不一致** | [#11940](https://github.com/zeroclaw-labs/zeroclaw/pull/11940) 指出 `/enroll` 使用独立 `PairingGuard`，脱离 daemon 的统一配对权威，导致网关配对码在注册端点被拒绝。尚无证据据此认定存在授权绕过。 | 修复 PR 已开放，标记 `risk:high`、`priority:p2`。 |
| **中：Agent 运行归属信息丢失** | [#11934](https://github.com/zeroclaw-labs/zeroclaw/pull/11934) 修复 cron/网关触发运行中的工具、模型提供方及轮次记录缺少 `agent_alias`，影响运行追踪和多 Agent 归因。 | 修复 PR 待合并。 |
| **中：前端测试门禁覆盖不足** | [#11922](https://github.com/zeroclaw-labs/zeroclaw/pull/11922) 指出必需测试仅覆盖现有 28 个 Web 测试文件中的 20 个，遗漏文件中的断言失败可能无法阻止通过。 | CI 修复 PR 待合并。 |
| **低：端口绑定测试竞态** | [#11928](https://github.com/zeroclaw-labs/zeroclaw/issues/11928) 涉及测试释放端口后再绑定的竞争窗口，影响 CI 确定性，未显示为生产运行故障。 | [#11929](https://github.com/zeroclaw-labs/zeroclaw/pull/11929) 拟持续持有 listener 直至分类器消费。 |
| **低：窄屏聊天页布局溢出** | [#11933](https://github.com/zeroclaw-labs/zeroclaw/pull/11933) 修复手机等窄屏下聊天头部不换行、模型选择器等控件超出屏幕的问题。 | 修复 PR 待合并。 |

此外，[#11941](https://github.com/zeroclaw-labs/zeroclaw/pull/11941) 拟将 Cranelift 插件运行测试超时提高至 30 分钟，以适应正常运行已需约 18–20 分钟的情况；这是 CI 稳定性调整，不是运行时性能优化。

## 5. 功能请求与路线图信号

| 方向 | 当前进展 | 下一版本信号 |
|---|---|---|
| **邮件回复引用原文** | [#11938](https://github.com/zeroclaw-labs/zeroclaw/issues/11938) 已有 [#11939](https://github.com/zeroclaw-labs/zeroclaw/pull/11939)，新增频道级 `quote_original`，默认关闭。 | 已进入实现阶段；默认关闭有助于保持既有行为，但尚未合并。 |
| **Webhook 长时间同步调用** | [#11930](https://github.com/zeroclaw-labs/zeroclaw/issues/11930) 已有 [#11931](https://github.com/zeroclaw-labs/zeroclaw/pull/11931)，拟让 `/webhook` 使用现有长任务超时机制。 | 有明确实现候选，适合关注长耗时 Agent 的程序化集成用户。 |
| **CLI 查看定时任务输出** | [#11935](https://github.com/zeroclaw-labs/zeroclaw/pull/11935) 增加 `zeroclaw cron runs`，读取已保留的运行输出，弥补目前需查询网关 API 的缺口。 | 提升终端运维与脚本使用体验，尚待合并。 |
| **每日完整锁文件审计** | [#11926](https://github.com/zeroclaw-labs/zeroclaw/issues/11926) 已有 [#11927](https://github.com/zeroclaw-labs/zeroclaw/pull/11927)，在现有依赖图检查之外增加完整 `Cargo.lock` 审计。 | 更偏向开发流程改进，可增强可选依赖风险的持续发现能力。 |

上述事项均有开放 PR，说明已超出单纯需求收集阶段；但数据没有里程碑或维护者承诺，**不能确定会进入下一版本**。

## 6. 用户反馈摘要

提供的数据没有 Issue 评论正文，且 Issue 评论数均为 0，无法提炼评论中的满意度或社区共识。以下仅依据问题描述与 PR 动机归纳：

- **邮件场景：线程关联正确，不等于上下文易读。** 用户希望直接看到被回复的原文，而不是仅依赖邮件线程头信息。[#11938](https://github.com/zeroclaw-labs/zeroclaw/issues/11938)
- **程序化调用场景：长任务需要独立超时策略。** 诉求是允许同步 Agent 工作等待更久，同时维持普通接口的超时边界。[#11930](https://github.com/zeroclaw-labs/zeroclaw/issues/11930)
- **终端运维场景：任务状态不足以支持排障。** 现有输出已被保留，但 CLI 尚缺直接读取入口，增加了操作步骤。[#11935](https://github.com/zeroclaw-labs/zeroclaw/pull/11935)
- **移动端场景：关键控件必须保持可见。** 窄屏布局溢出影响模型选择等基础操作的可达性。[#11933](https://github.com/zeroclaw-labs/zeroclaw/pull/11933)

## 7. 待处理积压与维护提醒

**本批记录均创建于 10 月 21–22 日，不足以识别“长期未响应”事项。** 14 条开放 PR 只能说明当前待合并工作量，不能据此认定积压失控。建议优先关注：

1. **尽快闭合容器证书风险。** [#11925](https://github.com/zeroclaw-labs/zeroclaw/pull/11925) 带有 `needs-author-action`，应明确剩余阻塞，并与 [#11942](https://github.com/zeroclaw-labs/zeroclaw/pull/11942) 的发布验证协同审查。
2. **优先审查配对授权改动。** [#11940](https://github.com/zeroclaw-labs/zeroclaw/pull/11940) 涉及身份与访问路径，应重点验证统一配对 guard 的行为及兼容性。
3. **补齐安全与测试门禁。** 推进完整锁文件扫描 [#11927](https://github.com/zeroclaw-labs/zeroclaw/pull/11927) 和 Web 测试覆盖修正 [#11922](https://github.com/zeroclaw-labs/zeroclaw/pull/11922)，降低遗漏风险。
4. **协调批量依赖升级。** Rust 33 项更新 [#11937](https://github.com/zeroclaw-labs/zeroclaw/pull/11937) 与 Vite 升级 [#11936](https://github.com/zeroclaw-labs/zeroclaw/pull/11936) 均待处理，建议结合安全修复后的基线审查，避免仅凭升级数量判断收益。

**健康度结论：** 项目有明确的安全问题响应和需求实现活动，依赖层修复已落地；当前主要风险是容器信任链修复尚未闭环，以及多项改进仍集中在待审阶段。现有数据不足以判断长期响应速度、CI 通过率或用户满意度趋势。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*