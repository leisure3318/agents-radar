# OpenClaw 生态日报 2026-10-05

> Issues: 7 | PRs: 50 | 覆盖项目: 13 个 | 生成时间: 2026-10-05 04:37 UTC

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
日期：2026-10-05  
仓库：github.com/openclaw/openclaw

---

## 1. 今日速览

过去 24 小时 OpenClaw 维持了很高的开发活跃度：Issues 更新 7 条，其中 6 条仍开放、1 条已关闭；PR 更新 50 条，其中 36 条仍待合并、14 条已合并或关闭。今日工作重心明显集中在 Gateway 稳定性、Control UI 体验、会话恢复、Worker/SQLite 性能优化、Windows 兼容性和运行时清理上。

从优先级看，今日出现 2 个 P1 级别 Issue，分别涉及 `exec auto-reviewer deny 可能 fail-open` 的安全风险，以及浏览器截图超时后 Tab 持续阻塞的可用性问题，值得维护者优先跟进。PR 队列中有多个 P1/P2 且标记 `ready for maintainer look` 的修复，说明项目修复产能充足，但维护者 Review 压力较大。整体健康度良好，但短期风险集中在安全边界、Gateway 重启恢复、队列/心跳语义以及 Windows/更新路径兼容性。

---

## 2. 项目进展

今日无新版本发布。以下为已关闭/合并或对项目推进较显著的 PR。

### 已关闭/合并的重要 PR

#### PR #165293 - perf(state): reduce per-read worker overhead  
链接：https://github.com/openclaw/openclaw/pull/165293  
状态：CLOSED  
标签：`docs`, `agents`, `P2`, `proof: sufficient`

该 PR 聚焦于降低 worker 读路径的额外开销。此前 SQLite 从 Gateway 主线程迁移到 worker 后，部分读取路径仍重复执行 admission metadata 与事务设置，导致单次 row-facts 读取路径平均执行 12.69 条 worker statements。该优化减少了每次读取的额外事务与元数据处理，有助于降低高频状态读取场景的延迟和资源消耗。

项目推进意义：  
- 改善 Agent 状态读取性能  
- 延续 “SQLite 工作迁移出 Gateway 主线程” 的架构优化  
- 对高并发会话和频繁状态同步场景有正向影响

---

#### PR #165070 - perf(state): accelerate crash recovery and session receipt cleanup  
链接：https://github.com/openclaw/openclaw/pull/165070  
状态：CLOSED  
标签：`gateway`, `P2`, `proof: sufficient`

该 PR 解决进程崩溃后，健康的 agent 数据库可能因为 WAL 状态判断而阻塞 session 数分钟的问题。此前恢复逻辑依赖非空 WAL 和 SQLite 的 `wal_checkpoint(NOOP)` 判断，这在正常 checkpoint 的 WAL 场景下可能误判。

项目推进意义：  
- 提升 Gateway 崩溃恢复速度  
- 减少用户会话在进程异常后的不可用时间  
- 对生产环境稳定性非常关键

---

#### PR #165295 - perf(auto-reply): prepare initial reply snapshots through the session readers  
链接：https://github.com/openclaw/openclaw/pull/165295  
状态：CLOSED  
标签：`gateway`, `agents`, `P2`, `proof: sufficient`

该 PR 将 auto-reply 启动阶段的初始快照读取迁移到已有 session readers，避免在 Gateway 主线程同步读取 current、related 和 model-parent rows。

项目推进意义：  
- 进一步减少 Gateway 主线程数据库压力  
- 与近期 worker 化、session reader 化方向一致  
- 对自动回复启动延迟和 Gateway 可用性有改善

---

#### PR #165305 - fix(cron): report overflowing reminders instead of silently dropping them  
链接：https://github.com/openclaw/openclaw/pull/165305  
状态：CLOSED  
标签：`gateway`, `P2`

该 PR 修复 cron reminders 溢出时被静默丢弃的问题。此前每个 session 的 system event queue 最多容纳 20 个事件，当 deferred cron reminders 积压超过上限时，提醒可能直接消失，用户无感知。

项目推进意义：  
- 提升定时任务/提醒系统的可观察性  
- 避免用户误以为任务未触发或系统不可靠  
- 将隐性失败转换为可报告状态，是稳定性治理的重要一步

---

#### PR #165241 - fix: Windows Bun packaging fails to find npm  
链接：https://github.com/openclaw/openclaw/pull/165241  
状态：CLOSED  
标签：`scripts`, `agents`, `plugin: facetime`, `extensions: browser`, `extensions: canvas`, `P2`

该 PR 修复 Windows 环境下 Bun packaging helper 无法正确找到 npm 的问题，同时修正了一些 Windows qualification fixtures 中将 Bun 与 Node 工具链混淆、以及 POSIX-only 路径边界处理的问题。

项目推进意义：  
- 改善 Windows 打包和测试稳定性  
- 降低跨平台构建失败率  
- 对原生安装、插件和扩展生态均有帮助

---

#### PR #165248 - chore(ui): refresh control ui locales  
链接：https://github.com/openclaw/openclaw/pull/165248  
状态：CLOSED  
标签：`app: web-ui`

该 PR 由 bot 自动刷新 Control UI 本地化资源，使生成的 locales 与代码同步。

项目推进意义：  
- 维护多语言 UI 一致性  
- 保持自动化本地化流程通过受保护分支检查  
- 用户可见影响较小，但有助于 UI 国际化质量

---

### 今日仍待合并但推进意义较大的 PR

#### PR #165333 - fix(recovery): resume Control UI turns interrupted by a Gateway restart  
链接：https://github.com/openclaw/openclaw/pull/165333  
状态：OPEN

修复 Gateway 重启后，Control UI 中被中断的 turn 永远不恢复、session 长期处于 running 的问题。该问题直接影响部署、更新、服务重启期间的用户会话连续性。

---

#### PR #165335 - fix(subagents): keep restart recovery running past stale transfer records  
链接：https://github.com/openclaw/openclaw/pull/165335  
状态：OPEN

修复 Gateway 重启后，单个 stale subagent registry record 可能阻断所有 subagent 恢复的问题。该 PR 有助于提升多 agent/子 agent 场景的恢复韧性。

---

#### PR #165313 - fix: messages queued behind a heartbeat can run with heartbeat-only reply options  
链接：https://github.com/openclaw/openclaw/pull/165313  
状态：OPEN  
相关 Issue/上下文：https://github.com/openclaw/openclaw/issues/165194

修复用户消息排在 heartbeat 后方时，重试执行可能继承 heartbeat-only reply options 的问题。该问题会导致正常用户 turn 被误当作 heartbeat turn 执行，属于队列语义和消息调度稳定性修复。

---

#### PR #165297 - fix(agents): GitHub publish, tool-authored replies, and client tool calls collide when providers reuse tool call ids across steps  
链接：https://github.com/openclaw/openclaw/pull/165297  
状态：OPEN  
标签：`P1`, `security-sensitive-changed`, `merge-risk: compatibility`

该 PR 修复 OpenAI-compatible provider 在多个 step 中复用 tool call id 时，GitHub publishing、tool-authored final replies 和 client-hosted tool calls 发生冲突的问题。其影响面涉及 Agent 工具调用与外部发布能力，属于高优先级兼容性修复。

---

#### PR #165163 - fix(windows): install an unattended-capable Gateway task and size readiness to cold boot  
链接：https://github.com/openclaw/openclaw/pull/165163  
状态：OPEN  
关联 Issue：https://github.com/openclaw/openclaw/issues/143757

该 PR 修复 Windows Gateway task 在无人值守重启后可能保持 stopped 的问题，并调整 readiness 窗口以适应 cold boot。当前状态为 `waiting on author`，但属于 Windows 生产部署可用性的重要修复。

---

## 3. 社区热点

> 注：PR 数据中的评论数字段显示为 `undefined`，因此以下热点主要依据优先级、标签、影响面和 Issue 评论数综合判断。

### Issue #165329 - exec auto-reviewer verdict "deny" does not always prevent execution  
链接：https://github.com/openclaw/openclaw/issues/165329  
状态：OPEN  
优先级：P1  
标签：`impact:security`, `needs-security-review`, `needs-info`

这是今日最值得关注的安全类问题。用户报告在 `tools.exec.mode = "auto"` 下，native exec auto-reviewer 返回 `deny` 后，命令有时仍会被执行，表现为 fail-open。根据文档，`deny` 应当阻止执行并将原因返回给 agent，由 agent 选择实质不同的命令。

背后诉求：  
- 用户期望安全审查结果具有强约束力  
- 自动执行模式必须 fail-closed，而不能 fail-open  
- 需要明确 auto-review verdict 与实际 exec 调度之间的一致性保证

当前尚未看到对应 fix PR，且已标记 `needs-security-review`，建议维护者优先复现并冻结相关执行路径的风险。

---

### Issue #165312 - Browser tab stays blocked after one screenshot timeout  
链接：https://github.com/openclaw/openclaw/issues/165312  
状态：OPEN  
优先级：P1  
标签：`needs-live-repro`

用户报告 managed browser tab 在一次 screenshot 超时后，后续所有 screenshot 均立即失败，提示：

> "A previous screenshot or emulation action was cancelled but is still running"

背后诉求：  
- 浏览器自动化能力需要具备超时后的自恢复能力  
- 用户不希望一次 screenshot timeout 导致整个 tab 长期不可用  
- 需要更可靠的 cancellation cleanup 或 tab/session reset 机制

目前未见对应 fix PR，且需要 live repro。该问题对 browser extension、网页自动化和视觉操作类 agent 影响较大。

---

### PR #165303 - fix: complete Feishu webhook upgrades before activation  
链接：https://github.com/openclaw/openclaw/pull/165303  
状态：OPEN  
优先级：P1  
标签：`docs`, `channel: feishu`, `channel: telegram`, `channel: msteams`, `channel: nextcloud-talk`, `proof: sufficient`

该 PR 解决从 `openclaw@2026.9.7` 更新时，Feishu 使用 webhook 且外部插件尚未安装的情况下，候选版本可能在激活前停止的问题。其影响面不只 Feishu，还涉及多渠道升级路径的稳定性。

背后诉求：  
- 通讯渠道插件升级过程必须安全、可回滚  
- 更新 rehearsal 和实际 activation 的行为需要一致  
- 用户希望更新流程不因历史 listener 或插件缺失而中断

---

### PR #165331 - perf(gateway): move post-ready notice sweeping off the main thread  
链接：https://github.com/openclaw/openclaw/pull/165331  
状态：OPEN  
标签：`gateway`, `P2`, `merge-risk: compatibility`

该 PR 针对 Gateway `/readyz` 之后主线程执行 notice sweeping 导致 SQLite `database is locked` 的问题，将相关工作移出主线程。

背后诉求：  
- `/readyz` 成功后系统应真正可用  
- Gateway 主线程不应承担重 IO/锁竞争操作  
- 用户对启动后立即可用性的预期在增强

---

### PR #165304 - fix(skills): stop rescanning unchanged skill roots on unrelated refreshes  
链接：https://github.com/openclaw/openclaw/pull/165304  
状态：OPEN  
标签：`P2`, `merge-risk: compatibility`

该 PR 修复 Gateway 在无关刷新后反复扫描所有 skill directories 的问题。此前可能导致主线程饱和，并产生大量 `Skipping escaped skill path outside its configured root.` 日志。

背后诉求：  
- Skills 系统需要增量刷新，而不是全量重复扫描  
- 用户对日志噪声和主线程性能较敏感  
- 大量技能目录场景需要更好的可扩展性

---

## 4. Bug 与稳定性

### P1 / 安全与高影响问题

#### 1. Issue #165329 - exec auto-reviewer `deny` 未必阻止执行  
链接：https://github.com/openclaw/openclaw/issues/165329  
状态：OPEN  
严重程度：P1，安全影响  
是否已有 fix PR：未在今日数据中发现

问题摘要：  
在 `tools.exec.mode = "auto"` 下，auto-reviewer 返回 `deny` 后命令仍可能执行，属于 fail-open。该问题直接影响命令执行安全边界。

建议：  
- 优先进行 security review  
- 增加单元测试/集成测试覆盖 deny verdict  
- 在执行调度层增加最终 gate，确保 deny 不可能被绕过

---

#### 2. Issue #165312 - screenshot timeout 后浏览器 Tab 持续阻塞  
链接：https://github.com/openclaw/openclaw/issues/165312  
状态：OPEN  
严重程度：P1，可用性高影响  
是否已有 fix PR：未在今日数据中发现

问题摘要：  
一次 screenshot 超时后，该 managed browser tab 后续 screenshot 均失败，表现为取消操作仍被认为在运行。

建议：  
- 增加 screenshot/emulation cancellation cleanup  
- 对长期 running 的截图任务设置强制回收  
- 为用户提供 tab reset 或自动重建机制

---

### P2 / 中高优先级稳定性问题

#### 3. Issue #165315 - code-mode step 完成后显示为 “Raw details”  
链接：https://github.com/openclaw/openclaw/issues/165315  
状态：OPEN  
标签：`P2`, `impact:ux-friction`, `clawsweeper:queueable-fix`  
是否已有 fix PR：标签显示可队列修复，但今日未见明确关联 PR

问题摘要：  
Control UI chat 中，已完成的 code-mode step 如果唯一 nested tool call 是 `progress_card` 之类的进度更新，会丢失原始身份，UI 行从 step 名称变为 “Raw details”。

影响：  
- 用户难以理解历史步骤  
- 降低调试和回看 agent 行为的可读性  
- 属于体验摩擦，但不会导致崩溃

---

#### 4. Issue #165278 - Automations schema 在同一 session 的 admin management=also turn 中变化  
链接：https://github.com/openclaw/openclaw/issues/165278  
状态：OPEN  
标签：`P2`, `needs-maintainer-review`, `needs-product-decision`  
是否已有 fix PR：无，且标记 `no-new-fix-pr`

问题摘要：  
在 OpenClaw 2026.9.8 中，同一 session 内，当本地认证的 Control UI admin turn 接收 `management="also"` 时，模型可见的 Automations tool definition 会发生变化。

