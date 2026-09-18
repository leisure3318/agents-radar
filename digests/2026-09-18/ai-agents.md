# OpenClaw 生态日报 2026-09-18

> Issues: 2 | PRs: 18 | 覆盖项目: 13 个 | 生成时间: 2026-09-18 03:43 UTC

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

# OpenClaw 项目动态日报 — 2026-09-18

## 1. 今日速览

过去 24 小时，OpenClaw 活跃度较高：共有 **2 条 Issue 更新**、**18 条 PR 更新**，其中 **16 条 PR 仍待合并**，**2 条 PR 已关闭/合并或结束处理**。今日工作重心明显集中在 **CI 修复、网关/插件稳定性、Web UI 体验、渠道集成与安全边界** 上，说明项目正处于高频修复与合并前验证阶段。  
今日没有新版本发布，当前动态更像是下一轮版本前的稳定性收敛。值得注意的是，多个 PR 带有 `needs proof`、`merge-risk: compatibility` 或 `security-boundary` 标签，表明维护者对兼容性和安全边界仍保持谨慎。整体健康度看，项目开发活跃，但短期内维护者需要优先处理 CI 红灯、证明材料不足以及高风险 PR 的评审积压。

---

## 2. 项目进展

今日共有 **2 个 PR 进入关闭/结束状态**，另有多项关键修复 PR 进入待维护者查看或等待 proof 阶段。

### 已关闭 / 已结束处理的重要 PR

#### PR #151023 — `feat(mcp): sign in to connectors from Settings`
- 链接：https://github.com/openclaw/openclaw/pull/151023
- 状态：CLOSED
- 领域：Settings、MCP connector、Android、Web UI、Gateway、Agents、Workboard
- 标签：`P2`、`size: XL`、`proof: sufficient`、`merge-risk` 未标注但涉及多端
- 摘要：该 PR 让用户可以从 Settings 中登录 operator-owned MCP connector，避免依赖终端命令完成连接器登录。
- 项目推进意义：
  - 降低 MCP connector 的使用门槛。
  - 将原本偏开发者/运维导向的登录流程产品化。
  - 涉及多端和网关，说明连接器能力正在向更完整的用户配置体验演进。
- 注意：数据仅显示为 `CLOSED`，未明确标注是否 merged，因此建议维护者确认该功能是否已进入主干。

#### PR #151331 — `test(scripts): keep title-convergence proof off the spawn timeout`
- 链接：https://github.com/openclaw/openclaw/pull/151331
- 状态：CLOSED
- 领域：测试脚本、CI 稳定性
- 标签：`P2`、`size: M`、`proof: sufficient`
- 摘要：修复 package-acceptance 测试中 title-convergence 轮询与测试框架 10 秒进程 kill 之间的竞态问题。
- 项目推进意义：
  - 减少无关 PR 上的间歇性 CI 失败。
  - 提升维护者对测试结果的信任度。
  - 有助于降低合并阻塞和重复 rerun 成本。

### 今日新增/活跃的关键待合并 PR

#### PR #151350 — `fix(ci): restore fs-safe and workflow-routing guard checks`
- 链接：https://github.com/openclaw/openclaw/pull/151350
- 状态：OPEN
- 领域：CI、文件系统安全边界、workflow routing
- 摘要：修复两个来自 main 的 CI 失败：symlink-race 测试 helper 违反 fs-safe import boundary，以及 workflow-routing assertions 未包含新的 plugin-recovery guard。
- 影响：直接影响 CI 是否能继续可靠验证后续变更，属于维护效率型关键修复。

#### PR #151339 — `fix(ci): restore filesystem, routing, and test inventory guards`
- 链接：https://github.com/openclaw/openclaw/pull/151339
- 状态：OPEN
- 领域：CI、测试清单、workflow routing
- 摘要：将多个跨 lane 的 guard 修复合并在一个 PR 中处理，包括 filesystem import boundary、workflow-routing 预期和 full-suite test inventory。
- 影响：与 #151350、#151349、#151318 存在明显主题重叠，显示 CI 主干当前处于较高修复压力下。

#### PR #151067 — `fix: fence scheduled message actions after revocation`
- 链接：https://github.com/openclaw/openclaw/pull/151067
- 状态：OPEN
- 领域：Gateway、Agents、权限撤销、scheduled run
- 标签：`P1`、`merge-risk: compatibility`
- 摘要：防止 scheduled run 在 `message` tool 权限被撤销后继续准备后续动作。
- 影响：这是权限边界类修复，重要性高。若不修复，可能出现已撤销权限仍被延迟任务使用的行为。

#### PR #150898 — `fix(update): reconcile a managed service pinned to another install`
- 链接：https://github.com/openclaw/openclaw/pull/150898
- 状态：OPEN
- 领域：CLI、Gateway、managed service、更新流程
- 标签：`P0`、`merge-risk: compatibility`、`merge-risk: security-boundary`、`needs proof`
- 摘要：修复 CLI 更新后，托管 Gateway service 仍被 pin 到旧安装路径，导致运行服务使用旧代码并报告协议不匹配的问题。
- 影响：这是今日最严重的待合并修复之一，直接影响升级可靠性和服务一致性。

---

## 3. 社区热点

今日 Issue 讨论量整体偏低：两个新 Issue 均只有 **1 条评论**，点赞数均为 0；PR 评论数据未提供。因此热点更多体现在问题影响面和优先级，而非评论热度。

### Issue #151347 — Failed/aborted model calls are billed upstream but leave no local usage trace
- 链接：https://github.com/openclaw/openclaw/issues/151347
- 状态：OPEN
- 作者：Kenx111
- 标签：`P2`、`clawsweeper:needs-maintainer-review`、`clawsweeper:needs-info`、`clawsweeper:no-new-fix-pr`
- 评论：1
- 摘要：用户发现 DeepSeek 上游账单与本地 usage ledger 差异明显，本地仅捕获约 53% 的真实调用和 token。失败或中止的模型调用在上游被计费，但本地 sqlite 中没有任何 trace。
- 背后诉求：
  - 用户需要可信的成本核算。
  - 失败调用也应有本地审计记录。
  - 对企业或高频用户而言，账单与本地 ledger 不一致会影响预算、报销和自动化限额策略。
- 当前状态：尚无 fix PR，且标签明确显示 `no-new-fix-pr`。

### Issue #151348 — Control UI double-renders assistant text when one message spans multiple records
- 链接：https://github.com/openclaw/openclaw/issues/151348
- 状态：OPEN
- 作者：Oblivion1276
- 标签：`P2`、`impact:session-state`、`impact:ux-friction`
- 评论：1
- 摘要：当一个 assistant 逻辑消息被持久化为多条共享同一 `message.id` 的记录，且消息同时包含 `text` block 与 `tool_use` block 时，Control UI 会重复渲染 assistant 文本。
- 背后诉求：
  - 用户希望会话记录与实际消息语义一致。
  - 多 record 存储模型不能导致前端重复展示。
  - 对涉及工具调用的长回复场景尤其重要。
- 当前状态：暂无对应 fix PR。

---

## 4. Bug 与稳定性

以下按严重程度与影响面排序。

### P0 / 高风险

#### PR #150898 — 更新后 managed Gateway service 仍指向旧安装
- 链接：https://github.com/openclaw/openclaw/pull/150898
- 状态：OPEN
- 严重程度：`P0`
- 影响领域：CLI 更新、Gateway service、协议兼容
- 问题：用户切换或更新 CLI 安装后，托管服务仍可能运行旧代码，造成状态报告协议不匹配。
- 是否已有 fix PR：有，即 #150898。
- 当前风险：带有 `merge-risk: compatibility` 与 `merge-risk: security-boundary`，且仍需 proof，建议优先补齐验证材料。

### P1

#### PR #151067 — scheduled message action 在权限撤销后仍可能继续
- 链接：https://github.com/openclaw/openclaw/pull/151067
- 状态：OPEN
- 严重程度：`P1`
- 影响领域：Gateway、Agents、权限模型
- 问题：scheduled run 在获得 `message` tool 权限后，即使 durable job 后续撤销权限或 occurrence 结束，也可能继续准备动作。
- 是否已有 fix PR：有，即 #151067。
- 当前风险：涉及权限撤销语义，兼容性风险较高。

### P2

#### Issue #151347 — 失败/中止模型调用上游计费但本地无 trace
- 链接：https://github.com/openclaw/openclaw/issues/151347
- 状态：OPEN
- 严重程度：`P2`
- 影响领域：usage ledger、计费、审计
- 问题：本地 usage 记录可能显著低估真实调用量和 token 消耗。
- 是否已有 fix PR：暂无。Issue 标签显示 `clawsweeper:no-new-fix-pr`。
- 建议：需要先确认失败调用路径、provider fallback、stream abort、agent sqlite 写入边界是否统一记录。

#### Issue #151348 — Control UI 重复渲染 assistant 文本
- 链接：https://github.com/openclaw/openclaw/issues/151348
- 状态：OPEN
- 严重程度：`P2`
- 影响领域：session-state、UX
- 问题：包含 text 与 tool_use 的同一逻辑消息跨多条记录持久化时，前端重复显示 assistant 文本。
- 是否已有 fix PR：暂无。
- 建议：需要检查 Control UI 对同一 `message.id` 多 record 的合并逻辑，尤其是 text block 去重与 tool_use block 拼接顺序。

#### PR #151255 — Mattermost partial edit 会清除 pin/reaction 或消息文本
- 链接：https://github.com/openclaw/openclaw/pull/151255
- 状态：OPEN
- 严重程度：`P2`
- 影响领域：Mattermost channel
- 问题：编辑 Mattermost reply 时可能清除 pin/reaction 标志，或 card-only 更新擦除 message text。
- 是否已有 fix PR：有，即 #151255。
- 当前状态：需要 proof。

#### PR #151324 — MiniMax-M3 pre-tool reasoning 被展示为可见 assistant 消息
- 链接：https://github.com/openclaw/openclaw/pull/151324
- 状态：OPEN
- 严重程度：`P2`
- 影响领域：Gateway、Web UI、provider 兼容
- 问题：MiniMax-M3 在 tool-use 前的内部 reasoning 被作为独立 assistant 消息显示。
- 是否已有 fix PR：有，即 #151324。
- 风险：带有 `merge-risk: compatibility`，需要更多 proof。

#### PR #151320 — session refresh 导致 chat render frame 外重绘
- 链接：https://github.com/openclaw/openclaw/pull/151320
- 状态：OPEN
- 严重程度：`P2`
- 影响领域：Web UI、chat streaming
- 问题：session-list refresh 在 streaming 期间完成时，会造成 off-frame chat redraw。
- 是否已有 fix PR：有，即 #151320。
- 当前状态：ready for maintainer look，且有截图 proof。

#### PR #151314 — reduced motion 下 skeleton shimmer 仍启动动画
- 链接：https://github.com/openclaw/openclaw/pull/151314
- 状态：OPEN
- 严重程度：`P2`
- 影响领域：Web UI、可访问性、测试稳定性
- 问题：用户启用 reduced motion 后，skeleton loading highlight 仍触发 CSS animation，并导致间歇性测试失败。
- 是否已有 fix PR：有，即 #151314。
- 价值：兼顾可访问性与 CI 稳定性。

### CI / 测试稳定性

#### PR #151350 — restore fs-safe and workflow-routing guard checks
- 链接：https://github.com/openclaw/openclaw/pull/151350

#### PR #151339 — restore filesystem, routing, and test inventory guards
- 链接：https://github.com/openclaw/openclaw/pull/151339

#### PR #151349 — register run-attempt native-config and subscription tests
- 链接：https://github.com/openclaw/openclaw/pull/151349

#### PR #151318 — restore CI fixture ownership and readiness
- 链接：https://github.com/openclaw/openclaw/pull/151318

这些 PR 共同指向一个信号：当前 main 或接近 main 的测试矩阵存在多个 guard、test inventory、fixture ownership 与 readiness 问题。虽然它们不直接体现为用户功能 bug，但会显著影响维护者合并效率和回归防护能力。

---

## 5. 功能请求与路线图信号

今日没有明显的新功能型 Issue，但多个功能型 PR 透露出近期路线图方向。

### 远程 Harness workspace 成为 Memory 与 Skills 的可信来源

#### PR #150946 — `feat: use remote workspace files for Memory and Skills`
- 链接：https://github.com/openclaw/openclaw/pull/150946
- 状态：OPEN
- 标签：`P2`、`size: XL`、`merge-risk: compatibility`、`merge-risk: security-boundary`、`needs proof`
- 路线图信号：
  - Gateway 正在从本地文件假设转向远程 Harness workspace 语义。
  - Memory、Skills 和依赖安装将更贴近实际运行环境。
  - 对远程 agent、分布式运行和多 host 部署很关键。
- 纳入下一版本可能性：中等。功能价值高，但风险标签较多，且仍需 proof。

### Settings 内登录 MCP connectors

#### PR #151023 — `feat(mcp): sign in to connectors from Settings`
- 链接：https://github.com/openclaw/openclaw/pull/151023
- 状态：CLOSED
- 路线图信号：
  - Connector 体验正在从命令行转向图形化配置。
  - Settings 可能成为未来插件、connector、账号授权的统一入口。
- 纳入下一版本可能性：取决于该 PR 是否实际合并。当前数据仅显示关闭，建议确认 merge 状态。

### Telegram outbound hooks 与 progress draft 兼容

#### PR #151346 — `feat(telegram): keep the progress draft with modifying outbound hooks by explicit opt-in`
- 链接：https://github.com/openclaw/openclaw/pull/151346
- 状态：OPEN
- 标签：`P2`、`merge-risk: security-boundary`、`needs proof`、`proof: telegram-e2e`
- 路线图信号：
  - Telegram channel 的 plugin/hook 生态在增强。
  - 项目在平衡 outbound policy 插件与用户可见进度反馈。
- 纳入下一版本可能性：中等偏低，取决于 Telegram E2E proof 是否补齐。

### 插件 reload 更稳定，避免无变化插件被替换

#### PR #151281 — `fix(plugins): keep unchanged plugins running across metadata refreshes`
- 链接：https://github.com/openclaw/openclaw/pull/151281
- 状态：OPEN
- 路线图信号：
  - 插件系统正在增强运行时稳定性。
  - 对 live channel accounts、callable methods、插件注册连续性有积极影响。
- 纳入下一版本可能性：较高。该 PR 处于 ready for maintainer look，且风险相对可控。

---

## 6. 用户反馈摘要

### 计费与本地 ledger 不一致造成信任问题

来自 Issue #151347：
- 链接：https://github.com/openclaw/openclaw/issues/151347
- 用户痛点：
  - 上游 provider 已计费，但本地完全没有调用 trace。
  - 用户无法基于本地 usage ledger 做准确成本分析。
  - 差异达到约 50% 级别，已经不是边缘误差。
- 使用场景：
  - DeepSeek 模型调用。
  - 失败或中止请求。
  - agent sqlite usage 追踪与上游 billing dashboard 对账。
- 不满意点：
  - 本地 ledger 对失败路径的覆盖不足。
  - 缺少“失败但已计费”调用的审计记录。

### 工具调用消息的 UI 展示不符合用户预期

来自 Issue #151348：
- 链接：https://github.com/openclaw/openclaw/issues/151348
- 用户痛点：
  - 一个逻辑 assistant message 被拆成多条持久化 record 后，Control UI 出现重复文本。
  - 用户看到的是重复回答，而不是一次完整的 assistant 回复。
- 使用场景：
  - assistant 回复同时包含普通 text block 和 tool_use block。
  - 多记录共享同一 `message.id`。
- 不满意点：
  - UI 没有正确聚合同一逻辑消息。
  - session-state 与展示层之间存在不一致。

### 更新与服务一致性仍是高优先级痛点

来自 PR #150898 所关联的问题：
- 链接：https://github.com/openclaw/openclaw/pull/150898
- 用户痛点：
  - 更新 CLI 后，托管 Gateway 服务仍运行旧安装路径中的代码。
  - 用户看到协议不匹配，难以判断到底哪个组件处于旧版本。
- 使用场景：
  - 多安装路径。
  - managed Gateway service。
  - CLI 更新或切换 active install。
- 不满意点：
  - 更新后的运行状态不透明。
  - 服务与 CLI 版本不一致时恢复成本较高。

---

## 7. 待处理积压

由于本日报数据仅覆盖过去 24 小时，无法可靠判断“长期未响应”的 Issue 或 PR。但从今日数据看，以下待处理项需要维护者优先关注。

### 高优先级待维护者处理

#### PR #150898 — P0 更新一致性修复仍需 proof
- 链接：https://github.com/openclaw/openclaw/pull/150898
- 原因：`P0`，涉及 managed service、兼容性和安全边界。
- 建议：优先补齐 proof，并尽快完成维护者评审。

#### Issue #151347 — usage ledger 严重低估真实调用，暂无 fix PR
- 链接：https://github.com/openclaw/openclaw/issues/151347
- 原因：涉及账单、审计和用户信任，且标签显示暂无新修复 PR。
- 建议：维护者应尽快要求最小复现、provider 类型、失败路径日志，并明确是否需要 ledger schema 或事件记录策略调整。

#### Issue #151348 — Control UI 重复渲染，暂无 fix PR
- 链接：https://github.com/openclaw/openclaw/issues/151348
- 原因：影响 session-state 与工具调用展示体验。
- 建议：需要确认与历史 Issue #149221 的差异，并指派前端/session-state 方向修复。

### 等待 proof 的重要 PR

#### PR #150946 — Remote workspace files for Memory and Skills
- 链接：https://github.com/openclaw/openclaw/pull/150946
- 风险：`merge-risk: compatibility`、`merge-risk: security-boundary`
- 建议：补充跨渠道、远程 Harness、依赖安装路径相关 proof。

#### PR #151255 — Mattermost partial edits preserve state
- 链接：https://github.com/openclaw/openclaw/pull/151255
- 风险：需要证明 partial edit 不再误清字段。
- 建议：补充 pin、reaction、card-only update、text-preserving 场景测试。

#### PR #151324 — Hide MiniMax-M3 pre-tool reasoning
- 链接：https://github.com/openclaw/openclaw/pull/151324
- 风险：provider 行为兼容性。
- 建议：补充 MiniMax-M3 native Anthropic-compatible provider 的 tool-use transcript proof。

#### PR #151346 — Telegram progress draft opt-in
- 链接：https://github.com/openclaw/openclaw/pull/151346
- 风险：`merge-risk: security-boundary`，需要 `telegram-e2e`。
- 建议：优先提供 Telegram E2E，覆盖 outbound hook 修改 payload 但保留 progress draft 的场景。

### CI 修复类 PR 需要去重与合并策略

以下 PR 主题高度接近，建议维护者确认是否需要合并、关闭重复 PR，或明确各自作用边界：

- PR #151350 — https://github.com/openclaw/openclaw/pull/151350  
- PR #151339 — https://github.com/openclaw/openclaw/pull/151339  
- PR #151349 — https://github.com/openclaw/openclaw/pull/151349  
- PR #151318 — https://github.com/openclaw/openclaw/pull/151318  

这些 PR 都与 CI guard、test inventory、fixture ownership、workflow routing 或 readiness 有关。若并行推进但边界不清，可能增加评审成本和冲突概率；若能统一收敛，将明显改善主干健康度。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告  
日期：2026-09-18

---

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态呈现出明显的“两极分化”：头部项目如 **Hermes Agent、OpenClaw、CoPaw、ZeroClaw** 处于高频修复和功能收敛阶段，而 **NullClaw、TinyClaw、IronClaw、PicoClaw** 等项目活动较低。  
整体技术焦点正从“能接入模型、能调用工具”转向 **多渠道可靠性、会话状态一致性、权限边界、插件隔离、成本可观测性、provider 兼容性**。  
多个项目都暴露出与 **长任务、工具调用、历史恢复、多 provider 路由、桌面端体验** 相关的稳定性问题，说明 Agent 产品正在进入更真实、更复杂的生产使用场景。  
OpenClaw 今日活跃度较高，处于核心项目中的第一梯队，但其主要压力来自 CI 修复、安全边界 proof、网关稳定性和待合并 PR 积压。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 今日重点 | 健康度评估 |
|---|---:|---:|---|---|---|
| **Hermes Agent** | 50 | 50 | 无 | 更新流程、Desktop、MCP、异步委托、用量统计 | **高活跃但稳定性压力大**，P0/P1 问题较多，维护响应快 |
| **OpenClaw** | 2 | 18 | 无 | CI 修复、Gateway、插件、Web UI、权限边界 | **活跃且处于合并前稳定性收敛期**，待合并 PR 较多 |
| **CoPaw / QwenPaw** | 10 | 14 | 无 | 插件隔离、会话历史、Console、Provider 配置 | **高活跃、高修复压力**，2.2.x 回归需优先收敛 |
| **ZeroClaw** | 5 | 12 | 无 | Anthropic signed reasoning、工具审批、Skills、Mattermost | **健康度良好**，功能推进强，但高风险 PR 较多 |
| **LobsterAI** | 0 | 9 | 无 | OpenClaw 网关恢复、Cowork 体验、退出流程 | **修复驱动明显**，维护节奏快，Issue 透明度偏低 |
| **NanoBot** | 1 | 5 | 无 | 多渠道回复、会话 checkpoint、Telegram/Discord | **稳定维护中**，会话隔离回归需优先处理 |
| **NanoClaw** | 0 | 5 | 无 | Dashboard、Gemini history、Linux 安装、Skills | **健康稳定**，PR 聚焦但社区讨论偏低 |
| **Moltis** | 2 | 1 | 无 | Nix 构建、wasm-web-search 计费机制 | **低到中等活跃**，发布构建问题需优先修复 |
| **ZeptoClaw** | 3 | 2 | 无 | 本地模型 tool calling、CI 移除、Rustls 安全 | **方向明确但质量门禁变弱**，需观察无 CI 后风险 |
| **PicoClaw** | 0 | 1 | 无 | OpenAI Responses API 迁移 | **低活跃但有核心 provider 演进信号** |
| **IronClaw** | 1 | 0 | 无 | benchmark failure taxonomy | **低活跃**，偏质量观测，缺少修复闭环 |
| **NullClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | **静默** |

---

## 3. OpenClaw 在生态中的定位

### 3.1 总体定位

OpenClaw 当前处于个人 AI 助手 / Agent Runtime 生态中的 **核心基础设施型项目**：  
它不仅关注聊天 UI，也覆盖 **Gateway、Agents、插件、MCP connector、渠道集成、权限模型、远程 workspace、Web UI 和 CI guard** 等完整运行链路。

与 NanoBot、PicoClaw 这类较聚焦的项目相比，OpenClaw 的系统边界更大；与 Hermes Agent、CoPaw、ZeroClaw 相比，OpenClaw 今日更突出的是 **安全边界、网关一致性和 CI 收敛**。

### 3.2 优势

1. **系统覆盖面广**  
   OpenClaw 同时涉及 Gateway、Web UI、Settings、MCP connector、插件、远程 Harness workspace、渠道集成等模块，适合作为复杂个人 AI 助手或企业内 Agent runtime 的基础。

