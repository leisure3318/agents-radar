# OpenClaw 生态日报 2026-11-23

> Issues: 7 | PRs: 20 | 覆盖项目: 13 个 | 生成时间: 2026-11-23 03:58 UTC

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
**日期：2026-11-23｜统计范围：过去 24 小时**

> 本日报仅依据所提供的 GitHub 数据。PR 的 `CLOSED` 状态不等同于已合并；由于缺少合并记录与评论正文，以下会区分“问题报告”“修复提案”和“已关闭记录”，不将其视为已发布成果。

## 1. 今日速览

过去 24 小时，OpenClaw 有 **7 条 Issue、20 条 PR 更新**，其中 14 条 PR 仍开放、6 条已关闭，未有新版本发布，开发活动较活跃。工作重点明显偏向**升级链路、Gateway 稳定性、运行时任务交接和客户端体验修复**，而非大规模新增功能。新报告中，升级相关问题占 **3/7**，组件展示问题占 **2/7**，反映安装维护和跨端输出仍是主要体验薄弱点。整体呈现“持续修复与发布加固”的状态，但多个 P1 或安全敏感改动仍待审核，尚不能据此认定稳定性问题已解决。

重点关注：[pnpm 升级修复 #203401](https://github.com/openclaw/openclaw/pull/203401)、[低内存启动优化 #203790](https://github.com/openclaw/openclaw/pull/203790)、[运行时交接修复 #203901](https://github.com/openclaw/openclaw/pull/203901)。

## 2. 项目进展

### 已关闭的重要 PR：覆盖发布流程、内存与交互问题

**以下均只能确认已关闭，不能确认是否合并。**

| 方向 | 今日关闭记录 | 进展与边界 |
|---|---|---|
| Gateway 内存 | [#203522：停止每次插件重载后内存持续增长](https://github.com/openclaw/openclaw/pull/203522) | 针对重建后插件原生成员映射持续被引用的问题，关系到长期运行实例的堆内存稳定性。标为 P1，但是否已进入主分支仍需核实。 |
| 发布验证 | [#203895：让 macOS 包检查完成](https://github.com/openclaw/openclaw/pull/203895)、[#203896：将检查时限延长至 15 分钟](https://github.com/openclaw/openclaw/pull/203896) | 处理 macOS 发布交接过程中 npm 包检查超时，属于发布资格验证改进，不直接改变应用行为。 |
| 发布恢复 | [#203888：部分发布后复用原始 ClawHub 字节](https://github.com/openclaw/openclaw/pull/203888) | 处理部分发布后的恢复与一致性问题，体现发布链路仍在加固。 |
| Web 交互 | [#203838：Cmd+K 切换模型后保留发送能力](https://github.com/openclaw/openclaw/pull/203838) | 针对已有草稿切换模型后 Send 按钮仍禁用、需重新编辑才能恢复的问题。 |
| 授权机制重构 | [#203892：移除 receipt 布尔值及相关回执](https://github.com/openclaw/openclaw/pull/203892) | 属于 one-admission receipt 系列重构，涉及授权语义且标记为安全敏感，实际落地状态需进一步确认。 |

### 仍在推进的重要工作

- **升级可用性**：[P1 #203401](https://github.com/openclaw/openclaw/pull/203401) 尝试保证 pnpm 更新后 CLI 可用，并在数据库迁移场景下自动重启 Gateway。
- **小型部署稳定性**：[P1 #203790](https://github.com/openclaw/openclaw/pull/203790) 针对 1.5 GiB 容器首次启动、首次智能体执行时的 OOM；摘要给出的基线测试中，问题在 3 次运行里出现 1 次。
- **可恢复错误语义**：[#203902](https://github.com/openclaw/openclaw/pull/203902) 保留状态 worker 返回的维护争用错误类型，避免临时拒绝被调用方当成永久失败。
- **运行时交接完整性**：[#203901](https://github.com/openclaw/openclaw/pull/203901) 涵盖推理历史、资源归属、认证恢复和插件重载期间待发送任务，范围为 XL，且涉及安全敏感改动。

**进展判断：**今日推进主要集中在可靠性“补短板”。修复覆盖面较广，但开放 PR 较多、关闭记录缺少合并证据，因此更适合评价为**修复管线活跃，实际交付效果待确认**。

## 3. 社区热点

### 热度数据：暂无明显领先话题

7 条 Issue 均为 **1 条评论、0 个 👍**；PR 评论数均缺失，不能视为零，也无法据此排列讨论热度。以下按问题聚集程度和用户影响选取，而非声称其讨论量最高。

1. **升级是否会破坏正在运行的实例**
   - [#203897：npm 全局升级触发过早重启](https://github.com/openclaw/openclaw/issues/203897)
   - [#203899：package-doctor 更新失败](https://github.com/openclaw/openclaw/issues/203899)
   - [#203890：candidate-doctor 更新失败](https://github.com/openclaw/openclaw/issues/203890)
   - **背后诉求：**升级应是可验证、可恢复的维护操作，而不应让 CLI 或 Gateway 陷入中间状态。两条 doctor 报告仍需更多信息，不能认定与 npm 重启竞态同源。

2. **智能体工具“执行成功”与用户“看见结果”之间存在断层**
   - [#203906：MCP Apps widget 循环加载](https://github.com/openclaw/openclaw/issues/203906)
   - [#203893：claude-cli 的 `show_widget` 未送达 iOS](https://github.com/openclaw/openclaw/issues/203893)
   - **背后诉求：**富内容输出需要贯通运行时、协议、历史记录与客户端，而不只是工具调用返回成功。

3. **长任务不应被界面操作打断**
   - [#203887：执行期间排队手动压缩](https://github.com/openclaw/openclaw/issues/203887)
   - [PR #203889：End Talk 后继续已接受任务](https://github.com/openclaw/openclaw/pull/203889)
   - **背后诉求：**将会话控制、音频连接和后台任务生命周期解耦，增强个人助手的持续执行能力。

## 4. Bug 与稳定性

以下按潜在影响排序，**不替代仓库正式优先级**；新 Issue 中除首项外的若干问题已有 P2 标签，并非已确认的 P0/P1 事故。

| 关注级别 | 问题与影响 | 修复状态 |
|---|---|---|
| **高** | [#203897：升级时重启进入尚未写完的 npm 包目录](https://github.com/openclaw/openclaw/issues/203897)。可能触发多次 `ERR_MODULE_NOT_FOUND`，并使重启交接写入失败，直接影响服务可用性。 | 标签注明无新 fix PR、待维护者审核。[#203401](https://github.com/openclaw/openclaw/pull/203401) 是 pnpm 升级方向，不能视为此 npm 竞态的已确认修复。 |
| **中高** | [#203899：macOS x64 的 package-doctor 更新失败](https://github.com/openclaw/openclaw/issues/203899)、[#203890：macOS arm64 的 candidate-doctor 更新失败](https://github.com/openclaw/openclaw/issues/203890)。影响升级完成。 | 均标记需要更多信息；所给数据未见明确对应 fix PR。 |
| **中** | [#203906：macOS MCP Apps widget 无法完成加载](https://github.com/openclaw/openclaw/issues/203906)。代理握手完成，但资源加载信号未到达，导致超时和 iframe 循环重载。 | 未见明确对应 fix PR。 |
| **中** | [#203893：claude-cli 的内联 widget 无法抵达 iOS](https://github.com/openclaw/openclaw/issues/203893)。实时消息与历史记录均无 `canvas` 块，工具行显示 “Outcome unknown”。 | 已标记可排队修复、修复形态明确；未见对应 fix PR。 |
| **中** | [#203905：记忆 dreaming 开关重启后回到 false](https://github.com/openclaw/openclaw/issues/203905)。报告称任务被移除，而非仅禁用，影响后台记忆维护。 | 未见明确对应 fix PR；环境为 ClawX 内置的 OpenClaw 2026.10.10，需区分核心与封装集成因素。 |

**额外稳定性风险：**[首次启动 OOM #203790](https://github.com/openclaw/openclaw/pull/203790) 仍开放；[插件重载内存增长 #203522](https://github.com/openclaw/openclaw/pull/203522) 虽已关闭，但缺少合并证据。两者应分别验证，不能合并视为同一项内存修复。

## 5. 功能请求与路线图信号

| 信号 | 用户价值 | 下一版本判断 |
|---|---|---|
| [#203887：忙碌会话接受并排队 `/compact`](https://github.com/openclaw/openclaw/issues/203887) | 用户往往在上下文接近上限时才手动压缩，当前却因 active run 收到 `INVALID_REQUEST`。 | 仍需产品决策、维护者审核，且无新 fix PR；短期落地不确定。 |
| [#203443：MCP 支持预注册 OAuth client](https://github.com/openclaw/openclaw/pull/203443) | 可连接不支持动态客户端注册、要求既有 client ID 的 MCP OAuth 服务，包括部分 Google OAuth 部署。 | 已有 PR，标签显示验证证据充分、等待维护者，但须安全审核；具备候选条件，不代表已承诺发布。 |
| [#203889：结束 Talk 不取消已接受工作](https://github.com/openclaw/openclaw/pull/203889) | iPhone/iPad 用户停止语音后，答案仍可在聊天中完成。 | 已有实现提案，当前等待作者，仍有推进环节。 |
| [#203891：以已结算运行用量计入 Goal token 预算](https://github.com/openclaw/openclaw/pull/203891) | 避免仅以上下文增长计算预算，导致实际推理消耗未被计入。 | 已有 PR，但有兼容风险和待补证据标签，需验证后再判断发布机会。 |

总体上，路线图信号集中于**任务连续性、MCP 企业认证兼容和真实成本控制**，均服务于更长期、更可管理的智能体运行。

## 6. 用户反馈摘要

**数据边界：未提供评论正文。以下来自 Issue 描述，不能冒充评论原文或满意度调查。**

- **运维用户希望升级“不停服、不半成品启动”。**运行中的 Gateway 在 npm 更新尚未完成时自动重启，暴露了升级操作与进程生命周期协调不足。[#203897](https://github.com/openclaw/openclaw/issues/203897)
- **跨端用户需要可见、可追溯的工具结果。**iOS 上不仅当前界面缺少 widget，历史记录也没有对应内容；这比单纯渲染延迟更难通过刷新解决。[#203893](https://github.com/openclaw/openclaw/issues/203893)
- **记忆功能用户重视配置持久性。**界面已启用的 dreaming 在重启后失效，削弱了用户对后台自动化的信任。[#203905](https://github.com/openclaw/openclaw/issues/203905)
- **长会话用户需要顺应工作流的控制方式。**上下文紧张时发起压缩却被拒绝，用户期望系统接收请求并等待安全时机执行。[#203887](https://github.com/openclaw/openclaw/issues/203887)

本批数据以故障与需求报告为主，**没有足够证据总结正向满意度，也不能据此推断整体用户口碑恶化**。

## 7. 待处理积压与维护者提醒

本批最早的 PR 创建于 **11 月 22 日**，所有 Issue 均为当日新建，**无法识别真正“长期未响应”的积压**。以下是值得优先跟进的开放事项，而非长期无人处理的断言：

| 优先关注 | 当前状态与建议 |
|---|---|
| [P1 #203401：pnpm 升级后 CLI/Gateway 可用性](https://github.com/openclaw/openclaw/pull/203401) | XL 改动，建议优先核查跨版本升级、数据库迁移与重启验证结果；不要与 npm 全局升级竞态混为一谈。 |
| [P1 #203790：低内存环境首次启动 OOM](https://github.com/openclaw/openclaw/pull/203790) | 已标记可供维护者审阅。建议明确优化后的峰值内存及重复测试结果。 |
| [#203443：MCP 预注册 OAuth client](https://github.com/openclaw/openclaw/pull/203443) | 等待维护者且要求安全审核，是明确的外部服务接入阻塞点。 |
| [#203901：运行时交接与恢复](https://github.com/openclaw/openclaw/pull/203901) | XL、安全敏感，涉及多个子系统，建议明确复现材料、逐项验证范围及与其他修复的重叠关系。 |
| [#203897：npm 更新重启竞态](https://github.com/openclaw/openclaw/issues/203897) | 已标记源码可复现、待维护者审核且无新 fix PR，建议明确负责人和修复路径。 |

**发布纪律提醒：**[#203908](https://github.com/openclaw/openclaw/pull/203908) 明确为 macOS voice rpath 的一次性验证 PR，注明不应合入主分支或发布分支；应将其视为验证材料，而非待发布功能。

---

**健康度结论：**OpenClaw 今日研发响应活跃，可靠性问题的识别和修复提案较充分；主要风险集中在升级安全、资源生命周期与多端输出一致性。下一步最有价值的信号不是 PR 数量继续增加，而是 **P1 修复获审、关闭记录的合并状态确认，以及发布后的端到端验证结果**。

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向分析
**日期：2026-11-23｜观察窗口：过去 24 小时**

> **口径说明：**以下仅依据所提供的数据；Issues、PR 数均指窗口内更新条目，不等同于新增量或交付量。`CLOSED` 不代表已合并；单日活动量不代表社区规模、长期健康度或产品成熟度。

## 1. 生态全景

本次覆盖 **13 个项目，共有 14 条 Issue、39 条 PR 更新，均无新版本发布**；其中 7 个项目有可见活动，6 个项目无活动。OpenClaw 贡献了 **27/53 条更新，约占 51%**，是本窗口内最主要的工程活动中心。生态工作重心正在从“接入更多能力”转向“让能力可靠完成”：升级与重启、任务连续性、跨端结果交付、工具契约和认证兼容反复出现。与此同时，执行引擎与宿主解耦、共享 CLI 接入层、插件上下文接口等提案，显示部分项目正探索更模块化的扩展方式。**本日可见成果主要仍在提案、评审或关闭状态核验阶段，尚无足够证据判断交付速度或稳定性已明显改善。**

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | PR 状态 | Release | 健康度评估：仅限本日 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 7 | 20 | 14 开放、6 关闭 | 无 | 修复管线活跃；升级、内存和交接风险突出，交付效果待验证 |
| **Hermes Agent** | 6 | 7 | 全部开放 | 无 | 核心需求与插件贡献并行；OAuth、重启等问题需跟进 |
| **ZeroClaw** | 0 | 8 | 全部开放 | 无 | 接入层开发集中；堆叠 PR 与破坏性移除增加评审复杂度 |
| **LobsterAI** | 0 | 2 | 全部关闭 | 无 | 聚焦 DSH 适配与文档同步；是否合并待核验 |
| **NanoBot** | 0 | 1 | 已关闭 | 无 | 局部 WebUI 打磨；不足以判断整体健康度 |
| **NanoClaw** | 0 | 1 | 开放 | 无 | 推进 Signal 附件单点修复，验证与合并待完成 |
| **CoPaw** | 1 | 0 | — | 无 | 有架构需求输入，尚无实现证据 |
| PicoClaw | 0 | 0 | — | 无 | 窗口内无活动，无法评价 |
| NullClaw | 0 | 0 | — | 无 | 窗口内无活动，无法评价 |
| IronClaw | 0 | 0 | — | 无 | 窗口内无活动，无法评价 |
| TinyClaw | 0 | 0 | — | 无 | 窗口内无活动，无法评价 |
| Moltis | 0 | 0 | — | 无 | 窗口内无活动，无法评价 |
| ZeptoClaw | 0 | 0 | — | 无 | 窗口内无活动，无法评价 |
| **合计** | **14** | **39** | **30 开放、9 关闭；无可确认合并记录** | **均无** | 活动集中，交付证据有限 |

**数据归属提醒：**NanoClaw 的 PR 指向 `nanocoai/nanoclaw`，与题设仓库不同；CoPaw 的 Issue 指向 `agentscope-ai/QwenPaw`。迁移或归属关系未经核验，应避免直接并入长期仓库统计。

## 3. OpenClaw 在生态中的定位

### 优势：本日表现出更宽的系统工程覆盖面

OpenClaw 同时涉及安装升级、Gateway、资源管理、运行时交接、MCP、Web/iOS 输出和用量预算。相比其他项目较集中的单点工作，它更像是在维护一个**跨运行时、渠道与客户端的个人助手系统**。

其相对优势主要体现在：

- **问题识别与修复储备较充分：**20 条 PR 覆盖升级、内存、发布恢复和任务生命周期等多个环节。
- **长期运行诉求更具体：**低内存启动、插件重载泄漏、后台任务交接，均直接关系到无人值守部署。
- **使用闭环覆盖更广：**不仅关注工具是否执行，还关注结果是否抵达客户端、任务是否持续完成、成本是否准确计量。

但这也意味着更高的集成成本。升级相关报告占其新 Issue 的 **3/7**，说明安装维护链路仍是明显薄弱点；高活动量不能抵消这些风险。

### 技术路线差异

| 对比对象 | OpenClaw 本日侧重 | 对方本日侧重 |
|---|---|---|
| Hermes Agent | 系统可靠性、跨端输出、运行时交接 | 插件生态、可信消息上下文、渠道配置 |
| ZeroClaw | 既有系统运行与维护闭环 | ACP CLI 接入复用、提供商迁移、参数契约 |
| CoPaw | 现有运行体系的生命周期治理 | 执行引擎与记忆、工具、路由等宿主能力解耦 |
| NanoBot / NanoClaw | 多子系统并行加固 | WebUI 或 Signal 附件的局部体验与可用性 |

### 社区规模：只能比较活动，不能比较人数

OpenClaw 的 **27 条更新**高于 Hermes Agent 的 13 条和 ZeroClaw 的 8 条，可以确认其**本日可见活动最多**。但缺少贡献者总数、活跃用户、Stars、历史吞吐和评论正文，不能据此断言社区规模最大。

此外，ZeroClaw 的 5 条相关 PR 来自同一作者，且存在堆叠关系，进一步说明 **PR 数不等于独立贡献者数，也不等于独立功能数**。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求与共同问题 |
|---|---|---|
| **进程生命周期与恢复** | OpenClaw、Hermes Agent | OpenClaw 关注升级重启竞态、交接与插件资源释放；Hermes 关注 `stop()` 异常后 Gateway 卡在 `draining` |
| **长任务与交互解耦** | OpenClaw、Hermes Agent | 结束语音不取消已接受任务、忙碌时排队压缩、跨设备完成通知、按任务调整澄清等待时间 |
| **执行完成到用户可用的端到端闭环** | OpenClaw、NanoClaw、LobsterAI | widget 无法送达、附件路径在容器内不可读、工具输出格式不符合运行时契约 |
| **模块化与扩展接口** | CoPaw、ZeroClaw、Hermes Agent | 执行层与宿主解耦、共享 ACP 客户端、为插件提供宿主支持的消息来源上下文 |
| **外部认证与提供商兼容** | OpenClaw、Hermes Agent、ZeroClaw | MCP 预注册 OAuth client、Anthropic OAuth 疑似回归、Grok 认证配置及 CLI 提供商迁移 |
| **成本与状态可信度** | OpenClaw、Hermes Agent | 按实际结算用量计入预算；恢复会话后正确展示多模态用量状态 |

共同主题是：**接口宣称、执行状态与用户实际得到的结果必须一致**。当前不少问题发生在系统边界，而非模型推理本身。

## 5. 差异化定位分析

以下是依据本日动态形成的定位线索，并非对各项目全部能力的完整评价。

| 项目 | 功能侧重 | 更直接受益的用户 | 可见架构特征或工程重点 |
|---|---|---|---|
| **OpenClaw** | 持续运行、多端交互、任务与成本治理 | 自托管运维用户、跨设备助手用户 | Gateway、运行时、插件、客户端的协同治理 |
| **Hermes Agent** | 插件扩展、消息渠道、交互控制 | 插件开发者、多渠道助手用户 | profile 范围上下文、扩展 API 与渠道配置 |
| **ZeroClaw** | CLI 提供商接入与工具调用正确性 | 多提供商用户、接入层开发者 | Rust workspace、共享 ACP 客户端、严格参数校验 |
| **CoPaw** | 执行后端可替换性 | 需要组合不同执行引擎的开发者 | 拟分离 Execution SDK/Agent Loop 与宿主能力 |
| **LobsterAI** | DSH 运行时适配与开发接入 | 使用相关工具链的用户和贡献者 | 工具输出契约、隔离配置与工作区约定 |
| **NanoClaw** | Signal 附件可用性 | 消息驱动的容器化助手用户 | 宿主机与智能体容器间的数据传递 |
| **NanoBot** | 文件修改审阅体验 | 使用 WebUI 查看多文件变更的用户 | 文件行与差异展开交互优化 |

其余 6 个无活动项目，缺少本日证据，不宜据名称或既有印象推断架构和定位。

## 6. 社区热度与成熟度

### 本日活动分层

- **高活动：OpenClaw。**多子系统并行推进，以可靠性修复和发布加固为主。
- **集中迭代：Hermes Agent、ZeroClaw。**前者兼有插件扩展和核心问题输入；后者集中调整 CLI 接入体系。
- **低频定向维护：LobsterAI、NanoBot、NanoClaw。**分别聚焦运行时适配、界面打磨和附件读取。
- **需求讨论：CoPaw。**有架构提案，尚未形成实现。
- **观察空窗：其余 6 个项目。**无活动不能解释为停滞，也不能解释为稳定。

### 快速迭代与质量巩固并存

**按工作内容判断，**Hermes Agent、ZeroClaw 更偏能力扩展与架构调整；OpenClaw、LobsterAI 更偏质量巩固；NanoClaw、NanoBot 属于局部完善。但缺少合并和发布证据，不能确认谁的实际交付迭代最快。

社区互动方面，现有 Issue 通常只有 **0—1 条评论**，已提供的 👍 均为 0，PR 评论数大量缺失。因此可以比较工程活动，**不能可靠评出社区热度冠军或用户满意度高低**。

成熟度更值得观察的指标是：

1. 修复是否经过审查、合并和发布；
2. 升级、重启、容器与跨端流程是否有端到端回归测试；
3. 破坏性变更是否附带迁移方案；
4. 失败状态是否可观测、可恢复、可追溯。

## 7. 值得关注的趋势信号

### ① “成功返回”正在让位于“用户目标真正完成”

widget 丢失、容器附件不可读、输出格式错误、参数被静默忽略，均表明局部成功不足以保证任务可用。

**开发参考：**验收应覆盖输入接入、工具执行、结果持久化、跨端展示与通知，而不仅检查工具返回码。

### ② 个人助手正转向可持续、可中断、可恢复的后台执行

OpenClaw 的任务交接与语音结束行为，以及 Hermes 的完成通知和等待超时需求，表明用户期待助手在离开界面后继续工作。

**开发参考：**将任务生命周期与 UI、音频连接和消息会话解耦，明确取消语义、恢复机制和结果投递责任。

### ③ 可替换执行层与可复用宿主能力成为架构议题

CoPaw 的解耦提案、ZeroClaw 的 ACP 抽象和 Hermes 的上下文 API，指向不同形式的模块化。

**开发参考：**区分执行循环、模型接入与记忆/工具/渠道能力，同时明确认证、会话绑定及隔离边界；目前这些仍是不同项目的探索，并非统一标准。

### ④ 外部工具变化正在成为兼容性成本来源

OAuth 回归报告、CLI 提供商迁移和 DSH 输出契约不匹配，均说明外部依赖变化会直接影响核心工作流。

**开发参考：**建立提供商兼容性测试、版本固定与回滚方案；移除旧能力时明确替代路径及功能差异。

### ⑤ 预算控制开始要求真实、持久的用量状态

OpenClaw 的实际结算用量预算与 Hermes 的恢复后用量显示问题，说明成本信息正从辅助展示走向运行控制依据。

**开发参考：**分离上下文占用、估算用量和实际结算用量，保证恢复后的状态可追溯；现有数据尚不足以证明相关问题造成了实际扣费错误。

---

**综合判断：**本日最突出的生态信号不是新功能爆发，而是**运行可靠性、系统边界契约与执行闭环成为主要工程议题**。OpenClaw 在活动量和问题覆盖面上领先，但也承担更高的集成复杂度；Hermes Agent、ZeroClaw 提供了更明确的扩展接口和接入层演进信号。对技术选型而言，下一步应优先核验目标工作流的修复落地、回归测试与恢复能力，而非仅按单日 PR 数或无 Bug 报告做判断。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报｜2026-11-23

## 1. 今日速览

过去 24 小时，[NanoBot](https://github.com/HKUDS/nanobot) 未出现 Issue 更新，仅有 **1 条 PR 更新**，当日可见活跃度较低。该 PR 聚焦 WebUI 文件编辑列表的交互优化，属于小范围体验打磨，而非核心智能体能力扩展。PR 当前状态为 **CLOSED**，现有数据无法确认其是否已合并，因此不能将相关改动视为已进入主分支。今日无新版本发布，也未观察到新增 Bug 报告；但单日样本有限，不足以判断项目长期健康度或稳定性趋势。

## 2. 项目进展

### WebUI：将差异展开入口整合到文件编辑行

- **PR**：[ #6753 · feat(webui): fold the diff toggle into the file edit row](https://github.com/HKUDS/nanobot/pull/6753)
- **作者**：chengyongru
- **状态**：CLOSED，是否合并未获确认
- **标签**：`enhancement`、`webui`、`feature`、`priority: p2`

**改动动机**：原先每个折叠的文件差异都需要额外一行显示“View changes”，增加列表高度，也干扰用户快速浏览文件名和变更行数。

**方案要点**：
- 将展开箭头放到文件名及变更行数旁边。
- 支持点击箭头、行数或行内空白区域展开差异。
- 减少独立操作行，让文件编辑列表更紧凑、便于扫描。

**进展判断**：这是面向文件变更查看场景的增量式体验优化，潜在收益是降低浏览多个文件修改时的视觉负担。由于未确认合并，今日可确认的是相关方案已形成并关闭 PR，而非功能已交付。

## 3. 社区热点

今日唯一可见的讨论候选是 [PR #6753](https://github.com/HKUDS/nanobot/pull/6753)，主题为 **文件差异列表的信息密度与操作效率**。

- **评论数**：数据未提供有效值，无法判断讨论热度。
- **👍 数**：0，未显示明显的集中支持信号。
- **背后诉求**：在查看多文件修改时，用户需要同时快速识别文件名、变更量和差异内容；将展开入口融入文件行，有助于减少冗余界面元素。

这一诉求来自 PR 作者的改动说明，**不代表已得到广泛用户验证**。今日无活跃 Issue，无法进行可靠的社区热点排名。

## 4. Bug 与稳定性

**今日提供的数据中，没有新增或活跃的 Bug、崩溃及回归问题，也没有可对应的 fix PR。**

唯一更新的 [PR #6753](https://github.com/HKUDS/nanobot/pull/6753) 被标注为功能与体验增强，并非明确的故障修复，因此不列入 Bug 严重程度排序。需要注意，Issue 更新为零仅说明本次时间窗口内未观察到相关报告，不能据此认定项目不存在稳定性问题。

## 5. 功能请求与路线图信号

| 信号 | 依据与判断 |
|---|---|
| WebUI 文件编辑列表趋向紧凑化 | [PR #6753](https://github.com/HKUDS/nanobot/pull/6753) 尝试合并文件信息与差异展开操作，体现对文件修改审阅体验的细化。 |
| 属于中等优先级体验工作 | 该 PR 带有 `priority: p2` 标签，但仅凭标签不能推断具体交付时间。 |
| 下一版本是否包含该改动尚不确定 | PR 已关闭，但缺少合并记录、关联里程碑及发布说明，暂不能判断其是否会进入下一版本。 |

今日没有新增 Issue 型功能请求。现有信号仅涉及 WebUI 局部交互，不足以推导更广泛的产品路线图。

## 6. 用户反馈摘要

今日无 Issue 更新，也未提供 Issue 评论，因此**无法提炼可验证的真实用户反馈或满意度变化**。

[PR #6753](https://github.com/HKUDS/nanobot/pull/6753) 的作者说明提供了一个具体痛点：重复的“View changes”行使文件列表更难扫描。其对应场景是浏览文件编辑记录，尤其是同时涉及多个文件的修改；但这是贡献者提出的设计动机，不应等同于社区普遍反馈。

## 7. 待处理积压

本次数据未包含历史未响应 Issue、开放 PR 列表或等待时长，**无法识别长期积压，也不能认定不存在积压**。

建议维护者关注以下核验项：

- **确认关闭结果**：核对 [PR #6753](https://github.com/HKUDS/nanobot/pull/6753) 是否合并；若未合并，补充关闭原因或后续替代方案，避免贡献者与用户误判交付状态。
- **补充积压视图**：结合 [开放 Issues](https://github.com/HKUDS/nanobot/issues) 与 [开放 PR](https://github.com/HKUDS/nanobot/pulls) 的最后更新时间、优先级和维护者回复情况，再评估长期未响应事项。

**健康度结论**：今日呈现“低活动量、局部体验优化”的状态。暂未出现明确的稳定性风险信号，但缺少合并结果、历史积压及有效评论数据，项目交付效率与社区响应健康度仍需持续观察。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-11-23**  
**项目：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)**

> 本日报基于所提供的过去 24 小时 GitHub 数据。Issue 评论正文、PR 审查与 CI 状态未提供；涉及用户反馈及合并前景的判断仅依据标题、摘要与标签。

## 1. 今日速览

过去 24 小时共有 **6 条 Issue、7 条 PR 更新**，全部仍处于开放状态，无 Issue 关闭、PR 合并或关闭，也无新版本发布。项目呈现**提案与贡献较活跃、交付暂未落地**的状态：7 条 PR 中，4 条涉及插件目录新增或更新，其余覆盖扩展运行时上下文、Discord 配置及 Windows 终端修复。稳定性方面新增 3 个 P2 Bug 报告，涉及 Anthropic OAuth 请求失败、Gateway 重启卡住及会话用量展示异常。当前可见讨论量较低，不能仅凭更新数量判断社区热度或维护吞吐改善。  
相关：[PR 列表](https://github.com/NousResearch/hermes-agent/pulls) · [Issue 列表](https://github.com/NousResearch/hermes-agent/issues)

## 2. 项目进展

**今日没有已合并或关闭的重要 PR，以下均为待审进展，不代表主分支或已发布版本已具备相关能力。**

| 方向 | 今日进展与意义 | 状态 |
|---|---|---|
| 扩展运行时上下文 | 新增 `ctx.messaging_turn_origin(session_id)` 提案，使插件可基于宿主注入的会话 ID 获取当前 profile 内的消息来源上下文，为跨消息渠道扩展提供基础能力。 | 待合并：[PR #159075](https://github.com/NousResearch/hermes-agent/pull/159075) |
| Windows 容器终端 | 修正 Windows 宿主下对容器工作目录的判断，采用 POSIX 语义，避免配置的 Linux 工作目录被错误忽略。 | 待合并：[PR #159069](https://github.com/NousResearch/hermes-agent/pull/159069) |
| Discord 线程管理 | 提议将自动创建线程的归档时长改为可配置，减少固定 `1440` 分钟设置对不同使用场景的限制。 | 待合并：[PR #159071](https://github.com/NousResearch/hermes-agent/pull/159071) |
| 插件目录扩展 | 提交 ChinaDocCheck、ChinaMedsCheck 两项新增插件目录条目。 | 待合并：[PR #159078](https://github.com/NousResearch/hermes-agent/pull/159078)、[PR #159077](https://github.com/NousResearch/hermes-agent/pull/159077) |
| 现有插件更新 | hermes-cinema 目录条目拟更新至 0.4.0；Unraid 目录条目拟更新至 v0.4.0，增加硬件、系统版本等展示。这里是外部插件版本，并非 Hermes Agent 新版本。 | 待合并：[PR #159076](https://github.com/NousResearch/hermes-agent/pull/159076)、[PR #159073](https://github.com/NousResearch/hermes-agent/pull/159073) |

**进展评估：**今日主要增加了待审功能与修复储备，尚无可确认的合并交付增量。对核心可靠性最直接的候选改进是 Windows 容器工作目录修复；插件目录贡献则体现生态侧持续活跃。

## 3. 社区热点

现有数据中，只有两条 Issue 各有 **1 条评论**，其余 Issue 均为 0 评论；全部条目 👍 均为 0。PR 评论数为 `undefined`，不能视为零，也无法据此参与热度排名。

- **可信消息上下文：扩展需要知道“正在为哪一轮消息服务”。**  
  [Issue #159074](https://github.com/NousResearch/hermes-agent/issues/159074) 获得 1 条评论，并已有对应的 [PR #159075](https://github.com/NousResearch/hermes-agent/pull/159075)。其核心诉求不是某项单独集成，而是让插件通过宿主支持的接口获取消息轮次上下文，减少对隐式状态的依赖。

- **Gateway 重启卡住：生命周期异常处理受到关注。**  
  [Issue #159067](https://github.com/NousResearch/hermes-agent/issues/159067) 同样有 1 条评论。报告指出 `stop()` 抛异常后，异常未记录、关闭看门狗被解除，Gateway 停留在 `draining` 状态。背后的诉求是无人值守运行时的可恢复性与可观测性，而非单纯改善重启命令体验。

## 4. Bug 与稳定性

以下按**潜在使用影响**排序；前三项均被标为 P2，并非官方优先级的进一步排序。

| 问题 | 影响及风险 | 是否已有 fix PR |
|---|---|---|
| **Anthropic OAuth 疑似版本回归｜P2** | 报告者称 macOS、git 安装及 Gateway multiplexer 环境下，从 v0.23.1 升至 v0.23.3 后，Claude Max OAuth 的聊天请求均返回 `429 rate_limit_error`，旧版本可用。可能阻断该配置下的核心聊天功能，但尚不能认定所有 Anthropic 用户均受影响。 | 提供数据中未见。[Issue #159068](https://github.com/NousResearch/hermes-agent/issues/159068) |
| **Gateway 优雅重启挂起｜P2** | `SIGUSR1` 重启过程中若 `stop()` 抛异常，进程可能一直处于 `draining`，直至 supervisor 终止；异常未被记录会增加排障难度。 | 提供数据中未见。[Issue #159067](https://github.com/NousResearch/hermes-agent/issues/159067) |
| **Windows 容器工作目录失效｜P2** | Windows、Python 3.13+ 环境下，配置的 Linux 容器 cwd 可能被误判并回退，导致 Agent 未在预期挂载工作区执行任务。 | **已有待合并修复**：[PR #159069](https://github.com/NousResearch/hermes-agent/pull/159069) |
| **多模态会话用量锚点异常｜P2** | 含图片内容的消息可能导致持久化 usage anchor 在重载时失效；恢复后的会话在第一轮前显示 0 或估算值，影响用量信息可信度。摘要不足以证明存在实际扣费错误。 | 提供数据中未见。[Issue #159070](https://github.com/NousResearch/hermes-agent/issues/159070) |
| **hermes-cinema 插件问题｜P3** | 目录更新拟引入 0.4.0，摘要涉及受限环境下渲染阶段执行；标题提及跳过检查，但未提供具体检查与 CI 结果，尚不能判断完整修复范围。 | **待合并更新**：[PR #159076](https://github.com/NousResearch/hermes-agent/pull/159076) |

## 5. 功能请求与路线图信号

- **可信消息来源 API：已有实现候选，落地信号较明确。**  
  Issue 与 PR 同日出现，说明需求已进入代码提案阶段；但没有审查或里程碑信息，不能确认进入下一版本。  
  [Issue #159074](https://github.com/NousResearch/hermes-agent/issues/159074) · [PR #159075](https://github.com/NousResearch/hermes-agent/pull/159075)

- **跨终端任务完成通知：补齐个人助手的连续体验。**  
  用户希望在 Desktop、Dashboard 或消息网关发起任务后，手机也能得知任务完成，提议提供 profile 范围、可选启用的完成轮次事件流。当前未见对应 PR。  
  [Issue #159079](https://github.com/NousResearch/hermes-agent/issues/159079)

- **Clarify 单次超时覆盖：让交互等待适应现实任务。**  
  当前全局默认等待 90 秒，工具 schema 无单次覆盖能力；用户希望 Agent 能为需要现实操作的问题延长等待时间。当前未见对应 PR。  
  [Issue #159072](https://github.com/NousResearch/hermes-agent/issues/159072)

- **Discord 线程归档时长配置：已有可审实现。**  
  相比仅有需求的项目，该项更接近交付，但是否纳入下一版仍取决于审查、测试与维护者决策。  
  [PR #159071](https://github.com/NousResearch/hermes-agent/pull/159071)

## 6. 用户反馈摘要

**未提供评论正文，以下仅提炼 Issue 描述中的用户反馈，不将其视为评论共识。**

- **升级兼容性影响信任：**Anthropic 用户提供了“旧版本可用、新版本失败”的对比，显示其痛点是升级后核心工作流中断，而非功能不足。[Issue #159068](https://github.com/NousResearch/hermes-agent/issues/159068)
- **个人助手需要跨设备闭环：**桌面发起、离开电脑、手机接收完成通知，是用户明确提出的连续使用场景。[Issue #159079](https://github.com/NousResearch/hermes-agent/issues/159079)
- **人类操作节奏与工具超时不匹配：**固定 90 秒等待窗口难以覆盖需要实际检查或操作的任务。[Issue #159072](https://github.com/NousResearch/hermes-agent/issues/159072)
- **会话恢复后应保留可信状态：**恢复会话后显示 0 或估算用量，会削弱用户对消耗信息的判断能力。[Issue #159070](https://github.com/NousResearch/hermes-agent/issues/159070)

现有材料未包含明确的满意度表扬或调查数据，不宜推断整体用户满意度。

## 7. 待处理积压

**无法确认长期未响应积压。**提供的 13 个条目均为当日创建、当日更新，不能据此认定维护响应迟缓，也无法评估历史积压趋势。

建议维护者优先关注：

1. **先定位核心功能阻断与运维风险：**补充 Anthropic OAuth 回归的复现范围、版本差异，以及 Gateway 重启异常路径测试。  
   [Issue #159068](https://github.com/NousResearch/hermes-agent/issues/159068) · [Issue #159067](https://github.com/NousResearch/hermes-agent/issues/159067)
2. **推动已有修复验证：**Windows 容器 cwd PR 应重点覆盖相关后端及宿主平台差异，验证配置目录不会再次被误判。  
   [PR #159069](https://github.com/NousResearch/hermes-agent/pull/159069)
3. **明确新接口边界：**消息来源 API 涉及可信上下文，应优先审查 profile 隔离、会话绑定与无可用上下文时的返回行为。  
   [PR #159075](https://github.com/NousResearch/hermes-agent/pull/159075)

**总体判断：**今日生态贡献与功能探索保持活跃，但核心健康度仍需看后续 P2 问题的复现、修复和合并进度。当前最重要的信号不是新增提案数量，而是已有修复能否经过验证，以及三个新报 P2 Bug 能否及时形成处理闭环。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报
**日期：2026-11-23｜统计范围：所提供的过去 24 小时 GitHub 数据**

## 1. 今日速览

今日 NanoClaw 活跃度较低：仅有 **1 条 PR 更新**，没有 Issue 更新，也没有新版本发布。唯一动态是修复 Signal 入站附件的容器可读性，涉及图片、文件从消息渠道传入智能体的流程。该 PR 仍处于 **Open** 状态，今日没有已合并或关闭的 PR，因此应将其视为待交付修复，而非已落地能力。现有数据不足以判断整体稳定性趋势或社区响应效率。  
关联：[PR #4544](https://github.com/nanocoai/nanoclaw/pull/4544)

## 2. 项目进展

### Signal 附件读取修复已提出，尚未合并
- **PR：**[#4544 — fix(signal): inline inbound attachments so the agent container can read them](https://github.com/nanocoai/nanoclaw/pull/4544)
- **作者：**jasonwbarnett
- **状态：**Open；今日创建并更新。
- **问题机制：**根据 PR 摘要，`signal-cli` 将附件保存在宿主机的 `<SIGNAL_DATA_DIR>/attachments/` 中；适配器此前把宿主机路径以 `[Image: /home/...]` 等形式传给智能体，但容器没有挂载该目录，导致附件无法被正常读取。
- **修复方向：**PR 拟通过内联传递入站附件，让智能体容器可以读取 Signal 发来的图片和文件。所提供摘要被截断，具体实现、测试覆盖与兼容性尚无法确认。
- **进展评估：**今日推进主要体现在明确附件跨宿主机与容器边界的访问问题，并提交候选修复；**尚无合并交付进展**。

## 3. 社区热点

### 唯一可见议题：Signal 消息附件能否真正被智能体使用
[PR #4544](https://github.com/nanocoai/nanoclaw/pull/4544) 是今日数据中唯一的讨论载体，反映的核心诉求是：用户通过 Signal 发送图片或文件后，智能体应能够实际读取，而不仅是收到不可访问的路径。

**热度证据有限：**该 PR 的 👍 数为 **0**，评论数为 `undefined`，不能据此认定“没有评论”，也无法判断其讨论活跃度。它是今日唯一可见议题，但并无证据表明它已形成社区热点。

## 4. Bug 与稳定性

| 严重程度 | 问题与影响 | 修复状态 |
|---|---|---|
| **中等：特定渠道功能受阻，属分析判断** | Signal 入站附件路径指向宿主机目录，智能体容器无法读取，影响依赖图片或文件内容的任务。当前没有证据表明会导致服务崩溃、数据丢失或影响其他渠道。 | 已有候选修复 [PR #4544](https://github.com/nanocoai/nanoclaw/pull/4544)，尚未合并。 |

**建议验证重点：**合并前应确认图片与普通文件均可在容器内读取，并检查附件大小、异常输入及临时数据处理是否有相应测试。以上是审查建议，不代表已经发现额外缺陷。  
关联：[PR #4544](https://github.com/nanocoai/nanoclaw/pull/4544)

## 5. 功能请求与路线图信号

今日没有新增功能请求可供分析。唯一可观察的方向是 **完善 Signal 渠道的附件处理可靠性**，属于既有能力修复，而非新功能扩展。

[PR #4544](https://github.com/nanocoai/nanoclaw/pull/4544) 可视为后续版本的候选修复，但当前没有合并记录、里程碑或发布计划，**不能确认会进入下一版本**。

## 6. 用户反馈摘要

今日没有提供 Issue 或评论正文，无法提炼经过用户直接表达的满意度或不满反馈。

从 [PR #4544](https://github.com/nanocoai/nanoclaw/pull/4544) 的问题描述中，可以识别出一个使用痛点：**用户已通过 Signal 发送附件，但智能体拿到的是无法访问的宿主机路径，任务因而受阻。** 这属于 PR 作者描述的问题场景，不应等同于多名用户的共同反馈。

## 7. 待处理积压

- **近期关注：**[PR #4544](https://github.com/nanocoai/nanoclaw/pull/4544) 尚待审查与合并，可重点确认附件传递方式、容器内可读性及回归测试。
- **长期积压：**现有数据仅覆盖过去 24 小时，且该 PR 为当日创建，不能将其归类为长期未响应事项；也无法据此判断项目是否存在其他重要积压。

---

**项目健康度结论：**今日呈现“**低活跃度、单点可靠性修复推进中**”的状态。未见新报告的崩溃或回归信息，但样本量很小，不能据此认定整体稳定性改善；下一步最值得跟踪的是附件修复的审查、验证与合并结果。

*数据说明：请求中的项目地址为 `qwibitai/nanoclaw`，但唯一 PR 的链接标识指向 `nanocoai/nanoclaw`。本文按所提供的 PR 链接标识生成链接，未验证仓库迁移、重定向或归属关系。*

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
**日期：2026-11-23**  
**项目：[netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)**

## 1. 今日速览

过去 24 小时共记录 **2 条 PR 更新，均为 CLOSED 状态**；没有 Issue 更新，也没有新版本发布。今日工作集中于 **DeepSeek Harness（DSH）适配与稳定性维护**，涉及工具输出格式、隐藏网页搜索视图保留，以及配套开发文档更新。从更新数量看，项目今日活跃度较低，但工作方向集中，属于小规模维护与迁移收尾。需要注意，数据未提供 PR 的合并标记，**不能将“已关闭”直接视为“已合并”**，因此相关修复是否进入主分支仍需核实。  
相关 PR：[修复 #3153](https://github.com/netease-youdao/LobsterAI/pull/3153) · [文档 #3154](https://github.com/netease-youdao/LobsterAI/pull/3154)

## 2. 项目进展

| PR | 状态 | 主要内容 | 推进价值 |
|---|---|---|---|
| [#3153：修复 DSH 工具输出与搜索视图](https://github.com/netease-youdao/LobsterAI/pull/3153) | 已关闭，是否合并未知 | 将 `lobster_enable_tools` 的 `output.render` 返回值由原始字符串调整为 DSH 要求的 `ContentBlock[]`；标题同时提及保留隐藏网页搜索视图 | 针对 DSH 集成中的运行时兼容性问题，若已合入，可改善相关工具调用链路的稳定性 |
| [#3154：更新 DSH 相关项目指南](https://github.com/netease-youdao/LobsterAI/pull/3154) | 已关闭，是否合并未知 | 更新双语 README、贡献指南及三份仓库维护指南，说明 Cowork 如何使用 DSH、隔离配置与工作区位置、开发启动方式 | 有助于降低 DSH 切换后的开发接入成本，减少环境和目录约定不清带来的协作摩擦 |

**整体判断：**今日是围绕 DSH 切换的一轮定向维护，而非大规模功能扩展。代码兼容性修复与文档同步方向一致，但实际落地程度取决于上述 PR 是否已合并。

## 3. 社区热点

今日没有 Issue 活动；两条 PR 的评论数字段均为 `undefined`，👍 均为 0，**无法据此评出讨论最活跃或评论最多的条目**。

从内容而非互动量看，值得关注的议题是：

- **DSH 工具调用契约的兼容性。**[#3153](https://github.com/netease-youdao/LobsterAI/pull/3153) 暴露了宿主插件输出与 DSH 预期格式不一致的问题，反映出集成适配需要覆盖完整的工具输出处理链路。
- **DSH 切换后的开发可理解性。**[#3154](https://github.com/netease-youdao/LobsterAI/pull/3154) 集中补充隔离配置、工作区与启动方式，说明配套文档正围绕新的运行方式进行调整。

以上属于维护议题，不能据此推断已有广泛用户讨论或共识。

## 4. Bug 与稳定性

今日没有新增 Bug Issue；以下问题来自 PR 摘要或标题。严重程度为基于已知影响的初步评估，并非项目官方分级。

| 优先级 | 问题与影响 | Fix PR 与状态 |
|---|---|---|
| **中高：运行时异常风险** | `lobster_enable_tools` 的 `output.render` 原先返回原始 `string`，而 DSH 要求 `ContentBlock[]`，例如 `[{ type: 'text', text }]`。摘要明确提及该不匹配会导致 `dsh-spill-policy` 抛出 `TypeError`，可能中断相关工具输出处理；未提供全局崩溃证据。 | 已有 [#3153](https://github.com/netease-youdao/LobsterAI/pull/3153)，已关闭；是否合并及发布未知 |
| **影响待确认：隐藏搜索视图保留** | PR 标题提及保留隐藏网页搜索视图，但所给摘要未包含复现条件和具体后果，暂不能判断影响范围或是否属于回归。 | 同属 [#3153](https://github.com/netease-youdao/LobsterAI/pull/3153)，已关闭；落地状态待核实 |

**建议验证重点：**确认 #3153 的最终处置结果，并回归测试工具启用后的输出渲染及隐藏搜索视图相关行为。

## 5. 功能请求与路线图信号

- **没有新增用户功能请求。**本日未记录 Issue 更新，无法判断新的用户需求优先级。[项目 Issues](https://github.com/netease-youdao/LobsterAI/issues)
- **明确的工作方向是 DSH 集成完善。**修复 PR 与文档 PR 相互呼应，显示近期工作正在补齐 DSH 的运行契约和开发指南。这是工程推进信号，不等同于已公布的路线图。[#3153](https://github.com/netease-youdao/LobsterAI/pull/3153) · [#3154](https://github.com/netease-youdao/LobsterAI/pull/3154)
- **下一版本内容尚不能确认。**上述变更若已合并，可能成为后续交付的一部分，但当前没有版本发布、里程碑或发布计划信息可供确认。[项目 Releases](https://github.com/netease-youdao/LobsterAI/releases)

## 6. 用户反馈摘要

本日没有可用的 Issue 评论内容，PR 评论数也未提供有效值，因此**无法提炼真实用户的满意度、不满或具体使用场景**，也不能将缺少反馈解读为用户满意。

从维护内容只能识别两个待验证的使用痛点：相关工具输出可能因格式不匹配而处理失败，以及开发者需要更清晰的 DSH 环境与工作区说明。这些是代码和文档变更所指向的问题，**并非直接用户反馈**。  
来源：[#3153](https://github.com/netease-youdao/LobsterAI/pull/3153) · [#3154](https://github.com/netease-youdao/LobsterAI/pull/3154)

## 7. 待处理积压

当前数据仅覆盖过去 24 小时的更新，没有提供历史开放事项、等待时长或维护者响应记录，**无法识别长期未响应的重要积压**；今日没有 Issue 更新也不代表仓库没有待处理 Issue。[项目 Issues](https://github.com/netease-youdao/LobsterAI/issues) · [项目 PR 列表](https://github.com/netease-youdao/LobsterAI/pulls)

建议优先核实：

1. **#3153 是否已合并，或是否有替代修复。**该项涉及明确的运行时 `TypeError`，应优先确认问题是否仍存在。[查看 PR](https://github.com/netease-youdao/LobsterAI/pull/3153)
2. **#3154 的文档是否已落地并与代码一致。**重点核对隔离配置、工作区路径与开发启动说明，避免 DSH 切换后出现文档与实际行为脱节。[查看 PR](https://github.com/netease-youdao/LobsterAI/pull/3154)

**健康度结论：**今日呈现出聚焦兼容性与文档同步的维护节奏，但单日活动量有限，且合并状态、测试结果与用户反馈缺失，尚不足以评价项目长期健康趋势。

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

# CoPaw 项目动态日报｜2026-11-23

> **统计范围：**过去 24 小时，基于所提供的 GitHub 数据。数据归属项目为 [CoPaw](https://github.com/agentscope-ai/CoPaw)，唯一更新的 Issue 则指向 `agentscope-ai/QwenPaw`；以下保留该来源差异，不推断仓库更名或迁移关系。

## 1. 今日速览

过去 24 小时，项目仅有 **1 条 Issue 新开并更新**，无 PR 更新、无 Issue 关闭，也无新版本发布，窗口内可见活跃度较低。今日讨论集中于进一步解耦执行引擎与宿主能力，属于架构扩展诉求，而非故障修复。该提案有 **1 条评论、0 个 👍**，尚不足以判断社区共识或维护者优先级。当前可见状态是“有架构需求输入、无交付记录”，单日数据不足以判断项目长期健康度。  
来源：[项目仓库](https://github.com/agentscope-ai/CoPaw) · [Issue #8860](https://github.com/agentscope-ai/QwenPaw/issues/8860)

## 2. 项目进展

**今日无可确认的合并或关闭 PR，暂无新增功能或修复交付记录。**

唯一可见进展是架构提案进入讨论阶段：[#8860](https://github.com/agentscope-ai/QwenPaw/issues/8860) 希望将 **Execution SDK / Agent Loop** 与宿主能力进一步分离。它引用了 [#8808](https://github.com/agentscope-ai/QwenPaw/issues/8808) 的模块化方向，以及 QwenPaw `v2.3.0` 中发布 `qwenpaw-harness-codex v1.0.0` 的背景；这些均为提案摘要中的历史信息，**不属于今日发布或交付**。

**推进程度：**今日主要新增需求表达，尚无可见实现、测试或合并证据。

## 3. 社区热点

### [#8860：将 Harness 进一步解耦为可插拔 Execution SDK](https://github.com/agentscope-ai/QwenPaw/issues/8860)

- **状态：**OPEN；作者：`djj532`
- **创建／更新：**2026-11-23
- **互动：**1 条评论，0 个 👍；是今日唯一可见讨论项，不能据此视为高热度议题。
- **核心诉求：**在执行 SDK 或 Agent Loop 可插拔的同时，继续保留 QwenPaw 的宿主能力，包括 ReMe 记忆、内置渠道／文件／子智能体工具及模型路由。

**分析：**该提案关注的不是单独增加一种执行后端，而是让不同执行后端能够复用同一套宿主能力。对个人 AI 助手而言，这有助于减少更换执行引擎时重复接入记忆、工具和模型配置的成本。不过，当前摘要没有展示接口设计、兼容性方案或维护者回应，方案成熟度仍待观察。

## 4. Bug 与稳定性

**今日提供的数据中没有新增 Bug、崩溃或回归报告，也没有对应的 fix PR。**

唯一 Issue 为功能与架构请求，不宜归类为稳定性故障。由于缺少测试、CI 和运行指标，不能将“无 Bug 报告”解读为“已验证稳定”。  
来源：[今日唯一 Issue #8860](https://github.com/agentscope-ai/QwenPaw/issues/8860)

## 5. 功能请求与路线图信号

| 需求方向 | 预期价值 | 当前证据与下一版本判断 |
|---|---|---|
| 执行 SDK／Agent Loop 可插拔 | 降低执行引擎与宿主的耦合，便于接入不同后端 | 仅有 [#8860](https://github.com/agentscope-ai/QwenPaw/issues/8860) 提案，无关联实现 PR，无法判断是否进入下一版本 |
| 保留记忆、内置工具和模型路由 | 避免切换后端后丢失宿主能力或重复集成 | 与同一提案绑定，尚未看到能力接口与兼容性方案 |
| 延续 Harness 模块化 | 在既有模块化方向上进一步明确职责边界 | 提案引用 [#8808](https://github.com/agentscope-ai/QwenPaw/issues/8808)，但不足以确认官方路线图承诺 |

**路线图信号：**可插拔执行层值得持续跟踪，但目前应标记为“社区建议”，而不是“已排期功能”。

## 6. 用户反馈摘要

所给数据仅包含 Issue 摘要和评论数量，**不包含评论正文**，因此无法提炼评论中的真实使用经历、满意度或维护者态度。依据 [#8860](https://github.com/agentscope-ai/QwenPaw/issues/8860) 的提案内容，可确认的需求表达包括：

- **痛点指向：**提出者希望执行引擎与宿主能力进一步解耦；这反映了对当前扩展边界的改进期待，并非已确认的功能失效。
- **使用场景：**更换或扩展 Execution SDK 时，仍能使用既有记忆、内置工具和模型路由。
- **反馈边界：**没有足够证据评价用户整体满意度，也不能把 1 条评论视为需求已获认可。

## 7. 待处理积压

**当前数据不足以识别长期未响应的重要 Issue 或 PR。**[#8860](https://github.com/agentscope-ai/QwenPaw/issues/8860) 为当日新建，不属于长期积压；[#8808](https://github.com/agentscope-ai/QwenPaw/issues/8808) 仅被引用，缺少其状态和响应时间，不能判定为滞留事项。

建议维护者后续关注 #8860 的需求分诊：明确宿主与执行 SDK 的职责边界、能力适配方式，以及是否需要独立设计文档和实现 PR。

---

**健康度结论：**今日可见开发活动偏低，讨论集中在架构扩展性，暂无新增故障信号，也无代码交付证据。后续最值得观察的是 [#8860](https://github.com/agentscope-ai/QwenPaw/issues/8860) 是否获得维护者反馈，并转化为明确的接口方案与实现工作。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：2026-11-23｜统计窗口：过去 24 小时**  
**项目：**[zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

## 1. 今日速览

今日共有 **8 条 PR 更新，均为当日新建且仍处于 OPEN 状态**；没有 Issue 更新、PR 合并或关闭，也没有新版本发布。开发活动主要集中在 **ACP CLI 接入层复用、Antigravity CLI 提供商接入，以及 Gemini CLI 相关能力退役**。另有工具参数校验、Rust lint 约束和 Web 注释清理，体现出对运行时契约与维护质量的关注。整体呈现“**开发提交活跃、交付成果尚待验证**”的状态；评论数缺失、全部 PR 的 👍 为 0，无法据此判断社区讨论热度或评审效率。

## 2. 项目进展

**今日没有已合并或已关闭的重要 PR，因此不能将以下工作计为已落地主干的功能或修复。** 当前进展主要是形成了待评审的实现方案。

| 方向 | 今日提交 | 进展与意义 |
|---|---|---|
| ACP 基础能力复用 | [#12673](https://github.com/zeroclaw-labs/zeroclaw/pull/12673) | 从 `grok_cli` 抽取有界单次 ACP 客户端及子进程生命周期管理到内部 `acp_cli` 模块，为其他 CLI 提供商复用做准备。 |
| 新提供商接入 | [#12675](https://github.com/zeroclaw-labs/zeroclaw/pull/12675) | 新增通过 `agy acp` 通信的 `antigravity_cli` 模型提供商。 |
| 认证配置改进 | [#12677](https://github.com/zeroclaw-labs/zeroclaw/pull/12677) | 为 `grok_cli` 接受类型化 `api_key` 配置，并支持 Grok Build 1.0 认证，拟缓解此前依赖环境变量透传的限制。 |
| 工程质量治理 | [#12674](https://github.com/zeroclaw-labs/zeroclaw/pull/12674) | 为 19 个 workspace crate 加强 Clippy 约束，推动有理由说明的 `#[expect]` 使用，并清除 33 处无效 lint 豁免。 |
| Web 代码维护 | [#12672](https://github.com/zeroclaw-labs/zeroclaw/pull/12672) | 清理 Web 注释中的 Issue 引用和流程说明，补齐此前注释治理未覆盖的区域。 |

**交付判断：**今日新增实现提案较集中，但缺少合并、测试结果和发布证据，暂不能量化为已完成的产品能力增长。

## 3. 社区热点

**无法按评论或反应量评出“最热讨论”**：8 条 PR 的评论数均为 `undefined`，不能视为零评论；👍 均为 0。以下按变更集中度与潜在影响列出值得关注的议题，而非热度排名。

### ACP CLI 提供商体系成为主要开发议题

tidux 提交了 5 条相关 PR，形成从共享客户端、新提供商、旧能力退役到认证改进的一组工作：

- 共享 ACP 客户端：[#12673](https://github.com/zeroclaw-labs/zeroclaw/pull/12673)
- Antigravity CLI 接入：[#12675](https://github.com/zeroclaw-labs/zeroclaw/pull/12675)
- Gemini CLI 模型提供商退役：[#12676](https://github.com/zeroclaw-labs/zeroclaw/pull/12676)
- Grok CLI 认证改进：[#12677](https://github.com/zeroclaw-labs/zeroclaw/pull/12677)
- Gemini CLI 编码工具移除：[#12678](https://github.com/zeroclaw-labs/zeroclaw/pull/12678)

**背后诉求：**减少 CLI 接入逻辑重复，并适配外部工具及认证方式的变化。有关 Google 产品替代、账户服务调整的说法来自 PR 作者摘要，本日报未独立核验。

### 工具调用应遵守其声明的参数契约

[#12679](https://github.com/zeroclaw-labs/zeroclaw/pull/12679) 指出，`delegate` 虽声明 `additionalProperties: false`，实际仍接受包含未声明字段的调用，并静默丢弃这些字段。

**背后诉求：**避免调用方误以为参数已经生效，提升智能体委派行为的可预测性。这是今日最明确的运行时正确性议题。

## 4. Bug 与稳定性

今日没有新增 Bug Issue。以下问题来自 PR 摘要，严重程度为基于描述的分析判断，并非项目官方定级。

| 优先级 | 问题或风险 | 潜在影响 | 修复状态 |
|---|---|---|---|
| **中：运行时契约不一致** | `delegate` 接受未声明参数并静默丢弃，例如调用携带 `model` 仍成功执行。 | 调用成功不代表配置意图被执行，可能造成模型选择等行为预期偏差；摘要未显示崩溃或权限绕过证据。 | 已有 fix PR，尚未合并：[#12679](https://github.com/zeroclaw-labs/zeroclaw/pull/12679)。 |
| **中：配置兼容性限制** | `grok_cli` 不接受 `api_key` 别名，xAI key 依赖通过 `env_passthrough` 导出的 `XAI_API_KEY`。 | 增加认证配置成本，并可能造成配置失败。 | 已有改进 PR，尚未合并：[#12677](https://github.com/zeroclaw-labs/zeroclaw/pull/12677)。 |

**另需关注待合并变更自身的兼容性风险：**  
[#12676](https://github.com/zeroclaw-labs/zeroclaw/pull/12676) 与 [#12678](https://github.com/zeroclaw-labs/zeroclaw/pull/12678) 的标题均带有破坏性变更标记 `!`，分别涉及移除 Gemini CLI 模型提供商与编码工具。它们尚未生效；若合并，依赖相关能力的配置、工作流与文档需要同步迁移检查。

现有数据未提供崩溃、数据丢失或安全漏洞报告，也未提供 CI 通过情况。

## 5. 功能请求与路线图信号

今日没有可供分析的新功能请求 Issue，路线图信号主要来自开发者提交的 PR。

- **更通用的 ACP CLI 接入层。** [#12673](https://github.com/zeroclaw-labs/zeroclaw/pull/12673) 与 [#12675](https://github.com/zeroclaw-labs/zeroclaw/pull/12675) 表明，项目正尝试将单一提供商的实现抽象为共享基础设施。若通过评审，可能降低后续 ACP CLI 提供商的接入成本。
- **Google CLI 集成迁移。** [#12675](https://github.com/zeroclaw-labs/zeroclaw/pull/12675)、[#12676](https://github.com/zeroclaw-labs/zeroclaw/pull/12676)、[#12678](https://github.com/zeroclaw-labs/zeroclaw/pull/12678) 共同体现新增 Antigravity CLI、退役 Gemini CLI 的方向，但不能据此认为新旧能力完全等价。
- **认证配置更直接。** [#12677](https://github.com/zeroclaw-labs/zeroclaw/pull/12677) 拟支持类型化 `api_key`，减少对环境变量透传配置的依赖。

**下一版本判断：**上述工作已有具体 PR，具备进入后续版本的候选基础；但没有里程碑、评审结果或发布时间证据，不能确认会纳入下一版本。多条 PR 明确标注为堆叠提交，合并顺序及依赖关系仍需关注。

## 6. 用户反馈摘要

**今日无 Issue 更新，也未提供 Issue 评论正文，无法提炼可核验的真实用户反馈或满意度。**

仅从开发者的问题描述，可以识别两个使用痛点线索：

- **委派调用的参数不能被静默忽略。** 调用方需要确认其传入选项是否实际影响执行，而不仅是获得成功返回。来源：[#12679](https://github.com/zeroclaw-labs/zeroclaw/pull/12679)。
- **CLI 认证配置存在额外门槛。** 依赖环境变量透传而不能直接使用 `api_key`，增加了部署和配置复杂度。来源：[#12677](https://github.com/zeroclaw-labs/zeroclaw/pull/12677)。

以上是 PR 描述反映的需求，**不应等同于多名用户的共同反馈或社区共识**。

## 7. 待处理积压与维护提醒

本次数据仅覆盖过去 24 小时，且 8 条 PR 均为当日创建，**无法识别长期未响应的 Issue 或 PR，也不能据此判断仓库没有历史积压**。

当前建议优先跟踪：

1. **运行时参数校验修复：**确认未知字段被明确拒绝，并验证现有合法调用不受影响。关联：[#12679](https://github.com/zeroclaw-labs/zeroclaw/pull/12679)。
2. **堆叠 PR 的评审边界与合并顺序：**多条提供商 PR 标注 `size:XL`，但摘要明确说明含有前置提交，不宜将其视为彼此独立的大规模改动。关联：[#12673](https://github.com/zeroclaw-labs/zeroclaw/pull/12673)、[#12675](https://github.com/zeroclaw-labs/zeroclaw/pull/12675)、[#12677](https://github.com/zeroclaw-labs/zeroclaw/pull/12677)。
3. **破坏性移除的迁移说明：**在合并前明确受影响配置、替代路径及功能差异。关联：[#12676](https://github.com/zeroclaw-labs/zeroclaw/pull/12676)、[#12678](https://github.com/zeroclaw-labs/zeroclaw/pull/12678)。

**健康度结论：**今日提交集中、技术方向清晰，并有主动质量治理；但所有成果仍待评审与合并。短期重点应是验证委派参数修复、控制 CLI 迁移的兼容性风险，并完成堆叠 PR 的依赖评审，而非仅以新增 PR 数量衡量进展。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*