影响：  
- 模型工具 schema 在同一会话内动态变化，可能造成行为不可预测  
- 需要产品决策：admin management 能力是否应影响普通 turn 的工具暴露  
- 涉及权限模型、工具定义稳定性和 Control UI admin 行为边界

---

#### 5. Issue #165314 - shallow Git update status 过度计数 commits  
链接：https://github.com/openclaw/openclaw/issues/165314  
状态：OPEN  
标签：`P2`, `linked-pr-open`  
是否已有 fix PR：有开放关联 PR，但数据中未明确指出 PR 编号

问题摘要：  
浅克隆 source checkout 即使存在可见 merge base，Git update status 仍可能报告膨胀的 commit count。

影响：  
- 更新提示可能误导用户  
- 可能影响对版本差异、更新规模的判断  
- 不是功能性崩溃，但会损害更新流程信任度

---

#### 6. Issue #165308 - UI widget tests leave lazy imports running after teardown  
链接：https://github.com/openclaw/openclaw/issues/165308  
状态：CLOSED  
标签：`P2`, `linked-pr-open`

问题摘要：  
UI 单元测试 shard 可能在 widget test 结束后，lazy MCP App import 仍在运行，导致 `EnvironmentTeardownError`。该 Issue 今日已关闭，说明已有处理或被关联 PR 覆盖。

影响：  
- 主要影响 CI 稳定性  
- 降低测试噪声，有助于维护者判断真实失败

---

### P3 / 性能与工程效率

#### 7. Issue #165321 - Reduce repeated work in source updates and build preparation  
链接：https://github.com/openclaw/openclaw/issues/165321  
状态：OPEN  
标签：`P3`, `impact:other`

问题摘要：  
source updates 和 build preparation 中存在重复输入扫描、无效 relocation work、未使用的 plugin lease，以及为已有 Node entrypoints 的 build steps 启动 package-manager wrappers 等问题。

已有相关 PR：  
- PR #165327 - improve: avoid nested package-manager launches during builds  
  链接：https://github.com/openclaw/openclaw/pull/165327  
- PR #165325 - refactor: simplify runtime preparation during updates  
  链接：https://github.com/openclaw/openclaw/pull/165325  

影响：  
- 降低更新和构建效率  
- 属于工程性能优化  
- 多个小 PR 已开始拆解处理，纳入下一轮维护的可能性较高

---

## 5. 功能请求与路线图信号

### 1. Control UI setup 支持选择 profile name  
PR #164825 - feat: choose a profile name during Control UI setup  
链接：https://github.com/openclaw/openclaw/pull/164825  
状态：OPEN

该 PR 允许用户在 Control UI setup 流程中为 unnamed Gateway profile 设置名称。它属于用户体验增强，尤其面向本地用户或 token-only 用户。

路线图信号：  
- Control UI 正在从“管理入口”向“完整配置体验”演进  
- Gateway profile 的命名和身份展示会变得更重要  
- 该功能与 Issue #162164 相关，可能是更大 setup 改造的一部分

进入下一版本可能性：中等。当前需要 proof，若测试和 UX 验证补齐，有机会进入近期版本。

---

### 2. Incognito actor 的 compute/fork path 组合能力  
PR #165217 - refactor(sessions): compose compute and fork paths on the incognito actor  
链接：https://github.com/openclaw/openclaw/pull/165217  
状态：OPEN

该 PR 为 inactive incognito actor 补齐 reconciliation、usage-reporting 和 parent-fork composition，但当前生产路由仍保持 host-owned，不启用用户可见行为。

路线图信号：  
- OpenClaw 正在为 worker ownership 或更复杂的 session actor 架构做准备  
- Incognito session 未来可能拥有更完整的生命周期与计算路径  
- 这是架构性铺垫，而非即时功能发布

进入下一版本可能性：作为内部重构较高；作为用户可见能力较低。

---

### 3. Gateway/Session 恢复能力持续增强  
相关 PR：  
- PR #165333 - resume Control UI turns interrupted by Gateway restart  
  链接：https://github.com/openclaw/openclaw/pull/165333  
- PR #165335 - keep restart recovery running past stale transfer records  
  链接：https://github.com/openclaw/openclaw/pull/165335  
- PR #165070 - accelerate crash recovery and session receipt cleanup  
  链接：https://github.com/openclaw/openclaw/pull/165070  

路线图信号：  
- Gateway restart、deploy、update、service restart 期间的会话连续性是近期重点  
- 项目正在减少“session 卡在 running”“subagent 无法恢复”“重启后 blocked”类问题  
- 这表明 OpenClaw 正在向长期运行、生产部署场景强化

进入下一版本可能性：高。稳定性修复通常优先合入。

---

### 4. Worker 化和主线程瘦身是明确方向  
相关 PR：  
- PR #165331 - move post-ready notice sweeping off the main thread  
  链接：https://github.com/openclaw/openclaw/pull/165331  
- PR #165332 - serve cron tick session state from workers  
  链接：https://github.com/openclaw/openclaw/pull/165332  
- PR #165295 - prepare initial reply snapshots through the session readers  
  链接：https://github.com/openclaw/openclaw/pull/165295  
- PR #165293 - reduce per-read worker overhead  
  链接：https://github.com/openclaw/openclaw/pull/165293  

路线图信号：  
- Gateway 主线程将继续减少 SQLite 和恢复相关工作  
- 高并发、多 session、cron、auto-reply 等场景的性能是核心关注点  
- 后续版本可能继续出现 session readers、agent writer、worker task scheduling 相关优化

---

### 5. 多渠道集成升级流程仍在完善  
相关 PR：  
- PR #165303 - complete Feishu webhook upgrades before activation  
  链接：https://github.com/openclaw/openclaw/pull/165303  
- PR #165334 - revert Slack and Discord session return buttons  
  链接：https://github.com/openclaw/openclaw/pull/165334  

路线图信号：  
- Feishu、Telegram、MSTeams、Nextcloud Talk、Slack、Discord 等渠道仍是活跃维护范围  
- 外部插件、webhook、session return UX 等细节仍在调整  
- 通讯渠道体验将继续围绕可靠升级、减少错误导航和插件安装路径优化展开

---

## 6. 用户反馈摘要

### 安全边界必须可预测  
来自 Issue #165329：https://github.com/openclaw/openclaw/issues/165329  
用户明确指出 auto-reviewer `deny` 后仍执行命令的问题，这反映出用户对 OpenClaw 自动执行能力的核心期待：自动化可以强，但安全裁决必须绝对生效。尤其在 `tools.exec.mode = "auto"` 下，用户依赖系统替自己拦截危险命令，任何 fail-open 都会显著降低信任。

---

### 浏览器自动化需要具备超时后的自愈能力  
来自 Issue #165312：https://github.com/openclaw/openclaw/issues/165312  
用户场景是 managed browser tab 中 screenshot 超时后，后续所有 screenshot 立即失败。真实痛点不是一次截图失败，而是失败后的资源状态没有恢复，导致用户必须手动重启 tab/session 或放弃当前上下文。

---

### Control UI 的可解释性仍需增强  
来自 Issue #165315：https://github.com/openclaw/openclaw/issues/165315  
用户不满点在于 code-mode step 完成后显示为 “Raw details”，丢失了步骤身份。这类问题虽不影响核心执行，但影响用户理解 agent 正在做什么、做过什么。对于个人 AI 助手/智能体产品而言，可解释性和可回看性是建立信任的重要部分。

---

### 更新与构建流程中的“误导性状态”会损害信任  
来自 Issue #165314：https://github.com/openclaw/openclaw/issues/165314  
浅克隆场景下 commit count 过度计数，会让用户误判更新规模或版本差异。类似问题的核心不是系统不能工作，而是系统给出的状态不可信。

---

### Windows 用户和无人值守部署场景需求明显  
来自 PR #165163：https://github.com/openclaw/openclaw/pull/165163  
Windows Gateway task 在 unattended reboot 后保持 stopped，是典型生产部署痛点。用户期望 OpenClaw 能作为长期运行的本地/服务器助手，在系统重启、冷启动和无人干预场景中稳定恢复。

---

## 7. 待处理积压

> 今日数据主要覆盖最近 24 小时活动，无法完整识别“长期未响应”项目。以下列出当前状态上最需要维护者关注的待处理项。

### 高优先级待处理

#### Issue #165329 - exec deny fail-open，需安全审查  
链接：https://github.com/openclaw/openclaw/issues/165329  
状态：OPEN  
标签：`P1`, `needs-security-review`, `needs-info`

维护者动作建议：  
- 尽快确认复现条件  
- 检查执行路径是否存在竞态或 verdict 绑定错误  
- 在 fix 前考虑文档或配置层面的临时风险提示

---

#### Issue #165312 - Browser screenshot timeout 后 Tab 卡死，需 live repro  
链接：https://github.com/openclaw/openclaw/issues/165312  
状态：OPEN  
标签：`P1`, `needs-live-repro`

维护者动作建议：  
- 请求用户提供浏览器版本、tab 生命周期、截图参数和日志  
- 增加 timeout cancellation 的诊断日志  
- 评估是否可通过 watchdog 自动清理 stuck operation

---

#### PR #165297 - tool call id 冲突修复，等待 maintainer review  
链接：https://github.com/openclaw/openclaw/pull/165297  
状态：OPEN  
标签：`P1`, `ready for maintainer look`, `security-sensitive-changed`

维护者动作建议：  
- 优先 Review 兼容性影响  
- 重点关注 provider 复用 tool call id 的边界用例  
- 合入前确保 GitHub publishing、tool-authored replies、client-hosted tools 均有回归测试

---

#### PR #165303 - Feishu webhook 升级修复，等待 maintainer review  
链接：https://github.com/openclaw/openclaw/pull/165303  
状态：OPEN  
标签：`P1`, `proof: sufficient`, `ready for maintainer look`

维护者动作建议：  
- 优先验证从 `2026.9.7` 升级路径  
- 检查外部插件未安装时 activation 前后的行为一致性  
- 评估对其他 webhook channel 的影响

---

### 等待作者处理

#### PR #165163 - Windows Gateway task 无人值守重启修复  
链接：https://github.com/openclaw/openclaw/pull/165163  
状态：OPEN  
标签：`P1`, `waiting on author`, `merge-risk: compatibility`, `merge-risk: availability`

维护者动作建议：  
- 明确 author 需要补充的测试或实现项  
- Windows cold boot 和 unattended reboot 场景建议作为必测项  
- 该 PR 影响生产可用性，建议避免长期停滞

---

#### PR #165331 - post-ready notice sweeping 移出主线程  
链接：https://github.com/openclaw/openclaw/pull/165331  
状态：OPEN  
标签：`P2`, `waiting on author`, `merge-risk: compatibility`

维护者动作建议：  
- 要求作者补充锁竞争复现和修复后指标  
- 重点验证 `/readyz` 成功后异步 sweeping 不会造成状态遗漏  
- 合入前关注兼容性风险

---

#### PR #164836 - deeply nested external tool schemas crash schema normalization  
链接：https://github.com/openclaw/openclaw/pull/164836  
状态：OPEN  
标签：`P2`, `waiting on author`, `merge-risk: compatibility`, `merge-risk: availability`

维护者动作建议：  
- 继续推动作者补齐 proof  
- 深层 schema normalization 的递归边界应有明确测试  
- 该问题涉及 Gateway crash 风险，不宜长期积压

---

### 需要产品/维护者决策

#### Issue #165278 - Automations schema 在 admin management turn 中变化  
链接：https://github.com/openclaw/openclaw/issues/165278  
状态：OPEN  
标签：`needs-maintainer-review`, `needs-product-decision`

维护者动作建议：  
- 明确同一 session 内工具 schema 是否允许随 admin turn 改变  
- 定义普通 turn 与 admin management turn 的工具可见性边界  
- 如属预期行为，应补充文档；如非预期，应尽快设计修复

---

## 总体健康度评估

OpenClaw 今日表现出高活跃、高修复密度的开源项目特征，尤其在 Gateway 稳定性、Worker 化、会话恢复和跨平台兼容性方面持续推进。短期主要风险来自两个方面：一是 `exec auto-reviewer deny fail-open` 这类安全边界问题，二是 Gateway/Browser/Session 在异常和重启场景下的恢复一致性。PR 队列中已有大量高质量修复准备进入 Review，但 `ready for maintainer look` 和 `waiting on author` 项目较多，维护者吞吐可能成为近期发布节奏的主要瓶颈。

---

## 横向生态对比



---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报  
**日期：2026-10-05**  
**仓库：** HKUDS/nanobot  
**GitHub：** https://github.com/HKUDS/nanobot

---

## 1. 今日速览

过去 24 小时 NanoBot 维护活跃度较高：共有 **1 条 Issue 更新**、**31 条 PR 更新**，其中 **22 条仍待合并**、**9 条已关闭/合并**。今日没有新版本发布，但 PR 流量集中在 **WebUI 移动端体验、Provider 流式事件兼容性、文档/文件处理、聊天通道通知能力** 等方向。  
整体来看，项目处于高频修复与功能打磨阶段，尤其 WebUI 端连续合并多项移动端可用性修复，说明维护者正在强化真实使用场景下的稳定性。与此同时，多个 open PR 带有 `bug / regression / test / priority:p2` 标签，表明当前仍有不少中优先级回归和边界问题等待处理。

---

## 2. 项目进展

今日无新版本发布，但有多项 PR 被关闭/合并，主要推进了 WebUI 移动端体验、可访问性、文档准确性与编辑展示一致性。

### WebUI 移动端体验持续改善

- **#6061 fix(webui): dismiss mobile sidebar on current topic selection**  
  链接：https://github.com/HKUDS/nanobot/pull/6061  
  状态：Closed  
  该 PR 修复了手机端侧边栏中点击“当前已打开 topic”时抽屉不会关闭的问题。此前点击其他 topic 可以关闭侧栏，但点击当前 topic 会被组件提前拦截，导致移动端操作不一致。  
  **影响：** 提升移动端导航一致性，减少用户重复点击或误以为界面卡住的情况。

