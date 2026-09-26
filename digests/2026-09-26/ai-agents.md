# OpenClaw 生态日报 2026-09-26

> Issues: 10 | PRs: 76 | 覆盖项目: 13 个 | 生成时间: 2026-09-26 04:01 UTC

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
**日期：2026-09-26**  
**仓库：** `openclaw/openclaw`

---

## 1. 今日速览

过去 24 小时 OpenClaw 维护活动非常活跃：共有 **10 条 Issue 更新**、**76 条 PR 更新**，其中 **65 条 PR 仍待合并**，**11 条 PR 已合并或关闭**。整体来看，项目当前处于高强度稳定性修复与性能优化阶段，核心关注点集中在 **Gateway 响应性、会话状态一致性、消息投递可靠性、Agent runtime 恢复能力** 等生产关键路径。

今日新增或活跃 Issue 中，出现多个 **P0/P1 级别稳定性问题**，包括更新失败、Gateway 启动失败、睡眠唤醒后 runtime 无法恢复、消息丢失或最终回复未送达等。与此同时，维护者提交了大量围绕 Gateway 主线程去阻塞、SQLite/WAL/进度更新异步化、订阅稳定性、流式增量传输的 PR，显示项目正在集中解决高并发、多客户端、多 Agent 场景下的性能瓶颈。

项目健康度总体为 **高活跃但风险偏高**：开发动能充足、修复路径清晰，但待合并 PR 数量较大，且多个 PR 涉及 `session-state`、`message-delivery`、`security-boundary`、`availability` 等高风险区域，需要维护者优先审查和控制合入节奏。

---

## 2. 项目进展

今日无新版本发布。以下为过去 24 小时中已关闭或推进明显的重要 PR，以及它们对项目的影响。

### 已关闭 / 已完成的重要 PR

