# OpenClaw 生态日报 2026-10-07

> Issues: 9 | PRs: 40 | 覆盖项目: 13 个 | 生成时间: 2026-10-07 04:52 UTC

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

# OpenClaw 项目动态日报｜2026-10-07

## 1. 今日速览

OpenClaw 今日活跃度很高：过去 24 小时内有 **9 条 Issue 更新**、**40 条 PR 更新**，其中 **28 条 PR 仍待合并**，**12 条已合并或关闭**。  
今日主要焦点集中在 **Gateway 可用性、会话状态一致性、消息丢失、预检压缩失败、Doctor/更新流程、以及安全边界**。  
从标签看，多个新 Issue 被标为 **P1**，且涉及 `impact:session-state`、`impact:message-loss`、`impact:security`，说明当前稳定性与可靠性压力较高。  
与此同时，维护侧也在持续推进大规模重构：大量 PR 将 SQLite/状态读取从 Gateway 主线程迁移到 worker，显示项目正在系统性降低 Gateway 阻塞与可用性风险。  
整体健康度评估：**开发活跃、维护响应较快，但当前回归与稳定性风险偏高，建议优先收敛 P1/P2 可用性与消息可靠性问题。**

---

## 2. 版本发布

今日 **无新版本发布**。

最近 Releases 数据为空，因此暂无破坏性变更、迁移说明或升级注意事项可报告。

---

## 3. 项目进展

今日有多条 PR 已关闭或合并，主要推进方向包括 Gateway 稳定性、UI 状态准确性、运行时兼容性与测试清理。

### 重要已关闭 / 已合并 PR

