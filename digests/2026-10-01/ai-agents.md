# OpenClaw 生态日报 2026-10-01

> Issues: 9 | PRs: 73 | 覆盖项目: 13 个 | 生成时间: 2026-10-01 04:44 UTC

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
**日期：2026-10-01**  
**仓库：** https://github.com/openclaw/openclaw

---

## 1. 今日速览

过去 24 小时 OpenClaw 维持了**非常高的工程活跃度**：Issues 更新 9 条，其中 4 条仍开放、5 条已关闭；PR 更新 73 条，其中 61 条待合并、12 条已合并或关闭。今日工作重心明显集中在 **更新流程可靠性、Gateway/Agent 稳定性、消息投递一致性、移动端体验与构建系统清理**。  
从优先级看，当前仍有 **P0/P1 级别的更新阻塞、崩溃循环、消息丢失、会话状态泄漏** 等问题待处理，说明项目在快速迭代的同时，稳定性压力较高。  
积极信号是：多个高优先级问题已经有对应修复 PR 或清晰的修复路径，例如 Discord/LINE 代码块分片、Windows 更新回滚、Cron 状态误判、Doctor 内存耗尽等。整体健康度可评估为：**开发活跃、响应迅速，但发布稳定性与更新链路仍是当前主要风险区。**

---

## 2. 项目进展

> 今日无新 Release。以下基于过去 24 小时 PR 状态与关闭记录整理。

### 2.1 已关闭 / 已完成的重要 PR

#### PR #162257：清除已过时的发布失败提示  
链接：https://github.com/openclaw/openclaw/pull/162257  
状态：CLOSED  
标签：`app: web-ui`、`gateway`、`P2`、`proof: sufficient`

该 PR 修复了一个用户体验问题：当某次 GitHub 发布失败后，即使后续同一工作已经成功发布并合并，系统仍持续向用户展示旧的失败告警。  
**推进意义：**

- 减少误导性的恢复提示。
- 改善 Web UI 与 Gateway 对发布状态的同步准确性。
- 降低用户对“已完成任务仍显示失败”的困惑。

这是典型的“状态收敛”修复，对协作式 Agent 发布流的可信度有积极影响。

---

#### PR #162357：阻止新增基于真实时间的测试超时竞态  
链接：https://github.com/openclaw/openclaw/pull/162357  
状态：CLOSED  
标签：`scripts`、`docs`、`P3`、`proof: sufficient`

该 PR 针对测试体系中不断增加的真实计时器 race 问题进行治理。描述中指出，相关调用从 2026-09-01 的 123 处增长到 2026-09-26 的 478 处，已成为 CI flaky 的重要来源。  
**推进意义：**

- 降低 CI 不稳定性。
- 约束新测试继续引入 wall-clock timeout。
- 对大型开源项目的长期维护质量有正向作用。

虽然优先级为 P3，但这类基础设施治理能显著改善开发者体验与合并效率。

---

### 2.2 今日仍在推进中的关键 PR

#### PR #162245：修复 Windows 更新因 NTFS lease identity 四舍五入导致回滚  
链接：https://github.com/openclaw/openclaw/pull/162245  
关联问题：可能关联更新失败链路  
标签：`P0`、`merge-risk: compatibility`、`merge-risk: security-boundary`

该 PR 处理 Windows 2026.9.6 updater 向 candidate 传递被四舍五入的 NTFS lease identity，导致首个 live Doctor 阶段回滚的问题。  
**重要性：高。**  
它直接影响 Windows 更新成功率，并涉及兼容性与安全边界。

---

#### PR #162401：修复 newline chunk mode 下 fenced code block 被破坏  
链接：https://github.com/openclaw/openclaw/pull/162401  
关闭问题：https://github.com/openclaw/openclaw/issues/162393  
标签：`size: XS`

该 PR 针对 Discord 和 LINE 场景下长代码块被提前分片的问题。  
**推进意义：**

- 改善 Agent 在聊天渠道中输出代码的可读性。
- 修复 `streaming.chunkMode: "newline"` 与渠道级 fence-aware chunker 的冲突。
- 修复面较小，但用户感知明显。

---

#### PR #162391：Cron 中被阻塞的 scheduled run 不应记录为 ok  
链接：https://github.com/openclaw/openclaw/pull/162391  
标签：`P1`、`merge-risk: message-delivery`、`merge-risk: security-boundary`

该 PR 修复计划任务无法执行任务时仍被记录为成功的问题。  
**推进意义：**

- 提高 scheduled agent run 的状态可信度。
- 避免 `--wait`、运行历史、失败告警被误导。
- 对自动化任务、定期巡检、生产 Agent 可靠性非常关键。

---

#### PR #162307：Android 原生聊天支持 emoji reactions  
链接：https://github.com/openclaw/openclaw/pull/162307  
标签：`app: android`、`P2`、`proof: screenshot`

该 PR 将此前 Web Control UI 中已有的 emoji reaction 能力补齐到 Android 原生聊天端。  
**推进意义：**

- 缩小 Web 与 Android 功能差距。
- 增强共享会话中的轻量反馈能力。
- 属于体验增强型功能，合入概率较高。

---

#### PR #162399：iOS 支持从 session menu snooze 会话  
链接：https://github.com/openclaw/openclaw/pull/162399  
标签：`app: ios`

该 PR 为 iOS 补齐 session snooze 能力，与 Gateway、Web UI、Android 的已有实现对齐。  
**推进意义：**

- 移动端功能一致性继续提升。
- 用户可在 iOS 上将会话暂时搁置，改善会话管理体验。
- 很可能进入下一轮移动端体验更新。

---

## 3. 社区热点

> 由于 PR 评论数在输入数据中显示为 `undefined`，以下主要依据 Issue 评论数、优先级、标签严重性与关联 PR 判断热度。

### 3.1 P0：macOS Gateway shutdown 挂起，阻塞 Mac App 更新  
Issue：https://github.com/openclaw/openclaw/issues/162194  
状态：OPEN  
标签：`P0`、`impact:crash-loop`、`impact:ux-release-blocker`、`maturity:stable`  
评论数：2

该问题描述 macOS arm64 上 Gateway stop/restart 挂起，尤其影响 Mac App 更新流程：`stop → apply → start`。错误涉及：

```text
PluginRuntimeCloseRetainedError
Plugin runtime still owns resources
```

**社区诉求：**

- 更新流程必须能稳定停止 Gateway。
- 插件运行时资源释放需要更可靠的诊断与兜底。
- 这是稳定版用户遇到的发布阻塞级问题，不只是 beta 边缘问题。

**当前风险：高。**  
目前标签显示 `clawsweeper:no-new-fix-pr`、`needs-maintainer-review`、`needs-live-repro`，说明尚未看到明确修复 PR，建议维护者优先跟进。

---

### 3.2 P0：database-schema-preflight 更新失败  
Issue：https://github.com/openclaw/openclaw/issues/162362  
状态：OPEN  
标签：`P0`、`impact:ux-release-blocker`、`clawsweeper:needs-info`  
评论数：1

该问题来自 2026.9.7，平台为 macOS arm64，Node 26.8.1，更新动作涉及 CLI command。  
**社区诉求：**

- 数据库 schema 预检失败需要更明确的错误信息与修复路径。
- 对用户而言，更新失败属于强阻塞体验。
- 当前需要更多信息，说明复现条件还不完整。

**当前风险：高。**  
建议优先收集 schema 状态、迁移版本、CLI update 日志与数据库快照信息。

---

### 3.3 P1：Windows-only DataCloneError 回归导致 webchat 与 heartbeat dispatch 中断  
Issue：https://github.com/openclaw/openclaw/issues/162373  
状态：CLOSED  
标签：`P1`、`impact:message-loss`  
评论数：1

该问题影响 2026.9.7 的 Windows 平台，报告称 webchat 与 heartbeat dispatch 路径完全 broken，并标注为 root-caused & locally patched。  
**社区诉求：**

- Windows 平台消息通道不能发生平台特异性回归。
- webchat 与 heartbeat 属于核心通信路径，故影响严重。
- 用户希望回归测试覆盖结构化克隆 / dispatch 兼容性。

**当前状态：已关闭。**  
说明已有处理或合并路径，但日报数据中未直接列出对应 PR，建议在 release note 中明确说明修复版本。

---

### 3.4 P1：Terminal sub-agent suspended delivery 导致 parent active slot 泄漏  
Issue：https://github.com/openclaw/openclaw/issues/162267  
状态：OPEN  
标签：`P1`、`impact:session-state`、`issue-rating: diamond lobster`  
评论数：2

该问题指出：已完成的 sub-agent run 如果 completion delivery 因 expiry 进入 `suspended`，会在 7 天保留期内持续占用父 agent 的 pending descendant 计数，造成 `maxChildrenPerAgent` slot 泄漏。  
**社区诉求：**

- 子 Agent 完成后应及时释放父级并发/配额占用。
- suspended delivery 不应等同于仍在运行。
- 长保留期导致问题被放大，尤其影响多 Agent 编排场景。

**当前状态：OPEN，但标签显示 `fix-shape-clear` 与 `queueable-fix`。**  
这表明修复方向清晰，适合尽快排入队列。

---

### 3.5 P2：newline chunk mode 破坏 Discord/LINE 长代码块  
Issue：https://github.com/openclaw/openclaw/issues/162393  
PR：https://github.com/openclaw/openclaw/pull/162401  
状态：Issue OPEN，Fix PR OPEN  
标签：`P2`、`impact:ux-friction`、`diamond lobster`  
评论数：2

用户报告当 `streaming.chunkMode: "newline"` 开启时，长 fenced code block 会在渠道 fence-aware chunker 运行前被提前拆开，导致 Discord 和 LINE 中某些消息从代码中间开始且缺失开 fence。  
**社区诉求：**

- Agent 输出代码时应保证 Markdown 结构完整。
- 多渠道适配不能被上游通用 chunk 逻辑破坏。
- 对开发者类用户而言，这是高频可见体验问题。

**当前状态：已有小型修复 PR，合入阻力应较低。**

---

## 4. Bug 与稳定性

### 严重程度排序

#### P0 / Release Blocker

##### 1. Gateway shutdown 挂起，阻塞 Mac App 更新  
Issue：https://github.com/openclaw/openclaw/issues/162194  
状态：OPEN  
是否有 fix PR：未在数据中看到明确对应 PR  
影响范围：

- macOS arm64
- Gateway stop/restart
- Mac App 更新流程
- 插件运行时资源释放

建议优先级：**最高**。  
这是稳定版、更新链路、插件 runtime 三者交叉的问题，若不处理会直接影响用户升级。

---

##### 2. database-schema-preflight 更新失败  
Issue：https://github.com/openclaw/openclaw/issues/162362  
状态：OPEN  
是否有 fix PR：未看到明确 fix PR  
影响范围：

- macOS arm64
- CLI update
- 数据库 schema 预检

建议优先级：**最高**。  
需要尽快补齐诊断信息；如果是 migration preflight 的误判，应考虑短期 hotfix。

---

#### P1 / 高影响稳定性问题

##### 3. Windows-only DataCloneError 回归导致消息丢失  
Issue：https://github.com/openclaw/openclaw/issues/162373  
状态：CLOSED  
是否有 fix PR：数据中未直接展示  
影响范围：

- Windows
- webchat
- heartbeat dispatch
- 2026.9.7

该问题已经关闭，但由于影响路径涉及消息发送和心跳，建议确认修复已进入可发布分支，并补充回归测试。

---

##### 4. Sub-agent completion suspended delivery 造成 active slot 泄漏  
Issue：https://github.com/openclaw/openclaw/issues/162267  
状态：OPEN  
是否有 fix PR：未看到直接 PR，但标签显示可队列化修复  
影响范围：

- sub-agent 调度
- session state
- `maxChildrenPerAgent`
- 长达 7 天的资源占用错误

该问题会让用户误以为 agent 仍活跃，导致新子任务被拒绝或排队，是 Agent 编排系统中的重要一致性问题。

---

##### 5. Codex harness exec auto-review 缺失 conversation transcript  
Issue：https://github.com/openclaw/openclaw/issues/162346  
状态：CLOSED  
是否有 fix PR：未在列表中看到明确 PR  
标签：`P1`、`impact:security`、`needs-security-review`

问题摘要显示，在 `tools.exec.mode: "auto"` 下，Codex app-server harness 的 exec auto-review 没有拿到 conversation transcript，导致 owner-requested commands 被 reviewer 误判并拒绝。  
影响点：

- 自动执行审核
- operator origin 判断
- 安全边界与可用性之间的平衡

该问题已关闭，但带有安全审查标签，建议维护者在安全 changelog 中记录原因和处理方式。

---

#### P2 / 中等影响问题

##### 6. Newline chunk mode 破坏 Discord/LINE fenced code block  
Issue：https://github.com/openclaw/openclaw/issues/162393  
PR：https://github.com/openclaw/openclaw/pull/162401  
状态：Issue OPEN，Fix PR OPEN  
影响范围：

- Discord
- LINE
- streaming newline chunk mode
- Markdown 代码块展示

这是用户体验问题，但对开发者用户尤其明显。已有修复 PR，建议快速 review。

---

##### 7. Update failure: reconcile:abandoned  
Issue #161761：https://github.com/openclaw/openclaw/issues/161761  
Issue #161721：https://github.com/openclaw/openclaw/issues/161721  
状态：均 CLOSED  
影响范围：

- OpenClaw 2026.9.6 / 2026.9.7
- Windows x64 与 macOS arm64
- Gateway RPC update flow

两个更新失败报告均已关闭，说明维护者已处理或归档。由于近期更新问题密集出现，建议把 update failure 系列进行统一归因分析。

---

## 5. 功能请求与路线图信号

### 5.1 Android Internal testing builds 通过 Firebase 分发  
Issue：https://github.com/openclaw/openclaw/issues/162370  
状态：CLOSED  
标签：`P2`、`linked-pr-open`

需求内容：当前 Android daily workflow 已经向 Google Play Internal testing 发布 signed phone 和 Wear AAB，希望同时通过 Firebase App Distribution 分发相同 artifacts，并使用现有 Android Daily group 实现自助加入和新版本邮件提醒。  
**路线图信号：**

- Android 测试分发链路正在增强。
- 项目重视 daily build 的可达性和测试者反馈效率。
- 标签显示已有关联 PR，进入下一版本或近期 CI/CD 改进的概率较高。

---

### 5.2 Android 原生聊天支持 emoji reactions  
PR：https://github.com/openclaw/openclaw/pull/162307  
状态：OPEN  
标签：`app: android`、`P2`

这是 Web 已有能力向 Android 补齐的典型功能。  
**可能进入下一版本的概率：高。**  
已有截图证明，且属于体验增强而非核心架构变更。

---

### 5.3 iOS session snooze  
PR：https://github.com/openclaw/openclaw/pull/162399  
状态：OPEN  
标签：`app: ios`

与 Gateway、Web UI、Android snooze 支持保持一致。  
**路线图信号：**

- OpenClaw 正在推动跨端会话管理能力一致化。
- 移动端不再只是消息入口，而逐步具备完整 session lifecycle 控制能力。

---

### 5.4 Telegram dashboard command 冲突修复  
PR：https://github.com/openclaw/openclaw/pull/162395  
状态：OPEN  
标签：`channel: telegram`

该 PR 修复 Telegram 原生 `/dashboard` 命令遮蔽 owner-only Dashboard Mini App launcher 的问题，同时保留 `/session_dashboard` 的授权语义。  
**路线图信号：**

- 多渠道命令系统需要更精细的命名与权限协调。
- Telegram Mini App 是项目继续投入的渠道能力之一。

---

### 5.5 构建时生成 native protocol models  
PR：https://github.com/openclaw/openclaw/pull/162251  
状态：OPEN  
标签：`app: android`、`app: macos`、`app: web-ui`、`gateway`、`dependencies-changed`

该 PR 试图避免在 schema 变更时提交 34,328 行生成的 Swift/Kotlin 代码。  
**路线图信号：**

- 项目正在减少 generated code 入库规模。
- Native clients 与 Gateway protocol schema 的维护流程将进一步自动化。
- 这类变更有较大工程收益，但涉及多端构建链路，合并风险中等偏高。

---

## 6. 用户反馈摘要

### 6.1 更新失败仍是用户最主要痛点

今日多个 Issue 都与更新失败相关：

- https://github.com/openclaw/openclaw/issues/162194
- https://github.com/openclaw/openclaw/issues/162362
- https://github.com/openclaw/openclaw/issues/161761
- https://github.com/openclaw/openclaw/issues/161721
- https://github.com/openclaw/openclaw/pull/162245
- https://github.com/openclaw/openclaw/pull/162327
- https://github.com/openclaw/openclaw/pull/162344
- https://github.com/openclaw/openclaw/pull/162383

用户的真实痛点包括：

- 更新流程中 Gateway 停不下来。
- 数据库 schema 预检失败但缺少可操作解释。
- Windows/macOS 平台均有更新失败报告。
- 老版本 updater driver 与新 candidate 之间兼容性问题频繁暴露。
- 回滚、快照、Doctor、plugin runtime 之间的耦合度较高，导致失败点较多。

整体来看，OpenClaw 的自更新能力是项目成熟度的关键短板之一。

---

### 6.2 多渠道消息投递体验仍需打磨

相关条目：

- Discord/LINE fenced code block 破坏：https://github.com/openclaw/openclaw/issues/162393
- Telegram dashboard command 冲突：https://github.com/openclaw/openclaw/pull/162395
- Agent progress message 重复：https://github.com/openclaw/openclaw/pull/162367
- Cron blocked run 被记录为 ok：https://github.com/openclaw/openclaw/pull/162391

用户反馈显示，OpenClaw 的多渠道能力已经进入复杂场景：

- 不同渠道有不同消息长度、Markdown、命令系统和权限模型。
- 通用层的 chunk、状态记录、命令分发可能与渠道特性冲突。
- 用户期待 Agent 输出在 Discord、LINE、Telegram 等渠道中保持一致且正确。

---

### 6.3 Agent 编排和子任务生命周期一致性是高频关注点

相关条目：

- https://github.com/openclaw/openclaw/issues/162267
- https://github.com/openclaw/openclaw/pull/161788
- https://github.com/openclaw/openclaw/pull/162398
- https://github.com/openclaw/openclaw/pull/161811

用户痛点包括：

- sub-agent 已完成但仍占用 active slot。
- session 经 restart recovery 恢复后，subagent completion 重试持续失败。
- rate limit 后没有及时切换可用 auth profile。
- cron fallback turn 因 session auth pin 属于另一 provider 而失败。

这些问题反映出 OpenClaw 的 Agent 系统正在处理更复杂的生产级编排场景：多 provider、多 auth profile、多子任务、多恢复路径。

---

### 6.4 移动端用户期待与 Web 端体验一致

相关 PR：

- Android reactions：https://github.com/openclaw/openclaw/pull/162307
- iOS snooze：https://github.com/openclaw/openclaw/pull/162399
- Android daily Firebase 分发：https://github.com/openclaw/openclaw/issues/162370

用户和维护者正在补齐移动端体验差距：

- Android 需要显示和发送 emoji reactions。
- iOS 需要支持会话 snooze。
- 测试用户需要更方便获取 daily builds。

这表明移动端已从“辅助入口”转向“核心客户端”。

---

## 7. 待处理积压

> 输入数据主要覆盖过去 24 小时更新，无法完整判断“长期未响应”。以下列出当前仍开放且优先级较高、需要维护者重点关注的积压项。

### 7.1 P0：Gateway shutdown hangs on plugin-runtime children  
Issue：https://github.com/openclaw/openclaw/issues/162194  
状态：OPEN  
风险：发布阻塞、更新失败、崩溃循环  
建议：

- 尽快获取 live repro。
- 增加 plugin runtime resource ownership 诊断日志。
- 评估是否需要强制 cleanup fallback。
- 若影响稳定版更新，应考虑 hotfix 分支。

---

### 7.2 P0：Update failure: database-schema-preflight  
Issue：https://github.com/openclaw/openclaw/issues/162362  
状态：OPEN  
风险：用户无法升级  
建议：

- 请求用户补充 schema migration 日志与本地数据库版本。
- 明确 preflight failure 是否可恢复。
- 若是误判，优先修复 Doctor / update preflight 逻辑。

---

### 7.3 P1：Terminal sub-agent suspended delivery slot leak  
Issue：https://github.com/openclaw/openclaw/issues/162267  
状态：OPEN  
风险：Agent 子任务槽位泄漏，影响多 Agent 并发  
建议：

- 区分“delivery suspended”与“run still active”。
- completion terminal state 应释放 parent pending descendant 计数。
- 为 7 天 suspended retention 场景补测试。

---

### 7.4 P1：Cron blocked scheduled runs recorded as ok  
PR：https://github.com/openclaw/openclaw/pull/162391  
状态：OPEN  
风险：自动化任务静默失败  
建议：

- 优先 review message-delivery 与 security-boundary 相关风险。
- 明确 failed / blocked / skipped / ok 的状态语义。
- 补充 run history、`--wait`、alert path 的集成测试。

---

### 7.5 P0：Windows rollback from rounded lease identities  
PR：https://github.com/openclaw/openclaw/pull/162245  
状态：OPEN  
风险：Windows 更新回滚  
建议：

- 尽快补齐 proof。
- 验证 2026.9.6 updater 与新 candidate 的兼容矩阵。
- 对 NTFS identity bigint / rounded handoff 增加回归测试。

---

### 7.6 P1：Doctor 大规模 agent fleet 内存耗尽  
PR：https://github.com/openclaw/openclaw/pull/162394  
状态：OPEN  
关联 Issue：https://github.com/openclaw/openclaw/issues/161869  
风险：大型部署下 Doctor heap exhaustion  
建议：

- 优先验证大型 agent fleet 场景。
- 检查 provider registration 共享是否存在隔离性风险。
- 合并前需要确保 availability 风险可控。