#### 1. `perf(gateway): pace typing requests with prepared sharing facts`  
- **PR：** [openclaw/openclaw#158552](https://github.com/openclaw/openclaw/pull/158552)  
- **状态：** Closed  
- **涉及范围：** Web UI、Gateway、文档  
- **核心内容：**  
  该 PR 解决 Control UI 输入时反复触发 Gateway 主线程读取 session 的问题。优化后，输入预览请求会按照既有的 250ms 节奏进行节流，并提前判断是否存在可接收预览的共享对象。  
- **项目推进意义：**  
  这是 Gateway 交互延迟治理的一部分，有助于减少 UI 输入期间的主线程阻塞，提升多人或多客户端会话中的交互流畅度。  
- **风险评估：**  
  涉及消息预览与共享事实判断，风险中等，但目标是性能优化而非协议语义变更。

#### 2. `perf(gateway): avoid serializing oversized progress snapshots`  
- **PR：** [openclaw/openclaw#158572](https://github.com/openclaw/openclaw/pull/158572)  
- **状态：** Closed  
- **涉及范围：** Gateway  
- **核心内容：**  
  大型工具结果在重连进度捕获时，即使最终会因超过 64 KiB 限制被丢弃，仍会先完整序列化，导致并发聊天会话被阻塞。该 PR 在超过字节预算时提前停止序列化。  
- **项目推进意义：**  
  明显改善大工具输出场景下的 Gateway 响应性，减少一个大型任务影响其他聊天会话的概率。  
- **风险评估：**  
  与 reconnect progress 快照有关，需确认不会影响客户端恢复体验。

---

### 仍在等待合并但推进价值较高的 PR

#### 1. `fix(catalog): release per-turn worker state and attribute worker memory`  
- **PR：** [openclaw/openclaw#158323](https://github.com/openclaw/openclaw/pull/158323)  
- **优先级：** P0  
- **状态：** Ready for maintainer look  
- **核心价值：**  
  修复 catalog worker 在请求切换时保留 per-turn 状态导致的内存滞留，并改进内存压力诊断。  
- **相关问题：**  
  关联 [#157842](https://github.com/openclaw/openclaw/issues/157842)、[#157575](https://github.com/openclaw/openclaw/issues/157575)、[#158183](https://github.com/openclaw/openclaw/issues/158183)、[#158201](https://github.com/openclaw/openclaw/issues/158201)。  
- **判断：**  
  这是今日最值得维护者优先处理的 PR 之一，直接影响长时间运行的 Gateway 稳定性。

#### 2. `fix: keep subagent registration responsive during database contention`  
- **PR：** [openclaw/openclaw#158251](https://github.com/openclaw/openclaw/pull/158251)  
- **优先级：** P1  
- **状态：** Ready for maintainer look  
- **核心价值：**  
  避免 subagent 注册过程中因 SQLite 写协调等待阻塞 Gateway event loop。  
- **风险标签：** `session-state`、`security-boundary`  
- **判断：**  
  对多 Agent / subagent 工作流非常关键，适合在充分测试后纳入近期稳定性版本。

#### 3. `fix: tool_call rejects memory_search snake_case arguments that direct calls accept`  
- **PR：** [openclaw/openclaw#158632](https://github.com/openclaw/openclaw/pull/158632)  
- **关联 Issue：** [#158631](https://github.com/openclaw/openclaw/issues/158631)  
- **优先级：** P1  
- **状态：** Waiting on author  
- **核心价值：**  
  修复默认 Tool Search 路径中 `memory_search` 通过 `tool_call` 调用时拒绝 `snake_case` 参数的问题。  
- **判断：**  
  这是明确的用户可见行为缺陷，且已有对应修复 PR，建议尽快完成作者侧修改并合入。

#### 4. `perf(gateway): stream append deltas to every client`  
- **PR：** [openclaw/openclaw#158587](https://github.com/openclaw/openclaw/pull/158587)  
- **涉及范围：** Android、macOS、Web UI、Gateway  
- **核心价值：**  
  当前并发聊天流会重复发送完整累计答案，导致 Gateway 序列化和网络流量随回复长度呈二次增长。该 PR 改为向客户端发送 append delta。  
- **判断：**  
  该改动对大型回复、多客户端观看、共享 demo 场景价值很高，但由于涉及多端协议和消息流，合入风险也较高。

#### 5. `perf(gateway): keep progress updates from blocking other chats`  
- **PR：** [openclaw/openclaw#158629](https://github.com/openclaw/openclaw/pull/158629)  
- **涉及范围：** Gateway、Commands、文档  
- **核心价值：**  
  将进度卡片更新中的 SQLite 操作从 Gateway 主线程移出，避免进度更新高峰影响其他聊天。  
- **判断：**  
  与今日多个 Gateway 去阻塞 PR 方向一致，是改善并发体验的重要组成。

---

## 3. 社区热点

### 1. 更新失败：`managed-service-preflight`  
- **Issue：** [openclaw/openclaw#158231](https://github.com/openclaw/openclaw/issues/158231)  
- **状态：** Open  
- **评论数：** 6  
- **优先级：** P0  
- **标签：** `impact:ux-release-blocker`、`maturity:stable`、`clawsweeper:manual-only`  
- **摘要：**  
  用户在 macOS arm64、Node 24.19.0 环境下，从 OpenClaw `2026.9.5` 更新到 `2026.9.6` 失败。报告已由 OpenClaw 显式确认。  
- **热点原因分析：**  
  该问题直接阻断稳定版用户升级路径，属于发布体验阻塞问题。由于带有 `manual-only` 标签，说明自动化修复或自动 triage 可能不足，需要维护者人工介入。  
- **用户诉求：**  
  用户希望升级过程可恢复、错误信息可解释，并避免 managed-service preflight 在正常环境下误判失败。

### 2. 睡眠唤醒后 Agent runtime publication 超时且无法自恢复  
- **Issue：** [openclaw/openclaw#158592](https://github.com/openclaw/openclaw/issues/158592)  
- **状态：** Open  
- **评论数：** 3  
- **摘要：**  
  macOS 主机睡眠约 60 分钟后唤醒，Gateway 检测到 host timing gap 并尝试刷新 agent model runtime。某个 agent 的 runtime publication 失败，之后所有 inbound message 都报错：`runtime owner was not published`，直到重启 Gateway 才恢复。  
- **热点原因分析：**  
  这是典型的长时间运行服务自恢复缺陷，影响桌面用户和常驻 agent 场景。问题严重之处在于失败后不会自动恢复，形成持续性不可用状态。  
- **用户诉求：**  
  用户希望 Gateway 在 sleep/wake、网络切换、runtime refresh 失败后能够自动重新发布 runtime owner，而不是要求手动重启。

### 3. Gateway 在旧 Linux kernel / JS fs-safe fallback 下启动失败  
- **Issue：** [openclaw/openclaw#158239](https://github.com/openclaw/openclaw/issues/158239)  
- **状态：** Open  
- **评论数：** 2  
- **优先级：** P0  
- **标签：** `impact:crash-loop`、`maturity:stable`、`needs-live-repro`  
- **摘要：**  
  在不支持 `openat2` 的主机上，例如 Linux kernel `< 5.6`，Gateway 可能因 `Session membership store changed before publication` 启动失败。  
- **热点原因分析：**  
  问题集中在兼容性和启动路径，尤其影响 NAS、旧服务器、受限 Linux 环境。`crash-loop` 表明服务无法稳定启动，是稳定版中的高优先级回归。  
- **用户诉求：**  
  旧内核环境下应提供可靠 fallback，而不是在 session membership publication 前后出现竞态。

### 4. `memory_search` 通过 `tool_call` 调用时拒绝 snake_case 参数  
- **Issue：** [openclaw/openclaw#158631](https://github.com/openclaw/openclaw/issues/158631)  
- **PR：** [openclaw/openclaw#158632](https://github.com/openclaw/openclaw/pull/158632)  
- **状态：** Issue Open，PR Open  
- **优先级：** P1  
- **热点原因分析：**  
  这是模型工具调用路径与直接工具调用路径行为不一致的问题。默认 Tool Search 暴露了 `memory_search`，但通过 `tool_call` 进入时没有执行 `prepareArguments` normalizer，导致 `min_score`、`max_results` 等 snake_case 参数被拒绝。  
- **用户诉求：**  
  用户希望工具 schema、模型调用路径、直接调用路径具备一致的参数兼容性，避免模型按合理格式调用却失败。

---

## 4. Bug 与稳定性

以下按严重程度和用户影响排序。

### P0 / 发布阻塞与崩溃类

#### 1. 更新失败：`managed-service-preflight`  
- **Issue：** [#158231](https://github.com/openclaw/openclaw/issues/158231)  
- **严重程度：** P0  
- **影响：** `ux-release-blocker`  
- **环境：** macOS arm64，Node 24.19.0，OpenClaw 2026.9.5 → 2026.9.6  
- **是否已有 fix PR：** 数据中未显示明确修复 PR  
- **分析：**  
  该问题阻断用户升级到新版本，且发生在稳定版更新路径上。建议优先定位 preflight 检查失败条件，并提供降级、重试或跳过机制。

#### 2. Gateway 启动失败并进入 crash loop  
- **Issue：** [#158239](https://github.com/openclaw/openclaw/issues/158239)  
- **严重程度：** P0  
- **影响：** `impact:crash-loop`  
- **环境：** Linux kernel `< 5.6`，JS fs-safe fallback  
- **是否已有 fix PR：** 暂无新修复 PR，标签显示 `clawsweeper:no-new-fix-pr`  
- **分析：**  
  该问题影响旧 Linux / NAS / 自托管用户。由于涉及文件系统安全 fallback 与 session membership publication，建议维护者尽快获取 live repro，并补充兼容性测试。

---

### P1 / 消息投递、会话状态、工具调用一致性

#### 3. yielded batch 的 settle wake 被静默 hold，可能造成消息丢失或状态延迟  
- **Issue：** [#158603](https://github.com/openclaw/openclaw/issues/158603)  
- **严重程度：** P1  
- **影响：** `session-state`、`message-loss`  
- **是否已有 fix PR：** 数据中未显示明确修复 PR  
- **摘要：**  
  在 `2026.9.6 (eb377ac)` 中，请求 turn N 中短 child 完成后，其 settle wake 被一个更早 turn 中无关的 older sibling 阻塞。该 hold 没有日志，且不计入显式 deferral。  
- **分析：**  
  这是较危险的调度/任务依赖问题。由于“静默”发生，排障难度高，可能导致用户看到回复延迟、任务不完成或消息丢失。

#### 4. Telegram 场景下 Claude CLI 最终答案未送达  
- **Issue：** [#158626](https://github.com/openclaw/openclaw/issues/158626)  
- **严重程度：** 未标 P1/P0，但影响消息投递  
- **影响：** Telegram、Claude Code native background agents  
- **是否已有 fix PR：** 数据中未显示明确修复 PR  
- **摘要：**  
  使用 `claude-cli` runtime 时，如果 Telegram turn 启动 Claude Code 原生后台 Agent 工具，最终答案没有送达 Telegram。  
- **分析：**  
  该问题影响端到端用户感知：后台任务执行了，但用户看不到最终结果。应检查 background agent completion 与 Telegram delivery pipeline 的 join / flush / finalization 逻辑。

#### 5. `memory_search` 在 `tool_call` 路径中拒绝 snake_case 参数  
- **Issue：** [#158631](https://github.com/openclaw/openclaw/issues/158631)  
- **修复 PR：** [#158632](https://github.com/openclaw/openclaw/pull/158632)  
- **严重程度：** P1  
- **影响：** `session-state`  
- **分析：**  
  这是高确定性的工具调用兼容性 bug，已有修复 PR。建议优先完成 review，因为修复范围相对聚焦。

---

### P2 / 状态维护、恢复能力与 UX 摩擦

#### 6. Deferred context maintenance 在 caller release 后丢失 admission ownership  
- **Issue：** [#158607](https://github.com/openclaw/openclaw/issues/158607)  
- **严重程度：** P2  
- **影响：** `session-state`  
- **是否已有 fix PR：** 数据中未显示明确修复 PR  
- **摘要：**  
  Deferred context-engine maintenance 可能继承已经释放的 caller admission root，从而错误拒绝 coalesced rerun，报错 `Gateway is draining; new tasks are not accepted`。  
- **分析：**  
  该问题属于状态生命周期管理缺陷，会在特定调度时序下错误判断 Gateway 正在 draining。

#### 7. Targeted plugin reload 在忙碌插件上可能无限失败  
- **Issue：** [#158318](https://github.com/openclaw/openclaw/issues/158318)  
- **严重程度：** P2  
- **影响：** `ux-friction`  
- **是否已有 fix PR：** 暂无新修复 PR，标签显示 `needs-product-decision`  
- **摘要：**  
  `openclaw plugins reload <id>` 在插件持续有新工作进入时，等待 60 秒后仍保持旧 generation，重试也不能保证进展。  
- **分析：**  
  这既是可用性问题，也是产品语义问题：reload 是否应暂停 dispatch、drain retained work，再恢复 durable ingress，需要产品层决策。

#### 8. OpenClaw 2026.9.4 更新失败  
- **Issue：** [#158579](https://github.com/openclaw/openclaw/issues/158579)  
- **严重程度：** 未标 P0/P1  
- **环境：** macOS arm64，Node 26.7.0  
- **是否已有 fix PR：** 数据中未显示明确修复 PR  
- **分析：**  
  与 [#158231](https://github.com/openclaw/openclaw/issues/158231) 同属更新失败类问题。虽然具体版本不同，但建议维护者合并分析 update pipeline 在 Node 24/26、macOS arm64 下的兼容性。

---

## 5. 功能请求与路线图信号

### 1. Targeted plugin reload 需要更可靠的暂停与恢复语义  
- **Issue：** [#158318](https://github.com/openclaw/openclaw/issues/158318)  
- **路线图信号：** 插件生命周期管理增强  
- **用户诉求：**  
  用户希望在对单个插件执行 reload 时，系统能够暂停新 dispatch、drain 已保留工作，然后恢复 durable ingress，而不是在忙碌插件上无限等待。  
- **进入下一版本可能性：** 中等  
- **判断依据：**  
  该 Issue 已有清晰问题描述和方案方向，但带有 `needs-product-decision`，说明还需要维护者确认 reload 的产品语义和边界。

### 2. Owner 可在聊天中交给 Agent 管理 key、配置和 skill edits  
- **PR：** [#158120](https://github.com/openclaw/openclaw/pull/158120)  
- **路线图信号：** 更强的个人 AI 助手自治能力  
- **涉及范围：** Docs、CLI、Agents、QA Lab  
- **风险标签：** `auth-provider`、`security-boundary`  
- **用户价值：**  
  允许 owner 在聊天中要求 agent 修改 key、配置或自身 skills，而不再被拒绝或强制跳转到 dashboard / Workshop proposal。  
- **进入下一版本可能性：** 中等偏低，取决于安全审查  
- **判断依据：**  
  功能价值很高，但涉及凭证、权限、身份边界，必须经过严格 review 和端到端验证。

### 3. Agents API 加载 OpenClaw persona 与 workspace context  
- **PR：** [#158328](https://github.com/openclaw/openclaw/pull/158328)  
- **路线图信号：** Hosted workspace 与本地 Agent 个性/上下文一致性  
- **用户价值：**  
  Agents API session 不应只加载 root `AGENTS.md`，还应继承 OpenClaw agent 的身份、偏好、规则与个人上下文。  
- **进入下一版本可能性：** 中等  
- **风险：** `security-boundary`  
- **判断：**  
  该能力直接增强 Agent 一致性体验，但需要确保个人上下文不会越权泄露到不该访问的 hosted workspace。

### 4. Skill Workshop 支持清理已拒绝 proposal  
- **PR：** [#158601](https://github.com/openclaw/openclaw/pull/158601)  
- **路线图信号：** Skill Workshop 数据生命周期管理  
- **状态：** Needs proof  
- **用户价值：**  
  用户可以永久删除已拒绝的 proposal、事件历史和保留 artifacts。  
- **进入下一版本可能性：** 中等偏低  
- **判断依据：**  
  功能方向明确，但当前仍需 proof，且涉及历史记录与 artifact 删除，需明确审计与恢复策略。

### 5. 大规模 Gateway 性能路线：主线程去阻塞与增量流式传输  
相关 PR 包括：  
- [#158402](https://github.com/openclaw/openclaw/pull/158402) `perf(sessions): reduce stalls when saving large chat messages`  
- [#158587](https://github.com/openclaw/openclaw/pull/158587) `perf(gateway): stream append deltas to every client`  
- [#158629](https://github.com/openclaw/openclaw/pull/158629) `perf(gateway): keep progress updates from blocking other chats`  
- [#158630](https://github.com/openclaw/openclaw/pull/158630) `improve(gateway): reduce session update work for concurrent viewers`  
- [#158570](https://github.com/openclaw/openclaw/pull/158570) `perf(gateway): avoid chat stalls during WAL maintenance`  
- [#158443](https://github.com/openclaw/openclaw/pull/158443) `perf(agents): keep file edits from blocking other chats`  

**路线图判断：**  
OpenClaw 正在系统性地把 Gateway 从“同步主线程执行关键 I/O / 序列化 / SQLite 工作”的模式，迁移到更细粒度、更可并发的 worker / scheduler / delta streaming 架构。这很可能是近期版本的核心稳定性与性能主线。

---

## 6. 用户反馈摘要

### 1. 升级路径可靠性仍是痛点  
相关 Issue：  
- [#158231](https://github.com/openclaw/openclaw/issues/158231)  
- [#158579](https://github.com/openclaw/openclaw/issues/158579)  

用户反馈显示，macOS arm64 环境下的更新失败仍然影响稳定版用户。问题不仅是安装失败本身，还包括失败后的恢复路径、错误解释和是否可继续使用。对于个人 AI 助手类产品，用户通常期待后台服务长期稳定运行，升级失败会显著削弱信任感。

### 2. Gateway 需要更强的自恢复能力  
相关 Issue：  
- [#158592](https://github.com/openclaw/openclaw/issues/158592)  

用户在 macOS 睡眠/唤醒后遭遇 runtime publication 失败，且所有后续 inbound message 都失败，直到重启 Gateway。真实使用场景中，桌面机器睡眠、网络变化、进程挂起非常常见，用户期待 OpenClaw 能自动恢复，而不是需要理解 runtime owner publication 这类内部概念。

### 3. 多会话并发下的“一个任务拖慢所有聊天”是核心不满  
相关 PR：  
- [#158402](https://github.com/openclaw/openclaw/pull/158402)  
- [#158443](https://github.com/openclaw/openclaw/pull/158443)  
- [#158570](https://github.com/openclaw/openclaw/pull/158570)  
- [#158587](https://github.com/openclaw/openclaw/pull/158587)  
- [#158629](https://github.com/openclaw/openclaw/pull/158629)  

虽然这些主要来自维护者 PR 描述，但反映出清晰的用户痛点：大消息保存、大文件编辑、WAL checkpoint、进度更新、完整流式快照序列化等操作会阻塞其他聊天。对个人 AI 助手系统而言，并发响应能力已成为核心体验指标。

### 4. 工具调用路径不一致影响模型可靠性  
相关 Issue / PR：  
- [#158631](https://github.com/openclaw/openclaw/issues/158631)  
- [#158632](https://github.com/openclaw/openclaw/pull/158632)  

用户痛点是：同一个工具直接调用可用，但模型通过 `tool_call` 调用却失败。这类问题会让用户误以为模型“不会用工具”，实则是工具参数规范化链路不一致。

### 5. 消息投递完整性仍需加强  
相关 Issue：  
- [#158603](https://github.com/openclaw/openclaw/issues/158603)  
- [#158626](https://github.com/openclaw/openclaw/issues/158626)  

用户希望后台 agent、子任务、Telegram 入口和最终回答之间具备可靠的完成语义。当前反馈显示，部分场景下 final answer 未送达，或 batch settle wake 被静默 hold，这会直接影响用户对系统可靠性的判断。

---

## 7. 待处理积压

以下为需要维护者优先关注的未合并 PR 或未解决 Issue。

### 高优先级 Issue

#### 1. P0 更新失败阻塞发布体验  
- **Issue：** [#158231](https://github.com/openclaw/openclaw/issues/158231)  
- **原因：** 稳定版升级阻塞，已有 6 条评论，且标记为 release blocker。  
- **建议动作：**  
  - 维护者手动复核 preflight 失败条件  
  - 提供 workaround  
  - 检查是否与 [#158579](https://github.com/openclaw/openclaw/issues/158579) 存在共同根因

#### 2. P0 Gateway crash loop on old Linux kernels  
- **Issue：** [#158239](https://github.com/openclaw/openclaw/issues/158239)  
- **原因：** 启动失败影响自托管用户，暂无 fix PR。  
- **建议动作：**  
  - 尽快获取 live repro  
  - 为 kernel `< 5.6` fallback 路径补充回归测试  
  - 检查 session membership publication 的竞态窗口

#### 3. Sleep/wake 后 runtime owner publication 无法恢复  
- **Issue：** [#158592](https://github.com/openclaw/openclaw/issues/158592)  
- **原因：** 常驻桌面服务核心恢复能力缺陷。  
- **建议动作：**  
  - 增加 runtime publication retry / reconciliation  
  - 对 `runtime owner was not published` 增加自动修复路径  
  - 避免必须重启 Gateway

---

### 高优先级 PR

#### 1. P0 worker memory 修复  
- **PR：** [#158323](https://github.com/openclaw/openclaw/pull/158323)  
- **状态：** Ready for maintainer look  
- **建议：** 优先 review。该 PR 对长期运行内存稳定性很重要。

#### 2. P1 subagent 注册去阻塞  
- **PR：** [#158251](https://github.com/openclaw/openclaw/pull/158251)  
- **状态：** Ready for maintainer look  
- **建议：** 重点审查 session-state 与 security-boundary 影响，尽快决定是否进入下一批稳定性修复。

#### 3. P1 `memory_search` 参数兼容修复  
- **PR：** [#158632](https://github.com/openclaw/openclaw/pull/158632)  
- **状态：** Waiting on author  
- **建议：** 作者补齐后应快速合入，问题范围清晰且用户可见。

#### 4. P1 Gateway task retention 去阻塞  
- **PR：** [#158235](https://github.com/openclaw/openclaw/pull/158235)  
- **状态：** Waiting on author  
- **风险：** `session-state`  
- **建议：** 该 PR 可减少 SQLite 写协调导致的 Gateway event loop 阻塞，建议作者尽快响应 review。

#### 5. P1 WAL maintenance 去阻塞  
- **PR：** [#158570](https://github.com/openclaw/openclaw/pull/158570)  
- **状态：** Waiting on author  
- **风险：** `session-state`  
- **建议：** 与 Gateway 并发响应能力强相关，但需充分验证 checkpoint、page reclamation、split-brain inspection 行为。

---

## 总体健康度评估

- **活跃度：** 很高。24 小时内 76 条 PR 更新，说明维护者和自动化修复流都非常活跃。  
- **稳定性风险：** 偏高。多个 P0/P1 问题集中在更新、启动、session-state、message delivery、runtime recovery。  
- **工程方向：** 清晰。大量 PR 指向同一目标：减少 Gateway 主线程阻塞、提升多客户端并发、改善长期运行稳定性。  
- **维护压力：** 较高。65 条 PR 待合并，其中多条带有 `security-boundary`、`availability`、`session-state`、`message-delivery` 风险标签，需要维护者谨慎排队 review。  
- **建议优先级：**  
  1. 先处理 P0 更新失败与 Gateway crash loop。  
  2. 合入范围明确的 P1 工具调用修复。  
  3. 分批审查 Gateway 去阻塞 PR，避免多个高风险 session-state 改动同时落地。  
  4. 为 sleep/wake runtime recovery 增加自动恢复与回归测试。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告  
**日期：2026-09-26**

---

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态呈现出明显的“两极分化”：头部项目如 **OpenClaw、Hermes Agent、ZeroClaw、NanoClaw、CoPaw** 活跃度很高，集中处理 runtime、Gateway、权限、安全、消息投递、更新链路等生产级问题；长尾项目则多处于低频维护或静默状态。  
整体技术重心正从“能跑 Agent / 接入模型”转向“长期稳定运行、可恢复、可审计、可授权、可多端协同”的工程化阶段。  
多项目同时暴露出更新失败、Gateway 阻塞、session 状态不一致、工具调用边界、安全权限模型等问题，说明该类系统已经进入真实用户长期使用和复杂部署阶段。  
同时，Provider 扩展、MCP 工具生态、Browser 自动化、多 Agent 协作、Human-in-the-loop 审批正在成为下一轮竞争重点。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 今日主要主题 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 10 | 76 | 无 | Gateway 去阻塞、session-state、消息投递、runtime 恢复、更新失败 | **高活跃，高风险**。维护动能强，但 P0/P1 较多，65 个 PR 待合并，需控制合入节奏 |
| **Hermes Agent** | 50 | 50 | 无 | 更新链路、Cron、Desktop、大会话、Webhook、认证与多 Profile | **高活跃，高债务**。修复响应快，但安装/更新和 Desktop 稳定性压力大 |
| **ZeroClaw** | 14 | 16 | 无 | RPC session 隔离、SOP 权限、安全边界、工具调用解析 | **高活跃，高安全压力**。安全问题密集，多个 S0/S1 需优先处理 |
| **NanoClaw** | 5 | 22 | 无 | v2.4.0 后更新、setup、OpenCode/Iron Proxy、Agent Runner | **高活跃，中等风险**。关键回归多有 PR 跟进，短期依赖 review 吞吐 |
| **CoPaw / QwenPaw** | 4 | 7 | 无 | grep 工具安全、Browser SDK、Gemini 工具调用、QQ 去重 | **活跃且响应快**。问题聚焦，多个修复 PR 待合并 |
| **NanoBot** | 0 | 5 | 无 | MCP 分页工具发现、WebUI 草稿、Napcat 兼容、Provider 扩展 | **中高活跃，风险较低**。以实用修复和小功能扩展为主 |
| **PicoClaw** | 1 | 1 | 无 | CLA 流程问题、Cheaper Inference Provider | **低到中等活跃**。功能演进有限，贡献流程需关注 |
| **NullClaw** | 0 | 1 | 无 | `/bash` / `/exec` 中高风险命令审批 | **低活跃，但修复方向关键**。聚焦 supervised autonomy 安全体验 |
| **LobsterAI** | 0 | 1 | 无 | Requesty Provider 支持 | **低活跃，功能小步演进**。缺少社区反馈数据 |
| **IronClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **Moltis** | 0 | 0 | 无 | 无活动 | **静默** |
| **ZeptoClaw** | 0 | 0 | 无 | 无活动 | **静默** |

---

## 3. OpenClaw 在生态中的定位

### 3.1 相对优势

OpenClaw 今日以 **76 条 PR 更新、10 条 Issue 更新** 位居生态最高活跃梯队，明显高于 NanoBot、PicoClaw、LobsterAI 等中小项目，也接近 Hermes Agent 的高频维护水平。  
它的优势主要体现在：

1. **工程深度较高**  
   OpenClaw 的问题集中在 Gateway、SQLite/WAL、session-state、message-delivery、runtime publication、subagent registration 等底层运行时关键路径，说明项目已经进入较深的生产化阶段。

2. **性能优化方向清晰**  
   大量 PR 指向同一主线：  
   - Gateway 主线程去阻塞；  
   - SQLite 操作异步化；  
   - 大消息 / 大工具结果避免阻塞；  
   - 流式 append delta 替代完整快照；  
   - 多客户端并发观看优化。  

3. **多端协同能力强**  
   OpenClaw 的 PR 涉及 Web UI、Android、macOS、Gateway、Commands、Agents 等多个端和模块，说明它不是单一 CLI Agent，而是更接近完整个人 AI 助手平台。

4. **问题响应密度高**  
   多个 P0/P1 问题已有对应 PR 或明确排查方向，例如 `memory_search` 参数兼容、catalog worker memory、subagent 注册阻塞等。

### 3.2 风险与短板

OpenClaw 当前也表现出明显的成熟项目风险：

- **P0/P1 问题集中**：更新失败、Gateway crash loop、runtime sleep/wake 后不可恢复、消息丢失等均直接影响核心体验。
- **PR 积压较大**：65 个 PR 待合并，且不少涉及 `session-state`、`security-boundary`、`message-delivery`。
- **合入风险高**：多个 Gateway 去阻塞 PR 同时推进，若缺少合入节奏控制，可能引入新的竞态和恢复问题。

### 3.3 与同类项目技术路线差异

| 对比对象 | OpenClaw 差异 |
|---|---|
| **Hermes Agent** | Hermes 更偏 Desktop / Cron / 安装更新 / 多 Profile 生态问题；OpenClaw 更聚焦 Gateway 并发、runtime 恢复、session 状态一致性 |
| **ZeroClaw** | ZeroClaw 今日重心偏安全权限模型和 RPC/SOP 隔离；OpenClaw 更偏生产运行稳定性和性能瓶颈治理 |
| **NanoClaw** | NanoClaw 更偏安装、setup、本地模型代理、Agent Runner；OpenClaw 架构层更重，关注多客户端和长期 Gateway 运行 |
| **CoPaw** | CoPaw 侧重工具安全、Browser SDK、Provider 兼容；OpenClaw 的问题更系统性，覆盖 runtime、消息、数据库、Gateway |
| **NanoBot / LobsterAI / PicoClaw** | 这些项目更多处于功能扩展和兼容性修复阶段；OpenClaw 已进入大规模并发与稳定性优化阶段 |

**结论：** OpenClaw 当前是生态中最接近“生产级个人 AI 助手平台”的项目之一，但也因此承担最高的稳定性与维护复杂度。

---

## 4. 共同关注的技术方向

### 4.1 Gateway / Runtime 长期稳定性

涉及项目：**OpenClaw、Hermes Agent、NanoClaw、ZeroClaw**

- OpenClaw：Gateway 主线程阻塞、runtime publication sleep/wake 后无法恢复。
- Hermes Agent：Gateway PID 丢失、webhook server 拒绝连接、Cron worker 派发失败。
- NanoClaw：gateway 检测误判、update controller 加载失败、Agent Runner 通知循环。
- ZeroClaw：RPC session resume、forwarded environment revalidation、daemon observer event firehose。

**共同诉求：**  
Agent 不再是短生命周期 CLI，而是常驻服务。用户要求它能跨睡眠、重启、网络变化、更新、任务失败自动恢复。

---

### 4.2 安装与更新链路可靠性

涉及项目：**OpenClaw、Hermes Agent、NanoClaw**

- OpenClaw：macOS arm64 更新失败，`managed-service-preflight` 成为 P0 release blocker。
- Hermes Agent：Windows update 后缺失 `gateway.pid`，macOS source update 因 Git partial-clone 损坏中断。
- NanoClaw：`/update-nanoclaw` controller archive 缺失 `setup/`，gateway 检测被 pnpm stdout 警告干扰。

**共同诉求：**  
更新系统需要具备原子性、回滚、自愈、可解释错误和环境兼容性。对于个人 AI 助手，更新失败会直接破坏用户对“常驻可信助手”的信任。

---

### 4.3 工具调用可靠性与安全边界

涉及项目：**OpenClaw、CoPaw、ZeroClaw、NullClaw**

- OpenClaw：`memory_search` 在 `tool_call` 路径拒绝 snake_case 参数。
- CoPaw：`grep_search` 读取二进制 / 内部 SQLite WAL，污染会话状态。
- ZeroClaw：browser/search 被映射为 shell、SOP 缺少 `tools:execute`、并行 file_edit/file_write 静默丢失。
- NullClaw：中高风险 shell 命令应进入 `/approve`，而不是直接失败。

**共同诉求：**  
工具调用已成为 Agent 系统的核心能力，但必须具备：

- 参数规范化一致性；
- 工具权限隔离；
- 风险分级；
- 审批恢复路径；
- 工具输出安全过滤；
- 并发写入一致性。

---

### 4.4 多模型 Provider 与 LLM Gateway 扩展

涉及项目：**NanoBot、PicoClaw、LobsterAI、NanoClaw、CoPaw**

- NanoBot：新增 Cheaper Inference Provider。
- PicoClaw：新增 Cheaper Inference Provider。
- LobsterAI：新增 Requesty Provider。
- NanoClaw：Claude provider system prompt mode、OpenCode / Iron Proxy、本地模型 URL 校验。
- CoPaw：Gemini `thought_signature`、自定义 OpenAI-compatible provider 上下文窗口。

**共同诉求：**  
用户希望通过统一接口接入更多模型、降低成本、支持本地模型和模型网关。Provider 抽象正在成为个人 AI 助手项目的基础竞争力。

---

### 4.5 多 Agent 协作与消息投递可靠性

涉及项目：**OpenClaw、Hermes Agent、CoPaw、ZeroClaw、NanoClaw**

- OpenClaw：Telegram 场景 Claude CLI final answer 未送达，settle wake 静默 hold。
- Hermes Agent：Cron dispatch 失败无 incident，approval settlement 多订阅者问题。
- CoPaw：`chat_with_agent` 超时被错误识别为用户中断。
- ZeroClaw：receiver-discretionary session messaging、outbound delivery receipts。
- NanoClaw：Agent Runner 重复回复、agent-to-agent 路由稳定性。

**共同诉求：**  
Agent 间调用、后台任务、外部消息渠道需要可靠的完成语义、送达回执、失败通知和可恢复状态。

---

### 4.6 Human-in-the-loop 与审批机制

涉及项目：**NullClaw、ZeroClaw、Hermes Agent、OpenClaw**

- NullClaw：中高风险命令暂停等待 `/approve`。
- ZeroClaw：durable human-question primitive、SOP gates、tool approvals。
- Hermes Agent：approval settlement 支持多个订阅者。
- OpenClaw：owner 通过聊天管理 key、配置、skill edits 的 PR 涉及安全审查。

**共同诉求：**  
个人 AI 助手正从“被动问答”转向“受监督自治”。关键问题是如何在自动化效率和人类控制权之间建立稳定协议。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 / 路线特征 |
|---|---|---|---|
| **OpenClaw** | 全栈个人 AI 助手、Gateway、多端、多 Agent、长期运行 | 重度个人助手用户、开发者、自托管用户 | Gateway-centric，强调 session-state、message delivery、runtime recovery、多客户端并发 |
| **Hermes Agent** | Desktop Agent、Cron 自动化、插件、更新链路、多 Profile | 桌面用户、自动化任务用户、插件生态用户 | Desktop + Gateway + Cron + Plugin Catalog，安装/更新和 Desktop UX 权重高 |
| **ZeroClaw** | 安全强化型 Agent runtime、RPC、SOP、人类审批、多 Agent 消息 | 安全敏感用户、企业/高级开发者、runtime 集成者 | RPC session、权限模型、SOP、sandbox、durable messaging，安全边界优先 |
| **NanoClaw** | 本地部署、OpenCode/Iron Proxy、多 Agent Runner、setup 流程 | 本地模型用户、Linux 自托管用户、实验型 Agent 用户 | 强调 setup、provider、本地代理、fork-local extension seams |
| **CoPaw / QwenPaw** | 工具生态、Browser SDK、Provider 兼容、Console 体验、多渠道 | 工具链用户、浏览器自动化用户、国内 IM 渠道用户 | 工具安全、Browser profile、Gemini/Aliyun 等模型兼容、QQ 等渠道集成 |
| **NanoBot** | 轻量 Agent、WebUI、MCP、Provider 扩展 | 中小规模部署用户、MCP 工具用户 | 实用主义路线，关注 WebUI、MCP 工具发现、渠道容错 |
| **PicoClaw** | 轻量 Provider 扩展、贡献流程 | 小型社区贡献者、模型接入用户 | 活跃度较低，Provider 扩展为主 |
| **NullClaw** | 命令执行与 supervised autonomy | 本地自动化、安全执行用户 | 聚焦 shell/exec 审批流程，范围窄但安全语义关键 |
| **LobsterAI** | 多模型 Provider、桌面/渲染端模型配置 | 多模型接入用户 | Provider registry + UI 配置，今日主要是 Requesty 接入 |
| **IronClaw / TinyClaw / Moltis / ZeptoClaw** | 今日无明显信号 | 暂无法判断 | 暂无活动数据 |

---

## 6. 社区热度与成熟度

### 6.1 快速迭代阶段

代表项目：**OpenClaw、Hermes Agent、ZeroClaw、NanoClaw、CoPaw**

这些项目今日 PR 和 Issue 活跃度高，且问题集中在核心运行路径。它们已经跨过“功能可用”阶段，进入高频修复、架构调整和生产稳定性建设阶段。

- **OpenClaw**：最典型的高吞吐工程化项目，性能和稳定性双线推进。
- **Hermes Agent**：社区反馈密集，Desktop / Cron / 更新链路问题集中。
- **ZeroClaw**：安全问题密集，权限模型正在经受真实审查。
- **NanoClaw**：v2.4.0 后集中修复，维护响应快。
- **CoPaw**：问题具体且 PR 对应明确，适合快速合入。

### 6.2 质量巩固阶段

代表项目：**NanoBot、NullClaw**

- **NanoBot** 今日没有 Issue 更新，但 PR 聚焦 MCP、WebUI、部署容错、渠道兼容，属于稳步修补边界场景。
- **NullClaw** 活跃度低，但 PR 触及 supervised autonomy 审批机制，属于小范围高价值修复。

### 6.3 功能扩展 / 低频维护阶段

代表项目：**PicoClaw、LobsterAI**

这类项目今日主要是 Provider 扩展，社区讨论较少。它们仍有演进信号，但暂未暴露复杂运行时压力。

### 6.4 静默阶段

代表项目：**IronClaw、TinyClaw、Moltis、ZeptoClaw**

过去 24 小时无活动，无法判断其真实成熟度。对技术选型者而言，这类项目需要结合更长周期数据评估维护连续性。

---

## 7. 值得关注的趋势信号

### 7.1 Agent 系统正在服务化、常驻化

OpenClaw、Hermes Agent、NanoClaw 均暴露出 sleep/wake、Gateway PID、update relaunch、launchd/systemd、webhook server、runtime publication 等问题。  
这说明个人 AI 助手正在从“命令行工具”变成“长期运行的个人服务”。

**开发者启示：**  
设计 Agent 时必须优先考虑生命周期管理、崩溃恢复、状态重建、后台服务升级和可观测性。

---

### 7.2 Gateway / Runtime 的并发能力成为核心竞争力

OpenClaw 的大量 PR 指向 Gateway 去阻塞，Hermes 和 ZeroClaw 也在处理 runtime、daemon、RPC、observer event 等问题。  
用户已经不满足于单会话顺序交互，而是要求多个聊天、多个 agent、多个客户端同时稳定运行。

**开发者启示：**  
Agent runtime 应避免主线程执行重 I/O、数据库写入、大对象序列化，应采用异步队列、delta streaming、worker offload 和路径级锁。

---

### 7.3 安全模型从“权限开关”走向“全生命周期一致性”

ZeroClaw 今日大量安全 Issue 指向同一问题：授权不能只在入口检查一次，而要贯穿 session resume、queued operation、SOP execution、tool selector、workspace confinement。  
NullClaw、OpenClaw 也分别在命令审批和 owner 管理 key/config 方面触及类似边界。

**开发者启示：**  
Agent 权限系统需要：

- principal ownership；
- session-bound authorization；
- 权限撤销后的重新校验；
- 工具级权限；
- 审批状态持久化；
- 审计日志。

---

### 7.4 工具调用正在成为 Agent 可靠性的主要风险源

CoPaw 的 `grep_search` 污染会话、OpenClaw 的 `memory_search` 参数路径不一致、ZeroClaw 的 browser/search 被映射为 shell、并行 file_edit 丢失编辑，说明工具层问题会直接破坏 Agent 行为。

**开发者启示：**  
工具系统应建立强 contract：

- 输入 schema normalization；
- 输出过滤；
- 内部文件默认排除；
- 二进制检测；
- 并发冲突检测；
- 明确错误返回；
- 工具权限与审计隔离。

---

### 7.5 Provider 生态继续扩张，但兼容性细节成为负担

NanoBot、PicoClaw、LobsterAI 均新增 LLM Gateway Provider；CoPaw 和 NanoClaw 则暴露了 Gemini、OpenCode、Claude、OpenAI-compatible endpoint 的细节兼容问题。  
Provider 扩展已不只是添加 base URL，还涉及 reasoning 参数、tool calling 格式、上下文窗口、system prompt preset、模型 ID、签名字段等。

**开发者启示：**  
Provider abstraction 需要从“API 兼容”升级为“能力元数据驱动”，包括：

- tool calling dialect；
- reasoning / thinking 参数；
- context window；
- stream 格式；
- function call state；
- cost / rate limit；
- model capability catalog。

---

### 7.6 Human-in-the-loop 会成为自主智能体的基础能力

ZeroClaw 的 durable human-question primitive、NullClaw 的 `/approve` 修复、Hermes 的 approval settlement、OpenClaw 的 owner chat 管理配置，都指向同一趋势：Agent 需要在关键风险点主动暂停并等待人类决策。

**开发者启示：**  
未来 Agent runtime 应原生支持：

- 持久审批请求；
- 多端通知；
- 审批恢复；
- 审批超时策略；
- 风险解释；
- 审批审计。

---

### 7.7 消息送达和任务完成语义正在产品化

OpenClaw 的 Telegram final answer 未送达、Hermes 的 Cron 静默失败、CoPaw 的 foreground timeout 误报、ZeroClaw 的 outbound delivery receipts，都说明用户不再接受“任务执行了但不知道结果”。

**开发者启示：**  
Agent 系统需要把 delivery receipt、incident、completion event、failure notification 作为一等能力，而不是日志副产品。

---

## 总结判断

从今日数据看，生态的领先项目已经进入 **生产工程化竞争阶段**。  
**OpenClaw** 在规模、活跃度和架构深度上处于第一梯队，尤其在 Gateway 并发和长期运行稳定性方面信号最强；**Hermes Agent** 在 Desktop、Cron 和插件生态上压力最大；**ZeroClaw** 则明显向安全强化型 runtime 演进；**NanoClaw / CoPaw** 分别在本地部署和工具链体验上快速迭代。  
对技术决策者而言，选型时不应只看模型支持数量，而应重点评估：runtime 恢复能力、更新链路、工具安全、权限模型、消息送达、Provider 兼容和社区修复吞吐。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报  
**日期：2026-09-26**  
**项目：HKUDS/nanobot**

---

## 1. 今日速览

过去 24 小时，NanoBot 没有新的 Issue 更新，但 Pull Request 活跃度较高，共有 **5 条 PR 更新**，其中 **4 条仍在待合并状态，1 条已关闭**。今日工作重点集中在 **稳定性修复、WebUI 体验改进、MCP 工具发现、渠道兼容性以及新增模型供应商支持**。  
整体来看，项目当前处于较健康的维护节奏：虽然社区 Issue 讨论较少，但贡献者持续提交针对真实使用场景的修复与功能扩展。短期内，下一版本很可能以 **Bug 修复 + Provider 扩展 + WebUI 体验优化** 为主要方向。

---

## 2. 项目进展

### 已关闭 PR

#### [PR #5912 - fix(webui): preserve composer drafts across navigation and reloads](https://github.com/HKUDS/nanobot/pull/5912)  
- **状态**：CLOSED  
- **作者**：chengyongru  
- **标签**：bug, regression, webui, fix, test, priority: p2  
- **更新时间**：2026-09-25  

该 PR 关注 WebUI 中的一个用户体验回归问题：用户在切换会话或刷新页面时，未完成的输入内容会丢失。PR 方案是将草稿按会话保存在 `localStorage` 中，并在刷新或切换后恢复文本、会话引用以及引用上下文。

需要注意的是，该 PR 当前状态为 **Closed**，数据中未明确标识是否已合并，因此不能确定该修复是否已经进入主分支。即便如此，它反映出维护者或贡献者正在关注 WebUI 的连续编辑体验，尤其是多会话场景下的草稿保护问题。

**影响评估**：  
如果最终被合并或以其他形式采纳，该改动将明显改善 WebUI 的可用性，减少用户因页面刷新或会话切换导致的输入丢失。

---

## 3. 社区热点

今日没有 Issue 更新，也没有可用的评论数或反应数数据，因此无法从评论量、点赞数等维度识别真正的社区热点。不过，从 PR 类型和标签来看，以下几个方向值得关注：

### 1. MCP 工具发现完整性  
#### [PR #5916 - fix(mcp): load all pages of server tools before registration](https://github.com/HKUDS/nanobot/pull/5916)  
- **状态**：OPEN  
- **作者**：KailBug  
- **标签**：bug, fix, test, priority: p2  

该 PR 修复 MCP server 在 `tools/list` 返回分页结果时，NanoBot 只注册第一页工具的问题。此前即使用户通过 `enabledTools` 显式选择后续页中的工具，这些工具仍不可用。

**背后诉求**：  
随着 MCP 工具生态扩展，单个 server 提供大量工具的场景会越来越常见。完整加载分页工具列表是保障 MCP 集成可靠性的基础能力。

---

### 2. WebUI 草稿持久化  
#### [PR #5912 - fix(webui): preserve composer drafts across navigation and reloads](https://github.com/HKUDS/nanobot/pull/5912)  
- **状态**：CLOSED  
- **作者**：chengyongru  
- **标签**：bug, regression, webui, fix, test, priority: p2  

该 PR 体现出用户对 WebUI 作为日常 AI 助手入口的连续性要求：输入框内容不应因刷新、跳转或会话切换而丢失。

**背后诉求**：  
用户在长文本、多轮上下文、跨会话操作中需要更稳定的编辑体验。

---

### 3. 新 LLM Gateway Provider 支持  
#### [PR #5915 - feat(providers): add Cheaper Inference as a named gateway provider](https://github.com/HKUDS/nanobot/pull/5915)  
- **状态**：OPEN  
- **作者**：aiapienthusiast  
- **标签**：documentation, provider, webui, new-provider, feature, test, priority: p2  

该 PR 新增 Cheaper Inference 作为内置网关型 provider。Cheaper Inference 是 OpenAI-compatible 的 LLM gateway，使用裸模型 ID，例如 `gpt-5.4-mini`。

**背后诉求**：  
用户希望在 NanoBot 中更方便地接入低成本、多模型路由服务。该类 Provider 扩展通常意味着项目正在增强其模型供应商适配能力。

---

## 4. Bug 与稳定性

今日没有新的 Issue 报告，但有多条 Bug 修复 PR，说明稳定性维护仍较活跃。按影响范围和潜在严重程度排序如下：

### 高优先级：MCP 工具分页加载不完整  
#### [PR #5916 - fix(mcp): load all pages of server tools before registration](https://github.com/HKUDS/nanobot/pull/5916)  
- **状态**：OPEN  
- **严重程度**：中高  
- **影响模块**：MCP server integration  
- **是否已有 fix PR**：是  

问题表现为：当 MCP server 的 `tools/list` 接口分页返回工具时，NanoBot 只注册第一页工具，导致后续页面中的工具不可用。

**影响**：  
这会直接影响 MCP 工具调用能力，尤其是大型 MCP server 或工具数量较多的场景。

---

### 中优先级：WebUI 会话切换或刷新导致草稿丢失  
#### [PR #5912 - fix(webui): preserve composer drafts across navigation and reloads](https://github.com/HKUDS/nanobot/pull/5912)  
- **状态**：CLOSED  
- **严重程度**：中  
- **影响模块**：WebUI  
- **是否已有 fix PR**：是，但状态为 Closed，是否合并未知  

问题表现为：切换对话或刷新 WebUI 时，未发送的输入内容会被丢弃。

**影响**：  
对普通用户体验影响明显，尤其是在撰写长消息、带引用上下文或频繁切换会话时。

---

### 中优先级：Napcat 图片 `file_size` 非数字时消息被丢弃  
#### [PR #5914 - fix(napcat): keep a message whose image declares a non-numeric file_size](https://github.com/HKUDS/nanobot/pull/5914)  
- **状态**：OPEN  
- **作者**：Lesereingrape  
- **标签**：bug, channel, fix, test, priority: p2  
- **严重程度**：中  
- **影响模块**：Napcat channel / 图片消息解析  
- **是否已有 fix PR**：是  

该 PR 修复 Napcat 图片消息中 `file_size` 字段为非数字时，消息被提前拒绝的问题。

**影响**：  
如果某些 Napcat 图片元数据不规范，当前逻辑可能导致整条图片消息无法被正常处理。该修复有助于增强渠道兼容性和容错能力。

---

### 中低优先级：环境变量解析失败导致 Agent 抛错  
#### [PR #5913 - fix(agent): ignore an unparsable NANOBOT_MAX_CONCURRENT_REQUESTS instead of raising](https://github.com/HKUDS/nanobot/pull/5913)  
- **状态**：OPEN  
- **作者**：Lesereingrape  
- **标签**：bug, fix, test, priority: p2  
- **严重程度**：中低  
- **影响模块**：Agent runtime / 配置解析  
- **是否已有 fix PR**：是  

该 PR 将 `NANOBOT_MAX_CONCURRENT_REQUESTS` 的解析改为受保护的解析逻辑。若环境变量为空或不可解析，将退回到文档中描述的默认行为，即不限制并发，而不是直接抛出异常。

**影响**：  
这类问题常见于容器化部署、CI/CD 注入环境变量或用户误配置场景。修复后可提升部署鲁棒性。

---

## 5. 功能请求与路线图信号

### 新增 Cheaper Inference Provider  
#### [PR #5915 - feat(providers): add Cheaper Inference as a named gateway provider](https://github.com/HKUDS/nanobot/pull/5915)  
- **状态**：OPEN  
- **类型**：新功能 / Provider 扩展  
- **可能进入下一版本**：较高  

该 PR 表明 NanoBot 正在继续扩展对不同 LLM 网关和模型供应商的原生支持。Cheaper Inference 作为 OpenAI-compatible gateway，可以降低用户接入成本，并增加模型路由选择。

**路线图信号**：  
- 项目将继续强化多 Provider 生态；
- OpenAI-compatible 网关仍是优先适配对象；
- WebUI、文档、测试同步更新，说明该功能具备进入正式版本的可能性。

---

### MCP 工具体系增强  
#### [PR #5916 - fix(mcp): load all pages of server tools before registration](https://github.com/HKUDS/nanobot/pull/5916)  

虽然该 PR 是 Bug 修复，但它也反映出项目对 MCP 工具生态的持续投入。完整支持分页工具发现，是后续支持更复杂 MCP server 的前提。

**路线图信号**：  
- MCP 集成正在从“可用”走向“可靠”；
- 大规模工具注册、选择性启用工具、server 能力发现等场景可能会继续被优化。

---

## 6. 用户反馈摘要

今日没有新的 Issue 评论数据，因此无法提炼直接来自用户评论的反馈。不过，从 PR 描述可以间接归纳出以下使用痛点：

1. **WebUI 输入安全感不足**  
   - 相关 PR：[PR #5912](https://github.com/HKUDS/nanobot/pull/5912)  
   - 用户在切换会话或刷新页面时可能丢失未发送内容，这会影响长文本输入和多会话操作体验。

2. **MCP 工具不可见或不可用**  
   - 相关 PR：[PR #5916](https://github.com/HKUDS/nanobot/pull/5916)  
   - 对使用大量 MCP 工具的用户来说，工具分页未完整加载会造成“明明配置了工具却无法使用”的困惑。

3. **渠道数据不规范导致消息处理失败**  
   - 相关 PR：[PR #5914](https://github.com/HKUDS/nanobot/pull/5914)  
   - Napcat 等外部渠道可能返回非标准字段，NanoBot 需要更强的兼容和容错能力。

4. **部署配置容错不足**  
   - 相关 PR：[PR #5913](https://github.com/HKUDS/nanobot/pull/5913)  
   - 环境变量为空或格式异常时不应直接导致 Agent 启动或运行失败。

---

## 7. 待处理积压

今日没有发现长期未响应的 Issue 或 PR 数据。当前仍处于待处理状态的 PR 都是 2026-09-25 创建或更新，属于新增积压，建议维护者优先关注以下几项：

### 建议优先 Review

1. [PR #5916 - fix(mcp): load all pages of server tools before registration](https://github.com/HKUDS/nanobot/pull/5916)  
   - 原因：影响 MCP 工具完整发现，可能导致用户配置工具后无法调用。

2. [PR #5913 - fix(agent): ignore an unparsable NANOBOT_MAX_CONCURRENT_REQUESTS instead of raising](https://github.com/HKUDS/nanobot/pull/5913)  
   - 原因：提升部署容错性，改动范围可能较小，适合快速合并。

3. [PR #5914 - fix(napcat): keep a message whose image declares a non-numeric file_size](https://github.com/HKUDS/nanobot/pull/5914)  
   - 原因：增强渠道兼容性，避免因外部数据格式异常导致消息丢失。

4. [PR #5915 - feat(providers): add Cheaper Inference as a named gateway provider](https://github.com/HKUDS/nanobot/pull/5915)  
   - 原因：属于功能扩展，建议重点检查 provider 配置、文档、测试覆盖以及模型 ID 兼容性。

---

## 健康度评估

- **开发活跃度**：中高  
- **Issue 讨论活跃度**：低  
- **PR 维护活跃度**：高  
- **稳定性趋势**：向好  
- **短期发布信号**：偏向 Bugfix + Provider 扩展版本  

总体而言，NanoBot 今日没有明显社区争议或大规模故障信号，但维护活动集中且实用。多个 PR 都围绕真实用户使用中的边界问题展开，说明项目正在稳步提升稳定性、兼容性和生产可用性。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
日期：2026-09-26  
仓库：NousResearch/hermes-agent

---

## 1. 今日速览

过去 24 小时 Hermes Agent 活跃度非常高：Issues 更新 50 条，其中 49 条仍处于新开或活跃状态，仅 1 条关闭；PR 更新 50 条，其中 45 条待合并，5 条已合并或关闭。今日没有新版本发布，说明项目仍处于高频修复与集成阶段，而非正式发版窗口。

今日问题集中在 **安装/更新链路、Gateway 稳定性、Cron 调度可靠性、Desktop 大会话处理、认证刷新、会话压缩与多 Profile/Multiplex 场景**。从 PR 侧看，维护者和社区已经快速响应了若干高优先级问题，尤其是 Cron 失败告警、Artifacts 大会话索引、Git partial-clone 更新失败、审批回调丢失等。整体来看，项目健康度表现为“高活跃、高修复吞吐，但稳定性债务明显上升”。

---

## 2. 版本发布

今日无新版本发布。  
最新 Releases：无。

---

## 3. 项目进展

> 今日可见的关闭/合并 PR 中，主要是重复提交清理和自动格式化；真正功能性修复大多仍处于 Open 状态，等待 CI、Review 或合并。

### 已关闭 / 已处理 PR

- **关闭重复 Plugin Catalog 提交：smartmoney-cub**
  - PR：[#123427](https://github.com/NousResearch/hermes-agent/pull/123427)
  - 状态：Closed，标记为 duplicate
  - 说明：该社区插件目录提交被 #123396 取代，避免重复 catalog entry。

- **关闭重复 Plugin Catalog 提交：smartmoney-cub**
  - PR：[#123419](https://github.com/NousResearch/hermes-agent/pull/123419)
  - 状态：Closed
  - 说明：同样被 #123396 取代，维护者正在合并到更正后的插件提交路径。

- **自动格式化修复 PR**
  - PR：[#123423](https://github.com/NousResearch/hermes-agent/pull/123423)
  - 状态：Closed
  - 说明：由 lint/format workflow 自动生成，用于 JS 代码格式修复；若 CI 或 main 分支移动失败，会自动关闭并重新生成。

### 今日重要待合并修复进展

- **Cron 外部 worker 派发失败应产生 incident 与失败通知**
  - PR：[#123433](https://github.com/NousResearch/hermes-agent/pull/123433)
  - 关联 Issue：[#123401](https://github.com/NousResearch/hermes-agent/issues/123401)
  - 影响：修复 Cron job 派发失败时“账本记录失败但用户完全无感知”的问题。
  - 重要性：P1，直接影响自动化任务可靠性和可观测性。

- **Cron dispatch 失败进入 incident path**
  - PR：[#123432](https://github.com/NousResearch/hermes-agent/pull/123432)
  - 关联 Issue：[#123401](https://github.com/NousResearch/hermes-agent/issues/123401)
  - 说明：与 #123433 目标相似，存在并行修复，需要维护者决策保留哪条实现。

- **Desktop Artifacts 改为分页索引 transcript**
  - PR：[#123438](https://github.com/NousResearch/hermes-agent/pull/123438)
  - 关联 Issue：[#123414](https://github.com/NousResearch/hermes-agent/issues/123414)
  - 影响：避免 Desktop Artifacts tab 因单个超大 session transcript 超过 32MB renderer safe-load 限制而静默丢失索引。

- **Git partial-clone 损坏恢复**
  - PR：[#123417](https://github.com/NousResearch/hermes-agent/pull/123417)
  - 关联 Issue：[#123324](https://github.com/NousResearch/hermes-agent/issues/123324)
  - 影响：修复 macOS/Windows source update 中 git partial-clone pack 损坏导致更新中断的问题。

- **Approval settlement 支持多个订阅者**
  - PR：[#123420](https://github.com/NousResearch/hermes-agent/pull/123420)
  - 关联 Issue：[#123395](https://github.com/NousResearch/hermes-agent/issues/123395)
  - 影响：避免后注册的 settle hook 覆盖平台 adapter 的回调，保障审批结果能正确回传。

- **OS 拖拽图片在 Desktop 中显示为缩略图**
  - PR：[#123410](https://github.com/NousResearch/hermes-agent/pull/123410)
  - 关联 Issue：[#123368](https://github.com/NousResearch/hermes-agent/issues/123368)
  - 影响：改善 Desktop 消息 UI，避免用户看到裸 Markdown blob URL。

---

## 4. 社区热点

### 1. Windows update 后 Gateway PID 丢失，CLI 无法连接 Gateway

- Issue：[#123430](https://github.com/NousResearch/hermes-agent/issues/123430)
- 评论数：2
- 标签：`type/bug`, `comp/cli`, `comp/gateway`, `platform/windows`, `area/install-update`, `P2`
- 用户诉求：Windows 用户在 `hermes update --replace` 后，重启路径没有留下 `gateway.pid`，导致下一次 update 直接中止，CLI 也无法再连接 Gateway。
- 分析：这是典型的安装/更新状态机问题，影响用户自助恢复能力。由于同时涉及 Windows、Gateway、CLI 与 updater relaunch，属于高风险兼容性问题。

### 2. macOS Webhook server 拒绝所有连接

- Issue：[#123327](https://github.com/NousResearch/hermes-agent/issues/123327)
- 评论数：2
- 标签：`type/bug`, `comp/gateway`, `platform/webhook`, `P2`
- 用户诉求：Gateway webhook server 在 macOS 上对每个连接报 `setsockopt SO_KEEPALIVE: invalid argument` 并关闭连接，客户端看到 EOF。
- 分析：这会破坏 Tincan relay wake POST 与其他 webhook delivery，属于消息投递链路的基础故障。当前未见对应 fix PR。

### 3. macOS source update 因 Git partial-clone assertion 中断

- Issue：[#123324](https://github.com/NousResearch/hermes-agent/issues/123324)
- 评论数：2
- 标签：`type/bug`, `comp/cli`, `area/install-update`, `P2`
- 对应 PR：[#123417](https://github.com/NousResearch/hermes-agent/pull/123417)
- 用户诉求：通过 Desktop updater 更新 managed source install 时，`git fetch` 在依赖准备或 Desktop rebuild 前崩溃。
- 分析：更新链路问题在今日多次出现，说明 managed/source install 的恢复能力仍是关键稳定性短板。

### 4. 智能模型路由需求：per-turn model router

- Issue：[#123388](https://github.com/NousResearch/hermes-agent/issues/123388)
- 评论数：1
- 标签：`type/feature`, `comp/agent`, `area/config`, `P3`, `needs-decision`
- 用户诉求：希望 Hermes 能按每轮任务需求自动选择模型，而不是固定 session model。
- 分析：该需求反映高级用户正在使用多个 provider、本地 relay 与 hosted relay，希望 Hermes 从“模型选择器”演进为“任务路由器”。这可能成为 Agent 调度能力的路线图信号。

---

## 5. Bug 与稳定性

### P1：高优先级 / 影响任务可靠性

- **Cron dispatch 失败无 incident、无失败通知**
  - Issue：[#123401](https://github.com/NousResearch/hermes-agent/issues/123401)
  - Fix PR：[#123433](https://github.com/NousResearch/hermes-agent/pull/123433)、[#123432](https://github.com/NousResearch/hermes-agent/pull/123432)
  - 影响：外部 worker handoff 失败后，只记录执行失败，不进入用户可见的 incident/notification 路径。
  - 风险：自动化任务静默失败，用户无法及时发现。

- **PM managed runtime 下 Cron external worker 因 ruamel 缺失崩溃**
  - Issue：[#123400](https://github.com/NousResearch/hermes-agent/issues/123400)
  - Fix PR：未见明确对应 PR
  - 影响：systemd-managed gateway 派发的 Cron job 在启动前失败。
  - 风险：托管运行时迁移后 Cron 功能大面积不可用。

- **持续 overload escalation 跨 fresh agents 持久化**
  - PR：[#123415](https://github.com/NousResearch/hermes-agent/pull/123415)
  - 关联 Issue：[#123167](https://github.com/NousResearch/hermes-agent/issues/123167)
  - 影响：修复 summary provider 持续过载时，fresh agent 重试计数丢失导致会话压缩/状态恢复异常的问题。

### P2：中高优先级 / 影响更新、会话、消息投递

- **Windows updater relaunch 后缺失 gateway.pid**
  - Issue：[#123430](https://github.com/NousResearch/hermes-agent/issues/123430)
  - Fix PR：未见明确对应 PR
  - 影响：后续 update 中止，CLI 无法触达 Gateway。

- **macOS webhook server 拒绝连接**
  - Issue：[#123327](https://github.com/NousResearch/hermes-agent/issues/123327)
  - Fix PR：未见明确对应 PR
  - 影响：Webhook delivery 与 Tincan relay wake 失败。

- **Git partial-clone assertion 导致 source update 失败**
  - Issue：[#123324](https://github.com/NousResearch/hermes-agent/issues/123324)
  - Fix PR：[#123417](https://github.com/NousResearch/hermes-agent/pull/123417)
  - 影响：macOS source update 中断，且 Windows 也有类似 partial clone pack 风险。

- **Multiplex migration preflight 错误导入 parked profiles 插件**
  - Issue：[#123386](https://github.com/NousResearch/hermes-agent/issues/123386)
  - Fix PR：未见明确对应 PR
  - 影响：`gateway.parked` 被忽略，多 profile 迁移时可能触发不应加载的插件。

- **Context compression fallback 状态可能长期锁死**
  - Issue：[#123362](https://github.com/NousResearch/hermes-agent/issues/123362)
  - Fix PR：未见明确对应 PR
  - 影响：辅助 compression model 权限或额度错误后，fallback 状态缺少恢复路径。

- **Desktop Voice Chat barge-in utterance 被静默丢弃**
  - Issue：[#123357](https://github.com/NousResearch/hermes-agent/issues/123357)
  - Fix PR：未见明确对应 PR
  - 影响：用户插话没有进入 agent，表现为“助手不再听”。

- **LINE 带附件回复消耗 metered push**
  - Issue：[#123435](https://github.com/NousResearch/hermes-agent/issues/123435)
  - Fix PR：未见明确对应 PR
  - 影响：文本先消耗 single-use reply token，附件只能走 push，带来额外成本。

- **Remote sync-back copy 失败后截断 host 文件**
  - Issue：[#123354](https://github.com/NousResearch/hermes-agent/issues/123354)
  - Fix PR：未见明确对应 PR
  - 影响：远程同步回写失败可能破坏本地完整文件。

- **Iteration-limit summary 请求被计费但未计入 session usage/cost**
  - Issue：[#123352](https://github.com/NousResearch/hermes-agent/issues/123352)
  - Fix PR：未见明确对应 PR
  - 影响：使用量与账单记录不一致。

- **Fallback 或 `/model --once` restore 后 context window 回退**
  - Issue：[#123350](https://github.com/NousResearch/hermes-agent/issues/123350)
  - Fix PR：未见明确对应 PR
  - 影响：主模型上下文窗口恢复为启动值，可能影响压缩阈值与长上下文体验。

- **Electron update 失败**
  - Issue：[#123387](https://github.com/NousResearch/hermes-agent/issues/123387)
  - Fix PR：未见明确对应 PR
  - 影响：中国大陆网络/代理场景下 Desktop auto-update 失败。

- **`hermes update` 与 launchd-restarted gateways 竞态**
  - Issue：[#123376](https://github.com/NousResearch/hermes-agent/issues/123376)
  - Fix PR：未见明确对应 PR
  - 影响：可能造成 mixed desktop build 与永久 “Restart to finish update” banner。

### P3：体验、边界场景与功能正确性

- **Desktop OS 拖拽图片预览显示原始 Markdown**
  - Issue：[#123368](https://github.com/NousResearch/hermes-agent/issues/123368)
  - Fix PR：[#123410](https://github.com/NousResearch/hermes-agent/pull/123410)

- **Desktop session rename 成功但侧边栏行不刷新**
  - Issue：[#123337](https://github.com/NousResearch/hermes-agent/issues/123337)
  - Fix PR：未见明确对应 PR

- **Config UI round-trip 损坏 19 位平台 ID**
  - Issue：[#123439](https://github.com/NousResearch/hermes-agent/issues/123439)
  - Fix PR：未见明确对应 PR
  - 风险：JavaScript number 精度问题会静默破坏平台 ID。

- **Desktop quit 时误报 Restarting desktop connection**
  - Issue：[#123437](https://github.com/NousResearch/hermes-agent/issues/123437)
  - Fix PR：未见明确对应 PR

- **Max iterations summarizing 时 NoneType 崩溃**
  - Issue：[#123436](https://github.com/NousResearch/hermes-agent/issues/123436)
  - Fix PR：未见明确对应 PR

- **PyInstaller Windows CN 构建中 DDGS worker 启动失败**
  - Issue：[#123399](https://github.com/NousResearch/hermes-agent/issues/123399)
  - Fix PR：未见明确对应 PR

- **Ollama local models 在 Cron 中伪造 tool-call pseudocode**
  - Issue：[#123398](https://github.com/NousResearch/hermes-agent/issues/123398)
  - Fix PR：未见明确对应 PR

- **Kanban Decompose/Specify 因 UnscopedSecretError 失败**
  - Issue：[#123372](https://github.com/NousResearch/hermes-agent/issues/123372)
  - Fix PR：未见明确对应 PR

---

## 6. 功能请求与路线图信号

- **Per-turn smart model router**
  - Issue：[#123388](https://github.com/NousResearch/hermes-agent/issues/123388)
  - 诉求：按每轮任务复杂度、工具需求、成本或 provider 状态自动选择模型。
  - 路线图信号：反映 Hermes 用户正在走向多模型、多 provider、混合本地/云端部署；若采纳，可能推动 Agent runtime 引入 classifier-agnostic routing controller。

- **Windows Desktop 离线安装包**
  - Issue：[#123426](https://github.com/NousResearch/hermes-agent/issues/123426)
  - 诉求：提供单个 `.exe` 离线安装包，适用于内网或无公网环境。
  - 路线图信号：企业/内网用户需求增强，安装链路需要从 online bootstrapper 扩展到 fully bundled installer。

- **NVIDIA EGL fallback 应用户可见、可控制**
  - Issue：[#123422](https://github.com/NousResearch/hermes-agent/issues/123422)
  - 诉求：Desktop 在 fallback 关闭 GPU acceleration 时不应静默发生，应有 UI 提示和设置项。
  - 路线图信号：Desktop 可观测性和用户控制权正在成为关注点，尤其是 GPU/图形驱动兼容性场景。

- **Kanban done 状态必须绑定 landed evidence**
  - Issue：[#123428](https://github.com/NousResearch/hermes-agent/issues/123428)
  - 对应 PR：[#123429](https://github.com/NousResearch/hermes-agent/pull/123429)
  - 诉求：避免未真正落地的工作被标记为 done，并将 stranded ready card 路由给 owner。
  - 纳入可能性：高。已有明确修复 PR，且属于自动化任务正确性增强。

- **Plugin Catalog：smartmoney-cub 社区插件**
  - PR：[#123427](https://github.com/NousResearch/hermes-agent/pull/123427)、[#123419](https://github.com/NousResearch/hermes-agent/pull/123419)
  - 状态：重复提交已关闭，合并路径转向 #123396。
  - 路线图信号：社区插件生态仍在扩展，但 catalog 提交流程需要去重和 pin 规范。

---

## 7. 用户反馈摘要

- **安装与更新链路仍是最大痛点**
  - 相关 Issue：[#123430](https://github.com/NousResearch/hermes-agent/issues/123430)、[#123324](https://github.com/NousResearch/hermes-agent/issues/123324)、[#123376](https://github.com/NousResearch/hermes-agent/issues/123376)、[#123387](https://github.com/NousResearch/hermes-agent/issues/123387)、[#123424](https://github.com/NousResearch/hermes-agent/issues/123424)
  - 用户反馈：Windows、macOS、source install、Desktop auto-update、代理网络、launchd/systemd 管理环境都有失败报告。用户期望 updater 具备更好的原子性、重试、回滚和自愈能力。

- **自动化任务需要“失败可见”**
  - 相关 Issue：[#123401](https://github.com/NousResearch/hermes-agent/issues/123401)、[#123400](https://github.com/NousResearch/hermes-agent/issues/123400)
  - 用户反馈：Cron job 静默失败不可接受。自动化功能的价值依赖可靠通知、incident 记录和明确失败原因。

- **Desktop 用户重视即时反馈一致性**
  - 相关 Issue：[#123368](https://github.com/NousResearch/hermes-agent/issues/123368)、[#123337](https://github.com/NousResearch/hermes-agent/issues/123337)、[#123437](https://github.com/NousResearch/hermes-agent/issues/123437)、[#123414](https://github.com/NousResearch/hermes-agent/issues/123414)
  - 用户反馈：图片预览、重命名刷新、退出日志、Artifacts 索引等问题虽然不一定阻塞核心 Agent 能力，但会显著削弱用户对 Desktop 稳定性的信任。

- **多 Profile / Multiplex / Secret Scope 边界仍复杂**
  - 相关 Issue：[#123386](https://github.com/NousResearch/hermes-agent/issues/123386)、[#123372](https://github.com/NousResearch/hermes-agent/issues/123372)
  - 用户反馈：高级部署场景中，profile scope、parked profile、secret scope 与 gateway multiplex 的交互容易触发边界 bug。

- **成本与计费透明度受到关注**
  - 相关 Issue：[#123352](https://github.com/NousResearch/hermes-agent/issues/123352)、[#123435](https://github.com/NousResearch/hermes-agent/issues/123435)
  - 用户反馈：用户希望每一次模型调用、summary、平台推送都能被正确归因、计费和展示，避免隐性成本。

---

## 8. 待处理积压

> 当前数据仅覆盖过去 24 小时，无法判断“长期未响应”的历史积压；以下是今日新出现但尚未看到明确修复 PR、且建议维护者优先 triage 的高风险项。

- **Windows updater relaunch 缺失 gateway.pid**
  - Issue：[#123430](https://github.com/NousResearch/hermes-agent/issues/123430)
  - 建议优先级：高
  - 原因：影响 Windows 用户更新后恢复能力，且可能造成 CLI/Gateway 断连。

- **macOS webhook server 拒绝所有连接**
  - Issue：[#123327](https://github.com/NousResearch/hermes-agent/issues/123327)
  - 建议优先级：高
  - 原因：消息投递路径基础故障，影响 Tincan relay 与 webhook 生态。

- **PM runtime Cron worker 缺少 ruamel**
  - Issue：[#123400](https://github.com/NousResearch/hermes-agent/issues/123400)
  - 建议优先级：高
  - 原因：与 #123401 共同指向 Cron 子系统可靠性问题，可能影响所有 systemd-managed gateway 用户。

- **Voice Chat barge-in utterance 静默丢失**
  - Issue：[#123357](https://github.com/NousResearch/hermes-agent/issues/123357)
  - 建议优先级：中高
  - 原因：用户语音输入丢失且无反馈，严重影响语音交互可信度。

- **Config UI 损坏 19 位平台 ID**
  - Issue：[#123439](https://github.com/NousResearch/hermes-agent/issues/123439)
  - 建议优先级：中高
  - 原因：静默数据损坏，尤其影响 Telegram/Discord/LINE 等大整数 ID 场景。

- **Remote sync-back 截断 host 文件**
  - Issue：[#123354](https://github.com/NousResearch/hermes-agent/issues/123354)
  - 建议优先级：中高
  - 原因：存在数据破坏风险，应考虑原子写入、临时文件和 copy 成功后 rename。

- **Multiplex migration preflight 忽略 parked profiles**
  - Issue：[#123386](https://github.com/NousResearch/hermes-agent/issues/123386)
  - 建议优先级：中
  - 原因：多 profile 用户部署复杂，迁移阶段不应加载已 parked profile 的插件。

---

## 总体健康度判断

Hermes Agent 今日表现出非常高的社区活跃度和修复响应速度，但稳定性压力显著。最值得关注的风险集中在三类：**更新/安装原子性不足、Cron/Gateway 消息投递链路可观测性不足、Desktop 大状态/大会话处理边界不足**。若 #123401、#123324、#123414、#123395 等问题的修复 PR 能快速合并，短期稳定性会明显改善；但 Windows/macOS updater、Webhook、Voice Chat 与 Config 数据精度问题仍需要维护者尽快跟进。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报  
**日期：2026-09-26**  
**仓库：** [sipeed/picoclaw](https://github.com/sipeed/picoclaw)

## 1. 今日速览

过去 24 小时内，PicoClaw 项目共有 **1 条 Issue 更新**、**1 条 Pull Request 更新**，暂无新版本发布。整体活跃度处于 **低到中等水平**：社区有新的 Bug 反馈，也有新的功能扩展 PR 提交，但尚未出现合并、关闭或集中讨论。今日新增 PR 聚焦于 **LLM Provider 扩展**，说明项目仍在围绕模型接入生态持续演进。与此同时，CLA 签名检测问题可能影响贡献流程，需要维护者尽快确认，以免阻塞后续 PR 合并。

---

## 2. 项目进展

过去 24 小时内暂无已合并或关闭的 Pull Request。

### 待推进 PR

#### [PR #3393 feat(provider): add Cheaper Inference provider](https://github.com/sipeed/picoclaw/pull/3393)  
- **状态：** Open  
- **作者：** aiapienthusiast  
- **创建时间：** 2026-09-25  
- **评论数：** 暂无数据  
- **反应数：** 👍 0  

该 PR 新增 **Cheaper Inference** 作为 OpenAI-compatible provider。根据描述，Cheaper Inference 是一个兼容 OpenAI API 的 LLM 网关，可通过一个 API Key 接入多个模型实验室，并主打较低推理成本。

**潜在影响：**
- 扩展 PicoClaw 的模型供应商支持范围。
- 降低用户在多模型调用场景下的接入与成本门槛。
- 如果实现质量稳定，可能成为下一版本中的 provider 扩展项。

**当前进展判断：**
- 该 PR 仍处于待审查状态，尚未合并。
- 今日项目功能层面尚未产生实际落地变更，但该 PR 显示出社区对更多 LLM 路由与低成本推理服务的需求。

---

## 3. 社区热点

今日社区讨论热度整体较低，新增 Issue 和 PR 均暂无明显评论或反应积累。

### 今日关注项

#### [Issue #3392 [BUG] CLAassistant does not detect signature](https://github.com/sipeed/picoclaw/issues/3392)  
- **状态：** Open  
- **作者：** XenonR  
- **创建时间：** 2026-09-25  
- **评论数：** 0  
- **反应数：** 👍 0  

该 Issue 反馈 **CLAassistant 无法检测 CLA 签名**，并指向了相关 PR [#3381](https://github.com/sipeed/picoclaw/pull/3381)。

**背后诉求分析：**
- 贡献者已经完成或认为已完成 CLA 签署，但自动化检查未识别。
- 这类问题通常不直接影响运行时功能，但会影响贡献流程、PR 合并效率和社区体验。
- 如果 CLA 检测失败是系统性问题，可能会阻塞多个外部贡献者的 PR。

#### [PR #3393 feat(provider): add Cheaper Inference provider](https://github.com/sipeed/picoclaw/pull/3393)  
该 PR 虽暂无讨论数据，但从功能方向看，反映出用户希望 PicoClaw 能支持更多 OpenAI-compatible 网关和低成本模型路由服务。

---

## 4. Bug 与稳定性

### 中等优先级

#### [Issue #3392 [BUG] CLAassistant does not detect signature](https://github.com/sipeed/picoclaw/issues/3392)  
- **类型：** 贡献流程 / 自动化检查问题  
- **严重程度：** 中等  
- **是否有 fix PR：** 暂未发现  
- **影响范围：** PR 提交流程、CLA 校验、外部贡献者体验  
- **当前状态：** Open，暂无评论  

**问题描述：**  
CLAassistant 未能检测到 CLA 签名，导致相关贡献可能无法顺利通过检查。

**稳定性影响评估：**
- 对 PicoClaw 运行时稳定性暂无直接影响。
- 对项目维护流程有潜在影响，特别是如果多个 PR 都依赖 CLAassistant 状态来决定是否可合并。
- 建议维护者优先确认 CLAassistant 配置、GitHub App 权限、签署记录同步状态，以及相关 PR 的检查日志。

---

## 5. 功能请求与路线图信号

### 新增 Provider 支持：Cheaper Inference

#### [PR #3393 feat(provider): add Cheaper Inference provider](https://github.com/sipeed/picoclaw/pull/3393)  
- **类型：** 功能扩展  
- **方向：** OpenAI-compatible Provider / LLM Gateway  
- **状态：** Open  

该 PR 表明社区希望 PicoClaw 支持更多 OpenAI-compatible 的模型服务商，尤其是聚合型 AI Router 或低成本推理网关。

**可能的路线图信号：**
- PicoClaw 的 provider 抽象可能正在成为社区扩展重点。
- 用户关注点不仅是模型能力，也包括调用成本、接入便利性和多模型统一 API。
- 如果该 PR 通过审查，未来可能会继续出现更多类似 provider 集成请求。

**进入下一版本的可能性：**
- 取决于维护者对 provider 接口一致性、文档、测试覆盖和安全配置方式的审查。
- 若实现仅为兼容 OpenAI API 的轻量配置扩展，合入成本可能较低。
- 若涉及新增认证、路由参数或模型列表维护，则可能需要更多 review。

---

## 6. 用户反馈摘要

今日可提炼的用户反馈较少，主要来自 1 条 Bug Issue 和 1 条功能型 PR。

### 主要痛点

#### CLA 签名识别失败  
来源：[Issue #3392](https://github.com/sipeed/picoclaw/issues/3392)

用户反馈 CLAassistant 无法识别签名，说明贡献者在参与项目时遇到了流程性阻塞。该问题会降低外部贡献者体验，尤其是在 PR 已提交但因自动化检查失败而无法继续推进的情况下。

### 使用场景与需求

#### 低成本、多模型 LLM 网关接入  
来源：[PR #3393](https://github.com/sipeed/picoclaw/pull/3393)

PR 作者希望引入 Cheaper Inference，说明部分用户存在以下需求：
- 使用 OpenAI-compatible API 接入多个模型。
- 通过统一 API Key 管理多家模型服务。
- 降低 LLM 推理成本。
- 在 PicoClaw 中获得更灵活的 provider 选择。

### 满意 / 不满意信号

- **不满意信号：** CLAassistant 检测异常影响贡献流程。
- **积极信号：** 社区仍在主动提交 provider 扩展 PR，显示项目具备一定外部贡献活力。

---

## 7. 待处理积压

当前数据仅覆盖最近 24 小时，未提供长期未响应 Issue 或 PR 列表，因此无法准确判断历史积压情况。

### 今日需要维护者关注的待处理项

1. [Issue #3392 CLAassistant does not detect signature](https://github.com/sipeed/picoclaw/issues/3392)  
   - 建议优先确认自动化 CLA 检查是否异常。
   - 若确认为配置问题，应尽快修复，避免阻塞更多 PR。

2. [PR #3393 feat(provider): add Cheaper Inference provider](https://github.com/sipeed/picoclaw/pull/3393)  
   - 建议进行初步 review，重点关注：
     - 是否符合现有 provider 抽象。
     - 是否包含必要文档。
     - 是否需要测试覆盖。
     - API Key 配置方式是否安全清晰。
     - 是否存在品牌、命名或外部服务依赖风险。

---

## 项目健康度评估

**总体健康度：稳定，但今日活跃度有限。**

- **开发活跃度：** 中低，过去 24 小时仅 1 个新 PR，暂无合并。
- **社区参与度：** 较低，Issue 和 PR 均暂无评论或反应。
- **功能演进：** 有正向信号，provider 生态继续扩展。
- **流程风险：** CLAassistant 检测问题值得关注，可能影响贡献合并效率。
- **发布节奏：** 今日无新版本发布，暂无可见 release 推进信号。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-09-26）

## 1. 今日速览

过去 24 小时 NanoClaw 活跃度很高：新增/更新 Issues 5 条，PR 更新 22 条，其中 21 条仍待合并，1 条已关闭。今日主题明显集中在 **v2.4.0 后的安装、更新、网关检测、OpenCode/Iron Proxy 集成、Agent Runner 稳定性** 等方面。  
从数据看，项目当前处于较密集的修复与加固周期：多个 Issue 已经有对应 Fix PR，维护响应速度较快。  
风险点主要在 `/update-nanoclaw`、setup 流程、agent/group 控制语义以及容器生命周期竞态，这些问题可能影响线上安装的可用性和可诊断性。整体健康度偏积极，但短期合并压力较大，待合并 PR 堆积需要维护者尽快梳理优先级。

---

## 2. 版本发布

过去 24 小时无新版本发布。  
最新 Releases 数据为空，因此今日没有可报告的正式版本、破坏性变更或迁移说明。

---

## 3. 项目进展

### 已关闭 / 合并的重要 PR

#### #3917 fix: seed Claude's default output style, not Concise, which defeated prompt caching  
链接：https://github.com/qwibitai/nanoclaw/pull/3917  
状态：CLOSED  
作者：gavrielc  

该 PR 修复了 Claude provider 在 v2.4 后默认将 `outputStyle` 设置为 `"Concise"` 的问题。该设置会导致对话无法从 prompt cache 中读取，从而削弱缓存收益。修复方向是使用 Claude 的默认输出风格，而不是显式设置 Concise。

**影响：**
- 改善 Claude agent 的 prompt caching 行为。
- 降低重复上下文读取或缓存失效带来的性能与成本问题。
- 属于核心 provider 层面的稳定性和效率修复。

### 其他重要待合并 PR 进展

虽然今日仅 1 个 PR 关闭，但大量 PR 已经准备好推动下一轮修复：

- `/update-nanoclaw` 控制器加载修复：[#3913](https://github.com/qwibitai/nanoclaw/pull/3913)
- gateway 检测修复：[#3910](https://github.com/qwibitai/nanoclaw/pull/3910)
- OpenCode 本地模型 URL 校验：[#3919](https://github.com/qwibitai/nanoclaw/pull/3919)
- setup failure-assist 权限收紧：[#3920](https://github.com/qwibitai/nanoclaw/pull/3920)
- Agent Runner 重复回复 / 错误通知循环修复：[#3918](https://github.com/qwibitai/nanoclaw/pull/3918)、[#3908](https://github.com/qwibitai/nanoclaw/pull/3908)
- CI 标签与 PR 模板合规修复：[#3914](https://github.com/qwibitai/nanoclaw/pull/3914)、[#3912](https://github.com/qwibitai/nanoclaw/pull/3912)

**项目整体推进判断：**  
今日更像是一次针对 v2.4.0 后安装与运行问题的集中修复准备期。虽然正式合入较少，但 PR 数量和覆盖面显示维护者已经对关键回归建立了修复路径。

---

## 4. 社区热点

### 1. `/update-nanoclaw` 无法加载控制器、依赖不存在时执行 stage-rooted 命令  
Issue：[#3906](https://github.com/qwibitai/nanoclaw/issues/3906)  
对应 PR：[#3913](https://github.com/qwibitai/nanoclaw/pull/3913)  
作者：glifocat  
评论数：1  

这是今日唯一有评论的 Issue，也是最明显的回归热点。问题集中在 `/update-nanoclaw` 流程：controller archive 缺少 `setup/`，同时某些命令在依赖尚不存在时执行，导致更新控制器无法加载。

**背后诉求：**
- 用户希望更新流程在真实安装环境中可靠运行。
- 更新技能需要更少依赖于完整源码树或 node_modules。
- 对自动化升级工具的容错性要求较高。

### 2. setup / OpenCode / Iron Proxy 集成问题集中爆发  
相关 PR：
- [#3919](https://github.com/qwibitai/nanoclaw/pull/3919) fix(opencode): reject local model URLs Iron Proxy cannot serve at the prompt
- [#3915](https://github.com/qwibitai/nanoclaw/pull/3915) fix(iron-proxy): skip invalid allowed-hosts entries instead of aborting setup
- [#3905](https://github.com/qwibitai/nanoclaw/pull/3905) fix(setup): say when OpenCode's endpoint wasn't verified and log the ping
- [#3920](https://github.com/qwibitai/nanoclaw/pull/3920) fix(setup): restrict failure-assist agents on a live install

**背后诉求：**
- 用户在本地模型、自定义 endpoint、Iron Proxy、OpenCode provider 的组合下遇到较多安装验证与运行时失败。
- setup 不应“看似成功但运行失败”，而应在 prompt 阶段阻断不可用配置。
- failure-assist agent 在 live install 上不应拥有过强权限，避免自动修复反而造成停机。

### 3. Agent Runner 与 agent-to-agent 路由稳定性  
相关 PR：
- [#3918](https://github.com/qwibitai/nanoclaw/pull/3918)
- [#3908](https://github.com/qwibitai/nanoclaw/pull/3908)
- [#3904](https://github.com/qwibitai/nanoclaw/pull/3904)

**背后诉求：**
- 多 agent 场景下，消息投递、失败通知、result-door provider 行为需要更精细控制。
- 项目正在从“硬编码 poll-loop 行为”向“可插拔 turn lifecycle hook”演进。

---

## 5. Bug 与稳定性

以下按潜在影响严重程度排序。

### P0 / 高优先级：更新流程阻断

#### #3906 `[bug] update-nanoclaw: controller archive misses setup/ since #3816, and stage-rooted commands run before deps exist`  
链接：https://github.com/qwibitai/nanoclaw/issues/3906  
状态：OPEN  
影响版本：c313d061 / v2.4.0  
平台：Linux  
对应修复 PR：[#3913](https://github.com/qwibitai/nanoclaw/pull/3913)

**问题：** `/update-nanoclaw` controller archive 无法加载，且某些命令在依赖存在前执行。  
**影响：** 可能直接阻断用户从当前安装升级，属于更新链路回归。  
**修复进展：** 已有明确修复 PR，方向是让 update controller 不依赖 `setup/` 或 `node_modules` 即可加载。

---

### P1 / 高优先级：gateway 检测被 pnpm stdout 警告干扰

#### #3907 `[bug] Gateway detection fails when a nested pnpm prints a workspace warning to stdout`  
链接：https://github.com/qwibitai/nanoclaw/issues/3907  
状态：OPEN  
影响版本：c313d061 / v2.4.0  
平台：Linux  
对应修复 PR：[#3910](https://github.com/qwibitai/nanoclaw/pull/3910)

**问题：** `/update-nanoclaw` validate 阶段因 nested pnpm 输出 workspace warning 到 stdout，导致健康安装被误判为未检测到 gateway。  
**影响：** 用户会看到错误提示 `No installed gateway could be detected`，阻断更新或重启流程。  
**修复进展：** PR #3910 改为不再解析 nested pnpm 的整体 stdout，提高检测鲁棒性。

---

### P1 / 高优先级：agent group restart 目标错误

#### #3911 `[bug] ncl groups restart --id <other group> from an agent restarts the caller, not the target`  
链接：https://github.com/qwibitai/nanoclaw/issues/3911  
状态：OPEN  
影响版本：c313d061 / v2.4.0  
平台：Linux  
对应修复 PR：暂无明确对应 PR

**问题：** agent 使用 `cli_scope: global` 执行 `ncl groups restart --id <another group>`，命令返回 `{ "restarted": 1 }`，但实际重启的是调用方而非目标 group。  
**影响：**
- 管理语义错误，可能导致错误 agent 被重启。
- 对多 agent 编排、远程运维和自动恢复流程风险较高。  
**建议：** 维护者应优先确认 CLI 权限上下文和 group id 解析逻辑。

---

### P1 / 高优先级：删除中的 agent group 仍可能启动 session container

#### #3909 `[bug] Host starts a session container for an agent group deleted mid-spawn`  
链接：https://github.com/qwibitai/nanoclaw/issues/3909  
状态：OPEN  
平台：Any  
对应修复 PR：暂无明确对应 PR

**问题：** `spawnContainer` 只在早期读取一次 agent group，随后经历多个 await 步骤。如果 group 在中途被删除，host 仍可能继续启动 container。  
**影响：**
- 典型生命周期竞态问题。
- 可能导致孤儿容器、错误会话、资源泄漏或安全边界混乱。  
**建议：** 在容器启动前增加二次校验，或引入 spawn token / generation check。

---

### P2 / 中优先级：host 日志长期不轮转且无日期

#### #3916 `Host logs never rotate and carry no date, so a multi-week nanoclaw.log misreads as a live incident`  
链接：https://github.com/qwibitai/nanoclaw/issues/3916  
状态：OPEN  
平台：macOS launchd install  
对应修复 PR：暂无明确对应 PR

**问题：** `logs/nanoclaw.log` 与 `logs/nanoclaw.error.log` 长期积累，且日志行没有日期。用户排查“最近几分钟”时匹配到了跨越数月的历史日志。  
**影响：**
- 严重影响可观测性和故障诊断。
- 容易将历史错误误判为当前线上事故。
- 可能带来磁盘占用风险。  
**建议：** 增加日志轮转、日期戳、保留策略，并在 setup 中提示日志位置与清理方式。

---

### P2 / 中优先级：OpenCode / Iron Proxy 配置容错

相关 PR：
- [#3919](https://github.com/qwibitai/nanoclaw/pull/3919)
- [#3915](https://github.com/qwibitai/nanoclaw/pull/3915)
- [#3905](https://github.com/qwibitai/nanoclaw/pull/3905)
- [#3896](https://github.com/qwibitai/nanoclaw/pull/3896)

**问题集合：**
- OpenCode local model URL 在 Iron Proxy 下不可路由却在 prompt 阶段未拒绝。
- malformed `allowed-hosts.json` entry 会导致 setup abort。
- endpoint verification 结果不清晰，日志误导。
- OpenCode provider 未正确从 `options.env` 读取配置。

**影响：** 本地模型和代理网关安装体验不稳定，用户难以判断是配置问题、网络问题还是 provider 问题。

---

## 6. 功能请求与路线图信号

今日没有以 Issue 形式提交的明确新功能请求，但多个 PR 释放了路线图信号。

### 1. 每个 group 可配置 Claude provider 的 system prompt mode  
PR：[#3900](https://github.com/qwibitai/nanoclaw/pull/3900)  
类型：Feature  

该 PR 允许使用 Claude provider 的 group 放弃 Claude Code system-prompt preset，以便 Anthropic-compatible endpoint 后面的非 Claude 模型获得更适配的 prompt。

**路线图信号：**
- NanoClaw 正在增强对非 Claude 模型和兼容 API 的支持。
- 多模型、多 provider、per-group 配置将成为重要方向。

### 2. Channel 可通过 `<NAME>_ENABLED=false` 临时停用  
PR：[#3898](https://github.com/qwibitai/nanoclaw/pull/3898)  
类型：Feature  

该 PR 允许 operator “park” 一个已安装 channel，而不是删除凭据或数据库记录。

**路线图信号：**
- 运维友好性增强。
- 未来可能有更完整的 channel lifecycle management。

### 3. 可插拔调度与容器环境扩展点  
相关 PR：
- [#3903](https://github.com/qwibitai/nanoclaw/pull/3903) refactor(scheduling): pluggable admission for due-session wakes
- [#3902](https://github.com/qwibitai/nanoclaw/pull/3902) refactor: add registerEnvContributor seam for container spawn env
- [#3904](https://github.com/qwibitai/nanoclaw/pull/3904) refactor(agent-runner): turn-lifecycle hook registry for the poll loop

**路线图信号：**
- NanoClaw 正在为 fork、本地安装和高级部署提供 extension seams。
- 项目架构从固定逻辑逐步走向可注册、可扩展、可插拔。

### 4. Fork-local 代码与 agent instruction 扩展文档  
相关 PR：
- [#3899](https://github.com/qwibitai/nanoclaw/pull/3899)
- [#3897](https://github.com/qwibitai/nanoclaw/pull/3897)

**路线图信号：**
- 维护者意识到 fork 用户在升级中存在冲突痛点。
- 文档层面开始规范“本地定制如何不破坏 upstream upgrade”。

---

## 7. 用户反馈摘要

### 真实痛点 1：升级流程可靠性不足

来自 Issue [#3906](https://github.com/qwibitai/nanoclaw/issues/3906)、[#3907](https://github.com/qwibitai/nanoclaw/issues/3907)。  
用户在 v2.4.0 环境中执行 `/update-nanoclaw` 时遇到 controller 无法加载、gateway 误检测失败等问题。

**用户不满点：**
- 安装本身健康，但更新工具误判失败。
- 更新流程依赖缺失或 archive 内容不完整。
- 错误信息与真实原因之间有距离。

### 真实痛点 2：日志难以用于事故判断

来自 Issue [#3916](https://github.com/qwibitai/nanoclaw/issues/3916)。  
用户在 macOS launchd 安装中发现日志跨越数月且没有日期，导致排查“最近几分钟”时误读历史错误。

**用户不满点：**
- 日志没有日期，时间上下文不足。
- 日志不轮转，历史噪声过多。
- 容易将历史问题误判为实时事故。

### 真实痛点 3：多 agent / 多 group 操作语义不可靠

来自 Issue [#3911](https://github.com/qwibitai/nanoclaw/issues/3911)、[#3909](https://github.com/qwibitai/nanoclaw/issues/3909)。  
用户暴露了 group restart 目标错误、group 删除中仍启动容器等问题。

**用户不满点：**
- 命令返回成功，但实际操作对象错误。
- 系统生命周期状态与实际行为不一致。
- 自动化运维中的信任成本上升。

### 真实痛点 4：本地模型 / OpenCode / Iron Proxy 配置反馈不清晰

相关 PR [#3919](https://github.com/qwibitai/nanoclaw/pull/3919)、[#3915](https://github.com/qwibitai/nanoclaw/pull/3915)、[#3905](https://github.com/qwibitai/nanoclaw/pull/3905)。  

**用户不满点：**
- setup 阶段未能提前拒绝必然不可用的 local endpoint。
- 错误配置会直接 abort，而不是给出可修复提示。
- 日志中存在“0ms success”这类误导性信息。

---

## 8. 待处理积压

基于本日报提供的 24 小时数据，未发现“长期未响应”的 Issue 或 PR；所有条目均为 2026-09-25 当日创建或更新。不过，从优先级看，以下积压应尽快处理：

### 高优先级待处理

1. `/update-nanoclaw` controller 加载失败  
   - Issue：[ #3906 ](https://github.com/qwibitai/nanoclaw/issues/3906)  
   - PR：[ #3913 ](https://github.com/qwibitai/nanoclaw/pull/3913)  
   - 建议：优先 review / merge，避免用户无法升级。

2. Gateway 检测误判  
   - Issue：[ #3907 ](https://github.com/qwibitai/nanoclaw/issues/3907)  
   - PR：[ #3910 ](https://github.com/qwibitai/nanoclaw/pull/3910)  
   - 建议：与 #3913 一并纳入更新流程 hotfix。

3. `ncl groups restart --id` 目标错误  
   - Issue：[ #3911 ](https://github.com/qwibitai/nanoclaw/issues/3911)  
   - 当前未见对应 PR  
   - 建议：尽快复现并补测试，避免 agent 管理命令误操作。

4. 删除中的 group 仍启动 container  
   - Issue：[ #3909 ](https://github.com/qwibitai/nanoclaw/issues/3909)  
   - 当前未见对应 PR  
   - 建议：增加 spawn 前状态再校验，防止容器生命周期竞态。

5. 日志不轮转 / 无日期  
   - Issue：[ #3916 ](https://github.com/qwibitai/nanoclaw/issues/3916)  
   - 当前未见对应 PR  
   - 建议：作为可观测性改进尽快排期，尤其影响长期运行安装。

### PR 积压观察

今日共有 21 个待合并 PR，数量偏高。建议维护者按以下顺序处理：

1. 更新/安装阻断类：[#3913](https://github.com/qwibitai/nanoclaw/pull/3913)、[#3910](https://github.com/qwibitai/nanoclaw/pull/3910)、[#3920](https://github.com/qwibitai/nanoclaw/pull/3920)  
2. OpenCode / Iron Proxy 配置稳定性：[#3919](https://github.com/qwibitai/nanoclaw/pull/3919)、[#3915](https://github.com/qwibitai/nanoclaw/pull/3915)、[#3905](https://github.com/qwibitai/nanoclaw/pull/3905)、[#3896](https://github.com/qwibitai/nanoclaw/pull/3896)  
3. Agent Runner 稳定性：[#3918](https://github.com/qwibitai/nanoclaw/pull/3918)、[#3908](https://github.com/qwibitai/nanoclaw/pull/3908)  
4. CI / 维护质量：[#3914](https://github.com/qwibitai/nanoclaw/pull/3914)、[#3912](https://github.com/qwibitai/nanoclaw/pull/3912)  
5. 架构扩展与功能增强：[#3900](https://github.com/qwibitai/nanoclaw/pull/3900)、[#3898](https://github.com/qwibitai/nanoclaw/pull/3898)、[#3902](https://github.com/qwibitai/nanoclaw/pull/3902)、[#3903](https://github.com/qwibitai/nanoclaw/pull/3903)、[#3904](https://github.com/qwibitai/nanoclaw/pull/3904)

---

## 总体健康度判断

NanoClaw 今日表现为 **高活跃、高修复密度、中等短期风险**。  
积极信号是：关键回归大多已有 PR 跟进，维护响应速度快，且项目正在补齐 setup、provider、CI、agent-runner、extension seam 等多个层面的工程质量。  
风险信号是：v2.4.0 后出现多个安装/更新相关回归，且待合并 PR 数量较多，若 review 节奏跟不上，用户会继续暴露在升级失败、配置误判和多 agent 操作不一致的问题中。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报  
日期：2026-09-26  
仓库：nullclaw/nullclaw

---

## 1. 今日速览

过去 24 小时，NullClaw 项目整体活跃度偏低，但出现了一个具有稳定性和用户体验意义的修复型 PR。今日无 Issue 新增、更新或关闭，也没有新版本发布，说明社区侧反馈较为安静。唯一活跃事项是 PR [#1009](https://github.com/nullclaw/nullclaw/pull/1009)，聚焦于 supervised autonomy 场景下中高风险 shell 命令的审批流程修复。该 PR 关联并尝试关闭 Issue [#900](https://github.com/nullclaw/nullclaw/issues/900)，如果合并，将改善 `/bash`、`/exec` 等命令在需要人工审批时的行为一致性。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

今日没有已合并或已关闭的 PR。

### 待合并的重要 PR

#### [#1009 fix(exec): pause for /approve on medium/high-risk commands instead of failing](https://github.com/nullclaw/nullclaw/pull/1009)

- 状态：Open
- 作者：serhiy-bzhezytskyy
- 创建时间：2026-09-25
- 更新时间：2026-09-25
- 关联问题：Closes [#900](https://github.com/nullclaw/nullclaw/issues/900)
- 评论数：暂无数据
- 👍：0

该 PR 修复 supervised autonomy 模式中的一个行为偏差：中高风险 shell 命令原本应暂停并等待用户通过 `/approve` 批准，而不是直接失败。根据 PR 描述，当前实现中 `approval_request` 状态没有被正确触达，无论命令来自 `/bash`、`/exec`，还是相关执行路径，都会导致审批流程无法正常生效。

这项修复如果合并，将推进以下方面：

- 改善高风险命令执行前的人机协作流程；
- 提升 supervised autonomy 的可信度和可用性；
- 减少用户在自动化任务中遇到“应等待审批却直接失败”的中断体验；
- 强化 NullClaw 在安全执行、权限控制和命令风险管理方面的稳定性。

---

## 4. 社区热点

今日无活跃讨论型 Issue 或 PR，唯一有更新的热点是修复 PR [#1009](https://github.com/nullclaw/nullclaw/pull/1009)。

### [#1009 fix(exec): pause for /approve on medium/high-risk commands instead of failing](https://github.com/nullclaw/nullclaw/pull/1009)

该 PR 虽然暂无明显社区互动数据，但从主题来看，它触及的是 AI 智能体执行外部命令时的关键安全边界问题。用户诉求可以概括为：当系统判断命令存在中高风险时，不应简单失败，而应进入可解释、可恢复、可审批的等待状态。

背后的需求包括：

- 用户希望 AI agent 具备自主执行能力，但仍保留人类最终控制权；
- 对高风险 shell 命令，需要清晰的审批中断点；
- 执行流程应符合预期，避免因为审批状态未触发导致任务失败；
- `/bash`、`/exec` 等不同入口应有一致的安全策略。

---

## 5. Bug 与稳定性

### 中高严重度：supervised autonomy 审批流程未正确触发

- 相关 PR：[ #1009](https://github.com/nullclaw/nullclaw/pull/1009)
- 关联 Issue：[ #900](https://github.com/nullclaw/nullclaw/issues/900)
- 状态：已有修复 PR，待合并
- 影响范围：`/bash`、`/exec` 及相关 shell command 执行路径
- 严重程度：中高

问题描述：  
在 supervised autonomy 模式下，中高风险 shell 命令理论上应暂停执行，并等待用户通过 `/approve` 授权。但当前行为是命令直接失败，导致 `approval_request` 状态未被进入。

潜在影响：

- 用户无法按预期审批风险命令；
- 长链路任务可能因为一次命令审批失败而中断；
- AI agent 的自主执行能力受限；
- 安全策略的用户体验不一致，可能降低用户对系统风控机制的信任。

当前进展：  
PR [#1009](https://github.com/nullclaw/nullclaw/pull/1009) 已提交，目标是让中高风险命令暂停并等待 `/approve`，而不是直接失败。

今日无其他新报告 Bug、崩溃或回归问题。

---

## 6. 功能请求与路线图信号

过去 24 小时无新增功能请求类 Issue。

不过，PR [#1009](https://github.com/nullclaw/nullclaw/pull/1009) 释放出一个清晰的路线图信号：NullClaw 正在强化“可监督自主执行”能力。这类能力对于个人 AI 助手和 AI 智能体非常关键，尤其是在涉及 shell、文件系统、外部工具调用等高风险操作时。

可能进入后续版本的方向包括：

- 更可靠的命令风险分级；
- 对中高风险操作提供统一审批流程；
- `/approve` 交互体验改进；
- 执行状态机中 `approval_request` 等状态的完整覆盖；
- `/bash`、`/exec` 等命令入口的安全策略一致化。

相关链接：

- PR：[ #1009](https://github.com/nullclaw/nullclaw/pull/1009)
- Issue：[ #900](https://github.com/nullclaw/nullclaw/issues/900)

---

## 7. 用户反馈摘要

今日无新的 Issue 评论数据，因此无法从新增评论中提炼更多真实用户反馈。

基于 PR [#1009](https://github.com/nullclaw/nullclaw/pull/1009) 及其关联问题 [#900](https://github.com/nullclaw/nullclaw/issues/900)，可以归纳出一个核心痛点：

- 用户希望 NullClaw 在执行中高风险命令时，不是简单失败，而是进入人工审批流程；
- 对个人 AI 助手而言，“暂停等待确认”比“静默失败或直接失败”更符合实际使用场景；
- 用户对 supervised autonomy 的期望是：系统可以主动推进任务，但在关键风险点上必须请求授权。

这表明 NullClaw 的用户可能正在将其用于更复杂的本地自动化、命令执行和开发辅助任务，对执行安全性与任务连续性都有较高要求。

---

## 8. 待处理积压

### 当前需关注的待处理 PR

#### [#1009 fix(exec): pause for /approve on medium/high-risk commands instead of failing](https://github.com/nullclaw/nullclaw/pull/1009)

- 状态：Open
- 类型：Bug fix / 行为修正
- 建议优先级：较高
- 原因：涉及 supervised autonomy 的核心执行逻辑和安全审批流程。

建议维护者重点关注：

1. 确认 `/bash`、`/exec` 以及其他命令入口是否都能正确进入 `approval_request` 状态；
2. 检查中高风险命令被暂停后，用户 `/approve` 的恢复路径是否完整；
3. 增加回归测试，覆盖 medium-risk 和 high-risk command；
4. 验证直接失败行为是否只保留在真正不可恢复或策略禁止的场景中；
5. 合并前确认是否存在破坏性行为变化，尤其是依赖旧失败逻辑的测试或调用方。

### 长期未响应 Issue / PR

今日数据未提供长期未响应 Issue 或 PR 列表，因此无法识别更大范围的积压项。当前已知最值得关注的是与 [#900](https://github.com/nullclaw/nullclaw/issues/900) 相关的审批流程问题，以及对应修复 PR [#1009](https://github.com/nullclaw/nullclaw/pull/1009)。

---

## 项目健康度评估

- 活跃度：低
- 维护响应：有针对性修复提交
- 发布节奏：今日无发布
- 稳定性关注点：命令执行审批流程
- 社区反馈强度：低，今日无 Issue 更新
- 短期建议：优先审查并合并 [#1009](https://github.com/nullclaw/nullclaw/pull/1009)，同时补充 supervised autonomy 审批路径的测试覆盖。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-09-26）

## 1. 今日速览

过去 24 小时内，LobsterAI 仓库整体活跃度偏低：没有新的 Issue 更新，也没有新版本发布，仅出现 1 个新的开放 PR。  
今日唯一的代码层面进展来自模型服务商扩展方向，新增了 Requesty 作为内置模型提供商的支持，表明项目仍在持续扩展多模型接入能力。  
从社区互动看，当前无 Issue 讨论、无评论数据、无点赞反馈，说明今日社区侧反馈较少，项目主要处于小规模功能迭代状态。  
整体健康度判断：项目仍有功能演进信号，但今日缺少合并、发布和用户反馈数据，短期活跃度较弱。

---

## 2. 项目进展

### 待合并 PR

#### [PR #2766 feat(providers): add Requesty as a model provider](https://github.com/netease-youdao/LobsterAI/pull/2766)

- **状态**：OPEN  
- **作者**：Thibaultjaigu  
- **创建时间**：2026-09-25  
- **更新时间**：2026-09-25  
- **涉及范围**：
  - `area: renderer`
  - `area: main`
  - `area: openclaw`
- **互动情况**：
  - 评论数：未提供
  - 👍：0

该 PR 新增了 [Requesty](https://requesty.ai) 作为内置模型提供商。Requesty 是一个 LLM gateway，提供统一 API 来访问多个模型。根据摘要，该实现方式与 OpenRouter 类似，主要包括：

- 在共享 provider registry 中新增 Requesty 配置；
- 添加 OpenClaw provider descriptor；
- 添加 provider icon；
- 默认保持 disabled 状态；
- 不会自动选择或启用该 provider。

### 进展评估

该 PR 尚未合并，因此今日没有实际进入主分支的功能变更。不过从方向上看，它延续了 LobsterAI 对多模型、多 provider 支持的扩展路线，有助于降低用户接入不同模型服务的成本。  
如果后续完成 review 并合并，该功能可能会提升 LobsterAI 在模型网关兼容性和用户配置灵活性方面的能力。

---

## 3. 社区热点

今日没有活跃 Issue，也没有高评论量或高反应数的讨论。唯一值得关注的是新增 PR：

### [PR #2766 Requesty provider support](https://github.com/netease-youdao/LobsterAI/pull/2766)

- **类型**：功能增强
- **关注点**：新增模型服务商 Requesty
- **社区热度**：低，目前无点赞数据，评论数未提供
- **潜在诉求**：
  - 用户希望通过统一 API 接入更多 LLM；
  - 项目希望继续扩大内置 provider 覆盖面；
  - 对类似 OpenRouter 的 LLM gateway 支持可能成为后续模型生态扩展方向。

由于目前没有评论和用户反馈，尚无法判断社区对 Requesty 支持的需求强度。

---

## 4. Bug 与稳定性

过去 24 小时内没有新的 Bug、崩溃、回归或稳定性相关 Issue 报告。

### 今日稳定性信号

- 新增 Bug Issue：0
- 已关闭 Bug Issue：0
- 相关修复 PR：0
- 崩溃 / 回归报告：未发现

从今日数据看，项目没有暴露新的稳定性风险。不过由于没有用户反馈和 Issue 活动，也可能意味着样本不足，不能直接等同于当前版本完全稳定。

---

## 5. 功能请求与路线图信号

今日没有新的 Issue 形式的功能请求，但 [PR #2766](https://github.com/netease-youdao/LobsterAI/pull/2766) 本身释放出明确的路线图信号。

### 可能进入下一版本的能力

#### Requesty 模型提供商支持

- **相关 PR**：[PR #2766](https://github.com/netease-youdao/LobsterAI/pull/2766)
- **当前状态**：待 review / 待合并
- **可能影响**：
  - 增加 LobsterAI 的模型接入选择；
  - 让用户通过 Requesty 的统一接口访问多个模型；
  - 与 OpenRouter 类似，强化模型聚合网关的支持能力；
  - 对高级用户、自托管用户、多模型切换用户更有价值。

### 路线图判断

LobsterAI 可能正在继续强化“多 provider + 模型聚合网关”的能力。Requesty 与 OpenRouter 类似，说明项目在 provider 抽象、模型路由、模型服务兼容性方面已有较成熟的扩展机制。

---

## 6. 用户反馈摘要

今日没有新的 Issue 评论、用户反馈或讨论数据，因此无法提炼新的真实用户痛点。

### 当前可观察到的信息

- 没有新增用户问题；
- 没有新的使用场景描述；
- 没有满意或不满意反馈；
- 没有关于现有功能的投诉或改进建议。

需要注意的是，社区沉默可能有两种解释：一是近期问题较少，二是用户反馈活跃度不足。仅凭今日数据无法进一步判断。

---

## 7. 待处理积压

### 今日新增待处理项

#### [PR #2766 feat(providers): add Requesty as a model provider](https://github.com/netease-youdao/LobsterAI/pull/2766)

- **状态**：OPEN
- **建议关注点**：
  - 确认 Requesty provider 的配置项是否与现有 provider 体系一致；
  - 检查默认 disabled 逻辑是否符合安全预期；
  - 验证 renderer、main、openclaw 三个区域的改动是否完整；
  - 检查 icon、descriptor、registry 是否符合项目规范；
  - 补充必要的文档或用户配置说明。

### 长期积压

本次输入数据未提供历史未响应 Issue 或长期未处理 PR 列表，因此无法识别长期积压项。基于今日数据，仅建议维护者优先 review 新增的 Requesty provider PR，避免 provider 扩展类贡献长期悬置。

---

## 总体健康度判断

今日 LobsterAI 的开发活动较轻，主要表现为一个 provider 扩展类 PR。没有新 Issue、没有版本发布、没有 Bug 报告，也没有合并记录。  
项目当前短期活跃度偏低，但仍保持功能扩展方向，尤其是在多模型服务商接入方面持续演进。维护者接下来可重点关注 [PR #2766](https://github.com/netease-youdao/LobsterAI/pull/2766) 的 review、测试和文档补充，以推动其进入下一版本。

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

# CoPaw 项目动态日报｜2026-09-26

## 1. 今日速览

过去 24 小时内，CoPaw / QwenPaw 相关仓库活跃度较高：新增或更新 **4 个 Issues**、**7 个 Pull Requests**，但暂无 PR 合并、Issue 关闭或新版本发布。今日动态主要集中在 **工具链稳定性、Browser SDK 启动参数、模型提供商兼容性、Console UI 体验、多平台消息去重** 等方向。  
从健康度看，社区反馈较集中且已有多个对应修复 PR 出现，说明问题响应速度较快；但由于 7 个 PR 均处于待合并状态，当前项目推进仍处在“修复准备完成、等待维护者 Review”的阶段。  
今日最值得关注的是 `grep_search` 读取二进制/内部状态文件导致会话污染的问题，以及 Browser SDK 无法加载 profile 扩展的问题，二者均已有针对性修复 PR。

---

## 2. 项目进展

今日暂无已合并或已关闭的重要 PR，因此没有形成已落地的代码进展。不过，社区提交了 7 个待合并 PR，覆盖多个关键模块，若顺利合并，将显著改善稳定性与兼容性。

### 待合并但值得关注的推进项

- [PR #7988 fix(tools): skip binary and internal files in grep search](https://github.com/agentscope-ai/QwenPaw/pull/7988)  
  针对 `grep_search` 误读二进制文件和内部历史数据库文件的问题，增加过滤逻辑，直接回应了 Issue #7980。该修复有助于避免工具输出污染 agent 会话状态。

- [PR #7987 fix(browser): support Playwright default argument exclusions](https://github.com/agentscope-ai/QwenPaw/pull/7987)  
  新增 `browser.ignore_default_args` 配置透传到 Playwright 的 `launch()` 与 `launch_persistent_context()`，允许用户排除 Playwright 默认参数，例如 `--disable-extensions`。该 PR 对应 Browser SDK 持久 profile 无法加载扩展的问题。

- [PR #7982 fix(providers): relay Gemini thought_signature in native Gemini provider](https://github.com/agentscope-ai/QwenPaw/pull/7982)  
  修复 Gemini thinking 模型在工具调用第二轮因缺失 `thought_signature` 报错的问题。该问题会直接影响 Gemini 3.x、Gemini 2.5 thinking 模型的连续工具调用能力。

- [PR #7986 fix(providers): skip the context pattern table for custom endpoints](https://github.com/agentscope-ai/QwenPaw/pull/7986)  
  避免自定义 OpenAI-compatible provider 被静态上下文窗口匹配表误判。该修复对使用 llama.cpp、vLLM、自建兼容接口的用户较重要。

- [PR #7983 Fix qq replayed messages](https://github.com/agentscope-ai/QwenPaw/pull/7983)  
  修复 QQ 官方 Bot WebSocket 网关会话恢复后消息重放导致重复回复的问题，提升多渠道消息处理的幂等性。

- [PR #7989 fix(console): keep Markdown table scrolling reachable](https://github.com/agentscope-ai/QwenPaw/pull/7989)  
  改善 Console 中 Markdown 表格的显示与滚动体验，尤其是长回答、多列表格、移动端场景。

- [PR #7985 fix(i18n): add plural suffixes to the code snippet chip label](https://github.com/agentscope-ai/QwenPaw/pull/7985)  
  补充代码片段标签的复数国际化 key，修复部分语言环境下 i18next 复数解析失败的问题。

---

## 3. 社区热点

### 1. Browser SDK 无法加载 profile 扩展

- [Issue #7984 [Bug] Browser SDK 无法加载 profile 扩展](https://github.com/agentscope-ai/QwenPaw/issues/7984)  
  评论数：2  
  状态：Open  
  相关 PR：[PR #7987](https://github.com/agentscope-ai/QwenPaw/pull/7987)

用户反馈在使用 Browser SDK 的持久 profile 模式时，profile 中已安装的扩展不会加载，例如代理扩展 SwitchyOmega。核心原因是 Playwright 默认注入 `--disable-extensions`，而当前 QwenPaw 没有暴露移除默认参数的能力。  
该问题反映出高级浏览器自动化用户对“真实用户浏览器环境”的需求较强，包括持久 profile、浏览器扩展、代理管理、登录态复用等。

### 2. `grep_search` 读取内部 SQLite WAL 导致会话污染

- [Issue #7980 [Bug]: grep_search lacks binary filtering](https://github.com/agentscope-ai/QwenPaw/issues/7980)  
  评论数：2  
  状态：Open  
  相关 PR：[PR #7988](https://github.com/agentscope-ai/QwenPaw/pull/7988)

该问题指出，agent 在未指定 path 时执行 `grep_search` 会默认搜索 workspace root，并可能读取 QwenPaw 自身的 `history.db-wal` 等内部 SQLite 文件。二进制控制字符进入工具结果后，会污染会话状态，甚至造成不可恢复的 doom loop。  
这是今日最值得优先处理的稳定性问题之一，因为它不仅影响单次搜索结果，还可能破坏后续 agent 推理上下文。

### 3. `chat_with_agent` 前台调用超时语义错误

- [Issue #7981 [Bug] chat_with_agent foreground timeout](https://github.com/agentscope-ai/QwenPaw/issues/7981)  
  评论数：1  
  状态：Open  
  相关 PR：暂无

用户报告当前 `chat_with_agent` 前台调用在默认 300 秒超时后，会向调用方返回类似“用户中断”的系统提示，并导致父级 turn 没有最终答案。  
这类问题影响多 agent 编排可靠性，尤其是父 agent 调用子 agent 时，超时状态应被清晰地区分为 timeout，而不是 user interrupted。

### 4. Aliyun Token Plan 模型缺少思考参数声明

- [Issue #7990 [Feature]: 为 Aliyun Token Plan 模型声明 thinking_param_style](https://github.com/agentscope-ai/QwenPaw/issues/7990)  
  评论数：1  
  状态：Open  
  相关 PR：暂无

用户指出 `model_catalog.json` 未为 Aliyun Token Plan 模型声明 `thinking_param_style`，导致 Console 中“思考模式 / 推理强度 / Thinking level”等控件隐藏或禁用。  
这反映出模型目录与模型实际能力之间存在同步滞后，也说明用户已经开始依赖 Console 中的 reasoning / thinking 控件进行模型行为调优。

---

## 4. Bug 与稳定性

按潜在影响程度排序如下：

### 高严重度：`grep_search` 读取二进制与内部状态文件，导致会话状态污染

- Issue：[Issue #7980](https://github.com/agentscope-ai/QwenPaw/issues/7980)  
- Fix PR：[PR #7988](https://github.com/agentscope-ai/QwenPaw/pull/7988)  
- 影响范围：工具调用、workspace 搜索、agent 会话状态、长期上下文稳定性  
- 状态：Issue Open，PR Open

该问题严重性较高，因为它可能将 SQLite WAL、session 文件等内部数据作为搜索结果注入 agent 上下文，引发不可预测行为。PR #7988 已针对二进制与内部文件过滤提供修复，建议优先 Review 与合并。

### 高严重度：Gemini thinking 模型工具调用第二轮失败

- PR：[PR #7982](https://github.com/agentscope-ai/QwenPaw/pull/7982)  
- 相关 Issue：未在今日数据中列出  
- 影响范围：Gemini 原生 provider、Gemini 3.x、Gemini 2.5 thinking、tool calling  
- 状态：PR Open

Gemini 要求在后续 function call 中保留并回传 `thoughtSignature`，否则会出现 `400: Function call is missing a thought_signature in functionCall parts`。该问题会直接阻断多轮工具调用，是 provider 兼容性层面的关键修复。

### 中高严重度：Browser SDK 持久 profile 扩展无法加载

- Issue：[Issue #7984](https://github.com/agentscope-ai/QwenPaw/issues/7984)  
- Fix PR：[PR #7987](https://github.com/agentscope-ai/QwenPaw/pull/7987)  
- 影响范围：Browser SDK、Playwright、持久 profile、浏览器扩展、代理插件  
- 状态：Issue Open，PR Open

该问题对依赖真实浏览器 profile 的自动化场景影响明显。PR #7987 通过支持排除 Playwright 默认参数，为加载扩展提供配置通道。

### 中严重度：`chat_with_agent` 前台超时被错误识别为用户中断

- Issue：[Issue #7981](https://github.com/agentscope-ai/QwenPaw/issues/7981)  
- Fix PR：暂无  
- 影响范围：多 agent 协作、父子 agent 调用、超时处理、最终答案生成  
- 状态：Issue Open

问题核心在于错误的状态表达与父 turn 终止逻辑。应将 timeout、user interruption、tool cancellation 三类状态明确区分，并确保父 agent 能收到可恢复或可总结的结果。

### 中严重度：QQ 网关重放消息导致重复回复

- PR：[PR #7983](https://github.com/agentscope-ai/QwenPaw/pull/7983)  
- 相关 Issue：未在今日数据中列出  
- 影响范围：QQ Bot Channel、WebSocket resume、消息幂等性  
- 状态：PR Open

QQ 官方 Bot WebSocket 网关在会话恢复后可能重放消息。此前系统会重复处理相同 message ID，导致重复确认和重复 agent turn。PR #7983 增加去重逻辑，是消息通道稳定性修复。

### 中低严重度：自定义 provider 上下文窗口被静态规则误判

- PR：[PR #7986](https://github.com/agentscope-ai/QwenPaw/pull/7986)  
- 相关 Issue：未在今日数据中列出  
- 影响范围：OpenAI-compatible provider、llama.cpp、vLLM、自定义 base URL  
- 状态：PR Open

该问题可能导致自定义模型的上下文窗口设置不准确，影响截断策略和请求构造。虽然不一定导致崩溃，但会影响高级用户接入本地或自建模型的准确性。

### 低严重度：Console Markdown 表格滚动体验问题

- PR：[PR #7989](https://github.com/agentscope-ai/QwenPaw/pull/7989)  
- 状态：PR Open

主要影响长表格、多列表格在聊天气泡中的可读性和可滚动性。属于用户体验改进。

### 低严重度：代码片段标签 i18n 复数 key 缺失

- PR：[PR #7985](https://github.com/agentscope-ai/QwenPaw/pull/7985)  
- 状态：PR Open

该问题影响部分语言环境下代码片段标签展示，属于本地化质量修复。

---

## 5. 功能请求与路线图信号

### Aliyun Token Plan 模型 reasoning / thinking 控件支持

- [Issue #7990](https://github.com/agentscope-ai/QwenPaw/issues/7990)

用户希望在模型目录 `model_catalog.json` 中为 Aliyun Token Plan 模型补充 `thinking_param_style`，使 Console 能显示“思考模式 / 推理强度 / Thinking level”等配置入口。  
这表明项目的模型目录不只是静态展示信息，而正在成为 Console 能力开关和模型行为控制的核心来源。未来路线图可能需要强化：

- 模型能力元数据维护机制；
- reasoning / thinking 参数的跨供应商抽象；
- 模型目录版本更新节奏；
- Console 与模型目录之间的能力同步校验。

目前该功能请求暂无对应 PR，但实现成本相对可控，较可能进入近期小版本或模型目录更新。

### Browser SDK 暴露 Playwright 默认参数排除能力

- [Issue #7984](https://github.com/agentscope-ai/QwenPaw/issues/7984)  
- [PR #7987](https://github.com/agentscope-ai/QwenPaw/pull/7987)

虽然以 bug 形式提出，但本质上也是 Browser SDK 配置能力增强。若合并，开发者将能更细粒度控制 Playwright 默认启动参数，为后续支持浏览器扩展、真实用户 profile、代理扩展、自动化浏览器个性化配置打基础。

### 工具搜索安全边界强化

- [Issue #7980](https://github.com/agentscope-ai/QwenPaw/issues/7980)  
- [PR #7988](https://github.com/agentscope-ai/QwenPaw/pull/7988)

这不仅是 bug 修复，也释放出一个路线图信号：agent 工具需要默认具备更强的安全边界，尤其是避免读取内部状态、二进制文件、缓存、数据库、密钥或会话文件。后续可能需要扩展到更多工具，而不仅是 `grep_search`。

---

## 6. 用户反馈摘要

### 真实浏览器环境需求增强

来自 [Issue #7984](https://github.com/agentscope-ai/QwenPaw/issues/7984) 的反馈显示，用户在 Browser SDK 中并不满足于“干净浏览器实例”，而是希望复用真实 profile，包括已安装扩展、代理插件和用户数据目录。这类用户通常用于自动化浏览、登录态复用、代理切换等复杂场景。

### Agent 工具输出需要更可靠的隔离机制

[Issue #7980](https://github.com/agentscope-ai/QwenPaw/issues/7980) 暴露出用户对工具安全性的强烈关注。用户不只是报告了搜索结果错误，而是指出该错误会进入会话状态并造成后续循环失败。这说明在 agent 系统中，工具输出已被视为“长期状态的一部分”，其污染风险比传统 CLI 工具更高。

### 多 agent 编排需要更准确的失败语义

[Issue #7981](https://github.com/agentscope-ai/QwenPaw/issues/7981) 反映出用户在使用 `chat_with_agent` 时关注的是可恢复性和可解释性。超时不应被描述为“用户中断”，否则上层 agent 或调用方无法做出正确决策。

### Console 用户依赖模型能力元数据

[Issue #7990](https://github.com/agentscope-ai/QwenPaw/issues/7990) 表明用户已经开始依赖 Console 的 thinking 控件进行模型推理能力配置。当模型目录缺少字段时，用户体验会直接退化为“能力不可见”。这说明模型目录的准确性已成为产品体验的一部分。

### 多渠道接入用户关注消息幂等性

[PR #7983](https://github.com/agentscope-ai/QwenPaw/pull/7983) 所处理的 QQ 消息重放问题说明，外部平台 WebSocket 重连、恢复、重放等机制会对 agent 触发重复 turn。用户期望平台适配层能够自动处理消息去重，而不是让业务层承担。

---

## 7. 待处理积压

从今日提供的数据看，没有出现长期未响应的历史 Issue 或 PR；所有列出的 Issue 与 PR 均创建或更新于 2026-09-25，属于新近活跃项。不过，当前存在 **11 个 Open 条目**，其中 **7 个 PR 均待合并**，建议维护者优先关注以下队列：

### 建议优先 Review / 合并

1. [PR #7988 fix(tools): skip binary and internal files in grep search](https://github.com/agentscope-ai/QwenPaw/pull/7988)  
   对应高风险稳定性问题 [Issue #7980](https://github.com/agentscope-ai/QwenPaw/issues/7980)。

2. [PR #7987 fix(browser): support Playwright default argument exclusions](https://github.com/agentscope-ai/QwenPaw/pull/7987)  
   对应 Browser SDK 扩展加载问题 [Issue #7984](https://github.com/agentscope-ai/QwenPaw/issues/7984)。

3. [PR #7982 fix(providers): relay Gemini thought_signature in native Gemini provider](https://github.com/agentscope-ai/QwenPaw/pull/7982)  
   修复 Gemini thinking + tool calling 的阻断性兼容问题。

4. [PR #7983 Fix qq replayed messages](https://github.com/agentscope-ai/QwenPaw/pull/7983)  
   提升 QQ Channel 消息处理幂等性，避免重复回复。

### 需要维护者进一步确认的问题

1. [Issue #7981 chat_with_agent foreground timeout](https://github.com/agentscope-ai/QwenPaw/issues/7981)  
   当前暂无修复 PR，建议明确 timeout 语义、工具结果格式和父 turn 收尾策略。

2. [Issue #7990 Aliyun Token Plan thinking_param_style](https://github.com/agentscope-ai/QwenPaw/issues/7990)  
   建议维护者确认 Aliyun Token Plan 各模型实际支持的 reasoning 参数类型，并更新 `model_catalog.json`。

---

## 总体健康度评估

今日项目活跃度较高，且多个用户反馈迅速形成了对应 PR，说明社区贡献意愿和问题响应速度良好。当前主要风险不是“无人响应”，而是“修复集中排队、尚未合并”。  
如果维护者能优先合并 `grep_search`、Browser SDK、Gemini provider 相关修复，项目稳定性会有明显提升；若这些 PR 长时间停留在 Open 状态，则可能影响高级用户对工具安全性、浏览器自动化能力和模型兼容性的信心。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报（2026-09-26）

## 1. 今日速览

过去 24 小时，ZeroClaw 活跃度较高：新增或更新 **14 条 Issues**、**16 条 PRs**，其中 **14 个 PR 仍待合并**，**2 个 PR 已关闭/完成处理**，暂无新版本发布。  
今日信号明显偏向 **安全边界、RPC 会话隔离、SOP 执行权限、工具调用解析与运行时一致性**，说明项目正处于密集修复和权限模型加固阶段。  
值得注意的是，多个新 Issue 被标记为 **S0 / 高风险 / 安全相关**，集中暴露在 `security/sandbox`、RPC、SOP、session ownership、workspace confinement 等核心路径上，短期维护优先级应明显偏向安全修复与回归测试。  
整体健康度来看，社区提交活跃、修复 PR 跟进较快，但待合并 PR 数量较高，且高风险安全问题较多，当前项目处于“高活跃但高压力”的维护状态。

---

## 2. 项目进展

今日没有新版本发布；项目推进主要体现在 PR 修复、运行时能力增强和文档补齐。

### 已关闭 / 已完成处理的重要 PR

#### PR #11115：恢复 `master` 构建稳定性  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11115  
状态：CLOSED  
标签：`core`, `runtime`, `risk:low`, `size:XS`, `cli`

该 PR 修复了多个近期 PR 合并后造成的 `zeroclaw-runtime` 测试目标编译失败问题。问题来自 #10155、#10259、#11085 的交叉影响，导致测试 fixture 中若干结构体字段初始化缺失。

**项目影响：**

- 恢复 `master` 分支测试构建能力。
- 降低后续 PR rebase / CI 失败概率。
- 对当前大量运行时与 RPC 相关 PR 的合并节奏有直接帮助。

#### PR #11120：修复 Apple preflight 测试中的 sleep mock 干扰  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11120  
状态：CLOSED  
标签：`scripts`, `size:XS`

该 PR 修复 `apple_preflight_test.py` 中全局 patch `time.sleep` 导致 subprocess 内部等待逻辑被错误捕获的问题。在负载较高的 runner 上，该问题会引发不稳定测试失败。

**项目影响：**

- 提升 release preflight 测试稳定性。
- 减少 CI 环境负载波动导致的假失败。
- 对发布流程可靠性有正向作用。

### 待合并但推进明显的重要 PR

#### PR #11112：绑定 RPC session 到规范化后的授权 workspace  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11112  
标签：`docs`, `runtime`, `domain:security`, `risk:high`, `size:M`

该 PR 针对 workspace confinement 中符号链接 retarget 问题进行修复：授权时使用 canonical path 校验，但 session 创建时保留了用户原始路径，可能导致后续 cwd 被重定向到未授权位置。  
它很可能是 Issue #11110 的直接修复 PR。

相关 Issue：  
https://github.com/zeroclaw-labs/zeroclaw/issues/11110

#### PR #11135：修复 DeepSeek DSML 工具调用解析  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11135  
标签：`size:S`

该 PR 让工具调用解析器在解析前规范化 DeepSeek DSML wrapper，避免模型把工具调用作为 DSML 文本放在 `content` 中时，原始 markup 泄漏到 channel，且 turn 静默结束。

相关 Issue：  
https://github.com/zeroclaw-labs/zeroclaw/issues/11130

#### PR #11133：RPC session 复用时重新校验 forwarded environment  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11133  
标签：`bug`, `runtime`, `domain:security`, `risk:high`, `ci:windows`, `topic:identity-access`

该 PR 修复 session resume / prompt 时 forwarded environment 权限校验不足的问题，避免远程连接或被降权 principal 继续使用此前管理员环境变量。

**项目影响：**

- 强化身份与访问控制边界。
- 降低 session 复用导致的权限残留风险。
- 与今日多个 session ownership / admin bypass 问题属于同一类安全主题。

#### PR #11132：RPC turn parity，补齐 steering、totals、session ops  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11132  
标签：`runtime`, `size:XL`

该 PR 提供 RPC turn path 与本地 turn 行为的一致性能力，包括运行中 steering、token totals、session ops 等。这是运行时 RPC 化的重要增强。

#### PR #11131：daemon 接管 observer event firehose  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11131  
标签：`docs`, `core`, `daemon`, `gateway`, `observability`, `runtime`, `size:XL`, `cli`

该 PR 解决 gateway 关闭时 daemon bus 无法收到 observer events、RPC `logs/subscribe` 丢失日志的问题。对 zerocode、TUI、远程可观测性体验有明显改善。

#### PR #11134：SOP 支持由 decision model 选择条件步骤  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11134  
标签：`docs`, `runtime`, `tool:sop`, `web`, `size:L`

该 PR 为 SOP 引入 `decide:` 条件步骤，让决策模型在一次请求中同时决定 gate、mode 和步骤是否执行。该功能增强了 SOP 自动化流程的表达能力。

---

## 3. 社区热点

今日讨论量总体不高，但安全问题密度很高。按评论与风险综合排序如下。

### Issue #11110：RPC workspace confinement 保留可重定向 cwd symlink  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11110  
状态：OPEN  
评论：1  
标签：`bug`, `runtime`, `security:policy`, `domain:security`, `priority:p1`, `risk:high`, `topic:identity-access`

这是今日最值得关注的问题之一。用户报告 scoped RPC session 在授权检查后仍保留 caller-controlled symlink 作为 workspace root，若该 symlink 在已授权 turn 期间被重定向，可能突破 workspace confinement。

**背后诉求：**

- RPC session 的授权结果必须绑定到不可变、规范化的真实路径。
- 安全检查不能只在 admission 阶段生效，后续 session 运行也必须继承同一安全边界。
- 用户对 agent 文件访问边界有强安全预期。

已有相关修复 PR：  
https://github.com/zeroclaw-labs/zeroclaw/pull/11112

### Issue #11108：不要将 browser/search 工具调用重写为 shell  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11108  
状态：OPEN  
评论：1  
标签：`bug`, `tool`, `tool:browser`, `tool:web`, `tool:shell`, `domain:security`, `risk:high`

用户指出 `map_tool_name_alias()` 会把 `browser_open`、`browser`、`web_search` 映射到 `shell`，破坏了 ZeroClaw 内建 browser / search 工具语义。

**背后诉求：**

- 工具别名兼容不应改变安全模型。
- 浏览器与搜索工具应保持独立权限和审计语义。
- 将 Web 类调用降级为 shell 可能扩大攻击面，也会破坏工具可观测性。

暂无明确修复 PR。

### Issue #11136：并行工具调用下同一路径 file_edit/file_write 静默丢失一个编辑  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11136  
状态：OPEN  
标签：无明确标签  
严重度：S0 - data loss / security risk

该问题指出在 `parallel_tools` 下，同时对同一路径发起 `file_edit` / `file_write` 可能出现写入竞争，导致一个编辑被静默覆盖或丢失。

**背后诉求：**

- 文件工具需要路径级锁、冲突检测或事务化写入。
- 并行工具调用必须有明确的数据一致性语义。
- 静默数据丢失比显式失败更危险，应优先处理。

暂无明确修复 PR。

---

## 4. Bug 与稳定性

以下按严重程度和风险排序。

### S0 / 高风险安全与数据损失问题

#### Issue #11110：RPC workspace confinement 可被 cwd symlink retarget 绕过  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11110  
影响范围：`security/sandbox`, `runtime`, `tool:file`  
风险：高  
状态：OPEN  
已有 fix PR：是，PR #11112  
修复链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11112

该问题可能导致 session 访问授权 workspace 外的文件路径，属于高优先级安全边界问题。

#### Issue #11136：并发文件写入导致静默数据丢失  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11136  
影响范围：`tools`, `runtime/daemon`  
风险：高  
状态：OPEN  
已有 fix PR：未发现

该问题会影响并行工具执行下的文件一致性，建议维护者尽快定义并实现 path-level serialization 或冲突返回机制。

#### Issue #11127：session-data tools 绕过 principal ownership checks  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11127  
影响范围：`security/sandbox`  
严重度：S0  
状态：OPEN  
已有 fix PR：未发现

用户通过源码审查发现，非管理员 principal 如果拥有 `sessions_history` 权限，可能读取其他 principal 的 session 数据。这是典型的横向越权风险。

#### Issue #11126：队列中的 session 操作保留已撤销管理员 ownership bypass  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11126  
影响范围：`security/sandbox`  
严重度：S0  
状态：OPEN  
已有 fix PR：未发现

问题集中在“授权状态被排队操作捕获后未重新验证”。如果管理员被降权，已排队操作仍可能保留管理员级 ownership bypass。

#### Issue #11125：SOP execution 缺少 `tools:execute` 权限检查  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11125  
影响范围：`security/sandbox`  
严重度：S0  
状态：OPEN  
已有 fix PR：未发现

用户指出非管理员 principal 可能在具备 `sops:execute`、entitled agent、`allowed_tools = ["*"]` 的情况下执行工具，而不需要单独的 `tools:execute` 授权。

#### Issue #11123：SOP execution 接受 wildcard tool selectors 且缺少 `tools:execute`  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11123  
影响范围：`security/sandbox`  
严重度：S0  
状态：OPEN  
已有 fix PR：未发现

该问题与 #11125 相关，核心是 SOP 工具选择器与全局工具执行权限之间存在策略不一致。

#### Issue #11124：SOP decision gate 在 mode answer 有效时忽略 strict fallback  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11124  
影响范围：`security/sandbox`  
严重度：S0  
状态：OPEN  
已有 fix PR：未发现

当 SOP decision model 返回缺失或格式错误的 start gate，但提供有效 Auto mode answer 时，默认 `gate_on_error = "run_strict"` 可能未按预期阻止自动执行。

### S1 / 工作流阻塞

#### Issue #11130：DeepSeek DSML 工具调用 markup 未被解析  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11130  
影响范围：`provider`, `channel`, `runtime`  
严重度：S1  
状态：OPEN  
已有 fix PR：是，PR #11135  
修复链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11135

该问题会导致模型输出的工具调用无法被执行，而是作为原始 markup 泄漏到 channel，并且 turn 静默结束。对 DeepSeek 兼容性和用户信任影响明显。

### S2 / 退化行为

#### Issue #11108：browser/search 工具调用被重写为 shell  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11108  
影响范围：`tools`, `browser`, `web`, `shell`  
严重度：S2  
风险：高  
状态：OPEN  
已有 fix PR：未发现

该问题既是行为退化，也是安全语义退化，建议优先处理。

#### Issue #11129：memory content scan 误拦截包含 URL 的普通 SOP audit records  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11129  
影响范围：`memory`  
严重度：S2  
状态：OPEN  
已有 fix PR：未发现

`send_to_url` 模式过宽，导致普通文本只要同时包含 URL 和 `api_key` / `secret` / `token` 等词就被拒绝。该问题影响审计记录写入，属于误报型可用性问题。

---

## 5. 功能请求与路线图信号

今日路线图信号非常清晰，集中在多 agent 通信、SOP、人类审批、消息送达回执和运行时 RPC 能力上。

### Tracker #11119：实现 RFC #11027 的 receiver-discretionary session messaging  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11119  
类型：implementation batch tracker

该 tracker 计划实现 agent-to-agent session messaging，重点是 runtime-owned messaging 与 same-alias session 之间的消息传递。

**路线图含义：**

- ZeroClaw 正在推进原生多 agent 协作能力。
- 消息接收方拥有 discretion，说明项目重视 agent 间通信的权限与控制边界。
- 可能成为下一阶段 multi-agent runtime 的基础设施。

### Tracker #11118：实现 RFC #11017 的 expedited review-continuity amendment  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11118  
类型：implementation batch tracker

该 tracker 面向维护流程和 review continuity，允许指定非作者 Core maintainer 延续适用的第二轮 review。

**路线图含义：**

- 项目正在优化治理与维护流程。
- 在 PR 数量较高的背景下，该流程改进有助于减少 review 堵塞。

### Tracker #11117：实现 durable human-question primitive  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11117  
类型：implementation batch tracker

该 tracker 计划为 agent 向人类提问提供持久化 runtime primitive，可用于 SOP gates、tool approvals 和自由问答。

**路线图含义：**

- Human-in-the-loop 将成为 ZeroClaw 的核心 runtime 能力。
- 与 SOP 审批、工具授权、安全执行路径高度相关。
- 很可能会进入未来版本的重点功能集合。

### Tracker #11116：实现 outbound delivery receipts  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11116  
类型：implementation batch tracker

该 tracker 计划实现 outbound message identity、channel delivery outcomes 和 durable delivery receipt。

**路线图含义：**

- 项目正在加强消息可靠性与可审计性。
- 对 Discord、Telegram、远程 channel、agent messaging 等均有价值。
- 与 PR #11122 的 Discord native replies 属于同一方向。

### PR #11134：SOP 条件步骤  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11134

该 PR 已经给出具体实现，可信度高于普通功能请求。若合并，SOP 将支持 decision model 根据上下文选择步骤执行。

**可能进入下一版本的概率：高。**

### PR #11132：RPC turn parity  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11132

该 PR 规模较大，但对 RPC 化运行时非常关键。它补齐 steering、session ops、totals 等能力，是远程控制和 UI 集成的基础。

**可能进入下一版本的概率：中高，取决于 review 与测试压力。**

### PR #11122：Discord 原生回复与 inbound reply context  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11122

该 PR 改善 Discord channel 中 reply 上下文，使 agent 能理解“这个”“上面那条”等指代。

**可能进入下一版本的概率：中高。**

---

## 6. 用户反馈摘要

从今日 Issues 可以提炼出以下真实用户痛点。

### 1. 用户对安全边界的期望非常明确

多个 Issue 来自源码审查或权限模型分析，包括：

- workspace symlink retarget：#11110  
  https://github.com/zeroclaw-labs/zeroclaw/issues/11110
- session ownership bypass：#11127  
  https://github.com/zeroclaw-labs/zeroclaw/issues/11127
- revoked admin bypass retention：#11126  
  https://github.com/zeroclaw-labs/zeroclaw/issues/11126
- SOP 缺少 `tools:execute`：#11125  
  https://github.com/zeroclaw-labs/zeroclaw/issues/11125
- wildcard tool selector 权限不一致：#11123  
  https://github.com/zeroclaw-labs/zeroclaw/issues/11123

用户关注点不是单一 bug，而是 **授权校验是否在 session 生命周期、队列执行、SOP 执行、工具调用之间保持一致**。

### 2. 用户不接受“静默失败”或“静默丢数据”

典型案例：

- DeepSeek DSML 工具调用未执行但 turn 静默结束：#11130  
  https://github.com/zeroclaw-labs/zeroclaw/issues/11130
- 并行 file_edit / file_write 丢失一个编辑：#11136  
  https://github.com/zeroclaw-labs/zeroclaw/issues/11136

这说明用户希望 ZeroClaw 在失败时具备明确错误、可观测事件和可恢复路径，而不是让 agent 看似完成但实际未完成。

### 3. 工具语义和权限语义必须一致

Issue #11108 指出 browser/search 被映射为 shell：  
https://github.com/zeroclaw-labs/zeroclaw/issues/11108

用户痛点在于：

- shell 权限通常比 browser/search 更危险。
- 工具别名兼容不能牺牲审计、权限和行为预期。
- 用户希望工具层有稳定、可预测的 contract。

### 4. 安全扫描误报正在影响可用性

Issue #11129：  
https://github.com/zeroclaw-labs/zeroclaw/issues/11129

用户希望 memory write-path 的敏感信息扫描更精准。当前 pattern 可能把普通审计记录误判为 secret exfiltration，影响 SOP audit records 的保存。

---

## 7. 待处理积压

基于当前 24 小时数据，尚不能判断“长期未响应”的历史积压；但今日新增的待处理事项已经形成明显压力。建议维护者重点关注以下队列。

### 高优先级安全 Issue 队列

1. Issue #11127：session-data tools 绕过 principal ownership checks  
   https://github.com/zeroclaw-labs/zeroclaw/issues/11127

2. Issue #11126：queued session operations 保留 revoked admin bypass  
   https://github.com/zeroclaw-labs/zeroclaw/issues/11126

3. Issue #11125：SOP execution 缺少 `tools:execute` 检查  
   https://github.com/zeroclaw-labs/zeroclaw/issues/11125

4. Issue #11124：SOP decision gate 忽略 strict fallback  
   https://github.com/zeroclaw-labs/zeroclaw/issues/11124

5. Issue #11123：SOP wildcard tool selectors 权限校验不完整  
   https://github.com/zeroclaw-labs/zeroclaw/issues/11123

这些问题都集中在授权一致性上，建议统一建模处理，避免逐个打补丁后仍出现策略缝隙。

### 数据一致性与运行时稳定性

- Issue #11136：并发 file_edit/file_write 静默丢失编辑  
  https://github.com/zeroclaw-labs/zeroclaw/issues/11136

该问题尚无明确 fix PR，且影响数据完整性，建议尽快 triage。

### 待合并高价值 PR

1. PR #11112：RPC workspace canonical binding  
   https://github.com/zeroclaw-labs/zeroclaw/pull/11112

2. PR #11135：DeepSeek DSML parser fix  
   https://github.com/zeroclaw-labs/zeroclaw/pull/11135

3. PR #11133：session reuse forwarded environment revalidation  
   https://github.com/zeroclaw-labs/zeroclaw/pull/11133

4. PR #11132：RPC turn parity  
   https://github.com/zeroclaw-labs/zeroclaw/pull/11132

5. PR #11131：daemon observer event firehose  
   https://github.com/zeroclaw-labs/zeroclaw/pull/11131

这些 PR 分别覆盖安全、模型兼容性、RPC 运行时一致性和可观测性。若 CI 通过且 review 风险可控，建议优先推进前 3 个高风险修复类 PR。

---

## 今日结论

ZeroClaw 今日表现出很强的社区活跃度和工程推进速度，但风险结构偏重：大量新问题集中在 **RPC session、SOP 权限、工具执行、workspace confinement、并行文件写入** 等核心安全与数据完整性路径。  
短期最重要的维护目标应是：先合并已准备好的高风险修复 PR，再集中梳理 SOP 与 session 权限模型，最后处理运行时功能增强类大型 PR。  
如果这些安全问题能在下一轮发布前完成修复并补充回归测试，项目健康度将显著提升；否则当前的高风险积压可能成为下一版本发布阻塞点。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*