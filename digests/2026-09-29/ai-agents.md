# OpenClaw 生态日报 2026-09-29

> Issues: 7 | PRs: 65 | 覆盖项目: 13 个 | 生成时间: 2026-09-29 04:47 UTC

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
**日期：2026-09-29**  
**仓库：** https://github.com/openclaw/openclaw

---

## 1. 今日速览

OpenClaw 今日活跃度非常高：过去 24 小时内有 **7 条 Issue 更新**、**65 条 PR 更新**，其中 **47 条仍待合并**、**18 条已关闭或合并**，并发布了 **1 个 extended-stable 版本**。  
项目当前重点集中在 **Gateway 可用性、消息投递可靠性、会话状态一致性、安全边界、模型目录与插件运行时稳定性** 等核心路径。  
今日新增或活跃的问题中出现了 **P0 崩溃/阻塞级回归**，尤其是大型外部插件捕获导致 Gateway 阻塞数分钟的问题，说明 2026.9.6 线仍存在高优先级稳定性风险。  
与此同时，多个高优先级 PR 正在修复热重载取消运行、worker 卡死、快照清理、请求唤醒丢失等问题，显示维护团队正在集中处理运行时可靠性和升级安全性。

---

## 2. 版本发布

### v2026.8.33：openclaw 2026.8.33  
链接：当前数据未提供 Release URL，可查看仓库 Releases：  
https://github.com/openclaw/openclaw/releases

这是一个 **gateway-only extended-stable** 版本。根据发布说明，`extended-stable` 是 OpenClaw 当前等价于 LTS 的稳定维护线。

#### 更新内容概览

该版本基于 **2026 年 8 月底的 OpenClaw**，并额外合入：

- 关键安全更新
- 可靠性修复
- 性能修复
- 新模型支持
- Gateway 相关稳定性改进

当前最新主线版本仍为 **OpenClaw 2026.9.6**，而 `v2026.8.33` 面向的是需要稳定维护线的用户。

#### 破坏性变更

从提供的数据看，本次 release 未明确标注破坏性变更。  
但由于这是 gateway-only extended-stable 版本，用户应注意：

- 它并不等同于完整主线功能更新；
- 功能集可能落后于 2026.9.x；
- 适合生产环境追求稳定性的 Gateway 部署，而非追求最新功能的用户。

#### 迁移与升级注意事项

建议用户在升级到 `v2026.8.33` 前重点检查：

1. **Gateway 配置兼容性**  
   尤其是认证、插件、模型 Provider 和通道配置。

2. **生产环境回滚策略**  
   extended-stable 虽偏稳定，但仍包含安全和性能修复，建议保留旧 Gateway 二进制与配置备份。

3. **与主线版本差异**  
   当前主线为 `2026.9.6`，若用户依赖 2026.9.x 新功能，应避免误切到 2026.8 extended-stable。

---

## 3. 项目进展

今日 PR 活动密集，主要推进方向是 **运行时可靠性、升级安全、会话一致性、UI 体验和 CI 稳定性**。

### 重要已关闭 / 可能已完成 PR

> 注：数据仅显示 `CLOSED`，未区分 merged 与直接关闭，因此以下按“已关闭或完成处理”表述。