- **#6056 fix(webui): make sidebar actions discoverable on touch devices**  
  链接：https://github.com/HKUDS/nanobot/pull/6056  
  状态：Closed  
  该 PR 让侧边栏操作按钮在触屏设备上更易发现，不再依赖 hover。覆盖 topics、conversation groups、panes、project headers 等区域。  
  **影响：** 对手机和平板用户非常关键，降低隐藏操作带来的使用门槛。

- **#6055 fix(webui): avoid automatic zoom when focusing mobile text fields**  
  链接：https://github.com/HKUDS/nanobot/pull/6055  
  状态：Closed  
  修复 iOS/Safari 中聚焦输入框时页面自动放大、退出后聊天区域偏移的问题。  
  **影响：** 改善移动端输入体验，特别是频繁输入 prompt、搜索和表单内容的场景。

- **#6053 fix(webui): fit session search above the mobile keyboard**  
  链接：https://github.com/HKUDS/nanobot/pull/6053  
  状态：Closed  
  修复 iOS 上 session search 结果被软键盘或 Safari 控件遮挡的问题。  
  **影响：** 改善短屏、横屏、移动搜索场景的可用性。

- **#6052 fix(webui): keep composer palettes inside the mobile viewport**  
  链接：https://github.com/HKUDS/nanobot/pull/6052  
  状态：Closed  
  修复移动端键盘弹出时 `@` 和 `/` 菜单被压缩成窄条的问题。  
  **影响：** 对依赖 slash command、mention、快捷操作的用户非常重要。

### WebUI 可访问性与键盘操作优化

- **#6058 fix(webui): restore sidebar menu focus on Escape**  
  链接：https://github.com/HKUDS/nanobot/pull/6058  
  状态：Closed  
  修复按 Escape 关闭侧边栏菜单后焦点没有回到触发按钮的问题。  
  **影响：** 改善键盘用户和辅助技术用户的连续操作体验。

- **#6059 fix(webui): restore sidebar focus after submenu Escape**  
  链接：https://github.com/HKUDS/nanobot/pull/6059  
  状态：Closed  
  作为 #6058 的后续修复，处理子菜单内 Escape 事件导致焦点不能正确恢复的问题。  
  **影响：** 进一步完善复杂菜单场景下的焦点管理。

### 文档与编辑展示修正

- **#6054 docs(memory): correct Git layout and history search example**  
  链接：https://github.com/HKUDS/nanobot/pull/6054  
  状态：Closed  
  修正文档中 memory guide 对 Git 仓库位置的描述，并优化历史搜索示例，避免先打印所有匹配项再切片的问题。  
  **影响：** 降低用户按文档配置 memory/GitStore 时的误解风险。

- **#6049 fix(webui): keep edit diffs visible and distinguish file creation**  
  链接：https://github.com/HKUDS/nanobot/pull/6049  
  状态：Closed  
  修复完成态回答中 edit diff 被隐藏到 activity details 菜单的问题，同时区分“文件创建”和“文件编辑”。  
  **影响：** 改善 agent 执行文件修改时的透明度，方便用户审查自动化改动。

**整体进展评估：**  
今日已关闭/合并 PR 主要集中在 **WebUI 体验修复**，尤其是移动端与可访问性问题。虽然没有大的功能版本发布，但这些修复能显著提高日常使用的顺滑度与可信度，是典型的产品成熟期质量改进。

---

## 3. 社区热点

> 注：PR 数据中评论数显示为 `undefined`，因此本日报主要根据 Issue 评论、PR 数量、标签和问题覆盖面判断热点。

### 热点 1：模型 fallback 时聊天通道缺少提示

- **Issue #6031 Notify chat channels when a fallback model serves a turn**  
  链接：https://github.com/HKUDS/nanobot/issues/6031  
  状态：Open  
  作者：GZY-SUPER-HACKER  
  评论：1  
  摘要：当前模型 failover 已经可跨 provider 工作，但当 fallback 触发时，QQ、Telegram、Discord、Slack 等聊天通道用户无法感知回复来自备用模型；只有 WebUI 有相关提示。

- **相关修复 PR #6062 fix(channels): notify chat channels when a fallback model serves a turn**  
  链接：https://github.com/HKUDS/nanobot/pull/6062  
  状态：Open  
  标签：`bug`, `channel`, `fix`, `test`, `priority:p2`

**背后诉求：**  
用户希望多模型容错机制不仅“能工作”，还要“可解释、可观察”。当 fallback 发生时，模型能力、成本、响应质量都可能发生变化，如果聊天通道没有通知，会造成用户对回答来源的误解。该问题反映出 NanoBot 在多通道部署场景中需要进一步统一 WebUI 与聊天渠道的状态反馈。

---

### 热点 2：WebUI 扩展机制与本地可信插件能力

- **PR #6032 feat(webui): add configurable local trusted extension surface**  
  链接：https://github.com/HKUDS/nanobot/pull/6032  
  状态：Open  
  标签：`documentation`, `webui`, `feature`, `test`, `security`, `priority:p2`, `conflict`

**背后诉求：**  
该 PR 引入可配置的本地 WebUI 扩展面，允许从本地目录发现、校验并通过 gateway 暴露浏览器端扩展。由于涉及本地扩展、安全边界、manifest 校验和路由暴露，该功能同时带有 `security` 和 `conflict` 标签。  
这说明社区可能正在探索 NanoBot 的可扩展 UI 生态，但维护者需要重点关注权限模型、路径隔离、manifest schema 和用户信任边界。

---

### 热点 3：计划任务绑定具体聊天上下文

- **PR #6057 feat(webui): choose the chat for scheduled tasks**  
  链接：https://github.com/HKUDS/nanobot/pull/6057  
  状态：Open  
  标签：`conflict`

**背后诉求：**  
该 PR 允许用户查看并修改 scheduled task 使用的具体 chat，并将未来运行的执行 chat、记录 turn、默认回复路由绑定到新的选择。  
这反映出用户在使用定时任务时，需要更强的上下文控制能力：任务不只是定时执行，还要明确“在哪个会话里执行、记录到哪里、回复到哪里”。

---

## 4. Bug 与稳定性

以下按影响面和潜在严重程度排序。

### P1/P2 级：多通道模型 fallback 缺少用户提示

- **Issue #6031 Notify chat channels when a fallback model serves a turn**  
  链接：https://github.com/HKUDS/nanobot/issues/6031  
  状态：Open  
- **Fix PR #6062**  
  链接：https://github.com/HKUDS/nanobot/pull/6062  
  状态：Open

**影响：**  
影响 QQ、Telegram、Discord、Slack 等聊天通道用户。模型 fallback 是可靠性机制，但缺少提示会降低透明度，尤其在备用模型质量、价格或能力不同的情况下。  
**是否已有修复：** 是，#6062 已提交但未合并。

---

### P2：Provider Responses API 工具调用参数事件路由错误

- **PR #6051 fix(providers): route Responses tool argument events by item ID**  
  链接：https://github.com/HKUDS/nanobot/pull/6051  
  状态：Open  
  标签：`bug`, `provider`, `regression`, `fix`, `test`, `priority:p2`

**问题：**  
官方 Responses API 的 `response.function_call_arguments.delta` 和 `.done` 事件携带 `item_id`，但当前消费者只查找 `call_id`，可能导致工具调用参数无法正确路由。  
**影响：**  
可能破坏工具调用流式参数处理，对依赖 OpenAI Responses API 和 function calling 的用户影响较大。  
**是否已有修复：** 是，PR 已提交。

---

### P2：SSE 流首个事件因 UTF-8 BOM 丢失

- **PR #6050 fix(providers): preserve the first SSE event with a leading UTF-8 BOM**  
  链接：https://github.com/HKUDS/nanobot/pull/6050  
  状态：Open  
  标签：`bug`, `provider`, `regression`, `fix`, `test`, `priority:p2`

**问题：**  
如果 Responses API SSE stream 以 UTF-8 BOM 开头，第一个 `data:` 事件会被静默丢弃，例如 `Hello ` + `world` 只输出 `world`。  
**影响：**  
直接影响流式输出完整性，用户可能看到缺字、丢首 token 或内容回调不完整。  
**是否已有修复：** 是，PR 已提交。

---

### P2：XLSX 声明范围外的单元格被忽略

- **PR #6060 fix(documents): read cells beyond declared XLSX dimensions**  
  链接：https://github.com/HKUDS/nanobot/pull/6060  
  状态：Open  
  标签：`bug`, `fix`, `test`, `priority:p2`

**问题：**  
部分 XLSX 文件实际包含超出声明 used range 的单元格，而 openpyxl read-only 模式会信任声明范围，导致 NanoBot 在 document preview、`read_file`、`grep` 中遗漏内容。  
**影响：**  
影响文档读取准确性，尤其在用户上传不规范或由第三方工具生成的 Excel 文件时。  
**是否已有修复：** 是，PR 已提交。

---

### P2：导入消息时先修改 session 后校验，失败后可能污染缓存

- **PR #6048 fix(sdk): validate imported messages before mutating sessions**  
  链接：https://github.com/HKUDS/nanobot/pull/6048  
  状态：Open

**问题：**  
`SessionClient.ingest` 在校验后续 items 前已经修改缓存消息和 metadata，失败导入可能在之后被持久化。  
**影响：**  
可能导致 session 状态不一致或半导入数据残留。  
**是否已有修复：** 是，PR 已提交，并声明相关 SDK/facade/session-runtime 测试通过。

---

### P2：技能打包失败可能破坏已有 archive

- **PR #6047 fix(skills): preserve existing archives when packaging fails**  
  链接：https://github.com/HKUDS/nanobot/pull/6047  
  状态：Open

**问题：**  
技能打包失败时，可能截断或移除已有可用 archive。  
**影响：**  
影响技能分发与部署可靠性，特别是在 CI/CD 或自动构建环境中。  
**是否已有修复：** 是，PR 已提交，采用临时 archive 成功后再替换目标文件的方式。

---

### P2：WebUI 队列 guidance 对 attachment-only 项处理顺序错误

- **PR #6046 fix(webui): send attachment-only queued guidance in order**  
  链接：https://github.com/HKUDS/nanobot/pull/6046  
  状态：Open

**问题：**  
自动 guidance delivery 只选择非空文本，跳过了只有附件的队首项。  
**影响：**  
会破坏用户排队输入的顺序，尤其影响图像或附件优先的任务流。  
**是否已有修复：** 是，PR 已提交。

---

### P2：公共域名被误判为私有 IPv6

- **PR #6045 fix(webui): distinguish public domain names from private IPv6**  
  链接：https://github.com/HKUDS/nanobot/pull/6045  
  状态：Open

**问题：**  
以 `fc` / `fd` 开头的公共域名，例如 `fda.gov`，可能被误判为 private IPv6 并从 source cards 中隐藏。  
**影响：**  
影响来源展示与引用透明度。  
**是否已有修复：** 是，PR 已提交。

---

### P2：组件卸载后麦克风权限才返回，仍可能启动录音

- **PR #6044 fix(webui): release microphone access granted after unmount**  
  链接：https://github.com/HKUDS/nanobot/pull/6044  
  状态：Open

**问题：**  
如果麦克风权限请求在 composer 卸载后才 resolve，系统仍可能启动录音。  
**影响：**  
涉及隐私和资源释放，属于用户信任相关问题。  
**是否已有修复：** 是，PR 已提交。

---

## 5. 功能请求与路线图信号

### 1）聊天通道与 WebUI 的能力对齐

- **Issue #6031**  
  链接：https://github.com/HKUDS/nanobot/issues/6031  
- **PR #6062**  
  链接：https://github.com/HKUDS/nanobot/pull/6062

**路线图信号：**  
NanoBot 可能会继续推动 WebUI 与 QQ、Telegram、Discord、Slack 等聊天渠道在事件提示、模型状态、工具执行状态上的一致性。模型 fallback 通知是一个典型入口。

---

### 2）WebUI 本地可信扩展机制

- **PR #6032 feat(webui): add configurable local trusted extension surface**  
  链接：https://github.com/HKUDS/nanobot/pull/6032

**路线图信号：**  
本地扩展 surface 如果合并，意味着 NanoBot WebUI 可能从固定 UI 逐步走向可扩展插件化生态。但由于带有 `security` 和 `conflict` 标签，短期内需要重点审查安全模型，不一定会快速进入稳定版本。

---

### 3）Scheduled Tasks 绑定具体 chat

- **PR #6057 feat(webui): choose the chat for scheduled tasks**  
  链接：https://github.com/HKUDS/nanobot/pull/6057

**路线图信号：**  
NanoBot 的定时任务正在向更明确的上下文执行模型演进。未来版本中，scheduled task 可能不再只是后台任务，而会与具体 chat、历史记录、回复通道绑定，增强可追踪性和多会话管理能力。

---

### 4）移动端 WebUI 体验进入密集打磨阶段

相关已关闭 PR：

- #6061：https://github.com/HKUDS/nanobot/pull/6061  
- #6056：https://github.com/HKUDS/nanobot/pull/6056  
- #6055：https://github.com/HKUDS/nanobot/pull/6055  
- #6053：https://github.com/HKUDS/nanobot/pull/6053  
- #6052：https://github.com/HKUDS/nanobot/pull/6052  

**路线图信号：**  
维护者显然在集中处理移动端布局、键盘、侧栏、菜单和可触达性问题。可以判断，移动端 WebUI 使用体验将是近期版本的重要质量目标。

---

## 6. 用户反馈摘要

基于今日唯一更新 Issue 和相关 PR，可以提炼出以下用户痛点：

1. **多模型 fallback 缺少透明度**  
   用户并不只关心“是否成功回复”，也关心“由哪个模型回复、是否发生了降级或切换”。  
   相关链接：  
   - https://github.com/HKUDS/nanobot/issues/6031  
   - https://github.com/HKUDS/nanobot/pull/6062