2. **权限与安全边界意识强**  
   多个 PR 带有 `merge-risk: security-boundary`、`merge-risk: compatibility`、`needs proof` 标签，说明项目对权限撤销、远程 workspace、Telegram outbound hooks、managed service 更新等高风险路径较谨慎。

3. **工程治理较成熟**  
   今日大量 CI guard、workflow routing、test inventory 修复表明项目已经建立较细的质量门禁体系。虽然当前 CI 压力较大，但这也说明 OpenClaw 对主干健康度较重视。

4. **Connector / MCP 产品化方向明确**  
   Settings 中登录 MCP connectors、远程 workspace files for Memory and Skills，都显示 OpenClaw 正把原本偏开发者的能力产品化。

### 3.3 与同类项目的差异

| 对比对象 | OpenClaw 差异 |
|---|---|
| **Hermes Agent** | Hermes 更偏“大而全”的 Desktop companion、多 provider runtime 和 gateway/message agent；OpenClaw 今日更强调 CI、权限边界、MCP connector、Gateway 稳定性 |
| **CoPaw** | CoPaw 当前焦点是插件隔离、Console、AgentScope Platform、历史记忆；OpenClaw 更偏 Gateway / MCP / 多端产品化和权限撤销语义 |
| **ZeroClaw** | ZeroClaw 更强调 provider 精细兼容、tool approval、skills 分发；OpenClaw 更重视运行服务一致性、渠道集成和远程 workspace 语义 |
| **NanoBot** | NanoBot 更轻量，重点在多渠道回复和会话 checkpoint；OpenClaw 系统复杂度、CI 治理和安全标签密度明显更高 |
| **LobsterAI** | LobsterAI 今日大量修复围绕内嵌 OpenClaw 网关，说明 OpenClaw 类 Gateway 能力正在被上层产品依赖；OpenClaw 本身更接近基础层 |

### 3.4 社区规模与活跃度

从今日数据看：

- OpenClaw：2 Issues / 18 PR  
- Hermes Agent：50 Issues / 50 PR  
- CoPaw：10 Issues / 14 PR  
- ZeroClaw：5 Issues / 12 PR  
- LobsterAI：0 Issues / 9 PR  

OpenClaw 活跃度低于 Hermes，但高于大部分中小项目，属于 **第一梯队偏稳定收敛型项目**。其 PR 数远高于 Issue 数，说明当前维护焦点不在新需求爆发，而在修复、验证和合并前治理。

---

## 4. 共同关注的技术方向

### 4.1 工具调用与 provider 兼容性

涉及项目：**OpenClaw、Hermes Agent、ZeroClaw、ZeptoClaw、NanoClaw、PicoClaw、CoPaw**

共同诉求：

- 适配不同 provider 对 tool schema、function call、reasoning、message ordering 的要求。
- 避免 provider-specific 行为破坏统一 Agent runtime。
- 对本地模型和严格后端增加 schema sanitization、args coercion、history repair。

典型案例：

- OpenClaw：MiniMax-M3 pre-tool reasoning 被错误展示。
- Hermes Agent：tool_call batch envelope JSON string 导致 validator 误判。
- ZeroClaw：Anthropic signed reasoning 被 sanitizer 改写。
- ZeptoClaw：为 local / ollama 后端清洗 tool schemas、纠正 tool args。
- NanoClaw：Gemini 对 functionCall turn ordering 严格，历史恢复需修复。
- PicoClaw：OpenAI provider 迁移到 Responses API。
- CoPaw：Provider 配置、context-window override、AgentScope Platform 接入。

---

### 4.2 会话状态、历史恢复与上下文一致性

涉及项目：**NanoBot、Hermes Agent、CoPaw、OpenClaw、ZeroClaw、NanoClaw**

共同诉求：

- 多会话并发不能串话。
- 历史恢复不能丢失 tool result、provider state 或用户 turn。
- UI 展示必须与真实 session state 一致。
- checkpoint、metadata、transcript、history.db 需要更可靠的恢复策略。

典型案例：

- NanoBot：0.3.5 出现回复串会话。
- Hermes Agent：Desktop resume reconciliation 把工具活动嫁接到早期消息。
- CoPaw：scroll eviction 丢失 user turn；session-sync 跳过 orphaned files。
- OpenClaw：Control UI 多 record 同一 message.id 时重复渲染文本。
- NanoClaw：Gemini session history 恢复非法。
- ZeroClaw：interruption scope key 可能碰撞。

---

### 4.3 插件、Skills 与 MCP 生态扩展

涉及项目：**OpenClaw、Hermes Agent、CoPaw、ZeroClaw、NanoClaw、ZeptoClaw**

共同诉求：

- 插件必须可安装、可更新、可隔离、可观测。
- Skills / MCP / tool registry 需要供应链安全和运行时稳定性。
- 插件失败不能拖垮主进程或全部 Agent。

典型案例：

- OpenClaw：插件 metadata refresh 不应替换 unchanged plugins。
- Hermes Agent：public plugin catalog clone 不应触发 git 认证；MCP tools TTL 需刷新。
- CoPaw：插件同步 I/O 冻结整个实例，需要 event loop lag watchdog。
- ZeroClaw：well-known discovery indexes 安装 skills，涉及供应链风险。
- NanoClaw：TypeSafe Jev decision model 工具化。
- ZeptoClaw：MCP / plugin schema 统一 sanitization。

---

### 4.4 多渠道消息归属与通信可靠性

涉及项目：**OpenClaw、NanoBot、Hermes Agent、LobsterAI、ZeroClaw**

共同诉求：

- 回复必须落在正确会话、正确消息、正确 topic 或 channel。
- 外部通信失败应被局部隔离，不应导致全局服务重启。
- Telegram、Discord、Mattermost、Email、IM 等渠道需要更精细的上下文绑定。

典型案例：

- NanoBot：Discord replyToMessage、Telegram topic typing status。
- OpenClaw：Mattermost partial edit 保留 pin/reaction/text；Telegram outbound hooks。
- Hermes Agent：Email gateway、Slack / async delegation message delivery。
- LobsterAI：IM workload 被配置恢复误判为空闲；Gateway 因 DNS 导航失败重启。
- ZeroClaw：Mattermost channel purpose 注入 system prompt。

---

### 4.5 成本、用量与预算可观测性

涉及项目：**OpenClaw、Hermes Agent、ZeroClaw、Moltis**

共同诉求：

- 模型调用成本需要可追踪、可解释、可审计。
- 多模型、多 provider、fallback、MoA、失败调用都需要纳入 usage ledger。
- 预算提醒和预付费机制正在成为产品化需求。

典型案例：

- OpenClaw：失败 / 中止模型调用上游计费但本地无 trace。
- Hermes Agent：`/usage` 按 model route 展示 token 消耗；MoA fan-out 成本控制。
- ZeroClaw：`cost.warn_at_percent` 配置后 runtime 未警告。
- Moltis：wasm-web-search prepaid search hop 需求。

---

### 4.6 安装、更新与发布可复现性

涉及项目：**OpenClaw、Hermes Agent、NanoClaw、Moltis、ZeroClaw、ZeptoClaw**

共同诉求：

- 更新后服务必须指向正确安装路径。
- 发布 tag 应可复现构建。
- 安装流程要兼容 Linux 非 root、Nix、Windows、Desktop 等环境。
- 安全依赖和 CI 质量门禁需要持续维护。

典型案例：

- OpenClaw：managed Gateway service 更新后仍 pin 到旧安装。
- Hermes Agent：pre-update backup 失败后仍继续；gateway restart import 失败。
- NanoClaw：Linux 非 root pnpm/corepack 安装卡死修复。
- Moltis：Nix flake 无法构建已发布 tag。
- ZeroClaw：Nix run 安装路径恢复。
- ZeptoClaw：Rustls 安全公告；移除 GitHub Actions CI。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 / 路线特征 |
|---|---|---|---|
| **OpenClaw** | Gateway、MCP connector、插件、Web UI、远程 workspace、权限边界 | 高级个人用户、Agent 平台开发者、企业内助手集成者 | 多端、多组件、强 CI guard，重视安全边界和兼容性 proof |
| **Hermes Agent** | Desktop companion、gateway、local models、多 provider、消息代理 | 重度 Agent 用户、桌面用户、长期运行场景 | 大规模快速迭代，覆盖 CLI/TUI/Desktop/Gateway，问题暴露充分 |
| **CoPaw** | AgentScope 集成、Console、插件、Provider、历史记忆 | AgentScope / Qwen 生态用户、插件开发者 | 插件系统和 Console 体验快速演进，需强化隔离和数据可靠性 |
| **ZeroClaw** | Provider 精细兼容、tool approval、skills、企业渠道 | 安全敏感 Agent 开发者、企业协作用户 | 对 provider、runtime、security policy 分层较细，PR 风险管理明显 |
| **NanoBot** | 多渠道个人助手、Telegram/Discord/QQ、会话 checkpoint | 轻量多渠道 Bot 用户 | 项目相对轻量，重点在 channel 行为一致性和 session 可靠性 |
| **LobsterAI** | 桌面产品、Cowork、内嵌 OpenClaw 网关恢复 | 终端产品用户、协作式 AI 助手用户 | 更偏产品体验和自愈能力，很多问题来自真实用户反馈闭环 |
| **NanoClaw** | 本地 dashboard、provider 兼容、skills | 开发者、本地 Agent 使用者 | 关注可观测性和 provider history repair，规模适中 |
| **ZeptoClaw** | Edge runtime、本地模型工具调用、Rust 安全 | 本地 / 边缘运行时开发者 | 强调 local / ollama 兼容和 tool schema 适配，但 CI 移除带来治理风险 |
| **Moltis** | wasm-web-search、Nix 构建、发布可复现性 | Nix 用户、Wasm / 搜索集成开发者 | 当前更偏构建链和搜索能力产品化 |
| **PicoClaw** | OpenAI provider 适配 | 轻量 AI provider 集成用户 | 今日仅体现 OpenAI Responses API 路线 |
| **IronClaw** | Benchmark / failure taxonomy | 模型评测、Agent 质量分析用户 | 更偏评测和质量观测，代码推进弱 |
| **NullClaw / TinyClaw** | 暂无活动 | 不明确 | 今日无有效信号 |

---

## 6. 社区热度与成熟度

### 6.1 活跃度分层

#### 第一梯队：高活跃、高复杂度

- **Hermes Agent**
- **OpenClaw**
- **CoPaw**
- **ZeroClaw**

特征：

- Issues / PR 数量高。
- 多个核心路径同时推进。
- 出现 P0/P1 或 security-boundary 类问题。
- 维护响应快，但 review 队列压力明显。

其中：

- Hermes Agent 是今日活动最高项目，但稳定性风险也最高。
- OpenClaw 活跃度较高，更偏 CI 与安全边界收敛。
- CoPaw 处于 2.2.x 回归修复高压期。
- ZeroClaw 功能推进强，但高风险 PR 需要谨慎落地。

#### 第二梯队：中等活跃、聚焦修复或产品打磨

- **LobsterAI**
- **NanoBot**
- **NanoClaw**
- **ZeptoClaw**

特征：

- PR 数量适中。
- 问题更聚焦，通常围绕某几个核心模块。
- 多数项目有明确修复方向。
- 社区评论热度不高，但维护侧仍在推进。

#### 第三梯队：低活跃或单点推进

- **Moltis**
- **PicoClaw**
- **IronClaw**

特征：

- 今日活动少。
- 但仍有重要信号：Moltis 的 Nix 发布质量、PicoClaw 的 OpenAI Responses API、IronClaw 的 benchmark taxonomy。

#### 静默项目

- **NullClaw**
- **TinyClaw**

过去 24 小时无活动，无法判断短期健康度。

---

### 6.2 成熟度判断

| 成熟阶段 | 项目 | 判断依据 |
|---|---|---|
| **快速扩张 / 高速迭代** | Hermes Agent、CoPaw、ZeroClaw | 功能和修复并行，大量 Open PR，核心路径仍频繁暴露问题 |
| **稳定性收敛 / 发布前治理** | OpenClaw、LobsterAI、NanoBot | 重点在 CI、Gateway、会话状态、渠道体验、恢复能力 |
| **能力补齐 / 中小规模演进** | NanoClaw、ZeptoClaw、Moltis、PicoClaw | 单点技术能力推进明显，如 Dashboard、tool schema、本地模型、Responses API |
| **质量观测 / 评测导向** | IronClaw | 更关注 benchmark failure taxonomy，而非代码变更 |
| **低活跃 / 暂停观察** | NullClaw、TinyClaw | 今日无更新 |

---

## 7. 值得关注的趋势信号

### 7.1 Agent Runtime 正在从“功能可用”转向“状态可信”

多个项目的问题都不是简单功能缺失，而是状态一致性问题：

- 会话是否串话；
- history 是否可恢复；
- tool result 是否丢失；
- UI 是否重复渲染；
- checkpoint 是否被误删；
- interrupted / resumed session 是否正确。

对开发者的启示：  
**Agent 应用的核心竞争力不只是模型能力，而是状态机、日志、恢复、重放和审计能力。**

---

### 7.2 Provider 抽象层越来越难做

OpenAI Responses API、Anthropic signed reasoning、Gemini functionCall ordering、MiniMax pre-tool reasoning、本地模型 tool args 不稳定，都说明 provider 差异正在扩大。

对开发者的启示：

- 不应假设 OpenAI-compatible 就等于行为一致。
- Tool schema、reasoning content、streaming、message replay、function response 顺序都需要 provider-aware 层。
- 应建立 provider conformance tests，而不是只做简单接口适配。

---

### 7.3 插件与 Skills 生态进入“安全边界”阶段

插件不再只是扩展能力，也带来：

- event loop 阻塞；
- 权限越界；
- 供应链风险；
- public repo 安装认证问题；
- schema 不兼容；
- cleanup 插件误删数据。

对开发者的启示：  
插件系统需要从第一天设计 **隔离、超时、权限、审计、供应链 pinning、降级策略**，否则生态越大风险越高。

---

### 7.4 多渠道 Agent 的关键问题是“归属准确性”

Telegram topic、Discord replyToMessage、Mattermost partial edit、Email gateway、IM workload、async delegation completion 都指向同一个核心问题：  
**消息必须被投递到正确上下文。**

对开发者的启示：

- Channel adapter 不能只是收发消息。
- 必须显式建模 message id、thread id、topic id、session id、reply target、profile scope。
- 长任务和异步任务尤其需要稳定的 completion routing。

---

### 7.5 成本可观测性成为 Agent 产品标配

OpenClaw 的 failed call ledger、Hermes 的 per-model-route usage、ZeroClaw 的 budget warning、Moltis 的 prepaid search hop，说明用户已经开始关注：

- 哪个模型花了钱；
- fallback 是否导致额外费用；
- 失败调用是否也被计费；
- MoA 是否过度 fan-out；
- 搜索 / 工具调用是否需要预付费控制。

对开发者的启示：  
未来 Agent runtime 需要内置 **usage ledger、失败调用审计、成本预算、route-level 统计和 provider 对账能力**。

---

### 7.6 桌面端 AI 助手正在向“常驻 Companion”演进

Hermes、LobsterAI、CoPaw、ZeroClaw 都有 Desktop / Console / Cowork / TUI 相关体验修复：

- 关闭窗口是否退出后台；
- Desktop 是否能恢复会话；
- Console 是否等待 backend ready；
- Cowork 是否显示任务进度；
- inline refs 是否可读；
- WSLg renderer 是否可用。

对开发者的启示：  
桌面 AI 助手不能只是聊天壳，必须处理 **后台生命周期、进程恢复、窗口状态、任务进度、长会话历史、跨平台渲染兼容性**。

---

### 7.7 CI 与发布可复现性仍是开源 Agent 的短板

多个项目暴露构建和 CI 问题：

- OpenClaw CI guard 修复密集；
- Moltis 发布 tag Nix 构建失败；
- ZeroClaw Nix / Windows CI 修复；
- ZeptoClaw 直接移除 GitHub Actions；
- Hermes update E2E 失败；
- NanoClaw Linux 安装卡死。

对开发者的启示：  
Agent 项目依赖链复杂，涉及 Rust、Node、Python、Electron、Nix、Docker、model provider SDK 等，必须把 **安装、升级、构建可复现性** 当作核心产品能力，而不是工程附属项。

---

## 结论

今日生态整体处于 **高活跃、高修复、高复杂度上升** 的阶段。  
OpenClaw 位于第一梯队，优势在于系统边界完整、Gateway/MCP/插件/权限模型覆盖广、工程治理较成熟；短期挑战是 CI 红灯、proof 缺口、P0/P1 修复和待合并 PR 积压。  
横向看，个人 AI 助手和自主智能体项目正在共同迈向更真实的生产场景：多 provider、多渠道、长任务、插件生态、桌面常驻、成本透明和安全边界将成为下一阶段竞争关键。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报  
**日期：2026-09-18**  
**项目：HKUDS/nanobot**  
**GitHub：** https://github.com/HKUDS/nanobot

---

## 1. 今日速览

过去 24 小时，NanoBot 项目保持了**中等偏活跃**的开发节奏：共有 **1 条 Issue 更新**、**5 条 PR 更新**，其中 **3 条仍处于 Open 状态**，**2 条已关闭**。今日工作重点明显集中在 **多渠道消息回复行为、Telegram/Discord 渠道一致性、会话稳定性以及 WebUI 初始化体验**。  
从问题类型看，当前项目正在处理与真实用户场景高度相关的稳定性问题，尤其是**会话串话、会话 checkpoint 丢失、渠道消息回复位置不准确**等。整体健康度较好：新报告的问题数量不多，但多个 PR 已围绕近期回归和渠道体验进行修复，说明维护响应较快。

---

## 3. 项目进展

### 已关闭 / 完成处理的 PR

#### PR #5802：修复 WebUI 中模型详情过早暴露问题  
- 状态：**CLOSED**  
- 作者：Re-bin  
- 链接：https://github.com/HKUDS/nanobot/pull/5802  
- 类型：WebUI 修复 / 初始化体验  
- 摘要：  
  该 PR 修复了当 AI 模型尚未完成设置时，WebUI composer tooltip 仍可能暴露默认模型和 provider 信息的问题。同时避免 stale runtime fallback 覆盖本地化的设置提示与无障碍名称。  
- 影响分析：  
  这属于 WebUI 初始化流程的细节修复，有助于减少新用户在尚未完成配置时看到混乱状态的概率，也提升了隐私和可用性。  
- 项目推进：  
  改善了初次配置体验，降低了模型配置阶段的误导性 UI 展示。

#### PR #5799：修复不支持原地编辑渠道中的上下文压缩提示噪音  
- 状态：**CLOSED**  
- 作者：AlfredChaos  
- 链接：https://github.com/HKUDS/nanobot/pull/5799  
- 关联 Issue：#5784  
- 类型：Channel 修复 / QQ 渠道体验 / 测试  
- 摘要：  
  该 PR 解决了在 QQ 等不支持编辑或撤回消息的渠道中，上下文压缩状态提示会以永久独立消息形式出现在聊天中的问题，例如 `Compressing context…` / `Context compacted.`。  
- 影响分析：  
  对用户而言，这类系统提示会污染聊天记录，尤其在群聊或 C2C 场景中容易造成干扰。该修复说明项目正在针对不同渠道能力差异做更细粒度适配，而不是简单复用统一消息行为。  
- 项目推进：  
  明显提升了 QQ 等渠道的用户体验，并减少了自动化系统消息对真实对话的干扰。

---

## 4. 社区热点

今日没有高评论或高反应量的 Issue / PR。当前数据中所有条目的 👍 均为 0，Issue #5798 评论数为 0，PR 评论数未提供或显示为 undefined。因此，从互动指标看，今日社区讨论热度不高，但从内容重要性看，以下条目值得关注：

### Issue #5798：回复串会话问题  
- 状态：**OPEN**  
- 作者：wowowowowowowowonojieba  
- 链接：https://github.com/HKUDS/nanobot/issues/5798  
- 主题：会话隔离 / 回复路由错误  
- 用户反馈：  
  用户报告在一个会话运行时，其他会话中的交流可能被错误地回复到第一个正在运行的会话中。用户明确指出 **0.3.0 没有该问题，0.3.5 出现问题**。  
- 背后诉求：  
  这反映出用户对多会话并发场景下“回复必须回到正确会话”的强需求。对于个人 AI 助手和多渠道 Agent 来说，会话隔离是基础能力，一旦出错会直接破坏信任。

### PR #5800：Discord 支持 replyToMessage，与 Telegram 行为对齐  
- 状态：**OPEN**  
- 作者：ZedingZhang  
- 链接：https://github.com/HKUDS/nanobot/pull/5800  
- 标签：documentation, channel, webui, feature, test, priority: p2  
- 主题：Discord 回复目标控制  
- 背后诉求：  
  用户希望机器人在 Discord 中能准确回复触发它的消息，尤其是在多用户、多线程或流式响应场景中，避免上下文混乱。该需求与 Issue #5798 中反映的“回复串会话”问题在方向上高度相关，均指向多会话、多消息源下的响应归属准确性。

---

## 5. Bug 与稳定性

### 高优先级：会话串话 / 回复进入错误会话

#### Issue #5798：[bug] 回复串会话问题  
- 状态：**OPEN**  
- 链接：https://github.com/HKUDS/nanobot/issues/5798  
- 严重程度：**高**  
- 影响范围：多会话并发、聊天渠道回复路由  
- 环境：  
  - NanoBot 版本：0.3.5  
  - Python：3.12  
  - OS：Windows  
- 问题描述：  
  用户反馈一个会话正在运行时，在其他会话中进行交流，回复可能被发送到第一个运行中的会话。期望行为是“固定回复固定会话，在该回复的地方回复”。用户指出 0.3.0 没有此问题。  
- 是否已有 fix PR：  
  当前数据中未看到直接关联 Issue #5798 的修复 PR。  
- 分析：  
  这是一个潜在回归问题，可能涉及 session handle、消息路由、异步任务绑定或渠道回复目标记录。由于会直接导致对话错位，建议维护者优先复现并定位。

---

### 中高优先级：会话 checkpoint 在 metadata 更新后丢失

#### PR #5801：fix(session): preserve checkpoints across metadata updates  
- 状态：**OPEN**  
- 作者：Kuang-xianxin  
- 链接：https://github.com/HKUDS/nanobot/pull/5801  
- 标签：bug, regression, fix, test, priority: p2  
- 严重程度：**中高**  
- 问题描述：  
  在 in-flight turn 中分配 session handle 会重写主 JSONL metadata。由于文件时间戳更新，runtime-checkpoint overlay 会被误判为过期，导致重启后丢失已完成的工具结果和 provider state。  
- 修复方向：  
  PR 计划在 metadata 更新时保留 transcript 的时间戳，从而避免 checkpoint 被错误淘汰。  
- 分析：  
  该问题影响运行中任务恢复能力，尤其对涉及工具调用、长任务、多步骤 Agent 工作流的用户影响较大。它与 NanoBot 作为个人 AI 助手 / Agent 的可靠性直接相关，建议尽快 review。

---

### 中优先级：Telegram 话题、富文本换行与 typing 状态问题

