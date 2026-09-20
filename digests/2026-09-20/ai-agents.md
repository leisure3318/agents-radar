# OpenClaw 生态日报 2026-09-20

> Issues: 4 | PRs: 55 | 覆盖项目: 13 个 | 生成时间: 2026-09-20 03:56 UTC

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
**日期：2026-09-20**  
**仓库：** [openclaw/openclaw](https://github.com/openclaw/openclaw)

---

## 1. 今日速览

过去 24 小时 OpenClaw 维持了**非常高的开发活跃度**：Issues 更新 4 条，PR 更新 55 条，其中仍有 45 条待合并，说明项目正处于密集修复与发布后稳定化阶段。  
今日发布了 Linux companion 稳定通道版本 `v2026.9.5`，但同时出现了多个与 `2026.9.4 → 2026.9.5` 更新、运行时校验、状态迁移和服务恢复相关的问题，显示当前发布链路仍是主要风险区。  
PR 主题集中在 **更新可靠性、Gateway 性能、任务读取并发、会话/压缩稳定性、macOS 权限与桌面共享体验**，整体方向偏向“稳定化 + 性能治理 + 运维可恢复性”。  
项目健康度总体较好：维护者和机器人响应密集，多个高优先级问题已有对应修复 PR；但 P0/P1 更新失败和恢复链路问题需要优先处理，否则会直接影响用户升级信心。

---

## 2. 版本发布

### `linux-stable`：OpenClaw Linux update channel  
**最新发布版本：** `v2026.9.5`  
**发布时间：** 2026-09-20  
**发布页 / 下载：**

- [OpenClaw-2026.9.5-amd64.AppImage](https://github.com/openclaw/openclaw/releases/download/v2026.9.5/OpenClaw-2026.9.5-amd64.AppImage)
- [OpenClaw-2026.9.5-amd64.deb](https://github.com/openclaw/openclaw/releases/download/v2026.9.5/OpenClaw-2026.9.5-amd64.deb)

### 发布解读

本次可见数据仅提供了 Linux companion 的发布资产，未包含完整 changelog，因此无法确认具体功能改动或破坏性变更。不过，今日大量 PR 和 Issues 指向 `2026.9.4 / 2026.9.5` 更新链路，说明该版本发布后正在经历集中验证。

### 已观察到的迁移 / 更新注意事项

以下问题与升级、运行时校验、状态迁移或恢复相关，建议用户升级前关注：

1. **Windows 更新失败：runtime-verification-failed**  
   - Issue：[#153365](https://github.com/openclaw/openclaw/issues/153365)  
   - 严重级别：`P0`，`impact:ux-release-blocker`  
   - 场景：Windows `win32/x64`，从 `2026.9.4` 更新到 `2026.9.5` 失败。  
   - 建议：Windows 用户尤其应等待维护者确认修复或 workaround 后再进行大规模升级。

2. **从 2026.9.2 升级时数据库 schema 迁移不完整**  
   - PR：[#153402](https://github.com/openclaw/openclaw/pull/153402)  
   - 主题：`fix(update): complete schema upgrades from 2026.9.2`  
   - 影响：已有 agent 数据库需要更新 schema 时，正常包更新路径可能触发回滚或不完整迁移。  
   - 建议：从较旧版本升级的用户应备份状态数据，并关注该 PR 是否合入。

3. **更新恢复需要人工干预**  
   - Issue：[#153401](https://github.com/openclaw/openclaw/issues/153401)  
   - 严重级别：`P1`，`impact:crash-loop`  
   - 涉及：macOS、开发 Git 安装、服务恢复、状态修复、诊断链路。  
   - 关联 PR：[#153403](https://github.com/openclaw/openclaw/pull/153403)、[#153405](https://github.com/openclaw/openclaw/pull/153405)、[#153406](https://github.com/openclaw/openclaw/pull/153406)、[#153407](https://github.com/openclaw/openclaw/pull/153407)、[#153408](https://github.com/openclaw/openclaw/pull/153408)

### 破坏性变更

当前数据未提供明确的 breaking changes。  
但多个 PR 带有 `merge-risk: compatibility`、`security-sensitive-changed` 或涉及 schema / runtime verification / approval policy，因此应视为**潜在兼容性敏感发布周期**。

---

## 3. 项目进展

过去 24 小时共有 **55 条 PR 更新**，其中 **10 条已合并或关闭**，45 条仍待处理。当前展示列表中仅明确可见 1 条关闭 PR，其余已合并/关闭 PR 未出现在提供的详细列表中，因此以下进展以可见数据为准。

### 已关闭 / 已完成的重要 PR

#### 1. 技能状态检查性能优化  
- PR：[#152799](https://github.com/openclaw/openclaw/pull/152799)  
- 状态：Closed  
- 标题：`improve(skills): prepare readiness without detailed install metadata`  
- 影响范围：commands / skills  
- 摘要：`status --all` 不再为了 Skills 行的 readiness counts 生成详细安装元数据。  
- 用户价值：  
  - 保持 readiness counts 和详细报告结果不变；  
  - 减少不必要的准备工作；  
  - 对配置、权限和刷新策略无影响。  
- 评价：这是一个典型的低风险性能/效率优化，减少 CLI 状态查询时的内部开销。

### 待合并但具备明显推进价值的 PR

#### 2. 更新链路 schema 修复  
- PR：[#153402](https://github.com/openclaw/openclaw/pull/153402)  
- 状态：Open，`ready for maintainer look`  
- 优先级：`P1`  
- 标题：`fix(update): complete schema upgrades from 2026.9.2`  
- 推进方向：升级可靠性、数据库 schema 迁移完整性。  
- 价值：解决从已发布 `2026.9.2` 升级时 agent 数据库 schema 不匹配导致的回滚风险。  
- 项目意义：这是当前发布健康度的关键 PR，若合入将明显降低旧版本用户升级阻力。

#### 3. Gateway 与 UI 后台流量优化  
- PR：[#153040](https://github.com/openclaw/openclaw/pull/153040)  
- 状态：Open，`ready for maintainer look`  
- 标题：`fix(ui): reduce background traffic when opening chats`  
- 推进方向：Web UI / Gateway / agents / scripts  
- 价值：打开 chat 时不再为了侧边栏 Inbox badge 拉取完整 automation definitions，从而减少背景流量。  
- 用户影响：聊天页面加载更轻量，尤其对多 automation、大 prompt 配置场景更友好。

#### 4. Gateway 线程卸载与性能治理  
- PR：[#153159](https://github.com/openclaw/openclaw/pull/153159)  
- 状态：Open，`ready for maintainer look`  
- 标题：`improve: move Board writes off the Gateway thread`  
- 价值：将 Board 写入从 Gateway 主线程移出，降低请求路径阻塞风险。  
- 项目意义：体现 OpenClaw 正在系统性治理 Gateway 作为中枢服务的吞吐与响应问题。

#### 5. Session / subagent 快照复用  
- PR：[#152510](https://github.com/openclaw/openclaw/pull/152510)  
- 状态：Open，`ready for maintainer look`  
- 标题：`perf(ui): reuse session snapshots across subagent trees`  
- 背景：此前证据显示 49 个连接 viewer 下约有 `6 sessions.list requests/second`。  
- 价值：减少 Control UI 在 subagent tree 活跃时重复加载 session window 的行为。

#### 6. 任务读取与并发投影稳定性  
- PR：[#153404](https://github.com/openclaw/openclaw/pull/153404)  
- 状态：Open  
- 标题：`fix(tasks): share concurrent projection preparation`  
- 价值：避免并发 task-page 读取和 live-flow retry 在 publication pending 时互相 invalidation。  
- 用户影响：任务页和实时流读取更稳定。

#### 7. 图像附件浏览体验修复  
- PR：[#153198](https://github.com/openclaw/openclaw/pull/153198)  
- 状态：Open，`ready for maintainer look`  
- 标题：`fix(ui): navigate image attachments in message galleries`  
- 价值：修复同一条聊天回复中多个 `MEDIA:` 图片附件无法用左右方向键导航的问题。  
- 用户影响：多图消息浏览体验更接近标准图库行为。

#### 8. macOS 权限请求体验修复  
- PR：[#153263](https://github.com/openclaw/openclaw/pull/153263)  
- 状态：Open，`ready for maintainer look`  
- 标题：`fix: request missing macOS permissions and simplify permission status`  
- 价值：修复点击权限操作后 OpenClaw 未出现在 macOS Screen Recording 设置中的问题。  
- 用户影响：`Grant` 会主动请求未授予权限，Permissions 页面也更易读。

---

## 4. 社区热点

今日最热议和最值得关注的条目主要集中在升级失败、更新恢复、插件热重载、Gateway 性能和 macOS 桌面能力。

### 1. P0：Windows 更新失败阻塞发布体验  
- Issue：[#153365](https://github.com/openclaw/openclaw/issues/153365)  
- 状态：Open  
- 评论数：3  
- 标签：`P0`、`impact:ux-release-blocker`、`clawsweeper:needs-info`  
- 主题：`Update failure: runtime-verification-failed (2026.9.4)`  
- 用户诉求：用户希望从 `2026.9.4` 正常升级到 `2026.9.5`，但 runtime verification 阶段失败。  
- 背后信号：  
  - 发布后验证链路仍存在平台差异风险；  
  - Windows 用户升级路径需要更强的预检和失败解释；  
  - `runtime-verification-failed` 这类错误对普通用户可操作性不足，需要更清晰的 remediation。

### 2. P1：更新恢复需要大量人工介入  
- Issue：[#153401](https://github.com/openclaw/openclaw/issues/153401)  
- 状态：Open  
- 评论数：1  
- 标签：`P1`、`impact:crash-loop`、`needs-live-repro`  
- 主题：`Update recovery requires manual service, state, and diagnostic intervention`  
- 相关 PR：  
  - [#153403](https://github.com/openclaw/openclaw/pull/153403) — Gateway service recovery  
  - [#153405](https://github.com/openclaw/openclaw/pull/153405) — legacy approvals reconciliation  
  - [#153406](https://github.com/openclaw/openclaw/pull/153406) — pre-activation rehearsal  
  - [#153407](https://github.com/openclaw/openclaw/pull/153407) — quiet step progress and dated outcomes  
  - [#153408](https://github.com/openclaw/openclaw/pull/153408) — CLI discovery guidance  
- 用户诉求：升级失败或恢复失败时，不应要求操作者手动处理服务、状态、诊断和 SQLite 层面的数据。  
- 背后信号：OpenClaw 的 update/recovery 机制正在从“开发者可恢复”向“普通用户可恢复”演进。

### 3. 插件热重载与 live channel adapter 之间的竞态  
- Issue：[#153290](https://github.com/openclaw/openclaw/issues/153290)  
- 状态：Open  
- 评论数：4  
- 标签：`P2`、`clawsweeper:needs-info`、`impact:other`  
- 主题：`plugins reload removes the previous plugin build generation while a live channel adapter still loads from it → ENOENT in WhatsApp after-delivery hook`  
- 用户诉求：插件 reload 不应删除仍被 live channel adapter 使用的旧 build generation。  
- 背后信号：插件系统与实时 channel adapter 生命周期之间存在资源回收时序问题。WhatsApp after-delivery hook 是暴露该问题的场景之一。

### 4. macOS 桌面共享默认启用与权限边界  
- PR：[#153359](https://github.com/openclaw/openclaw/pull/153359)  
- 状态：Open，`needs proof`  
- 标签：`merge-risk: security-boundary`、`security-sensitive-changed`  
- 标题：`feat: enable node desktop sharing by default with a Mac setting`  
- 用户诉求：在线配对 Mac 明明 Computer Control 和 macOS Screen Sharing 可用，却显示 “No desktop available”。  
- 背后信号：用户期望桌面能力开箱即用，但该功能涉及安全边界、默认配置和用户授权，需要谨慎合入。

### 5. Compaction 语义保真成为重点路线  
- PR：[#153208](https://github.com/openclaw/openclaw/pull/153208)  
- PR：[#153209](https://github.com/openclaw/openclaw/pull/153209)  
- 状态：Open，均为 `ready for maintainer look`  
- 主题：semantic fidelity、typed judgments、summarizer context curation  
- 用户诉求：压缩上下文时不只是通过结构检查，还要保留活动请求的真实语义。  
- 背后信号：OpenClaw 正在加强长会话、agent 记忆压缩和任务连续性能力，这是 AI agent 产品体验的核心区域。

---

## 5. Bug 与稳定性

以下按严重程度排序。

### P0 / 发布阻塞级

#### 1. Windows 更新失败：runtime-verification-failed  
- Issue：[#153365](https://github.com/openclaw/openclaw/issues/153365)  
- 状态：Open  
- 严重性：`P0`，`impact:ux-release-blocker`  
- 影响版本：`2026.9.4 → 2026.9.5`  
- 平台：Windows `win32/x64`  
- 是否已有 fix PR：当前数据中未看到明确直接关联的 fix PR。  
- 风险：高。会直接阻止用户升级到最新版本。  
- 建议：维护者应优先补充诊断信息、确认是否平台特定、明确 workaround 或 hotfix 计划。

---

### P1 / crash-loop 与恢复可靠性

#### 2. 更新恢复需要人工服务、状态和诊断介入  
- Issue：[#153401](https://github.com/openclaw/openclaw/issues/153401)  
- 状态：Open  
- 严重性：`P1`，`impact:crash-loop`  
- 是否已有 fix PR：有，多条关联 PR：  
  - [#153403](https://github.com/openclaw/openclaw/pull/153403)  
  - [#153405](https://github.com/openclaw/openclaw/pull/153405)  
  - [#153406](https://github.com/openclaw/openclaw/pull/153406)  
  - [#153407](https://github.com/openclaw/openclaw/pull/153407)  
  - [#153408](https://github.com/openclaw/openclaw/pull/153408)  
- 风险：高。更新失败后的恢复路径过于依赖人工经验，会扩大事故影响。  
- 当前进展：修复被拆分为服务恢复、审批冲突、预演检查、进度可见性和 CLI discovery 指引等多个小 PR，方向合理。

#### 3. 从 2026.9.2 升级时 schema upgrade 不完整  
- PR：[#153402](https://github.com/openclaw/openclaw/pull/153402)  
- 状态：Open，`ready for maintainer look`  
- 严重性：`P1`  
- 影响：agent 数据库 schema 升级与 rollback 边界。  
- 是否已有 fix PR：该 PR 本身即为修复。  
- 风险：高。影响从旧发布版本升级到新版本的正常路径。

---

### P2 / 稳定性与用户体验风险

#### 4. 插件 reload 删除仍被 live adapter 使用的 build generation  
- Issue：[#153290](https://github.com/openclaw/openclaw/issues/153290)  
- 状态：Open  
- 严重性：`P2`  
- 影响：WhatsApp after-delivery hook、plugin build generation 生命周期。  
- 是否已有 fix PR：当前数据中未看到明确关联 fix PR。  
- 风险：中高。可能影响 channel adapter 的可靠性，尤其是长连接和实时消息场景。

#### 5. 深层嵌套 tool-call args 导致 RangeError  
- Issue：[#152921](https://github.com/openclaw/openclaw/issues/152921)  
- 状态：Closed  
- 严重性：`P2`，`bug:crash`，`impact:crash-loop`  
- 标签：`clawsweeper:linked-pr-open`、`needs-security-review`  
- 主题：`Deeply nested tool-call args crash tool display metadata with RangeError`  
- 影响：`inferToolMetaFromArgs()` 递归处理深层数组缺少深度保护，约 4000 层嵌套可触发崩溃。  
- 是否已有 fix PR：标签显示有 linked PR open，但提供数据未列出具体 PR 编号。  
- 风险：中高，且带安全审查标签，说明存在输入构造导致稳定性或 DoS 风险的可能。

#### 6. 任务读取并发导致失败  
- PR：[#153404](https://github.com/openclaw/openclaw/pull/153404)  
- 状态：Open  
- 严重性：未标 P，但影响任务页和 live-flow retry  
- 是否已有 fix PR：有，该 PR 即修复。  
- 风险：中。会影响任务列表、实时状态和并发读取体验。

#### 7. Gateway shared-state worker 启动导致内存升高  
- PR：[#153399](https://github.com/openclaw/openclaw/pull/153399)  
- 状态：Open，`ready for maintainer look`  
- 标题：`fix: reduce Gateway memory when shared-state workers start`  
- 风险：中。Gateway 是核心路径，内存膨胀会影响多用户或长时间运行部署。

---

## 6. 功能请求与路线图信号

### 1. TEKIZAI provider plugin 与 API key onboarding  
- PR：[#153339](https://github.com/openclaw/openclaw/pull/153339)  
- 状态：Open  
- 标题：`feat(tekizai): add provider plugin and API-key onboarding`  
- 关联：Closes `#153327`  
- 路线图信号：OpenClaw 正在继续扩展 provider/plugin 生态，降低新模型/服务接入门槛。  
- 纳入下一版本可能性：中等。该 PR 已经具体实现 provider plugin 和 API key onboarding，但存在 `dependencies-changed`，需关注依赖审查。

### 2. 动态两阶段 skill / tool 预过滤  
- PR：[#153340](https://github.com/openclaw/openclaw/pull/153340)  
- 状态：Open  
- 标题：`feat(plugins): add dynamic two-stage skill & tool pre-filtering via decision models`  
- 用户价值：减少每轮交互加载大量 skill/tool definitions 带来的 5,000 到 10,000+ tokens 开销，降低延迟和 tool hallucination。  
- 路线图信号：OpenClaw 正在探索更智能的工具选择机制，这对 agent 成本、速度和稳定性都很关键。  
- 纳入下一版本可能性：中等偏低到中等。价值大，但会影响工具选择路径，需充分验证。

### 3. macOS node desktop sharing 默认启用  
- PR：[#153359](https://github.com/openclaw/openclaw/pull/153359)  
- 状态：Open，`needs proof`  
- 标题：`feat: enable node desktop sharing by default with a Mac setting`  
- 路线图信号：桌面控制和远程可视化能力是 OpenClaw 作为个人 AI 助手的重要方向。  
- 纳入下一版本可能性：中等。用户价值明显，但带 `security-boundary` 和 `security-sensitive-changed`，需要证明和审慎 review。

### 4. Compaction 语义保真与 typed judgments  
- PR：[#153208](https://github.com/openclaw/openclaw/pull/153208)  
- PR：[#153209](https://github.com/openclaw/openclaw/pull/153209)  
- 状态：Open，`ready for maintainer look`  
- 路线图信号：长上下文压缩不再只关注结构完整，而是引入语义保真、shadow curation 和 typed judgments。  
- 纳入下一版本可能性：中等偏高。两个 PR 已形成 canonical stack，且 proof sufficient。

### 5. Slack / Discord 重启后讨论上下文恢复  
- PR：[#153075](https://github.com/openclaw/openclaw/pull/153075)  
- 状态：Open，`waiting on author`  
- 标题：`fix: recover Slack and Discord discussion after restarts`  
- 用户价值：channel monitor 重启后仍能恢复最近讨论窗口，避免下一轮 addressed turn 缺少上下文。  
- 路线图信号：多渠道 agent 的连续对话能力仍是重点。  
- 纳入下一版本可能性：中等。已有关联问题和明确影响，但当前等待作者处理。

---

## 7. 用户反馈摘要

### 1. 升级失败时，用户需要更可理解、更可恢复的路径  
代表条目：  
- [#153365](https://github.com/openclaw/openclaw/issues/153365)  
- [#153401](https://github.com/openclaw/openclaw/issues/153401)  
- [#153407](https://github.com/openclaw/openclaw/pull/153407)

用户痛点包括：

- 更新失败后错误信息偏底层，如 `runtime-verification-failed`，普通用户难以判断下一步。  
- 长时间 update step 在 redirect/quiet 模式下可能看起来“无响应”。  
- 旧失败记录缺少开始时间，用户不知道当前状态是否来自本次尝试。  
- 恢复流程跨越服务、状态、诊断和审批策略，人工操作成本过高。

正向信号：维护者已将这些问题拆分成多个可合并 PR，说明项目在强化“失败时的用户体验”。

### 2. macOS 权限与桌面共享配置不够显性  
代表条目：  
- [#153263](https://github.com/openclaw/openclaw/pull/153263)  
- [#153359](https://github.com/openclaw/openclaw/pull/153359)

用户痛点：

- 点击权限操作后，OpenClaw 可能没有出现在 macOS Screen Recording 设置中。  
- 在线 Mac 已配对，Computer Control 和系统 Screen Sharing 可用，但 OpenClaw 仍显示 “No desktop available”。  
- 隐藏配置导致用户很难判断是权限问题、Gateway 配置问题还是 node 配置问题。

产品信号：OpenClaw 正在把“需要懂内部配置”的能力转成“可通过 UI/设置理解和开启”的能力。

### 3. 多渠道与插件运行时需要更稳的生命周期管理  
代表条目：  
- [#153290](https://github.com/openclaw/openclaw/issues/153290)  
- [#153075](https://github.com/openclaw/openclaw/pull/153075)

用户痛点：

- 插件 reload 后，live adapter 仍可能引用被删除的旧构建目录。  
- Slack / Discord monitor 重启后丢失最近讨论窗口，导致 agent 对上下文理解断裂。  
- WhatsApp、Slack、Discord 这类实时 channel 对状态恢复和生命周期管理要求高。

路线图信号：channel adapter 和 plugin lifecycle 将继续是稳定性重点。

### 4. UI 细节体验仍在持续打磨  
代表条目：  
- [#153198](https://github.com/openclaw/openclaw/pull/153198)  
- [#152814](https://github.com/openclaw/openclaw/pull/152814)  
- [#153277](https://github.com/openclaw/openclaw/pull/153277)

用户痛点：

- 多图片附件无法使用左右方向键导航。  
- Cron timeout 文案与实际允许值不一致。  
- Chat rail 初始定位、composer resize、focus ring 等交互细节仍有磨损感。

整体反馈：用户不仅关注 agent 能力，也在意日常 UI 的顺滑程度和文案准确性。

---

## 8. 待处理积压

当前数据仅覆盖过去 24 小时，无法判断“长期未响应”的历史积压；但从今日状态看，有几类高价值待处理项应优先进入维护者队列。

### 高优先级待处理

#### 1. P0 更新失败仍未看到明确修复 PR  
- Issue：[#153365](https://github.com/openclaw/openclaw/issues/153365)  
- 状态：Open  
- 关注原因：发布阻塞级，影响 `2026.9.4 → 2026.9.5` Windows 更新。  
- 建议：尽快关联 fix PR 或提供官方 workaround。

#### 2. 更新恢复链路拆出多个 PR，需集中 review  
- Issue：[#153401](https://github.com/openclaw/openclaw/issues/153401)  
- 相关 PR：  
  - [#153403](https://github.com/openclaw/openclaw/pull/153403)  
  - [#153405](https://github.com/openclaw/openclaw/pull/153405)  
  - [#153406](https://github.com/openclaw/openclaw/pull/153406)  
  - [#153407](https://github.com/openclaw/openclaw/pull/153407)  
  - [#153408](https://github.com/openclaw/openclaw/pull/153408)  
- 关注原因：这些 PR 共同改善 update recovery 体验，建议作为一个 recovery stabilization batch 处理。

#### 3. `2026.9.2` schema upgrade 修复应尽快合入  
- PR：[#153402](https://github.com/openclaw/openclaw/pull/153402)  
- 状态：Open，`ready for maintainer look`  
- 关注原因：影响旧版本用户升级路径，是发布健康度关键项。

#### 4. 插件 reload ENOENT 问题仍需信息和修复路径  
- Issue：[#153290](https://github.com/openclaw/openclaw/issues/153290)  
- 状态：Open，`needs-info`  
- 关注原因：涉及 live channel adapter 与 plugin build generation 生命周期，可能影响实时渠道稳定性。

#### 5. 多个大型 Gateway / session 性能 PR 待 review，存在堆积风险  
- [#153040](https://github.com/openclaw/openclaw/pull/153040) — reduce background traffic  
- [#153159](https://github.com/openclaw/openclaw/pull/153159) — move Board writes off Gateway thread  
- [#152510](https://github.com/openclaw/openclaw/pull/152510) — reuse session snapshots  
- [#152901](https://github.com/openclaw/openclaw/pull/152901) — move placement evidence reads into workers  
- [#153331](https://github.com/openclaw/openclaw/pull/153331) — async transcript views  
- 关注原因：这些 PR 都在减少 Gateway 主路径负载，但多个 XL/L PR 并行可能产生冲突和 review 压力。

### 总体积压评估

- 待合并 PR：45 条  
- 今日更新 PR 总数：55 条  
- 已合并/关闭：10 条  
- 风险判断：开发速度很快，但 review 队列压力较大。  
- 建议优先级：  
  1. 先处理 P0/P1 update/recovery；  
  2. 再处理 Gateway 性能和 task/session 稳定性；  
  3. 最后处理功能型 provider、tool pre-filtering 和桌面共享默认启用等扩展能力。

---

## 总结

OpenClaw 今日呈现出典型的**高活跃发布后稳定化周期**：一方面，`v2026.9.5` 已进入 Linux stable 发布通道；另一方面，升级失败、schema 迁移、服务恢复、权限授权和 Gateway 负载等问题集中浮现。维护侧响应积极，多个问题已拆解成可 review 的 PR，但当前最大风险仍是 `2026.9.x` 更新链路的可靠性与可恢复性。若 P0/P1 更新问题能快速合入修复，OpenClaw 下一阶段有望在稳定基础上继续推进 provider 生态、上下文压缩语义保真和桌面控制体验。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告  
**日期：2026-09-20**

---

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态呈现明显分层：头部项目如 **OpenClaw、Hermes Agent、CoPaw/QwenPaw、ZeroClaw** 保持高频迭代，正在围绕更新可靠性、Gateway/Channel 稳定性、插件治理、多模态兼容和桌面端体验做密集修复。  
整体技术重心已从“能跑 Agent”转向“长期稳定运行、可恢复、可治理、跨平台、跨渠道可用”。  
多个项目同时暴露出 update/recovery、无人值守审批、插件 reload、工具权限、Provider 兼容等问题，说明生态正在进入更接近生产化的阶段。  
与此同时，NanoBot、NanoClaw、Moltis 等中小型项目虽活跃度较低，但反馈集中在上下文可靠性、CLI 诊断、Heartbeat 权限、工具继承语义等关键基础能力，显示用户正在深入使用这些系统，而不只是试用 Demo。

---

## 2. 各项目活跃度对比

> 注：Issues / PR 数量按用户提供的过去 24 小时摘要统计；部分项目仅提供“无活动”或概括性数据。

| 项目 | Issues 活动 | PR 活动 | Release | 今日重点 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 4 | 55 | Linux stable `v2026.9.5` | 更新失败、schema 迁移、Gateway 性能、macOS 权限、session/compaction 稳定性 | **高活跃，发布后稳定化压力大**；P0/P1 update/recovery 是主要风险 |
| **Hermes Agent** | 50 | 50 | 无 | Gateway 状态、Windows update、Desktop/TUI、多 profile、多 gateway、插件 SDK | **极高活跃，中高稳定性风险**；维护响应快但问题面广 |
| **CoPaw / QwenPaw** | 9 | 7 | `v2.2.2-beta.3` | Console 修复、Provider 多模态 fallback、插件治理 Hook、MCP 认证、reload 生命周期 | **Beta 快速迭代中**；社区反馈密集，核心路径仍需回归验证 |
| **ZeroClaw** | 13 | 8 | 无 | WhatsApp Web 投票、群组、媒体预览、Channel 实例、安全审批 | **高活跃，功能推进集中**；S0 无人值守审批缺口需优先处理 |
| **NanoBot** | 0 | 5 | 无 | 上下文截断修复、WebUI 事件投影、自更新流程、Provider UI | **中等偏高活跃**；Issue 安静但核心质量 PR 有价值 |
| **NanoClaw** | 0 | 2 | 无 | Pi Provider、`ncl health` 本地诊断 | **低到中等活跃**；小步推进，诊断能力方向明确 |
| **PicoClaw** | 1 | 0 | 无 | DingTalk Stream SDK reconnect panic | **低活跃但有高影响 Bug**；生产稳定性风险需响应 |
| **Moltis** | 3 | 0 | 无 | Heartbeat active_hours、tool_controls、spawn_agent 工具语义 | **中低活跃，反馈质量高**；权限与调度语义需对齐 |
| **LobsterAI** | 0 | 1 | 无 | 订阅试用、低余额优惠、商业化埋点 | **低社区互动，产品商业化推进**；技术风险集中在支付/活动链路 |
| **NullClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **IronClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **ZeptoClaw** | 0 | 0 | 无 | 无活动 | **静默** |

### 活跃度排序

1. **极高活跃**：Hermes Agent、OpenClaw  
2. **高活跃**：ZeroClaw、CoPaw/QwenPaw  
3. **中等活跃**：NanoBot、Moltis  
4. **低活跃但有明确信号**：NanoClaw、PicoClaw、LobsterAI  
5. **无活动**：NullClaw、IronClaw、TinyClaw、ZeptoClaw

---

## 3. OpenClaw 在生态中的定位

### 3.1 核心定位

OpenClaw 当前处于生态头部位置，特征是：

- **开发密度高**：过去 24 小时 55 条 PR 更新，明显高于大多数项目。
- **发布节奏快**：已发布 Linux stable `v2026.9.5`，但也进入典型发布后稳定化阶段。
- **系统复杂度高**：同时覆盖 Desktop、Gateway、Web UI、CLI、skills、sessions、compaction、updates、permissions、多平台运行时等模块。
- **工程化成熟度较高**：大量 PR 聚焦性能、恢复、诊断、迁移、权限、并发，而非单纯功能堆叠。

相比之下，Hermes Agent 活跃度同样极高，但今日问题面更分散，集中在 Gateway、Windows/macOS、多 profile、Desktop/TUI 和消息投递；OpenClaw 的今日风险更集中在 **`2026.9.x` update/recovery 链路**。

### 3.2 相对优势

| 维度 | OpenClaw 表现 | 对比说明 |
|---|---|---|
| **发布工程** | 有 stable channel 与 AppImage/deb 资产 | 强于多数中小项目；但当前 update 可靠性有压力 |
| **Gateway 性能治理** | 多个 PR 聚焦 Gateway 线程、background traffic、shared-state memory | 与 Hermes、ZeroClaw 类似，已进入核心服务性能优化阶段 |
| **长会话与压缩** | compaction semantic fidelity、typed judgments、session snapshot 复用 | 较多项目仍停留在上下文截断/历史不足问题，OpenClaw 已在语义保真层推进 |
| **桌面权限体验** | macOS Screen Recording、desktop sharing、权限 UI 改进 | 与 CoPaw、Hermes 的 Desktop/TUI 方向相近，但 OpenClaw 更重视系统权限闭环 |
| **维护响应** | P1 recovery 被拆成多条可 review PR | 响应积极，体现工程拆解能力 |

### 3.3 当前短板与风险

OpenClaw 最大短板不是功能覆盖，而是 **发布链路可靠性**：

- Windows `2026.9.4 → 2026.9.5` 出现 P0 `runtime-verification-failed`；
- `2026.9.2` 升级 schema migration 不完整；
- update recovery 仍需要人工介入服务、状态、诊断和 SQLite 层面；
- 45 条 PR 待合并，review 队列压力较大。

这使 OpenClaw 当前更像一个“功能和架构领先、但发布稳定性需要快速收敛”的头部项目。

---

## 4. 共同关注的技术方向

### 4.1 更新、安装与恢复可靠性

涉及项目：

- **OpenClaw**：Windows update P0、schema upgrade、recovery crash-loop。
- **Hermes Agent**：`hermes update` marker 残留、Windows SCM、post-update traceback、tmp pack 清理。
- **NanoBot**：`nanobot update` stable/source 自更新流程。
- **NanoClaw**：`ncl health` 支持 host 不可用时本地诊断。

共同诉求：

- 更新流程必须幂等、可恢复；
- 失败时需要用户可理解的 remediation；
- 自更新需要跨平台、带校验、能区分 stable/dev；
- 诊断工具不能依赖主服务处于健康状态。

**趋势判断**：个人 AI 助手正在从开发者工具走向日常驻留软件，更新失败会直接损害用户信任。

---

### 4.2 Gateway / Channel / 消息投递稳定性

涉及项目：

- **OpenClaw**：Gateway 主线程卸载、背景流量减少、shared-state memory。
- **Hermes Agent**：startup restore 可能 wedge inbound gate，Gateway status 误报。
- **ZeroClaw**：Dashboard turn 需要复用运行中的 WhatsApp channel 实例。
- **PicoClaw**：DingTalk Stream reconnect panic。
- **CoPaw/QwenPaw**：Provider fallback、Console channel/agent 交互稳定性。

共同诉求：

- Channel/Gateway 不只是消息转发，而是 Agent 可用性的核心路径；
- 长连接、重连、restore、session-bound state 需要更强生命周期管理；
- 错误不能静默 drop，必须可观测、可恢复。

---

### 4.3 工具权限、审批与安全治理

涉及项目：

- **ZeroClaw**：无人值守 turn 缺少 `ApprovalManager`，S0 安全风险。
- **Moltis**：heartbeat 无法设置 `tool_controls`。
- **CoPaw/QwenPaw**：pre-tool-call policy hook、Kimi-code 工具边界绕过。
- **OpenClaw**：legacy approvals reconciliation、approval policy 兼容性修复。
- **Hermes Agent**：context reference 在 size gate 前无界读取，secret scope 错误。

共同诉求：

- 工具调用审批不能只覆盖交互式场景；
- cron、heartbeat、subagent、headless SOP 等无人值守路径也要受控；
- 插件和组织级策略需要在工具调用前介入；
- 文件、目录、diff、Bash、Write 等高风险工具需要一致的治理入口。

**趋势判断**：Agent 安全治理正在从“人工确认弹窗”演进为“策略化、插件化、上下文感知的 tool-call policy layer”。

---

### 4.4 长上下文、压缩与会话历史可靠性

涉及项目：

- **OpenClaw**：compaction semantic fidelity、typed judgments、session snapshot 复用。
- **NanoBot**：移除本地上下文尾部静默截断，改用共享 consolidator。
- **CoPaw/QwenPaw**：聊天记录历史太短，用户无法回看。
- **Hermes Agent**：manual `/compress` 在 multiplexing 下 secret scope 错误，context ceiling 静默丢失。
- **Moltis**：spawn_agent 工具继承语义影响子 Agent 执行上下文。

共同诉求：

- 不能静默截断关键上下文；
- 压缩不只要结构正确，还要语义保真；
- UI 历史展示和模型上下文裁剪需要解耦；
- 多 Agent / subagent 场景下要保持上下文、工具、权限一致。

---

### 4.5 多 Provider、多模态与能力探测

涉及项目：

- **OpenClaw**：TEKIZAI provider plugin、tool pre-filtering。
- **NanoBot**：Provider 设置 UI 统一。
- **NanoClaw**：Pi Agent Provider。
- **CoPaw/QwenPaw**：DeepSeek 文件 payload、OpenCode free model 403、audio fallback、MCP Bearer Key。
- **Hermes Agent**：Codex usage limit windows。
- **LobsterAI**：订阅、额度、模型选择与优惠入口。

共同诉求：

- Provider 能力不能只靠静态配置；
- 文件、音频、PDF、视觉等多模态输入需要 request-scoped fallback；
- UI 需要准确展示模型是否真的可通过 API 调用；
- 额度、限额、套餐、优惠和 provider 状态需要更透明。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 / 产品特征 |
|---|---|---|---|
| **OpenClaw** | 个人 AI 助手平台、Gateway、Desktop、skills、sessions、compaction | 高级个人用户、开发者、需要本地/桌面 AI 助手的用户 | 全栈复杂系统；重视发布工程、桌面权限、长会话、Gateway 性能 |
| **Hermes Agent** | CLI/Gateway/Desktop/TUI、多 profile、多 gateway、插件 SDK | 开发者、重度自动化用户、多环境用户 | 高度工程化；多运行模式、多平台、多 profile 带来复杂状态管理 |
| **CoPaw/QwenPaw** | Console、Provider 兼容、插件治理、MCP、多模态 | Beta 用户、企业工具接入者、插件开发者 | 快速 Beta 迭代；强调插件治理、Provider fallback、Console 体验 |
| **ZeroClaw** | WhatsApp Web Channel、群组、投票、媒体、无人值守 Agent | 即时通讯自动化用户、群聊协作场景 | Channel-first；围绕 WhatsApp 构建真实消息闭环 |
| **NanoBot** | WebUI、一致事件投影、上下文可靠性、自更新 | 轻量级 Agent 用户、WebUI 用户 | 中等规模；重视上下文与 UI 架构一致性 |
| **NanoClaw** | Provider 扩展、CLI 诊断 | 本地部署用户、运维型用户 | 小步演进；`ncl health` 指向可运维性 |
| **PicoClaw** | IM 网关集成，尤其 DingTalk | 企业 IM 接入用户 | 当前问题集中在 Go SDK 长连接稳定性 |
| **Moltis** | Heartbeat、cron、多 Agent、工具权限 | 自动化任务用户、多 Agent 编排用户 | 调度与权限语义是核心挑战 |
| **LobsterAI** | 订阅、额度、商业化链路 | 终端消费用户、付费转化场景 | 更偏产品商业化和桌面付费体验 |
| **NullClaw / IronClaw / TinyClaw / ZeptoClaw** | 今日无可见动态 | 暂无法判断 | 静默状态 |

### 关键差异

- **OpenClaw / Hermes**：更像完整 AI 助手操作系统，复杂度高、维护压力大。
- **ZeroClaw**：更像消息渠道型 Agent 平台，WhatsApp Web 是核心战场。
- **CoPaw/QwenPaw**：更偏插件治理 + Provider 兼容 + Beta 产品化。
- **NanoBot / NanoClaw**：轻量、聚焦局部工程质量。
- **Moltis**：围绕自动化调度和工具权限语义暴露问题。
- **LobsterAI**：技术动态服务于商业化增长，而非开源基础能力扩张。

---

## 6. 社区热度与成熟度

### 6.1 快速迭代阶段

代表项目：

- **Hermes Agent**
- **OpenClaw**
- **CoPaw/QwenPaw**
- **ZeroClaw**

特征：

- Issue 和 PR 数量高；
- 同日 Issue 到 PR 的响应较多；
- 功能与稳定性并行推进；
- 存在 P0/P1/S0 级别问题；
- 社区真实使用场景正在快速暴露系统边界。

这些项目最具生态影响力，但也最容易因发布、Gateway、权限、Provider 兼容问题产生回归。

---

### 6.2 质量巩固阶段

代表项目：

- **NanoBot**
- **NanoClaw**
- **Moltis**

特征：

- 活跃度不高，但问题集中在基础质量；
- NanoBot 处理上下文截断和 WebUI event projection；
- NanoClaw 增加本地健康检查；
- Moltis 暴露 heartbeat/tool_controls/spawn_agent 语义问题。

这些项目的关键不在功能扩张，而在消除“配置看似生效但运行不一致”的信任问题。

---

### 6.3 低活跃但需关注风险阶段

代表项目：

- **PicoClaw**
- **LobsterAI**

特征：

- PicoClaw 今日只有 1 个 Issue，但涉及 DingTalk reconnect panic，影响生产可用性；
- LobsterAI 无 Bug 反馈，但订阅优惠 PR 涉及支付、额度、活动频控和埋点，线上风险需要验证。

---

### 6.4 静默阶段

代表项目：

- **NullClaw**
- **IronClaw**
- **TinyClaw**
- **ZeptoClaw**

过去 24 小时无活动，暂无法判断其真实健康度。若长期如此，可能处于维护停滞或低频开发状态。

---

## 7. 值得关注的趋势信号

### 7.1 Agent 产品正在进入“长期驻留软件”阶段

OpenClaw、Hermes、NanoBot、NanoClaw 都在处理更新、自恢复、诊断、自更新、health check 等问题。  
这说明个人 AI 助手不再只是一次性 CLI 工具，而是要像浏览器、IDE、同步盘一样长期运行、自动更新、失败可恢复。

对开发者的参考价值：

- update/recovery 应被视为核心功能；
- 错误信息必须用户可操作；
- 本地诊断命令应独立于主服务运行。

---

### 7.2 Gateway / Channel 成为 Agent 系统的稳定性核心

ZeroClaw 的 WhatsApp Web、PicoClaw 的 DingTalk、Hermes 和 OpenClaw 的 Gateway 都显示：Agent 真正进入用户工作流后，消息通道就是主路径。

开发者应关注：

- 长连接生命周期；
- 重连与旧资源回收；
- session-bound channel state；
- 入站消息可观测性；
- 媒体、投票、mentions、群组等真实 IM 语义。

---

### 7.3 工具调用治理正在升级为独立层

ZeroClaw 的 ApprovalManager 缺失、Moltis 的 `tool_controls`、CoPaw 的 pre-tool-call hook、OpenClaw 的 approvals reconciliation 都指向同一趋势：  
Agent 系统需要统一的 **Tool Governance Layer**。

开发者应优先设计：

- interactive 与 unattended 共用的审批模型；
- plugin-visible policy hook；
- 组织级策略和风险分级；
- 文件/命令/网络/写操作的一致边界；
- reload 后策略与 hook 不丢失。

---

### 7.4 “静默失败”正在成为用户最不能接受的问题

多个项目的反馈都指向静默失败：

- NanoBot：上下文尾部静默截断；
- Hermes：Discord 消息静默 drop；
- CoPaw：runtime hook reload 后静默丢失；
- OpenClaw：update quiet step 进度不可见；
- Moltis：`active_hours` 文档写了但运行未生效；
- ZeroClaw：无人值守审批可能静默失效。

对开发者的启示：

- 不确定时应显式失败，而不是静默降级；
- 关键配置需要 runtime proof；
- 用户需要知道“系统现在处于什么状态、为什么失败、下一步怎么做”。

---

### 7.5 长上下文竞争焦点从“容量”转向“语义保真”

OpenClaw 的 semantic fidelity、NanoBot 的 consolidator、Hermes 的 compress/context ceiling、CoPaw 的聊天历史反馈都说明：  
用户真正需要的是任务连续性，而不仅是更大 token window。

开发者应关注：

- 压缩摘要的语义验证；
- 活动请求与关键决策的保留；
- UI 历史和模型上下文分离；
- summarization failure 的显式处理；
- subagent / ephemeral turn 的一致上下文策略。

---

### 7.6 多 Provider 生态需要能力探测和动态 fallback

CoPaw 的 DeepSeek/OpenCode/audio/file 问题、OpenClaw 的 provider plugin、NanoBot 的 provider UI、Hermes 的 Codex usage windows 都显示：  
Provider 之间的 API 兼容性、商业限制、多模态格式支持差异会持续扩大。

建议：

- 不要假设 OpenAI-compatible 就完全兼容；
- 需要 request-scoped fallback；
- UI 应展示“可调用能力”，而非仅展示“模型名称”；
- 错误分类器、capability probing、usage/limit 可观测性会成为基础设施。

---

## 总体结论

OpenClaw、Hermes Agent、CoPaw/QwenPaw、ZeroClaw 构成了今日生态中最活跃的第一梯队，但它们都已进入“复杂系统稳定化”阶段：问题不再是缺功能，而是更新恢复、Gateway 生命周期、权限治理、多 Provider 兼容、长上下文语义保真等工程难题。  
OpenClaw 的优势在于全栈能力完整、工程治理深入、维护响应积极；短板是当前 `2026.9.x` 发布链路风险较高，需要尽快收敛 P0/P1 update/recovery。  
对 AI 智能体开发者而言，今日最重要的启示是：**真正可用的个人 AI 助手不是模型包装器，而是一个需要稳定更新、可靠通道、清晰权限、可观测失败、长上下文保真的长期运行系统。**

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报

日期：2026-09-20  
仓库：HKUDS/nanobot  
数据范围：过去 24 小时 GitHub Issues / Pull Requests / Releases 更新

---

## 1. 今日速览

NanoBot 今日没有新的 Issue 更新，也没有新版本发布，社区反馈层面较为安静。  
开发活动主要集中在 Pull Request，共有 5 条 PR 更新，其中 3 条仍处于 Open 状态，2 条已关闭或合并。  
今日工作重点明显偏向工程质量、WebUI 事件架构统一、自更新能力，以及上下文截断相关的稳定性修复。  
整体来看，项目维护活跃度处于中等偏高水平，但活跃点主要来自维护者和贡献者提交 PR，而非用户侧 Issue 讨论。

---

## 2. 项目进展

今日共有 2 条 PR 进入已关闭 / 已合并状态，推动了文档清理与 WebUI 设置体验优化。

### 已关闭 / 已合并 PR

#### PR #5818：移除仓库级 `CLAUDE.md`

- 状态：CLOSED
- 类型：documentation / chore
- 优先级：P2
- 作者：chengyongru
- 链接：https://github.com/HKUDS/nanobot/pull/5818

该 PR 移除了仓库根目录下的 `CLAUDE.md` 文件，属于文档与仓库维护类变更。  
从摘要来看，该变更不涉及运行时逻辑，也未运行测试，影响范围较小。它可能意味着项目正在清理特定工具或旧协作说明文件，降低仓库中的冗余配置和上下文噪音。

#### PR #5816：优化 Provider 设置体验并统一设置控件

- 状态：CLOSED
- 类型：feature / WebUI polish
- 作者：Re-bin
- 链接：https://github.com/HKUDS/nanobot/pull/5816

该 PR 主要改进 WebUI 中 provider 相关的视觉与设置体验，包括：

- 统一 settings、model picker、Overview、composer 中的 provider logo 展示；
- 使用更紧凑的圆角 tile；
- 保留品牌原生背景；
- 移除白色光晕；
- 稳定 loading、error、disabled 等状态；
- 修正品牌资产并补齐缺失的 provider alias。

这类改动直接改善用户在配置模型服务商、切换模型、查看概览时的体验一致性。虽然不是核心推理能力更新，但对个人 AI 助手类产品非常重要，因为 provider 配置往往是新用户上手的关键路径。

### 仍在推进中的重要 PR

#### PR #5820：修复本地上下文尾部静默截断问题

- 状态：OPEN
- 标签：bug / fix / test / priority: p1
- 作者：chengyongru
- 链接：https://github.com/HKUDS/nanobot/pull/5820

这是今日最重要的稳定性 PR。该 PR 计划移除本地 request-fitting 路径中“静默截断历史尾部”的行为，并将 ephemeral turns 与 subagents 路由到共享的 LLM-backed consolidator。  
该变更还强调在摘要失败时仅保留有界 raw checkpoint，并在原始 payload 仍超出限制时显式失败。

这说明项目正在修复一个潜在严重问题：对话历史或上下文可能在用户不知情的情况下被截断，进而影响 Agent 推理连续性、任务记忆与结果可靠性。

#### PR #5819：统一 WebUI 实时事件与回放事件投影逻辑

- 状态：OPEN
- 标签：webui / refactor / feature / test / priority: p2
- 作者：chengyongru
- 链接：https://github.com/HKUDS/nanobot/pull/5819

该 PR 旨在将 React-free TypeScript thread event projector 作为 UI 事件语义的统一来源，并让实时 WebSocket 投递和持久化 thread replay 都经过同一个 reducer。  
覆盖的事件类型包括：

- delta
- reasoning
- tool / progress
- file-edit
- message
- compaction
- turn-end

这是一项偏架构层面的 WebUI 重构，意义在于减少“实时显示”和“历史回放”之间的行为不一致。对 Agent 应用而言，工具调用、推理链、文件修改、消息流式输出的回放一致性非常关键。

#### PR #5817：新增 stable 与 source 自更新流程

- 状态：OPEN
- 类型：feature
- 作者：chengyongru
- 链接：https://github.com/HKUDS/nanobot/pull/5817

该 PR 增加 `nanobot update` 命令，用于更新到最新稳定 PyPI 版本，同时支持显式的 `--dev` / `--update-dev` 源码更新流程。  
摘要中还提到：

- 使用 fast-forward-only checkout 处理源码更新；
- 在需要时引导安装带 SHA-256 校验的私有 Bun runtime；
- Node 不再是必需依赖；
- 构建 TUI / WebUI 源码依赖。

这表明项目正在完善分发与升级体验。对于个人 AI 助手项目而言，稳定、可信、低门槛的自更新机制有助于降低普通用户升级成本。

---

## 3. 社区热点

今日没有 Issue 更新，也没有可用的评论数或反应数数据，因此未观察到明显由社区讨论驱动的热点。  
不过，从 PR 的优先级和变更内容看，维护者关注点主要集中在以下方向：

### 上下文可靠性与 Agent 记忆一致性

- PR：#5820
- 链接：https://github.com/HKUDS/nanobot/pull/5820

该 PR 被标记为 `priority: p1`，说明上下文尾部静默截断被维护者视为高优先级问题。  
背后的诉求是：Agent 在长对话、多轮任务、subagent 协作和临时会话中，不能无提示地丢失关键历史，否则会直接影响任务执行质量和用户信任。

### WebUI 实时与回放一致性

- PR：#5819
- 链接：https://github.com/HKUDS/nanobot/pull/5819

该 PR 聚焦事件投影统一，虽然不是用户直接提出的 Issue，但它回应的是典型产品体验痛点：用户在实时会话中看到的事件流，与稍后打开历史记录时看到的回放结果必须一致。

### 安装与更新体验

- PR：#5817
- 链接：https://github.com/HKUDS/nanobot/pull/5817

自更新能力通常与用户留存和部署便利性高度相关。该 PR 反映项目正在朝更完整的 CLI / 桌面级工具体验演进。

---

## 4. Bug 与稳定性

今日没有新的 Bug Issue 报告，但有 1 个高优先级 Bug 修复 PR 正在推进。

### P1：本地上下文尾部静默截断

- 相关 PR：#5820
- 状态：OPEN，尚未合并
- 标签：bug / fix / test / priority: p1
- 链接：https://github.com/HKUDS/nanobot/pull/5820

#### 问题表现

当前存在本地 request-fitting 路径可能静默截断历史尾部的问题。  
这类问题风险较高，因为用户或开发者可能并不知道上下文已被截断，但 Agent 的后续行为已经基于不完整历史做出判断。

#### 潜在影响

- 长对话任务中丢失最近关键上下文；
- subagent 或 ephemeral turn 中状态不一致；
- 工具调用或文件编辑任务可能基于缺失信息继续执行；
- 用户难以定位回答异常的原因。

#### 修复方向

PR #5820 的修复思路包括：

- 移除静默截断路径；
- 使用共享 LLM-backed consolidator 处理上下文压缩；
- transient checkpoint 不持久化；
- 摘要失败时保留有界 raw checkpoint；
- payload 仍超限时显式失败。

#### 当前结论

该 PR 是今日最值得优先 review 和测试的稳定性变更。建议维护者重点验证长上下文、多 Agent、ephemeral session、summarization failure 等边界场景。

---

## 5. 功能请求与路线图信号

今日没有新的 Issue 型功能请求，但多个 PR 显示出明确的路线图信号。

### 自更新能力可能进入下一版本

- PR：#5817
- 链接：https://github.com/HKUDS/nanobot/pull/5817

`nanobot update` 以及 stable / dev 双通道更新机制，是面向终端用户和开发者的重要能力。  
如果该 PR 合并，下一版本可能会显著改善 NanoBot 的安装、更新与源码构建体验。

可能纳入的能力包括：

- 更新到最新 PyPI 稳定版本；
- 使用 `--dev` 或 `--update-dev` 更新源码版本；
- 自动准备 Bun runtime；
- 降低对 Node 环境的依赖。

### WebUI 事件模型统一是中期架构重点

- PR：#5819
- 链接：https://github.com/HKUDS/nanobot/pull/5819

统一 live 与 replay projection 表明 WebUI 正在从“功能堆叠”转向“事件模型治理”。  
这可能为后续能力打基础，例如：

- 更可靠的会话回放；
- 更一致的工具调用展示；
- 更准确的 reasoning / progress / file-edit 可视化；
- 更容易测试的 UI reducer 逻辑。

### Provider 设置体验持续优化

- PR：#5816
- 链接：https://github.com/HKUDS/nanobot/pull/5816

该 PR 已关闭 / 合并，说明 provider 体验是近期产品打磨重点。  
结合 AI 助手类项目的使用路径，模型供应商配置、模型选择器和 composer 体验很可能仍会是后续 WebUI 优化方向。

---

## 6. 用户反馈摘要

今日没有新的 Issue，也没有可用的评论内容，因此无法直接提炼真实用户反馈。  
不过，从 PR 内容可以推断出维护者正在主动处理以下用户体验与开发体验痛点：

1. **长上下文可靠性问题**  
   - 相关 PR：#5820  
   - 链接：https://github.com/HKUDS/nanobot/pull/5820  
   - 推断痛点：用户希望 Agent 在长任务中保留关键上下文，不能在无提示情况下丢失近期对话或任务状态。

2. **实时会话与历史回放不一致**  
   - 相关 PR：#5819  
   - 链接：https://github.com/HKUDS/nanobot/pull/5819  
   - 推断痛点：用户查看历史 thread 时，希望看到与实时执行阶段一致的消息、工具调用、进度和文件编辑结果。

3. **模型服务商配置体验不统一**  
   - 相关 PR：#5816  
   - 链接：https://github.com/HKUDS/nanobot/pull/5816  
   - 推断痛点：用户在 settings、model picker、Overview、composer 等多个入口看到 provider 信息时，希望视觉一致、状态稳定、品牌识别准确。

4. **升级路径复杂**  
   - 相关 PR：#5817  
   - 链接：https://github.com/HKUDS/nanobot/pull/5817  
   - 推断痛点：用户和开发者需要更简单、可靠、可验证的更新流程，尤其是在同时存在稳定版和源码开发版的情况下。

---

## 7. 待处理积压

基于今日提供的数据，没有发现长期未响应的 Issue 或 PR。  
当前需要维护者重点关注的是 3 个仍处于 Open 状态的 PR：

### 高优先级：PR #5820

- 标题：fix(agent): remove local context tail truncation
- 状态：OPEN
- 优先级：P1
- 链接：https://github.com/HKUDS/nanobot/pull/5820

建议优先 review、补充回归测试，并确认在 summarization failure、payload 超限、subagent 临时上下文等场景下行为符合预期。

### 中优先级：PR #5819

- 标题：refactor(webui): unify live and replay event projection
- 状态：OPEN
- 优先级：P2
- 链接：https://github.com/HKUDS/nanobot/pull/5819

建议重点验证实时 WebSocket 流与 persisted thread replay 的 UI 结果一致性，尤其是 tool/progress、file-edit、compaction、turn-end 等复杂事件。

### 中优先级：PR #5817

- 标题：feat: add stable and source self-update flows
- 状态：OPEN
- 链接：https://github.com/HKUDS/nanobot/pull/5817

建议关注安全性与跨平台兼容性，特别是 SHA-256 校验、Bun runtime bootstrap、fast-forward-only 更新、PyPI stable 与 dev source 之间的行为边界。

---

## 项目健康度评估

今日 NanoBot 的 Issue 侧非常安静，说明没有明显新增用户报错或需求爆发；但 PR 侧保持活跃，且多个变更触及稳定性、WebUI 架构和更新机制等核心工程能力。  
短期健康度良好，维护者仍在持续推进关键质量改进。  
主要风险集中在 PR #5820 所揭示的上下文截断问题，在合并并充分测试前，长上下文 Agent 场景仍可能存在可靠性隐患。  
如果 #5820、#5819、#5817 后续顺利合并，NanoBot 下一阶段可能在稳定性、可维护性和用户升级体验上获得明显提升。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
日期：2026-09-20  
仓库：NousResearch/hermes-agent

---

## 1. 今日速览

过去 24 小时 Hermes Agent 维持了**极高活跃度**：Issues 更新 50 条，其中新开或活跃 48 条、关闭 2 条；PR 更新 50 条，其中仍待合并 44 条、已合并或关闭 6 条。整体来看，项目当前处于**快速迭代但稳定性压力较高**的阶段，新增问题集中在 CLI/Gateway 更新流程、Desktop/TUI 会话状态、Windows/macOS 平台兼容、插件与观测能力等方面。

今日没有新版本发布，说明维护重点仍在主干修复与下一版本候选积累。PR 侧出现了多条与已有 Issue 精准对应的修复，例如配置迁移崩溃、Windows hook 执行、Desktop 附件归属、group chat 错误展示等，显示维护者和贡献者对回归问题响应较快。但 P1/P2 级别的 Gateway、更新、会话状态问题数量仍然偏多，短期内应优先收敛安装更新链路、Gateway 生命周期和多 profile/多 gateway 场景的稳定性。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

> 注：日报数据中未展开列出 6 个“已合并/关闭”的具体 PR，因此本节重点根据今日关闭 Issue 与待合并高价值 PR 评估项目推进情况。

### 已关闭 / 已处理事项

- [Issue #116416](https://github.com/NousResearch/hermes-agent/issues/116416)  
  **Gateway in-process 运行时状态误报已关闭**  
  问题描述：当 gateway messaging loop 嵌入 `hermes dashboard` 进程内运行时，`hermes gateway status`、`GET /api/status` 和 Dashboard Channels UI 均错误显示 gateway 已停止。  
  影响：这是 dashboard/gateway 集成状态检测问题，容易造成误判服务不可用。  
  状态：已关闭，说明该 false-negative 状态判断问题已有处理或被确认解决。

- [Issue #116460](https://github.com/NousResearch/hermes-agent/issues/116460)  
  **contributors/emails 文件名大小写冲突导致 macOS phantom diff 已关闭**  
  问题描述：两个文件名仅大小写不同，在 macOS 默认大小写不敏感文件系统上无法共存，导致永久 diff。  
  影响：主要影响贡献者开发体验和仓库洁净度。  
  状态：已关闭。

### 今日待合并 PR 中的关键推进

- [PR #116594](https://github.com/NousResearch/hermes-agent/pull/116594)  
  **fix(config): 容忍 config migrations 中的 malformed nested values**  
  对应：[Issue #116593](https://github.com/NousResearch/hermes-agent/issues/116593)  
  价值：修复手写或遗留 `config.yaml` 中标量/映射类型不匹配导致整个迁移链中断的问题。  
  影响范围：CLI、配置迁移、升级兼容性。  
  评估：这是典型 P2 级升级稳定性修复，建议优先合并。

- [PR #116602](https://github.com/NousResearch/hermes-agent/pull/116602)  
  **fix(agent): Windows 上通过解释器运行裸脚本路径 hook**  
  对应：[Issue #116601](https://github.com/NousResearch/hermes-agent/issues/116601)  
  价值：修复 Windows 原生环境中 `command: "~/.hermes/agent-hooks/x.sh"` 因 WinError 193 无法执行的问题。  
  影响范围：Agent hooks、Windows 平台兼容。  
  评估：文档中推荐写法在 Windows 不可用，属于高优先级跨平台一致性修复。

- [PR #116603](https://github.com/NousResearch/hermes-agent/pull/116603)  
  **fix(desktop): 从 owning gateway 解析附件上传**  
  价值：修复 Desktop 在切换前台连接后，附件上传可能从错误 gateway/session route 取路径或字节的问题。  
  影响范围：Desktop、多 gateway、远程会话、vision/attachment。  
  评估：对多 profile、多 gateway 使用场景非常关键，涉及会话状态正确性。

- [PR #116610](https://github.com/NousResearch/hermes-agent/pull/116610)  
  **fix(windows): SCM service config 无法读取时跳过而非中断枚举**  
  价值：修复 Windows 上 `hermes update` 因读取某个 SCM service 配置失败而整体失败的问题。  
  影响范围：Windows、Gateway service、更新流程。  
  评估：与近期多个 Windows 更新/安装问题相关，建议作为更新链路稳定性补丁优先处理。

- [PR #116598](https://github.com/NousResearch/hermes-agent/pull/116598)  
  **fix(desktop): group activity label 显示 pool slot-wait 原因**  
  对应：[Issue #116458](https://github.com/NousResearch/hermes-agent/issues/116458)  
  价值：将 “backend pool slot 等待超时” 与真实 bot 崩溃区分展示，降低用户误判。  
  影响范围：Desktop、Bot Mode group chat、错误可观测性。

- [PR #116605](https://github.com/NousResearch/hermes-agent/pull/116605)  
  **feat(usage): 展示 OpenAI Codex plan-limit windows**  
  价值：解析 `x-codex-*` header，在 `/usage` 中展示计划、额度、5 小时和 7 天窗口等信息。  
  影响范围：usage/cost 可观测性、OpenAI Codex provider。  
  评估：增强用户对限额窗口的理解，有助于减少 429/额度相关困惑。

- [PR #116608](https://github.com/NousResearch/hermes-agent/pull/116608)  
  **feat(kanban): 增加 pre-dispatch 与 pre-create plugin hooks**  
  价值：让插件能够在 Kanban dispatch 或 card 创建前进行拦截或修改。  
  影响范围：插件 SDK、Kanban automation、工作流扩展。  
  评估：属于路线图型增强，表明 Hermes 正在加强“可编排 Agent 工作流”能力。

---

## 4. 社区热点

### 1. Gateway 状态与生命周期问题

- [Issue #116416](https://github.com/NousResearch/hermes-agent/issues/116416)  
  评论数：4，状态：已关闭  
  主题：Gateway in-process 运行时被误判为 stopped。  
  分析：这是今日评论最多的问题，说明用户对 dashboard/gateway 状态一致性非常敏感。Gateway 既可以作为独立进程运行，也可以嵌入 dashboard 运行，这种多运行模式增加了状态检测复杂度。用户核心诉求是：**状态命令、API 与 UI 必须反映真实运行状态，而不是绑定某一种进程模型。**

### 2. Windows / 更新流程问题持续升温

- [Issue #116614](https://github.com/NousResearch/hermes-agent/issues/116614)  
  评论数：2，状态：Open  
  主题：无 inventory 的 `fleet_restart_pending` marker 无法清除，导致 update catch-up 永久 exit 1。  
  分析：这是更新链路中的恢复状态机问题。一次崩溃留下不完整 marker 后，后续健康 fleet 仍被错误处理，甚至杀掉健康 gateway。用户诉求是：**更新流程必须幂等、可恢复，并能识别陈旧或不完整状态。**

- [Issue #116497](https://github.com/NousResearch/hermes-agent/issues/116497)  
  评论数：1，状态：Open  
  主题：`hermes update` 后清理阶段 traceback：`_find_stale_dashboard_pids()` 参数不匹配。  
  分析：核心更新成功但尾部清理报错，影响用户信任。虽然功能未必损坏，但 traceback 会让普通用户认为升级失败。

- [PR #116610](https://github.com/NousResearch/hermes-agent/pull/116610)  
  主题：Windows SCM service 枚举失败时跳过不可读 service。  
  分析：与 Windows update/gateway setup 稳定性相关，是对近期平台兼容问题的直接修补。

### 3. LSP 与开发体验问题

- [Issue #116446](https://github.com/NousResearch/hermes-agent/issues/116446)  
  评论数：2，状态：Open  
  主题：一次 diagnostics timeout 会污染整个 workspace，并且 5 秒预算被错误应用到冷启动 LSP。  
  分析：该 Issue 指出问题不是内存，而是冷启动预算与失败缓存策略错误。用户诉求非常明确：**冷启动 LSP 需要不同于 steady-state 的预算，并且一次超时不应永久禁用整个 workspace。**

### 4. Discord 消息准入逻辑问题

- [Issue #116568](https://github.com/NousResearch/hermes-agent/issues/116568)  
  评论数：2，状态：Open  
  主题：Discord thread 中提及第三方用户但未提及 bot 的消息被静默丢弃。  
  分析：这是消息准入 gate 过严或过滤条件错误的问题。更严重的是“无日志”，导致用户难以排查。用户诉求是：**消息投递链路应可解释、可观测，不应静默 drop。**

---

## 5. Bug 与稳定性

以下按严重程度和影响范围排序。

### P1：消息投递 / Gateway 阻塞类

- [Issue #116514](https://github.com/NousResearch/hermes-agent/issues/116514)  
  **One raising startup-restore replay wedges the inbound gate closed forever**  
  严重级别：P1  
  影响：Gateway startup restore 队列中单个 replay 异常可能导致 inbound gate 永久关闭，后续消息无法进入。  
  风险：高，直接影响消息接收可用性。  
  Fix PR：当前数据中未看到明确对应 PR。  
  建议：优先增加 per-event 异常隔离，确保 `_finish_startup_restore` 在 finally 中释放状态。

### P2：更新、Gateway、配置兼容

- [Issue #116614](https://github.com/NousResearch/hermes-agent/issues/116614)  
  **inventory-less `fleet_restart_pending` marker 永久不清除**  
  严重级别：P2  
  影响：健康 fleet 上 `hermes update` 永久 exit 1，且可能错误重启 gateway。  
  Fix PR：未见明确对应 PR。  
  建议：对无 inventory marker 增加降级处理、TTL 或健康检查后自动清理。

- [Issue #116593](https://github.com/NousResearch/hermes-agent/issues/116593)  
  **Config migrations 遇到 malformed nested values 崩溃**  
  严重级别：P2  
  影响：手写/遗留 config 导致迁移链中断。  
  Fix PR：[PR #116594](https://github.com/NousResearch/hermes-agent/pull/116594)  
  状态：已有修复待合并。  
  建议：优先合并，并补充 migration fuzz/legacy config 测试。

- [Issue #116551](https://github.com/NousResearch/hermes-agent/issues/116551)  
  **计划内 gateway restart 被 systemd 记录为 failure**  
  严重级别：P2  
  影响：正常重启被监控系统误报失败，增加告警噪音。  
  Fix PR：未见明确对应 PR。  
  建议：完善 takeover marker 或 systemd restart 语义适配。

- [Issue #116550](https://github.com/NousResearch/hermes-agent/issues/116550)  
  **Windows `hermes gateway setup` 重复提示安装并重复 UAC hand-off**  
  严重级别：P2  
  影响：Windows 安装体验混乱，可能造成重复安装或用户误操作。  
  Fix PR：未见直接对应 PR，但 [PR #116610](https://github.com/NousResearch/hermes-agent/pull/116610) 同属 Windows gateway/update 稳定性方向。

- [Issue #116497](https://github.com/NousResearch/hermes-agent/issues/116497)  
  **post-update cleanup traceback**  
  严重级别：P2  
  影响：核心升级成功，但尾部清理报错影响信任。  
  Fix PR：未见明确对应 PR。

- [Issue #116384](https://github.com/NousResearch/hermes-agent/issues/116384)  
  **Windows 上 `clear_stale_tmp_packs()` 无法删除只读 git pack 临时文件**  
  严重级别：P2  
  影响：清理逻辑在 Windows 静默失效，debug log 不足以提示用户。  
  Fix PR：未见明确对应 PR。  
  建议：Windows 删除前调整文件属性，并提高日志级别。

### P2：会话状态 / Desktop / TUI

- [Issue #116611](https://github.com/NousResearch/hermes-agent/issues/116611)  
  **Desktop/TUI 手动 `/compress` 在 multiplexing 下因 secret scope 错误失败**  
  严重级别：P2  
  影响：多 profile home 场景中压缩失败，且错误指向无关 provider 的 `key_env`。  
  Fix PR：未见明确对应 PR。  
  风险：涉及 secret boundary，需谨慎处理。

- [Issue #116510](https://github.com/NousResearch/hermes-agent/issues/116510)  
  **`SELECT *` 读取 messages 导致新增列破坏 API 响应**  
  严重级别：P2  
  影响：schema 演进时可能让 `GET /api/sessions/{id}/messages` 失败。  
  Fix PR：未见明确对应 PR。  
  建议：显式列选择并过滤响应字段。

- [Issue #116467](https://github.com/NousResearch/hermes-agent/issues/116467)  
  **Desktop/CLI model changes 可能静默丢失 context ceiling**  
  严重级别：P2  
  影响：模型切换后上下文上限配置不再生效，可能导致成本、截断或压缩策略异常。  
  Fix PR：未见明确对应 PR。

- [Issue #116483](https://github.com/NousResearch/hermes-agent/issues/116483)  
  **Desktop clarify tool question form 不渲染**  
  严重级别：P2  
  影响：用户只看到 spinner，回答为空，交互工具失效。  
  Fix PR：未见明确对应 PR。

- [PR #116603](https://github.com/NousResearch/hermes-agent/pull/116603)  
  **Desktop 附件上传从 owning gateway 解析**  
  严重级别：P2 修复  
  影响：修复多 gateway/session 场景中附件上传归属错误。  
  建议：优先合并。

### P2：Agent 安全边界 / 资源控制

- [Issue #116562](https://github.com/NousResearch/hermes-agent/issues/116562)  
  **`@file:` / `@folder:` / `@diff` 等扩展在 size gate 前读取无界数据**  
  严重级别：P2  
  影响：远程 message text 可触发 context reference expansion，存在资源消耗风险。  
  Fix PR：未见明确对应 PR。  
  建议：在读取前加入文件大小、目录遍历、diff 大小上限。

- [Issue #116601](https://github.com/NousResearch/hermes-agent/issues/116601)  
  **Windows 上 bare `.sh` hook 无法执行**  
  严重级别：P2  
  Fix PR：[PR #116602](https://github.com/NousResearch/hermes-agent/pull/116602)  
  状态：已有修复待合并。

### P3：插件、UI、文档与可观测性

- [Issue #116609](https://github.com/NousResearch/hermes-agent/issues/116609)  
  **Langfuse hardcoded max depth 导致嵌套 tool I/O 被替换为 `<max-depth>`**  
  严重级别：P3  
  影响：复杂 MCP 响应在观测平台中不可读。  
  Fix PR：未见明确对应 PR。  
  建议：暴露配置项，默认值保持兼容。

- [Issue #116568](https://github.com/NousResearch/hermes-agent/issues/116568)  
  **Discord thread 中提及第三方用户时消息静默丢弃**  
  严重级别：P3，但涉及 message delivery，实际影响可能偏高。  
  Fix PR：未见明确对应 PR。  
  建议：至少补日志与 admission decision tracing。

- [Issue #116458](https://github.com/NousResearch/hermes-agent/issues/116458)  
  **Desktop group-chat 成员失败统一显示 “hit an error”**  
  严重级别：P3  
  Fix PR：[PR #116598](https://github.com/NousResearch/hermes-agent/pull/116598)  
  状态：已有修复待合并。

- [Issue #116443](https://github.com/NousResearch/hermes-agent/issues/116443)  
  **macOS TUI 中 Ctrl+D 不退出，Cmd+D 与 Ghostty 冲突**  
  严重级别：P3  
  Fix PR：未见明确对应 PR。  
  建议：提供可配置 keybinding 或遵循终端常见 EOF 行为。

- [Issue #116613](https://github.com/NousResearch/hermes-agent/issues/116613)  
  **Desktop Artifacts 不索引 Office deliverables**  
  严重级别：P3  
  影响：`.xlsx/.docx/.pptx` 即使有 `MEDIA:` tag 也不出现在 Artifacts 页面。  
  Fix PR：未见明确对应 PR。

---

## 6. 功能请求与路线图信号

### 插件 SDK 与工作流扩展正在增强

- [PR #116615](https://github.com/NousResearch/hermes-agent/pull/116615)  
  **feat(desktop): expose focused turn identity to plugin SDK**  
  方向：为 Desktop 插件暴露当前 turn identity，帮助插件识别新 turn 与聚焦会话状态。  
  路线图信号：Hermes 正在将 Desktop 从 UI 壳层扩展为更完整的插件宿主环境。

- [PR #116608](https://github.com/NousResearch/hermes-agent/pull/116608)  
  **feat(kanban): add pre-dispatch and pre-create plugin hooks**  
  方向：允许插件在 Kanban card 创建和调度前介入。  
  路线图信号：Agent 工作流正在向“可策略化、可拦截、可审计”的方向演进。

### Desktop 用户体验持续被打磨

- [PR #116606](https://github.com/NousResearch/hermes-agent/pull/116606)  
  **feat(desktop): add configurable chat reading width**  
  方向：增加 Comfortable 与 Wide 阅读宽度设置。  
  路线图信号：Desktop 正在补齐成熟聊天应用的个性化体验。

- [Issue #116613](https://github.com/NousResearch/hermes-agent/issues/116613)  
  **Artifacts page 支持 Office deliverables**  
  诉求：将 `.xlsx/.docx/.pptx` 等办公交付物纳入 Artifacts 索引。  
  纳入下一版本可能性：中等。实现范围相对清晰，属于用户可见度高的 UX 修复。

### Gateway / Discord 会话模型继续扩展

- [PR #116597](https://github.com/NousResearch/hermes-agent/pull/116597)  
  **feat(gateway): branch Discord sessions into separate threads**  
  方向：让 `/branch` 可以在 Discord 中创建或绑定独立 thread，避免 parent 和 branch 混在同一频道。  
  路线图信号：Hermes 的 gateway 不只是消息转发层，正在承担更复杂的会话拓扑管理。

### Memory 能力出现扩展需求

- [Issue #116564](https://github.com/NousResearch/hermes-agent/issues/116564)  
  **让 `MEMORY.md` 成为 memory doc chain 的 anchor**  
  诉求：当前 2,200 字符限制适合单文件，但难以支持链式记忆文档。  
  纳入下一版本可能性：中低。该需求涉及 memory 加载、安全边界、上下文预算与引用策略，可能需要设计讨论。

### 使用量与限额可观测性增强

- [PR #116605](https://github.com/NousResearch/hermes-agent/pull/116605)  
  **feat(usage): surface Codex plan-limit windows**  
  方向：在 `/usage` 中展示 Codex plan、credits、reset window。  
  路线图信号：随着多 provider、多套餐接入，Hermes 需要更透明的成本与限额解释能力。

---

## 7. 用户反馈摘要

### 主要痛点

1. **升级和安装流程需要更强的恢复能力**  
   相关链接：  
   - [Issue #116614](https://github.com/NousResearch/hermes-agent/issues/116614)  
   - [Issue #116497](https://github.com/NousResearch/hermes-agent/issues/116497)  
   - [Issue #116550](https://github.com/NousResearch/hermes-agent/issues/116550)  
   - [Issue #116384](https://github.com/NousResearch/hermes-agent/issues/116384)  
   用户反馈显示，`hermes update` 在异常中断、Windows 权限、post-update cleanup、service 枚举等场景下仍然脆弱。即便核心功能升级成功，尾部 traceback 或重复 UAC prompt 也会显著降低信任感。

2. **多 profile / multiplexing / 多 gateway 场景正在暴露复杂状态问题**  
   相关链接：  
   - [Issue #116611](https://github.com/NousResearch/hermes-agent/issues/116611)  
   - [PR #116603](https://github.com/NousResearch/hermes-agent/pull/116603)  
   - [Issue #116467](https://github.com/NousResearch/hermes-agent/issues/116467)  
   用户正在更频繁地使用多 profile、多 gateway、Desktop/TUI 并行等高级场景。当前部分路径仍会丢失 secret scope、session owner 或 context ceiling。

3. **消息投递链路需要更好的可观测性**  
   相关链接：  
   - [Issue #116568](https://github.com/NousResearch/hermes-agent/issues/116568)  
   - [Issue #116514](https://github.com/NousResearch/hermes-agent/issues/116514)  
   - [Issue #116416](https://github.com/NousResearch/hermes-agent/issues/116416)  
   用户不只是要求消息能送达，也要求在 drop、restore、gateway status 异常时有明确日志和可解释状态。

4. **Desktop 体验中的“静默失败”和“错误文案过粗”影响可用性**  
   相关链接：  
   - [Issue #116483](https://github.com/NousResearch/hermes-agent/issues/116483)  
   - [Issue #116458](https://github.com/NousResearch/hermes-agent/issues/116458)  
   - [Issue #116613](https://github.com/NousResearch/hermes-agent/issues/116613)  
   典型问题包括 clarify 表单不显示、group chat 错误统一展示、Artifacts 漏掉 Office 文件。用户需要的是可见、可理解、可恢复的 UI 行为。

5. **Windows/macOS 平台差异仍是高频问题来源**  
   相关链接：  
   - [Issue #116601](https://github.com/NousResearch/hermes-agent/issues/116601)  
   - [PR #116602](https://github.com/NousResearch/hermes-agent/pull/116602)  
   - [Issue #116443](https://github.com/NousResearch/hermes-agent/issues/116443)  
   - [Issue #116504](https://github.com/NousResearch/hermes-agent/issues/116504)  
   Windows 主要集中在脚本执行、SCM、文件权限和 UAC；macOS 主要集中在 app bundle、launchd、终端快捷键和大小写文件系统。

### 用户满意点

- 修复响应速度较快：多个新 Issue 当日已有对应 PR，例如 [#116593](https://github.com/NousResearch/hermes-agent/issues/116593) → [#116594](https://github.com/NousResearch/hermes-agent/pull/116594)，[#116601](https://github.com/NousResearch/hermes-agent/issues/116601) → [#116602](https://github.com/NousResearch/hermes-agent/pull/116602)，[#116458](https://github.com/NousResearch/hermes-agent/issues/116458) → [#116598](https://github.com/NousResearch/hermes-agent/pull/116598)。  
- 功能增强方向清晰：插件 SDK、Kanban hooks、Discord branch thread、Desktop appearance setting 都显示项目在继续向个人 AI 助手平台化方向扩展。

---

## 8. 待处理积压

> 当前数据只覆盖过去 24 小时，无法严格判断“长期未响应”。以下列出今日仍处于 Open、优先级高或风险较大的待处理项，建议维护者重点关注。

### 高优先级待处理

- [Issue #116514](https://github.com/NousResearch/hermes-agent/issues/116514)  
  **P1：startup restore replay 异常可能永久关闭 inbound gate**  
  建议优先级：最高。  
  原因：直接影响消息入口可用性，且当前未见修复 PR。

- [Issue #116614](https://github.com/NousResearch/hermes-agent/issues/116614)  
  **P2：无 inventory 的 fleet restart marker 导致 update 永久失败**  
  建议优先级：高。  
  原因：升级恢复链路问题，容易形成持久坏状态。

- [Issue #116562](https://github.com/NousResearch/hermes-agent/issues/116562)  
  **P2：context reference 在 size gate 前无界读取**  
  建议优先级：高。  
  原因：涉及资源消耗和远程消息触发路径，应尽快加前置限制。

- [Issue #116611](https://github.com/NousResearch/hermes-agent/issues/116611)  
  **P2：manual `/compress` 在 multiplexing 下触发 secret scope 错误**  
  建议优先级：高。  
  原因：涉及 profile secret boundary，且用户场景复杂。

- [Issue #116510](https://github.com/NousResearch/hermes-agent/issues/116510)  
  **P2：`SELECT *` 使 messages API 对 schema 演进脆弱**  
  建议优先级：高。  
  原因：修复相对明确，能降低未来迁移风险。

### 有修复 PR，建议尽快 review/merge

- [PR #116594](https://github.com/NousResearch/hermes-agent/pull/116594)  
  修复配置迁移 malformed nested values 崩溃。  
  对应：[Issue #116593](https://github.com/NousResearch/hermes-agent/issues/116593)

- [PR #116602](https://github.com/NousResearch/hermes-agent/pull/116602)  
  修复 Windows bare script hook 执行失败。  
  对应：[Issue #116601](https://github.com/NousResearch/hermes-agent/issues/116601)

- [PR #116603](https://github.com/NousResearch/hermes-agent/pull/116603)  
  修复 Desktop 多 gateway/session 附件上传归属问题。

- [PR #116610](https://github.com/NousResearch/hermes-agent/pull/116610)  
  修复 Windows SCM service config 读取失败导致 update 中断。

- [PR #116598](https://github.com/NousResearch/hermes-agent/pull/116598)  
  修复 Desktop group chat pool slot-wait 错误展示不清晰。  
  对应：[Issue #116458](https://github.com/NousResearch/hermes-agent/issues/116458)

---

## 项目健康度评估

- **活跃度：高**  
  24 小时内 50 条 Issue 更新、50 条 PR 更新，说明社区和贡献者非常活跃。

- **维护响应：较高**  
  多个新报 Bug 已有同日修复 PR，Issue 到 PR 的转化速度良好。

- **稳定性风险：中高**  
  P1/P2 问题集中在 Gateway、更新流程、会话状态、多 profile、Windows/macOS 兼容上，属于核心使用路径。

- **路线图清晰度：较高**  
  插件 SDK、Kanban hooks、Desktop UX、Discord branch thread、usage/cost 可观测性等方向持续推进，符合个人 AI 助手平台化趋势。

- **建议短期重点**  
  下一轮维护应优先收敛：  
  1. Gateway startup/restore/message delivery；  
  2. `hermes update` 幂等恢复与 Windows/macOS 平台兼容；  
  3. Desktop/TUI 多 profile、多 gateway 会话状态；  
  4. schema/config migration 的向后兼容测试。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报  
**日期：2026-09-20**  
**仓库：** [sipeed/picoclaw](https://github.com/sipeed/picoclaw)

---

## 1. 今日速览

过去 24 小时内，PicoClaw 项目活跃度较低，仅新增 / 更新了 1 条 Issue，未出现新的 Pull Request，也没有新版本发布。  
今日唯一新增问题聚焦于 **DingTalk Stream 模式下 SDK 重连导致 panic**，属于运行时稳定性问题，可能影响生产环境中钉钉网关的长期在线能力。  
从数据看，项目今日没有代码层面的推进，当前主要风险集中在已有缺陷的复现与修复跟进上。  
整体健康度方面，项目仍有活跃用户反馈问题，但维护响应、修复 PR 和版本发布在今日暂无体现。

---

## 2. 项目进展

过去 24 小时内没有新的 Pull Request 更新。

- 今日合并 PR：0 个
- 今日关闭 PR：0 个
- 待合并 PR：0 个

因此，今日项目在功能开发、缺陷修复、文档改进等方面暂无可见代码进展。  
当前最需要关注的是新报告的 DingTalk gateway 崩溃问题是否会被快速确认、复现并形成修复 PR。

---

## 3. 社区热点

### [Issue #3382：v0.3.1 DingTalk gateway still panics on stream SDK reconnect](https://github.com/sipeed/picoclaw/issues/3382)

- 状态：Open
- 作者：HenryLoveMiller
- 创建时间：2026-09-20
- 更新时间：2026-09-20
- 评论数：0
- 👍 数：0

该 Issue 是今日唯一活跃讨论项，虽然目前尚无评论和社区反应，但问题本身涉及 **服务崩溃 / panic**，优先级应高于普通功能请求。

用户指出，在 PicoClaw `v0.3.1`、commit `2cf030d2` 环境下，使用 `go.mod` 中固定的上游依赖 `dingtalk-stream-sdk-go v0.9.1`，仍可复现此前在 [#973](https://github.com/sipeed/picoclaw/issues/973) 中报告过的类似 panic：

> `send on closed channel`  
> 位置：`client.go:161`

这表明此前相关问题可能没有被完全修复，或者上游 SDK 的行为在重连场景下仍存在边界条件问题。

背后的用户诉求主要是：

1. DingTalk Stream 模式下网关需要具备长期稳定运行能力；
2. SDK 重连不应导致进程 panic；
3. 需要明确该问题是 PicoClaw 侧封装问题，还是上游 `dingtalk-stream-sdk-go` 的缺陷；
4. 如果此前已有类似问题，应确认是否存在回归。

---

## 4. Bug 与稳定性

### 高严重度

#### [Issue #3382：DingTalk gateway 在 Stream SDK 重连时 panic](https://github.com/sipeed/picoclaw/issues/3382)

- 类型：Bug / 崩溃 / 潜在回归
- 严重程度：高
- 影响范围：DingTalk 网关，Stream Mode
- 影响版本：`v0.3.1`
- 相关 commit：`2cf030d2`
- 相关依赖：`dingtalk-stream-sdk-go v0.9.1`
- 是否已有修复 PR：暂无
- 当前状态：Open

该问题的核心是 SDK 重连过程中触发 `send on closed channel` panic。  
这类问题通常会导致网关进程异常退出，尤其对需要持续接收消息的机器人 / Agent 网关场景影响较大。

从报告内容看，用户明确指出这是此前 [#973](https://github.com/sipeed/picoclaw/issues/973) 中类似问题的延续或复现，因此该问题可能属于以下几种情况之一：

1. **历史缺陷未完全修复**  
   此前修复可能只覆盖了部分路径，重连过程中的 channel 生命周期管理仍存在竞态。

2. **上游 SDK 缺陷未解决**  
   如果 `dingtalk-stream-sdk-go v0.9.1` 在 reconnect 时内部向已关闭 channel 发送数据，PicoClaw 可能需要升级依赖、规避调用方式，或在外层做恢复与重建。

3. **PicoClaw 对连接生命周期处理不足**  
   在网关封装层，如果关闭、重连、消息发送之间缺少同步保护，也可能触发该 panic。

建议维护者优先处理方向：

- 尝试根据 Issue 中的复现条件确认问题；
- 检查 DingTalk gateway 的连接关闭与重连逻辑；
- 检查是否存在 goroutine 在 channel 关闭后继续发送；
- 评估升级 `dingtalk-stream-sdk-go` 是否可解决问题；
- 如短期无法修复，建议加入 panic recover 或重连保护，避免主进程退出；
- 将该问题标记为 `bug`、`dingtalk`、`stability` 或 `regression`。

---

## 5. 功能请求与路线图信号

过去 24 小时内没有新的功能请求类 Issue，也没有相关 PR 显示新增功能正在推进。

今日唯一新增 Issue 是稳定性缺陷，不属于功能请求。  
不过，从问题本身可以反推出一个路线图信号：

### 网关稳定性与多平台连接可靠性需要加强

DingTalk Stream Mode 的 reconnect 问题表明，PicoClaw 在多渠道网关接入场景中，可能需要进一步强化以下能力：

- 长连接自动重连的健壮性；
- 上游 SDK 异常隔离；
- channel / goroutine 生命周期管理；
- 网关进程级容错；
- 针对 DingTalk、Feishu 等 IM 平台的集成测试。

如果该问题被确认，下一版本很可能需要包含 DingTalk gateway 的稳定性修复，尤其是与 SDK 重连、连接关闭、消息通道状态相关的变更。

相关链接：

- [Issue #3382](https://github.com/sipeed/picoclaw/issues/3382)
- [历史相关 Issue #973](https://github.com/sipeed/picoclaw/issues/973)

---

## 6. 用户反馈摘要

今日用户反馈主要集中在一个真实运行场景：**DingTalk Stream Mode 网关在 SDK 重连时发生 panic**。

从 Issue 描述可以提炼出以下痛点：

1. **问题在最新版本中仍可复现**  
   用户明确指出使用的是 `v0.3.1`，说明其期望该问题在当前版本中已被修复，但实际仍存在。

2. **稳定性影响较大**  
   `send on closed channel` 属于 Go 运行时 panic，通常会直接导致服务退出。对于机器人网关、企业 IM 接入、Agent 消息入口等场景，这是高影响问题。

3. **用户具备较强的问题定位能力**  
   报告中提供了版本号、commit、依赖版本、触发时间、通道类型等信息，说明该用户可能在较严肃的环境中使用 PicoClaw，并希望维护者能快速定位。

4. **历史问题可能形成信任损耗**  
   用户提到“same panic reported in #973 is still reproducible”，暗示类似问题此前已出现。如果长期未彻底解决，可能影响用户对 DingTalk 网关稳定性的信心。

当前尚无评论，因此无法进一步判断维护者响应态度或其他用户是否遇到相同问题。

---

## 7. 待处理积压

今日数据中没有提供长期未响应的 Issue 或 PR 列表，因此无法完整评估历史积压情况。

不过，今日新增的 [Issue #3382](https://github.com/sipeed/picoclaw/issues/3382) 明确引用了历史问题 [#973](https://github.com/sipeed/picoclaw/issues/973)，建议维护者重点回看该历史 Issue：

- 确认 #973 当时是否已有修复；
- 检查修复是否覆盖当前 `v0.3.1`；
- 判断 #3382 是否属于回归；
- 如果是同源问题，建议在 #3382 中关联历史上下文，并给出明确修复计划。

### 建议关注项

| 优先级 | 类型 | 链接 | 原因 |
|---|---|---|---|
| 高 | Bug / 崩溃 | [#3382](https://github.com/sipeed/picoclaw/issues/3382) | DingTalk Stream SDK 重连时 panic，影响网关稳定性 |
| 中 | 历史关联问题 | [#973](https://github.com/sipeed/picoclaw/issues/973) | 当前问题声称与历史 panic 相同，需确认是否回归或未完全修复 |

---

## 今日结论

PicoClaw 今日整体活跃度偏低，没有发布、没有 PR 更新，也没有可见代码合入。  
但新增的 [#3382](https://github.com/sipeed/picoclaw/issues/3382) 属于高优先级稳定性问题，涉及 DingTalk Stream Mode 在 SDK 重连时 panic，可能直接影响生产可用性。  
建议维护者优先确认复现路径，并判断该问题是 PicoClaw 网关层的 channel 生命周期管理缺陷，还是上游 `dingtalk-stream-sdk-go` 的 SDK 问题。  
如果问题确认，建议尽快提供修复 PR 或临时规避方案，并在下一版本中作为稳定性修复发布。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报｜2026-09-20

数据源：GitHub `qwibitai/nanoclaw` 过去 24 小时活动  
统计窗口：2026-09-19 至 2026-09-20

---

## 1. 今日速览

过去 24 小时内，NanoClaw 没有新的 Issue 活动，也没有新版本发布，项目讨论面相对安静。  
今日主要动态集中在 Pull Request：共有 2 个开放中的 PR 更新，均处于待评审 / 待合并状态，未出现合并或关闭事件。  
从内容来看，当前开发重点偏向 **Provider 集成能力** 与 **CLI 运维可观测性**，说明项目仍在围绕 agent 运行、技能扩展和本地诊断能力持续推进。  
整体活跃度评估为：**低到中等活跃**。虽然社区 Issue 侧暂无新增反馈，但代码贡献仍在进入评审流程。

---

## 2. 项目进展

今日没有已合并或已关闭的重要 PR，因此主分支功能层面尚未产生实际增量。

不过，以下 2 个开放 PR 代表了当前正在推进的方向：

### PR #3857：新增 Pi Agent Provider 与 `/add-pi` Skill

- 状态：Open
- 作者：Z-Mackintosh
- 标签：
  - `kind/feature`
  - `delivery/skill`
  - `area/agent-runner`
  - `area/providers`
  - `area/skills`
- 链接：<https://github.com/qwibitai/nanoclaw/pull/3857>
- 创建时间：2026-09-19
- 更新时间：2026-09-20

该 PR 计划增加一个新的 **Pi agent provider**，并通过 `/add-pi` skill 的形式提供集成入口。从标签判断，它同时涉及 provider 层、agent runner 以及 skills 目录，属于跨模块功能扩展。

潜在影响：

- 扩展 NanoClaw 可接入的 agent provider 范围
- 增强 skill-based delivery 模式
- 可能需要维护者重点审查 provider 抽象、运行时兼容性和技能文档完整性

当前进展判断：**功能已提交，尚未进入主线，项目能力仍处于待验证阶段。**

---

### PR #3856：新增 `ncl health` 本地只读健康检查命令

- 状态：Open
- 作者：prathish-ks
- 标签：
  - `area/ncl-cli`
- 链接：<https://github.com/qwibitai/nanoclaw/pull/3856>
- 创建时间：2026-09-19
- 更新时间：2026-09-19
- 关联 Issue：`Closes #2504`

该 PR 实现了新的 CLI 命令：

```bash
ncl health
```

根据摘要，该命令具备以下特点：

- 零依赖
- 本地只读检查
- 可直接读取 central DB 与 error log
- 即使主 host 进程不可用也能运行
- 与其他依赖 live host 的 `ncl` 命令不同

这项改动偏向运维与故障诊断，是提升项目稳定性和可维护性的基础设施能力。

潜在影响：

- 降低用户排障门槛
- 帮助定位 host process 不可用时的本地状态问题
- 对 CLI 可靠性和生产可观测性有正面作用

当前进展判断：**明确解决既有需求 #2504，但尚未合并，仍需评审。**

---

## 3. 社区热点

今日没有 Issue 更新，也没有可见的高评论或高反应讨论。两个开放 PR 均显示 👍 为 0，评论数数据未提供，因此无法判断存在明显社区争议或高热度讨论。

相对而言，今日最值得关注的热点是以下两个方向：

### Provider / Skill 扩展：Pi Agent Provider

- PR：<https://github.com/qwibitai/nanoclaw/pull/3857>
- 关注点：
  - 是否符合 NanoClaw 现有 provider 抽象
  - `/add-pi` skill 是否具备清晰的安装、配置和使用说明
  - 对 agent runner 的影响是否可控

背后诉求：项目可能正在强化多 provider 接入能力，使 NanoClaw 能支持更多 agent backend 或第三方运行环境。

---

### 本地健康检查能力：`ncl health`

- PR：<https://github.com/qwibitai/nanoclaw/pull/3856>
- 关联需求：`#2504`
- 关注点：
  - host 不可用时仍可诊断
  - central DB 只读访问安全性
  - error log 解析是否稳定
  - CLI 输出是否适合用户排障

背后诉求：用户或维护者需要一个不依赖主进程的基础诊断工具，用于快速确认本地 NanoClaw 状态。

---

## 4. Bug 与稳定性

今日没有新的 Bug、崩溃、回归类 Issue 报告。

从现有 PR 看，`ncl health` 更偏向稳定性与可运维性增强，而不是针对新报告 Bug 的直接修复。

### 稳定性相关 PR

#### PR #3856：`ncl health` 本地健康检查

- 链接：<https://github.com/qwibitai/nanoclaw/pull/3856>
- 严重程度：中等，属于诊断能力增强
- 是否已有 fix PR：是，PR 已提交但未合并
- 关联问题：`Closes #2504`

该 PR 不是传统意义上的 bugfix，但它解决了一个重要运维痛点：当主 host 进程不可用时，用户仍然需要检查本地数据库与错误日志状态。

---

## 5. 功能请求与路线图信号

今日没有新开的功能请求 Issue。但从开放 PR 可以观察到两个明确的路线图信号。

### 方向一：继续扩展 Agent Provider 生态

- 代表 PR：<https://github.com/qwibitai/nanoclaw/pull/3857>
- 功能：新增 Pi agent provider 与 `/add-pi` skill
- 可能进入下一版本：中等偏高，取决于评审通过情况

该 PR 同时触及 `providers`、`agent-runner` 和 `skills`，说明 NanoClaw 可能继续采用“provider + skill”的方式扩展外部集成能力。

---

### 方向二：增强 CLI 运维与本地诊断能力

- 代表 PR：<https://github.com/qwibitai/nanoclaw/pull/3856>
- 功能：新增 `ncl health`
- 可能进入下一版本：较高，因其明确关闭既有 Issue `#2504`

`ncl health` 的价值在于减少对 live host 的依赖，对于本地开发、生产排障和自动化健康检查都有潜在帮助。若评审顺利，该功能很可能成为下一版本中面向用户可见的重要 CLI 增强。

---

## 6. 用户反馈摘要

过去 24 小时内没有新的 Issue 评论或用户反馈数据，因此无法提炼新增的真实用户痛点或满意度变化。

基于当前 PR 摘要，可间接观察到两个潜在用户需求：

1. 用户需要更多 agent provider 接入能力  
   - 对应 PR：<https://github.com/qwibitai/nanoclaw/pull/3857>

2. 用户需要在主服务不可用时仍能执行本地诊断  
   - 对应 PR：<https://github.com/qwibitai/nanoclaw/pull/3856>

这些需求都指向 NanoClaw 在实际使用中的两个关键场景：**扩展集成** 与 **可靠运维**。

---

## 7. 待处理积压

当前数据集中没有长期未响应 Issue 或 PR 的完整列表，因此无法识别真正意义上的长期积压项。

但从今日更新看，以下开放 PR 值得维护者优先关注：

### PR #3856：`ncl health` CLI 健康检查

- 链接：<https://github.com/qwibitai/nanoclaw/pull/3856>
- 建议优先级：高
- 原因：
  - 明确关闭既有 Issue `#2504`
  - 属于低风险、本地只读、零依赖功能
  - 对故障诊断和用户自助排障帮助较大

---

### PR #3857：Pi Agent Provider 与 `/add-pi` Skill

- 链接：<https://github.com/qwibitai/nanoclaw/pull/3857>
- 建议优先级：中到高
- 原因：
  - 涉及 provider、agent runner、skills 多个核心区域
  - 功能面较广，需要及时评审避免集成漂移
  - 若合并，将扩展 NanoClaw 的 provider 生态

---

## 总体健康度评估

- Issue 活跃度：低
- PR 活跃度：中等
- 发布节奏：今日无发布
- 稳定性信号：无新增 Bug 报告，健康检查能力正在推进
- 路线图信号：Provider 扩展与 CLI 诊断能力是当前重点

综合判断：NanoClaw 今日整体处于 **安静但持续开发** 状态。虽然没有版本发布和 Issue 讨论，但两个开放 PR 都具有明确产品价值，尤其是 `ncl health` 对提升可运维性较为关键。建议维护者优先完成这两个 PR 的代码审查，以便尽快将 provider 扩展和本地诊断能力纳入主线。

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
日期：2026-09-20  
仓库：netease-youdao/LobsterAI

## 1. 今日速览

过去 24 小时，LobsterAI 项目整体活跃度较低但有明确的产品功能推进：Issues 无新增、无关闭、无活跃讨论，PR 侧仅有 1 条更新且已关闭。今日主要变化集中在商业化与订阅转化相关能力，包括一分钱试用活动、低余额购买优惠、优惠展示与埋点体系完善。  
从项目健康度看，今日没有新增 Bug 或回归报告，短期稳定性信号良好；但社区讨论活跃度偏低，缺少来自用户侧的真实反馈输入。整体来看，项目今天处于“低社区互动、单点功能收敛”的状态，重点推进订阅与付费链路体验。

---

## 2. 项目进展

### 已关闭 PR

#### PR #2720：feat(subscription): add one-cent trial and low-credit purchase offers  
- 状态：Closed  
- 作者：Mind-Hand  
- 创建时间：2026-09-20  
- 更新时间：2026-09-20  
- 评论数：未提供  
- 反应数：👍 0  
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2720  
- 涉及区域：`renderer`、`docs`、`main`、`cowork`

该 PR 是今日唯一的代码层面动态，主要围绕订阅转化、优惠活动展示和低余额场景下的购买引导展开。根据摘要，PR 推进了以下几个方向：

1. **新增 ¥0.01 标准版订阅试用活动**
   - 通过主进程 IPC 获取活动状态。
   - 根据隐私授权、账号类型、订阅状态、活动有效期等条件控制活动展示。
   - 客户端增加频控逻辑：每周一次、累计关闭三次后不再弹出。
   - 这表明项目正在强化面向普通用户的订阅转化路径，并避免过度打扰。

2. **完善试用活动购买入口**
   - 用户点击购买前会重新校验活动状态。
   - 支持跳转 Portal 结算页。
   - 补充中英文文案、样式、诊断日志和解锁点击埋点。
   - 说明该功能并非单纯 UI 展示，而是已接入较完整的支付跳转与可观测性链路。

3. **接入低余额购买优惠**
   - 从鉴权或额度响应中读取优惠信息。
   - 在侧边栏、会话额度不足提示、模型选择等多个关键场景展示首购或限时优惠。
   - 支持倒计时、优惠 token 透传、订阅与加量包分流。
   - 对已订阅用户进行过滤，避免重复或错误营销。
   - 这有助于在用户遇到额度不足时提供更直接的续费或充值路径。

4. **补充低余额相关埋点**
   - 覆盖曝光、关闭、订阅点击、充值点击等关键行为。
   - 有助于后续评估优惠活动对转化率、流失率和充值路径的影响。

综合来看，PR #2720 对项目的推进主要体现在商业化链路、用户增长实验、额度不足场景下的引导体验以及数据埋点完善。虽然该 PR 已关闭而非明确标记为 merged，仍需维护者或后续日报确认其代码是否已实际进入主分支。

---

## 3. 社区热点

今日没有 Issues 更新，也没有高评论、高反应的社区讨论。唯一值得关注的是 PR #2720：

- PR #2720：订阅试用与低余额优惠能力  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2720  
  热点类型：产品转化 / 订阅商业化 / 优惠策略  
  评论数：未提供  
  👍：0

从内容看，该 PR 背后的核心诉求可能包括：

- 降低新用户尝试标准版订阅的门槛。
- 在额度不足这一高转化时刻提供更明确的购买入口。
- 通过活动频控减少营销弹窗对用户体验的负面影响。
- 通过埋点验证不同优惠入口、不同使用场景对付费转化的实际贡献。
- 支持中英文文案，说明该能力可能面向更广泛的用户群体或多语言版本。

不过，由于今日没有用户评论和 Issue 反馈，暂时无法判断社区对该商业化功能的接受程度。

---

## 4. Bug 与稳定性

过去 24 小时没有新增 Bug、崩溃、回归或稳定性相关 Issue。

当前观察结果：

| 严重程度 | 问题 | 状态 | Fix PR |
|---|---|---|---|
| Critical | 无 | 无新增报告 | 无 |
| High | 无 | 无新增报告 | 无 |
| Medium | 无 | 无新增报告 | 无 |
| Low | 无 | 无新增报告 | 无 |

今日唯一 PR #2720 涉及订阅活动、额度响应、优惠 token、Portal 跳转、前端弹窗频控等多个用户路径，虽然不是 Bug 修复类 PR，但其改动区域较广，建议维护者重点关注以下潜在稳定性风险：

- IPC 活动状态获取失败时的降级表现。
- 活动状态与用户订阅状态不一致时的展示逻辑。
- 优惠 token 透传失败导致结算页价格或活动异常。
- 额度不足提示与模型选择场景中的优惠展示是否会重复打扰用户。
- 多语言文案缺失或 fallback 是否完整。
- 埋点失败是否会影响主流程。

相关 PR：  
https://github.com/netease-youdao/LobsterAI/pull/2720

---

## 5. 功能请求与路线图信号

今日没有新增 Issues，因此没有直接来自社区的功能请求。不过 PR #2720 释放出较明确的路线图信号：

### 可能进入后续版本的方向

1. **订阅试用与促销活动体系**
   - 依据：PR #2720 新增 ¥0.01 标准版试用活动。
   - 链接：https://github.com/netease-youdao/LobsterAI/pull/2720
   - 判断：项目可能会继续加强活动配置、试用转正、优惠策略和支付链路能力。

2. **低余额场景下的智能购买引导**
   - 依据：PR #2720 在侧边栏、会话额度不足提示、模型选择场景中展示首购或限时优惠。
   - 判断：额度管理和商业化引导可能成为后续桌面端体验优化重点。

3. **更细粒度的数据埋点与增长实验**
   - 依据：PR #2720 覆盖曝光、关闭、订阅点击、充值点击等行为。
   - 判断：后续可能会基于数据进一步调整活动展示频率、用户分层、促销入口和结算路径。

4. **订阅与加量包分流**
   - 依据：PR #2720 明确支持订阅/加量包分流。
   - 判断：LobsterAI 可能正在构建更复杂的付费产品矩阵，而不仅是单一订阅模型。

目前尚无用户提出的明确新功能需求，因此以上判断主要基于代码变更和产品功能方向推断。

---

## 6. 用户反馈摘要

今日 Issues 数量为 0，未观察到来自用户的新增反馈、抱怨、需求或使用场景描述。

可确认的信息：

- 没有用户报告新的使用障碍。
- 没有用户对订阅、额度、模型选择、支付或 Portal 跳转提出公开反馈。
- 没有可用于判断用户满意度或不满意点的评论数据。

结合今日 PR 内容，建议后续维护者重点收集以下反馈：

- 用户是否接受 ¥0.01 试用活动弹窗。
- 活动频控是否合理，是否仍存在打扰感。
- 额度不足时的购买入口是否清晰。
- 首购/限时优惠文案是否容易理解。
- 订阅和加量包分流是否符合用户预期。
- Portal 结算跳转是否顺畅。

相关 PR：  
https://github.com/netease-youdao/LobsterAI/pull/2720

---

## 7. 待处理积压

今日提供的数据中没有长期未响应的 Issue 或 PR 信息，因此无法识别具体积压项。

当前待关注事项主要来自今日关闭的 PR：

### 需要确认 PR #2720 的最终处理结果
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2720
- 当前状态：Closed
- 风险点：日报数据仅显示 Closed，未明确标识为 merged。
- 建议：
  - 若该 PR 已合并，应在后续发布说明中标注订阅试用和低余额优惠能力。
  - 若该 PR 被关闭但未合并，应确认关闭原因，例如需求调整、实现回滚、拆分 PR 或存在阻塞问题。
  - 若功能将继续推进，建议拆分出可追踪的后续任务，例如活动配置后台、AB 实验、优惠策略管理、支付链路监控等。

---

## 总结

LobsterAI 今日没有版本发布，也没有社区 Issue 活动，项目整体外部互动偏低。唯一的 PR 动态集中在订阅试用、低余额优惠、购买入口和埋点体系，显示项目正在加强商业化转化和付费体验建设。  
从健康度看，今日没有新增 Bug 或稳定性风险报告，是一个相对平稳的开发日；但 PR #2720 涉及支付、活动展示、额度状态和多端交互，后续应重点关注实际合并状态、线上表现和用户接受度。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报（2026-09-20）

## 1. 今日速览

过去 24 小时，Moltis 项目共有 **3 条 Issue 更新**，其中 **2 条新开/仍开放**、**1 条已关闭**，没有新的 Pull Request，也没有版本发布。整体活跃度处于 **低到中等水平**：社区反馈集中在 heartbeat 调度与工具权限控制等运行时行为一致性问题上，说明用户正在深入使用自动化与多 Agent 能力。今日没有代码合并，项目推进主要体现在问题暴露与需求澄清，而非功能落地。当前信号显示，Moltis 的配置文档、运行时实现与工具控制语义之间存在一些需要尽快对齐的稳定性问题。

---

## 3. 项目进展

今日 **无新增、合并或关闭的 Pull Request**。

从项目推进角度看，过去 24 小时没有直接的代码层面进展，暂未看到针对今日新增问题的 fix PR。不过，社区提交的问题较具体，包含代码路径、行为复现与配置语义差异，具备较高的可修复性。

相关 PR 列表：无。

---

## 4. 社区热点

### 4.1 `heartbeat.active_hours` 文档与实现不一致

- Issue：[#1278 heartbeat.active_hours is documented as enforced but never evaluated — is_within_active_hours has no callers](https://github.com/moltis-org/moltis/issues/1278)
- 状态：已关闭
- 作者：jbutler1980
- 评论数：1
- 反应数：0

该 Issue 是今日唯一有评论且已关闭的问题，也是今日相对最活跃的讨论点。用户指出文档中声明 `heartbeat.active_hours` 会限制 heartbeat 仅在活动时间窗口内运行，但实际代码中 `is_within_active_hours` 没有被调用，意味着配置项可能只是“看起来生效”。

背后的核心诉求是：**配置文档必须与运行时行为一致**。对于依赖 heartbeat 做自动巡检、定时 Agent 执行或后台任务的用户来说，active hours 这类时间窗口配置通常与成本控制、工作时间策略和安全边界有关。如果文档承诺存在但实现未生效，可能导致用户在非预期时间触发 Agent 行为。

该 Issue 已关闭，但从提供的数据无法判断是通过代码修复、文档修正，还是被判定为重复/非问题关闭。建议维护者在关闭说明中明确处理方式，并确认是否需要补充测试覆盖。

---

### 4.2 Heartbeat 注册路径无法传入 `tool_controls`

- Issue：[#1279 [heartbeat] cannot set tool_controls — the heartbeat registration hard-codes Default::default()](https://github.com/moltis-org/moltis/issues/1279)
- 状态：开放
- 作者：jbutler1980
- 评论数：0
- 反应数：0

该问题指出 `CronPayload::AgentTurn` 支持 `tool_controls`，cron 执行路径也会尊重该字段，但 heartbeat 注册时硬编码为 `Default::default()`，导致用户无法为 heartbeat 场景配置工具控制策略。

这反映出用户对 **后台自动执行任务的权限边界** 有明确需求。对于 AI Agent 系统来说，heartbeat 往往是无人值守执行路径，如果无法限制工具调用，可能带来安全、成本或行为不可控风险。该问题与 #1278 一样，集中在 heartbeat 模块，说明 heartbeat 当前可能是社区使用和审查的重点区域。

---

### 4.3 `spawn_agent` 对空工具列表的语义处理可能不符合预期

- Issue：[#1277 [bug] [Bug]: spawn_agent treats `active_tools: []` as an empty whitelist — sub-agent gets zero tools](https://github.com/moltis-org/moltis/issues/1277)
- 状态：开放
- 作者：letsrock85
- 评论数：0
- 反应数：0

该问题指出 `spawn_agent` 将 `active_tools: []` 解释为空白名单，导致子 Agent 获得零个工具。用户预期可能是空数组表示“不覆盖默认工具”或“继承父级/默认配置”，但当前实现将其视为显式禁用全部工具。

这类问题本质上是 **配置语义歧义**。在多 Agent 系统中，子 Agent 的工具继承和权限收缩是关键能力。如果空列表的含义不明确，可能导致子 Agent 无法完成任务，或者用户为了绕过限制而采用不安全配置。

---

## 5. Bug 与稳定性

### 高优先级：Heartbeat `active_hours` 可能未生效

- Issue：[#1278](https://github.com/moltis-org/moltis/issues/1278)
- 状态：已关闭
- 是否已有 fix PR：未发现相关 PR
- 严重程度：高

文档声明 heartbeat 只会在 `active_hours` 窗口内运行，但用户发现对应检查函数没有调用方。这可能导致用户认为后台任务被时间窗口约束，实际却在任意时间运行。

影响范围包括：

- 定时自动化任务
- 后台 Agent 调度
- 非工作时间调用成本控制
- 安全与合规场景下的执行窗口限制

虽然该 Issue 已关闭，但由于今日没有 PR 数据，无法确认是否已有代码修复。建议维护者确认关闭原因，并补充回归测试。

---

### 高优先级：Heartbeat 无法配置 `tool_controls`

- Issue：[#1279](https://github.com/moltis-org/moltis/issues/1279)
- 状态：开放
- 是否已有 fix PR：未发现相关 PR
- 严重程度：高

该问题涉及无人值守执行路径中的工具权限控制。`CronPayload::AgentTurn` 已支持 `tool_controls`，但 heartbeat 注册路径硬编码默认值，使用户无法在 heartbeat 场景中约束工具调用。

潜在风险包括：

- heartbeat Agent 调用不应开放的工具
- 无法限制高成本或高风险工具
- 自动任务执行环境与手动 AgentTurn 行为不一致
- 权限模型在不同入口之间不统一

建议优先级较高，尤其是在 Moltis 面向个人 AI 助手和自动化 Agent 场景时，工具控制是关键安全能力。

---

### 中高优先级：`spawn_agent` 中 `active_tools: []` 导致子 Agent 无工具可用

- Issue：[#1277](https://github.com/moltis-org/moltis/issues/1277)
- 状态：开放
- 是否已有 fix PR：未发现相关 PR
- 严重程度：中高

该问题影响多 Agent 编排中的子 Agent 能力。若用户配置 `active_tools: []` 后，系统将其解释为空白名单，子 Agent 会获得零个工具，可能导致任务执行失败。

关键问题在于：

- 空数组究竟表示“禁用所有工具”，还是“未指定工具限制”
- 子 Agent 是否应继承父 Agent 工具配置
- 是否需要区分 `null`、字段缺省、空数组三种语义

建议在配置文档和 schema 中明确语义，并在运行时对易误用场景给出警告。

---

## 6. 功能请求与路线图信号

今日没有明确标记为新功能请求的 Issue，但多个 Bug 实际上传递了路线图信号。

### 6.1 Heartbeat 需要完整支持执行策略配置

- 相关 Issue：
  - [#1278](https://github.com/moltis-org/moltis/issues/1278)
  - [#1279](https://github.com/moltis-org/moltis/issues/1279)

用户反馈表明，heartbeat 不只是简单的定时触发机制，而是应当支持与普通 AgentTurn 一致的执行控制能力，包括：

- 活动时间窗口
- 工具权限控制
- 模型选择
- Agent ID 指定
- 超时控制

这说明 heartbeat 可能需要从“辅助调度功能”升级为“可策略化的后台执行入口”。如果维护者计划强化个人 AI 助手的长期运行能力，这部分很可能进入下一版本修复范围。

---

### 6.2 多 Agent 工具继承语义需要明确化

- 相关 Issue：[#1277](https://github.com/moltis-org/moltis/issues/1277)

`spawn_agent` 的工具配置问题反映出多 Agent 编排仍需要更清晰的权限模型。未来可能需要支持：

- 子 Agent 默认继承父 Agent 工具
- 子 Agent 显式禁用全部工具
- 子 Agent 使用独立工具白名单
- 对空数组和缺省字段进行不同处理
- 配置验证或运行时提示

该方向对 Agent 平台类项目非常重要，因为工具权限是可控自治的基础。

---

## 7. 用户反馈摘要

今日用户反馈集中在 **配置项看起来可用，但实际运行行为不一致** 这一类问题上。

主要痛点包括：

1. **文档承诺与代码实现不一致**  
   用户在 #1278 中指出 `heartbeat.active_hours` 被文档描述为会限制 heartbeat 运行时间，但实现中似乎没有调用相关检查函数。这会削弱用户对配置文档的信任。

2. **自动化执行路径缺少权限控制入口**  
   #1279 反映 heartbeat 注册时无法设置 `tool_controls`。这对无人值守 Agent 场景尤其敏感，因为后台任务通常更需要显式限制工具能力。

3. **多 Agent 配置语义不直观**  
   #1277 说明 `active_tools: []` 被解释为空白名单后，子 Agent 没有任何工具可用。用户可能并不期望空数组代表“禁用所有工具”，而是希望表示“不指定限制”。

整体来看，用户不是在提出泛泛的体验改进，而是在深入检查 Moltis 的配置、调度和权限控制模型。这类反馈通常来自较深入使用者，对项目稳定性和生产可用性具有较高参考价值。

---

## 8. 待处理积压

基于当前提供的数据，仅覆盖过去 24 小时活动，无法判断长期未响应的历史 Issue 或 PR。不过，今日仍有 2 个开放 Issue 值得维护者优先关注：

1. [#1279 [heartbeat] cannot set tool_controls — the heartbeat registration hard-codes Default::default()](https://github.com/moltis-org/moltis/issues/1279)  
   建议优先确认是否属于权限控制缺陷，并补充 heartbeat 注册路径的配置透传能力。

2. [#1277 [bug] [Bug]: spawn_agent treats `active_tools: []` as an empty whitelist — sub-agent gets zero tools](https://github.com/moltis-org/moltis/issues/1277)  
   建议明确 `active_tools` 的空数组、缺省和继承语义，并同步更新文档与测试。

此外，[#1278](https://github.com/moltis-org/moltis/issues/1278) 虽已关闭，但由于没有关联 PR 信息，建议维护者确保关闭原因透明，并在必要时补充代码修复或文档修正说明。

---

## 项目健康度评估

今日 Moltis 的社区输入质量较高，但代码推进较弱。没有 PR 和 Release，说明短期内项目处于问题收集或维护间隙状态。当前暴露的问题集中在 heartbeat、cron、tool controls 和 spawn_agent 等关键运行路径，均与自动化 Agent 的可靠性和权限边界相关。

综合判断：

- **活跃度**：中低
- **社区反馈质量**：较高
- **代码推进速度**：低
- **稳定性风险**：中高，集中在 heartbeat 与工具权限控制
- **维护优先级建议**：优先修复 heartbeat 策略执行一致性，其次澄清多 Agent 工具继承语义

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报（2026-09-20）

> 数据来源显示仓库路径多为 `agentscope-ai/QwenPaw`，以下日报按用户提供的 CoPaw/GitHub 活动数据整理，并保留原始 Issue/PR 链接。

---

## 1. 今日速览

过去 24 小时项目活跃度较高：新增/活跃 Issues 9 条、PR 更新 7 条，并发布了 `v2.2.2-beta.3` Beta 版本。  
今日没有 Issue 关闭，也没有 PR 合并或关闭，说明维护工作主要集中在问题收集、回归修复准备和下一轮 Beta 迭代上。  
问题类型集中在 Console 前端稳定性、Provider/多模态兼容、插件治理 Hook、MCP 认证、运行时 reload 一致性等核心体验与扩展能力上。  
整体来看，项目处于 **Beta 快速修复周期**：社区反馈密集，修复 PR 响应较快，但仍有多个影响实际使用的稳定性问题等待合并验证。

---

## 2. 版本发布

### v2.2.2-beta.3

- Release: https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.2-beta.3
- 版本类型：Beta
- 关联发布验证 Issue：[#7891](https://github.com/agentscope-ai/QwenPaw/issues/7891)

#### 已知更新内容

根据 Release 摘要，`v2.2.2-beta.3` 至少包含以下变更：

1. **Console 修复：恢复 assistant response actions**
   - 相关 PR：[#7851](https://github.com/agentscope-ai/QwenPaw/pull/7851)
   - 影响范围：前端 Console、聊天响应操作区
   - 意义：修复重构后可能丢失的 assistant 响应操作能力，改善交互完整性。

2. **E2E 测试修复：重新锚定 Console selector**
   - 摘要提到：修复因 `#7502` redesign 导致的 Console selector 失效，并增强 session-list 断言。
   - 影响范围：端到端测试稳定性、Console UI 回归检测
   - 意义：有助于提升后续 Beta 版本在 UI 层面的回归防护能力。

#### 破坏性变更

当前 Release 摘要未显示明确的 Breaking Changes。  
不过从今日新增 Issue 看，`2.2.1` 到 `2.2.2-beta.3` 之间仍可能存在以下兼容性风险：

- 前端 Console 在特定浏览器/DOM 注入环境下仍可能触发渲染错误。
- Provider 文件、多模态内容兼容逻辑仍处于修复中。
- 插件 Hook 与 reload 相关行为可能存在版本间差异。

#### 迁移与验证建议

建议 Beta 用户重点验证以下场景：

- Console 聊天页是否能正常渲染与恢复。
- 历史会话、session list、assistant response actions 是否完整可用。
- 使用 DeepSeek/OpenCode/Kimi 等第三方 Provider 时，文件、音频、工具调用是否稳定。
- 插件系统在配置 reload 后，runtime hook 与 middleware 行为是否一致。
- 根据 [#7891](https://github.com/agentscope-ai/QwenPaw/issues/7891) 的发布验证清单完成安装验证。

---

## 3. 项目进展

今日 **没有 PR 被合并或关闭**，因此主分支实际推进有限。但有 7 个待合并 PR 表明维护者和社区正在集中处理回归与 Beta 质量问题。

### 今日待合并重点 PR

1. **修复 memory backend rollback 后 runtime 恢复问题**
   - PR: [#7893 fix(memory): restore runtime after backend rollback](https://github.com/agentscope-ai/QwenPaw/pull/7893)
   - 方向：运行时稳定性、插件 memory backend reload
   - 价值：防止 plugin memory-backend reload 失败并回滚配置后，运行中的 agent 未被恢复，导致服务状态异常。

2. **版本号推进至 2.2.2b4**
   - PR: [#7892 chore: bump the version to 2.2.2b4](https://github.com/agentscope-ai/QwenPaw/pull/7892)
   - 方向：发布流程
   - 价值：显示项目已经在准备 `v2.2.2-beta.4`，说明 `beta.3` 后续仍会快速迭代。

3. **修复 Console DOM mutation 渲染错误后的恢复能力**
   - PR: [#7889 fix(console): recover from transient DOM-mutation render errors](https://github.com/agentscope-ai/QwenPaw/pull/7889)
   - 关联 Issue: [#7888](https://github.com/agentscope-ai/QwenPaw/issues/7888)
   - 方向：前端稳定性
   - 价值：防止聊天页因 DOM mutation 错误进入永久 “Something went wrong” 状态。

4. **音频输入 Provider 拒绝后的 fallback 修复**
   - PR: [#7887](https://github.com/agentscope-ai/QwenPaw/pull/7887), [#7886](https://github.com/agentscope-ai/QwenPaw/pull/7886)
   - 方向：多模态兼容、Provider fallback
   - 价值：当模型拒绝 `input_audio` 内容时，系统可以识别错误并触发重试与能力学习路径。

5. **文件 payload 被 Provider 拒绝后的重试机制**
   - PR: [#7885 fix(agents): retry after unsupported file payload errors](https://github.com/agentscope-ai/QwenPaw/pull/7885)
   - 关联 Issue: [#7883](https://github.com/agentscope-ai/QwenPaw/issues/7883)
   - 方向：文件/媒体兼容
   - 价值：针对 DeepSeek 拒绝 OpenAI-style nested file part 的问题，增加 request-scoped fallback。

6. **插件工具调用前策略 Hook**
   - PR: [#7880 feat(plugins): add escalation-only tool policy hooks](https://github.com/agentscope-ai/QwenPaw/pull/7880)
   - 关联 Issue: [#7878](https://github.com/agentscope-ai/QwenPaw/issues/7878)
   - 方向：插件 API、治理管线、工具调用安全策略
   - 价值：允许外部分类器或组织级策略在工具调用前参与决策，增强企业级治理能力。

---

## 4. 社区热点

### 1. 插件可见的 pre-tool-call policy hook

- Issue: [#7878 Feature: Expose a plugin-visible pre-tool-call policy hook](https://github.com/agentscope-ai/QwenPaw/issues/7878)
- 评论数：3
- 关联 PR: [#7880](https://github.com/agentscope-ai/QwenPaw/pull/7880)

这是今日评论最多的问题之一。用户希望在静态治理判断之后、工具真正调用之前，提供一个插件可见的策略 Hook。  
背后诉求是：现有治理管线无法充分满足组织级审计、动态策略、外部分类器、安全合规和 tool-call escalation 的需求。  
由于已有实现 PR 提交，并标记为 ready for maintainer review，该需求很可能进入近期 Beta 或后续小版本。

---

### 2. Console 聊天页被 “Something went wrong” 卡死

- Issue: [#7888](https://github.com/agentscope-ai/QwenPaw/issues/7888)
- PR: [#7889](https://github.com/agentscope-ai/QwenPaw/pull/7889)
- 评论数：2

用户报告在 Microsoft Edge/Windows 10 环境中，进入 `/#/chat` 或具体会话页时，React `commitPlacement` 阶段出现 `insertBefore NotFoundError`，导致聊天页长期停留在错误 fallback。  
问题描述指出浏览器 UI 层可能向 React 管理的 text node 外包裹了 `<font>`，触发 DOM mutation 冲突。  
这类问题对用户影响较高，因为它直接阻断核心聊天路径。好消息是已有修复 PR，说明维护响应较快。

---

### 3. 聊天记录历史太短

- Issue: [#7884](https://github.com/agentscope-ai/QwenPaw/issues/7884)
- 评论数：2

用户以较强烈语气反馈聊天历史长度过短，无法回看已讨论内容，直接影响持续对话体验。  
该问题代表了 AI 助手产品中的典型长期记忆与会话可追溯需求。虽然当前没有对应 PR，但这是明显的产品体验信号，可能需要从前端分页、后端消息存储、上下文裁剪策略、会话归档能力等方向综合处理。

---

### 4. Kimi-code ACP runner 工具调用安全边界不一致

- Issue: [#7881](https://github.com/agentscope-ai/QwenPaw/issues/7881)
- 评论数：2

用户指出 Kimi-code ACP runner 在 Edit、Write、Bash 等工具路径上的 boundary 与 destructive-command 检查不一致：Edit 被拦截，但 Write(new file) 与 Bash 存在盲区。  
这属于安全治理和工具调用执行边界问题，优先级应高于普通体验类问题。  
目前未看到对应 fix PR，需要维护者尽快确认影响范围。

---

## 5. Bug 与稳定性

以下按影响严重程度排序。

### P0 / 高严重度：安全边界与破坏性命令检查不一致

- Issue: [#7881 kimi-code ACP runner bypasses boundary & destructive-command checks unevenly](https://github.com/agentscope-ai/QwenPaw/issues/7881)
- 状态：Open
- 是否已有 fix PR：未发现明确关联 PR
- 影响：
  - 工具调用可能绕过路径边界检查。
  - Bash 与 Write(new file) 行为可能不受完整治理。
  - 涉及 destructive-command 安全控制，应优先排查。
- 建议：
  - 尽快补齐 Kimi toolCall 参数支持与路径解析。
  - 对 Edit/Write/Bash 做一致的治理入口封装。
  - 增加回归测试覆盖不同工具类型。

---

### P0 / 高严重度：零停机 reload 丢失 runtime hook

- Issue: [#7890 零停机 reload 丢失插件注册的 runtime hook](https://github.com/agentscope-ai/QwenPaw/issues/7890)
- 状态：Open
- 是否已有 fix PR：未发现明确关联 PR；但 [#7893](https://github.com/agentscope-ai/QwenPaw/pull/7893) 处理 memory backend rollback 后 runtime 恢复，可能与 reload 稳定性相关。
- 影响：
  - 插件通过 `register_runtime_hook` 注册的 Hook 在 zero-downtime reload 后静默丢失。
  - middleware 仍保留，造成 reload 与完整重启语义不一致。
  - 可能导致安全、审计、调度类插件在 reload 后失效而用户不知情。
- 建议：
  - 将 runtime hook 纳入 reload 后状态重建流程。
  - 对 middleware 与 runtime hook 的生命周期语义进行统一。
  - 增加 reload 等价性测试。

---

### P1 / 高影响：Console 聊天页渲染错误后无法恢复

- Issue: [#7888](https://github.com/agentscope-ai/QwenPaw/issues/7888)
- Fix PR: [#7889](https://github.com/agentscope-ai/QwenPaw/pull/7889)
- 状态：Issue Open，PR Open
- 影响：
  - 用户无法进入聊天页。
  - 错误 fallback 无法自动恢复，只能通过导航 reset。
- 当前进展：
  - PR 已提出通过恢复 transient DOM-mutation render errors，避免 ChunkErrorBoundary 永久卡死。

---

### P1 / 高影响：DeepSeek 拒绝 tool-returned PDF 文件格式

- Issue: [#7883](https://github.com/agentscope-ai/QwenPaw/issues/7883)
- Fix PR: [#7885](https://github.com/agentscope-ai/QwenPaw/pull/7885)
- 状态：Issue Open，PR Open
- 影响：
  - 工具返回 PDF 后，被序列化为 OpenAI-style nested file part。
  - DeepSeek 返回 400：`file must have a file_id or file_data`。
  - 此前相关问题曾关闭，但用户在 2.2.1 仍可复现，说明修复不完整。
- 当前进展：
  - PR #7885 将该错误识别为 request-scoped fallback signal，重试时去除 media，避免错误地将模型全局标记为 text-only。

---

### P1 / 高影响：OpenCode “免费”模型 API 调用 403

- Issue: [#7882](https://github.com/agentscope-ai/QwenPaw/issues/7882)
- 状态：Open
- 是否已有 fix PR：未发现
- 影响：
  - UI 标记为“免费”的模型实际通过 API 调用失败。
  - 返回 `403 FreeTierError`，且提示仅限 OpenCode 客户端。
  - 用户可能被误导选择不可用模型。
- 建议：
  - 调整模型列表元数据，区分“平台免费展示”与“API 可调用”。
  - 在 UI 上增加不可用原因说明。
  - Provider 初始化时做 capability probing 或错误映射。

---

### P2 / 中高影响：MCP 静态 Bearer Key 服务器被错误引导到 OAuth

- Issue: [#7879](https://github.com/agentscope-ai/QwenPaw/issues/7879)
- 状态：Open
- 是否已有 fix PR：未发现
- 影响：
  - 用户接入企查查 QCC MCP server 时，点击“授权”触发 OAuth 握手失败。
  - QCC 官方认证方式是静态 Bearer API Key，不需要 OAuth。
- 建议：
  - MCP 配置中区分 OAuth、Bearer Token、API Key 等认证模式。
  - 对静态 Bearer Key 类型服务避免触发 OAuth discovery/handshake。
  - 增加 MCP server auth type 显式配置。

---

### P2 / 中影响：音频内容被模型拒绝后 fallback 不完整

- PR: [#7886](https://github.com/agentscope-ai/QwenPaw/pull/7886), [#7887](https://github.com/agentscope-ai/QwenPaw/pull/7887)
- 状态：PR Open
- 关联 Issue：未在数据中明确给出
- 影响：
  - 当模型拒绝 `input_audio` unknown-variant 时，audio fallback classifier 未识别该错误。
  - 带历史音频的会话无法从 Provider 拒绝中恢复。
- 当前进展：
  - 两个 PR 均尝试扩展错误识别与 fallback 路径，可能存在重复或竞争实现，维护者需要合并设计。

---

### P2 / 中影响：memory backend reload 失败回滚后 agent runtime 未恢复

- PR: [#7893](https://github.com/agentscope-ai/QwenPaw/pull/7893)
- 状态：PR Open
- 影响：
  - 后台 reload 失败并回滚持久化配置后，运行中 agent 状态可能未恢复。
  - 可能导致 backend selection lease 释放后运行时处于不一致状态。
- 当前进展：
  - 已有修复 PR，建议优先 Review。

---

## 6. 功能请求与路线图信号

### 1. 插件治理 Hook / pre-tool-call policy hook

- Issue: [#7878](https://github.com/agentscope-ai/QwenPaw/issues/7878)
- PR: [#7880](https://github.com/agentscope-ai/QwenPaw/pull/7880)
- 可能进入版本：较高，已有 PR
- 路线图信号：
  - 项目正在从基础插件机制走向更强的治理/合规模型。
  - 组织级策略、外部 classifier、tool-call escalation 将成为插件系统的重要方向。

---

### 2. 聊天记录与历史可追溯能力

- Issue: [#7884](https://github.com/agentscope-ai/QwenPaw/issues/7884)
- 可能进入版本：中等，当前无 PR
- 路线图信号：
  - 用户对“长期会话历史”和“回看上下文”的需求明确。
  - 后续可能需要优化：
    - 消息分页加载
    - 本地/服务端历史保存策略
    - 会话搜索
    - 历史消息保留上限配置
    - 上下文窗口与 UI 历史展示解耦

---

### 3. MCP 多认证模式支持

- Issue: [#7879](https://github.com/agentscope-ai/QwenPaw/issues/7879)
- 可能进入版本：中等
- 路线图信号：
  - MCP 生态中的服务并不都使用 OAuth。
  - 企业数据类 MCP server 更常见的是 API Key / Bearer Token。
  - CoPaw/QwenPaw 如果要扩展企业工具接入，需要完善认证模式抽象。

---

### 4. Provider 能力识别与动态 fallback

- Issues/PRs:
  - [#7883](https://github.com/agentscope-ai/QwenPaw/issues/7883)
  - [#7885](https://github.com/agentscope-ai/QwenPaw/pull/7885)
  - [#7886](https://github.com/agentscope-ai/QwenPaw/pull/7886)
  - [#7887](https://github.com/agentscope-ai/QwenPaw/pull/7887)
- 可能进入版本：较高，已有多个 PR
- 路线图信号：
  - 不同 Provider 对 OpenAI-style file/audio parts 的支持差异很大。
  - 项目正在补强按请求 fallback、能力学习、错误分类器等机制。
  - 这将提升跨模型、跨 Provider 的兼容性。

---

## 7. 用户反馈摘要

### 正向信号

- 社区反馈质量较高，多个 Issue 提供了环境、复现路径、日志、错误信息和版本号。
- 用户愿意验证 Beta/2.2.1 源码行为，并补充细节，例如 [#7881](https://github.com/agentscope-ai/QwenPaw/issues/7881)、[#7883](https://github.com/agentscope-ai/QwenPaw/issues/7883)。
- 修复响应速度较快，部分问题当天已有 PR，例如 [#7888](https://github.com/agentscope-ai/QwenPaw/issues/7888) 对应 [#7889](https://github.com/agentscope-ai/QwenPaw/pull/7889)。

### 主要痛点

1. **核心聊天体验仍有阻断性问题**
   - 代表 Issue: [#7888](https://github.com/agentscope-ai/QwenPaw/issues/7888), [#7884](https://github.com/agentscope-ai/QwenPaw/issues/7884)
   - 用户痛点：
     - 聊天页打不开或卡在错误页。
     - 聊天历史太短，无法回看讨论内容。
   - 影响：直接影响 AI 助手的主路径使用体验。

2. **第三方 Provider 兼容性仍不稳定**
   - 代表 Issue/PR:
     - [#7882](https://github.com/agentscope-ai/QwenPaw/issues/7882)
     - [#7883](https://github.com/agentscope-ai/QwenPaw/issues/7883)
     - [#7885](https://github.com/agentscope-ai/QwenPaw/pull/7885)
   - 用户痛点：
     - UI 显示可用/免费，但实际 API 调用失败。
     - 文件格式、音频格式在不同 Provider 上处理不一致。
   - 影响：降低多模型平台的可信度。

3. **插件和治理能力需要更可控、更一致**
   - 代表 Issue/PR:
     - [#7878](https://github.com/agentscope-ai/QwenPaw/issues/7878)
     - [#7880](https://github.com/agentscope-ai/QwenPaw/pull/7880)
     - [#7890](https://github.com/agentscope-ai/QwenPaw/issues/7890)
   - 用户痛点：
     - 缺少工具调用前的组织策略接入点。
     - reload 后插件 Hook 静默失效，不易发现。
   - 影响：对企业治理、安全审计和插件生态构成阻碍。

4. **MCP 接入体验需要覆盖真实企业认证模式**
   - 代表 Issue: [#7879](https://github.com/agentscope-ai/QwenPaw/issues/7879)
   - 用户痛点：
     - 静态 Bearer Key 服务被错误地走 OAuth。
     - 接入多个 MCP 服务时配置成本高，失败原因不直观。
   - 影响：限制外部数据源和企业工具接入。

---

## 8. 待处理积压

从当前 24 小时数据看，没有明显“长期未响应”的 Issue 或 PR；所有列出的 Issue/PR 都是 2026-09-19 至 2026-09-20 新近创建或更新。  
但以下问题虽然新开，却建议维护者优先关注，避免转化为高风险积压。

### 高优先级待处理

1. **Kimi-code ACP runner 安全边界问题**
   - Issue: [#7881](https://github.com/agentscope-ai/QwenPaw/issues/7881)
   - 原因：涉及 boundary 与 destructive-command 检查不一致，安全风险高。
   - 建议：尽快指派负责人并给出修复计划。

2. **zero-downtime reload 丢失 runtime hook**
   - Issue: [#7890](https://github.com/agentscope-ai/QwenPaw/issues/7890)
   - 原因：插件 Hook 静默失效可能影响安全、审计、调度等不可见能力。
   - 建议：确认是否与 [#7893](https://github.com/agentscope-ai/QwenPaw/pull/7893) 同类问题，统一修复 reload 生命周期。

3. **OpenCode 免费模型不可 API 调用**
   - Issue: [#7882](https://github.com/agentscope-ai/QwenPaw/issues/7882)
   - 原因：UI 标识与实际能力不一致，容易造成用户误解。
   - 建议：先通过模型元数据或 UI 提示进行止血。

4. **MCP 静态 Bearer Key 认证支持**
   - Issue: [#7879](https://github.com/agentscope-ai/QwenPaw/issues/7879)
   - 原因：影响企业数据服务接入，且需求明确。
   - 建议：将认证模式显式化，避免默认 OAuth。

### 待 Review / 待合并 PR

- [#7893 fix(memory): restore runtime after backend rollback](https://github.com/agentscope-ai/QwenPaw/pull/7893)
- [#7892 chore: bump the version to 2.2.2b4](https://github.com/agentscope-ai/QwenPaw/pull/7892)
- [#7889 fix(console): recover from transient DOM-mutation render errors](https://github.com/agentscope-ai/QwenPaw/pull/7889)
- [#7887 fix(agents): handle unknown audio part rejections](https://github.com/agentscope-ai/QwenPaw/pull/7887)
- [#7886 fix(agents): handle unknown input_audio rejections](https://github.com/agentscope-ai/QwenPaw/pull/7886)
- [#7885 fix(agents): retry after unsupported file payload errors](https://github.com/agentscope-ai/QwenPaw/pull/7885)
- [#7880 feat(plugins): add escalation-only tool policy hooks](https://github.com/agentscope-ai/QwenPaw/pull/7880)

---

## 项目健康度评估

- **活跃度：高**  
  24 小时内 9 个 Issue、7 个 PR、1 个 Beta Release，说明社区和维护端都很活跃。

- **响应速度：较好**  
  多个用户报告在同日出现对应修复 PR，尤其是 Console 渲染、文件 fallback、多模态错误处理等。

- **稳定性：中等偏风险**  
  当前问题集中在核心聊天页、Provider 兼容、安全治理、reload 生命周期等关键路径，Beta 阶段仍需加强回归验证。

- **路线清晰度：较强**  
  从 PR 分布看，短期重点是 `v2.2.2-beta.4` 前的稳定性修复；中期方向包括插件治理 Hook、Provider 动态 fallback、MCP 认证能力和聊天历史体验优化。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报（2026-09-20）

## 1. 今日速览

过去 24 小时 ZeroClaw 活跃度较高：Issues 更新 13 条，其中 10 条仍处于新开或活跃状态，PR 更新 8 条，其中 7 条仍待合并。今日工作重心高度集中在 **WhatsApp Web Channel 能力完善**，包括原生投票、群组创建、图片/PDF 预览、消息提及、入站图片处理等。与此同时，也出现了一个高优先级安全问题：无人值守 Agent Turn 在缺少 `ApprovalManager` 时可能绕过风险审批。整体来看，项目功能推进积极，但 WhatsApp Web 相关变更堆叠较多，短期内需要维护者重点评审以避免通道层回归。

---

## 2. 项目进展

### 已关闭 / 已处理 PR

#### PR #10978 — docs(ci): annotate bespoke CI gates with motivating incidents  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10978  
状态：CLOSED  
作者：kizito917  

该 PR 为项目中的定制 CI Gate 补充了背景说明，包括：

- Repository Structure
- Zerocode RPC Boundary
- Nix Hash Drift
- Installer Drift

它记录了每个 CI 规则保护的项目不变量、来源 PR 以及未来可移除条件。虽然这是文档类改动，但对维护者理解 CI 约束、减少“为什么这个检查存在”的沟通成本有明显帮助。

### 今日整体推进情况

今日实际合并/关闭的代码功能推进有限，主要成果仍处于待评审 PR 阶段。最重要的进展是 WhatsApp Web 通道相关实现已经形成一组连续 PR：

- 原生投票发送：#10984  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10984
- 投票结果回传为 `[choice]` 消息：#10988  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10988
- Dashboard 启动 Turn 时复用运行中的 channel 实例：#10986  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10986
- WhatsApp 群组创建与邀请：#10979  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10979
- 图片缩略图与尺寸修复：#10982  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10982
- PDF 首页预览：#10980  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10980

这些 PR 若顺利合并，将显著增强 ZeroClaw 作为个人 AI 助手在 WhatsApp 场景中的可用性，尤其是群聊、投票、媒体消息和工具调用的闭环能力。

---

## 3. 社区热点

### Issue #10987 — WhatsApp Web poll votes should surface as `[choice]` messages  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10987  
状态：OPEN  
评论数：3  

这是今日评论最多的 Issue。用户希望 WhatsApp Web 的投票结果能够像 Signal 一样，以 `[choice]<option>` 入站消息形式返回给 Agent。

背后诉求非常明确：  
当前 Agent 可以发起投票，但无法接收用户在投票卡片上的选择结果，导致投票工具无法形成闭环。对于 AI 助手而言，这意味着“询问用户偏好”之后不能自动继续执行后续任务，例如安排会议、选择餐厅、确认计划等。

相关 PR：

- PR #10988 — feat(channels/whatsapp-web): read poll votes back as `[choice]` messages  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10988

### Issue #10977 — WhatsApp Web group creation and user invitation  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10977  
状态：OPEN  
评论数：2  

该 Issue 要求为 WhatsApp Web channel 实现 `Channel::create_room` 和 `Channel::invite_user`，让现有 `channel_room` 工具能够创建 WhatsApp 群组并添加成员。

这反映出用户正在将 ZeroClaw 用于更复杂的协作型场景，而不仅是单人对话。例如：

- 自动创建项目群
- 为家庭、团队或客户创建临时讨论空间
- Agent 作为协调者邀请相关人员进入会话

相关 PR：

- PR #10979 — feat(channels/whatsapp-web): implement create_room and invite_user  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10979

### Issue #10983 — Native polls for WhatsApp Web  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10983  
状态：OPEN  
评论数：1  

用户希望 `poll` 工具不再只发送文本编号选项，而是通过 Channel trait 使用原生投票能力。该需求与 #10987 共同构成了完整的 WhatsApp 投票体验：

1. Agent 发出原生投票；
2. 用户在 WhatsApp 投票卡片中选择；
3. Agent 收到 `[choice]` 消息并继续执行。

相关 PR：

- PR #10984 — feat(channels/whatsapp-web): post native polls from the poll tool  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10984

---

## 4. Bug 与稳定性

按严重程度排序如下。

### S0 — 安全风险：无人值守 Agent Turn 缺少 ApprovalManager

#### Issue #10968 — Unattended agent turns run with no ApprovalManager  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10968  
状态：OPEN  
严重程度：S0 - data loss / security risk  
是否已有 Fix PR：未看到对应 PR  

问题描述：  
`cron`、`heartbeat`、`headless SOP`、`spawn_subagent` 等无人值守执行路径在运行时没有构建 `ApprovalManager`。当前 `agent::run` 仅在 `interactive == true` 时创建审批管理器，这可能导致风险策略中的工具审批机制静默失效。

影响分析：  
这是今日最需要维护者关注的问题。它触及安全边界：如果无人值守任务可以在没有审批的情况下执行高风险工具，那么可能带来数据泄露、误操作或越权执行风险。

建议优先级：最高。应尽快明确：

- 是否确认为安全漏洞；
- 是否需要临时禁用部分无人值守高风险工具；
- 是否为所有 turn 类型统一注入 ApprovalManager；
- 是否需要补充回归测试。

---

### S2 — Dashboard 启动的 Turn 无法访问 session-bound channel

#### Issue #10985 — Dashboard-started turns get freshly built channel instances  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10985  
状态：OPEN  
严重程度：S2 - degraded behavior  
是否已有 Fix PR：有  

问题描述：  
从 Web Dashboard 启动的 turn 会获得新构建的 channel 实例，而不是运行中的 session-bound channel。对于 WhatsApp Web 这类需要已配对会话的通道，工具无法访问实际会话状态，导致 `poll`、`reaction`、`channel_room`、`ask_user`、`escalate` 等依赖通道的工具无法正常工作。

相关 PR：

- PR #10986 — fix(channels): give channel-addressed tools the running channel instances  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10986

影响分析：  
该问题会直接影响 Dashboard 场景下的工具可用性，也是 WhatsApp Web 多项新能力能否实际工作的前置条件之一。建议优先评审 #10986。

---

### S2 — WhatsApp Web 入站图片未下载，视觉模型不可用

#### Issue #10975 — inbound images not downloaded; agent receives literal `[Image]` text  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10975  
状态：OPEN  
严重程度：S2 - major feature broken  
是否已有 Fix PR：未看到对应 PR  

相关关闭 Issue：

- Issue #10972  
  https://github.com/zeroclaw-labs/zeroclaw/issues/10972  
  状态：CLOSED  

问题描述：  
用户向 Bot 发送图片时，Agent 收到的是文本 `[Image]`，而不是实际图片内容或附件。因此，即使底层模型支持视觉能力，也无法对图片进行分析。

影响分析：  
这对个人 AI 助手非常关键。用户常见场景包括：

- 发送截图让 Agent 解释错误；
- 发送票据、菜单、文档照片让 Agent 提取信息；
- 发送图片让 Agent 做视觉问答。

目前该能力在 WhatsApp Web 通道中不可用，建议维护者确认 #10972 是否因重复而关闭，并为 #10975 跟进修复 PR。

---

### S2 — WhatsApp Web 出站图片缺少缩略图和尺寸

#### Issue #10981 — outgoing WhatsApp images carry no jpegThumbnail or dimensions  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10981  
状态：OPEN  
严重程度：S2 - degraded behavior  
是否已有 Fix PR：有  

问题描述：  
WhatsApp Web channel 发送的 `ImageMessage` 缺少 `jpegThumbnail`、`width` 和 `height`，导致手机端显示为空白卡片，用户需要点击后才能看到图片。

相关 PR：

- PR #10982 — fix(channels/whatsapp-web): attach inline previews to outgoing images  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10982

影响分析：  
这是体验层面的重要问题，尤其影响 Agent 发送生成图片、图表、截图、识别结果等场景。PR #10982 已给出明确修复路径，应尽快评审。

---

### S3 — WhatsApp Web mentions 双向损坏

#### Issue #10976 — mentions broken both ways  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10976  
状态：OPEN  
严重程度：S3 - degraded behavior  
是否已有 Fix PR：未看到对应 PR  

相关关闭 Issue：

- Issue #10973  
  https://github.com/zeroclaw-labs/zeroclaw/issues/10973  
  状态：CLOSED  

问题描述：  
WhatsApp Web channel 中 mentions 存在双向问题：

- 入站：提及被解析为裸 JID 数字，缺少名称解析；
- 出站：提及只是普通文本，没有设置 `mentionedJid`。

影响分析：  
这会影响群聊中 Agent 对上下文和目标用户的判断。例如用户说“@bot 帮我问一下 @Alice”，如果 mentions 无法正确解析，Agent 很难知道被提及对象是谁。对于群组自动化和协作型 AI 助手，这是后续必须完善的基础能力。

---

## 5. 功能请求与路线图信号

### WhatsApp Web 原生投票能力正在形成完整闭环

相关 Issue / PR：

- Issue #10983 — Native polls  
  https://github.com/zeroclaw-labs/zeroclaw/issues/10983
- PR #10984 — post native polls from the poll tool  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10984
- Issue #10987 — poll votes as `[choice]` messages  
  https://github.com/zeroclaw-labs/zeroclaw/issues/10987
- PR #10988 — read poll votes back as `[choice]` messages  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10988

路线图信号：  
这是今日最明确的短期功能方向。由于已有成对 PR 实现“发送投票”和“读取投票结果”，该能力很可能进入下一轮版本候选。它将显著增强 Agent 在即时通讯场景中的交互能力。

---

### WhatsApp Web 群组管理能力扩展

相关 Issue / PR：

- Issue #10977 — implement create_room and invite_user  
  https://github.com/zeroclaw-labs/zeroclaw/issues/10977
- PR #10979 — implement create_room and invite_user  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10979

路线图信号：  
ZeroClaw 正从“单人对话助手”向“多用户协作型助手”扩展。群组创建和邀请成员是 Agent 主动组织协作空间的关键基础设施。

需要注意：  
PR #10979 标注了 `risk:high` 和 `size:L`，说明实现复杂度和潜在风险较高，建议维护者重点关注权限、安全边界、邀请失败处理和 WhatsApp 侧限制。

---

### WhatsApp Web 文档预览与图片预览

相关 PR：

- PR #10980 — attach first-page previews to PDF documents  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10980
- PR #10982 — attach inline previews to outgoing images  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10982

路线图信号：  
项目正在改善 WhatsApp Web 的富媒体体验。对于个人 AI 助手而言，这会影响用户对 Agent 输出内容的信任感和可读性，尤其是：

- PDF 报告；
- 发票或合同摘要；
- 图像生成结果；
- 数据图表；
- 页面截图。

PR #10980 同样标注 `risk:high`，且引入配置项 `document_thumbnails`，默认关闭。这表明维护者对 PDF 渲染和安全边界较谨慎。

---

### 多 Agent 主机级资源治理

#### Issue #10970 — Host-scoped admission control and per-agent resource bounds  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10970  
状态：OPEN  

用户希望为同一台机器上运行的多个 Agent 增加主机级资源控制，包括：

- 并发 turn 数限制；
- 并发工具执行限制；
- 每个 Agent 的内存边界；
- 稳定性优先的降级机制。

路线图信号：  
这表明 ZeroClaw 用户正在从单 Agent 实验进入多 Agent 常驻运行场景。未来 runtime 层可能需要更多调度、隔离和资源治理机制。

---

### Cron / Heartbeat 增加 jitter，避免同时触发

#### Issue #10969 — Add jitter window to cron and heartbeat dispatch  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10969  
状态：OPEN  

用户希望为 cron 和 daemon heartbeat 增加可配置 jitter 窗口，避免大量 Agent 在同一秒集中触发。

路线图信号：  
该需求与 #10970 一致，说明用户已经遇到多 Agent 部署时的“尖峰负载”问题。它属于稳定性和运维体验增强，可能与主机级 admission control 一起形成后续 runtime roadmap。

---

## 6. 用户反馈摘要

从今日 Issues 可以提炼出几个核心用户痛点。

### 1. WhatsApp Web 已成为重点使用通道，但能力仍不完整

大量 Issues 和 PR 都集中在 WhatsApp Web：

- 投票不能回传结果；
- 原生投票尚未完全接入；
- 群组创建和邀请缺失；
- 入站图片无法被模型读取；
- 出站图片在手机端显示为空白；
- PDF 缺少预览；
- mentions 在群聊中不可用。

用户显然希望 WhatsApp Web 不只是“能发消息”，而是成为一个完整、可靠、支持多模态和群聊协作的 Agent 运行通道。

### 2. 用户期望 Agent 能在真实聊天产品中形成闭环

#10987 的诉求很典型：用户不是只想让 Agent 发一个投票，而是希望 Agent 能理解投票结果并采取行动。这说明用户越来越关注端到端任务完成能力，而非单点工具调用。

### 3. 多 Agent 常驻运行带来了新的稳定性诉求

#10969 和 #10970 表明用户正在部署多个 Agent，并遇到了资源争用、同时触发、主机稳定性等问题。ZeroClaw 如果继续向生产化和个人自动化平台演进，需要加强 runtime 层的调度与隔离能力。

### 4. 安全审批机制需要覆盖无人值守路径

#10968 暴露出一个关键反馈：用户不仅在交互式对话中使用工具，也在 cron、heartbeat、subagent 等无人值守路径中使用工具。审批和风险控制不能只绑定 interactive 模式，否则安全模型会出现缺口。

---

## 7. 待处理积压

严格来说，今日数据中没有“长期未响应”的旧 Issue 或 PR，所有条目都在过去 24 小时内创建或更新。不过有几类待处理事项需要维护者优先关注。

### 高优先级安全积压

#### Issue #10968 — Unattended turns without ApprovalManager  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10968  

当前没有看到对应修复 PR。由于该问题标记为 S0，建议立即 triage，并明确是否需要安全公告、临时缓解方案或快速补丁。

---

### 关键功能阻塞积压

#### PR #10986 — channel-backed tools need running channel instances  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10986  

该 PR 可能是多项 WhatsApp Web 工具能力可用性的前置修复。若不合并，Dashboard 启动的 turn 可能仍无法正确调用 session-bound channel。

---

### WhatsApp Web 投票能力 PR 堆叠

#### PR #10984 — post native polls  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10984  

#### PR #10988 — read poll votes back as `[choice]` messages  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10988  

#10988 标注为 stacked on #10984，因此评审顺序和变更冲突需要关注。建议先稳定 Channel trait 扩展，再评审投票结果回传逻辑。

---

### 高风险 WhatsApp Web 能力扩展

#### PR #10979 — create_room and invite_user  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10979  

#### PR #10980 — PDF first-page previews  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10980  

两者均涉及较高风险：

- 群组创建涉及权限、联系人格式、邀请失败和滥用风险；
- PDF 预览涉及文档处理、渲染安全和资源消耗。

建议维护者重点检查安全边界、配置默认值、失败回退和测试覆盖。

---

### 未见修复 PR 的 WhatsApp Web Bug

#### Issue #10975 — inbound images not downloaded  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10975  

#### Issue #10976 — mentions broken both ways  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10976  

这两个问题会明显影响 WhatsApp Web 的多模态与群聊体验，目前未看到对应修复 PR。建议确认关闭的 #10972 和 #10973 是否为重复 Issue，并将后续讨论集中到 #10975 / #10976。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*