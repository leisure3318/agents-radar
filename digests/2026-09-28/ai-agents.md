# OpenClaw 生态日报 2026-09-28

> Issues: 12 | PRs: 46 | 覆盖项目: 13 个 | 生成时间: 2026-09-28 04:16 UTC

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

# OpenClaw 项目动态日报｜2026-09-28

## 1. 今日速览

过去 24 小时 OpenClaw 活跃度很高：Issues 更新 12 条，其中 11 条仍处于 Open；PR 更新 46 条，其中 32 条仍待合并，14 条已合并或关闭。今日新增问题集中在 **Gateway 稳定性、Windows 更新/锁文件、会话状态丢失、消息投递失败** 等核心路径，且出现多个 P0 / release blocker 标签，说明当前主线或稳定版本仍存在较强的发布阻塞风险。  
PR 侧维护活动密集，覆盖 Slack、Claude CLI、MiniMax、Browser、iOS、Gateway、CI/Tooling、插件 OAuth、Web UI 等多个子系统，但大量 PR 仍处于 `waiting on author`、`needs proof` 或 `ready for maintainer look` 状态，维护者评审压力较高。整体来看，项目工程推进速度快，但稳定性债务和发布门禁压力也同步上升。

---

## 2. 项目进展

> 今日无新版本发布。本节聚焦过去 24 小时已关闭/完成或接近落地的重要 PR。部分 PR 数据仅标记为 `CLOSED`，未明确区分 merged 与 closed，因此以下以“关闭/完成处理”表述。

### 关键关闭 / 完成 PR