#### 1. 保留插件设置，修复更新恢复路径  
PR：[#160344](https://github.com/openclaw/openclaw/pull/160344)  
状态：Closed  
标签：`P0`, `cli`, `commands`, `docs`

该 PR 修复了更新修复流程中插件迁移遗留的问题。此前在没有 package payload 变化时，插件迁移可能仍保持 pending；兼容性拒绝还可能导致 Doctor 把本地插件误判为已移除，从而删除 allowlist 与设置。

**影响：**

- 提升升级恢复可靠性；
- 降低插件配置丢失风险；
- 对使用本地插件、迁移插件和 Doctor 修复流程的用户很关键。

---

#### 2. Cron reconciliation 生命周期重构  
PR：[#160928](https://github.com/openclaw/openclaw/pull/160928)  
状态：Closed  
标签：`gateway`, `size: S`

该 PR 清理 cron reconciliation 中重复的 stale-work fence 和 mutation fencing 逻辑。

**影响：**

- 无显式用户可见行为变化；
- 降低系统任务生命周期管理复杂度；
- 有助于减少后续 Gateway 定时任务相关缺陷。

---

#### 3. Durable receive / ingress 读写契约清理  
PR：[#160961](https://github.com/openclaw/openclaw/pull/160961)  
状态：Closed  
标签：`refactor`, `size: S`

该 PR 简化 ingress journal 与 read contracts 的内部类型和私有选项别名。

**影响：**

- 无运行时行为变化；
- 改善代码可维护性；
- 为后续 durable receive / ingress 路径修复降低复杂度。

---

#### 4. 移除 Unix daemon fixture 中未使用控制项  
PR：[#160874](https://github.com/openclaw/openclaw/pull/160874)  
状态：Closed  
标签：`gateway`, `P3`

该 PR 删除 Unix daemon 测试 fixture 中未使用的控制项和记录数据。

**影响：**

- 无用户可见变化；
- 改善测试清晰度；
- 减少维护负担。

---

#### 5. 刷新 Control UI 本地化文件  
PR：[#160880](https://github.com/openclaw/openclaw/pull/160880)  
状态：Closed  
标签：`app: web-ui`

自动化生成的 Control UI locales 更新，通过可审查 PR 方式同步本地化资源。

**影响：**

- 改善 UI 文案和多语言同步；
- 不涉及核心运行时变更。

---

### 今日仍在推进的关键开放 PR

#### 1. 修复 settlement publication 失败后的 requester wake 保留问题  
PR：[#160472](https://github.com/openclaw/openclaw/pull/160472)  
标签：`P1`, `gateway`, `agents`, `merge-risk: message-delivery`, `merge-risk: availability`

该 PR 解决 requester wake transition 在 Gateway 线程写 SQLite，以及 acknowledgement 或 host publication 失败时已提交工作可能丢失的问题。

**项目推进意义：**

- 明显强化消息投递可靠性；
- 降低 settlement 后请求方无法被唤醒的风险；
- 属于高风险高价值的运行时修复。

---

#### 2. 防止 worker turn 因 group signal 被拒而卡住  
PR：[#160465](https://github.com/openclaw/openclaw/pull/160465)  
标签：`P1`, `gateway`, `agents`, `availability`, `security-sensitive-changed`

该 PR 修复在 host 禁止 process-group signals 时，完成的 worker 可能遗留 unresolved reservation，导致后续 turn 无法启动的问题。

**项目推进意义：**

- 改善多任务调度可靠性；
- 对受限运行环境、沙箱环境、生产 Gateway 非常重要。

---

#### 3. Gateway 热配置重载不再取消已接受运行  
PR：[#160909](https://github.com/openclaw/openclaw/pull/160909)  
标签：`P1`, `gateway`, `message-delivery`, `security-boundary`

该 PR 修复热重载认证传输策略时，所有 in-flight agent run 被错误取消为 `authority-revoked` 的问题。

**项目推进意义：**

- 直接提升生产 Gateway 可用性；
- 减少配置变更造成的用户请求中断；
- 该问题已在 Team Gateway 中观察到，具备真实生产背景。

---

#### 4. 保留 shared-state 快照直到 worker 失败路径完成  
PR：[#160946](https://github.com/openclaw/openclaw/pull/160946)  
标签：`P2`, `gateway`, `agents`, `availability`

该 PR 修复 shared-state snapshot 在 SQLite 子进程尚未完成时被过早释放的问题。

**项目推进意义：**

- 提升共享状态读取可靠性；
- 降低 worker failure 下的数据读取不一致风险。

---

#### 5. extended-stable 2026.8.34 准备工作  
PR：[#160960](https://github.com/openclaw/openclaw/pull/160960)  
标签覆盖大量 channel、extensions、plugins、apps

该 PR 准备 `extended-stable 2026.8.34`，覆盖 Doctor、认证、会话、通道、插件、沙箱、文件系统安全、模型运行时和发布打包等大量修复。

**项目推进意义：**

- 说明 2026.8 extended-stable 线仍在积极维护；
- 面向生产用户的稳定线即将继续吸收关键修复；
- 覆盖面极广，需重点审查兼容性和回归风险。

---

## 4. 社区热点

由于 PR 数据中的评论数字段为 `undefined`，无法严格按评论数排序。以下按 Issue 评论数、优先级、风险标签和影响面综合判断今日热点。

### 1. Gateway 捕获大型外部插件时阻塞数分钟  
Issue：[#160959](https://github.com/openclaw/openclaw/issues/160959)  
状态：Open  
严重度：`P0`, `impact: crash-loop`, `diamond lobster`  
评论数：2  
相关背景：2026.9.6 回归，关联插件 generation capture 变更。

**核心诉求：**

用户报告自插件 generation capture 合入并在 2026.9.6 发布后，Gateway 在遇到大型外部插件或 workspace plugin 时会在启动及 prepared model runtime 重新发布时阻塞 event loop 数分钟。

**背后需求：**

- Gateway 启动路径不能被大型插件同步阻塞；
- 外部插件扫描、捕获、依赖树分析需要异步化或限流；
- prepared model runtime 发布不应拖垮 Gateway 响应能力。

**健康度信号：**

这是今日最值得维护者优先关注的问题之一，因为它是 **P0 回归**，且影响 Gateway 可用性。

---

### 2. prepared-model-catalog worker 内存超过限制  
Issue：[#160522](https://github.com/openclaw/openclaw/issues/160522)  
状态：Open  
严重度：`P2`, `silver shellfish`  
评论数：5

**核心诉求：**

`prepared-model-catalog` worker 在设置 `maxOldGenerationSizeMb: 512` 的情况下仍常驻超过 **1.15 GB**。

**背后需求：**

- 模型目录生成应有可预测的内存上限；
- worker isolate 的 V8 old generation 限制与实际 RSS 使用之间需要更清晰的监控和约束；
- 大模型目录、多 Provider 或复杂 metadata 情况下需要优化内存占用。

**健康度信号：**

该问题评论数最高，说明模型目录准备流程的资源占用正成为用户和维护者共同关注点。

---

### 3. Matrix autoJoinAllowlist 接受 user ID 但运行时不匹配  
Issue：[#160951](https://github.com/openclaw/openclaw/issues/160951)  
状态：Open  
严重度：`P2`, `impact: ux-friction`, `needs-product-decision`  
评论数：2

**核心诉求：**

`channels.matrix.autoJoinAllowlist` schema 允许 Matrix user ID，例如 `@user:server`，但运行时 invite check 只匹配 room ID、alias 或 `*`，不会匹配邀请者 user ID。

**背后需求：**

- 配置 schema 与运行时行为一致；
- 用户希望基于邀请者身份控制自动加入；
- 需要产品层决定：是支持 user ID allowlist，还是收紧 schema 并明确文档。

---

### 4. 多人 steering 时工具应代表实际请求者执行  
PR：[#160525](https://github.com/openclaw/openclaw/pull/160525)  
状态：Open  
标签：`P1`, `security-boundary`, `compatibility`, `security-sensitive-changed`

**核心诉求：**

当多个用户 steer 同一 turn 时，session tools 和 sub-agents 仍可能以原始 owner 的身份执行，而不是代表当前 steering 的人。

**背后需求：**

- 多人协作场景下权限边界必须精准；
- 工具调用和子代理行为需要绑定实际请求者；
- 避免 steerer 通过 agent 读取或修改 owner 的草稿、会话或资源。

**健康度信号：**

这是安全边界和协作权限模型的重要修复，风险高但价值也高。

---

## 5. Bug 与稳定性

以下按严重程度和影响范围排序。

### P0 / 阻塞级

#### 1. Gateway 在捕获大型外部插件时阻塞数分钟  
Issue：[#160959](https://github.com/openclaw/openclaw/issues/160959)  
状态：Open  
标签：`P0`, `impact: crash-loop`  
是否已有 fix PR：数据中未显示明确关联 fix PR。

**影响：**

- Gateway 启动阻塞；
- prepared model runtime 重新发布时再次阻塞；
- 大型外部插件或 workspace plugin 用户受影响；
- 2026.9.6 回归风险明确。

**建议优先级：最高。**

---

#### 2. Windows 9.4 schema 不兼容升级需被拒绝  
PR：[#160718](https://github.com/openclaw/openclaw/pull/160718)  
状态：Open  
标签：`P0`, `compatibility`, `availability`

**问题：**

2026.9.4 Windows updater 可能迁移 shared state 后失败，旧 reader 再打开新 schema 状态会出问题。PR 目标是在更早阶段拒绝不兼容升级并提供可靠指导。

**影响：**

- Windows 用户升级路径安全；
- 防止 shared state 被迁移到旧版本无法处理的状态；
- 属于升级可靠性关键修复。

**是否已有 fix PR：有，[#160718](https://github.com/openclaw/openclaw/pull/160718)。**

---

### P1 / 高优先级可用性与安全边界

#### 3. requester wake 在 settlement publication 失败后可能丢失  
PR：[#160472](https://github.com/openclaw/openclaw/pull/160472)  
状态：Open  
标签：`P1`, `message-delivery`, `availability`

**影响：**

- 请求方可能无法在 settlement 后被正确唤醒；
- 影响消息投递闭环；
- 可能导致用户感知为请求“卡住”或“无响应”。

**是否已有 fix PR：有，[#160472](https://github.com/openclaw/openclaw/pull/160472)。**

---

#### 4. worker turn 在 group signal 被拒时可能卡住  
PR：[#160465](https://github.com/openclaw/openclaw/pull/160465)  
状态：Open  
标签：`P1`, `availability`, `security-sensitive-changed`

**影响：**

- worker 完成后 reservation 可能不释放；
- 后续 turn 无法启动；
- 对沙箱、受限 host、生产 Gateway 有高影响。

**是否已有 fix PR：有，[#160465](https://github.com/openclaw/openclaw/pull/160465)。**

---

#### 5. Gateway 热配置重载取消已接受运行  
PR：[#160909](https://github.com/openclaw/openclaw/pull/160909)  
状态：Open  
标签：`P1`, `message-delivery`, `security-boundary`

**影响：**

- 热更新 auth transport policy 时，in-flight agent run 被错误取消；
- 用户请求中断；
- 生产 Gateway 运维体验变差。

**是否已有 fix PR：有，[#160909](https://github.com/openclaw/openclaw/pull/160909)。**

---

### P2 / 中高优先级稳定性、资源和安全

#### 6. prepared-model-catalog worker 内存超过预期  
Issue：[#160522](https://github.com/openclaw/openclaw/issues/160522)  
状态：Open  
标签：`P2`, `impact: other`

**影响：**

- worker 常驻 1.15GB+；
- 可能影响小内存部署；
- 对多 Provider、大模型目录环境风险更高。

**是否已有 fix PR：未在数据中发现明确关联 PR。**

---

#### 7. ACPX 文件系统写入边界缺少 dispatch-scoped per-target authorization  
Issue：[#160708](https://github.com/openclaw/openclaw/issues/160708)  
状态：Open  
标签：`P2`, `impact: security`

**问题：**

外部 relay 的 pre-write approval 无法原子绑定到 ACPX 最终解析、打开、写入的文件目标。需要在文件系统写边界强制 dispatch-scoped per-target authorization。

**影响：**

- 文件写入安全边界；
- broker/wrapper 审批与最终落盘目标之间存在 TOCTOU 风险；
- 对 ACPX 和代理工具写文件场景敏感。

**是否已有 fix PR：未在数据中发现明确关联 PR。**

---

#### 8. Xiaomi provider 未将 content_filter finish_reason 归类为可 failover  
Issue：[#160342](https://github.com/openclaw/openclaw/issues/160342)  
状态：Open  
标签：`P2`, `impact: security`, `impact: auth-provider`

**问题：**

当小米 Provider 返回 `content_filter` finish reason 时，当前未分类为可 failover，导致整个 agent run 失败，而不是切换到 fallback model。

**影响：**

- 多模型 fallback 可靠性；
- 中国区模型供应商使用体验；
- 内容过滤场景下的 agent run 连续性。

**是否已有 fix PR：未在数据中发现明确关联 PR。**

---

#### 9. OpenRouter prepared thinking efforts 刷新后仍使用陈旧值  
PR：[#160918](https://github.com/openclaw/openclaw/pull/160918)  
状态：Open  
标签：`P2`, `extensions: openrouter`

**问题：**

OpenRouter 下架某些 reasoning effort 后，prepared catalog 仍可能保留旧值，例如 `xhigh`。

**影响：**

- 用户可能选择已不可用的 reasoning effort；
- 模型调用失败或行为不符合预期。

**是否已有 fix PR：有，[#160918](https://github.com/openclaw/openclaw/pull/160918)。**

---

#### 10. shared-state snapshot 在 worker 失败时可能过早释放  
PR：[#160946](https://github.com/openclaw/openclaw/pull/160946)  
状态：Open  
标签：`P2`, `availability`

**影响：**

- SQLite 子进程尚未完成时，snapshot 资源可能被释放；
- shared-state 读取可靠性下降。

**是否已有 fix PR：有，[#160946](https://github.com/openclaw/openclaw/pull/160946)。**

---

## 6. 功能请求与路线图信号

### 1. 支持按 agent 关闭 settled-turn finalization  
Issue：[#160966](https://github.com/openclaw/openclaw/issues/160966)  
PR：[#160968](https://github.com/openclaw/openclaw/pull/160968)  
状态：Issue Open，PR Open

**需求：**

允许 operator 针对单个 agent 禁用 host-requested settled-turn finalization，同时保持默认行为不变。

**使用场景：**

当工具执行完成但没有最终回答时，host 可能额外发起一次无工具 summary。部分操作者不希望某些 agent 自动执行这个恢复摘要。

**纳入下一版本可能性：高。**

原因：

- 已有对应 PR；
- PR 明确 `Closes #160966`；
- 配置项已设计为：  
  `agents.entries.<id>.embeddedAgent.settledTurnFinalization: false`

---

### 2. Agent emoji picker 与 New Session 头像可见性提升  
Issue：[#160947](https://github.com/openclaw/openclaw/issues/160947)  
PR：[#160950](https://github.com/openclaw/openclaw/pull/160950)  
状态：Issue Open，PR Open

**需求：**

- 在 agent identity editor 中提供可搜索 emoji picker；
- New Session welcome hero 中放大文字/emoji avatar；
- 避免用户必须手动输入 emoji。

**纳入下一版本可能性：高。**

原因：

- 已有实现 PR；
- PR 明确 `Closes #160947`；
- 带有 screenshot proof，说明验证材料较完整。

---

### 3. PR 发布界面隐藏冗余账号控件  
PR：[#160967](https://github.com/openclaw/openclaw/pull/160967)  
状态：Open

**需求：**

当只有一个账号可用时，发布 PR 界面不应显示账号 picker 和冗余说明，应直接展示一个 `Publish PR` 按钮。

**路线图信号：**

OpenClaw 的 Web UI 正在持续减少低价值配置噪声，提升 agent-assisted development 的发布路径体验。

---

### 4. Conversation rail preview 显示 agent 身份  
PR：[#160941](https://github.com/openclaw/openclaw/pull/160941)  
状态：Open

**需求：**

会话位置栏中的 assistant reply 不应统一显示为 “Assistant message”，而应显示当前 session agent 的名称和图标。

**路线图信号：**

项目正在增强多 agent 场景下的身份可见性，这对复杂工作区、多代理协作、审计回放都有价值。

---

### 5. Matrix autoJoinAllowlist 是否支持 user ID  
Issue：[#160951](https://github.com/openclaw/openclaw/issues/160951)  
状态：Open  
标签：`needs-product-decision`

**需求：**

用户希望配置 `@user:server` 作为 Matrix 自动加入 allowlist 条件。

**纳入下一版本可能性：中等。**

原因：

- 当前还需要产品决策；
- 可能有两条路线：支持 user ID 匹配，或修改 schema/文档禁止 user ID；
- 涉及通道安全和自动加入策略，不宜草率合入。

---

## 7. 用户反馈摘要

从今日 Issues 和 PR 描述中可以提炼出以下真实用户痛点。

### 1. 生产 Gateway 对阻塞和重启敏感

相关链接：

- [Issue #160959](https://github.com/openclaw/openclaw/issues/160959)
- [PR #160909](https://github.com/openclaw/openclaw/pull/160909)
- [PR #160869](https://github.com/openclaw/openclaw/pull/160869)

用户在生产或团队 Gateway 中遇到：

- 启动时被大型插件阻塞；
- 热配置重载取消正在运行的 agent；
- 重启、暂停或关闭期间错误信息不清晰。

这说明用户期望 OpenClaw Gateway 具备更强的 **在线变更能力、不中断运行能力和清晰错误反馈**。

---

### 2. 多人协作与权限边界成为高频关注点

相关链接：

- [PR #160525](https://github.com/openclaw/openclaw/pull/160525)
- [PR #160856](https://github.com/openclaw/openclaw/pull/160856)
- [Issue #160708](https://github.com/openclaw/openclaw/issues/160708)

用户痛点包括：

- 多人 steer 同一 turn 时权限归属不清；
- 添加或删除无关 agent 可能导致 pending approval 被拒；
- 文件写入授权需要绑定到最终目标。

这反映 OpenClaw 正从单用户 agent 工具走向 **团队协作、细粒度授权和可审计执行** 阶段。

---

### 3. 模型目录与 Provider 行为需要更稳定

相关链接：

- [Issue #160522](https://github.com/openclaw/openclaw/issues/160522)
- [Issue #160342](https://github.com/openclaw/openclaw/issues/160342)
- [PR #160918](https://github.com/openclaw/openclaw/pull/160918)

用户反馈集中在：

- prepared model catalog 内存占用过高；
- Provider 返回特定 finish reason 时 fallback 行为不符合预期；
- OpenRouter 动态模型能力变化后，本地 prepared catalog 未及时反映。

这表明多 Provider、多模型环境下，用户需要 OpenClaw 提供更强的 **运行时适配、动态刷新和故障转移能力**。

---

### 4. UI 体验问题正在被快速响应

相关链接：

- [Issue #160947](https://github.com/openclaw/openclaw/issues/160947)
- [PR #160950](https://github.com/openclaw/openclaw/pull/160950)
- [PR #160941](https://github.com/openclaw/openclaw/pull/160941)
- [PR #160940](https://github.com/openclaw/openclaw/pull/160940)
- [PR #160967](https://github.com/openclaw/openclaw/pull/160967)

用户不满意点包括：

- emoji 需要手动输入；
- New Session avatar 太小；
- conversation rail 中 agent 身份不明确；
- dark theme visualization 缺少 padding；
- PR 发布界面在单账号场景下过于冗余。

这些问题虽非核心稳定性缺陷，但体现了 OpenClaw 控制台和 agent 工作流正在进入细节打磨阶段。

---

## 8. 待处理积压

今日数据主要覆盖过去 24 小时，无法完整判断“长期未响应”。以下列出的是当前仍开放、风险高、或等待维护者决策/证明的重点积压项。

### 1. P0 Gateway 插件捕获阻塞回归尚未见明确修复 PR  
Issue：[#160959](https://github.com/openclaw/openclaw/issues/160959)  
状态：Open  
标签：`P0`, `crash-loop`, `needs-maintainer-review`

**建议：**

维护者应优先确认是否需要：

- 回滚 2026.9.6 插件 generation capture 相关变更；
- 将大型依赖树扫描移出 Gateway event loop；
- 增加插件捕获超时、预算或增量缓存。

---

### 2. prepared-model-catalog worker 内存问题仍无明确修复  
Issue：[#160522](https://github.com/openclaw/openclaw/issues/160522)  
状态：Open  
评论数：5

**建议：**

需要维护者明确：

- 1.15GB RSS 是否符合预期；
- `maxOldGenerationSizeMb` 与实际进程内存之间的关系；
- 是否需要 catalog 分片、流式处理或更激进缓存释放。

---

### 3. ACPX 文件写入授权边界需要安全设计  
Issue：[#160708](https://github.com/openclaw/openclaw/issues/160708)  
状态：Open  
标签：`impact: security`

**建议：**

这是安全边界问题，不应长期停留在 Issue。建议尽快形成设计 PR 或安全审查结论。

---

### 4. Matrix autoJoinAllowlist 行为需要产品决策  
Issue：[#160951](https://github.com/openclaw/openclaw/issues/160951)  
状态：Open  
标签：`needs-product-decision`

**建议：**

维护者需要决定：

- 支持 user ID allowlist；
- 或修改 schema，拒绝 user ID；
- 同步更新文档，避免静默忽略配置。

---

### 5. 多个高风险 PR 仍等待作者或证明材料

#### requester wake settlement 修复  
PR：[#160472](https://github.com/openclaw/openclaw/pull/160472)  
状态：Open  
风险：`message-delivery`, `availability`

#### 多人 steering 权限修复  
PR：[#160525](https://github.com/openclaw/openclaw/pull/160525)  
状态：Open  
状态标签：`waiting on author`  
风险：`security-boundary`, `compatibility`

#### retention cleanup 移出 Gateway 线程  
PR：[#160858](https://github.com/openclaw/openclaw/pull/160858)  
状态：Open  
状态标签：`needs proof`  
风险：`session-state`, `security-boundary`

#### trusted fork PR 使用 Blacksmith runner profile  
PR：[#160958](https://github.com/openclaw/openclaw/pull/160958)  
状态：Open  
状态标签：`needs proof`  
风险：`automation`

**建议：**

这些 PR 均触及核心基础设施或安全边界，应尽快补齐 proof、测试截图、负载验证或回归测试，否则会拖慢 2026.9.7 与 extended-stable 后续发布节奏。

---

## 总体健康度评估

**项目健康度：中高，但短期稳定性压力明显。**

积极信号：

- PR 活跃度极高，维护节奏快；
- extended-stable 线持续发布，说明生产稳定线被重视；
- 多个 P1/P2 可靠性问题已有对应修复 PR；
- UI、文档、CI、Provider、Gateway 等多个子系统同步推进。

风险信号：

- 2026.9.6 出现 P0 Gateway 阻塞回归；
- Gateway event loop、worker 内存、shared-state snapshot、hot reload 等核心路径近期问题密集；
- 多个安全边界 PR 尚处于等待作者、等待 proof 或维护者审查状态；
- PR 待合并数达到 47，短期 review 压力较大。

**建议维护者今日优先级：**

1. 处理 [#160959](https://github.com/openclaw/openclaw/issues/160959) P0 Gateway 阻塞回归。  
2. 推进 [#160909](https://github.com/openclaw/openclaw/pull/160909)、[#160465](https://github.com/openclaw/openclaw/pull/160465)、[#160472](https://github.com/openclaw/openclaw/pull/160472) 等 Gateway 可用性修复。  
3. 明确 [#160708](https://github.com/openclaw/openclaw/issues/160708) 和 [#160951](https://github.com/openclaw/openclaw/issues/160951) 的安全/产品决策。  
4. 控制 2026.8.34 extended-stable PR [#160960](https://github.com/openclaw/openclaw/pull/160960) 的变更范围和回归风险。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析  
日期：2026-09-29

---

## 1. 生态全景

个人 AI 助手与自主智能体开源生态今日整体呈现 **高活跃、高修复密度、稳定性压力上升** 的态势。头部项目如 **OpenClaw、Hermes Agent、ZeroClaw、CoPaw、NanoBot** 均在集中处理 Gateway、工具执行、消息通道、权限边界、配置迁移和 Provider 兼容性问题，说明生态已经从“功能扩张”进入“生产可用性打磨”阶段。  
多项目同时暴露出 **长任务执行、跨平台兼容、多通道消息渲染、权限隔离、工具输出保真、更新/回滚可靠性** 等共性问题，反映出 Agent 系统正在进入真实多人协作、企业部署和长期运行场景。  
OpenClaw 仍是今日最活跃、覆盖面最广的核心参照项目，但 Hermes Agent、ZeroClaw、CoPaw 等项目在安全边界、Windows/Desktop、企业通道和 Console 产品化方向上也表现出较强工程推进。  
与此同时，PicoClaw 等项目出现维护不确定性和社区 fork 信号，表明生态分化正在加剧：活跃项目向生产级平台演进，低维护项目可能被社区分叉或边缘化。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 今日重点 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 7 | 65 | 1 个 extended-stable：v2026.8.33 | Gateway 可用性、消息投递、插件阻塞、热重载、会话一致性、安全边界 | **中高健康，高压力**：活跃度最高，但 P0 Gateway 阻塞回归和 47 个待合并 PR 带来短期风险 |
| **NanoBot** | 1 | 14 | 无 | 文件原子写入、exec 超时、多渠道渲染、WebUI/TUI 修复、Vertex AI Provider | **健康良好**：修复响应快，稳定性收敛明显 |
| **Hermes Agent** | 50 | 50 | 无 | Windows Desktop 崩溃、cron 调度、Docker sandbox、TUI 性能、文档校准 | **高活跃但高风险**：问题发现多，关闭少，47 个 PR 待合并 |
| **PicoClaw** | 3 | 5 | 无 | 多 session 路由、channel reload、配置保存、ARM updater、安全披露流程 | **维护风险偏高**：贡献质量高，但主仓库响应不足，出现社区 fork 信号 |
| **NanoClaw** | 1 | 10 | 无 | 更新流程、rollback、日志健壮性、Agent Runner 进程清理 | **健康良好**：对新问题响应快，更新链路是主要风险区 |
| **NullClaw** | 0 | 1 | 无 | Web Search provider、Exa 请求头、QQ 输出格式、版本准备 | **低活跃稳定维护**：小范围发布准备，无明显风险扩散 |
| **IronClaw** | 1 | 2 | 无 | CLI profile 诊断、WebUI 焦点恢复、benchmark failure taxonomy | **稳定维护中**：低风险小修，社区热度较低 |
| **LobsterAI** | 0 | 7 | 无 | OpenClaw 启动修复、Cowork 进度卡片、长任务降噪、办公文档编辑 | **中高活跃**：PR 闭环快，偏产品体验与 OpenClaw 集成稳定性 |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **Moltis** | 0 | 0 | 无 | 无活动 | **静默** |
| **CoPaw** | 4 | 12 | 无 | Console polish、QQ/Telegram 通道、大技能安装、多模态上下文恢复、Windows ACL | **健康活跃**：产品化明显，但稳定性待合并项较多 |
| **ZeptoClaw** | 2 | 1 | 无 | 超大工具输出 spill、Goal Mode 需求 | **低噪声稳步迭代**：核心工具链改进明确 |
| **ZeroClaw** | 3 | 19 | 无 | 安全权限、配置迁移、memory backend、Provider 兼容、备份加密、插件 TLS | **高修复密度**：响应快但 19 个 PR 未合并，安全修复堆积风险上升 |

---

## 3. OpenClaw 在生态中的定位

### 3.1 生态定位

OpenClaw 是当前样本中 **活跃度最高、系统复杂度最高、生产稳定线最明确** 的项目。过去 24 小时内有 **65 条 PR 更新、7 条 Issue 更新、1 个 extended-stable Release**，远高于多数同类项目。其维护重点覆盖 Gateway、agent runtime、插件、模型目录、消息投递、会话状态、安全边界、UI 和 extended-stable 发布线，已经明显超出单一 AI 助手范畴，更接近 **Agent Runtime / Gateway 平台底座**。

### 3.2 相比同类项目的优势

1. **稳定线机制成熟**  
   OpenClaw 今日发布 `v2026.8.33` extended-stable，且已有 `2026.8.34` 准备 PR。这说明其具备面向生产用户的长期维护线，成熟度高于多数仅 mainline 快速迭代的项目。

2. **Gateway 与消息投递能力领先**  
   多个 P1 PR 聚焦 requester wake、worker reservation、hot reload、settlement publication 等核心 runtime 路径，体现其对生产 Gateway 可用性的重视。

3. **社区与维护规模明显更大**  
   65 条 PR 更新、47 条待合并 PR 说明贡献和维护活动密集。相比 NanoBot、CoPaw、ZeroClaw 等中高活跃项目，OpenClaw 的规模和子系统复杂度更高。

4. **安全边界议题更深入**  
   多人 steering 权限、ACPX 文件写授权、session tool 身份、hot reload authority 等问题显示 OpenClaw 已进入多人协作和细粒度授权阶段。

### 3.3 技术路线差异

| 维度 | OpenClaw | NanoBot / NanoClaw | Hermes Agent | ZeroClaw | CoPaw / LobsterAI |
|---|---|---|---|---|---|
| 核心路线 | Gateway-first，强调运行时、消息投递、插件和多 agent 协作 | 个人助手 / 工具执行平台，强调轻量实用和多渠道体验 | Desktop / CLI / TUI 全栈 Agent，重视本地体验与跨平台 | 安全边界、配置治理、插件 TLS、权限模型 | Console / Cowork / 企业渠道和产品化体验 |
| 稳定机制 | extended-stable 维护线 | 多为快速修复，无明显 LTS 线 | 高审计、高问题暴露 | 修复密集但合并节奏待提升 | 产品体验迭代较快 |
| 风险点 | 系统复杂，Gateway 回归影响面大 | 工具与更新流程稳定性 | Windows/Desktop、streaming、cron | 安全 PR 堆积、配置迁移复杂 | UI / 通道 / 大文件技能场景 |

### 3.4 当前短板

OpenClaw 今日也暴露出明显压力：  
- **P0 Gateway 插件捕获阻塞回归** 尚未看到明确修复 PR；  
- **prepared-model-catalog 内存占用** 仍无明确修复；  
- **47 个开放 PR** 对 review 带来压力；  
- 多个高风险 PR 涉及 `message-delivery`、`security-boundary`、`session-state`，合并节奏需要严格控制。

总体看，OpenClaw 在生态中属于 **事实上的高复杂度基础设施型项目**，优势在工程体系和生产维护线，风险在变更面过大和核心路径回归。

---

## 4. 共同关注的技术方向

### 4.1 Gateway / Runtime 可用性与不中断升级

涉及项目：**OpenClaw、NanoClaw、LobsterAI、Hermes Agent、ZeroClaw**

- OpenClaw：hot reload 不应取消 in-flight run；大型插件捕获不能阻塞 Gateway event loop。
- NanoClaw：`/update-nanoclaw` 不能在 cutover 未完成时报告 complete；rollback 需停止真实 host 并清理 agent containers。
- LobsterAI：OpenClaw Gateway 启动时不应重复启动三次，避免 80 秒不可用窗口。
- Hermes Agent：Windows Desktop 被 source-update completion tail 自杀，形成静默崩溃循环。
- ZeroClaw：服务重启不能杀掉自身 daemon，避免请求结果丢失。

**共同诉求：** Agent 平台需要支持在线配置、热更新、可靠回滚和可观测失败，不能让更新流程破坏正在运行的任务。

---

### 4.2 工具执行可靠性与文件/进程一致性

涉及项目：**NanoBot、NanoClaw、ZeptoClaw、Hermes Agent、CoPaw、ZeroClaw**

- NanoBot：文件工具需要原子写入；exec session 硬超时不能依赖轮询。
- NanoClaw：pre-task timeout 需杀掉整个 process group。
- ZeptoClaw：超大工具输出不能直接丢弃，应 spill 到本地文件。
- Hermes Agent：上下文压缩不能破坏 tool-call 参数。
- CoPaw：TaskTracker 注册时序要避免无 producer 的占位 Future。
- ZeroClaw：ShellTool 执行服务重启不能中断自身请求持久化。

**共同诉求：** Agent 工具调用已经进入“真实自动化执行”阶段，必须具备强一致的超时、终止、输出保真和故障恢复语义。

---

### 4.3 多渠道消息渲染与通道可靠性

涉及项目：**NanoBot、CoPaw、NullClaw、PicoClaw、ZeroClaw**

- NanoBot：Telegram URL 渲染、Slack 长文本按钮消息、Feishu compaction 通知降噪。
- CoPaw：Telegram fenced code block 渲染、QQ gateway event 去重。
- NullClaw：QQ 官方回复去 Markdown 标记。
- PicoClaw：Channels Manager reload nil panic。
- ZeroClaw：企业微信 WebSocket 出站图片和文件发送。

**共同诉求：** 多 IM / 协作平台集成已经从“能发消息”升级为“格式正确、去重可靠、能力可配置、适配渠道差异”。

---

### 4.4 权限边界、安全治理与多用户隔离

涉及项目：**OpenClaw、ZeroClaw、CoPaw、PicoClaw、Hermes Agent**

- OpenClaw：多人 steering 时工具需代表实际请求者执行；ACPX 写文件授权需绑定最终目标。
- ZeroClaw：SOP over RPC 需 `tools:execute`；session environment immutable；插件 TLS profile 授权加固。
- CoPaw：Windows sandbox ACL 不应写入 volume root。
- PicoClaw：异步工具结果不能串到默认 session；缺少 private vulnerability reporting。
- Hermes Agent：受保护 skills 可被 foreground turn 写入。

**共同诉求：** Agent 正在进入多人协作、企业部署和插件生态阶段，权限模型、文件系统边界、session ownership 和安全披露机制成为基础能力。

---

### 4.5 Provider / Model Catalog 兼容与动态能力刷新

涉及项目：**OpenClaw、NanoBot、ZeroClaw、IronClaw、NullClaw**

- OpenClaw：prepared-model-catalog 内存过高；OpenRouter reasoning effort 需动态刷新；小米 Provider content_filter 应 failover。
- NanoBot：GPT-6 Astra 不接受 `reasoning.effort="none"`；Provider 429 retry duration 解析。
- ZeroClaw：OpenAI-compatible endpoint 不支持 tool message `name` 字段。
- IronClaw：benchmark failure taxonomy 用于区分模型质量与工程问题。
- NullClaw：Web Search provider 需固定到配置项；Exa 请求头兼容。

**共同诉求：** Provider 生态高度异构，Agent 框架需要更细粒度的 capability detection、fallback、动态刷新和错误分类能力。

---

### 4.6 UI / Console / Desktop 产品化

涉及项目：**CoPaw、LobsterAI、OpenClaw、NanoBot、IronClaw、Hermes Agent**

- CoPaw：Console 字体缩放、Modal 动画、模型设置交互。
- LobsterAI：Cowork progress card、长任务只保留最近五步、办公文档编辑。
- OpenClaw：emoji picker、conversation rail agent identity、PR 发布 UI 降噪。
- NanoBot：TUI 主题可读性、WebUI 标题生成、会话恢复。
- IronClaw：命令面板焦点恢复。
- Hermes Agent：TUI composer 边界、减少 git/config/pet polling。

**共同诉求：** Agent 产品不再只面向命令行极客，Console、Desktop、TUI、Cowork 等交互层正在快速成熟。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 / 路线特征 | 差异化价值 |
|---|---|---|---|---|
| **OpenClaw** | Gateway、agent runtime、插件、模型目录、多用户协作、安全边界 | 生产 Gateway 用户、团队协作、平台开发者 | Gateway-centric，extended-stable，复杂 agent runtime | 最接近生产级 Agent 基础设施 |
| **NanoBot** | 个人助手、多渠道、工具执行、TUI/WebUI | 个人开发者、轻量自动化用户、多渠道用户 | 工具链 + 多 UI + Provider 扩展 | 快速修复、体验均衡，适合实用型助手 |
| **Hermes Agent** | Desktop / CLI / TUI、本地模型、Windows、Docker sandbox | 桌面端用户、本地模型用户、跨平台开发者 | 全栈桌面 Agent，平台适配复杂 | Windows/Desktop 生态信号强，但稳定压力大 |
| **PicoClaw** | 多 agent 会话、channel、config、updater | 轻量部署用户、社区 fork 用户 | Go 风格系统维护，当前主仓库响应弱 | 有社区贡献潜力，但治理风险高 |
| **NanoClaw** | 安装更新、Agent Runner、scheduled tasks、skills | 自托管用户、自动化任务用户 | 更新系统与 runner 生命周期持续加固 | 更新/回滚链路响应快 |
| **NullClaw** | Web Search、QQ 输出、版本发布 | 低噪声 IM 助手用户 | 小步维护、发布准备 | 轻量稳定，今日活动有限 |
| **IronClaw** | CLI 诊断、WebUI、benchmark 质量 | 模型评测和配置诊断用户 | Benchmark-driven，低风险修复 | 质量观察和配置透明度突出 |
| **LobsterAI** | Cowork、OpenClaw 集成、办公文档编辑 | 办公用户、中文用户、桌面生产力用户 | Electron / renderer / main / OpenClaw 深集成 | 办公文档与 Agent Cowork 体验明显 |
| **CoPaw** | Console、企业通道、Skill marketplace、多模态会话 | 企业部署、Console 用户、多 IM 用户 | AgentScope 生态，Console 产品化 | 企业化、多通道和 Skill 生态信号强 |
| **ZeptoClaw** | 工具输出处理、目标模式探索 | Coding Agent 用户、终端开发者 | Rust/CLI 风格，重视工具输出保真 | 简洁但面向深度开发者任务 |
| **ZeroClaw** | 安全权限、配置迁移、memory、插件 TLS、Provider 兼容 | 安全敏感用户、企业部署、插件生态 | Security-first，权限与配置治理密集 | 安全边界和配置治理最突出 |
| **TinyClaw / Moltis** | 今日无活动 | 不明确 | 静默 | 暂无可判断信号 |

---

## 6. 社区热度与成熟度

### 6.1 高活跃 / 快速迭代层

项目：**OpenClaw、Hermes Agent、ZeroClaw、CoPaw**

- OpenClaw：65 PR，1 release，生产稳定线存在，但 P0 回归压力明显。
- Hermes Agent：50 issues + 50 PR，问题暴露密集，但闭环不足。
- ZeroClaw：19 PR，集中在安全、配置、权限、memory，修复质量高但未合并。
- CoPaw：12 PR + 4 issues，Console 产品化和企业场景明显。

**特征：**  
功能面宽、真实用户场景复杂、问题密集暴露、review 压力上升。适合跟踪，但生产采用时需关注版本稳定线和未合并修复。

---

### 6.2 稳定修复 / 质量巩固层

项目：**NanoBot、NanoClaw、LobsterAI**

- NanoBot：多端体验和工具可靠性修复快。
- NanoClaw：更新流程和 runner 生命周期加固明显。
- LobsterAI：7 个 PR 全部关闭，OpenClaw 集成稳定性和 Cowork UX 快速推进。

**特征：**  
Issue 数不高，但 PR 闭环较好，集中处理具体用户痛点。适合关注下一补丁版本。

---

### 6.3 低噪声维护层

项目：**NullClaw、IronClaw、ZeptoClaw**

- NullClaw：版本准备和小范围兼容性修复。
- IronClaw：低风险 CLI/WebUI 修复，benchmark 观察。
- ZeptoClaw：少量但关键的工具输出改进和 Goal Mode 需求。

**特征：**  
活跃度不高，但维护方向清晰。适合小团队或特定场景用户观察。

---

### 6.4 静默 / 维护不确定层

项目：**TinyClaw、Moltis、PicoClaw**

- TinyClaw、Moltis：今日无活动。
- PicoClaw：虽有高质量社区 PR，但主仓库无合并、无评论，且出现 fork 继续维护信号。

**特征：**  
若用于生产，需谨慎评估维护连续性。PicoClaw 尤其需要关注主仓库是否恢复治理。

---

## 7. 值得关注的趋势信号

### 7.1 Agent 平台正在从“能执行”走向“可靠执行”

多个项目同时处理文件原子写入、进程组终止、超时语义、工具输出 spill、任务 tracker 注册、服务重启自杀等问题。这说明开发者已经不满足于 Agent 能调用工具，而是要求工具调用具备传统后端系统级别的可靠性。

**参考价值：**  
AI Agent 开发者应把工具执行层视为关键基础设施，设计时应优先考虑：
- 原子写入；
- 超时和取消；
- 输出持久化；
- 幂等性；
- 崩溃恢复；
- 子进程清理；
- 审计日志。

---

### 7.2 多用户与多主体权限模型成为分水岭

OpenClaw、ZeroClaw、PicoClaw、Hermes Agent、CoPaw 都出现权限边界问题，包括 session ownership、steerer identity、memory owner、SOP 权限、sandbox ACL、protected skills 等。

**参考价值：**  
单用户 Agent 可以用简单 owner 模型；团队 Agent 必须引入：
- dispatch-scoped authorization；
- per-target file approval；
- session ownership invariants；
- delegation identity preservation；
- tool execution subject binding；
- plugin / skill provenance guard。

---

### 7.3 多渠道 IM 适配进入深水区

Telegram、Slack、QQ、Feishu、Matrix、WeCom 等通道都出现格式、通知、去重、媒体发送和 allowlist 语义问题。

**参考价值：**  
多渠道 Agent 不应只做 webhook 适配，应建立通道能力矩阵：
- 是否支持 in-place edit；
- 是否支持长文本；
- Markdown / HTML 差异；
- 媒体发送限制；
- 消息去重机制；
- 按渠道配置通知策略。

---

### 7.4 Provider 兼容性需要 capability-driven，而非 API 名称驱动

OpenAI-compatible endpoint、Groq-class endpoint、OpenRouter reasoning effort、GPT-6 Astra、Xiaomi content_filter、Exa 搜索等问题都表明：同名或兼容 API 并不代表行为一致。

**参考价值：**  
Agent 框架应设计 provider capability registry：
- 支持哪些 message fields；
- 支持哪些 reasoning efforts；
- 哪些 finish_reason 可 failover；
- 429 retry hint 格式；
- 工具调用字段差异；
- 模型目录动态刷新。

---

### 7.5 更新、回滚和热重载成为生产部署核心指标

OpenClaw、NanoClaw、Hermes Agent、LobsterAI 都暴露出升级或启动链路问题。对长期运行的个人助手和团队 Gateway 而言，升级失败比普通功能 bug 更危险。

**参考价值：**  
生产级 Agent 系统需要：
- liveness probe 失败即拒绝 cutover；
- rollback 停止真实运行 host；
- 热重载不取消 in-flight run；
- completion pending 状态有 TTL；
- 旧 schema / 旧数据迁移具备回滚策略；
- 启动和修复流程可观测。

---

### 7.6 Console / Desktop / Cowork 正在成为竞争重点

CoPaw、LobsterAI、OpenClaw、NanoBot、Hermes Agent、IronClaw 都在打磨 UI 细节。Agent 系统的用户价值越来越依赖可解释进度、会话恢复、长任务展示、配置诊断和办公资产编辑。

**参考价值：**  
开发者若构建个人 AI 助手，不应只关注模型和工具，还应投资：
- 长任务进度视图；
- 执行日志分层；
- 会话恢复；
- 文件 / 文档 artifact；
- 错误诊断；
- 键盘工作流；
- 可访问性和主题适配。

---

### 7.7 企业化信号增强

CoPaw 的自定义 Skill / Plugin marketplace、ZeroClaw 的 opt-in SaaS tools、OpenClaw 的 extended-stable、WeCom/Matrix/Feishu 等通道需求，以及安全披露流程问题，都说明开源 Agent 正在进入企业内网和准生产场景。

**参考价值：**  
面向企业的 Agent 项目需要提前规划：
- 私有 marketplace；
- air-gapped 安装；
- SECURITY.md 和私有漏洞报告；
- 最小化构建；
- 可禁用公共源；
- 审计日志；
- 权限边界；
- 插件签名与来源校验。

---

## 结论

今日生态的核心关键词是：**生产化、权限化、多渠道化、可恢复化、企业化**。  
OpenClaw 依旧是最具平台属性和社区规模的核心项目，但也承受最大稳定性压力；Hermes Agent 和 ZeroClaw 分别在跨平台桌面体验、安全配置治理上暴露出高价值信号；CoPaw 和 LobsterAI 则代表 Console / Cowork / 企业通道 / 办公生产力方向的产品化趋势；NanoBot、NanoClaw、ZeptoClaw 等项目在工具执行、更新流程和输出保真方面提供了更轻量但实用的工程参考。

对技术决策者而言，选择项目时应重点评估三点：  
1. 是否有稳定发布线和快速修复闭环；  
2. 是否具备可靠的工具执行、权限隔离和更新回滚能力；  
3. 是否匹配自身场景：个人 CLI、桌面助手、团队 Gateway、企业 Console，还是安全敏感的多主体 Agent 平台。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报｜2026-09-29

## 1. 今日速览

过去 24 小时，NanoBot 项目保持较高开发活跃度：共有 **1 条 Issue 更新**、**14 条 PR 更新**，其中 **9 条仍待合并**，**5 条已关闭/合并**。今日工作重心明显集中在 **稳定性修复、渠道适配、TUI/WebUI 体验修复、工具执行可靠性、Provider 能力扩展** 等方向。  
从 PR 类型看，`bug/fix/test` 标签占比较高，说明项目当前处于快速迭代后的缺陷收敛阶段；同时也有 Claude on Vertex AI、Subagents 聚合通知等功能性增强，显示路线图仍在推进。  
整体健康度评估：**活跃度高、修复响应快，但跨渠道消息渲染、工具执行边界、通知体验仍是当前稳定性重点区域**。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

### 已关闭 / 合并的重要 PR

#### 1. 修复 TUI 未知终端主题下的可读性问题  
- PR：[#5958 fix(tui): keep unknown terminal themes readable](https://github.com/HKUDS/nanobot/pull/5958)  
- 状态：Closed  
- 作者：chengyongru  
- 影响范围：TUI、终端显示体验  
- 说明：当终端不响应 OSC 10/11 主题探测时，旧逻辑会默认使用暗色主题文本色，但保留终端默认背景，导致在亮色终端中几乎不可读。该修复在主题未知时使用终端默认前景/背景色，避免文本不可见。  
- 项目推进：提升 TUI 在不同终端环境下的兼容性与可访问性。

#### 2. 修复 `web_fetch` 失败被误判为成功的问题  
- PR：[#5949 fix(web): propagate web_fetch failures as structured tool errors](https://github.com/HKUDS/nanobot/pull/5949)  
- 状态：Closed  
- 作者：KailBug  
- 标签：bug, fix, test, security, priority:p2  
- 影响范围：Web 工具、工具错误生命周期、安全性  
- 说明：此前 `WebFetchTool` 在请求失败时返回包含 `error` 字段的普通 JSON 字符串，导致系统可能将失败视为成功工具执行。修复后，失败请求会按结构化工具错误处理，并触发正确的恢复指导。  
- 项目推进：显著提升工具调用错误语义的一致性，减少 Agent 在错误状态下继续推理的风险。

#### 3. 修复 WebUI Codex 标题生成失败诊断  
- PR：[#5952 fix(webui): restore Codex title generation and diagnose API failures](https://github.com/HKUDS/nanobot/pull/5952)  
- 状态：Closed  
- 作者：chengyongru  
- 标签：bug, provider, webui, fix, test, priority:p2  
- 影响范围：WebUI、Provider 调用、标题生成  
- 说明：WebUI 标题生成时强制设置 `reasoning.effort="none"`，而 GPT-6 Astra 会拒绝该值并返回 HTTP 400。该修复改为使用模型默认 reasoning 配置，避免后台标题请求失败。  
- 项目推进：改善 WebUI 会话体验，也降低 provider-specific 参数引发兼容性问题的概率。

#### 4. 更新贡献者列表并保留历史署名  
- PR：[#5951 docs: refresh contributors and preserve historical credits](https://github.com/HKUDS/nanobot/pull/5951)  
- 状态：Closed  
- 作者：chengyongru  
- 标签：documentation, fix, test, priority:p2  
- 影响范围：文档、社区治理  
- 说明：README 贡献者墙从 365 人更新至 392 人，新增 27 位贡献者，并改进更新脚本，避免 GitHub contributors endpoint 遗漏历史贡献者。  
- 项目推进：增强社区可见性与贡献者认可机制，有利于开源社区健康发展。

#### 5. 修复 TUI 保存会话历史无法恢复  
- PR：[#5950 fix(tui): restore saved session history from canonical events](https://github.com/HKUDS/nanobot/pull/5950)  
- 状态：Closed  
- 作者：chengyongru  
- 影响范围：TUI、会话恢复、WebSocket session  
- 说明：在 #5823 将 `/webui-thread` 改为返回 canonical events 后，TUI 仍读取已移除的 `messages` 字段，导致打开保存会话时转录为空。该修复改为解析和校验 canonical event records。  
- 项目推进：恢复关键会话回放能力，减少用户对会话持久化可靠性的担忧。

---

## 4. 社区热点

### 1. Feishu 通知体验：Context Compaction 通知不可关闭  
- Issue：[#5956 [bug] Feishu 无 in-place edit 能力，compaction notice 应可关闭](https://github.com/HKUDS/nanobot/issues/5956)  
- 状态：Open  
- 作者：shenchaovip-afk  
- 评论数：2  
- 关注点：Feishu 渠道、通知噪声、ContextCompactionEvent  
- 摘要：当前 `nanobot/bus/notification_delivery.py` 中 `NOTIFICATION_AUDIENCES` 将 `ContextCompactionEvent` 硬映射到 `"channel"`，导致 `phase='started'` 和 `phase='succeeded'` 两个事件都会发送到源频道。由于 Feishu 不支持 in-place edit，用户会看到两条独立通知，例如 “Compressing context…” 和 “Context compacted.”。  
- 背后诉求：用户希望在不支持原地编辑的渠道中减少系统通知刷屏，尤其是上下文压缩这种内部过程型事件。该 Issue 还提到同类问题 #5784，说明这可能不是单一渠道问题，而是通知系统设计层面的需求。

### 2. 多渠道消息渲染可靠性成为重点  
今日多条 PR 指向不同渠道的消息发送问题：  
- Telegram Markdown 链接 URL 被格式化污染：[#5960](https://github.com/HKUDS/nanobot/pull/5960)  
- Slack 带按钮消息超过 3000 字符后内容丢失：[#5961](https://github.com/HKUDS/nanobot/pull/5961)  
- Feishu compaction 通知不可关闭：[#5956](https://github.com/HKUDS/nanobot/issues/5956)  

这些问题共同反映出：NanoBot 的多渠道集成已进入深水区，核心挑战从“能发消息”转向“跨平台一致、可靠、可配置地呈现消息”。

---

## 5. Bug 与稳定性

按严重程度和潜在影响排序如下：

### P0 / 高优先级

#### 1. 文件工具非原子写入可能导致内容撕裂或崩溃窗口数据丢失  
- PR：[#5953 fix(tools): atomic writes for file tools to prevent torn content and crash-window loss](https://github.com/HKUDS/nanobot/pull/5953)  
- 状态：Open  
- 标签：bug, fix, test, priority:p0  
- 作者：louisss1016  
- 影响范围：`WriteFileTool`、`EditFileTool`、`ApplyPatchTool`、工作区文件一致性  
- 问题说明：当前文件写入使用 `write_text` / `write_bytes`，会原地截断目标文件。若写入期间被并发读取，可能观察到半写入内容；若进程崩溃，也可能留下损坏文件。  
- 是否已有 fix PR：是，PR #5953 已提交。  
- 风险评估：高。该问题影响 Agent 文件编辑的可信度，尤其在多 Agent、IDE、用户同时读取文件的场景下风险明显。

---

### P1 / 中高优先级

#### 2. Exec session 硬超时依赖轮询，命令可能超时后仍被误报成功  
- PR：[#5957 fix(exec): enforce session hard timeouts without polling](https://github.com/HKUDS/nanobot/pull/5957)  
- 状态：Open  
- 标签：bug, fix, test, priority:p2  
- 作者：KailBug  
- 影响范围：命令执行、session timeout、工具可靠性  
- 问题说明：带 `yield_time_ms` 启动的命令可能超过配置超时仍继续运行；如果在下一次 poll 前退出，系统可能将其报告为成功，而不是超时。  
- 是否已有 fix PR：是，PR #5957 已提交。  
- 风险评估：中高。对长任务、后台命令、CI/自动化执行场景影响较大。

#### 3. `web_fetch` 失败被当作成功工具执行  
- PR：[#5949](https://github.com/HKUDS/nanobot/pull/5949)  
- 状态：Closed  
- 标签：bug, fix, test, security, priority:p2  
- 是否已有 fix PR：是，已关闭/合并。  
- 风险评估：中高。错误状态被吞掉会影响 Agent 推理与恢复路径，且带有一定安全/可靠性风险。

---

### P2 / 中等优先级

#### 4. Telegram Markdown 转 HTML 时破坏链接 URL  
- PR：[#5960 fix(telegram): keep link URLs intact when rendering Markdown to HTML](https://github.com/HKUDS/nanobot/pull/5960)  
- 状态：Open  
- 标签：bug, channel, fix, test, priority:p2  
- 作者：Bdysj  
- 问题说明：当 Markdown 链接 URL 中包含 `__`、`_word_`、`**`、`~~` 或引号时，inline formatting 逻辑会错误改写 URL，甚至破坏 `href` 属性。  
- 是否已有 fix PR：是，PR #5960 已提交。  
- 用户影响：链接无法正确打开，严重时可能造成 HTML 属性注入类展示问题。

#### 5. Slack 带按钮消息超过 3000 字符后丢失内容  
- PR：[#5961 fix(slack): keep full text of button messages beyond 3000 chars](https://github.com/HKUDS/nanobot/pull/5961)  
- 状态：Open  
- 作者：Bdysj  
- 问题说明：Slack 文本会先按 `SLACK_MAX_MESSAGE_LEN` 分块，但带按钮时最后一块由 blocks 发送，blocks 的文本长度限制导致超过 3000 字符的内容被静默截断。  
- 是否已有 fix PR：是，PR #5961 已提交。  
- 用户影响：长回复与交互按钮结合时，用户可能无法看到完整内容。

#### 6. TUI 未知主题动画与可读性问题  
- PR：[#5959 fix(tui): animate status with unknown terminal theme](https://github.com/HKUDS/nanobot/pull/5959)  
- 状态：Open  
- 标签：bug, regression, fix, test, priority:p2  
- 作者：chengyongru  
- 关联 PR：[#5958](https://github.com/HKUDS/nanobot/pull/5958)  
- 问题说明：在无法检测终端主题时，状态动画可能冻结或显示效果不佳。新 PR 进一步将 active status 改为 moving bold band，并覆盖 unknown-theme animation 及延迟主题响应测试。  
- 是否已有 fix PR：是，PR #5959 已提交；#5958 已关闭。

#### 7. Provider 429 retry hint 中复合时间解析错误  
- PR：[#5963 fix(providers): sum compound durations in 'try again in' retry hints](https://github.com/HKUDS/nanobot/pull/5963)  
- 状态：Open  
- 作者：Bdysj  
- 问题说明：OpenAI 风格 429 错误可能返回 `Please try again in 1m30s.` 或 `2m0.5s` 这类 Go duration。旧逻辑无法正确解析复合时长，可能导致 retry 等待时间不准确。  
- 是否已有 fix PR：是，PR #5963 已提交。  
- 用户影响：高频调用或速率限制场景下，重试策略可能过早或过晚触发。

#### 8. Cron 工具允许非正数 `every_seconds`  
- PR：[#5962 fix(cron): reject non-positive every_seconds intervals](https://github.com/HKUDS/nanobot/pull/5962)  
- 状态：Open  
- 作者：Bdysj  
- 问题说明：`cron` tool schema 未声明最小值，`CronService` 可能创建永不运行的任务或返回误导性错误。  
- 是否已有 fix PR：是，PR #5962 已提交。  
- 用户影响：自动化任务调度配置错误时体验不清晰，可能导致任务静默失效。

#### 9. WebUI 标题生成因 provider 参数不兼容失败  
- PR：[#5952](https://github.com/HKUDS/nanobot/pull/5952)  
- 状态：Closed  
- 是否已有 fix PR：是，已关闭/合并。  
- 用户影响：主回复正常但标题生成失败，造成会话列表体验下降。

#### 10. TUI 保存会话历史无法恢复  
- PR：[#5950](https://github.com/HKUDS/nanobot/pull/5950)  
- 状态：Closed  
- 是否已有 fix PR：是，已关闭/合并。  
- 用户影响：保存会话打开后 transcript 为空，影响会话连续性。

---

## 6. 功能请求与路线图信号

### 1. Claude on Vertex AI Provider 支持  
- PR：[#5955 feat(providers): add Claude on Vertex AI](https://github.com/HKUDS/nanobot/pull/5955)  
- 状态：Open  
- 作者：Shizoqua  
- 标签：documentation, provider, new-provider, feature, test, priority:p2  
- 内容：新增基于 `AsyncAnthropicVertex` 的 provider，支持通过 Google Vertex AI 运行 Claude 模型，并支持 Application Default Credentials、project/region 配置等。  
- 路线图信号：NanoBot 正在继续扩展企业级/云厂商模型接入能力。Claude on Vertex AI 对企业用户尤其重要，因为它允许在 GCP 权限、区域与计费体系内统一使用 Claude。

### 2. Subagents 并发结果聚合通知  
- PR：[#5954 feat(subagents): aggregate concurrent results](https://github.com/HKUDS/nanobot/pull/5954)  
- 状态：Open  
- 作者：Shizoqua  
- 标签：documentation, feature, test, priority:p2  
- 内容：新增 `aggregated` notification mode，在并发 subagents 全部完成后合并结果再通知主 Agent。  
- 路线图信号：项目正在优化多 Agent 协同体验，避免子 Agent 逐个返回结果时过早触发主 Agent 决策。  
- 与 Issue #5956 的关联：两者都指向“通知语义与节奏控制”问题，说明通知系统可能会成为近期重点改造模块。

### 3. 通知可配置化需求增强  
- Issue：[#5956](https://github.com/HKUDS/nanobot/issues/5956)  
- 信号：用户希望对 Context Compaction 这类系统事件提供关闭或降噪能力，尤其在 Feishu 等不支持原地编辑的渠道中。  
- 可能方向：  
  - 为 `ContextCompactionEvent` 增加 per-channel 配置；  
  - 将 started/succeeded 合并或仅发送 succeeded；  
  - 针对不支持 edit/update 的渠道提供静默模式；  
  - 允许用户关闭低价值系统通知。

---

## 7. 用户反馈摘要

### 主要痛点

#### 1. 系统过程通知在 Feishu 中造成频道噪声  
- 来源：[#5956](https://github.com/HKUDS/nanobot/issues/5956)  
- 用户场景：用户在 Feishu 中使用 NanoBot，系统进行上下文压缩时会连续发送 “Compressing context…” 和 “Context compacted.”。  
- 不满意点：Feishu 不支持 in-place edit，因此原本可能适合在其他平台“更新同一条消息”的状态变化，在 Feishu 中变成了多条独立消息，干扰频道阅读。  
- 需求本质：通知应该考虑渠道能力差异，而不是所有事件统一广播到 channel。

#### 2. 长文本和交互消息在 Slack 中可能被静默截断  
- 来源：[#5961](https://github.com/HKUDS/nanobot/pull/5961)  
- 用户场景：Agent 返回较长内容，同时附带按钮。  
- 不满意点：超过 3000 字符的内容可能丢失，而用户未必能立即意识到信息不完整。  
- 需求本质：消息投递需要保证完整性，尤其是面向生产协作平台时，静默丢内容比显式报错更危险。

#### 3. Telegram 链接渲染应保持 URL 原样  
- 来源：[#5960](https://github.com/HKUDS/nanobot/pull/5960)  
- 用户场景：Agent 输出包含复杂 URL 的 Markdown 链接。  
- 不满意点：URL 中的 Markdown 特殊字符被误处理，导致链接损坏。  
- 需求本质：渠道渲染层应区分文本格式化区域和 URL/HTML 属性区域。

#### 4. 会话恢复、标题生成、终端显示等“外围体验”影响整体信任  
- 来源：[#5950](https://github.com/HKUDS/nanobot/pull/5950)、[#5952](https://github.com/HKUDS/nanobot/pull/5952)、[#5958](https://github.com/HKUDS/nanobot/pull/5958)、[#5959](https://github.com/HKUDS/nanobot/pull/5959)  
- 用户场景：使用 WebUI/TUI 进行长期会话、恢复历史、查看状态动画。  
- 不满意点：会话打开为空、标题后台失败、终端文字不可读等问题虽不一定阻断核心推理，但会显著降低产品可靠性感知。  
- 需求本质：AI 助手项目不仅要模型能力强，还要在会话生命周期、界面反馈、异常诊断上稳定可靠。

---

## 8. 待处理积压

基于今日提供的数据，暂无可判断为“长期未响应”的 Issue 或 PR；但以下开放项建议维护者优先关注：

### 高优先级待处理

1. **文件工具原子写入修复**  
   - PR：[#5953](https://github.com/HKUDS/nanobot/pull/5953)  
   - 原因：priority:p0，影响文件一致性和崩溃恢复，应优先 review/merge。

2. **Exec session 硬超时修复**  
   - PR：[#5957](https://github.com/HKUDS/nanobot/pull/5957)  
   - 原因：命令执行超时是工具安全与可靠性的基础能力，应尽快确认测试覆盖。

3. **Feishu compaction 通知降噪**  
   - Issue：[#5956](https://github.com/HKUDS/nanobot/issues/5956)  
   - 原因：该问题反映通知系统对渠道能力差异的适配不足，且与多 Agent / subagents 通知聚合方向有关。

### 中优先级待处理

4. **Telegram URL 渲染修复**  
   - PR：[#5960](https://github.com/HKUDS/nanobot/pull/5960)

5. **Slack 长文本按钮消息修复**  
   - PR：[#5961](https://github.com/HKUDS/nanobot/pull/5961)

6. **Provider retry duration 解析修复**  
   - PR：[#5963](https://github.com/HKUDS/nanobot/pull/5963)

7. **Cron 非正数 interval 校验**  
   - PR：[#5962](https://github.com/HKUDS/nanobot/pull/5962)

8. **Claude on Vertex AI Provider**  
   - PR：[#5955](https://github.com/HKUDS/nanobot/pull/5955)

9. **Subagents 结果聚合通知**  
   - PR：[#5954](https://github.com/HKUDS/nanobot/pull/5954)

---

## 总体判断

NanoBot 今日开发节奏积极，维护者与贡献者主要在修补多端体验和底层工具可靠性问题。已关闭的 PR 解决了 WebUI、TUI、WebFetch、文档贡献者等多个实际痛点；待合并 PR 中则包含文件原子写入、exec 超时、Slack/Telegram 渠道渲染、Provider retry 等关键稳定性修复。  
短期来看，建议项目优先完成 **P0 文件写入一致性修复**、**执行超时控制** 和 **通知系统降噪/可配置化**，这些问题直接影响用户对 NanoBot 作为个人 AI 助手与自动化 Agent 的可靠性判断。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
日期：2026-09-29  
仓库：github.com/NousResearch/hermes-agent

## 1. 今日速览

过去 24 小时 Hermes Agent 活跃度非常高：Issues 更新 50 条、PR 更新 50 条，说明社区正在集中进行稳定性审计、Windows 兼容性修复、TUI 性能优化和文档校准。  
但从闭环效率看，今日 Issues 关闭数为 0，PR 中仍有 47 个处于待合并状态，说明问题发现速度明显高于修复落地速度。  
今日最突出的风险集中在 Windows 平台、Desktop 启动/恢复、CLI 更新流程、Agent 流式输出与上下文压缩、Docker 沙箱和 cron 调度可靠性。  
整体健康度评价：**活跃度高，但稳定性压力较大；项目处于密集回归发现与修复排队阶段，短期需要维护者优先处理 P0/P1 与已有 fix PR。**

---

## 2. 项目进展

今日无新版本发布。PR 层面共有 50 条更新，其中 47 条仍待合并，已合并/关闭 3 条；数据中可见的已关闭 PR 主要是 Desktop 启动容错相关。

### 已关闭 / 推进中的重要 PR

#### PR #127372：`fix(desktop): never hard-fail launch when sandbox helper sudo fails`  
链接：https://github.com/NousResearch/hermes-agent/pull/127372  
状态：Closed  

该 PR 修复 Linux Desktop 启动时因 `chrome-sandbox` 辅助修复需要 sudo 而导致启动硬失败的问题。变更思路是：当 sudo 修复失败时，不应直接退出，而应回退到 `--no-sandbox`，避免用户无法启动应用。  
这项修复提升了 Desktop 在受限 Linux 环境中的启动韧性，属于用户可感知的稳定性改进。

### 今日接近落地的修复方向

虽然多数 PR 尚未合并，但已有多个 issue 对应 fix PR，显示维护方向较清晰：

- Windows 测试与端口检测问题  
  - Issue #127343：https://github.com/NousResearch/hermes-agent/issues/127343  
  - PR #127364：https://github.com/NousResearch/hermes-agent/pull/127364  

- Docker 沙箱 `$HOME` 缺失导致 browser 工具启动超时  
  - Issue #127341：https://github.com/NousResearch/hermes-agent/issues/127341  
  - PR #127371：https://github.com/NousResearch/hermes-agent/pull/127371  

- 受保护 skills 可被前台回合写入  
  - Issue #127347：https://github.com/NousResearch/hermes-agent/issues/127347  
  - PR #127365：https://github.com/NousResearch/hermes-agent/pull/127365  

- TUI git branch 轮询优化  
  - Issue #127375：https://github.com/NousResearch/hermes-agent/issues/127375  
  - PR #127384：https://github.com/NousResearch/hermes-agent/pull/127384  

- cron quota hold 过期释放逻辑  
  - PR #127368：https://github.com/NousResearch/hermes-agent/pull/127368  

综合看，今日项目实际“向前推进”的主要领域是：**启动容错、Windows 可移植性、Docker 沙箱、Skills 权限边界、TUI 性能、文档准确性**。但由于大量 PR 仍待合并，实际用户可获得的改进尚有限。

---

## 3. 社区热点

### 1. Windows source update / Desktop 自我终止问题

#### Issue #127284：`source-completion-pending has no TTL or self-heal`  
链接：https://github.com/NousResearch/hermes-agent/issues/127284  
评论数：3  
标签：`type/bug`, `comp/cli`, `platform/windows`, `area/install-update`, `P2`

该问题指出 `source-completion-pending` 状态文件没有 TTL，也没有自愈机制。一旦 completion tail 进程被杀死，状态会永久残留，之后每次启动都会重新进入 pending 状态。  
用户诉求非常明确：安装/更新状态必须具备失效恢复机制，避免单次异常导致长期不可用。

#### Issue #127283：`Desktop (Windows) is terminated by its own source-update completion tail`  
链接：https://github.com/NousResearch/hermes-agent/issues/127283  
评论数：2  
标签：`P0`, `comp/desktop`, `platform/windows`, `area/install-update`

这是今日最严重的问题之一。Windows Desktop 会在启动约 60–80 秒后被自己的 source-update completion tail 终止，形成静默崩溃循环，且没有明显日志。  
背后诉求是：Desktop 更新流程必须与前台应用生命周期解耦，且崩溃必须可观测、可诊断。

### 2. Windows 测试套件不可移植

#### Issue #127343：`Windows: test suite red on current main`  
链接：https://github.com/NousResearch/hermes-agent/issues/127343  
评论数：2  
对应 PR：https://github.com/NousResearch/hermes-agent/pull/127364  

该 issue 报告当前 main 分支在 Windows 11 + Python 3.14.7 下有 5 个确定性失败，其中 4 个是测试不可移植，1 个是端口释放探测的真实产品问题。  
社区关注点不仅是测试绿灯，更是 Windows 作为一等平台的可靠性。

### 3. cron 调度静默失效

#### Issue #127182：`Cron jobs silently stop rescheduling when croniter import fails`  
链接：https://github.com/NousResearch/hermes-agent/issues/127182  
评论数：2  
标签：`P1`, `comp/cron`, `platform/windows`

当运行环境中 `croniter` import 失败时，所有 recurring cron job 会静默停止重新调度：job 仍显示 enabled，但 `next_run_at` 为空，仅在日志中出现 WARNING。  
用户诉求是：自动化任务不能“看似启用、实际停摆”；调度失败需要 UI/状态层明确暴露。

### 4. 审计回归集中出现

多个由可靠性审计触发的回归 issue 今日被打开，包括：

- Issue #127099：https://github.com/NousResearch/hermes-agent/issues/127099  
- Issue #127105：https://github.com/NousResearch/hermes-agent/issues/127105  
- Issue #127104：https://github.com/NousResearch/hermes-agent/issues/127104  
- Issue #127103：https://github.com/NousResearch/hermes-agent/issues/127103  
- Issue #127100：https://github.com/NousResearch/hermes-agent/issues/127100  
- Issue #127098：https://github.com/NousResearch/hermes-agent/issues/127098  

这些问题多数标记 `needs-repro`，说明项目正在进行系统性回归复查。背后的关键诉求是：历史关闭的问题需要可验证的回归测试，而不是仅靠一次性修复判断关闭。

---

## 4. Bug 与稳定性

以下按严重程度与影响面排序。

### P0：Desktop Windows 静默崩溃循环

#### Issue #127283  
链接：https://github.com/NousResearch/hermes-agent/issues/127283  
状态：Open  
是否已有 fix PR：数据中未见明确对应 PR  

Windows Desktop 启动后约 60–80 秒自动退出，无崩溃日志，用户只能反复重启。该问题被标为 P0，且涉及 Desktop、CLI 更新机制、Windows 平台。  
这是今日最需要优先处理的问题，因为它直接阻断 Windows Desktop 正常使用。

---

### P1：cron job 静默停止调度

#### Issue #127182  
链接：https://github.com/NousResearch/hermes-agent/issues/127182  
状态：Open  
是否已有 fix PR：未见明确对应 PR  

`croniter` import 失败会导致 recurring job 不再 reschedule，但 UI 状态仍显示 enabled。  
风险在于用户以为自动化仍在运行，实际任务已经停止，属于高隐蔽性可靠性问题。

---

### P1：上下文压缩破坏 tool-call 参数

#### Issue #127260  
链接：https://github.com/NousResearch/hermes-agent/issues/127260  
状态：Open  
是否已有 fix PR：未见明确对应 PR  

报告称 terminal、write_file、execute_code 的参数在上下文压缩过程中被截断、插入异常 token，且 Windows git-bash 下存在 BOM 不稳定问题。  
该问题影响 Agent 执行工具的可信度，尤其是写文件、执行命令、代码运行等高风险操作。

---

### P1：流式重复循环无法停止

#### Issue #127234  
链接：https://github.com/NousResearch/hermes-agent/issues/127234  
状态：Open  
是否已有 fix PR：未见明确对应 PR  

当本地 OpenAI-compatible endpoint 陷入重复输出时，Hermes 的重复检测要等 stream 结束才生效；如果服务端没有输出上限，turn 可能无限运行。  
这会影响本地模型用户，尤其是 LM Studio 或 custom local server 场景。

---

### P2：source-completion-pending 无 TTL / 无自愈

#### Issue #127284  
链接：https://github.com/NousResearch/hermes-agent/issues/127284  
状态：Open  
是否已有 fix PR：未见明确对应 PR  

残留 pending 状态会让后续启动持续进入异常路径。该问题与 P0 Windows Desktop 崩溃可能存在关联，应与 #127283 一并排查。

---

### P2：Windows 测试失败与端口释放探测问题

#### Issue #127343  
链接：https://github.com/NousResearch/hermes-agent/issues/127343  
对应 PR：https://github.com/NousResearch/hermes-agent/pull/127364  

该问题已有 fix PR，处理 `_wait_for_tcp_port_free` 的 Windows 行为，并修复 4 个 Windows-hostile tests。  
这是今日较成熟的修复项，建议优先 review 和合并，以恢复 Windows CI 信心。

---

### P2：Docker 沙箱 `$HOME` 缺失导致 browser 工具 120 秒超时

#### Issue #127341  
链接：https://github.com/NousResearch/hermes-agent/issues/127341  
对应 PR：https://github.com/NousResearch/hermes-agent/pull/127371  

默认 sandbox image 声明了 `HOME=/home/pn`，但镜像中没有创建目录，且 `/home` 是 root-owned tmpfs，导致 browser tool bootstrap 挂起。  
该问题影响 fresh sandbox 的 browser 工具可用性，且涉及安全边界标签。

---

### P2：Desktop 重新附着 running turn 后重复渲染回复

#### Issue #127288  
链接：https://github.com/NousResearch/hermes-agent/issues/127288  
状态：Open  
是否已有 fix PR：未见明确对应 PR  

Desktop transcript 会把同一 assistant reply 渲染两次，但数据库中只有一条 message。  
这是显示层状态重放或 streaming reattach 问题，虽然不破坏存储，但严重影响用户对会话一致性的信任。

---

### P2：Desktop 右键菜单回归，无法复制文本

#### Issue #127313  
链接：https://github.com/NousResearch/hermes-agent/issues/127313  
状态：Open  
是否已有 fix PR：未见明确对应 PR  

`pane-body` zone menu 拦截 transcript 内右键，导致文本复制和 app-level context menu 不可达。  
这是典型 UX 回归，影响高频操作。

---

### P2：Windows minimize-to-tray 恢复后窗口“画出来但不可交互”

#### Issue #127349  
链接：https://github.com/NousResearch/hermes-agent/issues/127349  
状态：Open  
是否已有 fix PR：未见明确对应 PR  

启用 minimize-to-tray 后，从 taskbar pinned icon 恢复窗口会出现 painted-but-dead 状态；从 tray 菜单恢复正常。  
这说明 Windows 窗口生命周期处理仍存在平台路径差异。

---

### P3：受保护 skills 可被前台 turn 修改

#### Issue #127347  
链接：https://github.com/NousResearch/hermes-agent/issues/127347  
对应 PR：https://github.com/NousResearch/hermes-agent/pull/127365  

当前 provenance guard 只在 background review fork 中运行，导致 foreground turn 可以写入 bundled、Hub-installed、external skills 等受保护内容。  
虽然标 P3，但它涉及权限边界和供应链安全，建议不要低估。

---

### TTS / Wake / Voice 相关问题

#### Issue #127177  
链接：https://github.com/NousResearch/hermes-agent/issues/127177  

用户提供了 pt-BR hands-free voice chat 场景的实测反馈，指出 cloud STT + VAD pre-gate 可以显著降低 ghost prompts。  
相关 TTS PR：

- PR #127383：https://github.com/NousResearch/hermes-agent/pull/127383  
- PR #127366：https://github.com/NousResearch/hermes-agent/pull/127366  

---

## 5. 功能请求与路线图信号

### TUI composer 视觉边界

#### Issue #127332：`TUI: give the composer a zero-row visual boundary`  
链接：https://github.com/NousResearch/hermes-agent/issues/127332  

用户希望 TUI composer 在不占用额外终端行的情况下，具备更清晰的交互区域边界。建议的第一步是为 live draft 增加一列 left rail，而不是完整 box。  
这是一个低风险 UX 改进，范围明确，较可能被纳入后续 TUI polish 工作。

---

### TUI 性能：减少无效轮询

今日出现多个 TUI 性能优化 issue，方向高度一致：减少后台 steady polling，改为按需或事件驱动。

#### Issue #127375：暂停隐藏状态下的 git branch polling  
链接：https://github.com/NousResearch/hermes-agent/issues/127375  
对应 PR：https://github.com/NousResearch/hermes-agent/pull/127384  

#### Issue #127374：用 gateway change signal 替代 config mtime RPC polling  
链接：https://github.com/NousResearch/hermes-agent/issues/127374  

#### Issue #127373：用 `pet.changed` 驱动 pet refresh，并保留慢速 backstop  
链接：https://github.com/NousResearch/hermes-agent/issues/127373  

这些请求显示 TUI 正从“功能可用”进入“长时间运行性能优化”阶段。已有 PR #127384 说明 git branch polling 优化最有可能率先落地。

---

### 文档准确性与配置行为澄清

今日大量 PR 集中修正文档漂移，说明项目 API / 配置行为已经发生较多变化，文档正在追赶实现。

代表性 PR：

- PR #127382：installed plugin MCP servers 实际会 in-place connect  
  https://github.com/NousResearch/hermes-agent/pull/127382  

- PR #127381：补充 GPT-6 Sol/Terra/Luna 到 Codex OAuth compaction 和 reasoning-effort 文档  
  https://github.com/NousResearch/hermes-agent/pull/127381  

- PR #127380：Desktop multi-gateway Simple mode profile rail 文案对齐  
  https://github.com/NousResearch/hermes-agent/pull/127380  

- PR #127379：替换过期 toolset key 列表  
  https://github.com/NousResearch/hermes-agent/pull/127379  

- PR #127378：修正 Asana Client ID 等非 secret 配置写入位置  
  https://github.com/NousResearch/hermes-agent/pull/127378  

- PR #127377：修正 MCP catalog install 非 secret env 目的地  
  https://github.com/NousResearch/hermes-agent/pull/127377  

- PR #127370：澄清 dict-shaped `models:` 不会禁用 discovery  
  https://github.com/NousResearch/hermes-agent/pull/127370  

这些 PR 不直接改变功能，但有助于降低用户误配置成本，尤其是 MCP、provider、model discovery、Bot Mode 等复杂配置区域。

---

## 6. 用户反馈摘要

### 1. Windows 用户对稳定性和可恢复性不满意

多个 Windows issue 指向同一类痛点：应用或测试在 Windows 上并非稳定的一等体验。

相关问题：

- Desktop 静默崩溃循环：  
  https://github.com/NousResearch/hermes-agent/issues/127283  

- `source-completion-pending` 无 TTL：  
  https://github.com/NousResearch/hermes-agent/issues/127284  

- Windows 测试套件失败：  
  https://github.com/NousResearch/hermes-agent/issues/127343  

- minimize-to-tray 恢复后不可交互：  
  https://github.com/NousResearch/hermes-agent/issues/127349  

用户真实痛点是：Windows 下的问题往往表现为“无日志、无提示、不可恢复”，诊断成本高。

---

### 2. 自动化用户需要明确失败信号

cron issue #127182 反映出自动化场景的核心诉求：任务失败不能只写日志，更不能在 UI 中继续显示 enabled。  
链接：https://github.com/NousResearch/hermes-agent/issues/127182  

用户希望 Hermes 在自动化任务失效时提供可见状态、告警或至少显式 error state。

---

### 3. 本地模型用户关注无限流式输出与资源占用

Issue #127234 说明本地模型或 OpenAI-compatible endpoint 用户可能遇到无限输出流。  
链接：https://github.com/NousResearch/hermes-agent/issues/127234  

这类用户希望客户端具备主动中断能力，而不是完全依赖服务端 max tokens。

---

### 4. 语音用户关注 ghost prompt 与语言一致性

Issue #127177 中，用户提供了 pt-BR 语音对话的实测场景：2011 年 CPU-only 笔记本、葡萄牙语输入、希望回复不混英语。  
链接：https://github.com/NousResearch/hermes-agent/issues/127177  

反馈显示，语音体验的关键不是单点模型能力，而是端到端延迟、VAD、STT 稳定性和误触发控制。

---

### 5. 开发者用户要求工具调用绝对可靠

Issue #127260 报告 tool-call 参数在上下文压缩中被破坏。  
链接：https://github.com/NousResearch/hermes-agent/issues/127260  

这类问题会严重削弱开发者对 Agent 执行命令、写文件、运行代码的信任。用户关心的是：模型上下文优化不能改变工具调用语义。

---

## 7. 待处理积压

从今日数据看，所有列出的 issue 都是 2026-09-29 创建或更新，因此无法判断“长期未响应”的历史积压。不过，以下今日新增/活跃问题已经具备较高优先级，如果未尽快处理，可能迅速演变为关键积压。

### 高优先级待处理

1. **P0 Windows Desktop 静默崩溃循环**  
   Issue：https://github.com/NousResearch/hermes-agent/issues/127283  
   建议：优先确认是否与 #127284 的 pending 状态机制相关，并补充崩溃日志/遥测。

2. **P1 cron job 静默停止 reschedule**  
   Issue：https://github.com/NousResearch/hermes-agent/issues/127182  
   建议：将 import/runtime dependency failure 显式反映到 job state 或 UI。

3. **P1 tool-call 参数被上下文压缩破坏**  
   Issue：https://github.com/NousResearch/hermes-agent/issues/127260  
   建议：建立压缩前后 tool-call 参数不可变性测试。

4. **P1 streaming repetition 无限循环**  
   Issue：https://github.com/NousResearch/hermes-agent/issues/127234  
   建议：在客户端层增加 streaming repetition guard 或 max output safety cap。

5. **Windows 测试修复 PR 待合并**  
   PR：https://github.com/NousResearch/hermes-agent/pull/127364  
   建议：优先 review，恢复 Windows host 测试可信度。

6. **Docker sandbox `$HOME` 修复 PR 待合并**  
   PR：https://github.com/NousResearch/hermes-agent/pull/127371  
   建议：优先合并，避免 fresh sandbox browser tool 普遍超时。

7. **Skills 权限边界修复 PR 待合并**  
   PR：https://github.com/NousResearch/hermes-agent/pull/127365  
   建议：虽然标 P3，但因涉及受保护资源写入，建议安全视角复核。

8. **审计回归 `needs-repro` 队列**  
   代表 issue：  
   - https://github.com/NousResearch/hermes-agent/issues/127099  
   - https://github.com/NousResearch/hermes-agent/issues/127105  
   - https://github.com/NousResearch/hermes-agent/issues/127104  
   - https://github.com/NousResearch/hermes-agent/issues/127103  
   - https://github.com/NousResearch/hermes-agent/issues/127100  
   - https://github.com/NousResearch/hermes-agent/issues/127098  

   建议：集中 triage，区分真实回归、不可复现残留、测试缺失三类，避免审计 issue 长期悬挂。

---

## 8. 综合判断

Hermes Agent 今日呈现出“高活跃、高风险暴露、低闭环”的状态。社区和贡献者正在积极发现问题并提交修复，尤其是 Windows、Desktop、Docker sandbox、TUI 性能和文档准确性方面。  
但 50 个活跃 issue 中无关闭，47 个 PR 仍待合并，说明维护者 review/merge 可能成为短期瓶颈。  
建议下一步优先级为：

1. 先处理 P0/P1 用户阻断问题：#127283、#127182、#127260、#127234。  
2. 快速合并已有明确修复的 PR：#127364、#127371、#127365、#127384。  
3. 对 Windows 平台建立更强 CI 和日志可观测性。  
4. 将 reliability audit 产生的 `needs-repro` issue 转化为可执行回归测试。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-09-29）

## 1. 今日速览

过去 24 小时，PicoClaw 社区出现了较集中的维护活动：新增/活跃 Issue 3 条，新增/活跃 PR 5 条，但暂无 PR 合并或 Issue 关闭。今日动态主要集中在**可靠性修复、Agent 会话路由、配置持久化、渠道热重载、Updater 架构匹配**等核心稳定性问题上，说明社区仍在主动补齐项目质量短板。  
值得注意的是，新增 Issue 中出现了“仓库可能缺乏维护”“请求启用私有漏洞报告”等信号，反映出项目治理和安全响应机制存在明显缺口。整体来看，项目代码层面有较高价值的修复提交，但维护侧响应不足，当前健康度可评估为：**社区活跃度回升，但主仓库维护风险偏高**。

---

## 2. 版本发布

过去 24 小时无新版本发布。

当前最新数据中未出现新的 Release，因此暂无官方变更说明、破坏性变更或迁移指南。考虑到今日有多项稳定性修复 PR 待合并，若维护者恢复处理，后续版本可能会以 bugfix / reliability release 为主。

---

## 3. 项目进展

今日暂无已合并或关闭的 PR，因此主分支尚未实际推进。不过，社区提交了 5 个待合并修复 PR，覆盖多个核心模块，具备较高合并价值。

### 待合并的重要 PR

#### PR #3403：修复异步工具结果投递到错误会话的问题  
链接：https://github.com/sipeed/picoclaw/pull/3403  
作者：x1F916  
状态：OPEN

该 PR 修复 `spawn` 异步工具结果被作为 `system` 入站消息发布后，错误地由默认 agent 的主会话处理的问题。该问题会导致不同聊天、不同用户的异步结果混入默认会话，影响多用户、多会话场景下的正确性和隔离性。

影响范围：  
- Agent loop  
- 异步工具调用  
- 多用户会话隔离  
- Routed agent / non-default agent 场景

这是今日最关键的会话一致性修复之一。

---

#### PR #3402：修复 context manager 中 owning agent 解析错误  
链接：https://github.com/sipeed/picoclaw/pull/3402  
作者：x1F916  
状态：OPEN

该 PR 是此前 #3316 的重新提交版本，并基于当前 `main` 分支重新整理。问题在于：当 session 由 routed agent 拥有时，旧 context manager 在 `Assemble` 等路径中仍使用 `registry.GetDefaultAgent()`，导致上下文组装、压缩、裁剪等操作落到错误 agent 上。

影响范围：  
- 多 agent 路由  
- 上下文管理  
- 非默认 agent session  
- 历史 PR 回收

该 PR 表明此前已有修复方案，但可能因 stale bot 或维护响应不足未能进入主线。

---

#### PR #3401：修复 Channels Manager Reload 的同步性和 nil panic 问题  
链接：https://github.com/sipeed/picoclaw/pull/3401  
作者：x1F916  
状态：OPEN

该 PR 处理 `Manager.Reload` 中的多个可靠性问题，包括：启用但初始化失败的 channel 可能存在 config hash 但无 channel instance，随后调用 `Stop` / `Start` 时触发 nil pointer panic。

影响范围：  
- Channels manager  
- Gateway 稳定性  
- Telegram 等需 readiness check 的渠道  
- 热重载流程

该问题具备崩溃风险，应优先评审。

---

#### PR #3400：修复多 API key 模型配置保存丢失问题  
链接：https://github.com/sipeed/picoclaw/pull/3400  
作者：x1F916  
状态：OPEN

该 PR 修复 `expandMultiKeyModels` 在保存多 key 模型配置时只保留第一个 key、丢失 `Enabled` 标志，并错误调整 `Fallbacks` 的问题。该问题会影响自动迁移保存后的配置完整性，尤其是 v0/v1/v2 配置迁移场景。

影响范围：  
- 配置迁移  
- 多 API key 模型  
- fallback 模型链  
- 自动保存逻辑

这属于数据持久化正确性问题，可能造成用户配置被意外改写。

---

#### PR #3399：修复 32-bit ARM updater 选择错误架构包的问题  
链接：https://github.com/sipeed/picoclaw/pull/3399  
作者：x1F916  
状态：OPEN

该 PR 修复 `picoclaw update` 在 32-bit ARM 上错误安装 arm64 archive 的问题。根因是 asset 匹配逻辑使用 substring 匹配，`arm` 会匹配到 `arm64`，且 release asset 中 `Linux_arm64` 排在 `Linux_armv6` / `Linux_armv7` 前面。

影响范围：  
- 自更新命令  
- ARMv6 / ARMv7 用户  
- Raspberry Pi 等 32-bit ARM 设备  
- Release asset 匹配逻辑

这是典型的架构兼容性 bug，可能导致更新后程序无法运行。

---

## 4. 社区热点

今日所有新增 Issue 和 PR 的评论数均为 0，点赞数也均为 0，因此没有传统意义上的“高讨论度”热点。但从主题重要性看，以下几个事项构成了今日社区关注焦点。

### Issue #3405：请求启用 GitHub Private Vulnerability Reporting  
链接：https://github.com/sipeed/picoclaw/issues/3405  
作者：x1F916  
状态：OPEN  
评论：0  
反应：0

用户表示希望私下报告 PicoClaw 的安全问题，但仓库未启用 GitHub 私有漏洞报告，也未提供 `SECURITY.md` 或安全联系人。这是非常重要的治理信号：  
- 项目当前缺乏明确的安全披露流程  
- 潜在漏洞报告者无法安全提交细节  
- 若长期无响应，可能增加公开披露风险  
- 对 AI agent / assistant 类项目而言，安全报告渠道尤为关键

建议维护者优先处理该 Issue，至少补充 `SECURITY.md` 并启用 GitHub private vulnerability reporting。

---

### Issue #3404：核心可靠性问题集中报告  
链接：https://github.com/sipeed/picoclaw/issues/3404  
作者：x1F916  
状态：OPEN  
评论：0  
反应：0

该 Issue 汇总了当前 `main` 分支和 v0.3.1 中可复现的多个可靠性问题，涉及 agent loop、channels manager、config、updater 等模块。今日提交的 5 个 PR 基本对应这一批修复，说明该 Issue 实际上是一次系统性质量巡检。

背后诉求：  
- 希望主仓库恢复维护  
- 希望可复现 bug 能进入正式修复流程  
- 希望避免 stale bot 关闭有效问题  
- 希望提升 PicoClaw 在生产或长期运行环境中的可靠性

---

### Issue #3398：社区 fork 宣告继续维护  
链接：https://github.com/sipeed/picoclaw/issues/3398  
作者：afjcjsbx  
状态：OPEN  
评论：0  
反应：0

该 Issue 宣布存在一个活跃维护的 fork：  
https://github.com/afjcjsbx/picoclaw

这通常是项目维护风险的重要信号。用户明确指出主仓库“currently appears to be unmaintained”，并表示社区仍有明显需求，因此创建 fork 继续推进。

背后诉求：  
- 社区希望项目继续发展  
- 用户对主仓库维护节奏不满意  
- 有人愿意承担维护职责  
- 主仓库需要明确维护状态、交接机制或 fork 合作方式

如果主仓库长期无响应，社区贡献可能逐步迁移到 fork。

---

## 5. Bug 与稳定性

以下按潜在严重程度排序。

### P0 / 高优先级：缺乏私有安全漏洞报告通道  
Issue：https://github.com/sipeed/picoclaw/issues/3405  
是否已有 fix PR：暂无

问题描述：  
用户希望报告安全问题，但仓库未启用 private vulnerability reporting，也没有 `SECURITY.md`。

风险：  
- 安全问题无法私下沟通  
- 漏洞可能被公开暴露  
- 用户和集成方缺乏安全响应预期  
- 对 AI assistant / agent 系统尤其敏感

建议：  
- 启用 GitHub Private Vulnerability Reporting  
- 添加 `SECURITY.md`  
- 明确支持版本、响应时间、披露流程  
- 指定安全联系人

---

### P0 / 高优先级：异步工具结果进入错误 session  
Issue 关联：可能属于 #3404  
Fix PR：https://github.com/sipeed/picoclaw/pull/3403

问题描述：  
异步工具结果被错误地送入默认 agent 的主会话，而不是原始 session。

影响：  
- 多用户结果串话  
- 不同 chat 的工具结果混杂  
- routed agent 场景下上下文污染  
- 可能造成隐私和安全问题

状态：已有修复 PR，待维护者评审合并。

---

### P1 / 高优先级：非默认 agent 的 context manager 使用错误 owning agent  
Issue 关联：可能属于 #3404  
Fix PR：https://github.com/sipeed/picoclaw/pull/3402

问题描述：  
routed agent 所拥有的 session 在 context manager 中仍可能使用 default agent，导致上下文组装与管理行为错误。

影响：  
- 多 agent 架构不可靠  
- 上下文内容可能错误  
- session 归属与执行 agent 不一致  
- 历史修复曾被 stale 流程中断

状态：已有修复 PR，待合并。

---

### P1 / 高优先级：Channel Reload 可能 nil panic  
Issue 关联：可能属于 #3404  
Fix PR：https://github.com/sipeed/picoclaw/pull/3401

问题描述：  
当某个 channel 启用但 readiness check 或 factory 初始化失败时，manager 可能记录 config hash 但没有有效 channel instance，Reload 时对 nil channel 调用 `Stop` / `Start` 导致 panic。

影响：  
- Gateway 崩溃  
- 渠道配置不完整时稳定性差  
- Telegram 等渠道启动前置条件不足时风险较高

状态：已有修复 PR，建议优先合并。

---

### P1 / 中高优先级：多 API key 模型配置保存丢失数据  
Issue 关联：可能属于 #3404  
Fix PR：https://github.com/sipeed/picoclaw/pull/3400

问题描述：  
多 key 模型配置在保存时只保留第一个 key，并可能丢失 `Enabled` 标志、错误修改 `Fallbacks`。

影响：  
- 用户配置被自动保存破坏  
- 多 key fallback 行为失效  
- 配置迁移后行为不符合预期  
- 可能导致模型调用失败或降级

状态：已有修复 PR，待评审。

---

### P2 / 中优先级：32-bit ARM updater 错误安装 arm64 包  
Issue 关联：可能属于 #3404  
Fix PR：https://github.com/sipeed/picoclaw/pull/3399

问题描述：  
`picoclaw update` 在 `GOARCH=arm` 时通过 substring 匹配选中了 `arm64` asset。

影响：  
- 32-bit ARM 设备更新后不可用  
- Raspberry Pi / ARMv6 / ARMv7 用户受影响  
- 自更新机制可信度下降

状态：已有修复 PR，待合并。

---

## 6. 功能请求与路线图信号

### 安全治理能力：启用私有漏洞报告  
Issue：https://github.com/sipeed/picoclaw/issues/3405

虽然这不是传统功能需求，但对项目成熟度非常关键。对于 AI agent 与个人助手类项目，安全披露流程应被视为基础设施能力。  
可能纳入下一版本/近期维护事项的内容包括：  
- 启用 GitHub private vulnerability reporting  
- 新增 `SECURITY.md`  
- 明确安全 issue 提交流程  
- 标注受支持版本范围

优先级建议：高。

---

### 多 agent / 多 session 正确性  
相关 PR：  
- https://github.com/sipeed/picoclaw/pull/3403  
- https://github.com/sipeed/picoclaw/pull/3402

今日两个 agent 相关 PR 都指向同一方向：PicoClaw 的多 agent、多 session、多用户支持仍需加强隔离性和归属判断。  
这暗示未来路线图需要关注：  
- session ownership  
- routed agent correctness  
- async tool result routing  
- context manager 与 agent registry 的一致性  
- 多租户/多聊天场景下的数据隔离

如果合并，这些修复很可能进入下一版 bugfix release。

---

### 配置系统可靠性与迁移安全  
相关 PR：  
- https://github.com/sipeed/picoclaw/pull/3400

配置迁移与自动保存是个人 AI 助手类项目的核心体验之一。该 PR 反映出当前配置系统在复杂模型配置，尤其是多 API key 和 fallback 链路上存在数据保真问题。  
未来可能需要：  
- 配置 round-trip 测试  
- 多 key 模型迁移测试  
- 自动保存前后的 diff 检查  
- fallback 配置验证

---

### 更新器跨架构兼容性  
相关 PR：  
- https://github.com/sipeed/picoclaw/pull/3399

该问题表明 updater 的 asset selection 逻辑需要更严格的架构匹配规则。对于可能部署在边缘设备、树莓派、低功耗设备上的 assistant 项目，ARM 兼容性是重要使用场景。

---

## 7. 用户反馈摘要

今日 Issue / PR 均无评论，因此用户反馈主要来自 Issue 与 PR 正文描述。

### 主要痛点一：维护响应不足  
来源：  
- Issue #3398：https://github.com/sipeed/picoclaw/issues/3398  
- Issue #3404：https://github.com/sipeed/picoclaw/issues/3404

用户明确提到主仓库看起来缺乏维护，并指出部分问题或 PR 曾因 stale bot 被关闭。这说明社区对项目维护流程存在不满，尤其是：  
- 有效问题未被及时处理  
- 贡献 PR 未进入评审  
- stale 自动关闭可能误伤真实 bug  
- 社区不得不创建 active fork 继续维护

---

### 主要痛点二：核心稳定性影响实际使用  
来源：  
- Issue #3404：https://github.com/sipeed/picoclaw/issues/3404  
- PR #3401：https://github.com/sipeed/picoclaw/pull/3401  
- PR #3403：https://github.com/sipeed/picoclaw/pull/3403

用户关注的问题并非边缘细节，而是 agent loop、channels manager、config、updater 等核心模块。这表明实际使用中可能遇到：  
- reload 崩溃  
- session 串话  
- 配置被覆盖或丢失  
- 更新后架构不匹配  
- 多 agent 场景行为不正确

---

### 主要痛点三：安全报告渠道缺失  
来源：  
- Issue #3405：https://github.com/sipeed/picoclaw/issues/3405

用户已经发现或准备报告安全问题，但没有合适渠道。这会降低安全研究者和企业用户对项目的信任度。

---

### 主要正向信号：社区仍愿意贡献修复  
来源：  
- PR #3399 - #3403  
- Issue #3398

虽然主仓库维护状态不明，但社区仍在提交可复现问题和成套修复。今日 5 个 PR 均为具体修复，且覆盖关键路径，说明项目仍有实际用户和贡献者。

---

## 8. 待处理积压

基于今日数据，以下事项需要维护者优先关注。

### 高优先级积压：安全披露流程缺失  
Issue：https://github.com/sipeed/picoclaw/issues/3405  
建议动作：立即启用 private vulnerability reporting，并添加 `SECURITY.md`。

---

### 高优先级积压：可靠性修复 wave 1  
Issue：https://github.com/sipeed/picoclaw/issues/3404  
相关 PR：  
- https://github.com/sipeed/picoclaw/pull/3403  
- https://github.com/sipeed/picoclaw/pull/3402  
- https://github.com/sipeed/picoclaw/pull/3401  
- https://github.com/sipeed/picoclaw/pull/3400  
- https://github.com/sipeed/picoclaw/pull/3399

建议动作：  
1. 逐个复现 Issue #3404 中的问题；  
2. 对 5 个 PR 启动 code review；  
3. 优先合并崩溃和会话隔离相关修复；  
4. 合并后发布 patch release；  
5. 避免 stale bot 关闭仍可复现的问题。

---

### 高优先级积压：主仓库维护状态不明确  
Issue：https://github.com/sipeed/picoclaw/issues/3398  
Fork：https://github.com/afjcjsbx/picoclaw

建议动作：  
- 维护者公开说明项目状态；  
- 如无维护资源，考虑增加社区 maintainer；  
- 与活跃 fork 维护者建立协作；  
- 避免贡献者和用户进一步分流。

---

## 总体健康度评估

| 维度 | 评估 |
|---|---|
| 社区活跃度 | 中等偏高：24 小时内 3 个 Issue、5 个 PR |
| 维护响应 | 偏弱：无合并、无关闭、无评论互动 |
| 稳定性 | 存在风险：多个核心模块出现可复现问题 |
| 安全治理 | 明显不足：未启用私有漏洞报告，无 `SECURITY.md` |
| 项目前景 | 取决于维护者响应；若持续沉默，社区 fork 可能成为事实维护分支 |

**结论：** 今日 PicoClaw 的技术贡献质量较高，但项目治理和维护响应是主要风险。建议维护者优先处理安全报告通道、评审 5 个可靠性修复 PR，并明确主仓库维护计划。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报  
日期：2026-09-29  
仓库：github.com/qwibitai/nanoclaw

## 1. 今日速览

过去 24 小时 NanoClaw 维护活跃度较高，共有 **1 条 Issue 更新**、**10 条 PR 更新**，其中 **7 条仍待合并**、**3 条已关闭或完成处理**。今日工作重点明显集中在 **安装与更新流程稳定性**、**Agent Runner / 定时任务可靠性**、**日志健壮性** 以及 **Skills / Gateway 文档与适配器行为修正**。  
从标签分布看，`kind/bug` 占比较高，说明当前阶段主要在做稳定性修复和边界条件补齐，而非大规模功能扩展。整体来看，项目维护响应较快：新报告的 `/update-nanoclaw` 问题当天已有对应修复 PR，项目健康度保持良好，但更新流程仍是近期高风险区域。

---

## 2. 版本发布

过去 24 小时 **无新版本发布**。

---

## 3. 项目进展

今日已关闭 / 完成处理的 PR 共 3 条，主要推进了 CI 稳定性、定时任务进程清理和技能适配器错误信息准确性。

### #3959 test(agent-runner): spawn bun children asynchronously so CI stops hanging in spawnSync  
链接：https://github.com/qwibitai/nanoclaw/pull/3959  
状态：CLOSED  
标签：`kind/bug`, `area/agent-memory`, `area/agent-runner`, `area/ncl-cli`

该 PR 解决了主分支 CI 中 Agent Runner 容器测试频繁挂起的问题。问题源于 Bun 1.4.0 的 `spawnSync` 在某些情况下无法正确感知子进程退出，导致测试永久等待。  
**影响**：  
- 提升主分支 CI 稳定性  
- 降低维护者在非业务逻辑失败上的排查成本  
- 间接提高 PR 合并效率

### #3957 fix(scheduling): kill the whole process group when a pre-task script times out  
链接：https://github.com/qwibitai/nanoclaw/pull/3957  
状态：CLOSED  
标签：`kind/bug`, `area/agent-runner`, `area/scheduled-tasks`

该 PR 修复了定时任务 pre-task 脚本超时后仅杀死 `bash`，但其子进程仍继续运行的问题。此前 `bun flow.ts` 等子进程可能在父进程超时后继续执行，并产生延迟副作用。  
**影响**：  
- 强化任务超时语义  
- 避免超时任务继续修改状态或污染后续任务  
- 对长时间运行的自动化任务和 Agent 工作流稳定性有直接帮助

### #3960 fix(add-onecli): name the credential, not the provider, in adapter errors  
链接：https://github.com/qwibitai/nanoclaw/pull/3960  
状态：CLOSED  
标签：`delivery/skill`, `area/skills`, `kind/cleanup`

该 PR 调整 OneCLI credential adapter 中的错误信息和注释，使其指向具体 credential，而非泛化为 OpenCode provider。  
**影响**：  
- 改善调试体验  
- 降低网关与 provider 概念混淆  
- 有助于 Skills / Gateway 体系的长期可维护性

---

## 4. 社区热点

今日没有出现高评论或高反应的讨论：  
- 最新 Issue 评论数：0  
- 最新 PR 反应数：均为 0  
- PR 评论字段未提供有效统计

尽管互动数据不高，但从 PR 主题看，维护者内部关注点高度集中在以下方向：

### 热点一：`/update-nanoclaw` 更新流程可靠性  
相关链接：  
- Issue #3961：https://github.com/qwibitai/nanoclaw/issues/3961  
- PR #3962：https://github.com/qwibitai/nanoclaw/pull/3962  
- PR #3956：https://github.com/qwibitai/nanoclaw/pull/3956  
- PR #3963：https://github.com/qwibitai/nanoclaw/pull/3963  

背后诉求是：用户希望更新命令的状态报告必须可信，尤其不能在服务未切换、未重启或仍由旧 host 提供服务时显示 `phase: complete`。这类问题直接影响生产环境升级信心。

### 热点二：Agent / 定时任务的进程生命周期管理  
相关链接：  
- PR #3959：https://github.com/qwibitai/nanoclaw/pull/3959  
- PR #3957：https://github.com/qwibitai/nanoclaw/pull/3957  

背后诉求是：NanoClaw 作为 AI Agent 运行平台，必须保证任务执行、超时、终止和容器回收行为可预测，否则自动化任务可能产生难以追踪的副作用。

### 热点三：Skills 与 Gateway 文档边界清晰化  
相关链接：  
- PR #3955：https://github.com/qwibitai/nanoclaw/pull/3955  
- PR #3954：https://github.com/qwibitai/nanoclaw/pull/3954  
- PR #3960：https://github.com/qwibitai/nanoclaw/pull/3960  

背后诉求是：随着 OpenCode、Iron、OneCLI 等适配层增加，用户和开发者需要更明确地知道哪些行为属于 gateway，哪些属于 provider 或 credential adapter。

---

## 5. Bug 与稳定性

### 严重级别：高

#### #3961 `/update-nanoclaw` 在无法连接 `systemctl --user` bus 时错误报告完成  
链接：https://github.com/qwibitai/nanoclaw/issues/3961  
状态：OPEN  
标签：`kind/bug`, `area/setup-installation`, `triage/unresolved`  
影响版本：v2.4.0 以及 main `63082563`

问题描述：  
`/update-nanoclaw` 在 `systemctl --user` 无法访问 bus 的情况下，仍报告 `phase: complete`，但实际上旧 host 仍在服务，服务未被正确停止，也未完成重启切换。

风险分析：  
- 用户可能误以为升级完成  
- 实际运行版本可能仍是旧版本  
- 对自托管部署和生产升级风险较高  
- 属于“状态报告与真实系统状态不一致”的严重可靠性问题

已有修复 PR：  
- #3962：https://github.com/qwibitai/nanoclaw/pull/3962  
  修复方向：当服务存活性探测本身失败时，拒绝执行 cutover 或拒绝报告完成。  
- #3956：https://github.com/qwibitai/nanoclaw/pull/3956  
  相关方向：rollback 时停止真实运行中的 nohup host，并在替换 `data/` 前清理 agent containers。  
- #3963：https://github.com/qwibitai/nanoclaw/pull/3963  
  相关方向：修复 update e2e 测试在部分 Node 24 版本上的测试环境问题，保证 `/update-nanoclaw` 验证链路可运行。

---

### 严重级别：高

#### #3962 fix(update): refuse cutover when the service liveness probe itself fails  
链接：https://github.com/qwibitai/nanoclaw/pull/3962  
状态：OPEN  
标签：`kind/bug`, `area/setup-installation`, `core-team`

该 PR 直接响应 #3961。问题根因在于 `scripts/update/service.ts` 中 `detectService` 使用 `tryRun(...).ok` 推导服务活跃状态，但当探测命令自身失败时，逻辑可能产生错误判断。  
预期收益：  
- 避免更新流程在服务探测失败时继续向前推进  
- 防止“旧 host 仍在运行但更新报告 complete”的错误状态  
- 提高安装 / 更新流程可信度

---

### 严重级别：高

#### #3956 fix(update): rollback stops the live nohup host and drains agent containers  
链接：https://github.com/qwibitai/nanoclaw/pull/3956  
状态：OPEN  
标签：`kind/bug`, `area/setup-installation`, `core-team`

该 PR 修复 rollback 场景中的两个关键问题：  
1. nohup 安装模式下，rollback 可能没有停止真实运行中的 host。  
2. 替换 `data/` 前未先停止 agent containers，可能造成数据竞争或状态污染。

影响：  
- 与更新失败后的恢复路径直接相关  
- 对数据一致性和回滚可靠性非常重要  
- 建议优先 review

---

### 严重级别：中高

#### #3958 fix(log): never throw when a log value cannot be JSON-serialized  
链接：https://github.com/qwibitai/nanoclaw/pull/3958  
状态：OPEN  
标签：`kind/bug`, `area/core`

问题描述：  
`src/log.ts` 中 `formatErr` 和 `formatData` 直接调用 `JSON.stringify`，当日志对象包含循环引用或 `BigInt` 时会抛异常。由于 `emit` 没有 try/catch，调用 `log.*()` 本身可能导致 host 崩溃。

影响：  
- 日志系统不应成为崩溃源  
- 对插件、Agent 执行、外部输入场景尤其重要  
- 属于核心健壮性修复，建议尽快合并

---

### 严重级别：中

#### #3957 fix(scheduling): kill the whole process group when a pre-task script times out  
链接：https://github.com/qwibitai/nanoclaw/pull/3957  
状态：CLOSED  
标签：`kind/bug`, `area/agent-runner`, `area/scheduled-tasks`

已完成处理。该问题可能导致超时任务的子进程继续运行并产生后续副作用，影响任务调度一致性。

---

### 严重级别：中

#### #3959 test(agent-runner): spawn bun children asynchronously so CI stops hanging in spawnSync  
链接：https://github.com/qwibitai/nanoclaw/pull/3959  
状态：CLOSED  
标签：`kind/bug`, `area/agent-runner`, `area/agent-memory`, `area/ncl-cli`

已完成处理。该问题主要影响 CI 和测试稳定性，属于开发流程稳定性问题。

---

### 严重级别：中

#### #3953 fix(iron-proxy): stop early on arm64 engines that cannot run amd64 images  
链接：https://github.com/qwibitai/nanoclaw/pull/3953  
状态：OPEN  
标签：`kind/bug`, `delivery/skill`, `area/skills`

该 PR 让 Iron Proxy 在 arm64 Docker engine 无法运行 amd64 image 时尽早失败，并提供明确修复提示，而不是在拉取和构建后才出现 `exec format error`。  
影响：  
- 改善 arm64 用户安装体验  
- 降低失败成本  
- 对 Apple Silicon、ARM 服务器部署用户有实际价值

---

## 6. 功能请求与路线图信号

今日没有明确的新功能请求 Issue，唯一新 Issue 是 bug 报告。但从 PR 内容可以观察到几个路线图信号：

### 方向一：更新系统将继续强化“可验证、可回滚、状态可信”
相关 PR：  
- #3962：https://github.com/qwibitai/nanoclaw/pull/3962  
- #3956：https://github.com/qwibitai/nanoclaw/pull/3956  
- #3963：https://github.com/qwibitai/nanoclaw/pull/3963  

判断：这些修复很可能进入下一版本或补丁版本，因为它们直接关系到安装 / 更新流程的安全性。

### 方向二：Agent 执行环境的进程隔离与清理会继续加强
相关 PR：  
- #3957：https://github.com/qwibitai/nanoclaw/pull/3957  
- #3959：https://github.com/qwibitai/nanoclaw/pull/3959  

判断：Agent Runner、scheduled tasks、memory hook、CLI stdin JSON 等模块正在被系统性加固，说明项目正在补齐长运行任务和容器化执行中的边界问题。

### 方向三：Gateway / Skills 文档与职责边界持续收敛
相关 PR：  
- #3955：https://github.com/qwibitai/nanoclaw/pull/3955  
- #3954：https://github.com/qwibitai/nanoclaw/pull/3954  
- #3960：https://github.com/qwibitai/nanoclaw/pull/3960  

判断：NanoClaw 可能正在推动 Skills 体系的产品化和可维护性建设，尤其是 OpenCode、OneCLI、Iron 等 gateway 的文档和错误提示将更细分。

---

## 7. 用户反馈摘要

今日可用的用户反馈主要来自 Issue #3961，评论数为 0，因此反馈来源集中在问题描述本身。

### 主要痛点一：更新命令完成状态不可信  
链接：https://github.com/qwibitai/nanoclaw/issues/3961  

用户观察到 `/update-nanoclaw` 显示 `phase: complete`，但实际仍由旧 host 提供服务。该问题反映出用户对升级流程的核心期望：  
- 更新完成状态必须与真实运行状态一致  
- 如果服务停止、重启、cutover 或探测失败，应明确失败，而不是显示完成  
- 对生产或长期运行实例来说，“假完成”比显式失败更危险

### 主要痛点二：Linux user systemd 环境兼容性  
链接：https://github.com/qwibitai/nanoclaw/issues/3961  

问题触发条件涉及 `systemctl --user` 无法访问 bus，说明部分 Linux 部署环境可能存在 user service 环境不完整、session bus 缺失或权限上下文不一致的问题。  
这提示维护者需要继续增强：  
- systemd user service 检测  
- nohup fallback  
- 更新前环境校验  
- 错误信息可诊断性

### 满意度信号  
虽然没有评论和 reaction，但维护者当天提交了多个相关 PR，说明项目响应速度较快。对用户而言，这是正向信号。

---

## 8. 待处理积压

由于当前数据仅覆盖过去 24 小时，无法判断长期未响应的历史 Issue 或 PR。但以下今日仍处于 OPEN 状态的条目建议维护者优先关注：

### 高优先级

1. #3962 fix(update): refuse cutover when the service liveness probe itself fails  
   链接：https://github.com/qwibitai/nanoclaw/pull/3962  
   原因：直接修复 #3961，影响更新流程可信度。

2. #3956 fix(update): rollback stops the live nohup host and drains agent containers  
   链接：https://github.com/qwibitai/nanoclaw/pull/3956  
   原因：影响 rollback 正确性和数据安全。

3. #3958 fix(log): never throw when a log value cannot be JSON-serialized  
   链接：https://github.com/qwibitai/nanoclaw/pull/3958  
   原因：日志调用不应导致 host 崩溃，属于核心稳定性问题。

### 中优先级

4. #3963 test(update): remove the data symlink with unlinkSync, not rmSync  
   链接：https://github.com/qwibitai/nanoclaw/pull/3963  
   原因：保障 update e2e 测试在 Node 24 不同版本上的可运行性，为更新修复提供测试支撑。

5. #3953 fix(iron-proxy): stop early on arm64 engines that cannot run amd64 images  
   链接：https://github.com/qwibitai/nanoclaw/pull/3953  
   原因：改善 arm64 用户安装体验，避免低质量失败。

6. #3954 docs(gateways): document that the OneCLI and Iron adapters cannot detect a concurrent value rotation  
   链接：https://github.com/qwibitai/nanoclaw/pull/3954  
   原因：文档化 credential rotation 的并发限制，减少用户误解。

7. #3955 docs(opencode): keep gateway notes in the gateway skills  
   链接：https://github.com/qwibitai/nanoclaw/pull/3955  
   原因：清理 OpenCode 与 gateway skill 文档边界，有助于长期维护。

---

## 总体健康度评估

NanoClaw 今日维护活跃，问题响应速度快，尤其是 `/update-nanoclaw` 相关 bug 已形成成组修复 PR。短期风险主要集中在 **安装更新流程、服务探测、rollback、日志容错与 Agent 进程清理**。  
如果 #3962、#3956、#3958 能尽快合并，项目稳定性将有明显提升。当前更像是一次面向下一补丁版本的稳定性收敛周期，而不是功能扩张周期。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报｜2026-09-29

## 1. 今日速览

过去 24 小时，NullClaw 项目活跃度较低但仍有一次版本相关维护动作：Issues 无新增、无关闭，PR 更新 1 条且已关闭/完成处理。今日没有新版本发布，但出现了面向 `v20260929` 的版本准备 PR，内容集中在 Web 搜索提供商配置、Exa 请求头兼容性、QQ 官方回复格式清理以及版本号更新。整体来看，项目今日更偏向发布前整理与稳定性修复，而非大规模功能开发。社区互动较少，未观察到新的用户反馈、Bug 报告或功能请求。

---

## 2. 项目进展

### 已关闭 PR

#### [#1014 v20260929](https://github.com/nullclaw/nullclaw/pull/1014)

- **状态**：Closed  
- **作者**：elwina  
- **创建时间**：2026-09-28  
- **更新时间**：2026-09-28  
- **评论数**：未提供  
- **👍 反应数**：0  

**主要内容：**

该 PR 是一次版本准备类更新，摘要中包含三项核心变更：

1. **Web 搜索提供商固定到配置项指定的 provider**
   - 说明项目在 Web Search 模块中可能存在 provider 选择不稳定或未严格遵循配置的问题。
   - 本次调整有助于提升行为确定性，避免在多搜索服务集成场景下调用到非预期 provider。

2. **修复 Exa 因重复 `Content-Type` 请求头导致拒绝请求的问题**
   - 这是一个兼容性与稳定性修复。
   - 对依赖 Exa 作为搜索或检索后端的用户而言，该修复可能直接降低请求失败率。

3. **官方 QQ 回复前移除 Markdown 标记**
   - 该变更面向消息输出体验，避免 QQ 官方回复中出现不适合展示的 Markdown 符号。
   - 对使用 NullClaw 对接 QQ 场景的用户，回复内容会更自然、更符合 IM 平台展示习惯。

4. **版本号更新至 `v20260929`**
   - 表明该 PR 与即将或计划中的版本发布流程相关。
   - 但截至本日报数据，GitHub Releases 中尚未出现新版本。

**测试计划：**

PR 中列出的测试项包括：

- Release workflow builds the tag
- `nullclaw version` reports the release tag

这些测试项说明维护者关注发布流程正确性，包括标签构建和 CLI 版本号输出一致性。

**进展评估：**

该 PR 虽然不是大型功能合并，但对项目发布质量、外部服务兼容性和 IM 端用户体验有直接改善。若该 PR 已被合并，则可视为一次小型稳定性与发布准备更新；若仅关闭未合并，则需要维护者确认相关修复是否已通过其他路径进入主分支。

---

## 3. 社区热点

今日没有活跃 Issue，PR 互动也较少。

### 今日唯一有更新的 PR

- [#1014 v20260929](https://github.com/nullclaw/nullclaw/pull/1014)
  - 👍：0
  - 评论数：未提供
  - 状态：Closed

**热点分析：**

该 PR 的关注点不是社区讨论，而是维护者驱动的版本整理。其背后反映出三个潜在诉求：

1. **用户希望 Web Search 行为更可控**
   - 固定到配置的 provider 说明项目需要避免隐式 fallback 或不确定调用。

2. **外部 API 集成需要更强兼容性**
   - Exa 拒绝重复 `Content-Type` 请求头属于典型第三方服务兼容问题。
   - 此类问题通常会影响检索、搜索增强回答、Agent 工具调用等核心体验。

3. **IM 平台输出需要适配终端展示规则**
   - QQ 官方回复去除 Markdown 标记，说明多平台消息格式适配仍是 NullClaw 的实际使用场景之一。

---

## 4. Bug 与稳定性

过去 24 小时没有新 Issue 报告 Bug、崩溃或回归问题。

不过，今日 PR 中包含至少一个明确的稳定性修复信号：

### 中等优先级：Exa 请求因重复 `Content-Type` 被拒绝

- 相关 PR：[ #1014 v20260929](https://github.com/nullclaw/nullclaw/pull/1014)
- 严重程度：中等
- 影响范围：使用 Exa 作为 Web Search / 检索 provider 的场景
- 当前状态：PR 已关闭，是否已合并需进一步确认
- 是否已有 fix PR：是，见 [#1014](https://github.com/nullclaw/nullclaw/pull/1014)

**影响分析：**

如果重复 `Content-Type` 会导致 Exa 请求失败，则可能影响 Agent 的联网搜索、资料检索、回答增强等能力。该问题不一定导致主程序崩溃，但会降低工具调用成功率和最终回答质量。

### 低到中等优先级：Web Search provider 未严格固定到配置项

- 相关 PR：[ #1014 v20260929](https://github.com/nullclaw/nullclaw/pull/1014)
- 严重程度：低到中等
- 影响范围：配置了特定搜索 provider 的部署
- 当前状态：PR 已关闭，是否已合并需确认
- 是否已有 fix PR：是，见 [#1014](https://github.com/nullclaw/nullclaw/pull/1014)

**影响分析：**

该问题更偏行为一致性和可预期性。如果用户显式配置了 provider，但实际调用未固定到该 provider，可能造成成本、延迟、结果质量或数据合规方面的不确定性。

---

## 5. 功能请求与路线图信号

过去 24 小时没有新的功能请求 Issue。

从今日 PR 可观察到以下路线图信号：

### 1. Web Search provider 配置治理继续加强

- 相关 PR：[ #1014 v20260929](https://github.com/nullclaw/nullclaw/pull/1014)

该变更说明 NullClaw 对搜索能力的工程化管理正在继续完善，尤其是多 provider 支持下的确定性和可配置性。后续可能继续围绕 provider fallback、错误重试、速率限制、API 兼容性做增强。

### 2. IM 平台输出格式适配仍是维护重点

- 相关 PR：[ #1014 v20260929](https://github.com/nullclaw/nullclaw/pull/1014)

“Strip Markdown markers before official QQ replies” 表明项目关注不同平台的消息展示差异。后续路线图中可能继续出现针对 QQ、微信、Telegram、Discord 等渠道的格式适配、富文本降级或消息模板优化。

### 3. 发布流程一致性受到重视

- 相关 PR：[ #1014 v20260929](https://github.com/nullclaw/nullclaw/pull/1014)

测试计划中包含 release workflow 和 `nullclaw version` 校验，说明维护者正在确保版本标签、构建产物和 CLI 输出保持一致。这对用户安装、升级和问题排查都很重要。

---

## 6. 用户反馈摘要

过去 24 小时没有新的 Issue，也没有可分析的用户评论数据。

基于今日 PR 内容，只能间接推断以下用户痛点：

1. **外部搜索服务调用失败会影响 Agent 可用性**
   - Exa 请求头问题可能来自实际集成中的失败案例。
   - 对依赖联网搜索的用户，这类问题会直接影响回答完整性。

2. **平台回复格式需要更贴近最终用户阅读习惯**
   - QQ 官方回复清理 Markdown 标记，说明用户可能不希望在 IM 中看到 `**`、`#`、列表标记等原始 Markdown 符号。

3. **配置项应严格生效**
   - Web Search provider 固定到配置项，反映出用户对“配置即行为”的可预期性要求。

由于缺少 Issue 评论和反应数据，以上为基于代码变更摘要的间接分析，不代表明确的用户原话反馈。

---

## 7. 待处理积压

今日数据中没有长期未响应的 Issue 或 PR 信息，因此无法判断历史积压情况。

### 今日观察到的潜在维护提醒

#### 确认 PR #1014 的最终状态

- 链接：[ #1014 v20260929](https://github.com/nullclaw/nullclaw/pull/1014)
- 当前数据状态：Closed
- 建议维护者确认：
  - 该 PR 是否已合并；
  - 如果只是关闭，相关修复是否已通过其他 PR 或 commit 进入主分支；
  - 是否需要继续发布 `v20260929` 对应 GitHub Release；
  - Release workflow 与 `nullclaw version` 校验是否已完成。

---

## 项目健康度评估

- **开发活跃度**：低  
  过去 24 小时仅 1 条 PR 更新，无 Issue 活动。

- **稳定性趋势**：小幅改善  
  今日 PR 涉及 Exa 请求头兼容性和 Web Search provider 确定性，属于稳定性与可预期性增强。

- **社区互动**：较低  
  无新增 Issue，PR 无明显反应数据，社区讨论热度不足。

- **发布节奏**：处于发布准备状态  
  虽然尚无 GitHub Release，但 `v20260929` 相关 PR 表明项目可能正在进行版本发布流程或版本号同步。

总体来看，NullClaw 今日处于低噪声维护状态，重点集中在发布准备、搜索集成稳定性和 QQ 输出体验修正。若后续完成 `v20260929` Release，将有助于把今日修复正式交付给用户。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-09-29

## 1. 今日速览

过去 24 小时，IronClaw 项目活跃度偏低到中等：新增/活跃 Issue 1 条，新增 PR 2 条，暂无合并、关闭或版本发布。今日工作重点集中在 **CLI 配置可观测性修复** 与 **Web UI 命令面板焦点恢复问题**，均为低风险、中等规模改动。Issue 侧主要是每日自动/人工整理的失败分类报告，指向 benchmark 中的模型质量问题，而非明确的工程回归。整体来看，项目处于稳定维护节奏中，当前更偏向小步修复与质量观察，尚未出现重大功能推进或高严重度事故信号。

---

## 2. 项目进展

今日暂无已合并或已关闭 PR，因此还没有实际进入主干的代码变更。不过有 2 个新 PR 进入待审状态，均标记为低风险、中等规模，可能在后续版本中带来可见改进。

### 待合并 PR

#### #8118 — fix(cli): report effective config profile  
- 状态：OPEN  
- 作者：changeroa  
- 类型：CLI 修复 / 配置诊断改进  
- 风险：low  
- 规模：M  
- 链接：https://github.com/nearai/ironclaw/pull/8118  

该 PR 旨在让以下命令正确展示实际生效的启动配置 profile：

- `ironclaw config path`
- `ironclaw doctor`
- `ironclaw status`

当前问题是，当 `IRONCLAW_REBORN_PROFILE` 环境变量未设置时，相关命令可能没有准确报告 `config.toml` 中的有效 boot profile。PR 选择复用已有的 `runtime::effective_profile` 优先级路径，避免重复实现 profile 解析逻辑。

**项目推进意义：**

- 提升 CLI 诊断结果可信度；
- 降低用户排查配置问题的成本；
- 减少 profile 解析逻辑分叉带来的维护风险。

#### #8117 — fix(webui): restore focus after closing the command palette  
- 状态：OPEN  
- 作者：changeroa  
- 类型：Web UI 交互修复  
- 风险：low  
- 规模：M  
- scope：docs  
- 链接：https://github.com/nearai/ironclaw/pull/8117  

该 PR 修复 Web UI 中命令面板关闭后的焦点恢复问题。此前用户从输入框中通过 `Cmd/Ctrl+K` 打开命令面板后，如果关闭面板，焦点会落到 `body`，导致后续键盘输入无法回到原输入框。

PR 的处理方式是：

- 记录每次打开命令面板时的触发元素；
- 在清理阶段，如果该元素仍连接在 DOM 中，则恢复焦点；
- 保留既有的焦点管理行为。

**项目推进意义：**

- 改善键盘流用户体验；
- 降低 Web UI 中断输入流的概率；
- 对依赖快捷键和命令面板的高频用户较有价值。

---

## 3. 社区热点

今日没有高评论量或高反应数的讨论。所有新增/更新条目均为 0 评论、0 reaction，因此社区互动热度较低。

### #8116 — Daily ironclaw failure taxonomy — 2026-09-28  
- 状态：OPEN  
- 作者：pranavraja99  
- 评论数：0  
- 👍：0  
- 链接：https://github.com/nearai/ironclaw/issues/8116  

该 Issue 是每日 failure taxonomy 报告，分析了 benchmark run 中的失败样本。摘要显示，`officeqa` suite 中有 31 个 non-pass 任务，其中除一个外，基本被归类为真实模型质量错误，而非基础设施或测试框架异常。

**背后诉求分析：**

- 项目正在持续跟踪 benchmark 失败来源；
- 当前关注点偏向模型能力与任务完成质量；
- 对维护者而言，该类报告可用于区分“工程问题”与“模型质量问题”，避免误将 benchmark 下降归因于系统 bug。

---

## 4. Bug 与稳定性

今日没有明确的新崩溃、严重回归或高优先级稳定性事故报告。已有条目中可识别的稳定性相关内容如下。

### 中低严重度：CLI 有效配置 profile 展示不准确  
- 相关 PR：#8118  
- 状态：OPEN，尚未合并  
- 链接：https://github.com/nearai/ironclaw/pull/8118  

**问题表现：**  
部分 CLI 命令在 `IRONCLAW_REBORN_PROFILE` 未设置时，可能未准确报告 `config.toml` 中实际生效的 boot profile。

**影响范围：**

- 主要影响配置排查、诊断命令输出的准确性；
- 不一定直接影响运行时行为；
- 对依赖多 profile 启动或诊断环境差异的用户更明显。

**是否已有 fix PR：**  
是，#8118 已提交修复，等待 review/合并。

---

### 中低严重度：Web UI 命令面板关闭后焦点丢失  
- 相关 PR：#8117  
- 状态：OPEN，尚未合并  
- 链接：https://github.com/nearai/ironclaw/pull/8117  

**问题表现：**  
用户从输入框中使用 `Cmd/Ctrl+K` 打开命令面板并关闭后，焦点会落到 `body`，导致继续输入时无法回到原输入框。

**影响范围：**

- 影响 Web UI 键盘交互流畅度；
- 对重度键盘用户、命令面板用户影响更明显；
- 不属于数据损坏或系统崩溃级问题。

**是否已有 fix PR：**  
是，#8117 已提交修复，等待 review/合并。

---

### 模型质量失败：officeqa benchmark non-pass  
- 相关 Issue：#8116  
- 状态：OPEN  
- 链接：https://github.com/nearai/ironclaw/issues/8116  

**问题表现：**  
`officeqa` suite 中报告 31 个 non-pass 任务，大多数被归类为真实模型质量错误。

**严重程度判断：**

- 若 IronClaw 当前目标包含 benchmark 表现优化，则该问题值得持续跟踪；
- 但从摘要看，这些失败主要不是系统崩溃、测试基础设施异常或明显回归；
- 暂无对应 fix PR。

**是否已有 fix PR：**  
暂无。

---

## 5. 功能请求与路线图信号

今日没有明确的新功能请求 Issue。当前 PR 透露出的路线图信号主要集中在以下两个方向。

### 方向一：提升 CLI 配置透明度与诊断体验  
- 相关 PR：#8118  
- 链接：https://github.com/nearai/ironclaw/pull/8118  

该 PR 表明维护方向之一是让 CLI 更准确地展示运行时真实配置，尤其是 profile 解析结果。这类改动通常对以下场景有帮助：

- 多环境/多 profile 切换；
- 本地开发与生产配置差异排查；
- 用户提交 bug report 前的环境自检。

**进入下一版本可能性：**  
较高。该 PR 风险低、范围明确，且复用已有解析逻辑，适合作为修复类更新进入后续版本。

---

### 方向二：改善 Web UI 键盘交互与可用性  
- 相关 PR：#8117  
- 链接：https://github.com/nearai/ironclaw/pull/8117  

命令面板焦点恢复属于典型的可用性细节修复，说明项目在关注 Web UI 的日常操作体验，尤其是快捷键工作流。

**进入下一版本可能性：**  
较高。该 PR 影响范围集中、风险低，且修复的是明确的交互缺陷。

---

## 6. 用户反馈摘要

今日 Issues 和 PR 均无评论，因此无法从讨论中提炼出更多真实用户反馈。不过从 PR 摘要和 Issue 内容可间接观察到以下痛点：

### 配置排查痛点  
- 相关 PR：#8118  
- 链接：https://github.com/nearai/ironclaw/pull/8118  

用户或开发者需要知道 IronClaw 实际采用的是哪个配置 profile。如果 CLI 展示的 profile 与运行时解析结果不一致，会增加排查难度，尤其是在环境变量和 `config.toml` 同时参与配置决策时。

### Web UI 输入连续性痛点  
- 相关 PR：#8117  
- 链接：https://github.com/nearai/ironclaw/pull/8117  

命令面板关闭后焦点丢失，会打断用户输入流程。这类问题虽然不一定造成严重功能失败，但会显著影响频繁使用快捷键的用户体验。

### Benchmark 质量观察  
- 相关 Issue：#8116  
- 链接：https://github.com/nearai/ironclaw/issues/8116  

每日失败分类显示，当前 benchmark 中的部分失败更多来自模型输出质量，而不是工程系统错误。对项目方而言，这类反馈有助于将优化资源投向模型行为、任务策略或 evaluation 分析，而不是盲目排查基础设施。

---

## 7. 待处理积压

基于本次提供的数据，无法判断长期未响应的历史 Issue 或 PR；过去 24 小时内也没有显示长期积压项。不过今日新增的两个 PR 均处于待合并状态，建议维护者优先 review。

### 建议优先 review

#### #8118 — CLI effective config profile 报告修复  
- 链接：https://github.com/nearai/ironclaw/pull/8118  
- 建议优先级：中  
- 原因：提升诊断准确性，风险低，容易验证。

#### #8117 — Web UI command palette 焦点恢复  
- 链接：https://github.com/nearai/ironclaw/pull/8117  
- 建议优先级：中  
- 原因：改善键盘交互体验，影响面明确，适合快速合并。

### 需要持续跟踪

#### #8116 — Daily ironclaw failure taxonomy — 2026-09-28  
- 链接：https://github.com/nearai/ironclaw/issues/8116  
- 建议优先级：中低  
- 原因：当前没有评论和明确工程修复项，但其 benchmark failure taxonomy 对模型质量趋势判断有参考价值。

---

## 项目健康度判断

今日 IronClaw 没有新版本发布，也没有 PR 合入，短期交付速度偏保守。但新增 PR 均为低风险、明确问题导向的修复，说明维护活动仍在持续。Issue 侧没有出现高严重度 bug、崩溃或集中负面反馈，稳定性风险暂时可控。整体健康度评估为：**稳定维护中，社区互动偏低，短期重点在小型修复与 benchmark 质量观察。**

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报｜2026-09-29

## 1. 今日速览

过去 24 小时，LobsterAI **没有新增或更新 Issue**，但有 **7 条 Pull Request 更新且均已关闭**，开发活动主要集中在 **OpenClaw 稳定性、Cowork 交互体验、文档编辑能力** 三个方向。  
今日未发布新版本，说明当前更像是面向下一次版本发布的功能与稳定性收敛阶段。  
从 PR 分布看，`openclaw`、`main`、`renderer`、`cowork` 是今日最活跃模块，项目维护重点明显偏向 **AI Agent 执行链路的可靠性与用户可见性优化**。  
整体活跃度评估为：**中高活跃**。虽然社区 Issue 端没有新增反馈，但核心维护者连续关闭多项功能和修复 PR，工程推进节奏较快。

---

## 2. 项目进展

今日共有 7 个 PR 关闭，重点如下。

### 2.1 Cowork 体验改进：展示 OpenClaw 进度卡片

- PR：[#2778 feat(cowork): show OpenClaw progress cards above the composer](https://github.com/netease-youdao/LobsterAI/pull/2778)
- 作者：fisherdaddy
- 涉及模块：`renderer`、`main`、`cowork`
- 状态：Closed

该 PR 解决了 OpenClaw Agent 使用 `progress_card` 工具时，Cowork 中只显示“使用了 progress_card”这类原始步骤，而没有真正展示计划内容的问题。  
改动后，Cowork 会在 composer 上方展示会话原生 progress card，使用户能够直接看到 Agent 的任务规划和执行进展。

**项目影响：**

- 提升多步骤 Agent 任务的透明度。
- 降低用户对“Agent 正在做什么”的不确定感。
- 与 OpenClaw 的工具调用语义更加一致。

---

### 2.2 Cowork 长任务降噪：仅保留最近五步

- PR：[#2777 feat(cowork): keep long running turns to their latest five steps](https://github.com/netease-youdao/LobsterAI/pull/2777)
- 作者：fisherdaddy
- 涉及模块：`renderer`、`cowork`
- 状态：Closed

该 PR 针对长时间运行的 Agent 回合进行 UI 降噪。此前，模型在数分钟内连续调用工具但不输出正文时，会在对话中渲染大量执行步骤。PR 描述中提到，一个 7 分钟的生成任务曾产生 94 行执行记录，包括大量重复的“深度思考”“运行了命令”和 process 轮询信息。

改动后，运行中的 turn 只保留最近五个步骤。

**项目影响：**

- 明显改善长任务场景下的对话可读性。
- 降低 DeepSeek 等模型长时间工具调用时的 UI 噪声。
- 与 #2778 结合后，Cowork 更倾向于展示高价值进度，而非底层调用流水账。

---

### 2.3 支持 PPT / Word / Excel 文档编辑

- PR：[#2776 feat: support ppt/word/excel document editing](https://github.com/netease-youdao/LobsterAI/pull/2776)
- 作者：fisherdaddy
- 涉及模块：`renderer`、`build`、`docs`、`main`、`openclaw`、`skills`、`artifacts`
- 状态：Closed

该 PR 涉及范围较广，覆盖渲染层、主进程、OpenClaw、Skills、Artifacts 与文档模块，目标是支持 PPT、Word、Excel 等办公文档编辑能力。

虽然摘要中未提供详细实现说明，但从模块范围看，这可能是 LobsterAI 向 **办公自动化 Agent** 和 **文档协作型个人 AI 助手** 演进的重要功能。

**项目影响：**

- 扩展 LobsterAI 的生产力场景。
- 将 Agent 能力从对话与工具调用进一步延伸到办公文档编辑。
- 可能为后续的幻灯片生成、报告修改、表格处理等能力打基础。

---

### 2.4 OpenClaw Gateway 启动逻辑修复：应用启动时只启动一次

- PR：[#2775 fix(openclaw): start the gateway once on app launch](https://github.com/netease-youdao/LobsterAI/pull/2775)
- 作者：fisherdaddy
- 涉及模块：`main`、`openclaw`、`cowork`
- 状态：Closed

该 PR 修复了应用启动时 OpenClaw Gateway 被启动三次的问题。根据 PR 描述，重复启动导致 Gateway 约需 80 秒才能稳定，并产生多个不可用窗口。

主要问题包括：

1. IM channel sync 在 MCP bridge 监听前就启动 Gateway，导致配置中缺失 bridge callback URL。
2. 后续同步又触发 Gateway 重启。

**项目影响：**

- 缩短应用启动后 OpenClaw 可用时间。
- 减少 Gateway 重启造成的不可用窗口。
- 提升 Cowork / OpenClaw 联动稳定性。

---

### 2.5 OpenClaw 一键修复超时与诊断增强

- PR：[#2774 fix(openclaw): improve repair timeout handling and diagnostics](https://github.com/netease-youdao/LobsterAI/pull/2774)
- 作者：btc69m979y-dotcom
- 涉及模块：`main`、`openclaw`
- 状态：Closed

该 PR 针对 OpenClaw CLI 加载较慢时，一键修复流程可能在原有 60 秒超时后被终止的问题进行了改进。  
新的修复逻辑引入基于 stdout / stderr 输出活动的有界等待机制，并保存命令退出诊断信息，方便定位后续失败。

关键变化包括：

- 修复命令至少等待 5 分钟。
- 有输出活动时可延长等待。
- 连续静默 5 分钟或单条命令累计 15 分钟时请求终止。
- 请求终止后继续等待进程关闭回调。
- 保存命令退出诊断信息。

**项目影响：**

- 降低慢环境下 OpenClaw 修复流程误失败概率。
- 提高一键修复的可靠性。
- 增强维护者排查 OpenClaw 安装、配置和旧路径问题的能力。

---

### 2.6 OpenClaw 旧会话目录恢复测试补齐

- PR：[#2773 test(openclaw): verify legacy session discovery recovery](https://github.com/netease-youdao/LobsterAI/pull/2773)
- 作者：btc69m979y-dotcom
- 涉及模块：`docs`、`main`、`openclaw`
- 状态：Closed

该 PR 补齐了旧会话目录判定修复后的数据保留回归测试和 Electron 实操验收记录。  
PR 描述中提到，该问题对应“9.23 反馈表第 2 行”，涉及 Doctor 返回成功、没有迁移目标时，宿主仍因纯中文 Agent 目录下的旧会话库而阻塞启动的问题。

**项目影响：**

- 为旧会话迁移 / 恢复路径增加回归保障。
- 说明维护者正在针对真实用户反馈补充测试闭环。
- 降低未来版本在历史数据兼容方面的回归风险。

---

### 2.7 OpenClaw 启动阻塞修复：跳过孤立的非 ASCII Agent 目录

- PR：[#2772 fix(openclaw): skip orphan non-ASCII agent dirs when counting legacy session stores](https://github.com/netease-youdao/LobsterAI/pull/2772)
- 作者：fisherdaddy
- 涉及模块：`main`、`openclaw`
- 状态：Closed

该 PR 修复了 OpenClaw 在统计 legacy session stores 时错误计入纯 CJK Agent 目录的问题。  
OpenClaw 会将纯中文 Agent 目录名归一化为 `main` 并在迁移时跳过，但 `listLegacySessionStorePaths` 仍然将这些目录计入，导致启动门禁持续认为存在未迁移的旧会话库，从而造成死锁。

**项目影响：**

- 修复特定语言环境下的启动阻塞问题。
- 改善中文用户使用 OpenClaw 时的兼容性。
- 与 #2773 形成“修复 + 测试验证”的闭环。

---

## 3. 社区热点

今日没有 Issue 更新，PR 的评论数和反应数均未提供有效数据，且各 PR 👍 数均为 0，因此无法从 GitHub 互动数据中识别明显的社区讨论热点。

不过从 PR 内容看，以下方向具有较强产品信号：

1. **OpenClaw 启动和修复稳定性**
   - [#2775](https://github.com/netease-youdao/LobsterAI/pull/2775)
   - [#2774](https://github.com/netease-youdao/LobsterAI/pull/2774)
   - [#2772](https://github.com/netease-youdao/LobsterAI/pull/2772)
   - [#2773](https://github.com/netease-youdao/LobsterAI/pull/2773)

   背后诉求是：用户希望 Agent Runtime 启动更快、修复更可靠、旧数据迁移不阻塞应用。

2. **长任务 Agent 的可解释性和 UI 可读性**
   - [#2778](https://github.com/netease-youdao/LobsterAI/pull/2778)
   - [#2777](https://github.com/netease-youdao/LobsterAI/pull/2777)

   背后诉求是：当 Agent 连续调用工具时，用户需要看到有意义的进度，而不是被大量低价值日志淹没。

3. **办公文档编辑能力**
   - [#2776](https://github.com/netease-youdao/LobsterAI/pull/2776)

   背后诉求是：个人 AI 助手不只是聊天，还需要能够直接处理 PPT、Word、Excel 等真实工作流资产。

---

## 4. Bug 与稳定性

按影响程度排序如下。

### 高严重度：OpenClaw Gateway 重复启动导致长时间不可用

- 修复 PR：[#2775](https://github.com/netease-youdao/LobsterAI/pull/2775)
- 状态：已有 fix PR，已关闭
- 影响：应用启动时 Gateway 被启动三次，约 80 秒后才稳定，并产生多个不可用窗口。
- 影响范围：OpenClaw、Cowork、主进程启动链路。
- 严重性判断：高。该问题直接影响应用启动后的可用性和用户首次交互体验。

---

### 高严重度：旧会话目录统计导致启动死锁

- 修复 PR：[#2772](https://github.com/netease-youdao/LobsterAI/pull/2772)
- 测试补充 PR：[#2773](https://github.com/netease-youdao/LobsterAI/pull/2773)
- 状态：已有 fix 与测试验证 PR，均已关闭
- 影响：纯中文 Agent 目录被错误计入 legacy session stores，导致启动门禁持续认为仍有未迁移旧数据，进而阻塞启动。
- 影响范围：OpenClaw 旧会话迁移、中文用户环境。
- 严重性判断：高。该问题会导致启动流程卡死，且与中文路径 / 中文 Agent 名称相关，对中文用户较敏感。

---

### 中严重度：OpenClaw 一键修复在慢环境下误超时

- 修复 PR：[#2774](https://github.com/netease-youdao/LobsterAI/pull/2774)
- 状态：已有 fix PR，已关闭
- 影响：OpenClaw CLI 加载较慢时，配置校验可能在 60 秒超时后被终止，导致后续修复无法执行。
- 影响范围：OpenClaw Doctor / Repair 流程。
- 严重性判断：中。不会必然影响所有用户，但对慢机器、慢磁盘、复杂环境下的用户会造成修复失败。

---

### 中低严重度：长任务执行日志刷屏影响可读性

- 优化 PR：[#2777](https://github.com/netease-youdao/LobsterAI/pull/2777)
- 状态：已有优化 PR，已关闭
- 影响：长时间工具调用任务会渲染大量重复步骤，降低会话可读性。
- 影响范围：Cowork UI、长任务 Agent 体验。
- 严重性判断：中低。主要是体验问题，但在 7 分钟、数十步工具调用场景下会显著影响使用感受。

---

## 5. 功能请求与路线图信号

今日没有新的 Issue，因此没有来自 GitHub Issue 的显式功能请求。  
但从 PR 方向可以推断出以下路线图信号。

### 5.1 办公文档编辑能力可能进入近期版本重点

- 相关 PR：[#2776](https://github.com/netease-youdao/LobsterAI/pull/2776)

支持 PPT / Word / Excel 编辑是一个明显的能力扩展信号。该能力横跨多个模块，说明它不是单点 UI 优化，而更可能是围绕 Artifacts、Skills 和 OpenClaw 的系统性能力建设。

**可能进入下一版本的方向：**

- PPT 编辑与生成
- Word 文档修改
- Excel 表格处理
- 文档类 Artifact 的读写与预览
- Agent 调用文档工具链完成办公任务

---

### 5.2 Agent 进度可视化和长任务体验将继续增强

- 相关 PR：
  - [#2778](https://github.com/netease-youdao/LobsterAI/pull/2778)
  - [#2777](https://github.com/netease-youdao/LobsterAI/pull/2777)

这两个 PR 表明维护者正在将底层工具调用转化为更适合用户理解的任务进度表达。  
后续可能继续推进：

- 更结构化的任务计划展示
- 多步骤任务状态管理
- 长任务折叠 / 展开
- Agent 执行日志与用户可见进度的分层展示

---

### 5.3 OpenClaw 运行时稳定性仍是短期优先级

- 相关 PR：
  - [#2775](https://github.com/netease-youdao/LobsterAI/pull/2775)
  - [#2774](https://github.com/netease-youdao/LobsterAI/pull/2774)
  - [#2772](https://github.com/netease-youdao/LobsterAI/pull/2772)
  - [#2773](https://github.com/netease-youdao/LobsterAI/pull/2773)

今日 7 个 PR 中有 4 个直接围绕 OpenClaw 稳定性，说明 OpenClaw 作为 LobsterAI 的关键执行底座，仍处于快速修复和兼容性增强阶段。

---

## 6. 用户反馈摘要

今日 GitHub Issues 无新增或更新，因此缺少直接来自 Issue 评论的用户反馈。  
不过部分 PR 明确反映了真实使用痛点：

1. **长任务输出过多，影响理解**
   - 相关 PR：[#2777](https://github.com/netease-youdao/LobsterAI/pull/2777)
   - 场景：模型长时间调用工具但不直接输出正文。
   - 痛点：用户看到大量重复执行记录，不容易判断任务是否正常推进。

2. **Agent 计划不可见**
   - 相关 PR：[#2778](https://github.com/netease-youdao/LobsterAI/pull/2778)
   - 场景：OpenClaw 使用 `progress_card` 维护计划。
   - 痛点：Cowork 只显示原始工具调用提示，用户无法看到真正的任务计划。

3. **OpenClaw 启动慢或不可用窗口过长**
   - 相关 PR：[#2775](https://github.com/netease-youdao/LobsterAI/pull/2775)
   - 场景：应用启动后 Gateway 多次重启。
   - 痛点：用户打开应用后不能稳定使用 Agent 能力。

4. **中文 Agent 目录和旧会话迁移造成启动阻塞**
   - 相关 PR：
     - [#2772](https://github.com/netease-youdao/LobsterAI/pull/2772)
     - [#2773](https://github.com/netease-youdao/LobsterAI/pull/2773)
   - 场景：纯中文 Agent 目录、旧会话库迁移。
   - 痛点：Doctor 返回成功但宿主仍无法正常启动，用户难以自行判断原因。

---

## 7. 待处理积压

基于今日提供的数据：

- 过去 24 小时 Issue 更新：0
- 待合并 PR：0
- 已合并 / 关闭 PR：7
- 新版本发布：0

因此，今日数据中没有暴露出明确的长期未响应 Issue 或悬而未决 PR。  
不过建议维护者继续关注以下潜在积压方向：

1. **OpenClaw 旧数据迁移链路**
   - 相关 PR：[#2772](https://github.com/netease-youdao/LobsterAI/pull/2772)、[#2773](https://github.com/netease-youdao/LobsterAI/pull/2773)
   - 建议：继续补充不同语言路径、历史版本目录、异常迁移状态的测试样例。

2. **OpenClaw 修复流程诊断体验**
   - 相关 PR：[#2774](https://github.com/netease-youdao/LobsterAI/pull/2774)
   - 建议：将诊断信息更清晰地暴露给用户或导出到日志，减少支持成本。

3. **文档编辑功能的用户验证**
   - 相关 PR：[#2776](https://github.com/netease-youdao/LobsterAI/pull/2776)
   - 建议：如果该能力进入下一版本，应补充文档格式兼容性、权限、保存失败、版本回滚等测试说明。

4. **Cowork 长任务状态展示**
   - 相关 PR：[#2777](https://github.com/netease-youdao/LobsterAI/pull/2777)、[#2778](https://github.com/netease-youdao/LobsterAI/pull/2778)
   - 建议：进一步区分“用户可读进度”和“调试日志”，避免未来复杂 Agent 任务再次造成 UI 噪声。

---

## 总体健康度评估

LobsterAI 今日没有社区 Issue 活动，但核心开发推进明显，尤其是 OpenClaw 稳定性修复密集。  
7 个 PR 全部关闭，说明维护节奏较快，短期内项目处于 **功能扩展与稳定性修复并行推进** 状态。  
从健康度看，项目工程活跃度良好；但 Issue 互动数据不足，外部社区反馈活跃度暂时偏低。  
建议下一步重点关注：OpenClaw 启动可靠性验证、文档编辑能力的真实用户测试，以及 Cowork 长任务体验的持续打磨。

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

# CoPaw 项目动态日报｜2026-09-29

> 数据范围：过去 24 小时 GitHub Issues / Pull Requests / Releases  
> 今日概览：Issues 更新 4 条，PR 更新 12 条，新版本发布 0 个

---

## 1. 今日速览

过去 24 小时 CoPaw 项目保持较高活跃度：共有 4 个 Issue 更新、12 个 PR 更新，其中 7 个 PR 仍在等待合并，5 个 PR 已合并或关闭。今日工作重心明显集中在 **Console 体验优化、跨平台稳定性、消息通道可靠性、任务调度与大媒体/大技能处理** 等方向。

从健康度看，项目维护节奏较快，多个用户报告的 Bug 已在同日出现对应修复 PR，例如 Telegram 格式化问题对应 [#8012](https://github.com/agentscope-ai/CoPaw/pull/8012)，超大图片导致会话永久不可用对应 [#8010](https://github.com/agentscope-ai/CoPaw/pull/8010)。不过，部分涉及生产环境可用性的稳定性问题仍处于待合并状态，尤其是 Windows 沙箱 ACL、任务追踪器注册时序、大文件技能下载超时等问题，建议维护者优先审查。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日有 5 个 PR 处于已合并或关闭状态，主要推进了 Console 交互体验、依赖版本、QQ 通道可靠性和模型发现诊断能力。

### 3.1 Console 体验与 UI 一致性改进

- [#8005 feat(console): unify interface font scaling](https://github.com/agentscope-ai/CoPaw/pull/8005)  
  统一了 Console 内的字体缩放机制，支持 12px 到 20px 的界面字号设置，并引入语义化 token 管理字体、图标和控件尺寸。  
  影响范围包括侧边栏、设置中心、聊天区、文件工作区、MCP、Channels、Skills、Tools 等多个模块。  
  **项目推进意义**：提升桌面端和 Web Console 的可访问性与一致性，对长期使用体验有明显改善。

- [#8016 fix(console): stabilize modal and tool config transitions](https://github.com/agentscope-ai/CoPaw/pull/8016)  
  稳定了 Ant Design overlay、Modal 内容和工具配置切换时的动画行为，减少进入/退出过渡导致的闪烁或错位。  
  **项目推进意义**：改善设置、工具配置等高频交互中的视觉稳定性。

### 3.2 消息通道可靠性增强

- [#8006 fix(qq): drop replayed gateway events by id and sequence](https://github.com/agentscope-ai/CoPaw/pull/8006)  
  修复 QQ 网关在 session resume 后重复投递事件的问题，通过事件 ID 和 sequence 去重，避免同一事件被重复处理。  
  该问题可能导致智能体重复执行命令、重复写入/删除、重复确认工具调用。  
  **项目推进意义**：这是一个重要的通道稳定性修复，降低非幂等操作被重复执行的风险。

### 3.3 模型发现可观测性提升

- [#8014 fix: include provider and error details in model discovery warnings](https://github.com/agentscope-ai/CoPaw/pull/8014)  
  在模型发现 fallback warning 中加入 provider ID 和脱敏后的失败原因，使并发 provider 失败更容易定位。  
  同时补充了凭据脱敏和日志注入防护测试。  
  **项目推进意义**：增强排障能力，尤其适合多模型、多供应商配置场景。

### 3.4 依赖更新

- [#8008 chore(deps): bumping version of agentscope to 2.0.9](https://github.com/agentscope-ai/CoPaw/pull/8008)  
  将 agentscope 依赖升级至 2.0.9。  
  **项目推进意义**：保持底层 AgentScope 依赖更新，但从摘要看未明确说明兼容性变化，建议发布时补充变更影响说明。

---

## 4. 社区热点

今日所有新增 Issue 的评论数均为 1，反应数均为 0，尚未出现明显的高热度讨论。但从问题类型看，以下议题代表了较强的用户需求信号。

### 4.1 内网 / 离线部署能力：自定义 Skill / Plugin 市场源

- [#8015 [Feature]: 支持配置自定义 Skill / Plugin 市场源](https://github.com/agentscope-ai/CoPaw/issues/8015)  
  用户希望 Skill 和 Plugin marketplace 支持一等配置能力，可启用、禁用或指向自托管镜像，以满足内网、离线、air-gapped 环境部署需求。

**背后诉求分析：**

- 企业用户无法访问公共市场源；
- 需要私有插件与技能分发；
- 需要在不 patch CoPaw/QwenPaw 代码的情况下完成私有化部署；
- 这类需求通常意味着项目正在进入更多企业或受限网络环境。

### 4.2 大技能分发与安装可靠性

- [#8013 [Bug]: 大技能下载到智能体时 30 秒超时](https://github.com/agentscope-ai/CoPaw/issues/8013)  
  用户在 Console「技能池 → 广播/下载到智能体」中下载大型技能 `ppt-master` 时，前端约 30 秒后报错：  
  `Request timeout after 30000ms: POST /skills/pool/download`  
  后端仍在执行复制，但最终技能无法落到目标工作区。

**背后诉求分析：**

- Skill 生态正在出现体积较大、文件数较多的复杂技能；
- 现有同步请求 + 前端硬超时机制无法支撑大技能安装；
- 用户需要任务化、可追踪、可恢复的技能分发流程。

### 4.3 会话上下文中异常媒体导致永久失败

- [#8009 Oversized image stored in context makes a session permanently unusable](https://github.com/agentscope-ai/CoPaw/issues/8009)  
  用户反馈超大图片被 provider 拒绝后，该媒体块仍保留在上下文中，导致之后同一会话的纯文本消息也持续失败。

对应修复 PR：

- [#8010 fix(agents): recover from media payload rejections instead of failing](https://github.com/agentscope-ai/CoPaw/pull/8010)

**背后诉求分析：**

- 用户期望一次 provider 拒绝不应污染整个会话；
- 多模态上下文需要具备自动恢复、剔除非法媒体块或降级能力；
- 这属于严重影响会话连续性的稳定性问题。

### 4.4 Telegram Markdown / HTML 格式兼容性

- [#8011 Telegram HTML formatter mishandles c++/objective-c info strings, ~~~ fences and nested fences](https://github.com/agentscope-ai/CoPaw/issues/8011)  
  Telegram HTML formatter 对 `c++`、`objective-c`、`~~~` fence 和 nested fence 处理不正确。

对应修复 PR：

- [#8012 fix(telegram): render every fenced code block as code in HTML](https://github.com/agentscope-ai/CoPaw/pull/8012)

**背后诉求分析：**

- 用户正在通过 Telegram 通道接收较复杂的模型输出；
- 代码块渲染准确性会直接影响开发者类用户体验；
- 通道适配层需要更强的 Markdown 兼容性和容错能力。

---

## 5. Bug 与稳定性

按影响程度排序如下。

### 高严重度

#### 5.1 超大图片进入上下文后导致会话永久不可用

- Issue：[ #8009 Oversized image stored in context makes a session permanently unusable](https://github.com/agentscope-ai/CoPaw/issues/8009)  
- Fix PR：[ #8010 fix(agents): recover from media payload rejections instead of failing](https://github.com/agentscope-ai/CoPaw/pull/8010)  
- 状态：Issue Open，Fix PR Open

**影响：**

一旦 provider 拒绝超规格图片，该图片仍保存在会话上下文中，后续请求会不断重放问题 payload，导致整个会话持续失败。

**建议优先级：P0 / P1**

这是典型的“单次异常污染长期状态”问题，建议优先合并并补充回归测试，覆盖：

- oversized image；
- provider 400；
- 后续纯文本消息恢复；
- 多 provider 行为差异。

---

#### 5.2 Windows 沙箱 ACL 可能错误写入卷根目录

- PR：[ #8018 fix(sandbox): never write a sandbox ACE on a volume root](https://github.com/agentscope-ai/CoPaw/pull/8018)  
- 状态：Open

**影响：**

Windows 下 sandbox ACL 具有继承性，如果在 volume root 上写入 sandbox ACE，可能向现有子目录传播，造成权限污染。

**建议优先级：P0 / P1**

该问题涉及文件系统权限边界，潜在影响范围较大，建议优先审查并确认：

- 是否覆盖所有 volume root 场景；
- 是否处理挂载路径、工作区路径、deny path；
- 是否有权限回滚或迁移说明。

---

#### 5.3 大技能下载到智能体时前端 30 秒硬超时，最终无法完成安装

- Issue：[ #8013 [Bug]: 大技能下载到智能体超时](https://github.com/agentscope-ai/CoPaw/issues/8013)  
- 状态：Open，暂无对应 Fix PR

**影响：**

大型技能 `ppt-master` 包含 12,994 个文件，解压后 80.1 MB。前端 30 秒 AbortController 超时后，后端仍在复制，但技能最终无法落到目标工作区。

**建议优先级：P1**

建议将此类操作改造为异步任务：

- 后端返回 task id；
- 前端轮询或订阅进度；
- 支持取消、重试和失败清理；
- 避免请求超时与后端状态不一致。

---

### 中严重度

#### 5.4 Telegram HTML formatter 对复杂代码块渲染错误

- Issue：[ #8011 Telegram HTML formatter mishandles c++/objective-c info strings, ~~~ fences and nested fences](https://github.com/agentscope-ai/CoPaw/issues/8011)  
- Fix PR：[ #8012 fix(telegram): render every fenced code block as code in HTML](https://github.com/agentscope-ai/CoPaw/pull/8012)  
- 状态：Issue Open，Fix PR Open

**影响：**

模型输出中的代码块可能被错误渲染，尤其是：

- `c++`
- `objective-c`
- `~~~` fences
- nested fences

**建议优先级：P2**

该问题对开发者用户和 Telegram 通道用户影响较明显。已有修复 PR，建议尽快 review。

---

#### 5.5 TaskTracker 注册时序问题可能留下错误状态

- PR：[ #8007 fix(task_tracker): register run only after the producer task exists](https://github.com/agentscope-ai/CoPaw/pull/8007)  
- 状态：Open，带有 `Under Review`、`ready-for-human-review`

**影响：**

`attach_or_start` 在 producer task 创建前注册 run，如果 task 创建失败，可能留下没有真实 producer 的占位 Future，影响任务状态管理。

**建议优先级：P1 / P2**

该问题影响任务调度可靠性，建议优先完成 review。

---

### 低到中严重度

#### 5.6 Console 聊天图标尺寸和项目标签截断问题

- PR：[ #8019 fix(console): restore chat icons and truncate project labels](https://github.com/agentscope-ai/CoPaw/pull/8019)  
- 状态：Open

**影响：**

修复聊天输入区 SVG 图标尺寸基线，并处理项目标签过长显示问题。

**建议优先级：P3**

属于体验修复，适合随下一批 Console polish PR 合并。

---

#### 5.7 CLI 启动路径存在不必要的 eager import

- PR：[ #8004 perf(cli): lazy-import init_cmd in app_cmd startup path](https://github.com/agentscope-ai/CoPaw/pull/8004)  
- 状态：Open

**影响：**

`app_cmd` 启动路径会提前导入 `init_cmd` 及其依赖链，带来约 5 秒 warm-cache import time。

**建议优先级：P2 / P3**

对 CLI 冷启动和开发者体验有改善价值，风险相对可控。

---

## 6. 功能请求与路线图信号

### 6.1 自定义 Skill / Plugin 市场源可能成为企业部署方向的重要需求

- Issue：[ #8015 [Feature]: 支持配置自定义 Skill / Plugin 市场源](https://github.com/agentscope-ai/CoPaw/issues/8015)

该需求指向明确的企业级部署场景：

- 内网部署；
- 离线部署；
- 自托管 marketplace；
- 禁用公共源；
- 使用私有技能 / 插件仓库。

**路线图信号：强**

如果 CoPaw 正在扩展企业用户或私有化部署用户，该能力很可能进入后续版本规划。建议设计时考虑：

- marketplace source 配置格式；
- 多源优先级；
- 源可用性检测；
- 离线索引缓存；
- 签名校验；
- 插件/技能版本兼容性；
- Console UI 管理入口；
- CLI 配置与环境变量覆盖。

---

### 6.2 大技能安装需要任务化和可观测化

- Issue：[ #8013](https://github.com/agentscope-ai/CoPaw/issues/8013)

虽然这是 Bug，但它暴露出 Skill 生态规模增长后的架构需求。简单的同步 HTTP 请求已无法支撑大型技能分发。

**路线图信号：中到强**

建议后续纳入：

- skill install task；
- download/copy progress；
- resumable install；
- install transaction；
- failed cleanup；
- workspace-level lock；
- UI 进度条和日志。

---

### 6.3 Console 体验持续打磨，说明桌面端/控制台是近期重点

相关 PR：

- [#8005 unify interface font scaling](https://github.com/agentscope-ai/CoPaw/pull/8005)
- [#8016 stabilize modal and tool config transitions](https://github.com/agentscope-ai/CoPaw/pull/8016)
- [#8017 polish model settings and navigation interactions](https://github.com/agentscope-ai/CoPaw/pull/8017)
- [#8019 restore chat icons and truncate project labels](https://github.com/agentscope-ai/CoPaw/pull/8019)

**路线图信号：强**

Console 正在向更成熟的产品化界面演进，关注点包括：

- 字体缩放；
- 图标尺寸；
- 设置页交互；
- 导航折叠；
- Modal 过渡；
- 项目标签显示。

---

### 6.4 多通道可靠性仍是项目重点

相关 PR / Issue：

- [#8006 QQ gateway event dedup](https://github.com/agentscope-ai/CoPaw/pull/8006)
- [#8011 Telegram formatter issue](https://github.com/agentscope-ai/CoPaw/issues/8011)
- [#8012 Telegram formatter fix](https://github.com/agentscope-ai/CoPaw/pull/8012)

**路线图信号：中**

QQ、Telegram 等通道正在持续修复边界问题，说明 CoPaw 的真实使用场景已经覆盖多个消息平台。后续可考虑：

- 通道适配统一测试套件；
- Markdown 渲染兼容基准；
- 消息去重通用机制；
- 通道级幂等保护；
- 工具调用卡片防重复确认。

---

## 7. 用户反馈摘要

### 7.1 企业/内网用户希望减少源码 patch

来自 [#8015](https://github.com/agentscope-ai/CoPaw/issues/8015) 的反馈显示，用户希望通过配置方式切换 Skill / Plugin marketplace，而不是修改源码。这说明当前 marketplace 机制对私有化部署不够友好。

**用户痛点：**

- 公共源无法访问；
- 离线环境无法使用官方市场；
- 内网环境需要镜像源；
- patch 源码提高维护成本。

---

### 7.2 大型技能分发体验不稳定

来自 [#8013](https://github.com/agentscope-ai/CoPaw/issues/8013) 的反馈显示，用户正在使用体积较大的技能包，并希望将其广播或下载到智能体工作区。

**用户痛点：**

- 前端 30 秒超时；
- 后端仍在执行但最终结果失败；
- 用户无法判断操作是否仍在进行；
- 缺少进度、任务状态、失败恢复机制。

---

### 7.3 多模态会话的错误恢复能力不足

来自 [#8009](https://github.com/agentscope-ai/CoPaw/issues/8009) 的反馈表明，用户在生成报告并发送图片时，因为图片尺寸超过 provider 限制，导致整个会话永久失败。

**用户痛点：**

- 单次媒体错误影响后续所有对话；
- 纯文本消息也无法恢复；
- 用户可能只能新建会话绕过；
- 会话上下文缺少自动清理或降级逻辑。

---

### 7.4 开发者通道用户关注代码块渲染准确性

来自 [#8011](https://github.com/agentscope-ai/CoPaw/issues/8011) 的反馈显示，Telegram 通道中的 Markdown 到 HTML 转换对复杂代码块支持不足。

**用户痛点：**

- `c++` 被错误识别；
- `objective-c` 等带符号语言标识处理不正确；
- nested fences、`~~~` fences 兼容性不足；
- 影响代码阅读和复制使用。

---

## 8. 待处理积压

从今日数据看，未发现长期无人响应的陈旧 Issue 或 PR；所有列出的 Issue / PR 均为 2026-09-28 至 2026-09-29 创建或更新，整体响应速度较快。

但以下 Open PR / Issue 建议维护者优先关注，以避免稳定性风险扩大。

### 高优先级待处理

1. [#8018 fix(sandbox): never write a sandbox ACE on a volume root](https://github.com/agentscope-ai/CoPaw/pull/8018)  
   Windows ACL 权限边界问题，建议优先 review。

2. [#8010 fix(agents): recover from media payload rejections instead of failing](https://github.com/agentscope-ai/CoPaw/pull/8010)  
   修复 [#8009](https://github.com/agentscope-ai/CoPaw/issues/8009)，避免异常媒体污染会话上下文。

3. [#8013 大技能下载超时问题](https://github.com/agentscope-ai/CoPaw/issues/8013)  
   暂无对应修复 PR，建议尽快分派 owner。

4. [#8007 fix(task_tracker): register run only after the producer task exists](https://github.com/agentscope-ai/CoPaw/pull/8007)  
   已进入 review 状态，建议尽快完成审查。

### 中优先级待处理

5. [#8012 fix(telegram): render every fenced code block as code in HTML](https://github.com/agentscope-ai/CoPaw/pull/8012)  
   修复 [#8011](https://github.com/agentscope-ai/CoPaw/issues/8011)，建议合并前补充多语言代码块测试。

6. [#8015 自定义 Skill / Plugin 市场源](https://github.com/agentscope-ai/CoPaw/issues/8015)  
   企业部署需求明显，建议标记为 roadmap / enhancement 并讨论配置设计。

7. [#8004 perf(cli): lazy-import init_cmd in app_cmd startup path](https://github.com/agentscope-ai/CoPaw/pull/8004)  
   CLI 启动性能优化，适合在风险评估后合并。

8. [#8017 feat(console): polish model settings and navigation interactions](https://github.com/agentscope-ai/CoPaw/pull/8017)  
   Console 设置页和导航交互优化，已有格式化和 Vitest 验证。

9. [#8019 fix(console): restore chat icons and truncate project labels](https://github.com/agentscope-ai/CoPaw/pull/8019)  
   UI 细节修复，可与其他 Console polish 合并发布。

---

## 今日健康度评估

- **活跃度：高**  
  24 小时内 16 条 Issue/PR 更新，社区与维护者均较活跃。

- **稳定性风险：中到高**  
  多个问题涉及会话持久失败、Windows 权限、任务状态、大文件操作，建议优先处理稳定性 PR。

- **产品成熟度：持续提升**  
  Console 字体缩放、Modal 动画、模型设置、导航交互等优化显示项目正在从功能实现走向产品化打磨。

- **社区信号：企业化与多通道使用增强**  
  自托管 marketplace、大技能分发、QQ/Telegram 通道稳定性、多模态上下文恢复，均表明 CoPaw 正被用于更复杂、更真实的生产或准生产场景。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报｜2026-09-29

## 1. 今日速览

过去 24 小时内，ZeptoClaw 有 **2 条 Issue 更新**、**1 条 PR 更新**，暂无新版本发布，整体活跃度属于 **低到中等活跃**。  
今日动态主要集中在 **工具输出处理能力** 与 **Agent 任务执行模式** 两个方向：前者已有对应实现 PR，后者来自用户对长期目标驱动执行能力的询问。  
从维护节奏看，核心维护者正在主动推动工具链稳定性与可恢复性改进，说明项目仍处于持续迭代状态。  
社区侧讨论量不高，新增 Issue 均无评论，说明当前还未形成高强度讨论，但功能诉求较明确。

---

## 3. 项目进展

### 待合并 PR：工具超大输出持久化，避免上下文截断后数据丢失

- PR：[#708 feat(tools): spill oversized tool output instead of discarding it](https://github.com/qhkm/zeptoclaw/pull/708)
- 状态：OPEN
- 作者：qhkm
- 创建时间：2026-09-28

该 PR 解决了工具输出超过预算后被直接截断并丢弃的问题。此前，当 `shell`、`grep`、`filesystem`、`find` 等工具产生超过限制的输出时，模型只能看到“部分内容被省略”的提示，但无法再访问被丢弃的数据。

PR #708 的核心改动是：

- 将超预算工具输出写入本地 spill 文件：
  - 路径类似：`~/.zeptoclaw/sessions/<key>/spill/<seq>-<tool>.txt`
- 使用更安全的权限：
  - spill 目录权限为 `0700`
  - 文件权限为 `0600`
- 在上下文中保留：
  - 输出预览
  - spill 文件路径
  - 可用于后续读取的提示信息

这项改动对 Agent 类项目非常关键，因为它提升了模型在处理大型日志、搜索结果、编译输出、测试报告时的可恢复性。虽然今日没有合并 PR，但该 PR 与 Issue #707 直接对应，属于明确的功能推进，若合并，将显著改善工具调用的可靠性。

---

## 4. 社区热点

今日没有高评论量或高反应数的 Issue / PR。所有新增 Issue 和 PR 当前评论数均为 0，反应数也为 0。尽管如此，以下两个话题代表了今日最值得关注的社区信号。

### 4.1 目标驱动执行模式诉求

- Issue：[#709 is there a goal mode?](https://github.com/qhkm/zeptoclaw/issues/709)
- 状态：OPEN
- 作者：abda11ah
- 评论数：0
- 反应数：0

用户询问 ZeptoClaw 是否支持类似 ohmypi / omp 中的 `/goal` 模式，即 Agent 可以持续工作，直到某个条件被满足。

这反映出用户对 ZeptoClaw 的期待已经不止于单轮工具调用或交互式问答，而是希望其具备更强的 **自主任务执行能力**。典型使用场景可能包括：

- 持续修复测试，直到测试通过
- 持续搜索和修改代码，直到实现目标功能
- 自动执行多步任务，并在完成条件满足后停止
- 类似“给定目标，Agent 自主规划、执行、验证”的工作流

该需求如果被采纳，可能会影响 ZeptoClaw 的任务循环、停止条件、状态管理、工具调用预算与安全控制设计。

### 4.2 大型工具输出不应被不可恢复地丢弃

- Issue：[#707 feat(tools): spill oversized tool output instead of discarding it](https://github.com/qhkm/zeptoclaw/issues/707)
- PR：[#708 feat(tools): spill oversized tool output instead of discarding it](https://github.com/qhkm/zeptoclaw/pull/708)
- 状态：Issue OPEN，PR OPEN
- 作者：qhkm

该议题由维护者提出并快速提交了实现 PR，说明这是项目当前维护者认为优先级较高的工程问题。Issue 标签中包含 `P2-high`，表明它虽然可能不是最高级别阻塞问题，但对用户体验和 Agent 可靠性有明显影响。

背后的核心诉求是：  
当 Agent 处理大型输出时，不能简单丢弃上下文外的数据，而应提供一种可追溯、可再次读取的机制。

这对于 AI 编程助手尤其重要，因为大型输出通常来自：

- 编译错误
- 测试失败日志
- `grep` / `find` 搜索结果
- 大文件读取
- 长命令输出
- 复杂仓库分析结果

如果缺失信息不可恢复，Agent 可能会误判、重复执行命令，甚至无法定位问题。

---

## 5. Bug 与稳定性

今日没有明确的新 Bug、崩溃或回归报告。  
但有一个与稳定性和可恢复性密切相关的工程改进正在推进。

### P2-high：超大工具输出被截断并丢弃，导致模型无法恢复缺失信息

- Issue：[#707 feat(tools): spill oversized tool output instead of discarding it](https://github.com/qhkm/zeptoclaw/issues/707)
- Fix PR：[#708 feat(tools): spill oversized tool output instead of discarding it](https://github.com/qhkm/zeptoclaw/pull/708)
- 严重程度：中高
- 当前状态：Issue OPEN，Fix PR OPEN

问题描述：  
当前 `src/tools/output.rs::truncate_tool_output` 会对超过 2,000 行或 50KB 的工具输出进行截断，且被截断部分会被直接丢弃。调用该逻辑的工具包括 `shell`、`grep`、`filesystem`、`find` 等。

影响分析：

- 模型无法访问被截断内容
- 长日志分析能力下降
- 搜索结果可能不完整
- Agent 可能重复执行命令以尝试找回信息
- 对调试、测试修复、仓库理解等任务不利

已有修复方向：  
PR #708 将超大输出 spill 到会话目录，并在上下文中提供文件路径和预览。这是较合理的稳定性改进，兼顾了上下文窗口控制与信息可恢复性。

---

## 6. 功能请求与路线图信号

### 6.1 可能进入短期版本：工具输出 spill 机制

- Issue：[#707](https://github.com/qhkm/zeptoclaw/issues/707)
- PR：[#708](https://github.com/qhkm/zeptoclaw/pull/708)

该功能已有实现 PR，且由维护者本人提出与开发，因此进入下一版本的概率较高。  
它更像是底层工具系统能力增强，可能不会改变用户命令界面，但会显著提升 Agent 处理复杂任务时的稳定性。

潜在路线图意义：

- ZeptoClaw 正在加强长输出处理能力
- 项目重视上下文预算与信息保真之间的平衡
- 后续可能出现更多围绕 session、本地状态、可恢复工具调用的功能

### 6.2 新增需求：Goal Mode / 目标模式

- Issue：[#709 is there a goal mode?](https://github.com/qhkm/zeptoclaw/issues/709)

用户询问是否存在类似 `/goal` 的模式，让 Agent 持续工作直到条件满足。  
目前该 Issue 还没有维护者回复，也没有关联 PR，因此短期内是否进入路线图尚不明确。

该需求可能涉及以下设计点：

- 目标声明语法，例如 `/goal fix failing tests`
- 终止条件判断
- 多轮自动执行循环
- 中间状态记录
- 工具调用次数或时间预算
- 用户确认机制
- 安全边界与防失控机制
- 成功/失败判定逻辑

如果 ZeptoClaw 希望向更自主的 Coding Agent 或 Personal Agent 方向发展，这类能力将非常关键。

---

## 7. 用户反馈摘要

今日用户反馈主要来自 Issue #709，虽然没有后续评论，但诉求很明确。

### 用户痛点：希望 Agent 能持续执行直到目标完成

- 来源：[#709](https://github.com/qhkm/zeptoclaw/issues/709)

用户提到 ohmypi / omp 的 `/goal` 模式，说明其期望 ZeptoClaw 能从“响应式助手”进一步演进为“目标驱动型 Agent”。

可提炼出的真实需求包括：

- 不想反复手动提示 Agent 下一步
- 希望给出一个目标后，Agent 能自动规划和推进
- 希望任务有明确完成条件
- 希望 Agent 能持续尝试，直到满足条件而不是中途停止

这类反馈通常来自较深度用户，说明他们已经在实际任务中感受到单轮或短循环交互的限制。

### 维护者关注点：避免工具输出数据不可逆丢失

- 来源：[#707](https://github.com/qhkm/zeptoclaw/issues/707)、[#708](https://github.com/qhkm/zeptoclaw/pull/708)

虽然这不是普通用户提出的反馈，但它反映了维护者对 Agent 工程可靠性的关注。  
大型输出被截断的问题在 AI 编程助手中非常常见，处理不好会直接影响用户对 Agent 的信任。

该改动体现的产品方向是：

- 更好地处理真实工程项目中的大规模输出
- 降低上下文窗口限制带来的信息损失
- 让 Agent 在复杂任务中具备更强的连续性

---

## 8. 待处理积压

根据今日提供的数据，没有出现长期未响应的重要 Issue 或 PR 信息，因此无法判断是否存在历史积压风险。  
当前值得维护者优先关注的未处理事项如下：

### 高优先级待处理

1. **审查并合并工具输出 spill PR**
   - PR：[#708](https://github.com/qhkm/zeptoclaw/pull/708)
   - 关联 Issue：[#707](https://github.com/qhkm/zeptoclaw/issues/707)
   - 建议关注点：
     - spill 文件生命周期管理
     - session 清理策略
     - 路径暴露是否安全
     - 大文件读取体验
     - 跨平台兼容性
     - 多工具并发写入时的序号冲突问题

2. **回应 Goal Mode 需求**
   - Issue：[#709](https://github.com/qhkm/zeptoclaw/issues/709)
   - 建议处理方式：
     - 说明当前是否已有类似能力
     - 如果没有，可标记为 feature request
     - 讨论是否需要 `/goal` 命令或等价机制
     - 明确是否在路线图内

---

## 项目健康度判断

ZeptoClaw 今日没有版本发布，也没有已合并 PR，因此从交付结果看活跃度不高。  
但维护者主动提交了针对核心工具链可靠性的 PR，说明项目仍在进行有质量的底层改进。  
社区侧新增了面向 Agent 自主性的功能询问，表明用户正在期待更高阶的个人 AI 助手能力。  
总体来看，项目当前处于 **稳步维护、低噪声迭代、功能方向逐渐向更强 Agent 化能力靠拢** 的状态。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报（2026-09-29）

## 1. 今日速览

过去 24 小时，ZeroClaw 活跃度较高：共有 **3 条 Issue 更新**、**19 条 PR 更新**，但 **无 PR 合并/关闭**、**无新版本发布**。今日工作重心明显集中在 **安全边界、配置迁移、内存后端、工具调用兼容性、运行时稳定性与插件 TLS** 等基础能力上。  
从 PR 结构看，维护者正在集中处理多个“潜在数据泄露 / 权限绕过 / 配置误迁移 / 后端兼容性”问题，项目处于 **高修复密度、低发布节奏** 的阶段。  
健康度总体良好：问题响应较快，多个新报 Bug 已有对应修复 PR；但当前有 19 个待合并 PR，短期内需要维护者加强评审与合并节奏，避免安全和稳定性修复堆积。

---

## 2. 版本发布

今日 **无新版本发布**。  
最新 Releases 数据为空，因此暂无可记录的版本更新、破坏性变更或迁移说明。

---

## 3. 项目进展

今日 **没有已合并或已关闭的 PR**，因此主分支尚未实际接收新的功能或修复。不过，多个待合并 PR 已经形成清晰的推进方向，主要集中在以下领域：

### 安全与权限边界强化

- [PR #11228](https://github.com/zeroclaw-labs/zeroclaw/pull/11228) `fix(plugins): harden named TLS profile materialization`  
  加固插件命名 TLS profile 的 materialization 逻辑，要求授权必须来自同一 store admission issuance，防止跨作用域或伪造授权影响 TLS 根证书与客户端配置。

- [PR #11223](https://github.com/zeroclaw-labs/zeroclaw/pull/11223) `test(security): ratchet authority effects behind the recheck`  
  增加安全测试，确保 authority effects 在重新检查之后才生效。该 PR 依赖 [#11205](https://github.com/zeroclaw-labs/zeroclaw/pull/11205)，当前更偏向安全回归测试补强。

- [PR #11220](https://github.com/zeroclaw-labs/zeroclaw/pull/11220) `fix(security): require tools:execute to run or approve SOPs over RPC`  
  修复 RPC 运行或审批 SOP 时权限检查不足的问题，要求具备 `tools:execute` 权限，降低非管理员或受限主体越权执行 SOP 的风险。

- [PR #11222](https://github.com/zeroclaw-labs/zeroclaw/pull/11222) `fix(rpc): keep session environment immutable`  
  将会话转发的客户端环境固定为 session 生命周期内不可变，避免代理、ShellTool、RpcSession 之间出现环境被动态替换或污染的问题。

### 配置迁移与兼容性

- [PR #11218](https://github.com/zeroclaw-labs/zeroclaw/pull/11218) `fix(config): migrate retired keys at schema V4 and warn on a missing schema_version`  
  推进配置 Schema V4 迁移，处理废弃配置键，并在缺失 `schema_version` 时发出告警。该 PR 继承了早期 [#8754](https://github.com/zeroclaw-labs/zeroclaw/pull/8754) 的思路。

- [PR #11217](https://github.com/zeroclaw-labs/zeroclaw/pull/11217) `fix(config): stop migrating current-format configs that omit schema_version`  
  修复缺失 `schema_version` 的当前格式配置被错误识别为 V1 并触发迁移的问题。该问题可能导致手写或模板生成的 V3 配置在内存中被错误改写。

- [PR #11226](https://github.com/zeroclaw-labs/zeroclaw/pull/11226) `fix(config): cascade agent renames into permission-profile selectors`  
  修复 agent 重命名时未同步更新 `permission_profiles.<p>.allowed_agents` 的问题，避免权限配置引用旧 agent 名称。

### 内存系统与会话所有权

- [PR #11209](https://github.com/zeroclaw-labs/zeroclaw/pull/11209) `fix(memory): reject unknown backends instead of selecting markdown`  
  对应 [Issue #11208](https://github.com/zeroclaw-labs/zeroclaw/issues/11208)，将未知 `memory.backend` 从“静默回退 Markdown”改为直接拒绝，避免数据被写入非预期持久化位置。

- [PR #11225](https://github.com/zeroclaw-labs/zeroclaw/pull/11225) `fix(memory): preserve owner in delegation`  
  修复委托场景中 memory tools 丢失 owner-bound routing 的问题，防止子代理访问或写入错误的 memory plane。

- [Issue #11229](https://github.com/zeroclaw-labs/zeroclaw/issues/11229) 反映 session ownership migration 在并发删除情况下可能重新创建已删除 session metadata。当前尚未看到对应修复 PR。

### 工具、备份与渠道能力

- [PR #11224](https://github.com/zeroclaw-labs/zeroclaw/pull/11224) `fix(tools): make backup.encrypt, compress and destination_dir real`  
  修复备份工具中 `backup.encrypt`、`compress`、`destination_dir` 配置未实际生效的问题。此前 `backup.encrypt = true` 仍可能写出明文副本，属于较严重的数据保护问题。

- [PR #11221](https://github.com/zeroclaw-labs/zeroclaw/pull/11221) `feat(tools): gate the SaaS and coding-CLI tools behind opt-in features`  
  将 Jira、Notion、LinkedIn、Composio、Google Workspace、Microsoft 等 SaaS 和 coding CLI 工具改为 feature flag 形式按需编译，降低默认构建面和依赖暴露面。

- [PR #11212](https://github.com/zeroclaw-labs/zeroclaw/pull/11212) `feat(channels/wecom-ws): deliver outbound images and files`  
  为企业微信 WebSocket 通道增加图片和文件出站发送能力，补齐此前只能接收媒体、不能发送媒体的能力缺口。

### 运行时与服务稳定性

- [PR #11213](https://github.com/zeroclaw-labs/zeroclaw/pull/11213) `fix(runtime): preserve interrupted requests and refuse scoped service termination`  
  防止 ShellTool 执行 `zeroclaw service restart` 时杀掉自身 daemon，导致结果或最终回复无法持久化；同时拒绝 scoped-agent 停止、重启和卸载服务。

- [PR #11214](https://github.com/zeroclaw-labs/zeroclaw/pull/11214) `fix(heartbeat): deduplicate alerts and honor live notification policy`  
  修复 watchdog 在一次 missed-heartbeat 事件中每分钟重复告警、生命周期管理不当、短 worker generation 可能延迟检查的问题。

- [PR #11227](https://github.com/zeroclaw-labs/zeroclaw/pull/11227) `fix(runtime): repair logs_subscribe_carries_observer_frames_without_a_gateway on master`  
  修复 master 上一个运行时测试失败，属于测试稳定性修复。

### Provider 兼容性

- [PR #11216](https://github.com/zeroclaw-labs/zeroclaw/pull/11216) `fix(providers): emit tool-message name only for Groq-class endpoints`  
  对应 [Issue #11215](https://github.com/zeroclaw-labs/zeroclaw/issues/11215)，将 `role:"tool"` 消息中的 `name` 字段限制为 Groq 类端点使用，避免 OpenAI-compatible 端点拒绝请求。

---

## 4. 社区热点

今日社区讨论量整体不高，所有新 Issue 评论数均为 0–1，PR 反应数也均为 0。但从影响面看，以下议题最值得关注：

### 1. OpenAI-compatible Provider 工具调用兼容性

- [Issue #11215](https://github.com/zeroclaw-labs/zeroclaw/issues/11215)  
- [PR #11216](https://github.com/zeroclaw-labs/zeroclaw/pull/11216)

用户报告 OpenCode Go 端点拒绝带有 `name` 字段的 `role:"tool"` 消息，报错为 `"name" is not supported by this endpoint`。这说明 ZeroClaw 在兼容 OpenAI-style API 时，对不同 provider 的工具消息字段差异处理仍不够细。  
诉求本质是：**Provider compatibility 不能只按 OpenAI/Groq 的行为假设统一处理，需要针对兼容端点做差异化 feature detection 或 allowlist。**

### 2. Memory Backend 配置错误导致静默写入 Markdown

- [Issue #11208](https://github.com/zeroclaw-labs/zeroclaw/issues/11208)  
- [PR #11209](https://github.com/zeroclaw-labs/zeroclaw/pull/11209)

用户指出未知 `memory.backend` 只记录 WARN，然后回退到 MarkdownMemory，可能把 durable memory 写入 workspace Markdown 文件。  
背后的诉求是：**记忆系统作为持久化核心能力，应当 fail fast，而不是静默降级到用户未选择的后端。** 这也体现用户对数据位置、隐私和可预测性的高度敏感。

### 3. Session Ownership Migration 并发一致性

- [Issue #11229](https://github.com/zeroclaw-labs/zeroclaw/issues/11229)

该 Issue 指出 migration 在 preflight 或 bulk candidate collection 之后，如果另一个进程删除 session，普通 ownership claim 可能重新创建空 ownership row，并报告成功，从而绕过 existing-session adoption 的 Missing 结果。  
诉求集中在：**session metadata 的生命周期应具备并发安全语义，不能在迁移流程中复活已删除实体。**

---

## 5. Bug 与稳定性

按影响程度和潜在风险排序如下：

### S2 / 高优先级：未知 Memory Backend 静默回退 Markdown

- [Issue #11208](https://github.com/zeroclaw-labs/zeroclaw/issues/11208)  
- 状态：Open，标签包括 `bug`, `config`, `memory`, `memory:backend`, `priority:p1`, `status:in-progress`, `status:accepted`, `risk:medium`  
- 严重程度：S2 - degraded behavior  
- 影响：用户配置了不被识别的 `memory.backend` 时，系统不会失败，而是写入 workspace Markdown，可能导致数据落入非预期位置。  
- Fix PR：已有 [PR #11209](https://github.com/zeroclaw-labs/zeroclaw/pull/11209)  
- 评价：这是今日最明确且已有修复路径的稳定性问题，建议优先评审合并。

### S2：OpenCode Go 工具调用失败

- [Issue #11215](https://github.com/zeroclaw-labs/zeroclaw/issues/11215)  
- 状态：Open  
- 严重程度：S2 - degraded behavior  
- 影响：OpenCode Go 作为 OpenAI-compatible endpoint，不支持 `role:"tool"` 消息中的 `name` 字段，导致 ZeroClaw tool calling 请求失败。  
- Fix PR：已有 [PR #11216](https://github.com/zeroclaw-labs/zeroclaw/pull/11216)  
- 评价：影响 provider 兼容性和工具调用可用性。修复方案采用 Groq-class allowlist，方向清晰。

### 中高风险：Session Ownership Migration 可复活已删除 Metadata

- [Issue #11229](https://github.com/zeroclaw-labs/zeroclaw/issues/11229)  
- 状态：Open  
- 影响：迁移期间存在竞态条件，普通 ownership claim 可能在 session 已被删除后创建空 ownership row，并错误返回成功。  
- Fix PR：暂无明确对应 PR  
- 评价：这是并发一致性问题，短期可能不一定高频触发，但一旦发生会污染 session ownership 状态，建议尽快补测试并修复。

### 潜在严重数据保护问题：备份加密配置未生效

- [PR #11224](https://github.com/zeroclaw-labs/zeroclaw/pull/11224)  
- 状态：Open  
- 影响：`backup.encrypt = true` 此前仍可能写出明文副本；`compress` 和 `destination_dir` 也未真实生效。  
- 关联 Issue：今日数据中未列出对应 Issue  
- 评价：虽然以 PR 形式出现，但性质上接近安全与数据保护缺陷，建议作为高优先级修复处理。

### 运行时服务自终止导致请求丢失

- [PR #11213](https://github.com/zeroclaw-labs/zeroclaw/pull/11213)  
- 状态：Open  
- 影响：ShellTool 执行服务重启可能杀掉自身 daemon，导致结果或最终回复未持久化。  
- 评价：属于实际运行稳定性问题，尤其影响 agent 自管理服务场景。

### Heartbeat 告警重复与 watcher 生命周期问题

- [PR #11214](https://github.com/zeroclaw-labs/zeroclaw/pull/11214)  
- 状态：Open  
- 影响：一次 missed-heartbeat incident 中可能每分钟重复告警，watchdog 可能比 worker 活得更久，也可能漏报短 generation 导致的 outage。  
- 评价：影响可观测性与运维体验，建议合并前重点验证告警去重和 worker 生命周期绑定。

---

## 6. 功能请求与路线图信号

今日没有明确以“feature request”形式提交的新 Issue，但多个 PR 透露了项目下一阶段可能纳入的方向：

### 1. 企业微信 WebSocket 出站媒体能力

- [PR #11212](https://github.com/zeroclaw-labs/zeroclaw/pull/11212)

新增 WeCom WS 图片和文件发送能力，补齐企业微信通道的双向媒体能力。  
路线图信号：ZeroClaw 正在强化企业 IM / 工作流渠道能力，尤其是将 agent 输出扩展到非文本内容。

### 2. SaaS 与 Coding CLI 工具按需编译

- [PR #11221](https://github.com/zeroclaw-labs/zeroclaw/pull/11221)

将多个 SaaS 和 coding CLI 工具放到 opt-in feature 之后。  
路线图信号：项目正在向更模块化、更小默认攻击面、更可控依赖图发展。这对企业部署、最小化构建和安全审计都有积极意义。

### 3. 配置 Schema V4 与迁移策略收敛

- [PR #11218](https://github.com/zeroclaw-labs/zeroclaw/pull/11218)  
- [PR #11217](https://github.com/zeroclaw-labs/zeroclaw/pull/11217)

配置迁移相关 PR 集中出现，说明下一版本可能包含配置 schema 的重要调整。  
路线图信号：维护者正在清理遗留配置键、修复 schema_version 缺失时的误迁移，并逐步推进 V4 配置模型。

### 4. 更严格的权限与会话隔离模型

- [PR #11220](https://github.com/zeroclaw-labs/zeroclaw/pull/11220)  
- [PR #11222](https://github.com/zeroclaw-labs/zeroclaw/pull/11222)  
- [PR #11225](https://github.com/zeroclaw-labs/zeroclaw/pull/11225)  
- [PR #11228](https://github.com/zeroclaw-labs/zeroclaw/pull/11228)

这些 PR 分别覆盖 SOP 执行权限、RPC session environment immutability、委托场景 memory owner preservation、插件 TLS profile 授权校验。  
路线图信号：ZeroClaw 正在加强 multi-agent、delegation、plugin、RPC 场景下的隔离边界，可能为更复杂的企业级多租户或多主体协作场景铺路。

---

## 7. 用户反馈摘要

基于今日 Issues 的内容与评论信号，可提炼出以下用户痛点：

### Provider 兼容性痛点

- 来源：[Issue #11215](https://github.com/zeroclaw-labs/zeroclaw/issues/11215)  
- 用户场景：使用 OpenCode Go 这类 OpenAI-compatible endpoint 执行 tool calling。  
- 痛点：ZeroClaw 默认发送的工具消息字段不被该 endpoint 支持，导致工具调用直接失败。  
- 用户期望：OpenAI-compatible 不应被视为完全同构，ZeroClaw 应能按 provider 能力差异生成请求。

### Memory 数据落点可预测性

- 来源：[Issue #11208](https://github.com/zeroclaw-labs/zeroclaw/issues/11208)  
- 用户场景：配置 `memory.backend`，期望系统使用指定记忆后端。  
- 痛点：配置错误时系统未失败，而是静默写入 Markdown 文件；这让用户难以及时发现配置错误，也可能造成数据泄露或持久化位置混乱。  
- 用户期望：错误配置应立即失败，并给出明确诊断，而不是自动降级到另一个持久化后端。

### Session 生命周期一致性

- 来源：[Issue #11229](https://github.com/zeroclaw-labs/zeroclaw/issues/11229)  
- 用户场景：session ownership migration 与并发 session 删除同时发生。  
- 痛点：迁移逻辑可能重新创建已删除 session 的 metadata，造成状态“复活”。  
- 用户期望：迁移流程应尊重删除语义，并对并发状态变化返回 Missing 或失败，而不是隐式创建新行。

---

## 8. 待处理积压

从今日数据看，没有足够信息识别“长期未响应”的 Issue 或 PR；所有列出的 Issue/PR 均创建于 2026-09-28 或 2026-09-29，属于新近活动。但以下待处理项建议维护者优先关注：

### 优先级较高、已有明确修复 PR

1. [Issue #11208](https://github.com/zeroclaw-labs/zeroclaw/issues/11208) / [PR #11209](https://github.com/zeroclaw-labs/zeroclaw/pull/11209)  
   未知 memory backend 静默回退 Markdown，涉及数据持久化安全与配置可预测性。

2. [Issue #11215](https://github.com/zeroclaw-labs/zeroclaw/issues/11215) / [PR #11216](https://github.com/zeroclaw-labs/zeroclaw/pull/11216)  
   OpenAI-compatible provider 工具调用失败，影响实际可用性。

3. [PR #11224](https://github.com/zeroclaw-labs/zeroclaw/pull/11224)  
   备份加密、压缩、目标目录配置未实际生效，涉及用户数据保护。

4. [PR #11220](https://github.com/zeroclaw-labs/zeroclaw/pull/11220)  
   SOP over RPC 权限收紧，建议优先处理以降低越权风险。

### 尚未看到对应修复 PR

1. [Issue #11229](https://github.com/zeroclaw-labs/zeroclaw/issues/11229)  
   Session ownership migration 可能复活已删除 metadata。建议补充并发测试，并明确 ordinary claim 与 existing-session adoption 的语义边界。

### 评审队列压力

今日共有 **19 个开放 PR**，其中多个为 `size:L` 或 `size:XL`，涉及安全、配置、运行时和工具系统核心路径。建议维护者按以下顺序分批评审：

1. 安全与数据保护：[#11220](https://github.com/zeroclaw-labs/zeroclaw/pull/11220)、[#11224](https://github.com/zeroclaw-labs/zeroclaw/pull/11224)、[#11228](https://github.com/zeroclaw-labs/zeroclaw/pull/11228)  
2. 已有 Issue 对应的用户可见 Bug：[#11209](https://github.com/zeroclaw-labs/zeroclaw/pull/11209)、[#11216](https://github.com/zeroclaw-labs/zeroclaw/pull/11216)  
3. 配置迁移：[#11217](https://github.com/zeroclaw-labs/zeroclaw/pull/11217)、[#11218](https://github.com/zeroclaw-labs/zeroclaw/pull/11218)  
4. 运行时稳定性与可观测性：[#11213](https://github.com/zeroclaw-labs/zeroclaw/pull/11213)、[#11214](https://github.com/zeroclaw-labs/zeroclaw/pull/11214)、[#11227](https://github.com/zeroclaw-labs/zeroclaw/pull/11227)  

整体判断：ZeroClaw 今日处于 **修复密集期**，代码流入活跃，但合并输出为零。若未来 1–2 天内这些修复 PR 能快速完成评审并合并，项目稳定性和安全边界将有明显提升；若继续堆积，则会增加回归、冲突和发布延迟风险。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*