#### PR #5803：Small improvements and fixes for Telegram  
- 状态：**OPEN**  
- 作者：wzrayyy  
- 链接：https://github.com/HKUDS/nanobot/pull/5803  
- 标签：bug, channel, fix, chore, feature, test, priority: p2  
- 严重程度：**中**  
- 内容摘要：  
  该 PR 包含 3 项 Telegram 改进：  
  1. Telegram rich messages 中换行前需要两个空格以正确渲染。  
  2. `topic_id` 现在可在 `my` tool 中使用。  
  3. 开启 topic 时，typing status 会正确尊重当前 topic。  
- 分析：  
  这些改动看似较小，但对 Telegram 群组和 topic 场景中的体验较关键，尤其是 topic 隔离和 typing 状态准确性。该 PR 与“回复/状态应落在正确上下文”的方向一致。

---

### 中优先级：Discord 回复消息行为缺失

#### PR #5800：feat(discord): add replyToMessage parity with Telegram  
- 状态：**OPEN**  
- 作者：ZedingZhang  
- 链接：https://github.com/HKUDS/nanobot/pull/5800  
- 标签：documentation, channel, webui, feature, test, priority: p2  
- 严重程度：**中**  
- 内容摘要：  
  新增可选配置 `channels.discord.replyToMessage`，默认值为 `false`。启用后，Discord 端会回复触发机器人的原消息，覆盖普通回复、附件回复、流式回复等场景，并保留显式 outbound reply target，避免 reply mention。  
- 分析：  
  这是渠道一致性改进，也能减少 Discord 多用户会话中的上下文错位。虽然是 opt-in 功能，但对于多人频道使用者非常重要。

---

## 6. 功能请求与路线图信号

### Discord 与 Telegram 的回复行为趋于一致

#### PR #5800：Discord replyToMessage 支持  
- 链接：https://github.com/HKUDS/nanobot/pull/5800  
- 路线图信号：  
  NanoBot 正在强化跨渠道行为一致性，尤其是 Telegram 与 Discord 之间的消息回复语义对齐。  
- 可能进入下一版本的概率：**较高**  
  理由：PR 已包含 documentation、webui、test 等标签，说明实现范围较完整，并且配置默认关闭，兼容风险较低。

### Telegram topic 支持进一步完善

#### PR #5803：Telegram 小修复与增强  
- 链接：https://github.com/HKUDS/nanobot/pull/5803  
- 路线图信号：  
  Telegram topic 场景正被更细致支持，包括 `topic_id` 暴露、typing status 归属、rich message 渲染等。  
- 可能进入下一版本的概率：**较高**  
  理由：属于局部 channel 改进，风险可控，且对已有用户体验提升直接。

### 会话恢复与 checkpoint 稳定性增强

#### PR #5801：保留 metadata 更新中的 checkpoint  
- 链接：https://github.com/HKUDS/nanobot/pull/5801  
- 路线图信号：  
  项目正在强化运行中任务、工具调用和 provider state 的恢复能力。这对 Agent 类应用非常关键，尤其是长任务、多步骤工具链场景。  
- 可能进入下一版本的概率：**较高**  
  理由：该 PR 标记为 regression 与 priority:p2，且修复的是数据恢复可靠性问题。

---

## 7. 用户反馈摘要

### 真实用户痛点：多会话并发时回复串线

- 来源：Issue #5798  
- 链接：https://github.com/HKUDS/nanobot/issues/5798  
- 用户场景：  
  用户同时运行多个会话，其中一个会话处于执行状态，同时在其他会话中继续交流。  
- 不满意点：  
  回复没有回到用户当前交流的会话，而是出现在第一个运行中的会话里。  
- 用户期望：  
  每条回复必须绑定其触发会话，“固定回复固定会话”。  
- 关键补充：  
  用户明确指出 NanoBot **0.3.0 没有问题，0.3.5 出现问题**，这为维护者提供了重要的回归定位线索。

### 渠道使用体验反馈信号

虽然今日没有大量 Issue 评论，但从 PR 内容可以看出用户和贡献者关注点集中在以下方面：

1. **回复目标准确性**  
   - Discord replyToMessage：PR #5800  
   - Telegram topic typing status：PR #5803  
   - 会话串话：Issue #5798  

2. **消息噪音控制**  
   - QQ 渠道上下文压缩提示被永久显示：PR #5799  

3. **初始化配置透明度**  
   - WebUI 模型未设置时不应暴露默认 provider/model：PR #5802  

这些反馈共同表明，NanoBot 用户正在从“能运行”转向关注“多渠道、多会话、长任务场景下是否可靠且自然”。

---

## 8. 待处理积压

当前提供的数据仅覆盖最近 24 小时活动，未包含长期未响应 Issue 或 PR 的完整列表，因此无法准确判断长期积压项。基于今日数据，建议维护者重点关注以下仍处于 Open 状态的条目：

### 需要优先处理

1. **Issue #5798：回复串会话问题**  
   - 链接：https://github.com/HKUDS/nanobot/issues/5798  
   - 原因：影响核心会话隔离，且用户指出为 0.3.0 到 0.3.5 的回归。

2. **PR #5801：preserve checkpoints across metadata updates**  
   - 链接：https://github.com/HKUDS/nanobot/pull/5801  
   - 原因：涉及 checkpoint 恢复、工具结果保留和 provider state 稳定性，是 Agent 可靠性的关键问题。

3. **PR #5800：Discord replyToMessage parity with Telegram**  
   - 链接：https://github.com/HKUDS/nanobot/pull/5800  
   - 原因：可改善 Discord 多消息上下文下的回复归属，与当前会话串话类问题方向一致。

4. **PR #5803：Telegram small improvements and fixes**  
   - 链接：https://github.com/HKUDS/nanobot/pull/5803  
   - 原因：修复 Telegram topic、typing status 和富文本渲染细节，适合尽快合入以改善渠道体验。

---

## 总体健康度评估

今日 NanoBot 没有新版本发布，但维护活动较集中，PR 数量明显高于 Issue 数量，说明项目处于**以修复和体验打磨为主的开发周期**。当前最值得关注的是会话隔离与回复归属问题，这类问题会直接影响个人 AI 助手在多会话、多渠道场景下的可信度。  
整体来看，项目维护响应积极，多个 PR 已覆盖 WebUI、Discord、Telegram、QQ 和 session runtime 等不同层面，健康度保持良好；但建议尽快处理 Issue #5798 及 PR #5801，以避免 0.3.5 相关回归继续影响用户信任。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
日期：2026-09-18  
仓库：NousResearch/hermes-agent

---

## 1. 今日速览

过去 24 小时 Hermes Agent 活跃度很高：Issues 更新 50 条，其中 46 条仍处于新开或活跃状态，PR 更新 50 条，其中 48 条仍待合并。今日没有新版本发布，说明维护重点集中在修复回归、安装更新稳定性、Desktop 体验、工具调用链路和网关/会话状态一致性上。

整体来看，项目处于“高开发强度 + 高缺陷暴露”的阶段。多个 P0/P1/P2 问题集中出现在更新流程、异步委托、会话恢复、配置兼容、MCP 工具缓存和 Desktop 渲染等核心路径，显示 v0.21.3 之后仍存在一定回归压力。积极信号是，多数高优先级问题已经有对应 fix PR 或候选修复，维护响应速度较快。

---

## 2. 项目进展

今日无新版本发布。PR 数据显示过去 24 小时共有 50 条 PR 更新，其中 2 条已合并或关闭、48 条仍待合并。由于提供的数据中仅展示了评论数最多的 20 条 PR，且这些 PR 均为 OPEN 状态，无法准确列出已合并/关闭 PR 的编号与内容。

从待合并 PR 看，今日推进主要集中在以下方向：

### 2.1 安装与更新稳定性

