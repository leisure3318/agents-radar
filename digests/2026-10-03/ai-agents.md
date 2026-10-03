# OpenClaw 生态日报 2026-10-03

> Issues: 10 | PRs: 38 | 覆盖项目: 13 个 | 生成时间: 2026-10-03 04:18 UTC

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
日期：2026-10-03  
仓库：github.com/openclaw/openclaw

---

## 1. 今日速览

过去 24 小时 OpenClaw 维持了**非常高的开发活跃度**：Issues 更新 10 条，其中 7 条仍处于开放状态、3 条已关闭；PR 更新 38 条，其中 28 条待合并、10 条已合并或关闭。  
今日重点集中在三条主线：**更新/升级可靠性、Gateway 与 Agent 架构清理、跨渠道消息交付稳定性**。  
项目发布了两个版本：`v2026.9.8` 与 `v2026.8.35 extended-stable`，说明维护团队正在同时推进 latest 与稳定/LTS 类分支。  
整体健康度较好：高优先级问题响应较快，多个 P0/P1 问题已关闭或已有相关 PR；但当前积压中仍有多项 XL 级重构 PR，且不少标记为 `security-sensitive-changed`、`merge-risk: compatibility`，合并风险需要维护者重点把控。

---

## 2. 版本发布

### v2026.9.8：openclaw 2026.9.8  
链接：<https://github.com/openclaw/openclaw/releases/tag/v2026.9.8>

#### 主要更新方向

本版本重点是**安全更新、Doctor 恢复能力与升级路径稳定性**：

- **更安全的更新流程**
  - 保留插件设置，降低升级过程中配置丢失风险。
  - 更好地处理 SQLite 短暂竞争，减少升级或修复过程中的瞬时失败。
  - 阻止 Windows 上不安全的 schema 升级路径。
- **Doctor 恢复增强**
  - 支持 verified-empty Telegram migrations 的解锁。
  - 对深度修复与大规模 fleet 修复设置边界，避免修复流程过度扩张。
- 相关 Issue/PR：  
  - <https://github.com/openclaw/openclaw/issues/160344>  
  - <https://github.com/openclaw/openclaw/issues/160702>  
  - <https://github.com/openclaw/openclaw/issues/160718>  
  - <https://github.com/openclaw/openclaw/issues/161832>

#### 破坏性变更

从当前 release 摘要看，未明确声明破坏性变更。  
但由于涉及 Doctor、SQLite、Windows schema upgrade 与迁移路径，建议用户在升级前备份 state root / 数据库 / 插件配置。

#### 迁移注意事项

建议以下用户优先升级到 `2026.9.8`：

- 使用 Windows Gateway 的用户，尤其是曾遇到 schema upgrade 或启动失败问题者。
- 使用 Telegram、WhatsApp、Discord 等渠道插件并依赖 Doctor 自动修复的部署。
- 大规模 fleet 或多 worker 部署场景。
- 曾遇到 SQLite contention、升级失败、插件配置丢失的用户。

---

### v2026.8.35：openclaw 2026.8.35 extended-stable  
链接：<https://github.com/openclaw/openclaw/releases/tag/v2026.8.35>

#### 主要定位

这是一个 **gateway-only extended-stable** 版本，是 OpenClaw 当前等价于 LTS 的发行线。  
该版本基于 2026 年 8 月底的 OpenClaw，并回补关键安全更新、可靠性修复、性能修复以及部分新模型支持。

#### 适用用户

适合以下场景：

- 生产环境更重视稳定性而非最新功能。
- 不希望频繁跟进 latest 版本。
- Gateway 是核心部署组件，且希望获取关键安全与可靠性修复。
- 企业或团队内部部署，需要更可控的升级节奏。

#### 迁移注意事项

- 该版本为 gateway-only extended-stable，用户需要确认自身部署组件是否匹配。
- 若依赖 latest 分支的新 UI、Agent 或插件特性，需确认这些功能是否已回补到 extended-stable。
- 从 latest 回退到 extended-stable 不一定是无状态操作，建议在切换发行线前备份配置与数据。

---

## 3. 项目进展

今日 PR 活跃度极高，重点集中在 Gateway、Agent、UI、Secrets、插件和测试基础设施。

### 已关闭 / 合并的重要 PR

#### 1. Worktree CLI mutation 路由到 live owner  
PR：<https://github.com/openclaw/openclaw/pull/163953>  
状态：Closed  
标签：`gateway`、`cli`、`commands`、`docker`、`agents`、`security-sensitive-changed`、`merge-risk: compatibility`

该 PR 解决 Worktree CLI mutation 可能绕过拥有同一 state root 的 Gateway 的问题。  
这类问题会影响状态一致性、发布生命周期和 CLI/Gateway 行为一致性。该 PR 属于 worktree routing 系列的一部分，对多入口状态管理是重要推进。

**影响评估：高。**  
虽然为 closed 状态，但从描述看其解决的问题涉及核心状态所有权与路由一致性，对后续可靠性非常关键。

---

#### 2. 保留较新的 pending live model switch  
PR：<https://github.com/openclaw/openclaw/pull/164015>  
状态：Closed  
标签：`agents`、`docs`

该 PR 修复了连续执行 `/model` 选择时，较新的 pending flag 可能被旧的 live-switch clear 清除的问题。

**用户影响：中高。**  
对频繁切换模型的 Agent 会话用户较重要，可减少模型选择状态错乱。

---

#### 3. Codex 插件注册保持无网络依赖  
PR：<https://github.com/openclaw/openclaw/pull/164016>  
状态：Closed  
标签：`extensions: codex`

该 PR 避免加载 Codex 插件注册面时意外加载 host network runtime。  
目标是保持插件注册轻量化，避免不必要的网络运行时副作用。

**用户影响：中。**  
直接用户可见变化不明显，但对启动性能、插件隔离和测试稳定性有正面作用。

---

#### 4. 移除低价值插件测试  
PR：<https://github.com/openclaw/openclaw/pull/164018>  
状态：Closed  
标签：`discord`、`feishu`、`codex`、`diffs`、`crabbox`、`facetime`、`document-extract`、`agentsapi`

该 PR 移除多个插件中的冗余测试变体与重复 fixture。  
目标是降低测试维护成本，不改变运行时行为。

**用户影响：低；维护影响：中。**  
有助于降低 CI 噪声与维护负担，但需要确保没有误删关键回归覆盖。

---

#### 5. Microsoft Teams 移除未使用 send 参数  
PR：<https://github.com/openclaw/openclaw/pull/164010>  
状态：Closed  
标签：`channel: msteams`

内部清理 PR，无用户可见变化。  
对 Teams 发送结果 helper 做简化，降低代码复杂度。

---

#### 6. CI 与发布工具清理  
PR：<https://github.com/openclaw/openclaw/pull/164009>  
状态：Closed  
标签：`scripts`、`docker`

清理 CI 与 release tooling 中已废弃选择路径、重复证据投影和单用途命令工厂。  
对用户功能无直接影响，但有助于提高发布流水线可维护性。

---

### 待合并但值得关注的关键 PR

#### 1. Gateway workers 与 turns 清理  
PR：<https://github.com/openclaw/openclaw/pull/164014>  
状态：Open  
标签：`gateway`、`security-sensitive-changed`、`size: XL`

聚焦 Gateway worker、turn、Talk、terminal 流程中的重复转发层与并行状态记录。  
这是核心架构清理，合并后有望提升可维护性，但需严格审查安全敏感路径。

---

#### 2. Secrets 元数据写入迁移到 workers  
PR：<https://github.com/openclaw/openclaw/pull/164020>  
状态：Open  
标签：`secrets`、`gateway`、`cli`、`commands`、`agents`、`security-sensitive-changed`

将普通 secret settings 元数据读写、set/delete/rollback 操作从 Gateway 线程迁移到 workers。  
这可能改善 Gateway 响应性，也能减少 SQLite 阻塞。

**风险点：** secret 保存顺序、配置应用顺序、回滚一致性。

---

#### 3. Session 生命周期 mutation 移出主线程  
PR：<https://github.com/openclaw/openclaw/pull/163815>  
状态：Open  
标签：`sessions`、`gateway`、`agents`

解决 session 创建、重置、删除可能阻塞 Gateway 的问题。  
如果合并，将直接改善大 session store 用户的响应性。

---

#### 4. macOS 原生侧边栏支持多选、批量编辑与拖拽  
PR：<https://github.com/openclaw/openclaw/pull/164013>  
状态：Open  
标签：`app: macos`、`proof: screenshot`

这是用户可见度较高的功能 PR。  
支持 Cmd/Shift 多选 session、批量操作和拖拽组织，会明显提升 macOS 原生应用的会话管理体验。

---

#### 5. Control UI 显示 worker 生命周期历史  
PR：<https://github.com/openclaw/openclaw/pull/163995>  
状态：Open，等待作者  
Issue：<https://github.com/openclaw/openclaw/issues/163982>

解决 Systems 页面隐藏 worker lifecycle history、reclaimed worker 可能持续显示为 Attached 的问题。  
这对运维观察和故障排查很重要。

---

## 4. 社区热点

### 1. AGENTS.md 超过 bootstrapMaxChars 后规则被静默截断  
Issue：<https://github.com/openclaw/openclaw/issues/164006>  
状态：Open  
评论数：3  
标签：`P2`、`impact:session-state`、`impact:ux-friction`

用户反馈：当 agent 使用内置 `edit` / `write` 工具不断向 workspace `AGENTS.md` 追加规则时，如果文件超过 `bootstrapMaxChars`，中间规则可能不再被注入，但系统没有任何警告。

**背后诉求：**

- 用户希望 agent 自我维护规则时具备可观测性。
- 对长上下文/规则文件的截断行为需要更明确提示。
- 这是 session-state 与 UX friction 交叉问题，可能影响 agent 行为一致性。

**产品信号：**  
维护者需要决定是否增加 warning、lint、Doctor 检查或 UI 提示。该问题已有 `needs-product-decision` 标签，说明尚未进入明确实现阶段。

---

### 2. Tool Search 无法搜索 composed schema 内参数  
Issue：<https://github.com/openclaw/openclaw/issues/164024>  
状态：Open  
评论数：2  
标签：`P2`、`queueable-fix`、`source-repro`

Tool Search 在 `anyOf`、`oneOf`、`allOf` 下的参数名或描述中无法命中查询。

**背后诉求：**

- 用户希望工具搜索覆盖完整 schema，而不仅是顶层字段。
- 对复杂工具定义和组合 schema 的支持不足会降低 tool discoverability。
- 标签显示该问题复现清晰，形状明确，可能较快进入修复队列。

---

### 3. 更新失败：2026.9.7  
Issue：<https://github.com/openclaw/openclaw/issues/163994>  
状态：Open  
评论数：2  
标签：`P2`、`maturity:stable`、`impact:ux-friction`

macOS arm64 用户在 CLI 更新时失败。  
这是更新通道稳定性问题，虽然不是 P0，但影响用户对升级流程的信任。

相关 PR：  
- `openclaw status` 区分历史更新失败与当前 Gateway 健康状态：<https://github.com/openclaw/openclaw/pull/163991>

---

### 4. Discord thread requester 完成状态误判  
Issue：<https://github.com/openclaw/openclaw/issues/163724>  
状态：Closed  
评论数：2  
标签：`P1`、`impact:session-state`

问题描述：Discord thread requester 中，message-tool reply + `NO_REPLY` 在 subagent settle turn 中未被 credited，导致完成被标记为 failed。

**背后诉求：**

- 用户希望多渠道/子 Agent 完成状态判断更加准确。
- 不应因为 durable final delivery evidence 识别不足而把已完成任务标记失败。
- 这类问题对自动化工作流影响较大。

---

## 5. Bug 与稳定性

按严重程度排列如下：

### P0 / Release Blocker

#### 1. 更新失败：runtime-verification-failed  
Issue：<https://github.com/openclaw/openclaw/issues/164023>  
状态：Open  
标签：`P0`、`impact:ux-release-blocker`、`maturity:stable`

macOS x64，OpenClaw 2026.9.4，更新目标精确版本时出现 runtime verification failure。  
该问题为 release blocker 级别，当前标记 `needs-info`，说明维护者需要更多环境或日志信息。

**是否已有 fix PR：** 当前数据中未看到明确 linked fix PR。  
**建议优先级：最高。**

---

#### 2. Windows gateway.cmd 编码问题导致非 ASCII 用户名下无法启动  
Issue：<https://github.com/openclaw/openclaw/issues/164000>  
状态：Closed  
标签：`P0`、`bug:crash`、`impact:crash-loop`、`impact:ux-release-blocker`

Windows 用户名包含中文、日文、韩文等非 ASCII 字符时，生成的 `gateway.cmd` 编码不匹配，导致 Gateway 无法启动。

**是否已有 fix PR：** Issue 已关闭，推测已有修复或被合并处理；当前数据未显示具体 linked PR。  
**影响范围：** Windows 国际化用户名环境，影响严重，属于启动阻断。

---

### P1

#### 3. Doctor 迁移 WhatsApp shared channel policy 时改变默认账号  
Issue：<https://github.com/openclaw/openclaw/issues/163942>  
状态：Closed  
标签：`P1`、`impact:message-loss`

Doctor 可能从合法 channel-wide shared policy 创建新的 `accounts.default`，从而把默认账号从已有命名账号改成新建未关联账号。  
该问题会影响消息投递路径，存在 message-loss 风险。

**是否已有 fix PR：** Issue 已关闭，推测已修复或被处理。  
**影响范围：** WhatsApp 升级/Doctor 修复场景，尤其 Windows 2026.9.2 → 2026.9.7。

---

#### 4. Discord thread requester 完成状态误判  
Issue：<https://github.com/openclaw/openclaw/issues/163724>  
状态：Closed  
标签：`P1`、`impact:session-state`

详见社区热点。  
该问题影响 agent/subagent 完成状态和消息交付确认。

**是否已有 fix PR：** Issue 已关闭，推测已有修复或已确认解决。

---

### P2

#### 5. Android 显式 Reconnect 未进入 TLS trust review  
Issue：<https://github.com/openclaw/openclaw/issues/164026>  
状态：Open  
标签：`P2`、`impact:security`、`maturity:stable`

Android 正常连接路径已有 changed-fingerprint confirmation，但显式 Reconnect 路径未复用现有 TLS trust review。

**是否已有 fix PR：** 当前数据未显示。  
**影响范围：** Android 显式重连场景，安全相关，应优先处理。

---

#### 6. ACP `/new` 与 `/reset` 在 cleanup 中可能中止自己的 acknowledgement  
Issue：<https://github.com/openclaw/openclaw/issues/164004>  
状态：Open  
标签：`P2`、`impact:message-loss`、`linked-pr-open`

绑定 ACP 会话中，内联 `/new` 或 `/reset` 可能因 session cleanup 中止自身 reply operation，导致 acknowledgement 丢失。

**是否已有 fix PR：** 有，标记 `linked-pr-open`，但当前数据未列出具体 PR 编号。  
**影响范围：** ACP 持久会话、命令确认消息。

---

#### 7. Tool Search 无法命中 composed schema 参数  
Issue：<https://github.com/openclaw/openclaw/issues/164024>  
状态：Open  
标签：`P2`、`queueable-fix`

详见社区热点。  
属于功能正确性与搜索体验问题。

---

#### 8. 更新失败：2026.9.7  
Issue：<https://github.com/openclaw/openclaw/issues/163994>  
状态：Open  
标签：`P2`、`impact:ux-friction`

macOS arm64 CLI 更新失败。  
与升级体验相关，建议与 v2026.9.8 的 safer updates 改动联动排查。

相关 PR：  
- <https://github.com/openclaw/openclaw/pull/163991>

---

## 6. 功能请求与路线图信号

### 1. AGENTS.md 超长时发出警告  
Issue：<https://github.com/openclaw/openclaw/issues/164006>  
状态：Open  
标签：`needs-product-decision`

这是一个典型的 Agent 可观测性与规则管理问题。  
可能落地形式包括：

- 当 `AGENTS.md` 超过 `bootstrapMaxChars` 时在 CLI/UI 中提示。
- Doctor 增加规则文件长度检查。
- Agent 写入规则时触发 guardrail。
- 在注入摘要中明确说明被截断的中间部分。

**进入下一版本可能性：中。**  
问题影响真实使用体验，但目前还需要产品决策。

---

### 2. Everpod hosting guide 缺失  
Issue：<https://github.com/openclaw/openclaw/issues/164017>  
状态：Open  
标签：`P3`、`docs`

用户希望在 Hosting section 和 provider picker 中加入 Everpod 指南。

**背后信号：**

- OpenClaw 的托管部署生态正在扩展。
- 用户不仅关注本地/自托管，也关注 managed host。
- 文档与 provider picker 需要同步第三方托管生态。

**进入下一版本可能性：中低。**  
文档类 P3，依赖维护者对 Everpod 的产品定位判断。

---

### 3. macOS 原生侧边栏多选、批量编辑、拖拽  
PR：<https://github.com/openclaw/openclaw/pull/164013>  
状态：Open

这是明确的 UI 功能增强。  
已有截图 proof，且 PR 处于 ready for maintainer look，进入近期版本的可能性较高。

**进入下一版本可能性：高。**

---

### 4. Settings 增加禁用直接 Archive 快捷键开关  
PR：<https://github.com/openclaw/openclaw/pull/163943>  
状态：Open  
Issue：<https://github.com/openclaw/openclaw/issues/163739>

解决 `Ctrl+Shift+A` / `⌘⇧A` 与浏览器或扩展快捷键冲突导致误归档 session 的问题。  
当前状态为 `needs proof`，还需补充验证材料。

**进入下一版本可能性：中。**  
用户痛点明确，但还缺 proof。

---

### 5. Control UI 显示 worker 生命周期历史  
PR：<https://github.com/openclaw/openclaw/pull/163995>  
状态：Open，等待作者

这是运维可观测性增强。  
适用于多 worker / 大规模部署用户。

**进入下一版本可能性：中。**  
当前阻塞点是作者响应。

---

## 7. 用户反馈摘要

### 1. 更新体验仍是主要痛点

相关 Issues：

- <https://github.com/openclaw/openclaw/issues/164023>
- <https://github.com/openclaw/openclaw/issues/163994>
- <https://github.com/openclaw/openclaw/issues/164000>

用户关注点：

- 更新失败后难以判断当前 Gateway 是否健康。
- runtime verification failure 对普通用户较难自行诊断。
- Windows 非 ASCII 用户名导致启动失败，说明跨平台国际化测试仍需加强。

相关进展：

- v2026.9.8 已强调 safer updates 与 Doctor recovery。
- PR #163991 尝试让 `openclaw status` 区分历史更新失败与当前健康状态：  
  <https://github.com/openclaw/openclaw/pull/163991>

---

### 2. 多渠道消息交付与确认语义仍需打磨

相关 Issues：

- WhatsApp Doctor 默认账号变化：<https://github.com/openclaw/openclaw/issues/163942>
- Discord requester completion 误判：<https://github.com/openclaw/openclaw/issues/163724>
- ACP `/new` / `/reset` acknowledgement 丢失：<https://github.com/openclaw/openclaw/issues/164004>

用户痛点：

- 消息已经发送或任务已经完成，但系统未正确记录 durable evidence。
- Doctor 自动修复可能改变默认账号，造成潜在消息丢失。
- 会话清理和命令确认之间存在竞态。

这说明 OpenClaw 当前在多渠道、Agent、session lifecycle 之间的边界仍是稳定性重点。

---

### 3. 高级用户需要更强的可观测性与控制权

相关 Issues/PR：

- AGENTS.md 截断警告：<https://github.com/openclaw/openclaw/issues/164006>
- Worker 生命周期历史：<https://github.com/openclaw/openclaw/pull/163995>
- Prometheus RPC method 精确标签：<https://github.com/openclaw/openclaw/pull/164028>
- Status 区分历史失败与当前健康：<https://github.com/openclaw/openclaw/pull/163991>

用户诉求：

