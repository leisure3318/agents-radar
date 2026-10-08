# OpenClaw 生态日报 2026-10-08

> Issues: 7 | PRs: 27 | 覆盖项目: 13 个 | 生成时间: 2026-10-08 05:03 UTC

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
**日期：2026-10-08**  
**仓库：** https://github.com/openclaw/openclaw

---

## 1. 今日速览

过去 24 小时 OpenClaw 保持高活跃度：共有 **7 条 Issue 更新**、**27 条 PR 更新**，并发布了 **1 个 beta 热修复版本 v2026.10.1-beta.2**。  
今日工作重心明显集中在 **Gateway / Agent 会话状态、命令停止语义、Doctor 诊断修复、SQLite 状态与升级兼容性、子 Agent 恢复与消息交付** 等稳定性议题上。  
从标签看，P1/P2 问题占比较高，且多个 PR 标注为 `proof: sufficient` 或 `ready for maintainer look`，说明修复推进较快，但仍有不少变更涉及兼容性、安全边界或消息投递风险，需要维护者审慎合并。  
整体来看，项目处于 **高强度修复与 beta 稳定化阶段**，健康度良好，但当前风险集中在状态机一致性、跨版本迁移、Gateway 调度与通道消息体验。

---

## 2. 版本发布

### v2026.10.1-beta.2：openclaw 2026.10.1-beta.2

- Release 链接：  
  https://github.com/openclaw/openclaw/releases/tag/v2026.10.1-beta.2

本次发布是相对 `v2026.10.1-beta.1` 的 **beta 热修复版本**，覆盖中间约 **40 个 commits**，并非完整的 10 月累计发布说明重发。

#### 主要更新方向

根据 release 摘要，本次 beta 重点包括：

- 更新与文档修正；
- 对 2026.10.1 beta 线上的问题进行热修；
- 继续推进 Gateway、Agent、Doctor、状态管理等子系统的稳定化。

#### 破坏性变更

当前提供的数据中未明确列出破坏性变更。  
但从今日 PR 活动看，以下领域存在潜在兼容性风险，应作为升级观察重点：

- 状态 schema 与跨版本升级 / 降级行为；
- Gateway 与 Doctor 对 SQLite 状态的读写方式；
- 插件目录捕获与外部 plugin dependency 处理；
- Tailscale / Serve / Funnel Gateway 启动诊断；
- 通道消息投递与命令停止行为。

#### 迁移与升级注意事项

建议 beta 用户重点关注：

1. **状态数据库兼容性**  
   与升级路径相关的 PR 较多，尤其是 `2026.9.9` 与 10 月 beta 之间的 schema 兼容。  
   相关 PR：  
   - https://github.com/openclaw/openclaw/pull/166959  
   - https://github.com/openclaw/openclaw/pull/166963

2. **Doctor / Gateway 诊断结果变化**  
   Doctor 对 Gateway、Tailscale、service repair、state repair 的提示逻辑正在调整，升级后诊断输出可能更严格、更具体。  
   相关 PR：  
   - https://github.com/openclaw/openclaw/pull/166947  
   - https://github.com/openclaw/openclaw/pull/166948  
   - https://github.com/openclaw/openclaw/pull/166950

3. **Agent 停止与唤醒行为**  
   今日有 P1 级 Issue 和修复 PR，涉及 stopped agent command 后续 heartbeat wake 无法正确触发模型请求的问题。  
   相关 Issue / PR：  
   - https://github.com/openclaw/openclaw/issues/166952  
   - https://github.com/openclaw/openclaw/pull/166968

---

## 3. 项目进展

今日 PR 更新共 **27 条**，其中 **19 条仍待合并**，**8 条已关闭或完成处理**。整体推进主要集中在稳定性、状态一致性、诊断体验和 release validation。

### 重要已关闭 / 已处理 PR

#### 1. 停止 yielded commands 与 Gateway request 生命周期绑定

- PR：fix: stop yielded commands with their Gateway request  
- 链接：https://github.com/openclaw/openclaw/pull/166753  
- 状态：Closed  
- 优先级：P1  
- 影响范围：Web UI、Gateway、Agents、Docs  
- 评级：🦞 diamond lobster

该 PR 解决了用户停止 Gateway request 后，已经 yield 出去的命令仍可能继续运行的问题。  
这对浏览器端体验尤其关键，因为用户点击 Stop 后预期所有相关执行都应停止，否则后续命令完成通知会造成状态混乱。

项目推进意义：  
- 强化 Stop 语义；
- 减少“用户以为已停止，但后台仍在执行”的风险；
- 为后续通道 `/stop` 行为统一奠定基础。

---

#### 2. Channel `/stop` 停止 yielded commands

- PR：fix: stop yielded commands from channel /stop  
- 链接：https://github.com/openclaw/openclaw/pull/166764  
- 状态：Closed  
- 优先级：P1  
- 影响范围：Agents、Docs、Telegram E2E  
- 评级：🦐 gold shrimp

该 PR 处理通道场景下 `/stop` 只终止 reply、但未终止底层 shell command 的问题。  
这直接影响 Telegram / Discord 等外部通道中用户对“停止”的信任感。

项目推进意义：  
- 通道 stop 行为与 Gateway request stop 行为进一步对齐；
- 降低命令泄露、后台残留进程和误投递通知风险；
- 增强机器人通道的可控性。

---

#### 3. Release validation 修复与诊断保留

- PR：fix(release): address 2026.9.9 validation failures and retain diagnostics  
- 链接：https://github.com/openclaw/openclaw/pull/166962  
- 状态：Closed  
- 优先级：P2  
- 评级：🦞 diamond lobster

该 PR 针对 `2026.9.9` release validation 中的三个失败点进行处理，并保留未解决 Bun 失败的诊断信息。

项目推进意义：  
- 提升 release 分支验证透明度；
- 为后续解决 Bun 环境问题保留上下文；
- 减少发布过程中“失败但不可复现 / 不可诊断”的情况。

---

#### 4. 移除 2026.9.9 中的 thread-allocation 测试

- PR：chore(release): remove thread-allocation test from 2026.9.9  
- 链接：https://github.com/openclaw/openclaw/pull/166967  
- 状态：Closed  
- 优先级：未标 P 级  
- 影响范围：Release validation

该 PR 按维护者指示从紧急 `2026.9.9` release branch 中移除失败的 physical-thread allocation regression test。

项目推进意义：  
- 降低紧急发布阻塞；
- 明确这是测试覆盖移除，不涉及生产行为；
- 但也意味着该回归点仍需在后续版本中补回验证。

---

#### 5. Recovery store 测试中的 retention race 修复

- PR：fix: prevent retention races in recovery store tests  
- 链接：https://github.com/openclaw/openclaw/pull/166960  
- 状态：Closed  
- 优先级：P3  
- 评级：🦐 gold shrimp

该 PR 修复 recovery-store 测试中因自动 session retention 修改 fixture payload 而导致的间歇性清理失败。

项目推进意义：  
- 提升测试稳定性；
- 无用户可见行为变化；
- 有助于降低 CI flakiness。

---

#### 6. Broker tests 与支持的 transports 对齐

- PR：refactor(process): align broker tests with supported transports  
- 链接：https://github.com/openclaw/openclaw/pull/166858  
- 状态：Closed  
- 优先级：P3  
- 影响范围：Gateway、Agents  
- 评级：🦐 gold shrimp

该 PR 移除了测试中不必要的运行时排除，使更多 broker process 测试可以在 Bun 测试选择中运行。

项目推进意义：  
- 扩大 Bun 运行时覆盖；
- 改善 runtime compatibility 验证；
- 无用户可见行为变更。

---

#### 7. Runtime bookkeeping 重构

- PR：refactor(agents): consolidate runtime bookkeeping  
- 链接：https://github.com/openclaw/openclaw/pull/166954  
- 状态：Closed  
- 优先级：P3  
- 影响范围：Agents  
- 标签：security-sensitive-changed

该 PR 统一了 Agent sessions、CLI execution、harness、sandbox filesystem、managed worktrees 中重复的 runtime 操作。

项目推进意义：  
- 降低重复代码；
- 改善内部维护性；
- 涉及安全敏感变更，需要关注后续回归。

---

## 4. 社区热点

### 热点 1：Bun 环境下 gateway-methods OOM

- Issue：CI: gateway-methods hits host OOM on Bun 667c; Node control passes  
- 链接：https://github.com/openclaw/openclaw/issues/166670  
- 状态：Open  
- 评论数：3  
- 优先级：P2  
- 评级：🦪 silver shellfish

这是今日评论数最高的 Issue。问题表现为 Gateway methods 在 source-owned Bun pin 下耗尽 Linux qualification host 内存，而 Node 对照组通过。

背后诉求：

- 维护者需要判断这是 Bun runtime 问题、测试资源配置问题，还是 Gateway methods 本身存在内存放大；
- 由于 Node control passes，说明问题可能集中在 Bun 路径；
- 对 OpenClaw 这种依赖多运行时验证的项目而言，Bun 稳定性会直接影响 CI 可信度与 release gate。

当前状态：

- 尚无 fix PR；
- 标签显示 `needs-maintainer-review`，需要维护者确认是否重放 Bun run、调整 admission 策略或继续隔离。

---

### 热点 2：Stopped agent command 阻塞后续 heartbeat wake

- Issue：https://github.com/openclaw/openclaw/issues/166952  
- PR：https://github.com/openclaw/openclaw/pull/166968  
- 状态：Issue Open，PR Open  
- 评论数：2  
- 优先级：P1  
- 评级：🦞 diamond lobster

问题表现为显式停止 agent command 后，后续独立 heartbeat wake 被接受，但没有触发新的 model request。  
这是典型的 session-state 残留 claim 问题，影响 Agent 从停止状态恢复。

背后诉求：

- 用户希望 Stop 是一次性动作，不应污染后续独立唤醒；
- 系统需要在 stopped run settle 后正确释放 source / delivery claim；
- Agent lifecycle 与 recovery admission 需要更精确地区分“已停止的旧执行”和“新的唤醒请求”。

当前已有对应修复 PR：  
https://github.com/openclaw/openclaw/pull/166968

---

### 热点 3：Subagent completion 因 requester authority 被撤销而永久失败

- Issue：Subagent completion delivery fails permanently when the requester authority is revoked, and no revoke reason is logged  
- 链接：https://github.com/openclaw/openclaw/issues/166964  
- 状态：Open  
- 评论数：2  
- 优先级：P2  
- 评级：🐚 platinum hermit

问题表现为父 session 等待子 subagent 完成时，如果 requester operator authority 后续被撤销，child completion delivery 会永久失败，父 session 卡在 waiting state。

背后诉求：

- 子 Agent 完成结果需要有可靠的投递与失败恢复策略；
- 权限撤销应记录 revoke reason，便于诊断；
- 父 session 不应因为权限变化进入不可恢复等待。

相关可能 PR：  
- https://github.com/openclaw/openclaw/pull/166845  
该 PR 处理 subagent recovery、announcement、cleanup 选择错误 owner session 的问题，虽不一定直接关闭 #166964，但方向相关。

---

### 热点 4：Doctor / Gateway / State 修复体验集中改进

相关 PR：

- Interactive Doctor repairs race a managed Gateway  
  https://github.com/openclaw/openclaw/pull/166948
- Doctor misses configured Tailscale startup prerequisites  
  https://github.com/openclaw/openclaw/pull/166947
- Doctor service repair promises defaults it cannot apply  
  https://github.com/openclaw/openclaw/pull/166950
- State written by newer release 的只读状态检查与一致建议  
  https://github.com/openclaw/openclaw/pull/166963

背后诉求：

- 用户遇到 Gateway 启动、Tailscale backend、SQLite state、service repair 时，希望 Doctor 给出明确、可执行且不自相矛盾的建议；
- 维护者正在把 Doctor 从“检测工具”推进为更可靠的“操作员辅助修复工具”；
- 多个 PR 带有 compatibility 或 auth-provider 风险，说明这部分改动容易影响已有安装。

---

## 5. Bug 与稳定性

以下按严重程度和影响范围排序。

### P1：Stopped agent command 阻塞后续 heartbeat wake

- Issue：https://github.com/openclaw/openclaw/issues/166952  
- 修复 PR：https://github.com/openclaw/openclaw/pull/166968  
- 严重程度：P1  
- 影响：session-state、Agent 唤醒、模型请求调度  
- 状态：Issue Open，PR Open，等待维护者查看

问题摘要：  
显式停止一个 agent command 后，后续 heartbeat wake 虽然被接受，但没有触发新的模型请求。session 仍保留 stopped run 的 source / delivery claim。

风险判断：  
这是高优先级状态机问题，会导致用户认为系统“已唤醒但无响应”。已有 PR，修复路径明确。

---

### P2：Subagent completion 投递在权限撤销后永久失败

- Issue：https://github.com/openclaw/openclaw/issues/166964  
- 严重程度：P2  
- 影响：session-state、message-loss、subagent completion delivery  
- 状态：Open，暂无明确 fix PR

问题摘要：  
父 session 等待子 subagent 运行结果时，若 requester authority 被撤销，完成消息无法投递且父 session 永久等待；同时缺少 revoke reason 日志。

风险判断：  
该问题影响多 Agent 协作可靠性，尤其在权限动态变化或多 operator 场景下可能造成任务悬挂。

---

### P2：Gateway-methods 在 Bun 下导致 CI host OOM

- Issue：https://github.com/openclaw/openclaw/issues/166670  
- 严重程度：P2  
- 影响：CI、Bun runtime validation、release qualification  
- 状态：Open，无 fix PR

问题摘要：  
Bun 运行 gateway-methods 测试时导致 Linux qualification host 内存耗尽，而 Node 对照通过。

风险判断：  
若无法稳定复现或隔离，将持续影响 Bun 兼容性验证与 release 可信度。

---

### P2：Wrapped node policy denial 丢失 fatal cron outcome 和结构化诊断

- Issue：https://github.com/openclaw/openclaw/issues/166763  
- 严重程度：P2  
- 影响：cron agent、remote-node policy denial、诊断完整性  
- 状态：Open，暂无明确 fix PR

问题摘要：  
Gateway 将 native `SYSTEM_RUN_DENIED` 包装为 `UNAVAILABLE` 后，cron agent turn 可能丢失 fatal outcome，持久化诊断也可能丢失 tool name 与 code。

风险判断：  
该问题不会直接导致崩溃，但会降低策略拒绝场景下的可观测性与用户可操作性，尤其影响安全与自动化任务排错。

---

### P2：Owner-gated plugin factories 导致 deferred tool directory 抖动

- Issue：https://github.com/openclaw/openclaw/issues/166969  
- 严重程度：P2  
- 影响：plugin tool visibility、安全边界、session consistency  
- 状态：Open，暂无 fix PR  
- 标签：needs-security-review、needs-product-decision

问题摘要：  
配置了 owner-gated plugin tools 后，在非 owner turn 中 deferred tool directory 会消失，下一次 owner turn 又恢复。

风险判断：  
该问题涉及安全边界和工具可见性一致性。直接工具列表可能不受影响，但 deferred tool directory 的抖动会影响插件生态稳定性和用户预期。

---

### P2：Doctor / Gateway 诊断与修复相关稳定性问题

多个 PR 正在修复：

- Gateway startup 与 Doctor repair race：  
  https://github.com/openclaw/openclaw/pull/166948
- Tailscale startup prerequisite 未突出展示：  
  https://github.com/openclaw/openclaw/pull/166947
- Service repair 承诺无法应用的 defaults：  
  https://github.com/openclaw/openclaw/pull/166950
- OAuth recovery observations 阻塞 Gateway thread：  
  https://github.com/openclaw/openclaw/pull/166936

风险判断：  
这些问题主要影响操作员诊断体验和 Gateway 启动可靠性。PR 多数已处于 ready for maintainer look，短期内进入 beta 的可能性较高。

---

## 6. 功能请求与路线图信号

### 1. iPhone / iPad 前台推理 worker

- Issue：[Feature]: Opt-in foreground inference workers on iPhone and iPad  
- 链接：https://github.com/openclaw/openclaw/issues/166970  
- 优先级：P3  
- 状态：Open  
- 标签：needs-product-decision

用户建议为 iPhone / iPad 节点增加可选的前台推理能力，初期从有边界的文本 embeddings 开始。用户希望：

- App 已打开时，可以提交任务，无需每个 job 都手动点击手机；
- 在系统中看到该设备按模型划分的可用性；
- 该能力是 opt-in 且 foreground-only，降低后台执行和平台政策风险。

路线图信号：  
这是明显的边缘设备 / 移动节点方向需求，但当前标签显示需要产品决策，短期进入下个版本的概率不高。若后续出现 design doc 或 prototype PR，可能成为 OpenClaw 本地 / 边缘推理能力的重要演进方向。

---

### 2. 插件在工具执行前检查 assistant-message tool-call batches

- Issue：[Feature]: Expose assistant-message tool-call batches to plugins before execution  
- 链接：https://github.com/openclaw/openclaw/issues/166958  
- 优先级：P3  
- 状态：Open  
- 标签：needs-product-decision

用户希望插件能在工具执行前看到同一 assistant message 中的所有 tool calls，以便执行跨工具约束，例如要求某个 final-response tool 必须单独调用。

路线图信号：  
这反映插件系统正在从“单工具扩展”走向“工具批次策略控制”。该需求与安全策略、structured response、agent guardrail 密切相关。短期可能需要 API 设计，不太可能直接进入 hotfix，但值得作为插件平台能力规划。

---

### 3. CoreWeave Inference 进入 provider setup

- PR：feat: offer CoreWeave Inference in provider setup  
- 链接：https://github.com/openclaw/openclaw/pull/166965  
- 状态：Open  
- 优先级：P3  
- 标签：needs proof、security-boundary

该 PR 提议在 OpenClaw 初始 provider setup 中提供 CoreWeave Inference。当前 CoreWeave Inference 已可作为外部 ClawHub plugin 使用，但新用户需要自行发现和配置。

路线图信号：  
这说明 OpenClaw 可能继续扩展默认 provider onboarding。由于涉及外部 provider 与安全边界，短期是否进入版本取决于 proof 和维护者安全审查。

---

### 4. Telegram / Discord 默认进度展示增强

- PR：improve: show useful Telegram and Discord progress by default  
- 链接：https://github.com/openclaw/openclaw/pull/166861  
- 状态：Open  
- 优先级：P2  
- 标签：proof: telegram-e2e、proof: screenshot、ready for maintainer look

该 PR 改善长任务在 Telegram / Discord 中的默认进度提示，避免用户只看到 “Working” 或完全没有 preview。

路线图信号：  
这是用户体验层面的强信号，且已有 E2E 证明与截图，进入后续 beta / minor release 的概率较高。

---

## 7. 用户反馈摘要

从今日 Issues 和 PR 描述中可以提炼出以下用户痛点与使用场景。

### 1. 用户强烈依赖 Stop 语义的可靠性

相关链接：

- https://github.com/openclaw/openclaw/issues/166952  
- https://github.com/openclaw/openclaw/pull/166753  
- https://github.com/openclaw/openclaw/pull/166764  
- https://github.com/openclaw/openclaw/pull/166968

痛点：  
用户点击 Stop 或在通道中发送 `/stop` 后，期望所有相关命令、模型请求和后续通知都立即进入一致的停止状态。当前多个问题都指向：停止请求可能终止了表层 reply，但底层命令、session claim 或后续 wake 状态仍有残留。

用户不满意点：

- 停止后命令仍运行；
- 停止后后续 heartbeat wake 不触发；
- 通道中 Stop 与 Gateway Stop 体验不一致。

---

### 2. 操作员需要 Doctor 给出明确、可信、不会互相矛盾的修复建议

相关链接：

- https://github.com/openclaw/openclaw/pull/166947  
- https://github.com/openclaw/openclaw/pull/166948  
- https://github.com/openclaw/openclaw/pull/166950  
- https://github.com/openclaw/openclaw/pull/166963

痛点：  
OpenClaw 部署涉及 Gateway、SQLite 状态、Tailscale、service runtime、source checkout entrypoint 等多个层面。用户希望 Doctor 能准确说明：

