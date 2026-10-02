# OpenClaw 生态日报 2026-10-02

> Issues: 9 | PRs: 58 | 覆盖项目: 13 个 | 生成时间: 2026-10-02 04:36 UTC

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
日期：2026-10-02  
仓库：github.com/openclaw/openclaw

---

## 1. 今日速览

过去 24 小时，OpenClaw 维持了非常高的工程活跃度：Issues 更新 9 条，其中 6 条仍处于打开状态、3 条已关闭；PR 更新 58 条，其中 34 条待合并、24 条已合并或关闭。今日活动重点集中在 Gateway 权限边界、会话状态、更新流程、Hugging Face 认证、CI 稳定性和 extended-stable 维护线。

从健康度看，项目迭代速度很快，但同时伴随较高的兼容性与安全边界风险：多个 PR 标记了 `merge-risk: compatibility`、`security-boundary`、`message-delivery` 或 `session-state`。P0/P1 级别问题仍然存在，尤其是更新失败、本地 Ollama 在 Windows 上运行失败、release-critical backport 等，对维护者来说短期内仍需优先稳定发布链路与核心会话能力。

总体判断：OpenClaw 今日处于“高活跃、高维护压力”的状态，主线和 extended-stable 线并行推进，工程团队正在集中清理历史兼容逻辑、迁移同步读取到 worker，并为 2026.9.8 / 2026.8.35 等维护版本做准备。

---

## 2. 版本发布

### v2026.8.34：openclaw 2026.8.34  
链接：<https://github.com/openclaw/openclaw/releases/tag/v2026.8.34>

今日发布了 `v2026.8.34`，这是一个 **gateway-only extended-stable** 版本。根据发布说明，该版本是 OpenClaw 2026 年 8 月末代码的维护线版本，并叠加了关键安全更新、可靠性修复、性能修复以及部分新模型支持。

#### 版本定位

- `extended-stable` 是当前 OpenClaw 相当于 LTS 的维护分支。
- 该版本面向需要稳定 Gateway 行为、希望降低主线变动风险的部署者。
- 发布内容并非完整追随最新主线，而是选择性回补关键修复。

#### 主要更新方向

从 release 描述和今日相关 PR 可推断，本次维护线重点可能包括：

- Gateway 安全与可靠性修复；
- 性能和稳定性补丁；
- 新模型支持；
- 对生产部署更友好的长期维护策略。

#### 破坏性变更

目前给出的 release 摘要中未明确声明破坏性变更。但由于该版本属于 gateway-only extended-stable，建议使用者特别关注以下风险：

- Gateway 权限模型或 scope 检查行为可能发生细微变化；
- 与插件、会话、认证、更新器相关的补丁可能影响旧部署中的边缘行为；
- 如果从主线版本回退到 extended-stable，需确认功能差异。

#### 迁移与升级注意事项

建议生产用户升级前执行：

1. 备份 Gateway 配置、会话状态和插件目录；
2. 在 staging 环境验证认证、会话创建、子代理启动、消息投递等核心路径；
3. 检查自定义插件是否依赖非稳定 Gateway 内部 API；
4. 如使用自动更新机制，关注今日仍有更新失败报告：  
   - Issue #163211：<https://github.com/openclaw/openclaw/issues/163211>  
   - Issue #163237：<https://github.com/openclaw/openclaw/issues/163237>

---

## 3. 项目进展

今日 PR 活动非常密集，重点集中在 release 修复、Gateway 重构、会话读写迁移、认证和 CI 可靠性。

### 已关闭 / 已合并的重要 PR

> 注：数据中 PR 状态仅显示 `CLOSED`，未区分 merged 与 closed without merge。以下按“今日完成/关闭的重要工作”解读。

#### 1. 修复后台写入后会话详情丢失  
PR #163030：<https://github.com/openclaw/openclaw/pull/163030>

该 PR 处理后台 session commits 后可能丢失 owner / participant details 的问题，并减少 Gateway 发布阶段的同步 SQLite reload。  
影响方向：

- 改善会话状态一致性；
- 降低后台写入对 Gateway 线程的阻塞；
- 对多参与者、多 owner 场景更安全。

相关领域：session-state、Gateway、commands。

#### 2. 避免重复生成 isolated assets  
PR #162997：<https://github.com/openclaw/openclaw/pull/162997>

该 PR 优化构建流程，避免 root phase 和 isolated package builder 重复生成 pure plugin assets。  
影响方向：

- 降低源码构建耗时；
- 保持插件资产内容和校验不变；
- 对开发者和 CI 构建效率有正面作用。

#### 3. 支持 Bun 更新流程中的 managed Node  
PR #163227：<https://github.com/openclaw/openclaw/pull/163227>

修复 Git development updates 在 Bun 运行时下错误拒绝 operator-managed Node 的问题。  
影响方向：

- 改善 Bun + Node 混合环境下的更新体验；
- 对使用非系统目录 Node 的开发者和运维人员有帮助；
- 与今日多个 update failure issue 形成呼应。

#### 4. 清理 TUI 未使用参数  
PR #163233：<https://github.com/openclaw/openclaw/pull/163233>

删除 terminal submit callback 中未使用的 blocked-message 参数。  
影响方向：

- 无用户可见行为变化；
- 清理内部 API 和测试预期；
- 降低后续维护成本。

### 待合并但对项目推进关键的 PR

#### 1. 回补 release-critical 更新与会话修复  
PR #163074：<https://github.com/openclaw/openclaw/pull/163074>

该 PR 目标是将 2026.9.8 release candidate 缺失的关键修复回补进去，包括：

- update rehearsal / copy failure 修复；
- Windows copy 修复；
- 性能与内存问题修复；
- Codex delegated-work 相关修复；
- session 相关可靠性修复。

这是今日最重要的 release 稳定性 PR 之一，带有 `P1`、`merge-risk: compatibility`、`merge-risk: message-delivery` 和 `proof: telegram-e2e` 标签。  
如果顺利合并，将显著提升 2026.9.8 的发布质量。

#### 2. 准备 extended-stable 2026.8.35  
PR #163214：<https://github.com/openclaw/openclaw/pull/163214>

该 PR 在已发布的 `v2026.8.34` 基础上准备 `v2026.8.35` 维护候选版本。  
内容覆盖范围极广，包括：

- GPT-6.1 Sol/Reef 支持；
- P0/P1 安全修复；
- 可靠性、性能、更新、频道、agent、cron 等维护补丁。

该 PR 显示 OpenClaw 维护线仍在快速前进，extended-stable 并非冻结分支，而是持续选择性吸收高价值修复。

#### 3. Gateway 请求与运行时流程去重  
PR #162874：<https://github.com/openclaw/openclaw/pull/162874>

该 PR 继续维护者要求的 Gateway duplication sweep，减少 handler 中重复的 session-target resolution、scope predicates、queue mechanics 和 normalization。  
重要性：

- Gateway 是 OpenClaw 的关键控制面；
- 去重有助于降低权限判断不一致、消息队列行为分叉等风险；
- 但 PR 标记了 `security-sensitive-changed` 和 `merge-risk: compatibility`，需要谨慎审查。

#### 4. 会话读取迁移到 worker  
PR #163208：<https://github.com/openclaw/openclaw/pull/163208>

该 PR 将 conversation listing、send/turn lookup、manual-compaction primary-address reads 等 SQLite 操作迁移出 Gateway 线程。  
预期收益：

- 降低 Gateway 主线程阻塞；
- 改善大规模会话下的响应性；
- 推进数据库 worker 化的架构演进。

#### 5. memory inventory reads 迁入 history worker  
PR #163234：<https://github.com/openclaw/openclaw/pull/163234>

该 PR 处理 memory corpus discovery、archived search hits、memory synchronization 和 memory-forget 中仍在 Gateway 线程扫描 SQLite 的问题。  
当前状态为 `waiting on author`，但它与整体“移除 Gateway 同步读”的方向高度一致。

---

## 4. 社区热点

> 数据中 PR 评论数显示为 `undefined`，无法按真实评论数排序。因此本节基于 issue 严重程度、标签、影响面和 PR 风险标签综合判断热点。

### 1. Native sub-agent / guest 权限边界问题

#### Issue #163248：Hidden sub-agent launch rejects guests with own-session write authority  
链接：<https://github.com/openclaw/openclaw/issues/163248>

用户报告：拥有 `operator.sessions.write` 的 guest，在自己的 sandboxed session 中启动 hidden native sub-agent 时，被 Gateway 拒绝，错误为 `missing scope: operator.write`。

核心诉求：

- guest 已拥有当前 session 写权限；
- 用户期望其能在自己的隔离会话内启动 hidden sub-agent；
- 当前 Gateway 权限检查可能过于粗粒度，把 session-scoped write 误判为需要全局 operator write。

这反映出 OpenClaw 在多租户、访客代理、子代理 delegation 上正在进入更复杂的权限模型阶段。

相关 PR / 信号：

- PR #163225：incognito actor session facts and authority  
  <https://github.com/openclaw/openclaw/pull/163225>
- PR #162874：Gateway request/runtime flow 重构  
  <https://github.com/openclaw/openclaw/pull/162874>

### 2. before_tool_call 无法区分主 agent 与 native subagent 调用

#### Issue #163240  
链接：<https://github.com/openclaw/openclaw/issues/163240>

用户希望 Claude Code 和 Codex 已经发送的 `agent_id` 能进入 `before_tool_call` 插件上下文，例如 `ctx.nativeAgentId`。

背后诉求：

- 插件需要识别工具调用来自主 agent 还是 engine-started subagent；
- 安全插件、审计插件、策略插件需要更细粒度上下文；
- 当前工具调用上下文不足以支撑复杂 delegated work 场景。

该 issue 带有：

- `impact:security`
- `needs-security-review`
- `needs-product-decision`
- `issue-rating: diamond lobster`

说明它不仅是功能增强，也涉及审计和安全边界。

### 3. Hugging Face device-code login

#### Issue #163235  
链接：<https://github.com/openclaw/openclaw/issues/163235>

用户希望 Hugging Face inference provider 支持 public-client device-code authentication，而不是只能手动配置 HF access token。

对应 PR：

- PR #163242：support device-code login and token refresh  
  <https://github.com/openclaw/openclaw/pull/163242>
- PR #163244：offer device-code OAuth during onboarding  
  <https://github.com/openclaw/openclaw/pull/163244>

这是今日最明确的“issue 到 PR”闭环之一，说明该需求很可能进入近期版本。

### 4. macOS 原生侧边栏支持 snooze sessions

#### PR #163241  
链接：<https://github.com/openclaw/openclaw/pull/163241>

Web Control UI、Android、iOS 已支持 session snooze，但 macOS native sidebar 缺失该能力。该 PR 将 snooze / find snoozed / wake early 引入 macOS。

背后诉求：

- 多端体验一致；
- 会话过多时需要延后处理和整理；
- 原生 macOS 用户希望不依赖 Web UI 完成会话管理。

### 5. extended-stable 维护线持续推进

#### PR #163214  
链接：<https://github.com/openclaw/openclaw/pull/163214>

该 PR 准备 `v2026.8.35`，覆盖大量组件和通道，说明 extended-stable 正在积极吸收高优先级修复。对生产用户而言，这是一个重要信号：OpenClaw 正在为稳定线提供持续维护，而不是只推动主线。

---

## 5. Bug 与稳定性

### P0：Windows + local Ollama 每次 agent run 都失败

#### Issue #163212：DataCloneError on every agent run with local Ollama provider  
链接：<https://github.com/openclaw/openclaw/issues/163212>  
状态：已关闭

严重程度：

- `P0`
- `impact:message-loss`
- `impact:ux-release-blocker`

问题描述：

- 在 Windows 上使用本地 Ollama provider 时，每次 agent run 都失败；
- Dashboard 和 `openclaw tui` 均受影响；
- 报错为 `WorkerTaskError: DataCloneError: #<Object> could not be cloned.`

影响：

- 本地模型用户无法正常运行 agent；
- 属于 release blocker 级别问题；
- 可能涉及 worker message serialization、provider object clone 或 Windows 特定路径。

是否已有 fix PR：

- Issue 已关闭，但数据中未明确关联具体修复 PR。
- 可能被纳入 release-critical backport PR #163074：  
  <https://github.com/openclaw/openclaw/pull/163074>

### P0：更新失败 global-install-failed

#### Issue #163211  
链接：<https://github.com/openclaw/openclaw/issues/163211>  
状态：打开

严重程度：

- `P0`
- `impact:ux-release-blocker`
- `maturity:stable`
- `needs-info`

问题描述：

- OpenClaw 2026.9.4 升级到 2026.9.7 失败；
- 平台：darwin/arm64；
- Node：24.19.0；
- 类型：global install failed。

影响：

- 稳定版用户升级路径受阻；
- 对 release adoption 影响较大；
- 由于 `needs-info`，维护者仍需更多环境细节。

相关修复信号：

- PR #163227：support Bun updates with managed Node  
  <https://github.com/openclaw/openclaw/pull/163227>
- PR #163074：backport release-critical update repairs  
  <https://github.com/openclaw/openclaw/pull/163074>

### P2：Hidden sub-agent 权限误拒

#### Issue #163248  
链接：<https://github.com/openclaw/openclaw/issues/163248>  
状态：打开

问题描述：

- guest 拥有 `operator.sessions.write`；
- 在自己的 sandboxed session 中启动 hidden native sub-agent；
- Gateway 要求 `operator.write`，导致拒绝。

影响：

- 影响 delegation 和 sub-agent 工作流；
- 可能阻碍多租户/访客模式下的自动化；
- 涉及权限边界，修复需谨慎。

是否已有 fix PR：

- 未见直接 fix PR。
- 相关方向可能包括 PR #163225 和 PR #162874。

### P2 / 安全：before_tool_call 缺少 native subagent 身份

#### Issue #163240  
链接：<https://github.com/openclaw/openclaw/issues/163240>  
状态：打开

问题描述：

- 插件无法识别 tool call 来源于 primary agent 还是 native subagent；
- 希望将 native `agent_id` 暴露到 `before_tool_call` context。

影响：

- 安全审计不完整；
- policy plugin 不能按 agent 身份施加不同约束；
- delegated work 场景下可观测性不足。

是否已有 fix PR：

- 未见直接 fix PR。
- 由于标记 `needs-security-review` 和 `needs-product-decision`，预计需要设计讨论后再实现。

### P2：workspace skill 与 Telegram native command 冲突

#### Issue #163144  
链接：<https://github.com/openclaw/openclaw/issues/163144>  
状态：已关闭

问题描述：

- 名为 `export-session` 的 workspace skill 会生成重复的 Telegram `export_session` 菜单项；
- 还会改变传递给 shared message pipeline 的 canonical command body。

影响：

- 命令命名空间冲突；
- Telegram 频道体验异常；
- shared message pipeline 可能受到错误输入。

是否已有 fix PR：

- Issue 已关闭，但数据中未明确列出关联 PR。
- 相关领域可能与 command normalization 和 channel command handling 有关。

### P3：更新失败 clean-check

#### Issue #163237  
链接：<https://github.com/openclaw/openclaw/issues/163237>  
状态：已关闭

问题描述：

- OpenClaw 2026.9.7 在 darwin/arm64、Node 26.10.0 环境出现 clean-check 更新失败。

影响：

- 影响部分 CLI update 流程；
- 已关闭，说明可能已被修复、重复归档或不再复现。

### P3：CI 生命周期测试误报

#### PR #163249  
链接：<https://github.com/openclaw/openclaw/pull/163249>

问题描述：

- Scheduled CI 因 SQLite maintenance 创建额外 scheduler，或测试 harness 缺少 logger 方法，导致 lifecycle false failures。

影响：

- 降低维护者对 CI 结果的信任；
- 可能阻塞或延迟 PR 合并。

当前状态：

- fix PR 已打开。

---

## 6. 功能请求与路线图信号

### 1. Hugging Face device-code OAuth 很可能进入近期版本

#### Issue #163235  
链接：<https://github.com/openclaw/openclaw/issues/163235>

用户希望 HF inference provider 支持 device-code login，解决远程主机和 public OAuth app 场景下 token 管理困难的问题。

对应 PR：

- PR #163242：<https://github.com/openclaw/openclaw/pull/163242>  
  支持 device-code login 和 token refresh。
- PR #163244：<https://github.com/openclaw/openclaw/pull/163244>  
  在 onboarding 中提供 Hugging Face OAuth 入口。

判断：

- 该功能已有实现 PR，且 #163244 明确 `Closes #163235`；
- 很可能进入下一批 minor 或 patch 版本；
- 若 #163242 仍处于 `waiting on author`，可能先合并 onboarding discovery，再完善 refresh。

### 2. Owner-scoped session pins

#### Issue #163213  
链接：<https://github.com/openclaw/openclaw/issues/163213>

用户希望 session pin 支持 owner-scoped release，即自动化只能释放自己创建的 pin，不影响其他调用方后续创建的 pin。

背后路线图信号：

- OpenClaw 的 session lifecycle 正在被更多自动化系统使用；
- 当前 pin/unpin 模型缺少多 owner 安全语义；
- 未来 session-state API 可能引入 owner、lease 或 conditional release 机制。

相关 PR：

- PR #163225：incognito actor session facts and authority  
  <https://github.com/openclaw/openclaw/pull/163225>
- PR #163208：move conversation reads into workers  
  <https://github.com/openclaw/openclaw/pull/163208>

### 3. Guest agent 自主重命名 session

#### Issue #163252  
链接：<https://github.com/openclaw/openclaw/issues/163252>

用户报告：guest 拥有 `operator.sessions.write`，能在 Control UI 中重命名自己创建的 session，但无法让该 session 的 agent 执行同样的 rename。工具目录只暴露 `assign_owner`，没有 label/rename 操作。

路线图信号：

- Tool catalog 的权限表达与 UI 权限能力不一致；
- agent self-service session management 需要更完整的工具 API；
- 与 #163248 一样，反映 guest / scoped authority 需要系统性整理。

### 4. native subagent identity 进入插件上下文

#### Issue #163240  
链接：<https://github.com/openclaw/openclaw/issues/163240>

如果该需求被采纳，OpenClaw 插件系统可能会增强：

- `before_tool_call` context；
- subagent-aware policy；
- delegated-work audit trail；
- nativeAgentId / agent_id 相关上下文字段。

这对安全插件和企业审计场景非常重要。

### 5. macOS session snooze 与多端 parity

#### PR #163241  
链接：<https://github.com/openclaw/openclaw/pull/163241>

该 PR 表明 OpenClaw 正在补齐多端客户端功能一致性。session snooze 已从 Web、Android、iOS 扩展到 macOS，未来可能继续强化原生客户端作为一等入口的能力。

---

## 7. 用户反馈摘要

### 1. 权限模型对 guest / sub-agent 场景不够直观

相关 issue：

- #163248：<https://github.com/openclaw/openclaw/issues/163248>
- #163252：<https://github.com/openclaw/openclaw/issues/163252>
- #163240：<https://github.com/openclaw/openclaw/issues/163240>

用户痛点：

- 用户已经具备 session-scoped write 权限，却被要求全局 `operator.write`；
- UI 能做的事情，agent 工具却不能做；
- 插件无法区分 primary agent 和 native subagent 的工具调用。

真实场景：

- 多租户 guest sandbox；
- hidden native sub-agent delegation；
- 插件做安全审计、访问控制和 tool-call 策略判断；
- agent 代表用户管理自己的 session。

反馈倾向：

- 用户期望权限模型更细粒度、更一致；
- 不希望为了 session 内操作授予全局 operator 权限；
- 需要更多上下文字段帮助插件安全决策。

### 2. 更新流程仍是稳定版用户的主要不满意点

相关 issue / PR：

- Issue #163211：<https://github.com/openclaw/openclaw/issues/163211>
- Issue #163237：<https://github.com/openclaw/openclaw/issues/163237>
- PR #163227：<https://github.com/openclaw/openclaw/pull/163227>
- PR #163074：<https://github.com/openclaw/openclaw/pull/163074>

用户痛点：

- stable / CLI update 过程中出现 clean-check 或 global-install-failed；
- Bun、Node、global install、PATH 管理交织，容易出错；
- macOS arm64 是今日多条更新失败报告中的共同环境。

反馈倾向：