- 不只是“系统能运行”，还要知道系统为什么这样运行。
- 运维用户希望指标、状态、历史事件和失败原因更加准确。
- Agent 规则、worker 生命周期、Gateway 健康状态都需要更清晰的展示。

---

### 4. UI/UX 摩擦集中在 session 管理与快捷键

相关 PR：

- macOS sidebar 多选、批量编辑、拖拽：<https://github.com/openclaw/openclaw/pull/164013>
- 禁用 Archive 快捷键开关：<https://github.com/openclaw/openclaw/pull/163943>

用户场景：

- 大量 session 管理需要批量操作。
- 浏览器/系统快捷键冲突可能导致误操作。
- UI 需要兼顾 power user 与普通用户的安全操作体验。

---

## 8. 待处理积压

基于过去 24 小时数据，未发现“长期无人响应”的明确证据；多数 Issue/PR 均为今日创建或今日更新。不过以下事项建议维护者优先关注：

### 高优先级待处理

#### 1. P0 runtime verification 更新失败仍需信息  
Issue：<https://github.com/openclaw/openclaw/issues/164023>  
状态：Open，`needs-info`

建议维护者尽快引导用户补充：

- 完整 updater log
- 目标版本
- runtime verification 失败点
- 本地 Gateway 状态
- 是否可复现

---

#### 2. Android Reconnect TLS trust review 缺口  
Issue：<https://github.com/openclaw/openclaw/issues/164026>  
状态：Open

安全相关 P2，建议尽快确认：

- 是否仅影响显式 Reconnect
- 是否可复用正常连接路径的 trust review
- 是否需要 backport 到 extended-stable

---

#### 3. ACP acknowledgement 丢失已有 linked PR，但需推进合并  
Issue：<https://github.com/openclaw/openclaw/issues/164004>  
状态：Open，`linked-pr-open`

建议维护者优先审查 linked fix，因其涉及 `impact:message-loss`。

---

### 等待维护者审查的大型重构 PR

这些 PR 多为 `size: XL` 且触及核心路径，建议分批审查并要求足够 proof：

- Gateway deslop：<https://github.com/openclaw/openclaw/pull/164022>
- Gateway workers and turns deslop：<https://github.com/openclaw/openclaw/pull/164014>
- Agents tool/auth orchestration deslop：<https://github.com/openclaw/openclaw/pull/164019>
- Agents session/subagent plumbing deslop：<https://github.com/openclaw/openclaw/pull/163996>
- Secrets metadata writes in workers：<https://github.com/openclaw/openclaw/pull/164020>
- State and memory storage deslop：<https://github.com/openclaw/openclaw/pull/163945>

共同风险：

- 多个 PR 涉及 `security-sensitive-changed`
- 部分涉及 `merge-risk: compatibility`
- 多个核心模块同时重构，可能产生交叉回归
- 需要确保 release blocker 修复优先于大规模清理合并

---

### 等待作者补充或修正

#### Control UI worker lifecycle history  
PR：<https://github.com/openclaw/openclaw/pull/163995>  
状态：waiting on author

建议作者补充：

- 截图或录屏 proof
- worker 状态转换测试
- reclaimed / destroyed / failed worker 的 UI 表现验证

#### Archive 快捷键禁用开关  
PR：<https://github.com/openclaw/openclaw/pull/163943>  
状态：needs proof

建议补充：

- Windows/Linux/macOS 快捷键验证
- 浏览器快捷键冲突场景
- 设置项持久化与默认行为说明

---

## 总体健康度评估

OpenClaw 今日开发活跃度很高，维护节奏积极，尤其是更新可靠性、Doctor 恢复、Gateway 主线程减负、Agent/session 状态一致性方面都有明显推进。  
项目当前的主要风险不在活跃度，而在**变更面过大**：多个 XL 级重构 PR 同时触及 Gateway、Agents、Secrets、State、Plugins，且不少带有安全敏感或兼容性风险标签。  
建议短期优先级为：

1. 先处理 P0/P1 更新失败、启动失败、消息丢失问题。  
2. 再合并小型、低风险、已有 proof 的修复。  
3. 最后分批推进大型 deslop/refactor PR，避免多个核心重构同时进入同一 release。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析  
日期：2026-10-03

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态整体呈现 **“头部项目高强度迭代，中小项目局部需求驱动，低活跃项目暂时静默”** 的格局。OpenClaw、Hermes Agent、ZeroClaw 处于明显的高活跃区，围绕 Gateway / Daemon、Agent Runtime、Provider 兼容、工具调用、会话状态和跨平台可靠性持续推进。  
从问题类型看，生态的主要矛盾已经从“能否调用模型和工具”转向 **升级可靠性、长任务状态一致性、多渠道消息交付、配置可观测性、Provider 能力抽象和失败可解释性**。  
多个项目同时暴露出 Windows/macOS、SQLite/state store、WebUI 状态恢复、更新回滚、凭据后端、TLS 信任、路径处理等工程化问题，说明个人 AI 助手正在从实验性工具进入更复杂的生产化、自托管和多端协作场景。  
整体上，社区需求越来越偏向 **稳定运行、可诊断、可审计、可控成本、多模态与多渠道集成**，而不是单纯新增聊天功能。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 今日主要关注点 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 10 | 38 | 2 个：`v2026.9.8`、`v2026.8.35 extended-stable` | 更新可靠性、Doctor 恢复、Gateway/Agent 架构清理、跨渠道消息交付 | **高活跃、较成熟**。发布节奏强，但 XL 重构和安全敏感变更较多，合并风险需控制 |
| **NanoBot** | 3 | 5 | 无 | Provider 参数兼容、WebUI 状态保护、QQ 引用上下文、Codex 图片流式响应 | **健康修复期**。Issue 到 PR 响应快，等待评审合并 |
| **Hermes Agent** | 50 | 50 | 无 | Desktop/Windows 稳定性、CLI 安装、Provider fallback、SQLite 损坏、浏览器工具 | **极高活跃、高压力**。社区反馈密集，修复供给充足，但稳定性问题集中 |
| **PicoClaw** | 1 | 0 | 无 | Web Console 子路径反向代理部署 | **低活跃、需求明确**。今日仅部署增强诉求，维护响应待观察 |
| **NanoClaw** | 3 | 13 | 无 | 更新/回滚安全、channels 分支同步、Discord ID 映射、安装流程 | **活跃但有高风险缺口**。更新 rollback 可能破坏数据目录，需优先处理 |
| **NullClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **IronClaw** | 1 | 0 | 无 | macOS local-dev 凭据读取失败 | **低活跃但问题阻断性强**。本地开发启动链路需 triage |
| **LobsterAI** | 0 | 0 | 无 | 无活动 | **静默** |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **Moltis** | 0 | 0 | 无 | 无活动 | **静默** |
| **CoPaw / QwenPaw** | 6 | 6 | 无 | 多模态工具、静默失败、GPT 参数兼容、移动端设置、飞书元信息 | **活跃但待收敛**。多个用户可见修复待合并 |
| **ZeptoClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **ZeroClaw** | 7 | 46 | 无 | Runtime/Daemon、配置系统、工具取消、Provider 控制、供应链安全、Windows 路径 | **极高活跃、工程治理强**。PR 积压大，高风险堆叠变更多 |

---

## 3. OpenClaw 在生态中的定位

### 3.1 综合定位

OpenClaw 当前是本组项目中 **发布节奏最稳定、维护线最清晰、工程化成熟度最高的项目之一**。它不仅在过去 24 小时内保持 10 条 Issue、38 条 PR 的高活跃度，还发布了两个版本：

- `v2026.9.8`：面向 latest 用户，重点是安全更新、Doctor 恢复和升级路径稳定；
- `v2026.8.35 extended-stable`：面向稳定生产环境的 gateway-only extended-stable 线，接近 LTS 定位。

这使 OpenClaw 与仅提交修复 PR、暂无发布的 NanoBot、Hermes Agent、ZeroClaw、NanoClaw 相比，在 **版本管理和生产用户维护** 上更成熟。

### 3.2 相对优势

| 维度 | OpenClaw 表现 | 对比说明 |
|---|---|---|
| 发布节奏 | 今日 2 个 Release，覆盖 latest 与 extended-stable | 明显强于今日无发布的 Hermes、ZeroClaw、NanoBot、NanoClaw |
| Gateway 架构 | 持续推进 Gateway 主线程减负、worker 化、session mutation 外移 | 与 ZeroClaw 的 daemon/runtime 治理相似，但 OpenClaw 更强调 Gateway 作为核心控制面 |
| Doctor / 自修复 | v2026.9.8 强化 Doctor recovery、SQLite contention、Telegram migrations | 在自诊断和恢复能力上领先多数项目 |
| 多渠道集成 | WhatsApp、Discord、Telegram、ACP 等问题被持续处理 | 与 NanoClaw、CoPaw、Hermes 一样重视渠道，但 OpenClaw 的 issue/PR 覆盖更系统 |
| 稳定线维护 | extended-stable 分支清晰 | 多数项目尚未表现出类似 LTS 发行策略 |
| 社区规模信号 | 24h 38 PR、10 Issue，且含多项 P0/P1 | 属于头部活跃项目，与 Hermes、ZeroClaw 同一梯队 |

### 3.3 技术路线差异

OpenClaw 的核心路线可以概括为：

> **Gateway-centric + Doctor recovery + 多渠道消息交付 + Agent/session 状态一致性。**

相比之下：

- **Hermes Agent** 更偏 Desktop/CLI 一体化、浏览器工具、Provider fallback、Claude Code/MCP 兼容；
- **ZeroClaw** 更偏 Runtime/Daemon、工具系统、配置应用结果、供应链安全与强工程治理；
- **NanoBot** 更偏 Provider 兼容、WebUI 状态、轻量渠道修复；
- **CoPaw** 更偏多模态工具、前端体验、企业 IM 可观测性；
- **NanoClaw** 更偏安装更新、channels 分支、多渠道 adapter 和容器环境。

OpenClaw 的独特性在于：它已经把 **升级可靠性、Doctor 自动恢复、Gateway 状态所有权、跨渠道投递证据** 视为核心产品能力，而不只是附属修复项。

---

## 4. 共同关注的技术方向

### 4.1 更新、安装与回滚可靠性

涉及项目：

- **OpenClaw**
  - P0 runtime verification 更新失败；
  - macOS arm64 CLI 更新失败；
  - Windows 非 ASCII 用户名导致 Gateway 启动失败；
  - v2026.9.8 明确聚焦 safer updates。
- **NanoClaw**
  - update rollback 可能删除部分 `data/` 并导致 host down；
  - cutover 在 `tsx` / `esbuild` 升级时崩溃；
  - fresh install 后无法直接 update。
- **Hermes Agent**
  - launcher 可能绑定 scratch fixture Python；
  - Windows 更新后 dashboard/serve 无法自动重启。
- **IronClaw**
  - 本地开发启动时凭据后端不可用，且 doctor 未能发现。

共同诉求：

- 更新失败不能破坏数据；
- rollback 需要事务性和可恢复性；
- status/doctor 应区分历史失败、当前健康和运行时依赖；
- 安装器、launcher、cutover 执行器应与被更新依赖解耦。

---

### 4.2 会话状态、长任务与运行中任务一致性

涉及项目：

- **OpenClaw**
  - session mutation 移出 Gateway 主线程；
  - ACP `/new` / `/reset` acknowledgement 丢失；
  - Discord requester 完成状态误判；
  - pending live model switch 被旧状态覆盖。
- **Hermes Agent**
  - SQLite FTS5 损坏；
  - 长会话冻结；
  - sidebar/session 截断与导出历史问题；
  - Desktop 长会话 ResizeObserver 风暴。
- **ZeroClaw**
  - daemon 中途死亡后 session 永久 running；
  - focused session 刷新不能取消任务；
  - tool cooperative cancellation context。
- **CoPaw**
  - 配置重载 drain timeout 后应通知房间并取消任务；
  - 超大 prompt 和空模型回复不能静默失败。
- **NanoBot**
  - WebUI sidebar-state 初始读取失败后不能覆盖真实状态。

共同诉求：

- 长任务需要 heartbeat、lease、owner epoch 或 crash settlement；
- session 状态不能因进程崩溃、UI 刷新、重载或 cleanup 进入不可恢复状态；
- 用户需要明确知道任务是 running、failed、cancelled、interrupted 还是 completed。

---

### 4.3 Provider 能力抽象与参数兼容

涉及项目：

- **NanoBot**
  - `reasoningEffort` 不应导致 38 个 OpenAI-compatible Provider 静默丢弃 `temperature`。
- **Hermes Agent**
  - Anthropic fallback-only credential 未初始化；
  - vision fallback 到不兼容主模型；
  - OpenRouter / Deepseek 工具调用兼容问题。
- **CoPaw**
  - 新 GPT 模型需使用 `max_completion_tokens` 而非旧 `max_tokens`。
- **ZeroClaw**
  - Ollama / llama.cpp thinking controls 未传递；
  - single-tool provider rounds；
  - model fallback notice。
- **OpenClaw**
  - live model switch pending 状态一致性；
  - Agent 模型切换行为修复。

共同诉求：

- Provider 层需要从“后端级规则”升级为“模型能力级规则”；
- 参数过滤不能静默发生，应可观测；
- fallback 前应进行 capability check；
- 模型切换、reasoning、temperature、thinking、tool mode 等行为需要统一抽象。

---

### 4.4 多渠道消息交付与平台语义一致性

涉及项目：

- **OpenClaw**
  - WhatsApp Doctor 默认账号迁移造成 message-loss 风险；
  - Discord completion evidence 误判；
  - ACP acknowledgement 丢失。
- **NanoClaw**
  - Discord reaction/edit 使用 namespaced internal ID 导致平台拒绝；
  - channels 分支 adapter 加载修复。
- **NanoBot**
  - QQ quoted message 未传给 Agent。
- **CoPaw**
  - 飞书回复需要展示 Agent / Provider / Model 信息；
  - 图片消息路由到 `chat_with_image` 后静默失败。
- **Hermes Agent**
  - Telegram standalone send 忽略通知配置；
  - Feishu 深层 interactive message 触发 RecursionError。

共同诉求：

- 内部消息 ID 与平台原生 message ID 必须分层；
- 消息完成状态需要 durable delivery evidence；
- 引用、回复、reaction、edit、NO_REPLY、acknowledgement 等平台语义应被保留；
- 企业 IM 场景需要可追溯的 Agent 和模型元信息。

---

### 4.5 工具系统、MCP 与外部输入安全

涉及项目：

- **ZeroClaw**
  - built-in schemas 延迟加载；
  - cooperative cancellation context；
  - delegate approval routing；
  - legacy native tool adapters 退役。
- **Hermes Agent**
  - MCP schema 深层嵌套导致 RecursionError；
  - YAML alias cycle；
  - Feishu card 深层嵌套；
  - browser tool 资源泄漏。
- **OpenClaw**
  - Tool Search 无法搜索 composed schema；
  - 大量 Agent/tool/auth orchestration deslop。
- **CoPaw**
  - `view_audio` 工具；
  - 图片工具链进入裁剪循环。
- **NanoBot**
  - malformed tool calls 后 finish reason 保留；
  - Codex 图片生成流式响应。

共同诉求：

- 工具 schema 需要支持复杂组合结构，同时要有深度预算和循环防护；
- 工具调用应具备取消、超时、资源清理和失败解释；
- 外部工具/MCP 输入必须有 size cap、depth cap、visited set；
- 多模态工具需要更直接、更统一的路由策略。

---

### 4.6 可观测性、诊断与失败可解释性

涉及项目：

- **OpenClaw**
  - AGENTS.md 超长截断无警告；
  - Worker lifecycle history；
  - Prometheus RPC method 精确标签；
  - status 区分历史更新失败与当前健康。
- **CoPaw**
  - `finish_reason="length"` 应暴露；
  - 空模型回复和 oversized prompt 应明确提示。
- **ZeroClaw**
  - per-target config application results；
  - model fallback notices。
- **Hermes Agent**
  - provider fallback credential 误判；
  - 插件 enabled/disabled 冲突无 warning；
  - Desktop/Windows 诊断日志不足。
- **IronClaw**
  - doctor 通过但 serve 失败，说明诊断覆盖不足。
- **NanoBot**
  - WebUI 初始读取失败不能伪装成空状态。

共同诉求：

- 失败不能静默；
- doctor/status 需要覆盖真实运行路径；
- 配置应用、模型 fallback、工具调用、会话状态和更新结果都应可审计；
- UI/CLI 应给出用户可操作的修复建议。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 / 路线特征 |
|---|---|---|---|
| **OpenClaw** | Gateway、Agent、Doctor、多渠道交付、升级可靠性 | 自托管个人 AI 助手、团队部署、需要稳定升级和多渠道接入的用户 | Gateway-centric，重视 state root 所有权、Doctor recovery、extended-stable |
| **Hermes Agent** | Desktop/CLI、浏览器工具、Provider fallback、Claude Code/MCP 生态 | 桌面用户、开发者、重度自动化用户 | Desktop + CLI + tools，集成面广，Windows 和长会话压力突出 |
| **ZeroClaw** | Runtime/Daemon、配置系统、工具治理、供应链安全、ZeroCode | 偏工程化、可扩展 runtime、复杂部署用户 | Runtime/daemon-centric，强工程治理，risk/size/stacked 标签体系清晰 |
| **NanoBot** | Provider 兼容、WebUI、QQ/IM 适配、轻量修复 | 多 Provider 用户、WebUI 用户、中文 IM 场景用户 | 响应快，PR 粒度较小，偏稳定性修复和兼容层打磨 |
| **NanoClaw** | 安装更新、channels 分支、容器、Discord/Matrix 等渠道 | 自托管、多渠道、容器化部署用户 | channels 分支治理明显，安装/更新链路仍需加固 |
| **CoPaw / QwenPaw** | 多模态、企业 IM、前端体验、跨实例 Agent 协作 | 多模态用户、飞书/企业协作用户、移动端控制台用户 | 强调工具扩展和产品体验，静默失败问题较集中 |
| **PicoClaw** | Web Console、自托管部署 | 轻量自托管、内网多服务部署用户 | 当前关注 base path / reverse proxy prefix，活动低 |
| **IronClaw** | 本地开发、扩展 web-app、凭据管理 | Rust/本地开发者、extension 开发者 | 今日问题集中在 credential backend 与 doctor 覆盖 |
| **NullClaw / LobsterAI / TinyClaw / Moltis / ZeptoClaw** | 今日无可观察动态 | 暂无法判断 | 暂无活动信号 |

---

## 6. 社区热度与成熟度

### 6.1 第一梯队：高活跃、复杂工程治理阶段

项目：

- **Hermes Agent**：50 Issues / 50 PR
- **ZeroClaw**：7 Issues / 46 PR
- **OpenClaw**：10 Issues / 38 PR，且有 2 个 Release

特点：

- 社区反馈密集；
- 代码变更多，且覆盖核心路径；
- 已进入长期运行、跨平台、供应链、状态恢复、Provider 兼容等复杂问题区；
- 风险主要来自变更面过大、PR 堆叠、核心模块重构和回归测试压力。

成熟度判断：

- **OpenClaw**：更成熟，因有 latest + extended-stable 发布线；
- **ZeroClaw**：工程治理意识强，但 PR 积压明显；
- **Hermes Agent**：生态集成广、反馈多，但稳定性债务较重。

---

### 6.2 第二梯队：活跃修复与功能补齐阶段

项目：

- **NanoClaw**：3 Issues / 13 PR
- **CoPaw**：6 Issues / 6 PR
- **NanoBot**：3 Issues / 5 PR

特点：

- Issue 到 PR 响应速度较快；
- 多数变更围绕具体用户痛点；
- 还没有今日 Release；
- 当前关键是合并节奏和稳定性验证。

成熟度判断：

- **NanoBot**：修复链路健康，PR 粒度适中；
- **CoPaw**：产品能力扩展明显，但静默失败类问题需要优先收敛；
- **NanoClaw**：活跃度高，但 update/rollback 数据安全风险较严重。