2. **聊天通道用户希望获得与 WebUI 同等的信息反馈**  
   当前 fallback 通知偏 WebUI-only，聊天渠道用户在 QQ、Telegram、Discord、Slack 等场景下无法感知模型切换。  
   这说明 NanoBot 的真实使用场景已经不局限于 WebUI，跨渠道一致性正在变得更重要。

3. **移动端用户遭遇较多细节摩擦**  
   今日关闭的多个 PR 都指向 iOS/Safari、软键盘、侧边栏、触屏 hover、菜单焦点等问题。  
   用户反馈背后的共同点是：NanoBot 作为个人 AI 助手，移动端随时使用的场景正在增加，WebUI 需要达到接近原生应用的可用性。

4. **用户重视 agent 操作的可审计性**  
   #6049 修复 edit diff 展示问题，说明用户希望清楚看到 AI 对文件做了什么，而不是把修改隐藏在 activity details 中。  
   相关链接：https://github.com/HKUDS/nanobot/pull/6049

---

## 7. 待处理积压

基于本次提供的数据，无法判断“长期未响应”的 Issue 或 PR，因为数据窗口仅覆盖过去 24 小时，且未提供历史最后响应时间、review 状态或 stale 标记。不过，以下 open PR/Issue 值得维护者优先关注：

### 高优先级待处理

- **#6062 fix(channels): notify chat channels when a fallback model serves a turn**  
  链接：https://github.com/HKUDS/nanobot/pull/6062  
  原因：直接关闭 #6031，且影响多聊天渠道用户的透明度体验。

- **#6051 fix(providers): route Responses tool argument events by item ID**  
  链接：https://github.com/HKUDS/nanobot/pull/6051  
  原因：涉及 Responses API 工具调用参数流，可能影响核心 agent/tool 使用链路。

- **#6050 fix(providers): preserve the first SSE event with a leading UTF-8 BOM**  
  链接：https://github.com/HKUDS/nanobot/pull/6050  
  原因：涉及 SSE 流首事件丢失，影响输出完整性。

- **#6060 fix(documents): read cells beyond declared XLSX dimensions**  
  链接：https://github.com/HKUDS/nanobot/pull/6060  
  原因：影响文档读取、搜索和预览准确性。

### 需要重点 review 的功能型 PR

- **#6032 feat(webui): add configurable local trusted extension surface**  
  链接：https://github.com/HKUDS/nanobot/pull/6032  
  原因：涉及本地扩展、安全边界和 WebUI 插件能力，且带 `conflict` 与 `security` 标签。

- **#6057 feat(webui): choose the chat for scheduled tasks**  
  链接：https://github.com/HKUDS/nanobot/pull/6057  
  原因：改变 scheduled task 与 chat 的绑定逻辑，涉及未来任务执行、记录 turn 和默认回复路由，需要确认迁移与兼容性。

---

## 项目健康度评估

**活跃度：高。** 过去 24 小时 31 条 PR 更新，说明维护者和贡献者活跃。  
**稳定性：中等偏好。** 多个 bugfix PR 已提交且带测试说明，但仍有不少 provider、SDK、WebUI、文档处理相关修复待合并。  
**产品成熟度：持续提升。** 今日关闭的 PR 多集中在移动端、可访问性和用户体验细节，说明项目正在从“功能可用”向“体验可靠”推进。  
**风险点：** Provider 流式事件、聊天通道通知、本地扩展安全面和 scheduled task 上下文绑定，是近期最需要 review 的区域。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-10-05）

## 1. 今日速览

过去 24 小时 Hermes Agent 维持了**极高活跃度**：Issues 更新 50 条，其中 46 条仍在新开或活跃状态，4 条关闭；PR 更新 50 条，其中 42 条仍待合并，8 条已合并或关闭。  
今日没有新版本发布，开发重心集中在 **gateway/profile 多实例拓扑、session 恢复稳定性、Desktop/SSH、cron、local models、update/install 可靠性** 等方向。  
从标签分布看，P2 级稳定性问题较多，尤其集中在 session state、gateway liveness、Desktop 连接归属、dashboard WebSocket 重连、local runtime 模型过滤等方面。  
项目健康度总体表现为：**社区反馈活跃、修复响应较快，但待合并 PR 队列较长，稳定性与兼容性债务仍在集中暴露期**。

---

## 2. 项目进展

今日无 Release，因此没有版本层面的变更交付。但有多项 PR 进入关闭/合并状态，主要推进文档修复、gateway 识别、插件凭据作用域和开发环境说明。

### 重要已关闭 / 合并 PR

#### 2.1 修复 store launcher 下 gateway 运行状态识别