- 用户希望更新器更能识别 operator-managed runtime；
- 失败时需要更清楚的诊断和恢复步骤；
- release candidate 需要在更新路径上加强验证。

### 3. 本地模型和 Windows 用户对可靠性要求高

相关 issue：

- Issue #163212：<https://github.com/openclaw/openclaw/issues/163212>

用户痛点：

- 使用 local Ollama provider 时 agent run 每次失败；
- Dashboard 和 TUI 都不可用；
- 错误信息 `DataCloneError` 对普通用户不可操作。

反馈倾向：

- 本地模型应是核心路径，而非边缘路径；
- Windows 平台需要和 macOS/Linux 一样被稳定支持；
- worker serialization 类错误需要更好的防护和测试覆盖。

### 4. 认证体验正在从手动 token 转向 OAuth / device flow

相关 issue / PR：

- Issue #163235：<https://github.com/openclaw/openclaw/issues/163235>
- PR #163242：<https://github.com/openclaw/openclaw/pull/163242>
- PR #163244：<https://github.com/openclaw/openclaw/pull/163244>

用户痛点：

- 只能配置 HF access token 不适合远程主机；
- public OAuth app 场景下希望 OpenClaw 管理 refresh；
- onboarding 中缺少可发现的 OAuth 登录入口。

反馈倾向：

- 用户希望 provider auth 更像现代 CLI 登录；
- device-code login 是远程服务器、headless 环境的关键能力。

---

## 8. 待处理积压

> 今日数据仅覆盖过去 24 小时，无法完整识别“长期未响应”的历史积压。以下列出当前仍打开且需要维护者关注的高价值 / 高风险事项。

### 1. Gateway 权限与 scoped authority 系列问题

#### Issue #163248  
链接：<https://github.com/openclaw/openclaw/issues/163248>

guest 拥有 session write 但无法启动 hidden sub-agent。建议维护者优先明确：

- `operator.sessions.write` 是否应允许 own-session sub-agent spawn；
- hidden native sub-agent 是否需要额外 scope；
- session-scoped authority 与 global operator authority 的边界。

#### Issue #163252  
链接：<https://github.com/openclaw/openclaw/issues/163252>

guest 能在 UI 中重命名 session，但 agent 工具目录未暴露 rename/label 操作。建议维护者检查：

- Control UI 与 agent tool catalog 的权限一致性；
- session label operation 是否应加入 `sessions` tool；
- 是否需要基于 owner/session-scope 的工具过滤。

### 2. before_tool_call subagent identity 需要产品与安全决策

#### Issue #163240  
链接：<https://github.com/openclaw/openclaw/issues/163240>

该 issue 已被标记为：

- `needs-maintainer-review`
- `needs-product-decision`
- `needs-security-review`
- `impact:security`

建议优先安排设计讨论，避免插件生态在 subagent 场景下继续缺少审计上下文。

### 3. 更新失败仍需信息补全和 release 验证

#### Issue #163211  
链接：<https://github.com/openclaw/openclaw/issues/163211>

当前为 P0 且 `needs-info`。建议维护者：

- 向用户请求完整 install log、PATH、npm/bun/node runtime 信息；
- 对 macOS arm64 + Node 24.x 路径做复现；
- 将相关验证纳入 2026.9.8 release candidate。

### 4. 高风险 Gateway / session 重构 PR 需要重点审查

#### PR #162874：Gateway request/runtime flow 去重  
链接：<https://github.com/openclaw/openclaw/pull/162874>

涉及安全敏感代码，建议审查重点：

- scope predicate 是否等价；
- session-target resolution 是否保持兼容；
- queue mechanics 是否影响消息顺序和投递。

#### PR #163208：conversation reads 迁入 worker  
链接：<https://github.com/openclaw/openclaw/pull/163208>

建议审查重点：

- worker failure fallback；
- session address ownership；
- manual compaction 路径；
- Gateway thread 与 worker 之间的一致性。

#### PR #163234：memory inventory reads 迁入 history worker  
链接：<https://github.com/openclaw/openclaw/pull/163234>

当前 `waiting on author`。建议关注：

- SQLite inventory scan 的 worker 化是否完整；
- memory synchronization 与 archive discovery 是否存在重复或竞态；
- memory-forget 的 selector read 是否会改变行为。

### 5. 兼容性清理类 PR 需要谨慎合并窗口

以下 PR 都在清理历史兼容路径，长期看有利于维护，但短期可能影响旧部署：

- PR #163221：retire pre-July cron file imports  
  <https://github.com/openclaw/openclaw/pull/163221>
- PR #163247：remove runtime legacy job identity repair  
  <https://github.com/openclaw/openclaw/pull/163247>
- PR #162612：move legacy agent roster reads into Doctor  
  <https://github.com/openclaw/openclaw/pull/162612>
- PR #163231：retire obsolete npm declaration stubs  
  <https://github.com/openclaw/openclaw/pull/163231>

建议维护者确保：

- Doctor migration 提示足够清晰；
- extended-stable 与 main 的兼容策略一致；
- release notes 明确说明旧格式不再运行时导入，只保留诊断或迁移路径。

---

## 总体健康度评估

OpenClaw 今日项目健康度可以评为：**活跃度高，维护响应快，但稳定性压力较大**。

积极信号：

- 24 小时内 58 条 PR 更新，维护和开发节奏很快；
- Hugging Face OAuth、macOS snooze、Gateway worker 化等功能有明确推进；
- extended-stable 线持续发布和准备下一维护版本；
- 多个 P0/P1 release-critical 修复正在集中回补。

风险信号：

- P0 update failure 和 Windows local Ollama failure 暴露发布质量压力；
- Gateway 权限和 session-scoped authority 相关问题增多；
- 多个重构 PR 触及兼容性、安全边界和消息投递；
- 历史兼容逻辑清理较密集，需要更强的迁移说明和回归测试。

建议维护者短期优先级：

1. 先稳定 2026.9.8 release candidate 的更新、Windows、本地模型和消息投递路径；
2. 对 guest / sub-agent / session-scoped authority 做一次统一设计审查；
3. 合并 Hugging Face device-code OAuth 相关 PR，形成完整用户闭环；
4. 对 Gateway worker 化和历史兼容清理 PR 采用分批合并，并加强 release notes。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告  
日期：2026-10-02

---

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态呈现出明显的“两极分化”：头部项目如 OpenClaw、Hermes Agent、ZeroClaw 处于高频迭代与高修复压力并存阶段，而 NanoBot、PicoClaw、Moltis 等项目则以小规模稳定性修复为主。  
从技术议题看，生态焦点已从单纯“能调用模型 / 工具”转向 **Gateway 权限边界、会话状态一致性、插件安全、跨平台部署、更新可靠性、MCP/Provider 兼容性** 等生产化问题。  
多项目同时暴露出“静默失败”“会话生命周期复杂”“工具调用过程不可观测”“更新链路脆弱”等共性痛点，说明 AI Agent 框架正在进入更真实、更复杂的落地阶段。  
OpenClaw 依然是今日最活跃、覆盖面最广的核心参照项目之一，其工程节奏、稳定线维护和权限模型演进对整个生态具有较强风向标意义。

---

## 2. 各项目活跃度对比

| 项目 | Issues 活动 | PR 活动 | Release | 今日重点 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 9 | 58 | v2026.8.34 | Gateway 权限、session worker 化、更新修复、HF OAuth、extended-stable | **高活跃，高维护压力** |
| **Hermes Agent** | 50 | 50 | 无 | Gateway/session、Dashboard PTY、附件下载、Windows update、音频热插拔 | **高活跃，高稳定性压力** |
| **ZeroClaw** | 10 | 50 | 无 | Gateway/core 统一、认证授权、Web 工作区、插件生命周期、MCP | **高活跃，合并吞吐偏低** |
| **NanoClaw** | 3 | 12 | 无 | OneCLI 安全、更新通道、依赖治理、PreCompact hook | **维护活跃，安全治理导向明显** |
| **CoPaw / QwenPaw** | 7 | 5 | 无 | Console/Chat、第三方 Agent、Provider 适配、E2E 测试隔离 | **社区活跃，修复压力上升** |
| **NanoBot** | 1 | 2 | 无 | `sendProgress` 语义与文档一致性 | **稳定但偏冷清** |
| **PicoClaw** | 0 | 1 | 无 | Agent 单轮 wall-clock 时间预算 | **低活跃，有明确运行控制方向** |
| **Moltis** | 0 | 2 | 无 | TLS/WebSocket 兼容、MCP 启动恢复 | **低噪声修复推进** |
| **IronClaw** | 1 | 0 | 无 | benchmark failure taxonomy | **开发低活跃，质量监控持续** |
| **LobsterAI** | 0 | 1 | 无 | 未登录模型目录恢复、模型选择器空态 | **低频维护，UX 修复为主** |
| **NullClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **ZeptoClaw** | 0 | 0 | 无 | 无活动 | **静默** |

---

## 3. OpenClaw 在生态中的定位

### 3.1 相对优势

OpenClaw 今日体现出三个显著优势：

1. **工程活跃度最高之一**  
   过去 24 小时有 58 条 PR 更新、9 条 Issue 更新，并发布了 `v2026.8.34` extended-stable 版本。相比多数项目无发布或仅少量修复，OpenClaw 的维护节奏明显更快。

2. **稳定线维护能力较强**  
   OpenClaw 不仅推进主线，还持续维护 `extended-stable` 分支，并准备 `v2026.8.35`。这在同类项目中较突出，说明其用户群中已有较多生产部署者，需要更可预测的升级路径。

3. **核心架构演进清晰**  
   今日多个 PR 指向 Gateway 去重、SQLite 读取迁移到 worker、session state 修复、权限边界整理。这表明 OpenClaw 正在从“功能堆叠”转向“控制面架构治理”。

### 3.2 技术路线差异

| 维度 | OpenClaw | Hermes Agent | ZeroClaw | CoPaw | NanoClaw |
|---|---|---|---|---|---|
| 核心关注 | Gateway、session、权限、稳定线 | 多平台 Gateway、Desktop/Dashboard、插件平台 | Core/Gateway 统一、安全授权、Web 工作区 | Console、第三方 Agent、模型/Provider 适配 | OneCLI、安全安装、更新治理 |
| 发布策略 | 有 extended-stable / gateway-only 维护线 | 今日无发布，修复 PR 密集 | 今日无发布，PR 堆栈大 | Beta 回归与体验修复 | 更新通道从 main 转 release tag |
| 架构演进 | Worker 化、权限边界细化、会话一致性 | 多前端、多平台、多插件适配 | Core 化、权限收紧、文件系统访问控制 | UI/Console 与 Provider 生态适配 | 安装/运维安全治理 |
| 典型风险 | 高速迭代下兼容性与安全边界风险 | 静默失败、会话租约、跨平台边界 | stacked PR 多、S1/S2 未关闭 | Beta 回归、Provider 硬编码 | 安全 PR 待合并、hook 失败 |

### 3.3 社区规模与活跃度对比

从今日数据看，OpenClaw 与 Hermes Agent、ZeroClaw 属于第一梯队：

- **OpenClaw**：58 PR / 9 Issues / 1 Release  
- **Hermes Agent**：50 PR / 50 Issues / 0 Release  
- **ZeroClaw**：50 PR / 10 Issues / 0 Release  

OpenClaw 的独特之处在于：不仅 PR 数高，还存在实际版本发布和维护线推进；Hermes Agent 的 Issue 暴露量最高，说明用户部署面广、反馈密集；ZeroClaw PR 数高但今日无合并，短期有 review backlog 风险。

---

## 4. 共同关注的技术方向

### 4.1 Gateway / Core / 控制面权限边界

涉及项目：

- OpenClaw
- Hermes Agent
- ZeroClaw
- NanoClaw
- Moltis

具体诉求：

- OpenClaw：guest 拥有 session-scoped write 但无法启动 hidden sub-agent，暴露 scoped authority 与 global operator authority 的边界问题。
- Hermes Agent：Gateway restart、PTY lease、session state、standalone container boot reconciliation 等问题集中出现。
- ZeroClaw：大量 auth / RPC / SOP / cron / delegate 权限 PR 堆叠，正在收紧控制面安全。
- NanoClaw：OneCLI gateway host-enforcement bypass、proxy credential 泄露、security-audit 请求。
- Moltis：MCP server 启动失败恢复与 session loss 识别，属于服务控制面生命周期问题。

趋势判断：  
**Agent 框架的核心竞争力正在从模型调用能力转向控制面治理能力。** 权限、身份、session scope、工具执行边界将成为生产可用性的关键。

---

### 4.2 会话状态、生命周期与历史一致性

涉及项目：

- OpenClaw
- Hermes Agent
- ZeroClaw
- CoPaw
- NanoClaw

具体诉求：

- OpenClaw：后台 session commit 后 owner / participant details 丢失；conversation reads 迁入 worker。
- Hermes Agent：Dashboard “New chat” 遗留 PTY、compaction 后重复 active request、session reopen 偏离 live tail。
- ZeroClaw：SQLite session 后端重写所有 message `created_at`，导致时间线失真。
- CoPaw：同一 session 的 `chat_with_agent` 被拆成多个 UI 页面。
- NanoClaw：PreCompact hook 因 mailbox 未注册失败。

趋势判断：  
**会话不再只是聊天记录，而是 Agent 的执行账本、审计轨迹和协作上下文。** 多项目都在补齐会话持久化、租约、压缩、归档和 UI 映射的一致性。

---

### 4.3 更新、安装与发布可靠性

涉及项目：

- OpenClaw
- Hermes Agent
- NanoClaw
- ZeroClaw
- LobsterAI

具体诉求：

- OpenClaw：macOS arm64 update failure、Bun + managed Node、release-critical backport。
- Hermes Agent：Windows `--no-gateway-restart` 被破坏，systemd unit 被 workspace venv 改写。
- NanoClaw：默认更新从 main 改为 release tag，gateway skill payload 变化需刷新已安装 gateway。
- ZeroClaw：Docker master 镜像启动失败，升级中断可能导致数据库滞留。
- LobsterAI：未登录 / catalog 加载失败时模型选择器恢复。

趋势判断：  
随着用户从开发环境走向长期自托管，**安装器、更新器、迁移路径和失败恢复** 正在成为框架成熟度的重要指标。

---

### 4.4 插件、工具调用与可观测性

涉及项目：

- OpenClaw
- Hermes Agent
- NanoBot
- ZeroClaw
- CoPaw

具体诉求：

- OpenClaw：`before_tool_call` 缺少 native subagent 身份，插件无法做细粒度审计。
- Hermes Agent：媒体下载失败、plugin slash command、Telegram inbound 卡死等静默失败问题突出。
- NanoBot：`sendProgress` 配置与实际 progress 输出不一致。
- ZeroClaw：plugins remove 删除错误目录、Windows 文件锁、memory plugin trap 后实例复用问题。
- CoPaw：DeepSeek formatter 不应发送 API 不支持的 PDF/audio content parts。

趋势判断：  
**工具调用链路需要更强的“可解释失败”能力。** 未来插件 API 不仅要能扩展功能，还要能做审计、veto、进度上报、错误显式化和上下文标注。

---

### 4.5 Provider / 模型族快速适配

涉及项目：

- OpenClaw
- Hermes Agent
- CoPaw
- LobsterAI
- ZeroClaw

具体诉求：

- OpenClaw：Hugging Face device-code OAuth、GPT-6.1 Sol/Reef 支持。
- Hermes Agent：Bedrock redacted reasoning recovery 路径分叉、Codex / provider 调用透明度。
- CoPaw：gpt-6-family `max_completion_tokens` 适配失败、Codex SDK 模型发现需更新。
- LobsterAI：公共模型 catalog 恢复与未登录模型选择器体验。
- ZeroClaw：Codex prompt-cache affinity 绑定 conversation。

趋势判断：  
模型族更新速度继续加快，**硬编码模型名前缀的适配方式正在失效**。Provider 层需要转向 capability metadata、动态发现和更清晰的认证流程。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构特征 | 差异化判断 |
|---|---|---|---|---|
| **OpenClaw** | 个人/团队 AI 助手、Gateway、session、sub-agent、插件 | 生产部署者、高级 Agent 用户、插件开发者 | Gateway 控制面 + worker 化 session/history + extended-stable | 综合型、工程化程度高，偏“稳定可运营的 AI 助手平台” |
| **Hermes Agent** | 多平台 Agent、Desktop/Dashboard、插件、语音、渠道集成 | 跨平台个人助手用户、自托管用户、插件生态用户 | Gateway + 多前端 + 多平台 channel adapter | 真实部署场景覆盖广，问题暴露充分 |
| **ZeroClaw** | Web 工作区、Core/Gateway 统一、安全权限、插件/MCP | 企业化自托管、重权限/配置场景 | Core 化控制面、强权限收紧、Web workspace | 安全和产品工作台方向突出，但 PR 堆栈复杂 |
| **NanoClaw** | OneCLI、安装更新、安全审计、依赖治理 | 运维型用户、安全敏感部署者 | CLI / gateway / setup 流程深度治理 | 偏运维与安全硬化，生产治理意识强 |
| **CoPaw** | Console、第三方 Agent、Provider、模型选择、E2E | UI/Console 用户、第三方 Agent 集成者 | Web Console + provider harness + E2E 测试体系 | 插件/第三方 Agent 生态与 UI 体验突出 |
| **NanoBot** | Tool contract、channel progress、WebUI/runtime 清理 | 轻量 Agent 用户、集成开发者 | channel 配置 + tool contract | 轻量、稳定，但社区热度较低 |
| **PicoClaw** | Agent 执行时间预算、运行控制 | 长任务 Agent、生产 API 调用者 | Turn-level budget control | 专注 Agent 执行边界，可控性方向明确 |
| **Moltis** | MCP 服务、TLS/WebSocket、连接恢复 | MCP 集成者、协议层部署者 | MCP server lifecycle + transport compatibility | 偏协议和服务稳定性 |
| **IronClaw** | benchmark / failure taxonomy | 研究和评测用户 | benchmark 质量监控 | 偏评测基础设施，开发活跃度低 |
| **LobsterAI** | 登录态、模型选择器、桌面体验 | 普通终端用户、桌面助手用户 | renderer/main 登录与模型 catalog | 偏产品 UX 修补 |
| **NullClaw / TinyClaw / ZeptoClaw** | 今日无活动 | 不明确 | 不明确 | 暂无可观察动态 |

---

## 6. 社区热度与成熟度

### 6.1 快速迭代阶段

代表项目：

- OpenClaw
- Hermes Agent
- ZeroClaw
- CoPaw

特征：

- Issue 和 PR 同时活跃；
- 频繁触及核心架构；
- 用户反馈来自真实复杂场景；
- P0/P1/S1/S2 问题仍较多；
- 修复速度快，但回归和兼容性风险也高。

其中：

- **OpenClaw**：快速迭代同时有 extended-stable 维护线，成熟度更高。
- **Hermes Agent**：用户场景最复杂，静默失败和跨平台边界问题密集。
- **ZeroClaw**：PR 体量大、stacked security PR 多，需要提升合并节奏。
- **CoPaw**：Console / Provider / third-party Agent 生态反馈活跃，Beta 回归需要重点关注。

---

### 6.2 质量巩固阶段

代表项目：

- NanoClaw
- Moltis
- NanoBot
- PicoClaw
- LobsterAI

特征：

- 活跃度中低；
- 问题更聚焦；
- 多数为稳定性、文档契约、安装体验或协议兼容修复；
- 社区互动少，但维护动作明确。

具体判断：

- **NanoClaw**：安全与发布治理成熟度提升明显。
- **Moltis**：低噪声，但两个 PR 都指向生产连接可靠性。
- **NanoBot**：`sendProgress` 问题虽小，但反映 tool contract 需要更严谨。
- **PicoClaw**：新增 turn time budget 是生产化 Agent 的重要基础能力。
- **LobsterAI**：偏产品体验维护，技术变更风险低。

---

### 6.3 低活跃 / 静默阶段

代表项目：

- IronClaw
- NullClaw
- TinyClaw
- ZeptoClaw

说明：

- IronClaw 虽代码无推进，但 benchmark failure taxonomy 仍在运行，属于质量监控低频维护。
- NullClaw、TinyClaw、ZeptoClaw 今日无活动，无法判断短期路线。

---

## 7. 值得关注的趋势信号

