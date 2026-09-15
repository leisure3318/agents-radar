# OpenClaw 生态日报 2026-09-15

> Issues: 12 | PRs: 59 | 覆盖项目: 13 个 | 生成时间: 2026-09-15 03:54 UTC

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
日期：2026-09-15  
仓库：openclaw/openclaw

---

## 1. 今日速览

过去 24 小时 OpenClaw 维持了很高的工程活跃度：Issue 更新 12 条，其中 10 条仍处于打开状态；PR 更新 59 条，其中 46 条仍待合并，13 条已合并或关闭。整体来看，项目当前处于密集修复、测试稳定化、性能重构和发布验证修补阶段，而不是功能大版本发布阶段。

今日新增或活跃的问题集中在会话状态、消息丢失、更新失败、发布流水线、数据库/SQLite worker 清理、Gateway 性能与插件兼容性等方面。P0/P1 级别问题仍在积压，说明核心交互链路和升级链路存在一定稳定性压力。与此同时，维护者侧 PR 数量充足，多个 ready for maintainer look 的小中型修复已具备合并条件，项目健康度总体偏活跃，但短期风险主要来自高优先级 Bug 与待审 PR 堆积。

---

## 2. 版本发布

今日无新版本发布。  
最新 Releases：无。

---

## 3. 项目进展

今日 PR 更新量较高，已关闭/合并类 PR 主要集中在测试校准、UI 修复和内部清理。虽然没有发布版本，但这些变更有助于降低 CI 噪音、改善设置页体验，并清理无用运行时代码。

### 已关闭 / 合并的重要 PR