---

## 总体健康度评估

OpenClaw 今日表现出非常强的开发动能：73 条 PR 更新说明维护者和贡献者正在密集推进修复、体验改进和工程治理。但从问题结构看，项目当前最大的风险集中在三条主线：

1. **更新系统可靠性**：rollback、schema preflight、Gateway shutdown、snapshot/backup 绑定等问题较多。  
2. **Agent 生命周期一致性**：sub-agent、cron、auth profile、restart recovery 等复杂状态路径仍在暴露边界问题。  
3. **多端多渠道体验一致性**：Discord/LINE/Telegram、Android/iOS/Web 的能力差异正在被快速修补。

短期建议维护者优先保障 **P0 更新阻塞问题** 与 **P1 消息/Agent 状态一致性问题**，同时保持移动端体验增强和测试基础设施治理的节奏。整体来看，项目处于**高速迭代但稳定性压力较高**的阶段，若本轮更新链路修复顺利合入，下一版本的用户可感知可靠性有望明显提升。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向分析报告  
**日期：2026-10-01**

---

## 1. 生态全景

个人 AI 助手与自主智能体开源生态今日呈现出明显的“两极分化”：头部项目如 **OpenClaw、Hermes Agent、ZeroClaw、CoPaw** 保持高频 Issue/PR 活动，正在快速推进多端、多渠道、插件化和 Agent 生命周期治理；而 PicoClaw、NullClaw、LobsterAI 等项目则以小规模功能推进或定点修复为主。  
整体技术焦点已经从“能运行 Agent”转向 **生产级可靠性、安全边界、多 Provider 兼容、多端体验一致性和复杂任务编排**。  
多个项目同时暴露出更新链路、会话状态、消息投递、权限控制和插件/工具调用安全问题，说明该生态正进入从实验性工具向长期运行型 AI 助手平台演进的关键阶段。  
OpenClaw 仍是工程活跃度和系统复杂度最高的代表之一，但也面临最明显的稳定性压力。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 今日重点 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 9 | 73 | 无 | 更新可靠性、Gateway/Agent 稳定性、多渠道消息、移动端体验 | **高活跃，高压力**：响应快，但 P0/P1 更新阻塞与状态一致性问题突出 |
| **NanoBot** | 1 | 10 | 无 | Agent 运行时、WebUI 流式渲染、Provider 代理、安全边界 | **中高活跃，质量收敛中**：问题集中但修复节奏快 |
| **Hermes Agent** | 50 | 50 | 无 | Desktop 会话、CLI/安装更新、Gateway 安全、Provider 兼容 | **极高活跃，高风险积压**：社区反馈密集，安全与稳定性压力较大 |
| **PicoClaw** | 0 | 1 | 无 | Web UI 多通道会话侧边栏 | **低活跃，功能推进中**：无明显稳定性负面信号 |
| **NanoClaw** | 0 | 7 | 无 | Telegram 修复、Runner 扩展、Copilot Provider | **中等活跃，修复导向**：PR 待审较多，通道稳定性改善明显 |
| **NullClaw** | 0 | 1 | 无 | Cheaper Inference Provider 接入 | **低活跃，低风险**：主要是 Provider 生态扩展 |
| **IronClaw** | 0 | 0 | 无 | 无活动 | **休眠/低活跃** |
| **LobsterAI** | 1 | 3 | 无 | NIM P2P 安全策略、OpenClaw 模型路由 | **中低活跃，安全修复优先**：存在 fail-open 风险，已有修复 PR |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | **休眠/低活跃** |
| **Moltis** | 0 | 0 | 无 | 无活动 | **休眠/低活跃** |
| **CoPaw** | 7 | 17 | **v2.2.2-beta.4** | Provider 兼容、MCP、Console、后台任务、安全加固 | **高活跃，Beta 打磨期**：发布节奏快，边界问题集中暴露 |
| **ZeptoClaw** | 0 | 0 | 无 | 无活动 | **休眠/低活跃** |
| **ZeroClaw** | 10 | 50 | 无 | Gateway/Core 拆分、RPC、插件、daemon、CI 稳定性 | **极高活跃，评审积压明显**：架构演进强，但合并吞吐不足 |

---

## 3. OpenClaw 在生态中的定位

### 3.1 核心定位

OpenClaw 当前是生态中最接近“全栈个人 AI 助手平台”的项目之一，覆盖：

- Gateway / Agent runtime；
- Web UI、Android、iOS、macOS、Windows；
- Discord、LINE、Telegram 等多渠道；
- Cron、sub-agent、session lifecycle；
- 自更新、Doctor、发布与回滚机制。

相比 NanoBot、NullClaw 这类更偏框架或 Provider 扩展的项目，OpenClaw 明显承担了更完整的产品化链路。

### 3.2 优势

1. **工程活跃度最高之一**  
   今日 73 条 PR 更新，仅次于或高于多数同类项目，说明维护者和贡献者规模较大。

2. **多端覆盖能力强**  
   Android reactions、iOS snooze、Web UI、Gateway 同步推进，移动端不再只是附属入口。

3. **多渠道 Agent 能力成熟度较高**  
   Discord、LINE、Telegram、Cron、Webhook、scheduled run 等路径均有实际使用反馈。

4. **问题响应快**  
   多个 Issue 已有对应修复 PR，例如 Discord/LINE fenced code block、Cron 状态误判、Windows 更新回滚等。

### 3.3 短板与风险

OpenClaw 最大风险集中在 **发布与更新链路**：

- macOS Gateway shutdown 挂起阻塞更新；
- database-schema-preflight 更新失败；
- Windows NTFS lease identity 导致回滚；
- Doctor、snapshot、rollback、plugin runtime 耦合复杂。

相比 Hermes Agent 和 ZeroClaw，OpenClaw 的更新系统问题更集中、更影响普通终端用户体验。  
相比 CoPaw，OpenClaw 的发布链路更复杂，稳定性压力也更高。

### 3.4 社区规模对比

| 项目 | 今日活跃度特征 | 社区状态 |
|---|---|---|
| OpenClaw | 9 Issues / 73 PR | 工程贡献密集，维护响应快 |
| Hermes Agent | 50 Issues / 50 PR | 用户反馈极活跃，问题发现充分 |
| ZeroClaw | 10 Issues / 50 PR | 架构开发密集，PR 队列堆积 |
| CoPaw | 7 Issues / 17 PR / 1 Release | Beta 发布活跃，兼容性反馈集中 |
| NanoBot | 1 Issue / 10 PR | 小而快的质量修复节奏 |

OpenClaw 的 PR 活跃度处于第一梯队，但 Issue 数低于 Hermes Agent，说明其社区反馈密度略低于 Hermes，但工程推进强度更高。

---

## 4. 共同关注的技术方向

### 4.1 Agent 生命周期与会话状态一致性

涉及项目：

- **OpenClaw**：sub-agent suspended delivery 占用 parent slot；Cron blocked run 被记录为 ok。
- **NanoBot**：runner 恢复后仍报告失败；completed turn 被迟到事件重新激活。
- **Hermes Agent**：Desktop final answer 重复渲染；stale-send guard 阻止多 session 发送。
- **CoPaw**：后台 Agent 任务完成后记录丢失、空 final response。
- **ZeroClaw**：skill review / creation 不覆盖 channel、webhook、gateway turns。

共同诉求：

- 明确 terminal state；
- 区分 delivery 状态与 run 状态；
- 保证 parent-child agent 资源释放；
- 支持多入口、多 session、多 Agent 的一致状态模型。

---

### 4.2 多 Provider 与 OpenAI-compatible 生态扩展

涉及项目：

- **NanoBot**：所有 provider 支持 scoped proxy。
- **Hermes Agent**：Gemini 深层 JSON tool result 兼容；xAI base URL 凭据校验风险。
- **NanoClaw**：GitHub Copilot Provider。
- **NullClaw**：Cheaper Inference OpenAI-compatible gateway。
- **CoPaw**：OpenAI-compatible Responses Provider prompt cache 参数；Anthropic cache token 统计。
- **ZeroClaw**：llama.cpp/custom provider URL/URI 问题。
- **LobsterAI**：自定义模型 plan routing；默认模型输出上限。

共同诉求：

- Provider capability 声明更细；
- 兼容第三方网关、聚合器和本地模型；
- 避免凭据泄露到非可信 base URL；
- 更准确的 token、cache、context 统计。

---

### 4.3 多渠道消息投递与平台适配

涉及项目：

- **OpenClaw**：Discord/LINE 代码块分片；Telegram dashboard 命令冲突。
- **NanoClaw**：Telegram MarkdownV2 fallback、forum topic threads、service message 过滤。
- **Hermes Agent**：Feishu interactive card 入站退化；WhatsApp failed-turn suppression 失效。
- **CoPaw**：MCP streamable_http 兼容、Console 503。
- **ZeroClaw**：Matrix/webhook/gateway turns 未触发技能学习。

共同诉求：

- 平台格式差异要在 adapter 层可靠处理；
- Markdown、thread、command、interactive card、warning suppression 需要渠道级语义；
- 多入口应共享同一 Agent 行为，而不是入口特化导致能力缺失。

---

### 4.4 安全边界与权限控制

涉及项目：

- **NanoBot**：空工具注册表被默认工具覆盖；Linear stale member access。
- **Hermes Agent**：URL userinfo 脱敏不完整；reply image URL 可能被 prompt injection 用于外带；xAI credential base URL 校验。
- **NanoClaw**：Copilot token 经 credential gateway 保管。
- **LobsterAI**：NIM P2P policy fail open。
- **CoPaw**：skill_name path traversal；Office COM 自动化保护。
- **ZeroClaw**：插件工具名抢占；daemon identity verification；approval fail-closed 语义。

共同诉求：

- 默认应 fail closed；
- 工具权限、插件注册、Provider 凭据、debug dump 均需 provenance 和边界校验；
- Agent 越具备执行能力，安全模型越需要细粒度化。

---

### 4.5 安装、更新与运行时兼容性

涉及项目：

- **OpenClaw**：macOS/Windows 更新阻塞、schema preflight、Doctor、rollback。
- **Hermes Agent**：POSIX launcher、Python 3.11/3.14、Windows 路径含空格、update restart drain。
- **CoPaw**：beta 发布后 Provider、MCP、后台任务兼容性问题。
- **ZeroClaw**：daemon endpoint、desktop readiness、RPC version handshake。

共同诉求：

- 更新过程要可诊断、可回滚、不中断任务；
- runtime version、Python/Node/native helper 依赖需要隔离；
- desktop、CLI、daemon、gateway 启动语义要统一。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构特征 |
|---|---|---|---|
| **OpenClaw** | 全栈个人 AI 助手、多端、多渠道、Agent 编排 | 个人用户、高级自动化用户、跨端使用者 | Gateway + Agent runtime + 多端客户端 + 自更新体系 |
| **NanoBot** | 轻量 Agent runtime、WebUI、Provider 配置、安全权限 | 开发者、私有部署用户、Agent 框架使用者 | 较聚焦的 Agent runner + WebUI + Provider 抽象 |
| **Hermes Agent** | Desktop/CLI/Gateway 深度集成、插件、Provider、工具链 | 重度桌面用户、终端用户、开发者 | Desktop 多 session + CLI/SSH backend + Gateway + Plugin Catalog |
| **PicoClaw** | Web UI 多会话体验 | Web 控制台用户、小规模团队 | Web-first，会话侧边栏和多 channel UI 演进 |
| **NanoClaw** | Telegram 通道、Runner 扩展、Copilot Provider | Telegram 群组用户、开发者 Agent 用户 | Channel bridge + Agent runner + Provider/skill 扩展 |
| **NullClaw** | Provider 生态扩展、OpenAI-compatible 网关 | 成本敏感用户、多模型用户 | Provider 接入模式简洁，低频扩展 |
| **LobsterAI** | OpenClaw 集成、模型路由、IM 安全 | 中文/国内 IM 用户、协作场景用户 | Electron/main/renderer + OpenClaw/cowork + NIM |
| **CoPaw** | Beta 功能集成、MCP、Console、多 Provider、多 Agent | 早期试用者、Agent 平台开发者 | Console + Provider adapter + MCP + 后台 Agent 任务 |
| **ZeroClaw** | 架构拆分、RPC、daemon、插件/WASM、技能系统 | 系统开发者、插件开发者、平台型用户 | Core/Gateway/daemon/RPC/WASM plugin 架构化演进 |

简要判断：

- **OpenClaw** 更像完整产品平台；
- **Hermes Agent** 更偏桌面/CLI 强交互个人助手；
- **ZeroClaw** 更偏底层架构和插件化平台；
- **CoPaw** 处于 beta 快速集成与兼容性打磨期；
- **NanoBot / NanoClaw / NullClaw** 更偏垂直能力或轻量框架扩展；
- **PicoClaw** 当前聚焦 UI 工作台化。

---

## 6. 社区热度与成熟度

### 6.1 第一梯队：快速迭代且高复杂度

| 项目 | 特征 |
|---|---|
| **OpenClaw** | PR 数最高，产品面广，更新系统和 Agent 状态压力明显 |
| **Hermes Agent** | Issue 与 PR 均极高，用户反馈最密集，安全和 Desktop 多 session 问题突出 |
| **ZeroClaw** | PR 数高但无合并，架构迁移和插件化密集推进，评审积压风险高 |
| **CoPaw** | 有 beta release，Issue/PR 对应关系紧密，兼容性和安全修复活跃 |

这些项目已经进入“真实用户复杂场景驱动”的阶段，问题不再集中于基础功能，而是出现在更新、权限、上下文、Provider、插件、会话一致性等深水区。

### 6.2 第二梯队：质量巩固与局部扩展

| 项目 | 特征 |
|---|---|
| **NanoBot** | PR 质量较集中，安全权限、WebUI、Agent runtime 修复明确 |
| **NanoClaw** | Telegram 与 Provider 扩展明显，当前待审 PR 较多 |
| **LobsterAI** | 活跃度不高但问题关键，NIM fail-open 修复需优先 |
| **PicoClaw** | 功能推进单点集中，社区讨论较少 |
| **NullClaw** | Provider 扩展低频进行，稳定性风险较低 |

这些项目当前更偏“有针对性的功能增强或修复”，尚未呈现大规模社区反馈压力。

### 6.3 低活跃 / 休眠项目

- IronClaw
- TinyClaw
- Moltis
- ZeptoClaw

这些项目过去 24 小时无活动，短期内不构成生态技术方向的主要变量。

---

## 7. 值得关注的趋势信号

### 7.1 Agent 产品正在从“聊天入口”转向“多入口任务操作系统”

多个项目同时处理 Desktop、CLI、Webhook、IM、Cron、Mobile、Gateway、MCP 等入口的一致性问题。  
对开发者的启示是：Agent runtime 不能假设只有一个前端入口，必须设计统一的 turn pipeline、session ownership 和 lifecycle 语义。

代表项目：

- OpenClaw：Cron、sub-agent、mobile、channels；
- Hermes Agent：Desktop/CLI/SSH/Gateway；
- ZeroClaw：CLI/channel/webhook/gateway turns；
- CoPaw：Console/MCP/后台 Agent。

---

### 7.2 Provider 兼容性成为核心竞争力

OpenAI-compatible 已成为事实标准，但实际生态中存在大量差异：

- prompt cache 参数；
- token usage 格式；
- file/media block；
- JSON depth；
- base URL 安全；
- proxy、OAuth、native backend 差异。

未来优秀 Agent 框架需要具备：

- Provider capability registry；
- per-provider request sanitizer；
- credential origin validation；
- context/token/cost normalization。

代表项目：

- CoPaw、Hermes Agent、NanoBot、NullClaw、NanoClaw、ZeroClaw、LobsterAI。

---

### 7.3 插件和工具系统进入安全审计期

插件、工具调用、Office COM、browser vault、file write、Copilot token、image URL fetch 等都开始暴露边界风险。  
这说明 Agent 框架从“调用工具”走向“安全调用工具”，需要更系统的权限模型：

- 工具名全局唯一；
- 插件注册冲突检测；
- 凭据不进入容器或日志；
- debug dump 默认脱敏；
- 外部资源下载需 provenance；
- fail closed 优于 fail open。

代表项目：

- ZeroClaw、Hermes Agent、NanoBot、NanoClaw、CoPaw、LobsterAI。

---

### 7.4 会话状态和后台任务可靠性成为平台成熟度指标

多 Agent、sub-agent、background task、scheduled run、session snooze、stale-send guard、completed turn terminal state 等问题大量出现。  
这表明 Agent 平台成熟度不再只看模型能力，而要看：

- 任务是否可追踪；
- 子任务是否释放资源；
- 失败是否准确上报；
- UI 与数据库状态是否一致；
- 后台结果是否可恢复。

代表项目：

- OpenClaw、CoPaw、Hermes Agent、NanoBot、ZeroClaw。

---

### 7.5 自更新和本地 runtime 运维仍是桌面 Agent 的短板

OpenClaw 与 Hermes Agent 均集中暴露安装、更新、runtime、daemon、Python/Node/native helper、Windows path、macOS shutdown 等问题。  
对技术决策者而言，选择桌面型 Agent 项目时，应重点评估：

- 更新失败是否可恢复；
- 是否有 Doctor / preflight / rollback；
- 是否支持长任务 drain；
- 是否能处理 Windows/macOS/Linux 差异；
- 是否有清晰 release note 和 hotfix 节奏。

代表项目：

- OpenClaw、Hermes Agent、ZeroClaw、CoPaw。

---

## 总体结论

当前开源个人 AI 助手 / 自主智能体生态正在进入 **生产化转折点**。  
头部项目已经不再竞争“是否能接入模型、是否能调用工具”，而是在竞争：

1. 多端多入口的一致体验；
2. Provider 与模型网关兼容能力；
3. 工具、插件、凭据和调试链路安全；
4. Agent 生命周期和后台任务可靠性；
5. 安装更新与本地 runtime 运维能力。

**OpenClaw** 在生态中处于高活跃、全栈化、产品化领先的位置，但短期应优先解决 P0 更新阻塞和 P1 状态一致性问题。  
**Hermes Agent、ZeroClaw、CoPaw** 是另外三个值得密切关注的高活跃项目，分别代表桌面/CLI 个人助手、插件化架构平台、Beta 集成型 Agent Console 的不同演进路线。  
对开发者而言，未来选型不应只看模型接入数量，而应重点考察 **状态一致性、安全边界、Provider 适配层、更新可靠性和多入口架构设计**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报｜2026-10-01

## 1. 今日速览

过去 24 小时 NanoBot 活跃度较高，共有 **1 条 Issue 更新**、**10 条 PR 更新**，其中 **5 条 PR 仍待合并**、**5 条已关闭/完成处理**。今日工作重心明显集中在 **Agent 运行时稳定性、WebUI 流式渲染、权限/安全边界、Provider 网络代理配置** 等方面。  
从标签看，多个 PR 带有 `bug`、`regression`、`security`、`test`、`priority: p2`，说明项目当前处于较密集的缺陷修复与回归收敛阶段。社区侧今日 Issue 数量不多，但唯一 Issue 已关闭，显示维护响应较快。整体健康度评价：**维护活跃、修复节奏快，但近期回归与边界条件问题较集中，需要关注合并前测试覆盖与发布稳定性**。

---

## 2. 项目进展

今日无新版本发布。

### 已关闭 / 已完成的重要 PR