---

### 6.3 第三梯队：低活跃、局部需求或单点问题阶段

项目：

- **PicoClaw**：1 Issue / 0 PR
- **IronClaw**：1 Issue / 0 PR

特点：

- 今日只有单点反馈；
- 问题虽然少，但对目标用户可能阻断性强；
- 需要观察维护响应速度。

成熟度判断：

- **PicoClaw**：反映部署灵活性诉求；
- **IronClaw**：反映本地开发启动与凭据诊断缺口。

---

### 6.4 静默项目

项目：

- NullClaw
- LobsterAI
- TinyClaw
- Moltis
- ZeptoClaw

特点：

- 过去 24 小时无 Issue、PR、Release；
- 无法仅凭今日数据判断长期健康度；
- 对技术选型者而言，需要结合更长周期活跃度评估维护风险。

---

## 7. 值得关注的趋势信号

### 7.1 “Agent 可用”正在升级为“Agent 可运维”

多个项目不再只关注模型调用，而是在处理：

- 更新失败如何恢复；
- 会话卡死如何 settlement；
- daemon/gateway 崩溃后状态如何修复；
- Doctor/status 是否能解释真实健康状态；
- 配置应用是否能按 target 上报结果。

代表项目：

- OpenClaw：Doctor recovery、status 健康区分；
- ZeroClaw：per-target config application results、daemon running settlement；
- NanoClaw：rollback 事务性；
- IronClaw：doctor 覆盖不足。

对开发者的参考价值：

> 如果构建长期运行的个人 AI 助手，必须尽早设计状态恢复、诊断命令、升级回滚和可观测性，而不是等功能完成后再补。

---

### 7.2 Provider 抽象进入“能力矩阵”时代

传统的 provider adapter 已经不够。社区正在要求系统识别：

- 哪些模型支持 `temperature`；
- 哪些模型使用 `max_completion_tokens`；
- 哪些模型支持 reasoning/thinking；
- 哪些 provider 支持 vision/tool/fallback；
- fallback 前是否应做 capability check。

代表项目：

- NanoBot：OpenAI-compatible provider 参数误删；
- CoPaw：新 GPT token 参数；
- ZeroClaw：Ollama / llama.cpp thinking controls；
- Hermes：Anthropic fallback credential、vision fallback；
- OpenClaw：模型切换状态一致性。

对开发者的参考价值：

> Provider 层应维护显式 capability registry，并让参数过滤、fallback 和错误提示可观测，避免“静默兼容”。

---

### 7.3 多渠道 Agent 的核心难点是“语义映射”，不是 API 调用

Discord、WhatsApp、Telegram、QQ、飞书、ACP 等渠道的问题显示，真正复杂的是：

- message id 内外部映射；
- reply / quote / reaction / edit 语义保留；
- delivery evidence；
- acknowledgement；
- 默认账号迁移；
- 企业 IM 中的审计信息。

代表项目：

- OpenClaw：WhatsApp、Discord、ACP；
- NanoClaw：Discord namespaced ID；
- NanoBot：QQ quoted messages；
- CoPaw：飞书 Agent/Provider/Model footer；
- Hermes：Telegram notification policy、Feishu recursion。

对开发者的参考价值：

> 多渠道架构应从第一天区分 platform message id、internal message id、session event id，并保留平台原生上下文。

---

### 7.4 静默失败正在成为社区最不能接受的体验

多个项目用户反馈的共同点是：失败可以接受，但不能无提示。

典型问题：

- AGENTS.md 规则被截断无警告；
- 模型输出因 length 截断但不提示；
- oversized prompt 返回空回复；
- 图片处理循环后无回复；
- sidebar-state 拉取失败却覆盖状态；
- plugin disabled/enabled 冲突无 warning；
- doctor 通过但 serve 失败。

代表项目：

- OpenClaw、CoPaw、NanoBot、Hermes、IronClaw、ZeroClaw。

对开发者的参考价值：

> Agent 产品需要建立统一的 failure surface：截断、取消、超时、fallback、空回复、配置冲突、工具失败都应进入用户可见事件流。

---

### 7.5 多模态能力从“新增工具”走向“统一路由与失败处理”

CoPaw 新增 `view_audio`，同时暴露图片路由进入 Bash+PIL 裁剪循环的问题；NanoBot 修复 Codex 图片生成流式响应；Hermes 存在 vision fallback 能力校验问题。

这说明多模态不只是添加 image/audio/video 工具，还需要：

- 模态能力发现；
- 模型能力匹配；
- 工具链终止条件；
- 流式结果可靠交付；
- 失败时反馈；
- 成本和资源控制。

对开发者的参考价值：

> 多模态 Agent 应设计 modality router，而不是让通用 Agent 自行试错工具链。

---

### 7.6 Windows、macOS、非 ASCII、局域网部署成为真实采用门槛

今日多个项目同时出现跨平台和部署环境问题：

- OpenClaw：Windows 非 ASCII 用户名、macOS 更新失败；
- Hermes：Windows Desktop 启动、托盘、ResizeObserver、更新重启；
- ZeroClaw：Windows path、null device、cron shell dialect；
- CoPaw：LAN HTTP 下 `crypto.randomUUID()` 不可用；
- PicoClaw：Nginx 子路径反向代理；
- IronClaw：macOS Apple Silicon credential backend。

对开发者的参考价值：

> 个人 AI 助手的用户环境高度异构。跨平台路径、编码、凭据、HTTP/HTTPS、安全上下文、反向代理前缀都应进入测试矩阵。

---

### 7.7 成本控制和资源治理开始浮现

Hermes 的 auxiliary fallback 成本上限、ZeroClaw 的 shell/skill RSS watchdog、browser tool 泄漏、CoPaw 图片裁剪循环、OpenClaw fleet repair 边界，都指向同一趋势：

> Agent 运行时间越长，越需要预算、熔断、资源限制和可取消机制。

对开发者的参考价值：

- 为 fallback 设置 max escalation；
- 为工具调用设置 cancellation token；
- 为子任务设置 resource budget；
- 为浏览器/容器/skill 进程设置 reaper；
- 为长期任务设置成本和时间上限。

---

## 总结判断

从今日动态看，OpenClaw、Hermes Agent、ZeroClaw 构成了当前生态的高活跃核心：OpenClaw 更偏生产化 Gateway 与稳定发布，Hermes 更偏桌面/工具生态广覆盖，ZeroClaw 更偏 runtime 与工程治理。NanoBot、NanoClaw、CoPaw 则在 Provider 兼容、多渠道、多模态和安装部署稳定性上快速补齐能力。

对技术决策者而言，选型时应重点关注三点：

1. **是否有稳定发布与回滚策略**：OpenClaw 当前优势明显；NanoClaw 暴露较高更新风险。  
2. **是否能解释和恢复失败状态**：ZeroClaw、OpenClaw 正在系统性建设；CoPaw、NanoBot、Hermes 仍有多处静默失败待收敛。  
3. **是否适配目标部署环境**：Windows/macOS、局域网 HTTP、Nginx 子路径、容器、企业 IM、多 Provider 能力矩阵，已经成为实际落地的关键门槛。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报  
日期：2026-10-03  
仓库：HKUDS/nanobot

## 1. 今日速览

过去 24 小时，NanoBot 项目新增 / 更新 Issue 3 条、PR 5 条，整体活跃度较高，且更新集中在稳定性修复、Provider 兼容性、WebUI 状态一致性和 QQ 渠道体验上。今日没有新版本发布，也没有 PR 被合并或关闭，说明项目当前处于“修复方案提交、等待评审合并”的阶段。  
从问题类型看，今日新增问题均为明确的 Bug / 回归类反馈，并且其中 3 个 Issue 已有对应修复 PR，响应速度较快，维护健康度表现良好。短期内如果这些 PR 顺利合并，下一版本很可能以稳定性修复为主。

---

## 3. 项目进展

今日没有已合并或已关闭的重要 PR，因此主分支尚未产生实际代码层面的推进。不过，过去 24 小时内有 5 个待合并 PR 提交，覆盖 Agent 执行、Provider 请求兼容性、WebUI 状态恢复、QQ 渠道消息上下文、Codex 图片生成流式响应等多个核心区域。

### 待合并但值得关注的进展

