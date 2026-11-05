# OpenClaw 生态日报 2026-11-06

> Issues: 19 | PRs: 64 | 覆盖项目: 13 个 | 生成时间: 2026-11-05 16:30 UTC

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
**日期：2026-11-06｜项目：[openclaw/openclaw](https://github.com/openclaw/openclaw)**

> **数据口径**：按提供的过去 24 小时快照统计，条目更新时间主要为 11 月 5 日。PR 仅展示部分样本，评论数均为 `undefined`；未提供评论正文、合并记录及完整发行说明。因此，下文严格区分“已关闭”“已合并”和“待合并”，不将关闭直接视为修复已上线。

## 1. 今日速览

过去 24 小时共更新 **19 条 Issue、64 条 PR**，并记录 **1 个版本发布**，开发与缺陷分诊活跃。Issue 中 **14 条新开或活跃、5 条关闭**；PR 中 **54 条待合并、10 条已合并或关闭**，说明修复供给充足，但仍有较大的评审队列。工作重点集中在 **状态数据库迁移、升级恢复、认证轮换和消息投递可靠性**，而非单纯扩展功能。整体呈现“高活跃、稳定性收敛中”的状态：已有多个问题获得修复提案，但容器启动、OAuth 轮换及大规模会话场景仍存在未解决风险。相关进展见 [PR 列表](https://github.com/openclaw/openclaw/pulls) 与 [Issue 列表](https://github.com/openclaw/openclaw/issues)。

## 2. 版本发布

### [v2026.11.1：openclaw 2026.11.1](https://github.com/openclaw/openclaw/releases/tag/v2026.11.1)

**已确认的更新内容**
- **macOS 配置保存安全性增强**：配置保存失败时不再覆盖秘密凭据。
- **Tailscale 暴露设置更安全**：关闭 Tailscale 暴露时，保留 Gateway 认证设置。
- 发行说明提及 **Telegram、Discord 与 webhook 回复可靠性改进**，但原文在此截断，无法确认具体行为和覆盖范围。

**破坏性变更与迁移注意事项**
- 所给发行说明**未包含可确认的破坏性变更或迁移步骤**；不能据此认定“无破坏性变更”。
- 使用 iOS 18 浏览器访问控制台的用户，应先验证兼容性：有用户报告升级至该版本后 Control UI 无法访问，见 [#193540](https://github.com/openclaw/openclaw/issues/193540)。
- 大规模历史会话部署建议先做隔离升级演练：一例包含 **24,851 条保留会话记录**的 ARM64 环境在该版本出现推理前超时，见 [#193590](https://github.com/openclaw/openclaw/issues/193590)。

## 3. 项目进展

### 已关闭的重要 PR
以下条目在快照中为 **CLOSED**，但缺少合并信息，不能断言已进入主分支或发行版。

| PR | 推进方向 | 状态与意义 |
|---|---|---|
| [#193548](https://github.com/openclaw/openclaw/pull/193548) | 避免会话归档读取填满临时存储 | 对应 Issue 已关闭；提案减少归档发现、历史读取及索引过程产生的持久明文解压副本，有利于小容量 `/tmp` 环境 |
| [#193532](https://github.com/openclaw/openclaw/pull/193532) | 运行时选择与共享草稿可用性 | 针对角色受限用户选择不可用运行时，以及在线状态缓存边界导致草稿预览缺失 |
| [#193588](https://github.com/openclaw/openclaw/pull/193588) | Telegram 列表排版 | 修正旧版 Markdown 路径中，嵌套项目符号与有序列表被错误分离的问题 |

### 仍在推进的关键修复
- **OAuth 轮换恢复**：同一问题出现两个开放修复提案，均涉及安全敏感代码，需维护者协调方案并完成安全评审：[#193597](https://github.com/openclaw/openclaw/pull/193597)、[#193599](https://github.com/openclaw/openclaw/pull/193599)。
- **消息失败重试与重启恢复**：分别处理首次失败后的幂等冲突，以及重启后富文本回复丢失：[#193602](https://github.com/openclaw/openclaw/pull/193602)、[#193547](https://github.com/openclaw/openclaw/pull/193547)。
- **升级恢复闭环**：针对升级后续步骤失败导致 repair 永久拒绝，以及数据库读取期间出现 WAL 校验失败，已有开放提案：[#193132](https://github.com/openclaw/openclaw/pull/193132)、[#193134](https://github.com/openclaw/openclaw/pull/193134)。

**进展判断**：本日可确认的是修复方案持续形成、部分问题关闭；现有数据不足以计算实际合并量或判断这些改进已交付用户。

## 4. 社区热点

本批 Issue 评论仅 **1—3 条**，点赞均为 **0**，没有形成高反应量热点；PR 评论数缺失，无法进行可信的讨论热度排名。

| 议题 | 可见热度 | 背后诉求 |
|---|---:|---|
| [升级 repair 对同一数据库重复获取 custody，#193401](https://github.com/openclaw/openclaw/issues/193401) | 3 条评论，已关闭 | 升级失败后必须存在可靠恢复路径，不能由恢复机制自身阻断操作 |
| [Provider 403 被误判为认证失败，#193194](https://github.com/openclaw/openclaw/issues/193194) | 2 条评论，已关闭 | 区分上游故障与凭据失效，避免单次服务异常封锁整个 Provider |
| [Windows 挂载目录导致 Docker 启动失败，#193262](https://github.com/openclaw/openclaw/issues/193262) | 2 条评论，开放 | 保持 Docker Desktop／WSL2 既有部署兼容性，降低升级回归成本 |
| [Provider ID 大小写不兼容，#193535](https://github.com/openclaw/openclaw/issues/193535) | 2 条评论，开放 | CLI 对合法标识符应保持一致、宽容的解析行为；已有 [修复 PR #193586](https://github.com/openclaw/openclaw/pull/193586) |

## 5. Bug 与稳定性

按影响与标注优先级排序；“未展示修复 PR”仅指本次数据无法确认，并不代表仓库中不存在。

| 优先级／状态 | 问题与影响 | 修复进度 |
|---|---|---|
| **P1／开放** | [#193262](https://github.com/openclaw/openclaw/issues/193262)：Windows 磁盘绑定挂载下，Docker 在原子写入后出现 `ENOENT fstat` 并退出；报告称 2026.7.1 可用、2026.9.3 起所试版本失败 | 未展示修复 PR；待维护者评审和现场复现 |
| **P1／开放** | [#192959](https://github.com/openclaw/openclaw/issues/192959)：Kubernetes PVC 配合 `fsGroup`，Pod 重启后凭据目录被拒绝，Gateway 无法启动 | 未展示修复 PR；需产品决策与安全评审 |
| **P1／开放** | [#193576](https://github.com/openclaw/openclaw/issues/193576)：共享认证存储迁移到状态数据库后，OAuth profile 不再轮换，负载集中到单一 profile | 已有开放 PR [#193597](https://github.com/openclaw/openclaw/pull/193597)、[#193599](https://github.com/openclaw/openclaw/pull/193599) |
| **P2／开放** | [#193492](https://github.com/openclaw/openclaw/issues/193492)：Skill Workshop 大会话经验回顾读取无界上下文，触发 `ERR_WORKER_OUT_OF_MEMORY` | 标注已关联开放 PR，但本次未展示编号 |
| **P2／开放** | [#193590](https://github.com/openclaw/openclaw/issues/193590)：大量保留会话下，服务显示 ready，但请求在到达模型前超时 | 未展示修复 PR；待维护者评审 |
| **P2／开放** | [#193540](https://github.com/openclaw/openclaw/issues/193540)：2026.11.1 的 Control UI 在 iOS 18 默认浏览器中不可访问 | 未展示修复 PR |
| **P2／开放** | macOS arm64 升级失败，分别发生于包更新和 Gateway 恢复验证阶段：[#193591](https://github.com/openclaw/openclaw/issues/193591)、[#193560](https://github.com/openclaw/openclaw/issues/193560) | 未确认直接对应修复 PR |
| **P2／开放** | [#193580](https://github.com/openclaw/openclaw/issues/193580)：Copilot Claude 工具循环反复重写提示缓存，可能增加重复处理开销 | 标注已关联开放 PR，编号未展示 |

**已关闭但需核验交付状态**
- Provider 403 误分类：[#193194](https://github.com/openclaw/openclaw/issues/193194)。
- 会话归档占用临时空间：报告 **495 个文件、约 620 MB**，宿主 `/tmp` 为 1 GiB；Issue [#193193](https://github.com/openclaw/openclaw/issues/193193) 与 PR [#193548](https://github.com/openclaw/openclaw/pull/193548) 均关闭。
- 仅在 Provider 配置中设置 API key 时，多模态生成工具缺失：[#193339](https://github.com/openclaw/openclaw/issues/193339)；仍带有关联 PR 开放标签，需确认最终落地状态。

## 6. 功能请求与路线图信号

| 方向 | 当前信号 | 下一版本判断 |
|---|---|---|
| **模型请求发送前的插件策略控制** | [#193550](https://github.com/openclaw/openclaw/pull/193550) 提议新增 `before_model_request`，允许检查或修改最终请求，并采用失败即拒绝策略 | 有明确实现提案，但兼容性与安全边界风险尚待证明 |
| **按 Provider／模型限制 exec 模式** | [#193566](https://github.com/openclaw/openclaw/pull/193566) 将执行审批策略细化至模型级 | 有望增强混合模型部署的权限治理；仍需安全评审与证据补充 |
| **来电身份可信度增强** | [#193571](https://github.com/openclaw/openclaw/issues/193571) 请求可选 Twilio STIR/SHAKEN attestation 准入要求 | 尚处产品与安全讨论阶段，近期交付不确定 |
| **审批历史展示执行警告** | [#193598](https://github.com/openclaw/openclaw/pull/193598) 提议显示已记录的 exec warning | 改动较小，但仍标注需要验证证据 |
| **中文等语言的流式输出完整性** | [#193592](https://github.com/openclaw/openclaw/pull/193592) 修复中文、日文及印地语块流式输出被不自然截断 | 已有小型修复提案，可作为近期版本候选，尚未合并 |

**路线图信号**：插件治理、执行权限细分和操作审计正在增强，但当前修复队列显示，稳定性与升级可靠性仍是更紧迫的交付任务。

## 7. 用户反馈摘要

> 未提供评论正文，以下仅依据 Issue 描述提炼，不将其表述为评论共识。

- **用户希望保留既有设备与部署方式**：Windows 挂载目录和 iOS 18 浏览器回归，均体现出“升级软件不应强迫迁移基础环境”的诉求。[#193262](https://github.com/openclaw/openclaw/issues/193262)、[#193540](https://github.com/openclaw/openclaw/issues/193540)
- **长期运行场景暴露规模边界**：保留数万条会话、读取大量压缩归档、回顾大型上下文，分别触及 CPU、临时存储和 worker 内存限制。[#193590](https://github.com/openclaw/openclaw/issues/193590)、[#193193](https://github.com/openclaw/openclaw/issues/193193)、[#193492](https://github.com/openclaw/openclaw/issues/193492)
- **多账号、多智能体配置需要一致语义**：OAuth 轮换失效、Memory Core 忽略 `systemAgent`，说明复杂部署依赖明确的归属与调度规则。[#193576](https://github.com/openclaw/openclaw/issues/193576)、[#193594](https://github.com/openclaw/openclaw/issues/193594)
- **细小的标识符差异会造成真实操作阻力**：Provider 大小写、agent key 大小写及 Unicode 规范化问题，使“看起来相同”的配置无法被正确查询或修改。[#193535](https://github.com/openclaw/openclaw/issues/193535)、[#193534](https://github.com/openclaw/openclaw/issues/193534)、[#193585](https://github.com/openclaw/openclaw/issues/193585)

数据中缺少明确的正向满意度反馈，不宜仅凭问题关闭推断用户满意。

## 8. 待处理积压

**无法确认“长期未响应”条目**：本批记录主要创建于 11 月 5 日，最早可见的相关 Issue 创建于 11 月 4 日；没有足够时间跨度或维护者响应记录。以下是应优先防止形成积压的队列：

1. **容器部署阻断问题**：优先补齐 Windows Docker 挂载复现，以及 Kubernetes `fsGroup` 下权限安全模型的决策，避免启动兼容性长期悬置。[#193262](https://github.com/openclaw/openclaw/issues/193262)、[#192959](https://github.com/openclaw/openclaw/issues/192959)
2. **同一 OAuth 缺陷的重复修复提案**：尽快确定主方案、合并测试证据并统一安全评审，减少重复投入。[#193597](https://github.com/openclaw/openclaw/pull/193597)、[#193599](https://github.com/openclaw/openclaw/pull/193599)
3. **P1 缓存清理修复等待作者**：Doctor／triage 遗留 SQLite 快照可能持续占用磁盘；两个 PR 均标注等待作者，宜明确剩余验收条件。[#193229](https://github.com/openclaw/openclaw/pull/193229)、[#193174](https://github.com/openclaw/openclaw/pull/193174)
4. **升级恢复与旧定时任务绑定**：repair 永久拒绝和旧 cron 缺少推理账号绑定，均直接影响持续运维，应作为升级回归测试重点。[#193132](https://github.com/openclaw/openclaw/pull/193132)、[#193570](https://github.com/openclaw/openclaw/pull/193570)

**总体结论**：OpenClaw 的贡献与缺陷分诊保持高活跃度；近期健康度的关键不在 PR 数量，而在能否将现有修复安全地合入、明确版本归属，并通过跨平台升级与大规模会话回归验证。

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向分析
**日期：2026-11-06｜基于所提供的过去 24 小时快照**

> **口径说明**：Issue、PR 数均为窗口内更新条目数，不等于新增数或仓库总量；`CLOSED` 不等于已合并。健康度仅评价本次可见的维护信号，不代表长期项目评级。NanoClaw、CoPaw 的项目标识与条目链接存在仓库路径差异，相关归属仍需核验。

## 1. 生态全景

本次覆盖的 **13 个项目中，7 个有可见活动、6 个无活动**，合计更新 **79 条 Issue、152 条 PR**，仅 OpenClaw 记录了 **1 次版本发布**。生态工作重心正从新增能力转向长期运行质量：状态持久化、升级恢复、消息投递、权限边界和资源回收成为高频主题。OpenClaw 与 Hermes Agent 的工程活动最密集，两者合计占本次 Issue 更新量的 **87%**、PR 更新量的 **75%**，但这只能说明当日工作量集中，不能等同于用户规模或市场份额。整体呈现“**能力扩展持续、可靠性交付承压**”的状态，多数可见修复仍需经过合并、测试和版本交付验证。

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 本窗口健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 19 | 64 | **v2026.11.1** | 高活跃且有版本交付；54 条 PR 待合并，容器启动、OAuth 轮换和规模化会话风险待收敛 |
| **Hermes Agent** | 50 | 50 | 无 | 高活跃；Issue、PR 各 47 条开放，存在数据完整性及服务中断报告，可靠性交付需重点验证 |
| **ZeroClaw** | 6 | 13 | 无 | 安全与权限治理集中推进；全部开放，P1 RPC 授权修复尚未交付 |
| **LobsterAI** | 0 | 12 | 无 | 性能与桌面体验维护较活跃；9 条 PR 关闭、3 条待合并，合并证据不完整 |
| **NanoBot** | 0 | 6 | 无；准备 0.4.1 | 维护版本收尾信号明确；5 条 PR 关闭，安装正确性与界面修复需核验落地 |
| **CoPaw** | 4 | 5 | 无 | 持续迭代；全部开放，Creator 安装和审核流程存在阻断问题 |
| **NanoClaw** | 0 | 2 | 无 | 仅见机器人镜像刷新；均待合并，无法据此评价整体开发健康度 |
| PicoClaw | 0 | 0 | 无 | 本窗口无活动，长期状态未知 |
| NullClaw | 0 | 0 | 无 | 本窗口无活动，长期状态未知 |
| IronClaw | 0 | 0 | 无 | 本窗口无活动，长期状态未知 |
| TinyClaw | 0 | 0 | 无 | 本窗口无活动，长期状态未知 |
| Moltis | 0 | 0 | 无 | 本窗口无活动，长期状态未知 |
| ZeptoClaw | 0 | 0 | 无 | 本窗口无活动，长期状态未知 |
| **合计** | **79** | **152** | **1 次发布** | 活动集中，但不能由单日数据计算长期维护效率 |

**解读重点**：Issue 少不一定更稳定，PR 多也不一定交付更快。当前缺少统一的合并时间、回归率、修复发布时间和用户覆盖数据，不宜进行绝对质量排名。

## 3. OpenClaw 在生态中的定位

### 优势：集成面广，且本窗口存在实际发布动作

- **当日 PR 活动最多**：64 条，超过 Hermes Agent 的 50 条，约占样本总量的 **42%**。
- **本窗口唯一记录版本发布的项目**：v2026.11.1 已确认涉及秘密凭据保存和 Gateway 认证设置保护，体现出从代码维护走向版本交付的能力；但不能据此认定待审修复均已上线。
- **覆盖复杂部署与使用场景**：可见问题涉及 macOS、Windows Docker、Kubernetes、iOS 浏览器，以及 Telegram、Discord、webhook、多账号认证与长期会话。
- **存在下游集成信号**：LobsterAI 直接围绕 OpenClaw 启动、Gateway 握手及安装路径开展优化，说明其影响不只限于自身应用。

### 技术路线差异

| 对照项目 | OpenClaw 的相对侧重 | 对照项目的本窗口侧重 |
|---|---|---|
| Hermes Agent | Gateway、多渠道投递、认证管理与升级运维 | Kanban、后台子智能体、代码工作树及任务执行恢复 |
| ZeroClaw | 广泛集成下的部署兼容性与状态迁移 | RPC 授权一致性、受限权限 Dashboard、权限感知界面 |
| NanoBot | 多环境、多账号、长期运行的复杂性治理 | WebUI 易用性、技能市场安装正确性和维护版本准备 |
| CoPaw | 通用助手基础设施与运行治理 | Creator 多模态工作流、插件设置与记忆插件适配 |
| LobsterAI | 提供被桌面产品集成的运行能力 | 降低桌面用户的启动、安装和交互成本 |

### 社区规模：只能确认活动量，不能确认用户体量

OpenClaw 与 Hermes Agent 构成本次样本的高活跃层，但两者的用户数、活跃贡献者数和实际部署量均未提供。OpenClaw 可见 Issue 讨论只有 **1—3 条评论**，并未形成高互动量热点；因此更准确的定位是：**工程活动量大、运行场景复杂、已有下游集成，但广泛社区规模仍缺乏直接证据。**

其主要挑战也来自这种广度：状态数据库迁移、OAuth 轮换、跨平台升级和历史会话规模相互叠加，增加了回归验证成本。

## 4. 共同关注的技术方向

| 共同方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **状态持久化与迁移安全** | OpenClaw、Hermes Agent、CoPaw、ZeroClaw | 数据库迁移可恢复；避免目标丢失和数据库误隔离；兼容 Windows SQLite 路径；确保配置修改真正持久化 |
| **权限与身份边界** | OpenClaw、Hermes Agent、ZeroClaw | 模型级执行审批、家庭角色与记忆隔离、任务所有权校验，以及异步等待后的撤权复查 |
| **消息与后台任务可靠性** | OpenClaw、Hermes Agent、ZeroClaw | 消息幂等重试、重启后回复恢复、投递拒绝可观测、子智能体失败回传、cron 归属一致 |
| **长期运行的资源治理** | OpenClaw、Hermes Agent、LobsterAI、ZeroClaw | 控制归档临时空间、上下文内存、重试缓存、图片数据重复存储、残留进程及 Canvas 槽位 |
| **插件与技能可维护性** | NanoBot、CoPaw、Hermes Agent、OpenClaw、LobsterAI | 明确技能来源、保证安装成功、提供稳定扩展接口、治理模型请求，以及减少外部包管理器依赖 |
| **状态与界面一致性** | Hermes Agent、CoPaw、ZeroClaw、NanoBot、LobsterAI | 避免“显示 ready 却阻塞”“显示成功却未生效”；保持导航、消息同步、会话切换和窗口状态可信 |

共同变化是：项目不再只解决“模型能否调用工具”，而在解决“**工具执行是否被授权、结果是否被保存、失败能否被发现和恢复**”。

## 5. 差异化定位分析

以下定位基于本窗口可见工作推断，不替代项目的完整产品定义。

| 项目 | 功能侧重 | 更匹配的用户需求 | 可见架构特征与代价 |
|---|---|---|---|
| **OpenClaw** | 多渠道个人助手、认证与运行治理 | 需要跨设备、多账号和持续运行的部署者 | Gateway、状态数据库和插件策略扩展；集成广度带来迁移与兼容性负担 |
| **Hermes Agent** | 多任务执行、后台协作、开发工作流 | 使用子智能体、定时任务和代码工具的重度用户 | Kanban、worktree、MCP/ACP、存储接口演进；任务所有权与数据完整性尤为关键 |
| **NanoBot** | WebUI、技能使用与阅读体验 | 重视交互清晰度和技能安装体验的用户 | 上下文图与来源级技能识别；本窗口以产品打磨为主 |
| **ZeroClaw** | 权限感知交互与多 Agent 一致性 | 关注受限账户、委派和执行审批的部署者 | daemon/RPC 授权链路；异步权限时序成为核心审查点 |
| **LobsterAI** | 桌面伴侣、多模态会话、运行时封装 | 希望开箱即用、少依赖命令行的桌面用户 | 集成 OpenClaw 与 dsh；承担启动、依赖打包及进程生命周期复杂性 |
| **CoPaw** | 插件化创作和多模态工作流 | 组合图像、视频与语言模型的创作者 | Creator 与记忆插件协作；安装、凭证配置及审核状态链路需完善 |
| **NanoClaw** | 本窗口仅见加固镜像维护 | 无法据此可靠界定 | 可见镜像映射自动刷新，但加固收益、仓库归属和验证结果待确认 |

其余六个无活动项目缺少本日技术信息，不能仅凭名称推断轻量性、安全性或目标用户。

## 6. 社区热度与成熟度

### 活跃度分层

1. **高密度迭代与可靠性治理：OpenClaw、Hermes Agent**  
   两者承担样本绝大多数 Issue 与 PR 活动。OpenClaw 有版本发布，Hermes Agent 则暴露更多任务执行与数据完整性风险；二者都面临将修复候选转化为可靠交付的压力。

2. **定向功能演进与质量补齐：ZeroClaw、CoPaw**  
   ZeroClaw 围绕权限化 Dashboard 推进，CoPaw 围绕插件与 Creator 工作流完善。全部条目开放是待交付信号，尚不能据此判定评审积压。

3. **维护收尾与体验巩固：NanoBot、LobsterAI**  
   NanoBot 的 0.4.1 准备动作最明确；LobsterAI 聚焦启动、多模态数据和桌面交互。两者均缺少足够证据确认本轮改动已完整进入用户版本。

4. **自动化维护或观察不足：NanoClaw及六个无活动项目**  
   不能将“机器人仍运行”视为开发繁荣，也不能将“单日无活动”视为停滞。

### 成熟度不能由热度替代

本批数据的评论和点赞普遍较低，且 PR 评论数大量缺失，**无法进行可信的社区讨论热度排名**。更值得用于评估成熟度的指标是：

- 阻断问题从报告到发布修复的时间；
- 升级失败能否安全回滚或恢复；
- 权限变更是否覆盖异步执行全过程；
- 大历史数据、多模态和长任务是否有明确容量边界；
- Issue 关闭是否能追溯到修复、测试和发行版本。

## 7. 值得关注的趋势信号

### 1. “持续运行质量”正在成为产品竞争点
OpenClaw 的数万条会话、Hermes 的长上下文与后台任务、LobsterAI 的 GB 级图片元数据，都显示真实负载已超出短轮问答。

**开发者参考**：测试应覆盖长期数据积累、并发任务和资源回收，而不只验证单轮成功率。

### 2. 权限治理从入口校验走向执行全过程
ZeroClaw 关注异步等待后的权限复查，Hermes 关注显式任务 ID 下的所有权约束，OpenClaw 提议按模型细化执行审批。

**开发者参考**：授权应在副作用提交前复核，不能只依赖登录状态、启动环境或初始请求检查。

### 3. 可恢复性与可观测性正在成为基础能力
“ready 但不工作”“成功但未保存”“拒绝但无日志”在多个项目中出现。日志补充只是第一步，不能替代服务恢复。

**开发者参考**：为任务设计明确状态机、失败原因、重试语义和人工恢复入口，并让界面状态反映真实执行状态。

### 4. 插件生态竞争转向来源、生命周期和兼容性治理
NanoBot 的同名技能来源、CoPaw 的包元数据与记忆接口、LobsterAI 的内置 pnpm，说明插件数量并非唯一价值。

**开发者参考**：应优先完善来源标识、依赖封装、版本兼容、安装验证和卸载清理，而非单纯扩大目录。

### 5. 桌面产品正在吸收底层运行时复杂性
LobsterAI 对 OpenClaw 与 dsh 的封装，以及 Hermes 的桌面一致性问题，体现出底层运行能力与终端体验的分工。

**开发者参考**：运行时需要稳定的就绪语义、启动接口和生命周期契约；桌面层则需对依赖和进程状态负责。

### 6. 行为回归测试开始受到重视
Hermes 的 `agentci` 提案尝试基于实际会话评估模型、提示词和版本变化，代表测试对象正从代码正确性延伸到智能体行为。

**开发者参考**：在单元测试之外，建立会话回放和任务结果评估，重点覆盖工具调用、权限拒绝、压缩及失败恢复。

---

**决策结论**：本窗口中，OpenClaw 的突出特点是**集成覆盖广、PR 活动量大且存在实际发布**；Hermes Agent 展现出丰富的自主任务工作流信号；ZeroClaw 的权限治理、LobsterAI 的桌面封装、NanoBot 的维护收尾和 CoPaw 的创作插件化各具侧重。选型不宜仅看活跃度，应以目标环境下的**升级恢复、数据完整性、授权边界和长期负载验证**作为主要门槛。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报
**日期：2026-11-06｜项目：[HKUDS/nanobot](https://github.com/HKUDS/nanobot)**

> 数据口径：依据提供的过去 24 小时更新快照，所列 PR 的创建、更新时间均为 2026-11-05。`CLOSED` 仅表示已关闭，无法据此确认是否合并；评论数为 `undefined`，不视为零评论。

## 1. 今日速览

过去 24 小时，NanoBot 共更新 **6 条 PR**，其中 **1 条待合并、5 条已关闭**；没有 Issue 更新，也没有新版本发布。开发活动主要集中在 WebUI 体验、技能市场安装正确性和 CI 测试稳定性，整体呈现**发布前维护与收尾**特征。待处理的 [0.4.1 发布准备 PR #6570](https://github.com/HKUDS/nanobot/pull/6570) 表明项目正推进下一维护版本，但该 PR 本身不会发布版本。从本次快照看，开发侧保持持续活动，社区讨论热度和改动实际落地主分支的情况则缺乏足够数据确认。

## 2. 项目进展

本周期的 5 条关闭 PR 覆盖以下方向；**是否已合并、是否进入可用版本，仍需核验**。

| 方向 | 重要 PR | 进展与价值 |
|---|---|---|
| 技能市场安装正确性 | [#6571 区分 marketplace 安装来源](https://github.com/HKUDS/nanobot/pull/6571) | 为新安装的技能记录来源，并按仓库和技能 ID 匹配，针对不同仓库同名技能被误判为已安装的问题进行修复。 |
| 上下文图交互 | [#6569 切换会话时关闭上下文图](https://github.com/HKUDS/nanobot/pull/6569) | 在会话变更、页面绘制前关闭上下文图，避免旧会话侧栏状态与布局观察器干扰新会话。 |
| 阅读体验 | [#6568 优化 Markdown 排版](https://github.com/HKUDS/nanobot/pull/6568) | 改善聊天内容的阅读节奏与 Markdown 层级，采用本地打包的 Open Sans，并提供系统字体回退。 |
| 功能可发现性 | [#6567 输入框快捷入口提示](https://github.com/HKUDS/nanobot/pull/6567) | 在输入区域提示命令、提及和技能入口，覆盖全部 10 种受支持语言，降低现有功能的发现成本。 |
| 测试可靠性 | [#6566 放宽 CI 负载下的持久化路由检查](https://github.com/HKUDS/nanobot/pull/6566) | 针对 Windows CI 中真实 checkpoint 写入等待超时的问题调整测试，减少存储与调度延迟造成的误报。 |

**整体判断：**本周期主要是修补边界行为、改善日常交互和提高测试可靠性，而非大规模功能扩张。[#6570](https://github.com/HKUDS/nanobot/pull/6570) 已进入发布准备阶段，是项目从维护改动走向版本交付的主要信号。

## 3. 社区热点

**无法建立可靠的讨论热度排名。**本周期没有 Issue 更新，6 条 PR 的评论数均未提供，点赞均为 0；以下按影响范围列出关注议题，而非按讨论量排序。

- **0.4.1 发布范围与交付时间**：[PR #6570](https://github.com/HKUDS/nanobot/pull/6570) 是唯一仍开放的 PR。摘要提及已合并的安全与稳定性修复、文件上下文图，以及话题变化时关闭图的行为；该 PR 设置 Python 版本，但不发布版本，也不修改签名或更新源设置。
- **技能来源识别是否可靠**：[PR #6571](https://github.com/HKUDS/nanobot/pull/6571) 反映多仓库技能市场中的身份识别问题。其背后的诉求是：不能仅凭技能名称判断安装状态，安装结果应与用户选择的来源一致。
- **已有能力能否被用户发现**：[PR #6567](https://github.com/HKUDS/nanobot/pull/6567) 将快捷入口提示放在输入位置，说明项目正关注命令、提及与技能能力的使用门槛。

## 4. Bug 与稳定性

以下严重程度为基于摘要的相对影响评估，并非项目官方评级。本周期**没有新增 Issue 报告**，可确认的问题均来自 PR 描述。

| 相对严重程度 | 问题与影响 | Fix PR / 状态 |
|---|---|---|
| **中：安装正确性** | 不同仓库的同名技能可能都显示为已安装；安装 API 对其他来源返回 `already_installed`，却未实际安装目标来源。 | [#6571](https://github.com/HKUDS/nanobot/pull/6571)，已关闭，合并状态未知。 |
| **中：界面功能异常** | 上下文图打开时切换会话，旧布局状态可能使图区域折叠，仅剩用量条可见。 | [#6569](https://github.com/HKUDS/nanobot/pull/6569)，已关闭，合并状态未知。 |
| **低：CI 测试稳定性** | Windows CI 高负载下，checkpoint 已到达预期状态，但存储与调度耗时超出两秒等待窗口，导致路由测试超时。现有信息更指向测试时序问题，而非已确认的生产路由故障。 | [#6566](https://github.com/HKUDS/nanobot/pull/6566)，已关闭，合并状态未知。 |

未提供崩溃、数据丢失或新增安全漏洞的具体报告。[#6570](https://github.com/HKUDS/nanobot/pull/6570) 虽提及安全修复，但摘要不足以判断漏洞类型、严重性或受影响版本。

## 5. 功能请求与路线图信号

本周期没有新的 Issue 功能请求。以下信号来自现有 PR，不应视为用户需求投票或正式发布承诺：

- **0.4.1 是最明确的近期交付目标**：[发布准备 PR #6570](https://github.com/HKUDS/nanobot/pull/6570) 仍开放，摘要明确将安全、稳定性和上下文图相关工作列入维护范围。具体版本号设置及兼容性影响需查看完整差异。
- **输入体验与多语言一致性持续改善**：[快捷入口提示 #6567](https://github.com/HKUDS/nanobot/pull/6567) 和 [Markdown 排版 #6568](https://github.com/HKUDS/nanobot/pull/6568) 显示 WebUI 正朝“更容易发现功能、更适合长文本阅读”的方向演进；是否纳入 0.4.1 尚未由快照确认。
- **技能生态向来源级管理完善**：[安装来源修复 #6571](https://github.com/HKUDS/nanobot/pull/6571) 为跨仓库同名技能的正确识别提供基础，但不能据此推断后续一定加入来源切换、更新或迁移功能。

## 6. 用户反馈摘要

**本周期没有可供提炼的 Issue 评论，因此无法提供真实用户评价、满意度或不满意度结论。**PR 描述仅能揭示以下使用痛点：

- **跨仓库安装技能时，显示状态与实际安装结果可能不一致**，影响用户对安装反馈的信任。来源：[PR #6571](https://github.com/HKUDS/nanobot/pull/6571)。
- **查看上下文图后切换会话，可能出现图区域异常折叠**，干扰连续会话操作。来源：[PR #6569](https://github.com/HKUDS/nanobot/pull/6569)。
- **输入框提示不足、长文本层级不够清晰**，是本轮交互优化针对的设计问题，并非已验证的社区共识。来源：[PR #6567](https://github.com/HKUDS/nanobot/pull/6567)、[PR #6568](https://github.com/HKUDS/nanobot/pull/6568)。

## 7. 待处理积压

**当前数据不足以识别长期未响应的重要 Issue 或 PR。**唯一开放的 [PR #6570](https://github.com/HKUDS/nanobot/pull/6570) 创建于 2026-11-05，不属于长期积压。

建议维护者优先关注：

1. **完成 0.4.1 发布准备审查**：核对版本设置、变更清单和测试结果，并明确正式发布步骤；该 PR 本身不会触发版本发布。关联：[PR #6570](https://github.com/HKUDS/nanobot/pull/6570)。
2. **核验关闭 PR 的实际落地情况**：优先确认技能安装正确性与上下文图修复是否已合并、是否需要补充回归验证，避免将“关闭”误记为“修复已交付”。关联：[PR #6571](https://github.com/HKUDS/nanobot/pull/6571)、[PR #6569](https://github.com/HKUDS/nanobot/pull/6569)。

**健康度结论：**本周期可见的积极信号是维护工作覆盖产品正确性、WebUI 体验和 CI 可靠性，并已出现明确的版本准备动作；主要待确认项是关闭 PR 的合并结果、0.4.1 的实际发布，以及缺失的社区讨论数据。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-11-06｜统计口径：所提供的过去 24 小时 GitHub 更新数据**

> 数据范围：Issues、PR 各更新 50 条；本报可见详情分别为 30 条、20 条。条目时间均显示为 11 月 5 日；PR 评论数为 `undefined`，无法用于讨论热度排序。以下严格区分用户报告、待合并方案与已交付修复。

## 1. 今日速览

过去 24 小时，Hermes Agent 的 Issues 与 PR 均有 **50 条更新**，贡献活动活跃，但各有 **47 条仍处于开放状态**，需要持续关注审查与问题收敛能力。今日未发布新版本，可见开发活动主要围绕 **Gateway 投递可靠性、状态存储、工具调用恢复和桌面交互一致性** 展开。用户报告中出现了分支误删、目标丢失、数据库误隔离及任务所有权边界等高影响风险，稳定性应优先于功能扩张。插件目录仍在扩展，覆盖短信接入、家庭权限分层和智能体行为测试，但相关 PR 均未合并，尚不能视为正式可用能力。

相关入口：[项目仓库](https://github.com/NousResearch/hermes-agent) · [Issues](https://github.com/NousResearch/hermes-agent/issues) · [PRs](https://github.com/NousResearch/hermes-agent/pulls)

## 2. 项目进展

### 已关闭事项：有收敛记录，但修复交付证据不足

汇总数据显示 **3 条 Issue 已关闭、3 条 PR 已合并或关闭**，但可见 PR 明细全部为 OPEN，因此无法确认当天具体合入了哪些改动，也不能将“关闭 PR”直接等同于“合并”。

可见的已关闭事项为：

- **MCP keepalive 单次超时导致健康会话被拆除**：[#149498](https://github.com/NousResearch/hermes-agent/issues/149498) 已关闭。问题涉及远程 HTTP MCP 服务的探活误判；数据未提供关闭原因或关联修复，暂不能判定已解决。

### 待合并进展：可靠性与架构治理是主线

| 方向 | 可见进展及意义 | 状态 |
|---|---|---|
| 投递可观测性 | [PR #149584](https://github.com/NousResearch/hermes-agent/pull/149584) 为 Bot Chat 准入前拒绝补充日志，直接回应“消息未送达且无记录”的排障痛点；**不等于解决所有拒绝原因** | OPEN |
| 子智能体故障恢复 | [PR #149568](https://github.com/NousResearch/hermes-agent/pull/149568) 拟将后台子智能体失败原因传回空闲父会话，并触发恢复回合 | OPEN |
| 状态数据治理 | [PR #149591](https://github.com/NousResearch/hermes-agent/pull/149591) 拟回收已结束回合的重试缓存，减少持续积累；[PR #149571](https://github.com/NousResearch/hermes-agent/pull/149571) 推进存储接口迁移后的清理，但依赖前置步骤落地 | OPEN |
| 模型兼容性 | [PR #149579](https://github.com/NousResearch/hermes-agent/pull/149579) 拟以普通 JSON 避免 Codex Responses 请求的压缩兼容性 400；[PR #149588](https://github.com/NousResearch/hermes-agent/pull/149588) 避免探测请求的 4xx 掩盖原始 5xx | OPEN |
| 工具历史修复 | [PR #149573](https://github.com/NousResearch/hermes-agent/pull/149573) 拟消除历史序列中的重复 `tool_call` ID，提升上下文恢复可靠性 | OPEN |

**进展判断：**可见的是较充足的修复与重构储备，而非可验证的大规模交付。整体正向可靠性治理推进，但当前数据不足以量化实际完成度。

## 3. 社区热点

讨论量整体偏低：展示的 Issue 最高仅 **3 条评论**，所有展示条目的 👍 均为 0；PR 评论字段缺失，不能判断 PR 热度。

- **Kanban 任务所有权边界：3 条评论，当前可见讨论最多。**  
  [Issue #149512](https://github.com/NousResearch/hermes-agent/issues/149512) 报告：从 Kanban worker 手动触发 cron 后，子运行虽未继承 dispatcher 身份，仍可能通过显式 `task_id` 修改触发 worker 的卡片。核心诉求是让任务修改权限真正受运行所有权约束，而非仅依赖环境变量隔离。

- **Kanban 失败后的人工恢复：1 条评论。**  
  [Issue #149556](https://github.com/NousResearch/hermes-agent/issues/149556) 请求 `hermes kanban retry <task_id>`，处理旧失败标记让任务停在 `ready` 却无法重新调度的情况。诉求是提供明确、原子化的运维恢复动作。

- **TUI 看似就绪，队列实际永久阻塞：1 条评论。**  
  [Issue #149545](https://github.com/NousResearch/hermes-agent/issues/149545) 指出未确认的队首消息会阻塞整个队列，状态栏却仍显示 `ready`。这反映出恢复机制与界面状态缺乏一致性。

- **托管连接器授权无法自助恢复：1 条评论。**  
  [Issue #149531](https://github.com/NousResearch/hermes-agent/issues/149531) 涉及 Vercel 团队授权恢复工具不可用、Supabase 项目授权范围不清晰，直接影响无头自动化工作流。

- **Windows 后台运行体验：1 条评论。**  
  [Issue #149528](https://github.com/NousResearch/hermes-agent/issues/149528) 报告 MCP stdio 服务启动时闪现控制台窗口，显示个人助手场景对“安静运行”的要求仍未完全满足。

## 4. Bug 与稳定性

以下为基于潜在影响的分析排序，**并非维护者官方严重性评级**。“未见 fix PR”仅指所给明细中未展示。

### 高优先级：数据完整性与任务权限

| 问题 | 潜在影响 | Fix PR 状态 |
|---|---|---|
| [#149593：worktree prune 忽略 Git 探测失败](https://github.com/NousResearch/hermes-agent/issues/149593) | 可能将探测失败误判为无独有提交，从而删除仍有唯一提交的本地分支 | 未见 |
| [#149594：压缩边界 `/goal` 丢失](https://github.com/NousResearch/hermes-agent/issues/149594) | 子会话写入失败后仍归档父目标，导致目标无持久化副本 | 未见 |
| [#149512：cron 子运行修改触发 worker 卡片](https://github.com/NousResearch/hermes-agent/issues/149512) | 任务所有权检查可能被显式 `task_id` 绕过，影响调度状态正确性 | 未见 |
| [#149596：支付卡字段脱敏污染后续导出](https://github.com/NousResearch/hermes-agent/issues/149596) | 如 `"12"` 等短字段被全局精确替换，可能静默改写导出内容 | 未见 |
| [#149552：Kanban 任务正文截断后覆盖](https://github.com/NousResearch/hermes-agent/issues/149552) | 仅向模型发送前 4,000 字符后重写原文，存在需求信息丢失风险 | 未见 |

### 高优先级：服务中断与资源泄漏

| 问题 | 用户报告的影响 | Fix PR 状态 |
|---|---|---|
| [#149585：FTS5 错误被判为结构性数据库损坏](https://github.com/NousResearch/hermes-agent/issues/149585) | 生产 Gateway 约 22 小时拒绝所有写入，回复和 cron 均受影响 | 未见 |
| [#149563：Bot Chat 准入拒绝无日志、无回执](https://github.com/NousResearch/hermes-agent/issues/149563) | 报告称持续 7.5 小时投递中断且难以定位 | [#149584](https://github.com/NousResearch/hermes-agent/pull/149584) OPEN，仅补可观测性 |
| [#149520：Windows 更新中断留下空 venv](https://github.com/NousResearch/hermes-agent/issues/149520) | Gateway 无法启动，Desktop 陷入启动循环 | 未见 |
| [#149527：多编辑器 ACP 内存压力](https://github.com/NousResearch/hermes-agent/issues/149527) | 报告记录十余次 OOM kill，活跃工作被中断 | 未见 |
| [#149526：代码内核清理遗漏子进程](https://github.com/NousResearch/hermes-agent/issues/149526) | 忽略 SIGTERM 的后代进程可能在超时、重置后继续运行 | 未见 |

### 中优先级：执行正确性与交互一致性

- **合法工具调用被同名错误调用连带拒绝**：[Issue #149595](https://github.com/NousResearch/hermes-agent/issues/149595)，未见 fix PR。[PR #149573](https://github.com/NousResearch/hermes-agent/pull/149573) 处理的是重复调用 ID，**不是这一同名错误映射问题**。
- **长上下文模型调用反复超时**：[Issue #149555](https://github.com/NousResearch/hermes-agent/issues/149555) 报告约 320K 上下文下首事件等待受 240 秒检测阈值终止，未见对应修复。
- **成功回复被误判为服务商失败**：[Issue #149547](https://github.com/NousResearch/hermes-agent/issues/149547) 涉及以 `HTTP 2xx` 开头的正常回复被替换，未见对应修复。
- **Desktop 消息展示失真**：包括旧回复重复显示 [#149560](https://github.com/NousResearch/hermes-agent/issues/149560)、其他来源回合回复不更新 [#149518](https://github.com/NousResearch/hermes-agent/issues/149518)，均未见对应修复；压缩期间 steer 排序问题 [#149569](https://github.com/NousResearch/hermes-agent/issues/149569) 与 [PR #149570](https://github.com/NousResearch/hermes-agent/pull/149570) 方向相关，但摘要不足以确认完整覆盖。

**运维建议：**优先备份数据库与工作树；对自动清理分支、长任务正文重写和更新中断场景采取保守操作，不应把上述待合并 PR 当成已生效修复。

## 5. 功能请求与路线图信号

### 已有 PR，进入后续版本的信号较明确

- **个人助手向家庭共享扩展**：[PR #149578](https://github.com/NousResearch/hermes-agent/pull/149578) 提交 `household-tiers` 插件目录项，提供 owner/user/guest 分层及所有者记忆隔离。说明多用户权限边界开始成为个人助手的明确需求。
- **低门槛通信接入**：[PR #149592](https://github.com/NousResearch/hermes-agent/pull/149592) 提交 Africa’s Talking SMS/USSD 平台适配器，尝试覆盖包括功能机在内的手机入口。
- **智能体行为回归测试**：[PR #149582](https://github.com/NousResearch/hermes-agent/pull/149582) 提交 `agentci`，基于实际会话记录评估提示词、模型和版本变更后的行为。
- **桌面与终端易用性**：[PR #149581](https://github.com/NousResearch/hermes-agent/pull/149581) 增加从标签菜单访问工作区目录；[PR #149577](https://github.com/NousResearch/hermes-agent/pull/149577) 提供跨平台可配置的选择即复制。

### 仍以需求或设计为主

- **模型降级时保留用户选择权**：[Issue #149542](https://github.com/NousResearch/hermes-agent/issues/149542) 请求在限流、配额或计费失败时交互选择备用模型；未见实现 PR。
- **上下文引擎按会话退出接管**：[Issue #149554](https://github.com/NousResearch/hermes-agent/issues/149554) 希望插件引擎可拒绝特定会话，回退到内置压缩器，利于专用记忆引擎与普通聊天共存。
- **公开插件能力接口**：[Issue #149576](https://github.com/NousResearch/hermes-agent/issues/149576) 请求读取平台已启用工具与提供 cron 建议的公开扩展点。
- **存储抽象化**：[Issue #149558](https://github.com/NousResearch/hermes-agent/issues/149558) 与 [PR #149571](https://github.com/NousResearch/hermes-agent/pull/149571) 表明对话存储正探索统一接口、SQLite 后端化；这是架构信号，不能据此认定已完成迁移。

以上仅代表实现成熟度信号，**不构成下一版本承诺**。

## 6. 用户反馈摘要

数据没有提供评论正文，以下从 Issue 描述提炼，不代替完整社区情绪判断。

- **“失败可以接受，静默失败难以接受。”** TUI 显示 ready 却无法推进，Bot Chat 无日志拒绝投递，说明用户需要可信状态、明确失败原因和可执行恢复入口。相关：[TUI 队列](https://github.com/NousResearch/hermes-agent/issues/149545)、[Bot Chat 投递](https://github.com/NousResearch/hermes-agent/issues/149563)。
- **真实使用已超出短会话问答。** 多编辑器并行、长上下文、后台子智能体、定时任务与持久在线 Gateway，对内存、持久化和恢复能力提出更高要求。相关：[ACP OOM](https://github.com/NousResearch/hermes-agent/issues/149527)、[长上下文等待](https://github.com/NousResearch/hermes-agent/issues/149555)。
- **跨端一致性直接影响用户信任。** Desktop 重复展示或遗漏已有回复，会使用户难以判断“模型没回答”还是“界面没同步”。相关：[重复回复](https://github.com/NousResearch/hermes-agent/issues/149560)、[跨来源消息不同步](https://github.com/NousResearch/hermes-agent/issues/149518)。
- **缺少可验证的正向满意度证据。** 插件投稿体现贡献意愿，但不能替代用户满意度数据；当前样本主要呈现问题反馈。

## 7. 待处理积压与维护者关注

**无法识别长期未响应积压。** 可见条目均为 11 月 5 日创建，且没有维护者回复、审查等待时长或历史积压数据；不能将这些新问题标为“长期无人处理”。

建议建立以下优先跟踪队列：

1. **先核实数据损失风险**：为 [分支误删 #149593](https://github.com/NousResearch/hermes-agent/issues/149593)、[目标丢失 #149594](https://github.com/NousResearch/hermes-agent/issues/149594)、[导出污染 #149596](https://github.com/NousResearch/hermes-agent/issues/149596) 补充复现、回归测试和保护措施。
2. **将“补日志”与“恢复服务”拆开验收**：[Bot Chat #149563](https://github.com/NousResearch/hermes-agent/issues/149563) 即使合入 [PR #149584](https://github.com/NousResearch/hermes-agent/pull/149584)，仍需确认永久拒绝状态如何解除。
3. **核对重大故障的修复归属**：[数据库隔离 #149585](https://github.com/NousResearch/hermes-agent/issues/149585)、[Windows 更新中断 #149520](https://github.com/NousResearch/hermes-agent/issues/149520) 均有明显可用性影响，当前未见对应 fix PR。
4. **严格审查高影响基础设施改动**：[缓存回收 #149591](https://github.com/NousResearch/hermes-agent/pull/149591) 应验证重试语义不被破坏；[存储重构 #149571](https://github.com/NousResearch/hermes-agent/pull/149571) 应明确前置依赖与迁移验证。

**健康度结论：贡献活跃、修复方向清晰，但可靠性交付仍需验证。** 当前最重要的不是新增能力数量，而是高影响问题能否形成“复现—修复—测试—发布—关闭”的完整闭环。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报
**日期：2026-11-06｜统计范围：所提供的过去 24 小时数据**

> **数据说明：**项目标识为 [`qwibitai/nanoclaw`](https://github.com/qwibitai/nanoclaw)，但两条 PR 的链接信息均指向 `nanocoai/nanoclaw`。下文沿用数据中的 PR 仓库路径，归属关系仍需核实；结论仅覆盖本次提供的数据。

## 1. 今日速览

过去 24 小时，NanoClaw 共有 **2 条 PR 更新、0 条 Issue 更新、0 个新版本发布**，可见活跃度较低，且集中于自动化镜像维护。两条 PR 均由 `nanoclaw-image-refresh[bot]` 发起，为 `v2026.10.0` 更新加固镜像映射，目前均处于待合并状态。今日没有 PR 合并或关闭，因此尚无可确认已落地的功能、修复或镜像更新。维护信号偏向运行环境加固，但仅凭这些数据不足以判断整体开发节奏或社区健康度。相关：[PR #4269](https://github.com/nanocoai/nanoclaw/pull/4269)、[PR #4268](https://github.com/nanocoai/nanoclaw/pull/4268)。

## 2. 项目进展

**今日无合并或关闭的重要 PR，主要进展仍处于提案阶段。**

| 待合并 PR | 更新内容 | 进展判断 |
|---|---|---|
| [#4269](https://github.com/nanocoai/nanoclaw/pull/4269) | 将 `v2026.10.0` 对应的加固镜像更新为 `v2026.10.0-20261105T0502`，目标摘要以 `383df1b9…` 开头 | 时间标记较新，但尚未合并，不能视为已交付 |
| [#4268](https://github.com/nanocoai/nanoclaw/pull/4268) | 将同一版本对应的加固镜像更新为 `v2026.10.0-20261105T0305`，目标摘要以 `dd7895fe…` 开头 | 与 #4269 更新目标重叠，需确认是否仍需保留 |

两条摘要显示它们均替换以 `11a88ec9…` 开头的旧镜像摘要。维护者宜确认是否仅保留较新的候选，避免重复更新或映射冲突；**目前没有证据表明 #4269 已正式取代 #4268**。现有摘要也未提供具体依赖变更、漏洞修复或验证结果，无法量化此次加固收益。

## 3. 社区热点

**今日没有足够数据识别真实的讨论热点。**两条 PR 的 👍 均为 **0**，评论字段均为 `undefined`，表示评论数据缺失，不能按“零评论”处理，也无法据此进行讨论热度排名。

唯一可见的共同主题是 **Agent 加固镜像刷新**，反映的是自动化维护行为，而非已证实的用户诉求。若继续跟踪，值得关注镜像变更说明、扫描或测试结果，以及两个候选之间的差异。[PR #4269](https://github.com/nanocoai/nanoclaw/pull/4269) · [PR #4268](https://github.com/nanocoai/nanoclaw/pull/4268)

## 4. Bug 与稳定性

- **新增 Bug、崩溃或回归报告：本次数据中未出现。**过去 24 小时无 Issue 更新，但这不代表项目不存在未解决问题。[项目 Issues](https://github.com/qwibitai/nanoclaw/issues)
- **镜像加固更新：有待合并，影响程度未知。**两条 PR 未披露具体漏洞、故障场景或修复验证，不能将其认定为某个已报告 Bug 的 fix PR，也无法赋予严重性等级。[PR #4269](https://github.com/nanocoai/nanoclaw/pull/4269) · [PR #4268](https://github.com/nanocoai/nanoclaw/pull/4268)

## 5. 功能请求与路线图信号

本次数据中没有新增功能请求，也没有可见的用户需求讨论。已有 PR 仅支持判断：当前可见工作集中于 **`v2026.10.0` 的镜像维护**，不涉及可确认的新增功能、破坏性变更或下一版本承诺。若获合并，它们可能改变该版本对应的加固镜像，但具体生效机制与发布时间尚不明确。[PR #4269](https://github.com/nanocoai/nanoclaw/pull/4269) · [PR #4268](https://github.com/nanocoai/nanoclaw/pull/4268)

## 6. 用户反馈摘要

**暂无可提炼的真实用户反馈。**本次未提供 Issue 或评论正文，PR 也均由机器人创建，因此无法可靠总结用户痛点、使用场景或满意度；不宜将镜像更新解释为用户对安全性或稳定性的抱怨。[项目 Issues](https://github.com/qwibitai/nanoclaw/issues)

## 7. 待处理积压

**无法识别长期未响应事项：**缺少历史未结项清单，两条 PR 均创建于 2026-11-05，不能归类为长期积压。当前可提醒维护者关注：

1. **确认镜像候选的取舍。**核对两个镜像的差异及验证结果，明确是否合并较新候选并关闭重复项。[#4269](https://github.com/nanocoai/nanoclaw/pull/4269) · [#4268](https://github.com/nanocoai/nanoclaw/pull/4268)
2. **补充可审计的变更依据。**建议说明加固内容、扫描或测试结果，便于评估更新必要性与部署风险。[#4269](https://github.com/nanocoai/nanoclaw/pull/4269)
3. **核实仓库归属。**确认项目仓库与 PR 链接不一致的原因，避免后续日报混入其他仓库的动态。[项目仓库](https://github.com/qwibitai/nanoclaw) · [PR 所属仓库](https://github.com/nanocoai/nanoclaw)

**健康度结论：**可见自动化维护仍在运行，但今日没有已交付变更或可验证的社区讨论。短期应重点跟踪镜像 PR 的审核与合并，以及数据源归属的准确性。

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
**日期：2026-11-06｜仓库：[netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)**

> **统计口径**：依据提供的过去 24 小时数据；所列 PR 的创建、更新时间均为 2026-11-05。9 条 PR 仅标记为 `CLOSED`，无法逐一确认是否合并；下文将其称为“已关闭”，不等同于全部已交付。评论数为 `undefined`，不能据此判断讨论热度。

## 1. 今日速览

过去 24 小时记录到 **12 条 PR 更新，其中 3 条待合并、9 条已关闭**，没有 Issue 更新，也没有新版本发布。开发工作集中在 **OpenClaw 启动性能、桌面伴侣交互稳定性、图片消息处理和 DeepSeek Harness（dsh）运行管理**，属于以体验修复和性能优化为主的维护窗口。全部可见 PR 均由同一作者提交，说明当前提交活动集中，但不能据此推断项目整体贡献者结构。总体来看，工程活动较活跃，不过实际合并率、修复验证结果及用户讨论情况仍缺少数据支撑。  
[查看 PR 列表](https://github.com/netease-youdao/LobsterAI/pulls)

## 2. 项目进展

### OpenClaw：连续优化启动后的可用速度
- **更早连接 Gateway 客户端**：#3000 针对 Windows 上 Gateway 报告就绪后，桌面客户端仍需 **2.3–2.7 秒**才能完成握手的问题，调整模块加载及串行初始化步骤。该数字是优化前的问题基线，摘要未提供最终耗时。**状态：已关闭。**  
  [PR #3000](https://github.com/netease-youdao/LobsterAI/pull/3000)
- **减少启动阶段无效工作**：#3002 将 Windows 注册表根目录和控制台代码页读取改为原生方式，替代 5 次同步外部命令调用；#3001 在 dreaming 关闭时跳过相关启动清理。两项均指向减少主进程阻塞及不必要的后台工作。#3004 补充测量文档，其描述明确提到 #3002 已合并。**三项均已关闭。**  
  [PR #3002](https://github.com/netease-youdao/LobsterAI/pull/3002) · [PR #3001](https://github.com/netease-youdao/LobsterAI/pull/3001) · [PR #3004](https://github.com/netease-youdao/LobsterAI/pull/3004)

### Cowork：改善图片会话的性能与复用
- **避免生成图片在消息元数据中重复内嵌**：#2999 针对一个 413 条消息、13 张图片的会话出现秒级卡顿的问题；摘要显示，其消息元数据达到 **1.12 GB**，52 MB 图片以 base64 形式被重复存储约 21 次。该修复直接针对会话数据膨胀这一重要瓶颈。**状态：已关闭。**  
  [PR #2999](https://github.com/netease-youdao/LobsterAI/pull/2999)
- **复制用户消息时保留图片**：#3009 为带图片消息写入包含图片的 HTML 剪贴板内容，修复“复制后粘贴仅剩文字”的体验缺口。**状态：已关闭。**  
  [PR #3009](https://github.com/netease-youdao/LobsterAI/pull/3009)

### 桌面伴侣：改善 macOS 窗口与登录流程
- #3006 处理面板重开后没有键盘焦点、随即闪退隐藏的问题；#3003 调整任务卡片在全屏应用上方的展示，并处理隐藏窗口重新打开时的位置跳动。**均已关闭。**  
  [PR #3006](https://github.com/netease-youdao/LobsterAI/pull/3006) · [PR #3003](https://github.com/netease-youdao/LobsterAI/pull/3003)
- #3005 推进划词请求在登录后继续执行，目标是减少用户从免登录翻译进入解释、总结、追问、朗读等功能时的中断。**状态：已关闭。**  
  [PR #3005](https://github.com/netease-youdao/LobsterAI/pull/3005)

**进展判断**：本轮不是大规模能力扩张，而是对“启动—交互—多模态会话”主链路的集中打磨；覆盖面较广，但尚无新版本发布或完整验收数据，不能将全部改动视为已经向用户交付。

## 3. 社区热点

**无法按讨论量排名**：没有活跃 Issue，全部 PR 的评论数缺失、👍 均为 0。以下是按用户影响筛选的关注主题，而非“最热讨论”：

| 关注主题 | 背后的诉求 | 相关链接 |
|---|---|---|
| 图片多的会话卡顿、数据膨胀 | 多模态助手需要在长期使用后仍保持流畅 | [#2999](https://github.com/netease-youdao/LobsterAI/pull/2999) |
| 内置 dsh 无法安装插件 | 桌面应用应开箱即用，不依赖用户预装命令行工具 | [#3007](https://github.com/netease-youdao/LobsterAI/pull/3007) |
| Gateway 就绪后仍有等待 | 用户关心真正可交互的时间，而非仅服务启动完成 | [#3000](https://github.com/netease-youdao/LobsterAI/pull/3000) |

## 4. Bug 与稳定性

以下为本窗口 PR 暴露或处理的问题，**不代表均在今日首次报告**；严重程度按已知用户影响评估。

| 优先级 | 问题及影响 | Fix PR / 状态 |
|---|---|---|
| **高** | 图片重复内嵌使会话元数据膨胀至 GB 级，打开会话时卡顿数秒 | [#2999](https://github.com/netease-youdao/LobsterAI/pull/2999)，已关闭 |
| **高** | dsh 插件安装依赖 PATH 中的 `pnpm`，从 Dock/开始菜单启动时可能报 `pnpm was not found`，阻断插件安装 | [#3007](https://github.com/netease-youdao/LobsterAI/pull/3007)，待合并 |
| **中** | macOS 正常退出后 dsh 进程仍监听端口，重启后设置显示未运行且未回收残留进程 | [#3008](https://github.com/netease-youdao/LobsterAI/pull/3008)，待合并 |
| **中** | 多个安装实例共享配置时，无模型配置同步路径需要重新渲染，涉及重装、更换目录和移动 macOS 应用等场景 | [#3010](https://github.com/netease-youdao/LobsterAI/pull/3010)，待合并 |
| **中** | macOS 桌面伴侣面板闪关、任务卡片全屏可见性及窗口位置异常 | [#3006](https://github.com/netease-youdao/LobsterAI/pull/3006) · [#3003](https://github.com/netease-youdao/LobsterAI/pull/3003)，均已关闭 |
| **低** | 复制带图片的用户消息时丢失图片 | [#3009](https://github.com/netease-youdao/LobsterAI/pull/3009)，已关闭 |

数据中没有独立的崩溃报告，也不足以判定上述问题是否属于近期回归。

## 5. 功能请求与路线图信号

没有新增 Issue，因此**没有可确认的新增社区功能请求**。从现有 PR 可观察到以下短期方向：

- **完善桌面伴侣的登录后连续体验**：#3005 显示项目正在减少免登录翻译与登录功能之间的操作断点，而非单纯增加登录提示。是否进入下一版本仍需发布记录确认。  
  [PR #3005](https://github.com/netease-youdao/LobsterAI/pull/3005)
- **强化内置 dsh 的自包含运行能力**：#3007 拟使用随应用提供的 pnpm，并将 dsh 升至 `0.2.2-rc.1`；结合 #3008 的退出清理，说明插件安装和运行生命周期是近期重点。这里的依赖升级**不等于 LobsterAI 新版本发布**。  
  [PR #3007](https://github.com/netease-youdao/LobsterAI/pull/3007) · [PR #3008](https://github.com/netease-youdao/LobsterAI/pull/3008)
- **继续降低 OpenClaw 的环境与启动摩擦**：启动优化之后仍有安装路径同步修复待处理，体现对真实桌面部署场景的持续补齐。  
  [PR #3010](https://github.com/netease-youdao/LobsterAI/pull/3010)

## 6. 用户反馈摘要

**没有 Issue 评论可供提炼**；以下仅来自 PR 描述中的用户反馈或问题案例，不代表社区总体满意度：

- **图片消息难以复用**：用户明确反馈复制带图片任务再粘贴时只剩文字，影响重复执行或修改任务的流程。  
  [PR #3009](https://github.com/netease-youdao/LobsterAI/pull/3009)
- **富媒体历史会话性能不足**：含生成图片的长会话出现明显打开延迟，说明数据存储方式会直接影响持续使用体验。  
  [PR #2999](https://github.com/netease-youdao/LobsterAI/pull/2999)
- **登录门槛打断划词工作流**：PR 描述指出，登录提示看起来像错误、缺少登录理由，是免登录翻译用户进入高级功能时的障碍。该判断来自维护者描述，未提供转化率数据。  
  [PR #3005](https://github.com/netease-youdao/LobsterAI/pull/3005)

## 7. 待处理积压

**无法确认长期未响应积压**：当前 3 条开放 PR 均创建于 2026-11-05，属于近期工作，不宜标记为长期搁置。建议按影响优先跟进：

1. **#3007：插件安装阻断**——优先验证无全局 pnpm 的干净环境，以及从 Dock/开始菜单启动的安装链路。  
   [查看 PR](https://github.com/netease-youdao/LobsterAI/pull/3007)
2. **#3008：退出后残留进程**——验证正常退出、重启及残留回收，确保运行状态显示与实际进程一致。  
   [查看 PR](https://github.com/netease-youdao/LobsterAI/pull/3008)
3. **#3010：安装路径同步**——覆盖开发版与安装版共用配置、重装换目录、macOS 应用移动等场景。  
   [查看 PR](https://github.com/netease-youdao/LobsterAI/pull/3010)

**健康度结论**：项目当前展现出较强的修复与性能治理活动；主要待观察点是开放修复的验证落地、已关闭 PR 的实际交付状态，以及后续版本是否将这些改善集中发布。

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

# CoPaw 项目动态日报｜2026-11-06

> **统计范围**：所提供的过去 24 小时 GitHub 更新数据；条目创建、更新时间均标记为 2026-11-05。数据中的 Issue/PR 指向 `agentscope-ai/QwenPaw`，下文沿用这些链接，不据此推断仓库更名或迁移关系。无新版本发布，故省略版本发布章节。

## 1. 今日速览

过去 24 小时共更新 **4 条 Issue、5 条 PR**，目前全部开放，无 Issue 关闭、无 PR 合并或关闭。开发活动覆盖聊天界面、插件导航、记忆插件兼容性和 Windows 历史检索，说明项目仍有持续的功能与维护投入。用户反馈主要集中在 **Creator 工作流阻断、插件安装失败和多模型配置体验**，其中 Creator 审核无法完成最值得优先排查。整体呈现“**开发活跃，但修复尚未交付**”的状态；由于缺少历史基线，无法判断活跃度是否上升。

## 2. 项目进展

**今日没有已合并或已关闭的重要 PR，不能将待审变更视为已交付成果。** 当前推进集中在以下五项：

| 待合并 PR | 推进方向与预期价值 | 当前状态 |
|---|---|---|
| [#8594：拖拽调整会话宽度](https://github.com/agentscope-ai/QwenPaw/pull/8594) | 为会话列两侧增加拖拽手柄，改善宽屏利用率，支持调整消息区和输入区宽度 | OPEN，size/L |
| [#8593：保留插件设置页导航](https://github.com/agentscope-ai/QwenPaw/pull/8593) | 明确关联 #8590，修复进入插件设置页后左侧导航退回会话列表的问题 | OPEN，size/M |
| [#8589：稳定生命周期测试](https://github.com/agentscope-ai/QwenPaw/pull/8589) | 缓解浏览器 worker 启动和插件异步清理引发的测试竞态，提高测试结果可信度 | OPEN，size/XS |
| [#8588：OpenViking 后续修整](https://github.com/agentscope-ai/QwenPaw/pull/8588) | 适配当前 `HintBlock` 格式下的自动召回预算，处理关闭边界情况及插件内清理 | OPEN，size/XL |
| [#8587：Windows 历史 SQLite URI 修复](https://github.com/agentscope-ai/QwenPaw/pull/8587) | 兼容 `\\?\C:\...` 扩展长度路径，解决特定 Windows 工作区的历史召回失败 | OPEN，size/S |

**进展判断**：修复与体验优化的候选方案已有积累，但实际推进幅度仍取决于后续审查、测试和合并，当前不能确认用户侧问题已缓解。

## 3. 社区热点

当前讨论量较低：4 条 Issue 合计 **5 条评论**，全部条目均为 **0 个 👍**；PR 评论数字段缺失，不能据此排名或认定无人讨论。

- **Creator 审核永久无法决策：当前评论最多。**  
  [Issue #8592](https://github.com/agentscope-ai/QwenPaw/issues/8592) 有 **2 条评论**，将审核失败、素材链接失效和 FFmpeg 路径配置问题集中报告。核心诉求是恢复可完成、可恢复的创作审核流程，而不仅是改善错误提示。

- **官方 Creator 插件无法安装。**  
  [Issue #8595](https://github.com/agentscope-ai/QwenPaw/issues/8595) 有 **1 条评论**。UI 与 CLI 均出现包元数据缺失错误，影响用户进入功能的第一步，值得排查安装包及热安装链路。

- **Creator 多模型配置与界面状态不一致。**  
  [Issue #8591](https://github.com/agentscope-ai/QwenPaw/issues/8591) 有 **1 条评论**。用户需要分别使用图像、视频与语言模型，但反馈 API Key 被强制一致，同时按钮可见性和启停状态不清晰。

- **插件设置页导航已有对应修复提案。**  
  [Issue #8590](https://github.com/agentscope-ai/QwenPaw/issues/8590) 有 **1 条评论**，对应 [PR #8593](https://github.com/agentscope-ai/QwenPaw/pull/8593) 已开放。这是本批数据中最明确的“反馈—修复提案”闭环，但尚未完成交付。

## 4. Bug 与稳定性

以下严重度为基于摘要的分析排序，**并非维护者官方定级**。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **高：核心流程阻断** | [#8592](https://github.com/agentscope-ai/QwenPaw/issues/8592)：Creator 审核轮次无法完成决策，执行 REJECT 持续返回 422，提示引用了不存在的视觉素材 ID | 所给数据中未见对应 fix PR |
| **高：安装阻断** | [#8595](https://github.com/agentscope-ai/QwenPaw/issues/8595)：`qwenpaw-creator` v2.0.4 经 UI、CLI 安装均报 `No package metadata was found` | 未见对应 fix PR |
| **中高：特定环境功能不可用** | [#8587](https://github.com/agentscope-ai/QwenPaw/pull/8587)：Windows 扩展长度路径生成 SQLite 不接受的 URI，导致 `recall_history` 失败 | 已有修复 PR，待合并 |
| **中：素材访问与工具配置异常** | [#8592](https://github.com/agentscope-ai/QwenPaw/issues/8592)：同一报告还包含 provider `source_url` 过期相关 502，以及 `frame_stats` 忽略 `CREATOR_FFMPEG_PATH` | 未见对应 fix PR；建议拆分追踪 |
| **中：配置与状态可信度问题** | [#8591](https://github.com/agentscope-ai/QwenPaw/issues/8591)：用户反馈模型启用状态与按钮不一致，不同模型被要求共用 API Key | 未见对应 fix PR |
| **中低：导航一致性缺陷** | [#8590](https://github.com/agentscope-ai/QwenPaw/issues/8590)：插件设置页能够打开，但左侧导航错误切回会话列表 | [#8593](https://github.com/agentscope-ai/QwenPaw/pull/8593) 待合并 |

此外，[#8588](https://github.com/agentscope-ai/QwenPaw/pull/8588) 和 [#8589](https://github.com/agentscope-ai/QwenPaw/pull/8589) 分别关注插件关闭边界和测试竞态。它们体现出稳定性维护投入，但摘要不足以证明存在广泛崩溃或已确认回归。

## 5. 功能请求与路线图信号

- **更灵活的聊天布局：已有实现，具备近期候选条件。**  
  [PR #8594](https://github.com/agentscope-ai/QwenPaw/pull/8594) 将固定宽度会话列改为可拖拽调节，面向宽屏和不同输入、阅读偏好的用户。尚无发布排期，不能确认进入下一版本。

- **插件页面应融入原生设置体验：已有修复提案。**  
  [Issue #8590](https://github.com/agentscope-ai/QwenPaw/issues/8590) 与 [PR #8593](https://github.com/agentscope-ai/QwenPaw/pull/8593) 表明，插件扩展不仅需要“可注册页面”，还需要与宿主导航保持一致。

- **Creator 多模型凭证独立配置：需求明确，实现信号不足。**  
  [Issue #8591](https://github.com/agentscope-ai/QwenPaw/issues/8591) 暗示用户正组合使用不同图像、视频和语言模型。独立 API Key、清晰启停状态和按钮对比度值得纳入体验修整，但当前未见对应 PR。

- **记忆插件兼容性持续维护。**  
  [PR #8588](https://github.com/agentscope-ai/QwenPaw/pull/8588) 是 OpenViking 集成的后续工作，释放出接口适配与生命周期完善的信号，而非新的记忆能力发布承诺。

## 6. 用户反馈摘要

> 数据仅提供评论数量，未提供评论正文。以下提炼自 Issue 标题与摘要，不能代表完整讨论或维护者回应。

- **创作流程必须能够收尾和恢复。** 用户遇到的不只是一次请求失败，而是审核轮次持续无法决策，影响项目继续推进。[#8592](https://github.com/agentscope-ai/QwenPaw/issues/8592)
- **官方插件应有可靠的安装入口。** UI 与 CLI 均失败，意味着常规切换安装方式也无法绕过问题。[#8595](https://github.com/agentscope-ai/QwenPaw/issues/8595)
- **多模态使用场景要求配置解耦。** 用户实际使用的图像、视频和 LLM 并非同一模型，统一凭证约束与其工作方式不匹配。[#8591](https://github.com/agentscope-ai/QwenPaw/issues/8591)
- **插件应具备接近内置页面的交互一致性。** 同处设置区却出现不同导航行为，会削弱用户的位置感与操作预期。[#8590](https://github.com/agentscope-ai/QwenPaw/issues/8590)

本批数据以问题反馈为主，**没有足够证据评估整体满意度或满意度变化**。

## 7. 待处理积压与维护建议

**无法识别长期未响应积压**：本批条目均为 2026-11-05 创建，且缺少评论正文、维护者响应时间和历史列表。建议将以下内容作为近期跟踪队列，而非长期积压结论：

1. **优先分诊 Creator 阻断问题**：将 [#8592](https://github.com/agentscope-ai/QwenPaw/issues/8592) 的三个独立缺陷拆分跟踪，优先明确审核轮次恢复方案。
2. **核验官方插件安装链路**：排查 [#8595](https://github.com/agentscope-ai/QwenPaw/issues/8595) 的包元数据、打包产物与热安装流程，避免新增用户持续受阻。
3. **推动已有修复完成验证**：重点检查 [#8593](https://github.com/agentscope-ai/QwenPaw/pull/8593) 的插件导航回归，以及 [#8587](https://github.com/agentscope-ai/QwenPaw/pull/8587) 的 Windows 路径兼容测试。
4. **关注大型 PR 的审查负担**：[#8588](https://github.com/agentscope-ai/QwenPaw/pull/8588) 标记为 size/XL，应重点验证接口兼容与关闭边界；当前没有证据表明其已滞留。

**健康度结论**：项目有持续贡献和明确的修复方向，但 Creator 安装与审核链路暴露出较高用户影响风险。下一阶段最重要的指标不是新增 PR 数量，而是阻断问题能否获得可验证修复，以及待审变更能否转化为实际交付。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：2026-11-06**  
**统计口径：所提供的过去 24 小时 GitHub 更新；条目显示的创建、更新时间均为 2026-11-05。**

## 1. 今日速览

过去 24 小时，ZeroClaw 有 **6 条 Issue、13 条 PR 更新**，全部处于开放状态，**无合并、关闭或新版本发布**。开发活动较集中：13 条 PR 来自 3 位贡献者，重点涉及 RPC 权限安全、受限权限 Dashboard 聊天，以及工具执行与运行时稳定性。最值得关注的是标记为 **P1 / 高风险**的 [RPC 权限修复 #12239](https://github.com/zeroclaw-labs/zeroclaw/pull/12239)，以及面向 v0.9.0 的 [Dashboard 聊天改造 #12244](https://github.com/zeroclaw-labs/zeroclaw/pull/12244)。整体呈现“**提交活跃、修复供给充足，但尚未形成合并交付**”的状态；单日数据不足以判断长期维护效率。

## 2. 项目进展

### 已落地进展：今日无合并或关闭记录

本次数据没有可确认已进入主分支的功能或修复，因此不能把下列 PR 视为已交付成果。当前主要进展体现在实现方案和修复候选的形成。

| 推进方向 | 待合并进展 | 当前意义 |
|---|---|---|
| Dashboard 与核心运行时打通 | [#12244](https://github.com/zeroclaw-labs/zeroclaw/pull/12244) 通过共享 RPC 客户端支持受限权限 Dashboard 聊天 | 标记 `release:v0.9.0`、体量 XL；明确依赖 [#11964](https://github.com/zeroclaw-labs/zeroclaw/pull/11964) 先合并，存在交付前置条件 |
| 权限感知界面 | [#12251](https://github.com/zeroclaw-labs/zeroclaw/pull/12251) 为会话接口增加 `features.config`，仅向可读取配置的账户展示配置页面 | 与 [Issue #12249](https://github.com/zeroclaw-labs/zeroclaw/issues/12249) 对应，减少界面能力与实际授权不一致 |
| 工具调用兼容性 | [#12255](https://github.com/zeroclaw-labs/zeroclaw/pull/12255) 识别 LFM `<\|tool_call_start\|>` 函数式工具调用 | 补齐没有原生 `tools` 数组时的文本回退解析 |
| Agent 上下文一致性 | [#12242](https://github.com/zeroclaw-labs/zeroclaw/pull/12242) 为独立 delegate 加载统一人格文件与截断规则；[#12241](https://github.com/zeroclaw-labs/zeroclaw/pull/12241) 保持延迟工具列表在激活前后稳定 | 减少委派上下文缺失和会话中系统提示变化 |

**进度判断：** 当日工作主要推进了安全边界收敛与使用一致性，但实际交付增量仍需以合并、测试结果和后续发布为准。

## 3. 社区热点

**数据限制：** 6 条 Issue 均为 0 评论、0 👍；PR 评论数为 `undefined`，不能视为 0，也无法据此排序“讨论热度”。以下按关联条目和工程影响归纳，而非按社区互动量排名。

- **受限权限 Dashboard 聊天成为集中工作区。**  
  [主 PR #12244](https://github.com/zeroclaw-labs/zeroclaw/pull/12244) 周边出现身份提供方故障处理、拒绝信息展示、代理列表缓存及令牌清理等跟进任务。核心诉求不是单纯“能聊天”，而是让聊天在权限变化、配置重载和身份服务异常下仍保持正确行为。

- **监督模式需要避免无效审批。**  
  [Issue #12248](https://github.com/zeroclaw-labs/zeroclaw/issues/12248) 与 [PR #12254](https://github.com/zeroclaw-labs/zeroclaw/pull/12254) 要求先检查工具是否存在、是否属于当前轮次，再触发审批。其价值在于减少无效人工确认，避免审批流程给出“批准后即可执行”的错误预期。

- **依赖治理采用临时例外，而非立即替换。**  
  [Issue #12252](https://github.com/zeroclaw-labs/zeroclaw/issues/12252) 与 [PR #12253](https://github.com/zeroclaw-labs/zeroclaw/pull/12253) 拟暂时接受 `pin-utils` 的维护状态公告 `RUSTSEC-2026-0441`，待 `async-imap` 依赖链迁移后移除例外。这属于维护风险处置，不应直接描述为已确认可利用漏洞的修复。

## 4. Bug 与稳定性

以下按已知标签及潜在影响排序；除 #12239 外，优先级为分析判断，并非项目官方定级。**所有列出的修复 PR 均未合并。**

| 严重程度 | 问题与影响 | 修复状态 |
|---|---|---|
| **高：项目标记 P1 / risk:high** | RPC 会话操作在等待后、或后续异步步骤之后，可能未持续确认当前权限；撤权、降权或所有权变化后仍可能提交会话效果 | 已有 [PR #12239](https://github.com/zeroclaw-labs/zeroclaw/pull/12239)，涉及授权时序边界 |
| **安全加固优先** | RPC 握手产生的 bearer token 副本需在释放时擦除，覆盖客户端及 daemon 进程内传输、认证路径 | [Issue #12246](https://github.com/zeroclaw-labs/zeroclaw/issues/12246)；所给列表中无独立 fix PR |
| **中高：身份服务故障恢复** | 身份提供方不可达时，受限聊天应仅让当前请求失败，不应清除登录；还需限制 daemon 令牌验证频率 | [Issue #12245](https://github.com/zeroclaw-labs/zeroclaw/issues/12245)；所给列表中无独立 fix PR |
| **中：信息展示与缓存一致性** | daemon 拒绝原文不应逐字透传给受限浏览器；配置重载前缓存的 agent 列表不应继续提供 | [Issue #12247](https://github.com/zeroclaw-labs/zeroclaw/issues/12247)；所给列表中无独立 fix PR |
| **中：工具执行流程** | 不存在或当前轮次不可用的工具也会触发审批 | 已有 [PR #12254](https://github.com/zeroclaw-labs/zeroclaw/pull/12254)，对应 [#12248](https://github.com/zeroclaw-labs/zeroclaw/issues/12248) |
| **中：任务配置持久化** | `cron update --agent` 验证通过并显示成功，但存储中的所属 Agent 没有改变 | 已有 [PR #12240](https://github.com/zeroclaw-labs/zeroclaw/pull/12240)；修复命令式任务的重分配路径 |
| **中：资源槽位无法释放** | 空 Canvas 长期保留，`clear` 后仍占用最多 100 个 Canvas 的额度 | 已有 [PR #12250](https://github.com/zeroclaw-labs/zeroclaw/pull/12250) |
| **中：模型工具调用解析** | LFM 特殊 token 包裹的函数式工具调用未被文本回退解析器识别 | 已有 [PR #12255](https://github.com/zeroclaw-labs/zeroclaw/pull/12255) |
| **测试稳定性** | 短生命周期 Tokio runtime 共用测试客户端缓存，复用空闲 HTTP 连接时可能出现 `dispatch task is gone` 等错误 | 已有 [PR #12238](https://github.com/zeroclaw-labs/zeroclaw/pull/12238)；改动针对测试客户端缓存，不宜外推为生产故障 |
| **低：迁移可观测性** | `config migrate` 未输出已退役 `ZEROCLAW_*` 环境变量的忽略警告 | 已有 [PR #12256](https://github.com/zeroclaw-labs/zeroclaw/pull/12256) |

## 5. 功能请求与路线图信号

今日新增 Issue 均为维护或后续修正任务，**未见独立的全新用户功能提案**。较明确的路线图信号如下：

- **v0.9.0 聚焦权限与 Dashboard 链路。**  
  [#12244](https://github.com/zeroclaw-labs/zeroclaw/pull/12244)、[#12251](https://github.com/zeroclaw-labs/zeroclaw/pull/12251)、[#12239](https://github.com/zeroclaw-labs/zeroclaw/pull/12239) 均带有 `release:v0.9.0` 标签，说明受限聊天、配置读取权限和 RPC 授权一致性是该版本的目标工作，但不代表已确定随版本发布。

- **多 Agent 运行行为趋向统一。**  
  [delegate 上下文修复 #12242](https://github.com/zeroclaw-labs/zeroclaw/pull/12242) 与 [cron Agent 重分配修复 #12240](https://github.com/zeroclaw-labs/zeroclaw/pull/12240) 反映项目正在补齐委派、调度与 Agent 归属之间的一致性。

- **工具生态兼容与提示稳定性持续完善。**  
  [LFM 解析支持 #12255](https://github.com/zeroclaw-labs/zeroclaw/pull/12255) 和 [延迟工具列表稳定化 #12241](https://github.com/zeroclaw-labs/zeroclaw/pull/12241) 已有实现候选，但没有所给数据支持的版本承诺。

## 6. 用户反馈摘要

**未提供 Issue 评论正文，因此无法提炼或引用真实评论，也无法判断用户满意度。** 从任务和 PR 描述中可以确认的使用痛点包括：

- **“显示成功却没有生效”损害操作可信度：** cron 的 Agent 重分配问题具有明确的反馈与持久化不一致，见 [#12240](https://github.com/zeroclaw-labs/zeroclaw/pull/12240)。
- **长时间运行会累积资源问题：** Canvas 清空后仍占槽位，可能迫使用户重启进程，见 [#12250](https://github.com/zeroclaw-labs/zeroclaw/pull/12250)。
- **权限体验应与实际能力匹配：** 无配置读取权限的账户仍看到配置入口，见 [#12249](https://github.com/zeroclaw-labs/zeroclaw/issues/12249)。
- **后台监听行为需要准确文档：** 邮件通道即使未绑定到 Agent，也可能由审批路由启动 IMAP 监听；文档修正见 [#12243](https://github.com/zeroclaw-labs/zeroclaw/pull/12243)。

这些是提交描述反映的问题场景，不等同于评论区反馈或普遍用户态度。

## 7. 待处理积压

本批条目均于 2026-11-05 创建，**没有证据可将其认定为“长期未响应”积压**。建议重点跟踪以下待办：

1. **优先完成高风险授权修复审查。**  
   [#12239](https://github.com/zeroclaw-labs/zeroclaw/pull/12239) 是本批唯一明确带 P1 / 高风险标签的 PR，应重点验证异步等待后的撤权、降权及所有权变更场景。

2. **跟踪大 PR 的前置依赖与后续安全任务。**  
   [#12244](https://github.com/zeroclaw-labs/zeroclaw/pull/12244) 依赖 [#11964](https://github.com/zeroclaw-labs/zeroclaw/pull/11964)，且相关的 [#12245](https://github.com/zeroclaw-labs/zeroclaw/issues/12245)、[#12246](https://github.com/zeroclaw-labs/zeroclaw/issues/12246)、[#12247](https://github.com/zeroclaw-labs/zeroclaw/issues/12247) 尚无本次列表可见的独立修复 PR，需要明确关闭条件和集成顺序。

3. **为临时依赖例外保留退出条件。**  
   [#12252](https://github.com/zeroclaw-labs/zeroclaw/issues/12252) / [#12253](https://github.com/zeroclaw-labs/zeroclaw/pull/12253) 应随 `async-imap` 依赖迁移复查，避免临时豁免长期遗留。

**健康度结论：** 项目当日表现出较强的修复主动性，尤其重视权限边界与运行一致性；主要待观察点是高风险 PR 的审查质量、大型改造的依赖协调，以及这些候选修复何时转化为实际合并交付。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*