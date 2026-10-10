# OpenClaw 生态日报 2026-10-10

> Issues: 10 | PRs: 63 | 覆盖项目: 13 个 | 生成时间: 2026-10-10 04:51 UTC

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

# OpenClaw 项目动态日报（2026-10-10）

## 1. 今日速览

OpenClaw 今日活跃度很高：过去 24 小时共有 **10 条 Issue 更新**、**63 条 PR 更新**，其中 **44 条 PR 仍待合并**、**19 条已合并或关闭**。  
今日没有新版本发布，但维护节奏明显集中在 **稳定性修复、更新/安装链路、Gateway/Agent 状态一致性、Control UI 迁移与体验修复** 上。  
Issue 侧出现多个高优先级问题，包括 **P0 崩溃循环、P1 数据丢失/消息丢失、插件加载性能回退、更新失败** 等，说明当前主线和稳定版都处在较密集的回归修复阶段。  
PR 侧则呈现两条主线：一是为下一稳定版回补 P0/P1 修复，二是推进 Control UI 从 Lit/Web Awesome 向 Solid 2 迁移。整体看，项目维护活跃、响应速度快，但短期稳定性压力较高。

---

## 2. 项目进展

今日没有 Release，但有多项重要 PR 被合并或关闭，主要推动了 UI 可见性、身份刷新、运行时依赖、CI 可靠性等方面的修复。

### 已关闭 / 已合并的重要 PR