- [PR #6005 fix(providers): preserve temperature for compatible reasoning models](https://github.com/HKUDS/nanobot/pull/6005)  
  对应 [Issue #6002](https://github.com/HKUDS/nanobot/issues/6002)。该 PR 修复 `reasoningEffort` 被设置后，所有 `openai_compat` Provider 都错误丢弃 `temperature` 的问题。该问题影响范围较广，涉及摘要中提到的 38 个 OpenAI-compatible Provider，是今日最关键的 Provider 层兼容性修复。

- [PR #6009 fix(webui): preserve sidebar state after failed initial fetch](https://github.com/HKUDS/nanobot/pull/6009)  
  对应 [Issue #6008](https://github.com/HKUDS/nanobot/issues/6008)。该 PR 避免 WebUI 在首次拉取 sidebar-state 失败后，把默认空状态当作真实状态并覆盖用户已有数据，属于重要的数据安全与前端状态一致性修复。

- [PR #6007 feat(qq): show the agent the message a user quoted](https://github.com/HKUDS/nanobot/pull/6007)  
  对应 [Issue #6006](https://github.com/HKUDS/nanobot/issues/6006)。该 PR 让 QQ 渠道中的引用消息内容能传递给 Agent，有助于改善上下文理解能力，是面向 IM 场景的重要体验增强。

- [PR #6004 fix(agent): preserve finish reasons when dropping malformed tool calls](https://github.com/HKUDS/nanobot/pull/6004)  
  修复模型返回异常工具调用时，Agent Runner 可能错误处理 finish reason 的问题。该问题会影响截断响应恢复、重试逻辑和最终回答完整性，属于 Agent 执行稳定性修复。

- [PR #6011 fix(providers): stream Codex image generation responses](https://github.com/HKUDS/nanobot/pull/6011)  
  修复 Codex 图片生成请求中因使用 buffered `AsyncClient.post()` 导致已生成图片可能在连接断开或响应体未关闭时被丢弃的问题。该 PR 对图片生成链路的可靠性有直接帮助。

整体来看，虽然今日没有合并成果，但修复队列质量较高，且大多带有测试标签，说明维护流程偏向稳健。

---

## 4. 社区热点

### 1. `reasoningEffort` 与 `temperature` 兼容性问题  
- Issue：[ #6002 `reasoningEffort` silently drops `temperature` for all 38 `openai_compat` providers](https://github.com/HKUDS/nanobot/issues/6002)  
- PR：[ #6005 fix(providers): preserve temperature for compatible reasoning models](https://github.com/HKUDS/nanobot/pull/6005)  
- 评论数：1  
- 反应数：0  

这是今日唯一有评论的 Issue，也是影响面最大的反馈之一。用户指出 `reasoningEffort` 设置为非 `null` / `"none"` 后，NanoBot 会对所有 `openai_compat` Provider 停止发送 `temperature`，而不是仅针对不支持该参数的 reasoning models。  
背后的核心诉求是：多 Provider 兼容层需要更精细地判断模型能力，而不能用过宽的规则影响全部兼容 Provider。该问题尤其影响依赖采样温度控制输出风格、稳定性和创造性的用户。

### 2. WebUI sidebar 状态可能被意外覆盖  
- Issue：[ #6008 fix(webui): sidebar state is wiped after an update when the initial sidebar-state fetch fails](https://github.com/HKUDS/nanobot/issues/6008)  
- PR：[ #6009 fix(webui): preserve sidebar state after failed initial fetch](https://github.com/HKUDS/nanobot/pull/6009)  
- 评论数：0  
- 反应数：0  

该问题反映出用户对 WebUI 数据安全和状态持久化的关注。首次请求失败时，前端不应默默回退到默认状态并允许后续 mutation 覆盖真实数据。对应 PR 采用只读状态、重试读取、保持 loading 展示等方式，说明维护者已将其视作数据一致性问题而非单纯 UI bug。

### 3. QQ 引用消息上下文缺失  
- Issue：[ #6006 QQ: quoted messages never reach the agent](https://github.com/HKUDS/nanobot/issues/6006)  
- PR：[ #6007 feat(qq): show the agent the message a user quoted](https://github.com/HKUDS/nanobot/pull/6007)  
- 评论数：0  
- 反应数：0  

该反馈来自实际聊天场景：用户在 QQ 私聊或群聊中引用历史消息后，Agent 只能看到新文本，看不到被引用内容，导致无法回答依赖上下文的问题。这说明 NanoBot 的渠道适配需要更完整地保留原始消息结构，尤其是 IM 平台中的引用、回复、转发等上下文语义。

---

## 5. Bug 与稳定性

按影响范围和潜在严重程度排序如下：

### 高优先级

#### 1. OpenAI-compatible Provider 错误丢弃 `temperature`  
- Issue：[ #6002](https://github.com/HKUDS/nanobot/issues/6002)  
- Fix PR：[ #6005](https://github.com/HKUDS/nanobot/pull/6005)  
- 状态：Issue Open，PR Open  
- 影响范围：广，涉及摘要中提到的 38 个 `openai_compat` Provider  
- 严重性分析：  
  该问题会改变模型调用行为，导致用户配置的 `temperature` 不生效。对于依赖确定性输出、创意生成、A/B 调参或业务一致性的用户来说，这是隐蔽但影响较大的兼容性问题。由于行为是“静默丢弃”，排查成本较高。

#### 2. WebUI 初始 sidebar-state 获取失败后可能覆盖真实状态  
- Issue：[ #6008](https://github.com/HKUDS/nanobot/issues/6008)  
- Fix PR：[ #6009](https://github.com/HKUDS/nanobot/pull/6009)  
- 状态：Issue Open，PR Open  
- 影响范围：WebUI 用户，尤其是网络波动、认证状态短暂异常或后端临时不可用场景  
- 严重性分析：  
  该问题可能造成用户侧边栏配置被默认状态覆盖，属于潜在数据丢失 / 状态污染问题。修复方案已明确避免失败读取被当成空 store。

### 中优先级

#### 3. QQ 引用消息未传给 Agent  
- Issue：[ #6006](https://github.com/HKUDS/nanobot/issues/6006)  
- Fix PR：[ #6007](https://github.com/HKUDS/nanobot/pull/6007)  
- 状态：Issue Open，PR Open  
- 影响范围：QQ C2C 私聊与群聊中的引用回复场景  
- 严重性分析：  
  该问题不会导致系统崩溃，但会明显削弱 Agent 在即时通讯场景中的上下文理解能力。对于群聊问答、上下文追问、对历史消息解释等使用场景影响较大。

#### 4. Agent 丢弃异常 tool call 后 finish reason 保留不完整  
- PR：[ #6004](https://github.com/HKUDS/nanobot/pull/6004)  
- 状态：PR Open  
- 影响范围：工具调用链路、模型异常输出处理、截断响应恢复  
- 严重性分析：  
  当模型返回非法工具调用名时，Runner 可能在清理 tool call 后丢失 finish reason，进而把部分回答误判为完成，或在空响应上进行错误重试。该问题影响 Agent 对异常模型输出的鲁棒性。

#### 5. Codex 图片生成响应未正确流式处理，可能丢弃已生成图片  
- PR：[ #6011](https://github.com/HKUDS/nanobot/pull/6011)  
- 状态：PR Open  
- 影响范围：Codex 图片生成请求  
- 严重性分析：  
  原实现使用 buffered `AsyncClient.post()`，HTTPX 会先读取响应体，导致 parser 无法在 `response.completed` 后及时停止。在连接断开或响应体未正常关闭时，已生成图片可能被丢弃。该问题影响图片生成稳定性和用户感知可靠性。

---

## 6. 功能请求与路线图信号

今日没有典型的全新大型功能请求，但有一个明显的渠道能力增强信号：

### QQ 引用消息上下文支持  
- Issue：[ #6006](https://github.com/HKUDS/nanobot/issues/6006)  
- PR：[ #6007](https://github.com/HKUDS/nanobot/pull/6007)  

虽然该问题以 Bug 形式提交，但对应 PR 标记为 `feature`，说明维护者可能将“保留 IM 平台消息上下文”视作渠道能力演进方向。若该 PR 合并，后续路线图可能继续扩展到更多消息结构，例如回复链、转发消息、富文本元素、多媒体引用等。

### Provider 能力判定细粒度化  
- Issue：[ #6002](https://github.com/HKUDS/nanobot/issues/6002)  
- PR：[ #6005](https://github.com/HKUDS/nanobot/pull/6005)  

该问题透露出 NanoBot 在多模型 / 多 Provider 兼容层上的长期方向：从简单的后端级规则，转向基于模型能力的精确判断。随着 OpenAI-compatible 生态扩大，Provider 层的 capability detection、参数白名单 / 黑名单、模型族规则会越来越重要。

### WebUI 状态恢复机制增强  
- Issue：[ #6008](https://github.com/HKUDS/nanobot/issues/6008)  
- PR：[ #6009](https://github.com/HKUDS/nanobot/pull/6009)  

该修复体现出前端状态管理从“失败时默认可用”转向“失败时保护数据”。这可能预示 WebUI 后续会更重视离线、重试、错误可见性和数据一致性。

---

## 7. 用户反馈摘要

### 用户痛点 1：配置参数被静默忽略，难以排查  
- 来源：[Issue #6002](https://github.com/HKUDS/nanobot/issues/6002)  
用户明确指出设置 `agents.defaults.reasoningEffort` 后，`temperature` 对大量 Provider 不再发送。痛点不只是参数失效，而是“静默失效”——用户可能只观察到模型输出风格变化，却很难立即定位到请求参数被删除。

### 用户痛点 2：WebUI 网络失败可能造成持久状态污染  
- 来源：[Issue #6008](https://github.com/HKUDS/nanobot/issues/6008)  
用户关心的是首次请求失败后，前端不应把默认 sidebar 状态当成真实状态继续允许修改。该反馈说明实际使用中，用户对 WebUI 的信任建立在“不误删、不覆盖、不静默失败”的基础上。

### 用户痛点 3：IM 引用语义缺失，Agent 无法理解上下文  
- 来源：[Issue #6006](https://github.com/HKUDS/nanobot/issues/6006)  
在 QQ 私聊或群聊中，引用历史消息是一种高频交互方式。用户期望 Agent 能看到“我引用了什么”，而不仅是“我新输入了什么”。当前行为会导致追问、纠错、解释、总结等对话失败。

### 用户痛点 4：生成类任务需要更可靠的完成判定  
- 来源：[PR #6011](https://github.com/HKUDS/nanobot/pull/6011)  
Codex 图片生成已完成但可能因流式读取方式不当而被丢弃，反映用户对生成结果可靠交付的需求。生成式任务的失败体验通常更差，因为用户已经等待生成完成，却可能拿不到结果。

---

## 8. 待处理积压

基于本次提供的数据，仅包含过去 24 小时内的 Issue / PR 活动，无法判断长期未响应的历史积压项。当前可见的待处理项主要是 5 个新提交且尚未合并的 PR，建议维护者优先评审以下修复：

1. [PR #6005](https://github.com/HKUDS/nanobot/pull/6005)  
   修复 Provider 参数兼容性问题，影响范围最大，建议优先评审。

2. [PR #6009](https://github.com/HKUDS/nanobot/pull/6009)  
   修复 WebUI sidebar 状态覆盖风险，涉及用户数据安全，建议尽快验证。

3. [PR #6004](https://github.com/HKUDS/nanobot/pull/6004)  
   修复 Agent Runner 在异常 tool call 场景下的 finish reason 处理，建议纳入稳定性修复批次。

4. [PR #6007](https://github.com/HKUDS/nanobot/pull/6007)  
   增强 QQ 引用消息上下文传递，建议结合 QQ 渠道测试用例重点评审。

5. [PR #6011](https://github.com/HKUDS/nanobot/pull/6011)  
   修复 Codex 图片生成流式响应处理，建议关注网络中断、`response.completed` 后 body 未关闭等边界场景。

---

## 项目健康度判断

NanoBot 今日没有发布和合并，但 Issue 到 PR 的响应链路非常短，3 个新增 Issue 均已有对应修复 PR 或相关修复方案，说明维护响应积极。当前风险主要集中在待评审 PR 堆积，如果这些修复无法及时合并，Provider 行为异常、WebUI 状态覆盖和渠道上下文缺失会继续影响用户体验。整体来看，项目处于健康的高活跃修复周期，短期重点应放在评审、测试和合并稳定性修复上。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报｜2026-10-03

## 1. 今日速览

过去 24 小时 Hermes Agent 维持了**极高活跃度**：Issues 更新 50 条，PR 更新 50 条，其中待合并 PR 39 条，已合并或关闭 PR 11 条。  
今日没有新版本发布，项目主要处于**密集缺陷暴露、修复 PR 回流、历史 PR 重提与再集成**阶段。  
从议题分布看，Desktop、CLI、Agent、插件系统、Windows 平台、会话状态与认证/Provider 路径是今日最活跃区域。  
整体健康度呈现“双高”状态：社区反馈非常活跃、修复供给充足，但同时 P1/P2 级稳定性、数据完整性、Windows 兼容性与成本控制问题集中出现，短期维护压力较大。

---

## 2. 项目进展

> 今日无新版本发布。以下为过去 24 小时内关闭/推进的重要 PR。由于数据中未明确区分“已合并”和“已关闭未合并”，以下对 CLOSED PR 使用“已关闭/可能已完成处理”表述。

### 重要已关闭 / 已处理 PR

#### 浏览器工具：修复真实 profile 下 agent-browser 输出捕获卡死  
- PR：[#131988](https://github.com/NousResearch/hermes-agent/pull/131988)  
- 状态：CLOSED  
- 类型：Bug 修复，`tool/browser`，P2  
- 摘要：修复使用真实浏览器 profile 时，agent-browser 输出捕获可能导致工具调用卡死的问题，并引入锁边界处理。  
- 影响：该问题直接影响浏览器工具可用性，尤其是长任务、真实 profile 自动化和 Desktop/Agent 集成场景。若已合并，将显著改善 browser tool 的稳定性。

#### 自动格式化 PR 关闭  
- PR：[#131995](https://github.com/NousResearch/hermes-agent/pull/131995)、[#131992](https://github.com/NousResearch/hermes-agent/pull/131992)  
- 状态：CLOSED  
- 类型：自动 lint/format 修复  
- 摘要：由 `hermes-seaeye[bot]` 自动生成，用于 JS 格式化与 lint 修复。  
- 影响：属于代码质量维护类变更，说明自动化维护流程在持续运行，但也可能因 main 分支移动或 CI 状态而自动关闭并重开。

### 今日打开并值得关注的修复 PR

#### CLI 安装/更新：阻止 launcher 指向 scratch fixture 的 Python  
- PR：[#131994](https://github.com/NousResearch/hermes-agent/pull/131994)  
- 状态：OPEN  
- 严重度：P1  
- 关联问题：[#131745](https://github.com/NousResearch/hermes-agent/issues/131745)  
- 摘要：防止 `stage_launcher` 发布绑定到 scratch fixture store Python 的 launcher，避免静默破坏用户安装环境。  
- 影响：这是安装/更新链路的高优先级修复，若进入下一版本，可降低用户环境被错误 launcher 污染的风险。

#### Desktop：大量历史 UI/会话问题被重提并适配当前 main  
今日多个 PR 由维护者或贡献者将历史 PR 重新落到当前 main，包括：

- Windows SSH probe 稳定性：[#132013](https://github.com/NousResearch/hermes-agent/pull/132013)  
- Windows SSH probe 错误类型保留：[#132010](https://github.com/NousResearch/hermes-agent/pull/132010)  
- Archived sessions 分页：[#132009](https://github.com/NousResearch/hermes-agent/pull/132009)  
- 跨 profile 侧边栏项目去重：[#132008](https://github.com/NousResearch/hermes-agent/pull/132008)  
- Cron 文本按 Unicode 边界截断：[#132007](https://github.com/NousResearch/hermes-agent/pull/132007)  
- Review scope 窄宽度布局修复：[#132004](https://github.com/NousResearch/hermes-agent/pull/132004)  
- OAuth 成功后刷新 readiness：[#132000](https://github.com/NousResearch/hermes-agent/pull/132000)  
- 聊天滚动条不覆盖右侧 sash：[#131999](https://github.com/NousResearch/hermes-agent/pull/131999)  
- Composer Send 按钮状态同步：[#131996](https://github.com/NousResearch/hermes-agent/pull/131996)

这些 PR 共同表明：Desktop 体验正在被系统性修复，重点集中在 Windows、会话列表、OAuth 状态、UI 布局与输入交互可靠性。

---

## 3. 社区热点

### 1. bare Node 环境下 `CloseEvent` 缺失导致测试失败  
- Issue：[#131956](https://github.com/NousResearch/hermes-agent/issues/131956)  
- 评论数：3  
- 标签：`type/test`, `comp/gateway`, `P3`  
- 摘要：`apps/shared` 中某个测试在裸 Node 环境失败，因为 Node 全局没有 `CloseEvent`。  
- 诉求分析：这是典型测试环境隔离问题。社区希望测试不依赖浏览器全局对象，或者通过 polyfill/环境 mock 解决。虽然是 P3，但影响 CI 可靠性和贡献者体验。

### 2. Anthropic 仅作为 fallback provider 时被错误跳过  
- Issue：[#131993](https://github.com/NousResearch/hermes-agent/issues/131993)  
- 评论数：2  
- 标签：`type/bug`, `comp/agent`, `provider/anthropic`, `area/auth`, `P2`  
- 摘要：当 `anthropic` 只出现在 `fallback_providers` 中时，借用的 `claude_code` credential 未填充，导致 fallback 时被误判为 credential pool exhausted。  
- 诉求分析：用户依赖多 provider fallback 来保证可用性。该问题暴露出 provider credential 初始化与 fallback 链之间存在状态不一致，属于可靠性与认证边界问题。

### 3. Desktop Artifacts 中 CJK 文件名被百分号编码显示  
- Issue：[#131978](https://github.com/NousResearch/hermes-agent/issues/131978)  
- 评论数：2  
- 标签：`type/bug`, `comp/desktop`, `P3`  
- 摘要：例如 `测试文件.xlsx` 被显示为 `%E6%B5%8B...xlsx`。  
- 诉求分析：国际化与本地文件处理体验问题。中文、日文、韩文等非 ASCII 文件名用户会直接感知到体验下降。

### 4. Windows 更新后 dashboard/serve 无法自动重启  
- Issue：[#131864](https://github.com/NousResearch/hermes-agent/issues/131864)  
- 评论数：2  
- 标签：`comp/cli`, `comp/dashboard`, `platform/windows`, `P2`  
- 摘要：Windows 上更新清理会停止手动启动的 `hermes serve` 后端，但 respawn 路径因 win32 下跳过 ownership/argv snapshot 而无法执行，最终更新退出 1。  
- 诉求分析：Windows 安装更新链路的可靠性问题，影响普通用户升级体验。结合今日多个 Windows Desktop 问题，Windows 平台稳定性仍是重点风险区。

### 5. Desktop 中相对文件 Markdown 链接无法打开预览  
- Issue：[#131842](https://github.com/NousResearch/hermes-agent/issues/131842)  
- 评论数：2  
- 标签：`comp/desktop`, `P3`  
- 摘要：助手输出 `[Evidence](docs/report.md)` 这类相对路径链接时，Desktop 未路由到文件预览，反而被 Electron window-open 策略拒绝。  
- 诉求分析：用户希望 Agent 输出的证据、报告、摘要链接能直接在 Desktop 内查看，这是文档工作流和代码审查体验的重要部分。

---

## 4. Bug 与稳定性

### P1：数据完整性 / 安装破坏类

#### FTS5 shadow table B-tree 损坏，容器非正常停止后 `state.db` 腐化  
- Issue：[#131851](https://github.com/NousResearch/hermes-agent/issues/131851)  
- 严重度：P1  
- 组件：`comp/agent`, `area/docker`, `area/sessions`  
- 摘要：大型 `state.db` 在 Docker/s6-overlay 非正常停止后，SQLite FTS5 shadow table 出现 `Rowid out of order`、`2nd reference to page` 等 B-tree corruption。  
- 风险：会话数据库损坏、历史消息检索不可用、潜在数据丢失。  
- 已有 fix PR：未在今日数据中看到直接对应 PR。

#### launcher 可能绑定 scratch fixture Python，污染真实安装  
- PR：[#131994](https://github.com/NousResearch/hermes-agent/pull/131994)  
- 严重度：P1  
- 组件：`comp/cli`, `area/install-update`  
- 摘要：修复发布 launcher 时误指向 scratch 缓存 Python 的风险。  
- 状态：已有 OPEN 修复 PR。  
- 风险：安装环境被静默破坏，用户难以诊断。

---

### P2：Provider、认证、会话、工具调用与 Windows 稳定性

#### Anthropic fallback credential 未初始化  
- Issue：[#131993](https://github.com/NousResearch/hermes-agent/issues/131993)  
- 严重度：P2  
- 组件：`comp/agent`, `provider/anthropic`, `area/auth`, `area/profiles`  
- 状态：未见对应 fix PR。  
- 风险：fallback 链不可用，主 provider 429 后无法按预期降级。

#### Windows Desktop 启动卡住 35 秒以上，超过 readiness probe  
- Issue：[#131934](https://github.com/NousResearch/hermes-agent/issues/131934)  
- 严重度：P2  
- 组件：`comp/desktop`, `platform/windows`  
- 摘要：Windows 11 原生环境下 Desktop backend 启动阶段 asyncio event loop 卡住 35 秒以上，导致 15 秒 readiness probe 超时。  
- 状态：未见直接 fix PR。  
- 风险：用户启动失败，且日志空窗使诊断困难。

#### Windows tray hide/restore 后窗口可见但无法输入  
- Issue：[#131991](https://github.com/NousResearch/hermes-agent/issues/131991)  
- 严重度：P2  
- 组件：`comp/desktop`, `platform/windows`  
- 摘要：最小化到托盘再恢复后，窗口显示但无法点击、输入或拖动，并出现 `Object has been destroyed`。  
- 状态：未见直接 fix PR。  
- 风险：Desktop 交互中断，后端虽可运行但前端不可用。

#### Desktop 长会话触发大量 ResizeObserver 通知并冻结 55 秒  
- Issue：[#131998](https://github.com/NousResearch/hermes-agent/issues/131998)  
- 严重度：P2  
- 组件：`comp/desktop`, `platform/windows`  
- 摘要：长会话中出现 5,474 条 `ResizeObserver loop` 通知，约 100/s，导致窗口完全无响应 55 秒。  
- 状态：未见直接 fix PR。  
- 风险：长会话用户体验严重下降。

#### Telegram standalone send 忽略通知配置  
- Issue：[#131924](https://github.com/NousResearch/hermes-agent/issues/131924)  
- 严重度：P2  
- 组件：`comp/tools`, `platform/telegram`, `area/config`  
- 摘要：`hermes send` 或 standalone Telegram 发送未遵循 `display.platforms.telegram.notifications`。  
- 状态：未见 fix PR。  
- 风险：通知策略不一致，可能造成过度打扰或漏提醒。

#### 本地 skill 在子 profile 中静默不可见  
- Issue：[#131818](https://github.com/NousResearch/hermes-agent/issues/131818)  
- 严重度：P2  
- 组件：`comp/cli`, `tool/skills`, `area/profiles`  
- 摘要：本地 `SKILL.md` 在非默认 profile 中存在且权限正确，但 `hermes skills list -p <profile>` 完全不显示。  
- 状态：未见 fix PR。  
- 风险：profile 隔离和技能发现机制不透明，用户难以诊断。

#### Vault 集成因 Pydantic `extra_forbidden` 截断凭据列表  
- Issue：[#131814](https://github.com/NousResearch/hermes-agent/issues/131814)  
- 严重度：P2  
- 组件：`tool/browser`  
- 摘要：Bitwarden 返回带额外字段如 `allowed_origins` 的 item，Pydantic model 使用 `extra='forbid'` 导致 ValidationError，最终只返回部分凭据。  
- 状态：未见 fix PR。  
- 风险：凭据读取不完整，浏览器自动化和登录流程失败。

#### agent-browser pidless socket dir 被删除但 daemon 未杀死，Chrome 长时间高 CPU 泄漏  
- Issue：[#131822](https://github.com/NousResearch/hermes-agent/issues/131822)  
- 严重度：P2  
- 组件：`comp/tools`, `tool/browser`, `area/sessions`  
- 摘要：macOS 上泄漏的 headless Chrome 持续运行 3 天 10 小时，占用约 7/10 CPU 核心。  
- 状态：相关 browser tool 稳定性 PR [#131988](https://github.com/NousResearch/hermes-agent/pull/131988) 已关闭，但是否覆盖此问题不明确。  
- 风险：资源泄漏、机器性能受损、用户信任下降。

---

### P3：UI、兼容性、配置与边界输入

#### Feishu 深层嵌套 interactive message 触发 RecursionError  
- Issue：[#132003](https://github.com/NousResearch/hermes-agent/issues/132003)  
- 严重度：P3  
- 组件：`comp/plugins`, `platform/feishu`  
- 摘要：`_walk_nodes()` 对用户输入的 card JSON 无深度预算，深层嵌套会导致 RecursionError。  
- 状态：未见 fix PR。  
- 风险：消息入口可被构造输入打崩，属于消息投递稳定性问题。

#### YAML alias cycle 触发 locale flattening RecursionError  
- Issue：[#132006](https://github.com/NousResearch/hermes-agent/issues/132006)  
- 严重度：未标 P，但属于崩溃类  
- 摘要：合法 YAML anchors/aliases 可构成自引用结构，`flatten()` 与 `non_text_leaves()` 无 cycle guard。  
- 状态：未见 fix PR。  
- 风险：配置/国际化文件解析可被小输入打崩。

#### 外部工具/MCP schema 深层嵌套导致 Provider schema normalization RecursionError  
- Issue：[#132005](https://github.com/NousResearch/hermes-agent/issues/132005)  
- 严重度：P2  
- 组件：`tool/mcp`, `provider/gemini`, `provider/kimi`  
- 摘要：外部工具提供的 `inputSchema` 在 schema sanitizer 中递归处理，无深度预算。  
- 状态：未见 fix PR。  
- 风险：MCP 或外部工具可导致 provider dispatch 前崩溃，影响工具生态安全性。

#### Desktop auto-TTS 重复合成并播放回复  
- Issue：[#131990](https://github.com/NousResearch/hermes-agent/issues/131990)  
- 严重度：P3  
- 组件：`comp/desktop`, `tool/tts`  
- 摘要：同一回复被保存为两个几乎同时生成的临时音频并播放两次。  
- 状态：未见 fix PR。  
- 风险：用户体验问题，也可能带来额外 TTS 成本。

#### 插件 disabled 与 enabled 同时包含同一插件时静默不加载  
- Issue：[#131980](https://github.com/NousResearch/hermes-agent/issues/131980)  
- 严重度：P3  
- 组件：`comp/cli`, `comp/plugins`, `area/config`  
- 摘要：disabled 优先导致插件不加载，但无 warning，只有 DEBUG 日志。  
- 状态：未见 fix PR。  
- 风险：配置冲突不可见，影响插件可诊断性。

#### interactive `hermes plugins` 保存后禁用未勾选 bundled platform  
- Issue：[#131974](https://github.com/NousResearch/hermes-agent/issues/131974)  
- 严重度：P3  
- 组件：`comp/cli`, `comp/plugins`, `area/config`  
- 摘要：交互式插件界面将未勾选 bundled platform 写入 `plugins.disabled`，可能导致 gateway 下次启动时关闭本应由 `gateway.platforms.<name>.enabled` 控制的平台。  
- 状态：未见 fix PR。  
- 风险：配置 UI 与实际加载语义不一致。

---

## 5. 功能请求与路线图信号

### 辅助模型 fallback 需要跨请求熔断与成本上限  
- Issue：[#131981](https://github.com/NousResearch/hermes-agent/issues/131981)  
- 类型：Feature  
- 组件：`comp/agent`, `area/usage-cost`  
- 摘要：当前 auxiliary fallback 单次请求有界，但跨请求没有总量上限。用户观察到 kanban decomposer 在 24 小时内触发 50+ 次 fallback escalation。  
- 路线图信号：这是明显的成本控制需求，可能发展为 `max_escalations_per_run`、fallback circuit breaker、budget guard 等能力。考虑到 AI Agent 长时间运行场景，这类经济型 DoS 防护优先级可能上升。

### Vision fallback 到主模型前需要能力校验  
- Issue：[#131982](https://github.com/NousResearch/hermes-agent/issues/131982)  
- 类型：Feature / Bug 边界  
- 组件：`comp/agent`, `tool/vision`, `area/local-models`  
- 摘要：`auxiliary.vision` 超时后回退到主模型，但主模型为 custom OpenAI-compatible GLM 时，fallback 路径却走 Gemini v1beta 格式，导致必然 404。  
- 路线图信号：用户希望 Hermes 在 fallback 前做 provider capability check，而不是盲目尝试。该需求与多 provider、多本地模型支持强相关。

### Bots tab 在无 profiles 时应显示 default agent  
- Issue：[#131975](https://github.com/NousResearch/hermes-agent/issues/131975)  
- 类型：Feature  
- 组件：`comp/gateway`, `comp/desktop`, `area/profiles`  
- 摘要：默认安装、无 profile 配置时，Desktop Bots tab 为空，甚至可能只显示 peer bot。  
- 路线图信号：这反映出 profile/bot 概念对新用户不够直观。下一步可能需要优化默认 agent 的可见性和 onboarding 体验。

### Peer message queue 到已有 session  
- PR：[#131987](https://github.com/NousResearch/hermes-agent/pull/131987)  
- 类型：Feature  
- 组件：`comp/tui`, `area/sessions`  
- 摘要：新增 `session.peer_deliver` admission，使 peer 消息可排队进入已有 Desktop session，而不重绑定 transport，也不中断 active turn。  
- 路线图信号：该 PR 指向多端、多 agent、peer bot 协作场景，是 Hermes 向更复杂协作型 agent 平台演进的信号。

### Claude Code hook 兼容性  
- PR：[#132012](https://github.com/NousResearch/hermes-agent/pull/132012)  
- 类型：兼容性/迁移体验  
- 摘要：`hermes import-agent claude-code` 会携带 `settings.json` 中 hooks 配置，并兼容 Claude Code 的 `hookSpecificOutput` 嵌套返回结构。  
- 路线图信号：Hermes 正在强化与 Claude Code 生态的迁移兼容性，降低用户从其他 agent 工具迁移的成本。

---

## 6. 用户反馈摘要

### 主要痛点

1. **Windows Desktop 稳定性仍是高频痛点**  
   多个 Issue 指向 Windows 上启动超时、托盘恢复后窗口失去输入、ResizeObserver 风暴、更新后 serve/dashboard 无法重启等问题。  
   相关链接：  
   - [#131934](https://github.com/NousResearch/hermes-agent/issues/131934)  
   - [#131991](https://github.com/NousResearch/hermes-agent/issues/131991)  
   - [#131998](https://github.com/NousResearch/hermes-agent/issues/131998)  
   - [#131864](https://github.com/NousResearch/hermes-agent/issues/131864)

2. **长会话与会话状态可靠性不足**  
   用户报告长聊天 summarizing 卡住、会话导出历史错误、SQLite FTS 损坏、session/sidebar 截断等问题。  
   相关链接：  
   - [#131947](https://github.com/NousResearch/hermes-agent/issues/131947)  
   - [#131851](https://github.com/NousResearch/hermes-agent/issues/131851)  
   - [#131997](https://github.com/NousResearch/hermes-agent/pull/131997)  
   - [#132001](https://github.com/NousResearch/hermes-agent/pull/132001)

3. **Provider fallback 与认证链路不透明**  
   Anthropic fallback 被误判 credential pool exhausted、OpenRouter Deepseek 工具调用失效、vision fallback 走错 API mode，都说明 provider abstraction 仍存在边界条件问题。  
   相关链接：  
   - [#131993](https://github.com/NousResearch/hermes-agent/issues/131993)  
   - [#131855](https://github.com/NousResearch/hermes-agent/issues/131855)  
   - [#131982](https://github.com/NousResearch/hermes-agent/issues/131982)

4. **插件与 profile 配置可诊断性不足**  
   用户遇到 skill 静默消失、插件 disabled/enabled 冲突无 warning、交互式插件页面保存后意外禁用平台等问题。  
   相关链接：  
   - [#131818](https://github.com/NousResearch/hermes-agent/issues/131818)  
   - [#131980](https://github.com/NousResearch/hermes-agent/issues/131980)  
   - [#131974](https://github.com/NousResearch/hermes-agent/issues/131974)

5. **国际化与非 ASCII 场景仍需打磨**  
   CJK 文件名百分号编码、Unicode 截断 PR、俄语用户反馈 Desktop 长会话问题，说明 Hermes 用户群正在国际化，UI 与文件处理需要更稳健。  
   相关链接：  
   - [#131978](https://github.com/NousResearch/hermes-agent/issues/131978)  
   - [#132007](https://github.com/NousResearch/hermes-agent/pull/132007)  
   - [#131947](https://github.com/NousResearch/hermes-agent/issues/131947)

### 用户满意点 / 正向信号

- 社区能提交非常详细的复现、日志、根因分析与建议，反馈质量高。
- 多个历史 PR 被重新适配到当前 main，说明维护者仍在积极回收社区贡献。
- 自动化 formatting/lint 工作流持续运行，工程维护基础设施较活跃。
- 对 Claude Code、MCP、OpenRouter、Gemini、Kimi、本地模型等生态兼容需求旺盛，表明 Hermes 的用户使用场景正在扩展。

---

## 7. 待处理积压

> 数据窗口仅覆盖过去 24 小时，无法完整判断“长期未响应”。以下列出今日暴露但尚未看到明确修复 PR 的高影响问题，建议维护者优先 triage。

### 高优先级建议关注

1. **SQLite FTS5 数据库损坏与会话状态恢复**  
   - Issue：[#131851](https://github.com/NousResearch/hermes-agent/issues/131851)  
   - 原因：P1，涉及 state.db 腐化和数据完整性。  
   - 建议：尽快确认复现路径，评估 checkpoint、WAL、FTS rebuild、容器 shutdown grace period 与恢复工具方案。

2. **Anthropic fallback credential pool 误判**  
   - Issue：[#131993](https://github.com/NousResearch/hermes-agent/issues/131993)  
   - 原因：P2，影响 provider fallback 可靠性。  
   - 建议：检查 fallback-only provider 的 credential hydration 流程，补充 profile/fallback 单元测试。

3. **Windows Desktop 启动/托盘/长会话冻结问题合集**  
   - Issues：[#131934](https://github.com/NousResearch/hermes-agent/issues/131934)、[#131991](https://github.com/NousResearch/hermes-agent/issues/131991)、[#131998](https://github.com/NousResearch/hermes-agent/issues/131998)  
   - 原因：集中影响 Windows 用户基础体验。  
   - 建议：建立 Windows native 回归测试矩阵，重点覆盖启动 readiness、Electron BrowserWindow 生命周期、托盘恢复与长会话 UI 性能。

4. **递归深度/循环引用防护缺失**  
   - Issues：[#132003](https://github.com/NousResearch/hermes-agent/issues/132003)、[#132005](https://github.com/NousResearch/hermes-agent/issues/132005)、[#132006](https://github.com/NousResearch/hermes-agent/issues/132006)  
   - 原因：Feishu message、MCP schema、YAML locale 都出现 RecursionError 模式，说明通用输入防御不足。  
   - 建议：统一引入 depth budget、visited set、schema size cap，并为外部输入路径添加 fuzz/regression tests。

5. **Browser tool 资源泄漏与 daemon 清理**  
   - Issue：[#131822](https://github.com/NousResearch/hermes-agent/issues/131822)  
   - 相关 PR：[#131988](https://github.com/NousResearch/hermes-agent/pull/131988)  
   - 原因：真实用户机器出现多日高 CPU 泄漏。  
   - 建议：确认 #131988 是否覆盖 pidless socket dir 场景；若未覆盖，应追加 reaper 逻辑与 Chrome process tree 清理策略。

6. **成本控制与 fallback 熔断**  
   - Issue：[#131981](https://github.com/NousResearch/hermes-agent/issues/131981)  
   - 原因：长时间 agent 运行中，fallback escalation 可能转化为经济型 DoS。  
   - 建议：将预算、熔断、最大 fallback 次数纳入 agent runtime 配置，并提供日志/指标可观测性。

---

## 总体判断

Hermes Agent 今日处于**高活跃、高修复、高风险并存**状态。PR 侧显示维护者和社区正在快速回收历史修复，尤其是 Desktop、Windows、CLI 安装、会话与 UI 体验方向；Issue 侧则集中暴露出数据完整性、Provider fallback、Windows 稳定性、递归输入防护和成本控制问题。

短期建议维护优先级：

1. 先处理 P1 数据/安装破坏类问题：[#131851](https://github.com/NousResearch/hermes-agent/issues/131851)、[#131994](https://github.com/NousResearch/hermes-agent/pull/131994)  
2. 建立 Windows Desktop 稳定性专项 triage  
3. 为外部输入路径统一增加递归深度与循环引用保护  
4. 合并低风险 Desktop 修复 PR，快速改善用户可见体验  
5. 将 fallback 成本控制纳入下一版本路线图  


</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报  
**日期：2026-10-03**  
**仓库：** https://github.com/sipeed/picoclaw

---

## 1. 今日速览

过去 24 小时内，PicoClaw 项目共有 **1 条 Issue 更新**，无 Pull Request 更新，也没有新版本发布。整体活跃度偏低，今日主要动态集中在一个新的功能请求：用户希望 PicoClaw Web Console 能更好地支持通过 Nginx 挂载到子路径，例如 `/pico/`。  

从内容看，该 Issue 不是简单的部署咨询，而是指出了当前前后端路径设计中对根路径 `/` 的依赖，涉及 API、登录页、静态资源、WebSocket 与附件访问等多个模块。该反馈对企业内网部署、多服务共域名托管、网关统一入口等场景具有一定代表性，值得维护者关注。

---

## 3. 项目进展

今日无新的 PR 合并、关闭或更新。

- **合并 PR：0**
- **关闭 PR：0**
- **待合并 PR：0**

因此，过去 24 小时内项目代码层面暂无可观察的功能推进或修复落地。项目进展主要体现在社区侧新增了一个部署能力相关的功能诉求。

---

## 4. 社区热点

### Issue #3415：支持反向代理到子路径 `/pico/`

- **状态：** Open  
- **作者：** altman08  
- **创建时间：** 2026-10-02  
- **评论数：** 0  
- **点赞数：** 0  
- **链接：** https://github.com/sipeed/picoclaw/issues/3415  

用户希望能够通过 Nginx 将 PicoClaw Web Console 挂载到同一域名的子路径下，例如：

```text
https://example.com/pico/
```

而不是必须占用网站根路径。

该需求涉及以下访问路径：

- 页面路由
- 登录页面，例如 `/launcher-login`
- API 请求，例如 `/api/...`
- WebSocket，例如 `/pico/ws`
- 静态资源
- 附件请求

用户指出，目前前端与后端部分地址存在根路径假设，仅通过 Nginx 做路径转发无法完整解决问题。

**背后诉求分析：**

这是典型的“子路径部署 / base path / reverse proxy prefix”需求，常见于以下场景：

1. 同一域名下部署多个 Web 服务；
2. 通过统一网关或 Nginx 管理多个内部应用；
3. 避免为 PicoClaw 单独分配子域名；
4. 在企业、实验室、家庭服务器等环境中进行集中入口管理；
5. WebSocket、附件、API 与前端资源需要统一遵循路径前缀。

虽然该 Issue 当前没有评论和反应，但它触及部署架构兼容性问题，可能影响自托管用户的部署体验。

---

## 5. Bug 与稳定性

今日未发现新的 Bug、崩溃、回归或稳定性问题报告。

当前新增 Issue 属于功能请求 / 部署能力增强，不属于已确认缺陷。

| 严重程度 | 问题 | 状态 | Fix PR |
|---|---|---|---|
| - | 今日无新增 Bug 报告 | - | - |

---

## 6. 功能请求与路线图信号

### 子路径反向代理支持

- **Issue：** https://github.com/sipeed/picoclaw/issues/3415  
- **类型：** Feature Request  
- **状态：** Open  
- **相关 PR：** 暂无  

用户建议为 Web Launcher 增加可选启动参数，用于配置基础路径前缀，例如支持将应用部署在 `/pico/` 下。

从描述看，该需求可能需要覆盖多个层面：

1. **前端构建或运行时配置**
   - 支持 `base path` / `public path`
   - 静态资源路径使用相对路径或可配置前缀
   - 前端路由适配非根路径部署

2. **后端 API 前缀适配**
   - `/api/...` 需要支持在 `/pico/api/...` 下工作
   - 登录、鉴权、附件等接口需要统一前缀

3. **WebSocket 路径适配**
   - 当前如 `/pico/ws` 这类路径需要确认是否与部署前缀冲突
   - 前端应根据 base path 动态拼接 WebSocket 地址

4. **Nginx 配置文档**
   - 即使代码支持，仍需要官方示例配置
   - 特别是 WebSocket upgrade、静态资源缓存、路径 rewrite 等细节

5. **兼容性要求**
   - 默认仍应保持根路径部署，避免破坏已有用户配置
   - 新增参数应为可选项，降低迁移风险

**是否可能进入下一版本：**

目前没有对应 PR，也没有维护者回复，因此无法判断是否已进入近期计划。但从需求复杂度和部署价值看，它属于中等优先级的基础设施增强项。如果项目希望提升自托管和多服务部署体验，该功能具备进入后续版本路线图的合理性。

---

## 7. 用户反馈摘要

今日唯一新增反馈来自 Issue #3415，主要痛点如下：

### 用户痛点

- 当前 PicoClaw Web Console 默认更适合部署在网站根路径；
- 用户希望将其挂载到 `/pico/` 等子路径下；
- 仅依赖 Nginx 反向代理无法完整解决路径问题；
- 前端与后端部分资源、API、登录、WebSocket、附件请求可能仍指向根路径；
- 多服务共域名部署时存在集成障碍。

### 使用场景

用户的典型部署目标是：

```text
https://example.com/pico/
```

并希望所有相关请求都保持在该路径前缀下，而不是混用：

```text
/api/...
/launcher-login
/pico/ws
```

这反映出用户可能正在进行统一域名、统一网关或已有站点下的服务集成。

### 满意与不满意点

- **满意点：** 用户愿意继续使用 PicoClaw Web Console，并希望将其纳入现有服务体系。
- **不满意点：** 当前部署路径灵活性不足，根路径耦合较强，影响反向代理场景下的可用性。

---

## 8. 待处理积压

基于今日提供的数据，暂无长期未响应 Issue 或 PR 的完整列表，因此无法判断历史积压情况。

不过，今日新增的 Issue #3415 建议维护者尽早确认方向：

- **Issue：** https://github.com/sipeed/picoclaw/issues/3415  
- **建议处理方式：**
  1. 标记为 `feature` / `deployment` / `reverse-proxy`；
  2. 确认是否计划支持子路径部署；
  3. 明确是否接受社区 PR；
  4. 若短期不开发，可提供官方 Nginx workaround 或说明当前限制；
  5. 如计划支持，建议定义统一的 `basePath` / `publicPath` 配置方案。

---

## 项目健康度评估

| 指标 | 今日状态 | 评估 |
|---|---:|---|
| Issue 活跃度 | 1 条更新 | 低 |
| PR 活跃度 | 0 条 | 低 |
| Release 活跃度 | 0 个新版本 | 稳定但无发布 |
| Bug 风险 | 无新增 Bug | 良好 |
| 社区需求信号 | 1 个部署增强请求 | 值得关注 |
| 维护响应 | 暂无评论 | 待观察 |

**综合判断：**  
PicoClaw 今日整体开发活动较少，未出现代码合并或版本发布。社区侧新增的反向代理子路径部署需求具有明确场景和实际部署价值，属于提升自托管可用性的重要信号。若项目希望扩大在个人服务器、内网网关、多服务共域名环境中的适用性，建议优先评估该功能请求。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报  
日期：2026-10-03  
仓库：NanoClaw（数据源显示链接为 `nanocoai/nanoclaw`）

---

## 1. 今日速览

过去 24 小时 NanoClaw 活跃度较高：共有 **3 条 Issue 更新**、**13 条 PR 更新**，但 **无新版本发布**。今日新增问题集中在 **更新/回滚稳定性** 与 **Discord 出站消息兼容性**，其中更新回滚可能导致 `data/` 部分数据被删除并使主机不可用，属于高优先级稳定性风险。PR 侧以 **安装流程修复、容器环境、channels 分支同步、依赖安全加固** 为主，说明维护重点仍在提升部署可靠性和多渠道适配稳定性。整体看，项目开发节奏活跃，但当前主线存在多个与安装、更新、容器、渠道适配相关的待合并修复，短期发布前仍需重点消化稳定性积压。

---

## 2. 项目进展

今日无新版本发布，因此本节聚焦已关闭或推进中的关键 PR。

### 已关闭 / 已处理 PR

#### PR #4006：Initial setup of the project with OpenCode provider and related configurations  
- 状态：CLOSED  
- 作者：MatteoContolini  
- 链接：https://github.com/nanocoai/nanoclaw/pull/4006  
- 影响范围：agent-runner、channels、containers、credentials、providers、setup-installation、skills 等  
- 摘要：该 PR 涉及 OpenCode provider 及相关配置的初始化，但目前状态为关闭，未从数据中看到合并信息。  
- 项目影响：如果未合并，说明 OpenCode provider 相关集成可能暂未进入主线，维护者可能需要进一步拆分、重提或补充测试。

#### PR #3994：fix(agent-runner): show the Claude SDK's own failure notice instead of the generic one  
- 状态：CLOSED  
- 作者：glifocat  
- 链接：https://github.com/nanocoai/nanoclaw/pull/3994  
- 影响范围：agent-runner、providers  
- 摘要：修复 Claude SDK 出错时只显示泛化错误信息的问题，使用户能够看到 SDK 自身返回的失败提示。  
- 项目影响：该修复直接改善故障可诊断性，尤其是 API Key 错误等场景。虽然状态为关闭，数据未明确显示是否合并，但该方向对用户体验和运维排障价值较高。

### 今日仍在推进的重要 PR

#### PR #4000：chore(channels): merge main into channels  
- 状态：OPEN  
- 链接：https://github.com/nanocoai/nanoclaw/pull/4000  
- 摘要：将 main 分支合入 channels 分支，并明确要求使用 merge commit，避免 squash 导致 463 个 main commits 的历史被压平。  
- 重要性：这是 channels 分支后续修复的基础 PR。若不先合并，后续 channels 相关修复可能持续冲突。  
- 项目推进程度：该 PR 属于分支治理和集成基础设施工作，对 channels 分支健康度影响较大。

#### PR #3995：fix(channels): load every adapter and make the branch green  
- 状态：OPEN  
- 链接：https://github.com/nanocoai/nanoclaw/pull/3995  
- 摘要：修复 channels 分支适配器加载问题，并使分支测试恢复绿色。该 PR 明确堆叠在 #4000 之上。  
- 重要性：说明 channels 分支当前存在适配器加载或 CI 稳定性问题。  
- 依赖关系：需先合并 #4000。

#### PR #3997：fix(setup): commit applied skill files so a fresh install can update  
- 状态：OPEN  
- 链接：https://github.com/nanocoai/nanoclaw/pull/3997  
- 摘要：修复新安装后运行 `/update-nanoclaw` 需要手动提交 skill payload 文件的问题。  
- 重要性：直接影响新用户安装后更新路径，是安装体验和自动化更新可靠性的关键修复。

#### PR #3992：fix(setup): keep the restart timestamp a number when color is forced  
- 状态：OPEN  
- 链接：https://github.com/nanocoai/nanoclaw/pull/3992  
- 摘要：修复在 `FORCE_COLOR` 环境下，`console.log(Date.now())` 输出带颜色控制字符，导致重启时间解析失败的问题。  
- 重要性：属于部署/重启流程的稳定性修复，影响 pnpm 环境下的自动重启。

---

## 3. 社区热点

今日 Issues 和 PR 的评论数、点赞数整体较低：3 个 Issue 均为 **0 评论、0 反应**；PR 反应数也均为 0，评论数在数据中未提供。因此，热点主要依据问题严重性和影响范围判断。

### 热点 1：更新与回滚流程稳定性

#### Issue #4003：update rollback can delete half of data/ and leave the host down  
- 状态：OPEN  
- 链接：https://github.com/nanocoai/nanoclaw/issues/4003  
- 作者：glifocat  
- 标签：kind/bug、triage/unresolved  
- 诉求分析：用户在 cutover 失败后触发 rollback，但回滚过程中因 `data/` 权限问题失败，可能造成部分数据被删除并导致主机不可用。  
- 背后信号：NanoClaw 的更新系统需要更强的事务性保护，尤其是 `data/` 目录这类状态数据不应在权限异常时进入半删除状态。

#### Issue #4004：update cutover crashes when the update bumps tsx or esbuild  
- 状态：OPEN  
- 链接：https://github.com/nanocoai/nanoclaw/issues/4004  
- 作者：glifocat  
- 标签：kind/bug、triage/unresolved  
- 诉求分析：当更新涉及 `tsx` 或 `esbuild` 版本变更时，cutover 在最后阶段崩溃并触发 rollback。  
- 背后信号：更新流程对构建工具链自升级的兼容性不足，尤其是在执行环境本身被更新时容易出现“自举”问题。

### 热点 2：Discord 出站动作消息 ID 兼容问题

#### Issue #4002：Outbound reactions/edits reuse the router's namespaced message id; Discord rejects them  
- 状态：OPEN  
- 链接：https://github.com/nanocoai/nanoclaw/issues/4002  
- 作者：BuckG71  
- 摘要：router 为避免 session DB 冲突，会将 inbound message id 命名空间化为 `${platformMessageId}:${agentGroupId}`。但 agent 在 reaction/edit 操作中回传该 namespaced id，Discord 不接受，返回 `400 50035`。  
- 诉求分析：用户需要跨 agent fan-out 的消息隔离，但 outbound action 必须使用平台原生 message id。  
- 背后信号：多 agent、多平台路由层需要更清晰地区分“内部消息 ID”和“平台消息 ID”。

---

## 4. Bug 与稳定性

以下按严重程度排序。

### P0 / 高危：更新回滚可能破坏数据目录并导致主机不可用

#### Issue #4003：update rollback can delete half of data/ and leave the host down  
- 链接：https://github.com/nanocoai/nanoclaw/issues/4003  
- 状态：OPEN  
- 严重程度：高  
- 影响：回滚过程中可能删除 `data/` 的一部分，并因权限错误中断，导致主机处于不可用状态。  
- 是否已有 fix PR：当前数据中未发现直接关联修复 PR。  
- 建议：  
  - 回滚流程应避免对 `data/` 进行破坏性删除。  
  - 对权限异常应先 dry-run 或预检查。  
  - 对状态目录采用原子备份、rename、快照或显式 opt-in 机制。  
  - 在修复前，建议用户更新前手动备份 `data/`。

### P1：更新 cutover 在 tsx / esbuild 版本变更时崩溃

#### Issue #4004：update cutover crashes when the update bumps tsx or esbuild  
- 链接：https://github.com/nanocoai/nanoclaw/issues/4004  
- 状态：OPEN  
- 严重程度：高  
- 影响：更新流程在最后阶段崩溃，并触发 rollback；与 #4003 组合后可能导致更严重后果。  
- 是否已有 fix PR：当前数据中未发现直接关联修复 PR。  
- 建议：  
  - 将 cutover 执行器与被更新依赖解耦。  
  - 对 `tsx`、`esbuild` 等运行时关键依赖升级设置特殊路径。  
  - 在切换 live tree 前完成可执行性验证。

### P1：Discord reaction/edit 使用内部 namespaced message id 导致平台拒绝

#### Issue #4002：Outbound reactions/edits reuse the router's namespaced message id  
- 链接：https://github.com/nanocoai/nanoclaw/issues/4002  
- 状态：OPEN  
- 严重程度：中高  
- 影响：Discord 出站 reaction/edit 操作失败，错误码 `400 50035`；actions-only cards 也被拒绝。  
- 是否已有 fix PR：当前数据中未发现直接关联修复 PR。  
- 建议：  
  - router 对 agent 暴露内部 ID 时，同时保留平台原生 ID 映射。  
  - outbound 操作进入平台 adapter 前，应还原为 platformMessageId。  
  - 对 actions-only cards 添加平台能力校验和降级策略。

### P2：安装与更新流程相关稳定性修复进行中

#### PR #3997：fresh install 后无法直接 update  
- 链接：https://github.com/nanocoai/nanoclaw/pull/3997  
- 状态：OPEN  
- 严重程度：中  
- 影响：新安装用户运行 `/update-nanoclaw` 可能需要手动提交安装生成的 skill 文件。  
- 关联方向：安装流程可靠性。

#### PR #3992：FORCE_COLOR 导致 restart timestamp 解析失败  
- 链接：https://github.com/nanocoai/nanoclaw/pull/3992  
- 状态：OPEN  
- 严重程度：中  
- 影响：pnpm 环境中重启失败，报 `Invalid restart time`。  
- 关联方向：部署脚本健壮性。

#### PR #4001：nested-pnpm probe 未镜像 host pnpm patches  
- 链接：https://github.com/nanocoai/nanoclaw/pull/4001  
- 状态：OPEN  
- 严重程度：中  
- 影响：运行 `/add-matrix` 后，setup 测试可能失败。  
- 关联方向：安装测试与 skill patch 兼容性。

#### PR #3998：agent browser 不信任 gateway CA  
- 链接：https://github.com/nanocoai/nanoclaw/pull/3998  
- 状态：OPEN  
- 严重程度：中  
- 影响：通过 credential gateway 检查 TLS 流量时，Chromium 不信任注入的 CA，HTTPS 页面无法加载。  
- 关联方向：容器浏览器与凭据网关兼容性。

#### PR #3999：CLAUDE_CODE_AUTO_COMPACT_WINDOW 未传入容器  
- 链接：https://github.com/nanocoai/nanoclaw/pull/3999  
- 状态：OPEN  
- 严重程度：中低  
- 影响：文档声明可在 host env 设置的 Claude 自动压缩窗口配置实际未进入 agent container。  
- 关联方向：provider 配置一致性。

---

## 5. 功能请求与路线图信号

今日没有明确的新功能请求 Issue，新增 Issue 均偏向 bug。结合 PR，可以观察到以下路线图信号：

### 1. Channels 分支仍是近期重点

- PR #4000：https://github.com/nanocoai/nanoclaw/pull/4000  
- PR #3995：https://github.com/nanocoai/nanoclaw/pull/3995  
- PR #3993：https://github.com/nanocoai/nanoclaw/pull/3993  

这些 PR 表明 channels 分支正在进行大规模同步、适配器加载修复和 Chat SDK 版本升级。短期内，多渠道能力、Discord/Matrix 等适配稳定性，很可能是下一阶段发布重点。

### 2. 安装、更新、自修复能力被持续强化

- PR #3997：https://github.com/nanocoai/nanoclaw/pull/3997  
- PR #3992：https://github.com/nanocoai/nanoclaw/pull/3992  
- PR #4001：https://github.com/nanocoai/nanoclaw/pull/4001  
- Issue #4003：https://github.com/nanocoai/nanoclaw/issues/4003  
- Issue #4004：https://github.com/nanocoai/nanoclaw/issues/4004  

安装和更新路径的问题密度较高，说明 NanoClaw 正在从“功能可用”向“可稳定部署和升级”推进。预计维护者会优先处理更新事务性、rollback 安全、fresh install 可更新性等问题。

### 3. Skill 依赖可审计性与安全加固增强

- PR #4007：https://github.com/nanocoai/nanoclaw/pull/4007  
- PR #4005：https://github.com/nanocoai/nanoclaw/pull/4005  

#4007 让 Dependabot 能看到 skill-pinned npm versions；#4005 升级 `@grpc/grpc-js` 以修复安全公告。说明项目开始加强技能包依赖的安全可见性，后续可能形成更系统的 skill dependency 管理机制。

### 4. 容器运行环境趋向可复现

- PR #3996：https://github.com/nanocoai/nanoclaw/pull/3996  
- PR #3998：https://github.com/nanocoai/nanoclaw/pull/3998  

#3996 将 agent image 从浮动 `node:22-slim` 切换到 `node:24-trixie-slim`，减少系统层不确定性。结合浏览器 CA 信任修复，容器侧可复现性和企业网络兼容性正在提升。

---

## 6. 用户反馈摘要

今日 Issue 评论数均为 0，因此反馈主要来自 Issue 描述本身。

### 用户痛点 1：更新失败后的回滚不够安全

- 关联 Issue：#4003、#4004  
  - https://github.com/nanocoai/nanoclaw/issues/4003  
  - https://github.com/nanocoai/nanoclaw/issues/4004  
- 真实场景：用户从旧安装版本更新到新 commit，cutover 最后阶段失败，随后 rollback 也失败。  
- 不满点：更新失败本身可接受，但 rollback 破坏 `data/` 并让 host down 是严重不可接受结果。  
- 用户预期：更新流程应具备强事务性；失败时至少应保持旧版本可运行，不能损害数据目录。

### 用户痛点 2：多 agent 消息隔离与平台 API 语义冲突

- 关联 Issue：#4002  
  - https://github.com/nanocoai/nanoclaw/issues/4002  
- 真实场景：router 为每个 agent 命名空间化 message id，避免 fan-out 消息在 session DB 中冲突。但 agent 将该 ID 用于 Discord reaction/edit，导致平台拒绝。  
- 不满点：内部 ID 泄漏到平台操作层，破坏了平台 API 兼容性。  
- 用户预期：系统内部可以使用 namespaced ID，但出站动作必须自动映射回平台原始 ID。

### 用户痛点 3：安装后更新链路需要人工干预

- 关联 PR：#3997  
  - https://github.com/nanocoai/nanoclaw/pull/3997  
- 真实场景：fresh install 后，setup 写入 skill payload 文件，但这些文件未被自动纳入可更新状态，导致 `/update-nanoclaw` 需要人工提交。  
- 用户预期：安装完成后应能直接进入正常更新周期，不应要求用户理解 Git 工作树细节。

---

## 7. 待处理积压

数据仅覆盖过去 24 小时，无法判断“长期未响应”的历史积压。不过从今日新增和仍打开的条目看，以下事项值得维护者优先关注。

### 高优先级待处理

#### Issue #4003：rollback 可能破坏 data/  
- 链接：https://github.com/nanocoai/nanoclaw/issues/4003  
- 原因：数据安全风险最高，且当前未见直接修复 PR。  
- 建议优先级：P0。

#### Issue #4004：cutover 在 tsx/esbuild 升级时崩溃  
- 链接：https://github.com/nanocoai/nanoclaw/issues/4004  
- 原因：是 #4003 的前置触发条件之一，若不修复会继续暴露回滚路径风险。  
- 建议优先级：P1。

#### Issue #4002：Discord 出站 reaction/edit 失败  
- 链接：https://github.com/nanocoai/nanoclaw/issues/4002  
- 原因：影响渠道功能正确性，且涉及 router ID 设计边界。  
- 建议优先级：P1。

### 待合并关键 PR

#### PR #4000：main → channels 同步  
- 链接：https://github.com/nanocoai/nanoclaw/pull/4000  
- 建议：按 PR 说明使用 merge commit 合并，避免后续 channels 分支持续冲突。

#### PR #3995：channels adapter 加载与 CI 修复  
- 链接：https://github.com/nanocoai/nanoclaw/pull/3995  
- 建议：在 #4000 合并后尽快处理，以恢复 channels 分支健康。

#### PR #3997：fresh install 可直接 update  
- 链接：https://github.com/nanocoai/nanoclaw/pull/3997  
- 建议：属于新用户路径关键修复，建议优先评审。

#### PR #4007：Dependabot 可见 skill-pinned npm versions  
- 链接：https://github.com/nanocoai/nanoclaw/pull/4007  
- 建议：安全供应链方向收益较高，可降低 skill 依赖遗漏升级风险。

#### PR #4005：升级 `@grpc/grpc-js` 到 1.14.5  
- 链接：https://github.com/nanocoai/nanoclaw/pull/4005  
- 建议：涉及安全公告修复，建议尽快合并并验证 Iron approval bridge。

---

## 项目健康度评估

- **开发活跃度：高**  
  24 小时内 13 个 PR 更新，说明维护者和贡献者活动频繁。

- **发布节奏：暂缓**  
  今日无 release，结合多个安装、更新、channels 修复仍在开放状态，短期可能处于发布前稳定化阶段。

- **稳定性风险：中高**  
  更新 cutover 与 rollback 问题存在数据安全和可用性风险，需要优先处理。

- **社区互动：偏低**  
  今日新增 Issue 评论和反应均为 0，说明讨论尚未展开；但问题本身严重，建议维护者主动 triage。

- **维护重点判断**  
  当前 NanoClaw 的核心任务不是新增大功能，而是提升部署、更新、容器和多渠道适配的可靠性。下一版本若能解决 update/rollback、channels branch health、skill dependency visibility，将显著提升项目成熟度。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-10-03）

项目：nearai/ironclaw  
统计窗口：过去 24 小时  
数据范围：Issues、Pull Requests、Releases

---

## 1. 今日速览

过去 24 小时内，IronClaw 项目活跃度较低，仅有 1 条新 Issue 更新，未出现新的 Pull Request、合并记录或版本发布。今日唯一新增问题集中在本地开发启动链路，涉及 macOS Apple Silicon 环境下 `ironclaw serve` 在 `local-dev` profile 中读取凭据失败。  
从项目健康度看，当前没有明显的大规模回归信号，但该问题发生在本地开发/启动路径，若复现范围扩大，可能影响开发者首次体验和扩展 Web App 的可用性。维护侧今日尚未出现对应修复 PR 或讨论反馈，建议尽快确认是否为 macOS 凭据后端、安装方式或 profile 配置相关问题。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

过去 24 小时无新的 Pull Request 更新，也没有合并或关闭的 PR。

因此，今日主线代码层面暂无可观察的功能推进、修复合入或重构进展。项目活动主要体现在用户侧问题反馈，而非维护者侧代码变更。

---

## 4. 社区热点

### Issue #8122：`ironclaw serve` 在 macOS 上因凭据读取失败无法启动

- 链接：https://github.com/nearai/ironclaw/issues/8122  
- 状态：OPEN  
- 作者：rahhbster  
- 创建时间：2026-10-03  
- 评论数：0  
- 反应数：0  
- 类型判断：Bug / 本地开发体验问题

**问题概述：**  
用户报告在 macOS Apple Silicon 环境中使用 `local-dev` 启动 profile 执行 `ironclaw serve` 时失败，错误信息为：

> `credential read failed: BackendUnavailable for extension web-app`

用户环境包括：

- macOS Apple Silicon，`aarch64-apple-darwin`
- Darwin 27.0.0
- IronClaw 1.4.1，官方 `ironclaw-installer.sh` 安装
- IronClaw 1.4.0，通过 `cargo install --path` 构建也可复现
- Boot profile：`local-dev`
- `ironclaw doctor`：8/8 passed

**背后诉求分析：**

该 Issue 反映出用户希望本地开发环境能够在健康检查全部通过的情况下稳定启动服务。值得注意的是，`ironclaw doctor` 已全部通过，但实际 `serve` 阶段仍因凭据后端不可用失败，说明当前诊断工具可能未覆盖运行时凭据读取路径，或对 macOS 凭据后端可用性的检测不足。

---

## 5. Bug 与稳定性

### 高优先级：macOS 本地启动失败，凭据后端不可用

- Issue：https://github.com/nearai/ironclaw/issues/8122  
- 严重程度：高  
- 状态：OPEN  
- 是否已有 fix PR：暂无  
- 影响范围：macOS Apple Silicon、本地开发 `local-dev` profile、`web-app` extension 凭据读取路径  
- 复现信号：用户在 IronClaw 1.4.1 官方安装版和 1.4.0 本地构建版均复现

**稳定性影响：**

该问题阻断 `ironclaw serve` 的启动流程，属于启动路径故障。虽然目前只有 1 位用户报告，暂无评论或更多反应，但其影响面可能覆盖以下场景：

1. 新用户在 macOS 上尝试本地运行 IronClaw。
2. 开发者使用 `local-dev` profile 调试 extension web-app。
3. CI 或本地自动化脚本依赖 `ironclaw serve` 启动开发服务。
4. 凭据后端不可用但 `doctor` 未发现异常的环境。

**建议维护者关注点：**

- 检查 `web-app` extension 是否依赖系统 Keychain、secret service 或其他平台凭据后端。
- 确认 `local-dev` profile 是否应允许缺省凭据、mock credential 或 fallback backend。
- 扩展 `ironclaw doctor`，增加对 credential backend 可用性的检测。
- 在错误信息中增加修复建议，例如初始化凭据、启用后端、重置 profile 或切换 credential provider。
- 判断是否与 macOS Darwin 27.0.0、Apple Silicon 或安装脚本权限有关。

---

## 6. 功能请求与路线图信号

过去 24 小时未出现明确的新功能请求。

不过，Issue #8122 暗含了一个产品和开发者体验层面的路线图信号：

### 潜在改进方向：增强本地开发凭据管理与诊断能力

- 相关 Issue：https://github.com/nearai/ironclaw/issues/8122  
- 当前状态：尚未转化为功能请求  
- 可能纳入方向：
  - `ironclaw doctor` 增加 credential backend 检查。
  - `ironclaw serve` 在 `local-dev` profile 下提供更友好的凭据 fallback。
  - 增加 `ironclaw credentials check/reset/init` 等诊断命令。
  - 为 macOS Keychain 或平台凭据后端提供文档化修复步骤。
  - 对 extension web-app 的本地开发模式支持 mock credentials。

目前没有相关 PR，因此无法判断该方向是否会进入下一版本。但如果后续出现更多类似报告，该问题可能升级为开发者体验优先级较高的修复项。

---

## 7. 用户反馈摘要

今日用户反馈主要来自 Issue #8122。

- 链接：https://github.com/nearai/ironclaw/issues/8122  

**真实用户痛点：**

1. **健康检查与实际运行结果不一致**  
   用户的 `ironclaw doctor` 显示 8/8 passed，但 `ironclaw serve` 仍失败。这会降低用户对诊断工具的信任。

2. **本地开发启动被阻断**  
   问题发生在 `local-dev` profile 和 `serve` 命令中，直接影响开发者本地调试和使用 extension web-app。

3. **错误信息可操作性可能不足**  
   `BackendUnavailable` 指向凭据后端不可用，但从摘要看，用户可能无法直接判断应修复 Keychain、配置文件、安装权限还是 extension 设置。

4. **版本间可复现，疑似非单一版本问题**  
   用户在 1.4.1 官方安装版和 1.4.0 本地构建版均复现，暗示该问题可能存在于凭据读取设计、平台适配或默认配置中，而不只是最新版本回归。

**满意/不满意信号：**

- 正面信号：用户提供了较完整的环境信息，并确认 `doctor` 结果和多个版本复现情况，有助于维护者排查。
- 负面信号：本地启动链路失败，且诊断工具未提前发现问题，影响首次开发体验。

---

## 8. 待处理积压

当前提供的数据仅覆盖过去 24 小时内的更新，未包含长期未响应 Issue 或 PR 的历史积压情况。因此，无法基于现有数据可靠识别长期未响应的重要事项。

今日需要关注的新积压候选：

### Issue #8122：macOS 本地启动凭据读取失败

- 链接：https://github.com/nearai/ironclaw/issues/8122  
- 当前状态：OPEN  
- 评论数：0  
- 建议优先级：高  
- 建议动作：
  1. 维护者确认是否可复现。
  2. 请求用户补充完整日志、credential backend 配置、安装脚本输出和 `ironclaw serve --verbose` 结果。
  3. 判断是否需要快速修复或文档 workaround。
  4. 若确认为通用问题，建议创建修复 PR 并补充 `doctor` 检查。

---

## 项目健康度评估

今日 IronClaw 活跃度偏低，代码层面无新增 PR、无合并、无发布。唯一新增 Issue 指向本地开发启动链路中的凭据后端问题，虽然当前反馈量较小，但其阻断性较强，且跨 1.4.0 与 1.4.1 复现，值得维护者优先 triage。整体来看，项目今日没有明显发布风险或大规模社区波动，但开发者体验和 macOS 本地运行稳定性需要关注。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

过去24小时无活动。

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

# CoPaw 项目动态日报｜2026-10-03

> 数据来源：过去 24 小时 GitHub Issues / Pull Requests 活动。  
> 注：原始数据中的仓库链接显示为 `agentscope-ai/QwenPaw`，以下链接按该 GitHub 路径生成。

---

## 1. 今日速览

过去 24 小时项目活跃度较高，共有 **6 条 Issue 更新** 与 **6 条 PR 更新**，但暂无 Issue 关闭、PR 合并或版本发布。今日讨论重点集中在 **多模态能力补齐、模型输出稳定性、前端可用性、跨实例 Agent 协作** 等方向，说明项目正在从“功能可用”向“可靠、可观测、可扩展”演进。  
从 PR 状态看，当前有多项修复已经进入待合并阶段，尤其是上下文超限静默失败、终端身份生成、GPT 新参数兼容等问题，若尽快合入，将显著改善用户体验与稳定性。社区侧也出现了较明确的产品化诉求，例如飞书机器人回复元信息展示、音频理解工具、跨机器 Agent 通信等。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日暂无已合并或已关闭 PR，因此没有正式进入主干的功能或修复。不过，有 6 个开放 PR 处于待合并状态，反映出维护工作正在推进。

### 待合并的重要 PR

#### 1. 修复 GPT 新模型 token 参数兼容问题  
- PR：[#8090 fix(providers): recognize newer GPT token limit parameters](https://github.com/agentscope-ai/QwenPaw/pull/8090)  
- 作者：iluv7  
- 状态：Open  
- 规模：XS  

该 PR 修复连接探测、图像/视频能力探测时仍使用旧参数 `max_tokens` 的问题。对于需要 `max_completion_tokens` 的新 GPT 模型，旧参数会导致 HTTP 400。该修复有助于提升新模型接入兼容性。

#### 2. 修复 LAN HTTP 场景下控制台无法渲染问题  
- PR：[#8089 fix(console): support terminal identity over LAN HTTP](https://github.com/agentscope-ai/QwenPaw/pull/8089)  
- 作者：lorenzozanee  
- 状态：Open  
- 规模：S  

该 PR 解决在非安全上下文中 `crypto.randomUUID()` 不可用导致会话视图渲染失败的问题。对于局域网部署、家庭服务器或内网访问场景较为重要。

#### 3. 移动端设置页导航优化  
- PR：[#8086 feat(console): move settings navigation into a mobile drawer](https://github.com/agentscope-ai/QwenPaw/pull/8086)  
- 作者：LeafS825  
- 状态：Open  
- 标签：first-time-contributor, size/M  

该 PR 将设置页的 21 个导航分区迁移到移动端抽屉中，避免小屏幕下导航区域占据过多视口。该改动提升移动端控制台可用性，也显示出社区贡献者开始参与前端体验优化。

#### 4. 拒绝超大 Prompt，并暴露空模型回复  
- PR：[#8084 fix(agents): refuse oversized prompts and surface empty model replies instead of silent failures](https://github.com/agentscope-ai/QwenPaw/pull/8084)  
- 作者：LUOSENGWA  
- 状态：Open  
- 规模：L  

该 PR 针对超出上下文窗口或接近上下文窗口时，部分 provider 返回 `200` 但 `completion_tokens=0` 的静默失败问题。修复方向是提前拒绝超大 Prompt，并在模型返回空内容时向用户显式暴露失败信息。该 PR 对稳定性和可观测性提升较大。

#### 5. 新增 view_audio 音频理解工具  
- PR：[#8083 feat(tools): add view_audio tool for audio understanding](https://github.com/agentscope-ai/QwenPaw/pull/8083)  
- 作者：shuziP  
- 状态：Open  
- 标签：first-time-contributor, size/S  

该 PR 补齐音频模态理解能力，与现有 `view_image`、`view_video` 工具形成多模态工具链闭环。

#### 6. 配置重载超时后通知房间并取消运行中任务  
- PR：[#8079 fix(app): notify the room and cancel in-flight runs when the reload drain timeout expires](https://github.com/agentscope-ai/QwenPaw/pull/8079)  
- 作者：LUOSENGWA  
- 状态：Open  
- 规模：M  

该 PR 修复配置变更触发 Agent 重载时，旧实例在 drain timeout 后缺少明确通知和任务取消的问题。该修复有助于避免用户误以为任务仍在运行，提升系统状态透明度。

---

## 4. 社区热点

今日所有新 Issue 均有 1 条评论，尚未出现特别集中的长讨论，但从议题类型看，热点主要集中在 **“静默失败可观测性”** 与 **“多模态能力补全”**。

### 热点 1：图像消息处理挂起且无回复  
- Issue：[#8088 [Bug] Image routed to chat_with_image hangs in a Bash+PIL cropping loop](https://github.com/agentscope-ai/QwenPaw/issues/8088)  
- 作者：Qggg  
- 评论数：1  

用户报告，当默认 Agent 无视觉能力并将图片转发给 `chat_with_image` 子 Agent 后，系统没有直接理解图片，而是进入基于 Bash + PIL 的暴力裁剪循环，最终被静默取消且没有向用户回复。  
背后的核心诉求是：**多模态路由应当可靠、可解释，并在失败时向用户反馈，而不是静默中断。**

### 热点 2：输出被截断时应暴露 `finish_reason="length"`  
- Issue：[#8085 truncation: surface finish_reason="length"](https://github.com/agentscope-ai/QwenPaw/issues/8085)  
- 作者：LUOSENGWA  
- 评论数：1  

当前当模型输出因为达到 token 上限而停止时，平台没有将 `finish_reason == "length"` 告知用户，导致用户无法区分回答是完整结束还是中途截断。  
该问题反映出用户对 **输出可靠性、回答完整性、模型停止原因可观测性** 的需求上升。

### 热点 3：音频理解能力补齐  
- Issue：[#8081 Add view_audio built-in tool for audio understanding](https://github.com/agentscope-ai/QwenPaw/issues/8081)  
- PR：[#8083 feat(tools): add view_audio tool](https://github.com/agentscope-ai/QwenPaw/pull/8083)  

该功能请求已经有对应 PR，说明音频模态可能较快进入主线。社区希望音频像图片、视频一样通过内置工具被模型直接理解，而不是依赖冗长的间接处理链路。

### 热点 4：飞书机器人回复底部显示 Agent 与模型信息  
- Issue：[#8087 建议对飞书机器人回复内容增加智能体名称、模型 provider 和 model 名称](https://github.com/agentscope-ai/QwenPaw/issues/8087)  
- 作者：billyoungs  
- 评论数：1  

用户参考 OpenClaw 的行为，希望飞书机器人回复底部能展示 Agent 名称、模型 provider、model 名称。  
这类诉求体现出企业或团队协作场景下，用户需要更强的 **可追溯性、审计性和多 Agent 辨识度**。

---

## 5. Bug 与稳定性

以下按影响严重程度排序。

### P0 / 高严重度：图像消息进入裁剪循环后静默取消  
- Issue：[#8088](https://github.com/agentscope-ai/QwenPaw/issues/8088)  
- 状态：Open  
- 是否已有 fix PR：暂无明确关联 PR  

问题表现：用户发送图片后，默认 Agent 转发给 `chat_with_image`，但子 Agent 进入 Bash + PIL 裁剪循环，最终任务被取消且用户没有收到回复。  
影响：  
- 图片输入不可用或不稳定  
- 消耗大量工具调用和计算资源  
- 最终无用户反馈，严重影响信任感  
建议优先级：高。应优先检查多模态路由、视觉工具选择策略、工具循环终止条件和取消反馈机制。

---

### P1 / 高严重度：超大 Prompt 或空模型回复导致静默失败  
- PR：[#8084](https://github.com/agentscope-ai/QwenPaw/pull/8084)  
- 状态：Open  
- 是否已有 fix PR：已有，待合并  

问题表现：Prompt 接近或超过模型上下文窗口时，部分 provider 可能返回 HTTP 200，但 `completion_tokens=0`，前端表现为空回复或无输出。  
影响：  
- 用户无法知道任务失败原因  
- 容易误判为 Agent 卡死  
- 对长上下文任务、代码分析、文件处理场景影响较大  
建议优先级：高。该 PR 应尽快 review。

---

### P1 / 高严重度：输出截断未告知用户  
- Issue：[#8085](https://github.com/agentscope-ai/QwenPaw/issues/8085)  
- 状态：Open  
- 是否已有 fix PR：暂无明确关联 PR  

问题表现：当生成因达到输出上限停止时，系统丢弃 `finish_reason="length"`，用户只能看到一个中断的回答。  
影响：  
- 用户无法判断回答完整性  
- 影响长文生成、代码生成、报告生成  
- 容易导致误用不完整答案  
建议：在 UI 和消息元数据中显式展示“回答因长度限制被截断”，并提供继续生成入口。

---

### P2 / 中严重度：GPT 新模型 token 参数不兼容  
- PR：[#8090](https://github.com/agentscope-ai/QwenPaw/pull/8090)  
- 状态：Open  
- 是否已有 fix PR：已有，待合并  

问题表现：连接和能力探测对 GPT-6 等新模型仍发送旧参数 `max_tokens`，导致 HTTP 400。  
影响：  
- 新模型无法顺利接入或探测失败  
- 影响用户配置体验  
建议：合并后补充 provider 参数兼容测试。

---

### P2 / 中严重度：LAN HTTP 下 `crypto.randomUUID()` 不可用导致控制台失败  
- PR：[#8089](https://github.com/agentscope-ai/QwenPaw/pull/8089)  
- 状态：Open  
- 是否已有 fix PR：已有，待合并  

问题表现：在非 HTTPS 的局域网 HTTP origin 下，`crypto.randomUUID()` 不可用，导致终端身份生成失败，进而影响会话视图渲染。  
影响：  
- 局域网部署用户受影响  
- 家庭服务器、内网办公环境较常见  
建议：该修复范围较小，建议快速合并。

---

### P2 / 中严重度：配置重载 drain timeout 后任务状态不透明  
- PR：[#8079](https://github.com/agentscope-ai/QwenPaw/pull/8079)  
- 状态：Open  
- 是否已有 fix PR：已有，待合并  

问题表现：配置变更导致 Agent 重载时，旧实例在 drain timeout 后停止，但用户侧缺少明确通知，运行中任务也可能未被清晰取消。  
影响：  
- 用户不清楚任务是否仍在执行  
- 可能造成重复提交或误操作  
建议：合并后应在 UI/房间消息中明确展示任务取消原因。

---

## 6. 功能请求与路线图信号

### 1. 音频理解：`view_audio` 内置工具  
- Issue：[#8081](https://github.com/agentscope-ai/QwenPaw/issues/8081)  
- PR：[#8083](https://github.com/agentscope-ai/QwenPaw/pull/8083)  
- 纳入下一版本可能性：高  

已有对应实现 PR，且需求与现有 `view_image`、`view_video` 设计一致，属于自然补齐多模态能力。若 review 顺利，较可能进入下一版本。

---

### 2. 飞书机器人回复展示 Agent 名称、Provider、Model  
- Issue：[#8087](https://github.com/agentscope-ai/QwenPaw/issues/8087)  
- 纳入下一版本可能性：中  

该需求偏产品体验与可观测性，适合企业协作场景。由于用户明确给出 OpenClaw 的对比案例，说明该能力已有参考实现。  
潜在实现方式包括：  
- 在机器人适配层追加 footer  
- 通过配置项控制是否展示  
- 避免泄露敏感 provider 或模型信息  

---

### 3. 跨实例 Agent 通信：自动发现、任务委托、知识与记忆传授  
- Issue：[#8080](https://github.com/agentscope-ai/QwenPaw/issues/8080)  
- 纳入下一版本可能性：低到中，偏中长期路线图  

该需求希望不同机器上的 QwenPaw/CoPaw 实例能够互相发现、委托任务、共享知识和记忆。  
这属于架构级能力，涉及：  
- 实例发现  
- 安全认证  
- 任务协议  
- 记忆同步  
- 权限隔离  
- 跨网络通信  
- 去中心化协作  

短期可能先以实验性协议或手动配置远程 Agent 的形式出现；完整去中心化方案更可能进入中长期路线图。

---

### 4. Heartbeat 行为文档补充  
- Issue：[#8082](https://github.com/agentscope-ai/QwenPaw/issues/8082)  
- 纳入下一版本可能性：中  

用户指出当前 heartbeat 文档只覆盖配置项，但缺少运行时语义，例如静默行为、并发语义、`AGENTS.md` 中 heartbeat section 的影响。  
这类文档改进不涉及大规模代码变更，但能显著降低误用成本，建议优先处理。

---

### 5. 移动端设置体验优化  
- PR：[#8086](https://github.com/agentscope-ai/QwenPaw/pull/8086)  
- 纳入下一版本可能性：中到高  

该 PR 解决移动端设置页导航过长的问题。改动目标明确、用户体验收益直接，且由 first-time contributor 提交，适合作为社区贡献合并案例。

---

## 7. 用户反馈摘要

### 用户痛点 1：系统“无响应”或“静默失败”带来的不确定性

多个 Issue/PR 指向同一类问题：当系统失败、截断、超时或被取消时，用户得不到明确反馈。典型案例包括：  
- 图片处理循环后无回复：[#8088](https://github.com/agentscope-ai/QwenPaw/issues/8088)  
- 输出因长度限制中断但未提示：[#8085](https://github.com/agentscope-ai/QwenPaw/issues/8085)  
- 超大 Prompt 导致空回复：[#8084](https://github.com/agentscope-ai/QwenPaw/pull/8084)  
- 配置重载后任务取消不透明：[#8079](https://github.com/agentscope-ai/QwenPaw/pull/8079)  

这说明用户对 Agent 系统的核心期待不仅是“能完成任务”，还包括“失败时能说明原因”。

---

### 用户痛点 2：多模态能力需要更直接、更统一

用户希望音频、图片、视频都能被 Agent 以一致方式理解：  
- 图片处理当前可能走复杂工具链并失败：[#8088](https://github.com/agentscope-ai/QwenPaw/issues/8088)  
- 音频缺少 `view_audio` 工具：[#8081](https://github.com/agentscope-ai/QwenPaw/issues/8081)、[#8083](https://github.com/agentscope-ai/QwenPaw/pull/8083)  

这表明项目在多模态方向已经有基础，但仍需要统一的工具抽象、路由策略和失败处理机制。

---

### 用户痛点 3：企业/协作场景需要更强可追溯性

飞书机器人回复底部展示 Agent 名称、模型 provider 和 model 名称的请求，反映了用户在多人协作环境中对透明度的需求：  
- Issue：[#8087](https://github.com/agentscope-ai/QwenPaw/issues/8087)  

这类信息有助于回答以下问题：  
- 当前回复来自哪个 Agent？  
- 使用了哪个模型？  
- 是否方便审计和问题定位？  
- 不同 Agent 的输出是否可以区分？  

---

### 用户痛点 4：部署环境多样化带来的兼容性问题

LAN HTTP、家庭服务器、跨机器运行等场景不断出现：  
- LAN HTTP 控制台身份生成问题：[#8089](https://github.com/agentscope-ai/QwenPaw/pull/8089)  
- 跨实例 Agent 通信：[#8080](https://github.com/agentscope-ai/QwenPaw/issues/8080)  

说明用户不只是在本地单机试用，而是在更复杂的真实环境中部署项目。

---

## 8. 待处理积压

由于本日报仅包含过去 24 小时数据，无法完整识别长期未响应的历史积压。不过，从当前开放项看，以下问题建议维护者优先关注。

### 优先 Review / 合并的 PR

1. [#8084 fix(agents): refuse oversized prompts and surface empty model replies](https://github.com/agentscope-ai/QwenPaw/pull/8084)  
   - 影响范围大，直接改善静默失败问题。

2. [#8090 fix(providers): recognize newer GPT token limit parameters](https://github.com/agentscope-ai/QwenPaw/pull/8090)  
   - 修复新 GPT 模型兼容性，改动较小，适合快速合并。

3. [#8089 fix(console): support terminal identity over LAN HTTP](https://github.com/agentscope-ai/QwenPaw/pull/8089)  
   - 修复局域网 HTTP 部署场景下的前端可用性问题。

4. [#8079 fix(app): notify the room and cancel in-flight runs when reload drain timeout expires](https://github.com/agentscope-ai/QwenPaw/pull/8079)  
   - 改善任务生命周期透明度。

5. [#8083 feat(tools): add view_audio tool](https://github.com/agentscope-ai/QwenPaw/pull/8083)  
   - 对应明确用户需求，补齐多模态工具链。

---

### 优先响应的 Issue

1. [#8088 Image routed to chat_with_image hangs in Bash+PIL cropping loop](https://github.com/agentscope-ai/QwenPaw/issues/8088)  
   - 高优先级 Bug，涉及图片输入失败和无回复。

2. [#8085 surface finish_reason="length"](https://github.com/agentscope-ai/QwenPaw/issues/8085)  
   - 建议尽快设计统一的截断提示机制。

3. [#8087 飞书机器人回复增加 Agent / Provider / Model 信息](https://github.com/agentscope-ai/QwenPaw/issues/8087)  
   - 产品化体验需求明确，可考虑配置化实现。

4. [#8082 docs(heartbeat): document silence semantics, concurrency, and AGENTS.md heartbeat section](https://github.com/agentscope-ai/QwenPaw/issues/8082)  
   - 文档缺口清晰，适合快速改善用户理解成本。

5. [#8080 跨实例 Agent 通信](https://github.com/agentscope-ai/QwenPaw/issues/8080)  
   - 架构级需求，建议维护者给出路线图反馈，避免用户预期不清。

---

## 项目健康度评估

今日项目健康度整体为 **活跃但待收敛**：

- **活跃度：高**  
  24 小时内 6 个 Issue、6 个 PR，且涵盖 Bug、功能、文档、前端体验和架构方向。

- **维护推进：中等**  
  多个修复 PR 已提交，但暂无合并记录。当前关键在于 review 和合入节奏。

- **稳定性风险：中到高**  
  多个问题集中在静默失败、无回复、输出截断、上下文超限等用户感知强烈的可靠性问题。

- **路线图信号：明确**  
  社区正在推动多模态补齐、企业协作可观测性、跨实例 Agent 协作和移动端体验优化。

建议维护者短期优先处理“静默失败类”问题，并尽快合并小规模兼容性修复 PR；中期可围绕多模态工具、任务生命周期可观测性、跨实例协作协议形成更清晰路线图。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报  
日期：2026-10-03  
仓库：[`zeroclaw-labs/zeroclaw`](https://github.com/zeroclaw-labs/zeroclaw)

---

## 1. 今日速览

过去 24 小时 ZeroClaw 维持了非常高的开发活跃度：Issues 更新 7 条，其中 6 条仍处于打开状态，1 条已关闭；Pull Requests 更新 46 条，其中 45 条仍待合并，仅 1 条已合并或关闭。  
今日工作重心明显集中在 **运行时稳定性、配置体系、工具调用、ZeroCode 交互体验、供应链安全与跨平台兼容性** 上。  
PR 体量中包含多项 `risk:high`、`size:XL`、`stacked` 变更，说明项目正在推进较深层架构改造，但合并节奏相对谨慎。  
整体健康度评价：**活跃度很高，路线推进明确，但待合并 PR 积压显著，核心维护者需要重点关注高风险堆叠 PR 的评审与拆分合并节奏。**

---

## 2. 版本发布

过去 24 小时 **无新版本发布**。

最新 Releases：无。

---

## 3. 项目进展

### 3.1 今日合并 / 关闭情况

过去 24 小时 PR 更新 46 条，其中仅 1 条已合并或关闭；但当前数据未列出该已合并 / 关闭 PR 的编号和摘要，因此无法确认具体推进内容。

Issues 方面，今日有 1 个 Issue 被关闭：

#### 已关闭：Gateway 无 Agent Turn 发送消息能力  
- Issue：[#11434 - Gateway route to send a message through a running channel without an agent turn](https://github.com/zeroclaw-labs/zeroclaw/issues/11434)  
- 类型：Feature  
- 状态：Closed  
- 核心诉求：增加认证网关接口 `POST /api/channels/{channel}/send`，允许外部系统通过正在运行的 channel 发送文本消息，而不触发 agent turn。  
- 影响分析：  
  - 这是一个偏集成型能力，面向外部系统主动推送消息到 ZeroClaw channel 的场景。  
  - Issue 已关闭，可能意味着需求已被拒绝、迁移到其他设计、或已有替代实现；但从当前数据无法确认关闭原因。  
  - 与现有 PR 中 `sessions_send` 语义澄清和 channel messaging 能力有关联信号。

相关 PR 信号：

#### 澄清 legacy `sessions_send` 语义  
- PR：[#11461 - fix(tools): clarify sessions_send append semantics](https://github.com/zeroclaw-labs/zeroclaw/pull/11461)  
- 状态：Open  
- 重点：将 `sessions_send` 明确为已废弃的 legacy Chat history append 行为，并引导真正的 agent-to-agent messaging 使用 `send_message_to_peer`。  
- 意义：项目正在区分“追加会话历史”和“真实消息投递”两类语义，避免外部集成误用。

---

## 4. 社区热点

> 注：PR 数据中的评论数为 `undefined`，因此本节主要依据标签、风险级别、变更范围、Issue/PR 内容和更新频率判断热点。

### 4.1 配置系统与全局应用结果可观测性

#### PR：配置应用结果按目标上报  
- [#11466 - feat(config): report per-target application results](https://github.com/zeroclaw-labs/zeroclaw/pull/11466)  
- 标签：`risk:high`, `size:XL`, `stacked`, `config`, `daemon`, `gateway`, `provider`, `runtime`, `security`, `cli`  
- 状态：Open  
- 热点原因：  
  - 该 PR 覆盖面极广，涉及 core、agent、channel、cron、daemon、gateway、provider、runtime、skills、tools、tests 等多个模块。  
  - 目标是上报每个 target 的配置应用结果，属于配置系统可观测性和故障诊断能力增强。  
  - 对复杂部署用户非常重要，尤其是多 channel、多 provider、多运行目标的环境。  
- 风险判断：  
  - 高风险、大体量、堆叠 PR，建议维护者优先确认接口语义、错误模型和向后兼容性。

相关文档例外 PR：

- [#11474 - docs(runtime): propose config-application placement exception](https://github.com/zeroclaw-labs/zeroclaw/pull/11474)  
  - 为 #11466 的 runtime placement 提出有界例外，说明该能力当前仍受 runtime crate 过渡架构影响。

---

### 4.2 工具系统：schema 延迟、取消上下文、delegate approval

#### PR：内置工具 schema 延迟加载  
- [#11473 - feat(tools): defer built-in schemas through tool_search](https://github.com/zeroclaw-labs/zeroclaw/pull/11473)  
- 标签：`risk:medium`, `size:XL`, `stacked`, `tool`, `mcp`, `delegate`, `runtime`  
- 状态：Open  
- 诉求分析：  
  - 将 built-in schemas 通过 `tool_search` 延迟暴露，可能减少初始化负担，改善工具发现机制。  
  - 对大型工具集、MCP 集成和按需工具可见性有明显价值。  
- 关联 PR：  
  - [#11472 - docs(runtime): propose bounded built-in schema deferral exception](https://github.com/zeroclaw-labs/zeroclaw/pull/11472)

#### PR：工具协作式取消上下文  
- [#11465 - feat(tools): expose cooperative cancellation context](https://github.com/zeroclaw-labs/zeroclaw/pull/11465)  
- 标签：`risk:high`, `risk:manual`, `size:L`, `tool:web`, `tool:delegate`  
- 状态：Open  
- 诉求分析：  
  - 为工具调用暴露 cooperative cancellation context。  
  - 对长任务、Web 工具、delegate 工具尤其重要，可减少任务失控、资源占用和用户取消无效的问题。  
- 风险：  
  - 涉及运行时取消语义，需关注中断时的资源清理、幂等性和部分结果处理。

#### PR：独立 delegate 子任务审批路由  
- [#11462 - feat(delegate): route independent child approvals to the target operator](https://github.com/zeroclaw-labs/zeroclaw/pull/11462)  
- 标签：`risk:high`, `domain:security`, `tool:delegate`, `channel:telegram`  
- 状态：Open  
- 诉求分析：  
  - 让独立 agentic delegate 的工具审批请求路由到目标 risk profile 的 operator。  
  - 反映出用户对多代理协作中的权限边界、审批归属和安全审计有较高要求。

---

### 4.3 Provider 与模型行为控制

#### PR：单工具 provider round  
- [#11467 - feat(agent): add opt-in single-tool provider rounds](https://github.com/zeroclaw-labs/zeroclaw/pull/11467)  
- 标签：`risk:high`, `size:XL`, `provider:openai`, `provider:anthropic`, `provider:router`, `provider:reliable`  
- 状态：Open  
- 热点原因：  
  - 这是 agent 与 provider 交互模型的重要能力变更。  
  - “opt-in single-tool provider rounds” 可能改善工具调用的确定性、provider 兼容性和多模型行为一致性。  
- 关联：  
  - 依赖 runtime placement approval：[#11448](https://github.com/zeroclaw-labs/zeroclaw/pull/11448)

#### PR：Ollama 与 llama.cpp thinking controls  
- [#11468 - fix(providers): honor Ollama and llama.cpp thinking controls](https://github.com/zeroclaw-labs/zeroclaw/pull/11468)  
- 标签：`bug`, `risk:medium`, `provider`, `config`  
- 状态：Open  
- 用户诉求：  
  - 本地模型用户希望 `think` alias 和全局 `runtime.reasoning_enabled` 开关能实际传递到 provider 请求。  
  - 这是典型的“配置看似生效但实际被丢弃”的体验问题。  
- 影响：  
  - 对 Ollama、llama.cpp 用户较关键，尤其是依赖推理模式开关控制成本、速度或输出风格的场景。

---

### 4.4 ZeroCode 体验改进集中出现

#### PR：Provider alias 重命名  
- [#11460 - feat(zerocode): rename provider aliases in Config](https://github.com/zeroclaw-labs/zeroclaw/pull/11460)  
- 标签：`zerocode`, `size:XL`, `risk:medium`  
- 状态：Open  
- 价值：允许用户在 ZeroCode Config 中重命名 provider alias，提升配置管理可用性。

#### PR：Transcript layout cache 集中化  
- [#11459 - refactor(zerocode): centralize transcript layout cache](https://github.com/zeroclaw-labs/zeroclaw/pull/11459)  
- 标签：`type:refactor`, `domain:architecture`, `zerocode`, `size:XL`  
- 状态：Open  
- 价值：减少 transcript 视图状态不一致风险，为后续 UI 功能提供更稳的布局基础。

#### PR：刷新当前 session 且不取消任务  
- [#11457 - feat(zerocode): refresh the focused session without cancellation](https://github.com/zeroclaw-labs/zeroclaw/pull/11457)  
- 标签：`zerocode`, `risk:medium`, `size:XL`  
- 状态：Open  
- 用户痛点：  
  - 用户需要刷新当前 Code 或 Chat session，但不希望触发 cancel-first recovery。  
  - 该 PR 保留草稿、附件、队列和阅读位置，明显面向真实交互体验优化。

---

## 5. Bug 与稳定性

### S2：Daemon 中途死亡导致 session 永久 running

- Issue：[#11432 - a daemon killed mid-turn leaves the session marked running forever](https://github.com/zeroclaw-labs/zeroclaw/issues/11432)  
- 状态：Open  
- 严重程度：`S2 - degraded behavior`  
- 组件：`runtime/daemon`  
- 问题描述：  
  - 如果 daemon 在 turn 执行中死亡，`session_metadata` 中的 session 会永久保持 `state = 'running'`。  
  - `GET /api/sessions/running` 会一直列出该 session。  
  - `GET /api/sessions/{id}/state` 也持续返回 running。  
- 用户影响：  
  - 会造成 UI 或外部编排系统误判任务仍在运行。  
  - 可能阻止后续恢复、重试或清理逻辑。  
- 是否已有 fix PR：当前数据中未发现明确对应的 fix PR。  
- 建议优先级：高。该问题影响运行态一致性，应优先设计 daemon 重启后的 orphaned running session settlement 机制。

---

### 高风险安全 / 供应链：RustSec advisory scan failed

- Issue：[#11429 - ci: Advisory scan failed — 2026-10-02](https://github.com/zeroclaw-labs/zeroclaw/issues/11429)  
- 状态：Open  
- 标签：`security`, `status:in-progress`, `risk:high`  
- 问题：CI advisory scan 失败，报告 `anymap2` unmaintained。  
- 用户影响：  
  - 供应链安全风险。  
  - 可能阻塞发布或企业用户采纳。  
- 相关修复 PR：  
  - [#11475 - fix(deps): upgrade Wasmtime to clear eight RustSec advisories](https://github.com/zeroclaw-labs/zeroclaw/pull/11475)  
- 注意：  
  - #11475 主要升级 Wasmtime，以清理八个 RustSec advisories；是否覆盖 `anymap2` 问题需维护者确认。  
  - 建议将 #11429 与 #11475 明确关联，并补充 advisory 清单与残留风险。

---

### 跨平台空设备识别问题

- PR：[#11469 - fix(security): recognize the null device on every host](https://github.com/zeroclaw-labs/zeroclaw/pull/11469)  
- 状态：Open  
- 类型：Bug / Security policy  
- 问题：  
  - `is_null_device` 使用 `#[cfg(target_os)]`，导致 Windows build 只识别 Windows null device，Unix build 只识别 `/dev/null`。  
  - 在 Windows session 中评估 POSIX 命令，或容器 / 远端执行场景下，可能出现路径安全策略误判。  
- 影响：  
  - 跨平台 shell、Docker、远程 runtime 和 path policy 都可能受影响。  
- 关联 Issue：  
  - [#11470 - Use the effective shell dialect for cron path checks](https://github.com/zeroclaw-labs/zeroclaw/issues/11470)  
  - [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)

---

### Cron path 检查应使用实际 shell dialect

- Issue：[#11470 - Use the effective shell dialect for cron path checks](https://github.com/zeroclaw-labs/zeroclaw/issues/11470)  
- 状态：Open  
- 问题：cron scheduler 的 path-argument scan 应使用 runtime 的 effective shell dialect。  
- 特别说明：  
  - 需要保留当前 scanner 不解析 workspace 的行为，因为 cron 在 data directory 中执行。  
- 是否已有 fix PR：当前数据未显示明确 fix PR；但 #11469 可能解决相邻路径识别问题。  
- 风险：中。主要影响 cron 任务在不同 shell / OS / container 组合下的路径策略一致性。

---

### Container launcher 环境变量被清理

- PR：[#11471 - fix(runtime): preserve container launcher environment](https://github.com/zeroclaw-labs/zeroclaw/pull/11471)  
- 状态：Open  
- 问题：环境清理后未保留 `CONTAINER_HOST` 和 `DOCKER_HOST`，导致 Docker runtime launcher 可能无法继续使用 operator 选择的 host service。  
- 用户影响：  
  - Podman-compatible docker launcher 可能错误回退到本地 Podman instance。  
  - 对容器化部署和远端 Docker host 用户影响较大。  
- 建议：优先评审，属于中等风险但实际部署影响明显的修复。

---

### 文件写入元数据与旧内容保留问题

- PR：[#11463 - fix(tools): report pre-write metadata without retaining old content](https://github.com/zeroclaw-labs/zeroclaw/pull/11463)  
- 状态：Open  
- 问题：`file_write` 需要报告写入前目标是否存在、旧大小和写入字节数，但不应保留旧内容。  
- 用户价值：  
  - 让 overwrite 与首次写入可区分。  
  - 避免为报告元数据而保留敏感旧内容。  
- 风险：中，涉及 tool:file 的行为和安全边界。

---

### Memory audit hygiene SQLite admission 加固

- PR：[#11458 - fix(memory): harden audit hygiene SQLite admission](https://github.com/zeroclaw-labs/zeroclaw/pull/11458)  
- 状态：Open  
- 问题：周期性 audit retention 需要通过既有 Unix owner/link/mode 检查和跨平台 regular-file/sidecar 检查。  
- 用户价值：  
  - 加强 SQLite 文件准入路径，降低符号链接、权限或 sidecar 文件相关风险。  
- 风险：中，偏安全稳定性修复。

---

## 6. 功能请求与路线图信号

### 6.1 外部系统向运行中 Channel 发送消息

- Issue：[#11434](https://github.com/zeroclaw-labs/zeroclaw/issues/11434)  
- 状态：Closed  
- 诉求：新增 `POST /api/channels/{channel}/send`，允许外部系统不启动 agent turn 即发送消息。  
- 路线图判断：  
  - 虽然 Issue 已关闭，但相关语义在 #11461 中被重新梳理。  
  - 项目可能倾向于通过更明确的 messaging API，而非复用 `sessions_send` 或直接开放 channel send。  
  - 下一版本若包含消息语义清理，可能会影响外部集成方式。

---

### 6.2 Legacy native tool adapters 逐步退役

- Issue：[#11442 - Retire legacy native tool adapters after verified replacements](https://github.com/zeroclaw-labs/zeroclaw/issues/11442)  
- 状态：Open  
- 内容：在替代实现和升级路径被验证后，逐步移除 legacy native tool adapters。  
- 路线图信号：  
  - 项目正在推进工具系统现代化。  
  - 但维护者强调在迁移完成前要保留兼容 delivery。  
- 对用户影响：  
  - 使用 legacy native adapters 的用户未来需要迁移。  
  - 建议尽早提供迁移指南、兼容矩阵和弃用时间表。

---

### 6.3 测试隔离与时序问题批处理

- Issue：[#11426 - Batch the test isolation and timing fixes](https://github.com/zeroclaw-labs/zeroclaw/issues/11426)  
- 状态：Open  
- 内容：整合 11 个 PR，用于让测试更确定：独立 temp directory/home、移除 timing/port/retry 假设、补充覆盖。  
- 路线图信号：  
  - 项目正在主动修复测试不稳定性。  
  - 对长期交付质量非常关键。  
- 建议：  
  - 维护者可将这些小 PR 作为稳定性批次优先合并，降低 CI 噪音。

---

### 6.4 Windows 文件替换与路径处理修复批处理

- Issue：[#11425 - Batch the Windows file-replacement and path-handling fixes](https://github.com/zeroclaw-labs/zeroclaw/issues/11425)  
- 状态：Open  
- 内容：整合 10 个 PR，修复 Windows 上文件被 reader 持有时替换失败，以及 Windows path forms 处理问题。  
- 路线图信号：  
  - ZeroClaw 对 Windows 支持的质量正在被系统性提升。  
  - 这与 #11469、#11470 的跨平台路径策略问题形成同一主题。  
- 建议：  
  - 维护者应尽快定义 Windows path behavior 的测试基线，避免零散修复互相覆盖。

---

### 6.5 Channel 模型 fallback 通知

- PR：[#11464 - feat(channels): expose opt-in model fallback notices](https://github.com/zeroclaw-labs/zeroclaw/pull/11464)  
- 状态：Open  
- 功能：新增 `channels.model_fallback_notice`，支持 `off`、`redacted`、`detailed` 模式。  
- 用户价值：  
  - 当 provider family 内部发生模型 fallback 时，operator 可选择是否向 channel 发送通知。  
  - 对透明性、审计和故障排查有价值。  
- 纳入下一版本可能性：中高。该功能边界清晰，风险中等，配置可 opt-in。

---

### 6.6 Shell / Skill RSS watchdog 例外

- PR：[#11477 - docs(runtime): propose shell memory watchdog exception](https://github.com/zeroclaw-labs/zeroclaw/pull/11477)  
- 状态：Open  
- 类型：Docs / runtime placement exception  
- 说明：为 native shell/skill RSS watchdog 提出有界 pending exception。  
- 路线图信号：  
  - 项目正在考虑 shell/skill 的内存看护能力。  
  - 该能力可能用于限制 runaway shell 或 skill 任务的资源消耗。

---

## 7. 用户反馈摘要

### 7.1 外部系统集成希望绕过 agent turn 直接发送 channel 消息

- 来源：[#11434](https://github.com/zeroclaw-labs/zeroclaw/issues/11434)  
- 痛点：外部系统无法通过 ZeroClaw channel 发起或注入消息，除非触发 agent turn。  
- 使用场景：  
  - Webhook 转发。  
  - 系统通知。  
  - 外部应用向 Telegram / Matrix / WhatsApp / 其他 channel 推送消息。  
- 反馈倾向：用户需要更明确、更低副作用的 channel messaging API。

---

### 7.2 运行中任务状态需要具备崩溃恢复能力

- 来源：[#11432](https://github.com/zeroclaw-labs/zeroclaw/issues/11432)  
- 痛点：daemon 死亡后 session 永久 running，用户和系统都无法准确判断任务是否还活着。  
- 使用场景：  
  - 长任务执行中 daemon crash。  
  - 系统重启。  
  - 后台任务编排和 UI 状态展示。  
- 不满意点：状态机缺少 crash settlement / orphan cleanup。

---

### 7.3 本地模型用户要求配置开关真实生效

- 来源：[#11468](https://github.com/zeroclaw-labs/zeroclaw/pull/11468)  
- 痛点：Ollama / llama.cpp 的 `think` 和 `reasoning_enabled` 设置被收集但未传递到请求。  
- 使用场景：  
  - 控制推理模式。  
  - 平衡响应质量、延迟和资源消耗。  
- 不满意点：配置表面存在，但实际行为不一致。

---

### 7.4 容器运行用户依赖外部 Docker / Podman host

- 来源：[#11471](https://github.com/zeroclaw-labs/zeroclaw/pull/11471)  
- 痛点：环境变量清理导致 `DOCKER_HOST` / `CONTAINER_HOST` 丢失，运行时连接到错误容器服务。  
- 使用场景：  
  - 远程 Docker host。  
  - Podman-compatible Docker launcher。  
  - 多容器运行环境。  
- 反馈倾向：安全环境清理需要保留明确允许的运行时关键变量。

---

### 7.5 ZeroCode 用户关注不中断式刷新与配置编辑便利性

- 来源：[#11457](https://github.com/zeroclaw-labs/zeroclaw/pull/11457)、[#11460](https://github.com/zeroclaw-labs/zeroclaw/pull/11460)  
- 痛点：刷新 session 不应取消任务；provider alias 应可在 UI 中直接重命名。  
- 使用场景：  
  - 长对话 / 长代码任务期间查看最新状态。  
  - 多 provider alias 管理。  
- 满意信号：这些 PR 都是直接面向操作体验的改善，说明项目开始关注日常使用流畅度。

---

## 8. 待处理积压

### 8.1 高风险大体量堆叠 PR 积压

当前存在多项 `risk:high`、`size:XL`、`stacked` PR，建议维护者优先建立评审顺序和依赖图：

1. [#11466 - feat(config): report per-target application results](https://github.com/zeroclaw-labs/zeroclaw/pull/11466)  
   - 覆盖面极广，建议拆分验证配置结果模型、API 输出、CLI/UI 展示和测试。

2. [#11467 - feat(agent): add opt-in single-tool provider rounds](https://github.com/zeroclaw-labs/zeroclaw/pull/11467)  
   - 涉及 agent-provider-tool 调用语义，建议重点评审 provider 兼容性和默认行为不变性。

3. [#11465 - feat(tools): expose cooperative cancellation context](https://github.com/zeroclaw-labs/zeroclaw/pull/11465)  
   - 涉及取消语义，建议补充资源清理和中断时一致性测试。

4. [#11473 - feat(tools): defer built-in schemas through tool_search](https://github.com/zeroclaw-labs/zeroclaw/pull/11473)  
   - 与 tool discovery 和 runtime placement 有关，需确认延迟 schema 不破坏现有 prompt/tool 调用行为。

---

### 8.2 安全与供应链问题需优先闭环

- Issue：[#11429 - ci: Advisory scan failed — 2026-10-02](https://github.com/zeroclaw-labs/zeroclaw/issues/11429)  
- PR：[#11475 - fix(deps): upgrade Wasmtime to clear eight RustSec advisories](https://github.com/zeroclaw-labs/zeroclaw/pull/11475)  
- 建议：  
  - 明确 #11475 是否完全解决 #11429。  
  - 如果 `anymap2` 仍未解决，应单独跟踪替换路径。  
  - 供应链 advisory 不宜长期打开，可能影响用户信任和发布节奏。

---

### 8.3 Daemon 崩溃后的 running session settlement 缺口

- Issue：[#11432](https://github.com/zeroclaw-labs/zeroclaw/issues/11432)  
- 当前状态：Open，无明确 fix PR。  
- 建议：  
  - 设计 daemon startup reconciliation。  
  - 为 in-flight turn 增加 heartbeat / lease / owner epoch。  
  - 对过期 running session 自动标记为 interrupted / failed / orphaned。  
  - 提供手动恢复或清理 API。

---

### 8.4 Windows 与跨平台路径处理批次需集中合并

- Tracker：[#11425](https://github.com/zeroclaw-labs/zeroclaw/issues/11425)  
- 相关：[#11469](https://github.com/zeroclaw-labs/zeroclaw/pull/11469)、[#11470](https://github.com/zeroclaw-labs/zeroclaw/issues/11470)  
- 建议：  
  - 将 Windows path forms、null device、shell dialect、cron scan 行为纳入同一测试矩阵。  
  - 避免按单点修复合并后出现行为不一致。

---

### 8.5 测试确定性 PR 批次应尽快消化

- Tracker：[#11426](https://github.com/zeroclaw-labs/zeroclaw/issues/11426)  
- 建议：  
  - 优先合并低风险、小体量、只影响测试隔离的 PR。  
  - 测试 flakiness 会放大高风险 PR 的评审成本，越早修复收益越高。

---

## 总体健康度结论

ZeroClaw 今日表现出 **极高开发活跃度和清晰的工程治理意识**：安全扫描、Windows 兼容性、测试确定性、runtime placement exception、工具语义和配置可观测性都在同步推进。  
主要风险不是缺乏贡献，而是 **待合并 PR 过多、堆叠依赖复杂、高风险大体量变更集中**。  
建议维护者短期内优先处理三类事项：  
1. 安全 advisory 与依赖升级闭环；  
2. daemon 崩溃导致 session 永久 running 的稳定性问题；  
3. Windows / path / test isolation 这类可降低后续维护成本的基础修复批次。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*