- [PR #159466](https://github.com/openclaw/openclaw/pull/159466) `fix(codex): recover remote connections during harness replacement`  
  修复 Codex 远程 Harness 替换过程中前台请求可能因复用尚未打开的 WebSocket 而失败的问题。该修复有助于提升远程 Codex 会话的连接恢复能力，尤其是后台连接与前台请求交叠时的可靠性。

- [PR #160057](https://github.com/openclaw/openclaw/pull/160057) `fix(tooling): join canceled artifact ownership waits`  
  修复工具链命令取消后仍可能滞留在 artifact ownership 等待队列中的问题。该改动主要改善 CI / tooling 的资源释放与取消语义，降低后续任务被遗留锁或延迟 acquisition 干扰的风险。

- [PR #160068](https://github.com/openclaw/openclaw/pull/160068) `refactor(gateway): remove dead node presence timers`  
  移除 Gateway 中已无写入者的 node presence timer 逻辑。虽然无直接用户可见变化，但减少了 Gateway 生命周期管理中的无效状态和维护负担。

- [PR #160084](https://github.com/openclaw/openclaw/pull/160084) `test(doctor,agents,gateway,sessions,cron): remove low-value tests`  
  清理 Doctor、agent、Gateway、session、cron 测试套件中的低价值或重复测试。该变更有助于降低测试维护成本，但由于涉及多模块测试删除，仍带有一定安全边界和覆盖率风险。

- [PR #160086](https://github.com/openclaw/openclaw/pull/160086) `fix: Windows dev-channel updates fail startup metadata preflight`  
  针对 [Issue #160064](https://github.com/openclaw/openclaw/issues/160064) 的 Windows dev-channel 更新失败问题提出修复，但该 PR 已关闭。当前需要确认是否被替代、重开或合并到其他 PR，否则 Windows dev-channel 仍可能处于阻塞状态。

### 接近落地、值得关注的开放 PR

- [PR #159931](https://github.com/openclaw/openclaw/pull/159931) `fix: Claude CLI turns stall 15 minutes and end as "CLI run aborted"`  
  处理 Claude CLI 输出超过 stream-json 限制后“盲跑”约 15 分钟并最终被 stuck-session recovery 中止的问题。标签显示 `proof: sufficient`、`ready for maintainer look`，且风险集中在 session-state，属于高优先级稳定性修复。

- [PR #160062](https://github.com/openclaw/openclaw/pull/160062) `fix(gateway): Gateway exits when a cloud worker turn is cancelled during a worker runtime update`  
  修复云 worker turn 在 runtime 更新中被取消时 Gateway 因未处理 Promise rejection 退出的问题。该 PR 为 P1，已等待维护者查看，直接改善 Gateway 可用性。

- [PR #160090](https://github.com/openclaw/openclaw/pull/160090) `fix(test): state database fixtures flake with SQLITE_BUSY`  
  解决 worker-backed writes 后 state DB fixture 偶发 `SQLITE_BUSY` 的测试不稳定问题。虽无用户可见变化，但可提升 CI 信号质量。

- [PR #160092](https://github.com/openclaw/openclaw/pull/160092) `feat(plugins): show MCP sign-in alerts on plugin detail pages`  
  关闭 [Issue #160087](https://github.com/openclaw/openclaw/issues/160087)，为插件详情页增加 MCP OAuth 登录状态提示。功能完整度较高，可能较快进入下一版本。

- [PR #160074](https://github.com/openclaw/openclaw/pull/160074) `feat(ui): run current-session actions from the command palette`  
  关闭 [Issue #160073](https://github.com/openclaw/openclaw/issues/160073)，允许从命令面板执行当前会话的 Rename、Archive、Pin、Fork、Delete 等操作。该改动偏 UX 增强，风险相对可控。

---

## 3. 社区热点

### 1. Windows / Gateway 稳定性成为最高优先级热点

- [Issue #160060](https://github.com/openclaw/openclaw/issues/160060)  
  **[Windows] Gateway 在 Modern Standby 恢复后约 54 分钟静默死亡**  
  标签包含 `P0`、`impact:crash-loop`、`impact:ux-release-blocker`。用户报告 Gateway 进入“fake-alive”状态：仍每 30 秒写日志，但无法服务请求，最终无退出日志、无 WER dump、supervisor 也未处理。  
  **背后诉求**：用户希望 Gateway 在 Windows 休眠/恢复场景下具备可靠的生命周期检测、崩溃记录和自恢复能力。

- [Issue #160061](https://github.com/openclaw/openclaw/issues/160061)  
  **Windows stale lock files 阻止 Gateway 重启**  
  同为 `P0`、`impact:crash-loop`、`impact:ux-release-blocker`。重启后旧锁文件仍记录死亡 pid，导致新实例拒绝启动，用户必须手动删除锁文件。  
  **背后诉求**：Gateway lock 机制需要能识别 dead pid，并在安全条件下自动清理 stale lock，避免用户手动干预。

- [Issue #160076](https://github.com/openclaw/openclaw/issues/160076)  
  **2026.9.4 → 2026.9.6 后 Gateway 在低配主机上堆积 424 个任务并挂起**  
  `P0`、`impact:crash-loop`。2-core / 3.5 GiB 主机上 heap 达到 critical threshold 的 116.6%，服务无响应直至重启。  
  **背后诉求**：需要更严格的任务背压、内存保护和低资源环境回归测试。

### 2. 会话状态与消息投递问题集中爆发

- [Issue #160058](https://github.com/openclaw/openclaw/issues/160058)  
  **Telegram 渠道中 failure placeholder 覆盖成功回复并可能污染 session**  
  `P0`、`impact:message-loss`、`impact:ux-release-blocker`。真实 agent 回复成功后，Telegram 偶尔仍发送通用失败占位文本，且可能使 session 后续状态异常。  
  **背后诉求**：用户需要消息投递链路具备幂等性、正确的最终状态判断，以及失败占位符不会覆盖真实回复。

- [Issue #160082](https://github.com/openclaw/openclaw/issues/160082)  
  **Slash `/new` 丢失 worker workspace binding，但保留 active placement**  
  `P1`、`impact:session-state`、`impact:message-loss`。重置后的 turn 因缺少 session-owned workspace 而无法 dispatch。  
  **背后诉求**：session reset、worker placement、workspace ownership 三者必须保持一致。

- [Issue #159452](https://github.com/openclaw/openclaw/issues/159452)  
  **daily / idle 自动 session reset 丢失 `worktree` 字段**  
  已关闭。与 #160082 呈现相似模式：reset 后 worker-placed session 缺少 workspace 绑定，导致每轮失败。  
  **背后诉求**：自动会话 rollover 不应破坏 worker 绑定和 workspace 元数据。

### 3. PR 侧热点：稳定性修复与 UX 增强并行

- [PR #160088](https://github.com/openclaw/openclaw/pull/160088)  
  **Slack progress card 链接打开错误 session**  
  涉及 Slack、agent、Codex、file-transfer，尺寸 XL，`merge-risk: compatibility`，当前等待作者。该问题反映多 session / work session / main session 路由逻辑复杂度较高。

- [PR #159931](https://github.com/openclaw/openclaw/pull/159931)  
  **Claude CLI stream 输出超过限制后卡 15 分钟**  
  这是 agent 执行体验上的高痛点修复，避免用户长时间等待后只得到 “CLI run aborted”。

- [PR #160040](https://github.com/openclaw/openclaw/pull/160040)  
  **增加受保护的 heap snapshots 和 retention diffs**  
  面向 Gateway 长期运行内存诊断。考虑到今日多起 Gateway memory / hang 报告，该 PR 对稳定性排障价值很高，但涉及安全边界与可用性风险，需谨慎评审。

---

## 4. Bug 与稳定性

### P0 / Release Blocker 级别

1. [Issue #160060](https://github.com/openclaw/openclaw/issues/160060)  
   **Windows Gateway standby thaw 后 fake-alive 并静默死亡**  
   - 严重性：P0，crash-loop，UX release blocker  
   - 影响：Gateway 仍写日志但不服务请求，最终无诊断信息退出  
   - 当前状态：Open  
   - Fix PR：未见明确关联 PR  
   - 建议优先级：最高。需要补充 watchdog、supervisor 检测、exit telemetry、Windows dump 捕获。

2. [Issue #160061](https://github.com/openclaw/openclaw/issues/160061)  
   **Windows stale lock files 阻塞 fresh Gateway instance**  
   - 严重性：P0，crash-loop，UX release blocker  
   - 影响：重启后无法拉起 Gateway，需用户手动删除锁文件  
   - 当前状态：Open，`needs-info`  
   - Fix PR：未见明确关联 PR  
   - 建议优先级：最高。应添加 dead pid 检测与锁文件安全回收。

3. [Issue #160058](https://github.com/openclaw/openclaw/issues/160058)  
   **Telegram failure placeholder 覆盖成功回复并污染 session**  
   - 严重性：P0，message-loss，session-state，UX release blocker  
   - 影响：用户收到错误失败提示，真实回复丢失或被覆盖  
   - 当前状态：Open  
   - Fix PR：未见明确关联 PR  
   - 建议优先级：最高。需排查 delivery mirror、agent-runner 状态提交顺序和幂等保护。

4. [Issue #160076](https://github.com/openclaw/openclaw/issues/160076)  
   **Gateway 升级后低配主机任务堆积与内存超限挂起**  
   - 严重性：P0，crash-loop  
   - 影响：Gateway 完全无响应，需重启  
   - 当前状态：Open  
   - Fix PR：可能与诊断/内存类 PR 相关，但未见直接关联  
   - 相关 PR：  
     - [PR #160040](https://github.com/openclaw/openclaw/pull/160040) heap snapshots / retention diffs  
     - [PR #160094](https://github.com/openclaw/openclaw/pull/160094) tooling semantic checks memory admission  
     - [PR #160096](https://github.com/openclaw/openclaw/pull/160096) compiler profiling memory bound  
   - 建议优先级：最高。应建立低内存主机回归场景和任务背压机制。

### P1 级别

5. [Issue #160064](https://github.com/openclaw/openclaw/issues/160064)  
   **Windows dev-channel update preflight 必然失败**  
   - 严重性：P1  
   - 影响：Windows 上 `openclaw update --channel dev` 无法成功  
   - 根因方向：`write-cli-startup-metadata` 生成的 child `node` 进程缺少 `SystemRoot`，触发 CSPRNG assertion abort  
   - 当前状态：Open  
   - Fix PR：  
     - [PR #160086](https://github.com/openclaw/openclaw/pull/160086) 已关闭，需确认是否有替代方案  
   - 建议：维护者应明确 #160086 的关闭原因，并给出新的修复路径。

6. [Issue #159912](https://github.com/openclaw/openclaw/issues/159912)  
   **Memory background callbacks 保留 retired plugin registry，导致 indexing 失败但 health 仍绿**  
   - 严重性：P1，session-state  
   - 影响：插件 reload 后 local-vector indexing 持续失败数小时，但健康检查未反映异常  
   - 当前状态：Open  
   - Fix PR：未见明确关联 PR  
   - 建议：健康检查需要覆盖 memory indexing 的真实可用性，而不只是 embedding server 状态。

7. [Issue #160082](https://github.com/openclaw/openclaw/issues/160082)  
   **`/new` 丢失 worker workspace binding**  
   - 严重性：P1，session-state，message-loss  
   - 影响：worker-placed session reset 后无法继续 dispatch  
   - 当前状态：Open  
   - Fix PR：未见明确关联 PR  
   - 关联问题：[Issue #159452](https://github.com/openclaw/openclaw/issues/159452) 已关闭，显示同类 session reset 问题正在被处理。

### P2 / P3 与其他稳定性问题

8. [Issue #160095](https://github.com/openclaw/openclaw/issues/160095)  
   **acpx durable wrapper 写入 disposable plugin capture dir 的 installedBinPath**  
   - 严重性：未标注 P 级，但影响持久 wrapper 可用性  
   - 影响：临时目录失效后 wrapper 指向 stale path，且不会 fallback  
   - 当前状态：Open，无评论  
   - Fix PR：未见明确关联 PR  
   - 建议：应尽快分级，因该问题可能影响 ACP wrapper 长期可用性。

---

## 5. 功能请求与路线图信号

### 可能进入下一版本的功能

1. [Issue #160087](https://github.com/openclaw/openclaw/issues/160087) + [PR #160092](https://github.com/openclaw/openclaw/pull/160092)  
   **插件详情页显示 MCP sign-in 状态**  
   - 用户诉求：插件已安装启用，但 MCP OAuth 未授权时，当前 UI 不够显性。  
   - PR 状态：Open，已有实现。  
   - 纳入下一版本可能性：高。该功能范围明确，用户价值直接，且已有对应 PR。

2. [Issue #160073](https://github.com/openclaw/openclaw/issues/160073) + [PR #160074](https://github.com/openclaw/openclaw/pull/160074)  
   **从命令面板执行当前会话操作**  
   - 用户诉求：希望通过 ⌘K / Ctrl+K 执行 Rename、Archive、Pin、Fork、Delete 等当前会话操作，减少鼠标操作。  
   - PR 状态：Open，`ready for maintainer look`，带截图 proof。  
   - 纳入下一版本可能性：较高。属于明确 UX 增强，风险主要在 Web UI 行为一致性。

3. [Issue #160081](https://github.com/openclaw/openclaw/issues/160081) + [PR #160093](https://github.com/openclaw/openclaw/pull/160093)  
   **Lobster Packs 与共享 LobsterDex 渲染**  
   - 用户诉求：插件作者希望发布自定义 Clawmojis / Lobster Packs，并复用 LobsterDex inventory 与渲染器。  
   - PR 状态：Open，尺寸 XL，涉及 Web UI、Gateway、docs。  
   - 纳入下一版本可能性：中等。功能已成形，但体量大，可能需要更多产品决策和兼容性审查。

4. [PR #160066](https://github.com/openclaw/openclaw/pull/160066)  
   **会话活动旁显示紧凑工具图标**  
   - 用户诉求：减少 session sidebar 中文本型 tool activity 对空间的占用。  
   - 状态：Open，`ready for maintainer look`，带截图 proof。  
   - 纳入下一版本可能性：较高。属于低风险 UI 改进。

5. [PR #160078](https://github.com/openclaw/openclaw/pull/160078)  
   **OpenAI auth choices 中将 Sign in with ChatGPT Beta 放到第三位**  
   - 用户诉求：避免 beta 登录方式排在首位造成误导。  
   - 状态：Open，尺寸 XS。  
   - 纳入下一版本可能性：高。变更小，用户引导清晰。

### 路线图信号

- **插件生态正在增强**：MCP sign-in alert、Lobster Packs、LobsterDex renderer 都指向更开放的插件 UI 和认证体验。
- **命令面板成为核心交互入口**：当前 session actions 的加入表明 OpenClaw 正把 keyboard-first workflow 作为 Web UI 生产力方向。
- **Gateway 可观测性和内存诊断正在补强**：[PR #160040](https://github.com/openclaw/openclaw/pull/160040) 与多起 Gateway hang / crash issue 相互呼应，说明长期运行稳定性将成为近期重点。
- **多渠道一致性问题突出**：Slack、Telegram、Browser extension、Codex、Claude CLI 等不同 channel / extension 的边界问题频繁出现，后续可能需要统一 session routing、delivery state、file handling 抽象。

---

## 6. 用户反馈摘要

### 主要痛点

- **“看起来活着，但实际不可用”是 Gateway 用户最不满的体验**  
  [Issue #160060](https://github.com/openclaw/openclaw/issues/160060) 中 Gateway 仍写日志却不服务请求，最终静默消失；[Issue #160076](https://github.com/openclaw/openclaw/issues/160076) 中 Gateway heap 超限后完全无响应。这类问题比显式崩溃更难排查，也更影响信任。

- **Windows 用户遇到启动、更新、重启链路的连续阻塞**  
  [Issue #160061](https://github.com/openclaw/openclaw/issues/160061) stale lock file、[Issue #160064](https://github.com/openclaw/openclaw/issues/160064) dev-channel update preflight 失败，显示 Windows 环境变量、进程锁、休眠恢复等平台特有场景覆盖不足。

- **会话 reset 与 worker placement 的状态一致性仍是高风险区**  
  [Issue #159452](https://github.com/openclaw/openclaw/issues/159452) 与 [Issue #160082](https://github.com/openclaw/openclaw/issues/160082) 都显示 reset / rollover 后 `worktree` 或 workspace binding 可能丢失，但 active placement 仍保留，最终导致 dispatch 失败。用户视角是“新会话或重置后机器人突然不能回复”。

- **消息渠道用户关注“最终回复是否正确送达”**  
  Telegram 的 [Issue #160058](https://github.com/openclaw/openclaw/issues/160058) 和 Slack 的 [PR #160088](https://github.com/openclaw/openclaw/pull/160088) 都反映多渠道场景下，用户最关心的是：链接打开的是否是正确会话、占位失败信息是否会覆盖真实结果、工作 session 与 main session 是否一致。

- **开发者和维护者关注 CI / tooling 可预测性**  
  [PR #160014](https://github.com/openclaw/openclaw/pull/160014)、[PR #160094](https://github.com/openclaw/openclaw/pull/160094)、[PR #160096](https://github.com/openclaw/openclaw/pull/160096) 均围绕语义检查、compiler profiling、内存预算和 runner containment 展开，说明工程团队正在处理大型 TS/CI 工作流的资源波动问题。

### 正向反馈信号

- 多个 PR 带有 `proof: sufficient`、截图或 CI 证据，说明贡献者开始更系统地提供可验证材料。
- 功能类 Issue 往往迅速有对应 PR，例如：
  - [Issue #160087](https://github.com/openclaw/openclaw/issues/160087) → [PR #160092](https://github.com/openclaw/openclaw/pull/160092)
  - [Issue #160073](https://github.com/openclaw/openclaw/issues/160073) → [PR #160074](https://github.com/openclaw/openclaw/pull/160074)
  - [Issue #160081](https://github.com/openclaw/openclaw/issues/160081) → [PR #160093](https://github.com/openclaw/openclaw/pull/160093)

---

## 7. 待处理积压

### 高优先级、暂无明确 fix PR 的问题

- [Issue #160060](https://github.com/openclaw/openclaw/issues/160060)  
  Windows Gateway standby thaw 后 fake-alive / silent death。P0 release blocker，需维护者尽快确认 owner 和诊断计划。

- [Issue #160061](https://github.com/openclaw/openclaw/issues/160061)  
  stale gateway lock files 阻塞重启。当前 `needs-info`，但严重性为 P0，建议维护者主动给出所需日志清单，避免 issue 卡住。

- [Issue #160058](https://github.com/openclaw/openclaw/issues/160058)  
  Telegram placeholder 覆盖成功回复。P0 message-loss，建议尽快分配 channel / delivery owner。

- [Issue #160076](https://github.com/openclaw/openclaw/issues/160076)  
  Gateway 升级后低配主机任务堆积和 heap 超限。建议与 Gateway 内存诊断 PR 联动，但仍需要直接缓解方案。

- [Issue #159912](https://github.com/openclaw/openclaw/issues/159912)  
  memory callbacks 保留 retired plugin registry，导致 indexing 失败但 health 绿色。P1 且影响 session-state，建议尽快补健康检查和 registry 生命周期测试。

- [Issue #160095](https://github.com/openclaw/openclaw/issues/160095)  
  acpx wrapper 持久化 stale installedBinPath。当前无评论，建议先确认影响范围并打上优先级标签。

### 等待维护者评审的重要 PR

- [PR #159931](https://github.com/openclaw/openclaw/pull/159931)  
  Claude CLI 输出超限后卡 15 分钟。P1、`ready for maintainer look`，建议优先评审。

- [PR #160062](https://github.com/openclaw/openclaw/pull/160062)  
  Gateway 在 cloud worker turn 取消期间退出。P1、Gateway 可用性修复，建议优先处理。

- [PR #160025](https://github.com/openclaw/openclaw/pull/160025)  
  iOS release qualification 避免重复 setup。尺寸 XL、automation 风险，影响 release 资格验证效率。

- [PR #160040](https://github.com/openclaw/openclaw/pull/160040)  
  guarded heap snapshots 与 retention diffs。对 Gateway 内存问题排障价值高，但涉及 security boundary / availability，建议安排专项评审。

- [PR #160083](https://github.com/openclaw/openclaw/pull/160083)  
  Doctor 仅在确认 ownership 后激活 stopped Gateway。P1、security-boundary，当前 `needs proof`，需要作者补证据。

- [PR #160052](https://github.com/openclaw/openclaw/pull/160052)  
  CI/Testbox SSH session 泄漏与 lease reuse 防护。涉及 compatibility、security-boundary、availability，当前 `needs proof`，建议明确所需验证矩阵。

- [PR #159588](https://github.com/openclaw/openclaw/pull/159588)  
  config fourth pass。尺寸 XL，涉及 Gateway、agents、session-state 和 security-sensitive changes，建议避免长期悬挂造成 rebase 成本上升。

- [PR #159554](https://github.com/openclaw/openclaw/pull/159554)  
  CLI fourth pass。已说明 rebased 且 Testbox proof 通过，仍待授权落地。建议维护者确认 CI 最终状态后尽快处理。

---

## 项目健康度判断

OpenClaw 今日表现为 **高活跃、高吞吐、高风险并存**。贡献流入充足，功能和修复 PR 覆盖面广，说明社区和维护团队仍保持强执行力；但 P0/P1 问题集中在 Gateway、Windows、session-state、message delivery 这些核心用户路径上，短期发布风险偏高。  
建议维护者将今日优先级聚焦在三条线：  
1. Gateway 可用性与 Windows 生命周期问题；  
2. session reset / worker workspace 状态一致性；  
3. Telegram / Slack 等 channel 的最终投递正确性。

---

## 横向生态对比

# AI 智能体 / 个人 AI 助手开源生态横向对比报告  
**日期：2026-09-28**

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态呈现出明显的“两极分化”：头部项目如 **OpenClaw、Hermes Agent、ZeroClaw、NanoBot** 保持高频迭代，但也集中暴露出 Gateway、会话状态、权限隔离、消息投递等核心链路稳定性问题。  
从技术主题看，生态正在从“模型接入与工具调用能力扩展”进入“长期运行可靠性、跨平台桌面体验、安全边界、状态一致性”阶段。  
多个项目同时出现 **Tsubasa / OpenAI-compatible Provider 接入**、**Windows / Desktop 稳定性**、**消息渠道投递语义**、**会话恢复与权限重校验** 等共性议题，说明 AI Agent 正逐步进入更真实的本地化、企业化、多渠道生产使用场景。  
整体判断：生态活跃度高，功能扩张仍快，但高成熟度项目正面临系统复杂度上升后的稳定性与安全治理压力。

---

## 2. 各项目活跃度对比

> 注：Issue / PR 数为摘要中提供的过去 24 小时更新量；部分项目 PR 状态仅区分 open / closed，未必代表 merged。

| 项目 | Issues 更新 | PR 更新 | Release | 今日主线主题 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 12 | 46 | 无 | Gateway / Windows / session-state / message delivery / UI 与插件增强 | **高活跃、高风险**：社区规模和工程推进领先，但 P0/P1 release blocker 集中在核心路径 |
| **NanoBot** | 2 | 16 | 无 | GPT-6 / Responses API、Cron 数据可靠性、WebUI、远程实例连接 | **健康快速迭代**：Provider 与稳定性修复响应快，P0 Cron 仍需优先合并 |
| **Hermes Agent** | 50 | 50 | 无 | Gateway session-state、Desktop 多 profile、消息投递、安全依赖 | **极高活跃、高修复压力**：反馈质量高，维护响应快，但状态一致性和安全问题密集 |
| **PicoClaw** | 2 | 1 | 无 | OneBot 行为可配置、Tsubasa provider 请求 | **轻量健康**：无新增稳定性风险，贡献闭环清晰 |
| **NanoClaw** | 1 | 7 | 无 | Docker 容器生命周期、更新流程、Mattermost、私有 CA | **中高活跃、待合并压力**：修复方向明确，但 7 个 PR 均未落地 |
| **NullClaw** | 0 | 2 | 无 | Tsubasa Provider、A2A bearer principal 隔离 | **低讨论、关键安全推进**：活跃度低，但 A2A 隔离修复重要 |
| **IronClaw** | 2 | 1 | 无 | Tsubasa registry、turn-0 工具选择、依赖升级 | **平稳维护**：无 Bug 压力，新增议题偏架构与体验优化 |
| **LobsterAI** | 0 | 1 | 无 | Windows gateway stale lock 回收 | **低活跃维护日**：唯一 PR 指向关键稳定性问题 |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **Moltis** | 1 | 2 | 无 | DeepSeek reasoning 识别、Tsubasa Provider | **稳定小步迭代**：模型能力兼容性修复响应及时 |
| **CoPaw** | 5 | 2 | 无 | Windows Desktop、安全执行边界、工具超时恢复、UX | **中等偏活跃、中高风险**：桌面端成熟度提升中，但本地执行安全需关注 |
| **ZeptoClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **ZeroClaw** | 5 | 10 | 无 | 权限重校验、session resume、delegate memory、Teams channel | **高活跃、高安全压力**：安全架构收敛明显，但 P0/S0 问题仍开放 |

### 活跃度分层

| 层级 | 项目 | 特征 |
|---|---|---|
| **超高活跃 / 高复杂度** | Hermes Agent、OpenClaw | Issue / PR 双高，真实用户场景复杂，稳定性与状态一致性压力最大 |
| **高活跃 / 安全治理强化** | ZeroClaw、NanoBot | PR 推进快，集中处理安全、状态、Provider 兼容性 |
| **中等活跃 / 工程可靠性修复** | NanoClaw、CoPaw、Moltis | 问题较集中，修复方向清晰，待 review 是主要瓶颈 |
| **轻量活跃 / 生态扩展** | PicoClaw、NullClaw、IronClaw、LobsterAI | 更新少但主题明确，多为 Provider、锁恢复、安全隔离或配置体验 |
| **静默** | TinyClaw、ZeptoClaw | 过去 24 小时无活动 |

---

## 3. OpenClaw 在生态中的定位

### 3.1 综合定位

OpenClaw 是当前样本中最接近“全栈个人 AI 助手 / 多渠道智能体平台”的项目之一。它同时覆盖：

- Gateway 长驻服务；
- Web UI / iOS / Browser extension；
- Slack / Telegram 等消息渠道；
- Claude CLI / Codex / MiniMax 等 agent runtime；
- 插件 OAuth / MCP；
- Windows 本地更新与锁管理；
- CI / tooling / release qualification。

相比 PicoClaw、Moltis、IronClaw 这类更聚焦模型接入或 runtime 优化的项目，OpenClaw 的系统边界更宽，接近“个人 AI 助手操作系统”形态。

### 3.2 优势

1. **社区与工程吞吐量领先**  
   今日 46 条 PR 更新、12 条 Issue 更新，远高于多数项目，仅 Hermes Agent 在总活跃度上可比。

2. **功能覆盖面广**  
   同时推进 Gateway、UI、插件、渠道、CLI runtime、移动端、Windows 更新、CI 等多个子系统。

3. **贡献闭环较成熟**  
   多个功能型 Issue 快速对应 PR，例如：
   - MCP sign-in alert：#160087 → #160092  
   - command palette session actions：#160073 → #160074  
   - Lobster Packs：#160081 → #160093  

4. **可观测性和诊断能力开始增强**  
   PR #160040 的 heap snapshots / retention diffs 说明项目正在补齐长期运行诊断能力。

### 3.3 短板与风险

OpenClaw 今日最大问题是 **核心路径 P0 过多**，且集中在用户不可绕过的基础设施层：

- Windows Gateway standby 后 fake-alive / silent death；
- stale lock file 阻塞 Gateway 启动；
- Telegram 成功回复被 failure placeholder 覆盖；
- Gateway 低配主机任务堆积与 heap 超限；
- `/new` 和 session reset 导致 workspace binding 丢失。

这类问题说明 OpenClaw 已进入复杂系统阶段：功能广度很强，但 Gateway 生命周期、session-state、一致性投递和 Windows 平台语义仍需系统性加固。

### 3.4 与同类项目对比

| 对比对象 | OpenClaw 相对优势 | OpenClaw 相对劣势 |
|---|---|---|
| **Hermes Agent** | PR 吞吐高，插件 / UI / 渠道 / Codex / Claude 等生态广 | Hermes 的 issue 反馈更密集，安全与 profile 问题暴露更充分；OpenClaw 当前 release blocker 更集中在 Gateway / Windows |
| **NanoBot** | 系统覆盖更广，渠道与插件生态更复杂 | NanoBot 今日稳定性修复更收敛，Provider / Responses API 处理更轻量 |
| **ZeroClaw** | 面向个人助手和多渠道体验更完整 | ZeroClaw 在 authority recheck、principal isolation 等安全建模上更系统化 |
| **CoPaw** | 社区吞吐与多渠道能力更强 | CoPaw 在本地执行安全、桌面 UX 控制上暴露的问题更少但更聚焦 |
| **PicoClaw / Moltis / IronClaw** | 产品完整度和工程规模显著更高 | 小型项目风险面更窄，近期无大量 P0 稳定性债务 |

---

## 4. 共同关注的技术方向

## 4.1 OpenAI-compatible Provider 与 Tsubasa 接入

涉及项目：

- PicoClaw：#3397 请求加入 Tsubasa provider catalog；
- NanoBot：#5947 新增 Tsubasa provider metadata；
- NullClaw：#1013 新增 Tsubasa Chat Completions Provider；
- IronClaw：#8115 请求 Tsubasa registry entry 与 32K context-budget；
- Moltis：#1288 新增 Tsubasa provider；
- ZeroClaw：#11207 请求 Tsubasa custom-provider 文档；
- OpenClaw：虽今日主线不以 Tsubasa 为核心，但 MiniMax、Claude CLI、Codex 等 provider/runtime 适配仍活跃。

共同诉求：

- 降低自定义 API base 配置成本；
- 内置 provider picker / registry；
- 明确模型 alias、context window、token budget；
- 统一 OpenAI-compatible Provider 的接入规范。

趋势判断：  
**Provider registry 正从“用户手工配置”走向“项目内置目录 + 能力元数据声明”。**

---

## 4.2 Gateway / Daemon 长驻服务可靠性

涉及项目：

- OpenClaw：Windows standby fake-alive、stale lock、heap 超限、Gateway crash；
- Hermes Agent：Gateway internal-event pins 丢失、channel prompt 翻转；
- NanoClaw：容器残留、Iron Proxy 更新时被停止；
- LobsterAI：Windows gateway lock PID 复用回收；
- ZeroClaw：gateway / RPC inbound-auth 状态一致性；
- CoPaw：Desktop double-launch 终止 live backend。

共同诉求：

- 长驻服务必须具备自恢复；
- 锁文件、PID、supervisor、watchdog 需要跨平台可靠；
- 更新 / cutover 不能破坏核心代理；
- “看似存活但不可用”的 fake-alive 状态必须被检测；
- Desktop 与 Gateway 生命周期要解耦。

趋势判断：  
**Agent 平台正在从 CLI 工具演变为常驻本地/云端服务，生命周期管理成为基础设施级能力。**

---

## 4.3 会话状态一致性与恢复

涉及项目：

- OpenClaw：session reset 丢失 workspace binding、daily reset 丢失 worktree；
- Hermes Agent：Gateway restart 后 internal-event pins 丢失、follow-up turn channel_prompt=None、compression 重复写入；
- NanoBot：#5943 将 session state ownership 集中到 SQLite；
- ZeroClaw：session resume 恢复旧 forwarded environment；
- CoPaw：上下文压缩触发机制、消息编辑/撤回与工作区回滚；
- NanoClaw：删除任务后 orphan session 残留。

共同诉求：

- session reset / resume / rollover 不应破坏 workspace、prompt、placement、权限；
- 长会话需要持久化权威状态；
- 压缩、checkpoint、context restore 要具备幂等性；
- 用户需要对历史、状态和文件修改拥有回滚能力。

趋势判断：  
**Session 已成为 Agent 系统的核心数据结构，未来会从简单 chat history 演进为“权限、环境、workspace、memory、tools、runtime placement”的复合状态容器。**

---

## 4.4 消息渠道投递语义

涉及项目：

- OpenClaw：Telegram failure placeholder 覆盖成功回复，Slack progress card 打开错误 session；
- Hermes Agent：WeCom approval 未送达仍等待、Telegram Markdown chunking、Telegram document fallback、Buzz `/approve` 识别失败；
- PicoClaw：OneBot auto-ack reaction 需可配置；
- NanoBot：Telegram 命令换行、邮箱、bot 后缀参数保留；
- NanoClaw：Mattermost callback secret 校验；
- ZeroClaw：Teams channel PR；
- CoPaw：暂无多渠道核心 bug，但 WebUI 消息编辑/撤回诉求相关。

共同诉求：

- 明确 delivered / failed / pending 状态；
- 消息投递需幂等；
- placeholder 不能覆盖真实成功结果；
- markdown、文件、按钮、approval callback 需要平台感知；
- 渠道默认行为需可配置，避免群聊噪音。

趋势判断：  
**多渠道 Agent 不再只是“发送文本”，而需要平台级 delivery semantics。**

---

## 4.5 权限、安全与多租户隔离

涉及项目：

- ZeroClaw：authority recheck、session resume 撤权绕过、delegated memory principal scope；
- NullClaw：A2A bearer principal 隔离；
- Hermes Agent：pillow-heif CVE、LSP 启动仓库自带 Python、插件 caution update；
- CoPaw：Windows 非沙箱 auto 模式允许 Office COM Quit；
- OpenClaw：Gateway / Doctor ownership、插件 OAuth、security-boundary PR；
- NanoClaw：本地 CA 信任链；
- NanoBot：远程实例连接、session state SQLite 化也涉及信任边界。

共同诉求：

- 认证身份必须传递到 JSON-RPC / A2A / task / context 层；
- 权限撤销应在执行前重新校验；
- delegate / subagent / tool wrapper 不能丢失 principal scope；
- 本地执行、COM、LSP、插件、依赖都需要安全审计；
- 多 profile、多用户、多 channel 必须严格隔离。

趋势判断：  
**Agent 系统的安全模型正在从“入口鉴权”升级为“每个敏感 effect 执行前重校验”。**

---

## 4.6 长任务、工具调用与恢复能力

涉及项目：

- NanoBot：completed tool results 持久化、Cron pending actions 防丢失；
- CoPaw：工具超时后返回可恢复结果；
- ZeroClaw：malformed tool protocol 重试耗尽后应失败；
- Hermes Agent：checkpoint 性能优化、工具 heavy turn 后 stale-send；
- NanoClaw：skill step 显示真实错误；
- IronClaw：turn-0 tool selection 提案；
- OpenClaw：Claude CLI stream 超限卡 15 分钟。

共同诉求：

- 工具失败必须可诊断；
- 长任务中间状态需持久化；
- 超时 / 取消 / retry 语义要清晰；
- 工具选择不能无限膨胀上下文；
- checkpoint / recovery 会成为 Agent runtime 标配。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 / 路线特点 |
|---|---|---|---|
| **OpenClaw** | 全栈个人 AI 助手、多渠道、插件、Gateway、Web/iOS/CLI runtime | 高阶个人用户、开发者、跨渠道 Agent 使用者 | Gateway 중심，插件 + 多 runtime + 多 UI，系统边界宽 |
| **Hermes Agent** | Gateway / Desktop / 多 profile / 多消息平台 / task management | 重度 Agent 用户、桌面端用户、开发者 | 多 profile、多 channel、Desktop/Dashboard 并行，复杂状态管理 |
| **NanoBot** | Provider 适配、WebUI、Cron、工具恢复、远程实例连接 | 模型工具用户、轻量 self-host 用户 | Python/SQLite 风格状态收敛，快速 Provider 兼容 |
| **PicoClaw** | 聊天渠道与模型 provider 轻量扩展 | QQ / OneBot 用户、轻量集成用户 | 小步快改，配置化优先，风险面较窄 |
| **NanoClaw** | 容器化 Agent 运行、私有模型基础设施、Mattermost | self-host / homelab / 私有部署用户 | Docker / container runner / Iron proxy 依赖明显 |
| **NullClaw** | A2A 服务、安全隔离、Provider 扩展 | Agent 服务端、多调用者场景 | A2A task / context session 隔离开始强化 |
| **IronClaw** | Agent runtime、工具选择、模型 registry | Agent framework 开发者 | Rust 生态、工具检索与上下文预算优化倾向明显 |
| **LobsterAI** | OpenClaw 相关集成与 Windows gateway 可靠性 | Windows 本地用户、OpenClaw 派生用户 | 聚焦维护性修复，活动低但问题实际 |
| **Moltis** | 多模型 provider、模型能力识别、WebUI 能力展示 | 多模型用户、UI 驱动型助手用户 | Provider capability registry 需求明显 |
| **CoPaw** | Desktop Agent、本地工具执行、WebUI 控制、长任务 UX | 桌面端 AI 助手用户、自动化用户 | 本地执行能力强，但安全边界和 UX 控制仍在完善 |
| **ZeroClaw** | 安全优先的 Agent runtime、权限重校验、企业 channel | 企业 / 多租户 / 安全敏感 Agent 部署 | authority recheck、principal scope、gateway/RPC 统一认证 |
| **TinyClaw / ZeptoClaw** | 今日无信号 | - | 暂无活动判断依据 |

---

## 6. 社区热度与成熟度

### 6.1 快速迭代阶段

代表项目：

- **Hermes Agent**
- **OpenClaw**
- **ZeroClaw**
- **NanoBot**

特征：

- Issue / PR 数量高；
- 用户真实场景复杂；
- 多数问题不是简单功能缺失，而是跨组件一致性；
- 维护者响应快，但 review 队列压力大；
- 已进入“功能丰富但稳定性债务显性化”的阶段。

其中：

- Hermes Agent：反馈量最大，Desktop / Gateway / 多 profile / 消息平台问题集中。
- OpenClaw：PR 吞吐最高之一，但 P0 release blocker 密度高。
- ZeroClaw：安全建模成熟度提升最快，正在系统性引入 authority recheck。
- NanoBot：Provider 与 Responses API 兼容性处理最利落，但 Cron / session state 架构仍需收敛。

### 6.2 质量巩固阶段

代表项目：

- **NanoClaw**
- **CoPaw**
- **Moltis**
- **NullClaw**
- **LobsterAI**

特征：

- 更新量中低；
- 问题聚焦度高；
- 多为明确修复 PR；
- 主要挑战是 review 与合并节奏。

其中：

- NanoClaw：容器生命周期和升级路径是当前稳定性核心。
- CoPaw：Windows Desktop 与本地执行安全是关键风险。
- Moltis：模型能力识别和 Provider registry 正在补齐。
- NullClaw：A2A 安全隔离重要性高于活跃度本身。
- LobsterAI：低活跃但锁恢复问题具有实际价值。

### 6.3 轻量生态扩展阶段

代表项目：

- **PicoClaw**
- **IronClaw**

特征：

- 新增需求少；
- 无重大 Bug；
- 重点在 provider catalog、工具选择策略、配置体验；
- 适合观察路线图而非短期风险。

### 6.4 静默阶段

代表项目：

- **TinyClaw**
- **ZeptoClaw**

过去 24 小时无活动，无法基于今日数据判断健康度变化。

---

## 7. 值得关注的趋势信号

## 7.1 Provider 生态正在标准化

Tsubasa 在 PicoClaw、NanoBot、NullClaw、IronClaw、Moltis、ZeroClaw 中同时出现，说明 OpenAI-compatible Provider 已成为生态默认扩展方式。  
对开发者的参考价值：

- 新 Agent 框架应尽早设计 provider registry；
- 模型能力元数据应结构化，包括 context window、tool calling、reasoning、vision、cost；
- 不应只依赖模型 ID 字符串前缀判断能力。

---

## 7.2 Gateway / Desktop 常驻化带来系统工程挑战

OpenClaw、Hermes、NanoClaw、CoPaw、LobsterAI 均出现与 Gateway / Desktop / daemon 生命周期相关的问题。  
对开发者的参考价值：

- Agent 不再是一次性 CLI，而是长期运行服务；
- 必须设计 supervisor、watchdog、stale lock 回收、crash dump、health probe；
- Windows standby、PID 复用、权限不可检查等平台细节不能后置处理。

---

## 7.3 会话状态成为最重要的可靠性边界

多个项目的问题都指向 session-state：reset、resume、compression、workspace binding、channel prompt、forwarded environment、memory scope。  
对开发者的参考价值：

- session state 应有单一权威存储；
- runtime cache 必须可重建；
- reset / resume / rollover 应有事务语义；
- workspace、tools、memory、permissions、placement 需要作为一组一致状态管理。

---

## 7.4 安全模型正在从“鉴权一次”走向“执行前重校验”

ZeroClaw 的 authority recheck、NullClaw 的 A2A principal scope、CoPaw 的 COM 执行边界、Hermes 的 LSP / plugin / dependency 安全问题共同说明：Agent 安全风险已经进入真实使用阶段。  
对开发者的参考价值：

- 每个敏感 effect，如 shell、file write、memory write、config write、plugin update，都应携带 principal；
- admission 与 execution 之间不能存在长时间 TOCTOU 窗口；
- delegated agent / tool wrapper 不应丢失身份；
- 安全日志和 audit trail 会成为企业部署刚需。

---

## 7.5 消息渠道需要正式的 delivery model

Telegram、Slack、WeCom、Buzz、OneBot、Mattermost、Teams 等渠道问题集中出现，说明“生成答案”只是 Agent 的一半，另一半是“正确投递并被用户理解”。  
对开发者的参考价值：

- 需要统一 SendResult；
- placeholder、progress card、final answer、approval prompt 要有状态机；
- 投递失败不能默默等待；
- Markdown、文件、按钮、callback deadline 应由平台适配层显式建模。

---

## 7.6 长任务 Agent 对 checkpoint、压缩、恢复能力提出更高要求

CoPaw 的 100–300 步任务上下文压缩、Hermes 的 checkpoint 性能、NanoBot 的 tool result persistence、ZeroClaw 的 file mutation serialization 都表明 Agent 正在执行更长、更复杂的任务。  
对开发者的参考价值：

- checkpoint 成本需要可控；
- 工具执行结果应批次持久化；
- 压缩不应污染当前 turn；
- 文件变更需要顺序、事务或 rollback 能力；
- 用户应能编辑、撤回、重跑或回滚工作区。

---

# 综合结论

今日生态整体处于 **高活跃、高复杂度、高工程化压力** 阶段。OpenClaw、Hermes Agent、ZeroClaw 是当前最能代表复杂 Agent 平台演进方向的项目：它们不再只比拼模型接入和 UI，而是在处理 Gateway 生命周期、会话一致性、多渠道投递、安全重校验和长期任务恢复等系统级问题。

对技术决策者而言：

- 如果关注 **全栈个人 AI 助手能力**，OpenClaw 与 Hermes Agent 最值得持续跟踪；
- 如果关注 **安全、多租户、权限隔离**，ZeroClaw 与 NullClaw 的信号更强；
- 如果关注 **轻量 Provider 接入与模型生态**，NanoBot、Moltis、PicoClaw、IronClaw 更具参考价值；
- 如果关注 **self-hosted / 私有基础设施**，NanoClaw 的容器与私有 CA 路线值得观察；
- 如果关注 **Desktop 本地执行体验**，CoPaw 暴露的问题对所有桌面 Agent 都有借鉴意义。

短期看，生态竞争焦点正在从“谁支持更多模型”转向“谁能在真实长期使用中保持状态正确、安全可控、投递可靠、可恢复”。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报  
**日期：2026-09-28**  
**仓库：** [HKUDS/nanobot](https://github.com/HKUDS/nanobot)

---

## 1. 今日速览

过去 24 小时 NanoBot 维持了较高开发活跃度：共有 **2 条 Issue 更新**、**16 条 PR 更新**，其中 **10 条仍待合并**、**6 条已合并或关闭**。今日没有新版本发布，项目主要处于功能迭代、Provider 适配和稳定性修复阶段。  
从 PR 分布看，重点集中在 **GPT-6 / Responses API 兼容性、WebUI 体验、Cron 可靠性、工具系统增强、远程实例连接** 等方向。整体健康度较好：关键回归问题已有对应修复 PR，但仍有若干高优先级稳定性 PR 待维护者审查。

---

## 2. 项目进展

今日共有 **6 条 PR 已合并或关闭**，主要推进了模型 Provider 兼容性、WebUI 历史加载体验、WeChat 日志降噪和工具参数稳定性。

### 已合并 / 关闭的重要 PR

- [#5940 fix(providers): expose GPT-6 Sol and Luna in Codex model discovery](https://github.com/HKUDS/nanobot/pull/5940)  
  修复 OpenAI Codex 模型发现中遗漏 **GPT-6 Sol** 和 **GPT-6 Luna** 的问题。原因是请求模型目录时固定使用了较旧的 `client_version=0.153.4`，更新到 `0.158.0` 后可发现新模型。  
  该 PR 对应并关闭了 [#5939](https://github.com/HKUDS/nanobot/issues/5939)，提升了 Codex Provider 的模型目录完整性。

- [#5937 fix(providers): stop Responses streams at terminal events](https://github.com/HKUDS/nanobot/pull/5937)  
  修复 Responses API 流式解析在收到 `response.completed` 或 `response.incomplete` 后仍等待传输 EOF 的问题。  
  该修复有助于减少流式响应卡住、资源未及时释放或调用延迟的问题，属于 Provider 层的重要稳定性修复。

- [#5938 fix(providers): preserve optional tool parameters in Responses requests](https://github.com/HKUDS/nanobot/pull/5938)  
  修复 Responses 工具转换过程中丢失 `strict` 设置的问题。此前某些可选 MCP 参数可能被错误地规范化为必填，导致 Linear 等工具调用参数冲突。  
  这项修复对工具调用可靠性和 MCP 集成兼容性影响较大。

- [#5934 fix(webui): unblock earlier-history pagination and show retry states](https://github.com/HKUDS/nanobot/pull/5934)  
  修复 WebUI 早期历史记录分页不可达的问题，并增加加载 / 失败反馈。  
  对长会话用户体验有直接改善，尤其是在最新页面未填满视口时，之前可能无法继续加载更早历史。

- [#5936 fix(weixin): silence polling request logs](https://github.com/HKUDS/nanobot/pull/5936)  
  降低 WeChat 轮询请求日志噪音，将常规 `httpx` 日志调整为 `WARNING` 级别。  
  该改动改善了网关运行日志的可读性，便于排查真实异常。

- [#5944 feat(webui): polish the GitHub star invitation](https://github.com/HKUDS/nanobot/pull/5944)  
  优化 WebUI 中 GitHub Star 邀请弹窗的视觉和文案，包括插画、动效和多语言文案。  
  属于增长与用户体验层面的改进。

**整体推进判断：**  
今日项目在稳定性方面前进明显，尤其是 Provider / Responses API 相关修复密集落地；WebUI 体验和渠道日志也有小幅改进。与此同时，多个新增能力仍在开放 PR 中，预计后续版本会继续围绕工具能力、远程连接、持久化架构和新 Provider 扩展。

---

## 3. 社区热点

今日 Issues 和 PR 的评论数、点赞数整体较低，未出现明显的高热度讨论；但从优先级和影响范围看，以下事项最值得关注。

- [#5933 fix(cron): preserve pending actions until store save succeeds](https://github.com/HKUDS/nanobot/pull/5933)  
  **优先级：P0，状态：Open**  
  该 PR 修复 Cron 在保存合并后的 store 失败时丢失 `action.jsonl` 待处理动作的问题。虽然评论数不高，但标记为 P0，说明其对数据可靠性影响严重。

- [#5943 refactor(session): centralize state ownership in SQLite](https://github.com/HKUDS/nanobot/pull/5943)  
  **优先级：P1，状态：Open**  
  该 PR 将 Session 状态所有权集中到 SQLite，并通过有界 worker 管理运行态状态操作。它涉及持久化架构重构，可能是后续稳定性和并发一致性的关键基础设施变更。

- [#5941 feat(webui): connect to existing remote nanobot instances](https://github.com/HKUDS/nanobot/pull/5941)  
  **状态：Open**  
  支持本地 WebUI 连接服务器上已有的 NanoBot 实例，反映出用户存在“本地界面 + 远程运行实例”的使用诉求。这可能成为提升桌面 / WebUI 可用性的路线图方向。

- [#5935 fix(copilot): route GPT-6 through Responses](https://github.com/HKUDS/nanobot/pull/5935)  
  **状态：Open**  
  处理 GitHub Copilot GPT-6 模型应通过 Responses API 调用的问题。随着 GPT-6 相关模型进入多个 Provider，模型路由逻辑正在成为当前热点稳定性领域。

---

## 4. Bug 与稳定性

### P0 / 严重

- [#5932 cron: pending actions are lost if the merged store cannot be saved](https://github.com/HKUDS/nanobot/issues/5932)  
  **状态：Open Issue**  
  **问题：** `CronService._merge_action()` 在调用 `_save_store()` 前清空 `action.jsonl`。如果 store 写入失败，例如磁盘空间不足，旧的 `jobs.json` 保留，但已接受的 pending actions 已从磁盘删除。  
  **风险：** 任务动作可能永久丢失，属于数据可靠性问题。  
  **Fix PR：** [#5933 fix(cron): preserve pending actions until store save succeeds](https://github.com/HKUDS/nanobot/pull/5933) 已提交，仍待合并。

### P1 / 高优先级

- [#5937 fix(providers): stop Responses streams at terminal events](https://github.com/HKUDS/nanobot/pull/5937)  
  **状态：Closed**  
  **问题：** Responses 流式解析未在终止事件后及时停止，可能导致等待 EOF、资源释放不及时或流式调用异常延迟。  
  **处理：** 已通过 PR 修复。

- [#5938 fix(providers): preserve optional tool parameters in Responses requests](https://github.com/HKUDS/nanobot/pull/5938)  
  **状态：Closed**  
  **问题：** Responses 工具转换丢失可选参数和 `strict` 设置，可能导致 MCP 工具调用参数被错误强制。  
  **处理：** 已通过 PR 修复。

- [#5943 refactor(session): centralize state ownership in SQLite](https://github.com/HKUDS/nanobot/pull/5943)  
  **状态：Open**  
  **问题背景：** 当前 Session 持久化在 turn execution、metadata updates、shutdown 等路径中共享可变缓存，存在一致性与并发风险。  
  **处理方向：** 使用 SQLite 事务作为权威存储，并通过有界 worker 串行化运行态状态操作。

### P2 / 中优先级

- [#5939 OpenAI Codex model discovery omits GPT-6 Sol and Luna](https://github.com/HKUDS/nanobot/issues/5939)  
  **状态：Closed**  
  **问题：** WebUI 中 OpenAI Codex Provider 模型预设选择器未显示 GPT-6 Sol 和 GPT-6 Luna。  
  **Fix PR：** [#5940](https://github.com/HKUDS/nanobot/pull/5940) 已关闭，问题已处理。

- [#5935 fix(copilot): route GPT-6 through Responses](https://github.com/HKUDS/nanobot/pull/5935)  
  **状态：Open**  
  **问题：** GitHub Copilot GPT-6 模型此前会落到 Chat Completions，而不是 Responses API。  
  **影响：** GPT-6 相关模型调用可能失败或行为不一致。  
  **处理：** PR 已提交，待合并。

- [#5931 fix: 保留 Telegram 命令的换行参数和邮箱内容](https://github.com/HKUDS/nanobot/pull/5931)  
  **状态：Open**  
  **问题：** Telegram 命令在包含换行、制表符、邮箱地址或机器人后缀时，参数可能被截断或路由失败。  
  **处理：** PR 新增 12 项回归测试，覆盖多种命令参数格式。

- [#5942 fix(webui): provide iOS PWA top-edge color surface](https://github.com/HKUDS/nanobot/pull/5942)  
  **状态：Open**  
  **问题：** 针对 iOS PWA 顶部边缘颜色显示问题进行修复。  
  **备注：** PR 说明仍等待受影响 iPhone / iOS 27 standalone PWA 的前后对比验证。

---

## 5. 功能请求与路线图信号

今日多个开放 PR 展示了接下来可能进入版本的功能方向。

- [#5948 feat(tools): use installed ripgrep for native file search](https://github.com/HKUDS/nanobot/pull/5948)  
  **方向：工具性能 / 本地文件搜索**  
  当系统已安装 `ripgrep` 时，NanoBot 可使用原生 `rg` 替代 `grep` 和 `find_files`。这会提升代码库搜索、文件发现等本地 Agent 场景的性能。

- [#5946 feat(recovery): persist completed tool results at execution-batch boundary](https://github.com/HKUDS/nanobot/pull/5946)  
  **方向：执行恢复 / 崩溃恢复**  
  针对多工具调用批次中途崩溃的问题，在执行批次边界持久化已完成工具结果。  
  这表明项目正在增强 Agent 执行过程的容错能力。

- [#5947 feat(providers): add Tsubasa provider metadata](https://github.com/HKUDS/nanobot/pull/5947)  
  **方向：新模型 Provider**  
  新增 Tsubasa Provider 元数据，支持 `tsubasa-fast`、`tsubasa-pro`、`${TSUBASA_API_KEY}` 和默认 API base 省略。  
  可能会纳入下一版本的 Provider 扩展。

- [#5945 feat(web-fetch): add optional Unbrowse reader backend](https://github.com/HKUDS/nanobot/pull/5945)  
  **方向：Web Fetch 能力增强**  
  为 `web_fetch` 增加可选 Unbrowse 后端，在配置 `tools.web.fetch.unbrowseApiKey` 后优先尝试 Unbrowse，再回退到 Jina Reader 和本地 readability。  
  该功能有助于提升网页内容抽取成功率。

- [#5941 feat(webui): connect to existing remote nanobot instances](https://github.com/HKUDS/nanobot/pull/5941)  
  **方向：远程实例连接 / WebUI 工作流**  
  本地 NanoBot WebUI 可连接服务器上已有实例，降低远程部署使用门槛。  
  这是比较明确的产品化信号，可能服务于“本地控制台 + 远程 Agent 后端”的使用场景。

- [#5943 refactor(session): centralize state ownership in SQLite](https://github.com/HKUDS/nanobot/pull/5943)  
  **方向：持久化架构 / 状态一致性**  
  将 Session 权威存储迁移到 SQLite，是后续提升可靠性、恢复能力和并发一致性的基础设施改动。

---

## 6. 用户反馈摘要

由于今日 Issue / PR 评论数和点赞数均较低，缺少长讨论样本；但从问题描述中可以提炼出以下真实用户痛点：

- **模型目录需要及时跟进上游变化**  
  [#5939](https://github.com/HKUDS/nanobot/issues/5939) 显示用户已经能在官方 Codex 客户端看到 GPT-6 Sol / Luna，但 NanoBot WebUI 中不可选。这类问题直接影响用户对新模型的可访问性。

- **自动化任务不能接受数据丢失风险**  
  [#5932](https://github.com/HKUDS/nanobot/issues/5932) 暴露 Cron 在异常写入场景下可能丢失 pending actions。对依赖定时任务或自动化流程的用户而言，这是高影响问题。

- **聊天渠道需要保留原始输入语义**  
  [#5931](https://github.com/HKUDS/nanobot/pull/5931) 反映 Telegram 命令中的换行、制表符、邮箱地址等内容不能被简单空格切分，否则会破坏真实用户输入。

- **长会话 WebUI 需要更可靠的历史访问体验**  
  [#5934](https://github.com/HKUDS/nanobot/pull/5934) 表明用户在查看早期历史时可能遇到分页不可达、加载失败无反馈等问题。该问题已被修复。

- **日志噪音会影响运维排障**  
  [#5936](https://github.com/HKUDS/nanobot/pull/5936) 针对 WeChat 轮询日志降噪，说明渠道集成在长期运行时需要更干净的日志输出。

---

## 7. 待处理积压

本日报数据范围仅覆盖过去 24 小时，未发现明确“长期未响应”的 Issue 或 PR。不过以下开放项优先级较高或影响范围较大，建议维护者优先关注：

- [#5933 fix(cron): preserve pending actions until store save succeeds](https://github.com/HKUDS/nanobot/pull/5933)  
  **P0，建议优先审查。** 对应数据丢失风险，影响 Cron 可靠性。

- [#5943 refactor(session): centralize state ownership in SQLite](https://github.com/HKUDS/nanobot/pull/5943)  
  **P1，架构级改动。** 涉及 Session 权威存储与状态一致性，建议重点关注迁移风险和回归测试覆盖。

- [#5935 fix(copilot): route GPT-6 through Responses](https://github.com/HKUDS/nanobot/pull/5935)  
  **GPT-6 兼容性修复。** 随着多个 Provider 增加 GPT-6 模型，该路由逻辑应尽快稳定。

- [#5931 fix: 保留 Telegram 命令的换行参数和邮箱内容](https://github.com/HKUDS/nanobot/pull/5931)  
  **渠道输入兼容性。** 影响 Telegram 命令用户，已有较完整回归测试，可考虑尽快合并。

- [#5946 feat(recovery): persist completed tool results at execution-batch boundary](https://github.com/HKUDS/nanobot/pull/5946)  
  **恢复能力增强。** 对 Agent 多工具调用的崩溃恢复能力有帮助，建议结合现有 checkpoint 机制重点评审。

- [#5941 feat(webui): connect to existing remote nanobot instances](https://github.com/HKUDS/nanobot/pull/5941)  
  **产品体验增强。** 若远程实例连接是近期路线图重点，该 PR 值得尽快进入设计和安全审查。

---

## 总体健康度评估

NanoBot 今日开发活跃度高，PR 数量显著多于 Issue 数量，说明维护者和贡献者正在主动推进修复与功能扩展。稳定性问题响应及时，多个 Provider / Responses API 回归已被修复；但 Cron 数据可靠性、Session 状态架构、GPT-6 Copilot 路由等关键开放 PR 仍需尽快处理。整体看，项目处于健康且快速迭代状态，短期重点应放在 **P0/P1 稳定性合并、GPT-6 兼容性收敛、恢复能力和持久化架构验证**。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
日期：2026-09-28  
仓库：NousResearch/hermes-agent

---

## 1. 今日速览

过去 24 小时 Hermes Agent 活跃度非常高：Issue 更新 50 条，其中 49 条仍处于新开或活跃状态，仅 1 条关闭；PR 更新 50 条，其中 48 条仍待合并，2 条已合并或关闭。整体来看，项目正处在高频修复与回归消化阶段，问题集中在 Gateway 会话状态、Desktop 多 profile、Telegram/WeCom/Buzz 消息投递、更新安装、插件安全与依赖风险等方面。

今日没有新版本发布，当前社区反馈仍主要围绕 v0.21.5 / v2026.9.24 之后的回归与稳定性问题。PR 侧响应速度较快，多个当天报告的 P2/P3 问题已经出现对应修复 PR，但 P0/P1 级别的会话状态与压缩一致性问题仍需重点跟进。

项目健康度评估：**活跃度高、维护响应快，但稳定性压力明显上升**。尤其 Gateway、Desktop、会话恢复、approval flow、插件与安装更新链路上出现较多边界条件问题，说明近期功能面扩张较快，回归测试和跨 profile / 跨平台场景仍需加强。

---

## 2. 项目进展

今日没有新版本发布；项目进展主要体现在问题关闭、修复 PR 提交以及对高频回归的快速响应。

### 已关闭 / 推进中的重要事项

#### 1. Plain-text approval 未送达后不应继续等待  
- Issue：[#125950](https://github.com/NousResearch/hermes-agent/issues/125950)  
- PR：[#125962](https://github.com/NousResearch/hermes-agent/pull/125962) 已关闭  
- 替代 / 后续 PR：[#125961](https://github.com/NousResearch/hermes-agent/pull/125961) 仍打开  

该问题影响 Gateway 的执行审批流程：当 plain-text approval 消息发送失败时，系统仍等待用户批准，导致 WeCom 等消息平台上的会话被卡死。  
PR #125962 尝试让未送达的 approval prompt 立即失败并通知 waiter，不过该 PR 已关闭；目前更完整的修复看起来转移到 #125961，后者会检查 `SendResult`、处理异常，并在调度失败时显式通知失败。

**进展评价**：这是消息投递可靠性上的关键修复，若 #125961 合并，将显著减少“用户根本没看到审批提示但系统一直等待”的假死体验。

---

#### 2. 多路复用 Gateway 的 channel directory 问题已关闭  
- Issue：[#125971](https://github.com/NousResearch/hermes-agent/issues/125971) 已关闭  

该问题描述了 multiplexed gateway 场景下，如果默认 profile 没有 messaging platform，而 bot 都配置在 secondary profiles，channel directory 会从空 adapter map 构建，导致 `send_message` 找不到目标。该 Issue 已关闭，说明维护者可能已判定重复、无效或已有修复路径。

**进展评价**：关闭该问题有助于收敛 Gateway 多 profile 的问题面，但仍建议维护者在相关 PR 或 issue 中明确最终修复位置，因为今日仍有多个多 profile / profile scope 相关问题处于打开状态。

---

#### 3. Desktop approval-mode profile 作用域修复已提交  
- Issue：[#125969](https://github.com/NousResearch/hermes-agent/issues/125969)  
- PR：[#125977](https://github.com/NousResearch/hermes-agent/pull/125977)  

Desktop approval-mode store 本地按 profile 缓存，但 RPC `config.get` / `config.set` 没有传入 `profile` 参数，导致读写全部落到 backend 启动 profile。PR #125977 明确将 approval-mode 读写 scope 到当前查看的 profile。

**进展评价**：这是 Desktop 多 profile 可用性的实质性改进，属于近期多 profile 稳定性修复中的优先项。

---

#### 4. Desktop busy input mode 修复已提交  
- Issue：[#125963](https://github.com/NousResearch/hermes-agent/issues/125963)  
- PR：[#125983](https://github.com/NousResearch/hermes-agent/pull/125983)  

Desktop 没有读取 `display.busy_input_mode`，导致用户配置 `queue` 后，运行中发送普通文本仍被当成 mid-turn steer，而不是排队。PR #125983 使 Desktop composer 尊重该配置，与 CLI 行为对齐。

**进展评价**：该修复改善 Desktop 与 CLI 的行为一致性，也降低长任务期间误触发 steer 的风险。

---

#### 5. Codex app-server final message 重复渲染修复已提交  
- Issue：[#125951](https://github.com/NousResearch/hermes-agent/issues/125951)  
- PR：[#125965](https://github.com/NousResearch/hermes-agent/pull/125965)  

使用 `openai-codex` / `codex_app_server` runtime 时，Dashboard/TUI 会将最终 assistant reply 渲染两次。PR #125965 调整 final message 发布逻辑，避免 completed message 被当作 interim 后又在 final complete 时重复发送。

**进展评价**：这是 UI/streaming 层的体验修复，影响使用 Codex runtime 的用户。

---

## 3. 社区热点

### 1. P0：Gateway 重启后 internal-event pins 丢失，导致 system prompt 翻转  
- Issue：[#125793](https://github.com/NousResearch/hermes-agent/issues/125793)  
- 状态：Open  
- 评论数：5  
- 标签：`type/bug`, `comp/gateway`, `P0`, `area/sessions`, `sweeper:risk-session-state`, `sweeper:risk-caching`

这是今日讨论最活跃的问题。核心是 `ConversationState.ephemeral_pin` 与 `ConversationState.channel_pin` 仅存在内存中，Gateway 重启后第一个 internal event 可能使用错误或空的 channel prompt，导致 system prompt 翻转、agent rebuild、prompt cache miss 等连锁影响。

**背后诉求**：用户希望会话状态在 Gateway 重启、internal event、busy follow-up 等场景下保持一致，不应因为重启导致 system prompt / channel prompt 被错误重置。  
**风险判断**：P0 合理。该问题可能影响长会话、缓存稳定性、agent 行为一致性，是当前最需要维护者优先处理的稳定性问题之一。

---

### 2. Desktop approval-mode 跨 profile 污染  
- Issue：[#125969](https://github.com/NousResearch/hermes-agent/issues/125969)  
- PR：[#125977](https://github.com/NousResearch/hermes-agent/pull/125977)  
- 状态：Issue Open，PR Open  
- 评论数：2  
- 标签：`comp/tui`, `comp/desktop`, `area/config`, `area/profiles`, `P2`

该问题指出 Desktop 的 approval-mode 菜单虽然按 profile 缓存，但后端 RPC 没有 profile scope，导致任意 profile 的 approval mode 实际读写 launch profile 的配置。

**背后诉求**：多 profile 用户需要配置隔离，尤其是 approval mode 这种安全相关选项不能串 profile。  
**当前状态**：已有针对性 PR #125977，是今日响应较快的修复之一。

---

### 3. `pillow-heif` 依赖存在多个 CVE，包括高危 RCE  
- Issue：[#125940](https://github.com/NousResearch/hermes-agent/issues/125940)  
- 状态：Open  
- 评论数：2  
- 标签：`type/security`, `tool/vision`, `dependencies`, `P3`, `needs-repro`

用户报告内部 Python 包 `pillow-heif` 1.7.0 依赖的 HEIF 库存在多个 CVE，其中包括高危 RCE：CVE-2026-81353。

**背后诉求**：用户对 Hermes 内部 venv / PM-managed 环境中的依赖安全性提出担忧，希望项目给出升级、锁定或规避方案。  
**风险判断**：虽然标为 P3 且 needs-repro，但由于涉及潜在 RCE，建议维护者尽快确认受影响路径、默认启用状态以及是否存在远程触发面。

---

### 4. `hermes plugins update` 无法更新 caution-verdict 插件  
- Issue：[#125928](https://github.com/NousResearch/hermes-agent/issues/125928)  
- 状态：Open  
- 评论数：2  
- 标签：`comp/cli`, `comp/plugins`, `P3`

用户指出，安装时可以通过 force 接受 `caution` 安全扫描 verdict 的插件，但更新时没有 `--force`，且扫描路径硬编码 `force=False`，导致这类插件永远无法更新。

**背后诉求**：插件系统需要在安全策略与用户自主决策之间保持一致。用户已经在安装时接受风险，更新流程也应提供明确的二次确认或 force 机制。  
**路线图信号**：插件安全扫描与生命周期管理可能需要更完整的 UX 设计。

---

### 5. Follow-up turn 无 `MessageEvent` 导致 channel_prompt=None  
- Issue：[#125763](https://github.com/NousResearch/hermes-agent/issues/125763)  
- 状态：Open  
- 评论数：2  
- 标签：`comp/agent`, `comp/gateway`, `P0`, `area/sessions`

该问题与 #125793 相关，是 leftover steer / interrupt-text follow-up 场景下 channel prompt 丢失导致 system prompt 翻转的问题。

**背后诉求**：用户希望 busy queue、steer、interrupt、internal events 等非普通 message turn 的上下文完整性能够被统一保障。  
**风险判断**：与 #125793 共同构成 Gateway session state 的核心风险区。

---

## 4. Bug 与稳定性

以下按严重程度与影响面排序，并标注已知修复 PR。

### P0 / P1：会话状态与压缩一致性

#### 1. Gateway 重启后 internal-event pins 丢失  
- Issue：[#125793](https://github.com/NousResearch/hermes-agent/issues/125793)  
- 严重度：P0  
- 修复 PR：暂无明确对应 PR  
- 影响：Gateway 重启后的 internal event 可能导致 system prompt 翻转、agent rebuild、prompt cache miss。  
- 关注点：需要将 session-context pin / channel prompt pin 做成可恢复或可从 durable state 重建。

#### 2. Leftover steer / interrupt follow-up 使用 `channel_prompt=None`  
- Issue：[#125763](https://github.com/NousResearch/hermes-agent/issues/125763)  
- 严重度：P0  
- 修复 PR：暂无明确对应 PR  
- 影响：忙碌状态下的后续输入、interrupt text、pending steer 可能触发错误 channel prompt。  
- 关注点：所有非 `MessageEvent` turn 都应有稳定的 channel identity / prompt 来源。

#### 3. Rotation compaction 将当前用户 prompt 写入 compression child 两次  
- Issue：[#125888](https://github.com/NousResearch/hermes-agent/issues/125888)  
- 严重度：P1  
- 修复 PR：暂无明确对应 PR  
- 影响：`compression.in_place: false` 下 preflight compaction 采用 durable parent transcript 后，可能重复写入当前用户 prompt。  
- 关注点：压缩、持久化快照、当前 turn 未提交消息之间的边界需要更严格的幂等性保证。

---

### P2：消息投递、Desktop、多 profile 与安装更新

#### 4. Plain-text approval 发送失败后仍等待用户审批  
- Issue：[#125950](https://github.com/NousResearch/hermes-agent/issues/125950)  
- 修复 PR：[#125961](https://github.com/NousResearch/hermes-agent/pull/125961)，另有已关闭 PR [#125962](https://github.com/NousResearch/hermes-agent/pull/125962)  
- 影响：WeCom 等平台上 approval prompt 未送达时，用户无法知道需要审批，系统却等待超时。  
- 状态：已有修复方向，建议尽快合并并补充测试。

#### 5. Desktop resume Gateway session 时错误组合 provider/model  
- Issue：[#125942](https://github.com/NousResearch/hermes-agent/issues/125942)  
- 修复 PR：暂无明确对应 PR  
- 影响：Desktop/TUI 恢复由 Gateway 驱动的会话时，模型来自最新 Gateway turn，但 provider 使用 stale `billing_provider`，可能导致 404。  
- 关注点：resume path 应优先使用 `model_config.gateway_runtime` 或 durable session 中的运行时元信息。

#### 6. Host update-restart obligation 带空 `expected_sha` 后无法解除  
- Issue：[#125952](https://github.com/NousResearch/hermes-agent/issues/125952)  
- 修复 PR：[#125964](https://github.com/NousResearch/hermes-agent/pull/125964)  
- 影响：`hermes update` 未改变代码 SHA 时仍设置 restart obligation，导致 fleet-restart-pending 警告一直存在。  
- 状态：已有修复 PR，通过 live-fleet evidence 解除 SHA-less obligation。

#### 7. Desktop approval mode 读写落到 launch profile  
- Issue：[#125969](https://github.com/NousResearch/hermes-agent/issues/125969)  
- 修复 PR：[#125977](https://github.com/NousResearch/hermes-agent/pull/125977)  
- 影响：多 profile 用户的 approval 配置被错误读写，可能造成安全策略错配。

#### 8. Desktop `display.busy_input_mode` 未生效  
- Issue：[#125963](https://github.com/NousResearch/hermes-agent/issues/125963)  
- 修复 PR：[#125983](https://github.com/NousResearch/hermes-agent/pull/125983)  
- 影响：Desktop 中 mid-turn 普通文本总是 steer，而非按配置排队。  
- 状态：已有修复 PR。

#### 9. Telegram Markdown link chunking 错误拆分链接  
- Issue：[#125885](https://github.com/NousResearch/hermes-agent/issues/125885)  
- 修复 PR：暂无明确对应 PR  
- 影响：长消息拆分时，短 Markdown 链接可能被拆开，破坏展示和点击体验。  
- 关注点：消息 chunker 需要保护 Markdown token 边界。

#### 10. Telegram document send 降级为裸路径文本  
- Issue：[#125857](https://github.com/NousResearch/hermes-agent/issues/125857)  
- 修复 PR：暂无明确对应 PR  
- 影响：用户期待 Telegram 原生文件上传，但实际只收到本地路径字符串。  
- 关注点：fallback 策略需要更透明，并优先尝试 native upload。

#### 11. Telegram button callback 被长文本 turn 阻塞  
- PR：[#125976](https://github.com/NousResearch/hermes-agent/pull/125976)  
- 相关 PR：[#125959](https://github.com/NousResearch/hermes-agent/pull/125959)  
- 影响：按钮点击 acknowledgement 可能延迟或超时，Telegram spinner 挂起。  
- 状态：已有两个修复 PR，分别处理 callback 并发和 auth gate 前提前 acknowledge。

#### 12. Buzz `/approve` 有时不识别 pending command  
- Issue：[#125980](https://github.com/NousResearch/hermes-agent/issues/125980)  
- 修复 PR：暂无明确对应 PR  
- 影响：用户在 5 分钟审批窗口内回复 `/approve`，偶尔仍收到 “No pending command to approve”。  
- 关注点：approval state lookup、thread/session mapping、平台插件消息归属可能存在竞态或 key 不一致。

---

### P3 / 安全与兼容性

#### 13. `pillow-heif` 依赖 CVE 风险  
- Issue：[#125940](https://github.com/NousResearch/hermes-agent/issues/125940)  
- 修复 PR：暂无明确对应 PR  
- 影响：潜在高危 RCE，取决于 vision / HEIF 处理路径是否默认启用或可被远程触发。  
- 建议：尽快确认受影响版本并发布安全建议。

#### 14. 内部 Python 环境使用过时且多漏洞的 hermes-agent package  
- Issue：[#125909](https://github.com/NousResearch/hermes-agent/issues/125909)  
- 相关 Issue：[#125914](https://github.com/NousResearch/hermes-agent/issues/125914)  
- 修复 PR：暂无明确对应 PR  
- 影响：安装目录下多个 internal environments 可能包含过期包；升级 hermes-agent 时还可能降级其他包到 vulnerable 版本。  
- 关注点：PM-managed environment 的依赖锁、升级策略和漏洞扫描需要更透明。

#### 15. LSP 默认启动 cloned repository 自带 Python interpreter  
- Issue：[#125954](https://github.com/NousResearch/hermes-agent/issues/125954)  
- 修复 PR：暂无明确对应 PR  
- 影响：编辑克隆仓库文件时，LSP 可能无审批地运行仓库内 Python interpreter。  
- 风险判断：虽然标为 P3，但涉及本地代码执行边界，建议提高安全审查优先级。

#### 16. `hermes plugins update` 无法更新 caution 插件  
- Issue：[#125928](https://github.com/NousResearch/hermes-agent/issues/125928)  
- 修复 PR：暂无明确对应 PR  
- 影响：用户无法更新已确认风险的插件，插件生命周期被卡住。  
- 建议：添加 `--force` 或交互确认，并记录用户接受风险的 audit trail。

---

## 5. 功能请求与路线图信号

### 1. Linux Desktop 启动失败时提供通知、doctor 检查与自诊断 skill  
- Issue：[#125813](https://github.com/NousResearch/hermes-agent/issues/125813)  
- 类型：Feature  
- 标签：`comp/cli`, `comp/desktop`, `tool/skills`, `area/install-update`, `P3`

用户希望当 Linux 菜单启动 Hermes Desktop 失败时，不再静默退出，而是提供桌面通知、`hermes doctor` launcher 检查，以及一个 bundled self-diagnosis skill。

**路线图信号**：Desktop 安装与启动诊断可能成为下一个可用性改进方向。该需求与近期安装更新、launcher wrapper、Omarchy 兼容问题形成呼应。

---

### 2. Dashboard Kanban task modal 向 Desktop Kanban 看齐  
- PR：[#125979](https://github.com/NousResearch/hermes-agent/pull/125979)  
- 类型：Feature  
- 标签：`comp/plugins`, `comp/dashboard`, `P3`

该 PR 增强 Dashboard Kanban task modal，补齐 Desktop Kanban 的功能，包括两栏任务弹窗、dependency chips、Comments / Events tabs、向运行中 worker 发消息、effort estimate、task actions 等。

**路线图信号**：Dashboard 与 Desktop 的功能一致性正在被推进，Kanban / task management 可能是 Hermes Agent 面向长期任务和后台 worker 的重要 UX 方向。

---

### 3. Desktop 插件可接管 `/background` 与 `/btw` 回答  
- PR：[#125968](https://github.com/NousResearch/hermes-agent/pull/125968)  
- 类型：Feature  
- 标签：`comp/plugins`, `comp/desktop`, `sweeper:risk-session-state`, `P3`

该 PR 允许 Desktop 插件 claim side-task answers，使 `/background`、`/btw` 的结果可以显示到浮窗或独立 pane，而不是固定追加进 transcript。

**路线图信号**：Hermes 插件系统正在从后端工具扩展到前端展示与交互编排。未来可能出现更多 UI 插件化能力。

---

### 4. Checkpoint 性能优化与排除路径配置  
- PR：[#125967](https://github.com/NousResearch/hermes-agent/pull/125967)  
- 类型：Performance  
- 标签：`comp/agent`, `comp/cli`, `comp/gateway`, `area/config`, `P2`

该 PR 解决长操作中 checkpoint 重复 re-hash 整个工作目录的问题，并新增 `checkpoints.exclude_paths`。作者基于生产 Gateway 长任务数据：83 次 tool call、33 分钟运行，指出 snapshot 成本较高。

**路线图信号**：Hermes 正在向更长时长、更复杂 tool-heavy 工作流演进，因此 checkpoint 的性能和可配置性会越来越重要。

---

### 5. Plugins / Skills 生命周期与 deferred changes  
- PR：[#125978](https://github.com/NousResearch/hermes-agent/pull/125978)  
- Issue：[#125785](https://github.com/NousResearch/hermes-agent/issues/125785)  
- 类型：Bug / 设计信号

PR #125978 修复 `/skills` deferred hub changes 在同一进程下一次 session 中不生效的问题。Issue #125785 则指出 delegated subagents 创建的 skills 被错误标记为用户创建，导致 curator 和 background review 无法管理。

**路线图信号**：skills 系统需要更清晰的 ownership、lifecycle、curation 和 deferred apply 语义。这对多 agent / delegated agent 场景很重要。

---

## 6. 用户反馈摘要

### 1. 用户最不满意的是“会话状态不可信”
代表问题：  
- [#125793](https://github.com/NousResearch/hermes-agent/issues/125793)  
- [#125763](https://github.com/NousResearch/hermes-agent/issues/125763)  
- [#125975](https://github.com/NousResearch/hermes-agent/issues/125975)  
- [#125766](https://github.com/NousResearch/hermes-agent/issues/125766)

用户反馈集中在长会话、Gateway 重启、Desktop history navigation、tool-heavy turn 后继续发送消息等场景。痛点不是单纯 UI 小问题，而是“当前会话是否仍然指向正确上下文”变得不确定。  
例如 #125975 中，单窗口 Desktop 在 tool-using turn 后触发 “Chat out of date”，用户没有打开其他窗口却被 stale-send guard 拦截，说明用户对本地会话一致性的预期与系统内部 folded bubbles / durable row id 机制发生冲突。

---

### 2. 多 profile 用户对配置隔离和日志隔离非常敏感
代表问题：  
- [#125969](https://github.com/NousResearch/hermes-agent/issues/125969)  
- [#125974](https://github.com/NousResearch/hermes-agent/issues/125974)  
- [#125971](https://github.com/NousResearch/hermes-agent/issues/125971)

Desktop / Gateway 已经支持多 profile，但多个问题说明底层仍有 launch profile 假设：  
- approval mode 实际读写 launch profile；  
- 非 launch profile 的 session 也写入 launch profile 的 `agent.log`；  
- multiplexed gateway 的 channel directory 可能只从默认 profile adapter 构建。  

用户期望每个 profile 在配置、日志、channel、auth、approval 上都严格隔离。

---

### 3. 消息平台用户重视“投递是否真的发生”
代表问题：  
- [#125950](https://github.com/NousResearch/hermes-agent/issues/125950)  
- [#125885](https://github.com/NousResearch/hermes-agent/issues/125885)  
- [#125857](https://github.com/NousResearch/hermes-agent/issues/125857)  
- [#125980](https://github.com/NousResearch/hermes-agent/issues/125980)

Telegram、WeCom、Buzz 等平台用户并不只关心 agent 是否生成了内容，更关心内容是否被平台正确展示：  
- approval prompt 没送达却等待；  
- Markdown 链接被拆坏；  
- 文档发送变成裸路径；  
- `/approve` 回复在窗口内却不被识别。  

这说明 Gateway 的 delivery semantics 需要从“尽力发送”升级为“明确送达、明确失败、可恢复”。

---

### 4. 安全用户关注内部环境和默认执行边界
代表问题：  
- [#125940](https://github.com/NousResearch/hermes-agent/issues/125940)  
- [#125909](https://github.com/NousResearch/hermes-agent/issues/125909)  
- [#125914](https://github.com/NousResearch/hermes-agent/issues/125914)  
- [#125954](https://github.com/NousResearch/hermes-agent/issues/125954)

用户不仅检查主包版本，还深入到 `~/.hermes/installs`、PM-managed venv、LSP 默认行为等内部细节。反馈显示，Hermes 的用户群中已有较强安全意识的使用者，他们希望项目对依赖来源、自动执行、插件扫描、LSP 启动等行为有明确边界和可审计性。

---

### 5. Desktop 用户对回归和兼容性较敏感
代表问题：  
- [#125852](https://github.com/NousResearch/hermes-agent/issues/125852)  
- [#125886](https://github.com/NousResearch/hermes-agent/issues/125886)  
- [#125766](https://github.com/NousResearch/hermes-agent/issues/125766)  
- [#125963](https://github.com/NousResearch/hermes-agent/issues/125963)

Desktop 相关反馈覆盖启动 wrapper 兼容、粘贴 Markdown 链接被改写、历史导航卡顿、busy input 配置不生效等。用户对 Desktop 的期待已经不只是“能用”，而是希望它具备稳定、可预测、与 CLI 配置一致的体验。

---

## 7. 待处理积压与维护者关注点

> 注：本日报仅基于过去 24 小时数据，无法完整判断“长期未响应”。以下为当前仍打开且风险较高、应优先分流或响应的问题。

### 最高优先级

#### 1. P0 Gateway session state 问题组  
- [#125793](https://github.com/NousResearch/hermes-agent/issues/125793)  
- [#125763](https://github.com/NousResearch/hermes-agent/issues/125763)

建议维护者将这两个问题合并到一个 session-state incident / tracking issue 下处理，明确：  
- internal event 如何恢复 channel prompt；  
- leftover steer / interrupt text 如何继承 channel identity；  
- Gateway restart 后首个事件的状态来源；  
- prompt cache miss 是否只是症状还是会影响模型行为。

---

#### 2. P1 compression durable snapshot 重复写入  
- [#125888](https://github.com/NousResearch/hermes-agent/issues/125888)

该问题可能污染压缩子会话内容，建议优先确认是否影响长期记忆、会话摘要或后续推理质量。

---

### 高优先级

#### 3. Security / dependency 风险  
- [#125940](https://github.com/NousResearch/hermes-agent/issues/125940)  
- [#125909](https://github.com/NousResearch/hermes-agent/issues/125909)  
- [#125914](https://github.com/NousResearch/hermes-agent/issues/125914)  
- [#125954](https://github.com/NousResearch/hermes-agent/issues/125954)

建议维护者快速给出 triage 结论：  
- 是否可复现；  
- 是否默认可触发；  
- 是否影响官方 release；  
- 是否需要临时 workaround；  
- 是否需要安全公告。

---

#### 4. 多 profile 隔离问题  
- [#125969](https://github.com/NousResearch/hermes-agent/issues/125969) / [#125977](https://github.com/NousResearch/hermes-agent/pull/125977)  
- [#125974](https://github.com/NousResearch/hermes-agent/issues/125974)  
- [#125971](https://github.com/NousResearch/hermes-agent/issues/125971)

建议维护者对 config RPC、logging、channel directory、auth、approval mode 做一次 profile-scope audit。今日的问题显示相同根因可能分散在多个组件。

---

#### 5. 消息投递可靠性问题  
- [#125950](https://github.com/NousResearch/hermes-agent/issues/125950) / [#125961](https://github.com/NousResearch/hermes-agent/pull/125961)  
- [#125980](https://github.com/NousResearch/hermes-agent/issues/125980)  
- [#125885](https://github.com/NousResearch/hermes-agent/issues/125885)  
- [#125857](https://github.com/NousResearch/hermes-agent/issues/125857)  
- [#125976](https://github.com/NousResearch/hermes-agent/pull/125976)  
- [#125959](https://github.com/NousResearch/hermes-agent/pull/125959)

建议维护者建立 Gateway delivery test matrix，覆盖 Telegram、WeCom、Buzz、WhatsApp 等平台的：  
- 文本投递失败；  
- 文件投递 fallback；  
- Markdown chunking；  
- approval prompt 生命周期；  
- callback acknowledgement deadline；  
- busy turn 下的 follow-up message / button tap。

---

## 总体判断

Hermes Agent 今日处于**高活跃、高修复压力**状态。社区反馈密集，且问题质量较高，很多报告包含明确代码路径、复现条件和影响分析。维护侧也有快速响应：多个 P2/P3 问题当天已有 PR，例如 Desktop profile scope、busy input mode、approval delivery、Codex 重复渲染、update restart obligation、Telegram callback 等。

但从健康度看，当前最大风险不是功能缺失，而是跨组件一致性：Gateway session state、Desktop 多 profile、消息平台 delivery semantics、内部 Python 环境与安全边界都暴露出系统复杂度上升后的回归压力。建议下一阶段优先合并稳定性修复、补充跨 profile / Gateway / Desktop / messaging platform 的集成测试，并对 P0 会话状态问题发布明确修复计划。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-09-28

## 1. 今日速览

过去 24 小时，PicoClaw 项目共有 **2 条 Issue 更新**、**1 条 PR 更新**，无新版本发布，整体活跃度处于 **轻量但有效推进** 状态。  
今日新增讨论主要集中在 **OpenAI-compatible provider 生态扩展** 与 **OneBot 渠道行为可配置化** 两个方向，体现出用户对多模型接入能力和聊天渠道细粒度控制的需求。  
虽然没有 PR 被合并或 Issue 被关闭，但已有一个功能请求配套提交了 PR，说明社区贡献链路较顺畅。  
当前未观察到新增 Bug、崩溃或回归报告，短期稳定性风险较低。

---

## 3. 项目进展

今日暂无已合并或已关闭的重要 PR。

### 待合并 PR

#### #3396 feat(channels/onebot): add opt-in toggle for acknowledgement reactions  
- 链接：https://github.com/sipeed/picoclaw/pull/3396  
- 作者：ycsqwan  
- 状态：OPEN  
- 创建时间：2026-09-27  
- 关联需求：[#3395](https://github.com/sipeed/picoclaw/issues/3395)

该 PR 为 OneBot 渠道新增 `reaction_enabled` 配置项，默认值为 `false`，用于控制是否启用自动表情回应。  
目前 OneBot 渠道会对每条消息自动调用 `set_msg_emoji_like`，该 PR 将其改为显式启用模式，避免默认行为干扰群聊体验。

**推进意义：**
- 改善 OneBot / QQ 群场景下的用户体验；
- 降低默认行为的侵入性；
- 将硬编码逻辑转为可配置项，提升渠道适配灵活性；
- 属于小范围、低风险、用户感知明显的改进，具备较高合并可能性。

---

## 4. 社区热点

今日社区讨论数量整体不高，所有新增 Issue / PR 均暂无评论和点赞，因此热点主要根据新增内容的重要性和实际用户诉求判断。

### #3395 [Feature] Make OneBot auto-ack reaction configurable  
- 链接：https://github.com/sipeed/picoclaw/issues/3395  
- 作者：ycsqwan  
- 状态：OPEN  
- 评论数：0  
- 反应数：0  

该 Issue 指出，PicoClaw 在 OneBot 渠道中会对每条群消息自动发送 emoji acknowledgement，具体行为来自 `OneBotChannel.ReactToMessage` 中硬编码的 `set_msg_emoji_like`，且当前不可关闭。

**背后诉求：**
- 用户在 QQ / NapCat 群聊中希望机器人行为更克制；
- 自动表情回应可能导致群聊噪音、误触发或不符合群管理预期；
- 使用者希望通过配置控制机器人交互风格，而非接受固定默认行为。

该问题已由 PR [#3396](https://github.com/sipeed/picoclaw/pull/3396) 提供实现方案，是今日最具落地性的社区反馈。

---

### #3397 [Feature] Add Tsubasa to the existing OpenAI-compatible provider catalog  
- 链接：https://github.com/sipeed/picoclaw/issues/3397  
- 作者：cenab  
- 状态：OPEN  
- 评论数：0  
- 反应数：0  

该 Issue 建议将 Tsubasa 添加到现有 OpenAI-compatible provider catalog 中。用户目前虽然可以通过显式 `openai` 模型条目并配置自定义 API base 来使用 Tsubasa，但 provider picker 尚未直接提供对应 endpoint 和公开模型别名。

**背后诉求：**
- 降低 OpenAI-compatible 模型提供方的接入门槛；
- 减少手动配置 API base 和 model alias 的复杂度；
- 提升 provider picker 的完整性和易用性；
- 反映用户对多供应商、多模型后端选择的持续需求。

该请求属于典型的 provider catalog 扩展，改动面预计较小，若维护者认可 Tsubasa 的兼容性和稳定性，后续进入下一版本的可能性较高。

---

## 5. Bug 与稳定性

过去 24 小时未发现新的 Bug、崩溃、回归或稳定性问题报告。

### 当前观察

| 严重程度 | 问题 | 状态 | 是否有 Fix PR |
|---|---|---|---|
| 高 | 无 | - | - |
| 中 | 无 | - | - |
| 低 | OneBot 自动 emoji 回应被认为影响体验，但属于功能行为问题，不是稳定性 Bug | Issue OPEN | 已有 PR #3396 |

OneBot 自动回应问题更接近“默认行为不可配置”的产品体验问题，而非程序崩溃或功能回归。已有对应修复型功能 PR，因此短期风险可控。

---

## 6. 功能请求与路线图信号

### 6.1 OneBot 自动回应开关

- Issue：https://github.com/sipeed/picoclaw/issues/3395  
- PR：https://github.com/sipeed/picoclaw/pull/3396  
- 状态：Issue OPEN，PR OPEN  
- 合并可能性：较高  

该功能请求已经有实现 PR，且改动目标明确：通过 `reaction_enabled` 控制 OneBot 是否自动发送 acknowledgement reaction。  
由于默认值为 `false`，该 PR 倾向于降低默认噪音，同时允许需要该功能的用户手动开启，符合配置化和最小惊扰原则。

**可能进入下一版本的原因：**
- 需求清晰；
- 实现范围较小；
- 有直接 PR；
- 对现有用户体验有明显改善；
- 默认关闭可以降低行为变更风险。

---

### 6.2 增加 Tsubasa provider catalog 支持

- Issue：https://github.com/sipeed/picoclaw/issues/3397  
- 状态：OPEN  
- 合并可能性：中等  

该请求希望将 Tsubasa 作为 OpenAI-compatible provider 添加到内置 provider catalog 中。  
PicoClaw 当前已经允许用户通过自定义 OpenAI-compatible 配置访问 Tsubasa，但缺少开箱即用的 provider picker 支持。

**路线图信号：**
- 用户希望 PicoClaw 不仅支持自定义 provider，还能维护一套更完整的常用供应商目录；
- OpenAI-compatible 生态仍是项目扩展重点；
- provider catalog 的维护质量会直接影响新用户配置体验。

**潜在注意事项：**
- 需要确认 Tsubasa API endpoint 稳定性；
- 需要校验公开模型别名是否准确；
- 需要避免 provider catalog 膨胀导致维护成本上升；
- 若涉及鉴权、限流或模型命名差异，可能需要补充文档。

---

## 7. 用户反馈摘要

今日 Issue 和 PR 均暂无评论，因此以下反馈主要来自 Issue 描述中体现的真实使用场景。

### OneBot / QQ 群用户的主要痛点

来自：[#3395](https://github.com/sipeed/picoclaw/issues/3395)

用户在通过 OneBot 渠道连接 QQ / NapCat 时发现，机器人会对每一条群消息自动发送 emoji acknowledgement。  
这种行为在部分群聊中可能显得过于频繁，带来以下问题：

- 群消息多时会产生额外噪音；
- 自动点赞 / 表情回应可能不符合机器人角色预期；
- 用户希望机器人只在明确需要时做出反馈；
- 群聊管理者可能更偏好低干扰模式；
- 当前硬编码行为缺少配置入口，无法按场景关闭。

对应 PR [#3396](https://github.com/sipeed/picoclaw/pull/3396) 说明贡献者希望通过默认关闭、显式启用的方式解决该问题。

---

### OpenAI-compatible provider 用户的主要痛点

来自：[#3397](https://github.com/sipeed/picoclaw/issues/3397)

用户已经可以通过自定义 OpenAI-compatible 配置使用 Tsubasa，但仍然希望 PicoClaw 在 provider picker 中直接提供该选项。

反映出的痛点包括：

- 手动填写 API base 对普通用户不够友好；
- 模型别名需要自行查找和维护；
- provider picker 未覆盖常用供应商时，会降低开箱即用体验；
- 用户希望项目内置配置能够跟上 OpenAI-compatible 生态扩展。

这类反馈说明 PicoClaw 的模型接入能力正在被用户用于更多第三方兼容接口，provider catalog 的易用性正在变得更重要。

---

## 8. 待处理积压

根据本次提供的数据，无法判断长期未响应的重要 Issue 或 PR，因为当前数据仅覆盖最近 24 小时更新，且没有历史积压列表。

### 今日需要维护者关注的开放项

#### #3396 OneBot acknowledgement reactions 开关 PR  
- 链接：https://github.com/sipeed/picoclaw/pull/3396  
- 建议优先级：高  
- 原因：已有明确用户痛点与实现方案，改动范围较小，适合尽快 review。

#### #3395 OneBot auto-ack reaction configurable  
- 链接：https://github.com/sipeed/picoclaw/issues/3395  
- 建议优先级：中高  
- 原因：已有关联 PR，可在 PR review 后同步关闭。

#### #3397 Add Tsubasa provider catalog  
- 链接：https://github.com/sipeed/picoclaw/issues/3397  
- 建议优先级：中  
- 原因：属于 provider catalog 扩展，建议维护者确认 endpoint、模型别名和兼容性后决定是否接受。

---

## 项目健康度评估

| 维度 | 今日状态 | 评价 |
|---|---|---|
| 活跃度 | 2 个 Issue，1 个 PR | 轻量活跃 |
| 版本发布 | 无 | 正常 |
| PR 推进 | 1 个待合并 PR | 有社区贡献输入 |
| Bug 风险 | 无新增 Bug | 稳定 |
| 用户诉求 | OneBot 可配置化、provider catalog 扩展 | 明确且可执行 |
| 维护压力 | 暂未体现长期积压 | 可控 |

**总体判断：** PicoClaw 今日没有大规模更新，但社区反馈质量较高，尤其是 OneBot 配置化问题已经形成“Issue → PR”的完整贡献闭环。短期建议维护者优先 review PR #3396，并对 Tsubasa provider catalog 请求进行兼容性确认。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报  
**日期：2026-09-28**  
**仓库：** github.com/qwibitai/nanoclaw

---

## 1. 今日速览

过去 24 小时，NanoClaw 项目保持中高活跃度：新增 / 更新 **1 个 Issue**，同时有 **7 个开放 PR** 等待合并，说明维护者正在集中处理容器运行、安装更新、技能执行、渠道集成等稳定性问题。  
今日没有新版本发布，也没有 PR 被合并或关闭，因此项目代码主线尚未发生实质性推进，但多个 PR 已直接指向已知 Bug 或运行时痛点。  
从主题看，今日重点集中在 **Docker 容器生命周期管理、Linux 文件权限、Iron 代理、Mattermost 集成、技能错误可观测性** 等工程可靠性问题。  
整体健康度较好：问题响应速度快，Issue #3951 当天即出现对应修复 PR #3952，但当前积压风险在于 **7 个 PR 均处于待合并状态**，需要维护者尽快 review 与落地。

---

## 2. 项目进展

过去 24 小时内 **没有已合并或关闭的 PR**，因此主分支暂无已落地变更。

不过，今日出现了一批高相关度的待合并修复 PR，显示项目正在围绕稳定性做集中收敛：

### 待合并但值得关注的关键 PR

1. **修复 Linux 下任务删除后残留 session 的问题**  
   - PR：[#3952 - fix(container-runner): pre-create session mount points as the host user](https://github.com/qwibitai/nanoclaw/pull/3952)  
   - 关联 Issue：[#3951](https://github.com/qwibitai/nanoclaw/issues/3951)  
   - 影响方向：容器挂载、Linux rootful Docker、任务删除清理  
   - 进展判断：这是今日最直接的问题闭环，若合并，将修复 root-owned mount point 导致 session 目录无法删除的问题。

2. **更新流程中保持 Iron Proxy 存活**  
   - PR：[#3948 - fix(update): keep the Iron proxy through cutover and residue reaping](https://github.com/qwibitai/nanoclaw/pull/3948)  
   - 影响方向：升级流程、容器清理、agent spawn  
   - 进展判断：该修复对生产环境升级稳定性较关键，避免 `/update-nanoclaw` 后所有 agent spawn 失败。

3. **删除 session 或 agent group 后停止残留容器**  
   - PR：[#3947 - fix(host): stop containers whose session or agent group was deleted](https://github.com/qwibitai/nanoclaw/pull/3947)  
   - 影响方向：容器生命周期、host sweep、资源回收  
   - 进展判断：可减少“逻辑对象已删除但容器仍运行”的资源泄露与状态不一致。

4. **Mattermost 运行时校验兼容 callback secret 自动派生逻辑**  
   - PR：[#3949 - fix(add-mattermost): derive callback secret in verify-runtime when unset](https://github.com/qwibitai/nanoclaw/pull/3949)  
   - 影响方向：Mattermost 安装 / 渠道集成  
   - 进展判断：修复安装校验与实际运行逻辑不一致的问题，降低配置门槛。

5. **Iron 支持信任本地私有 CA**  
   - PR：[#3950 - feat(iron): trust an operator's name-constrained local CA for private model hosts](https://github.com/qwibitai/nanoclaw/pull/3950)  
   - 影响方向：私有模型服务、本地 CA、企业 / 家庭内网部署  
   - 进展判断：这是今日唯一偏功能增强的 PR，指向私有模型主机接入能力。

6. **技能执行失败时显示具体 step 错误**  
   - PR：[#3946 - fix(skill-apply): show a failed step's own error instead of a generic bounce](https://github.com/qwibitai/nanoclaw/pull/3946)  
   - 影响方向：技能开发、错误诊断、开发者体验  
   - 进展判断：改善可观测性，帮助用户定位 skill step 失败原因。

7. **优化 delivery drain 测试，减少 CI 超时**  
   - PR：[#3945 - test(delivery): seed one session past the cap in the drain test](https://github.com/qwibitai/nanoclaw/pull/3945)  
   - 影响方向：CI 稳定性、测试性能  
   - 进展判断：属于 hardening 类改动，有助于减少因磁盘争用导致的测试超时。

---

## 3. 社区热点

今日没有高评论量或高 reaction 的讨论：  
- Issue 评论数：最高为 **0**  
- PR 评论数：数据未提供或为 undefined  
- 点赞 / reaction：均为 **0**

尽管互动数据不高，但从问题性质看，以下条目具有较高维护优先级：

### 热点 1：Linux rootful Docker 下任务删除半失败

- Issue：[#3951 - ncl tasks delete half-fails on Linux](https://github.com/qwibitai/nanoclaw/issues/3951)  
- 对应修复 PR：[#3952](https://github.com/qwibitai/nanoclaw/pull/3952)  
- 核心诉求：用户希望 `ncl tasks delete` 能完整清理 scheduled task 相关 session 与 mailbox，不留下持续报错的孤儿状态。  
- 背后问题：Docker 在 host 上自动创建 root-owned mount point，导致 Node 的 `rmSync` 无法删除 session 目录。  
- 用户影响：删除任务后，系统每分钟持续输出 `collectTasks: inbound.db unreadable`，造成日志污染和状态不一致。

### 热点 2：升级后 Iron Proxy 被错误清理

- PR：[#3948](https://github.com/qwibitai/nanoclaw/pull/3948)  
- 核心诉求：用户希望 `/update-nanoclaw` 不破坏正在运行的核心代理服务。  
- 背后问题：升级切换时 `drainContainers` 停止了带有当前安装 label 的所有容器，其中包括 Iron central proxy。  
- 潜在影响：更新完成后 agent spawn 全部失败，属于较严重的升级回归风险。

### 热点 3：私有模型服务的 TLS 信任链

- PR：[#3950](https://github.com/qwibitai/nanoclaw/pull/3950)  
- 核心诉求：运维人员希望 NanoClaw / Iron 能连接使用私有域名与自签 / 本地 CA 的模型服务。  
- 背后需求：私有部署、家庭实验室、企业内网模型网关通常无法获得公共 CA 签发的证书。  
- 路线图信号：项目正在增强本地模型与私有基础设施适配能力。

---

## 4. Bug 与稳定性

### 严重：任务删除后残留 orphan session，并持续产生日志错误

- Issue：[#3951](https://github.com/qwibitai/nanoclaw/issues/3951)  
- 状态：Open  
- 修复 PR：[#3952](https://github.com/qwibitai/nanoclaw/pull/3952) 已打开  
- 严重程度：高  
- 影响范围：Linux + rootful Docker 环境  
- 现象：
  - 删除 scheduled task 后留下 orphaned `active` session；
  - mailbox 已不存在；
  - host 每分钟记录一次 `collectTasks: inbound.db unreadable … SqliteError: unable to open database file`；
  - 问题会无限持续，直到手工清理。  
- 根因：
  - session 目录被 bind mount 到 `/workspace`；
  - nested mount target 如果不存在，rootful Docker 会在 host 上以 root 创建目录；
  - 后续 `rmSync` 以普通 host 用户执行时无法删除 root-owned mount point。  
- 修复方向：
  - PR #3952 计划在 container runner 中预先以 host 用户身份创建 session mount points，避免 Docker 自动创建 root-owned 目录。

### 严重：更新流程可能导致 Iron Proxy 被停止，agent spawn 失败

- PR：[#3948](https://github.com/qwibitai/nanoclaw/pull/3948)  
- 状态：Open  
- 严重程度：高  
- 影响范围：执行 `/update-nanoclaw` 的安装实例  
- 问题描述：
  - cutover 阶段 `drainContainers` 会停止当前安装 label 下的容器；
  - Iron central proxy 也带有该 label；
  - 更新完成后代理不可用，导致 agent spawn 失败。  
- 修复方向：
  - 保持 Iron Proxy 在 cutover 与 residue reaping 期间运行。

### 中高：session 或 agent group 删除后容器仍可能残留运行

- PR：[#3947](https://github.com/qwibitai/nanoclaw/pull/3947)  
- 状态：Open  
- 严重程度：中高  
- 影响范围：host sweep、容器回收、资源占用  
- 问题描述：
  - 当前 per-session reconcile 仅遍历仍存在数据库行的 session；
  - 如果 session 或 agent group 已删除，关联容器可能不会被 sweep 到；
  - 容器可能一直运行到下一次 host restart。  
- 修复方向：
  - host sweep 增加对已删除 session / agent group 所属容器的停止逻辑。

### 中：Mattermost runtime verify 与实际 secret 派生逻辑不一致

- PR：[#3949](https://github.com/qwibitai/nanoclaw/pull/3949)  
- 状态：Open  
- 严重程度：中  
- 影响范围：Mattermost adapter 安装与运行时校验  
- 问题描述：
  - `.env` 中缺少 `MATTERMOST_CALLBACK_SECRET` 时，运行时代码可派生 secret；
  - 但 `verify-runtime.ts` 仍要求该变量必须存在；
  - 导致 runtime verification 失败。  
- 修复方向：
  - verify-runtime 在 secret 未设置时采用与 adapter 一致的派生逻辑。

### 中：技能 step 失败时错误信息过于泛化

- PR：[#3946](https://github.com/qwibitai/nanoclaw/pull/3946)  
- 状态：Open  
- 严重程度：中  
- 影响范围：skill author、调试体验  
- 问题描述：
  - 当 `effect:step` 失败时，用户看到的是通用错误 `"the step did not complete"`；
  - 无法直接获知失败 step 的真实错误原因。  
- 修复方向：
  - 展示失败 step 自身错误，提高可诊断性。

### 低至中：CI 测试在磁盘竞争环境下容易超时

- PR：[#3945](https://github.com/qwibitai/nanoclaw/pull/3945)  
- 状态：Open  
- 严重程度：低至中  
- 影响范围：CI、测试稳定性  
- 问题描述：
  - `delivery-poll.test.ts` 中 drain test 使用同步 SQLite 文件 I/O；
  - 原测试 seed 20 sessions，在磁盘争用环境下容易超时。  
- 修复方向：
  - 将 seed 数量调整为 9，即仅超过 cap 一个 session，以降低 I/O 压力。

---

## 5. 功能请求与路线图信号

### 私有模型主机与本地 CA 支持正在增强

- PR：[#3950](https://github.com/qwibitai/nanoclaw/pull/3950)  
- 类型：功能增强  
- 可能进入下一版本：较高  
- 说明：
  - Iron 现在可信任 operator 提供的 name-constrained local CA；
  - 这使得 `https://models.home.arpa/v1` 这类私有模型服务地址可以在 Iron 后正常工作；
  - 该能力对本地模型、企业内网模型服务、家庭实验室部署非常关键。  
- 路线图信号：
  - NanoClaw 正在向更强的 self-hosted / private AI infrastructure 适配演进；
  - 对非公共 CA、私有 DNS 名称、内网模型服务的支持可能成为后续重要方向。

### Mattermost 集成继续打磨安装体验

- PR：[#3949](https://github.com/qwibitai/nanoclaw/pull/3949)  
- 类型：渠道集成稳定性  
- 可能进入下一版本：较高  
- 说明：
  - 虽然不是新增功能，但它降低了 Mattermost adapter 的配置失败率；
  - 表明项目仍在持续完善团队协作平台接入体验。

### 容器生命周期管理是近期重点

- PR：[#3952](https://github.com/qwibitai/nanoclaw/pull/3952)、[#3948](https://github.com/qwibitai/nanoclaw/pull/3948)、[#3947](https://github.com/qwibitai/nanoclaw/pull/3947)  
- 类型：稳定性 / 平台能力  
- 可能进入下一版本：较高  
- 说明：
  - 多个 PR 同时指向 container runner、host sweep、update cutover；
  - 表明 NanoClaw 当前运行模型高度依赖容器编排与本地资源清理；
  - 下一版本很可能会包含一组容器稳定性修复。

---

## 6. 用户反馈摘要

今日 Issue 评论数为 0，因此没有额外社区讨论可提炼。但从 Issue #3951 的报告内容可以看出明确用户痛点：

### 痛点 1：删除任务后系统没有真正恢复干净状态

- 来源：[#3951](https://github.com/qwibitai/nanoclaw/issues/3951)  
- 用户场景：
  - 用户在 Linux rootful Docker 环境下删除 scheduled task；
  - 预期任务及其 session 资源完全消失；
  - 实际却留下 orphaned active session。  
- 用户不满点：
  - 删除命令表现为“半成功”；
  - 后续系统不断产生 SQLite unreadable 日志；
  - 用户需要理解 Docker mount 权限细节才能手工排查。

### 痛点 2：日志噪声会掩盖真实问题

- 来源：[#3951](https://github.com/qwibitai/nanoclaw/issues/3951)  
- 具体表现：
  - `collectTasks` 每分钟记录一次错误；
  - 长时间运行会持续污染日志。  
- 影响：
  - 降低运维可观测性；
  - 可能让用户误以为任务系统或 SQLite 数据库持续损坏。

### 痛点 3：私有基础设施部署存在信任链阻塞

- 来源：[#3950](https://github.com/qwibitai/nanoclaw/pull/3950)  
- 用户场景：
  - 模型服务运行在私有域名，例如 `models.home.arpa`；
  - 公共 CA 无法为该类名称签发证书；
  - Iron 之前只信任公共 CA，导致请求失败。  
- 用户诉求：
  - 支持 operator 自有 CA；
  - 允许在内网、安全隔离环境中运行私有模型服务。

---

## 7. 待处理积压

基于今日提供的数据，过去 24 小时内共有 **7 个开放 PR**，且均未合并或关闭。由于没有提供更长期 Issue / PR 历史，无法可靠识别“长期未响应”的历史积压；但以下新近 PR 具备较高处理优先级，建议维护者尽快 review：

### 高优先级待处理

1. [#3952 - 修复 Linux rootful Docker 下 session mount point 权限问题](https://github.com/qwibitai/nanoclaw/pull/3952)  
   - 理由：直接修复今日新报 Bug #3951，且影响任务删除、日志稳定性和资源清理。

2. [#3948 - 更新过程中保持 Iron Proxy 存活](https://github.com/qwibitai/nanoclaw/pull/3948)  
   - 理由：更新后 agent spawn 失败属于严重可用性问题，应优先合并或验证。

3. [#3947 - 删除 session / agent group 后停止残留容器](https://github.com/qwibitai/nanoclaw/pull/3947)  
   - 理由：避免资源泄漏和运行状态不一致。

### 中优先级待处理

4. [#3949 - Mattermost verify-runtime 自动派生 callback secret](https://github.com/qwibitai/nanoclaw/pull/3949)  
   - 理由：降低安装失败率，改善渠道集成体验。

5. [#3950 - Iron 支持 operator 本地 CA](https://github.com/qwibitai/nanoclaw/pull/3950)  
   - 理由：增强私有模型服务支持，是面向 self-hosted 场景的重要能力。

6. [#3946 - skill apply 显示失败 step 的真实错误](https://github.com/qwibitai/nanoclaw/pull/3946)  
   - 理由：提升技能开发调试效率。

7. [#3945 - 优化 delivery drain 测试以减少 CI 超时](https://github.com/qwibitai/nanoclaw/pull/3945)  
   - 理由：改善 CI 稳定性，降低维护成本。

---

## 总体健康度评估

NanoClaw 今日表现出较强的维护活跃度：问题能快速转化为修复 PR，且修复集中在容器、升级、渠道和技能系统等关键路径上。  
短期风险主要在于 **开放 PR 数量较多但暂无合并**，如果 review 延迟，可能导致稳定性修复无法及时进入主线。  
建议维护者优先合并 #3952、#3948、#3947 这一组容器与升级稳定性修复，以尽快降低生产环境中的残留资源、升级失败和日志污染风险。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报（2026-09-28）

## 1. 今日速览

过去 24 小时，NullClaw 仓库没有新的 Issue 活动，也没有新版本发布；项目动态主要集中在 Pull Request 层面。今日共有 2 个开放 PR 更新，分别涉及 **新增模型服务商支持** 与 **A2A 鉴权隔离修复**。从活跃度看，社区讨论热度偏低，但代码层面仍有实质推进，尤其是安全边界和 provider 生态扩展。当前项目处于“低讨论、稳定开发”的状态，维护重点可能集中在合并前审查与回归验证。

---

## 2. 项目进展

今日没有已合并或关闭的 PR，因此主分支暂无可确认落地的功能变化。不过有 2 个开放 PR 值得关注：

### PR #1013：新增 Tsubasa Chat Completions Provider  
- 状态：OPEN  
- 作者：cenab  
- 链接：https://github.com/nullclaw/nullclaw/pull/1013  
- 类型：功能增强 / Provider 扩展  

该 PR 为 NullClaw 增加了 Tsubasa chat-completions provider，并将其接入现有 OpenAI-compatible provider factory、onboarding list 与模型目录。  
关键点包括：

- 新增 `TSUBASA_API_KEY` 作为 provider 凭据选择方式。
- 支持两个公开模型。
- 模型上下文窗口为 32,768 tokens。
- 默认输出预算设置为 8,192 tokens，以保留 agent prompt 所需空间。
- 响应处理包含 fallback 逻辑。

该 PR 如果合并，将继续扩展 NullClaw 的模型后端兼容范围，对希望使用更多 OpenAI-compatible 服务的用户有直接价值。

---

### PR #1012：修复 A2A tasks 与 context sessions 的 bearer principal 隔离问题  
- 状态：OPEN  
- 作者：vernonstinebaker  
- 链接：https://github.com/nullclaw/nullclaw/pull/1012  
- 类型：Bug Fix / 安全性 / 多租户隔离  
- 关联 Issue：#974  
- Issue 链接：https://github.com/nullclaw/nullclaw/issues/974  

该 PR 解决 `/a2a` 路径中 bearer 身份虽已认证，但未传递到 JSON-RPC 层的问题。此前以下接口可能仅基于裸 task id 或 caller-supplied `contextId` 操作：

- `tasks/get`
- `tasks/cancel`
- `tasks/resubscribe`
- `tasks/list`
- context session key 派生逻辑

这意味着不同调用者之间如果共享或猜测到 task id / contextId，可能造成任务或会话作用域混淆。该 PR 将任务与上下文 session 按 bearer principal 进行隔离，是一项重要的安全与稳定性修复。

---

## 3. 社区热点

今日没有 Issue 更新，也没有可见评论数或反应数较高的讨论项。根据当前数据，社区互动热度较低，热点主要来自两个开放 PR 本身：

### Provider 生态扩展：Tsubasa 支持  
- PR：https://github.com/nullclaw/nullclaw/pull/1013  

该 PR 反映出项目仍在扩展 OpenAI-compatible provider 生态。用户诉求可能集中在：

- 使用更多第三方模型供应商；
- 降低接入成本；
- 在不同模型服务之间灵活切换；
- 获得更长上下文窗口支持。

### A2A 安全边界与多用户隔离  
- PR：https://github.com/nullclaw/nullclaw/pull/1012  
- 关联 Issue：https://github.com/nullclaw/nullclaw/issues/974  

该 PR 背后的核心诉求是：当 NullClaw 作为 agent / A2A 服务端运行时，需要确保任务、上下文 session 与调用者身份绑定，避免跨用户访问或上下文污染。

---

## 4. Bug 与稳定性

### 高优先级：A2A task / context session 缺少 bearer principal 作用域隔离  
- 严重程度：高  
- 状态：已有修复 PR，待合并  
- PR：https://github.com/nullclaw/nullclaw/pull/1012  
- 关联 Issue：https://github.com/nullclaw/nullclaw/issues/974  

该问题涉及认证身份与 JSON-RPC 任务层之间的边界传递。虽然 `/a2a` 已执行 bearer 认证，但如果后续任务查询、取消、订阅、列表等操作没有绑定调用者身份，可能产生跨调用者任务访问风险。

影响范围可能包括：

- 多用户或多客户端共享同一 A2A 服务实例；
- task id 可被复用、猜测或泄露的场景；
- 依赖 `contextId` 管理长期上下文 session 的集成；
- agent 服务托管平台或企业环境中的隔离要求。

当前已有修复 PR，建议维护者优先审查并关注以下验证点：

- bearer principal 是否贯穿 JSON-RPC 层；
- 现有客户端是否需要迁移或兼容处理；
- 旧 task / context session 数据是否会因 key schema 变化受到影响；
- 测试是否覆盖跨 principal 访问隔离场景。

---

### 今日无新增 Bug 报告  
过去 24 小时没有新的 Issue，因此没有新的崩溃、回归或用户报告的稳定性问题被记录。

---

## 5. 功能请求与路线图信号

### Tsubasa Provider 支持可能进入下一版本  
- PR：https://github.com/nullclaw/nullclaw/pull/1013  

虽然今天没有新的 Issue 型功能请求，但 PR #1013 明确展示了一个路线图信号：NullClaw 正继续增强多 provider 支持，尤其是兼容 OpenAI Chat Completions API 的服务商。

如果该 PR 合并，下一版本可能包含：

- Tsubasa provider 接入；
- onboarding 列表更新；
- 模型目录新增 Tsubasa 公共模型；
- 对 32K 上下文模型的配置支持；
- 默认输出 token budget 调整逻辑。

这类改动通常有利于个人 AI 助手和智能体用户在不同模型供应商间做成本、性能、可用性权衡。

---

### A2A 安全模型可能成为近期重点  
- PR：https://github.com/nullclaw/nullclaw/pull/1012  
- Issue：https://github.com/nullclaw/nullclaw/issues/974  

A2A 相关修复表明项目正在加强 agent-to-agent 或外部调用接口的权限边界。后续路线图中可能继续出现以下方向：

- task ownership 明确化；
- context session 隔离；
- 多租户部署安全性增强；
- A2A JSON-RPC 层鉴权模型完善；
- 与 bearer principal 相关的审计与测试覆盖。

---

## 6. 用户反馈摘要

今日没有新的 Issue 评论或可分析的用户反馈数据，因此无法提炼新的真实用户痛点、满意点或使用场景。

从现有 PR 背景可间接观察到两类需求：

1. **更多模型服务商接入需求**  
   用户和贡献者希望 NullClaw 能快速接入 OpenAI-compatible provider，降低模型选择限制。

2. **服务端安全隔离需求**  
   A2A 场景下，用户可能已开始将 NullClaw 用于多调用者、多任务或长期上下文服务，因此对 task 和 context session 的身份隔离要求上升。

---

## 7. 待处理积压

当前数据未提供长期未响应 Issue 或 PR 列表，因此无法判断历史积压情况。基于今日更新，建议维护者优先关注以下开放 PR：

### 优先审查：PR #1012 - A2A bearer principal 作用域隔离  
- 链接：https://github.com/nullclaw/nullclaw/pull/1012  
- 原因：涉及认证边界和潜在跨调用者访问问题，安全影响高于普通功能增强。  
- 建议：优先完成代码审查、补充隔离测试，并确认是否需要变更说明或迁移提示。

### 常规审查：PR #1013 - Tsubasa Provider 支持  
- 链接：https://github.com/nullclaw/nullclaw/pull/1013  
- 原因：扩展 provider 生态，对用户可用性有正向价值。  
- 建议：重点验证 API key 配置、模型目录、默认 token budget、fallback 行为与 OpenAI-compatible provider factory 的一致性。

---

## 今日健康度评估

- **开发活跃度**：中低。今日无 Issue 活动，但有 2 个开放 PR 更新。  
- **社区讨论热度**：低。没有可见评论和反应数据。  
- **功能推进**：中等。新增 provider 支持显示生态持续扩展。  
- **稳定性关注度**：较高。A2A 鉴权隔离修复值得优先处理。  
- **发布节奏**：平稳。今日无 release，主分支是否更新取决于后续 PR 合并情况。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报｜2026-09-28

## 1. 今日速览

过去 24 小时，IronClaw 活跃度偏低到中等：新增/更新 Issue 2 条，新增/更新 PR 1 条，暂无关闭 Issue、合并 PR 或新版本发布。今日活动主要集中在 **模型/Provider 注册体验** 与 **工具选择机制优化** 两个方向，显示项目仍在围绕 AI Agent 的上下文管理、工具调用效率和模型接入体验持续演进。  
当前没有 Bug、崩溃或回归类问题被报告，稳定性信号较平稳。唯一的 PR 来自 Dependabot，属于大批量依赖升级，规模较大但标注风险较低，后续需要 CI 与回归测试确认。

---

## 2. 项目进展

今日没有合并或关闭的重要 PR，项目主干暂无直接功能推进。

### 待合并 PR

#### #8114 chore(deps): bump the everything-else group across 1 directory with 31 updates  
- 链接：https://github.com/nearai/ironclaw/pull/8114  
- 状态：OPEN  
- 作者：dependabot[bot]  
- 类型：依赖维护 / Rust dependencies  
- 规模：XL  
- 风险标注：low  
- 涉及内容：一次性升级 31 个依赖包，包括：
  - `thiserror`：2.0.20 → 2.0.21
  - `uuid`：1.24.0 → 1.26.1
  - `base64` 等其他依赖

**影响分析：**  
该 PR 不直接引入新功能，但有助于保持依赖生态更新，降低安全风险与兼容性债务。由于规模为 XL，虽然风险标注为 low，仍建议维护者重点关注以下方面：

- Rust 编译与测试是否全部通过；
- 是否存在 transitive dependency 行为变化；
- 与序列化、错误处理、UUID、base64 编解码相关的边缘场景是否受影响；
- 是否需要拆分为更小批次以降低 review 难度。

---

## 3. 社区热点

今日所有 Issues/PRs 的评论数与反应数均为 0，暂无明显高热讨论。不过从主题看，有两个值得关注的方向。

### #8115 Add a Tsubasa registry entry with an explicit 32K context-budget path  
- 链接：https://github.com/nearai/ironclaw/issues/8115  
- 状态：OPEN  
- 作者：cenab  
- 评论：0  
- 👍：0  

**热点方向：模型 Provider 接入与上下文预算配置。**

该 Issue 提出为 Tsubasa 增加一个命名 registry entry，并显式提供 32K context-budget 路径。当前 IronClaw 已有 OpenAI-compatible backend，但用户在配置 Tsubasa 时需要手动填写 endpoint 和 model。该提议希望通过命名 Provider 降低配置复杂度，并让凭证设置、模型选择、上下文预算路径更加明确。

**背后诉求：**

- 降低 OpenAI-compatible 后端的手动配置成本；
- 让第三方模型提供方在 IronClaw 中有更清晰的注册入口；
- 明确 32K 上下文预算，减少用户误配；
- 为后续公开暴露 Provider 能力前建立更稳定的配置规范。

---

### #8113 Proposal: opt-in turn-0 tool selection，BM25F + embeddings  
- 链接：https://github.com/nearai/ironclaw/issues/8113  
- 状态：OPEN  
- 作者：CjS77  
- 评论：0  
- 👍：0  

**热点方向：Agent 工具选择与上下文效率优化。**

该提案建议在对话开始时，使用首条用户消息预测本轮会需要哪些工具，并用 BM25F + embedding 的混合检索方式对候选工具排序。之后仅向模型暴露预测出的工具，以及四个 discovery bridges：

- `tool_search`
- `tool_describe`
- `tool_call`
- `result_read`

**背后诉求：**

- 减少 turn-0 时暴露给模型的工具数量；
- 降低上下文窗口占用；
- 提高工具选择精度；
- 在不牺牲可发现性的前提下，让工具调用更加高效；
- 为大型工具库场景提供更好的启动策略。

该提案属于典型的 Agent runtime 优化方向，若落地，可能显著影响 IronClaw 的工具广告、检索、调用链路。

---

## 4. Bug 与稳定性

过去 24 小时内未见新报告的 Bug、崩溃、回归或稳定性问题。

| 严重程度 | 问题 | 状态 | Fix PR |
|---|---|---|---|
| Critical | 无 | - | - |
| High | 无 | - | - |
| Medium | 无 | - | - |
| Low | 无 | - | - |

**稳定性评估：**  
今日没有用户报告运行时错误或回归问题，短期稳定性信号良好。不过 #8114 是一次大规模依赖升级，虽然标注风险较低，但仍可能引入隐性兼容性问题。建议在合并前确保 CI、单元测试、集成测试和关键 Agent 工作流验证通过。

---

## 5. 功能请求与路线图信号

今日新增的两个 Issue 均属于功能增强/架构优化类，分别指向 **模型 Provider 体验** 与 **工具选择机制**。

### 5.1 Tsubasa Provider 注册与 32K 上下文预算路径  
- Issue：https://github.com/nearai/ironclaw/issues/8115  
- 类型：Provider registry / 模型配置体验  
- 当前状态：OPEN  
- 可能优先级：中等  

**需求摘要：**  
为 Tsubasa 添加显式 registry entry，让用户不必手动填写 endpoint 与 model，并提供明确的 32K context-budget 配置路径。

**可能进入下一版本的概率：中等偏高。**  
原因是该需求边界较清晰，且更偏配置与 registry 增强，通常实现风险低于核心 runtime 改造。如果项目已有 OpenAI-compatible backend，新增命名 Provider 可能是较自然的增量工作。

**潜在影响：**

- 改善 Tsubasa 用户 onboarding；
- 减少配置错误；
- 为多模型、多 Provider 场景提供更一致的配置体验。

---

### 5.2 Opt-in turn-0 工具选择：BM25F + Embeddings  
- Issue：https://github.com/nearai/ironclaw/issues/8113  
- 类型：Agent tool selection / 检索排序 / 上下文优化  
- 当前状态：OPEN  
- 可能优先级：中等，但实现复杂度较高  

**需求摘要：**  
在首轮用户消息后预测需要使用的工具，通过 BM25F + embeddings 混合排序筛选候选工具，仅向模型暴露最可能相关的工具和少数 discovery bridges。

**可能进入下一版本的概率：中等偏低到中等。**  
原因是该方案涉及工具索引、检索排序、embedding 管线、上下文注入策略和 fallback 机制，设计面较广。若项目近期重点是 Agent 工具调用效率，该提案可能进入实验性或 opt-in 功能路径；若当前版本周期偏维护，则可能需要更多讨论和原型验证。

**潜在影响：**

- 降低工具列表对上下文窗口的占用；
- 提升复杂工具库下的工具选择效率；
- 改善首轮对话的响应质量；
- 但也可能带来召回不足问题，需要设计安全 fallback。

---

## 6. 用户反馈摘要

今日 Issues 均无评论，因此没有可提炼的多方讨论或明确正负反馈。但从 Issue 描述可归纳出以下用户痛点与使用场景。

### 痛点 1：OpenAI-compatible Provider 配置仍偏手动  
- 来源：https://github.com/nearai/ironclaw/issues/8115  

用户在配置 Tsubasa 时需要手动输入 endpoint 与 model，容易造成配置负担和误配。命名 Provider registry entry 可以让模型接入流程更加标准化。

### 痛点 2：大型工具集下，默认暴露全部工具可能效率不高  
- 来源：https://github.com/nearai/ironclaw/issues/8113  

当 Agent 可用工具数量较多时，在 turn-0 阶段直接向模型暴露完整工具集会占用上下文，并可能降低工具选择精度。用户希望通过检索与排序机制，在一开始就缩小候选工具范围。

### 使用场景信号

- 多模型 Provider 接入与统一配置；
- 长上下文模型，尤其是 32K context-budget 场景；
- 大型工具库 Agent；
- 首轮对话即需要精准工具选择的生产级 Agent 使用场景。

---

## 7. 待处理积压

基于本次提供的数据，无法判断长期未响应的历史 Issue 或 PR；过去 24 小时内未出现明显长期积压条目。不过有 3 个当前待处理事项值得维护者关注。

### 待关注 1：#8114 大规模依赖升级 PR  
- 链接：https://github.com/nearai/ironclaw/pull/8114  
- 状态：OPEN  
- 建议：优先确认 CI 与测试结果，必要时拆分依赖升级范围，避免一次性合并 31 个更新带来排查困难。

### 待关注 2：#8115 Tsubasa registry entry  
- 链接：https://github.com/nearai/ironclaw/issues/8115  
- 状态：OPEN  
- 建议：维护者可确认是否接受 Tsubasa 作为命名 Provider，以及 32K context-budget path 的命名规范、配置格式和文档要求。

### 待关注 3：#8113 turn-0 tool selection 提案  
- 链接：https://github.com/nearai/ironclaw/issues/8113  
- 状态：OPEN  
- 建议：建议先讨论 opt-in 范围、评估指标和 fallback 策略，例如：
  - 工具召回率；
  - 首轮响应延迟；
  - embedding 索引构建成本；
  - 未命中时是否自动启用 `tool_search`；
  - 是否允许用户或开发者关闭该机制。

---

## 项目健康度评估

| 维度 | 今日表现 | 评估 |
|---|---:|---|
| Issue 活跃度 | 2 条更新 | 低到中等 |
| PR 活跃度 | 1 条更新 | 较低 |
| Release 活跃度 | 0 个发布 | 无发布 |
| Bug 风险 | 0 个新 Bug | 稳定 |
| 维护活动 | Dependabot 依赖升级 | 持续维护中 |
| 路线图信号 | Provider registry、工具选择优化 | Agent 能力持续深化 |

**总体结论：**  
IronClaw 今日没有发布和合并，短期推进节奏较平稳。社区新增议题质量较高，集中在模型接入体验和 Agent 工具选择效率两条主线，说明项目仍在围绕个人 AI 助手与智能体运行时的核心能力进行演进。当前最需要维护者处理的是确认依赖升级安全性，并对两个新功能提案给出方向性反馈。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报｜2026-09-28

## 1. 今日速览

过去 24 小时，LobsterAI 仓库整体活跃度偏低：无 Issue 新增、更新或关闭，仅有 1 个 Pull Request 被关闭。今日没有新版本发布，也未观察到来自社区的新功能请求或集中讨论。  
唯一的代码层面动态集中在 OpenClaw / main 区域的稳定性修复，涉及 Windows 非正常退出后网关锁无法回收的问题。该问题会影响 gateway 启动与一键修复流程，属于偏稳定性和可用性方向的修复。  
从数据看，项目今日处于低噪声维护状态：社区反馈较少，但维护工作仍在针对关键运行故障进行收敛。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

### 已关闭 PR

#### [#2771 fix(openclaw): reclaim gateway locks whose recorded PID was reused](https://github.com/netease-youdao/LobsterAI/pull/2771)

- 状态：Closed
- 作者：fisherdaddy
- 涉及区域：`area: main`, `area: openclaw`
- 创建时间：2026-09-28
- 更新时间：2026-09-28
- 评论数：无有效数据
- 👍：0

**内容概述：**  
该 PR 修复了 OpenClaw 在 Windows 环境下网关锁回收失败的问题。根据摘要描述，在非正常关闭后，系统可能将此前记录的 gateway PID 重新分配给 `SYSTEM` 或高权限进程。由于这些进程无法被正常检查，程序会误判锁仍由存活进程持有，导致 gateway 启动失败，同时一键修复也无法恢复。

PR 中提到 OpenClaw `v2026.8.1` 的 writer 会通过 `<lock>.sqlite` 持有独占 SQLite transaction，用于锁定或协调机制。此次修复方向是识别并回收这类“PID 被复用但实际 owner 已失效”的 gateway locks。

**项目推进意义：**

- 提升 Windows 非正常退出后的自恢复能力。
- 降低 gateway 因陈旧锁文件无法启动的概率。
- 改善一键修复工具在锁异常场景下的有效性。
- 对 OpenClaw 模块的启动可靠性和运维体验有直接帮助。

**合并状态说明：**  
当前数据仅显示该 PR 为 `CLOSED`，未明确标注是否已合并。因此日报中将其归类为“已关闭的重要 PR”，不推断其已合入主分支。

---

## 4. 社区热点

今日未观察到活跃社区讨论。

- Issues 更新：0 条
- PR 更新：1 条
- 有评论数数据的讨论：无
- 有明显反应数的条目：无

唯一值得关注的技术热点是：

#### [#2771 Windows gateway lock 回收问题](https://github.com/netease-youdao/LobsterAI/pull/2771)

该 PR 反映出用户或维护者在 Windows 环境下遇到了非正常退出后的恢复失败问题。背后的核心诉求是：

- gateway 启动流程需要更强的异常恢复能力；
- 锁机制不能单纯依赖 PID 存活判断；
- 一键修复工具需要覆盖更多真实故障场景；
- Windows 权限模型下的进程检查失败应被视为需要特殊处理的边界情况。

---

## 5. Bug 与稳定性

### 高优先级：Windows 非正常退出后 gateway 锁无法回收

- 关联 PR：[ #2771 fix(openclaw): reclaim gateway locks whose recorded PID was reused](https://github.com/netease-youdao/LobsterAI/pull/2771)
- 严重程度：高
- 影响范围：OpenClaw gateway 启动、一键修复流程
- 状态：PR 已关闭，是否合并未知
- 是否已有 fix PR：是

**问题描述：**  
在 Windows 环境下，如果 OpenClaw 或 gateway 发生非正常关闭，原先记录在锁中的 PID 可能被系统复用。如果新进程属于 `SYSTEM` 或高权限进程，当前程序无法检查该 PID 对应的进程状态，从而误判原锁仍然有效。

**用户影响：**

- gateway 无法正常启动；
- 一键修复无法解决问题；
- 用户可能需要手动清理锁文件或重启系统；
- 对桌面端或本地 agent 类应用的可用性影响较大。

**稳定性分析：**  
这类问题属于典型的本地运行时状态残留问题。由于发生在异常退出后，且受 Windows PID 复用和权限模型影响，复现可能不稳定，但一旦触发会阻断核心启动链路。此次修复若已落地，将显著提升 OpenClaw 在 Windows 场景下的健壮性。

---

## 6. 功能请求与路线图信号

今日无新增功能请求类 Issue 或 PR。

不过从 [#2771](https://github.com/netease-youdao/LobsterAI/pull/2771) 可以间接观察到一个路线图信号：

### 本地运行时可靠性仍是 OpenClaw 的重点方向

该 PR 虽然是 bugfix，但反映出项目正在持续增强以下能力：

- gateway 启动流程的容错能力；
- 异常退出后的状态恢复；
- Windows 平台兼容性；
- 一键修复工具的覆盖范围；
- 本地锁机制与进程生命周期管理。

这些方向很可能会继续出现在后续版本的稳定性优化中。

---

## 7. 用户反馈摘要

今日没有新的 Issue 评论数据，因此无法提炼直接的用户反馈。

基于唯一关闭的 PR [#2771](https://github.com/netease-youdao/LobsterAI/pull/2771)，可以归纳出潜在用户痛点：

- **痛点 1：非正常退出后难以自恢复**  
  gateway 被旧锁阻塞后，用户可能无法理解原因，也无法通过常规操作恢复。

- **痛点 2：一键修复能力不足**  
  摘要明确提到 one-click repair 也会失败，说明自动修复流程此前未覆盖 PID 复用与权限不可检查场景。

- **痛点 3：Windows 权限模型导致故障诊断复杂**  
  当 PID 被复用到 `SYSTEM` 或高权限进程时，普通权限进程无法检查目标进程，导致锁状态判断出现误差。

- **潜在满意点：维护者正在处理边界场景**  
  该 PR 说明项目并非只处理主流程问题，也在修复异常退出、PID 复用、锁恢复等复杂稳定性问题。

---

## 8. 待处理积压

根据今日提供的数据：

- 长期未响应 Issue：无数据
- 长期未响应 PR：无数据
- 今日新增待处理项：无
- 今日关闭 PR：1 条

建议维护者关注以下后续事项：

1. **确认 [#2771](https://github.com/netease-youdao/LobsterAI/pull/2771) 是否已合并或仅关闭**  
   当前状态仅显示 `CLOSED`，如果该修复尚未合入主分支，需要确认关闭原因，避免关键稳定性问题遗留。

2. **补充回归测试**  
   建议针对以下场景增加自动化或手动验证用例：
   - Windows 非正常关闭后重启 gateway；
   - PID 被系统复用；
   - PID 对应进程权限不可检查；
   - 一键修复是否能回收陈旧锁；
   - `<lock>.sqlite` 独占事务异常释放场景。

3. **在后续 Release Notes 中说明该修复**  
   如果该修复已进入版本分支，建议在下一版本发布说明中标注其影响，尤其提醒 Windows 用户升级。

---

## 今日健康度评估

- 活跃度：低
- 社区讨论热度：低
- 维护响应：存在有效维护动作
- 稳定性风险：中等，集中在 Windows gateway 锁恢复场景
- 发布节奏：今日无发布
- 总体判断：项目今日处于低活跃维护日，但唯一变更指向关键稳定性问题，具备实际用户价值。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报｜2026-09-28

## 1. 今日速览

过去 24 小时，Moltis 项目保持低到中等活跃度：新增/更新 Issue 1 条，新增 PR 2 条，暂无合并、关闭或版本发布。今日动态主要集中在 **模型能力识别修复** 与 **新增 OpenAI-compatible Provider 接入** 两个方向。  
其中，DeepSeek 当前模型 `deepseek-flash` 未被识别为 reasoning/thinking model 的问题已由同一作者提交修复 PR，响应链路较短，说明该类兼容性问题具备较好的修复效率。另一个 PR 引入 Tsubasa provider，显示 Moltis 仍在持续扩展多模型、多供应商生态。整体来看，项目今日没有重大版本推进，但维护方向清晰，健康度稳定。

---

## 2. 版本发布

过去 24 小时内无新版本发布。

---

## 3. 项目进展

今日暂无已合并或关闭的 PR，因此没有完成落地的代码变更。不过有 2 个待合并 PR 值得关注：

### 待合并：新增 Tsubasa Provider

- PR：[#1288 feat: add Tsubasa provider to setup and model registry](https://github.com/moltis-org/moltis/pull/1288)
- 作者：cenab
- 状态：OPEN
- 创建时间：2026-09-28
- 主要内容：
  - 在 provider setup 与 OpenAI-compatible registry 中加入 Tsubasa。
  - 使用环境变量 `TSUBASA_API_KEY`。
  - 默认 API Base URL：`https://api.tsubasa.sh/v1`。
  - 新增模型：
    - `tsubasa-fast`
    - `tsubasa-pro`
  - 两个模型均声明 32,768 token 上下文窗口。
  - 涉及配置名称校验、生成模板、README 等文档/配置更新。

**影响评估：**  
该 PR 属于 provider 生态扩展，若合并，将提升 Moltis 对更多 OpenAI-compatible 模型服务的支持能力。对用户而言，主要价值是降低接入 Tsubasa 的配置成本，并让其模型出现在标准模型注册流程中。

---

### 待合并：修复 DeepSeek reasoning model 识别

- PR：[#1287 fix(providers): recognise deepseek-flash as a DeepSeek thinking model](https://github.com/moltis-org/moltis/pull/1287)
- 作者：gyje
- 状态：OPEN
- 创建时间：2026-09-27
- 关联 Issue：[#1286](https://github.com/moltis-org/moltis/issues/1286)
- 主要内容：
  - 当前 DeepSeek 模型 ID 为 `deepseek-flash`，显示名为 `DeepSeek-V4.1-Flash`。
  - Moltis 现有硬编码判断只识别旧的 `deepseek-v4*` 命名。
  - 导致 `supports_reasoning_for_model()` 返回 `false`。
  - Web UI 因此隐藏 **Reasoning Effort** toggle。
  - 该 PR 修复模型识别逻辑，使 `deepseek-flash` 被识别为 DeepSeek thinking/reasoning model。

**影响评估：**  
这是一个用户可感知的功能可用性修复。虽然不是底层崩溃或数据损坏问题，但会直接影响 DeepSeek 用户对推理能力的使用体验。若合并，预计可快速关闭对应 Bug。

---

## 4. 社区热点

今日社区讨论量整体较低，所有新增 Issue/PR 均无评论或反应数据，尚未形成高热讨论。不过从问题类型看，以下条目具备较高产品影响：

### DeepSeek-V4.1-Flash reasoning 能力未被识别

- Issue：[#1286 [Bug]: DeepSeek-V4.1-Flash ("deepseek-flash") is not detected as a reasoning model — Reasoning Effort toggle missing](https://github.com/moltis-org/moltis/issues/1286)
- 作者：gyje
- 状态：OPEN
- 评论数：0
- 👍：0
- 关联 PR：[#1287](https://github.com/moltis-org/moltis/pull/1287)

**热点原因分析：**  
该问题暴露了 Moltis 在模型能力判断上的一个典型风险：依赖硬编码模型 ID 启发式规则。随着模型供应商频繁更名、升级或切换模型 ID，旧规则容易失效，进而影响 UI 功能展示与用户实际使用。  
用户诉求并不是新增完整功能，而是希望 Moltis 能准确识别现有模型能力，尤其是 reasoning/thinking 这类直接影响交互质量的能力开关。

---

### Tsubasa Provider 接入

- PR：[#1288 feat: add Tsubasa provider to setup and model registry](https://github.com/moltis-org/moltis/pull/1288)
- 作者：cenab
- 状态：OPEN
- 评论数：未提供
- 👍：0

**热点原因分析：**  
该 PR 反映出社区或贡献者希望 Moltis 继续扩大第三方模型供应商覆盖范围。OpenAI-compatible Provider 的接入正在成为 Moltis 的重要扩展路径。若维护者接受该 PR，说明项目对于新增 provider 持开放态度，也可能带动更多 provider 接入贡献。

---

## 5. Bug 与稳定性

### P1｜DeepSeek 当前旗舰模型 reasoning UI 开关缺失

- Issue：[#1286](https://github.com/moltis-org/moltis/issues/1286)
- 状态：OPEN
- 作者：gyje
- 创建时间：2026-09-27
- 评论数：0
- 反应数：0
- 是否已有修复 PR：是，[#1287](https://github.com/moltis-org/moltis/pull/1287)

**问题描述：**  
DeepSeek 当前模型 `deepseek-flash`，即显示名 `DeepSeek-V4.1-Flash`，没有被 Moltis 识别为 reasoning/thinking model，导致 Web UI 中缺失 **Reasoning Effort** toggle。

**根因线索：**  
问题出在 `crates/providers/src/model_capabilities.rs` 中的硬编码模型 ID 判断逻辑。当前逻辑仍主要识别旧的 `deepseek-v4*` 命名，未覆盖 `deepseek-flash`。

**影响范围：**

- 影响 DeepSeek 用户。
- 影响 Web UI 中 reasoning effort 控制项展示。
- 可能导致用户误以为该模型不支持 reasoning/thinking。
- 不属于崩溃类或数据破坏类问题，但属于重要功能可见性/可用性缺陷。

**当前进展：**  
修复 PR 已提交：[#1287](https://github.com/moltis-org/moltis/pull/1287)。建议维护者优先 review 并合并，因为问题边界清晰、修复范围相对集中。

---

## 6. 功能请求与路线图信号

### 新增 Provider 支持：Tsubasa

- PR：[#1288](https://github.com/moltis-org/moltis/pull/1288)
- 类型：功能增强 / Provider 生态扩展
- 状态：OPEN

**路线图信号：**  
该 PR 表明 Moltis 的 provider registry 仍在积极扩展，并且 OpenAI-compatible 接口是一个低摩擦的集成路径。新增 Tsubasa 代表项目可能继续吸收更多模型供应商，强化“个人 AI 助手/智能体统一入口”的产品定位。

**可能进入下一版本的概率：中到高。**  
原因：

- PR 已包含 provider setup、registry、配置校验、模板、README 等配套改动。
- 接入方式遵循 OpenAI-compatible 模式，理论上维护成本较低。
- 未见明显争议或反对意见。

---

### 模型能力识别机制改进

- 相关 Issue：[#1286](https://github.com/moltis-org/moltis/issues/1286)
- 相关 PR：[#1287](https://github.com/moltis-org/moltis/pull/1287)
- 类型：稳定性修复 / 模型能力元数据维护

**路线图信号：**  
虽然当前 PR 是针对 `deepseek-flash` 的定点修复，但背后反映出一个更长期的产品需求：模型能力不应过度依赖硬编码 ID 规则。未来 Moltis 可能需要更结构化的 capability registry，例如：

- 按 provider 声明模型能力；
- 支持远程更新模型能力元数据；
- 使用显式配置代替字符串前缀推断；
- 将 reasoning、tool calling、vision、context window 等能力统一建模。

**可能进入下一版本的概率：高。**  
定点修复 PR 已提交，且问题影响明确，合并阻力预计较低。

---

## 7. 用户反馈摘要

今日 Issue 评论区暂无进一步讨论，因此只能从 Issue 描述本身提炼用户痛点。

### 用户痛点 1：模型已支持 reasoning，但 UI 未暴露控制项

- 来源：[#1286](https://github.com/moltis-org/moltis/issues/1286)

用户在使用 DeepSeek 当前模型 `deepseek-flash` 时，预期能够看到并调整 **Reasoning Effort**，但 Moltis Web UI 没有展示相关 toggle。这会造成两个直接问题：

1. 用户无法使用模型的完整能力；
2. 用户可能误判 Moltis 或 DeepSeek 模型本身不支持 reasoning。

### 用户痛点 2：模型 ID 变化导致兼容性滞后

- 来源：[#1286](https://github.com/moltis-org/moltis/issues/1286)、[#1287](https://github.com/moltis-org/moltis/pull/1287)

DeepSeek 模型命名从旧的 `deepseek-v4*` 变化到 `deepseek-flash` 后，Moltis 的能力识别逻辑未及时适配。该反馈说明用户对新模型版本的采用速度可能快于项目内置规则更新速度。

### 用户满意点：问题已有对应修复 PR

- 来源：[#1287](https://github.com/moltis-org/moltis/pull/1287)

同一贡献者在报告问题后提交修复，说明社区具备一定自修复能力。对维护者而言，该类贡献可以显著降低问题处理成本。

---

## 8. 待处理积压

基于本次提供的数据，仅覆盖过去 24 小时内的 Issues/PR 更新，未包含长期未响应 Issue 或 PR 的完整列表，因此无法识别真实长期积压项。

不过今日新增的两个待处理 PR 建议维护者关注：

### 建议优先 Review：DeepSeek reasoning 修复

- PR：[#1287](https://github.com/moltis-org/moltis/pull/1287)
- 关联 Issue：[#1286](https://github.com/moltis-org/moltis/issues/1286)
- 建议优先级：高

**原因：**  
该 PR 修复明确用户可见 Bug，且范围集中。合并后可直接恢复 DeepSeek 当前模型的 reasoning effort UI 控制能力。

---

### 建议常规 Review：Tsubasa Provider 接入

- PR：[#1288](https://github.com/moltis-org/moltis/pull/1288)
- 建议优先级：中

**原因：**  
该 PR 扩展 provider 生态，功能价值明确。维护者需要重点检查：

- `TSUBASA_API_KEY` 配置命名是否符合现有规范；
- 默认 base URL 是否可靠；
- `tsubasa-fast` / `tsubasa-pro` 的上下文窗口声明是否准确；
- README、模板和配置校验是否与现有 provider 风格一致。

---

## 今日维护建议

1. **优先合并或反馈 [#1287](https://github.com/moltis-org/moltis/pull/1287)**，尽快关闭 DeepSeek reasoning UI 缺失问题。  
2. **Review [#1288](https://github.com/moltis-org/moltis/pull/1288)**，确认 Tsubasa provider 的配置与模型元数据准确性。  
3. **考虑减少模型能力硬编码依赖**，避免后续模型 ID 变化再次导致 reasoning、tool calling、vision 等能力失效。  
4. **在 release notes 中记录 DeepSeek 修复**，方便受影响用户了解 reasoning toggle 恢复情况。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报｜2026-09-28

> 数据口径：过去 24 小时 GitHub Issues / Pull Requests / Releases 更新。  
> 注：原始数据中的条目链接标注为 `agentscope-ai/QwenPaw`，本文按用户提供的 CoPaw 仓库路径组织链接：`github.com/agentscope-ai/CoPaw`。

---

## 1. 今日速览

过去 24 小时，CoPaw 社区共有 **5 条 Issue 更新**、**2 条 PR 更新**，无新版本发布。整体活跃度处于 **中等偏活跃** 状态：问题反馈集中在 Windows 桌面端、运行时稳定性、安全边界和交互体验上。  
今日新增/活跃 Issue 中，Bug 占比较高，尤其是 Windows 非沙箱模式下 Office COM 调用风险、桌面端重复启动导致后端实例异常等问题，显示桌面端稳定性仍是近期重点。  
PR 方面，当前有 2 个待合并修复，分别面向跨平台路径处理/测试稳定性，以及工具超时后的可恢复性，说明维护方向正聚焦于 **跨平台质量、运行时健壮性和异常恢复能力**。

---

## 2. 版本发布

今日 **无新版本发布**。

---

## 3. 项目进展

今日没有已合并 PR，但有 2 个修复型 PR 处于待合并状态，若通过评审，将对稳定性有直接改善。

### 待合并 PR

#### PR #8003：修复跨平台路径处理与测试失败问题  
- 链接：<https://github.com/agentscope-ai/CoPaw/pull/8003>  
- 状态：Open  
- 作者：cuiyuebing  
- 类型：CI / 跨平台兼容性修复  
- 摘要：  
  - 修复 Windows 文件附件名称被渲染为完整路径的问题；
  - 对异常 ACP 显示路径进行一致性保留；
  - 在解释器关闭阶段抑制 AppContainer 清理进度日志；
  - 更新测试用例，使其使用平台感知路径、隔离 home/media 目录等。

**进展评估：**  
该 PR 主要改善 Windows 与跨平台测试稳定性。虽然不是功能性更新，但有助于降低 CI 波动和平台差异带来的回归风险。

---

#### PR #8001：前台工具超时后保持结果可恢复  
- 链接：<https://github.com/agentscope-ai/CoPaw/pull/8001>  
- 状态：Open  
- 作者：axelray-dev  
- 类型：Runtime 稳定性修复  
- 关联问题：#7981  
- 摘要：  
  - 当前台工具执行超时时，将已有的超时说明作为成功的 tool result 返回；
  - 允许父模型继续生成最终回答；
  - 用户主动取消仍保持 interrupt 行为。

**进展评估：**  
该 PR 改善了 Agent 工具调用链路中的失败恢复能力。对于长任务、多步骤执行、复杂工具链场景，这是一个重要的稳定性改进。

---

### 今日关闭事项

#### Issue #7998：上下文什么时候触发压缩？  
- 链接：<https://github.com/agentscope-ai/CoPaw/issues/7998>  
- 状态：Closed  
- 类型：Question  
- 作者：xiaohushi512  
- 摘要：用户询问在长会话、多步骤 Agent 自动请求中，是否只有用户手动提交时才触发上下文压缩，以及是否可以在 Agent 自动请求前根据阈值自动压缩。

**进展评估：**  
该问题已关闭，但其背后暴露出一个重要产品体验点：长任务 Agent 场景下，上下文压缩策略需要更透明、更可控，也可能需要从“人工提交触发”扩展到“Agent 自动循环中触发”。

---

## 4. 社区热点

今日所有 Issue 的评论数均为 1，尚未形成高强度讨论；但从问题类型看，以下议题最值得关注。

### 热点 1：Windows 非沙箱模式下 Office COM 调用安全边界  
- Issue #8002：<https://github.com/agentscope-ai/CoPaw/issues/8002>  
- 标题：`[Bug]: Windows auto mode with sandbox off allows inline Office COM Quit() to close the user's PowerPoint`  
- 状态：Open  
- 作者：shallowRainyDreams  
- 评论数：1  

**用户诉求：**  
用户报告在 Windows、approval level 为 `auto` 且关闭安全沙箱时，Agent 编写的 inline Office COM shell 命令被执行而不是被拒绝，导致 `PowerPoint.Application.Quit()` 可能关闭用户正在使用的 PowerPoint。

**背后信号：**  
这是一个明显的安全与权限治理问题。它不只是普通 Bug，而涉及 Agent 在非沙箱模式下对本地应用的控制边界。对个人 AI 助手类项目而言，此类问题会直接影响用户信任。

---

### 热点 2：Windows 桌面端缺少单实例保护  
- Issue #8000：<https://github.com/agentscope-ai/CoPaw/issues/8000>  
- 标题：`[Bug]: Desktop double-launch opens a second window and terminates the first instance live backend`  
- 状态：Open  
- 作者：hehaidong1222  
- 评论数：1  

**用户诉求：**  
用户在 Windows 桌面端重复启动程序时，会打开第二个独立窗口，并导致第一个实例的 live backend 被终止。期望桌面端具备 single-instance guard。

**背后信号：**  
这反映出桌面端进程生命周期管理仍需加强。对日常桌面 AI 助手而言，重复启动是高频误操作场景，若导致后端中断，会显著破坏使用连续性。

---

### 热点 3：长会话上下文压缩机制不够透明  
- Issue #7998：<https://github.com/agentscope-ai/CoPaw/issues/7998>  
- 状态：Closed  
- 类型：Question  

**用户诉求：**  
用户在 100–300 次步骤的长任务中发现后续请求几乎都以满上下文容量提交，希望 Agent 自动提交请求时也能根据阈值触发压缩。

**背后信号：**  
Agent 长任务能力越强，上下文管理越关键。当前用户开始关注压缩触发时机、成本、性能以及任务连续性，这可能成为后续 Runtime / Memory 设计的重要方向。

---

## 5. Bug 与稳定性

按潜在影响程度排序如下。

### P0 / 高风险：Windows 非沙箱 auto 模式下可执行 Office COM Quit  
- Issue #8002：<https://github.com/agentscope-ai/CoPaw/issues/8002>  
- 状态：Open  
- 是否已有 fix PR：暂无明确关联 PR  
- 影响范围：Windows、approval level `auto`、sandbox off、Office COM 可用环境  
- 风险分析：  
  - 可能关闭用户正在使用的 PowerPoint；
  - 涉及本地应用控制权限；
  - 与 Agent 自动执行策略、安全审批策略直接相关；
  - 若扩展到其他 COM 自动化对象，潜在影响可能不止 PowerPoint。

**建议优先级：最高。**  
建议维护者尽快确认是否属于预期行为，并考虑在非沙箱模式下增加 Office COM / GUI 自动化 / 进程终止类命令的审批拦截策略。

---

### P1 / 高影响：Windows 桌面端重复启动导致首个实例后端中断  
- Issue #8000：<https://github.com/agentscope-ai/CoPaw/issues/8000>  
- 状态：Open  
- 是否已有 fix PR：暂无明确关联 PR  
- 影响范围：Windows Desktop 2.2.1  
- 风险分析：  
  - 重复启动是常见用户行为；
  - 第二实例打开后会影响第一个实例的 live backend；
  - 可能导致正在进行的任务中断、状态丢失或会话异常。

**建议优先级：高。**  
建议加入 single-instance guard，例如启动时检测已有实例并聚焦已有窗口，而不是新建独立实例。

---

### P1 / 中高影响：前台工具超时后无法优雅恢复  
- PR #8001：<https://github.com/agentscope-ai/CoPaw/pull/8001>  
- 状态：Open  
- 关联问题：#7981  
- 影响范围：长任务、工具调用、Agent 执行链路  
- 修复方向：工具超时时返回可恢复结果，使父模型继续输出最终答案。

**已有修复 PR：有，#8001。**  
建议尽快评审并补充回归测试，特别覆盖用户主动取消与工具自然超时的行为差异。

---

### P2 / 中等影响：Windows 文件附件路径展示与跨平台测试不稳定  
- PR #8003：<https://github.com/agentscope-ai/CoPaw/pull/8003>  
- 状态：Open  
- 影响范围：Windows 文件附件显示、ACP 路径展示、CI 测试  
- 修复方向：平台感知路径处理、测试隔离、日志清理。

**已有修复 PR：有，#8003。**  
该问题对核心功能影响相对有限，但会影响用户界面一致性和开发流程稳定性。

---

## 6. 功能请求与路线图信号

### 请求 1：桌面端 UI 字体大小可调节  
- Issue #7999：<https://github.com/agentscope-ai/CoPaw/issues/7999>  
- 状态：Open  
- 作者：hjfb42241-hub  
- 类型：Feature Request  
- 摘要：希望 QwenPaw / CoPaw Desktop 支持在设置中调节界面字体大小，可提供小、默认、大、特大等档位或连续缩放。

**用户场景：**  
- 视力较弱用户；
- 中老年用户；
- 高 DPI 显示器；
- 投屏到电视或投影场景。

**路线图信号：**  
这是典型的可访问性与桌面体验增强需求，实现成本相对可控，适合标记为 `good first issue`。如果项目近期关注桌面端成熟度，该需求有较高概率进入短期优化列表。

---

### 请求 2：WebUI 支持消息撤回 / 编辑，并可选回滚工作区  
- Issue #7997：<https://github.com/agentscope-ai/CoPaw/issues/7997>  
- 状态：Open  
- 作者：ysf7762-dev  
- 类型：Enhancement  
- 摘要：希望 WebUI 聊天界面允许用户编辑或撤回已发送消息，自动截断后续对话历史，并可选回滚文件变化快照。

**用户场景：**  
- 用户输入错误后，希望从某个历史点重新开始；
- Agent 产生不符合预期的文件修改后，希望恢复到干净状态；
- 长对话中需要保持上下文一致性，避免错误消息继续污染后续推理。

**路线图信号：**  
该需求与 Agent 工作区状态管理、快照机制、对话树/历史截断能力相关，复杂度高于字体调节。但它直接面向 Agent 编程与文件操作场景，长期价值较高。

---

### 请求 3：Agent 自动步骤中触发上下文压缩  
- Issue #7998：<https://github.com/agentscope-ai/CoPaw/issues/7998>  
- 状态：Closed  
- 类型：Question / 潜在 Enhancement  
- 摘要：用户希望不仅在人工提交时触发上下文压缩，也能在 Agent 自动请求前根据阈值压缩上下文。

**路线图信号：**  
虽然该 Issue 已关闭，但它揭示了长任务 Agent 对上下文预算管理的真实需求。后续可考虑演进为配置项，例如：  
- 自动步骤压缩开关；
- 压缩阈值；
- 压缩前提示；
- 压缩日志可视化；
- 每轮请求 token 占用监控。

---

## 7. 用户反馈摘要

### 1）安全信任是桌面 Agent 的核心痛点  
来自 #8002 的反馈显示，用户非常关注 Agent 在本地环境中的执行权限。尤其是在关闭 sandbox 后，用户仍然期望系统具备基本的危险操作识别能力，而不是完全放行本地 COM 操作。

### 2）Windows 桌面端稳定性仍需打磨  
#8000 和 #8003 都指向 Windows 体验问题：一个是进程生命周期管理，一个是路径展示与测试兼容性。这说明 Windows 桌面端仍是当前用户反馈密集区域。

### 3）长任务 Agent 的上下文管理需要更透明  
#7998 中用户描述了一轮会话 100–300 次请求的场景，说明项目已被用于较复杂的自动化任务。用户不仅关心“能否跑完”，也关心每次请求是否携带过多上下文、是否浪费 token、是否影响性能。

### 4）桌面端可访问性需求开始出现  
#7999 的字体调节需求表明，用户群体正在扩展到更多实际桌面使用场景。字号、DPI、投屏等问题虽然不是核心 Agent 能力，但会明显影响日常使用体验。

### 5）用户希望对 Agent 行为具备“撤销权”  
#7997 提出的消息撤回、编辑和工作区回滚，反映出用户希望在 Agent 执行过程中拥有更强的控制力。对于会修改文件的 AI 助手，这类“可逆操作”能力会显著提升安全感。

---

## 8. 待处理积压

基于当前提供的 24 小时数据，未发现“长期未响应”的历史 Issue 或 PR。不过以下新近开放事项值得维护者优先关注，避免快速积压。

### 高优先级待处理

1. **Issue #8002：Windows 非沙箱 auto 模式下 Office COM 操作风险**  
   - 链接：<https://github.com/agentscope-ai/CoPaw/issues/8002>  
   - 建议：尽快确认安全策略，必要时引入危险 COM / Office 自动化命令拦截。

2. **Issue #8000：Windows 桌面端缺少单实例保护**  
   - 链接：<https://github.com/agentscope-ai/CoPaw/issues/8000>  
   - 建议：加入 single-instance guard，避免重复启动破坏已有后端。

3. **PR #8001：工具超时结果可恢复**  
   - 链接：<https://github.com/agentscope-ai/CoPaw/pull/8001>  
   - 建议：优先评审并合并，提升 Runtime 健壮性。

4. **PR #8003：跨平台路径与 CI 修复**  
   - 链接：<https://github.com/agentscope-ai/CoPaw/pull/8003>  
   - 建议：尽快跑全平台 CI，确认 Windows、Linux、macOS 路径行为一致。

### 中期关注

5. **Issue #7999：桌面端字体大小调节**  
   - 链接：<https://github.com/agentscope-ai/CoPaw/issues/7999>  
   - 建议：可作为低风险体验优化纳入近期版本。

6. **Issue #7997：WebUI 消息编辑 / 撤回 / 工作区回滚**  
   - 链接：<https://github.com/agentscope-ai/CoPaw/issues/7997>  
   - 建议：需要产品和架构层面设计，建议先拆分为消息编辑、历史截断、文件快照三阶段实现。

---

## 健康度评估

- **社区活跃度：中等偏高**  
  24 小时内 5 个 Issue、2 个 PR，反馈和修复均有持续流入。

- **维护响应：中等**  
  多数 Issue 有至少 1 条评论，但今日无 PR 合并，关键修复仍处于等待状态。

- **稳定性风险：中高**  
  Windows 桌面端与本地执行安全问题值得重点关注，尤其是 #8002 涉及本地应用控制边界。

- **产品成熟度信号：增强中**  
  用户开始提出字体调节、消息编辑、工作区回滚、上下文压缩策略等体验与控制类需求，说明项目正在从“能力可用”进入“长期可用、可控、可信”的阶段。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报（2026-09-28）

## 1. 今日速览

过去 24 小时 ZeroClaw 维持较高活跃度：Issues 更新 5 条，其中 4 条仍处于打开状态，PR 更新 10 条，其中 8 条仍待合并或继续评审。今日关注重心明显集中在 **安全授权、身份访问控制、运行时一致性、工具调用稳定性** 上，多条 P0 / S0 级别问题指向 session resume、delegated tools、gateway / RPC 授权状态不一致等高风险路径。  
PR 侧已有 2 条安全相关修复被关闭/完成，另有多个高风险或大体量 PR 仍在推进，说明维护者正在围绕“权限重新校验”和“运行时隔离边界”进行系统性加固。整体来看，项目活跃度健康，但短期稳定性压力偏高，尤其是身份权限与环境恢复相关问题需要优先收敛。

---

## 2. 项目进展

今日无新版本发布，因此没有 release 级别的变更、破坏性更新或迁移事项。

### 已关闭 / 完成的重要 PR

#### PR #11206：重新在锁内校验配置写权限  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11206  
- 状态：Closed  
- 标签：`bug`, `gateway`, `runtime`, `domain:security`, `risk:high`, `topic:identity-access`  
- 重点内容：该 PR 修复 gateway 配置写入路径中的授权时序问题。此前请求在进入时完成认证并记录 grants，但 JSON body 解析和等待 config write lock 的过程可被调用方控制，导致实际写入时权限状态可能已经变化。  
- 项目推进意义：  
  - 将配置写操作的权限判断从“请求入场时”推进到“实际持锁写入时”。  
  - 降低了管理员权限被撤销后仍可完成敏感配置写入的风险。  
  - 与今日多个 identity-access 问题高度相关，是权限再校验机制落地的一个具体修复点。

#### PR #11202：统一 gateway 与 RPC 的 inbound-auth 状态  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11202  
- 状态：Closed  
- 标签：`bug`, `core`, `daemon`, `gateway`, `runtime`, `domain:security`, `risk:high`, `topic:identity-access`  
- 重点内容：修复 supervised gateway 与 RPC context 各自构建独立 `RpcInboundAuth` 和 live configuration 的问题。此前两个入口各自维护 authority / policy revision，可能导致授权状态不同步。  
- 项目推进意义：  
  - 统一 gateway 与 RPC 的入站认证状态，减少策略更新只在单一 surface 生效的风险。  
  - 对身份访问控制一致性是重要基础修复。  
  - 与当前 session resume、admin revocation、config-write recheck 等问题共同表明项目正在重构权限一致性模型。

### 仍在推进的关键 PR

#### PR #11205：引入 authority recheck 基础设施  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11205  
- 状态：Open  
- 标签：`runtime`, `security`, `size:XL`  
- 重点内容：新增 `zeroclaw_runtime::security::authority`，包括 `AuthorizedOp`、`Admitted<Op>`、`Effect<Op>` 等类型，用类型系统区分“已准入但未执行”和“可产生效果的操作”。  
- 项目意义：这是今日最具架构意义的 PR。它不是单点 bug 修复，而是在为所有敏感操作建立“执行前重新校验”的基础抽象，可能成为后续多个安全修复的共同底座。

#### PR #11203：工具协议重试耗尽后应失败而非成功  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11203  
- 状态：Open  
- 标签：`agent`, `runtime`, `size:XS`  
- 重点内容：修复 malformed tool-protocol 重试耗尽后仍以 `Ok(...)` 返回 fallback 文本、导致 streamed agent 报告成功的问题。  
- 项目意义：提升 agent 工具调用的可靠性，避免“实际零工具执行但表面成功”的误导性状态。

#### PR #11201：序列化 prepared file mutation batches  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11201  
- 状态：Open  
- 标签：`bug`, `docs`, `agent`, `runtime`, `risk:high`, `risk:manual`, `size:S`  
- 重点内容：当 prepared batch 中包含多个 `file_edit` 或 `file_write` 时改为顺序执行，避免并行文件变更产生冲突或不确定结果。  
- 项目意义：增强 agent 文件编辑场景的稳定性，尤其适用于自动化代码修改、批量补丁等高风险使用场景。

---

## 3. 社区热点

今日社区讨论总量不高，Issues 侧最高评论数为 2，PR 评论数据未提供，所有列出的 Issues/PRs 反应数均为 0。因此热点更多体现为“严重程度与维护优先级”，而不是大规模社区讨论。

### Issue #11197：Session resume 在管理员权限撤销后恢复 forwarded environment  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11197  
- 评论数：2  
- 状态：Open  
- 标签：`priority:p0`, `risk:high`, `domain:security`, `topic:identity-access`  
- 热点原因：这是今日最值得关注的问题之一。问题指出 same-session resume 可能恢复会话创建时捕获的 forwarded environment，即使本地管理员已经失去 `admin` grant，admission 检查与实际恢复状态之间出现偏差。  
- 背后诉求：用户需要保证权限撤销能够即时、可靠地影响运行中或恢复中的 session，不能因为 resume 机制绕过当前授权状态。

### Issue #11198：Delegated memory tools 丢失 principal scope  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11198  
- 评论数：1  
- 状态：Open  
- 标签：`priority:p0`, `risk:high`, `tool:memory`, `tool:delegate`, `topic:identity-access`  
- 热点原因：该问题涉及 agentic delegate 构造 memory tools 时未继承 principal scope，可能导致子代理访问或写入不属于当前 principal 的 memory plane。  
- 背后诉求：多代理委托场景下，工具权限必须严格继承调用主体身份，不能因为 delegate 重新构造工具而丢失隔离边界。

### Issue #11204：OpenRouter 成本统计为 $0.00，tokens 全部归类为 free tok  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11204  
- 评论数：0  
- 状态：Open  
- 标签：`bug`  
- 热点原因：虽然严重程度为 S2，但该问题直接影响成本监控和运营可观测性。用户在约 90 次请求、约 210 万 tokens 后发现 Dashboard 中 Session / Daily / Monthly / By Model / By Agent 成本均为 `$0.000000`。  
- 背后诉求：用户希望 ZeroClaw 对第三方 provider 的 usage / cost ingestion 能准确反映实际支出，特别是在多模型、多 agent 使用场景下用于预算控制。

---

## 4. Bug 与稳定性

以下按严重程度与风险优先级排序。

### P0 / S0 / 高风险安全问题

#### Issue #11197：Session resume 恢复已失效的 forwarded environment  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11197  
- 状态：Open  
- 严重程度：S0 / P0 / High risk  
- 影响范围：`security/sandbox`, `agent`, `runtime`, `tool:shell`, identity access  
- 问题摘要：session resume 可能恢复旧的 forwarded environment，而 admission 使用的是 session 构建时捕获的环境，导致管理员权限撤销后仍可能保留敏感环境能力。  
- 是否已有 fix PR：未看到明确一一对应的 fix PR；但 PR #11205、#11206、#11202 均与 authority recheck / identity-access 方向相关。  
  - PR #11205：https://github.com/zeroclaw-labs/zeroclaw/pull/11205  
  - PR #11206：https://github.com/zeroclaw-labs/zeroclaw/pull/11206  
  - PR #11202：https://github.com/zeroclaw-labs/zeroclaw/pull/11202  

#### Issue #11198：Delegated memory tools 丢失 principal scope  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11198  
- 状态：Open  
- 严重程度：S0 / P0 / High risk  
- 影响范围：`memory`, `agent`, `runtime`, `tool:delegate`, `tool:memory`  
- 问题摘要：直接 memory tools 会路由到 principal 的私有 memory plane，但 agentic delegate 构造替代 memory tools 时未携带 principal scope，可能破坏 memory 隔离。  
- 是否已有 fix PR：未看到明确对应 PR。建议维护者尽快关联修复或在 Issue 中标记追踪 PR。

#### Issue #11199：Resumed shell environment 与 admission state 不一致  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11199  
- 状态：Closed  
- 严重程度：S0  
- 影响范围：`runtime/daemon`  
- 问题摘要：session resume 可替换 shell forwarded environment，但 RPC admission 检查状态未同步，导致 shell 环境与准入状态分叉。  
- 是否已有 fix PR：Issue 已关闭，但数据中未明确关闭原因或关联 PR。它与 #11197 的问题域高度重叠，可能是重复、被合并追踪或已有内部修复。

### 高风险运行时 / 文件操作稳定性

#### PR #11201：prepared file mutation batch 并行执行风险  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11201  
- 状态：Open  
- 标签：`risk:high`, `risk:manual`  
- 问题摘要：当 hooks 和 call preparation 生成可执行 batch 后，如果其中包含多个文件编辑/写入操作，继续并行执行可能造成覆盖、交错写入或不可预测结果。  
- 当前修复方向：在包含多个文件变更操作时顺序执行 prepared batch。  
- 影响：对自动化代码修改、agent 自主编辑仓库场景尤为重要。

#### PR #11203：malformed tool protocol 重试耗尽后误报成功  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11203  
- 状态：Open  
- 问题摘要：工具协议格式错误并耗尽重试后，系统仍可能返回 fallback prose，并被 streamed agent 包装成成功结果。  
- 当前修复方向：将该场景视为失败，避免用户误以为工具调用成功。  
- 影响：提升 agent tool-use 的可观察性和结果可信度。

### 中低严重度功能回归 / 计费问题

#### Issue #11204：OpenRouter usage.cost 未被 ingest，成本统计全为 0  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11204  
- 状态：Open  
- 严重程度：S2  
- 影响范围：`runtime/daemon`, Dashboard cost reporting, provider accounting  
- 问题摘要：OpenRouter 系列请求后，Dashboard 成本统计全部显示 `$0.000000`，tokens 被归为 `free tok`。  
- 是否已有 fix PR：未看到明确对应 PR。  
- 用户影响：影响预算监控、模型成本归因、agent 成本分析。

#### PR #11200：multimodal 消息准备时保留无 marker 的用户文本  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11200  
- 状态：Open  
- 标签：`bug`, `provider`, `risk:medium`, `size:XS`  
- 问题摘要：当请求中任一消息包含图片时，所有用户消息会经过 marker parser；自 #9819 后，无可加载 marker 的消息可能被 parser 改写，导致原始用户文本未能原样保留。  
- 当前修复方向：marker-free 用户文本在 preparation 阶段应 verbatim 传递。  
- 影响：改善 multimodal 请求中纯文本上下文丢失或被改写的问题。

---

## 5. 功能请求与路线图信号

### Issue #11207：为 Tsubasa custom-provider 编写有边界的设置文档  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11207  
- 状态：Open  
- 类型：Feature / docs  
- 用户诉求：希望在现有 custom-provider guide 中加入简短的 Tsubasa setup recipe，并明确 native protocol、边界与配置方式。  
- 路线图信号：这是低风险文档增强，若维护者认可范围，较可能进入近期文档迭代。它也表明用户正在扩展 ZeroClaw 的自定义 provider 使用场景。

### PR #11194：新增 Microsoft Teams / Bot Framework channel  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11194  
- 状态：Open  
- 标签：`enhancement`, `channel`, `config`, `runtime`, `domain:security`, `risk:high`, `size:XL`  
- 功能内容：为 ZeroClaw agent 增加 Microsoft Teams channel，支持个人聊天、群聊 @mention、团队频道 @mention，基于 Azure Bot Service / Bot Framework Connector API。  
- 路线图信号：这是明显的产品化渠道扩展，若合并，将显著增强企业协作场景覆盖。但由于 size XL 且 risk high，预计需要安全、配置和 channel 行为的充分评审。

### PR #11196：为 daemon 和 relay 二进制添加 build commit 标记  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11196  
- 状态：Open  
- 标签：`enhancement`, `ci`, `docs`, `dependencies`, `core`, `scripts`, `cli`  
- 功能内容：让 `--version` 不仅显示 package version，还能显示具体 build commit，解决同一版本号覆盖大量提交导致运行中二进制不可追溯的问题。  
- 路线图信号：这是可运维性增强，适合进入近期版本。对调试用户环境、定位回归、支持 nightly / unreleased builds 都有实际价值。

### PR #11195：为 debounced mirror batch 固定首条消息 modality 的测试  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11195  
- 状态：Open  
- 标签：`tests`, `channel:core`, `channel:matrix`, `risk:low`, `size:S`  
- 功能内容：补充 channel debounce 行为测试，确保合并消息 turn 时 modality 归属稳定。  
- 路线图信号：偏测试与行为锁定，低风险，可能较快合入。

### PR #11193：Web 依赖 minor / patch 批量升级  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11193  
- 状态：Open  
- 标签：`web`, `risk:medium`, `size:XL`  
- 功能内容：Dependabot 批量升级 `/web` 目录下 22 个依赖。  
- 路线图信号：属于维护性更新，但 size XL 且涉及前端依赖面较广，需关注构建、UI 回归和测试覆盖。

---

## 6. 用户反馈摘要

### 权限撤销必须立即生效，不能被 session resume 绕过  
相关条目：  
- Issue #11197：https://github.com/zeroclaw-labs/zeroclaw/issues/11197  
- Issue #11199：https://github.com/zeroclaw-labs/zeroclaw/issues/11199  

用户反馈反映出一个核心痛点：ZeroClaw 的运行时 session、shell environment、RPC admission 和管理员授权状态之间必须保持强一致。对于安全敏感部署而言，管理员权限撤销后，用户预期所有后续敏感操作都应基于最新授权状态重新判断，而不能依赖 session 创建时的旧快照。

### 多代理委托场景需要严格保留 principal 隔离  
相关条目：  
- Issue #11198：https://github.com/zeroclaw-labs/zeroclaw/issues/11198  

用户关注 agentic delegate 在重新构造工具时是否保持调用主体身份。反馈表明，ZeroClaw 的 memory / delegate 工具链已经进入更复杂的多代理使用场景，用户不只关心工具能否调用成功，更关心调用是否在正确的 principal scope 内执行。

### 成本可观测性是生产使用的基础能力  
相关条目：  
- Issue #11204：https://github.com/zeroclaw-labs/zeroclaw/issues/11204  

用户在较大调用量后发现 OpenRouter 成本仍为 0，说明实际使用场景已经达到需要成本归因和预算管理的规模。用户痛点不在模型响应本身，而在 usage.cost 未进入系统后，Dashboard 无法辅助判断不同 Session、Agent、Model 的真实消耗。

### 用户希望更多 provider / channel 集成具备明确文档和边界  
相关条目：  
- Issue #11207：https://github.com/zeroclaw-labs/zeroclaw/issues/11207  
- PR #11194：https://github.com/zeroclaw-labs/zeroclaw/pull/11194  

Tsubasa custom-provider 文档请求与 Microsoft Teams channel PR 共同说明，用户正在把 ZeroClaw 接入更多外部系统，包括自定义模型 provider 和企业通信平台。用户需求不仅是“能接入”，还包括“如何安全、边界清晰、可维护地接入”。

---

## 7. 待处理积压

当前数据仅覆盖最近 24 小时，未提供长期未响应 Issue / PR 的完整时间序列，因此无法严格判断“长期未响应”。但从今日数据看，以下高优先级打开项应被维护者优先跟进，避免形成安全积压。

### 高优先级待处理

#### Issue #11197：Session resume 恢复撤权后的 forwarded environment  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11197  
- 原因：P0 / S0 / high risk，涉及权限撤销绕过风险。  
- 建议：明确关联 fix PR，或将其纳入 PR #11205 authority recheck 体系追踪。

#### Issue #11198：Delegated memory tools 丢失 principal scope  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11198  
- 原因：P0 / S0 / high risk，涉及 memory 隔离与代理委托边界。  
- 建议：尽快补充最小复现、受影响路径和修复 owner；如已有内部修复，应在 Issue 中关联。

#### PR #11205：authority recheck foundation  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11205  
- 原因：size XL，且可能成为多个安全修复的基础设施。  
- 建议：优先评审类型边界、effect constructor 封装、serialization gate，以及与 gateway / RPC / session resume 的集成路径。

#### Issue #11204：OpenRouter 成本统计缺失  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11204  
- 原因：虽非最高安全风险，但影响生产可观测性和用户成本控制。  
- 建议：确认 OpenRouter response 中 `usage.cost` 的解析路径，并补充 provider accounting 回归测试。

#### PR #11194：Microsoft Teams channel  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11194  
- 原因：size XL / risk high，涉及企业 channel、认证、配置、运行时和安全。  
- 建议：拆分安全审查、配置文档、Bot Framework 行为测试，降低一次性合并风险。

---

## 项目健康度判断

- **活跃度：高**。24 小时内 10 条 PR 更新、5 条 Issue 更新，维护和贡献活动密集。  
- **稳定性压力：中高**。多个 P0 / S0 安全问题集中在身份、授权、session resume 和工具作用域上。  
- **维护方向：清晰**。PR #11205、#11206、#11202 显示项目正在从单点修复转向系统性 authority recheck 与 shared auth state。  
- **社区需求：生产化增强明显**。成本统计、企业 Teams 集成、自定义 provider 文档、build commit 可追溯性，均指向更成熟的生产部署诉求。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*