### 7.1 Agent 框架正在进入“权限模型细化”阶段

OpenClaw、ZeroClaw、NanoClaw、Hermes Agent 都在处理权限边界问题：

- session-scoped authority vs global operator authority；
- plugin / tool / subagent 的身份标注；
- cron、SOP、RPC、filesystem channel 的授权收紧；
- OneCLI / gateway host enforcement。

对开发者的参考价值：  
未来 Agent 平台不能只提供“能调用工具”的能力，还必须明确 **谁在调用、代表谁调用、在哪个 session / workspace 范围内调用、是否可审计和撤销**。

---

### 7.2 “静默失败”成为最明显的用户不满来源

Hermes Agent、NanoBot、ZeroClaw、OpenClaw、CoPaw 都出现相关信号：

- 附件下载失败被丢弃；
- Telegram inbound turn 卡死；
- `sendProgress=true` 但无进度；
- reload 超时只写日志不通知用户；
- update failure 诊断不足；
- provider connection test 返回 400 但缺少能力解释。

对开发者的参考价值：  
Agent 系统应把失败设计为一等事件：  
**用户可见、agent 可见、日志可查、状态可恢复**。

---

### 7.3 会话正在从 UI 概念变成核心数据模型

多个项目的问题都指向 session：

- OpenClaw：session owner / participant details、conversation reads worker 化；
- Hermes Agent：PTY lease、compaction、live tail；
- ZeroClaw：message timestamp preservation；
- CoPaw：同一 session UI 被拆分；
- NanoClaw：PreCompact hook。

对开发者的参考价值：  
构建 Agent 系统时，应尽早把 session 设计为事件流和执行账本，而不是简单 transcript blob。否则后期会在压缩、归档、审计、恢复、多端展示上反复付出代价。

---

### 7.4 Provider 适配需要从“模型名规则”转向“能力发现”

CoPaw 的 gpt-6-family、OpenClaw 的 Hugging Face OAuth、Hermes 的 Bedrock reasoning recovery、ZeroClaw 的 Codex cache affinity 都指向同一趋势：模型和 provider 行为变化太快。

对开发者的参考价值：

- 避免过度依赖模型名前缀；
- 建立 provider capability registry；
- 支持 OAuth/device-code 等现代认证；
- 将 token 参数、reasoning、tool-call、media input 支持做成能力矩阵；
- 对新模型族提供更宽容的 fallback。

---

### 7.5 MCP 与插件生态进入生产化阶段

Moltis、ZeroClaw、Hermes Agent、OpenClaw 都在处理 MCP / plugin / tool-call 相关稳定性问题：

- MCP server 启动失败恢复；
- nested object 参数保真；
- plugin install/remove/migrate 文件锁；
- plugin hook context 增强；
- pre_auxiliary_call veto；
- memory plugin trap 后实例丢弃。

对开发者的参考价值：  
插件和 MCP 不只是扩展点，也会成为安全边界、生命周期边界和可观测性边界。应优先设计：

- 插件隔离；
- 参数 schema 保真；
- hook 失败策略；
- 插件身份；
- 工具调用审计；
- 异常后的实例恢复。

---

### 7.6 更新器和安装器正在成为竞争力

OpenClaw、Hermes Agent、NanoClaw、ZeroClaw 都暴露更新或安装问题。用户已经不满足于“手动 git pull 后能跑”，而要求：

- release channel；
- RC / stable 分层；
- 自动更新可恢复；
- systemd / Docker / Windows / macOS 行为一致；
- 失败时有诊断和回滚路径。

对开发者的参考价值：  
Agent 框架如果面向真实用户，安装和更新链路应被视为核心产品能力，而不是外围脚本。

---

## 总结判断

今日生态的核心关键词是：**生产化、权限化、会话化、可观测化**。

- **OpenClaw** 仍是最具综合参考价值的项目之一：活跃度高、有维护线、有架构治理，但也面临权限和更新稳定性的短期压力。
- **Hermes Agent** 反映了真实跨平台部署下的问题密度，尤其适合作为“复杂用户场景压力测试样本”。
- **ZeroClaw** 在安全和 Core 化方向推进激进，但需要控制 stacked PR 和 S1/S2 积压。
- **NanoClaw** 展现出较成熟的运维安全意识，适合作为安装/更新/审计治理参考。
- **CoPaw** 的 Console 与第三方 Agent 生态反馈活跃，说明前端体验和 Provider 适配正在成为差异化竞争点。
- **Moltis、PicoClaw、NanoBot** 虽活跃度较低，但分别在 MCP 恢复、Agent 时间预算、tool progress contract 等细分方向提供了有价值信号。

对技术决策者而言，当前选型不应只看模型能力或功能清单，更应评估项目在 **权限模型、会话持久化、插件隔离、更新可靠性、跨平台部署和失败可观测性** 上的成熟度。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报  
**日期：2026-10-02**  
**仓库：HKUDS/nanobot**  
**统计窗口：过去 24 小时**

---

## 1. 今日速览

过去 24 小时内，NanoBot 项目活跃度较低到中等：新增/活跃 Issue 1 条，PR 更新 2 条，其中 1 个仍处于待合并状态，1 个已关闭。今日主要焦点集中在 `channels.sendProgress` 配置语义与实际行为不一致的问题上，相关 Issue 与修复 PR 已形成闭环。当前没有新版本发布，也没有高频社区讨论或大量用户反馈。整体来看，项目维护节奏保持稳定，但今日更偏向文档/行为一致性修复与代码清理，而非大规模功能迭代。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

### 已关闭 PR

#### #5999 `[webui, refactor, test, priority: p2] refactor: remove unused runtime and WebUI helpers`  
- 状态：Closed  
- 作者：chengyongru  
- 链接：https://github.com/HKUDS/nanobot/pull/5999  
- 创建时间：2026-10-01  
- 更新时间：2026-10-01  

该 PR 主要清理了运行时和 WebUI 中已经不再使用的辅助逻辑，包括：

- 移除 WebUI 中重复的 settings routes/domain 操作封装
- 移除 Weixin 中无调用方的 GET wrapper
- 删除过时的 diff、title、sidebar wrapper 相关测试
- 清理未使用的测试参数和 CSS 自定义项

从项目进展角度看，这类重构虽然不直接带来新功能，但有助于降低维护成本、减少历史包袱，并使运行时与 WebUI 的职责边界更加清晰。由于该 PR 最终为 Closed 而非 Merged，说明相关改动可能被放弃、拆分、需重做，或已有其他实现路径替代。维护者仍可关注其中暴露出的技术债方向：WebUI 与运行时残留 helper 的持续清理。

---

## 4. 社区热点

今日社区讨论热度整体较低，未出现高评论数或高反应数的 Issue/PR。当前最值得关注的是围绕 `sendProgress` 行为一致性的 Issue 与 PR。

### Issue #6000：`sendProgress: true yields at most one line per turn — tool_contract.md contradicts itself`  
- 状态：Open  
- 作者：GZY-SUPER-HACKER  
- 评论数：0  
- 👍：0  
- 链接：https://github.com/HKUDS/nanobot/issues/6000  

该 Issue 指出：

- `channels.sendProgress` 默认值为 `true`
- 但在默认安装下，它实际上没有任何 progress 文本可发送
- 因此用户观察到的行为与设置为 `false` 几乎一致
- 进一步问题是 `tool_contract.md` 中关于进度输出的描述存在自相矛盾之处

背后的核心诉求是：**配置项的语义应与运行时行为一致**。如果 `sendProgress: true` 表示允许发送进度文本，那么默认 agent/tool 模板就应该产生可被发送的 progress 内容；否则该配置会给用户造成误导。

### PR #6001：`Make sendProgress mean what it says: authorise the text it delivers`  
- 状态：Open  
- 作者：GZY-SUPER-HACKER  
- 关联 Issue：#6000  
- 链接：https://github.com/HKUDS/nanobot/pull/6001  

该 PR 直接修复 #6000，意图让 `sendProgress` 的行为与其配置名称一致。它指出当前问题不在于 delivery 开关，而在于工具调用所在消息中的模型/模板约束导致 progress 文本根本不会被产生。

该 PR 是今日最关键的待合并项。如果维护者认可其设计方向，它可能会改善默认安装下的用户体验，并减少配置文档与实际运行时之间的认知偏差。

---

## 5. Bug 与稳定性

### 中等优先级：`sendProgress` 默认行为与文档/配置语义不一致  
- Issue：#6000  
- 状态：Open  
- 链接：https://github.com/HKUDS/nanobot/issues/6000  
- Fix PR：#6001，Open  
- PR 链接：https://github.com/HKUDS/nanobot/pull/6001  

#### 问题描述

`channels.sendProgress` 默认配置为 `true`，但在默认安装场景下并不会稳定地产生可发送的 progress 文本。用户开启或保持默认配置后，可能预期在工具调用期间看到进度更新，但实际只能得到至多一行，甚至表现得与 `false` 类似。

#### 影响范围

可能影响以下使用场景：

- 使用默认配置部署 NanoBot 的用户
- 依赖工具调用过程可观测性的用户
- 通过 channel progress 输出构建前端状态提示的集成方
- 阅读 `tool_contract.md` 并按文档理解 agent/tool 交互契约的开发者

#### 严重程度评估

该问题不属于崩溃或数据损坏类 bug，但属于**行为契约不一致**问题，可能导致：

- 用户误解配置项含义
- 前端/集成方无法获得预期的进度更新
- 文档可信度下降
- agent 工具调用过程的可观测性不足

#### 修复状态

已有对应修复 PR：  
- #6001：https://github.com/HKUDS/nanobot/pull/6001  

该 PR 当前仍处于 Open 状态，尚未合并。

---

## 6. 功能请求与路线图信号

今日没有明确的新功能请求，但 #6000/#6001 暴露出一个重要路线图信号：**NanoBot 可能需要进一步明确 tool-call progress reporting 的设计契约**。

### 潜在路线图方向：工具调用进度输出机制标准化  
- 相关 Issue：https://github.com/HKUDS/nanobot/issues/6000  
- 相关 PR：https://github.com/HKUDS/nanobot/pull/6001  

从当前讨论可以看出，用户或贡献者希望：

1. `sendProgress` 不只是 delivery gate，而是真正对应可见的 progress 输出能力  
2. 默认模板与默认配置之间保持一致  
3. `tool_contract.md` 中对工具调用、进度文本、模型输出约束的描述更加明确  
4. 前端或 channel 层能够可靠消费 progress 信息  

如果 #6001 被合并，该方向很可能进入下一轮版本的行为修正范围。它不一定是“新功能”，但会提升默认体验与 agent 运行过程的透明度。

---

## 7. 用户反馈摘要

今日 Issue 与 PR 均无评论，因此没有大量可提炼的社区反馈。但从 #6000 的问题描述中可以归纳出以下用户痛点：

### 真实痛点 1：默认配置不符合直觉  
用户看到 `channels.sendProgress` 默认是 `true`，自然会期待系统在工具调用期间发送 progress 信息。但实际行为并不符合这个预期，导致配置语义不清。

### 真实痛点 2：文档与实现存在冲突  
Issue 明确指出 `tool_contract.md` 存在自相矛盾之处。这表明开发者在根据文档理解或扩展 NanoBot 时，可能会遇到实现与文档不匹配的问题。

### 真实痛点 3：工具调用过程缺乏可观测性  
在 AI agent 和个人 AI 助手场景中，工具调用期间的状态反馈非常重要。若 progress 输出不稳定，用户可能无法判断 agent 是在执行任务、等待工具返回，还是已经卡住。

### 满意/不满意信号

- 不满意点：默认行为与配置名称不一致  
- 不满意点：文档契约含混或矛盾  
- 正面信号：贡献者已直接提交修复 PR，说明问题具备明确定位与较快修复路径  

---

## 8. 待处理积压

基于今日提供的数据，未发现长期未响应的 Issue 或 PR。当前最需要维护者关注的是新开的修复 PR：

### PR #6001：`Make sendProgress mean what it says: authorise the text it delivers`  
- 状态：Open  
- 链接：https://github.com/HKUDS/nanobot/pull/6001  
- 关联 Issue：https://github.com/HKUDS/nanobot/issues/6000  

#### 建议维护者关注点

1. 确认 `sendProgress` 的产品语义：  
   - 是仅控制是否发送已有 progress 文本？  
   - 还是应保证默认模板产生 progress 文本？

2. 审查 `tool_contract.md`：  
   - 是否需要同步修订文档  
   - 是否存在其他与运行时行为不一致的约束描述

3. 验证默认安装体验：  
   - 默认配置下是否能产生多步工具执行反馈  
   - 前端/WebUI/channel 层是否能正确接收并展示 progress

4. 增加测试覆盖：  
   - 建议为 `sendProgress=true/false` 分别增加行为测试  
   - 覆盖工具调用消息中是否产生 progress text 的场景

---

## 今日健康度评估

| 指标 | 今日表现 | 评价 |
|---|---:|---|
| Issue 活跃度 | 1 条 | 低 |
| PR 活跃度 | 2 条 | 中低 |
| 新版本发布 | 0 个 | 无发布节奏 |
| Bug 响应 | 已有修复 PR | 良好 |
| 社区讨论 | 评论与反应均较少 | 偏冷清 |
| 技术债治理 | 有清理型 PR | 持续推进但未合并 |
| 项目风险 | 配置/文档契约不一致 | 需关注 |

**综合判断：** NanoBot 今日整体健康度稳定，但社区互动热度较低。最值得关注的是 `sendProgress` 相关的行为一致性问题：它虽非严重稳定性故障，但关系到 agent 工具调用过程的透明度与默认用户体验。若 #6001 能顺利合并，并同步完善文档和测试，将有助于提升项目的可预测性和开发者信任度。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
日期：2026-10-02  
仓库：<https://github.com/NousResearch/hermes-agent>

---

## 1. 今日速览

过去 24 小时 Hermes Agent 活跃度非常高：Issues 更新 50 条，其中 49 条仍处于打开状态，仅 1 条关闭；PR 更新 50 条，其中 49 条仍待合并，仅 1 条已合并或关闭。  
今日新增问题集中在 **Gateway 会话状态、消息投递、Desktop 会话体验、CLI/TUI 语音、插件平台适配、安装更新与多容器部署** 等核心路径，说明项目正处于高频迭代与稳定性修复并行阶段。  
PR 侧响应速度较快，多个新 Issue 在当天已出现对应修复 PR，例如 Dashboard PTY 孤儿会话、Feishu/QQ 附件下载失败、Windows update 行为、PortAudio 麦克风热插拔等。  
整体健康度判断：**社区活跃、问题发现密集、维护响应积极，但稳定性压力较大**，尤其是会话状态、Gateway 生命周期和跨平台运行环境仍是主要风险区域。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日数据中显示过去 24 小时有 1 个 PR 已合并或关闭，但提供的 PR 列表主要展示仍处于 OPEN 状态的高活跃 PR，未包含该已合并/关闭 PR 的具体编号与内容。因此，本日报仅基于可见数据分析当前推进中的重要修复方向。

### 关键推进方向

#### 3.1 会话状态与 Dashboard/CLI 体验修复

- PR #131181：fix(dashboard): release the PTY a rotated attach token strands  
  链接：<https://github.com/NousResearch/hermes-agent/pull/131181>  
  关联 Issue #131172：<https://github.com/NousResearch/hermes-agent/issues/131172>  
  该 PR 处理 Dashboard Chat 点击 “New chat” 后旧会话 PTY 被遗留，导致再次打开原会话时被拒绝的问题。  
  这是一个影响用户连续对话体验的关键修复，属于会话租约与 PTY 生命周期管理问题。

- PR #131179：fix(dashboard): release token-rotated orphan PTYs before an explicit chat resume  
  链接：<https://github.com/NousResearch/hermes-agent/pull/131179>  
  同样关联 Issue #131172。该 PR 与 #131181 解决方向相近，说明该问题已有多个修复方案并行竞争或补充。

- PR #131186：fix(tui): propagate voice state to interactive turns  
  链接：<https://github.com/NousResearch/hermes-agent/pull/131186>  
  关联 Issue #131182：<https://github.com/NousResearch/hermes-agent/issues/131182>  
  修复 CLI/TUI 中 `/voice on`、`/voice tts` 已启用但普通助手回复没有被朗读的问题。  
  这推进了交互式语音体验的一致性。

#### 3.2 消息投递与平台插件稳定性

- PR #131185：fix(gateway): surface attachment download failures instead of dropping them silently  
  链接：<https://github.com/NousResearch/hermes-agent/pull/131185>  
  关联 Issue #131184：<https://github.com/NousResearch/hermes-agent/issues/131184>  
  修复 Feishu、QQBot、Weixin 等平台中媒体下载失败被静默丢弃的问题，使失败信号能够进入对话上下文。

- PR #131175：fix(feishu): chunked Range fallback for oversized resource downloads  
  链接：<https://github.com/NousResearch/hermes-agent/pull/131175>  
  关联 Issue #131174：<https://github.com/NousResearch/hermes-agent/issues/131174>  
  针对 Feishu 大附件因单次下载限制而被静默丢弃的问题，引入 Range 分块下载 fallback。

- PR #131188：fix(update): honor --no-gateway-restart in Windows pause; refuse gateway-ancestor tree-kill  
  链接：<https://github.com/NousResearch/hermes-agent/pull/131188>  
  关联 Issue #131149：<https://github.com/NousResearch/hermes-agent/issues/131149>  
  修复 Windows 上 `hermes update --no-gateway-restart` 仍会停止 Gateway，以及由 Gateway 派生的 update 进程被 SIGTERM 杀死的问题。

#### 3.3 安装、更新与多容器部署

- PR #131192：fix(gateway): refuse workspace venv paths in systemd unit generation  
  链接：<https://github.com/NousResearch/hermes-agent/pull/131192>  
  关联 Issue #131164：<https://github.com/NousResearch/hermes-agent/issues/131164>  
  防止从依赖生成 workspace venv 运行 `hermes gateway restart` 时，把 systemd unit 改写到临时 workspace launcher，导致 crash loop。

- PR #131173：fix(gateway): refuse service-definition writes from a PM generation workspace  
  链接：<https://github.com/NousResearch/hermes-agent/pull/131173>  
  同样面向 Issue #131164。与 #131192 类似，说明安装路径污染和 service definition 生成安全性成为今日重点修复方向。

- PR #131193：fix(gateway): isolate standalone container boot reconciliation  
  链接：<https://github.com/NousResearch/hermes-agent/pull/131193>  
  关联 Issue #131183：<https://github.com/NousResearch/hermes-agent/issues/131183>  
  处理多容器共享数据卷、standalone profile 场景下 Gateway 启动协调错误的问题。

#### 3.4 文件读取、技能、依赖安全

- PR #131196：fix(read_file): exclude removed DOCX revision content  
  链接：<https://github.com/NousResearch/hermes-agent/pull/131196>  
  修复 DOCX 读取器会读取已删除或移动前文本的问题，提升文档解析准确性。

- PR #131180：fix(read_file): disclose XLSX extraction limits  
  链接：<https://github.com/NousResearch/hermes-agent/pull/131180>  
  修复 XLSX 读取存在行列截断但未告知用户的问题，提高工具透明度。

- PR #131191：fix(skills): quote LobeHub frontmatter string values  
  链接：<https://github.com/NousResearch/hermes-agent/pull/131191>  
  修复 LobeHub skill 转换时 YAML frontmatter 未正确转义，导致解析错误或类型误判的问题。

- PR #131171：chore(deps): bump brace-expansion, js-yaml, undici, yaml to patched versions  
  链接：<https://github.com/NousResearch/hermes-agent/pull/131171>  
  处理 npm audit 报告的安全依赖问题。

---

## 4. 社区热点

### 4.1 Linux Desktop sandbox fallback 被第二实例启动污染

- Issue #131055  
  标题：Linux Desktop: second-instance launches poison the sandbox fallback marker → sticky --no-sandbox → renderer SIGILL loop  
  状态：OPEN  
  评论数：3  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131055>

该问题是今日评论最多的热点之一。用户反馈在 Linux 上重复启动 Hermes Desktop，或通过 `gtk-launch`、`hermes://` deeplink 触发第二实例时，会把 `windows-sandbox-fallback.json` 固定为 fallback 状态，后续正常启动持续添加 `--no-sandbox`，最终导致 renderer SIGILL 循环。  
背后诉求是 **Desktop 启动状态标记必须具备幂等性和实例隔离能力**，尤其是 fallback marker 不应被临时或失败的 second-instance 启动污染。