- 当前失败是 Tailscale backend 未启动、未登录、待审批还是不可用；
- repair 会实际改变什么；
- state 由更新版本写入时，应升级、回滚还是只读查看；
- 不要在 status read 过程中产生 SQLite sidecar 等额外写入。

用户不满意点：

- 诊断建议不够 actionable；
- 修复承诺与实际可应用动作不一致；
- 跨版本状态读取给出矛盾建议。

---

### 3. 多 Agent / Subagent 场景对消息交付和权限变化更敏感

相关链接：

- https://github.com/openclaw/openclaw/issues/166964  
- https://github.com/openclaw/openclaw/pull/166845  
- https://github.com/openclaw/openclaw/pull/166971

痛点：  
当系统存在 parent session、child subagent、operator authority、node approval 等复杂交互时，用户希望任务完成消息不会因为权限变更、owner 记录或 deadline race 永久丢失。

用户不满意点：

- 父 session 永久等待；
- 完成投递失败但没有足够 revoke reason；
- approval 明明发生在 deadline 前，却可能因 dispatch 跨过 deadline 被判 expired。

---

### 4. 通道用户希望长任务有更好的进度反馈

相关链接：

- https://github.com/openclaw/openclaw/pull/166861

痛点：  
Telegram / Discord 中长任务如果只显示 “Working” 或无 preview，用户无法判断系统是否还在执行、卡住，还是已进入子任务。

用户诉求：

- 默认展示有用进度；
- 显示当前 operation 或 delegated task；
- 减少通道使用中的不确定感。

---

## 8. 待处理积压

由于本日报只覆盖过去 24 小时数据，无法完整判断“长期未响应”的 Issue 或 PR。不过从当前状态看，以下项目已经具备较高关注价值，建议维护者优先处理。

### 需要维护者 Review 的高优先级 PR

1. **P1：允许 stopped agent command 后续 wake 正常触发**  
   - PR：https://github.com/openclaw/openclaw/pull/166968  
   - 对应 Issue：https://github.com/openclaw/openclaw/issues/166952  
   - 建议优先级：最高  
   - 原因：直接影响 Agent 从停止状态恢复，已有明确 fix。

2. **P2：Subagent owner reconciliation 与 cleanup**  
   - PR：https://github.com/openclaw/openclaw/pull/166845  
   - 建议优先级：高  
   - 原因：与 subagent recovery、owner 记录和 cleanup 正确性相关，可能缓解多 Agent 状态问题。

3. **P2：Preserve live node approval handoffs**  
   - PR：https://github.com/openclaw/openclaw/pull/166971  
   - 建议优先级：高  
   - 原因：修复 approval 在 deadline 前完成但 dispatch 后被判 expired 的问题，影响 operator trust。

4. **P2：Retain integrity proof across startup admission**  
   - PR：https://github.com/openclaw/openclaw/pull/166972  
   - 建议优先级：中高  
   - 原因：避免 clean shutdown 后重复全量 integrity / foreign-key scan，改善启动体验。

---

### 需要产品 / 安全决策的 Issue

1. **Owner-gated plugin factories tool directory 抖动**  
   - Issue：https://github.com/openclaw/openclaw/issues/166969  
   - 标签：needs-security-review、needs-product-decision  
   - 建议：尽快明确 owner-gated tools 在 deferred directory 中的期望可见性模型。

2. **iPhone / iPad foreground inference workers**  
   - Issue：https://github.com/openclaw/openclaw/issues/166970  
   - 标签：needs-product-decision  
   - 建议：需要产品层面明确移动端节点是否进入推理 worker 路线图。

3. **Plugin pre-execution tool-call batch API**  
   - Issue：https://github.com/openclaw/openclaw/issues/166958  
   - 标签：needs-product-decision  
   - 建议：可进入插件 API 设计讨论，尤其适合与 guardrail / policy enforcement 方向合并评估。

---

### 需要 Proof 或补充验证的 PR

1. **插件 capture 性能优化**  
   - PR：https://github.com/openclaw/openclaw/pull/166955  
   - 状态：needs proof  
   - 风险：涉及 plugin tree capture 与 dependency resources，需确认不丢资源。

2. **2026.9.9 升级保持 schema 19**  
   - PR：https://github.com/openclaw/openclaw/pull/166959  
   - 状态：needs proof  
   - 风险：compatibility、message-delivery、security-boundary  
   - 建议：必须覆盖稳定版到 hotfix、beta 到旧版的状态迁移矩阵。

3. **CoreWeave Inference provider setup**  
   - PR：https://github.com/openclaw/openclaw/pull/166965  
   - 状态：needs proof  
   - 风险：external provider、安全边界  
   - 建议：补充 setup UX、失败路径和凭据处理验证。

4. **Gemini switch proof 中展示 sanitized provider errors**  
   - PR：https://github.com/openclaw/openclaw/pull/166957  
   - 状态：needs proof  
   - 建议：补充 provider error 字段脱敏验证，避免泄露敏感信息。

---

## 总体健康度评估

OpenClaw 今日表现为 **高活跃、高修复密度、风险集中但响应迅速**。  
维护者和贡献者正在快速处理 beta 阶段暴露出的状态机、消息投递、Doctor 诊断和 release validation 问题。P1 问题已有对应 PR，多个 P2 PR 已处于 ready for maintainer look，说明项目响应速度较好。  
主要风险在于：当前多个改动涉及 **兼容性、安全边界、状态 schema、消息投递和 Gateway 调度**，短期内需要严格 proof、E2E 和跨版本验证。  
如果今日待审 PR 能顺利合并，OpenClaw 的 2026.10 beta 线稳定性预计会有明显提升。

---

## 横向生态对比

# AI 智能体 / 个人 AI 助手开源生态横向对比报告  
**日期：2026-10-08**

---

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态整体呈现出 **“高活跃项目加速修复、低活跃项目维持维护、核心风险集中在状态一致性与运行时可靠性”** 的态势。OpenClaw、Hermes Agent、CoPaw/QwenPaw、ZeroClaw 仍是今日最活跃的项目，Issues 和 PR 均集中在 Gateway、Agent session、消息队列、Provider fallback、Desktop/TUI 体验等关键路径。  
从技术主题看，多个项目都在从“能运行”走向“长时间稳定运行”：停止语义、恢复机制、消息投递、队列背压、跨版本状态迁移、Doctor/诊断工具成为共同焦点。  
同时，生态也在向更复杂的个人 AI 助手形态演进：Computer Use、本地账号接入、长期记忆、移动端推理、MCP/插件生态、通道机器人体验等方向均有明显信号。  
整体判断：生态仍处于快速迭代期，但成熟项目已经开始暴露 **状态机、权限、安全边界、数据一致性、更新体验** 等生产级问题。

---

## 2. 各项目活跃度对比

> 注：Issues / PR 数为过去 24 小时摘要中提供的更新数量或明确活动数量。

| 项目 | Issues 更新 | PR 更新 | Release | 今日重点 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 7 | 27 | **v2026.10.1-beta.2** | Gateway/Agent 状态、Doctor、SQLite schema、Stop 语义、Subagent delivery | **高活跃，beta 稳定化中；响应快但状态机风险高** |
| **NanoBot** | 0 | 13 | 无 | WebUI、文档读取、Memory、MCP/App、Computer Use | **工程推进健康；Issue 噪音低，PR 质量较集中** |
| **Hermes Agent** | 50 | 50 | 无 | Session persistence、Desktop update、Cron、SQLite、插件、TUI/Gateway | **极高活跃但承压；P1/P2 积压明显** |
| **PicoClaw** | 0 | 0 | 无 | 无活动 | **静默 / 低维护状态** |
| **NanoClaw** | 0 | 1 | 无 | Channel adapter setup 失败后自恢复 | **低活跃，但有关键稳定性修复待合并** |
| **NullClaw** | 0 | 1 | 无 | Gateway inbound bus 满载阻塞 accept loop | **低活跃；单点稳定性风险值得关注** |
| **IronClaw** | 0 | 1 | 无 | Dependabot 升级 urllib3 | **低风险维护状态** |
| **LobsterAI** | 0 | 5 | 无 | OpenClaw 集成、Skills 删除安全、Cowork UI、Prompt 注入 | **中等活跃；安全和桌面体验改善明显** |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | **静默状态** |
| **Moltis** | 0 | 0 | 无 | 无活动 | **静默状态** |
| **CoPaw / QwenPaw** | 6 | 4 | 无 | Desktop beta 稳定性、消息队列、Provider fallback、Creator | **活跃修复期；beta4 稳定性压力较大** |
| **ZeptoClaw** | 0 | 0 | 无 | 无活动 | **静默状态** |
| **ZeroClaw** | 3 | 13 | 无 | 配置安全、Telegram listener、Native onboarding、Provider routing | **高开发活跃但无合并落地；安全/配置风险偏高** |

### 活跃度分层

| 层级 | 项目 | 特征 |
|---|---|---|
| **极高活跃 / 高压力** | Hermes Agent | Issue/PR 双 50，功能面广，但 P1/P2 问题多 |
| **高活跃 / 稳定化阶段** | OpenClaw、ZeroClaw、CoPaw | 大量 PR 和高优先级 Bug，处于快速修复与架构调整期 |
| **中等活跃 / 产品打磨** | NanoBot、LobsterAI | PR 推进集中，用户体验、安全、文档/文件读取改善明显 |
| **低活跃 / 单点维护** | NanoClaw、NullClaw、IronClaw | 今日仅有 1 个 PR，偏维护或稳定性修复 |
| **静默** | PicoClaw、TinyClaw、Moltis、ZeptoClaw | 过去 24 小时无活动 |

---

## 3. OpenClaw 在生态中的定位

### 3.1 定位概括

OpenClaw 当前处于生态中的 **核心参照项目** 地位：活跃度高、子系统复杂、发布节奏快，且其问题集中在 Gateway、Agent session、Doctor、SQLite state、Subagent、Channel 等智能体基础设施核心层。相比多数项目，OpenClaw 更像一个完整的 **Agent runtime / Gateway / 多通道 / 状态管理平台**，而不仅是桌面壳、聊天前端或插件集合。

### 3.2 与同类项目相比的优势

| 维度 | OpenClaw 表现 | 对比观察 |
|---|---|---|
| **发布节奏** | 今日发布 `v2026.10.1-beta.2` | 多数项目今日无 Release；OpenClaw 发布机制更活跃 |
| **稳定化响应速度** | P1 Issue 已有 PR，多个 PR ready for maintainer look | 响应速度优于 ZeroClaw、CoPaw 部分未有修复 PR 的问题 |
| **诊断体系** | Doctor/Gateway/Tailscale/SQLite repair 持续优化 | 明显强于多数项目，接近生产运维工具方向 |
| **状态管理深度** | schema 迁移、state readonly、recovery、delivery claim 均有处理 | 比 NanoBot/LobsterAI 更底层，和 Hermes/ZeroClaw 属同级复杂度 |
| **多通道支持** | Gateway、Telegram、Discord、Channel `/stop` | 与 Hermes、CoPaw、NullClaw 类似，但今日修复更集中 |

### 3.3 技术路线差异

OpenClaw 当前技术路线可概括为：

> **Gateway-centric Agent Runtime + 强状态持久化 + Doctor 运维诊断 + 多通道交互 + 子 Agent 恢复机制**

与其他项目相比：

- 相比 **NanoBot**：OpenClaw 更偏 runtime / gateway / session-state 基础设施；NanoBot 更偏 WebUI、MCP Apps、文档读取和个人工作台体验。
- 相比 **Hermes Agent**：二者都处于高复杂度 runtime 层，但 Hermes 今日暴露更多 Desktop、update、cron、SQLite corruption、plugin/skill 安全问题；OpenClaw 今日更聚焦 beta 线稳定化和 Gateway/Agent 状态一致性。
- 相比 **CoPaw/QwenPaw**：CoPaw 更面向桌面端用户体验和 provider 兼容；OpenClaw 更强调状态机、Doctor、Gateway 可靠性。
- 相比 **ZeroClaw**：ZeroClaw 今日重点在 native onboarding、本地账号、配置安全和 Telegram；OpenClaw 更聚焦已存在 runtime 的一致性和升级兼容。
- 相比 **NullClaw/NanoClaw**：OpenClaw 已经覆盖更完整的 Gateway、Agent、Doctor、State、Channel 体系；后两者今日仅暴露单点可靠性修复。

### 3.4 社区规模与活跃度

今日 OpenClaw **7 Issues / 27 PRs / 1 Release**，活跃度仅低于 Hermes Agent，明显高于 NanoBot、LobsterAI、CoPaw、ZeroClaw以外的项目。  
从维护成熟度看，OpenClaw 的 Issue/PR 标签体系较细，包括 P1/P2/P3、proof、compatibility、security-boundary、ready for maintainer look 等，显示其社区治理和合并门禁相对成熟。

---

## 4. 共同关注的技术方向

### 4.1 Agent Session / 状态一致性

涉及项目：**OpenClaw、Hermes Agent、ZeroClaw、CoPaw、LobsterAI**

| 项目 | 具体表现 |
|---|---|
| OpenClaw | stopped agent command 残留 claim，heartbeat wake 不触发；subagent completion delivery 卡死 |
| Hermes Agent | restored messages 重复插入 state.db；message_agent 随 sender TUI session 关闭而中断 |
| ZeroClaw | failed-turn 状态 reconnect 后丢失；重复已批准 shell command 导致 agent loop abort |
| CoPaw | message queue 重复处理、跨会话归属错误 |
| LobsterAI | OpenClaw thinking catalog owner 被替换导致 Agent 回复前失败 |

**共同诉求：**  
Agent 的运行状态、消息归属、失败状态、恢复状态必须可持久化、可恢复、可解释，不能依赖前端连接或单次 turn 的临时状态。

---

### 4.2 Gateway / Channel / 消息入口可靠性

涉及项目：**OpenClaw、NullClaw、NanoClaw、ZeroClaw、Hermes Agent、CoPaw**

| 项目 | 具体诉求 |
|---|---|
| OpenClaw | Gateway request stop 与 yielded commands 生命周期绑定；Channel `/stop` 统一停止语义 |
| NullClaw | inbound bus 满载时不能阻塞 Gateway accept loop |
| NanoClaw | channel adapter setup 失败后需要后台 re-arm |
| ZeroClaw | Telegram listener HTTP blackhole 后不能永久 wedge |
| Hermes Agent | OAuth MCP session reconnect 后不能永久失效 |
| CoPaw | 页面加载失败、消息队列重复处理影响入口可靠性 |

**共同诉求：**  
智能体平台不能只处理“正常流量”，还必须具备 backpressure、timeout、retry、health check、自动恢复能力。

---

### 4.3 Provider 兼容、Fallback 与错误分类

涉及项目：**CoPaw、NanoBot、ZeroClaw、Hermes Agent、OpenClaw**

| 项目 | 动态 |
|---|---|
| CoPaw | content inspection error 应进入 fallback；max token fit error 应触发 context recovery |
| NanoBot | provider policy block 不应导致 Dream memory batch 丢失 |
| ZeroClaw | OpenAI-compatible provider family 应尊重 `native_tools` 配置 |
| Hermes Agent | Anthropic workspace API key 被误判为 OAuth token；custom provider dead session |
| OpenClaw | Gemini switch proof 需展示 sanitized provider errors |

**共同诉求：**  
多 provider 时代，错误不能简单按 HTTP code 分类；需要 provider-aware classifier、fallback policy、脱敏诊断和恢复策略。

---

### 4.4 文档 / 文件读取完整性

涉及项目：**NanoBot、CoPaw**

| 项目 | 具体问题 |
|---|---|
| NanoBot | PDF 读取跨字符限制时丢失页面剩余内容；XLSX chart-only sheet 导致读取失败 |
| CoPaw | Daily Paper 摘要 JSON 截断导致整个任务失败 |

**共同诉求：**  
个人 AI 助手正在深入文档工作流，文件读取必须支持续读、局部失败恢复、结构化输出修复和 per-item retry。

---

### 4.5 插件 / Skills / 本地工具安全边界

涉及项目：**LobsterAI、Hermes Agent、ZeroClaw、OpenClaw、NanoBot**

| 项目 | 动态 |
|---|---|
| LobsterAI | skills 删除不能信任 `_meta.json` 中任意路径 |
| Hermes Agent | skill 安装同名混淆、forensics skill 凭据泄露、backup 失败仍成功 |
| ZeroClaw | allowed_commands glob matching 增强但需安全审查；native account/local tools 高风险 |
| OpenClaw | owner-gated plugin factories tool directory 抖动；CoreWeave provider setup security-boundary |
| NanoBot | Computer Use with Cua Driver 涉及桌面控制权限 |

**共同诉求：**  
插件生态从“扩展能力”进入“安全治理”阶段，路径删除、命令授权、凭据保护、工具可见性、桌面控制都必须纳入安全边界设计。

---

### 4.6 Desktop / TUI / WebUI 体验稳定性

涉及项目：**Hermes Agent、CoPaw、NanoBot、LobsterAI**

| 项目 | 动态 |
|---|---|
| Hermes Agent | Windows/macOS Desktop update、TUI 模型切换、Linux GPU fallback |
| CoPaw | Desktop 页面加载失败、冷启动慢、WebView2 静默死亡、设置布局错乱 |
| NanoBot | WebUI CJK Markdown、catalog skeleton、目录选择器、暗色模式对比度 |
| LobsterAI | Cowork question dock 折叠体验、About 开源信息 |

**共同诉求：**  
个人 AI 助手不再只是 CLI 工具，桌面与 WebUI 成为主入口，启动、更新、渲染、布局、交互反馈都会影响用户留存。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 / 路线特点 |
|---|---|---|---|
| **OpenClaw** | Gateway、Agent runtime、Doctor、状态管理、多通道、Subagent | 高级用户、运维者、Agent 平台开发者 | Gateway-centric，强状态持久化，Doctor 诊断与跨版本兼容 |
| **Hermes Agent** | Desktop/TUI/CLI、Cron、插件、skills、统一 gateway runtime | 重度个人助手用户、自动化用户、插件开发者 | 多入口复杂 runtime，正向 gateway-owned session 收敛 |
| **NanoBot** | WebUI、MCP Apps、文档读取、Memory、Computer Use | 个人工作台用户、知识管理用户、MCP 生态用户 | WebUI + MCP 应用目录 + Provider/Memory 能力 |
| **CoPaw / QwenPaw** | Desktop AI 助手、Provider fallback、Creator、论文/记忆任务 | 桌面端用户、中文模型用户、研究工作流用户 | 桌面产品化明显，Provider 兼容和 beta 体验是重点 |
| **ZeroClaw** | Native onboarding、本地账号、本地工具、配置安全、Telegram | 本地开发者、安全敏感用户、provider/router 高级用户 | 本地原生账号 + 隔离 agent instance + 安全策略治理 |
| **LobsterAI** | OpenClaw 桌面集成、Cowork、Skills、安全修复 | 桌面协作用户、中文 IM 场景用户 | 产品壳 + OpenClaw 集成，强调桌面协作和技能生态 |
| **NanoClaw** | Channel adapter | 长运行 bot / channel 部署者 | 轻量 channel 层，当前关注自恢复 |
| **NullClaw** | Gateway inbound bus | webhook / 外部入口部署者 | 轻量 Gateway / bus 架构，关注 backpressure |
| **IronClaw** | 测试依赖维护 | 项目维护者 | 当前主要是依赖维护 |
| **PicoClaw / TinyClaw / Moltis / ZeptoClaw** | 今日无信号 | 不明确 | 暂无活动，难以判断路线 |

### 核心差异总结

- **OpenClaw / Hermes / ZeroClaw**：更偏底层 Agent runtime 与平台治理。
- **NanoBot / CoPaw / LobsterAI**：更偏产品体验、桌面/WebUI、个人助手工作流。
- **NanoClaw / NullClaw**：更偏单点基础设施组件，例如 channel 或 Gateway。
- **IronClaw 及静默项目**：当前以维护或低活跃状态为主。

---

## 6. 社区热度与成熟度

### 6.1 快速迭代阶段

**Hermes Agent、OpenClaw、ZeroClaw、CoPaw**

这些项目 Issue/PR 活跃，且问题集中在核心路径。它们的共同特征是：

