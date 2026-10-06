# OpenClaw 生态日报 2026-10-06

> Issues: 8 | PRs: 41 | 覆盖项目: 13 个 | 生成时间: 2026-10-06 05:23 UTC

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
**日期：2026-10-06**  
**仓库：** https://github.com/openclaw/openclaw

---

## 1. 今日速览

过去 24 小时 OpenClaw 活跃度很高：Issues 更新 **8 条**，PR 更新 **41 条**，并发布了 **v2026.10.1-beta.1**。项目当前主要聚焦在 **session / memory 稳定性、Control UI 体验、Gateway 性能、移动端流畅度、插件与 MCP 可用性、测试与发布流水线稳定性**。  
从 PR 状态看，当前仍有 **28 个待合并 PR**，其中不少已处于 “ready for maintainer look” 或 “needs proof” 阶段，说明维护压力主要集中在 review、验证和安全边界确认。  
风险面上，今日出现了一个 **P0 crash-loop / 资源耗尽类问题**，以及多个 P1/P2 级别的 Gateway、会话状态、插件授权、容器权限和测试资源增长问题，需要持续关注。总体来看，项目迭代速度快，但稳定性、回归验证和安全审查压力同步上升。

---

## 2. 版本发布

### v2026.10.1-beta.1：openclaw 2026.10.1-beta.1  
链接：暂无具体 Release URL，可见仓库 Releases：  
https://github.com/openclaw/openclaw/releases

#### 更新重点

本次 beta 的核心主题是 **Sessions and memory**，主要围绕会话状态、远程工作区附件、取消队列、transcript alias、continuation signature 和 embedding cache 迁移展开。

主要更新包括：

- **会话与内存状态保持**
  - 在 registry 变更期间保留 usage 信息，降低模型或 agent registry 调整后会话统计丢失、错乱的概率。
- **远程工作区 worker attachments**
  - 改进远程 workspace 中 worker attachments 的传递能力，有助于跨环境运行时的上下文完整性。
- **取消队列与活跃 turn 防卡死**
  - 防止 queued cancellations 和 transcript aliases 导致 active turns 停滞。
- **Continuation signatures 对齐**
  - 继续对齐 continuation signatures，减少恢复、续写或跨 turn 状态不一致问题。
- **Embedding cache 迁移**
  - 执行 embedding caches 迁移，可能改善记忆、检索或长期上下文相关能力的兼容性。

#### 破坏性变更

当前 Release 摘要中 **未明确提及破坏性变更**。  
但由于涉及 **embedding cache migration、session / memory 状态、registry changes**，建议生产环境用户在升级前备份以下内容：

- 会话数据库
- memory / embedding cache
- agent registry 配置
- 插件配置与 MCP server 配置

#### 迁移注意事项

建议升级前后重点检查：

