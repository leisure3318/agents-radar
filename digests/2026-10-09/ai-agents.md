# OpenClaw 生态日报 2026-10-09

> Issues: 9 | PRs: 44 | 覆盖项目: 13 个 | 生成时间: 2026-10-09 05:06 UTC

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
日期：2026-10-09  
仓库：github.com/openclaw/openclaw

---

## 1. 今日速览

过去 24 小时 OpenClaw 维持高强度开发节奏：Issues 更新 9 条，其中 8 条仍处于开放状态、1 条已关闭；PR 更新 44 条，其中 28 条待合并、16 条已合并或关闭。今日还发布了新版本 **v2026.9.9**，包含 **185 commits、112 pull requests、92 contributors**，说明项目仍处于快速迭代期。

从议题结构看，今日核心关注点集中在 **升级链路可靠性、Gateway 会话恢复、Code Mode 错误处理、A2A 协议行为、SQLite/worker 迁移与启动期稳定性**。PR 侧大量工作围绕将 Gateway/Agent/Session/Storage 的主线程 SQLite 操作迁移到 worker、减少重复读取、增强恢复与结算语义，显示维护团队正在系统性改善运行时稳定性与可维护性。

项目健康度总体良好：发布频繁、修复响应快、已有多个回归/稳定性 PR 进入 ready 或 proof 阶段；但升级失败、启动期恢复、SIGKILL 后会话墓碑化等 P0/P1 问题仍值得维护者优先跟进。

---

## 2. 版本发布

### v2026.9.9：openclaw 2026.9.9  
链接：<https://github.com/openclaw/openclaw/releases/tag/v2026.9.9>

本次发布包含：

- **185 commits**
- **112 pull requests**
- **92 contributors**
- Release notes 与 changelog 内容一致，文档入口指向 OpenClaw 官方文档发布页。

从今日 Issue 反馈看，v2026.9.9 发布后已经出现若干升级相关问题，尤其是从 **2026.9.8 → 2026.9.9** 的自动升级路径。

### 迁移与升级注意事项