- 功能面已经较广；
- 真实用户场景开始暴露复杂边界；
- Bug 不再是简单崩溃，而是状态一致性、权限、恢复、数据完整性问题；
- 需要更严格的回归测试、release gate 和维护者 triage。

其中：

- **Hermes Agent** 活跃度最高，但压力也最大。
- **OpenClaw** 发布节奏和修复推进最均衡，今日已有 beta hotfix。
- **ZeroClaw** 开发活跃但今日无合并，需避免 PR 堆积。
- **CoPaw** 用户反馈密集，beta4 桌面稳定性需要优先处理。

### 6.2 质量巩固阶段

**NanoBot、LobsterAI**

这两个项目今日 Issue 噪音较低，但 PR 明显在处理真实体验和边界问题：

- NanoBot 修复 WebUI、文档读取、Memory、CI、MCP preset。
- LobsterAI 修复 Skills 删除安全、OpenClaw 集成稳定性、Cowork UI。

它们更像处于“产品质量打磨期”，风险低于 Hermes/OpenClaw/ZeroClaw，但涉及的安全和数据完整性问题仍需重视。

### 6.3 低活跃维护阶段

**NanoClaw、NullClaw、IronClaw**

这些项目今日活动少，但 NanoClaw 和 NullClaw 的单个 PR 都指向运行时可靠性，说明即便低活跃项目也在面对生产化问题：

- NanoClaw：adapter setup 失败后自恢复。
- NullClaw：inbound bus 满载不能阻塞 accept loop。
- IronClaw：依赖维护。

### 6.4 静默阶段

**PicoClaw、TinyClaw、Moltis、ZeptoClaw**

过去 24 小时无活动，无法判断真实维护状态。对技术选型者而言，应进一步观察更长周期的提交、Issue 响应和 Release 频率。

---

## 7. 值得关注的趋势信号

### 7.1 Agent Runtime 的核心竞争力从“工具调用”转向“状态可靠性”

今日多个项目的问题都不是“能不能调用工具”，而是：

- Stop 后是否彻底停止；
- session 关闭后消息是否继续投递；
- reconnect 后失败状态是否保留；
- 子 Agent completion 是否可靠送达；
- restored messages 是否重复写入。

**对开发者的参考价值：**  
构建 Agent 系统时，应尽早设计 durable queue、幂等 message id、session ownership、delivery claim、state recovery，而不是后期补丁式修复。

---

### 7.2 Gateway 与 Channel 必须具备生产级 backpressure 和自恢复

NullClaw、NanoClaw、ZeroClaw、OpenClaw 都暴露了入口层可靠性问题。Webhook、Telegram、Discord、Gateway request、Channel adapter 一旦阻塞或失效，用户会直接感知为“AI 助手离线”。

**建议：**

- 所有网络请求必须有 timeout；
- accept loop 不应被同步队列 publish 阻塞；
- adapter setup 失败后应后台重试；
- channel listener 应有 watchdog；
- queue depth、dropped messages、retry count 应可观测。

---

### 7.3 Provider 多样化正在倒逼错误分类与 Fallback 标准化

CoPaw、Hermes、ZeroClaw、NanoBot、OpenClaw 都出现 provider 相关问题。OpenAI-compatible 并不意味着错误格式兼容，国内网关、Claude/Anthropic、Gemini、CoreWeave、ChatGPT plan、本地 Claude Code 等各有差异。

**对开发者的参考价值：**

应抽象统一的 provider error taxonomy，例如：

- context overflow；
- content policy block；
- auth/token classification；
- billing-only usage frame；
- transient network；
- terminal model error；
- sanitized diagnostic。

否则 fallback 和 recovery 逻辑会不断被 provider-specific case 击穿。

---

### 7.4 插件与本地工具生态进入安全治理期

LobsterAI、Hermes、ZeroClaw、OpenClaw、NanoBot 均出现插件/skills/本地工具安全边界信号。随着 Agent 可以操作文件、执行 shell、控制桌面、调用本地账号，插件风险显著上升。

**建议重点关注：**

- 插件安装来源和同名冲突；
- 删除路径必须白名单化；
- 本地命令 allowlist 不应过宽；
- 凭据不得进入普通工作区；
- Computer Use 必须有显式授权与沙箱；
- owner-gated tools 的可见性模型必须稳定。

---

### 7.5 桌面端成为个人 AI 助手主战场，但工程复杂度明显升高

Hermes、CoPaw、LobsterAI、NanoBot 都在处理 Desktop/WebUI/TUI 体验问题，包括更新、冷启动、WebView2、GPU fallback、CJK 渲染、暗色模式、目录选择器、问题 Dock。

**趋势判断：**  
个人 AI 助手将继续从 CLI 走向 Desktop/WebUI，但这要求项目团队具备传统客户端工程能力：更新机制、进程生命周期、前后端健康检查、崩溃恢复、可访问性、国际化都将成为竞争点。

---

### 7.6 长期记忆、文档理解和批处理任务正在成为基础能力

NanoBot 的 Dream memory、PDF/XLSX 修复，CoPaw 的 Daily Paper cron，NanoBot 的 Mnemosyne preset，都说明用户正在把 AI 助手用于长期知识管理和文档工作流。

**对开发者的参考价值：**

文档和记忆系统需要具备：

- 分页/分块连续性；
- partial failure；
- per-item retry；
- memory batch 不丢失；
- JSON 输出修复；
- 引用与来源可追踪。

---

### 7.7 本地原生账号与移动/边缘推理成为下一阶段探索方向

ZeroClaw 正在推进 ChatGPT plan、本地 Claude Code、isolated native agent；OpenClaw 出现 iPhone/iPad foreground inference worker 需求；NanoBot 推进 Computer Use 和 MCP memory preset。

**趋势判断：**  
未来个人 AI 助手不会只依赖云端 API Key，而会逐步支持：

- 本地已登录账号；
- 本地客户端能力复用；
- 移动设备前台推理；
- 本地工具和桌面控制；
- 隔离 agent instance。

这将带来更好的用户接入体验，也会显著提高认证、权限和合规复杂度。

---

## 结论

今日生态的主线非常清晰：**AI 智能体开源项目正在从功能扩展期进入可靠性、状态一致性和安全治理期。**

- **OpenClaw** 是当前最值得作为 runtime 稳定化参照的项目之一，发布活跃、修复集中、治理标签成熟，但仍需重点处理状态机和跨版本兼容风险。
- **Hermes Agent** 活跃度最高，但 P1/P2 问题密集，说明其功能广度已经带来显著维护压力。
- **NanoBot / LobsterAI** 更偏产品体验和生态打磨，适合观察个人 AI 工作台方向。
- **CoPaw / ZeroClaw** 分别代表桌面 beta 产品化和本地原生账号/onboarding 方向，但当前稳定性和安全风险较突出。
- **NullClaw / NanoClaw** 虽低活跃，但它们暴露的 Gateway/channel 自恢复问题具有普遍参考价值。

对技术决策者而言，短期选型应重点考察项目的 **状态恢复能力、Provider fallback、插件安全、Desktop 稳定性、release gate 和维护响应速度**，而不仅是功能列表。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报｜2026-10-08

## 1. 今日速览

过去 24 小时，NanoBot 没有 Issue 更新，但 Pull Request 活跃度较高，共有 **13 条 PR 更新**，其中 **8 条仍处于 Open 状态**、**5 条已关闭/完成处理**。今日工作重点集中在 **WebUI 体验修复、文档读取稳定性、Provider/Memory 可靠性、测试性能优化、MCP/App 生态扩展** 等方向。整体来看，项目处于较活跃的工程迭代期，维护者和贡献者正在同时推进用户体验、稳定性和插件化能力。  
当前没有新版本发布，说明今日变化仍主要停留在代码审查和合并准备阶段，短期内可能为下一次版本发布积累修复与功能。Issue 侧没有新增反馈，社区公开问题输入较少，但 PR 中反映出多个来自真实使用场景的痛点，例如 CJK Markdown 渲染、XLSX/PDF 读取边界、SkillHub 链接错误等。

---

## 2. 项目进展

今日共有 **5 条 PR 已关闭/完成处理**，主要集中在 WebUI 体验、TUI 命令补全、Provider 架构优化和加载状态优化。

### 已关闭/完成的重要 PR