#### 1. Settings 中跨页面保持选中 Agent  
- PR：[#148667 fix(ui): keep the selected agent across Settings pages](https://github.com/openclaw/openclaw/pull/148667)  
- 状态：CLOSED  
- 影响范围：Web UI、Settings、Agent 配置  
- 进展价值：修复用户在 Models 页面选择 Research 后，进入 Agents 页面又被重置为 Clawd 的问题。  
- 用户影响：设置体验更一致，减少重复选择 Agent 的摩擦。该 PR 还带有截图证明，说明验证材料较充分。

#### 2. Gateway E2E 测试期望与当前行为对齐  
- PR：[#148653 fix(ci): align Gateway E2E expectations with current behavior](https://github.com/openclaw/openclaw/pull/148653)  
- 状态：CLOSED  
- 影响范围：Gateway E2E、CI  
- 进展价值：修复测试断言与当前产品文案/心跳行为不一致的问题。  
- 用户影响：无直接运行时变更，但有助于减少 CI 假失败，提升维护效率。

#### 3. 移除未使用的 AI overflow wrapper  
- PR：[#148719 refactor(ai): remove unused overflow wrapper](https://github.com/openclaw/openclaw/pull/148719)  
- 状态：CLOSED  
- 影响范围：内部 runtime  
- 进展价值：删除无运行时调用方的内部 wrapper，降低代码复杂度。  
- 用户影响：无公开 API 破坏；变更限定在 reserved `internal/runtime` 子路径。

### 今日仍在推进的关键方向

#### 异步化 SQLite / shared worker 相关重构  
多条 PR 指向同一长期目标：减少 Gateway、任务、会话和插件路径上的同步 SQLite 访问，降低阻塞风险。

- [#148574 refactor(tasks): prepare cold task and flow reads asynchronously](https://github.com/openclaw/openclaw/pull/148574)  
- [#148576 refactor(tasks): load fresh owner projections asynchronously](https://github.com/openclaw/openclaw/pull/148576)  
- [#148583 refactor(agents): prepare legacy media task owners asynchronously](https://github.com/openclaw/openclaw/pull/148583)  
- [#148636 perf(delivery): read failed queue counts in shared worker](https://github.com/openclaw/openclaw/pull/148636)  
- [#148637 refactor(projects): move project listing to shared state worker](https://github.com/openclaw/openclaw/pull/148637)  
- [#148748 improve(sessions): reduce database work during session updates](https://github.com/openclaw/openclaw/pull/148748)  

这批变更说明项目正在系统性处理“主线程同步数据库访问”问题，属于性能和稳定性基础设施层面的推进。

#### 发布验证与包验证修复  
- [#148729 fix(release): unblock skill and Telegram package validation](https://github.com/openclaw/openclaw/pull/148729)  
- [#148741 fix(github): reject diverged publication before changing local history](https://github.com/openclaw/openclaw/pull/148741)  

这些 PR 表明维护者正在修复发布、GitHub 发布流、ClawHub/Telegram 包验证等发布链路问题，为后续版本发布扫清障碍。

---

## 4. 社区热点

由于今日 PR 数据中评论数为 `undefined`，以下热点主要依据 Issue 评论数、优先级、影响标签和维护者标记综合判断。

### 1. Side chat 无法回答 / 工具只读权限快照丢失  
- Issue：[#148240 [Bug]: Side chat loses its direct read-only tool setup on configured gateways](https://github.com/openclaw/openclaw/issues/148240)  
- 状态：OPEN  
- 评论：2  
- 标签：P2、maintainer、source-repro、impact:ux-friction、diamond lobster  
- 热点原因：该问题触及 Side chat 在配置 Gateway 下的只读工具设置丢失，用户表象是“Side chat cannot answer right now”。  
- 背后诉求：用户希望 Side chat 在复杂 Gateway 配置下仍能稳定读取上下文并给出回答。当前维护者已澄清：底层配置/read-scope 缺陷已单独复现，但尚未证明它就是 60 秒超时的直接原因。

### 2. macOS Sparkle Autoupdate 长时间高 CPU  
- Issue：[#148714 [Bug]: macOS Sparkle Autoupdate persists for 3 days with high CPU during extreme load spike](https://github.com/openclaw/openclaw/issues/148714)  
- 状态：OPEN  
- 评论：2  
- 标签：P2、impact:other、silver shellfish  
- 热点原因：macOS 自动更新进程在极端系统负载下存活超过 3 天，并出现 77.8% CPU 使用率。  
- 背后诉求：用户希望自动更新进程具备更好的生命周期控制和异常负载保护，避免后台进程持续占用资源。

### 3. 2026.9.4 回归导致回复丢失  
- Issue：[#148707 Bug: reply lost with 'Reply operation has no active tool authority snapshot'](https://github.com/openclaw/openclaw/issues/148707)  
- 状态：OPEN  
- 评论：2  
- 标签：P1、needs-info、impact:message-loss、silver shellfish  
- 热点原因：这是 P1 消息丢失问题，发生在第二次 run 替换同一 session 中进行中的 turn 时。  
- 背后诉求：用户期待交互会话即使被并发操作打断，也不应无声丢失回复，至少应有重试、部分输出或明确恢复机制。

### 4. Settings 新增条目在 autosave 时消失  
- PR：[#148745 fix: keep new Settings entries visible during autosave](https://github.com/openclaw/openclaw/pull/148745)  
- 状态：OPEN  
- 影响范围：Web UI Settings  
- 热点原因：新增 Talk provider、TTS persona/provider、Skills 嵌套条目在用户填写前触发 autosave 会消失。  
- 背后诉求：用户在设置复杂提供商和技能时，希望表单草稿状态可靠保留，避免输入流程被自动保存机制打断。

### 5. 长会话 reset 导致 Gateway 内存/卡顿风险  
- PR：[#148588 fix: avoid full-transcript allocations when resetting long sessions](https://github.com/openclaw/openclaw/pull/148588)  
- 状态：OPEN，waiting on author  
- 标签：P1、merge-risk: compatibility  
- 热点原因：长会话 reset 时，插件观察者可能加载完整 transcript，引起 Gateway 卡顿和内存暴涨。  
- 背后诉求：用户希望长时间运行的会话可以安全 reset，插件生命周期钩子不应造成整体服务阻塞。

---

## 5. Bug 与稳定性

以下按严重程度和用户影响排序。

### P0：升级失败 / 发布阻断类

#### 1. Windows 2026.9.4 更新失败：database-schema-preflight  
- Issue：[#148744 Update failure: database-schema-preflight (2026.9.4)](https://github.com/openclaw/openclaw/issues/148744)  
- 状态：OPEN  
- 严重程度：P0  
- 影响：ux-release-blocker  
- 平台：win32/x64，Node 24.18.0  
- 是否已有 fix PR：未在今日数据中看到明确修复 PR；标记为 `needs-info`。  
- 分析：这是今日最需要关注的问题之一。更新失败直接阻断用户升级，且发生在 schema preflight 阶段，可能涉及数据库迁移安全检查或目标版本兼容性。

---

### P1：消息丢失 / 会话状态 / 权限快照

#### 2. 同一 session 第二次 run 替换 in-flight turn 后回复丢失  
- Issue：[#148707 Bug: reply lost with 'Reply operation has no active tool authority snapshot'](https://github.com/openclaw/openclaw/issues/148707)  
- 状态：OPEN  
- 严重程度：P1  
- 影响：message-loss  
- 是否已有 fix PR：未看到明确关联修复 PR；当前 `needs-info`。  
- 分析：消息丢失属于核心可靠性问题。报错显示 reply 操作缺失 active tool authority snapshot，暗示 session turn 替换与工具权限快照生命周期之间存在竞态。

#### 3. Discord durable ingress deferral 阻塞后续实时修正  
- Issue：[#148730 [Bug]: Discord durable ingress holds the channel lane after deferral](https://github.com/openclaw/openclaw/issues/148730)  
- 状态：OPEN  
- 严重程度：P1  
- 影响：message-loss  
- 是否已有 fix PR：未在今日数据中看到明确修复 PR。  
- 分析：用户在 Discord 中发送修正或取消消息，虽然被平台接受，但无法进入 active-run steering 或 batching。这会造成“用户以为已纠正，但系统仍按旧指令继续”的严重体验问题。

#### 4. Node approvals 拒绝 routed agent sessions  
- PR：[#148612 fix(exec): node approvals no longer reject routed agent sessions](https://github.com/openclaw/openclaw/pull/148612)  
- 状态：OPEN，needs proof  
- 严重程度：P1  
- 风险：compatibility、security-boundary  
- 分析：该 PR 试图修复 routed channel session 与 active agent run session 不一致时，node-host exec 被拒绝的问题。由于涉及审批身份和安全边界，当前需要更多证明是合理的。

#### 5. CLI 插件内置 model API backend 加载失败  
- PR：[#148664 fix(plugins): load selected CLI backends with built-in model APIs](https://github.com/openclaw/openclaw/pull/148664)  
- 状态：OPEN，ready for maintainer look  
- 严重程度：P1  
- 关联：Fixes [#148584](https://github.com/openclaw/openclaw/issues/148584)  
- 分析：选中的 CLI plugin 在 catalog 使用内置 transport API 时可能报 `Unknown CLI backend`。该修复已具备维护者 review 条件，可能较快进入合并队列。

---

### P2：UX 摩擦、发布验证、任务/会话状态、平台稳定性

#### 6. Side chat 在 configured gateways 下丢失直接只读工具设置  
- Issue：[#148240](https://github.com/openclaw/openclaw/issues/148240)  
- 状态：OPEN  
- 严重程度：P2  
- 影响：ux-friction  
- 是否已有 fix PR：未看到明确修复 PR。  
- 分析：维护者已区分“底层 read-scope defect”和“60 秒 timeout”的因果关系，后续需要更精确复现证据。

#### 7. 全局 follow-up queue 导致后续 steering 全部失效  
- Issue：[#148731 [Bug]: One queued follow-up globally disables steering](https://github.com/openclaw/openclaw/issues/148731)  
- 状态：OPEN  
- 严重程度：P2  
- 影响：session-state、ux-friction  
- 是否已有 fix PR：标签显示 `no-new-fix-pr`，未见新修复 PR。  
- 分析：一条进入 follow-up queue 的消息会让后续 correction/cancellation 失去 steering 资格。这与 #148730 类似，反映多通道/多轮输入下的 steering 语义仍需加固。

#### 8. iOS beta release 内部分组分发失败  
- Issue：[#148737 iOS beta release fails after processing during internal-group assignment](https://github.com/openclaw/openclaw/issues/148737)  
- 状态：OPEN  
- 严重程度：P2  
- 是否已有 fix PR：标签显示 `linked-pr-open`，但具体 PR 未在给定数据中明确列出。  
- 分析：构建已上传并处理完成后，最终 internal-group assignment 失败。问题不一定影响运行时用户，但会阻断 beta 发布链路。

#### 9. Managed worktree cleanup 可能删除未捕获分支  
- Issue：[#148747 Managed worktree cleanup forces deletion and can remove an uncaptured branch](https://github.com/openclaw/openclaw/issues/148747)  
- 状态：OPEN  
- 严重程度：未标 P 级，但由 maintainer 标记  
- 是否已有 fix PR：未看到明确修复 PR。  
- 分析：工作区清理缺乏真正的非强制删除路径，并可能删除记录分支。该问题涉及开发者数据安全，应尽快明确边界和保护措施。

#### 10. macOS Sparkle Autoupdate 高 CPU 长驻  
- Issue：[#148714](https://github.com/openclaw/openclaw/issues/148714)  
- 状态：OPEN  
- 严重程度：P2  
- 是否已有 fix PR：未看到明确修复 PR。  
- 分析：虽然触发条件包含极端系统负载，但自动更新进程生命周期异常值得排查，尤其影响桌面端用户信任。

#### 11. Slow Codex catalog failures 缺少控制阶段与错误分类  
- Issue：[#148728 Slow Codex catalog failures omit control phase and error category](https://github.com/openclaw/openclaw/issues/148728)  
- 状态：OPEN  
- 严重程度：P2  
- 是否已有 fix PR：未看到明确修复 PR。  
- 分析：这是可观测性问题。诊断信息无法区分模块加载、准备、客户端获取、API 等待或清理阶段，会拖慢线上排障。

#### 12. ClawHub skill-install E2E 缺少可维护 live fixture  
- Issue：[#148727 Qualify a maintained live fixture for ClawHub skill-install E2E](https://github.com/openclaw/openclaw/issues/148727)  
- 状态：OPEN  
- 严重程度：P2  
- 可能相关 PR：[#148729](https://github.com/openclaw/openclaw/pull/148729)  
- 分析：发布验证作业中安全拒绝耗尽了 fixture pool，导致未能验证 installed-file、origin、package assertions。#148729 正在尝试解锁 skill 和 Telegram package validation。

---

### 已关闭的问题

#### Release fallback 大量 ref 枚举时误拒绝可达 commit  
- Issue：[#148160 Release fallback rejects reachable commits with large ref enumeration](https://github.com/openclaw/openclaw/issues/148160)  
- 状态：CLOSED  
- 严重程度：P2  
- 标签：linked-pr-open  
- 分析：该问题已关闭，说明 release-check fallback 相关问题可能已有修复路径或处理结论。

#### Native preparation 被 skipped duplicate 阻塞  
- Issue：[#148720 fix(ci): skipped duplicate blocks native preparation after successful checks](https://github.com/openclaw/openclaw/issues/148720)  
- 状态：CLOSED  
- 严重程度：P2  
- 标签：linked-pr-open  
- 分析：CI/native preparation 场景下，较新的 duplicate scheduled workflow 以 skipped 结束后阻塞已成功校验的 same-head hosted validation。关闭代表该发布验证/CI 噪音问题已有进展。

---

## 6. 功能请求与路线图信号

今日没有典型的“用户提出新功能请求”型 Issue，但多个 PR 暴露出明确路线图方向。

### 1. Gateway 运维诊断能力增强  
- PR：[#148004 feat(gateway): add admin CPU profile diagnostics](https://github.com/openclaw/openclaw/pull/148004)  
- 状态：OPEN，ready for maintainer look  
- 方向：可观测性、生产排障、Gateway 管理 API  
- 可能进入下一版本概率：较高。该 PR 已标记 ready for maintainer look，并有明确用户价值：管理员可通过 `diagnostics.cpuProfile` 获取 5 秒 CPU profile，无需开启 debugger 或重启服务。

### 2. 数据库访问异步化与 shared worker 化  
- 代表 PR：  
  - [#148574](https://github.com/openclaw/openclaw/pull/148574)  
  - [#148576](https://github.com/openclaw/openclaw/pull/148576)  
  - [#148636](https://github.com/openclaw/openclaw/pull/148636)  
  - [#148637](https://github.com/openclaw/openclaw/pull/148637)  
  - [#148748](https://github.com/openclaw/openclaw/pull/148748)  
- 方向：性能、主线程减负、Gateway 稳定性  
- 可能进入下一版本概率：中高。多条 PR 均处于 ready for maintainer look，但其中部分为 stacked PR，合并顺序和回归风险需要维护者协调。

### 3. Settings 与配置编辑 UX 改进  
- PR：[#148745 fix: keep new Settings entries visible during autosave](https://github.com/openclaw/openclaw/pull/148745)  
- 已关闭相关 PR：[#148667](https://github.com/openclaw/openclaw/pull/148667)  
- 方向：Web UI 配置体验  
- 可能进入下一版本概率：较高。问题明确、用户影响直接、变更范围相对可控。

### 4. 插件与 CLI backend 兼容性修复  
- PR：[#148664 fix(plugins): load selected CLI backends with built-in model APIs](https://github.com/openclaw/openclaw/pull/148664)  
- PR：[#148632 fix(plugins): restore manifest hashes for symlinked plugin roots](https://github.com/openclaw/openclaw/pull/148632)  
- PR：[#148716 improve(plugins): narrow public API runtime owner lookup](https://github.com/openclaw/openclaw/pull/148716)  
- 方向：插件系统健壮性、registry 元数据一致性、API owner lookup 性能  
- 可能进入下一版本概率：中高。#148664 是 P1 且 ready for maintainer look，优先级更高。

### 5. 多渠道消息 steering / session-state 修复  
- 相关 Issue：  
  - [#148707](https://github.com/openclaw/openclaw/issues/148707)  
  - [#148730](https://github.com/openclaw/openclaw/issues/148730)  
  - [#148731](https://github.com/openclaw/openclaw/issues/148731)  
  - [#148721 fix(slack): record explicit top-level sends in source sessions](https://github.com/openclaw/openclaw/pull/148721)  
- 方向：Slack、Discord、session steering、消息可靠性  
- 可能进入下一版本概率：中等。需求强烈，但部分 PR 仍 needs proof，且涉及 session-state 风险。

---

## 7. 用户反馈摘要

从今日 Issues 和 PR 摘要中可以提炼出以下真实用户痛点。

### 1. “我发送了修正/取消，但系统没有听进去”
- 来源：[#148730](https://github.com/openclaw/openclaw/issues/148730)、[#148731](https://github.com/openclaw/openclaw/issues/148731)、[#148707](https://github.com/openclaw/openclaw/issues/148707)  
- 场景：Discord、会话 follow-up queue、同 session 并发 run。  
- 痛点：用户在 AI 助手运行中发出纠正或取消指令，但消息可能被 deferral、queue 或权限快照问题吞掉。  
- 满意度信号：明显不满意，尤其是 message-loss 标签表明这是影响信任的核心问题。

### 2. “升级失败，无法进入新版本”
- 来源：[#148744](https://github.com/openclaw/openclaw/issues/148744)  
- 场景：Windows x64 从 2026.9.4 更新时触发 database-schema-preflight 失败。  
- 痛点：升级链路阻断，普通用户很难自行判断数据库 schema preflight 失败原因。  
- 满意度信号：高风险负反馈，已标记 P0 和 release blocker 类影响。

### 3. “后台进程长期占 CPU”
- 来源：[#148714](https://github.com/openclaw/openclaw/issues/148714)  
- 场景：macOS Sparkle Autoupdate 在极端系统负载下长驻并高 CPU。  
- 痛点：桌面用户对后台进程可控性敏感，高 CPU 长驻会降低对应用质量的信任。  
- 满意度信号：不满意，但目前优先级为 P2，可能需要更多复现和平台日志。

### 4. “设置页自动保存导致我刚添加的内容消失”
- 来源：[#148745](https://github.com/openclaw/openclaw/pull/148745)、[#148667](https://github.com/openclaw/openclaw/pull/148667)  
- 场景：Settings 中新增 Talk provider、TTS persona/provider、Skills 嵌套项；跨页面选择 Agent。  
- 痛点：配置复杂系统时，UI 状态不稳定会让用户反复操作。  
- 满意度信号：该方向已有快速修复，说明维护者对配置 UX 有响应。

### 5. “长会话和插件观察者可能拖垮 Gateway”
- 来源：[#148588](https://github.com/openclaw/openclaw/pull/148588)  
- 场景：长时间运行 session reset，`before_reset` plugin observer 加载完整 transcript。  
- 痛点：企业或重度用户的长会话容易触发性能尖峰。  
- 满意度信号：用户希望有边界明确的快照机制，而不是无限加载完整历史。

---

## 8. 待处理积压

基于今日快照，长期未响应时长无法从数据中精确判断；但以下高优先级或高风险条目已经形成明显待处理压力，建议维护者优先关注。

### 高优先级 Issue 待处理

1. [#148744 Update failure: database-schema-preflight (2026.9.4)](https://github.com/openclaw/openclaw/issues/148744)  
   - P0，升级阻断。  
   - 建议：尽快补充诊断脚本、确认 schema preflight 失败条件，并提供用户可执行的恢复路径。

2. [#148707 Reply lost with no active tool authority snapshot](https://github.com/openclaw/openclaw/issues/148707)  
   - P1，message-loss。  
   - 建议：优先确认 2026.9.4 回归范围，建立最小复现和竞态测试。

3. [#148730 Discord durable ingress blocks live corrections](https://github.com/openclaw/openclaw/issues/148730)  
   - P1，message-loss。  
   - 建议：与 steering / batching / deferral 状态机统一排查，避免多渠道消息语义分裂。

4. [#148731 One queued follow-up globally disables steering](https://github.com/openclaw/openclaw/issues/148731)  
   - P2，但影响 session-state 和 UX。  
   - 建议：明确 follow-up queue 与 steering eligibility 的优先级规则。

5. [#148747 Managed worktree cleanup forces deletion](https://github.com/openclaw/openclaw/issues/148747)  
   - 涉及潜在分支删除。  
   - 建议：在清理逻辑中增加非强制路径、分支保护和 dry-run 诊断。

### 待审 / 待证明 PR

1. [#148612 fix(exec): node approvals no longer reject routed agent sessions](https://github.com/openclaw/openclaw/pull/148612)  
   - P1，needs proof，涉及 compatibility 与 security-boundary。  
   - 建议：补充安全边界证明和 routed session 身份匹配测试。

2. [#148588 fix: avoid full-transcript allocations when resetting long sessions](https://github.com/openclaw/openclaw/pull/148588)  
   - P1，waiting on author。  
   - 建议：尽快明确 transcript snapshot 上限对插件兼容性的影响。

3. [#148721 fix(slack): record explicit top-level sends in source sessions](https://github.com/openclaw/openclaw/pull/148721)  
   - P2，needs proof，session-state 风险。  
   - 建议：补充 Slack top-level send 与 synthesized reply anchor 的对照测试。

4. [#148532 fix(browser): snapshot responses cannot say whether a capture happened](https://github.com/openclaw/openclaw/pull/148532)  
   - P2，needs proof。  
   - 建议：明确该 PR 只修复 snapshot response contract，不关闭浏览器 stall 主问题。

5. [#148583 refactor(agents): prepare legacy media task owners asynchronously](https://github.com/openclaw/openclaw/pull/148583)  
   - P2，waiting on author，session-state 风险。  
   - 建议：在 stacked PR 链中明确依赖顺序和回滚策略。

### 维护者可优先合并的低风险候选

以下 PR 已标记 ready for maintainer look，且多为测试、性能或局部修复，适合降低积压：

- [#148654 fix(logs): keep following when rotation removes the log before open](https://github.com/openclaw/openclaw/pull/148654)  
- [#148632 fix(plugins): restore manifest hashes for symlinked plugin roots](https://github.com/openclaw/openclaw/pull/148632)  
- [#148716 improve(plugins): narrow public API runtime owner lookup](https://github.com/openclaw/openclaw/pull/148716)  
- [#148733 refactor(testing): share ClawHub artifact assertions](https://github.com/openclaw/openclaw/pull/148733)  
- [#148743 improve: finish config test database work before cleanup](https://github.com/openclaw/openclaw/pull/148743)  
- [#148742 test: drain SQLite workers before fixture state cleanup](https://github.com/openclaw/openclaw/pull/148742)  
- [#148734 fix(tests): drain shared database workers before fixture cleanup](https://github.com/openclaw/openclaw/pull/148734)  

---

## 总体健康度判断

OpenClaw 今日表现为“高活跃、高维护投入、中等偏高稳定性压力”。PR 更新量远高于 Issue 更新量，说明维护者和贡献者正在积极修复问题、推进重构；但 P0/P1 问题涉及升级失败、消息丢失、session steering 和安全边界，短期内应优先处理。

建议下一步优先级为：

1. 先解决 P0 更新失败：[#148744](https://github.com/openclaw/openclaw/issues/148744)  
2. 集中处理 message-loss / steering 类 P1：[#148707](https://github.com/openclaw/openclaw/issues/148707)、[#148730](https://github.com/openclaw/openclaw/issues/148730)  
3. 合并 ready 且低风险的 CI/test/SQLite cleanup PR，降低维护噪音  
4. 对涉及 session-state、security-boundary、compatibility 的 PR 保持严格 proof 要求  
5. 在下一版本前完成发布验证链路修复：[#148729](https://github.com/openclaw/openclaw/pull/148729)、[#148737](https://github.com/openclaw/openclaw/issues/148737)

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析  
日期：2026-09-15

---

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态整体呈现出 **高活跃项目加速稳定化、低活跃项目聚焦单点能力或需求澄清** 的分层态势。OpenClaw、Hermes Agent、CoPaw、ZeroClaw 等项目正在密集处理发布后稳定性、会话状态、工具权限、Cron 自动化、多渠道消息投递等核心可靠性问题，说明智能体系统已经进入真实使用场景的压力测试阶段。

从技术主题看，生态关注点正从“能调用模型和工具”转向 **状态一致性、安全边界、可观测性、多租户治理、移动端体验和自动化任务可靠性**。尤其是消息丢失、升级失败、Cron 静默失败、公开频道信息泄露、provider 多模态边界等问题，已经成为影响用户信任的关键风险。

同时，多个项目都在推进 Hub / Desktop / WebUI / PWA / IM Channel / MCP / 插件系统等能力，表明个人 AI 助手正在从单机 CLI 工具演进为跨端、跨渠道、可扩展、可运营的智能体平台。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 今日状态摘要 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 12 | 59 | 无 | PR 极活跃，集中在 SQLite 异步化、Gateway 性能、发布验证、Settings UX、消息丢失与升级失败 | **高活跃，中高稳定性压力** |
| **Hermes Agent** | 50 | 50 | **v2026.9.14 / v0.21.3** | 发布后反馈密集，涉及 update、Desktop、Cron、state.db、MCP approval、模型选择 | **高活跃，高稳定性压力** |
| **CoPaw / QwenPaw** | 16 | 22 | 无 | Hub、Cron、MCP、Desktop 安全、文件预览、模型配置均有反馈和 PR | **高活跃，快速迭代中** |
| **ZeroClaw** | 5 | 15 | 无 | 聚焦 provider 多模态安全、Telegram 阻塞、prompt cache、ZeroCode 体验、CI 风险分类 | **较高活跃，安全与稳定性压力明显** |
| **NanoBot** | 4 | 12 | 无 | 移动端 WebUI / iOS PWA 问题集中出现，PR 聚焦 provider fallback、Feishu 登录、API 校验、cron | **良好，移动端体验风险上升** |
| **LobsterAI** | 0 | 13 | 无 | OpenClaw runtime / Electron 升级、Markdown 渲染、依赖现代化、POPO SDK 竞态修复 | **工程活跃，升级兼容性风险** |
| **NanoClaw** | 2 | 8 | 无 | 安全隐私、central DB 锁、Mattermost setup、凭证脱敏、handoff ledger | **活跃度较高，生产化修复期** |
| **PicoClaw** | 0 | 2 | 无 | v0.10.0 sprint plan 与 mesh observability 推进 | **稳定推进，社区反馈较安静** |
| **NullClaw** | 2 | 0 | 无 | 讨论 web_search 外部搜索代理、预付费 MCP search hop | **低代码活跃，需求探索中** |
| **IronClaw** | 1 | 0 | 无 | benchmark failure taxonomy，officeqa 43 个 non-pass 分析 | **低工程活跃，评测驱动观察中** |
| **Moltis** | 0 | 1 | 无 | OAuth / PKCE 测试 race 修复 PR | **低活跃，质量维护中** |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **ZeptoClaw** | 0 | 0 | 无 | 无活动 | **静默** |

### 活跃度分层

| 层级 | 项目 | 特征 |
|---|---|---|
| **第一梯队：高强度迭代** | OpenClaw、Hermes Agent、CoPaw、ZeroClaw | Issue / PR 同时活跃，真实用户场景反馈密集，稳定性和安全边界压力突出 |
| **第二梯队：专项质量收敛** | NanoBot、LobsterAI、NanoClaw | PR 活跃，聚焦 WebUI、运行时升级、渠道集成、安全隐私、安装稳定性 |
| **第三梯队：规划或单点推进** | PicoClaw、Moltis、IronClaw、NullClaw | 活动量低，但有明确单点主题：mesh observability、OAuth 测试、benchmark、web_search 方案 |
| **静默项目** | TinyClaw、ZeptoClaw | 过去 24 小时无 GitHub 可见活动 |

---

## 3. OpenClaw 在生态中的定位

### 3.1 核心定位

OpenClaw 当前处于生态中的 **基础型、平台型 AI 助手框架** 位置。它不像 NanoBot 更偏 WebUI / provider 体验，也不像 PicoClaw 聚焦 mesh 网络，OpenClaw 的问题和 PR 分布覆盖了 **Gateway、会话、插件、发布链路、SQLite worker、Settings、Side chat、CLI backend、GitHub publication、ClawHub package validation** 等多个基础系统层面。

这说明 OpenClaw 已经不只是一个应用级助手，而更像是一个可承载插件、渠道、任务、发布、配置和本地状态管理的智能体运行平台。

### 3.2 相对优势

| 维度 | OpenClaw 表现 | 对比判断 |
|---|---|---|
| **工程活跃度** | 59 条 PR 更新，12 条 Issue 更新 | 仅次于或接近 Hermes Agent，是今日最活跃项目之一 |
| **基础设施投入** | 多条 SQLite 异步化、shared worker、Gateway 性能 PR | 比 NanoBot、NanoClaw 更偏底层性能治理 |
| **插件与发布生态** | ClawHub、Telegram package validation、CLI plugin backend、manifest hash 修复 | 插件与包发布链路较成熟，但也暴露复杂度 |
| **桌面 / Web UI 配置体验** | Settings Agent 选择保持、autosave 草稿保留 | 对终端用户配置体验响应较快 |
| **维护响应** | 大量 ready for maintainer look PR | 贡献活跃，但 review 队列压力较高 |

### 3.3 主要短板与风险

OpenClaw 今日最突出的风险不是功能缺失，而是 **核心链路稳定性压力**：

- P0：Windows 更新失败，`database-schema-preflight` 阻断升级；
- P1：reply 丢失，`tool authority snapshot` 生命周期存在竞态；
- P1 / P2：Discord / follow-up queue / steering 语义不稳定；
- P1：node approvals 涉及 routed session 与 security-boundary；
- 长会话 reset 可能造成 Gateway 内存暴涨。

相比之下，NanoBot 的风险更偏移动端体验，NanoClaw 更偏安全隐私和安装，ZeroClaw 更偏 provider 多模态安全，Hermes Agent 则在 Cron / Desktop / update / state.db 上承压。OpenClaw 的风险集中在 **会话状态、升级、Gateway 性能和插件兼容性**，这些都是平台型项目最关键的稳定性指标。

### 3.4 社区规模与复杂度对比

从今日数据看，OpenClaw 的 PR 更新量高达 59，说明其贡献流和维护流非常活跃。Hermes Agent 的 Issues 和 PR 均为 50，用户反馈强度更高；OpenClaw 则呈现 **PR 多于 Issue** 的结构，说明维护者 / 贡献者正在主动推进重构和修复，而不是单纯被用户问题驱动。

可将 OpenClaw 定位为：

> **高活跃、平台化、工程重构密集的核心参照项目；短期挑战是把高 PR 产出转化为稳定发布，并优先消除 P0/P1 用户信任风险。**

---

## 4. 共同关注的技术方向

### 4.1 会话状态一致性与消息可靠性

涉及项目：

- **OpenClaw**：reply 丢失、tool authority snapshot 缺失、Discord steering 阻塞、follow-up queue 影响 steering；
- **Hermes Agent**：state.db / WAL reliability、Desktop/TUI session agent 为 None 导致 prompt 丢失、SSE compression 阶段客户端超时 hard-kill turn；
- **CoPaw**：Agent 切换导致历史会话不可点击、上下文压缩生成空白标签、ReAct max_iters 后无最终回答；
- **ZeroClaw**：Telegram rejected voice update 阻塞后续消息；
- **NanoClaw**：sticky subscriptions 与 accumulated sessions 混淆。

共同诉求：

- 用户消息不能静默丢失；
- 会话切换、压缩、重启、并发 run、channel deferral 都应具备明确状态机；
- correction / cancellation / steering 必须在多渠道下保持一致；
- 对异常消息应隔离处理，不能阻塞整个 channel。

---

### 4.2 安全边界与权限治理

涉及项目：

- **OpenClaw**：node approvals routed session 修复涉及 security-boundary；
- **Hermes Agent**：Cron toolset 解析失败 fail-open 到完整默认工具集，MCP trust approvals 在 API run 中不可达；
- **NanoClaw**：公开频道 raw error 泄露、skill 日志凭证脱敏；
- **CoPaw**：Desktop 本地 API 匿名访问、destructive command / 系统凭证保护；
- **ZeroClaw**：工具输出图片标记被错误提升为 provider image，OpenCode session header 安全边界；
- **LobsterAI**：Windows path redaction、OpenClaw / POPO 加载竞态间接影响账号监听。

共同诉求：

- 工具权限、审批、channel 可见性和日志输出必须默认安全；
- public channel 与 owner / private diagnostic channel 需要区分；
- cron / background / no-TTY 场景不能绕过审批，也不能 fail-open；
- provider 多模态输入必须严格区分用户媒体、工具文本和 data URI。

---

### 4.3 自动化任务与 Cron 可靠性

涉及项目：

- **Hermes Agent**：Cron 到点未执行但 next_run 推进、monitor_script 输出被 prompt scanner 阻塞；
- **NanoBot**：cron tool 参数互斥校验、过去时间一次性任务应拒绝；
- **CoPaw**：Cron 配置增强、执行历史保留、一次性 Cron misfire；
- **NanoClaw**：task / schedule state 受 central DB 锁竞争影响；
- **OpenClaw**：任务与 session 更新路径正在减少同步 SQLite 工作。

共同诉求：

- 定时任务不能静默跳过；
- schedule state 应有可审计历史和失败记录；
- Cron 参数需要严格校验；
- 自动化任务涉及工具权限时应 fail-closed；
- Inbox / UI 需要展示执行历史和结果。

---

### 4.4 数据库与本地状态存储稳定性

涉及项目：

- **OpenClaw**：SQLite 异步化、shared worker、session update 降低 DB 工作；
- **Hermes Agent**：state.db / WAL reliability、SQLite runtime repair receipt；
- **NanoClaw**：central DB WAL 模式缺少 busy_timeout；
- **Moltis**：OAuth 测试中关注持久认证状态；
- **CoPaw**：会话状态、lastChatIdByAgent、历史记录一致性。

共同诉求：

- 多入口并发访问本地状态库时要避免锁竞争、阻塞和误报；
- 状态变更要有 receipt / evidence / diagnostic；
- 长会话和大 transcript 需要避免全量加载；
- 运行时状态和 UI 状态要保持同步。

---

### 4.5 Provider 兼容性、多模型治理与 fallback

涉及项目：

- **NanoBot**：NIM-style timeout fallback、OpenAI-compatible API 参数严格化；
- **Hermes Agent**：allowed model picker、web search keyless rescue、模型状态显示问题；
- **CoPaw**：new-api 代理兼容、模型故障切换入口不清晰、Hub 托管模型与 Token 预算；
- **ZeroClaw**：vision capability 校验、OpenCode session affinity header；
- **NullClaw**：web_search 外部搜索代理、Brave / Firecrawl / SearXNG / DuckDuckGo 后端可插拔；
- **OpenClaw**：CLI plugin backend 与内置 model API transport 兼容。

共同诉求：

- 用户需要 provider fallback、模型白名单、组织级模型托管；
- OpenAI-compatible 并不等于完全兼容，边界参数要严格处理；
- 多模态能力要由 capability 驱动，而不是默认放行；
- 搜索、模型、工具调用都在走向可插拔 provider 体系。

---

### 4.6 WebUI / Desktop / PWA 用户体验

涉及项目：

- **NanoBot**：iOS PWA 冷启动空白、顶部发白、移动端 session 双击、sidebar tooltip；
- **CoPaw**：Hub 文件预览 401、文件应展示在回复区域、Desktop 会话历史问题；
- **Hermes Agent**：Desktop spinner、后台任务状态不可见、Archived view 不刷新；
- **LobsterAI**：登录介绍页、Markdown live preview、Electron 升级；
- **OpenClaw**：Settings autosave、跨页面保持 selected agent；
- **ZeroClaw**：ZeroCode Delete 键、Ctrl+N session 语义、本地化诊断。

共同诉求：

- AI 助手 UI 不再只是调试界面，而是日常工作入口；
- 移动端 PWA、Desktop、Hub 多端体验需要一致；
- 长耗时任务、压缩、工具调用后处理必须有可见状态；
- 文件、artifact、Markdown、公式、表格等内容呈现质量成为核心体验。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 / 产品形态特征 |
|---|---|---|---|
| **OpenClaw** | Gateway、插件、会话、任务、Settings、发布验证、SQLite worker | 高级个人用户、插件开发者、平台集成者 | 平台型架构，重视 Gateway、shared worker、插件生态和发布链路 |
| **Hermes Agent** | Desktop、CLI、Gateway、Cron、MCP、state.db、模型选择 | 重度自动化用户、Desktop 用户、企业部署者 | 多入口共享状态库，发布节奏快，自动化和 Desktop 并重 |
| **CoPaw / QwenPaw** | Hub 多租户、Cron、MCP、文件预览、模型配置、安全治理 | 组织 / 团队用户、低代码 Agent 用户、MCP 使用者 | Hub + Desktop + Console + Cron，明显向组织级 Agent 平台演进 |
| **ZeroClaw** | Provider 安全、多模态边界、ZeroCode、Telegram、prompt cache | 开发者、provider adapter 维护者、ZeroCode 用户 | Rust / provider runtime 特征明显，强调安全、缓存、工具 prompt 质量 |
| **NanoBot** | WebUI、PWA、provider fallback、API 兼容、Feishu / Lark channel | Web 用户、移动端用户、企业 IM 集成者 | WebUI 体验和 provider/channel 稳定性并重 |
| **LobsterAI** | 桌面端产品化、OpenClaw 集成、Markdown / artifact、登录 onboarding | 桌面 AI 助手用户、内容编辑用户 | Electron + OpenClaw runtime，偏产品化封装和富文本体验 |
| **NanoClaw** | Slack / Mattermost、handoff、DB 稳定性、安全隐私、setup | 团队 IM 场景、多 Agent 协作用户 | 频道集成和 Agent-to-Agent handoff 较突出，强调生产部署安全 |
| **PicoClaw** | Mesh 网络、peer observability、SSE events | 边缘 / 分布式 Agent、网络调试用户 | libp2p mesh 架构，偏分布式网络与可观测性 |
| **NullClaw** | web_search 后端、外部搜索代理、成本治理 | 轻量个人部署用户、搜索增强 Agent 用户 | 当前更偏搜索能力抽象与第三方服务接入讨论 |
| **IronClaw** | Benchmark、failure taxonomy、模型质量归因 | 模型评测人员、Agent 研究者 | 评测驱动，偏 benchmark observability |
| **Moltis** | OAuth / PKCE、认证测试稳定性 | SaaS / OAuth 集成用户、平台维护者 | 当前活动集中在认证流程测试可靠性 |

### 核心差异总结

- **OpenClaw / Hermes / CoPaw** 是生态中的平台化主力，覆盖 CLI、Desktop、Gateway、Cron、插件、会话和多渠道。
- **ZeroClaw** 更偏底层 provider runtime、安全边界和开发者工具体验。
- **NanoBot / LobsterAI** 更偏用户界面和产品体验，分别侧重 Web/PWA 与 Desktop/artifact。
- **NanoClaw** 在 IM channel、多 Agent handoff、安全隐私方面更突出。
- **PicoClaw** 是分布式 mesh 路线的代表，技术关注点与其他项目明显不同。
- **NullClaw / IronClaw / Moltis** 当前更像专项项目，分别围绕搜索、评测、OAuth 测试稳定性推进。

---

## 6. 社区热度与成熟度

### 6.1 快速迭代阶段

代表项目：

- **Hermes Agent**
- **OpenClaw**
- **CoPaw**
- **ZeroClaw**

特征：

- Issue 和 PR 数量都较高；
- 真实用户反馈密集；
- P1 / high-risk 问题较多；
- 新功能和稳定性修复并行；
- 维护队列压力明显。

这些项目已经进入较成熟的真实使用阶段，但也因此暴露出复杂系统常见问题：状态同步、升级路径、权限审批、多入口并发、provider 兼容、消息投递可靠性。

### 6.2 质量巩固阶段

代表项目：

- **NanoBot**
- **LobsterAI**
- **NanoClaw**
- **Moltis**

特征：

- PR 主要围绕修复、测试、体验和依赖升级；
- 新功能较少或集中在小范围；
- 用户反馈没有第一梯队密集；
- 稳定性和产品化体验是主要目标。

其中 NanoBot 的移动端问题集中出现，说明其 WebUI/PWA 使用场景正在扩大；LobsterAI 则处于 runtime 和前端依赖升级窗口，需要特别关注兼容性回归；NanoClaw 正在补齐生产部署安全默认值。

### 6.3 规划 / 探索阶段

代表项目：

- **PicoClaw**
- **NullClaw**
- **IronClaw**

特征：

- 活动量较低；
- 主题集中；
- 社区讨论少；
- 以路线图、评测、集成提案为主。

PicoClaw 的 v0.10.0 sprint plan 和 mesh observability 说明它在有组织地推进分布式能力；NullClaw 的搜索代理讨论反映轻量部署用户对外部信息访问的需求；IronClaw 则以 benchmark failure taxonomy 支撑模型质量改进。

### 6.4 静默阶段

代表项目：

- **TinyClaw**
- **ZeptoClaw**

过去 24 小时无活动，无法判断其真实健康度。可能是维护周期较长、开发转移到其他渠道，或项目进入低维护状态。

---

## 7. 值得关注的趋势信号

### 趋势 1：智能体平台的竞争焦点转向“可靠性”，而非单纯功能数量

多个项目今日高优先级问题都与静默失败、消息丢失、升级失败、Cron 不执行、channel 阻塞有关：

- OpenClaw：reply lost、更新失败；
- Hermes：Cron 静默跳过、update marker 误报；
- CoPaw：ReAct max_iters 无最终回答、历史会话不可点击；
- ZeroClaw：Telegram update 阻塞；
- NanoClaw：DB 锁竞争误判为 corruption。

对开发者的参考价值：

> 智能体系统必须把状态机、错误可见性、失败恢复和审计证据作为一等能力。用户可以接受任务失败，但不能接受“无声失败”或“系统误导用户”。

---

### 趋势 2：工具权限和安全边界成为平台级刚需

AI 助手一旦接入 MCP、Shell、文件、IM channel、Cron，就会自然进入安全高风险区域。今日多个项目都暴露了安全边界问题：

- Cron toolset fail-open；
- public channel raw error 泄露；
- Desktop local API 匿名访问；
- destructive command 治理缺口；
- tool output 被提升为 provider image；
- skill logs 泄露 credentials。

对开发者的参考价值：

> 默认安全策略应是 fail-closed、least privilege、visibility-aware、audit-friendly。尤其是后台任务和无 TTY 场景，不能简单复用交互式审批模型。

---

### 趋势 3：Provider 生态进入“兼容性治理”阶段

OpenAI-compatible、NIM、new-api、OpenCode、Anthropic、多模态 provider、search provider 等都出现了兼容性问题。用户已经不满足于单一模型接入，而是需要：

- fallback；
- model allowlist；
- provider-qualified config；
- vision capability 检查；
- token budget；
- search backend 可插拔；
- timeout 和错误分类兼容。

对开发者的参考价值：

> Provider adapter 层需要从简单 HTTP 包装升级为具备 capability、error taxonomy、fallback policy、cost control 和 request validation 的治理层。

---

### 趋势 4：Cron / 后台任务正在成为个人 AI 助手的核心能力

Hermes、CoPaw、NanoBot、NanoClaw 都在处理 Cron 或任务状态相关问题。这说明用户正在把 AI 助手用于：

- 周期报告；
- 自动巡检；
- 消息监控；
- 后台下载；
- 定时提醒；
- 多渠道自动处理。

对开发者的参考价值：

> Cron 不应只是“定时触发 prompt”，而应具备调度语义、执行历史、失败记录、权限边界、结果检查和 UI 可见性。

---

### 趋势 5：AI 助手 UI 正在从桌面优先走向多端一致

NanoBot 的 iOS PWA 问题、Hermes 和 CoPaw 的 Desktop 状态问题、LobsterAI 的登录 onboarding 和 Markdown artifact、OpenClaw 的 Settings UX，都说明前端体验正成为竞争点。

关键需求包括：

- PWA 冷启动性能；
- touch interaction；
- safe-area / standalone 渲染；
- Desktop 后台任务状态；
- artifact 文件预览；
- Markdown / math / table 渲染；
- 设置页 autosave 可靠性。

对开发者的参考价值：

> AI 助手的前端不再只是“聊天框”，而是任务控制台、文件交付面板、插件管理器、模型配置中心和后台任务监控台。

---

### 趋势 6：组织级 Hub 与多租户治理正在加速出现

CoPaw 的 Hub 托管模型、成员邀请、Token 预算，Hermes 的 allowed model picker，OpenClaw 的 Settings / Agent 配置，NanoClaw 的 mission control 和 handoff ledger，都指向更强的组织级治理需求。

对开发者的参考价值：

> 下一阶段开源 AI 助手会从个人工具走向团队平台。模型权限、预算、审计、成员 onboarding、共享配置、Agent handoff 将成为关键能力。

---

### 趋势 7：可观测性成为复杂智能体系统的底座

PicoClaw 的 mesh observability、OpenClaw 的 Gateway 性能重构、Hermes 的 update receipt / state.db evidence、ZeroClaw 的 CI risk classifier、IronClaw 的 benchmark taxonomy，都体现出可观测性的重要性。

对开发者的参考价值：

> 智能体系统需要同时具备运行时可观测性、任务可观测性、模型行为可观测性和供应链 / CI 风险可观测性。没有证据链的智能体平台很难在生产环境中建立信任。

---

## 结论

今日生态最核心的判断是：**个人 AI 助手与自主智能体项目正在从“功能扩张期”进入“可靠性、治理和产品化体验并重”的阶段。**

OpenClaw 作为核心参照项目，具备高工程活跃度和平台化基础设施优势，但也面临升级、消息可靠性、Gateway 性能和插件兼容性等平台级压力。Hermes Agent、CoPaw、ZeroClaw 与 OpenClaw 共同构成高活跃第一梯队，正在推动智能体系统向更复杂、更真实、更生产化的场景演进。

对技术决策者而言，当前选型不应只看功能列表，更应重点评估：

1. 会话和消息是否可靠；
2. 工具权限是否默认安全；
3. Provider 兼容和 fallback 是否成熟；
4. Cron / 后台任务是否可审计；
5. Desktop / Web / PWA 体验是否稳定；
6. 插件和多租户治理是否具备长期扩展性。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报｜2026-09-15

## 1. 今日速览

过去 24 小时 NanoBot 活跃度较高：共有 **4 条 Issue 更新**、**12 条 PR 更新**，但 **无新版本发布**。  
今日新增 Issue 全部集中在 **WebUI / 移动端 / iOS PWA 体验问题**，说明近期用户在移动场景下的使用频率提升，同时也暴露出 PWA 首屏、侧边栏交互和视觉渲染方面的体验短板。  
PR 侧以 **Bug 修复、稳定性增强、测试补充** 为主，涉及 provider fallback、API 参数校验、cron 调度、Feishu 登录、工具调用恢复等核心路径，整体呈现出明显的“质量收敛期”特征。  
当前 **9 个 PR 仍待合并**，**3 个 PR 已关闭/完成处理**，Issue 暂无关闭，维护者需要继续关注移动端 WebUI 反馈与一批 P2/P1 修复 PR 的评审节奏。

---

## 2. 项目进展

今日无版本发布，但 PR 层面推进明显，重点集中在稳定性与 WebUI 修复。

### 已关闭 / 已完成处理的 PR

#### 1. 修复 `edit_file` 行边界问题，统一成功摘要  
- PR：[#5761](https://github.com/HKUDS/nanobot/pull/5761)  
- 状态：Closed  
- 标签：`bug`, `regression`, `fix`, `test`, `priority: p2`

该 PR 修复了 `edit_file` 在处理带有行内后缀的内容时，可能误删换行符、导致相邻行拼接并破坏文件内容的问题。  
同时统一了 `edit_file` 与 `apply_patch` 的成功响应摘要，使 WebUI diff 展示与编辑统计更加一致。

**影响评估：**
- 属于文件编辑工具链的回归修复；
- 对代码修改类 agent 工作流可靠性有直接帮助；
- 有助于降低自动编辑文件时的隐性内容损坏风险。

---

#### 2. WebUI 聊天工具栏自适应宽度  
- PR：[#5760](https://github.com/HKUDS/nanobot/pull/5760)  
- 状态：Closed  
- 标签：`bug`, `webui`, `fix`, `test`, `priority: p2`

该 PR 针对聊天头部 / 工具栏在不同宽度下的布局问题进行适配：在宽屏时保持右侧边距中的紧凑工具栏，在窄屏或多面板显示时避免浮动控件遮挡消息内容。

**影响评估：**
- 改善 WebUI 响应式布局；
- 与今日多条移动端 WebUI Issue 方向一致；
- 可能为后续移动端侧边栏和 PWA 体验修复打下基础。

---

#### 3. 修复 Markdown 文件预览中表格源码换行异常  
- PR：[#5759](https://github.com/HKUDS/nanobot/pull/5759)  
- 状态：Closed  
- 标签：`bug`, `webui`, `fix`, `test`, `priority: p2`

该 PR 修复 Markdown 文件预览中 Prism 高亮产生的 `table` token class 被 Tailwind 的 `display: table` 样式影响，导致表格源码中的 token 被逐行堆叠的问题。

**影响评估：**
- 改善文件预览可读性；
- 对 Markdown 文档、README、表格内容较多的项目查看体验有直接帮助；
- 属于 WebUI 细节稳定性修复。

---

### 待合并但值得关注的关键 PR

#### 1. 恢复 archive tool calls，避免过早进入 RAW fallback  
- PR：[#5774](https://github.com/HKUDS/nanobot/pull/5774)  
- 状态：Open  
- 标签：`bug`, `fix`, `test`, `priority: p2`

该 PR 处理 archive 请求意外产生 tool calls 的场景，通过返回非执行结果并重试一次来恢复流程，同时复用 `ProviderConversationStateController` 进行 native continuation。  
这是与 memory / archive / provider continuation 相关的稳定性修复。

---

#### 2. provider fallback 支持 NIM 风格 timeout 错误  
- PR：[#5769](https://github.com/HKUDS/nanobot/pull/5769)  
- 状态：Open  
- 标签：`bug`, `provider`, `fix`, `test`, `priority: p2`

该 PR 将 timeout 判断从异常类名扩展到异常消息文本，例如 NVIDIA NIM 返回的 `timed out after 300s`。  
同时允许 `FallbackProvider` 在部分 timeout / connection 错误中切换模型，即便 `error_should_retry` 为 false。

**意义：**
- 提升多模型 fallback 的鲁棒性；
- 对使用 NVIDIA NIM 或类似封装 provider 的用户较重要；
- 有助于减少长时间模型超时导致的请求失败。

---

#### 3. Feishu / Lark QR 登录修复  
- PR：[#5768](https://github.com/HKUDS/nanobot/pull/5768)  
- 状态：Open  
- 标签：`bug`, `provider`, `channel`, `fix`, `test`, `priority: p1`

该 PR 将 Feishu CLI 登录 QR onboarding 的验证 URL 调整为 `/page/cli`，修复扫码后立即显示 “Link expired” 的问题。

**意义：**
- P1 优先级；
- 直接影响 Feishu / Lark channel 登录可用性；
- 若问题普遍存在，应优先评审与合并。

---

#### 4. WebUI 增加波兰语本地化  
- PR：[#5767](https://github.com/HKUDS/nanobot/pull/5767)  
- 状态：Open  
- 标签：`webui`, `feature`, `test`, `priority: p2`

该 PR 新增 Polish (`pl`) 语言，覆盖 WebUI 语言选择器、1,536 条 common messages 以及 17 个内置 channel 配置面板中的 497 条消息。

**意义：**
- 是今日最明确的功能性增强；
- 说明项目国际化仍在持续推进；
- 若测试通过，较可能进入后续小版本。

---

## 3. 社区热点

今日没有出现高评论数或高点赞数讨论：  
- 4 条 Issue 评论数均为 **0**，点赞数均为 **0**；
- PR 数据中的评论数为 `undefined`，点赞数均为 **0**。

因此，今日“热点”更多体现为 **主题聚集度**，而不是讨论热度。

### 热点主题一：移动端 WebUI / iOS PWA 体验集中反馈

相关 Issue：

1. [#5773 - PWA cold start shows a long blank screen before first paint](https://github.com/HKUDS/nanobot/issues/5773)  
2. [#5772 - Top of the viewport renders washed out in iOS PWA standalone mode](https://github.com/HKUDS/nanobot/issues/5772)  
3. [#5771 - Session list requires two taps to open a session on mobile](https://github.com/HKUDS/nanobot/issues/5771)  
4. [#5770 - Opening the mobile sidebar focuses the search button and shows the "Search ⌘K" tooltip](https://github.com/HKUDS/nanobot/issues/5770)

**背后诉求：**
- 用户正在把 NanoBot WebUI 当作移动端 / PWA 使用，而不仅是桌面 Web 应用；
- 首屏加载、触控交互、iOS standalone 渲染、侧边栏行为成为核心体验指标；
- 当前 WebUI 在 mobile-first 和 PWA polish 方面还有明显改进空间。

---

### 热点主题二：Provider fallback 与外部服务稳定性

相关 PR：

- [#5769](https://github.com/HKUDS/nanobot/pull/5769) - NIM-style timeout failover  
- [#5764](https://github.com/HKUDS/nanobot/pull/5764) - serialize half-open fallback probes  
- [#5768](https://github.com/HKUDS/nanobot/pull/5768) - Feishu QR onboarding URL 修复

**背后诉求：**
- 用户需要 NanoBot 在多模型、多 provider、多 channel 场景下更可靠；
- fallback 不仅要处理标准异常，也要适配第三方服务返回的非标准错误包装；
- channel 登录链路一旦失败，会直接阻断用户接入。

---

## 4. Bug 与稳定性

以下按影响范围与严重程度排序。

### P1 / 高优先级

#### 1. Feishu / Lark CLI 登录二维码验证失败  
- PR：[#5768](https://github.com/HKUDS/nanobot/pull/5768)  
- 状态：Open，已有 fix PR  
- 标签：`priority: p1`

问题表现为 `nanobot channels login feishu` 扫码后页面立即提示 “Link expired”，即使在二维码生成后 5–10 秒内扫码也失败。

**影响：**
- 阻断 Feishu / Lark channel onboarding；
- 对依赖企业协作工具集成的用户影响较大。

---

### P2 / 中高优先级

#### 2. iOS PWA 冷启动首屏长时间空白  
- Issue：[#5773](https://github.com/HKUDS/nanobot/issues/5773)  
- 状态：Open  
- 是否已有 fix PR：未见直接对应 PR

用户反馈从主屏幕图标冷启动 PWA 时，首次渲染前存在明显空白屏，且比 Safari 中直接打开同一页面更慢。

**影响：**
- 影响 PWA 可用性和感知性能；
- 对移动端高频用户影响明显；
- 建议排查 service worker、bundle hydration、首屏 shell、iOS standalone preload 行为。

---

#### 3. 移动端 Session 列表需要点击两次才打开会话  
- Issue：[#5771](https://github.com/HKUDS/nanobot/issues/5771)  
- 状态：Open  
- 是否已有 fix PR：未见直接对应 PR

用户在手机侧边栏点击 session row 时，第一次点击无明显效果，需要第二次点击才真正打开会话。

**影响：**
- 明显的触控交互问题；
- 用户容易误判为列表卡死或点击无效；
- 可能与 focus、hover emulation、pointer event、sidebar transition 或 click-away 逻辑有关。

---

#### 4. iOS PWA standalone 模式顶部视口发白 / 半透明  
- Issue：[#5772](https://github.com/HKUDS/nanobot/issues/5772)  
- 状态：Open  
- 是否已有 fix PR：未见直接对应 PR

用户报告 iOS PWA standalone 模式下，顶部区域，包括 sidebar toggle、右侧控制区以及下方消息内容，看起来发白、半透明或模糊。

**影响：**
- 影响视觉一致性；
- 可能涉及 iOS safe-area、backdrop-filter、translucent header、viewport meta 或 PWA status bar 样式；
- 与移动端 PWA 质量直接相关。

---

#### 5. 移动端打开侧边栏时自动显示 `Search ⌘K` tooltip  
- Issue：[#5770](https://github.com/HKUDS/nanobot/issues/5770)  
- 状态：Open  
- 是否已有 fix PR：未见直接对应 PR

用户在手机上打开侧边栏后，搜索按钮下方自动出现白色 `Search ⌘K` pill，像是默认弹出了搜索框。

**影响：**
- 属于移动端 hover / focus 状态误触发；
- 对用户而言是 UI 噪音；
- 建议在 touch device 上禁用 hover tooltip，或避免 sidebar open 时自动 focus 搜索按钮。

---

### Provider / API / Cron 稳定性修复 PR

#### 6. NIM 风格 timeout 未触发 fallback  
- PR：[#5769](https://github.com/HKUDS/nanobot/pull/5769)  
- 状态：Open，已有 fix PR  
- 影响：LLM provider timeout 后无法正确切换模型。

#### 7. FallbackProvider half-open 探测并发过多  
- PR：[#5764](https://github.com/HKUDS/nanobot/pull/5764)  
- 状态：Open，已有 fix PR  
- 影响：主 provider 冷却结束后，多个并发请求可能同时打到恢复中的 primary，削弱 circuit breaker 效果。

#### 8. OpenAI-compatible API `stream` 参数接受非 boolean  
- PR：[#5765](https://github.com/HKUDS/nanobot/pull/5765)  
- 状态：Open，已有 fix PR  
- 影响：例如 `"stream": "false"` 会因 Python truthiness 被误判为 true，导致意外进入 SSE 模式。

#### 9. multimodal 字段类型错误返回码不准确  
- PR：[#5763](https://github.com/HKUDS/nanobot/pull/5763)  
- 状态：Open，已有 fix PR  
- 影响：格式错误的多模态 JSON 字段应返回 400，而不是与文件过大等场景混淆。

#### 10. cron tool 接受互斥调度字段组合  
- PR：[#5766](https://github.com/HKUDS/nanobot/pull/5766)  
- 状态：Open，已有 fix PR  
- 影响：`every_seconds`、`cron_expr`、`at` 同时存在时，旧逻辑会静默选择第一个 truthy 字段，导致实际任务行为与用户预期不符。

#### 11. cron tool 接受过去时间的一次性任务  
- PR：[#5762](https://github.com/HKUDS/nanobot/pull/5762)  
- 状态：Open，已有 fix PR  
- 影响：过去时间的 `at` 会创建永不触发的 enabled job。

---

## 5. 功能请求与路线图信号

### 明确功能增强：WebUI 波兰语本地化

- PR：[#5767](https://github.com/HKUDS/nanobot/pull/5767)  
- 状态：Open  
- 类型：Feature  
- 可能进入下一版本：较高

该 PR 覆盖 WebUI 主界面和 17 个 channel 配置面板，说明项目国际化体系已经比较成熟，社区贡献者可以直接扩展语言包。  
如果维护者对翻译质量和测试通过情况认可，该功能很可能进入下一个小版本或 patch 版本。

---

### 路线图信号一：移动端 / PWA 体验可能成为近期重点

今日全部新增 Issue 都来自 WebUI 移动端或 iOS PWA 场景：

- [#5773](https://github.com/HKUDS/nanobot/issues/5773) - PWA 冷启动空白  
- [#5772](https://github.com/HKUDS/nanobot/issues/5772) - iOS standalone 顶部发白  
- [#5771](https://github.com/HKUDS/nanobot/issues/5771) - Session 需要双击  
- [#5770](https://github.com/HKUDS/nanobot/issues/5770) - 搜索 tooltip 自动出现

这表明用户对 NanoBot 的使用场景正在从桌面扩展到移动设备，尤其是 iOS PWA。  
建议维护者将 WebUI 移动体验作为一个独立质量主题处理，而不是分散修补。

---

### 路线图信号二：OpenAI-compatible API 严格兼容性增强

相关 PR：

- [#5765](https://github.com/HKUDS/nanobot/pull/5765)  
- [#5763](https://github.com/HKUDS/nanobot/pull/5763)

这两项都指向 API 边界行为的严格化：  
- 非 boolean `stream` 应被拒绝；  
- malformed multimodal JSON 应返回 400；  
- 413 应保留给真正的文件过大场景。

说明项目正在强化兼容 OpenAI API 的细节一致性，有利于第三方客户端、SDK 和自动化测试接入。

---

## 6. 用户反馈摘要

今日 Issue 评论数均为 0，因此无法从讨论串中提炼多方观点；但从 Issue 描述本身可以总结出以下真实用户痛点。

### 1. 用户希望 PWA 像原生应用一样快速可见

- Issue：[#5773](https://github.com/HKUDS/nanobot/issues/5773)

用户明确对比了“从主屏幕图标启动 PWA”和“在 Safari 中打开同一页面”的速度差异。  
这说明用户对 NanoBot PWA 的预期已经接近原生 App：点击图标后应尽快看到界面，而不是长时间空白。

---

### 2. 用户对移动端触控反馈非常敏感

- Issue：[#5771](https://github.com/HKUDS/nanobot/issues/5771)

“第一次点击无效，第二次才打开”会让用户认为界面没有响应。  
这类问题虽然不一定造成数据错误，但会显著降低移动端可信度。

---

### 3. iOS standalone 模式下的视觉细节影响专业感

- Issue：[#5772](https://github.com/HKUDS/nanobot/issues/5772)

顶部发白、半透明或模糊会让用户感到界面不稳定、不完整。  
尤其是在 PWA standalone 模式中，系统状态栏、safe area、backdrop blur 与应用 header 的组合很容易产生平台特定问题。

---

### 4. 桌面式 hover / 快捷键提示不应直接迁移到触屏场景

- Issue：[#5770](https://github.com/HKUDS/nanobot/issues/5770)

`Search ⌘K` 对桌面用户是快捷入口提示，但在手机上自动显示会被理解为异常弹窗或默认搜索框。  
这表明 WebUI 需要更明确地区分 desktop interaction 与 touch interaction。

---

## 7. 待处理积压

本次数据只覆盖过去 24 小时，未提供长期未响应 Issue / PR 的创建时间、最后维护者回复时间或历史评论情况，因此无法可靠判断“长期积压”。

但从当前快照看，以下待处理项值得维护者优先关注：

### 优先评审

1. [#5768](https://github.com/HKUDS/nanobot/pull/5768) - Feishu QR onboarding 修复，`priority: p1`  
2. [#5769](https://github.com/HKUDS/nanobot/pull/5769) - provider timeout fallback 修复  
3. [#5764](https://github.com/HKUDS/nanobot/pull/5764) - fallback half-open 并发探测序列化  
4. [#5774](https://github.com/HKUDS/nanobot/pull/5774) - memory archive tool calls 恢复逻辑

### 优先分流 / 复现

1. [#5773](https://github.com/HKUDS/nanobot/issues/5773) - PWA 冷启动空白  
2. [#5771](https://github.com/HKUDS/nanobot/issues/5771) - mobile session 双击问题  
3. [#5772](https://github.com/HKUDS/nanobot/issues/5772) - iOS PWA 顶部发白  
4. [#5770](https://github.com/HKUDS/nanobot/issues/5770) - mobile sidebar tooltip 自动出现

---

## 总体健康度评估

NanoBot 今日项目健康度整体为 **良好但存在移动端体验风险**。  
维护活动活跃，PR 数量充足，且多数 PR 带有测试标签，说明工程质量意识较强。  
不过，Issue 侧今日全部集中在 WebUI / iOS PWA，且目前尚未看到直接对应 fix PR，建议维护者尽快确认复现并建立移动端回归测试路径。  
短期内，若能合并 P1 Feishu 修复、provider fallback 修复以及 API / cron 校验类 PR，项目稳定性会有明显提升；若同步处理 PWA 首屏和触控交互问题，则下一版本的用户体验改善会更明显。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
**日期：2026-09-15**  
**仓库：NousResearch/hermes-agent**  
**统计窗口：过去 24 小时**

---

## 1. 今日速览

过去 24 小时 Hermes Agent 活跃度非常高：Issues 更新 50 条，其中 45 条仍处于新开或活跃状态，5 条关闭；PR 更新 50 条，其中 47 条仍待合并，3 条已合并或关闭。项目刚发布 **v2026.9.14 / Hermes Agent v0.21.3**，但发布后社区迅速集中反馈了更新流程、Desktop、Cron、会话状态、网关与工具权限等稳定性问题。

今日问题分布显示，项目当前正处在 **高频迭代后的稳定化阶段**：大量 Issue 不是纯新功能，而是围绕 v0.21.3 升级后的兼容性、状态恢复、消息投递、自动化任务可靠性展开。与此同时，多个修复 PR 已快速跟进，例如 allowed model picker、MCP trust approvals、cron monitor sanitization、TUI session agent crash 等，说明维护响应速度较快，但待合并队列压力较大。

---

## 2. 版本发布

### v2026.9.14：Hermes Agent v0.21.3

- Release：[`v2026.9.14`](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.14)
- 发布时间：2026-09-14
- 版本类型：Patch release
- 版本说明摘要：该版本汇总了自 v0.21.2 以来约 **338 个已合并 PR**，用于为下游消费者提供稳定标签，包括 Docker 镜像、Hermes Cloud、托管部署等场景。

#### 主要意义

v0.21.3 更像是一个 **稳定标签与部署对齐版本**，用于将此前主干上的大量修复和功能整理成可供外部部署使用的版本。Release 描述中特别提到 remote-gateway sign-in 相关修复，说明该版本重点之一是改善远程网关登录路径。

#### 迁移与升级注意事项

从今日 Issues 看，v0.21.3 发布后暴露出若干升级与运行时问题，建议升级用户重点关注：

1. **`hermes update` 后残留 `fleet_restart_pending` 标记**
   - Issue：[#111272](https://github.com/NousResearch/hermes-agent/issues/111272)
   - 影响：升级已成功、网关也已重启，但 CLI 启动和 `hermes doctor` 仍提示“running gateways did not restart”的误报。
   - 风险：造成用户误判升级失败，影响自动化运维判断。

2. **Desktop 场景下更新重启机制可能不可完成**
   - Issue：[#111494](https://github.com/NousResearch/hermes-agent/issues/111494)
   - 影响：Desktop-supervised `serve` 后端在更新流程中被要求重启，但重启阶段又被策略禁止执行，导致更新退出 1 并重新设置 `fleet_restart_pending`。

3. **SQLite runtime repair 状态未写入 update receipt**
   - Issue：[#111497](https://github.com/NousResearch/hermes-agent/issues/111497)
   - Fix PR：[#111521](https://github.com/NousResearch/hermes-agent/pull/111521)
   - 影响：机器可读的更新收据无法反映 SQLite runtime repair 是否失败，降低排障可观测性。

4. **uv.lock 与 Hermes bundled uv 版本不匹配，可能无法修复易受影响 SQLite runtime**
   - Issue：[#111417](https://github.com/NousResearch/hermes-agent/issues/111417)
   - 影响：`hermes update` 可能无法修复存在安全或兼容风险的 SQLite runtime。

#### 破坏性变更

从 Release 说明和今日数据中未看到明确标注的破坏性变更。但实际升级反馈表明，**更新流程、Desktop 后端重启、SQLite runtime 修复、profile/secret scoping** 等路径可能出现行为变化或兼容性问题，建议生产环境用户先在非关键实例验证。

---

## 3. 项目进展

今日 PR 队列非常活跃，但多数仍处于待合并状态。已关闭或可能已处理的重要 PR 包括：

### 3.1 Cron heartbeat 测试确定性修复

- PR：[#111539](https://github.com/NousResearch/hermes-agent/pull/111539)  
- 状态：Closed  
- 关联问题：[#111471](https://github.com/NousResearch/hermes-agent/issues/111471)  
- 类型：测试稳定性修复  
- 内容：将 cron heartbeat 测试从依赖真实时间的小毫秒窗口，改为使用 fake time，避免 Windows/macOS 计时器分辨率导致 flaky。  
- 推进意义：提升 CI 稳定性，降低跨平台测试误报。

### 3.2 配置缓存签名检测文件替换

- PR：[#111532](https://github.com/NousResearch/hermes-agent/pull/111532)  
- 状态：Closed  
- 类型：配置兼容性修复  
- 内容：将文件签名从 `(mtime_ns, size)` 扩展为包含 `inode` 和 `ctime_ns`，以检测 `cp -p`、`rsync -t` 等保留 mtime 和 size 的文件替换。  
- 推进意义：修复配置热加载或缓存失效判断不准确的问题，尤其对自动化部署、配置同步场景重要。

### 3.3 待合并但重要的推进方向

虽然仍未合并，但以下 PR 已经形成明确修复路径：

1. **Allowed Model Picker / 模型白名单**
   - PR：[#111543](https://github.com/NousResearch/hermes-agent/pull/111543)
   - 对应需求：[#111540](https://github.com/NousResearch/hermes-agent/issues/111540)
   - 涉及 CLI、Gateway、TUI、ACP、Dashboard、Desktop。
   - 价值：允许用户只显示和选择少量批准模型，降低多 provider 环境下的选择成本。

2. **TUI/Desktop session agent 为 None 时避免崩溃**
   - PR：[#111534](https://github.com/NousResearch/hermes-agent/pull/111534)
   - Fixes：[#111531](https://github.com/NousResearch/hermes-agent/issues/111531)
   - 价值：将 silent crash 转为明确失败，避免用户 prompt 被静默丢弃。

3. **MCP trust approvals 支持 API run**
   - PR：[#111529](https://github.com/NousResearch/hermes-agent/pull/111529)
   - 对应 Issue：[#111526](https://github.com/NousResearch/hermes-agent/issues/111526)
   - 价值：让 `/v1/runs` 等无 TTY 场景可以完成 MCP 写操作审批，而不是立即 deny。

4. **Cron monitor 输出扫描逻辑修正**
   - PR：[#111528](https://github.com/NousResearch/hermes-agent/pull/111528)
   - 对应 Issue：[#111523](https://github.com/NousResearch/hermes-agent/issues/111523)
   - 价值：避免真实运行数据中的 bidi/invisible 字符被当作恶意 prompt 注入，导致 cron job 永久阻塞。

5. **Nous Tool Gateway 搜索失败后的 keyless rescue**
   - PR：[#111533](https://github.com/NousResearch/hermes-agent/pull/111533)
   - 对应 Issue：[#111530](https://github.com/NousResearch/hermes-agent/issues/111530)
   - 价值：恢复无 key 场景下 web search 的自动兜底能力。

总体来看，项目今日主要前进方向是：**修复 v0.21.3 发布后暴露的稳定性问题、提高自动化任务可靠性、完善无交互场景的审批与错误处理、改善模型选择与插件能力。**

---

## 4. 社区热点

以下是今日讨论最活跃或信号最强的 Issue/PR。

### 4.1 state.db / WAL reliability：会话状态可靠性成为核心关注点

- Issue：[#111389](https://github.com/NousResearch/hermes-agent/issues/111389)  
- 评论数：3  
- 标签：`type/refactor`, `comp/agent`, `area/sessions`, `sweeper:risk-session-state`  
- 状态：Open  

该 Issue 聚焦 `$HERMES_HOME/state.db` 的 SQLite session store 和 WAL 可靠性。Gateway、CLI、Cron、Desktop 都共享该数据库，因此任何锁、写入失败、WAL checkpoint 或崩溃恢复问题都会跨组件放大。

**背后诉求：**
- 用户希望 Hermes 在多入口并发使用时不丢会话、不损坏状态。
- Desktop、CLI、cron、gateway 同时运行已成为常态，状态层必须具备更强的恢复与证据记录能力。
- `landing-evidence style` 表明社区不只需要修复，还希望有可验证、可审计的落地证据。

### 4.2 macOS 原生测试失败：跨平台稳定性压力增加

- Issue：[#111299](https://github.com/NousResearch/hermes-agent/issues/111299)  
- 评论数：3  
- 标签：`type/bug`, `comp/cli`, `area/config`  
- 状态：Open  

报告者在 macOS arm64 + Python 3.11.15 环境复现了 relay traceparent 与 Hermes-home 权限相关的测试失败。

**背后诉求：**
- macOS arm64 已是重要开发者平台。
- 项目需要保证本地测试与 CI 在 macOS 上具有一致性。
- 权限和 tracing 相关问题可能影响调试链路与本地开发体验。

### 4.3 更新成功后仍提示网关未重启：升级体验信任受损

- Issue：[#111272](https://github.com/NousResearch/hermes-agent/issues/111272)  
- 评论数：3  
- 标签：`type/bug`, `comp/cli`, `comp/gateway`, `area/install-update`  
- 状态：Open  

用户从 v0.20.6 升级到 v0.21.3 后，实际 gateway 已运行新版本，但 `fleet_restart_pending` 标记未清理，导致每次 CLI 启动与 `hermes doctor` 都输出误导性警告。

**背后诉求：**
- 用户需要升级状态具备确定性。
- `doctor` 输出必须高度可信，否则会降低运维信心。
- fleet 管理逻辑需要避免“状态标记存在即报警”的过度简化。

### 4.4 Desktop post-tool compression gap：用户感知为“卡死”

- Issue：[#111294](https://github.com/NousResearch/hermes-agent/issues/111294)  
- 评论数：2  
- 标签：`type/bug`, `comp/agent`, `comp/desktop`, `area/sessions`, `area/compression`  
- 状态：Open  

Desktop 在工具调用后可能长时间显示无标签 spinner，用户不知道系统是在压缩上下文、等待模型、还是已经卡死。

**背后诉求：**
- Desktop 用户强烈需要可见状态与进度提示。
- 长上下文压缩、tool result 后处理等后台步骤需要明确 UI 表达。
- Stop + continue 才能恢复的体验会被用户视为可靠性问题。

### 4.5 Bot Mode 群聊上限配置化

- Issue：[#111406](https://github.com/NousResearch/hermes-agent/issues/111406)  
- 评论数：2  
- 状态：Closed，Duplicate  
- 标签：`type/feature`, `comp/plugins`, `comp/desktop`  

诉求是让 Bot Mode group chat 的 rounds、messages、continuation caps 从硬编码常量变为配置项。

**背后诉求：**
- 多智能体群聊使用场景正在变复杂。
- 固定轮次限制阻碍长链路协作。
- 用户希望按场景调节成本、延迟与协作深度。

---

## 5. Bug 与稳定性

按严重程度与影响面排序如下。

### P1 / 高风险

#### 5.1 Cron 定时任务静默跳过，且 next_run 被推进

- Issue：[#111414](https://github.com/NousResearch/hermes-agent/issues/111414)  
- 状态：Open  
- 标签：`type/bug`, `comp/cron`, `P1`, `sweeper:risk-automation`  
- Fix PR：未在当前数据中看到直接对应 PR  

问题描述：一个 weekly cron job 到点后未运行，没有 dispatch，没有错误记录，但 `next_run` 被推进，并且 `scheduled_instant` 被回填到旧行。

**影响：**
- 自动化任务可能静默丢失。
- 用户无法通过错误记录发现失败。
- 对生产自动化、定时巡检、通知类任务影响严重。

#### 5.2 Cron toolset 解析失败时 fail-open 到完整默认工具集

- Issue：[#111380](https://github.com/NousResearch/hermes-agent/issues/111380)  
- 状态：Open  
- 标签：`type/security`, `comp/tools`, `comp/cron`, `area/config`  
- Fix PR：未在当前数据中看到直接对应 PR  

问题描述：cron job 没有 per-job `enabled_toolsets` 时，如果 `_get_platform_tools(cfg, "cron")` 抛错，逻辑会 fallback 到 full default toolset。

**影响：**
- 这是安全边界问题。
- 预期应 fail-closed，但实际可能 fail-open。
- 对无人值守 cron 任务尤其敏感。

---

### P2 / 中高风险

#### 5.3 API Server 大上下文 preflight compression 期间零 SSE 输出，远程客户端超时后 hard-kill turn

- Issue：[#111512](https://github.com/NousResearch/hermes-agent/issues/111512)  
- 状态：Open  
- 标签：`comp/gateway`, `area/streaming`, `area/compression`, `sweeper:risk-message-delivery`  
- Fix PR：未看到直接对应 PR  

**影响：**
- 远程客户端如 Android app 经 Cloudflare Tunnel 连接时可能超时。
- 断连会导致 turn 被硬杀。
- 暴露了大上下文压缩期间缺少 keepalive / progress event 的问题。

#### 5.4 Desktop/TUI session agent 为 None 导致 prompt 静默丢弃

- Issue：[#111531](https://github.com/NousResearch/hermes-agent/issues/111531)  
- Fix PR：[#111534](https://github.com/NousResearch/hermes-agent/pull/111534)  
- 状态：Issue Open，PR Open  
- 标签：`comp/tui`, `comp/desktop`, `sweeper:risk-session-state`  

**影响：**
- 用户输入被接受后 turn thread 崩溃。
- prompt 未持久化，用户感知为“消息消失”。
- PR 已将崩溃路径转为显式失败，是优先合并候选。

#### 5.5 MCP trust-gate approvals 在 `/v1/runs` 与 Kanban workers 中不可达

- Issue：[#111526](https://github.com/NousResearch/hermes-agent/issues/111526)  
- Fix PR：[#111529](https://github.com/NousResearch/hermes-agent/pull/111529)  
- 状态：Issue Open，PR Open  
- 标签：`comp/tools`, `comp/cron`, `tool/mcp`, `P2`  

**影响：**
- 无 TTY 场景无法批准 untrusted MCP 写操作。
- API server 和 Kanban worker 自动化路径功能受限。
- PR 已提供 approval routing 修复。

#### 5.6 Cron monitor_script 输出被 STRICT prompt scanner 阻塞

- Issue：[#111523](https://github.com/NousResearch/hermes-agent/issues/111523)  
- Fix PR：[#111528](https://github.com/NousResearch/hermes-agent/pull/111528)  
- 状态：Issue Open，PR Open  
- 标签：`comp/cron`, `P2`  

**影响：**
- 正常业务数据中的 Unicode 控制字符会永久阻塞 job。
- 典型场景包括 WhatsApp 联系人标签。
- PR 已区分“用户 prompt”和“运行时数据”的扫描策略。

#### 5.7 llama.cpp 新版本移除 `-dio` 后 managed llama-server 无法启动

- Issue：[#111323](https://github.com/NousResearch/hermes-agent/issues/111323)  
- 状态：Open  
- 标签：`comp/agent`, `comp/cli`, `P2`  
- Fix PR：未看到直接对应 PR  

**影响：**
- 本地模型运行时无法启动。
- 对需要新 llama.cpp 支持新模型架构的用户影响较大。

#### 5.8 Feishu multiplex secondary profile 群消息静默丢弃

- Issue：[#111420](https://github.com/NousResearch/hermes-agent/issues/111420)  
- 相关 PR：[#111538](https://github.com/NousResearch/hermes-agent/pull/111538)  
- 状态：Issue Open，PR Open  
- 标签：`comp/plugins`, `platform/feishu`, `area/profiles`, `sweeper:risk-message-delivery`  

**影响：**
- 升级 0.21.0 → 0.21.3 后，secondary profile 的 Feishu 群消息被静默 drop。
- DMs 正常，导致用户误判为连接或平台问题。
- PR #111538 主要增加诊断 warning，但保留 fail-closed 策略；可能还需后续行为修复或迁移说明。

---

### P3 / 中低风险但影响体验

#### 5.9 Desktop GitHub auth timeout 遗留子进程并重复 probe

- Issue：[#111509](https://github.com/NousResearch/hermes-agent/issues/111509)  
- 状态：Open  
- 标签：`comp/desktop`, `comp/dashboard`  

影响：可能产生 orphan process 和重复认证探测，影响资源使用与桌面体验。

#### 5.10 Desktop Archived view 不响应外部归档/取消归档

- Issue：[#111397](https://github.com/NousResearch/hermes-agent/issues/111397)  
- 状态：Open  
- 标签：`comp/desktop`, `area/sessions`  

影响：多窗口、CLI、gateway 或 cron 修改 session 状态时，Desktop 归档视图不自动刷新。

#### 5.11 `/status` 在 session-only `/model` switch 后显示 occupancy-only context

- Issue：[#111436](https://github.com/NousResearch/hermes-agent/issues/111436)  
- 状态：Open  
- 标签：`comp/gateway`  

影响：模型切换后的状态展示不完整，Anthropic-messages validator 也存在误导性 warning。

#### 5.12 web search 经 Nous Tool Gateway 时 keyless rescue 不触发

- Issue：[#111530](https://github.com/NousResearch/hermes-agent/issues/111530)  
- Fix PR：[#111533](https://github.com/NousResearch/hermes-agent/pull/111533)  
- 状态：Issue Open，PR Open  

影响：无 provider key 的用户在 Nous Tool Gateway 路由失败后无法自动兜底到 keyless ring。

---

## 6. 功能请求与路线图信号

### 6.1 模型白名单 / Approved Models Configuration

- Issue：[#111540](https://github.com/NousResearch/hermes-agent/issues/111540)  
- PR：[#111543](https://github.com/NousResearch/hermes-agent/pull/111543)  
- 状态：Issue Open，PR Open  

用户希望只在模型选择器中展示少量自己批准或常用的模型。例如只使用 4 个 Bedrock 模型和 1 个 Nous 免费模型，不希望在 154 个 Bedrock 模型与 49 个 Nous Portal 模型中反复查找。

**纳入下一版本可能性：高。**  
原因：PR 已覆盖 CLI、Gateway、TUI、ACP、Dashboard、Desktop 多个选择路径，且空配置保持兼容，属于低破坏性、高体验收益改动。

### 6.2 Bot Mode group chat caps 配置化

- Issue：[#111406](https://github.com/NousResearch/hermes-agent/issues/111406)  
- 状态：Closed as duplicate  

虽然该 Issue 被关闭为 duplicate，但需求本身具有路线图信号：多智能体群聊用户需要更长轮次、更高消息上限、更灵活 continuation 策略。

**纳入下一版本可能性：中。**  
需要找到原始 canonical Issue 或对应设计方案。

### 6.3 后台任务状态可见性

- Issue：[#111522](https://github.com/NousResearch/hermes-agent/issues/111522)  
- 状态：Open  
- 标签：`type/feature`, `comp/desktop`  

用户场景：让 Hermes Desktop 在后台下载 1GB 文件，助手回复“已开始下载”后 UI 看起来已经完成，但实际后台任务仍在运行，没有进度、状态或持久任务提示。

**路线图信号：**
- Desktop 需要引入 persistent task state。
- 后台工具任务应有进度、完成、失败、取消等状态展示。
- 与 #111294 的 post-tool spinner 问题共同指向“长耗时任务可观测性”。

**纳入下一版本可能性：中。**  
如果只是 UI 状态提示可能较快；若引入完整任务模型则可能进入较长期路线图。

### 6.4 插件生态继续扩展：MrScraper、grill-tab、auxiliary task settings

- MrScraper PR：[#111542](https://github.com/NousResearch/hermes-agent/pull/111542)  
- grill-tab catalog PR：[#111525](https://github.com/NousResearch/hermes-agent/pull/111525)  
- Plugin auxiliary task settings PR：[#111524](https://github.com/NousResearch/hermes-agent/pull/111524)  

**路线图信号：**
- Hermes 正在强化插件作为一等扩展机制。
- Web/browser/MCP 工具生态继续增长。
- Desktop 和 Dashboard 的插件配置面板需要更完整地暴露插件注册能力。

**纳入下一版本可能性：中到高。**  
尤其 #111524 属于平台能力补齐，可能优先于新增第三方插件。

---

## 7. 用户反馈摘要

从今日 Issues 可提炼出以下真实用户痛点。

### 7.1 “升级成功但系统告诉我失败”严重影响信任

相关：
- [#111272](https://github.com/NousResearch/hermes-agent/issues/111272)
- [#111494](https://github.com/NousResearch/hermes-agent/issues/111494)
- [#111497](https://github.com/NousResearch/hermes-agent/issues/111497)
- [#111417](https://github.com/NousResearch/hermes-agent/issues/111417)

用户不满点：
- 更新后的 marker、receipt、doctor 输出不一致。
- Desktop 存在时升级流程更容易陷入不可完成状态。
- SQLite runtime repair 的失败不够机器可读，影响自动化判断。

### 7.2 Desktop 用户需要明确状态，而不是 spinner 或静默失败

相关：
- [#111294](https://github.com/NousResearch/hermes-agent/issues/111294)
- [#111522](https://github.com/NousResearch/hermes-agent/issues/111522)
- [#111531](https://github.com/NousResearch/hermes-agent/issues/111531)
- [#111397](https://github.com/NousResearch/hermes-agent/issues/111397)

用户不满点：
- 工具调用后不知道系统是否还在工作。
- 后台任务没有持久状态。
- prompt 被接受后可能静默丢失。
- 归档视图不随外部变化刷新。

### 7.3 自动化用户最担心“静默失败”

相关：
- [#111414](https://github.com/NousResearch/hermes-agent/issues/111414)
- [#111523](https://github.com/NousResearch/hermes-agent/issues/111523)
- [#111526](https://github.com/NousResearch/hermes-agent/issues/111526)
- [#111380](https://github.com/NousResearch/hermes-agent/issues/111380)

用户不满点：
- cron 到点不运行但没有错误。
- monitor 数据被误判导致 job 永久阻塞。
- 无 TTY worker 无法完成 MCP approval。
- toolset 解析失败时反而扩大权限，违背安全预期。

### 7.4 多 provider / 多模型用户需要更强配置能力

相关：
- [#111540](https://github.com/NousResearch/hermes-agent/issues/111540)
- [#111543](https://github.com/NousResearch/hermes-agent/pull/111543)
- [#111436](https://github.com/NousResearch/hermes-agent/issues/111436)

用户诉求：
- 不希望在大量 provider 模型中手动筛选。
- 需要 provider-qualified allowlist。
- 模型切换后的状态输出应准确、可解释。

### 7.5 插件与企业 IM 场景需要更好诊断

相关：
- [#111420](https://github.com/NousResearch/hermes-agent/issues/111420)
- [#111538](https://github.com/NousResearch/hermes-agent/pull/111538)
- [#111541](https://github.com/NousResearch/hermes-agent/pull/111541)
- [#111524](https://github.com/NousResearch/hermes-agent/pull/111524)

用户诉求：
- 插件路由和侧边栏行为应一致。
- Feishu 群消息被拒绝时不能只在 DEBUG 日志中出现。
- 插件注册的 auxiliary task 应在 Settings 中可见、可配置。

---

## 8. 待处理积压与维护者提醒

虽然数据窗口仅覆盖过去 24 小时，但以下开放项具有较高优先级，建议维护者重点关注。

### 8.1 优先处理的高风险开放 Issue

1. **Cron scheduled fire silently skipped**
   - Issue：[#111414](https://github.com/NousResearch/hermes-agent/issues/111414)
   - 原因：P1，自动化任务静默丢失，且 next_run 被推进。
   - 建议：优先补充 failure record、dispatch evidence、scheduler invariant 测试。

2. **Cron toolset resolution fail-open**
   - Issue：[#111380](https://github.com/NousResearch/hermes-agent/issues/111380)
   - 原因：安全问题，默认工具集扩大权限。
   - 建议：fail-closed，并提供清晰诊断与迁移说明。

3. **state.db / WAL reliability**
   - Issue：[#111389](https://github.com/NousResearch/hermes-agent/issues/111389)
   - 原因：影响 CLI、Gateway、Cron、Desktop 共享状态。
   - 建议：定义 session store 并发与恢复保证，补充 WAL/lock/retry 证据型测试。

4. **API Server compression 期间无 SSE keepalive**
   - Issue：[#111512](https://github.com/NousResearch/hermes-agent/issues/111512)
   - 原因：远程客户端超时会 hard-kill turn。
   - 建议：preflight compression 阶段发送 keepalive/progress event，避免客户端误判断线。

### 8.2 建议尽快合并或评审的修复 PR

1. **TUI session no-agent crash**
   - PR：[#111534](https://github.com/NousResearch/hermes-agent/pull/111534)
   - Fixes：[#111531](https://github.com/NousResearch/hermes-agent/issues/111531)

2. **MCP API run trust approvals**
   - PR：[#111529](https://github.com/NousResearch/hermes-agent/pull/111529)
   - 对应：[#111526](https://github.com/NousResearch/hermes-agent/issues/111526)

3. **Cron monitor runtime data sanitization**
   - PR：[#111528](https://github.com/NousResearch/hermes-agent/pull/111528)
   - 对应：[#111523](https://github.com/NousResearch/hermes-agent/issues/111523)

4. **SQLite runtime repair receipt**
   - PR：[#111521](https://github.com/NousResearch/hermes-agent/pull/111521)
   - 对应：[#111497](https://github.com/NousResearch/hermes-agent/issues/111497)

5. **Allowed model picker config**
   - PR：[#111543](https://github.com/NousResearch/hermes-agent/pull/111543)
   - 对应：[#111540](https://github.com/NousResearch/hermes-agent/issues/111540)

6. **Nous gateway web search rescue**
   - PR：[#111533](https://github.com/NousResearch/hermes-agent/pull/111533)
   - 对应：[#111530](https://github.com/NousResearch/hermes-agent/issues/111530)

### 8.3 待确认或需要归并的重复问题

以下 Issues 标记为 duplicate 或 withdrawn，但背后主题仍值得维护者确认 canonical tracking：

- opencode-zen encrypted_content session poisoning  
  Issue：[#111309](https://github.com/NousResearch/hermes-agent/issues/111309)

- Desktop approvals.mode off 仍提示 computer_use approval  
  Issue：[#111304](https://github.com/NousResearch/hermes-agent/issues/111304)

- zai vision fallback model hardcoded 404  
  Issue：[#111429](https://github.com/NousResearch/hermes-agent/issues/111429)

- possible duplicate send warning 误报  
  Issue：[#111281](https://github.com/NousResearch/hermes-agent/issues/111281)

建议在关闭 duplicate 时明确链接 canonical Issue，避免社区重复上报同类问题。

---

## 项目健康度评估

**总体健康度：中高，但稳定性压力显著上升。**

积极信号：

- Release 节奏快，v0.21.3 已形成稳定标签。
- 社区反馈密集，覆盖真实使用场景。
- 多个 P2/P3 问题已有同日修复 PR。
- 插件、模型配置、MCP、Desktop 等功能面持续扩张。

风险信号：

- v0.21.3 后升级流程、Desktop、Cron、session state 出现多处可靠性反馈。
- 待合并 PR 数量高达 47，维护队列压力较大。
- 多个问题属于“静默失败”或“误导性状态”，会直接损害用户信任。
- Cron 与 toolset fail-open 涉及自动化安全边界，需要优先处理。

**建议优先级：**
1. 先处理 Cron 静默失败与 toolset fail-open。  
2. 合并已具备修复路径的 P2 PR。  
3. 对 v0.21.3 升级问题发布补丁或维护公告。  
4. 为 Desktop 长耗时任务与压缩阶段补充可见状态。  
5. 建立状态数据库与更新 receipt 的更强可观测性。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-09-15）

项目：[`sipeed/picoclaw`](https://github.com/sipeed/picoclaw)  
统计窗口：过去 24 小时

---

## 1. 今日速览

过去 24 小时内，PicoClaw 没有新增或更新 Issue，说明用户侧反馈与缺陷报告较为安静。PR 侧共有 2 条更新，均已关闭或完成处理，主要集中在 **v0.10.0 规划文档** 与 **mesh 可观测性能力** 两个方向。整体来看，项目今日活跃度为 **中低活跃**：没有社区讨论增量，但维护侧仍在推进路线图与核心能力建设。当前开发重点明显偏向 v0.10.0 sprint 的工程化落地，尤其是 Track 60–66 的分阶段实现。

---

## 2. 项目进展

### PR #3380：`feat(mesh): observability — peer conns/score/bandwidth, activity feed, SSE events (Track 63)`

- 状态：CLOSED  
- 作者：stpinkie  
- 创建时间：2026-09-15  
- 更新时间：2026-09-15  
- 评论数：无数据  
- 👍：0  
- 链接：[`sipeed/picoclaw#3380`](https://github.com/sipeed/picoclaw/pull/3380)

该 PR 聚焦于 **mesh 网络可观测性**，属于 v0.10.0 sprint 中的 Track 63。根据摘要，核心变化包括：

- `PeerStatus` 增强：
  - 新增 `conns[]`，用于展示 peer 的连接详情；
  - 记录 `remote_multiaddr`、连接方向、传输类型；
  - 可识别 `/p2p-circuit`、QUIC、TCP 等传输方式；
  - 记录 stream 数量与连接打开时间 `opened_at`；
  - 新增 `latency_ms`，来源于 peerstore 的 `LatencyEWMA`；
  - 新增 `score`，来源于 `PeerScoreStore`；
  - 新增 `last_seen`。
- 接入 `libp2p.BandwidthReporter(metrics.NewBandwidthCounter())`，用于带宽指标采集。
- 引入 activity feed 与 SSE events，意味着前端或外部观察端可以更及时地订阅 mesh 活动变化。

**影响评估：**

该 PR 对项目的运维与调试能力提升明显。mesh 类系统中，peer 连接状态、延迟、带宽、评分、最后活跃时间等信息是定位网络问题、调优连接质量和分析拓扑健康度的关键数据。若该 PR 已完成合并或被后续 PR 吸收，其价值主要体现在：

- 提升 mesh 网络状态透明度；
- 改善开发者和高级用户排障体验；
- 为 dashboard、CLI、API 或监控系统提供基础数据；
- 为后续 Track 中的自动化调度、评分策略、连接策略优化提供信号源。

---

### PR #3379：`docs: v0.10.0 sprint plan`

- 状态：CLOSED  
- 作者：stpinkie  
- 创建时间：2026-09-14  
- 更新时间：2026-09-14  
- 评论数：无数据  
- 👍：0  
- 链接：[`sipeed/picoclaw#3379`](https://github.com/sipeed/picoclaw/pull/3379)

该 PR 新增或完善了 v0.10.0 sprint 的设计文档：

- 文档路径：`docs/design/v0.10.0-sprint.md`
- 覆盖 Tracks 60–66；
- 明确执行顺序为：**60 → 65 → 61 → 62 → 63 → 64 → 66**；
- 强调“一条 Track 一个 PR”的推进方式；
- 将 `.todo.md` 草案深化为更接近实现级别的设计文档；
- 摘要中提到所有 delta 均已根据代码进行验证。

**影响评估：**

这是一个路线图和工程协作层面的重要 PR。它没有直接引入运行时代码功能，但对于项目健康度有积极意义：

- 明确 v0.10.0 的开发边界和优先级；
- 降低后续功能 PR 的上下文理解成本；
- 方便维护者和贡献者围绕 Track 拆分工作；
- 增强版本发布前的可追踪性和可审查性。

从今天另一个 PR #3380 来看，Track 63 已进入具体实现阶段，说明该 sprint plan 正在被执行，而不是停留在规划层面。

---

## 3. 社区热点

过去 24 小时内没有 Issue 更新，也没有可见的高评论数或高反应数 PR。今日两个 PR 的反应数均为 0，评论数未提供，因此暂无明显社区热点。

可关注条目：

1. [`PR #3380`](https://github.com/sipeed/picoclaw/pull/3380)  
   主题是 mesh observability，虽然没有明显社区互动，但功能本身与调试、监控、网络健康度高度相关，后续可能成为用户反馈集中点。

2. [`PR #3379`](https://github.com/sipeed/picoclaw/pull/3379)  
   主题是 v0.10.0 sprint plan，属于路线图信号。若社区关心下一个版本的优先级，该文档可能成为主要参考入口。

**分析：**

今日的热点更多来自维护侧主动推进，而非用户讨论驱动。当前社区反馈较安静，可能意味着：

- 用户侧近期没有集中报告问题；
- 项目处于内部 sprint 推进阶段；
- 讨论可能发生在 GitHub Issues/PR 之外的渠道；
- 或者当前用户规模、反馈频率仍较低。

---

## 4. Bug 与稳定性

过去 24 小时内没有新增或更新 Issue，因此没有新的 Bug、崩溃或回归问题被报告。

| 严重程度 | 问题 | 状态 | Fix PR |
|---|---|---|---|
| 高 | 无新增报告 | - | - |
| 中 | 无新增报告 | - | - |
| 低 | 无新增报告 | - | - |

与稳定性间接相关的进展：

- [`PR #3380`](https://github.com/sipeed/picoclaw/pull/3380) 增强了 mesh 可观测性。虽然不是直接的 bugfix，但它能帮助维护者更快识别网络连接异常、带宽异常、peer 评分异常或连接活跃度问题，因此对长期稳定性有正向作用。

---

## 5. 功能请求与路线图信号

过去 24 小时没有新的 Issue，因此没有来自用户的新增功能请求。

不过，从今日 PR 可以观察到明确的路线图信号：

### v0.10.0 sprint 正在推进

- 相关 PR：[`PR #3379`](https://github.com/sipeed/picoclaw/pull/3379)
- 信号强度：高

该 PR 明确了 v0.10.0 sprint 的 Tracks 60–66，并给出了执行顺序。它表明 v0.10.0 不是零散开发，而是按 Track 分阶段推进。

### Mesh observability 可能成为 v0.10.0 的重点能力

- 相关 PR：[`PR #3380`](https://github.com/sipeed/picoclaw/pull/3380)
- 信号强度：高

Track 63 聚焦 peer connections、score、bandwidth、activity feed、SSE events，说明项目正在补齐 mesh 网络的运行时可见性。这类能力通常会进一步支撑：

- 节点状态面板；
- 连接质量诊断；
- 网络拓扑分析；
- 自动化调度策略；
- 用户侧故障排查工具；
- 远程监控或事件订阅 API。

### 可能进入下一版本的方向

基于今日 PR 判断，以下能力较可能成为 v0.10.0 或后续小版本的一部分：

1. Mesh peer 连接详情展示  
   参考：[`PR #3380`](https://github.com/sipeed/picoclaw/pull/3380)

2. Peer latency、score、last seen 等运行状态指标  
   参考：[`PR #3380`](https://github.com/sipeed/picoclaw/pull/3380)

3. 带宽统计与 reporting  
   参考：[`PR #3380`](https://github.com/sipeed/picoclaw/pull/3380)

4. Activity feed 与 SSE 事件流  
   参考：[`PR #3380`](https://github.com/sipeed/picoclaw/pull/3380)

5. v0.10.0 Tracks 60–66 的持续拆分实现  
   参考：[`PR #3379`](https://github.com/sipeed/picoclaw/pull/3379)

---

## 6. 用户反馈摘要

过去 24 小时内无 Issue 更新，也没有可见评论数据，因此无法从 GitHub Issues 评论中提炼新的真实用户痛点或满意度反馈。

当前可从维护侧 PR 间接推断的潜在用户需求包括：

- 用户或维护者需要更清晰地观察 mesh 网络状态；
- 排查 peer 连接、延迟、带宽与评分问题可能是当前开发重点之一；
- 项目需要更系统的 v0.10.0 计划文档，以便贡献者理解后续工作拆分。

相关链接：

- [`PR #3380`](https://github.com/sipeed/picoclaw/pull/3380)
- [`PR #3379`](https://github.com/sipeed/picoclaw/pull/3379)

---

## 7. 待处理积压

本次数据未提供长期未响应的 Issue 或 PR 列表，因此无法识别具体积压项。

从今日数据看：

- 过去 24 小时 Issue 更新数：0
- 过去 24 小时 PR 更新数：2
- 待合并 PR：0
- 已合并/关闭 PR：2
- 新版本发布：0

**维护建议：**

1. 继续跟进 v0.10.0 sprint 的 Track 拆分执行情况  
   参考：[`PR #3379`](https://github.com/sipeed/picoclaw/pull/3379)

2. 对 mesh observability 的 API、事件结构、指标命名保持稳定性审查  
   参考：[`PR #3380`](https://github.com/sipeed/picoclaw/pull/3380)

3. 如果 #3380 是关闭但未合并，建议确认功能是否已被替代 PR 吸收，避免 Track 63 状态不清  
   参考：[`PR #3380`](https://github.com/sipeed/picoclaw/pull/3380)

---

## 项目健康度判断

今日 PicoClaw 的 GitHub 表现为 **维护侧有推进、社区侧较安静**。没有新增 Bug 或用户投诉是积极信号，但也意味着缺乏外部反馈数据来评估真实使用体验。v0.10.0 sprint plan 与 mesh observability 的推进显示项目仍在有组织地演进，尤其是在可观测性、网络诊断和版本规划方面。整体健康度可评为：**稳定推进中，短期风险较低，但需持续观察 v0.10.0 Track 的实际落地与用户反馈。**

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报  
日期：2026-09-15  
仓库：github.com/qwibitai/nanoclaw

## 1. 今日速览

过去 24 小时 NanoClaw 活跃度较高，共有 **2 条 Issue 更新**、**8 条 Pull Request 更新**，但 **暂无 PR 合并/关闭**，也 **没有新版本发布**。  
今日工作重点集中在 **安全与隐私防护、数据库稳定性、Mattermost/Slack 等渠道可靠性、安装配置一致性、测试稳定性** 等方面。  
从 PR 内容看，维护者正在集中修复生产可用性问题，尤其是多进程数据库锁竞争、公开频道泄露错误信息、凭证日志脱敏、安装依赖缺失等风险点。  
整体来看，项目处于 **高开发活跃、待合并积压上升** 的状态：改动质量偏工程化和稳定性导向，但需要尽快完成评审与合并以降低开放 PR 堆积。

---

## 2. 版本发布

过去 24 小时 **无新版本发布**。

---

## 3. 项目进展

今日没有已合并或已关闭的重要 PR，因此尚无代码层面的正式推进进入主干。  
不过，多个待合并 PR 已经覆盖了较关键的稳定性和安全问题，若后续合并，将明显提升 NanoClaw 在真实部署环境中的可靠性。

### 待合并的重要进展

#### PR #3813：持久化 handoff 安全与 mission control  
链接：<https://github.com/qwibitai/nanoclaw/pull/3813>  
状态：OPEN  
作者：briankobekim  

该 PR 引入 host-owned 的持久化 handoff ledger、带指纹的 source/reviewer contracts、append-only events，以及 handoff CLI 资源。  
同时强化 Slack agent-to-agent 交付路径，包括结构化投递、参与者精确绑定、接收方回执、bot 跳转次数限制等。  

**潜在影响：**
- 提升多 Agent 协作过程中的可追踪性和审计能力。
- 降低 handoff 丢失、误投递、重复投递风险。
- 对 Slack 场景下的 Agent 间协同有较强路线图意义。

#### PR #3812：为 central DB 增加 busy_timeout  
链接：<https://github.com/qwibitai/nanoclaw/pull/3812>  
状态：OPEN  
作者：DawoudIO  
关联 Issue：<https://github.com/qwibitai/nanoclaw/issues/3811>  

该 PR 修复 central DB 在 WAL 模式下未设置 `busy_timeout` 的问题。当前情况下，短暂锁竞争会立即抛错，调用方可能误认为数据库损坏。  

**潜在影响：**
- 提升多进程或并发操作时的稳定性。
- 降低误报“数据库损坏”的概率。
- 对生产部署可靠性较关键。

#### PR #3809：Mattermost setup 去除 jq 依赖  
链接：<https://github.com/qwibitai/nanoclaw/pull/3809>  
状态：OPEN  
作者：glifocat  

该 PR 允许 Mattermost setup 在 fresh NanoClaw host 上不依赖 `jq` 完成服务器设置校验和 owner DM 打开。  

**潜在影响：**
- 改善全新 Debian 13 等环境下的安装体验。
- 降低 bootstrap 隐性依赖导致的安装失败。
- 对渠道接入和首次部署体验有直接价值。

#### PR #3807：Mattermost 认证 liveness 与 setup callback proof  
链接：<https://github.com/qwibitai/nanoclaw/pull/3807>  
状态：OPEN  
作者：glifocat  

该 PR 增加 Mattermost setup verifier 所需的运行时证据，包括认证 WebSocket liveness 和受限 harmless setup challenge 处理。  

**潜在影响：**
- 改善 Mattermost 集成的可验证性。
- 降低 setup 阶段误判成功或失败的概率。
- 是 Mattermost setup 主流程完善的一部分。

#### PR #3806：setup 环境值原子提交  
链接：<https://github.com/qwibitai/nanoclaw/pull/3806>  
状态：OPEN  
作者：glifocat  

该 PR 通过同目录 atomic rename 批量提交环境变量写入，避免重复配置或写入失败时产生不一致状态。  

**潜在影响：**
- 提升安装/配置过程的数据一致性。
- 减少部分写入成功、部分失败造成的难排查配置问题。
- 是 setup/install 可靠性的基础修复。

#### PR #3805：skill 执行日志中脱敏凭证  
链接：<https://github.com/qwibitai/nanoclaw/pull/3805>  
状态：OPEN  
作者：glifocat  

该 PR 防止用户输入的 credentials 出现在 skill command logs、output、error events 和 captured public results 中。  

**潜在影响：**
- 明显提升凭证安全与隐私保护。
- 降低日志泄露风险。
- 与公开频道错误回传问题形成同一类安全关注点。

#### PR #3803：修复 webhook port recovery 测试不稳定  
链接：<https://github.com/qwibitai/nanoclaw/pull/3803>  
状态：OPEN  
作者：glifocat  

该 PR 修改 webhook-port recovery 测试，使其重试 fixture 拥有的 listener port，而不是随机 recovery port。  

**潜在影响：**
- 降低 CI 中偶发 `EADDRINUSE` 和 `ECONNREFUSED`。
- 提升无关 PR 的测试稳定性。
- 对维护效率有正向作用。

#### PR #3802：区分 sticky subscriptions 与 accumulated sessions  
链接：<https://github.com/qwibitai/nanoclaw/pull/3802>  
状态：OPEN  
作者：glifocat  

该 PR 修复 router 将已有 session 误当作 thread 已激活订阅的问题。  

**潜在影响：**
- 改善 `mention-sticky` 行为准确性。
- 避免 bot 在未真正被提及时错误参与线程。
- 提升频道交互语义的可靠性。

---

## 4. 社区热点

今日所有 Issue 和 PR 的评论数均为 0 或未提供，反应数也基本为 0，因此没有形成明显的高讨论度热点。  
不过，从更新内容和问题影响范围看，以下主题值得重点关注。

### 热点 1：公开频道中可能泄露原始错误信息  
Issue：#3814  
链接：<https://github.com/qwibitai/nanoclaw/issues/3814>  
状态：OPEN  
作者：DawoudIO  

该 Issue 指出 `deliverErrorResult` 可能将 SDK 原始错误文本原样发送回触发当前 turn 的频道，而没有判断目标是否为公开频道。若 `claude` 子进程在处理真实消息时中断，错误文本可能包含内部上下文或敏感信息，并被投递到 public channel。

**背后诉求：**
- 错误信息应按可见性做分级处理。
- 公开频道不应接收 raw process/turn-error。
- owner 或私有诊断通道应承担详细错误回传。

**健康度判断：**
这是一个明确的安全/隐私类问题，优先级应高于普通功能缺陷。目前尚未看到对应 fix PR，需要维护者尽快处理。

### 热点 2：central DB 锁竞争被误判为 corruption  
Issue：#3811  
链接：<https://github.com/qwibitai/nanoclaw/issues/3811>  
状态：OPEN  
作者：DawoudIO  
对应 PR：#3812  
链接：<https://github.com/qwibitai/nanoclaw/pull/3812>  

该 Issue 指出 central DB 未设置 `busy_timeout`，导致瞬时锁竞争会立即失败，看起来像数据库损坏。  

**背后诉求：**
- 多进程访问 central DB 时应允许短暂等待和重试。
- 锁竞争与真实 corruption 应有明确区分。
- 生产运行中应减少误报和非必要中断。

**健康度判断：**
该问题已有 PR #3812 修复，响应速度较快，说明项目对稳定性问题具备较好的处理机制。

### 热点 3：Mattermost setup 可靠性  
相关 PR：  
- #3809：<https://github.com/qwibitai/nanoclaw/pull/3809>  
- #3807：<https://github.com/qwibitai/nanoclaw/pull/3807>  

Mattermost 相关 PR 集中解决 fresh host 安装依赖、认证 liveness、setup callback proof 等问题。  

**背后诉求：**
- 用户希望 Mattermost 集成能在干净系统上顺利启动。
- setup verifier 需要真实运行时证据，而不是静态假设。
- 安装流程应减少隐式依赖和环境差异。

---

## 5. Bug 与稳定性

以下按潜在严重程度排序。

### P0 / 高优先级：公开频道可能泄露 raw error text  
Issue：#3814  
链接：<https://github.com/qwibitai/nanoclaw/issues/3814>  
状态：OPEN  
是否已有 fix PR：未见对应 PR  

**问题摘要：**
`deliverErrorResult` 会将 SDK 原始错误文本发送到触发当前 turn 的频道，没有区分该频道是否公开。  

**风险：**
- 可能泄露内部错误、上下文片段、模型/SDK 细节。
- 如果错误内容包含用户输入、凭证片段或调试信息，影响会扩大。
- 对企业或团队频道部署场景风险较高。

**建议：**
- 将 public channel 错误信息改为安全摘要。
- 详细错误仅发送给 owner、管理员或私有诊断通道。
- 增加测试覆盖：public channel、private DM、owner-only destination。

---

### P1 / 高优先级：central DB 无 busy_timeout 导致锁竞争立即失败  
Issue：#3811  
链接：<https://github.com/qwibitai/nanoclaw/issues/3811>  
状态：OPEN  
Fix PR：#3812  
链接：<https://github.com/qwibitai/nanoclaw/pull/3812>  

**问题摘要：**
central DB 在 WAL 模式下未设置 `busy_timeout`，多个进程同时访问时，短暂锁竞争会立即抛错。  

**风险：**
- 运行时稳定性下降。
- 调用方难以区分 transient lock contention 与真实 corruption。
- 可能影响 task/schedule state、`container_configs`、`agent_groups` 等核心状态。

**修复状态：**
已有 PR #3812，建议优先评审合并。

---

### P1 / 高优先级：skill 执行日志可能泄露凭证  
PR：#3805  
链接：<https://github.com/qwibitai/nanoclaw/pull/3805>  
状态：OPEN  

**问题摘要：**
当前 skill 执行过程中，用户通过 prompt 输入的 credentials 可能进入 command logs、output、error events 或 public captured results。  

**风险：**
- 凭证泄露。
- 日志系统或公开结果中暴露 secret。
- 与安全合规要求冲突。

**修复状态：**
已有 PR #3805，建议与 #3814 一并作为安全批次评审。

---

### P2 / 中优先级：Mattermost fresh install 因 jq 缺失失败  
PR：#3809  
链接：<https://github.com/qwibitai/nanoclaw/pull/3809>  
状态：OPEN  

**问题摘要：**
Mattermost setup 中部分 skill commands 依赖 `jq`，但 public bootstrap 没有安装该依赖，导致 fresh Debian 13 channel install 失败。  

**风险：**
- 新用户首次安装失败。
- Mattermost 渠道接入体验受损。
- 文档与实际依赖不一致。

**修复状态：**
已有 PR #3809。

---

### P2 / 中优先级：setup 环境值非原子写入导致配置不一致  
PR：#3806  
链接：<https://github.com/qwibitai/nanoclaw/pull/3806>  
状态：OPEN  

**问题摘要：**
环境配置写入过程中，如果存在重复配置或写入失败，可能留下不一致状态。  

**风险：**
- 安装后运行行为不确定。
- 用户难以定位配置错误。
- 后续 setup verifier 可能产生误判。

**修复状态：**
已有 PR #3806。

---

### P2 / 中优先级：Mattermost setup verifier 缺少认证 liveness 证据  
PR：#3807  
链接：<https://github.com/qwibitai/nanoclaw/pull/3807>  
状态：OPEN  

**问题摘要：**
Mattermost setup verifier 需要真实的 authenticated WebSocket liveness 和 setup callback proof。  

**风险：**
- setup 校验不完整。
- 可能出现“看似配置成功但实际不可用”的状态。

**修复状态：**
已有 PR #3807。

---

### P3 / 中低优先级：webhook-port recovery 测试偶发失败  
PR：#3803  
链接：<https://github.com/qwibitai/nanoclaw/pull/3803>  
状态：OPEN  

**问题摘要：**
测试使用随机 recovery port，可能被占用，导致 `EADDRINUSE` 和 `ECONNREFUSED`。  

**风险：**
- CI flakiness。
- 无关 PR 被偶发测试失败阻塞。
- 增加维护者排障成本。

**修复状态：**
已有 PR #3803。

---

### P3 / 中低优先级：router 混淆 sticky subscription 与 accumulated session  
PR：#3802  
链接：<https://github.com/qwibitai/nanoclaw/pull/3802>  
状态：OPEN  

**问题摘要：**
已有 session 被误认为 thread 已激活，导致 `mention-sticky` engagement 不准确。  

**风险：**
- Bot 可能错误响应未真正订阅的线程。
- 频道交互体验偏离预期。

**修复状态：**
已有 PR #3802。

---

## 6. 功能请求与路线图信号

今日新增 Issue 中没有明确的传统“功能请求”，主要是 Bug 和稳定性问题。不过，PR 内容暴露出几个明显路线图方向。

### 方向 1：多 Agent handoff 的持久化、可审计、安全化  
PR：#3813  
链接：<https://github.com/qwibitai/nanoclaw/pull/3813>  

该 PR 显示 NanoClaw 正在向更复杂的 Agent 协作模式演进：  
- durable handoff ledger  
- source/reviewer contracts  
- append-only events  
- recipient receipts  
- bounded bot hops  

**可能进入下一版本的能力：**
- 可追踪的 Agent 任务交接。
- 更严格的 Agent-to-Agent 消息投递安全。
- mission control 相关 CLI/资源能力。

### 方向 2：渠道接入可靠性增强，尤其是 Mattermost 与 Slack  
相关 PR：  
- #3813：<https://github.com/qwibitai/nanoclaw/pull/3813>  
- #3809：<https://github.com/qwibitai/nanoclaw/pull/3809>  
- #3807：<https://github.com/qwibitai/nanoclaw/pull/3807>  
- #3802：<https://github.com/qwibitai/nanoclaw/pull/3802>  

这批 PR 表明项目正在强化实际团队聊天平台中的运行稳定性，包括 setup、认证、线程订阅、Agent 间投递等。

**可能进入下一版本的能力：**
- 更稳健的 Mattermost bootstrap/setup。
- 更准确的频道线程订阅语义。
- Slack Agent-to-Agent delivery 安全边界增强。

### 方向 3：安装、配置与运维可恢复性  
相关 PR：  
- #3806：<https://github.com/qwibitai/nanoclaw/pull/3806>  
- #3809：<https://github.com/qwibitai/nanoclaw/pull/3809>  
- #3812：<https://github.com/qwibitai/nanoclaw/pull/3812>  

项目正在减少“环境差异导致失败”和“瞬态错误被误判为严重损坏”的问题。  

**可能进入下一版本的能力：**
- setup 配置原子提交。
- 减少外部工具隐式依赖。
- central DB 在并发场景下更稳健。

### 方向 4：安全与隐私默认保护  
相关 Issue/PR：  
- Issue #3814：<https://github.com/qwibitai/nanoclaw/issues/3814>  
- PR #3805：<https://github.com/qwibitai/nanoclaw/pull/3805>  

凭证脱敏和公开频道错误降级表明，NanoClaw 正在补齐多用户/团队环境下的安全默认值。

---

## 7. 用户反馈摘要

今日 Issue 评论数为 0，因此没有可提炼的多轮讨论型用户反馈。  
但从 Issue 和 PR 摘要中可以归纳出以下真实痛点和使用场景。

### 痛点 1：团队公开频道中错误信息不应泄露  
Issue：#3814  
链接：<https://github.com/qwibitai/nanoclaw/issues/3814>  

用户场景是：Agent 在真实频道中处理消息时，底层 `claude` 子进程可能中途失败。当前实现可能把 raw error text 直接发回触发 turn 的频道。  

**不满意点：**
- public channel 不应接收详细内部错误。
- 错误回传缺乏权限/可见性判断。
- 对生产团队使用场景不安全。

### 痛点 2：数据库锁竞争不应表现得像数据库损坏  
Issue：#3811  
链接：<https://github.com/qwibitai/nanoclaw/issues/3811>  
Fix PR：#3812  
链接：<https://github.com/qwibitai/nanoclaw/pull/3812>  

用户场景是多个进程或任务同时触碰 central DB。短暂锁竞争立即失败，调用方看到类似 corruption 的错误。  

**不满意点：**
- transient contention 与 real corruption 混淆。
- 稳定性和可诊断性不足。
- 生产环境中容易造成误判和过度恢复操作。

### 痛点 3：fresh host 安装不应依赖未声明工具  
PR：#3809  
链接：<https://github.com/qwibitai/nanoclaw/pull/3809>  

用户在 fresh Debian 13 上安装 Mattermost channel 时失败，因为 setup 逻辑需要 `jq`，但 bootstrap 未安装。  

**不满意点：**
- 安装脚本与实际依赖不一致。
- 新用户首次体验受影响。
- 错误可能看起来像平台配置问题，而非依赖缺失。

### 痛点 4：日志中不能出现用户输入的 secrets  
PR：#3805  
链接：<https://github.com/qwibitai/nanoclaw/pull/3805>  

用户场景是通过 prompts 输入凭证后执行 skill。若凭证进入日志或 public results，会造成安全问题。  

**不满意点：**
- 默认日志策略不够安全。
- secret 生命周期缺乏明确边界。
- 公开结果捕获需要更严格的私有化处理。

---

## 8. 待处理积压

基于本次提供的数据，仅覆盖最近 24 小时，无法判断“长期未响应”的历史 Issue 或 PR。  
不过，从今日数据看，已有 **8 个开放 PR** 且均未合并/关闭，短期积压开始形成，建议维护者优先关注以下队列。

### 优先评审队列

#### 1. 安全与隐私修复  
- Issue #3814：公开频道 raw error 泄露风险  
  <https://github.com/qwibitai/nanoclaw/issues/3814>  
- PR #3805：skill 执行日志脱敏凭证  
  <https://github.com/qwibitai/nanoclaw/pull/3805>  

建议优先级最高，尤其 #3814 目前尚未看到 fix PR。

#### 2. 生产稳定性修复  
- Issue #3811：central DB 无 busy_timeout  
  <https://github.com/qwibitai/nanoclaw/issues/3811>  
- PR #3812：为 central DB 添加 busy_timeout  
  <https://github.com/qwibitai/nanoclaw/pull/3812>  

该修复已有明确 Issue 与 PR 对应，适合快速评审合并。

#### 3. 安装与渠道 setup 修复  
- PR #3809：Mattermost setup 去除 jq 依赖  
  <https://github.com/qwibitai/nanoclaw/pull/3809>  
- PR #3807：Mattermost 认证 liveness 与 callback proof  
  <https://github.com/qwibitai/nanoclaw/pull/3807>  
- PR #3806：setup 环境值原子提交  
  <https://github.com/qwibitai/nanoclaw/pull/3806>  

这几项可能互相关联，建议按依赖关系集中评审，避免 setup 流程出现半修复状态。

#### 4. CI 与交互行为稳定性  
- PR #3803：webhook-port recovery 测试稳定性  
  <https://github.com/qwibitai/nanoclaw/pull/3803>  
- PR #3802：router sticky subscription 修复  
  <https://github.com/qwibitai/nanoclaw/pull/3802>  

这类修复有助于降低维护成本和提升频道行为准确性，可作为第二批合并对象。

#### 5. 中长期能力建设  
- PR #3813：durable handoff safety and mission control  
  <https://github.com/qwibitai/nanoclaw/pull/3813>  

该 PR 范围较大，涉及 handoff ledger、Slack delivery、CLI resources 等，建议进行更细粒度的安全、迁移和兼容性审查。

---

## 总体健康度判断

NanoClaw 今日开发活跃度较高，问题响应速度较快，尤其 #3811 已有对应修复 PR。  
项目当前关注点明显偏向 **生产可用性、安全默认值、渠道可靠性和安装体验**，这是个人 AI 助手/Agent 编排系统走向真实使用场景时的关键阶段。  
主要风险在于：**开放 PR 数量较多但无合并动作、安全类 Issue #3814 尚未出现修复 PR、多个 setup/channel 修复可能存在依赖关系**。  
建议维护者优先合并低风险稳定性修复，并尽快为公开频道错误泄露问题建立修复路径。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报（2026-09-15）

## 1. 今日速览

过去 24 小时，NullClaw 项目共有 **2 条 Issue 更新**，均为新开或活跃 Issue；没有 Pull Request 更新，也没有新版本发布。  
今日活跃度整体偏低，主要活动集中在 **`web_search` 外部搜索能力与付费/预付费代理接入方案** 的讨论上。  
两个新 Issue 均来自同一位社区成员，内容高度相关，指向 NullClaw 在无本地搜索后端或无 API Key 场景下如何接入 Brave、Firecrawl、DuckDuckGo、SearXNG 等外部搜索能力。  
从项目健康度看，当前没有新增 Bug、崩溃或回归报告，但也没有代码层面的推进，维护者后续是否回应这些外部服务集成建议，将影响搜索能力路线的清晰度。

---

## 3. 项目进展

过去 24 小时内没有新的 Pull Request 被创建、合并或关闭。

- 合并 PR：0
- 关闭 PR：0
- 待合并 PR：0

因此，今日项目在代码层面暂无可量化推进。当前新增动态主要体现在社区对 `web_search` 能力扩展和外部搜索代理模式的提案上。

---

## 4. 社区热点

### Issue #998：Prepaid search hop when keyless DDG isn’t enough?

- 链接：https://github.com/nullclaw/nullclaw/issues/998
- 状态：OPEN
- 作者：iamalanlui
- 创建时间：2026-09-14
- 评论数：0
- 👍：0

该 Issue 提到已有的 #871 似乎围绕 DuckDuckGo 默认搜索与 Brave/SearXNG 在弱设备上的表现差异展开。作者并未直接在原 Bug 线程中推销方案，而是单独提出一个外部搜索跳转方案：当无 Key 的 DuckDuckGo 不足以支撑实际搜索需求时，可通过其构建的 `apifare` 作为预付费 MCP 计量层进行搜索请求中转。

背后诉求主要包括：

- 在没有 Brave API Key、Firecrawl Key 或自建 SearXNG 的情况下，仍然能让 Agent 使用外部搜索。
- 通过统一的 Bearer Token 管理搜索调用，而不是在主机配置中暴露多个第三方服务密钥。
- 将搜索调用成本显式化、预付费化，便于个人用户或轻量部署场景控制开销。
- 为低性能设备或受限部署环境提供替代搜索路径。

目前该 Issue 没有评论和反应，尚无法判断维护者是否有兴趣将其纳入官方路线。

---

### Issue #997：Prepaid Brave/Firecrawl vs those keys for NullClaw web_search?

- 链接：https://github.com/nullclaw/nullclaw/issues/997
- 状态：OPEN
- 作者：iamalanlui
- 创建时间：2026-09-14
- 评论数：0
- 👍：0

该 Issue 聚焦 NullClaw 的 `web_search` 目前仍依赖 Brave Key 或 SearXNG 跳转的问题。作者提出使用 `apifare` 作为预付费 MCP 代理层，让搜索服务调用通过统一 Bearer Token 完成，从而避免在宿主配置中管理 Brave、Firecrawl 等服务密钥。

该讨论反映出一类实际部署痛点：

- 用户希望 Agent 可以“离开本机”访问外部 Web 信息。
- 但第三方搜索服务的 API Key 配置、成本管理和安全暴露问题仍是门槛。
- 社区可能需要更灵活的搜索后端抽象，例如：
  - Brave API
  - Firecrawl
  - SearXNG
  - DuckDuckGo
  - 预付费 MCP 代理
  - 自定义搜索网关

该 Issue 与 #998 高度相关，二者都指向 NullClaw 搜索能力的可插拔化与成本治理。

---

## 5. Bug 与稳定性

过去 24 小时未发现新的明确 Bug、崩溃、回归或稳定性问题报告。

### 今日 Bug 概况

| 严重程度 | Issue | 描述 | 是否已有 Fix PR |
|---|---|---|---|
| 高 | 无 | 未报告崩溃、数据丢失、核心功能不可用等问题 | 无 |
| 中 | 无 | 未报告明显回归或主要功能异常 | 无 |
| 低 | 无 | 未报告小型缺陷或体验问题 | 无 |

需要注意的是，Issue #998 中提到的 #871 似乎与 DuckDuckGo 默认搜索、Brave/SearXNG 以及弱设备体验有关，但本次数据未提供 #871 的完整内容，因此无法判断其当前严重程度或修复状态。

相关链接：

- Issue #998：https://github.com/nullclaw/nullclaw/issues/998
- Issue #997：https://github.com/nullclaw/nullclaw/issues/997

---

## 6. 功能请求与路线图信号

今日新增的两个 Issue 均可视为功能请求或集成提案，核心方向是 **`web_search` 的外部搜索后端接入与密钥管理简化**。

### 6.1 预付费 MCP 搜索代理接入

- 相关 Issue：
  - https://github.com/nullclaw/nullclaw/issues/997
  - https://github.com/nullclaw/nullclaw/issues/998

用户提出通过 `apifare` 提供一个预付费、受治理的搜索代理层，使 NullClaw 可以通过统一 Bearer Token 访问 Brave、Firecrawl 或其他搜索/抓取能力。

潜在价值：

- 降低用户配置多个第三方 API Key 的复杂度。
- 改善个人部署、临时部署、弱设备部署的可用性。
- 为 NullClaw 增加一种“外部搜索供应商适配层”。
- 支持基于额度或预付费的调用治理，减少不可控费用。

潜在风险：

- 引入第三方代理服务后，隐私、稳定性、可用性和信任边界需要明确说明。
- 如果直接纳入官方推荐，项目可能需要制定外部服务合规和安全标准。
- 需要判断该方案是作为官方集成、社区插件，还是文档中的可选适配示例。

### 6.2 `web_search` 后端可插拔化

- 相关 Issue：
  - https://github.com/nullclaw/nullclaw/issues/997

Issue #997 暗示当前 `web_search` 对 Brave Key 或 SearXNG 的依赖可能对部分用户不够友好。后续路线图可能考虑：

- 标准化搜索 Provider 接口。
- 支持配置多个搜索后端的优先级与 fallback。
- 支持自定义 MCP search gateway。
- 支持无 Key、本地、远端代理、商业 API 多种模式。
- 在文档中补充各搜索方案的成本、隐私和部署复杂度比较。

目前没有配套 PR，因此短期进入下一版本的确定性较低。若维护者认可该方向，下一步更可能是需求澄清、设计讨论或文档补充，而非立即合并实现。

---

## 7. 用户反馈摘要

今日两个 Issue 均来自同一用户，反馈集中在 NullClaw Agent 的外部搜索能力上。

### 主要痛点

1. **搜索能力需要外部依赖**
   - 用户指出 NullClaw 的 `web_search` 仍需要 Brave Key 或 SearXNG 跳转。
   - 对部分个人用户而言，申请、配置和维护这些 Key 或服务有一定门槛。
   - 相关链接：https://github.com/nullclaw/nullclaw/issues/997

2. **无 Key 搜索能力可能不足**
   - Issue #998 提到当 keyless DuckDuckGo 不够用时，需要替代路径。
   - 这说明社区可能已经遇到 DuckDuckGo 默认搜索在质量、稳定性、速率或设备资源方面的限制。
   - 相关链接：https://github.com/nullclaw/nullclaw/issues/998

3. **用户希望降低密钥暴露与配置复杂度**
   - 提案强调“one bearer token”和“no Brave/Firecrawl keys in host config”。
   - 这反映出用户对 API Key 泄露、配置分散、服务治理不透明的担忧。
   - 相关链接：https://github.com/nullclaw/nullclaw/issues/997

4. **对成本可控性的需求增强**
   - “prepaid MCP meter” 的表述说明用户希望外部搜索调用可以被计量、限额和预付费管理。
   - 对运行个人 Agent、长期后台任务或自动化搜索场景而言，成本上限是重要需求。
   - 相关链接：https://github.com/nullclaw/nullclaw/issues/998

### 满意/不满意信号

- 正向信号：用户仍在围绕 NullClaw 的 Agent 能力提出集成建议，说明项目在个人 AI 助手和工具调用场景中具备吸引力。
- 负向信号：当前 `web_search` 的服务接入方式可能仍不够“开箱即用”，尤其是在没有 Brave Key、自建 SearXNG 或稳定 DuckDuckGo 的情况下。

---

## 8. 待处理积压

本次数据只包含过去 24 小时内的 2 个新 Issue 和 0 个 PR，未提供长期未响应 Issue 或 PR 的完整列表，因此无法识别真实的长期积压项。

不过，从今日数据看，以下两个新 Issue 值得维护者尽快 triage，以避免重复讨论扩散：

1. **Issue #997：Prepaid Brave/Firecrawl vs those keys for NullClaw web_search?**  
   链接：https://github.com/nullclaw/nullclaw/issues/997  
   建议处理方式：
   - 标记为 `enhancement`、`integration` 或 `discussion`。
   - 明确 NullClaw 是否接受第三方搜索代理方案。
   - 如果不计划官方支持，可建议以插件、MCP server 示例或文档形式落地。

2. **Issue #998：Prepaid search hop when keyless DDG isn’t enough?**  
   链接：https://github.com/nullclaw/nullclaw/issues/998  
   建议处理方式：
   - 与 #997 进行关联或合并讨论。
   - 判断其与 #871 的关系，避免在 Bug 线程和功能提案之间产生混淆。
   - 明确 DuckDuckGo、Brave、SearXNG、Firecrawl 等搜索方案的推荐优先级和 fallback 策略。

---

## 总体健康度评估

- **代码活跃度**：低。过去 24 小时无 PR 更新、无合并、无发布。
- **社区活跃度**：低到中。新增 2 个 Issue，但没有评论和反应。
- **稳定性风险**：低。今日没有新增 Bug 或崩溃报告。
- **产品方向信号**：明确集中在 `web_search` 外部搜索能力、密钥管理和成本治理上。
- **维护建议**：优先对 #997 和 #998 做 triage，判断是否需要抽象搜索 Provider、补充文档，或建立第三方 MCP 搜索代理的集成规范。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-09-15）

## 1. 今日速览

过去 24 小时，IronClaw 仓库活跃度较低：仅有 1 条 Issue 更新，未出现 Pull Request 更新，也没有新版本发布。今日唯一新增/活跃事项是一次每日失败分类报告，聚焦 benchmark 运行中的非通过任务分析，说明项目当前主要活动集中在评测质量监控与模型失败归因上。没有代码合并、修复 PR 或发布动作，因此从工程推进角度看，今日项目进展有限。整体健康度方面，仓库仍在持续进行自动化/半自动化质量观测，但缺少对应修复闭环信号。

---

## 3. 项目进展

过去 24 小时无新增、合并或关闭的 Pull Request。

- PR 更新数：0
- 待合并 PR：0
- 已合并/关闭 PR：0

因此，今日没有可确认的功能推进、Bug 修复或架构调整。项目进展主要体现在 benchmark 失败样本的记录与分析，而非代码层面的变更。

---

## 4. 社区热点

### Issue #8100：Daily ironclaw failure taxonomy — 2026-09-14  
链接：https://github.com/nearai/ironclaw/issues/8100  
状态：Open  
作者：pranavraja99  
评论数：0  
反应数：0  

该 Issue 是今日唯一活跃事项，内容为每日 IronClaw 失败分类报告。报告中分析了 `officeqa` benchmark 的 43 个 non-pass 任务，并指出这些失败几乎全部属于真实的模型质量问题，而不是明显的基础设施、评测脚本或环境异常。

从摘要来看，该 Issue 的核心诉求是：

- 持续跟踪 benchmark 中的失败模式；
- 区分模型能力缺陷与测试/基础设施问题；
- 为后续模型改进、任务修复或评测集调整提供依据。

目前该 Issue 没有评论和反应，说明社区讨论热度较低，但它对项目质量监控仍有价值。

---

## 5. Bug 与稳定性

### 中等优先级：OfficeQA benchmark 中出现 43 个 non-pass 任务  
链接：https://github.com/nearai/ironclaw/issues/8100  

根据 Issue #8100 的摘要，`officeqa` benchmark 运行中存在 43 个未通过任务。报告判断这些失败“几乎全部是真实模型质量错误”，而非基础设施故障或测试系统误报。

影响判断：

- 严重程度：中等  
- 类型：模型质量 / 任务完成能力问题  
- 是否为崩溃或系统级故障：未见证据  
- 是否已有 fix PR：无  
- 当前状态：Open  

该问题更偏向于质量评测发现，而非传统意义上的软件 Bug。由于没有配套 PR，短期内尚未看到修复闭环。维护者可能需要进一步拆分失败原因，例如导航错误、任务理解错误、执行规划失败或输出格式不一致等，以便形成可操作的修复项。

---

## 6. 功能请求与路线图信号

过去 24 小时未发现明确的新功能请求，也没有相关 PR 表明某项新功能即将进入下一版本。

不过，Issue #8100 释放出一个潜在路线图信号：

- 项目可能正在强化 benchmark-driven development，即通过每日失败分类推动模型与智能体能力改进；
- `officeqa` 场景中的失败集中出现，可能意味着办公自动化、网页/工具导航、问答任务执行等能力仍是后续优化重点；
- 如果该类日报持续出现，未来可能需要更结构化的失败归因工具、自动聚类、可视化面板或与修复任务关联的 workflow。

相关链接：https://github.com/nearai/ironclaw/issues/8100

---

## 7. 用户反馈摘要

今日没有来自 Issue 评论的用户反馈；Issue #8100 当前评论数为 0。

从 Issue 内容本身可以间接提炼出以下反馈信号：

- 当前 IronClaw 在 `officeqa` benchmark 上仍存在较多非通过任务；
- 失败主要被归因为模型质量，而不是运行环境或评测系统问题；
- 项目维护者或评测人员关注的是“失败是否可归因、是否可复现、是否能指导模型改进”。

目前暂无用户明确表达满意或不满意，也没有具体使用场景反馈。

相关链接：https://github.com/nearai/ironclaw/issues/8100

---

## 8. 待处理积压

基于今日提供的数据，未发现长期未响应的重要 Issue 或 PR。

需要注意的是：

- 今日唯一活跃 Issue #8100 仍处于 Open 状态；
- 该 Issue 没有评论、没有反应、没有关联修复 PR；
- 如果后续每日失败分类报告持续累积但缺少跟进，可能形成“评测报告积压”，降低质量监控对实际开发的转化效率。

建议维护者关注：

1. 是否将 #8100 中的失败样本拆分为可执行的子任务；
2. 是否为高频失败类型建立标签或归因分类；
3. 是否将 benchmark 失败与具体模型、prompt、环境、任务集版本建立追踪关系；
4. 是否需要为每日 taxonomy 报告建立自动关闭或汇总机制，避免 Issue 列表噪音。

相关链接：https://github.com/nearai/ironclaw/issues/8100

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报  
**日期：2026-09-15**  
**仓库：** [netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)

---

## 1. 今日速览

过去 24 小时，LobsterAI **无 Issue 更新**，但 Pull Request 活动较高，共有 **13 条 PR 更新**，其中 **9 条仍处于 Open 状态，4 条已关闭/完成处理**。  
今日活跃度主要集中在 **依赖升级、OpenClaw 集成、Renderer 渲染体验、构建与开发稳定性** 等方向，说明项目当前处于较密集的工程维护与运行时升级阶段。  
从 PR 类型看，Dependabot 发起的依赖升级占比较高，包括 React、Vite、Mermaid、GitHub Actions 等核心前端与 CI 依赖，后续需要重点关注兼容性验证。  
社区侧今日没有新的 Issue、评论或用户反馈数据，因此外部用户问题暴露较少，但也意味着缺少可观察的真实使用反馈信号。

---

## 3. 项目进展

今日已关闭 / 完成处理的 PR 共 4 条，主要推动了 OpenClaw 运行时升级、Markdown 渲染能力增强、开发环境稳定性修复以及 Windows 路径处理修复。

### 重要已关闭 PR

#### [#2665 feat: upgrade OpenClaw to v2026.8.1 and improve artifact workflows](https://github.com/netease-youdao/LobsterAI/pull/2665)  
**状态：Closed**  
**作者：fisherdaddy**  
**涉及领域：renderer、build、docs、main、openclaw、cowork、im、artifacts、Windows、macOS**

该 PR 是今日影响范围最大的变更之一，核心内容包括：

- 将内置 OpenClaw runtime 从 `v2026.6.1` 升级至 `v2026.8.1`
- 将 Electron 从 `40.2.1` 升级至 `43.5.0`
- 适配运行时集成与既有用户状态
- 改进 Markdown 编辑、Library 组织与内置浏览器体验
- 优化 artifact 工作流

**项目影响：**  
这是一次较大的底层运行时和桌面框架升级，意味着 LobsterAI 正在同步上游 OpenClaw 与 Electron 的能力演进。由于涉及 main、renderer、openclaw、artifact、跨平台等多个模块，后续需要重点观察回归风险，尤其是插件加载、用户状态迁移、桌面端兼容性与打包流程。

---

#### [#2663 fix(dev): exclude generated directories from Vite watching](https://github.com/netease-youdao/LobsterAI/pull/2663)  
**状态：Closed**  
**作者：btc69m979y-dotcom**  
**涉及领域：renderer**

该 PR 修复了开发环境下 Vite 文件监听可能因临时目录中的 Windows junction 循环而超时或崩溃的问题。

主要变更：

- 从 Vite watcher 中排除 `.work`
- 排除 `artifacts`
- 排除 `dist-electron`
- 保留既有 `vendor` 排除规则

**项目影响：**  
该修复提升了开发启动稳定性，尤其对 Windows 开发者较为关键。它减少了本地开发环境因生成目录、构建产物或循环软链接导致的 watcher 异常，有助于降低贡献者参与成本。

---

#### [#2662 feat(markdown): improve inline math, entities and live-preview rendering](https://github.com/netease-youdao/LobsterAI/pull/2662)  
**状态：Closed**  
**作者：fisherdaddy**  
**涉及领域：renderer、artifacts**

该 PR 聚焦 Markdown 编辑与预览体验增强。

主要改进包括：

- 支持 LaTeX `\(...\)` 行内数学公式
- 支持多美元符号数学分隔符
- 为行内代码、HTML entities、硬换行 / HTML breaks 增加 live-preview widgets
- 修复 `pre/code` renderer 中 inline prop 导致的行内代码识别问题
- 按照 GFM 对齐规则处理表格单元格
- 保持表格单元格顶部垂直对齐
- 使用 Markdown AST 替代较脆弱的字符串式处理方式

**项目影响：**  
这对 AI 助手类产品非常重要，因为用户经常在对话和文档中输入代码、公式、表格和混合 Markdown 内容。该 PR 提升了富文本内容渲染准确性，也增强了文档、知识库和 artifact 输出体验。

---

#### [#2661 fix: openclaw windows path redaction](https://github.com/netease-youdao/LobsterAI/pull/2661)  
**状态：Closed**  
**作者：fisherdaddy**  
**涉及领域：renderer、openclaw**

该 PR 修复 OpenClaw 在 Windows 环境下的路径脱敏问题。

**项目影响：**  
虽然摘要较少，但从标题判断，该修复可能与日志、安全展示、隐私保护或错误上报中的 Windows 路径处理有关。对于桌面 AI 助手而言，避免泄露本地用户名、目录结构或敏感路径是重要的隐私与安全基础能力。

---

### 今日仍在推进中的重要 PR

#### [#2673 feat(auth): align login introduction with portal showcase](https://github.com/netease-youdao/LobsterAI/pull/2673)  
**状态：Open**  
**作者：btc69m979y-dotcom**  
**涉及领域：renderer、docs、cowork**

该 PR 为新桌面安装用户增加登录介绍页，视觉和内容与官方 portal 保持一致：

- 左侧展示 10 个图文用例
- 右侧展示欢迎文案与登录入口
- 支持通过关闭按钮或 Escape 跳过登录
- 跳过后继续进入既有操作引导
- 聊天中的登录提示也采用相同视觉设计

**项目信号：**  
这是明显的产品化与转化路径优化。LobsterAI 正在加强桌面端首次启动体验、账号登录引导和官方门户的一致性，可能服务于后续账号体系、协作能力或云端功能接入。

---

#### [#2664 fix(openclaw): avoid POPO SDK loading races](https://github.com/netease-youdao/LobsterAI/pull/2664)  
**状态：Open**  
**作者：btc69m979y-dotcom**  
**涉及领域：docs、openclaw**

该 PR 针对 OpenClaw v2026.8.1 升级后出现的 POPO SDK 加载竞态问题：

- POPO 2.1.13 可能在 host ESM import 尚未完成时同步 require SDK 模块
- 导致 `ERR_REQUIRE_ESM_RACE_CONDITION`
- 插件加载失败后，gateway 重启时可能缺少 POPO account listeners

**项目信号：**  
这是一个较明确的运行时兼容性问题，和 #2665 的 OpenClaw 升级高度相关。若该问题在实际用户环境中复现，可能影响 POPO 集成、账号监听和插件启动稳定性，建议优先合并并验证。

---

## 4. 社区热点

今日没有新的 Issue，也没有可用的评论数和反应数数据。所有 PR 的评论字段均为 `undefined`，点赞数均为 `0`，因此无法基于互动量判断真实社区热点。

不过从变更内容的重要性看，以下 PR 具备较高关注价值：

1. [#2665 OpenClaw v2026.8.1 与 Electron 43.5.0 升级](https://github.com/netease-youdao/LobsterAI/pull/2665)  
   - 影响面最大，涉及运行时、桌面框架、artifact 工作流和跨平台适配。
   - 背后诉求是保持底层 runtime 与桌面技术栈现代化。

2. [#2664 POPO SDK loading race 修复](https://github.com/netease-youdao/LobsterAI/pull/2664)  
   - 与 OpenClaw 升级后的兼容性风险直接相关。
   - 背后诉求是提升插件加载和账号监听稳定性。

3. [#2673 登录介绍页与官方 portal 对齐](https://github.com/netease-youdao/LobsterAI/pull/2673)  
   - 体现产品体验和新用户 onboarding 优化。
   - 背后诉求是提升登录转化、降低首次使用理解成本。

---

## 5. Bug 与稳定性

今日没有新开的 Bug Issue，但 PR 中包含多个稳定性相关修复或潜在回归处理。

### 高优先级

#### OpenClaw / POPO SDK 加载竞态  
- **相关 PR：** [#2664 fix(openclaw): avoid POPO SDK loading races](https://github.com/netease-youdao/LobsterAI/pull/2664)  
- **状态：Open，已有修复 PR**  
- **严重程度：高**

问题表现：

- OpenClaw 升级至 v2026.8.1 后，POPO 2.1.13 在插件加载过程中可能触发 `ERR_REQUIRE_ESM_RACE_CONDITION`
- gateway 重启后可能无法正确挂载 POPO account listeners

**影响判断：**  
该问题可能导致 POPO 相关能力不可用，属于运行时集成层面的高风险问题。建议优先 review、合并并补充回归测试。

---

### 中优先级

#### Vite watcher 在 Windows junction 场景下超时或崩溃  
- **相关 PR：** [#2663 fix(dev): exclude generated directories from Vite watching](https://github.com/netease-youdao/LobsterAI/pull/2663)  
- **状态：Closed，已有修复**  
- **严重程度：中**

问题表现：

- 本地开发启动时，Vite 监听生成目录
- 如果目录中存在循环 Windows junction，可能导致启动超时或崩溃

**影响判断：**  
主要影响开发者体验，不一定影响最终用户。该修复有助于提高贡献者开发效率和 CI / 本地构建稳定性。

---

#### Windows 路径脱敏问题  
- **相关 PR：** [#2661 fix: openclaw windows path redaction](https://github.com/netease-youdao/LobsterAI/pull/2661)  
- **状态：Closed，已有修复**  
- **严重程度：中**

问题表现：

- OpenClaw 在 Windows 路径处理或日志输出中可能存在脱敏不足或不准确问题

**影响判断：**  
与隐私、安全和日志可读性相关。对桌面端 AI 助手来说，路径脱敏是基础安全体验，修复价值较高。

---

### 中低优先级

#### Markdown inline code / math / entity 渲染准确性问题  
- **相关 PR：** [#2662 feat(markdown): improve inline math, entities and live-preview rendering](https://github.com/netease-youdao/LobsterAI/pull/2662)  
- **状态：Closed，已有修复 / 增强**  
- **严重程度：中低**

问题表现：

- 行内公式、HTML entities、硬换行、表格对齐、inline code 识别等存在渲染或 live-preview 表现问题

**影响判断：**  
主要影响内容呈现质量和编辑体验。对于经常处理代码、公式和结构化文本的 AI 助手用户，该改进能明显提升可用性。

---

## 6. 功能请求与路线图信号

今日没有来自 Issue 的新功能请求。不过从 Open PR 可以观察到若干路线图方向。

### 账号登录与新用户引导

- **相关 PR：** [#2673 feat(auth): align login introduction with portal showcase](https://github.com/netease-youdao/LobsterAI/pull/2673)  
- **可能进入下一版本：高**

该 PR 已实现桌面端首次安装登录介绍页，并统一聊天登录提示视觉。它表明项目正在强化：

- 账号体系入口
- 官方 portal 与桌面端体验一致性
- 新用户 onboarding
- 协作或云端服务的前置引导

---

### OpenClaw runtime 持续升级与插件生态稳定化

- **相关 PR：** [#2665](https://github.com/netease-youdao/LobsterAI/pull/2665)、[#2664](https://github.com/netease-youdao/LobsterAI/pull/2664)  
- **可能进入下一版本：高**

OpenClaw 从 v2026.6.1 升级到 v2026.8.1 后，又出现专门处理 POPO SDK loading race 的修复 PR，说明后续版本很可能继续围绕：

- OpenClaw runtime 兼容性
- 插件加载可靠性
- IM / POPO 集成
- gateway 重启恢复能力

进行强化。

---

### Markdown / Artifact 编辑体验增强

- **相关 PR：** [#2662](https://github.com/netease-youdao/LobsterAI/pull/2662)  
- **可能进入下一版本：高**

Markdown 渲染增强说明 LobsterAI 对 artifact、文档、AI 输出内容的编辑体验仍在持续投入。该方向可能继续扩展到：

- 更完善的数学公式渲染
- 更准确的 GFM 兼容
- 更稳定的 live preview
- 面向知识库或协作文档的编辑增强

---

### 依赖与构建系统现代化

当前有多条 Dependabot PR 仍处于 Open 状态：

- [#2672 chore(deps): bump mermaid from 10.9.8 to 12.0.0](https://github.com/netease-youdao/LobsterAI/pull/2672)
- [#2671 chore(deps): bump react-dom from 18.3.1 to 19.3.0](https://github.com/netease-youdao/LobsterAI/pull/2671)
- [#2670 chore(deps-dev): bump @types/react-dom from 18.3.7 to 19.3.0](https://github.com/netease-youdao/LobsterAI/pull/2670)
- [#2669 chore(deps-dev): bump vite from 5.4.21 to 8.3.0](https://github.com/netease-youdao/LobsterAI/pull/2669)
- [#2668 chore(deps-dev): bump @sinclair/typebox from 0.34.49 to 0.34.52](https://github.com/netease-youdao/LobsterAI/pull/2668)
- [#2667 ci: bump trufflesecurity/trufflehog from 3.88.30 to 3.97.4](https://github.com/netease-youdao/LobsterAI/pull/2667)
- [#2666 ci: bump actions/labeler from 5 to 7](https://github.com/netease-youdao/LobsterAI/pull/2666)

**路线图信号：**  
项目正在准备一次较大范围的依赖现代化。特别是 React 18 → 19、Vite 5 → 8、Mermaid 10 → 12 都可能包含破坏性变更，需要谨慎分批合入。

---

## 7. 用户反馈摘要

今日没有 Issue 更新，也没有可用的 Issue 评论数据，因此无法提炼直接的真实用户反馈。

不过从 PR 内容可以间接推断当前关注的使用场景和痛点：

- **新用户首次使用路径：** [#2673](https://github.com/netease-youdao/LobsterAI/pull/2673) 表明登录与产品能力介绍仍需要更清晰的引导。
- **AI 输出内容编辑体验：** [#2662](https://github.com/netease-youdao/LobsterAI/pull/2662) 表明用户可能频繁处理 Markdown、公式、表格、代码等复杂内容。
- **OpenClaw / POPO 集成稳定性：** [#2664](https://github.com/netease-youdao/LobsterAI/pull/2664) 表明 runtime 升级后插件加载和账号监听是当前稳定性重点。
- **Windows 开发与运行环境：** [#2663](https://github.com/netease-youdao/LobsterAI/pull/2663)、[#2661](https://github.com/netease-youdao/LobsterAI/pull/2661) 均与 Windows 路径、junction 或 redaction 有关，说明 Windows 平台仍是需要重点验证的环境。

---

## 8. 待处理积压

基于今日数据，未发现长期未响应的重要 Issue；今日 Issue 更新数为 0。  
当前值得维护者优先关注的是仍处于 Open 状态的 9 条 PR，尤其是存在破坏性升级风险或运行时稳定性影响的 PR。

### 建议优先处理

#### [#2664 fix(openclaw): avoid POPO SDK loading races](https://github.com/netease-youdao/LobsterAI/pull/2664)  
**优先级：高**  
该 PR 直接修复 OpenClaw v2026.8.1 升级后的运行时竞态问题。建议优先 review、合并并补充针对 gateway 重启和 POPO account listeners 的回归验证。

#### [#2673 feat(auth): align login introduction with portal showcase](https://github.com/netease-youdao/LobsterAI/pull/2673)  
**优先级：中高**  
涉及新用户 onboarding 和登录路径，属于产品体验关键入口。建议重点检查跳过登录后的状态流转、Escape 行为、老用户升级路径以及不同平台窗口表现。

#### [#2671 react-dom 18.3.1 → 19.3.0](https://github.com/netease-youdao/LobsterAI/pull/2671) 与 [#2670 @types/react-dom 18.3.7 → 19.3.0](https://github.com/netease-youdao/LobsterAI/pull/2670)  
**优先级：中高**  
React 19 相关升级可能引入行为变化。建议与 renderer 测试、桌面端交互、登录页、Markdown live-preview 等复杂 UI 场景一起验证。

#### [#2669 Vite 5.4.21 → 8.3.0](https://github.com/netease-youdao/LobsterAI/pull/2669)  
**优先级：中高**  
Vite 跨多个主版本升级，可能影响开发服务器、构建配置、插件兼容性和 Electron renderer 打包。建议单独合入并进行完整构建验证。

#### [#2672 Mermaid 10.9.8 → 12.0.0](https://github.com/netease-youdao/LobsterAI/pull/2672)  
**优先级：中**  
Mermaid 主版本升级可能影响图表渲染语法和安全策略。考虑到 LobsterAI 可能处理 AI 生成图表，应验证常见流程图、时序图、类图、状态图等渲染兼容性。

#### [#2667 TruffleHog 3.88.30 → 3.97.4](https://github.com/netease-youdao/LobsterAI/pull/2667)  
**优先级：中**  
安全扫描工具升级通常风险较低，但可能改变误报 / 漏报行为。建议观察 CI 结果。

#### [#2666 actions/labeler 5 → 7](https://github.com/netease-youdao/LobsterAI/pull/2666)  
**优先级：中低**  
影响 PR 自动标签流程。建议确认 labeler 配置格式是否仍兼容 v7。

#### [#2668 @sinclair/typebox 0.34.49 → 0.34.52](https://github.com/netease-youdao/LobsterAI/pull/2668)  
**优先级：低到中**  
补丁级升级，风险相对较低，但仍建议跑 schema 校验相关测试。

---

## 项目健康度评估

**综合判断：健康，工程活跃度较高，但存在升级期兼容性风险。**

- **活跃度：高**  
  过去 24 小时有 13 条 PR 更新，说明维护活动密集。

- **用户反馈可见度：低**  
  今日无 Issue、无评论和反应数据，缺少外部用户问题与需求信号。

- **工程质量趋势：正向**  
  已处理多个稳定性和渲染体验问题，包括 Vite watcher、Windows 路径脱敏、Markdown live-preview 等。

- **主要风险：依赖与运行时升级集中发生**  
  OpenClaw、Electron、React、Vite、Mermaid 等均涉及重要升级，应避免一次性合入过多主版本变更，建议分批合并并加强回归测试。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报  
**日期：2026-09-15**  
**仓库：** [moltis-org/moltis](https://github.com/moltis-org/moltis)

---

## 1. 今日速览

过去 24 小时，Moltis 项目整体活跃度较低但仍有维护动作：未出现新的 Issue 更新，也没有新版本发布。今日唯一更新来自 1 个开放中的 Pull Request，聚焦于 OAuth / PKCE 相关测试稳定性修复。该 PR 尚未合并，说明项目今日主要处于测试可靠性维护阶段，而非功能推进或版本发布阶段。  
从健康度看，今日没有新增 Bug 报告、用户反馈或社区讨论，短期风险较低；但也意味着缺少来自社区侧的需求信号。

---

## 2. 项目进展

今日没有已合并或已关闭的 PR，因此暂无已落地的功能或修复。

### 待合并 PR

#### [PR #1269 test(oauth): remove success-popup timing race](https://github.com/moltis-org/moltis/pull/1269)  
- **状态：** Open  
- **作者：** penso  
- **创建时间：** 2026-09-15  
- **更新时间：** 2026-09-15  
- **评论数：** 未提供  
- **👍 反应：** 0  

**内容摘要：**  
该 PR 修复 OAuth / PKCE 测试中的时序竞争问题，具体与 `success-popup` 的关闭事件相关。当前测试依赖立即关闭的 callback popup 的 `page/close` 事件，可能导致 CI 中出现不稳定失败。PR 改为等待主页面上更持久的认证状态，从而提升 PKCE success 与 disconnect 测试的可靠性。

**影响分析：**  
- 属于测试稳定性改进，不直接改变用户可见功能。  
- 有助于降低 CI flaky test 风险，提升合并队列和自动化验证的可信度。  
- 与 reported run 相关：该 PR 摘要中提到修复 `moltis-064r`，来源于 GitHub Actions 失败记录。  

**项目推进程度：**  
今日尚无合并结果，因此实际代码主干暂无推进；但该 PR 若合并，将改善 OAuth 测试套件稳定性。

---

## 3. 社区热点

今日没有 Issue 更新，也没有带有明显评论或反应热度的 PR。

### 当前可关注讨论

#### [PR #1269 test(oauth): remove success-popup timing race](https://github.com/moltis-org/moltis/pull/1269)  
- **热度指标：** 👍 0，评论数未提供  
- **类型：** 测试稳定性 / CI 修复  
- **社区诉求判断：**  
  该 PR 反映出维护者正在处理自动化测试中的不稳定因素。虽然没有明显社区互动，但 CI 稳定性通常会影响贡献者体验、发布节奏和维护效率。若该问题频繁出现，建议维护者优先合并并观察后续 CI 结果。

---

## 4. Bug 与稳定性

今日没有新的 Issue 型 Bug 报告，也没有崩溃、回归或用户侧故障反馈。

### 稳定性相关 PR

#### [PR #1269 test(oauth): remove success-popup timing race](https://github.com/moltis-org/moltis/pull/1269)  
- **严重程度：** 中等  
- **问题类型：** CI / E2E 测试时序竞争  
- **是否已有 fix PR：** 是，当前 PR 即为修复  
- **状态：** 待合并  

**分析：**  
该问题并非直接面向终端用户的运行时 Bug，而是测试环境中的 race condition。它可能导致 OAuth / PKCE 相关测试在 GitHub Actions 中偶发失败，从而影响 CI 可信度。由于涉及认证流程测试，建议在合并前重点确认：  
- 修复是否覆盖 PKCE success 流程；  
- disconnect 测试是否稳定；  
- 是否保留了真实 popup 行为的测试覆盖；  
- 是否避免仅通过放宽断言掩盖问题。

---

## 5. 功能请求与路线图信号

今日没有新的功能请求类 Issue，也没有用户提出新的路线图建议。

从今日唯一 PR 看，项目当前短期重点更偏向于：  
- OAuth / PKCE 流程测试稳定性；  
- CI 可靠性；  
- 减少异步页面事件带来的 flaky test。  

### 可能进入下一版本的内容

#### [PR #1269 test(oauth): remove success-popup timing race](https://github.com/moltis-org/moltis/pull/1269)  
如果该 PR 合并，可能作为测试稳定性改进进入后续版本或开发分支，但它本身不构成面向用户的新功能。

---

## 6. 用户反馈摘要

今日没有新的 Issue 评论、用户反馈或社区讨论数据，因此无法提炼新的真实用户痛点或使用场景。

当前可观察到的间接反馈主要来自 CI 失败记录，而非用户反馈：  
- OAuth / PKCE 测试路径存在时序不稳定问题；  
- callback popup 的关闭事件不适合作为稳定断言依据；  
- 更可靠的测试策略应关注主页面的持久认证状态。  

相关 PR：  
- [PR #1269 test(oauth): remove success-popup timing race](https://github.com/moltis-org/moltis/pull/1269)

---

## 7. 待处理积压

基于本次提供的数据，过去 24 小时内没有长期未响应的 Issue 或 PR 信息，也没有可判定的历史积压项。

### 今日新增待关注项

#### [PR #1269 test(oauth): remove success-popup timing race](https://github.com/moltis-org/moltis/pull/1269)  
- **状态：** Open  
- **建议优先级：** 中  
- **建议处理方式：**  
  - 尽快完成 review；  
  - 核对 CI 是否稳定通过；  
  - 若该 PR 仅影响测试代码且风险较低，可优先合并以减少后续 CI 噪音。  

---

## 总体健康度评估

**今日项目健康度：稳定但活跃度偏低。**

- **维护活跃度：** 低，仅 1 个 PR 更新。  
- **发布节奏：** 今日无新版本。  
- **社区活跃度：** 低，无 Issue 更新、无明显讨论热度。  
- **稳定性风险：** 中低，当前关注点集中在 OAuth / PKCE 测试 flaky 问题。  
- **建议：** 优先处理 [PR #1269](https://github.com/moltis-org/moltis/pull/1269)，以提升 CI 稳定性和后续贡献效率。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报  
**日期：2026-09-15**  
**数据窗口：过去 24 小时**  
**仓库：agentscope-ai/CoPaw / QwenPaw 数据源**

---

## 1. 今日速览

过去 24 小时，项目活跃度较高：Issues 更新 16 条，其中 15 条仍处于打开状态，PR 更新 22 条，其中 20 条仍待合并。社区反馈集中在 **模型配置、Hub/桌面安全、文件预览、工具调用、MCP 接入、会话管理、Cron 任务** 等核心使用路径，说明 2.2.x 版本进入了较密集的真实场景验证阶段。

从 PR 侧看，维护者和贡献者正在集中推进 **Hub 多租户能力、托管模型、Token 预算、Cron 任务增强、Telegram 渠道修复、文件预览认证、安全治理** 等方向，项目迭代速度较快。与此同时，多个 Bug 涉及认证、上下文/会话状态、工具执行结果、ReAct 终止行为等关键链路，短期内稳定性仍是重点关注项。

今日无新版本发布。

---

## 2. 项目进展

### 已关闭 / 推进中的重要 PR

#### PR #7753：`fix(skill): update make-skill to v2.1 for better robustness`  
链接：https://github.com/agentscope-ai/QwenPaw/pull/7753  
状态：CLOSED

该 PR 针对 `make-skill` 进行了 v2.1 更新，重点提升技能生成流程的鲁棒性，包括要求先存储计划再创建草稿，避免跳过规划阶段直接进入草稿生成。虽然该 PR 当前为关闭状态，数据中未明确显示是否已合并，但其内容反映出项目正在加强 **Skill 生成链路的流程约束与可控性**。

影响方向：

- 提升 Skill 创建过程稳定性
- 降低 Agent 在生成技能时跳步、状态错乱的概率
- 对低代码/自动化 Skill 构建体验有直接影响

---

### 今日重要待合并 PR 进展

#### PR #7779：Hub 托管模型、邀请机制与 Token 预算  
链接：https://github.com/agentscope-ai/QwenPaw/pull/7779  
状态：OPEN

该 PR 是今日最重要的功能型推进之一。它允许 Hub 管理员为组织托管模型，使成员无需自行配置 Provider 或接触 API Key 即可开始使用，同时增加批量邀请、成员密码重置和组织/成员月度 Token 预算。

潜在影响：

- 强化企业/团队部署能力
- 降低新成员接入门槛
- 增强 API Key 安全隔离
- 为商业化、多租户、组织级治理打基础

---

#### PR #7776：Cron 任务配置增强与执行历史保留  
链接：https://github.com/agentscope-ai/QwenPaw/pull/7776  
状态：OPEN

该 PR 改进定时任务配置，支持普通文本任务输入、JSON 模式切换、按任务选择 Provider/Model，并增强 Inbox 中的结果检查体验。

潜在影响：

- Cron 任务从“配置型能力”向“可运营能力”演进
- 用户可更方便地追踪定时任务历史结果
- 对自动化 Agent、周期性任务、个人助理场景非常关键

---

#### PR #7766：Hub 模式原生文件预览认证修复  
链接：https://github.com/agentscope-ai/QwenPaw/pull/7766  
状态：OPEN  
关联 Issue：#7743  
Issue 链接：https://github.com/agentscope-ai/QwenPaw/issues/7743

该 PR 修复 Hub 模式下浏览器原生文件预览请求返回 401 的问题。Issue #7743 中用户报告，Agent 发送文件、图片或附件后，前端虽然生成了文件卡片和预览链接，但实际预览会失败并提示 `Not authenticated`。

影响方向：

- 修复 Hub 文件预览关键体验
- 提升 Agent 文件交付链路可用性
- 对企业 Hub 部署场景优先级较高

---

#### PR #7769：Desktop 本地 API 请求认证  
链接：https://github.com/agentscope-ai/QwenPaw/pull/7769  
状态：OPEN

该 PR 修复 Windows Desktop 在关闭账号登录时，本地后端可能被匿名调用的问题，涉及 MCP 配置和审批等敏感接口。PR 增加进程级 Desktop Session 验证，避免业务接口被未授权访问。

影响方向：

- 属于安全修复
- 涉及本地后端、MCP 配置、审批链路
- 建议优先审查并合入

---

#### PR #7757：治理层安全防护增强  
链接：https://github.com/agentscope-ai/QwenPaw/pull/7757  
状态：OPEN

该 PR 强化 destructive command 与系统凭证保护，将共享危险命令分类器接入 `PolicyGuardedTool` 治理路径。

影响方向：

- 阻止灾难性命令执行
- 强化默认 auto-deny 策略
- 对工具调用安全和企业部署非常重要

---

## 3. 社区热点

### Issue #7749：模型故障切换具体在哪里配置？  
链接：https://github.com/agentscope-ai/QwenPaw/issues/7749  
状态：OPEN  
评论数：4

用户已升级到 2.2.1，但无法在智能体模型配置界面找到“模型故障切换”功能，希望官方提供具体截图或入口说明。

背后诉求：

- 用户对新版本能力存在认知落差
- 功能可能已经实现但入口不明显
- 文档和 UI 引导不足

建议：

- 在文档中补充模型故障切换配置路径
- 在模型配置 UI 中增加显式入口或提示
- 发布版本说明中明确该能力是否仅限部分部署模式

---

### Issue #7772：无法连接 newapi 代理后的模型  
链接：https://github.com/agentscope-ai/QwenPaw/issues/7772  
状态：OPEN  
评论数：3

用户在 QwenPaw 2.2.0 中配置 `new-api:v1.0.0-rc.26` 代理后的模型，测试时返回错误，希望项目支持。

背后诉求：

- 用户使用 OpenAI-compatible 或聚合代理服务接入模型
- 对第三方网关兼容性要求提升
- 模型供应商生态正在从单一 Provider 转向代理/网关/统一 API

建议：

- 明确 new-api 兼容范围
- 提供 OpenAI-compatible Provider 的参数示例
- 若是请求格式/鉴权差异导致，应提供兼容层或错误提示优化

---

### Issue #7771：上下文压缩或新对话产生无意义空白标签  
链接：https://github.com/agentscope-ai/QwenPaw/issues/7771  
状态：OPEN  
评论数：2

用户在 Windows 10 Desktop 2.2.1 中发现，任务上下文管理进行压缩或新对话后，历史列表中产生无意义空白标签，例如 `Compact Chat Session Title`。

背后诉求：

- 会话历史需要稳定、清晰、可追溯
- 上下文压缩生成的中间态不应污染用户历史
- 桌面端用户对会话管理体验敏感

建议：

- 判断压缩会话是否应在历史列表中隐藏
- 若需要展示，应自动生成可读标题
- 避免 placeholder 字符串暴露给用户

---

### Issue #7767：Guardrail 插件构建中发现多个运行时问题  
链接：https://github.com/agentscope-ai/QwenPaw/issues/7767  
状态：OPEN  
评论数：2

该 Issue 报告了多个偏底层的问题，包括 Console 附件 stale blob、一次性 Cron 误触发丢失、Console tail-drop、`on_acting` 从未触发等。

背后诉求：

- 高级用户正在构建 guardrail 插件和中间件
- 插件生命周期、Console 附件流、Cron 执行语义存在边界问题
- 这类反馈通常来自深度使用者，对框架化能力有较高价值

建议：

- 拆分为多个可追踪子 Issue
- 为 middleware 生命周期补充测试
- 对 Console 附件和 Cron 一次性任务增加回归测试

---

## 4. Bug 与稳定性

以下按潜在严重程度排序。

### 高严重度

#### 1. Desktop 本地 API 匿名访问风险  
PR 链接：https://github.com/agentscope-ai/QwenPaw/pull/7769  
状态：已有 Fix PR，OPEN

Windows Desktop 在关闭账号登录时，本地后端可能暴露给匿名调用方，包括 MCP 配置和审批接口。该问题涉及本地安全边界，应优先审查。

影响：

- MCP 配置可能被非预期修改
- 审批链路可能被绕过
- 本地桌面用户存在安全风险

---

#### 2. Governance 未强制执行破坏性命令与系统凭证保护  
PR 链接：https://github.com/agentscope-ai/QwenPaw/pull/7757  
状态：已有 Fix PR，OPEN

该问题涉及工具治理路径中的安全缺口，破坏性命令和系统凭证保护未在部分路径中充分执行。

影响：

- Agent 工具调用可能执行危险命令
- 系统凭证可能被误用或泄漏
- 企业环境风险较高

---

#### 3. Hub 模式文件预览 401  
Issue 链接：https://github.com/agentscope-ai/QwenPaw/issues/7743  
PR 链接：https://github.com/agentscope-ai/QwenPaw/pull/7766  
状态：已有 Fix PR，OPEN

Hub 模式下，Agent 发送文件后，前端生成的预览链接会返回 `401 Unauthorized`。该问题影响文件、图片、附件交付，是 Hub 用户的核心体验问题。

影响：

- 文件卡片可见但不可预览
- 用户误以为文件发送失败
- Hub 部署可用性下降

---

#### 4. ReAct 达到 max_iters 后无最终回答且无警告  
Issue 链接：https://github.com/agentscope-ai/QwenPaw/issues/7775  
状态：OPEN，未见对应 Fix PR

用户报告 ReAct 回合在工具调用迭代中耗尽最大迭代次数后，会直接结束，不给最终回答，也不提示“达到最大迭代次数”。

影响：

- 用户只看到中间过程，没有最终结论
- 调试困难
- 对工具密集型 Agent 体验影响较大

建议：

- 强制 finalization 调用不应被抢占
- 即使无法生成最终答案，也应输出明确警告
- 添加 max_iters 边界测试

---

### 中严重度

#### 5. MCP client `dagu` 因 httpx.DecodingError 保持 inactive  
Issue 链接：https://github.com/agentscope-ai/QwenPaw/issues/7764  
状态：OPEN，未见对应 Fix PR

用户在控制台添加 Dagu MCP 客户端后，客户端一直为 `inactive`，日志显示 `httpx.DecodingError: zlib incorrect header check`。

影响：

- MCP 工具无法列出
- Dagu MCP 集成不可用
- 可能与 streamable_http 响应压缩头处理有关

建议：

- 检查 `Content-Encoding` 与实际响应体是否一致
- 增加对异常压缩响应的容错
- 在 MCP 客户端 UI 中展示更明确错误原因

---

#### 6. Agent 切换会删除 lastChatIdByAgent 并导致历史会话不可点击  
Issue 链接：https://github.com/agentscope-ai/QwenPaw/issues/7745  
状态：OPEN，未见对应 Fix PR

用户报告在 2.2.1-beta.2 中，每次切换 Agent 都会触发会话记账问题，导致上一个会话状态被删除，历史会话不可点击。

影响：

- 多 Agent 使用场景严重受影响
- 历史会话恢复不可靠
- 可能造成用户误以为数据丢失

---

#### 7. Console 附件 stale blob、Cron misfire、on_acting 不触发等  
Issue 链接：https://github.com/agentscope-ai/QwenPaw/issues/7767  
状态：OPEN，未见对应 Fix PR

这是一个组合型问题报告，涉及附件、多通道、定时任务、中间件生命周期。

影响：

- 插件生态开发者体验受损
- Guardrail 插件无法可靠工作
- 附件与 Console 流式输出可能存在数据一致性问题

---

### 低到中严重度

#### 8. 上下文压缩产生无意义空白标签  
Issue 链接：https://github.com/agentscope-ai/QwenPaw/issues/7771  
状态：OPEN

影响会话历史可读性，属于体验和状态管理问题。

---

#### 9. Tool result 每个 chunk 重复发射  
PR 链接：https://github.com/agentscope-ai/QwenPaw/pull/7762  
状态：已有 Fix PR，OPEN

该 PR 修复 `TOOL_RESULT_TEXT_DELTA` 每个 chunk 都重复发送累积工具结果的问题。

影响：

- 前端可能展示重复内容
- token/事件处理成本上升
- 对长工具输出尤其明显

---

#### 10. glob_search 不支持 brace expansion  
PR 链接：https://github.com/agentscope-ai/QwenPaw/pull/7761  
状态：已有 Fix PR，OPEN

修复如 `**/*.{csv,xlsx,json}` 这类模式无法匹配文件的问题。对数据分析、代码检索、文件工具调用有实际帮助。

---

## 5. 功能请求与路线图信号

### 1. 对话中明确调用内置工具或 MCP 工具  
Issue #7780：https://github.com/agentscope-ai/QwenPaw/issues/7780  
Issue #7778：https://github.com/agentscope-ai/QwenPaw/issues/7778  
Issue #7777：https://github.com/agentscope-ai/QwenPaw/issues/7777  
状态：#7777 已关闭，#7778 / #7780 仍 OPEN

用户建议在对话中支持通过 `//` 模糊搜索并明确调用内置工具或 MCP 工具，类似现有通过 `/` 调用 Skill 的体验。

路线图信号：

- 用户希望从“Agent 自动选择工具”转向“用户可控地指定工具”
- MCP 工具数量增加后，工具选择准确性成为痛点
- 该需求与 Console UI、工具注册、MCP 工具目录、Agent 执行协议均相关

纳入下一版本可能性：中高。  
原因是该功能与已有 `/` Skill 调用机制相似，产品逻辑清晰，且用户已重复提交多个 Issue，需求强度较高。

---

### 2. Hub 管理员托管模型与组织 Token 预算  
PR 链接：https://github.com/agentscope-ai/QwenPaw/pull/7779  
状态：OPEN

这是明确的产品路线信号：CoPaw/QwenPaw 正在加强组织级 Hub 能力。

可能进入下一版本的能力：

- 组织托管模型
- 成员免 Provider 配置
- 批量邀请
- 成员 Token 月度预算
- API Key 对普通成员隐藏

路线图意义：

- 更适合企业和团队部署
- 从个人助手产品走向组织级 Agent 平台
- 具备成本治理和权限治理基础

---

### 3. Cron 任务配置与结果检查增强  
PR 链接：https://github.com/agentscope-ai/QwenPaw/pull/7776  
状态：OPEN

用户和维护者都在推动 Cron 从基础定时执行走向可配置、可追踪、可审计。

可能进入下一版本的能力：

- 文本/JSON 双模式任务输入
- 单任务 Provider/Model 选择
- 保留执行历史
- Inbox 中更容易检查执行结果

路线图意义：

- 强化个人 AI 助手的主动任务能力
- 支持周期性报告、监控、提醒、自动化运营等场景

---

### 4. `send_file_to_user` 文件直接展示在回复区域  
Issue 链接：https://github.com/agentscope-ai/QwenPaw/issues/7744  
PR 链接：https://github.com/agentscope-ai/QwenPaw/pull/7750  
状态：已有 PR，OPEN，Under Review

用户认为当前文件只出现在折叠的工具步骤中，容易误导用户。PR #7750 已经实现将发送成功的文件展示在回复 artifact grid 中。

纳入下一版本可能性：高。  
原因是已有对应 PR 且处于 Review 状态，问题明确、影响范围清晰。

---

### 5. Skill 适用 Channel 列表不完整  
Issue 链接：https://github.com/agentscope-ai/QwenPaw/issues/7746  
状态：OPEN

用户希望自定义 Channel 增加后，可以限制某些 Skill 只在指定 Channel 使用。

路线图信号：

- 多 Channel 使用场景增长
- 用户需要更细粒度的 Skill 可见性和执行范围控制
- 与权限、路由、策略治理相关

纳入下一版本可能性：中。  
这类能力需要设计 Skill 与 Channel 的绑定关系，可能不只是 UI 改动。

---

### 6. 会话级缓存隔离  
Issue 链接：https://github.com/agentscope-ai/QwenPaw/issues/7755  
状态：OPEN

用户在 DeepSeek 模型场景下关注缓存命中率与会话级缓存隔离，希望参考 dsh 的 session-level cache isolation。

路线图信号：

- 高阶用户开始关注 LLM 调用成本和缓存效率
- 单 Key 多会话、多项目并行时需要隔离标识
- 与 Provider 参数透传、OpenAI-compatible 参数兼容有关

纳入下一版本可能性：中。  
需要避免向不支持的模型传递非法参数，同时为支持的 Provider 提供标准化隔离字段。

---

## 6. 用户反馈摘要

### 主要痛点

1. **模型配置入口不清晰**  
   代表 Issue：#7749  
   链接：https://github.com/agentscope-ai/QwenPaw/issues/7749  
   用户升级后找不到模型故障切换配置，说明新能力的发现性不足。

2. **第三方模型代理兼容性不足**  
   代表 Issue：#7772  
   链接：https://github.com/agentscope-ai/QwenPaw/issues/7772  
   用户正在通过 newapi 等代理网关接入模型，期待更强的 OpenAI-compatible 兼容性。

3. **Hub 模式文件体验不完整**  
   代表 Issue：#7743、#7744  
   链接：  
   - https://github.com/agentscope-ai/QwenPaw/issues/7743  
   - https://github.com/agentscope-ai/QwenPaw/issues/7744  
   用户希望 Agent 发送的文件可以直接预览和下载，而不是隐藏在工具调用详情中，且 Hub 认证问题会直接破坏体验。

4. **MCP 工具接入和调用可控性不足**  
   代表 Issue：#7764、#7780、#7778  
   链接：  
   - https://github.com/agentscope-ai/QwenPaw/issues/7764  
   - https://github.com/agentscope-ai/QwenPaw/issues/7780  
   - https://github.com/agentscope-ai/QwenPaw/issues/7778  
   用户既遇到 MCP 客户端 inactive 的稳定性问题，也希望能在对话中显式选择 MCP 工具。

5. **会话与上下文管理仍有回归风险**  
   代表 Issue：#7771、#7745  
   链接：  
   - https://github.com/agentscope-ai/QwenPaw/issues/7771  
   - https://github.com/agentscope-ai/QwenPaw/issues/7745  
   用户反馈包括无意义会话标签、历史会话不可点击等，表明 2.2.x 的会话状态管理仍需加强测试。

6. **自动化任务和插件开发者需要更稳定的生命周期语义**  
   代表 Issue：#7767，PR #7776  
   链接：  
   - https://github.com/agentscope-ai/QwenPaw/issues/7767  
   - https://github.com/agentscope-ai/QwenPaw/pull/7776  
   深度用户正在围绕 Cron、guardrail、middleware 构建扩展能力，对事件触发时机和执行历史有更高要求。

---

## 7. 待处理积压

由于本次数据窗口仅覆盖过去 24 小时，未发现“长期未响应”的历史积压项。但以下新近打开的问题和 PR 具有较高优先级，建议维护者重点关注。

### 高优先级待处理

#### PR #7769：Desktop 本地 API 请求认证  
链接：https://github.com/agentscope-ai/QwenPaw/pull/7769  
原因：安全相关，应优先 Review。

#### PR #7757：治理安全防护增强  
链接：https://github.com/agentscope-ai/QwenPaw/pull/7757  
原因：涉及破坏性命令和系统凭证保护，建议尽快合入。

#### PR #7766：Hub 文件预览认证修复  
链接：https://github.com/agentscope-ai/QwenPaw/pull/7766  
原因：已有明确用户 Issue #7743，直接影响 Hub 文件预览体验。

#### Issue #7775：max_iters 后无最终回答  
链接：https://github.com/agentscope-ai/QwenPaw/issues/7775  
原因：影响 ReAct 工具调用可靠性，当前未见对应 Fix PR。

#### Issue #7745：Agent 切换导致历史会话不可点击  
链接：https://github.com/agentscope-ai/QwenPaw/issues/7745  
原因：影响多 Agent 场景中的会话恢复和历史记录可信度。

#### Issue #7764：Dagu MCP client inactive  
链接：https://github.com/agentscope-ai/QwenPaw/issues/7764  
原因：MCP 是近期重要能力方向，该问题影响外部 MCP 服务接入。

---

## 项目健康度评估

整体来看，CoPaw 今日处于 **高活跃、高迭代、高反馈密度** 状态。PR 数量明显高于 Issue 关闭数量，说明维护者和社区正在积极提交修复与功能增强，但合并节奏仍需跟上问题增长速度。

健康信号：

- Hub、Cron、Telegram、Console、Desktop、安全治理均有 PR 推进
- 多位 first-time contributor 参与贡献
- 用户反馈覆盖真实部署、MCP、Hub、多 Channel、文件交付等实际场景

风险信号：

- 安全相关 PR 尚未合并
- 会话管理、文件预览、MCP 接入、ReAct 终止行为存在稳定性问题
- 文档和 UI 可发现性仍不足，尤其是模型故障切换、云端部署、第三方模型代理配置

综合判断：项目活跃度高，产品能力快速扩展，但当前阶段应优先保证 **安全修复、Hub 可用性、MCP 稳定性、会话状态一致性**，再推进更大范围的新功能合入。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报

日期：2026-09-15  
仓库：github.com/zeroclaw-labs/zeroclaw

---

## 1. 今日速览

过去 24 小时 ZeroClaw 维持了较高开发活跃度：新增/活跃 Issue 5 条，PR 更新 15 条，其中 8 条仍待合并，7 条已关闭或完成处理。今日重点集中在 **Provider 多模态安全、Telegram 通道阻塞、系统 Prompt 缓存稳定性、ZeroCode 交互体验、CI 风险识别** 等方向。

整体看，项目处于高频修复与治理阶段：多个 P1 / high-risk 问题已被提出，并且部分已出现对应修复 PR，说明维护响应速度较快。但同时，涉及 provider、runtime、agent prompt、channel 的高风险问题较多，短期内稳定性和安全边界仍是主要压力点。

今日无新版本发布。

---

## 2. 项目进展

今日关闭/完成处理的 PR 主要集中在依赖更新、ZeroCode 体验修复、文档澄清和工具提示优化等方面。

### 依赖与安全维护

#### #10852 chore(deps): bump the rust-all group across 1 directory with 41 updates  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10852  
状态：Closed  
标签：dependencies, risk:medium, size:XS

该 PR 批量更新 Rust 依赖共 41 项，并特别提到包含 `rustls 0.23.45`，用于修复 `RUSTSEC-2026-0285`。维护者保留了 `lettre 0.11.22`、`flate2 1.1.9`、`cpal 0.18.1`，原因是更高版本会引入重复依赖版本并违反现有策略。

项目意义：  
- 推进依赖安全性；
- 表明项目对依赖树一致性和安全公告保持主动维护；
- 该类变更风险为 medium，后续仍需关注是否引入兼容性回归。

#### #10851 chore(deps): bump the actions-all group with 2 updates  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10851  
状态：Closed  
标签：ci, dependencies, risk:medium

该 PR 更新 GitHub CodeQL Action 相关依赖，包括 `github/codeql-action/init` 和 `github/codeql-action/analyze`。

项目意义：  
- 改善 CI 安全扫描能力；
- 保持 GitHub Actions 依赖更新；
- 对项目安全治理有正向作用。

#### #10850 chore(deps): bump distroless/cc-debian13  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10850  
状态：Closed  
标签：ci, dependencies, risk:medium

该 PR 更新 distroless 基础镜像摘要版本。摘要中提示 registry 未提供发布日期，因此无法应用 cooldown 策略。

项目意义：  
- 推进容器基础镜像安全与可维护性；
- 但由于缺少发布时间，供应链审计上存在一定不确定性。

---

### ZeroCode 用户体验修复

#### #10848 fix(zerocode): localize daemon readiness diagnostics  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10848  
状态：Closed  
标签：bug, zerocode, risk:low

该 PR 修复 ZeroCode daemon 等待提示和 socket 超时提示未接入 Fluent 本地化目录的问题。此前这些诊断信息为硬编码英文，绕过了国际化机制。

项目意义：  
- 改善非英语用户体验；
- 提升 ZeroCode UI/诊断信息一致性；
- 属于低风险可用性修复。

#### #10846 fix(zerocode): handle the Delete key in the chat composer  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10846  
状态：Closed  
标签：bug, zerocode, risk:low

该 PR 修复 ZeroCode 聊天输入框中 `Delete` 键无法触发 forward-delete 行为的问题。此前 `InputBarAction` 未处理 `KeyCode::Delete`，导致按键落入普通输入路径。

项目意义：  
- 修复基础文本编辑行为；
- 改善聊天输入流畅度；
- 对日常 ZeroCode 使用体验有直接影响。

---

### 文档与运维说明

#### #10847 docs(ops): describe reload-refusal recovery by platform  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10847  
状态：Closed  
标签：docs, risk:low

该 PR 澄清了 service reload 被拒绝后的恢复行为。原文泛化称 service manager 会重启为新进程，但实际上不同平台和管理器行为不同。

项目意义：  
- 降低运维误解；
- 对生产部署和平台差异说明更准确；
- 改善运维文档可靠性。

---

### 工具与 Prompt 输出质量

#### #10845 fix(tools): render one summary line per tool in the deferred MCP index  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10845  
状态：Closed  
标签：bug, tool, agent:prompt, tool:mcp, risk:medium

该 PR 修复 deferred MCP index 中工具摘要渲染问题，使每个 deferred tool 只渲染一行摘要，并限制长度。此前摘要可能输出过多内容，影响 prompt 清晰度与 token 使用。

项目意义：  
- 改善 MCP 工具索引的可读性；
- 降低 prompt 噪声；
- 对 agent 工具调用表现和上下文利用效率有积极影响。

---

## 3. 社区热点

今日最值得关注的热点并非来自评论量或点赞量，而是来自 **风险等级高、影响面广、已有修复跟进** 的 Issue/PR 组合。所有新 Issue 评论数均为 1、点赞为 0，说明尚未形成大规模讨论，但多个问题已被标记为 P1 / high-risk。

### 热点 1：多模态内容边界与 provider 安全

#### Issue #10854 [Bug]: Literal image marker in tool output is promoted into malformed provider image  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10854  
标签：bug, agent, provider, runtime, tool, provider:anthropic, domain:security, priority:p1, risk:high

该问题描述：普通工具输出文本中如果包含形如 `[IMAGE:...]` 的标记，预处理逻辑会将其提升为 provider-facing image，即使它原本只是文本内容。这可能导致 provider 请求格式异常，甚至产生安全边界混淆。

相关 PR：

#### PR #10860 fix(providers): keep non-image data-URI markers in tool results as text  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10860  
状态：Open  
标签：bug, docs, agent, channel, provider, runtime, domain:security, risk:high

该 PR 尝试修复 data URI marker 的处理逻辑，确保非图像 data URI 在工具结果中保持为文本，而不是被错误提升为图片。

背后诉求：  
- 用户和维护者需要更明确的多模态输入边界；
- 工具输出不应被隐式解释为用户上传的媒体；
- provider adapter 层需要更严格区分文本、图片、工具结果和模型输入结构。

---

### 热点 2：系统 Prompt 缓存被日期字段破坏

#### Issue #10858 [Bug]: DateTimeSection invalidates cached prefix at midnight  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10858  
标签：bug, agent, provider, runtime, agent:prompt, priority:p1, risk:medium

该问题指出 `SystemPromptBuilder::with_defaults()` 将 `DateTimeSection` 放在系统 prompt 最前方，而该字段每次请求基于 `Local::now()` 生成。因此午夜时系统 prompt 字节变化，会导致 provider prompt cache 的整个前缀失效。

相关 PR：

#### PR #10862 fix(runtime): keep the current date out of the cached system prompt  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10862  
状态：Open  
标签：bug, agent, provider, runtime, agent:prompt, risk:medium

背后诉求：  
- 用户希望长期会话在日期变化时不损失 prompt cache；
- 维护者需要在“模型获得当前日期”和“缓存前缀稳定性”之间取得平衡；
- 该问题直接影响成本、延迟和 provider 缓存命中率。

---

### 热点 3：OpenCode session affinity header 后续修复

#### Issue #10853 [Task]: OpenCode session header follow-ups from #10604  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10853  
标签：bug, docs, provider:openai, provider:compatible, domain:security, priority:p2, risk:high

该任务跟进 #10604 中关于 `x-opencode-session` affinity header 的审查遗留问题，重点包括 malformed operator-pinned header 可能抑制 fallback token 等情况。

相关 PR：

#### PR #10864 fix(providers): close OpenCode session header follow-ups  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10864  
状态：Open  
标签：docs, provider, provider:openai, provider:compatible, size:M

背后诉求：  
- OpenCode provider 请求需要稳定 session affinity；
- header 注入和 fallback 逻辑需要安全、可预测；
- 兼容 OpenAI-compatible provider 时需处理更多边界条件。

---

### 热点 4：Telegram rejected voice update 阻塞后续消息

#### Issue #10863 [Bug]: Telegram retries rejected voice updates indefinitely  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10863  
标签：bug, channel, provider, channel:telegram, priority:p1, risk:high

该问题来自生产事故反馈：Telegram long polling 中，如果某个 voice update 被持续拒绝，可能阻塞后续消息投递。

背后诉求：  
- 通道层需要更健壮的失败隔离；
- 单条异常消息不应阻塞整个 channel 的后续消息；
- Telegram 集成在生产环境下需要更可靠的 offset / retry 策略。

目前数据中未看到对应修复 PR，建议维护者优先跟进。

---

## 4. Bug 与稳定性

以下按严重程度和影响范围排序。

### S1 / P1 / High Risk

#### 1. Telegram voice update 被无限重试，阻塞后续消息  
Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/10863  
状态：Open  
标签：priority:p1, risk:high, channel:telegram  
是否已有 fix PR：未在今日数据中发现

影响：  
- Telegram long polling 可能被单条异常 voice update 卡住；
- 后续消息无法正常送达；
- 属于生产工作流阻塞级问题。

建议：  
- 优先设计“拒绝消息后仍推进 offset”或隔离失败 update 的策略；
- 增加 channel 层死信/跳过机制；
- 补充 Telegram 回归测试。

---

#### 2. 工具输出中的图片标记被错误提升为 provider image  
Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/10854  
PR：https://github.com/zeroclaw-labs/zeroclaw/pull/10860  
状态：Issue Open，PR Open  
标签：priority:p1, risk:high, domain:security

影响：  
- 普通文本工具输出可能被错误解释为图片；
- 可能导致 provider 400、请求结构异常或安全边界混淆；
- 涉及 Anthropic provider、多模态预处理、tool result 处理。

当前进展：  
- 已有 PR #10860 进行修复，重点是将非图像 data URI marker 保持为文本。

---

#### 3. ZeroCode 向无 vision 能力模型发送图片导致 provider 400  
Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/10857  
状态：Open  
标签：priority:p1, risk:high, zerocode, provider:compatible, domain:security  
是否已有 fix PR：未在今日数据中发现

影响：  
- ZeroCode 允许用户在任意 session 附加图片；
- 若模型无 vision 能力，provider 可能返回 400；
- 当前仅在模型显式配置 `vision = false` 时 daemon 才降级图片，未覆盖 provider family 默认声明能力不足的情况。

建议：  
- ZeroCode UI 层提前检查 session model capability；
- daemon 层做最终兜底；
- provider-compatible 模型需建立明确能力探测或配置默认值。

---

### P1 / Medium Risk

#### 4. DateTimeSection 导致系统 Prompt 缓存每日失效  
Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/10858  
PR：https://github.com/zeroclaw-labs/zeroclaw/pull/10862  
状态：Issue Open，PR Open  
标签：priority:p1, risk:medium

影响：  
- 午夜后所有开放 session 的 cached prefix 被整体 invalidated；
- 增加 token 成本和延迟；
- 对依赖 provider prompt cache 的用户影响明显。

当前进展：  
- PR #10862 已提出，将当前日期移出缓存稳定的 system prompt 区域。

---

### P2 / High Risk

#### 5. OpenCode session affinity header 边界问题  
Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/10853  
PR：https://github.com/zeroclaw-labs/zeroclaw/pull/10864  
状态：Issue Open，PR Open  
标签：priority:p2, risk:high

影响：  
- malformed `x-opencode-session` header 可能导致 fallback token 被抑制；
- 请求可能丢失 session affinity；
- 影响 OpenCode 与 OpenAI-compatible provider 的一致性。

当前进展：  
- PR #10864 已针对 follow-up 项进行收敛修复。

---

### 低风险稳定性修复

#### #10859 fix(runtime): gate Unix-only test support on Windows  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10859  
状态：Open  
标签：runtime, skills, tool:delegate, risk:low

影响：  
- Windows 测试编译中 Unix-only test helper 可能被报告为 unused；
- 该 PR 使用 `cfg(unix)` 限定导入、类型和 mock provider。

价值：  
- 改善跨平台测试稳定性；
- 对 Windows 开发者更友好。

---

## 5. 功能请求与路线图信号

今日没有明显的全新大型功能请求，但若干 PR 和 Issue 透露了下一阶段路线图信号。

### 1. 多模态能力治理会成为短期重点

相关 Issue / PR：  
- #10854：https://github.com/zeroclaw-labs/zeroclaw/issues/10854  
- #10857：https://github.com/zeroclaw-labs/zeroclaw/issues/10857  
- #10860：https://github.com/zeroclaw-labs/zeroclaw/pull/10860  

信号：  
ZeroClaw 正在加强图片、data URI、tool output、provider vision capability 之间的边界控制。下一版本很可能包含多模态输入校验和 provider capability 检查方面的改进。

---

### 2. Prompt cache 成本优化正在进入修复周期

相关 Issue / PR：  
- #10858：https://github.com/zeroclaw-labs/zeroclaw/issues/10858  
- #10862：https://github.com/zeroclaw-labs/zeroclaw/pull/10862  
- #10856：https://github.com/zeroclaw-labs/zeroclaw/pull/10856  

信号：  
项目正在重新审视时间信息在 system prompt 和 per-turn context 中的位置。  
一方面 #10862 希望避免当前日期破坏缓存前缀；另一方面 #10856 又希望在每轮 channel context preamble 中加入 weekday，帮助模型正确判断当前星期。

这表明路线可能是：  
- 保持系统 prompt 稳定；
- 将易变上下文移动到 per-turn 区域；
- 在不牺牲缓存命中的前提下提升模型时效理解能力。

---

### 3. ZeroCode 会继续优化多会话和输入体验

相关 PR：  
- #10849：https://github.com/zeroclaw-labs/zeroclaw/pull/10849  
- #10846：https://github.com/zeroclaw-labs/zeroclaw/pull/10846  
- #10848：https://github.com/zeroclaw-labs/zeroclaw/pull/10848  

#10849 将 `Ctrl+N` 语义改为 additive，即新增 sibling session，而不是重启当前 session，同时移除 row close control。该 PR 仍为 Open。

可能进入下一版本的变化：  
- 更一致的新会话创建语义；
- 更少误操作风险；
- ZeroCode chat composer 基础编辑能力继续完善；
- daemon ready 诊断信息本地化。

---

### 4. CI 风险分类和治理自动化增强

相关 PR：  
- #10861：https://github.com/zeroclaw-labs/zeroclaw/pull/10861  

该 PR 新增 report-only PR risk classifier，包含 `.github/risk-labeler.yml` 和相关 GitHub workflow。

路线图信号：  
- 项目正在加强高风险路径变更的自动识别；
- 当前为 report-only，说明短期不会强制阻塞 PR；
- 后续可能演进为更严格的合并门禁或维护者提醒机制。

---

### 5. Governance / RFC 流程继续简化

相关 PR：  
- #10855：https://github.com/zeroclaw-labs/zeroclaw/pull/10855  

该 PR 是 stacked PR，用于实现 RFC vote simplification。虽然属于文档治理，不直接影响运行时功能，但反映项目正在优化贡献流程。

---

## 6. 用户反馈摘要

基于今日 Issue 与 PR 摘要，用户反馈主要集中在以下几类痛点。

### 1. 生产通道不能被单条异常消息阻塞

相关 Issue：  
- #10863：https://github.com/zeroclaw-labs/zeroclaw/issues/10863  

真实场景：Telegram voice update 被持续拒绝后，long polling 无法继续处理后续消息。  
用户痛点：  
- 生产机器人或助手通道被卡死；
- 后续正常消息也受影响；
- 用户希望 channel 层具备失败隔离和自动恢复能力。

---

### 2. Provider 请求失败应在本地提前拦截

相关 Issue：  
- #10857：https://github.com/zeroclaw-labs/zeroclaw/issues/10857  

真实场景：ZeroCode 允许向 text-only 模型 session 附加图片，最终 provider 返回 400。  
用户痛点：  
- 错误发生太晚；
- provider 400 对终端用户不友好；
- 用户期望 UI 或 daemon 能基于模型能力提前提示或降级。

---

### 3. Prompt cache 稳定性直接影响成本和延迟

相关 Issue / PR：  
- #10858：https://github.com/zeroclaw-labs/zeroclaw/issues/10858  
- #10862：https://github.com/zeroclaw-labs/zeroclaw/pull/10862  

真实场景：午夜日期变化导致所有开放 session 的系统 prompt 前缀失效。  
用户痛点：  
- 长会话成本上升；
- 响应延迟增加；
- 缓存收益不可预测。

---

### 4. ZeroCode 用户希望交互符合常见编辑器习惯

相关 PR：  
- #10846：https://github.com/zeroclaw-labs/zeroclaw/pull/10846  
- #10849：https://github.com/zeroclaw-labs/zeroclaw/pull/10849  

真实场景：  
- Delete 键无法执行 forward-delete；
- `Ctrl+N` 与 sidebar `[+]` 的“新建 session”语义不一致。

用户痛点：  
- 常用快捷键行为不符合预期；
- 会话操作语义不一致可能导致误操作；
- 用户希望 ZeroCode 更接近成熟 IDE / chat UI 的交互模型。

---

### 5. 非英语用户需要完整本地化

相关 PR：  
- #10848：https://github.com/zeroclaw-labs/zeroclaw/pull/10848  

真实场景：ZeroCode daemon readiness diagnostics 仍有英文硬编码。  
用户痛点：  
- 本地化覆盖不完整；
- 诊断信息在问题排查时不够友好；
- 国际用户体验受到影响。

---

## 7. 待处理积压

基于当前提供的 24 小时数据，未发现“长期未响应”的 Issue 或 PR。今日新开的 5 个 Issue 均已有状态标签或评论，多个问题已有对应 PR，说明维护响应总体及时。

但以下高优先级事项建议维护者重点关注：

### 1. Telegram 阻塞问题尚未看到修复 PR  
Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/10863  
原因：P1、risk:high，且影响生产消息流。  
建议优先级：最高。

### 2. ZeroCode vision capability 检查尚未看到修复 PR  
Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/10857  
原因：P1、risk:high，涉及 provider 400 和多模态能力边界。  
建议优先级：高。

### 3. 多个 high-risk PR 仍处于 Open，需要尽快 review  
- #10860：https://github.com/zeroclaw-labs/zeroclaw/pull/10860  
- #10861：https://github.com/zeroclaw-labs/zeroclaw/pull/10861  
- #10855：https://github.com/zeroclaw-labs/zeroclaw/pull/10855  

建议：  
- 对安全边界相关 PR 优先 review；
- 对 CI 风险分类 PR 可先保持 report-only 合入，以增强后续治理能力；
- 对 stacked governance PR 注意依赖关系，避免 review 范围混淆。

---

## 健康度评估

今日 ZeroClaw 活跃度高，维护响应较快，多个高风险问题已经进入修复阶段。项目健康度整体偏正向，但短期稳定性风险集中在三处：

1. 多模态内容处理和 provider capability 校验；
2. Telegram 等 channel 的失败隔离；
3. prompt cache 稳定性与动态上下文设计。

如果 #10860、#10862、#10864 能在短期内完成 review 并合入，ZeroClaw 在 provider 安全、缓存效率和 OpenCode 兼容性方面会有明显改善。当前最需要补位的是 #10863 和 #10857 这两个尚未看到修复 PR 的 P1/high-risk 问题。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*