#### 1. 自动升级可能在 package-swap 阶段卡住  
Issue：[#167540](https://github.com/openclaw/openclaw/issues/167540)

用户报告从 **2026.9.8 升级到 2026.9.9** 时，`openclaw update` / Gateway `update.run` 在 `package-swap` 阶段稳定失败，错误为：

> Package publication recovery permissions are unsafe

该问题 5/5 次复现，属于确定性失败。Issue 已关闭，说明维护侧可能已完成 triage 或给出处理路径，但日报数据中未包含最终修复说明。建议用户升级前保留当前版本可回滚环境，并关注该 Issue 的维护者回复。

#### 2. 旧版本升级链路仍有失败案例  
Issue：[#167611](https://github.com/openclaw/openclaw/issues/167611)、[#167593](https://github.com/openclaw/openclaw/issues/167593)

- Windows x64，OpenClaw **2026.9.4 → 2026.9.8** 升级失败：[#167611](https://github.com/openclaw/openclaw/issues/167611)
- Linux x64，OpenClaw **2026.9.3** npm/global install 路径失败：[#167593](https://github.com/openclaw/openclaw/issues/167593)

这些反馈表明升级系统在多平台、多安装方式下仍存在边缘失败场景。若用户处于 2026.9.3/2026.9.4/2026.9.8 等旧版本，建议先查看相关 Issue，再执行自动升级。

### 破坏性变更

当前提供的数据中未明确列出 v2026.9.9 的破坏性变更。  
但从今日 PR 标签看，存在多项标记为 `merge-risk: compatibility` 或 `security-sensitive-changed` 的改动，涉及依赖刷新、storage、sessions、diagnostics 等模块。建议维护者在 release notes 中明确说明：

- 升级器行为变化
- Gateway 启动/恢复语义变化
- Session worker/SQLite 迁移是否影响插件或扩展
- 安全边界相关行为是否需要插件作者适配

---

## 3. 项目进展

今日关闭或合并的 PR 中，重要进展主要集中在 Gateway 启动可靠性、Talk 会话状态、Browser 超时、Reply 结算、GitHub 扩展性能和 Agents Prompt Cache 等方向。

### Gateway 启动与公开聊天稳定性

#### fix(gateway): prevent public chat 503s after startup  
PR：[#167604](https://github.com/openclaw/openclaw/pull/167604)

该修复解决 Gateway 成功启动后，public chat 链接仍返回 HTTP 503 的问题。修复后，public chat 请求可以在启动完成后正确读取 session state，并返回正常的 not-found/login 响应。

影响：

- 改善公开聊天链接的可用性
- 降低启动完成后仍被错误判定为不可用的概率
- 对部署在公开访问入口的用户尤为重要

#### fix(gateway): Gateway stalls after startup recapturing plugins for model catalog updates  
PR：[#167544](https://github.com/openclaw/openclaw/pull/167544)

该 PR 修复 Gateway 启动后远程模型目录刷新再次复制并冷加载外部插件，导致 Gateway 阻塞的问题。

影响：

- 减少大型插件场景下 Gateway 启动后的卡顿
- 改善 model catalog 更新路径
- 对使用大型外部插件的用户体验提升明显

---

### Reply 与会话结算稳定性

#### fix(reply): finish buffered delivery when idle notifications fail  
PR：[#167559](https://github.com/openclaw/openclaw/pull/167559)

该修复解决 typing-idle 回调抛错或 reject 时，buffered replies 无法 finalize、dispatcher 无限等待的问题。

影响：

- idle notification 失败不再阻塞 channel settlement
- 减少回复卡死、会话无法完成的风险
- 对多渠道消息交付可靠性有直接帮助

---

### Talk 会话状态修复

#### fix(talk): native Talk consults lose session completion status and timing  
PR：[#167455](https://github.com/openclaw/openclaw/pull/167455)

该 PR 修复 native Talk consult 中会话完成状态和 timing 信息丢失的问题。此前普通 warmup turn 也可能记录：

> Terminal write owner changed before commit

并导致 Talk session row 缺失 completion status 和 timing。

影响：

- 提升 Talk 会话审计与状态追踪准确性
- 修复 session metadata 不完整问题
- 对调试、统计和用户历史记录都有正面影响

---

### Browser 管理命令超时修复

#### fix(browser): honor explicit management request timeouts  
PR：[#167252](https://github.com/openclaw/openclaw/pull/167252)

该 PR 修复 `openclaw browser --timeout 120000 tabs` 仍使用 45 秒管理预算的问题。修复后显式传入的 timeout 可以正确生效，同时更好地区分用户显式值与默认值。

影响：

- 提升 CLI 行为一致性
- 对长耗时 Browser 管理操作更友好
- 减少用户配置被静默忽略的问题

---

### GitHub 扩展性能优化

#### perf(github): overlap preview visibility and avatar reads  
PR：[#167597](https://github.com/openclaw/openclaw/pull/167597)

该 PR 优化 GitHub hover preview 加载流程，使 repository visibility 请求与匿名 avatar 下载可以重叠执行，减少一次串行网络往返。

影响：

- Issue / PR hovercard 加载更快
- 对高频浏览 GitHub 内容的用户有体验提升
- 属于低风险性能改进

---

### Agents 图像重放与 Prompt Cache 相关优化

#### perf(agents): preserve image replay prefixes between cleanup batches  
PR：[#167613](https://github.com/openclaw/openclaw/pull/167613)

该 PR 解决历史 image cleanup 在每个 follow-up turn 后修改已发送 tool result 或 user message，导致后续 prompt prefix 无法复用的问题。

影响：

- 长图像/tool session 中 prompt prefix 更稳定
- 有助于降低重复 prompt 处理成本
- 对长会话、多轮图像任务有价值

#### docs(agents): let implementers own narrow verified exceptions and invalid-data repairs  
PR：[#167599](https://github.com/openclaw/openclaw/pull/167599)

该文档改动让实现者在授权修复和落地请求下，可以自行处理已验证的窄范围例外与 invalid-data repair，减少不必要的维护者确认流程。

影响：

- 改善贡献流程效率
- 降低维护者在 routine repair 上的阻塞
- 对大型项目的自动化修复流程有帮助

---

## 4. 社区热点

> 注：提供的数据中 PR 评论数为 `undefined`，因此本节主要依据 Issue 评论数、标签严重度、影响范围和 PR 状态综合判断。

### 1. 升级失败与发布阻塞体验

#### Upgrade 2026.9.8 → 2026.9.9 stuck at package-swap  
Issue：[#167540](https://github.com/openclaw/openclaw/issues/167540)  
状态：Closed  
评论数：3  
标签：`P0`、`impact:ux-release-blocker`、`maturity:stable`

该 Issue 是今日评论最多的 Issue，直接关联 v2026.9.9 的升级体验。用户反馈升级过程在 package-swap 阶段确定性失败，但可以干净回滚到 2026.9.8。

背后诉求：

- 自动升级必须可预测、可恢复
- 出错信息需要明确解释权限风险
- Gateway `update.run` 与 CLI `openclaw update` 需要一致的失败处理与修复建议

虽然该 Issue 已关闭，但由于它触及 release blocker 级别用户体验，建议在 release notes 或升级文档中补充说明。

---

### 2. SIGKILL 后重启恢复失败

#### Restart recovery after SIGKILL aborts and tombstones the orphaned session  
Issue：[#167602](https://github.com/openclaw/openclaw/issues/167602)  
状态：Open  
评论数：2  
标签：`P1`、`impact:session-state`、`issue-rating: diamond lobster`

这是今日最值得关注的稳定性问题之一。Gateway 在 SIGKILL 后重启，虽然正确标记 orphaned main session，但后续恢复流程 abort，并将孤儿 session tombstone，导致 e2e 测试失败。

背后诉求：

- Gateway 必须能从硬杀进程中可靠恢复
- 会话状态不应因重启恢复路径失败而被过早墓碑化
- 对生产环境长期运行的 Gateway，异常断电/进程被杀后的恢复能力非常关键

目前数据中未显示明确 fix PR，但相关方向已有多个 worker/session recovery PR 正在推进，例如：

- [#167615](https://github.com/openclaw/openclaw/pull/167615) keep existing sessions readable during startup preparation
- [#167572](https://github.com/openclaw/openclaw/pull/167572) settle restart intents and update reports in workers

---

### 3. A2A 协议行为不符合预期

#### A2A task references silently start replacement tasks  
Issue：[#167592](https://github.com/openclaw/openclaw/issues/167592)  
状态：Open  
标签：`P2`、`source-repro`、`linked-pr-open`、`impact:session-state`

用户报告 A2A `SendMessage` 中包含 `message.taskId` 时，本应引用已有任务，却静默启动 replacement tasks。该问题有 source repro，且已有关联 PR 打开。

背后诉求：

- A2A 协议语义必须严格、可预测
- 任务引用不应被误解释为新任务启动
- 对多 agent 协作和跨 peer task continuation 影响较大

#### A2A push configuration requests return the wrong unsupported error  
Issue：[#167591](https://github.com/openclaw/openclaw/issues/167591)  
状态：Open  
标签：`P2`、`source-repro`、`linked-pr-open`

该 Issue 指出 A2A 对已识别的 push notification configuration methods 返回了通用 unsupported-operation `-32004`，而不是协议要求的 `-32003`。

背后诉求：

- 错误码需符合协议规范
- 客户端依赖错误码进行降级或提示
- A2A 互操作性需要更严格的 conformance 测试

---

### 4. Code Mode 错误信息与崩溃处理

#### Code Mode wait rejects with bare errors  
Issue：[#167610](https://github.com/openclaw/openclaw/issues/167610)  
状态：Open  
标签：`P2`、`needs-live-repro`

用户反馈 Code Mode `wait` 在 host 已经推进过 run 后，会返回裸错误：

- `code mode run is already being resumed.`
- `code mode run is unavailable or expired.`

这些错误缺少 actionable 信息。

#### Code Mode exec() crashes with TypeError reading 'aggregated'  
Issue：[#167609](https://github.com/openclaw/openclaw/issues/167609)  
状态：Open  
标签：`P2`、`needs-info`

当 host dispatch 返回 `internal_error` 且 output 为空时，guest script 中读取 `r.aggregated` 会触发 TypeError。

背后诉求：

- Code Mode API 需要稳定的错误对象结构
- guest script 不应因 internal_error 返回 undefined 而崩溃
- 错误提示应告诉用户下一步该如何处理

---

## 5. Bug 与稳定性

以下按严重程度和影响面排序。

### P0 / Release blocker 级别

#### 1. v2026.9.9 package-swap 升级失败  
Issue：[#167540](https://github.com/openclaw/openclaw/issues/167540)  
状态：Closed  
严重度：P0 / UX release blocker  
是否已有 fix PR：数据中未明确标出

影响：

- 阻塞自动升级
- 影响从 2026.9.8 到 2026.9.9 的发布采用
- 所幸用户报告可干净回滚，无数据丢失

建议：

- 在 release notes 中加入升级失败排查项
- 明确 package publication recovery permissions 的安全检查含义
- 如果已修复，应关联 PR 与修复版本

#### 2. Windows 2026.9.4 升级失败  
Issue：[#167611](https://github.com/openclaw/openclaw/issues/167611)  
状态：Open  
严重度：P0 / UX release blocker  
是否已有 fix PR：未看到明确关联

影响：

- Windows x64 用户从旧版本升级失败
- Node 24.16.0 环境
- 目标版本为 2026.9.8

建议：

- 收集完整 update report
- 确认是否与 v2026.9.9 package-swap 问题同源
- 给用户提供手动修复或安全重装步骤

#### 3. Linux global install 升级失败  
Issue：[#167593](https://github.com/openclaw/openclaw/issues/167593)  
状态：Open  
严重度：P0 / UX release blocker  
是否已有 fix PR：未看到明确关联

影响：

- Linux x64
- OpenClaw 2026.9.3
- npm/global install 路径失败
- 目标版本信息不完整

建议：

- 优先确认安装方式、npm 权限、全局路径和 package manager 状态
- 如果升级器无法判断 exact target，应提升错误可诊断性

---

### P1 级别

#### 4. SIGKILL 后 Gateway 重启恢复失败并 tombstone session  
Issue：[#167602](https://github.com/openclaw/openclaw/issues/167602)  
状态：Open  
严重度：P1  
是否已有 fix PR：未明确；可能与 [#167615](https://github.com/openclaw/openclaw/pull/167615)、[#167572](https://github.com/openclaw/openclaw/pull/167572) 相关

影响：

- 硬杀 Gateway 后恢复路径不可靠
- orphaned session 被错误 tombstone
- e2e 测试在 main 分支失败

建议：

- 维护者应优先复现并定位 session reconciliation 与 tombstone 条件
- 将该 e2e 纳入发布阻断测试

---

### P2 级别

#### 5. A2A task references 静默创建 replacement tasks  
Issue：[#167592](https://github.com/openclaw/openclaw/issues/167592)  
状态：Open  
严重度：P2  
是否已有 fix PR：有 `linked-pr-open` 标签，但具体 PR 未在数据中列出

影响：

- A2A 任务语义错误
- 可能导致任务状态混乱
- 对多 agent 协作影响较大

#### 6. A2A push configuration 返回错误错误码  
Issue：[#167591](https://github.com/openclaw/openclaw/issues/167591)  
状态：Open  
严重度：P2  
是否已有 fix PR：有 `linked-pr-open` 标签，但具体 PR 未在数据中列出

影响：

- 协议不一致
- 客户端无法准确区分 unsupported operation 与 unsupported push config
- 影响 A2A 互操作

#### 7. Code Mode wait 返回不可操作的裸错误  
Issue：[#167610](https://github.com/openclaw/openclaw/issues/167610)  
状态：Open  
严重度：P2  
是否已有 fix PR：无，标签显示 `no-new-fix-pr`

影响：

- 用户无法判断是否应重试、换 runId、还是忽略
- API 使用体验较差
- 需要 live repro

#### 8. Code Mode exec() 在 internal_error 后 TypeError  
Issue：[#167609](https://github.com/openclaw/openclaw/issues/167609)  
状态：Open  
严重度：P2  
是否已有 fix PR：无，标签显示 `no-new-fix-pr`

影响：

- guest script 可因 undefined result 崩溃
- 错误传播结构不稳定
- 需要补齐 defensive return shape

#### 9. deferred-plugin-migration 对 retired plugin 永不收敛  
Issue：[#167616](https://github.com/openclaw/openclaw/issues/167616)  
状态：Open  
严重度：未标注，但影响运维稳定性  
是否已有 fix PR：未看到

影响：

- `deferred-plugin-migration` 对已 retired 的 bundled plugin `webhooks` 卡在 `pending`
- `doctor --fix` 无法清除
- 可能导致迁移队列与健康检查长期报错

建议：

- Doctor 应能识别 retired plugin 且 config entry 已删除的收敛状态
- 对 migration row 增加 tombstone/retired 插件清理路径

---

## 6. 功能请求与路线图信号

今日新增内容以 Bug 和稳定性为主，明确的新功能请求不多。但从 PR 方向可以观察到几个路线图信号。

### 1. Worker 化与主线程 SQLite 减负仍是核心路线

相关 PR：

- [#167571](https://github.com/openclaw/openclaw/pull/167571) refactor(storage): reduce duplicate reads around final authority guards
- [#167547](https://github.com/openclaw/openclaw/pull/167547) improve(agents): reduce main-thread SQLite during retirement
- [#167578](https://github.com/openclaw/openclaw/pull/167578) refactor(sessions): move bundled entry mutations to the worker
- [#167572](https://github.com/openclaw/openclaw/pull/167572) fix(gateway): settle restart intents and update reports in workers
- [#167601](https://github.com/openclaw/openclaw/pull/167601) refactor(state): share remaining admitted worker writes

判断：这些改动很可能进入后续版本，因为它们直接服务于 Gateway 响应性、SQLite 写入隔离、权限 freshness 和 session durability。

### 2. 测试探针共享与 worker-boundary 测试框架化

相关 PR：

- [#167605](https://github.com/openclaw/openclaw/pull/167605) refactor: share session worker-admission test probes
- [#167541](https://github.com/openclaw/openclaw/pull/167541) refactor(tests): share worker probes in agent tests
- [#167598](https://github.com/openclaw/openclaw/pull/167598) refactor: share gateway worker-boundary test probes

判断：项目正在把 worker admission、command interception、FIFO、freshness、settlement 等测试能力抽象为共享工具。这通常意味着后续会有更多 worker 迁移，并需要统一验证基础设施。

### 3. 诊断与可观测性增强

相关 PR：

- [#167529](https://github.com/openclaw/openclaw/pull/167529) feat(diagnostics): add bundle fingerprints to skill.used spans

该 PR 为 `openclaw.skill.used` spans 添加 bundle fingerprints，用于把 skill 内容身份与 trace 中观察到的行为绑定。

判断：该功能可能进入下一版本，但目前状态为 `needs proof`，且标记 `merge-risk: security-boundary`，需要维护者重点审查隐私、安全边界和 fingerprint 泄漏风险。

### 4. 用户界面和平台体验优化

相关 PR：

- [#167607](https://github.com/openclaw/openclaw/pull/167607) fix(ui): suppress duplicate pairing actions while one is in flight
- [#167614](https://github.com/openclaw/openclaw/pull/167614) perf(macos): stop polling idle automation menus
- [#167392](https://github.com/openclaw/openclaw/pull/167392) improve(telegram): restore tool emoji prefixes in progress drafts
- [#167584](https://github.com/openclaw/openclaw/pull/167584) fix(gateway): keep generated session titles balanced

判断：这些属于用户体验 polish，若 proof 补齐，较可能快速进入后续 patch release。

---

## 7. 用户反馈摘要

### 1. 用户最不满意：升级失败阻塞自动化

相关 Issues：

- [#167540](https://github.com/openclaw/openclaw/issues/167540)
- [#167611](https://github.com/openclaw/openclaw/issues/167611)
- [#167593](https://github.com/openclaw/openclaw/issues/167593)

用户痛点：

- 自动升级失败会直接影响稳定版采用
- 错误信息偏底层，例如 package publication recovery permissions，不一定能指导用户操作
- Windows、Linux、npm/global install 等不同路径均有失败报告，说明升级器需要更强的环境诊断能力

正向反馈：

- [#167540](https://github.com/openclaw/openclaw/issues/167540) 中用户明确提到无数据丢失且可干净回滚，这说明 rollback 机制在该场景下有效。

### 2. 生产稳定性诉求：异常中断后会话必须可恢复

相关 Issue：

- [#167602](https://github.com/openclaw/openclaw/issues/167602)

用户痛点：

- SIGKILL 后恢复失败会影响真实部署场景
- session 被 tombstone 可能导致上下文丢失或无法继续
- 用户期望 Gateway 能在异常重启后继续处理新的 inbound send

### 3. 开发者体验诉求：Code Mode 错误应结构化、可操作

相关 Issues：

- [#167610](https://github.com/openclaw/openclaw/issues/167610)
- [#167609](https://github.com/openclaw/openclaw/issues/167609)

用户痛点：

- 裸字符串错误缺少恢复建议
- internal_error 后返回 undefined，导致二次 TypeError，掩盖根因
- Code Mode guest script 作者需要稳定的 result shape 和错误协议

### 4. 协议一致性诉求：A2A 行为必须严格符合规范

相关 Issues：

- [#167592](https://github.com/openclaw/openclaw/issues/167592)
- [#167591](https://github.com/openclaw/openclaw/issues/167591)

用户痛点：

- taskId 语义不清会导致 replacement task 被错误创建
- 错误码不符合协议会影响客户端兼容性
- A2A 作为 agent-to-agent 互操作层，需要更强 conformance 保证

### 5. 运维维护诉求：Doctor 应能处理 retired plugin 的迁移残留

相关 Issue：

- [#167616](https://github.com/openclaw/openclaw/issues/167616)

用户痛点：

- `doctor --fix` 无法清理卡住的 deferred migration
- retired plugin 的配置项已删除，但 migration row 仍 pending
- 用户需要一个明确、自动化、可审计的收敛路径

---

## 8. 待处理积压

以下是建议维护者优先关注的开放项。

### 高优先级积压

#### 1. SIGKILL 后重启恢复失败  
Issue：[#167602](https://github.com/openclaw/openclaw/issues/167602)  
原因：P1、main 分支 e2e 失败、影响 session-state。  
建议：优先关联或创建 fix PR，并将回归测试作为 release gate。

#### 2. Windows / Linux 升级失败  
Issues：

- [#167611](https://github.com/openclaw/openclaw/issues/167611)
- [#167593](https://github.com/openclaw/openclaw/issues/167593)

原因：均标记为 P0 / UX release blocker。  
建议：维护者需要尽快确认是否与 [#167540](https://github.com/openclaw/openclaw/issues/167540) 同源，并补充手动恢复指南。

#### 3. deferred-plugin-migration 永不收敛  
Issue：[#167616](https://github.com/openclaw/openclaw/issues/167616)  
原因：暂无评论、暂无标签，但可能造成长期健康检查噪音和迁移阻塞。  
建议：尽快 triage，确认 Doctor 是否应自动清理 retired bundled plugin 的 pending migration。

---

### 需要维护者审查或 proof 的 PR

#### 1. 大规模依赖刷新  
PR：[#167411](https://github.com/openclaw/openclaw/pull/167411)  
状态：waiting on author  
风险：`merge-risk: compatibility`、`security-sensitive-changed`、影响多个 app/channel/extension/plugin。  
建议：拆分风险域或补充兼容性验证矩阵。

#### 2. Storage 权限与最终 authority guard 重构  
PR：[#167571](https://github.com/openclaw/openclaw/pull/167571)  
状态：waiting on author  
风险：`merge-risk: compatibility`、`security-sensitive-changed`。  
建议：维护者重点审查权限 freshness、foreign-process write 可见性和 privileged effect 前置检查。

#### 3. Sessions bundled entry mutations worker 迁移  
PR：[#167578](https://github.com/openclaw/openclaw/pull/167578)  
状态：waiting on author  
风险：`security-sensitive-changed`，影响 Slack、Telegram、memory-core、codex、file-transfer 等。  
建议：补充跨渠道回归测试，尤其是 reply persistence、authority preservation、worker dispatch failure。

#### 4. Diagnostics skill bundle fingerprints  
PR：[#167529](https://github.com/openclaw/openclaw/pull/167529)  
状态：needs proof  
风险：`merge-risk: security-boundary`。  
建议：明确 fingerprint 是否可能泄露 skill 内容、路径或私有 bundle 结构。

#### 5. Telegram progress draft emoji 恢复  
PR：[#167392](https://github.com/openclaw/openclaw/pull/167392)  
状态：needs proof  
建议：补充截图与 Telegram e2e proof 后可考虑合并。

#### 6. UI duplicate pairing actions  
PR：[#167607](https://github.com/openclaw/openclaw/pull/167607)  
状态：needs proof  
建议：补充双击/并发 approve 的 UI 交互测试或录屏。

---

## 总体健康度评估

OpenClaw 今日表现出非常活跃的维护状态：发布、修复、重构和测试基础设施建设同步推进。项目工程方向清晰，正在重点解决 Gateway 主线程阻塞、SQLite worker 化、session recovery、协议一致性与诊断可观测性问题。

主要风险集中在三类：

1. **升级路径可靠性**：多个 P0 release blocker 说明安装/更新系统仍需加强。
2. **会话恢复稳定性**：SIGKILL 后恢复失败与 session tombstone 问题对生产环境影响较大。
3. **大规模 worker/SQLite 重构风险**：虽然方向正确，但涉及权限、安全边界、跨渠道状态一致性，需要严格 proof 和回归测试。

建议维护团队短期优先级：

1. 处理 [#167602](https://github.com/openclaw/openclaw/issues/167602) 的 session recovery 回归。
2. 汇总升级失败 Issues，发布 v2026.9.9 升级排障说明。
3. 给 [#167616](https://github.com/openclaw/openclaw/issues/167616) 添加标签并 triage。
4. 对 `security-sensitive-changed` 与 `merge-risk` PR 建立明确 proof checklist。
5. 将 A2A 协议错误码和 task reference 行为纳入 conformance 测试。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告  
日期：2026-10-09

---

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态呈现出明显的“两极分化”：头部项目如 **OpenClaw、Hermes Agent、CoPaw/QwenPaw、ZeroClaw、NanoBot** 仍处于高频迭代和快速修复阶段，而 PicoClaw、TinyClaw、ZeptoClaw 等项目则完全静默。  
整体技术焦点从“能调用模型、能执行工具”进一步转向 **运行时可靠性、会话恢复、成本可观测性、多 Provider 兼容、插件生态治理和多渠道接入稳定性**。  
多个项目同时暴露出升级链路、后台任务、长会话压缩、消息投递、凭证边界和多 profile 隔离等问题，说明 AI Agent 工程化复杂度正在快速上升。  
OpenClaw 依然是本组项目中最活跃、工程体系最完整的核心参照项目之一，但其高强度重构也带来了升级和 session recovery 风险。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 今日核心焦点 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 9 | 44 | **v2026.9.9** | 升级可靠性、Gateway 恢复、SQLite worker 化、A2A、Code Mode | **高活跃，健康但高风险**；工程推进强，P0/P1 稳定性需优先收敛 |
| **Hermes Agent** | 50 | 50 | **v0.21.6** | 安装更新、插件加载、Gateway 启动、凭证边界、多 profile | **极高活跃，高响应但回归压力大**；可能需要 hotfix |
| **NanoBot** | 2 | 7 | 无 | compaction 稳定性、Provider 兼容、Slack 通知、Windows UX | **良好**；compaction 成本与后台行为需重点治理 |
| **PicoClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **NanoClaw** | 0 | 2 | 无 | CI runner 治理、Docker stop 竞态 | **低到中等活跃，稳定** |
| **NullClaw** | 0 | 4 | 无 | reasoning 模型适配、CA bundle、Discord heartbeat、MCP 示例 | **稳定，中低活跃**；PR 质量方向清晰但未合并 |
| **IronClaw** | 2 | 0 | 无 | Sendblue iMessage/SMS 提案、benchmark failure taxonomy | **低活跃，质量观察期** |
| **LobsterAI** | 0 | 3 | 无 | Cowork 用量追踪、Library 稳定性、Office artifact UX | **健康维护状态**；偏产品化和可观测性打磨 |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **Moltis** | 1 | 0 | 无 | A2Agent Provider 接入验证 | **低活跃但稳定**；有生态集成信号 |
| **CoPaw / QwenPaw** | 12 | 14 | 无 | Console 稳定性、聊天历史、HTTP Origin、图片处理、低特效模式 | **高活跃，响应积极**；待合并 PR 较多 |
| **ZeptoClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **ZeroClaw** | 7 | 11 | 无 | ZeroCode 交互可靠性、steering、配置泄漏、Provider 兼容 | **高活跃，修复导向强**；PR 尚未落地 |
| **Hermes / OpenClaw / CoPaw / ZeroClaw 合计** | 78 | 119 | 2 个 Release | 运行时、更新、会话、Provider、UX 稳定性 | 构成今日生态主活跃层 |

---

## 3. OpenClaw 在生态中的定位

### 3.1 生态定位

OpenClaw 是当前样本中最具“平台型 Agent Runtime”特征的项目之一。它不只是聊天助手或单一桌面应用，而是在 Gateway、Agent、Session、Storage、A2A、Code Mode、插件和多渠道运行时之间构建较完整的基础设施层。

与 NanoBot、ZeroClaw、CoPaw 等偏产品或交互层快速修复不同，OpenClaw 今日的大量 PR 集中在：

- Gateway 启动与恢复；
- SQLite 主线程迁移到 worker；
- session durability；
- reply settlement；
- A2A 协议语义；
- storage authority guard；
- diagnostics tracing；
- 插件与模型目录加载路径。

这说明 OpenClaw 的核心竞争力在于 **复杂运行时治理能力**，而不仅是模型调用能力。

### 3.2 与同类项目相比的优势

| 维度 | OpenClaw 表现 | 对比判断 |
|---|---|---|
| 社区活跃度 | 9 Issues、44 PR、发布 v2026.9.9 | 仅次于 Hermes Agent，显著高于 NanoBot、ZeroClaw、CoPaw |
| 发布节奏 | 今日发布 v2026.9.9，185 commits、112 PR、92 contributors | 发布密度高，社区参与面广 |
| 架构深度 | Gateway / Session / Storage / Worker / A2A / Code Mode 全栈推进 | 比多数项目更偏基础设施和 runtime |
| 稳定性挑战 | 多个 P0/P1：升级失败、SIGKILL recovery、session tombstone | 活跃度高但风险同步上升 |
| 工程治理 | 大量 proof、merge-risk、security-sensitive 标签 | 审查体系成熟，但 review 压力大 |

### 3.3 技术路线差异

OpenClaw 今日最突出的路线是 **worker 化和运行时可靠性重构**。  
它正在把 Gateway、Session、Storage 相关 SQLite 操作从主线程迁移到 worker，并强化 session recovery、restart intent settlement 和 authority freshness。

相比之下：

- **Hermes Agent** 更聚焦多平台安装、插件发现、凭证和 Cloud/Desktop 分发；
- **NanoBot** 更聚焦 provider 兼容和 compaction 成本治理；
- **CoPaw/QwenPaw** 更聚焦 Console、Skill Hub、企业 IM、多模态输入和桌面 UX；
- **ZeroClaw** 更聚焦 Code/Agent 交互界面中的 steering、transcript 和 daemon 语义；
- **LobsterAI** 更偏产品化 AI 助手与 Office artifact 编辑体验。

因此，OpenClaw 的定位更接近 **Agent 基础设施内核 / 多渠道运行时平台**。

---

## 4. 共同关注的技术方向

### 4.1 更新与安装链路可靠性

涉及项目：

- **OpenClaw**：v2026.9.9 package-swap 升级失败；Windows / Linux 旧版本升级失败。
- **Hermes Agent**：Desktop Update exit code 2、update lock 冲突、plugin bootstrap 依赖缺失、global hooks 影响更新。
- **NanoClaw**：CI runner namespace 治理，间接提升发布和构建可控性。

共同诉求：

- 自动升级必须可回滚、可诊断；
- GUI update 和 CLI update 行为需要一致；
- 错误信息不能只暴露底层权限或锁冲突；
- 每个 release 需要可回退、可 bisect 的固定版本路径。

对开发者启示：  
Agent 产品一旦进入桌面、Docker、Cloud、多平台分发，更新系统本身会成为核心产品能力，而不是附属脚本。

---

### 4.2 会话恢复、长会话与上下文治理

涉及项目：

- **OpenClaw**：SIGKILL 后 Gateway recovery abort 并 tombstone orphaned session。
- **NanoBot**：空会话触发 compaction 循环，自动压缩成本失控。
- **CoPaw/QwenPaw**：聊天历史疑似与上下文窗口绑定，引发用户强烈不满；大上下文模型下 microcompaction 不触发。
- **ZeroClaw**：ZeroCode transcript 增加时间线、ask_user/poll 清除后 daemon 超时。
- **LobsterAI**：Cowork per-turn usage、Trace ID、Token 和缓存命中率展示。

共同诉求：

- 用户历史记录必须和模型上下文窗口解耦；
- 压缩策略需要基于成本、轮数、token 数和用户配置，而不只是模型最大 context size；
- 长会话需要审计、回放、时间线和 trace；
- 自动后台任务必须有明确触发条件、停止条件和成本保护。

对开发者启示：  
未来 Agent 的核心竞争点不是“支持 200K context”，而是 **如何治理长会话成本、可靠性和用户信任**。

---

### 4.3 Provider / 模型网关兼容性

涉及项目：

- **NanoBot**：OpenCode Go muse-spark 需要 Responses API；DeepSeek web_search tool 与 Chat Completions 不兼容；inline image batch 处理优化。
- **Hermes Agent**：Anthropic token 分类、Bedrock bearer-token aux Claude、Baseten provider、Solstice bundled plugin 依赖。
- **ZeroClaw**：OpenAI-compatible model list 中 pricing schema 不一致；cost ledger 丢失 provider total_tokens。
- **NullClaw**：reasoning_mode 适配 reasoning-only responses。
- **Moltis**：A2Agent 希望验证 OpenAI / Anthropic compatible gateway 接入。
- **OpenClaw**：模型目录刷新、plugin recapture、A2A 协议一致性。

共同诉求：

- OpenAI-compatible 不是事实上的完全兼容；
- Responses API、Chat Completions、Anthropic Messages、Bedrock Converse 等 wire format 差异需要显式能力路由；
- reasoning tokens、hidden tokens、pricing schema 会影响成本账本；
- Provider onboarding 需要文档、preset 和 conformance tests。

对开发者启示：  
“兼容 OpenAI API”只能作为最低假设，生产级 Agent 需要 provider capability registry、schema 容错和 usage reconciliation。

---

### 4.4 多渠道消息投递与企业集成

涉及项目：

- **OpenClaw**：public chat 503 修复、reply settlement、A2A task 语义。
- **Hermes Agent**：Discord 429 Retry-After、cron outbound delivery、WhatsApp secondary profile。
- **NanoBot**：Slack compaction notice 使用 chat.update 原地更新。
- **CoPaw/QwenPaw**：飞书 rich-text 图文混发中图片被静默丢弃。
- **ZeroClaw**：Telegram 429 retry_after 被忽略。
- **IronClaw**：Sendblue iMessage/SMS extension 提案。
- **NullClaw**：Discord heartbeat wall-clock 调度。

共同诉求：

- Channel connector 需要遵守平台限流语义；
- 入站媒体不能静默丢弃；
- 通知消息要减少噪音；
- 企业 IM、短信、Discord、Slack、Telegram、Feishu 等渠道都需要完整的生命周期和错误语义。

对开发者启示：  
个人 AI 助手正在从 Web chat 走向多渠道常驻服务，channel reliability 会变成 Agent 产品成熟度的重要标志。

---

### 4.5 安全边界、凭证与 profile isolation

涉及项目：

- **Hermes Agent**：Anthropic suppressed source、Claude Code credential fallback、unscoped secret、multi-profile ownership。
- **OpenClaw**：storage authority guard、security-sensitive worker 迁移、diagnostics fingerprints。
- **ZeroClaw**：plugin egress refusal 日志去重、runtime exception 文档化。
- **NanoClaw**：CI runner namespace 收敛，供应链控制。
- **CoPaw/QwenPaw**：Skill Hub 插件化，需要插件 API 和安全边界审查。

共同诉求：

- 凭证来源必须显式、可禁用、可审计；
- 多 profile / 多租户场景必须严格 scope secret；
- 插件系统需要 egress 控制、market provider 边界和日志治理；
- diagnostics fingerprint 不能泄露私有 bundle 信息。

对开发者启示：  
Agent 生态的插件化和多 profile 化正在推动安全模型从“单用户本地信任”转向“最小权限和可审计边界”。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 / 产品特征 |
|---|---|---|---|
| **OpenClaw** | Agent runtime、Gateway、Session、A2A、Code Mode、Storage worker 化 | 高级开发者、平台型部署者、插件作者 | 基础设施型，多模块运行时，强调 durability 和协议语义 |
| **Hermes Agent** | Desktop / CLI / Cloud / Docker 分发、多 provider、多 profile、插件生态 | 桌面用户、云部署用户、企业自动化用户 | 产品 + 平台混合型，快速迭代，安装更新链路复杂 |
| **NanoBot** | 多 Provider 兼容、compaction、Slack、Windows UX | 个人助手用户、轻量团队用户 | 更轻量的助手框架，重点在成本控制和 provider routing |
| **CoPaw/QwenPaw** | Console、Skill Hub、企业 IM、多模态、评测工作流 | 中文 / 企业 / 桌面端用户、Skill 生态用户 | 产品体验驱动，前端 Console 和插件市场是重点 |
| **ZeroClaw** | ZeroCode、steering、daemon 交互、transcript、runtime config | Agent 开发者、代码交互用户 | 强调交互语义和可审计开发环境 |
| **LobsterAI** | Cowork、Office artifact、Library、本地内容编辑 | 办公生产力用户、AI 协作用户 | 产品化程度高，重视用量透明和文档 / PPT 编辑体验 |
| **NullClaw** | reasoning 模型适配、MCP 示例、Discord、极简环境部署 | 轻量部署者、模型兼容性用户 | 小而稳，偏底层兼容和受限环境可运行性 |
| **NanoClaw** | Docker driver、CI 治理 | 容器化 Agent 用户、维护者 | 当前活跃度低，偏工程基础设施维护 |
| **IronClaw** | benchmark 质量观察、通信扩展提案 | 评测用户、个人通信集成用户 | 需求收集和质量分析阶段 |
| **Moltis** | Provider setup、第三方模型网关接入 | Provider 生态方、集成开发者 | 生态接入导向，低活跃但有外部集成吸引力 |
| **PicoClaw / TinyClaw / ZeptoClaw** | 今日无活动 | 不明确 | 静默状态，短期技术信号不足 |

---

## 6. 社区热度与成熟度

### 6.1 快速迭代层

代表项目：

- **Hermes Agent**
- **OpenClaw**
- **CoPaw/QwenPaw**
- **ZeroClaw**
- **NanoBot**

特征：

- Issue / PR 密度高；
- 大量 bug 与 feature 同时推进；
- 回归和 hotfix 压力明显；
- 生态扩展、插件、provider、channel 同时增长。

其中：

- Hermes Agent：活跃度最高，但 v0.21.6 后回归集中。
- OpenClaw：工程重构最系统，但升级和 session recovery 风险突出。
- CoPaw/QwenPaw：用户反馈强，前端和企业集成问题密集。
- ZeroClaw：修复方向集中，ZeroCode 交互语义正在快速成熟。
- NanoBot：活跃度中高，compaction 成本治理是核心风险。

### 6.2 质量巩固层

代表项目：

- **LobsterAI**
- **NullClaw**
- **NanoClaw**

特征：

- PR 数不多，但方向明确；
- 以稳定性、可观测性、部署兼容、产品细节为主；
- 外部社区噪音较低。

LobsterAI 今日表现最像成熟产品打磨：用量透明、Library 生命周期、Office UX 都是典型产品化阶段议题。  
NullClaw 则偏技术兼容性巩固，例如 reasoning 模型、CA bundle、Discord heartbeat。  
NanoClaw 则主要在容器生命周期和 CI 治理。

### 6.3 需求观察 / 低活跃层

代表项目：

- **IronClaw**
- **Moltis**

特征：

- Issue 数少，无 PR；
- 重点在新需求或质量报告；
- 尚未进入实现周期。

IronClaw 的 Sendblue iMessage/SMS 提案体现个人通信渠道趋势。  
Moltis 的 A2Agent provider 请求体现第三方模型网关接入需求。

### 6.4 静默层

代表项目：

- **PicoClaw**
- **TinyClaw**
- **ZeptoClaw**

过去 24 小时无活动，当前无法判断技术进展。

---

## 7. 值得关注的趋势信号

### 趋势 1：Agent Runtime 正从“功能可用”转向“异常可恢复”

OpenClaw 的 SIGKILL recovery、Hermes 的 Gateway 启动回归、ZeroClaw 的 daemon busy / elicitation 处理都指向同一件事：  
生产级 Agent 必须处理进程崩溃、连接中断、session orphan、工具挂起和消息重放。

开发者参考价值：

- session state machine 要显式建模；
- tombstone、orphan、restart intent、settlement 需要可测试；
- 硬杀进程和断电恢复应纳入 release gate。

---

### 趋势 2：长上下文不等于低成本，compaction 正成为核心能力

NanoBot 的空会话 compaction 循环、CoPaw 的大上下文压缩不触发、OpenClaw 的 prompt cache / image replay prefix 优化、LobsterAI 的 per-turn usage 追踪，都说明上下文管理正在成为核心基础设施。

开发者参考价值：

- compaction 需要成本保护、触发解释和用户可控；
- 历史记录、摘要、模型上下文必须分层；
- token、cache hit、reasoning tokens 和 trace 应对用户可见或至少可诊断。

---

### 趋势 3：OpenAI-compatible Provider 生态进入“兼容性碎片化”阶段

NanoBot、ZeroClaw、NullClaw、Moltis、Hermes Agent 都出现 provider wire format、pricing、reasoning_content、Responses API、credential source 等问题。

开发者参考价值：

- 不要假设所有 OpenAI-compatible endpoint 都遵守同一 schema；
- provider registry 应记录 capabilities，而不是只记录 base URL；
- usage ledger 应优先保留 provider 原始 usage 字段；
- reasoning 模型需要独立响应处理路径。

---

### 趋势 4：多渠道个人助手正在成为主流使用场景

Slack、Telegram、Discord、Feishu、WhatsApp、iMessage/SMS、public chat 都在今日动态中出现。  
这说明用户期望 AI 助手常驻在日常通信渠道，而不是单独打开一个 Web App。

开发者参考价值：

- channel connector 需要平台级限流、媒体、重试、幂等和错误码处理；
- 富文本和图片不能静默丢弃；
- 通知类消息要支持更新、折叠或降噪；
- 不同 channel 的 auth、profile 和 secret scope 要隔离。

---

### 趋势 5：插件化带来生态扩展，也带来安全和供应链压力

OpenClaw、Hermes Agent、CoPaw、ZeroClaw、NanoClaw 都涉及插件、runner、egress、catalog、skill hub 或 provider plugin 问题。

开发者参考价值：

- 插件发现阶段不能依赖完整运行时环境；
- 插件 egress 要可审计但避免日志风暴；
- market provider、skill hub、plugin catalog 需要权限模型；
- CI runner 和构建环境本身是供应链安全的一部分。

---

### 趋势 6：桌面端和自部署场景仍有大量 Web 平台边界问题

CoPaw 的 HTTP Origin 下 `crypto.randomUUID()` 和 Clipboard 失效、Hermes 的 Desktop update、NullClaw 的 minimal-rootfs CA bundle、NanoBot 的 Windows workspace picker，都说明自部署和桌面端远未“天然稳定”。

开发者参考价值：

- LAN / Tailscale / HTTP Origin 应作为一等测试场景；
- Desktop update、CA bundle、系统文件选择器、系统 Python、环境变量污染都需要跨平台矩阵；
- Web 安全上下文限制会直接影响桌面和自部署体验。

---

## 总结判断

今日生态的主线非常明确：**个人 AI 助手和自主智能体正在从 Demo 型工具转向长期运行、可审计、可恢复、可扩展的生产级系统**。  
OpenClaw 和 Hermes Agent 代表高复杂度平台型路线，CoPaw/QwenPaw 和 LobsterAI 更接近产品体验驱动路线，ZeroClaw 和 NullClaw 则在交互语义与兼容性细节上持续打磨。  
对技术决策者而言，当前最值得投入的不是单点模型能力，而是 **升级可靠性、session durability、provider abstraction、成本可观测性、多渠道连接器和插件安全边界**。这些能力将决定一个 AI Agent 项目能否从个人试用走向稳定部署。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报｜2026-10-09

## 1. 今日速览

过去 24 小时 NanoBot 活跃度较高：共有 **2 条 Issue 更新**、**7 条 PR 更新**，其中 **4 个 PR 仍待合并**、**3 个 PR 已关闭/合并**。  
今日工作重点集中在 **上下文压缩 compaction 稳定性**、**Provider 兼容性修复**、**Slack 通知行为优化** 和 **Windows 工作区选择体验**。  
从数据看，项目维护节奏正常，社区反馈较快进入 PR 修复阶段，尤其是 provider 与自动压缩相关问题已有多个修复或改进提案。  
不过，compaction 相关问题仍是近期风险点：既有用户反馈空会话触发压缩循环，也有独立压缩模型配置与 Slack 通知更新的 PR，说明该模块正在持续调整中。

---

## 2. 项目进展

### 已关闭 / 已合并的重要 PR

#### [#6108 fix(commands): keep slash-prefixed paths in normal chat](https://github.com/HKUDS/nanobot/pull/6108)  
**状态：CLOSED**  
**作者：Re-bin**

该 PR 修复了普通聊天中以 `/` 开头的路径被误识别为命令的问题，例如 `/tmp`、`/home/user/project` 会被 gateway 当作未知命令拒绝。

**影响：**
- 改善了 Linux/macOS 用户发送绝对路径时的体验。
- 避免 agent 运行期间用户无法发送路径内容。
- 对开发者、终端用户和代码助手场景均有直接价值。

这是一个偏基础交互层的修复，有助于减少误判命令带来的使用摩擦。

---

#### [#6107 fix(providers): prepare inline image batches and recover Codex transport](https://github.com/HKUDS/nanobot/pull/6107)  
**状态：CLOSED**  
**作者：chengyongru**

该 PR 针对大批量 inline image 处理导致首个响应事件延迟、进而引发 transport timeout 的问题进行了优化。

**主要变化：**
- 对 Responses、Chat Completions、Anthropic Messages、Bedrock Converse 等路径中的图片进行统一准备。
- 将图片编码目标控制在共享的 1MB 附近。
- 涉及 Codex、xAI OAuth、Copilot、tool image 等多个 provider/场景。

**影响：**
- 提升多模态请求稳定性。
- 降低大图或多图输入导致 provider 超时的概率。
- 对使用图片、工具截图、视觉上下文的用户场景较关键。

这是今日稳定性层面的重要推进。

---

#### [#6105 fix(providers): use the Responses API for OpenCode Go muse-spark models](https://github.com/HKUDS/nanobot/pull/6105)  
**状态：CLOSED**  
**作者：selfucker**

该 PR 修复 OpenCode Go gateway 中 muse-spark contributor models 调用失败的问题。此前这些模型只支持 OpenAI Responses wire format，但 NanoBot 走 `/chat/completions` 路径时会触发 500，最终表现为 “503 endpoint is unavailable”。

**主要变化：**
- 将相关 muse-spark 模型注册到 `responses_models`。
- 让系统自动选择 Responses API 路径。

**影响：**
- 修复特定 provider/model 的不可用问题。
- 提升 OpenCode Go 兼容性。
- 减少用户误以为 provider 服务不可用的情况。

---

## 3. 社区热点

### 热点 1：[Issue #6106 - Compaction firing even on completely empty session + on itself without stopping](https://github.com/HKUDS/nanobot/issues/6106)  
**状态：CLOSED**  
**作者：SPHINXUSS**  
**评论数：4**

这是今日评论最多的 Issue。用户反馈在全新安装 NanoBot 后，即使会话为空，系统仍然在夜间反复触发 compaction，导致 API 被异常频繁调用。

**背后诉求：**
- 用户希望自动压缩机制具备更强的空会话判断。
- 空闲 session 不应触发高频 LLM 调用。
- 自动后台任务需要更明确的停止条件与资源保护机制。

**重要性分析：**
该问题直接关联成本控制和系统可信度。对于使用付费 API 的用户而言，空会话触发自动压缩会导致非预期费用，是较高优先级的稳定性与产品体验问题。

---

### 热点 2：[PR #6110 - fix(slack): replace compaction outcome notices in place with chat.update](https://github.com/HKUDS/nanobot/pull/6110)  
**状态：OPEN**  
**作者：akushonkamen**

该 PR 继续围绕 compaction 用户体验展开，目标是在 Slack 中使用 `chat.update` 原地替换 compaction 结果通知，而不是不断新增消息。

**背后诉求：**
- 降低 Slack 频道噪音。
- 改善自动 compaction 通知的可读性。
- 与此前已进入 main 的自动 compaction notice 默认静默行为形成互补。

**重要性分析：**
虽然不是核心推理能力改动，但对 Slack 集成用户来说，这类通知行为直接影响日常可用性。该 PR 也显示维护者正在持续收敛 compaction 在不同 channel 下的体验问题。

---

### 热点 3：[PR #6109 - feat(agent): optional compactModelPreset for dedicated context-compaction provider](https://github.com/HKUDS/nanobot/pull/6109)  
**状态：OPEN**  
**作者：vexter0944**

该 PR 提议为 context compaction 增加独立的 `compactModelPreset`，允许用户为自动压缩、`/compact`、`/new` archive 等场景指定专门的模型或 provider。

**背后诉求：**
- 将主对话模型与压缩模型解耦。
- 用更便宜或更适合摘要的模型执行 compaction。
- 降低长期会话成本。
- 增强企业或高级用户对 provider 路由的控制能力。

该 PR 与 Issue #6106 指向同一核心主题：compaction 的成本、可控性与稳定性正在成为社区关注重点。

---

## 4. Bug 与稳定性

### 高优先级

#### [Issue #6106 - 空会话触发 compaction 循环](https://github.com/HKUDS/nanobot/issues/6106)  
**状态：CLOSED**  
**严重程度：高**  
**是否已有 fix PR：未在数据中明确关联**

用户报告全新安装后，在清空会话且无人操作的情况下，compaction 仍然持续触发，造成 API 调用异常增加。

**风险：**
- 非预期 API 成本。
- 后台任务无限循环。
- 用户对自动机制失去信任。

**建议关注：**
- 检查空会话、无新增消息、compaction 自身输出是否再次触发 compaction。
- 增加防抖、最大重试次数、空内容跳过条件。
- 在 UI 或日志中明确显示自动 compaction 触发原因。

---

### 中高优先级

#### [PR #6107 - 大批量 inline image 导致 provider transport timeout](https://github.com/HKUDS/nanobot/pull/6107)  
**状态：CLOSED**  
**严重程度：中高**  
**是否已有 fix PR：是，#6107**

该问题影响多模态输入和包含大量图片的请求链路。修复通过统一准备图片批次并控制编码体积，减少首响应延迟和 transport timeout。

---

#### [PR #6105 - OpenCode Go muse-spark 模型调用失败](https://github.com/HKUDS/nanobot/pull/6105)  
**状态：CLOSED**  
**严重程度：中**  
**是否已有 fix PR：是，#6105**

此前 NanoBot 使用不兼容的 `/chat/completions` 路径调用 muse-spark 模型，导致 500/503 错误。该 PR 将相关模型转向 Responses API。

---

#### [PR #6104 - DeepSeek web_search hosted tool 在 Chat Completions 请求中不兼容](https://github.com/HKUDS/nanobot/pull/6104)  
**状态：OPEN**  
**严重程度：中**  
**是否已有 fix PR：是，#6104**

该 PR 修复 DeepSeek WebUI toggle 将 `{"type": "web_search"}` 写入 `extra_body.tools` 后，在非 Responses API 路径下造成不兼容的问题。

**影响：**
- 防止 Chat Completions 模型收到不支持的 hosted web_search tool。
- 改善 DeepSeek provider 配置的鲁棒性。

---

#### [PR #6110 - Slack compaction 通知重复/噪音问题](https://github.com/HKUDS/nanobot/pull/6110)  
**状态：OPEN**  
**严重程度：中**  
**是否已有 fix PR：是，#6110**

虽然不是崩溃类 bug，但会影响 Slack channel 中的用户体验。使用 `chat.update` 原地更新可以避免 compaction 通知刷屏。

---

### 低到中优先级

#### [PR #6108 - slash-prefixed path 被误判为命令](https://github.com/HKUDS/nanobot/pull/6108)  
**状态：CLOSED**  
**严重程度：中**  
**是否已有 fix PR：是，#6108**

对代码开发场景影响明显，尤其是用户发送 Unix 路径时。修复后普通聊天中的 `/tmp`、`/home/user/project` 等路径应不再被误判为命令。

---

## 5. 功能请求与路线图信号

### [Issue #6111 - Windows 工作区选择器增强](https://github.com/HKUDS/nanobot/issues/6111)  
**状态：OPEN**  
**作者：KailBug**

用户请求增强 redesigned workspace picker 在 Windows 上的能力，包括：
- 驱动器列表。
- 文件夹创建。
- 常用位置快捷入口。

**路线图信号：**
该需求表明 NanoBot 的桌面/本地工作流体验正在受到关注，尤其是 Windows 用户对 workspace picker 的期望接近原生文件管理器体验。

**可能进入下一版本的概率：中等**
- 这是明确的 UX 增强请求。
- 目前尚未看到对应 PR。
- 若维护者近期聚焦桌面端体验，该功能有较高纳入可能。

---

### [PR #6109 - dedicated context-compaction provider / compactModelPreset](https://github.com/HKUDS/nanobot/pull/6109)  
**状态：OPEN**

该 PR 提供了一个重要路线图信号：NanoBot 可能进一步支持更细粒度的模型路由，让不同任务使用不同 provider/model。

**潜在价值：**
- 主对话模型可保持高质量。
- compaction 可使用低成本模型。
- 企业用户可基于成本、隐私、延迟策略拆分 provider。
- 与自动压缩成本控制诉求高度契合。

**可能进入下一版本的概率：较高**
- PR 已经存在。
- 与当前多个 compaction 问题直接相关。
- 属于低侵入但高价值的配置增强。

---

### [PR #6103 - CoreWeave Inference custom provider example](https://github.com/HKUDS/nanobot/pull/6103)  
**状态：OPEN**

该 PR 增加 CoreWeave Inference 自定义 OpenAI-compatible endpoint 示例，涉及 base URL、Forge/W&B credential source、环境变量引用和模型 preset。

**路线图信号：**
NanoBot 正在继续扩展或完善 provider 生态，尤其是对 OpenAI-compatible endpoint 的配置文档支持。

**可能进入下一版本的概率：较高**
- 文档型 PR 风险较低。
- 对 provider 接入生态有帮助。
- 不涉及核心行为变更。

---

## 6. 用户反馈摘要

### 成本与后台自动行为可控性成为主要痛点

来自 [Issue #6106](https://github.com/HKUDS/nanobot/issues/6106) 的用户反馈显示，用户对自动 compaction 机制最敏感的是 **非预期 API 调用**。  
该用户在“全新安装、空会话、无人操作”的情况下观察到 API 被异常调用，说明自动后台任务需要更强的透明度和保护机制。

**用户痛点：**
- 不知道为什么后台会触发 API。
- 空会话不应产生成本。
- 自动任务如果循环执行，会带来费用风险。
- 用户希望默认行为更保守。

---

### Windows 本地工作流体验仍有提升空间

来自 [Issue #6111](https://github.com/HKUDS/nanobot/issues/6111) 的反馈显示，Windows 用户希望 workspace picker 更贴近系统文件选择器。

**用户痛点：**
- 缺少驱动器列表会影响快速定位路径。
- 缺少新建文件夹能力会中断工作流。
- 缺少常用位置快捷入口会降低本地项目选择效率。

这类反馈说明 NanoBot 的使用场景已不只是浏览器聊天，而是更深地嵌入本地开发与文件工作流。

---

### Provider 兼容性仍是高频维护区域

多个 PR 指向 provider 层面的兼容性问题：
- [#6105](https://github.com/HKUDS/nanobot/pull/6105)：OpenCode Go muse-spark 需要 Responses API。
- [#6104](https://github.com/HKUDS/nanobot/pull/6104)：DeepSeek web_search tool 在 Chat Completions 路径下需剥离。
- [#6107](https://github.com/HKUDS/nanobot/pull/6107)：多 provider 图片批处理与 transport timeout。

**用户侧感受：**
- 同一 provider 的不同模型可能有不同 wire format。
- WebUI toggle 与底层 provider 能力之间需要更严格的能力匹配。
- 多模态请求稳定性对高级用户很重要。

---

## 7. 待处理积压

当前数据窗口仅覆盖过去 24 小时，未提供长期未响应 Issue/PR 信息，因此无法判断真正的长期积压项。不过，从今日仍处于 OPEN 状态的事项看，以下内容建议维护者优先关注：

### 高优先级待处理

#### [#6110 fix(slack): replace compaction outcome notices in place with chat.update](https://github.com/HKUDS/nanobot/pull/6110)  
Compaction 通知体验修复，建议结合近期 compaction 问题一起评审，避免 Slack 用户继续受到通知噪音影响。

#### [#6109 feat(agent): optional compactModelPreset for dedicated context-compaction provider](https://github.com/HKUDS/nanobot/pull/6109)  
该 PR 与成本控制、provider 路由和 compaction 可控性高度相关。若实现质量稳定，建议尽快评审。

#### [#6104 fix(providers): strip hosted web_search tools from Chat Completions requests](https://github.com/HKUDS/nanobot/pull/6104)  
DeepSeek web_search 配置兼容性问题已有明确修复方向，建议优先合并以减少 provider 报错。

---

### 中优先级待处理

#### [#6111 Workspace picker: drive list, folder creation, and common location shortcuts on Windows](https://github.com/HKUDS/nanobot/issues/6111)  
Windows workspace picker 体验增强请求。建议产品/维护者确认是否纳入近期桌面端体验优化计划。

#### [#6103 docs: add CoreWeave Inference custom provider example](https://github.com/HKUDS/nanobot/pull/6103)  
文档类 PR，合并风险相对较低，可提升 CoreWeave Inference 接入体验。

---

## 项目健康度评估

**整体健康度：良好，但 compaction 模块需重点关注。**

- **活跃度：高**  
  24 小时内 7 个 PR 更新，说明维护和贡献活跃。

- **修复响应：较快**  
  多个 provider 兼容性问题已有 PR，且部分已关闭/合并。

- **风险区域：中等**  
  自动 compaction 涉及 API 成本、后台任务循环和通知噪音，近期多个 Issue/PR 都集中于此，建议作为下一轮稳定性重点。

- **生态扩展：持续推进**  
  CoreWeave 文档、OpenCode Go、DeepSeek、Slack 等方向均有更新，说明 NanoBot provider/channel 生态仍在快速扩展。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
**日期：2026-10-09**  
**仓库：** [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. 今日速览

过去 24 小时 Hermes Agent 维持极高活跃度：Issues 更新 50 条，其中新开或活跃 48 条、关闭 2 条；Pull Requests 更新 50 条，其中仍待合并 46 条、已合并或关闭 4 条。项目刚发布 **v0.21.6**，但该版本发布后立即出现多起与安装更新、插件加载、Gateway 启动和认证边界相关的回归报告，说明当前主线开发速度很快，但稳定性压力也明显上升。  
今日问题集中在 **0.21.6 回归、Desktop/CLI 更新链路、provider 插件预引导加载、Anthropic/Bedrock 凭证解析、Gateway 多平台/多 profile 行为** 等领域。PR 侧则呈现快速响应态势，多个开放 PR 已直接对应当天高优先级 Bug，社区反馈到修复提案的链路较短，维护节奏健康但积压压力较大。

---

## 2. 版本发布

### v0.21.6：Hermes Agent v0.21.6  
**Release：** [v0.21.6](https://github.com/NousResearch/hermes-agent/releases/tag/v0.21.6)  
**发布日期：** 2026-10-08

#### 发布内容概述

v0.21.6 是一个 **Patch release**，官方说明称其将自 v0.21.5 以来约 **2,100 个已合并 PR** 打包为一个稳定标签，用于 Docker 与 Hermes Cloud 分发。完整的精选变更说明预计随 **v0.22.0** 一并发布。

#### 重要影响

- 这是面向 Docker 与 Hermes Cloud 的稳定标签版本。
- 从社区反馈看，v0.21.6 同时引入或暴露了若干回归：
  - Docker / gateway 在未配置 messaging platforms 时无法正常启动：[#135298](https://github.com/NousResearch/hermes-agent/issues/135298)
  - bundled provider plugin `solstice` 缺少 `httpx` 导致反复加载失败：[#135383](https://github.com/NousResearch/hermes-agent/issues/135383)、[#135302](https://github.com/NousResearch/hermes-agent/issues/135302)、[#135443](https://github.com/NousResearch/hermes-agent/issues/135443)
  - Desktop 更新流程出现锁冲突或 exit code 2：[#135405](https://github.com/NousResearch/hermes-agent/issues/135405)、[#135414](https://github.com/NousResearch/hermes-agent/issues/135414)
  - 多 profile / multiplex 场景下 Gateway、Dashboard、Avatar 生成等行为存在隔离问题：[#135337](https://github.com/NousResearch/hermes-agent/issues/135337)、[#135368](https://github.com/NousResearch/hermes-agent/issues/135368)、[#135392](https://github.com/NousResearch/hermes-agent/issues/135392)

#### 破坏性变更与迁移注意事项

官方 Release 未列出明确破坏性变更，但根据今日 Issues，建议用户注意：

1. **Docker 用户升级前应验证 Gateway 启动路径**  
   特别是没有配置任何 messaging platform 的部署，可能受到 [#135298](https://github.com/NousResearch/hermes-agent/issues/135298) 影响。

2. **Desktop 用户谨慎使用内置 Update 按钮**  
   macOS 与 Desktop 更新流程均有锁竞争或重复 updater 检测问题，相关报告见 [#135405](https://github.com/NousResearch/hermes-agent/issues/135405)、[#135414](https://github.com/NousResearch/hermes-agent/issues/135414)。在修复合并前，命令行 `hermes update` 可能比 GUI 更新按钮更可靠。

3. **依赖 bundled provider plugins 的用户需关注预引导环境依赖**  
   `solstice` 等插件在 bootstrap 前导入第三方包时可能失败，表现为日志刷屏与 provider 不可用。相关修复正在推进：[PR #135439](https://github.com/NousResearch/hermes-agent/pull/135439)。

4. **Anthropic / Claude Code 凭证复用用户需检查凭证来源**  
   多个 issue 指向 Anthropic token 分类和 suppressed source 边界问题，见 [#135376](https://github.com/NousResearch/hermes-agent/issues/135376)、[#135415](https://github.com/NousResearch/hermes-agent/issues/135415)，对应修复 PR 为 [#135432](https://github.com/NousResearch/hermes-agent/pull/135432)。

---

## 3. 项目进展

> 数据中仅提供“过去 24 小时 PR 更新 50 条，其中待合并 46 条，已合并/关闭 4 条”，未列出已合并/关闭 PR 的具体编号。因此本节重点基于最新开放 PR 与 Release 信息评估今日推进方向。

### 3.1 发布层面：v0.21.6 标志一个大型稳定快照

- **Release：** [v0.21.6](https://github.com/NousResearch/hermes-agent/releases/tag/v0.21.6)

该版本整合了自 v0.21.5 以来约 2,100 个 PR，为 Docker 与 Hermes Cloud 提供了稳定标签。虽然 Release note 暂未完整展开，但从今日反馈看，v0.21.6 同时成为社区集中验证近期大规模变更的节点。

### 3.2 插件与 provider 发现链路正在快速修补

- [PR #135439](https://github.com/NousResearch/hermes-agent/pull/135439) `fix(plugins): keep custom/openrouter importable in pre-bootstrap interpreters`  
  目标是修复 provider discovery 在 pre-bootstrap interpreter 中丢失 bundled plugins 的问题，直接关联今日多起 `solstice/httpx` 与 provider 预引导加载失败问题。

- [PR #135442](https://github.com/NousResearch/hermes-agent/pull/135442) `catalog: bump excel_line pin 45dcf84 -> a48cc5a`  
  修复社区插件 `excel_line` 安装后无法作为 memory provider 激活的问题，说明插件目录的 pin 管理和 provider discovery 兼容性正在被加强。

### 3.3 认证与安全边界修复推进明显

- [PR #135432](https://github.com/NousResearch/hermes-agent/pull/135432) `fix(auth): never resolve Claude Code credentials from a suppressed source`  
  修复 Anthropic token 解析时忽略 `suppressed_sources.anthropic` 的问题，回应 [#135415](https://github.com/NousResearch/hermes-agent/issues/135415)。

- [PR #135426](https://github.com/NousResearch/hermes-agent/pull/135426) `fix(bedrock): route aux Claude calls through Converse on bearer-token hosts`  
  修复 Bedrock bearer-token 环境下 auxiliary Claude 调用无法解析凭证的问题。

- [PR #135437](https://github.com/NousResearch/hermes-agent/pull/135437) `fix(tools): report an unreachable save-login card as prompt_unavailable`  
  改善 hosted TUI 中 `browser_vault_save_login` 无法展示保存登录提示时的错误语义，避免误报为用户拒绝保存。

### 3.4 Gateway、Cron 与消息投递路径继续稳定化

- [PR #135417](https://github.com/NousResearch/hermes-agent/pull/135417) `fix(cron): preserve outbound delivery when ingress disabled`  
  修复 ingress 禁用时 outbound cron delivery 被破坏的问题。

- [PR #135424](https://github.com/NousResearch/hermes-agent/pull/135424) `fix(gateway): respect 429 Retry-After when auto-creating Discord threads`  
  让 Discord thread 自动创建逻辑尊重 429 `Retry-After`，减少速率限制升级风险。

- [PR #135428](https://github.com/NousResearch/hermes-agent/pull/135428) `fix(gateway): give operator-owned Windows Scheduled Tasks a reconcile opt-out`  
  为 Windows 上由运维人员自定义强化的 Scheduled Task 提供 reconcile opt-out，避免 Hermes 自动 reconcile 覆盖或反复判定为过期模板。

### 3.5 开发者体验和配置能力增强

- [PR #135423](https://github.com/NousResearch/hermes-agent/pull/135423) `hermes config keys --values lists resolved settings`  
  增强 `hermes config` 可观测性与 shell completion，对配置排障和自动化脚本有直接帮助。

- [PR #135436](https://github.com/NousResearch/hermes-agent/pull/135436) `test(config): cover newest-good backup recovery boundaries`  
  补充配置备份恢复边界测试。

- [PR #135410](https://github.com/NousResearch/hermes-agent/pull/135410) `test(skins): cover invalid file fallback and recovery`  
  增加 skin 文件损坏与恢复测试覆盖。

整体来看，今日项目推进方向偏向 **稳定性修复、认证边界、插件系统、更新链路与多平台兼容性**，功能新增则集中在 provider、kanban 和 plugin catalog。

---

## 4. 社区热点

### 4.1 `solstice` bundled provider plugin 缺少 `httpx` 导致日志刷屏

- Issue：[#135383](https://github.com/NousResearch/hermes-agent/issues/135383)  
  **状态：已关闭**  
  **评论数：4**  
  **标签：** `type/bug`, `comp/agent`, `comp/cli`, `comp/tui`, `comp/plugins`, `P3`, `area/install-update`

- 相关 Issue：
  - [#135302](https://github.com/NousResearch/hermes-agent/issues/135302)
  - [#135434](https://github.com/NousResearch/hermes-agent/issues/135434)
  - [#135443](https://github.com/NousResearch/hermes-agent/issues/135443)

- 相关 PR：
  - [#135439](https://github.com/NousResearch/hermes-agent/pull/135439)

该问题成为今日最典型的“更新后体验破坏”热点。用户反馈 `Failed to load bundled provider plugin solstice: No module named 'httpx'` 会在 `hermes doctor`、`hermes update` 和 TUI plugin discovery 中反复出现，既影响终端可读性，也导致 Solstice provider 实际不可用。背后核心诉求是：**bundled plugin 在环境 bootstrap 前不应硬依赖 app 环境中才存在的第三方包，插件发现阶段应更鲁棒、更安静、更可诊断。**

### 4.2 v0.21.6 Docker / Gateway 启动回归

- Issue：[#135298](https://github.com/NousResearch/hermes-agent/issues/135298)  
  **状态：Open**  
  **评论数：4**  
  **标签：** `type/bug`, `comp/gateway`, `P1`, `sweeper:risk-message-delivery`

该 Issue 指出 `nousresearch/hermes-agent:latest-desktop` 在 v0.21.6 中，当没有配置任何 messaging platform 时，`api_server` 启动时永远无法连接。用户明确给出了 last known-good version 为 v0.21.5，但也指出 v0.21.5 缺少 per-version Docker tag，导致二分困难。背后诉求包括：

- Docker 镜像需要更稳定的启动默认行为。
- 每个 release 应有可回退、可 bisect 的固定 tag。
- Gateway 对“零消息平台配置”应是合法部署形态，而不是启动失败。

### 4.3 Desktop 更新按钮自触发锁冲突

- Issue：[#135405](https://github.com/NousResearch/hermes-agent/issues/135405)  
  **状态：Open**  
  **评论数：2**  
  **标签：** `comp/cli`, `comp/desktop`, `P2`, `area/install-update`

- 相关 Issue：
  - [#135414](https://github.com/NousResearch/hermes-agent/issues/135414)

- 相关 PR：
  - [#135413](https://github.com/NousResearch/hermes-agent/pull/135413)

用户反馈 Desktop 内置 “Update” 按钮稳定失败，错误为已有 Hermes update 正在运行，exit code 2。macOS 报告进一步指出这是 hand-off script 与 update lock 的自我冲突。社区诉求非常明确：**GUI 更新路径必须和 CLI update 一样可靠，不能因为自身 custody / lock 机制导致用户无法升级。**

### 4.4 Anthropic 凭证分类与 Claude Code 凭证边界

- Issue：[#135376](https://github.com/NousResearch/hermes-agent/issues/135376)  
  **状态：Open**  
  **评论数：1**  
  **标签：** `provider/anthropic`, `area/auth`, `P1`, `sweeper:risk-security-boundary`, `area/billing`

- Issue：[#135415](https://github.com/NousResearch/hermes-agent/issues/135415)  
  **状态：Open**  
  **评论数：0**

- 相关 PR：
  - [#135432](https://github.com/NousResearch/hermes-agent/pull/135432)

问题集中在 Anthropic token 类型识别与 Claude Code credential fallback。用户报告 `sk-ant-usr-` personal API keys 被误判为 OAuth token，导致请求携带 Claude Code identity 并出现 “credit balance too low”。另一问题则指出即使 `claude_code` 被 suppressed，Hermes 仍可能从 Claude Code credential file fallback。背后诉求是：**凭证来源必须可解释、可禁用，计费与身份边界不能被隐式 fallback 破坏。**

---

## 5. Bug 与稳定性

### P1 / 高优先级

#### 5.1 v0.21.6：无 messaging platform 配置时 Gateway / api_server 无法启动

- Issue：[#135298](https://github.com/NousResearch/hermes-agent/issues/135298)  
- 严重程度：P1  
- 影响范围：Docker、Gateway、Desktop image  
- 状态：Open  
- 已知 fix PR：数据中未见直接对应 PR

**分析：**  
这是今日最严重的回归之一。没有配置 messaging platform 本应是可接受的本地或 API-only 使用模式，但 v0.21.6 中启动链路卡死，直接影响容器部署可用性。

---

#### 5.2 Anthropic personal API key 被误分类为 OAuth / Claude Code 身份

- Issue：[#135376](https://github.com/NousResearch/hermes-agent/issues/135376)  
- 严重程度：P1  
- 影响范围：Anthropic provider、认证、计费  
- 状态：Open  
- 相关 fix PR：可能相关 [#135432](https://github.com/NousResearch/hermes-agent/pull/135432)

**分析：**  
凭证错误分类不仅导致请求失败，还可能造成用户对计费身份、凭证来源的误解。由于涉及 `sweeper:risk-security-boundary` 与 `area/billing`，应优先处理。

---

### P2 / 中高优先级

#### 5.3 Desktop Update 按钮 exit code 2 / update lock 冲突

- Issue：[#135405](https://github.com/NousResearch/hermes-agent/issues/135405)  
- 相关 Issue：[#135414](https://github.com/NousResearch/hermes-agent/issues/135414)  
- 严重程度：P2  
- 状态：Open  
- 相关 PR：[#135413](https://github.com/NousResearch/hermes-agent/pull/135413)

**分析：**  
问题影响用户升级路径，尤其对非 CLI 用户影响大。相关 PR 已开始补充 Desktop update custody 行为测试，但尚未看到最终修复合并信息。

---

#### 5.4 Windows terminal tool 使用 Hermes 私有 Python 遮蔽系统 Python

- Issue：[#135425](https://github.com/NousResearch/hermes-agent/issues/135425)  
- 严重程度：P2  
- 状态：Open  
- 已知 fix PR：暂无直接对应 PR

**分析：**  
此前类似修复似乎只覆盖 POSIX，Windows 路径仍受影响。对 Windows 用户而言，agent terminal 中 `python` 指向错误解释器会破坏项目构建、测试和虚拟环境预期。

---

#### 5.5 `npm install` 跳过 devDependencies，Vitest 未安装

- Issue：[#135419](https://github.com/NousResearch/hermes-agent/issues/135419)  
- 严重程度：P3 标注，但影响开发测试链路  
- 状态：Open  
- 相关 PR：[#135430](https://github.com/NousResearch/hermes-agent/pull/135430)

**分析：**  
PR #135430 指出 gateway 从 TUI 继承 `NODE_ENV=production`，导致 npm 将普通安装视为 production install，从而跳过 devDependencies。这是一个典型环境污染问题，修复方向清晰。

---

#### 5.6 WhatsApp secondary profile onboarding 误用 default profile session

- Issue：[#135337](https://github.com/NousResearch/hermes-agent/issues/135337)  
- 严重程度：P2  
- 状态：Open  
- 已知 fix PR：暂无直接对应 PR

**分析：**  
多 profile / multiplex 场景下 session 归属错误，会导致错误账号被判断为已连接，影响多租户或多身份使用。

---

#### 5.7 Desktop avatar 生成在 multiplex `hermes serve` 中因 unscoped secret 失败

- Issue：[#135368](https://github.com/NousResearch/hermes-agent/issues/135368)  
- 严重程度：P2  
- 状态：Open  
- 已知 fix PR：暂无直接对应 PR

**分析：**  
该问题显示 image generation 调用未按 profile scope 获取 secret，触发 `UnscopedSecretError`。这是多 profile secret isolation 方向的重要稳定性信号。

---

#### 5.8 Claude Code suppressed source 仍被 fallback 读取

- Issue：[#135415](https://github.com/NousResearch/hermes-agent/issues/135415)  
- 严重程度：P2  
- 状态：Open  
- 相关 fix PR：[#135432](https://github.com/NousResearch/hermes-agent/pull/135432)

**分析：**  
属于认证边界问题。PR 已明确修复“不从 suppressed source 解析 Claude Code credentials”的路径。

---

### P3 / 普通优先级但影响体验或数据安全

#### 5.9 bundled provider plugin `solstice` 缺少 `httpx`，日志刷屏且 provider 不可用

- Issue：[#135383](https://github.com/NousResearch/hermes-agent/issues/135383)  
- 相关 Issue：[#135302](https://github.com/NousResearch/hermes-agent/issues/135302)、[#135434](https://github.com/NousResearch/hermes-agent/issues/135434)、[#135443](https://github.com/NousResearch/hermes-agent/issues/135443)  
- 状态：主 Issue 已关闭，但仍有重复/后续报告  
- 相关 PR：[#135439](https://github.com/NousResearch/hermes-agent/pull/135439)

**分析：**  
虽然标为 P3，但重复报告多，用户感知强，应作为 release polish 问题尽快收敛。

---

#### 5.10 disk-cleanup 删除非 git 安装中的永久脚本

- Issue：[#135412](https://github.com/NousResearch/hermes-agent/issues/135412)  
- 状态：Open  
- 严重程度：P2/P3 之间，标签 P2  
- 已知 fix PR：暂无直接对应 PR

**分析：**  
`plugins/disk-cleanup` 将 `$HERMES_HOME/scripts/test_*.py` 误判为 disposable，在非 git 安装中静默删除用户脚本。这属于数据丢失风险，建议优先提升严重级别或至少加入保护。

---

#### 5.11 mem0 OSS + pgvector 更新后驱动缺失

- Issue：[#135347](https://github.com/NousResearch/hermes-agent/issues/135347)  
- 状态：Open  
- 已知 fix PR：暂无直接对应 PR

**分析：**  
用户指出 pgvector 所需驱动属于插件 `postgres` extra，但更新流程未启用该 extra，导致每次 update 后 memory provider 失效。反映 plugin extras 与 managed environment resync 的集成不足。

---

#### 5.12 browser_vault_save_login 在 hosted TUI 中静默失败

- Issue：[#135420](https://github.com/NousResearch/hermes-agent/issues/135420)  
- 状态：Open  
- 相关 PR：[#135437](https://github.com/NousResearch/hermes-agent/pull/135437)

**分析：**  
当前返回 `save_declined` 会误导模型以为用户拒绝保存，但真实情况是 UI 无法渲染保存卡片。PR 将其改为 `prompt_unavailable`，语义更准确。

---

#### 5.13 built-in plugin toolsets 间歇性 “Tool does not exist”

- Issue：[#135367](https://github.com/NousResearch/hermes-agent/issues/135367)  
- 状态：Open  
- 已知 fix PR：暂无直接对应 PR

**分析：**  
`tool_search` 显示 connected/enabled，但调用时报不存在，说明工具注册、缓存或 runtime availability 状态之间存在竞争或不同步。

---

## 6. 功能请求与路线图信号

### 6.1 Baseten 原生 provider

- PR：[#135433](https://github.com/NousResearch/hermes-agent/pull/135433)  
- 类型：Feature  
- 可能进入下一版本：较高

该 PR 添加 Baseten Model APIs 作为原生 inference provider，可通过 `hermes model` 或 `--provider baseten` 使用，并包含 live model catalog、pricing 与 reasoning controls。Hermes Agent 的 provider 生态继续扩展，说明项目仍在强化“多模型、多后端”路线。

---

### 6.2 Desktop preview pane 支持无需原生 Save File dialog 的下载保存

- Issue：[#135441](https://github.com/NousResearch/hermes-agent/issues/135441)  
- 类型：Feature  
- 可能进入下一版本：中等

用户希望 Desktop preview pane 中下载文件时无需弹出原生系统保存对话框，以便 agent 可以无人值守地完成下载。该需求与自动化浏览器、Desktop agent workflows 高度相关，若项目重视端到端自动操作体验，可能成为后续 Desktop roadmap 的一部分。

---

### 6.3 execute_code sandbox tool allow-list 可配置，支持 MCP tools / Code Mode

- Issue：[#135411](https://github.com/NousResearch/hermes-agent/issues/135411)  
- 类型：Feature  
- 可能进入下一版本：中等，但需要安全设计决策

用户希望 `execute_code` 沙箱内可调用 MCP tools，当前 allow-list 是硬编码常量。该方向与 “Code execution with MCP” 模式一致，但涉及 sandbox 权限扩展和安全边界，标签中已有 `needs-decision` 与 `sweeper:risk-security-boundary`，预计需要设计讨论后才会落地。

---

### 6.4 Kanban 支持 Forgejo / Gitea PR completion contracts

- Issue：[#135330](https://github.com/NousResearch/hermes-agent/issues/135330)  
- 类型：Feature  
- 可能进入下一版本：中等

当前 `completion_contract` 强绑定 GitHub：URL 匹配和 API 均依赖 github.com。用户希望支持 Forgejo/Gitea。该需求说明 Hermes kanban/cron 工作流正在被用于自托管代码平台，后续可能推动 VCS provider 抽象。

---

### 6.5 Kanban same-PR remediation 授权

- PR：[#135431](https://github.com/NousResearch/hermes-agent/pull/135431)  
- 类型：Feature  
- 可能进入下一版本：较高

新增 `hermes kanban authorize-existing-pr`，允许 operator 对同一任务卡授权复用已有 PR 进行 review remediation。该功能补足 kanban 自动化在真实 PR review 流程中的闭环能力。

---

### 6.6 Memory Shield 插件进入 plugin catalog

- PR：[#135429](https://github.com/NousResearch/hermes-agent/pull/135429)  
- 类型：Feature / Plugin Catalog  
- 可能进入下一版本：较高

新增 `memory-shield` 到插件目录，说明 memory provider 与 memory safety/治理方向持续扩展。

---

### 6.7 Terminal post-approval middleware for supervised tool resources

- PR：[#135418](https://github.com/NousResearch/hermes-agent/pull/135418)  
- 类型：Feature  
- 可能进入下一版本：中等偏高

该 PR 为需要在命令最终审批后、执行前获取有限资源的 terminal plugins 添加 middleware。它回应受监督资源租约、准入控制和 fail-open 风险等问题，属于安全执行链路增强。

---

## 7. 用户反馈摘要

### 7.1 用户对更新链路的信任正在受到挑战

多个用户报告 `hermes update`、Desktop 内置更新、managed-env resync 在不同平台上失败或产生噪音：

- Desktop Update exit code 2：[#135405](https://github.com/NousResearch/hermes-agent/issues/135405)
- macOS 自触发 update-lock conflict：[#135414](https://github.com/NousResearch/hermes-agent/issues/135414)
- global `core.hooksPath` 导致 source update 失败：[#135279](https://github.com/NousResearch/hermes-agent/issues/135279)
- `uv lock` Android marker resolution 问题：[#135440](https://github.com/NousResearch/hermes-agent/issues/135440)

用户痛点是：**Hermes 的更新机制越来越复杂，但失败信息仍偏底层，且 GUI 与 CLI 行为不一致。**

---

### 7.2 多 profile / multiplex 场景暴露出隔离边界问题

相关问题包括：

- WhatsApp secondary profile 使用 default profile session：[#135337](https://github.com/NousResearch/hermes-agent/issues/135337)
- Desktop avatar generation unscoped secret：[#135368](https://github.com/NousResearch/hermes-agent/issues/135368)
- Nous Cloud gateway ownership restart loop：[#135392](https://github.com/NousResearch/hermes-agent/issues/135392)

用户场景已经从单用户、本地单 profile 扩展到多 profile、多租户、云实例、Dashboard 管理。这要求 Hermes 在 profile scoping、secret resolution、gateway ownership 上提供更强一致性。

---

### 7.3 用户希望 agent 自动化不要被本地 UI 阻塞

- Desktop preview pane 下载被原生 Save File dialog 阻塞：[#135441](https://github.com/NousResearch/hermes-agent/issues/135441)
- hosted TUI 无法渲染 save-login card：[#135420](https://github.com/NousResearch/hermes-agent/issues/135420)

这些反馈表明，用户正在把 Hermes 用于更完整的无人值守工作流。任何需要人工点击、原生对话框或不可渲染 UI card 的地方，都会成为自动化断点。

---

### 7.4 用户对凭证来源和计费身份要求更透明

- Anthropic personal key 被误判：[#135376](https://github.com/NousResearch/hermes-agent/issues/135376)
- suppressed Claude Code 仍被 fallback：[#135415](https://github.com/NousResearch/hermes-agent/issues/135415)
- Bedrock bearer token auxiliary calls 失败：[#135426](https://github.com/NousResearch/hermes-agent/pull/135426)

反馈显示，用户不只是关心“能不能调用模型”，还关心 **到底用了哪个凭证、哪个身份、哪个计费账户**。未来 provider credential resolution 需要更强的可观测性和显式控制。

---

### 7.5 开发者希望 Hermes 不污染项目环境

- `NODE_ENV=production` 导致 npm devDependencies 缺失：[#135419](https://github.com/NousResearch/hermes-agent/issues/135419)，修复 PR [#135430](https://github.com/NousResearch/hermes-agent/pull/135430)
- Windows terminal tool shadowing system Python：[#135425](https://github.com/NousResearch/hermes-agent/issues/135425)
- kanban worker sys.path shadowing：[#135422](https://github.com/NousResearch/hermes-agent/pull/135422)

用户痛点是：Hermes 作为 agent runtime 应尽量保持“透明”，不能让自身 launcher、venv、环境变量或工作目录改变用户项目的解释器、依赖安装或模块解析。

---

## 8. 待处理积压

> 今日数据只覆盖过去 24 小时活动，无法完整判断“长期未响应”。以下列出的是今日仍开放、影响面较大、且需要维护者持续关注的问题/PR。

### 8.1 v0.21.6 Gateway 启动回归仍需优先收敛

- Issue：[#135298](https://github.com/NousResearch/hermes-agent/issues/135298)

这是 P1 且影响 Docker/desktop latest image 的启动可用性。建议维护者尽快确认是否需要 v0.21.7 hotfix，或至少提供 workaround。

---

### 8.2 Desktop / CLI 更新链路相关问题较分散，需要统一 owner

- [#135405](https://github.com/NousResearch/hermes-agent/issues/135405)
- [#135414](https://github.com/NousResearch/hermes-agent/issues/135414)
- [#135279](https://github.com/NousResearch/hermes-agent/issues/135279)
- [#135440](https://github.com/NousResearch/hermes-agent/issues/135440)
- [#135413](https://github.com/NousResearch/hermes-agent/pull/135413)

建议设立一次 install/update stability sweep，将 Desktop hand-off、update lock、uv lock、global git hooks、plugin bootstrap 纳入同一测试矩阵。

---

### 8.3 多 profile / multiplex bug 需要系统性测试覆盖

- WhatsApp onboarding profile mix-up：[#135337](https://github.com/NousResearch/hermes-agent/issues/135337)
- avatar generation unscoped secret：[#135368](https://github.com/NousResearch/hermes-agent/issues/135368)
- Gateway ownership restart loop：[#135392](https://github.com/NousResearch/hermes-agent/issues/135392)

这些问题看似分散，但共同指向 profile scoping 与 ownership resolution。建议补充 multiplex integration tests。

---

### 8.4 数据丢失风险：disk-cleanup 删除用户脚本

- Issue：[#135412](https://github.com/NousResearch/hermes-agent/issues/135412)

虽然目前评论不多，但“静默删除永久脚本”属于高风险用户信任问题。建议尽快明确是否暂停该清理规则，或加入 git/non-git 安装保护。

---

### 8.5 Plugin discovery / pre-bootstrap import 问题仍有重复报告

- Issue：[#135434](https://github.com/NousResearch/hermes-agent/issues/135434)
- Issue：[#135443](https://github.com/NousResearch/hermes-agent/issues/135443)
- PR：[#135439](https://github.com/NousResearch/hermes-agent/pull/135439)

即使主 Issue [#135383](https://github.com/NousResearch/hermes-agent/issues/135383) 已关闭，新的重复报告说明修复可能尚未进入用户可用版本，或只覆盖部分 provider。建议在下个 patch release note 中明确修复状态。

---

### 8.6 Open PR 队列偏长，需关注 review throughput

过去 24 小时有 50 条 PR 更新，其中 **46 条仍待合并**。其中不少 PR 直接对应当天用户痛点：

- Anthropic suppressed source 修复：[PR #135432](https://github.com/NousResearch/hermes-agent/pull/135432)
- TUI save-login prompt 语义修复：[PR #135437](https://github.com/NousResearch/hermes-agent/pull/135437)
- TUI / Gateway `NODE_ENV` 污染修复：[PR #135430](https://github.com/NousResearch/hermes-agent/pull/135430)
- Discord 429 backoff 修复：[PR #135424](https://github.com/NousResearch/hermes-agent/pull/135424)
- Cron outbound delivery 修复：[PR #135417](https://github.com/NousResearch/hermes-agent/pull/135417)

建议维护者优先 review 与 P1/P2、认证边界、消息投递、更新链路相关的 PR，避免回归在 v0.21.6 用户群中继续扩散。

---

## 总体健康度评估

Hermes Agent 今日表现为 **高活跃、高响应、高风险并存**。项目开发速度非常快，release 与 PR 流量均显示维护团队和社区贡献者高度活跃；同时，v0.21.6 作为大型 patch rollup 后暴露出多个与安装、更新、插件加载、Gateway、多 profile 和认证边界相关的问题，说明当前最需要加强的是 **release stabilization、跨平台回归测试、profile scoping 测试与 update/install 流程可靠性**。  
短期建议关注是否需要发布 **v0.21.7 hotfix**，优先处理 Gateway P1 回归、Anthropic 凭证边界、Desktop update 锁冲突和 pre-bootstrap plugin import 问题。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报｜2026-10-09

数据来源：GitHub 近 24 小时活动  
仓库：github.com/qwibitai/nanoclaw

---

## 1. 今日速览

过去 24 小时，NanoClaw 没有新的 Issue 更新，也没有新版本发布，项目讨论面相对安静。  
今日主要活动集中在 Pull Request，共有 2 条 PR 更新：1 条已关闭，1 条仍处于待合并状态。  
整体活跃度评估为 **低到中等**：虽然用户侧反馈与 Issue 讨论暂时停滞，但维护侧仍在推进 CI 基础设施规范化与 Docker 容器生命周期稳定性修复。  
当前项目健康度总体稳定，短期重点看起来集中在 **CI 运行环境治理** 与 **容器驱动可靠性**。

---

## 2. 版本发布

今日无新版本发布。

- 最新 Releases：无
- 破坏性变更：无公开发布记录
- 迁移注意事项：无

---

## 3. 项目进展

### 已关闭 / 已完成 PR

#### PR #4058｜ci: move all jobs to namespace-profile-paradixe  
- 状态：CLOSED  
- 作者：paradixe  
- 标签：`area/containers`, `area/repository-maintenance`, `area/skills`  
- 创建时间：2026-10-09  
- 更新时间：2026-10-09  
- 链接：<https://github.com/qwibitai/nanoclaw/pull/4058>

该 PR 主要围绕 GitHub Actions 运行环境进行治理，目标是执行 2026-10-08 已批准的规则：所有 GitHub Actions jobs 必须运行在 `namespace-profile-paradixe`，或自托管的 s6 runner 上，不能继续使用 GitHub 托管标签，例如 `ubuntu-latest`、`ubuntu-22.04`、`windows-*`、`macos-*`。

从项目维护角度看，这类改动属于 **CI 基础设施一致性与供应链控制增强**。它不会直接带来用户可见的新功能，但有助于统一构建环境、减少 CI 环境漂移，并提高后续自动化测试与发布流程的可预测性。

不过该 PR 当前状态为 `CLOSED`，数据中未显示是否已合并。因此需要维护者确认：  
- 如果是正常合并后关闭，则说明 CI 迁移规则已部分或全部落地；  
- 如果是未合并关闭，则该治理任务可能仍需后续 PR 接续完成。

**项目推进评价：**  
今日完成了一项偏维护侧的基础设施调整尝试，对项目长期稳定性有正向意义，但对终端用户功能进展影响有限。

---

### 待合并 PR

#### PR #4057｜fix(docker-driver): wait out in-flight --rm auto-removal on stop  
- 状态：OPEN  
- 作者：musashinm  
- 标签：`area/containers`  
- 创建时间：2026-10-08  
- 更新时间：2026-10-08  
- 链接：<https://github.com/qwibitai/nanoclaw/pull/4057>

该 PR 修复 Docker 容器停止流程中的一个稳定性问题。

问题背景：NanoClaw 的 agent 容器使用 `--rm` 创建。当 `DockerHandle.stop()` 执行 `docker stop` 后，Docker 会自动触发容器删除流程；但随后代码又执行 `docker rm --force`，此时 Docker daemon 可能因为自动删除仍在进行中而拒绝请求，导致 teardown 被误判为失败。

该 PR 的目标是让 `DockerHandle.stop()` 在 Docker 自身的 `--rm` 自动删除仍在进行时进行等待或容错处理，避免将正常的异步清理过程报告为失败。

**影响范围：**
- 影响模块：Docker driver / container lifecycle
- 影响场景：agent 容器停止、清理、测试环境 teardown、自动化任务结束
- 用户价值：减少误报失败，提升容器型 agent 的运行稳定性

**项目推进评价：**  
这是一个明确的稳定性修复，若合并，将直接改善 Docker 后端在容器停止与清理阶段的可靠性。相较于今日的 CI 维护 PR，该 PR 对实际运行体验的影响更直接。

---

## 4. 社区热点

今日没有 Issue 更新，也没有可用的评论数量与反应数量数据。因此，无法识别真正意义上的高热度社区讨论。

不过从 PR 活动看，今日关注点集中在两个方向：

### 1. CI 运行环境标准化  
- PR：#4058  
- 链接：<https://github.com/qwibitai/nanoclaw/pull/4058>  
- 热点类型：维护治理 / CI 策略

该 PR 反映出维护者对 GitHub Actions 执行环境有更严格的控制诉求，可能与构建一致性、安全性、成本、runner 能力或内部基础设施策略有关。

### 2. Docker 容器生命周期稳定性  
- PR：#4057  
- 链接：<https://github.com/qwibitai/nanoclaw/pull/4057>  
- 热点类型：稳定性修复 / 容器运行时

该 PR 体现出项目在处理真实运行环境中的竞态条件问题。尤其是 `--rm` 自动删除与显式 `docker rm --force` 之间的冲突，属于容器生命周期管理中较典型的边界问题。

---

## 5. Bug 与稳定性

### P1 / 中高优先级：Docker stop 阶段可能误报 teardown 失败

- 相关 PR：#4057  
- 状态：OPEN，已有 fix PR  
- 链接：<https://github.com/qwibitai/nanoclaw/pull/4057>

**问题描述：**  
当 agent 容器以 `--rm` 模式运行时，`docker stop` 会触发 Docker daemon 自动删除容器。如果 `DockerHandle.stop()` 紧接着调用 `docker rm --force`，可能与 daemon 正在执行的 auto-removal 发生冲突，导致清理失败或误报失败。

**潜在影响：**
- 自动化测试中出现不稳定失败
- 容器型 agent 停止时出现误判
- CI/CD 或批处理任务被错误标记为失败
- 用户可能误以为容器残留或运行时异常

**修复状态：**  
已有修复 PR，但尚未合并。建议优先 review 与合并，尤其是该问题涉及容器清理的竞态条件，容易造成间歇性失败。

---

### P3 / 维护稳定性：CI runner 标签规范化

- 相关 PR：#4058  
- 状态：CLOSED  
- 链接：<https://github.com/qwibitai/nanoclaw/pull/4058>

**问题描述：**  
项目正在推进所有 GitHub Actions job 迁移至指定 runner namespace，避免继续使用 GitHub-hosted runner 标签。

**稳定性意义：**
- 减少不同 runner 环境带来的 CI 差异
- 增强构建与测试环境可控性
- 降低未来因 runner 镜像升级导致的不可预测失败

**注意事项：**  
由于该 PR 已关闭但数据未说明是否合并，建议维护者确认该迁移是否已经完整落地。

---

## 6. 功能请求与路线图信号

今日没有新的 Issue，因此没有直接来自用户的新功能请求。

不过从 PR 信号看，短期路线图可能包含以下方向：

### 1. 容器运行时可靠性增强

- 相关 PR：#4057  
- 链接：<https://github.com/qwibitai/nanoclaw/pull/4057>

Docker driver 的 stop / teardown 行为正在被修正，说明容器化 agent 执行路径仍是项目重点维护方向。该修复如果合并，可能进入下一个补丁版本或稳定性版本。

### 2. CI 与仓库维护规范化

- 相关 PR：#4058  
- 链接：<https://github.com/qwibitai/nanoclaw/pull/4058>

统一 GitHub Actions runner namespace 表明项目维护方正在加强工程基础设施管理。这类工作通常服务于后续更稳定的测试、构建和发布流程。

---

## 7. 用户反馈摘要

今日没有 Issue 评论数据，也没有用户讨论记录，因此无法提炼真实用户反馈。

基于现有 PR 内容，只能间接观察到以下潜在用户痛点：

### 容器停止失败的误报可能影响开发者体验

- 相关 PR：#4057  
- 链接：<https://github.com/qwibitai/nanoclaw/pull/4057>

如果用户在本地或 CI 中使用 Docker agent，容器停止阶段的误报失败会造成困惑，尤其是在实际容器已经被 Docker 自动删除、但 NanoClaw 仍报告 teardown 异常的情况下。  
这类问题不一定导致核心任务失败，但会降低用户对运行结果的信任度。

### CI 环境一致性是维护者关注点

- 相关 PR：#4058  
- 链接：<https://github.com/qwibitai/nanoclaw/pull/4058>

虽然不是直接用户反馈，但维护者对 runner 环境的收敛说明项目可能曾经或正在面对 CI 环境差异带来的维护成本。

---

## 8. 待处理积压

根据今日数据，暂无长期未响应的 Issue 或 PR 可识别。

当前需要维护者关注的待处理项主要是：

### PR #4057｜Docker driver stop auto-removal 竞态修复

- 状态：OPEN  
- 链接：<https://github.com/qwibitai/nanoclaw/pull/4057>  
- 建议优先级：高

建议尽快完成 review，重点检查：
- 是否正确区分容器不存在、正在删除、删除失败等状态；
- 是否会掩盖真正的 `docker rm` 失败；
- 是否有覆盖 `--rm` 容器 stop 后自动删除的测试；
- 是否兼容不同 Docker daemon 版本下的错误返回信息。

### PR #4058｜CI runner namespace 迁移

- 状态：CLOSED  
- 链接：<https://github.com/qwibitai/nanoclaw/pull/4058>  
- 建议优先级：中

建议确认该 PR 是否已合并。如果未合并关闭，需要检查是否仍存在 GitHub-hosted runner 标签残留，避免后续 CI job 与项目规则不一致。

---

## 总体健康度评估

今日 NanoClaw 的外部讨论活跃度较低，但维护活动仍在继续。项目当前没有新 Issue、没有新版本发布，说明短期内没有明显的用户集中反馈或发布节奏变化。  
PR 活动显示维护者正在处理两个关键工程面：**CI 基础设施治理** 与 **Docker 容器生命周期稳定性**。其中 #4057 对实际用户体验影响更直接，建议作为短期优先合并对象。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报 — 2026-10-09

## 1. 今日速览

过去 24 小时，NullClaw 仓库没有新增或更新 Issue，也没有新版本发布；项目活跃度主要集中在 Pull Request 层面。今日共有 4 个开放 PR 更新，全部处于待合并状态，尚无 PR 被合并或关闭。整体来看，项目今天偏向“维护与功能准备期”：有稳定性修复、配置增强、文档示例和模型能力适配等改动进入评审队列。社区讨论热度较低，当前数据中未体现评论数或表情反馈，说明今日缺少显著的公开讨论焦点。

---

## 2. 版本发布

今日无新版本发布。

最新 Releases：无。

---

## 3. 项目进展

今日没有 PR 被合并或关闭，因此从代码主干角度看，项目没有产生已落地变更。不过，以下 4 个开放 PR 显示出项目近期可能推进的方向。

### 待合并 PR

#### [PR #1052 docs: add optional Parallel Search MCP example](https://github.com/nullclaw/nullclaw/pull/1052)

- 状态：OPEN
- 作者：georgeatparallel
- 创建 / 更新：2026-10-09
- 类型：文档 / MCP 集成示例
- 摘要：新增一个可选的 Parallel Search MCP 示例，使用 NullClaw 原生 HTTP transport。用户可将 server entry 合并进现有配置，重启后使用 `mcp_parallel_web_search` 或 `mcp_parallel_web_fetch`。
- 影响：
  - 降低用户配置 Parallel Search MCP 的门槛。
  - 不需要 Parallel API key 或本地 bridge。
  - 文档层面的改进，不直接改变核心运行时逻辑。
- 项目推进判断：如果合并，将增强 NullClaw 在 MCP 工具生态中的可用性和示例覆盖。

#### [PR #1051 feat(http): NULLCLAW_CA_BUNDLE env override for minimal-rootfs HTTPS](https://github.com/nullclaw/nullclaw/pull/1051)

- 状态：OPEN
- 作者：addadi
- 创建 / 更新：2026-10-08
- 类型：功能增强 / HTTP / TLS 配置
- 摘要：为 minimal root filesystem 环境增加 `NULLCLAW_CA_BUNDLE` 环境变量覆盖能力，解决 `std.http` 在 Android app sandbox、distroless / scratch 容器等环境中无法扫描系统 CA，导致 HTTPS 请求在 TLS 层失败的问题。
- 影响：
  - 明显提升 NullClaw 在容器化、移动端沙箱、极简运行环境中的可部署性。
  - 为无法依赖系统 CA 路径的用户提供配置级逃生通道。
- 项目推进判断：这是一个较实用的稳定性和部署兼容性改进，合并优先级应较高。

#### [PR #1050 feat(config): add reasoning_mode to surface reasoning-only responses](https://github.com/nullclaw/nullclaw/pull/1050)

- 状态：OPEN
- 作者：vernonstinebaker
- 创建 / 更新：2026-10-08
- 类型：功能增强 / 配置 / 推理模型适配
- 摘要：新增 `reasoning_mode` 配置，用于处理部分 reasoning 模型在 completion budget 被推理内容耗尽时，返回 `finish_reason=length`、`content:null`、但存在 `reasoning_content` 的情况。
- 影响：
  - 改善 Qwen3 reasoning variants、GLM、R1 等推理模型的兼容性。
  - 避免用户看到空内容，帮助暴露 reasoning-only 响应。
  - 表明项目正在适配新一代 reasoning model 的返回格式差异。
- 项目推进判断：该 PR 具有路线图意义，可能成为下一版本中提升多模型兼容性的关键改动。

#### [PR #1049 fix(discord): schedule heartbeats from the wall clock](https://github.com/nullclaw/nullclaw/pull/1049)

- 状态：OPEN
- 作者：vernonstinebaker
- 创建 / 更新：2026-10-08
- 类型：Bug 修复 / Discord 集成 / 稳定性
- 摘要：修复 Discord heartbeat 线程通过累计 `sleep(100ms)` 次数推进 deadline 的问题。由于 OS timer coalescing，尤其是在后台 daemon 场景下，实际 sleep 时间可能变长，导致 heartbeat 落后于真实时间。
- 影响：
  - 提升 Discord 集成的连接稳定性。
  - 降低后台运行时因 heartbeat 漂移导致的断连风险。
- 项目推进判断：这是直接面向稳定性的修复，建议优先评审和合并。

---

## 4. 社区热点

今日没有明显的高热度社区讨论。当前数据中所有 PR 的评论数均未提供，点赞数均为 0，也没有活跃 Issue。

相对值得关注的 PR 如下：

1. [PR #1051 NULLCLAW_CA_BUNDLE env override](https://github.com/nullclaw/nullclaw/pull/1051)  
   - 热点原因：涉及极简容器、Android 沙箱、distroless / scratch 等实际部署环境中的 HTTPS 可用性问题。
   - 背后诉求：用户希望 NullClaw 能在更受限、更轻量的运行环境中可靠访问 HTTPS 服务。

2. [PR #1050 reasoning_mode](https://github.com/nullclaw/nullclaw/pull/1050)  
   - 热点原因：面向 reasoning 模型响应结构的适配，触及当前 AI Agent 和个人助手场景中的核心模型兼容问题。
   - 背后诉求：用户希望在使用 Qwen3、GLM、R1 等 reasoning 模型时，不因 `content:null` 而丢失可解释或有用的推理输出。

3. [PR #1049 Discord heartbeat fix](https://github.com/nullclaw/nullclaw/pull/1049)  
   - 热点原因：Discord bot / daemon 长时间运行稳定性问题。
   - 背后诉求：用户需要后台服务在非前台、非高精度调度环境下仍保持可靠连接。

---

## 5. Bug 与稳定性

今日没有新增 Issue 形式的 Bug 报告。不过，开放 PR 中包含至少两个稳定性相关修复或增强。

### 高优先级

#### Discord heartbeat 调度漂移问题

- 关联 PR：[PR #1049 fix(discord): schedule heartbeats from the wall clock](https://github.com/nullclaw/nullclaw/pull/1049)
- 严重程度：中高
- 类型：连接稳定性 / 后台服务可靠性
- 现象：
  - Discord heartbeat 线程此前通过统计 `sleep(100ms)` 次数推进 deadline。
  - 在 OS timer coalescing 较强的环境中，尤其是后台 daemon，每次 sleep 可能超过预期。
  - 结果是 heartbeat 逻辑落后于真实时钟，可能导致连接维护异常。
- 当前状态：已有 fix PR，待合并。
- 建议：优先评审，尤其验证后台运行、低功耗、容器环境下的 heartbeat 行为。

### 中优先级

#### minimal-rootfs 环境 HTTPS TLS 失败

- 关联 PR：[PR #1051 feat(http): NULLCLAW_CA_BUNDLE env override for minimal-rootfs HTTPS](https://github.com/nullclaw/nullclaw/pull/1051)
- 严重程度：中
- 类型：部署兼容性 / HTTPS / TLS
- 现象：
  - 在 Android app sandbox、distroless、scratch container 等环境中，系统 CA 路径可能不存在。
  - `std.http` 懒加载系统 CA 扫描失败，导致 HTTPS 请求在 TLS 层报错。
- 当前状态：已有增强 PR，待合并。
- 建议：合并前重点测试：
  - 指定 `NULLCLAW_CA_BUNDLE` 的有效路径。
  - 路径无效或证书格式错误时的错误提示。
  - 与默认系统 CA 加载逻辑的优先级关系。

---

## 6. 功能请求与路线图信号

虽然今日没有新的 Issue 形式功能请求，但开放 PR 反映出几个清晰的产品方向。

### 1. 更好的 reasoning 模型兼容性

- 关联 PR：[PR #1050 feat(config): add reasoning_mode to surface reasoning-only responses](https://github.com/nullclaw/nullclaw/pull/1050)
- 路线图信号：
  - NullClaw 正在适配 reasoning 模型的特殊响应结构。
  - 未来可能继续增强对 `reasoning_content`、空 `content`、`finish_reason=length` 等边界情况的处理。
- 可能进入下一版本的概率：较高  
  该改动直接改善用户在新型推理模型上的体验，且问题具有普遍性。

### 2. MCP 工具生态示例扩展

- 关联 PR：[PR #1052 docs: add optional Parallel Search MCP example](https://github.com/nullclaw/nullclaw/pull/1052)
- 路线图信号：
  - 项目正在增强 MCP 使用文档和外部工具集成示例。
  - Parallel Search 的示例说明 NullClaw 可能希望降低用户接入搜索 / fetch 类工具的复杂度。
- 可能进入下一版本的概率：中高  
  文档类 PR 风险较低，若配置示例准确，通常容易合并。

### 3. 受限部署环境支持

- 关联 PR：[PR #1051 feat(http): NULLCLAW_CA_BUNDLE env override for minimal-rootfs HTTPS](https://github.com/nullclaw/nullclaw/pull/1051)
- 路线图信号：
  - NullClaw 使用场景可能正在扩展到容器、移动端、沙箱化和极简系统环境。
  - 对证书链、HTTP transport、环境变量配置的可控性需求增强。
- 可能进入下一版本的概率：较高  
  该能力解决实际部署阻塞，且配置项形式相对清晰。

### 4. 长时间运行服务稳定性

- 关联 PR：[PR #1049 fix(discord): schedule heartbeats from the wall clock](https://github.com/nullclaw/nullclaw/pull/1049)
- 路线图信号：
  - Discord 集成仍是项目重要运行场景之一。
  - 后台 daemon、长连接、heartbeat 调度等稳定性细节受到关注。
- 可能进入下一版本的概率：较高  
  修复类 PR 对用户稳定性影响直接，合并价值明确。

---

## 7. 用户反馈摘要

今日没有 Issue 评论数据，也没有可见的用户讨论内容，因此无法从评论中提炼直接用户反馈。

但从 PR 内容可以间接归纳出以下使用痛点：

1. **极简运行环境中的 HTTPS 失败**
   - 关联：[PR #1051](https://github.com/nullclaw/nullclaw/pull/1051)
   - 痛点：用户在 Android 沙箱、distroless、scratch 等环境部署时，缺少系统 CA 路径，HTTPS 请求无法正常工作。
   - 典型场景：容器化部署、移动端嵌入、受限 Linux runtime。

2. **reasoning 模型返回空内容导致体验不佳**
   - 关联：[PR #1050](https://github.com/nullclaw/nullclaw/pull/1050)
   - 痛点：模型实际生成了 `reasoning_content`，但标准 `content` 为空，用户可能认为请求失败或模型没有回答。
   - 典型场景：使用 Qwen3 reasoning、GLM、R1 等模型构建 Agent 或个人助手。

3. **Discord 后台连接稳定性**
   - 关联：[PR #1049](https://github.com/nullclaw/nullclaw/pull/1049)
   - 痛点：后台服务受系统计时器调度影响，heartbeat 不准时，可能影响连接可靠性。
   - 典型场景：长期运行的 Discord bot、服务器 daemon。

4. **MCP 搜索工具配置复杂度**
   - 关联：[PR #1052](https://github.com/nullclaw/nullclaw/pull/1052)
   - 痛点：用户需要清晰示例来接入搜索和网页抓取能力。
   - 典型场景：为个人 AI 助手增加联网搜索、网页 fetch、知识检索能力。

---

## 8. 待处理积压

当前数据中没有长期未响应的 Issue 或 PR。今日可见的 4 个 PR 均为最近两天创建或更新，属于新鲜待评审队列。

建议维护者关注以下待处理项：

1. [PR #1049 fix(discord): schedule heartbeats from the wall clock](https://github.com/nullclaw/nullclaw/pull/1049)  
   - 建议优先级：高  
   - 原因：稳定性修复，影响 Discord 长连接可靠性。

2. [PR #1051 feat(http): NULLCLAW_CA_BUNDLE env override for minimal-rootfs HTTPS](https://github.com/nullclaw/nullclaw/pull/1051)  
   - 建议优先级：高  
   - 原因：解决 minimal-rootfs 环境中的 HTTPS 阻塞问题，对部署兼容性影响明显。

3. [PR #1050 feat(config): add reasoning_mode to surface reasoning-only responses](https://github.com/nullclaw/nullclaw/pull/1050)  
   - 建议优先级：中高  
   - 原因：增强 reasoning 模型兼容性，符合 AI Agent 项目演进方向。

4. [PR #1052 docs: add optional Parallel Search MCP example](https://github.com/nullclaw/nullclaw/pull/1052)  
   - 建议优先级：中  
   - 原因：文档和示例改进，有助于 MCP 工具接入，但不属于运行时阻塞问题。

---

## 项目健康度判断

NullClaw 今日整体健康度：**稳定，活跃度中等偏低**。

- 正向信号：
  - 有 4 个新近开放 PR，覆盖文档、部署、模型兼容和稳定性。
  - PR 方向与 AI Agent / 个人 AI 助手核心需求相关，包括 MCP、reasoning models、HTTPS transport 和 Discord 集成。
  - 未见新增崩溃类 Issue 或大规模回归报告。

- 风险信号：
  - 今日没有合并 PR，说明改动尚未进入主干。
  - 社区讨论数据不足，缺少维护者反馈、用户验证或 review 进展。
  - 若 #1049 和 #1051 长时间未合并，可能影响 Discord 用户和 minimal-rootfs 部署用户的体验。

总体来看，NullClaw 当前处于“改进已提出、等待评审落地”的阶段。下一步关键在于维护者尽快评审稳定性相关 PR，并确认 reasoning 模型配置方案是否符合项目长期设计。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-10-09

## 1. 今日速览

过去 24 小时，IronClaw 仓库新增/更新了 **2 个开放 Issue**，无 PR 更新、无版本发布，整体活跃度处于 **低到中等** 水平。今日动态主要集中在两个方向：一是新的通信集成功能提案，二是每日基准测试失败分类与质量分析。  
从数据看，当前没有合并代码变更，说明项目今日更偏向 **需求收集与质量观察**，而非功能交付。社区互动较少，两个 Issue 均无评论和点赞，短期内尚未形成明显讨论热点。

---

## 2. 项目进展

今日无新增、合并或关闭的 Pull Request。

- PR 更新数量：**0**
- 待合并 PR：**0**
- 已合并/关闭 PR：**0**

因此，过去 24 小时内项目代码层面没有可见推进。当前进展主要体现在 Issue 层面的需求提出与测试结果整理。

---

## 3. 社区热点

今日共有 2 个开放 Issue，但均无评论和表情反应，说明讨论尚处于早期阶段。

### #8130 Proposal: optional Sendblue iMessage/SMS extension with host-owned credentials  
链接：https://github.com/nearai/ironclaw/issues/8130  
作者：lookevink  
状态：Open  
评论：0  
👍：0  

该 Issue 提出为 IronClaw 增加一个可选的一方 Sendblue 扩展，用于支持直接的 iMessage / SMS 对话。提案中提到用户可自行配置 Sendblue 线路和凭证，注册认证接收 webhook，绑定白名单手机号，并复用 IronClaw 现有的会话与回复生命周期。

**背后诉求分析：**

- 用户希望 IronClaw 不仅停留在网页或应用内交互，而是能进入更自然的日常通信渠道。
- “host-owned credentials” 表明提案倾向于让部署方自己持有第三方服务凭证，降低平台方托管敏感凭证的风险。
- 该功能可能面向个人 AI 助手场景，尤其是通过短信/iMessage 与 AI 智能体进行持续对话。
- 由于目前尚无评论或 PR，说明该功能仍处在早期构想阶段，是否进入路线图仍需维护者反馈。

---

### #8129 Daily ironclaw failure taxonomy — 2026-10-08  
链接：https://github.com/nearai/ironclaw/issues/8129  
作者：pranavraja99  
状态：Open  
评论：0  
👍：0  

该 Issue 是一份每日失败分类报告，分析了 IronClaw 在 benchmark 中的非通过任务。摘要中提到 `officeqa` 套件有 25 个 non-pass 任务，并指出这些失败大多是真实的模型质量问题，例如 DeepSeek-V4-Flash 在部分任务中导航或执行不佳。

**背后诉求分析：**

- 项目正在持续跟踪 benchmark 表现，并尝试区分模型能力问题、环境问题、工具调用问题或评测问题。
- 该类日报有助于定位 IronClaw 在真实办公任务中的薄弱点。
- 当前内容偏质量观测，不一定意味着代码缺陷，但对后续模型选择、agent 策略改进、任务规划能力提升具有参考价值。

---

## 4. Bug 与稳定性

今日没有明确报告崩溃、回归或安全类 Bug，也没有对应的 fix PR。

### 中等优先级：Benchmark 非通过任务集中出现  
链接：https://github.com/nearai/ironclaw/issues/8129  

Issue #8129 报告了 `officeqa` benchmark 中 25 个 non-pass 任务。根据摘要，这些失败“overwhelmingly genuine model-quality errors”，即主要归因于模型质量，而非明确的 IronClaw 系统崩溃或基础设施故障。

**影响判断：**

- 严重程度：中等  
- 类型：模型质量 / 任务完成率 / benchmark 可靠性  
- 是否已有 fix PR：否  
- 是否阻塞发布：当前无法判断  
- 影响范围：主要影响 benchmark 成绩和实际办公任务完成质量  

**建议维护者关注：**

- 将失败样例按任务类型进一步聚类，例如导航失败、信息抽取失败、工具调用失败、格式错误等。
- 标注哪些失败可通过 agent orchestration 改进解决，哪些需要更强模型。
- 若类似 failure taxonomy 持续出现，可考虑建立固定的质量回归面板。

---

## 5. 功能请求与路线图信号

### 可选 Sendblue iMessage/SMS 扩展  
链接：https://github.com/nearai/ironclaw/issues/8130  

这是今日最明确的功能请求。提案希望为 IronClaw 增加一个一方 Sendblue 扩展，使 AI 助手可以通过 iMessage/SMS 与用户进行直接对话。

**潜在价值：**

- 扩展 IronClaw 的用户触达渠道。
- 更贴近个人 AI 助手的真实使用场景。
- 通过手机号白名单和认证 webhook 设计，初步考虑了安全边界。
- 可复用现有 conversation 与 reply lifecycle，可能降低集成复杂度。

**纳入下一版本的可能性判断：中低**

原因：

- 当前只有 Issue，没有 PR。
- 无维护者评论或路线图确认。
- 涉及第三方通信服务、凭证管理、webhook 安全、隐私合规等问题，落地成本较高。
- 如果被接受，更可能先以 optional extension、experimental integration 或 documentation-first 的形式进入。

**建议后续拆分任务：**

1. 明确 Sendblue extension 的配置格式与凭证存储方式。  
2. 定义 webhook 鉴权与重放攻击防护。  
3. 明确手机号 allowlist 的管理入口。  
4. 设计消息与 IronClaw conversation lifecycle 的映射规则。  
5. 增加测试用 mock provider，避免 CI 依赖真实 Sendblue 服务。  

---

## 6. 用户反馈摘要

今日 Issue 中没有评论，因此没有可提炼的多方用户反馈。不过从两个新 Issue 的内容可以观察到以下信号：

- **使用场景扩展需求**：#8130 表明用户希望 IronClaw 进入短信/iMessage 等个人通信渠道，体现出个人 AI 助手场景的需求。
- **质量可观测性需求**：#8129 体现出项目对 benchmark 失败原因的持续追踪，说明用户或维护者关注的不只是“是否通过”，还包括失败类型和失败根因。
- **当前满意/不满意信号有限**：两个 Issue 均无评论、无点赞，尚无法判断社区是否广泛支持这些方向。

相关链接：

- Sendblue iMessage/SMS 扩展提案：https://github.com/nearai/ironclaw/issues/8130  
- 每日失败分类报告：https://github.com/nearai/ironclaw/issues/8129  

---

## 7. 待处理积压

基于本次提供的数据，仅覆盖过去 24 小时内的 Issue / PR 更新，未包含长期未响应 Issue 或历史 PR。因此无法可靠识别长期积压项。

不过，以下新开放事项建议维护者尽快 triage：

### #8130 Sendblue iMessage/SMS 扩展提案  
链接：https://github.com/nearai/ironclaw/issues/8130  

建议维护者标注：

- `feature request`
- `integration`
- `needs design`
- `security/privacy`

并明确是否接受该方向，避免提案长期悬置。

### #8129 Daily ironclaw failure taxonomy  
链接：https://github.com/nearai/ironclaw/issues/8129  

建议维护者标注：

- `benchmark`
- `quality`
- `model-evaluation`
- `needs triage`

如果该类日报会持续产生，建议建立统一模板或自动化 dashboard，减少 Issue 噪音并提升可追踪性。

---

## 项目健康度判断

当前 IronClaw 今日健康度可评为：**稳定但低活跃**。

正面信号：

- 有持续 benchmark 失败分析，说明项目重视质量追踪。
- 出现新的通信渠道扩展提案，表明个人 AI 助手场景仍有拓展空间。

风险信号：

- 今日无 PR、无版本发布，代码推进不可见。
- Issue 讨论互动为零，社区参与度偏低。
- Benchmark failure taxonomy 指向一定的模型质量问题，可能影响实际任务可靠性。

总体来看，IronClaw 今日处于 **需求与质量观察阶段**，尚未进入明显的实现或修复周期。维护者接下来若能对 #8130 和 #8129 进行快速 triage，将有助于提升项目路线清晰度与社区信心。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报｜2026-10-09

## 1. 今日速览

过去 24 小时，LobsterAI 项目没有新的 Issue 更新，也没有新版本发布，社区问题反馈面较为平静。  
PR 侧共有 3 条更新，全部处于已合并/关闭状态，主要集中在 **Library 稳定性修复、Cowork LLM 用量追踪、Office/Artifact 交互体验优化** 三个方向。  
从活跃度看，今日属于 **中等开发活跃、低社区讨论活跃**：维护者/贡献者持续推进功能与质量改进，但没有明显的新用户反馈或争议讨论。  
整体健康度较好，近期工作重点偏向产品可观测性、AI 调用成本透明化，以及编辑器体验打磨。

---

## 2. 项目进展

### PR #2815｜修复 Library 监听已删除 artifact 目录导致的启动报错

- 链接：https://github.com/netease-youdao/LobsterAI/pull/2815  
- 状态：CLOSED  
- 作者：fisherdaddy  
- 涉及模块：`main` / Library  
- 类型：Bug Fix / 稳定性改进  

该 PR 修复了 Library 在启动时尝试监听已被删除的 artifact 目录而持续报错的问题。根据 PR 摘要，用户机器上曾出现每个已删除目录都会输出一次：

```text
[Library] Unable to watch an indexed artifact directory.
Error: Directory watcher setup failed (ENOENT)
```

的问题，且错误不会自动消失。

本次修复的价值主要体现在：

- 避免启动阶段反复打印无效目录监听错误；
- 跳过已删除 artifact 目录，减少无意义 watcher 初始化；
- 清理或淘汰过期的 missing items，降低 Library 索引状态长期脏数据风险；
- 改善长期使用后本地数据残留导致的稳定性问题。

这是一个偏底层但重要的稳定性修复，说明项目正在处理长期运行场景下的本地资源管理问题。

---

### PR #2814｜Cowork 支持 LLM 请求追踪与每轮用量展示

- 链接：https://github.com/netease-youdao/LobsterAI/pull/2814  
- 状态：CLOSED  
- 作者：Mind-Hand  
- 涉及模块：`renderer`、`docs`、`main`、`openclaw`、`cowork`  
- 类型：Feature / 可观测性 / 用量透明化  

该 PR 将 `feat/llm-turn-usage` 合入 `release/2026.9.24`，核心目标是在 Cowork 每轮回复中展示实际积分消耗，并支持查看模型请求、Token、缓存命中率和 Trace ID 明细。

主要改动包括：

- 为每轮对话生成并持久化 W3C Trace ID；
- 通过 OpenClaw `chat.send` 与本地模型代理传递 `traceparent`；
- 打通客户端日志、服务端请求日志和用量账本之间的关联；
- 展示每轮 LLM 调用的实际积分消耗；
- 支持查看 Token、缓存命中率、模型请求和 Trace ID 等明细；
- 补充版本限定的 OpenClaw Gateway Client 补丁。

该 PR 对项目推进意义较大。它不仅提升了用户对 AI 使用成本的感知，也增强了开发者排查 LLM 调用链路问题的能力。对于个人 AI 助手类产品来说，**“一次回答到底消耗了多少、为什么消耗这么多、调用链路是否命中缓存”** 是非常关键的信任建设能力。

---

### PR #2813｜Office PowerPoint 编辑器默认显示缩略图栏并优化紧凑布局

- 链接：https://github.com/netease-youdao/LobsterAI/pull/2813  
- 状态：CLOSED  
- 作者：fisherdaddy  
- 涉及模块：`renderer`、`docs`、`artifacts`  
- 类型：Feature / UX 优化  

该 PR 优化了 artifact 面板中的 PowerPoint 编辑器体验。根据摘要，原先幻灯片缩略图列表固定宽度为 184px，占用了默认 560px 面板中超过三分之一的空间，导致主幻灯片显示区域较小。同时，6px 滚动条还会造成水平滚动条出现，并裁剪缩略图右边缘。

本次改动重点包括：

- 默认显示 slide thumbnails pane；
- 引入更紧凑、可折叠的 header；
- 优化缩略图栏宽度占比；
- 减少滚动条对布局的干扰；
- 改善 PowerPoint artifact 在窄面板中的可用性。

该 PR 体现出 LobsterAI 正在持续强化 artifact 编辑体验，尤其是面向 Office/PPT 这类结构化内容生成与编辑场景的交互细节。

---

## 3. 社区热点

今日没有 Issue 更新，3 个 PR 的评论数均未提供或为 `undefined`，点赞数均为 0，因此没有明显由社区讨论驱动的热点议题。

不过从 PR 内容本身看，今日值得关注的隐性热点有两个：

### 1）AI 调用成本透明化

- 相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2814  

Cowork 每轮展示积分消耗、Token、缓存命中率和 Trace ID，反映出项目正在回应 AI 产品中的典型诉求：

- 用户希望知道每次 AI 回复的真实成本；
- 开发者需要定位一次请求在客户端、网关、模型代理、服务端账本中的完整路径；
- 产品需要建立更强的计费可信度和可解释性。

这类能力通常会成为 AI 助手产品从“可用”走向“可运营、可审计”的关键基础设施。

### 2）本地 artifact 生命周期管理

- 相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2815  

Library 对已删除 artifact 目录持续报错，说明长期使用后本地索引、文件系统状态和 watcher 状态之间可能存在不一致。该问题虽然不是功能性大需求，但会直接影响用户对桌面端稳定性的感受。

---

## 4. Bug 与稳定性

### 高优先级：Library 启动时监听已删除目录导致重复 ENOENT 报错

- 相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2815  
- 状态：已有修复 PR，当前 CLOSED  
- 严重程度：高  
- 影响范围：长期使用 Library / artifact 功能且删除过本地目录的用户  

问题表现为启动时针对已删除的 indexed artifact directory 重复尝试建立 watcher，导致日志中持续出现 `ENOENT` 错误。该问题可能不会直接阻断用户使用，但会造成：

- 启动日志污染；
- 错误堆栈反复出现；
- 潜在性能浪费；
- 用户误以为 Library 或 artifact 数据损坏；
- 长期数据状态不一致。

修复方向是跳过已删除目录，并清理过期 missing items。该修复对提升桌面端长期运行稳定性有实际价值。

---

### 中优先级：PowerPoint artifact 面板布局导致内容空间不足与缩略图裁剪

- 相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2813  
- 状态：已有改进 PR，当前 CLOSED  
- 严重程度：中  
- 影响范围：使用 artifact 面板编辑 PowerPoint 的用户  

该问题偏 UX 与可用性，不属于崩溃或数据损坏问题，但会明显影响用户编辑效率。原固定 184px 缩略图栏在默认 560px 面板中过宽，导致主编辑区域受挤压，同时滚动条引发的水平滚动和裁剪问题会降低视觉质量。

修复后应能提升 PPT artifact 的浏览和编辑体验。

---

### 中优先级：LLM 请求链路缺乏可追踪性和用量明细

- 相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2814  
- 状态：已有功能 PR，当前 CLOSED  
- 严重程度：中  
- 影响范围：Cowork 用户、调试 LLM 请求的开发者、关注积分消耗的用户  

这不是传统 Bug，但属于产品可观测性缺口。缺乏 per-turn usage 与 Trace ID 时，用户和维护者很难回答以下问题：

- 某轮回复消耗了多少积分；
- 请求是否命中缓存；
- Token 消耗是否异常；
- 客户端日志和服务端账本如何对应；
- 某次失败或异常响应对应哪条模型请求。

该 PR 对减少后续排障成本和提升用户信任有直接作用。

---

## 5. 功能请求与路线图信号

今日没有新的 Issue，因此没有直接来自用户的新功能请求。不过从已关闭 PR 可以观察到以下路线图信号。

### 1）Cowork 正在增强“可解释用量”能力

- 相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2814  

每轮展示积分消耗、Token、缓存命中率和 Trace ID，说明 Cowork 可能会继续向以下方向演进：

- 更细粒度的 AI 使用账单；
- 会话级、任务级成本统计；
- 模型调用质量分析；
- 请求失败或异常成本的追踪；
- 面向用户和开发者的调试面板；
- 与 OpenClaw Gateway 的更深度集成。

这类能力很可能被纳入后续版本，因为它已经进入 `release/2026.9.24` 相关分支。

---

### 2）Artifact/Office 编辑体验持续增强

- 相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2813  

PowerPoint 缩略图栏优化说明 LobsterAI 不只是生成内容，也在打磨生成后编辑体验。未来可能继续出现：

- PPT 多页导航优化；
- artifact 面板自适应布局；
- Office 文档编辑器的移动/窄屏体验优化；
- 缩略图、目录、页面导航等辅助区域的可折叠设计；
- 生成内容与人工编辑之间的更顺滑衔接。

---

### 3）本地 Library 与 artifact 生命周期治理会继续加强

- 相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2815  

跳过已删除目录和清理 missing items，说明项目开始处理本地索引与真实文件状态不一致的问题。后续可能继续补强：

- artifact 丢失检测；
- 本地索引自动修复；
- 已删除文件的 UI 提示；
- 批量清理无效记录；
- Library 健康检查工具；
- watcher 生命周期管理优化。

---

## 6. 用户反馈摘要

今日没有新的 Issue 和评论，因此无法提炼直接的用户反馈。但从 PR 摘要中可以间接看出以下真实痛点。

### 痛点 1：长期使用后本地 Library 容易积累无效路径

- 相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2815  

用户删除 artifact 文件夹后，Library 仍保留索引并在启动时尝试监听，造成重复错误。该场景说明用户可能会频繁移动、删除或清理本地生成内容，项目需要具备更强的自愈能力。

### 痛点 2：AI 积分消耗需要更透明

- 相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2814  

用户不仅关心 AI 是否回答成功，也关心每轮回答的实际消耗。尤其在 Cowork 这类多轮协作场景中，如果缺乏每轮成本明细，用户很难判断消耗是否合理。

### 痛点 3：PPT artifact 在默认面板宽度下编辑空间不足

- 相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2813  

默认 560px 面板中，固定 184px 缩略图栏过宽，影响主幻灯片查看和编辑。这说明 artifact 编辑器需要针对默认桌面布局进行更细致的空间管理。

---

## 7. 待处理积压

根据今日提供的数据：

- 过去 24 小时无 Issue 更新；
- 无长期未响应 Issue 数据；
- 无待合并 PR；
- 今日 3 条 PR 均为 CLOSED；
- 无新版本发布。

因此，当前无法识别具体的长期积压 Issue 或 PR。

不过建议维护者关注以下潜在积压方向：

1. **Library 无效索引清理的后续验证**  
   - 相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2815  
   - 建议确认修复后是否覆盖文件夹被删除、移动、权限变化、磁盘卸载等场景。

2. **Cowork 用量追踪的用户可理解性**  
   - 相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2814  
   - 建议关注用户是否能理解积分、Token、缓存命中率、Trace ID 等指标，避免调试信息过多影响普通用户体验。

3. **Office artifact 面板布局在不同窗口尺寸下的适配**  
   - 相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2813  
   - 建议继续验证窄屏、宽屏、多页 PPT、大量缩略图等场景。

---

## 总体健康度评估

今日 LobsterAI 项目表现为 **开发侧持续推进、社区侧较安静**。没有新 Issue 和 Release，说明外部反馈压力不高；3 条已关闭 PR 覆盖稳定性、可观测性和体验优化，显示项目仍在积极打磨核心产品能力。

其中，PR #2814 对 Cowork 的 LLM 请求追踪和 per-turn usage 展示最具战略意义，有助于提升 AI 助手产品的成本透明度和可调试性。PR #2815 则针对长期使用场景修复本地 Library 状态不一致问题，是提升桌面端稳定性的重要补丁。整体来看，项目处于健康维护状态，短期重点可能集中在 **AI 调用透明化、artifact 编辑体验、本地资源生命周期治理** 三条线上。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报  
**日期：2026-10-09**  
**仓库：** [moltis-org/moltis](https://github.com/moltis-org/moltis)

---

## 1. 今日速览

过去 24 小时，Moltis 项目整体活跃度较低，仅有 **1 条新 Issue 更新**，没有 Pull Request 更新，也没有新版本发布。今日新增讨论主要来自外部模型网关 / Provider 生态集成方向，说明 Moltis 的 `moltis-providers` 层正在吸引第三方兼容服务关注。当前没有发现 Bug、崩溃或回归类问题报告，短期稳定性信号较平稳。由于今日无 PR 合并，代码层面暂无可见推进，项目进展主要体现在潜在集成需求收集上。

---

## 2. 项目进展

过去 24 小时内没有新的 Pull Request 被创建、合并或关闭。

- 今日合并 PR：0
- 今日关闭 PR：0
- 待合并 PR：0

因此，今日项目在代码实现、功能修复或架构演进方面暂无直接推进。不过新增 Issue 指向 Provider 接入路径验证，可能为后续 Provider 配置、文档或预设能力带来改进机会。

---

## 3. 社区热点

### [Issue #1296：Test an A2Agent profile through Moltis provider setup](https://github.com/moltis-org/moltis/issues/1296)

- **状态：** Open
- **作者：** A2agent-ai
- **创建时间：** 2026-10-09
- **评论数：** 0
- **👍 反应数：** 0

该 Issue 是今日唯一新增 / 活跃讨论，来自 A2Agent 团队。A2Agent 表示其是一个兼容 OpenAI 与 Anthropic API 的模型网关，希望验证在 Moltis 中接入 A2Agent 的最小可行路径。

从摘要看，诉求主要集中在两点：

1. **是否可以通过自定义 endpoint 完成接入**
2. **如果不够，是否需要增加一个轻量级 provider preset**

这反映出 Moltis 的 Provider 抽象已经具备被外部服务集成的价值，但也可能说明当前接入路径、Provider 预设机制或文档说明还不够清晰。若维护者确认 A2Agent 可通过现有自定义 endpoint 接入，则后续可能只需要文档补充；若需要 provider preset，则可能演化为一个新的集成型功能请求。

---

## 4. Bug 与稳定性

今日没有新的 Bug、崩溃、回归或稳定性问题报告。

| 严重程度 | Issue | 状态 | 是否已有 Fix PR |
|---|---|---|---|
| - | 无 | - | - |

从过去 24 小时数据看，Moltis 没有出现明显的稳定性风险信号。不过由于今日整体活跃度较低，不能仅凭当天数据判断长期稳定性。

---

## 5. 功能请求与路线图信号

### Provider / 模型网关接入能力

- **相关 Issue：** [#1296](https://github.com/moltis-org/moltis/issues/1296)
- **方向：** A2Agent 与 Moltis Provider setup 集成验证
- **潜在类型：** 功能请求 / 集成请求 / 文档改进请求
- **可能影响范围：**
  - `moltis-providers` 层
  - Provider onboarding flow
  - 自定义 endpoint 配置体验
  - 第三方模型网关兼容性文档
  - 可能新增 A2Agent provider preset

该 Issue 暗示用户希望 Moltis 能更容易接入 OpenAI / Anthropic 兼容的第三方模型服务。这类需求通常具有较强路线图价值，因为它关系到 Moltis 的生态扩展能力和模型供应商兼容性。

目前没有相关 PR，因此尚无法判断该能力是否会进入下一版本。但如果维护者确认接入成本较低，后续最可能出现的推进形式包括：

1. 文档新增 A2Agent 接入示例；
2. 增加 provider preset；
3. 改进自定义 endpoint 配置说明；
4. 增强兼容 OpenAI / Anthropic API 网关的测试覆盖。

---

## 6. 用户反馈摘要

今日用户反馈主要来自 A2Agent 团队，反馈内容偏向集成验证而非普通终端用户体验。

### 真实使用场景

A2Agent 希望将其 OpenAI / Anthropic 兼容模型网关接入 Moltis，通过 Moltis 的 Provider 设置流程验证最小可行配置路径。

### 用户痛点

从 Issue 摘要可提炼出以下潜在痛点：

- 不确定 Moltis 是否仅通过自定义 endpoint 即可完成第三方网关接入；
- 不确定是否需要官方维护一个 provider preset；
- Provider onboarding flow 的边界和推荐路径可能需要更明确说明；
- 第三方服务希望获得维护者确认，以避免自行适配时走错实现方向。

### 满意 / 不满意信号

当前 Issue 没有评论和反应，尚无明确满意或不满意反馈。不过该请求语气较合作，说明外部生态方对 Moltis 的 Provider 架构有接入兴趣。

---

## 7. 待处理积压

基于本次提供的数据，仅能观察过去 24 小时的 Issues / PR 活动，未包含长期未响应 Issue 或 PR 的完整列表。因此无法可靠识别长期积压项。

今日需要维护者关注的新积压入口是：

### [Issue #1296：Test an A2Agent profile through Moltis provider setup](https://github.com/moltis-org/moltis/issues/1296)

- **当前状态：** Open
- **评论数：** 0
- **建议优先级：** 中
- **原因：**
  - 涉及 Provider 生态扩展；
  - 可能影响第三方模型网关接入体验；
  - 响应成本可能较低，但对外部集成方价值较高。

建议维护者尽快确认：

1. A2Agent 是否可通过现有 custom endpoint 完成配置；
2. 是否接受新增 provider preset；
3. 是否需要对 provider onboarding 文档进行补充；
4. 是否需要 A2Agent 提供测试 endpoint、API 兼容性说明或最小配置样例。

---

## 健康度评估

| 维度 | 今日状态 | 评价 |
|---|---|---|
| Issue 活跃度 | 1 条新增 / 更新 | 较低 |
| PR 活跃度 | 0 条 | 低 |
| 发布节奏 | 无新版本 | 平稳 |
| Bug 风险 | 无新增 Bug | 稳定 |
| 社区生态信号 | 有第三方 Provider 集成请求 | 正向 |
| 维护压力 | 低 | 可控 |

**综合判断：** Moltis 今日处于低活跃但稳定状态。没有代码层面的推进，也没有明显稳定性风险。唯一值得关注的是 A2Agent 提出的 Provider 接入验证请求，这可能成为 Moltis 扩展模型服务生态和优化 Provider onboarding 体验的一个小而重要的切入点。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报｜2026-10-09

> 数据窗口：过去 24 小时  
> 备注：本次输入数据中的 Issue/PR 链接指向 `agentscope-ai/QwenPaw`，以下按数据来源生成 GitHub 链接。

---

## 1. 今日速览

过去 24 小时项目活跃度较高：Issue 更新 12 条，其中 10 条仍处于 Open，2 条已关闭；PR 更新 14 条，其中 10 条仍待合并，4 条已关闭。  
今日没有新版本发布，说明当前主要处于 **问题修复、体验打磨与下一版本功能准备阶段**。  
社区反馈集中在 Console 稳定性、HTTP 非安全源兼容、图片/媒体处理、聊天记录与上下文管理、性能优化等方向。  
整体看，项目维护响应较快：多个当天报告的问题已出现对应修复 PR，尤其是 Console 崩溃、图片 EXIF 方向、GPU 性能消耗等问题已有明确推进。  
健康度评估：**活跃且响应积极，但待合并 PR 较多，短期需要加强合并节奏与回归验证。**

---

## 2. 项目进展

今日无新版本发布，但多个修复和体验优化 PR 已关闭或进入待合并状态，项目主要在稳定性、Console 体验、插件化和评测基础设施方向推进。

### 已关闭 / 已完成的重要 PR

#### PR #8146：修复 HTTP Origin 下终端 UUID 导致的 Console 崩溃  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8146  
关联 Issue：  
- https://github.com/agentscope-ai/QwenPaw/issues/8147  
- https://github.com/agentscope-ai/QwenPaw/issues/8073  

该 PR 处理了在 LAN、Tailscale 等非安全 HTTP Origin 下，`crypto.randomUUID()` 不可用导致 Chat 页面崩溃的问题。修复方式是在原生 UUID 可用时继续使用，否则回退到 `crypto.getRandomValues()` 生成 UUID v4。

影响：  
- 直接修复了 Console 切换 Agent 后崩溃的问题。  
- 提升了局域网部署、远程访问、内网环境使用时的稳定性。  
- 对桌面/自部署用户价值较高。

#### PR #8144：同类 HTTP Origin UUID 修复  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8144  

该 PR 与 #8146 方向一致，均针对 `crypto.randomUUID()` 在非安全上下文中不可用的问题。结合状态看，#8146 可能是后续修正版或替代实现。

#### PR #8141：修复 QwenPaw-Data 发布构建的类型依赖问题  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8141  

该 PR 移除了 QwenPaw-Data 发布构建中对 Console 源码树的类型依赖，避免 release job 在仅安装插件 UI 依赖时无法解析 `react` 的问题。

影响：  
- 提升插件或数据模块的发布可靠性。  
- 减少包间不必要耦合。  
- 对后续插件化和模块化发布有正向意义。

#### PR #8127：优化桌面端设置页面 UI  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8127  

该 PR 统一了桌面端 Settings / Models 页面 header 样式，使其与 Agents、Safety 等设置页面一致，并限制 header overlay 的作用范围。

影响：  
- 改善 Console 桌面端视觉一致性。  
- 属于 UI 体验细节打磨。

---

### 今日仍在推进的重点 PR

#### PR #8137：新增官方 “Reduced Effects” 低特效模式  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8137  
关联 Issue：https://github.com/agentscope-ai/QwenPaw/issues/8135  

该 PR 为 Appearance & Language 增加官方低特效层级，用于降低 Console 中大面积 `backdrop-filter`、玻璃态和装饰动画带来的 GPU 负载。

判断：  
这是今日最具产品价值的体验优化之一，尤其面向 iGPU、低功耗设备、远程桌面和长时间运行场景。

#### PR #8136：图片缩放时保留 EXIF 方向  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8136  
关联 Issue：https://github.com/agentscope-ai/QwenPaw/issues/8129  

该 PR 在图片缩放前应用 EXIF orientation，避免 JPEG 图片发送到模型时方向错误。

判断：  
这是一个较清晰的模型输入质量 bug 修复，适合优先合并。

#### PR #8138：修复非安全 HTTP Origin 下剪贴板复制不可用  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8138  
关联 Issue：https://github.com/agentscope-ai/QwenPaw/issues/8073  

该 PR 处理 `navigator.clipboard` 在非安全上下文中不可用的问题，与 UUID 崩溃修复同属自部署/局域网访问兼容性问题。

判断：  
如果 #8146 已解决崩溃，#8138 将进一步补齐 HTTP Origin 使用体验。

#### PR #8128：将 Skill Hub 迁移到插件体系  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8128  

该 PR 增加 `hub` 插件类型和 `PluginApi.register_market_provider()`，让 Skill Market 来源不再硬编码，而是可通过插件安装和移除。

判断：  
这是架构层面的重要功能推进，说明项目正在强化生态扩展能力。

#### PR #8132：新增 Release Evaluation Workflows 和 QwenPaw Index  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8132  

该 PR 体量为 XXXL，涉及 GAIA、SpreadsheetBench Verified、SWE-bench Verified 等评测流程，以及公开模型/SDK 评估索引。

判断：  
这是面向发布质量、模型能力评估和项目可信度建设的重大基础设施 PR。由于体量很大，需要重点关注 CI、权限、Secrets、评测成本和可维护性。

---

## 3. 社区热点

### Issue #8134：聊天记录与大模型上下文窗口关联问题  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8134  
状态：Open  
评论数：10  

这是今日评论最多的 Issue。用户反馈“聊天记录说没就没了”，并明确认为聊天历史不应与模型上下文窗口直接绑定。

背后诉求：  
- 用户希望聊天记录作为长期持久化数据，而不是受 LLM 上下文窗口影响。  
- 需要更清晰地区分：  
  1. UI 中可查看的历史记录  
  2. 实际发送给模型的上下文窗口  
  3. 压缩/摘要后的长期记忆  
- 当前行为可能让用户产生“数据丢失”的强烈不安全感。

优先级判断：高。  
原因：这类问题影响用户信任，尤其是个人 AI 助手场景中，聊天记录持久性是核心体验。

---

### Issue #8135：Console GPU 占用过高，建议官方低特效模式  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8135  
状态：Open  
对应 PR：https://github.com/agentscope-ai/QwenPaw/pull/8137  

用户指出 Console 即使静置也会保持较高 GPU 活跃度，尤其在集显设备上明显。问题被定位到大面积玻璃态、`backdrop-filter` 半径、装饰层和流式输出时的逐帧重绘。

背后诉求：  
- 希望官方提供性能优先模式。  
- 希望 Console 在低配设备、笔记本、电池供电、远程桌面环境下更轻量。  
- 用户不是单纯要求“去掉美观”，而是希望可配置的视觉性能分层。

项目响应：较快，已有 PR #8137。  
优先级判断：中高。

---

### Issue #8150：飞书入站图文混发时图片被静默丢弃  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8150  
状态：Open  

用户报告 Feishu rich-text `post` 消息中，文字可以传给 Agent，但内嵌图片不会下载，也没有任何 warning 日志。

背后诉求：  
- 多模态 Agent 需要可靠接收企业 IM 中的图文混合消息。  
- “静默丢弃”比显式报错更危险，因为用户和开发者都不容易发现数据缺失。  
- 飞书通道需要更完整的 inbound media 支持和日志提示。

优先级判断：中高。  
尤其对企业集成、工单、群聊机器人、多模态工作流场景影响较大。

---

### Issue #8148：大上下文模型下 reasoning fold / microcompaction 不触发  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8148  
状态：Open  

用户指出压缩阈值基于 provider 声明的 `context_size`，导致在大上下文模型中，请求可能达到 100K–200K tokens，但 reasoning fold 和 microcompaction 仍不触发。

背后诉求：  
- 不应只根据模型最大上下文判断压缩压力。  
- 用户关心真实请求成本、延迟、推理链冗余和上下文污染。  
- 大上下文模型也需要主动压缩策略，而不是等到接近最大窗口才处理。

优先级判断：中高。  
该问题与成本控制、长会话质量和响应速度密切相关。

---

## 4. Bug 与稳定性

以下按严重程度和用户影响排序。

### P0 / P1：Console 切换 Agent 后崩溃  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/8147  
状态：Closed  
修复 PR：https://github.com/agentscope-ai/QwenPaw/pull/8146  

问题：  
在 v2.2.2b4 中，切换 Agent 后 Console 显示“页面出现异常”，浏览器控制台报错 `crypto.randomUUID is not a function`。

影响：  
- 直接阻断 Chat 页面使用。  
- 在 HTTP Origin、LAN、Tailscale 等访问方式下风险较高。  

修复状态：已有关闭 PR #8146，Issue 已关闭。  
建议：在下一版本 changelog 中明确说明该修复，提醒自部署用户升级。

---

### P1：聊天记录疑似丢失 / 与上下文窗口绑定  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/8134  
重复 Issue：https://github.com/agentscope-ai/QwenPaw/issues/8131  
状态：#8134 Open，#8131 Closed  

问题：  
用户反馈聊天记录消失，并质疑其与大模型上下文窗口的关联设计。

影响：  
- 影响用户对数据持久性的信任。  
- 如果确实存在历史记录清理、摘要、截断策略不透明的问题，需要产品层说明和技术层修复。  

修复状态：暂无对应 PR。  
建议：  
- 先确认是 UI 展示丢失、数据库持久化问题、会话裁剪策略，还是上下文压缩逻辑导致。  
- 增加用户可见提示：哪些内容会保留为历史，哪些只进入模型上下文。  
- 若涉及自动清理，应增加配置项和恢复机制。

---

### P1：飞书入站图文消息中的图片被静默丢弃  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/8150  
状态：Open  
修复 PR：暂无  

问题：  
Feishu `post` 富文本消息中内嵌图片未被下载，且没有 warning。

影响：  
- 企业 IM 场景下会造成输入信息缺失。  
- 对多模态 Agent、审批、截图分析、工单处理等场景影响明显。  

建议：  
- 至少先增加 warning 日志，避免静默丢弃。  
- 后续支持 Feishu inbound 图片下载、临时文件管理和多模态消息结构传递。

---

### P1 / P2：大上下文模型下压缩机制不触发  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/8148  
状态：Open  
修复 PR：暂无  

问题：  
reasoning fold 和 pressure microcompaction 基于 provider 声明的 `context_size`，大窗口模型下不易触发。

影响：  
- 高 token 成本。  
- 长会话响应变慢。  
- 推理内容堆积，可能降低回答质量。  

建议：  
引入独立的软阈值，例如基于实际 token 数、成本预算、会话轮数或用户配置触发压缩。

---

### P2：图片缩放导致 EXIF 方向丢失  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/8129  
状态：Open  
修复 PR：https://github.com/agentscope-ai/QwenPaw/pull/8136  

问题：  
当 `QWENPAW_MAX_IMAGE_PIXELS` 触发图片缩放时，带 EXIF orientation 的 JPEG 会以错误方向发送给模型。

影响：  
- 模型看到的图像方向错误，可能导致识别和推理结果错误。  
- 对手机拍照上传场景影响较大。  

修复状态：已有 PR #8136，建议优先合并。

---

### P2：Console SVG width/height 接收到非数值 `small`  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/8143  
状态：Open  
修复 PR：暂无  

问题：  
Console 日志中反复出现：  
`<svg> attribute width: Expected length, "small"`  
`<svg> attribute height: Expected length, "small"`

影响：  
- 可能不阻断功能，但造成错误日志污染。  
- 会降低开发者排查真实问题的效率。  

建议：  
检查 Button size prop 与 Icon/SVG size prop 的类型映射，避免直接透传 `"small"` 到 SVG width/height。

---

### P2：非安全 HTTP Origin 下剪贴板复制不可用  
PR：https://github.com/agentscope-ai/QwenPaw/pull/8138  
关联 Issue：https://github.com/agentscope-ai/QwenPaw/issues/8073  
状态：PR Open  

问题：  
在 LAN IP、Tailscale IP 等非 localhost HTTP 部署场景中，浏览器不暴露 `navigator.clipboard`。

影响：  
- 自部署用户复制内容失败。  
- 与 UUID 崩溃问题属于同一类 Web 安全上下文兼容问题。  

修复状态：已有 PR #8138，建议与 #8146 形成一组回归测试。

---

## 5. 功能请求与路线图信号

### 低特效 / Reduced Effects 模式  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/8135  
PR：https://github.com/agentscope-ai/QwenPaw/pull/8137  

信号：  
Console 正在从“视觉优先”走向“视觉与性能可配置”。这对桌面端、低配设备和长期运行场景非常重要。

纳入下一版本可能性：高。  
原因：已有实现 PR，问题定义清晰，用户价值明确。

---

### You.com 作为无 Key Web Search Provider  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/8139  

用户建议为 `web_search` 增加 You.com 作为可选后端，特点是无需 API Key、无需注册即可使用，每天 100 次免费搜索，Key 可选填。

信号：  
用户希望搜索能力更开箱即用，降低配置门槛。

纳入下一版本可能性：中。  
原因：需求清晰，但涉及第三方服务稳定性、限流、合规、默认后端策略和维护责任，需要维护者评估。

---

### Skill Pool 下载改为可取消后台任务  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/8126  

用户指出当前 `POST /pool/download` 虽然通过 #8055 避免 event-loop freeze，但请求仍是同步等待，大型 skill 可能触发客户端 30 秒超时。建议改为后台任务，支持进度和显式取消。

信号：  
Skill 生态正在变复杂，下载、安装、取消、进度反馈需要任务化。

纳入下一版本可能性：中高。  
原因：与插件化 Skill Hub 的 PR #8128 方向一致，可能成为 Skill 系统体验升级的一部分。

---

### Skill Hub 插件化  
PR：https://github.com/agentscope-ai/QwenPaw/pull/8128  

信号：  
项目正在把 Skill Market 从硬编码来源转向插件扩展点，便于第三方市场、自定义企业内部市场、私有技能仓库接入。

纳入下一版本可能性：中高。  
原因：已有大型 PR，但体量较大，需要充分测试。

---

### Release Evaluation Workflows 与 QwenPaw Index  
PR：https://github.com/agentscope-ai/QwenPaw/pull/8132  

信号：  
项目开始建设更系统的发布评测能力，包括 GAIA、SpreadsheetBench Verified、SWE-bench Verified 等。这说明维护团队可能希望将模型/SDK/Agent 能力指标纳入发布流程。

纳入下一版本可能性：中。  
原因：PR 体量 XXXL，涉及 CI、Secrets、外部评测和发布流程，合并前需要较严格审查。

---

### 从 Tauri2 切换到 Electron 以增强 Linux / 麒麟 V10 兼容性  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/8142  

用户指出麒麟 V10 桌面系列不支持 Tauri2，建议切换到 Electron。

信号：  
国产 Linux 桌面、政企环境兼容性正在成为用户关注点。

纳入下一版本可能性：低到中。  
原因：从 Tauri2 切换到 Electron 是重大架构决策，涉及包体积、性能、安全、维护成本和跨平台策略。更现实的短期方案可能是提供兼容性说明、替代构建或 Web 部署方案。

---

### README 更新请求  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/8140  

用户提出更新 README。

信号：  
项目文档可能与当前能力、安装方式或使用方式存在脱节。

纳入下一版本可能性：中。  
原因：实现成本低，但需要维护者明确 README 的更新范围。

---

## 6. 用户反馈摘要

### 用户最强烈的不满：聊天记录不可预期  
代表 Issue：https://github.com/agentscope-ai/QwenPaw/issues/8134  

用户表达非常强烈，核心不是单纯 bug，而是对“历史记录是否安全保存”的信任问题。  
在个人 AI 助手场景中，用户通常默认聊天历史是长期资产，而不是模型上下文的一部分。若产品没有清楚区分“历史记录”和“上下文窗口”，容易造成误解和不满。

建议：  
- 在 UI 中说明上下文裁剪、历史记录保存、记忆压缩之间的关系。  
- 增加历史导出、恢复、备份或保留策略配置。  
- 对自动清理行为提供显式提示。

---

### 自部署用户对 HTTP / LAN / Tailscale 场景兼容性敏感  
相关 PR：  
- https://github.com/agentscope-ai/QwenPaw/pull/8146  
- https://github.com/agentscope-ai/QwenPaw/pull/8138  

用户场景包括 LAN IP、Tailscale IP、普通 HTTP Origin 等。这类场景下浏览器 API 限制会导致 UUID、Clipboard 等能力不可用。  
项目已经开始系统修复，说明自部署用户是当前重要用户群。

建议：  
建立一组 “insecure origin compatibility” 回归测试，覆盖：  
- UUID 生成  
- Clipboard 复制  
- 文件上传/下载  
- WebSocket / SSE  
- Local storage / IndexedDB  
- 浏览器权限 API

---

### 企业 IM / 飞书集成用户需要完整多模态输入  
代表 Issue：https://github.com/agentscope-ai/QwenPaw/issues/8150  

用户对 Feishu 入站图文混发的期望是：文字和图片都能进入 Agent，并且任何无法处理的媒体都应有日志或提示。  
这说明企业集成场景中，消息完整性比单纯文本处理更重要。

建议：  
优先避免静默丢弃，再逐步完善图片下载、鉴权、缓存、生命周期管理和多模态 message schema。

---

### 性能敏感用户希望 Console 可降级  
代表 Issue：https://github.com/agentscope-ai/QwenPaw/issues/8135  
对应 PR：https://github.com/agentscope-ai/QwenPaw/pull/8137  

用户并非反对美观 UI，而是希望在集显、低功耗、远程桌面、长时间挂载场景中减少 GPU 持续占用。  
官方 Reduced Effects 模式是合理方向。

---

### 多模态用户关注输入图片真实性  
代表 Issue：https://github.com/agentscope-ai/QwenPaw/issues/8129  
对应 PR：https://github.com/agentscope-ai/QwenPaw/pull/8136  

图片 EXIF 方向问题说明用户正在使用真实手机照片、截图、拍照上传等多模态工作流。  
模型输入前的预处理需要尽量保持视觉语义一致。

---

## 7. 待处理积压

> 由于本日报仅基于过去 24 小时数据，无法完整判断“长期未响应”状态。以下列出当前窗口内值得维护者优先关注、但仍未解决或体量较大的事项。

### 高优先级待处理

#### Issue #8134：聊天记录与上下文窗口关联  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8134  
原因：评论最多，用户情绪强烈，影响信任。  
建议：尽快由维护者给出设计解释、复现路径或修复计划。

#### Issue #8150：飞书入站图文混发图片静默丢弃  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8150  
原因：静默丢弃数据风险较高，企业集成场景影响明显。  
建议：短期先补 warning，后续实现图片下载与多模态转发。

#### Issue #8148：大上下文模型下压缩机制不触发  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8148  
原因：涉及成本、延迟和长会话质量。  
建议：评估引入软阈值和用户可配置压缩策略。

---

### 待合并但价值较高的 PR

#### PR #8136：保留 EXIF 图片方向  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8136  
建议：优先合并，风险相对可控，修复明确。

#### PR #8137：Reduced Effects 模式  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8137  
建议：重点验证不同主题、流式输出、低端设备上的实际收益。

#### PR #8138：HTTP Origin 下剪贴板复制修复  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8138  
建议：与 #8146 一并回归，形成非安全上下文兼容性修复集合。

#### PR #8128：Skill Hub 插件化  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8128  
建议：重点审查插件 API 稳定性、安全边界和迁移兼容性。

#### PR #8132：Release Evaluation Workflows 与 QwenPaw Index  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8132  
建议：由于体量 XXXL，建议拆分或至少分阶段合并，降低发布流程风险。

---

## 总体健康度判断

今日 CoPaw/QwenPaw 生态表现出较高活跃度：问题反馈密集，修复 PR 跟进迅速，尤其是 Console 崩溃、HTTP 自部署兼容、图片处理和性能优化方向都有实质推进。  
短期风险在于：Open PR 数量较多，且包含多个大体量 PR，若合并节奏和回归测试不足，可能引入新的稳定性问题。  
建议维护团队近期优先处理三类事项：  
1. **用户信任类问题**：聊天记录持久化与上下文机制说明。  
2. **稳定性类问题**：Console 崩溃、HTTP Origin、媒体输入完整性。  
3. **即将进入下一版本的体验优化**：Reduced Effects、EXIF 修复、Skill Hub 插件化。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报  
日期：2026-10-09  
仓库：[`zeroclaw-labs/zeroclaw`](https://github.com/zeroclaw-labs/zeroclaw)

---

## 1. 今日速览

过去 24 小时，ZeroClaw 维持了较高开发活跃度：新增或更新 Issues 7 条，PR 更新 11 条，且全部仍处于 open 状态，暂无合并、关闭或新版本发布。今日焦点明显集中在 **ZeroCode 交互可靠性**、**运行时/Agent steering 机制**、**配置与日志稳定性**、以及 **OpenAI-compatible provider 兼容性**。  
从健康度看，项目响应速度较快：多个当天报告的问题已经出现对应修复 PR，例如 ZeroCode 丢消息、ask_user 超时、配置内存泄漏等，说明维护链路较活跃。但当前 11 个 PR 均未合并，短期内仍存在用户可见的稳定性风险，尤其是 ZeroCode 会话交互和 S1 级别的 Telegram/config 问题。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

今日没有已合并或已关闭的 PR，因此主分支尚未获得实质性代码推进。不过，多个待合并 PR 已经覆盖了关键问题，若通过 review，将对下一轮稳定性提升产生明显影响。

### 待合并但值得关注的关键 PR

- [PR #11624 - fix(zerocode): answer dropped elicitations and record them in the transcript](https://github.com/zeroclaw-labs/zeroclaw/pull/11624)  
  关联 [Issue #11623](https://github.com/zeroclaw-labs/zeroclaw/issues/11623)。修复 ZeroCode 中 `ask_user` / `poll` prompt 被客户端清除但未回复 daemon，导致工具等待 600 秒超时的问题。该修复会让被清除的 elicitation 有明确应答，并写入 transcript，改善可审计性与用户体验。

- [PR #11619 - fix(zerocode): requeue a queued message the daemon refused as busy](https://github.com/zeroclaw-labs/zeroclaw/pull/11619)  
  关联 [Issue #11618](https://github.com/zeroclaw-labs/zeroclaw/issues/11618)。修复 ZeroCode 在 daemon 返回 `SESSION_BUSY` 时静默丢弃排队消息的问题。该 PR 将被拒绝的消息重新放回队首，并保留附件。

- [PR #11622 - feat(zerocode): show message times in the transcript](https://github.com/zeroclaw-labs/zeroclaw/pull/11622)  
  关联 [Issue #11620](https://github.com/zeroclaw-labs/zeroclaw/issues/11620)。为 ZeroCode transcript 增加消息时间显示，提升多消息、多工具调用重叠场景下的可追踪性。

- [PR #11621 - feat(zerocode): steer the running turn when you send a message mid-turn](https://github.com/zeroclaw-labs/zeroclaw/pull/11621)  
  利用已有 `session/steer` 能力，使用户在 turn 运行中发送的消息可以优先尝试 steering 当前 turn，而不是等待排队。这是对交互实时性的明显增强。

- [PR #11617 - fix(agent): close the steering channel before a turn finishes](https://github.com/zeroclaw-labs/zeroclaw/pull/11617)  
  修复 streamed turn 接近结束时 steering receiver 未及时关闭的问题，避免 gateway socket 或 `session/steer` 返回“已接受”但实际上不会被消费的误导状态。

- [PR #11616 - fix(config): emit static map-key section paths](https://github.com/zeroclaw-labs/zeroclaw/pull/11616)  
  关联 [Issue #11614](https://github.com/zeroclaw-labs/zeroclaw/issues/11614)。通过在 `Configurable` 宏展开期生成静态字符串路径，消除运行期重复格式化和 `Box::leak` 引发的永久内存增长。

- [PR #11627 - fix(providers): tolerate non-object pricing in OpenAI-compatible model lists](https://github.com/zeroclaw-labs/zeroclaw/pull/11627)  
  针对 xAI `/v1/models` 中 `pricing` 字段可能为数组而非对象的问题，增强 OpenAI-compatible provider 解析兼容性。

- [PR #11629 - fix(log): drain config patch notices before exit](https://github.com/zeroclaw-labs/zeroclaw/pull/11629)  
  修复 `config patch` 启用 verifiable intent 后，进程可能在 persisted notice 写入前退出的问题，提升日志与审计记录可靠性。

- [PR #11630 - test(runtime/tools): fix three tests that misread Windows path spellings](https://github.com/zeroclaw-labs/zeroclaw/pull/11630)  
  修复 Windows nextest advisory job 中与路径拼写相关的测试误判，改善跨平台 CI 稳定性。

整体来看，今日的开发推进主要集中在“修复已知缺陷并提升交互可观测性”，但由于尚未合并，项目实际发布面尚未发生变化。

---

## 4. 社区热点

今日讨论热度整体偏低，Issues 最高评论数为 1，PR 评论数未提供或为 undefined，未出现高赞或大量反应的议题。不过，从问题集中度看，以下方向构成今日热点。

### ZeroCode 交互可靠性成为核心关注点

- [Issue #11623 - ZeroCode drops a pending ask_user prompt without replying](https://github.com/zeroclaw-labs/zeroclaw/issues/11623)  
- [PR #11624 - fix(zerocode): answer dropped elicitations and record them in the transcript](https://github.com/zeroclaw-labs/zeroclaw/pull/11624)

用户痛点是：在 Code pane 中，待处理的 `ask_user` / `poll` prompt 可能被客户端清除，但 daemon 没有收到任何应答，最终导致工具等待 600 秒超时。这类问题对 AI Agent 工作流伤害较大，因为它既让用户误以为 prompt 已消失，又让后端长时间阻塞，并且 transcript 中没有留下完整记录。

### ZeroCode 消息队列与 SESSION_BUSY 处理

- [Issue #11618 - ZeroCode drops a queued message when the daemon refuses it as SESSION_BUSY](https://github.com/zeroclaw-labs/zeroclaw/issues/11618)  
- [PR #11619 - fix(zerocode): requeue a queued message the daemon refused as busy](https://github.com/zeroclaw-labs/zeroclaw/pull/11619)

该问题暴露出 ZeroCode 在多连接或自动化脚本并发访问 session 时的边界行为不足。用户消息被 daemon 拒绝后直接丢失，且是静默丢失，属于明显影响信任感的问题。

### Transcript 可观测性需求上升

- [Issue #11620 - Show message times in the ZeroCode transcript](https://github.com/zeroclaw-labs/zeroclaw/issues/11620)  
- [PR #11622 - feat(zerocode): show message times in the transcript](https://github.com/zeroclaw-labs/zeroclaw/pull/11622)

用户希望在 ZeroCode transcript 中看到消息时间，以判断多条消息、自动 prompt、长耗时工具调用之间的先后关系。这反映出 ZeroClaw 正在被用于更复杂、更长时间的 Agent 会话，用户对审计、诊断和回放能力的要求提高。

### Provider 兼容性与成本统计准确性

- [Issue #11613 - Cost ledger drops provider total_tokens](https://github.com/zeroclaw-labs/zeroclaw/issues/11613)  
- [PR #11627 - fix(providers): tolerate non-object pricing in OpenAI-compatible model lists](https://github.com/zeroclaw-labs/zeroclaw/pull/11627)

OpenAI-compatible provider 生态存在字段差异，尤其是 reasoning tokens、pricing schema 等。今日相关问题显示，ZeroClaw 在多 provider 接入方面仍需增强容错能力和计费准确性。

---

## 5. Bug 与稳定性

以下按影响程度与用户可见性排序。

### S1 / Workflow blocked

#### 1. 配置 schema 路径泄漏导致 daemon 内存增长

- Issue：[ #11614 - map_key_sections leaks schema paths on every call, growing daemon memory](https://github.com/zeroclaw-labs/zeroclaw/issues/11614)  
- 状态：Open  
- 严重程度：S1 - workflow blocked  
- 对应修复 PR：[ #11616 - fix(config): emit static map-key section paths](https://github.com/zeroclaw-labs/zeroclaw/pull/11616)

问题描述：`Configurable::map_key_sections()` 每次调用都会通过 `Box::leak(s.into_boxed_str())` 泄漏新格式化出的 schema path，导致 daemon 内存持续增长。  
影响分析：属于长期运行进程中的资源泄漏问题，尤其对 daemon 型服务影响较大。已有修复 PR 通过宏展开期静态生成路径，方向明确。

#### 2. Telegram 发送路径忽略 429 retry_after，可能导致回复丢失

- Issue：[ #11615 - Telegram send path ignores 429 retry_after](https://github.com/zeroclaw-labs/zeroclaw/issues/11615)  
- 状态：Open  
- 严重程度：S1 - workflow blocked  
- 对应修复 PR：未在今日数据中发现

问题描述：Telegram bot 遇到 HTTP 429 flood limit 时，发送路径忽略 Telegram 返回的 `retry_after`，并立即重试，可能加重限流，最终导致回复完全丢失。  
影响分析：这是明显的外部 channel 可靠性问题，对依赖 Telegram 的用户影响较大。当前尚未看到对应 PR，建议维护者优先处理。

---

### Medium / 用户输入或交互可靠性问题

#### 3. ZeroCode 在 SESSION_BUSY 时丢弃排队消息

- Issue：[ #11618 - ZeroCode drops a queued message when the daemon refuses it as SESSION_BUSY](https://github.com/zeroclaw-labs/zeroclaw/issues/11618)  
- 状态：Open  
- 严重程度：Medium  
- 对应修复 PR：[ #11619](https://github.com/zeroclaw-labs/zeroclaw/pull/11619)

问题描述：当另一个连接正在对同一 session 运行 turn 时，ZeroCode 发送 `session/prompt` 可能收到 `SESSION_BUSY`，但客户端直接丢弃用户消息。  
影响分析：这是“静默数据丢失”类型问题，会显著降低用户对交互系统的信任。修复 PR 已覆盖重新排队逻辑。

#### 4. ZeroCode 清除 pending ask_user/poll 后 daemon 超时

- Issue：[ #11623](https://github.com/zeroclaw-labs/zeroclaw/issues/11623)  
- 状态：Open  
- 对应修复 PR：[ #11624](https://github.com/zeroclaw-labs/zeroclaw/pull/11624)

问题描述：pending elicitation 被 UI 清除但未通知 daemon，导致 daemon 一直等待直到工具超时。  
影响分析：对人机协作流程影响较大，尤其是需要用户确认、选择或补充信息的工具调用。已有 PR 将清除动作转化为明确应答，并写入 transcript。

#### 5. Agent steering channel 关闭时机不正确

- PR：[ #11617 - fix(agent): close the steering channel before a turn finishes](https://github.com/zeroclaw-labs/zeroclaw/pull/11617)  
- 状态：Open  
- 对应 Issue：今日数据中未列出

问题描述：streamed turn 即将完成时 steering receiver 仍处于打开状态，导致发送方收到 `Ok` 或 `accepted: true`，但消息实际可能不会被处理。  
影响分析：该问题会造成 API 或 UI 层的误导性确认，影响实时 steering 语义的可靠性。

---

### 成本、日志与兼容性问题

#### 6. Cost ledger 低估包含 hidden reasoning tokens 的模型用量

- Issue：[ #11613 - Cost ledger drops the provider's total_tokens](https://github.com/zeroclaw-labs/zeroclaw/issues/11613)  
- 状态：Open  
- 对应修复 PR：未在今日数据中发现

问题描述：当 OpenAI-compatible provider 仅在 `total_tokens` 中体现 reasoning/thinking tokens 时，ZeroClaw 丢弃 provider 原始 `total_tokens`，并自行以 input + output 重算，导致成本统计偏低。  
影响分析：影响计费、预算控制和成本审计，尤其是 Gemini via OpenAI-compatible provider 等场景。

#### 7. OpenAI-compatible model list 中 pricing 字段 schema 不一致

- PR：[ #11627 - fix(providers): tolerate non-object pricing in OpenAI-compatible model lists](https://github.com/zeroclaw-labs/zeroclaw/pull/11627)  
- 状态：Open

问题描述：xAI `/v1/models` 返回的 image-generation models 中，`pricing` 可能是数组而不是对象。  
影响分析：属于 provider 生态兼容性问题。若解析失败，会影响模型列表加载或 provider 可用性。

#### 8. config patch notice 可能未持久化即退出

- PR：[ #11629 - fix(log): drain config patch notices before exit](https://github.com/zeroclaw-labs/zeroclaw/pull/11629)  
- 状态：Open

问题描述：`config patch` 启用 verifiable intent 后，notice 可能在进程退出前尚未写入。  
影响分析：主要影响日志完整性和审计可靠性。

#### 9. Windows path 测试误判

- PR：[ #11630 - test(runtime/tools): fix three tests that misread Windows path spellings](https://github.com/zeroclaw-labs/zeroclaw/pull/11630)  
- 状态：Open

问题描述：三个 runtime/tools 测试依赖路径拼写方式，在 Windows nextest job 中失败。  
影响分析：影响 CI 噪音和跨平台信心，不一定直接影响用户功能。

---

## 6. 功能请求与路线图信号

### 1. ZeroCode transcript 显示消息时间

- Issue：[ #11620](https://github.com/zeroclaw-labs/zeroclaw/issues/11620)  
- PR：[ #11622](https://github.com/zeroclaw-labs/zeroclaw/pull/11622)

该功能已经有实现 PR，进入下一版本的可能性较高。它反映出 ZeroCode 正在从简单交互界面向“可诊断、可审计的 Agent 会话界面”演进。

### 2. ZeroCode 支持 mid-turn steering

- PR：[ #11621 - feat(zerocode): steer the running turn when you send a message mid-turn](https://github.com/zeroclaw-labs/zeroclaw/pull/11621)

该 PR 将用户在 turn 运行中输入的消息优先发送给当前运行 turn，而非简单排队。结合此前已有的 daemon `session/steer` 能力，这更像是对既有路线图能力的 UI 落地。若合并，将显著改善 ZeroCode 的实时协作体验。

### 3. 插件 egress 拒绝日志去重

- Issue：[ #11626 - suppress repeated plugin egress refusal records per instance and host](https://github.com/zeroclaw-labs/zeroclaw/issues/11626)  
- 状态：Open  
- 对应 PR：未在今日数据中发现

用户希望对同一 plugin instance 与 host 的重复 egress refusal 记录进行抑制，避免插件持续重试被拒绝目标时每次都写入 WARN。  
路线图信号：这说明插件系统的安全审计正在进入细化阶段，维护者需要在“保留安全可见性”和“降低日志噪音”之间做平衡。

### 4. runtime 架构例外文档化

- PR：[ #11628 - docs(runtime): record bounded Tailscale tunnel exception](https://github.com/zeroclaw-labs/zeroclaw/pull/11628)  
- PR：[ #11625 - docs(runtime): propose terminal-response placement exception](https://github.com/zeroclaw-labs/zeroclaw/pull/11625)

这两项都是文档/架构治理类 PR，围绕 runtime crate 中的 bounded exception 进行记录或提案。虽然不是直接用户功能，但显示项目在模块边界、长期可维护性和 Core Team 审批流程方面持续规范化。

---

## 7. 用户反馈摘要

从今日 Issues 可以提炼出以下真实用户痛点：

1. **用户不能接受输入或确认被静默丢失**  
   [#11618](https://github.com/zeroclaw-labs/zeroclaw/issues/11618) 和 [#11623](https://github.com/zeroclaw-labs/zeroclaw/issues/11623) 都指向同一个核心问题：用户在 ZeroCode 中做出的输入、确认或选择必须有明确结果，不能在客户端或 daemon 之间悄然丢失。

2. **长时间 Agent 会话需要更强时间线可观测性**  
   [#11620](https://github.com/zeroclaw-labs/zeroclaw/issues/11620) 表明用户在多任务、长工具调用、自动 prompt 与手动消息混杂的场景中，需要知道“什么先发生、间隔多久、哪个操作触发了后续结果”。

3. **外部 channel 可靠性是工作流级别问题**  
   [#11615](https://github.com/zeroclaw-labs/zeroclaw/issues/11615) 中 Telegram 429 handling 问题说明，对 channel 用户而言，消息发送失败不是小瑕疵，而可能直接阻断工作流。

4. **成本统计必须尊重 provider 原始 usage 语义**  
   [#11613](https://github.com/zeroclaw-labs/zeroclaw/issues/11613) 显示，随着 reasoning tokens、thinking tokens 等计费形态变复杂，用户希望 ZeroClaw 的成本账本能准确反映 provider 报告值，而不是过度假设 OpenAI 标准字段结构。

5. **日志需要既完整又不过载**  
   [#11626](https://github.com/zeroclaw-labs/zeroclaw/issues/11626) 反映插件 egress 安全日志可能出现重复噪音。用户诉求不是取消记录，而是按 instance 和 host 抑制重复记录，以便真正重要的告警不被淹没。

---

## 8. 待处理积压

基于今日提供的数据，未发现明确“长期未响应”的 Issue 或 PR；所有列出的 Issues 和 PR 均创建于 2026-10-08 至 2026-10-09，属于新近活跃项。不过，以下 open 项建议维护者优先关注，因为它们要么严重程度较高，要么暂无对应修复 PR。

### 高优先级待处理

- [Issue #11615 - Telegram send path ignores 429 retry_after](https://github.com/zeroclaw-labs/zeroclaw/issues/11615)  
  S1 级 workflow blocked，今日数据中尚未看到对应 PR。建议优先补齐 retry_after 处理、退避策略和失败持久化/重试语义。

- [Issue #11613 - Cost ledger drops provider total_tokens](https://github.com/zeroclaw-labs/zeroclaw/issues/11613)  
  暂无对应修复 PR。该问题会导致 reasoning-token 模型成本低估，影响预算与审计。

- [Issue #11626 - suppress repeated plugin egress refusal records](https://github.com/zeroclaw-labs/zeroclaw/issues/11626)  
  暂无对应 PR。虽然不是阻断性问题，但会影响 observability 质量，尤其是插件持续重试场景。

### 待 review / 待合并 PR 队列

- [PR #11616 - fix(config): emit static map-key section paths](https://github.com/zeroclaw-labs/zeroclaw/pull/11616)  
- [PR #11617 - fix(agent): close the steering channel before a turn finishes](https://github.com/zeroclaw-labs/zeroclaw/pull/11617)  
- [PR #11619 - fix(zerocode): requeue a queued message the daemon refused as busy](https://github.com/zeroclaw-labs/zeroclaw/pull/11619)  
- [PR #11621 - feat(zerocode): steer the running turn when you send a message mid-turn](https://github.com/zeroclaw-labs/zeroclaw/pull/11621)  
- [PR #11622 - feat(zerocode): show message times in the transcript](https://github.com/zeroclaw-labs/zeroclaw/pull/11622)  
- [PR #11624 - fix(zerocode): answer dropped elicitations and record them in the transcript](https://github.com/zeroclaw-labs/zeroclaw/pull/11624)  
- [PR #11627 - fix(providers): tolerate non-object pricing in OpenAI-compatible model lists](https://github.com/zeroclaw-labs/zeroclaw/pull/11627)  
- [PR #11629 - fix(log): drain config patch notices before exit](https://github.com/zeroclaw-labs/zeroclaw/pull/11629)  
- [PR #11630 - test(runtime/tools): fix three tests that misread Windows path spellings](https://github.com/zeroclaw-labs/zeroclaw/pull/11630)

---

## 总体判断

ZeroClaw 今日处于“高活跃、强修复导向、尚未落地合并”的状态。社区反馈集中在真实使用中的可靠性问题，尤其是 ZeroCode 会话交互、daemon 并发状态、工具 elicitation 和 transcript 可观测性。多个 Issue 已有对应 PR，说明项目维护响应速度良好；但 Telegram 429、cost ledger 低估和插件日志去重仍缺少修复 PR，建议作为下一轮维护重点。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*