- [PR #114601](https://github.com/NousResearch/hermes-agent/pull/114601) `fix(update): fail closed when the pre-update backup fails; replace a symlinked SOUL.md`  
  对应 [Issue #114592](https://github.com/NousResearch/hermes-agent/issues/114592)。修复 `hermes update --yes` 在预更新备份失败后仍继续执行的问题，并处理 `SOUL.md` 符号链接循环导致 gateway 无法启动的严重回归。

- [PR #114600](https://github.com/NousResearch/hermes-agent/pull/114600) `fix(config): replace a cyclic SOUL.md symlink instead of failing home init`  
  修复 `HERMES_HOME/SOUL.md` 循环 symlink 导致 home 初始化失败的问题。

- [PR #114616](https://github.com/NousResearch/hermes-agent/pull/114616) 对应的 Issue 是 [#114616](https://github.com/NousResearch/hermes-agent/issues/114616)，指出 `v2026.9.14 → HEAD` 更新后 gateway 自动重启失败，原因是无法从 `utils` 导入 `file_signature`。该问题目前仍为 OPEN，属于安装更新链路的 P1 风险。

### 2.2 Desktop 稳定性与可用性

- [PR #114620](https://github.com/NousResearch/hermes-agent/pull/114620) `fix(desktop): fall back to X11 after WSLg renderer launch failure`  
  对应 [Issue #114615](https://github.com/NousResearch/hermes-agent/issues/114615)。修复 WSLg 下强制 Wayland 导致 Electron renderer 启动失败、窗口无法显示的问题。

- [PR #114619](https://github.com/NousResearch/hermes-agent/pull/114619) `fix(desktop): restore dark inline reference contrast`  
  对应 [Issue #114612](https://github.com/NousResearch/hermes-agent/issues/114612)。修复 Desktop 暗色主题中 inline refs / @mentions 几乎不可见的问题。

- [PR #114596](https://github.com/NousResearch/hermes-agent/pull/114596) `fix(desktop): empty-prose and settled-target guards in resume reconciler`  
  对应 [Issue #114543](https://github.com/NousResearch/hermes-agent/issues/114543)。修复 Desktop 会话恢复时空文本匹配导致后续工具活动被错误嫁接到早期消息的问题。

- [PR #114623](https://github.com/NousResearch/hermes-agent/pull/114623) `fix(desktop/tips): retire local-runtime-update tip on dismiss + Update now click`  
  修复 Desktop 更新提示在用户关闭或点击 Update now 后未正确退场的问题。

### 2.3 工具调用、MCP 与本地模型

- [PR #114606](https://github.com/NousResearch/hermes-agent/pull/114606) `fix(mcp): refresh live tools when ttl expires`  
  对应 [Issue #114604](https://github.com/NousResearch/hermes-agent/issues/114604)。使长生命周期 MCP session 在 `tools/list` 的 `ttlMs` 过期后能够重新拉取工具列表。该 Issue 已关闭，说明修复链路可能已被确认或替代处理。

- [PR #114603](https://github.com/NousResearch/hermes-agent/pull/114603) `fix: resumable ranged downloads in local models`  
  修复本地模型大文件下载中 silent EOF 导致 16GB 级别 GGUF 下载失败且无法正确续传的问题。

- [PR #114617](https://github.com/NousResearch/hermes-agent/pull/114617) `fix(local-runtime): reject reused legacy server pids`  
  修复 legacy local-runtime 状态文件只记录 PID，导致 OS PID 复用后 Hermes 错误识别本地 llama.cpp server 仍在运行的问题。

### 2.4 认证、配置与 provider 路由

- [PR #114614](https://github.com/NousResearch/hermes-agent/pull/114614) `fix(cli): retry transient transport blips in the Codex device-code login`  
  对应 [Issue #114610](https://github.com/NousResearch/hermes-agent/issues/114610)。修复 Codex device-code 登录中单次网络抖动导致整个 15 分钟轮询流程中断的问题。

- [PR #114611](https://github.com/NousResearch/hermes-agent/pull/114611) `fix(auth): retry transient Codex device poll failures`  
  与 #114614 目标高度重叠，标记为 duplicate。维护者需要选择一个实现路径，避免重复合并。

- [PR #114608](https://github.com/NousResearch/hermes-agent/pull/114608) `fix(config): preserve v12 providers after malformed legacy value`  
  对应 [Issue #114605](https://github.com/NousResearch/hermes-agent/issues/114605)。修复 malformed legacy `custom_providers` 标量值导致 v12+ `providers` 条目被整体吞掉、Desktop 显示 0 endpoints 的问题。

- [PR #114613](https://github.com/NousResearch/hermes-agent/pull/114613) `fix: salvage explicit provider fallback policy and visibility from #63418`  
  试图恢复显式 provider fallback 策略和可见性，影响 CLI、agent、gateway、TUI、cron、desktop 等多个面，属于较大范围的策略型变更。

### 2.5 会话、异步委托与压缩

- [PR #114595](https://github.com/NousResearch/hermes-agent/pull/114595) `fix(compression): defer after timed-out preflight prune`  
  修复 turn-start context compression 超时后未能正确利用 deterministic tool-result pruning fallback 的问题。

- [PR #114597](https://github.com/NousResearch/hermes-agent/pull/114597) `fix(process_registry): never close stdout under a live Windows reader thread`  
  修复 Windows 下长运行 `hermes dashboard` / `hermes serve` 中 pooled `tui_gateway` RPC 静默卡死的问题。

- [PR #114624](https://github.com/NousResearch/hermes-agent/pull/114624) `fix(computer-use): guard Bot Screen backend lifetime during dispatch`  
  针对 Bot Screen backend 生命周期和 admission protection，属于 computer-use/backend 稳定性改进。

### 2.6 可观测性与用量统计

- [PR #114621](https://github.com/NousResearch/hermes-agent/pull/114621) `/usage shows every model route on CLI, TUI, gateway and Desktop`  
  扩展 `/usage`，展示 session token 消耗按 model route 的分布，覆盖 CLI、Ink TUI、gateway 和 Desktop。该 PR 有助于用户理解多模型、压缩、MoA 或 fallback 场景下的实际成本来源。

---

## 3. 社区热点

### 3.1 插件安装 public catalog repo 却触发 git 认证

- [Issue #114526](https://github.com/NousResearch/hermes-agent/issues/114526)  
  标签：`type/bug`, `comp/cli`, `comp/plugins`, `area/auth`, `P3`, `Plugin Catalog`  
  评论数：4

问题表现为 `hermes plugins install` 安装 curated catalog 中的公开插件仓库时，git 仍尝试读取用户名并失败：`could not read Username ... terminal prompts disabled`。这说明插件安装路径可能没有正确处理 public repo 的匿名 clone、GitHub URL 规范化、credential helper 或非交互式环境。

背后诉求：用户希望 Hermes 插件生态做到“开箱即用”，尤其是 public plugin 不应要求额外认证。该问题虽然标为 P3，但对首次体验影响较大。

---

### 3.2 tool_call batch envelope JSON string 被误判，导致工具调用循环

- [Issue #114484](https://github.com/NousResearch/hermes-agent/issues/114484)  
  标签：`type/bug`, `comp/tools`, `P2`  
  评论数：4

模型将 `tool_call` batch envelope 的 `calls` 字段以 JSON string 形式输出，而 validator 期望数组，最终给出误导性的 “non-empty array” 错误，并诱发 agent retry loop。该问题在 GLM-family 模型和 `ollama-cloud` 上被观察到，但本质是 provider-agnostic。

背后诉求：用户希望工具调用桥接层对模型输出具备更强容错能力，并提供可操作的错误信息。对多模型生态而言，这类 schema 容错会直接影响 Hermes 作为通用 agent runtime 的兼容性。

---

### 3.3 Desktop 会话恢复错位：后续工具活动被嫁接到早期消息

- [Issue #114543](https://github.com/NousResearch/hermes-agent/issues/114543)  
  标签：`type/bug`, `P2`, `comp/desktop`, `area/sessions`  
  评论数：3  
  对应修复：[PR #114596](https://github.com/NousResearch/hermes-agent/pull/114596)

Desktop transcript reconciliation 过程中，空文本 resume matching 可能把后续工具或 reasoning 活动错误归并到早期消息中，造成时间线错乱。这是明显的 session-state 问题，影响用户对 agent 行为的信任。

背后诉求：用户需要 Desktop 历史记录和 live transcript 在恢复、刷新、重连后保持严格一致，不能出现“工具调用穿越到旧消息”的可见错位。

---

### 3.4 Email gateway 解析 mojibake headers 时 Header 对象未转 str

- [Issue #114503](https://github.com/NousResearch/hermes-agent/issues/114503)  
  标签：`type/bug`, `duplicate`, `comp/plugins`, `platform/email`, `P3`, `sweeper:risk-message-delivery`  
  评论数：3

邮件网关在处理包含 raw non-ASCII bytes 的 RFC822 消息头时，`msg.get()` 可能返回 `email.header.Header` 对象而非字符串，后续解析失败。该问题已标为 duplicate，但仍反映出 messaging gateway 对真实世界邮件格式的鲁棒性需求。

背后诉求：用户希望 Hermes 能可靠处理非标准或编码异常的邮件输入，尤其是在邮件作为 agent 入口时，消息丢失或解析失败会直接影响可用性。

---

### 3.5 Async delegation completion 延迟 24 分钟，/stop 后队列不恢复

- [Issue #114456](https://github.com/NousResearch/hermes-agent/issues/114456)  
  标签：`type/bug`, `comp/gateway`, `tool/delegate`, `P0`, `area/sessions`  
  评论数：2

已完成的异步委托结果在 20:00:36 ready，但直到 20:24:43 才被 session 处理。问题包括 `/stop` 未重启已入队 internal notice 的处理，以及 mid-history insertion 破坏 prompt cache。

背后诉求：用户依赖 `delegate_task` 进行长任务并发处理，期望完成通知能可靠、及时地进入父会话。该问题是今日最高优先级 P0，涉及 session state、message delivery、caching 三个风险域。

---

## 4. Bug 与稳定性

以下按严重程度和影响面排列，并标注是否已有修复 PR。

### P0

#### 4.1 Async delegation completion 被 busy/interrupted session 阻塞

- Issue：[ #114456](https://github.com/NousResearch/hermes-agent/issues/114456)  
- 状态：OPEN  
- 影响组件：gateway、delegate、sessions  
- 严重程度：P0  
- 是否已有 fix PR：数据中未见明确对应 PR

影响：异步委托结果可能长期不投递，`/stop` 后 pending queue 未被正确 drain，且 mid-history insertion 可能破坏 prompt cache。该问题会让用户误以为子任务未完成，或导致完成结果延迟进入会话。

---

### P1

#### 4.2 `hermes update --yes` 在 pre-update backup 失败后继续执行，导致 gateway 无法启动

- Issue：[ #114592](https://github.com/NousResearch/hermes-agent/issues/114592)  
- 修复 PR：[ #114601](https://github.com/NousResearch/hermes-agent/pull/114601)  
- 相关 PR：[ #114600](https://github.com/NousResearch/hermes-agent/pull/114600)  
- 状态：Issue OPEN，PR OPEN  
- 影响组件：CLI、config、install/update  
- 严重程度：P1

影响：`SOUL.md` symlink loop 使 gateway unbootable，并触发 launchd exit-75 restart storm。该问题对生产部署和长期运行用户影响较大。

---

#### 4.3 v2026.9.14 更新到 HEAD 后 gateway restart 失败：无法导入 `file_signature`

- Issue：[ #114616](https://github.com/NousResearch/hermes-agent/issues/114616)  
- 状态：OPEN  
- 影响组件：CLI、install/update  
- 严重程度：P1  
- 是否已有 fix PR：数据中未见明确对应 PR

影响：每日 Install & Update E2E 工作流在 `hermes-update` legs 失败，表明更新流程存在自动化回归。建议维护者优先处理，因为该问题可能阻断用户升级路径。

---

#### 4.4 Compression timeout 后处理不当

- PR：[ #114595](https://github.com/NousResearch/hermes-agent/pull/114595)  
- 状态：OPEN  
- 影响组件：agent、compression、session-state  
- 严重程度：P1

该 PR 修复 turn-start context compression 超时后，未能正确 fallback 到 deterministic pruning 并 defer 的问题。虽然数据中未列出对应 Issue，但从标签看属于核心 agent 稳定性问题。

---

### P2

#### 4.5 MCP `tools/list` 的 `ttlMs` 只影响磁盘缓存，不影响 live session

- Issue：[ #114604](https://github.com/NousResearch/hermes-agent/issues/114604)  
- 修复 PR：[ #114606](https://github.com/NousResearch/hermes-agent/pull/114606)  
- 状态：Issue CLOSED，PR OPEN  
- 影响组件：MCP tools  
- 严重程度：P2

影响：长会话中 MCP server 工具变化不会在 TTL 到期后自动刷新，可能导致 agent 使用过期工具 schema。Issue 已关闭，说明修复方向已被确认。

---

#### 4.6 malformed `custom_providers` 导致 v12 providers 视图被清空

- Issue：[ #114605](https://github.com/NousResearch/hermes-agent/issues/114605)  
- 修复 PR：[ #114608](https://github.com/NousResearch/hermes-agent/pull/114608)  
- 状态：Issue OPEN，PR OPEN  
- 影响组件：CLI、config、Desktop endpoint discovery  
- 严重程度：P2

影响：错误配置写入标量 `custom_providers` 后，Desktop 显示 “0 endpoints”，即使 v12+ `providers` 中存在有效条目。该问题属于配置兼容性和用户可恢复性问题。

---

#### 4.7 Codex device-code 登录遇到一次网络抖动即失败

- Issue：[ #114610](https://github.com/NousResearch/hermes-agent/issues/114610)  
- 修复 PR：[ #114614](https://github.com/NousResearch/hermes-agent/pull/114614)  
- 重复 PR：[ #114611](https://github.com/NousResearch/hermes-agent/pull/114611)  
- 状态：Issue OPEN，PR OPEN  
- 影响组件：CLI、OpenAI/Codex auth  
- 严重程度：P2

影响：用户已经在浏览器批准登录后，单次 SSL EOF、连接重置或 timeout 会导致设备码报废，需要重新开始登录。修复方向是对 transient transport error 继续轮询，保持 15 分钟 deadline 为最终边界。

---

#### 4.8 Desktop resume reconciliation 导致消息和工具活动错位

- Issue：[ #114543](https://github.com/NousResearch/hermes-agent/issues/114543)  
- 修复 PR：[ #114596](https://github.com/NousResearch/hermes-agent/pull/114596)  
- 状态：Issue OPEN，PR OPEN  
- 影响组件：Desktop、sessions  
- 严重程度：P2

影响：聊天时间线错乱，损害用户对 Desktop 会话状态的信任。

---

#### 4.9 Disk cleanup 插件可能删除受保护目录

- Issue：[ #114552](https://github.com/NousResearch/hermes-agent/issues/114552)  
- 状态：OPEN  
- 影响组件：plugins、disk-cleanup  
- 严重程度：P2  
- 是否已有 fix PR：数据中未见明确对应 PR

影响：`disk-cleanup` tracked-item 删除路径可能对目录直接 `shutil.rmtree()`，未检查保护列表，从而删除 `$HERMES_HOME/cache`，破坏 terminal snapshots 和 kanban attachments。建议优先修复，因为这是数据破坏类 bug。

---

#### 4.10 Windows process registry 可能导致 pooled TUI gateway RPC 卡死

- PR：[ #114597](https://github.com/NousResearch/hermes-agent/pull/114597)  
- 状态：OPEN  
- 影响组件：terminal tools、Windows、sessions  
- 严重程度：P2

修复 Windows reader thread 仍在运行时关闭 stdout 导致的死锁。影响 `setup.status`、`setup.runtime_check`、`session.list` 等 RPC。

---

#### 4.11 Bedrock application inference profile ARN 上下文窗口被错误回退到 128k

- Issue：[ #114476](https://github.com/NousResearch/hermes-agent/issues/114476)  
- 相关关闭重复项：[ #114474](https://github.com/NousResearch/hermes-agent/issues/114474)  
- 状态：OPEN  
- 影响组件：agent、Bedrock、profiles  
- 严重程度：P2  
- 是否已有 fix PR：数据中未见明确对应 PR

影响：Claude Sonnet 4.6 这类 1M context 模型通过 application inference profile ARN 配置时，Hermes 只按 128k 估算，导致过早 compact，浪费长上下文能力。

---

### P3 / 体验类与兼容性问题

#### 4.12 WSLg 下 Desktop 因强制 Wayland 无窗口

- Issue：[ #114615](https://github.com/NousResearch/hermes-agent/issues/114615)  
- 修复 PR：[ #114620](https://github.com/NousResearch/hermes-agent/pull/114620)  
- 状态：Issue OPEN，PR OPEN  
- 严重程度：P3

---

#### 4.13 Desktop 暗色主题 inline refs / @mentions 几乎不可见

- Issue：[ #114612](https://github.com/NousResearch/hermes-agent/issues/114612)  
- 修复 PR：[ #114619](https://github.com/NousResearch/hermes-agent/pull/114619)  
- 状态：Issue OPEN，PR OPEN  
- 严重程度：P3

---

#### 4.14 macOS Desktop tooltip 全局失效

- Issue：[ #114602](https://github.com/NousResearch/hermes-agent/issues/114602)  
- 状态：OPEN  
- 严重程度：P3  
- 是否已有 fix PR：数据中未见明确对应 PR

---

#### 4.15 Cron ticker sleep-after-work 导致任务逐渐漂移

- Issue：[ #114467](https://github.com/NousResearch/hermes-agent/issues/114467)  
- 状态：OPEN  
- 严重程度：P3  
- 是否已有 fix PR：数据中未见明确对应 PR

影响：无 missed 或 duplicated slots，但长期运行下 jobs 会逐渐变晚。

---

#### 4.16 CLI help 未展示 `hermes -p <profile> gateway <action>`

- Issue：[ #114495](https://github.com/NousResearch/hermes-agent/issues/114495)  
- 状态：OPEN  
- 严重程度：P3

---

#### 4.17 GitHub 文档多个链接 404

- Issue：[ #114428](https://github.com/NousResearch/hermes-agent/issues/114428)  
- 状态：OPEN  
- 严重程度：P3

---

## 5. 功能请求与路线图信号

### 5.1 Desktop 关闭窗口时最小化到系统托盘

- Issue：[ #114618](https://github.com/NousResearch/hermes-agent/issues/114618)  
- 状态：OPEN

用户希望 Windows/Linux 上点击窗口关闭按钮时不要终止整个 Desktop app 和 embedded backend，而是最小化到 system tray。该需求符合“always-on companion agent”的使用模式，可能进入 Desktop UX 路线图。

纳入下一版本可能性：中等。实现范围相对可控，但涉及多平台 tray 行为和后台生命周期，需要谨慎处理。

---

### 5.2 每次 prompt 可选择跳过 MoA reference fan-out

- Issue：[ #114576](https://github.com/NousResearch/hermes-agent/issues/114576)  
- 状态：OPEN

用户指出 MoA preset 会对每个 user turn fan out 到所有 reference models，对简单任务成本过高。希望有 per-prompt opt-out 或 solo aggregator 模式。

纳入下一版本可能性：中等偏高。今日 [PR #114621](https://github.com/NousResearch/hermes-agent/pull/114621) 正在增强 `/usage` 的 per-model-route 成本可见性，这与 MoA 成本控制诉求高度相关。先提升可观测性，再加入控制开关，是合理路线。

---

### 5.3 Operator-curated model list 与 provider-scoped family aliases

- Issue：[ #114477](https://github.com/NousResearch/hermes-agent/issues/114477)  
- 重复关闭项：[ #114475](https://github.com/NousResearch/hermes-agent/issues/114475)  
- 状态：OPEN

该需求来自“由 operator 配置、非技术用户使用”的部署场景。用户希望模型选择器可被管理员裁剪，并支持 provider-scoped family aliases，避免暴露过多或不可用模型。

纳入下一版本可能性：中等。当前 [PR #114613](https://github.com/NousResearch/hermes-agent/pull/114613) 正在处理 provider fallback policy 和可见性，可能为后续 picker curation 打基础。

---

### 5.4 Compression 是否可通过 subagent 执行

- Issue：[ #114466](https://github.com/NousResearch/hermes-agent/issues/114466)  
- 状态：OPEN

用户关心 compression 阻塞主聊天体验，希望使用 subagent 或 aux model 让主 chat 保持响应。今日 [PR #114595](https://github.com/NousResearch/hermes-agent/pull/114595) 已在修复 compression timeout/fallback 行为，但不等同于异步压缩或 subagent 化。

纳入下一版本可能性：中等偏低。该需求涉及架构调整，短期更可能先通过 timeout、fallback 和 aux model 配置改善体验。

---

### 5.5 `/usage` 按 model route 展示消耗

- PR：[ #114621](https://github.com/NousResearch/hermes-agent/pull/114621)  
- 状态：OPEN

该 PR 虽是功能增强，但很可能成为下一版本用户可见改进。它覆盖 CLI、TUI、gateway 和 Desktop，直接回应多模型、多 provider、压缩与 fallback 场景下的成本可解释性需求。

纳入下一版本可能性：较高，前提是审查通过且 UI/数据结构兼容性可控。

---

## 6. 用户反馈摘要

### 6.1 用户对更新流程的容错性不满意

多个问题集中在 `hermes update`、gateway restart、备份失败后继续执行、符号链接循环和依赖版本解析上：

- [Issue #114592](https://github.com/NousResearch/hermes-agent/issues/114592)  
- [Issue #114616](https://github.com/NousResearch/hermes-agent/issues/114616)  
- [Issue #114464](https://github.com/NousResearch/hermes-agent/issues/114464)

用户痛点是：更新本应降低维护成本，但当前某些场景会让 gateway 进入不可启动或 restart storm 状态。对于把 Hermes 作为常驻 agent/gateway 的用户，这是高风险体验。

---

### 6.2 Desktop 用户关注“稳定可见、历史正确、不中断”

Desktop 相关问题包括 WSLg 无窗口、暗色主题引用不可见、tooltip 全局失效、会话恢复错位、关闭窗口终止后台：

- [Issue #114615](https://github.com/NousResearch/hermes-agent/issues/114615)  
- [Issue #114612](https://github.com/NousResearch/hermes-agent/issues/114612)  
- [Issue #114602](https://github.com/NousResearch/hermes-agent/issues/114602)  
- [Issue #114543](https://github.com/NousResearch/hermes-agent/issues/114543)  
- [Issue #114618](https://github.com/NousResearch/hermes-agent/issues/114618)

用户画像很清晰：他们希望 Desktop 成为长期在线的 agent companion，而不是一次性聊天窗口。因此，后台生命周期、会话恢复、UI 可读性和跨平台渲染兼容性都成为关键体验指标。

---

### 6.3 多模型与成本透明度成为持续诉求

用户正在关注 MoA fan-out 成本、provider fallback 可见性、credential-pool 轮换、Bedrock 长上下文识别、`/usage` 按模型拆分等问题：

- [Issue #114576](https://github.com/NousResearch/hermes-agent/issues/114576)  
- [Issue #114501](https://github.com/NousResearch/hermes-agent/issues/114501)  
- [Issue #114476](https://github.com/NousResearch/hermes-agent/issues/114476)  
- [PR #114621](https://github.com/NousResearch/hermes-agent/pull/114621)  
- [PR #114613](https://github.com/NousResearch/hermes-agent/pull/114613)

这表明 Hermes 的用户正在进入更复杂的部署场景：多 provider、多模型、多账号、多上下文窗口和成本控制。未来 roadmap 需要同时解决“路由策略”和“用量可解释性”。

---

### 6.4 Gateway / messaging 用户重视消息不丢、不延迟

邮件、Slack、async delegation 和 multiplex profile session 都出现 message delivery 风险：

- [Issue #114503](https://github.com/NousResearch/hermes-agent/issues/114503)  
- [Issue #114609](https://github.com/NousResearch/hermes-agent/issues/114609)  
- [Issue #114456](https://github.com/NousResearch/hermes-agent/issues/114456)  
- [PR #114622](https://github.com/NousResearch/hermes-agent/pull/114622)

用户将 Hermes 作为真实通信代理时，消息延迟、丢失、错误投递或未通知都会显著降低信任度。此类问题建议维护者以端到端 message delivery 测试覆盖。

---

### 6.5 插件与生态使用仍有摩擦

插件安装、ACP provider discovery、disk-cleanup 插件安全性均暴露出生态扩展路径上的问题：

- [Issue #114526](https://github.com/NousResearch/hermes-agent/issues/114526)  
- [Issue #114548](https://github.com/NousResearch/hermes-agent/issues/114548)  
- [Issue #114552](https://github.com/NousResearch/hermes-agent/issues/114552)

用户希望插件和 out-of-tree provider 能像核心功能一样可靠；特别是 catalog 安装失败和 cleanup 插件误删目录，会削弱用户对插件系统的信任。

---

## 7. 待处理积压

由于本次数据仅覆盖过去 24 小时，无法判断真正“长期未响应”的历史积压。不过，从严重程度、影响范围和当前仍 OPEN 的状态看，以下事项应优先纳入维护者关注队列。

### 7.1 P0/P1 高优先级仍待关闭

1. [Issue #114456](https://github.com/NousResearch/hermes-agent/issues/114456)  
   Async delegation completion notice 被 busy/interrupted session 阻塞。P0，暂无明确 fix PR。

2. [Issue #114616](https://github.com/NousResearch/hermes-agent/issues/114616)  
   `hermes update` 后 gateway restart 失败，无法导入 `file_signature`。P1，暂无明确 fix PR。

3. [Issue #114592](https://github.com/NousResearch/hermes-agent/issues/114592)  
   pre-update backup 失败后仍继续更新，导致 gateway unbootable。已有 [PR #114601](https://github.com/NousResearch/hermes-agent/pull/114601)，建议优先 review。

4. [PR #114595](https://github.com/NousResearch/hermes-agent/pull/114595)  
   Compression timeout fallback 修复。P1，影响长上下文会话稳定性，建议优先验证。

---

### 7.2 有重复修复或重复 Issue，需要维护者归并

1. Codex device-code login transient transport error  
   - Issue：[ #114610](https://github.com/NousResearch/hermes-agent/issues/114610)  
   - PR：[ #114614](https://github.com/NousResearch/hermes-agent/pull/114614)  
   - Duplicate PR：[ #114611](https://github.com/NousResearch/hermes-agent/pull/114611)

2. Bedrock application inference profile ARN context window  
   - Open Issue：[ #114476](https://github.com/NousResearch/hermes-agent/issues/114476)  
   - Closed duplicate：[ #114474](https://github.com/NousResearch/hermes-agent/issues/114474)

3. Operator-curated model picker / aliases  
   - Open Issue：[ #114477](https://github.com/NousResearch/hermes-agent/issues/114477)  
   - Closed duplicate：[ #114475](https://github.com/NousResearch/hermes-agent/issues/114475)

4. Email gateway Header object parsing  
   - Issue：[ #114503](https://github.com/NousResearch/hermes-agent/issues/114503)  
   - 已标 duplicate，但需确保主 Issue 有实际修复跟踪。

---

### 7.3 数据破坏或消息丢失类问题建议进入短期里程碑

1. [Issue #114552](https://github.com/NousResearch/hermes-agent/issues/114552)  
   `disk-cleanup` 可能删除 `$HERMES_HOME/cache` 和 kanban attachments。

2. [Issue #114609](https://github.com/NousResearch/hermes-agent/issues/114609)  
   multiplex async completion 可能因读取 default `state.db` 将 live profile session 误判为 permanently gone，并终止投递。

3. [Issue #114501](https://github.com/NousResearch/hermes-agent/issues/114501)  
   Credential-pool rotation 在 live session 中不回退，导致 quota 恢复后仍使用付费 fallback。

4. [Issue #114484](https://github.com/NousResearch/hermes-agent/issues/114484)  
   tool_call envelope 容错不足导致 tool-call loops。

---

## 项目健康度评估

- **活跃度**：高。24 小时内 50 条 Issue 与 50 条 PR 更新，社区和自动化反馈非常活跃。  
- **维护响应**：较快。多个当天新报 P1/P2/P3 问题已经出现对应 PR。  
- **稳定性风险**：中高。更新流程、gateway、session-state、Desktop 和工具调用链路都有核心路径回归。  
- **产品方向**：清晰。Hermes 正在从 CLI/agent 工具向 Desktop companion、多 provider runtime、gateway/message agent 和长期会话系统扩展。  
- **建议优先级**：先收敛 P0/P1 安装更新与 session delivery 问题，再处理 Desktop 体验和 provider/model 成本可见性增强。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报

日期：2026-09-18  
仓库：[`sipeed/picoclaw`](https://github.com/sipeed/picoclaw)

---

## 1. 今日速览

过去 24 小时内，PicoClaw 项目整体活跃度偏低但仍有功能向更新方向推进。今日没有新的 Issue、关闭 Issue 或版本发布，说明社区侧反馈与问题报告暂时较安静。唯一的代码动态来自一个新打开的 PR：[`#3381 feat: Switch Openai to responses API`](https://github.com/sipeed/picoclaw/pull/3381)，聚焦于将 OpenAI provider 切换到 Responses API。  
从项目健康度看，当前没有新增 Bug 压力，也没有明显社区争议；但核心供应商 API 适配类变更值得维护者重点审查，因为它可能影响 OpenAI 相关调用链的兼容性与后续功能演进。

---

## 2. 项目进展

今日无已合并或已关闭的重要 PR。

### 待审查 PR

#### [`#3381 feat: :sparkles: Switch Openai to responses API`](https://github.com/sipeed/picoclaw/pull/3381)

- 状态：OPEN
- 作者：XenonR
- 创建时间：2026-09-17
- 更新时间：2026-09-17
- 类型：新功能
- 评论数：暂无数据
- 👍 反应数：0

该 PR 的主要目标是将 OpenAI provider 切换到 Responses API。根据描述，这是一个非破坏性的新功能变更，可能意味着项目正在跟进 OpenAI 最新接口形态，提升模型调用能力或为后续工具调用、多模态、流式响应等能力铺路。

由于该 PR 尚未合并，今日项目主分支功能尚未产生实际推进。不过从方向上看，这属于 AI provider 适配层的重要更新，一旦合入，可能会影响 OpenAI 相关功能的实现路径与维护成本。

---

## 3. 社区热点

今日没有新增 Issue，也没有高评论量或高反应量的讨论。

唯一值得关注的社区/开发动态是：

### [`#3381 Switch Openai to responses API`](https://github.com/sipeed/picoclaw/pull/3381)

该 PR 虽然目前没有明显社区互动，但议题本身具有路线图意义。OpenAI Responses API 是较新的统一接口方向，项目切换到该 API 可能反映出维护者或贡献者希望减少旧式 Chat Completions API 的依赖，并为未来更复杂的 Agent 能力提供基础。

潜在诉求包括：

- 跟进 OpenAI API 演进，避免旧接口长期维护负担；
- 提升 OpenAI provider 的一致性和可扩展性；
- 为后续模型能力、工具调用或响应结构处理打基础。

---

## 4. Bug 与稳定性

过去 24 小时内没有新的 Bug、崩溃或回归问题报告。

当前未观察到以下风险信号：

- 新增崩溃类 Issue：0
- 新增回归类 Issue：0
- 已确认严重 Bug：0
- 针对 Bug 的修复 PR：0

需要注意的是，虽然 [`#3381`](https://github.com/sipeed/picoclaw/pull/3381) 被标记为新功能而非 Bug fix，但 provider API 切换属于基础能力层变更，合并前建议重点验证：

- OpenAI 相关调用是否保持向后兼容；
- 现有配置项是否仍然可用；
- 流式输出、错误处理、响应解析是否受影响；
- 是否需要更新文档或示例。

---

## 5. 功能请求与路线图信号

今日没有通过 Issue 提出的新功能请求。

不过，开放中的 PR [`#3381`](https://github.com/sipeed/picoclaw/pull/3381) 本身释放出明确的路线图信号：

### OpenAI provider 迁移到 Responses API

该方向可能进入下一版本的候选内容，原因包括：

- PR 已经提交，处于待审查状态；
- 变更类型被标注为新功能；
- OpenAI API 适配属于项目 AI 能力的核心部分；
- 若维护者接受该方向，后续可能带动其他 provider 或统一接口层的调整。

建议维护者在合入前明确：

- 是否完全替换旧 OpenAI 调用方式；
- 是否保留兼容层或配置开关；
- 是否需要迁移说明；
- 是否会影响已有用户的 API key、模型配置或调用参数。

---

## 6. 用户反馈摘要

过去 24 小时内没有新的 Issue 评论或用户反馈数据，因此无法提炼新增用户痛点或使用场景。

从今日数据看：

- 用户主动反馈量：0
- 新增问题报告：0
- 新增功能诉求：0
- 明确满意/不满意反馈：无

当前用户侧信号较弱，项目今日主要动态来自贡献者代码提交，而非社区讨论。

---

## 7. 待处理积压

基于本次提供的数据，过去 24 小时内仅发现 1 个待处理 PR，未提供长期未响应 Issue 或 PR 数据，因此无法判断是否存在长期积压。

### 今日新增待处理项

#### [`#3381 feat: Switch Openai to responses API`](https://github.com/sipeed/picoclaw/pull/3381)

- 状态：OPEN
- 类型：新功能
- 建议优先级：中到高

建议维护者关注该 PR 的原因：

1. 涉及 OpenAI provider，属于关键集成路径；
2. Responses API 可能影响响应结构、错误处理和兼容性；
3. 若计划近期发布版本，该变更可能需要配套文档和迁移说明；
4. 若不及时审查，可能导致与 OpenAI 最新接口演进脱节。

---

## 总体健康度评估

今日 PicoClaw 项目处于低噪音、低社区活跃但有核心能力演进的状态。没有新 Bug 或负面反馈，稳定性层面暂无明显风险；但 OpenAI provider API 切换属于潜在影响较大的基础变更，需要谨慎 review。整体来看，项目今日健康度稳定，开发侧有小幅推进信号，社区侧较为安静。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报  
日期：2026-09-18  
数据范围：过去 24 小时  
仓库：github.com/qwibitai/nanoclaw

---

## 1. 今日速览

过去 24 小时内，NanoClaw 没有新的 Issue 更新，但有 5 条 Pull Request 活动，说明今日主要工作集中在代码提交、功能集成与修复验证上。PR 中 3 条仍处于 Open 状态，2 条已关闭，整体活跃度处于中等偏高水平，但社区讨论热度较低，所有条目的评论数与反应数均未形成明显峰值。今日重点方向包括 agent runner / provider 稳定性修复、本地监控 dashboard、TypeSafe Jev 工具技能集成，以及 Linux 安装流程可靠性改进。项目健康度整体稳定，维护工作较集中，但部分新功能仍处于评审或重提阶段，需要继续关注合并进展。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

### 已关闭 / 已完成的重要 PR

#### PR #3847：修复 Linux 非 root 环境下 pnpm/corepack 安装卡死问题  
链接：https://github.com/qwibitai/nanoclaw/pull/3847  
状态：Closed  
作者：glifocat  
标签：`kind/bug`, `PR: Fix`, `area/setup-installation`, `core-team`

该 PR 解决了 Linux 系统中 Node 安装在 `/usr` 等只读系统目录时，`corepack enable` 尝试在全局 bin 目录写入 pnpm shim 导致 `EACCES` 的问题。此前 bootstrap 流程可能因反复尝试或 sudo 路径不明确而“挂起”，影响非 root 用户安装 NanoClaw。

推进意义：

- 提升 Linux 安装体验，尤其是系统级 Node 环境下的普通用户。
- 降低首次安装失败率。
- 改善 setup/bootstrap 的健壮性。
- 对开发者 onboarding 和 CI-like 本地环境更友好。

这是今日最明确的稳定性修复之一，属于安装路径上的关键可用性改进。

---

#### PR #3846：添加 TypeSafe Jev 工具和 maintainer agent 模板  
链接：https://github.com/qwibitai/nanoclaw/pull/3846  
状态：Closed  
作者：glifocat  
标签：`area/repository-maintenance`, `area/skills`

该 PR 计划加入 TypeSafe 的 Jev decision model 作为 container tool，并增加 maintainer agent 模板，使 agent 在分类、排序、yes/no 决策等任务中能够调用该工具。

不过该 PR 已关闭，而后续出现了更聚焦的 PR #3848，说明 #3846 很可能被拆分、重提或由新版方案替代。

推进意义：

- 暴露出项目正在探索“可工具化的决策模型”能力。
- maintainer agent 模板表明 NanoClaw 正在面向维护者自动化场景扩展。
- 虽然该 PR 未直接合入，但其方向延续到了 #3848。

---

## 4. 社区热点

今日没有 Issue 活动，也没有明显高评论或高反应的 PR。所有 PR 的评论数在数据中均为 `undefined`，点赞数为 0，因此无法判断真实社区讨论热度。以下是按影响面与路线图相关性整理的“潜在热点”。

### PR #3845：新增本地监控 Dashboard  
链接：https://github.com/qwibitai/nanoclaw/pull/3845  
状态：Open  
作者：Ruttney  
标签：`area/core`, `area/repository-maintenance`

该 PR 添加本地 NanoClaw monitoring dashboard，包含：

- 安装 `@nanoco/nanoclaw-dashboard`
- 在 `main()` 中接入 `startDashboard()`
- 增加 `DASHBOARD_SECRET`
- 增加 `DASHBOARD_PORT`
- 已通过本地 dashboard API 和 UI 验证

背后诉求：

- 用户和维护者需要更直观地观察本地 agent 运行状态。
- 项目正在从 CLI / agent runtime 向“可观测性工具链”扩展。
- Dashboard 可能成为调试 agent、观察任务执行、定位 provider 问题的重要入口。

这是今日最值得关注的功能型 PR，若合并，可能显著提升本地开发和排障体验。

---

### PR #3848：添加 `/add-typesafe-tool` 技能  
链接：https://github.com/qwibitai/nanoclaw/pull/3848  
状态：Open  
作者：glifocat  
标签：`area/repository-maintenance`, `area/skills`

该 PR 将 TypeSafe 的 Jev decision model 作为 container tool 集成到技能体系中。agent 可调用它完成：

- 分类
- 路由
- 排名
- yes/no 判断

背后诉求：

- 将部分“决策任务”从模型自由生成中抽离，交给专门的工具执行。
- 提升 agent 行为的可控性、一致性和可审计性。
- 强化 NanoClaw 的 skills 生态。

该 PR 是 #3846 的后续或精简版本，当前仍处于 Open 状态，值得维护者优先评审。

---

### PR #3849：修复 opencode / Gemini 历史记录序列化问题  
链接：https://github.com/qwibitai/nanoclaw/pull/3849  
状态：Open  
作者：hadarbas  
标签：`area/agent-runner`, `area/providers`

该 PR 处理 Gemini 对 turn ordering 的严格要求：`functionCall` 必须跟随 `user` turn 或 `functionResponse` turn。如果存储的 session history 以 assistant tool call 开头，则后续请求会以 `model` functionCall 开始，从而被 Gemini 拒绝。

背后诉求：

- 多 provider 支持需要兼容不同模型 API 的消息格式约束。
- session history 恢复机制需要更加稳健。
- agent runner 需要避免从历史状态中恢复出非法对话结构。

这是今日最关键的 runtime / provider 稳定性议题。

---

## 5. Bug 与稳定性

### 高优先级：Gemini 历史记录恢复导致请求被拒绝  
链接：https://github.com/qwibitai/nanoclaw/pull/3849  
状态：Open，有 fix PR  
影响区域：`agent-runner`, `providers`

问题描述：

- Gemini 要求 `functionCall` turn 必须出现在合法上下文之后。
- 如果持久化 session history 以 assistant tool call 开头，恢复后会生成非法请求。
- 每次请求都会以 `model` functionCall 开始，导致 Gemini 拒绝序列化或请求处理。

影响评估：

- 影响 opencode / Gemini provider 场景。
- 可能导致已有 session 无法继续使用。
- 属于状态恢复与 provider 协议兼容问题，对 agent 连续运行可靠性影响较大。

当前状态：

- 已有修复 PR，但尚未合并。
- 建议优先 review，并补充回归测试覆盖异常 session history。

---

### 中高优先级：Linux 非 root 安装时 bootstrap 可能卡死  
链接：https://github.com/qwibitai/nanoclaw/pull/3847  
状态：Closed，有 fix PR  
影响区域：`setup-installation`

问题描述：

- 当 Node 安装在 `/usr` 下且用户非 root 时，`corepack enable` 试图写入 `/usr/bin/pnpm`。
- 由于权限不足触发 `EACCES`。
- 旧逻辑可能反复重试或要求 sudo，导致 bootstrap 流程卡住。

影响评估：

- 影响首次安装体验。
- 对 Linux 普通用户、受管环境、公司开发机影响较大。
- 若安装阶段失败，会直接阻断用户进入 NanoClaw。

当前状态：

- PR 已关闭，说明该修复流程已经完成或被维护者处理。
- 建议确认是否已合并到主分支；若只是关闭未合并，应检查是否有替代 PR。

---

### 中优先级：本地 Dashboard 引入新的运行面  
链接：https://github.com/qwibitai/nanoclaw/pull/3845  
状态：Open  
影响区域：`core`, `repository-maintenance`

该 PR 是功能新增，不是 bug fix，但会引入新的本地服务、端口和密钥配置：

- `DASHBOARD_SECRET`
- `DASHBOARD_PORT`
- `startDashboard()`

潜在稳定性关注点：

- 默认是否启动 dashboard。
- 端口冲突处理。
- secret 缺省行为是否安全。
- dashboard 生命周期是否会影响 CLI / agent runner 退出。
- API/UI 访问权限边界。

建议在合并前明确默认行为和安全配置。

---

## 6. 功能请求与路线图信号

### 本地可观测性：Dashboard 能力正在进入核心路径  
链接：https://github.com/qwibitai/nanoclaw/pull/3845

PR #3845 表明 NanoClaw 正在补齐本地监控和可观测性能力。对于 agent 框架来说，dashboard 通常意味着后续可能支持：

- agent 执行状态查看
- provider 请求追踪
- tool call 记录
- session history 检查
- 错误和延迟监控
- 本地调试 UI

该功能具备进入下一版本的可能性，但需重点评估安全性、默认启用策略和配置兼容性。

---

### Skills 生态扩展：TypeSafe Jev 作为决策工具  
链接：https://github.com/qwibitai/nanoclaw/pull/3848

PR #3848 是当前 skills 方向的明确信号。它不是简单增加一个 prompt skill，而是将外部 decision model 工具化，让 agent 在判断、分类、排序等环节调用专用模型。

潜在路线图含义：

- NanoClaw skills 可能从“提示词模板”升级为“可组合工具包”。
- agent 决策链可能更强调可验证、可路由、可替换。
- 未来可能出现更多领域专用 container tools。

该 PR 已从 #3846 演进为更聚焦的 #3848，说明维护者可能倾向于先合入 skill 本身，再讨论 maintainer agent 模板等更大范围改动。

---

### Provider 兼容性：Gemini / opencode 历史恢复问题被主动修复  
链接：https://github.com/qwibitai/nanoclaw/pull/3849

PR #3849 体现出 NanoClaw 对多 provider 兼容性的持续投入。不同模型厂商对消息序列、tool call、function response 的要求不一致，agent 框架必须在 history persistence 和 replay 阶段做 provider-aware normalization。

潜在路线图含义：

- 更严格的 session history 校验。
- provider-specific message repair。
- 针对 Gemini、OpenAI、Anthropic 等 provider 的一致抽象层强化。
- 更完善的历史记录迁移或清洗机制。

---

## 7. 用户反馈摘要

今日没有 Issue 评论数据，因此无法直接提炼来自用户评论的真实反馈。以下为从 PR 描述中间接反映出的用户痛点和使用场景。

### 安装痛点：非 root Linux 环境下安装不可靠  
相关 PR：https://github.com/qwibitai/nanoclaw/pull/3847

用户痛点：

- 在系统级 Node 安装环境中，普通用户无法写入 `/usr/bin`。
- bootstrap 卡住会给用户造成“安装无响应”的感受。
- 初次体验受损，尤其影响 Linux 用户和企业受控环境。

满意点：

- 修复聚焦明确，直接面向真实安装失败场景。
- 将 pnpm/corepack shim 放到用户可写路径是更合理的默认策略。

---

### 运行痛点：恢复旧 session 时 provider 拒绝请求  
相关 PR：https://github.com/qwibitai/nanoclaw/pull/3849

用户痛点：

- 用户可能保存了 session，但恢复后无法继续对话或执行任务。
- 错误来源隐藏在 provider 的 turn ordering 限制中，不容易自行排查。
- 对长任务、自动化 agent、opencode 工作流影响明显。

潜在期望：

- session 恢复应自动修复非法历史。
- 错误提示应更清楚地说明 provider 格式限制。
- 不应因为历史第一条消息异常导致整个会话不可用。

---

### 可观测性需求：用户需要本地 Dashboard  
相关 PR：https://github.com/qwibitai/nanoclaw/pull/3845

用户痛点：

- 纯 CLI / 日志方式不够直观。
- agent 执行复杂任务时，用户需要查看状态、调用链和错误。
- 本地调试 provider 和工具调用时，需要更好的 UI 辅助。

潜在满意点：

- Dashboard 若稳定合入，将显著提升本地开发体验。
- 对维护者排查 bug、复现用户问题也有帮助。

---

## 8. 待处理积压

今日数据中没有长期未响应的 Issue 或 PR，因此无法识别历史积压项。当前值得维护者短期关注的是 3 个仍处于 Open 状态的 PR。

### PR #3849：Gemini / opencode 历史恢复修复  
链接：https://github.com/qwibitai/nanoclaw/pull/3849  
建议优先级：高

原因：

- 涉及 runtime 稳定性和 provider 兼容性。
- 可能直接导致用户 session 不可恢复。
- 建议优先 review、合并并补充测试。

---

### PR #3845：本地监控 Dashboard  
链接：https://github.com/qwibitai/nanoclaw/pull/3845  
建议优先级：中高

原因：

- 功能价值高，但引入新的本地服务面。
- 合并前应检查默认启动、安全配置、端口冲突和生命周期管理。
- 如作为下一版本重点功能，需要完善文档。

---

### PR #3848：`/add-typesafe-tool` skill  
链接：https://github.com/qwibitai/nanoclaw/pull/3848  
建议优先级：中

原因：

- 延续 #3846 的方向，可能是更聚焦的重提版本。
- 涉及 skills 生态扩展和外部 decision model 集成。
- 建议明确与 maintainer agent 模板的关系，避免后续重复 PR 或设计分歧。

---

## 健康度结论

NanoClaw 今日没有 Issue 噪音，PR 活动集中，说明项目维护节奏较有序。稳定性方面，Linux 安装修复已推进，Gemini session history 问题已有开放修复 PR，是当前最应优先处理的风险点。功能演进方面，本地 dashboard 和 TypeSafe Jev 工具显示项目正在增强可观测性与 agent 决策工具化能力。整体来看，项目健康度良好，但今日社区互动数据偏低，后续应关注开放 PR 的评审速度和新功能引入后的测试覆盖。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报  
**日期：2026-09-18**  
**仓库：** [nearai/ironclaw](https://github.com/nearai/ironclaw)

---

## 1. 今日速览

过去 24 小时内，IronClaw 仓库仅有 **1 条 Issue 更新**，无 Pull Request 活动，也没有新版本发布，整体开发与社区互动活跃度偏低。  
今日唯一新增/活跃事项是自动化或周期性质量分析类 Issue：[#8101 Daily ironclaw failure taxonomy — 2026-09-17](https://github.com/nearai/ironclaw/issues/8101)，内容聚焦 benchmark 失败分类与模型质量问题归因。  
从数据看，项目今日更偏向于 **评测结果追踪与质量观测**，而非代码变更、功能推进或版本交付。  
当前未见用户讨论、修复 PR 或维护者响应，因此短期项目健康度信号主要来自 benchmark 监控，而非社区协作活跃度。

---

## 2. 项目进展

过去 24 小时内无新增、合并或关闭的 Pull Request。

- **PR 更新数量：0**
- **待合并 PR：0**
- **已合并/关闭 PR：0**

因此，今日没有可确认的代码层面进展，也未观察到功能开发、缺陷修复、文档更新或 CI 改进被合入主线。

**进展评估：**

| 维度 | 今日状态 |
|---|---|
| 功能推进 | 无 PR，暂无进展 |
| Bug 修复 | 无 fix PR |
| 文档/测试 | 无相关 PR |
| 发布准备 | 无版本发布信号 |
| 质量监控 | 有 benchmark failure taxonomy Issue 更新 |

今日项目推进主要体现在质量分析记录层面：[Issue #8101](https://github.com/nearai/ironclaw/issues/8101)。

---

## 3. 社区热点

### [#8101 Daily ironclaw failure taxonomy — 2026-09-17](https://github.com/nearai/ironclaw/issues/8101)

- **状态：** Open  
- **作者：** pranavraja99  
- **创建时间：** 2026-09-17  
- **更新时间：** 2026-09-17  
- **评论数：** 0  
- **反应数：** 0  
- **类型判断：** 评测失败分类 / 模型质量分析 / 日常质量报告  

该 Issue 分析了 IronClaw benchmark 中的失败样本，尤其提到 `officeqa` suite 中存在 **35 个 non-pass task**。摘要显示，这些失败大多被归因于 **真实的模型质量问题**，而非测试框架误报或基础设施故障。

从社区热点角度看，虽然该 Issue 没有评论和互动，但它是今日唯一活跃事项，因此是当日最重要信号。其背后的诉求可能包括：

1. **持续跟踪 benchmark 失败原因**  
   通过每日 failure taxonomy 记录，帮助维护者区分模型能力不足、任务定义问题、工具链故障和评测噪声。

2. **识别模型质量瓶颈**  
   Issue 摘要中特别指出 DeepSeek-V4-Flash 在部分 officeqa 任务中的表现问题，说明当前重点可能不在 IronClaw 框架本身，而在被测 agent/model 的任务执行能力。

3. **为后续修复或评测改进提供依据**  
   如果类似报告连续出现，可用于决定是否需要调整 benchmark、改进提示策略、增强 agent 工具调用能力，或标注特定模型组合的已知限制。

---

## 4. Bug 与稳定性

今日没有新增明确的代码 Bug、崩溃报告或回归修复 PR。

不过，[#8101](https://github.com/nearai/ironclaw/issues/8101) 中记录的 benchmark failure taxonomy 可被视为质量稳定性信号，尤其是针对模型/agent 在任务执行中的失败表现。

### 中等优先级：Benchmark 非通过任务集中出现

- **Issue：** [#8101 Daily ironclaw failure taxonomy — 2026-09-17](https://github.com/nearai/ironclaw/issues/8101)  
- **影响范围：** `officeqa` benchmark suite  
- **报告现象：** 35 个 non-pass task  
- **初步归因：** 摘要显示多为真实模型质量错误，而非单纯基础设施异常  
- **严重程度：** 中等  
- **是否已有 fix PR：** 否  
- **是否已关闭：** 否  

**分析：**

该问题目前更像是 benchmark 质量报告，而不是传统意义上的应用崩溃或框架缺陷。但如果 IronClaw 的目标是作为 AI agent 或 personal AI assistant 评测/执行框架，这类持续失败会影响项目对外展示的稳定性和可信度。

建议维护者后续关注：

- 是否有失败任务集中在特定任务类型或工具链步骤；
- 是否为某个模型版本特有问题；
- 是否存在 prompt、task schema、环境依赖或 judge 标准导致的系统性偏差；
- 是否需要为 failure taxonomy 添加自动标签或关联修复任务。

---

## 5. 功能请求与路线图信号

今日没有新的明确功能请求类 Issue，也没有相关 PR 表明某项功能即将进入下一版本。

不过，从 [#8101](https://github.com/nearai/ironclaw/issues/8101) 可以推断出几个潜在路线图信号：

1. **更系统的失败归因能力**  
   每日 failure taxonomy 的存在说明项目可能正在重视 benchmark 失败的结构化分类。未来可能需要增强自动化分析能力，例如：
   - 自动聚类失败原因；
   - 区分模型错误、环境错误、评测器错误；
   - 生成可追踪的历史趋势。

2. **面向 officeqa 场景的 agent 能力优化**  
   `officeqa` 出现 35 个 non-pass task，说明办公问答或办公工作流类任务可能是当前短板。后续路线图可能围绕：
   - 文档理解；
   - 表格/邮件/日程类任务；
   - 多步骤推理；
   - 工具调用可靠性。

3. **模型表现对比与回归监控**  
   Issue 摘要中提到具体模型 DeepSeek-V4-Flash，说明 IronClaw 可能承担模型/agent 版本比较功能。若未来持续记录不同模型的 failure taxonomy，项目可能会朝 benchmark dashboard、质量门禁或回归检测方向发展。

目前这些只是从质量报告中推断出的路线图信号，尚无 PR 或 maintainer 评论验证。

---

## 6. 用户反馈摘要

今日没有 Issue 评论，也没有用户反应数据，因此无法提炼出直接的用户满意度、不满点或具体使用场景反馈。

可从唯一 Issue 中间接观察到的痛点包括：

- **模型在 officeqa 场景下的任务完成率不足**  
  [#8101](https://github.com/nearai/ironclaw/issues/8101) 显示 `officeqa` 存在 35 个 non-pass task，说明用户或评测方可能关注 agent 在办公类任务中的实际可靠性。

- **需要更清晰的失败分类**  
  Daily failure taxonomy 的形式表明项目维护者需要持续区分“模型不行”和“系统不稳定”两类问题。这对于 AI agent 框架尤为重要，因为失败来源可能来自模型、工具、环境、任务定义或评测器。

- **缺少互动与闭环**  
  当前 Issue 评论数为 0，且无关联修复 PR。说明质量问题已被记录，但尚未形成公开讨论或明确修复计划。

---

## 7. 待处理积压

基于今日提供的数据，无法完整判断长期未响应的 Issue 或 PR，因为只包含过去 24 小时内的更新情况，且没有历史积压列表。

今日需要关注的开放事项：

### [#8101 Daily ironclaw failure taxonomy — 2026-09-17](https://github.com/nearai/ironclaw/issues/8101)

- **状态：** Open  
- **评论：** 0  
- **关联 PR：** 未见  
- **建议处理方式：**
  1. 为失败类型添加标签，例如 `benchmark`, `model-quality`, `officeqa`, `failure-analysis`；
  2. 判断是否需要拆分为具体可执行修复项；
  3. 若确认为模型能力问题，可在 Issue 中标注“不属于框架 bug”；
  4. 若存在环境或任务定义问题，应创建 follow-up fix PR；
  5. 将 recurring failure taxonomy 与 benchmark dashboard 或 CI 报告关联，方便长期趋势追踪。

---

## 项目健康度评估

| 指标 | 今日表现 | 评价 |
|---|---:|---|
| Issue 活跃度 | 1 条 | 低 |
| PR 活跃度 | 0 条 | 低 |
| Release 活跃度 | 0 个 | 无发布 |
| 社区互动 | 0 评论 / 0 反应 | 很低 |
| 质量监控 | 有 benchmark failure taxonomy | 有持续观测 |
| 修复闭环 | 无 fix PR | 暂未形成闭环 |

**总体判断：**  
IronClaw 今日处于低活跃状态，没有代码合入和版本发布。唯一显著动态是 benchmark failure taxonomy，说明项目仍在持续监控 AI agent/model 的任务失败情况。短期内，维护者应优先推动质量报告到可执行修复项的转化，尤其是围绕 `officeqa` 中的 35 个 non-pass task 建立更明确的归因、标签和后续处理流程。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报  
日期：2026-09-18  
仓库：netease-youdao/LobsterAI

---

## 1. 今日速览

过去 24 小时，LobsterAI 没有新的 Issue 活动，但 Pull Request 活跃度较高，共有 9 条 PR 更新，其中 8 条已关闭/合并，仅 1 条仍处于开放状态。今日工作重心明显集中在 **OpenClaw 网关稳定性、配置恢复、IM/Cowork 会话体验、退出流程优化** 等方向。  
从变更类型看，项目当前处于 **高频修复与体验打磨阶段**，尤其围绕 9 月 16 日用户反馈的问题进行连续修复。虽然没有新版本发布，但多个修复 PR 已进入关闭状态，说明维护节奏较快，短期稳定性改进明显。

---

## 2. 版本发布

过去 24 小时无新版本发布。

最新 Release 数据为空，今日暂无可供用户升级的正式版本，也没有明确的破坏性变更或迁移说明。

---

## 3. 项目进展

今日主要进展集中在 OpenClaw 稳定性修复、Cowork 体验增强和主进程退出体验优化。

### OpenClaw：遗留状态与网关稳定性修复

#### PR #2700 - fix(openclaw): initialize legacy v1 state schema before repair verification  
链接：https://github.com/netease-youdao/LobsterAI/pull/2700  
状态：Closed  
作者：fisherdaddy  

该 PR 修复了旧版 v1 数据库在审计机制引入前缺少 `audit_events` 表的问题。  
修复方式是在修复租约下先通过正常打开路径完成 schema 初始化，再执行运行时 schema 校验，避免旧数据库在修复流程中提前失败。

影响判断：

- 有助于提升旧版本用户升级或修复数据库时的成功率。
- 降低因历史状态 schema 不完整导致的一键修复失败概率。
- 属于兼容性和可靠性修复，面向已有用户较重要。

---

#### PR #2698 - fix(openclaw): safely recover stale gateway lock owners  
链接：https://github.com/netease-youdao/LobsterAI/pull/2698  
状态：Closed  
作者：btc69m979y-dotcom  

该 PR 处理了遗留网关或迁移锁仍引用存活 PID 时，手动修复被维护锁阻断的问题。  
变更在手动修复的维护屏障内先核验锁所有者，确认陈旧锁后进行恢复，再继续执行 Snapshot、Doctor、Recovery、配置同步、Plugins、网关启动与连接流程。

影响判断：

- 直接针对 9 月 16 日反馈中的网关启动/维护锁故障。
- 改善“一键修复”在复杂现场状态下的容错能力。
- 对 Windows 环境下 PID、进程身份、运行入口校验等场景尤其重要。
- 有助于降低用户遇到“网关无法启动、修复流程也被锁阻断”的严重体验问题。

---

#### PR #2695 - fix(openclaw): prevent browser DNS failures from restarting gateway  
链接：https://github.com/netease-youdao/LobsterAI/pull/2695  
状态：Closed  
作者：btc69m979y-dotcom  

该 PR 修复 Playwright 浏览器导航中的 DNS 错误逃逸出异步回调，进而导致 Gateway 退出并被 LobsterAI 重启的问题。  
修复后，导航失败会被限制在工具调用内：失效 iframe 只中止自身请求，顶层导航仍返回错误，但网关和后续正常导航可以继续运行。

影响判断：

- 解决 DNS 异常导致网关重启的问题。
- 可避免会话和 IM 被无关浏览器导航失败打断。
- 对依赖浏览器自动化、网页访问、工具调用的用户影响较大。
- 属于稳定性优先级较高的修复。

---

#### PR #2694 - fix(openclaw): guard IM workloads and observe config recovery  
链接：https://github.com/netease-youdao/LobsterAI/pull/2694  
状态：Closed  
作者：btc69m979y-dotcom  

该 PR 修复原生 IM 任务在准备或运行阶段尚未创建 ActiveTurn 时，被配置恢复逻辑误判为空闲并重启网关的问题。  
本次仅实施第一阶段：修复已复现的 IM 漏判，并新增恢复决策观察日志，但暂不接入新的执行逻辑。

影响判断：

- 直接对应 9 月 16 日反馈表第 7 行。
- 避免 IM 任务在准备期或运行中被配置恢复误杀。
- 新增观察日志说明维护者仍在收集恢复决策的数据，后续可能继续调整自动恢复策略。
- 该 PR 是稳定性修复，也释放出后续路线图信号：配置恢复机制会进一步精细化。

---

### Cowork：工作区与会话体验增强

#### PR #2696 - feat(cowork): turn workspace review, inline question dock and Tasks panel  
链接：https://github.com/netease-youdao/LobsterAI/pull/2696  
状态：Open  
作者：alison-xx  

这是今日唯一仍开放的 PR，也是最值得关注的功能型变更。  
该 PR 将下游 fork 中已使用的一组 Codex 风格 Cowork 会话工作区改进重新基于 `release/2026.9.15` 移植回主仓库，并移除了 fork 特定部分。

从标题和摘要看，核心内容包括：

- Turn workspace review
- Inline question dock
- Tasks panel
- Cowork session view 交互增强

影响判断：

- 这是明显的产品体验型迭代，目标是让 Cowork 会话更接近任务协作型工作台。
- 由于变更来自下游 fork 且已经被使用，成熟度可能高于全新实验特性。
- 若顺利合并，可能成为下一版本中 Cowork 模块的重要功能亮点。
- 涉及 `renderer`、`main`、`cowork`、`artifacts`，影响面较广，合并前需要重点关注 UI 状态管理、任务面板数据一致性和跨模块回归。

---

#### PR #2692 - feat(cowork): rotate thinking phases and show finished step count in the activity indicator  
链接：https://github.com/netease-youdao/LobsterAI/pull/2692  
状态：Closed  
作者：alison-xx  

该 PR 优化 Cowork 中模型等待阶段的活动指示器。  
原本模型未输出内容时只显示单一的 “Thinking”，容易让用户误以为系统卡住。变更后会轮换展示多个思考阶段词，并显示已完成步骤数。

影响判断：

- 改善长等待场景下的用户感知。
- 让 Cowork 执行过程更透明，降低“无响应”的误解。
- 属于轻量但高价值的交互反馈优化。
- 与 PR #2696 的工作区体验增强方向一致，说明 Cowork 正在持续打磨会话可观测性。

---

#### PR #2697 - Pr 2692  
链接：https://github.com/netease-youdao/LobsterAI/pull/2697  
状态：Closed  
作者：fisherdaddy  

该 PR 标题显示与 PR #2692 相关，但摘要为空。  
从标签看涉及 `renderer` 和 `cowork`，可能是围绕 Cowork 活动指示器变更的补充或集成调整。

影响判断：

- 由于缺少摘要和评论数据，无法判断具体修改范围。
- 需要维护者在后续 Release Note 中补充说明，避免用户无法理解该 PR 的实际作用。

---

### 主进程与退出体验优化

#### PR #2693 - fix(main): make app quit hide windows immediately and stop skill services faster  
链接：https://github.com/netease-youdao/LobsterAI/pull/2693  
状态：Closed  
作者：fisherdaddy  

该 PR 优化应用退出流程：退出时立即隐藏所有窗口，给用户即时反馈，同时避免退出过程中触发窗口创建、聚焦或重载。  
此外，对 web search skill service 的关闭逻辑从固定等待 2 秒改为轮询实际退出状态。

影响判断：

- 改善用户点击退出后的响应感。
- 降低退出期间窗口重新出现、焦点异常或 reload 的概率。
- 缩短技能服务停止耗时，提高关闭流程稳定性。
- 属于桌面端体验和资源清理质量改进。

---

### 发布流程相关

#### PR #2699 - Release/2026.9.16  
链接：https://github.com/netease-youdao/LobsterAI/pull/2699  
状态：Closed  
作者：liuzhq1986  

该 PR 标题显示与 `2026.9.16` 发布分支或发布流程有关，涉及 `renderer`、`docs`、`main`、`openclaw`、`cowork` 多个区域。  
由于摘要为空，无法进一步判断其是否为版本准备、回滚、changelog 更新或发布合并操作。

影响判断：

- 该 PR 影响范围较广，可能是一次版本线同步或发布集成。
- 尽管今日无新 Release，但该 PR 表明项目仍处于活跃的发布节奏中。
- 建议维护者补充 PR 描述或在后续 Release 中明确对应变更范围。

---

## 4. 社区热点

今日没有 Issue 更新，PR 评论数和反应数均显示为 `undefined` 或 0，因此无法从评论数量或点赞数量判断真实讨论热度。  
但从变更内容和影响面看，以下 PR 是今日最值得关注的“事实热点”。

### PR #2696 - Cowork 工作区体验增强  
链接：https://github.com/netease-youdao/LobsterAI/pull/2696  

热点原因：

- 今日唯一仍开放的 PR。
- 涉及 Cowork 会话工作区、内联问题停靠区、任务面板等较完整的产品体验升级。
- 来自下游 fork 的已使用能力，说明存在真实使用场景和回流主线的需求。
- 影响 `renderer`、`main`、`cowork`、`artifacts`，合并风险和收益都较高。

背后诉求：

- 用户希望 Cowork 不只是聊天窗口，而是可以持续审阅、追踪任务、处理问题的协作工作台。
- 长任务、多轮任务、带 artifact 的协作流程需要更清晰的信息架构。

---

### PR #2698 - 网关陈旧锁恢复  
链接：https://github.com/netease-youdao/LobsterAI/pull/2698  

热点原因：

- 直接对应 9 月 16 日用户反馈。
- 处理的是网关启动与维护锁阻断问题，属于影响可用性的关键故障。
- 涉及一键修复流程，通常是用户在异常状态下最后依赖的恢复手段。

背后诉求：

- 用户希望应用在自动更新、异常退出、进程残留等复杂状态下仍能自愈。
- 维护锁和迁移锁逻辑需要在安全性与可恢复性之间取得平衡。

---

### PR #2695 - DNS 导航失败不再重启 Gateway  
链接：https://github.com/netease-youdao/LobsterAI/pull/2695  

热点原因：

- 浏览器 DNS 失败属于常见外部环境错误，不应导致 Gateway 级别重启。
- 修复后可减少会话和 IM 被工具调用异常打断。

背后诉求：

- 用户希望工具调用失败被局部隔离，而不是扩散为全局服务重启。
- 对 agent 类应用而言，外部网页不可达、DNS 抖动、iframe 加载失败都应成为可恢复错误。

---

## 5. Bug 与稳定性

以下按严重程度和用户影响范围排序。

### 严重：网关维护锁/迁移锁阻断修复流程  
相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2698  
状态：已有修复 PR，已关闭  

问题表现：

- 遗留网关或迁移锁仍引用存活 PID。
- 一键修复可能在数据库快照阶段被维护锁阻断。
- 用户可能无法正常启动网关，也无法顺利完成修复。

修复进展：

- 在维护屏障内增加锁所有者核验。
- 对可确认的陈旧锁进行恢复。
- 再继续执行 Snapshot、Doctor、Recovery、配置同步、Plugins、网关启动与连接流程。

---

### 严重：浏览器 DNS 失败导致 Gateway 重启  
相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2695  
状态：已有修复 PR，已关闭  

问题表现：

- Playwright 浏览器导航中的 DNS 错误可能逃逸出异步回调。
- Gateway 退出后被 LobsterAI 重启。
- 会话和 IM 被中断。

修复进展：

- 将导航失败限制在工具调用内部。
- iframe 请求失败仅中止自身请求。
- 顶层导航返回错误，但不影响 Gateway 和后续正常导航。

---

### 高：IM 任务被配置恢复误判为空闲并触发网关重启  
相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2694  
状态：已有修复 PR，已关闭  

问题表现：

- 原生 IM 任务进入准备或运行阶段时可能还没有 ActiveTurn。
- 配置恢复逻辑误判当前为空闲。
- 网关被重启，导致 IM 任务被打断。

修复进展：

- 将有效 IM 生命周期和 active 轮询证据纳入自动配置重启检查。
- 新增有界 IM 工作证据跟踪。
- 本阶段只修复已复现漏判，同时观察恢复决策，不引入新的自动执行路径。

---

### 中高：旧版 v1 数据库缺少审计表导致修复校验失败  
相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2700  
状态：已有修复 PR，已关闭  

问题表现：

- 审计机制引入前的 v1 数据库缺少 `audit_events` 表。
- 运行时 schema 校验可能在初始化前失败。
- 旧用户数据库修复或升级流程可能受阻。

修复进展：

- 在修复租约下先走正常打开路径完成 schema 初始化。
- 再执行运行时 schema 检查。

---

### 中：应用退出反馈慢、技能服务固定等待  
相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2693  
状态：已有修复 PR，已关闭  

问题表现：

- 用户退出应用后窗口可能不会立即消失。
- 退出过程中仍可能触发窗口创建、聚焦或 reload。
- Web search skill service 固定等待 2 秒，效率不佳。

修复进展：

- 退出时立即隐藏窗口。
- 防止退出期间的窗口操作。
- 改为轮询技能服务实际退出状态。

---

## 6. 功能请求与路线图信号

今日没有新的 Issue，因此没有直接来自 Issue 的新功能请求。  
不过从 PR 方向可以观察到以下路线图信号。

### Cowork 正在向“任务型协作工作区”演进  
相关 PR：

- PR #2696：https://github.com/netease-youdao/LobsterAI/pull/2696  
- PR #2692：https://github.com/netease-youdao/LobsterAI/pull/2692  

判断：

- PR #2696 引入工作区审阅、内联问题 dock、Tasks panel，说明 Cowork 的定位正在从对话界面升级为任务协作界面。
- PR #2692 优化思考阶段反馈和完成步骤计数，说明维护者重视长任务执行过程中的可见性。
- 下一版本可能继续包含 Cowork 会话体验、任务追踪、活动状态展示相关改进。

---

### OpenClaw 自愈和恢复能力是短期重点  
相关 PR：

- PR #2698：https://github.com/netease-youdao/LobsterAI/pull/2698  
- PR #2695：https://github.com/netease-youdao/LobsterAI/pull/2695  
- PR #2694：https://github.com/netease-youdao/LobsterAI/pull/2694  
- PR #2700：https://github.com/netease-youdao/LobsterAI/pull/2700  

判断：

- 多个 PR 都围绕 Gateway、配置恢复、数据库修复、IM 生命周期保护展开。
- 这表明项目正在补强异常状态下的自愈能力。
- 后续版本可能继续强化诊断日志、恢复策略观察、陈旧状态清理和旧数据兼容。

---

## 7. 用户反馈摘要

今日 GitHub Issues 无更新，因此无法从 Issue 评论中提炼新的直接用户反馈。  
但多个 PR 摘要明确提到 9 月 16 日反馈，能够间接归纳出以下用户痛点。

### 痛点一：网关异常会中断核心使用流程  
相关 PR：

- PR #2698：https://github.com/netease-youdao/LobsterAI/pull/2698  
- PR #2695：https://github.com/netease-youdao/LobsterAI/pull/2695  
- PR #2694：https://github.com/netease-youdao/LobsterAI/pull/2694  

用户场景：

- 用户正在进行 IM 或会话任务。
- 浏览器工具、配置恢复或维护锁异常导致 Gateway 重启或无法启动。
- 任务被打断，且用户可能难以判断原因。

维护响应：

- 将外部错误局部化。
- 防止恢复逻辑误杀活跃任务。
- 增强陈旧锁恢复能力。

---

### 痛点二：长时间“Thinking”容易被误解为卡死  
相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2692  

用户场景：

- Cowork 或 agent 长时间处理任务但尚未输出内容。
- UI 只显示静态 Thinking，缺乏阶段变化。
- 用户无法判断系统是否仍在推进。

维护响应：

- 轮换思考阶段文案。
- 展示已完成步骤数。
- 提升长任务等待期间的可感知进度。

---

### 痛点三：退出应用时需要即时反馈  
相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2693  

用户场景：

- 用户点击退出后，窗口仍停留或出现二次聚焦/重载。
- 后台技能服务关闭耗时不确定。

维护响应：

- 退出时立即隐藏窗口。
- 加快技能服务停止过程。
- 阻止退出期间的窗口副作用。

---

## 8. 待处理积压

基于今日提供的数据，过去 24 小时没有 Issue 更新，也没有长期未响应 Issue 的列表，因此无法识别长期积压 Issue。

当前需要维护者关注的开放 PR：

### PR #2696 - feat(cowork): turn workspace review, inline question dock and Tasks panel  
链接：https://github.com/netease-youdao/LobsterAI/pull/2696  
状态：Open  
作者：alison-xx  

关注建议：

- 该 PR 是今日唯一开放项，且功能影响面较广。
- 建议重点审查：
  - Cowork 会话状态管理是否稳定；
  - Tasks panel 与 artifacts 数据是否一致；
  - 是否影响现有 renderer/main 通信；
  - 是否需要补充文档或用户引导；
  - 是否需要拆分合并，以降低回归风险。

---

## 项目健康度判断

综合今日数据，LobsterAI 当前项目健康度评估为：**活跃且偏稳定性修复驱动**。

积极信号：

- PR 活跃度高，24 小时内 9 条 PR 更新。
- 多个影响用户可用性的 OpenClaw 问题已有对应修复。
- Cowork 体验持续增强，且有来自下游 fork 的功能回流。
- 修复覆盖数据库兼容、网关恢复、IM 生命周期、退出流程等关键路径。

风险信号：

- Issue 层面今日无公开互动，真实用户反馈透明度有限。
- 多个 PR 摘要提到外部反馈表而非 GitHub Issue，问题追踪链路不够公开。
- 部分 PR 摘要为空，例如 PR #2697、PR #2699，不利于后续审计和 Release Note 整理。
- OpenClaw 相关修复密集，说明近期网关与恢复逻辑仍处于高风险打磨阶段。

总体来看，项目维护响应速度较快，今日主要推进了 **稳定性恢复能力** 和 **Cowork 产品体验** 两条主线。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报｜2026-09-18

## 1. 今日速览

过去 24 小时，Moltis 项目活跃度处于**低到中等水平**：新增/活跃 Issue 2 条，新增 PR 1 条，暂无合并、关闭或新版本发布。  
今日动态主要集中在两个方向：一是 **Nix 构建与发布产物完整性问题**，二是 **wasm-web-search 的搜索计费/预付费能力建议**。  
代码层面的推进较少，唯一新增 PR 来自 Dependabot，属于文档目录依赖升级，尚未合并。  
整体来看，项目当前健康度稳定，但发布标签可复现构建问题值得维护者优先关注，因为它直接影响用户从已发布版本构建 Moltis 的能力。

---

## 2. 项目进展

今日暂无已合并或已关闭的重要 PR，项目主干功能层面没有可确认的新推进。

### 待合并 PR

- [PR #1275 - chore(deps): bump smol-toml from 1.7.0 to 1.8.0 in /docs](https://github.com/moltis-org/moltis/pull/1275)  
  - 作者：dependabot[bot]  
  - 状态：Open  
  - 类型：依赖维护 / 文档工具链  
  - 涉及范围：`/docs` 目录下 npm/yarn 依赖组  
  - 影响分析：  
    - 该 PR 将 `smol-toml` 从 `1.7.0` 升级到 `1.8.0`。  
    - 属于常规依赖更新，不直接影响 Moltis 核心运行逻辑。  
    - 若 CI 通过，可作为低风险维护项合入。  
  - 项目推进程度：较小，主要改善文档构建链依赖新鲜度与潜在安全/兼容性维护。

---

## 3. 社区热点

今日 Issues 和 PR 均暂无评论，反应数也均为 0，因此尚未形成明显的高热讨论。不过从议题性质看，以下两个 Issue 更值得关注。

### 构建可复现性问题：Nix flake 无法构建已发布 tag

- [Issue #1273 - Nix flake cannot build the published tag: missing vendored-crate hashes and web assets](https://github.com/moltis-org/moltis/issues/1273)  
  - 作者：flexiondotorg  
  - 状态：Open  
  - 评论数：0  
  - 👍：0  
  - 诉求分析：  
    - 用户尝试基于已发布 tag `20260913.02` 构建 `packages.default`，但失败。  
    - 问题集中在两个方面：  
      1. `cargoLock.outputHashes` 未完整覆盖 vendored git crates。  
      2. Web assets 缺失，导致 Nix 构建链无法完整复现发布产物。  
    - 这反映出用户对 Moltis 的**可复现构建、Nix 支持、发布质量**有较高要求。  
  - 社区信号：  
    - 虽然目前暂无评论，但该问题对 Nix 用户、打包维护者、下游发行渠道影响较大，应优先处理。

### wasm-web-search 搜索链路的预付费/预检机制建议

- [Issue #1274 - Prepaid search hop for Moltis wasm-web-search?](https://github.com/moltis-org/moltis/issues/1274)  
  - 作者：iamalanlui  
  - 状态：Open  
  - 评论数：0  
  - 👍：0  
  - 诉求分析：  
    - 用户希望为 `moltis wasm-web-search` 引入类似 “prepaid search hop” 的能力。  
    - 该需求可能涉及搜索调用成本控制、请求预检、额度管理、付费搜索链路或代理跳转机制。  
    - 对 AI 助手类项目而言，这类能力通常与外部搜索服务成本、滥用防护、用户体验和部署商业化有关。  
  - 社区信号：  
    - 该 Issue 属于路线图型功能请求，值得维护者进一步澄清使用场景和期望接口。

---

## 4. Bug 与稳定性

### 高优先级

#### 1. 已发布 tag 的 Nix flake 构建失败

- [Issue #1273 - Nix flake cannot build the published tag: missing vendored-crate hashes and web assets](https://github.com/moltis-org/moltis/issues/1273)  
  - 严重程度：高  
  - 类型：构建失败 / 发布产物完整性 / 可复现性问题  
  - 当前状态：Open  
  - 是否已有 fix PR：暂无  
  - 影响范围：  
    - 使用 Nix 构建 Moltis 的用户。  
    - 依赖 GitHub release/tag 进行打包的下游维护者。  
    - 需要可复现构建的生产或安全敏感环境。  
  - 问题摘要：  
    - `flake.nix` 中 `packages.default` 在 tag `20260913.02` 对应 commit `6aa4881` 无法构建。  
    - `cargoLock.outputHashes` 只 pin 了 `sqlx-core-0.8.6`，但 lock 中还有其他 git crates，例如：  
      - `wacore-0.6.0`  
      - `zvec-rust-0.6.0`  
    - 同时还存在 web assets 缺失问题。  
  - 建议维护动作：  
    - 补全 `cargoLock.outputHashes`。  
    - 明确 web assets 的生成、打包或 vendoring 策略。  
    - 考虑在发布流程中加入 `nix build .#default` 校验。  
    - 若问题存在于已发布 tag，建议发布补丁版本或在 release note 中标注 workaround。

### 中低优先级

今日未发现新的运行时崩溃、数据损坏、严重回归或安全漏洞报告。

---

## 5. 功能请求与路线图信号

### wasm-web-search 的预付费搜索跳转机制

- [Issue #1274 - Prepaid search hop for Moltis wasm-web-search?](https://github.com/moltis-org/moltis/issues/1274)  
  - 类型：Enhancement  
  - 状态：Open  
  - 是否已有相关 PR：暂无  
  - 路线图信号强度：中等  
  - 可能涉及方向：  
    - 搜索请求预检。  
    - 搜索调用配额管理。  
    - 预付费搜索服务接入。  
    - wasm 环境下的搜索代理或跳转机制。  
    - 面向成本控制和滥用防护的基础设施。  
  - 纳入下一版本可能性：暂不明确  
    - 当前该 Issue 暂无维护者反馈，也没有关联实现 PR。  
    - 若维护者确认 `wasm-web-search` 是近期重点模块，该需求可能进入设计讨论。  
    - 若项目当前重点仍在稳定性和构建链修复，则该功能更可能排入后续版本。

### 依赖维护信号

- [PR #1275 - bump smol-toml from 1.7.0 to 1.8.0 in /docs](https://github.com/moltis-org/moltis/pull/1275)  
  - 类型：维护性更新  
  - 路线图意义：低  
  - 可能进入下一版本：较高  
    - 依赖更新范围较小，若自动化测试通过，通常较容易合并。  
    - 但其影响主要限于文档构建，不代表核心功能路线变化。

---

## 6. 用户反馈摘要

基于今日新增 Issues，可以提炼出以下用户痛点与使用场景。

### 用户痛点一：发布版本应当可直接构建

- 来源：[Issue #1273](https://github.com/moltis-org/moltis/issues/1273)  
- 用户场景：  
  - 用户或打包者从已发布 tag `20260913.02` 使用 Nix 构建 Moltis。  
- 不满意点：  
  - 官方发布 tag 无法通过 `nix build .#default` 构建。  
  - 缺失 vendored crate hashes 和 web assets，导致构建流程不完整。  
- 背后诉求：  
  - 发布产物需要更强的一致性与可复现性。  
  - Nix flake 应当被视为一等构建入口，而不是附属配置。  

### 用户痛点二：搜索能力需要成本与链路控制

- 来源：[Issue #1274](https://github.com/moltis-org/moltis/issues/1274)  
- 用户场景：  
  - 使用 Moltis 的 `wasm-web-search` 能力时，可能涉及第三方搜索服务或有成本的请求链路。  
- 潜在不满意点：  
  - 当前搜索调用可能缺少明确的预检、额度或付费跳转机制。  
- 背后诉求：  
  - 用户希望在搜索请求真正发生前，能够完成成本确认、额度验证或中间跳转。  
  - 这对 AI 助手应用的生产部署、商业化接入和滥用控制都很重要。

---

## 7. 待处理积压

由于本次数据仅覆盖近 24 小时，无法判断“长期未响应”的历史积压。不过今日新增/活跃事项中，以下条目建议维护者优先关注。

### 建议优先处理

1. [Issue #1273 - Nix flake cannot build the published tag](https://github.com/moltis-org/moltis/issues/1273)  
   - 原因：影响已发布版本构建，属于发布质量和稳定性问题。  
   - 建议优先级：高  
   - 建议动作：确认复现、补齐 hash 和 web assets 处理流程，并考虑补丁发布。

2. [PR #1275 - bump smol-toml from 1.7.0 to 1.8.0 in /docs](https://github.com/moltis-org/moltis/pull/1275)  
   - 原因：低风险依赖更新，适合快速处理，避免维护性 PR 堆积。  
   - 建议优先级：中低  
   - 建议动作：等待 CI，通过后合并。

3. [Issue #1274 - Prepaid search hop for Moltis wasm-web-search?](https://github.com/moltis-org/moltis/issues/1274)  
   - 原因：涉及搜索功能的产品化与成本控制，可能影响未来路线图。  
   - 建议优先级：中  
   - 建议动作：请作者补充具体使用场景、期望 API、是否涉及第三方搜索服务计费模型。

---

## 项目健康度评估

- 活跃度：低到中等  
- 稳定性风险：中等，主要来自 Nix 构建失败问题  
- 功能演进信号：较弱，但 `wasm-web-search` 方向出现新的产品化需求  
- 维护状态：有自动化依赖更新，但暂无合并动作  
- 今日总体判断：Moltis 今日没有显著功能推进，但暴露了一个较重要的发布构建问题。若维护者能快速响应 [Issue #1273](https://github.com/moltis-org/moltis/issues/1273)，将有助于提升项目发布可信度和下游打包体验。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报｜2026-09-18

## 1. 今日速览

过去 24 小时，CoPaw / QwenPaw 仓库活跃度较高：Issues 更新 10 条，其中 9 条仍处于 Open，PR 更新 14 条，其中 11 条待合并，说明社区反馈和维护侧修复都处于密集推进阶段。  
今日问题集中在 **插件隔离、事件循环阻塞、会话/历史记忆一致性、Console 启动与交互体验、MCP 兼容性** 等稳定性主题，属于影响生产可用性的高优先级问题。  
PR 侧已经出现多条针对关键缺陷的修复，例如插件同步阻塞隔离、内存召回泄漏、Console `/compact` 行为、Provider 配置与性能优化，显示维护团队响应速度较快。  
整体健康度判断：**活跃但压力较大**。项目正在从功能扩展阶段进入稳定性和工程治理加强阶段，短期内建议优先消化阻塞级 Bug 与 2.2.x 回归问题。

---

## 2. 项目进展

今日无正式新版本发布，但有 3 个 PR 进入关闭状态，另有多个关键修复 PR 仍在等待合并。

### 已关闭 / 可能已合并的重要 PR

#### 1. Console 后台工具输出改为按需流式加载  
- PR：[#7831 fix(console): stream background tool output on demand](https://github.com/agentscope-ai/QwenPaw/pull/7831)  
- 状态：Closed  
- 影响范围：Console、后台工具任务、SSE 输出流  
- 主要改进：
  - 不再提前打开后台工具输出 SSE；
  - 仅当用户展开具体任务行时才打开输出流；
  - 折叠后自动中止输出流；
  - 保留取消任务、会话清理、瞬时错误处理与终态收敛逻辑。
- 项目推进意义：降低 Console 资源占用，改善长任务、多工具调用场景下的前端性能与稳定性。

#### 2. 自定义 Provider 配置集中到单一对话框  
- PR：[#7826 feat(console): configure custom providers in one dialog](https://github.com/agentscope-ai/QwenPaw/pull/7826)  
- 状态：Closed  
- 影响范围：Console、自定义模型 Provider、用户配置体验  
- 主要改进：
  - 在一个对话框内配置 provider ID、显示名、Base URL、协议与 API Key；
  - 保存 Provider 凭据时不再自动发现或添加模型；
  - Provider 创建成功但配置失败时保留重试能力。
- 项目推进意义：提升模型接入流程的可控性，减少自动发现带来的不确定行为，为后续多 Provider 管理打基础。

#### 3. 版本号推进到 v2.2.2b2  
- PR：[#7844 chore: bump the version to v2.2.2b2](https://github.com/agentscope-ai/QwenPaw/pull/7844)  
- 状态：Closed  
- 影响范围：版本管理  
- 项目推进意义：虽然今日没有正式 Release，但版本号推进表明维护侧可能正在准备 2.2.2 beta 后续构建，预计会承载近期修复。

### 待合并但进展显著的 PR

#### 插件同步阻塞隔离与事件循环监控  
- PR：[#7842 fix(plugins): isolate synchronous hooks and add event loop lag watchdog](https://github.com/agentscope-ai/QwenPaw/pull/7842)  
- 关联 Issue：[#7840](https://github.com/agentscope-ai/QwenPaw/issues/7840)  
- 价值：直接回应“任一插件同步阻塞会冻结整个实例”的严重问题，是今日最关键的稳定性修复之一。

#### AgentScope Platform 内置 Provider  
- PR：[#7843 feat(providers): add AgentScope Platform built-in provider](https://github.com/agentscope-ai/QwenPaw/pull/7843)  
- 价值：新增 AgentScope Platform 作为 OpenAI-compatible 内置 Provider，并支持模型发现、Logo 和 API Key 获取入口，有助于降低用户接入平台模型的成本。

#### 会话列表详情与分组改进  
- PR：[#7846 feat: improve session list details and grouping](https://github.com/agentscope-ai/QwenPaw/pull/7846)  
- 价值：后端不再截断会话名，前端负责展示控制；长名称支持悬停或聚焦滚动查看，改善多会话管理体验。

#### 自动记忆召回内容不再泄漏到外部频道  
- PR：[#7835 fix(memory): stop leaking auto-memory-recall payload to channels](https://github.com/agentscope-ai/QwenPaw/pull/7835)  
- 价值：解决自动 memory recall 注入的合成 trace 被发送到非 Console 渠道的问题，涉及隐私、上下文洁净度和多渠道一致性。

---

## 3. 社区热点

### 热点 1：插件共享宿主事件循环导致全实例冻结  
- Issue：[#7840 Plugins share the host event loop](https://github.com/agentscope-ai/QwenPaw/issues/7840)  
- 状态：Open  
- 评论数：4  
- 关联修复 PR：[#7842](https://github.com/agentscope-ai/QwenPaw/pull/7842)  
- 核心诉求：
  - 插件不应与主服务无隔离地共享事件循环；
  - 同步 I/O、`time.sleep`、阻塞 socket、同步 HTTP 等行为不应冻结所有 agent、channel 和 Console；
  - 需要插件执行契约、超时监控、事件循环 lag watchdog 与隔离策略。
- 分析：这是今日最重要的稳定性讨论。用户报告一个本地插件约 40 秒同步阻塞导致整个实例不可用，说明当前插件系统缺少足够的运行时边界。该问题如果不处理，会影响云端托管、多租户和桌面端插件生态的可信度。

### 热点 2：2.2.x 会话同步与历史数据库损坏问题  
- Issue：[#7839 session-sync skips orphaned session files](https://github.com/agentscope-ai/QwenPaw/issues/7839)  
- 状态：Open  
- 评论数：1  
- 核心诉求：
  - orphaned session files 不应被静默跳过；
  - retention purge 遇到 `database disk image is malformed` 时需要更可靠的恢复流程；
  - 用户希望 history.db 损坏后仍能导入、修复或至少明确告警。
- 分析：这是典型的数据可靠性问题。对于个人 AI 助手产品，会话历史和长期记忆是核心资产，任何“历史无法恢复”“数据库损坏”都会显著削弱用户信任。

### 热点 3：Scroll 上下文裁剪导致用户请求从 live window 中丢失  
- Issue：[#7836 scroll eviction drops a user turn](https://github.com/agentscope-ai/QwenPaw/issues/7836)  
- 状态：Open  
- 评论数：1  
- 核心诉求：
  - 在工具输出密集任务中，scroll eviction 不应把用户请求连同工具输出一起驱逐出实时上下文；
  - history.db 虽然保留了记录，但 live window 丢失用户请求会影响模型继续推理。
- 分析：该问题触及 Agent 的上下文管理正确性。对于长链路工具调用，用户意图必须被稳定保留或可靠锚定，否则会出现“助手忘记任务目标”的体验问题。

### 热点 4：Desktop Console 启动早于后端准备完成  
- Issue：[#7841 Console UI loads before backend is ready](https://github.com/agentscope-ai/QwenPaw/issues/7841)  
- 状态：Open  
- 评论数：1  
- 核心诉求：
  - 启动时模型列表和插件面板不应保持空白；
  - 需要前端等待后端 readiness，或提供自动重试/刷新机制。
- 分析：这是桌面端首屏体验问题。虽然严重程度低于事件循环冻结，但会直接影响新用户对产品稳定性的第一印象。

---

## 4. Bug 与稳定性

以下按影响严重程度排序。

### P0 / 阻塞级

#### 1. 插件同步调用冻结整个实例  
- Issue：[#7840](https://github.com/agentscope-ai/QwenPaw/issues/7840)  
- 状态：Open  
- 影响版本：2.2.0、2.2.1  
- 现象：任一插件在事件循环线程执行同步 I/O，会导致所有 agent、channel、Console 冻结约 40 秒。  
- 风险：
  - 单插件故障扩大为全实例故障；
  - 云端托管环境风险更高；
  - 缺少插件执行契约与监控。
- Fix PR：已有，[#7842](https://github.com/agentscope-ai/QwenPaw/pull/7842)  
- 建议优先级：最高。建议尽快合并并加入回归测试。

### P1 / 高优先级

#### 2. 文件名包含 literal percent escape 时可能发送或预览错误文件  
- Issue：[#7847](https://github.com/agentscope-ai/QwenPaw/issues/7847)  
- 状态：Open  
- 影响版本：2.2.2b1，相关实现至 `290014d` 未变  
- 现象：本地文件名包含 `%` 转义序列时，发送或预览可能静默选择另一个文件。  
- 风险：
  - 用户可能误发敏感文件；
  - 文件预览与实际发送不一致，属于安全与信任问题。
- Fix PR：暂无明确关联  
- 建议优先级：高。建议加入路径规范化、URL decode 边界测试与发送前校验。

#### 3. session-sync 跳过孤立会话文件，retention purge 仍因数据库损坏失败  
- Issue：[#7839](https://github.com/agentscope-ai/QwenPaw/issues/7839)  
- 状态：Open  
- 影响版本：2.2.x  
- 现象：
  - 启动时跳过 86 个 orphaned session files；
  - retention purge 报 `database disk image is malformed`；
  - 历史数据未被导入。
- Fix PR：暂无明确关联  
- 建议优先级：高。建议提供数据修复工具、损坏库隔离、导入报告和自动备份恢复流程。

#### 4. Scroll eviction 在工具密集 span 中丢失用户 turn  
- Issue：[#7836](https://github.com/agentscope-ai/QwenPaw/issues/7836)  
- 状态：Open  
- 影响版本：2.2.x，默认 `strategy=scroll`  
- 现象：工具输出被驱逐时，夹在其中的用户请求也从 live window 丢失。  
- Fix PR：暂无明确关联  
- 建议优先级：高。用户 turn 应被视为高价值锚点，不应与工具噪声同权驱逐。

#### 5. user rows 没有 headline，导致 eviction index 需要调用模型补标签  
- Issue：[#7837](https://github.com/agentscope-ai/QwenPaw/issues/7837)  
- 状态：Open  
- 影响版本：2.2.x  
- 现象：assistant rows 有 headline，但 user rows 没有，导致被驱逐用户请求无法稳定锚定。  
- Fix PR：暂无明确关联  
- 建议优先级：高。与 #7836 同属上下文/历史索引可靠性问题，建议统一设计。

### P2 / 中优先级

#### 6. Desktop Console 启动时 UI 早于后端 ready，模型和插件面板空白  
- Issue：[#7841](https://github.com/agentscope-ai/QwenPaw/issues/7841)  
- 状态：Open  
- 影响版本：Desktop 2.2.1，Windows 11 / WebView2  
- Fix PR：暂无明确关联  
- 建议：增加后端 readiness gate、前端自动重试和明确 loading/error 状态。

#### 7. `recall_history_python` 在无 sandbox 环境下静默不注册  
- Issue：[#7838](https://github.com/agentscope-ai/QwenPaw/issues/7838)  
- 状态：Open  
- 环境：Linux kernel 5.10，无 Landlock  
- 现象：仅注册结构化 `recall_history`，高级 `recall_history_python` 不可用。  
- Fix PR：暂无明确关联  
- 分析：严格来说该 Issue 标为 Feature，但用户感知更接近能力缺失或降级不可见。建议显式告警并提供替代方案。

#### 8. MCP `server/discover` 返回裸 HTTP 500 时未判定为旧协议证据  
- Issue：[#7827](https://github.com/agentscope-ai/QwenPaw/issues/7827)  
- 状态：Open  
- 影响版本：2.2.1、2.2.0  
- 场景：DashScope / 千问 AI 平台 MCP 商店 streamable_http 驱动卡无法激活，本地 Console 报 503。  
- Fix PR：暂无明确关联  
- 建议：扩展协议探测兼容性，将空响应体 500 纳入旧协议/异常服务识别路径。

### 已有修复推进中的稳定性相关 PR

- [#7835 fix(memory): stop leaking auto-memory-recall payload to channels](https://github.com/agentscope-ai/QwenPaw/pull/7835)  
  解决自动记忆召回 trace 泄漏到外部 channel 的问题。

- [#7834 fix(console): send /compact on the current chat instead of opening a new session](https://github.com/agentscope-ai/QwenPaw/pull/7834)  
  修复点击 Compact 时可能打开新会话的问题。

- [#7833 fix(hub): correct local runtime CLI, PawApp access and model defaults](https://github.com/agentscope-ai/QwenPaw/pull/7833)  
  修复 Local runtime CLI、PawApp 浏览器授权和 Hub 模型默认值问题。

- [#7832 fix(providers): make the context-window override explicit](https://github.com/agentscope-ai/QwenPaw/pull/7832)  
  修复模型设置中 Max Context Length 展示与运行时实际解析不一致的问题。

- [#7825 fix(crons): expand numeric DOW steps/ranges to crontab weekday names](https://github.com/agentscope-ai/QwenPaw/pull/7825)  
  修复 APScheduler ISO 星期与 crontab 星期语义不一致的问题。

- [#7824 fix(loop): let IterationGate leave AgentScope finalization slot](https://github.com/agentscope-ai/QwenPaw/pull/7824)  
  修复 IterationGate 在 `max_iters` 边界处阻止 AgentScope finalization 的问题。

---

## 5. 功能请求与路线图信号

### 1. OS 桌面模式支持注册自定义应用  
- Issue：[#7830 [Feature]: os桌面模式下 注册自己应用](https://github.com/agentscope-ai/QwenPaw/issues/7830)  
- 状态：Open  
- 用户诉求：在 `/os` 桌面模式下开放接口和标准，使用户可以注册自己的应用。  
- 路线图信号：
  - 这反映出用户希望 CoPaw 不只是调用内置桌面能力，而是成为可扩展的桌面自动化平台；
  - 如果与插件系统、应用注册协议、权限模型结合，可能形成桌面 Agent 的生态入口。
- 纳入下一版本可能性：中等。需求清晰，但需要接口规范、安全授权和 UI 管理能力，可能不会作为短平快修复进入 beta 小版本。

### 2. AgentScope Platform 作为内置 Provider  
- PR：[#7843](https://github.com/agentscope-ai/QwenPaw/pull/7843)  
- 状态：Open  
- 路线图信号：
  - 项目正在加强内置模型服务接入；
  - 通过默认 Base URL、模型发现、Logo、API Key 链接降低配置门槛。
- 纳入下一版本可能性：高。已有实现 PR，且与 Provider 体验改进方向一致。

### 3. 自定义 Provider 管理体验持续增强  
- 已关闭 PR：[#7826](https://github.com/agentscope-ai/QwenPaw/pull/7826)  
- 相关 PR：[#7832](https://github.com/agentscope-ai/QwenPaw/pull/7832)、[#7843](https://github.com/agentscope-ai/QwenPaw/pull/7843)  
- 路线图信号：
  - Provider 配置、上下文窗口覆盖、模型发现正在成为近期重点；
  - 用户需要更透明、更可控的模型连接与参数解析。

### 4. 会话列表与历史管理体验增强  
- PR：[#7846](https://github.com/agentscope-ai/QwenPaw/pull/7846)  
- 相关 Issue：[#7839](https://github.com/agentscope-ai/QwenPaw/issues/7839)、[#7836](https://github.com/agentscope-ai/QwenPaw/issues/7836)、[#7837](https://github.com/agentscope-ai/QwenPaw/issues/7837)  
- 路线图信号：
  - 前端会话列表正在优化展示；
  - 但底层历史同步、数据库修复、上下文驱逐策略仍需补强。
- 纳入下一版本可能性：前端展示类改进较高，底层历史可靠性修复取决于维护优先级。

### 5. Console 性能优化  
- PR：[#7829 perf(console): split chat dependencies and lazy-load locales](https://github.com/agentscope-ai/QwenPaw/pull/7829)  
- 状态：Open  
- 主要方向：
  - 拆分 `@agentscope-ai/chat` 到单独 bundle；
  - 避免 Markdown 渲染资源进入初始加载；
  - 非英语 locales 改为懒加载。
- 纳入下一版本可能性：较高。该 PR 属于低风险性能优化，有助于改善首屏加载体验。

---

## 6. 用户反馈摘要

### 真实痛点 1：插件生态缺少运行时隔离，用户担心“一插件拖垮全局”
- 来源：[#7840](https://github.com/agentscope-ai/QwenPaw/issues/7840)  
- 用户场景：用户在托管云环境和 Docker 容器中安装本地插件，插件同步 I/O 阻塞事件循环，导致全实例冻结。  
- 不满意点：
  - 缺少插件同步阻塞检测；
  - 缺少插件执行契约；
  - 缺少隔离和降级策略。
- 用户期待：插件可以失败，但不能拖垮整个 CoPaw 实例。

### 真实痛点 2：历史记录和上下文管理不够可靠
- 来源：[#7839](https://github.com/agentscope-ai/QwenPaw/issues/7839)、[#7836](https://github.com/agentscope-ai/QwenPaw/issues/7836)、[#7837](https://github.com/agentscope-ai/QwenPaw/issues/7837)  
- 用户场景：长任务、工具密集任务、历史会话恢复。  
- 不满意点：
  - orphaned session files 被跳过；
  - history.db 损坏后恢复不明确；
  - scroll eviction 可能把用户请求移出 live context；
  - user turn 缺少 headline，无法稳定建立检索锚点。
- 用户期待：长期记忆、历史会话和实时上下文应具备一致、可解释、可恢复的行为。

### 真实痛点 3：Console / Desktop 启动和交互存在状态同步问题
- 来源：[#7841](https://github.com/agentscope-ai/QwenPaw/issues/7841)、[#7834](https://github.com/agentscope-ai/QwenPaw/pull/7834)  
- 用户场景：桌面端启动、点击 Compact、管理模型和插件。  
- 不满意点：
  - 后端未 ready 时前端已渲染，导致模型列表和插件面板空白；
  - 某些操作没有携带当前 chat identity，可能打开新会话。
- 用户期待：Console 操作应具备稳定的会话上下文和明确的加载状态。

### 真实痛点 4：外部生态接入仍有协议兼容问题
- 来源：[#7827](https://github.com/agentscope-ai/QwenPaw/issues/7827)、[#7843](https://github.com/agentscope-ai/QwenPaw/pull/7843)、[#7826](https://github.com/agentscope-ai/QwenPaw/pull/7826)  
- 用户场景：接入 DashScope MCP 商店、AgentScope Platform、自定义 Provider。  
- 不满意点：
  - MCP streamable_http 对异常 discover 响应兼容不足；
  - Provider 配置和上下文窗口覆盖逻辑需要更透明。
- 用户期待：外部模型和工具服务应易接入、可诊断、失败原因明确。

### 真实痛点 5：文件选择与预览必须绝对可信
- 来源：[#7847](https://github.com/agentscope-ai/QwenPaw/issues/7847)  
- 用户场景：发送或预览本地文件，文件名中包含 `%` 字符。  
- 不满意点：预览或发送的文件可能不是用户选择的文件。  
- 用户期待：文件路径解析必须严格，不能发生静默替换或误发。

---

## 7. 待处理积压

基于今日数据，未发现“长期未响应”的历史积压项；但以下 Open 项目具有较高优先级，建议维护者尽快分配 owner、打标签并明确处理窗口。

### 高优先级待处理 Issue

1. [#7847 Literal percent filenames can send or preview a different file](https://github.com/agentscope-ai/QwenPaw/issues/7847)  
   - 原因：潜在误发文件风险，涉及安全和用户信任。  
   - 当前状态：Open，暂无明确 fix PR。

2. [#7839 session-sync skips orphaned session files](https://github.com/agentscope-ai/QwenPaw/issues/7839)  
   - 原因：历史数据恢复与数据库损坏问题。  
   - 当前状态：Open，暂无明确 fix PR。

3. [#7836 scroll eviction drops a user turn](https://github.com/agentscope-ai/QwenPaw/issues/7836)  
   - 原因：上下文管理错误可能直接影响 Agent 推理正确性。  
   - 当前状态：Open，暂无明确 fix PR。

4. [#7837 user rows carry no headline](https://github.com/agentscope-ai/QwenPaw/issues/7837)  
   - 原因：与 scroll eviction、历史索引锚定强相关。  
   - 当前状态：Open，暂无明确 fix PR。

5. [#7827 MCP streamable_http 驱动卡无法激活](https://github.com/agentscope-ai/QwenPaw/issues/7827)  
   - 原因：影响 DashScope / 千问 MCP 商店接入。  
   - 当前状态：Open，暂无明确 fix PR。

6. [#7841 Desktop Console startup readiness issue](https://github.com/agentscope-ai/QwenPaw/issues/7841)  
   - 原因：影响桌面端首屏体验和可用性。  
   - 当前状态：Open，暂无明确 fix PR。

### 高优先级待合并 PR

1. [#7842 fix(plugins): isolate synchronous hooks and add event loop lag watchdog](https://github.com/agentscope-ai/QwenPaw/pull/7842)  
   - 建议：作为 P0 稳定性修复优先 review。

2. [#7835 fix(memory): stop leaking auto-memory-recall payload to channels](https://github.com/agentscope-ai/QwenPaw/pull/7835)  
   - 建议：重点关注多 channel 隐私与上下文污染测试。

3. [#7834 fix(console): send /compact on the current chat instead of opening a new session](https://github.com/agentscope-ai/QwenPaw/pull/7834)  
   - 建议：尽快合并，避免用户在整理上下文时误开新会话。

4. [#7832 fix(providers): make the context-window override explicit](https://github.com/agentscope-ai/QwenPaw/pull/7832)  
   - 建议：与 Provider 配置体验改进一起进入下个 beta。

5. [#7824 fix(loop): let IterationGate leave AgentScope finalization slot](https://github.com/agentscope-ai/QwenPaw/pull/7824)  
   - 建议：关注 Agent loop 边界条件，补充 max_iters 回归测试。

---

## 总体判断

今日 CoPaw 项目处于 **高活跃、高修复压力** 状态。维护侧正在快速推进 Console、Provider、插件和运行时循环相关修复，但 Issues 暴露出的核心问题说明 2.2.x 仍存在若干稳定性短板，尤其是插件隔离、历史数据可靠性、上下文驱逐策略和文件路径安全。  
建议下一步优先合并 [#7842](https://github.com/agentscope-ai/QwenPaw/pull/7842) 等阻塞级修复，并将 [#7847](https://github.com/agentscope-ai/QwenPaw/issues/7847)、[#7839](https://github.com/agentscope-ai/QwenPaw/issues/7839)、[#7836](https://github.com/agentscope-ai/QwenPaw/issues/7836) 列入 2.2.2 beta 后续版本的重点修复清单。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报  
**日期：2026-09-18**  
**仓库：** [qhkm/zeptoclaw](https://github.com/qhkm/zeptoclaw)

---

## 1. 今日速览

过去 24 小时 ZeptoClaw 活跃度中等偏高，主要集中在 **工具调用兼容性**、**本地/严格模型后端适配**、以及 **CI 策略调整** 三个方向。今日共有 **3 条 Issue 更新**，其中 **1 条仍开放、2 条已关闭**；共有 **2 条 PR 更新**，均已关闭或完成处理。项目没有发布新版本，但功能侧出现了较明确的路线图信号：增强 local / ollama 等边缘运行时下的 tool calling 稳定性。整体看，维护者响应速度较快，但 CI 移除也意味着后续质量保障将更依赖本地验证和人工审查。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

### 重要 PR

#### #701 feat(providers): sanitize tool schemas and coerce model tool-args for strict/local backends  
链接：[PR #701](https://github.com/qhkm/zeptoclaw/pull/701)  
状态：Closed  
关联方向：工具调用、Providers、本地模型兼容性

该 PR 聚焦 ZeptoClaw 在 local / ollama 等 provider 场景下的工具调用可靠性，主要包括：

- **Outbound schema sanitization**：  
  `ToolRegistry::definitions*()` 路径在向 provider 发送工具定义前，会对工具 JSON Schema 进行清洗。
- **MCP / Plugin schema 处理调整**：  
  外部 MCP server 的 `input_schema` 与插件 schema 保持原样返回，再由统一工具 schema sanitization 层处理。
- **Inbound tool args coercion**：  
  针对较弱本地模型或严格后端，增加模型生成 tool arguments 后的容错与类型修正能力。

这项工作直接回应了 [Issue #698](https://github.com/qhkm/zeptoclaw/issues/698) 中提出的问题：ZeptoClaw 作为 edge runtime，需要更强的工具调用健壮性。若该 PR 已实际合入主干，则对下一版本的稳定性和本地模型可用性提升明显；若只是关闭未合并，则仍需确认该能力是否已进入代码基线。

---

#### #700 chore(ci): remove GitHub Actions CI checks  
链接：[PR #700](https://github.com/qhkm/zeptoclaw/pull/700)  
状态：Closed  
关联 Issue：[Issue #699](https://github.com/qhkm/zeptoclaw/issues/699)  
关联方向：CI、项目流程、安全验证策略

该 PR 按用户明确要求移除了 GitHub Actions CI 检查，包括：

- 删除 CI、E2E、PR Hygiene 等工作流；
- 移除 README 中的 CI badge；
- 更新 agent / contributor guidance，要求在请求合并审批时提供本地验证结果；
- 保留 tag-triggered release 与 Docker publishing 相关流程。

这项调整对项目流程影响较大。短期看，它降低了仓库自动化检查成本和 CI 噪音；但中长期看，代码质量、安全审计、回归检测将更依赖维护者本地执行验证命令并如实提交结果。对于一个涉及 provider、工具调用、MCP、Rust 依赖安全的项目而言，后续需要更严格的本地验证规范来抵消 CI 移除带来的风险。

---

## 4. 社区热点

今日数据中所有 Issue / PR 的评论数与反应数均为 0，说明讨论热度不高，更多是维护者或自动化驱动的直接变更。但从议题重要性看，以下内容值得关注：

### #698 feat(providers): sanitize tool JSON schemas + coerce model tool-args for strict/local backends  
链接：[Issue #698](https://github.com/qhkm/zeptoclaw/issues/698)  
状态：Open  
标签：`feat`, `area:tools`, `area:providers`, `P2-high`

这是今日最有路线图意义的 Issue。它指出 ZeptoClaw 当前在工具调用链路上缺少两层防护：

1. **Outbound**：发送给 provider 的 tool JSON Schema 未经过充分校验与清洗；
2. **Inbound**：模型返回的 tool arguments 缺少类型纠正、容错和结构化处理。

背后诉求很明确：ZeptoClaw 若要定位为 edge runtime，就必须适配更不稳定的本地模型输出，以及更严格的 provider schema 要求。该 Issue 与 [PR #701](https://github.com/qhkm/zeptoclaw/pull/701) 高度相关，可能代表下一阶段 provider 抽象和工具系统稳定性建设的重点。

---

### #699 chore(ci): remove GitHub Actions CI checks  
链接：[Issue #699](https://github.com/qhkm/zeptoclaw/issues/699)  
状态：Closed  
标签：`chore`, `area:safety`, `P2-high`

该 Issue 热度数据不高，但决策影响很大。移除 GitHub Actions CI 检查反映出项目对自动化验证流程进行了主动收缩，可能出于成本、权限、用户偏好或仓库维护策略考虑。后续社区关注点可能会转向：

- PR 是否必须附带本地测试输出；
- 安全审计如何保证持续执行；
- 依赖升级和多平台兼容性是否会更容易遗漏。

---

## 5. Bug 与稳定性

### 高优先级：Rustls 安全公告修复  
#### #697 fix(deps): patch Rustls advisory RUSTSEC-2026-0285  
链接：[Issue #697](https://github.com/qhkm/zeptoclaw/issues/697)  
状态：Closed  
标签：`bug`, `area:safety`, `P2-high`

该 Issue 指出当前 18 个 Dependabot PR 均因安全审计与 Cargo deny 失败，原因是 `Cargo.lock` 解析到了受影响的 Rustls `0.23.39`。同时，已有 PR #692 提议的 `0.23.43` 仍受影响，因此需要升级到 Rustls `0.23.45` 或更高版本。

稳定性影响：

- 涉及 Rust 依赖安全；
- 会阻塞 Dependabot 依赖更新；
- 影响 `cargo deny` 与安全审计基线；
- 属于安全修复型 Bug，而非普通功能缺陷。

当前状态为 Closed，说明维护侧可能已完成处理或关闭该追踪项。但在今日提供的数据中未看到对应修复 PR，因此建议维护者确认：

- `Cargo.lock` 是否已锁定到 Rustls `0.23.45+`；
- `cargo deny` 是否重新通过；
- 文档中的 dependency audit baseline 是否已同步更新。

---

## 6. 功能请求与路线图信号

### 本地模型与严格 provider 的工具调用增强  
#### #698 feat(providers): sanitize tool JSON schemas + coerce model tool-args for strict/local backends  
链接：[Issue #698](https://github.com/qhkm/zeptoclaw/issues/698)  
状态：Open  
关联 PR：[PR #701](https://github.com/qhkm/zeptoclaw/pull/701)

这是今日最清晰的功能路线图信号。需求背景是 ZeptoClaw 支持 `ollama` / `local` providers，并强调边缘运行时场景，但本地模型在 tool calling 上常见问题包括：

- 输出 JSON 不稳定；
- 参数类型不符合 schema；
- 本地模型忽略 required fields；
- 严格 provider 拒绝不兼容 schema；
- MCP 或 plugin 暴露的 schema 复杂度过高，导致 provider 无法接受。

[PR #701](https://github.com/qhkm/zeptoclaw/pull/701) 已经围绕该 Issue 提供实现路径，因此该功能很可能进入近期版本或已进入主干。若后续继续推进，建议路线图关注：

- tool schema sanitization 的兼容性测试矩阵；
- 不同 provider 对 JSON Schema 支持差异的文档化；
- tool arguments coercion 的安全边界；
- 对 MCP 外部工具 schema 的失败降级策略；
- 本地模型调用工具失败时的可观测性日志。

---

## 7. 用户反馈摘要

今日 Issue 与 PR 均没有评论和 reaction，因此没有可直接提炼的社区讨论型反馈。但从 Issue 内容本身可以归纳出以下真实痛点：

1. **本地模型 tool calling 不可靠**  
   来源：[Issue #698](https://github.com/qhkm/zeptoclaw/issues/698)  
   用户或维护者关注的是 ZeptoClaw 在弱模型、本地模型、严格 provider 下的实际可用性。核心痛点不是“是否支持工具调用”，而是“工具调用在真实后端上是否稳定”。

2. **Schema 兼容性成为 provider 集成瓶颈**  
   来源：[Issue #698](https://github.com/qhkm/zeptoclaw/issues/698)  
   MCP、plugins 与 provider 之间的 JSON Schema 差异可能导致请求失败。用户希望框架层统一清洗和兼容，而不是让每个工具或 provider 自行处理。

3. **CI 策略存在明确偏好变化**  
   来源：[Issue #699](https://github.com/qhkm/zeptoclaw/issues/699)、[PR #700](https://github.com/qhkm/zeptoclaw/pull/700)  
   用户明确要求移除 GitHub Actions CI checks，说明项目维护流程中存在对自动化检查的负担感或策略调整需求。但这也带来新的不确定性：贡献者需要承担更多本地验证责任。

4. **依赖安全仍是项目稳定性的关键压力点**  
   来源：[Issue #697](https://github.com/qhkm/zeptoclaw/issues/697)  
   Rustls 安全公告影响 Dependabot PR 和 `cargo deny`，说明依赖安全链路对项目交付节奏有直接影响。

---

## 8. 待处理积压

基于过去 24 小时数据，未发现长期未响应的 Issue 或 PR。当前仍需维护者关注的主要是以下开放项：

### #698 feat(providers): sanitize tool JSON schemas + coerce model tool-args for strict/local backends  
链接：[Issue #698](https://github.com/qhkm/zeptoclaw/issues/698)  
状态：Open  
优先级：P2-high

虽然已有 [PR #701](https://github.com/qhkm/zeptoclaw/pull/701) 处理相关方向，但 Issue 仍显示为 Open。建议维护者确认：

- PR #701 是否已合并到目标分支；
- Issue #698 是否可以关闭；
- 是否还存在未完成的边界场景，例如 nested schema、enum coercion、nullable fields、MCP schema passthrough 等；
- 是否需要补充文档与测试用例。

---

## 健康度评估

今日 ZeptoClaw 的维护响应较快，P2-high 级别的安全、CI 和 provider/tooling 问题均在短时间内得到处理或推进。功能演进方面，项目明显在强化本地模型与工具调用链路，符合其 edge runtime 定位。主要风险在于 GitHub Actions CI checks 被移除后，自动化质量门禁变弱；后续项目健康度将更依赖本地验证纪律、依赖审计流程和维护者审查质量。总体判断：**项目活跃、方向明确，但质量保障机制正在从自动化 CI 转向人工与本地验证，需要持续观察。**

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报（2026-09-18）

## 1. 今日速览

过去 24 小时，ZeroClaw 保持较高开发活跃度：Issues 更新 5 条，PR 更新 12 条，其中仍有 9 个 PR 待合并，说明维护焦点集中在修复、文档完善、运行时安全与 provider 兼容性上。今日没有新版本发布，项目处于持续迭代与稳定性修复阶段。  
从内容看，Anthropic signed reasoning、工具附件处理、子 Agent 工具审批、Telegram/Mattermost 通道能力是当前主要推进方向。Bug 侧集中在运行时预算提醒、配置刷新、并发测试 flaky、channel scope key 冲突等问题，整体严重度多为 S2，属于“功能退化/行为不符合预期”，尚未看到大面积阻断性故障。  
项目健康度整体良好：问题被快速定位，并且多个 Issue 已有对应修复 PR，但待合并队列较长，维护者需要关注高风险、大体量 PR 的 review 与落地节奏。

---

## 2. 项目进展

### 已关闭 / 完成的 PR

#### PR #10943：修复配置参考文档中的 rustdoc intra-doc 链接问题  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10943  
状态：Closed  
标签：`config`, `risk:low`, `size:S`

该 PR 针对 `master` 分支 Docs Deploy 连续失败的问题，移除或规避配置参考文档中的 rustdoc 内部链接，例如 `crate::pairing::PairingGuard` 等无法被 mdBook 正确解析的链接。  
影响：  
- 修复文档部署流水线持续失败的问题。  
- 属于低风险、小体量修复。  
- 对用户运行时行为无影响，但提升了文档站点可用性和发布可靠性。

#### PR #10940：修复 Windows 平台 shell dialect 测试断言  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10940  
状态：Closed  
标签：`config`, `runtime`, `security:policy`, `tool:shell`, `type:test`

该 PR 修复了 nightly Windows 平台任务中的 4 个 dialect-classification 测试失败问题，并增加了 WindowsCmd 方言在设备路径和路径差异上的覆盖。  
影响：  
- 恢复 Windows CI 稳定性。  
- 仅修改测试，不改变生产行为。  
- 对跨平台 shell policy 的长期稳定性有正面作用。

#### PR #10936：恢复并记录 `nix run` 安装路径  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10936  
状态：Closed  
标签：`bug`, `ci`, `docs`, `scripts`, `risk:medium`, `size:S`

该 PR 移除了过时的 Git dependency hash，修复 Nix evaluation 因遗留 hash entries 失败的问题，并补充了安装路径文档。  
影响：  
- 改善 Nix 用户的安装体验。  
- 修复 CI / packaging 相关问题。  
- 对使用 Nix 管理 ZeroClaw 的开发者和部署者较重要。

### 今日待合并的重要进展

#### PR #10953：保持 Anthropic signed reasoning 不被 seam sanitizers 改写  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10953  
关联 Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/10952  
标签：`bug`, `agent`, `provider`, `runtime`, `provider:anthropic`, `risk:medium`, `size:M`

该 PR 直接响应 Anthropic provider 的 signed reasoning replay 问题。当前 sanitizer 会把 assistant tool-call envelope 当作整段字符串重写，导致 Anthropic 拒绝重放的 thinking。  
这是今日最关键的 provider 兼容性修复之一，建议优先 review。

#### PR #10937：强制执行 bounded child tool approvals  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10937  
标签：`bug`, `agent`, `runtime`, `tool:delegate`, `domain:security`, `risk:high`

该 PR 为 bounded agentic child loops 引入新的非交互式 approval manager，避免子 Agent 在继承工具能力时绕过预期审批边界。  
影响范围涉及运行时安全与 delegate 工具，风险高但价值也高，是安全边界收紧的重要工作。

#### PR #10944：支持从 pinned well-known discovery indexes 安装 skills  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10944  
标签：`enhancement`, `skills`, `cli`, `risk:high`, `size:XL`

新增 `zeroclaw skills install https://example.com --well-known --skill code-review` 类型的安装路径，并要求显式选择 skill 名称，避免一次性安装索引中的所有技能。  
这是一个明显的路线图信号：ZeroClaw 正在扩展 skills 分发与发现机制，但该 PR 体量和风险都较高，需要重点审查安全模型、schema 兼容性和供应链风险。

#### PR #10946：Mattermost channel purpose 注入系统提示词  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10946  
标签：`channel`, `mattermost`, `config`, `runtime`, `size:L`

该 PR 允许将 Mattermost 房间的 channel purpose 注入 Agent system prompt，并通过 `purpose_as_instructions` 按 alias opt-in。  
它体现出 ZeroClaw 对企业协作场景的增强：让 Agent 更理解频道上下文、规则和用途。

---

## 3. 社区热点

今日讨论量整体不高，大多数 Issue 评论数为 0，唯一有评论的 Issue 是已关闭的 flaky 测试问题。社区热点更多体现在 PR 数量和问题紧急度，而不是评论互动量。

### Issue #10939：并发运行时测试 flaky  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10939  
状态：Closed  
评论数：1  
标签：`bug`, `duplicate`

`telegram::tests::media_group_stays_pending_when_a_later_unsupported_member_follows_an_ordinary_update` 在 Parallel Runtime Test job 中间歇性失败。  
诉求分析：  
- 维护者和贡献者关注 CI 稳定性，尤其是并发运行时 gate。  
- Flaky test 会降低 PR 合并信心，增加维护成本。  
- 该 Issue 已关闭且标记 duplicate，说明相关问题可能已有主线追踪。

### PR #10953 / Issue #10952：Anthropic signed reasoning 被 sanitizer 改写  
PR：https://github.com/zeroclaw-labs/zeroclaw/pull/10953  
Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/10952  

这是今日最具实际影响的问题组合。用户场景是 native tool call 的 assistant history 中包含 JSON envelope，而 sanitizer 对整段 history message 做图像/音频 marker 重写，破坏了 Anthropic signed reasoning 的完整性。  
背后诉求：  
- Provider-specific signed content 需要在历史重放中保持字节级或语义级完整。  
- 多模态 marker 清洗逻辑不能跨越 provider 协议边界。  
- ZeroClaw 的 provider 抽象层需要更精细地区分“可清洗文本”和“受签名保护结构”。

### PR #10937：子 Agent 工具审批边界  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10937  

虽然暂无评论数据，但其 `domain:security` 与 `risk:high` 标签显示该 PR 重要性较高。它反映出社区/维护者对 agentic child loops 中工具权限继承的安全担忧。

---

## 4. Bug 与稳定性

按严重程度和潜在影响排序如下。

### S2：Anthropic signed reasoning 被 sanitizer 改写，导致 replay thinking 被拒绝  
Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/10952  
Fix PR：https://github.com/zeroclaw-labs/zeroclaw/pull/10953  
状态：Issue Open，Fix PR Open  
影响组件：`provider`, `runtime`, `provider:anthropic`

问题描述：  
`multimodal::sanitize_image_markers` 与 `sanitize_audio_markers` 会把 history message 作为完整字符串重写。对于 assistant native tool call，其内容是包含 `content`, `tool_calls`, `reasoning_content` 的 JSON envelope。改写后 signed reasoning 不再保持原样，Anthropic 拒绝重放。

影响：  
- Anthropic provider 的工具调用历史重放可能失败。  
- 对依赖 thinking / reasoning_content 的场景影响较大。  
- 已有中等风险修复 PR，建议优先处理。

### S2：ZeroCode Config 保存后重复刷新字段列表  
Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/10951  
状态：Open  
影响组件：`zerocode/tui`

问题描述：  
保存 scalar、multiline 或 choice field 后，ZeroCode Config 会连续发起两次相同 prefix 的 `config/list` 请求。每次请求都需要 clone 配置并枚举完整属性列表。

影响：  
- 造成不必要的性能开销。  
- 对大型配置或远程 daemon 场景可能放大延迟。  
- 暂未看到对应 fix PR。

### S2：`cost.warn_at_percent` 预算警告未被 runtime 使用  
Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/10950  
状态：Open  
影响组件：`runtime/daemon`

问题描述：  
即便配置了 `cost.warn_at_percent`，ZeroCode 中也没有出现预算警告。报告者通过源码检查指出 `CostTracker::check...` 相关逻辑存在具体缺口。

影响：  
- 成本预算提醒失效。  
- 对长会话、高调用量、多 provider 使用场景影响明显。  
- 可能导致用户在接近预算上限前没有足够提示。  
- 暂未看到对应 fix PR。

### S2：interruption-scope key 跨组件边界碰撞  
Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/10948  
状态：Open  
影响组件：`channel`

问题描述：  
`interruption_scope_key` 未能唯一编码 conversation 的 component tuple。Sender variant 中，通过对各组件内的下划线加倍再用 `_` 连接，仍然可能产生边界歧义，导致 key 碰撞。

影响：  
- 不同组件边界下的 interruption scope 可能误判为同一 key。  
- 对多 channel、多 sender、多 conversation 的并发或复杂部署存在潜在稳定性风险。  
- 暂未看到对应 fix PR。

### Flaky：Telegram media group 并发测试不稳定  
Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/10939  
状态：Closed，Duplicate  
影响组件：`channel`

问题描述：  
Telegram media group 相关测试在 parallel runtime gate 下间歇性失败。  
影响：  
- 主要影响 CI 信号质量。  
- Issue 已关闭为 duplicate，建议继续关注对应主 Issue 或修复分支。

---

## 5. 功能请求与路线图信号

### Skills 安装与分发机制正在增强  
PR：https://github.com/zeroclaw-labs/zeroclaw/pull/10944  

`zeroclaw skills install --well-known --skill ...` 表明 ZeroClaw 正在推进 skills ecosystem 的标准化发现与安装。  
可能纳入下一版本的信号：  
- 已有完整 PR。  
- 涉及 CLI、tests、docs。  
- 但标记 `risk:high`、`size:XL`，合并前可能需要较长 review 周期。  
判断：有机会进入后续版本，但不一定是最近一个 patch 版本。

### Mattermost 上下文注入能力  
PR：https://github.com/zeroclaw-labs/zeroclaw/pull/10946  

通过 `purpose_as_instructions` 将 Mattermost channel purpose 注入 system prompt，适合团队协作、频道规则和上下文增强。  
判断：该功能体量为 L，但实现边界相对清晰，若 review 顺利，较可能进入下一轮功能发布。

### 工具附件显式声明，替代扫描 tool text 中的 image markers  
PR：https://github.com/zeroclaw-labs/zeroclaw/pull/10938  

该 PR 试图从根源上减少通过文本扫描识别工具图像附件的脆弱性，改为显式声明 tool attachments。  
影响范围横跨 agent、channel、provider、runtime、browser、MCP 等多个模块。  
判断：这是架构层面的清理方向，长期价值高，但 size:XL 且依赖/堆叠于其他 PR，短期合并不确定。

### Provider 文档持续补齐  
PR：https://github.com/zeroclaw-labs/zeroclaw/pull/10945  

新增 Astra API 与 Codex setup guidance，说明项目正在扩展 provider 接入文档，并明确 provider limits 与 runtime budgets 的区别。  
判断：文档型 XS PR，较容易进入下一版本或文档部署周期。

### Provider image recovery 位置例外的架构文档  
PR：https://github.com/zeroclaw-labs/zeroclaw/pull/10949  

该 PR 为 provider-image recovery 的放置位置提出有界例外，说明团队正在对 agent loop 与 provider recovery 的边界进行架构澄清。  
判断：偏治理和架构说明，有助于后续相关修复合并。

---

## 6. 用户反馈摘要

从今日 Issues 看，用户痛点集中在“正确性、成本可见性、配置交互效率、provider 兼容性”四类。

1. **Provider 兼容性痛点**  
   用户希望 Anthropic 的 signed reasoning 在工具调用历史中保持完整，不被通用 sanitizer 破坏。  
   相关链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10952

2. **配置界面效率问题**  
   ZeroCode Config 保存后重复请求同一字段列表，用户感知可能是界面刷新冗余、响应变慢或 daemon 负载增加。  
   相关链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10951

3. **成本预算提醒不可信**  
   配置了 `cost.warn_at_percent` 但运行时没有触发预算警告，会让用户对成本控制能力产生不信任。  
   相关链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10950

4. **复杂 channel 场景中的 key 唯一性担忧**  
   interruption scope key 碰撞说明用户或贡献者正在审视多组件、多 sender 场景下的边界条件。  
   相关链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10948

5. **CI 稳定性诉求**  
   并发运行时测试 flaky 会影响贡献者对测试结果的信心。  
   相关链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10939

整体反馈偏工程化和高级使用场景，说明当前参与者多为深度用户、集成者或贡献者，而非普通终端用户。

---

## 7. 待处理积压

当前数据窗口仅覆盖过去 24 小时，无法准确识别“长期未响应”的历史积压。但从今日待合并队列看，以下项目值得维护者优先关注：

### 高优先级：Anthropic signed reasoning 修复  
PR：https://github.com/zeroclaw-labs/zeroclaw/pull/10953  
Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/10952  

原因：已有明确 bug 与修复 PR，影响 provider replay 正确性。建议优先 review、测试并合并。

### 高优先级：bounded child tool approvals 安全边界  
PR：https://github.com/zeroclaw-labs/zeroclaw/pull/10937  

原因：涉及 agent 子循环和工具审批安全，标记 `risk:high`。建议安全维护者重点审查 threat model、默认拒绝行为和回归测试覆盖。

### 中高优先级：工具附件显式声明  
PR：https://github.com/zeroclaw-labs/zeroclaw/pull/10938  

原因：影响范围很广，可能与多模态、provider sanitizer、tool replay 等问题相关。建议拆分 review 或明确依赖链，避免长期堆叠。

### 中优先级：Skills well-known discovery 安装  
PR：https://github.com/zeroclaw-labs/zeroclaw/pull/10944  

原因：功能价值高，但存在供应链与 schema 兼容风险。建议重点审查 pinning、index trust、单 skill 选择约束和失败回滚行为。

### 中优先级：运行时成本警告缺口  
Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/10950  

原因：尚未看到对应 fix PR。成本提醒是用户信任 runtime budget 的关键能力，建议尽快确认设计预期并补齐 warning path。

### 中优先级：ZeroCode Config 重复刷新  
Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/10951  

原因：属于用户可感知的性能/交互问题，修复可能相对局部，适合作为 quick win。

---

## 总体评估

ZeroClaw 今日开发动能较强，PR 更新数量明显高于 Issue 数量，说明项目处于积极修复与功能推进阶段。短期健康风险主要来自待合并队列较长，以及若干 `risk:high` / `size:XL` PR 可能拖慢主线节奏。  
建议维护者优先合并低风险 CI/文档稳定性修复，同时集中 review Anthropic signed reasoning、子 Agent 工具审批、工具附件声明这几项影响核心架构和安全边界的工作。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*