- PR: [#133091 fix(gateway): identify the store launcher's inline source as the gateway](https://github.com/NousResearch/hermes-agent/pull/133091)  
- 关联 Issue: [#133090](https://github.com/NousResearch/hermes-agent/issues/133090)  
- 状态：CLOSED  
- 影响范围：`comp/cli`, `comp/gateway`, `area/install-update`

该 PR 修复 store-toolchain 安装场景下，gateway 通过 minted shim 启动后，`hermes gateway list` 将所有 profile 误报为 “not running” 的问题。  
问题根因是 live gateway 的命令行形态是 `python -I -c <bootstrap> gateway run`，原有 liveness 检测无法识别 inline-source 启动方式。  
这是一个 P2 级兼容性修复，对使用 store 安装和多 profile gateway 管理的用户较重要。

#### 2.2 插件文档改用 profile-scoped credentials

- PR: [#133098 docs(plugins): use profile-scoped credentials in provider examples](https://github.com/NousResearch/hermes-agent/pull/133098)  
- 状态：CLOSED  
- 影响范围：`comp/plugins`, `area/auth`

该 PR 修正文档中插件示例直接使用 `os.environ` / `os.getenv` 读取凭据的问题，改为强调 profile-scoped credential 访问方式。  
在 multiplexed gateway 场景中，不同 profile 的 secret 作用域必须隔离，否则插件可能读取到 launch profile 的凭据，引发安全和隔离问题。  
虽然是文档 PR，但它回应了 Hermes 近期向多 profile、多 gateway 拓扑演进带来的权限边界问题。

#### 2.3 修复文档章节链接与 Bot OAuth 说明

- PR: [#133104 docs: repair section links and clarify Bot OAuth fallback](https://github.com/NousResearch/hermes-agent/pull/133104)  
- 状态：CLOSED  
- 影响范围：`comp/cli`, `area/auth`, `provider/openai`

该 PR 修复 Docusaurus 中失效的文档锚点链接，并澄清 Bot OAuth fallback 的说明。  
对新用户和部署 Bot 的用户而言，属于安装与认证路径上的体验改进。

#### 2.4 开发文档：worktree UI helpers 使用 PM Python selection

- PR: [#133100 docs(dev): use PM Python selection in worktree UI helpers](https://github.com/NousResearch/hermes-agent/pull/133100)  
- 状态：CLOSED  
- 影响范围：`comp/tui`, `comp/desktop`

该 PR 修正开发文档中对 `.venv/bin/python` 的假设，改为使用 `scripts/run-in-hermes-env` 等 PM 选择机制。  
这有助于减少多 worktree、依赖 generation 或不同 checkout 间 Python 环境不一致造成的问题。

### 今日整体推进评估

今日关闭/合并 PR 数为 8，占当日 PR 更新总量的 16%；关闭 Issue 数为 4，占 Issue 更新量的 8%。  
整体来看，**问题发现速度高于关闭速度**，但多个 P2 问题已经有对应修复 PR，说明维护响应及时。短期风险在于 42 个待合并 PR 可能形成 review backlog。

---

## 3. 社区热点

今日讨论热度主要集中在 CLI 可观测性、gateway/profile 拓扑、cron 可控性、session/dashboard 稳定性几个方向。所有展示条目的 👍 反应数均为 0，因此热度主要依据评论数和问题严重度判断。

### 3.1 sessions CLI 过滤结果不可见

- Issue: [#133013 [Feature]: sessions CLI: show the values you filter on](https://github.com/NousResearch/hermes-agent/issues/133013)  
- 状态：OPEN  
- 评论数：4  
- 标签：`type/feature`, `comp/cli`, `area/sessions`, `sweeper:risk-session-state`

用户提出一个很直接的 CLI 可用性诉求：**如果用户按某个字段过滤 session，那么结果行中应该能看到该字段值**。  
当前 `hermes sessions archive` 和 `hermes sessions prune` 支持大量过滤条件，但其中许多字段不会在 preview 或 list 中展示，导致用户无法确认自己筛选出的对象是否正确。  
这反映出 session 管理功能正在变复杂，用户需要更强的可解释性和安全确认机制，尤其是 archive/prune 这类破坏性操作。

### 3.2 第二个 HERMES_HOME gateway 启动失败

- Issue: [#133087 [Bug]: Second HERMES_HOME root's gateway exits "already serves profile 'default'"](https://github.com/NousResearch/hermes-agent/issues/133087)  
- 状态：CLOSED  
- 评论数：3  
- 标签：`type/bug`, `comp/gateway`, `area/config`, `area/profiles`, `P2`

该问题指出：文档声称不同 `HERMES_HOME` 可以作为隔离边界运行自己的 gateway，但实际 host-gateway rendezvous 使用的是 OS 用户级共享目录，并按 profile name 加锁。  
因此两个不同 root 下的 `default` profile 会冲突，第二个 gateway 进入 restart loop。  
这类问题暴露出 Hermes 在 **多 root、多 profile、多 gateway 拓扑** 上仍存在模型与实现不一致。

### 3.3 cron 缺少实时取消能力

- Issue: [#133057 [Feature]: hermes cron cancel](https://github.com/NousResearch/hermes-agent/issues/133057)  
- 状态：OPEN  
- 评论数：3  
- 标签：`type/feature`, `comp/cron`, `P3`

用户希望新增 `hermes cron cancel JOB_ID`，用于终止正在运行中的 cron job。  
场景包括网络 I/O 卡死、无 agent 脚本挂起、任务无限执行等。  
这表明 Hermes cron 正在被用于更长生命周期、更接近生产环境的自动化任务，用户开始需要类似作业调度系统的控制面能力。

### 3.4 store launcher 下 gateway list 全部误报 not running

- Issue: [#133090 Store launchers are invisible to gateway liveness](https://github.com/NousResearch/hermes-agent/issues/133090)  
- 状态：CLOSED  
- 评论数：2  
- 修复 PR: [#133091](https://github.com/NousResearch/hermes-agent/pull/133091)  
- 标签：`type/bug`, `comp/cli`, `comp/gateway`, `area/install-update`, `P2`

这是今日较清晰的“报告—修复”闭环案例。用户指出 store-toolchain 安装方式下 gateway 实际在服务，但 CLI liveness 检测失败。  
该问题已通过 PR #133091 修复，体现维护响应较快。

### 3.5 gateway host 是否应是 gateway-only process

- Issue: [#133086 [Feature]: Let the multiplex host be a gateway-only process](https://github.com/NousResearch/hermes-agent/issues/133086)  
- 状态：OPEN  
- 评论数：2  
- 标签：`type/feature`, `comp/gateway`, `area/config`, `area/profiles`, `needs-decision`

该请求从架构层面提出：multiplex host 是基础设施，不应同时扮演默认 agent profile。  
这与 #133087 的冲突问题方向一致，说明社区对 Hermes 新 gateway/profile 架构的边界有持续关注。  
该议题可能需要维护者做产品和架构决策，而不只是修复单点 bug。

---

## 4. Bug 与稳定性

以下按严重程度、影响范围和是否已有修复 PR 排列。

### P2 / 高优先级

#### 4.1 Desktop generic New Session 可能创建到错误 gateway

- Issue: [#133103 [Bug]: Desktop generic New Session follows a stale explicit owner pin](https://github.com/NousResearch/hermes-agent/issues/133103)  
- 状态：OPEN  
- 标签：`type/bug`, `comp/desktop`, `area/sessions`, `area/profiles`, `P2`  
- Fix PR：未明确发现

在多 gateway connection 的 Desktop 环境中，用户在 gateway B 活跃窗口执行 New Session，可能因为 stale owner pin 导致草稿创建到 gateway A，并让窗口 re-home 到 A。  
这是明显的 session/profile 归属错误，可能造成用户上下文错乱甚至数据写入错误 profile。  
建议维护者优先确认是否与 [#133070](https://github.com/NousResearch/hermes-agent/pull/133070) 的 SSH/profile ownership 修复相关。

#### 4.2 Dashboard WebSocket 重连循环导致 CPU 100%

- Issue: [#132999](https://github.com/NousResearch/hermes-agent/issues/132999)  
- 相关 Issue: [#132962](https://github.com/NousResearch/hermes-agent/issues/132962)  
- 状态：OPEN，标记 duplicate  
- 标签：`type/bug`, `comp/dashboard`, `area/sessions`, `P2`  
- 可能相关 PR: [#133073](https://github.com/NousResearch/hermes-agent/pull/133073), [#133088](https://github.com/NousResearch/hermes-agent/pull/133088)

用户报告 dashboard 中 sidecar WebSocket 短暂断开后，会触发约 250ms 一次的无限重连循环，CPU 可能被打满。  
另一个相关问题描述了状态在 `live → disconnecting → closed → connecting` 间循环，并且 session 在每次 disconnect 时被 reap。  
这属于 session state 与 UI reconnect 策略的回归风险，影响长时间打开 dashboard 的用户。

#### 4.3 Dashboard reconnect 可能杀死运行中的 PTY

- PR: [#133073 fix(dashboard): reattach the running PTY when a reconnect's resume advances along the same chain](https://github.com/NousResearch/hermes-agent/pull/133073)  
- 状态：OPEN  
- 标签：`type/bug`, `comp/dashboard`, `area/sessions`, `P2`

该 PR 修复 dashboard reconnect 场景下，如果 `?resume=` 沿同一 session chain 前进，原逻辑会关闭正在运行的 PTY 并杀死 in-flight turn 的问题。  
这是对 session 恢复可靠性的关键修复，建议优先 review。

#### 4.4 recoverable session close 不应杀死后台进程

- PR: [#133088 fix(agent): keep background processes alive on recoverable session close](https://github.com/NousResearch/hermes-agent/pull/133088)  
- 状态：OPEN  
- 标签：`type/bug`, `comp/agent`, `comp/tui`, `comp/cron`, `tool/terminal`, `area/sessions`, `P2`

该 PR 指出：通过 `terminal(background=true)` 启动的后台进程，会在 Desktop/TUI client 断连超过 orphan reap grace 后被杀死，即使该 session 是可恢复的。  
这会影响长任务、cron、后台终端作业等场景。  
该修复对 Hermes 作为长期运行 agent runtime 的可靠性很关键。

#### 4.5 Local Models 将 companion GGUF 当作可服务模型

- Issue: [#133037](https://github.com/NousResearch/hermes-agent/issues/133037)  
- Fix PR: [#133078](https://github.com/NousResearch/hermes-agent/pull/133078)  
- 状态：Issue OPEN，PR OPEN  
- 标签：`type/bug`, `comp/cli`, `area/local-models`, `P2`

用户报告 `mmproj-*.gguf` 或 audio-codec GGUF 被 Local Models picker、`/model` Local row、`GET /v1/models` 当成可服务模型展示。  
这些 companion assets 没有 chat template、不能实际 serving，容易导致用户选择后失败。  
已有 PR #133078 增加过滤逻辑，建议优先合并。

#### 4.6 `tool_search` 不接受 `query` 单字符串形式

- Issue: [#133107](https://github.com/NousResearch/hermes-agent/issues/133107)  
- 状态：OPEN  
- 标签：`type/bug`, `comp/tools`, `P2`  
- Fix PR：未发现

`tool_search` 暴露描述称可以接受单字符串并当作一个 query，但实际调用 `{"query": "..."}` 会被拒绝，要求 `queries` 必须是字符串数组。  
这是 schema、描述和实际实现不一致，可能影响旧调用方或模型自动生成 tool call 的兼容性。

#### 4.7 Anthropic usage 利用率显示被放大 100 倍

- Issue: [#133106](https://github.com/NousResearch/hermes-agent/issues/133106)  
- 状态：OPEN，标记 duplicate  
- 标签：`type/bug`, `provider/anthropic`, `area/billing`, `area/usage-cost`, `P2`

Anthropic account usage 中，真实 1% 的使用率可能被显示为 100%。  
这会严重误导用户对预算、额度、风险的判断。虽然标记 duplicate，但仍建议确认主 Issue 是否已有修复路径。

#### 4.8 checkpoint 在不可遍历工作目录下记录 git traceback

- Issue: [#133096](https://github.com/NousResearch/hermes-agent/issues/133096)  
- Fix PR: [#133102](https://github.com/NousResearch/hermes-agent/pull/133102)  
- 状态：Issue OPEN，PR OPEN  
- 标签：`type/bug`, `comp/tools`, `P2`

当 session working dir 存在但进程无权限遍历，如 `/root`，checkpoint snapshot 会触发 `PermissionError` 并记录 git traceback。  
PR #133102 修改为跳过不可遍历目录而不是报错，对减少日志噪音和误报很有帮助。

#### 4.9 Desktop Mermaid `<br/>` 标签导致图表不渲染

- Issue: [#133089](https://github.com/NousResearch/hermes-agent/issues/133089)  
- Fix PRs: [#133101](https://github.com/NousResearch/hermes-agent/pull/133101), [#133094](https://github.com/NousResearch/hermes-agent/pull/133094)  
- 状态：Issue OPEN，PR OPEN  
- 标签：`type/bug`, `comp/desktop`, `P2`

Desktop 中 Mermaid 节点 label 含 HTML `<br/>` 时，图表显示为 broken image，alt 文本为 “Mermaid diagram”。  
已有两个修复 PR，分别处理 `<br/>` 标签和 Mermaid 输出的 bare `<br>` 自闭合问题。  
这类问题影响 AI 输出结构图、流程图的阅读体验，尤其对文档、规划和架构分析场景影响较大。

#### 4.10 Desktop/SSH profile inventory 不刷新

- Issue: [#132968](https://github.com/NousResearch/hermes-agent/issues/132968)  
- 关闭重复项: [#132970](https://github.com/NousResearch/hermes-agent/issues/132970)  
- 相关 PR: [#133070](https://github.com/NousResearch/hermes-agent/pull/133070)  
- 状态：Issue OPEN，PR OPEN  
- 标签：`backend/ssh`, `comp/desktop`, `area/profiles`, `P2`

用户报告 Desktop 的 Bots roster 在保存 SSH 连接后，远端新增 profile 不会被发现，直到执行 connection Test。  
PR #133070 试图修正 registered SSH profile ownership，对 Desktop/SSH 多 profile 体验较重要。

#### 4.11 Telegram 大文件上传 timeout 预算不随文件大小扩展

- Issue: [#133093](https://github.com/NousResearch/hermes-agent/issues/133093)  
- 状态：OPEN  
- 标签：`type/bug`, `comp/gateway`, `platform/telegram`, `P2`  
- Fix PR：未发现

Telegram media send 使用固定 read timeout 和 deadline，大文件在慢速 uplink 下容易超时；更糟糕的是，超时的发送可能实际上已被 Telegram 投递。  
这会导致用户重复发送、状态不一致或误判失败，是消息投递可靠性问题。

#### 4.12 `hermes prompt-size` 违反离线承诺

- Issue: [#132998](https://github.com/NousResearch/hermes-agent/issues/132998)  
- 状态：OPEN  
- 标签：`type/bug`, `comp/agent`, `comp/cli`, `provider/openrouter`, `area/local-models`, `P2`  
- Fix PR：未发现

`hermes prompt-size` 文档称不会进行网络调用，但实际每次运行都会请求 OpenRouter model list 并缓存。  
这对离线、本地模型、隐私敏感或受限网络环境用户影响明显，也损害命令行为的可信度。

#### 4.13 OpenAI reasoning replay verdict 被错误清除

- Issue: [#132986](https://github.com/NousResearch/hermes-agent/issues/132986)  
- 状态：OPEN  
- 标签：`type/bug`, `provider/openai`, `area/sessions`, `P2`, `needs-decision`  
- Fix PR：未发现

`reset_codex_reasoning_replay` 会在模型切换、fallback activation、turn-start restore 等路径清除 replay verdict，即使该 route 已经自行获得 verdict。  
这是偏 agent/session 内部状态一致性的 bug，可能影响 reasoning replay 策略判断。

### P3 / 中优先级

#### 4.14 browser_exec 的 Python harness 未进入 Docker sandbox

- Issue: [#133010](https://github.com/NousResearch/hermes-agent/issues/133010)  
- 状态：OPEN  
- 标签：`type/feature`, `tool/browser`, `backend/docker`, `P3`, `sweeper:risk-security-boundary`

当 `terminal.backend: docker` 时，Chromium 在 Docker 内运行，但 `browser_exec` 的模型生成 Python 仍在 host 执行。  
虽然被标为 feature，但从安全边界角度看具有稳定性和安全属性，建议维护者提升关注度。

#### 4.15 Kanban decomposer 子任务调度顺序问题

- Issue: [#133008](https://github.com/NousResearch/hermes-agent/issues/133008)  
- 状态：OPEN  
- 标签：`type/bug`, `comp/cron`, `P3`

用户报告 decomposing triage task 时，如果该任务有 parent，children 会在 parent 完成前被 dispatch。  
这影响 Kanban/cron 自动分解任务的依赖顺序。

---

## 5. 功能请求与路线图信号

### 5.1 sessions CLI 需要更强的可解释性和安全预览

- Issue: [#133013](https://github.com/NousResearch/hermes-agent/issues/133013)  
- 方向：session 管理、CLI UX  
- 纳入下一版本可能性：中高

该请求直指 archive/prune 等操作的安全可见性。考虑到 session state 标签和评论活跃度，若维护者近期聚焦 session 可靠性，该需求有较高机会进入迭代。

### 5.2 cron 需要运行中取消能力

- Issue: [#133057](https://github.com/NousResearch/hermes-agent/issues/133057)  
- 方向：cron control plane  
- 纳入下一版本可能性：中

随着 cron 被用于更复杂任务，取消 in-flight run 是基础控制能力。当前已有多个 cron 相关问题和 PR，例如：

- [#133109 fix(cron): classify credit/budget failures and collapse them to one incident per job](https://github.com/NousResearch/hermes-agent/pull/133109)  
- [#133099 Kanban decomposer: prerequisite feasibility gate](https://github.com/NousResearch/hermes-agent/issues/133099)  
- [#133097 Cron jobs should record and enforce git state](https://github.com/NousResearch/hermes-agent/issues/133097)

这些信号表明 cron 正从简单定时器向更完整的自动化作业系统演进。

### 5.3 cron 需要预算/信用失败归类和 incident 去重

- PR: [#133109](https://github.com/NousResearch/hermes-agent/pull/133109)  
- 状态：OPEN  
- 方向：cron 稳定性、provider billing failure handling  
- 纳入下一版本可能性：高

该 PR 处理 provider key 余额不足、HTTP 402、spending limit 等失败场景，并将金额变化导致的 incident signature 抖动归并为单个 incident。  
这是生产化 cron 运行中非常实际的问题，建议优先 review。

### 5.4 delegation service tier：子 agent 不再继承父 agent 的 Fast/Ultrafast

- PR: [#133092](https://github.com/NousResearch/hermes-agent/pull/133092)  
- 状态：OPEN  
- 标签：`type/feature`, `tool/delegate`, `area/config`, `comp/desktop`, `area/i18n`  
- 纳入下一版本可能性：中高

该 PR 引入 `delegation.service_tier: normal`，使 fast orchestrator 不再让所有 subagent 自动进入 fast tier。  
这与成本控制、token 预算、delegation 规模化使用直接相关。对大量使用子 agent 的用户价值明显。

### 5.5 multiplex host 是否应从 default profile 中解耦

- Issue: [#133086](https://github.com/NousResearch/hermes-agent/issues/133086)  
- 方向：gateway/profile 架构  
- 纳入下一版本可能性：取决于维护者决策

用户希望 multiplex host 是 gateway-only process，而不是默认 agent profile。  
结合 [#133087](https://github.com/NousResearch/hermes-agent/issues/133087) 和 [#133090](https://github.com/NousResearch/hermes-agent/issues/133090)，这说明当前 gateway/profile 模型在多根、多 profile、多安装方式下仍存在设计张力。  
短期可能先以兼容性修复推进，长期可能需要架构调整。

### 5.6 config set 支持 list-type config 中的 named entry

- Issue: [#132963](https://github.com/NousResearch/hermes-agent/issues/132963)  
- 状态：OPEN  
- 方向：CLI 配置管理  
- 纳入下一版本可能性：中

用户希望 `hermes config set` 能通过 name 定位 list 中的映射项，例如 `custom_providers`。  
这反映 Hermes 配置结构复杂度提升后，CLI 配置编辑能力需要升级。

### 5.7 browser_exec Python harness 进入 Docker sandbox

- Issue: [#133010](https://github.com/NousResearch/hermes-agent/issues/133010)  
- 状态：OPEN  
- 方向：安全隔离、Docker backend  
- 纳入下一版本可能性：中

这是 Browser Use 和 sandbox 安全边界的关键补齐。若 Hermes 面向企业/生产场景推进，该功能的重要性会持续上升。

### 5.8 Plugin Catalog 新增 pdf-surgeon

- PR: [#133072 Add pdf-surgeon to the plugin catalog](https://github.com/NousResearch/hermes-agent/pull/133072)  
- 状态：OPEN  
- 方向：插件生态  
- 纳入下一版本可能性：中

该 PR 添加社区插件 `pdf-surgeon`，用于替换 PDF 中的短语。  
说明社区插件生态仍在扩展，但此类 PR 需要关注供应链风险、commit pinning、功能边界和安全审查。

---

## 6. 用户反馈摘要

### 6.1 用户希望 CLI 输出更“可验证”

代表 Issue：

- [#133013](https://github.com/NousResearch/hermes-agent/issues/133013)
- [#132963](https://github.com/NousResearch/hermes-agent/issues/132963)

用户在 session prune/archive 和 config set 场景中，反复表达对“命令做了什么、依据什么、会影响哪些对象”的可见性需求。  
这说明 Hermes CLI 已经进入高风险操作较多的阶段，用户不再满足于命令能执行，而是需要执行前后有可审计、可验证的反馈。

### 6.2 多 profile / 多 gateway 是真实使用场景，不是边缘情况

代表 Issue / PR：

- [#133087](https://github.com/NousResearch/hermes-agent/issues/133087)
- [#133086](https://github.com/NousResearch/hermes-agent/issues/133086)
- [#133103](https://github.com/NousResearch/hermes-agent/issues/133103)
- [#133070](https://github.com/NousResearch/hermes-agent/pull/133070)

用户正在运行多 `HERMES_HOME`、多 profile、多 gateway connection、Desktop/SSH 混合拓扑。  
他们遇到的不是单纯 UI bug，而是 profile ownership、gateway rendezvous、session owner pin 等底层概念的一致性问题。  
这表明 Hermes 的高级部署模式已经被社区实际采用，但实现细节仍需收敛。

### 6.3 用户对“离线、本地、安全边界”承诺较敏感

代表 Issue：

- [#132998](https://github.com/NousResearch/hermes-agent/issues/132998)
- [#133010](https://github.com/NousResearch/hermes-agent/issues/133010)
- [#133037](https://github.com/NousResearch/hermes-agent/issues/133037)

本地模型用户关注命令是否真的离线、local model picker 是否只展示可服务模型、Docker sandbox 是否完整覆盖模型生成代码执行。  
这些反馈说明 Hermes 在 local-first、privacy-sensitive、sandboxed agent 场景中的用户期望较高。

### 6.4 长时间运行任务需要更可靠的生命周期管理

代表 Issue / PR：

- [#133057](https://github.com/NousResearch/hermes-agent/issues/133057)
- [#133088](https://github.com/NousResearch/hermes-agent/pull/133088)
- [#133109](https://github.com/NousResearch/hermes-agent/pull/133109)
- [#133097](https://github.com/NousResearch/hermes-agent/issues/133097)

用户不只是交互式使用 Hermes，而是在运行 cron、后台终端、长任务和自动化流水线。  
因此他们开始要求取消、预算失败归类、git branch pin、后台进程保活等生产级能力。

### 6.5 Desktop 用户对渲染质量和连接状态非常敏感

代表 Issue / PR：

- [#133089](https://github.com/NousResearch/hermes-agent/issues/133089)
- [#133101](https://github.com/NousResearch/hermes-agent/pull/133101)
- [#133094](https://github.com/NousResearch/hermes-agent/pull/133094)
- [#132968](https://github.com/NousResearch/hermes-agent/issues/132968)

Desktop 用户反馈集中在 Mermaid 渲染、SSH profile 刷新、session owner 等可见体验问题。  
这些问题虽然分散，但共同影响 Desktop 作为主入口的稳定感和可信度。

---

## 7. 待处理积压

> 注：本日报仅基于过去 24 小时数据，无法准确判断“长期未响应”。以下列出的是**今日仍未解决且影响面较大的 open Issue / PR**，建议维护者优先 triage 或 review。

### 7.1 建议优先 review 的 P2 修复 PR

1. [#133073 fix(dashboard): reattach the running PTY when a reconnect's resume advances along the same chain](https://github.com/NousResearch/hermes-agent/pull/133073)  
   - 影响：dashboard reconnect、PTY、session chain  
   - 原因：避免 reconnect 杀死 in-flight turn

2. [#133088 fix(agent): keep background processes alive on recoverable session close](https://github.com/NousResearch/hermes-agent/pull/133088)  
   - 影响：background terminal、cron、TUI/Desktop session 恢复  
   - 原因：长期任务可靠性关键

3. [#133078 fix(cli): stop offering companion GGUFs as servable models](https://github.com/NousResearch/hermes-agent/pull/133078)  
   - 影响：local models  
   - 原因：直接修复用户可见错误选择

4. [#133102 fix(checkpoints): skip an untraversable working dir instead of logging a git traceback](https://github.com/NousResearch/hermes-agent/pull/133102)  
   - 影响：checkpoint、tools、日志质量  
   - 原因：低风险稳定性修复

5. [#133070 fix(desktop): align registered SSH profile ownership](https://github.com/NousResearch/hermes-agent/pull/133070)  
   - 影响：Desktop/SSH/profile ownership  
   - 原因：多 profile SSH 体验和 session 归属一致性

6. [#133101 fix(desktop): render Mermaid labels that contain <br/>](https://github.com/NousResearch/hermes-agent/pull/133101)  
   - 相关 PR: [#133094](https://github.com/NousResearch/hermes-agent/pull/133094)  
   - 影响：Desktop Mermaid 渲染  
   - 原因：用户可见、已有明确复现

### 7.2 需要维护者决策的架构 / 产品问题

1. [#133086 Let the multiplex host be a gateway-only process](https://github.com/NousResearch/hermes-agent/issues/133086)  
   - 需要决策：gateway host 是否继续绑定 default profile

2. [#132986 reset_codex_reasoning_replay clears a replay verdict the route already earned](https://github.com/NousResearch/hermes-agent/issues/132986)  
   - 需要决策：reasoning replay verdict 的生命周期和 route ownership

3. [#133097 Cron jobs should record and enforce git state of repo workdirs](https://github.com/NousResearch/hermes-agent/issues/133097)  
   - 需要决策：cron 是否在创建时 pin branch / commit，以及运行时是否强制校验

4. [#133010 Run browser_exec’s Python harness inside the configured Docker sandbox](https://github.com/NousResearch/hermes-agent/issues/133010)  
   - 需要决策：Docker backend 的安全边界是否覆盖所有 model-supplied execution

### 7.3 需要尽快确认是否已有主线修复的 duplicate / 回归

1. [#132999 Infinite WebSocket reconnect loop in ChatSidebar](https://github.com/NousResearch/hermes-agent/issues/132999)  
2. [#132962 Dashboard side-panel connection flaps](https://github.com/NousResearch/hermes-agent/issues/132962)  
3. [#133106 Anthropic account usage utilization <= 1 is rescaled x100](https://github.com/NousResearch/hermes-agent/issues/133106)

这些问题被标记 duplicate，但都属于用户可见度高或影响判断准确性的 P2 问题。建议维护者在 duplicate 关闭前确保主 Issue 有清晰链接、修复 PR 和验证路径。

---

## 总体健康度判断

Hermes Agent 今日表现出非常强的社区输入和维护响应：大量 P2 问题在当天已有对应 PR，说明项目仍处于快速迭代状态。  
但同时，gateway/profile/session/cron/local runtime 等核心模块同时出现较多稳定性问题，表明 v0.21.x 相关的多 profile、多 gateway、长期运行任务能力仍在磨合。  
短期最值得关注的是 **session 恢复链路、Desktop/SSH ownership、gateway liveness、local model 过滤、cron 生命周期控制**。  
如果待合并 PR 能在短期内完成 review，项目稳定性会有明显改善；否则 42 个待合并 PR 可能成为下一阶段的维护瓶颈。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-10-05

仓库：github.com/qwibitai/nanoclaw  
统计窗口：过去 24 小时

---

## 1. 今日速览

过去 24 小时 NanoClaw 活跃度较高：新增/活跃 Issues 4 条，PR 更新 10 条，其中 6 条仍待合并，4 条已关闭或完成。今日重点集中在 **发布流程切换、消息投递可靠性、渠道适配稳定性、Agent/CLI 控制能力、更新器可靠性** 等方向。  
项目发布了 `v2026.10.0-rc.1`，这是引入日历版本号后的首个候选版本，也标志着 `/update-nanoclaw` 默认开始跟随正式发布版本，而不是 `main` 分支最新提交。整体来看，项目处于 **发布候选稳定化阶段**：大量 PR 围绕边缘 Bug、渠道兼容性和安装/升级路径进行修补，健康度良好，但仍有若干影响真实用户体验的稳定性问题待处理。

---

## 2. 版本发布

### v2026.10.0-rc.1

链接：<https://github.com/qwibitai/nanoclaw/releases/tag/v2026.10.0-rc.1>  
相关 PR：[#4025 chore(release): v2026.10.0-rc.1](https://github.com/qwibitai/nanoclaw/pull/4025)

本次发布是 `2026.10.0` 的首个 Release Candidate，具有较强的里程碑意义。

#### 主要变化

- **版本号体系切换**
  - 从传统语义版本 `2.4.0` 迁移到日历版本：
    - `YYYY.M.PATCH`
    - 当前候选版本为 `2026.10.0-rc.1`

- **更新机制变化**
  - `/update-nanoclaw` 默认不再安装 `main` 分支 tip。
  - 更新路径改为跟随已发布的 release。
  - 这降低了用户意外安装未稳定代码的风险，有利于生产环境升级稳定性。

- **预发布通道**
  - `beta` channel 可获取该 release candidate。
  - `stable` channel 预计仍等待正式版发布。

#### 迁移与升级注意事项

- 使用 `/update-nanoclaw` 的用户需要注意：升级行为已经从“追踪 main”转为“追踪发布版本”。
- 如果依赖旧的 `main` 分支滚动更新行为，可能需要调整内部升级流程或通道配置。
- 从相关 PR 信息看，`2026.10.0` 包含 OneCLI 相关升级路径变化，Linux 用户尤其需要关注 `ONECLI_URL` 与本地 gateway 检测配置。
  - 相关文档修复：[#4028](https://github.com/qwibitai/nanoclaw/pull/4028)

---

## 3. 项目进展

过去 24 小时共有 4 个 PR 已关闭或完成。由于数据中仅显示 `CLOSED`，无法严格区分已合并与关闭未合并，但这些 PR 反映了项目今日推进方向。

### 发布工程推进

#### #4025 chore(release): v2026.10.0-rc.1

链接：<https://github.com/qwibitai/nanoclaw/pull/4025>

该 PR 完成了 `v2026.10.0-rc.1` 发布准备，推动 NanoClaw 进入日历版本时代。它是今日最重要的项目级进展，说明维护团队正在为 `2026.10.0` 正式版做最后验证。

影响：

- 明确 release candidate 发布路径。
- 更新版本号至 `2026.10.0-rc.1`。
- 为后续 stable release 奠定基础。

---

### OneCLI 升级文档修复

#### #4028 docs(add-onecli): check the gateway at ONECLI_URL in the upgrade guide

链接：<https://github.com/qwibitai/nanoclaw/pull/4028>

该 PR 修复了 OneCLI 升级指南中的检测地址问题。原文档默认检查 `127.0.0.1:10254`，但 Linux 本地 gateway 可能监听 Docker bridge，并通过 `ONECLI_URL` 暴露。

影响：

- 改善 Linux 用户升级 OneCLI 的可操作性。
- 降低 `2026.10.0` 升级过程中因网关地址错误导致的误判。
- 与即将到来的 release candidate 升级路径强相关。

---

### WhatsApp 安全加固

#### #4024 fix(add-whatsapp): pin Baileys 7.0.0-rc14 for the message-spoofing fix

链接：<https://github.com/qwibitai/nanoclaw/pull/4024>

该 PR 将 `/add-whatsapp` 使用的 Baileys 版本固定到 `7.0.0-rc14`，以规避消息伪造相关安全公告。

影响：

- 修复潜在严重安全风险。
- 涉及 WhatsApp channel、安装流程和 skill 分发。
- 对生产环境使用 WhatsApp 集成的用户较为重要。

---

### 其他关闭 PR

#### #4023 Checklist shopping buttons

链接：<https://github.com/qwibitai/nanoclaw/pull/4023>

该 PR 覆盖标签较多，包括 agent-runner、channels、configuration、containers、core、credentials、ncl-cli、security、skills、tools 等多个区域。但摘要内容主要保留了 PR 模板，缺少明确变更说明。

维护建议：

- 若该 PR 已合并，建议补充合并说明。
- 若未合并而关闭，建议说明关闭原因，避免后续追踪困难。

---

## 4. 社区热点

从当前数据看，今日没有明显的“高评论/高反应”讨论热点：

- Issues 评论数均为 0。
- Issues 点赞数均为 0。
- PR 评论数据未提供或为 `undefined`。
- 互动主要体现为密集的 Bug fix PR 创建，而非 Issue 讨论。

尽管如此，从议题分布看，社区关注点集中在以下方向：

### 渠道消息可靠性

相关 PR：

- [#4031 fix(telegram): give the getUpdates long poll a client-side deadline](https://github.com/qwibitai/nanoclaw/pull/4031)
- [#4030 fix(channels): wrap long ask_question option lists into rows](https://github.com/qwibitai/nanoclaw/pull/4030)
- [#4029 fix(telegram): render links with an underscore in the URL as plain text](https://github.com/qwibitai/nanoclaw/pull/4029)
- [#4024 fix(add-whatsapp): pin Baileys 7.0.0-rc14 for the message-spoofing fix](https://github.com/qwibitai/nanoclaw/pull/4024)

背后诉求：

- Telegram、Discord、WhatsApp 等外部渠道的限制和格式差异正在成为主要稳定性来源。
- 用户希望 AI Agent 在多渠道中表现一致，不丢消息、不截断按钮、不因 Markdown/URL 解析失败而吞回复。

---

### Agent 控制能力与多 Agent 编排

相关 Issue / PR：

- [#4027 Let an agent restart and clear the agents it created](https://github.com/qwibitai/nanoclaw/issues/4027)
- [#4026 fix(cli): groups restart --id <other group> from an agent restarts the target](https://github.com/qwibitai/nanoclaw/pull/4026)

背后诉求：

- 用户正在构建 coordinator agent / child agent 的层级式工作流。
- 现有 CLI guard 和 group restart 行为限制了父 Agent 对子 Agent 的生命周期管理。
- 这说明 NanoClaw 的使用场景正在从单 Agent 对话扩展到多 Agent 编排。

---

### 更新器与发布稳定性

相关 Issue / PR：

- [#4021 update (macOS): stopService returns before the host exits](https://github.com/qwibitai/nanoclaw/issues/4021)
- [#4025 chore(release): v2026.10.0-rc.1](https://github.com/qwibitai/nanoclaw/pull/4025)
- [#4028 docs(add-onecli): check the gateway at ONECLI_URL in the upgrade guide](https://github.com/qwibitai/nanoclaw/pull/4028)

背后诉求：

- 用户希望升级过程具备事务性、安全回滚、避免服务停止竞态。
- 随着 `/update-nanoclaw` 改为跟随 release，升级器自身可靠性变得更关键。

---

## 5. Bug 与稳定性

以下按潜在严重程度排序。

### 高严重度：macOS 更新流程存在服务停止竞态

#### #4021 update (macOS): stopService returns before the host exits, so the snapshot races shutdown and the re-bootstrap fails with I/O error 5

链接：<https://github.com/qwibitai/nanoclaw/issues/4021>  
状态：Open  
是否已有 fix PR：当前数据中未看到直接对应 PR

问题摘要：

- `/update-nanoclaw` 在 macOS 上通过 `launchctl bootout` 停止服务后立即继续执行。
- 但 host 进程可能尚未真正退出。
- 后续 snapshot / re-bootstrap 与进程关闭发生竞态，导致 I/O error 5。
- 真实案例中，从 `2.3.0` 升级到 `2.4.0` 时出现 cutover 失败，虽然回滚成功，但造成升级中断。

影响评估：

- 影响升级可靠性。
- 对 release candidate 到正式版升级路径尤其关键。
- 建议优先处理，至少应增加等待进程退出、超时、重试和明确日志。

---

### 高严重度：poll-loop follow-up 路由错位

#### #4033 poll-loop: a follow-up folded into the running turn leaves the turn queue one behind

链接：<https://github.com/qwibitai/nanoclaw/issues/4033>  
状态：Open  
是否已有 fix PR：当前数据中未看到直接对应 PR

问题摘要：

- `processQuery` 为每个 follow-up 入队一个 `QueuedTurn`。
- 每次 provider 返回 `result` 时采用下一个 queued turn 的路由。
- 该逻辑假设每个 pushed input 一定对应一个 result。
- 当 follow-up 被折叠进当前 turn 时，turn queue 可能滞后一位。
- 后续回复可能被标记为前一条消息的 `in_reply_to`。

影响评估：

- 影响消息路由准确性。
- 可能导致回复串线、上下文关联错误。
- 对多轮交互和并发 follow-up 场景风险较高。

---

### 中高严重度：消息永久投递失败后 Agent 不知情

#### #4032 fix(delivery): tell the agent when a message permanently fails to deliver

链接：<https://github.com/qwibitai/nanoclaw/pull/4032>  
状态：Open  
对应问题：已有 fix PR

问题摘要：

- 达到 `MAX_DELIVERY_ATTEMPTS` 后，delivery loop 只在 session DB 中将 outbound row 标记为 failed。
- Agent 本身没有收到失败通知。
- 结果是 Agent 误以为消息已经发出，无法补救或告知用户。

影响评估：

- 影响系统可观测性和 Agent 自我修正能力。
- 对多渠道消息发送尤其重要。
- 该 PR 若合并，将提升投递失败场景下的透明度。

---

### 中高严重度：Telegram getUpdates 长轮询在网络变化后可能卡住

#### #4031 fix(telegram): give the getUpdates long poll a client-side deadline

链接：<https://github.com/qwibitai/nanoclaw/pull/4031>  
状态：Open  
对应问题：已有 fix PR

问题摘要：

- Telegram adapter 使用 `getUpdates` 长轮询，但缺少客户端超时。
- 在 Wi-Fi/NAT 变化等黑洞连接场景中，请求可能长期挂起。
- 结果是 inbound 消息处理可停滞约 15 分钟。

影响评估：

- 影响 Telegram 渠道实时性。
- 修复方向明确：增加 client-side deadline。
- 建议纳入 `2026.10.0` 正式版前的稳定性修复清单。

---

### 中严重度：Telegram 含下划线 URL 可能导致回复被丢弃

#### #4029 fix(telegram): render links with an underscore in the URL as plain text

链接：<https://github.com/qwibitai/nanoclaw/pull/4029>  
状态：Open  
更新时间：2026-10-05  
对应问题：已有 fix PR

问题摘要：

- GFM parser 将裸 email 或 URL 自动链接成 Markdown 链接。
- 若 URL 中包含 `_`，Telegram Markdown 解析可能失败。
- 结果是包含该链接的回复被 Telegram 丢弃。
- 典型例子包括：
  - `first_last@example.com`
  - `...?agent_name=x`

影响评估：

- 这是高频真实使用场景，尤其是邮箱、参数化 URL。
- 修复方式为将此类链接渲染为纯文本，牺牲部分格式化以换取可靠投递。

---

### 中严重度：ask_question 选项过多时按钮被截断

#### #4030 fix(channels): wrap long ask_question option lists into rows

链接：<https://github.com/qwibitai/nanoclaw/pull/4030>  
状态：Open  
对应问题：已有 fix PR

问题摘要：

- bridge 将所有 option 放在同一 Actions row。
- Telegram 单行最多显示约 8 个按钮，Discord 约 5 个。
- 选项过多或标签过长时，后面的选项可能不可见或被截断。

影响评估：

- 影响交互式 Agent 的可用性。
- 与 checklist、表单、选择题、购物按钮等场景相关。
- 修复后可提升跨渠道 UI 一致性。

---

### 中严重度：agent-runner 未反转 inbound escapeXml

#### #4020 agent-runner: inbound escapeXml is never reversed

链接：<https://github.com/qwibitai/nanoclaw/issues/4020>  
状态：Open  
是否已有 fix PR：当前数据中未看到直接对应 PR

问题摘要：

- 用户消息中的 `&` 等字符被转义为 XML entity 后未恢复。
- 当 Agent 复述用户输入时，会出现 `&amp;`。
- 示例：
  - 用户输入：`https://example.com/a?x=1&agent_name=Andy`
  - 回复中出现：`https://example.com/a?x=1&amp;agent_name=Andy`

影响评估：

- 影响回复质量和链接可用性。
- 与 #4029 一样，都指向“链接/特殊字符跨层传输不稳定”的问题。
- 建议与 channel formatting、agent-runner escaping 一并梳理。

---

### 低至中严重度：OneCLI detector 测试在 CI 负载下超时

#### #4022 test: give subprocess-spawning OneCLI detector test a 30s timeout

链接：<https://github.com/qwibitai/nanoclaw/pull/4022>  
状态：Open  
对应问题：已有 fix PR

问题摘要：

- `setup/gateways/onecli-detection.test.ts` 中测试会通过 `execFileSync` 启动真实 `pnpm exec tsx`。
- 在全量 CI 负载下可能超时。
- PR 通过增加 30 秒 timeout 降低 CI flakes。

影响评估：

- 主要影响维护者效率和 CI 稳定性。
- 对用户运行时影响较小。
- 适合尽快合并以减少发布前噪声。

---

## 6. 功能请求与路线图信号

### 多 Agent 生命周期管理能力增强

#### #4027 [capability] Let an agent restart and clear the agents it created

链接：<https://github.com/qwibitai/nanoclaw/issues/4027>  
状态：Open

用户诉求：

- 一个 coordinator agent 创建了其他 agent 后，希望能够：
  - restart 子 agent
  - clear 子 agent 上下文
  - 对自己创建的 agent 执行生命周期管理

当前限制：

- 默认 `cli_scope: group` 下，`src/cli/guard.ts` 会拒绝 foreign `--id`。
- 因此 coordinator agent 无法通过 `ncl groups restart --id <child>` 管理子 agent。

相关 PR：

- [#4026 fix(cli): groups restart --id <other group> from an agent restarts the target](https://github.com/qwibitai/nanoclaw/pull/4026)

路线图信号：

- #4026 已经修复 agent 调用 `groups restart --id <other group>` 时忽略 `--id` 的问题。
- #4027 则提出更完整的 capability：不仅 restart，还包括 clear/reset 上下文。
- 该方向很可能进入后续版本，因为它直接支撑多 Agent 编排、父子 Agent 管理和自动化运维型 Agent 场景。

---

### 跨渠道交互组件一致性

相关 PR：

- [#4030](https://github.com/qwibitai/nanoclaw/pull/4030)
- [#4023](https://github.com/qwibitai/nanoclaw/pull/4023)

路线图信号：

- `ask_question` 选项换行、shopping/checklist buttons 等议题显示，NanoClaw 正在加强 Agent 与用户之间的结构化交互能力。
- Telegram、Discord 等不同渠道的 UI 限制需要抽象层处理，而不是让 skill 或 agent 直接适配每个平台。
- 后续可能需要统一的 channel capability model，例如：
  - 每行按钮数量上限
  - label 长度上限
  - Markdown 支持矩阵
  - fallback rendering 策略

---

### 发布/升级稳定化

相关条目：

- [#4021](https://github.com/qwibitai/nanoclaw/issues/4021)
- [#4025](https://github.com/qwibitai/nanoclaw/pull/4025)
- [#4028](https://github.com/qwibitai/nanoclaw/pull/4028)

路线图信号：

- 随着 `/update-nanoclaw` 从追踪 main 转向追踪 releases，升级体验正在成为正式产品化能力的一部分。
- macOS service stop 竞态和 OneCLI gateway 检测问题表明，安装/升级系统仍需更多平台级验证。
- 正式版发布前，建议将 updater 可靠性列为 release blocker 候选项。

---

## 7. 用户反馈摘要

虽然今日 Issues 没有评论，但从 issue 描述可以提炼出较清晰的真实用户痛点。

### 1. 用户希望升级过程“可相信、可恢复、不中断”

来源：[#4021](https://github.com/qwibitai/nanoclaw/issues/4021)

用户在 macOS 上执行版本升级时遇到服务停止竞态，导致 re-bootstrap 失败。虽然系统完成回滚，但用户仍承担了升级失败的时间成本。

痛点：

- 升级命令返回并不代表服务真正停止。
- 用户难以判断当前处于停止中、快照中、回滚中还是已恢复。
- 对生产或长期运行 Agent 来说，升级不确定性会削弱信任。

---

### 2. 用户需要多 Agent 编排中的“父控子”能力

来源：[#4027](https://github.com/qwibitai/nanoclaw/issues/4027)

用户正在使用 coordinator agent 创建和管理其他 agent，但现有 CLI guard 阻止其操作子 agent。

痛点：

- coordinator 无法 reset child agent 上下文。
- agent 自身无法完成完整的生命周期治理。
- 用户需要更细粒度的权限模型，而不是简单禁止 foreign `--id`。

---

### 3. 用户对消息格式的容错预期较高

来源：

- [#4020](https://github.com/qwibitai/nanoclaw/issues/4020)
- [#4029](https://github.com/qwibitai/nanoclaw/pull/4029)
- [#4030](https://github.com/qwibitai/nanoclaw/pull/4030)

痛点：

- 用户发送的 URL、邮箱、带参数链接应能被原样复述。
- 按钮选项不应因为平台限制丢失尾部内容。
- Telegram 不应因为 Markdown 边缘情况直接丢弃整条回复。

这些反馈说明，用户已将 NanoClaw 用于较真实的工作流，而非简单 demo 对话。

---

### 4. Agent 需要知道自己是否真的完成了任务

来源：[#4032](https://github.com/qwibitai/nanoclaw/pull/4032)

当前消息永久发送失败后，Agent 没有收到反馈，只在数据库中记录 failed。

痛点：

- Agent 无法向用户解释“消息没发出去”。
- 无法触发备用渠道、重试策略或人工介入。
- 对自治型 Agent 来说，这是关键闭环缺口。

---

## 8. 待处理积压

当前数据只覆盖过去 24 小时，未提供长期未响应 Issue/PR 的完整历史。因此无法判断真正意义上的“长期积压”。但以下仍是需要维护者优先关注的开放项。

### 优先级 P0 / P1

#### #4021 macOS 更新器 stopService 竞态

链接：<https://github.com/qwibitai/nanoclaw/issues/4021>

原因：

- 影响升级可靠性。
- 当前未见对应修复 PR。
- 与 `v2026.10.0` 发布路径强相关。

建议：

- 在 macOS `launchctl bootout` 后等待 host 进程真实退出。
- 增加 timeout、重试和明确错误信息。
- 将该场景加入升级集成测试。

---

#### #4033 poll-loop turn queue 路由错位

链接：<https://github.com/qwibitai/nanoclaw/issues/4033>

原因：

- 可能导致回复 `in_reply_to` 指向错误消息。
- 对多轮对话、follow-up 和并发消息处理影响较大。
- 当前未见修复 PR。

建议：

- 明确 provider result 与 pushed input 的对应关系。
- 对 folded follow-up 场景增加测试。
- 检查 `adoptTurn` 是否应基于实际 result metadata，而非简单队列前进。

---

### 优先级 P1 / P2

#### #4020 agent-runner XML entity 未反转

链接：<https://github.com/qwibitai/nanoclaw/issues/4020>

原因：

- 影响 URL、邮箱、引用文本等常见内容。
- 与 Telegram URL/Markdown 问题存在交叉。
- 当前未见修复 PR。

建议：

- 梳理 inbound escaping 与 outbound rendering 边界。
- 避免重复 escape 或漏 unescape。
- 增加包含 `&`、`_`、邮箱、query string 的端到端测试。

---

#### #4026 agent restart other group 行为修复

链接：<https://github.com/qwibitai/nanoclaw/pull/4026>

原因：

- 与 #4027 的 capability request 直接相关。
- 修复 `--id` 被忽略导致重启 caller 而非 target 的问题。
- 若验证通过，建议尽快合并，为后续多 Agent 管理能力打基础。

---

#### #4029 Telegram 下划线 URL 处理

链接：<https://github.com/qwibitai/nanoclaw/pull/4029>

原因：

- 真实场景高频。
- 已在 2026-10-05 更新，说明仍处于活跃推进中。
- 建议尽快 review，以降低 Telegram 回复丢失风险。

---

#### #4031 Telegram long poll deadline

链接：<https://github.com/qwibitai/nanoclaw/pull/4031>

原因：

- 直接影响 Telegram inbound 消息延迟。
- 网络变化后卡住 15 分钟对用户体验影响明显。
- 修复简单且收益明确。

---

#### #4032 永久投递失败通知 Agent

链接：<https://github.com/qwibitai/nanoclaw/pull/4032>

原因：

- 补齐 Agent 任务闭环。
- 对自治 Agent、多渠道投递和错误恢复能力很关键。
- 建议合并前重点确认失败通知不会造成递归发送或重复告警。

---

## 总体健康度判断

NanoClaw 今日处于 **高活跃、发布候选稳定化、Bug 修复密集** 的状态。`v2026.10.0-rc.1` 表明项目进入新的版本治理阶段，更新机制从 main tip 转向 release，是成熟度提升的重要信号。  
当前主要风险集中在三类：升级器竞态、消息路由/投递可靠性、跨渠道格式兼容。若 #4021、#4033、#4020 等开放问题能在正式版前得到修复或明确降级策略，`2026.10.0` 的发布质量将显著提升。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报（2026-10-05）

## 1. 今日速览

过去 24 小时，NullClaw 活跃度较高：共有 **4 条 Issue 更新**、**5 条 PR 更新**，但 **没有 PR 合并**，也 **没有新版本发布**。  
今日动态主要集中在 **运行时稳定性、Docker 可用性、Git hooks 开发体验、WebSocket 停止语义** 以及 **Web 搜索能力扩展**。  
从信号看，社区正在集中修复“真实部署/真实开发流程”中的阻塞问题，例如 Docker 镜像无法启动、Termux 输出损坏、worktree 下 pre-push 失败。  
项目健康度整体表现为：**问题发现和修复响应较快，但待合并 PR 堆积增加，维护者需要尽快 review 关键修复类 PR**。

---

## 2. 项目进展

今日 **没有已合并 PR**，因此主分支功能层面暂无实际落地变更。  
不过，多个待合并 PR 已经针对关键问题给出修复或增强方案，若顺利合并，预计会显著改善容器部署、开发工作流和网络通道稳定性。

### 待合并但具备较高推进价值的 PR

#### PR #1023 — 修复 Docker 非 root 镜像 HOME 不可写问题  
- 链接：https://github.com/nullclaw/nullclaw/pull/1023  
- 作者：Arthur031221  
- 状态：Open  
- 关联 Issue：[#1017](https://github.com/nullclaw/nullclaw/issues/1017)  
- 作用：修复默认 Docker 镜像启动 gateway 时因目录所有权错误导致的 `AccessDenied`。  
- 影响：这是一个部署阻塞型问题，若合并，将恢复 Docker 镜像在默认运行方式下的可用性。

#### PR #1021 — 修复 worktree 下 pre-push hooks 失败  
- 链接：https://github.com/nullclaw/nullclaw/pull/1021  
- 作者：vernonstinebaker  
- 状态：Open  
- 关联 Issue：[#1020](https://github.com/nullclaw/nullclaw/issues/1020)  
- 作用：在 pre-push 测试运行前清理继承的 `GIT_DIR`，避免测试错误地操作主仓库。  
- 影响：改善维护者和贡献者在 Git worktree 工作流下的开发体验。

#### PR #1025 — 为 WebSocket DNS/TCP 建连增加边界  
- 链接：https://github.com/nullclaw/nullclaw/pull/1025  
- 作者：vernonstinebaker  
- 状态：Open  
- 关联 Issue：[#1024](https://github.com/nullclaw/nullclaw/issues/1024)  
- 作用：限制 DNS 解析和 TCP 建连阶段，避免 channel stop 在 connect 阶段无法中断。  
- 影响：提升网络通道在黑洞地址、慢 DNS、异常网络环境下的可控性。

#### PR #1022 — 新增 Serply Web Search Provider  
- 链接：https://github.com/nullclaw/nullclaw/pull/1022  
- 作者：googio  
- 状态：Open  
- 作用：新增 Serply 作为 `web_search` 可选搜索提供方。  
- 影响：扩展工具生态，为用户提供更多搜索后端选择。

#### PR #1019 — 增强 HTTP curl transport 字节级完整性测试  
- 链接：https://github.com/nullclaw/nullclaw/pull/1019  
- 作者：vernonstinebaker  
- 状态：Open  
- 作用：增加大 payload、请求体保留、Android `fetchWithCurl`、重复传输等测试覆盖。  
- 影响：针对 HTTP 传输层的截断、乱序、状态泄漏问题建立回归保护。

---

## 3. 社区热点

### 最高优先级讨论：Termux / Android 输出静默损坏  
- Issue：[#1018](https://github.com/nullclaw/nullclaw/issues/1018)  
- 状态：Closed  
- 评论数：2  
- 作者：vernonstinebaker  
- 摘要：在 `aarch64-linux-android` / Termux 环境中，`nullclaw agent -m "<exact string>"` 会频繁返回被打乱或截断的字符串，但进程仍以 `0` 退出，且没有错误日志。  
- 热点原因：  
  - 这是一个 **静默数据损坏** 问题，比显式崩溃更危险。  
  - 用户无法通过退出码或日志感知失败，可能导致自动化流程误判。  
  - 该问题与 Android/Termux 支持密切相关，影响移动端或轻量环境使用者。  
- 当前进展：Issue 已关闭；同时 PR [#1019](https://github.com/nullclaw/nullclaw/pull/1019) 增加 curl transport 字节完整性测试，可能是相关防线的一部分。

### Docker 镜像默认启动失败  
- Issue：[#1017](https://github.com/nullclaw/nullclaw/issues/1017)  
- PR：[#1023](https://github.com/nullclaw/nullclaw/pull/1023)  
- 状态：Issue Open，PR Open  
- 评论数：1  
- 摘要：Docker 镜像中 `/nullclaw-data` 或 HOME 在 `COPY` 后由 root 拥有，但进程以 uid `65534` 运行，导致 gateway 启动时 `AccessDenied`。  
- 热点原因：  
  - 直接影响容器化部署的第一体验。  
  - 属于“按官方镜像/默认 Docker 方式运行即失败”的高优先级问题。  
  - 已有明确修复 PR，建议优先 review。

### Worktree 工作流下 pre-push 总是失败  
- Issue：[#1020](https://github.com/nullclaw/nullclaw/issues/1020)  
- PR：[#1021](https://github.com/nullclaw/nullclaw/pull/1021)  
- 状态：Issue Open，PR Open  
- 摘要：从 Git worktree 执行 `git push` 时，`GIT_DIR` 被导出，导致测试中再调用 git 时错误地操作当前仓库而非临时 fixture。  
- 热点原因：  
  - Worktree 是该仓库文档化的维护者工作流。  
  - 该问题会阻塞贡献者提交变更。  
  - 修复路径明确，适合快速合并。

---

## 4. Bug 与稳定性

按影响程度排序如下：

### 严重：Termux / Android agent 输出静默损坏  
- Issue：[#1018](https://github.com/nullclaw/nullclaw/issues/1018)  
- 状态：Closed  
- 严重程度：高  
- 影响范围：Termux、`aarch64-linux-android`、可能涉及 Android curl transport 或 agent 输出路径。  
- 现象：  
  - 输出被打乱或截断。  
  - 进程退出码仍为 `0`。  
  - 无错误日志。  
- 风险：自动化场景中会把错误输出当作成功结果处理。  
- 相关 PR：[#1019](https://github.com/nullclaw/nullclaw/pull/1019)  
- 分析：虽然 Issue 已关闭，但从 PR #1019 的测试内容看，项目正在补充字节级传输完整性回归测试，以防类似问题复发。

### 严重：Docker gateway 因权限问题无法启动  
- Issue：[#1017](https://github.com/nullclaw/nullclaw/issues/1017)  
- Fix PR：[#1023](https://github.com/nullclaw/nullclaw/pull/1023)  
- 状态：Issue Open，PR Open  
- 严重程度：高  
- 影响范围：默认 Docker 镜像、gateway 启动流程、非 root 运行环境。  
- 现象：容器启动后立即因 `AccessDenied` 退出。  
- 根因：`/nullclaw-data` 或 HOME 在镜像构建 `COPY` 后保持 `root:root`，但运行进程是 uid `65534`。  
- 建议：优先合并 PR #1023，并考虑增加 Docker 启动 smoke test，防止镜像权限回归。

### 中高：Git worktree 下 pre-push hooks 必然失败  
- Issue：[#1020](https://github.com/nullclaw/nullclaw/issues/1020)  
- Fix PR：[#1021](https://github.com/nullclaw/nullclaw/pull/1021)  
- 状态：Issue Open，PR Open  
- 严重程度：中高  
- 影响范围：使用 Git worktree 的维护者与贡献者。  
- 现象：`git push` 导出的 `GIT_DIR` 污染测试进程，使测试中的 git 命令操作错误仓库。  
- 风险：阻塞贡献流程，降低外部贡献效率。  
- 建议：尽快 review 并合并；这类开发流程修复通常风险较低、收益直接。

### 中：WebSocket stop 不能中断 DNS/TCP 建连阶段  
- Issue：[#1024](https://github.com/nullclaw/nullclaw/issues/1024)  
- Fix PR：[#1025](https://github.com/nullclaw/nullclaw/pull/1025)  
- 状态：Issue Open，PR Open  
- 严重程度：中  
- 影响范围：WebSocket channel、异常网络、黑洞地址、慢 DNS 环境。  
- 现象：在 `connectTcp` 返回前，还没有可关闭的 descriptor，因此 channel stop 无法中断 DNS/TCP 建连。  
- 风险：停止操作可能阻塞数分钟，影响 agent 或服务的响应性。  
- 建议：合并前重点 review timeout 语义、错误传播和兼容性。

---

## 5. 功能请求与路线图信号

### WebSocket 建连阶段可控停止  
- Issue：[#1024](https://github.com/nullclaw/nullclaw/issues/1024)  
- PR：[#1025](https://github.com/nullclaw/nullclaw/pull/1025)  
- 类型：稳定性增强 / 网络控制能力  
- 路线图信号：NullClaw 正在强化长连接、通道生命周期和 stop/cancel 语义。  
- 纳入下一版本可能性：高。已有实现 PR，且来自已批准变更的后续任务。

### 新增 Serply 作为 Web Search Provider  
- PR：[#1022](https://github.com/nullclaw/nullclaw/pull/1022)  
- 类型：功能扩展  
- 摘要：添加 Serply，使用 `https://api.serply.io/v1/search`，通过 `X-Api-Key` 调用，解析搜索结果字段。  
- 路线图信号：项目正在扩展工具调用层，尤其是 Web Search provider 的可插拔生态。  
- 纳入下一版本可能性：中高。功能相对独立，但需要 review API 配置、错误处理、速率限制和文档。

### HTTP curl transport 完整性测试  
- PR：[#1019](https://github.com/nullclaw/nullclaw/pull/1019)  
- 类型：测试增强 / 稳定性路线  
- 路线图信号：维护者正在把“传输层字节级正确性”作为基础保障，尤其关注 Android 与大 payload。  
- 纳入下一版本可能性：高。测试类 PR 通常风险较低，且与已关闭的 Termux 输出损坏问题相关。

---

## 6. 用户反馈摘要

### 容器用户的核心痛点：默认镜像应开箱即用  
- 来源：[#1017](https://github.com/nullclaw/nullclaw/issues/1017)  
- 用户场景：使用 Docker 构建并运行 NullClaw gateway。  
- 不满意点：默认运行方式直接失败，错误为 `AccessDenied`，用户需要理解 uid、目录所有权和镜像构建细节才能定位。  
- 产品启示：容器镜像需要更强的端到端验证，尤其是非 root 用户运行时的写权限。

### 移动端 / Termux 用户的核心痛点：结果必须可信  
- 来源：[#1018](https://github.com/nullclaw/nullclaw/issues/1018)  
- 用户场景：在 Android Termux 中运行 `nullclaw agent` 并依赖命令输出。  
- 不满意点：输出损坏但退出码为 0，无日志、无错误提示。  
- 产品启示：对 agent 类工具而言，“静默错误”比“显式失败”更不可接受；需要加强校验、日志和测试覆盖。

### 贡献者的核心痛点：官方工作流不能被 hooks 阻塞  
- 来源：[#1020](https://github.com/nullclaw/nullclaw/issues/1020)  
- 用户场景：按照项目文档使用 Git worktree 维护多个分支或变更。  
- 不满意点：pre-push hook 在 worktree 下必然失败，且原因并非代码质量问题，而是环境变量污染。  
- 产品启示：维护者工具链需要覆盖官方推荐工作流，否则会降低贡献效率。

### 网络环境异常时的核心诉求：stop 应该及时生效  
- 来源：[#1024](https://github.com/nullclaw/nullclaw/issues/1024)  
- 用户场景：WebSocket 连接到不可达地址、黑洞 peer 或 DNS 卡住。  
- 不满意点：channel stop 无法中断 connect 前阶段。  
- 产品启示：NullClaw 在长连接、agent 通信、工具通道方面需要更严格的超时和取消语义。

---

## 7. 待处理积压

今日没有发现“长期未响应”的历史积压项；本次数据中的 Issue 与 PR 均为 2026-10-04 至 2026-10-05 的近期活动。  
不过，当前有 **5 个 Open PR**，其中多个是修复阻塞问题的高价值变更，建议维护者按优先级处理：

1. **优先级 P0：Docker 镜像权限修复**  
   - PR：[#1023](https://github.com/nullclaw/nullclaw/pull/1023)  
   - 关联 Issue：[#1017](https://github.com/nullclaw/nullclaw/issues/1017)  
   - 原因：影响默认容器启动，属于部署阻塞。

2. **优先级 P1：pre-push worktree 修复**  
   - PR：[#1021](https://github.com/nullclaw/nullclaw/pull/1021)  
   - 关联 Issue：[#1020](https://github.com/nullclaw/nullclaw/issues/1020)  
   - 原因：影响贡献者工作流，且修复范围清晰。

3. **优先级 P1：HTTP curl transport 完整性测试**  
   - PR：[#1019](https://github.com/nullclaw/nullclaw/pull/1019)  
   - 关联 Issue：[#1018](https://github.com/nullclaw/nullclaw/issues/1018)  
   - 原因：为 Android/Termux 输出损坏类问题提供回归保护。

4. **优先级 P2：WebSocket DNS/TCP 建连边界**  
   - PR：[#1025](https://github.com/nullclaw/nullclaw/pull/1025)  
   - 关联 Issue：[#1024](https://github.com/nullclaw/nullclaw/issues/1024)  
   - 原因：提升异常网络环境下的 stop/cancel 行为。

5. **优先级 P2：Serply 搜索提供方**  
   - PR：[#1022](https://github.com/nullclaw/nullclaw/pull/1022)  
   - 原因：功能扩展价值明确，但不属于阻塞性修复。

---

## 维护者关注建议

- **尽快合并高优先级修复 PR**：尤其是 [#1023](https://github.com/nullclaw/nullclaw/pull/1023)、[#1021](https://github.com/nullclaw/nullclaw/pull/1021)、[#1019](https://github.com/nullclaw/nullclaw/pull/1019)。  
- **为 Docker 镜像增加 CI smoke test**：至少覆盖 gateway 启动和非 root 用户写入路径。  
- **加强 Android/Termux 回归测试**：Issue [#1018](https://github.com/nullclaw/nullclaw/issues/1018) 暴露的是静默数据损坏，应避免仅依赖手工验证。  
- **统一网络超时与取消语义**：PR [#1025](https://github.com/nullclaw/nullclaw/pull/1025) 指向了更系统的问题，即 stop/cancel 是否能覆盖 DNS、TCP、TLS、WebSocket 各阶段。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

⚠️ 摘要生成失败。

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

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

⚠️ 摘要生成失败。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*