#### 1. Agent 会话取消机制改进  
- PR：[#5993 refactor(agent): scope tool resources to session cancellation](https://github.com/HKUDS/nanobot/pull/5993)  
- 状态：Closed  
- 作者：chengyongru  

该 PR 将用户停止 session 时的取消信号扩展到该 session 拥有的运行时资源，包括：

- 活跃工具调用
- detached subagents
- shell / CLI 进程树
- pending reply timers

这项改动有助于避免用户停止任务后仍有后台工具、子 Agent 或进程继续运行的问题，对 **资源回收、并发隔离、用户可控性** 都是重要增强。虽然当前状态为 Closed，数据未明确显示是否 merged，但从摘要看属于一次较核心的运行时稳定性改进。

---

#### 2. WebUI：避免已完成 Markdown 被错误修复  
- PR：[#5989 fix(webui): stop repairing completed Markdown](https://github.com/HKUDS/nanobot/pull/5989)  
- 状态：Closed  
- 作者：chengyongru  
- 关联：NAN-205  

该 PR 修复了 assistant 响应完成后，Markdown 修复逻辑可能额外保留尾随 `_` 的问题。例如 `_legal_history_tail()` 这类普通标识符可能被 Remend 误判为需要补齐强调语法，从而在回复末尾追加下划线。

推进意义：

- 提升 WebUI 渲染准确性
- 减少模型输出被前端“二次修复”误改的风险
- 对代码、函数名、标识符类内容展示更友好

---

#### 3. WebUI：保持已完成 turn 的终态稳定  
- PR：[#5991 fix(webui): keep completed turns terminal across late events](https://github.com/HKUDS/nanobot/pull/5991)  
- 状态：Closed  
- 作者：chengyongru  

该 PR 修复了延迟到达的 admission broadcast 或 ACK 携带旧 `active_turn_id` 时，WebUI 可能重新接受该 turn 所有权，从而导致：

- 运行时钟重新打开
- processing 指示器持续显示
- queued guidance 无法观察到稳定完成状态

这是一个典型的异步事件乱序 / 延迟事件导致的 UI 状态回退问题。修复后，已完成的 turn 将保持 terminal 状态，WebUI 的任务结束判断更加可靠。

---

#### 4. CLI/WebUI：避免重复打印配置路径  
- PR：[#5988 fix(cli): avoid duplicate WebUI config announcement](https://github.com/HKUDS/nanobot/pull/5988)  
- 状态：Closed  
- 作者：chengyongru  
- 关联：NAN-208  

该 PR 修复 `nanobot webui --config …` 会重复打印 `Using config:` 的问题。虽然属于较小的 UX 修复，但能减少 CLI 输出噪音，改善配置排查体验。

---

#### 5. 文档：精简项目指令与工程约束  
- PR：[#5996 docs: streamline project instructions and engineering constraints](https://github.com/HKUDS/nanobot/pull/5996)  
- 状态：Closed  
- 作者：chengyongru  

该 PR 替换了根目录 `AGENTS.md` 中重复或过时的开发说明，将任务相关文档链接和工程约束集中化，并将项目细节保留在 `.agent/` 中。

重点包括：

- 强调 root-cause analysis
- 要求必要重构
- 对可达行为补充测试
- 减少陈旧项目描述带来的误导

这有助于提升贡献者协作效率，也表明项目正在强化工程规范。

---

## 3. 社区热点

### 最活跃 Issue

#### TUI debug-mode 无法识别纯数字输入  
- Issue：[#5987 Numbers-only cannot be recognized in TUI debug-mode, while alphabet characters work fine](https://github.com/HKUDS/nanobot/issues/5987)  
- 状态：Closed  
- 作者：Tomlili43  
- 评论数：4  
- 标签：`bug`, `question`  

这是今日唯一有更新的 Issue，也是评论最多的社区讨论。用户反馈在 TUI debug 模式下，纯数字输入无法被识别，而字母字符正常工作。该问题附带了截图与 `.vscode launch.json` 相关复现信息，说明用户是在本地调试 / 开发场景中发现问题。

背后诉求：

- TUI 调试模式应正确处理数字输入
- 输入解析逻辑需要覆盖纯数字、字母、混合字符等基本输入形态
- 开发者希望 debug 模式与正常交互模式行为一致

该 Issue 已关闭，说明维护者可能已确认原因、给出解释或完成处理。但从当前数据无法确认对应修复 PR。

---

### 重要 PR 讨论信号

今日 PR 的评论数未提供，反应数均为 0，因此无法从互动量直接判断讨论热度。不过从标签和内容判断，下列 PR 对项目质量影响较大：

1. [#5997 fix(linear): reject stale member access updates after reauthorization](https://github.com/HKUDS/nanobot/pull/5997)  
   - 涉及 Linear workspace 重新授权后的成员权限陈旧更新问题
   - 带有 `security` 标签
   - 属于权限一致性和安全边界问题

2. [#5994 fix(agent): preserve explicitly empty tool registries](https://github.com/HKUDS/nanobot/pull/5994)  
   - 涉及禁用工具后默认工具被重新启用的问题
   - 带有 `security` 标签
   - 影响 Agent 工具权限控制

3. [#5992 fix(providers): support scoped proxies across all backends](https://github.com/HKUDS/nanobot/pull/5992)  
   - 涉及所有 provider 的代理配置
   - 反映企业网络、OAuth、原生后端、多 provider 环境下的配置诉求

---

## 4. Bug 与稳定性

按潜在影响程度排序如下。

### 高严重度

#### 1. Linear 重新授权后陈旧成员访问更新可能覆盖新权限  
- PR：[#5997 fix(linear): reject stale member access updates after reauthorization](https://github.com/HKUDS/nanobot/pull/5997)  
- 状态：Open  
- 标签：`bug`, `regression`, `channel`, `fix`, `test`, `security`, `priority: p2`  

问题描述：  
成员访问更新请求可能在 Linear directory API 上等待期间，workspace 被断开并重新授权。当旧请求返回后，可能重新启用一个在重连后已被显式拒绝的成员权限。

影响：

- 权限状态可能被旧请求污染
- 存在安全与访问控制一致性风险
- 对集成型企业用户影响较大

修复状态：已有开放 PR，待合并。

---

#### 2. 显式空工具注册表可能被默认工具覆盖  
- PR：[#5994 fix(agent): preserve explicitly empty tool registries](https://github.com/HKUDS/nanobot/pull/5994)  
- 状态：Open  
- 标签：`bug`, `fix`, `test`, `security`, `priority: p2`  

问题描述：  
当调用 `process_direct()` 时传入 `tools=ToolRegistry()`，或通过 session policy 禁用所有注册工具时，系统可能重新启用默认工具。摘要中特别提到，复现中 `write_file` 调用在工具应被禁用时仍创建了文件。

影响：

- 违反用户或策略设定的工具权限边界
- 可能导致文件写入等副作用
- 对沙箱、受限 Agent、企业安全策略影响较大

修复状态：已有开放 PR，待合并。

---

### 中严重度

#### 3. Agent runner 恢复成功后仍被报告为失败  
- PR：[#5995 fix(agent): clear stale failure state when resuming runner iterations](https://github.com/HKUDS/nanobot/pull/5995)  
- 状态：Open  
- 标签：`bug`, `regression`, `fix`, `test`, `priority: p2`  

问题描述：  
模型错误或空响应路径会在检查 late follow-up messages 之前设置 `stop_reason` 和 `error`。如果随后出现 follow-up message 并成功恢复，旧的失败状态可能仍残留，导致最终运行被错误报告为失败，并可能抑制最终 WebSocket reply。

影响：

- WebSocket 最终响应可能缺失
- 用户看到的任务状态与实际执行结果不一致
- 影响长任务、多轮补偿、异步恢复场景

修复状态：已有开放 PR，待合并。

---

#### 4. WebUI 已完成 turn 被迟到事件重新激活  
- PR：[#5991 fix(webui): keep completed turns terminal across late events](https://github.com/HKUDS/nanobot/pull/5991)  
- 状态：Closed  
- 标签：`bug`, `regression`, `webui`, `fix`, `test`, `priority: p2`  

问题描述：  
延迟事件携带旧 `active_turn_id` 导致 WebUI 重新打开已完成 turn 的运行状态。

影响：

- Processing 指示器持续显示
- 用户误以为任务仍在运行
- 队列引导逻辑无法稳定观察完成态

修复状态：PR 已关闭，可能已完成处理。

---

#### 5. Streaming Markdown 中 TeX 公式边界被破坏  
- PR：[#5990 fix(webui): preserve TeX formula boundaries in streaming Markdown](https://github.com/HKUDS/nanobot/pull/5990)  
- 状态：Open  
- 关联：NAN-204  

问题描述：  
Streamdown 在运行 remark math 插件前使用 Marked 拆分 Markdown，导致 `\[...\]` 中单独的 `=` 被识别为 Setext heading 边界，空行也可能拆分公式。

影响：

- 数学公式渲染错误
- 对科研、教育、工程类用户影响较明显
- 流式输出中尤其容易出现

修复状态：已有开放 PR，待合并。

---

### 低到中严重度

#### 6. 完成后的 Markdown 被错误补下划线  
- PR：[#5989 fix(webui): stop repairing completed Markdown](https://github.com/HKUDS/nanobot/pull/5989)  
- 状态：Closed  
- 标签：`bug`, `webui`, `fix`, `test`, `priority: p2`  

问题描述：  
Markdown 修复逻辑可能在响应完成后错误追加 `_`。

修复状态：PR 已关闭，可能已完成处理。

---

#### 7. TUI debug-mode 无法识别纯数字输入  
- Issue：[#5987 Numbers-only cannot be recognized in TUI debug-mode, while alphabet characters work fine](https://github.com/HKUDS/nanobot/issues/5987)  
- 状态：Closed  
- 标签：`bug`, `question`  

问题描述：  
纯数字输入在 TUI debug 模式中无法被识别，而字母字符正常。

修复状态：Issue 已关闭，但当前数据未显示明确关联修复 PR。

---

#### 8. WebUI 配置路径重复打印  
- PR：[#5988 fix(cli): avoid duplicate WebUI config announcement](https://github.com/HKUDS/nanobot/pull/5988)  
- 状态：Closed  
- 标签：`bug`, `webui`, `fix`, `test`, `priority: p2`  

影响较小，主要是 CLI 输出体验问题。

---

## 5. 功能请求与路线图信号

今日没有明确的新功能请求 Issue，但多个 PR 体现出潜在路线图方向。

### 1. Provider 级别代理配置将扩展到所有后端  
- PR：[#5992 fix(providers): support scoped proxies across all backends](https://github.com/HKUDS/nanobot/pull/5992)  
- 状态：Open  
- 标签：`documentation`, `provider`, `webui`, `fix`, `test`, `priority: p2`  
- 关联：NAN-212  

该 PR 将 **Advanced → Network proxy** 暴露给所有 provider，包括：

- native backends
- OAuth providers
- custom providers
- transcription-only providers

路线图信号：  
NanoBot 正在增强多 provider、多网络环境下的可配置性，特别是企业网络、私有部署、地区网络限制、代理隔离等场景。该能力很可能进入下一版本或近期 patch，因为 PR 已包含文档、WebUI、测试相关标签。

---

### 2. WebUI 流式 Markdown / TeX 渲染稳定性成为近期重点  
- PR：[#5990](https://github.com/HKUDS/nanobot/pull/5990)  
- PR：[#5989](https://github.com/HKUDS/nanobot/pull/5989)  

两个 PR 都围绕 WebUI 渲染质量，尤其是流式输出中的 Markdown 修复、TeX 公式边界、特殊字符处理。这表明项目正在加强面向知识工作者、科研/数学内容用户的输出质量。

---

### 3. Agent 权限与工具边界正在收紧  
- PR：[#5994](https://github.com/HKUDS/nanobot/pull/5994)  
- PR：[#5993](https://github.com/HKUDS/nanobot/pull/5993)  
- PR：[#5995](https://github.com/HKUDS/nanobot/pull/5995)  

这些 PR 共同表明，NanoBot 近期关注点从“功能可用”进一步转向：

- 工具权限严格执行
- session 生命周期隔离
- runner 状态一致性
- 取消 / 恢复 / follow-up 等复杂 Agent 流程稳定性

这对个人 AI 助手类项目非常关键，因为工具调用、文件写入、Shell 执行等能力越强，权限边界就越重要。

---

## 6. 用户反馈摘要

基于今日唯一 Issue [#5987](https://github.com/HKUDS/nanobot/issues/5987)，可以提炼出以下用户痛点：

### 真实使用场景

用户在本地通过 VS Code 的 `.vscode/launch.json` 启动 NanoBot，并使用 TUI debug-mode 进行调试。这说明 NanoBot 不仅被作为终端应用使用，也被开发者作为可调试、可二次开发的 Agent 框架使用。

### 主要痛点

- Debug 模式输入行为不一致：字母可识别，纯数字不可识别
- 基础输入类型未被完整覆盖，影响开发调试效率
- 用户需要通过截图和 launch 配置辅助说明问题，说明该问题在表层交互中比较直观，但底层原因可能涉及 TUI 输入解析或事件处理

### 满意 / 不满意信号

- 不满意点：TUI debug-mode 在基础输入处理上存在边界问题
- 正向信号：Issue 当日关闭，说明维护者响应速度较快

---

## 7. 待处理积压

基于本次提供的数据，仅覆盖过去 24 小时动态，未包含长期未响应 Issue / PR 的完整列表，因此无法准确识别长期积压项。

不过从今日仍处于 Open 状态的 PR 看，以下事项建议维护者优先关注：

1. [#5997 fix(linear): reject stale member access updates after reauthorization](https://github.com/HKUDS/nanobot/pull/5997)  
   - 涉及权限安全与陈旧状态覆盖  
   - 建议优先 review / 合并

2. [#5994 fix(agent): preserve explicitly empty tool registries](https://github.com/HKUDS/nanobot/pull/5994)  
   - 涉及工具禁用策略失效  
   - 建议优先验证测试覆盖，尤其是文件写入、Shell、默认工具注册路径

3. [#5995 fix(agent): clear stale failure state when resuming runner iterations](https://github.com/HKUDS/nanobot/pull/5995)  
   - 涉及 Agent runner 状态一致性和 WebSocket 最终响应  
   - 建议在复杂多轮 / late follow-up 场景下补充回归测试

4. [#5992 fix(providers): support scoped proxies across all backends](https://github.com/HKUDS/nanobot/pull/5992)  
   - 影响多 provider 配置体验  
   - 建议重点测试 OAuth provider、native backend、transcription-only provider 的代理路径一致性

5. [#5990 fix(webui): preserve TeX formula boundaries in streaming Markdown](https://github.com/HKUDS/nanobot/pull/5990)  
   - 影响 WebUI 数学公式渲染  
   - 建议合并前覆盖 `\[...\]`、`$$...$$`、空行、单独等号、流式分块等场景

---

## 总体健康度评估

NanoBot 今日维护活跃，修复工作集中且方向明确：**安全权限、Agent 生命周期、WebUI 渲染、Provider 网络配置** 是主要推进线。虽然没有新版本发布，但多个 P2 修复 PR 已进入待合并状态，说明项目可能正在为下一次稳定版本或 patch release 做收敛。  
需要注意的是，今日多个问题属于回归或异步状态边界缺陷，建议维护团队在合并前加强端到端测试、并发/乱序事件测试，以及工具权限策略测试，以降低下一版本的回归风险。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报｜2026-10-01

## 1. 今日速览

过去 24 小时 Hermes Agent 维持了**极高活跃度**：Issue 更新 50 条，其中 48 条仍处于新开或活跃状态；PR 更新 50 条，其中 45 条仍待合并。今日没有新版本发布，但围绕 **Desktop 会话状态、CLI/安装更新、Gateway 消息投递、安全边界、Provider 兼容性** 的问题密集出现。整体来看，项目处于快速迭代期：社区反馈非常活跃，修复 PR 响应速度较快，但高优先级稳定性与安全问题仍有明显积压。当前健康度可评估为：**开发动能强、问题发现充分，但主线稳定性压力较高**。

---

## 2. 版本发布

今日无新版本发布。

最新发布状态：无 Releases 更新。

---

## 3. 项目进展

今日 PR 更新 50 条，其中 45 条仍待合并，5 条已合并或关闭。已展示数据中可确认的关闭 PR 主要是自动格式化类 PR；同时，多项高价值修复 PR 已打开，表明维护者与贡献者正在快速响应当天的新缺陷报告。

### 已关闭 / 已完成事项

#### PR #129977：自动格式化修复已关闭  
- 链接：https://github.com/NousResearch/hermes-agent/pull/129977  
- 类型：`type/refactor`, `comp/desktop`  
- 摘要：由 `auto-fix lint issues & formatting` 工作流自动生成，用于修复 JS 格式化与 lint 问题。  
- 影响：属于代码质量维护，不直接改变用户功能，但有助于保持 Desktop 前端代码风格一致。  
- 状态解读：该 PR 关闭可能意味着 CI、主线移动或自动流程重试；需要结合 CI 结果确认是否已被后续自动 PR 替代。

### 今日打开的关键修复 PR

#### PR #129985：严格 URL userinfo 凭据脱敏  
- 链接：https://github.com/NousResearch/hermes-agent/pull/129985  
- 关联 Issue：https://github.com/NousResearch/hermes-agent/issues/129983  
- 类型：`type/security`, `P1`, `comp/agent`, `comp/cli`, `comp/gateway`  
- 推进内容：修复严格脱敏边界中 URL userinfo 的 username 部分未被遮蔽的问题，防止 `hermes dump`、`debug share`、gateway `/debug` 输出泄露凭据。  
- 项目意义：这是今日最重要的安全修复之一，直接改善诊断与调试链路的安全边界。

#### PR #129982：Gemini 深层嵌套 tool result 扁平化  
- 链接：https://github.com/NousResearch/hermes-agent/pull/129982  
- 关联 Issue：https://github.com/NousResearch/hermes-agent/issues/129979  
- 类型：`type/bug`, `provider/gemini`, `P2`  
- 推进内容：在发往 Gemini 的 wire copy 中将超过一定深度的 JSON 子树转为字符串，避免 Gemini protobuf Struct 深度限制导致 400 `INVALID_ARGUMENT`。  
- 项目意义：提升 Gemini Provider 的容错能力，避免单个深层 tool result 污染整个会话历史。

#### PR #129976：保留 POSIX launcher 脚本身份  
- 链接：https://github.com/NousResearch/hermes-agent/pull/129976  
- 关联 Issue：https://github.com/NousResearch/hermes-agent/issues/129973  
- 类型：`type/bug`, `comp/cli`, `area/install-update`, `P2`  
- 推进内容：将 POSIX launcher bootstrap 发布为真实相邻脚本，而不是以内联 `python3 -I -c` 运行，从而恢复终端工作区管理器对 Hermes 进程身份的识别。  
- 项目意义：修复 0.21.5 引入的 CLI 启动器回归，改善 Herdr 等终端 agent 管理器兼容性。

#### PR #129971：slash command 与 clarify answer 中展开长粘贴内容  
- 链接：https://github.com/NousResearch/hermes-agent/pull/129971  
- 关联 Issue：https://github.com/NousResearch/hermes-agent/issues/129969  
- 类型：`type/bug`, `backend/ssh`, `comp/cli`, `P2`  
- 推进内容：在 slash-command dispatch 与 clarify answer 锁定前展开 collapsed long-paste placeholders。  
- 项目意义：解决远程终端后端无法访问本地 paste 文件路径的问题，直接改善 CLI/SSH 场景下的可用性。

#### PR #129986：为 clarify answer 长粘贴展开增加回归测试  
- 链接：https://github.com/NousResearch/hermes-agent/pull/129986  
- 关联 Issue：https://github.com/NousResearch/hermes-agent/issues/129969  
- 类型：`tests`, `backend/ssh`, `comp/cli`, `P2`  
- 推进内容：测试 `_tui_enter_clarify_freetext` 的真实 keybinding 行为，确保长粘贴展开位置不会回归。  
- 项目意义：补齐行为保护，是对 #129971 的测试加固。

#### PR #129970：Windows SSH backend ownership 检查接受解释器 flags  
- 链接：https://github.com/NousResearch/hermes-agent/pull/129970  
- 类型：`type/bug`, `backend/ssh`, `platform/windows`, `comp/desktop`, `P2`  
- 推进内容：修复 Windows SSH remote 场景下 Desktop 启动后端但 ownership 检查错误拒绝的问题。  
- 项目意义：改善 Desktop + Windows SSH remote 的启动稳定性。

#### PR #129981：修复 pm/store.py 的 Python 3.11 tarfile API 兼容性  
- 链接：https://github.com/NousResearch/hermes-agent/pull/129981  
- 类型：`type/bug`, `comp/cli`, `area/install-update`, `P2`  
- 推进内容：兼容 Python 3.11 中缺失的 `TarInfo.replace`、`tarfile.data_filter`、`extractall(filter=...)` 等 API。  
- 项目意义：降低 source install、pm repair、工具安装更新在 Python 3.11 环境中的失败率。

---

## 4. 社区热点

### Issue #129924：Feishu interactive card 入站退化为 `[Interactive message]`  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129924  
- 状态：Open  
- 标签：`type/bug`, `comp/plugins`, `platform/feishu`, `P3`, `sweeper:risk-message-delivery`  
- 评论数：4  
- 热点原因：这是今日评论最多的 Issue。用户报告飞书入站 interactive card 在 Hermes gateway 中被折叠成字面量 `[Interactive message]`，导致消息语义丢失。  
- 背后诉求：飞书适配器需要在服务端降级内容时重新拉取 `card_msg_content_type=user_card_content`，保障跨 bot、跨平台消息传递的完整性。  
- 影响范围：Feishu 平台集成、插件消息投递、交互式卡片工作流。

### Issue #129813：桌面端自定义 URL scheme allowlist  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129813  
- 状态：Closed  
- 评论数：3  
- 热点原因：用户希望 Desktop 支持 `obsidian://`、`linear://`、`vscode://`、`things:///` 等深链。  
- 背后诉求：Hermes 作为个人 AI 助手，需要能把用户带回本地知识库、IDE、任务管理器等工具中。  
- 产品信号：个人助手场景正在从“生成内容”转向“连接本地工作流”。  
- 状态解读：Issue 已关闭，但当前数据未展示对应合并 PR，建议维护者在关闭原因中明确是已实现、重复、还是设计拒绝。

### Issue #129757：Desktop preview pane 打开 HTTP URL 无响应  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129757  
- 状态：Open  
- 标签：`type/bug`, `P2`, `comp/desktop`  
- 评论数：2  
- 热点原因：用户在 Windows Desktop 中调用 `desktop_preview.open(http URL)` 后，preview pane 停留在 `about:blank` 且无明显错误提示。  
- 背后诉求：桌面端工具调用应具备可观察性；失败时需要错误提示、日志或回退行为。  
- 影响范围：Desktop 工具调用、网页预览、Windows 用户体验。

### Issue #129731：Desktop final answer 重复渲染  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129731  
- 状态：Open  
- 标签：`type/bug`, `P2`, `comp/desktop`, `area/sessions`, `sweeper:risk-session-state`  
- 评论数：2  
- 热点原因：在 narration → tool → answer turn 中，最终回答在 Desktop 渲染两次；关闭重开后仍存在，但数据库只有一行。  
- 背后诉求：会话 UI 状态与持久化状态需要一致，避免用户误以为 agent 重复发送或状态损坏。  
- 影响范围：Desktop 会话渲染层、session state reconciliation。

### Issue #129819：wake word 总是进入最左侧主聊天  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129819  
- 状态：Open  
- 标签：`type/bug`, `tool/tts`, `comp/desktop`, `area/sessions`, `P3`  
- 评论数：1，👍：1  
- 热点原因：这是今日展示数据中少数带正向 reaction 的 Issue。  
- 背后诉求：多标签聊天场景下，语音入口应尊重当前选中 tab，而不是默认主聊天。  
- 产品信号：用户已在同时运行多个 chat/session，并期待语音交互具备上下文感知能力。

---

## 5. Bug 与稳定性

以下按严重程度与影响范围排序。

### P1 / Security / 高风险问题

#### Issue #129983：严格 URL 凭据脱敏仍保留 username 中的凭据  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129983  
- 状态：Open  
- 标签：`type/security`, `P1`, `sweeper:risk-security-boundary`  
- 问题：`redact_sensitive_text(..., redact_url_credentials=True)` 会遮蔽 URL userinfo 中的 password，但保留 username；若 credential 被放入 username，可能进入 dump/debug share/gateway debug 输出。  
- Fix PR：已有  
  - https://github.com/NousResearch/hermes-agent/pull/129985  
- 风险评估：高。涉及诊断数据外传与调试分享路径，建议优先合并并补充回归测试。

#### Issue #129947：`hermes update restart` 会杀死运行中的 cron job  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129947  
- 状态：Open  
- 标签：`type/bug`, `comp/cli`, `comp/gateway`, `comp/cron`, `P1`  
- 问题：日志显示 stop drain cap 为 1800s，但实际受 `agent.restart_drain_timeout` 180s 限制，导致运行中的 cron job 被终止并记录为失败。  
- Fix PR：未在今日展示数据中看到。  
- 风险评估：高。会影响自动任务可靠性，尤其是长任务、定时任务、生产型 agent 工作流。

#### Issue #129740：Desktop stale-send guard 在多 session 中循环拒绝发送  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129740  
- 状态：Open  
- 标签：`type/bug`, `P1`, `comp/desktop`, `area/sessions`, `sweeper:risk-session-state`  
- 问题：多个 session 活跃时，Desktop 反复提示 chat out of date，用户只能 fork 逃生。  
- Fix PR：未在今日展示数据中看到。  
- 风险评估：高。直接阻断用户继续对话，是 Desktop 多会话可用性的核心问题。

### P2 / 重要稳定性与兼容性问题

#### Issue #129979：Gemini 拒绝深度超过约 31 层的 tool result JSON  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129979  
- 状态：Open  
- 标签：`type/bug`, `comp/agent`, `provider/gemini`, `P2`  
- 问题：深层 JSON tool result 导致 Gemini 返回 400 `INVALID_ARGUMENT`，且历史中保留该结果后整个 session 持续不可用。  
- Fix PR：已有  
  - https://github.com/NousResearch/hermes-agent/pull/129982  
- 风险评估：中高。对 Gemini 用户影响明显，尤其是复杂工具链或结构化数据处理场景。

#### Issue #129973：0.21.5 POSIX launcher 破坏终端 agent 检测  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129973  
- 状态：Open  
- 标签：`type/bug`, `comp/cli`, `area/install-update`, `P2`  
- 问题：`python3 -I -c` 内联 bootstrap 去掉脚本路径 argv，导致 Herdr 等终端 workspace manager 无法识别 Hermes。  
- Fix PR：已有  
  - https://github.com/NousResearch/hermes-agent/pull/129976  
- 风险评估：中高。影响 CLI 与外部终端编排工具集成。

#### Issue #129969：长粘贴 placeholder 未在 clarify/slash command 中展开  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129969  
- 状态：Open  
- 标签：`type/bug`, `backend/ssh`, `comp/cli`, `P2`  
- 问题：agent 收到 `[Pasted text #N → path]` 而不是实际内容；远程终端后端无法读取本地路径。  
- Fix PR：已有  
  - 修复：https://github.com/NousResearch/hermes-agent/pull/129971  
  - 测试：https://github.com/NousResearch/hermes-agent/pull/129986  
- 风险评估：中高。影响 CLI 交互质量与远程开发场景。

#### Issue #129858：cron Bot Chat CLI fallback 抢占 Desktop chat  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129858  
- 状态：Open  
- 标签：`type/bug`, `comp/tui`, `comp/cron`, `comp/desktop`, `area/sessions`, `P2`  
- 问题：cron delivery 到 `bot-chat:<profile>` 时，headless CLI fallback 会占用 canonical Bot Chat，导致 Desktop 用户发送时出现 `SESSION_NOT_OWNED`。  
- Fix PR：未在今日展示数据中看到。  
- 风险评估：中高。暴露了 Desktop、CLI、cron 对同一会话所有权模型的冲突。

#### Issue #129751：pm runtime 使用 Python 3.11 同步需要 Python 3.14 的 uv.lock  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129751  
- 状态：Open  
- 标签：`type/bug`, `comp/cli`, `python:uv`, `area/install-update`, `P2`  
- 问题：`pm/uv.lock` 要求 `==3.14.*`，但 runtime prep 使用 app venv 的 Python 3.11，导致 `hermes pm update/install` 全部失败。  
- 相关 PR：可能相关但不完全等价  
  - https://github.com/NousResearch/hermes-agent/pull/129981  
- 风险评估：中高。影响 pm 工具安装与更新链路。

#### Issue #129945：Windows 路径含空格时 `hermes update` 在 gateway discovery 阶段失败  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129945  
- 状态：Open  
- 标签：`type/bug`, `comp/cli`, `comp/gateway`, `platform/windows`, `P2`  
- 问题：安装根目录如 `D:\Hermes Agent` 时，更新流程无法映射 Windows gateway PID 到 profile。  
- Fix PR：未在今日展示数据中看到。  
- 风险评估：中。Windows 安装路径含空格非常常见，应尽快处理。

#### Issue #129927：`hermes doctor` 未建议 optimize-storage  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129927  
- 状态：Open  
- 标签：`type/bug`, `comp/cli`, `area/sessions`, `P2`  
- 问题：`fts_storage_version` 被提前 stamped，导致实际 FTS layout 仍需优化时 doctor 不提示。  
- Fix PR：未在今日展示数据中看到。  
- 风险评估：中。影响诊断可信度与存储迁移体验。

#### Issue #129923：并发 `create_profile()` 使用相同 staging dir  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129923  
- 状态：Open  
- 标签：`type/bug`, `comp/cli`, `area/profiles`, `P2`  
- 问题：同一进程内并发创建同名 profile 时共享 `.<name>.staging-<pid>`，可能一个调用返回 OK 但发布的是 partial profile。  
- Fix PR：未在今日展示数据中看到。  
- 风险评估：中。对 WebUI profile 创建与并发配置管理有潜在破坏性。

#### Issue #129917：Gateway failed-turn replies 绕过 suppress_warning_notifications  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129917  
- 状态：Open  
- 标签：`type/bug`, `comp/gateway`, `platform/whatsapp`, `P2`  
- 问题：WhatsApp 平台设置 `suppress_warning_notifications: true` 后，部分自动失败回复仍会发送。  
- Fix PR：未在今日展示数据中看到。  
- 风险评估：中。影响用户对通知静默策略的信任。

### P3 / 中低优先级但值得关注

#### Issue #129975：仅抓取来自 tool 的 reply image URL，防止 prompt injection 外传数据  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129975  
- 状态：Open  
- 标签：`type/security`, `comp/gateway`, `P3`  
- 问题：回复中出现 `![alt](https://...)` 或 `<img src>` 时，gateway/platform adapter 可能下载外部图片 URL；恶意 prompt 可借此触发数据外带。  
- Fix PR：未在今日展示数据中看到。  
- 风险评估：中。虽然标为 P3，但属于安全边界问题，建议提升关注度。

#### Issue #129950：xAI credential 可能发送到未验证 base URL  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129950  
- 状态：Open  
- 标签：`type/security`, `comp/tools`, `provider/xai`, `P3`  
- 问题：部分 xAI 请求路径未套用 `*.x.ai` origin validation，可能将 `XAI_API_KEY` 或 OAuth bearer 发往任意 base URL。  
- Fix PR：未在今日展示数据中看到。  
- 风险评估：中。凭据外发风险，应优先审计所有 provider base URL 解析路径。

#### Issue #129900：取消 vision_analyze 后临时文件残留  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129900  
- 状态：Open  
- 标签：`type/bug`, `tool/vision`, `P2`  
- 问题：取消图像准备任务时，后台 worker 完成后临时文件未清理。  
- Fix PR：未在今日展示数据中看到。  
- 风险评估：中。长期运行可能造成磁盘垃圾与隐私残留。

#### Issue #129888：含非 BMP 字符文件名的 UTF-16 文件读删失败  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129888  
- 状态：Open  
- 标签：`type/bug`, `comp/tools`, `tool/file`, `P2`  
- 问题：文件名包含 emoji 或 CJK 扩展字符时，`patch` delete 与 `read_file` UTF-16 fallback 失败。  
- Fix PR：未在今日展示数据中看到。  
- 风险评估：中。影响国际化与非 ASCII 文件系统兼容性。

---

## 6. 功能请求与路线图信号

### Feishu 原生 `/model` 交互卡片与多 key provider groups

#### PR #129974：Feishu model-picker card、多 key provider groups、i18n 文案  
- 链接：https://github.com/NousResearch/hermes-agent/pull/129974  
- 状态：Open  
- 类型：`type/feature`, `platform/feishu`, `comp/plugins`, `area/config`, `P3`  
- 内容：在飞书中通过原生 interactive card 选择 provider、model 与 reasoning effort；同时支持多 key provider groups 与卡片文案国际化。  
- 路线图信号：Hermes 正在增强企业 IM 平台中的模型切换体验，尤其是多 provider、多模型、多 reasoning 档位的可视化选择。

### Context Governor：带 receipt 的压缩与 exact-fallback recovery

#### PR #129972：Context Governor engine  
- 链接：https://github.com/NousResearch/hermes-agent/pull/129972  
- 状态：Open  
- 类型：`type/feature`, `comp/cli`, `comp/plugins`, `area/compression`, `P3`  
- 内容：引入可选 context engine `ri-context-governor`，通过 Rust binary 提供 receipt-carrying compaction 与 exact-fallback recovery。  
- 路线图信号：上下文压缩仍是 Hermes 的关键投资方向；与今日的压缩失败 Issue #129963 形成呼应。  
- 相关 Issue：https://github.com/NousResearch/hermes-agent/issues/129963

### Desktop Sessions 信息架构与网关可见性

#### PR #129980：允许用户从 Sessions fleet rail 隐藏 gateway  
- 链接：https://github.com/NousResearch/hermes-agent/pull/129980  
- 状态：Open  
- 类型：`type/feature`, `comp/desktop`, `area/sessions`, `P2`  
- 内容：为 Desktop session fleet rail 增加隐藏 gateway 的用户偏好。  
- 路线图信号：Desktop 多 gateway、多设备、多 session 的信息架构正在被重新打磨。

#### PR #129984：让 session switcher 与 Sessions 使用一致 row identity  
- 链接：https://github.com/NousResearch/hermes-agent/pull/129984  
- 状态：Open  
- 类型：`type/bug`, `comp/desktop`, `area/sessions`, `P2`  
- 内容：修复 session switcher 与 Sessions 对 row identity 理解不一致的问题。  
- 路线图信号：Desktop 会话导航正从功能可用走向一致性与可理解性。

### Plugin Catalog 扩展

#### PR #129968：新增 model-picker plugin  
- 链接：https://github.com/NousResearch/hermes-agent/pull/129968  
- 状态：Open  
- 类型：`type/feature`, `Plugin Catalog`, `P3`  
- 内容：按 turn 成本分类，将请求路由到不同模型层级，并在工具失败时升级。  
- 路线图信号：模型路由与成本治理正在插件化。

#### PR #129967：新增 gbrain-retrieval-reflex plugin  
- 链接：https://github.com/NousResearch/hermes-agent/pull/129967  
- 状态：Open  
- 类型：`type/feature`, `Plugin Catalog`, `P3`  
- 内容：从 GBrain 实例提供 ambient context，并在每轮前注入。  
- 路线图信号：外部长期记忆、检索增强、环境上下文注入仍是用户关注方向。

#### PR #129965：新增 secret-handoff plugin  
- 链接：https://github.com/NousResearch/hermes-agent/pull/129965  
- 状态：Open  
- 类型：`type/feature`, `Plugin Catalog`, `P3`  
- 内容：通过 clarify 请求临时凭据，再通过 CDP 注入，不持久化存储。  
- 路线图信号：用户需要安全地把一次性 secret 交给 agent 执行浏览器任务。

#### PR #129964：新增 git-hook plugin  
- 链接：https://github.com/NousResearch/hermes-agent/pull/129964  
- 状态：Open  
- 类型：`type/feature`, `Plugin Catalog`, `P3`  
- 内容：在读取前自动 fetch/pull，并只提交、推送每轮修改的文件。  
- 路线图信号：Hermes 正在向“自动维护代码工作区”的方向扩展。

### 用户提出的新功能请求

#### Issue #129827：改进 `hermes profile list` 输出格式与信息  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129827  
- 状态：Open  
- 类型：`type/feature`, `comp/cli`, `area/profiles`, `P3`  
- 诉求：修复表格 header 对齐，显示 profile gateway 是 user 还是 system scope，并减少警告噪音。  
- 纳入可能性：较高。实现成本低，属于 CLI 可用性增强。

#### Issue #129958：profile-scoped post-admission consuming gateway plugin extension  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129958  
- 状态：Open  
- 类型：`type/feature`, `comp/gateway`, `comp/plugins`, `P3`, `needs-decision`  
- 诉求：插件可在 admission 后消费请求、持久排队 specialist request，并返回短确认。  
- 纳入可能性：中。设计影响 Gateway plugin 生命周期，需要维护者决策。

#### Issue #129813：自定义 URL scheme allowlist  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129813  
- 状态：Closed  
- 诉求：Desktop 可打开 `obsidian://`、`vscode://`、`linear://` 等自定义 scheme。  
- 纳入可能性：无法从当前数据判断。Issue 已关闭，但未展示对应实现 PR；建议维护者补充关闭说明。

---

## 7. 用户反馈摘要

### 主要痛点一：Desktop 多 session 状态不稳定  
相关条目：  
- https://github.com/NousResearch/hermes-agent/issues/129740  
- https://github.com/NousResearch/hermes-agent/issues/129731  
- https://github.com/NousResearch/hermes-agent/issues/129858  
- https://github.com/NousResearch/hermes-agent/issues/129819  
- https://github.com/NousResearch/hermes-agent/pull/129984  
- https://github.com/NousResearch/hermes-agent/pull/129980  

用户正在高频使用多聊天、多标签、多 gateway、多 cron 的组合场景。反馈集中在：  
- 当前窗口是否拥有 session 不清晰；  
- UI 渲染与数据库状态不一致；  
- cron/headless CLI 可能抢占 Desktop 会话；  
- wake word 不尊重当前选中 tab；  
- Sessions、Bots、session switcher 的信息架构存在认知负担。  

结论：Desktop 的核心挑战已从“功能覆盖”进入“多上下文一致性”。

### 主要痛点二：安装、更新、运行时兼容性仍脆弱  
相关条目：  
- https://github.com/NousResearch/hermes-agent/issues/129973  
- https://github.com/NousResearch/hermes-agent/issues/129751  
- https://github.com/NousResearch/hermes-agent/issues/129945  
- https://github.com/NousResearch/hermes-agent/issues/129989  
- https://github.com/NousResearch/hermes-agent/pull/129976  
- https://github.com/NousResearch/hermes-agent/pull/129981  
- https://github.com/NousResearch/hermes-agent/pull/129987  

用户在 Windows、POSIX launcher、Python 3.11/3.14、macOS SDK、路径含空格等环境中遇到问题。  
这说明 Hermes 的安装更新链路覆盖面很广，但边界条件复杂，尤其是：  
- source install；  
- pm tool runtime；  
- Windows gateway discovery；  
- native desktop helper rebuild；  
- restart/recovery 命令。  

结论：安装更新系统需要更强的 pre-flight diagnostics、路径处理、运行时版本隔离和 restart 语义。

### 主要痛点三：安全边界与调试链路需要更严格  
相关条目：  
- https://github.com/NousResearch/hermes-agent/issues/129983  
- https://github.com/NousResearch/hermes-agent/pull/129985  
- https://github.com/NousResearch/hermes-agent/issues/129975  
- https://github.com/NousResearch/hermes-agent/issues/129950  
- https://github.com/NousResearch/hermes-agent/issues/129715  

用户与贡献者正在主动审视：  
- debug/dump/share 是否会泄露凭据；  
- reply image URL 是否会成为 prompt injection 外带通道；  
- provider base URL 是否会泄露 API key；  
- browser vault 是否可能操作错误 tab。  

结论：Hermes 的 agent 能力越强，安全边界越需要细化到工具、平台 adapter、provider、debug pipeline 的每个出入口。

### 主要痛点四：Provider 与工具结果处理需要更强鲁棒性  
相关条目：  
- https://github.com/NousResearch/hermes-agent/issues/129979  
- https://github.com/NousResearch/hermes-agent/pull/129982  
- https://github.com/NousResearch/hermes-agent/issues/129963  
- https://github.com/NousResearch/hermes-agent/issues/129988  

用户遇到的问题包括：  
- Gemini 不接受深层 JSON；  
- Astra 6.1 在 272K context 下 compression 失败；  
- auxiliary fallback 在 host deadline 后仍继续执行并错误标记 fallback endpoint unhealthy。  

结论：Hermes 需要针对不同模型/provider 的上下文限制、JSON 表示限制、deadline 语义建立更精确的适配层。

---

## 8. 待处理积压

由于当前数据仅覆盖过去 24 小时，无法完整判断“长期未响应”的历史积压；以下列出的是今日仍未看到对应修复 PR、且优先级或风险较高的待处理项。

### 高优先级待处理

#### Issue #129947：更新重启会中断 cron job  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129947  
- 优先级：P1  
- 建议：尽快统一日志宣称的 drain cap 与实际 `restart_drain_timeout` 行为，避免用户误判任务安全性。

#### Issue #129740：Desktop stale-send guard 循环拒绝发送  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129740  
- 优先级：P1  
- 建议：优先排查多 session 下 stale guard 的比较依据与恢复路径，避免 fork 成为唯一逃生方案。

#### Issue #129858：cron fallback 抢占 Desktop chat ownership  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129858  
- 优先级：P2  
- 建议：明确 Desktop、CLI、cron 对 canonical Bot Chat 的 ownership 协议，必要时区分 headless delivery 与 human-visible session。

#### Issue #129950：xAI 凭据可能发往未验证 base URL  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129950  
- 优先级：P3，但安全风险较高  
- 建议：提升优先级，统一 provider credential-bearing paths 的 base URL validation。

#### Issue #129975：reply image URL 可能被 prompt injection 用作外带通道  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129975  
- 优先级：P3，但安全风险较高  
- 建议：限制 image fetch 来源，仅允许工具产出的可信 URL，或引入显式 provenance 标记。

### 中优先级待处理

#### Issue #129945：Windows 路径含空格导致 update 失败  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129945  
- 建议：补充 Windows path quoting 与 gateway PID mapping 测试。

#### Issue #129923：并发创建 profile 可能发布 partial profile  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129923  
- 建议：staging dir 引入 per-call nonce/UUID，并确保 publish 为原子操作。

#### Issue #129917：WhatsApp failed-turn 自动回复绕过静默配置  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129917  
- 建议：统一所有 failed-turn、warning、error reply 的 suppression policy。

#### Issue #129900：取消 vision_analyze 后临时文件残留  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129900  
- 建议：为后台 worker 增加 finally cleanup 与 event loop closed 场景测试。

#### Issue #129888：非 BMP 文件名读删失败  
- 链接：https://github.com/NousResearch/hermes-agent/issues/129888  
- 建议：补充 emoji、CJK 扩展字符、UTF-16 fallback 的跨平台文件名测试。

---

## 总体判断

Hermes Agent 今日呈现出典型的高速开源项目状态：**Issue 发现密集、PR 响应迅速、功能探索活跃，但稳定性与安全边界压力同步上升**。短期内最值得关注的是 P1 安全脱敏修复、Desktop 多 session 可用性、cron/update drain 语义、安装更新兼容性，以及 Gateway/Provider 的消息与凭据安全边界。若 #129985、#129982、#129976、#129971、#129981 等修复能快速合并，下一轮版本的稳定性将有明显改善。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-10-01）

## 1. 今日速览

过去 24 小时，PicoClaw 项目整体活跃度 **偏低但仍有功能推进**：没有新增或更新 Issues，也没有版本发布；PR 方面新增/更新 1 条开放中的功能型 PR。  
今日主要进展集中在 Web UI 的会话管理体验上，新增 PR 提出“全局多通道会话侧边栏”，显示项目正在推进更复杂的多通道会话能力。  
当前没有新的 Bug 报告、崩溃或回归问题暴露，短期稳定性信号较平稳。  
从维护节奏看，今日尚未出现合并、关闭或发布动作，项目处于 **功能开发推进中、社区讨论较安静** 的状态。

---

## 2. 项目进展

### 开放中的功能 PR

#### [PR #3413 feat(web): global multi-channel session sidebar](https://github.com/sipeed/picoclaw/pull/3413)

- **状态**：OPEN  
- **作者**：racso2609  
- **创建时间**：2026-09-30  
- **更新时间**：2026-09-30  
- **评论数**：暂无明确数据  
- **反应数**：👍 0  

该 PR 为 Web UI 增加 **全局多通道会话侧边栏**，属于 [#3406](https://github.com/sipeed/picoclaw/issues/3406) 的 Part 2-A。根据摘要，当前 Web UI 主要只能识别 `pico` sessions，并通过顶部下拉菜单列出；该 PR 试图将会话列表扩展为 **跨所有 channel 的全局会话视图**，由后端统一发现并分类展示。

这项改动如果合并，将推动 PicoClaw 的 Web UI 从单一通道会话管理，向更完整的多通道、多会话工作区体验演进。它可能会改善以下使用场景：

- 用户同时管理多个 channel/session；
- Web UI 中需要更清晰的会话导航；
- 后端统一暴露 session 元数据，前端统一消费；
- 为后续更复杂的多 Agent、多终端、多任务界面打基础。

今日没有已合并或已关闭 PR，因此项目尚未形成可交付的代码落地成果，但该 PR 代表了明确的功能方向推进。

---

## 3. 社区热点

### 今日最值得关注的讨论对象

#### [PR #3413 feat(web): global multi-channel session sidebar](https://github.com/sipeed/picoclaw/pull/3413)

该 PR 是过去 24 小时唯一活跃的 PR，因此也是今日最主要的社区关注点。尽管当前未显示明显评论或反应数据，但从内容上看，它触及 Web UI 的核心交互模型：**会话入口从局部 dropdown 转向全局 sidebar**。

背后的需求信号包括：

1. **多通道能力正在成为核心需求**  
   现有 UI 仅关注 `pico` sessions，已经难以覆盖所有使用场景。该 PR 说明项目正在抽象更通用的 channel/session 管理机制。

2. **用户需要更强的会话可见性**  
   顶部下拉菜单适合少量 session，但当 session 数量、类型和来源增加后，侧边栏更适合作为长期导航结构。

3. **Web UI 正在从工具界面走向工作台界面**  
   “global multi-channel session sidebar” 暗示 PicoClaw 的 Web UI 可能正在向类似 IDE、Agent Console 或多任务控制台方向演进。

---

## 4. Bug 与稳定性

过去 24 小时内没有新的 Issues，也没有 Bug、崩溃、回归问题被报告。

| 严重程度 | 问题 | 状态 | Fix PR |
|---|---|---|---|
| 高 | 无新增报告 | - | - |
| 中 | 无新增报告 | - | - |
| 低 | 无新增报告 | - | - |

从今日数据看，项目稳定性没有出现新的负面信号。不过，由于没有 Issues 活动，也可能意味着社区反馈量较低，并不能完全代表没有潜在问题。

---

## 5. 功能请求与路线图信号

今日没有新的 Issue 形式的功能请求，但 [PR #3413](https://github.com/sipeed/picoclaw/pull/3413) 本身释放了较明确的路线图信号。

### 可能进入下一阶段的功能方向

#### 多通道全局会话管理

- 相关 PR：[PR #3413](https://github.com/sipeed/picoclaw/pull/3413)
- 关联方向：[Issue/任务 #3406](https://github.com/sipeed/picoclaw/issues/3406)
- 当前状态：开放中，尚未合并

该方向很可能是 Web UI 后续迭代重点之一。PR 标题和摘要表明，项目正在处理如下能力：

- 后端发现所有 channel 的 sessions；
- 前端统一展示跨 channel session；
- 从 header dropdown 迁移到 sidebar；
- 支持多类型 session 分类和导航。

如果该 PR 顺利合并，下一步可能会继续围绕以下方面展开：

- session 过滤、搜索、分组；
- channel 状态展示；
- session 生命周期管理；
- 多会话切换体验优化；
- 与 Agent/任务执行视图的集成。

---

## 6. 用户反馈摘要

过去 24 小时没有 Issues 评论数据，因此无法从用户评论中提炼新的真实痛点或满意度反馈。

基于今日唯一 PR 的内容，可以间接观察到的产品诉求是：

- 当前 Web UI 的 session 展示能力可能偏基础；
- 当 session 来源扩展到多个 channel 后，现有 header dropdown 交互可能不再够用；
- 用户或开发者需要更全局、更结构化的会话导航方式；
- Web UI 正在承载更复杂的使用场景，而不仅仅是单一 `pico` session 的入口。

相关链接：

- [PR #3413 feat(web): global multi-channel session sidebar](https://github.com/sipeed/picoclaw/pull/3413)

---

## 7. 待处理积压

今日数据中没有提供长期未响应的 Issue 或 PR 列表，因此无法判断是否存在长期积压项。

当前需要维护者优先关注的开放项是：

### [PR #3413 feat(web): global multi-channel session sidebar](https://github.com/sipeed/picoclaw/pull/3413)

建议维护者关注点：

1. **后端 session 发现逻辑是否足够通用**  
   需要确认是否能稳定覆盖所有 channel，而不是仅对当前已知 channel 做硬编码适配。

2. **UI 信息架构是否可扩展**  
   侧边栏未来可能承载大量 session、channel、状态信息，应避免初始设计过于局限。

3. **兼容现有 `pico` session 行为**  
   从 header dropdown 到 global sidebar 的迁移，应避免破坏已有用户工作流。

4. **与 #3406 的整体设计保持一致**  
   该 PR 是 Part 2-A，建议检查其边界是否清晰，避免提前引入后续阶段才应处理的复杂逻辑。

---

## 项目健康度小结

- **开发活跃度**：低到中等，仅 1 条开放 PR 更新  
- **社区活跃度**：较低，今日无 Issues 活动  
- **稳定性信号**：平稳，无新增 Bug 报告  
- **功能推进方向**：明确，重点在 Web UI 多通道会话管理  
- **发布节奏**：今日无新版本发布  

总体来看，PicoClaw 今日没有大规模社区互动或发布动作，但 Web UI 方向有实质性功能推进。短期内最值得跟进的是 [PR #3413](https://github.com/sipeed/picoclaw/pull/3413) 是否能够完成 review 并合并，它可能是多通道 session 管理体验升级的重要基础。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报  
**日期：2026-10-01**  
**仓库：github.com/qwibitai/nanoclaw**

## 1. 今日速览

过去 24 小时 NanoClaw 没有 Issue 更新，但 Pull Request 活跃度较高，共有 **7 条 PR 更新**，其中 **6 条仍处于 Open 状态，1 条已关闭/完成处理**。今日工作重点集中在 **Telegram 通道稳定性修复、Agent Runner/容器安全加固、Provider 扩展机制、GitHub Copilot Provider 集成** 等方向。  
整体来看，项目处于较活跃的工程推进阶段：虽然社区 Issue 侧没有新增反馈，但核心代码层面出现了多条可合并的修复和能力扩展 PR，说明维护者与贡献者正在集中处理通道可靠性和运行时扩展能力。  
健康度评估：**短期活跃度良好，Bug 修复密集；但当前有 6 个待合并 PR，需要维护者尽快 Review，以避免修复积压。**

---

## 2. 版本发布

过去 24 小时 **无新版本发布**。

---

## 3. 项目进展

### 已关闭 / 已处理 PR

#### #3974 fix(container): refresh agent-runner lockfile to clear transitive advisories  
链接：https://github.com/qwibitai/nanoclaw/pull/3974  
状态：CLOSED  
作者：glifocat  
标签：`kind/hardening`, `core-team`, `area/agent-runner`

该 PR 刷新了 `container/agent-runner/bun.lock`，用于清理 `bun audit` 中发现的传递依赖安全告警。问题来源于 `@modelcontextprotocol/sdk` 1.29.0 相关依赖链中固定了较旧的 transitive dependency，例如 `hono`、`@hono/node-server` 等。

**影响：**
- 提升 Agent Runner 容器依赖安全性。
- 属于安全加固类改动，不涉及功能行为变更。
- 如果已被维护者接受或替代处理，将有助于降低供应链风险。

**项目推进评估：**
该 PR 虽然不是功能型变更，但对运行时安全和发布可信度有正面作用。对于 AI Agent 框架而言，容器与 Runner 是关键执行边界，依赖审计通过对于企业部署和生产环境采用尤其重要。

---

## 4. 社区热点

今日没有 Issue 更新，也没有可用评论数与反应数据；所有 PR 的评论字段均为 `undefined`，点赞数均为 0。因此从可观测数据看，**没有明确的社区讨论热点**。

不过，从 PR 主题看，以下方向可能是当前开发热点：

### 4.1 GitHub Copilot Provider 集成

#### #3976 feat(skills): add /add-copilot GitHub Copilot SDK provider  
链接：https://github.com/qwibitai/nanoclaw/pull/3976  
状态：OPEN  
作者：barnuri  
标签：`area/providers`, `area/setup-installation`, `area/skills`

该 PR 增加 `/add-copilot` provider skill，用于将 GitHub Copilot 作为 NanoClaw runtime 接入，同时将 device-login token 保留在 credential gateway 中，避免通过环境变量或容器状态传递 token。

**背后诉求：**
- 用户希望将 GitHub Copilot 作为可选模型或 Provider 接入 NanoClaw。
- 同时对凭据隔离、安全登录和运行时授权有较高要求。
- 说明 NanoClaw 的 Provider 生态正在向更多主流 AI 编程助手后端扩展。

### 4.2 Provider 与 Host Extension 扩展能力

#### #3975 feat: add generic runner and host extension callbacks  
链接：https://github.com/qwibitai/nanoclaw/pull/3975  
状态：OPEN  
作者：foxsky  
标签：`area/agent-runner`, `area/containers`, `area/core`, `area/providers`

该 PR 增加了 5 个惰性 extension callbacks，使 Provider 能够挂接到目前 skill 无法触达的执行点。未注册回调时，主分支行为保持不变。

**背后诉求：**
- 现有 skill 机制可能不足以满足复杂 Provider 的生命周期控制需求。
- Provider 需要更底层、更灵活的 Runner/Host 扩展点。
- 这是向插件化 Provider 架构演进的重要信号。

### 4.3 Telegram 通道稳定性修复集中出现

相关 PR：
- #3973：https://github.com/qwibitai/nanoclaw/pull/3973
- #3972：https://github.com/qwibitai/nanoclaw/pull/3972
- #3971：https://github.com/qwibitai/nanoclaw/pull/3971

三条 PR 均由 antonio-antuan 提交，集中修复 Telegram bridge 在 Markdown 解析、service message、forum topic/thread 映射方面的问题。

**背后诉求：**
- Telegram 是当前 NanoClaw 的重要用户入口之一。
- 用户在群组、超级群、论坛 topic 等复杂场景中使用 NanoClaw。
- 当前 Telegram adapter 在真实生产场景中暴露出若干消息路由和格式兼容性问题。

---

## 5. Bug 与稳定性

今日没有新开 Issue，但有多条 Bug fix PR，说明稳定性修复主要通过 PR 直接推进。

### 高优先级

#### #3973 fix(telegram): resend as plain text when Telegram can't parse entities  
链接：https://github.com/qwibitai/nanoclaw/pull/3973  
状态：OPEN  
作者：antonio-antuan  
标签：`kind/bug`, `PR: Fix`, `area/channels`

**问题：**  
当 Telegram 无法解析 MarkdownV2 实体时，会拒绝整条消息。例如包含指向私有 IP 的链接时，bridge 会重复发送同一 payload，最终消息被丢弃。

**修复方向：**
- 当 Telegram 无法解析富文本实体时，改为以 plain text 重新发送。
- 避免用户看不到 Agent 回复。

**严重性评估：高**  
该问题直接导致回复丢失，影响用户可见性和通信可靠性。

---

#### #3970 fix(delivery): strip the agent-group suffix from reaction/edit target ids  
链接：https://github.com/qwibitai/nanoclaw/pull/3970  
状态：OPEN  
作者：antonio-antuan  
标签：`kind/bug`, `PR: Fix`, `area/core`

**问题：**  
Router 将 inbound message row 存储为 `<platform msg id>:<agent group id>`，但 `add_reaction` 或 inbound message edit 需要使用平台原始 message id。当前如果直接使用 session row id，可能导致 reaction 或 edit 无法正确作用到目标消息。

**修复方向：**
- 在 reaction/edit 投递前移除 agent-group suffix。
- 确保平台收到的是原始 message id。

**严重性评估：高**  
涉及核心 delivery 路径，可能影响多个平台或多 Agent group 场景中的消息编辑、reaction 行为。

---

### 中优先级

#### #3971 fix(telegram): route forum topics as threads  
链接：https://github.com/qwibitai/nanoclaw/pull/3971  
状态：OPEN  
作者：antonio-antuan  
标签：`kind/bug`, `PR: Fix`, `area/channels`

**问题：**  
Telegram adapter 当前声明 `supportsThreads: false`，导致 forum supergroup 中不同 topic 共享同一个 session，Agent 回复也可能没有回到原 topic。

**修复方向：**
- 将 Telegram forum topics 映射为 threads。
- 每个 topic 拥有独立 session，并将回复发送回对应 topic。

**严重性评估：中到高**  
对普通一对一聊天影响较小，但对 Telegram 论坛群、社区支持群、多主题工作流影响较大。

---

#### #3972 fix(telegram): drop service messages instead of forwarding them as empty  
链接：https://github.com/qwibitai/nanoclaw/pull/3972  
状态：OPEN  
作者：antonio-antuan  
标签：`kind/bug`, `PR: Fix`, `area/channels`

**问题：**  
Telegram 的 service messages，例如 topic hide/unhide/create、置顶、成员加入等事件，没有文本和附件，但当前 interceptor 会将其转发给 Agent，导致 Agent 对空消息作出无意义回复。

**修复方向：**
- 识别并丢弃 service messages。
- 避免空消息进入 Agent pipeline。

**严重性评估：中**  
不会造成系统崩溃，但会产生噪声回复，影响群组使用体验。

---

### 安全与稳定性加固

#### #3974 fix(container): refresh agent-runner lockfile to clear transitive advisories  
链接：https://github.com/qwibitai/nanoclaw/pull/3974  
状态：CLOSED  
作者：glifocat  
标签：`kind/hardening`, `area/agent-runner`

**问题：**  
Agent Runner lockfile 中固定了带有安全告警的传递依赖版本。

**修复方向：**
- 在现有版本范围内刷新 lockfile。
- 清理 `bun audit` findings。

**严重性评估：中**  
属于供应链安全风险，不一定影响当前运行功能，但对生产部署可信度重要。

---

## 6. 功能请求与路线图信号

今日无新 Issue，因此没有直接来自用户的新功能请求。不过多个功能型 PR 透露出明确路线图信号。

### 6.1 GitHub Copilot Provider 可能进入下一阶段集成

#### #3976 feat(skills): add /add-copilot GitHub Copilot SDK provider  
链接：https://github.com/qwibitai/nanoclaw/pull/3976  
状态：OPEN

该 PR 表明 NanoClaw 正在探索将 GitHub Copilot SDK 纳入 Provider 体系。其设计重点不是简单接入 token，而是通过 credential gateway 保管 device-login token，降低凭据泄露风险。

**可能进入下一版本的理由：**
- PR 已经实现为 `/add-copilot` skill，具备可操作入口。
- 涉及 setup-installation、providers、skills 三个关键领域，说明是完整功能而非孤立实验。
- 安全模型描述明确，符合上游合并要求。

**潜在影响：**
- 增加 NanoClaw 对开发者场景的吸引力。
- 可能让用户通过 Copilot 作为 runtime 支撑 Agent 执行。
- 需要重点 Review 凭据生命周期、权限边界、登出/刷新机制。

---

### 6.2 Generic Runner 与 Host Extension Callback 是 Provider 架构演进信号

#### #3975 feat: add generic runner and host extension callbacks  
链接：https://github.com/qwibitai/nanoclaw/pull/3975  
状态：OPEN

该 PR 为 Provider 增加底层 extension callbacks，让 Provider 可以挂载到 skill 当前无法触达的位置。

**可能进入下一版本的理由：**
- PR 描述强调“未注册时行为保持不变”，兼容性风险较低。
- 它可能是 Copilot Provider 或其他高级 Provider 所需的前置基础设施。
- 涉及 `area/agent-runner`, `area/containers`, `area/core`, `area/providers`，说明其属于架构级扩展。

**潜在影响：**
- Provider 能力更灵活。
- 后续可能支持更复杂的运行时生命周期管理、任务轮询控制、宿主环境扩展。
- 需要防止 extension callback 过度开放导致安全边界模糊。

---

### 6.3 Telegram 群组与论坛 Topic 支持正在被强化

相关 PR：
- #3971：https://github.com/qwibitai/nanoclaw/pull/3971
- #3972：https://github.com/qwibitai/nanoclaw/pull/3972
- #3973：https://github.com/qwibitai/nanoclaw/pull/3973

这些 PR 共同表明 NanoClaw 的 Telegram integration 正在从基础消息转发，向更真实的社区/群组工作流适配演进。

**路线图信号：**
- 更好支持 Telegram forum supergroup。
- 更准确处理 thread/session 映射。
- 更稳健处理平台格式限制和 service events。

---

## 7. 用户反馈摘要

今日无 Issue 评论更新，因此没有可直接引用的用户反馈。不过从 PR 描述可以反向提炼出当前真实使用场景与痛点。

### 7.1 Telegram 用户痛点

相关 PR：
- #3971：https://github.com/qwibitai/nanoclaw/pull/3971
- #3972：https://github.com/qwibitai/nanoclaw/pull/3972
- #3973：https://github.com/qwibitai/nanoclaw/pull/3973

**痛点概括：**
- 在 Telegram forum supergroup 中，不同 topic 被混入同一 session，造成上下文串扰。
- Service messages 被误当成用户输入，导致 Agent 产生无意义回复。
- MarkdownV2 解析失败时，Agent 回复可能完全丢失。

**典型场景：**
- 用户在 Telegram 群组中将 NanoClaw 作为团队机器人或社区助手使用。
- 不同 topic 可能代表不同项目、客户、任务或讨论线程。
- 用户希望 Agent 回复稳定、上下文隔离、不要被群组系统事件误触发。

**满意/不满意信号：**
- 不满意点主要集中在平台适配细节和消息可靠性。
- 当前已有 fix PR，说明维护者或贡献者对这些生产使用问题响应积极。

---

### 7.2 Provider 接入与凭据安全痛点

相关 PR：
- #3976：https://github.com/qwibitai/nanoclaw/pull/3976

**痛点概括：**
- 早期 Copilot provider 方案可能通过环境变量或容器状态传递 token，扩大了凭据暴露面。
- 用户希望接入更多 Provider，但不希望牺牲安全边界。

**典型场景：**
- 开发者希望把 GitHub Copilot 作为 NanoClaw 的运行时能力。
- 团队或企业用户需要确保 device-login token 不落入不受控环境。

---

## 8. 待处理积压

### 当前待处理 PR：6 条

以下 PR 均创建于 2026-09-30，尚不属于长期积压，但由于它们集中覆盖核心稳定性和 Provider 架构，建议维护者优先 Review。

#### 高优先级建议 Review

1. **#3973 fix(telegram): resend as plain text when Telegram can't parse entities**  
   链接：https://github.com/qwibitai/nanoclaw/pull/3973  
   理由：直接影响 Telegram 回复是否可达，用户可见性问题明显。

2. **#3970 fix(delivery): strip the agent-group suffix from reaction/edit target ids**  
   链接：https://github.com/qwibitai/nanoclaw/pull/3970  
   理由：涉及核心 delivery 路径，可能影响 reaction/edit 的跨平台正确性。

3. **#3971 fix(telegram): route forum topics as threads**  
   链接：https://github.com/qwibitai/nanoclaw/pull/3971  
   理由：修复 Telegram forum topic 的 session 隔离问题，避免上下文串扰。

4. **#3972 fix(telegram): drop service messages instead of forwarding them as empty**  
   链接：https://github.com/qwibitai/nanoclaw/pull/3972  
   理由：减少群组噪声，提升 Agent 在 Telegram 群组中的可用性。

#### 架构与功能类 Review

5. **#3975 feat: add generic runner and host extension callbacks**  
   链接：https://github.com/qwibitai/nanoclaw/pull/3975  
   理由：涉及 Runner、容器、核心和 Provider 扩展点，需重点审查兼容性、安全边界和 callback 生命周期。

6. **#3976 feat(skills): add /add-copilot GitHub Copilot SDK provider**  
   链接：https://github.com/qwibitai/nanoclaw/pull/3976  
   理由：新增 Copilot Provider 能力，建议重点 Review 凭据处理、安装流程、权限边界和用户配置体验。

### 长期未响应项

根据今日提供的数据，**没有长期未响应的重要 Issue 或 PR**。当前积压主要是过去 24 小时内新增或更新的待合并 PR。维护者应关注 Review 节奏，避免 Telegram 修复与 Provider 基础设施改动在短期内形成合并瓶颈。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报｜2026-10-01

## 1. 今日速览

过去 24 小时，NullClaw 项目整体活跃度较低但仍有功能型贡献进入队列：没有新的 Issue、没有 Issue 关闭，也没有新版本发布。今日唯一更新来自一个新增 Pull Request，聚焦于扩展 OpenAI-compatible provider 生态。该 PR 尚未合并，说明项目当前更多处于功能评审与集成准备阶段，而非高频迭代或集中修复期。  
从健康度看，今日没有 Bug 报告或回归反馈，短期稳定性信号较平稳；但社区讨论量较少，用户反馈与维护者响应情况暂时缺乏更多样本支撑。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

### 新增待审 PR

#### [#1016 feat(providers): add Cheaper Inference as an OpenAI-compatible gateway](https://github.com/nullclaw/nullclaw/pull/1016)

- **状态**：Open
- **作者**：aiapienthusiast
- **创建时间**：2026-09-30
- **更新时间**：2026-09-30
- **评论数**：暂无数据
- **👍 反应数**：0

该 PR 为 NullClaw 新增了 **Cheaper Inference** 作为 OpenAI-compatible gateway provider。根据摘要，该实现参考了此前的 [#990](https://github.com/nullclaw/nullclaw/pull/990) Eden AI provider 模式，说明项目已有一套较成熟的第三方模型网关接入范式。

该 PR 的主要意义在于：

- 扩展 NullClaw 可用模型供应商生态；
- 允许用户通过一个 API key 访问多个实验室或模型提供方的模型；
- 强化 NullClaw 对 OpenAI-compatible 接口的兼容策略；
- 有助于降低用户在模型调用成本、模型切换和供应商选择上的门槛。

由于该 PR 尚未合并，今日项目主干代码层面暂无确定性推进。但从方向上看，NullClaw 正继续围绕 **多 Provider 支持、模型接入灵活性和成本优化** 进行功能扩展。

---

## 4. 社区热点

### 今日唯一活跃 PR

#### [#1016 feat(providers): add Cheaper Inference as an OpenAI-compatible gateway](https://github.com/nullclaw/nullclaw/pull/1016)

该 PR 是今日唯一有更新的社区贡献，因此也是今日主要热点。虽然目前没有可见的评论和反应数据，但其背后反映出一个明确诉求：用户希望 NullClaw 支持更多 OpenAI-compatible 模型网关，以便在不同模型供应商之间获得更好的价格、可用性和模型覆盖。

这类需求通常来自以下使用场景：

- 用户希望降低 LLM 推理成本；
- 团队希望通过统一接口接入多个模型供应商；
- 用户希望避免绑定单一模型平台；
- 开发者希望 NullClaw 能更容易适配新兴 LLM gateway。

如果该 PR 被接受，可能会进一步巩固 NullClaw 在「个人 AI 助手 / 智能体运行时」场景下的 provider 扩展能力。

---

## 5. Bug 与稳定性

过去 24 小时未发现新的 Bug、崩溃、回归或稳定性相关 Issue。

当前数据中也没有显示针对 Bug 的修复 PR。因此今日稳定性风险较低，但也可能意味着：

- 今日用户反馈量较低；
- 尚无明显回归暴露；
- 项目当前关注点更偏向 provider 功能扩展，而非缺陷修复。

| 严重程度 | 问题 | 状态 | Fix PR |
|---|---|---|---|
| 高 | 无 | - | - |
| 中 | 无 | - | - |
| 低 | 无 | - | - |

---

## 6. 功能请求与路线图信号

### Provider 生态继续扩展

#### [#1016 Cheaper Inference provider](https://github.com/nullclaw/nullclaw/pull/1016)

该 PR 是今日最明确的路线图信号。它表明社区正在推动 NullClaw 增加更多 OpenAI-compatible provider 支持，尤其是可以聚合多个模型实验室能力的 LLM gateway。

结合 PR 摘要中提到的「使用与 #990 Eden AI 相同的模式」，可以观察到以下趋势：

1. **OpenAI-compatible 接口可能成为 NullClaw provider 集成的主路径之一**  
   这有助于降低新增 provider 的实现成本，也方便用户复用已有配置习惯。

2. **多模型网关需求正在增强**  
   Cheaper Inference 这类 provider 的价值不只是接入单一模型，而是通过一个入口访问多个模型来源。

3. **成本优化成为用户关注点**  
   从名称和描述看，Cheaper Inference 的核心卖点之一是更便宜的推理调用，这说明用户在 AI 助手和智能体长期运行场景下，对 token 成本较为敏感。

如果该 PR 通过评审并合并，较有可能被纳入后续版本，作为 provider 扩展能力的一部分发布。

---

## 7. 用户反馈摘要

今日没有新的 Issue，也没有可见的 Issue 评论数据，因此无法从 Issues 中提炼直接的用户痛点或满意度反馈。

不过，从今日唯一 PR 可以间接观察到社区需求：

- 用户希望 NullClaw 支持更多模型调用后端；
- 用户希望通过统一的 OpenAI-compatible 方式接入新 provider；
- 用户对推理成本、模型供应商多样性和配置灵活性有持续需求。

目前暂无负面反馈、崩溃报告或使用阻塞问题被记录。

---

## 8. 待处理积压

基于提供的数据，过去 24 小时内未出现长期未响应的 Issue 或 PR 信息，因此无法判断更广范围内的积压情况。

今日需要维护者关注的主要待处理项是：

### [#1016 feat(providers): add Cheaper Inference as an OpenAI-compatible gateway](https://github.com/nullclaw/nullclaw/pull/1016)

建议维护者重点检查：

- provider 配置格式是否与现有 OpenAI-compatible provider 保持一致；
- API key、base URL、model mapping 等配置是否清晰；
- 是否需要补充文档或示例配置；
- 是否需要测试覆盖 provider 初始化、请求转发和错误处理；
- 与既有 provider，如 Eden AI 的实现模式是否重复或可抽象复用。

---

## 总体健康度评估

NullClaw 今日处于 **低活跃、低风险、功能扩展待审** 状态。没有新 Issue 和 Bug 报告，说明短期稳定性未出现明显异常；但社区讨论量偏低，也意味着可观察到的用户反馈有限。今日最值得关注的是 [#1016](https://github.com/nullclaw/nullclaw/pull/1016)，它延续了项目扩展 OpenAI-compatible provider 的方向，若顺利合并，将提升 NullClaw 在多模型接入和推理成本优化方面的吸引力。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报｜2026-10-01

## 1. 今日速览

过去 24 小时，LobsterAI 项目活跃度处于**中低频但聚焦修复**状态：新增/活跃 Issue 1 条，PR 更新 3 条，其中 2 条已关闭，1 条仍待合并。今日核心主题集中在 **NIM P2P 私信策略的安全边界修复** 与 **OpenClaw / 模型路由相关稳定性修复**。  
值得关注的是，Issue #2784 报告了一个“fail open”类型的访问控制问题，随后已有对应修复 PR #2785 提交，说明维护响应较快。整体来看，项目今日没有新版本发布，但在安全策略、模型输出上限、计划模型路由等关键路径上有明确推进。

---

## 2. 项目进展

### 已关闭 / 已处理 PR

#### PR #2787：修复自定义模型的 plan routing  
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2787  
- 状态：Closed  
- 作者：fisherdaddy  
- 涉及区域：`renderer`、`main`、`openclaw`、`cowork`

该 PR 主要修复自定义模型在 plan routing 场景下的路由问题，涉及前端渲染层、主进程、OpenClaw 以及 cowork 相关逻辑。虽然 PR 摘要未提供更多细节，但从标签范围看，该修复可能影响用户在多模型、自定义模型或协作模式下的任务规划链路。

**项目推进意义：**
- 改善自定义模型在计划/推理流程中的可用性。
- 降低因模型路由错误导致的任务执行失败。
- 对 OpenClaw 与 cowork 场景的稳定性有正向影响。

---

#### PR #2786：为默认 LobsterAI server 模型设置 32K 输出上限  
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2786  
- 状态：Closed  
- 作者：fisherdaddy  
- 涉及区域：`main`、`openclaw`

该 PR 修复了 OpenClaw 在处理计划模型时默认输出 token 上限过低的问题。原先当服务端模型元数据未携带 `maxTokens` 时，OpenClaw 会使用通用默认值 8192，可能导致推理模型尚未输出可见答案就提前截断。

本次调整为 LobsterAI server 模型增加 32768 的 provider 默认输出上限，同时保留以下优先级规则：
- 服务端发布的 token 上限优先；
- 上下文窗口限制优先；
- Kimi K3 profile 优先；
- 仅在缺省情况下使用新的 32768 默认值。

**项目推进意义：**
- 改善推理模型、计划模型的长输出体验。
- 减少“回答中断”“没有可见答案”“思考链未完成”等问题。
- 对 agent 任务规划、多步骤执行和复杂问答场景有明显稳定性收益。

---

### 待合并 PR

#### PR #2785：修复 P2P 私信策略 fail open 问题  
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2785  
- 状态：Open  
- 作者：carfeii  
- 关联 Issue：https://github.com/netease-youdao/LobsterAI/issues/2784  
- 涉及区域：`main`、`im`

该 PR 修复 NIM P2P 入站消息过滤逻辑中的策略判断缺陷。当前逻辑仅在 `policy === 'allowlist'` 且 `allowFrom` 非空时执行检查，其余情况，包括：
- 显式设置为 `'disabled'`；
- policy 未设置；
- `'allowlist'` 但 `allowFrom` 为空；

都会直接放行，形成 fail open 行为。

PR #2785 将该逻辑改为更加保守的 fail closed 方式，避免未授权发送者绕过策略限制。

**项目推进意义：**
- 明确收紧 IM 入站消息安全边界。
- 修复潜在访问控制绕过问题。
- 建议作为下一次补丁版本的优先合入项。

---

## 3. 社区热点

### Issue #2784：NIM P2P direct-message policy fails open  
- 链接：https://github.com/netease-youdao/LobsterAI/issues/2784  
- 状态：Open  
- 作者：carfeii  
- 评论数：1  
- 👍：0  
- 关联修复 PR：https://github.com/netease-youdao/LobsterAI/pull/2785

这是今日唯一新增/活跃 Issue，也是今日最值得关注的讨论点。问题影响 NIM gateway 的 P2P 入站消息策略：在策略为 disabled、未设置，或 allowlist 为空时，本应拒绝或限制消息来源，但实际逻辑会放行任意发送者。

**背后诉求分析：**
- 用户或贡献者关注 LobsterAI 在即时通信集成场景下的安全默认值。
- 当前问题属于“默认放行”而非“默认拒绝”，风险级别高于普通功能缺陷。
- 该 Issue 同时覆盖最新 tagged release `2026.9.23` 与默认分支 `main`，说明并非只存在于开发分支，而可能影响已发布用户。

**社区响应情况：**
- 已有同一作者提交修复 PR #2785。
- 当前讨论量不高，但从问题性质看，应优先进入维护者 review 队列。

---

## 4. Bug 与稳定性

### 高严重度：NIM P2P 私信策略 fail open，可能允许任意发送者绕过限制  
- Issue：https://github.com/netease-youdao/LobsterAI/issues/2784  
- Fix PR：https://github.com/netease-youdao/LobsterAI/pull/2785  
- 状态：Issue Open，修复 PR Open  
- 影响版本：
  - 最新 tagged release：`2026.9.23`
  - 默认分支：`main`，commit `791a352dee3b3d8c6f64edcaf229ce474a68f6c5`

**问题描述：**  
NIM gateway 的 P2P 入站消息过滤逻辑仅在 `policy === 'allowlist'` 且 `allowFrom` 非空时生效。若策略为 disabled、未设置，或 allowlist 为空，则消息不会被拦截，导致任意发送者可能绕过策略限制。

**稳定性 / 安全影响：**
- 可能破坏用户对 P2P 私信来源控制的预期。
- 在机器人、agent、企业 IM 集成场景下，可能引入未授权消息触发任务执行的风险。
- 属于访问控制边界问题，应优先处理。

**当前修复进度：**
- 已有 PR #2785 提交修复。
- 建议维护者优先 review，并考虑补充单元测试覆盖：
  - `policy = disabled`
  - `policy = undefined`
  - `policy = allowlist` 且 `allowFrom = []`
  - 未授权 sender
  - 授权 sender

---

### 中严重度：OpenClaw 默认输出上限过低导致推理模型提前截断  
- PR：https://github.com/netease-youdao/LobsterAI/pull/2786  
- 状态：Closed  
- 作者：fisherdaddy

**问题描述：**  
计划模型通常是 reasoning models，若服务端未发布 `maxTokens`，OpenClaw 使用通用默认值 8192，可能导致模型在完成最终答案前就达到输出限制。

**影响场景：**
- 多步骤 agent 规划；
- 长上下文推理；
- 复杂任务拆解；
- OpenClaw 调用 LobsterAI server 模型。

**当前处理：**
- 已调整默认输出上限为 32768。
- 优先级仍受服务端 caps、上下文窗口与 Kimi K3 profile 约束。

---

### 中低严重度：自定义模型 plan routing 异常  
- PR：https://github.com/netease-youdao/LobsterAI/pull/2787  
- 状态：Closed  
- 作者：fisherdaddy

**问题描述：**  
自定义模型在计划路由流程中存在问题，影响区域包括 renderer、main、openclaw、cowork。虽然 PR 未给出详细摘要，但从标题判断，该问题会影响自定义模型在 agent plan 流程中的正确调度。

**当前处理：**
- PR 已关闭，可能已完成修复或被其他方式处理。
- 建议后续 release note 中说明是否已合并，以便用户确认可用版本。

---

## 5. 功能请求与路线图信号

今日没有明确的新功能请求类 Issue。现有动态主要集中在缺陷修复与稳定性增强。

不过，从今日 PR 可以看到几个路线图信号：

### 1. OpenClaw 与计划模型能力持续增强  
- 相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2786  
- 相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2787  

OpenClaw 相关修复连续出现，说明该模块可能是近期维护重点。尤其是 plan routing、自定义模型、推理模型输出上限等问题，均指向 LobsterAI 正在强化 agent 规划、模型编排和长任务执行能力。

### 2. 自定义模型体验可能成为下一阶段重点  
- 相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2787  

修复 custom model plan routing 表明项目正在提高非默认模型、用户自带模型或第三方模型接入场景的兼容性。下一版本中可能会继续围绕模型配置、模型元数据、路由策略和协作模式进行改进。

### 3. IM / NIM 安全策略需要更严格默认值  
- Issue：https://github.com/netease-youdao/LobsterAI/issues/2784  
- Fix PR：https://github.com/netease-youdao/LobsterAI/pull/2785  

P2P inbound message policy 的问题暴露出 IM 集成模块在安全默认值方面需要进一步强化。未来路线图中可能需要加入更系统化的安全策略测试与配置校验。

---

## 6. 用户反馈摘要

今日可提炼的用户/贡献者反馈主要来自 Issue #2784。

### 痛点 1：安全策略配置与实际行为不一致  
- Issue：https://github.com/netease-youdao/LobsterAI/issues/2784  

用户指出，当策略为 disabled 或未设置时，系统实际行为是允许消息通过。这与常见安全预期不一致：在不确定或禁用状态下，系统应倾向拒绝，而不是放行。

### 痛点 2：allowlist 空列表语义不清或实现不安全  
- Issue：https://github.com/netease-youdao/LobsterAI/issues/2784  

当 `policy = allowlist` 但 `allowFrom` 为空时，合理预期通常是“不允许任何来源”，但当前实现会放行所有来源。这说明配置语义和代码行为之间存在偏差。

### 痛点 3：已发布版本受影响，用户需要明确修复版本  
- Issue：https://github.com/netease-youdao/LobsterAI/issues/2784  

问题已确认存在于最新 tagged release `2026.9.23`。这意味着使用稳定版本的用户也可能受影响。维护者后续若合并 PR #2785，建议尽快发布补丁版本，并在 release note 中明确标注安全修复。

---

## 7. 待处理积压

当前数据仅覆盖过去 24 小时，未显示长期未响应的历史 Issue 或 PR。因此无法判断是否存在长期积压项。

但从今日数据看，以下事项需要维护者优先关注：

### 待 review / 待合并：PR #2785  
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2785  
- 关联 Issue：https://github.com/netease-youdao/LobsterAI/issues/2784  
- 优先级：高

这是今日最重要的待处理项。由于其修复的是 P2P 消息策略 fail open 问题，建议：
1. 优先完成代码 review；
2. 补充策略边界测试；
3. 合并后尽快发布补丁版本；
4. 在 release note 中提示受影响版本与升级建议。

### 待确认状态：PR #2786、PR #2787  
- PR #2786：https://github.com/netease-youdao/LobsterAI/pull/2786  
- PR #2787：https://github.com/netease-youdao/LobsterAI/pull/2787  

两者状态均为 Closed，但当前数据未明确区分“已合并”还是“关闭未合并”。建议维护者在项目看板或 release note 中明确这些修复是否已进入主分支，以便用户判断是否能够从后续版本中获得相关修复。

---

## 项目健康度评估

- **活跃度：中低**  
  过去 24 小时共有 1 个 Issue 与 3 个 PR 更新，数量不高，但集中在关键模块。

- **维护响应：较好**  
  安全相关 Issue 当日已有对应修复 PR，说明响应速度较快。

- **风险点：中高**  
  NIM P2P 策略 fail open 问题影响已发布版本，建议尽快合并修复并发布补丁。

- **工程方向：稳定性优先**  
  今日变更集中在 OpenClaw、模型路由、输出 token 上限和 IM 安全策略，说明项目近期重点是提升 agent 执行链路和集成模块的可靠性。

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

# CoPaw 项目动态日报｜2026-10-01

> 数据来源：用户提供的 GitHub 活动快照。  
> 注：原始数据中的仓库链接显示为 `agentscope-ai/QwenPaw`，本文按提供链接引用；日报对象仍按用户要求称为 CoPaw。

---

## 1. 今日速览

过去 24 小时，项目活跃度较高：共有 **7 条 Issue 更新**、**17 条 PR 更新**，并发布了 **1 个 beta 版本 v2.2.2-beta.4**。  
今日新增/活跃 Issue 全部仍处于 Open 状态，主要集中在 **Provider 兼容性、Console 会话稳定性、MCP 协议兼容、时间戳处理、后台任务结果回收** 等方面。  
PR 侧推进明显，出现了多条针对当天 Issue 的快速修复 PR，例如 #8051 对应 #8047、#8050 对应 #8046、#8061 对应 #8058、#8060 对应 #8057，说明维护响应速度较快。  
整体来看，项目正处于 **beta 版本高频打磨期**：功能持续扩展，但边界场景、第三方 Provider 兼容性和 Console 稳定性仍是当前主要风险点。

---

## 2. 版本发布

### v2.2.2-beta.4

- Release：[#v2.2.2-beta.4](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.2-beta.4)
- 相关 Release Duty Issue：[#8053](https://github.com/agentscope-ai/QwenPaw/issues/8053)

本次发布为 **Beta 版本**，从 Release 摘要可见，主要变化包括：

1. **记忆与 Reranker 配置能力增强**
   - 引入 `ReMeLightMemoryCard` 的 reranker UI 配置面板。
   - 对应变更来自：
     - `feat: add reranker UI config panel to ReMeLightMemoryCard`
     - PR：[#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399)

2. **版本号更新**
   - 将版本提升至 `2.2.2b4`。
   - PR：[#7892](https://github.com/agentscope-ai/QwenPaw/pull/7892)

3. **Console 性能与依赖拆分**
   - Release 摘要中提到 `perf(console): split chat dependencies...`，说明 Console 侧进行了依赖或性能层面的拆分优化，但数据中内容被截断，无法进一步确认完整影响范围。

### 破坏性变更

当前数据中未明确标注 breaking change。  
但从今日 Issue 和 PR 反馈看，`v2.2.2b4` 引入或暴露了若干兼容性问题，尤其包括：

- 自定义 OpenAI-compatible Responses Provider 的 `prompt_cache_key` 被拒绝：[#8058](https://github.com/agentscope-ai/QwenPaw/issues/8058)
- Anthropic Messages Provider 的缓存 token 未计入上下文表：[#8057](https://github.com/agentscope-ai/QwenPaw/issues/8057)
- 后台任务完成后记录丢失或返回空结果：[#8059](https://github.com/agentscope-ai/QwenPaw/issues/8059)

这些不一定是正式破坏性变更，但对依赖第三方 Provider、Prompt Cache、后台多 Agent 任务的用户具有实际升级风险。

### 迁移与升级注意事项

建议从 `2.2.1` 或早期 beta 升级到 `v2.2.2-beta.4` 的用户重点验证以下路径：

- **MCP streamable_http 驱动**  
  使用 DBX、旧握手协议 MCP Server 的用户，应关注 #8047 / #8051。
  - Issue：[#8047](https://github.com/agentscope-ai/QwenPaw/issues/8047)
  - Fix PR：[#8051](https://github.com/agentscope-ai/QwenPaw/pull/8051)

- **Prompt Cache 配置**
  自定义 OpenAI-compatible 网关如果依赖 `prompt_cache_key` 或 `prompt_cache_retention`，需关注 #8058 / #8061。
  - Issue：[#8058](https://github.com/agentscope-ai/QwenPaw/issues/8058)
  - Fix PR：[#8061](https://github.com/agentscope-ai/QwenPaw/pull/8061)

- **Anthropic 上下文统计**
  使用 Anthropic Messages 协议和 prompt caching 的用户，当前 UI 上下文表可能低估 token 使用量。
  - Issue：[#8057](https://github.com/agentscope-ai/QwenPaw/issues/8057)
  - Fix PR：[#8060](https://github.com/agentscope-ai/QwenPaw/pull/8060)

- **后台 Agent 任务**
  多 Agent 场景中使用 `submit_to_agent`、`check_agent_task` 的用户，应关注任务结果丢失和空响应问题。
  - Issue：[#8059](https://github.com/agentscope-ai/QwenPaw/issues/8059)
  - 相关 PR：[#8063](https://github.com/agentscope-ai/QwenPaw/pull/8063)

---

## 3. 项目进展

今日共有 **17 条 PR 更新**，其中 **12 条仍待合并，5 条已关闭或合并**。  
重要进展主要集中在稳定性修复、安全加固、Provider 兼容性和测试覆盖。

### 已关闭 / 已合并的重要 PR

> 数据仅标记为 `CLOSED`，未区分 merged 或直接关闭，因此以下表述采用“已关闭/完成处理”。

#### #8056 fix(config): surface config write failures with a clear message

- PR：[#8056](https://github.com/agentscope-ai/QwenPaw/pull/8056)
- 类型：配置错误处理改进
- 状态：Closed
- 影响：
  - 当 `config.json` 因只读、磁盘满、被同步工具或杀毒软件锁定等原因无法写入时，Console 过去可能只抛出底层 `OSError`。
  - 该 PR 让配置写入失败以更清晰的方式暴露给用户，有助于降低排障成本。
- 项目推进：
  - 改善 Console 可用性和错误可观测性。
  - 对桌面用户、非开发者用户尤其重要。

#### #8043 fix(ci): change permission

- PR：[#8043](https://github.com/agentscope-ai/QwenPaw/pull/8043)
- 类型：CI 权限修复
- 状态：Closed
- 影响：
  - 该 PR 标题显示为 CI 权限变更，可能用于修复自动化流程的权限问题。
  - 对发布流程、自动化检查、Release Duty 等有潜在支撑作用。

#### #8044 / #8045 test / test again

- PR：[#8044](https://github.com/agentscope-ai/QwenPaw/pull/8044)
- PR：[#8045](https://github.com/agentscope-ai/QwenPaw/pull/8045)
- 类型：测试性 PR
- 状态：Closed
- 影响：
  - 从摘要看，这两条 PR 内容较模板化，可能用于验证 CI、权限或流程。
  - 对产品功能影响有限。

#### #8049 fix(chats): resolve the process timezone per timestamp so naive Msg timestamps keep their instant across DST

- PR：[#8049](https://github.com/agentscope-ai/QwenPaw/pull/8049)
- 状态：Closed
- 关联 Issue：[#8046](https://github.com/agentscope-ai/QwenPaw/issues/8046)
- 说明：
  - 这是 first-time contributor 提交的 DST 时间戳修复方案。
  - 当前另有维护者 PR #8050 仍处于 Open，可能代表项目选择了另一实现路径。
- 项目推进：
  - 显示社区用户愿意直接贡献修复。
  - 也表明 DST 时间处理问题已被快速识别并进入修复流程。

### 待合并但推进显著的 PR

#### Provider 与 Token 统计兼容性

- 自定义 OpenAI Prompt Cache 参数支持：[#8061](https://github.com/agentscope-ai/QwenPaw/pull/8061)
  - 关闭 Issue：[#8058](https://github.com/agentscope-ai/QwenPaw/issues/8058)
  - 解决自定义 OpenAI-compatible Provider 使用 `prompt_cache_key` 被拒绝的问题。

- Anthropic cache token 计入上下文表：[#8060](https://github.com/agentscope-ai/QwenPaw/pull/8060)
  - 关闭 Issue：[#8057](https://github.com/agentscope-ai/QwenPaw/issues/8057)
  - 修复 Console 上下文 meter 低估 token 使用量的问题。

#### MCP 兼容性

- 将 HTTP 422 `server/discover` 视为 legacy protocol 证据：[#8051](https://github.com/agentscope-ai/QwenPaw/pull/8051)
  - 对应 Issue：[#8047](https://github.com/agentscope-ai/QwenPaw/issues/8047)
  - 有助于 DBX 等 MCP Server 被正确识别并启用 `streamable_http` driver。

#### Console 与后台任务

- 后台任务完成后唤醒父 Agent Session：[#8063](https://github.com/agentscope-ai/QwenPaw/pull/8063)
  - 相关 Issue：[#8059](https://github.com/agentscope-ai/QwenPaw/issues/8059)
  - 改善多 Agent 后台任务完成后的通知链路。

#### 安全与文件系统

- 清理空媒体块，避免发送空 base64 图片：[#8066](https://github.com/agentscope-ai/QwenPaw/pull/8066)
- 清理 `skill_name`，防止 staging path 路径穿越：[#8065](https://github.com/agentscope-ai/QwenPaw/pull/8065)
- Office COM 自动化执行前增加安全保护：[#8048](https://github.com/agentscope-ai/QwenPaw/pull/8048)

#### 测试与质量保障

- 强化全浏览器 E2E 覆盖：[#8054](https://github.com/agentscope-ai/QwenPaw/pull/8054)
  - 该 PR 直指测试可能“假绿”的问题，包括 stale selector、PTY interrupt race、Files/Heartbeat/Models/Skill Pool/Agents 路径覆盖不足等。
  - 对 beta 阶段质量提升价值较高。

---

## 4. 社区热点

### 1. MCP DBX 兼容性：HTTP 422 未被识别为 legacy-protocol evidence

- Issue：[#8047](https://github.com/agentscope-ai/QwenPaw/issues/8047)
- 评论数：2
- 关联 PR：[#8051](https://github.com/agentscope-ai/QwenPaw/pull/8051)

用户反馈在 QwenPaw 2.2.1 Docker / Hub 部署环境中，`streamable_http` 类型 MCP card 指向 DBX 时，driver 构造失败，最终状态为 inactive，Console 返回 503。  
核心诉求是：某些旧握手协议 MCP Server 会对 `server/discover` 返回 HTTP 422 和 plain-text body，而当前逻辑未将其识别为 legacy protocol 证据。

**背后信号：**

- 用户正在将 CoPaw/QwenPaw 接入本地数据库工具、MCP 工具链。
- MCP 生态协议实现存在差异，兼容性判断需要更加宽松和实用。
- 如果 driver 无法激活，影响的是整个工具调用链路，严重程度较高。

---

### 2. DST 时间戳偏移问题

- Issue：[#8046](https://github.com/agentscope-ai/QwenPaw/issues/8046)
- 评论数：2
- 相关 PR：
  - 社区 PR：[#8049](https://github.com/agentscope-ai/QwenPaw/pull/8049)
  - 维护者 PR：[#8050](https://github.com/agentscope-ai/QwenPaw/pull/8050)

用户指出 `_process_local_tz()` 使用 `datetime.now().astimezone().tzinfo` 会冻结当前 UTC offset，而不是获取具有 DST 规则的真实时区。  
这会导致聊天 transcript 中的历史时间戳在 DST 切换前后出现偏移。

**背后信号：**

- Console transcript 已进入较真实的长期使用场景，用户关心历史对话记录的准确性。
- 时间处理不只是 UI 显示问题，还可能影响审计、回放、日志分析。

---

### 3. Prompt Cache 与第三方 Provider 兼容性

- Issue：[#8058](https://github.com/agentscope-ai/QwenPaw/issues/8058)
- 评论数：1
- Fix PR：[#8061](https://github.com/agentscope-ai/QwenPaw/pull/8061)

自 #7899 后，请求参数通过 `cache_request()`，当 Provider 的 cache capabilities 未声明 `openai` 或 `openai_explicit` 时，`prompt_cache_key` 会被拒绝。  
这影响自定义 OpenAI-compatible Responses Provider。

**背后信号：**

- 用户并不只使用官方 OpenAI/Anthropic Provider，而是大量接入自定义网关、聚合器或兼容 API。
- Provider capability 声明机制需要既安全又可扩展。

---

### 4. Anthropic cache token 统计偏差

- Issue：[#8057](https://github.com/agentscope-ai/QwenPaw/issues/8057)
- 评论数：1
- Fix PR：[#8060](https://github.com/agentscope-ai/QwenPaw/pull/8060)

用户发现 Anthropic Messages 协议下，Prompt Cache 的 read/write tokens 没有计入 Console 输入框旁的上下文 meter，导致显示值显著低于真实上下文大小。

**背后信号：**

- 高级用户正在依赖上下文 meter 进行成本和窗口管理。
- Prompt caching 进入实际生产使用后，token 统计必须更精确。

---

## 5. Bug 与稳定性

以下按影响范围和严重程度排序。

### P0 / 高严重度

#### 1. DeepSeek Provider 发送 PDF 后会永久破坏会话

- Issue：[#8064](https://github.com/agentscope-ai/QwenPaw/issues/8064)
- 状态：Open
- 评论数：1
- 当前是否有 Fix PR：未在数据中看到明确对应 PR

问题表现：  
在 DeepSeek provider 下，`send_file_to_user` 发送 PDF 后，会话后续所有请求都会失败，返回 400：`file must have a file_id or file_data`。

影响：

- 属于会话级阻断问题。
- 一旦触发，后续请求持续失败，用户需要重建会话或清理状态。
- 影响 DeepSeek 官方 API，也影响通过聚合器路由的 DeepSeek 模型。

建议优先级：高。  
建议维护者检查文件 DataBlock 在 DeepSeek adapter 中的生命周期与后续请求清理逻辑。

---

#### 2. 后台 Agent 任务完成后记录丢失，最终响应为空

- Issue：[#8059](https://github.com/agentscope-ai/QwenPaw/issues/8059)
- 状态：Open
- 评论数：1
- 相关 PR：[#8063](https://github.com/agentscope-ai/QwenPaw/pull/8063)

问题表现：

- `submit_to_agent` 派发后台任务后，任务完成时记录可能丢失，查询返回 404。
- 已完成任务可能返回空 final response。

影响：

- 直接影响多 Agent 协作能力。
- 对 manager-worker 模式、长任务委派、后台执行结果收集影响较大。

当前进展：

- #8063 尝试在后台任务完成时唤醒父 Agent Session。
- 但从摘要看，它主要解决“完成后无通知”的问题，是否完全覆盖“任务记录丢失”和“空 final response”仍需验证。

---

### P1 / 中高严重度

#### 3. MCP `server/discover` HTTP 422 未被视作 legacy protocol 证据

- Issue：[#8047](https://github.com/agentscope-ai/QwenPaw/issues/8047)
- 状态：Open
- 评论数：2
- Fix PR：[#8051](https://github.com/agentscope-ai/QwenPaw/pull/8051)

影响：

- DBX MCP Server 无法激活。
- Console 出现 503。
- 对工具生态接入影响明显。

当前进展：

- #8051 已提供针对 HTTP 422 plain-text body 的兼容处理。

---

#### 4. `prompt_cache_key` 被自定义 OpenAI-compatible Responses Provider 拒绝

- Issue：[#8058](https://github.com/agentscope-ai/QwenPaw/issues/8058)
- 状态：Open
- 评论数：1
- Fix PR：[#8061](https://github.com/agentscope-ai/QwenPaw/pull/8061)

影响：

- 自定义网关或兼容 Provider 无法使用 OpenAI 风格 prompt cache 参数。
- 可能导致升级后配置突然不可用。

当前进展：

- #8061 允许 custom gateway 声明 OpenAI prompt cache params，方向明确。

---

#### 5. Anthropic Messages Provider 上下文 meter 低估使用量

- Issue：[#8057](https://github.com/agentscope-ai/QwenPaw/issues/8057)
- 状态：Open
- 评论数：1
- Fix PR：[#8060](https://github.com/agentscope-ai/QwenPaw/pull/8060)

影响：

- 不直接导致请求失败，但会误导用户对上下文窗口和成本的判断。
- 长上下文、prompt caching 场景下影响明显。

当前进展：

- #8060 已针对 cache read/write tokens 做统计修正。

---

### P2 / 中等严重度

#### 6. DST 导致 transcript 时间戳偏移

- Issue：[#8046](https://github.com/agentscope-ai/QwenPaw/issues/8046)
- 状态：Open
- 评论数：2
- 相关 PR：
  - [#8049](https://github.com/agentscope-ai/QwenPaw/pull/8049) Closed
  - [#8050](https://github.com/agentscope-ai/QwenPaw/pull/8050) Open

影响：

- 影响聊天 transcript 的时间准确性。
- 对跨 DST 的历史记录、审计、导出数据有影响。

当前进展：

- 已有维护者 PR #8050 处理该问题。

---

#### 7. 空媒体块导致 Provider 拒绝请求

- PR：[#8066](https://github.com/agentscope-ai/QwenPaw/pull/8066)
- 状态：Open
- 对应 Issue：未在数据中看到明确 Issue

问题表现：

- 零字节图片等空媒体 DataBlock 会被序列化成空 data URI：
  - `data:image/png;base64,`
- OpenAI 等 Provider 会拒绝该请求。

影响：

- 影响多模态消息稳定性。
- 属于边界输入防御问题。

---

#### 8. 技能名未清理可能导致 staging path 路径穿越

- PR：[#8065](https://github.com/agentscope-ai/QwenPaw/pull/8065)
- 状态：Open

问题表现：

- `skill_name` 直接拼接进路径，类似 `../escape` 的名称可能逃逸预期 root。
- CodeQL 已标记相关路径表达式。

影响：

- 安全风险较高，尤其是 skill pool、导入/下载技能场景。
- 建议尽快合并并补充回归测试。

---

## 6. 功能请求与路线图信号

今日 Issue 中纯功能请求不多，更多是 beta 阶段暴露出的兼容性和稳定性诉求。但从 PR 可以看出几个明确路线图信号。

### 1. 多 Provider / 自定义网关兼容性将继续增强

- Issue：[#8058](https://github.com/agentscope-ai/QwenPaw/issues/8058)
- PR：[#8061](https://github.com/agentscope-ai/QwenPaw/pull/8061)

用户希望自定义 OpenAI-compatible Provider 能声明并使用 OpenAI prompt cache 参数。  
这说明项目正在从“内置 Provider 支持”走向“开放 Provider 能力声明和适配”。

预计进入下一版本可能性：高。  
原因：已有明确 Fix PR，且与近期 prompt cache 改动直接相关。

---

### 2. Anthropic Prompt Caching 的成本与上下文可观测性

- Issue：[#8057](https://github.com/agentscope-ai/QwenPaw/issues/8057)
- PR：[#8060](https://github.com/agentscope-ai/QwenPaw/pull/8060)

用户不只是需要调用 Anthropic，还需要准确理解 cache read/write tokens 对上下文和成本的影响。  
这表明 Console 的 token meter、usage 统计、成本可视化可能会成为后续重点。

预计进入下一版本可能性：高。  
原因：已有小型修复 PR，风险可控。

---

### 3. 多 Agent 后台任务体验

- Issue：[#8059](https://github.com/agentscope-ai/QwenPaw/issues/8059)
- PR：[#8063](https://github.com/agentscope-ai/QwenPaw/pull/8063)

后台任务完成后，父会话需要被唤醒，任务结果需要可靠保存并可查询。  
这反映出用户已经在构建 manager-worker 多 Agent 工作流，而不是单轮聊天。

预计进入下一版本可能性：中高。  
原因：已有 PR，但 Issue 中涉及“404 丢记录”和“空 final response”，可能需要更多修复才能完整闭环。

---

### 4. Whisper API 模型名可配置

- PR：[#8052](https://github.com/agentscope-ai/QwenPaw/pull/8052)

该 PR 允许用户在 Settings → Transcription 中查看和设置 Whisper API 的模型名。  
现有默认值固定为 `whisper-1`，对 SiliconFlow、SenseVoice、本地 Whisper-compatible 服务不友好。

预计进入下一版本可能性：中高。  
原因：需求明确，改动范围相对集中，符合多 Provider 兼容方向。

---

### 5. Skill Pool 下载性能与资源清理

- PR：[#8055](https://github.com/agentscope-ai/QwenPaw/pull/8055)

该 PR 处理大型 skill 下载时阻塞 event loop 的问题，并清理 orphan stages。  
这说明 Skill Pool 体量增长后，下载、导入、清理流程需要更强的工程化保障。

预计进入下一版本可能性：中。  
原因：改动涉及异步执行和文件操作，需要较充分测试。

---

## 7. 用户反馈摘要

### 1. 用户正在用真实外部工具链接入 MCP

来自 #8047 的反馈显示，用户在 Docker / Hub 部署中接入 DBX 本地数据库 MCP 工具。  
痛点是协议探测过于严格，无法识别旧握手 MCP Server 的 HTTP 422 响应，导致整个 driver inactive。

用户真实诉求：

- MCP 适配应更鲁棒。
- 即使 Server 返回非 JSON-RPC body，也应根据语义判断协议代际。
- Console 不应只暴露 503，而应提供更可诊断的错误。

链接：[#8047](https://github.com/agentscope-ai/QwenPaw/issues/8047)

---

### 2. 用户对聊天记录时间准确性有较高要求

#8046 反映的问题不是简单显示 bug，而是跨 DST 时历史 transcript 时间被偏移。  
这类问题通常来自长期使用、跨时区或跨季节保存记录的场景。

用户真实诉求：

- transcript 时间应可被信任。
- 本地时间处理应使用真实时区规则，而不是当前固定 offset。
- 历史消息不应因运行时当前 DST 状态变化而被重新解释。

链接：[#8046](https://github.com/agentscope-ai/QwenPaw/issues/8046)

---

### 3. 第三方模型 Provider 和聚合器使用广泛

#8058、#8064 显示用户正在使用：

- DeepSeek 官方 API
- DeepSeek through aggregators
- 自定义 OpenAI-compatible Responses Provider
- Anthropic Messages + prompt caching

用户真实诉求：

- Provider adapter 不能只适配官方 happy path。
- 请求参数、文件格式、cache 参数需要按 provider 能力精确处理。
- 一旦某次请求包含文件或特殊参数，不应污染后续会话。

链接：

- [#8058](https://github.com/agentscope-ai/QwenPaw/issues/8058)
- [#8064](https://github.com/agentscope-ai/QwenPaw/issues/8064)
- [#8057](https://github.com/agentscope-ai/QwenPaw/issues/8057)

---

### 4. 多 Agent 后台任务正在进入实际使用

#8059 的场景是 Windows 10 桌面后端 bundle 中，manager agent 向 worker agent 派发后台任务。  
用户遇到任务完成后记录丢失、查询 404、最终响应为空。

用户真实诉求：

- 后台任务必须可追踪。
- 父 Agent 应能可靠感知子任务完成。
- 完成结果不能只存在短暂内存状态中，或者被过早清理。

链接：[#8059](https://github.com/agentscope-ai/QwenPaw/issues/8059)

---

## 8. 待处理积压

从本次数据看，所有 Issue / PR 都是近 24 小时内创建或更新，因此没有足够证据判断“长期未响应”的历史积压。  
但当前仍有 **12 条 Open PR** 和 **7 条 Open Issue**，建议维护者优先关注以下待处理项。

### 高优先级待处理 Issue

1. DeepSeek PDF 文件导致会话永久失败  
   - Issue：[#8064](https://github.com/agentscope-ai/QwenPaw/issues/8064)
   - 当前未见明确 Fix PR
   - 建议优先定位 adapter 状态污染或文件 block 残留问题。

2. 后台 Agent 任务记录丢失 / 空 final response  
   - Issue：[#8059](https://github.com/agentscope-ai/QwenPaw/issues/8059)
   - 相关 PR：[#8063](https://github.com/agentscope-ai/QwenPaw/pull/8063)
   - 建议确认 #8063 是否覆盖 404 与空响应两类问题。

3. MCP DBX 兼容性  
   - Issue：[#8047](https://github.com/agentscope-ai/QwenPaw/issues/8047)
   - Fix PR：[#8051](https://github.com/agentscope-ai/QwenPaw/pull/8051)
   - 建议尽快 review，避免 MCP 工具链接入失败。

4. DST transcript 时间偏移  
   - Issue：[#8046](https://github.com/agentscope-ai/QwenPaw/issues/8046)
   - PR：[#8050](https://github.com/agentscope-ai/QwenPaw/pull/8050)
   - 建议补充 DST 边界测试，覆盖夏令时切换前后历史消息。

### 高优先级待处理 PR

1. 安全：`skill_name` path traversal 防护  
   - PR：[#8065](https://github.com/agentscope-ai/QwenPaw/pull/8065)

2. 安全：Office COM 自动化执行保护  
   - PR：[#8048](https://github.com/agentscope-ai/QwenPaw/pull/8048)

3. 测试质量：E2E 全浏览器覆盖强化  
   - PR：[#8054](https://github.com/agentscope-ai/QwenPaw/pull/8054)

4. Provider 兼容：OpenAI prompt cache 参数声明  
   - PR：[#8061](https://github.com/agentscope-ai/QwenPaw/pull/8061)

5. Token 统计：Anthropic cache token 计入上下文 meter  
   - PR：[#8060](https://github.com/agentscope-ai/QwenPaw/pull/8060)

---

## 项目健康度评估

| 维度 | 状态 | 说明 |
|---|---|---|
| 开发活跃度 | 高 | 24 小时内 17 条 PR、7 条 Issue、1 个 beta release |
| 维护响应速度 | 较好 | 多个 Issue 当天即出现对应修复 PR |
| 稳定性 | 中等偏风险 | Provider、MCP、后台任务、文件处理等真实场景问题集中出现 |
| 社区参与 | 良好 | 出现 first-time contributor 修复 DST 问题 |
| 发布质量 | Beta 打磨期 | v2.2.2-beta.4 已发布，但 release duty 和安装验证仍需跟进 |
| 安全意识 | 提升中 | 今日出现 path traversal、Office COM 防护等安全修复 PR |

**总体判断：**  
CoPaw 当前处于高活跃 beta 迭代阶段，功能扩展和兼容性修复并行推进。项目维护响应积极，但近期暴露的问题显示，其真实用户场景已经覆盖 MCP 工具链、多 Provider 网关、多 Agent 后台任务、文件传输和长上下文缓存等复杂路径。短期内建议维护者优先合并稳定性与安全类 PR，并围绕 Provider adapter、后台任务生命周期和 E2E 覆盖建立更强的回归保护。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报  
日期：2026-10-01  
仓库：github.com/zeroclaw-labs/zeroclaw

---

## 1. 今日速览

过去 24 小时 ZeroClaw 活跃度非常高：新增/活跃 Issues 10 条，PR 更新 50 条，且全部仍处于待合并状态，说明项目正处于密集开发与排队评审阶段。今日没有新版本发布，也没有 PR 合并或 Issue 关闭，因此实际落地进展有限，但候选变更覆盖 runtime、daemon、gateway、plugins、CI、desktop、zerocode 等多个核心模块。  
从内容看，当前开发重心集中在 **v0.9.0 前的架构收敛、Gateway/Core 拆分、插件/WASM 能力、RPC 协议契约、CI 稳定性与安全边界**。同时，社区反馈暴露出若干与技能系统、插件注册、授权/审批、Windows 本地守护进程身份校验相关的问题，显示项目在扩展性和多入口运行场景上进入更复杂的稳定化阶段。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

> 今日没有 PR 被合并或关闭，因此以下为“待合并的重要进展”。它们尚未进入主干，但代表了项目当前推进方向。

### Gateway/Core 架构迁移持续推进

- [PR #11351 feat(gateway): serve the ported dashboard routes from zeroclaw-gw](https://github.com/zeroclaw-labs/zeroclaw/pull/11351)  
  将已迁移的 dashboard routes 通过 `zeroclaw-gw` 提供服务。该 PR 依赖多个 stacked PR，属于 Gateway 迁移链条中的较大变更，标记为 `size:XL`。  
  **意义**：继续推进 Web/Gateway 层与 Core RPC 的职责拆分，是 v0.9.0 架构演进的重要组成部分。

- [PR #11331 feat(gateway): serve sessions REST through the core](https://github.com/zeroclaw-labs/zeroclaw/pull/11331)  
  将 sessions REST 能力通过 core 服务，减少 gateway 侧直接承载业务逻辑。  
  **意义**：进一步统一会话管理入口，有利于后续权限、审计、协议兼容性的集中治理。

- [PR #11334 test(architecture): classify every gateway route against the core's RPC surface](https://github.com/zeroclaw-labs/zeroclaw/pull/11334)  
  新增 gateway route coverage table，将现有每个 gateway route 按照 core RPC 覆盖情况分类。  
  **意义**：这是架构迁移中的重要治理性测试，帮助维护者识别哪些路由已可由 core RPC 支撑，哪些仍需 daemon/gateway 特殊处理。

### RPC、daemon、desktop 运行链路增强

- [PR #11346 feat(rpc): resolve the daemon endpoint in one place with a stable pipe name](https://github.com/zeroclaw-labs/zeroclaw/pull/11346)  
  统一 daemon endpoint 解析，并引入稳定 pipe name hash 及一版 legacy fallback。  
  **意义**：与 Windows/本地 daemon 连接、身份验证、CLI 与桌面入口一致性密切相关，也呼应了今日多个 identity-access 相关功能请求。

- [PR #11345 feat(desktop): RPC readiness and version handshake for the launched core](https://github.com/zeroclaw-labs/zeroclaw/pull/11345)  
  改进 desktop supervisor 启动 core 后的 readiness 判断和版本握手。  
  **意义**：解决“进程已启动但 RPC 尚不可用”的启动竞态，对桌面体验和服务稳定性很关键。

- [PR #11341 feat(rpc-proto): describe every method's result in the OpenRPC contract](https://github.com/zeroclaw-labs/zeroclaw/pull/11341)  
  为 OpenRPC contract 中每个方法补充 result 描述。  
  **意义**：提升 RPC 协议文档化与客户端生成质量，对外部集成者和 gateway/core 解耦均有帮助。

### 插件与 WASM 能力继续完善

- [PR #11347 feat(release): ship the WASM plugin host in supported release artifacts](https://github.com/zeroclaw-labs/zeroclaw/pull/11347)  
  将 `plugins-wasm-cranelift` 纳入标准发行构件。  
  **意义**：表明 WASM 插件主机正从实验能力走向默认可交付能力。

- [PR #11348 fix(plugins): report a plugin channel's own health check in /health](https://github.com/zeroclaw-labs/zeroclaw/pull/11348)  
  让 `WasmChannel` 正确实现 `Channel::listener_health`，避免插件自身 health-check 失败时仍被 supervisor 误判为健康。  
  **意义**：提升插件通道的可观测性和故障定位能力。

- [PR #11342 feat(zerocode): toggle plugin channel instances in the plugins sub-tab](https://github.com/zeroclaw-labs/zeroclaw/pull/11342)  
  在 zerocode 的 plugins 子页中展示和切换 plugin channel instances。  
  **意义**：加强开发者工具对插件通道的可视化管理能力。

### 测试稳定性和 CI 质量投入明显

- [PR #11343 test(ci): require real application acceptance](https://github.com/zeroclaw-labs/zeroclaw/pull/11343)  
  强化 CI 中的真实应用接受测试，标记 `risk:high`、`size:XL`。  
  **意义**：项目正在提升端到端验收能力，但该类变更风险较高，需要谨慎评审。

- [PR #11354 test(runtime): give fixed temp-dir test fixtures a per-test TempDir](https://github.com/zeroclaw-labs/zeroclaw/pull/11354)  
  将多个 `tools::file_read` 测试从固定系统临时目录迁移到每测试独立 `TempDir`。  
  **意义**：降低并行测试互相污染导致的 flaky 风险。

- [PR #11352 test(rpc): give RPC test contexts a private config write lock](https://github.com/zeroclaw-labs/zeroclaw/pull/11352)  
  为 RPC 测试上下文提供私有 config write lock。  
  **意义**：减少共享全局锁带来的测试串扰。

- [PR #11349 test(daemon): hold the broadcast-hook locks in the RPC drain reload test](https://github.com/zeroclaw-labs/zeroclaw/pull/11349)  
  修复 daemon RPC drain reload 测试中的 broadcast hook 锁持有问题。  
  **意义**：针对真实 daemon 测试中的并发竞态做稳定性修复。

---

## 4. 社区热点

> PR 数据中评论数为 `undefined`，无法按评论数精确排名；以下根据 Issue 评论数、影响范围、标签和变更规模综合判断。

### 技能系统在 bundle 和非 CLI 入口下的学习链路问题

- [Issue #11333 Skill review tools can't see skills assigned through skill_bundles](https://github.com/zeroclaw-labs/zeroclaw/issues/11333)  
  用户反馈：技能通过 `skill_bundles = ["devops_skills"]` 加载后运行正常，但 skill review fork 的 `skills_list`、`skill_view` 等工具无法看到这些技能。  
  **背后诉求**：用户已经开始用 bundle 组织复杂技能集合，希望审查、改进、创建工具链能够识别与主运行时一致的技能来源。  
  **影响**：会削弱技能审查和自动改进流程的可信度。

- [Issue #11332 Skill review and skill creation never run for channel, webhook, or gateway turns](https://github.com/zeroclaw-labs/zeroclaw/issues/11332)  
  用户反馈：`skill_improvement` 和 `skill_creation` 已启用，但学习循环只在 CLI/cron 风格运行中触发，通过 Matrix、webhook channel 或 gateway web UI 与 agent 交互时不会运行。  
  **背后诉求**：用户希望 ZeroClaw 的自我改进机制能覆盖所有对话入口，而不仅仅是命令行入口。  
  **影响**：这直接关系到多渠道 agent 的长期学习能力，是产品体验层面的重要缺口。

### 插件系统安全与一致性成为焦点

- [Issue #11327 plugin tool name gate only sees tools registered before plugins](https://github.com/zeroclaw-labs/zeroclaw/issues/11327)  
  报告称插件工具名校验只看到插件注册前已有工具，因此插件可能抢占 `tool_search`、MCP、peripheral、skill tools 等工具名。  
  **背后诉求**：用户希望插件生态具备可靠的命名隔离与安全边界。  
  **风险判断**：Issue 描述中明确指出，如果威胁模型包含不受信任插件，应视为 S0，因为模型原本要调用其他工具的请求可能被插件接收。  
  **当前状态**：未见对应修复 PR。

- [Issue #11336 plugin info and plugin list --verify report [loads] for a plugin the runtime refuses to register](https://github.com/zeroclaw-labs/zeroclaw/issues/11336)  
  CLI 检查显示插件可加载，但 runtime 因配置值缺少 `config_schema` 拒绝注册。  
  **背后诉求**：用户需要 CLI 验证结果与 runtime 真实行为一致，否则会造成“检查通过但 agent 看不到插件”的困惑。  
  **当前状态**：未见对应修复 PR。

### 本地 daemon 身份校验与授权变更链路

- [Issue #11324 verify the daemon's identity in call_local and share one CLI daemon client](https://github.com/zeroclaw-labs/zeroclaw/issues/11324)  
- [Issue #11325 verify the named-pipe server so CLI authorization edits apply live on Windows](https://github.com/zeroclaw-labs/zeroclaw/issues/11325)  
- [Issue #11323 decide whether config set should save an authorization edit the daemon refused](https://github.com/zeroclaw-labs/zeroclaw/issues/11323)  

这组 Issue 都是 #10876 和 #11313 的后续，围绕 CLI 与本地 daemon 之间的身份校验、授权编辑、Windows named pipe 服务验证展开。  
**背后诉求**：用户和维护者希望本地配置修改既能安全地应用到运行中 daemon，又能在 daemon 拒绝调用者时给出清晰、一致、可审计的行为。  
**相关 PR 信号**：[PR #11346](https://github.com/zeroclaw-labs/zeroclaw/pull/11346) 正在统一 daemon endpoint 解析并引入稳定 pipe name，可能是解决该方向问题的基础设施之一。

---

## 5. Bug 与稳定性

### S1：工作流阻塞

1. [Issue #11294 Flaky: configure_refuses_an_incarnation_replaced_under_the_lock races its 150 ms sleep under the parallel runtime gate](https://github.com/zeroclaw-labs/zeroclaw/issues/11294)  
   - 组件：`runtime/daemon`  
   - 标签：`bug`, `ci`, `runtime`, `tests`, `priority:p2`, `risk:low`, `type:test`  
   - 严重程度：S1 - workflow blocked  
   - 问题：`rpc::dispatch::tests::configure_refuses_an_incarnation_replaced_under_the_lock` 在 Parallel Runtime Test 中间歇失败，原因与 150ms sleep 和并行 runtime gate 竞态有关。  
   - 可能相关 PR：  
     - [PR #11330 fix(rpc): fence session/configure on the authorized incarnation](https://github.com/zeroclaw-labs/zeroclaw/pull/11330)  
     - [PR #11352 test(rpc): give RPC test contexts a private config write lock](https://github.com/zeroclaw-labs/zeroclaw/pull/11352)  
   - 状态判断：已有多条 runtime/RPC 测试稳定性 PR，但从数据无法确认是否已完整修复该 Issue。

### S2：功能降级或安全边界风险

2. [Issue #11333 Skill review tools can't see skills assigned through skill_bundles](https://github.com/zeroclaw-labs/zeroclaw/issues/11333)  
   - 组件：tools  
   - 严重程度：S2 - degraded behavior  
   - 问题：技能 bundle 中的技能可以运行，但 skill review 工具不可见。  
   - Fix PR：未见明确对应 PR。

3. [Issue #11332 Skill review and skill creation never run for channel, webhook, or gateway turns](https://github.com/zeroclaw-labs/zeroclaw/issues/11332)  
   - 组件：runtime/daemon  
   - 严重程度：S2 - degraded behavior  
   - 问题：学习循环不覆盖 Matrix、webhook、gateway web UI 等入口。  
   - Fix PR：未见明确对应 PR。

4. [Issue #11336 plugin info and plugin list --verify report [loads] for a plugin the runtime refuses to register](https://github.com/zeroclaw-labs/zeroclaw/issues/11336)  
   - 组件：plugins  
   - 严重程度：S2 - degraded behavior  
   - 问题：CLI 验证与 runtime 注册结果不一致。  
   - Fix PR：未见明确对应 PR。

5. [Issue #11335 CLI approval prompt with no terminal and stdin at EOF reports the runtime's fail-closed denial as Denied by user](https://github.com/zeroclaw-labs/zeroclaw/issues/11335)  
   - 组件：runtime/daemon  
   - 严重程度：S2 - degraded behavior  
   - 问题：在 cron、CI、nohup、pipeline 等无控制终端且 stdin EOF 的环境中，工具审批失败被报告为 `Denied by user`，掩盖了 runtime fail-closed 的真实原因。  
   - 用户影响：自动化场景排障困难，容易误判为人工拒绝。  
   - Fix PR：未见明确对应 PR。

6. [Issue #11327 plugin tool name gate only sees tools registered before plugins](https://github.com/zeroclaw-labs/zeroclaw/issues/11327)  
   - 组件：plugins、tools、runtime/daemon  
   - 严重程度：S2；若威胁模型包含不受信任插件，可视作 S0  
   - 问题：插件可能抢占其他工具名，接收模型原本打算发给其他工具的调用。  
   - Fix PR：未见明确对应 PR。  
   - 建议优先级：高，尤其在插件生态对第三方开放前应处理。

### S3：轻微问题

7. [Issue #11296 llama.cpp and custom provider use wrong url/uri for models](https://github.com/zeroclaw-labs/zeroclaw/issues/11296)  
   - 组件：provider  
   - 严重程度：S3 - minor issue  
   - 问题：配置 llama.cpp/custom provider 的非 localhost URI 时，ZeroClaw 获取 models 使用了错误 URL/URI。  
   - 用户影响：使用 router 或远程模型服务时模型列表可能不正确。  
   - Fix PR：未见明确对应 PR。

### 其他稳定性修复候选 PR

- [PR #11350 fix(cost): key the process-global cost trackers by ledger path](https://github.com/zeroclaw-labs/zeroclaw/pull/11350)  
  修复 process-global cost tracker 只使用单槽导致不同 ledger 互相影响的问题。

- [PR #11340 fix(service): gate the mpsc import to the targets that use it](https://github.com/zeroclaw-labs/zeroclaw/pull/11340)  
  修复特定 target 下 `mpsc` import gating 问题，降低编译/Clippy 噪声。

- [PR #11337 test(channels): cover PendingApprovalGuard remove and disarm](https://github.com/zeroclaw-labs/zeroclaw/pull/11337)  
  通过补充测试覆盖解决 `dead_code`/Clippy 相关问题。

---

## 6. 功能请求与路线图信号

### 身份访问与本地 daemon 安全

- [Issue #11324](https://github.com/zeroclaw-labs/zeroclaw/issues/11324)、[Issue #11325](https://github.com/zeroclaw-labs/zeroclaw/issues/11325)、[Issue #11323](https://github.com/zeroclaw-labs/zeroclaw/issues/11323) 共同显示：  
  ZeroClaw 正在强化 CLI 与 daemon 的身份校验、授权编辑和 Windows named pipe 安全模型。  
  **纳入下一版本可能性：较高**。这些 Issue 均为既有安全/授权工作流的 follow-up，且已有 [PR #11346](https://github.com/zeroclaw-labs/zeroclaw/pull/11346) 在 endpoint 统一方面铺路。

### Gateway/Core 拆分与 v0.9.0 架构收敛

- [PR #11344 fix(config): retire the inert [gateway.pairing_dashboard] at V4](https://github.com/zeroclaw-labs/zeroclaw/pull/11344)  
  标记 `release:v0.9.0`，计划退休无效的 `[gateway.pairing_dashboard]` 配置。  
  **信号**：v0.9.0 可能包含配置 schema 演进，用户需要关注迁移说明。

- [PR #11339 refactor(gateway): move plugin webhook reservations to the daemon](https://github.com/zeroclaw-labs/zeroclaw/pull/11339)  
  将 plugin webhook reservation store 从 gateway 移到 daemon/API 层。  
  **信号**：Webhook 幂等与插件消息去重逻辑正被下沉到更核心的位置，以支撑 gateway 轻量化。

- [PR #11341](https://github.com/zeroclaw-labs/zeroclaw/pull/11341)、[PR #11334](https://github.com/zeroclaw-labs/zeroclaw/pull/11334)、[PR #11351](https://github.com/zeroclaw-labs/zeroclaw/pull/11351)  
  共同指向：RPC contract、route coverage、dashboard route serving 是 v0.9.0 前的重要收敛任务。  
  **纳入下一版本可能性：较高**，但 stacked PR 较多，合并顺序和 review 成本是主要风险。

### 插件能力产品化

- [PR #11347](https://github.com/zeroclaw-labs/zeroclaw/pull/11347) 将 WASM plugin host 纳入发行构件。  
- [PR #11348](https://github.com/zeroclaw-labs/zeroclaw/pull/11348) 修复插件 channel health reporting。  
- [PR #11342](https://github.com/zeroclaw-labs/zeroclaw/pull/11342) 增加 zerocode 中 plugin channel instance 切换。  
- [Issue #11327](https://github.com/zeroclaw-labs/zeroclaw/issues/11327)、[Issue #11336](https://github.com/zeroclaw-labs/zeroclaw/issues/11336) 暴露插件注册、安全和 CLI 验证一致性问题。  

**路线图判断**：插件系统正在从“可用”走向“可交付、可观测、可管理”，但在进入更开放生态前，需要优先处理命名抢占、配置 schema 验证一致性等安全/一致性问题。

### 技能系统跨入口学习能力

- [Issue #11332](https://github.com/zeroclaw-labs/zeroclaw/issues/11332) 和 [Issue #11333](https://github.com/zeroclaw-labs/zeroclaw/issues/11333) 表明用户已在真实工作流中依赖 `skill_bundles`、channel、webhook、gateway UI。  
  **纳入下一版本可能性：中等偏高**。这类问题直接影响 AI agent 的长期学习与技能治理体验，且和 ZeroClaw 的核心定位高度相关。

---

## 7. 用户反馈摘要

### 真实使用场景

- 用户将 agent 技能集中放入 `skill_bundles`，例如 `skill_bundles = ["devops_skills"]`，并期望 skill review 工具能看到同一套技能来源。  
  相关 Issue：[Issue #11333](https://github.com/zeroclaw-labs/zeroclaw/issues/11333)

- 用户通过 Matrix、webhook channel、gateway web UI 与 agent 交互，而不只是 CLI 或 cron。  
  相关 Issue：[Issue #11332](https://github.com/zeroclaw-labs/zeroclaw/issues/11332)

- 用户在 cron、CI、nohup、pipeline 等无终端环境中运行 `zeroclaw agent`，并依赖工具审批机制的错误信息进行自动化排障。  
  相关 Issue：[Issue #11335](https://github.com/zeroclaw-labs/zeroclaw/issues/11335)

- 用户使用 llama.cpp/custom provider，并通过非 localhost 的 URI 或 router 获取模型列表。  
  相关 Issue：[Issue #11296](https://github.com/zeroclaw-labs/zeroclaw/issues/11296)

### 主要痛点

1. **运行时与辅助工具视图不一致**  
   - 技能能运行但 review 工具看不到。  
   - 插件 CLI 检查通过但 runtime 不注册。  
   相关 Issue：[Issue #11333](https://github.com/zeroclaw-labs/zeroclaw/issues/11333)、[Issue #11336](https://github.com/zeroclaw-labs/zeroclaw/issues/11336)

2. **多入口行为不一致**  
   - CLI/cron 与 Matrix/webhook/gateway UI 下，学习循环行为不同。  
   相关 Issue：[Issue #11332](https://github.com/zeroclaw-labs/zeroclaw/issues/11332)

3. **自动化环境错误信息不够准确**  
   - 无 TTY 且 stdin EOF 时，将 fail-closed 审批失败显示为 `Denied by user`。  
   相关 Issue：[Issue #11335](https://github.com/zeroclaw-labs/zeroclaw/issues/11335)

4. **插件安全模型需要更强约束**  
   - 插件可能抢占其他工具名，导致模型调用被错误路由。  
   相关 Issue：[Issue #11327](https://github.com/zeroclaw-labs/zeroclaw/issues/11327)

### 满意点与积极信号

- 用户反馈表明 ZeroClaw 的技能 bundle、channel、gateway、插件等高级能力已经被真实使用，而不仅是实验性功能。  
- 维护侧当日提交大量测试隔离、CI 验收、RPC contract、Gateway/Core 拆分相关 PR，说明项目对稳定性和架构治理投入较大。

---

## 8. 待处理积压

基于今日提供的数据，仅能观察过去 24 小时内的 Issue/PR，无法判断“长期未响应”的完整积压情况。不过从今日状态看，有以下需要维护者优先关注的未合并/未修复项：

### 高优先级待处理

1. [Issue #11327 plugin tool name gate only sees tools registered before plugins](https://github.com/zeroclaw-labs/zeroclaw/issues/11327)  
   - 理由：涉及插件工具名抢占，潜在安全影响高。  
   - 建议：尽快明确 threat model，并设计全局工具命名注册/冲突检测机制。

2. [Issue #11294 Flaky runtime test under parallel runtime gate](https://github.com/zeroclaw-labs/zeroclaw/issues/11294)  
   - 理由：S1 workflow blocked，会影响 CI 信心和合并效率。  
   - 建议：将相关测试从 sleep-based race 改为显式同步/事件驱动等待。

3. [Issue #11336 plugin CLI verification inconsistent with runtime registration](https://github.com/zeroclaw-labs/zeroclaw/issues/11336)  
   - 理由：CLI 显示 `[loads]` 但 runtime 拒绝注册，会直接误导用户。  
   - 建议：统一 CLI verify 与 runtime registration 的验证逻辑或共享 validator。

4. [Issue #11332 skill review and creation not triggered for channel/webhook/gateway turns](https://github.com/zeroclaw-labs/zeroclaw/issues/11332)  
   - 理由：影响多入口 agent 的核心学习能力。  
   - 建议：确认学习 loop 应位于 turn pipeline 的哪个层级，避免入口差异导致行为漂移。

### PR 评审积压风险

今日 50 条 PR 全部待合并，且多个为 stacked PR、`size:XL`、`release:v0.9.0` 或 `risk:high`。其中应优先排队的类别包括：

- CI/测试稳定性：  
  [PR #11354](https://github.com/zeroclaw-labs/zeroclaw/pull/11354)、[PR #11352](https://github.com/zeroclaw-labs/zeroclaw/pull/11352)、[PR #11349](https://github.com/zeroclaw-labs/zeroclaw/pull/11349)、[PR #11343](https://github.com/zeroclaw-labs/zeroclaw/pull/11343)

- 安全/身份/daemon endpoint 基础设施：  
  [PR #11346](https://github.com/zeroclaw-labs/zeroclaw/pull/11346)、[Issue #11324](https://github.com/zeroclaw-labs/zeroclaw/issues/11324)、[Issue #11325](https://github.com/zeroclaw-labs/zeroclaw/issues/11325)

- v0.9.0 Gateway/Core 迁移链：  
  [PR #11351](https://github.com/zeroclaw-labs/zeroclaw/pull/11351)、[PR #11341](https://github.com/zeroclaw-labs/zeroclaw/pull/11341)、[PR #11339](https://github.com/zeroclaw-labs/zeroclaw/pull/11339)、[PR #11334](https://github.com/zeroclaw-labs/zeroclaw/pull/11334)

---

## 项目健康度评估

- **开发活跃度：高**  
  24 小时内 50 条 PR 更新、10 条 Issue 活跃，说明贡献密度很高。

- **合并吞吐：低**  
  今日没有 PR 合并或关闭，存在评审队列堆积风险。

- **稳定性风险：中等偏高**  
  CI flaky、并发测试隔离、daemon/RPC 竞态、插件 health check、审批错误信息等问题同时出现，说明系统复杂度正在上升。

- **架构成熟度：提升中**  
  Gateway/Core 拆分、OpenRPC contract、route coverage、daemon endpoint 统一等工作显示项目正在走向更清晰的边界和更强协议治理。

- **建议关注重点**  
  下一阶段应优先处理 CI 阻塞、插件安全边界、技能系统跨入口一致性，以及 stacked PR 的拆分评审与合并顺序管理。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*