---

### 4.2 Bedrock agent-loop 未复用 redacted reasoning 恢复逻辑

- Issue #131033  
  标题：Bedrock: agent-loop Converse calls skip #116759's redacted-reasoning recovery  
  状态：OPEN  
  评论数：3  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131033>

该 Issue 指出 #116759 已在 `bedrock_adapter.call_converse()` / `call_converse_stream()` 中加入 redacted reasoning rejection 恢复逻辑，但 agent loop 使用的 `_bedrock_converse_call` 没有走同一路径，导致 GPT → Claude fallback 在 sealed reasoning 场景下连续失败。  
该问题反映出 **provider adapter 与 agent-loop 调用路径存在逻辑分叉**，用户希望各入口行为一致，尤其是在模型 fallback 和 reasoning 兼容性上。

---

### 4.3 Gateway restart 被 cron 长任务阻塞

- Issue #130987  
  标题：gateway: restart wait holds for cron runs that already outlive the restart  
  状态：CLOSED  
  评论数：3  
  链接：<https://github.com/NousResearch/hermes-agent/issues/130987>

这是今日唯一明确显示已关闭的高评论 Issue。问题描述 `hermes update` / `hermes gateway restart` 在仅有 cron run 作为 in-flight unit 时，可能等待完整的 `agent.restart_after_turn_timeout`，默认 30 分钟，期间拒绝 turn。  
该问题的关闭说明 Gateway restart 与 cron scope 生命周期之间的关系已有处理进展，是今日稳定性改进中的正向信号。

---

### 4.4 Dashboard Chat “New chat” 导致旧 PTY 孤儿化

- Issue #131172  
  状态：OPEN  
  评论数：2  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131172>  
  相关 PR：  
  - #131181：<https://github.com/NousResearch/hermes-agent/pull/131181>  
  - #131179：<https://github.com/NousResearch/hermes-agent/pull/131179>

用户在 Dashboard Chat 中点击 “New chat” 后，返回原聊天会被提示 “open in another Hermes window”。实际上阻塞者是 Dashboard 自己遗留的 PTY。  
这是一个明显的 **用户不可自愈问题**：用户无法访问被遗留的窗口，也无法释放租约，因此修复优先级较高。

---

## 5. Bug 与稳定性

以下按严重程度和影响范围排序。

### P0 / 高风险问题

#### 5.1 Discord auto-threaded mention 导致 prompt cache 被破坏

- Issue #131118  
  标签：P0, comp/plugins, platform/discord, sweeper:risk-caching  
  状态：OPEN  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131118>

Discord 自动建 thread 的 mention 场景中，系统错误地固定父频道 topic，导致 thread 第二轮重新渲染 session prompt，破坏 prompt cache。  
影响：缓存命中下降、上下文重复渲染、可能增加模型调用成本。  
当前未在提供数据中看到明确 fix PR。

---

#### 5.2 Gateway 内部 wake 触发 session-context prompt 重渲染

- Issue #131031  
  标签：P0, comp/gateway, sweeper:risk-session-state, sweeper:risk-caching  
  状态：OPEN  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131031>

在 `/stop`、`/undo`、`/model` 后，内部 wake 会重新渲染 session-context prompt，导致 prefix cache 出现 A→B→A 的双重破坏。  
影响：会话状态与缓存一致性，可能导致成本增加与上下文污染。  
当前未看到明确 fix PR。

---

### P1 / 严重稳定性问题

#### 5.3 Telegram 首个 inbound turn 永久卡死

- Issue #131145  
  标签：P1, comp/gateway, platform/telegram, sweeper:risk-message-delivery  
  状态：OPEN  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131145>

启动 warm-up 未完成时 Gateway 仍开放 inbound gate，第一个 inbound turn 会永久卡住：无 provider call、无错误、`active_agents` 残留。  
影响：平台机器人启动后首条消息静默失败，属于高严重度消息投递问题。  
当前未看到明确 fix PR。

---

#### 5.4 Compaction restatement 导致用户请求重复激活并重发旧回复

- Issue #131104  
  标签：P1, comp/agent, comp/desktop, area/compression  
  状态：OPEN  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131104>

长会话 context compaction 后，可能留下两个 active 的同一用户请求，且共享 `message_uid`，导致问题渲染两次并重发上一条回复。  
影响：长会话可靠性、压缩机制正确性、用户信任。  
当前未看到明确 fix PR。

---

#### 5.5 插件强制安装会删除用户文件

- Issue #131126  
  标签：P1, comp/cli, comp/plugins, area/install-update  
  状态：OPEN  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131126>

`hermes plugins install --force` 会删除插件用户文件，而该命令又是迁移 pinned plugin 的唯一文档化方式。  
影响：用户数据丢失风险。  
当前未看到明确 fix PR。

---

### P2 / 中高优先级问题

#### 5.6 Dashboard Chat PTY 孤儿化

- Issue #131172  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131172>  
  Fix PR：  
  - #131181：<https://github.com/NousResearch/hermes-agent/pull/131181>  
  - #131179：<https://github.com/NousResearch/hermes-agent/pull/131179>

状态：已有修复 PR，纳入下一版本概率较高。

---

#### 5.7 CLI/TUI voice TTS 开启但回复不朗读

- Issue #131182  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131182>  
  Fix PR：#131186  
  链接：<https://github.com/NousResearch/hermes-agent/pull/131186>

状态：已有修复 PR。

---

#### 5.8 Windows terminal foreground 调用可能永久挂起

- Issue #131133  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131133>

当命令已结束但其 GUI 子进程仍持有 stdout pipe，foreground `terminal` 调用可能永久挂起。  
影响：Windows 本地 backend 工具可靠性。  
当前未看到明确 fix PR。

---

#### 5.9 delegate 子任务清理后遗留 container alias 与 cwd 记录

- Issue #131122  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131122>

`delegate_task` child 写入 module-level map 后未清理，可能导致会话状态泄漏或后续路由异常。  
当前未看到明确 fix PR。

---

#### 5.10 多平台媒体下载失败被静默丢弃

- Issue #131184  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131184>  
  Fix PR：#131185  
  链接：<https://github.com/NousResearch/hermes-agent/pull/131185>

状态：已有修复 PR。

---

#### 5.11 多容器 standalone profile 启动锁与隔离问题

- Issue #131183  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131183>  
  Fix PR：#131193  
  链接：<https://github.com/NousResearch/hermes-agent/pull/131193>

影响 Podman 多容器共享 volume、host network、gateway.standalone 部署场景。  
状态：已有修复 PR。

---

#### 5.12 PortAudio 麦克风热插拔后死设备 ID 循环报错

- Issue #131177  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131177>  
  Fix PR：  
  - #131190：<https://github.com/NousResearch/hermes-agent/pull/131190>  
  - #131187：<https://github.com/NousResearch/hermes-agent/pull/131187>

状态：已有两个修复 PR，分别从 bounded retry 与重新初始化 PortAudio snapshot 角度处理。

---

#### 5.13 Feishu 大附件静默丢失

- Issue #131174  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131174>  
  Fix PR：#131175  
  链接：<https://github.com/NousResearch/hermes-agent/pull/131175>

状态：已有修复 PR。

---

#### 5.14 QQ Bot WebSocket 重连竞争导致 Gateway 静默 wedge

- Issue #131156  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131156>

影响 QQ Bot adapter WebSocket reconnect。  
当前未看到明确 fix PR。

---

#### 5.15 browser.use_real_profile 在 root Linux 环境缺少 --no-sandbox

- Issue #131152  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131152>

VPS/root 部署场景下启用 `browser.use_real_profile: true` 时 Chrome 启动失败。  
当前未看到明确 fix PR。

---

#### 5.16 UUID 会话名导致内置 browser socket path 过长

- Issue #131144  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131144>

内部 session/task id 为完整 UUID 时，browser 工具的 Unix socket path 超过限制。  
当前未看到明确 fix PR。

---

#### 5.17 Windows update 行为破坏 --no-gateway-restart 语义

- Issue #131149  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131149>  
  Fix PR：#131188  
  链接：<https://github.com/NousResearch/hermes-agent/pull/131188>

状态：已有修复 PR。

---

#### 5.18 systemd unit 被临时 workspace venv 改写

- Issue #131164  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131164>  
  Fix PR：  
  - #131192：<https://github.com/NousResearch/hermes-agent/pull/131192>  
  - #131173：<https://github.com/NousResearch/hermes-agent/pull/131173>

状态：已有多个修复 PR。

---

### P3 / 低中优先级问题

#### 5.19 Desktop 切换聊天时状态栏闪烁 “Gateway checking”

- Issue #131004  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131004>

多 profile backend 中 Desktop 每次打开 chat 都短暂显示 gateway checking，实际 gateway 健康。  
影响主要是 UI 稳定感和用户信任。

---

#### 5.20 Desktop bot 点击打开错误 session

- Issue #130980  
  链接：<https://github.com/NousResearch/hermes-agent/issues/130980>

用户点击 bot row 后无法回到 bot 自己的 Bot Chat。  
反映 Desktop roster 与 session 恢复路径不一致。

---

#### 5.21 plugin slash command 在 turn 运行中被静默吞掉

- Issue #131051  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131051>

插件注册的 slash command 如果在 agent turn 运行中触发，会被静默吞掉，没有回复、错误、日志或重试。  
影响插件交互可预期性。

---

## 6. 功能请求与路线图信号

### 6.1 cron 支持 per-job max_tokens

- Issue #131119  
  标题：cron: per-job max_tokens  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131119>

用户希望 cron job 能通过 `create --max-tokens` 和 `jobs.json` 字段设置每个任务的 `max_tokens`，避免 agent-mode cron 每轮都请求模型家族完整 context length。  
路线图信号：这是成本控制与调度粒度增强需求，可能进入 cron/billing 方向规划。  
当前未看到对应 PR。

---

### 6.2 sessions archive 支持 --session-id，并处理 live sessions

- Issue #131099  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131099>

用户希望 `hermes sessions archive` 能指定 `--session-id`，并能处理 live/runaway sessions。当前命令对存在的 live session 返回 “No sessions match”。  
路线图信号：CLI 会话管理能力需要增强，尤其是运维场景下的手动恢复与归档能力。  
相关 PR：#131176 处理 timestamp conversion overflow，但不是直接实现 `--session-id`。  
PR 链接：<https://github.com/NousResearch/hermes-agent/pull/131176>

---

### 6.3 插件可 veto auxiliary provider call

- PR #131189  
  标题：feat(aux): let pre_auxiliary_call veto a provider attempt  
  链接：<https://github.com/NousResearch/hermes-agent/pull/131189>

这是今日较明确的功能型 PR。当前 `pre_auxiliary_call` 只能观察，不能阻止 auxiliary request。该 PR 允许插件在辅助调用前 veto provider attempt，使 egress/redaction 插件能够控制 aux traffic。  
路线图信号：Hermes Agent 正在扩展插件对模型调用链路的控制能力，特别是隐私、安全、出站流量治理。

---

### 6.4 Nerve 插件目录版本更新

- PR #131194  
  标题：chore(plugin-catalog): bump Nerve to v0.3.1  
  链接：<https://github.com/NousResearch/hermes-agent/pull/131194>

更新社区插件目录中的 Nerve 到 v0.3.1。  
路线图信号：插件生态仍在持续维护，但本 PR 属于 catalog maintenance，不是核心功能变更。

---

## 7. 用户反馈摘要

### 7.1 用户最不满的是“静默失败”

今日多个 Issue 都具有相同特征：系统失败但用户和 agent 都没有清晰信号。

典型案例：

- 媒体下载失败被静默丢弃：  
  Issue #131184：<https://github.com/NousResearch/hermes-agent/issues/131184>  
  PR #131185：<https://github.com/NousResearch/hermes-agent/pull/131185>

- Feishu 大附件静默丢失：  
  Issue #131174：<https://github.com/NousResearch/hermes-agent/issues/131174>  
  PR #131175：<https://github.com/NousResearch/hermes-agent/pull/131175>

- 插件 slash command 在 turn 期间被吞掉：  
  Issue #131051：<https://github.com/NousResearch/hermes-agent/issues/131051>

- Telegram 首条 inbound turn 永久卡住且无错误：  
  Issue #131145：<https://github.com/NousResearch/hermes-agent/issues/131145>

用户诉求非常明确：**失败可以发生，但必须可见、可诊断、可恢复**。

---

### 7.2 会话恢复与租约管理是高频痛点

多个用户反馈集中在 session、PTY、turn lease、Dashboard/Desktop 恢复路径上：

- Dashboard “New chat” 留下不可达 PTY：  
  Issue #131172：<https://github.com/NousResearch/hermes-agent/issues/131172>

- Desktop session reopen 导致 transcript 偏离 live tail：  
  Issue #131165：<https://github.com/NousResearch/hermes-agent/issues/131165>

- Desktop 右侧消息 timeline 闪烁并与选中消息不一致：  
  Issue #131166：<https://github.com/NousResearch/hermes-agent/issues/131166>

- Background-process completion 被 async delegation 的 turn lease 阻塞：  
  Issue #131129：<https://github.com/NousResearch/hermes-agent/issues/131129>

这些问题表明 Hermes Agent 的多前端、多会话、多执行体架构正在承受复杂生命周期管理压力。

---

### 7.3 跨平台部署场景暴露出边界条件

今日大量问题来自 Windows、Linux root、macOS 音频设备、Podman 多容器等环境：

- Windows update 停止 gateway 与 tree-kill：  
  Issue #131149：<https://github.com/NousResearch/hermes-agent/issues/131149>

- Windows terminal stdout pipe 被 GUI 子进程持有导致挂起：  
  Issue #131133：<https://github.com/NousResearch/hermes-agent/issues/131133>

- macOS PortAudio 热插拔死设备 ID：  
  Issue #131177：<https://github.com/NousResearch/hermes-agent/issues/131177>

- Linux root Chrome 缺少 `--no-sandbox`：  
  Issue #131152：<https://github.com/NousResearch/hermes-agent/issues/131152>

- Linux Desktop sandbox fallback marker 污染：  
  Issue #131055：<https://github.com/NousResearch/hermes-agent/issues/131055>

- 多容器 standalone profile 隔离问题：  
  Issue #131183：<https://github.com/NousResearch/hermes-agent/issues/131183>

说明真实用户部署 Hermes Agent 的场景已经比较多样，项目需要更强的 platform guardrail 和诊断提示。

---

### 7.4 用户对工具透明度有更高要求

文件读取相关 PR 显示用户已经开始关注工具输出的准确性和边界披露：

- DOCX 不应读取已删除修订内容：  
  PR #131196：<https://github.com/NousResearch/hermes-agent/pull/131196>

- XLSX 截断读取必须披露限制：  
  PR #131180：<https://github.com/NousResearch/hermes-agent/pull/131180>

这类问题不一定造成崩溃，但会直接影响 agent 对文档的理解质量和用户信任。

---

## 8. 待处理积压

由于本次输入仅覆盖过去 24 小时更新，无法严格判断“长期未响应”的 Issue 或 PR。以下列出今日仍处于 OPEN、影响较大且目前未在可见 PR 列表中看到明确修复的重点积压，建议维护者优先确认。

### 8.1 P0 缓存与 session prompt 一致性问题

- Issue #131118：Discord auto-threaded mention pins parent channel topic  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131118>

- Issue #131031：Gateway internal wake after /stop, /undo or /model re-renders session-context prompt  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131031>

建议优先级：高。  
原因：涉及 prompt cache、session context 和模型调用成本，且为 P0。

---

### 8.2 P1 消息投递与会话卡死问题

- Issue #131145：Telegram first inbound turn wedged forever  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131145>

建议优先级：高。  
原因：首条消息永久卡死且无错误，直接影响平台可用性。

---

### 8.3 P1 context compaction 正确性问题

- Issue #131104：Compaction restatement leaves two active copies of the user request  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131104>

建议优先级：高。  
原因：长会话压缩是 Agent 产品核心路径，重复 active 消息和旧回复重发会显著破坏用户信任。

---

### 8.4 P1 插件安装导致用户文件删除

- Issue #131126：hermes plugins install --force deletes plugin user files  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131126>

建议优先级：高。  
原因：存在用户数据丢失风险，且命令是文档化路径。

---

### 8.5 Windows terminal 永久挂起

- Issue #131133：Terminal foreground call can hang indefinitely  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131133>

建议优先级：中高。  
原因：会导致工具调用无法返回，影响本地执行可靠性。

---

### 8.6 Browser 工具路径与权限问题

- Issue #131152：browser.use_real_profile fails on Linux root  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131152>

- Issue #131144：Built-in browser tools fail on UUID-named sessions  
  链接：<https://github.com/NousResearch/hermes-agent/issues/131144>

建议优先级：中。  
原因：均为边界条件，但会直接阻断 browser tool 使用。

---

## 总体判断

Hermes Agent 今日呈现出 **高活跃、高问题暴露、高修复响应** 的状态。项目社区正在密集覆盖真实部署中的复杂边界：多平台 Gateway、Desktop/Dashboard 会话恢复、插件生态、语音设备、文件工具和安装更新链路。  
积极信号是多个新问题在当天已有对应 PR，说明维护响应速度较快；风险信号是 P0/P1 问题仍集中在 session state、prompt cache、message delivery 等核心路径。  
建议维护者短期重点聚焦三类工作：  
1. 合并并验证已有修复 PR，尤其是 #131181、#131185、#131188、#131192、#131187/#131190。  
2. 优先处理无 fix PR 的 P0/P1 问题，如 #131118、#131031、#131145、#131104、#131126。  
3. 为静默失败路径建立统一的用户可见错误、agent 可见事件和日志诊断机制。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报  
日期：2026-10-02  
仓库：github.com/sipeed/picoclaw

## 1. 今日速览

过去 24 小时内，PicoClaw 项目整体活跃度较低：没有新的或更新的 Issue，也没有版本发布。今日唯一更新来自 1 个新建的开放 PR，聚焦于 Agent 执行过程中的“单轮 wall-clock 时间预算”能力。该 PR 属于 AI Agent 运行控制与稳定性改进方向，说明项目仍在围绕 Agent 执行边界、工具调用控制和可预测性进行增强。整体来看，今日社区讨论热度有限，但新增 PR 具有较明确的工程价值。

---

## 2. 项目进展

今日暂无已合并或已关闭的重要 PR。

### 新增待合并 PR

#### [PR #3414 feat(agent): add wall-clock turn time budget](https://github.com/sipeed/picoclaw/pull/3414)  
- 状态：OPEN  
- 作者：racso2609  
- 创建时间：2026-10-01  
- 更新时间：2026-10-01  
- 评论数：未提供  
- 👍：0  

该 PR 新增了一个可选配置项：

```text
agents.defaults.turn_time_budget_seconds
```

其含义是为 Agent 的每一轮执行设置 wall-clock 时间预算，默认值为 `0`，表示关闭该限制。

当某一轮执行时间超过预算后，Agent 不再继续调度新的工具调用，而是被要求输出一份简洁的阶段性总结，说明目前已完成的工作。这一改动主要针对 Agent 可能长时间循环、持续调度工具、响应不可控等问题。

从项目推进角度看，该 PR 并未带来已落地的合并成果，但它释放出一个重要信号：PicoClaw 正在增强 Agent 执行生命周期管理能力，尤其是对长任务、工具调用循环和响应延迟的控制。

---

## 3. 社区热点

今日社区讨论数据较少，未出现高评论、高反应的 Issue 或 PR。

### 当前最值得关注的讨论点

#### [PR #3414 feat(agent): add wall-clock turn time budget](https://github.com/sipeed/picoclaw/pull/3414)  
虽然该 PR 暂无明显社区反应数据，但它涉及 Agent 框架中的关键体验问题：  
- 如何避免 Agent 在复杂任务中无限制地继续规划和调用工具  
- 如何让 Agent 在时间受限场景下及时返回阶段性结果  
- 如何提升用户对 Agent 执行耗时的可预测性  
- 如何为生产环境中的自动化 Agent 设置更清晰的运行边界  

