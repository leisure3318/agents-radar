# OpenClaw 生态日报 2026-11-19

> Issues: 32 | PRs: 52 | 覆盖项目: 13 个 | 生成时间: 2026-11-19 04:29 UTC

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
**日期：2026-11-19｜统计窗口：过去 24 小时｜项目：[openclaw/openclaw](https://github.com/openclaw/openclaw)**

> **数据口径**：本日报基于所提供的 32 条 Issue 和 30 条 PR 明细（PR 更新总计 52 条）。PR 的 `CLOSED` 状态不能单独证明已经合并；评论正文、PR 评论数及合并记录未提供，因此不将“关闭”等同于“修复已上线”，也不推断评论内容。

## 1. 今日速览

过去 24 小时共有 **32 条 Issue 更新、52 条 PR 更新**，其中 Issue 仍开放 28 条、关闭 4 条，PR 待合并 30 条、合并或关闭 22 条，项目开发与问题分诊活跃。今日无新版本发布，工作重点集中在 **2026.11.5 相关稳定性、升级恢复、数据库迁移和多会话性能**。风险端出现一条标为 P0 的 Windows 启动阻塞报告，以及多条涉及会话中断、消息丢失和 Gateway 可用性的 P1 问题，表明当前可靠性压力较高。积极信号是部分数据库迁移问题已出现直接对应的修复 PR，但多项高影响问题仍需补充信息或维护者确认，尚不能据此认定风险已经收敛。

## 2. 项目进展

### 今日已关闭的重要 PR

以下仅确认“已关闭”，实际是否合并、是否进入发布版本仍需核验。

| 方向 | 重要 PR | 推进内容与意义 |
|---|---|---|
| 升级可靠性 | [#201545](https://github.com/openclaw/openclaw/pull/201545)、[#201579](https://github.com/openclaw/openclaw/pull/201579) | 分别针对繁忙 agent 数据库导致更新预检失败、迁移前数据库镜像空间要求过高的问题，着力降低升级门槛。 |
| 模型发现 | [#201493](https://github.com/openclaw/openclaw/pull/201493) | 尝试让 ChatGPT 模型发现不再依赖 npm 可达性；对应 Issue [#201480](https://github.com/openclaw/openclaw/issues/201480) 同日关闭。两者状态同步，但仍需确认合并及发布情况。 |
| 大规模会话性能 | [#201602](https://github.com/openclaw/openclaw/pull/201602)、[#201566](https://github.com/openclaw/openclaw/pull/201566)、[#201591](https://github.com/openclaw/openclaw/pull/201591) | 分别优化大型子代理注册表的 spawn 检查、转录搜索片段生成，以及会话列表刷新 CPU 开销，面向长期运行和多 agent 场景。 |
| 开发工作流 | [#201597](https://github.com/openclaw/openclaw/pull/201597) | 复用不同 base commit 对应的 worktree 模板，减少会话交替启动时的重复准备。 |
| Codex 降级策略 | [#201596](https://github.com/openclaw/openclaw/pull/201596) | 高速服务档位不可用时，先尝试同一模型的较低速度档位，再触发模型回退，目标是保留模型与线程连续性。 |
| OpenClaw ID 体验 | [#201556](https://github.com/openclaw/openclaw/pull/201556)、[#201555](https://github.com/openclaw/openclaw/pull/201555) | 分别处理插件白名单阻断 Access 页面，以及 macOS 登录未使用默认浏览器的问题。 |

**整体判断**：本日推进以“可靠性修补和规模化优化”为主，而非大型新功能交付。关闭记录覆盖升级、模型接入、会话性能等关键路径，但缺少合并信息，不宜计算实际功能交付率。

### 仍在推进的关键修复

- **Git 安装升级恢复**：[PR #201600](https://github.com/openclaw/openclaw/pull/201600) 修复新版本已启动却仍报告 `post-update-failed`；[PR #201538](https://github.com/openclaw/openclaw/pull/201538) 处理版本链接已切换、Gateway 尚未启动时被误判为“当前版本”的半完成状态。二者均为 P1，后者仍等待作者处理。
- **脚本与符号链接兼容性**：[PR #201598](https://github.com/openclaw/openclaw/pull/201598) 已标注证据充分、等待维护者，关联 macOS 打包问题 [#201528](https://github.com/openclaw/openclaw/issues/201528)。

## 3. 社区热点

所列 Issue 的最高评论数仅为 4，所有条目的 👍 均为 0；因此下列是**相对活跃话题**，不代表已形成大规模社区共识。PR 评论数为 `undefined`，无法进行讨论热度排名。

| 热点 | 可见热度 | 背后诉求 |
|---|---:|---|
| [#201540：主会话持续拒绝所有 turn](https://github.com/openclaw/openclaw/issues/201540) | 4 条评论，最高 | 用户需要会话恢复失败后的明确自救路径，而不是让 heartbeat、记忆整理和正常交互一并失效。 |
| [#201561：Windows 升级后 Gateway 停止](https://github.com/openclaw/openclaw/issues/201561) | 3 条评论 | 用户关注“安装成功”是否意味着服务真正恢复，以及 repair 是否能可靠完成。 |
| [#201058：PostgreSQL 冷启动失败](https://github.com/openclaw/openclaw/issues/201058) | 3 条评论 | 后端迁移之后，插件元数据和 secrets 初始化必须在真实启动路径上可用。 |
| [#201549：kimi-claw 丢弃图像工具调用](https://github.com/openclaw/openclaw/issues/201549) | 3 条评论 | 本地 OpenAI-compatible 模型的结构化工具调用需要被一致识别，避免静默退化为文本。 |

## 4. Bug 与稳定性

### P0：优先核实的可用性阻断

- **Windows Defender 扫描导致 CLI、Gateway 和 repair 静默挂起**  
  [Issue #201599](https://github.com/openclaw/openclaw/issues/201599) 标注 P0、release blocker，但仍为 `needs-info`。报告影响面广，不过根因尚需补证；**所给明细未见对应 fix PR**。建议优先收集进程等待、扫描与启动日志，不应仅凭该报告认定所有 Windows 环境都会受影响。

### P1：会话连续性、升级与资源风险

| 问题 | 影响 | Fix PR 状态 |
|---|---|---|
| [#201540：`session-rebound` 后永久拒绝 turn](https://github.com/openclaw/openclaw/issues/201540) | 主会话、heartbeat、记忆整理均被阻断，无明确操作恢复路径 | 未见；需信息与维护者审核 |
| [#201592：普通入站消息触发转录冲突](https://github.com/openclaw/openclaw/issues/201592) | 运行中的 turn 因 `SqliteTranscriptMutationConflictError` 失败 | 未见；报告指出既有 #201271 仅覆盖命令交互 |
| [#201605：子代理重试丢失原任务](https://github.com/openclaw/openclaw/issues/201605) | 流错误后同模型重试改写首条消息，任务消失并提前结束 | 未见；待维护者确认 |
| [#201058：PostgreSQL 冷启动失败](https://github.com/openclaw/openclaw/issues/201058) | secrets 插件准备阶段阻断 Gateway 启动 | **标签显示关联开放 PR**，但本次未提供编号 |
| [#201561：Windows 升级后服务停止](https://github.com/openclaw/openclaw/issues/201561) | `doctor --fix` 后 Gateway 未恢复，repair 超时 | 未见 |
| [#201607：子进程致命退出后仍等待 90 分钟](https://github.com/openclaw/openclaw/issues/201607) | 故障反馈严重延迟，增加排障成本 | 未见；已标记可排队修复 |
| [#201589：Windows 路径大小写比较错误](https://github.com/openclaw/openclaw/issues/201589) | 更新后通道持续被插件 peer-link 审计阻断 | 未见；已标记可排队修复 |
| [#201588：已删除 SQLite 快照仍被持有](https://github.com/openclaw/openclaw/issues/201588) | 报告称运行 35 小时后占用 23 GB，`du` 不易发现 | 未见；已标记可排队修复 |
| [#201576：watchdog 提前中止自动压缩](https://github.com/openclaw/openclaw/issues/201576) | 约 360 秒中止，早于配置的 600 秒超时 | 未见；仍需补充信息 |

### P2 与未定级：迁移、模型接入及长运行风险

- **PostgreSQL 迁移形成集中问题簇**：运行时配置未准备 [#201575](https://github.com/openclaw/openclaw/issues/201575) 已有开放修复 [PR #201594](https://github.com/openclaw/openclaw/pull/201594)；零序列值导致迁移失败 [#201573](https://github.com/openclaw/openclaw/issues/201573) 已有 [PR #201583](https://github.com/openclaw/openclaw/pull/201583)，两者均仍需证据。另有 NUL 字符阻断迁移 [#201572](https://github.com/openclaw/openclaw/issues/201572)、512 MB worker 内存上限导致索引 OOM [#201571](https://github.com/openclaw/openclaw/issues/201571)、Matrix 账户级状态未准备 [#201574](https://github.com/openclaw/openclaw/issues/201574)，所给明细未见对应 PR。
- **认证与模型回归**：OAuth 重新登录改写 `thinkingLevelMap` [#201558](https://github.com/openclaw/openclaw/issues/201558)、`gpt-6-luna` 在订阅路由被拒绝 [#201513](https://github.com/openclaw/openclaw/issues/201513)、多用户 observer 忽略会话所有者模型账户 [#201585](https://github.com/openclaw/openclaw/issues/201585)，均未见直接修复 PR。
- **Linux 长运行 spawn broker 失效**：[Issue #201609](https://github.com/openclaw/openclaw/issues/201609) 报告约 1–2 天后所有 exec/MCP/CLI backend spawn 失败，重启 Gateway 才恢复。当前尚待复现、未定级，未见 fix PR，但影响范围值得优先验证。
- **已关闭问题不等于已发布修复**：插件错误信息隐藏 [#201581](https://github.com/openclaw/openclaw/issues/201581)、Ollama SecretRef 余额缺失 [#201559](https://github.com/openclaw/openclaw/issues/201559)、Doctor 错误导入旧 heartbeat 模板 [#201593](https://github.com/openclaw/openclaw/issues/201593) 今日关闭，具体解决方式未提供。

## 5. 功能请求与路线图信号

### 已有实现载体，值得跟踪

- **OpenClaw ID 权限统一与成员暂停**：[PR #201610](https://github.com/openclaw/openclaw/pull/201610) 正在统一成员权限与 Gateway profile role，并允许管理员暂停成员。该 PR 为 XL 且涉及敏感权限逻辑，已有实现不代表即将发布。
- **所有者访问恢复与密钥边界**：[PR #201586](https://github.com/openclaw/openclaw/pull/201586) 限制仅凭复制的 Gateway key 重置 owner；[PR #201587](https://github.com/openclaw/openclaw/pull/201587) 提供本机恢复 owner 访问的机制，且依赖前者。路线图明显转向多人访问治理与恢复安全。
- **内存索引分块上限**：[PR #201611](https://github.com/openclaw/openclaw/pull/201611) 限制仅标题 chunk 连续合并后的尺寸，是较明确的小范围修复候选；暂无发布承诺。

### 用户需求明确，但尚待产品决策或验证

| 请求 | 路线图信号 |
|---|---|
| [#201606：自动化不投递时也保存输出](https://github.com/openclaw/openclaw/issues/201606) | 希望解耦“执行结果留存”和“消息投递”，增强运行历史可观测性；待产品决策。 |
| [#201580：插件 hook 暴露投递意图](https://github.com/openclaw/openclaw/issues/201580) | 区分 Codex async agent 消息与流式块输出，支持更准确的插件投递策略；待产品决策。 |
| [#201565：现有 Codex 会话实时重连 MCP](https://github.com/openclaw/openclaw/issues/201565) | 希望凭证或配置变化后无需重启 Gateway、重置会话；暂无对应 PR。 |
| [#201552：只读会话查询绕过 writer admission](https://github.com/openclaw/openclaw/issues/201552) | 反映多 agent 控制台读请求被写入排队拖慢；仍需真实环境验证。 |
| [#201541：`/btw` 使用模型 fallback 链](https://github.com/openclaw/openclaw/issues/201541) | 用户期待侧问与主会话具有一致的限流容错能力；待产品决策。 |

**下一版本判断**：已有直接修复 PR 的迁移问题更具短期落地条件；OpenClaw ID 系列已有开发投入，但涉及权限、兼容性和依赖关系。其余请求目前不足以判断会进入下一版本。

## 6. 用户反馈摘要

由于未提供评论正文，以下提炼自 Issue 描述，**不代表对评论情绪的统计**。

- **“成功”提示与实际可用性不一致**：升级成功却未恢复 Gateway、迁移返回成功却未完成记忆重建，增加了用户自行核验成本。参见 [#201561](https://github.com/openclaw/openclaw/issues/201561)、[#201575](https://github.com/openclaw/openclaw/issues/201575)。
- **长期运行需求正在暴露资源生命周期问题**：磁盘空间被删除快照占住、spawn broker 失效不自愈，说明用户需要的是持续运行而非短时演示可靠性。参见 [#201588](https://github.com/openclaw/openclaw/issues/201588)、[#201609](https://github.com/openclaw/openclaw/issues/201609)。
- **复杂部署场景增多**：PostgreSQL、Matrix、多用户 Gateway 和 25-agent 环境均出现在报告中，对迁移完整性、凭证归属和读写隔离提出更高要求。参见 [#201574](https://github.com/openclaw/openclaw/issues/201574)、[#201585](https://github.com/openclaw/openclaw/issues/201585)、[#201552](https://github.com/openclaw/openclaw/issues/201552)。
- **可解释失败与结果留存受到重视**：用户不仅需要任务执行，还需要看到错误原因和未投递的输出。参见 [#201581](https://github.com/openclaw/openclaw/issues/201581)、[#201606](https://github.com/openclaw/openclaw/issues/201606)。

可见数据没有明确的正向满意度反馈，不宜将关闭数量视为用户满意度指标。

## 7. 待处理积压与维护者提醒

**本批条目均在 11 月 18–19 日创建，无法识别“长期未响应”的历史积压。** 当前更适合关注以下高影响待办：

1. **补齐 P0/P1 复现与恢复方案**：优先推进 Windows 挂起 [#201599](https://github.com/openclaw/openclaw/issues/201599)、主会话锁死 [#201540](https://github.com/openclaw/openclaw/issues/201540) 和普通消息转录冲突 [#201592](https://github.com/openclaw/openclaw/issues/201592)。
2. **及时处理已有充分证据的开放 PR**：符号链接脚本修复 [#201598](https://github.com/openclaw/openclaw/pull/201598)、Tailscale Funnel 认证指导修复 [#201577](https://github.com/openclaw/openclaw/pull/201577) 均等待维护者。
3. **补齐迁移修复验证**：[#201594](https://github.com/openclaw/openclaw/pull/201594)、[#201583](https://github.com/openclaw/openclaw/pull/201583) 已对准具体故障，但仍需证明完整迁移与重建流程有效。
4. **防止恢复类 PR 停滞**：半完成 Git 升级修复 [#201538](https://github.com/openclaw/openclaw/pull/201538) 和 owner 恢复 [#201587](https://github.com/openclaw/openclaw/pull/201587) 均等待作者，且涉及兼容性风险。

**项目健康度结论：开发活跃、修复覆盖面广，但稳定性风险尚未收敛。** 下一阶段最重要的不是增加关闭数量，而是验证高优先级问题的修复是否真正合并、发布，并在升级、重启和长期运行场景中闭环。

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向分析
**日期：2026-11-19｜统计窗口：过去 24 小时**

> **口径说明**：以下基于所提供的日报，不代表仓库全部活动。Issue、PR 数量指窗口内更新条目，不等于新增数量；`CLOSED` 不等于已合并或已发布。OpenClaw、Hermes 的明细仅覆盖部分统计条目；NanoClaw、CoPaw 存在项目指定仓库与原始链接不一致的情况，涉及发布、代码归属时需进一步核验。

## 1. 生态全景

个人 AI 助手开源生态的当日工作重心，正在从“增加能力”转向“让复杂部署持续可靠运行”：升级恢复、长会话一致性、资源回收和权限边界成为主要议题。13 个项目合计记录 **91 条 Issue 更新、119 条 PR 更新**，其中 OpenClaw 与 Hermes 占 Issue 更新约 **90%**、PR 更新约 **86%**，可见开发活动高度集中。多 Profile、多 agent、群聊与远程部署需求同时出现，表明部分用户已进入持续运维和多人使用阶段，但这还不能证明生态整体已达到生产成熟度。唯一明确的新版本交付来自 NanoClaw 的 **`v2026.11.0-rc.2`**；其余活跃项目多数仍处于问题分诊和待审改动阶段。

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | Release 情况 | 当日健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 32 | 52 | 无 | **高活跃、可靠性承压**：升级、迁移及性能修补面广，但 P0/P1 风险尚未闭环 |
| **Hermes Agent** | 50 | 50 | 无 | **高活跃、待审压力较高**：多 Profile、缓存及远程连接问题集中，隔离边界需优先验证 |
| **ZeroClaw** | 6 | 8 | 无 | **持续迭代、交付待验证**：配置与依赖安全已有方案，安全 PR 存在重复工作 |
| **NanoClaw** | 0 | 5 | **`v2026.11.0-rc.2`** | **候选版收敛中**：已有 RC 交付，停机生命周期、挂载权限仍有待审改动 |
| **LobsterAI** | 0 | 3 | 无 | **小步迭代**：桌面体验修复与垂直创作工作流并进，合并及用户验证证据有限 |
| **CoPaw** | 2 | 0 | 无 | **问题输入、暂无可见修复闭环**：渠道静默失效的运营风险值得优先跟进 |
| **NanoBot** | 1 | 1 | 无 | **低量持续迭代**：聚焦 WebUI 状态反馈与模型辅助调用兼容性 |
| PicoClaw | 0* | 0* | 未观测到 | 单日无活动，无法据此评价维护状态 |
| NullClaw | 0* | 0* | 未观测到 | 同上 |
| IronClaw | 0* | 0* | 未观测到 | 同上 |
| TinyClaw / TinyAGI | 0* | 0* | 未观测到 | 同上 |
| Moltis | 0* | 0* | 未观测到 | 同上 |
| ZeptoClaw | 0* | 0* | 未观测到 | 同上 |
| **合计** | **91** | **119** | **1 个 RC 版本** | 活动集中，不能以更新量代替交付质量 |

\* “0”仅表示给定窗口内没有记录到活动，不表示仓库没有积压、用户或持续开发。

## 3. OpenClaw 在生态中的定位

### 综合型运行平台特征最为突出

从当日议题覆盖面看，OpenClaw 已不仅是对话或工具调用入口，而是在处理 **Gateway、数据库迁移、多会话、多 agent、身份治理、插件和跨平台升级**组成的完整运行体系。

其相对优势主要体现在：

- **平台治理覆盖较广**：OpenClaw ID 成员权限、成员暂停、owner 恢复及 Gateway key 边界已有实现 PR，显示出明确的多人访问治理投入。
- **规模化优化目标具体**：子代理注册表、转录搜索、会话列表 CPU、worktree 复用均有针对性改动，说明长期运行与多 agent 性能已进入工程优化范围。
- **故障分诊结构较清晰**：P0/P1、证据充分程度、作者或维护者等待状态，为判断处理优先级提供了较多信息；但不代表问题已经解决。

### 与同类项目的路线差异

| 对比对象 | OpenClaw 的相对侧重 | 对方当日更突出的方向 |
|---|---|---|
| **Hermes Agent** | 升级与迁移可靠性、Gateway 治理、大规模会话性能 | 多 Profile 隔离、Desktop/终端体验、提示缓存与调用记录完整性 |
| **NanoClaw** | 综合运行平台与访问治理 | 容器运行边界、本机隐私处理、技能扩展及候选版发布 |
| **ZeroClaw** | 端到端运行恢复与平台整合 | Rust 依赖安全、配置约束、渠道审批和可插拔记忆后端 |
| **NanoBot / LobsterAI** | 平台底层与运维复杂性 | 分别偏向 WebUI 体验，以及桌面交互与垂直创作流程 |

### 社区规模：只能确认“活动领先”，不能确认“用户最多”

OpenClaw 的 **52 条 PR 更新**在本组项目中最多，Hermes 则以 **50 条 Issue 更新**领先，两者属于同一活动量级。但缺少贡献者数、独立报告者数、安装量和长期趋势，**无法据此给真实社区规模或市场采用率排序**。

OpenClaw 的问题数量与覆盖面也具有双重含义：既反映复杂场景下的使用深度，也暴露出平台扩展后的维护成本，不能简单解释为更成熟或更不稳定。

## 4. 共同关注的技术方向

| 共同方向 | 涉及项目 | 具体诉求及技术含义 |
|---|---|---|
| **长期运行与资源生命周期** | OpenClaw、Hermes、NanoClaw、CoPaw、ZeroClaw | SQLite 快照释放、spawn broker 恢复、僵尸进程回收、停机排空、响应路由清理、过期邀请清理；核心是容量有界、资源可回收、故障可恢复 |
| **执行状态与结果可观测性** | NanoBot、CoPaw、OpenClaw、Hermes、ZeroClaw | 区分送达与接手、展示定时任务进度、保存未投递输出、留存 thinking 记录、解释成本图表；“没有报错”已不足以证明任务正常 |
| **权限、身份与隔离边界** | OpenClaw、Hermes、NanoClaw、ZeroClaw | owner 恢复、Profile 文件与凭据隔离、容器写权限、群组信任和工具审批；共享助手需要明确主体、资源与权限作用域 |
| **模型与协议兼容性** | OpenClaw、NanoBot、Hermes | 工具调用结构识别、辅助请求 token 预算、模型别名匹配、异常返回重试与降级；接口兼容不等于行为兼容 |
| **持久化、记忆与会话一致性** | OpenClaw、Hermes、ZeroClaw | 数据库迁移、转录冲突、父子会话恢复、历史消息重载、外部记忆与缓存回退；持久化语义直接影响任务连续性 |
| **多入口与跨端体验** | Hermes、ZeroClaw、CoPaw、LobsterAI、NanoBot | Desktop/WebSocket、Matrix 线程审批、微信渠道、macOS 全屏菜单、WebUI 排队提示；渠道适配需要覆盖状态、授权和错误反馈，而非只保证收发 |

## 5. 差异化定位分析

以下为**基于当日工程议题推断的定位**，并非完整产品能力排名。

| 项目 | 功能侧重 | 更契合的用户/场景 | 可见架构特征与主要代价 |
|---|---|---|---|
| **OpenClaw** | 综合助手运行平台、多 agent、访问治理 | 需要多渠道、长期运行及复杂部署的团队和高级用户 | Gateway、持久化存储、插件与身份体系协同；升级和跨组件一致性成本较高 |
| **Hermes Agent** | Profile 化助手、跨端交互、调度与插件 | 多身份/多机器人使用者、终端及远程桌面用户 | 多 Profile、多入口共享运行体系；隔离、历史一致性和缓存稳定性成为重点 |
| **NanoClaw** | 容器化任务执行、隐私技能 | 重视执行边界、本机数据处理的个人助手用户 | 宿主机与容器边界明确可见；需仔细管理挂载授权与生命周期 |
| **ZeroClaw** | 多渠道工具授权、配置治理、记忆扩展 | 自托管、多渠道集成及希望扩展后端的开发者 | Rust 依赖体系、HTTP sidecar、可选 SQLite 热缓存；需处理后端一致性与治理规则 |
| **NanoBot** | WebUI 对话与消息交互 | 主要通过浏览器使用助手的用户 | 当日改动集中于界面状态与模型辅助调用；不足以推断完整架构 |
| **LobsterAI** | 桌面伴侣、专家预设、创作流程 | 桌面助手用户和内容创作者 | 强调桌面交互及带审核的分阶段工作流；需验证预设升级与真实任务效果 |
| **CoPaw** | 渠道助手、后台定时任务 | 微信渠道和自动化任务使用者 | 渠道响应路由与 Web Console 状态同步是当前关键运行路径 |

PicoClaw、NullClaw、IronClaw、TinyClaw、Moltis、ZeptoClaw 缺少当日技术信息，不宜仅凭项目名称推断定位或架构优势。

## 6. 社区热度与成熟度

### 活跃度分层

- **高密度迭代：OpenClaw、Hermes**  
  两者均有约 50 条 PR 更新。OpenClaw 更突出升级、迁移和性能质量巩固；Hermes 则同时推进 Profile、远程部署、调度等扩展与可靠性修补。高活动量也意味着更大的评审和回归验证压力。

- **持续工程推进：ZeroClaw、NanoClaw**  
  ZeroClaw 以安全、配置和扩展提案为主；NanoClaw 有明确 RC 交付，最接近当日可观察的发布收敛阶段。但 RC 发布并不自动代表稳定性优于其他项目。

- **小范围迭代或反馈输入：LobsterAI、NanoBot、CoPaw**  
  前两者有具体体验或场景改动；CoPaw 当日只有问题反馈。数据量不足以评价维护效率。

- **静默观察层：其余六个项目**  
  单日无活动不构成停滞证据，应结合更长周期分析。

### 热度与成熟度需要分开判断

可见 Issue 互动普遍很少：OpenClaw 最高 **4 条评论**、Hermes 最高 **2 条**，其他多数为 0–1 条，且没有可见点赞聚集。因此，当日主要体现的是**工程活动密度，而非广泛社区讨论热潮**。

成熟度也不能用关闭量排序：更有价值的指标应是高优先级问题从复现、修复、合并、发布到现场验证的闭环，以及升级成功率、长运行故障率和恢复耗时；当前数据尚不足以完成这类排名。

## 7. 值得关注的趋势信号

### ① 智能体正在从单次任务工具变成长驻服务
OpenClaw 的长运行资源问题、CoPaw 的路由容量问题、Hermes 的进程清理和 NanoClaw 的停机协调，都说明服务生命周期已成为核心能力。

**开发参考：**将资源上限、过期回收、超时取消、优雅停机和自动恢复纳入基础设计，而非发布后的补丁。

### ② “任务状态”正在成为产品契约
NanoBot 要区分送达与接手，CoPaw 要显示运行过程，OpenClaw 要保存未投递结果。这些需求共同指向：执行、持久化和消息投递不能混为一谈。

**开发参考：**建立明确状态机，区分“已接收、排队、执行中、已完成、结果已保存、已投递”，并分别处理失败与重试。

### ③ 多用户与多 Profile 正在重塑安全模型
OpenClaw 的 owner 恢复、Hermes 的凭据作用域、ZeroClaw 的群组信任表明，个人助手开始承载共享使用，但“可访问助手”不应自动等于“可使用全部工具和秘密”。

**开发参考：**明确账户、Profile、会话、渠道和工具的权限边界，避免将进程级环境变量直接当作多租户凭据隔离方案。

### ④ 成本治理开始深入上下文和历史数据
Hermes 用户关注提示缓存与已计费 thinking 留存，ZeroClaw 出现成本图表语义问题，OpenClaw 则优化长会话与压缩路径。

**开发参考：**将历史消息格式稳定性、缓存命中、压缩触发和结果留存纳入成本监测，而不只统计 token 总数。

### ⑤ 模型兼容性测试必须覆盖辅助链路
NanoBot 主回复正常但标题失败，OpenClaw 出现工具调用丢弃与模型路由问题，Hermes 需要处理异常返回。这说明单轮聊天成功不足以验证提供商兼容性。

**开发参考：**测试应覆盖标题、工具调用、多模态、流式中断、重试、降级和会话恢复。

### ⑥ 差异化正从“支持哪些模型”转向“可信工作流”
NanoClaw 强调消息不进入容器、不离开 Mac；LobsterAI 强调创作审核与分阶段交付；OpenClaw 强调访问治理。竞争焦点开始延伸到数据边界、授权过程和成果验收。

**开发参考：**优先构建可审计的数据流、明确的审批点与可验证的输出，而非单纯增加工具或模型数量。

---

**综合判断：**OpenClaw 与 Hermes 是当日工程活动的双核心；前者更突出综合平台治理和运行可靠性，后者更突出多 Profile 与跨端使用。NanoClaw 提供了最明确的候选版交付信号，ZeroClaw 在配置、安全及渠道治理上持续推进。对技术选型而言，当前最值得验证的不是功能清单长度，而是目标部署环境中的**权限隔离、升级恢复、长时间运行和任务状态闭环**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报｜2026-11-19

## 1. 今日速览

过去 24 小时，NanoBot 共更新 **1 条 Issue、1 条 PR**，均处于开放状态；没有 PR 合并或关闭，也没有新版本发布，整体活跃度偏低。今日动态集中在 WebUI：一项是 Kimi K3.1 Pro 场景下的自动标题生成失败，另一项是改善排队消息的处理状态提示。前者涉及模型兼容性与辅助请求的输出预算，后者旨在让用户区分“消息已送达”和“智能体已接手”。当前可见工作仍处于问题反馈与待合并阶段，尚无已交付成果；仅凭这一天的数据，不宜判断项目长期活跃度或维护效率。

相关动态：[Issue #6718](https://github.com/HKUDS/nanobot/issues/6718) · [PR #6719](https://github.com/HKUDS/nanobot/pull/6719)

## 2. 项目进展

### WebUI 排队消息状态提示进入待合并阶段

[PR #6719：feat(webui): show when the agent picks up queued messages](https://github.com/HKUDS/nanobot/pull/6719) 由 chengyongru 于今日提交，目前为 **OPEN**，标记包括 `webui`、`feature`、`test`、`documentation` 和 `priority: p2`。

- **解决的问题**：用户在智能体忙碌时发送后续消息，界面容易让人误以为消息已进入处理流程，但网关确认收件并不等于智能体已接手。
- **可见方案**：为排队消息增加呼吸式虚线边框，且不改变消息尺寸，以提示其等待状态。
- **进展判断**：相关改动已形成 PR，但尚未合并。由于摘要不完整，无法确认完整状态切换逻辑、测试结果或最终交互效果。

**今日交付情况**：提供的数据中没有合并或关闭的重要 PR，因此今日推进主要体现在新增候选改进，而非已落地主分支的功能。

## 3. 社区热点

| 议题 | 可见互动 | 背后诉求 |
|---|---|---|
| [#6718：Kimi K3.1 Pro 自动标题生成失败](https://github.com/HKUDS/nanobot/issues/6718) | 1 条评论、0 个 👍，开放中 | 希望 OpenAI 兼容提供商下，不仅主对话可用，标题生成等辅助功能也能正常工作。 |
| [#6719：提示智能体何时接手排队消息](https://github.com/HKUDS/nanobot/pull/6719) | 评论数未提供、0 个 👍，开放中 | 希望界面准确表达消息的处理阶段，减少等待时的不确定性。 |

在已知评论数的条目中，#6718 讨论量最高，但只有 1 条评论，**尚不足以称为高热度议题**。两项动态共同指向 WebUI 的状态反馈质量：用户需要清楚知道系统正在做什么，以及哪些辅助操作未成功。

## 4. Bug 与稳定性

### 中低严重度：Kimi K3.1 Pro 下 WebUI 自动标题生成失败

[Issue #6718](https://github.com/HKUDS/nanobot/issues/6718) 由 MonsieurV 于 11 月 18 日创建，今日仍有更新，目前未关闭。

- **使用场景**：通过 OpenAI 兼容提供商使用 Kimi K3.1 Pro。
- **症状**：主助手回复成功，但话题标题一直保留为 “Untitled”。
- **可见诊断线索**：标题生成请求在输出恰好达到 **96 tokens** 时，以 `finish_reason=length` 结束。
- **影响评估**：影响话题命名和会话整理体验；现有信息未显示主对话失败、崩溃或数据丢失，因此暂评为中低严重度。这是日报分析评级，并非维护者定级。
- **修复状态**：所提供数据中**未见对应 fix PR**；[#6719](https://github.com/HKUDS/nanobot/pull/6719) 处理的是排队消息提示，不是此标题问题。

建议维护者优先确认标题生成的输出预算是否适配该模型，并排查是否需要模型级配置或失败回退。现有摘要只能证明输出触及上限，尚不能确定完整根因。

## 5. 功能请求与路线图信号

### 排队消息的可观测性是近期明确的改进方向

[PR #6719](https://github.com/HKUDS/nanobot/pull/6719) 已提出具体实现，说明“智能体是否已接手消息”的状态提示不再只是抽象需求，而是进入了待审查阶段。

- **产品价值**：让用户区分消息送达与实际处理，降低忙碌期间继续追问时的困惑。
- **纳入下一版本的可能性**：已有 PR，具备成为近期版本候选的条件；但尚无合并、发布计划或维护者承诺，不能确认会随下一版本交付。
- **优先级信号**：PR 标注为 `priority: p2`，但数据未说明项目对该级别的具体定义。

此外，[Issue #6718](https://github.com/HKUDS/nanobot/issues/6718) 释放出一项兼容性信号：标题生成等辅助调用可能需要更灵活的模型适配策略。不过，目前它仍是 Bug 报告，不能视为已确定的路线图项目。

## 6. 用户反馈摘要

**数据限制**：输入仅提供 Issue 摘要和评论数量，没有提供评论正文，因此无法从评论中提炼观点分布、维护者回应或用户满意度。以下结论仅来自问题描述和 PR 动机。

- **“主回复正常，但辅助功能失效”影响完整体验**：用户可以继续与助手对话，却无法获得自动标题，说明主链路成功不代表 WebUI 各环节均正常。[Issue #6718](https://github.com/HKUDS/nanobot/issues/6718)
- **忙碌时追加消息，需要明确等待状态**：PR 描述指出，当前界面可能让排队消息看起来已经就绪，而用户真正关心的是智能体何时开始处理。[PR #6719](https://github.com/HKUDS/nanobot/pull/6719)

现有反馈体现的是具体使用痛点，尚不能推断社区整体满意或不满意。

## 7. 待处理积压

**当前数据未显示可确认的长期未响应积压。** 两个条目均在最近两天创建并于今日更新，不应归类为长期搁置。

| 待跟进条目 | 当前状态 | 建议关注 |
|---|---|---|
| [Issue #6718](https://github.com/HKUDS/nanobot/issues/6718) | 开放；创建约 1 天；未见 fix PR | 确认复现条件、96-token 预算来源及受影响模型范围，明确修复归属。 |
| [PR #6719](https://github.com/HKUDS/nanobot/pull/6719) | 今日新建、待合并 | 审查排队提示与实际接手状态是否一致，并核验相关测试和交互表现。 |

**健康度结论**：今日可见动态围绕 WebUI 体验与兼容性展开，问题描述具有可操作线索，功能改进也已形成 PR；但更新量较小且没有合并交付。后续应重点观察 #6718 是否进入修复流程，以及 #6719 的审查与合并进度。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-11-19** · [项目仓库](https://github.com/nousresearch/hermes-agent)

> 统计依据：所提供的近 24 小时更新数据。详细分析覆盖展示出的 30 条 Issues、20 条 PR；未提供评论正文，PR 评论数为 `undefined`，因此不推断评论观点、评审热度或未展示条目的具体内容。当前无新版本发布。

## 1. 今日速览

过去 24 小时，项目分别有 **50 条 Issue、50 条 PR 更新**，其中 Issue 新开/活跃 47 条、关闭 3 条，PR 待合并 48 条、合并/关闭 2 条，贡献活动密集。今日主线集中在 **多 Profile 隔离、会话与提示缓存一致性、Desktop 远程连接，以及 Gateway/Cron 稳定性**，例如[跨 Profile 文件访问问题](https://github.com/nousresearch/hermes-agent/issues/157590)与[排队消息破坏缓存问题](https://github.com/nousresearch/hermes-agent/issues/157662)。部分报告已出现直接对应的修复或实现 PR，包括[清理子进程僵尸问题](https://github.com/nousresearch/hermes-agent/pull/157665)和[请求转储保留策略](https://github.com/nousresearch/hermes-agent/pull/157656)，体现了较快的贡献响应。整体呈现“**开发活跃、问题面较广、待审压力较高**”的状态，但当前数据不足以确认今日有多少修复已经合并交付。

## 2. 项目进展

### 已关闭 PR：有收敛动作，但不能视为已交付

展示数据中的两条关闭 PR 均只标记为 `CLOSED`，**未提供是否合并的信息**：

| PR | 涉及改进 | 当前可确认的进展 |
|---|---|---|
| [#157649：归档会话搜索状态](https://github.com/nousresearch/hermes-agent/pull/157649) | 修复 Desktop 搜索结果丢失归档标记、导致归档会话状态呈现异常的问题 | PR 已关闭；是否合并、替代或放弃待确认 |
| [#157645：无头环境 Webapp 引导发布](https://github.com/nousresearch/hermes-agent/pull/157645) | 为 Linux/systemd 无头主机提供发布向导 | 原 PR 已关闭；同作者另有相关方案 [#157650](https://github.com/nousresearch/hermes-agent/pull/157650)，将入口整合到 Gateway 设置菜单 |

### 待审的重要推进

- **降低 Gateway 路由写入成本**：[PR #157659](https://github.com/nousresearch/hermes-agent/pull/157659) 拟将路由全量删除重建改为差量写入，减少结构性会话变更带来的数据库写入。
- **改善异常恢复**：[PR #157657](https://github.com/nousresearch/hermes-agent/pull/157657) 拟在会话恢复前解析插件平台，避免启动恢复流程早于插件发现。
- **提高模型调用容错**：[PR #157648](https://github.com/nousresearch/hermes-agent/pull/157648) 为 Gemini `MALFORMED_*` 返回引入纠正重试，而不是直接终止。
- **修正聊天平台代码损坏**：[PR #157664](https://github.com/nousresearch/hermes-agent/pull/157664) 拟保留纯文本转换过程中的代码星号，避免函数参数、乘法表达式等被改写。

**进展判断：** 今日贡献集中于已有能力的可靠性补强，而非大型功能落地；上述重要 PR 均仍为 OPEN，实际收益取决于后续评审、合并和发布。

## 3. 社区热点

可见 Issues 的最高评论数仅为 **2 条**，所有展示条目点赞均为 **0**；尚未形成显著的高热讨论。PR 评论数缺失，无法进行讨论热度排名。

| 热点 | 可见互动 | 背后的诉求 |
|---|---:|---|
| [#157615：带标签字段输出绕过秘密脱敏](https://github.com/nousresearch/hermes-agent/issues/157615) | 2 评论，OPEN | 用户希望常见凭据字段导出格式也能被可靠脱敏，而非只覆盖固定文本形态 |
| [#157585：移动端漏显示本地会话](https://github.com/nousresearch/hermes-agent/issues/157585) | 2 评论，CLOSED | 相同会话库应在移动端、桌面端保持一致可见；关闭原因未提供 |
| [#157542：模型选择器首字母 `q` 触发退出](https://github.com/nousresearch/hermes-agent/issues/157542) | 2 评论，OPEN | 搜索输入与快捷键冲突，影响 `qwen`、`qwq` 等模型的筛选 |
| [#157598：流式 thinking 内容被丢弃](https://github.com/nousresearch/hermes-agent/issues/157598) | 1 评论，OPEN | 用户关注已付费推理内容的留存、展示与可审计性 |

## 4. Bug 与稳定性

以下按**潜在影响**排序，不替代仓库原有优先级标签。多数安全报告当前标签仍为 P3；“未见 fix PR”仅指本次展示数据中未发现明确对应项。

| 关注级别 | 问题与影响 | 修复状态 |
|---|---|---|
| **高：隔离边界** | [#157590](https://github.com/nousresearch/hermes-agent/issues/157590)：Gateway 的 `@file:` 根目录解析可能允许次级 Profile 读取其他 Profile 文件 | 未见明确 fix PR |
| **高：凭据作用域** | [#157606](https://github.com/nousresearch/hermes-agent/issues/157606)：同进程多 Profile 从实时 `os.environ` 解析凭据与设置，存在作用域混用风险 | 未见明确 fix PR |
| **高：秘密泄露** | [#157615](https://github.com/nousresearch/hermes-agent/issues/157615)：特定带标签字段输出未被脱敏，秘密可能原样进入工具输出 | 未见明确 fix PR |
| **高：主机可用性** | [#157633](https://github.com/nousresearch/hermes-agent/issues/157633)：本地终端命令无内存上限，重型构建可能触发 OOM，波及整个桌面会话 | 未见明确 fix PR |
| **高：会话恢复错误** | [#157652](https://github.com/nousresearch/hermes-agent/issues/157652)：恢复父会话时打开委派子代理记录；报告称父记录仍在数据库中，但无法正常到达 | 未见明确 fix PR |
| **中高：远程连接阻断** | [#157625](https://github.com/nousresearch/hermes-agent/issues/157625)：Desktop 通过 HTTPS LAN IP 登录后，WebSocket ticket 持续遭遇 `no_cookie` 拒绝 | 未见明确 fix PR |
| **中：缓存与费用** | [#157662](https://github.com/nousresearch/hermes-agent/issues/157662)、[#157583](https://github.com/nousresearch/hermes-agent/issues/157583)：排队消息、图片消息重载改变历史消息形态，造成后续提示缓存失配 | 均未见明确 fix PR |
| **中：流式数据完整性** | [#157598](https://github.com/nousresearch/hermes-agent/issues/157598)：typed thinking 内容未存储或展示，影响调用记录完整性 | 未见明确 fix PR |
| **中：模型配置兼容性** | [#157658](https://github.com/nousresearch/hermes-agent/issues/157658)：Copilot 默认模型持久化使用别名，破坏 Desktop provider 匹配与实时目录 | 未见明确 fix PR |
| **中：进程清理** | [#157661](https://github.com/nousresearch/hermes-agent/issues/157661)：定时 scratch 清理退出后遗留僵尸子进程 | 已有 OPEN 修复 [PR #157665](https://github.com/nousresearch/hermes-agent/pull/157665) |

另有一组终端显示问题值得联合回归：CLI 单次调用将图片输出成 Python 元组文本（[#157632](https://github.com/nousresearch/hermes-agent/issues/157632)）、Zellij 下图片显示损坏（[#157605](https://github.com/nousresearch/hermes-agent/issues/157605)）、中断后重绘错位（[#157627](https://github.com/nousresearch/hermes-agent/issues/157627)）。它们反映了不同终端运行模式下的兼容性覆盖不足，本次数据中未见明确对应修复 PR。

## 5. 功能请求与路线图信号

### 已有实现 PR，近期落地信号较强

- **请求转储自动过期清理**：[Issue #157644](https://github.com/nousresearch/hermes-agent/issues/157644) 已有 [PR #157656](https://github.com/nousresearch/hermes-agent/pull/157656)，拟加入 `HERMES_DUMP_RETENTION_DAYS`。需求同时涉及磁盘占用、备份体积，以及完整提示副本的保留周期。
- **更自然的 Cron 调度**：[PR #157655](https://github.com/nousresearch/hermes-agent/pull/157655) 支持“每月第二个周一”“最后一个周五”等表达；配套 [PR #157639](https://github.com/nousresearch/hermes-agent/pull/157639) 修正夏令时回拨时的漏跑、重复执行，显示调度能力正同步补强易用性与正确性。
- **无头主机引导发布 Desktop**：[PR #157650](https://github.com/nousresearch/hermes-agent/pull/157650) 将浏览器版 Desktop 纳入 Gateway 设置，降低远程部署门槛。
- **插件与 MCP 生态扩充**：[Agent Runs #157637](https://github.com/nousresearch/hermes-agent/pull/157637)、[TerminalUp Odds #157663](https://github.com/nousresearch/hermes-agent/pull/157663) 等目录贡献持续进入待审队列。

### 尚处需求阶段

- **插件统一安装、按 Profile 启停**：[Issue #157653](https://github.com/nousresearch/hermes-agent/issues/157653)。相关故障 [#157647](https://github.com/nousresearch/hermes-agent/issues/157647) 显示，新 Profile 可能继承其无法加载的插件 provider 配置，说明插件共享机制不仅是便利性问题。
- **ACP 编辑审批默认策略**：[Issue #157635](https://github.com/nousresearch/hermes-agent/issues/157635)，希望通过配置统一会话创建时的审批行为。
- **新增 Haven 消息平台**：[Issue #157629](https://github.com/nousresearch/hermes-agent/issues/157629)，体现自托管、跨设备通信入口的需求。
- **Zellij 全分辨率图片**：[Issue #157628](https://github.com/nousresearch/hermes-agent/issues/157628)，希望从降级显示进一步提升到完整图片支持。

以上仅为近期候选信号，**不能据此确认下一版本承诺**。

## 6. 用户反馈摘要

由于没有评论正文，以下提炼自 Issue 描述，而非对评论或情绪的直接引用：

- **多机器人运维已成为实际场景。** 有用户描述管理 13 个本地 Profile；转储清理、插件共享、配置隔离正在成为运维需求，而非边缘功能。见 [#157644](https://github.com/nousresearch/hermes-agent/issues/157644)、[#157653](https://github.com/nousresearch/hermes-agent/issues/157653)。
- **用户开始细查调用成本。** 图片和排队消息导致缓存命中下降、thinking 已计费却未留存，说明长会话用户需要可靠的费用与上下文可观测性。见 [#157583](https://github.com/nousresearch/hermes-agent/issues/157583)、[#157662](https://github.com/nousresearch/hermes-agent/issues/157662)、[#157598](https://github.com/nousresearch/hermes-agent/issues/157598)。
- **跨端一致性仍有摩擦。** 相同会话库在移动端和桌面端显示不同；同一远程 URL 在浏览器可用、Desktop 不可用，都会增加排障成本。见 [#157585](https://github.com/nousresearch/hermes-agent/issues/157585)、[#157625](https://github.com/nousresearch/hermes-agent/issues/157625)。
- **界面反馈可能误导用户。** 本地或 Git 安装的插件无法按 ID 搜索，容易被误认为安装失败；远程大段粘贴附件预览 404，则削弱文件输入的可信度。见 [#157603](https://github.com/nousresearch/hermes-agent/issues/157603)、[#157667](https://github.com/nousresearch/hermes-agent/issues/157667)。

本次数据没有足够依据提炼明确的满意评价；不能因缺少正向反馈而推断整体用户满意度偏低。

## 7. 待处理积压与维护建议

**无法识别“长期未响应”条目：** 展示条目均创建于 11 月 18—19 日，且缺少维护者响应、评审记录和完整历史。48 条待合并 PR 代表本次更新集合的待审量，**不等于全仓库积压总量**。

建议优先关注：

1. **安全边界联合排查**：将 [跨 Profile 文件读取 #157590](https://github.com/nousresearch/hermes-agent/issues/157590)、[凭据作用域 #157606](https://github.com/nousresearch/hermes-agent/issues/157606)、[脱敏绕过 #157615](https://github.com/nousresearch/hermes-agent/issues/157615) 纳入统一验证，避免逐点修复遗漏相邻路径。
2. **会话与缓存一致性专项**：围绕 [父子会话恢复 #157652](https://github.com/nousresearch/hermes-agent/issues/157652)、[排队消息 #157662](https://github.com/nousresearch/hermes-agent/issues/157662)、[图片历史重载 #157583](https://github.com/nousresearch/hermes-agent/issues/157583) 增加跨轮次回归测试。
3. **优先审查已有对应方案**：[僵尸子进程修复 #157665](https://github.com/nousresearch/hermes-agent/pull/157665)、[转储保留策略 #157656](https://github.com/nousresearch/hermes-agent/pull/157656) 已有明确问题来源，可优先完成验证与评审。
4. **补齐关闭结果说明**：明确 [#157649](https://github.com/nousresearch/hermes-agent/pull/157649)、[#157645](https://github.com/nousresearch/hermes-agent/pull/157645) 的关闭原因及替代关系，便于用户判断功能是否真正可用。

**健康度结论：** 项目贡献活跃，且部分问题迅速获得实现响应；当前更需要关注多 Profile、远程部署与长会话场景的系统性稳定性，以及待审贡献能否转化为可验证的发布成果。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报
**日期：2026-11-19｜统计范围：所提供的过去 24 小时更新数据**

> **数据说明**：项目指定仓库为 [`qwibitai/nanoclaw`](https://github.com/qwibitai/nanoclaw)，但所提供的 PR 链接均指向 `nanocoai/nanoclaw`，下文 PR 链接按原始数据保留。部分记录更新时间为 11 月 18 日，因缺少时区与采集时间，仍按给定统计窗口纳入。评论数为 `undefined`，不能视为零评论，也无法据此判断讨论热度。

## 1. 今日速览

过去 24 小时共收录 **5 条 PR 更新、0 条 Issue 更新和 1 个新版本**，开发活动主要围绕发布收敛、运行稳定性与技能扩展展开。新发布的 **`v2026.11.0-rc.2` 已进入稳定版前验证阶段**：发布说明称，若测试未发现问题，预期以该构建作为稳定版，不再安排 beta。4 个待合并 PR 分别涉及代理镜像刷新、容器挂载写权限、iMessage 摘要技能及停机生命周期修复。整体呈现**发布驱动的持续推进状态**，但缺少评论、评审与 CI 完整数据，无法进一步量化社区参与度或发布质量。[发布相关 PR #4466](https://github.com/nanocoai/nanoclaw/pull/4466)

## 2. 版本发布

### v2026.11.0-rc.2：接近稳定发布，但仍是候选版本
[发布相关 PR #4466](https://github.com/nanocoai/nanoclaw/pull/4466)

- **版本定位**：2026.11.0 的第二个候选版本。按发布说明，若测试无异常，该构建预期转为稳定版。
- **版本序列调整**：11 月版本取代原计划的 **2026.10.1**；后者不会发布稳定版。所提供的发布说明在此后截断，无法确认其余安排。
- **变更范围**：发布 PR 摘要称，相较 `rc.1` 累计包含 **9 个 PR**；`channels` 部分自 `rc.1` 起未变，仍位于 `b563b332`。当前资料未列出这 9 项变更，不能将下文待合并 PR 视为已包含内容。
- **破坏性变更**：现有数据未披露，**不等于已确认不存在**。
- **迁移注意事项**：仍等待 2026.10.1 稳定版的用户应重新评估升级目标；生产环境需注意 RC 身份，在升级前核对完整发布说明并进行回归验证。

## 3. 项目进展

### 发布流程推进：rc.2 已发布，发布 PR 已关闭
[PR #4466 — chore(release): v2026.11.0-rc.2](https://github.com/nanocoai/nanoclaw/pull/4466)

这是本次数据中唯一已关闭的 PR，对应第二个发布候选版本的准备工作。结合新版本已发布的记录，可以确认项目向 2026.11.0 稳定版交付迈进一步。

**状态边界**：数据仅标注 `CLOSED`，未提供合并标记，不能直接认定该 PR 已合并。其余 4 个 PR 均为 `OPEN`，因此今日可确认的主要成果是**候选版本交付**，而非这些新功能或修复已经落地。

## 4. 社区热点

**无法按讨论活跃度排序**：全部 PR 的评论数均缺失，所列 👍 均为 0，且没有 Issue 更新。以下仅为按影响范围筛选的关注项，不代表真实热度排名。

| 关注项 | 背后的需求或工程诉求 |
|---|---|
| [#4468：iMessage 摘要技能](https://github.com/nanocoai/nanoclaw/pull/4468) | 希望智能体获取指定会话的摘要，同时保持原始消息不进入容器、不离开 Mac，体现个人助手场景下对隐私边界的重视。 |
| [#4469：容器挂载可写配置](https://github.com/nanocoai/nanoclaw/pull/4469) | 表明部分容器工作流需要写入挂载目录；配置灵活性与权限控制需要兼顾。 |
| [#4467：停机前排空 host sweep](https://github.com/nanocoai/nanoclaw/pull/4467) | 聚焦后台任务与停机流程的协调，属于运行生命周期可靠性改进。 |

## 5. Bug 与稳定性

**本日没有新 Issue 报告**。以下为待合并 PR 暴露出的稳定性事项，排序依据潜在影响，非维护者确认的严重级别；现有资料均不足以认定为严重故障。

| 优先关注顺序 | 问题与影响 | 修复状态 |
|---|---|---|
| 1 | **停机与 host sweep 并发协调**：PR 计划在停机期间停止调度新 sweep，并等待进行中的任务完成。若处理不当，可能影响清理流程的完整性；摘要未报告实际崩溃或数据丢失。 | **已有 fix PR，待合并**：[ #4467](https://github.com/nanocoai/nanoclaw/pull/4467)。作者报告 8 个文件中的 52 项测试通过，类型、格式与 diff 检查通过。 |
| 2 | **容器挂载写权限配置**：标题指向无法按需求设置挂载点可写的问题，并关联既有 Bug #4150。具体复现条件与影响范围未提供。 | **已有 fix PR，待合并**：[ #4469](https://github.com/nanocoai/nanoclaw/pull/4469)；[关联 Issue #4150](https://github.com/nanocoai/nanoclaw/issues/4150)。 |

**预防性加固**：[PR #4470](https://github.com/nanocoai/nanoclaw/pull/4470) 将 `v2026.10.0` 对应的加固镜像更新至 `v2026.10.0-20261118T1930`，并替换镜像摘要，目前仍待合并。没有漏洞编号或补丁明细，不能据此推断存在特定安全漏洞。

## 6. 功能请求与路线图信号

- **隐私优先的消息摘要能力**：[PR #4468](https://github.com/nanocoai/nanoclaw/pull/4468) 提议新增 `add-imessage-summaries` 技能，让 agent group 跟踪指定 iMessage 会话的摘要。这是明确的功能实现提案，但尚未合并，也无版本归属承诺。
- **更灵活的容器工作流**：[PR #4469](https://github.com/nanocoai/nanoclaw/pull/4469) 反映挂载写权限需求，若落地将改善需要文件写回的容器使用场景。
- **近期重心偏向发布验证与可靠性**：[rc.2 发布 PR #4466](https://github.com/nanocoai/nanoclaw/pull/4466) 与[停机修复 #4467](https://github.com/nanocoai/nanoclaw/pull/4467)共同表明当前关注发布收敛。不过，**无法确认任何待合并 PR 将进入 2026.11.0 稳定版**。

## 7. 用户反馈摘要

本次数据**不包含 Issue 评论或 PR 评论正文**，因此无法提炼真实用户的满意度、负面反馈频率或典型评价。

仅从贡献者提案可识别两类需求信号：

- **隐私与授权边界**：希望智能体利用消息信息，但避免原始消息直接进入通用执行环境。[PR #4468](https://github.com/nanocoai/nanoclaw/pull/4468)
- **容器任务可用性**：部分工作流需要挂载目录可写，而不只是读取。[PR #4469](https://github.com/nanocoai/nanoclaw/pull/4469)

以上是提案所反映的诉求，不能替代经评论验证的广泛用户反馈。

## 8. 待处理积压

**没有足够证据识别“长期未响应”的积压。** 本次列出的开放 PR 均创建于 11 月 18—19 日，不应仅因尚未合并就认定为维护滞后。

建议维护者近期关注：

1. **发布前稳定性评审**：核实停机修复是否应纳入当前候选版后续处置，并确认集成验证结果。[PR #4467](https://github.com/nanocoai/nanoclaw/pull/4467)
2. **挂载写权限边界**：审查可写配置的默认行为、授权范围及回归测试覆盖。[PR #4469](https://github.com/nanocoai/nanoclaw/pull/4469)
3. **镜像刷新验证**：核查新镜像兼容性与摘要更新；当前没有足够信息判断该刷新是否紧急。[PR #4470](https://github.com/nanocoai/nanoclaw/pull/4470)
4. **隐私技能方案评审**：验证“消息不进入容器、不离开 Mac”的设计边界与实现。[PR #4468](https://github.com/nanocoai/nanoclaw/pull/4468)

**健康度结论**：项目处于有明确交付节奏的候选版验证阶段，稳定性工作与自动化维护持续推进；但当前数据不足以评价长期积压、评审响应速度和实际用户满意度。

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
**日期：2026-11-19**  
**项目：[netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)**

## 1. 今日速览
过去 24 小时，LobsterAI 共有 **3 条 PR 更新、0 条 Issue 更新，无新版本发布**，呈现低讨论量、小步迭代的状态。PR 中 1 条处于开放状态、2 条已关闭，但数据未提供合并标记，因此不能将关闭等同于已合并。今日工作集中在桌面伴侣菜单可用性、模型选择器国际化，以及宠物视频制作专家工作流三个方向。整体开发活动仍在持续，但评论数缺失、缺少用户反馈样本，尚不足以判断社区参与度及修复落地效果。  
相关 PR：[桌面伴侣修复 #3116](https://github.com/netease-youdao/LobsterAI/pull/3116) · [模型标签国际化 #3115](https://github.com/netease-youdao/LobsterAI/pull/3115) · [宠物视频工作流 #3117](https://github.com/netease-youdao/LobsterAI/pull/3117)

## 2. 项目进展

### 桌面伴侣菜单：改善首次使用与全屏场景
**[#3116 · fix(desktop-companion)](https://github.com/netease-youdao/LobsterAI/pull/3116)**  
**状态：已关闭，是否合并待确认。**

该 PR 针对桌面伴侣悬浮菜单的显示时机与窗口层级进行修复：
- 首次收到渲染器尺寸测量结果后，即显示悬浮菜单。
- 初次加载较慢、未及时收到测量结果时，在加载完成后重试显示兜底逻辑。
- 调整 macOS 全屏场景下启动器的窗口层级。

**进展意义：**聚焦基础交互可靠性，旨在减少首次使用或全屏操作时菜单不可见的问题；修复是否进入主分支仍需核实。

### 模型选择器：完善自定义标签的语言处理
**[#3115 · feat(models)](https://github.com/netease-youdao/LobsterAI/pull/3115)**  
**状态：已关闭，是否合并待确认。**

主要调整包括：
- 有英文自定义标签时，优先展示服务端提供的英文版本。
- 缺少对应翻译时，仍保留标签显示，避免信息丢失。
- 英文界面中的内置徽标改为仅图标展示，自定义标签文本放入悬停详情。
- 为标签解析与语言回退补充渲染器测试。

**进展意义：**提升英文界面的信息一致性，并通过测试覆盖降低相关逻辑回归风险。

**整体判断：**今日进展以局部体验完善为主，而非重大架构调整。两项已关闭 PR 均有明确的交互改进目标，但不能据此认定功能已交付。

## 3. 社区热点

**今日无法可靠评选“讨论最活跃”条目。**所给数据中，3 条 PR 的评论数均为 `undefined`，不能视为零评论；👍 均为 0，且无 Issue 更新。因此，下列仅为值得关注的开发议题，不代表社区热度排名。

| 议题 | 可观察到的诉求 | 链接 |
|---|---|---|
| 宠物视频制作工作流 | 将分镜、图像、片段和剪辑组织为带审核环节的创作流程 | [#3117](https://github.com/netease-youdao/LobsterAI/pull/3117) |
| 桌面伴侣显示可靠性 | 让菜单在首次启动、慢加载和全屏环境下保持可访问 | [#3116](https://github.com/netease-youdao/LobsterAI/pull/3116) |
| 多语言模型标签 | 兼顾英文界面可读性与翻译缺失时的信息完整性 | [#3115](https://github.com/netease-youdao/LobsterAI/pull/3115) |

## 4. Bug 与稳定性

今日未提供新增 Bug Issue、崩溃报告或回归报告。以下风险依据修复 PR 摘要整理，严重程度为分析判断，并非维护者评级。

| 优先级 | 问题与影响 | Fix PR 状态 |
|---|---|---|
| **中** | 桌面伴侣悬浮菜单在首次使用或初始慢加载时可能未及时显示；macOS 全屏场景也涉及窗口层级问题，影响功能入口可访问性。 | 已有 [#3116](https://github.com/netease-youdao/LobsterAI/pull/3116)，已关闭，合并及发布状态待确认。 |
| **低** | 模型自定义标签的英文显示与翻译回退需要完善，主要影响信息呈现与理解。 | 已有 [#3115](https://github.com/netease-youdao/LobsterAI/pull/3115)，已关闭；摘要提及补充测试，但未提供测试执行结果。 |

现有样本未显示数据丢失、安全漏洞或阻断性崩溃，**但这不等于已确认不存在相关问题**。

## 5. 功能请求与路线图信号

### 宠物视频制作专家工作流是今日最明确的新增功能信号
**[#3117 · feat(experts)](https://github.com/netease-youdao/LobsterAI/pull/3117)**  
**状态：开放，待合并。**

根据可见摘要，该 PR 拟新增 **Pet Vlog Director** 支持套件，并刷新已安装预设，覆盖：
- 分镜、图像、视频片段和剪辑审核。
- 已批准镜头混用独立镜头与匹配帧转场。
- 基础剪辑保留源音频。
- 字幕、音乐和叠加元素作为可选的第二次交付。

**路线图解读：**这表明项目正在探索更具体的垂直创作场景，并强调分阶段审核与基础/增强交付的区分。由于已有开放 PR，它是后续版本的候选功能；但当前没有合并结果、里程碑或发布计划，不能确认会进入下一版本。

今日没有 Issue 层面的新功能请求数据，不能将该开发提案直接视为已验证的用户需求。

## 6. 用户反馈摘要

今日没有可用的 Issue 评论，**无法提炼可归属到真实用户的满意度、投诉或直接引述**。以下仅为 PR 所反映的潜在使用痛点：

- **桌面助手用户：**需要在首次启动和全屏工作时稳定访问悬浮菜单。见 [#3116](https://github.com/netease-youdao/LobsterAI/pull/3116)。
- **英文界面用户：**需要模型标签可读，且不因缺少翻译而丢失信息。见 [#3115](https://github.com/netease-youdao/LobsterAI/pull/3115)。
- **视频创作者：**可能需要可审核、可分阶段交付的宠物视频制作流程；目前属于开发方向信号，尚无用户反馈验证。见 [#3117](https://github.com/netease-youdao/LobsterAI/pull/3117)。

## 7. 待处理积压

**当前数据不足以识别长期未响应的重要积压。**所列 PR 均于今日创建并更新，不能归类为长期滞留；没有 Issue 更新也不代表仓库没有历史积压。

建议维护者关注以下待核实事项：

| 事项 | 建议行动 | 链接 |
|---|---|---|
| 宠物视频工作流尚未合并 | 确认评审进展，并检查预设刷新对已有安装环境的影响 | [#3117](https://github.com/netease-youdao/LobsterAI/pull/3117) |
| 桌面伴侣修复交付状态不明 | 确认是否合并，并验证首次启动、慢加载与 macOS 全屏场景 | [#3116](https://github.com/netease-youdao/LobsterAI/pull/3116) |
| 模型标签调整交付状态不明 | 确认是否合并及测试结果，重点检查翻译缺失时的回退行为 | [#3115](https://github.com/netease-youdao/LobsterAI/pull/3115) |

**健康度结论：**项目今日保持了明确的体验修复与场景扩展活动，模型标签 PR 中的测试补充也是正向信号。不过，发布、合并和用户验证信息仍不足，现阶段更适合评价为“持续迭代中”，而非“改进已完成交付”。

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

# CoPaw 项目动态日报｜2026-11-19

> **统计范围：**过去 24 小时。报告基于所提供的 GitHub 数据，不代表仓库全部状态。  
> **数据口径提示：**项目名称为 [CoPaw](https://github.com/agentscope-ai/CoPaw)，但两条 Issue 均指向 `agentscope-ai/QwenPaw`；以下保留原始 Issue 链接，不推断仓库更名或迁移关系。

## 1. 今日速览

过去 24 小时，项目有 **2 条新开/活跃 Issue，0 条关闭 Issue、0 条 PR 更新、0 个新版本发布**，整体呈现低活跃度、问题反馈驱动的状态。两条反馈均涉及稳定性与使用体验：一条是微信渠道长期运行后双向失效，另一条是定时任务执行期间会话消息不可见。两条 Issue 各有 1 条评论、均无点赞，目前讨论规模有限，尚未看到对应修复 PR。今日没有可确认的代码交付进展，维护重点应放在渠道持续可用性和后台任务可观测性上。  
来源：[渠道失效 #8814](https://github.com/agentscope-ai/QwenPaw/issues/8814) · [定时任务消息不可见 #8815](https://github.com/agentscope-ai/QwenPaw/issues/8815)

## 2. 项目进展

- **今日无可确认的功能或修复落地。**提供的数据中没有新增、合并或关闭的 PR，也没有 Issue 关闭记录，因此无法确认项目在代码交付层面向前推进了多少。
- **问题识别有所推进，但尚未形成修复闭环。**[#8814](https://github.com/agentscope-ai/QwenPaw/issues/8814) 的报告已提出响应路由未清理、触及数量上限的疑似原因；[#8815](https://github.com/agentscope-ai/QwenPaw/issues/8815) 则明确了后台定时任务执行过程缺少消息展示的问题。二者仍需维护者确认与验证。

## 3. 社区热点

两条 Issue **均为 1 条评论、0 个 👍**，热度并列，暂无明显集中讨论的话题。

| 议题 | 讨论情况 | 背后的诉求 |
|---|---|---|
| [#8814 微信渠道长期运行后静默失效](https://github.com/agentscope-ai/QwenPaw/issues/8814) | 1 条评论，0 👍 | 长驻个人助手需要稳定的双向通信，以及用户能够感知的故障提示；仅有内部错误日志不利于及时发现和恢复服务。 |
| [#8815 定时任务执行期间会话无消息](https://github.com/agentscope-ai/QwenPaw/issues/8815) | 1 条评论，0 👍 | 用户希望在后台任务运行时看到触发消息、模型响应或执行进度，而不是等任务结束后才能了解情况。 |

## 4. Bug 与稳定性

以下优先级为基于影响范围的分析判断，并非维护者官方定级。

### 高优先级：微信渠道触及响应路由上限后双向失效

- **Issue：**[#8814 — RESPONSE_SCOPE_LIMIT: active response routes are never evicted, channel silently dies at 128](https://github.com/agentscope-ai/QwenPaw/issues/8814)
- **报告现象：**长时间运行后，微信渠道的入站与出站均停止工作，无用户可见错误；宿主日志仅显示 `-32603 internal error`。
- **报告中的原因判断：**活跃响应路由未被清理，并触及 128 的上限；涉及 `src/qwenpaw/channel_protocol/shared_response_driver.py`。这是报告者的诊断，当前数据不足以确认其已获维护者验证。
- **影响评估：**可能导致核心交互渠道不可用，且静默失败增加发现与排查难度，应优先处理。
- **修复状态：**OPEN；**所提供数据中未见 fix PR**。

### 中优先级：定时任务运行期间会话消息不可见

- **Issue：**[#8815 — Scheduled task conversations show no messages until execution completes](https://github.com/agentscope-ai/QwenPaw/issues/8815)
- **报告版本：**QwenPaw 2.3.0。
- **报告现象：**后台定时 Agent 任务运行时，Web Console 对应会话不显示触发消息、模型响应及执行进度，直到执行完成后才显示消息。
- **影响评估：**削弱长任务的过程可见性，用户难以区分正常执行、执行卡住和任务未启动；现有摘要未表明任务执行本身失败或消息永久丢失。
- **修复状态：**OPEN；**所提供数据中未见 fix PR**。

## 5. 功能请求与路线图信号

今日没有独立的新功能请求，但两条 Bug 反馈释放出明确的产品改进信号：

- **长驻运行的资源生命周期管理。**[#8814](https://github.com/agentscope-ai/QwenPaw/issues/8814) 提示需要关注响应路由回收、容量边界处理与渠道健康监测。相关措施是基于问题的改进建议，并非已确认的开发计划。
- **后台任务的实时可观测性。**[#8815](https://github.com/agentscope-ai/QwenPaw/issues/8815) 反映用户对运行中消息和进度可见性的需求，更接近现有能力的体验补齐，而非全新功能。

**下一版本判断：**当前无关联 PR、里程碑或发布计划信息，不能判断上述改进是否会进入下一版本。

## 6. 用户反馈摘要

> 数据仅提供 Issue 正文摘要和评论数量，未提供评论正文，因此以下提炼来自问题描述，不将其表述为评论共识。

- **长期部署场景：可靠性之外，还需要故障可见性。**微信渠道双向失效且没有用户可见提示，意味着使用者可能无法及时判断助手是否仍在工作。来源：[#8814](https://github.com/agentscope-ai/QwenPaw/issues/8814)。
- **定时任务场景：用户需要过程反馈，而不只是最终结果。**执行期间会话空白，会降低用户对任务是否正常推进的判断能力。来源：[#8815](https://github.com/agentscope-ai/QwenPaw/issues/8815)。
- **满意度证据有限。**现有反馈主要体现具体使用障碍，没有足够信息判断整体满意度或这些问题的普遍程度。来源：[#8814](https://github.com/agentscope-ai/QwenPaw/issues/8814) · [#8815](https://github.com/agentscope-ai/QwenPaw/issues/8815)。

## 7. 待处理积压

**无法识别长期未响应的积压项。**两条 Issue 均于今日创建和更新，且各有 1 条评论；缺少评论作者及正文，不能判断维护者是否已经响应，也不能将其归为长期积压。

建议纳入后续跟踪：

1. **优先确认渠道失效问题的影响范围与复现条件**，验证路由上限及清理机制，并关联修复 PR。来源：[#8814](https://github.com/agentscope-ai/QwenPaw/issues/8814)。
2. **确认定时任务消息展示的预期行为**，区分设计限制与缺陷，并补充运行中消息可见性的回归验证。来源：[#8815](https://github.com/agentscope-ai/QwenPaw/issues/8815)。

---

**项目健康度结论：**今日呈现“有问题输入、暂无可见交付闭环”的状态。其中渠道静默失效具有更高的运营风险，应优先分诊；但仅凭单日两条反馈，尚不足以判断项目整体稳定性正在恶化或维护停滞。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：2026-11-19**  
**项目：[zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)**

## 1. 今日速览

过去 24 小时，所提供数据记录了 **6 条 Issue、8 条 PR 更新**，均处于开放状态，没有 Issue 关闭或 PR 合并/关闭，也没有新版本发布。项目保持一定提交活跃度，工作重点集中在 **配置校验、依赖安全、多渠道审批体验和记忆后端扩展**。当前成果主要仍处于提案与待审阶段，不能将开放 PR 视为已经交付。社区互动信号较弱：6 条 Issue 的评论和点赞均为 0，PR 评论数未提供，因此暂无法确认讨论热度或维护者响应速度。

> 统计口径：沿用输入的“过去 24 小时”范围；部分条目的日期标记为 11 月 18 日，未提供具体时间和时区。

## 2. 项目进展

**今日没有已合并或已关闭的重要 PR，无法确认新增落地成果。** 待审工作主要集中在以下方向：

| 方向 | 进展与价值 | 当前状态 |
|---|---|---|
| 记忆后端扩展 | [PR #12567](https://github.com/zeroclaw-labs/zeroclaw/pull/12567) 提议新增 EverOS HTTP sidecar 后端，通过 `/api/v2/memory/*` 接口交互，并提供可选 SQLite 热缓存，用于降低延迟及离线回退 | 待合并 |
| 配置健壮性 | [PR #12560](https://github.com/zeroclaw-labs/zeroclaw/pull/12560) 拒绝将 `NaN`、无穷大等非有限数值写入小数配置，与已报告缺陷直接对应 | 待合并 |
| 依赖安全 | [PR #12555](https://github.com/zeroclaw-labs/zeroclaw/pull/12555)、[PR #12565](https://github.com/zeroclaw-labs/zeroclaw/pull/12565) 均将 `lettre` 最低版本提高至 `0.11.24`，避免下游继续解析到存在漏洞的版本 | 待合并，范围高度重叠 |
| 常规依赖维护 | [PR #12556](https://github.com/zeroclaw-labs/zeroclaw/pull/12556) 包含 37 项 Rust 依赖更新 | 待合并，需关注兼容性与测试结果 |
| 运行时治理 | [PR #12566](https://github.com/zeroclaw-labs/zeroclaw/pull/12566)、[PR #12564](https://github.com/zeroclaw-labs/zeroclaw/pull/12564)、[PR #12563](https://github.com/zeroclaw-labs/zeroclaw/pull/12563) 分别涉及会话所有权准入、MCP OAuth 入口姿态及受管 HTTP 凭据写入保护的 ADR-016 例外记录 | 文档类待审工作，不代表相关功能已落地 |

**整体判断：** 候选改动覆盖面较广，但本窗口内尚无合并产出。配置缺陷已有对应修复提案，是较明确的推进信号；安全依赖 PR 重叠则需要维护者协调。

## 3. 社区热点

由于 Issue 均为 **0 评论、0 点赞**，PR 评论数为 `undefined`、点赞均为 0，**无法按讨论量评选真实“热门”条目**。以下是按问题聚集度与潜在影响选出的关注点：

- **聊天渠道中的工具审批体验**  
  [Issue #12558](https://github.com/zeroclaw-labs/zeroclaw/issues/12558) 报告 Matrix 审批提示脱离当前线程；[Issue #12557](https://github.com/zeroclaw-labs/zeroclaw/issues/12557) 希望 Discord、Matrix 支持表情反应审批。共同诉求是让工具授权与对话上下文保持一致，并减少操作步骤。

- **安全修复能否覆盖下游使用者**  
  [PR #12555](https://github.com/zeroclaw-labs/zeroclaw/pull/12555) 与 [PR #12565](https://github.com/zeroclaw-labs/zeroclaw/pull/12565) 指向同一问题：仅更新仓库锁文件，不足以约束下游已有锁文件中的依赖版本。两项 PR 均提议提高清单中的版本下限。

- **配置输入的边界校验**  
  [Issue #12559](https://github.com/zeroclaw-labs/zeroclaw/issues/12559) 与 [PR #12560](https://github.com/zeroclaw-labs/zeroclaw/pull/12560) 形成直接的问题—修复对应关系，体现出对非法数值输入的加固需求。

## 4. Bug 与稳定性

按报告严重程度及潜在影响排列；本次数据**没有明确的崩溃或回归报告**。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **S2：行为退化** | [#12559](https://github.com/zeroclaw-labs/zeroclaw/issues/12559)：配置文本解析接受 `inf`、`Infinity`、`NaN` 及溢出值，使非有限数值进入配置，可能影响后续计算或校验 | 已有 [fix PR #12560](https://github.com/zeroclaw-labs/zeroclaw/pull/12560)，未合并 |
| **S2：行为退化** | [#12558](https://github.com/zeroclaw-labs/zeroclaw/issues/12558)：开启 `reply_in_thread = true` 后，Matrix 工具审批提示仍发到房间主时间线，破坏线程内交互一致性 | 所给数据中未见对应 fix PR |
| **S3：轻微问题** | [#12568](https://github.com/zeroclaw-labs/zeroclaw/issues/12568)：Dashboard 成本条按最大金额缩放，Monthly 条总是满格，容易被误读为预算使用率；报告称 Daily、Monthly 金额正确 | 所给数据中未见对应 fix PR |

**补充稳定性关注：**

- **依赖安全收尾：** [PR #12555](https://github.com/zeroclaw-labs/zeroclaw/pull/12555) 摘要指出，此前锁文件更新涉及 `RUSTSEC-2026-0560` 至 `RUSTSEC-2026-0565`，但清单仍允许较旧版本；本次提高版本下限的修复尚未合并。
- **Matrix 邀请积压：** [Issue #12561](https://github.com/zeroclaw-labs/zeroclaw/issues/12561) 虽归类为增强请求，但其描述的未授权邀请长期挂起问题具有资源管理风险；暂无对应实现 PR。

## 5. 功能请求与路线图信号

- **Telegram 群组级信任配置** — [Issue #12562](https://github.com/zeroclaw-labs/zeroclaw/issues/12562)  
  希望新增 `channels.telegram.<alias>.trusted_groups`，让受信任群组内任意成员无需逐个加入发送者白名单即可与智能体交互。它指向多人共享助手场景，也需要明确群组信任与工具权限边界。目前仅有需求，未见实现 PR。

- **Matrix 过期邀请清理** — [Issue #12561](https://github.com/zeroclaw-labs/zeroclaw/issues/12561)  
  希望通过有界清理机制，最终拒绝长期挂起的未授权邀请，减少持久化状态积压。目前处于需求阶段。

- **Discord / Matrix 简化审批** — [Issue #12557](https://github.com/zeroclaw-labs/zeroclaw/issues/12557)  
  提议用表情反应批准或拒绝工具调用，缩小与 Telegram 按钮审批体验的差距。目前未见实现 PR。

- **EverOS 记忆集成** — [PR #12567](https://github.com/zeroclaw-labs/zeroclaw/pull/12567)  
  已进入实现提案阶段，相比上述纯需求条目更接近可评审状态；但没有版本计划、评审结论或合并信息，**不能据此确认会进入下一版本**。

## 6. 用户反馈摘要

**没有可供提炼的 Issue 评论。** 以下仅依据 Issue 正文归纳，不代表社区共识或满意度调查：

- **多线程对话需要审批上下文一致：** Matrix 用户期望“在哪个线程发起任务，就在哪个线程完成授权”。[Issue #12558](https://github.com/zeroclaw-labs/zeroclaw/issues/12558)
- **不同渠道的交互体验存在落差：** 请求者以 Telegram 按钮审批为参照，希望 Discord、Matrix 也能低成本完成授权操作。[Issue #12557](https://github.com/zeroclaw-labs/zeroclaw/issues/12557)
- **群聊部署需要更低的维护成本：** Telegram 请求反映了逐个维护成员白名单的负担。[Issue #12562](https://github.com/zeroclaw-labs/zeroclaw/issues/12562)
- **成本面板需要清晰表达指标含义：** 数字正确但进度条参照不明确，仍会影响用户判断。[Issue #12568](https://github.com/zeroclaw-labs/zeroclaw/issues/12568)

## 7. 待处理积压

所给条目均创建于 **11 月 18—19 日**，没有历史等待时长或维护者回复记录，**无法识别长期未响应积压**。当前更适合列为近期分流与评审清单：

1. **协调重复的安全依赖 PR**：明确 [#12555](https://github.com/zeroclaw-labs/zeroclaw/pull/12555) 与 [#12565](https://github.com/zeroclaw-labs/zeroclaw/pull/12565) 的保留方案，减少重复评审。
2. **优先核验 S2 修复**：评审 [#12560](https://github.com/zeroclaw-labs/zeroclaw/pull/12560) 对文本配置入口及非有限数值的覆盖范围。
3. **为 Matrix 审批错位安排处理路径**：[Issue #12558](https://github.com/zeroclaw-labs/zeroclaw/issues/12558) 当前未见对应修复，可与审批简化需求区分处理，避免缺陷修复被功能扩展拖延。
4. **跟进运行时例外的独立审批**：[PR #12563](https://github.com/zeroclaw-labs/zeroclaw/pull/12563) 明确文档提案在独立 Core Team 审查批准前并不授予例外，应保持治理记录与实际授权状态一致。

**项目健康度结论：有提交活跃度，但交付与响应证据仍不足。** 当前积极信号是配置问题已有对应修复、安全依赖持续加固；需要继续观察待审 PR 的合并速度、重复工作协调以及渠道体验问题是否获得维护者确认。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*