- [PR #168162](https://github.com/openclaw/openclaw/pull/168162) `fix(ui): show running swarm workers in the Subagents panel`  
  修复 Subagents 面板中无法显示正在运行的 swarm worker 的问题。此前并行任务卡片能看到运行中的子任务，但 Subagents 面板显示为空，造成用户误判。该修复提升了多 Agent / swarm 场景下的可观测性。

- [PR #168170](https://github.com/openclaw/openclaw/pull/168170) `fix(ui): refresh agent identity after Gateway file saves`  
  修复通过 Gateway 文件 RPC 保存 `IDENTITY.md` 后，已打开的 Control UI 标签页仍显示旧名称或头像的问题。该问题源自连接级身份缓存缺少文件写入通知。修复后，Agent 身份变更能更及时反映到 UI。

- [PR #168188](https://github.com/openclaw/openclaw/pull/168188) `fix(crabbox): require Crabbox 0.73.0 for cloud workers`  
  将 cloud workers 依赖的 Crabbox 最低版本提升到 `0.73.0`，避免旧版本 `0.69.0` 缺失 provider 与 lease 生命周期修复。该变更对远程执行和云 worker 稳定性有直接影响。

- [PR #168171](https://github.com/openclaw/openclaw/pull/168171) `fix(apple): Shared OpenClawKit Periphery fails on every OpenClawKit PR`  
  修复 OpenClawKit 相关 PR 上 Periphery 死代码检测持续失败的问题，减少 CI 噪音，提升 Apple/OpenClawKit 贡献路径的可维护性。

- [PR #168176](https://github.com/openclaw/openclaw/pull/168176) `fix: allow provider fallback after plain prompts`  
  该 PR 被关闭，原因为已被 [PR #168078](https://github.com/openclaw/openclaw/pull/168078) 取代。说明 provider fallback 相关问题已有替代实现路径。

- [PR #168202](https://github.com/openclaw/openclaw/pull/168202) `chore(ui): refresh control ui locales`  
  自动刷新 Control UI 本地化资源，保持生成的 locale 文件同步。属于维护性变更，但有助于 UI 国际化质量。

### 仍在推进中的关键 PR

- [PR #168198](https://github.com/openclaw/openclaw/pull/168198) `fix(release): backport 22 P0/P1 fixes and the usage-refresh deadlock repair to 2026.10.1`  
  非常关键的稳定版回补 PR，计划将 **22 个 P0/P1 修复** 以及一个 usage-refresh 死锁修复回补到 `2026.10.1`。涉及 agent tools、updates、Doctor、subagent delivery、compaction、providers、Telegram、本地模型等多个模块。若合并，将显著提升稳定版质量。

- [PR #168108](https://github.com/openclaw/openclaw/pull/168108) `fix: keep secret and catalog CLI writes with the Gateway owner`  
  解决 secret-store 命令和 `models refresh` 在 Gateway 已拥有 state directory 时，由第二进程写 SQLite 导致 Gateway 内存态过期的问题。该 PR 涉及安全边界和兼容性，需重点审查。

- [PR #168199](https://github.com/openclaw/openclaw/pull/168199) `fix(agents): drain active runs before durable agent deletion`  
  修复运行中的 Agent 被删除后进入半删除状态的问题。该问题影响 Agent 生命周期一致性，是多 Agent 长时间运行场景中的重要可靠性修复。

- [PR #168203](https://github.com/openclaw/openclaw/pull/168203) `fix(update): expose immutable receipts and recovery in status`  
  改进 `openclaw update status`，展示不可变验证身份、失败状态和恢复命令，增强更新失败后的可诊断性。

- [PR #168181](https://github.com/openclaw/openclaw/pull/168181) `fix(ui): playing chat widgets reload when the run finishes or the gateway reconnects`  
  修复聊天内嵌 widget 在 run 完成或 Gateway 重连时重新加载、丢失播放状态的问题，改善视频等交互式 widget 的连续体验。

- [PR #168194](https://github.com/openclaw/openclaw/pull/168194) `docs(ui): add Solid 2 migration playbook`  
  为 Control UI 从 Lit/Web Awesome 迁移到 Solid 2 增加迁移手册，是 UI 技术栈切换的重要基础文档。

---

## 3. 社区热点

> 今日 PR 评论数数据源中显示为 `undefined`，因此以下热点主要依据 Issue 优先级、标签、影响范围、更新频率以及 PR 状态综合判断。

### 1. Control UI 迁移到 Solid 2

- [Issue #168114](https://github.com/openclaw/openclaw/issues/168114) `Control UI: migrate from Lit + Web Awesome to Solid 2`
- [PR #168194](https://github.com/openclaw/openclaw/pull/168194) `docs(ui): add Solid 2 migration playbook`

这是今日最明确的路线图信号之一。Issue 中提到已有 data layer、chat、components、tests/tooling、pages、Solid 2 toolchain spike、Web Awesome exit 等研究报告和分工计划。  
社区诉求主要是：在迁移前明确状态所有权、生命周期契约、组件替换策略和测试路径，避免大规模 UI 重写带来行为回归。

### 2. 更新链路与安装修复

- [Issue #168196](https://github.com/openclaw/openclaw/issues/168196) `Update failure: package-swap (2026.9.8)`
- [PR #168197](https://github.com/openclaw/openclaw/pull/168197) `fix(update): leave live current handoff owners alone in update repair`
- [PR #168203](https://github.com/openclaw/openclaw/pull/168203) `fix(update): expose immutable receipts and recovery in status`
- [PR #168177](https://github.com/openclaw/openclaw/pull/168177) `fix(update): cleanup ignores original-state update captures`

更新系统今日出现多条相关修复：包括 update repair 与 handoff lease 冲突、status 缺少恢复信息、cleanup 无法清理历史 update captures 等。  
背后诉求很清晰：用户需要更新失败时有可靠恢复路径，维护者需要更好的状态可观测性，系统也需要避免更新残留占用大量磁盘空间。

### 3. Gateway / Agent 生命周期一致性

- [Issue #168159](https://github.com/openclaw/openclaw/issues/168159) `Codex app-server processes pile up after a few failed starts`
- [Issue #168160](https://github.com/openclaw/openclaw/issues/168160) `RangeError: Maximum call stack size exceeded`
- [PR #168199](https://github.com/openclaw/openclaw/pull/168199) `fix(agents): drain active runs before durable agent deletion`
- [PR #167739](https://github.com/openclaw/openclaw/pull/167739) `perf(sqlite): reuse admission across workers and reopens`

大规模 Agent fleet、Gateway 启动、SQLite admission、app-server 生命周期之间的耦合问题正在显现。  
用户反馈中的关键场景是：从旧版本迁移来的 **773-agent fleet** 在 `main` 上出现进程堆积、事件循环卡顿和栈溢出。这说明大规模生产状态迁移是当前稳定性验证的重要压力测试。

### 4. Provider / 本地模型 / 插件生态性能

- [Issue #168130](https://github.com/openclaw/openclaw/issues/168130) `External TypeScript plugins load ~4x slower since 2026.9.8`
- [Issue #168174](https://github.com/openclaw/openclaw/issues/168174) `OpenCode Zen Kimi K3: Thinking Off still reasons and Low/High are missing`
- [PR #168039](https://github.com/openclaw/openclaw/pull/168039) `fix(lmstudio): discover new models when refreshing saved inventory`
- [PR #168204](https://github.com/openclaw/openclaw/pull/168204) `fix(llama-cpp): keep managed runtime ready without optional metrics`
- [PR #168169](https://github.com/openclaw/openclaw/pull/168169) `fix: preserve local prompt caches across midnight`
- [PR #168157](https://github.com/openclaw/openclaw/pull/168157) `fix(sessions): preserve local prompt caches when history hits its byte cap`

用户对本地模型、外部插件、provider 行为和 prompt cache 命中率非常敏感。热点集中在性能回退、模型发现、thinking 参数准确性、缓存失效等方面。

---

## 4. Bug 与稳定性

### P0 / Release Blocker

1. [Issue #168159](https://github.com/openclaw/openclaw/issues/168159)  
   **Codex app-server 进程堆积、事件循环周期性卡顿**  
   - 严重程度：P0，`impact:crash-loop`
   - 状态：Open
   - 现象：Gateway 每约 22 秒启动新的 Codex app-server，旧进程未被回收；事件循环在同一节奏下卡顿 7–15 秒。
   - 场景：Node 24.20、Linux x64、4 vCPU / 16 GiB、773-agent fleet 从 2026.7.35 迁移。
   - 是否已有 fix PR：数据中未看到直接关联 fix PR；需要维护者优先跟进。

2. [Issue #168196](https://github.com/openclaw/openclaw/issues/168196)  
   **2026.9.8 package-swap 更新失败**  
   - 严重程度：P0，`impact:ux-release-blocker`
   - 状态：Closed
   - 场景：darwin/arm64，Node 24.21.0，CLI update。
   - 相关 PR：
     - [PR #168197](https://github.com/openclaw/openclaw/pull/168197) update repair 与 live handoff owner 处理
     - [PR #168203](https://github.com/openclaw/openclaw/pull/168203) update status 暴露恢复信息

### P1

3. [Issue #168066](https://github.com/openclaw/openclaw/issues/168066)  
   **Doctor 以不同用户运行时删除 blocked path plugin 的 enabled flag，导致插件重启后静默停止加载**  
   - 严重程度：P1，`impact:data-loss`
   - 状态：Closed
   - 影响：本地路径插件因可疑 ownership 被阻止后，Doctor 的 stale-plugin repair 误删 enabled 标记，造成插件状态丢失。
   - 是否已有 fix PR：Issue 已关闭，说明可能已有修复或处理结论，但数据中未给出直接 PR。

4. [Issue #168101](https://github.com/openclaw/openclaw/issues/168101)  
   **Rate-limit Retry-After 忽略 `retry.provider.maxRetryDelayMs`，工具调用后阻塞 session lane**  
   - 严重程度：P1，`impact:message-loss`, `impact:auth-provider`
   - 状态：Open
   - 现象：当 turn 已执行工具调用、不可安全 replay 时，后续模型调用返回 429，`maybeRetryTransient` 跳过 fallback，但仍按完整 Retry-After sleep，占用 session lane。
   - 是否已有 fix PR：标签显示 `clawsweeper:no-new-fix-pr`，尚无新 fix PR；需要产品决策和维护者 review。

5. [Issue #168130](https://github.com/openclaw/openclaw/issues/168130)  
   **外部 TypeScript 插件加载速度自 2026.9.8 起约慢 4 倍**  
   - 严重程度：P1
   - 状态：Open
   - 现象：plugin capture 为每个文件创建 jiti resolver，`"./x.js" -> "x.ts"` lookup 产生大量异常和无限 stack trace，CPU profile 显示 70% 时间消耗在 import resolution。
   - 是否已有 fix PR：未看到直接关联 PR。

### P2

6. [Issue #168160](https://github.com/openclaw/openclaw/issues/168160)  
   **store writer queue 和 agent write admission 中出现 Maximum call stack exceeded**  
   - 严重程度：P2
   - 状态：Open
   - 场景：main `24ca81d5`，Node 24.20，773-agent fleet 迁移状态。
   - 影响：Gateway 启动阶段多次 RangeError，可能影响写入队列和 session admission。
   - 是否已有 fix PR：未看到直接关联 PR。

7. [Issue #168193](https://github.com/openclaw/openclaw/issues/168193)  
   **`gateway-node-exec-approvals` e2e 测试可能因 unhandled rejection 导致 CI 失败**  
   - 严重程度：P2
   - 状态：Open
   - 影响：测试本身通过，但未及时 attach rejection handler，导致 CI 不稳定。
   - 相关方向：测试可靠性修复；数据中未见直接 fix PR。

8. [Issue #168174](https://github.com/openclaw/openclaw/issues/168174)  
   **OpenCode Zen Kimi K3 Thinking 选项异常**  
   - 严重程度：P2，`impact:auth-provider`, `impact:ux-friction`
   - 状态：Open
   - 现象：Thinking picker 缺少 Low/High，选择 Off 仍允许 reasoning。
   - 是否已有 fix PR：未看到直接关联 PR。

9. [Issue #168200](https://github.com/openclaw/openclaw/issues/168200)  
   **启动失败暴露 runtime identifiers，且缺少恢复指导**  
   - 严重程度：P2，`impact:ux-friction`
   - 状态：Open
   - 影响：错误摘要暴露 `thread not loaded` 或 managed worktree lease identifier，同时未展示可执行恢复建议。
   - 相关 PR：
     - [PR #168203](https://github.com/openclaw/openclaw/pull/168203) 虽主要针对 update status，但同样体现出“失败状态需要恢复信息”的产品方向。

10. [Issue #168114](https://github.com/openclaw/openclaw/issues/168114)  
    **Control UI 迁移到 Solid 2 的跟踪任务**  
    - 严重程度：P2，非 Bug
    - 状态：Open
    - 影响：未来 UI 架构迁移的总控任务。

---

## 5. 功能请求与路线图信号

### Control UI 技术栈迁移

- [Issue #168114](https://github.com/openclaw/openclaw/issues/168114)
- [PR #168194](https://github.com/openclaw/openclaw/pull/168194)

Solid 2 迁移已从讨论进入执行准备阶段。已有 playbook、研究报告、baseline inventory 和 lane work orders，说明该方向大概率会持续进入后续版本。  
短期更可能先落地文档、工具链 spike、局部组件迁移；长期目标是替换 Lit 3 + Web Awesome。

### Realtime Voice Provider 扩展

- [PR #168036](https://github.com/openclaw/openclaw/pull/168036) `feat(inworld): realtime voice provider for Talk and Voice Call`

该 PR 为 Talk、voice notes、telephony TTS 增加 Inworld realtime voice provider。用户诉求是让已选择 Inworld voice 的场景也能使用全双工实时语音，而不仅限于 OpenAI/Google。  
PR 规模为 XL，且包含依赖变更，仍在等待作者处理。若测试和依赖审查通过，可能进入较近版本的语音能力扩展路线。

### Skills 学习结果的可撤销体验

- [PR #167996](https://github.com/openclaw/openclaw/pull/167996) `feat(skills): Learned notice row with one-press Undo`

该 PR 将后台 skill review 的结果从“像 Agent 回复的大气泡”改为更安静的 Learned 行，并提供一键 Undo。  
这是明显的 UX 改进信号：OpenClaw 正在将“自动学习/记忆/技能更新”从模型对话行为中剥离，变成可控、可撤销、低干扰的系统事件。

### 本地模型与 Provider 体验增强

- [PR #168039](https://github.com/openclaw/openclaw/pull/168039) `fix(lmstudio): discover new models when refreshing saved inventory`
- [PR #168204](https://github.com/openclaw/openclaw/pull/168204) `fix(llama-cpp): keep managed runtime ready without optional metrics`
- [PR #168169](https://github.com/openclaw/openclaw/pull/168169) `fix: preserve local prompt caches across midnight`
- [PR #168157](https://github.com/openclaw/openclaw/pull/168157) `fix(sessions): preserve local prompt caches when history hits its byte cap`

这些 PR 共同表明本地模型体验是近期重点：模型发现、运行时 readiness、prompt cache 保持、历史裁剪策略都在被修复。下一版本很可能包含多项本地模型稳定性和性能改进。

---

## 6. 用户反馈摘要

### 主要痛点

1. **更新失败后的恢复信息不足**  
   用户在 [Issue #168196](https://github.com/openclaw/openclaw/issues/168196) 中提交了 package-swap 更新失败报告。相关 PR 表明，当前 update status 对失败原因、验证身份、恢复命令展示不足，影响用户自助修复能力。

2. **大规模 Agent fleet 迁移后稳定性不足**  
   [Issue #168159](https://github.com/openclaw/openclaw/issues/168159) 和 [Issue #168160](https://github.com/openclaw/openclaw/issues/168160) 都来自 773-agent fleet 迁移场景。用户观察到进程堆积、事件循环卡顿、栈溢出等问题，说明生产规模状态迁移仍是高风险路径。

3. **插件性能回退影响启动时间**  
   [Issue #168130](https://github.com/openclaw/openclaw/issues/168130) 中用户明确指出自 2026.9.8 起外部 TypeScript 插件加载慢约 4 倍，并提供 CPU profile。痛点是插件捕获机制引入了过高 import resolution 成本。

4. **UI 状态与实际运行状态不一致**  
   [PR #168162](https://github.com/openclaw/openclaw/pull/168162) 和 [PR #168181](https://github.com/openclaw/openclaw/pull/168181) 反映出用户对 Control UI 可观测性的要求：运行中的 subagent 必须可见，播放中的 widget 不应因 run 完成或 Gateway 重连而重载。

5. **Provider 参数和模型行为需要更精确映射**  
   [Issue #168174](https://github.com/openclaw/openclaw/issues/168174) 显示用户期望模型 Thinking 设置严格生效，尤其是 Off 不应继续 reasoning，Low/High 选项也应完整展示。

6. **错误信息不应暴露内部 runtime 标识，应给出恢复路径**  
   [Issue #168200](https://github.com/openclaw/openclaw/issues/168200) 指出启动失败卡片暴露 thread/worktree lease 等内部标识，同时没有明确恢复建议。用户希望错误摘要更面向操作，而不是暴露内部实现细节。

### 正向信号

- 多个问题在当天已有对应 PR 或关闭处理，说明维护响应较快。
- 用户报告质量较高，多个 Issue 提供了版本号、平台、Node 版本、CPU profile、fleet 规模和复现条件，有利于快速定位问题。
- UI、更新、Provider、本地模型等方向均有活跃修复，说明项目维护面覆盖较广。

---

## 7. 待处理积压与维护者提醒

以下条目虽不一定是“长期未响应”，但从严重程度、影响面和当前状态看，应优先进入维护者队列。

### 最高优先级

- [Issue #168159](https://github.com/openclaw/openclaw/issues/168159)  
  P0 crash-loop：Codex app-server 进程堆积且未回收。当前未看到直接 fix PR，建议立即确认 owner、复现路径和临时缓解方案。

- [Issue #168101](https://github.com/openclaw/openclaw/issues/168101)  
  P1 message-loss / auth-provider：Rate-limit Retry-After 在工具调用后阻塞 session lane。标签显示需要 maintainer review 和 product decision，且无新 fix PR。建议尽快明确产品语义：不可 replay 的 turn 遇到 429 时是截断、fallback、取消还是限时等待。

- [Issue #168130](https://github.com/openclaw/openclaw/issues/168130)  
  P1 插件加载性能回退：影响外部 TypeScript 插件用户，且已有 profile 数据。建议优先确认 2026.9.8 引入的 plugin capture 行为是否可缓存 resolver、限制 stack trace 或避免异常驱动控制流。

### 需要审查但可能收益很高的 PR

- [PR #168198](https://github.com/openclaw/openclaw/pull/168198)  
  回补 22 个 P0/P1 修复到 2026.10.1。规模 XL，涉及多个模块。建议维护者重点审查回补范围、冲突风险和回归测试覆盖。

- [PR #168108](https://github.com/openclaw/openclaw/pull/168108)  
  Secret/catalog CLI 写入归属 Gateway owner，涉及 SQLite 状态一致性、安全边界和兼容性。建议安全与 Gateway owner 共同 review。

- [PR #167739](https://github.com/openclaw/openclaw/pull/167739)  
  SQLite admission 复用，规模 XL，涉及 gateway、memory-core、CLI、scripts、commands、agents、workboard、logbook、team-reports 等。性能收益可能较高，但自动化、兼容性和安全敏感风险也较高。

- [PR #168036](https://github.com/openclaw/openclaw/pull/168036)  
  Inworld realtime voice provider，涉及依赖变更和新 provider 集成。建议补足语音端到端测试、失败降级路径和 provider capability 文档。

### UI 路线图待协调

- [Issue #168114](https://github.com/openclaw/openclaw/issues/168114)
- [PR #168194](https://github.com/openclaw/openclaw/pull/168194)

Solid 2 迁移是长期工程，建议维护者明确：
- 首批迁移页面或组件范围；
- Lit 与 Solid 并存期间的状态边界；
- Web Awesome 退出计划；
- 回归测试基线；
- 是否冻结部分 UI 重构类 PR，避免迁移期间冲突扩大。

---

## 今日健康度判断

- **活跃度：高**  
  24 小时内 63 条 PR 更新、10 条 Issue 更新，维护和贡献节奏非常活跃。

- **稳定性风险：偏高**  
  今日出现 P0 crash-loop、P0 更新失败、P1 数据/消息丢失、P1 插件性能回退等问题，且部分仍无明确 fix PR。

- **维护响应：较好**  
  多个问题当天已有 PR、关闭或替代实现，尤其是 update、UI、Crabbox、OpenClawKit CI 等方向响应迅速。

- **下一版本重点预测**  
  预计下一阶段重点会集中在：  
  1. 2026.10.1 稳定版高危修复回补；  
  2. update/repair/status 可恢复性；  
  3. Gateway/Agent 生命周期一致性；  
  4. 本地模型与 provider 体验；  
  5. Control UI Solid 2 迁移准备。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析  
日期：2026-10-10

---

## 1. 生态全景

个人 AI 助手与自主智能体开源生态今日整体呈现 **高活跃、高回归压力、强工程化治理** 的态势。OpenClaw、Hermes Agent、NanoBot、LobsterAI、CoPaw/QwenPaw、ZeroClaw 等项目均在集中处理 **Gateway 稳定性、消息投递可靠性、Provider 兼容性、桌面端体验、安装更新链路** 等基础问题。  
从社区反馈看，用户已不再只关注“能否调用模型”，而是更关注 **长期运行、跨平台部署、多渠道消息不丢失、Agent 状态一致性、安全边界和可恢复性**。  
同时，多个项目开始推进 UI/桌面端、多端客户端、本地模型、OpenAI-compatible/Responses API、语音与移动端能力，说明个人 AI 助手正在从实验性 Agent 框架走向 **日常生产力基础设施**。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 今日重点 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 10 | 63 | 无 | P0/P1 稳定性修复、Update/Gateway/Agent 生命周期、Control UI Solid 2 迁移 | **高活跃，稳定性风险偏高** |
| **Hermes Agent** | 50 | 50 | 无 | Gateway 消息投递、Desktop/TUI 会话状态、Computer Use、安装更新 | **极高活跃，待合并压力大** |
| **NanoBot** | 4 | 23 | 无 | Telegram/WhatsApp/Slack/Matrix 渠道修复、Provider reasoning 参数、多实例支持 | **高活跃，响应快，待审压力中等** |
| **PicoClaw** | 1 | 0 | 无 | Android pure-Go DNS 解析失败 | **低活跃，但单点问题影响较大** |
| **NanoClaw** | 1 | 9 | **v2026.10.0** | 稳定版发布、路径安全、CLI/命令解析、OneCLI 需求 | **健康良好，发布成熟度提升** |
| **NullClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **IronClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **LobsterAI** | 0 | 12 | 无 | OpenClaw 网关稳定性、Windows loopback、配置恢复、任务 steering | **维护活跃，稳定性修复集中** |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **Moltis** | 2 | 0 | 无 | OpenAI gpt-6 支持、群聊 trigger word | **低速推进，需求质量较高** |
| **CoPaw / QwenPaw** | 6 | 7 | 无 | MCP Driver RCE、OpenAI Responses 流式、Windows 长路径、HarmonyOS、i18n | **高活跃但安全风险突出** |
| **ZeptoClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **ZeroClaw** | 2 | 12 | 无 | CI 稳定、cron 安全、Provider reasoning 兼容、Desktop GPU 占用 | **活跃，工程治理导向明显** |

---

## 3. OpenClaw 在生态中的定位

### 3.1 综合定位

OpenClaw 是今日数据中 **规模最大、工程复杂度最高、维护活动最密集** 的项目之一。过去 24 小时内有 **63 条 PR 更新、10 条 Issue 更新**，明显高于多数同类项目，仅 Hermes Agent 在 Issue 数上更高。

它的定位更接近一个完整的 **个人 AI 操作系统 / 多 Agent 运行时平台**，而不是单一聊天机器人或轻量 Agent 框架。其关注点覆盖：

- Gateway 与 Agent 生命周期；
- 多 Agent / swarm 可观测性；
- 更新、安装、状态恢复；
- 本地模型与 Provider；
- Control UI；
- 云 worker；
- SQLite 状态一致性；
- 插件和 prompt cache 性能。

### 3.2 相比同类的优势

| 维度 | OpenClaw 表现 |
|---|---|
| **社区与维护规模** | 今日 63 条 PR 更新，维护节奏非常高 |
| **系统完整度** | 同时覆盖 CLI、Gateway、Control UI、Agent runtime、cloud worker、本地模型、插件 |
| **稳定版维护能力** | 正在推进 #168198，将 22 个 P0/P1 修复回补到 2026.10.1 |
| **可观测性投入** | Subagents 面板、update status、Gateway 身份刷新等持续改进 |
| **技术路线清晰度** | Control UI 迁移到 Solid 2 已有 tracking issue 与 migration playbook |

### 3.3 当前短板与风险

OpenClaw 当前最大问题不是活跃度不足，而是 **稳定性压力偏高**：

- P0 crash-loop：Codex app-server 进程堆积；
- P0 update package-swap 失败；
- P1 Rate-limit Retry-After 阻塞 session lane；
- P1 TypeScript 插件加载性能回退；
- 大规模 773-agent fleet 迁移暴露 Gateway / SQLite / Agent 生命周期问题。

这说明 OpenClaw 已经进入真实生产规模使用阶段，问题复杂度明显高于轻量级项目。

### 3.4 技术路线差异

与 NanoBot、Moltis 这类偏消息机器人 / bot runtime 的项目相比，OpenClaw 更强调：

- **durable agent lifecycle**；
- **本地 + 云 worker 混合执行**；
- **Control UI 管理面**；
- **多 Agent fleet 与 swarm**；
- **稳定版回补与更新恢复机制**。

与 Hermes Agent 相比，二者都在做 Gateway、Desktop、远程 companion、多平台部署，但 OpenClaw 今日更突出 **稳定版工程治理和 UI 技术栈迁移**，Hermes 更突出 **社区部署场景、插件 catalog、Computer Use 与远程 companion**。

---

## 4. 共同关注的技术方向

### 4.1 Gateway / 消息投递可靠性

涉及项目：

- **OpenClaw**：Gateway/Agent 生命周期、app-server 进程堆积、durable agent deletion、Gateway file save 身份刷新；
- **Hermes Agent**：Telegram topic 串线、Weixin/iLink 静默丢消息、approval button 错配、pause 期间消息不可回放；
- **NanoBot**：WhatsApp replay filter、Telegram album、Slack DM mention、Matrix edit formatting；
- **LobsterAI**：OpenClaw gateway 启动、Windows loopback、配置恢复阻断；
- **Moltis**：群聊 trigger word；
- **ZeroClaw**：cron shell 输出泄漏到渠道。

共同诉求：

- 消息不能静默丢失；
- 会话不能串线；
- 失败必须可诊断、可恢复；
- 多渠道行为要符合平台原生体验；
- Gateway 要能长期稳定运行。

---

### 4.2 Provider 与新模型 API 兼容

涉及项目：

- **OpenClaw**：OpenCode Zen Kimi K3 Thinking 选项、本地模型、LM Studio、llama.cpp；
- **NanoBot**：DeepSeek reasoning 参数、Anthropic redacted_thinking；
- **Hermes Agent**：多模型 runtime config、fallback picker；
- **Moltis**：OpenAI gpt-6 reasoning + tools 需要 Responses API；
- **CoPaw/QwenPaw**：OpenAI Responses API 流式事件解析；
- **ZeroClaw**：OpenAI-compatible 后端 `reasoning_key` override；
- **LobsterAI**：Atlas Cloud Provider 接入。

共同诉求：

- reasoning / thinking 参数要与上游模型语义一致；
- OpenAI-compatible 并不等于完全兼容，需要模型级能力声明；
- Responses API、tool calling、streaming event 解析正在成为 Provider 适配重点；
- 本地模型与自托管后端正在变成主流部署路径。

---

### 4.3 安装、更新与恢复机制

涉及项目：

- **OpenClaw**：update package-swap 失败、update status 展示 recovery、repair 与 handoff lease；
- **Hermes Agent**：Docker Hub 标签冻结、Chromium 降级、Python 3.11-3.13 崩溃、PM repair；
- **NanoClaw**：v2026.10.0 稳定 release channel，`/update-nanoclaw` 不再追 main；
- **LobsterAI**：gateway 启动超时、配置锁恢复；
- **PicoClaw**：Android 构建 DNS 解析失败；
- **ZeroClaw**：Rust 工具链升级、CI 镜像拉取稳定性。

共同诉求：

- 更新失败后要有明确恢复命令；
- release channel 比直接追 main 更适合普通用户；
- 安装/运行时依赖需要覆盖 Windows、macOS、Linux、Android、Docker；
- CI/CD 稳定性直接影响用户获取修复的速度。

---

### 4.4 桌面端与多端体验

涉及项目：

- **Hermes Agent**：Desktop 会话管理、remote-only mode、Windows console flash、i18n placeholder；
- **LobsterAI**：桌面伴侣选中文本翻译/朗读、剪贴板权限；
- **CoPaw/QwenPaw**：HarmonyOS NEXT 客户端、Windows desktop 流式中断；
- **ZeroClaw**：Linux/Tauri idle GPU 高占用；
- **OpenClaw**：Control UI Solid 2 迁移；
- **NanoBot**：WebUI 文案与多语言优化。

共同诉求：

- AI 助手正在进入日常桌面/移动环境；
- UI 需要长期可维护的技术栈；
- 桌面端必须处理权限、资源占用、系统休眠、WebView 差异；
- 多语言、多端客户端成为成熟项目的必选项。

---

### 4.5 安全边界与本地执行风险

涉及项目：

- **CoPaw/QwenPaw**：MCP Driver 配置接口疑似 root RCE；
- **ZeroClaw**：cron shell 输出泄漏、ZeroCode 本地路径打开需安全审查；
- **NanoClaw**：host 通过目录描述符固定 session/skill/run-log 访问范围；
- **OpenClaw**：secret/catalog CLI 写入归属 Gateway owner，SQLite 状态一致性与安全边界；
- **Hermes Agent**：approval button 错配、远程维护 handoff、自动 OTP 请求；
- **LobsterAI**：Windows 防火墙、本地 gateway 访问权限。

共同诉求：

- Agent 工具执行能力越强，安全风险越高；
- 本地文件、shell、MCP、cron、浏览器自动化都需要明确权限模型；
- 管理接口不能默认公网暴露；
- 需要审计日志、最小权限、沙箱、用户确认与安全公告机制。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 / 路线特点 |
|---|---|---|---|
| **OpenClaw** | 多 Agent runtime、Gateway、Control UI、本地/云 worker、稳定版治理 | 高阶个人 AI 用户、Agent 开发者、生产级多 Agent 部署者 | 大型 monorepo 式系统，强调 durable state、UI 管理面、更新恢复、fleet 规模 |
| **Hermes Agent** | 远程 companion、Desktop/TUI、Gateway、多平台插件、Computer Use | 重度个人自动化用户、多设备部署者、插件生态用户 | 社区场景极丰富，强调远程访问、Telegram/phone/Tailscale、插件 catalog |
| **NanoBot** | 多渠道消息机器人、Provider 适配、多实例部署 | Bot 部署者、消息平台集成开发者 | 渠道适配细致，Telegram/WhatsApp/Slack/Matrix 等平台体验优化快 |
| **PicoClaw** | 轻量移动/Android gateway | Android / 嵌入式运行用户 | 当前活跃低，但 Android 构建网络问题显示移动端部署是重点 |
| **NanoClaw** | 稳定发布、CLI/skill 安装、安全路径访问 | 偏稳定使用的个人助手用户、技能维护者 | release-driven，CalVer，强调安装更新和本地安全边界 |
| **LobsterAI** | 桌面 AI 助手、OpenClaw 集成、Windows gateway、办公/选中文本场景 | 桌面端普通用户、Windows 用户、办公场景用户 | 产品化桌面应用，强依赖本地 gateway 与 OpenClaw runtime |
| **Moltis** | Provider 兼容、聊天入口控制、WhatsApp 群聊 | 自托管聊天助手用户 | 轻量需求驱动，关注 OpenAI 新模型和群聊触发机制 |
| **CoPaw/QwenPaw** | Console、Plugin Creator、多端客户端、本地模型推荐、Worker 管理 | 企业/团队 Agent 平台用户、插件开发者、多端用户 | 功能扩张快，但安全事件暴露出管理接口风险 |
| **ZeroClaw** | Rust runtime、ZeroCode、CI/安全治理、OpenAI-compatible Provider | 工程型 Agent 开发者、Rust 生态用户 | 工程治理强，风险标签清晰，注重 CI、依赖、runtime 安全 |
| **NullClaw / IronClaw / TinyClaw / ZeptoClaw** | 今日无活动 | 不明或低活跃用户 | 暂无可见推进信号 |

---

## 6. 社区热度与成熟度

### 6.1 快速迭代阶段

代表项目：

- **Hermes Agent**
- **OpenClaw**
- **NanoBot**
- **CoPaw/QwenPaw**
- **ZeroClaw**
- **LobsterAI**

特征：

- PR/Issue 数量高；
- 用户场景丰富；
- Bug 暴露密集；
- Provider、Gateway、Desktop、多端、插件能力并行推进；
- 待合并队列较大。

其中：

- **Hermes Agent**：Issue 50、PR 50，社区反馈最密集；
- **OpenClaw**：PR 63，代码维护最密集；
- **NanoBot**：渠道适配响应最快；
- **CoPaw/QwenPaw**：功能扩张强，但安全优先级最高；
- **ZeroClaw**：工程治理成熟，风险标签清晰；
- **LobsterAI**：产品化桌面稳定性修复集中。

---

### 6.2 质量巩固阶段

代表项目：

- **NanoClaw**
- **OpenClaw**
- **ZeroClaw**
- **LobsterAI**

这些项目今日都体现出明显的“基础设施债务偿还”特征：

- NanoClaw 发布 v2026.10.0，转向稳定 release channel；
- OpenClaw 准备回补 22 个 P0/P1 修复；
- ZeroClaw 修复 CI、安全、Provider 细节；
- LobsterAI 集中处理 Windows gateway、配置锁、任务状态机。

---

### 6.3 低速需求收集阶段

代表项目：

- **Moltis**
- **PicoClaw**

特征：

- Issue 少，PR 少或无；
- 但反馈质量较高；
- 需求直接对应真实场景。

Moltis 的两个 Issue 分别指向 **OpenAI gpt-6 + tools** 和 **WhatsApp 群聊唤醒词**，技术价值较高。PicoClaw 虽只有 1 个 Issue，但 Android DNS 失败影响基础可用性。

---

### 6.4 静默或低可见度项目

代表项目：

- **NullClaw**
- **IronClaw**
- **TinyClaw**
- **ZeptoClaw**

过去 24 小时无活动，无法判断其真实维护状态。对技术选型者而言，这类项目需要结合更长周期数据判断是否仍适合采用。

---

## 7. 值得关注的趋势信号

### 7.1 Agent 正在从“聊天界面”走向“长期运行的个人基础设施”

OpenClaw 的 773-agent fleet、Hermes 的 phone → Tailscale → gateway companion、LobsterAI 的本地 gateway、NanoBot 的多实例 home 目录，都说明用户正在把 AI Agent 当作长期运行服务，而不是一次性 CLI 工具。

对开发者的参考：

- 必须设计持久化状态、恢复机制、队列、审计和健康检查；
- 只靠“模型调用成功”已经不足以构成可用产品；
- Gateway 和 runtime 的生命周期管理会成为核心竞争力。

---

### 7.2 消息可靠性成为 AI 助手信任基础

多个项目同时暴露：

- 消息丢失；
- topic 串线；
- replay filter 失效；
- approval button 错配；
- pause 后无法回放；
- stop 后继续执行。

这说明个人 AI 助手进入真实通信渠道后，核心问题转为 **消息语义和状态一致性**。

对开发者的参考：

- 每条外部消息都应有投递状态；
- 用户授权必须绑定具体 request；
- 失败应可见、可重试、可审计；
- 不应静默丢弃用户输入或模型输出。

---

### 7.3 Provider 抽象进入“模型能力矩阵”时代

OpenAI Responses API、gpt-6 reasoning + tools、DeepSeek thinking、Kimi Thinking、Anthropic redacted_thinking、OpenAI-compatible reasoning_key 等问题说明：  
单一 OpenAI Chat Completions 风格抽象已经不够。

对开发者的参考：

- Provider 层需要维护模型能力声明；
- reasoning、tools、streaming、vision、function calling、cache、fallback 应按模型粒度配置；
- OpenAI-compatible 后端需要 escape hatch；
- 错误提示应直接告诉用户“该模型+参数组合不支持”。

---

### 7.4 本地模型与自托管后端成为主流需求

OpenClaw、Hermes、NanoBot、CoPaw、ZeroClaw 都出现本地模型、自托管 provider 或 OpenAI-compatible 相关动态。

典型信号：

- LM Studio 模型发现；
- llama.cpp runtime readiness；
- vLLM reasoning 字段兼容；
- QwenPaw-Flash GGUF 推荐；
- Termux llama.cpp 节点；
- Atlas Cloud / OpenRouter 等 provider 扩展。

对开发者的参考：

- 本地模型体验不只是“能跑”，还包括模型发现、缓存、资源估算、参数映射、错误提示；
- 对自托管后端要提供配置覆盖能力；
- 本地模型用户对性能回退非常敏感。

---

### 7.5 桌面端、多端和移动端成为竞争焦点

今日多个项目都在桌面和多端投入：

- OpenClaw：Control UI 迁移 Solid 2；
- Hermes：Desktop session、remote-only、Windows/macOS/Docker；
- LobsterAI：桌面伴侣、剪贴板、Windows gateway；
- CoPaw：HarmonyOS NEXT；
- ZeroClaw：Tauri Linux GPU；
- PicoClaw：Android gateway DNS。

对开发者的参考：

- WebView、权限、系统休眠、GPU、剪贴板、防火墙、DNS 都是 AI 助手产品化必须处理的问题；
- 移动端和桌面端不是简单壳层，而是独立稳定性工程；
- UI 技术栈迁移需要状态边界和测试基线先行。

---

### 7.6 安全治理将成为 Agent 平台成熟度分水岭

CoPaw/QwenPaw 的 MCP Driver root RCE 报告、ZeroClaw 的 cron shell 泄漏、NanoClaw 的 anchored directory、OpenClaw 的 secret/catalog Gateway owner，都指向同一个事实：  
Agent 越能操作系统、文件、浏览器和工具，安全风险越接近传统 RCE / 供应链 / 权限提升问题。

对开发者的参考：

- 所有执行型工具都应默认最小权限；
- 管理接口必须鉴权，避免公网暴露；
- 文件访问要考虑 symlink、路径穿越、目录锚定；
- shell、MCP、cron、browser automation 需要审计日志和用户授权；
- 安全公告、IOC、缓解指南会成为成熟项目标配。

---

## 结论

今日生态中，**OpenClaw 与 Hermes Agent** 代表大型、高复杂度、生产化个人 Agent 平台；**NanoBot** 代表多渠道 bot runtime 的快速响应模式；**NanoClaw** 展现出稳定发布和安全基础设施成熟化；**LobsterAI** 更偏桌面产品化；**CoPaw/QwenPaw** 功能扩张强但安全压力突出；**ZeroClaw** 则体现出较强工程治理意识。

对技术决策者而言，选型时不应只看功能列表，而应重点评估：

1. Gateway 和消息可靠性；
2. Provider 兼容速度；
3. 更新恢复机制；
4. 本地模型支持质量；
5. 安全边界；
6. 桌面/移动端稳定性；
7. 社区维护响应能力。

OpenClaw 当前在规模、工程完整度和维护活跃度上处于生态第一梯队，但短期需要优先收敛 P0/P1 稳定性问题，尤其是大规模 Agent fleet、更新链路和插件性能回退。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报  
日期：2026-10-10  
仓库：HKUDS/nanobot

## 1. 今日速览

过去 24 小时，NanoBot 保持了较高开发活跃度：Issues 更新 4 条，PR 更新 23 条，其中 13 条仍待合并，10 条已合并或关闭。今日工作重心集中在多渠道消息体验、Provider 推理参数兼容性、配置与多实例支持、文档整理以及若干稳定性修复。  
从数据看，项目维护节奏较快，社区反馈能在同日形成对应修复 PR，例如 WhatsApp 时间戳问题、Telegram 媒体识别问题、DeepSeek reasoning 参数问题均已有配套 PR。  
当前项目健康度整体良好：问题响应速度快，测试与文档同步更新较多；但待审 PR 数量较高，短期内需要维护者集中处理，以避免修复和新功能积压。

---

## 2. 项目进展

今日已关闭或合并的 PR 主要集中在配置、多实例、WhatsApp 修复、WebUI 文案和文档维护等方向。

### 重要已关闭 / 已合并 PR

#### 1. 修复 WhatsApp replay filter 时间戳单位错误  
- PR：[#6127 fix(whatsapp): normalize neonize timestamps before replay filtering](https://github.com/HKUDS/nanobot/pull/6127)  
- 关联 Issue：[#6120 WhatsApp: replay filter never fires](https://github.com/HKUDS/nanobot/issues/6120)  
- 类型：Bug 修复 / Channel / Test  
- 影响：修复 WhatsApp 渠道中 neonize 时间戳为毫秒、但与 `time.time()` 秒级时间比较的问题。  
- 进展意义：这是一个实际影响消息去重与历史消息过滤的稳定性问题。修复后，旧消息会在读取回执或交付前被正确过滤，入站元数据也统一为秒级 epoch 时间。

#### 2. 支持 `NANOBOT_HOME` 默认配置与工作区解析  
- PR：[#6126 fix(config): honor NANOBOT_HOME for default config and workspace](https://github.com/HKUDS/nanobot/pull/6126)  
- 类型：Bug 修复 / Documentation / Test  
- 影响：默认配置路径和默认 workspace 会尊重 `NANOBOT_HOME`，Gateway 默认配置发现也统一使用 home helper。  
- 进展意义：增强多实例部署能力，尤其适合本地多环境、测试环境、容器化或用户隔离运行场景。

#### 3. 新增 CLI `--home` 实例目录选择器  
- PR：[#6128 feat(cli): add --home instance directory selector](https://github.com/HKUDS/nanobot/pull/6128)  
- 类型：Feature / Documentation / Test  
- 影响：允许用户通过 `nanobot --home <directory>` 快速指定实例目录，自动关联该目录下的 `config.json` 和 `workspace`。  
- 进展意义：与 `NANOBOT_HOME` 修复形成互补，说明项目正在系统性改善多实例运行体验。

#### 4. WebUI 多语言文案简化  
- PR：[#6116 fix(webui): simplify existing copy across all locales](https://github.com/HKUDS/nanobot/pull/6116)  
- 类型：WebUI / Channel / Fix / Test  
- 影响：重写 10 种支持语言中的设置项和渠道配置文案，使其更简洁自然。  
- 进展意义：改善管理端可读性和上手体验，对非英语用户和多渠道配置用户尤其有帮助。

#### 5. 文档与注释维护  
- PR：[#6129 docs: refresh stale runtime comments and docstrings](https://github.com/HKUDS/nanobot/pull/6129)  
- PR：[#6131 docs: remove manual paragraph line wraps](https://github.com/HKUDS/nanobot/pull/6131)  
- PR：[#6117 docs(agents): add interface copywriting guidance](https://github.com/HKUDS/nanobot/pull/6117)  
- PR：[#6119 chore(linear): format Chinese locale JSON](https://github.com/HKUDS/nanobot/pull/6119)  
- 影响：清理过时注释、移除文档中的手动换行、补充界面文案改写规范、格式化中文 locale JSON。  
- 进展意义：这些变更不直接改变运行能力，但显著降低长期维护成本，并提升贡献者协作效率。

#### 6. 测试命名与断言对齐  
- PR：[#6130 test: align test names with current assertions](https://github.com/HKUDS/nanobot/pull/6130)  
- 类型：Test  
- 影响：重命名测试函数和测试类，使名称更准确地反映当前断言。  
- 进展意义：提升测试套件可读性，有利于后续重构和回归定位。

---

## 3. 社区热点

今日所有展示的 Issues 评论数均为 0，PR 评论数数据为 `undefined`，因此没有明显的“讨论型热点”。不过从 Issue 与 PR 的对应关系看，社区关注点集中在渠道交付体验、Provider 参数兼容性和多实例运行三个方向。

### 热点 1：Telegram 多媒体发送体验  
- Issue：[#6121 feat(telegram): send multiple outbound images as albums](https://github.com/HKUDS/nanobot/issues/6121)  
- PR：[#6125 feat(telegram): send consecutive images as albums](https://github.com/HKUDS/nanobot/pull/6125)  
- 状态：Issue Open，PR Open  
- 诉求分析：当 Agent 一次返回多张图片时，Telegram 当前逐条调用 `send_photo`，导致用户看到多个分散消息，而不是相册。用户希望 NanoBot 能更符合 Telegram 原生体验，自动将连续图片或视频分组为 album。  
- 健康度信号：已有同日 PR，说明维护响应及时。该功能若合并，将显著提升 Telegram 渠道的输出体验。

### 热点 2：Telegram 带 query string 的远程媒体 URL 识别  
- Issue：[#6123 Telegram: classify remote media URLs with query strings by path extension](https://github.com/HKUDS/nanobot/issues/6123)  
- PR：[#6124 fix(telegram): detect remote media types with queries](https://github.com/HKUDS/nanobot/pull/6124)  
- 状态：Issue Open，PR Open  
- 诉求分析：远程图片 URL 如 `card.jpg?width=672` 被误判为文档，影响图片展示和相册分组。用户实际场景可能来自 CDN、图片服务或带参数的动态缩放图片链接。  
- 健康度信号：这是典型的渠道边界兼容问题，已有修复 PR，且与 Telegram album 功能互相关联。

### 热点 3：DeepSeek reasoning 参数兼容性  
- Issue：[#6122 DeepSeek: reasoning_effort="minimal" sends contradictory thinking controls](https://github.com/HKUDS/nanobot/issues/6122)  
- PR：[#6132 fix(deepseek): map minimal reasoning effort to low](https://github.com/HKUDS/nanobot/pull/6132)  
- 状态：Issue Open，PR Open  
- 诉求分析：配置 `reasoning_effort="minimal"` 时，同时发送 `reasoning_effort="minimal"` 与 `thinking.type="disabled"`，语义冲突。用户关注的是与 DeepSeek 官方 thinking mode 行为保持一致。  
- 健康度信号：Provider 兼容性问题已快速形成修复 PR，说明项目对多模型后端的适配质量较为重视。

### 热点 4：多实例运行和 home 目录管理  
- PR：[#6126 fix(config): honor NANOBOT_HOME for default config and workspace](https://github.com/HKUDS/nanobot/pull/6126)  
- PR：[#6128 feat(cli): add --home instance directory selector](https://github.com/HKUDS/nanobot/pull/6128)  
- 状态：均已关闭  
- 诉求分析：用户或部署者希望更方便地运行多个 NanoBot 实例，而不必手动同时指定 config 与 workspace。  
- 健康度信号：相关改动已完成，表明多实例部署正在成为官方支持路径的一部分。

---

## 4. Bug 与稳定性

按潜在影响范围和用户可感知程度排序如下。

### P1 / 高影响：WhatsApp replay filter 不生效  
- Issue：[#6120 WhatsApp: replay filter never fires](https://github.com/HKUDS/nanobot/issues/6120)  
- PR：[#6127 fix(whatsapp): normalize neonize timestamps before replay filtering](https://github.com/HKUDS/nanobot/pull/6127)  
- 状态：Issue Closed，PR Closed  
- 问题：neonize 的 `Timestamp` 为毫秒，而 NanoBot 与秒级 `time.time()` 比较，导致旧消息过滤器永远不会触发。  
- 影响：Bot 启动后可能处理本应被过滤的历史消息，造成重复响应或误触发自动化流程。  
- 当前进展：已有修复，风险已基本收敛。

### P2：DeepSeek reasoning 参数冲突  
- Issue：[#6122 DeepSeek: reasoning_effort="minimal" sends contradictory thinking controls](https://github.com/HKUDS/nanobot/issues/6122)  
- PR：[#6132 fix(deepseek): map minimal reasoning effort to low](https://github.com/HKUDS/nanobot/pull/6132)  
- 状态：Issue Open，PR Open  
- 问题：`reasoning_effort="minimal"` 同时伴随禁用 thinking 的控制字段，可能导致 DeepSeek 行为不符合预期或请求语义不一致。  
- 影响：使用 DeepSeek thinking mode 的用户可能获得错误推理配置。  
- 当前进展：已有修复 PR，将 minimal 语义归一到 low effort。

### P2：Telegram 远程媒体 URL 带 query 时被误判  
- Issue：[#6123](https://github.com/HKUDS/nanobot/issues/6123)  
- PR：[#6124](https://github.com/HKUDS/nanobot/pull/6124)  
- 状态：Issue Open，PR Open  
- 问题：媒体类型从完整 URL 推断，导致 `jpg?width=672` 被当作扩展名，图片被作为 document 发送。  
- 影响：图片展示体验下降，并影响后续 album grouping。  
- 当前进展：已有修复 PR，改为基于 URL path 判断扩展名。

### P2：Slack DM 中提及 bot 的消息被误丢弃  
- PR：[#6134 fix(slack): handle DM messages that mention the bot](https://github.com/HKUDS/nanobot/pull/6134)  
- 状态：Open  
- 问题：SlackChannel 为避免 channel mention 重复处理，在读取 `channel_type` 前丢弃包含 bot mention 的 message event，导致 DM 中提及 bot 的消息也被丢弃。  
- 影响：Slack 私聊场景下用户消息可能无响应。  
- 当前进展：已有修复 PR，待 review。

### P2：SVG 被作为图片 block 而非文本读取  
- PR：[#6135 fix(tools): read SVG files as text instead of image blocks](https://github.com/HKUDS/nanobot/pull/6135)  
- 状态：Open  
- 问题：`read_file` 根据 MIME 或扩展名将 SVG 当成 `image_url`，但 SVG 本质是文本 XML，很多场景需要源码内容。  
- 影响：Agent 处理图标、矢量文件、前端资源时可能无法读取实际文本内容。  
- 当前进展：已有修复 PR，待 review。

### P2：`~` 媒体附件路径未展开  
- PR：[#6133 fix(message): send the expanded path for ~ media attachments](https://github.com/HKUDS/nanobot/pull/6133)  
- 状态：Open  
- 问题：`MessageTool._resolve_media` 检查路径时展开了 `~`，但实际传给渠道的仍是原始字符串。  
- 影响：Telegram 等渠道读取本地附件时可能无法找到文件。  
- 当前进展：已有修复 PR。

### P2：Matrix 编辑消息丢失 HTML 格式  
- PR：[#6138 fix(matrix): keep HTML formatting in m.new_content for edits](https://github.com/HKUDS/nanobot/pull/6138)  
- 状态：Open  
- 问题：Matrix streamed reply 后续 `m.replace` 编辑中，`m.new_content` 未保留 `format` 和 `formatted_body`。  
- 影响：流式回复更新后 HTML 格式可能丢失，影响富文本展示。  
- 当前进展：已有修复 PR。

### P2：workspace 为 symlink 时 skills summary 构建异常  
- PR：[#6137 fix(agent): build the skills summary when the workspace path is a symlink](https://github.com/HKUDS/nanobot/pull/6137)  
- 状态：Open  
- 问题：plugin skill path 已 resolve，但 summary 使用未 resolve 的 workspace root 进行相对路径比较。  
- 影响：使用符号链接 workspace 的用户可能遇到技能摘要生成问题。  
- 当前进展：已有修复 PR。

### P2：Anthropic redacted_thinking blocks 未跨 tool turns 保留  
- PR：[#6136 fix(anthropic): keep redacted_thinking blocks across tool turns](https://github.com/HKUDS/nanobot/pull/6136)  
- 状态：Open  
- 问题：Claude extended thinking 中的 `redacted_thinking` block 未被正确保留。  
- 影响：使用 Anthropic extended thinking 和 tool use 的场景中，上下文可能不完整。  
- 当前进展：已有修复 PR。

---

## 5. 功能请求与路线图信号

### 1. Telegram 多媒体 album 发送能力  
- Issue：[#6121](https://github.com/HKUDS/nanobot/issues/6121)  
- PR：[#6125](https://github.com/HKUDS/nanobot/pull/6125)  
- 可能性：较高  
- 理由：已有实现 PR，且与实际用户体验直接相关。该功能支持将连续图片和视频分组为最多 10 项的 Telegram album，并在 Telegram 拒绝 album 时回退为逐项发送。  
- 路线图信号：NanoBot 正在从“能发送”走向“按渠道原生体验发送”。

### 2. Agent 目标和子任务的 completion review  
- PR：[#6118 feat(agent): add opt-in completion review for goals and child tasks](https://github.com/HKUDS/nanobot/pull/6118)  
- 状态：Open  
- 可能性：中高  
- 理由：该 PR 针对 sustained goal 和 child task 的完成判定增加可选 review，避免模型自行声称完成后立即被接受。  
- 路线图信号：项目正在强化 Agent 执行可靠性，尤其是有明确交付物的任务场景。

### 3. 当前 workspace 权限状态预报告  
- PR：[#6113 fix(agent): report current workspace access before tool use](https://github.com/HKUDS/nanobot/pull/6113)  
- 状态：Open  
- 可能性：中  
- 理由：该 PR 关注模型在调用工具前是否能准确理解当前 workspace 和访问限制。  
- 路线图信号：项目在提升 Agent 工具调用前的自我认知，减少错误文件操作和权限误判。

### 4. 多实例运行体验增强  
- PR：[#6126](https://github.com/HKUDS/nanobot/pull/6126)  
- PR：[#6128](https://github.com/HKUDS/nanobot/pull/6128)  
- 状态：已关闭  
- 可能性：已基本进入主线  
- 路线图信号：通过 `NANOBOT_HOME` 和 `--home`，NanoBot 正在形成更清晰的多实例部署模型。

---

## 6. 用户反馈摘要

今日 Issues 评论数均为 0，因此没有可提炼的多轮讨论反馈。但从 Issue 描述本身可归纳出以下真实痛点。

### 1. 渠道行为需要贴近用户所在平台的原生体验  
- 相关 Issue：[#6121 Telegram albums](https://github.com/HKUDS/nanobot/issues/6121)  
- 用户痛点：Agent 一次返回多张图时，Telegram 中分散显示为多条消息，阅读体验较差。  
- 使用场景：图片生成、多图检索、卡片展示、视觉内容批量返回。

### 2. 媒体 URL 兼容性必须覆盖真实互联网链接形态  
- 相关 Issue：[#6123 Telegram media URLs with query strings](https://github.com/HKUDS/nanobot/issues/6123)  
- 用户痛点：CDN 或图片服务常使用 query 参数控制尺寸、格式或缓存，当前实现误判类型，导致图片被当作文件发送。  
- 使用场景：远程图片转发、卡片图展示、图像搜索结果发送。

### 3. Provider 参数语义需要与上游模型文档一致  
- 相关 Issue：[#6122 DeepSeek reasoning_effort minimal](https://github.com/HKUDS/nanobot/issues/6122)  
- 用户痛点：用户按 DeepSeek 文档配置 reasoning effort，但 NanoBot 发送了矛盾控制字段。  
- 使用场景：使用 DeepSeek thinking mode、希望控制推理成本和推理深度的部署者。

### 4. 历史消息过滤是消息机器人稳定运行的基础能力  
- 相关 Issue：[#6120 WhatsApp replay filter](https://github.com/HKUDS/nanobot/issues/6120)  
- 用户痛点：Bot 启动后不应处理旧消息，否则可能造成重复回复或错误触发业务流程。  
- 使用场景：WhatsApp 长连接重启、Bot 热更新、消息队列恢复。

---

## 7. 待处理积压

基于当前提供的数据，仅能观察过去 24 小时活动，无法识别真正“长期未响应”的历史积压。以下是今日仍处于 Open 状态、建议维护者优先 review 的 PR / Issue。

### 高优先级待处理

#### 1. DeepSeek reasoning 参数修复  
- Issue：[#6122](https://github.com/HKUDS/nanobot/issues/6122)  
- PR：[#6132](https://github.com/HKUDS/nanobot/pull/6132)  
- 建议：优先 review。该问题影响 Provider 行为正确性，且修复范围相对明确。

#### 2. Telegram URL 媒体识别修复  
- Issue：[#6123](https://github.com/HKUDS/nanobot/issues/6123)  
- PR：[#6124](https://github.com/HKUDS/nanobot/pull/6124)  
- 建议：优先合并或与 album PR 联合测试，因为它直接影响图片是否能参与 media group。

#### 3. Telegram album 发送能力  
- Issue：[#6121](https://github.com/HKUDS/nanobot/issues/6121)  
- PR：[#6125](https://github.com/HKUDS/nanobot/pull/6125)  
- 建议：与 #6124 一并验证，重点关注远程 URL、本地文件、混合媒体、Telegram 拒绝 album 后的 fallback 行为。

#### 4. Slack DM mention 丢消息修复  
- PR：[#6134](https://github.com/HKUDS/nanobot/pull/6134)  
- 建议：优先 review。DM 消息被丢弃属于高用户可见度问题。

#### 5. Anthropic extended thinking 上下文保留  
- PR：[#6136](https://github.com/HKUDS/nanobot/pull/6136)  
- 建议：关注与 tool use 的兼容性测试，避免影响 Claude 推理链路。

### 中优先级待处理

- [#6133 fix(message): send the expanded path for ~ media attachments](https://github.com/HKUDS/nanobot/pull/6133)  
- [#6135 fix(tools): read SVG files as text instead of image blocks](https://github.com/HKUDS/nanobot/pull/6135)  
- [#6137 fix(agent): build the skills summary when the workspace path is a symlink](https://github.com/HKUDS/nanobot/pull/6137)  
- [#6138 fix(matrix): keep HTML formatting in m.new_content for edits](https://github.com/HKUDS/nanobot/pull/6138)  
- [#6118 feat(agent): add opt-in completion review for goals and child tasks](https://github.com/HKUDS/nanobot/pull/6118)  
- [#6113 fix(agent): report current workspace access before tool use](https://github.com/HKUDS/nanobot/pull/6113)

---

## 总体健康度评估

NanoBot 今日表现为“高活跃、快速响应、待审压力上升”。项目在渠道适配、Provider 兼容、多实例运行、Agent 可靠性和文档维护方面均有实质推进。  
值得肯定的是，多个新报 Bug 都在同日出现对应 PR，说明维护链路高效。需要注意的是，Open PR 数量达到 13 条，且其中多项直接影响用户消息收发和模型参数行为，建议维护者优先处理 Telegram、Slack、DeepSeek、Anthropic 相关修复，以降低下一版本的稳定性风险。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
日期：2026-10-10  
仓库：NousResearch/hermes-agent

---

## 1. 今日速览

过去 24 小时 Hermes Agent 维持了**极高活跃度**：Issues 更新 50 条，其中 47 条仍处于新开或活跃状态；PR 更新 50 条，其中 44 条仍待合并。今日没有新版本发布，但社区围绕 **Gateway 消息投递、Desktop/TUI 会话状态、Computer Use、安装/更新兼容性、插件目录** 等方向集中提交了大量问题与修复。  
整体来看，项目处于快速迭代期：Bug 报告密集、修复 PR 跟进速度较快，但待合并队列明显膨胀，稳定性风险主要集中在多平台网关、会话恢复、浏览器/桌面运行时和自动化发布链路。项目健康度可评估为：**社区活跃度高，修复响应积极，但回归与兼容性压力偏大，需要维护者优先消化高风险 PR 队列。**

---

## 2. 版本发布

今日无新版本发布。  
最新 Releases：无。

---

## 3. 项目进展

> 注：今日数据中显示有 6 个 PR 已合并或关闭，但给出的 PR 明细列表主要为评论数靠前的开放 PR，因此以下重点基于今日新增/活跃的高价值待合并 PR，以及已关闭 Issue 的处理信号进行分析。

### 3.1 会话状态与 TUI/Desktop 稳定性修复推进

- [PR #135974 - fix(tui_gateway): report descriptor-only terminal failures instead of empty complete turns](https://github.com/NousResearch/hermes-agent/pull/135974)  
  关联 [Issue #135958](https://github.com/NousResearch/hermes-agent/issues/135958)。  
  该 PR 修复 Desktop/TUI 将“重启耗尽但无 assistant 回复”的失败回合误判为 `complete` 的问题。此类问题会导致用户看到空回复，同时系统状态被清空，属于明显的会话可靠性问题。

- [PR #135970 - fix(tui_gateway): keep the prompt a model-switch marker absorbed when the next switch strips it](https://github.com/NousResearch/hermes-agent/pull/135970)  
  修复模型切换后用户 turn 被内存历史重建过程吞掉的问题。该问题影响多模型使用场景，尤其是用户在切换模型后继续同一会话时的上下文完整性。

- [PR #135953 - fix(cli): a resumed session's model follows the profile config, not a stale cached pin](https://github.com/NousResearch/hermes-agent/pull/135953)  
  修复恢复会话时错误使用旧的 `sessions.model` 缓存值，而不是当前 profile 配置默认模型的问题。该修复有助于降低升级或切换默认模型后的“配置不生效”困惑。

### 3.2 Gateway 与消息投递链路修复推进

- [PR #135959 - fix(gateway): typing in All to start a new Telegram topic no longer hijacks the running topic](https://github.com/NousResearch/hermes-agent/pull/135959)  
  直接修复 [Issue #135965](https://github.com/NousResearch/hermes-agent/issues/135965)。  
  该问题会导致 Telegram DM topic 模式下，新话题消息被错误投递到正在运行的话题中，是典型的会话路由错误，可能造成上下文污染。

- [PR #135952 - fix(cron): validate explicit deliver targets when a cronjob is created or updated](https://github.com/NousResearch/hermes-agent/pull/135952)  
  直接响应 [Issue #135942](https://github.com/NousResearch/hermes-agent/issues/135942)。  
  将 cronjob 的投递目标校验前移到创建/更新阶段，避免错误目标直到 fire time 才失败，能显著改善自动化任务的可预期性。

- [PR #135971 - feat(cron): cron.wrap_footer and cron.wrap_style options for the delivery wrapper](https://github.com/NousResearch/hermes-agent/pull/135971)  
  为 Cron delivery wrapper 增加页脚与样式控制选项，反映出运营者希望在聊天平台中更精细控制自动消息格式的需求。

### 3.3 Skills、插件与目录生态持续扩展

- [PR #135961 - fix(skills): render skill paths where the terminal backend sees them](https://github.com/NousResearch/hermes-agent/pull/135961)  
  修复 `skill_view` 与 `${HERMES_SKILL_DIR}` 在 Docker、SSH、Modal、Daytona、Vercel 等后端中渲染为宿主机路径的问题。该问题影响多后端执行一致性，是 skills 系统在容器化/远程执行场景下的重要修复。

- [PR #135967 - fix(tui-gateway): import _skill_scaffold_projection and describe_skill_invocation for skill dispatch](https://github.com/NousResearch/hermes-agent/pull/135967)  
  修复 `_dispatch_skill` 中缺失 import 导致的静默 `NameError` 回归。属于近期代码变更引入的功能回归。

- [PR #135966 - plugin-catalog: land salesforce-chatter, liquid-inference-provider and the deepgram-voice re-pin](https://github.com/NousResearch/hermes-agent/pull/135966)  
  合并多个社区插件目录条目，显示插件生态仍在快速扩张。

- [PR #135962 - feat(catalog): add Deferred Questions plugin](https://github.com/NousResearch/hermes-agent/pull/135962)  
- [PR #135957 - catalog: add desktop-clarify-telegram 1.6.1](https://github.com/NousResearch/hermes-agent/pull/135957)  
- [PR #135956 - catalog: add session-complete-telegram 1.6.1](https://github.com/NousResearch/hermes-agent/pull/135956)  
- [PR #135955 - catalog: add Jet Browser runtime verifier](https://github.com/NousResearch/hermes-agent/pull/135955)  

  这些 PR 表明社区插件目录成为今日重要增长点，尤其集中在 Telegram、浏览器运行时验证、问题延迟处理等自动化/伴侣式 agent 场景。

### 3.4 安装、更新与配置体验继续改善

- [PR #135949 - feat(desktop): Settings › About lets source installs choose stable releases or every commit](https://github.com/NousResearch/hermes-agent/pull/135949)  
  Desktop 设置页新增 Update channel 选择能力，使源码安装用户可在稳定版本和每次提交之间切换。该功能是对更新体验的重要补齐。

- [PR #135948 - feat(config): context-scoped read overlay for load_config_readonly()](https://github.com/NousResearch/hermes-agent/pull/135948)  
  引入只读配置的上下文级覆盖层，为嵌入式运行时、每轮动态模型/提供商选择提供更干净的配置读取机制。

- [PR #135964 - test(cli): cover persisted auth restoration after fallback picker failure](https://github.com/NousResearch/hermes-agent/pull/135964)  
  增强 fallback picker 异常后的配置与认证恢复测试，说明维护者正在关注配置回滚一致性。

---

## 4. 社区热点

### 4.1 Computer Use 与 cua-driver 兼容性成为高热问题

- [Issue #135872 - computer_use element clicks refused on cua-driver 0.34](https://github.com/NousResearch/hermes-agent/issues/135872)  
  评论数：2  
  标签：`type/bug`, `comp/tools`, `P2`  
  用户报告 `computer_use` 在 cua-driver 0.34.1 上点击元素失败，错误为 `unknown argument element_index`。这表明 Hermes 的 Computer Use 工具与底层驱动 API 出现参数兼容性断层。  
  **背后诉求**：用户需要 Computer Use 在桌面环境中稳定执行点击、滚动、定位等基础动作，尤其是在 Linux GNOME Wayland 环境下。

- [Issue #135835 - computer_use on GNOME/Mutter Wayland: shell surfaces unclickable; scroll drops x/y and switches workspaces](https://github.com/NousResearch/hermes-agent/issues/135835)  
  评论数：1  
  标签：`type/bug`, `comp/tools`, `P2`  
  GNOME/Mutter Wayland 下 shell surface 不可点击，滚动还可能落到 shell 并切换工作区。  
  **背后诉求**：用户希望 Hermes 的本地 GUI 自动化能力不只在浏览器/理想窗口场景下可用，也能适配真实 Linux 桌面环境。

- [Issue #135836 - computer_use capture(som): estimated scale hint uses full page extent](https://github.com/NousResearch/hermes-agent/issues/135836)  
  评论数：1  
  标签：`type/bug`, `comp/tools`, `P2`, `duplicate`  
  反映视觉/坐标映射提示不准确，可能导致模型基于错误比例执行操作。  
  **背后诉求**：用户希望视觉工具提供准确坐标转换，减少 agent “看得见但点不准”的问题。

### 4.2 Gateway 远程部署与手机伴侣场景活跃

- [Issue #135867 - Field report + 5 proven patterns for phone→Tailscale→gateway companions](https://github.com/NousResearch/hermes-agent/issues/135867)  
  评论数：2  
  标签：`type/feature`, `comp/gateway`, `platform/windows`, `area/local-models`, `needs-decision`  
  用户分享 Android 手机 → Tailscale → Windows 11 Hermes gateway → Termux llama.cpp 节点的生产部署经验，提出 Windows 启动竞态、tailnet 防火墙、wrapper 迁移、HTTP chat、Termux 工作节点等模式。  
  **背后诉求**：Hermes 正被用于“个人 AI 伴侣 + 多设备远程访问 + 本地模型节点”的真实部署，用户希望项目官方化这些经验，降低复杂拓扑部署门槛。

- [Issue #135937 - Remote-first recovery: supported agent maintenance handoff without host Terminal access](https://github.com/NousResearch/hermes-agent/issues/135937)  
  评论数：1  
  标签：`type/feature`, `comp/gateway`, `tool/terminal`, `P3`  
  用户希望在远程旅行期间，通过 Telegram 让另一个 agent 恢复故障 agent，而不是必须物理接触主机或打开 Terminal。  
  **背后诉求**：远程维护、agent 间运维交接、故障自恢复能力正在成为高阶用户核心需求。

### 4.3 安装/更新与运行环境兼容性引发关注

- [Issue #135827 - agent/context_engine.py crashes on Python 3.11-3.13](https://github.com/NousResearch/hermes-agent/issues/135827)  
  状态：已关闭  
  评论数：2  
  标签：`type/bug`, `comp/agent`, `P0`, `area/install-update`, `area/compression`  
  Python 3.11-3.13 下因缺少 `from __future__ import annotations` 导致崩溃。  
  **背后诉求**：用户希望主干在现代 Python 版本下保持基本可运行性。该问题被标为 P0，说明影响面较大。

- [Issue #135973 - systemd unit refresh can write a cross-profile mixed unit](https://github.com/NousResearch/hermes-agent/issues/135973)  
  状态：已关闭，duplicate  
  评论数：1  
  标签：`comp/cli`, `comp/gateway`, `P2`, `area/profiles`  
  多实例部署下 systemd unit 可能出现 profile 混写问题，但该 Issue 被关闭为重复，指向历史问题 [#93349](https://github.com/NousResearch/hermes-agent/issues/93349)。  
  **背后诉求**：多 profile / 多 gateway 部署需要更强隔离性和可审计性。

---

## 5. Bug 与稳定性

### P0 / 阻塞级

1. [Issue #135827 - agent/context_engine.py crashes on Python 3.11-3.13](https://github.com/NousResearch/hermes-agent/issues/135827)  
   状态：已关闭  
   严重性：P0  
   影响：Agent 核心上下文引擎在 Python 3.11-3.13 下崩溃。  
   是否已有 fix PR：数据中未给出对应 PR，但 Issue 已关闭，说明可能已修复或处理。  
   风险判断：高。此类启动/导入级崩溃会直接影响安装和升级后的可用性。

### P2 / 高优先级稳定性问题

2. [Issue #135965 - Telegram DM topic mode: typing in All hijacks actively running topic](https://github.com/NousResearch/hermes-agent/issues/135965)  
   状态：Open  
   影响：Telegram DM topic 模式下，新话题消息错误进入正在运行的话题，造成会话串线。  
   Fix PR：[PR #135959](https://github.com/NousResearch/hermes-agent/pull/135959)  
   风险判断：高。涉及消息投递与会话隔离，可能导致用户意图被错误执行。

3. [Issue #135958 - Desktop reports empty restart-exhausted turns as complete](https://github.com/NousResearch/hermes-agent/issues/135958)  
   状态：Open  
   影响：Desktop/TUI 将失败回合误判为完成，且清除失败状态。  
   Fix PR：[PR #135974](https://github.com/NousResearch/hermes-agent/pull/135974)  
   风险判断：高。用户会看到“无回复但系统认为完成”，影响可靠性与问题诊断。

4. [Issue #135942 - cronjob create/update doesn't validate platform delivery targets](https://github.com/NousResearch/hermes-agent/issues/135942)  
   状态：Open  
   影响：cronjob 创建/更新时不校验投递目标，直到触发时才失败。  
   Fix PR：[PR #135952](https://github.com/NousResearch/hermes-agent/pull/135952)  
   风险判断：高。自动化任务失败具有延迟性，容易导致用户错过关键通知。

5. [Issue #135921 - Weixin/iLink silently discards outbound messages when peer reply window expires](https://github.com/NousResearch/hermes-agent/issues/135921)  
   状态：Open  
   影响：Weixin/iLink 在会话窗口过期时静默丢弃出站消息，无重试、无队列、无错误暴露。  
   Fix PR：未在今日 PR 列表中看到直接对应修复。  
   风险判断：高。消息静默丢失是 Gateway 类系统最严重的用户信任问题之一。

6. [Issue #135905 - Approval buttons resolve the oldest pending approval, not the one clicked](https://github.com/NousResearch/hermes-agent/issues/135905)  
   状态：Open，duplicate  
   影响：多个平台上的 approval button 可能批准错误的待处理请求。  
   Fix PR：未在今日 PR 列表中看到直接对应修复。  
   风险判断：高。涉及安全边界与用户授权准确性，建议维护者优先确认重复 Issue 的主线修复状态。

7. [Issue #135954 - main / main-desktop Docker Hub tags frozen since Oct 6](https://github.com/NousResearch/hermes-agent/issues/135954)  
   状态：Open  
   影响：Docker Hub `main` 和 `main-desktop` 标签自 10 月 6 日起冻结，push 到 main 的 Docker workflow 在 job 开始前被取消。  
   Fix PR：未见对应 PR。  
   风险判断：高。影响用户获取最新镜像，也会削弱 CI/CD 信任。

8. [Issue #135932 - hermes update downgrades Bot Desktop browser to PM-pinned Chromium 145](https://github.com/NousResearch/hermes-agent/issues/135932)  
   状态：Open  
   影响：更新后 Bot Desktop 浏览器被降级，已有 persistent profiles 崩溃，表现为 `CDP response channel closed`。  
   Fix PR：未见对应 PR。  
   风险判断：高。涉及更新路径破坏用户现有浏览器 profile。

9. [Issue #135910 - pm repair cannot commit dependency environment on case-insensitive filesystem](https://github.com/NousResearch/hermes-agent/issues/135910)  
   状态：Open  
   影响：在 macOS/APFS 默认大小写不敏感卷挂载到 Docker 的情况下，PM repair 无法提交依赖环境。  
   Fix PR：未见对应 PR。  
   风险判断：高。影响 Docker Desktop + macOS 常见开发环境。

10. [Issue #135872 - computer_use element clicks refused on cua-driver 0.34](https://github.com/NousResearch/hermes-agent/issues/135872)  
    状态：Open  
    影响：Computer Use 元素点击失败。  
    Fix PR：未见对应 PR。  
    风险判断：中高。影响桌面自动化核心能力。

11. [Issue #135853 - Streaming TTS path drops speed setting](https://github.com/NousResearch/hermes-agent/issues/135853)  
    状态：Open  
    影响：Desktop voice mode 的 streaming TTS 未传递 speed 设置，影响 xAI / OpenAI / ElevenLabs 等提供商。  
    Fix PR：未见对应 PR。  
    风险判断：中。影响语音体验一致性。

12. [Issue #135928 - hermes doctor npm audit row audits root workspace, not agent-browser](https://github.com/NousResearch/hermes-agent/issues/135928)  
    状态：Open  
    影响：`hermes doctor` 将 root workspace 的 Electron/devtool 漏洞误报为 agent-browser 漏洞。  
    Fix PR：未见对应 PR。  
    风险判断：中。影响诊断可信度。

13. [Issue #135904 - browser use_real_profile path never applies auto --no-sandbox workaround](https://github.com/NousResearch/hermes-agent/issues/135904)  
    状态：Open  
    影响：AppArmor 限制 user namespace 的主机上，真实 profile 浏览器路径不会应用自动 `--no-sandbox` workaround。  
    Fix PR：未见对应 PR。  
    风险判断：中高。影响 Ubuntu 24.04 默认安全配置下的浏览器启动。

14. [Issue #135936 - Console flash still reproduces on native Windows desktop](https://github.com/NousResearch/hermes-agent/issues/135936)  
    状态：Open  
    影响：Windows Desktop 仍出现控制台闪烁与焦点抢占。  
    Fix PR：未见对应 PR。  
    风险判断：中。影响 Windows 桌面用户体验。

15. [Issue #135968 - Desktop composer placeholder stays English on translated UI](https://github.com/NousResearch/hermes-agent/issues/135968)  
    状态：Open  
    影响：Desktop 启动时输入框 placeholder 从 fallback catalogue 取值，导致西语 UI 下仍显示英文。  
    Fix PR：未见对应 PR。  
    风险判断：低中。影响 i18n 完整性。

---

## 6. 功能请求与路线图信号

### 6.1 远程优先、伴侣式 Agent 部署

- [Issue #135867 - Phone → Tailscale → Gateway companions field report](https://github.com/NousResearch/hermes-agent/issues/135867)  
  该 Issue 不只是功能请求，更像一份生产实践报告。用户希望 Hermes 官方支持：
  - Windows 启动竞态处理；
  - tailnet-scoped firewall；
  - wrapper 迁移；
  - bridge-less HTTP chat；
  - Termux 作为轻量工作节点。  
  **路线图信号**：Hermes 正被用于跨设备、私有网络、移动端 companion 场景，Gateway 和本地模型编排能力可能成为下一阶段重点。

- [Issue #135937 - Remote-first recovery](https://github.com/NousResearch/hermes-agent/issues/135937)  
  用户希望 agent 可在无主机 Terminal 访问时由其他 agent 协助恢复。  
  **可能方向**：受控远程维护、agent-to-agent 运维 handoff、安全的远程终端代理。

### 6.2 Desktop 体验增强

- [Issue #135951 - Desktop: filter archived sessions by workspace and search](https://github.com/NousResearch/hermes-agent/issues/135951)  
  诉求：Archived sessions 列表需要按 workspace/project 过滤并支持搜索。  
  **路线图信号**：随着用户长期使用，Desktop 的会话管理从“能保存”进入“能检索、能归档、能治理”的阶段。

- [Issue #135931 - Desktop: one-click AI prompt enhancement](https://github.com/NousResearch/hermes-agent/issues/135931)  
  诉求：在发送前一键优化草稿 prompt。  
  **路线图信号**：Desktop 输入框正在从简单文本框向“AI 辅助写作入口”演进。

- [Issue #135920 - Explicit remote-only Desktop mode](https://github.com/NousResearch/hermes-agent/issues/135920)  
  诉求：Desktop 连接远程 Hermes backend 时，不应准备、附着或启动本地 runtime。  
  **路线图信号**：远程 backend 与本地 runtime 权限边界需要更明确，尤其适合企业/多设备部署。

- [PR #135949 - Desktop update channel selector](https://github.com/NousResearch/hermes-agent/pull/135949)  
  已有实现 PR，可能较快进入下一版本。  
  **判断**：该功能成熟度较高，有望近期合并。

### 6.3 自动化与消息投递增强

- [Issue #135943 - Turns refused during hermes pause are not recorded](https://github.com/NousResearch/hermes-agent/issues/135943)  
  诉求：`hermes pause` 期间被拒绝的 gateway turn 应记录 sender 与内容，以便 resume 后回放。  
  **路线图信号**：用户希望暂停机制不是“丢弃式急停”，而是“可恢复的安全队列”。

- [PR #135971 - cron.wrap_footer and cron.wrap_style options](https://github.com/NousResearch/hermes-agent/pull/135971)  
  诉求：Cron 投递格式更可控。  
  **判断**：已有 PR，短期纳入可能性较高。

- [PR #135952 - validate cron deliver targets](https://github.com/NousResearch/hermes-agent/pull/135952)  
  诉求：提高 cronjob 配置期校验能力。  
  **判断**：Bug 修复性质明确，合并优先级应较高。

### 6.4 认证、浏览器与自动 OTP

- [Issue #135946 - Automatically retrieve and enter email verification codes](https://github.com/NousResearch/hermes-agent/issues/135946)  
  诉求：自动从邮箱获取 OTP/2FA code 并填入网站。  
  **路线图信号**：Hermes 的浏览器自动化正在进入真实 Web 工作流，其中认证流程是主要阻塞点。  
  **风险提示**：该能力涉及邮箱访问权限、2FA 安全边界与审计，需要谨慎设计。

### 6.5 多模型运行时配置

- [Issue #135916 - Change auxiliary models at runtime like /model does for main model](https://github.com/NousResearch/hermes-agent/issues/135916)  
  诉求：在 TUI 中运行时切换 vision、compression、delegation 等辅助模型。  
  相关基础设施：[PR #135948](https://github.com/NousResearch/hermes-agent/pull/135948) 引入 context-scoped read overlay。  
  **判断**：配置动态覆盖能力的推进，可能为该功能提供底层支持。

### 6.6 插件目录继续扩张

今日多个插件目录 PR 表明社区希望 Hermes 成为可扩展的个人 AI 自动化平台：

- [PR #135966](https://github.com/NousResearch/hermes-agent/pull/135966) - Salesforce Chatter、Liquid inference provider、Deepgram voice re-pin  
- [PR #135962](https://github.com/NousResearch/hermes-agent/pull/135962) - Deferred Questions plugin  
- [PR #135957](https://github.com/NousResearch/hermes-agent/pull/135957) - desktop-clarify-telegram  
- [PR #135956](https://github.com/NousResearch/hermes-agent/pull/135956) - session-complete-telegram  
- [PR #135955](https://github.com/NousResearch/hermes-agent/pull/135955) - Jet Browser runtime verifier  

**路线图信号**：插件 catalog 正成为项目增长入口，但也需要更强审核、权限说明、隐私声明和兼容性测试。

---

## 7. 用户反馈摘要

### 7.1 用户正在将 Hermes 用于真实、复杂的多设备部署

[Issue #135867](https://github.com/NousResearch/hermes-agent/issues/135867) 显示，用户已经把 Hermes 部署到 Android 手机、Tailscale、Windows 11 gateway、Termux tablet、llama.cpp 节点等组合中。这说明 Hermes 的定位已经超出单机 CLI/桌面助手，开始成为个人 AI 基础设施的一部分。  
用户满意点：Hermes 能作为跨设备 companion 的核心。  
用户不满点：许多部署模式仍需用户自行摸索和补丁化。

### 7.2 消息不丢失、会话不串线是 Gateway 用户最核心的信任基础

多个 Issue 指向同一类痛点：

- Telegram topic 串线：[Issue #135965](https://github.com/NousResearch/hermes-agent/issues/135965)  
- Weixin/iLink 静默丢消息：[Issue #135921](https://github.com/NousResearch/hermes-agent/issues/135921)  
- Approval button 解析错误：[Issue #135905](https://github.com/NousResearch/hermes-agent/issues/135905)  
- Pause 期间消息不可回放：[Issue #135943](https://github.com/NousResearch/hermes-agent/issues/135943)  

真实诉求：用户可以接受失败提示，但不能接受静默丢失、错误投递或错误授权。Gateway 的可观测性、队列、重试、审计应成为重点。

### 7.3 Desktop 用户开始关注长期使用体验

用户反馈不再只集中在“能否运行”，而是更多涉及：

- archived sessions 太多后无法搜索：[Issue #135951](https://github.com/NousResearch/hermes-agent/issues/135951)  
- 输入 prompt 前希望 AI 辅助优化：[Issue #135931](https://github.com/NousResearch/hermes-agent/issues/135931)  
- remote-only 模式避免本地 runtime 被意外启动：[Issue #135920](https://github.com/NousResearch/hermes-agent/issues/135920)  
- i18n placeholder 启动时错误：[Issue #135968](https://github.com/NousResearch/hermes-agent/issues/135968)  

这表明 Desktop 已进入“日常使用软件”的体验打磨阶段。

### 7.4 安装/更新链路仍是主要不满意来源

用户在以下场景遇到问题：

- Python 3.11-3.13 崩溃：[Issue #135827](https://github.com/NousResearch/hermes-agent/issues/135827)  
- Docker Hub main 标签冻结：[Issue #135954](https://github.com/NousResearch/hermes-agent/issues/135954)  
- 更新后 Chromium 降级导致 profile 崩溃：[Issue #135932](https://github.com/NousResearch/hermes-agent/issues/135932)  
- macOS Docker bind mount 大小写不敏感文件系统导致 PM repair 失败：[Issue #135910](https://github.com/NousResearch/hermes-agent/issues/135910)  
- Windows Desktop 控制台闪烁与焦点抢占：[Issue #135936](https://github.com/NousResearch/hermes-agent/issues/135936)  

用户真实痛点：Hermes 需要覆盖大量平台和安装方式，但更新路径、运行时选择、文件系统差异仍容易引发回归。

---

## 8. 待处理积压

> 由于本次数据仅覆盖过去 24 小时，无法严格判断“长期未响应”。以下列出今日暴露但可能具有长期积压特征、或已引用历史问题/重复问题且需要维护者关注的事项。

### 8.1 历史重复但仍影响多实例部署的问题

- [Issue #135973 - systemd unit refresh cross-profile mixed unit](https://github.com/NousResearch/hermes-agent/issues/135973)  
  状态：Closed，duplicate  
  指向历史问题：[Issue #93349](https://github.com/NousResearch/hermes-agent/issues/93349)  
  建议：维护者应确认 #93349 是否已有明确修复计划。多 profile / 多 gateway 用户如果继续重复上报，说明该问题仍具有现实影响。

### 8.2 Docker 发布链路冻结

- [Issue #135954 - Docker Hub main / main-desktop tags frozen since Oct 6](https://github.com/NousResearch/hermes-agent/issues/135954)  
  状态：Open  
  建议：优先排查 GitHub Actions 并恢复 main 镜像发布。该问题会影响用户验证主干修复，也会造成“代码已修但镜像不可用”的错位。

### 8.3 安全边界相关审批问题

- [Issue #135905 - Approval buttons resolve oldest pending approval](https://github.com/NousResearch/hermes-agent/issues/135905)  
  状态：Open，duplicate  
  建议：即使为重复 Issue，也应在主问题中明确修复状态。审批错配属于高风险安全边界问题，不应长期悬置。

### 8.4 Gateway 消息可靠性问题

- [Issue #135921 - Weixin/iLink silently discards outbound messages](https://github.com/NousResearch/hermes-agent/issues/135921)  
  状态：Open  
  建议：需要补齐错误暴露、重试或队列机制。静默丢消息会显著影响用户信任。

- [Issue #135943 - Turns refused during hermes pause are not recorded](https://github.com/NousResearch/hermes-agent/issues/135943)  
  状态：Open  
  建议：将 paused turn 记录为可审计事件，并提供 resume 后人工或自动 replay 机制。

### 8.5 Computer Use / Wayland 兼容性

- [Issue #135872 - cua-driver 0.34 element_index incompatibility](https://github.com/NousResearch/hermes-agent/issues/135872)  
- [Issue #135835 - GNOME/Mutter Wayland shell surfaces unclickable](https://github.com/NousResearch/hermes-agent/issues/135835)  
- [Issue #135836 - capture(som) estimated scale hint incorrect](https://github.com/NousResearch/hermes-agent/issues/135836)  

建议：维护者可考虑建立 Computer Use 兼容性矩阵，覆盖 cua-driver 版本、桌面环境、Wayland/X11、浏览器辅助功能配置等变量。

### 8.6 待合并 PR 队列过大

今日 PR 更新 50 条，其中 44 条仍待合并。建议维护者优先处理以下类别：

1. 会话/消息投递修复  
   - [PR #135959](https://github.com/NousResearch/hermes-agent/pull/135959)  
   - [PR #135974](https://github.com/NousResearch/hermes-agent/pull/135974)  
   - [PR #135952](https://github.com/NousResearch/hermes-agent/pull/135952)  
   - [PR #135953](https://github.com/NousResearch/hermes-agent/pull/135953)  

2. Skills 回归与多后端路径修复  
   - [PR #135967](https://github.com/NousResearch/hermes-agent/pull/135967)  
   - [PR #135961](https://github.com/NousResearch/hermes-agent/pull/135961)  

3. 更新/配置基础设施  
   - [PR #135949](https://github.com/NousResearch/hermes-agent/pull/135949)  
   - [PR #135948](https://github.com/NousResearch/hermes-agent/pull/135948)  
   - [PR #135964](https://github.com/NousResearch/hermes-agent/pull/135964)  

---

## 总体健康度判断

Hermes Agent 今日表现出**非常强的社区参与度和问题暴露能力**：大量用户正在真实场景中部署，包括远程 companion、Telegram/Slack/Weixin 网关、Docker/macOS/Windows 多平台、Desktop 长期会话管理等。积极面是多个关键问题已经有对应修复 PR，说明维护响应链路仍然活跃；风险面是开放 PR 与高优先级 Bug 同时快速堆积，尤其是消息投递、会话状态、安装更新、Docker 发布链路等区域需要集中治理。  
建议下一阶段维护重点放在：**Gateway 消息可靠性、会话状态一致性、发布/更新链路恢复、Computer Use 兼容性矩阵、插件目录审核标准化**。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报  
**日期：2026-10-10**  
**仓库：** https://github.com/sipeed/picoclaw

---

## 1. 今日速览

过去 24 小时内，PicoClaw 项目新增/活跃 Issue 1 条，Pull Request 更新 0 条，未发布新版本。整体活跃度偏低，社区动态主要集中在 Android 构建环境下的网络稳定性问题。今日唯一新增问题指向一个较关键的运行时缺陷：官方 Android 构建中，由于 pure-Go / `CGO_ENABLED=0` DNS 解析失败，导致 gateway 无法访问外部 API。该问题目前尚无评论、无关联修复 PR，建议维护者优先确认影响范围。

---

## 3. 项目进展

过去 24 小时内未观察到新的 PR 合并、关闭或待合并记录。

- **今日合并 PR：** 0  
- **今日关闭 PR：** 0  
- **待合并 PR：** 0  

从数据看，今日代码层面暂无可见推进。项目进展主要体现为社区报告了一个 Android 端网络连通性问题，为后续稳定性修复提供了明确线索。

---

## 4. 社区热点

### #3420 Android build: pure-Go binaries fail DNS resolution  
链接：https://github.com/sipeed/picoclaw/issues/3420  
状态：OPEN  
作者：sstreichan  
评论数：0  
反应数：0  
创建时间：2026-10-09  
更新时间：2026-10-09  

该 Issue 是今日唯一活跃社区事件。用户反馈官方 Android 构建中的 gateway 无法访问外部 API endpoint，例如 `/models` 拉取失败，错误信息显示 DNS 解析请求被发送到 `127.0.0.1:53`，但本地没有 DNS 服务监听，导致 `connect: connection refused`。

背后的核心诉求是：  
- Android 官方构建应能正常解析域名并访问外部 API；  
- pure-Go 构建模式下的 DNS resolver 行为需要适配 Android 网络环境；  
- gateway 与 launcher 的官方 Android 打包链路需要更可靠的网络可用性验证。

虽然该 Issue 暂无评论和反应，但它直接影响 Android 用户的基础可用性，实际优先级应高于普通功能请求。

---

## 5. Bug 与稳定性

### 高优先级：Android 官方构建 DNS 解析失败，gateway 无法访问 API  
链接：https://github.com/sipeed/picoclaw/issues/3420  
状态：OPEN  
是否已有 fix PR：未发现  
严重程度：高  

**问题描述：**  
官方 Android 构建中，`libpicoclaw-web.so` launcher 和 `libpicoclaw.so` gateway 使用 pure-Go / `CGO_ENABLED=0` 构建后，DNS 解析失败。错误表现为：

```text
dial udp 127.0.0.1:53: connect: connection refused
```

该错误会导致 gateway 无法访问任何外部 API endpoint，例如 `/models` 获取失败。

**影响分析：**  
- 影响 Android 平台用户的联网能力；  
- 可能导致模型列表、远程 API 调用、服务发现等依赖外部网络的能力不可用；  
- 如果官方 Android 包默认采用该构建方式，则问题可能影响面较广；  
- 属于启动后基础网络能力失效，不是边缘场景缺陷。

**可能原因方向：**  
根据 Issue 描述，问题很可能与 Go 在 `CGO_ENABLED=0` 下使用 pure-Go DNS resolver 有关。该 resolver 在 Android 环境下可能无法正确读取系统 DNS 配置，错误地尝试访问 `127.0.0.1:53`。

**建议维护者关注：**  
- 检查 Android 构建是否应启用 cgo 或切换 DNS 解析策略；  
- 验证 Android 设备/模拟器上的 `/etc/resolv.conf`、netd、系统 DNS 行为；  
- 在 CI 或发布前测试中加入 Android 网络连通性和域名解析用例；  
- 明确官方 Android 构建推荐配置，例如是否支持 `CGO_ENABLED=0`。

---

## 6. 功能请求与路线图信号

过去 24 小时内未发现新的功能请求类 Issue，也没有相关 PR 暗示新功能即将进入下一版本。

不过，#3420 暴露出一个潜在路线图信号：  
- PicoClaw 若要继续强化 Android 端部署能力，需要将 Android 构建、联网、DNS、API endpoint 访问纳入稳定性路线图；  
- 对于 AI 助手/智能体类项目而言，移动端 gateway 的可用性可能是后续生态扩展的重要基础；  
- 如果 Android 是官方支持平台，建议将该问题列为下一个维护版本的阻断级修复项。

相关 Issue：  
- https://github.com/sipeed/picoclaw/issues/3420

---

## 7. 用户反馈摘要

今日用户反馈主要集中在 Android 官方构建的实际使用失败场景。

### 真实痛点

- 用户在 Android 环境中运行官方构建后，gateway 无法访问外部 API；
- `/models` 等基础接口请求失败，说明问题不是单一 API 异常，而是底层 DNS/网络解析失败；
- 错误信息指向 `127.0.0.1:53`，对普通用户来说难以自行修复；
- 当前没有官方 workaround、维护者回复或修复 PR，用户可能会被阻塞在首次运行阶段。

### 使用场景推断

从 Issue 描述看，用户正在尝试在 Android 上运行 PicoClaw 的 gateway 组件，并依赖它访问外部 API endpoint。这说明 PicoClaw 的 Android 分发包或嵌入式移动端运行模式已有实际使用需求。

### 满意/不满意信号

- **不满意点：** 官方 Android build 在基础联网能力上失败，影响核心功能可用性。  
- **正向信号：** 用户提供了明确错误日志和构建条件，有利于维护者快速定位问题。

相关 Issue：  
- https://github.com/sipeed/picoclaw/issues/3420

---

## 8. 待处理积压

基于本次提供的数据，过去 24 小时内未发现长期未响应的 Issue 或 PR 记录，也没有历史积压列表可供判断。因此本日报不对长期积压做额外推断。

但建议维护者优先关注今日新增的开放 Issue：

1. **#3420 Android build DNS resolution failure**  
   链接：https://github.com/sipeed/picoclaw/issues/3420  
   原因：影响 Android 官方构建的基础网络可用性，目前无评论、无修复 PR。  
   建议动作：尽快确认复现条件、标注平台/优先级，并给出临时 workaround 或修复计划。

---

## 项目健康度评估

- **社区活跃度：低**：过去 24 小时仅 1 条 Issue 更新，无 PR 动态。  
- **发布节奏：平稳/停滞**：今日无新版本发布。  
- **代码推进：低**：无合并 PR 或修复记录。  
- **稳定性风险：中到高**：虽然只有 1 个新 Bug，但其影响 Android 官方构建的核心联网能力，需优先处理。  
- **维护建议：** 尽快响应 #3420，并确认 Android 是否为正式支持平台；若是，应将 DNS/网络连通性测试纳入发布流程。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报  
**日期：2026-10-10**  
**仓库：** https://github.com/qwibitai/nanoclaw

---

## 1. 今日速览

过去 24 小时，NanoClaw 项目保持较高维护活跃度：共有 **1 条 Issue 更新**、**9 条 PR 更新**，并发布了 **1 个稳定版本 v2026.10.0**。  
今日工作重心明显集中在 **稳定发布、安装更新机制、安全/路径访问加固、CLI 参数与命令解析一致性、技能安装可靠性** 等基础能力上。  
PR 方面，9 条更新中已有 **8 条关闭/合并**，仅剩 **1 条依赖升级 PR 待处理**，说明维护团队响应速度较快，发布节奏健康。  
社区侧新增的主要诉求是 **支持 OneCLI 2.x gateway**，该需求与 Google Docs 编辑权限相关，可能成为后续版本的重要能力扩展点。

---

## 2. 版本发布

### v2026.10.0：首个稳定 CalVer 版本

**Release：** [v2026.10.0](https://github.com/qwibitai/nanoclaw/releases/tag/v2026.10.0)

NanoClaw 今日发布了 **v2026.10.0**，这是项目采用 **日历版本号 CalVer** 后的首个稳定版本，也是 `/update-nanoclaw` 默认安装的第一个发布版本。

#### 关键变化

1. **更新机制从追踪 `main` 改为追踪正式发布版本**
   - 过去 `/update-nanoclaw` 可能直接安装 `main` 分支最新代码。
   - 从 `v2026.10.0` 起，默认更新路径改为安装已发布的稳定版本。
   - 这显著降低了用户在日常更新中遇到未充分验证变更的风险。

2. **引入稳定发布通道**
   - 该版本此前已经通过 `2026.10.0-rc.1` 与 `2026.10.0-rc.2` 在 `beta` channel 上测试。
   - 表明项目正在建立更成熟的发布流程：先候选版本验证，再进入 stable。

3. **版本号体系切换为 CalVer**
   - 版本号从传统语义版本风格转向 `YYYY.MM.patch` 形式。
   - 对用户而言，版本发布日期与版本号之间的关联更直观。

#### 迁移与使用注意事项

- 对普通用户：  
  建议通过 `/update-nanoclaw` 更新到该版本，以获得稳定发布通道带来的安全性和可预测性。

- 对依赖自动化部署的用户：  
  如果此前脚本假设 `/update-nanoclaw` 总是安装 `main` 最新代码，需要调整预期。现在默认行为将跟随正式 release，而不是开发分支。

- 对插件/技能维护者：  
  建议在后续版本兼容性测试中以 `v2026.10.0` 作为新的稳定基线。

#### 破坏性变更

从现有数据看，未明确披露破坏性 API 或配置变更。  
但更新来源从 `main` 改为 release 是一个重要行为变化，可能影响依赖 nightly/main 行为的高级用户或自动化环境。

相关 PR：  
- [#4065 chore(release): v2026.10.0](https://github.com/qwibitai/nanoclaw/pull/4065)

---

## 3. 项目进展

今日项目推进主要集中在发布工程、宿主安全、CLI 一致性、技能安装健壮性和测试稳定性。

### 3.1 发布工程：完成 v2026.10.0 稳定发布

- PR：[#4065 chore(release): v2026.10.0](https://github.com/qwibitai/nanoclaw/pull/4065)  
- 状态：已关闭/合并  
- 类型：文档 / 发布维护

该 PR 将版本从 `2026.10.0-rc.2` 推进到正式的 `2026.10.0`，并刷新 changelog，将未发布内容整理进稳定版本说明。  
这标志着 NanoClaw 从候选版本阶段进入稳定发布阶段，是今日最重要的项目里程碑。

---

### 3.2 安全与文件系统访问：使用目录描述符固定访问范围

- PR：[#4063 fix(host): open session, skill and run-log directories by descriptor](https://github.com/qwibitai/nanoclaw/pull/4063)  
- 状态：已关闭/合并  
- 涉及区域：agent memory、configuration、containers、core、CLI、providers、scheduled tasks、security、sessions、skills

该 PR 引入 `src/anchored-dir.ts`，让 host 代码在访问 session、skill、run-log 等目录时，先打开目录并持续通过目录句柄进行读写、创建和删除操作。

#### 影响

- 提升路径访问安全性。
- 降低目录切换、符号链接、路径穿越等边界风险。
- 为多技能、多会话运行环境提供更可靠的文件访问基础。

这是一次底层架构级修复，覆盖面广，对长期稳定性和安全性有明显正向作用。

---

### 3.3 Slash command 解析统一

- PR：[#4062 fix(commands): parse slash commands once for the gate and the runner](https://github.com/qwibitai/nanoclaw/pull/4062)  
- 状态：已关闭/合并  
- 涉及区域：agent-runner、ncl-cli、repository maintenance

该 PR 让 host command gate 与 agent runner 使用同一套 slash command 解析逻辑。  
例如 `/name@botname` 会被一致识别为 `/name`。

#### 影响

- 减少同一命令在不同执行阶段解析不一致的问题。
- 改善 slash command 的可预测性。
- 降低后续新增命令时的维护成本。

---

### 3.4 CLI 参数规范化集中到 dispatch 阶段

- PR：[#4061 fix(cli): normalize ncl arguments once in dispatch](https://github.com/qwibitai/nanoclaw/pull/4061)  
- 状态：已关闭/合并  
- 涉及区域：ncl-cli

该 PR 将 `ncl` 参数规范化逻辑前置到 dispatch 入口处，统一将 dash 参数转换为 underscore，并让后续 autofill、guard、handler 等流程读取同一个标准化对象。

#### 影响

- 减少 CLI 参数在不同模块中被重复处理的风险。
- 改善命令行为一致性。
- 有助于后续扩展 `ncl` 子命令。

---

### 3.5 Mattermost 技能安装：校验 owner lookup 结果

- PR：[#4060 fix(add-mattermost): check the owner lookup result during setup](https://github.com/qwibitai/nanoclaw/pull/4060)  
- 状态：已关闭/合并  
- 涉及区域：channels、setup-installation、skills

该 PR 修复 Mattermost 技能安装时 owner ID 查询结果未充分校验的问题。现在 setup 阶段只接受格式正确的 Mattermost user ID，并改进了 skill apply 和 runtime check 的失败信息。

#### 影响

- 降低 Mattermost 集成配置错误导致运行时失败的概率。
- 错误信息更明确，便于用户自查配置。
- 对企业聊天集成场景有直接价值。

---

### 3.6 OneCLI 安装器命令更明确

- PR：[#4059 fix(setup): use a full URL and explicit curl options for the OneCLI installer](https://github.com/qwibitai/nanoclaw/pull/4059)  
- 状态：已关闭/合并  
- 涉及区域：setup-installation、skills

该 PR 将 OneCLI 安装命令改为使用完整 URL，并显式指定 curl 协议选项。

#### 影响

- 降低安装脚本因 URL 或协议解析差异导致失败的风险。
- 提升供应链安装过程的可审计性。
- 与今日新增的 OneCLI 2.x gateway 需求形成呼应，说明 OneCLI 相关能力正在成为近期关注点。

---

### 3.7 驱动测试修复：保留 fs.constants

- PR：[#4064 test(drivers): keep fs.constants in the driver tests' fs stub](https://github.com/qwibitai/nanoclaw/pull/4064)  
- 状态：已关闭/合并  
- 涉及区域：containers

该 PR 修复测试环境中 `fs` stub 只包含 `existsSync`，导致导入 `src/anchored-dir.ts` 时读取 `fs.constants` 失败的问题。

#### 影响

- 保障引入 anchored directory 机制后的测试稳定性。
- 说明 #4063 的底层文件访问改造已经影响到测试依赖，需要同步更新测试替身。

---

### 3.8 依赖维护

#### source-map-js 升级

- PR：[#4066 build(deps): bump source-map-js from 1.2.1 to 1.2.2](https://github.com/qwibitai/nanoclaw/pull/4066)  
- 状态：已关闭  
- 类型：依赖升级

#### vitest 升级

- PR：[#4067 build(deps-dev): bump vitest from 4.1.4 to 4.1.11](https://github.com/qwibitai/nanoclaw/pull/4067)  
- 状态：Open  
- 类型：开发依赖升级

Vitest 升级仍待处理，属于低风险但有助于测试生态保持最新的维护项。

---

## 4. 社区热点

### 4.1 OneCLI 2.x gateway 支持需求

- Issue：[#4068 [capability] Support OneCLI 2.x gateway](https://github.com/qwibitai/nanoclaw/issues/4068)  
- 状态：Open  
- 作者：Philabuster  
- 评论数：1  
- 反应数：0

该 Issue 是今日唯一新增/活跃 Issue，也是社区侧最明确的功能诉求。用户指出当前 NanoClaw 在 `.claude/skills/add-onecli/versions.json` 中将 OneCLI gateway 固定在 `1.42.0`，而该版本的 Google Docs 连接仅请求 `drive.file` 和 `drive.readonly` 权限，无法满足 Google Docs 编辑权限需求。

#### 背后诉求

用户希望 NanoClaw 支持 OneCLI 2.x gateway，以获得更完整的 Google Docs 编辑能力。  
这说明用户正在将 NanoClaw 用于更强交互性的文档自动化场景，不只是读取或有限文件操作。

#### 项目意义

该需求可能影响以下方向：

- Google Docs 编辑类技能能力增强
- OneCLI 版本管理策略调整
- OAuth scope 与权限升级流程设计
- 技能安装/升级兼容性处理

结合今日 #4059 对 OneCLI 安装器的修复，OneCLI 相关能力很可能成为下一阶段的重点之一。

---

## 5. Bug 与稳定性

按严重程度与影响范围排序如下。

### 高优先级：host 文件系统访问安全与稳定性

- PR：[#4063 fix(host): open session, skill and run-log directories by descriptor](https://github.com/qwibitai/nanoclaw/pull/4063)  
- 状态：已有 fix，已关闭/合并  
- 严重程度：高

该问题涉及 session、skill、run-log 等核心目录访问方式，覆盖多个核心模块。  
通过目录描述符固定访问范围后，可减少路径解析相关风险，是今日最重要的稳定性和安全性修复。

---

### 中高优先级：slash command 解析不一致

- PR：[#4062 fix(commands): parse slash commands once for the gate and the runner](https://github.com/qwibitai/nanoclaw/pull/4062)  
- 状态：已有 fix，已关闭/合并  
- 严重程度：中高

host command gate 与 agent runner 解析命令不一致，可能导致命令被 gate 接受但 runner 行为不同，或反之。  
统一解析器后，slash command 的行为更稳定。

---

### 中优先级：CLI 参数多处规范化带来的行为不一致

- PR：[#4061 fix(cli): normalize ncl arguments once in dispatch](https://github.com/qwibitai/nanoclaw/pull/4061)  
- 状态：已有 fix，已关闭/合并  
- 严重程度：中

将参数规范化集中到 dispatch 阶段，有助于避免不同模块对参数名处理不一致，尤其是 dash 与 underscore 参数形式混用时。

---

### 中优先级：Mattermost owner ID 校验不足

- PR：[#4060 fix(add-mattermost): check the owner lookup result during setup](https://github.com/qwibitai/nanoclaw/pull/4060)  
- 状态：已有 fix，已关闭/合并  
- 严重程度：中

如果 owner lookup 返回异常或格式不正确，之前流程可能继续执行并在后续阶段失败。  
修复后 setup 阶段会更早暴露配置问题，并输出更明确的错误信息。

---

### 中优先级：OneCLI 安装器 URL 与 curl 选项不够明确

- PR：[#4059 fix(setup): use a full URL and explicit curl options for the OneCLI installer](https://github.com/qwibitai/nanoclaw/pull/4059)  
- 状态：已有 fix，已关闭/合并  
- 严重程度：中

该问题主要影响安装可靠性和脚本可审计性。修复后安装命令更明确，有助于减少环境差异导致的安装失败。

---

### 低到中优先级：测试 stub 缺失 fs.constants

- PR：[#4064 test(drivers): keep fs.constants in the driver tests' fs stub](https://github.com/qwibitai/nanoclaw/pull/4064)  
- 状态：已有 fix，已关闭/合并  
- 严重程度：低到中

这是测试层面的回归，源于新引入的 `anchored-dir.ts` 在加载时读取 `fs.constants`。  
已通过保留 `fs.constants` 修复。

---

## 6. 功能请求与路线图信号

### 6.1 OneCLI 2.x gateway 支持可能进入近期路线图

- Issue：[#4068 Support OneCLI 2.x gateway](https://github.com/qwibitai/nanoclaw/issues/4068)

该需求明确绑定到 Google Docs 编辑权限，是一个具体、可验证的能力缺口。  
考虑到今日已有 OneCLI 安装流程相关修复 [#4059](https://github.com/qwibitai/nanoclaw/pull/4059)，维护者可能会继续推进 OneCLI 版本管理与 gateway 升级。

#### 可能涉及的后续工作

- 更新 `.claude/skills/add-onecli/versions.json` 中的 OneCLI gateway pin
- 评估 OneCLI 1.x 到 2.x 的兼容性
- 增加 Google Docs 编辑 scope 的授权说明
- 增加迁移测试或 beta channel 验证
- 明确旧用户如何重新授权 Google 账户权限

#### 纳入下一版本的可能性

中到高。  
原因是该请求目标清晰，并且与实际用户场景相关；同时项目今天刚完成稳定发布，下一阶段可能进入功能修复与能力增强周期。

---

### 6.2 更新机制正式转向 release-driven

- Release：[v2026.10.0](https://github.com/qwibitai/nanoclaw/releases/tag/v2026.10.0)  
- PR：[#4065](https://github.com/qwibitai/nanoclaw/pull/4065)

这不是传统意义上的功能请求，但属于重要路线图信号。  
项目正在从快速迭代的 main 分支交付，转向更成熟的 release channel 交付模式。这通常意味着：

- 用户侧稳定性优先级上升
- beta/stable 渠道区分更明确
- 后续重大变更更可能先进入 RC 或 beta
- 企业用户可预期性增强

---

## 7. 用户反馈摘要

今日可见的用户反馈主要来自 Issue #4068。

### 用户痛点：Google Docs 只能读，不能完整编辑

- Issue：[#4068](https://github.com/qwibitai/nanoclaw/issues/4068)

用户指出当前 OneCLI gateway 版本固定在 `1.42.0`，Google Docs 连接请求的 scope 不足，仅包含 `drive.file` 和 `drive.readonly`，缺少更高权限的 Google Docs 编辑能力。

#### 真实使用场景

用户希望通过 NanoClaw/OneCLI 对 Google Docs 进行编辑操作，而不只是读取或访问有限文件。  
这表明 NanoClaw 正被用于文档协作、知识管理、办公自动化等更实际的生产力场景。

#### 不满意点

- 当前 OneCLI gateway 版本过旧或能力不足。
- Google Docs 授权 scope 无法满足编辑需求。
- 用户需要项目层面支持 OneCLI 2.x，而不是自行绕过版本 pin。

#### 正向信号

用户反馈具体到版本文件、scope 和所需能力，说明社区用户具备较强技术背景，反馈质量较高。  
这类 issue 对维护者判断优先级和设计升级路径很有帮助。

---

## 8. 待处理积压

基于今日数据，暂无明显“长期未响应”的历史积压项；当前需要关注的未关闭事项主要有以下两项。

### 8.1 OneCLI 2.x gateway 支持需求待评估

- Issue：[#4068 Support OneCLI 2.x gateway](https://github.com/qwibitai/nanoclaw/issues/4068)  
- 状态：Open  
- 建议优先级：高

建议维护者尽快确认：

- 是否计划升级到 OneCLI 2.x
- 是否需要 beta channel 先行验证
- Google Docs 编辑 scope 是否会引入新的授权提示或迁移步骤
- OneCLI 1.x 用户是否需要兼容保留路径

---

### 8.2 Vitest 开发依赖升级待处理

- PR：[#4067 build(deps-dev): bump vitest from 4.1.4 to 4.1.11](https://github.com/qwibitai/nanoclaw/pull/4067)  
- 状态：Open  
- 建议优先级：低到中

这是 dependabot 提交的开发依赖升级，短期不会直接影响用户功能。  
但考虑到今日多项修复涉及测试稳定性，建议在 CI 通过后合并，以保持测试工具链处于较新状态。

---

## 项目健康度评估

**总体健康度：良好。**

- **维护活跃度：高**  
  过去 24 小时有 9 条 PR 更新，其中 8 条已关闭/合并，并完成一个稳定版本发布。

- **发布成熟度：提升明显**  
  `v2026.10.0` 标志着项目开始采用 CalVer 和稳定 release 驱动更新路径，降低了普通用户使用 main 分支的风险。

- **稳定性投入：强**  
  今日多个 PR 聚焦安全、路径访问、CLI 解析、安装流程和测试修复，说明维护团队正在主动偿还基础设施债务。

- **社区需求清晰：中等活跃**  
  Issue 数量不多，但 #4068 指向明确的生产力场景能力缺口，值得纳入近期规划。

- **主要风险：OneCLI 版本与权限能力滞后**  
  如果 Google Docs 编辑能力是用户关键场景，当前固定 OneCLI 1.42.0 可能成为 adoption 阻力。建议维护者优先评估 OneCLI 2.x 升级路径。

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

# LobsterAI 项目动态日报｜2026-10-10

## 1. 今日速览

过去 24 小时，LobsterAI 没有新的 Issue 更新，但 Pull Request 活动非常密集，共有 **12 条 PR 更新**，其中 **3 条仍处于 Open 状态，9 条已关闭/合并或被替代关闭**。今日工作重心明显集中在 **OpenClaw 运行时稳定性、Windows 本地网关连通性、配置恢复机制、cowork 任务控制** 等核心链路。  
整体来看，项目处于 **高维护活跃度** 状态：虽然没有新版本发布，也没有 Issue 讨论，但维护者在集中处理实际用户反馈暴露出的运行时问题，尤其是 Windows、网关启动、配置锁、任务中断与恢复相关问题。  
值得注意的是，多个 PR 之间存在连续修复关系，例如 #2817、#2819、#2824、#2825、#2826 均围绕 OpenClaw 网关、配置恢复和任务不中断体验展开，说明近期稳定性问题正在被系统性收敛。

---

## 2. 项目进展

今日无新版本发布，因此本节聚焦已关闭/合并的重要 PR 进展。

### OpenClaw / 网关稳定性修复

#### PR #2825：修复机器休眠后网关启动超时误判  
链接：https://github.com/netease-youdao/LobsterAI/pull/2825  
状态：Closed  
作者：fisherdaddy  

该 PR 修复了 Gateway 启动和 Quick Repair 逻辑使用 `Date.now()` 计算超时时间的问题。由于系统休眠期间 wall-clock 时间仍会前进，机器唤醒后首次检查会误判为已经等待了数小时，从而将网关启动判定为超时，并在启动过程中停止 gateway。  
这一修复提升了笔记本、休眠/唤醒场景下的可用性，尤其对长时间挂起后继续使用 LobsterAI 的用户影响较大。

#### PR #2819：回收孤儿配置锁，终止无限配置恢复  
链接：https://github.com/netease-youdao/LobsterAI/pull/2819  
状态：Closed  
作者：fisherdaddy  

该 PR 针对 Windows 用户反馈的“每次任务启动都会重启 gateway，并卡在 AI 引擎启动中”的问题进行修复。根因是一个 0 字节的 `openclaw.json.lock` 被遗留，导致配置写入和恢复流程陷入异常。  
这项修复减少了配置锁异常导致的启动死循环，是今日 OpenClaw 稳定性工作中的关键改动。

#### PR #2817：允许 Windows Firewall 本地回环访问 gateway  
链接：https://github.com/netease-youdao/LobsterAI/pull/2817  
状态：Closed  
作者：fisherdaddy  

该 PR 解决 Windows 上 gateway 已启动但应用无法通过 `127.0.0.1` 访问的问题。场景中 `/startupz` 探测持续失败，最终触发 300 秒启动超时。  
由于 gateway 以 `LobsterAI.exe` 自身运行，如果 Windows 防火墙阻断对该可执行文件的 inbound loopback 连接，应用将无法连接本地引擎。该修复直接改善 Windows 用户启动失败和引擎不可达问题。

#### PR #2820：新增 Windows loopback 与网络过滤诊断采集器  
链接：https://github.com/netease-youdao/LobsterAI/pull/2820  
状态：Closed  
作者：fisherdaddy  

该 PR 增加了两个面向支持场景的双击诊断工具，用于排查 LobsterAI 启动引擎后无法访问 `127.0.0.1` 的问题。  
它不仅服务于 #2817 中的 Windows Firewall 场景，也覆盖 #2817 无法自动修复的情况，例如规则创建失败、企业安全软件拦截、网络过滤器异常等。  
这属于“可观测性 / 支持工具”增强，有助于后续降低 Windows 网络问题的排查成本。

---

### cowork / steering 控制链路修复

#### PR #2827：保持 steered turn 运行，并在 stop 时丢弃排队 steer input  
链接：https://github.com/netease-youdao/LobsterAI/pull/2827  
状态：Closed  
作者：fisherdaddy  

该 PR 修复 OpenClaw v2026.8.1 中 steering 正在运行的 turn 时的两个问题：  
1. 用户停止 turn 后，清理仍排队的 steer input；  
2. 确保被 steer 的运行轮次不会被错误中断。  

该 PR 同时包含 #2823 的修复，并在描述中说明其 supersedes #2823。它对用户主动干预模型生成、再停止任务的交互体验影响较大，可防止 stop 后意外开启新的 turn。

#### PR #2823：用户停止 turn 时丢弃排队 steer input  
链接：https://github.com/netease-youdao/LobsterAI/pull/2823  
状态：Closed  
作者：fisherdaddy  

该 PR 修复当用户在模型流式输出期间发送 steer input，随后又停止当前 turn 时，OpenClaw 会将原本排队的 steer input 重放为一个新 turn 的问题。  
由于该修复被 #2827 吸收并取代，#2823 的主要价值体现在定位和最小化修复方案上。

---

### 配置变更与任务准入逻辑

#### PR #2821：允许不受 pending config change 影响的任务继续进入  
链接：https://github.com/netease-youdao/LobsterAI/pull/2821  
状态：Closed  
作者：fisherdaddy  

该 PR 修复 pending config change 状态下任务准入过于保守的问题。此前只要存在未应用配置变更，所有新会话、续写、steer、side question 和 goal command 都会被拒绝，即便该 pending change 实际上不会影响这些任务。  
修复后，系统能够更细粒度地判断哪些任务会受配置变更影响，从而减少无谓阻塞，提高任务连续性。

---

### Office / 剪贴板权限修复

#### PR #2822：允许 app renderer 访问剪贴板  
链接：https://github.com/netease-youdao/LobsterAI/pull/2822  
状态：Closed  
作者：fisherdaddy  

该 PR 修复电子表格编辑器中复制、剪切失败的问题。用户看到 Univer 的提示“无法访问剪贴板 / 请允许 Univer 访问您的剪贴板”，但内容无法进入剪贴板。  
根因在主进程权限处理：默认 session 只有一个 permission request handler，之前为语音输入添加的 handler 覆盖或限制了剪贴板访问。该修复改善了内置 Office/表格场景下的基础编辑体验。

---

### 桌面助手功能增强

#### PR #2816：桌面伴侣新增翻译与朗读卡片  
链接：https://github.com/netease-youdao/LobsterAI/pull/2816  
状态：Closed  
作者：btc69m979y-dotcom  

该 PR 为选中文本场景增加了翻译和朗读能力。用户选中文本后，可在紧凑卡片中直接进行 Translate 或 Read aloud 操作。  
同时，工具栏保留 Translate、Read aloud、Copy、Ask 等高频入口，并将 Explain、Summarize、Polish、selection settings 收纳到 More 菜单中。  
这是今日少数偏功能侧的更新，表明 LobsterAI 桌面伴侣正在强化“选中文本即用”的个人 AI 助手体验。

---

## 3. 社区热点

> 今日没有 Issue 更新，PR 评论数和反应数均未提供或为 undefined，因此无法基于评论量进行严格排序。以下热点依据 PR 数量、问题影响面和连续修复链路判断。

### 热点一：Windows 本地 gateway 连接失败与防火墙拦截

相关 PR：  
- #2817：https://github.com/netease-youdao/LobsterAI/pull/2817  
- #2820：https://github.com/netease-youdao/LobsterAI/pull/2820  
- #2825：https://github.com/netease-youdao/LobsterAI/pull/2825  

用户诉求集中在：应用已启动但 AI 引擎长时间不可用、本地 `127.0.0.1` 探测失败、Windows 防火墙或网络策略导致 gateway 不可达。  
维护者不仅修复了防火墙 loopback 规则问题，还补充了诊断采集工具，说明这类问题在真实用户环境中具有较强复现难度和支持成本。

### 热点二：OpenClaw 配置恢复与任务不中断

相关 PR：  
- #2819：https://github.com/netease-youdao/LobsterAI/pull/2819  
- #2821：https://github.com/netease-youdao/LobsterAI/pull/2821  
- #2824：https://github.com/netease-youdao/LobsterAI/pull/2824  

这组 PR 反映出用户对“任务不要因为配置问题被整体阻断”的强烈诉求。  
过去逻辑中，配置锁、配置应用未确认、gateway 恢复卡住等状态会影响 composer、cowork、IM 连接、Settings 状态展示等多个模块。维护方向正在从“遇到配置异常即整体失败”转向“隔离影响范围，尽可能保持未受影响任务继续运行”。

### 热点三：运行中任务 steering / stop 行为不符合预期

相关 PR：  
- #2823：https://github.com/netease-youdao/LobsterAI/pull/2823  
- #2827：https://github.com/netease-youdao/LobsterAI/pull/2827  

用户在模型流式输出中进行 steer，然后停止任务时，系统可能将排队输入误启动为新 turn。这类问题直接影响可控性和信任感。  
#2827 对 #2823 进行了整合和扩展，说明维护者正在快速迭代任务控制语义，减少“用户明明点了停止，却又继续执行”的体验问题。

---

## 4. Bug 与稳定性

按影响严重程度排序如下。

### 严重：Windows gateway 启动后本地不可达

- 相关 PR：#2817  
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2817  
- 状态：已有修复，Closed  
- 影响范围：Windows 用户，尤其是重启后或防火墙策略阻断 loopback 的环境  
- 表现：应用等待 300 秒 gateway boot timeout，`/startupz` 到 `127.0.0.1` 探测失败，AI 引擎无法进入可用状态  
- 判断：高严重度，因为会导致核心 AI 引擎不可用

### 严重：配置锁异常导致 gateway 反复重启 / 卡在启动页

- 相关 PR：#2819  
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2819  
- 状态：已有修复，Closed  
- 影响范围：配置写入过程中被杀死或异常退出的用户环境  
- 表现：每次任务启动都触发 gateway 重启，应用停留在“AI 引擎启动中”页面  
- 判断：高严重度，属于启动链路阻断和持久化状态污染问题

### 高：配置恢复停滞时错误地阻断任务与连接

- 相关 PR：#2824  
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2824  
- 状态：Open  
- 影响范围：OpenClaw、composer、cowork、IM 连接、Settings  
- 表现：gateway 无法应用最新 config 时，被广播为 engine error，导致 composer 禁用、cowork 任务准入拒绝、IM 连接拒绝  
- 判断：高严重度，目前仍待合并，建议优先 review

### 高：机器休眠导致 gateway 启动超时误判

- 相关 PR：#2825  
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2825  
- 状态：已有修复，Closed  
- 影响范围：笔记本用户、长时间休眠后恢复使用场景  
- 表现：唤醒后首次检查将休眠时间计入等待时间，误判 gateway 启动超时并停止 gateway  
- 判断：高严重度，影响启动可靠性和恢复体验

### 中高：停止 turn 后排队 steer input 被误执行为新 turn

- 相关 PR：#2823、#2827  
- 链接：  
  - https://github.com/netease-youdao/LobsterAI/pull/2823  
  - https://github.com/netease-youdao/LobsterAI/pull/2827  
- 状态：已有修复，#2827 Closed，#2823 被替代  
- 影响范围：使用 steer / stop 控制模型输出的用户  
- 表现：用户停止当前 turn 后，之前排队的 steer input 被重新作为新 turn 执行  
- 判断：中高严重度，影响任务可控性和用户信任

### 中：pending config change 过度阻断所有任务

- 相关 PR：#2821  
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2821  
- 状态：已有修复，Closed  
- 影响范围：存在延迟 gateway restart 或 config.apply 未确认时的用户  
- 表现：所有新会话、续写、steer、side question、goal command 被拒绝  
- 判断：中等严重度，主要影响连续使用体验

### 中：Office 表格编辑器复制/剪切失败

- 相关 PR：#2822  
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2822  
- 状态：已有修复，Closed  
- 影响范围：使用内置 spreadsheet editor / Univer 的用户  
- 表现：提示无法访问剪贴板，复制或剪切无效  
- 判断：中等严重度，影响基础办公编辑能力

### 中：progress card 计划未完成但 run 被视为结束

- 相关 PR：#2826  
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2826  
- 状态：Open  
- 影响范围：长任务、多步骤评测任务、composer progress card  
- 表现：进度卡停在“第 3/10 步 · 本轮已结束”，模型保存了 10 步计划并表示会继续，但停止时没有 tool call，系统将其视为结束  
- 判断：中等到高严重度，影响长任务完成度和进度展示可信度

---

## 5. 功能请求与路线图信号

### Atlas Cloud Provider 支持可能进入后续版本

- 相关 PR：#2818  
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2818  
- 状态：Open  
- 作者：binyangzhu000-sudo  

该 PR 在 Global section 中新增 Atlas Cloud provider，位置与 OpenRouter 并列。变更规模较小，涉及 5 个文件，整体看是 provider 列表与 OpenClaw provider id 的接入。  
这表明 LobsterAI 仍在扩展模型服务商生态。若 review 顺利，Atlas Cloud 很可能被纳入下一版本或近期小版本。

### 桌面伴侣继续强化选中文本工作流

- 相关 PR：#2816  
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2816  
- 状态：Closed  

新增翻译与朗读卡片，说明桌面伴侣的路线正在向“轻量、上下文感知、围绕选中文本的即时 AI 操作”演进。  
结合 Translate、Read aloud、Copy、Ask、Explain、Summarize、Polish 等操作布局，未来可能继续扩展为更完整的文本处理快捷工具栏。

### 支持诊断工具成为 Windows 稳定性路线的一部分

- 相关 PR：#2820  
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2820  
- 状态：Closed  

新增 loopback connection 与 network filter collectors 说明维护者已经意识到单纯代码修复不足以覆盖复杂的 Windows 网络环境。  
后续路线可能继续增强：一键诊断、自动修复、导出支持包、定位安全软件/企业策略影响等。

---

## 6. 用户反馈摘要

> 今日没有 Issue 评论数据，因此以下反馈摘要来自 PR 描述中提到的真实用户报告和维护者复盘。

### 痛点一：Windows 用户启动后 AI 引擎不可用

相关 PR：  
- #2817：https://github.com/netease-youdao/LobsterAI/pull/2817  
- #2820：https://github.com/netease-youdao/LobsterAI/pull/2820  
- #2825：https://github.com/netease-youdao/LobsterAI/pull/2825  

用户场景包括：重启后应用等待 300 秒、`127.0.0.1` 访问失败、机器休眠唤醒后 gateway 被误判超时。  
这类反馈说明 LobsterAI 的桌面端体验强依赖本地 gateway 的可靠启动和本地网络通道，而 Windows 防火墙、休眠恢复、网络过滤器都会成为实际部署中的不确定因素。

### 痛点二：任务执行中断、恢复和状态展示不一致

相关 PR：  
- #2819：https://github.com/netease-youdao/LobsterAI/pull/2819  
- #2824：https://github.com/netease-youdao/LobsterAI/pull/2824  
- #2826：https://github.com/netease-youdao/LobsterAI/pull/2826  

用户遇到过任务启动即重启 gateway、composer 被禁用、进度卡停在未完成步骤但系统认为本轮结束等问题。  
这些反馈反映出长任务、多步骤任务和配置恢复场景下，系统需要更准确地区分“运行失败”“等待恢复”“模型暂时停止但计划未完成”等状态。

### 痛点三：用户主动停止任务后系统仍继续执行

相关 PR：  
- #2823：https://github.com/netease-youdao/LobsterAI/pull/2823  
- #2827：https://github.com/netease-youdao/LobsterAI/pull/2827  

当用户停止当前 turn 后，系统仍执行之前排队的 steer input，会造成“停止按钮不可靠”的感受。  
维护者已通过清理排队 steer input 修复该问题，有助于提升交互确定性。

### 痛点四：基础办公能力受权限限制影响

相关 PR：  
- #2822：https://github.com/netease-youdao/LobsterAI/pull/2822  

用户在 spreadsheet editor 中无法复制/剪切内容，说明桌面端权限处理会直接影响内置办公体验。  
此类问题虽然不是 AI 推理核心链路，但会显著影响用户对产品完整性的评价。

---

## 7. 待处理积压

由于今日没有 Issue 更新，也没有长期未响应 Issue 数据，本日报无法识别长期无人响应的 Issue。当前可见的待处理重点主要是仍处于 Open 状态的 PR。

### PR #2824：配置恢复停滞时保持任务运行  
链接：https://github.com/netease-youdao/LobsterAI/pull/2824  
状态：Open  
建议优先级：高  

该 PR 是 #2819 的后续修复，目标是在 config recovery stalled 时避免将其广播为 engine error，从而防止 composer、cowork、IM 和 Settings 受到过度影响。  
鉴于其覆盖范围涉及多个核心模块，建议维护者优先 review 和验证回归风险。

### PR #2826：run 停止前重新检查未完成 progress-card plans  
链接：https://github.com/netease-youdao/LobsterAI/pull/2826  
状态：Open  
建议优先级：高  

该 PR 解决长任务中 progress card 计划未完成但 run 被视作结束的问题。  
该问题影响多步骤评测和长任务交付质量，尤其在模型已经明确表示“仍需继续完成剩余交付物”但没有 tool call 的情况下，系统需要更谨慎地判断任务是否真正结束。

### PR #2818：新增 Atlas Cloud Provider  
链接：https://github.com/netease-youdao/LobsterAI/pull/2818  
状态：Open  
建议优先级：中  

该 PR 是 provider 生态扩展，改动规模较小，若测试通过可较快合入。  
建议关注 provider id、API key URL、OpenClaw provider 映射以及 UI 展示一致性。

---

## 项目健康度判断

- **维护活跃度：高**。24 小时内 12 条 PR 更新，且多数集中在真实用户问题修复。  
- **发布节奏：平稳**。今日无 release，说明当前更偏向修复积累阶段。  
- **稳定性风险：中高**。OpenClaw gateway、配置恢复、Windows loopback、任务状态机等核心链路近期问题较多，但已有多个修复 PR 快速跟进。  
- **社区反馈密度：低**。无 Issue 更新、评论和反应数据缺失，说明今日公开讨论不活跃；但 PR 描述显示维护者正在处理来自真实用户场景的问题。  
- **短期重点建议**：优先合并和验证 #2824、#2826，继续完善 Windows 诊断与恢复能力，并对 OpenClaw 配置恢复 / 任务准入 / progress card 状态机进行集中回归测试。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报（2026-10-10）

项目：Moltis  
仓库：github.com/moltis-org/moltis  
统计周期：过去 24 小时

---

## 1. 今日速览

过去 24 小时内，Moltis 项目新增/活跃 Issues 2 条，未出现新的 Pull Request 更新，也没有新版本发布。今日活跃度偏低到中等，主要集中在用户侧功能诉求，而非代码合入或版本迭代。两个新增 Issue 都由同一位用户提出，反映出 Moltis 在“新一代 OpenAI 模型兼容性”和“群聊触发机制”方面存在明确需求。当前没有关闭 Issue、合并 PR 或发布版本，说明今日项目推进更多停留在需求收集阶段。

---

## 2. 项目进展

今日无新增、合并或关闭的 Pull Request。

从数据看，过去 24 小时项目没有产生可见的代码层面推进，也没有针对新增 Issue 的修复 PR 或实现 PR。当前进展主要体现在社区反馈的收集，尤其是 AI Provider 兼容性与聊天入口控制能力两个方向。

---

## 3. 社区热点

### 3.1 OpenAI gpt-6 模型原生支持需求

- Issue：[#1298 Feature: native support for OpenAI gpt-6 models (reasoning + tools)](https://github.com/moltis-org/moltis/issues/1298)
- 状态：Open
- 作者：texxronn
- 评论数：1
- 反应数：👍 0
- 创建/更新：2026-10-10

该 Issue 是今日最重要的技术兼容性反馈。用户报告在使用内置 `openai` provider 调用 `gpt-6-luna` 且请求中包含 tools 时，会触发 HTTP 400 错误：

> Function tools with reasoning_effort are not supported for gpt-6-luna in /v1/chat/completions. To use function tools, use /v1/responses or set reasoning_effort to 'none'.

这表明 Moltis 当前的 OpenAI Provider 可能仍依赖 `/v1/chat/completions` 路径或默认参数组合，而新模型在 reasoning 与 tool calling 组合上需要走 `/v1/responses`，或调整 `reasoning_effort` 行为。

背后诉求包括：

- 支持 OpenAI 新一代 reasoning 模型；
- 在启用 tools/function calling 的情况下保持模型可用；
- 对不同 OpenAI 模型能力进行更细粒度的 endpoint 和参数适配；
- 避免用户手动绕过内置 provider。

该问题对使用 OpenAI 新模型作为主力 Agent 后端的用户影响较大，尤其是需要工具调用的个人 AI 助手场景。

---

### 3.2 共享群聊中的可配置唤醒词需求

- Issue：[#1297 Feature: configurable mention/trigger word for a shared channel](https://github.com/moltis-org/moltis/issues/1297)
- 状态：Open
- 作者：texxronn
- 评论数：1
- 反应数：👍 0
- 创建/更新：2026-10-10

该 Issue 关注 Moltis 在共享聊天场景中的“何时响应”问题。用户在自托管 Agent 并接入个人 WhatsApp linked device 后，希望在群聊中通过稳定名称触发，例如消息以 `@Rio` 开头时才唤醒 Agent，其他消息保持静默。

用户明确指出，现有 `mention_mode = "mention"` 无法覆盖该场景，原因可能与 linked-device 账号在群聊中的 mention 识别能力有关。该需求反映出个人 AI 助手在真实聊天环境中需要更强的上下文边界控制，避免 Agent 在群聊中过度响应或误触发。

背后诉求包括：

- 支持按固定关键词、别名或前缀唤醒；
- 在群聊/共享频道中降低误触发；
- 支持自托管用户为 Agent 设置“稳定名字”；
- 与不同消息平台的 mention 能力解耦。

该需求偏产品体验层面，但对 WhatsApp、Telegram、Discord 等多人聊天入口的可用性影响明显。

---

## 4. Bug 与稳定性

### 高优先级：OpenAI gpt-6 + tools 调用失败

- Issue：[#1298](https://github.com/moltis-org/moltis/issues/1298)
- 类型：兼容性问题 / 功能缺口
- 严重程度：高
- 是否已有 fix PR：暂无

虽然该 Issue 以 Feature 形式提交，但从用户描述看，它会导致在特定模型与 tools 组合下请求直接失败，属于实际运行时阻断问题。影响范围取决于有多少用户已经切换到 `gpt-6-luna` 或其他 gpt-6 系列模型。

潜在影响：

- 使用内置 `openai` provider 的用户无法稳定使用 gpt-6 reasoning 模型；
- 启用工具调用的 Agent 流程会被 HTTP 400 中断；
- 用户可能被迫禁用 reasoning、禁用 tools，或手动替换 provider 实现。

建议维护者关注：

- 是否需要为 gpt-6 系列切换到 `/v1/responses`；
- 是否需要按模型能力自动选择 endpoint；
- 是否需要在配置层暴露 `reasoning_effort`；
- 是否需要在 provider 层加入兼容性 fallback 或更明确的错误提示。

---

### 中优先级：共享群聊中缺乏稳定触发词机制

- Issue：[#1297](https://github.com/moltis-org/moltis/issues/1297)
- 类型：产品功能缺口
- 严重程度：中
- 是否已有 fix PR：暂无

该问题不是崩溃或回归，但会影响 Agent 在多人频道中的可控性和用户体验。对运行在 WhatsApp linked device 这类非标准 Bot 入口上的用户来说，传统 mention 机制可能不可用，因此需要额外的 trigger word 机制。

潜在影响：

- Agent 可能无法被可靠唤醒；
- 群聊中可能出现误响应或无响应；
- 用户需要借助外部过滤逻辑或自定义适配器规避。

---

## 5. 功能请求与路线图信号

### 5.1 原生支持 OpenAI gpt-6 reasoning + tools

- Issue：[#1298](https://github.com/moltis-org/moltis/issues/1298)
- 当前状态：Open
- 相关 PR：暂无

这是今日最强的路线图信号之一。Moltis 作为 AI Agent / 个人 AI 助手项目，模型 Provider 的兼容性直接影响用户选择后端模型的能力。OpenAI 新模型如果要求使用 `/v1/responses` 才能同时支持 reasoning 与 tools，Moltis 可能需要更新 Provider 抽象。

可能纳入后续版本的方向：

- 新增 Responses API 支持；
- 为 gpt-6 系列配置专门 provider path；
- 支持模型级能力声明，例如是否支持 tools、reasoning、chat completions；
- 支持自动降级：当 tools 与 reasoning 冲突时自动关闭 reasoning 或提示用户；
- 提供更清晰的模型配置文档。

优先级判断：较高。原因是该问题会造成实际请求失败，并且与核心 Agent 能力“工具调用”直接相关。

---

### 5.2 共享频道可配置唤醒词 / 触发词

- Issue：[#1297](https://github.com/moltis-org/moltis/issues/1297)
- 当前状态：Open
- 相关 PR：暂无

该需求体现了 Moltis 在“个人 AI 助手进入真实社交空间”时的关键产品挑战：Agent 不应对所有消息都响应，而应具备可配置的触发边界。

可能纳入后续版本的方向：

- 新增 `trigger_word` 或 `wake_word` 配置；
- 支持按频道配置不同触发词；
- 支持前缀匹配，例如 `@Rio help me...`；
- 支持正则表达式或多别名；
- 与现有 `mention_mode` 组合，例如 `mention | trigger_word | always | never`；
- 触发后剥离唤醒词，只将正文传给 Agent。

优先级判断：中等偏高。该功能对群聊入口体验很重要，但不属于核心运行阻断问题。

---

## 6. 用户反馈摘要

今日用户反馈集中来自同一位用户 texxronn，反映出两个清晰使用场景：

1. **使用新一代 OpenAI 模型运行带工具调用的 Agent**  
   用户希望 Moltis 能直接支持 `gpt-6-luna` 这类 reasoning 模型，并在 tools/function calling 场景下正常工作。当前体验不佳点在于内置 provider 会产生 HTTP 400，用户无法无缝使用新模型能力。

2. **在个人 WhatsApp 群聊中运行自托管 Agent**  
   用户希望 Agent 像一个有名字的联系人一样，只在消息以指定名称开头时响应。例如在群聊中通过 `@Rio` 唤醒，而不是监听所有消息。当前不满意点在于现有 `mention_mode = "mention"` 对 linked-device WhatsApp 场景不够适配。

整体来看，用户并非提出泛泛的功能愿望，而是基于真实部署场景提出问题：  
一端是模型后端能力升级，另一端是日常聊天入口中的交互控制。这两个方向都与个人 AI 助手项目的实用性高度相关。

---

## 7. 待处理积压

本次数据仅包含过去 24 小时更新记录，未提供长期未响应 Issue 或 PR 列表，因此无法判断是否存在长期积压项。

今日新增且需要维护者关注的待处理事项如下：

1. [#1298 OpenAI gpt-6 models reasoning + tools 支持](https://github.com/moltis-org/moltis/issues/1298)  
   建议优先 triage，确认是否为 provider 兼容性缺陷，并判断是否需要迁移到 Responses API。

2. [#1297 共享频道可配置 mention/trigger word](https://github.com/moltis-org/moltis/issues/1297)  
   建议补充产品设计讨论，明确与现有 `mention_mode` 的关系，以及是否支持平台无关的唤醒词机制。

---

## 项目健康度评估

今日 Moltis 的社区活跃度不高，但反馈质量较高，两个 Issue 都指向真实用户场景。代码层面今日没有 PR 和 release，短期工程推进信号较弱。项目当前健康度可评为“稳定但低速推进”：用户仍在提出有价值的需求，但维护侧是否能及时响应、转化为 PR 或版本发布，还需要继续观察。

重点关注方向：

- OpenAI Provider 是否能快速适配新模型 API；
- 群聊触发机制是否会进入产品路线图；
- 新 Issue 是否能在短期内获得维护者 triage 或实现计划。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报（2026-10-10）

> 数据源显示仓库路径为 `agentscope-ai/QwenPaw`，以下日报按提供的 CoPaw/QwenPaw 项目数据整理。  
> 今日无新版本发布。

---

## 1. 今日速览

过去 24 小时，项目活跃度较高：Issues 更新 6 条，其中 5 条仍处于开放状态，PR 更新 7 条，其中 4 条仍待合并。今日工作重点集中在 **稳定性修复、前端渲染问题、国际化补齐、移动端/多端扩展、Worker 管理能力** 等方向。

值得注意的是，社区报告了一个高严重度安全问题：MCP Driver 配置接口疑似可导致 root RCE，并已有生产入侵证据链，维护者需要优先响应。与此同时，多个修复型 PR 已关闭，包括空消息渲染、复制图标尺寸异常、本地模型推荐更新，说明项目仍保持较快的缺陷修复节奏。

整体来看，项目健康度处于“高活跃但风险上升”状态：功能演进积极，但安全与 Windows/流式 API 等稳定性问题需要尽快收敛。

---

## 2. 项目进展

### 已关闭 / 已合并的重要 PR

#### PR #8159：修复 Console 中空文本消息导致最终答案不可见的问题  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8159

该 PR 修复了当模型将 Scroll headline 作为独立最终文本块输出时，Console 将空白消息误判为最终结果的问题。修复方式是在响应分组前过滤仅包含空白文本的消息，从而避免实际答案被折叠隐藏。

关联 Issue：

- Issue #8158：https://github.com/agentscope-ai/QwenPaw/issues/8158

影响：

- 改善对复杂模型输出结构的兼容性。
- 降低用户看到“空白气泡”的困惑。
- 对聊天体验和调试体验有直接正向影响。

---

#### PR #8157：修复聊天中复制图标尺寸异常  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8157

该 PR 修复了用户消息复制图标被设计系统 Button 组件错误替换尺寸的问题，并强化了 SDK host 集成回归测试。

关联 Issue：

- Issue #8143：https://github.com/agentscope-ai/QwenPaw/issues/8143

影响：

- 属于小型 UI 质量修复。
- 提升前端组件边界稳定性。
- 增加回归测试，降低同类 UI 破坏再次发生的概率。

---

#### PR #8155：更新 QwenPaw-Flash 本地模型推荐  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8155

该 PR 更新了 QwenPaw-Flash 9B、27B 和 35B-A3B 的本地模型推荐配置，补充了不同显存档位下的 GGUF 推荐版本。

影响：

- 增强本地模型使用指引。
- 为 24 GiB / 48 GiB 显存用户提供更明确的模型选择。
- 有助于降低本地部署门槛。

---

### 待合并但方向明确的 PR

#### PR #8164：新增 HarmonyOS NEXT 原生客户端  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8164

该 PR 新增 `apps/qwenpaw-harmony`，即 HarmonyOS NEXT 原生 ArkTS 客户端，并复用现有后端协议，无需服务端变更。

意义：

- 项目正在向更多终端生态扩展。
- HarmonyOS 原生支持有助于覆盖中国市场移动端与 IoT 生态。
- PR 标记为 `size/XXXL`，合并前需要重点关注架构一致性、维护成本和测试覆盖。

---

#### PR #8161：补齐多语言翻译并抽离 locale 映射  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8161

该 PR 修复 Console 翻译目录漂移问题，并将 antd/dayjs locale 映射从 `App.tsx` 中抽离，便于后续新增语言。

关联 Issue：

- Issue #8160：https://github.com/agentscope-ai/QwenPaw/issues/8160

意义：

- 为西班牙语等新增语言铺路。
- 降低国际化维护成本。
- 有利于项目全球化扩展。

---

#### PR #8156：新增 coding-cli Worker 容器管理接口  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8156

该 PR 为多 Agent 部署中的 Worker 容器增加第三方 coding CLI 管理接口，例如 `qwen-code`、`opencode` 等。

意义：

- 增强多 Agent / 编程 Agent 场景的可运维性。
- 提供模型、CLI 和 Worker 容器配置的管理入口。
- 需要重点评估安全边界，尤其是在当前已有 MCP Driver RCE 报告的背景下。

---

#### PR #8154：改进 Console chunk 加载错误恢复与诊断  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8154

该 PR 修复与前端 chunk 加载失败相关的问题，覆盖 Safari/WebView、CSS modules、页面导航后的 lazy 状态恢复等场景。

关联 Issue：

- Issue #8120：https://github.com/agentscope-ai/QwenPaw/issues/8120
- Issue #7815：https://github.com/agentscope-ai/QwenPaw/issues/7815

意义：

- 面向前端稳定性的重要修复。
- 对移动端 WebView、Safari 用户体验改善明显。
- 当前仍处于开放状态，建议优先 Review。

---

## 3. 社区热点

### Issue #8163：Windows 长路径导致 Review decision journal 存储完整性错误  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8163  
状态：Open  
评论数：3

这是今日评论最多的 Issue。用户在 Windows Server 2022 环境中报告，`qwenpaw-creator` 在长运行路径下触发 `503 STORAGE_INTEGRITY_ERROR`，随后遗留的空 decision 目录又导致重试时出现 `409 CAS_CONFLICT`。

用户诉求：

- Windows 默认未启用 LongPathsEnabled 时，路径长度应被更好处理。
- 存储失败后的清理逻辑需要更可靠。
- 重试流程不应被残留空目录永久阻塞。

分析：

该问题影响插件创建流程和 Review 决策日志持久化，属于平台兼容性与数据一致性问题。虽然目前仅在 Windows 长路径场景明确复现，但“失败后残留状态阻塞重试”是更通用的可靠性风险。

---

### Issue #8162：OpenAI Responses API 流式事件导致空响应 / 会话中断  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8162  
状态：Open  
评论数：2

用户报告在 Windows 10 desktop 2.2.2.b4 环境中，会话运行 1-3 步后无提示中断。问题被定位到 OpenAI Responses API 的流式事件解析逻辑：旧版 `_parse_stream_response` 只处理部分增量事件，未完整处理某些最终事件或响应结构。

用户诉求：

- 流式响应解析应兼容 OpenAI Responses API 的完整事件类型。
- 会话中断时需要更明确的错误提示。
- 不应出现“无提示停止”的体验。

分析：

该问题属于模型提供商 API 适配层稳定性问题。由于 OpenAI Responses API 事件格式较复杂，若解析逻辑不完整，会直接影响会话连续性和工具调用链路。

---

### Issue #8153：MCP Driver 配置接口疑似导致 root RCE  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8153  
状态：Open  
评论数：2

这是今日最需要优先关注的问题。用户提交了脱敏后的完整入侵证据链，称攻击者通过 MCP Driver 配置接口以 root 权限执行任意命令，并部署 SSH 持久化和 systemd 挖矿木马。

用户诉求：

- 立即确认是否存在未授权 RCE。
- 提供修复、缓解方案和安全公告。
- 明确受影响版本、默认配置风险和排查方法。

分析：

该问题严重程度极高。即使最终确认需要特定配置或暴露条件，也应以安全事件流程处理，包括临时禁用建议、访问控制建议、审计日志排查方式和补丁计划。

---

### Issue #8160：新增西班牙语界面语言  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8160  
状态：Open  
评论数：2

用户希望新增 Spanish `es` 作为完整界面语言，覆盖 Console、Website、Plugin Creator UI 和 Backend。

关联 PR：

- PR #8161：https://github.com/agentscope-ai/QwenPaw/pull/8161

分析：

该需求体现项目国际化扩展诉求增强。PR #8161 虽然尚未直接完成西班牙语，但已经在重构 locale 结构，为新增语言降低成本。

---

## 4. Bug 与稳定性

按严重程度排序如下：

### P0 / Critical：MCP Driver 配置接口疑似 root RCE  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/8153  
状态：Open  
是否已有 fix PR：未在今日数据中看到对应修复 PR

问题概述：

- MCP Driver 配置接口可能允许执行任意命令。
- 报告称已导致生产服务器被入侵。
- 攻击后续包括 SSH 公钥持久化、systemd 挖矿木马、C2 外连。

建议：

- 立即确认是否可复现。
- 若属实，应发布安全公告。
- 临时建议用户关闭公网暴露的 MCP Driver 配置接口。
- 检查是否需要默认禁用危险 Driver 类型、增加鉴权、沙箱、最小权限运行和命令白名单。

---

### P1 / High：Windows 长路径导致存储完整性错误并阻塞重试  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/8163  
状态：Open  
是否已有 fix PR：未发现对应 PR

问题概述：

- Windows Server 2022 默认未启用 LongPathsEnabled。
- `qwenpaw-creator` 长路径触发 `503 STORAGE_INTEGRITY_ERROR`。
- 残留空 decision 目录导致后续重试出现 `409 CAS_CONFLICT`。

建议：

- 在写入前进行路径长度检测。
- 对 Windows 默认路径限制给出明确错误提示。
- 存储失败后进行事务性回滚。
- 对空 decision 目录执行安全清理或幂等覆盖。

---

### P1 / High：OpenAI Responses API 流式事件解析不完整导致会话中断  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/8162  
状态：Open  
是否已有 fix PR：未发现对应 PR

问题概述：

- 用户在 desktop 2.2.2.b4 中遇到会话运行数步后中断。
- 疑似 `_parse_stream_response` 未覆盖完整 Responses API 事件。
- 表现为无提示停止或空响应。

建议：

- 补齐对 `response.output_text.done`、`response.completed`、reasoning、function call 等事件的处理。
- 增加流式事件回放测试。
- 对未识别事件添加诊断日志，而不是静默中断。

---

### P2 / Medium：最终答案渲染为空白气泡  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/8158  
修复 PR：https://github.com/agentscope-ai/QwenPaw/pull/8159  
状态：Issue Closed，PR Closed

问题概述：

- 当模型将 Scroll headline fence 作为独立最终文本块输出时，最终消息内容变为空。
- Console 选择空白消息作为结果，导致实际答案被隐藏。

处理情况：

- PR #8159 已关闭，说明该问题已被处理或合并。
- 修复策略是跳过空文本消息再进行 response grouping。

---

### P2 / Medium：Console chunk 加载失败后的恢复能力不足  
PR：https://github.com/agentscope-ai/QwenPaw/pull/8154  
状态：Open

问题概述：

- lazy chunk 加载失败后，导航返回可能无法恢复。
- Safari/WebView 和 CSS modules 错误检测不稳定。
- 当前 PR 已尝试增加一次性自动重试和诊断能力。

建议：

- 优先 Review 并合并。
- 增加 Safari、iOS WebView、Android WebView 的回归测试。
- 继续观测前端资源加载失败率。

---

### P3 / Low：复制图标尺寸异常  
PR：https://github.com/agentscope-ai/QwenPaw/pull/8157  
状态：Closed

问题概述：

- 用户消息复制图标尺寸被错误替换。
- 已通过包装图标和补充测试修复。

---

## 5. 功能请求与路线图信号

### 西班牙语界面支持  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/8160  
关联 PR：https://github.com/agentscope-ai/QwenPaw/pull/8161

信号判断：

- 很可能进入后续版本规划。
- 当前 PR 已在做 i18n 架构整理和已有语言补齐。
- 新增 Spanish `es` 的阻力正在降低。

潜在影响：

- 扩大拉美、西班牙及全球西语用户覆盖。
- 需要同步维护 Console、Website、Plugin Creator UI、Backend 多处文案。

---

### HarmonyOS NEXT 原生客户端  
PR：https://github.com/agentscope-ai/QwenPaw/pull/8164

信号判断：

- 这是强烈的多端路线图信号。
- PR 体量为 `size/XXXL`，代表项目正在从 Web / Mobile 扩展到更多原生平台。

潜在影响：

- 提升鸿蒙生态覆盖。
- 但也会带来长期维护、测试矩阵和平台适配成本。

---

### Worker 容器内 coding-cli 管理能力  
PR：https://github.com/agentscope-ai/QwenPaw/pull/8156

信号判断：

- 项目正在增强多 Agent / Coding Agent 的生产化运维能力。
- Worker 内的 CLI 模型、配置、运行状态管理将成为后续重点。

注意事项：

- 在安全 Issue #8153 尚未澄清前，新增管理接口必须严格审查鉴权、权限边界和命令执行风险。

---

### Hub 管理中心账号备注  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/8152

链接：https://github.com/agentscope-ai/QwenPaw/issues/8152  
状态：Open

用户希望在 QwenPaw-Hub 管理中心添加账号时支持备注字段，用于记录账号归属、人名或用途。

信号判断：

- 属于小而明确的管理体验增强。
- 实现成本较低，适合作为后续小版本优化项。
- 对团队协作、多账号管理场景有实际价值。

---

## 6. 用户反馈摘要

### 生产部署用户关注安全与可控性

来自 Issue #8153 的反馈显示，部分用户已将项目用于生产环境，并暴露了 MCP Driver 等配置能力。一旦接口权限边界不清晰，后果可能非常严重。

核心痛点：

- 缺少明确的安全边界说明。
- 管理接口是否可以公网暴露不够清晰。
- 出现安全事件后，需要官方排查脚本、IOC 说明和临时缓解方案。

---

### Windows 用户遇到路径与持久化一致性问题

Issue #8163 表明，Windows Server 默认配置下的路径长度限制会影响 qwenpaw-creator 的决策日志写入。

核心痛点：

- Windows 平台兼容性仍存在边缘问题。
- 错误处理不够用户友好。
- 失败后的残留状态会让用户无法通过重试自恢复。

---

### 桌面端用户对“静默失败”容忍度低

Issue #8162 中，用户反馈会话运行几步后突然中断且无提示。这类问题对个人 AI 助手类产品影响明显，因为用户难以判断是模型、网络、API 还是本地客户端问题。

核心痛点：

- 缺少清晰错误提示。
- 流式响应失败缺少诊断信息。
- API 兼容性变化会直接破坏会话体验。

---

### 国际用户正在推动多语言覆盖

Issue #8160 和 PR #8161 显示社区对国际化的关注正在上升。西班牙语需求不仅是翻译请求，也意味着用户期待项目具备更完整的全球化产品体验。

核心痛点：

- 现有语言目录存在漂移。
- 新增语言注册流程需要更集中、更标准化。
- Console、网站、插件 UI、后端文案需要一致覆盖。

---

### 前端体验问题正在被快速修复

Issue #8158、PR #8159、PR #8157、PR #8154 共同表明，前端聊天体验与资源加载稳定性是近期维护重点。

用户不满意点：

- 空白最终答案影响可信度。
- 图标尺寸异常影响细节体验。
- chunk 加载失败影响可用性，尤其在 Safari/WebView 场景。

积极信号：

- 多个 UI / Console 问题已有修复 PR。
- 回归测试正在补强。

---

## 7. 待处理积压

基于今日数据，未看到明确“长期未响应”的旧 Issue 或 PR，但以下项目应进入维护者优先队列：

### 最高优先级：安全 Issue #8153 尚未看到修复 PR  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8153

建议维护者立即处理：

- 标记安全优先级。
- 确认影响范围。
- 若属实，发布临时缓解建议。
- 准备补丁 PR 和安全公告。

---

### 高优先级：Windows 存储一致性问题 #8163  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8163

原因：

- 已有 3 条评论，是今日最活跃 Issue。
- 涉及数据写入失败和重试阻塞。
- 可能影响插件创建流程的可靠性。

---

### 高优先级：OpenAI Responses API 流式解析问题 #8162  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8162

原因：

- 直接导致会话中断。
- 影响桌面端使用体验。
- 可能随着 Responses API 使用扩大而放大影响面。

---

### 待 Review：PR #8154 前端 chunk 错误恢复  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8154

原因：

- 修复 Safari/WebView、lazy chunk、CSS module 等多个稳定性问题。
- 关联两个既有 Issue。
- 对移动端和嵌入式 WebView 体验有明显价值。

---

### 待安全审查：PR #8156 coding-cli Worker 管理接口  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8156

原因：

- 新增管理面会扩大攻击面。
- 当前同时存在 MCP Driver RCE 报告。
- 合并前建议进行权限模型、命令执行路径和审计日志审查。

---

## 总体健康度评估

今日 CoPaw/QwenPaw 项目表现出较高开发活跃度，功能扩展和缺陷修复同步推进。积极信号包括 HarmonyOS 客户端、国际化重构、本地模型推荐更新、Console 稳定性修复等。

但项目当前最大风险集中在安全与可靠性：MCP Driver RCE 报告需要最高优先级响应，Windows 长路径导致的存储一致性问题和 OpenAI Responses API 流式解析问题也应尽快修复。若安全问题能够及时闭环，且几个稳定性 PR 顺利合并，项目整体健康度仍可维持在较好水平。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报｜2026-10-10

## 1. 今日速览

过去 24 小时，ZeroClaw 保持较高开发活跃度：新增/更新 Issues 2 条，PR 更新 12 条，其中 10 条仍待合并，2 条已关闭。今日工作重点集中在 **CI 稳定性、运行时安全、Provider 兼容性、社区入口修复、桌面端稳定性** 等方面。  
从标签分布看，项目当前处于持续工程化治理阶段：大量 PR 涉及 `ci`、`runtime`、`provider`、`security`、`docs`，说明维护者正在降低回归风险并修补边缘场景。  
健康度方面，项目响应较快，但有多个 `risk:high`、`needs-author-action` PR 仍未完成，短期内建议优先处理高风险 Provider 与 ZeroCode 文件路径能力相关变更。今日无新版本发布。

---

## 2. 项目进展

### 已关闭 / 完成处理的 PR

#### PR #11640：文档层面提出 live-session refresh scope pre-filter 的有界例外  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11640  
- 状态：Closed  
- 标签：`docs`, `risk:medium`, `size:XS`  
- 作者：Audacity88  

该 PR 在 `crates/zeroclaw-runtime/AGENTS.md` 中为 #11607 涉及的 live-session refresh scope pre-filter 添加一条有界例外说明。  
它并非直接修改运行时代码，而是对当前实现中的例外路径进行文档化管理，有助于维护者明确哪些技术债是暂时允许的、边界在哪里、后续应如何收敛。

**项目推进意义：**
- 强化运行时变更的设计透明度。
- 降低未来维护者误判 scope pre-filter 行为的风险。
- 对风险中等的临时实现进行显式追踪。

---

#### PR #11631：Dependabot Rust 依赖批量升级，已关闭  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11631  
- 状态：Closed  
- 标签：`dependencies`, `size:XS`  
- 作者：dependabot[bot]  

该 PR 原计划批量升级 Rust 依赖共 22 项，但已关闭。结合新的 Dependabot PR #11636 已打开并覆盖 24 项更新来看，#11631 很可能已被新版依赖升级 PR 取代。

**项目推进意义：**
- 清理过期依赖升级请求。
- 避免重复 Dependabot PR 干扰维护者判断。
- 当前依赖升级工作应转向 #11636。

相关后续 PR：  
- https://github.com/zeroclaw-labs/zeroclaw/pull/11636

---

### 今日仍在推进的重要 PR

#### PR #11644：防止 cron shell 诊断信息泄漏到消息渠道  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11644  
- 状态：Open  
- 标签：`cron`, `runtime`, `tool:cron`  
- 作者：jxxralf  

该 PR 修复定时任务中 `job_type = "shell"` 的安全与隐私问题：此前 shell 命令执行结果中的 `status/stdout/stderr` envelope 可能被直接转发到投递渠道，导致命令文本、stderr 输出或内部环境信息泄漏。

**影响：**
- 这是一个偏安全与运行时稳定性的修复。
- 对使用 cron 执行 shell 任务的用户较重要。
- 建议优先审查并合并。

---

#### PR #11643：CI 使用 Google mirror 拉取 Semgrep 镜像  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11643  
- 状态：Open  
- 标签：`ci`, `docs`, `risk:medium`  
- 作者：JordanTheJet  

该 PR 通过配置 Docker daemon 使用 `mirror.gcr.io`，缓解 Semgrep CI 作业因 Docker Hub 匿名拉取限额耗尽而失败的问题。

**影响：**
- 提升安全扫描 CI 的稳定性。
- 减少非代码质量原因导致的 CI 红灯。
- 对维护者合并效率有直接帮助。

---

#### PR #11642：为 OpenAI-compatible 后端添加 `reasoning_key` override  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11642  
- 状态：Open  
- 标签：`docs`, `config`, `provider`, `provider:compatible`, `size:S`  
- 作者：jxxralf  

该 PR 针对部分 OpenAI-compatible 后端，尤其是某些 vLLM 构建，只接受 `reasoning` 而不是标准 `reasoning_content` 的问题，新增配置层面的 override 能力。

**影响：**
- 改善思考模型与工具调用场景下的 Provider 兼容性。
- 对自托管模型、vLLM 用户、OpenAI API 兼容层用户有明显价值。
- 很可能进入近期版本，因为改动规模较小且需求明确。

---

#### PR #11641：隔离可选渠道 feature tests  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11641  
- 状态：Open  
- 标签：`ci`, `risk:medium`, `size:XS`, `type:ci`  
- 作者：Audacity88  

该 PR 将 WeChat、Matrix、QQ 的 feature-test legs 改为 `--no-default-features`，与已有 Lark 测试隔离方式保持一致。

**影响：**
- 减少无关默认 feature 编译导致的测试污染。
- 提高渠道模块测试的可解释性。
- 有助于快速定位 channel-specific 回归。

---

#### PR #11639：社区 Discord 链接改为项目自有入口  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11639  
- 状态：Open  
- 标签：`docs`, `risk:low`, `size:XS`, `type:docs`  
- 作者：JordanTheJet  

该 PR 修复 README 与 issue form 中失效的 Discord vanity invite，将其替换为项目可控的社区入口 URL。

**影响：**
- 修复新用户无法加入社区的问题。
- 与 Issue #11638 直接相关。
- 风险低，建议尽快合并。

相关 Issue：  
- https://github.com/zeroclaw-labs/zeroclaw/issues/11638

---

#### PR #11637：修正 JPEG 解码前内存估算，避免错误计入 zune-jpeg 未分配的 coefficient planes  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11637  
- 状态：Open  
- 标签：`provider`, `needs-author-action`, `risk:high`, `size:L`  
- 作者：GaijinSystems  

该 PR 针对 JPEG 预解码投影逻辑进行修正，避免为 zune-jpeg 实际不会分配的 coefficient planes 计入内存成本。

**影响：**
- 可能减少错误拒绝或过度保守的资源估算。
- 涉及 Provider 与图片处理路径，风险较高。
- 当前带有 `needs-author-action`，需要作者进一步处理。

---

#### PR #11634：将常规 Rust 工具链升级到 1.99.0  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11634  
- 状态：Open  
- 标签：`ci`, `docs`, `core`, `agent`, `channel`, `config`, `memory`, `provider`, `runtime`, `tool`, `tests`, `scripts`, `dev`, `needs-author-action`, `risk:medium`, `risk:manual`, `size:S`, `type:ci`, `cli`  
- 作者：NiuBlibing  

该 PR 将 GitHub Actions、release、platform、audit、本地 CI 以及生成的 Rust container builders 统一升级到 Rust 1.99.0，并刷新镜像 digest。

**影响：**
- 是基础设施级别升级，影响面广。
- 可提升工具链一致性，但需要审慎验证。
- 当前需要作者行动，建议维护者明确阻塞点。

---

#### PR #11633：ZeroCode 支持从 transcript 打开本地文件路径  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11633  
- 状态：Open  
- 标签：`enhancement`, `distinguished contributor`, `domain:security`, `zerocode`, `risk:high`, `size:L`, `topic:zerocode`  
- 作者：Audacity88  

该 PR 让 ZeroCode 不再只识别 `http(s)://` 链接，也能识别 transcript 中的本地文件路径，解决长行换行后终端链接检测失效的问题。

**影响：**
- 明显提升开发者体验，尤其是从日志或对话中跳转本地文件的场景。
- 但涉及本地文件打开能力，安全风险高。
- 需要严格审查路径解析、权限边界、平台差异与潜在注入问题。

---

## 3. 社区热点

### Issue #11632：Linux/Tauri 桌面端 idle 状态下 WebKitWebProcess 持续重绘，GPU 占用接近 100%  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11632  
- 状态：Open  
- 标签：`bug`, `priority:p2`, `desktop`, `risk:medium`, `web`  
- 评论数：1  
- 反应数：0  
- 作者：doko89  

这是今日最值得关注的用户反馈之一。用户报告在 Linux GNOME/Wayland 环境下，`zeroclaw-desktop` 的 `WebKitWebProcess` 即使空闲也会持续 repaint，导致 GPU render engine 接近 100%。

**背后诉求：**
- 桌面端应在 idle 状态下降低资源使用。
- Linux/Tauri/WebKit 组合可能存在渲染循环、动画、透明窗口、系统托盘或 WebView 状态更新相关问题。
- 用户期待桌面应用具备后台常驻能力，但不能持续消耗 GPU。

**建议：**
- 优先收集复现环境：发行版、GNOME 版本、Wayland/X11、WebKitGTK 版本、Tauri 版本。
- 检查是否存在 requestAnimationFrame、CSS animation、WebView repaint trigger 或 tray 状态轮询。
- 可以考虑提供临时 workaround，例如禁用动画、降低刷新频率或提供 headless/low-power 模式。

---

### Issue #11638：恢复稳定的社区入口  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11638  
- 状态：Open  
- 标签：`docs`, `type:tracker`  
- 评论数：0  
- 反应数：0  
- 作者：JordanTheJet  

该 tracker 指出当前发布的 Discord vanity invite 返回 `Unknown Invite`，而项目多个入口仍在使用该链接。

**背后诉求：**
- 项目需要可控、稳定的社区入口。
- 避免 Discord vanity invite 变化导致 README、网站、issue template、subreddit 等多个公共入口同时失效。
- 对新用户 onboarding、贡献者招募和社区支持渠道影响较大。

相关修复 PR：  
- https://github.com/zeroclaw-labs/zeroclaw/pull/11639

---

## 4. Bug 与稳定性

### P2：Linux 桌面端空闲时 GPU 高占用  
- Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/11632  
- 严重程度：S2 degraded behavior  
- 标签：`bug`, `priority:p2`, `desktop`, `risk:medium`, `web`  
- 状态：Open  
- 是否已有 fix PR：暂无明确对应 PR  

**问题描述：**
在 Linux GNOME/Wayland 环境下，Tauri 桌面应用的 `WebKitWebProcess` 在 idle 状态下仍持续 repaint，导致 GPU render engine 接近 100%。

**影响范围：**
- Linux 桌面用户。
- 长时间后台运行场景。
- 笔记本用户可能受电量、发热、风扇噪声影响。

**建议优先级：高。**  
虽然不是崩溃级问题，但对桌面端常驻体验影响明显，且可能导致用户直接弃用桌面客户端。

---

### Medium：cron shell 输出可能泄漏到消息渠道  
- PR：https://github.com/zeroclaw-labs/zeroclaw/pull/11644  
- 类型：运行时安全修复  
- 状态：Open  
- 是否已有 fix PR：已有，#11644  

**问题描述：**
定时 shell 命令执行结果可能将 `status/stdout/stderr` envelope 泄漏至 delivery channel。

**风险：**
- 命令文本泄漏。
- stderr 中的路径、环境、凭据片段或内部服务信息泄漏。
- 在 bot/channel 集成场景中可能扩大暴露面。

**建议优先级：高。**  
该问题已有明确修复 PR，建议优先 review。

---

### Medium：Semgrep CI 可能因 Docker Hub 匿名拉取限额失败  
- PR：https://github.com/zeroclaw-labs/zeroclaw/pull/11643  
- 类型：CI 稳定性  
- 状态：Open  
- 是否已有 fix PR：已有，#11643  

**问题描述：**
安全扫描 CI 在执行前可能因镜像拉取失败而中断，导致安全扫描结果不可用。

**影响：**
- 并非产品运行时 bug，但会影响项目安全保障链路。
- 容易造成误判为代码变更失败。

---

### Medium：可选 channel feature tests 可能受默认 feature 干扰  
- PR：https://github.com/zeroclaw-labs/zeroclaw/pull/11641  
- 类型：CI / 测试隔离  
- 状态：Open  
- 是否已有 fix PR：已有，#11641  

**问题描述：**
WeChat、Matrix、QQ 测试 legs 可能编译了不相关默认 features，降低测试信号准确性。

**影响：**
- 可能掩盖 channel-specific 问题。
- 增加 CI 编译成本。
- 影响维护者定位问题效率。

---

### High：JPEG 预解码内存估算可能过度计费  
- PR：https://github.com/zeroclaw-labs/zeroclaw/pull/11637  
- 类型：Provider / 图像处理稳定性  
- 状态：Open，`needs-author-action`  
- 是否已有 fix PR：已有，#11637  

**问题描述：**
当前逻辑可能为 zune-jpeg 实际未分配的 coefficient planes 计入成本，导致内存投影不准确。

**影响：**
- 可能造成合法 JPEG 请求被错误拒绝。
- 也可能影响资源限制策略的准确性。
- 改动风险高，需要细致验证 baseline/progressive JPEG 不同路径。

---

## 5. 功能请求与路线图信号

### ZeroCode：支持从 transcript 打开本地文件路径  
- PR：https://github.com/zeroclaw-labs/zeroclaw/pull/11633  
- 状态：Open  
- 标签：`enhancement`, `zerocode`, `domain:security`, `risk:high`, `size:L`  

这是今日最明显的功能增强信号。ZeroCode 希望将 transcript 中的本地文件路径识别为可打开目标，改善开发者从 AI 输出、日志、错误栈中跳转文件的体验。

**纳入下一版本可能性：中等。**
- 用户价值明确。
- 但安全风险较高，可能需要更多 review、测试与权限策略。
- 如果能限定路径协议、确认用户动作、防止自动打开与路径混淆，则有机会进入近期版本。

---

### Provider：OpenAI-compatible 后端 reasoning 字段可配置  
- PR：https://github.com/zeroclaw-labs/zeroclaw/pull/11642  
- 状态：Open  
- 标签：`provider`, `provider:compatible`, `config`, `size:S`  

该 PR 反映出 ZeroClaw 正在增强对 OpenAI-compatible 生态的细粒度兼容，尤其是 vLLM 等自托管推理后端。

**纳入下一版本可能性：较高。**
- 需求清晰。
- 改动规模小。
- 目标用户明确：自托管模型、兼容 API、reasoning 模型、tool-calling 用户。

---

### 社区入口稳定化  
- Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/11638  
- PR：https://github.com/zeroclaw-labs/zeroclaw/pull/11639  

这不是产品功能，但属于社区基础设施路线信号。项目正在从易失效的第三方 vanity invite 转向项目自有 URL，说明维护者开始重视长期可维护的 onboarding 路径。

**纳入下一版本可能性：很高。**
- 风险低。
- 改动小。
- 已有对应 PR。

---

## 6. 用户反馈摘要

### 桌面端用户痛点：后台空闲也高 GPU 占用  
- 来源：https://github.com/zeroclaw-labs/zeroclaw/issues/11632  

用户明确指出 Linux/Tauri 桌面端在 idle 状态下仍触发连续 repaint，导致 GPU render engine 接近满载。这类反馈通常来自较深度用户，因为需要观察系统进程或 GPU 使用情况。

**真实场景：**
- 用户希望 ZeroClaw Desktop 作为系统托盘应用长期运行。
- 即使不主动交互，也希望它保持低资源占用。
- 高 GPU 占用会带来发热、耗电、风扇噪声和系统性能下降。

**不满意点：**
- 桌面端 idle 行为不符合用户对常驻应用的预期。
- Issue 表单中没有明确 desktop component，用户只能选择 `unknown`，这也暴露了 issue 分类体系需要补全。

---

### 新用户/贡献者痛点：Discord 邀请失效  
- 来源：https://github.com/zeroclaw-labs/zeroclaw/issues/11638  
- 修复 PR：https://github.com/zeroclaw-labs/zeroclaw/pull/11639  

用户或维护者发现 Discord vanity invite 返回 `Unknown Invite`。这会直接阻断新用户进入社区的路径。

**真实场景：**
- 用户从 README、issue form 或其他入口尝试加入 Discord。
- 链接失效后，用户无法获得帮助或参与讨论。
- 对开源项目而言，这会降低转化率和贡献率。

**不满意点：**
- 公共入口依赖不可控链接。
- 多处链接分散，维护成本高。

**改进方向：**
- 使用项目自有 join URL。
- 将社区入口集中管理。
- 避免未来 Discord invite 变更时再次全仓搜索替换。

---

## 7. 待处理积压

> 注：本日报仅基于过去 24 小时数据，无法完整识别长期未响应 Issue/PR。以下为当前最需要维护者关注的开放项，主要依据风险标签、阻塞标签和用户影响排序。

### 高优先级：PR #11637 仍需作者处理  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11637  
- 标签：`needs-author-action`, `risk:high`, `size:L`  

该 PR 涉及 JPEG 内存估算逻辑，影响资源限制和 Provider 稳定性。由于风险高且需要作者行动，建议维护者明确 review 反馈、测试要求和合并门槛，避免长期悬挂。

---

### 高优先级：PR #11633 涉及本地文件路径打开能力，需安全审查  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11633  
- 标签：`enhancement`, `domain:security`, `risk:high`, `size:L`  

本地文件路径打开是高价值功能，但同时也是高风险能力。建议维护者重点检查：
- 是否仅在明确用户点击后打开。
- 是否阻止恶意路径伪装。
- 是否处理 Windows/macOS/Linux 路径差异。
- 是否避免远程内容诱导本地文件访问。
- 是否有足够测试覆盖。

---

### 中高优先级：Issue #11632 桌面端 GPU 高占用尚无 fix PR  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11632  

这是当前唯一明确的新 Bug 报告，且影响用户日常使用体验。建议尽快分配维护者复现，或请求用户提供：
- `zeroclaw-desktop` 版本。
- Tauri/WebKitGTK 版本。
- GNOME/Wayland/X11 信息。
- GPU 型号与驱动。
- 是否在隐藏窗口、系统托盘、最小化状态下仍复现。

---

### 中优先级：PR #11634 Rust 1.99.0 工具链升级仍需作者行动  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11634  
- 标签：`needs-author-action`, `risk:medium`, `risk:manual`, `type:ci`  

该 PR 影响面广，覆盖 CI、release、platform、audit、本地开发与容器构建。建议在合并前确保：
- 所有平台 CI 通过。
- release 构建链路验证完成。
- 镜像 digest 与 manifest 一致。
- 下游开发文档同步更新。

---

### 中优先级：PR #11636 Rust 依赖 24 项升级待审查  
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11636  
- 标签：`dependencies`, `risk:medium`, `size:XS`, `type:dependencies`  

该 PR 升级多个 Rust 依赖，包括 `clap`、`tokio` 等基础包。虽然是 Dependabot 自动升级，但依赖范围较广，建议重点关注：
- tokio 行为变化。
- CLI 参数解析变更。
- 测试覆盖是否足以发现异步运行时回归。
- 是否与 Rust 1.99.0 工具链升级 PR 存在交叉影响。

---

## 今日维护建议

1. **优先合并低风险高收益 PR**：如 #11639、#11641、#11643，可快速改善社区入口与 CI 稳定性。  
2. **尽快处理安全/隐私相关修复**：#11644 涉及 shell 输出泄漏，应优先 review。  
3. **为桌面端 GPU 高占用建立复现矩阵**：#11632 可能影响 Linux 桌面体验，需要尽快定位。  
4. **对高风险功能增强设置合并门槛**：#11633、#11637 都有用户价值，但需安全和资源边界审查。  
5. **协调工具链与依赖升级顺序**：#11634 与 #11636 可能相互影响，建议分阶段合并，避免 CI 回归难以归因。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*