# OpenClaw 生态日报 2026-11-17

> Issues: 34 | PRs: 76 | 覆盖项目: 13 个 | 生成时间: 2026-11-17 05:13 UTC

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
**日期：2026-11-17｜统计窗口：过去 24 小时｜[项目仓库](https://github.com/openclaw/openclaw)**

> **数据口径**：本日报依据提供的 34 条 Issue 和 76 条 PR 更新统计；PR 明细仅展示 30 条。明细中的 `CLOSED` 无法区分“已合并”与“直接关闭”，因此不将其等同于修复已落地。PR 评论数为 `undefined`，且未提供评论正文，无法据此判断 PR 讨论热度或引用用户评论。

## 1. 今日速览

OpenClaw 今日保持**高活跃度**：34 条 Issue 更新，其中 27 条仍开放、7 条关闭；76 条 PR 更新，其中 28 条待合并、48 条已合并或关闭。开发重心集中在**升级与恢复、会话权限、消息可靠性及 CI 修复**，显示项目正在密集处理稳定性问题，而非大规模扩展新功能。风险端仍有两个开放的 P0：升级过程中 Gateway 不可用，以及 macOS 首次对话被误判为内存不足，均带有发布阻断影响标签。过去 24 小时无新版本发布，当前应重点区分“已有修复提案”“PR 已关闭”和“修复已发布”三个状态。参见：[升级故障 #200289](https://github.com/openclaw/openclaw/issues/200289)、[macOS 首次对话失败 #200340](https://github.com/openclaw/openclaw/issues/200340)。

## 2. 项目进展

### 重要已关闭 PR：可靠性与工程维护是主线

以下 PR 今日已关闭，但**是否合并仍需核实**：

| 方向 | 重要 PR | 推进内容与实际意义 |
|---|---|---|
| 自动化连续性 | [#200396](https://github.com/openclaw/openclaw/pull/200396) | 针对聊天会话标识变化导致自动化停止、周期 watcher 被禁用的问题，修正创建者权限恢复相关逻辑。 |
| 消息可靠性 | [#200413](https://github.com/openclaw/openclaw/pull/200413) | 针对访问策略短暂不可用时排队消息被丢弃的问题，提出保留消息的处理，改善临时故障下的可靠性。 |
| 后台服务交接 | [#200412](https://github.com/openclaw/openclaw/pull/200412) | 处理 Agent 启动的服务在命令结束后、再次写日志时连接中断的问题，面向长期运行服务场景。 |
| 升级与恢复 | [#200387](https://github.com/openclaw/openclaw/pull/200387)、[#200388](https://github.com/openclaw/openclaw/pull/200388) | 分别针对 Git 安装升级预构建失败，以及升级后无法从 PostgreSQL 回迁 SQLite。两类问题仍有其他开放 PR 跟进，不能视为已解决。 |
| 插件安装体验 | [#200392](https://github.com/openclaw/openclaw/pull/200392)、[#200406](https://github.com/openclaw/openclaw/pull/200406) | 分别涉及聊天内安装 Git/第三方 npm 插件的审批路径，以及隐藏插件安装成功后被误报缺失。 |
| CI 与测试维护 | [#200414](https://github.com/openclaw/openclaw/pull/200414)、[#200405](https://github.com/openclaw/openclaw/pull/200405)、[#200411](https://github.com/openclaw/openclaw/pull/200411) | 涉及存储测试任务规划、Windows 子进程启动及跨平台升级测试；主要改善开发验证链路，不直接改变运行时功能。 |

**进展判断**：今日工作覆盖了“升级—运行—恢复”的多个关键环节，但更接近**稳定性修复与验证阶段**。例如，Git 升级修复 [#200381](https://github.com/openclaw/openclaw/pull/200381) 和数据库回迁修复 [#200383](https://github.com/openclaw/openclaw/pull/200383) 仍开放；现有数据不足以计算修复交付率。

## 3. 社区热点

可见 Issue 评论量为 1—4 条，所有条目 👍 均为 0，因此今天的热点主要体现为**故障影响程度和问题聚集度**，而非大规模社区互动。

| 热点 | 可见热度 | 背后诉求 |
|---|---:|---|
| [#200289：稳定版升级耗时数小时、SQLite 锁导致 Gateway 交接失败](https://github.com/openclaw/openclaw/issues/200289) | 4 条评论，样本最高 | 用户希望升级可预测、失败可恢复，不必依赖 SSH 救援。 |
| [#200276：`memory forget --dry-run` 使用无界 SQLite `IN` 列表](https://github.com/openclaw/openclaw/issues/200276) | 3 条评论 | 长历史会话下，连只读预演也需要具备规模上限和可靠的查询规划。 |
| [#200408：TUI 重开会话后长回复被截断](https://github.com/openclaw/openclaw/issues/200408) | 2 条评论 | 用户要求历史回放与原始输出一致；摘要指出全文仍在存储中，并非已确认的数据丢失。 |
| [#200344：单向 A2A 派发并抑制失败回执](https://github.com/openclaw/openclaw/issues/200344) | 2 条评论 | 多 Agent 工作流需要明确的“不等待、不回执”语义，同时暴露旧 Issue 关闭后补充复现信息的衔接问题。 |
| [#200270：压缩通知晚于 memory flush](https://github.com/openclaw/openclaw/issues/200270) | 2 条评论 | 长操作需要及时可见的进度反馈，避免用户将正常处理误认为卡死。 |

**PR 热度无法可靠排名**：提供的数据缺少有效评论数，不能把展示顺序解释为讨论热度。

## 4. Bug 与稳定性

### P0：优先处理发布阻断与基础可用性

| Issue | 影响与当前状态 | Fix PR |
|---|---|---|
| [#200289：2026.11.3 → 2026.11.4 升级失败](https://github.com/openclaw/openclaw/issues/200289) | **开放**。升级耗时数小时，Gateway 在事故期间不可用，报告涉及 SQLite 锁及 SSH 恢复。 | 所给明细未见；需维护者审查及补充信息。 |
| [#200340：macOS 首条消息误报内存不足](https://github.com/openclaw/openclaw/issues/200340) | **开放**。当前 `main` 上，Bun 的可用内存报告方式导致新用户首次对话失败，已有源码复现标签。 | 所给明细未见。 |
| [#200244：macOS onboarding 中 detached npm 崩溃](https://github.com/openclaw/openclaw/issues/200244) | **已关闭**。涉及继承 `/dev/tty` 后终端初始化失败，阻碍 Codex 首次配置。 | 明细未展示对应 PR；关闭不代表已发布修复。 |

### P1：升级、隐私与会话完整性

| Issue | 影响与当前状态 | Fix PR |
|---|---|---|
| [#200357：Git 安装升级回归](https://github.com/openclaw/openclaw/issues/200357) | **开放**。`preflight-build` 报 `Declaration input escapes checkout`，阻止更新到相关 `main` 提交。 | [#200381 开放](https://github.com/openclaw/openclaw/pull/200381)；另有 [#200387 已关闭](https://github.com/openclaw/openclaw/pull/200387)。 |
| [#200281：owner-private 记忆可在群聊 recall/forget](https://github.com/openclaw/openclaw/issues/200281) | **开放**。标记安全及数据丢失影响，涉及私有记忆访问与删除边界。 | 有 `linked-pr-open` 标签，但所给明细未提供编号。 |
| [#200309：无用户操作时主会话被原地重置](https://github.com/openclaw/openclaw/issues/200309) | **开放**。报告约 16 秒内重置 4 次，丢失上下文和缓存前缀；触发来源仍需确认。 | 所给明细未见。 |
| [#200336：子 Agent 完成结果延迟后被丢弃](https://github.com/openclaw/openclaw/issues/200336) | **开放**。结果等待至 30 分钟硬过期，最终因源会话生命周期变化而丢弃；仍需补充信息。 | 所给明细未见。 |
| [#200346：移动端长录音在锁屏/失焦后丢失](https://github.com/openclaw/openclaw/issues/200346) | **已关闭**。录音缺少保留与重试路径。 | 相关听写改进 [#200235 仍开放](https://github.com/openclaw/openclaw/pull/200235)，不宜视为该问题已全面覆盖。 |
| [#200307：无关会话创建中断 cron 条件](https://github.com/openclaw/openclaw/issues/200307)；[#200271：启动迁移触发 vec0 崩溃](https://github.com/openclaw/openclaw/issues/200271) | 均**已关闭**，分别影响自动化持续运行与 Gateway 启动。 | cron 有相关 [#200396，已关闭](https://github.com/openclaw/openclaw/pull/200396)；启动崩溃对应 PR 未展示。 |

### P2：安全配置、恢复能力与规模问题

- **Cloudflare Access 身份信任边界**：[Issue #200361](https://github.com/openclaw/openclaw/issues/200361) 指出文档配置下 trusted-proxy 认证信任身份头而不验证 Access JWT；[PR #200376](https://github.com/openclaw/openclaw/pull/200376) 提供可选 JWT 验证，仍开放且要求安全审查。风险依赖“能够从受信代理地址触达 Gateway”的前提，不应泛化为任意远程绕过。
- **数据库回迁被拒**：[Issue #200356](https://github.com/openclaw/openclaw/issues/200356) 影响升级后的 SQLite 恢复路径；[PR #200383](https://github.com/openclaw/openclaw/pull/200383) 已提供修复提案，待维护者处理。
- **大规模数据与启动效率**：[无界 SQLite 参数列表 #200276](https://github.com/openclaw/openclaw/issues/200276)、[启动数据库预检二次复杂度 #200267](https://github.com/openclaw/openclaw/issues/200267) 均仍开放，所给明细未见 fix PR。
- **模型初始化状态误导**：[API key 配额失败被误报 #200263](https://github.com/openclaw/openclaw/issues/200263)、[未连接模型却报凭据被拒 #200325](https://github.com/openclaw/openclaw/issues/200325)、[未配置模型被显示为默认项 #200323](https://github.com/openclaw/openclaw/issues/200323) 形成同类体验问题；后两项带开放关联 PR 标签，但编号未展示。

## 5. 功能请求与路线图信号

| 需求 / 信号 | 当前依据 | 近期纳入判断 |
|---|---|---|
| **Cloudflare Access JWT 验证** | [#200361](https://github.com/openclaw/openclaw/issues/200361) 已有开放实现 [#200376](https://github.com/openclaw/openclaw/pull/200376)。 | **实现信号较强**，但安全审查是关键门槛，尚无版本承诺。 |
| **重启恢复时保留原请求者权限** | 开放 PR [#200394](https://github.com/openclaw/openclaw/pull/200394) 针对共享会话恢复工作时丢失授权者身份或变为 owner 的问题。 | 已进入实现阶段，反映多用户 Agent 权限连续性正在被加强。 |
| **单向 A2A 派发且不接收失败回执** | [#200344](https://github.com/openclaw/openclaw/issues/200344) 仍需产品决策和现场复现。 | 暂属需求澄清阶段，不宜预测下版交付。 |
| **逐轮结果分享授权** | [#200332](https://github.com/openclaw/openclaw/issues/200332) 希望插件 SDK 将明确同意与某一轮最终结果绑定。 | 产品与安全设计阶段，暂无可见实现 PR。 |
| **私网 HTTP 的受控密钥替换** | [#200308](https://github.com/openclaw/openclaw/issues/200308) 请求按主机显式允许向私网明文 HTTP 注入密钥。 | 自托管需求明确，但涉及安全边界，仍需决策。 |
| **本地模型压缩不走全局云模型** | [#200269](https://github.com/openclaw/openclaw/issues/200269) 请求按模型退出全局 `compaction.model`。 | 反映隐私与模型路由控制诉求；暂无可见实现。 |

## 6. 用户反馈摘要

以下依据 **Issue 描述**归纳，而非未提供的评论正文：

- **升级失败的实际代价高于一次命令报错**：Gateway 停服、远程救援、Git 更新被阻断和回迁失败说明，用户需要完整的失败恢复路径，而不仅是正常升级流程。参见 [#200289](https://github.com/openclaw/openclaw/issues/200289)、[#200357](https://github.com/openclaw/openclaw/issues/200357)、[#200356](https://github.com/openclaw/openclaw/issues/200356)。
- **个人助手使用已延伸到长会话、移动端与后台任务**：历史长回复截断、录音丢失和子 Agent 结果丢弃，反映用户对跨重启、跨前后台的数据连续性有明确期待。参见 [#200408](https://github.com/openclaw/openclaw/issues/200408)、[#200346](https://github.com/openclaw/openclaw/issues/200346)、[#200336](https://github.com/openclaw/openclaw/issues/200336)。
- **“看起来卡死”与真实故障同样损害信任**：压缩通知迟到、Windows `gateway status` 耗时 16—22 秒，说明状态反馈和诊断延迟仍需改善。参见 [#200270](https://github.com/openclaw/openclaw/issues/200270)、[#200351](https://github.com/openclaw/openclaw/issues/200351)。
- **权限与隐私需要端到端一致**：群聊私有记忆、重启恢复授权身份和本地模型压缩路由，都表明用户关心数据究竟被谁访问、以谁的权限执行、发送到哪里。参见 [#200281](https://github.com/openclaw/openclaw/issues/200281)、[#200394](https://github.com/openclaw/openclaw/pull/200394)、[#200269](https://github.com/openclaw/openclaw/issues/200269)。

数据未包含足够的正向评价，**无法客观判断满意度或净情绪趋势**。

## 7. 待处理积压与维护提醒

本批 Issue 主要创建于 11 月 16—17 日，**不足以确认长期未响应积压**。更值得提醒的是以下等待决策、审查或验证的项目：

| 待处理项 | 建议关注 |
|---|---|
| [P0 升级故障 #200289](https://github.com/openclaw/openclaw/issues/200289)、[P0 macOS 首次对话失败 #200340](https://github.com/openclaw/openclaw/issues/200340) | 优先明确责任人、复现环境和发布阻断标准；两者均未见明确 fix PR。 |
| [Git 升级 PR #200381](https://github.com/openclaw/openclaw/pull/200381)、[SQLite 回迁 PR #200383](https://github.com/openclaw/openclaw/pull/200383) | 均标记等待维护者；需与同主题已关闭 PR 对齐，避免修复状态不清。 |
| [Cloudflare JWT PR #200376](https://github.com/openclaw/openclaw/pull/200376)、[私有记忆 Issue #200281](https://github.com/openclaw/openclaw/issues/200281) | 优先完成安全边界审查及回归验证。 |
| [听写 PR #200235](https://github.com/openclaw/openclaw/pull/200235) | 仍有证明材料要求及会话状态风险标签，应验证锁屏、失焦、连续录音等真实移动端场景。 |
| [A2A 重提 Issue #200344](https://github.com/openclaw/openclaw/issues/200344) | 原问题曾因不活跃关闭，用户又补充更强复现；建议确保新证据进入人工分诊，避免重复关闭循环。 |

### 综合健康度结论

**活跃度高，稳定性与交付确定性仍承压。** 今日可见的积极信号是多个关键故障已有修复提案，并持续维护 CI 验证链路；主要风险则是开放 P0、升级与回退路径同时受阻，以及会话权限和消息完整性问题。下一阶段最有价值的进展，应是确认关键修复合并、补齐端到端回归，并在正式发布说明中明确受影响版本与恢复措施。

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向分析
**观察日期：2026-11-17｜统计窗口：过去 24 小时**

> **口径说明：**以下分析仅依据所给摘要。Issues、PR 数均指窗口内更新条目，并非新增量或仓库总量；PR“关闭”不等于“合并”。单日活动量不能替代社区规模、长期维护能力或产品成熟度。

## 1. 生态全景

本次覆盖的 **13 个项目合计有 113 条 Issue、190 条 PR 更新及 4 个 Release**，活动明显集中于 OpenClaw、Hermes Agent 和 NanoClaw。生态主线正从能力扩展转向**长期运行的可靠性**：升级恢复、会话连续性、消息投递、工具故障隔离和跨平台兼容成为共同重点。权限治理也在从静态配置延伸到执行全过程，覆盖私有记忆、用户身份、无人值守执行、文件访问与紧急停止。新功能仍持续出现，但多数处于开放 PR 阶段，当前更值得关注的是“修复是否验证并发布”，而不是提交数量本身。

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release 情况 | 健康度与主要观察点 |
|---|---:|---:|---|---|
| **OpenClaw** | 34 | **76** | 无 | 开发投入最高；升级、权限与消息可靠性集中修复，但两个开放 P0 仍构成发布风险 |
| **NanoBot** | 1 | 8 | 无 | 问题已有对应方案；重点验证会话新数据是否真正进入推理请求 |
| **Hermes Agent** | **50** | 50 | 2：v0.23.2 正式版、1 个 Canary | 发布与开发活跃；安全、费用和 API 回归需要优先分诊，49 条 PR 仍开放 |
| **PicoClaw** | 0* | 0* | 无可见活动 | 单日无活动，无法评价长期健康度 |
| **NanoClaw** | 14 | 22 | 1：v2026.11.0-beta.4 | Beta 快速迭代；安装、接入与消息可靠性仍在收敛，窗口内无 Issue 关闭 |
| **NullClaw** | 0* | 0* | 无可见活动 | 观察不足 |
| **IronClaw** | 0* | 0* | 无可见活动 | 观察不足 |
| **LobsterAI** | 1 | 13 | 1：2026.11.16 | 桌面体验持续交付；本地文件权限修复和 OpenClaw 集成回归是重点 |
| **TinyClaw / TinyAGI** | 0 | 1 | 无 | 低变动，唯一更新为待审证据交接文档，无运行时交付 |
| **Moltis** | 0* | 0* | 无可见活动 | 观察不足 |
| **CoPaw** | 9 | 11 | 无 | 修复与需求响应活跃；企业会话隔离、启动就绪和技能回滚风险待闭环 |
| **ZeptoClaw** | 1 | 0 | 无 | 单一搜索集成提案，仍处需求评估阶段 |
| **ZeroClaw** | 3 | 9 | 无 | 身份集成与安全工作活跃；全部 PR 待审，急停执行缺口值得优先关注 |
| **合计** | **113** | **190** | **4** | **2 个正式版、2 个预发布版本** |

\* “0”仅表示摘要注明过去 24 小时无活动，不代表没有存量问题或维护工作。

另外，NanoClaw 的项目入口与条目仓库分别为 `qwibitai/nanoclaw`、`nanocoai/nanoclaw`；CoPaw 条目指向 `QwenPaw`。做自动化追踪时，应先核对仓库映射，避免拆分或重复统计。

## 3. OpenClaw 在生态中的定位

### 优势：运行场景覆盖广，修复投入密集

OpenClaw 今日 PR 更新数占样本总量 **40%（76/190）**；与 Hermes Agent 合计贡献约 **66%** 的 PR 更新，是本窗口最主要的开发活动中心。

其议题横跨 Gateway、升级回退、存储迁移、长期记忆、群聊权限、插件、移动输入、cron 与 A2A。这说明它面对的是一个较完整的**持续运行个人助手系统**，而不仅是单次任务执行器。大量场景反馈有助于完善边界条件，但也带来更大的回归测试面。

### 技术路线：以会话与 Gateway 为中心的持续运行体系

| 对比对象 | OpenClaw 的相对差异 |
|---|---|
| **NanoBot** | 双方都关注 Gateway 和上下文一致性；OpenClaw 今日涉及更多升级、存储、权限和自动化交叉问题，NanoBot 的可见工作更集中于 WebUI、SDK 会话恢复与 MCP 隔离 |
| **Hermes Agent** | 都覆盖长期会话、多工具和自动化；Hermes 今日更突出 Desktop、API、Kanban、代码执行及模型路由，OpenClaw 更集中于升级恢复、消息与权限连续性 |
| **LobsterAI** | LobsterAI 更侧重桌面产品体验，并直接开展 OpenClaw 集成；两者存在组合使用关系，不能只视为替代品 |
| **CoPaw、ZeroClaw** | 后两者今日呈现更明确的企业身份、用户上下文及 OIDC 诉求；OpenClaw 则突出既有会话、记忆与恢复过程中的权限一致性 |

### 社区规模：活动领先，但不能据此判定用户最多

可确认的是 **OpenClaw PR 更新量最高，Hermes Issue 更新量最高**。由于缺少活跃贡献者、独立报告者、安装量、Stars 和长期数据，不能进一步推断社区人数或市场占有率。

OpenClaw 的短期限制同样明确：**高活跃不等于高稳定**。升级停服与 macOS 首次对话失败两个开放 P0，使其当前重点应是质量巩固，而不是继续扩大功能面。

## 4. 共同关注的技术方向

| 共同方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **会话与上下文连续性** | OpenClaw、NanoBot、Hermes、NanoClaw | 重启后保持上下文、导入数据进入下一次推理、视觉信息跨轮保留、补齐线程历史 |
| **长期运行与故障恢复** | OpenClaw、Hermes、NanoClaw、CoPaw、ZeroClaw | 升级回退、启动恢复、任务不互相阻塞、进程清理、回滚备份保护 |
| **消息可靠性与状态真实性** | OpenClaw、NanoClaw、CoPaw、NanoBot | 不丢队列消息、避免重复分段发送、正确报告送达状态、前端完成状态与实际执行一致 |
| **身份、权限与资源隔离** | OpenClaw、Hermes、LobsterAI、CoPaw、ZeroClaw | 私有记忆边界、deny 策略一致执行、本地文件白名单、多用户会话隔离、OIDC 与执行沙箱 |
| **工具故障隔离** | NanoBot、Hermes、LobsterAI | 慢 MCP 不拖累聊天、启动竞态治理、单个插件超时不放大为安装链故障 |
| **人在回路与执行控制** | CoPaw、Hermes、ZeroClaw、OpenClaw | 邮件先存草稿、前台操作审批、真实急停、逐轮分享授权与执行中纠偏 |
| **成本与模型路由可预测性** | Hermes、CoPaw、OpenClaw | provider/model 配对正确、额度错误触发降级、本地任务避免意外转云 |
| **来源可追溯性** | TinyAGI、ZeptoClaw | 研究到写作的原始链接与摘录交接，以及明确授权的公共文档搜索 |

**共性判断：**当前难点越来越多地位于模型之外——状态、存储、调度、权限、传输与界面之间是否保持一致，正在决定助手是否可信。

## 5. 差异化定位分析

以下为依据本日活动形成的侧重点判断，不代表各项目完整能力清单。

| 项目 | 功能侧重 | 更匹配的用户场景 | 可见架构关注点 |
|---|---|---|---|
| **OpenClaw** | 持续运行的综合个人助手 | 自托管、多渠道、长期自动化 | Gateway、会话权限、记忆、存储迁移、插件与 A2A |
| **NanoBot** | 会话型助手与工具接入 | WebUI 使用者、SDK 集成开发者 | Responses 会话恢复、MCP 隔离、Gateway 启动职责 |
| **Hermes Agent** | 桌面与 API 并行的自主任务执行 | 开发者、复杂工具链与自动化用户 | Desktop/API、多 provider、Kanban、执行策略、计划到执行 |
| **NanoClaw** | 消息渠道与容器化运行 | 渠道机器人、自托管部署 | Docker 生命周期、渠道适配、镜像更新、配对流程 |
| **LobsterAI** | 桌面生产力与内容任务 | 重视搜索、语音、PPT 和交互体验的用户 | Electron、本地文件协议、浏览器 CDP、多 Agent 状态、OpenClaw 集成 |
| **CoPaw** | 企业渠道与可监督工作流 | 企业协作、多工作区、媒体任务 | 用户身份传递、会话隔离、工作区回滚、模型 fallback |
| **ZeroClaw** | 身份认证、安全和运行时治理 | 企业接入、受控工具执行 | Rust 依赖体系、OIDC/JWKS、凭据作用域、调度与执行隔离 |
| **TinyAGI** | 多 Agent 团队协作 | 研究—写作等分工工作流 | 团队交接与证据传递规范 |
| **ZeptoClaw** | 交互式 CLI 工具体验 | 有人值守的终端助手 | 搜索服务选择、单轮外部调用授权 |

PicoClaw、NullClaw、IronClaw、Moltis 本日无可见活动，不能仅凭名称或既有印象补充其定位。

## 6. 社区热度与成熟度

### 活跃度分层

- **高强度开发：OpenClaw、Hermes。** 两者合计占约 **75% 的 Issue 更新、66% 的 PR 更新**，但都面临高影响缺陷或修复待交付压力。
- **持续迭代：NanoClaw、LobsterAI、CoPaw。** 同时存在发布、功能扩展与基础可靠性治理；其中 NanoClaw 明确处于 Beta 收敛阶段。
- **聚焦推进：NanoBot、ZeroClaw。** 分别集中在会话正确性/MCP 和身份认证/安全运行时，尚不能将待审方案计为交付。
- **低活动或观察不足：TinyAGI、ZeptoClaw，以及四个无活动项目。** 不宜据单日窗口判断衰退或维护停滞。

### 快速迭代与质量巩固并存

- **快速迭代信号较强：**NanoClaw 连续 Beta、LobsterAI 桌面功能发布、Hermes 正式版与 Canary 并行。
- **质量巩固特征明显：**OpenClaw 的升级与恢复、NanoBot 的上下文一致性、CoPaw 的初始化与回滚，以及各项目的跨平台修复。
- 两种状态并不互斥：**发布快可能同时意味着回归面扩大，而非成熟度更高。**

### 讨论热度仍有限

可见 Issue 评论通常仅 **0—4 条**，所列点赞均为 0，PR 评论数据普遍缺失。因此目前更适合判断“开发议题集中度”，而非“大规模社区共识”；也无法可靠评价用户满意度或维护响应速度。

## 7. 值得关注的趋势信号

### ① “显示成功”与“实际生效”的偏差成为核心风险

NanoBot 导入成功但推理仍用旧数据、NanoClaw 发送失败却标为送达、ZeroClaw 急停状态未被执行，均属于**静默失败**。

**开发参考：**验收标准应检查最终行为与持久化结果，不能只检查 HTTP 状态、命令退出码或界面提示。

### ② 个人助手正在承载多用户、企业化需求

OpenClaw 的群聊私有记忆、CoPaw 的钉钉会话隔离和用户身份传递、ZeroClaw 的 OIDC 集成都指向这一变化。

**开发参考：**身份应贯穿请求、任务、工具、记忆及恢复流程，不能在后台重启或转交后默认提升为 owner 权限。

### ③ 长期运行能力比单次演示更具区分度

升级停服、cron 阻塞、过期素材、后台结果丢弃和进程残留，都是持续使用后才暴露的问题。

**开发参考：**优先投资持久化队列、幂等处理、任务取消、故障恢复和生命周期测试，而不只是增加工具数量。

### ④ 安全控制正从配置声明转向运行时强制执行

deny 策略、急停、文件白名单与隔离构建环境受到关注，说明“提供一个安全开关”已经不足够。

**开发参考：**验证控制能否覆盖所有入口、子 Agent 和无人值守路径，并确保失败时不会虚报安全成功。

### ⑤ 产品价值向“可监督、可追溯、可恢复”迁移

邮件草稿、执行中纠偏、屏幕审批和来源交接，反映用户需要的并非无限自主，而是可控自主。

**开发参考：**将审批、证据、状态可见性和恢复机制设计为主流程，而不是事后补丁。

---

## 决策结论

**生态竞争正在从“谁能执行更多任务”，转向“谁能在长期、多用户、多工具环境中可靠执行”。** OpenClaw 在本窗口体现出最高的 PR 活跃度和广泛的运行场景，但开放 P0 与升级恢复压力仍应纳入部署判断；Hermes、LobsterAI、CoPaw、NanoClaw 和 ZeroClaw 则分别在开发者执行、桌面体验、企业协作、渠道运行与身份安全方面呈现差异化投入。

技术选型不宜按单日活动量排名，而应围绕实际场景验证三件事：**关键控制是否真正生效、失败后能否恢复、修复是否已经进入可用版本。**

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报
**日期：2026-11-17** · [项目主页](https://github.com/HKUDS/nanobot)

## 1. 今日速览

过去 24 小时，NanoBot 有 **1 条 Issue、8 条 PR 更新**，其中 5 条 PR 仍开放、3 条已关闭，开发活跃度较高，工作主要集中在 WebUI、会话上下文一致性和 Gateway/MCP 稳定性。最值得关注的是会话恢复时遗漏已导入数据的问题：用户报告报价已更新，但模型仍使用旧价格作答，已有修复 PR 待处理。今日没有新版本发布，因此 PR 层面的进展不能直接视为已向用户交付。整体呈现持续修复和架构整理的健康信号，但社区讨论数据不足，且 3 条关闭 PR 未提供合并标记，无法确认实际入库成果。[Issue #6678](https://github.com/HKUDS/nanobot/issues/6678) · [PR 列表](https://github.com/HKUDS/nanobot/pulls)

## 2. 项目进展

今日有 **3 条 PR 已关闭**。以下说明其提出的改动方向，**不将“关闭”等同于“已合并”**。

| PR | 主要改动 | 推进价值 |
|---|---|---|
| [#6685 Apps 默认打开可用工具](https://github.com/HKUDS/nanobot/pull/6685) | 存在已安装 CLI 应用、已启用插件或已连接 MCP 时，默认进入 Ready 视图；否则展示安装目录，并尊重手动筛选选择 | 缩短从打开 Apps 到使用现有工具的操作路径 |
| [#6684 加速 WebUI 完整回归检查](https://github.com/HKUDS/nanobot/pull/6684) | 优化完整 WebUI 回归流水线的关键路径 | 原有成功 PR 浏览器任务中位耗时 **13 分 54 秒**、P95 **17 分 21 秒**，具备明确优化必要性；摘要未提供优化后结果，不能量化收益 |
| [#6679 流式回复时固定提示词阅读位置](https://github.com/HKUDS/nanobot/pull/6679) | 将新提交的提示词移至阅读区域顶部，让回答在下方持续展开 | 减少流式生成时用户反复回滚查找问题的负担 |

**整体判断：**本轮工作偏向交互打磨和工程效率提升，而非新增大型能力。上述 PR 是否已进入主分支、何时可用，仍需核对合并与发布记录。

## 3. 社区热点

**当前无法可靠评选“评论最多”的话题：**唯一 Issue 为 0 评论、0 👍；所有 PR 的评论字段均为 `undefined`，不能按 0 处理，所列 PR 的 👍 均为 0。以下按问题影响和关联开发工作筛选，而非按讨论热度排序。

- **会话中的新数据能否真正影响下一次回答。**用户报告导入新报价后模型仍按旧价计算，修复 PR 已明确关联该 Issue。背后诉求是会话记录、模型请求与实际回答保持一致，而不只是“导入成功”。[Issue #6678](https://github.com/HKUDS/nanobot/issues/6678) · [PR #6681](https://github.com/HKUDS/nanobot/pull/6681)
- **MCP 故障是否会拖累正常聊天。**开放 PR 提议隔离服务启动与重试，避免慢服务器阻塞聊天或健康服务器的工具，体现对多工具环境故障隔离的重视。[PR #6680](https://github.com/HKUDS/nanobot/pull/6680)
- **WebUI 日常可用性。**相关工作同时覆盖响应完成状态、工具入口和流式阅读，说明当前开发关注点不仅是功能覆盖，也包括交互的可预测性。[PR #6683](https://github.com/HKUDS/nanobot/pull/6683) · [PR #6685](https://github.com/HKUDS/nanobot/pull/6685) · [PR #6679](https://github.com/HKUDS/nanobot/pull/6679)

## 4. Bug 与稳定性

以下按潜在影响排序，属于分析性分级，不替代维护者官方优先级。

| 严重程度 | 问题与影响 | 修复状态 |
|---|---|---|
| **高：回答数据正确性** | `bot.sessions.ingest()` 导入的新报价存在于会话快照，但通过 Responses API 恢复后未进入下一次请求；案例中两箱商品仍按每箱 $40 计算，返回 **$80 而非 $50** | [Issue #6678](https://github.com/HKUDS/nanobot/issues/6678) 开放；已有开放修复 [#6681](https://github.com/HKUDS/nanobot/pull/6681)，同时涉及已记录的通道通知、Heartbeat 投递等被动历史 |
| **中高：可用性与故障隔离** | 慢或无响应的 MCP 服务可能阻塞普通聊天、拖延健康服务的工具使用 | 开放修复 [#6680](https://github.com/HKUDS/nanobot/pull/6680)：拟在 10 秒后报告启动缓慢、60 秒后取消未完成的启动尝试 |
| **中：部署兼容性** | HTTPS 反向代理配合普通 HTTP Gateway 监听时，配置 `publicWsUrl` 可能导致 SSH 快速配对报 `incompatible_gateway` | 已有开放修复 [#6682](https://github.com/HKUDS/nanobot/pull/6682) |
| **中：前端状态一致性** | 旧轮次已被规范历史确认完成、但新轮次仍运行时，旧轮次的响应状态可能未结清，使界面持续显示活动响应 | 已有开放修复 [#6683](https://github.com/HKUDS/nanobot/pull/6683)，标签为 P2 |

本批数据没有提供新的崩溃报告；这不代表项目不存在其他崩溃问题。

## 5. 功能请求与路线图信号

本日没有独立的新功能请求 Issue，路线图信号主要来自 PR，**尚不构成下一版本承诺**。

- **近期修复候选：会话历史一致性。**[#6681](https://github.com/HKUDS/nanobot/pull/6681) 已对应明确用户案例，若通过审查，有望成为后续版本的重要正确性修复。
- **运行时可靠性：MCP 隔离与 Gateway 职责拆分。**[#6680](https://github.com/HKUDS/nanobot/pull/6680) 处理慢服务影响范围；[#6686](https://github.com/HKUDS/nanobot/pull/6686) 拟统一前台、托管后台及更新器的 Gateway 启动入口，并将健康请求处理、调度任务策略移出启动逻辑。这组工作指向更清晰的运行时边界。
- **远程部署适配。**[#6682](https://github.com/HKUDS/nanobot/pull/6682) 表明项目正在改善 HTTPS 代理环境下的远程配对兼容性。
- **个人助手交互优化。**流式阅读定位与 Apps 默认视图是明确的体验方向，但相关 PR 已关闭，是否会进入下一版本仍需确认。[#6679](https://github.com/HKUDS/nanobot/pull/6679) · [#6685](https://github.com/HKUDS/nanobot/pull/6685)

## 6. 用户反馈摘要

**没有可供提炼的 Issue 评论；以下仅来自 Issue 正文中的直接反馈。**

- **使用场景：**通过 SDK 向既有会话导入更新后的供应商报价，再让智能体继续计算采购金额。[Issue #6678](https://github.com/HKUDS/nanobot/issues/6678)
- **真实痛点：**导入接口与会话快照都显示更新成功，但回答仍依据旧数据。这种“存储已更新、推理未更新”的偏差，比显式报错更难被用户及时发现。[Issue #6678](https://github.com/HKUDS/nanobot/issues/6678)
- **反馈边界：**当前只有一个用户报告，无法判断受影响范围；也没有足够数据总结满意度或普遍不满。修复已进入 PR 阶段，但尚无用户复测确认。[PR #6681](https://github.com/HKUDS/nanobot/pull/6681)

## 7. 待处理积压

**本批数据不足以识别长期未响应事项。**所有条目均创建于 11 月 16—17 日，不能将其称为长期积压。建议维护者重点跟踪：

| 待办 | 建议关注点 |
|---|---|
| [Issue #6678](https://github.com/HKUDS/nanobot/issues/6678) / [PR #6681](https://github.com/HKUDS/nanobot/pull/6681) | 优先验证导入数据能进入下一次 Responses 请求，并在修复可用后邀请报告者复测 |
| [PR #6680](https://github.com/HKUDS/nanobot/pull/6680) | 验证慢 MCP 服务不会阻塞聊天，及工具就绪后下一次模型请求的可用性 |
| [PR #6683](https://github.com/HKUDS/nanobot/pull/6683) | 覆盖旧轮次完成、新轮次运行并存时的前端状态回归 |
| [PR #6686](https://github.com/HKUDS/nanobot/pull/6686) | 重点审查前台、后台及更新器启动路径的一致性，控制重构回归风险 |

**健康度结论：**开发响应积极，唯一新增问题已有对应修复方案；当前主要风险在于正确性修复尚未合入，以及缺少合并状态、测试结果和用户复测数据。后续应以“修复验证并交付”为观察重点，而非仅以 PR 数量衡量进展。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-11-17** ｜ [项目仓库](https://github.com/nousresearch/hermes-agent)

> **数据口径**：过去 24 小时共 50 条 Issue 更新、50 条 PR 更新、2 个 Release；明细仅提供其中 30 条 Issue、20 条 PR。PR 评论数为 `undefined`，且未提供评论正文、唯一一条合并/关闭 PR 的明细，因此下文不将待合并方案视为已交付，也不推断维护者响应时间。

## 1. 今日速览

项目保持**高活跃度，工作重心偏向稳定性修复**：统计窗口内有 50 条 Issue、50 条 PR 更新，但 49 条 PR 仍待合并，不能仅凭提交量判断交付效率。[项目动态](https://github.com/nousresearch/hermes-agent/pulse)

正式版 **v0.23.2** 已于 11 月 16 日发布，发布说明称其汇总了自 v0.23.1 以来约 1,989 个已合并 PR；这是跨版本累计量，**不是今日合并量**。[版本说明](https://github.com/nousresearch/hermes-agent/releases/tag/v0.23.2)

当前风险集中在 **API 可观测性回归、桌面端会话与模型路由、Windows/macOS 运行兼容性，以及无人值守执行的安全边界**；其中错误计费报告和执行策略绕过报告值得优先核查。[计费报告 #156665](https://github.com/nousresearch/hermes-agent/issues/156665) · [执行策略报告 #156677](https://github.com/nousresearch/hermes-agent/issues/156677)

功能侧出现 `/implement`、Telegram 长会话交接和远程密钥存储等方向，但均处于开放 PR 阶段，尚不能认定会进入下一版本。[PR #156782](https://github.com/nousresearch/hermes-agent/pull/156782) · [PR #156781](https://github.com/nousresearch/hermes-agent/pull/156781) · [PR #156779](https://github.com/nousresearch/hermes-agent/pull/156779)

## 2. 版本发布

### v0.23.2：大规模累计变更的稳定版打包

- **发布日期**：2026-11-16。
- **定位**：Patch release，将自 v0.23.1 以来约 1,989 个已合并 PR 汇总为稳定发行版，覆盖 GitHub CLI/安装器、Microsoft Store、Docker 和 Hermes Cloud。
- **更新详情**：当前说明未逐项列出修复和功能；完整整理后的说明计划随 **v0.24** 发布。
- **破坏性变更**：现有说明未声明，但不能据此断言完全不存在兼容性影响。

来源：[v0.23.2 Release](https://github.com/nousresearch/hermes-agent/releases/tag/v0.23.2)

**升级与迁移注意事项：**

1. **API 集成先做回归测试。** 用户报告 v0.23 系列存在工具结果预览为空、子代理事件缺失，以及 API 用户消息被保存为内部通知的问题；尚不能从材料判断 v0.23.2 是否已覆盖修复。[#156792](https://github.com/nousresearch/hermes-agent/issues/156792) · [#156793](https://github.com/nousresearch/hermes-agent/issues/156793) · [#156802](https://github.com/nousresearch/hermes-agent/issues/156802)
2. **桌面群组迁移后检查侧栏清理。** 用户称自 v0.23.1 起经典群组房间不再提供输入框，需要重建为网关托管房间；迁移可完成，但旧条目无法隐藏或删除。[#156778](https://github.com/nousresearch/hermes-agent/issues/156778)
3. **核对 provider/model 配对和实际账单。** 已有 GUI 创建会话携带旧 provider、导致请求走向按量计费服务的报告。[#156665](https://github.com/nousresearch/hermes-agent/issues/156665)

### Canary：v0.23.1+canary.20261116T070005Z

该预发布版本同样于 11 月 16 日发布。提供的说明仅包含部分桌面下载表，**没有足够信息提炼具体变更、破坏性调整或迁移步骤**，不宜与正式版重复计算功能交付。[Canary Release](https://github.com/nousresearch/hermes-agent/releases/tag/v0.23.1%2Bcanary.20261116T070005Z)

## 3. 项目进展

### 已合并/关闭：仅有汇总，无法确认具体成果

统计显示 **1 条 PR 已合并或关闭**，但未提供编号、标题或最终状态。因而无法确认今日究竟交付了什么，也不能把“关闭”直接等同于“合并”。可确认的发行成果是 v0.23.2 发布，但它代表跨版本累计交付。[PR 列表](https://github.com/nousresearch/hermes-agent/pulls) · [v0.23.2](https://github.com/nousresearch/hermes-agent/releases/tag/v0.23.2)

### 待合并进展：稳定性修复覆盖面较广

| 方向 | 开放 PR 所推进的工作 | 状态 |
|---|---|---|
| 网关与调度 | 9 项启动/停止、数据库写锁、启动恢复认领与 cron 记账修复；作者称各自配有回归测试。[#156799](https://github.com/nousresearch/hermes-agent/pull/156799) | 待合并 |
| 桌面并发体验 | 手动压缩一个会话时，不再阻塞同一 Desktop socket 上其他聊天。[#156786](https://github.com/nousresearch/hermes-agent/pull/156786) | 待合并 |
| 工具运行可靠性 | MCP 启动竞态、文件操作、终端输出溢写及 Signal 消息 ID 等五项独立修复。[#156800](https://github.com/nousresearch/hermes-agent/pull/156800) | 待合并 |
| 桌面资源管理 | 释放终端销毁监听器，避免反复开关终端累积回调和告警。[#156801](https://github.com/nousresearch/hermes-agent/pull/156801) | 待合并 |
| 插件边界 | 防止插件工具意外重新启用用户已关闭的核心工具集。[#156804](https://github.com/nousresearch/hermes-agent/pull/156804) | 待合并 |
| 记忆数据质量 | 修复脱敏过程中误学习非密钥、替换范围不当而破坏正常文本的问题。[#156803](https://github.com/nousresearch/hermes-agent/pull/156803) | 待合并 |

**判断**：修复供给活跃，且部分提交明确强调独立回归测试；但当前材料更能证明“修复正在形成”，不足以证明“问题已在发布版消失”。

## 4. 社区热点

> 已展示 Issue 的最高评论数仅为 **3 条**，点赞均为 **0**；属于相对热点，而非大规模争议。PR 评论数缺失，无法进行讨论热度排名。

| 热点 | 讨论量 | 背后诉求 |
|---|---:|---|
| 桌面会话的 `gui` / `local` 来源标签不一致，造成 prompt-cache scope 与亲和键变化。[#156750](https://github.com/nousresearch/hermes-agent/issues/156750) | 3 评论 | 同一会话应有稳定身份，减少缓存失效及潜在额外成本。 |
| `computer_use` 前台回退会打扰用户，要求即使 yolo 模式也审批前台交付。[#156670](https://github.com/nousresearch/hermes-agent/issues/156670) | 3 评论 | 个人助手必须尊重人机共享设备上的操作边界。 |
| GUI provider/model 配对错误，报告称连续 4 天走按量计费 OpenRouter。[#156665](https://github.com/nousresearch/hermes-agent/issues/156665) | 3 评论 | 模型选择不仅是配置问题，也是成本控制与信任问题。 |
| 约 1 秒的后台终端命令也触发独立通知回合与回复。[#156715](https://github.com/nousresearch/hermes-agent/issues/156715) | 2 评论 | 自动化应减少交互噪声，而非把简单任务拆成大量回合。 |
| 无人值守代码执行检查可能提前返回，跳过后续拒绝策略。[#156677](https://github.com/nousresearch/hermes-agent/issues/156677) | 2 评论 | cron、单次查询等无人值守场景需要一致且可验证的安全策略。 |

## 5. Bug 与稳定性

以下按**潜在影响排序**，不替代仓库原有 P2/P3 标签。除特别注明外，“未见 fix PR”仅指本次提供的 PR 明细中未发现。

### 优先核查：安全与费用风险

| 问题 | 影响 | Fix PR |
|---|---|---|
| 无人值守执行检查短路，可能绕过后续 deny 策略，仓库标 P3。[#156677](https://github.com/nousresearch/hermes-agent/issues/156677) | 安全策略执行一致性风险；尚需维护者确认适用范围。 | 未见 |
| GUI 使用旧 provider 配合新模型，报告发生错误计费，仓库标 P3。[#156665](https://github.com/nousresearch/hermes-agent/issues/156665) | 直接经济损失及路由可信度风险。 | 未见 |
| `computer_use` 前台回退干扰用户屏幕，仓库标安全类 P3。[#156670](https://github.com/nousresearch/hermes-agent/issues/156670) | 人机共用环境下的操作授权边界。 | 未见明确对应修复 |

### 高优先级：不可用、挂起及 API 回归

| 问题 | 影响 | Fix PR |
|---|---|---|
| macOS Kanban worker 启动收到整数 fd，引发 TypeError。[#156768](https://github.com/nousresearch/hermes-agent/issues/156768) | 报告称每次调度失败，两次失败后任务自动阻塞。 | 未见 |
| Windows 非 ASCII 用户目录导致 llama-server 参数路径损坏。[#156692](https://github.com/nousresearch/hermes-agent/issues/156692) | 本地模型无法启动，聊天卡在等待 provider。 | 未见 |
| Windows ACP 的 git 检查继承 stdin 管道。[#156777](https://github.com/nousresearch/hermes-agent/issues/156777) | `session/new`、`session/load` 挂起。 | 未见 |
| Windows Startup-folder 网关启动器未处理退出码 75。[#156780](https://github.com/nousresearch/hermes-agent/issues/156780) | 网关退出后不能自动重启。 | 未见 |
| `/v1/runs` 工具结果预览为空、子代理起止事件丢失。[#156792](https://github.com/nousresearch/hermes-agent/issues/156792) · [#156793](https://github.com/nousresearch/hermes-agent/issues/156793) | v0.23 系列回归报告，影响客户端展示与子代理追踪。 | 未见 |
| 混合动态/静态路由网关的 Webhook 执行报 `RuntimeStoreError('not_found')`。[#156703](https://github.com/nousresearch/hermes-agent/issues/156703) | 自动化触发链路失败。 | 未见 |
| Desktop 连接远程网关时缺少主机位置上下文。[#156710](https://github.com/nousresearch/hermes-agent/issues/156710) | localhost 预览和终端定位到错误机器。 | 未见 |

### 中优先级：上下文、性能与资源清理

- **视觉上下文跨回合丢失**：工具载入的图像在下一回合变成 `[screenshot]`；另有 fallback 缓存仅限 agent 实例，导致 `/v1/responses` 重复视觉分析的报告。两者均未见对应修复。[#156788](https://github.com/nousresearch/hermes-agent/issues/156788) · [#156769](https://github.com/nousresearch/hermes-agent/issues/156769)
- **中断与异常退出清理不足**：中断 MoA 后退出可能等待默认最长 900 秒的参考调用；连续无效工具调用终止后，终端或浏览器会话仍存活。未见对应修复。[#156697](https://github.com/nousresearch/hermes-agent/issues/156697) · [#156695](https://github.com/nousresearch/hermes-agent/issues/156695)
- **LM Studio 环境变量密钥未用于探测请求**：已有明确关联 PR，但仍开放；需确认其覆盖探测和元数据请求的实际范围。[Issue #156790](https://github.com/nousresearch/hermes-agent/issues/156790) → [PR #156795](https://github.com/nousresearch/hermes-agent/pull/156795)
- **移动文件后误判目标目录为空**：已有对应开放修复 PR。[Issue #156699](https://github.com/nousresearch/hermes-agent/issues/156699) → [PR #156797](https://github.com/nousresearch/hermes-agent/pull/156797)
- **安装同步反复降级 edge-tts**：可选依赖仍精确固定至 7.2.7，用户称每次 `uv sync` 都撤销可用安装。未见对应修复。[#156767](https://github.com/nousresearch/hermes-agent/issues/156767)

## 6. 功能请求与路线图信号

| 方向 | 当前证据 | 下一版本信号 |
|---|---|---|
| 计划到执行闭环 | `/implement [plan]` 执行最近或指定的已保存计划，覆盖各交互入口。[PR #156782](https://github.com/nousresearch/hermes-agent/pull/156782) | **较强实现信号**，已有具体 PR；尚无合并承诺。 |
| 长会话自主交接 | Telegram topic 中由模型调用 `fresh_session`，在原回合完成后创建带交接内容的新会话。[PR #156781](https://github.com/nousresearch/hermes-agent/pull/156781) | **中等信号**，需重点验证会话状态和交接可靠性。 |
| 远程密钥管理 | 在 connector secrets plane 上提供远程 secret store，于进程启动时应用。[PR #156779](https://github.com/nousresearch/hermes-agent/pull/156779) | **中期架构信号**，依赖两个前置 PR，不宜视为即将独立交付。 |
| Kanban 依赖图 | 请求 CLI 导出与 Dashboard 图形视图。[Issue #156675](https://github.com/nousresearch/hermes-agent/issues/156675) | 仅见需求，未见实现 PR。 |
| 桌面迁移后的整理能力 | 希望隐藏或移除经典群组旧条目。[Issue #156778](https://github.com/nousresearch/hermes-agent/issues/156778) | 面向既有迁移流程的体验补全需求。 |
| 更明确的人机屏幕控制权 | 用户要求前台操作审批；另有 screen authority gate PR，但描述模板未完整填写。[Issue #156670](https://github.com/nousresearch/hermes-agent/issues/156670) · [PR #156789](https://github.com/nousresearch/hermes-agent/pull/156789) | 方向相关，但**不能认定该 PR 已解决该请求**。 |

## 7. 用户反馈摘要

**材料未提供评论正文**，以下仅从 Issue 作者的报告和 PR 描述归纳，不构造用户引语或满意度结论。

- **成本可预测性是重要痛点。** 错误 provider 路由、缓存作用域变化和快速后台命令额外触发回合，分别指向账单、缓存效率与交互成本问题。[#156665](https://github.com/nousresearch/hermes-agent/issues/156665) · [#156750](https://github.com/nousresearch/hermes-agent/issues/156750) · [#156715](https://github.com/nousresearch/hermes-agent/issues/156715)
- **多设备、多网关已是实际使用场景。** 远程网关主机定位错误、跨连接会话混入当前侧栏，表明用户需要可靠的连接隔离与环境上下文。[#156710](https://github.com/nousresearch/hermes-agent/issues/156710) · [#156655](https://github.com/nousresearch/hermes-agent/issues/156655)
- **集成开发者需要完整可观测性。** 工具输出预览和子代理 session ID 不是装饰信息，而是外部客户端展示结果、打开子会话记录的基础。[#156792](https://github.com/nousresearch/hermes-agent/issues/156792) · [#156793](https://github.com/nousresearch/hermes-agent/issues/156793)
- **已有局部正向反馈，但不能泛化。** 群组迁移报告明确表示迁移本身可用，不满主要在迁移后的旧条目清理；尚无足够材料评价整体满意度。[#156778](https://github.com/nousresearch/hermes-agent/issues/156778)

## 8. 待处理积压

**无法识别真正“长期未响应”的工单**：展示的 Issue 基本创建于 11 月 16—17 日，且缺少维护者回复时间。49 条待合并 PR 也只是本统计窗口中的更新项，不代表仓库全部积压。[Issue 列表](https://github.com/nousresearch/hermes-agent/issues) · [PR 列表](https://github.com/nousresearch/hermes-agent/pulls)

建议维护者重点跟踪以下“待验证/待交付”队列：

1. **先完成安全与费用分诊**：确认执行策略绕过和错误计费的复现范围，给出缓解方案及修复归属。[#156677](https://github.com/nousresearch/hermes-agent/issues/156677) · [#156665](https://github.com/nousresearch/hermes-agent/issues/156665)
2. **集中处理 v0.23 API 回归**：将事件缺失、结果预览为空、消息类型错误纳入同一轮兼容性验证。[#156793](https://github.com/nousresearch/hermes-agent/issues/156793) · [#156792](https://github.com/nousresearch/hermes-agent/issues/156792) · [#156802](https://github.com/nousresearch/hermes-agent/issues/156802)
3. **关注长期缺陷的近期修复落地**：飞书评论机器人 PR 作者称相关工具自 8 月起不可用，值得验证修复并明确发布版本；这是长期缺陷线索，不等于该 PR 长期无人响应。[PR #156785](https://github.com/nousresearch/hermes-agent/pull/156785)
4. **补充稳定版可审计说明**：v0.23.2 汇总大量变更、详细说明延后至 v0.24，建议先提供已知问题、兼容性提示和升级验证清单。[v0.23.2 Release](https://github.com/nousresearch/hermes-agent/releases/tag/v0.23.2)

---

**健康度结论：开发活力强，发布后稳定性与交付闭环仍需重点观察。** 当前最有价值的下一步不是增加功能数量，而是将已有修复合并、验证并发布，同时对安全、费用和 API 回归建立清晰的处理状态。现有数据不足以判断长期维护响应速度或缺陷净增长趋势。[项目仓库](https://github.com/nousresearch/hermes-agent)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报
**日期：2026-11-17｜统计范围：所提供的过去 24 小时数据**

> **数据说明**：项目入口标注为 `qwibitai/nanoclaw`，但条目指向 `nanocoai/nanoclaw`，下文链接按条目仓库生成。部分记录时间为 11 月 16 日，仍按本次统计窗口纳入。PR 的 `CLOSED` 状态不能单独证明已合并；评论正文、PR 评论数及完整发布说明均未提供，相关结论将明确区分事实与推断。

## 1. 今日速览

过去 24 小时共更新 **14 条 Issue、22 条 PR**，其中 **17 条 PR 待合并、5 条已合并或关闭**，并发布了第四个 11 月测试版 [v2026.11.0-beta.4](https://github.com/nanocoai/nanoclaw/releases/tag/v2026.11.0-beta.4)，开发活跃度较高。工作重心偏向安装、升级、渠道消息可靠性与容器生命周期等稳定性建设，而非大规模功能扩张。Portal 连接、登录重试、技能更新错误提示均出现了报告与对应修复 PR，但这些修复目前仍待合并。整体呈现**“发布节奏活跃、缺陷发现充分，但修复尚未全部落地”**的状态；本窗口 Issue 关闭数为零，仍需关注修复验证与闭环速度。

## 2. 版本发布

### [v2026.11.0-beta.4](https://github.com/nanocoai/nanoclaw/releases/tag/v2026.11.0-beta.4)

- **版本定位**：2026.11.0 的第四个 Beta，官方明确定位为早期测试构建，仍可能存在不完善之处。
- **版本规划调整**：11 月版本取代原计划的 **2026.10.1**；后者不会成为稳定版，其两个 RC 保留发布，其中内容纳入本次版本说明。
- **变更规模**：[发布 PR #4423](https://github.com/nanocoai/nanoclaw/pull/4423) 说明，相对 beta.3，`main` 有 **30 条 PR**，另有 `channels` 上 **5 条面向用户的 PR**。这些是发布汇总范围，不等于本日报窗口内的合并量。
- **破坏性变更**：提供的 Release 摘要被截断，**无法确认是否存在破坏性变更，也无法完整列出本版功能与修复**。

**升级注意事项：**
1. 不应继续等待 2026.10.1 稳定版；生产环境应结合完整 Release Notes 决定是否进入 Beta。
2. 已有用户在 beta.4 报告技能刷新失败时错误信息不足，排障时需留意事务状态中的详细错误；增强提示的 [PR #4430](https://github.com/nanocoai/nanoclaw/pull/4430) 尚未合并。
3. 使用自定义附加软件包镜像的群组，应核查更新后实际运行的镜像是否变化；自动重建修复见待合并的 [PR #4431](https://github.com/nanocoai/nanoclaw/pull/4431)。

## 3. 项目进展

以下为本窗口值得关注的 **已关闭 PR**。由于缺少 `merged_at`，不能据此认定代码已进入主分支或发布版本。

| PR | 推进内容 | 状态与意义 |
|---|---|---|
| [#4423：发布 beta.4](https://github.com/nanocoai/nanoclaw/pull/4423) | 更新版本号并整理发布内容 | PR 已关闭，且对应 Release 已发布，版本交付得到确认 |
| [#4420：WhatsApp 配对状态识别](https://github.com/nanocoai/nanoclaw/pull/4420) | 通过 `creds.json` 中的 `account` 区分完成配对与仅申请配对码 | 针对“未完成却被判定已连接”的安装问题；是否合并需核实 |
| [#4403：安装脚本错误诊断](https://github.com/nanocoai/nanoclaw/pull/4403) | 报告 npm 调用失败，并在迁移时从 `~/.local/bin` 查找 pnpm | 减少安装静默退出与工具路径识别失败；是否合并需核实 |
| [#4404：Discord 依赖修复指引](https://github.com/nanocoai/nanoclaw/pull/4404) | 将较新适配器回退到带补丁的 4.41.1，而非删除补丁注册 | 修正可能导致适配器无法构建的故障排查建议；是否合并需核实 |

**进展判断**：今天最明确的交付成果是新 Beta 发布。其余重要变化围绕“能安装、能配对、能诊断”展开，属于基础体验加固；多项关键可靠性修复仍在评审阶段，不能将待合并 PR 计作已完成成果。

## 4. 社区热点

当前数据不支持严格的“讨论热度排名”：所有 Issue 均为 **0 个 👍**，最高评论数仅为 **1**，PR 评论数则缺失。以下是有限互动下值得关注的议题：

- **Portal 连接失败被误报为超时**：[Issue #4427](https://github.com/nanocoai/nanoclaw/issues/4427)，1 条评论。用户完成登录后仍无法关联 Portal，日志反复出现 `handshake_timeout`；对应 [PR #4433](https://github.com/nanocoai/nanoclaw/pull/4433) 尝试将被拒绝的连接立即记为 `dial_failed`。诉求不仅是连接成功，还包括准确定位失败原因。
- **登录码过期后无法有效重试**：[Issue #4426](https://github.com/nanocoai/nanoclaw/issues/4426)，1 条评论。重新运行 setup 却跳过必要问题，说明恢复流程与界面提示不一致；已有 [PR #4432](https://github.com/nanocoai/nanoclaw/pull/4432)。
- **无 polkit 环境安装报错**：[Issue #4428](https://github.com/nanocoai/nanoclaw/issues/4428)，1 条评论。反映精简 Linux 主机上的兼容性与安装输出质量问题，当前未见对应 fix PR。
- **模块注册测试依赖导出顺序**：[Issue #4413](https://github.com/nanocoai/nanoclaw/issues/4413)，1 条评论。新增生命周期模块即可触发失败，暴露测试与实现细节耦合，影响扩展维护。

## 5. Bug 与稳定性

以下按潜在影响排序，**为基于摘要的分析优先级，并非项目官方严重度**。未发现足够证据将任何条目定性为严重安全漏洞。

### 高优先级：消息可靠性、接入阻塞与运行恢复

| 问题 | 影响 | Fix PR |
|---|---|---|
| [#4415：WhatsApp 离线/失败发送被标为已送达](https://github.com/nanocoai/nanoclaw/issues/4415) | 内存队列无过期，刷新还可能丢消息；影响消息可信度。报告针对 `channels` 分支，不能直接泛化为所有部署 | 未见 |
| [#4409：复用 OneCLI 网关未写入 API Key](https://github.com/nanocoai/nanoclaw/issues/4409) | 审批客户端发送空 Bearer token，可能阻断审批链路 | 未见 |
| [#4427：Portal 无法连接且错误分类失真](https://github.com/nanocoai/nanoclaw/issues/4427) | 登录后仍无法关联，排障被误导 | [#4433，待合并](https://github.com/nanocoai/nanoclaw/pull/4433)；主要改善拒绝连接的结束与诊断，不能据此认定连接根因已解决 |
| [#4411：启动成功后仍保留崩溃计数](https://github.com/nanocoai/nanoclaw/issues/4411) | 非优雅退出后可能累计旧记录、错误触发启动熔断 | 未见 |
| [#4412：停止或重启遗留 Docker 事件监听进程](https://github.com/nanocoai/nanoclaw/issues/4412) | 每次运行可能遗留一个进程，长期重启形成资源泄漏 | 未见 |

### 中优先级：安装、更新与恢复路径

| 问题 | 影响 | Fix PR |
|---|---|---|
| [#4426：登录失败后 setup 无法重新获取有效流程](https://github.com/nanocoai/nanoclaw/issues/4426) | 登录码过期后，按提示重跑仍无法恢复 | [#4432，待合并](https://github.com/nanocoai/nanoclaw/pull/4432) |
| [#4410：OneCLI 读取失败被当作“没有网关”](https://github.com/nanocoai/nanoclaw/issues/4410) | 错误进入安装分支，混淆读取失败与资源不存在 | 未见 |
| [#4408：网关就绪检查失败仍返回退出码 0](https://github.com/nanocoai/nanoclaw/issues/4408) | 自动化流程可能把失败判为成功 | 未见 |
| [#4414：setup 提交后遗留不匹配的升级标记](https://github.com/nanocoai/nanoclaw/issues/4414) | 升级状态可能陈旧且无提示，增加后续排障难度 | 未见 |
| [#4429：技能刷新失败未显示具体技能与原因](https://github.com/nanocoai/nanoclaw/issues/4429) | beta.4 的更新验证可观测性不足 | [#4430，待合并](https://github.com/nanocoai/nanoclaw/pull/4430) |

### 较低优先级：兼容性与测试维护

- [#4428：缺少 `/usr/bin/pkttyagent`](https://github.com/nanocoai/nanoclaw/issues/4428)：安装过程中出现报错；摘要未证实是否导致安装失败，未见 fix PR。
- [#4413：Portal 注册测试依赖 barrel 模块顺序](https://github.com/nanocoai/nanoclaw/issues/4413)：影响测试稳健性，未见 fix PR。

**其他待合并稳定性修复**：[#4431](https://github.com/nanocoai/nanoclaw/pull/4431) 处理基础 agent 镜像变化后群组镜像未重建；[#4419](https://github.com/nanocoai/nanoclaw/pull/4419) 避免长消息分段重试重复发送已成功片段；[#4406](https://github.com/nanocoai/nanoclaw/pull/4406) 修补技能刷新与相关 CI 缺口。

## 6. 功能请求与路线图信号

| 方向 | 需求与进展 | 下一版本信号 |
|---|---|---|
| WhatsApp 一键审批 | [Issue #4417](https://github.com/nanocoai/nanoclaw/issues/4417) 请求用投票一键回答审批卡，减少手机输入精确命令的负担 | 未见对应实现 PR，尚不能判断纳入时间 |
| WhatsApp 宽容命令解析 | [PR #4416](https://github.com/nanocoai/nanoclaw/pull/4416) 支持命令后附注释及 RTL 标记 | 已有实现提案，比一键审批更接近交付，但仍待合并 |
| 被 @ 的智能体补齐线程上下文 | [PR #4422](https://github.com/nanocoai/nanoclaw/pull/4422) 按 `NANOCLAW_PLATFORM_HISTORY` 显式启用，从平台读取此前未见的线程内容 | 是本批较明确的功能增量，尚无确定发布承诺 |
| Signal 依赖维护 | [Issue #4400](https://github.com/nanocoai/nanoclaw/issues/4400) 请求将 Linux 固定版本从 0.14.9 升至 0.14.10 | 属兼容性维护需求；上游的“三个月”警告不等于当前版本已失效 |

**路线图判断**：近期更可能继续围绕错误诊断、升级一致性和渠道可靠性推进；线程历史补齐是值得关注的能力扩展，但不能将开放 PR 视为已承诺功能。

## 7. 用户反馈摘要

**未提供评论正文，无法真正从评论中提炼观点。** 以下仅依据 Issue 描述归纳，不代表完整社区意见：

- **“按提示操作也无法恢复”**：登录码过期后重跑 setup 无效，暴露恢复路径设计问题。[#4426](https://github.com/nanocoai/nanoclaw/issues/4426)
- **“系统显示成功，但实际没有成功”**：WhatsApp 消息被标记已送达、OneCLI 检查失败却返回成功，削弱用户对状态反馈的信任。[#4415](https://github.com/nanocoai/nanoclaw/issues/4415)、[#4408](https://github.com/nanocoai/nanoclaw/issues/4408)
- **“知道失败，却不知道哪里失败”**：Portal 超时分类与技能更新笼统报错，增加自助排障成本。[#4427](https://github.com/nanocoai/nanoclaw/issues/4427)、[#4429](https://github.com/nanocoai/nanoclaw/issues/4429)
- **移动端操作摩擦明显**：审批命令容易受自动纠正、附言和输入方向影响，用户希望交互更宽容、更少输入。[#4417](https://github.com/nanocoai/nanoclaw/issues/4417)、[#4416](https://github.com/nanocoai/nanoclaw/pull/4416)

数据中没有足够的明确正向反馈，不能据此推导满意度；同样，缺陷报告集中也不等于整体用户不满意。

## 8. 待处理积压

本批条目主要创建于 11 月 16—17 日，**无法识别“长期未响应”事项**；零评论也不能等同于维护者未处理。建议优先关注以下新进入待办的问题：

1. **消息交付闭环**：优先复核 [#4415](https://github.com/nanocoai/nanoclaw/issues/4415)，明确队列持久化、过期策略及“已送达”的定义。
2. **运行生命周期回归测试**：为崩溃计数重置与 Docker 监听进程清理建立验证路径。[#4411](https://github.com/nanocoai/nanoclaw/issues/4411)、[#4412](https://github.com/nanocoai/nanoclaw/issues/4412)
3. **OneCLI 安装错误分支集中治理**：三个问题共同指向状态判断与失败传播不足，宜统一排查而非孤立修补。[#4408](https://github.com/nanocoai/nanoclaw/issues/4408)、[#4409](https://github.com/nanocoai/nanoclaw/issues/4409)、[#4410](https://github.com/nanocoai/nanoclaw/issues/4410)
4. **明确镜像刷新 PR 的替代关系**：[#4402](https://github.com/nanocoai/nanoclaw/pull/4402) 与 [#4425](https://github.com/nanocoai/nanoclaw/pull/4425) 均更新同一稳定版本的加固镜像，应确认是否存在被后续提案取代的情况。
5. **推动报告—修复—验证闭环**：优先验证 [#4430](https://github.com/nanocoai/nanoclaw/pull/4430)、[#4432](https://github.com/nanocoai/nanoclaw/pull/4432)、[#4433](https://github.com/nanocoai/nanoclaw/pull/4433)，并回填关联 Issue 的结果。

**健康度结论**：NanoClaw 当前具有较强的发布与修复活跃度，但仍处 Beta 稳定性收敛阶段。下一步应重点观察关键修复是否合并发布、消息可靠性问题是否获得处理，以及本窗口尚未下降的 Issue 待办能否形成闭环。

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
**日期：2026-11-17**  
**项目：**[netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)  
**统计范围：**所提供的过去 24 小时 GitHub 更新数据。

> **数据口径：**PR 数据仅标注 `OPEN/CLOSED`，无法确认已关闭 PR 是否合并；PR 评论数为 `undefined`，不能视为零评论。Release 正文被截断，以下仅分析可见内容。

## 1. 今日速览

过去 24 小时，项目有 **1 条 Issue、13 条 PR 更新及 1 个新版本**，开发活跃度较高，工作重点集中在桌面交互、多 Agent 生命周期、OpenClaw 集成和浏览器稳定性。[查看仓库](https://github.com/netease-youdao/LobsterAI)

新版本 **2026.11.16** 带来消息编辑与版本历史、朗读、任务全文搜索，以及最高 1M tokens 的可选上下文窗口，体现出个人助手长任务与日常交互体验的持续增强。[版本发布](https://github.com/netease-youdao/LobsterAI/releases/tag/2026.11.16)

当前 **9 条 PR 待合并、4 条 PR 已关闭**；关闭项涉及 Agent 创建/删除、PPT 界面和浏览器兼容性，但仅凭本批数据不能确认其合并或发布状态。[PR 列表](https://github.com/netease-youdao/LobsterAI/pulls)

最值得关注的是 `localfile://` 缺少目录白名单的安全边界问题：已有对应修复 PR，但仍处于开放状态。总体看，项目开发响应积极，安全修复落地和集成回归验证是近期健康度的关键观察点。[Issue #3096](https://github.com/netease-youdao/LobsterAI/issues/3096) · [PR #3103](https://github.com/netease-youdao/LobsterAI/pull/3103)

## 2. 版本发布

### [LobsterAI 2026.11.16](https://github.com/netease-youdao/LobsterAI/releases/tag/2026.11.16)

可见发布说明确认了以下更新：

| 更新 | 对用户的意义 |
|---|---|
| 消息编辑与版本历史切换 | 支持修改输入并回看不同版本 |
| 消息内联朗读 | 增加语音消费内容的方式 |
| 任务全文搜索 | 提升历史任务与信息查找效率 |
| 可选上下文窗口，最高 1M tokens | 为长文档、长会话任务提供更大的上下文配置空间 |
| 启动提速、桌面伴侣体验优化 | 改善启动等待及桌面使用流畅度 |

**破坏性变更与迁移注意事项：**
- 提供的发布说明未显示破坏性变更或迁移要求，但正文不完整，不能据此认定“无破坏性变更”。
- 1M tokens 是可选上下文配置上限；实际可用范围仍需核对所用模型和服务商能力。
- 不应将本日报中的开放修复 PR 视为已包含在该版本中，尤其是本地文件协议修复。[完整发布页](https://github.com/netease-youdao/LobsterAI/releases/tag/2026.11.16)

## 3. 项目进展

以下为本窗口内的重要**已关闭 PR**，不等同于已确认合并：

| PR | 推进内容 | 进展意义 |
|---|---|---|
| [#3098 Agent 创建与删除生命周期修复](https://github.com/netease-youdao/LobsterAI/pull/3098) | 统一数据库句柄与 lease 管理；手动创建默认使用独立 UUID；增加异常记录 | 针对 Agent 删除时句柄仍被占用、已删除身份冲突等核心生命周期问题 |
| [#3095 浏览器 UA 与 CDP 挂接修复](https://github.com/netease-youdao/LobsterAI/pull/3095) | 将 Chrome UA 覆盖限定到 Google 账户域，避免全局 UA 与指纹不匹配 | 缓解 Cloudflare 验证循环等浏览器兼容性问题 |
| [#3097 PPT 示例与封面布局优化](https://github.com/netease-youdao/LobsterAI/pull/3097) | 优化示例说明、预览/表单分区、小窗口缩放与键盘焦点 | 改善 PPT 制作流程的可理解性与小屏体验；不改变生成、校验和导出流程 |
| [#3099 同步至 release/2026.11.17](https://github.com/netease-youdao/LobsterAI/pull/3099) | 描述包含 4 个提交、13 个文件变更，并称独立 worktree 试合并无冲突 | 显示维护者正在进行发布分支整合；不能据此认定 2026.11.17 已发布 |

**整体判断：**本轮进展以“稳定已有能力”为主，而非大规模新增功能。Agent 生命周期与浏览器兼容性具有较高基础价值；实际交付程度仍需结合合并记录、CI 与后续 Release 确认。

## 4. 社区热点

### 本地文件访问边界是当前最明确的讨论焦点

[Issue #3096](https://github.com/netease-youdao/LobsterAI/issues/3096) 是本批唯一 Issue，已有 **2 条评论、0 个 👍**。报告指出，`localfile://` 会解析并提供任意绝对路径文件，没有允许访问的根目录白名单。

背后的诉求是：**在保留本地媒体和 Artifact 展示能力的同时，明确 renderer 到本地文件系统之间的权限边界**。对应 [PR #3103](https://github.com/netease-youdao/LobsterAI/pull/3103) 已提出沙箱化本地媒体访问方案，显示问题已有开发响应，但尚未完成关闭。

### PR 热度暂不能可靠排序

13 条 PR 的评论数均缺失，所列点赞均为 0，因此不能按讨论量评选“最热 PR”。从工作集中度看，OpenClaw、浏览器与多 Agent 稳定性是主要开发主题，但这不等同于社区讨论热度。[PR 列表](https://github.com/netease-youdao/LobsterAI/pulls)

## 5. Bug 与稳定性

以下按潜在影响排序，**不是官方漏洞评级**；除 #3096 外，问题主要来自修复 PR 的描述。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **高：安全边界** | `localfile://` 缺少根目录白名单，可能展示不应暴露的本地文件。修复 PR 描述称 Electron 43 测试中，CSP/CORS 对直接读取字节存在限制，因此不宜直接断言为任意文件内容窃取 | [Issue #3096](https://github.com/netease-youdao/LobsterAI/issues/3096) 开放；[fix #3103](https://github.com/netease-youdao/LobsterAI/pull/3103) 开放 |
| **高：核心生命周期** | 数据库句柄缓存分离可能导致 Agent 删除受阻；按名称生成身份可能与已删除 Agent 的保留身份冲突 | [fix #3098](https://github.com/netease-youdao/LobsterAI/pull/3098) 已关闭，合并状态待核实 |
| **中高：插件安装阻断** | Discord 插件解包超过 120 秒后，安装流程停止，导致后续多个渠道插件缺失 | [fix #3102](https://github.com/netease-youdao/LobsterAI/pull/3102) 开放，拟跨平台延长超时 |
| **中高：模型目录异常** | 索引最大 token 数时误调用异步 provider builder，参数不匹配触发异常 | [fix #3101](https://github.com/netease-youdao/LobsterAI/pull/3101) 开放 |
| **中：浏览器连续性** | 空闲清理关闭用户已登录的应用内标签页；共享浏览器操作边界需要收紧 | [fix #3100](https://github.com/netease-youdao/LobsterAI/pull/3100) 开放 |
| **中：网站访问兼容性** | 全局 UA 覆盖造成指纹不匹配，可能引发 Cloudflare 验证循环 | [fix #3095](https://github.com/netease-youdao/LobsterAI/pull/3095) 已关闭，合并状态待核实 |
| **中：多 Agent 状态隔离** | 系统 Agent 事件生成多余本地会话；dreaming 状态和日记未明确绑定 Agent | [fix #3104](https://github.com/netease-youdao/LobsterAI/pull/3104)、[fix #3105](https://github.com/netease-youdao/LobsterAI/pull/3105) 均开放 |

本批数据未提供独立崩溃日志或明确的版本回归区间，暂不能判断这些问题是否由最新版本引入。

## 6. 功能请求与路线图信号

本批没有独立的功能请求 Issue；以下是从开放 PR 推断的近期方向，**不是已承诺路线图**：

- **会话导航与输入复用：**[#3107](https://github.com/netease-youdao/LobsterAI/pull/3107) 增加会话前进/后退、触控板横向滑动、鼠标侧键导航及提示词历史召回，指向更高效的多任务切换。
- **桌面可读性与操作一致性：**[#3106](https://github.com/netease-youdao/LobsterAI/pull/3106) 增加主窗口缩放、快捷键、Ctrl/Cmd + 滚轮及缩放指示器，有望改善不同屏幕上的使用体验。
- **多 Agent 能力继续加固：**[#3105](https://github.com/netease-youdao/LobsterAI/pull/3105) 明确记忆状态与日记的 Agent 归属，结合生命周期修复，显示多 Agent 隔离与管理仍是近期重点。
- **贡献流程与 AI 编程协作规范化：**[#3108](https://github.com/netease-youdao/LobsterAI/pull/3108) 将根 `AGENTS.md` 从 542 行精简到 199 行，并按目录拆分指导文档；这是工程可维护性投入，不是终端用户功能。

这些已有实现 PR 的能力具备进入后续版本的候选基础，但没有证据确认具体版本或合并时间。

## 7. 用户反馈摘要

**可直接确认的反馈：**唯一 Issue 报告者关注本地文件访问缺少明确授权范围，反映了对桌面 AI 助手文件权限与信任边界的担忧。[Issue #3096](https://github.com/netease-youdao/LobsterAI/issues/3096)

**评论提炼限制：**数据未包含该 Issue 的两条评论正文，因此不能还原评论参与者的真实场景、满意度或维护者答复，也不能编造用户原话。

修复 PR 则提供了以下**间接痛点线索**，不应当作用户评论结论：
- 已登录的浏览器标签页被清理，影响任务连续性。[#3100](https://github.com/netease-youdao/LobsterAI/pull/3100)
- 单个插件超时导致后续渠道插件缺失，放大安装故障影响。[#3102](https://github.com/netease-youdao/LobsterAI/pull/3102)
- PPT 小窗口预览挤占缩略图区域，流程视觉层级不够清楚。[#3097](https://github.com/netease-youdao/LobsterAI/pull/3097)

## 8. 待处理积压

**无法识别长期未响应项：**本批条目均为 11 月 16—17 日创建或更新，缺少更早的全量列表和响应时间，不能把当前开放项定义为长期积压。

建议维护者优先跟进：

1. **安全修复审查与发布闭环：**明确允许目录、媒体类型及访问边界的测试结果，并在修复发布后关联关闭问题。[#3096](https://github.com/netease-youdao/LobsterAI/issues/3096) · [#3103](https://github.com/netease-youdao/LobsterAI/pull/3103)
2. **集成稳定性修复验证：**重点核查插件超时后的安装完整性、模型目录异常处理和浏览器标签页保留行为。[#3102](https://github.com/netease-youdao/LobsterAI/pull/3102) · [#3101](https://github.com/netease-youdao/LobsterAI/pull/3101) · [#3100](https://github.com/netease-youdao/LobsterAI/pull/3100)
3. **多 Agent 回归测试：**覆盖创建、执行任务、删除、再次创建，以及系统 Agent 会话和记忆日记归属。[#3098](https://github.com/netease-youdao/LobsterAI/pull/3098) · [#3104](https://github.com/netease-youdao/LobsterAI/pull/3104) · [#3105](https://github.com/netease-youdao/LobsterAI/pull/3105)
4. **澄清交付状态：**核实 4 条已关闭 PR 的合并结果，并在发布说明中区分“已发布、已合并、待合并”，避免用户误判修复可用性。[#3099](https://github.com/netease-youdao/LobsterAI/pull/3099) · [发布页](https://github.com/netease-youdao/LobsterAI/releases)

**健康度结论：**LobsterAI 当前呈现出较高开发活跃度和对稳定性问题的积极响应；但安全问题尚未闭环、多个基础修复仍待合并，且讨论与 CI 数据不足，暂不能仅凭更新数量认定整体稳定性已经改善。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

# TinyClaw 项目动态日报
**日期：2026-11-17｜仓库：[TinyAGI/tinyagi](https://github.com/TinyAGI/tinyagi)**

## 1. 今日速览
过去 24 小时，项目仅有 **1 条 PR 更新**，无 Issue 更新、无 PR 合并或关闭，也无新版本发布，整体处于**低活跃状态**。今日唯一变动是文档 PR [#297](https://github.com/TinyAGI/tinyagi/pull/297)，旨在补充研究员向写作者交接公开资料来源的团队协作指南。该 PR 仍待合并，暂未形成已落地的功能或修复。当前数据未显示新增稳定性风险，但也不足以据此判断项目整体健康度或维护响应效率。

## 2. 项目进展
### 文档改进待审：公开证据交接指南
- **PR：**[#297 — docs(teams): add optional public evidence handoff guide](https://github.com/TinyAGI/tinyagi/pull/297)
- **作者与状态：**georgeatparallel；今日创建并更新，当前为 **OPEN**。
- **内容：**说明研究员如何查找公开 Python 文档，并通过 TinyAGI **现有团队交接机制**，将原始 URL 和简短摘录传递给写作者。
- **推进价值：**补足现有 researcher 示例对资料查找及来源交接说明不足的问题，有望提高多智能体协作结果的可追溯性和可核验性。
- **落地程度：**属于待审文档改进，不代表新增检索能力或执行机制；今日无已合并/关闭的重要 PR，尚无可确认的代码层面交付。

## 3. 社区热点
### 唯一可观察议题：研究资料如何可靠交给写作者
[#297](https://github.com/TinyAGI/tinyagi/pull/297) 聚焦“研究员查资料—写作者使用资料”的衔接，反映出多智能体工作流对**来源透明、引用准确和交接规范**的需求。

不过，该 PR 的 👍 为 **0**，评论字段为 `undefined`，无法确认实际评论数。因此只能将其列为今日唯一活跃议题，不能据此认定为高热度讨论或广泛社区共识。

## 4. Bug 与稳定性
今日提供的数据中，**未出现新增或更新的 Bug、崩溃、回归报告，也没有对应 fix PR**。唯一更新的 [#297](https://github.com/TinyAGI/tinyagi/pull/297) 属于文档改进，不是运行时故障修复。

这一结果仅表示本次观察窗口内未见相关报告，不等于项目不存在存量问题。

## 5. 功能请求与路线图信号
- **信号：完善团队协作的证据交接规范。**[#297](https://github.com/TinyAGI/tinyagi/pull/297) 提议用原始链接和短摘录补强 researcher → writer 的信息传递，方向偏向使用指南与工作流清晰度，而非新底层能力。
- **下一版本判断：**如果获合并，该改进可能随后续仓库文档更新对用户可见；当前没有合并记录、版本归属或维护者承诺，不能确认会进入下一版本。
- 今日无其他可识别的新功能请求。

## 6. 用户反馈摘要
今日无 Issue 更新，因而**没有可供提炼的 Issues 评论反馈**。从 [#297](https://github.com/TinyAGI/tinyagi/pull/297) 的提交说明中，仅能识别贡献者指出的一项文档缺口：

> 现有 researcher 示例未充分解释如何查找公开文档，并将可核验的来源交接给 writer。

对应场景是多智能体协作撰写需要参考 Python 官方或其他公开文档的内容。该信息不能替代真实用户评论，也不足以判断用户整体满意度。

## 7. 待处理积压
- **待审事项：**[#297](https://github.com/TinyAGI/tinyagi/pull/297) 可重点审阅交接示例是否清晰、链接与摘录的使用方式是否准确，以及是否明确其为可选流程。
- **长期积压：**本次未提供历史 Issue/PR 的等待时长或响应记录，无法识别长期未响应的重要条目。#297 为今日新建，不应列为长期积压。

**综合判断：**今日属于低变动、文档补强的一天。项目出现了改善多智能体证据交接体验的积极信号，但尚无合并或发布成果；维护健康度仍需结合后续审阅响应和更长时间窗口观察。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报｜2026-11-17

> **数据口径**：基于所提供的过去 24 小时更新记录。项目名称沿用 CoPaw，条目链接按数据中的 `agentscope-ai/QwenPaw` 仓库生成。PR 的 `CLOSED` 状态不等于已合并；本日报不将其直接视为已交付。

## 1. 今日速览

过去 24 小时共记录 **9 条 Issue 更新、11 条 PR 更新**，其中仍开放的 Issue 为 7 条、PR 为 8 条，项目保持较高开发活跃度。工作重点集中在**运行时初始化、Windows 兼容性、多工作区技能回滚及媒体处理可靠性**，稳定性建设明显多于新增功能。邮件草稿功能已形成“需求 → 实现 PR”的快速响应，但钉钉会话隔离、模型额度耗尽后无法切换备用模型等问题仍需优先核实。今日无新版本发布，且 3 条关闭 PR 均缺少明确合并信息，因此应将当前状态理解为**修复方案持续积累，实际交付仍待确认**。  
[项目仓库](https://github.com/agentscope-ai/CoPaw) · [PR 列表](https://github.com/agentscope-ai/QwenPaw/pulls)

## 2. 项目进展

### 今日关闭的重要 PR

| PR | 涉及改进 | 状态与进展判断 |
|---|---|---|
| [#8772：加固微信投递并防止 cron 重载死锁](https://github.com/agentscope-ai/QwenPaw/pull/8772) | 涉及渠道消息投递和定时任务重载，直接关系无人值守运行可靠性 | 已关闭；摘要为模板内容，无法确认具体实现及是否合并 |
| [#8767：兼容企业微信分块上传的无响应体成功确认](https://github.com/agentscope-ai/QwenPaw/pull/8767) | 针对上传成功但响应体为空的兼容性问题，关联 #8760 | 已关闭；是否进入主分支待确认 |
| [#8783：Windows 下按 UTF-8 读取 Harness 迁移测试配置](https://github.com/agentscope-ai/QwenPaw/pull/8783) | 改善跨平台测试与迁移配置读取兼容性 | 已关闭；不能据此认定修复已交付 |

**整体推进判断**：上述关闭项覆盖渠道与测试基础设施，但无法量化为“已上线修复”。更明确的进展是多项开放 PR 已提交具体方案，包括[运行时就绪检查 #8770](https://github.com/agentscope-ai/QwenPaw/pull/8770)、[技能回滚保护 #8784](https://github.com/agentscope-ai/QwenPaw/pull/8784)和[媒体预算约束 #8785](https://github.com/agentscope-ai/QwenPaw/pull/8785)。

## 3. 社区热点

> Issue 评论量仅为 1–2 条，全部条目 👍 为 0；PR 评论数缺失，不能据此进行讨论热度排名。以下是相对活跃或业务影响较大的议题，而非高热度共识。

- **钉钉单聊会话 ID 冲突：2 条评论，仍开放。**  
  用户报告同一组织内单聊的 `conversationId` 尾部相同，而系统仅取最后 8 位生成会话 ID。诉求不只是 ID 唯一性，而是企业多用户场景的会话隔离；若复现，可能造成上下文串用，应优先排查。  
  [Issue #8771](https://github.com/agentscope-ai/QwenPaw/issues/8771)

- **历史数据库清理后文件不缩小：2 条评论，已标记 invalid 并关闭。**  
  报告关注保留策略执行 `DELETE` 后，磁盘文件仍维持历史高位大小。其背后是长期部署的磁盘容量预期问题；现有摘要不含关闭理由，不能判断是配置误解、设计行为还是其他原因。  
  [Issue #8773](https://github.com/agentscope-ai/QwenPaw/issues/8773)

- **邮件“只存草稿、不发送”：需求与 PR 同日出现。**  
  这反映出用户希望把“AI 起草”和“对外发送”分开，让个人助手进入可审核、可控的邮件工作流。实现 PR 已提出通过 IMAP APPEND 写入草稿箱，不走 SMTP 发送。  
  [Issue #8780](https://github.com/agentscope-ai/QwenPaw/issues/8780) · [PR #8781](https://github.com/agentscope-ai/QwenPaw/pull/8781)

## 4. Bug 与稳定性

以下按**潜在影响**排序，并非维护者已确认的严重级别。“未见 fix PR”仅指本次提供的数据中未出现。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **高** | **钉钉单聊会话冲突**：同组织用户可能映射至相同 session，存在上下文隔离风险；尚无数据证明已发生信息泄露。 | Issue 开放；未见 fix PR。[#8771](https://github.com/agentscope-ai/QwenPaw/issues/8771) |
| **高** | **运行时未完成启动便接收聊天**：请求返回 HTTP 200，但 Agent 使用未完整初始化的工作区，可能在首次模型调用前挂起，缺少错误和超时反馈。 | 修复 PR 开放，拟在后台启动完成前拒绝聊天。[#8770](https://github.com/agentscope-ai/QwenPaw/pull/8770) |
| **高** | **多工作区技能回滚不完整**：某个工作区恢复失败可能中断后续恢复，存在技能丢失或长时间等待风险。 | 修复 PR 开放，拟保留备份直至所有工作区完成恢复。[#8784](https://github.com/agentscope-ai/QwenPaw/pull/8784) |
| **高** | **额度耗尽无法触发模型降级**：部分供应商返回 HTTP 400 + `quota exceeded`，被分类为不可 fallback 的 `bad_request`，最终呈现内部错误。 | Issue 开放；未见 fix PR。[#8776](https://github.com/agentscope-ai/QwenPaw/issues/8776) |
| **中** | **Windows 升级文件占用**：外部进程反复调用 CLI 版本查询，可能在安装器清理进程后重新加载 Python 扩展，导致写入失败。 | 修复 PR 开放。[#8769](https://github.com/agentscope-ai/QwenPaw/pull/8769) |
| **中** | **Windows 记忆标签接口返回 503**：当前固定依赖未包含旧 Windows 路径规范化修复，导致索引无法重建。 | PR 拟将 `reme-ai` 从 0.4.2.0 升至 0.4.2.3，尚未合并。[#8786](https://github.com/agentscope-ai/QwenPaw/pull/8786) |
| **中** | **Creator 远程素材导入失败后无重试入口**：临时故障消失后仍可能持续出现预览 404。 | Issue 开放；未见 fix PR。[#8779](https://github.com/agentscope-ai/QwenPaw/issues/8779) |
| **中** | **Creator 引用图片约 24 小时后失效**：继续使用过期签名 URL，未回退至可用的本地文件 Base64 路径。 | Issue 开放；未见 fix PR。[#8778](https://github.com/agentscope-ai/QwenPaw/issues/8778) |
| **中** | **媒体限制检查不完整**：只检查图片最长边，未充分落实独立字节预算及模型媒体能力限制。 | 修复 PR 开放。[#8785](https://github.com/agentscope-ai/QwenPaw/pull/8785) |
| **中** | **本地附件路径包含 `#` 时被截断**：字符被 URI 解析为 fragment，影响图片和文件解析。 | 修复 PR 开放，拟编码为 `%23`。[#8768](https://github.com/agentscope-ai/QwenPaw/pull/8768) |
| **低** | **React 19 下数据源连接测试缺少提示**：操作完成却没有成功或超时 toast，用户难以判断结果。 | 修复 PR 开放。[#8782](https://github.com/agentscope-ai/QwenPaw/pull/8782) |

## 5. 功能请求与路线图信号

- **邮件草稿：最接近候选交付的新功能。**  
  已有开放 PR，范围明确：写入 Drafts 文件夹、设置 `\Draft` 标志，不发送邮件。相比纯需求讨论，更有可能进入后续版本，但仍取决于评审、测试和合并。  
  [Issue #8780](https://github.com/agentscope-ai/QwenPaw/issues/8780) · [PR #8781](https://github.com/agentscope-ai/QwenPaw/pull/8781)

- **工具 Hook：企业身份与权限上下文成为需求重点。**  
  用户在企业 AI SaaS 场景中通过 mcporte 调用 MCP，希望服务识别当前真实用户，以支持按用户区分数据访问。当前只有功能请求，未见对应实现 PR。  
  [Issue #8777](https://github.com/agentscope-ai/QwenPaw/issues/8777)

- **运行中即时引导：从“排队聊天”走向可交互长任务。**  
  用户希望 Agent 执行过程中立即接收补充或纠偏指令，而非等待当前轮结束。作者称已有本地实现并寻求设计反馈，但尚无所列 PR，不能视为已进入发布计划。  
  [Issue #8774](https://github.com/agentscope-ai/QwenPaw/issues/8774)

## 6. 用户反馈摘要

**资料限制**：输入未提供评论正文，以下提炼自 Issue 描述，不能代表评论区共识，也无法可靠评估用户满意度。

- **企业用户重视隔离与身份传递。** 钉钉会话冲突和工具 Hook 需求共同说明，项目正在承受多用户服务场景对会话边界、用户身份及数据权限的要求。  
  [#8771](https://github.com/agentscope-ai/QwenPaw/issues/8771) · [#8777](https://github.com/agentscope-ai/QwenPaw/issues/8777)

- **长期使用需要失败后的恢复能力。** Creator 两项报告来自 Windows Server 环境，痛点集中在临时失败无法重试、历史素材链接过期后不能自动恢复。  
  [#8779](https://github.com/agentscope-ai/QwenPaw/issues/8779) · [#8778](https://github.com/agentscope-ai/QwenPaw/issues/8778)

- **用户希望在自动化中保留控制权。** 邮件草稿解决发送前审核，mid-turn steer 解决长任务执行中纠偏，二者均指向“可监督的助手”，而非只能等待结果的自动化。  
  [#8780](https://github.com/agentscope-ai/QwenPaw/issues/8780) · [#8774](https://github.com/agentscope-ai/QwenPaw/issues/8774)

## 7. 待处理积压与维护建议

本批条目均创建于 **11 月 16–17 日**，不足以认定存在“长期未响应”积压；评论数也无法说明维护者是否已回应。建议关注以下待办：

1. **优先完成高影响问题分诊**：核实钉钉会话冲突的影响范围，为额度错误分类补充不同供应商返回格式的测试。  
   [#8771](https://github.com/agentscope-ai/QwenPaw/issues/8771) · [#8776](https://github.com/agentscope-ai/QwenPaw/issues/8776)

2. **优先评审高风险修复 PR**：启动阶段挂起与技能回滚分别影响服务可用性和工作区完整性，应重点验证异常路径，而不只验证正常流程。  
   [#8770](https://github.com/agentscope-ai/QwenPaw/pull/8770) · [#8784](https://github.com/agentscope-ai/QwenPaw/pull/8784)

3. **为 Creator 问题明确负责人和恢复方案**：分别补齐失败任务重试与签名 URL 失效后的回退路径，避免临时故障演变成持续不可用。  
   [#8779](https://github.com/agentscope-ai/QwenPaw/issues/8779) · [#8778](https://github.com/agentscope-ai/QwenPaw/issues/8778)

4. **补充关闭结论，提升交付可追溯性**：说明已关闭 PR 是否合并、替代或放弃，并为数据库问题补充 `invalid` 的判断依据，减少用户对“关闭即修复”的误解。  
   [#8772](https://github.com/agentscope-ai/QwenPaw/pull/8772) · [#8767](https://github.com/agentscope-ai/QwenPaw/pull/8767) · [#8773](https://github.com/agentscope-ai/QwenPaw/issues/8773)

**健康度结论**：项目呈现出活跃贡献、需求快速转化为实现的积极信号；当前主要压力在于企业会话隔离、异常恢复与跨平台可靠性。下一阶段应以高风险问题闭环和可核验的合并交付为核心，而非仅看关闭数量。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报
**日期：2026-11-17**  
**项目：**[qhkm/zeptoclaw](https://github.com/qhkm/zeptoclaw)  
**统计范围：**所提供的过去 24 小时 GitHub 更新数据。

## 1. 今日速览

过去 24 小时，ZeptoClaw 有 **1 条新开 Issue、0 条 PR 更新、0 个新版本发布**，整体处于低活跃状态。唯一新增需求是为交互式 CLI 引入**单轮、用户明确批准的 Parallel 公共文档搜索**，补充现有搜索服务选择。该 Issue 暂无评论或点赞，尚未形成社区讨论，也没有对应实现 PR。今日可见进展主要停留在需求收集阶段；当前样本不足以判断项目长期维护健康度。  
来源：[Issue #725](https://github.com/qhkm/zeptoclaw/issues/725)

## 2. 项目进展

- **今日无可确认的代码交付。**提供的数据中没有 PR 更新，也没有合并或关闭的 PR，因此无法确认新增功能或修复已落地。
- **需求侧新增搜索集成方向。**[#725](https://github.com/qhkm/zeptoclaw/issues/725) 提议通过托管搜索服务获取公共文档摘录和原始来源链接，减少用户自行运行 SearXNG 的负担。目前仅能视为待评估提案，不能视为已进入开发或排期。

## 3. 社区热点

### [#725：CLI 中单轮、明确批准的 Parallel 公共文档搜索](https://github.com/qhkm/zeptoclaw/issues/725)

| 指标 | 当前状态 |
|---|---|
| 作者 | georgeatparallel |
| 状态 | OPEN |
| 创建 / 更新日期 | 2026-11-17 |
| 评论 / 点赞 | 0 / 0 |

这是今日唯一可见的社区议题，但**尚无互动，不能称为已形成热度的讨论**。

其背后的诉求包括：
- **降低搜索服务运维负担：**希望使用托管服务，而不必自行部署 SearXNG。
- **提高回答可追溯性：**希望获取公共文档摘录及原始来源链接，而不只是搜索结论。
- **明确外部调用授权边界：**标题强调“单轮”和“明确批准”，表明提案关注用户在交互式 CLI 中对搜索调用的控制。

## 4. Bug 与稳定性

- **本次数据未出现 Bug、崩溃或回归报告。**唯一新增 Issue 为功能请求，不属于稳定性缺陷；当前也没有相关 fix PR 可报告。不能据此推断项目不存在未发现或未纳入本次数据的稳定性问题。  
  参考：[Issue #725](https://github.com/qhkm/zeptoclaw/issues/725)

## 5. 功能请求与路线图信号

### Parallel 公共文档搜索接入

- **使用场景：**用户在有人值守的交互式 CLI 会话中，临时获取公共文档内容与原始链接。
- **现有基础：**据 Issue 摘要，ZeptoClaw 已提供 Brave、SearXNG 和无需密钥的 DuckDuckGo 回退方案；本提案意在增加一个托管搜索选择。
- **设计信号：**若后续推进，值得关注单轮授权的有效范围、外部请求触发方式，以及与现有搜索选项的选择关系。以上属于后续评估重点，并非已确认方案。
- **下一版本判断：****暂无证据表明会被纳入下一版本。**当前没有对应 PR、维护者评论或排期信息。

来源：[Issue #725](https://github.com/qhkm/zeptoclaw/issues/725)

## 6. 用户反馈摘要

**当前没有 Issue 评论可供提炼。**以下仅来自提案作者的描述，不代表广泛用户共识：

| 维度 | 可确认反馈 |
|---|---|
| 痛点 | 希望避免为公共文档搜索自行运行 SearXNG |
| 场景 | 交互式 CLI 会话中的临时文档查询 |
| 结果要求 | 文档摘录与原始来源链接 |
| 控制要求 | 单轮使用，并由用户明确批准 |
| 满意度 | 未提供对现有功能的明确满意或不满意评价 |

来源：[Issue #725](https://github.com/qhkm/zeptoclaw/issues/725)

## 7. 待处理积压

- **暂无可识别的长期未响应积压。**本次仅提供当天新开的 [#725](https://github.com/qhkm/zeptoclaw/issues/725)，无法评估历史 Issue 或 PR 的等待时长。
- **建议维护者初步分流 #725：**明确是否接受新增搜索服务，并澄清授权机制、集成范围及验收标准。该 Issue 虽尚无评论，但刚刚创建，不宜认定为维护响应迟缓。

---

**健康度结论：**今日呈现“**低活动量、需求驱动、无可见代码交付**”的状态。新增提案触及搜索运维便利性、结果可追溯性与外部调用授权三个方向；后续应观察维护者是否回应，以及是否出现实现 PR，才能判断其是否转化为实际产品进展。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：2026-11-17** · [GitHub 仓库](https://github.com/zeroclaw-labs/zeroclaw)

> 统计依据：所提供的过去 24 小时数据及条目摘要。所有列出的 PR 均处于 OPEN 状态；PR 评论数未提供，Issue 评论正文未提供，因此不据此推断讨论热度或用户情绪。

## 1. 今日速览

过去 24 小时，ZeroClaw 有 **3 条 Issue、9 条 PR 更新**，没有 Issue 关闭、PR 合并或关闭，也没有新版本发布。提交侧保持活跃，工作集中在 **OIDC 企业身份集成、安全边界、运行时可靠性及渠道接入**。但这些变化目前均处于提案或待审阶段，尚不能视为已交付能力。项目健康度呈现“**贡献活跃、交付尚待确认**”的状态，尤其需要关注紧急停止未被运行时执行、定时任务阻塞及 Dashboard 推理配置未生效等问题。  
[Issues](https://github.com/zeroclaw-labs/zeroclaw/issues) · [Pull Requests](https://github.com/zeroclaw-labs/zeroclaw/pulls)

## 2. 项目进展

### 已落地进展：本窗口无合并或关闭记录

今日无法确认主分支新增了哪些能力或修复。以下均为**待合并进展**，不代表已发布或可直接使用。

| 方向 | 待合并工作及价值 | 当前限制 |
|---|---|---|
| 企业身份认证 | 可按 OIDC provider 配置 OAuth scopes；扩展 JWKS 验证兼容性；提出守护进程托管刷新凭据的设计 | [#12497](https://github.com/zeroclaw-labs/zeroclaw/pull/12497)、[#12498](https://github.com/zeroclaw-labs/zeroclaw/pull/12498)、[#12496](https://github.com/zeroclaw-labs/zeroclaw/pull/12496) 均待审；#12498 依赖 #12497 |
| 外部 API 集成 | 增加作用域受限的 `Authorization: Token` 凭据支持，面向 DefectDojo 等接口 | [#12490](https://github.com/zeroclaw-labs/zeroclaw/pull/12490) 依赖 [#12408](https://github.com/zeroclaw-labs/zeroclaw/pull/12408)，需按顺序合并 |
| 渠道可用性 | 修复 Matrix 机器人无法自动接受房间及私聊邀请的问题 | [#12495](https://github.com/zeroclaw-labs/zeroclaw/pull/12495) 待合并 |
| 子智能体上下文 | 为委派的子智能体补充当前时刻，降低其被问及时间时编造答案的风险 | [#12488](https://github.com/zeroclaw-labs/zeroclaw/pull/12488) 待合并 |
| 贡献与依赖维护 | 修复 provider dispatch 检查对测试配置的识别；批量更新 37 项 Rust 依赖 | [#12493](https://github.com/zeroclaw-labs/zeroclaw/pull/12493)、[#12487](https://github.com/zeroclaw-labs/zeroclaw/pull/12487) 待合并 |

**整体判断：**今日增加了较明确的实现与设计储备，但从“已合并、已发布”的口径看，尚无可确认的交付增量。

## 3. 社区热点

### 可量化的讨论热点：Dashboard thinking 配置失效

[#12492](https://github.com/zeroclaw-labs/zeroclaw/issues/12492) 是本批 Issue 中唯一有评论的条目，**1 条评论、0 个点赞**。用户配置了 `native_thinking = true` 和 `default_level = "high"`，但 Dashboard 聊天未传递这些设置。其核心诉求是：**界面入口应遵循运行时配置，避免配置看似生效、实际执行却不一致**。

### 开发集中方向：企业身份认证

同一贡献者提交了三项相关 PR，覆盖 scopes、JWKS 兼容性及设备会话连续性，表明 **Okta / Entra ID 接入**是当前较集中的开发方向。不过，PR 评论数缺失，不能将提交集中度等同于社区讨论热度。  
[#12496](https://github.com/zeroclaw-labs/zeroclaw/pull/12496) · [#12497](https://github.com/zeroclaw-labs/zeroclaw/pull/12497) · [#12498](https://github.com/zeroclaw-labs/zeroclaw/pull/12498)

### 安全议题：开发执行隔离

[#12494](https://github.com/zeroclaw-labs/zeroclaw/issues/12494) 提议为每个 agent 提供隔离的开发构建执行器，指出构建、测试、包恢复和源码生成均可能执行不可信代码。该议题当前 **0 评论、0 点赞**，尚不能称为高热度讨论，但对智能体执行代码的安全边界具有重要意义。

## 4. Bug 与稳定性

以下按潜在影响优先级排列；除明确标注外，不代表官方严重等级。表中同时包含 Issue 报告及修复 PR 揭示的问题。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **安全优先** | `zeroclaw estop` 会修改状态并显示已启动急停，但据 PR 描述，实际运行 agent 的路径未读取该状态，可能造成错误安全预期 | 已有 [#12491](https://github.com/zeroclaw-labs/zeroclaw/pull/12491)，待合并。方案是返回“未被执行”的错误，**并非实现真正急停** |
| **S2：调度降级** | cron 调度器等待整批到期任务结束，一个长耗时 agent 任务会拖延后续任务启动；报告称影响 0.9.0，且在所列 master 提交上仍存在 | [#12489](https://github.com/zeroclaw-labs/zeroclaw/issues/12489)；所给数据中未见对应 fix PR |
| **S2：配置失效** | Dashboard 聊天忽略运行时 profile 的 thinking 设置，原生推理配置未发送 | [#12492](https://github.com/zeroclaw-labs/zeroclaw/issues/12492)；所给数据中未见对应 fix PR |
| **渠道接入受阻** | Matrix 不自动接受房间/私聊邀请，导致运营者无法通过常见邀请流程添加机器人 | 已有 [#12495](https://github.com/zeroclaw-labs/zeroclaw/pull/12495)，待合并 |
| **贡献流程受阻** | provider dispatch 门禁错误识别测试代码，导致安装仓库 hooks 的贡献者推送失败 | 已有 [#12493](https://github.com/zeroclaw-labs/zeroclaw/pull/12493)，待合并 |
| **上下文准确性不足** | 委派子智能体缺少当前时刻信息，被问及时间时可能编造答案 | 已有 [#12488](https://github.com/zeroclaw-labs/zeroclaw/pull/12488)，待合并 |

本批数据**未报告明确的崩溃问题**；cron 问题的回归状态标为未知，其他问题也不足以据摘要判定回归范围。

## 5. 功能请求与路线图信号

- **企业身份集成是最明确的近期候选方向。** 三项关联 PR 已覆盖设计及部分实现，摘要明确将 Okta、Entra ID 支持与 v1.0 需求关联。但缺少合并、评审及发布计划信息，不能确认会进入下一版本。  
  [#12496](https://github.com/zeroclaw-labs/zeroclaw/pull/12496) · [#12497](https://github.com/zeroclaw-labs/zeroclaw/pull/12497) · [#12498](https://github.com/zeroclaw-labs/zeroclaw/pull/12498)

- **外部工具认证兼容性有具体场景驱动。** `Authorization: Token` 支持由 DefectDojo API v2 需求推动，已有实现 PR，但存在前置合并依赖。  
  [#12490](https://github.com/zeroclaw-labs/zeroclaw/pull/12490)

- **逐 agent 的隔离构建环境仍属早期路线图信号。** 当前为安全 RFC，所给数据未显示实现 PR，更适合视为待讨论的架构方向，而非近期交付承诺。  
  [#12494](https://github.com/zeroclaw-labs/zeroclaw/issues/12494)

## 6. 用户反馈摘要

**数据限制：未提供 Issue 评论正文。** 以下仅提炼 Issue 描述中的真实使用场景，不将其包装为评论共识或满意度调查。

- **配置可预期性：** Dashboard 用户希望 runtime profile 的推理设置被忠实执行；当前入口行为与配置意图不一致。  
  [#12492](https://github.com/zeroclaw-labs/zeroclaw/issues/12492)
- **自动化及时性：** cron 用户需要多个任务按计划启动，不希望某个长任务阻塞其他任务的调度。  
  [#12489](https://github.com/zeroclaw-labs/zeroclaw/issues/12489)
- **开发任务安全性：** 让 agent 执行构建与测试的用户需要真正的执行隔离，而不只是共享进程中的工作区限制。  
  [#12494](https://github.com/zeroclaw-labs/zeroclaw/issues/12494)

现有材料未包含明确的正向满意反馈，也不足以判断总体满意度。

## 7. 待处理积压与维护提醒

本批条目均创建于 **11 月 16—17 日**，不能认定为长期积压；Issue 零评论也不等同于维护者长期未响应。建议优先跟进以下待处理项：

1. **优先审查急停误导风险。** 应明确区分“拒绝声称急停成功”与“真正强制停止运行时”，避免用户误解修复范围。  
   [#12491](https://github.com/zeroclaw-labs/zeroclaw/pull/12491)
2. **为两个 S2 问题建立修复闭环。** cron 批次阻塞与 Dashboard thinking 配置失效目前均未见关联修复 PR，建议补充复现测试及修复责任人。  
   [#12489](https://github.com/zeroclaw-labs/zeroclaw/issues/12489) · [#12492](https://github.com/zeroclaw-labs/zeroclaw/issues/12492)
3. **按依赖链安排评审，减少重复审查。** OIDC 为 #12497 → #12498；HTTP 凭据支持为 #12408 → #12490。  
   [#12498](https://github.com/zeroclaw-labs/zeroclaw/pull/12498) · [#12490](https://github.com/zeroclaw-labs/zeroclaw/pull/12490)
4. **关注贡献入口阻塞。** 若 pre-push 门禁问题可稳定复现，应尽快处理，避免影响其他修复进入评审。  
   [#12493](https://github.com/zeroclaw-labs/zeroclaw/pull/12493)

**结论：**ZeroClaw 今日的开发投入较活跃，但成果仍集中在待审队列。下一步健康度的关键观察点，是安全与 S2 缺陷能否形成修复闭环，以及认证相关 PR 能否按依赖顺序完成评审和合并。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*