#### 1. Provider 架构优化：Codex WebSocket continuation 与 Responses 后端复用  
- PR：[#6096 feat(providers): share Responses backend with Codex WebSocket continuation](https://github.com/HKUDS/nanobot/pull/6096)  
- 状态：Closed  
- 作者：chengyongru  
- 方向：Provider、性能、架构优化  
- 影响分析：  
  该 PR 试图解决 Codex 会话在 HTTP/SSE 请求中重复回放历史图片和 reasoning items 的问题。对于包含 PDF、图片或长上下文的任务，重复上传历史内容会造成明显的性能浪费和潜在成本增加。  
  通过引入 connection-local Responses WebSocket continuation，并将 OpenAI-compatible provider 的 Responses 协议行为集中到共享后端，项目在 Provider 层的可维护性和性能上都有积极推进。  
- 项目推进意义：  
  这是偏底层的架构改进，能够为后续多 Provider、长上下文、多模态任务的稳定运行打基础。

#### 2. WebUI 修复：CJK 粗体标签在拉丁文本前无法正常渲染  
- PR：[#6099 fix(webui): render CJK bold labels before Latin text](https://github.com/HKUDS/nanobot/pull/6099)  
- 状态：Closed  
- 作者：chengyongru  
- 方向：WebUI、Markdown 渲染、国际化体验  
- 影响分析：  
  修复了类似 `**边界说明：**issue` 或 `**边界说明： **issue` 这类中英文混排内容中，粗体标记被原样显示的问题。  
  该问题对中文用户影响较明显，尤其是在 AI 输出结构化说明、标签、边界条件时，经常出现“中文标签 + 英文术语/issue 编号”的格式。  
- 项目推进意义：  
  提升中文与 CJK 用户在 WebUI 中阅读 AI 输出的体验，也体现出项目对国际化细节的关注。

#### 3. TUI 修复：优先匹配 slash command 命令名  
- PR：[#6098 fix(tui): prioritize slash command name matches](https://github.com/HKUDS/nanobot/pull/6098)  
- 状态：Closed  
- 作者：chengyongru  
- 方向：TUI、命令补全、交互体验  
- 影响分析：  
  当前输入 `/se` 时可能错误选择 `/model`，因为 `se` 出现在其标题 `Switch model preset` 中，且候选项按字母排序。该 PR 调整排序逻辑，使命令名匹配优先于标题匹配。  
- 项目推进意义：  
  这是典型的开发者体验优化。对于高频使用 TUI 的用户，slash command 补全准确性直接影响操作效率。

#### 4. WebUI 修复：改善暗色模式下危险操作的对比度  
- PR：[#6095 fix(webui): improve destructive contrast in dark mode](https://github.com/HKUDS/nanobot/pull/6095)  
- 状态：Closed  
- 作者：Wenyan0315  
- 方向：WebUI、可访问性、暗色主题  
- 影响分析：  
  暗色模式下 destructive 文本和删除图标与卡片背景的对比度仅约 **1.17:1**，可读性较差。该 PR 使用更亮的红色 destructive token，并为填充式 destructive 按钮设置深色前景色。  
- 项目推进意义：  
  提高了暗色模式下删除、移除等高风险操作的识别度，降低误操作风险，也改善了可访问性。

#### 5. WebUI 功能：为 catalog 加载增加 skeleton 状态  
- PR：[#6092 feat(webui): add catalog loading skeletons](https://github.com/HKUDS/nanobot/pull/6092)  
- 状态：Closed  
- 作者：chengyongru  
- 方向：WebUI、Apps/Channels/Skills 目录体验  
- 影响分析：  
  Apps 目录在 CLI/MCP 来源尚未全部读取完成时，可能误显示为空分类；Skills 在首次读取未完成或失败时，也可能被当成空列表处理。该 PR 增加了与 Apps、Channels、Skills 行布局匹配的 skeleton loading，并改进了数据源等待逻辑。  
- 项目推进意义：  
  减少用户误以为“目录为空”或“功能不可用”的困惑，提升应用市场/技能发现体验。

---

## 3. 社区热点

今日没有 Issue 更新，PR 数据中评论数和点赞数均未提供或为 0，因此缺少传统意义上“高讨论量”热点。不过，从 PR 内容看，以下几个方向具有较高产品和用户价值，值得关注。

### 1. Managed Computer Use / Cua Driver 集成  
- PR：[#6091 feat(apps): add managed computer use with Cua Driver](https://github.com/HKUDS/nanobot/pull/6091)  
- 状态：Open，存在 conflict  
- 作者：Re-bin  
- 热点原因：  
  该 PR 计划在 Apps catalog 中增加 Computer Use preset，通过 MCP 接入 Cua Driver，由 Nanobot 保留模型、Agent 执行和访问策略控制，Cua Driver 提供桌面观察和输入能力。  
- 背后诉求：  
  用户和开发者正在关注“AI 控制电脑/桌面自动化”的能力，这与个人 AI 助手和智能体的长期路线高度相关。  
- 风险与关注点：  
  当前标记为 conflict，说明合并前需要解决代码冲突。此外，Computer Use 涉及权限、安全策略、桌面输入控制和沙箱边界，建议维护者重点审查权限隔离和用户确认流程。

### 2. SkillHub 链接修复  
- PR：[#6102 fix(webui): correct SkillHub skill detail links](https://github.com/HKUDS/nanobot/pull/6102)  
- 状态：Open  
- 作者：Re-bin  
- 热点原因：  
  Skills → Discover 中的 SkillHub 详情链接缺少 `/skills/` 路径段，导致跳转到 “page not found”。  
- 背后诉求：  
  SkillHub 是用户发现和使用技能的重要入口，链接错误会直接阻断技能分发闭环。该问题虽然技术复杂度不高，但对新用户体验和生态转化影响较大。

### 3. WebUI 工作区选择与 composer 操作流优化  
- PR：[#6089 feat(webui): add a column directory picker and streamline composer actions](https://github.com/HKUDS/nanobot/pull/6089)  
- 状态：Open  
- 作者：chengyongru  
- 热点原因：  
  该 PR 用应用内目录选择器替换原生 workspace chooser，并增加 host、breadcrumbs、Back/Forward、Parent folder、路径输入等能力。  
- 背后诉求：  
  多网关、多主机或远程开发场景下，用户需要更明确地知道当前选择的是哪个主机、哪个路径。该 PR 反映出 NanoBot 正在从“本地工具”向“可连接远程网关的 AI 工作台”演进。

---

## 4. Bug 与稳定性

今日无新增 Issue 报告，但多条 PR 明确修复 Bug、回归或稳定性问题。按影响范围和严重程度排序如下。

### 高优先级 / 影响数据完整性与任务连续性

#### 1. Dream memory 在 provider policy block 后可能丢失 batch  
- PR：[#6100 fix(memory): preserve Dream batches after provider policy blocks](https://github.com/HKUDS/nanobot/pull/6100)  
- 状态：Open  
- 作者：KailBug  
- 类型：Bug、Provider、Regression、Memory  
- 严重程度：高  
- 问题描述：  
  当 provider 明确返回 `refusal` 或 `content_filter` 时，runner 仍可能把非空的 policy-blocked response 视为已完成 turn，并推进 Dream 的历史游标。Dream 仅依赖完成状态判断，导致相关 batch 被丢弃。  
- 当前进展：  
  已有 fix PR，尚未合并。  
- 影响分析：  
  这类问题会影响记忆系统的可靠性，尤其在涉及安全策略、内容过滤或拒答场景时，可能造成上下文或记忆批次丢失。

#### 2. PDF 分页读取在字符限制处截断时可能丢失页面剩余内容  
- PR：[#6093 fix(documents): preserve complete PDF pages across reads](https://github.com/HKUDS/nanobot/pull/6093)  
- 状态：Open  
- 作者：takiAA  
- 类型：Bug、Documents、读取连续性  
- 严重程度：高  
- 问题描述：  
  当 `read_file` 读取 PDF 时在某一页中途达到字符上限，系统提示从下一页继续读取，这会导致当前被截断页面的剩余内容丢失。  
- 当前进展：  
  已有 fix PR，尚未合并。  
- 影响分析：  
  对长 PDF、合同、论文、报告等场景影响较大。AI 助手依赖完整文档上下文，如果页面内容丢失，可能导致摘要、问答或引用不准确。

#### 3. XLSX 中 chart-only sheet 导致文本提取失败  
- PR：[#6097 fix(documents): skip chart-only sheets when reading XLSX files](https://github.com/HKUDS/nanobot/pull/6097)  
- 状态：Open  
- 作者：lux-liang  
- 类型：Bug、Documents、文件读取  
- 严重程度：中高  
- 问题描述：  
  包含 chart-only sheet 的 XLSX 文件会触发 `AttributeError: 'Chartsheet' object has no attribute 'reset_dimensions'`，并中断 `read_file` 和 `grep` 共享的文档流，即使文件中还包含普通数据表。  
- 当前进展：  
  已有 fix PR，尚未合并。  
- 影响分析：  
  对处理业务报表、财务 Excel、图表型工作簿的用户影响明显。修复方式是跳过 chart-only sheet，继续处理普通 worksheet。

### 中优先级 / 影响 WebUI 和交互体验

#### 4. SkillHub skill detail 链接错误  
- PR：[#6102 fix(webui): correct SkillHub skill detail links](https://github.com/HKUDS/nanobot/pull/6102)  
- 状态：Open  
- 作者：Re-bin  
- 严重程度：中  
- 问题描述：  
  Skills → Discover 中的详情链接缺少 `/skills/` 路径段，导致跳转 404。  
- 当前进展：  
  已有 fix PR，尚未合并。  
- 用户影响：  
  阻断技能详情查看，影响 SkillHub 发现体验。

#### 5. CJK Markdown 粗体标签渲染异常  
- PR：[#6099 fix(webui): render CJK bold labels before Latin text](https://github.com/HKUDS/nanobot/pull/6099)  
- 状态：Closed  
- 作者：chengyongru  
- 严重程度：中  
- 当前进展：  
  已完成处理。  
- 用户影响：  
  主要影响中文、日文、韩文等 CJK 用户阅读 AI 输出。

#### 6. TUI slash command 补全优先级错误  
- PR：[#6098 fix(tui): prioritize slash command name matches](https://github.com/HKUDS/nanobot/pull/6098)  
- 状态：Closed  
- 作者：chengyongru  
- 严重程度：中  
- 当前进展：  
  已完成处理。  
- 用户影响：  
  影响命令行高频用户的操作效率。

#### 7. 暗色模式 destructive 操作对比度不足  
- PR：[#6095 fix(webui): improve destructive contrast in dark mode](https://github.com/HKUDS/nanobot/pull/6095)  
- 状态：Closed  
- 作者：Wenyan0315  
- 严重程度：中低  
- 当前进展：  
  已完成处理。  
- 用户影响：  
  提升删除等危险操作的可读性和可访问性。

---

## 5. 功能请求与路线图信号

今日没有 Issue 形式的功能请求，但多条 Open PR 显示了项目短期路线图方向。

### 1. Computer Use / 桌面自动化能力  
- PR：[#6091 feat(apps): add managed computer use with Cua Driver](https://github.com/HKUDS/nanobot/pull/6091)  
- 状态：Open，存在 conflict  
- 路线图信号：  
  NanoBot 正在探索将“个人 AI 助手”从文本和工具调用扩展到真实桌面操作。通过 MCP 接入 Cua Driver，并由 Nanobot 控制模型、Agent 执行和访问策略，说明项目更倾向于“受控的 computer use”而非完全外包执行。  
- 纳入下一版本可能性：中等  
  主要阻碍是当前 PR 有冲突，并且该能力涉及安全审查。

### 2. Mnemosyne MCP memory preset  
- PR：[#6094 feat(webui): add Mnemosyne MCP memory preset](https://github.com/HKUDS/nanobot/pull/6094)  
- 状态：Open  
- 作者：ashmoonori-afk  
- 路线图信号：  
  该 PR 为 Apps 增加可选的 Mnemosyne preset，使用现有 stdio MCP 流程，并通过 `uvx --from "birkin-mnemosyne[mcp]" mnemosyne-mcp` 启动隔离环境。  
- 用户价值：  
  面向长期记忆、本地 Markdown memory、多语言 lexical memory 等场景，增强个人 AI 助手的持续上下文能力。  
- 纳入下一版本可能性：较高  
  该功能复用现有 MCP flow，集成风险相对 Computer Use 更低。

### 3. WebUI 内置目录选择器与 composer 操作流优化  
- PR：[#6089 feat(webui): add a column directory picker and streamline composer actions](https://github.com/HKUDS/nanobot/pull/6089)  
- 状态：Open  
- 作者：chengyongru  
- 路线图信号：  
  项目正在强化 WebUI 作为主操作界面的能力，尤其是远程 gateway host、workspace 选择和路径导航体验。  
- 纳入下一版本可能性：较高  
  该 PR 已描述较完整，且属于 WebUI 交互增强，若测试通过，很可能进入后续版本。

### 4. CI 测试性能优化  
- PR：[#6101 ci: reduce test runtime while preserving coverage](https://github.com/HKUDS/nanobot/pull/6101)  
- 状态：Open  
- 作者：chengyongru  
- 路线图信号：  
  Windows job 中 parallel tests 耗时 322 秒，serial CLI tests 另耗时 101 秒。该 PR 试图减少真实 WebUI 安装构建、真实 backoff 等导致的测试耗时。  
- 用户价值：  
  虽然不是直接面向终端用户的功能，但 CI 速度提升会改善维护效率，缩短 PR 反馈周期，提高发布节奏。  
- 纳入下一版本可能性：高  
  属于工程效率优化，且目标明确。

---

## 6. 用户反馈摘要

今日没有新的 Issue 评论数据，因此无法从 Issue 线程中提炼直接用户反馈。不过，PR 描述中反映出若干真实使用痛点：

### 1. 技能发现链路不能跳转详情页  
- 相关 PR：[#6102 fix(webui): correct SkillHub skill detail links](https://github.com/HKUDS/nanobot/pull/6102)  
- 痛点：  
  用户从 Skills → Discover 点击技能详情时遇到 404，会误以为技能不存在或 SkillHub 不可用。  
- 使用场景：  
  新用户发现技能、安装技能、查看技能说明。

### 2. AI 输出中的中文结构化标签显示异常  
- 相关 PR：[#6099 fix(webui): render CJK bold labels before Latin text](https://github.com/HKUDS/nanobot/pull/6099)  
- 痛点：  
  中英文混排时 Markdown 粗体标记没有正确渲染，影响阅读专业性。  
- 使用场景：  
  中文用户阅读 AI 生成的报告、分析说明、Issue 边界条件、技术摘要。

### 3. 文档读取需要完整、连续、可恢复  
- 相关 PR：  
  - [#6093 fix(documents): preserve complete PDF pages across reads](https://github.com/HKUDS/nanobot/pull/6093)  
  - [#6097 fix(documents): skip chart-only sheets when reading XLSX files](https://github.com/HKUDS/nanobot/pull/6097)  
- 痛点：  
  PDF 读取不能丢页，Excel 读取不能因为图表页导致整个文件流失败。  
- 使用场景：  
  论文阅读、合同审查、财务表格分析、企业报表问答。

### 4. 用户希望 WebUI 更像完整工作台  
- 相关 PR：[#6089 feat(webui): add a column directory picker and streamline composer actions](https://github.com/HKUDS/nanobot/pull/6089)  
- 痛点：  
  原生 workspace chooser 对远程 host、路径层级和过滤操作支持不足。  
- 使用场景：  
  多项目切换、远程 gateway 文件浏览、在 WebUI 中直接选择工作目录。

### 5. 用户希望 AI 助手具备更强的长期记忆和桌面操作能力  
- 相关 PR：  
  - [#6094 feat(webui): add Mnemosyne MCP memory preset](https://github.com/HKUDS/nanobot/pull/6094)  
  - [#6091 feat(apps): add managed computer use with Cua Driver](https://github.com/HKUDS/nanobot/pull/6091)  
- 痛点：  
  个人 AI 助手不应只停留在一次性对话，而需要记住长期信息，并能在用户授权下操作真实环境。  
- 使用场景：  
  个人知识管理、长期偏好记忆、桌面自动化、跨应用任务执行。

---

## 7. 待处理积压

由于数据仅覆盖过去 24 小时，无法判断“长期未响应”的 Issue 或 PR。不过，以下 Open PR 在当前周期内值得维护者优先关注。

### 1. 存在冲突的 Computer Use 集成 PR  
- PR：[#6091 feat(apps): add managed computer use with Cua Driver](https://github.com/HKUDS/nanobot/pull/6091)  
- 状态：Open，conflict  
- 建议：  
  尽快解决冲突，并重点审查安全边界、权限模型、驱动包校验、用户确认机制。该能力战略价值高，但风险也高。

### 2. Memory 可靠性修复  
- PR：[#6100 fix(memory): preserve Dream batches after provider policy blocks](https://github.com/HKUDS/nanobot/pull/6100)  
- 状态：Open  
- 建议：  
  优先审查并合并。该问题涉及 Dream memory 在 provider 拒答或过滤场景下的数据保留，属于可靠性核心问题。

### 3. 文档读取完整性修复  
- PR：[#6093 fix(documents): preserve complete PDF pages across reads](https://github.com/HKUDS/nanobot/pull/6093)  
- 状态：Open  
- 建议：  
  优先验证边界场景，包括长 PDF、跨页续读、字符上限、重复读取和引用准确性。

### 4. XLSX chart-only sheet 兼容性修复  
- PR：[#6097 fix(documents): skip chart-only sheets when reading XLSX files](https://github.com/HKUDS/nanobot/pull/6097)  
- 状态：Open  
- 建议：  
  与普通 worksheet、隐藏 sheet、空 sheet、公式 sheet 的测试一起覆盖，避免后续文档解析回归。

### 5. SkillHub 链接修复  
- PR：[#6102 fix(webui): correct SkillHub skill detail links](https://github.com/HKUDS/nanobot/pull/6102)  
- 状态：Open  
- 建议：  
  该问题影响技能发现闭环，修复成本应较低，建议尽快合并。

### 6. CI 测试耗时优化  
- PR：[#6101 ci: reduce test runtime while preserving coverage](https://github.com/HKUDS/nanobot/pull/6101)  
- 状态：Open  
- 建议：  
  当前 Windows 测试耗时较高，建议优先推进，以改善整体开发效率和 PR 周转速度。

---

## 总体健康度评估

NanoBot 今日表现为 **高 PR 活跃、低 Issue 噪音、无版本发布** 的状态。项目工程推进健康，贡献集中在稳定性、WebUI 可用性、MCP 生态和测试效率上，说明维护团队不仅在扩展新能力，也在持续处理实际使用中的边界问题。  
短期最值得关注的风险包括：Computer Use 集成的安全与冲突处理、Dream memory 在 provider policy block 下的数据可靠性、PDF/XLSX 文档读取完整性。若这些 Open PR 能顺利合并，下一版本有望在个人 AI 助手的可用性、记忆能力和文档处理可靠性上明显提升。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报｜2026-10-08

## 1. 今日速览

过去 24 小时 Hermes Agent 仍处于**极高活跃度**状态：Issues 更新 50 条，其中 48 条仍处于新开或活跃状态；PR 更新 50 条，其中 39 条仍待合并，11 条已合并或关闭。  
今日问题集中在 **会话状态、Desktop/TUI 体验、Windows/macOS 更新流程、插件与工具链、Cron 自动化、计费/用量统计** 等方向。  
整体看，项目迭代速度很快，但稳定性压力也明显上升：多个 P1/P2 问题涉及 session persistence、cron 调度、update lock、OAuth MCP 连接、SQLite 损坏等关键路径。  
维护侧已有不少快速修复 PR 跟进，尤其是 Windows 更新、TUI 模型切换、scratch 清理、Linux GPU fallback、billing usage 统计等，说明项目响应速度较好，但 open bug 积压仍需优先分流。

---

## 2. 版本发布

今日无新版本发布。

最新 Release 数据为空，过去 24 小时未看到正式版本、canary 版本或补丁版本发布记录。  
不过与发布流程相关的修复已经出现，例如：

- [PR #134905](https://github.com/NousResearch/hermes-agent/pull/134905) 修正 patch release 版本号递增逻辑，避免重新切出 `0.21.5`。
- [PR #134917](https://github.com/NousResearch/hermes-agent/pull/134917) 修复 Nix release package identity check。
- [PR #134892](https://github.com/NousResearch/hermes-agent/pull/134892) 修复 macOS Desktop 更新流程中误判已有 update 进程的问题。

这些 PR 表明维护者正在为后续 patch/release pipeline 做准备。

---

## 3. 项目进展

### 已合并 / 关闭的重要 PR

#### Windows Desktop 更新诊断增强

- [PR #134911](https://github.com/NousResearch/hermes-agent/pull/134911)  
  **Store/App Installer update failures now say why the relaunch waiter couldn't start**  
  该 PR 改进 Microsoft Store / App Installer 更新失败时的日志信息。此前用户只能看到模糊的 `[updates] error: Could not register automatic relaunch for the Store update`，现在会输出 relaunch waiter 无法启动的具体原因。  
  **影响**：提升 Windows Desktop 更新问题的可诊断性，有助于后续定位自动重启、权限、路径、脚本执行等问题。

- [PR #134916](https://github.com/NousResearch/hermes-agent/pull/134916)  
  **Relaunch waiter failure reports no longer quote other attempts or garble non-ASCII text**  
  作为 #134911 的后续修复，改进 relaunch waiter 日志的隔离性、UTF-8 编码处理和日志大小边界。  
  **影响**：减少多次更新尝试之间日志串扰，并修复非 ASCII 文本乱码，对国际化 Windows 环境更友好。

#### TUI / Gateway 模型切换体验修复

- [PR #134906](https://github.com/NousResearch/hermes-agent/pull/134906)  
  **fix(tui_gateway): a model picked mid-turn without --provider asks first instead of being dropped next turn**  
  修复用户在 TUI 中 mid-turn 选择模型但未指定 provider 时，下一个 turn 静默丢弃该选择的问题。现在会立即触发成本确认，而不是到下一轮才失败或被忽略。  
  **影响**：改善 TUI 模型切换的一致性，降低“我明明选了模型但没有生效”的困惑。

#### Release 版本线修复

- [PR #134905](https://github.com/NousResearch/hermes-agent/pull/134905)  
  **Patch releases continue at 0.21.6 instead of re-cutting 0.21.5**  
  修复 release pipeline patch bump 逻辑，避免在已有 `v0.21.5` 的情况下再次生成 `0.21.5`。  
  **影响**：保障后续补丁版本发布顺序正确，降低发布资产、版本标签、升级提示混乱风险。

### 待合并但有明显推进价值的 PR

- [PR #134919](https://github.com/NousResearch/hermes-agent/pull/134919) / [PR #134907](https://github.com/NousResearch/hermes-agent/pull/134907)  
  均指向 named profile scratch 目录不会被清理的问题，关联 [Issue #134896](https://github.com/NousResearch/hermes-agent/issues/134896)。  
  **价值**：避免长期使用命名 profile 时磁盘被 scratch 文件填满。

- [PR #134918](https://github.com/NousResearch/hermes-agent/pull/134918)  
  修复 streaming usage 中尾部 billing-only usage frame 覆盖真实 token 计数的问题。  
  **价值**：直接影响费用统计、上下文用量展示和用户对 billing 的信任。

- [PR #134903](https://github.com/NousResearch/hermes-agent/pull/134903)  
  修复 Electron Linux GPU recovery handler 匹配错误的 `launch-failure` 字符串，应为 `launch-failed`。  
  **价值**：提升 Linux Desktop 在 GPU 启动失败场景下的恢复能力，关联 [Issue #134888](https://github.com/NousResearch/hermes-agent/issues/134888)。

- [PR #134900](https://github.com/NousResearch/hermes-agent/pull/134900)  
  修复 `hermes doctor` 对 provider profiles 中 slash-form model IDs 的误报。  
  **价值**：减少配置误报，改善第三方 provider/plugin 用户体验。

- [PR #134894](https://github.com/NousResearch/hermes-agent/pull/134894)  
  修复 delegation output validation 对 JSON string 的错误截取。  
  **价值**：提升 delegate tool 输出合约稳定性，减少不必要的 child retry。

---

## 4. 社区热点

### 1. Stock config 出现误报 warning

- [Issue #134822](https://github.com/NousResearch/hermes-agent/issues/134822)  
  **Two false-positive config warnings on a stock config.yaml**  
  评论数：3，状态：Open  
  用户报告在 Windows 11 Desktop → `tui_gateway` 后端中，默认 `config.yaml` 会产生两条 false-positive warning。虽然功能不受影响，但造成 log noise。  
  **背后诉求**：用户希望默认配置应“零噪音”，尤其是 Desktop/TUI 这种面向终端用户的入口。配置检查器需要区分真实风险与可接受默认值。

### 2. OAuth MCP 长连接重连后 session 永久失效

- [Issue #134861](https://github.com/NousResearch/hermes-agent/issues/134861)  
  **Long-lived gateway's OAuth MCP session dies permanently on keepalive-reconnect**  
  评论数：2，状态：Closed  
  长时间运行的 `hermes gateway` 在 SSE keepalive 触发 reconnect 后，OAuth MCP server 的 agent-facing session 失效，后续工具调用全部返回 `MCP server '<name>' is not connected`。  
  **背后诉求**：MCP/OAuth 工具连接必须支持长期运行和自动恢复，不能因为 keepalive reconnect 进入不可恢复状态。该问题已关闭，可能被标记为 duplicate 或已有修复路径。

### 3. Solstice provider plugin 缺少 httpx，频繁污染终端

- [Issue #134789](https://github.com/NousResearch/hermes-agent/issues/134789)  
  **PM worker prints solstice provider warning into user terminals**  
  评论数：2，状态：Open

- [Issue #134765](https://github.com/NousResearch/hermes-agent/issues/134765)  
  **Bundled solstice provider plugin fails to load — No module named 'httpx'**  
  评论数：2，状态：Open

  两个 issue 都指向 bundled `solstice` provider plugin 在运行时缺少 `httpx`，并且 warning 会被打印进用户 live terminal panes。  
  **背后诉求**：插件 runtime 依赖应与主环境隔离且完整；后台 worker 不应污染用户交互终端。该问题影响 CLI、TUI、plugins、install/update 多个路径。

### 4. 会话状态与消息传递问题持续成为焦点

- [Issue #134898](https://github.com/NousResearch/hermes-agent/issues/134898)  
  **message_agent delivery stops when sender's TUI session closes**  
  状态：Open  
  `message_agent` 后台投递进程由 sender session 拥有；当远程 TUI client 断开后，约 20 秒后 session 被关闭，投递进程随之消失，recipient 不会回复。  
  **背后诉求**：跨 agent 消息投递应独立于前端 session 生命周期，需要 durable queue 或 gateway-owned runtime。

- [Issue #134889](https://github.com/NousResearch/hermes-agent/issues/134889)  
  **Tracking: one gateway owns every local session (#106742)**  
  状态：Open  
  这是统一 gateway runtime 的 tracking issue，目标是让 CLI、TUI、Desktop、API、ACP、bots、cron、Kanban 等本地入口共享 gateway-owned session、FIFO、durable queue 和 writer。  
  **背后诉求**：当前多入口 session ownership 分散，导致消息投递、持久化、压缩、profile 切换等场景容易出现状态不一致。该 tracking issue 是路线图级别信号。

---

## 5. Bug 与稳定性

以下按严重程度和影响范围排序。

### P1 / 高优先级

#### Cron no-agent daily job 被 scheduler 静默跳过

- [Issue #134858](https://github.com/NousResearch/hermes-agent/issues/134858)  
  **Cron: no-agent daily job silently skipped at scheduler level**  
  状态：Open  
  一个 `no_agent=True` 的 daily script job 连续三天被 scheduler 层跳过，没有 `executions.db` 记录，也没有 fire lock，而同级任务正常触发。  
  **风险**：自动化可靠性受损，尤其是定时任务、无人值守脚本、运维工作流。  
  **已知 fix PR**：当前数据中未看到直接关联修复 PR。  
  **建议优先级**：最高。需要确认 cron scheduler 的触发判断、fire lock 创建、timezone/DST、job recovery 逻辑。

#### Session persistence 重复插入 restored messages

- [Issue #134800](https://github.com/NousResearch/hermes-agent/issues/134800)  
  **Restored messages re-INSERTed by the append-only flush**  
  状态：Open  
  从 durable rows 重建的 message dict 在 flush 时再次插入 `state.db`，导致同一 `message_uid` 出现 2-N 次，生产环境已有 24k+ shadow rows。  
  **风险**：数据库膨胀、历史消息重复、上下文构建错误、成本统计偏差。  
  **已知 fix PR**：当前数据中未看到直接关联修复 PR。  
  **建议优先级**：最高。该问题触及 session durable store 的核心一致性。

#### macOS Desktop update 误判已有更新进程

- [PR #134892](https://github.com/NousResearch/hermes-agent/pull/134892)  
  **fix(update): a whole-second claim on our own pid is our incarnation**  
  状态：Open  
  macOS Desktop 发起更新时可能误报 “Another Hermes update is already running”。  
  **风险**：阻断用户升级，尤其是 Desktop 用户。  
  **修复状态**：已有 PR，建议尽快 review/merge。

### P2 / 中高优先级

#### OAuth MCP session keepalive reconnect 后永久断开

- [Issue #134861](https://github.com/NousResearch/hermes-agent/issues/134861)  
  状态：Closed  
  **风险**：MCP 工具长期运行稳定性下降。  
  **修复状态**：Issue 已关闭，可能重复或已有修复路径，但建议在 release notes 中标注相关修复。

#### Custom provider 下 model 等于 provider name 会创建 dead session

- [Issue #134899](https://github.com/NousResearch/hermes-agent/issues/134899)  
  状态：Closed  
  TUI session 使用 `model=myproxy`、`provider=custom:myproxy` 时 session 创建成功，但每轮请求因 provider 返回 unknown model 失败。  
  **风险**：用户会看到 session 被创建但不可用，产生“死会话”。  
  **修复状态**：Issue 已关闭，需确认是否已有合并修复。

#### Anthropic workspace API key 被误判为 OAuth token

- [Issue #134897](https://github.com/NousResearch/hermes-agent/issues/134897)  
  状态：Open  
  `sk-ant-usr-...` 被 `_is_oauth_token()` 误判为 OAuth/setup token，导致请求以 Claude Code identity 计费并失败。  
  **风险**：认证、计费、安全边界三重问题。  
  **已知 fix PR**：当前数据中未看到直接修复 PR。  
  **建议**：尽快修正 Anthropic key 分类逻辑，并补充 workspace API key 测试样例。

#### Windows updater 因 gateway service ownership 判断失败而中止

- [Issue #134880](https://github.com/NousResearch/hermes-agent/issues/134880)  
  状态：Open  
  Windows `hermes update` 在进程视图被过滤时，把 live gateway 读成 `psutil.NoSuchProcess`，导致更新前直接 abort。  
  **风险**：Windows 更新可靠性问题。  
  **可能相关 PR**：  
  - [PR #134911](https://github.com/NousResearch/hermes-agent/pull/134911)  
  - [PR #134916](https://github.com/NousResearch/hermes-agent/pull/134916)  
  但这两个 PR 更偏向 relaunch waiter 诊断，不一定直接修复 SCM ownership 判断。

#### SQLite header 出现 TLS-shaped corruption

- [Issue #134866](https://github.com/NousResearch/hermes-agent/issues/134866)  
  状态：Open，needs-repro  
  四类数据库文件反复出现 offset 5 为 `17 03 03 00 13` 的 TLS-like record header corruption。  
  **风险**：非常严重的数据完整性问题，但 writer 尚未定位。  
  **已知 fix PR**：无。  
  **建议**：需要优先增加写入路径审计、fsync/atomic rename 检查、数据库打开模式日志、损坏样本保护机制。

#### Desktop queued image+caption 在 profile 切换后丢失

- [Issue #134914](https://github.com/NousResearch/hermes-agent/issues/134914)  
  状态：Open，needs-repro  
  用户在 busy turn 中排队 image+caption，切换 profile 后返回，队列为空，caption 未进入 conversation，但 PNG 文件仍在 attachments 目录。  
  **风险**：多模态消息投递和 profile 切换状态一致性问题。  
  **已知 fix PR**：无。

#### Linux GPU recovery handler 匹配错误

- [Issue #134888](https://github.com/NousResearch/hermes-agent/issues/134888)  
  状态：Open  
  Electron emits `launch-failed`，但代码匹配 `launch-failure`，导致 Linux GPU fallback 不生效。  
  **修复 PR**：[PR #134903](https://github.com/NousResearch/hermes-agent/pull/134903)  
  **建议**：该修复明确、低风险，应尽快合并。

#### Scratch dir 仅清理 default home，named profiles 不清理

- [Issue #134896](https://github.com/NousResearch/hermes-agent/issues/134896)  
  状态：Open  
  `hermes -p <profile>` 下 profile home 的 scratch 目录不会被 prune，可能无限增长。  
  **修复 PR**：  
  - [PR #134919](https://github.com/NousResearch/hermes-agent/pull/134919)  
  - [PR #134907](https://github.com/NousResearch/hermes-agent/pull/134907)  
  **建议**：两个 PR 功能重叠，需要维护者选择一个 canonical 实现，避免并行修复冲突。

#### CLI oneshot 使用 memory toolset 后无法退出

- [Issue #134831](https://github.com/NousResearch/hermes-agent/issues/134831)  
  状态：Open  
  `hermes chat --oneshot` 在默认 toolset 或 `-t memory` 下输出答案后卡在 Honcho shutdown thread join。  
  **风险**：CLI 自动化、脚本调用、CI 集成会被 hang。  
  **已知 fix PR**：无。

#### Tool / skill 安全与可靠性问题

- [Issue #134910](https://github.com/NousResearch/hermes-agent/issues/134910)  
  `minecraft-modpack-server` backup 脚本在 `tar` 失败后仍报告成功并删除旧备份。  
  **风险**：备份数据丢失。

- [Issue #134909](https://github.com/NousResearch/hermes-agent/issues/134909)  
  `oss-forensics` skill 的“Log them internally only”可能导致原始凭据进入普通工作文件并被归档。  
  **风险**：安全边界与敏感信息泄漏。

- [Issue #134805](https://github.com/NousResearch/hermes-agent/issues/134805)  
  `hermes skills install <owner/repo/skill>` 在官方 optional skill 同名时静默安装官方 skill。  
  **风险**：供应链混淆、用户意图被覆盖。

### P3 / 体验与兼容性问题

- [Issue #134822](https://github.com/NousResearch/hermes-agent/issues/134822)  
  默认配置 false-positive warning。

- [Issue #134789](https://github.com/NousResearch/hermes-agent/issues/134789) / [Issue #134765](https://github.com/NousResearch/hermes-agent/issues/134765)  
  Solstice provider 缺少 `httpx` 并污染终端输出。

- [Issue #134855](https://github.com/NousResearch/hermes-agent/issues/134855)  
  Windows Desktop 下载 `MEDIA:` card 时 `/C:/...` 路径无法解析。

- [Issue #134837](https://github.com/NousResearch/hermes-agent/issues/134837)  
  gateway log timestamp 与 OS timezone 偏移。

- [Issue #134864](https://github.com/NousResearch/hermes-agent/issues/134864)  
  MoA preset 名称含空格时从 model picker 中消失。

- [Issue #134876](https://github.com/NousResearch/hermes-agent/issues/134876)  
  Desktop 冷恢复时 model pill 暂时显示 stale composer pick。

- [Issue #134915](https://github.com/NousResearch/hermes-agent/issues/134915)  
  Desktop Context Usage 对 stored reasoning 的 Conversation 类别仍可能 over-bill。

---

## 6. 功能请求与路线图信号

### 统一 Gateway Runtime 是最强路线图信号

- [Issue #134889](https://github.com/NousResearch/hermes-agent/issues/134889)  
  **Tracking: one gateway owns every local session (#106742)**  
  该 tracking issue 涉及 CLI、TUI、Desktop、API/Responses、ACP、bots、cron、Kanban 等所有本地入口。  
  **判断**：这是今天最重要的架构级信号。大量 session-state、message-delivery、profile 切换、队列丢失、SQLite writer 归属问题，都可能通过统一 gateway-owned runtime 得到系统性缓解。  
  **纳入下一版本可能性**：中高，但取决于 #106742 的测试与 gate 状态。此类架构变更风险较高，可能先进入 canary。

### Desktop 更新提示希望改为 release/cadence-based

- [Issue #134836](https://github.com/NousResearch/hermes-agent/issues/134836)  
  **Update prompt is effectively always-on**  
  用户认为只要 upstream 有一个 commit 就提示更新，体验负面；希望改为基于 release 或 cadence 的更新提示，并提供真正的 “don’t ask again”。  
  **判断**：这属于产品体验改善，且与近期大量 update 失败问题强相关。  
  **纳入下一版本可能性**：中等。若维护者希望降低 Desktop 用户挫败感，该需求应被优先考虑。

### WhatsApp Agent Platform 文档补齐

- [Issue #134867](https://github.com/NousResearch/hermes-agent/issues/134867)  
  当前 WhatsApp 文档主要引导 Baileys phone linking 和 Business Cloud API，但 Hermes 已有 WhatsApp Agent Platform catalog route。  
  **判断**：文档缺口会直接影响新用户接入。  
  **纳入下一版本可能性**：较高，属于低风险文档修复。

### PR CI 触发和 review workflow 文档

- [Issue #134902](https://github.com/NousResearch/hermes-agent/issues/134902)  
- [PR #134901](https://github.com/NousResearch/hermes-agent/pull/134901)  
  说明外部贡献者为什么 PR 可能没有 CI checks，以及 maintainer 如何触发 workflow。  
  **判断**：对开源协作健康度有帮助。  
  **纳入下一版本可能性**：高，文档 PR 风险低。

### 插件目录扩展

- [PR #134904](https://github.com/NousResearch/hermes-agent/pull/134904)  
  新增 `nowstamp` plugin。

- [PR #134920](https://github.com/NousResearch/hermes-agent/pull/134920)  
  为 OpenViking catalog 使用 social image。

  **判断**：Plugin Catalog 仍在持续扩充，但多个 PR 带有 duplicate 标签，需要维护者整理目录规范和重复提交策略。  
  **纳入下一版本可能性**：中等。

---

## 7. 用户反馈摘要

### 用户最不满意的点

1. **更新流程频繁失败或干扰体验**  
   Windows、macOS、Desktop 更新相关问题密集出现：  
   - [Issue #134880](https://github.com/NousResearch/hermes-agent/issues/134880) Windows updater SCM ownership 判断失败  
   - [Issue #134836](https://github.com/NousResearch/hermes-agent/issues/134836) 更新提示过于频繁  
   - [PR #134892](https://github.com/NousResearch/hermes-agent/pull/134892) macOS update lock 误判  
   用户痛点不是单个 bug，而是“更新入口不可信”：提示频繁、路径可能失败、失败信息不足。

2. **Session 生命周期和消息投递不稳定**  
   代表问题：  
   - [Issue #134898](https://github.com/NousResearch/hermes-agent/issues/134898) sender TUI session 关闭后 `message_agent` 投递中断  
   - [Issue #134914](https://github.com/NousResearch/hermes-agent/issues/134914) profile 切换后 image+caption queue 消失  
   - [Issue #134800](https://github.com/NousResearch/hermes-agent/issues/134800) restored messages 重复插入  
   用户期望 agent 消息、队列、会话历史不依赖前端连接状态，尤其是在 Desktop/TUI/gateway 多入口共存时。

3. **默认配置和诊断输出噪音过多**  
   代表问题：  
   - [Issue #134822](https://github.com/NousResearch/hermes-agent/issues/134822) stock config warning 误报  
   - [Issue #134789](https://github.com/NousResearch/hermes-agent/issues/134789) PM worker warning 打进终端  
   - [Issue #134900](https://github.com/NousResearch/hermes-agent/pull/134900) doctor 对 slash model IDs 误报  
   用户希望 Hermes 的诊断系统更精准，不要把正常配置、第三方 provider 或后台插件问题变成用户终端里的持续噪音。

4. **插件和 skill 安装/运行存在信任问题**  
   - [Issue #134805](https://github.com/NousResearch/hermes-agent/issues/134805) full identifier 安装第三方 skill 时被官方同名 skill 覆盖  
   - [Issue #134909](https://github.com/NousResearch/hermes-agent/issues/134909) forensics skill 可能保留原始凭据  
   - [Issue #134910](https://github.com/NousResearch/hermes-agent/issues/134910) backup script 失败仍报成功并 prune 旧备份  
   这些问题说明用户已经开始把 Hermes skill 用在更真实的运维、安全、备份场景中，对安全边界和可靠性的要求显著提高。

### 用户使用场景信号

- Windows Desktop 用户占比和问题密度较高，更新、路径、ANSI、MEDIA download、gateway service ownership 都有报告。
- macOS Desktop 用户关注 profile 切换、多模态队列、update handoff。
- Linux Desktop 用户关注 GPU fallback。
- CLI 自动化用户关注 oneshot 退出、cron job 可靠性、Kanban idempotency、scratch prune。
- 高级用户正在使用 custom providers、Anthropic workspace keys、OpenAI-compatible relays、Kimi aux models、MCP OAuth servers，说明 provider 生态正在变复杂。

---

## 8. 待处理积压

由于本日报仅覆盖过去 24 小时数据，无法完整判断“长期未响应”状态。以下是今日数据中仍处于 Open、影响面较大、建议维护者优先分流的积压项。

### 必须优先 triage

1. [Issue #134858](https://github.com/NousResearch/hermes-agent/issues/134858)  
   **Cron no-agent daily job silently skipped**  
   P1，自动化核心可靠性问题，目前未见直接 fix PR。

2. [Issue #134800](https://github.com/NousResearch/hermes-agent/issues/134800)  
   **Restored messages re-INSERTed by append-only flush**  
   P1，session persistence 数据一致性问题，已有生产环境 24k+ shadow rows。

3. [Issue #134866](https://github.com/NousResearch/hermes-agent/issues/134866)  
   **SQLite header corruption across four stores**  
   P2，数据损坏风险高，即使 needs-repro，也应先增加写入归因日志和损坏保护。

4. [Issue #134897](https://github.com/NousResearch/hermes-agent/issues/134897)  
   **Anthropic workspace API keys misclassified as OAuth tokens**  
   P2，涉及 auth、billing、安全边界，建议快速修复 key classifier。

5. [Issue #134898](https://github.com/NousResearch/hermes-agent/issues/134898)  
   **message_agent delivery stops when sender TUI session closes**  
   P2，直接关联统一 gateway runtime 路线图，应与 [Issue #134889](https://github.com/NousResearch/hermes-agent/issues/134889) 一并处理。

### 有修复 PR，等待维护者决策 / 合并

1. [Issue #134896](https://github.com/NousResearch/hermes-agent/issues/134896)  
   对应：  
   - [PR #134919](https://github.com/NousResearch/hermes-agent/pull/134919)  
   - [PR #134907](https://github.com/NousResearch/hermes-agent/pull/134907)  
   两个 PR 解决同一 scratch prune 问题，需要去重并选择一个实现。

2. [Issue #134888](https://github.com/NousResearch/hermes-agent/issues/134888)  
   对应：[PR #134903](https://github.com/NousResearch/hermes-agent/pull/134903)  
   Electron reason string 修复明确，建议快速合并。

3. [Issue #134902](https://github.com/NousResearch/hermes-agent/issues/134902)  
   对应：[PR #134901](https://github.com/NousResearch/hermes-agent/pull/134901)  
   文档改进低风险，建议合并改善贡献者体验。

4. [Issue #134836](https://github.com/NousResearch/hermes-agent/issues/134836)  
   暂未见直接 PR。鉴于更新相关问题较多，建议建立 update UX tracking issue 或将其纳入 Desktop update roadmap。

---

## 项目健康度评估

**总体健康度：活跃但承压。**

- **活跃度**：非常高。24 小时内 50 条 Issue 更新、50 条 PR 更新，说明社区和维护者都高度活跃。
- **响应速度**：较好。多个 bug 在当天已有 PR 跟进，尤其是 update、TUI、scratch、GPU fallback、billing usage。
- **稳定性压力**：偏高。P1/P2 问题集中在 session persistence、cron、数据库完整性、auth/billing、update 流程，这些都属于用户信任关键路径。
- **路线图清晰度**：正在增强。统一 gateway runtime 的 tracking issue 是重要架构信号，有望系统性解决多入口 session ownership 问题。
- **维护建议**：短期应优先处理 P1/P2 数据一致性与自动化可靠性问题；中期应收敛 Desktop update 体验和 session ownership 架构；同时需要对重复 PR、duplicate issue、插件目录提交建立更清晰的 triage 机制。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报  
**日期：2026-10-08**  
**仓库：** github.com/qwibitai/nanoclaw  

---

## 1. 今日速览

过去 24 小时，NanoClaw 项目整体活跃度偏低：没有新的 Issue、没有 Issue 关闭，也没有新版本发布。  
今日唯一更新来自 1 个开放中的 Pull Request，聚焦于 **channel adapter 在网络故障后无法重新启动** 的稳定性问题。  
从变更性质看，项目今日没有明显功能推进，但出现了一个对长期运行稳定性较关键的修复提案。  
当前维护重点更偏向 **运行时可靠性与故障恢复能力**，而非新功能扩展。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

过去 24 小时没有 PR 被合并或关闭，因此主分支尚未产生可确认的功能或修复推进。

当前值得关注的开放 PR：

### PR #4055 — 修复 channel setup 持续失败后不会重新 arm 的问题  
- **状态：** Open  
- **作者：** jsboige  
- **创建时间：** 2026-10-07  
- **链接：** https://github.com/qwibitai/nanoclaw/pull/4055  
- **范围：** `area/channels`  
- **类型：** 稳定性修复 / 故障恢复增强  

该 PR 指出，当前 `initChannelAdapters` 在 `adapter.setup()` 失败时，只会按照内联的 `SETUP_RETRY_DELAYS_MS` 进行有限重试，延迟为 2s / 5s / 10s，总计约 17 秒。若网络抖动或外部服务不可用时间超过该窗口，系统会记录 `Failed to start channel adapter`，随后放弃该 channel，直到进程重启前都不会再次尝试恢复。

这意味着在长时间运行的部署环境中，临时网络故障可能导致某些 channel 永久失效。该 PR 试图解决的是 **失败后的重新 arm / 恢复机制缺失** 问题，对生产环境稳定性有实际价值。

---

## 4. 社区热点

今日最值得关注的讨论集中在以下 PR：

### PR #4055 — channel adapter 网络失败后的恢复机制  
- **链接：** https://github.com/qwibitai/nanoclaw/pull/4055  
- **评论数：** 数据未提供  
- **点赞 / 反应：** 0  
- **状态：** Open  

该 PR 虽然没有明显的社区反应数据，但从问题描述看，它触及的是服务长期运行中的恢复能力：  
- 用户或部署方可能在网络短暂异常后发现某些 channel 不再工作；  
- 当前系统缺少持续健康检查或后台重试机制；  
- 需要避免因一次启动期故障导致 channel 在整个进程生命周期中不可用。  

背后的诉求是：**NanoClaw 的 channel 子系统需要具备更强的自愈能力，而不是仅依赖启动阶段的有限重试。**

---

## 5. Bug 与稳定性

### 高优先级：channel adapter setup 失败后永久停用  
- **相关 PR：** https://github.com/qwibitai/nanoclaw/pull/4055  
- **状态：** 已有 fix PR，待合并  
- **影响范围：** channels / adapter setup / 网络故障恢复  
- **严重程度：** 高  

问题表现为：  
当 `adapter.setup()` 因网络波动、依赖服务暂时不可用或启动顺序问题失败时，NanoClaw 只会执行一轮固定预算的重试。若这轮重试结束后仍失败，该 channel 会被放弃，进程运行期间不会自动恢复。

潜在影响：  
- channel 在进程生命周期内持续不可用；  
- 需要人工重启服务才能恢复；  
- 对生产环境、长时间运行的 bot / agent 服务影响较大；  
- 可能导致消息通道、外部集成或任务入口不可用。  

当前已有修复 PR，但尚未合并。维护者应优先 review 该 PR，重点关注：  
- 是否引入无限重试或过度重试风险；  
- 是否有 backoff、jitter、最大间隔等控制；  
- 是否暴露可观测性指标或日志；  
- 是否会影响已有 channel adapter 的生命周期语义。

---

## 6. 功能请求与路线图信号

过去 24 小时没有新的 Issue，因此没有明确的用户功能请求。

不过 PR #4055 释放出一个明显的路线图信号：  
NanoClaw 的 channel 系统可能需要进一步增强 **运行时自愈能力**，包括：

- channel adapter 健康检查；
- setup 失败后的后台重试；
- 网络异常后的自动恢复；
- channel 状态可观测性；
- 更细粒度的故障日志与告警信号。

如果该 PR 被接受，后续版本可能会继续围绕 channel 层的可靠性进行增强。

相关链接：  
- https://github.com/qwibitai/nanoclaw/pull/4055  

---

## 7. 用户反馈摘要

过去 24 小时没有新的 Issue 评论数据，因此无法提炼直接的用户反馈。

从 PR #4055 的问题描述可以间接看出一个潜在用户痛点：

- **痛点：** 网络故障或依赖服务短暂不可用后，channel 可能无法自动恢复。  
- **使用场景：** 长时间运行的 AI agent、消息通道集成、外部平台适配器、生产环境服务。  
- **不满意点：** 当前恢复机制过度依赖启动时的短窗口重试，一旦错过恢复窗口，需要人工干预或重启进程。  
- **期望：** 系统应具备后台重试、自愈和可观测能力。

相关链接：  
- https://github.com/qwibitai/nanoclaw/pull/4055  

---

## 8. 待处理积压

当前数据集中未提供长期未响应的 Issue 或 PR，因此无法判断是否存在历史积压。

今日需要维护者优先关注的待处理项：

### PR #4055 — channel adapter 自动恢复修复  
- **链接：** https://github.com/qwibitai/nanoclaw/pull/4055  
- **状态：** Open  
- **建议优先级：** 高  

建议维护者尽快 review，该 PR 涉及运行时可靠性，尤其对生产部署和长连接 channel 场景较重要。合并前建议补充或确认以下内容：

1. 是否有测试覆盖 setup 失败后重新尝试的行为；  
2. 是否避免 tight loop 或无限频繁重试；  
3. 是否支持日志、指标或状态暴露；  
4. 是否兼容现有 adapter 的生命周期管理；  
5. 是否需要配置项控制 retry 策略。  

---

## 项目健康度小结

- **活跃度：** 低  
- **发布节奏：** 今日无发布  
- **问题流入：** 无新增 Issue  
- **维护重点：** channel 子系统稳定性  
- **风险点：** channel adapter 当前可能在网络异常后永久失效  
- **建议动作：** 优先 review 并验证 PR #4055，确保修复具备可控的重试策略和测试覆盖。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报｜2026-10-08

## 1. 今日速览

过去 24 小时，NullClaw 项目整体活跃度较低：没有新的 Issue 更新，也没有版本发布。  
今日唯一新增动态来自 1 个开放中的 Pull Request，聚焦于 **Gateway 入站消息发布机制的稳定性修复**。  
该 PR 指向一个潜在的高影响稳定性问题：当 inbound bus 饱和时，Gateway accept loop 可能被阻塞，进而影响 webhook 消息接入能力。  
从数据看，今日社区讨论热度较低，但代码层面出现了一个值得维护者优先关注的可靠性修复。

---

## 3. 项目进展

### 待合并 PR

#### [PR #1047 - fix(gateway): bound inbound bus publish instead of blocking the accept loop](https://github.com/nullclaw/nullclaw/pull/1047)

- **状态**：OPEN
- **作者**：addadi
- **创建时间**：2026-10-07
- **更新时间**：2026-10-07
- **评论数**：数据未提供
- **反应数**：👍 0

该 PR 修复 Gateway 单线程 accept loop 在 inbound bus 满载时可能被阻塞的问题。

根据 PR 摘要，当前 Gateway 在处理 webhook 消息时使用 `Bus.publishInbound` 向入站队列发布消息。该方法在队列满时会在 `not_full.wait` 上阻塞。由于 inbound queue 容量为 100，而 agent workers 可能同步执行较长 turn，当系统负载升高时，队列容易饱和，导致 Gateway accept loop 无法继续接收新的 webhook 请求。

该修复的意义主要体现在：

- 降低 webhook 接入路径被长任务拖垮的风险
- 避免单线程 accept loop 因队列满而无限阻塞
- 提升高负载场景下 Gateway 的可用性和系统韧性
- 为后续更稳定的 backpressure / queue handling 机制打基础

目前该 PR 尚未合并，因此今日项目在主分支层面的实际推进有限，但它代表了一个重要的稳定性改进方向。

---

## 4. 社区热点

### 今日最值得关注的讨论 / 变更

#### [PR #1047 - Gateway inbound bus 阻塞修复](https://github.com/nullclaw/nullclaw/pull/1047)

该 PR 是今日唯一有更新的 Pull Request，因此也是今日最主要的项目热点。

背后的核心诉求是：  
在 NullClaw 作为 AI agent / personal assistant 平台接入外部 webhook 或消息入口时，Gateway 需要具备良好的并发与负载承受能力。若入站消息发布过程会阻塞 accept loop，则在 agent workers 长时间处理任务时，系统可能出现请求堆积、响应延迟甚至接入不可用的问题。

这类问题通常对实际部署用户影响较大，尤其是：

- webhook 请求量较高的部署场景
- agent turn 执行时间较长的场景
- worker 数量不足或任务同步阻塞明显的场景
- 需要稳定接入 Telegram、Slack、Discord、HTTP webhook 等外部入口的场景

目前没有可见评论和社区反应数据，因此无法判断讨论热度，但从技术影响面看，该 PR 值得维护者优先 review。

---

## 5. Bug 与稳定性

### 高严重程度

#### Gateway accept loop 可能因 inbound bus 满载而阻塞

- **相关 PR**：[PR #1047](https://github.com/nullclaw/nullclaw/pull/1047)
- **状态**：已有 fix PR，尚未合并
- **影响范围**：Gateway / webhook 接入 / inbound message bus
- **严重程度评估**：高

问题描述：

当前 Gateway accept loop 使用无界或阻塞式的 `Bus.publishInbound` 发布 webhook 消息。当 inbound queue 达到容量上限，例如摘要中提到的 100 条时，发布逻辑会等待 `not_full.wait`。如果 agent workers 正在同步执行耗时 turn，消费速度下降，队列持续满载，Gateway accept loop 就可能被长期阻塞。

潜在影响：

- 新 webhook 请求无法及时进入系统
- Gateway 吞吐量下降
- 高负载下出现请求超时或消息延迟
- 单线程 accept loop 成为系统瓶颈
- 外部集成体验下降

修复进展：

- 已有 PR 提出修复方案：[PR #1047](https://github.com/nullclaw/nullclaw/pull/1047)
- 当前状态仍为 OPEN，尚未确认是否已完成 review、测试或合并

维护建议：

- 优先 review 该 PR
- 检查是否存在类似的 blocking publish 路径
- 增加高负载 / 队列饱和情况下的回归测试
- 明确 inbound bus 满载时的策略：丢弃、限流、返回错误、异步缓冲或 backpressure

---

## 6. 功能请求与路线图信号

过去 24 小时没有新的 Issue，因此没有直接来自用户的新功能请求。

不过，从 [PR #1047](https://github.com/nullclaw/nullclaw/pull/1047) 可以观察到一个重要的路线图信号：

### 可靠性与 backpressure 机制可能成为近期重点

该 PR 虽然是 bugfix，但反映出项目在真实负载场景下需要更明确的消息队列策略，包括：

- inbound queue 满载时如何处理新消息
- Gateway 是否应避免阻塞式操作
- 是否需要非阻塞 publish API
- 是否需要可观测性指标，例如 queue depth、dropped messages、publish latency
- 是否需要为不同入口配置独立限流策略

这些方向很可能影响后续版本中的 Gateway 架构、消息总线设计和部署建议。

---

## 7. 用户反馈摘要

过去 24 小时没有 Issue 评论数据，也没有可见的用户反馈内容，因此无法直接提炼来自社区的真实用户痛点。

但从今日 PR 描述可以间接看出以下使用场景和潜在痛点：

- 用户可能在 webhook 高并发或突发流量下遇到 Gateway 卡住的问题
- agent workers 长时间同步处理任务会放大 inbound queue 饱和风险
- 当前系统对队列满载场景的处理可能不够显式，容易导致运维侧难以定位问题
- 部署用户可能需要更好的稳定性保障，而不只是功能可用

建议维护者在合并相关修复后，补充说明：

- 该问题影响哪些版本
- 是否需要用户升级配置
- 队列满载后系统的新行为是什么
- 是否存在消息丢失、拒绝或延迟风险

---

## 8. 待处理积压

基于今日提供的数据，过去 24 小时内没有长期未响应的 Issue 或 PR 信息可供判断。

当前唯一需要关注的待处理项是：

#### [PR #1047 - Gateway inbound bus 阻塞修复](https://github.com/nullclaw/nullclaw/pull/1047)

- **状态**：OPEN
- **优先级建议**：高
- **原因**：涉及 Gateway 接入路径稳定性，可能影响生产环境 webhook 接收能力
- **建议动作**：
  - 尽快进行代码 review
  - 验证队列满载场景下不会阻塞 accept loop
  - 补充压力测试或回归测试
  - 明确该修复是否需要进入下一个 patch release

---

## 项目健康度评估

| 维度 | 今日状态 | 评估 |
|---|---:|---|
| Issue 活跃度 | 0 条更新 | 较低 |
| PR 活跃度 | 1 条开放 PR | 低到中等 |
| Release 活跃度 | 0 个新版本 | 无发布 |
| 稳定性风险 | 发现 Gateway 阻塞问题 | 需关注 |
| 社区讨论热度 | 无可见评论数据 | 较低 |
| 维护优先级 | PR #1047 | 高 |

**总体判断**：  
NullClaw 今日整体社区活跃度较低，但出现了一个重要的 Gateway 稳定性修复 PR。该问题可能影响高负载 webhook 接入场景，建议维护者优先 review 并尽快合入，以降低生产部署中的阻塞风险。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报  
**日期：2026-10-08**  
**仓库：** github.com/nearai/ironclaw

---

## 1. 今日速览

过去 24 小时，IronClaw 项目整体活跃度较低：没有新的 Issue 更新，也没有版本发布，仅有 1 个待合并 PR 更新。  
今日唯一动态来自 Dependabot 自动提交的依赖升级 PR，目标是将 `/tests/e2e` 中的 `urllib3` 从 `2.7.0` 升级到 `2.8.0`。  
从数据看，今天没有用户侧 Bug 报告、功能请求或社区讨论，项目处于维护型低波动状态。  
当前健康度信号偏稳定：未出现回归、崩溃或高优先级问题，但也缺少功能开发或路线图层面的明显推进。

---

## 2. 项目进展

### 待合并 PR

#### [PR #8128 chore(deps): bump urllib3 from 2.7.0 to 2.8.0 in /tests/e2e](https://github.com/nearai/ironclaw/pull/8128)

- **状态：** OPEN  
- **作者：** dependabot[bot]  
- **类型：** 依赖维护 / Python 测试环境  
- **影响范围：** `/tests/e2e`  
- **更新内容：**
  - 将 `urllib3` 从 `2.7.0` 升级到 `2.8.0`
  - 属于自动化依赖升级，主要影响端到端测试依赖链
- **项目推进评估：**
  - 该 PR 不涉及核心功能变更，也未体现用户可见能力提升。
  - 若 CI 通过并合并，可提升测试依赖的新鲜度，降低未来依赖滞后带来的维护成本。
  - 对项目整体推进幅度较小，属于常规维护更新。

今日没有已合并或已关闭的重要 PR，因此暂无实质性功能推进或 Bug 修复落地。

---

## 3. 社区热点

### 今日唯一活跃 PR

#### [PR #8128 chore(deps): bump urllib3 from 2.7.0 to 2.8.0 in /tests/e2e](https://github.com/nearai/ironclaw/pull/8128)

- **评论数：** 未提供 / 暂无明显讨论  
- **反应数：** 👍 0  
- **活跃来源：** Dependabot 自动更新  
- **热点程度：** 低

**分析：**  
该 PR 是自动依赖升级，并非社区用户主动提出的问题或功能请求。当前没有评论和反应，说明它尚未引发维护者或用户讨论。  
从项目治理角度看，这类 PR 的价值主要在于保持依赖链更新，尤其是 `urllib3` 这类底层 HTTP 客户端库，可能与安全性、兼容性和测试稳定性相关。

---

## 4. Bug 与稳定性

过去 24 小时没有新的 Issue 报告，因此未观察到新的 Bug、崩溃、回归或稳定性问题。

### 当前已知稳定性动态

#### [PR #8128 urllib3 2.7.0 → 2.8.0](https://github.com/nearai/ironclaw/pull/8128)

- **类型：** 依赖升级  
- **严重程度：** 低  
- **是否已有 fix PR：** 是，即该 PR 本身  
- **潜在稳定性影响：**
  - 可能改善测试环境对上游 HTTP 库的兼容性。
  - 也可能引入依赖行为变化，需要依赖 CI 或 e2e 测试验证。
- **建议：**
  - 合并前确认端到端测试通过。
  - 若项目中存在锁文件，应确认 `uv` / Python 依赖解析结果符合预期。
  - 若 IronClaw 测试环境中存在网络请求、代理、TLS 或重试逻辑，应重点关注 `urllib3` 行为变化。

---

## 5. 功能请求与路线图信号

过去 24 小时没有新的功能请求 Issue，也没有与产品路线图相关的 PR 或讨论。

### 可观察信号

- 今日唯一 PR 是依赖升级：[PR #8128](https://github.com/nearai/ironclaw/pull/8128)
- 不涉及新功能、API 变化、智能体能力增强、个人 AI 助手交互体验或模型集成改进。
- 暂无证据表明该更新会进入下一版本的功能性变更列表。

**判断：**  
下一版本若近期发布，该 PR 更可能被归类为「维护 / 依赖更新 / 测试基础设施」类变更，而非用户可感知的新功能。

---

## 6. 用户反馈摘要

过去 24 小时没有 Issue 评论、用户反馈或社区讨论数据，因此无法从今日数据中提炼真实用户痛点或满意度变化。

### 今日反馈信号

- 新开 Issue：0  
- 活跃 Issue：0  
- Issue 评论：无  
- PR 评论：未提供 / 暂无明显讨论  
- 用户反应：0

**结论：**  
今天没有可用于判断用户使用场景、痛点或满意度的新增社区材料。项目社区侧处于安静状态。

---

## 7. 待处理积压

当前提供的数据中没有长期未响应的 Issue 或 PR 列表，因此无法识别历史积压项。

### 今日新增待处理项

#### [PR #8128 chore(deps): bump urllib3 from 2.7.0 to 2.8.0 in /tests/e2e](https://github.com/nearai/ironclaw/pull/8128)

- **状态：** OPEN  
- **类型：** 自动依赖升级  
- **建议处理优先级：** 低到中  
- **维护者关注点：**
  - 检查 CI 是否通过。
  - 确认 `urllib3 2.8.0` 与现有 e2e 测试逻辑兼容。
  - 若无异常，可快速合并，避免依赖升级 PR 堆积。

---

## 项目健康度小结

IronClaw 今日处于低活跃、低风险状态。没有新增 Bug、没有用户投诉、没有社区争议，也没有版本发布或功能开发进展。唯一动态是 Dependabot 提交的测试依赖升级 PR，属于常规维护工作。短期建议维护者关注该 PR 的 CI 结果并尽快处理，以保持依赖更新节奏和减少自动化维护积压。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报  
**日期：2026-10-08**  
**仓库：** [netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)

---

## 1. 今日速览

过去 24 小时内，LobsterAI **没有新的 Issue 更新**，但 Pull Request 活动较集中，共有 **5 条 PR 更新**，其中 **1 条仍处于 Open 状态，4 条已关闭或合并**。今日工作主要集中在 **OpenClaw 稳定性修复、技能删除安全性、协作问答交互体验、开源信息展示** 等方向。  
整体来看，项目处于 **中等偏高活跃度**：虽然社区 Issue 侧没有新增反馈，但维护者在主动修复边界问题和改善产品体验，说明项目仍在持续打磨核心可用性。  
今日没有新版本发布，因此这些改动大概率仍处于主干迭代阶段，可能会进入后续小版本或补丁版本。

---

## 2. 项目进展

### 2.1 OpenClaw：修复 thinking catalog owner 被替换导致的硬失败

- PR：[#2811 fix(openclaw): tolerate replaced thinking catalog owners](https://github.com/netease-youdao/LobsterAI/pull/2811)  
- 状态：已关闭  
- 作者：fisherdaddy  
- 影响区域：`area: docs`, `area: main`, `area: openclaw`

该 PR 针对一个 Windows 用户场景中的稳定性问题：QQ 对话连续三轮失败，报错为：

> Agent failed before reply: prepared model catalog owner config was replaced during the read

从摘要看，该问题出现在 OpenClaw 读取 agent 配置时，thinking catalog owner 被替换后触发硬抛错，导致会话无法继续，即使执行 `/new` 也无法恢复，只有重启应用才能清除状态。

这类问题对用户体验影响较大，因为它会造成 **Agent 在回复前失败**，属于会话级阻断问题。该 PR 的关闭意味着维护者已经对这一类配置读取竞态或状态替换问题进行了处理，提升了 OpenClaw 在实际桌面使用场景中的容错能力。

---

### 2.2 Cowork：优化中途提问时的问题 Dock 折叠体验

- PR：[#2810 feat(cowork): collapse the question dock in place](https://github.com/netease-youdao/LobsterAI/pull/2810)  
- 状态：已关闭  
- 作者：fisherdaddy  
- 影响区域：`area: renderer`, `area: cowork`

该 PR 改进了 Agent 在工具调用或思考循环中途向用户提问时的交互体验。此前 inline question dock 会把上方回复内容挤出视野，而点击 X 折叠后只显示 “waiting for your answer” 提示，反而隐藏了问题本身。

本次改动让问题 Dock **在原位置折叠**，类似问题面板自身的收起行为，从而避免用户在多轮协作、复杂任务执行时丢失上下文。

这是一个偏产品体验的增强，对 Cowork 场景尤其重要，因为这类场景往往涉及：

- Agent 执行工具时需要用户补充信息；
- 用户需要在阅读上下文后回答；
- 提问面板不应打断或遮挡任务进展。

---

### 2.3 Skills：修复技能删除时可能递归删除任意路径的安全风险

- PR：[#2809 fix(skills): never delete paths named by a skill's _meta.json](https://github.com/netease-youdao/LobsterAI/pull/2809)  
- 状态：已关闭  
- 作者：fisherdaddy  
- 影响区域：`area: main`

该 PR 修复了一个较严重的安全与数据完整性问题。根据摘要，`skills:delete` 会从已安装技能包自己的 `_meta.json` 中读取 `openclawSourceDir` 字段，并在删除技能后递归删除该路径。

问题在于，`_meta.json` 是技能包内部自带并在安装时原样复制的文件。如果一个技能包在该字段中写入任意目录，就可能导致应用在删除技能时删除非预期路径。

该修复的意义较大：

- 降低恶意或错误技能包造成文件破坏的风险；
- 提升技能系统的安全边界；
- 减少用户误删本地文件或应用数据的可能性。

从项目健康度角度看，这是今日最重要的稳定性与安全性修复之一。

---

### 2.4 Settings/About：增加开源信息与 Star/Fork 引导

- PR：[#2808 feat(settings): add open-source info and star prompt to About](https://github.com/netease-youdao/LobsterAI/pull/2808)  
- 状态：已关闭  
- 作者：fisherdaddy  
- 影响区域：`area: renderer`, `area: docs`

该 PR 在设置页的 About 区域加入了开源相关信息，包括：

- GitHub 仓库链接；
- MIT License；
- 邀请用户 Star 或 Fork 项目。

这属于社区增长与透明度建设改动。此前应用内没有明显提示用户 LobsterAI 是开源项目，这可能削弱用户参与贡献、反馈问题或查看源码的意愿。加入开源信息后，有助于提升：

- 用户对项目可信度的感知；
- GitHub 访问和 Star 转化；
- 潜在贡献者发现入口；
- 开源许可证透明度。

---

### 2.5 OpenClaw：避免重复注入 AGENTS.md 指令到首条消息

- PR：[#2812 fix(openclaw): stop re-injecting AGENTS.md instructions into the first message](https://github.com/netease-youdao/LobsterAI/pull/2812)  
- 状态：Open  
- 作者：fisherdaddy  
- 影响区域：`area: docs`, `area: main`

这是今日唯一仍处于 Open 状态的 PR。该 PR 关注 Desktop Session 首条消息中重复包含 `[LobsterAI system instructions]` 的问题。摘要显示，该 block 重复了 OpenClaw 已经通过 agent 的 `AGENTS.md` 放入 system prompt 的内容，包括：

- 默认系统提示词 `resources/SYSTEM_PROMPT.md`，仅 main agent；
- 其他通过 `AGENTS.md` 注入的指令内容。

如果该问题被修复，可能带来以下收益：

- 减少首轮上下文冗余；
- 降低模型 prompt token 消耗；
- 避免系统指令重复导致行为偏差；
- 让 agent 的系统提示结构更清晰。

该 PR 仍待合并，是后续 OpenClaw prompt 管理相关的重要改动信号。

---

## 3. 社区热点

过去 24 小时内，数据中没有 Issue 评论、点赞或活跃讨论记录；所有 PR 的评论数均显示为 `undefined`，反应数均为 0。因此，今日没有明显由社区讨论驱动的热点。

不过，从 PR 内容可以推断出几个维护者关注点：

### 3.1 桌面 Agent 会话稳定性

- 相关 PR：[#2811](https://github.com/netease-youdao/LobsterAI/pull/2811), [#2812](https://github.com/netease-youdao/LobsterAI/pull/2812)

这两条 PR 都围绕 OpenClaw 会话和系统指令管理展开，说明当前项目正在处理 Agent 运行链路中的细节问题，包括配置读取容错和 prompt 注入一致性。

### 3.2 技能系统安全边界

- 相关 PR：[#2809](https://github.com/netease-youdao/LobsterAI/pull/2809)

技能包安装与删除涉及本地文件系统权限，安全风险较高。该修复显示维护者开始强化插件/技能生态的安全约束。

### 3.3 Cowork 多轮协作体验

- 相关 PR：[#2810](https://github.com/netease-youdao/LobsterAI/pull/2810)

Agent 主动提问、用户补充信息、工具循环执行，是个人 AI 助手的重要使用场景。Dock 折叠体验的优化说明项目正在细化复杂任务中的人机协作体验。

---

## 4. Bug 与稳定性

按影响程度排序如下：

### 严重：技能删除可能删除 `_meta.json` 指向的任意路径

- PR：[#2809 fix(skills): never delete paths named by a skill's _meta.json](https://github.com/netease-youdao/LobsterAI/pull/2809)  
- 状态：已关闭  
- 严重程度：高  
- 是否已有 fix PR：是

该问题涉及递归删除路径，存在数据破坏风险。虽然摘要未说明是否已被实际利用，但从机制上看，如果技能包中的 `_meta.json` 指向非预期目录，删除技能时可能造成严重后果。该修复对技能生态的安全性非常关键。

---

### 高：OpenClaw 配置读取时 owner 被替换导致 Agent 回复前失败

- PR：[#2811 fix(openclaw): tolerate replaced thinking catalog owners](https://github.com/netease-youdao/LobsterAI/pull/2811)  
- 状态：已关闭  
- 严重程度：高  
- 是否已有 fix PR：是

该问题导致用户在 QQ 对话中连续三轮失败，即使 `/new` 也无法恢复，必须重启应用。这说明故障会污染或锁死当前运行状态，是明显的会话可用性问题。

---

### 中：首条消息重复注入系统指令，可能造成上下文冗余和行为偏差

- PR：[#2812 fix(openclaw): stop re-injecting AGENTS.md instructions into the first message](https://github.com/netease-youdao/LobsterAI/pull/2812)  
- 状态：Open  
- 严重程度：中  
- 是否已有 fix PR：是，待合并

重复注入 `AGENTS.md` 指令不会直接导致崩溃，但会影响 prompt 结构、token 成本和模型行为稳定性。对于依赖长期会话和复杂 agent 指令的场景，该问题值得尽快合并。

---

### 中低：Cowork 问题 Dock 折叠后隐藏问题内容

- PR：[#2810 feat(cowork): collapse the question dock in place](https://github.com/netease-youdao/LobsterAI/pull/2810)  
- 状态：已关闭  
- 严重程度：中低  
- 是否已有 fix PR：是

该问题主要影响交互体验，不属于崩溃或数据损坏问题。但在复杂任务执行中，用户可能因为看不到 Agent 的问题而无法顺畅继续协作。

---

## 5. 功能请求与路线图信号

今日没有新的 Issue，因此没有直接来自用户的新功能请求。不过从 PR 方向看，可以识别出以下路线图信号：

### 5.1 OpenClaw Prompt 管理将继续收敛

- 相关 PR：[#2812](https://github.com/netease-youdao/LobsterAI/pull/2812)

OpenClaw 正在减少重复系统指令注入，说明项目可能会继续整理 Agent 指令来源、优先级与注入时机。这对未来支持多 Agent、多技能、多环境配置非常重要。

可能进入下一版本的方向：

- 更清晰的 `AGENTS.md` 指令管理；
- 减少重复 system prompt；
- 降低上下文污染；
- 提升桌面 session 的首轮响应质量。

---

### 5.2 Skills 系统安全性可能成为后续重点

- 相关 PR：[#2809](https://github.com/netease-youdao/LobsterAI/pull/2809)

技能包本质上类似插件生态，一旦开放给更多用户和第三方开发者，安装、更新、删除、权限边界都会成为核心问题。此次修复可能预示后续会继续加强：

- 技能包元数据校验；
- 安装路径约束；
- 删除路径白名单；
- 第三方技能安全审计；
- ClawHub 包分发安全。

---

### 5.3 Cowork 体验继续向真实协作场景优化

- 相关 PR：[#2810](https://github.com/netease-youdao/LobsterAI/pull/2810)

Agent 在任务中主动提问，是从“聊天机器人”走向“协作助手”的关键能力。问题 Dock 的细节优化说明项目正在关注真实使用时的上下文连续性。

可能后续方向包括：

- 更好的中断恢复；
- 提问历史可追踪；
- 多个待回答问题管理；
- 工具调用中用户输入的状态管理。

---

### 5.4 应用内开源入口有助于社区增长

- 相关 PR：[#2808](https://github.com/netease-youdao/LobsterAI/pull/2808)

在 About 页面加入 GitHub 仓库和 License 信息，说明维护者希望将产品用户转化为开源社区参与者。后续可能会看到更多：

- 贡献指南入口；
- 问题反馈入口；
- Star/Fork 引导；
- License 与第三方依赖信息展示。

---

## 6. 用户反馈摘要

今日数据中没有新的 Issues，也没有可见的 Issue 评论，因此无法直接提炼大规模社区反馈。不过 PR 摘要中暴露出一些真实使用场景和用户痛点。

### 6.1 Windows 用户在 QQ 会话中遭遇连续 Agent 失败

- 相关 PR：[#2811](https://github.com/netease-youdao/LobsterAI/pull/2811)

用户痛点：

- Agent 在回复前失败；
- 同一问题连续出现三轮；
- `/new` 无法恢复；
- 只能通过重启应用解决。

这说明用户已经在真实桌面通信场景中使用 LobsterAI，例如 QQ 对话辅助。此类场景对稳定性要求高，因为用户期望 AI 助手能持续参与上下文，而不是在中途失效。

---

### 6.2 用户在 Cowork 场景中容易丢失 Agent 提问内容

- 相关 PR：[#2810](https://github.com/netease-youdao/LobsterAI/pull/2810)

用户痛点：

- Agent 提问面板会挤走上方回复；
- 折叠后只剩等待提示，看不到原始问题；
- 用户可能不知道该回答什么。

这反映出复杂协作任务中，信息布局和上下文可见性非常关键。对于个人 AI 助手来说，UI 细节直接影响任务完成率。

---

### 6.3 用户可能不知道 LobsterAI 是开源项目

- 相关 PR：[#2808](https://github.com/netease-youdao/LobsterAI/pull/2808)

用户痛点或缺口：

- 应用内缺少开源项目信息；
- 用户无法快速找到 GitHub 仓库；
- 潜在贡献者缺少参与入口。

该问题不是功能缺陷，但会影响开源项目传播和社区建设。

---

## 7. 待处理积压

### 当前仍待处理 PR

#### #2812：停止将 AGENTS.md 指令重复注入首条消息

- PR：[#2812 fix(openclaw): stop re-injecting AGENTS.md instructions into the first message](https://github.com/netease-youdao/LobsterAI/pull/2812)  
- 状态：Open  
- 创建时间：2026-10-07  
- 建议优先级：中高

建议维护者优先 review 该 PR。虽然它不是崩溃级问题，但它影响 prompt 结构和上下文质量，且与 OpenClaw 的核心 agent 行为直接相关。如果长期保留重复注入逻辑，可能导致后续问题更难定位。

---

### 长期未响应 Issue / PR

根据今日提供的数据：

- 过去 24 小时无 Issue 更新；
- 没有长期未响应 Issue 信息；
- 除 #2812 外，无其他 Open PR 出现在本次数据中。

因此，当前无法识别明确的长期积压项。建议后续日报继续跟踪 Open PR 的停留时间，尤其关注涉及 OpenClaw、Skills、安全边界和桌面会话稳定性的条目。

---

## 总体健康度评估

LobsterAI 今日没有新版本发布，也没有 Issue 活跃讨论，但 PR 侧维护较积极，尤其集中在 **稳定性、安全性和核心交互体验**。  
从今日变更看，项目并非单纯增加新功能，而是在修复真实使用场景中暴露出的边界问题，例如 Windows 桌面会话失败、技能删除路径安全、Agent 提问 UI 干扰等。  

综合评估：

- **开发活跃度：中等偏高**
- **社区讨论热度：低**
- **稳定性改善：明显**
- **安全性改善：明显**
- **下一版本风险点：OpenClaw prompt 注入与配置状态一致性仍需持续关注**

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

# CoPaw 项目动态日报｜2026-10-08

> 数据来源：GitHub `agentscope-ai/CoPaw` / `agentscope-ai/QwenPaw` 相关 Issues、PRs  
> 今日统计：Issues 更新 6 条，PR 更新 4 条，新版本发布 0 个

---

## 1. 今日速览

今日项目活跃度较高，过去 24 小时内共有 **6 条 Issue 更新**、**4 条 PR 更新**，说明社区反馈和维护开发都在持续推进。  
不过，今日新增或活跃的 Issue 几乎全部集中在 **Bug、稳定性、桌面端体验、模型上下文处理、消息队列可靠性** 等方面，表明当前版本尤其是 `2.2.2 beta4` 在实际使用中仍存在较明显的稳定性压力。  
PR 侧有 3 个待合并修复/功能 PR，其中两个直接对应模型调用失败恢复与 provider fallback 逻辑，显示维护者正在优先处理 **LLM Provider 兼容性与错误恢复能力**。  
整体来看，项目处于 **高活跃但 Bug 压力偏高** 的状态，短期重点应是稳定 beta 版本、提升桌面端可用性和任务失败恢复能力。

---

## 2. 项目进展

### 已关闭 / 已处理 PR

#### #8119 `fix(console): preserve drafts when pasting long text (#7948)`  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8119  
状态：CLOSED  
规模：L

该 PR 修复了一个控制台输入体验问题：当用户粘贴长文本时，已有草稿可能被合并、上传并覆盖，导致原始草稿内容丢失。

主要改动包括：

- 判断长文本时，仅基于“本次粘贴内容”的长度，而不是混合已有草稿内容。
- 当粘贴内容超过 10,000 字符时，提供：
  - “Paste as text”
  - “Paste as attachment”
- 普通文本会插入到当前光标位置，避免覆盖已有草稿。

**项目推进意义：**

该修复提升了控制台输入框在长文本场景下的可靠性，尤其适用于用户粘贴论文、日志、代码、长提示词等场景。虽然不是核心 Agent 能力变更，但明显改善了高频交互体验。

---

### 今日待合并 PR

#### #8124 `fix(providers): route content inspection errors to fallback`  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8124  
状态：OPEN  
规模：XS

该 PR 处理部分 Ali-compatible 网关返回 `data_inspection_failed` 或 `inappropriate content` 时，当前系统将其归类为 `bad_request`，导致 `FallbackChatModel` 直接停止的问题。

改动目标是：  
当请求被内容安全检查拦截时，应触发 fallback，尝试下一个已配置模型，而不是直接终止任务。

**影响：**

- 提升多模型配置下的容错能力。
- 改善国内兼容网关或内容审查严格 provider 下的可用性。
- 对使用 fallback 模型池的用户价值较高。

---

#### #8118 `fix(context): recover from max token fit errors`  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8118  
状态：OPEN  
规模：XS  
关联 Issue：https://github.com/agentscope-ai/QwenPaw/issues/8117

该 PR 识别两个 provider-specific 的 HTTP 400 上下文溢出错误签名：

- `max_tokens ... does not fit`
- `prompt ... + max tokens ... exceeds the context`

识别后会复用现有的一次性 Scroll recovery 路径，压缩上下文、重建模型输入并重试一次。

**影响：**

这是一个针对上下文窗口溢出的稳定性修复，有助于减少 OpenAI-compatible provider 在长上下文任务中直接失败的概率。

---

#### #8121 `feat(creator): release 2.0.1 with controlled media production`  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8121  
状态：OPEN  
规模：XXXL

该 PR 计划发布 QwenPaw Creator `2.0.1`，从摘要看，重点是引入或整理 “controlled media production” 相关能力，并基于上一次 upstream release 之后的插件工作进行发布。

**影响：**

这是今日体量最大的 PR，可能代表 Creator 子项目进入一个较大的版本更新周期。由于 PR 规模为 XXXL，建议维护者重点关注：

- 插件树变更范围
- 向后兼容性
- 配置迁移
- 媒体生成/生产流程的权限、成本和安全边界

---

## 3. 社区热点

今日最活跃的讨论集中在桌面端稳定性、消息队列可靠性和页面加载失败问题上。

### #8120 `[bug] 页面加载失败频繁出现`  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8120  
作者：henryliuwork  
评论数：2  
版本：QwenPaw `2.2.2b4`

用户反馈在多台设备上都遇到“页面加载失败”，提示可能由网络问题或应用更新导致，严重影响使用体验。

**用户诉求：**

- 希望桌面端或 Web UI 能稳定加载。
- 希望错误信息更明确，能够区分网络问题、应用更新问题、后端不可用、前端资源加载失败等原因。
- 该问题跨设备出现，可能不是单一环境问题。

**风险判断：高**

页面无法加载属于入口级故障，会直接阻断用户使用。

---

### #8116 `[bug] message queue 消息队列的严重问题`  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8116  
作者：happieme  
评论数：2

用户反馈消息队列存在较严重的重复处理和会话归属异常问题：

- 有时消息已经处理过，但后面仍会再次发送。
- 明明是当前会话处理的消息，却提示已在另一个对话中处理。
- 用户表示该问题已存在较长时间。

**用户诉求：**

- 消息队列需要保证至少在用户感知层面的一致性。
- 避免重复发送、重复处理、跨会话误判。
- 需要更强的任务 ID、会话 ID、消息状态追踪机制。

**风险判断：高**

消息队列问题会影响 Agent 任务执行的可信度，尤其是长任务、多会话、异步执行场景。

---

### #8115 `Desktop console cold start hangs / degraded view / WebView2 process silently dies`  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8115  
作者：sergmsv33-lab  
评论数：2  
版本：QwenPaw Desktop `2.2.2b4`

用户详细报告桌面端冷启动时存在多个问题：

- 启动后 splash 停留约 11 秒，直到 backend port `14711` 可用。
- 后台启动完成前，界面进入 degraded view，耗时约 16–25 秒。
- WebView2 进程可能静默退出，但后端仍保持运行。

**用户诉求：**

- 降低桌面端冷启动时间。
- 明确展示后端启动状态。
- WebView2 崩溃时应自动检测并恢复。
- 前后端生命周期需要更可靠地绑定。

**风险判断：高**

该问题影响桌面端基础可用性，并可能造成“后端存活但前端死亡”的隐性故障。

---

## 4. Bug 与稳定性

以下按严重程度排序。

### 严重级别：高

#### 1. 页面加载失败频繁出现  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/8120  
版本：`2.2.2b4`  
状态：OPEN  
是否已有 fix PR：未发现对应 PR

**问题描述：**  
用户在多台设备上遇到页面加载失败，提示可能由网络问题或应用更新导致。

**影响：**

- 用户无法进入或正常使用应用。
- 影响面可能较广。
- 错误提示信息不足，难以定位。

---

#### 2. 消息队列重复发送 / 会话归属错误  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/8116  
状态：OPEN  
是否已有 fix PR：未发现对应 PR

**问题描述：**

- 已处理消息后续仍会再次发送。
- 当前会话消息被错误识别为另一个对话已处理。

**影响：**

- 异步任务可靠性下降。
- 多会话场景下用户信任受损。
- 可能导致重复调用模型、额外成本、状态污染。

---

#### 3. 桌面端冷启动慢、WebView2 静默死亡  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/8115  
版本：Desktop `2.2.2b4`  
状态：OPEN  
是否已有 fix PR：未发现对应 PR

**问题描述：**

- 冷启动耗时明显。
- degraded view 持续 16–25 秒。
- WebView2 可能退出但后端仍运行。

**影响：**

- 桌面端首屏体验差。
- 前端进程异常未被有效感知。
- 需要改进健康检查和恢复机制。

---

### 严重级别：中高

#### 4. Daily Paper 因模型摘要输出截断导致整个任务失败  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/8123  
作者：PTW1981  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8123  
版本：QwenPaw Desktop `2.2.2-beta.4`  
环境：Windows 10 x64，远程模型 `glm-5.3-flash`  
状态：OPEN  
是否已有 fix PR：未发现对应 PR

**问题描述：**

Daily Paper memory cron 在处理论文摘要时，由于模型结构化输出被截断，触发 `ToolJSONDecodeError`。当前没有 per-paper retry，导致整个任务被标记为错误。

**影响：**

- 批处理任务缺少局部容错。
- 单篇论文失败会拖垮整个 Daily Paper job。
- 对研究、论文跟踪、记忆任务用户影响较大。

**建议方向：**

- 增加每篇 paper 的 retry。
- 对结构化 JSON 输出增加修复解析或 partial recovery。
- 对单篇失败与整体任务失败进行解耦。

---

#### 5. provider max_tokens context rejection 未进入现有恢复路径  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/8117  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8117  
关联 PR：https://github.com/agentscope-ai/QwenPaw/pull/8118  
状态：OPEN  
是否已有 fix PR：有，#8118

**问题描述：**

当 OpenAI-compatible provider 拒绝请求，原因是 prompt 与 max_tokens 合计超过上下文窗口时，QwenPaw 可能无法触发现有 Scroll overflow-recovery 路径。

**影响：**

- 长上下文任务失败率上升。
- 不同 provider 的错误格式差异导致恢复逻辑失效。

**修复进展：**

PR #8118 已提交，用于识别 provider-specific 错误签名，并触发上下文压缩重试。

---

### 严重级别：中

#### 6. 设置界面布局错乱  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/8122  
作者：rerbin  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8122  
版本：`2.2.2 beta4 windows desktop`  
状态：OPEN  
是否已有 fix PR：未发现对应 PR

**问题描述：**

进入设置界面后，用户看到布局错乱。

**影响：**

- 影响配置体验。
- 可能阻碍用户修改模型、账户、偏好、插件等关键设置。
- 若与特定分辨率、缩放比例、WebView 渲染有关，应尽快确认复现条件。

---

## 5. 功能请求与路线图信号

今日没有明确以“feature request”形式提交的新功能 Issue，但多个 Bug 和 PR 暗含了清晰的路线图信号。

### 1. 更强的 Provider Fallback 与错误分类能力  
相关 PR：https://github.com/agentscope-ai/QwenPaw/pull/8124  
相关 PR：https://github.com/agentscope-ai/QwenPaw/pull/8118

今日两个 XS 级 PR 都围绕 provider 错误处理：

- 内容审查失败应进入 fallback。
- 上下文溢出错误应进入压缩恢复路径。

**路线图信号：**

QwenPaw 正在加强对多 provider、多网关、多模型环境的适配。下一版本很可能继续优化：

- provider 错误分类器
- fallback 策略
- context overflow recovery
- 国内外兼容模型网关差异处理

---

### 2. Creator 进入较大版本升级周期  
相关 PR：https://github.com/agentscope-ai/QwenPaw/pull/8121

`feat(creator): release 2.0.1 with controlled media production` 是今日最大 PR，显示 Creator 方向可能正在从插件能力迭代进入更完整的媒体生产流程管理。

**可能纳入下一版本的方向：**

- 受控媒体生产流程
- Creator 插件体系更新
- 媒体生成任务编排
- 与现有 Agent 工作流集成

由于 PR 规模为 XXXL，建议拆分审查或补充迁移说明。

---

### 3. 批处理任务的局部失败恢复  
相关 Issue：https://github.com/agentscope-ai/QwenPaw/issues/8123

Daily Paper 任务失败暴露出一个更通用的需求：批处理任务不应因单个 item 失败而整体失败。

**潜在路线图方向：**

- per-item retry
- 任务级 partial success
- JSON 修复解析
- LLM 输出截断检测
- 对 memory cron 的更细粒度错误报告

---

## 6. 用户反馈摘要

今日用户反馈主要集中在“不稳定”和“状态不可解释”两个方面。

### 主要痛点

1. **应用入口不稳定**  
   用户在多设备上遇到页面加载失败。  
   相关 Issue：https://github.com/agentscope-ai/QwenPaw/issues/8120

2. **桌面端启动和运行状态不透明**  
   冷启动等待时间长，WebView2 可能静默退出，但用户无法直观看到原因。  
   相关 Issue：https://github.com/agentscope-ai/QwenPaw/issues/8115

3. **消息队列可信度不足**  
   用户认为消息已处理后仍重复发送，且会话归属判断错误。  
   相关 Issue：https://github.com/agentscope-ai/QwenPaw/issues/8116

4. **长上下文和 provider 错误恢复不充分**  
   用户使用 OpenAI-compatible provider 时，遇到 max_tokens/context window 错误后，系统未能自动恢复。  
   相关 Issue：https://github.com/agentscope-ai/QwenPaw/issues/8117  
   修复 PR：https://github.com/agentscope-ai/QwenPaw/pull/8118

5. **研究/论文工作流容错不足**  
   Daily Paper 中单篇论文摘要失败，会导致整个任务失败。  
   相关 Issue：https://github.com/agentscope-ai/QwenPaw/issues/8123

### 用户不满意点

- beta4 桌面端体验不够稳定。
- 错误提示泛化，缺少可操作信息。
- 异步任务和消息队列行为不符合用户预期。
- 长任务失败后缺少局部恢复和自动重试。

### 积极信号

- 社区提交了具体、可复现、包含环境信息的问题报告。
- 已有贡献者针对上下文溢出和 fallback 逻辑提交小规模修复 PR。
- first-time contributor 参与修复，说明项目仍具备较好的外部贡献吸引力。

---

## 7. 待处理积压

由于本日报仅包含过去 24 小时数据，无法完整判断“长期未响应”的 Issue 或 PR。但从今日数据看，以下事项应优先进入维护者关注队列。

### 高优先级待处理

#### #8120 页面加载失败  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8120  
原因：入口级故障，影响使用开始路径。

#### #8116 消息队列严重问题  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8116  
原因：涉及消息一致性、重复执行、会话状态判断，可能影响核心 Agent 工作流可信度。

#### #8115 桌面端启动和 WebView2 生命周期问题  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8115  
原因：影响桌面端基础体验和稳定性，且报告中包含较详细性能现象，适合进一步定位。

#### #8123 Daily Paper 任务缺少 per-paper retry  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8123  
原因：暴露批处理任务容错设计不足，建议作为 ReMe / memory cron 稳定性改进项。

### 待审查 PR

#### #8118 context overflow recovery  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8118  
建议优先级：高  
原因：直接修复 provider 上下文溢出恢复问题，规模 XS，风险相对可控。

#### #8124 provider content inspection fallback  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8124  
建议优先级：高  
原因：提升 fallback 可用性，尤其适用于多模型、多网关部署用户。

#### #8121 Creator 2.0.1  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8121  
建议优先级：中高  
原因：功能价值较高，但规模 XXXL，建议加强测试、拆分审查或补充 release notes。

---

## 项目健康度评估

| 维度 | 今日表现 | 评价 |
|---|---:|---|
| 社区活跃度 | 6 Issues / 4 PRs | 较高 |
| 维护响应 | 有多个修复 PR 提交 | 良好 |
| 稳定性 | 多个 beta4 相关 Bug | 偏弱 |
| 桌面端体验 | 页面加载、启动、布局均有问题 | 需要重点修复 |
| LLM Provider 兼容性 | 已有针对性 PR | 正在改善 |
| 发布节奏 | 今日无新版本 | 稳定期 / 修复期 |

**综合判断：**  
CoPaw / QwenPaw 今日处于活跃修复阶段。社区反馈密集，尤其是桌面端和模型调用稳定性问题较突出。短期内建议优先合并低风险稳定性修复 PR，并集中处理 `2.2.2 beta4` 的页面加载、消息队列和桌面端生命周期问题，以降低用户流失和 beta 版本负面反馈。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 — 2026-10-08

## 1. 今日速览

过去 24 小时，ZeroClaw 活跃度较高：新增/更新 **3 个 Issues**、**13 个开放 PR**，但 **无 PR 合并或关闭**、**无新版本发布**。今日动态集中在 **运行时稳定性、配置安全、Provider 路由、Telegram channel、原生账号/本地 onboarding** 等方向。  
整体看，项目处于“高开发活跃、低落地合并”的阶段：多个修复和大功能 PR 已打开，但关键高风险问题仍待合并验证。尤其是 `model_routing_config` 配置破坏、Telegram listener 卡死、shell approval 重复调用中断 agent loop 等问题，显示当前运行时和安全策略边界仍有稳定性压力。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日没有已合并或已关闭 PR，因此严格意义上暂无“落地到主干”的进展。不过，多个开放 PR 显示维护者和贡献者正在集中推进以下方向：

### 运行时与会话稳定性

- [PR #11607](https://github.com/zeroclaw-labs/zeroclaw/pull/11607) `fix(rpc/zerocode): scope-filter live-session refresh before locking; keep TUI alive on RPC timeout`  
  目标是修复 route-affecting `config/set` 时 live session refresh 的锁范围问题，并在 RPC timeout 时保持 TUI 存活。该 PR 对降低配置变更导致的会话挂死风险较重要。

- [PR #11609](https://github.com/zeroclaw-labs/zeroclaw/pull/11609) `fix(zerocode): keep failed-turn status across reconnect and lag reload`  
  处理 daemon restart 或 reconnect 后失败 turn 状态丢失的问题，有助于提升长会话和断线恢复体验。

- [PR #11600](https://github.com/zeroclaw-labs/zeroclaw/pull/11600) `refactor(runtime): remove obsolete stream error wrapper`  
  移除过时的 stream error wrapper，减少 unreachable downcast 和错误处理冗余。属于中等风险重构，能改善运行时错误路径的可维护性。

### Channel / Telegram 稳定性

- [PR #11601](https://github.com/zeroclaw-labs/zeroclaw/pull/11601) `fix(channels): classify telegram transcription failures and bound transient retries`  
  修复 Telegram voice path 中 transcription error 一律被视为 transient retry 的问题，避免 terminal error 导致 long-poll offset 被卡住、后续更新阻塞。该 PR 与今日 Telegram listener 卡死问题方向高度相关。

### Provider 与工具配置

- [PR #11599](https://github.com/zeroclaw-labs/zeroclaw/pull/11599) `fix(providers): honor native_tools configuration for compat families`  
  修复 OpenAI-compatible provider family 忽略 `native_tools` 配置的问题，提升 provider 行为一致性。

- [PR #11598](https://github.com/zeroclaw-labs/zeroclaw/pull/11598) `feat(security): support glob matching in the command allowlist`  
  为 `allowed_commands` 增加 glob 匹配能力，降低运维者维护大量脚本白名单的成本，但也带来安全策略表达能力增强后的审计需求。

### Onboarding 与原生账号接入

- [PR #11597](https://github.com/zeroclaw-labs/zeroclaw/pull/11597) `feat(auth): add ChatGPT plan usage with local function tools`  
  大型高风险功能 PR，增加 ChatGPT plan usage 登录、本地工具绑定、身份签名和加密存储等能力。

- [PR #11602](https://github.com/zeroclaw-labs/zeroclaw/pull/11602) `feat(onboarding): create and verify isolated native agent instances`  
  增加 `native-onboard`，用于创建隔离的原生 agent instance，并在保存配置前完成 provider 授权验证。

- [PR #11596](https://github.com/zeroclaw-labs/zeroclaw/pull/11596) `feat(onboarding): use native Claude Code accounts with supervised plugin apply`  
  增加 `claude_code_native` provider，使 ZeroClaw 可以使用本地已安装、未修改的 Claude Code 客户端及其账号。

- [PR #11604](https://github.com/zeroclaw-labs/zeroclaw/pull/11604) `feat(onboarding): package local ChatGPT plan setup`  
  将本地 ChatGPT plan setup 包装为独立 skills package，便于本地 client 引导用户创建独立 ZeroClaw 实例。

### 构建、Lint 与文档

- [PR #11611](https://github.com/zeroclaw-labs/zeroclaw/pull/11611) `fix(android): restore the aarch64-linux-android build`  
  修复自 #10236 以来 `aarch64-linux-android` target 编译失败的问题。对 Android / 移动端构建链路重要。

- [PR #11610](https://github.com/zeroclaw-labs/zeroclaw/pull/11610) `chore(lint): ban std::env::set_current_dir workspace-wide`  
  在 workspace 范围内禁止 `std::env::set_current_dir`，减少测试和运行时中由全局 cwd 变更引发的隐性状态污染。

- [PR #11603](https://github.com/zeroclaw-labs/zeroclaw/pull/11603) `docs(runtime): propose a bounded exception for subagent model routes`  
  针对 `spawn_subagent` 是否允许使用 operator-declared `[[model_routes]]` 提出有边界的例外规则，属于模型路由策略设计讨论。

---

## 4. 社区热点

### 最高讨论度 Issue

- [Issue #11606](https://github.com/zeroclaw-labs/zeroclaw/issues/11606)  
  **标题**：`model_routing_config upsert_agent rewrites entire config: fabricates risk/runtime profiles, drops fields, resets agent limits`  
  **状态**：Open，已 accepted  
  **标签**：`bug`, `agent`, `config`, `provider`, `tool`, `provider:router`, `security:policy`, `domain:security`, `priority:p1`, `risk:high`  
  **评论数**：1  
  **分析**：这是今日最值得关注的问题。用户报告 `model_routing_config` 的 `upsert_agent` 本应只 patch 单个 agent 的 routing 字段，但实际会将整个 `config.toml` 通过默认 struct round-trip 后重写，造成字段丢失、默认 profile 被伪造、agent limits 被重置等问题。  
  背后诉求非常明确：用户希望配置工具具备“最小变更”和“不可破坏原配置”的安全属性，尤其在 routing、risk profile、runtime profile 等安全敏感字段上不能出现隐式重写。

### 高活跃开放 PR 方向

- [PR #11597](https://github.com/zeroclaw-labs/zeroclaw/pull/11597)  
  **主题**：ChatGPT plan usage + local function tools  
  **分析**：这是今日最重要的大型功能线之一，涉及认证、provider 绑定、本地工具、安全域、配置和 CLI。若进入下一版本，将明显扩展 ZeroClaw 对本地账号和原生计划使用场景的支持，但也需要严格安全审查。

- [PR #11602](https://github.com/zeroclaw-labs/zeroclaw/pull/11602)  
  **主题**：创建并验证隔离 native agent instances  
  **分析**：该 PR 是 native onboarding 路线的基础设施，和 #11597、#11596、#11604 存在明显堆叠关系。说明项目正在向“可引导用户创建隔离本地 agent 环境”的方向演进。

- [PR #11601](https://github.com/zeroclaw-labs/zeroclaw/pull/11601)  
  **主题**：Telegram transcription failure 分类与 retry 上界  
  **分析**：与 channel 稳定性直接相关，可缓解 Telegram 更新队列被单个异常语音消息阻塞的问题。

---

## 5. Bug 与稳定性

按严重程度和影响范围排序如下。

### P1 / 高风险：配置 upsert 破坏完整配置

- [Issue #11606](https://github.com/zeroclaw-labs/zeroclaw/issues/11606)  
  **严重程度**：`priority:p1`, `risk:high`  
  **影响组件**：agent config、model routing、provider router、security policy  
  **问题概述**：`model_routing_config upsert_agent` 在修改单个 agent routing 字段时，会重写整个 `config.toml`，并引入默认值、丢字段、重置限制等副作用。  
  **用户影响**：运维者可能只是想修改 `model_provider`，却意外改变风险策略、运行时 profile、agent limits 等关键设置。  
  **是否已有 fix PR**：当前数据中未看到明确关联的修复 PR。

### S1：Telegram listener 可能永久卡死

- [Issue #11608](https://github.com/zeroclaw-labs/zeroclaw/issues/11608)  
  **严重程度**：`S1 - workflow blocked`  
  **影响组件**：channel、Telegram listener  
  **问题概述**：当 HTTP request 被 blackhole，运行时 HTTP client 没有 request timeout，Telegram channel listener 可能永久卡住。`listener_health` 能检测到 stale，但没有恢复机制。  
  **用户影响**：Telegram channel 失去响应，工作流被阻断，需要人工干预。  
  **可能相关 PR**：[PR #11601](https://github.com/zeroclaw-labs/zeroclaw/pull/11601) 修复 Telegram transcription retry 分类问题，但不一定完全覆盖 blackholed HTTP request timeout/recovery 场景。需要维护者确认是否还需独立修复。

### Agent loop 中断：同一 turn 重跑已批准 shell command 会终止 ACP session

- [Issue #11612](https://github.com/zeroclaw-labs/zeroclaw/issues/11612)  
  **严重程度**：未标注 priority，但从描述看会导致 agent loop abort 和 ACP session 结束  
  **影响组件**：supervised mode、shell tool approval、ACP session  
  **问题概述**：在 supervised mode 中，如果同一 turn 内重复运行一个已经批准过的 shell command，ZeroClaw 会报 `repeated prompt-required tool call 'shell' with identical arguments before approval`，并终止 agent loop。  
  **用户影响**：安全测试和受监督执行场景中，agent 无法稳定重试或复用已批准命令，导致 session 提前结束。  
  **是否已有 fix PR**：当前数据中未看到明确修复 PR。  
  **备注**：该 issue 由 DefuzeX 使用其 behavioral safety testing SDK KUMA 发现，说明外部安全测试工具正在暴露 ZeroClaw 的执行语义边界问题。

### Android 构建回归

- [PR #11611](https://github.com/zeroclaw-labs/zeroclaw/pull/11611)  
  **问题类型**：构建修复  
  **影响组件**：`zeroclaw-runtime`, `aarch64-linux-android`  
  **问题概述**：自 #10236 以来 Android target 编译失败，错误为找不到 `DESKTOP_READINESS_FRAME_MAX_BYTES`。  
  **状态**：已有开放修复 PR。  
  **用户影响**：Android 或移动端相关构建链路受阻。

### Reconnect / lag reload 后 failed-turn 状态丢失

- [PR #11609](https://github.com/zeroclaw-labs/zeroclaw/pull/11609)  
  **问题类型**：会话恢复一致性修复  
  **影响组件**：zerocode、daemon reconnect、history reload  
  **状态**：已有开放修复 PR。  
  **用户影响**：daemon restart 或 reconnect 后，失败 turn 的 UI/状态可能不一致，影响用户判断任务执行结果。

---

## 6. 功能请求与路线图信号

今日没有典型“纯功能请求 Issue”，但多个 PR 明确透露了项目路线图方向。

### 本地原生账号与隔离 onboarding 可能成为下一版本重点

相关 PR：

- [PR #11597](https://github.com/zeroclaw-labs/zeroclaw/pull/11597) — ChatGPT plan usage with local function tools  
- [PR #11602](https://github.com/zeroclaw-labs/zeroclaw/pull/11602) — isolated native agent instances  
- [PR #11596](https://github.com/zeroclaw-labs/zeroclaw/pull/11596) — native Claude Code accounts  
- [PR #11604](https://github.com/zeroclaw-labs/zeroclaw/pull/11604) — local ChatGPT plan setup package  

**路线图信号**：ZeroClaw 正从单纯 provider/API-key 模式，扩展到“使用用户本地原生账号 + 隔离 agent instance + supervised plugin apply”的模式。这会显著提升本地开发者和已有 ChatGPT/Claude Code 用户的接入体验，但同时引入认证隔离、账号绑定、工具权限和本地状态存储等安全问题。

### 安全策略表达能力增强

- [PR #11598](https://github.com/zeroclaw-labs/zeroclaw/pull/11598)  
  **功能**：`allowed_commands` 支持 glob matching。  
  **路线图信号**：运维者希望以更低维护成本授权一组脚本或插件目录，而不是逐个列举命令。该功能很可能被纳入后续版本，但需要额外关注 glob 范围过宽导致的命令执行风险。

### Subagent model route 规则正在形成

- [PR #11603](https://github.com/zeroclaw-labs/zeroclaw/pull/11603)  
  **功能/设计方向**：允许 `spawn_subagent` 在有边界条件下使用 operator-declared `[[model_routes]]`。  
  **路线图信号**：项目正在细化多 agent / subagent 场景下的模型路由治理规则，尤其是如何在灵活性和安全性之间平衡。

### Provider 行为一致性继续补齐

- [PR #11599](https://github.com/zeroclaw-labs/zeroclaw/pull/11599)  
  **功能/修复方向**：OpenAI-compatible provider family 应尊重 `native_tools` 配置。  
  **路线图信号**：兼容 provider 的配置一致性正在成为维护重点，说明用户已经在多 provider 环境中遇到行为不一致问题。

---

## 7. 用户反馈摘要

从今日 Issues 可以提炼出以下真实用户痛点。

### 配置工具必须避免隐式破坏

来自 [Issue #11606](https://github.com/zeroclaw-labs/zeroclaw/issues/11606)。  
用户的核心不满是：一个看似局部的 `upsert_agent` 操作不应对整个 `config.toml` 做破坏性 round-trip。尤其是 risk/runtime profiles、agent limits、安全策略字段等，属于高价值配置资产，任何默认值填充、字段丢失或重置都可能造成安全与行为偏差。

### 长连接 / Listener 必须具备超时和自恢复能力

来自 [Issue #11608](https://github.com/zeroclaw-labs/zeroclaw/issues/11608)。  
Telegram channel 用户的痛点是：网络 blackhole、VPN 抖动、NAT/LB idle drop 等现实环境问题不可避免，listener 不能因为一个无 timeout 的 HTTP request 永久 wedge。用户期待 `listener_health` 不只是检测 stale，还能触发恢复动作。

### Supervised agent 执行语义需要更符合“已批准可重用”的直觉

来自 [Issue #11612](https://github.com/zeroclaw-labs/zeroclaw/issues/11612)。  
在 supervised mode 中，用户期望同一 turn 内已经批准过的 shell command 可以安全重跑，或至少不会直接 abort agent loop 和结束 ACP session。该反馈来自行为安全测试场景，说明 ZeroClaw 在工具审批状态机上的边界条件仍需改进。

### Onboarding 体验正在成为用户需求中心

来自 [PR #11597](https://github.com/zeroclaw-labs/zeroclaw/pull/11597)、[#11602](https://github.com/zeroclaw-labs/zeroclaw/pull/11602)、[#11596](https://github.com/zeroclaw-labs/zeroclaw/pull/11596)、[#11604](https://github.com/zeroclaw-labs/zeroclaw/pull/11604)。  
贡献者正在围绕 ChatGPT plan、Claude Code native account、isolated instance、local setup package 构建一条完整 onboarding 路径。这反映用户希望 ZeroClaw 更容易接入已有本地账号和工具链，而不是要求复杂手动配置。

---

## 8. 待处理积压

当前数据仅覆盖过去 24 小时，无法可靠识别“长期未响应”的历史积压。不过，从今日开放项看，以下问题和 PR 建议维护者优先关注：

### 高优先级待处理

1. [Issue #11606](https://github.com/zeroclaw-labs/zeroclaw/issues/11606)  
   **原因**：`priority:p1`、`risk:high`，且影响配置完整性和安全策略。建议优先确认修复路径，并补充回归测试，确保 config patch 不再全量 defaulted rewrite。

2. [Issue #11608](https://github.com/zeroclaw-labs/zeroclaw/issues/11608)  
   **原因**：S1 workflow blocked。建议确认是否由 [PR #11601](https://github.com/zeroclaw-labs/zeroclaw/pull/11601) 覆盖；如未覆盖，应单独增加 HTTP timeout、listener cancellation/restart 或 watchdog recovery。

3. [Issue #11612](https://github.com/zeroclaw-labs/zeroclaw/issues/11612)  
   **原因**：影响 supervised mode 下 shell approval 与 ACP session 稳定性。建议明确重复调用已批准命令的状态机语义，并避免直接终止整个 agent loop。

### 大型堆叠 PR 需维护者协调

1. [PR #11597](https://github.com/zeroclaw-labs/zeroclaw/pull/11597)  
2. [PR #11602](https://github.com/zeroclaw-labs/zeroclaw/pull/11602)  
3. [PR #11596](https://github.com/zeroclaw-labs/zeroclaw/pull/11596)  
4. [PR #11604](https://github.com/zeroclaw-labs/zeroclaw/pull/11604)  

这些 PR 共同组成 native onboarding / local account usage 功能线，其中多个标记为 `size:XL`、`risk:high` 或基于非 `master` 的 stacked branch。建议维护者拆分审查面：认证与身份绑定、安全策略、本地存储、CLI UX、测试覆盖分别评审，避免大型功能长期悬置。

### 快速可合并候选

- [PR #11611](https://github.com/zeroclaw-labs/zeroclaw/pull/11611) — Android 构建恢复，`size:XS`  
- [PR #11610](https://github.com/zeroclaw-labs/zeroclaw/pull/11610) — 禁止 workspace-wide `set_current_dir`，`size:XS`  
- [PR #11599](https://github.com/zeroclaw-labs/zeroclaw/pull/11599) — provider `native_tools` 配置一致性，`size:XS`  
- [PR #11603](https://github.com/zeroclaw-labs/zeroclaw/pull/11603) — 文档级 runtime policy 提案，`size:XS`  

这些 PR 体量较小，若 CI 和 review 通过，适合作为短期合并目标，以提高主干健康度并减少开放 PR 堆积。

---

## 项目健康度判断

**总体健康度：中等偏活跃，但稳定性风险偏高。**

积极信号是：过去 24 小时 PR 数量较多，覆盖 bugfix、runtime、channel、provider、security policy、onboarding 等多个关键方向；社区也能通过外部测试工具发现复杂行为问题。  
风险信号是：今日无合并落地，且新增 Issues 中包含 P1/high-risk 配置破坏、S1 channel wedge、agent loop abort 等影响生产可用性的稳定性问题。短期建议优先合并小型稳定性修复，并为高风险配置与审批状态机问题建立回归测试。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*