1. `sessions.list` / RPC 与 Control UI 中会话数量是否一致。  
   相关 Issue：[#165391](https://github.com/openclaw/openclaw/issues/165391)

2. 模型切换或 Gateway restart 后，Control UI context window 是否显示正确 token 上限。  
   相关 Issue：[#165421](https://github.com/openclaw/openclaw/issues/165421)

3. 如果使用 beta 发布流水线或 nightly prepack，确认 compatibility inventory 已包含 `2026.10.1-beta.1`。  
   已关闭 Issue：[#165847](https://github.com/openclaw/openclaw/issues/165847)

---

## 3. 项目进展

> 注：数据中标记为 CLOSED 的 PR 未区分 “已合并” 与 “已关闭未合并”，以下按“已关闭/完成流转的重要 PR”分析其潜在推进价值。

### 3.1 发布与构建流水线稳定性

#### PR #165947：build: advance shared Bun runtime to 667c4ab22c  
链接：https://github.com/openclaw/openclaw/pull/165947  
状态：CLOSED  
标签：`docs`, `scripts`, `size: XS`, `proof: sufficient`, `P2`

该 PR 推进了 macOS packaging、Tauri 和 CI 使用的共享 Bun runtime pin，从 `bf0b6cde28` 升级到已验证的 `667c4ab22c` prerelease。  
这对跨平台构建一致性有帮助，尤其是 Darwin/Linux 目标。Windows 发布仍受 signing gate 限制。

**项目推进意义：**

- 提升构建环境一致性
- 降低 CI 与本地 packaging 环境漂移
- 支撑后续 beta / nightly 发布稳定性

---

#### Issue #165847：Nightly prepack rejects published beta missing from update compatibility inventory  
链接：https://github.com/openclaw/openclaw/issues/165847  
状态：CLOSED  
严重度：P2

该问题指出 nightly npm artifact preparation 因 update compatibility inventory 缺失已发布的 `2026.10.1-beta.1` 而无法通过 prepack。  
该 issue 已关闭，说明发布元数据或兼容性清单问题可能已经被处理。

**项目推进意义：**

- 修复 beta 发布链路中的回归
- 减少 nightly artifact 阻塞
- 对持续交付健康度有直接影响

---

### 3.2 Gateway 与性能优化

#### PR #165941：perf(gateway): reuse node catalogs and paired-device bindings  
链接：https://github.com/openclaw/openclaw/pull/165941  
状态：CLOSED  
标签：`gateway`, `security-sensitive-changed`, `proof: sufficient`, `P2`

该 PR 关注重复 node discovery 的性能问题：当 registry 和 pairing store 未变化时，避免重复重建 catalog 和 paired-device binding projection。  
对拥有大量 paired operator devices 的安装环境尤其有价值。

**项目推进意义：**

- 降低 Gateway 重复查询成本
- 改善多设备绑定场景下的节点列表响应速度
- 涉及安全敏感变更，后续仍需关注回归风险

---

#### PR #165942：perf(agents): reduce startup registry restore latency  
链接：https://github.com/openclaw/openclaw/pull/165942  
状态：CLOSED  
标签：`gateway`, `agents`, `P2`, `status: waiting on author`

该 PR 针对大型 retained subagent registries 导致 Gateway readiness 延迟的问题。描述中提到早前 worker cutover 虽然减少了主线程阻塞，但使 restore wall time 从 **10.16s 增加到 17.93s**。  
该 PR 试图缩短 3,000-row synthetic registry 的恢复时间。

**项目推进意义：**

- 对大规模 agent registry 的启动体验重要
- 但状态显示仍曾处于 waiting on author，说明该方向可能还需要更多验证或修改

---

### 3.3 Control UI 与会话展示改进

#### PR #165725：improve: name launched subagents in the operations group  
链接：https://github.com/openclaw/openclaw/pull/165725  
状态：CLOSED  
标签：`app: web-ui`, `agents`, `proof: screenshot`, `P3`

该 PR 改善 Control UI 中 subagent launch rows 的可读性。此前 operations group 中每个 subagent launch row 显示 instruction 开头，难以区分多个相似 subagent。  
该改进将 subagent 命名纳入展示，有助于用户理解 agent orchestration 过程。

**项目推进意义：**

- 改善多 subagent 场景的可观测性
- 降低用户在复杂 agent 执行树中的认知负担

---

#### PR #165542：improve: continue a resumed answer in the block that handed off  
链接：https://github.com/openclaw/openclaw/pull/165542  
状态：CLOSED  
标签：`app: web-ui`, `proof: screenshot`, `P2`

该 PR 解决 agent handoff 后恢复回答时，Control UI 将后续回答渲染为新的 assistant block 的问题。修复后，恢复内容会继续出现在原 handoff block 中，减少视觉断裂。

**项目推进意义：**

- 提升 Control UI 对复杂 turn / subagent 流程的表达一致性
- 降低用户误解“新 assistant 回复”的概率

---

### 3.4 测试基础设施

#### PR #165949：fix(test): run Copilot auth persistence tests in forked hosts  
链接：https://github.com/openclaw/openclaw/pull/165949  
状态：CLOSED  
标签：`size: XS`, `P2`

该 PR 解决 GitHub Copilot onboarding persistence tests 在 provider test lane 的 worker threads 中运行时，因缺少 main-thread database broker 而失败的问题。

**项目推进意义：**

- 提升 Copilot provider 相关测试稳定性
- 降低 CI 假失败率
- 有助于保持 auth persistence 行为可验证

---

#### PR #165952：chore(ui): refresh control ui locales  
链接：https://github.com/openclaw/openclaw/pull/165952  
状态：CLOSED  
标签：`app: web-ui`, `size: M`

该 PR 由 bot 生成，用于同步 Control UI locales，并通过 reviewable PR 路径而不是绕过 protected branch checks。

**项目推进意义：**

- 保持 UI 多语言资源同步
- 保持分支保护流程完整
- 属于健康的自动化维护行为

---

## 4. 社区热点

### 4.1 Control UI 会话数量显示不一致

#### Issue #165391：Control UI dashboard shows N session rows but sessions.list / RPC show M  
链接：https://github.com/openclaw/openclaw/issues/165391  
状态：OPEN  
评论数：8  
标签：`P2`, `impact:session-state`, `impact:ux-friction`

这是今日评论最多的 Issue。用户报告 Control UI dashboard 显示的 session 行数与 `sessions list` / RPC 返回数量不一致，并且 M 远小于 N。  
虽然描述中称为 cosmetic、无功能影响，但它会污染 dashboard 视图，并影响 session count assertions。

**背后诉求：**

- 用户希望 UI 与 RPC / CLI 数据源保持一致
- session state 作为 AI assistant 的核心运行状态，需要更高可解释性
- Dashboard 中的“幽灵 session”会降低操作者对系统状态的信任

**相关方向：**

- v2026.10.1-beta.1 正在处理 sessions and memory 稳定性
- 该 issue 可能是 beta 后续修复的重要候选

---

### 4.2 Control UI context window stale maxTokens

#### Issue #165421：context window widget renders stale maxTokens after model switch / restart  
链接：https://github.com/openclaw/openclaw/issues/165421  
状态：OPEN  
评论数：7  
标签：`P2`, `impact:session-state`, `impact:ux-friction`

用户报告模型切换或 Gateway restart 后，Control UI context window widget 仍显示旧的 `maxTokens`，例如 128k。  
实际模型上下文可能正常，但 UI 会误导 operator 以为接近上下文限制。

**背后诉求：**

- 模型状态切换后 UI 需要及时反映真实能力
- 用户依赖 context widget 判断是否需要截断、总结或切换模型
- 对长上下文 AI assistant 来说，token budget 可视化是关键 UX

---

### 4.3 长文本粘贴安全边界

#### PR #165776：fix(media): long Control UI pastes reach the model as untrusted external content  
链接：https://github.com/openclaw/openclaw/pull/165776  
状态：OPEN  
标签：`merge-risk: security-boundary`, `security-review-required`, `status: waiting on author`, `P2`

该 PR 处理 Control UI 中长文本粘贴进入模型时应被标记为 untrusted external content 的问题。  
这是一个安全边界类变更，涉及模型上下文中用户输入、外部内容、可信内容之间的隔离。

**背后诉求：**

- 用户粘贴的长内容可能包含 prompt injection 或非可信外部文本
- 模型需要明确区分 operator instruction 与 external content
- Control UI 输入通道也应遵守同样的内容信任模型

**维护关注点：**

- 需要安全审查
- 当前状态为 waiting on author，建议优先推动补充证明与 threat model

---

### 4.4 Voice-call 能力扩展

#### PR #165716：feat(voice-call): per-call briefs, call reports, live steering, callbacks, and voicemail detection  
链接：https://github.com/openclaw/openclaw/pull/165716  
状态：OPEN  
标签：`channel: voice-call`, `size: XL`, `merge-risk: security-boundary`, `status: needs proof`, `P2`

该 PR 是今日功能面最重的变更之一，目标是让 agent 能更好地代表用户打电话，包括：

- 每通电话独立 brief
- call reports
- live steering
- callbacks
- voicemail detection

**背后诉求：**

- 用户希望 AI assistant 不只是“聊天”，而是能执行真实世界任务
- 电话代理场景需要更强的任务约束、授权边界与结果汇报
- live steering 表明用户希望在执行过程中可介入、可纠偏

**风险：**

- 涉及语音通话、外部交互和授权边界
- 需要充分 proof 和安全审查

---

## 5. Bug 与稳定性

### P0 / Crash-loop / 资源耗尽

#### Issue #165946：Codex plugin capture build retried without bound by prepared-model-catalog worker  
链接：https://github.com/openclaw/openclaw/issues/165946  
状态：OPEN  
标签：`P0`, `impact:crash-loop`, `clawsweeper:needs-info`

用户报告在 OpenClaw 2026.9.6 中，prepared-model-catalog worker 对 Codex plugin capture build 进行无界重试，导致：

- heap 达到 **9.4 GiB**
- 512 MB limit 被忽略
- 约 **251 GB disk writes**
- Codex plugin 存在但未使用
- 从 2026.8.2 升级后出现

**严重性评估：高。**  
这是今日最严重的稳定性问题，涉及资源耗尽、潜在 crash-loop、大量磁盘写入和 worker retry 策略失控。

**当前是否有 fix PR：** 数据中未见直接关联 fix PR。  
**建议优先级：最高。**

---

### P1

#### PR #165432：fix(gateway): claude-cli session tools fail after the turn that started the MCP loopback ends  
链接：https://github.com/openclaw/openclaw/pull/165432  
状态：OPEN  
标签：`P1`, `gateway`, `proof: sufficient`, `ready for maintainer look`

该 PR 修复 claude-cli agent 在启动 MCP loopback 的 turn 结束后，bridge tools 无法继续工作的问题。

**影响：**

- 影响 claude-cli session tools 的持续可用性
- 对依赖 MCP loopback 的 agent 工作流影响明显

**当前状态：** 已有 fix PR，且 proof sufficient，等待维护者 review。

---

#### PR #165862：fix(crabbox): allow new boxes when tool call IDs repeat  
链接：https://github.com/openclaw/openclaw/pull/165862  
状态：OPEN  
标签：`P1`, `merge-risk: compatibility`, `needs proof`

该 PR 修复 provider 在后续响应中重复 tool call ID 时，Crabbox box allocation key 冲突，导致新 box 创建失败的问题。

**影响：**

- 工具调用 ID 重复会导致环境创建失败
- 对使用 Crabbox 的 agent sandbox / tool execution 场景影响较大

**当前状态：** 已有 fix PR，但需要补充 proof。

---

### P2

#### Issue #165950：health and status wait behind the request-start preparation queue  
链接：https://github.com/openclaw/openclaw/issues/165950  
状态：OPEN  
标签：`P2`, `needs-maintainer-review`, `needs-product-decision`

用户报告当四个慢 request preparations 占满 Gateway request-start capacity 时，`health` 等 control-plane RPC 也无法获得 start permission。  
本质上是 request-start scheduler 单队列或缺少 control-plane priority 导致健康检查被业务请求阻塞。

**影响：**

- 运维健康检查可能失真
- Gateway 在压力下看起来“不可用”
- 影响自动化监控和恢复策略

**当前是否有 fix PR：** 未见直接 fix PR。  
**建议：** 需要产品层决定 health/status 是否应绕过或优先于普通请求准备队列。

---

#### Issue #165938：concurrent SQLite writer can exhaust temporary storage with an unbounded WAL  
链接：https://github.com/openclaw/openclaw/issues/165938  
状态：OPEN  
标签：`P2`, `diamond lobster`, `source-repro`

这是 schema-preflight tests 中 concurrent SQLite writer fixture 导致 WAL 增长直至临时文件系统耗尽的问题。描述明确说明这是 **test-fixture resource-growth finding**，不证明生产 SQLite 或 runtime GC 缺陷。

**已有 fix PR：**  
PR #165940：fix(test): pace WAL writes during snapshot inspection  
链接：https://github.com/openclaw/openclaw/pull/165940  
状态：OPEN，`proof: sufficient`, `ready for maintainer look`

**影响：**

- CI / 测试环境可能因临时存储耗尽失败
- 对产品运行时影响较低，但会影响开发效率和测试可靠性

---

#### Issue #165951：Official @openclaw/gitlab plugin declares an MCP server invisible to openclaw mcp CLI  
链接：https://github.com/openclaw/openclaw/issues/165951  
状态：OPEN  
标签：`bug`, `bug:behavior`

用户报告官方 `@openclaw/gitlab` plugin 声明了 MCP server，但该 server 对 `openclaw mcp` CLI 不可见，从而阻塞 OAuth authorization。  
环境为 OpenClaw 2026.9.8，macOS arm64。

**影响：**

- GitLab 插件 OAuth 授权流程被阻塞
- 官方插件与 CLI MCP discovery 之间存在一致性问题

**当前是否有 fix PR：** 未见直接 fix PR。  
**建议：** 需要检查 plugin manifest、MCP server registration、CLI discovery 路径是否一致。

---

#### Issue #165391：Control UI session rows 与 RPC session list 不一致  
链接：https://github.com/openclaw/openclaw/issues/165391  
状态：OPEN  
严重度：P2

详见社区热点。  
**当前是否有 fix PR：** 未见直接 fix PR。

---

#### Issue #165421：Control UI context window stale maxTokens  
链接：https://github.com/openclaw/openclaw/issues/165421  
状态：OPEN  
严重度：P2

详见社区热点。  
**当前是否有 fix PR：** 未见直接 fix PR。

---

#### PR #165917：fix: bundled runtime assets fail for arbitrary container users  
链接：https://github.com/openclaw/openclaw/pull/165917  
状态：OPEN  
标签：`P2`, `merge-risk: automation`, `merge-risk: compatibility`, `needs proof`

该 PR 解决生成的 OpenClaw 和 bundled-plugin 文件可能带有 owner-only 权限，导致任意 container user 无法读取 Control UI、plugin assets 或 runtime modules 的问题。

**影响：**

- 容器环境中使用非 root / arbitrary UID 时可能启动失败或资源不可读
- 对 Kubernetes、OpenShift 等平台尤其重要

**当前状态：** 已有 fix PR，但需要 proof。

---

## 6. 功能请求与路线图信号

### 6.1 Muse CLI backend 的 bundle MCP mode

#### Issue #165943：Feature: muse-system-settings bundle MCP mode for Muse CLI backends  
链接：https://github.com/openclaw/openclaw/issues/165943  
状态：OPEN  
标签：`P3`, `needs-product-decision`

该功能请求指出，某些 file-based CLI backends 无法消费 OpenClaw 的 bundle MCP bridge，因为 CLI：

- 不展开 `${}` placeholders
- 不继承 env 到 MCP servers
- 从固定位置读取 MCP config

用户提出 `muse-system-settings` bundle MCP mode 以支持 Muse CLI backends。

**路线图信号：**

- MCP 集成正在从“支持主流路径”走向“适配不同 CLI backend 的配置现实”
- 对本地 CLI agent、文件配置型 agent、非标准 MCP 启动路径的兼容性需求增加
- 当前标签显示需要 maintainer review 和 product decision，短期不一定进入下个版本

---

### 6.2 Voice-call 高级任务执行能力

#### PR #165716：feat(voice-call): per-call briefs, call reports, live steering, callbacks, and voicemail detection  
链接：https://github.com/openclaw/openclaw/pull/165716

该 PR 已经是具体实现而非单纯 feature request，尽管仍需 proof。  
如果验证与安全审查顺利，voice-call 可能成为下一阶段 OpenClaw 从“多渠道消息助手”走向“现实世界任务代理”的重要方向。

**纳入下一版本可能性：中等。**  
原因：功能价值高，但 PR 体量 XL 且涉及 security-boundary。

---

### 6.3 iOS / macOS 原生聊天性能

#### PR #165927：improve(ios): native chat stalls less on each streaming event  
链接：https://github.com/openclaw/openclaw/pull/165927  
状态：OPEN  
标签：`P2`, `needs proof`

该 PR 解决 native chat 在 streaming event 期间频繁解析每条 transcript row、重建 long-press 和 actions menu 导致卡顿的问题。

#### PR #165948：improve(ios): swiping the chat no longer rebuilds every message on each scroll tick  
链接：https://github.com/openclaw/openclaw/pull/165948  
状态：OPEN  
标签：`app: ios`, `app: macos`, `proof: sufficient`

这两个 PR 表明移动端与原生端聊天性能是当前明确优化方向。  
尤其是 streaming reply、tool run、scroll tick 场景，对真实使用体验影响明显。

**纳入下一版本可能性：较高。**  
原因：已有具体 PR，且至少 #165948 proof sufficient；但 #165927 仍需 proof。

---

### 6.4 Plain language 语言清理

今日多个 PR 围绕将 “probe / probing” 替换为更易懂的 “check / connection check / test”：

- PR #165736：docs: use plain language for connection checks  
  https://github.com/openclaw/openclaw/pull/165736
- PR #165737：fix(ui): use plain language for connection checks  
  https://github.com/openclaw/openclaw/pull/165737
- PR #165740：fix(cli): use plain language for connection checks  
  https://github.com/openclaw/openclaw/pull/165740
- PR #165741：fix(plugins): use plain language for diagnostic checks  
  https://github.com/openclaw/openclaw/pull/165741
- PR #165742：fix(runtime): use plain language for diagnostic checks  
  https://github.com/openclaw/openclaw/pull/165742

**路线图信号：**

- 项目正在降低操作员、插件作者和最终用户对内部术语的理解成本
- 说明 OpenClaw 可能在向更广泛用户群扩展，而不仅仅面向工程用户
- 这些 PR 多数已 ready for maintainer look，进入下一版本概率较高

---

## 7. 用户反馈摘要

### 7.1 用户希望 UI 状态与实际 RPC / CLI 状态一致

来自 Issue #165391 和 #165421 的反馈表明，用户高度依赖 Control UI 来理解系统状态。  
即使问题被标记为 cosmetic，只要 UI 显示与 RPC / CLI 不一致，就会影响 operator 的信任。

典型痛点：

- Dashboard 显示过多 session row，导致 session count 判断混乱
- context window 显示 stale token limit，让用户误判上下文压力
- UI 与底层状态不同步时，用户难以判断是显示 bug 还是系统状态异常

相关链接：

- https://github.com/openclaw/openclaw/issues/165391
- https://github.com/openclaw/openclaw/issues/165421

---

### 7.2 用户对插件与 MCP discovery 的可预测性要求提高

Issue #165951 显示，官方 GitLab plugin 声明 MCP server 后，用户期望 `openclaw mcp` CLI 能直接发现并完成 OAuth。  
当插件 manifest、MCP CLI 和 OAuth 流程不一致时，用户会被卡在授权前置步骤。

相关链接：  
https://github.com/openclaw/openclaw/issues/165951

---

### 7.3 用户对资源控制和后台 worker 行为非常敏感

Issue #165946 的反馈非常强烈：即使 Codex plugin 未被使用，后台 worker 仍进行无界 retry，并造成巨大 heap 和磁盘写入。  
这类问题会让用户对“安装但未使用的插件是否安全”产生担忧。

相关链接：  
https://github.com/openclaw/openclaw/issues/165946

---

### 7.4 用户希望 AI assistant 能执行更真实的外部任务

PR #165716 反映出用户希望 voice-call agent 可以：

- 针对每通电话设置不同目标
- 实时调整策略
- 识别语音信箱
- 生成通话报告
- 处理 callback

这表明 OpenClaw 用户需求正在从“对话与工具调用”扩展到“受控代理执行”。

相关链接：  
https://github.com/openclaw/openclaw/pull/165716

---

### 7.5 用户对移动端流畅度的容忍度较低

PR #165927 和 #165948 指向 native chat 的 streaming 和 scrolling 性能问题。  
当 AI 回复以流式方式输出时，用户仍期待输入、滚动、长按菜单等交互保持流畅。

相关链接：

- https://github.com/openclaw/openclaw/pull/165927
- https://github.com/openclaw/openclaw/pull/165948

---

## 8. 待处理积压

> 数据仅覆盖过去 24 小时，无法完整判断“长期未响应”。以下为当前状态中需要维护者优先关注的待处理项。

### 8.1 需要安全审查或安全边界判断

#### PR #165776：long Control UI pastes as untrusted external content  
链接：https://github.com/openclaw/openclaw/pull/165776  
状态：waiting on author，security-review-required

建议维护者明确：

- 粘贴内容的 trust boundary
- 与现有 media / external content policy 的一致性
- 是否需要 threat model 或 regression tests

---

#### PR #165716：voice-call advanced capabilities  
链接：https://github.com/openclaw/openclaw/pull/165716  
状态：needs proof，security-boundary

建议补充：

- 授权边界说明
- live steering 的审计与回放能力
- callback / voicemail 场景的失败模式
- 用户可撤销或限制 agent 行为的机制

---

### 8.2 需要 maintainer review 且已有 proof 的高价值 PR

#### PR #165432：claude-cli session tools fail after MCP loopback turn ends  
链接：https://github.com/openclaw/openclaw/pull/165432  
优先级：P1  
状态：ready for maintainer look，proof sufficient

建议优先 review。该问题直接影响 claude-cli agent 工具链连续性。

---

#### PR #165680：perf(state): admit agent databases once off the main thread  
链接：https://github.com/openclaw/openclaw/pull/165680  
优先级：P2  
状态：ready for maintainer look，proof sufficient

该 PR 涉及将 agent database cold-admission 成本移出 Gateway 主线程，并处理 background observer persistence。  
对启动性能和 Gateway 响应性有潜在较大收益。

---

#### PR #165909：perf(sessions): reuse branch summaries and the maintenance reader  
链接：https://github.com/openclaw/openclaw/pull/165909  
优先级：P2  
状态：ready for maintainer look，proof sufficient

该 PR 针对 `sessions.branches.list` 707 ms per call 的性能问题，优化 retained host summary、metadata append、identity read 等路径。  
与 session-heavy 使用场景高度相关。

---

#### PR #165940：fix(test): pace WAL writes during snapshot inspection  
链接：https://github.com/openclaw/openclaw/pull/165940  
优先级：P2  
状态：ready for maintainer look，proof sufficient  
关联 Issue：https://github.com/openclaw/openclaw/issues/165938

建议尽快合并以减少 CI / 测试环境临时存储耗尽风险。

---

### 8.3 需要 proof 的重要 PR

#### PR #165917：bundled runtime assets fail for arbitrary container users  
链接：https://github.com/openclaw/openclaw/pull/165917  
状态：needs proof  
风险：automation、compatibility

建议补充：

- arbitrary UID 容器运行测试
- OpenShift / rootless container 场景验证
- Control UI、plugin assets、runtime modules 可读性检查

---

#### PR #165927：iOS native chat streaming performance  
链接：https://github.com/openclaw/openclaw/pull/165927  
状态：needs proof

建议补充：

- streaming event benchmark
- scroll / typing latency 对比
- 大 transcript 场景录屏或 profiling 数据

---

#### PR #165862：Crabbox repeated tool call IDs  
链接：https://github.com/openclaw/openclaw/pull/165862  
状态：needs proof  
优先级：P1

建议补充 provider repeated tool call ID 的最小复现与兼容性验证。

---

## 总体健康度评估

OpenClaw 今日呈现出 **高活跃、高吞吐、高维护压力** 的状态。项目在 session / memory、Gateway 性能、Control UI、移动端体验、voice-call、插件 MCP 兼容性等方向均有推进，说明产品面持续扩张。  
但同时，P0 资源耗尽问题、多个 P1/P2 稳定性问题、安全边界 PR、容器权限问题和 CI 测试资源增长问题表明，项目复杂度正在快速上升。短期内建议维护者优先处理：

1. P0 Codex plugin worker 无界 retry / 资源耗尽：  
   https://github.com/openclaw/openclaw/issues/165946

2. P1 MCP loopback 工具失效：  
   https://github.com/openclaw/openclaw/pull/165432

3. P1 Crabbox repeated tool call ID：  
   https://github.com/openclaw/openclaw/pull/165862

4. P2 health/status 被 request-start queue 阻塞：  
   https://github.com/openclaw/openclaw/issues/165950

5. Control UI session / context 状态一致性问题：  
   https://github.com/openclaw/openclaw/issues/165391  
   https://github.com/openclaw/openclaw/issues/165421

整体来看，项目仍处于健康且高速演进状态，但下一阶段需要更强的 **回归验证、安全审查和运行时资源治理** 来支撑功能扩张。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告  
日期：2026-10-06

---

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态整体呈现 **高活跃、高复杂度、重安全与稳定性治理** 的态势。OpenClaw、Hermes Agent、ZeroClaw、NanoClaw 等项目均在快速推进，但问题焦点已从“能接入模型和工具”转向 **会话状态一致性、插件 / MCP 安全边界、跨平台运行稳定性、真实通信渠道接入与多智能体编排**。

生态内出现两个明显分化：一类项目正在扩张产品能力，如 voice-call、SMS/iMessage、Signal 附件、Agent Workspace；另一类项目则进入发布质量和安全加固阶段，如 Docker 镜像门禁、凭据脱敏、沙箱隔离、升级 pin 策略。整体看，开源 AI 助手正在从“开发者工具”演进为“长期运行的个人 / 团队代理基础设施”。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 今日状态 / 健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 8 | 41 | **v2026.10.1-beta.1** | 高活跃、高吞吐；发布节奏快，但 P0 资源耗尽与安全边界 PR 带来维护压力 |
| **NanoBot** | 4 | 13 | 无 | 健康活跃；MCP、WebUI、记忆、Cron、安全修复并进 |
| **Hermes Agent** | 50 | 50 | 无 | 极高活跃；Desktop、Windows、Provider、MCP/Auth 问题密集，PR 积压明显 |
| **PicoClaw** | 0 | 1 | 无 | 活跃度低；唯一动态为 Sendblue iMessage/SMS 通道 PR |
| **NanoClaw** | 0 | 14 | **v2026.10.0-rc.2** | Release candidate 稳定化阶段；重点在安装更新、Windows/macOS、OneCLI 兼容 |
| **NullClaw** | 8 | 10 | 无 | 质量修复冲刺；Docker、测试隔离、安全、CLI 体验是重点 |
| **IronClaw** | 2 | 2 | 无 | 中低活跃；WebChat 后台状态修复与 Sendblue 扩展并行 |
| **LobsterAI** | 4 | 4 | 无 | 安全响应快；main 分支存在高优先级安全债务，发布前需修复 |
| **TinyClaw** | 0 | 0 | 无 | 无活动 |
| **Moltis** | 2 | 2 | 无 | 聚焦多用户聊天身份、Skills frontmatter 稳定性 |
| **CoPaw** | 0 | 1 | 无 | 低活跃；钉钉渠道插件化是主要架构信号 |
| **ZeptoClaw** | 0 | 0 | 无 | 无活动 |
| **ZeroClaw** | 15 | 12 | 无 | 高开发活跃但无合并；sandbox、插件权限、SOP、Agent Workspace 风险与机会并存 |

### 活跃度分层

| 层级 | 项目 |
|---|---|
| **极高活跃 / 高复杂度** | Hermes Agent、OpenClaw、ZeroClaw |
| **稳定迭代 / 质量巩固** | NanoBot、NanoClaw、NullClaw、LobsterAI |
| **中低活跃 / 局部功能推进** | IronClaw、Moltis、PicoClaw、CoPaw |
| **静默 / 暂无活动** | TinyClaw、ZeptoClaw |

---

## 3. OpenClaw 在生态中的定位

### 3.1 定位概括

OpenClaw 是当前生态中最接近 **全栈型个人 AI 助手平台** 的项目之一。它同时覆盖：

- Control UI；
- Gateway；
- session / memory；
- plugin / MCP；
- mobile / native client；
- voice-call；
- subagent orchestration；
- release / CI / packaging。

与多数单点型项目相比，OpenClaw 的技术面更宽，产品形态更完整，也因此暴露出更多系统级复杂度。

### 3.2 相对优势

| 维度 | OpenClaw 表现 |
|---|---|
| **发布节奏** | 今日发布 v2026.10.1-beta.1，说明持续交付能力强 |
| **功能覆盖面** | 同时推进 session、memory、Gateway、Control UI、MCP、mobile、voice-call |
| **社区 / 维护活跃度** | 8 个 Issue、41 个 PR，处于生态第一梯队 |
| **产品完整度** | 不只是 CLI 或单一 bot，而是包含控制台、运行时、插件、移动端、语音通话的综合系统 |
| **工程治理意识** | 多个 PR 标记 proof、security-review、merge-risk，说明 review 流程较成熟 |

### 3.3 主要风险

OpenClaw 的风险也来自其全栈复杂度：

- **P0 资源耗尽**：Codex plugin capture build 无界 retry，导致 heap、磁盘写入异常增长；
- **session / UI 状态一致性**：Control UI session rows 与 RPC 不一致，context window token 上限 stale；
- **安全边界压力**：长文本粘贴 trust boundary、voice-call 授权边界、插件/MCP 安全审查；
- **PR 积压**：28 个待合并 PR，维护者 review 压力明显。

### 3.4 与同类项目对比

| 对比对象 | OpenClaw 差异 |
|---|---|
| **Hermes Agent** | Hermes 社区活跃度更高，Desktop/Windows/multi-profile 问题更密集；OpenClaw 更强调 Gateway、Control UI、session/memory 与插件生态的整体平台化 |
| **NanoBot** | NanoBot 更轻量，偏 MCP/WebUI/记忆/渠道扩展；OpenClaw 技术栈更完整，运行时复杂度更高 |
| **NanoClaw** | NanoClaw 当前偏 release candidate 稳定化和安装更新治理；OpenClaw 更偏高速功能迭代与平台能力扩展 |
| **ZeroClaw** | ZeroClaw 更激进地推进 SOP、Colony、Agent Workspace；OpenClaw 更注重 session/memory、Control UI、Gateway 和真实助手体验 |
| **LobsterAI / Moltis / IronClaw** | 这些项目多聚焦局部能力，如桌面安全、多人聊天、WebChat；OpenClaw 覆盖面更广、生态参照价值更强 |

---

## 4. 共同关注的技术方向

### 4.1 多通信渠道接入成为主线

涉及项目：

- **OpenClaw**：voice-call 高级能力；
- **NanoBot**：Sendblue iMessage/SMS PR；
- **PicoClaw**：Sendblue iMessage/SMS transport；
- **NanoClaw**：Sendblue iMessage/SMS skill；
- **IronClaw**：Sendblue iMessage/SMS extension；
- **ZeroClaw**：Signal media attachment support；
- **CoPaw**：DingTalk channel 插件化。

共同诉求：

- 用户希望 AI 助手进入日常通信入口，而不是局限在 Web UI / CLI；
- SMS、iMessage、Signal、DingTalk、voice-call 等通道正在成为个人助手落地关键；
- 通道能力不再只是文本收发，还涉及附件、身份、审批、webhook 安全、费用控制和消息去重。

---

### 4.2 MCP / 插件生态从“可用”走向“可信”

涉及项目：

- **OpenClaw**：GitLab plugin MCP discovery 不一致、长粘贴 trust boundary、MCP loopback；
- **NanoBot**：MCP timeout、MCP credential leakage、防 DNS pinning 绕过；
- **Hermes Agent**：MCP OAuth、plugin secret sources、plugin pack YAML 安全；
- **LobsterAI**：OpenClaw token proxy、技能删除路径、日志凭据泄露；
- **ZeroClaw**：插件权限更新、egress ceremony、manifest/component generation mismatch；
- **Moltis**：per-sender MCP credentials。

共同诉求：

- 插件和 MCP 已成为 agent 扩展能力核心，但安全边界问题开始集中暴露；
- 凭据、权限、外联能力、manifest 一致性、日志脱敏、OAuth issuer 校验都成为重点；
- 下一阶段插件生态竞争点不只是数量，而是 **权限透明、隔离可靠、诊断一致、安全默认值合理**。

---

### 4.3 会话状态、记忆与 UI 一致性仍是核心难题

涉及项目：

- **OpenClaw**：session rows 与 RPC 不一致、context window stale maxTokens、session/memory beta；
- **Hermes Agent**：Desktop sidebar profile 状态错乱、历史消息加载失败、active goal compaction 丢失；
- **NanoBot**：Dream memory 并发保护；
- **Moltis**：shared chat 与 direct chat 分类；
- **IronClaw**：WebChat 后台标签页 run state stale。

共同诉求：

- AI 助手是长期运行系统，用户依赖 UI 理解状态；
- “底层正常但 UI 错误”也会破坏信任；
- session、memory、profile、chat type、context window、goal、notification 等状态需要统一来源和可解释性。

---

### 4.4 资源治理与后台 worker 控制成为稳定性关键

涉及项目：

- **OpenClaw**：Codex plugin worker 无界 retry，251GB disk writes；
- **Hermes Agent**：Windows backend dead port retry storm、composer-images 不清理；
- **NullClaw**：Cron agent job 默认无超时，可能阻塞 scheduler；
- **NanoClaw**：Docker readiness transient failure、SQLite readonly transient；
- **ZeroClaw**：sandbox fallback、安全隔离、shell 子进程控制终端；
- **NanoBot**：Cron 与 Dream 并发一致性。

共同诉求：

- Agent 系统中后台任务、worker、cron、插件构建、浏览器自动化越来越多；
- 无界重试、无超时、无清理、无 backoff 都会被真实部署快速放大；
- 稳定的个人 AI 助手必须具备资源上限、重试边界、清理策略和观测能力。

---

### 4.5 多智能体与工作流编排进入中长期路线图

涉及项目：

- **OpenClaw**：subagent 命名、operations group、handoff block；
- **ZeroClaw**：Agent Workspace / Colony、SOP 可视化与 gate；
- **Hermes Agent**：Kanban orchestration、cron/multiplex gateway；
- **Moltis**：shared chat per-sender credentials；
- **NanoBot**：群聊 observe without always replying。

共同诉求：

- Agent 不再只是单一对话体，而是协作、调度、审批、工具调用和外部任务执行系统；
- 多智能体场景要求更强的身份、权限、任务边界和审计；
- 可视化 workflow、SOP、Kanban、Agent Workspace 可能成为下一阶段差异化功能。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 / 路线特点 |
|---|---|---|---|
| **OpenClaw** | 全栈个人 AI 助手平台，Control UI、Gateway、session/memory、MCP、voice-call、mobile | 高级个人用户、开发者、agent 平台构建者 | 平台化、模块多、发布快；强调运行时、UI 和插件生态 |
| **Hermes Agent** | Desktop、CLI、Provider、多 profile、浏览器自动化、Messaging | 本地 AI 助手重度用户、多 profile / 多用户部署者 | 本地桌面与生产化 host 并重，社区反馈极活跃 |
| **NanoBot** | MCP、WebUI、记忆、Cron、多渠道 | 轻量级个人助手与 MCP 工具用户 | 相对轻量，响应快，安全与稳定性修复节奏良好 |
| **NanoClaw** | 安装更新、技能、OneCLI、跨平台服务稳定性 | 希望稳定部署的个人 / 小团队用户 | 当前处于 release candidate 收敛期，重视升级可预测性 |
| **ZeroClaw** | SOP、Agent Workspace、插件权限、Signal、多智能体 | 需要复杂自动化和多智能体编排的高级用户 | 功能野心大，安全和沙箱复杂度高，当前评审压力大 |
| **NullClaw** | CLI、Docker、测试隔离、安全加固 | CLI 用户、容器部署用户、开发者 | 工程质量导向，强调 release 门禁和 hermetic tests |
| **LobsterAI** | 桌面技能系统、OpenClaw 集成、本地安全 | 桌面 AI 助手用户、技能生态用户 | 当前重点是 main 分支安全收敛和技能生命周期安全 |
| **IronClaw** | WebChat、自托管、Sendblue 扩展 | 自托管 WebChat 用户、轻量通信入口用户 | 关注浏览器状态刷新、通知和 extension 通道 |
| **Moltis** | 多用户聊天、Skills、MCP credentials | 群聊 / 团队 Agent 用户 | 正在处理 shared chat 身份、sender-level credentials |
| **PicoClaw** | 通道扩展 | 轻量个人助手用户 | 今日仅有 Sendblue PR，生态活跃度较低 |
| **CoPaw** | 企业 IM 渠道插件化，DingTalk | 企业办公协作场景 | 渠道插件化、兼容迁移、惰性加载 |
| **TinyClaw / ZeptoClaw** | 暂无明显动态 | - | 过去 24 小时无活动 |

---

## 6. 社区热度与成熟度

### 6.1 快速迭代型

代表项目：

- **Hermes Agent**
- **OpenClaw**
- **ZeroClaw**

特征：

- Issue / PR 数量高；
- 功能和 bug 同时大量涌现；
- 涉及平台级能力，如 Desktop、Gateway、插件权限、多智能体、session state；
- 风险是 PR 积压、安全 review 和稳定性回归。

判断：

- 这些项目最值得跟踪技术路线；
- 适合愿意跟随快速变化、参与贡献或做二次开发的团队；
- 生产采用需谨慎选择 release channel，并关注 P0/P1 修复进度。

---

### 6.2 质量巩固型

代表项目：

- **NanoClaw**
- **NullClaw**
- **NanoBot**
- **LobsterAI**

特征：

- 活跃度中高；
- 议题集中在安全、测试、发布、升级、Cron、记忆一致性；
- 多数问题已有对应 PR；
- 更重视可预测性和可维护性。

判断：

- 这类项目适合关注稳定部署体验；
- 对开发者而言，工程治理实践有参考价值，如 Docker gate、credential redaction、版本 pin、测试隔离。

---

### 6.3 局部能力推进型

代表项目：

- **IronClaw**
- **Moltis**
- **PicoClaw**
- **CoPaw**

特征：

- 今日活动量不大；
- 但议题有明确方向，如 Sendblue、WebChat refresh、per-sender MCP credentials、DingTalk plugin；
- 更像在局部场景中深化能力。

判断：

- 适合观察特定能力的实现方式；
- 如果关注群聊身份、企业 IM、WebChat 自托管、SMS/iMessage 通道，这些项目具有参考价值。

---

### 6.4 静默型

代表项目：

- **TinyClaw**
- **ZeptoClaw**

特征：

- 过去 24 小时无活动；
- 暂无法判断近期维护活跃度。

---

## 7. 值得关注的趋势信号

### 趋势 1：AI 助手正在进入真实通信网络

Sendblue iMessage/SMS 同时出现在 NanoBot、PicoClaw、NanoClaw、IronClaw；ZeroClaw 推进 Signal 附件；OpenClaw 推进 voice-call；CoPaw 推进 DingTalk 插件化。

对开发者的参考价值：

- 通道层会成为 AI 助手差异化入口；
- 需要提前设计 webhook 鉴权、消息去重、费用限制、联系人授权、附件生命周期；
- “能收消息”只是第一步，真实可用还需要通知、审批、失败重试和隐私保护。

---

### 趋势 2：插件 / MCP 的安全模型成为核心竞争力

多个项目同时暴露凭据泄露、权限声明不完整、OAuth 校验、manifest mismatch、proxy 未认证等问题。

对开发者的参考价值：

- 插件系统必须默认不信任插件包内容；
- 权限差异、外联能力、凭据来源、日志脱敏需要一等公民化；
- MCP 诊断路径必须与 runtime 行为一致，否则会造成授权和排障混乱。

---

### 趋势 3：长期运行能力比单次调用能力更重要

OpenClaw 的 session/memory，Hermes 的 Desktop/profile，NanoBot 的 Dream memory，NullClaw 的 Cron timeout，IronClaw 的 WebChat state，都指向同一问题：AI 助手正在成为长期运行进程。

对开发者的参考价值：

- 要把 session state、memory、cron、background worker、resource cleanup 当成基础设施；
- UI 状态必须与底层 RPC / runtime 状态一致；
- 默认超时、backoff、限流、清理策略应内置，而非依赖用户配置。

---

### 趋势 4：多用户与多智能体需求开始浮现

ZeroClaw 的 Agent Workspace / SOP，OpenClaw 的 subagents，Hermes 的 multiplex profiles，Moltis 的 per-sender credentials，NanoBot 的群聊观察模式，都显示出从“个人单 agent”走向“团队 / 群聊 / 多 agent 编排”。

对开发者的参考价值：

- 身份模型需要从 session-level 发展到 sender-level / actor-level；
- 工具调用需要审计“谁触发、以谁的权限、对哪个资源操作”；
- 多 agent 编排需要更强的可视化、权限、回放和中断控制。

---

### 趋势 5：跨平台运行细节仍是落地瓶颈

Windows named pipe、Docker Desktop transient failure、macOS launchd、Linux bubblewrap/firejail、Desktop backend retry storm、CLI terminal resize 等问题大量出现。

对开发者的参考价值：

- Agent 产品不是纯云服务，很多部署发生在用户本机；
- Windows/macOS/Linux 的平台差异必须纳入测试矩阵；
- 本地服务、socket、文件权限、容器 UID、浏览器安全上下文都是高频故障点。

---

## 结论

OpenClaw 当前处于生态第一梯队，优势在于全栈能力完整、发布节奏快、技术路线覆盖面广；但也面临资源治理、安全审查和 session/UI 一致性的复杂度压力。Hermes Agent 活跃度最高，但问题密度也最高；ZeroClaw 在多智能体和 SOP 方向最激进；NanoBot、NanoClaw、NullClaw、LobsterAI 则更体现质量巩固与安全治理价值。

对技术决策者而言，当前选择 AI 助手 / agent 开源项目时，应重点评估五件事：

1. 是否具备可靠的 session / memory / state 管理；
2. 插件与 MCP 安全边界是否清晰；
3. 后台 worker、cron、资源限制是否可控；
4. 通信渠道是否满足真实使用场景；
5. 项目是否有足够维护能力消化高频 PR 与安全 review。

整体生态仍在高速演进，短期竞争重点将从“功能数量”转向 **可信运行、长期稳定、多渠道接入与可审计的 agent 行为**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报  
日期：2026-10-06  
仓库：HKUDS/nanobot

## 1. 今日速览

过去 24 小时内，NanoBot 活跃度较高，共有 **4 条 Issue 更新** 与 **13 条 PR 更新**，主要集中在 MCP、WebUI、定时任务、记忆系统、安全修复和新通信渠道上。  
今日没有新版本发布，但代码层面的推进明显：多个 WebUI 体验改进和 MCP 超时修复已关闭，说明维护节奏较快。  
当前仍有 **8 个 PR 待处理**，其中包含 **安全相关修复、Cron 调度一致性、Dream 记忆并发保护、Sendblue iMessage/SMS 通道** 等较重要变更。  
整体来看，项目健康度良好，社区反馈覆盖真实使用场景，维护重点正在从功能扩展转向稳定性、安全性和多渠道接入能力的完善。

---

## 2. 项目进展

今日关闭或完成的 PR 主要集中在 WebUI 体验、MCP 稳定性和测试稳定性上。

### 已关闭 / 已完成的重要 PR

#### 1. MCP streamable HTTP 超时修复  
- PR：[#6066 fix(mcp): let streamable HTTP read timeout cover tool_timeout](https://github.com/HKUDS/nanobot/pull/6066)  
- 关联 Issue：[#6065](https://github.com/HKUDS/nanobot/issues/6065)  
- 状态：已关闭  
- 影响：修复 streamable HTTP MCP 客户端固定 30 秒 read timeout 的问题，使其能够尊重 `MCPServerConfig.tool_timeout`。  
- 意义：提升长耗时 MCP 工具调用的可靠性，避免合法响应因超过 30 秒被错误中断。

#### 2. WebUI 数学公式与文本排版优化  
- PR：[#6075 fix(webui): fit wide equations and refine math spacing](https://github.com/HKUDS/nanobot/pull/6075)  
- 状态：已关闭  
- 影响：解决宽公式在会话列中溢出或被裁剪的问题，改善窄屏和高缩放场景下的阅读体验。  
- 意义：对使用 NanoBot 进行技术问答、数学推导、论文辅助的用户体验有直接提升。

#### 3. WebUI CJK 行高与文本换行恢复  
- PR：[#6073 fix(webui): restore CJK line height and refine text wrapping](https://github.com/HKUDS/nanobot/pull/6073)  
- 状态：已关闭  
- 影响：修复中日韩语言 Markdown 行高被默认 `:root` 样式覆盖的问题。  
- 意义：改善中文、日文、韩文用户的长文本阅读体验，属于本地化体验质量修复。

#### 4. WebUI 图标统一与交互反馈优化  
- PR：[#6074 feat(webui): unify icons and refine interaction feedback](https://github.com/HKUDS/nanobot/pull/6074)  
- 状态：已关闭  
- 影响：为导航、编辑器命令、权限、工具和子智能体状态提供更清晰的 SVG 图标，并统一交互反馈。  
- 意义：提升产品成熟度和可用性，降低用户对不同操作含义的误解。

#### 5. 测试稳定性修复  
- PR：[#6076 test: isolate Star invitation state and stabilize late-result waits](https://github.com/HKUDS/nanobot/pull/6076)  
- 状态：已关闭  
- 影响：针对 Windows Python 3.14 CI 中 late-result 等待超时的问题进行测试隔离和等待逻辑稳定化。  
- 意义：提升 CI 稳定性，减少非功能性失败对开发节奏的干扰。

### 当前待合并的重要 PR

#### Cron 调度一致性修复  
- PR：[#6071 fix(cron): preserve schedules edited during execution](https://github.com/HKUDS/nanobot/pull/6071)  
- 关联 Issue：[#6070](https://github.com/HKUDS/nanobot/issues/6070)  
- 价值：防止运行中的 Cron 任务完成时覆盖执行期间被用户修改的新调度。

#### Dream 记忆并发保护  
- PR：[#6064 fix(memory): serialize manual and scheduled Dream runs](https://github.com/HKUDS/nanobot/pull/6064)  
- 价值：避免手动和定时 Dream 任务并发执行时覆盖较新的记忆或回退处理游标。

#### 安全修复：DNS pinning 与凭据泄漏  
- PR：[#6069 fix(security): pin validated DNS for bytes hostnames](https://github.com/HKUDS/nanobot/pull/6069)  
- PR：[#6067 fix(mcp): prevent credential leakage in discovery error logs](https://github.com/HKUDS/nanobot/pull/6067)  
- 价值：分别处理 DNS pinning 绕过风险和 MCP discovery 错误日志泄漏敏感信息风险。

#### 新通信渠道：Sendblue iMessage/SMS  
- PR：[#6081 feat(channels): add Sendblue iMessage and SMS transport](https://github.com/HKUDS/nanobot/pull/6081)  
- 价值：允许用户通过 iMessage/SMS 与 NanoBot 智能体交互，是多渠道部署能力的重要扩展。

---

## 3. 社区热点

今日社区互动量整体不高，Issue 评论和 reaction 都较少，讨论主要表现为“问题报告 + 快速 PR 响应”的维护模式。

### 1. MCP 超时问题：长耗时工具调用被 30 秒固定 timeout 中断  
- Issue：[#6065 [bug] MCP streamable HTTP uses a fixed 30s read timeout despite tool_timeout](https://github.com/HKUDS/nanobot/issues/6065)  
- 评论数：1  
- 状态：已关闭  
- 对应 PR：[#6066](https://github.com/HKUDS/nanobot/pull/6066)  
- 用户诉求：MCP 工具调用应遵循用户配置的 `tool_timeout`，而不是被底层 HTTP 客户端固定 30 秒限制。  
- 背后信号：NanoBot 的 MCP 使用场景正在扩展到更复杂、更慢的外部工具或数据服务，超时控制需要更精细化。

### 2. 群聊中“观察但不一定回复”的智能体行为  
- Issue：[#6079 Allow agents to observe group messages without always replying](https://github.com/HKUDS/nanobot/issues/6079)  
- 状态：开放  
- 用户诉求：在群聊中，智能体应能接收并观察消息，但只有在判断相关时才处理或回复。  
- 背后信号：用户希望 NanoBot 从“消息触发式机器人”演进为更自然的群聊参与者，具备更细粒度的上下文感知和发言决策能力。

### 3. 心跳通知评估器使用独立模型 preset  
- Issue：[#6078 Allow a separate model preset for the heartbeat notification evaluator](https://github.com/HKUDS/nanobot/issues/6078)  
- 状态：开放  
- 用户诉求：heartbeat 任务完成后，用于判断是否通知用户的二次 LLM 调用不应强制使用主智能体模型。  
- 背后信号：用户关注成本、延迟和模型职责拆分，希望将“主推理模型”和“轻量级判断模型”分离配置。

---

## 4. Bug 与稳定性

按潜在严重程度排序如下。

### P1 / 安全相关

#### 1. DNS pinning 对 bytes hostname 的处理可能存在绕过风险  
- PR：[#6069 fix(security): pin validated DNS for bytes hostnames](https://github.com/HKUDS/nanobot/pull/6069)  
- 状态：开放  
- 严重程度：高  
- 问题描述：当 HTTPX / HTTPcore / AnyIO 连接栈传入 bytes 类型 hostname 时，当前逻辑使用 `str(host)` 比较会导致 hostname 变成 `"b'example.com'"`，无法匹配已 pin 的主机名，进而回退到原始 resolver。  
- 当前进展：已有修复 PR，标记为 `security` 和 `priority: p1`，建议优先 review 与合并。

#### 2. MCP discovery 错误日志可能泄漏凭据  
- PR：[#6067 fix(mcp): prevent credential leakage in discovery error logs](https://github.com/HKUDS/nanobot/pull/6067)  
- 状态：开放  
- 严重程度：中高  
- 问题描述：`resources/list` 或 `prompts/list` 失败时 DEBUG 日志可能记录原始异常，其中 HTTPX status error 可能包含带 userinfo、路径凭据或 query signature 的 URL。  
- 当前进展：已有修复 PR，建议与 #6069 一并作为安全补丁优先处理。

### 稳定性 / 数据一致性

#### 3. Cron 任务执行期间修改调度可能丢失下一次触发  
- Issue：[#6070 Cron completion consumes schedules changed during execution](https://github.com/HKUDS/nanobot/issues/6070)  
- PR：[#6071 fix(cron): preserve schedules edited during execution](https://github.com/HKUDS/nanobot/pull/6071)  
- 状态：Issue 开放，修复 PR 开放  
- 严重程度：中高  
- 问题描述：当 Cron 回调仍在运行时，如果用户重新调度该任务，旧回调完成后可能错误地消费新调度。  
- 影响场景：自动化任务、定时提醒、周期性工作流，尤其是运行时间较长的任务。

#### 4. Dream 记忆手动与计划任务并发导致记忆覆盖  
- PR：[#6064 fix(memory): serialize manual and scheduled Dream runs](https://github.com/HKUDS/nanobot/pull/6064)  
- 状态：开放  
- 严重程度：中高  
- 问题描述：手动 Dream 与定时 Dream 共享记忆文件和处理游标，并发运行时可能覆盖新记忆或导致游标回退。  
- 影响场景：依赖长期记忆、自动总结、定时反思的智能体。

#### 5. MCP streamable HTTP 固定 30 秒 read timeout  
- Issue：[#6065](https://github.com/HKUDS/nanobot/issues/6065)  
- PR：[#6066](https://github.com/HKUDS/nanobot/pull/6066)  
- 状态：Issue 已关闭，PR 已关闭  
- 严重程度：中  
- 当前进展：已有修复完成。  
- 影响场景：慢速 FastMCP JSON 响应、长耗时工具调用、远程数据处理。

### WebUI 与测试稳定性

#### 6. 宽公式溢出与 CJK 行高问题  
- PR：[#6075](https://github.com/HKUDS/nanobot/pull/6075)  
- PR：[#6073](https://github.com/HKUDS/nanobot/pull/6073)  
- 状态：已关闭  
- 严重程度：低到中  
- 影响：主要影响阅读体验，但对技术文档、数学公式和多语言用户较重要。

#### 7. Windows Python 3.14 CI late-result 等待超时  
- PR：[#6076](https://github.com/HKUDS/nanobot/pull/6076)  
- 状态：已关闭  
- 严重程度：低到中  
- 影响：主要影响维护者开发效率和 CI 信任度。

---

## 5. 功能请求与路线图信号

### 1. 群聊智能体支持“观察但不回复”  
- Issue：[#6079](https://github.com/HKUDS/nanobot/issues/6079)  
- 类型：enhancement  
- 路线图信号：强  
- 分析：该需求体现了更高级的多参与者场景。用户希望智能体能够区分“收到消息”“判断相关性”“处理上下文”“决定是否回复”四个阶段。  
- 可能方向：  
  - 增加 group message observation 模式  
  - 引入 relevance evaluator  
  - 支持 silent processing  
  - 对回复行为增加策略配置

### 2. Heartbeat 通知评估器使用独立模型 preset  
- Issue：[#6078](https://github.com/HKUDS/nanobot/issues/6078)  
- 类型：enhancement  
- 路线图信号：中高  
- 分析：该需求与成本优化和多模型编排有关。主智能体可继续使用强模型，而通知判断可使用更便宜、更快的模型。  
- 可能方向：  
  - 为 `should_notify` 增加独立 provider/model 配置  
  - 支持轻量级 evaluator preset  
  - 在 UI 中区分主模型和辅助判断模型

### 3. Sendblue iMessage/SMS 通道  
- PR：[#6081](https://github.com/HKUDS/nanobot/pull/6081)  
- 类型：feature  
- 状态：开放  
- 路线图信号：强  
- 分析：这是渠道能力的重要扩展，使 NanoBot 能通过用户手机号进入日常沟通场景。  
- 纳入下一版本可能性：较高，但取决于安全配置、webhook 文档、隐私与测试覆盖。

### 4. MCP server 按服务器配置代理继承开关  
- PR：[#6072 feat(mcp): allow per-server environment proxy opt-out](https://github.com/HKUDS/nanobot/pull/6072)  
- 类型：feature  
- 状态：开放，标记 conflict  
- 路线图信号：中高  
- 分析：MCP 服务访问本地、内网、Tailscale endpoint 时，进程级代理设置可能造成连接失败。该 PR 增加 `useEnvProxy` 选项，允许按 server 关闭环境代理继承。  
- 风险：当前存在 conflict，需要维护者介入解决冲突后再推进。

### 5. WebUI About 页面展示 gateway commit  
- PR：[#6080 feat(webui): show gateway commit in About settings](https://github.com/HKUDS/nanobot/pull/6080)  
- 类型：feature / documentation / test  
- 状态：开放  
- 分析：有助于用户和维护者定位部署版本，尤其是从不同 commit 构建但 package version 相同的场景。  
- 纳入下一版本可能性：较高，属于低风险可观测性增强。

### 6. FXMacroData MCP preset  
- PR：[#6068 feat(webui): add FXMacroData MCP preset](https://github.com/HKUDS/nanobot/pull/6068)  
- 类型：feature  
- 状态：开放  
- 分析：为宏观经济数据场景提供开箱即用 MCP preset，覆盖央行利率、CPI、就业、GDP、日历和汇率等只读工具。  
- 路线图信号：NanoBot 的 MCP 应用生态正在向垂直数据源扩展。

---

## 6. 用户反馈摘要

### 1. MCP 用户需要更可靠的长耗时工具调用  
- 来源：[#6065](https://github.com/HKUDS/nanobot/issues/6065)  
- 痛点：用户已配置 `tool_timeout`，但底层 HTTP client 固定 30 秒 read timeout 导致实际配置无效。  
- 使用场景：FastMCP 服务、慢速 JSON 响应、长时间数据计算或远程工具调用。  
- 满意点：问题已被快速响应，并有对应修复 PR。  
- 不满意点：配置项语义与实际行为不一致，容易造成排查成本。

### 2. 群聊用户希望智能体更“克制”  
- 来源：[#6079](https://github.com/HKUDS/nanobot/issues/6079)  
- 痛点：在群聊中，智能体不应每次收到消息都进入完整回复流程。  
- 使用场景：团队群、家庭群、社区群、多用户频道。  
- 需求本质：用户需要智能体具备“旁听、理解、选择性介入”的社交行为，而不是机械地响应每条消息。

### 3. 高级用户希望拆分主模型与辅助判断模型  
- 来源：[#6078](https://github.com/HKUDS/nanobot/issues/6078)  
- 痛点：heartbeat 通知判断属于轻量任务，却使用主智能体同一模型，可能造成成本和延迟浪费。  
- 使用场景：定时任务、自动提醒、后台观察、异步通知。  
- 需求本质：NanoBot 用户开始关注多模型任务分配和运行成本优化。

### 4. 自动化任务用户关注调度确定性  
- 来源：[#6070](https://github.com/HKUDS/nanobot/issues/6070)  
- 痛点：运行中的 Cron 任务如果被重新调度，旧任务完成时可能错误影响新调度。  
- 使用场景：周期性执行任务、提醒、定时同步、长期运行 agent workflow。  
- 风险：该问题可能导致用户错过关键任务触发。

---

## 7. 待处理积压

当前数据仅覆盖过去 24 小时，未提供长期未响应 Issue / PR 的完整列表，因此无法判断真正意义上的“长期积压”。但从今日开放项看，以下 PR / Issue 建议维护者优先关注：

### 高优先级待处理

1. **安全修复：DNS pinning bytes hostname**  
   - PR：[#6069](https://github.com/HKUDS/nanobot/pull/6069)  
   - 原因：标记为 `security`、`priority: p1`，涉及潜在 DNS pinning 绕过。

2. **MCP discovery 日志凭据泄漏**  
   - PR：[#6067](https://github.com/HKUDS/nanobot/pull/6067)  
   - 原因：涉及敏感信息进入日志，建议尽快合并并考虑补充安全发布说明。

3. **Cron 调度编辑一致性**  
   - Issue：[#6070](https://github.com/HKUDS/nanobot/issues/6070)  
   - PR：[#6071](https://github.com/HKUDS/nanobot/pull/6071)  
   - 原因：影响自动化任务可靠性，已有修复 PR。

4. **Dream 记忆并发保护**  
   - PR：[#6064](https://github.com/HKUDS/nanobot/pull/6064)  
   - 原因：涉及长期记忆一致性，可能影响用户对 agent memory 的信任。

5. **MCP per-server proxy opt-out 存在冲突**  
   - PR：[#6072](https://github.com/HKUDS/nanobot/pull/6072)  
   - 原因：功能价值明确，但标记为 `conflict`，需要维护者协助解决合并冲突。

---

## 项目健康度判断

NanoBot 今日表现出较强的维护活跃度：问题能被快速报告、定位并转化为修复 PR。  
当前风险主要集中在 **安全修复尚未合并、调度与记忆一致性问题仍开放、部分 MCP 配置体验仍需完善**。  
功能方向上，项目正在同时推进三条路线：  
1. **MCP 生态增强**：超时、代理、预设、日志安全；  
2. **多渠道接入**：iMessage/SMS；  
3. **更自然的智能体行为**：群聊观察、心跳通知模型拆分。  

整体来看，项目处于健康且快速迭代状态，建议下一阶段优先合并安全与稳定性 PR，再推进渠道和 WebUI 增强功能。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
**日期：2026-10-06**  
**仓库：NousResearch/hermes-agent**  
**统计窗口：过去 24 小时**

---

## 1. 今日速览

过去 24 小时 Hermes Agent 维持了**极高活跃度**：Issues 更新 50 条，其中 49 条仍在开放或活跃中，仅 1 条关闭；PR 更新 50 条，其中 45 条仍待合并，5 条已合并或关闭。  
今日新增问题高度集中在 **Desktop 会话状态、Windows 平台稳定性、Provider 配置解析、MCP/Auth、浏览器自动化、Cron/Gateway 多 profile 运维** 等方向，显示项目正在被更广泛地用于复杂本地与多用户部署场景。  
PR 侧修复响应较快，多个当天报告的问题已经有对应修复 PR，例如 Copilot context length、background review tool hooks、浏览器 CDP attach race、PYTHONPATH 泄漏等。  
整体健康度看，社区反馈与贡献非常活跃，但短期风险在于：**待合并 PR 数量偏高、P2 稳定性问题密集、Desktop/session-state 类问题反复出现**。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

> 注：数据中未展开今日已合并/关闭的 5 个 PR 明细，因此以下主要基于今日活跃且具备推进意义的 PR 分析项目进展。

### 3.1 Provider / 模型配置修复

- [PR #133688：fix(agent): keep model.context_length pin across Copilot exchanged hosts](https://github.com/NousResearch/hermes-agent/pull/133688)  
  对应 [Issue #133686](https://github.com/NousResearch/hermes-agent/issues/133686)。  
  修复 Copilot token exchange 将 `api.githubcopilot.com` 改写为账户 host 后，`model.context_length` pin 被误判为 route mismatch 并静默丢弃的问题。  
  **意义**：提升 Copilot provider 的配置可靠性，避免用户配置的上下文长度被悄悄覆盖为默认 200K。

- [PR #133676：feat(agent): add dynamic heuristic model fallback for free models](https://github.com/NousResearch/hermes-agent/pull/133676)  
  对应 [Issue #133671](https://github.com/NousResearch/hermes-agent/issues/133671)。  
  增加基于启发式规则的免费模型动态 fallback，例如最大参数量、最大上下文、最新模型、flash 模型等。  
  **意义**：如果合入，将减少用户手动维护 OpenRouter / Nous 免费模型列表的成本。

### 3.2 Desktop / 会话状态稳定性

- [PR #133674：fix(desktop): opening a preview no longer flips the focused chat between tiles](https://github.com/NousResearch/hermes-agent/pull/133674)  
  修复 Desktop 中打开 preview tab 后焦点在多个 chat tile 之间来回跳动的问题。  
  **意义**：继续收敛 Desktop 多面板、多 session 场景下的焦点与状态一致性问题。

### 3.3 Gateway / Messaging 修复

- [PR #133672：fix(whatsapp): group chatter the agent chooses to skip stays silent](https://github.com/NousResearch/hermes-agent/pull/133672)  
  修复 WhatsApp 群聊中，agent 明确选择不回复时仍发出 warning 的问题。  
  **意义**：改善 messaging gateway 的社交语境判断，减少 bot 在群聊中“多嘴”或误报。

- [PR #133667：Add explicit profile and cron scope controls for multiplex gateways](https://github.com/NousResearch/hermes-agent/pull/133667)  
  增加 `gateway.profile_scope` 与 `gateway.cron_profile_scope` 配置，用于限制 multiplex gateway 加载哪些 profile，以及 cron 只在哪些 profile 上运行。  
  **意义**：明显服务于多用户、生产化部署场景，有助于降低 gateway 资源消耗与 profile 隔离风险。

### 3.4 插件与 MCP 安全边界

- [PR #133681：fix(mcp): accept exact OAuth root slash mismatch](https://github.com/NousResearch/hermes-agent/pull/133681)  
  允许 OAuth issuer 根路径是否带 trailing slash 的精确等价，同时保留 origin、path、query、fragment 等严格校验。  
  **意义**：在兼容性和安全边界之间做窄范围修复，适合 MCP/OAuth 生态接入。

- [PR #133669：fix(plugins): silence tool hooks for detached background-review forks](https://github.com/NousResearch/hermes-agent/pull/133669)  
  对应 [Issue #133603](https://github.com/NousResearch/hermes-agent/issues/133603)。  
  修复 background review fork 仍以父 session_id 触发 `pre_tool_call` / `post_tool_call` 的问题。  
  **意义**：降低插件生命周期事件污染主 session 的风险。

- [PR #133684：fix(plugin-packs): handle YAML pairs and cyclic aliases](https://github.com/NousResearch/hermes-agent/pull/133684)  
  修复 plugin packs 中 YAML `!!pairs` 绕过禁用 key 检查，以及 cyclic aliases 导致 `RecursionError` 的问题。  
  **意义**：加强插件包导入/导出的健壮性与配置安全。

### 3.5 本地运行环境与子进程兼容性

- [PR #133682：fix(tools): strip a previous generation's site-packages from child PYTHONPATH](https://github.com/NousResearch/hermes-agent/pull/133682)  
  对应 [Issue #133668](https://github.com/NousResearch/hermes-agent/issues/133668)。  
  修复依赖 generation 切换后，仍运行的 gateway 将旧 generation 的 `site-packages` 注入子进程 `PYTHONPATH` 的问题。  
  **意义**：对本地 terminal/tool 执行环境影响较大，可减少跨版本依赖污染。

### 3.6 浏览器自动化

- [PR #133663：fix(browser): hold the real-profile launch until the CDP listener accepts](https://github.com/NousResearch/hermes-agent/pull/133663)  
  对应 [Issue #133659](https://github.com/NousResearch/hermes-agent/issues/133659) 的 CDP attach race 部分。  
  修复 Chromium 写出 `DevToolsActivePort` 后 CDP listener 尚未真正可连接，导致 attach 失败的问题。  
  **意义**：提升 real-profile browser automation 的启动可靠性，尤其是 Windows/Edge 场景。

### 3.7 文档与生态扩展

- [PR #133664：docs: add Desktop SSH setup and recovery guide](https://github.com/NousResearch/hermes-agent/pull/133664)  
  增加 Desktop SSH 设置与恢复指南。  
  **意义**：改善 Desktop 远程后端/SSH 用户的上手与故障恢复体验。

- [PR #133673：feat(plugin-catalog): add laso-finance](https://github.com/NousResearch/hermes-agent/pull/133673)  
  新增 Laso Finance 官方插件。  
  **意义**：插件目录持续扩展，面向金融任务场景。

- [PR #133666：feat(plugin-catalog): add cursor-provider v0.3.5](https://github.com/NousResearch/hermes-agent/pull/133666)  
  新增 `cursor-provider` 模型 provider 插件。  
  **意义**：模型 provider 生态继续扩张。

---

## 4. 社区热点

### 4.1 Copilot fallback 后无法选择 OpenAI 模型

- [Issue #133554：Cannot select an OpenAI model after Copilot fallback has been used](https://github.com/NousResearch/hermes-agent/issues/133554)  
  状态：已关闭  
  评论数：6  
  标签：`type/bug`, `comp/cli`, `provider/openai`, `provider/copilot`, `P2`, `needs-repro`

这是今日讨论最多的问题。用户反馈在 Hermes 使用 Copilot fallback 后，模型选择流程不再允许选择 OpenAI 模型。虽然 issue 标记为 `needs-repro`，且报告者未能提供完整复现路径，但该问题指向一个重要场景：**多 provider fallback 后的模型状态污染或选择器状态残留**。  
该 issue 已关闭，说明维护者可能认为证据不足、已有修复、或转入其他跟踪项。

### 4.2 Profile 切换导致 Desktop 侧边栏状态错乱

- [Issue #133620：When switching profiles, sidebar state gets wonky](https://github.com/NousResearch/hermes-agent/issues/133620)  
  状态：开放  
  评论数：2  
  标签：`comp/desktop`, `area/sessions`, `area/profiles`, `P3`

用户反馈切换 profile 后，sidebar 仍显示旧 profile 的聊天，需要刷新窗口才能恢复。  
该问题和今日多个 Desktop/session-state 议题高度相关，显示 Desktop 在多 profile、多 session、多 sidebar 状态同步方面仍存在系统性问题。

### 4.3 Windows Desktop 后端端口失效后无退避重试

- [Issue #133628：Desktop renderer hammers a dead backend port with no backoff](https://github.com/NousResearch/hermes-agent/issues/133628)  
  状态：开放  
  评论数：1  
  标签：`comp/desktop`, `platform/windows`, `P2`

该问题报告称 Desktop backend 退出后，renderer 持续无 backoff 地轮询失效端口，造成长时间 `connect ENOBUFS` storm，最终拖慢 Windows 主机。  
这是今日最值得关注的稳定性热点之一，因为它不仅影响 Hermes 自身，还可能影响整台 Windows 机器的网络栈/资源状态。

### 4.4 Composer 图片缓存不会清理

- [Issue #133608：Desktop composer-images is never cleaned up](https://github.com/NousResearch/hermes-agent/issues/133608)  
  状态：开放  
  评论数：1  
  标签：`tool/vision`, `comp/desktop`, `area/sessions`, `P2`

用户指出 Desktop composer 中粘贴、拖拽、截图产生的图片会写入 `<userData>/composer-images/`，但删除 session、清理 sweep、甚至多数卸载流程都不会删除。  
这反映出用户对 **本地存储占用、隐私残留、会话删除语义** 的关注。

### 4.5 Cron external worker 未注册 shell hooks

- [Issue #133582：Cron external worker sessions never register configured shell hooks](https://github.com/NousResearch/hermes-agent/issues/133582)  
  状态：开放  
  评论数：1  
  标签：`comp/cron`, `area/config`, `P2`

该问题指出 gateway、CLI、TUI 都会注册配置的 shell hooks，但 cron external worker session 不会。  
这对依赖 shell hook 注入环境变量、认证、路径、审计逻辑的自动化任务影响较大。

---

## 5. Bug 与稳定性

### P2 / 高优先级问题

1. [Issue #133628：Windows Desktop renderer 对失效 backend port 无退避重试](https://github.com/NousResearch/hermes-agent/issues/133628)  
   影响：Windows 主机可能遭遇长时间 loopback `ENOBUFS` 风暴，系统整体性能下降。  
   当前修复 PR：未在数据中看到明确对应 PR。  
   建议优先级：高。应增加指数退避、backend health state、最大重试频率与用户可见错误提示。

2. [Issue #133608：Desktop composer-images 永不清理](https://github.com/NousResearch/hermes-agent/issues/133608)  
   影响：磁盘占用增长、隐私数据残留、session 删除语义不完整。  
   当前修复 PR：未见明确对应 PR。  
   建议优先级：高。建议将 composer image 绑定 session lifecycle，并提供全局清理入口。

3. [Issue #133569：Desktop “Show earlier messages” 按钮可见但无效](https://github.com/NousResearch/hermes-agent/issues/133569)  
   影响：历史消息无法加载，首条 prompt 不渲染，破坏长会话可用性。  
   当前修复 PR：未见明确对应 PR。  
   关联方向：session pagination / transcript hydration。

4. [Issue #133582：Cron external worker sessions 未注册 shell hooks](https://github.com/NousResearch/hermes-agent/issues/133582)  
   影响：cron 自动化任务环境与 CLI/Gateway 不一致，可能导致认证、PATH、初始化脚本失效。  
   当前修复 PR：未见明确对应 PR。

5. [Issue #133670：Hermes 将 Python 3.14 site-packages 注入子进程 sys.path，破坏跨版本 venv](https://github.com/NousResearch/hermes-agent/issues/133670)  
   影响：Python 3.12/3.13 等 venv 子进程可能加载错误版本依赖。  
   相关 PR：[PR #133682](https://github.com/NousResearch/hermes-agent/pull/133682) 处理旧 generation `PYTHONPATH` 泄漏，但 issue 指出 direct `sys.path` injection 也需要处理。  
   建议：确认 PR 是否完全覆盖该 issue，否则需要补充修复。

6. [Issue #133668：旧 PYTHONPATH 泄漏到 gateway 子进程](https://github.com/NousResearch/hermes-agent/issues/133668)  
   影响：依赖 generation 切换后，子进程仍可能使用旧依赖。  
   修复 PR：[PR #133682](https://github.com/NousResearch/hermes-agent/pull/133682)。

7. [Issue #133659：Windows/Edge real-profile snapshot 登录态失效 + CDP attach race](https://github.com/NousResearch/hermes-agent/issues/133659)  
   影响：Windows Edge real profile 浏览器自动化不可稳定使用，登录态无法复用。  
   部分修复 PR：[PR #133663](https://github.com/NousResearch/hermes-agent/pull/133663) 修复 CDP attach race。  
   未完全覆盖：app-bound cookies 无法解密导致 snapshot signed-out 的部分仍需跟进。

8. [Issue #133643：active /goal 未在 compaction 边界重新折叠](https://github.com/NousResearch/hermes-agent/issues/133643)  
   影响：长会话压缩后 agent 可能丢失 active goal 及其 completion contract。  
   当前修复 PR：未见明确对应 PR。  
   风险：session-state / compression 一致性。

9. [Issue #133635：keyed codex_responses provider 的 auxiliary reasoning_effort 被静默丢弃](https://github.com/NousResearch/hermes-agent/issues/133635)  
   影响：compression、title generation 等辅助请求未按配置发送 reasoning effort。  
   当前修复 PR：未见明确对应 PR。

10. [Issue #133606：custom/LiteLLM alias 的 context-length resolution 导致永久 cache poisoning](https://github.com/NousResearch/hermes-agent/issues/133606)  
    影响：动态路由别名场景中，`model.context_length` override 可能被静默丢弃。  
    当前修复 PR：未见明确对应 PR。  
    关联：[PR #133688](https://github.com/NousResearch/hermes-agent/pull/133688) 解决 Copilot host rewrite 的相似问题，但不一定覆盖 LiteLLM alias。

11. [Issue #133602：TypeScript LSP diagnostics 总是超时](https://github.com/NousResearch/hermes-agent/issues/133602)  
    影响：TS/JS 文件的 LSP lint 检查失效，后续 pair 被标记 broken。  
    当前修复 PR：未见明确对应 PR。

12. [Issue #133596：computer_use screenshot 无大小上限，Claude DirectSDK 图片超限恢复失败](https://github.com/NousResearch/hermes-agent/issues/133596)  
    影响：会话重复发送超大截图，陷入失败循环。  
    当前修复 PR：未见明确对应 PR。

13. [Issue #133622：background process 中 sudo 无法认证或提示](https://github.com/NousResearch/hermes-agent/issues/133622)  
    影响：本地 background terminal process 中 `sudo` 永远无法完成。  
    当前修复 PR：未见明确对应 PR。

### P3 / 中低优先级但影响体验的问题

1. [Issue #133620：切换 profile 后 sidebar 状态错乱](https://github.com/NousResearch/hermes-agent/issues/133620)  
   影响：多 profile 用户需要手动刷新窗口。

2. [Issue #133675：Desktop sidebar project drag order 在切换 profile 后丢失](https://github.com/NousResearch/hermes-agent/issues/133675)  
   影响：项目排序偏好无法持久化；用户请求增加 A-Z 排序。

3. [Issue #133568：Desktop composer 在换行前提交 slash command 时丢失尾随空格](https://github.com/NousResearch/hermes-agent/issues/133568)  
   影响：输入体验瑕疵。

4. [Issue #133523：旧版 desktop-build-stamp.json 未刷新，误报 build outdated](https://github.com/NousResearch/hermes-agent/issues/133523)  
   影响：安装/更新状态提示不准确。  
   标签显示同时影响 CLI/Desktop install-update。

5. [Issue #133660：Bot Desktop idle_stop_minutes 在 cron/messaging 或 serve restart 后不生效](https://github.com/NousResearch/hermes-agent/issues/133660)  
   影响：闲置 screen 无法自动回收，可能造成资源泄漏。

6. [Issue #133652：macOS 默认 accessibility tree 阻止 Magnet 移动/缩放窗口](https://github.com/NousResearch/hermes-agent/issues/133652)  
   影响：第三方窗口管理器兼容性。

7. [Issue #133616：standalone MCP probes 未加载插件 secret sources](https://github.com/NousResearch/hermes-agent/issues/133616)  
   影响：`hermes mcp test` 诊断与实际 runtime 行为不一致。  
   安全边界标签：`sweeper:risk-security-boundary`。

8. [Issue #133603：background_review fork 仍触发 tool lifecycle hooks](https://github.com/NousResearch/hermes-agent/issues/133603)  
   修复 PR：[PR #133669](https://github.com/NousResearch/hermes-agent/pull/133669)。

9. [Issue #133595：zai provider 的 glm-5.3-flash 拒绝 reasoning_effort=medium](https://github.com/NousResearch/hermes-agent/issues/133595)  
   影响：Z.AI 标准 endpoint 单次调用无法完成。

---

## 6. 功能请求与路线图信号

### 6.1 动态免费模型 fallback

- [Issue #133671：希望在当前模型 quota 耗尽或不可用时自动 fallback 到免费模型](https://github.com/NousResearch/hermes-agent/issues/133671)  
- 对应 PR：[PR #133676](https://github.com/NousResearch/hermes-agent/pull/133676)

用户希望通过启发式规则自动选择可用免费模型，而不是维护静态 fallback 列表。  
由于已有 PR，当天进入实现阶段的概率较高。若合并，可能成为下一版本中对 OpenRouter / Nous 用户非常实用的配置增强。

### 6.2 多用户部署中的 idle profile shutdown 与 state.db cleanup

- [Issue #133623：Built-in configuration for idle profile shutdown and state.db cleanup](https://github.com/NousResearch/hermes-agent/issues/133623)

用户描述了几十个 profiles per host 的生产部署场景，并希望内置 profile idle shutdown 与 `state.db` 清理能力，以替代外部 GC cron 脚本。  
该需求与 [PR #133667](https://github.com/NousResearch/hermes-agent/pull/133667) 的 gateway/profile scope 控制方向一致，说明 Hermes 正在从个人助手向多用户 host/multiplexer 架构演进。

### 6.3 Plugin context engine 需要访问 host state

- [Issue #133644：Context engines get no host state at compaction or selection time](https://github.com/NousResearch/hermes-agent/issues/133644)

用户指出第三方 context engine 在 `compress()` 或 `select_context()` 时无法看到 todos、active `/goal`、plan 等 host state。  
这与 [Issue #133643](https://github.com/NousResearch/hermes-agent/issues/133643) 的 `/goal` 压缩边界问题相互呼应。  
路线图信号：未来 context/compression API 可能需要引入更丰富的 session working state。

### 6.4 只读暴露 Desktop/CLI sessions 到 MCP

- [Issue #133601：Expose local Desktop/CLI sessions through hermes mcp serve](https://github.com/NousResearch/hermes-agent/issues/133601)

用户希望 `hermes mcp serve` 能列出本地 Desktop/CLI sessions，供外部监督工具只读查看。  
这表明 MCP 不再只是工具接入层，也可能成为跨客户端监督与可观测性接口。

### 6.5 Desktop 模型菜单显示价格与折扣

- [Issue #133612：show model price and sale discount in the model submenu](https://github.com/NousResearch/hermes-agent/issues/133612)

用户希望选择模型时能看到价格和折扣，但不希望当前设置那样在每行挤占模型名称空间。  
这是 UX 层面的明确信号：模型选择器需要更好地呈现成本、折扣、上下文、能力等 metadata。

### 6.6 Telegram bot manager 自托管支持

- [Issue #133685：Supporting user-operated Telegram bot managers](https://github.com/NousResearch/hermes-agent/issues/133685)

用户发现 `TELEGRAM_ONBOARDING_URL` 可覆盖，但引用的 `hermes-telegram-onboarding` 仓库不可访问，希望官方开源该组件，以便运营者部署自己的 Telegram manager。  
这反映出社区希望 Hermes 的 messaging/onboarding 基础设施也能 self-host。

### 6.7 Kanban orchestration 工具补全

- [PR #133665：feat(kanban): kanban_archive, kanban_promote and kanban_unlink orchestrator tools](https://github.com/NousResearch/hermes-agent/pull/133665)

新增 kanban archive/promote/unlink 工具，解决 board-sweeping cron agent 在特定卡片处理上必须 shell fallback 或失败的问题。  
如果合入，将增强 Hermes 在任务编排与自动化项目管理上的能力。

---

## 7. 用户反馈摘要

### 7.1 Desktop 用户的主要痛点：状态不同步与资源清理

多个 issue 指向 Desktop 在 session/profile/sidebar/composer 状态上的一致性问题：

- [Issue #133620](https://github.com/NousResearch/hermes-agent/issues/133620)：切换 profile 后 sidebar 仍显示旧 profile chats。
- [Issue #133675](https://github.com/NousResearch/hermes-agent/issues/133675)：项目拖拽排序切换 profile 后丢失。
- [Issue #133569](https://github.com/NousResearch/hermes-agent/issues/133569)：历史消息加载按钮无效。
- [Issue #133608](https://github.com/NousResearch/hermes-agent/issues/133608)：composer 图片文件不会清理。

用户真实诉求是：Desktop 不只是 UI shell，而是长期运行的工作台；用户期望它在多 profile、多 session、长会话和本地文件生命周期上表现得像成熟桌面应用。

### 7.2 Windows 用户反馈集中在稳定性与浏览器 profile

Windows 相关问题明显增加：

- [Issue #133628](https://github.com/NousResearch/hermes-agent/issues/133628)：后端端口死亡后无 backoff，导致主机退化。
- [Issue #133659](https://github.com/NousResearch/hermes-agent/issues/133659)：Edge real-profile 登录态无法复用，且存在 CDP attach race。
- [PR #133663](https://github.com/NousResearch/hermes-agent/pull/133663)：已针对 CDP listener race 给出修复。

这说明 Hermes 在 Windows 桌面与浏览器自动化上的用户群正在扩大，但平台特异性问题仍需要专门加固。

### 7.3 生产化 / 多用户部署需求上升

以下反馈来自更复杂的生产或多用户环境：

- [Issue #133623](https://github.com/NousResearch/hermes-agent/issues/133623)：希望内置 idle profile shutdown 与 state.db cleanup。
- [PR #133667](https://github.com/NousResearch/hermes-agent/pull/133667)：增加 profile/cron scope 控制。
- [Issue #133582](https://github.com/NousResearch/hermes-agent/issues/133582)：cron external worker 的 shell hooks 行为与 CLI/Gateway 不一致。

用户正在将 Hermes 用作长期运行的 host multiplexer，而不仅是单用户 CLI agent。这对配置隔离、资源回收、cron 行为一致性提出了更高要求。

### 7.4 Provider 与模型配置需要更透明

相关问题包括：

- [Issue #133686](https://github.com/NousResearch/hermes-agent/issues/133686)：Copilot context_length pin 被静默忽略。
- [Issue #133635](https://github.com/NousResearch/hermes-agent/issues/133635)：auxiliary reasoning_effort 被静默丢弃。
- [Issue #133606](https://github.com/NousResearch/hermes-agent/issues/133606)：custom alias context-length cache poisoning。
- [Issue #133595](https://github.com/NousResearch/hermes-agent/issues/133595)：Z.AI provider 默认 reasoning_effort 不兼容。

共同痛点是“配置被静默忽略或被 provider 端拒绝，但用户缺乏清晰反馈”。  
建议后续加强 config validation、provider capability discovery，以及在 status/log 中展示最终发送给 provider 的关键参数。

### 7.5 插件与 MCP 用户更关注安全边界和诊断一致性

- [Issue #133616](https://github.com/NousResearch/hermes-agent/issues/133616)：MCP test 不加载 plugin secret sources，导致诊断结果和 runtime 不一致。
- [PR #133681](https://github.com/NousResearch/hermes-agent/pull/133681)：OAuth issuer trailing slash 兼容修复，但保留严格安全校验。
- [PR #133684](https://github.com/NousResearch/hermes-agent/pull/133684)：plugin pack YAML 边界条件修复。
- [PR #133669](https://github.com/NousResearch/hermes-agent/pull/133669)：避免 background review fork 的 tool hooks 污染主 session。

这显示插件生态成熟后，用户更在意：凭据加载路径、生命周期事件隔离、配置导入安全、诊断工具是否等价于真实运行环境。

---

## 8. 待处理积压

> 今日数据未提供“长期未响应”时间序列，因此以下列出的是当前窗口内仍开放、优先级较高或风险较大的待处理项。

### 8.1 需要维护者优先 triage 的 P2 问题

- [Issue #133628：Windows Desktop backend dead port retry storm](https://github.com/NousResearch/hermes-agent/issues/133628)  
  风险：可能影响整个 Windows host。建议尽快确认复现并加 backoff。

- [Issue #133608：composer-images 不清理](https://github.com/NousResearch/hermes-agent/issues/133608)  
  风险：磁盘与隐私问题。建议明确 session delete / uninstall / sweep 的清理策略。

- [Issue #133569：Show earlier messages 无效](https://github.com/NousResearch/hermes-agent/issues/133569)  
  风险：长会话历史不可访问。建议检查 pagination cursor、hydration 状态与 opening prompt 渲染路径。

- [Issue #133582：Cron external worker 未注册 shell hooks](https://github.com/NousResearch/hermes-agent/issues/133582)  
  风险：cron 与 CLI/Gateway 行为不一致。建议统一 session 初始化路径。

- [Issue #133670：跨版本 venv 被 Hermes Python 3.14 site-packages 污染](https://github.com/NousResearch/hermes-agent/issues/133670)  
  风险：本地工具执行兼容性。需确认 [PR #133682](https://github.com/NousResearch/hermes-agent/pull/133682) 是否完整覆盖。

- [Issue #133643：active /goal 未在 compaction 边界保留](https://github.com/NousResearch/hermes-agent/issues/133643)  
  风险：长期任务目标丢失。建议纳入 session-state/compression 修复队列。

- [Issue #133596：computer_use screenshots 超出 Claude 图片大小限制且恢复失败](https://github.com/NousResearch/hermes-agent/issues/133596)  
  风险：视觉工具会话陷入重复失败。建议增加截图尺寸/编码大小 cap，并扩展错误分类器。

### 8.2 待合并 PR 堆积风险

今日有 45 个 PR 仍待合并，以下 PR 具备较高合并价值或风险降低价值：

- [PR #133688：Copilot context_length pin 修复](https://github.com/NousResearch/hermes-agent/pull/133688)
- [PR #133682：旧 PYTHONPATH 清理](https://github.com/NousResearch/hermes-agent/pull/133682)
- [PR #133681：MCP OAuth trailing slash 精确兼容](https://github.com/NousResearch/hermes-agent/pull/133681)
- [PR #133674：Desktop preview 焦点修复](https://github.com/NousResearch/hermes-agent/pull/133674)
- [PR #133672：WhatsApp group silence 修复](https://github.com/NousResearch/hermes-agent/pull/133672)
- [PR #133669：background-review tool hooks 隔离](https://github.com/NousResearch/hermes-agent/pull/133669)
- [PR #133663：browser CDP attach race 修复](https://github.com/NousResearch/hermes-agent/pull/133663)

建议维护者优先处理：  
1. 直接对应 P2 bug 的修复 PR；  
2. 安全边界相关 PR；  
3. Desktop/session-state 稳定性 PR；  
4. 生产部署相关配置 PR。

---

## 总体判断

Hermes Agent 今日表现出**高社区活跃度和快速修复响应能力**，但同时暴露出多个成熟项目常见的增长痛点：Desktop 状态一致性、Windows 平台边界、provider 配置透明度、多用户部署资源治理、插件/MCP 安全边界。  
短期内，如果维护者能优先合并 P2 稳定性修复并降低 PR 积压，项目健康度会继续保持良好；否则，大量 session-state 与本地环境问题可能在下一版本中形成用户可感知的稳定性压力。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报  
日期：2026-10-06  
仓库：<https://github.com/sipeed/picoclaw>

## 1. 今日速览

过去 24 小时内，PicoClaw 项目整体活跃度较低：Issues 无新增、无关闭、无活跃更新，PR 方面仅有 1 条新开待合并请求。今日主要动态集中在新增通信渠道能力上，来自 PR [#3416](https://github.com/sipeed/picoclaw/pull/3416) 的 Sendblue iMessage/SMS transport 支持。该 PR 仍处于 Open 状态，尚未合并，因此对主分支功能尚未产生实际影响。整体来看，项目今日维护节奏偏安静，但出现了面向“移动端短信 / iMessage 入口”的重要集成信号。

---

## 3. 项目进展

今日没有已合并或已关闭的 PR，因此主分支未发生可确认的功能推进或修复落地。

### 待合并 PR

#### [#3416 feat(channels): add Sendblue iMessage and SMS transport](https://github.com/sipeed/picoclaw/pull/3416)

- 状态：Open
- 作者：lookevink
- 创建时间：2026-10-05
- 更新时间：2026-10-05
- 评论数：暂无可用数据
- 👍：0
- 类型：功能新增 / Channel 集成
- 影响范围：消息通道、Agent 交互入口、Webhook 配置、部署文档

该 PR 计划新增原生 Sendblue channel，使用户可以通过 iMessage 或 SMS 与 PicoClaw agent 进行交互，并在同一手机号上接收 agent 回复。摘要显示，PR 同时包含较完整的接入指南，覆盖免费账户创建、人工手机号 / 联系人验证、模型前置条件、密钥配置以及接收 webhook 注册。

从项目推进角度看，如果该 PR 被合并，PicoClaw 将获得一个更贴近日常通信场景的入口，降低非技术用户使用 agent 的门槛，尤其适合个人 AI 助手、短信自动回复、移动端通知型 agent 等场景。

---

## 4. 社区热点

今日社区讨论热度整体较低，没有 Issues 活跃讨论记录，也没有评论数明确较高的 PR。

### 今日唯一热点候选

#### [#3416 feat(channels): add Sendblue iMessage and SMS transport](https://github.com/sipeed/picoclaw/pull/3416)

虽然该 PR 暂无明显评论或反应数据，但它是过去 24 小时内唯一的 PR 更新，也是今日最值得关注的项目动态。

背后反映的诉求包括：

1. **将 AI agent 接入用户已有通信工具**  
   用户希望不通过网页或专门客户端，也能通过 iMessage / SMS 与 agent 交互。

2. **降低个人 AI 助手使用门槛**  
   短信和 iMessage 是高频、低摩擦的入口，适合轻量问答、提醒、自动化查询和日常助理场景。

3. **增强 PicoClaw 的多通道能力**  
   如果项目已有 channel 架构，该 PR 说明社区正在围绕更多通信渠道扩展生态。

4. **重视接入文档与部署可操作性**  
   PR 摘要中特别提到账号、验证、密钥和 webhook 注册，说明该功能不仅是代码集成，也涉及真实部署路径。

---

## 5. Bug 与稳定性

过去 24 小时内未发现新的 Bug、崩溃或回归问题报告。

### 今日新增 Bug

无。

### 今日修复 PR

无已合并修复 PR。

### 稳定性观察

由于今日没有 Issues 更新，也没有 Bug fix PR 合并，无法判断项目稳定性是否发生变化。当前唯一活跃 PR [#3416](https://github.com/sipeed/picoclaw/pull/3416) 属于新功能扩展，若后续进入合并流程，建议维护者重点审查以下稳定性风险：

- Sendblue webhook 的鉴权与重放保护
- 短信 / iMessage 消息重复投递处理
- agent 回复失败时的重试策略
- 密钥泄露风险与环境变量配置
- 外部服务不可用时的降级行为
- 速率限制、费用控制和滥用防护

---

## 6. 功能请求与路线图信号

今日没有新的 Issue 类型功能请求，但 PR [#3416](https://github.com/sipeed/picoclaw/pull/3416) 本身释放了明确的路线图信号。

### 可能进入下一版本的功能

#### Sendblue iMessage / SMS 通道支持  
链接：[PR #3416](https://github.com/sipeed/picoclaw/pull/3416)

该功能若完成审查并合并，可能成为下一版本的重要新增能力。它将 PicoClaw agent 从传统应用内交互扩展到手机短信与 iMessage 场景，具备较强的用户侧价值。

潜在应用场景包括：

- 通过短信向个人 AI 助手提问
- 使用 iMessage 接收 agent 回复
- 将 PicoClaw 用作手机端自动应答助手
- 面向非技术用户提供无需安装额外 App 的交互入口
- 将 agent 接入通知、提醒、任务查询等移动场景

### 路线图信号判断

该 PR 显示项目正在向“多渠道 agent 交互层”发展，而不仅仅是后端 agent 能力本身。若后续继续出现 Telegram、WhatsApp、Email、Discord、Slack 等 channel PR，说明 PicoClaw 可能会逐步形成以 channel 为核心的 agent 接入生态。

---

## 7. 用户反馈摘要

过去 24 小时没有 Issues 评论数据，因此暂无可提炼的直接用户反馈。

### 从现有 PR 间接反映的用户痛点

基于 [#3416](https://github.com/sipeed/picoclaw/pull/3416) 的描述，可以间接观察到以下需求：

1. **用户希望通过手机原生消息工具使用 agent**  
   iMessage / SMS 是非常自然的个人助手入口，用户不希望每次都打开 Web UI 或专用客户端。

2. **用户需要端到端的接入指南**  
   PR 摘要提到免费账户设置、人工验证、密钥、webhook 注册等内容，说明此类 channel 功能的主要难点不只是代码，而是部署流程复杂。

3. **用户关注真实可用性，而非单纯 API 集成**  
   手机号验证、联系人验证和模型前置条件都属于生产可用前必须解决的问题，说明该功能目标偏向可落地使用。

4. **移动消息场景下的 agent 回复闭环很重要**  
   “get its answer on the same phone” 表明用户期待在同一对话上下文中完成请求与响应，而不是跳转到其他系统。

---

## 8. 待处理积压

当前数据集中未提供长期未响应的 Issues 或 PR，因此无法识别历史积压项。

### 今日需要维护者关注的待处理项

#### [#3416 feat(channels): add Sendblue iMessage and SMS transport](https://github.com/sipeed/picoclaw/pull/3416)

建议维护者优先关注该 PR 的以下方面：

- 明确该 PR 是否仍为 draft，是否已满足 review 条件
- 检查 channel 抽象是否与现有架构一致
- 审查 Sendblue webhook 安全性与鉴权机制
- 验证环境变量、secrets 和文档是否完整
- 确认是否需要测试覆盖，包括：
  - 入站短信 / iMessage 消息解析
  - 出站回复发送
  - webhook 注册失败处理
  - Sendblue API 错误处理
  - 重复消息去重
- 评估是否需要在合并前补充示例配置或端到端部署说明

---

## 项目健康度评估

- 活跃度：低
- 维护节奏：今日无合并、无 Issue 更新，节奏偏静态
- 风险水平：低到中等；当前无新增 Bug，但待合并外部通信集成需要重点审查安全与稳定性
- 功能演进信号：中等；Sendblue iMessage / SMS channel 表明项目可能继续扩展多渠道 agent 接入能力
- 社区互动：低；暂无评论、反应或 Issue 讨论数据支撑更高热度判断

总体而言，PicoClaw 今日没有大规模开发活动，但 [#3416](https://github.com/sipeed/picoclaw/pull/3416) 是一个值得关注的功能型 PR。若该集成顺利合并，项目在个人 AI 助手和移动通信入口方面将获得明显增强。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报  
**日期：2026-10-06**  
**仓库：** github.com/qwibitai/nanoclaw

---

## 1. 今日速览

过去 24 小时 NanoClaw **没有 Issue 更新**，但 PR 活动非常密集，共有 **14 条 Pull Request 更新**，其中 **8 条仍待合并，6 条已关闭/合并**，说明维护重心集中在发布候选版本稳定性、安装更新流程、Windows/macOS 兼容性和技能适配器治理上。

今日最重要的事件是发布了 **v2026.10.0-rc.2**，这是 2026.10.0 的第二个候选版本，也是项目切换到日历版本号后的关键发布候选。多个 PR 指向同一目标：让 `/update-nanoclaw` 默认跟随已发布版本，而不是 `main` 分支 tip，这表明项目正在加强发布纪律和升级可预测性。

整体活跃度评估：**高活跃、偏稳定性冲刺阶段**。虽然社区 Issue 没有新增反馈，但核心团队和贡献者集中修复安装、更新、OneCLI、Windows socket、Docker readiness、SQLite transient failure 等问题，显示项目正在为正式版做最后收敛。

---

## 2. 版本发布

### v2026.10.0-rc.2  
链接：<https://github.com/qwibitai/nanoclaw/releases/tag/v2026.10.0-rc.2>  
相关 PR：[#4038 chore(release): v2026.10.0-rc.2](https://github.com/qwibitai/nanoclaw/pull/4038)

今日发布了 **NanoClaw 2026.10.0-rc.2**，这是 **2026.10.0 的第二个 Release Candidate**。

#### 主要意义

- 这是 NanoClaw 采用 **calendar versioning（日历版本号）** 后的首个关键发布周期。
- `/update-nanoclaw` 的默认行为发生重要变化：  
  **更新将跟随已发布 release，而不是直接跟随 `main` 分支最新提交。**
- `beta` channel 安装会获得该候选版本。
- 稳定通道预计仍面向更保守的发布路径。

#### 更新内容概览

根据发布 PR #4038，rc.2 包含自上一个候选版本以来合并的多项修复，重点集中在：

- 安装与更新流程稳定性；
- macOS `launchd` 服务重启流程；
- OneCLI 技能和 gateway 版本固定；
- 测试稳定性；
- release notes 与版本元数据更新。

#### 破坏性变更 / 行为变化

当前数据中未显示明确的 API 级破坏性变更，但有一个重要的运维行为变化：

- **更新源从 `main` tip 转向正式发布版本。**  
  这会提升稳定性和可复现性，但也意味着用户不会自动获得尚未发布到 release 的最新代码。

#### 迁移与升级注意事项

- 使用 `/update-nanoclaw` 的用户应注意：默认更新路径现在更接近正式发布节奏。
- 使用 `beta` channel 的用户会接收 rc.2，需要接受候选版本可能仍存在回归风险。
- OneCLI 相关用户需要关注近期多个 PR 对 gateway 版本 pin、迁移说明和 rollback 指令的修正，避免错误升级或回滚到不兼容版本。

---

## 3. 项目进展

今日已关闭/合并的重要 PR 共 6 条，主要推动了 **发布候选版本、安装更新稳定性、OneCLI 技能安全升级和测试可靠性**。

### 发布流程推进

#### #4038 chore(release): v2026.10.0-rc.2  
链接：<https://github.com/qwibitai/nanoclaw/pull/4038>  
状态：Closed

该 PR 完成了 `v2026.10.0-rc.2` 的发布准备工作，包括：

- `package.json` 版本从 `2026.10.0-rc.1` 更新到 `2026.10.0-rc.2`；
- 刷新 `CHANGELOG` 的 Unreleased 区域；
- 通过 pre-release 路径发布第二个候选版本。

**项目推进意义：**  
这是今日最核心的交付，标志着 2026.10.0 正式版继续向稳定状态靠近。

---

### macOS 更新流程稳定性

#### #4037 fix(update): wait for the launchd host to exit after bootout  
链接：<https://github.com/qwibitai/nanoclaw/pull/4037>  
状态：Closed

该 PR 修复 macOS 更新流程中的竞态问题：

- `stopService` 执行 `launchctl bootout` 后过早返回；
- host 进程仍在关闭时，更新流程已经开始做状态快照并重启服务；
- 可能导致新旧进程生命周期交叠，引发升级过程不稳定。

**项目推进意义：**  
提高 macOS 用户执行更新时的可靠性，尤其是服务托管在 `launchd` 下的场景。

---

### OneCLI 版本治理与兼容性修复

#### #4036 fix(onecli): hold the gateway on 1.42.0 and stop /add-dial-tool on 1.42+  
链接：<https://github.com/qwibitai/nanoclaw/pull/4036>  
状态：Closed

该 PR 将 OneCLI gateway 固定在 `1.42.0`，并阻止 `/add-dial-tool` 在不兼容版本上继续执行。

修复背景：

- OneCLI 1.43 的 `onecli agents set-secrets` API 返回 `410`；
- 该 API 被 `/add-onecli` 和 `/add-vercel` 等流程依赖；
- 继续使用不兼容 gateway 会导致技能安装或密钥配置失败。

**项目推进意义：**  
这是对外部依赖回归的风险隔离，避免用户安装流程被上游 OneCLI 变化破坏。

---

#### #4039 fix(onecli): upgrade guide refuses an empty gateway pin  
链接：<https://github.com/qwibitai/nanoclaw/pull/4039>  
状态：Closed

该 PR 修复 OneCLI 升级指南中可能写入空版本号的问题。

问题：

- save command 可能写入 `ONECLI_VERSION=`；
- Docker Compose 在空版本号情况下可能拉取 `latest`；
- 如果 `latest` 对数据库或 API 做了不兼容迁移，会造成难以回滚的问题。

**项目推进意义：**  
降低升级文档导致用户误操作的概率，提升部署安全性。

---

#### #4041 fix(onecli): migration warning points back to the pin, not the old version  
链接：<https://github.com/qwibitai/nanoclaw/pull/4041>  
状态：Closed

该 PR 修复 OneCLI 升级说明中的误导性 rollback 指令。

问题：

- 文档提示用户“回滚到 step 4”；
- 但 step 4 保存的是旧版本；
- 在某些 gateway 版本下，这会导致用户重新启动已经不安全或不兼容的旧版本。

**项目推进意义：**  
进一步修正迁移/回滚路径，减少生产环境误恢复风险。

---

### 测试稳定性修复

#### #4035 test(setup): reuse exec-checked stubs in the restart readiness tests  
链接：<https://github.com/qwibitai/nanoclaw/pull/4035>  
状态：Closed

该 PR 修复 macOS 上 full-suite 测试偶发超时的问题。

问题：

- macOS 会对新脚本执行安全检查；
- 每个测试文件写入新的 `node` stub 会引发约 200ms 的检查开销；
- 并行测试时检查排队，导致 restart readiness 测试超时。

**项目推进意义：**  
提升 CI/本地全量测试稳定性，减少非功能性 flaky failure。

---

## 4. 社区热点

今日没有 Issue 更新，PR 数据中的评论数为 `undefined`，反应数均为 0，因此无法基于评论量或表情反应判断真实讨论热度。按主题集中度和影响面来看，今日热点主要集中在以下方向。

### 热点一：发布候选版本与更新机制稳定化

- Release：<https://github.com/qwibitai/nanoclaw/releases/tag/v2026.10.0-rc.2>  
- PR：[#4038](https://github.com/qwibitai/nanoclaw/pull/4038)

背后诉求：

- 用户需要更稳定、可预测的更新体验；
- 项目不再让 `/update-nanoclaw` 默认追踪 `main`，说明维护者正在减少用户直接暴露于未发布代码的风险；
- 对 AI agent/个人助手类项目而言，安装和升级稳定性直接影响信任度。

---

### 热点二：OneCLI 生态兼容性

相关 PR：

- [#4036](https://github.com/qwibitai/nanoclaw/pull/4036)
- [#4039](https://github.com/qwibitai/nanoclaw/pull/4039)
- [#4041](https://github.com/qwibitai/nanoclaw/pull/4041)
- [#4034](https://github.com/qwibitai/nanoclaw/pull/4034)

背后诉求：

- 用户依赖 OneCLI 作为 gateway 或技能集成入口；
- 外部版本变更可能破坏 NanoClaw 技能安装、密钥注入和数据库兼容性；
- 当前维护策略明显偏向“固定可用版本 + 阻断危险路径 + 修正文档”。

---

### 热点三：Windows 兼容性与服务稳定性

相关 PR：

- [#4045](https://github.com/qwibitai/nanoclaw/pull/4045)
- [#4044](https://github.com/qwibitai/nanoclaw/pull/4044)
- [#4046](https://github.com/qwibitai/nanoclaw/pull/4046)

背后诉求：

- Windows 服务账户、NTFS 文件名限制、Docker Desktop 命名管道波动，都是桌面端 AI 助手类项目常见痛点；
- 今日多个开放 PR 都直接指向 Windows 上的启动循环、socket 权限、路径非法字符问题；
- 这表明项目正在补齐跨平台部署可靠性。

---

## 5. Bug 与稳定性

以下按严重程度和用户影响面排序。

### P0 / P1：启动失败、服务循环重启类

#### #4045 fix(cli): named pipe for the ncl socket on Windows  
链接：<https://github.com/qwibitai/nanoclaw/pull/4045>  
状态：Open  
领域：`area/ncl-cli`

问题描述：

- Node 在 Windows NTFS 上使用 AF_UNIX socket 时，在 NSSM 服务账户下可能遇到 `EACCES`；
- daemon 能 bind，但无法 `chmod data/ncl.sock`；
- 下一次启动重新 bind 时失败，导致 host 进入 circuit-breaker restart loop。

影响：

- Windows 用户可能出现服务无法稳定启动；
- 属于启动链路关键故障。

是否已有 fix PR：**是，#4045 已开放。**

---

#### #4046 fix(drivers): retry transient failures in the runtime readiness probe  
链接：<https://github.com/qwibitai/nanoclaw/pull/4046>  
状态：Open  
领域：`area/containers`

问题描述：

- `ensureDockerRunning` 当前是 single-shot fatal probe；
- Windows 上 Docker Desktop 重启、WSL kernel churn 或资源压力时，`\\.\pipe\docker_engine` 命名管道可能短暂消失；
- 一次探测失败就导致 host 退出，并触发 startup circuit breaker，进入 5-15 分钟 backoff。

影响：

- Windows + Docker Desktop 用户启动稳定性受影响；
- 瞬态 Docker 故障被放大为长时间不可用。

是否已有 fix PR：**是，#4046 已开放。**

---

### P1：数据交付与 SQLite transient failure

#### #4047 fix(delivery): swallow transient SQLITE_READONLY on hot-journal recovery  
链接：<https://github.com/qwibitai/nanoclaw/pull/4047>  
状态：Open  
领域：`area/core`

问题描述：

- host 的 1 秒 active delivery poll 会以 readonly 方式打开 `outbound.db`；
- 在 `journal_mode=DELETE` 下，如果遇到 mid-commit `-journal` 文件，SQLite 需要恢复 hot journal；
- readonly open 无法执行恢复，`better-sqlite3` 抛出 `attempt to write a readonly database`；
- 这是 transient 状态，但当前会产生错误。

影响：

- 可能影响 outbound delivery 稳定性；
- 对跨挂载可见性依赖 `journal_mode=DELETE` 的部署尤其相关。

是否已有 fix PR：**是，#4047 已开放。**

---

### P1：文件系统路径兼容性

#### #4044 fix(router): filesystem-safe separator in messageIdForAgent  
链接：<https://github.com/qwibitai/nanoclaw/pull/4044>  
状态：Open  
领域：`area/core`

问题描述：

- `messageIdForAgent` 使用 `${id}:${agentGroupId}`；
- Telegram inbound `message.id` 本身已包含 `${chatId}:${msgId}`；
- fan-out 后的 id 会被用于文件系统目录名；
- Windows NTFS 中 `:` 是保留字符，可能导致附件提取或 session inbox 操作失败。

影响：

- Windows 用户处理 Telegram 消息附件时可能失败；
- 属于跨平台路径安全问题。

是否已有 fix PR：**是，#4044 已开放。**

---

### P2：macOS 更新竞态

#### #4037 fix(update): wait for the launchd host to exit after bootout  
链接：<https://github.com/qwibitai/nanoclaw/pull/4037>  
状态：Closed  
领域：`area/setup-installation`

问题描述：

- macOS 更新流程没有等待 host 完全退出；
- 状态快照与进程关闭存在竞态。

影响：

- 可能导致更新不完整或重启状态异常。

是否已有 fix PR：**是，已关闭/合并。**

---

### P2：OneCLI 外部依赖回归

相关 PR：

- [#4036](https://github.com/qwibitai/nanoclaw/pull/4036) Closed
- [#4039](https://github.com/qwibitai/nanoclaw/pull/4039) Closed
- [#4041](https://github.com/qwibitai/nanoclaw/pull/4041) Closed
- [#4034](https://github.com/qwibitai/nanoclaw/pull/4034) Open

问题描述：

- OneCLI gateway 新版本存在 API 行为变化；
- 升级文档和测试环境变量隔离存在问题；
- 如果未固定版本或误写空版本，可能导致用户拉取 `latest` 并触发不可逆迁移。

影响：

- 技能安装、密钥设置、gateway 迁移流程可能失败；
- 对生产部署用户风险较高。

是否已有 fix PR：**部分已合并，#4034 仍开放。**

---

## 6. 功能请求与路线图信号

今日没有新 Issue 形式的功能请求，但有两个开放 PR 明确指向新功能或生态扩展。

### Sendblue iMessage / SMS 技能

#### #4043 feat(channels): add Sendblue iMessage and SMS skill  
链接：<https://github.com/qwibitai/nanoclaw/pull/4043>  
状态：Open  
领域：`area/channels`, `area/core`, `area/skills`

功能内容：

- 新增可选 Sendblue skill；
- 支持 iMessage / SMS 文本对话；
- 包含免费账户验证、webhook 设置、operator DM wiring；
- 支持编号审批回复；
- 提供完整移除说明；
- ingress 包含认证、有界 webhook、assigned-line 和 sender 检查。

路线图信号：

- NanoClaw 正在增强“真实通信渠道”集成能力；
- iMessage/SMS 支持会让个人 AI 助手更接近真实日常通信场景；
- 若稳定性和安全审查通过，该功能很可能进入后续 2026.10.x 或下一候选版本。

---

### FXMacroData MCP Tool Skill

#### #4040 feat: add FXMacroData MCP tool skill  
链接：<https://github.com/qwibitai/nanoclaw/pull/4040>  
状态：Open  
领域：`area/skills`

功能内容：

- 新增 `/add-fxmacrodata-tool`；
- 注册 FXMacroData 托管 MCP server；
- 提供宏观经济发布、release calendars、央行数据、FX 数据；
- 默认 keyless；
- 结构参考 `/add-tavily-tool`。

路线图信号：

- 项目继续扩展 MCP 工具生态；
- 面向金融、宏观经济、外汇分析场景；
- 适合研究型 agent、投资助理、市场监控型个人助手。

---

### Resend adapter 安全升级

#### #4042 chore(skills): bump the Resend adapter pin to 0.3.0  
链接：<https://github.com/qwibitai/nanoclaw/pull/4042>  
状态：Open  
领域：`area/channels`, `area/skills`

内容：

- 将 `/add-resend` 使用的 adapter pin 升级到 `0.3.0`；
- 旧版本 `@resend/chat-sdk-adapter@0.1.1` 通过 `resend` 和 `svix` 引入 `uuid@10.0.0`；
- 存在 4 个 moderate 级别 `npm audit` findings。

路线图信号：

- 技能生态不仅在扩展，也在加强供应链安全；
- 很可能被纳入近期 patch 或 rc 后续修复。

---

## 7. 用户反馈摘要

今日没有 Issue 更新，也没有可用评论数据，因此无法从 Issues 评论中提炼真实用户原话或明确满意/不满意反馈。

不过，从 PR 修复方向可以间接看出当前用户痛点集中在以下几个方面：

1. **升级过程需要更可预测**  
   相关链接：  
   - <https://github.com/qwibitai/nanoclaw/pull/4038>  
   - <https://github.com/qwibitai/nanoclaw/pull/4037>  
   用户不希望更新时追踪未发布代码，也不希望服务重启、状态快照出现竞态。

2. **外部依赖版本变化会放大部署风险**  
   相关链接：  
   - <https://github.com/qwibitai/nanoclaw/pull/4036>  
   - <https://github.com/qwibitai/nanoclaw/pull/4039>  
   - <https://github.com/qwibitai/nanoclaw/pull/4041>  
   OneCLI gateway 的 API 变化、空版本 pin、错误 rollback 指令，都说明用户对安全升级和可逆迁移有较高需求。

3. **Windows 桌面/服务部署仍是重点痛点**  
   相关链接：  
   - <https://github.com/qwibitai/nanoclaw/pull/4045>  
   - <https://github.com/qwibitai/nanoclaw/pull/4046>  
   - <https://github.com/qwibitai/nanoclaw/pull/4044>  
   Windows 上的命名管道、NTFS 保留字符、Docker Desktop transient failure，都是个人 AI 助手类项目在跨平台部署中的典型问题。

4. **技能生态用户正在走向真实业务场景**  
   相关链接：  
   - <https://github.com/qwibitai/nanoclaw/pull/4043>  
   - <https://github.com/qwibitai/nanoclaw/pull/4040>  
   iMessage/SMS、宏观经济和 FX 数据工具表明用户场景正在从基础聊天扩展到通信自动化、金融信息获取和专业工具调用。

---

## 8. 待处理积压

今日数据未提供长期未响应 Issue 或 PR，因此无法识别真正意义上的“长期积压”。但从当前开放 PR 看，以下事项值得维护者优先关注，因为它们直接影响 rc 稳定性和跨平台可用性。

### 高优先级待处理

#### #4047 SQLite readonly transient failure  
链接：<https://github.com/qwibitai/nanoclaw/pull/4047>  
原因：涉及 delivery core，可能影响消息投递可靠性。

#### #4046 Docker runtime readiness probe retry  
链接：<https://github.com/qwibitai/nanoclaw/pull/4046>  
原因：Windows Docker transient failure 会导致 host 退出和长时间 backoff。

#### #4045 Windows named pipe for ncl socket  
链接：<https://github.com/qwibitai/nanoclaw/pull/4045>  
原因：可能导致 Windows 服务启动循环，是跨平台稳定性阻断项。

#### #4044 filesystem-safe message id separator  
链接：<https://github.com/qwibitai/nanoclaw/pull/4044>  
原因：修复 Windows NTFS 路径非法字符问题，影响 Telegram 附件和 session inbox。

---

### 中优先级待处理

#### #4042 Resend adapter pin 升级  
链接：<https://github.com/qwibitai/nanoclaw/pull/4042>  
原因：供应链安全修复，涉及 moderate 级别 audit findings。

#### #4034 OneCLI payload tests environment isolation  
链接：<https://github.com/qwibitai/nanoclaw/pull/4034>  
原因：测试会受调用者环境变量影响，可能造成 CI 或本地测试不稳定。

---

### 功能型待处理

#### #4043 Sendblue iMessage and SMS skill  
链接：<https://github.com/qwibitai/nanoclaw/pull/4043>  
原因：新增真实通信渠道，功能价值高，但需要重点审查 webhook 安全、sender 校验和 operator approval 流程。

#### #4040 FXMacroData MCP tool skill  
链接：<https://github.com/qwibitai/nanoclaw/pull/4040>  
原因：扩展 MCP 工具生态，适合进入后续功能版本，但优先级低于 rc 稳定性修复。

---

## 健康度结论

NanoClaw 今日处于 **高强度 release candidate 稳定化阶段**。项目没有新增 Issue，说明外部反馈面暂时平静；但 PR 活跃度很高，尤其集中在安装更新、Windows/macOS 兼容、OneCLI 版本治理和技能供应链安全上。

短期建议：

1. 优先合并或验证 #4044、#4045、#4046、#4047，降低 rc.2 到正式版之间的跨平台风险。  
2. 尽快处理 #4042，避免已知依赖安全告警进入正式版。  
3. 对 #4043 进行安全审查，尤其是 webhook 鉴权、sender 校验和 operator approval 流程。  
4. 在正式版发布前补充用户可见的迁移说明，重点解释 `/update-nanoclaw` 更新策略变化、OneCLI pin 策略和 beta/stable channel 行为。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报（2026-10-06）

## 1. 今日速览

过去 24 小时，NullClaw 项目活跃度较高：新增或更新 **8 个 Issue**、**10 个 Pull Request**，但暂无 PR 合并或 Issue 关闭，说明当前处于集中修复与审查阶段。  
今日工作重点明显集中在 **Docker 发布质量、CLI 终端体验、测试隔离、安全加固、文档准确性** 等工程健康度议题上。  
从数据看，所有新增 PR 均处于 Open 状态，维护者需要尽快 review，以避免修复堆积。  
社区讨论热度整体不高，Issue/PR 的 👍 反应均为 0，评论也很少，但问题本身多为高价值的稳定性与发布流程缺陷。  
项目健康度评价：**开发活跃，但合并节奏偏慢；短期风险主要来自未合并的稳定性与 CI 修复。**

---

## 2. 版本发布

今日无新版本发布。

最新 Releases：无。

---

## 3. 项目进展

过去 24 小时内没有 PR 被合并或关闭，因此严格意义上项目主干尚未前进。不过，多个待合并 PR 已经覆盖了关键缺陷和工程质量改进，若完成 review 并合入，将显著提升项目可靠性。

### 待合并的重要 PR

#### [PR #1042 ci: gate Docker image changes on pull requests](https://github.com/nullclaw/nullclaw/pull/1042)

该 PR 为 Docker 镜像变更增加 PR 阶段校验，旨在避免此前 Docker 镜像发布后才发现运行时损坏的问题。  
它直接回应了 Docker 镜像曾因 `/nullclaw-data` 权限错误导致 gateway 以 uid 65534 运行时 `AccessDenied` 的问题。

关联 Issue：

- [Issue #1036 ci: gate Docker image changes on PRs and before release publish](https://github.com/nullclaw/nullclaw/issues/1036)

影响评估：  
这是今日最重要的 CI/发布质量改进之一。如果合并，可降低“发布后才发现镜像不可用”的风险。

---

#### [PR #1038 test(config): resolve a private config dir instead of the real HOME](https://github.com/nullclaw/nullclaw/pull/1038)

该 PR 修复测试依赖真实 `$HOME/.nullclaw` 的问题，使 cron、session、cron-tool 等测试使用私有配置目录。  
此前在沙箱环境、HOME 重定向或无法写入用户目录时会出现 11 个测试失败。

关联 Issue：

- [Issue #1029 test: make cron/session tests hermetic so the suite runs without real user config](https://github.com/nullclaw/nullclaw/issues/1029)

影响评估：  
该改动将提升测试套件的可复现性，降低开发者本地环境差异导致的失败。

---

#### [PR #1030 fix(security): open archived keys without following symlinks and sync the archive directory](https://github.com/nullclaw/nullclaw/pull/1030)

该 PR 修复归档密钥读取中的 TOCTOU 风险：目录遍历阶段跳过 symlink，但随后普通 open 可能在检查与打开之间被替换为 symlink。  
PR 通过 no-follow open 与目录 fsync 加强安全边界。

关联 Issue：

- [Issue #1026 fix(security): open archived key entries without following symlinks and fsync the parent directory](https://github.com/nullclaw/nullclaw/issues/1026)

影响评估：  
这是一个明确的安全加固项，建议优先 review。

---

#### [PR #1041 fix(cli): refresh terminal width per keystroke and keep history separators](https://github.com/nullclaw/nullclaw/pull/1041)

该 PR 改进 CLI 交互体验：  
- 每次按键刷新 terminal width，避免终端缩小时渲染异常  
- 保留历史记录召回中的分隔符，改善多行输入体验

关联 Issue：

- [Issue #1028 fix(cli): refresh terminal width while editing and keep history-recall separators](https://github.com/nullclaw/nullclaw/issues/1028)

影响评估：  
偏用户体验，但有助于提高 CLI 可用性与交互稳定性。

---

#### [PR #1031 refactor(providers): replace exact Claude model checks with a thinking capability table](https://github.com/nullclaw/nullclaw/pull/1031)

该 PR 将 Anthropic Claude 模型的能力判断从硬编码模型名比较改为 capability table。  
原逻辑依赖两个精确模型名，一旦 Claude 新模型或别名出现，容易静默回退到错误配置路径。

关联 Issue：

- [Issue #1027 refactor(providers): replace exact Claude model checks with a thinking capability table](https://github.com/nullclaw/nullclaw/issues/1027)

影响评估：  
这是面向未来模型演进的架构改进，有利于降低 provider 适配成本。

---

## 4. 社区热点

今日社区互动数据偏低：所有列出的 Issue/PR 👍 均为 0，PR 评论数未提供，Issue 中仅 [#1033](https://github.com/nullclaw/nullclaw/issues/1033) 有 1 条评论。虽然讨论热度不高，但议题质量较高，集中在真实运行风险和发布可靠性上。

### 最活跃 Issue

#### [Issue #1033 Cron agent jobs have no default timeout and can block the scheduler indefinitely](https://github.com/nullclaw/nullclaw/issues/1033)

- 状态：Open  
- 评论数：1  
- 👍：0  
- 类型：Bug  
- 关注点：cron agent job 默认无超时，可能无限阻塞调度器

该问题指出 `job_type: "agent"` 的 cron job 如果不退出，会因为调度器串行执行而阻塞其他所有 cron job。更严重的是，默认 agent timeout 为 `0`，即无超时。  
这反映出用户对 **任务调度可靠性、默认安全值、后台任务隔离** 的诉求。

目前相关修复尚未直接出现，但有文档 PR 补充该配置说明：

- [PR #1032 docs(config): document scheduler.agent_timeout_secs](https://github.com/nullclaw/nullclaw/pull/1032)

分析：  
PR #1032 只能缓解“用户不知道默认无超时”的问题，尚不能从机制上防止调度器被卡死。后续可能需要默认超时、并发调度或 watchdog 机制。

---

### 高价值但低讨论的热点

#### [Issue #1036 ci: gate Docker image changes on PRs and before release publish](https://github.com/nullclaw/nullclaw/issues/1036)

- 状态：Open  
- 评论数：0  
- 👍：0  
- 类型：CI / Release quality  
- 对应 PR：[PR #1042](https://github.com/nullclaw/nullclaw/pull/1042)

该 Issue 指出当前没有 workflow 在 PR 阶段构建 Docker image，导致损坏镜像可能进入发布流程。  
这是典型的发布工程缺口，虽然没有社区讨论，但对项目可信度影响较大。

---

#### [Issue #1029 test: make cron/session tests hermetic so the suite runs without real user config](https://github.com/nullclaw/nullclaw/issues/1029)

- 状态：Open  
- 评论数：0  
- 👍：0  
- 类型：Testing / Reliability  
- 对应 PR：[PR #1038](https://github.com/nullclaw/nullclaw/pull/1038)

该问题说明测试会写入真实用户配置目录，导致在沙箱环境或 HOME 被限制时失败。  
背后的诉求是：测试应可重复、无副作用、与开发者本地环境隔离。

---

## 5. Bug 与稳定性

按严重程度排序如下。

### 高严重度

#### 1. Cron agent job 默认无超时，可能无限阻塞调度器

- Issue：[Issue #1033](https://github.com/nullclaw/nullclaw/issues/1033)  
- 状态：Open  
- 类型：Bug / Scheduler reliability  
- 是否已有 fix PR：暂无直接 fix PR  
- 相关缓解 PR：[PR #1032](https://github.com/nullclaw/nullclaw/pull/1032)

问题描述：  
cron jobs 串行调度，若某个 `job_type: "agent"` 永不退出，则会阻塞所有后续 cron jobs。默认 `agent_timeout_secs = 0` 表示无超时，进一步放大风险。

影响：  
可能造成自动化任务全部停摆，尤其影响依赖 NullClaw 定时执行 agent 工作流的用户。

建议优先级：高。  
建议不仅补文档，还应考虑默认非零超时、单任务隔离、并发调度或 scheduler watchdog。

---

#### 2. 归档密钥读取存在 symlink TOCTOU 风险

- Issue：[Issue #1026](https://github.com/nullclaw/nullclaw/issues/1026)  
- PR：[PR #1030](https://github.com/nullclaw/nullclaw/pull/1030)  
- 状态：Issue Open，PR Open  
- 类型：Security hardening  
- 是否已有 fix PR：有

问题描述：  
`decryptWithArchivedKeys` 虽然在目录遍历时跳过 symlink，但随后打开文件时没有绑定检查结果，可能被攻击者在检查与打开之间替换为 symlink。

影响：  
在归档目录可被写入的情况下，可能读取 archive directory 外的 key material 或造成安全边界绕过。

建议优先级：高。  
该 PR 应尽快 review 和合并。

---

#### 3. Docker 镜像发布缺少 PR 阶段校验，可能发布不可用镜像

- Issue：[Issue #1036](https://github.com/nullclaw/nullclaw/issues/1036)  
- PR：[PR #1042](https://github.com/nullclaw/nullclaw/pull/1042)  
- 状态：Issue Open，PR Open  
- 类型：CI / Release stability  
- 是否已有 fix PR：有

问题描述：  
当前 workflow 没有在 PR 中构建 Docker image，导致镜像相关问题只能在 release 或发布后暴露。

影响：  
曾经出现过 published image 运行失败的情况，影响使用 Docker 部署的用户。

建议优先级：高。  
建议在 PR 阶段构建并 smoke test 镜像，同时在 release publish 前强制通过镜像验证。

---

### 中严重度

#### 4. 测试依赖真实 HOME，导致沙箱或受限环境失败

- Issue：[Issue #1029](https://github.com/nullclaw/nullclaw/issues/1029)  
- PR：[PR #1038](https://github.com/nullclaw/nullclaw/pull/1038)  
- 状态：Issue Open，PR Open  
- 类型：Test reliability  
- 是否已有 fix PR：有

问题描述：  
cron/session 相关测试在 `NULLCLAW_HOME` 未设置时落到真实 `$HOME/.nullclaw`，导致测试污染用户环境，或在无法写入时失败。

影响：  
开发者体验下降，CI 环境可移植性降低。

建议优先级：中高。  
建议尽快合并，以提升测试稳定性。

---

#### 5. 旧 Docker volume 权限问题在镜像修复后仍会保留

- Issue：[Issue #1034](https://github.com/nullclaw/nullclaw/issues/1034)  
- PR：[PR #1035](https://github.com/nullclaw/nullclaw/pull/1035)  
- 状态：Issue Open，PR Open  
- 类型：Docs / Deployment recovery  
- 是否已有 fix PR：有，文档修复

问题描述：  
曾由旧镜像初始化的 named volume 会保留 root-owned 权限，即使用户升级到修复后的镜像，仍可能继续 `AccessDenied`。

影响：  
Docker 用户可能认为升级无效，需要手动 chown 修复 volume。

建议优先级：中。  
文档修复可明显降低支持成本。

---

### 低到中严重度

#### 6. CLI 编辑时终端宽度不会动态刷新，历史召回分隔符丢失

- Issue：[Issue #1028](https://github.com/nullclaw/nullclaw/issues/1028)  
- PR：[PR #1041](https://github.com/nullclaw/nullclaw/pull/1041)  
- 状态：Issue Open，PR Open  
- 类型：CLI usability  
- 是否已有 fix PR：有

问题描述：  
终端宽度在 prompt 开始时采样一次，编辑过程中缩小终端可能导致渲染假设失效。同时，历史召回中多行输入的分隔符处理不佳。

影响：  
主要影响交互式 CLI 使用体验。

---

## 6. 功能请求与路线图信号

### 1. 原生 Windows 控制台编辑支持

- Issue：[Issue #1037 feat(cli): native Windows console editing](https://github.com/nullclaw/nullclaw/issues/1037)  
- 状态：Open  
- 类型：Enhancement  
- 是否已有 PR：暂无

该 Issue 是此前 #970 审批中明确提到的 follow-up。当前 Windows 控制台编辑能力仍是 raw-mode stub，尚未实现原生支持。

路线图信号：  
该需求已经被独立建档，说明维护者认可其必要性，但当前尚未进入实现阶段。预计不会立即进入下一版本，除非出现对应 PR。

---

### 2. Anthropic Claude 模型能力表

- Issue：[Issue #1027](https://github.com/nullclaw/nullclaw/issues/1027)  
- PR：[PR #1031](https://github.com/nullclaw/nullclaw/pull/1031)  
- 状态：Issue Open，PR Open

该项从“功能请求”角度看，是对 provider 适配架构的演进：不再依赖精确模型名判断，而是用 capability table 表示模型是否支持 adaptive thinking。

路线图信号：  
已有 PR，较可能进入下一版本。它将提高项目对新模型、新别名的兼容性。

---

### 3. CLI 交互体验完善

- Issue：[Issue #1028](https://github.com/nullclaw/nullclaw/issues/1028)  
- PR：[PR #1041](https://github.com/nullclaw/nullclaw/pull/1041)

该项体现 NullClaw CLI 正在补齐真实终端场景下的边界体验，包括终端 resize、历史召回等细节。

路线图信号：  
已有 PR，较可能在下一版本合入。

---

### 4. Docker 发布质量门禁

- Issue：[Issue #1036](https://github.com/nullclaw/nullclaw/issues/1036)  
- PR：[PR #1042](https://github.com/nullclaw/nullclaw/pull/1042)

该项不是用户可见功能，但属于重要路线图信号：项目正在加强 release engineering，尤其是容器分发质量。

路线图信号：  
已有 PR，建议作为下一版本前置条件合入。

---

### 5. Android / Termux 构建文档修正

- PR：[PR #1043 docs(termux): correct the Android cross-compile guidance](https://github.com/nullclaw/nullclaw/pull/1043)  
- 状态：Open

该 PR 修正文档中 Android cross-compile 指引的失效引用。此前文档指向 `.github/workflows/release.yml` 作为 `--libc` 文件生成示例，但该工作流并未提供相关示例。

路线图信号：  
说明项目仍在维护移动端 / Termux 用户路径，虽然是文档修复，但对新用户构建成功率有直接帮助。

---

## 7. 用户反馈摘要

从今日 Issue 内容看，反馈主要来自对项目实际使用和维护过程中的问题复盘，而非普通“功能愿望”。痛点集中在以下几个方面。

### 1. 定时任务需要可靠的失败边界

相关链接：

- [Issue #1033](https://github.com/nullclaw/nullclaw/issues/1033)
- [PR #1032](https://github.com/nullclaw/nullclaw/pull/1032)

用户痛点：  
cron agent job 一旦卡住，会阻塞其他所有 cron job；默认无超时让用户很难提前意识到风险。

使用场景：  
依赖 NullClaw 执行自动化 agent 任务、周期性后台作业或个人助手流程的用户。

不满意点：  
默认行为不够安全，文档未明确提醒 `agent_timeout_secs = 0` 表示无超时。

---

### 2. Docker 用户需要可恢复、可验证的部署路径

相关链接：

- [Issue #1036](https://github.com/nullclaw/nullclaw/issues/1036)
- [PR #1042](https://github.com/nullclaw/nullclaw/pull/1042)
- [Issue #1034](https://github.com/nullclaw/nullclaw/issues/1034)
- [PR #1035](https://github.com/nullclaw/nullclaw/pull/1035)

用户痛点：  
Docker 镜像曾发布后才发现权限问题；旧 volume 在镜像修复后仍可能继续失败，用户需要额外修复步骤。

使用场景：  
通过 `ghcr.io/nullclaw/nullclaw` 部署 gateway 或服务端组件的用户。

不满意点：  
发布前缺少镜像验证；文档未覆盖旧 volume 迁移和修复。

---

### 3. 开发者希望测试套件不依赖真实用户环境

相关链接：

- [Issue #1029](https://github.com/nullclaw/nullclaw/issues/1029)
- [PR #1038](https://github.com/nullclaw/nullclaw/pull/1038)

用户痛点：  
测试写入真实 `$HOME/.nullclaw`，既可能污染开发者环境，也可能在受限环境失败。

使用场景：  
本地开发、CI、沙箱环境、受限 HOME 的自动化测试。

不满意点：  
测试不 hermetic，环境依赖过强。

---

### 4. CLI 用户希望交互行为更接近成熟终端应用

相关链接：

- [Issue #1028](https://github.com/nullclaw/nullclaw/issues/1028)
- [PR #1041](https://github.com/nullclaw/nullclaw/pull/1041)
- [Issue #1037](https://github.com/nullclaw/nullclaw/issues/1037)

用户痛点：  
终端 resize、历史召回、多行输入、Windows 控制台编辑仍有体验缺口。

使用场景：  
长期使用 NullClaw CLI 进行交互式 AI 助手操作的用户，尤其是 Windows 用户。

不满意点：  
跨平台终端体验尚未完全成熟。

---

## 8. 待处理积压

严格按今日数据看，没有出现“长期未响应”的 Issue 或 PR；所有列出的 Issue/PR 均在 2026-10-05 至 2026-10-06 创建或更新，属于近期新增工作。但当前有 **10 个 Open PR** 尚未合并，建议维护者优先处理以下积压。

### 优先级 P0 / P1：应尽快 review

1. [PR #1030 fix(security): open archived keys without following symlinks and sync the archive directory](https://github.com/nullclaw/nullclaw/pull/1030)  
   安全加固，建议优先合并。

2. [PR #1042 ci: gate Docker image changes on pull requests](https://github.com/nullclaw/nullclaw/pull/1042)  
   防止损坏 Docker 镜像再次发布，建议作为 release 前置质量门禁。

3. [PR #1038 test(config): resolve a private config dir instead of the real HOME](https://github.com/nullclaw/nullclaw/pull/1038)  
   提升测试可复现性，减少环境相关失败。

4. [PR #1032 docs(config): document scheduler.agent_timeout_secs](https://github.com/nullclaw/nullclaw/pull/1032)  
   虽为文档修复，但关联调度器阻塞风险，应尽快合并；同时建议另开代码修复 PR 处理默认无超时问题。

---

### 优先级 P2：体验与维护性改进

5. [PR #1041 fix(cli): refresh terminal width per keystroke and keep history separators](https://github.com/nullclaw/nullclaw/pull/1041)

6. [PR #1031 refactor(providers): replace exact Claude model checks with a thinking capability table](https://github.com/nullclaw/nullclaw/pull/1031)

7. [PR #1035 docs(docker): document the repair for pre-fix named volumes](https://github.com/nullclaw/nullclaw/pull/1035)

8. [PR #1043 docs(termux): correct the Android cross-compile guidance](https://github.com/nullclaw/nullclaw/pull/1043)

---

### 优先级 P3：文档维护与清理

9. [PR #1040 docs: make CLAUDE.md a pointer file instead of a second AGENTS.md](https://github.com/nullclaw/nullclaw/pull/1040)

10. [PR #1039 docs: refresh stale scale figures across the documentation](https://github.com/nullclaw/nullclaw/pull/1039)

这两项主要改善文档一致性和准确性。其中 [PR #1040](https://github.com/nullclaw/nullclaw/pull/1040) 还提到 supersedes [#775](https://github.com/nullclaw/nullclaw/pull/775)，[PR #1039](https://github.com/nullclaw/nullclaw/pull/1039) supersedes [#774](https://github.com/nullclaw/nullclaw/pull/774)。如果 #774/#775 仍处于打开状态，建议维护者关闭或标记为 superseded，避免重复积压。

---

## 总体判断

NullClaw 今日处于明显的“质量修复冲刺”状态：新增 PR 数量多，且覆盖安全、CI、Docker、测试、CLI、文档等多个核心维护面。  
短期最需要关注的是 **cron 调度器无超时风险**、**Docker 镜像发布门禁缺失**、**归档密钥 symlink 安全加固**。  
虽然社区互动指标不高，但问题质量较高，说明项目正在由功能扩展转向稳定性和可维护性建设。  
建议维护者在下一轮合并中优先处理安全与发布质量相关 PR，并为 [Issue #1033](https://github.com/nullclaw/nullclaw/issues/1033) 提供真正的代码级修复方案。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-10-06

## 1. 今日速览

过去 24 小时，IronClaw 保持了**中等活跃度**：新增/活跃 Issues 2 条，新增/活跃 PR 2 条，暂无合并、关闭或新版本发布。  
今日动态主要集中在两个方向：一是 **WebChat 后台标签页状态陈旧与通知缺失问题**，二是 **新增 Sendblue iMessage/SMS 扩展能力**。  
从项目健康度看，维护活动仍在推进，但今日尚未出现已合并修复，说明相关变更仍处于评审或验证阶段。  
值得关注的是，#8124 与 #8125 形成了较清晰的“问题报告 → 修复 PR”链路，显示社区反馈能够较快转化为工程改动。

---

## 3. 项目进展

今日暂无已合并或已关闭 PR，因此项目主干尚未产生可确认的功能推进或稳定性修复。

当前有 2 个待合并 PR 值得关注：

### PR #8127 — feat: add Sendblue iMessage and SMS extension  
链接：<https://github.com/nearai/ironclaw/pull/8127>  
作者：lookevink  
状态：OPEN  
创建时间：2026-10-06

该 PR 增加一个内置 Sendblue 扩展，用于支持 iMessage 与 SMS 的直接通信能力，包括：

- 手机号配对
- 认证后的接收 Webhook
- 终端回复
- 已存储 DM 目标
- 与现有 host lifecycle 和 conversation path 集成
- Sendblue API 凭据由 host 托管

这是一个偏产品能力扩展的 PR，若合并，将使 IronClaw 在个人 AI 助手场景中更接近“跨消息渠道代理”的形态，尤其适用于将 AI 助手接入短信/iMessage 的工作流。

### PR #8125 — fix(webui): keep run state and notification inbox fresh in background tabs  
链接：<https://github.com/nearai/ironclaw/pull/8125>  
作者：heraisys-sas  
状态：OPEN  
创建时间：2026-10-05

该 PR 直接对应 Issue #8124 的部分问题，聚焦 WebChat 在后台标签页中的状态刷新问题。主要变更包括：

- 将 `query-client.ts` 中 `refetchOnWindowFocus` 从 `false` 改为 `true`
- 使用户回到 WebChat 标签页时能够重新拉取 run/action 状态
- 避免 `tool-activity`、`activity` 等状态在前端长期停留在陈旧状态
- 改善通知 inbox 的新鲜度

该 PR 目前解决的是 #8124 中的“状态陈旧”部分，但并未完全覆盖非 HTTPS 部署下 Web Push 静默失效的问题。

---

## 4. 社区热点

今日 Issue 与 PR 均无评论和反应，说明讨论热度暂时不高，但从内容上看，有两个热点方向值得关注。

### WebChat 后台标签页状态与通知问题  
相关 Issue：#8124  
链接：<https://github.com/nearai/ironclaw/issues/8124>  
相关 PR：#8125  
链接：<https://github.com/nearai/ironclaw/pull/8125>

该问题来自自托管单租户部署场景，环境为：

- `ironclaw serve` 1.4.1
- WebChat v2 SPA
- Chrome / Firefox
- 局域网 HTTP 部署，非 TLS，非 localhost

用户反馈的核心诉求是：WebChat 在后台标签页中应保持状态准确，并在任务完成时向用户给出可靠通知。  
这反映出 IronClaw 在真实部署环境中，尤其是非 HTTPS、自托管、局域网访问场景下，对浏览器生命周期、Web Push、安全上下文限制的适配仍需加强。

### Sendblue iMessage/SMS 集成  
相关 PR：#8127  
链接：<https://github.com/nearai/ironclaw/pull/8127>

该 PR 虽然暂无评论，但代表了一个明显的产品方向：让 IronClaw 能够通过短信和 iMessage 直接与用户或联系人交互。  
对于个人 AI 助手项目来说，这类消息通道集成通常意味着更强的日常可用性，例如：

- AI 助手通过短信接收任务
- 用户在移动端无需打开 Web UI 即可交互
- 助手可以处理来自特定联系人的消息
- 将 IronClaw 从 WebChat 扩展到通信入口层

---

## 5. Bug 与稳定性

### 高优先级：WebChat 后台标签页状态陈旧，且非 HTTPS 部署下无完成通知  
Issue：#8124  
链接：<https://github.com/nearai/ironclaw/issues/8124>  
状态：OPEN  
作者：heraisys-sas  
是否已有 fix PR：部分已有，见 #8125  
Fix PR：<https://github.com/nearai/ironclaw/pull/8125>

问题描述：

- 在 WebChat 后台标签页中，tool/action 状态可能保持陈旧
- 用户回到页面后，运行状态未及时刷新
- 在普通 HTTP 局域网部署中，Web Push 因非安全上下文限制可能无法正常工作
- 用户可能无法收到任务完成通知

影响评估：

- 对长期运行任务、工具调用、agent action 状态跟踪影响较大
- 对自托管用户尤其明显
- 若用户依赖 WebChat 作为主要交互界面，可能误判任务仍在运行或未完成
- 非 HTTPS 部署下的通知缺失属于浏览器平台限制，需要产品层有降级策略

当前进展：

- PR #8125 已针对“后台标签页状态陈旧”部分提出修复
- Web Push 在非 HTTPS 环境下的通知问题尚未看到完整修复方案

### 中优先级：每日失败分类报告显示 officeqa 存在模型质量类数值错误  
Issue：#8126  
链接：<https://github.com/nearai/ironclaw/issues/8126>  
状态：OPEN  
作者：pranavraja99  
是否已有 fix PR：暂无

该 Issue 是每日 failure taxonomy，分析了 benchmark 中的非通过项。摘要显示：

- `officeqa` 有 37 个 non-pass
- 失败主要被归因为真实的模型质量问题，尤其是数值类错误
- 涉及 DeepSeek-V4-Flash 在相关任务中的表现

影响评估：

- 该问题更偏向 benchmark / evaluation / model quality 追踪，而非 IronClaw 核心系统崩溃
- 对模型选择、评测基线和 agent 可靠性判断有参考价值
- 如果 officeqa 是项目重要评测套件，则需要持续跟踪趋势，而不仅是单日结果

---

## 6. 功能请求与路线图信号

### Sendblue iMessage/SMS 扩展可能进入下一版本候选  
PR：#8127  
链接：<https://github.com/nearai/ironclaw/pull/8127>

该 PR 是今日最明显的功能型信号。它表明项目可能正在向“多消息渠道 AI 助手”方向扩展，尤其是将 IronClaw 从 WebChat 或 CLI 扩展到用户日常高频使用的通信工具中。

潜在路线图意义：

- 增强个人 AI 助手的移动端可达性
- 支持异步消息场景
- 支持 AI 通过 SMS/iMessage 接收任务与回复
- 引入第三方通信服务凭据托管与 Webhook 安全模型
- 推动 extension/plugin 架构在真实通信渠道中的落地

纳入下一版本的可能性：中等偏高。  
原因是该 PR 已经以完整功能形式提交，且描述中提到与现有 host lifecycle 和 conversation path 集成，说明并非纯概念提案。不过仍需关注安全性、凭据管理、Webhook 验证和用户隐私处理。

### WebChat 后台刷新机制可能成为稳定性路线图的一部分  
Issue：#8124  
链接：<https://github.com/nearai/ironclaw/issues/8124>  
PR：#8125  
链接：<https://github.com/nearai/ironclaw/pull/8125>

该问题体现了 WebChat 在真实部署环境中的可靠性需求。后续可能需要补充：

- 非 HTTPS 环境下的通知降级方案
- 明确提示 Web Push 需要 HTTPS 或 localhost
- 页面可见性变化时的状态同步策略
- 后台任务完成后的 inbox 轮询机制
- 对自托管部署文档的补充说明

纳入下一版本的可能性：较高。  
原因是已有修复 PR，且变更范围较小，属于用户可感知的稳定性改善。

---

## 7. 用户反馈摘要

今日 Issues 没有评论，因此无法从讨论串中提取更多互动反馈。但从 Issue 正文可归纳出以下用户痛点和真实使用场景。

### 自托管用户需要 WebChat 在后台可靠工作  
来源：#8124  
链接：<https://github.com/nearai/ironclaw/issues/8124>

用户场景：

- 自托管 IronClaw
- 单租户部署
- 局域网 HTTP 访问
- 使用浏览器 WebChat 作为主要交互入口
- 期望后台运行任务完成后能够及时获知

核心痛点：

- 标签页切到后台后状态不刷新
- 回到页面时 action 状态可能仍显示旧值
- 任务完成没有可靠提醒
- 非 HTTPS 环境下 Web Push 不可用，但产品体验上没有明显降级或提示

满意/不满意点：

- 不满意点集中在 WebChat 状态一致性和通知可靠性
- 该反馈说明用户已经在真实部署环境中深度使用 WebChat，而非仅进行本地测试

### Benchmark 失败分类需要持续跟踪  
来源：#8126  
链接：<https://github.com/nearai/ironclaw/issues/8126>

用户/维护者关注点：

- 需要理解失败是系统问题、工具问题，还是模型质量问题
- `officeqa` 中的数值错误被归因为模型能力问题
- 这类日报式 taxonomy 有助于区分“框架回归”和“模型表现波动”

---

## 8. 待处理积压

基于本次提供的数据，仅覆盖过去 24 小时更新，无法判断长期未响应的历史 Issue 或 PR。因此今日不列出“长期未响应”积压项。

不过以下开放项建议维护者优先关注：

### #8125 — WebChat 后台状态刷新修复待评审  
链接：<https://github.com/nearai/ironclaw/pull/8125>  
原因：直接修复用户报告的问题，变更范围较小，若测试通过可较快合并，改善 WebChat 可用性。

### #8124 — 非 HTTPS 部署下 Web Push 通知缺口仍需方案  
链接：<https://github.com/nearai/ironclaw/issues/8124>  
原因：#8125 只覆盖状态陈旧问题，通知缺失仍可能存在。建议补充文档、降级轮询或 UI 提示。

### #8127 — Sendblue iMessage/SMS 扩展需重点审查安全边界  
链接：<https://github.com/nearai/ironclaw/pull/8127>  
原因：涉及第三方通信服务、API 凭据、Webhook、消息收发和联系人目标存储。建议重点审查认证、权限边界、日志脱敏和用户隐私。

### #8126 — officeqa 失败分类需观察趋势  
链接：<https://github.com/nearai/ironclaw/issues/8126>  
原因：虽然当前被归因为模型质量问题，但如果类似失败持续扩大，可能影响默认模型选择、评测基线或任务路由策略。

---

## 今日结论

IronClaw 今日没有发布和合并，但有明确的工程活动：一个稳定性修复 PR 和一个新增通信渠道能力 PR。WebChat 后台状态问题已进入修复阶段，显示项目对实际用户部署反馈响应较快。与此同时，Sendblue 集成表明 IronClaw 正在向更实用的个人 AI 助手通信入口扩展。整体来看，项目健康度稳定，但短期内需要推动 #8125 合并，并明确 #8124 中非 HTTPS Web Push 限制的产品处理策略。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报｜2026-10-06

## 1. 今日速览

过去 24 小时，LobsterAI 活跃度较高：新增/活跃 Issues 4 条，PR 更新 4 条，其中 2 条仍待合并，2 条已关闭。今日动态高度集中在 **安全与技能系统稳定性**，多个 Issue 指向 `main` 分支上的预发布安全风险，包括 Token 泄露、未认证代理、目录越界访问与任意目录删除。  
从响应速度看，部分安全 Issue 已在同日提交对应修复 PR，说明维护响应较及时；但目前关键安全修复仍有 2 个 PR 处于开放状态，合并前不宜发布新版本。整体健康度评估为：**开发活跃、问题响应快，但 main 分支当前存在高优先级安全债务，需要尽快收敛。**

---

## 2. 项目进展

今日共有 4 个 PR 更新，其中 2 个已关闭，2 个仍处于开放状态。主要进展集中在技能系统解析与安全加固。

### 已关闭 PR

#### #2800 `fix(skills): align SKILL.md frontmatter parsing with OpenClaw`

- 状态：已关闭  
- 作者：fisherdaddy  
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2800  
- 涉及区域：`renderer`、`main`

该 PR 试图修复 LobsterAI 与 OpenClaw 在解析 `SKILL.md` frontmatter 时行为不一致的问题。LobsterAI 使用严格 `js-yaml` 解析，而 OpenClaw 会修复常见的手写格式错误，例如未加引号的自由文本描述：

```yaml
description: Use when: ...
```

当两者解析结果不一致时，技能列表可能丢失技能描述或元信息，影响用户在界面中识别和选择技能。

**项目推进意义：**

- 暴露出 LobsterAI 与 OpenClaw 运行时之间的兼容性问题。
- 指向技能生态中一个真实痛点：手写 `SKILL.md` 的容错能力不足。
- 虽然 PR 已关闭，但该问题可能仍值得维护者确认是否已有替代实现或后续 PR。

---

#### #2799 `fix(skills): stop using temp extraction dir names as skill ids`

- 状态：已关闭  
- 作者：fisherdaddy  
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2799  
- 涉及区域：`main`

该 PR 关注技能安装时的 ID 生成问题。此前，当 `SKILL.md` 位于压缩包根目录时，安装后的技能 ID 可能来自随机临时解压目录名，例如：

```text
lobsterai-skill-zip-XXXXXX
```

这会导致：

- 重新导入同一技能时产生重复条目；
- Marketplace 更新检查无法匹配已安装技能；
- 远程 zip 或 npm 包安装时出现过于泛化的 ID，例如 `remote-skill`、`package`。

**项目推进意义：**

- 指向技能生命周期管理中的关键一致性问题。
- 有助于改善技能重复安装、更新检测和 Marketplace 对齐。
- PR 已关闭，需确认是已合并、被替代，还是因实现方向不被接受而关闭。

---

### 仍待合并 PR

#### #2798 `fix: credential log redaction, preview-server symlink containment, and OpenClaw proxy auth`

- 状态：Open  
- 作者：carfeii  
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2798  
- 关联 Issue：
  - https://github.com/netease-youdao/LobsterAI/issues/2795
  - https://github.com/netease-youdao/LobsterAI/issues/2796
  - https://github.com/netease-youdao/LobsterAI/issues/2797

该 PR 一次性修复三个安全问题：

1. OAuth Token 被写入诊断日志；
2. HTML preview server 可通过符号链接访问许可目录外文件；
3. OpenClaw token proxy 接受未认证请求，并使用用户 Bearer Token 转发。

**项目推进意义：**

- 这是今日最关键的安全修复 PR。
- 覆盖凭据保护、本地预览沙箱边界、代理认证三类安全面。
- 建议维护者优先 Review 与合并，并在合并后考虑补充安全回归测试。

---

#### #2794 `fix(skills): stop trusting skill-controlled _meta.json for the delete path`

- 状态：Open  
- 作者：carfeii  
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2794  
- 关联 Issue：https://github.com/netease-youdao/LobsterAI/issues/2793

该 PR 修复技能卸载过程中的高危路径信任问题。当前 `skills:delete` 会读取已安装技能自身 `_meta.json` 中的 `openclawSourceDir` 字段，并递归删除该字段指定路径。由于 `_meta.json` 可由技能包控制，恶意技能可能诱导应用删除任意目录。

**项目推进意义：**

- 直接缓解恶意技能包造成的本地文件破坏风险。
- 强化技能卸载逻辑中的信任边界。
- 与技能生态安全密切相关，建议优先合并。

---

## 3. 社区热点

今日 Issues 和 PR 的评论数均较低，公开讨论热度不高，但从问题严重程度看，社区热点明显集中在 **安全漏洞披露与修复**。

### 热点 1：main 分支安全风险集中披露

- Issue #2795：OAuth access and refresh tokens are written to diagnostic logs  
  链接：https://github.com/netease-youdao/LobsterAI/issues/2795
- Issue #2796：HTML preview server follows symlinks outside its permitted directory  
  链接：https://github.com/netease-youdao/LobsterAI/issues/2796
- Issue #2797：OpenClaw token proxy accepts unauthenticated requests and forwards them with the user's bearer token  
  链接：https://github.com/netease-youdao/LobsterAI/issues/2797
- 修复 PR #2798：  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2798

**背后诉求：**

这些问题都不在最新 tagged release `v0.2.4` 中，而是出现在 `main` 分支的预发布代码里。这说明社区或安全研究者正在提前审计即将进入发布周期的新功能，尤其是 OpenClaw 集成、HTML 预览和 IPC 网络请求等敏感模块。

核心诉求包括：

- 防止 OAuth 凭据泄露；
- 限制本地服务的访问边界；
- 防止本地 loopback 代理被其他进程滥用；
- 在发布前完成安全收敛。

---

### 热点 2：技能系统的信任边界与安装一致性

- Issue #2793：Skill-controlled metadata lets an installed skill cause arbitrary directory deletion on uninstall  
  链接：https://github.com/netease-youdao/LobsterAI/issues/2793
- 修复 PR #2794：  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2794
- PR #2799：  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2799
- PR #2800：  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2800

**背后诉求：**

LobsterAI 的技能系统正在快速演进，但今日暴露出两个方向的问题：

1. 安全侧：不应信任技能包自带元数据决定删除路径；
2. 体验侧：技能 ID、frontmatter 解析与 OpenClaw 行为需要保持一致。

这表明技能生态可能是近期路线图重点，但在大规模开放给用户前，需要补齐安装、解析、更新、卸载全链路的可靠性和安全性。

---

## 4. Bug 与稳定性

以下按严重程度排序。

### 严重：OpenClaw token proxy 未认证请求转发用户 Bearer Token

- Issue：#2797  
- 状态：Open  
- 链接：https://github.com/netease-youdao/LobsterAI/issues/2797
- 修复 PR：#2798  
- PR 链接：https://github.com/netease-youdao/LobsterAI/pull/2798
- 影响版本：`main` 分支 commit `791a352dee3b3d8c6f64edcaf229ce474a68f6c5`
- 最新 release `v0.2.4`：不受影响

**问题概述：**

OpenClaw 相关 token proxy 接受未经认证的请求，并使用用户 Bearer Token 进行转发。若本地其他进程可访问该 loopback 服务，可能滥用用户凭据。

**风险判断：高。**

该问题涉及用户访问令牌和代理转发权限，应作为发布阻断项处理。

---

### 严重：OAuth access / refresh tokens 写入诊断日志

- Issue：#2795  
- 状态：Open  
- 链接：https://github.com/netease-youdao/LobsterAI/issues/2795
- 修复 PR：#2798  
- PR 链接：https://github.com/netease-youdao/LobsterAI/pull/2798
- 影响版本：`main` 分支 commit `791a352dee3b3d8c6f64edcaf229ce474a68f6c5`
- 最新 release `v0.2.4`：不受影响

**问题概述：**

通用 `api:fetch` IPC bridge 会把原始请求/响应内容写入日志，导致 OAuth access token 和 refresh token 可能进入诊断文件。

**风险判断：高。**

日志中的 refresh token 具备长期敏感性，一旦用户上传日志排查问题，可能造成二次泄露。PR #2798 已引入日志脱敏逻辑，建议优先合并并增加测试覆盖。

---

### 严重：技能卸载可被恶意 `_meta.json` 诱导删除任意目录

- Issue：#2793  
- 状态：Open  
- 链接：https://github.com/netease-youdao/LobsterAI/issues/2793
- 修复 PR：#2794  
- PR 链接：https://github.com/netease-youdao/LobsterAI/pull/2794
- 影响版本：`main` 分支 commit `791a352dee3b3d8c6f64edcaf229ce474a68f6c5`
- 最新 release `v0.2.4`：不受影响

**问题概述：**

`skills:delete` 信任已安装技能包中的 `_meta.json` 字段 `openclawSourceDir`，并递归删除该路径。由于技能包可控制该文件，恶意包可构造任意删除路径。

**风险判断：高。**

该问题影响本地文件完整性，与插件/技能生态安全高度相关。应尽快合并 #2794，并补充卸载路径必须位于受控安装目录下的校验。

---

### 中高：HTML preview server 可通过符号链接访问许可目录外文件

- Issue：#2796  
- 状态：Open  
- 链接：https://github.com/netease-youdao/LobsterAI/issues/2796
- 修复 PR：#2798  
- PR 链接：https://github.com/netease-youdao/LobsterAI/pull/2798
- 影响版本：`main` 分支 commit `791a352dee3b3d8c6f64edcaf229ce474a68f6c5`
- 最新 release `v0.2.4`：不受影响

**问题概述：**

HTML preview server 使用词法路径包含检查，但未正确处理符号链接解析后的真实路径。攻击者可通过 symlink 让服务器读取许可目录之外的文件。

**风险判断：中高。**

具体风险取决于 preview server 的可访问范围和调用场景，但路径穿越类问题通常应在发布前修复。

---

### 中：技能 ID 生成依赖临时解压目录

- PR：#2799  
- 状态：Closed  
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2799

**问题概述：**

技能安装时可能使用随机临时目录名作为 skill id，导致重复安装、Marketplace 更新检测失败、远程 zip/npm 包 ID 不稳定。

**风险判断：中。**

这更偏向稳定性和用户体验问题，不属于安全漏洞，但会影响技能生态的可维护性。

---

### 中：`SKILL.md` frontmatter 解析与 OpenClaw 不一致

- PR：#2800  
- 状态：Closed  
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2800

**问题概述：**

LobsterAI 与 OpenClaw 对 `SKILL.md` frontmatter 的容错行为不同，导致同一技能在运行时和 UI 列表中的表现可能不一致。

**风险判断：中。**

该问题会影响技能元数据展示和用户选择准确性，建议维护者明确解析规范，避免前端展示与运行时行为分裂。

---

## 5. 功能请求与路线图信号

今日没有明确的新功能请求，所有新增 Issue 均为安全或稳定性问题。不过，从 PR 和 Issue 内容可以观察到几个路线图信号。

### 信号 1：OpenClaw 集成正在成为核心演进方向

相关链接：

- https://github.com/netease-youdao/LobsterAI/issues/2797
- https://github.com/netease-youdao/LobsterAI/pull/2798
- https://github.com/netease-youdao/LobsterAI/pull/2800

OpenClaw 相关的代理、技能运行时解析、frontmatter 兼容性都在今日动态中出现。这说明 LobsterAI 正在加强与 OpenClaw runtime 的集成，但也需要统一两侧的安全模型和元数据解析规范。

**可能进入下一版本的内容：**

- OpenClaw token proxy 认证机制；
- LobsterAI 与 OpenClaw 的 `SKILL.md` 解析行为对齐；
- OpenClaw 相关日志脱敏与访问边界加固。

---

### 信号 2：技能系统即将进入更成熟的生命周期管理阶段

相关链接：

- https://github.com/netease-youdao/LobsterAI/issues/2793
- https://github.com/netease-youdao/LobsterAI/pull/2794
- https://github.com/netease-youdao/LobsterAI/pull/2799

技能安装、更新、卸载都出现了相关问题，说明项目正从“能安装技能”走向“可靠管理技能”的阶段。

**可能进入下一版本的内容：**

- 更安全的技能卸载路径校验；
- 稳定、可重复的 skill id 生成规则；
- Marketplace 与本地已安装技能的准确匹配；
- 技能包元数据的信任边界重构。

---

### 信号 3：发布前安全审计正在发生

今日所有新 Issue 都明确指出问题存在于 `main` 分支，而不影响最新 tagged release `v0.2.4`。这通常意味着：

- 新功能尚未进入正式发布；
- 社区或贡献者正在进行预发布安全审计；
- 维护团队有机会在 release 前完成修复，避免用户暴露在风险中。

---

## 6. 用户反馈摘要

今日 Issues 评论数均为 0，缺少来自多名用户的交叉讨论。因此以下反馈主要来自 Issue/PR 描述中反映出的使用场景和痛点。

### 痛点 1：用户不希望诊断日志泄露敏感凭据

相关链接：

- https://github.com/netease-youdao/LobsterAI/issues/2795
- https://github.com/netease-youdao/LobsterAI/pull/2798

用户在遇到问题时可能会上传日志给维护者排查。如果日志中包含 OAuth access token 或 refresh token，将显著增加账号与服务访问风险。

**用户诉求：**

- 日志默认安全；
- 敏感字段自动脱敏；
- 排查问题不应以牺牲凭据安全为代价。

---

### 痛点 2：本地预览和本地代理需要明确安全边界

相关链接：

- https://github.com/netease-youdao/LobsterAI/issues/2796
- https://github.com/netease-youdao/LobsterAI/issues/2797
- https://github.com/netease-youdao/LobsterAI/pull/2798

LobsterAI 涉及本地 HTTP 服务、preview server、loopback proxy 等能力。用户期望这些本地服务只服务于授权场景，而不会被其他本地进程或恶意内容滥用。

**用户诉求：**

- 本地服务必须鉴权；
- 文件访问必须被限制在许可目录内；
- 符号链接、路径规范化等边界情况应被正确处理。

---

### 痛点 3：技能系统需要既灵活又安全

相关链接：

- https://github.com/netease-youdao/LobsterAI/issues/2793
- https://github.com/netease-youdao/LobsterAI/pull/2794
- https://github.com/netease-youdao/LobsterAI/pull/2799
- https://github.com/netease-youdao/LobsterAI/pull/2800

技能系统是 AI 助手扩展能力的核心，但用户安装第三方技能时，需要相信应用不会因为恶意包或格式错误而破坏本地环境。

**用户诉求：**

- 安装和卸载技能必须安全；
- 重新导入同一技能不应产生重复项；
- Marketplace 更新检测应准确；
- 手写 `SKILL.md` 时应具备合理容错能力；
- UI 展示与运行时行为应一致。

---

## 7. 待处理积压

基于今日数据，没有发现“长期未响应”的 Issue 或 PR；所有列出的 Issue/PR 均创建或更新于 2026-10-05，仍属于新近事项。不过以下开放项优先级较高，应被维护者尽快处理。

### 高优先级待处理：合并 #2798 安全修复

- PR：#2798  
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2798
- 关联 Issue：
  - https://github.com/netease-youdao/LobsterAI/issues/2795
  - https://github.com/netease-youdao/LobsterAI/issues/2796
  - https://github.com/netease-youdao/LobsterAI/issues/2797

**建议：**

- 尽快完成 Review；
- 补充单元测试或集成测试；
- 验证日志脱敏覆盖 JSON、form-encoded、异常响应等场景；
- 验证 symlink containment 使用真实路径校验；
- 验证 OpenClaw proxy 的认证机制不会破坏正常调用链路。

---

### 高优先级待处理：合并 #2794 技能删除路径修复

- PR：#2794  
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2794
- 关联 Issue：https://github.com/netease-youdao/LobsterAI/issues/2793

**建议：**

- 禁止信任技能包内 `_meta.json` 决定删除路径；
- 删除路径应由应用自身安装索引或受控 registry 记录；
- 删除前强制校验路径位于技能安装根目录下；
- 增加恶意 `_meta.json` 回归测试。

---

### 需要确认状态：#2799 与 #2800 关闭原因

- PR #2799：  
  https://github.com/netease-youdao/LobsterAI/pull/2799
- PR #2800：  
  https://github.com/netease-youdao/LobsterAI/pull/2800

这两个 PR 均已关闭，但数据未明确显示是已合并、主动放弃，还是由其他 PR 替代。

**建议维护者确认：**

- 技能 ID 稳定性问题是否已经被其他提交修复；
- `SKILL.md` frontmatter 解析兼容问题是否仍存在；
- 若关闭原因是方案不合适，是否需要重新开 Issue 跟踪。

---

## 总体健康度评估

- **活跃度：高**。24 小时内有 4 个 Issue 和 4 个 PR 更新。
- **维护响应：较好**。多个安全 Issue 当日已有对应修复 PR。
- **风险水平：中高**。风险主要集中在 `main` 分支，尚未影响最新 release `v0.2.4`，但若近期计划发版，必须先完成安全修复。
- **路线图焦点：明确**。OpenClaw 集成、技能系统生命周期管理、本地服务安全边界是当前最重要方向。
- **建议发布状态：暂缓发布**。建议在 #2798 与 #2794 合并并完成回归验证后，再考虑进入下一版本发布流程。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报（2026-10-06）

## 1. 今日速览

过去 24 小时，Moltis 项目保持**中低强度但较聚焦的活跃度**：新增/更新 Issues 2 条，新增/更新 PR 2 条，暂无合并、关闭或新版本发布。  
今日动态主要集中在两个方向：**共享聊天中的身份归因与凭证隔离**，以及 **Skills YAML frontmatter 的可解析性与稳定性修复**。  
从数据看，社区讨论热度不高，所有新 Issue/PR 当前评论数均为 0、反应数为 0，但问题描述较完整，并且其中一个 Bug 已有对应修复 PR，说明维护流程响应较快。  
整体健康度方面，项目仍在持续修复真实使用场景中的边界问题，尤其是多用户聊天、Discord 适配和技能系统稳定性相关能力。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

今日暂无已合并或已关闭 PR，因此代码层面尚未形成正式落地变更。不过有 2 个待合并 PR 值得关注：

### PR #1295：修复 Discord 私聊被误判为共享聊天  
- 链接：[moltis-org/moltis PR #1295](https://github.com/moltis-org/moltis/pull/1295)  
- 状态：OPEN  
- 作者：tomachianura  
- 关联方向：Discord 适配、聊天分类、权限/上下文隔离  

该 PR 旨在修复 Discord 聊天分类问题：目前 Discord 聊天会被统一分类为 shared chat，导致即使是操作者与 Bot 的 1:1 私聊，也可能按照共享会话逻辑运行。  
这类问题会影响会话边界、身份判断，以及潜在的凭证使用逻辑。若合并，将提升 Discord 场景下的对话上下文准确性。

### PR #1293：修复 Skills frontmatter 未加引号导致无法解析的问题  
- 链接：[moltis-org/moltis PR #1293](https://github.com/moltis-org/moltis/pull/1293)  
- 状态：OPEN  
- 作者：tomachianura  
- 关联 Issue：[Issue #1292](https://github.com/moltis-org/moltis/issues/1292)  
- 关联方向：Skills 系统、YAML 序列化、稳定性  

该 PR 修复 `create_skill` 与 `update_skill` 写入 `SKILL.md` frontmatter 时未正确引用 YAML 标量的问题。  
此前普通描述文本或工具名中若包含 `: `、`#`、`&`、`!`、`-`、`[`、`{` 等 YAML 特殊语法字符，可能导致 skill discovery 无法解析或误读。  
该修复对 Skills 功能的可靠性有直接价值，属于稳定性改进。

---

## 4. 社区热点

今日所有新增 Issue 和 PR 的评论数、反应数均较低，尚未形成明显讨论热点。不过从问题内容看，有两个主题具备较高产品重要性。

### 热点 1：共享聊天中的 per-sender MCP credentials  
- Issue：[Issue #1294 - per-sender MCP credentials in shared chats](https://github.com/moltis-org/moltis/issues/1294)  
- 状态：OPEN  
- 评论数：0  
- 反应数：0  
- 类型：Feature Request  

该需求提出，在 Telegram/Discord 群组、Slack channel 等共享聊天中，MCP server 不应只接收单一静态 credential，而应能根据消息发送者使用对应身份凭证。  
背后诉求是：在多人共享会话中，Bot 执行动作时应能准确归因到实际发送者，避免所有操作都绑定到同一个 session 或同一 header credential。  
这反映出 Moltis 在从“单用户 Agent”向“多用户协作 Agent / 群聊 Agent”演进时，需要更精细的身份、权限和审计模型。

### 热点 2：Skill 创建成功但后续发现阶段无法解析  
- Issue：[Issue #1292 - create_skill writes unquoted YAML frontmatter](https://github.com/moltis-org/moltis/issues/1292)  
- 状态：OPEN  
- 评论数：0  
- 反应数：0  
- 类型：Bug  
- 对应修复 PR：[PR #1293](https://github.com/moltis-org/moltis/pull/1293)  

该问题指出 `create_skill` 返回 `{"created": true}`，但生成的 `SKILL.md` 由于 frontmatter 不符合 YAML 解析规则，导致 skill discovery 阶段失败。  
用户痛点集中在“创建成功”的反馈与实际可用性之间不一致，这会降低用户对 Skills 系统的信任。  
该问题已有修复 PR，说明维护响应较及时。

---

## 5. Bug 与稳定性

### 严重程度：中高  
#### Issue #1292：`create_skill` 写入未加引号的 YAML frontmatter，导致创建成功但发现阶段无法解析  
- 链接：[Issue #1292](https://github.com/moltis-org/moltis/issues/1292)  
- 状态：OPEN  
- 作者：tomachianura  
- 创建时间：2026-10-05  
- 当前评论数：0  
- 是否已有修复 PR：有，[PR #1293](https://github.com/moltis-org/moltis/pull/1293)  

**问题描述：**  
`create_skill` 在写入 `SKILL.md` 的 YAML frontmatter 时，没有对字符串进行安全引用。若 skill 描述或 allowed tools 中包含 YAML 特殊字符，可能生成 skill discovery 无法解析的文件。

**影响范围：**  
- Skills 创建与更新流程  
- skill discovery 解析流程  
- 用户对“创建成功”状态的信任  
- 包含特殊字符的描述、工具名或配置字段  

**稳定性风险：**  
该问题不会直接导致系统崩溃，但会造成“写入成功、读取失败”的状态不一致，属于中高优先级的稳定性问题。  
由于已有对应 PR，预计较容易进入后续修复版本。

---

### 严重程度：中  
#### PR #1295：Discord 私聊被分类为共享聊天  
- 链接：[PR #1295](https://github.com/moltis-org/moltis/pull/1295)  
- 状态：OPEN  
- 作者：tomachianura  

**问题描述：**  
当前 Discord channel id 本身无法编码会话类型，而 adapter 未传递必要信息，导致所有 Discord 聊天都被 `ChannelType::Discord => true` 逻辑判定为 shared chat。  
这会使 1:1 DM 也按照共享会话处理。

**影响范围：**  
- Discord 私聊体验  
- 会话分类  
- 共享/直接聊天上下文隔离  
- 后续身份与凭证策略判断  

**稳定性风险：**  
此问题更偏行为逻辑错误，不一定导致系统故障，但可能引发上下文隔离错误，是 Agent/助手系统中较敏感的问题。

---

## 6. 功能请求与路线图信号

### Issue #1294：共享聊天中支持 per-sender MCP credentials  
- 链接：[Issue #1294](https://github.com/moltis-org/moltis/issues/1294)  
- 状态：OPEN  
- 类型：Feature Request  
- 作者：tomachianura  

**需求内容：**  
在群聊或共享频道中，每条消息应根据实际发送者使用对应 MCP credentials，而不是所有消息共用 session 的静态凭证。

**路线图信号：**  
该需求表明用户正在将 Moltis 用于更复杂的多人协作环境，例如：  
- Telegram 群组  
- Discord group/channel  
- Slack channel  
- 多成员共享一个 Bot 的工作流  

这对项目路线图释放了几个明确信号：

1. **身份模型需要从 session-level 扩展到 sender-level**  
   当前 session 级别的 credential 可能不足以支持多人协作场景。

2. **MCP 调用需要更细粒度的授权上下文**  
   MCP server 侧可能需要知道真实调用者，而不是仅知道 Bot 或会话。

3. **审计与归因能力会变得更重要**  
   在群聊中执行外部工具调用、数据访问或系统操作时，必须能追踪“谁触发了动作”。

4. **与 PR #1295 存在方向关联**  
   PR #1295 修复 Discord 私聊/共享聊天分类问题，虽然不是直接实现 per-sender credentials，但它属于同一类基础设施改进：正确识别聊天上下文，才能进一步实现正确的身份与凭证策略。

**是否可能进入下一版本：**  
目前没有对应实现 PR，因此短期进入下一版本的确定性不高。  
但考虑到其与 Discord 分类修复、共享聊天上下文处理高度相关，若维护者正在梳理多用户聊天模型，该需求可能成为后续设计输入。

---

## 7. 用户反馈摘要

由于今日新增 Issue/PR 均无评论，无法从讨论串中提炼多方反馈。但从 Issue 描述本身可以归纳出以下真实用户痛点：

### 1. 多人共享聊天中的身份归因不准确  
对应：[Issue #1294](https://github.com/moltis-org/moltis/issues/1294)

用户希望在群聊中，Bot 不只是以统一 session 身份执行任务，而是能区分每个消息发送者。  
这类反馈说明 Moltis 的使用场景正在从个人助手扩展到团队助手、群组 Agent 或组织内部自动化助手。

### 2. “创建成功”与“实际可用”之间存在落差  
对应：[Issue #1292](https://github.com/moltis-org/moltis/issues/1292)

`create_skill` 返回成功，但后续 skill discovery 无法解析，用户会感知为系统状态不一致。  
这类问题对开发者体验影响较大，因为用户通常会信任成功返回值，而不是预期后续解析阶段失败。

### 3. Discord 场景下私聊与群聊边界不清  
对应：[PR #1295](https://github.com/moltis-org/moltis/pull/1295)

虽然该条是 PR，不是 Issue，但它反映出 Discord adapter 在会话类型识别上的不足。  
对用户而言，私聊应具备不同于共享频道的权限、上下文和行为预期。

---

## 8. 待处理积压

当前提供的数据仅覆盖过去 24 小时，未包含长期未响应 Issue 或 PR 的历史列表，因此无法准确识别长期积压项。

不过基于今日数据，以下开放项值得维护者优先关注：

### 待处理 PR

1. [PR #1293 - fix(skills): quote SKILL.md frontmatter and refuse unparseable skills](https://github.com/moltis-org/moltis/pull/1293)  
   - 建议优先级：高  
   - 原因：已有明确 Bug 报告对应，影响 Skills 创建/发现链路的稳定性。  
   - 建议动作：尽快 Review、运行测试并合并。

2. [PR #1295 - fix(discord): classify direct messages as direct chats](https://github.com/moltis-org/moltis/pull/1295)  
   - 建议优先级：中高  
   - 原因：影响 Discord 私聊与共享聊天边界，可能关联权限、身份和上下文隔离问题。  
   - 建议动作：重点验证 Discord adapter 是否正确传递 conversation kind，并补充回归测试。

### 待处理 Issue

1. [Issue #1292 - create_skill writes unquoted YAML frontmatter](https://github.com/moltis-org/moltis/issues/1292)  
   - 建议优先级：高  
   - 当前已有修复 PR：[PR #1293](https://github.com/moltis-org/moltis/pull/1293)  
   - 建议动作：PR 合并后关闭 Issue，并在 changelog 或 release note 中注明 Skills YAML 序列化修复。

2. [Issue #1294 - per-sender MCP credentials in shared chats](https://github.com/moltis-org/moltis/issues/1294)  
   - 建议优先级：中  
   - 当前暂无实现 PR  
   - 建议动作：维护者可先明确设计方向，例如 sender-level credential resolution、MCP header 注入策略、群聊身份映射与审计模型。

---

## 总体健康度评估

Moltis 今日无发布、无合并，但新增问题与 PR 聚焦在项目较关键的基础能力上：**技能系统可靠性、聊天上下文分类、多用户身份归因**。  
从维护效率看，Issue #1292 已快速出现对应修复 PR #1293，是积极信号。  
从社区热度看，今日互动较少，尚未形成高讨论度议题。  
从产品演进看，per-sender MCP credentials 需求显示 Moltis 正面临更复杂的多人协作 Agent 场景，后续可能需要系统性强化身份、权限、会话隔离与审计能力。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报  
日期：2026-10-06  
仓库：`agentscope-ai/CoPaw`  
数据窗口：过去 24 小时

> 注：本日报基于用户提供的 GitHub 摘要数据生成。数据中 PR 链接标注为 `agentscope-ai/QwenPaw PR #8113`，与目标仓库 `agentscope-ai/CoPaw` 存在命名不一致；下文按提供信息引用该 PR。

---

## 1. 今日速览

过去 24 小时内，CoPaw 项目整体活跃度偏低：没有新的 Issue、没有活跃 Issue 更新，也没有新版本发布。  
唯一的代码层面动态来自 1 个已关闭的超大规模 PR：[#8113](https://github.com/agentscope-ai/QwenPaw/pull/8113)，聚焦于将钉钉渠道能力拆分为独立插件，并保持向后兼容。  
从变更方向看，项目仍在推进“插件化渠道架构”和“兼容性迁移”相关工作，这有助于降低核心应用与第三方 SDK 的耦合。  
社区讨论层面今日较为安静，没有可见的用户反馈、Bug 报告或功能请求新增。

---

## 3. 项目进展

### 已关闭 PR

#### [#8113 feat(channels): pilot backward-compatible DingTalk plugin](https://github.com/agentscope-ai/QwenPaw/pull/8113)  
- 状态：已关闭  
- 作者：`lalaliat`  
- 规模：`size/XL`  
- 创建时间：2026-10-05  
- 更新时间：2026-10-05  
- 评论数：未提供  
- 反应数：👍 0  

该 PR 的核心目标是将钉钉渠道收发能力迁移为独立的 `dingtalk` channel 插件，并通过现有 `PluginLoader` 机制加载。虽然该 PR 当前状态为关闭，而非明确“已合并”，但从摘要看，它代表了一次较大的架构性尝试。

主要推进点包括：

- 将钉钉渠道从主应用中拆分为独立插件。
- 保持原有钉钉配置、启用状态、凭据、会话文件兼容。
- 对已启用钉钉的工作区，在升级后进行离线补装插件，避免用户重新配置。
- 保留原扫码与卡片配置表单，降低迁移成本。
- 不覆盖已有插件；用户主动卸载后，重启时不会自动恢复安装。
- 增加渠道惰性加载入口，应用启动和渠道列表不再加载未启用的钉钉 SDK。
- 插件不可用时保留配置、展示提示，并阻止用户误开启。
- 对当前进程中使用过的 channel 插件，在更新或卸载前进行约束，降低运行时风险。

### 进展评估

该 PR 虽然未显示为合并，但体现出项目在以下方向上的推进：

1. **插件化架构增强**  
   将具体渠道能力独立为插件，有助于后续接入更多 IM、办公协作或企业通讯平台。

2. **启动性能与依赖隔离优化**  
   未启用钉钉时不加载钉钉 SDK，可以减少冷启动成本，并降低不必要的依赖冲突风险。

3. **兼容性优先的迁移策略**  
   对已有钉钉用户保留配置和会话文件，说明项目维护者重视平滑升级和真实用户场景。

4. **插件生命周期管理完善**  
   对已使用插件的更新、卸载进行限制，表明项目正在补齐插件运行时安全边界。

---

## 4. 社区热点

今日无明显社区热点。

过去 24 小时内没有新增或活跃 Issue，也没有出现高评论、高反应的 PR。唯一更新的 PR [#8113](https://github.com/agentscope-ai/QwenPaw/pull/8113) 反应数为 0，评论数未提供，无法判断是否形成社区讨论。

从变更内容推测，潜在关注点可能包括：

- 钉钉插件拆分后，老用户升级是否完全无感。
- 插件离线补装机制是否稳定。
- 未启用钉钉时是否能明显改善启动速度或减少依赖问题。
- 用户主动卸载插件后，系统不自动恢复是否符合预期。
- 钉钉真实账号试用中是否会暴露认证、扫码、卡片消息或会话迁移问题。

---

## 5. Bug 与稳定性

今日没有新的 Bug 报告、崩溃问题或回归问题。

### 稳定性相关观察

虽然没有新的 Bug Issue，但 PR [#8113](https://github.com/agentscope-ai/QwenPaw/pull/8113) 本身涉及较高风险的架构迁移，建议重点关注以下稳定性风险：

| 风险点 | 严重程度 | 说明 | 是否已有 fix PR |
|---|---:|---|---|
| 钉钉插件迁移失败 | 高 | 已启用钉钉的工作区需要自动离线补装插件，若失败可能导致渠道不可用 | 未见单独 fix PR |
| 旧配置兼容问题 | 高 | PR 声称继续使用原 `dingtalk` 配置、凭据与会话文件，需验证不同历史版本配置 | 未见单独 fix PR |
| 插件不可用状态处理 | 中 | 插件不可用时需保留配置、提示用户并阻止误开启，涉及 UI 与运行时状态一致性 | 未见单独 fix PR |
| 惰性加载边界问题 | 中 | 未启用时不加载 SDK，但启用后需确保加载顺序、错误提示和回退路径正确 | 未见单独 fix PR |
| 插件卸载/更新时机 | 中 | 当前进程使用过的插件在更新/卸载前需要保护，避免运行时异常 | 未见单独 fix PR |

---

## 6. 功能请求与路线图信号

今日没有新增功能请求类 Issue。

不过，从 [#8113](https://github.com/agentscope-ai/QwenPaw/pull/8113) 可以看出几个明确的路线图信号：

1. **渠道插件化将继续推进**  
   钉钉被拆分为独立 channel 插件，说明项目可能正在将其他渠道能力也从核心应用中解耦。

2. **企业协作平台集成仍是重点方向**  
   钉钉作为企业通讯与协作平台，适合 AI 助手在办公场景中落地。该方向可能会继续扩展到企业微信、飞书、Slack、Discord 等渠道。

3. **兼容性迁移将优先于破坏性重构**  
   PR 强调不要求用户重新配置、不覆盖已有插件、保留凭据和会话文件，说明维护者当前倾向于渐进式迁移。

4. **插件生命周期管理可能成为后续重点**  
   包括插件安装、卸载、更新、不可用提示、运行中保护等机制，可能会被继续抽象和完善。

可能进入下一版本的能力包括：

- `dingtalk` channel 插件的正式发布或试验性发布。
- 渠道惰性加载机制。
- 插件不可用时的 UI 提示和配置保留机制。
- 插件更新/卸载保护机制。
- 钉钉旧配置到插件体系的自动迁移逻辑。

---

## 7. 用户反馈摘要

今日没有来自 Issues 评论的用户反馈数据。

基于现有 PR 摘要，能间接反映出的用户痛点包括：

- **老用户不希望重新配置钉钉账号和凭据**  
  PR 明确保留原有 `dingtalk` 配置、启用状态、凭据与会话文件。

- **用户希望升级后渠道能力不中断**  
  对已启用钉钉的工作区执行离线补装，说明维护者意识到升级过程中的可用性风险。

- **用户可能不希望未使用的渠道拖慢应用或引入依赖问题**  
  惰性加载钉钉 SDK 可以减少未启用用户的负担。

- **用户需要明确的插件不可用提示，而不是静默失败**  
  PR 中提到插件不可用时保留配置、显示提示并阻止误开启，反映出项目在提升故障可解释性。

---

## 8. 待处理积压

今日数据中没有长期未响应的 Issue 或 PR 信息，因此无法识别明确的积压项。

建议维护者后续关注以下潜在积压方向：

1. **确认 [#8113](https://github.com/agentscope-ai/QwenPaw/pull/8113) 的关闭原因**  
   该 PR 规模较大且涉及重要架构改造。若为关闭未合并，需要确认是否有替代 PR、拆分计划或设计调整。

2. **补充钉钉插件迁移测试矩阵**  
   建议覆盖：
   - 老版本已启用钉钉工作区升级；
   - 已配置但未启用钉钉的工作区；
   - 用户主动卸载插件后的重启行为；
   - 插件缺失、损坏、版本不兼容；
   - 多工作区、多会话文件场景。

3. **公开插件化渠道路线图**  
   如果钉钉插件化是更大规模渠道重构的第一步，建议维护者通过 Issue、Discussion 或 Roadmap 文档说明后续计划。

---

## 项目健康度小结

今日 CoPaw 项目社区侧活跃度较低，但工程侧仍有重要架构信号。钉钉渠道插件化代表项目正在向更模块化、更可扩展的方向演进，同时强调兼容升级，说明维护者对已有用户迁移体验较为谨慎。短期需要重点关注该 PR 关闭后的后续处理，以及真实钉钉账号试用中是否暴露兼容性和稳定性问题。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报（2026-10-06）

## 1. 今日速览

过去 24 小时 ZeroClaw 活跃度较高：新增/活跃 Issues 15 条、PR 12 条，说明项目在插件权限、安全沙箱、通道附件、SOP 工作流与 Agent Workspace 等方向都有集中推进。今日没有新版本发布，也没有 PR 合并或 Issue 关闭，整体处于“高开发活跃、待评审堆积上升”的状态。  
从内容看，稳定性与安全相关问题占比较高，尤其集中在 Linux 沙箱后端、插件更新权限、Anthropic Provider 配置与流式超时等方面。功能路线图方面，SOP 可视化编排、Agent Colony/Workspace、Signal 媒体附件支持是今天最明显的产品演进信号。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

今日无已合并或已关闭 PR，因此没有进入主干的正式变更。不过，多个重要 PR 已打开，显示出下一阶段的开发重点。

### 重要待合并 PR

- [PR #11560 feat(colony): add agent workspace](https://github.com/zeroclaw-labs/zeroclaw/pull/11560)  
  大型功能 PR，标签包含 `risk:high`、`size:XL`、`do-not-merge`。该 PR 引入 Colony / Agent Workspace 概念，支持 Queen-led 团队、可复用蓝图、Agent 选择、周期性 Prompt、Rooms 与显式 Channel 连接。  
  **意义**：这是面向“多智能体团队工作空间”的核心产品能力，可能显著改变 ZeroClaw 的 Agent 编排体验，但目前仍处于高风险、不可合并状态。

- [PR #11556 feat(channels/signal): add media attachment support](https://github.com/zeroclaw-labs/zeroclaw/pull/11556)  
  为 Signal Channel 增加媒体附件支持，包括从 `signal-cli` 获取附件、保存到 Agent workspace，并渲染为 `[IMAGE|AUDIO|VIDEO|DOCUMENT:<path>]` 标记。  
  **意义**：推进 ZeroClaw 多模态输入能力，但与今日报告的图片历史重复发送问题存在潜在关联，需要谨慎评审。

- [PR #11558 feat(channels): make in-flight concurrency bounds configurable](https://github.com/zeroclaw-labs/zeroclaw/pull/11558)  
  将 Channel Dispatcher 的全局并发窗口从硬编码改为可配置。  
  **意义**：改善资源受限机器、顺序处理场景下的可控性，有助于提高运维可预测性。

- [PR #11559 fix(security): name the cause when a requested bubblewrap backend is rejected](https://github.com/zeroclaw-labs/zeroclaw/pull/11559)  
  当显式请求 bubblewrap 但无法启用时，在 fallback WARN 中说明原因。  
  **意义**：直接回应今日 Linux sandbox 可观测性不足的问题，属于安全与诊断体验改进。

- [PR #11557 fix(cost): report rejected ledger records in cost summaries](https://github.com/zeroclaw-labs/zeroclaw/pull/11557)  
  在成本汇总中报告无法解析的 ledger 记录，提升费用统计完整性。  
  **意义**：增强成本审计和异常追踪能力。

---

## 4. 社区热点

今日 Issues 的评论数整体较少，最多为 1 条评论；PR 评论数据未提供。因此热点主要根据问题严重度、功能影响面和标签判断。

### 1. 图片路径标记被重复发送，导致模型误认为有“新图片”

- [Issue #11554 [Bug]: Earlier path-marker images are re-sent on every later turn](https://github.com/zeroclaw-labs/zeroclaw/issues/11554)  
  评论数：1  
  影响组件：Provider  
  严重度：S2 - degraded behavior  

**核心诉求**：Signal、Telegram、Discord 等通道会将入站图片保存并渲染为 `[IMAGE:<path>]` 标记，但这些标记保留在 session history 中，导致后续对话轮次反复向模型呈现旧图片。用户观察到模型会描述“新图片”，实际却是历史图片。  
**背后信号**：多模态上下文管理正在成为 ZeroClaw 的关键稳定性问题，尤其在 Channel 附件能力增强后，需要明确“图片引用是否应跨轮保留”的生命周期规则。

### 2. 分裂入站消息需要可靠合并

- [Issue #11553 [Feature]: Merge split inbound messages reliably](https://github.com/zeroclaw-labs/zeroclaw/issues/11553)  
  评论数：1  

**核心诉求**：某些 Channel 会将一次用户操作拆成多条入站消息，例如 Signal 转发文件和附加评论分成两条。当前全局 debounce 默认关闭、只按到达时间合并、且仅保留第一条消息附件，导致用户意图与附件可能被拆散。  
**背后信号**：ZeroClaw 的 Channel 层需要从“消息级处理”升级到“用户动作级 batch 处理”，尤其是在多模态附件场景下。

### 3. Linux 沙箱后端问题集中爆发

- [Issue #11540 bubblewrap sandbox isn't detected on linux](https://github.com/zeroclaw-labs/zeroclaw/issues/11540)  
- [Issue #11539 Firejail sandbox fails with invalid --nowheel option](https://github.com/zeroclaw-labs/zeroclaw/issues/11539)  
- [Issue #11538 Firejail sandbox fails with invalid private directory](https://github.com/zeroclaw-labs/zeroclaw/issues/11538)  

**核心诉求**：用户在 Linux 上启用 bubblewrap 或 firejail 时遭遇检测失败、参数不兼容和日志不可读问题。  
**背后信号**：安全沙箱是 ZeroClaw 运行 Shell 工具和本地自动化能力的基础设施，当前跨发行版兼容性和错误解释仍不足。

---

## 5. Bug 与稳定性

以下按严重程度与安全影响排序。

### S0 / 安全风险

#### 1. bubblewrap 检测失败并回退到 application-layer

- [Issue #11540 [Bug]: bubblewrap sandbox isn't detected on linux](https://github.com/zeroclaw-labs/zeroclaw/issues/11540)  
  组件：runtime/daemon  
  严重度：S0 - data loss / security risk  
  状态：Open  
  相关 PR：  
  - [PR #11559 fix(security): name the cause when a requested bubblewrap backend is rejected](https://github.com/zeroclaw-labs/zeroclaw/pull/11559)

**问题**：用户配置 balanced 风险档案使用 bubblewrap，但检测失败并回退到 application-layer；用户手动执行 `bwrap` 命令可正常运行。  
**影响**：用户可能误以为已启用强沙箱，实际保护级别降低。  
**当前修复方向**：PR #11559 主要改善失败原因的日志说明，但未必完全修复检测逻辑本身。

---

### S1 / 工作流阻塞

#### 2. Firejail `--nowheel` 参数无效

- [Issue #11539 [Bug]: Firejail sandbox fails with invalid --nowheel](https://github.com/zeroclaw-labs/zeroclaw/issues/11539)  
  组件：runtime/daemon  
  严重度：S1 - workflow blocked  
  状态：Open  
  相关 PR：未发现直接修复 PR

**问题**：Linux 上使用 firejail sandbox 时，Shell tool call 因 `invalid --nowheel command line option` 失败。  
**影响**：启用 firejail 的用户无法正常执行 Shell 工具。  
**建议关注**：需要根据 Firejail 版本差异调整参数探测或降级策略。

#### 3. Firejail private directory 无效

- [Issue #11538 [Bug]: Firejail sandbox fails with invalid private directory](https://github.com/zeroclaw-labs/zeroclaw/issues/11538)  
  组件：runtime/daemon  
  严重度：S1 - workflow blocked  
  状态：Open  
  相关 PR：未发现直接修复 PR

**问题**：使用 firejail 时 Shell tool call 报 `invalid private directory`，日志缺少足够信息。  
**影响**：同样阻塞 Shell 工具执行，并且排障体验较差。  
**建议关注**：与 #11539 可合并分析，形成 firejail 兼容性修复批次。

---

### S2 / 行为退化、权限一致性风险

#### 4. 插件更新时 discovery 可能将不同 generation 的 manifest 与 component 配对

- [Issue #11562 [Bug]: discovery can pair one generation's manifest with another's component](https://github.com/zeroclaw-labs/zeroclaw/issues/11562)  
  组件：plugins  
  严重度：S2 - degraded behavior  
  状态：Open  
  相关 PR：未发现直接修复 PR

**问题**：插件更新过程中，discovery 先按路径读取 `manifest.toml`，之后再读取 component，可能在更新窗口内混用不同 generation。  
**影响**：在 `permissive` 或 `disabled` signature mode 下，插件可能短暂以旧/新 manifest 错配方式运行。  
**安全意义**：这是插件权限与供应链一致性问题，建议优先处理。

#### 5. 图片路径标记跨轮重复发送

- [Issue #11554 [Bug]: Earlier path-marker images are re-sent on every later turn](https://github.com/zeroclaw-labs/zeroclaw/issues/11554)  
  组件：provider  
  严重度：S2  
  状态：Open  
  相关 PR：可能与 [PR #11556 Signal media attachment support](https://github.com/zeroclaw-labs/zeroclaw/pull/11556) 相关，但暂无明确 fix PR

**问题**：历史图片 marker 留在上下文中，被后续请求重复发送。  
**影响**：模型产生幻觉式描述，降低多模态对话可信度。

#### 6. Tool egress 授权流程忽略 websocket_client 和 socket_client 声明

- [Issue #11552 [Bug]: tool egress ceremony ignores websocket_client and socket_client declarations](https://github.com/zeroclaw-labs/zeroclaw/issues/11552)  
  标签：bug, cli, topic:plugins  
  状态：Open  
  相关 PR：未发现直接修复 PR

**问题**：安装时授权 ceremony 与 `plugin list` gap diagnostic 只统计 `http_client` 类型的 `[egress]` 声明，忽略 `websocket_client` 和 `socket_client`。  
**影响**：插件权限诊断不完整，可能导致操作者对插件外联能力认知不足。

#### 7. Anthropic Provider 未发送 configured extra_headers

- [PR #11541 fix(providers): send configured extra_headers on Anthropic requests](https://github.com/zeroclaw-labs/zeroclaw/pull/11541)  
  标签：bug, provider:anthropic, domain:security, risk:high, needs-author-action  
  状态：Open

**问题**：配置 schema 接受 `extra_headers`，但 Anthropic provider 实际没有转发。  
**影响**：可能影响网关认证、企业代理、审计 Header 或安全策略。  
**当前状态**：已有修复 PR，但需要作者进一步处理。

#### 8. Anthropic Streaming 使用硬编码 90 秒 idle timeout

- [PR #11544 fix(providers): use the shared stream idle bound for Anthropic](https://github.com/zeroclaw-labs/zeroclaw/pull/11544)  
  标签：bug, provider:anthropic, needs-author-action  
  状态：Open

**问题**：Anthropic streaming client 使用硬编码 90 秒 byte-idle timeout，而其他 provider 已使用共享的 300 秒 floor。  
**影响**：长响应场景下 Anthropic 更容易异常中断。  
**当前状态**：已有修复 PR，待作者处理。

#### 9. Shell 子进程仍可能继承 controlling terminal

- [PR #11543 fix(tools): detach shell children from the controlling terminal](https://github.com/zeroclaw-labs/zeroclaw/pull/11543)  
  标签：bug, runtime, tool:shell, risk:high, needs-author-action  
  状态：Open

**问题**：Unix Shell 工具子进程仅设置新 process group 不够，仍可能继承 daemon 的 controlling terminal。  
**影响**：交互式后代进程可能接管终端，属于高风险运行时隔离问题。  
**当前状态**：已有修复 PR，待作者处理。

---

## 6. 功能请求与路线图信号

### 1. Agent Workspace / Colony：多智能体团队编排

- [PR #11560 feat(colony): add agent workspace](https://github.com/zeroclaw-labs/zeroclaw/pull/11560)

这是今日最重要的产品路线图信号。该 PR 引入 Queen-led teams、可复用蓝图、Agent selection、recurring prompts、rooms 和 channel connections。  
**纳入下一版本可能性**：中等偏低。虽然功能完整度高，但带有 `do-not-merge`、`risk:high`、`size:XL` 标签，短期更可能进入长期评审或拆分阶段。

### 2. Signal 媒体附件支持

- [PR #11556 feat(channels/signal): add media attachment support](https://github.com/zeroclaw-labs/zeroclaw/pull/11556)

该 PR 明确扩展 Signal Channel 的多媒体能力。  
**纳入下一版本可能性**：中等。功能已形成 PR，但需要解决与图片 marker 生命周期、附件 batch 合并相关的问题。

### 3. 分裂入站消息合并机制

- [Issue #11553 Merge split inbound messages reliably](https://github.com/zeroclaw-labs/zeroclaw/issues/11553)

该需求指向 per-channel debounce、附件保留 batch，以及更符合用户动作语义的消息聚合。  
**纳入下一版本可能性**：中等。它与 Signal 附件支持高度相关，若 PR #11556 要稳定落地，该能力可能成为必要配套。

### 4. SOP 工作流体系持续扩展

今日多个 SOP 相关 Issue 形成一组清晰路线图：

- [Issue #11547 Bind SOP runs to immutable workflow-definition revisions](https://github.com/zeroclaw-labs/zeroclaw/issues/11547)  
  将 SOP run 绑定到不可变 workflow definition revision，避免编辑器保存影响正在运行的流程。

- [Issue #11551 Define composable child-SOP nodes for visual authoring](https://github.com/zeroclaw-labs/zeroclaw/issues/11551)  
  支持可组合的子 SOP 节点，面向可视化编排。

- [Issue #11550 Persist named SOP library groups across clients](https://github.com/zeroclaw-labs/zeroclaw/issues/11550)  
  持久化 SOP 分组，支持跨客户端组织。

- [Issue #11549 Expose reviewable SOP gate payloads and supported decision actions](https://github.com/zeroclaw-labs/zeroclaw/issues/11549)  
  暴露 SOP gate 的可审查 payload 和决策动作，支持 preview、revise、approve、reject。

- [Issue #11548 Add explicit SOP helper authority and opt-in live adaptation](https://github.com/zeroclaw-labs/zeroclaw/issues/11548)  
  将“提出/保存 SOP 编辑”和“适配运行中流程”的权限分离。

- [Issue #11546 Bind each SOP to a persistent managing-agent conversation](https://github.com/zeroclaw-labs/zeroclaw/issues/11546)  
  为每个 SOP 绑定持久 managing-agent conversation，用于接收和组织 run outputs。

**路线图判断**：SOP 正在从“执行 API”演进为“可视化、可审查、可组合、权限明确”的工作流系统。这些 Issue 多带有 `status:icebox`，说明更像中长期设计储备，而非即将合并的短期功能。

### 5. 插件权限与更新安全

- [Issue #11561 check an update's added authority inside the plugin host](https://github.com/zeroclaw-labs/zeroclaw/issues/11561)  
- [Issue #11562 discovery can pair one generation's manifest with another's component](https://github.com/zeroclaw-labs/zeroclaw/issues/11562)  
- [Issue #11552 tool egress ceremony ignores websocket_client and socket_client declarations](https://github.com/zeroclaw-labs/zeroclaw/issues/11552)

**路线图判断**：插件系统正在加强“更新时权限差异审查”“manifest/component 原子一致性”“非 HTTP 外联权限可见性”等安全边界。考虑到这些问题涉及运行时信任模型，优先级应高于一般 UX 功能。

---

## 7. 用户反馈摘要

### 多模态用户反馈：历史图片被误判为新图片

相关链接：  
- [Issue #11554](https://github.com/zeroclaw-labs/zeroclaw/issues/11554)  
- [PR #11556](https://github.com/zeroclaw-labs/zeroclaw/pull/11556)

用户痛点是：发送图片后，后续文本对话仍会触发模型重新处理旧图片，模型因此描述并不存在的新图片。这表明用户期待附件具有明确生命周期，例如“仅当前轮有效”“可引用但不自动重发”“历史中只保留文本摘要”等。

### Channel 用户反馈：一次真实操作被拆成多条消息

相关链接：  
- [Issue #11553](https://github.com/zeroclaw-labs/zeroclaw/issues/11553)

用户场景是 Signal 转发文件并附带评论，但系统收到两条消息。当前合并机制不稳定，且可能丢失附件。用户期待 ZeroClaw 理解的是“用户动作”，而不只是底层 Channel 的消息事件。

### Linux 运维用户反馈：沙箱配置不可预测、日志不透明

相关链接：  
- [Issue #11540](https://github.com/zeroclaw-labs/zeroclaw/issues/11540)  
- [Issue #11539](https://github.com/zeroclaw-labs/zeroclaw/issues/11539)  
- [Issue #11538](https://github.com/zeroclaw-labs/zeroclaw/issues/11538)  
- [PR #11559](https://github.com/zeroclaw-labs/zeroclaw/pull/11559)

用户不满点集中在两方面：  
1. 明确配置了 bubblewrap/firejail，但系统实际 fallback 或执行失败；  
2. 日志没有说明失败原因，导致排障困难。  

这类反馈对安全型本地 Agent 系统尤其关键，因为用户不仅需要功能可用，还需要确认安全边界确实生效。

### 企业/Provider 集成反馈：配置项存在但未实际生效

相关链接：  
- [PR #11541](https://github.com/zeroclaw-labs/zeroclaw/pull/11541)  
- [PR #11544](https://github.com/zeroclaw-labs/zeroclaw/pull/11544)

Anthropic `extra_headers` 未转发、stream idle timeout 不一致，说明用户或维护者正在推动 Provider 行为一致化。这对企业代理、审计、长任务生成体验都有直接影响。

---

## 8. 待处理积压

由于本次数据仅覆盖过去 24 小时，无法可靠判断“长期未响应”的 Issue 或 PR。不过，从当前状态看，有几类待处理事项需要维护者优先关注。

### 高优先级待处理

1. **Linux sandbox 兼容性与安全回退**
   - [Issue #11540](https://github.com/zeroclaw-labs/zeroclaw/issues/11540)
   - [Issue #11539](https://github.com/zeroclaw-labs/zeroclaw/issues/11539)
   - [Issue #11538](https://github.com/zeroclaw-labs/zeroclaw/issues/11538)
   - [PR #11559](https://github.com/zeroclaw-labs/zeroclaw/pull/11559)

   建议维护者将 bubblewrap/firejail 问题作为一组处理，补充后端探测矩阵、版本兼容策略和明确日志。

2. **插件权限与更新一致性**
   - [Issue #11562](https://github.com/zeroclaw-labs/zeroclaw/issues/11562)
   - [Issue #11561](https://github.com/zeroclaw-labs/zeroclaw/issues/11561)
   - [Issue #11552](https://github.com/zeroclaw-labs/zeroclaw/issues/11552)

   这些问题直接关系到插件运行权限边界，建议优先于一般功能性需求。

3. **已有修复 PR 处于 needs-author-action**
   - [PR #11541 Anthropic extra_headers](https://github.com/zeroclaw-labs/zeroclaw/pull/11541)
   - [PR #11544 Anthropic stream idle bound](https://github.com/zeroclaw-labs/zeroclaw/pull/11544)
   - [PR #11543 Shell children detach from controlling terminal](https://github.com/zeroclaw-labs/zeroclaw/pull/11543)

   这些 PR 多为风险较高但范围相对可控的修复，建议尽快推动作者响应，避免安全/稳定性修复停滞。

### 中期设计积压

- SOP 相关 Issue：  
  - [#11546](https://github.com/zeroclaw-labs/zeroclaw/issues/11546)
  - [#11547](https://github.com/zeroclaw-labs/zeroclaw/issues/11547)
  - [#11548](https://github.com/zeroclaw-labs/zeroclaw/issues/11548)
  - [#11549](https://github.com/zeroclaw-labs/zeroclaw/issues/11549)
  - [#11550](https://github.com/zeroclaw-labs/zeroclaw/issues/11550)
  - [#11551](https://github.com/zeroclaw-labs/zeroclaw/issues/11551)

这些 Issue 多带有 `status:icebox`，但主题高度一致，建议维护者整理成公开路线图或设计文档，避免设计碎片化。

---

## 健康度评估

**总体健康度：活跃但评审压力上升。**

- 活跃度：高，24 小时内 15 个 Issue、12 个 PR。  
- 交付节奏：今日无合并、无关闭，短期交付推进有限。  
- 风险面：中高，集中在 sandbox、plugin permission、provider security、shell isolation。  
- 路线图清晰度：较强，SOP 与 Agent Workspace 方向明确。  
- 维护建议：优先合并或推进小型安全/稳定性 PR，再评估大型 `size:XL` 功能 PR，避免高风险功能堆积拖慢主线稳定性。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*