#### 1. 修复 Homebrew Node 升级后子进程启动路径问题  
- PR: [#166430](https://github.com/openclaw/openclaw/pull/166430)  
- 状态：Closed  
- 类型：P1、兼容性风险  
- 摘要：修复 Homebrew 移除旧 Node 可执行文件后，仍在运行的 Gateway 启动 exec / stdio MCP 子进程失败的问题。  
- 关联 Issue：[#166170](https://github.com/openclaw/openclaw/issues/166170)  
- 影响：提升 macOS/Homebrew 环境下 Gateway 长时间运行后的稳定性，减少 Node 路径变动导致的子进程不可用问题。

#### 2. 修复 root 节点 workspace reconcile 失败时诊断信息丢失  
- PR: [#166441](https://github.com/openclaw/openclaw/pull/166441)  
- 状态：Closed  
- 摘要：RunPod worker 以 UID 0 运行时，turn 完成后 workspace reconciliation 失败，只暴露 `UNAVAILABLE`，底层异常被丢弃。该 PR 改进错误传播与诊断。  
- 影响：提升远程 worker / root 环境下故障定位能力，降低“只知道失败、不知道为什么”的运维成本。

#### 3. 修复 Control UI 中 delegated subagents 状态显示错误  
- PR: [#166442](https://github.com/openclaw/openclaw/pull/166442)  
- 状态：Closed  
- 摘要：子代理自身 turn 完成后，若其 descendants 仍在运行，UI 过早将其归入 Finished。该 PR 保持 delegated subagents 在运行面板中，直到实际工作完成。  
- 影响：改善多代理委派执行的可观测性，避免用户误判任务已经完成。

#### 4. 跨模块小型清理重构  
- PR: [#166427](https://github.com/openclaw/openclaw/pull/166427)  
- 状态：Closed  
- 涉及：Discord、Matrix、Telegram、WhatsApp Web、Web UI、Gateway、CLI、A2A 等  
- 摘要：清理重复 schema 类型、SDK helper、回调体与重复值。  
- 影响：无预期用户可见行为变化，但有助于降低维护复杂度。该 PR 标记为 `security-sensitive-changed`，说明涉及安全敏感路径，仍需关注回归风险。

#### 5. Browser 测试 setup 复用重构  
- PR: [#166292](https://github.com/openclaw/openclaw/pull/166292)  
- 状态：Closed  
- 摘要：复用 browser download/output-write settlement 测试 setup，保留现有 41 个测试用例行为。  
- 影响：降低测试维护成本，对用户无直接影响。

#### 6. Control UI locale 自动刷新  
- PR: [#166390](https://github.com/openclaw/openclaw/pull/166390)  
- 状态：Closed  
- 作者：openclaw-mantis[bot]  
- 摘要：同步生成的 Control UI locales。  
- 影响：维护国际化资源一致性。

### 今日仍在推进的重要开放 PR

#### Gateway / 状态访问主线程减负

- [#166444](https://github.com/openclaw/openclaw/pull/166444) `refactor(placement): move lifecycle and grant preparation to workers`  
  将 placement lifecycle 与 grant preparation 迁移到 worker，减少 Gateway 线程 SQLite 操作。

- [#166445](https://github.com/openclaw/openclaw/pull/166445) `refactor(placement): migrate remaining native read callers`  
  继续迁移 placement 读取调用，减少 Gateway 阻塞。

- [#166252](https://github.com/openclaw/openclaw/pull/166252) `refactor(state): move restart preflight into inspection worker`  
  将 Gateway restart readiness inspection 放入 worker，避免在 Gateway 线程执行共享状态检查。

- [#166236](https://github.com/openclaw/openclaw/pull/166236) `refactor(worktrees): move row guards and retirement to worker owner`  
  将 worktree guard 与 retirement 操作迁移到 worker owner，降低主线程 SQL 负担。

这些 PR 显示 OpenClaw 正在进行一条清晰的工程路线：**把状态数据库、placement、worktree、preflight 等重量级操作从 Gateway 主线程剥离，提升系统响应性和可用性。**

---

## 4. 社区热点

> 说明：PR 数据中的评论数显示为 `undefined`，因此无法严格按评论数排序。以下根据 Issue 评论数、优先级、标签严重程度和影响面综合判断热点。

### 1. Transcript admission guard 导致普通 turn / native child / settle 公告中止  
- Issue: [#166446](https://github.com/openclaw/openclaw/issues/166446)  
- 状态：Open  
- 优先级：P1  
- 评论：2  
- 标签：`impact:session-state`、`impact:message-loss`、`needs-maintainer-review`  
- 摘要：OpenClaw 2026.10.1-beta.1 中，普通 Telegram turn、native child run、requester-settle announcement 被 `context-engine transcript target changed before provider dispatch` 中止。报告者强调这不是 provider authentication 问题，而是 host-side transcript admission failure。  
- 背后诉求：用户需要系统保证会话转录目标稳定，不应在推理前因上下文准入状态变化导致普通消息流被中断。  
- 当前 fix PR：未看到明确关联 fix PR。

### 2. 预检压缩失败导致会话被 primary provider 429 卡住  
- Issue: [#166436](https://github.com/openclaw/openclaw/issues/166436)  
- 状态：Open  
- 优先级：P1  
- 标签：`impact:session-state`、`impact:auth-provider`  
- 摘要：preflight compaction 忽略模型 fallback chain，primary provider 额度耗尽返回 429 后，会话被卡住数小时，而正常 embedded runs 可以 fallback。  
- 背后诉求：用户期待 compaction 与普通推理路径一致支持 fallback，避免因单个 provider quota 问题拖垮整个 session。  
- 相关 PR：  
  - [#166448](https://github.com/openclaw/openclaw/pull/166448) 修复 compaction 失败原因不在普通日志级别显示的问题，但不直接解决 fallback 问题。

### 3. Failed wake deliveries 被静默丢弃  
- Issue: [#166437](https://github.com/openclaw/openclaw/issues/166437)  
- 状态：Open  
- 优先级：P1  
- 标签：`impact:message-loss`、`needs-live-repro`  
- 摘要：exec/process completion notifications、wrapper exit wakes、inbound user messages 等 wake 似乎只存在内存中，delivery 失败后没有持久化、重试或日志。  
- 背后诉求：消息与 wake 是 agent workflow 的关键状态信号，用户需要可靠递送、失败可见、可重试。  
- 当前 fix PR：未看到明确关联 fix PR。  
- 风险：高。该问题直接指向消息丢失和异步任务状态不可恢复。

### 4. macOS Canvas 可将任意注册 URL scheme 交给 NSWorkspace  
- Issue: [#166449](https://github.com/openclaw/openclaw/issues/166449)  
- 状态：Open  
- 优先级：P1  
- 标签：`impact:security`、`needs-security-review`、`needs-product-decision`  
- 摘要：macOS Canvas 面板仍会把任何有注册 app 的 URL scheme 交给 NSWorkspace，Canvas 页面可能打开 `file://`、`smb://` 等 scheme。  
- 背后诉求：需要明确 Canvas 中外部 URL scheme 的安全边界和产品策略。  
- 当前 fix PR：未看到明确关联 fix PR。  
- 风险：安全敏感，需要优先审查。

### 5. Doctor 每次启动都错误认为 main agent DB 被 Held  
- Issue: [#166450](https://github.com/openclaw/openclaw/issues/166450)  
- 状态：Open  
- 优先级：P2  
- 标签：`impact:ux-friction`、`source-repro`  
- 摘要：Doctor 每次 Gateway 启动都报告 `main` agent database 为 Held，且 `openclaw doctor --fix` 无法永久修复，重启后复现。  
- 相关 PR：  
  - [#166413](https://github.com/openclaw/openclaw/pull/166413) `fix(doctor): avoid inherited state maintenance during repair`  
- 背后诉求：Doctor 应提供稳定可靠的修复能力，而不是形成“修复后又复现”的循环。

---

## 5. Bug 与稳定性

### P1 / 高严重度

#### 1. Transcript admission guard 中止普通消息流  
- Issue: [#166446](https://github.com/openclaw/openclaw/issues/166446)  
- 严重度：P1  
- 影响：session-state、message-loss  
- 现象：普通 Telegram turn、native child run、settle announcement 在 provider dispatch 前被 abort。  
- 是否已有 fix PR：未发现明确关联 PR。  
- 建议：优先确认 context-engine transcript target 的并发更新/准入条件，避免错误将正常 turn 判定为 transcript target changed。

#### 2. Preflight compaction 忽略 fallback chain  
- Issue: [#166436](https://github.com/openclaw/openclaw/issues/166436)  
- 严重度：P1  
- 影响：session-state、auth-provider  
- 现象：primary provider 429 后，preflight compaction 不使用 fallback，导致 session 长时间 wedge。  
- 是否已有 fix PR：暂无直接修复；[#166448](https://github.com/openclaw/openclaw/pull/166448) 改善日志可见性。  
- 建议：将 compaction 路径与普通 inference 的 fallback 策略对齐，至少在 provider quota/cooldown 场景启用 fallback。

#### 3. Failed wake deliveries 静默丢弃  
- Issue: [#166437](https://github.com/openclaw/openclaw/issues/166437)  
- 严重度：P1  
- 影响：message-loss  
- 现象：wake delivery 失败后无持久化、无重试、无日志。  
- 是否已有 fix PR：未发现明确关联 PR。  
- 建议：引入 durable wake queue、delivery attempts、失败日志与 retry/backoff 机制。

#### 4. macOS Canvas URL scheme 安全边界问题  
- Issue: [#166449](https://github.com/openclaw/openclaw/issues/166449)  
- 严重度：P1  
- 影响：security  
- 现象：Canvas 页面可能通过 NSWorkspace 打开 `file://`、`smb://` 等本地或网络 scheme。  
- 是否已有 fix PR：未发现明确关联 PR。  
- 建议：短期阻断高风险 scheme；中期建立 allowlist / user confirmation / policy enforcement。

#### 5. Cron agentTurn fallback 到零可用工具模型后仍记录成功  
- Issue: [#166451](https://github.com/openclaw/openclaw/issues/166451)  
- 严重度：P1  
- 影响：任务状态准确性、告警可靠性  
- 现象：cron `agentTurn` fallback 到没有可用工具的模型后，尽管模型 summary 表示无法完成任务，系统仍记录 `status: ok` / `completionStatus: succeeded`。  
- 是否已有 fix PR：未发现明确关联 PR。  
- 建议：将“模型无工具且任务不可执行”归为失败或部分失败，触发 failure alerts 与 consecutiveErrors 统计。

### P2 / 中高严重度

#### 6. Compaction failure reason 没有被正常日志记录  
- Issue: [#166438](https://github.com/openclaw/openclaw/issues/166438)  
- 严重度：P2  
- 影响：可观测性、故障定位  
- 现象：多小时 compaction failure loop 中，只有 generic `agent-runner-failure` 和 heartbeat `consecutiveErrors`，看不到失败原因。  
- fix PR：[#166448](https://github.com/openclaw/openclaw/pull/166448)  
- PR 状态：Open，ready for maintainer look  
- 评估：修复路径明确，建议优先合并以提升现场诊断能力。

#### 7. Doctor 每次启动误报 main agent DB Held  
- Issue: [#166450](https://github.com/openclaw/openclaw/issues/166450)  
- 严重度：P2  
- 影响：UX friction、Doctor 修复可信度  
- 现象：`openclaw doctor --fix` 不能永久修复，重启后复现。  
- 相关 PR：[#166413](https://github.com/openclaw/openclaw/pull/166413)  
- 评估：可能与 shared-state handle、WAL maintenance worker、repair lease 交互有关。

#### 8. Update failure: doctor-failed  
- Issue: [#166455](https://github.com/openclaw/openclaw/issues/166455)  
- 严重度：未标注，但影响升级  
- 环境：OpenClaw 2026.9.5，Windows x64，Node 24.19.0，目标 2026.9.8  
- 现象：更新失败，原因为 `doctor-failed`。  
- 相关 PR：  
  - [#166410](https://github.com/openclaw/openclaw/pull/166410) 改善 update refusal 中失败 preflight check、resolved install、runtime 信息展示。  
- 评估：需要确认是否与 Doctor repair / 多安装路径 / Node runtime 检测相关。

### P3 / 低中严重度或功能增强型

#### 9. 本地多模态 memory indexing 能力请求已关闭  
- Issue: [#166453](https://github.com/openclaw/openclaw/issues/166453)  
- 状态：Closed  
- 严重度：P3  
- 摘要：请求支持通过 OpenAI-compatible embedding endpoint 使用本地多模态 embedding，例如 llama.cpp 上的 EmbeddingGemma 2。  
- 评估：虽然已关闭，但反映出用户对本地化、多模态、OpenAI-compatible provider 的需求。

---

## 6. 功能请求与路线图信号

### 1. 本地多模态 memory indexing  
- Issue: [#166453](https://github.com/openclaw/openclaw/issues/166453)  
- 状态：Closed  
- 用户诉求：允许 `memory.search.multimodal` 使用 `provider: "openai-compatible"` 或 `local`，当 endpoint 支持 image/audio input 时可用本地 embedding 模型。  
- 路线图信号：  
  - OpenClaw 用户正在尝试降低对 Gemini Embedding 2 等云端服务的依赖。  
  - 本地 multimodal embedding 与 OpenAI-compatible API 兼容层可能成为未来 memory 能力扩展方向。  
- 纳入下一版本可能性：从当前 Issue 已关闭看，短期不确定；若已有设计分歧，可能需要产品/架构层重新讨论。

### 2. OpenAI Decisions API 支持  
- PR: [#166320](https://github.com/openclaw/openclaw/pull/166320)  
- 状态：Open，needs proof  
- 摘要：为 OpenAI plugin 支持 typed Decisions API evaluations，使用户可选择 `openai/gpt-6-luna` 并执行 evaluation。  
- 路线图信号：OpenClaw 正在扩展“决策模型 / 评估模型”能力，而不仅是普通聊天模型。  
- 纳入下一版本可能性：中等。该 PR 已有实现，但仍需 proof。

### 3. Durable delegated execution ownership guard  
- PR: [#166243](https://github.com/openclaw/openclaw/pull/166243)  
- 状态：Open  
- 摘要：新增 durable registry：`delegated_execution_ownership` 与事件表，强化 `OPENCLAW_MUST_NOT_EXECUTE_DELEGATED_TASK_DIRECTLY` invariant。  
- 路线图信号：项目正在加强 delegated execution 的所有权边界与可审计性。  
- 纳入下一版本可能性：中等偏低到中等。该 PR 影响面极广，涉及大量 channels、plugins、extensions，合并风险较高，需要充分评审。

### 4. Memory Wiki 大规模搜索时保持 Gateway 响应  
- PR: [#166433](https://github.com/openclaw/openclaw/pull/166433)  
- 状态：Open，ready for maintainer look  
- 关联 Issue：[#166304](https://github.com/openclaw/openclaw/issues/166304)  
- 摘要：优化 large wiki searches，避免 Gateway 阻塞。  
- 路线图信号：memory-wiki 正在向更大规模数据集使用场景演进。  
- 纳入下一版本可能性：较高。PR 标记 proof sufficient，且 P1、ready for maintainer look。

### 5. Gateway 性能优化：artifact / membership read round trips  
- PR: [#166447](https://github.com/openclaw/openclaw/pull/166447)  
- 状态：Open  
- 摘要：减少 artifact reads 与 membership evidence 的重复 metadata/session-store 读取。  
- 路线图信号：Gateway 读路径性能优化仍是当前重点。  
- 纳入下一版本可能性：中等到较高，取决于 security-sensitive 变更评审。

---

## 7. 用户反馈摘要

### 主要用户痛点

#### 1. “系统卡住但不知道为什么”
相关：
- [#166438](https://github.com/openclaw/openclaw/issues/166438)  
- [#166436](https://github.com/openclaw/openclaw/issues/166436)  
- [#166448](https://github.com/openclaw/openclaw/pull/166448)

用户在多小时 compaction failure loop 中只能看到泛化的 `agent-runner-failure`，无法判断是 quota、overload、auth，还是 preflight compaction 阶段失败。  
这类反馈说明 OpenClaw 在复杂 agent runtime 中需要更强的 **阶段级错误归因** 和 **普通日志级别可见性**。

#### 2. “消息或 wake 不能丢”
相关：
- [#166437](https://github.com/openclaw/openclaw/issues/166437)  
- [#166446](https://github.com/openclaw/openclaw/issues/166446)

用户把 OpenClaw 用于 Telegram turn、native child run、exec/process completion notification 等异步流程时，期望 delivery 失败可重试、可追踪、可恢复。  
目前反馈指向一个核心可靠性诉求：**agent runtime 的消息流必须 durable，而不能只依赖内存队列。**

#### 3. “fallback 策略应一致”
相关：
- [#166436](https://github.com/openclaw/openclaw/issues/166436)  
- [#166451](https://github.com/openclaw/openclaw/issues/166451)

用户已经配置了 primary + fallback 模型链，但发现 compaction 或 cron agentTurn 在某些路径下没有按预期 fallback，或 fallback 后状态判断不准确。  
这说明用户期望 OpenClaw 的模型路由语义在所有内部阶段一致，包括 preflight、compaction、cron、embedded runs 和工具调用。

#### 4. “Doctor / Update 必须可信”
相关：
- [#166450](https://github.com/openclaw/openclaw/issues/166450)  
- [#166455](https://github.com/openclaw/openclaw/issues/166455)  
- [#166413](https://github.com/openclaw/openclaw/pull/166413)  
- [#166410](https://github.com/openclaw/openclaw/pull/166410)

用户在升级或 repair 时遇到 `doctor-failed`、DB Held 反复出现等问题。  
这类反馈表明 Doctor 是用户信任系统健康状态的入口，一旦 Doctor 误报或修复后复发，会显著影响用户对 OpenClaw 稳定性的信心。

#### 5. “UI 状态必须反映真实运行状态”
相关：
- [#166442](https://github.com/openclaw/openclaw/pull/166442)  
- [#166379](https://github.com/openclaw/openclaw/pull/166379)  
- [#166034](https://github.com/openclaw/openclaw/pull/166034)

用户依赖 Control UI / iOS UI 判断任务是否仍在运行、子会话是否完成、按钮是否可读。  
今日多条 UI PR 表明维护者正在修复显示状态与真实状态不一致、深色模式对比度不足、分页误报等问题。

---

## 8. 待处理积压

> 数据窗口仅覆盖过去 24 小时，无法判断“长期未响应”。以下列出今日仍需维护者优先关注的高影响开放项。

### 需要维护者优先审查的 P1 Issue

1. [#166446](https://github.com/openclaw/openclaw/issues/166446)  
   `transcript admission guard aborts ordinary turns and native child settlement before inference`  
   - 影响：session-state、message-loss  
   - 状态：needs-maintainer-review  
   - 风险：普通 turn 被中止，影响核心可用性。

2. [#166437](https://github.com/openclaw/openclaw/issues/166437)  
   `Failed wake deliveries are silently dropped`  
   - 影响：message-loss  
   - 状态：needs-maintainer-review、needs-live-repro  
   - 风险：异步通知和用户消息可能丢失。

3. [#166449](https://github.com/openclaw/openclaw/issues/166449)  
   `macOS Canvas hands registered URL schemes to NSWorkspace`  
   - 影响：security  
   - 状态：needs-security-review、needs-product-decision  
   - 风险：Canvas 外部 scheme 打开策略存在潜在安全边界问题。

4. [#166436](https://github.com/openclaw/openclaw/issues/166436)  
   `Preflight compaction ignores the model fallback chain`  
   - 影响：session-state、auth-provider  
   - 风险：provider quota 429 可导致会话长时间不可用。

5. [#166451](https://github.com/openclaw/openclaw/issues/166451)  
   `cron agentTurn fallback to model with zero usable tools is recorded succeeded`  
   - 影响：任务结果准确性、告警可靠性  
   - 风险：失败任务被记录为成功，可能掩盖自动化故障。

### 需要合并或补 proof 的关键 PR

1. [#166448](https://github.com/openclaw/openclaw/pull/166448)  
   `fix(auto-reply): preflight compaction failures log no reason at normal log levels`  
   - 建议：优先合并。该 PR 能直接缓解 compaction 故障不可观测问题。

2. [#166413](https://github.com/openclaw/openclaw/pull/166413)  
   `fix(doctor): avoid inherited state maintenance during repair`  
   - 建议：结合 [#166450](https://github.com/openclaw/openclaw/issues/166450) 和 [#166455](https://github.com/openclaw/openclaw/issues/166455) 验证，避免 Doctor repair 反复失效。

3. [#166410](https://github.com/openclaw/openclaw/pull/166410)  
   `fix(update): name the failing preflight check, the resolved install, and the detected runtime when refusing`  
   - 建议：对 Windows、多安装、PATH stale 场景补充验证。

4. [#166433](https://github.com/openclaw/openclaw/pull/166433)  
   `improve(memory-wiki): keep the gateway responsive during large wiki searches`  
   - 建议：优先 review。P1 且 proof sufficient，直接改善 Gateway 可用性。

5. [#166444](https://github.com/openclaw/openclaw/pull/166444)、[#166445](https://github.com/openclaw/openclaw/pull/166445)、[#166252](https://github.com/openclaw/openclaw/pull/166252)、[#166236](https://github.com/openclaw/openclaw/pull/166236)  
   - 共同方向：将状态/placement/worktree/restart preflight 等操作迁移至 worker。  
   - 建议：分批合并，重点观察 Gateway latency、SQLite contention、worker failure recovery 与安全敏感路径回归。

---

## 总体结论

OpenClaw 今日处于 **高活跃、高维护投入、高稳定性压力** 的状态。  
项目正在积极推进 Gateway 主线程减负、状态访问 worker 化、诊断能力增强和 UI 状态准确性修复，这些方向对长期健康非常正面。  
但短期内，P1 问题集中在 **消息丢失、session wedge、fallback 不一致、安全边界、错误成功状态**，这些都直接影响用户信任和生产可用性。  
建议维护者优先处理：  
1. wake/message durable delivery；  
2. preflight compaction fallback 与日志；  
3. transcript admission abort；  
4. macOS Canvas URL scheme 安全策略；  
5. Doctor/update repair 可信度。

---

## 横向生态对比

# AI 智能体 / 个人 AI 助手开源生态横向对比报告  
日期：2026-10-07

---

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态呈现出明显的“两极分化”：头部项目如 **OpenClaw、Hermes Agent、ZeroClaw** 进入高强度迭代期，Issue/PR 密集集中在 Gateway、会话状态、消息投递、安全边界和运行时恢复能力；中型项目如 **NanoBot、NanoClaw、LobsterAI** 则更聚焦安装稳定性、Provider 兼容性、UI/协作体验和平台适配。  
整体来看，生态已从“能跑 Agent”转向“可靠运行 Agent”：消息不能丢、会话不能 wedge、状态必须可恢复、工具调用必须可达、权限边界必须明确。  
与此同时，企业化和生产化信号增强，包括 MDM 管理、remote-only Desktop、细粒度文件访问控制、RPC/Gateway 身份隔离、审计与插件治理等需求不断出现。  
但也能看到不少项目仍面临维护压力：部分项目高活跃但积压上升，部分项目则出现主仓库维护状态不明、社区 Fork 分流等治理风险。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 今日主要关注点 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 9 | 40 | 无 | Gateway 可用性、消息丢失、session-state、preflight compaction、Doctor/Update、安全边界 | **高活跃，高稳定性压力**；维护响应快，但 P1 问题集中 |
| **Hermes Agent** | 50 | 50 | 无 | Desktop 更新链路、Gateway 消息投递、session 持久化、插件治理、provider 错误分类 | **极高活跃，高积压压力**；社区反馈强，P1/P2 较多 |
| **ZeroClaw** | 12 | 21 | 无 | runtime 配置热更新、成本控制、安全策略、Provider 扩展、RPC/Gateway 边界 | **高活跃，工程化推进快**；需控制关键模块回归风险 |
| **NanoClaw** | 1 | 6 | 无 | 安装稳定性、delivery 状态真实性、工具可达性、OneCLI gateway 兼容 | **良好，发布前稳定性打磨**；修复链路清晰 |
| **LobsterAI** | 1 | 6 | 无 | Mac Computer Use、cowork 网络错误、进度 UI、OpenClaw 插件化、CI 治理 | **积极健康**；工程质量与用户体验同步推进 |
| **NanoBot** | 3 | 4 | 无 | DeepSeek Web Search 兼容、checkpoint 恢复、Slack 降噪、WebUI 可访问性 | **中等活跃，响应较快**；关键修复待合并 |
| **NullClaw** | 0 | 3 | 无 | local_loop gate、并行 worker 安全、Zig 内存生命周期 | **低社区噪音，质量巩固中**；维护动作集中有效 |
| **PicoClaw** | 1 | 1 | 无 | 活跃 Fork 声明、DevOps 门禁、项目维护状态 | **维护连续性存在风险**；社区信任需澄清 |
| **CoPaw** | 1 | 0 | 无 | 推理强度控制功能请求 | **低活跃，有明确产品需求信号** |
| **IronClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **Moltis** | 0 | 0 | 无 | 无活动 | **静默** |
| **ZeptoClaw** | 0 | 0 | 无 | 无活动 | **静默** |

---

## 3. OpenClaw 在生态中的定位

### 3.1 相对优势

OpenClaw 是今日样本中最具代表性的“复杂多 Gateway / 多 Agent / 多状态系统”之一。与 NanoBot、NanoClaw 等更轻量项目相比，OpenClaw 的优势在于：

- **系统覆盖面广**：涉及 Telegram、Discord、Matrix、WhatsApp Web、CLI、Web UI、A2A、MCP、worker、Gateway、Doctor、Update 等多个运行面。
- **工程治理活跃**：24 小时内 40 条 PR 更新，说明维护团队正在持续压低 Gateway 阻塞、SQLite contention 和状态读取风险。
- **可靠性问题暴露充分**：虽然 P1 较多，但问题集中在真实生产路径，如消息丢失、session wedge、fallback 不一致、Doctor 修复不可信、安全 scheme 边界等，说明用户正在深度使用。
- **架构重构方向清晰**：多个 PR 将 SQLite/state/placement/worktree/preflight 从 Gateway 主线程迁移至 worker，体现出明确的高可用路线。

### 3.2 与同类项目的技术路线差异

| 对比对象 | OpenClaw 差异 |
|---|---|
| **Hermes Agent** | 两者都高度关注 Gateway、session、message delivery；Hermes 更突出 Desktop、插件企业治理和多平台 Bot 体验，OpenClaw 更突出 Gateway 主线程减负、状态数据库 worker 化和 Doctor/Update 可靠性 |
| **ZeroClaw** | ZeroClaw 更偏 runtime/security/config/RPC 边界工程化，OpenClaw 更偏多 Gateway、多会话、多代理状态一致性和消息流可靠性 |
| **NanoClaw** | NanoClaw 更聚焦安装、delivery 语义、工具可达性等发布前收敛；OpenClaw 复杂度更高，问题更多发生在分布式状态和 Gateway 并发路径 |
| **LobsterAI** | LobsterAI 以 OpenClaw 作为插件/能力承载层之一，更偏产品化桌面体验、Computer Use 与 cowork UI；OpenClaw 更像底层智能体运行时和网关基础设施 |
| **NanoBot** | NanoBot 更轻量，重点是 provider 兼容、checkpoint、Slack/WebUI 体验；OpenClaw 在多代理、多通道、session-state 和安全边界上暴露出更复杂的系统问题 |

### 3.3 社区规模与活跃度定位

从今日数据看，OpenClaw 的活跃度仅次于 Hermes Agent，明显高于 NanoBot、NanoClaw、LobsterAI、NullClaw 等项目。  
但 OpenClaw 的健康度不是“低风险高活跃”，而是“高活跃伴随高稳定性压力”：P1 Issue 涉及 `message-loss`、`session-state`、`security` 等关键标签，短期维护优先级应明显偏向可靠性收敛，而非功能扩张。

---

## 4. 共同关注的技术方向

### 4.1 消息投递可靠性与 durable delivery

涉及项目：

- **OpenClaw**：failed wake deliveries 静默丢弃、transcript admission guard 导致普通 turn 中止。
- **Hermes Agent**：Gateway message delivery、Discord wait status flooding、multi-profile Bot relay wrong profile delivery。
- **NanoClaw**：无 destination outbound message 被误标 delivered；无 chat session 中 `send_card` / `ask_user_question` 误报成功。
- **ZeroClaw**：ACP plan persistence failure 需要通过 typed session update 暴露；web hydration 与 session 状态一致性问题。

共同诉求：

- 消息发送必须有持久化状态。
- delivery failure 必须可见、可重试、可诊断。
- agent 不应把“未送达”误判为“成功”。
- Gateway/Channel/Bot 场景中状态更新需要去噪、合并和幂等。

这表明 Agent 系统正在从“响应式聊天机器人”走向“可靠异步执行系统”。

---

### 4.2 会话状态一致性与恢复能力

涉及项目：

- **OpenClaw**：session wedge、transcript target changed、preflight compaction failure、Doctor DB Held。
- **Hermes Agent**：DeepSeek 400 误分类导致 session 卡死、Desktop transcript 切换后回复消失、state.db health check。
- **NanoBot**：runtime checkpoint 恢复时丢失已完成工具迭代。
- **ZeroClaw**：config migration 可能导致 agent 消失、ZeroCode 重启后 session 状态显示错误。
- **NullClaw**：local_loop 生命周期、并发 worker 安全、内存生命周期修复。

共同诉求：

- 长任务和多工具调用必须可恢复。
- UI transcript 必须与底层 state.db / runtime 状态一致。
- checkpoint、migration、hydration、compaction 都不能破坏上下文。
- 系统需要 doctor/health check/snapshot 级别的状态诊断能力。

---

### 4.3 Provider 兼容性、fallback 与模型路由

涉及项目：

- **OpenClaw**：preflight compaction 忽略 fallback chain；cron agentTurn fallback 到无工具模型仍记录成功。
- **NanoBot**：DeepSeek Web Search 工具错误传入 Chat Completions 导致 LLM 调用不可用。
- **Hermes Agent**：Codex 429 未轮转账号；DeepSeek moderation 400 误判 context overflow。
- **ZeroClaw**：新增 Opper typed provider；subagent 支持 operator-declared model route。
- **CoPaw**：用户要求增加推理强度控制。
- **NanoBot**：heartbeat evaluator 支持独立模型预设。

共同诉求：

- 不同 provider 的 endpoint 能力差异需要显式建模。
- fallback 策略需要覆盖 compaction、cron、preflight、embedded run 等内部阶段。
- 模型选择正在从单一配置走向“任务级路由”：主 agent、子 agent、评估器、心跳、工具调用可用不同模型。
- 用户希望控制推理强度、成本、速度和质量。

---

### 4.4 Gateway 主线程减负与长运行服务可用性

涉及项目：

- **OpenClaw**：大量 PR 将 SQLite/state/placement/worktree/preflight 移至 worker。
- **ZeroClaw**：cost tracker 热更新、operator override、plugin registry timeout、remote RPC identity。
- **Hermes Agent**：Desktop update hand-off、Gateway supervision、Windows gateway bounded supervision。
- **LobsterAI**：Computer Use 请求体和代理错误诊断，screenshot scale 降低负载。
- **NanoClaw**：setup / gateway API 兼容修复。

共同诉求：

- Gateway 不能被数据库读写、大搜索、插件请求或 preflight 检查阻塞。
- 长时间运行 daemon 需要动态配置、不中断恢复和明确错误传播。
- worker 化、timeout、backpressure、retry/backoff 成为基础能力。

---

### 4.5 安全边界和企业治理

涉及项目：

- **OpenClaw**：macOS Canvas URL scheme 安全边界。
- **Hermes Agent**：Memory 拒写 credential-shaped entries；managed settings；remote-only Desktop；pre-send plugin hook。
- **ZeroClaw**：file_read glob filtering、RPC local-only schema、standalone gateway service identity、firejail_args 生效问题。
- **NanoClaw**：OneCLI policy API 替代 legacy rules。
- **LobsterAI**：清理遗留 NIM direct-SDK gateway，减少攻击面和依赖复杂度。

共同诉求：

- Agent 工具权限必须最小化、可审计、可配置。
- 插件和 Gateway 需要清晰身份边界。
- 企业部署需要 MDM、remote-only、allowlist、policy API、pre-send governance。
- 安全文档与运行时行为必须一致，否则会造成“虚假安全感”。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 / 路线特征 |
|---|---|---|---|
| **OpenClaw** | 多 Gateway、多代理、会话状态、MCP/A2A、Doctor/Update | 高级个人用户、Bot 集成者、复杂自动化用户 | Gateway + worker 化状态访问；强调 session-state、message flow、插件/通道集成 |
| **Hermes Agent** | Desktop、CLI、Gateway、插件、企业治理、Bot 平台 | 高级开发者、研究用户、企业 Desktop 部署 | 多平台 Gateway + Desktop；插件 hook 和企业策略需求强 |
| **ZeroClaw** | Runtime、RPC、security policy、provider route、ZeroCode | 工程化部署者、企业/团队、开发者 | Rust/runtime 工程化明显；重视配置热更新、安全 schema、RPC 边界 |
| **NanoClaw** | 轻量 Agent runtime、安装、delivery/tool 语义、群组 thread routing | 个人用户、轻量团队协作场景 | 发布前稳定性导向；强调工具可达性和消息状态真实性 |
| **NanoBot** | Provider 兼容、checkpoint、Slack/WebUI/TUI 体验 | 轻量个人助手用户、Slack 用户 | 中等复杂度；多 provider 和协作平台体验优化 |
| **LobsterAI** | 产品化桌面体验、Computer Use、cowork、OpenClaw 插件化 | 桌面 AI 助手用户、中文/国产 Agent 生态用户 | Electron/桌面产品导向；OpenClaw 作为能力承载层 |
| **NullClaw** | Agent 本地循环、并发 worker、底层内存安全 | 系统级开发者、Zig/底层 runtime 用户 | 偏底层质量加固；关注生命周期、并发和配置 gate |
| **PicoClaw** | 当前主要是维护治理问题 | 既有用户、社区 Fork 维护者 | 主仓库维护状态不明，存在社区分流 |
| **CoPaw** | 模型体验配置，如推理强度 | 模型/Agent 应用用户 | 今日无代码推进，需求集中在 UX/模型参数控制 |
| **IronClaw / TinyClaw / Moltis / ZeptoClaw** | 今日无活动 | 暂无足够信号 | 静默或低活跃 |

---

## 6. 社区热度与成熟度

### 6.1 快速迭代阶段

代表项目：

- **Hermes Agent**
- **OpenClaw**
- **ZeroClaw**

特征：

- 单日 Issue/PR 数量高。
- Bug、功能、架构重构并行推进。
- 用户反馈来自真实复杂场景：Desktop、Gateway、Discord、Telegram、provider、session、Docker、Windows/macOS。
- 风险是积压增长快，维护者需要强 triage 和 release discipline。

其中：

- Hermes Agent 是今日最“社区爆发型”的项目，50 Issues + 50 PR，说明使用面广但压力极高。
- OpenClaw 是今日最“核心可靠性承压型”的项目，P1 集中在 message-loss/session-state/security。
- ZeroClaw 是今日最“工程化治理型”的项目，runtime/config/security/RPC 边界推进系统性较强。

---

### 6.2 质量巩固 / 发布前收敛阶段

代表项目：

- **NanoClaw**
- **NanoBot**
- **NullClaw**
- **LobsterAI**

特征：

- 活跃度中等或偏低，但改动集中。
- 更强调安装成功率、工具可达性、checkpoint、UI 体验、平台兼容和底层稳定性。
- 问题通常已有明确 PR 对应，说明维护链条相对短。

其中：

- NanoClaw 明显处于 RC/发布前稳定性修复状态。
- NanoBot 在 Provider 兼容和 runtime checkpoint 上需要尽快合并修复。
- NullClaw 虽然无 Issue，但 3 个 PR 都是核心 agent runtime 质量修复。
- LobsterAI 则更偏产品化成熟：Computer Use for Mac、progress card、网络错误可诊断性、CI 治理同步推进。

---

### 6.3 低活跃 / 维护不确定阶段

代表项目：

- **PicoClaw**
- **CoPaw**
- **IronClaw**
- **TinyClaw**
- **Moltis**
- **ZeptoClaw**

特征：

- PR/Issue 数很低或为零。
- 项目状态需要结合长期数据判断。
- PicoClaw 特别值得关注，因为出现了“活跃 Fork & Continued Maintenance”声明，说明主仓库信任正在被社区重新评估。
- CoPaw 虽然低活跃，但“推理强度控制”是清晰的产品需求信号。

---

## 7. 值得关注的趋势信号

### 7.1 Agent 可靠性正在成为生态第一优先级

今日多个项目的问题都不是“缺功能”，而是“功能运行后能否可信”：

- 消息是否会丢；
- 失败是否可见；
- fallback 是否一致；
- session 是否会卡死；
- checkpoint 是否能恢复；
- UI 是否反映真实状态。

对开发者的参考价值：  
构建 Agent 系统时，应尽早设计 durable queue、状态机、delivery attempts、retry/backoff、idempotency、session health check，而不是后期补救。

---

### 7.2 Gateway 正在从“消息入口”演化为“高可用运行时控制面”

OpenClaw、Hermes Agent、ZeroClaw 都在处理 Gateway 阻塞、消息投递、RPC 身份、插件路由、status 更新等问题。  
Gateway 已不只是接收聊天消息的 adapter，而是负责状态协调、权限控制、长任务可观测性、平台噪声治理和远程执行边界。

对开发者的参考价值：  
Gateway 设计需要具备：

- 非阻塞 I/O；
- worker 化重任务；
- 明确权限身份；
- 可观测 delivery pipeline；
- 对平台差异的适配层；
- 对 UI / Bot 状态更新的去重与合并能力。

---

### 7.3 模型路由正在细粒度化

多个项目同时出现：

- fallback chain 不一致问题；
- 子 agent 指定 route；
- heartbeat evaluator 独立模型；
- Codex 账号池轮转；
- Opper typed provider；
- 推理强度控制；
- 预算内自动选模型。

这说明生态正在从“一个默认模型跑所有任务”转向：

- 按任务选择模型；
- 按成本选择模型；
- 按工具能力选择模型；
- 按 provider quota 动态 fallback；
- 按推理强度控制输出行为。

对开发者的参考价值：  
Agent 框架需要抽象统一的 model routing policy，而不是在各执行路径硬编码 provider 调用。

---

### 7.4 企业治理需求正在快速上升

Hermes Agent 和 ZeroClaw 的信号尤其明显：

- MDM-managed Desktop；
- remote-only mode；
- Gateway service identity；
- RPC local-only schema；
- file_read glob policy；
- pre-send plugin hook；
- memory secret masking；
- policy API 替代 legacy rules。

对开发者的参考价值：  
如果 Agent 要进入企业环境，必须提供：

- 策略集中管理；
- 权限最小化；
- 审计和日志；
- 插件治理；
- remote/local 边界；
- secret 防泄露；
- 可机器读取的能力 schema。

---

### 7.5 Desktop / Computer Use 正在走向真实生产场景

LobsterAI、Hermes Agent、OpenClaw 都出现与桌面、Canvas、Computer Use、截图、macOS、Windows、更新链路相关的问题。  
这说明桌面 Agent 不再只是 demo，而是在真实系统环境中处理权限、路径、代理、更新、UI 状态和平台差异。

对开发者的参考价值：  
Desktop Agent 的难点不只是模型能力，还包括：

- 安装与更新；
- OS 权限；
- 路径规范化；
- 截图/媒体数据体积；
- 本地代理；
- UI 状态持久化；
- 安全 scheme / file access 边界。

---

### 7.6 开源项目治理本身成为生态竞争力

PicoClaw 的活跃 Fork 声明、LobsterAI 的 stale bot 策略调整、ZeroClaw 的 PR 模板优化都说明：贡献流程、Issue 处理机制、维护者回应速度会直接影响社区信任。

对技术决策者的参考价值：  
选择 Agent 开源项目时，不应只看 Star 或功能列表，还应关注：

- Issue 是否被维护者真实 triage；
- PR 是否能及时合并；
- 是否存在清晰 release 节奏；
- 是否有维护者回应治理问题；
- 是否有健康的 Fork / 社区协作机制。

---

## 总结判断

今日生态的主线非常清晰：**AI Agent 开源项目正在从功能探索期进入可靠性、可治理性和生产化阶段**。  
OpenClaw、Hermes Agent、ZeroClaw 是当前最活跃、也最能暴露复杂系统问题的头部项目；NanoBot、NanoClaw、LobsterAI、NullClaw 则在各自细分方向进行稳定性和产品体验收敛；PicoClaw 等低活跃项目则提醒社区，维护连续性同样是技术选型的重要因素。

对开发者而言，未来一段时间最值得投入的能力不是单纯增加工具或模型，而是：

1. durable message delivery；  
2. session/checkpoint recovery；  
3. consistent model routing/fallback；  
4. Gateway 非阻塞与 worker 化；  
5. 安全策略与插件治理；  
6. Desktop/Computer Use 的平台级稳定性；  
7. 可观测、可诊断、可恢复的 Agent runtime。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报  
**日期：2026-10-07**  
**仓库：HKUDS/nanobot**

---

## 1. 今日速览

过去 24 小时，NanoBot 项目保持中等偏活跃状态：新增或更新 **3 个 Issue**、**4 个 Pull Request**，但暂无 PR 合并、Issue 关闭或新版本发布。今日活动主要集中在 **WebUI 可用性、LLM Provider 兼容性、Slack 体验、运行时恢复稳定性** 等方向。  
从信号看，社区反馈较聚焦，且至少一个严重 Bug 已有对应修复 PR，说明维护响应链路较快。当前项目健康度整体良好，但待合并 PR 累积增加，短期内需要维护者集中 review，以避免修复滞后影响用户体验。

---

## 2. 版本发布

过去 24 小时 **无新版本发布**。

---

## 3. 项目进展

今日暂无已合并或已关闭的 PR，因此没有正式进入主分支的功能或修复。不过，已有 4 个待合并 PR 推进了多个关键方向：

### 待合并 PR 动态

- [PR #6086 - fix(providers): drop hosted web_search tool from Chat Completions extra_body](https://github.com/HKUDS/nanobot/pull/6086)  
  该 PR 明确修复 [Issue #6085](https://github.com/HKUDS/nanobot/issues/6085)，针对 DeepSeek Web Search 配置导致 Chat Completions 请求不可用的问题进行过滤处理。  
  这是今日最重要的稳定性修复之一，若合并，将直接解除部分用户无法正常调用 LLM 的阻塞问题。

- [PR #6082 - fix(session): preserve completed iterations in runtime checkpoints](https://github.com/HKUDS/nanobot/pull/6082)  
  修复中断恢复后，已完成工具迭代记录丢失的问题。该问题会影响长任务、工具链调用和断点恢复的可靠性。  
  对 Agent 执行稳定性和上下文一致性具有明显价值。

- [PR #6083 - feat: configure heartbeat evaluator model preset](https://github.com/HKUDS/nanobot/pull/6083)  
  新增 `gateway.heartbeat.evaluatorModelPreset` 配置，允许心跳通知评估器使用独立模型预设。  
  这体现出项目在多模型配置、成本控制和任务解耦方面的演进。

- [PR #6087 - refactor(ui): replace middle-dot separators with clearer hierarchy](https://github.com/HKUDS/nanobot/pull/6087)  
  针对 WebUI/TUI 中过度使用中点分隔符的问题进行界面层级优化。  
  虽不是功能性修复，但有助于提升复杂状态、工具调用、快捷键信息的可读性。

**整体推进评估：**  
今日没有代码正式落地，但待合并 PR 覆盖了 bug 修复、体验优化、配置能力增强与运行时恢复稳定性。若这些 PR 在近期合并，下一版本质量将有明显提升。

---

## 4. 社区热点

今日没有 Issue 或 PR 出现评论或高反应数，所有新增/活跃 Issue 当前评论数均为 0，👍 数也为 0。因此社区讨论热度不高，但反馈主题具有明确代表性。

### 重点关注项

- [Issue #6085 - Turning on deepseek websearch renders the LLM calls unusable](https://github.com/HKUDS/nanobot/issues/6085)  
  用户反馈开启 DeepSeek Web Search 后，所有通道中的消息都会返回 LLM 错误。  
  该问题影响面较大，因为它会直接导致 LLM 调用不可用，而不是局部功能异常。已有对应修复 [PR #6086](https://github.com/HKUDS/nanobot/pull/6086)。

- [Issue #6084 - Slack: compaction notices post as two permanent messages](https://github.com/HKUDS/nanobot/issues/6084)  
  用户反馈 Slack Socket Mode 下，自动上下文压缩会在会话中留下两条永久系统消息：“Compressing context…” 和 “Context compacted.”  
  这反映出企业协作场景中，用户对机器人“低打扰”和信息洁净度的诉求。

- [Issue #6088 - WebUI: destructive Delete buttons have low contrast in dark mode](https://github.com/HKUDS/nanobot/issues/6088)  
  用户指出深色模式下删除按钮对比度过低，影响识别和可访问性。  
  该反馈属于 UI 可用性问题，但涉及 destructive action，若视觉区分不清，可能增加误操作风险。

---

## 5. Bug 与稳定性

### 高严重度

#### 1. DeepSeek Web Search 导致 LLM 调用不可用  
- Issue：[ #6085 ](https://github.com/HKUDS/nanobot/issues/6085)  
- 状态：Open  
- 影响范围：开启 DeepSeek Web Search 后，任意 channel 的消息调用均返回错误  
- 错误核心：Chat Completions 请求中包含 `{"type": "web_search"}`，但该工具类型不被该 endpoint 接受  
- 当前修复：已有对应 PR [#6086](https://github.com/HKUDS/nanobot/pull/6086)  
- 严重程度：高  
- 原因：直接阻断 LLM 调用，影响核心功能可用性

#### 2. Runtime checkpoint 恢复时丢失已完成工具迭代  
- PR：[ #6082 ](https://github.com/HKUDS/nanobot/pull/6082)  
- 状态：Open  
- 影响范围：中断后恢复任务时，模型请求可能缺失之前已经完成的工具调用证据  
- 严重程度：中高  
- 原因：影响 Agent 长任务执行的连续性和可追溯性  
- 当前情况：已有修复 PR，但未合并

### 中等严重度

#### 3. Slack 上下文压缩通知产生永久噪音消息  
- Issue：[ #6084 ](https://github.com/HKUDS/nanobot/issues/6084)  
- 状态：Open  
- 影响范围：Slack Socket Mode，尤其是开启 `idleCompactAfterMinutes` 的 DM 场景  
- 用户诉求：增加 `showCompactionNotices` 开关，或将通知改为原地编辑  
- 严重程度：中  
- 原因：不阻塞功能，但会显著影响日常协作体验和频道整洁度  
- 当前修复：暂无对应 PR

### 低到中等严重度

#### 4. WebUI 深色模式下 Delete 按钮对比度不足  
- Issue：[ #6088 ](https://github.com/HKUDS/nanobot/issues/6088)  
- 状态：Open  
- 影响范围：WebUI 深色模式，右侧边栏和会话删除等 destructive actions  
- 严重程度：低到中  
- 原因：主要是可读性和可访问性问题，但涉及删除动作，存在误操作风险  
- 当前修复：暂无对应 PR

---

## 6. 功能请求与路线图信号

### 可能进入下一版本的方向

#### 1. Provider 兼容性与 hosted tool 路由修复  
- Issue：[ #6085 ](https://github.com/HKUDS/nanobot/issues/6085)  
- PR：[ #6086 ](https://github.com/HKUDS/nanobot/pull/6086)  
该修复已经形成 PR，并明确关联 Issue，进入下一版本的可能性较高。它也表明 NanoBot 在支持多 Provider、多 endpoint 能力时，需要更严格地区分 Responses API 与 Chat Completions API 的工具能力差异。

#### 2. Heartbeat evaluator 支持独立模型预设  
- PR：[ #6083 ](https://github.com/HKUDS/nanobot/pull/6083)  
新增 `gateway.heartbeat.evaluatorModelPreset`，允许心跳评估器使用不同模型。  
这体现出 NanoBot 可能继续增强“任务级模型配置”能力，例如主 Agent、评估器、通知器、工具调用等使用不同模型，以优化成本、速度和质量。

#### 3. Slack 通知降噪与可配置化  
- Issue：[ #6084 ](https://github.com/HKUDS/nanobot/issues/6084)  
用户提出 `showCompactionNotices` 配置项，或改为编辑同一条消息。  
这类请求与团队协作场景高度相关，若 NanoBot 面向 Slack/企业 IM 使用增长，该方向很可能成为后续体验优化项。

#### 4. WebUI/TUI 信息层级优化  
- PR：[ #6087 ](https://github.com/HKUDS/nanobot/pull/6087)  
- Issue：[ #6088 ](https://github.com/HKUDS/nanobot/issues/6088)  
一方面已有 PR 在重构 UI 信息分隔和层级，另一方面用户又反馈深色模式按钮对比度问题。  
这说明近期 WebUI/TUI 可读性、可访问性和视觉层级可能成为持续优化方向。

---

## 7. 用户反馈摘要

今日 Issue 评论数均为 0，因此无法从多轮讨论中提炼更多情绪倾向。但从 Issue 描述本身可以总结出以下用户痛点：

### 1. 用户对 Provider 功能组合的稳定性要求很高  
- 相关 Issue：[ #6085 ](https://github.com/HKUDS/nanobot/issues/6085)  
用户开启 DeepSeek Web Search 后，期望只是增强搜索能力，但实际导致所有 LLM 调用不可用。  
这类问题会让用户对配置项的安全性产生担忧，尤其是在多 Provider、多模型、多工具组合场景下。

### 2. 企业协作场景希望机器人“少打扰”  
- 相关 Issue：[ #6084 ](https://github.com/HKUDS/nanobot/issues/6084)  
Slack 用户不希望内部机制通知长期保留在 DM 或频道中。  
“上下文压缩”是系统内部行为，对终端用户而言可能并不重要，因此用户更希望它可关闭、临时展示，或通过消息编辑减少噪音。

### 3. WebUI 用户关注深色模式和危险操作的可辨识度  
- 相关 Issue：[ #6088 ](https://github.com/HKUDS/nanobot/issues/6088)  
删除按钮在深色模式下低对比度，会造成阅读困难，且 destructive action 本身需要更高视觉警示。  
这反映出 NanoBot 的 WebUI 已进入真实使用阶段，用户开始关注细节体验与可访问性。

### 4. Agent 长任务恢复需要更强一致性  
- 相关 PR：[ #6082 ](https://github.com/HKUDS/nanobot/pull/6082)  
虽然该问题来自 PR 而非今日新 Issue，但它指向一个重要使用场景：多轮工具调用、中断恢复、checkpoint 续跑。  
对于个人 AI 助手和智能体系统来说，恢复后不能丢失已完成步骤，是可靠执行的基础。

---

## 8. 待处理积压

基于今日提供的数据，暂未发现“长期未响应”的 Issue 或 PR；当前列出的 Issue/PR 均创建或更新于 2026-10-06 至 2026-10-07，属于近期活动。

不过，维护者可优先关注以下待处理项：

1. [PR #6086](https://github.com/HKUDS/nanobot/pull/6086)  
   建议优先 review 和合并。该 PR 修复 [Issue #6085](https://github.com/HKUDS/nanobot/issues/6085)，属于核心可用性问题。

2. [PR #6082](https://github.com/HKUDS/nanobot/pull/6082)  
   建议尽快验证 checkpoint 恢复测试。该问题影响长任务和工具调用恢复的可信度。

3. [Issue #6084](https://github.com/HKUDS/nanobot/issues/6084)  
   建议确认产品行为：默认展示压缩通知、增加配置开关，还是改为 ephemeral / edit-in-place。该问题对 Slack 用户体验影响较直接。

4. [Issue #6088](https://github.com/HKUDS/nanobot/issues/6088)  
   建议纳入 WebUI 主题和可访问性修复。虽然不是阻塞问题，但 destructive button 的可读性值得尽快修正。

---

## 项目健康度小结

NanoBot 今日无发布、无合并，但 Issue 与 PR 响应链路活跃，尤其是严重 Provider Bug 已快速出现修复 PR。当前主要风险不是缺少社区反馈，而是 **待合并修复尚未落地**。若维护者能在短期内合并 #6086 与 #6082，并继续处理 Slack/WebUI 体验问题，项目稳定性和用户满意度预计会明显提升。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
**日期：2026-10-07**  
**仓库：NousResearch/hermes-agent**

---

## 1. 今日速览

过去 24 小时 Hermes Agent 活跃度非常高：**Issues 更新 50 条**，且全部为新开或活跃状态，**关闭数为 0**；**PR 更新 50 条**，其中 **46 个仍待合并，4 个已合并或关闭**。今日没有新版本发布，说明项目主要处于高强度修复、分诊和功能提案阶段，而非发布阶段。

从议题结构看，今日热点集中在 **Desktop 更新链路、Gateway 消息投递、会话状态持久化、插件工具集、权限与安全边界、provider 错误分类** 等方面。大量 Issue 已伴随对应修复 PR 出现，表明社区反馈与修复响应速度较快，但开放积压在单日内快速累积，维护者需要优先处理 P1/P2 稳定性问题。

---

## 2. 版本发布

今日 **无新版本发布**。

最新 Releases 数据为空，因此本日报不包含版本更新、破坏性变更或迁移说明。

---

## 3. 项目进展

今日 PR 活跃度较高，多个修复 PR 已针对当日或近期高影响问题给出补丁。公开数据中可见的重要关闭 PR 有 1 个；其余已合并/关闭的 3 个未在展示列表中给出详情。

### 已关闭 / 已处理的重要 PR

#### #134317 fix(gateway): sanitize API error response headers  
链接：https://github.com/NousResearch/hermes-agent/pull/134317  
状态：CLOSED  
标签：`type/bug`, `duplicate`, `comp/gateway`, `P2`, `sweeper:risk-message-delivery`

该 PR 修复 OpenAI-compatible API server 在非流式响应中遇到包含 CR、LF、NUL 或其他 ASCII 控制字符的 agent error 时，因 `aiohttp` 拒绝非法 header 值而导致响应失败的问题。修复方向是新增 header-only helper，对错误文本进行脱敏并折叠非法字符。

**项目推进意义：**

- 提升 Gateway API 错误返回路径的健壮性。
- 降低异常消息导致非流式响应被丢弃的风险。
- 对消息投递稳定性和兼容 OpenAI API 的服务质量有直接改善。

---

### 今日新开且值得关注的修复 PR

#### #134310 fix(credential-pool): rotate a Codex 429 to the next account instead of re-admitting the failed one  
链接：https://github.com/NousResearch/hermes-agent/pull/134310  
关联 Issue：https://github.com/NousResearch/hermes-agent/issues/134327  
标签：`comp/agent`, `comp/cli`, `provider/openai`, `area/auth`, `P2`, `sweeper:risk-security-boundary`

修复 Codex 账号池中 priority-0 账号遇到 429 后没有轮转到健康 priority-1 账号，而是直接进入 fallback provider 的问题。该问题会导致多账号配置失效，并可能增加不必要的 provider fallback 成本或延迟。

#### #134316 fix(cron): gate masked-heredoc mentions on shell provenance  
链接：https://github.com/NousResearch/hermes-agent/pull/134316  
关联 Issue：https://github.com/NousResearch/hermes-agent/issues/134313  
标签：`comp/cron`, `tool/terminal`, `area/config`, `P2`

修复 cron / terminal lifecycle guard 的误报：命令仅提及 `config.yaml` 路径时被错误判断为试图重启或停止 gateway。该修复有助于降低安全防护规则的误伤率。

#### #134319 fix(cli): read the respawn argv from psutil before the ps+shlex fallback  
链接：https://github.com/NousResearch/hermes-agent/pull/134319  
关联 Issue：https://github.com/NousResearch/hermes-agent/issues/134328  
标签：`comp/cli`, `comp/dashboard`, `area/install-update`, `P2`

修复 macOS 上 `hermes update` 后 dashboard respawn argv 被 `ps` 与 `shlex.split` 组合错误解析的问题。该类问题会影响更新后的自动重启体验。

#### #134305 fix(pm): pin the excluded spacy-curated-transformers override so uv lock keeps spacy 3.x  
链接：https://github.com/NousResearch/hermes-agent/pull/134305  
标签：`python:uv`, `area/install-update`, `P2`

修复 `uv lock --upgrade` 解析依赖时可能将 spaCy 降级到非常旧的 `spacy==2.0.17`，并触发现代 setuptools 环境中缺失 `msvccompiler` 的构建失败。该 PR 对依赖稳定性和安装体验有明显价值。

#### #134307 fix(control-plane): bound Windows gateway supervision  
链接：https://github.com/NousResearch/hermes-agent/pull/134307  
标签：`comp/cli`, `comp/gateway`, `platform/windows`, `P2`

针对 Windows Gateway supervision 进行边界约束，涉及 VBS launcher、restart handoff、crash budget 等控制面逻辑。该 PR 对 Windows 平台稳定性较重要。

#### #134326 Memory refuses credential-shaped entries and masks secrets already on disk  
链接：https://github.com/NousResearch/hermes-agent/pull/134326  
标签：`type/security`, `comp/agent`, `tool/memory`, `area/memory`, `P3`

为 memory 系统增加凭据形态内容拒写与磁盘已有 secrets 注入前遮罩能力。虽然优先级标为 P3，但其安全价值较高，涉及 API key、token、connection string password、private key block 等敏感信息。

---

## 4. 社区热点

### #134311 cron per-job enabled_toolsets 合并 MCP servers 但丢失 plugin toolsets  
链接：https://github.com/NousResearch/hermes-agent/issues/134311  
评论数：2  
标签：`type/bug`, `comp/cron`, `comp/plugins`, `area/config`, `P3`

该 Issue 是今日评论最多的问题之一。用户指出 cron job 使用 per-job `enabled_toolsets` allowlist 时，MCP servers 会被合并，但插件注册的 toolsets 不会进入 allowlist，导致计划任务无法使用已安装、已启用且 worker 已加载的插件工具。

**背后诉求：**

- 用户希望 cron 与实时 agent 能看到一致的工具能力。
- 插件生态正在成为 Hermes Agent 的核心扩展面，toolset 可见性不一致会直接削弱自动化任务可靠性。
- 这是一个配置合并语义问题，虽然标为 P3，但对 cron-heavy 用户影响较明显。

---

### #134275 doctor/sessions health check for state.db  
链接：https://github.com/NousResearch/hermes-agent/issues/134275  
评论数：2  
标签：`type/feature`, `comp/cli`, `area/sessions`, `P3`, `needs-decision`

用户提议为 `state.db` 增加更完整的健康检查能力，包括 snapshot-based probe、FTS integrity-check、scheduled last-good snapshots。

**背后诉求：**

- `state.db` 腐化被用户描述为 recurring problem。
- 当前诊断能力存在缺口，可能把可恢复的索引故障演变为静默数据丢失。
- 用户希望 Hermes 提供更主动的数据完整性检测与回滚机制。

这反映出 **会话状态可靠性** 已成为社区关注重点。

---

### #134257 `/reasoning --global` 行为与 `/model --global` 不一致  
链接：https://github.com/NousResearch/hermes-agent/issues/134257  
评论数：2  
标签：`type/bug`, `comp/gateway`, `platform/telegram`, `area/config`, `P2`

用户反馈 Telegram gateway 上 `/model --global` 无参数会打开 picker，而 `/reasoning --global` 无 level 时却报错，未打开 reasoning picker。

**背后诉求：**

- 命令体验一致性。
- Gateway slash command 的交互式配置能力。
- 全局配置写入 `config.yaml` 的行为应在 model 与 reasoning 两类设置间保持一致。

---

### #134220 bundled plugin solstice 缺少 httpx，启动警告污染 TUI  
链接：https://github.com/NousResearch/hermes-agent/issues/134220  
评论数：1，👍：2  
标签：`type/bug`, `duplicate`, `comp/cli`, `comp/tui`, `comp/plugins`, `area/install-update`, `P3`

该 Issue 的点赞数是展示列表中较高的一个。用户在 fresh install 后遇到 bundled provider plugin `solstice` 因缺少 `httpx` 加载失败，并且启动警告覆盖 TUI 内容。

**背后诉求：**

- fresh install 应该无缺依赖、无噪声。
- TUI 渲染不应被启动阶段 warning 破坏。
- bundled plugin 的依赖声明需要更可靠。

---

## 5. Bug 与稳定性

以下按严重程度与影响面排序。

### P1：Provider 错误分类导致 Gateway Session 卡死

#### #134261 DeepSeek content-moderation 400 被误判为 context overflow  
链接：https://github.com/NousResearch/hermes-agent/issues/134261  
标签：`type/bug`, `comp/gateway`, `provider/deepseek`, `P1`, `area/sessions`, `sweeper:risk-session-state`, `sweeper:risk-message-delivery`

用户报告 DeepSeek 内容审核 400 `"Content Exists Risk"` 在长会话中被 Gateway 误判为 context overflow，即使 agent-side classifier 已识别为 `content_policy_blocked`。结果包括：

1. 用户 turn 未正确持久化。
2. Session 卡住，直到 `/reset`。

**影响：高。**  
这是今日唯一展示的 P1 问题，涉及 provider error classification、会话持久化和消息投递三条关键路径。

**是否已有 fix PR：**  
展示数据中未见明确对应 PR。

---

### P2：Desktop / CLI 更新链路回归

#### #134309 macOS Desktop hand-off 下 `hermes update` 自阻塞  
链接：https://github.com/NousResearch/hermes-agent/issues/134309  
标签：`type/bug`, `comp/cli`, `comp/desktop`, `area/install-update`, `P2`

Desktop 检测到 pending update 后交给 `scripts/desktop-update/posix.sh`，但 `hermes update` 退出并提示 “Another Hermes update is already running”，导致 Desktop 重启后进入循环。

**相关 Issue / PR：**

- Issue #134268：Desktop hand-off 导出错误 PID  
  https://github.com/NousResearch/hermes-agent/issues/134268
- PR #134319：修复 macOS dashboard respawn argv 读取  
  https://github.com/NousResearch/hermes-agent/pull/134319
- Issue #134328：macOS update 后 dashboard respawn argv 损坏及 solstice 警告  
  https://github.com/NousResearch/hermes-agent/issues/134328

**影响：高。**  
更新链路失败会阻断用户升级，并可能造成 Desktop 无限重启 / 重试。

---

### P2：OpenAI Codex 多账号池轮转失效

#### #134327 Codex 429 未轮转到健康第二账号  
链接：https://github.com/NousResearch/hermes-agent/issues/134327  
标签：`type/bug`, `comp/agent`, `provider/openai`, `area/auth`, `P2`

当 priority-0 Codex account 遇到 `usage_limit_reached` 429 时，系统直接 fallback 到其他 provider，而不是选择 priority-1 健康账号。

**已有 fix PR：**

- #134310  
  https://github.com/NousResearch/hermes-agent/pull/134310

**影响：中高。**  
影响多账号池成本控制、可用性和 provider 选择策略。

---

### P2：Gateway / Discord 会话等待状态刷屏

#### #134288 Session turn lease wait 每 15 秒刷 Discord 频道  
链接：https://github.com/NousResearch/hermes-agent/issues/134288  
标签：`type/bug`, `comp/agent`, `comp/gateway`, `platform/discord`, `area/config`, `P2`

当 session turn lease 被其他 Hermes process 占用时，Discord channel 会每约 15 秒收到一条可见状态气泡。原因与 `DiscordAdapter` 缺少 `send_or_update_status` 以及 lifecycle suppression bypass 有关。

**是否已有 fix PR：**  
展示数据中未见明确对应 PR。

**影响：中高。**  
这类问题会在真实群聊中形成噪声，损害 bot 的社交可用性。

---

### P2：Desktop Session 视图丢失已完成 assistant turns

#### #134290 completed turns vanish from transcript after switching sessions  
链接：https://github.com/NousResearch/hermes-agent/issues/134290  
标签：`type/bug`, `comp/desktop`, `area/sessions`, `P2`

用户切换 session 后，之前可见的 assistant replies 从 transcript 消失，但 `state.db` 中数据仍完整。UI 显示为两个 user bubbles 相邻，中间回复空白。

**是否已有 fix PR：**  
展示数据中未见明确对应 PR。

**影响：中高。**  
尽管数据未丢失，但用户感知为对话丢失，直接影响 Desktop 信任度。

---

### P2：Windows Docker backend 产物无法投递

#### #134264 Docker backend on Windows host path mapping failure  
链接：https://github.com/NousResearch/hermes-agent/issues/134264  
标签：`type/bug`, `comp/gateway`, `backend/docker`, `platform/windows`, `P2`

Windows 原生宿主机使用 `terminal.backend: docker` 时，sandbox 中 `/workspace/...` 路径无法映射到 host 文件，导致 `MEDIA:/workspace/report.pdf` 被认为是不安全路径并丢弃。

**是否已有 fix PR：**  
展示数据中未见明确对应 PR。

**影响：中高。**  
影响 Windows 用户通过 agent 生成并投递文件的核心流程。

---

### P2：lifecycle guard 误报阻断安全命令

#### #134313 command mentions config.yaml path 被误判为 gateway restart/stop  
链接：https://github.com/NousResearch/hermes-agent/issues/134313  
标签：`type/bug`, `comp/cron`, `tool/terminal`, `area/config`, `P2`

命令仅提及 Hermes `config.yaml` 路径，却被 lifecycle guard 阻断，报错称不能在 gateway 进程内 restart/stop gateway。

**已有 fix PR：**

- #134316  
  https://github.com/NousResearch/hermes-agent/pull/134316

---

### P3：插件、文档、Desktop UI 和工具链问题

#### #134243 `computer_use.no_overlay: false` 在 standard permission mode 下无效  
链接：https://github.com/NousResearch/hermes-agent/issues/134243  
标签：`type/bug`, `comp/tools`, `area/config`, `P3`

配置项被文档和 docstring 推荐，但实际没有 daemon 渲染 cursor overlay，形成 silent no-op。

#### #134306 docs: config.yaml “stay writable” 与 active-profile guard 冲突  
链接：https://github.com/NousResearch/hermes-agent/issues/134306  
已有文档修复 PR：  
https://github.com/NousResearch/hermes-agent/pull/134312

#### #134258 Discord `/model` provider selection 因 duplicate select option value 超时  
链接：https://github.com/NousResearch/hermes-agent/issues/134258

#### #134285 Desktop pathless project 无法在 “Move to project” 中选择  
链接：https://github.com/NousResearch/hermes-agent/issues/134285

#### #134283 Desktop New Project UI 要求 folder，但 `project_create` 支持 pathless projects  
链接：https://github.com/NousResearch/hermes-agent/issues/134283

---

## 6. 功能请求与路线图信号

今日功能请求呈现出几个明显方向：**企业管控、插件事件面扩展、会话健康诊断、消息发送前治理、Desktop 数学内容体验、模型选择自动化**。

### 插件与消息治理

#### #134330 pre-send plugin hook：观察、暂停、编辑或丢弃所有 outgoing messages  
链接：https://github.com/NousResearch/hermes-agent/issues/134330

用户希望插件能看到 gateway 发出的所有消息，而不仅是 agent final reply。该 hook 可覆盖 cron deliveries、kanban/background notices、approval prompts、interim messages、status、shutdown notices 等。

**路线图信号：强。**  
这表明插件系统需要从 LLM 输出处理扩展到 Gateway message pipeline 层。若被采纳，将显著增强合规、审计、过滤、延迟发送、企业策略控制等能力。

---

### Discord 平台事件扩展

#### #134315 gateway_platform_event 增加 Discord channel_created event type  
链接：https://github.com/NousResearch/hermes-agent/issues/134315

当前 Discord 仅支持部分事件，如 message edited/deleted、thread created/renamed。用户希望插件能观察 channel creation。

**路线图信号：中。**  
该需求与插件事件面扩展一致，可能作为较小增量进入后续版本。

---

### 企业 / MDM 管理能力

#### #134294 macOS managed settings for Desktop  
链接：https://github.com/NousResearch/hermes-agent/issues/134294

用户希望在 MDM-managed macOS fleet 中部署 Hermes Desktop，并强制允许的 remote gateways。

#### #134308 enforce remote-only operation in Desktop through macOS managed policy  
链接：https://github.com/NousResearch/hermes-agent/issues/134308

用户进一步提出 `AllowLocalAgent=false` 管理策略，禁止安装、启动或连接本地 agent，只允许连接批准的远程 gateway。

**路线图信号：强。**  
这两个 Issue 来自同一方向，说明 Hermes Desktop 正进入企业部署场景。若项目希望支持组织级部署，managed settings、remote-only mode、gateway allowlist 会成为关键能力。

---

### 会话数据库健康检查

#### #134275 doctor/sessions health check for state.db  
链接：https://github.com/NousResearch/hermes-agent/issues/134275

该需求与今日多个 session-state 问题呼应，包括 #134261、#134290、#134321。建议维护者将其视为稳定性路线图的一部分，而不只是 CLI enhancement。

---

### 模型选择与成本控制

#### #134329 feat(skills): add kingmaker  
链接：https://github.com/NousResearch/hermes-agent/pull/134329

该 PR 新增 `optional-skills/research/kingmaker`，根据 Hermes Index 中模型评分与平均 `$/task`，在用户预算内选择最高评分主模型。

**路线图信号：中高。**  
这说明社区希望 Hermes Agent 能从“配置模型”走向“按预算与效果自动管理模型”。如果合并，可能成为模型路由、成本优化和 benchmark-driven selection 的基础能力。

---

### Desktop 数学内容复制体验

#### #134302 Enable KaTeX copy-tex extension in Desktop app  
链接：https://github.com/NousResearch/hermes-agent/issues/134302

用户希望复制渲染后的 KaTeX 公式时得到原始 LaTeX，而不是 Unicode math italic 字符。

相关 Desktop Markdown 修复 PR：

- #134314 preserve postfix dollar prices in Markdown  
  https://github.com/NousResearch/hermes-agent/pull/134314

**路线图信号：中。**  
Desktop 正在被用于更复杂的技术写作、数学、研究场景，公式复制与 Markdown 渲染质量会影响专业用户体验。

---

## 7. 用户反馈摘要

### 主要痛点一：更新链路不稳定，尤其是 macOS Desktop

相关条目：

- #134309：https://github.com/NousResearch/hermes-agent/issues/134309
- #134268：https://github.com/NousResearch/hermes-agent/issues/134268
- #134328：https://github.com/NousResearch/hermes-agent/issues/134328
- #134319：https://github.com/NousResearch/hermes-agent/pull/134319

用户反馈中反复出现 Desktop hand-off、`hermes update`、dashboard respawn、PID marker、argv mangling 等问题。典型不满是：**更新本身可能成功，但 post-update restart 或 hand-off 失败，使用户感知为整体更新失败或循环重试**。

---

### 主要痛点二：会话状态和 transcript 可信度不足

相关条目：

- #134261：https://github.com/NousResearch/hermes-agent/issues/134261
- #134290：https://github.com/NousResearch/hermes-agent/issues/134290
- #134275：https://github.com/NousResearch/hermes-agent/issues/134275
- #134321：https://github.com/NousResearch/hermes-agent/issues/134321

用户不仅担心数据丢失，也担心 UI 与数据库状态不一致、错误分类导致 session wedge、context engine 状态异常导致 pre-API gate fail closed。核心诉求是：**对话历史必须可靠、可诊断、可恢复**。

---

### 主要痛点三：Gateway 在真实聊天平台中的行为需要更少噪声、更强一致性

相关条目：

- #134288 Discord wait status flooding：https://github.com/NousResearch/hermes-agent/issues/134288
- #134257 Telegram `/reasoning --global` picker 不一致：https://github.com/NousResearch/hermes-agent/issues/134257
- #134258 Discord `/model` provider selection timeout：https://github.com/NousResearch/hermes-agent/issues/134258
- #134179 multi-profile Bot relay wrong profile delivery：https://github.com/NousResearch/hermes-agent/issues/134179

用户正在将 Hermes Agent 用于 Discord、Telegram、Matrix 等实际通信环境，因此对消息投递、状态更新、命令交互、profile 隔离的要求明显提高。

---

### 主要痛点四：插件生态能力强，但边界和集成仍不平滑

相关条目：

- #134311 cron enabled_toolsets 丢失 plugin toolsets：https://github.com/NousResearch/hermes-agent/issues/134311
- #134330 pre-send plugin hook：https://github.com/NousResearch/hermes-agent/issues/134330
- #134216 plugin receipt line at decision time：https://github.com/NousResearch/hermes-agent/issues/134216
- #134220 bundled solstice plugin 缺依赖：https://github.com/NousResearch/hermes-agent/issues/134220
- #134251 execution middleware deny call：https://github.com/NousResearch/hermes-agent/issues/134251

社区希望插件不仅能扩展工具，还能参与执行前治理、发送前治理、成本控制、安全策略与 UI 可见反馈。当前痛点主要是 hook 覆盖面不足、fail-open 策略限制强制策略、bundled plugin 依赖不完整。

---

## 8. 待处理积压

由于本日报数据仅覆盖过去 24 小时，展示列表中没有明显“长期未响应”的历史积压。不过，以下新开 Issue 具备较高优先级或较大影响面，建议维护者尽快分诊，避免形成短期高风险积压。

### 最高优先级

#### #134261 DeepSeek moderation 400 misclassified as context overflow  
链接：https://github.com/NousResearch/hermes-agent/issues/134261  
原因：P1，影响 session 持久化与 gateway 可用性，且暂未看到对应 fix PR。

---

### 高优先级：更新链路

#### #134309 macOS Desktop update self-blocking  
链接：https://github.com/NousResearch/hermes-agent/issues/134309

#### #134268 Desktop hand-off exports wrong PID  
链接：https://github.com/NousResearch/hermes-agent/issues/134268

#### #134328 macOS update respawn argv corrupted  
链接：https://github.com/NousResearch/hermes-agent/issues/134328

原因：多个用户/Issue 指向同一更新链路问题，应集中处理并回归测试 Desktop hand-off、dashboard respawn、PID marker、PM worker warnings。

---

### 高优先级：会话状态与 UI 一致性

#### #134290 Desktop transcript turns disappear after switching sessions  
链接：https://github.com/NousResearch/hermes-agent/issues/134290

#### #134275 state.db doctor/sessions health check  
链接：https://github.com/NousResearch/hermes-agent/issues/134275

#### #134321 pre-API gate fails closed forever after threshold_tokens=0  
链接：https://github.com/NousResearch/hermes-agent/issues/134321

原因：这些问题共同指向 session-state 的可观测性、恢复能力与 UI 一致性，是用户信任基础。

---

### 高优先级：消息投递与聊天平台适配

#### #134288 Discord session turn lease wait floods channel  
链接：https://github.com/NousResearch/hermes-agent/issues/134288

#### #134179 multi-profile gateway Bot relay sends DMs to wrong profile  
链接：https://github.com/NousResearch/hermes-agent/issues/134179

#### #134264 Windows Docker sandbox files cannot be delivered  
链接：https://github.com/NousResearch/hermes-agent/issues/134264

原因：这些问题直接影响 Hermes Agent 在真实 Gateway / Bot 场景中的可用性。

---

### 中优先级：插件系统语义和企业治理路线

#### #134330 pre-send plugin hook  
链接：https://github.com/NousResearch/hermes-agent/issues/134330

#### #134294 macOS managed settings for Desktop  
链接：https://github.com/NousResearch/hermes-agent/issues/134294

#### #134308 Desktop remote-only managed policy  
链接：https://github.com/NousResearch/hermes-agent/issues/134308

原因：这些是路线图信号型需求，短期不一定阻塞当前版本，但代表社区对 Hermes Agent 企业化、可治理化、可审计化的期待。

---

## 项目健康度评估

**总体健康度：活跃但压力较高。**

积极信号：

- 单日 50 个 PR 更新，修复响应速度快。
- 多个 P2 问题已有对应修复 PR。
- 社区不仅提交 bug，也在提出明确的复现路径、根因线索和设计建议。
- 插件、Desktop、Gateway、Provider、CLI 等模块都有持续演进。

风险信号：

- 单日 50 个 Issue 全部未关闭，短期 triage 压力较大。
- P1/P2 问题集中在 session、gateway、update、message delivery 等关键路径。
- Desktop 与 Gateway 多平台适配问题增多，说明真实使用场景复杂度正在上升。
- 插件系统需求快速扩张，需要维护者明确 hook 边界、安全策略和兼容性承诺。

建议维护者优先处理顺序：

1. #134261 P1 provider error classification / session wedge。
2. macOS Desktop update hand-off 系列问题：#134309、#134268、#134328、#134319。
3. Session state 与 transcript 可靠性：#134290、#134275、#134321。
4. Gateway 消息投递与聊天平台噪声：#134288、#134179、#134264。
5. 插件 hook 与企业管控能力的设计决策：#134330、#134294、#134308。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-10-07）

## 1. 今日速览

过去 24 小时，PicoClaw 仓库共有 **1 条 Issue 更新**、**1 条 PR 更新**，无新版本发布，整体活跃度偏低。今日最明显的信号不是功能开发，而是**维护状态与项目治理问题**：社区成员发起 Issue，声明因主仓库疑似缺乏维护，已建立并维护活跃 Fork。与此同时，有一条关于 DevOps 门禁和 PR 规范的 PR 被关闭，但数据未显示是否已合并，说明协作流程层面存在治理尝试。总体来看，项目当前健康度存在不确定性，主要风险集中在**维护响应、主仓库活跃度和社区分流**。

---

## 2. 项目进展

### PR #3418：ci: enforce shared devops gates  
- 状态：**CLOSED**
- 作者：hawkli-1994  
- 创建 / 更新：2026-10-07  
- 链接：https://github.com/sipeed/picoclaw/pull/3418

该 PR 尝试引入一套最小 DevOps 规范，包括：

- 三段式 PR 模板
- 所有 PR 至少需要一次正式 GitHub approval
- 新增只读 `ci-gate`，用于校验 PR 标题与说明
- 汇总当前提交适用的既有 PR 工作流
- 保留路径过滤和原有必需检查
- 提交可复用的分支保护配置，包括：
  - 必需 CI
  - approval 过期后失效
  - 讨论必须解决
  - 禁止强推 / 删除分支
  - 管理员同样适用

从内容看，该 PR 的重点是**提升协作治理和合并质量控制**，并非直接功能开发或 Bug 修复。它如果被合并，将有助于降低贡献流程不一致、PR 模板与实际合并门槛脱节的问题。

不过当前数据仅显示该 PR 为 **Closed**，未明确标注是否 merged。因此今日项目进展应谨慎评估为：  
> 有治理规范推进尝试，但是否真正进入主分支仍需进一步确认。

---

## 3. 社区热点

### Issue #3417：[Notice] Active Fork & Continued Maintenance: afjcjsbx/picoclaw  
- 状态：**OPEN**
- 作者：afjcjsbx  
- 创建 / 更新：2026-10-06  
- 评论数：0  
- 反应数：👍 0  
- 链接：https://github.com/sipeed/picoclaw/issues/3417

该 Issue 是今日最重要的社区信号。作者表示，由于当前仓库“看起来无人维护”，而社区仍然存在明显兴趣和需求，因此创建并主动维护一个 Fork：

- Fork 地址：https://github.com/afjcjsbx/picoclaw

虽然该 Issue 暂无评论和反应，但其内容反映出几个关键诉求：

1. **社区希望项目继续维护**  
   用户并非放弃项目，而是希望通过 Fork 延续项目生命周期。

2. **主仓库维护状态存在信任风险**  
   “unmaintained” 的判断如果长期得不到主仓库维护者回应，可能导致贡献者、用户和下游项目逐渐转向 Fork。

3. **项目可能出现社区分流**  
   如果 Fork 持续活跃，而主仓库无响应，未来可能出现事实上的维护权转移或生态分裂。

该 Issue 虽然互动数据不高，但在项目健康度层面非常重要，建议维护者优先回应。

---

## 4. Bug 与稳定性

今日未发现新的 Bug、崩溃、回归或稳定性问题报告。

当前 24 小时内没有以下类型的新增记录：

- 崩溃报告
- 回归问题
- 安装失败
- 构建失败
- 运行时异常
- 兼容性问题
- 安全漏洞报告

也未发现针对 Bug 的 fix PR。

需要注意的是，今日缺少 Bug 报告并不必然代表项目稳定性良好，也可能与主仓库活跃度降低、用户转向 Fork 或反馈渠道分散有关。

---

## 5. 功能请求与路线图信号

今日未出现明确的新功能请求。

不过从现有 Issue 和 PR 可以观察到两个路线图层面的信号：

### 维护与治理优先级上升  
- 相关 PR：https://github.com/sipeed/picoclaw/pull/3418  
- 相关 Issue：https://github.com/sipeed/picoclaw/issues/3417

当前社区关注点并不在单一功能，而是集中在：

- 项目是否仍由主仓库维护
- 是否需要迁移到活跃 Fork
- 是否需要建立更明确的贡献流程
- 是否需要统一 PR 模板、CI gate 和分支保护策略

这些信号表明，若项目希望恢复活跃度，下一阶段可能需要优先处理：

1. 明确维护者状态  
2. 发布项目维护路线图  
3. 确认 Fork 与主仓库的关系  
4. 建立稳定的 CI / PR / review 流程  
5. 给社区一个可预期的贡献入口  

---

## 6. 用户反馈摘要

今日没有 Issue 评论，因此没有大量可提炼的交互式用户反馈。但从 Issue #3417 的正文可以提炼出以下真实痛点：

### 用户痛点

- 主仓库疑似缺乏维护响应  
  链接：https://github.com/sipeed/picoclaw/issues/3417

- 社区仍有继续使用和维护项目的需求  
  链接：https://github.com/sipeed/picoclaw/issues/3417

- 用户需要一个可持续、可提交改动、可获得反馈的活跃代码库  
  链接：https://github.com/afjcjsbx/picoclaw

### 使用场景信号

虽然 Issue 未详细描述具体使用场景，但“significant interest and demand from the community” 表明 PicoClaw 仍存在实际用户群体或下游依赖方。当前用户最关心的并不是单个功能，而是项目是否还能被安全依赖、继续开发和持续集成。

### 满意 / 不满意点

- 满意点：社区愿意主动接手维护，说明项目仍有价值。
- 不满意点：主仓库维护状态不清晰，缺少官方回应与路线图。

---

## 7. 待处理积压

由于本日报仅基于过去 24 小时数据，无法完整判断长期未响应 Issue 或 PR。但今日有两个需要维护者关注的待处理事项。

### 高优先级：回应活跃 Fork 声明  
- Issue：#3417  
- 状态：OPEN  
- 链接：https://github.com/sipeed/picoclaw/issues/3417

建议维护者尽快回应以下问题：

1. 主仓库是否仍在维护？
2. 是否接受社区协作者加入？
3. 是否认可或计划合并 Fork 中的改动？
4. 是否需要发布维护路线图？
5. 是否需要在 README 中标注项目状态？

这是当前最关键的项目健康度问题。如果长期不回应，社区可能默认主仓库已停止维护。

### 中优先级：确认 PR #3418 的关闭原因  
- PR：#3418  
- 状态：CLOSED  
- 链接：https://github.com/sipeed/picoclaw/pull/3418

该 PR 涉及 DevOps 规范、PR gate 和分支保护，对项目协作质量有潜在正面影响。但目前只看到关闭状态，未明确是否合并。

建议维护者补充说明：

- 该 PR 是否已合并？
- 如果未合并，关闭原因是什么？
- 是否计划采用类似的 CI gate / PR 模板 / branch protection？
- 是否需要重新提交简化版治理 PR？

---

## 项目健康度评估

| 维度 | 今日状态 | 评估 |
|---|---:|---|
| Issue 活跃度 | 1 条更新 | 低 |
| PR 活跃度 | 1 条关闭 | 低到中 |
| Release 活跃度 | 0 个版本 | 低 |
| Bug 风险 | 无新增报告 | 暂无明确信号 |
| 社区信心 | 出现活跃 Fork 声明 | 存在风险 |
| 维护状态 | 被社区质疑无人维护 | 需立即澄清 |
| 治理流程 | 有 DevOps 规范尝试 | 有改善信号但结果不明 |

**综合判断：PicoClaw 今日处于低活跃状态，项目主要风险不是技术缺陷，而是维护连续性和社区信任。**  
短期内最重要的动作是由主仓库维护者公开回应 Issue #3417，并明确是否继续维护、是否接受协作者、是否与活跃 Fork 协同。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报  
**日期：2026-10-07**  
**仓库：** [qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw)

---

## 1. 今日速览

过去 24 小时 NanoClaw 活跃度较高：共有 **1 条 Issue 更新**、**6 条 PR 更新**，其中 **4 条 PR 仍待合并**，**2 条 PR 已关闭**。今日工作重点明显集中在 **安装稳定性、消息投递可靠性、工具/技能兼容性** 以及 **群组频道交互模式** 上。  
从 PR 分布看，维护者正在快速修复近期 RC 版本或网关版本变化带来的回归问题，项目处于 **发布前稳定性打磨阶段**。社区讨论热度不高，Issue/PR 均未体现明显评论或点赞互动，但多个修复 PR 直接对应真实安装和运行故障，说明维护响应较及时。

---

## 2. 项目进展

### 已关闭 / 已完成的重要 PR

#### #4051 fix(setup): carry the upgrade marker across setup's local commits  
- 状态：**CLOSED**  
- 链接：[PR #4051](https://github.com/qwibitai/nanoclaw/pull/4051)  
- 作者：glifocat  
- 领域：`area/setup-installation`  
- 类型：Bug 修复  

该 PR 修复了一个安装/升级路径相关问题：新安装过程中如果添加 channel，会生成本地 `setup: apply <skill>` commit，随后重启时可能触发 `"update did not go through the supported path"`。  
修复方向是确保 **upgrade marker 能够随 setup 本地提交继续保留在 HEAD 上**，避免系统误判升级路径异常。

**项目推进意义：**
- 提升 fresh install 后的首次重启稳定性。
- 降低用户在初次配置 channel/skill 后遇到不可恢复状态的概率。
- 对安装体验和新用户留存有直接帮助。

---

#### #4048 feat(router): add a new-thread engage mode for group channels  
- 状态：**CLOSED**  
- 链接：[PR #4048](https://github.com/qwibitai/nanoclaw/pull/4048)  
- 作者：zvi-fried  
- 领域：`area/channels`, `area/core`, `area/ncl-cli`, `area/setup-installation`, `area/skills`  
- 类型：功能增强  

该 PR 为群组频道增加了新的 engage mode：**new-thread**。此前 agent 在群组中主要通过以下方式被触发：
- `mention`
- `mention-sticky`
- `pattern`

新模式允许 agent 对每一个新的顶层 thread 自动响应，而不要求用户显式 mention。

**项目推进意义：**
- 扩展了 NanoClaw 在群组协作场景中的可用性。
- 更适合 Slack/Discord/企业群组中“按主题线程自动接入”的助手使用方式。
- 这可能成为后续多频道、多线程 agent routing 的重要能力基础。

> 注：数据仅显示 PR 状态为 CLOSED，未明确标注是否已 merge；上述分析基于 PR 摘要内容。

---

## 3. 社区热点

今日没有高评论或高反应的 Issue/PR。可见数据中：
- Issue #4050 评论数：0，👍：0
- PR 评论数：数据为 undefined
- PR 点赞数：均为 0

因此今日社区热度整体偏低，但以下条目具备较高实际影响。

---

### 安装失败：旧 corepack 导致 pnpm install 失败

#### #4050 [bug] Setup fails with "Cannot find matching keyid" when an older Node's corepack is on PATH  
- 状态：**OPEN**  
- 链接：[Issue #4050](https://github.com/qwibitai/nanoclaw/issues/4050)  
- 作者：EyalPoly  
- 影响版本：`d7175d0d` / `v2026.10.0-rc.2`  
- 平台：macOS  
- 评论：0  
- 反应：0  

用户反馈在 bootstrap 阶段失败，错误发生于：

```bash
pnpm install --frozen-lockfile
```

失败信息为：

```text
Cannot find matching keyid
```

从描述看，机器上没有 Node 22+，`setup/install-node.sh` 虽然安装了新 Node，但环境 PATH 中仍使用旧 Node 的 `corepack`，最终导致 pnpm 安装失败。

**背后诉求：**
- 安装脚本需要完全接管 Node/pnpm/corepack 工具链，避免用户机器已有环境污染。
- 对 macOS 新用户而言，setup 应具备更强的幂等性和自恢复能力。
- RC 版本在安装链路上仍存在兼容性风险。

对应修复 PR：[#4049](https://github.com/qwibitai/nanoclaw/pull/4049)

---

## 4. Bug 与稳定性

### 高优先级：安装流程被旧 corepack 阻断

#### #4050 Setup fails with "Cannot find matching keyid"  
- 严重程度：**高**  
- 状态：OPEN  
- 链接：[Issue #4050](https://github.com/qwibitai/nanoclaw/issues/4050)  
- 影响范围：新安装 / bootstrap / macOS / Node 版本低于 22 的环境  
- 是否已有修复 PR：**有，#4049**

#### #4049 fix(setup): stop a stale corepack from breaking pnpm install  
- 状态：OPEN  
- 链接：[PR #4049](https://github.com/qwibitai/nanoclaw/pull/4049)  
- 作者：EyalPoly  
- 领域：`area/setup-installation`

该 PR 直接修复 #4050 所反映的问题。问题根因是 `install-node.sh` 只将以下命令链接到 `~/.local/bin`：

- `node`
- `npm`
- `npx`

但未链接 `corepack`，导致 `setup.sh` 仍可能使用 PATH 中旧版本 Node 附带的 corepack。

**建议维护者优先级：最高。**  
该问题会直接阻塞 fresh install，是 RC 稳定性发布前应优先合入的修复。

---

### 中高优先级：无 destination 的 outbound message 被误判为已投递

#### #4053 fix(delivery): fail an outbound row with no destination and tell the agent  
- 状态：OPEN  
- 链接：[PR #4053](https://github.com/qwibitai/nanoclaw/pull/4053)  
- 作者：jfu1  
- 领域：`area/core`

该 PR 修复 host 在 outbound message 缺少目标地址时仍将其记录为 delivered 的问题。典型场景是：

- `messages_out.channel_type` 为 null
- `messages_out.platform_id` 为 null
- 实际并没有任何消息被发送

**风险：**
- agent 误以为消息已成功发送。
- 用户端实际收不到内容。
- 调试时系统状态与真实投递状态不一致。

**稳定性意义：**
- 提高消息投递状态的真实性。
- 避免 silent failure。
- 为 agent 提供可感知的失败反馈。

---

### 中优先级：send_card / ask_user_question 在无 chat session 中误报成功

#### #4054 fix(agent-runner): give send_card a destination; refuse cards and questions with no chat  
- 状态：OPEN  
- 链接：[PR #4054](https://github.com/qwibitai/nanoclaw/pull/4054)  
- 作者：jfu1  
- 领域：`area/agent-runner`, `area/tools`

该 PR 处理 scheduled task 或无 attached chat 的 session 中，`send_card` 和 `ask_user_question` 行为不正确的问题。

当前问题：
- 工具尝试写入 session 的 bound routing。
- 但 scheduled task run 中 routing 可能为 null。
- 结果是系统声称成功，但消息无法送达。

修复方向：
- 给 `send_card` 明确 destination。
- 在无 chat 的上下文中拒绝 card/question，避免虚假成功。

**稳定性意义：**
- 提升 agent tool 调用语义的一致性。
- 防止无人接收的交互式消息被误认为已完成。
- 与 #4053 共同强化 delivery 层的错误可见性。

---

### 中优先级：OneCLI gateway 1.42 下 `/add-dial-tool` 不兼容

#### #4052 fix(add-dial-tool): scope Dial through the OneCLI policy API  
- 状态：OPEN  
- 链接：[PR #4052](https://github.com/qwibitai/nanoclaw/pull/4052)  
- 作者：glifocat  
- 领域：`area/skills`, `area/tools`  
- 标签：`delivery/skill`

该 PR 使 `/add-dial-tool` 能够在当前 pinned 的 OneCLI gateway `1.42.0` 上工作。问题根因是 gateway 1.42 对 legacy rule writes 返回 `410`，因此需要从旧 rules API 迁移到 OneCLI policy API。

**影响：**
- 使用 Dial 工具或相关 skill 的用户可能无法完成配置。
- 该问题与外部依赖版本升级/弃用相关，属于兼容性修复。

**稳定性意义：**
- 减少 gateway API 变化导致的功能失效。
- 推动 NanoClaw 的 skill/tool 权限配置向新 policy API 对齐。

---

### 已关闭：setup upgrade marker 丢失

#### #4051 fix(setup): carry the upgrade marker across setup's local commits  
- 状态：CLOSED  
- 链接：[PR #4051](https://github.com/qwibitai/nanoclaw/pull/4051)  
- 严重程度：中  
- 影响范围：fresh install + setup 中添加 channel/skill 后首次重启

该修复已进入关闭状态，若已合并，将显著改善安装后的重启路径稳定性。

---

## 5. 功能请求与路线图信号

### 群组频道自动线程响应能力正在增强

#### #4048 feat(router): add a new-thread engage mode for group channels  
- 状态：CLOSED  
- 链接：[PR #4048](https://github.com/qwibitai/nanoclaw/pull/4048)

这是今日最明显的功能路线图信号。NanoClaw 正在从“被动 mention 触发”向更主动、更上下文感知的群组参与模式发展。

**可能的产品方向：**
- 群组 channel 中更自然的 agent 参与体验。
- 面向 thread-based collaboration 的 routing 策略增强。
- 后续可能出现更多 engage mode，例如：
  - 按 thread 类型触发
  - 按用户/角色触发
  - 按 channel policy 触发
  - 按任务/skill 触发

**是否可能纳入下一版本：**
- PR 已关闭，且涉及多个核心区域，若为已合并状态，则很可能成为下一版本的重要功能点。
- 若只是关闭未合并，则仍需观察后续替代 PR 或设计调整。

---

### 工具调用的“可达性语义”正在被强化

相关 PR：
- [#4053](https://github.com/qwibitai/nanoclaw/pull/4053)
- [#4054](https://github.com/qwibitai/nanoclaw/pull/4054)

这两条 PR 共同释放出一个路线图信号：NanoClaw 正在加强 agent tools 与 delivery 系统之间的边界语义，尤其是：

- 工具调用是否真的可送达
- 无 chat / 无 destination 场景是否应该拒绝
- agent 是否能感知消息投递失败
- outbound message 状态是否可信

这对个人 AI 助手、定时任务 agent、后台 agent runner 等场景都很关键。

---

## 6. 用户反馈摘要

今日唯一明确的用户反馈来自 Issue #4050。

### 用户痛点：安装脚本受本机旧环境影响，导致 bootstrap 失败

#### #4050 Setup fails with "Cannot find matching keyid"  
- 链接：[Issue #4050](https://github.com/qwibitai/nanoclaw/issues/4050)

用户场景：
- macOS
- 本机没有 Node 22+
- setup 脚本尝试安装 Node
- 但 PATH 中存在旧 corepack
- 最终 `pnpm install --frozen-lockfile` 失败

用户不满意点：
- 安装脚本看似安装了合适的 Node，但没有完整隔离旧工具链。
- 错误信息 `Cannot find matching keyid` 对普通用户不直观。
- bootstrap 失败发生在依赖安装阶段，会直接阻断使用。

维护侧已有响应信号：
- 同作者提交了修复 PR [#4049](https://github.com/qwibitai/nanoclaw/pull/4049)，说明问题定位较清晰，修复路径明确。

---

## 7. 待处理积压

从今日数据看，没有长期未响应的 Issue 或 PR 信息；但以下开放项建议维护者优先处理。

### 需优先 Review / 合并

#### #4049 fix(setup): stop a stale corepack from breaking pnpm install  
- 链接：[PR #4049](https://github.com/qwibitai/nanoclaw/pull/4049)  
- 优先级：**P0 / P1**  
- 原因：直接影响安装成功率，并已有对应用户 Issue [#4050](https://github.com/qwibitai/nanoclaw/issues/4050)。

#### #4053 fix(delivery): fail an outbound row with no destination and tell the agent  
- 链接：[PR #4053](https://github.com/qwibitai/nanoclaw/pull/4053)  
- 优先级：**P1**  
- 原因：修复消息投递状态误报，避免 silent failure。

#### #4054 fix(agent-runner): give send_card a destination; refuse cards and questions with no chat  
- 链接：[PR #4054](https://github.com/qwibitai/nanoclaw/pull/4054)  
- 优先级：**P1**  
- 原因：与 #4053 相关，影响 scheduled task / no-chat session 的工具调用可靠性。

#### #4052 fix(add-dial-tool): scope Dial through the OneCLI policy API  
- 链接：[PR #4052](https://github.com/qwibitai/nanoclaw/pull/4052)  
- 优先级：**P1 / P2**  
- 原因：适配 pinned gateway 1.42，避免 `/add-dial-tool` 因 legacy API 退役而失效。

### 需关闭或关联处理的 Issue

#### #4050 Setup fails with "Cannot find matching keyid"  
- 链接：[Issue #4050](https://github.com/qwibitai/nanoclaw/issues/4050)  
- 建议：等待 #4049 合并后回测并关闭。  
- 可补充动作：
  - 在 setup 文档中说明 Node/corepack/pnpm 版本要求。
  - 在安装脚本中输出实际使用的 `node`、`corepack`、`pnpm` 路径和版本，便于排障。

---

## 项目健康度评估

**总体健康度：良好，但当前处于稳定性修复密集期。**

积极信号：
- 24 小时内有 6 条 PR 更新，维护活跃。
- 安装、delivery、agent-runner、skills 等关键路径均有修复推进。
- 用户报告的问题很快出现对应修复 PR。

风险点：
- RC 版本安装链路仍可能被本机环境污染影响。
- delivery 层存在“未送达但标记成功”的可靠性问题。
- 外部 gateway API 变化正在影响 skill/tool 行为。

建议下一步重点：
1. 优先合并并验证 [#4049](https://github.com/qwibitai/nanoclaw/pull/4049)，解除安装阻断。
2. 将 [#4053](https://github.com/qwibitai/nanoclaw/pull/4053) 与 [#4054](https://github.com/qwibitai/nanoclaw/pull/4054) 作为一组 delivery/tool reliability 修复处理。
3. 确认 [#4048](https://github.com/qwibitai/nanoclaw/pull/4048) 和 [#4051](https://github.com/qwibitai/nanoclaw/pull/4051) 是否已合并，并在下一版 changelog 中明确说明。
4. 对 setup 脚本增加更明确的环境诊断输出，降低新用户安装失败后的排障成本。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报 — 2026-10-07

## 1. 今日速览

过去 24 小时，NullClaw 没有新增或更新 Issue，说明社区侧反馈较安静；但维护侧完成了 3 个与 `agent` / `local_loop` 相关的修复 PR，活跃度集中在稳定性治理上。  
今日没有新版本发布，项目仍处于代码修复与质量收敛阶段。  
3 个 PR 均由 `vernonstinebaker` 提交，且都来自对 [#987](https://github.com/nullclaw/nullclaw/pull/987) 的拆分修复，显示维护者正在系统性处理 agent 本地循环、并发与内存生命周期问题。  
整体看，今日项目不是功能扩张型活跃，而是偏“安全性 / 稳定性加固”的维护日，健康度表现为：社区低噪音、维护动作明确、风险点正在被集中修复。

---

## 2. 项目进展

今日共有 3 个 PR 被关闭 / 完成处理，全部围绕 `agent` 模块的 `local_loop` 行为、并发安全和内存生命周期问题。

### PR #1044 — `fix(agent): make local_loop.enabled actually gate the feature`

- 链接：[nullclaw/nullclaw#1044](https://github.com/nullclaw/nullclaw/pull/1044)
- 作者：`vernonstinebaker`
- 状态：Closed
- 创建 / 更新：2026-10-06
- 反应：👍 0
- 评论：无可用数据

该 PR 是从 [#987](https://github.com/nullclaw/nullclaw/pull/987) 拆出的第一部分，修复 `local_loop.enabled` 未真正控制功能开关的问题。  
根据摘要描述，原先 `local_loop.enabled` 只是影响不同的上限配置，而不是实际关闭功能，导致相关能力近似“默认开启”。这会影响所有使用 agent 本地循环配置的用户，属于范围较广的行为一致性问题。

**影响判断：**

- 修复配置语义与实际行为不一致的问题。
- 降低用户误以为功能关闭但实际仍在运行的风险。
- 为后续两个并发与内存安全修复提供前置基础。

---

### PR #1045 — `fix(agent): make parallel tool workers safe on every exit path`

- 链接：[nullclaw/nullclaw#1045](https://github.com/nullclaw/nullclaw/pull/1045)
- 作者：`vernonstinebaker`
- 状态：Closed
- 创建 / 更新：2026-10-06
- 反应：👍 0
- 评论：无可用数据

该 PR 是从 [#987](https://github.com/nullclaw/nullclaw/pull/987) 拆出的第二部分，集中修复并行工具 worker 的退出路径安全问题。  
摘要中提到该 PR 处理 findings 1–3，即并发与生命周期缺陷，包括 join、arena race、use-after-free 等风险方向。

**影响判断：**

- 提升并行 tool worker 在异常退出、提前返回、失败路径下的安全性。
- 降低并发场景下的数据竞争与悬垂引用风险。
- 对 agent 调用外部工具、并行执行任务等场景的稳定性有直接正向影响。

---

### PR #1046 — `fix(agent): bound local_loop config and stop returning dead stack storage`

- 链接：[nullclaw/nullclaw#1046](https://github.com/nullclaw/nullclaw/pull/1046)
- 作者：`vernonstinebaker`
- 状态：Closed
- 创建 / 更新：2026-10-06
- 反应：👍 0
- 评论：无可用数据

该 PR 是从 [#987](https://github.com/nullclaw/nullclaw/pull/987) 拆出的第三部分，主要解决边界检查与栈内存生命周期问题。  
摘要中展示了一个典型风险：函数返回指向局部栈数组的 slice，例如 `return buf[0..cap]`，这会导致调用方拿到已经失效的栈帧内存。

**影响判断：**

- 修复潜在 use-after-return / 悬垂 slice 问题。
- 对 Zig 项目中的内存安全和运行时稳定性非常关键。
- 同时对 `local_loop` 配置边界进行约束，减少异常输入或配置导致的未定义行为风险。

---

### 今日推进总结

今日 3 个 PR 构成一组连续修复：

1. [#1044](https://github.com/nullclaw/nullclaw/pull/1044)：修复功能开关未真正生效的问题；
2. [#1045](https://github.com/nullclaw/nullclaw/pull/1045)：修复并行 worker 的并发与生命周期安全；
3. [#1046](https://github.com/nullclaw/nullclaw/pull/1046)：修复边界与栈内存返回问题。

整体来看，项目今日主要向“agent 执行安全性、配置可控性、并发稳定性”方向前进。虽然没有新增功能，但这类底层修复对于 AI agent 框架尤为重要，尤其是在工具调用、本地循环、并发执行等高风险路径中。

---

## 3. 社区热点

今日没有 Issue 更新，PR 的评论数数据不可用，且反应数均为 0，因此没有明显的社区讨论热点。

相对而言，以下 3 个 PR 是今日技术关注度最高的变更点：

| PR | 主题 | 链接 | 热点原因 |
|---|---|---|---|
| #1044 | `local_loop.enabled` 未真正 gate 功能 | [#1044](https://github.com/nullclaw/nullclaw/pull/1044) | 影响所有依赖该配置关闭本地循环能力的用户 |
| #1045 | 并行 tool workers 退出路径安全 | [#1045](https://github.com/nullclaw/nullclaw/pull/1045) | 涉及并发、arena race、use-after-free 等稳定性风险 |
| #1046 | `local_loop` 配置边界与 dead stack storage | [#1046](https://github.com/nullclaw/nullclaw/pull/1046) | 涉及 Zig 内存生命周期问题，可能导致运行时未定义行为 |

**背后诉求分析：**

当前维护重点反映出 NullClaw 正在强化 agent runtime 的可靠性。对于个人 AI 助手或智能体框架来说，工具调用、循环执行和并发 worker 是核心能力；这些模块如果存在配置失效、生命周期错误或竞态条件，可能导致不可预测行为。因此，今日 PR 的共同目标是让 agent 执行路径更加可控、可预期、可恢复。

---

## 4. Bug 与稳定性

今日没有新报告的 Bug Issue，但有 3 个稳定性修复 PR 被关闭 / 完成处理。按严重程度排序如下：

### 高严重度：并行 worker 并发与生命周期缺陷

- 相关 PR：[nullclaw/nullclaw#1045](https://github.com/nullclaw/nullclaw/pull/1045)
- 类型：并发安全 / 生命周期管理
- 影响范围：并行工具调用、worker 异常退出、提前返回路径
- 是否已有 fix PR：是，[#1045](https://github.com/nullclaw/nullclaw/pull/1045)

该问题涉及并行 tool workers 的退出路径安全。摘要中提到 join、arena race、use-after-free 等问题，说明存在多线程或并发任务清理阶段的资源生命周期风险。对于 agent 框架而言，这类问题可能导致随机崩溃、数据竞争或难以复现的错误。

---

### 高严重度：返回失效栈内存 slice

- 相关 PR：[nullclaw/nullclaw#1046](https://github.com/nullclaw/nullclaw/pull/1046)
- 类型：内存生命周期错误
- 影响范围：涉及返回局部栈缓冲区 slice 的代码路径
- 是否已有 fix PR：是，[#1046](https://github.com/nullclaw/nullclaw/pull/1046)

PR 摘要明确指出存在类似以下模式的问题：

```zig
fn stackLowerAscii(input: []const u8) []const u8 {
    var buf: [256]u8 = undefined;
    ...
    return buf[0..cap];
}
```

该返回值指向函数栈帧内的局部数组，函数返回后内存即失效。此类问题可能引发未定义行为、数据损坏或运行时崩溃。

---

### 中高严重度：`local_loop.enabled` 配置开关未真正生效

- 相关 PR：[nullclaw/nullclaw#1044](https://github.com/nullclaw/nullclaw/pull/1044)
- 类型：配置行为错误 / 功能 gate 失效
- 影响范围：所有依赖 `local_loop.enabled` 控制功能开启或关闭的用户
- 是否已有 fix PR：是，[#1044](https://github.com/nullclaw/nullclaw/pull/1044)

该问题使 `local_loop.enabled` 没有真正关闭功能，而只是影响不同的 cap。对于用户而言，这会造成配置认知与实际行为不一致，尤其是在希望禁用本地循环、降低成本、避免自动执行或限制 agent 行为时，影响较明显。

---

## 5. 功能请求与路线图信号

过去 24 小时没有新增 Issue，因此没有新的显式功能请求。

不过，从今日 3 个 PR 可以观察到以下路线图信号：

### 1. `local_loop` 正在成为重点治理模块

- 相关 PR：
  - [#1044](https://github.com/nullclaw/nullclaw/pull/1044)
  - [#1046](https://github.com/nullclaw/nullclaw/pull/1046)

`local_loop.enabled` 的 gate 修复和配置边界修复说明该能力可能正在走向更严格、更可控的实现。后续版本中，`local_loop` 相关配置很可能会继续被收敛，包括默认行为、配置上限、安全边界和关闭语义。

### 2. 并行工具执行路径是稳定性重点

- 相关 PR：[#1045](https://github.com/nullclaw/nullclaw/pull/1045)

并行 tool workers 的安全退出路径被专门拆出修复，说明 NullClaw 可能正在强化 agent 的工具调用能力。若下一版本继续沿此方向推进，可能会看到更稳定的并行工具执行、更明确的取消机制、更可靠的资源清理逻辑。

### 3. 维护者正在通过拆分 PR 降低风险

- 相关上游 PR：[#987](https://github.com/nullclaw/nullclaw/pull/987)

3 个 PR 均来自 [#987](https://github.com/nullclaw/nullclaw/pull/987) 的拆分，表明维护者倾向于将复杂修复拆成可审查、可验证的小块。这是项目工程治理成熟度的正向信号。

---

## 6. 用户反馈摘要

过去 24 小时没有 Issue 评论数据，也没有可用的 PR 评论内容，因此无法直接提炼真实用户反馈。

基于今日 PR 摘要，可以间接推断潜在用户痛点：

1. **配置开关不可信**
   - 相关 PR：[#1044](https://github.com/nullclaw/nullclaw/pull/1044)
   - 用户可能以为 `local_loop.enabled = false` 可以禁用某能力，但实际并未完全禁用。这会影响用户对 agent 行为的可控感。

2. **并发执行不稳定**
   - 相关 PR：[#1045](https://github.com/nullclaw/nullclaw/pull/1045)
   - 使用并行工具 worker 时，用户可能遇到随机失败、崩溃、资源释放异常或难以复现的问题。

3. **边界配置与内存安全隐患**
   - 相关 PR：[#1046](https://github.com/nullclaw/nullclaw/pull/1046)
   - 用户可能不会直接感知“返回死栈内存”这类底层 bug，但会表现为偶发异常、错误输出或运行不稳定。

整体上，今日数据没有体现明显的不满意反馈，但维护者修复方向说明项目正在主动处理 agent runtime 的可靠性问题。

---

## 7. 待处理积压

基于提供的 24 小时数据，今日没有长期未响应的 Issue 或 PR 信息，因此无法识别明确的历史积压。

建议维护者关注以下对象：

| 类型 | 链接 | 建议 |
|---|---|---|
| 上游拆分来源 PR | [#987](https://github.com/nullclaw/nullclaw/pull/987) | 确认 #1044、#1045、#1046 关闭后，#987 中的所有 review finding 是否已完全覆盖 |
| `local_loop` 相关配置 | [#1044](https://github.com/nullclaw/nullclaw/pull/1044)、[#1046](https://github.com/nullclaw/nullclaw/pull/1046) | 检查文档是否同步更新，避免用户误解 `enabled`、cap、边界限制等语义 |
| 并行 worker 生命周期 | [#1045](https://github.com/nullclaw/nullclaw/pull/1045) | 建议补充回归测试，覆盖正常完成、异常退出、取消、提前返回等路径 |

---

## 总体健康度判断

NullClaw 今日表现为低社区噪音、集中维护修复的状态。没有新版本和新 Issue，说明外部活跃度较低；但 3 个 PR 都指向 agent 核心路径的稳定性问题，说明项目内部维护仍在推进。  
尤其是 `local_loop` gate、并发 worker 安全、dead stack storage 等问题被拆分处理，显示维护者对底层可靠性有较强关注。短期内，项目最值得关注的方向是：这些修复是否已合入主线、是否补充测试，以及是否会触发一次稳定性版本发布。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报  
日期：2026-10-07  
仓库：netease-youdao/LobsterAI

---

## 1. 今日速览

过去 24 小时，LobsterAI 项目共有 **1 条 Issue 更新**、**6 条 PR 更新**，整体活跃度较高，主要集中在 **OpenClaw / Computer Use、cowork 体验、构建与 CI、IM 模块清理** 等方向。  
今日没有新版本发布，但维护侧动作密集，6 个 PR 均已关闭或合并，说明主干维护节奏较快。  
社区侧新增 Issue 主要来自外部评测组织的收录邀请，反映 LobsterAI 已开始进入更广泛的 Agent 评测与生态观察范围。  
整体来看，项目今日更偏向 **工程质量修复、macOS 能力补齐、用户体验打磨和历史债务清理**，健康度表现积极。

---

## 2. 版本发布

过去 24 小时 **无新版本发布**。

---

## 3. 项目进展

今日共有 6 个 PR 更新，全部处于 closed 状态。结合标题和摘要看，项目主要推进了以下方向：

### 3.1 OpenClaw / Computer Use 能力继续增强

- [PR #2805 feat: computer use for Mac](https://github.com/netease-youdao/LobsterAI/pull/2805)  
  涉及区域：`build`、`docs`、`main`、`openclaw`  
  该 PR 指向 **Mac 平台 Computer Use 能力支持**，是今日最重要的功能型进展之一。  
  从标签看，它不仅涉及主进程与 OpenClaw，也包含构建和文档更新，说明该能力可能已经进入可交付或接近可交付状态。  
  对 LobsterAI 来说，这意味着 Computer Use 场景正在从单一平台向 macOS 扩展，有助于提升桌面 Agent 的实际可用范围。

### 3.2 cowork / OpenClaw 网络错误可观测性增强

- [PR #2807 fix(cowork): report proxy network failures and add screenshot scale](https://github.com/netease-youdao/LobsterAI/pull/2807)  
  涉及区域：`main`、`openclaw`  
  该 PR 修复了用户在运行时遇到的模糊错误提示：  
  > “服务端出现错误，请稍后重试。”  
  实际底层问题是 `HTTP 502: Token proxy upstream error`，请求甚至没有到达 `lobsterai-server`。  
  摘要中提到一次 Computer Use 会话回放了 15 张截图，请求体约 2.3 MB，并通过本地 Clash 代理上传，触发了代理层问题。

  该修复的价值在于：
  - 将原本不可诊断的“服务端错误”转化为更明确的代理网络失败；
  - 有助于用户和维护者区分服务端故障、代理故障与请求体过大问题；
  - 新增 screenshot scale，可能用于降低截图传输体积，缓解 Computer Use 场景中的网络负载。

### 3.3 cowork 进度卡片 UI 体验重构

- [PR #2806 feat(cowork): redesign the progress card above the composer](https://github.com/netease-youdao/LobsterAI/pull/2806)  
  涉及区域：`renderer`、`cowork`  
  该 PR 重设计了 composer 上方的进度卡片，即 OpenClaw 的 `progress_card`。  
  摘要指出旧版存在以下体验问题：
  - 图标风格混杂，包括 check、clock、spinner 等 outline 图标；
  - 原生 `<progress>` 样式呈现为平台默认的高饱和绿色和灰色；
  - agent 工作时进度卡片会自行展开，挤压对话区域。

  这类改动虽然不是核心模型能力，但直接影响用户对 Agent 正在执行任务时的感知。  
  对个人 AI 助手类产品而言，任务执行状态是否稳定、可读、不干扰，是提升信任感的重要部分。

### 3.4 macOS 路径兼容性与插件修复逻辑修正

- [PR #2804 fix(openclaw): stop symlinked profile paths from skipping plugin repairs](https://github.com/netease-youdao/LobsterAI/pull/2804)  
  涉及区域：`main`、`openclaw`  
  该 PR 修复 macOS 上符号链接路径导致插件修复逻辑被跳过的问题。  
  摘要中提到，macOS 下 `os.tmpdir()` 路径会经过 `/var -> /private/var` 符号链接，导致以下测试失败：
  - `nspClawguardInstallRepair`
  - `nspClawguardCompatibility`
  - `openclawCompatibilityRepairCore`

  虽然 CI 只在 Ubuntu 上运行，因此此前一直保持绿色，但 macOS 本地测试会失败。  
  该修复说明维护者正在补齐跨平台测试盲区，特别是与 OpenClaw 插件修复、兼容性检测相关的路径规范化问题。

### 3.5 stale bot 策略收敛，降低误关 Issue 风险

- [PR #2803 fix(ci): limit stale bot to issues labeled needs-info](https://github.com/netease-youdao/LobsterAI/pull/2803)  
  涉及区域：`build`  
  该 PR 调整 stale workflow，不再对所有长期无活动 Issue 自动关闭，而是限制在带有 `needs-info` 标签的 Issue 上。  
  摘要中的数据值得关注：
  - 346 个已关闭 Issue 中，有 205 个是由 bot 关闭；
  - 其中只有 7 个曾有维护者评论。

  这说明过去的 stale 机制可能过于激进，导致大量 Issue 在没有维护者判断的情况下被自动关闭。  
  新策略有助于提升社区信任度，减少有效反馈被误关闭的风险。

### 3.6 移除遗留 NIM direct-SDK 网关

- [PR #2802 refactor(im): remove dead legacy NIM direct-SDK gateway](https://github.com/netease-youdao/LobsterAI/pull/2802)  
  涉及区域：`renderer`、`build`、`main`、`im`  
  该 PR 清理了已不再使用的 NIM direct-SDK 网关。  
  摘要显示，自 2026 年 3 月的 `b5fd3539` 之后，NIM 已完全通过 `openclaw-nim-channel` OpenClaw 插件运行，但旧的 `IMGatewayManager` 仍会构造旧版 `NimGateway`，并在主进程启动时加载 `nim-web-sdk-ng`。

  该清理的收益包括：
  - 减少主进程启动时不必要的模块加载；
  - 降低历史兼容代码带来的维护成本；
  - 减少潜在安全面和依赖复杂度；
  - 让 IM 架构更清晰地向 OpenClaw 插件化方向收敛。

---

## 4. 社区热点

### 4.1 外部 Agent 评测榜单邀请收录 LobsterAI

- [Issue #2801 [邀收录] 10/12 agent harness 榜单 · 免费 L1 收录](https://github.com/netease-youdao/LobsterAI/issues/2801)  
  状态：Open  
  作者：chunxiaoxx  
  评论数：1  
  反应数：0  

该 Issue 来自 Nautilus 组织，邀请 LobsterAI 参与其 10/12 上线的公开 agent harness 榜单。  
对方提供的 L1 收录内容包括：
- 实测判读卡；
- 冻结判据；
- 复算命令；
- 判据 sha 预注册；
- 判分独立于被测方；
- 结果无论好坏均可引用；
- 免费收录。

背后的诉求主要是：  
Nautilus 希望将 LobsterAI 作为国产开源 Agent / AI 助手代表项目之一纳入其公开评测体系。  
对 LobsterAI 而言，这可能是一次提升外部可信度和可比较性的机会，但也需要维护者判断：
- 评测任务是否匹配 LobsterAI 的真实定位；
- 榜单指标是否客观、可复现；
- 是否会对项目品牌产生正向影响；
- 是否需要官方配合提供 harness、运行方式或基准配置。

### 4.2 stale bot 机制调整反映社区治理问题

- [PR #2803 fix(ci): limit stale bot to issues labeled needs-info](https://github.com/netease-youdao/LobsterAI/pull/2803)  

虽然该 PR 不是用户直接讨论最活跃的条目，但它揭示了一个重要社区治理信号：  
大量 Issue 曾被 bot 自动关闭，而没有维护者参与判断。  
这类机制如果处理不当，容易让用户感觉“反馈无人看见”，尤其对于开源 AI 助手项目，用户反馈往往包含环境、模型、插件、系统权限等复杂问题，不能简单用“长时间无活动”判断是否解决。

---

## 5. Bug 与稳定性

按影响严重程度排序如下：

### 高优先级：Computer Use / cowork 网络错误被误报为服务端错误

- 相关 PR：[PR #2807 fix(cowork): report proxy network failures and add screenshot scale](https://github.com/netease-youdao/LobsterAI/pull/2807)  
- 状态：已关闭/已处理  
- 严重程度：高  
- 是否已有 fix PR：是  

问题表现：  
用户看到的是泛化错误提示“服务端出现错误，请稍后重试”，但真实原因是本地代理上传大请求时出现 `HTTP 502: Token proxy upstream error`。请求没有到达 `lobsterai-server`。

影响范围：  
- Computer Use 场景；
- 使用本地代理，如 Clash `127.0.0.1:7890` 的用户；
- 包含多张截图回放的大请求；
- 网络环境复杂或代理限流、超时的用户。

修复价值：  
该 PR 改善了错误上报和截图缩放能力，有助于减少“无法定位”的运行失败。

---

### 中高优先级：macOS 符号链接路径导致 OpenClaw 插件修复逻辑异常

- 相关 PR：[PR #2804 fix(openclaw): stop symlinked profile paths from skipping plugin repairs](https://github.com/netease-youdao/LobsterAI/pull/2804)  
- 状态：已关闭/已处理  
- 严重程度：中高  
- 是否已有 fix PR：是  

问题表现：  
macOS 下 `/var` 到 `/private/var` 的符号链接可能导致路径比较或规范化错误，进而跳过插件修复流程。  
这会影响 OpenClaw 的安装修复和兼容性检查。

影响范围：  
- macOS 用户；
- OpenClaw 插件安装、修复、兼容性检查；
- 本地开发测试环境。

该问题此前未被 Ubuntu-only CI 捕获，说明跨平台 CI 覆盖仍有提升空间。

---

### 中优先级：stale bot 大量自动关闭 Issue，可能影响问题追踪质量

- 相关 PR：[PR #2803 fix(ci): limit stale bot to issues labeled needs-info](https://github.com/netease-youdao/LobsterAI/pull/2803)  
- 状态：已关闭/已处理  
- 严重程度：中  
- 是否已有 fix PR：是  

这不是运行时 bug，但属于项目治理和问题追踪稳定性问题。  
自动关闭过多 Issue 可能导致：
- 有效 bug 被误关闭；
- 用户反馈流失；
- 项目问题面板低估真实积压；
- 维护者难以回溯历史问题。

该 PR 将 stale bot 限制到 `needs-info` 标签 Issue，是更合理的治理策略。

---

### 中低优先级：遗留 NIM direct-SDK 网关仍在主进程加载

- 相关 PR：[PR #2802 refactor(im): remove dead legacy NIM direct-SDK gateway](https://github.com/netease-youdao/LobsterAI/pull/2802)  
- 状态：已关闭/已处理  
- 严重程度：中低  
- 是否已有 fix PR：是  

该问题更多属于历史债务和架构清理。  
遗留 SDK 在主进程启动时加载，可能带来：
- 启动性能损耗；
- 依赖体积增加；
- 维护复杂度提升；
- 潜在兼容风险。

---

## 6. 功能请求与路线图信号

### 6.1 Mac Computer Use 支持可能进入近期版本重点

- 相关 PR：[PR #2805 feat: computer use for Mac](https://github.com/netease-youdao/LobsterAI/pull/2805)  

这是今日最明显的路线图信号。  
Computer Use for Mac 涉及 `build`、`docs`、`main`、`openclaw`，说明它不是局部实验，而是面向产品能力的系统性接入。  
如果该 PR 已合入主干，则下一版本很可能围绕以下方向释放能力：
- macOS 上的屏幕理解与操作；
- OpenClaw 插件能力增强；
- 与 cowork 流程结合的桌面自动化体验；
- 文档和构建链路补齐。

### 6.2 Agent 运行过程可视化体验继续打磨

- 相关 PR：[PR #2806 feat(cowork): redesign the progress card above the composer](https://github.com/netease-youdao/LobsterAI/pull/2806)  

进度卡片重构说明项目不仅关注 Agent 能不能做事，也在优化“用户如何理解 Agent 正在做什么”。  
这通常是个人 AI 助手从 demo 走向可日常使用的重要阶段。  
后续可能继续出现：
- 更细粒度任务状态；
- 可折叠/可追踪的执行日志；
- 多步骤任务的进度表达；
- 更低打扰的 UI 状态反馈。

### 6.3 OpenClaw 插件化架构继续成为主线

- 相关 PR：
  - [PR #2802 refactor(im): remove dead legacy NIM direct-SDK gateway](https://github.com/netease-youdao/LobsterAI/pull/2802)
  - [PR #2804 fix(openclaw): stop symlinked profile paths from skipping plugin repairs](https://github.com/netease-youdao/LobsterAI/pull/2804)
  - [PR #2805 feat: computer use for Mac](https://github.com/netease-youdao/LobsterAI/pull/2805)

IM 网关清理、插件修复路径修正、Computer Use for Mac 都指向同一趋势：  
LobsterAI 正在进一步强化 OpenClaw 作为插件与能力承载层的角色。

### 6.4 外部评测收录可能推动 benchmark / harness 标准化

- 相关 Issue：[Issue #2801](https://github.com/netease-youdao/LobsterAI/issues/2801)  

如果维护者接受 Nautilus 的收录邀请，后续可能需要：
- 提供标准运行命令；
- 固定评测配置；
- 明确模型、环境、插件版本；
- 支持可复现的 agent harness；
- 将评测结果纳入 README 或文档。

这可能推动 LobsterAI 在 benchmark reproducibility 方面进一步规范化。

---

## 7. 用户反馈摘要

今日可提炼的用户/外部反馈主要来自两个方向。

### 7.1 用户在 Computer Use 场景中遇到网络失败，但错误信息不够可诊断

- 相关 PR：[PR #2807](https://github.com/netease-youdao/LobsterAI/pull/2807)

真实痛点：  
用户看到“服务端出现错误，请稍后重试”，但无法判断是：
- LobsterAI 服务端问题；
- token proxy 问题；
- 本地代理问题；
- 请求体过大；
- 截图上传导致的超时或 502。

使用场景：  
用户运行 Computer Use，会话中包含多张截图回放，并通过本地代理上传请求。  
这类场景对网络链路、代理稳定性和请求体大小比较敏感。

不满意点：  
错误提示过于笼统，用户无法自助排查。

改进方向：  
PR #2807 已开始通过更准确的错误上报和 screenshot scale 缓解问题。

### 7.2 外部评测方认为 LobsterAI 具备国产开源代表性

- 相关 Issue：[Issue #2801](https://github.com/netease-youdao/LobsterAI/issues/2801)

反馈信号：  
Nautilus 组织主动邀请 LobsterAI 参与公开 Agent harness 榜单，并特别提到 LobsterAI 的 star 数和官方开源身份。  
这说明项目在开源 Agent / AI 助手生态中已有一定能见度。

潜在价值：  
如果评测方式可靠，LobsterAI 可以借此获得：
- 可复现的外部能力证明；
- 与其他 Agent 项目的横向比较；
- 对后续优化方向的客观参考。

潜在风险：  
如果 benchmark 场景与项目定位不一致，可能导致评价偏差。维护者需要审慎确认评测任务和判据。

---

## 8. 待处理积压

### 8.1 新增待响应 Issue

- [Issue #2801 [邀收录] 10/12 agent harness 榜单 · 免费 L1 收录](https://github.com/netease-youdao/LobsterAI/issues/2801)  
  状态：Open  
  建议优先级：中  

建议维护者尽快给出官方态度，因为对方提到榜单将在 10/12 上线，时间窗口较短。  
可回复方向包括：
- 是否愿意参与；
- 是否需要对方提供完整评测说明；
- LobsterAI 推荐的运行方式和环境；
- 是否接受结果公开引用；
- 是否需要官方审核判读卡内容。

### 8.2 长期未响应 Issue / PR

基于本次提供的数据，仅覆盖过去 24 小时更新内容，未包含完整历史积压列表。  
因此无法准确判断长期未响应的重要 Issue 或 PR。  
不过 [PR #2803](https://github.com/netease-youdao/LobsterAI/pull/2803) 暴露出历史上大量 Issue 被 stale bot 自动关闭的现象，建议维护者后续进行一次历史 Issue 复盘，尤其关注：
- 被 bot 关闭但没有维护者评论的 bug；
- 与 macOS、OpenClaw、Computer Use 相关的问题；
- 用户提供了复现信息但被自动关闭的反馈；
- 高赞或多评论但未形成修复的 Issue。

---

## 总体健康度评估

LobsterAI 今日项目健康度偏积极。  
维护侧在一天内处理了 6 个 PR，覆盖功能增强、稳定性修复、UI 改进、CI 治理和架构清理，说明项目仍处于高频演进状态。  
值得关注的是，Computer Use 与 OpenClaw 已成为近期核心主线，尤其是 macOS 支持和插件化架构的完善。  
社区方面虽然新增 Issue 数不多，但外部评测收录邀请显示项目影响力正在扩展；下一步建议维护者在可复现评测、跨平台 CI 和历史 Issue 复盘上继续投入。

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

# CoPaw 项目动态日报（2026-10-07）

> 数据范围：过去 24 小时 GitHub Issues / PR / Releases 更新  
> 注：本次数据中 Issue 链接显示为 `agentscope-ai/QwenPaw Issue #8114`，与报告目标仓库 `agentscope-ai/CoPaw` 存在命名不一致，以下按用户提供数据进行分析。

---

## 1. 今日速览

过去 24 小时内，项目仅有 **1 条 Issue 更新**，无 Pull Request 更新，也无新版本发布，整体开发与维护活跃度偏低。  
今日唯一新增/活跃讨论集中在 **模型推理强度控制** 上，反映用户在使用强推理模型时希望获得更细粒度的行为调节能力。  
当前没有发现新的 Bug、崩溃或回归问题报告，项目稳定性层面暂无明显风险信号。  
从贡献流来看，今日没有代码合并或关闭动作，说明项目主干在过去一天没有实质性推进。

---

## 2. 项目进展

过去 24 小时内没有新的 Pull Request 更新。

- 合并 PR：0 个
- 待合并 PR：0 个
- 关闭 PR：0 个

因此，今日项目在代码层面暂无可量化进展，也没有新功能、修复或重构被合入主分支。

---

## 3. 社区热点

### #8114 希望增加“推理强度”设定功能

- 链接：[agentscope-ai/QwenPaw Issue #8114](https://github.com/agentscope-ai/QwenPaw/issues/8114)
- 状态：Open
- 作者：hjgsv85jxm-svg
- 创建时间：2026-10-06
- 更新时间：2026-10-06
- 评论数：1
- 👍：0
- 类型：Enhancement / Feature Request

该 Issue 是今日唯一活跃讨论点。用户提出希望增加 **推理强度设定功能**，原因是某些模型，例如用户提到的 “3.8 这种模型”，在回答时“太爱思考”，希望能够对模型的思考深度或推理行为进行限制。

这一诉求背后反映出两个较明确的使用场景：

1. **降低响应成本与延迟**  
   推理型模型在复杂任务中可能会消耗更多 token 或响应时间，用户希望通过配置减少不必要的深度思考。

2. **控制输出风格与任务适配性**  
   并非所有场景都需要长链路推理。例如日常助手、客服、简单问答等场景，更需要快速、直接、简洁的回答。

该需求可能涉及模型参数、Provider 配置、Agent 策略或前端控制项，属于较有产品价值的能力扩展。

---

## 4. Bug 与稳定性

过去 24 小时内未发现新的 Bug、崩溃、回归或稳定性相关 Issue。

当前无以下类型报告：

- 运行时崩溃
- 模型调用失败
- 前端异常
- 配置错误
- 回归问题
- 已知 Bug 的修复 PR

因此，从今日数据看，项目稳定性暂无新增风险。但由于今日整体活跃度较低，不能仅凭一天数据判断项目长期稳定状态。

---

## 5. 功能请求与路线图信号

### #8114 增加推理强度控制

- 链接：[agentscope-ai/QwenPaw Issue #8114](https://github.com/agentscope-ai/QwenPaw/issues/8114)
- 类型：功能请求
- 当前状态：Open
- 相关 PR：暂无

该功能请求可能成为后续路线图中的一个配置能力增强方向。潜在实现方式包括：

1. **在模型配置中增加 reasoning effort / thinking budget 参数**
   - 例如支持 low / medium / high 等档位
   - 或支持 token budget、max reasoning tokens 一类的数值配置

2. **在前端 Console 中增加推理强度选择项**
   - 适合非技术用户直接调整模型行为
   - 可与不同 Provider 的能力做兼容映射

3. **在 Agent 或 Provider 层增加统一抽象**
   - 不同模型厂商对“推理强度”的参数名称和能力支持不同
   - 需要在后端做适配，避免前端直接绑定某一模型接口

4. **按场景配置默认推理策略**
   - 简单问答：低推理强度
   - 代码、数学、规划任务：高推理强度
   - 用户可覆盖默认策略

从当前数据看，该需求尚未出现对应 PR，因此短期内是否进入下一版本仍不明确。不过，该诉求与 AI 助手产品的可控性、成本优化和体验调优高度相关，具备较高的产品优先级讨论价值。

---

## 6. 用户反馈摘要

今日用户反馈主要集中在 **模型过度推理** 这一痛点上。

### 用户痛点

- 某些模型在普通任务中会进行过多思考。
- 用户希望能够限制推理强度，使输出更简洁、响应更快。
- 当前系统可能缺少对不同模型“思考行为”的统一控制入口。

### 使用场景推断

- 日常对话或简单任务不需要深度推理。
- 用户可能在使用较新的强推理模型时，发现默认行为不符合轻量任务需求。
- 在成本、速度、可控性之间，用户希望拥有自主调节权。

### 满意 / 不满意信号

- 不满意点：模型行为缺少可控性，尤其是“思考过多”的问题。
- 正向信号：用户不是要求替换模型，而是希望增加配置能力，说明其仍愿意继续使用项目，只是期待更细粒度的控制。

相关 Issue：

- [#8114 [Feature]: 希望能加上推理强度的设定功能](https://github.com/agentscope-ai/QwenPaw/issues/8114)

---

## 7. 待处理积压

本次数据未提供长期未响应的 Issue 或 PR，因此无法判断历史积压情况。

不过，今日新增的功能请求建议维护者关注：

- [#8114 增加推理强度设定功能](https://github.com/agentscope-ai/QwenPaw/issues/8114)

建议后续处理动作：

1. 确认该能力应归属的模块：Core / Backend、Console、Provider 配置或 Agent 策略。
2. 明确项目当前支持的模型供应商是否具备类似 `reasoning_effort`、`thinking_budget`、`max_reasoning_tokens` 等参数。
3. 将 Issue 补充标签，例如 `enhancement`、`model-config`、`provider`、`ux`。
4. 若短期不实现，可先提供文档说明或配置绕行方案。
5. 若计划实现，建议拆分为：
   - 后端 Provider 参数支持
   - 配置 schema 扩展
   - 前端控制项
   - 文档更新

---

## 项目健康度评估

| 维度 | 今日状态 | 评价 |
|---|---:|---|
| Issue 活跃度 | 1 条更新 | 偏低 |
| PR 活跃度 | 0 条 | 偏低 |
| Release 活跃度 | 0 个 | 无发布 |
| Bug 风险 | 0 条新增 Bug | 暂无新增风险 |
| 社区需求 | 1 条功能请求 | 有明确产品信号 |
| 维护推进 | 无合并 / 关闭动作 | 今日无代码进展 |

**综合判断：**  
CoPaw 今日整体活跃度较低，未出现代码合并或版本发布。社区侧唯一信号来自用户对“推理强度控制”的需求，这类需求与 AI 助手的体验、成本和可控性密切相关，值得维护者进一步澄清并评估是否纳入后续路线图。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报  
**日期：2026-10-07**  
**仓库：** [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## 1. 今日速览

过去 24 小时 ZeroClaw 活跃度较高：共有 **12 条 Issue 更新**、**21 条 PR 更新**，其中 **19 个 PR 仍待合并**，**2 个 PR 已关闭/完成处理**。  
今日工作重点集中在 **运行时稳定性、配置热更新、安全策略、插件/网关边界、ZeroCode 体验、成本控制** 等核心路径。  
从 Issue 与 PR 的对应关系看，多个新报 Bug 已经出现配套修复 PR，说明维护响应速度较快，项目处于高频迭代状态。  
不过，当前待合并 PR 数量较多，且涉及 runtime、gateway、security、config 等关键模块，短期内需要重点关注回归风险与 CI 压力。

---

## 2. 项目进展

今日已关闭/完成处理的 PR 主要为维护与流程类改动，功能性大 PR 多数仍在评审或等待合并。

### 已关闭 / 完成处理的 PR

#### #11574 docs(pr-template): keep labels in GitHub metadata  
链接：[PR #11574](https://github.com/zeroclaw-labs/zeroclaw/pull/11574)  
状态：CLOSED  
领域：文档、贡献流程、PR 模板

该 PR 调整了 PR 模板与评审协议：  
- 不再要求贡献者在 PR 正文中重复填写 GitHub labels。  
- 评审流程改为直接检查 GitHub 元数据中的 labels。  
- 降低 PR 提交时的重复劳动，减少模板噪音。

**项目推进意义：**  
这是一个轻量级但有价值的贡献者体验优化，有助于降低社区贡献门槛，并让评审信息来源更一致。

---

#### #11564 chore(deps): bump the rust-all group across 1 directory with 20 updates  
链接：[PR #11564](https://github.com/zeroclaw-labs/zeroclaw/pull/11564)  
状态：CLOSED  
领域：依赖维护

该 PR 是 Dependabot 发起的 Rust 依赖批量更新，包含 20 个包更新。今日已有新的替代 PR #11588 提出，因此 #11564 关闭大概率是被更新后的依赖批次取代。

相关新 PR：  
- [PR #11588](https://github.com/zeroclaw-labs/zeroclaw/pull/11588)

**项目推进意义：**  
依赖更新持续进行，但批量升级会带来兼容性与 CI 压力。建议维护者优先确认 #11588 是否完全覆盖 #11564，并确保安全补丁不被遗漏。

---

### 今日仍在推进的重要 PR

#### 成本控制与配置热更新

- [PR #11589](https://github.com/zeroclaw-labs/zeroclaw/pull/11589)  
  **feat(runtime): let the operator override an exceeded cost limit**  
  对应 Issue：[Issue #11585](https://github.com/zeroclaw-labs/zeroclaw/issues/11585)  
  该 PR 让 `cost.allow_override` 真正生效，使超过成本限制后可以由操作者授权继续，而不是只能重启 daemon。

- [PR #11587](https://github.com/zeroclaw-labs/zeroclaw/pull/11587)  
  **fix(runtime): apply config/set cost limits to the live cost tracker**  
  修复通过 `config/set` 修改成本限制后，daemon 内部 cost tracker 未同步更新的问题。

**推进意义：**  
这两项改动直接改善长时间运行 daemon 的可用性，减少“配置已变更但运行时未生效”的运维困扰。

---

#### 安全与文件访问控制

- [PR #11592](https://github.com/zeroclaw-labs/zeroclaw/pull/11592)  
  **feat(security): add glob patterns for file_read path filtering**  
  引入 `file_read` 路径 glob 过滤能力，使安全策略可以从“目录级允许”进一步收窄到“路径形状级允许”。

**推进意义：**  
这是对文件读取权限模型的重要增强，有助于降低 AI agent 在插件或工具调用时的越权读取风险。

---

#### Provider 与模型路由

- [PR #11584](https://github.com/zeroclaw-labs/zeroclaw/pull/11584)  
  **feat(providers): add Opper model provider**  
  对应 Issue：[Issue #11583](https://github.com/zeroclaw-labs/zeroclaw/issues/11583)  
  增加 Opper 作为 typed OpenAI-compatible provider。

- [PR #11577](https://github.com/zeroclaw-labs/zeroclaw/pull/11577)  
  **feat(runtime): run a subagent on an operator-declared model route**  
  允许 `spawn_subagent` 使用操作者声明的 `[[model_routes]]`，从而让子 agent 运行在指定 provider/model 上。

**推进意义：**  
ZeroClaw 正在强化多 provider、多模型、多 agent 编排能力，这对企业部署、成本分层和区域合规都很重要。

---

#### Gateway、插件与 RPC 边界

- [PR #11581](https://github.com/zeroclaw-labs/zeroclaw/pull/11581)  
  **fix(plugins): bound registry requests and split entry download**  
  为插件 registry 请求增加边界，避免插件搜索/安装因远端卡住而长期挂起。

- [PR #11576](https://github.com/zeroclaw-labs/zeroclaw/pull/11576)  
  **fix(rpc): sign TUI identities with the install key next to config.toml**  
  修复远程 RPC / WSS 场景下 TUI 身份签名失败的问题。

- [PR #11572](https://github.com/zeroclaw-labs/zeroclaw/pull/11572)  
  **fix(acp): surface plan persistence failures**  
  将 ACP plan 持久化失败通过 typed session update 暴露给 RPC 客户端，避免用户误以为只是空计划。

**推进意义：**  
这些改动共同强化了远程调用、插件安装、计划持久化等生产部署路径的可靠性与可观测性。

---

## 3. 社区热点

> 注：本次数据中 PR 评论数显示为 `undefined`，Issue 评论数普遍较低，因此以下热点主要依据 Issue 评论、PR 活跃度、影响范围和是否已有对应修复 PR 综合判断。

### 热点 1：成本限制触发后无法恢复

- Issue：[Issue #11585](https://github.com/zeroclaw-labs/zeroclaw/issues/11585)  
- PR：[PR #11589](https://github.com/zeroclaw-labs/zeroclaw/pull/11589)  
- PR：[PR #11587](https://github.com/zeroclaw-labs/zeroclaw/pull/11587)

用户反馈：  
一旦 session 触发 `cost.daily_limit_usd`，后续 turn 全部失败，必须提高限制并重启 daemon 才能恢复。这会中断所有活跃 session。

背后诉求：  
- 成本控制需要可恢复，而不是“一旦触发就进入不可用状态”。  
- 运维人员希望通过配置热更新或显式 override 继续服务，而不是重启 daemon。  
- 成本策略应具备 runtime 动态性。

健康度判断：  
该问题已有两个相关 PR 跟进，响应积极，是今日最明确的“Issue → Fix PR”链路之一。

---

### 热点 2：配置迁移与 schema_version 写入风险

- Issue：[Issue #11579](https://github.com/zeroclaw-labs/zeroclaw/issues/11579)

问题摘要：  
`Config::save_dirty` 在未完整迁移 V1/V2 配置体的情况下，直接写入 `schema_version = CURRENT_SCHEMA_VERSION`。下一次加载时会跳过迁移，导致 agent 消失。

背后诉求：  
- 配置保存逻辑需要避免“部分更新 + 版本戳提前升级”的状态污染。  
- 老用户升级路径必须稳健，尤其是已有 agent、provider、workspace 配置不能被隐式破坏。  

风险判断：  
这是配置层的高影响稳定性问题。当前数据中尚未看到明确对应 PR，建议维护者优先处理。

---

### 热点 3：Provider 扩展与 OpenAI-compatible 网关支持

- Issue：[Issue #11583](https://github.com/zeroclaw-labs/zeroclaw/issues/11583)  
- PR：[PR #11584](https://github.com/zeroclaw-labs/zeroclaw/pull/11584)

用户诉求：  
希望 ZeroClaw 增加 Opper 作为 typed provider。Opper 是 EU-hosted、OpenAI-compatible AI gateway，聚合多个模型和 provider。

背后信号：  
- 用户希望减少自定义 compatible provider 配置成本。  
- 区域合规、统一 API key、多模型聚合正在成为 ZeroClaw provider 层的重要需求。  
- typed provider 能提升文档可发现性与配置体验。

纳入下一版本可能性：高。  
已有对应 PR，且改动边界相对清晰，主要涉及 provider 注册、配置与文档。

---

### 热点 4：文件读取安全策略细粒度控制

- PR：[PR #11592](https://github.com/zeroclaw-labs/zeroclaw/pull/11592)

用户诉求：  
当前 `file_read` 只要通过目录级 allowlist，就可能读取目录下任意文件。用户希望进一步限制可读路径模式。

背后信号：  
AI agent 工具权限正在从粗粒度目录授权转向细粒度策略控制。尤其在企业环境中，路径 pattern、敏感文件排除、最小权限原则会越来越重要。

纳入下一版本可能性：中高。  
该 PR 已打开，但涉及 security policy，应重点审查兼容性与默认行为。

---

## 4. Bug 与稳定性

以下按严重程度与影响面排序。

### S2：firejail_args 被文档宣传但运行时未生效

- Issue：[Issue #11594](https://github.com/zeroclaw-labs/zeroclaw/issues/11594)  
- 状态：OPEN  
- 严重度：S2 - degraded behavior  
- 组件：config / runtime sandboxing  
- 是否已有 Fix PR：未在今日数据中看到明确对应 PR

问题：  
`firejail_args` 在文档与 config schema 中存在，但实际 firejail invocation 未使用它。

影响：  
- 用户以为自定义 sandbox 参数已经生效，但实际没有。  
- 可能造成安全策略与运行时行为不一致。  
- 对依赖 Firejail 做隔离强化的部署尤其敏感。

建议优先级：高。  
这是安全/沙箱配置语义不一致问题，建议尽快修复或临时更新文档说明。

---

### S2：成本限制触发后只能通过重启 daemon 清除

- Issue：[Issue #11585](https://github.com/zeroclaw-labs/zeroclaw/issues/11585)  
- 状态：OPEN  
- 严重度：S2 - degraded behavior  
- 组件：runtime / daemon  
- Fix PR：  
  - [PR #11589](https://github.com/zeroclaw-labs/zeroclaw/pull/11589)  
  - [PR #11587](https://github.com/zeroclaw-labs/zeroclaw/pull/11587)

问题：  
触发 `cost.daily_limit_usd` 后，后续 turn 持续失败；`cost.allow_override` 未被读取；配置热更新后 cost tracker 也未即时同步。

影响：  
- 长时间运行的 daemon 无法平滑恢复。  
- 重启会杀掉所有 live session。  
- 成本策略从保护机制变成可用性风险。

建议优先级：高。  
已有修复链路，应优先评审并补充回归测试。

---

### S2/S3：Config save_dirty 可能破坏老版本配置迁移

- Issue：[Issue #11579](https://github.com/zeroclaw-labs/zeroclaw/issues/11579)  
- 状态：OPEN  
- 组件：config migration  
- Fix PR：未在今日数据中看到明确对应 PR

问题：  
未迁移的 V1/V2 配置被 `save_dirty` 写上 V3 schema_version，导致下一次 load 跳过迁移，agent 消失。

影响：  
- 老用户升级路径受损。  
- 配置可能进入“看起来是新版本，实际是旧结构”的不一致状态。  
- 对 agent roster、provider、workspace 等关键配置有潜在破坏性。

建议优先级：高。  
这类问题需要 migration 回归测试，尤其要覆盖“只写 dirty path、不完整重写 config”的场景。

---

### S3：ZeroCode sidebar 在 daemon 重启后把失败 session 显示为绿色

- Issue：[Issue #11586](https://github.com/zeroclaw-labs/zeroclaw/issues/11586)  
- 状态：OPEN  
- 严重度：S3 - minor issue  
- 组件：ZeroCode  
- Fix PR：未在今日数据中看到明确对应 PR

问题：  
daemon 重启后，ZeroCode sidebar 中所有 session 都显示绿色 ready dot，包括此前失败的 session。

影响：  
- 状态展示不可信。  
- 用户可能误判失败任务已经恢复。  
- 属于 UI 状态恢复/持久化问题。

建议优先级：中。  
建议与 session status 持久化、hydration、daemon reconnect 行为一起梳理。

---

### 插件 registry 请求无超时，可能导致插件命令挂起

- PR：[PR #11581](https://github.com/zeroclaw-labs/zeroclaw/pull/11581)  
- 状态：OPEN  
- 组件：plugins / registry

问题：  
插件搜索与安装使用裸 `reqwest::get`，无 timeout。远端 registry 或 archive host 建连后不返回，会导致命令卡住。

影响：  
- CLI 用户体验差。  
- 自动化安装流程可能阻塞。  
- 第三方 registry 不稳定时问题明显。

Fix 状态：已有 PR，建议优先合并。

---

### 远程 RPC TUI 身份签名失败

- PR：[PR #11576](https://github.com/zeroclaw-labs/zeroclaw/pull/11576)  
- 状态：OPEN  
- 组件：daemon / runtime / RPC  
- 风险：medium

问题：  
远程 RPC / WSS 要求 signed TUI identities，但 daemon 从错误路径构建 `TuiRegistry`，导致远程 session 被拒绝。

影响：  
- 远程 RPC 用户可能完全无法建立会话。  
- 对分布式部署、远程 TUI、WSS 接入影响较大。

Fix 状态：已有 PR，建议优先评审。

---

## 5. 功能请求与路线图信号

### 1. 增加 Opper typed provider

- Issue：[Issue #11583](https://github.com/zeroclaw-labs/zeroclaw/issues/11583)  
- PR：[PR #11584](https://github.com/zeroclaw-labs/zeroclaw/pull/11584)

路线图信号：  
ZeroClaw provider 层正在继续扩展 typed providers，而不是完全依赖 generic OpenAI-compatible 配置。这说明项目重视开箱即用体验、文档化 provider 能力以及区域化部署需求。

纳入下一版本可能性：高。

---

### 2. CLI 授权拒绝信息本地化

- Issue：[Issue #11570](https://github.com/zeroclaw-labs/zeroclaw/issues/11570)

诉求：  
共享 authorization validators 返回的拒绝信息目前仍是英文。用户希望 localized CLI 能显示本地化错误。

路线图信号：  
ZeroClaw 的 i18n 范围正在从普通 CLI 文案扩展到共享验证器、权限拒绝、配置错误等核心交互路径。

纳入下一版本可能性：中。  
暂无对应 PR，但需求清晰，影响 CLI 可用性与国际化体验。

---

### 3. Standalone gateway scoped service identity

- Issue：[Issue #11569](https://github.com/zeroclaw-labs/zeroclaw/issues/11569)

诉求：  
为 standalone gateway 提供独立 service identity，并将权限限制在其转发的 channel instances 的 `channels:execute` 范围内。

路线图信号：  
Gateway 权限模型正在走向最小权限与显式身份隔离。这对安全边界、审计和多租户部署非常重要。

纳入下一版本可能性：中高。  
该需求与近期 gateway、RPC、本地/远程权限边界改动方向一致。

---

### 4. 保留 standalone gateway 的 `/plugin/{path}` 路径

- Issue：[Issue #11568](https://github.com/zeroclaw-labs/zeroclaw/issues/11568)

诉求：  
避免 `run_gateway` 对 `/plugin/{path}` 出现静默未路由行为。

路线图信号：  
Plugin gateway 路由行为需要在 standalone 与 daemon-backed 模式间保持一致，避免用户部署时遇到隐式差异。

纳入下一版本可能性：中。

---

### 5. OpenRPC schema 增强：plugin webhook dispatch 边界

- Issue：[Issue #11567](https://github.com/zeroclaw-labs/zeroclaw/issues/11567)

诉求：  
将 `plugin-webhook/dispatch` 的 method、request body、header、size 等 wire bounds 明确写入生成的 OpenRPC schema。

路线图信号：  
ZeroClaw 正在将隐含在文档或代码注释中的协议约束正式发布到机器可读 schema 中。这对 SDK、客户端生成、第三方集成很重要。

纳入下一版本可能性：中。

---

### 6. RPC local-only 方法统一分类并发布到 OpenRPC

- Issue：[Issue #11566](https://github.com/zeroclaw-labs/zeroclaw/issues/11566)

诉求：  
通过统一 helper 和 per-method classification 强制 “local IPC only”，并将该信息发布到 OpenRPC 文档。

路线图信号：  
RPC 安全边界正在从分散检查走向集中分类与文档化。  
这对远程 RPC 安全、客户端能力发现、权限审计都有价值。

纳入下一版本可能性：中高。

---

### 7. 每个 plugin channel instance 独立 webhook dedup budget

- Issue：[Issue #11565](https://github.com/zeroclaw-labs/zeroclaw/issues/11565)

诉求：  
当前 webhook dedup 使用共享预算，一个高流量插件可能挤掉其他插件的 live keys。用户希望按 plugin channel instance 分配预算。

路线图信号：  
插件系统开始面对真实多插件并发场景，需要更强的公平性与隔离性。

纳入下一版本可能性：中。

---

### 8. ZeroCode 支持拖拽 session rows

- PR：[PR #11573](https://github.com/zeroclaw-labs/zeroclaw/pull/11573)

诉求：  
用户希望在 Sessions panel 中拖拽排列 Chat 和 Code sessions。

路线图信号：  
ZeroCode 正在持续优化多 session 工作流体验，尤其是用户管理大量会话时的操作效率。

纳入下一版本可能性：中高。  
已有 PR，但涉及 UI 交互，需要注意状态同步与可访问性。

---

## 6. 用户反馈摘要

### 主要痛点 1：运行时配置与文档承诺不一致

代表问题：  
- `firejail_args` 文档存在但运行时未应用：[Issue #11594](https://github.com/zeroclaw-labs/zeroclaw/issues/11594)  
- `cost.allow_override` 文档存在但实际未读取：[Issue #11585](https://github.com/zeroclaw-labs/zeroclaw/issues/11585)

用户感受：  
用户已经根据文档配置了关键运行参数，但实际行为不符合预期。这类问题会降低对系统安全性和可控性的信任。

---

### 主要痛点 2：daemon 长时间运行时恢复能力不足

代表问题：  
- 成本限制触发后需要重启 daemon：[Issue #11585](https://github.com/zeroclaw-labs/zeroclaw/issues/11585)  
- config/set 后 live cost tracker 未更新：[PR #11587](https://github.com/zeroclaw-labs/zeroclaw/pull/11587)

用户场景：  
运维人员希望在线调整成本策略、恢复会话、避免中断已有 session。  
当前行为更像静态启动配置，不符合长期服务进程的运行预期。

---

### 主要痛点 3：升级与配置迁移需要更强保护

代表问题：  
- `save_dirty` 可能提前写入新 schema_version，导致老配置跳过迁移：[Issue #11579](https://github.com/zeroclaw-labs/zeroclaw/issues/11579)

用户场景：  
已有 ZeroClaw 用户升级版本后，希望原有 agent 和配置稳定保留。  
如果 migration 被跳过并导致 agent 消失，会被视为严重回归。

---

### 主要痛点 4：安全边界需要更细粒度、更可见

代表问题：  
- 文件读取 glob filtering：[PR #11592](https://github.com/zeroclaw-labs/zeroclaw/pull/11592)  
- RPC local-only schema 标注：[Issue #11566](https://github.com/zeroclaw-labs/zeroclaw/issues/11566)  
- gateway scoped service identity：[Issue #11569](https://github.com/zeroclaw-labs/zeroclaw/issues/11569)

用户场景：  
企业或安全敏感部署需要知道：  
- 哪些 RPC 方法只能本地调用；  
- gateway 使用什么身份连接 daemon；  
- 文件读取到底能读哪些路径；  
- 插件 webhook 的资源边界在哪里。

---

### 主要痛点 5：UI 状态与真实 session 状态不同步

代表问题：  
- ZeroCode sidebar 重启后把失败 session 显示为绿色：[Issue #11586](https://github.com/zeroclaw-labs/zeroclaw/issues/11586)  
- Web hydration 覆盖本地 in-flight prompt：[PR #11571](https://github.com/zeroclaw-labs/zeroclaw/pull/11571)

用户场景：  
用户在多会话、长任务、daemon 重启或 detached turn 场景下，需要 UI 准确反映真实状态。  
如果失败状态被错误恢复为 ready，或正在发送的 prompt 被 hydration 覆盖，会造成明显困惑。

---

## 7. 待处理积压

基于今日 24 小时数据，暂未看到“长期未响应”的历史 Issue/PR 数据；以下是当前仍处于 OPEN 且建议维护者优先关注的短期积压。

### 高优先级待处理

#### #11579 Config save_dirty 导致老配置跳过迁移  
链接：[Issue #11579](https://github.com/zeroclaw-labs/zeroclaw/issues/11579)  
原因：涉及配置迁移与 agent 消失，影响升级可靠性。  
建议：尽快补充 fix PR 与 migration 回归测试。

#### #11594 firejail_args 未应用到 firejail invocation  
链接：[Issue #11594](https://github.com/zeroclaw-labs/zeroclaw/issues/11594)  
原因：文档/schema 与实际 sandbox 行为不一致，涉及安全配置可信度。  
建议：优先修复实现；若短期无法修复，应先更新文档避免误导。

#### #11585 成本限制触发后恢复困难  
链接：[Issue #11585](https://github.com/zeroclaw-labs/zeroclaw/issues/11585)  
相关 PR：  
- [PR #11589](https://github.com/zeroclaw-labs/zeroclaw/pull/11589)  
- [PR #11587](https://github.com/zeroclaw-labs/zeroclaw/pull/11587)  
原因：影响 daemon 长时间运行场景。  
建议：优先评审并合并相关 PR。

---

### 中优先级待处理

#### #11586 ZeroCode sidebar 状态恢复错误  
链接：[Issue #11586](https://github.com/zeroclaw-labs/zeroclaw/issues/11586)  
原因：UI 状态可信度问题。  
建议：与 session 状态持久化和 daemon reconnect 流程一起处理。

#### #11580 Linux release binary 接近 64 MiB size cap  
链接：[Issue #11580](https://github.com/zeroclaw-labs/zeroclaw/issues/11580)  
原因：x86_64 Linux release binary 距离 64 MiB 硬限制仅约 0.7 MB。  
建议：尽快决定是提高阈值、制定 headroom policy，还是进行瘦身，否则下一次 release 可能被 size gate 阻断。

#### #11566 RPC local-only gate 统一与 OpenRPC 发布  
链接：[Issue #11566](https://github.com/zeroclaw-labs/zeroclaw/issues/11566)  
原因：远程 RPC 安全边界需要集中化和文档化。  
建议：与 gateway identity、OpenRPC schema 增强一起规划。

---

## 总体健康度评估

ZeroClaw 今日表现为 **高活跃、高并发迭代、维护响应较快**。多个新报 Bug 已有对应 PR，说明维护链路健康；同时，PR 积压较多且集中在 runtime、security、gateway、config 等关键模块，合并前需要严格回归测试。  

当前最值得关注的风险有三类：  
1. **配置与运行时状态不一致**：如 cost tracker、schema migration、firejail_args。  
2. **安全边界显式化不足**：如 file_read、RPC local-only、gateway identity。  
3. **长运行服务可恢复性**：如 cost override、daemon 重启后的 UI/session 状态。  

若今日打开的 runtime/config/security 修复能顺利合并，ZeroClaw 下一版本在稳定性、企业部署可控性和多 provider 能力上会有明显提升。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*