这类能力通常对以下场景较为重要：  
- Web/API 请求中有超时限制的 Agent 服务  
- 多工具链自动化任务  
- CI、自动化修复、代码生成等长链路任务  
- 面向用户交互的个人 AI 助手场景  

---

## 4. Bug 与稳定性

过去 24 小时内没有新的 Bug、崩溃或回归问题报告。

当前没有数据表明存在新增高严重性稳定性风险，也没有发现针对 Bug 的新 fix PR。

不过，[PR #3414](https://github.com/sipeed/picoclaw/pull/3414) 从工程性质上看与运行稳定性相关。它不是传统意义上的 Bug 修复，但可以降低以下潜在风险：  
- Agent 长时间运行导致请求超时  
- 工具调用循环无法及时收敛  
- 用户等待时间不可控  
- 系统资源被单个 Agent turn 长时间占用  

严重程度评估：  
- 新增崩溃 / 回归：无  
- 新增功能性 Bug：无  
- 潜在稳定性增强：PR #3414，待评审与合并  

---

## 5. 功能请求与路线图信号

今日没有来自 Issue 的新功能请求。

但新增 PR 本身体现了一个明确的路线图信号：PicoClaw 可能正在强化 Agent 执行控制能力。

### 可能进入后续版本的能力

#### Agent 单轮执行时间预算  
链接：[PR #3414](https://github.com/sipeed/picoclaw/pull/3414)

该功能若被合并，预计会为用户提供更细粒度的 Agent 执行约束能力。其默认关闭，说明维护者或贡献者希望在不破坏现有行为的前提下，引入新的可选控制机制。

潜在影响：  
- 提升 Agent 行为的可预测性  
- 改善长任务下的用户体验  
- 降低工具调用链失控的概率  
- 为生产环境部署提供更安全的默认配置选项  
- 可能成为后续 timeout、budget、quota、scheduler 控制能力的基础  

迁移风险预计较低，因为该配置默认值为 `0`，即禁用状态。

---

## 6. 用户反馈摘要

过去 24 小时内没有 Issue 评论数据，因此无法提炼新的真实用户反馈、痛点或满意度变化。

基于当前唯一 PR 的内容，可以间接推断项目正在关注以下用户体验问题：  
- Agent 执行时间过长时缺少中间结果  
- 用户希望 Agent 能在超时前主动总结进展  
- 工具调用链需要更明确的停止条件  
- 长任务场景下需要更好的响应兜底机制  

这些更像是工程设计层面的反馈信号，而非直接来自用户 Issue 的明确诉求。

---

## 7. 待处理积压

当前数据中未提供长期未响应 Issue 或 PR，因此无法判断是否存在历史积压问题。

### 今日新增待处理项

#### [PR #3414 feat(agent): add wall-clock turn time budget](https://github.com/sipeed/picoclaw/pull/3414)  
- 状态：OPEN  
- 类型：功能增强  
- 建议优先级：中等偏高  
- 原因：该 PR 涉及 Agent 运行控制、超时体验和工具调度边界，对生产可用性有潜在正面影响。  

建议维护者关注以下评审点：  
1. `turn_time_budget_seconds` 是否应支持全局默认值与单 Agent 覆盖配置。  
2. 超时后“停止调度新工具”的行为是否会影响已有 Agent 工作流。  
3. 阶段性总结的提示词是否足够稳定，是否会导致模型仍继续规划。  
4. 是否需要测试覆盖：  
   - 默认关闭场景  
   - 超时触发场景  
   - 已调度工具正在执行时的行为  
   - 多轮对话中的预算重置逻辑  
5. 是否需要在文档中明确该配置与其他 timeout / tool budget / max turns 机制的关系。  

---

## 项目健康度评估

- 活跃度：低  
- 维护信号：正常，有新增功能型 PR  
- 社区讨论：低  
- 稳定性风险：未发现新增风险  
- 近期方向：Agent 执行控制、时间预算、工具调用边界  

总体来看，PicoClaw 今日没有大规模社区活动或版本发布，但新增 PR 指向一个较有价值的 Agent 运行时能力。如果该 PR 后续被合并，将有助于提升项目在长任务和生产化 Agent 场景中的可靠性与可控性。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报  
**日期：2026-10-02**  
**仓库：github.com/qwibitai/nanoclaw**  
**统计窗口：过去 24 小时**

---

## 1. 今日速览

过去 24 小时 NanoClaw 活跃度较高，共有 **3 条 Issue 更新**、**12 条 PR 更新**，但 **无新版本发布**。  
今日工作重心明显集中在 **安装/更新流程、安全加固、OneCLI 网关、依赖治理与发布流程自动化** 上。  
Issue 侧新增了 CLI 分页默认行为、在线安装安全审计能力、PreCompact hook 运行失败等问题，说明用户在实际部署和运维场景中遇到了一些可用性与稳定性痛点。  
PR 侧共有 **8 个仍待合并**、**4 个已关闭/完成**，整体显示维护团队正在快速推进安全修复和发布工程改进，项目健康度较好，但部分关键修复仍处于待合并状态。

---

## 2. 项目进展

### 已关闭 / 已完成的重要 PR

#### 1. Iron Proxy 依赖升级与安全加固  
- PR：[#3982 build(deps): pin Iron Proxy to v0.52.0](https://github.com/nanocoai/nanoclaw/pull/3982)  
- 状态：CLOSED  
- 作者：glifocat  
- 方向：安全加固 / 技能依赖治理  

该 PR 将 Iron Proxy 从较旧提交升级到 **v0.52.0**，主要目的是清除旧版本中已知的依赖安全告警。摘要中提到旧 pin 携带 **30 个已知依赖 advisories**，其中包括多个 `x/crypto` 相关问题。  
这类更新对 NanoClaw 的安全基线非常重要，尤其是涉及代理、网关和技能运行时的组件。

#### 2. Iron front proxy 的 grpc 安全升级  
- PR：[#3981 build(deps): bump grpc to 1.83.2 in the Iron front proxy](https://github.com/nanocoai/nanoclaw/pull/3981)  
- 状态：CLOSED  
- 作者：glifocat  
- 方向：依赖安全 / 技能交付  

该 PR 将 Iron front proxy 中的 `grpc` 从旧版本升级到 **1.83.2**，用于提前清除 **6 个已知 advisories**。  
结合 #3982 可以看出，维护团队今日在集中处理代理链路相关的供应链安全问题，为后续打开 Dependabot 告警或持续依赖治理做准备。

#### 3. OneCLI 网关测试稳定性修复  
- PR：[#3979 test(onecli): make unsafe-directory permissions test umask-independent](https://github.com/nanocoai/nanoclaw/pull/3979)  
- 状态：CLOSED  
- 作者：glifocat  
- 方向：测试稳定性 / OneCLI 安装兼容性  

该 PR 修复了 OneCLI gateway 测试在 `umask 077` 环境下失败的问题。此前测试中创建目录时依赖 `mkdirSync(..., { mode: 0o755 })`，但该权限会被 umask 掩码影响，从而造成测试结果不稳定。  
这属于典型的 CI / 安装环境兼容性修复，有助于降低不同 Linux 主机配置下的误报。

#### 4. tsx 升级以消除 Node 26 警告  
- PR：[#3977 build(deps): bump tsx to 4.23 to stop Node 26 module.register warning](https://github.com/nanocoai/nanoclaw/pull/3977)  
- 状态：CLOSED  
- 作者：glifocat  
- 方向：开发体验 / Node 26 兼容性  

该 PR 将 `tsx` 升级至 **4.23**，以消除 Node 26 中 `module.register()` 弃用警告。  
虽然不属于功能性变更，但能减少用户执行 `ncl` 时 stderr 中的噪音，改善 CLI 体验，并提前适配 Node 26。

### 待合并但影响较大的 PR

#### 1. OneCLI gateway 固定到 1.42.0，修复 host-enforcement 绕过  
- PR：[#3989 fix(onecli): pin the gateway to 1.42.0 for the host-enforcement bypass fix](https://github.com/nanocoai/nanoclaw/pull/3989)  
- 状态：OPEN  
- 作者：drsmk238  
- 方向：安全加固 / OneCLI  

该 PR 将 `add-onecli` 使用的 gateway 固定到 **1.42.0**，以包含 credential-injection host-enforcement bypass 的修复。  
这属于较高优先级的安全修复，建议维护者优先审查。

#### 2. `/update-nanoclaw` 默认跟随 release tag，而非 main  
- PR：[#3986 feat(update): follow release tags by default via update channels](https://github.com/nanocoai/nanoclaw/pull/3986)  
- 状态：OPEN  
- 作者：glifocat  
- 方向：更新机制 / 发布稳定性  

该 PR 将默认更新行为从跟随 `main` 改为跟随最新稳定 release tag，并引入 `NANOCLAW_UPDATE_CHANNEL`。  
这会显著改善生产环境用户的更新安全性，降低意外引入未发布代码的风险。

#### 3. gateway skill payload 变化时也刷新已安装 gateway  
- PR：[#3988 fix(update): refresh the installed gateway when only its skill payload changed](https://github.com/nanocoai/nanoclaw/pull/3988)  
- 状态：OPEN  
- 作者：glifocat  
- 方向：更新修复 / 安装维护  

该 PR 修复 `/update-nanoclaw` 在 gateway skill payload 变化但 provider/setup 文件未变时不会刷新 gateway 的问题。  
这与 #3986 共同表明，更新系统是当前维护重点之一。

#### 4. 代理凭据不再写入可读 service files  
- PR：[#3985 fix(setup): keep proxy credentials out of readable service files](https://github.com/nanocoai/nanoclaw/pull/3985)  
- 状态：OPEN  
- 作者：glifocat  
- 方向：安装安全 / 凭据保护  

该 PR 解决 setup 将含有 `user:password` 的 proxy URL 写入 0644 systemd unit 文件的问题。  
这是一个实际的本地凭据暴露风险，建议与 #3989 一样优先处理。

---

## 3. 社区热点

今日 Issue 和 PR 的评论数、点赞数均较低，所有新增 Issue 均为 **0 评论、0 反应**，说明今日社区讨论热度不高，主要是维护者和少数用户在提交明确问题与修复。

### 关注度较高的方向，而非互动热度

#### 1. OneCLI 使用体验与安全  
- Issue：[#3991 OneCLI list calls without --max only see the first 20 agents, rules or secrets](https://github.com/nanocoai/nanoclaw/issues/3991)  
- PR：[#3989 fix(onecli): pin the gateway to 1.42.0 for the host-enforcement bypass fix](https://github.com/nanocoai/nanoclaw/pull/3989)  
- PR：[#3979 test(onecli): make unsafe-directory permissions test umask-independent](https://github.com/nanocoai/nanoclaw/pull/3979)  

OneCLI 相关问题今日同时出现在用户反馈、测试修复和安全加固中。背后的诉求是：  
- CLI 输出应避免隐式截断，减少误导；  
- gateway 安全边界必须可靠；  
- 安装和测试应适配真实生产主机的权限配置。

#### 2. 更新与发布流程稳定化  
- PR：[#3986 feat(update): follow release tags by default via update channels](https://github.com/nanocoai/nanoclaw/pull/3986)  
- PR：[#3988 fix(update): refresh the installed gateway when only its skill payload changed](https://github.com/nanocoai/nanoclaw/pull/3988)  
- PR：[#3987 feat(release): self-approved x.y.z-rc.N pre-releases; widen stable approvers](https://github.com/nanocoai/nanoclaw/pull/3987)  

维护者正在把更新路径从“跟随主干开发分支”调整为“默认跟随稳定 release”，同时优化 RC 预发布流程。这反映项目正从快速迭代逐渐转向更成熟的发布治理。

---

## 4. Bug 与稳定性

### 高优先级

#### 1. OneCLI list 默认最多只返回 20 条且无明显提示  
- Issue：[#3991 OneCLI list calls without --max only see the first 20 agents, rules or secrets](https://github.com/nanocoai/nanoclaw/issues/3991)  
- 状态：OPEN  
- 作者：drsmk238  
- 标签：`kind/bug`, `triage/unresolved`  
- 影响版本：NanoClaw 2.4.0，OneCLI CLI 2.2.5，gateway 1.42.0  
- 是否已有 fix PR：未在今日数据中看到直接对应 PR  

问题描述：`onecli agents list`、`onecli rules list`、`onecli secrets list` 在未传 `--max` 时最多只返回 20 行，并且输出没有清楚提示结果被截断。  
影响：用户可能误以为系统中只有前 20 个 agent / rule / secret，造成运维误判。  
建议优先级：中高。虽然不是崩溃问题，但可能导致错误管理操作。

#### 2. PreCompact hook 因未注册 mailbox 失败  
- Issue：[#3984 PreCompact hook fails: compact-instructions.ts calls getAllDestinations() without a registered mailbox](https://github.com/nanocoai/nanoclaw/issues/3984)  
- 状态：OPEN  
- 作者：worthogdotorg  
- 是否已有 fix PR：未在今日数据中看到直接对应 PR  

错误栈显示 `compact-instructions.ts` 在 PreCompact hook 中调用 `getAllDestinations()`，但此时没有注册 agent mailbox，导致：  
```text
error: No agent mailbox registered
```

影响：每次 compaction 都会触发 hook 失败，可能影响长期运行实例的上下文压缩流程或维护任务。  
建议优先级：高。该问题具备可重复性，且发生在自动 hook 中，容易影响用户对系统稳定性的信任。

### 中优先级

#### 3. setup 首次聊天检测误判 agent 失败通知为成功  
- PR：[#3980 fix(setup): score the agent's failure notice as a failed first chat](https://github.com/nanocoai/nanoclaw/pull/3980)  
- 状态：OPEN  
- 作者：glifocat  
- 关联领域：`area/agent-runner`, `area/channels`, `area/core`, `area/setup-installation`  

问题：当 key 配置错误时，agent 返回 “The agent run failed…” 这类失败消息，但 setup wizard 将任何输出都判定为 `ok`。  
影响：用户会被误导为助手配置成功，随后在真实使用中遇到失败。  
已有修复：有，PR #3980 待合并。

#### 4. 日志序列化在 BigInt 或循环引用场景下可能绕过嵌套 toJSON 脱敏  
- PR：[#3983 fix(log): keep nested toJSON redaction when a value holds a BigInt or a cycle](https://github.com/nanocoai/nanoclaw/pull/3983)  
- 状态：OPEN  
- 作者：glifocat  

问题：`safeStringify` 在遇到 BigInt 或循环引用时 fallback 到 `inspect()`，可能跳过嵌套 `toJSON()` 的脱敏逻辑。  
影响：存在敏感信息进入日志的风险。  
已有修复：有，PR #3983 待合并。

#### 5. gateway skill payload 变更未触发已安装 gateway 刷新  
- PR：[#3988 fix(update): refresh the installed gateway when only its skill payload changed](https://github.com/nanocoai/nanoclaw/pull/3988)  
- 状态：OPEN  
- 作者：glifocat  

问题：`validateUpdate` 仅在 `src/gateway-providers` 或 `setup/gateways` 变化时刷新 gateway，若只改了 gateway skill payload，则已安装实例不会更新。  
影响：用户可能以为更新完成，但实际运行的 gateway 仍是旧 payload。  
已有修复：有，PR #3988 待合并。

---

## 5. 功能请求与路线图信号

### 1. live install 安全审计能力  
- Issue：[#3990 security-audit: a read-only check of a live install's isolation and patch state](https://github.com/nanocoai/nanoclaw/issues/3990)  
- 状态：OPEN  
- 作者：drsmk238  
- 标签：`kind/feature`, `delivery/skill`, `triage/unresolved`  

用户希望新增一个只读的 `security-audit` 能力，用于检查正在运行的 NanoClaw 安装中的隔离配置和补丁状态。  
该请求覆盖的检查面包括：  
- wirings 与 destinations  
- user_roles  
- cli_scope  
- container mounts  
- mount allowlist  
- gateway agents 与 secret mode  
- gateway block rules  

路线图信号：这与今日多个安全加固 PR 高度一致，例如：  
- [#3989 OneCLI gateway host-enforcement bypass fix](https://github.com/nanocoai/nanoclaw/pull/3989)  
- [#3985 proxy credentials protection](https://github.com/nanocoai/nanoclaw/pull/3985)  
- [#3983 logging redaction fix](https://github.com/nanocoai/nanoclaw/pull/3983)  
- [#3978 Dependabot for GitHub Actions](https://github.com/nanocoai/nanoclaw/pull/3978)  

判断：该功能有较大概率进入后续路线图，尤其适合作为运维 / hardening skill 交付。

### 2. 更新通道与发布治理  
- PR：[#3986 feat(update): follow release tags by default via update channels](https://github.com/nanocoai/nanoclaw/pull/3986)  
- PR：[#3987 feat(release): self-approved x.y.z-rc.N pre-releases; widen stable approvers](https://github.com/nanocoai/nanoclaw/pull/3987)  

维护团队正在引入更明确的更新通道和预发布流程。  
可能的后续方向包括：  
- stable / beta / main 等 channel 分层；  
- RC 版本更快发布；  
- stable 版本保留更严格审批；  
- 生产部署默认不再追踪 main。  

判断：这些 PR 很可能直接影响下一版本的安装与更新体验。

### 3. 依赖自动化治理  
- PR：[#3978 ci: add Dependabot for GitHub Actions, remove the inert Renovate config](https://github.com/nanocoai/nanoclaw/pull/3978)  
- 状态：OPEN  
- 作者：glifocat  

该 PR 计划启用 Dependabot for GitHub Actions，并移除未实际运行的 Renovate 配置。  
考虑到今日多个依赖安全升级 PR，依赖治理显然已经成为近期维护重点。

---

## 6. 用户反馈摘要

今日 Issue 评论数均为 0，因此无法从讨论串中提炼进一步的互动反馈。但从 Issue 内容本身可以归纳出以下真实用户痛点：

### 1. CLI 输出存在“静默截断”风险  
- Issue：[#3991](https://github.com/nanocoai/nanoclaw/issues/3991)  

用户在使用 `onecli agents list`、`rules list`、`secrets list` 时，如果不传 `--max`，只能看到前 20 条结果，但 CLI 没有明显提示。  
痛点：运维人员依赖 CLI 管理对象时，隐式分页会造成错误认知。

### 2. 安全配置分散，缺少统一审计入口  
- Issue：[#3990](https://github.com/nanocoai/nanoclaw/issues/3990)  

用户指出 NanoClaw 的隔离安全依赖多个配置点，一旦 drift 或补丁滞后，很难人工确认系统是否仍处于安全状态。  
痛点：生产环境需要一个只读、可重复执行的安全检查工具，而不是依赖人工逐项排查。

### 3. 自动 hook 失败影响长期运行体验  
- Issue：[#3984](https://github.com/nanocoai/nanoclaw/issues/3984)  

用户报告每次 compaction 都会触发 PreCompact hook 错误。  
痛点：系统自动维护流程一旦失败，会显著影响用户对稳定性的感知，尤其是此类问题可能持续重复出现。

---

## 7. 待处理积压

基于今日提供的数据，未看到长期未响应的历史 Issue 或 PR；所有列出的 Issue / PR 均创建或更新于 2026-10-01 至 2026-10-02。  
不过，以下开放项值得维护者优先关注：

### 高优先级待处理

1. [#3989 fix(onecli): pin the gateway to 1.42.0 for the host-enforcement bypass fix](https://github.com/nanocoai/nanoclaw/pull/3989)  
   - 原因：涉及 credential-injection host-enforcement bypass 修复，应优先审查合并。

2. [#3985 fix(setup): keep proxy credentials out of readable service files](https://github.com/nanocoai/nanoclaw/pull/3985)  
   - 原因：涉及本地代理凭据泄露风险。

3. [#3983 fix(log): keep nested toJSON redaction when a value holds a BigInt or a cycle](https://github.com/nanocoai/nanoclaw/pull/3983)  
   - 原因：涉及日志脱敏可靠性，可能影响敏感信息保护。

4. [#3984 PreCompact hook fails](https://github.com/nanocoai/nanoclaw/issues/3984)  
   - 原因：暂无对应修复 PR，且问题可重复触发。

### 中优先级待处理

5. [#3991 OneCLI list calls without --max only see the first 20 agents, rules or secrets](https://github.com/nanocoai/nanoclaw/issues/3991)  
   - 原因：CLI 默认行为可能误导用户，建议增加分页提示或调整默认输出策略。

6. [#3990 security-audit capability](https://github.com/nanocoai/nanoclaw/issues/3990)  
   - 原因：与当前安全加固方向高度一致，适合作为后续版本能力规划。

7. [#3986 feat(update): follow release tags by default via update channels](https://github.com/nanocoai/nanoclaw/pull/3986)  
   - 原因：可显著提升生产环境更新稳定性。

8. [#3988 fix(update): refresh the installed gateway when only its skill payload changed](https://github.com/nanocoai/nanoclaw/pull/3988)  
   - 原因：修复更新遗漏问题，与 #3986 形成互补。

---

## 总体健康度评估

NanoClaw 今日表现出 **高维护活跃度、低社区讨论热度、强安全治理导向** 的特征。  
维护团队正在集中推进安全修复、更新机制稳定化、依赖治理和发布流程改进，说明项目正向更成熟的生产可用状态演进。  
当前主要风险集中在若干尚未合并的安全与稳定性 PR，以及 PreCompact hook 失败这类暂无修复 PR 的运行时问题。  
若 #3989、#3985、#3983、#3986、#3988 能尽快合并，项目的安全基线和运维可靠性将有明显提升。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报  
日期：2026-10-02  
仓库：[`nearai/ironclaw`](https://github.com/nearai/ironclaw)

## 1. 今日速览

过去 24 小时，IronClaw 项目活跃度较低：仅有 1 条 Issue 更新，未出现新的 Pull Request、合并记录或版本发布。今日唯一新增/活跃事项是每日失败分类报告，聚焦 benchmark 运行中的 non-pass 问题，说明项目当前仍在持续进行自动化质量监控。  
从数据看，今日没有直接代码推进，但测试与稳定性分析仍在运行，项目维护重点更偏向于识别 benchmark 侧缺陷与回归风险。整体健康度保持可观测状态，但短期开发活跃度偏低。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

过去 24 小时无新的 Pull Request 更新、合并或关闭记录。

当前未观察到功能开发、修复补丁或重构类 PR 推进。因此，从 GitHub 活动数据看，今日项目代码层面没有明显前进；主要进展来自 benchmark 失败分类与稳定性观察。

---

## 4. 社区热点

### [Issue #8121 — Daily ironclaw failure taxonomy — 2026-10-01](https://github.com/nearai/ironclaw/issues/8121)

- 状态：Open  
- 作者：`pranavraja99`  
- 创建时间：2026-10-01  
- 评论数：0  
- 👍 反应数：0  
- 类型：每日失败分类 / 测试稳定性跟踪

该 Issue 是今日唯一活跃事项，内容聚焦于 IronClaw benchmark 的失败分类。报告指出，`clawbench` 本轮存在 128 个 non-pass，主要由 benchmark 侧的 broken-workspace-seeding 缺陷主导，并且该问题被描述为 recurring，说明它可能不是一次性偶发问题。

虽然该 Issue 暂无评论和反应，但从内容看，它对维护者具有较高诊断价值：它帮助区分模型/智能体能力问题与 benchmark 基础设施问题，避免将测试环境缺陷误判为项目功能回归。

---

## 5. Bug 与稳定性

### 高优先级：Benchmark workspace seeding 缺陷导致大量 non-pass

- 相关 Issue：[Issue #8121](https://github.com/nearai/ironclaw/issues/8121)  
- 严重程度：高  
- 当前状态：Open  
- 是否已有 fix PR：未观察到相关 PR  
- 影响范围：`clawbench` benchmark 运行结果  
- 已知现象：128 个 non-pass 被归因于 benchmark 侧 broken-workspace-seeding 缺陷，并且该问题为 recurring

该问题的严重性在于它会污染 benchmark 结果，使失败统计不能直接反映 IronClaw 本身的真实能力或质量状态。如果不尽快修复，可能影响维护者对回归、模型表现和 agent 执行稳定性的判断。

建议维护者优先确认以下事项：

1. broken workspace seeding 的触发条件；
2. 是否影响近期所有 benchmark run；
3. 是否需要隔离或重跑受影响的 benchmark；
4. 是否应将该缺陷从 agent failure taxonomy 中单独剥离为 infra failure。

---

## 6. 功能请求与路线图信号

过去 24 小时未出现新的功能请求 Issue，也没有相关 PR 表明新功能即将进入下一版本。

不过，[Issue #8121](https://github.com/nearai/ironclaw/issues/8121) 释放出一个间接路线图信号：项目对失败分类、benchmark 可解释性和自动化质量评估的依赖较强。后续可能需要加强以下方向：

- benchmark 基础设施稳定性；
- failure taxonomy 自动归因能力；
- 对 recurring infra defects 的自动标记与过滤；
- benchmark run 结果的可信度校验。

这些不属于用户直接提出的新功能，但属于项目质量工程层面的潜在改进方向。

---

## 7. 用户反馈摘要

过去 24 小时没有来自用户的 Issue 评论或显式反馈。

从唯一 Issue 内容可推断出的维护者痛点是：当前 benchmark 结果中存在由基础设施缺陷引起的大量 non-pass，这会降低测试信号质量。维护者需要更准确地区分：

- agent 本身能力不足；
- benchmark 用例问题；
- workspace 初始化或 seeding 问题；
- 测试环境缺陷。

当前没有足够评论数据来判断普通用户的满意度、不满点或具体使用场景。

---

## 8. 待处理积压

基于本次提供的数据，过去 24 小时内未出现长期未响应的 Issue 或 PR 信息，因此无法识别具体积压项。

但建议维护者关注当前仍处于 Open 状态的稳定性相关 Issue：

- [Issue #8121 — Daily ironclaw failure taxonomy — 2026-10-01](https://github.com/nearai/ironclaw/issues/8121)  
  - 原因：涉及 recurring benchmark-side defect，可能持续影响 benchmark 可信度。
  - 建议动作：确认是否需要创建独立修复 Issue 或 PR，并在后续日报中追踪其修复状态。

---

## 今日健康度判断

- 开发活跃度：低  
- 社区互动：低  
- 测试可观测性：中等偏高  
- 稳定性风险：中等偏高，主要来自 benchmark 基础设施缺陷  
- 发布节奏：今日无发布信号  

总体来看，IronClaw 今日没有明显功能或代码推进，但质量监控仍在持续运行。当前最值得关注的是 benchmark 侧 recurring workspace seeding 问题，它可能影响项目对真实失败率和回归风险的判断。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报  
日期：2026-10-02  
仓库：netease-youdao/LobsterAI

## 1. 今日速览

过去 24 小时，LobsterAI 项目整体活跃度偏低：Issues 无新增、无关闭、无活跃讨论，Pull Requests 仅有 1 条更新且已关闭。今日主要进展集中在登录态与模型选择器体验修复，属于稳定性与用户体验层面的维护型更新。未观察到新版本发布，也没有新的功能需求或社区讨论信号。整体来看，项目处于低频维护状态，短期重点更偏向修复边缘场景和提升基础可用性。

## 2. 项目进展

### 已关闭 PR

#### PR #2788：修复未登录状态下模型目录恢复与选择器登录提示问题  
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2788  
- 状态：Closed  
- 作者：fisherdaddy  
- 涉及区域：`renderer`, `main`  
- 类型：认证流程 / 模型选择器体验修复  
- 更新时间：2026-10-01  

该 PR 修复了用户在未登录路径下，公共 pricing catalog / plan model catalog 加载失败后，模型选择器可能为空的问题。变更内容包括：  
- 在未登录路径下重新加载公共 pricing catalog；  
- 页面刷新时，如果没有 plan models，则尝试恢复模型目录；  
- 窗口重新聚焦时，如果模型列表为空，也会再次尝试加载；  
- 当用户未登录且没有可展示模型时，在模型选择器中展示登录提示，而不是自定义模型提示。  

这项修复主要改善了未登录用户或启动阶段请求失败用户的首屏体验，降低“模型选择器为空”造成的误解和不可用感。从项目推进角度看，属于中等重要度的稳定性与 UX 修复，未引入明显的新功能，但有助于减少登录态边界问题。

## 3. 社区热点

过去 24 小时未出现高热度社区讨论：  
- Issues 更新数：0  
- PR 更新数：1  
- 评论数最高条目：暂无有效评论数据  
- 反应最多条目：暂无明显社区反馈  

唯一值得关注的条目是：  
- PR #2788：https://github.com/netease-youdao/LobsterAI/pull/2788  

该 PR 虽然没有明显社区互动，但其背后反映出一个典型用户诉求：即使用户未登录或启动阶段网络请求失败，应用也应提供可恢复、可解释的状态，而不是让关键入口如模型选择器直接空白。

## 4. Bug 与稳定性

### 中等严重程度：未登录状态下模型选择器可能为空

- 相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2788  
- 状态：已有修复 PR，当前已关闭  
- 影响范围：未登录用户、启动阶段 catalog 加载失败用户、刷新或窗口聚焦后模型列表为空的场景  
- 涉及模块：认证状态、模型目录加载、模型选择器 UI  
- 严重程度：中等  

问题表现为：当用户处于未登录状态，且公共模型目录或 pricing catalog 加载失败时，模型选择器可能没有任何可展示内容。对于用户而言，这会造成“没有模型可用”或“应用初始化失败”的感知。

该 PR 通过刷新、窗口聚焦、未登录路径下的重新拉取机制提升了恢复能力，同时将空状态提示从“自定义模型提示”调整为“登录提示”，使 UI 反馈更符合实际原因。

过去 24 小时未观察到新的崩溃、回归或高严重级别 Bug 报告。

## 5. 功能请求与路线图信号

过去 24 小时没有新增 Issues，因此未观察到明确的新功能请求。

从 PR #2788 可以推测，短期路线图可能仍会关注以下方向：  
- 登录态与未登录态下的体验一致性；  
- 模型目录加载失败后的恢复机制；  
- 模型选择器空状态提示优化；  
- 启动阶段网络失败或鉴权失败时的容错能力。  

相关链接：  
- PR #2788：https://github.com/netease-youdao/LobsterAI/pull/2788  

目前尚无足够数据判断这些方向是否会被纳入下一版本发布。

## 6. 用户反馈摘要

过去 24 小时无 Issues 评论数据，因此无法直接提炼新的真实用户反馈。

但从今日关闭的 PR 可间接看出一个潜在用户痛点：  
- 用户在未登录或启动加载失败时，需要明确知道下一步该做什么；  
- 模型选择器作为核心入口，不应因一次请求失败而长期保持空状态；  
- 空状态提示需要与用户当前状态一致，例如未登录时应提示登录，而不是提示自定义模型配置。  

相关链接：  
- PR #2788：https://github.com/netease-youdao/LobsterAI/pull/2788  

## 7. 待处理积压

根据今日提供的数据，过去 24 小时内没有长期未响应的 Issues 或 PR 被更新，也没有新增积压项可识别。

当前需要维护者后续关注的是：  
- PR #2788 关闭后，是否已实际合入主干或通过其他方式发布；  
- 该修复是否覆盖所有未登录、刷新、窗口聚焦、启动失败等边界路径；  
- 后续是否需要为模型目录加载失败增加可观测性日志或用户可见错误提示。  

相关链接：  
- PR #2788：https://github.com/netease-youdao/LobsterAI/pull/2788  

## 项目健康度判断

今日 LobsterAI 活跃度较低，但仍有针对核心使用路径的维护更新。没有新增 Issue 说明短期社区反馈平稳，但也可能意味着社区参与度不足。唯一的 PR 聚焦未登录状态和模型选择器可用性，显示维护者仍在处理产品体验细节。整体健康度可评估为：稳定维护中，社区活跃度偏低，短期无明显版本发布节奏信号。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-10-02

## 1. 今日速览

过去 24 小时，Moltis 项目没有新的 Issue 更新，也没有新版本发布，社区讨论活跃度较低。  
今日主要活动集中在 2 个新提交的开放 PR，均由 Harbor404 提交，方向分别是 TLS/WebSocket 兼容性修复与 MCP 启动/会话稳定性修复。  
从变更内容看，项目当前重点偏向运行稳定性、协议兼容性和服务恢复能力，而非新增功能。  
整体健康度评估：**维护活动存在但讨论较少，当前处于低噪声的修复推进阶段**；两个 PR 若合并，将显著改善部分生产环境下的连接可靠性。

---

## 2. 项目进展

过去 24 小时没有 PR 被合并或关闭，因此暂无已落地到主分支的功能或修复。

当前待合并的重要 PR：

### [PR #1291 — fix(tls): restrict ALPN to HTTP/1.1](https://github.com/moltis-org/moltis/pull/1291)

- 状态：Open
- 作者：Harbor404
- 创建时间：2026-10-01
- 更新：2026-10-01
- 评论数：未提供
- 反应数：0

该 PR 修复 TLS 监听器在 ALPN 协商中优先暴露 `h2` 导致浏览器新建 TLS 连接默认协商 HTTP/2 的问题。  
由于 Moltis 当前尚未实现 RFC 8441 Extended CONNECT，HTTP/2 下的 WebSocket upgrade 会失败并返回 `405 Method Not Allowed`。

该 PR 的核心做法是：

- 暂时将 TLS ALPN 限制为 `HTTP/1.1`
- 避免浏览器协商到 HTTP/2
- 在 WebSocket-over-HTTP/2 支持完成前，优先保障 WebSocket 连接可用性

项目推进意义：

- 改善 TLS 场景下 WebSocket 的可用性
- 降低浏览器端连接失败概率
- 属于兼容性和稳定性优先的修复

---

### [PR #1290 — fix(mcp): recover failed startups and expired sessions](https://github.com/moltis-org/moltis/pull/1290)

- 状态：Open
- 作者：Harbor404
- 创建时间：2026-10-01
- 更新：2026-10-01
- 评论数：未提供
- 反应数：0

该 PR 聚焦 MCP 服务启动失败和会话过期后的恢复能力。  
摘要显示，当前 MCP 服务器若在达到 `running` 状态前失败，可能不会被正确纳入重试流程；另外，streamable HTTP 场景下携带 `Mcp-Session-Id` 的 `404` 响应需要被识别为会话丢失。

该 PR 的主要改动包括：

- 跟踪 MCP 启动尝试
- 将启动失败但仍启用的服务器标记为 `dead`
- 由健康检查监控器重新拉起 dead 状态的服务器
- 复用现有指数退避策略与最多 5 次重试限制
- 将带有 `Mcp-Session-Id` 的 streamable HTTP `404` 识别为会话丢失信号

项目推进意义：

- 增强 MCP server 启动失败后的自恢复能力
- 降低因临时启动异常导致服务永久不可用的风险
- 改善会话过期、丢失后的错误处理逻辑
- 对长期运行的 Agent / MCP 集成场景有较高稳定性价值

---

## 3. 社区热点

今日没有新的 Issue，也没有可见的高评论或高反应讨论。  
两个开放 PR 均无公开反应数据，评论数为 `undefined`，因此无法判断是否形成社区热点。

相对值得关注的议题如下：

### TLS + WebSocket 兼容性问题

- 关联 PR：[PR #1291](https://github.com/moltis-org/moltis/pull/1291)
- 背后诉求：浏览器通过 TLS 连接 Moltis 时，需要 WebSocket 能够稳定建立连接
- 技术原因：当前暴露 `h2` 会导致浏览器协商 HTTP/2，但项目未实现 RFC 8441 Extended CONNECT
- 用户影响：可能表现为 WebSocket upgrade 失败、连接不可用、前端或客户端报 `405 Method Not Allowed`

该问题反映出 Moltis 在多协议兼容性上需要更谨慎地处理能力声明：在尚未完整支持 HTTP/2 WebSocket 前，应避免让客户端协商到不可用路径。

### MCP 服务恢复与会话失效处理

- 关联 PR：[PR #1290](https://github.com/moltis-org/moltis/pull/1290)
- 背后诉求：MCP 服务需要在启动失败、会话丢失或连接中断后自动恢复
- 用户影响：Agent 场景下，MCP 工具服务不可用会直接影响任务执行、工具调用和长会话稳定性

该问题说明 Moltis 的 MCP 集成正在从“能连接”走向“长期稳定运行和自动恢复”。

---

## 4. Bug 与稳定性

今日没有新的 Bug Issue 报告。  
不过两个开放 PR 均指向稳定性或兼容性问题，可视为维护者正在处理的潜在 Bug 修复。

### 高优先级：TLS 下 WebSocket 连接失败

- 关联 PR：[PR #1291](https://github.com/moltis-org/moltis/pull/1291)
- 严重程度：高
- 类型：协议协商 / WebSocket 兼容性
- 当前状态：已有 fix PR，待合并
- 影响范围：使用 TLS listener 且通过现代浏览器建立连接的用户
- 现象：浏览器可能协商 HTTP/2，随后 WebSocket upgrade 失败，返回 `405 Method Not Allowed`
- 根因：Moltis 广告 `h2`，但尚不支持 RFC 8441 Extended CONNECT

评估：  
该问题会直接影响 WebSocket 可用性，属于连接层阻断问题。如果 Moltis 的前端、Agent 控制面或实时通信依赖 WebSocket，该修复应优先 review 和合并。

---

### 中高优先级：MCP 启动失败后无法恢复

- 关联 PR：[PR #1290](https://github.com/moltis-org/moltis/pull/1290)
- 严重程度：中高
- 类型：服务生命周期 / 健康检查 / 自动恢复
- 当前状态：已有 fix PR，待合并
- 影响范围：启用了 MCP server 的部署
- 现象：MCP 服务若在进入 `running` 前失败，可能不会进入正常重试流程
- 修复方向：将失败启动纳入 `dead` 状态，并由健康监控器进行指数退避重试

评估：  
该问题会影响 Agent 工具调用的可靠性，尤其是生产环境中 MCP 服务偶发启动失败、依赖未就绪或外部服务短暂不可达的场景。

---

### 中优先级：MCP streamable HTTP 会话丢失识别不足

- 关联 PR：[PR #1290](https://github.com/moltis-org/moltis/pull/1290)
- 严重程度：中
- 类型：会话管理 / 错误恢复
- 当前状态：已有 fix PR，待合并
- 影响范围：使用 streamable HTTP MCP transport 的场景
- 现象：带有 `Mcp-Session-Id` 的 `404` 需要被视为会话丢失，而非普通资源不存在
- 修复方向：更准确地区分 session expired / lost session 情况

评估：  
该修复有助于客户端更快地重新建立有效会话，减少长连接或长任务中的不可恢复错误。

---

## 5. 功能请求与路线图信号

今日没有新的功能请求 Issue。

不过从开放 PR 可以看到两个潜在路线图信号：

### 1. WebSocket-over-HTTP/2 支持可能是未来方向

- 关联 PR：[PR #1291](https://github.com/moltis-org/moltis/pull/1291)

该 PR 选择暂时将 TLS ALPN 限制为 HTTP/1.1，而不是直接实现 HTTP/2 WebSocket。  
这说明项目当前可能将 WebSocket-over-HTTP/2 / RFC 8441 支持视为后续能力，而非本次修复范围。

可能进入未来路线图的方向：

- 支持 RFC 8441 Extended CONNECT
- 在 HTTP/2 下稳定支持 WebSocket
- 根据 listener 能力动态配置 ALPN
- 提供 HTTP/2 与 WebSocket 支持状态的显式配置项

---

### 2. MCP 服务生命周期管理正在增强

- 关联 PR：[PR #1290](https://github.com/moltis-org/moltis/pull/1290)

MCP 启动状态、失败重试、dead 状态、健康监控、session loss 处理等改动说明 Moltis 正在强化 MCP 运行时管理能力。

可能进入下一版本或后续版本的方向：

- 更完善的 MCP server 状态机
- 更可观测的启动失败原因
- 更清晰的 MCP session 过期恢复策略
- 健康检查与重试策略可配置化
- 面向生产环境的 MCP 自动恢复机制

---

## 6. 用户反馈摘要

今日没有新的 Issue 评论或用户讨论数据，因此无法从评论中提炼真实用户反馈。

基于 PR 描述可以推断出两个隐含用户痛点：

1. **浏览器 TLS 连接下 WebSocket 不稳定**
   - 相关链接：[PR #1291](https://github.com/moltis-org/moltis/pull/1291)
   - 可能痛点：前端或浏览器客户端无法建立实时连接
   - 典型场景：使用 HTTPS 部署 Moltis，并依赖 WebSocket 进行实时通信或 Agent 控制

2. **MCP 服务失败后缺乏自动恢复**
   - 相关链接：[PR #1290](https://github.com/moltis-org/moltis/pull/1290)
   - 可能痛点：MCP server 启动失败或 session 过期后，需要人工干预或重启
   - 典型场景：长期运行的 AI Agent、工具调用服务、MCP over HTTP 集成

整体来看，当前反馈信号更偏向**运行可靠性**，而不是新功能需求。

---

## 7. 待处理积压

今日没有长期未响应的 Issue 或 PR 数据输入，因此无法判断历史积压情况。

当前需要维护者优先关注的开放 PR：

### 待 review / 合并

1. [PR #1291 — fix(tls): restrict ALPN to HTTP/1.1](https://github.com/moltis-org/moltis/pull/1291)
   - 建议优先级：高
   - 原因：直接影响 TLS 环境下 WebSocket 可用性
   - 建议关注点：
     - 是否会影响已有 HTTP/2 客户端
     - 是否需要提供配置开关
     - 是否需要在文档中说明 HTTP/2 WebSocket 暂不支持

2. [PR #1290 — fix(mcp): recover failed startups and expired sessions](https://github.com/moltis-org/moltis/pull/1290)
   - 建议优先级：中高
   - 原因：增强 MCP 服务自恢复能力，影响 Agent 工具链稳定性
   - 建议关注点：
     - dead 状态与现有状态机是否一致
     - 5 次重试上限是否适合所有部署场景
     - session loss 识别是否需要更多测试覆盖

---

## 总体健康度判断

Moltis 今日活跃度较低，但维护方向明确，两个开放 PR 均针对实际运行中的稳定性问题。  
没有新增 Issue 和 Release，说明社区输入暂时较少；但从 PR 内容看，项目正在加强核心协议层和 MCP 集成层的可靠性。  
短期内，建议维护者优先合并或评审 [PR #1291](https://github.com/moltis-org/moltis/pull/1291) 与 [PR #1290](https://github.com/moltis-org/moltis/pull/1290)，以降低 WebSocket 连接失败和 MCP 服务不可恢复的生产风险。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报（2026-10-02）

> 数据来源：过去 24 小时 GitHub Issues / PRs 活动。  
> 注：本日报中的条目链接依据提供的数据指向 `agentscope-ai/QwenPaw` 仓库。

---

## 1. 今日速览

过去 24 小时项目活跃度较高：新增或更新 Issues 7 条、PR 5 条，其中待合并 PR 3 条、已关闭 PR 2 条，无新版本发布。  
今日反馈明显集中在 **Console / Chat UI、第三方 Agent / Provider 兼容性、模型发现与参数适配、测试稳定性** 等方向，说明近期版本迭代后用户开始集中暴露边界场景和回归问题。  
PR 侧主要是修复类工作，包括 E2E 测试隔离、DeepSeek 多模态输入限制、CJK Markdown 渲染边界修复，但尚未看到合并落地。  
整体来看，项目社区活跃，问题报告质量较高，但当前健康度偏“修复压力上升”：多个问题影响核心聊天、模型选择或远程访问体验，需要维护者优先分流和确认回归范围。

---

## 2. 项目进展

今日无已合并 PR；有 2 个 PR 被关闭，3 个修复类 PR 仍处于 Open 状态。

### 已关闭 / 调整中的 PR

- [PR #8069 - fix(agents): restrict deepseek formatters to image media](https://github.com/agentscope-ai/QwenPaw/pull/8069)  
  状态：Closed  
  该 PR 试图修复 DeepSeek Chat Completions API 不支持 PDF / audio content parts 的问题，避免 OpenAI formatter 默认将 `audio/*`、`application/pdf` 序列化为 DeepSeek 不接受的格式。  
  该 PR 已关闭，但同主题修复已在 [PR #8070](https://github.com/agentscope-ai/QwenPaw/pull/8070) 中继续推进，说明维护者或贡献者正在整理实现路径。

- [PR #8068 - fix(console): repair CJK emphasis boundaries in chat Markdown](https://github.com/agentscope-ai/QwenPaw/pull/8068)  
  状态：Closed，标记为 `Close-and-review-later`  
  该 PR 针对 CJK 文本中 Markdown 加粗边界解析异常问题，例如 `**没有改动任何设置。**所有内容保持不变。` 在 CommonMark 规则下可能无法按预期渲染。  
  该方向并未完全放弃，相关修复在 [PR #8067](https://github.com/agentscope-ai/QwenPaw/pull/8067) 中仍处于 Open 状态。

### 今日仍在推进的重要 PR

- [PR #8072 - fix(e2e): isolate stateful browser tests](https://github.com/agentscope-ai/QwenPaw/pull/8072)  
  状态：Open，规模：XL  
  该 PR 重点修复 E2E 测试依赖历史数据、在隔离 CI 环境中静默跳过或提前返回的问题，并覆盖 Files、Agents、Skill Pool、Heartbeat、Models、Sessions、Tools 等模块。  
  若合并，将显著提升 CI 可靠性，有助于减少 UI 回归和集成问题漏检。

- [PR #8070 - fix(agents): restrict deepseek formatters to image media](https://github.com/agentscope-ai/QwenPaw/pull/8070)  
  状态：Open，规模：M  
  延续 #8069 的 DeepSeek formatter 修复，将输入类型限制为 DeepSeek API 实际支持的 image media，避免 PDF / audio 被错误发送。  
  这是一个明确的 provider 兼容性修复，合并可能性较高。

- [PR #8067 - fix(channels): repair CJK emphasis boundaries in rendered Markdown](https://github.com/agentscope-ai/QwenPaw/pull/8067)  
  状态：Open，规模：L  
  解决 CJK 文本无空格语境下 Markdown emphasis 边界解析异常，改善中文、日文等语言用户的聊天内容可读性。  
  该修复偏 UX 质量提升，但涉及 Markdown 渲染逻辑，需要注意副作用。

---

## 3. 社区热点

今日所有 Issues 的评论数均为 1，PR 侧未提供评论数；没有高反应数条目。因此热点主要按影响面和问题质量判断。

### 核心聊天体验与会话一致性

- [Issue #8078 - 跨会话消息 chat_with_agent 被注册成独立 chat，同一 session 的对话在 UI 中分裂为多个页面](https://github.com/agentscope-ai/QwenPaw/issues/8078)  
  该问题直指 Console UI 与后端会话模型的一致性：用户预期同一 session 的对话应聚合展示，但实际被拆分成多个页面。  
  背后诉求是 **长期对话连续性、会话管理可解释性、UI 与 backend session 语义一致**。这类问题会显著影响用户对 Agent 工作流的信任感。

- [Issue #8073 - V2.2.2.beta4 Unable to access conversation page](https://github.com/agentscope-ai/QwenPaw/issues/8073)  
  用户从 V2.2.1 升级到 V2.2.2 beta4 后，Chat 页面无法打开；问题似乎只在局域网其他设备访问本地服务时出现。  
  这反映出 beta 版本在 **远程访问、前端路由、host / origin / websocket 或资源加载策略** 上可能存在回归。

### 第三方 Agent / Provider 兼容性

- [Issue #8077 - Qoder third-party agent custom models invisible/unusable, context-usage meter hidden](https://github.com/agentscope-ai/QwenPaw/issues/8077)  
  报告指出 Qoder 第三方 Agent 的自定义模型不可见或不可用，同时第三方 backend 的 context usage meter 被隐藏。  
  该问题影响模型选择、上下文预算可视化和第三方 Agent 可用性，属于插件生态 / provider 生态中的高价值反馈。

- [Issue #8074 - OpenAI provider connection test fails with 400 for gpt-6-family models](https://github.com/agentscope-ai/QwenPaw/issues/8074)  
  用户指出 `_uses_max_completion_tokens` 仅匹配 `gpt-5*` 和 `o<digit>*`，导致 gpt-6-family 模型连接测试 400。  
  背后诉求是 provider 参数适配不要硬编码过窄，应更好支持未来模型族。

### 稳定性与维护性

- [Issue #8076 - reload drain timeout expires 时应通知 room 并取消 in-flight turns](https://github.com/agentscope-ai/QwenPaw/issues/8076)  
  当前 reload 后旧实例最多等待 24 小时，超时后仅日志报错并放弃 in-flight turn，用户侧可能无感知。  
  该问题关注的是 **Agent reload 生命周期管理、任务取消语义、用户可见错误提示**，对长任务 Agent 场景很重要。

---

## 4. Bug 与稳定性

按影响范围和严重程度排序如下：

### P0 / P1：核心功能不可用或强影响主路径

1. [Issue #8073 - V2.2.2.beta4 Chat 页面在 LAN 访问时无法打开](https://github.com/agentscope-ai/QwenPaw/issues/8073)  
   - 影响：升级到 beta4 后，局域网其他设备访问本地服务时无法打开对话页面。  
   - 风险：影响远程设备访问、局域网多端使用、桌面端 / Web Console 入口体验。  
   - 当前 fix PR：未见明确关联 PR。  
   - 建议：优先确认是否为 beta4 回归，并检查前端资源路径、CORS、WebSocket、host binding、base URL / origin 校验。

2. [Issue #8078 - 同一 session 的 chat_with_agent 对话被拆成多个 UI 页面](https://github.com/agentscope-ai/QwenPaw/issues/8078)  
   - 影响：会话连续性被破坏，用户难以追踪同一 session 中的上下文。  
   - 风险：影响 Agent 对话产品的核心体验，尤其是多轮任务、跨 Agent 协作或长期会话。  
   - 当前 fix PR：未见明确关联 PR。  
   - 建议：检查 chat 注册逻辑、session ID / chat ID 映射、UI 聚合规则，以及 `chat_with_agent` 是否错误创建独立 chat entity。

### P1 / P2：Provider / 第三方 Agent 可用性问题

3. [Issue #8077 - Qoder 自定义模型不可见 / 不可用，context usage meter 隐藏](https://github.com/agentscope-ai/QwenPaw/issues/8077)  
   - 影响：Qoder 第三方 Agent 自定义模型无法正常使用，且上下文用量不可见。  
   - 风险：第三方 Agent 生态体验受损，用户无法判断模型上下文消耗。  
   - 当前 fix PR：未见明确关联 PR。  
   - 建议：检查 `harnesses.py` 是否丢失 backend / model metadata，以及前端是否对 third-party backend 误判从而隐藏 context meter。

4. [Issue #8074 - OpenAI provider 对 gpt-6-family 模型连接测试失败](https://github.com/agentscope-ai/QwenPaw/issues/8074)  
   - 影响：新模型族无法通过连接测试，阻断用户配置。  
   - 风险：随着模型命名演进，硬编码白名单会持续产生兼容性问题。  
   - 当前 fix PR：未见明确关联 PR。  
   - 建议：将 `_uses_max_completion_tokens` 从模型名前缀白名单改为能力探测、provider metadata 或更宽松的参数策略。

5. [Issue #8075 - Update bundled Codex SDK for current model discovery](https://github.com/agentscope-ai/QwenPaw/issues/8075)  
   - 类型：兼容性改进 / 依赖升级提案。  
   - 影响：旧版 `openai-codex==0.144.4` 在 macOS arm64 / Python 3.12 下模型发现不完整。  
   - 当前 fix PR：未见明确关联 PR。  
   - 建议：评估升级到 `openai-codex==0.159.3` 的兼容性，并更新 optional-dependency 测试。

### P2：运行时生命周期与可观测性

6. [Issue #8076 - reload 超时后 in-flight turns 被静默放弃](https://github.com/agentscope-ai/QwenPaw/issues/8076)  
   - 影响：配置变更触发 reload 时，旧实例后台等待任务完成；超时后仅日志记录，用户房间内没有通知，任务也未明确取消。  
   - 风险：长任务用户可能以为 Agent 仍在处理，实际请求已被丢弃。  
   - 当前 fix PR：未见明确关联 PR。  
   - 建议：超时后向 room 发送系统通知，并主动 cancel in-flight turns，保证用户可见、状态一致。

### P3：渲染与体验问题

7. [PR #8067 - CJK Markdown emphasis 边界修复](https://github.com/agentscope-ai/QwenPaw/pull/8067)  
   - 影响：中文等 CJK 文本中加粗语法可能渲染异常。  
   - 当前 fix PR：已有 Open PR。  
   - 建议：增加 CJK Markdown 快照测试，避免修复英文 CommonMark 场景时引入副作用。

---

## 5. 功能请求与路线图信号

### 插件主题扩展能力

- [Issue #8071 - Plugin-facing theme extension point](https://github.com/agentscope-ai/QwenPaw/issues/8071)  
  用户希望在 #7741 引入的 Console theme system 之上，为插件提供更细粒度的语义 token override layer。当前插件只能通过 `window.QwenPaw.chat.theme.set(pluginId, { colorPrimary })` 设置主色，无法控制更完整的主题语义。  
  该请求显示插件作者希望获得更强的 UI 集成能力，可能成为后续 Console 插件生态的重要方向。  
  从当前 PR 看，尚未有对应实现 PR，但如果项目继续强化插件体系，该需求具备路线图价值。

### Codex SDK 模型发现更新

- [Issue #8075 - Update bundled Codex SDK for current model discovery](https://github.com/agentscope-ai/QwenPaw/issues/8075)  
  虽然形式上是依赖升级提案，但本质上是模型发现能力的路线图信号：用户希望 CoPaw / QwenPaw 能及时跟进上游 SDK，以支持当前可用模型。  
  这类需求通常适合进入小版本修复，因为范围清晰、测试可控。

### Provider 适配策略从硬编码转向能力驱动

- [Issue #8074 - gpt-6-family connection test fails](https://github.com/agentscope-ai/QwenPaw/issues/8074)  
  该问题不仅是 bug，也提示 provider 层需要更弹性的模型能力判断机制。  
  如果维护者将其抽象为 metadata / capability-based provider design，后续可减少新模型发布时的紧急修复压力。

---

## 6. 用户反馈摘要

今日用户反馈呈现出几个清晰痛点：

1. **升级后核心聊天入口稳定性不足**  
   - 代表条目：[Issue #8073](https://github.com/agentscope-ai/QwenPaw/issues/8073)  
   用户从稳定版本升级到 beta 后遭遇 Chat 页面不可访问，尤其是在局域网访问场景下。这说明用户不仅在本机使用 Console，也存在多设备访问本地服务的真实场景。

2. **会话模型与 UI 展示不一致，影响长期任务理解**  
   - 代表条目：[Issue #8078](https://github.com/agentscope-ai/QwenPaw/issues/8078)  
   用户明确关注同一 session 内的对话不应被拆分。该问题反映出用户已经在使用更复杂的跨会话 / 跨 Agent 工作流，而不仅是单轮聊天。

3. **第三方 Agent 生态需要更完整的模型与上下文支持**  
   - 代表条目：[Issue #8077](https://github.com/agentscope-ai/QwenPaw/issues/8077)  
   自定义模型不可见、上下文用量隐藏，直接降低第三方 Agent 的可用性。用户希望第三方 backend 与内置 provider 获得更一致的 UI 能力。

4. **模型更新节奏要求 provider 快速适配**  
   - 代表条目：[Issue #8074](https://github.com/agentscope-ai/QwenPaw/issues/8074)、[Issue #8075](https://github.com/agentscope-ai/QwenPaw/issues/8075)  
   用户正在尝试使用较新的模型族或 SDK 版本，现有硬编码策略和依赖 pin 已开始阻碍使用。

5. **中文 / CJK 用户对渲染质量有明确诉求**  
   - 代表 PR：[PR #8067](https://github.com/agentscope-ai/QwenPaw/pull/8067)、[PR #8068](https://github.com/agentscope-ai/QwenPaw/pull/8068)  
   CJK Markdown 加粗边界问题虽非阻断性 bug，但会影响聊天内容观感，尤其是在模型频繁输出强调文本时。

---

## 7. 待处理积压

由于本次数据仅覆盖过去 24 小时，无法判断“长期未响应”的历史积压。不过，从今日新增 / 活跃条目看，以下问题值得维护者尽快分流：

### 建议优先确认与分派

- [Issue #8073 - beta4 Chat 页面 LAN 访问不可用](https://github.com/agentscope-ai/QwenPaw/issues/8073)  
  建议优先级：高。  
  原因：可能是版本回归，影响核心入口。

- [Issue #8078 - session 对话在 UI 中被拆分](https://github.com/agentscope-ai/QwenPaw/issues/8078)  
  建议优先级：高。  
  原因：影响会话一致性和 Agent 工作流体验。

- [Issue #8077 - Qoder 自定义模型不可见 / context meter 隐藏](https://github.com/agentscope-ai/QwenPaw/issues/8077)  
  建议优先级：中高。  
  原因：影响第三方 Agent 生态可用性。

- [Issue #8074 - OpenAI provider gpt-6-family 参数适配失败](https://github.com/agentscope-ai/QwenPaw/issues/8074)  
  建议优先级：中高。  
  原因：新模型兼容性问题，可能随模型更新持续扩大。

### 建议尽快 Review 的 PR

- [PR #8072 - E2E state isolation](https://github.com/agentscope-ai/QwenPaw/pull/8072)  
  建议优先级：高。  
  原因：改善测试可靠性，可间接降低 UI / Console 回归风险。

- [PR #8070 - DeepSeek formatter 限制 image media](https://github.com/agentscope-ai/QwenPaw/pull/8070)  
  建议优先级：中高。  
  原因：修复明确、范围相对集中，适合快速合并。

- [PR #8067 - CJK Markdown 渲染修复](https://github.com/agentscope-ai/QwenPaw/pull/8067)  
  建议优先级：中。  
  原因：改善 CJK 用户体验，但需重点关注 Markdown parser 兼容性测试。

---

## 项目健康度评估

- **活跃度**：高。24 小时内 7 个 Issues、5 个 PR，社区反馈和贡献均较活跃。  
- **稳定性压力**：中高。多个问题涉及 Chat 页面、session 展示、provider 连接测试、第三方 Agent 可用性。  
- **维护风险**：中。当前修复 PR 多为 Open，尚未形成合并闭环；若 beta4 相关问题扩大，可能影响用户升级信心。  
- **生态信号**：积极。用户正在深入使用第三方 Agent、自定义模型、插件主题、局域网访问等高级场景，说明项目使用面在扩大。  
- **建议重点**：优先处理 Chat / session 回归与 provider 兼容性，同时尽快合并测试隔离 PR，提升后续版本发布质量。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报｜2026-10-02

## 1. 今日速览

过去 24 小时 ZeroClaw 活跃度很高：新增/活跃 Issues 10 条，PR 更新 50 条，说明项目正处于密集修复与功能推进阶段。  
今日没有 Release，也没有已合并或关闭的 PR/Issue，当前更多表现为“问题集中暴露 + 修复方案排队评审”的状态。  
问题侧集中在 `zerocode/tui`、`gateway/api`、`runtime/daemon`、`plugins`、`config/onboarding` 等核心路径，且包含多个 S1/S2 级别问题，稳定性压力较明显。  
PR 侧则显示出强烈的下一版本准备信号：认证与授权、网关核心化、配置安全、Web 工作区、插件稳定性、MCP 测试证据等方向均有大体量改动在推进。  
整体健康度评估：**开发活跃度高，但合并吞吐偏低；短期风险集中在启动、工作目录、配置迁移、插件 Windows 行为和网关会话持久化。**

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日没有已合并/关闭的重要 PR，因此严格意义上没有代码层面的“已落地进展”。不过从 50 条待合并 PR 来看，项目正在集中推进以下方向：

### 网关与核心服务整合

- [PR #11417 feat(gateway): serve config writes, Quickstart and reload via the core](https://github.com/zeroclaw-labs/zeroclaw/pull/11417)  
  推进配置写入、Quickstart、reload 由 core 统一承载，目标是减少独立 gateway 的权限与一致性问题。该 PR 体量较大，涉及 `config`、`gateway`、`daemon`、`runtime`、`web`、`cli` 等多个模块。

- [PR #11412 feat(gateway): serve the dashboard chat socket through the core](https://github.com/zeroclaw-labs/zeroclaw/pull/11412)  
  将 Dashboard chat socket 也纳入 core 服务路径，表明 ZeroClaw 正在将用户交互与控制面统一到核心进程中，减少多服务间状态漂移。

### 认证、授权与安全边界

- [PR #11411 fix(auth): guard private SOP access and configure commits](https://github.com/zeroclaw-labs/zeroclaw/pull/11411)  
  加强私有 SOP 访问与配置提交权限控制。

- [PR #11410 fix(auth): guard cron writes and contain unscoped execution](https://github.com/zeroclaw-labs/zeroclaw/pull/11410)  
  限制 cron 写入与未限定作用域执行，降低后台任务越权风险。

- [PR #11409 fix(delegate): refuse owned background result paths](https://github.com/zeroclaw-labs/zeroclaw/pull/11409)  
  防止 delegate 工具写入被主体拥有的后台结果路径，属于权限隔离修复。

- [PR #11408 fix(sop): restrict RPC admission and guard storage effects](https://github.com/zeroclaw-labs/zeroclaw/pull/11408)  
  限制 SOP RPC 入口并保护存储副作用，是 ACP / SOP 安全链条的一部分。

这些 PR 多为 stacked PR，说明安全相关改动具有依赖链，合并时需要维护者重点关注 review 范围与回归测试。

### 配置与文件系统安全

- [PR #11413 fix(config)!: refuse relative paths in the filesystem channel](https://github.com/zeroclaw-labs/zeroclaw/pull/11413)  
  拒绝 filesystem channel 中的相对路径，带有 `!` 标记，可能存在破坏性行为变更。

- [PR #11406 fix(config): refuse macOS broad roots in the filesystem channel](https://github.com/zeroclaw-labs/zeroclaw/pull/11406)  
  限制 macOS 上过宽泛的文件系统根路径。

- [PR #11405 fix(config)!: refuse Linux broad roots in the filesystem channel](https://github.com/zeroclaw-labs/zeroclaw/pull/11405)  
  限制 Linux 上过宽泛的文件系统根路径，也带有破坏性变更标记。

这些改动显示项目正在收紧 filesystem channel 的访问面，可能影响已有配置，但有助于减少误授权和越权文件访问风险。

### 用户体验与 Web 工作区

- [PR #11414 feat(web): add workspaces for sessions and code](https://github.com/zeroclaw-labs/zeroclaw/pull/11414)  
  为 Web 增加 sessions/code 工作区，将 Home、System、搜索与运行任务体验重新组织。该 PR 风险标记为 high，体量 XL，是明显的产品体验方向更新。

- [PR #11407 fix(zerocode): render live session updates promptly under load](https://github.com/zeroclaw-labs/zeroclaw/pull/11407)  
  修复 zerocode 在高负载下 live session 更新渲染延迟问题，与 TUI 交互实时性直接相关。

### 插件与运行时稳定性

- [PR #11402 fix(plugins): discard a memory plugin's instance after a failed call](https://github.com/zeroclaw-labs/zeroclaw/pull/11402)  
  修复 Wasmtime store trap 后复用导致后续调用失败的问题，提高 memory plugin 在异常后的恢复能力。

- [PR #11421 test(runtime): add reproducible MCP memory-soak evidence](https://github.com/zeroclaw-labs/zeroclaw/pull/11421)  
  增加可复现 MCP/provider 压测证据，偏向验证历史问题与稳定性基线。

---

## 4. 社区热点

> 注：PR 数据中的评论数为 `undefined`，因此无法按实际评论数排序；以下依据 Issue 评论数、严重程度、影响范围与 PR 体量综合判断。

### 1. zerocode 启动目录回归

- [Issue #11387 `[Bug]: zerocode ignores its launch directory again and forces the agent workspace as cwd`](https://github.com/zeroclaw-labs/zeroclaw/issues/11387)  
  评论数：3，严重程度：S2  
  该问题是 #10609 的回归：用户从本地目录启动 `zerocode`，但新会话被强制切换到 agent 配置的 workspace。  
  背后诉求是：**CLI/TUI 工具必须尊重用户当前 shell 上下文**。这类回归会直接破坏开发者对“从当前项目目录开始工作”的预期。

### 2. Docker master 镜像启动失败与升级中断风险

- [Issue #11369 `[Bug]: Docker images built from master exit at startup, and an interrupted upgrade can strand the database`](https://github.com/zeroclaw-labs/zeroclaw/issues/11369)  
  评论数：1，严重程度：S1  
  问题涉及 daemon 在加载配置前锁定 data directory，随后发现配置中的 `data_dir` 不一致而拒绝启动。  
  背后诉求是：**容器镜像与升级路径必须具备原子性和可恢复性**。这属于部署级别阻塞问题，影响 CI、Docker 用户和自托管用户。

### 3. SQLite session 后端丢失逐消息时间

- [Issue #11420 `[Bug]: SQLite session backend rewrites created_at of every message on each turn`](https://github.com/zeroclaw-labs/zeroclaw/issues/11420)  
  评论数：1，严重程度：S2  
  每轮聊天后 gateway 重写整段 transcript，并把所有消息 `created_at` 改为同一时间，导致历史消息时间线失真。  
  背后诉求是：**会话审计、用户回看、调试和记忆系统需要可靠的时间元数据**。

### 4. Web 工作区与产品体验重构

- [PR #11414 `feat(web): add workspaces for sessions and code`](https://github.com/zeroclaw-labs/zeroclaw/pull/11414)  
  该 PR 体量 XL、风险 high，涉及 Home、System、搜索、session、running work 等核心交互。  
  背后信号是项目正在从“功能集合”向“面向操作流的工作台”演进。

### 5. 认证/授权链式修复

- [PR #11408](https://github.com/zeroclaw-labs/zeroclaw/pull/11408)、[PR #11409](https://github.com/zeroclaw-labs/zeroclaw/pull/11409)、[PR #11410](https://github.com/zeroclaw-labs/zeroclaw/pull/11410)、[PR #11411](https://github.com/zeroclaw-labs/zeroclaw/pull/11411)、[PR #11422](https://github.com/zeroclaw-labs/zeroclaw/pull/11422)、[PR #11423](https://github.com/zeroclaw-labs/zeroclaw/pull/11423)  
  多个 PR 组成认证、RPC、TUI identity、OIDC enrollment 的修复链。  
  背后诉求是：**在多 agent、多 channel、多工具调用场景下，需要更严格的一致身份和权限模型**。

---

## 5. Bug 与稳定性

### S1：工作流阻塞

#### Docker master 镜像启动失败，升级中断可能导致数据库滞留

- Issue：[ #11369](https://github.com/zeroclaw-labs/zeroclaw/issues/11369)  
- 组件：`config/onboarding`  
- 严重程度：S1  
- 状态：Open  
- 影响：Docker 镜像从 master 构建后启动即退出；中断升级可能使数据库停留在不可恢复或难以恢复状态。  
- 可能相关 PR：  
  - [PR #11417](https://github.com/zeroclaw-labs/zeroclaw/pull/11417) 涉及 Quickstart、reload、config writes 由 core 承载，可能改善配置写入与启动路径一致性，但数据中未明确声明直接修复该 Issue。  
- 建议优先级：最高。该问题影响部署与升级路径，应优先定位并提供修复或回滚说明。

#### zerocode “Copy” 一键复制不可用

- Issue：[ #11418](https://github.com/zeroclaw-labs/zeroclaw/issues/11418)  
- 组件：`zerocode/tui`  
- 严重程度：S1  
- 状态：Open  
- 影响：Copy 按钮无任何剪贴板效果，阻塞用户复制内容的基础工作流。  
- 已知 fix PR：未在今日数据中发现明确对应 PR。  
- 建议优先级：高。虽然看似 UI 小问题，但被标记为 S1，说明对实际使用链路影响较大。

---

### S2：行为退化 / 核心功能异常

#### zerocode 再次忽略启动目录

- Issue：[ #11387](https://github.com/zeroclaw-labs/zeroclaw/issues/11387)  
- 组件：`zerocode/tui`  
- 严重程度：S2  
- 状态：Open  
- 影响：本地启动会话不再以当前 shell 目录为 cwd，而是被强制设为 agent workspace。  
- 已知 fix PR：未发现明确对应 PR。  
- 备注：这是 #10609 的回归，回归类问题应补充测试覆盖，避免再次发生。

#### SQLite session 后端覆盖每条消息的 created_at

- Issue：[ #11420](https://github.com/zeroclaw-labs/zeroclaw/issues/11420)  
- 组件：`gateway/api`  
- 严重程度：S2  
- 状态：Open  
- 影响：聊天历史时间线丢失，影响审计、回放、调试、排序与用户体验。  
- 已知 fix PR：未发现明确对应 PR。  
- 可能相关方向：gateway 持久化与 session 模型需要改为增量写入或保留原始 timestamp。

#### MCP 嵌套对象参数在工具执行前被序列化为字符串

- Issue：[ #11371](https://github.com/zeroclaw-labs/zeroclaw/issues/11371)  
- 组件：`runtime/daemon`  
- 严重程度：S2  
- 状态：Open  
- 影响：MCP server 收到的参数结构不符合 schema，例如 `options` 从对象变成字符串，导致工具执行失败或行为异常。  
- 可能相关 PR：  
  - [PR #11421](https://github.com/zeroclaw-labs/zeroclaw/pull/11421) 增加 MCP/provider 可复现测试与 memory-soak 证据，但未明确说明修复序列化问题。  
- 建议：需要增加嵌套 JSON 参数的端到端测试。

#### Windows 上 PluginHost 锁定 plugins 目录及父目录

- Issue：[ #11359](https://github.com/zeroclaw-labs/zeroclaw/issues/11359)  
- 组件：`plugins`  
- 严重程度：S2，Windows  
- 状态：Open  
- 影响：包括 discovery-only hosts 在内的每个 PluginHost 都会固定 plugins 目录和祖先目录，可能导致删除、迁移、更新等操作失败。  
- 可能相关 PR：  
  - [PR #11402](https://github.com/zeroclaw-labs/zeroclaw/pull/11402) 是插件运行失败后的实例处理，不直接覆盖该 Windows 文件句柄问题。  
- 建议：需要区分 discovery host 与执行 host 的资源持有生命周期。

#### plugin remove 删除错误目录

- Issue：[ #11357](https://github.com/zeroclaw-labs/zeroclaw/issues/11357)  
- 组件：`plugins`  
- 严重程度：S2  
- 状态：Open  
- 影响：删除已加载插件时，删除的是 `plugins_dir/<name>`，而不是实际加载来源目录，可能误删同名无关目录。  
- 已知 fix PR：未发现明确对应 PR。  
- 建议：应以插件实例记录的 resolved path 为准，并增加误删防护测试。

---

### S3：轻微问题 / 可用性风险

#### Slack channel thread 中不再显示 “is thinking…”

- Issue：[ #11416](https://github.com/zeroclaw-labs/zeroclaw/issues/11416)  
- 组件：`channel`  
- 严重程度：S3  
- 状态：Open  
- 影响：Slack 普通 channel thread 中不再显示工作中状态，用户只能看到 👀 reaction，降低可见性和信任感。  
- 已知 fix PR：未发现明确对应 PR。  
- 背后问题：用户希望 agent 在长任务中持续提供“仍在工作”的反馈。

#### 插件 package lock 文件可被其他本地账户读取并持有

- Issue：[ #11360](https://github.com/zeroclaw-labs/zeroclaw/issues/11360)  
- 组件：`plugins`  
- 严重程度：S3  
- 状态：Open  
- 影响：其他本地账户可持有 `.zeroclaw-package-lock-v1`，导致 install/remove 失败。  
- 安全性质：主要是 availability 风险，当前摘要显示不涉及写入或删除。  
- 已知 fix PR：未发现明确对应 PR。

#### plugin migrate 未持有 package lock，可能与并发创建目标目录冲突

- Issue：[ #11358](https://github.com/zeroclaw-labs/zeroclaw/issues/11358)  
- 组件：`plugins`  
- 严重程度：S3  
- 状态：Open  
- 影响：迁移时检查 `dest.exists()` 后逐个 rename，若期间目标被创建，可能发生合并或并发冲突。  
- 已知 fix PR：未发现明确对应 PR。  
- 建议：迁移应统一纳入 package lock，并使用原子目录操作。

---

## 6. 功能请求与路线图信号

今日 Issues 中没有典型“功能请求”类 Issue，但 PR 中释放了多个路线图信号。

### 配置 secret map 可编辑

- [PR #11419 feat(config): make secret key/value maps editable in zerocode and dashboard](https://github.com/zeroclaw-labs/zeroclaw/pull/11419)  
  目标是让 MCP server `env` 等 secret key/value map 可在 zerocode 和 dashboard 中编辑。  
  这很可能进入下一版本，因为它补齐了配置 UI 与后端能力之间的断层：后端已支持存储、加密和传递，但前端/derive 逻辑无法新增不存在的 key。

### Web 工作区化

- [PR #11414 feat(web): add workspaces for sessions and code](https://github.com/zeroclaw-labs/zeroclaw/pull/11414)  
  这是明显的产品路线图信号：ZeroClaw 正在强化 Dashboard 作为日常工作入口，而不是仅作为监控面板。  
  若合并，下一版本可能重点强调 session 管理、运行任务可视化、代码工作区和全局搜索。

### Gateway/Core 统一

- [PR #11417](https://github.com/zeroclaw-labs/zeroclaw/pull/11417)  
- [PR #11412](https://github.com/zeroclaw-labs/zeroclaw/pull/11412)  
  两个 PR 都指向 gateway 能力通过 core 服务承载。  
  路线图含义：项目可能在逐步减少独立 gateway 与 core 之间的权限、状态、生命周期差异，提升部署一致性。

### OIDC 与远程 TUI 身份

- [PR #11422 fix(rpc): use the config-owned key for remote TUI identities](https://github.com/zeroclaw-labs/zeroclaw/pull/11422)  
- [PR #11423 fix(oidc): preserve reserved characters in enrollment credentials](https://github.com/zeroclaw-labs/zeroclaw/pull/11423)  
  这些改动说明远程 TUI、OIDC enrollment、RPC 身份正在成为重点能力。  
  下一版本可能会强化企业/团队场景下的身份一致性和 enrollment 兼容性。

### Provider 性能与缓存优化

- [PR #11403 perf(providers): pin Codex prompt-cache affinity to the conversation](https://github.com/zeroclaw-labs/zeroclaw/pull/11403)  
  为 ChatGPT Codex backend 请求绑定 conversation identity，提高 prompt cache 命中。  
  路线图信号：ZeroClaw 正在针对具体 provider 的成本、延迟和工具循环效率做优化。

---

## 7. 用户反馈摘要

### 1. 开发者希望 TUI 尊重“从哪里启动就在哪里工作”

来自 [Issue #11387](https://github.com/zeroclaw-labs/zeroclaw/issues/11387)。  
用户痛点是本地 shell 目录被忽略，导致 agent 在错误 workspace 下工作。对 CLI/TUI 用户而言，cwd 是非常强的上下文信号；一旦被覆盖，会造成文件读取、命令执行、上下文判断全部偏移。

### 2. 自托管和 Docker 用户对启动可靠性高度敏感

来自 [Issue #11369](https://github.com/zeroclaw-labs/zeroclaw/issues/11369)。  
用户痛点不只是“启动失败”，还包括“升级中断后数据库被搁置”。这类问题会显著降低用户对 master 镜像、自动升级和数据迁移的信任。

### 3. 用户需要可信的会话历史，而不只是最终文本

来自 [Issue #11420](https://github.com/zeroclaw-labs/zeroclaw/issues/11420)。  
逐消息时间被覆盖说明当前 session persistence 更偏“整段替换”，但用户实际需要的是可审计、可回放、可排序的消息事件流。

### 4. 基础交互按钮失败会被视为工作流阻塞

来自 [Issue #11418](https://github.com/zeroclaw-labs/zeroclaw/issues/11418)。  
“Copy” 功能不可用虽然表面是小 UI bug，但在 AI 编程/助手场景中，复制代码、命令、结果是高频操作，因此被标记为 S1。

### 5. 用户希望长任务有清晰的在线/工作中反馈

来自 [Issue #11416](https://github.com/zeroclaw-labs/zeroclaw/issues/11416)。  
Slack channel thread 不显示 “is thinking…” 后，用户只能看到 👀 reaction，感知上会出现“不确定 agent 是否仍在处理”的问题。对于异步协作 agent 来说，状态反馈是信任机制的一部分。

### 6. 插件用户关注并发、Windows 文件句柄和误删风险

来自 [Issue #11357](https://github.com/zeroclaw-labs/zeroclaw/issues/11357)、[#11358](https://github.com/zeroclaw-labs/zeroclaw/issues/11358)、[#11359](https://github.com/zeroclaw-labs/zeroclaw/issues/11359)、[#11360](https://github.com/zeroclaw-labs/zeroclaw/issues/11360)。  
插件系统的用户反馈集中在文件锁、迁移、删除目标和跨平台行为上，说明插件生态开始进入更复杂的真实使用阶段，生命周期管理需要更严格。

---

## 8. 待处理积压

基于今日数据，所有列出的 Issues 与 PR 都是 2026-10-01 至 2026-10-02 创建或更新，无法判断“长期未响应”。不过仍有以下高优先级积压值得维护者尽快关注：

### 高优先级 Issue 积压

1. [Issue #11369 Docker images built from master exit at startup](https://github.com/zeroclaw-labs/zeroclaw/issues/11369)  
   S1，影响启动和升级恢复路径，应优先确认是否阻断 master 镜像使用。

2. [Issue #11418 Copy one-click feature is not working](https://github.com/zeroclaw-labs/zeroclaw/issues/11418)  
   S1，基础交互不可用，建议快速复现并给出平台/浏览器/TUI 环境判断。

3. [Issue #11387 zerocode ignores launch directory regression](https://github.com/zeroclaw-labs/zeroclaw/issues/11387)  
   S2 且为回归问题，建议补充非回归测试。

4. [Issue #11420 SQLite session backend rewrites created_at](https://github.com/zeroclaw-labs/zeroclaw/issues/11420)  
   S2，影响会话时间线可靠性，建议尽快确定数据迁移或兼容策略。

5. [Issue #11371 MCP nested object argument serialized as string](https://github.com/zeroclaw-labs/zeroclaw/issues/11371)  
   S2，影响 MCP 工具调用正确性，应加入端到端 schema 保真测试。

### 高风险 PR 积压

1. [PR #11414 Web workspaces for sessions and code](https://github.com/zeroclaw-labs/zeroclaw/pull/11414)  
   `risk:high`、`size:XL`，产品体验价值高，但需要重点 review 导航、状态管理、权限边界和旧入口兼容。

2. [PR #11417 Gateway config writes / Quickstart / reload via core](https://github.com/zeroclaw-labs/zeroclaw/pull/11417)  
   跨多个核心模块，可能与启动、配置、reload、权限模型相关，建议与 #11369 的启动问题交叉验证。

3. [PR #11412 Dashboard chat socket through core](https://github.com/zeroclaw-labs/zeroclaw/pull/11412)  
   涉及 chat socket 转译和 core 服务路径，建议重点测试 Dashboard 会话实时性与断线恢复。

4. [PR #11408](https://github.com/zeroclaw-labs/zeroclaw/pull/11408) / [#11409](https://github.com/zeroclaw-labs/zeroclaw/pull/11409) / [#11410](https://github.com/zeroclaw-labs/zeroclaw/pull/11410) / [#11411](https://github.com/zeroclaw-labs/zeroclaw/pull/11411)  
   安全授权修复链，stacked 依赖复杂，建议维护者明确 review 顺序和合并顺序，避免重复 review 大量先决提交。

5. [PR #11413](https://github.com/zeroclaw-labs/zeroclaw/pull/11413)、[#11405](https://github.com/zeroclaw-labs/zeroclaw/pull/11405)  
   带有破坏性变更标记的 config/filesystem channel 收紧，需要迁移说明和用户可见错误提示。

---

## 总体判断

ZeroClaw 今日处于高强度开发期：问题报告密集，PR 堆栈庞大，且覆盖启动、配置、权限、Web UX、插件、MCP、provider 性能等关键方向。  
短期项目健康风险主要来自 **S1/S2 Bug 未关闭、stacked PR 过多、无合并吞吐**。  
如果维护者能优先合并启动/配置/权限/会话持久化相关修复，并补充回归测试，项目有望在下一版本显著提升稳定性与企业使用可信度。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*