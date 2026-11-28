# OpenClaw 生态日报 2026-11-28

> Issues: 8 | PRs: 67 | 覆盖项目: 13 个 | 生成时间: 2026-11-28 04:56 UTC

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
**日期：2026-11-28｜统计窗口：过去 24 小时｜[项目仓库](https://github.com/openclaw/openclaw)**

## 1. 今日速览

OpenClaw 今日保持较高开发活跃度：过去 24 小时有 **8 条 Issue 更新、67 条 PR 更新**，其中 3 条 Issue 已关闭，15 条 PR 已合并或关闭，未发布新版本。开发重点集中在 **会话与消息可靠性、容器启动、Web/iOS 交互体验以及测试质量**。需要优先关注的风险包括 `/stop` 后会话操作超时、本地单次运行无法启动子代理，以及特定运行时回复丢失。整体呈现“修复与体验打磨并行”的态势，但 52 条更新中的 PR 仍处于待合并状态，评审与验证是当前的重要环节。

> **数据边界：**仅提供了 67 条 PR 中的 30 条详情；PR 评论数均为 `undefined`，8 条 Issue 均为 1 条评论、0 个 👍，无法据此判断真实讨论热度。以下严格区分“已关闭”和“已合并”，不将待合并修复视为已交付。

## 2. 项目进展

### 已关闭的重要 PR：能确认流程推进，不能确认代码已落地

| PR | 推进内容 | 当前可确认的结果 |
|---|---|---|
| [#207228：共享与私有工作流归位](https://github.com/openclaw/openclaw/pull/207228) | 将重复的 Crabbox 指引、维护者私有扫描流程导向各自所有者，降低跨仓库维护负担 | PR 已关闭，关联 [Issue #207222](https://github.com/openclaw/openclaw/issues/207222) 也已关闭；未提供合并标记 |
| [#207240：Control UI 本地化刷新](https://github.com/openclaw/openclaw/pull/207240) | 同步生成的界面语言资源，并保留受保护分支检查流程 | PR 已关闭，是否合并未知 |
| [#206602：iOS 工具调用说明与时间线](https://github.com/openclaw/openclaw/pull/206602) | 尝试改善工具调用的可读性，增加时间线查看入口 | PR 已关闭；不能认定功能已交付 |

**进展判断：**今日可见的关闭项涉及贡献者工作流整理、本地化和 iOS 工具展示。由于缺少其余 PR 详情及明确的合并信息，无法准确量化新增能力；更明显的进展信号来自大量已提交、待评审的修复，而非版本交付。

## 3. 社区热点

由于评论数据不足，以下是按**用户影响和开发关注度**筛选的重点议题，不是互动量排名。

- **会话中断后的状态回收可靠性**  
  [Issue #207198](https://github.com/openclaw/openclaw/issues/207198) 报告执行 `/stop` 后，reset、rollover、compaction 等操作反复排队约 15 秒后超时。核心诉求是：停止任务必须完整释放会话状态，而不只是终止表面上的运行。

- **本地运行也需要完整的多代理能力**  
  [PR #207243](https://github.com/openclaw/openclaw/pull/207243) 针对 `openclaw agent --local` 单次运行中 `sessions_spawn` 无法工作的情况。它反映出本地 CLI 用户同样依赖子代理协作，不能将其视为仅适用于常驻服务的能力。

- **iOS 用户需要知道“代理正在做什么”**  
  [PR #206629](https://github.com/openclaw/openclaw/pull/206629) 希望工作状态行显示启动、推理或工具执行阶段；[PR #206639](https://github.com/openclaw/openclaw/pull/206639) 提出活动提示及可停止子代理的面板。两者体现了从“看到运行中”向“理解并控制运行过程”的需求升级。

- **Web 操作反馈必须及时且稳定**  
  [PR #207129](https://github.com/openclaw/openclaw/pull/207129)、[PR #207126](https://github.com/openclaw/openclaw/pull/207126) 分别处理隐藏会话、清除进度卡后界面反馈滞后的问题；[PR #207220](https://github.com/openclaw/openclaw/pull/207220) 则处理 HTML 预览加载时的布局位移。共同诉求是减少用户对“点击是否生效”的不确定感。

## 4. Bug 与稳定性

以下按优先级标签和潜在影响排序；复现与根因描述均来自所提供的报告或 PR 摘要。

| 优先级 | 问题与影响 | 状态 / 修复进展 |
|---|---|---|
| **P1** | [#207198：`/stop` 后会话切换超时](https://github.com/openclaw/openclaw/issues/207198)。报告称 owner settlement 未完成，导致会话重置、轮转、压缩反复等待约 15 秒，并涉及状态保留泄漏及消息丢失风险 | **OPEN，needs-info**；所给数据未见对应 fix PR，根因仍需维护者核实 |
| **P1** | [#207243：本地单次运行无法启动子代理](https://github.com/openclaw/openclaw/pull/207243)。`sessions_spawn` 返回 `published reply runtime missing for main` | **已有 fix PR，待合并**；带环境验证标签 |
| **P1** | [#207200：容器重建时 Gateway 就绪严重延迟](https://github.com/openclaw/openclaw/pull/207200)。PR 报告 104 秒不可就绪，超过部署的 60 秒限额，涉及启动前完整修复型 Doctor | **已有 fix PR，待作者处理**；标记兼容性合并风险 |
| **P2** | [#207237：google-antigravity-cli 回复丢失](https://github.com/openclaw/openclaw/issues/207237)。运行时提示建议调用 `session_status`，但该工具不在 CLI 本次运行的允许范围内 | **OPEN**；所给数据未见对应 fix PR |
| **P2** | [#207226：定时任务通知投递依赖模型轮次](https://github.com/openclaw/openclaw/pull/207226)。拟直接投递任务告警，将模型轮次保留为隐藏修复输入，降低消息遗漏风险 | **已有 fix PR，待维护者评审** |
| **P2** | [#207244：Doctor 误报设备身份不可读](https://github.com/openclaw/openclaw/issues/207244)。凭据存储完整时仍提示 `local-device-auth-unreadable` | **Issue 已关闭**；关闭原因与修复交付情况未知 |
| **P2（修复 PR）** | [#207218：HTML 预览加载导致点击目标移位](https://github.com/openclaw/openclaw/issues/207218)。骨架屏消失后预览上移，首次点击可能落空 | **已有 [fix PR #207220](https://github.com/openclaw/openclaw/pull/207220)**，待维护者评审 |
| **未标级** | [#207246：Bun 重启测试可能误拒有效 SQLite clean-close seal](https://github.com/openclaw/openclaw/issues/207246)。测试依赖新增 `written` 日志，但重复回执可能被抑制 | **OPEN**；未见 fix PR。当前证据指向测试判定问题，不能推断为数据库损坏 |

另有两项值得持续跟踪：

- **输入信任边界：**[PR #207205](https://github.com/openclaw/openclaw/pull/207205) 补充多块不可信内容的闭合处理及 MCP 服务路径边界；明确依赖 #207101，需按顺序评审合并，不能视为已完成安全修复。
- **多配置隔离：**[PR #207225](https://github.com/openclaw/openclaw/pull/207225) 修正存储初始化建议遗漏当前 profile、可能初始化到默认 profile 同名位置的问题；目前仍需补充证明。

## 5. 功能请求与路线图信号

- **导航栏快捷入口分隔线：需求明确，但尚未进入实现阶段。**  
  [Issue #207231](https://github.com/openclaw/openclaw/issues/207231) 希望在个人快捷入口之间放置可移动横向分隔线，不创建会话、不改变分组。当前标记为 **needs-product-decision / no-new-fix-pr**，更像待产品取舍的交互需求，不宜预测为下一版本内容。

- **iOS 代理可观测性与控制：已有实现提案。**  
  [PR #206629](https://github.com/openclaw/openclaw/pull/206629) 和 [PR #206639](https://github.com/openclaw/openclaw/pull/206639) 覆盖运行阶段展示、活动提示、子代理查看与停止。两者均为 XL 级变更且等待作者处理，后者还标记会话状态风险，短期落地存在不确定性。

- **小范围体验修复更接近评审完成。**  
  隐藏 Claude 内部注入摘要的 [PR #207234](https://github.com/openclaw/openclaw/pull/207234)、减少 iOS 连接提示闪烁的 [PR #207233](https://github.com/openclaw/openclaw/pull/207233)，均带有证据充分、待维护者评审标签。相较大型功能提案，它们更具近期合入条件，但仍无版本承诺。

## 6. 用户反馈摘要

**未提供评论正文，因此不能提炼评论中的真实评价或满意度。**以下仅归纳 Issue 描述和 PR 问题陈述中的痛点：

- **“停止后应立即恢复可用。”** 会话连续约 15 秒超时，影响需要频繁中断、重置和切换任务的工作流。来源：[Issue #207198](https://github.com/openclaw/openclaw/issues/207198)。
- **“诊断信息应与实际状态一致。”** 凭据完整却持续收到设备身份不可读提示，会增加排障成本并削弱对 Doctor 输出的信任。来源：[Issue #207244](https://github.com/openclaw/openclaw/issues/207244)。
- **“移动端不能只有计时器。”** 仅显示运行时间，难以分辨代理是在推理、执行工具还是卡住。来源：[PR #206629](https://github.com/openclaw/openclaw/pull/206629)。
- **“加载过程不应打断操作。”** HTML 预览布局变化导致点空，属于可直接感知的交互缺陷。来源：[Issue #207218](https://github.com/openclaw/openclaw/issues/207218)。

当前数据没有可验证的正向满意度反馈；Issue 关闭或 PR 提交也不能替代用户确认。

## 7. 待处理积压与维护建议

**无法确认长期未响应积压：**所列条目均于 11 月 28 日更新，最早创建日期仅为 11 月 27 日。以下是待处理重点，而非“长期无人响应”清单。

| 待处理项 | 建议关注点 |
|---|---|
| [Issue #207198](https://github.com/openclaw/openclaw/issues/207198) | 优先补齐环境、复现及 owner settlement 回归测试，推动 P1 会话问题从 needs-info 进入可验证修复 |
| [PR #207200](https://github.com/openclaw/openclaw/pull/207200) | 验证容器重建就绪时间，并确认调整 Doctor 启动路径后的兼容性与修复行为 |
| [PR #207243](https://github.com/openclaw/openclaw/pull/207243) | 完成本地单次运行的多运行时验证，确认子代理生命周期及回复路径 |
| [PR #207230](https://github.com/openclaw/openclaw/pull/207230) | 针对 root 更新、服务账户运行的 systemd 部署补齐验证；当前为 XL 变更且存在兼容性风险 |
| [Issue #207204](https://github.com/openclaw/openclaw/issues/207204) | Issue 已关闭但带有 `linked-pr-open` 标签，建议核对关联修复是否最终落地，避免把关闭误当作完成 |
| [PR #207205](https://github.com/openclaw/openclaw/pull/207205) | 明确依赖 PR 的处理顺序及边界责任人，避免堆叠修改在不可信内容边界上产生遗漏 |

**健康度结论：**项目修复响应和开发活动较强，尤其关注用户可感知的小问题及测试有效性；主要风险在于会话生命周期、消息投递和部署兼容性。下一阶段应优先推动高影响修复的验证与合入，再用明确的合并记录、发布说明和用户回测确认实际改善。

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向分析
**日期：2026-11-28｜观察窗口：过去 24 小时**

> **统计口径：**以下仅依据所给摘要。Issue、PR 数量指窗口内的**更新条目数**，不等于新增数；“无活动”不代表项目停滞。OpenClaw 仅有 30/67 条 PR 的详细信息，且两大活跃项目均缺少完整评论数据，因此不能据此判断真实讨论热度、社区规模或长期维护质量。

## 1. 生态全景

本次覆盖的 **13 个项目中，仅 OpenClaw 与 Hermes Agent 有可见活动**，合计 **13 条 Issue 更新、77 条 PR 更新**，开发活动在该观察窗口内高度集中。两者均未发布新版本，贡献重点从单纯扩展功能转向**会话连续性、工具调用可靠性、结果完整性和运行过程控制**。OpenClaw 涉及部署、运行时、Web/iOS 与输入信任边界，呈现多端系统的质量巩固特征；Hermes Agent 则集中于任务状态恢复、工具兼容和插件扩展。其余 11 个项目单日静默，证据不足以判断其迭代阶段或生态地位。

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | Release 情况 | 当日健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | **8** | **67** | 无新版本 | 活动高、修复覆盖广；会话与部署存在 P1 风险，评审及验证压力较大 |
| **Hermes Agent** | **5** | **10** | 无新版本 | 提交活跃、修复导向明确；10 条 PR 均待合并，交付闭环待确认 |
| NanoBot | 0 | 0 | 未见发布记录 | 单日无活动，无法判断 |
| PicoClaw | 0 | 0 | 未见发布记录 | 单日无活动，无法判断 |
| NanoClaw | 0 | 0 | 未见发布记录 | 单日无活动，无法判断 |
| NullClaw | 0 | 0 | 未见发布记录 | 单日无活动，无法判断 |
| IronClaw | 0 | 0 | 未见发布记录 | 单日无活动，无法判断 |
| LobsterAI | 0 | 0 | 未见发布记录 | 单日无活动，无法判断 |
| TinyClaw | 0 | 0 | 未见发布记录 | 单日无活动，无法判断 |
| Moltis | 0 | 0 | 未见发布记录 | 单日无活动，无法判断 |
| CoPaw | 0 | 0 | 未见发布记录 | 单日无活动，无法判断 |
| ZeptoClaw | 0 | 0 | 未见发布记录 | 单日无活动，无法判断 |
| ZeroClaw | 0 | 0 | 未见发布记录 | 单日无活动，无法判断 |
| **合计** | **13** | **77** | **未见新版本** | 活动集中，但不能外推为长期格局 |

**交付状态需要单独看：**

- **OpenClaw：**15 条 PR 已合并或关闭，52 条仍开放；不能将这 15 条全部计为合并成果。3 条 Issue 已关闭，也不意味着对应修复已发布。
- **Hermes Agent：**10 条 PR 全部开放；唯一关闭的 Issue 为权限探测项，不构成产品修复成果。
- PR 数量反映贡献与评审工作量，**不直接代表交付能力或代码质量**。

## 3. OpenClaw 在生态中的定位

### 当日开发活动的主要集中点

OpenClaw 占本次全部 Issue/PR 更新条目的 **83.3%（75/90）**，PR 更新量为 Hermes Agent 的 **6.7 倍**。这足以说明其当日开发活动领先，但不能据此推断贡献者人数、用户规模或长期社区优势。

### 相对优势：覆盖完整使用链路

从可见议题看，OpenClaw 同时处理：

- **执行层：**本地 CLI 子代理启动、会话终止与状态回收；
- **服务层：**Gateway 容器启动、systemd 部署、多 Profile 隔离；
- **交互层：**Web 操作反馈、HTML 预览、iOS 运行阶段与子代理控制；
- **边界治理：**不可信内容闭合处理、MCP 服务路径边界。

相较 Hermes Agent 当日较集中的任务状态、工具调用和插件议题，OpenClaw 展现出更广的**运行环境与客户端维护面**。这既是产品覆盖优势，也意味着更复杂的跨端一致性和回归验证成本。

### 技术路线差异

OpenClaw 当日更偏向**多端、网关及多代理运行链路的系统可靠性**；Hermes Agent 更偏向**任务执行语义、模型工具适配与插件扩展能力**。这是基于当日变更的侧重判断，不是对两者全部能力的排他性定义。

**社区规模结论：**缺少活跃贡献者、独立参与者、下载量及历史数据，无法可靠比较社区规模；目前只能确认 OpenClaw 的当日仓库活动显著更高。

## 4. 共同关注的技术方向

| 共同方向 | OpenClaw 的具体诉求 | Hermes Agent 的具体诉求 | 对开发者的启示 |
|---|---|---|---|
| **会话与任务状态连续性** | `/stop` 后 reset、rollover、compaction 超时；本地子代理生命周期问题 | 上下文压缩、agent 重建后恢复 todo 列表 | 停止、恢复、压缩应作为同一状态机验证，而非独立功能 |
| **工具与运行时契约一致性** | 运行时建议调用未获授权的 `session_status`，导致回复丢失 | 工具调用片段拆分、参数形态错误导致执行或提交失败 | 工具声明、模型输出、权限与执行器必须一致 |
| **运行中可观察、可干预** | iOS 展示推理/工具阶段，查看并停止子代理 | Desktop 提高 Steer 入口可发现性 | “正在运行”不足以支撑信任，还需解释状态并提供控制 |
| **结果完整性与可靠交付** | 定时任务通知拟绕过模型轮次直接投递 | 中断搜索明确标记“不完整” | 区分生成完成、执行完成、投递完成和结果完整 |
| **配置隔离与诊断** | 当前 Profile 的初始化位置、设备身份误报 | 相对工作目录导致群聊成员不回复，错误仅为 `invalid_params` | 配置错误应尽早暴露，并给出可操作诊断 |

这些方向是**跨项目共同出现的工程问题**，但相关修复大多仍待合并，不能视为已经解决。

## 5. 差异化定位分析

以下定位来自当日议题，不替代完整产品选型评估。

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| **功能侧重** | 多端体验、会话控制、子代理、消息投递与部署可靠性 | 任务状态恢复、工具执行兼容、桌面干预及插件扩展 |
| **议题对应的主要用户** | 自托管运维者、CLI 多代理用户、Web/iOS 用户 | 自动化工作流用户、模型接入者、桌面用户与插件开发者 |
| **可见架构组件** | Gateway、CLI、Web/iOS、Profile、会话与子代理运行时 | Session store、agent 重建、工具调用处理、Desktop、插件/A2A |
| **扩展性信号** | 不可信输入与 MCP 路径边界治理 | 声明式 `session.sourceLabels`、MCP 目录入口、派生结果回执需求 |
| **主要工程压力** | 多端状态同步、生命周期清理、部署兼容性 | 状态持久化、输出归一化、参数校验与插件契约 |

**对其余 11 个项目，不宜从项目名称推断轻量化、安全性、语言栈或目标用户。**本次没有足够动态支撑这些比较。

## 6. 社区热度与成熟度

### 活跃度分层

1. **高活动、质量巩固特征明显：OpenClaw**  
   67 条 PR 更新覆盖稳定性、测试、部署和交互改进，同时仍有大型 iOS 功能提案。更准确的描述是：**在高频迭代中强化质量，同时承担较重的验证负担**。

2. **中等活动、修复与扩展并行：Hermes Agent**  
   按摘要标签，10 条 PR 包括 **5 项 Bug 修复、3 项功能新增、2 项插件目录更新**。贡献结构较均衡，但当天尚无合并交付。

3. **静默观察层：其余 11 个项目**  
   只能确认该窗口内无活动，无法区分稳定维护、阶段性休整或维护不足。

### 热度不等于成熟度

- **真实讨论热度不可排名：**OpenClaw 的评论正文缺失；Hermes 的开放 Issue 均无评论和点赞，PR 评论字段未知。
- **问题数量不可直接比较稳定性：**覆盖面更广、使用更充分的项目，也可能暴露更多问题。
- **成熟度应看闭环：**修复合并、发布、回归测试和用户复测，比提交数量更有判断价值。

## 7. 值得关注的趋势信号

### ① 可靠性竞争从“是否报错”转向“是否静默失效”

回复丢失、todo 恢复失败、搜索结果不完整却未标注，可能不导致进程崩溃，却直接影响任务结论。

**参考价值：**测试应覆盖状态恢复、部分成功、消息未投递和结果不完整，而不只是异常捕获与进程存活。

### ② 代理可控性开始成为基础体验

OpenClaw 的阶段展示与子代理停止、Hermes 的 Steer 入口，都指向同一需求：用户需要理解并改变正在执行的任务。

**参考价值：**将运行阶段、任务归属、中断传播和中断后的状态清理纳入统一设计。

### ③ 模型输出与工具接口之间需要更清晰的适配层

工具调用拆片、metadata 形态错误、建议调用未授权工具，反映问题横跨模型、提示、权限与执行器。

**参考价值：**在严格执行前提供受控的输出归一化与错误恢复，同时避免通过过度宽松校验扩大权限边界。

### ④ 确定性通知正在与模型推理解耦

OpenClaw 的定时任务告警直投提案，提示关键通知不宜完全依赖模型轮次成功。

**参考价值：**将模型用于解释和修复，将关键通知交由可重试、可审计的确定性链路；该方向目前仍是待合并提案。

### ⑤ 插件扩展开始触及来源证明与声明式接口

Hermes 的 provider attempt 回执需求、桌面消息来源声明，表明扩展诉求正从“接入能力”延伸至“说明来源、减少核心耦合”。其中来源证明仍是单项目探索信号，尚不能视为生态共识。

**参考价值：**插件 API 应提前考虑结果来源、生命周期和展示元数据，减少后续硬编码。

---

**决策结论：**OpenClaw 是本观察窗口中覆盖面最广、活动最集中的项目，重点应跟踪会话、部署和消息链路的高影响修复能否完成验证与发布；Hermes Agent 值得关注其任务恢复、工具适配及插件契约能否形成稳定交付。对其余项目应补充更长时间窗口的数据，避免将单日静默误判为生态落后。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-11-28｜统计范围：过去 24 小时**  
项目：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

## 1. 今日速览

今日共有 **5 条 Issue 更新、10 条 PR 更新**；其中 4 条 Issue 保持开放、1 条关闭，10 条 PR 均待合并，未出现合并或关闭记录。按标签统计，待合并 PR 中有 **5 项 Bug 修复、3 项功能新增、2 项插件目录更新**，贡献主要围绕工具调用、会话连续性和桌面交互展开。今日没有新版本发布，因此应将这些变化视为**修复与功能储备，而非已交付成果**。整体呈现“提交活跃、讨论较少、交付尚待确认”的状态；仅凭单日数据，尚不能判断维护响应速度或长期项目健康度。  
[项目入口](https://github.com/NousResearch/hermes-agent)

## 2. 项目进展

### 已落地进展
**今日无已合并或已关闭的重要 PR。** 唯一关闭的 Issue 是无实际功能变更的权限探测项，不能计为产品修复成果。  
[Issue #160998](https://github.com/NousResearch/hermes-agent/issues/160998)

### 待合并的重点进展

| 方向 | 主要变化与意义 | 状态 |
|---|---|---|
| 会话任务连续性 | 从 session store 恢复重建 agent 的 todo 列表，针对上下文压缩后仅靠消息窗口回放无法恢复任务状态的问题。 | [PR #161005](https://github.com/NousResearch/hermes-agent/pull/161005)，OPEN / P2 |
| 模型工具调用兼容性 | 合并被模型拆散的相邻 `tool_call` 片段，使扁平化批次能够作为真实工具调用执行；摘要记录了 `glm-5.3` 经 z.ai 服务时的案例。 | [PR #161004](https://github.com/NousResearch/hermes-agent/pull/161004)，OPEN / P2 |
| 搜索结果可信度 | 将被中断的搜索明确标记为“不完整”，避免部分命中或空结果被误读为完整检索结论。 | [PR #161001](https://github.com/NousResearch/hermes-agent/pull/161001)，OPEN / P2 |
| 桌面运行中干预 | 在折叠队列中显示首个符合条件的提示及 Steer 按钮，提高运行中调整任务的可发现性。 | [PR #161006](https://github.com/NousResearch/hermes-agent/pull/161006)，OPEN / P2 |

**进展判断：** 今日修复提案触及“状态不丢失、调用可执行、结果不误导、操作可发现”四类关键可靠性问题，但实际收益仍取决于后续审查、合并和发布。

## 3. 社区热点

**今日未形成可由互动数据支持的技术讨论热点。** 四条开放 Issue 均为 **0 评论、0 👍**；PR 的评论字段为 `undefined`，不能当作零评论，也无法据此进行讨论热度排名。唯一有 1 条评论的 Issue 是已关闭的权限探测项，技术参考价值有限。  
[Issue #160998](https://github.com/NousResearch/hermes-agent/issues/160998)

以下是**影响面值得关注、但尚无热度证据**的议题：

- **跨 Agent 通信受边缘防护拦截。** A2A 插件请求未显式设置 User-Agent，使用 urllib 默认值，报告称 Cloudflare 前置的对端因此返回 403 / 1010。背后诉求是跨服务互操作性，而不只是请求头配置。  
  [Issue #161003](https://github.com/NousResearch/hermes-agent/issues/161003)
- **模型输出与工具严格参数校验不匹配。** 看板完成操作会因 metadata 字段被扁平化或类型错误而拒绝已经形成的评审结论，反映工具接口对模型输出容错的需求。  
  [Issue #160997](https://github.com/NousResearch/hermes-agent/issues/160997)
- **多 Profile 群聊故障难定位。** 相对工作目录导致群聊中单个成员始终不回复，而其他成员正常，且错误只显示为 `invalid_params`，暴露配置校验与诊断信息不足。  
  [Issue #160996](https://github.com/NousResearch/hermes-agent/issues/160996)

## 4. Bug 与稳定性

以下按数据中已有的 **P2 → P3** 优先级排列；同级内不额外推定严重性。

| 优先级 | 问题及影响 | Fix PR 状态 |
|---|---|---|
| **P2** | A2A 默认 User-Agent 触发部分 Cloudflare 前置对端的 403 / 1010，阻断相关出站请求。 | 提供的数据中未见对应修复。[Issue #161003](https://github.com/NousResearch/hermes-agent/issues/161003) |
| **P2** | `kanban_complete` 因 metadata 参数形态不合规而拒绝完成操作，已写入 summary 的评审结论无法正常提交。 | 提供的数据中未见对应修复。[Issue #160997](https://github.com/NousResearch/hermes-agent/issues/160997) |
| **P2** | agent 重建与上下文压缩后，内存中的 todo 列表可能无法从当前窗口恢复。 | 已有待合并修复：[PR #161005](https://github.com/NousResearch/hermes-agent/pull/161005) |
| **P2** | 模型将工具调用名称与参数拆成相邻片段，且参数片段存在闭合问题，影响批量调用执行。 | 已有待合并修复：[PR #161004](https://github.com/NousResearch/hermes-agent/pull/161004) |
| **P2** | 中断搜索的部分结果或空结果被呈现为完整结果，可能误导后续判断。 | 已有待合并修复：[PR #161001](https://github.com/NousResearch/hermes-agent/pull/161001) |
| **P2** | Desktop 折叠队列未明显提供 Steer 操作，降低运行中调整提示的可用性。 | 已有待合并修复：[PR #161006](https://github.com/NousResearch/hermes-agent/pull/161006) |
| **P3** | 相对 `terminal.cwd` 使 hosted-room 会话创建失败，表现为群聊成员不回复及简略参数错误。 | 有直接对应的修复提案，将相对路径锚定到 gateway 启动目录：[Issue #160996](https://github.com/NousResearch/hermes-agent/issues/160996) / [PR #160999](https://github.com/NousResearch/hermes-agent/pull/160999) |

**稳定性观察：** 今日风险集中在静默失效、状态恢复和结果完整性，而非已确认的进程崩溃。尤其应关注“搜索未完成却看似完成”和“任务状态在压缩后丢失”，这两类问题可能不明显报错，却影响用户对 agent 的信任。

## 5. 功能请求与路线图信号

| 需求 / 提案 | 用户价值 | 纳入后续版本的信号 |
|---|---|---|
| **完成轮次后的无工具派生与可验证回执** | 插件希望基于已完成对话生成结构化摘要，并将结果绑定到实际生成该轮次的 provider attempt。 | 目前仅见需求，未见对应 PR，仍属探索信号。[Issue #160992](https://github.com/NousResearch/hermes-agent/issues/160992) |
| **Nous 账户用量 JSON 输出** | `hermes usage --provider nous --json` 提供套餐、额度窗口、续费和 credit 信息，便于脚本集成；提案强调只读，不刷新或持久化 OAuth 状态。 | 已有实现提案，交付路径比纯需求明确，但尚未合并。[PR #160994](https://github.com/NousResearch/hermes-agent/pull/160994) |
| **插件自定义桌面消息侧栏分组** | 通过声明式 `session.sourceLabels` 调整消息来源的标签和分组，减少核心代码对具体集成的硬编码。 | 已有待合并 PR，体现桌面插件扩展方向。[PR #160993](https://github.com/NousResearch/hermes-agent/pull/160993) |
| **TempGuru MCP 目录条目** | 为活动人员配置服务提供目录安装入口，减少手写 MCP 配置。 | 已有待合并 PR。[PR #161002](https://github.com/NousResearch/hermes-agent/pull/161002) |

另有两项生态维护提案：**LoreDocs 升至 0.1.36**，摘要称无需新增依赖或环境变量；**REVamp 从 alpha.6 升至 1.0.0**。两者均是插件目录更新，**不是 Hermes Agent 核心版本发布**。  
[PR #161000](https://github.com/NousResearch/hermes-agent/pull/161000) · [PR #160995](https://github.com/NousResearch/hermes-agent/pull/160995)

以上均未提供版本里程碑或维护者承诺，不能确认会进入“下一版本”。

## 6. 用户反馈摘要

**数据限制：** 未提供评论正文，开放 Issue 也暂无评论，因此下列内容来自 Issue 描述，不代表评论区共识或满意度调查。

- **群聊场景需要更可诊断的失败信息。** 同一网关的两个 Profile 中，一个正常、一个每轮约 25 毫秒内失败，用户很难仅凭 `invalid_params` 找到相对路径这一配置根因。  
  [Issue #160996](https://github.com/NousResearch/hermes-agent/issues/160996)
- **评审自动化需要保住已完成的工作。** 用户痛点不仅是参数验证失败，而是结论已经生成，却因 metadata 形态问题无法完成工作流。  
  [Issue #160997](https://github.com/NousResearch/hermes-agent/issues/160997)
- **A2A 使用者期待与常见网络基础设施兼容。** 对端存在并不意味着可连接，请求标识可能成为实际部署中的阻断点。  
  [Issue #161003](https://github.com/NousResearch/hermes-agent/issues/161003)
- **插件开发者开始关注派生结果的来源证明。** 新需求强调可验证回执与 provider attempt 绑定，显示诉求正在从“生成摘要”延伸到“证明摘要依据何次生成”。  
  [Issue #160992](https://github.com/NousResearch/hermes-agent/issues/160992)

当前数据中没有可引用的明确满意评价，也不足以判断整体满意度变化。

## 7. 待处理积压

**无法识别长期未响应积压。** 本次所有条目均在 2026-11-28 创建，且没有更早历史、审查记录或首次响应时间；不能将当天开放条目描述为长期滞留。

建议维护者优先关注：

1. **尚无对应修复的两项 P2 Issue：** 先确认 A2A 请求被拦截的复现条件，以及看板 metadata 容错的预期边界。  
   [#161003](https://github.com/NousResearch/hermes-agent/issues/161003) · [#160997](https://github.com/NousResearch/hermes-agent/issues/160997)
2. **涉及隐性状态与结论可信度的修复：** 审查 todo 恢复和中断搜索标记，并验证跨压缩边界、空结果及部分结果场景。  
   [PR #161005](https://github.com/NousResearch/hermes-agent/pull/161005) · [PR #161001](https://github.com/NousResearch/hermes-agent/pull/161001)
3. **已有 Issue—PR 对应关系的问题：** 验证相对工作目录修复能否恢复 hosted-room 群聊成员响应，并检查诊断信息是否仍需补强。  
   [Issue #160996](https://github.com/NousResearch/hermes-agent/issues/160996) · [PR #160999](https://github.com/NousResearch/hermes-agent/pull/160999)

**综合判断：今日贡献覆盖面较好、修复导向明确，但交付闭环尚未形成。后续最值得跟踪的是 P2 修复的合并速度、缺少 fix 的问题是否获得响应，以及修复是否经过实际场景验证。**

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

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*