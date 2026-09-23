# OpenClaw 生态日报 2026-09-23

> Issues: 3 | PRs: 28 | 覆盖项目: 13 个 | 生成时间: 2026-09-23 03:48 UTC

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
日期：2026-09-23  
仓库：[`openclaw/openclaw`](https://github.com/openclaw/openclaw)

---

## 1. 今日速览

过去 24 小时 OpenClaw 保持高活跃度：Issues 更新 3 条，其中 2 条仍处于打开状态，1 条已关闭；PR 更新 28 条，其中 25 条仍待处理，3 条已关闭。今日没有新版本发布，开发重心明显集中在 **2026.9.5 → 2026.9.6 的稳定性、更新流程、会话持久化、CI/测试提速与插件/Agent 运行时可靠性** 上。

从 PR 分布看，维护者正在密集处理 Gateway 主线程阻塞、会话写入、更新 drain、Talk/Workboard/Codex 等关键路径问题，说明项目处于发布前收敛阶段。与此同时，新增 Issue 暴露出 `claude-cli` runtime 会话启动失败、`doctor --fix` 写入不存在模型 ID 等潜在高影响回归，需优先确认是否阻塞下一版发布。

---

## 3. 项目进展

今日无新 Release，但有 3 个 PR 进入关闭状态，另有多项高优先级修复已进入“等待维护者查看”或“待作者补充”阶段。

### 今日已关闭 / 完成处理的重要 PR

#### 1. [`#156095 perf(sessions): move streaming transcript writes off the main thread`](https://github.com/openclaw/openclaw/pull/156095)  
状态：Closed  
作者：`steipete`  
标签：`docs`, `gateway`, `scripts`, `agents`, `size: XL`, `P2`, `merge-risk: compatibility`

该 PR 聚焦于将流式 transcript 写入从 Gateway 主线程移出，目标是降低并发 Agent completion 时主线程事务和 runtime report 导航造成的阻塞。  
虽然当前状态为 Closed，结合摘要看，这是一个影响较大的性能/架构改动，涉及会话持久化与并发场景。若已由其他 PR 接续或拆分，维护者应确保其优化目标仍被覆盖。

项目推进意义：

- 指向会话系统核心性能瓶颈；
- 与今日多个 session/archive/canonical-validation 相关 PR 形成同一稳定性主线；
- 对高并发 Agent 场景体验有直接影响。

---

#### 2. [`#156132 test(codex): run the native output-fidelity proof without the Linux bwrap sandbox`](https://github.com/openclaw/openclaw/pull/156132)  
状态：Closed  
作者：`steipete`  
标签：`extensions: codex`, `P3`, `proof: needs proof`

该 PR 针对 2026.9.6 Full Release Validation 中 Codex native output-fidelity proof 在 Linux 下失败的问题。摘要显示多个 FRV 运行均因 `Expected native command execution` 失败，说明这是 release validation 层面的测试可靠性问题。

项目推进意义：

- 聚焦 Codex 扩展的发布验证稳定性；
- 有助于降低 release lane 中因测试环境隔离导致的误报；
- 虽然为 P3，但在发布前验证链路中有实际阻塞风险。

---

#### 3. [`#155899 fix(qa): make Telegram delivery-failure proof deterministic`](https://github.com/openclaw/openclaw/pull/155899)  
状态：Closed  
作者：`obviyus`  
标签：`P2`, `proof: sufficient`, `status: ready for maintainer look`

该 PR 旨在让 Telegram Test Server 的 delivery-failure proof 更确定，避免最后一个 Bot API 请求无法稳定拒绝，同时修复源启动 QA provider 时可能在凭据租约期间重建、错过 readiness 的问题。

项目推进意义：

- 改善 Telegram 渠道测试确定性；
- 降低 CI/QA 随机失败概率；
- 有利于多渠道集成的发布信心。

---

### 今日仍在推进中的关键 PR

#### [`#155991 fix(sessions): bound canonical-validation drain stall to end CPU 100%+ storm`](https://github.com/openclaw/openclaw/pull/155991)  
状态：Open  
作者：`luyuehm`  
标签：大量 channel / extension，`security-sensitive-changed`

这是今日最值得关注的稳定性 PR 之一。它修复 Gateway Node Worker 因 `canonical-validation` drain loop 无法在活跃 session 上收敛而导致的 100%+ CPU storm。  
该问题影响面极广，PR 标签覆盖大量渠道与扩展，说明该修复位于会话 canonical validation 的基础设施层。

优先级判断：高。若验证通过，应优先纳入下一版本。

---

#### [`#156138 fix(update): stop an uninspected predecessor Gateway before candidate Doctor`](https://github.com/openclaw/openclaw/pull/156138)  
状态：Open  
作者：`steipete`  
标签：`gateway`, `cli`, `size: M`

该 PR 明确标注为 2026.9.6 release blocker。它修复 2026.9.5 → candidate 的 `update-first-hop-compat` 包验收失败问题。  
摘要指出 post-swap 阶段 `update-migrated-finalize.worker.js --doctor` 出错，说明升级迁移链路仍有边界条件未收敛。

优先级判断：极高。直接影响 2026.9.6 发布可用性。

---

#### [`#156014 fix: keep session writes responsive during archive cleanup`](https://github.com/openclaw/openclaw/pull/156014)  
状态：Open  
作者：`steipete`  
标签：`memory-core`, `agents`, `size: XL`, `P2`

该 PR 修复前台 session edits 与 transcript writes 被 archive cleanup 阻塞的问题，并将持久 archive 数据库工作移出 Gateway 主线程。  
这与今日多个“主线程阻塞”“会话写入响应性”“归档清理”主题高度相关。

优先级判断：高。直接改善用户交互延迟与写入可靠性。

---

#### [`#156110 refactor(skills): run Workshop storage operations in the shared worker`](https://github.com/openclaw/openclaw/pull/156110)  
状态：Open  
作者：`steipete`  
标签：`gateway`, `commands`, `agents`, `size: XL`

该 PR 将 Skill Workshop 的 proposal、evaluation、rollback、reconciliation 等存储操作迁移到 shared worker，避免同步数据库工作阻塞调用线程。

项目方向信号：

- OpenClaw 正在系统性清理主线程同步 I/O；
- Gateway/Workshop/Session 等关键模块正在向 worker 化架构演进。

---

## 4. 社区热点

由于今日 PR 评论数据未提供，Issues 中评论数与问题影响面是主要热度信号。

### 1. [`#156145 Session SQLite migration recovery report`](https://github.com/openclaw/openclaw/issues/156145)  
状态：Closed  
评论数：2  
作者：`dpcrodrigomedeiros-10`

这是今日评论数最高的 Issue。它来自 OpenClaw doctor 自动生成的本地 Session SQLite migration recovery 报告，版本为 2026.9.5。  
从摘要看，doctor 已完成恢复并验证失败迁移的修复结果，因此该 Issue 已关闭。

背后诉求：

- 用户希望 session SQLite 迁移失败后能自动恢复；
- doctor 报告机制正在成为用户上报本地迁移问题的主要路径；
- 当前恢复能力看起来有效，但仍需要维护者持续观察这类报告是否集中出现。

---

### 2. [`#156148 claude-cli runtime: every spawned session fails with SessionTranscriptWriterClaimReboundError`](https://github.com/openclaw/openclaw/issues/156148)  
状态：Open  
评论数：1  
作者：`omahswrldd`

用户报告在 2026.9.5 中，任何映射到 `agentRuntime: { id: "claude-cli" }` 的 agent 通过 `sessions_spawn` 启动后都会在 150–550ms 内死亡，错误为：

`SessionTranscriptWriterClaimReboundError`

背后诉求：

- 用户需要 `claude-cli` runtime 能稳定启动会话；
- 问题发生在 agent 输出前，属于启动路径或 transcript writer claim 生命周期问题；
- 这可能与今日多个 transcript/session 写入相关 PR 存在关联，但目前未看到明确 fix PR 绑定。

优先级判断：高。该问题导致整个 runtime 不可用。

---

### 3. [`#156155 doctor --fix retires openai/gpt-5.4 to an id that is not in the catalog`](https://github.com/openclaw/openclaw/issues/156155)  
状态：Open  
评论数：0  
作者：`shadesurgeon`

用户报告 `openclaw doctor --fix` 在 2026.9.5 的 post-update convergence 中，将 `openai/gpt-5.4` 替换为不存在于 catalog 的 `openai/gpt-5.6-terra`，并写入：

- `modelPolicy.allow`
- live agent fallback chain

背后诉求：

- 用户期望 doctor 自动修复不会生成不可用配置；
- 模型退役/替换逻辑需要严格校验 catalog；
- fallback chain 不应被写入无效模型 ID，否则可能造成运行期不可恢复或难以诊断的模型选择失败。

优先级判断：高。该问题可能影响升级后的模型策略与 agent 可用性。

---

## 5. Bug 与稳定性

以下按影响程度与发布风险排序。

### P0 / Release Blocker

#### 1. 更新链路阻塞 2026.9.6 验收  
相关 PR：[`#156138`](https://github.com/openclaw/openclaw/pull/156138)  
状态：Open，已有 fix PR  
影响范围：Gateway update、CLI、Doctor、2026.9.5 → candidate 升级路径

问题摘要：  
2026.9.6 的 Package Acceptance lane `update-first-hop-compat` 在 2026.9.5 → candidate positive hop 中失败。该问题被明确标记为 release blocker。

建议：  
优先完成 review、验证 FRV / release-checks，并在合并后回归升级链路。

---

#### 2. Gateway Node Worker 100%+ CPU storm  
相关 PR：[`#155991`](https://github.com/openclaw/openclaw/pull/155991)  
状态：Open，已有 fix PR  
影响范围：sessions、canonical validation、Gateway worker、大量 channels/extensions

问题摘要：  
`canonical-validation` drain loop 在活跃 session 上无法收敛，导致 Gateway Node Worker CPU 占用超过 100%。这类问题可能造成本地服务卡死、耗电、响应延迟和全局稳定性下降。

建议：  
将其视为高优先级稳定性修复；重点验证活跃 session、多 channel、多 extension 场景。

---

### P1 / 高影响用户可见问题

#### 3. `claude-cli` runtime 会话全部启动失败  
相关 Issue：[`#156148`](https://github.com/openclaw/openclaw/issues/156148)  
状态：Open，未看到明确 fix PR  
影响范围：`agentRuntime.id = claude-cli` 的所有 spawned sessions

问题摘要：  
所有 `claude-cli` agent 通过 `sessions_spawn` 启动后在 150–550ms 内失败，且没有任何 agent 输出。错误集中在 `SessionTranscriptWriterClaimReboundError`。

可能关联方向：

- transcript writer claim 生命周期；
- session spawn 并发初始化；
- streaming transcript persistence；
- 最近 session SQLite / archive cleanup / main-thread offload 改动。

建议：  
需要尽快复现，并检查是否与 [`#156095`](https://github.com/openclaw/openclaw/pull/156095)、[`#156014`](https://github.com/openclaw/openclaw/pull/156014)、[`#156030`](https://github.com/openclaw/openclaw/pull/156030) 等会话写入改动有关。

---

#### 4. `doctor --fix` 写入不存在的模型 ID  
相关 Issue：[`#156155`](https://github.com/openclaw/openclaw/issues/156155)  
状态：Open，未看到明确 fix PR  
影响范围：模型策略、fallback chain、post-update convergence

问题摘要：  
`doctor --fix` 将退役模型 `openai/gpt-5.4` 替换为 catalog 中不存在的 `openai/gpt-5.6-terra`。这会导致配置被写坏，且影响 live agent fallback chain。

建议：  
应增加 catalog 校验、fallback chain 写入前验证，以及 doctor 修复操作的 dry-run/回滚保护。

---

#### 5. Workboard 大型 labeled board 刷新冻结  
相关 PR：[`#156150`](https://github.com/openclaw/openclaw/pull/156150)  
状态：Open，已有 fix PR  
影响范围：Web UI、Workboard

问题摘要：  
打开带大量 labeled cards 的 Workboard 时，Control UI 出现多秒卡顿。PR 通过减少每卡片 label layout stalls、优化 overflow counts 与响应式 resizing 来缓解。

用户影响：  
大型看板用户将明显感知 UI 流畅度提升。

---

#### 6. Copilot 长 reasoning item ID 导致加密 reasoning 损坏  
相关 PR：[`#155994`](https://github.com/openclaw/openclaw/pull/155994)  
状态：Open，已有 fix PR  
标签：`security-sensitive-changed`, `security-review-required`

问题摘要：  
Copilot 返回较长 reasoning item ID 时，Responses reasoning ciphertext 在 transcript 存储中被破坏，后续 turn 可能因 invalid encrypted-content 失败。

建议：  
需要安全审查优先跟进。该问题同时影响数据完整性、隐私/加密边界与多轮对话连续性。

---

#### 7. Session SQLite migration failure recovery  
相关 Issue：[`#156145`](https://github.com/openclaw/openclaw/issues/156145)  
状态：Closed  
影响范围：本地 session SQLite 迁移

问题摘要：  
doctor 生成迁移恢复报告，显示本地 session SQLite migration 曾失败，但已通过 recovery 恢复并验证。

判断：  
单个事件已关闭，但需要关注是否有更多用户在 2026.9.5 上报告同类迁移失败。

---

### P2 / 中等影响问题

#### 8. Codex streaming completion 后重复回复  
相关 PR：[`#156144`](https://github.com/openclaw/openclaw/pull/156144)  
状态：Open，已有 fix PR  
影响范围：Codex extension、conversation history

问题摘要：  
当 streaming 使用 preview item ID，而 completion 又用不同 ID 报告同一消息时，Codex 回复可能被存储两次。

---

#### 9. Talk voice consults 对只读文件统计命令误要求确认  
相关 PR：[`#156151`](https://github.com/openclaw/openclaw/pull/156151)  
状态：Open，已有 fix PR  
影响范围：Talk voice consult、read-only shell classifier

问题摘要：  
如 `find . -maxdepth 1 -type f | wc -l`、`rg --files src | wc -l` 这类只读统计命令会触发语音确认，打断交互流程。

---

#### 10. Discord Activity emoji 标题长度误判  
相关 PR：[`#156096`](https://github.com/openclaw/openclaw/pull/156096)  
状态：Open，已有 fix PR  
影响范围：Discord channel

问题摘要：  
含 emoji 的 41–80 字符 Activity title 因 JavaScript `String.length` 计算 surrogate pair 导致被错误拒绝。PR 改为按 Unicode code point 判断。

---

#### 11. `tasks.list` 在同 session 新 run 创建时偶发失败  
相关 PR：[`#156030`](https://github.com/openclaw/openclaw/pull/156030)  
状态：Open，已有 fix PR  
影响范围：tasks、session run lifecycle

问题摘要：  
当同一 session 中已有 tasks，而另一个 run 正在创建时，`tasks.list` 会间歇性失败。PR 目标是让列表读取在并发 run 创建期间保持可读。

---

## 6. 功能请求与路线图信号

今日新增 Issues 更偏 Bug 报告，没有明显全新功能请求。不过从 PR 方向可以观察到几个路线图信号。

### 1. Gateway 与 Session 子系统继续“去主线程阻塞”

相关 PR：

- [`#156095`](https://github.com/openclaw/openclaw/pull/156095) — streaming transcript writes off main thread  
- [`#156014`](https://github.com/openclaw/openclaw/pull/156014) — archive cleanup 不阻塞 session writes  
- [`#156110`](https://github.com/openclaw/openclaw/pull/156110) — Workshop storage operations 迁移到 shared worker  
- [`#155991`](https://github.com/openclaw/openclaw/pull/155991) — 限制 canonical-validation drain stall

路线图判断：  
OpenClaw 正在将数据库写入、归档清理、Workshop 存储、transcript persistence 等重操作迁移出主线程。这是提升本地 AI 助手高并发、多 Agent、多插件稳定性的关键方向。

---

### 2. Agent / Provider 集成趋向官方 SDK 与更强兼容性

相关 PR：

- [`#156116 refactor(agentsapi): use the official OpenAI SDK`](https://github.com/openclaw/openclaw/pull/156116)  
- [`#155808 fix(ui): guide setup before selecting unconfigured decision models`](https://github.com/openclaw/openclaw/pull/155808)  
- [`#156144 fix(codex): avoid duplicate replies after streamed completions`](https://github.com/openclaw/openclaw/pull/156144)  
- [`#155994 fix: preserve Copilot reasoning ciphertext with long item IDs`](https://github.com/openclaw/openclaw/pull/155994)

路线图判断：  
项目正在减少手写协议代码，增强模型 provider 配置体验，并修复 Codex/Copilot 等 Agent 扩展在复杂流式和 reasoning 数据下的兼容性。

---

### 3. Talk / Voice / Grok 体验仍是活跃改进方向

相关 PR：

- [`#155838 fix(talk): preserve Grok transcripts and confirmed voice consults`](https://github.com/openclaw/openclaw/pull/155838)  
- [`#156151 fix(talk): voice consults ask for confirmation before read-only file counts`](https://github.com/openclaw/openclaw/pull/156151)  
- [`#156149 test: share relay consult fixtures`](https://github.com/openclaw/openclaw/pull/156149)

路线图判断：  
Talk 功能正在补齐 transcript 保真、语音确认、relay consult 测试覆盖等基础能力，说明语音/实时协作式 Agent 体验仍是重点投入区域。

---

### 4. 测试与 CI 提速是短期发布效率重点

相关 PR：

- [`#156129 ci: avoid hosted queues on the critical path`](https://github.com/openclaw/openclaw/pull/156129)  
- [`#156077 ci: defer native lifecycle matrices to release verification`](https://github.com/openclaw/openclaw/pull/156077)  
- [`#156128 perf(test): reuse a verified cold-storage seed`](https://github.com/openclaw/openclaw/pull/156128)  
- [`#156152 test(plugins): shorten memory cleanup timeout`](https://github.com/openclaw/openclaw/pull/156152)  
- [`#156153 test(cron): skip bundled plugins in isolated fixtures`](https://github.com/openclaw/openclaw/pull/156153)  
- [`#156154 test(plugins): reuse git install seed fixture`](https://github.com/openclaw/openclaw/pull/156154)  
- [`#156156 test(plugins): link SDK host fixture`](https://github.com/openclaw/openclaw/pull/156156)

路线图判断：  
维护者正在系统性缩短 CI 与测试反馈周期，尤其是插件、cron、cold-storage、native lifecycle 等耗时路径。这通常是 release 前稳定化和开发吞吐提升的信号。

---

## 7. 用户反馈摘要

基于今日 Issues 与 PR 描述，可提炼出以下真实用户痛点。

### 1. 用户对升级后自动修复的信任仍需加强

相关：

- [`#156145`](https://github.com/openclaw/openclaw/issues/156145)  
- [`#156155`](https://github.com/openclaw/openclaw/issues/156155)

用户在升级或 post-update convergence 中依赖 `openclaw doctor` 修复本地状态。  
积极面是：Session SQLite migration failure 已能通过 doctor 恢复并生成 sanitized report。  
消极面是：`doctor --fix` 若写入不存在的模型 ID，会直接削弱用户对自动修复工具的信任。

用户痛点：

- 希望自动修复可靠且可解释；
- 不希望 doctor 把配置修成不可用状态；
- 需要更强的 catalog 校验和回滚机制。

---

### 2. Agent runtime 启动失败属于高挫败体验

相关：

- [`#156148`](https://github.com/openclaw/openclaw/issues/156148)

用户报告 `claude-cli` runtime 的 spawned session 全部失败，且失败发生在 150–550ms 内、无任何模型输出。  
这类问题对用户来说不是“功能异常”，而是“整个 agent 无法使用”。

用户痛点：

- 会话启动路径必须稳定；
- 错误信息虽然具体，但普通用户难以自行修复；
- 若 runtime 与 transcript writer 绑定过紧，用户会感受到“模型没开始就崩了”。

---

### 3. 大型工作区与高并发场景暴露性能瓶颈

相关：

- [`#156150`](https://github.com/openclaw/openclaw/pull/156150)  
- [`#156014`](https://github.com/openclaw/openclaw/pull/156014)  
- [`#155991`](https://github.com/openclaw/openclaw/pull/155991)  
- [`#156095`](https://github.com/openclaw/openclaw/pull/156095)

用户在大型 Workboard、多 session、archive cleanup、canonical validation 等场景下可能遇到 UI 卡顿、写入延迟或 CPU 飙升。

用户痛点：

- 大型数据集/大型看板下 UI 应保持响应；
- 后台清理和验证不应阻塞前台写入；
- Gateway 不应在活跃 session 中进入 drain loop 风暴。

---

### 4. 多渠道、多扩展用户需要细节兼容性

相关：

- [`#156096`](https://github.com/openclaw/openclaw/pull/156096)  
- [`#155899`](https://github.com/openclaw/openclaw/pull/155899)  
- [`#155994`](https://github.com/openclaw/openclaw/pull/155994)

从 Discord emoji title、Telegram delivery proof、Copilot reasoning ciphertext 等问题可以看出，OpenClaw 的用户场景非常多样，边界输入和第三方协议细节会持续产生问题。

用户痛点：

- Unicode、长 ID、加密内容、第三方 API 行为都需要精确处理；
- 用户希望多渠道体验一致，而不是因渠道差异出现不可预测失败。

---

## 8. 待处理积压

从今日数据看，没有明显“长期未响应”的 Issue 或 PR，因为所有条目均在 2026-09-22 至 2026-09-23 创建或更新。不过，以下 open 项目具有较高优先级，建议维护者重点关注，避免形成发布前积压。

### 高优先级待处理

#### [`#156138 fix(update): stop an uninspected predecessor Gateway before candidate Doctor`](https://github.com/openclaw/openclaw/pull/156138)  
原因：明确 release blocker，影响 2026.9.6 升级验收。

#### [`#155991 fix(sessions): bound canonical-validation drain stall to end CPU 100%+ storm`](https://github.com/openclaw/openclaw/pull/155991)  
原因：CPU storm，高影响稳定性问题，涉及面极广。

#### [`#156148 claude-cli runtime spawned session failure`](https://github.com/openclaw/openclaw/issues/156148)  
原因：用户可见的 runtime 全量失败，尚未看到明确 fix PR。

#### [`#156155 doctor --fix writes nonexistent model id`](https://github.com/openclaw/openclaw/issues/156155)  
原因：doctor 自动修复写入无效配置，影响模型策略可信度。

#### [`#155994 fix: preserve Copilot reasoning ciphertext with long item IDs`](https://github.com/openclaw/openclaw/pull/155994)  
原因：涉及 encrypted reasoning 数据完整性，且标记为 security review required。

---

### 可尽快合入的稳定性 / 性能候选

#### [`#156144 fix(codex): avoid duplicate replies after streamed completions`](https://github.com/openclaw/openclaw/pull/156144)  
状态显示 ready for maintainer look，修复 Codex 重复消息，用户可见度较高。

#### [`#156030 fix(tasks): keep lists readable during new session runs`](https://github.com/openclaw/openclaw/pull/156030)  
状态显示 ready for maintainer look，修复 session 内并发 run 创建时任务列表读取问题。

#### [`#156129 ci: avoid hosted queues on the critical path`](https://github.com/openclaw/openclaw/pull/156129)  
状态显示 ready for maintainer look，有助于缩短主干验证时间。

#### [`#156014 fix: keep session writes responsive during archive cleanup`](https://github.com/openclaw/openclaw/pull/156014)  
改善 session 写入响应性，建议与 canonical validation / transcript writer 相关问题一起验证。

---

## 项目健康度评估

整体健康度：**活跃但处于高压收敛期**。

积极信号：

- PR 活跃度高，24 小时内 28 条 PR 更新；
- 多个关键稳定性问题已有对应 fix PR；
- 维护者正在系统性优化 Gateway 主线程、CI、测试、session 写入和插件测试性能；
- doctor 恢复报告机制已能帮助定位本地迁移问题。

风险信号：

- 2026.9.6 仍存在明确 release blocker；
- `claude-cli` runtime 全量会话失败尚未见明确修复；
- `doctor --fix` 写入不存在模型 ID 属于高信任风险；
- session/transcript/canonical validation 相关问题集中出现，说明该区域近期变更密集，需要更强回归测试。

建议下一步重点：

1. 优先处理 [`#156138`](https://github.com/openclaw/openclaw/pull/156138)、[`#155991`](https://github.com/openclaw/openclaw/pull/155991)、[`#156148`](https://github.com/openclaw/openclaw/issues/156148)、[`#156155`](https://github.com/openclaw/openclaw/issues/156155)。  
2. 将 session/transcript writer、archive cleanup、canonical validation、doctor migration recovery 放入同一轮集成回归。  
3. 对 `doctor --fix` 增加 catalog hard validation 与写入前安全检查。  
4. 在 2026.9.6 发布前确认所有 update-first-hop、FRV、Package Acceptance 相关 lane 已稳定通过。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向分析报告  
日期：2026-09-23

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态呈现出明显的 **“高活跃修复、发布前收敛、运行时稳定性优先”** 特征。OpenClaw、Hermes Agent、CoPaw、ZeroClaw、NanoBot 等项目都在集中处理 Gateway、会话持久化、通道适配、工具调用、升级迁移与多平台稳定性问题。  
从需求侧看，用户不再只关注“能否调用模型”，而是更关注 **长期运行可靠性、多渠道消息一致性、自动更新可信度、配置可恢复性、成本与可观测性**。  
从技术侧看，主流项目正在从单轮聊天工具演进为 **长期在线、多 Agent、多通道、多工具、多模态、可恢复的本地/云端混合智能体运行时**。  
生态整体活跃，但多个项目也暴露出相似的工程瓶颈：session/transcript 持久化、Gateway 主线程阻塞、配置迁移、插件生命周期、CI 稳定性和安全策略边界。

---

## 2. 各项目活跃度对比

> 注：Issues / PR 数为过去 24 小时更新量；部分项目数据来自摘要中的统计口径。

| 项目 | Issues 更新 | PR 更新 | Release | 今日重点 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 3 | 28 | 无 | Gateway 主线程阻塞、session/transcript、update-first-hop、doctor 修复、CI 提速 | **高活跃，高压收敛期**；存在 release blocker 与 runtime 高影响回归 |
| **NanoBot** | 2 | 14 | 无 | Telegram 通知噪音、WebUI、provider reasoning、CLI Apps 安全、多模态需求 | **健康快速迭代**；P1/P2 问题响应快 |
| **Hermes Agent** | 50 | 50 | 无 | Desktop、Gateway、MCP、配置迁移、streaming、更新机制 | **极高活跃但积压明显**；48 个 PR 待合并，稳定性压力大 |
| **PicoClaw** | 0 | 0 | 无 | 无活动 | **静默 / 低活跃** |
| **NanoClaw** | 2 | 7 | 无 | Codex/MCP 启动、setup wizard、CDSS、container runtime 升级 | **中高活跃**；安装与更新路径仍需加强 |
| **NullClaw** | 0 | 0 | 无 | 无活动 | **静默 / 低活跃** |
| **IronClaw** | 0 | 2 | 无 | `builtin.time` 时间偏移、Italian locale | **低到中等活跃**；小步功能推进 |
| **LobsterAI** | 0 | 10 | **有：2026.9.22** | OpenClaw 集成修复、Gateway 启动、Windows、Cowork 进度 | **发布后稳定性修复期**；维护响应强 |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | **静默 / 低活跃** |
| **Moltis** | 0 | 1 | 无 | `wasmtime-wasi` 依赖升级 | **低活跃维护状态** |
| **CoPaw** | 9 | 13 | 无 | Console、SQLite 备份、LLM 超时恢复、Windows ACL、聊天历史 | **高活跃，发布前修复密集**；稳定性风险较集中 |
| **ZeptoClaw** | 0 | 3 | 无 | Dependabot 依赖升级、CI/Docker/mail-parser | **低到中等维护活跃** |
| **ZeroClaw** | 6 | 11 | 无 | WhatsApp Web、runtime、security、ZeroCode、CI | **高开发输入、低合并输出**；S0 安全问题需优先处理 |

### 活跃度分层

| 层级 | 项目 | 特征 |
|---|---|---|
| **极高活跃 / 高压力** | Hermes Agent、OpenClaw | Issue/PR 密集，真实用户反馈多，release / patch 压力大 |
| **高活跃 / 快速迭代** | NanoBot、CoPaw、ZeroClaw、LobsterAI | 多个功能与稳定性修复并行，通道、UI、工具链持续演进 |
| **中等活跃 / 聚焦专项** | NanoClaw、IronClaw | 围绕安装、Codex/MCP、runtime 工具、国际化等具体方向推进 |
| **低活跃 / 维护模式** | Moltis、ZeptoClaw | 主要为依赖升级和自动化维护 |
| **静默项目** | PicoClaw、NullClaw、TinyClaw | 过去 24 小时无活动 |

---

## 3. OpenClaw 在生态中的定位

### 3.1 定位概括

OpenClaw 是当前样本中最典型的 **本地优先、Gateway 驱动、多 Agent / 多插件 / 多渠道的个人 AI 助手运行时核心项目**。与 NanoBot、Hermes Agent、ZeroClaw、CoPaw 等相比，OpenClaw 今日的工作重心更偏向底层运行时稳定性：session/transcript、canonical validation、update migration、doctor recovery、archive cleanup、Gateway worker 化。

### 3.2 相对优势

| 维度 | OpenClaw 表现 |
|---|---|
| **运行时复杂度** | 高。涉及 Gateway、sessions、agents、plugins、doctor、update、archives、CI、Codex/Copilot/Talk 等多个核心路径 |
| **稳定性治理意识** | 强。多个 PR 聚焦主线程阻塞、CPU storm、session write responsiveness、update-first-hop 验收 |
| **发布工程成熟度** | 较高。存在 FRV、Package Acceptance、release blocker、doctor recovery report 等机制 |
| **自动修复能力** | 明显领先。doctor 可生成 session SQLite migration recovery report，但 `doctor --fix` 写入无效模型 ID 说明仍有信任风险 |
| **生态集成面** | 广。覆盖 Codex、Copilot、Talk、Discord、Telegram、Workboard、多 provider、多 extension |

### 3.3 与同类项目技术路线差异

| 对比对象 | 差异 |
|---|---|
| **NanoBot** | NanoBot 更偏 channel / WebUI / provider / 文件工具体验；OpenClaw 更偏 Gateway、session、update、doctor 等底层运行时工程 |
| **Hermes Agent** | Hermes 社区反馈量更大、Desktop / Gateway / MCP / 配置问题更分散；OpenClaw 今日更集中在 2026.9.6 发布前稳定性收敛 |
| **CoPaw** | CoPaw 重点在 Console、聊天历史、备份、Windows ACL、IM 网关；OpenClaw 的 session/transcript 与 Gateway 架构更核心化、系统性更强 |
| **ZeroClaw** | ZeroClaw 强调 channel abstraction、安全策略、ZeroCode、peer-agent runtime；OpenClaw 更重视本地 assistant 的 update/doctor/session 可靠性 |
| **LobsterAI** | LobsterAI 今日大量修复实际上围绕 OpenClaw 集成，说明 OpenClaw 已成为下游桌面产品的关键基础依赖 |

### 3.4 社区规模与活跃度对比

OpenClaw 今日 **28 个 PR 更新、3 个 Issue 更新**，活跃度仅次于 Hermes Agent 的 50/50，但问题集中度更高。Hermes 体现出更大范围的社区问题暴露；OpenClaw 则体现出维护者在发布前对核心路径的高强度工程收敛。  
从生态位置看，OpenClaw 不只是应用层助手，而更像是多个上层产品可复用的 **智能体运行时内核 / Gateway 基座**。

---

## 4. 共同关注的技术方向

### 4.1 会话、Transcript 与持久化可靠性

涉及项目：**OpenClaw、CoPaw、NanoBot、Hermes Agent、ZeroClaw、LobsterAI**

| 项目 | 具体诉求 |
|---|---|
| OpenClaw | streaming transcript writes 移出主线程、archive cleanup 不阻塞 session writes、canonical validation drain 防 CPU storm |
| CoPaw | SQLite transcript history、分页历史、SQLite 在线备份不释放 live locks |
| NanoBot | atomic JSONL write helper 统一，减少 memory/session/transcript 数据损坏风险 |
| Hermes Agent | Desktop chat 生成内容未进入 UI、streaming 完成内容被误判丢弃 |
| ZeroClaw | peer-agent inbox turns 持久化 |
| LobsterAI | legacy session import、OpenClaw Gateway session/配置同步稳定性 |

**结论：** 长期会话与可恢复上下文已成为个人 AI 助手的基础设施核心，单纯“保存聊天记录”已经不够，项目开始处理并发写入、恢复、分页、备份、归档、streaming 去重和数据一致性。

---

### 4.2 Gateway / Daemon / Runtime 长驻稳定性

涉及项目：**OpenClaw、Hermes Agent、ZeroClaw、LobsterAI、NanoClaw、CoPaw**

| 项目 | 具体诉求 |
|---|---|
| OpenClaw | Gateway Node Worker CPU storm、update candidate Doctor、session writes 响应性 |
| Hermes Agent | Gateway `--replace` respawn storm、QQBot 重启后路由错误、Gateway env substitution |
| ZeroClaw | daemon 未注册 channel-map factory，webhook/cron/SOP 无 channel |
| LobsterAI | OpenClaw Gateway 启动失败、反复重启、Clawguard lease 等待 |
| NanoClaw | Codex 首轮前等待 MCP servers、update-nanoclaw prepare 崩溃 |
| CoPaw | LLM timeout 后进程不可恢复、QQ 网关 resume 重复事件 |

**结论：** AI 助手正在从交互式 CLI/聊天应用转向长期在线服务，daemon/gateway 的重启恢复、依赖注入、通道注册、后台任务与健康检查正在成为核心竞争力。

---

### 4.3 多渠道消息一致性与语音/IM 体验

涉及项目：**NanoBot、Hermes Agent、ZeroClaw、CoPaw、OpenClaw、LobsterAI**

| 项目 | 具体诉求 |
|---|---|
| NanoBot | Telegram context compaction 通知不应泄露到用户聊天 |
| Hermes Agent | Telegram lazy install、QQBot 群消息路由、TTS 不应朗读 reasoning |
| ZeroClaw | WhatsApp Markdown、force_voice / suppress_voice、poll pacing |
| CoPaw | QQ 官方机器人 session resume 后重复事件、IM `@所有人` 过滤 |
| OpenClaw | Discord emoji title、Telegram delivery proof、Talk voice consult confirmation |
| LobsterAI | IM native scheduled tasks 与飞书投递恢复 |

**结论：** 多渠道抽象进入细节竞争阶段。用户期待不同 IM / 语音 / WebUI 渠道在格式、节流、事件幂等、系统消息隐藏、语音控制上行为一致。

---

### 4.4 配置迁移、自动修复与升级可信度

涉及项目：**OpenClaw、Hermes Agent、LobsterAI、NanoClaw、CoPaw**

| 项目 | 具体诉求 |
|---|---|
| OpenClaw | `doctor --fix` 不应写入不存在模型 ID；update-first-hop 兼容阻塞 2026.9.6 |
| Hermes Agent | MCP 安装失败配置回滚、migration 失败后不应标记最新、Desktop 更新状态准确 |
| LobsterAI | OpenClaw 模型策略迁移、legacy nsp-clawguard、Windows Quick Repair |
| NanoClaw | setup wizard provider contract 动态注册、update-nanoclaw archive 缺依赖 |
| CoPaw | v2.2.2 发布前打包校验、Windows sandbox workspace ACL |

**结论：** 自动修复工具和升级迁移已成为用户信任核心。项目必须提供 dry-run、事务回滚、catalog 校验、迁移状态可解释性和修复后验证。

---

### 4.5 安全与供应链治理

涉及项目：**ZeroClaw、NanoBot、CoPaw、OpenClaw、ZeptoClaw、Moltis**

| 项目 | 具体诉求 |
|---|---|
| ZeroClaw | `allowed_commands` 绕过 `block_high_risk_commands`，S0 安全问题 |
| NanoBot | CLI Apps provenance、registry drift fail-closed |
| CoPaw | Windows drive-root workspace ACL 风险、zip upload 路径边界校验 |
| OpenClaw | Copilot encrypted reasoning ciphertext、security review required |
| ZeptoClaw | GitHub Actions / Docker / mail-parser 依赖升级 |
| Moltis | `wasmtime-wasi` 依赖升级 |

**结论：** Agent 工具调用天然具备高权限风险，安全策略优先级、路径校验、供应链 provenance、加密数据完整性和依赖更新都成为重点。

---

### 4.6 成本、可观测性与模型路由

涉及项目：**Hermes Agent、OpenClaw、LobsterAI、CoPaw**

| 项目 | 具体诉求 |
|---|---|
| Hermes Agent | budget-aware downshift、失败后模型升级、model usage timeline analytics |
| OpenClaw | doctor 模型策略修复、fallback chain catalog 校验 |
| LobsterAI | Kimi K3 maxTokens 修正、provider prefix cache 命中优化 |
| CoPaw | durable usage persistence、聊天历史中持久化用量 |

**结论：** 高级用户开始要求智能体能在质量、成本、token、模型能力之间动态取舍，并提供可审计的模型使用数据。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构特征 | 当前风险 |
|---|---|---|---|---|
| **OpenClaw** | 本地 Gateway、session、agents、plugins、doctor、update | 高级个人助手用户、插件开发者、下游产品 | Gateway + worker 化 + SQLite/session + doctor 自修复 | release blocker、session/transcript 回归、doctor 信任风险 |
| **NanoBot** | 多渠道 bot、WebUI、provider、工具链 | 个人 bot 用户、轻量部署者 | Channel + WebUI + provider abstraction | P1 Telegram 噪音、安全 PR 待合并 |
| **Hermes Agent** | Desktop + Gateway + MCP + 多平台部署 | 桌面用户、MCP 工具用户、长期运行部署者 | Desktop/Gateway/MCP/Profile 配置体系 | PR 积压严重、配置/streaming/Desktop 问题多 |
| **NanoClaw** | Codex/MCP、企业 CDSS、setup wizard | 企业部署、Codex/MCP 用户 | Provider contract、CDSS channel instance、container runtime | 更新工具崩溃、MCP 启动时序 |
| **IronClaw** | Host runtime 工具、WebUI 国际化 | 轻量 AI 助手用户、国际化用户 | runtime builtin tools + WebUI locale | 活跃度较低，变更小 |
| **LobsterAI** | 桌面产品、OpenClaw 集成、Cowork | 终端桌面用户、企业 IM 用户 | Electron/main/renderer + OpenClaw Gateway + Cowork UI | OpenClaw 集成复杂，Windows/插件升级风险 |
| **CoPaw** | Console、IM Bot、聊天历史、文件交付 | Web Console 用户、IM Bot 部署者 | Console + SQLite + tools + sandbox + IM gateway | LLM timeout 不恢复、Windows ACL、SQLite 备份 |
| **ZeroClaw** | Channel abstraction、WhatsApp、ZeroCode、runtime 安全 | 多通道 agent 开发者、代码助手用户 | Rust/runtime/channel/security/ZeroCode | S0 安全策略问题、合并节奏偏慢 |
| **Moltis** | WASI/Wasm 依赖维护 | WebAssembly agent/runtime 用户 | Rust + Wasmtime/WASI | 低活跃，缺少社区信号 |
| **ZeptoClaw** | 邮件解析、CI/CD、容器发布维护 | 轻量维护型用户 | Rust + Docker/GitHub Actions | 主要为依赖维护，无明显产品推进 |
| **PicoClaw / NullClaw / TinyClaw** | 暂无活动 | 不明确 | 不明确 | 生态活跃度低 |

---

## 6. 社区热度与成熟度

### 6.1 快速迭代阶段

代表项目：**Hermes Agent、OpenClaw、CoPaw、ZeroClaw、NanoBot**

这些项目都有大量 Issue/PR 更新，并且反馈来自真实使用场景。共同特点是：

- 用户正在真实部署，而非只做 demo；
- 问题集中在 Gateway、Desktop、channel、session、工具调用、配置迁移；
- 修复 PR 响应较快，但 review / 合并 / release 节奏成为瓶颈；
- 需求从基础聊天转向长期运行、自动化、多渠道和安全控制。

其中 Hermes Agent 活跃度最高，但积压也最明显；OpenClaw 则更像处于 release 前核心路径收敛；CoPaw 和 ZeroClaw 的问题更偏 Console/IM/runtime/security；NanoBot 修复闭环相对轻快。

### 6.2 质量巩固阶段

代表项目：**LobsterAI、NanoClaw、IronClaw**

- LobsterAI 已发布 2026.9.22，并在当天关闭 10 个 PR，属于发布后稳定性快速修复。
- NanoClaw 重点处理 setup、Codex/MCP、CDSS，说明其正在补企业部署与运行时可靠性短板。
- IronClaw 活跃度较低，但 PR 指向 runtime 基础能力和国际化，属于稳态小步演进。

### 6.3 维护 / 低活跃阶段

代表项目：**Moltis、ZeptoClaw、PicoClaw、NullClaw、TinyClaw**

- Moltis 与 ZeptoClaw 主要由 Dependabot 驱动，说明自动化维护仍在运行。
- PicoClaw、NullClaw、TinyClaw 无活动，短期难以判断路线与社区健康度。

---

## 7. 值得关注的趋势信号

### 趋势 1：AI 助手正在从“聊天应用”演进为“长期运行的本地智能体操作系统”

OpenClaw、Hermes、ZeroClaw、CoPaw 都在处理 daemon、Gateway、session、cron、webhook、background tool、peer-agent inbox 等问题。  
对开发者的启示是：未来个人 AI 助手的核心不只是模型调用，而是 **长期状态、任务调度、权限控制、恢复能力、通道抽象和观测能力**。

---

### 趋势 2：Session / Transcript / Memory 成为基础设施竞争点

OpenClaw 的 transcript writer、CoPaw 的 SQLite history、NanoBot 的 atomic JSONL、ZeroClaw 的 peer-agent inbox、Hermes 的 streaming 内容丢失问题，都说明会话持久化已成为高频痛点。  
对开发者的参考价值：应尽早设计 **幂等写入、并发控制、分页读取、归档清理、迁移恢复、备份一致性**，否则后期会成为系统瓶颈。

---

### 趋势 3：多渠道不是“适配 API”，而是“行为语义一致性工程”

WhatsApp、Telegram、Discord、QQBot、Feishu、Talk voice、TTS 等通道问题表明，用户期待：

- Markdown 正确渲染；
- 语音控制字段严格生效；
- 系统内部事件不泄露；
- 重连后消息不重复；
- poll / text / voice 都遵守 pacing；
- emoji / Unicode / 长 ID 等边界输入被正确处理。

通道层需要具备统一 contract、per-channel adapter test、事件幂等和用户可见输出隔离。

---

### 趋势 4：自动修复工具本身成为信任边界

OpenClaw 的 `doctor --fix` 写入不存在模型 ID、Hermes 的 migration 半提交、LobsterAI 的 Quick Repair、NanoClaw 的 setup wizard 动态注册，都说明“自动修复”正在从辅助工具变成核心产品体验。  
建议开发者为修复工具增加：

- dry-run；
- 事务回滚；
- 修复前后 diff；
- catalog/schema hard validation；
- 失败可恢复状态；
- 用户可理解报告。

---

### 趋势 5：安全策略需要明确优先级，不能依赖用户直觉补全

ZeroClaw 的高风险命令绕过、NanoBot 的 registry provenance、CoPaw 的 Windows ACL、OpenClaw 的 encrypted reasoning 数据完整性，都说明 agent 安全不再是附加功能。  
开发者应优先定义：

- allowlist 与 blocklist 的优先级；
- 高风险命令是否可被白名单覆盖；
- 工具调用审批与审计日志；
- workspace path 边界；
- 插件供应链校验；
- reasoning / transcript 加密内容完整性。

---

### 趋势 6：模型路由开始进入“成本与质量自治”阶段

Hermes 的 budget-aware downshift、失败后模型升级、usage timeline，LobsterAI 的 Kimi K3 maxTokens 修正，OpenClaw 的 model policy / fallback chain 问题，反映出用户开始要求智能体动态管理模型能力。  
未来值得关注的方向包括：

- 基于任务失败的自动升档；
- 基于预算的自动降档；
- per-session 成本上限；
- token / API call ledger；
- provider 能力 catalog；
- 模型 fallback chain 的可验证配置。

---

### 趋势 7：上游依赖与 SDK 变化正在持续冲击 Agent 运行时

NanoClaw 的 Codex/MCP 时序、LobsterAI 的 OpenClaw plugin-sdk 解耦、NanoBot 的 official OpenAI SDK、Hermes 的 OpenAI Responses stream 兼容，都说明 agent 项目高度依赖上游 SDK 和协议行为。  
开发者需要建立：

- provider contract tests；
- SDK export contract tests；
- stream event compatibility tests；
- MCP server readiness checks；
- 版本 pin 与升级验证流程；
- release validation lane。

---

## 总结判断

当前开源个人 AI 助手 / 自主智能体生态正处于从“功能扩张”转向“生产化可靠性”的关键阶段。OpenClaw、Hermes Agent、CoPaw、ZeroClaw 等头部活跃项目都在面对类似挑战：长期运行、会话持久化、多通道一致性、自动修复、安全边界和成本治理。  
其中 **OpenClaw 的优势在于底层 Gateway/session/update/doctor 体系较完整，适合作为运行时基座**；Hermes Agent 社区反馈规模最大但合并压力突出；NanoBot 和 CoPaw 在 WebUI / channel / Console 体验上迭代迅速；ZeroClaw 在 channel abstraction 与安全策略上值得关注；LobsterAI 则展示了 OpenClaw 下游产品化集成中的真实工程挑战。  
对技术决策者而言，选择项目时应重点考察的不再只是模型支持数量，而应是 **运行时恢复能力、持久化一致性、升级迁移可信度、安全策略、通道适配质量和维护者响应效率**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报  
日期：2026-09-23  
仓库：HKUDS/nanobot

## 1. 今日速览

过去 24 小时 NanoBot 活跃度较高：共有 **2 条 Issue 更新**、**14 条 PR 更新**，其中 **8 个 PR 仍待合并**，**6 个 PR 已关闭或完成处理**。今日工作重点集中在 **多渠道体验修复、WebUI 细节优化、工具链稳定性、文件/执行兼容性，以及安全加固**。  
值得关注的是，Telegram 频道出现了 **P1 级别的重复上下文压缩通知问题**，并已在当天提交对应修复 PR，响应速度较快。整体来看，项目维护节奏健康，问题从报告到修复的闭环较短，但当前仍有多个稳定性与安全相关 PR 等待合并，需要维护者继续推进 review。

---

## 2. 项目进展

今日没有新版本发布，但多个 PR 推进了 NanoBot 在稳定性、兼容性和用户体验方面的改进。

### 已关闭 / 完成处理的重要 PR

#### 1. 修复 BOM 编码文本读取问题  
- PR：[#5867 fix(files): decode BOM-marked text correctly](https://github.com/HKUDS/nanobot/pull/5867)  
- 状态：Closed  
- 类型：Bug Fix / Test  
- 影响范围：文件读取工具、文本解析稳定性  

该 PR 修复了 `read_file` 在处理 UTF-16 / UTF-32 / UTF-8 BOM 文本时的错误行为。此前当 UTF-8 解码失败后会直接回退到 latin-1，导致 BOM 标记文本被错误识别为“可读”，但实际内容可能充满 NUL 字符或乱码。  
这项修复提升了文件工具对真实用户文件的兼容性，尤其对 Windows、Office 导出文本、多语言文档场景较重要。

#### 2. 修复工具参数校验中的 boolean JSON Schema 子模式崩溃  
- PR：[#5859 fix(tools): handle boolean JSON subschemas during argument validation](https://github.com/HKUDS/nanobot/pull/5859)  
- 状态：Closed  
- 类型：Bug Fix / Test  
- 影响范围：工具调用、JSON Schema 参数校验  

该 PR 修复了工具参数准备流程在遇到合法 boolean JSON subschema 时崩溃的问题。根因是参数转换和校验逻辑假设所有 subschema 都是字典并调用 `.get()`，但 JSON Schema 标准允许 `true` / `false` 作为子模式。  
这对使用复杂工具 schema 的开发者很重要，可减少 agent 工具调用在边界 schema 下的运行时失败。

#### 3. 修复 Windows 下带引号可执行文件无参数调用问题  
- PR：[#5868 fix(exec): invoke quoted Windows executable without arguments](https://github.com/HKUDS/nanobot/pull/5868)  
- 状态：Closed  
- 类型：Bug Fix / Test  
- 影响范围：命令执行、Windows 兼容性  

该 PR 修复了 PowerShell 中执行类似 `"C:\Program Files\..."` 的带引号路径、且没有参数时无法正确调用的问题。通过确保无参数场景也使用正确调用方式，提升了 Windows 用户运行 CLI / 执行工具时的可靠性。

#### 4. WebUI Markdown 表格换行优化  
- PR：[#5862 fix(webui): wrap Markdown table content](https://github.com/HKUDS/nanobot/pull/5862)  
- 状态：Closed  
- 类型：Bug Fix / WebUI / Test  
- 影响范围：WebUI 聊天阅读体验  

该 PR 让 Markdown 表格不再强制撑开对话宽度，而是使用固定表格布局，并对文本、URL、标识符进行软换行。  
这类 UI 体验修复虽不影响核心能力，但能显著改善长内容、日志、代码说明和数据表格在聊天界面中的可读性。

#### 5. 移除 WebUI queued send hint  
- PR：[#5860 Remove queued send hint](https://github.com/HKUDS/nanobot/pull/5860)  
- 状态：Closed  
- 类型：Enhancement / WebUI  
- 影响范围：WebUI 文案、国际化资源  

该 PR 移除了 queued-prompt header 中的说明性提示，并清理了各语言中不再使用的翻译内容。说明维护者正在持续打磨 WebUI 的界面简洁度，减少不必要文案干扰。

#### 6. 原子 JSONL 写入 helper 重构的旧 PR 关闭  
- PR：[#5872 refactor(utils): dedupe atomic JSONL write helper](https://github.com/HKUDS/nanobot/pull/5872)  
- 状态：Closed  
- 类型：Refactor / Test  
- 说明：该 PR 与后续仍打开的 [#5873](https://github.com/HKUDS/nanobot/pull/5873) 内容高度一致，可能是被新 PR 取代。  
- 影响范围：MemoryStore、JsonlSessionStore、WebUI transcript rewrite  

虽然 #5872 已关闭，但其工作并未消失，而是延续到 #5873。该方向有助于减少重复的原子写入逻辑，提高持久化数据写入的一致性和可靠性。

---

## 3. 社区热点

### 1. Telegram 上下文压缩通知重复发送  
- Issue：[#5870 Telegram: context compaction completion notice is repeated multiple times](https://github.com/HKUDS/nanobot/issues/5870)  
- 状态：Open  
- 优先级：P1  
- 评论数：3  
- 关联 PR：[#5874 fix: keep heartbeat compaction notices off user channels](https://github.com/HKUDS/nanobot/pull/5874)

这是今日最值得关注的问题。用户报告在 Telegram 个人聊天中反复看到 `Context compacted.` 通知，最初同一段持续对话中出现了 6 次，之后仍持续出现。根据摘要，gateway 日志显示这些通知大多与内部自动压缩有关。  

背后诉求很明确：  
- 用户希望内部维护事件不要泄露到用户聊天界面；  
- Telegram 等即时通讯渠道对噪音非常敏感，重复系统提示会破坏对话体验；  
- 心跳、上下文压缩、内部 runtime 维护等机制需要和用户可见输出严格隔离。  

维护者已快速提交修复 PR #5874，说明该项目对 P1 体验问题响应较快。

### 2. 视频输入支持需求  
- Issue：[#5869 Any chance to add video support?](https://github.com/HKUDS/nanobot/issues/5869)  
- 状态：Open  
- 标签：enhancement、feature request、priority: p2  
- 评论数：0  

用户提出当前视频只是保存到磁盘，并将路径文本传给 LLM；但随着多模态 / omni 模型支持视频输入，用户希望 NanoBot 能从特定 channel 直接把视频发送给支持视频理解的模型，例如 qwen 系列或其他多模态模型。  

这反映出 NanoBot 用户正在从“文本 + 文件路径辅助”转向更完整的多模态 agent 工作流，尤其是在即时通讯渠道、个人助手、自动化处理视频内容等场景中。

---

## 4. Bug 与稳定性

按严重程度与影响范围排序如下。

### P1：Telegram 重复发送上下文压缩通知  
- Issue：[#5870](https://github.com/HKUDS/nanobot/issues/5870)  
- 状态：Open  
- 严重程度：高  
- 影响范围：Telegram Channel、上下文压缩、heartbeat/runtime 内部事件隔离  
- 是否已有修复 PR：有，[#5874](https://github.com/HKUDS/nanobot/pull/5874)

该问题直接影响最终用户聊天体验。重复的 `Context compacted.` 通知属于内部状态泄露到用户界面的表现，可能让用户误以为机器人异常、重复执行或无法正确维持会话状态。  
PR #5874 的修复思路是让 heartbeat 运行中的压缩通知不再进入用户 channel，避免 idle compaction 等内部事件污染用户聊天。

### P1：fallback tokenizer 预热导致的性能 / 启动体验问题  
- PR：[#5861 fix(tokens): warm fallback tokenizer in background](https://github.com/HKUDS/nanobot/pull/5861)  
- 状态：Open  
- 优先级：P1  
- 影响范围：gateway 启动、chat token 估算、CLI/SDK 消费者  
- 是否已有修复 PR：该 PR 即为修复方案

该 PR 将 fallback tokenizer 的预热放到 daemon thread 中，在 gateway 启动时后台处理；CLI/SDK 场景则采用 lazy warmup。聊天流程在 tokenizer 准备好之前使用 UTF-8 byte estimate。  
这表明当前 tokenizer 初始化可能影响启动速度或响应延迟。若合并，可改善冷启动和首轮交互体验。

### P2：CLI Apps 安装来源缺少可信 provenance  
- PR：[#5866 fix(cli-apps): record install provenance, fail closed on registry drift](https://github.com/HKUDS/nanobot/pull/5866)  
- 状态：Open  
- 标签：bug、fix、test、security、priority: p2  
- 影响范围：`nanobot apps`、远程 registry、供应链安全  
- 是否已有修复 PR：该 PR 即为修复方案

该 PR 指出 CLI Apps catalog 从远程 registry 安装包，但 registry metadata 未签名，若 registry entry 被控制或篡改，用户机器上执行的内容可能被替换。  
修复方向是记录安装 provenance，并在 registry 漂移时 fail closed。这是安全层面的重要改进，建议优先 review。

### P2：WebUI 新会话首轮消息未保留用户选择的 preset  
- PR：[#5865 fix(webui): preserve selected preset on first turn](https://github.com/HKUDS/nanobot/pull/5865)  
- 状态：Open  
- 标签：bug、webui、fix、test、priority: p2  
- 影响范围：WebUI、新建聊天、模型 preset、首轮 runtime selection  
- 是否已有修复 PR：该 PR 即为修复方案

该问题会导致用户在 WebUI 创建新会话并选择模型 preset 后，首轮消息可能未按预期使用所选 preset。  
修复方案是在新 chat provisioning 时发送所选 preset，并将其作为受限的 transient state 保存到首条消息被接受前。该改动对用户信任感很重要，因为模型选择错误通常不容易被用户立即定位。

### P2：Discord runtime reset 后延迟 reaction 任务未取消  
- PR：[#5864 fix(discord): cancel delayed reaction tasks on runtime reset](https://github.com/HKUDS/nanobot/pull/5864)  
- 状态：Open  
- 标签：bug、channel、fix、test、priority: p2  
- 关联 Issue：[#5806](https://github.com/HKUDS/nanobot/issues/5806)  
- 是否已有修复 PR：该 PR 即为修复方案

该 PR 修复 Discord channel 在 runtime reset 时只取消 typing tasks，而未取消 delayed working-emoji reaction tasks 的问题。  
若不修复，可能出现 runtime 重置后仍有旧任务尝试操作已 detach 的 Discord client，导致异常、幽灵 reaction 或资源泄露。

### P2：SSE Responses consumer 未处理 raw reasoning_text 事件  
- PR：[#5863 fix(providers): handle raw reasoning_text events in the SSE Responses consumer](https://github.com/HKUDS/nanobot/pull/5863)  
- 状态：Open  
- 标签：bug、provider、fix、test、priority: p2  
- 关联 Issue：[#5833](https://github.com/HKUDS/nanobot/issues/5833)  
- 是否已有修复 PR：该 PR 即为修复方案

该 PR 让 `consume_sse_with_reasoning` 能处理 `response.reasoning_text.delta` 和 `response.reasoning_text.done`，与 SDK stream consumer 行为保持一致。  
这对支持 reasoning 流式输出的 provider 很关键，可避免推理内容丢失或回调不一致。

---

## 5. 功能请求与路线图信号

### 1. 视频输入与多模态模型直连能力  
- Issue：[#5869 Any chance to add video support?](https://github.com/HKUDS/nanobot/issues/5869)  
- 状态：Open  
- 优先级：P2  
- 类型：Feature Request

用户希望 NanoBot 支持将视频从特定 channel 直接发送给支持视频输入的 omni / 多模态模型，而不是仅保存到磁盘并把路径传给 LLM。  

路线图信号：  
- 该需求与当前 AI agent 生态趋势一致，多模态输入正在从图片扩展到视频、音频、长上下文感知。  
- 若 NanoBot 要强化“个人 AI 助手”定位，视频理解会成为重要能力，尤其适用于 Telegram、Discord、WebUI 等渠道。  
- 当前暂无对应 PR，但已有 channel、provider、tooling 层面的活跃开发，说明未来接入视频 pipeline 具备基础条件。

### 2. Linear 原生 agent 体验增强  
- PR：[#5871 feat(linear): improve native agent UX](https://github.com/HKUDS/nanobot/pull/5871)  
- 状态：Open  
- 标签：documentation、channel、webui、feature、test、priority: p2  
- 类型：Feature / UX Improvement

该 PR 改进 Linear 原生 agent 体验，包括：  
- 支持 Linear mentions 和 delegated issues；  
- 改善 OAuth callback 与 channel/runtime 状态文案；  
- 增加 authorized workspace health、scope visibility、安全 OAuth revoke、pairing guidance；  
- 提供更直接的 Linear tools setup path；  
- 映射 buttons、attachments、reasoning 等能力。  

路线图信号：NanoBot 正在加强与工作流工具的原生集成，尤其是 Linear 这类 issue/project management 平台。这表明项目不仅关注聊天机器人场景，也在向“任务执行型 agent”扩展。

### 3. 原子 JSONL 写入逻辑统一  
- PR：[#5873 refactor(utils): dedupe atomic JSONL write helper](https://github.com/HKUDS/nanobot/pull/5873)  
- 状态：Open  
- 标签：refactor、test、priority: p2  
- 关联：Closes [#5290](https://github.com/HKUDS/nanobot/issues/5290)

该 PR 将 MemoryStore、JsonlSessionStore、WebUI transcript rewriter 中重复的 atomic JSONL write 逻辑统一到 `atomic_write_lines` helper。  
虽然属于重构，但对长期稳定性很重要，尤其涉及 memory/session/transcript 等持久化数据，能够减少不同模块实现不一致导致的数据损坏风险。

---

## 6. 用户反馈摘要

### Telegram 用户反馈：内部系统事件过度暴露  
- 来源：Issue [#5870](https://github.com/HKUDS/nanobot/issues/5870)

用户在 Telegram 私聊中反复看到 `Context compacted.`，说明其核心痛点不是上下文压缩本身，而是内部维护事件被多次显示在用户对话中。  
这类问题会带来几类负面体验：  
- 对话被系统消息打断；  
- 用户难以判断机器人是否异常；  
- 私聊场景下重复通知更显突兀；  
- 用户可能误以为上下文频繁丢失或机器人不断重置状态。  

该反馈说明 NanoBot 在多 channel 输出层需要继续强化“用户可见消息”和“内部 runtime 事件”的边界。

### 多模态用户反馈：视频不能只作为文件路径处理  
- 来源：Issue [#5869](https://github.com/HKUDS/nanobot/issues/5869)

用户指出当前视频处理方式只是保存到磁盘并将路径文本交给 LLM，这与现代多模态模型能力不匹配。  
真实需求是：  
- channel 收到视频后，agent 能直接把视频内容传给支持视频输入的模型；  
- 用户不希望手动转换、提取帧或摘要；  
- 期望 NanoBot 能作为多模态入口，而不是只做文件转存。  

该反馈对项目定位有启发意义：如果 NanoBot 要继续服务个人助手场景，多模态输入将越来越关键。

---

## 7. 待处理积压

由于本日报仅包含过去 24 小时的 GitHub 数据，无法准确判断“长期未响应”的 Issue 或 PR。不过，当前仍有以下高优先级或高影响待处理项建议维护者优先关注：

### 高优先级待合并

1. **Telegram 重复压缩通知修复**  
   - PR：[#5874](https://github.com/HKUDS/nanobot/pull/5874)  
   - 关联 Issue：[#5870](https://github.com/HKUDS/nanobot/issues/5870)  
   - 建议：优先 review / 合并，因其为 P1 且直接影响用户聊天体验。

2. **fallback tokenizer 后台预热**  
   - PR：[#5861](https://github.com/HKUDS/nanobot/pull/5861)  
   - 优先级：P1  
   - 建议：关注启动性能、缓存路径、并发初始化和 CLI/SDK 行为一致性。

### 安全相关待处理

3. **CLI Apps 安装 provenance 与 registry drift fail-closed**  
   - PR：[#5866](https://github.com/HKUDS/nanobot/pull/5866)  
   - 标签：security  
   - 建议：该 PR 涉及供应链安全，建议优先安排安全审查。

### 稳定性与一致性待处理

4. **Discord delayed reaction task 清理**  
   - PR：[#5864](https://github.com/HKUDS/nanobot/pull/5864)  
   - 关联 Issue：[#5806](https://github.com/HKUDS/nanobot/issues/5806)

5. **SSE reasoning_text 事件处理一致性**  
   - PR：[#5863](https://github.com/HKUDS/nanobot/pull/5863)  
   - 关联 Issue：[#5833](https://github.com/HKUDS/nanobot/issues/5833)

6. **WebUI 首轮 preset 保留**  
   - PR：[#5865](https://github.com/HKUDS/nanobot/pull/5865)

7. **原子 JSONL 写入 helper 重构**  
   - PR：[#5873](https://github.com/HKUDS/nanobot/pull/5873)  
   - 关联 Issue：[#5290](https://github.com/HKUDS/nanobot/issues/5290)

8. **Linear 原生 agent 体验增强**  
   - PR：[#5871](https://github.com/HKUDS/nanobot/pull/5871)

---

## 项目健康度评估

NanoBot 今日表现出较强的维护活跃度和响应能力：P1 用户体验问题当天已有修复 PR，多个 P2 稳定性问题也有明确补丁。项目当前的主要工作集中在 **channel 行为一致性、WebUI 体验、provider 流式 reasoning 支持、工具与文件系统兼容性、安全加固**。  

风险方面，当前打开的 PR 中包含 P1、security、provider、channel 等多个关键领域变更，若 review 积压，可能影响下一版本稳定性。建议维护者优先合并 P1 与安全相关修复，再处理 WebUI 和重构类改进。总体来看，项目处于健康且高迭代状态。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
日期：2026-09-23  
仓库：NousResearch/hermes-agent

---

## 1. 今日速览

过去 24 小时 Hermes Agent 活跃度很高：Issues 更新 50 条，其中 49 条仍处于新开或活跃状态，仅 1 条关闭；PR 更新 50 条，其中 48 条仍待合并，2 条已合并或关闭。整体来看，社区反馈集中在 **Desktop、Gateway、配置迁移、MCP、流式输出、更新机制、多平台消息投递** 等稳定性问题上，说明 v0.21.4 周期后用户在真实部署环境中遇到了较多边界场景。

维护侧响应速度较快，多个当天新开的 Bug 已经出现对应修复 PR，例如 MCP 安装事务回滚、Desktop 更新状态展示、被动更新检查鉴权、插件目录 ID 冲突、Gateway `--replace` 行为等。不过待合并 PR 数量明显堆积，短期项目健康度取决于这些稳定性修复能否快速进入主线。

今日没有新版本发布，项目处于 **高活跃、高问题暴露、高修复准备度，但合并压力较大** 的状态。

---

## 2. 版本发布

今日无新版本发布。

最新 Releases 数据为空，因此暂无新的破坏性变更、迁移说明或版本升级建议。当前社区反馈主要围绕 v0.21.4 / v2026.9.21 以及 v0.21.3 运行时的回归和兼容性问题展开。

---

## 3. 项目进展

今日 PR 活动非常密集，但从已展示数据看，主要进展仍处于 **待合并修复准备阶段**，尚未形成大规模合并落地。

### 已关闭 / 状态变化的重要 PR

#### #119800 feat(telegram): semantic forum-topic icons on auto-title rename  
链接：https://github.com/NousResearch/hermes-agent/pull/119800  
状态：CLOSED  
类型：Feature / Telegram / Plugin / Gateway

该 PR 提议为 Telegram DM forum topic 自动标题重命名增加语义图标选择能力，属于体验增强功能。当前已关闭，说明该方向暂未进入主线，可能是因为实现复杂度、产品优先级或平台兼容性风险尚未达成一致。

### 今日新增且值得关注的修复 PR

#### #119808 fix(gateway): --replace starts beside another profile's standalone owner  
链接：https://github.com/NousResearch/hermes-agent/pull/119808  
关联 Issue：https://github.com/NousResearch/hermes-agent/issues/119807  
修复 Gateway 在一机多 profile、一 profile 一 gateway 场景下，`--replace` 误判其他 profile 的 standalone owner，导致进程退出与 respawn storm 的问题。该修复对多 profile 生产部署稳定性较关键。

#### #119798 fix(mcp): roll back config and env when an install fails mid-commit  
链接：https://github.com/NousResearch/hermes-agent/pull/119798  
关联 Issue：https://github.com/NousResearch/hermes-agent/issues/119797  
为 MCP 安装过程增加事务式回滚，避免失败后 `config.yaml` 和 `.env` 留下半提交状态。该修复直接改善配置一致性和用户信任。

#### #119803 fix(desktop): report a failed backend update check instead of "up to date"  
链接：https://github.com/NousResearch/hermes-agent/pull/119803  
关联 Issue：https://github.com/NousResearch/hermes-agent/issues/119801  
修复 Desktop 在后端更新检查失败时误报“已是最新版”的问题，提升安装更新流程的可观测性。

#### #119802 / #119796 / #119795 fix(cli): authenticate passive GitHub update checks  
链接：  
- https://github.com/NousResearch/hermes-agent/pull/119802  
- https://github.com/NousResearch/hermes-agent/pull/119796  
- https://github.com/NousResearch/hermes-agent/pull/119795  

关联 Issue：  
- https://github.com/NousResearch/hermes-agent/issues/119791  
- https://github.com/NousResearch/hermes-agent/issues/119792  

多个 PR 同时修复被动更新检查匿名访问 GitHub API 的问题，避免共享 NAT、VPN、CI、办公室代理出口下触发 GitHub 匿名限流。该问题虽然不是核心功能故障，但会显著影响更新提醒的可靠性。

#### #119799 fix(catalog): disambiguate plugin and skill rows by kind  
链接：https://github.com/NousResearch/hermes-agent/pull/119799  
关联 Issue：https://github.com/NousResearch/hermes-agent/issues/119776  
修复插件和 skill 使用相同 catalog ID 时 approval card 无法区分的问题。该 PR 将身份从单纯 `id/name` 改为 `(kind, id)`，对插件生态扩展很重要。

#### #119787 fix(tts): keep displayed reasoning out of voice replies  
链接：https://github.com/NousResearch/hermes-agent/pull/119787  
修复语音回复中混入 reasoning 展示文本的问题，提升 Gateway 语音交互质量，尤其对 Telegram、QQBot 等消息平台的 TTS 使用场景有帮助。

#### #119788 fix(memory): store holographic db_path portable so clones and renames keep their own fact DB  
链接：https://github.com/NousResearch/hermes-agent/pull/119788  
修复 profile clone / rename 后 holographic memory 仍指向旧路径的问题，避免不同 profile 之间记忆数据库串联或污染。

#### #119811 fix(delegate): subagent.complete files_written was permanently empty  
链接：https://github.com/NousResearch/hermes-agent/pull/119811  
修复 delegate 子代理完成事件中 `files_written` 永远为空的问题，有助于改善多代理任务追踪、审计和 UI 展示。

---

## 4. 社区热点

### 1. Todoist MCP OAuth PKCE 失败  
Issue：https://github.com/NousResearch/hermes-agent/issues/119661  
状态：OPEN  
评论数：7  
标签：`type/bug`, `comp/plugins`, `tool/mcp`, `P3`

用户在 Desktop 中添加 Todoist MCP connector 时，OAuth 授权服务器返回：

```json
{
  "error": "invalid_request",
  "error_description": "code_challenge is required for public clients"
}
```

该问题评论数最高，说明 MCP connector 的第三方集成稳定性是当前社区关注重点。背后诉求是：Hermes 作为个人 AI 助手需要可靠接入外部工具，而 OAuth / PKCE 这类认证细节一旦失败，会直接阻断用户的自动化工作流。

目前从今日 PR 列表中未看到明确对应修复 PR，建议维护者优先确认 Todoist OAuth 客户端类型与 PKCE 参数生成逻辑。

---

### 2. 流式输出完成后被误判为中途断流  
Issue：https://github.com/NousResearch/hermes-agent/issues/119663  
状态：OPEN  
评论数：5  
标签：`type/bug`, `comp/agent`, `P2`, `needs-repro`, `area/streaming`

问题描述显示，在 OpenRouter + DeepSeek 模型下，已经完成的 stream 可能因为 superseded writer 处理 terminal chunk 的方式，被错误标记为 mid-stream drop，导致完成内容被丢弃。

这是一个 P2 级别的核心 Agent 可靠性问题。用户诉求集中在：即使底层 provider streaming 行为复杂，Hermes 也不应丢弃已生成完成内容。该问题会影响桌面聊天、长任务执行、代理输出可信度。

目前暂无明确对应 PR。

---

### 3. Gateway platform 配置中的 `${VAR}` 未展开  
Issue：https://github.com/NousResearch/hermes-agent/issues/119733  
状态：OPEN  
评论数：2  
标签：`type/bug`, `comp/gateway`, `platform/webhook`, `area/auth`, `area/config`, `P2`

用户指出文档承诺 `config.yaml` 中支持 `${VAR_NAME}` 环境变量替换，但 Gateway 的 `platforms.*.extra` 路径未进行展开，影响 webhook secret、api_server key、Teams credentials 等敏感配置。

这类问题影响安全配置实践：用户希望把 secret 放在 `.env` 或环境变量中，而不是硬编码到 `config.yaml`。该问题还与 #119763 形成同类信号，说明 Gateway 配置加载路径与 CLI 配置加载路径存在不一致。

相关 Issue：  
- https://github.com/NousResearch/hermes-agent/issues/119763

---

### 4. Desktop profile rail 颜色冲突与身份识别不足  
Issue：https://github.com/NousResearch/hermes-agent/issues/119701  
状态：OPEN  
评论数：2  
标签：`type/feature`, `P3`, `comp/desktop`, `area/profiles`

用户反馈 Desktop profile rail 使用 profile name hash 映射颜色，导致不同 profile 可能出现相同颜色，且 bot identity 主要依赖 tooltip 展示。该问题本质上是多 profile 用户的可用性诉求：当用户同时管理多个机器人或多个角色配置时，仅靠颜色无法可靠区分身份。

暂无对应修复 PR。

---

### 5. `reasoning_effort` 在 bare named providers 下被静默丢弃  
Issue：https://github.com/NousResearch/hermes-agent/issues/119681  
状态：OPEN  
评论数：2  
标签：`type/bug`, `comp/agent`, `tool/delegate`, `area/config`, `P2`, `comp/desktop`

该问题指出当 `agent.provider` 指向 `config.yaml` 中 `providers:` 的 bare named provider，例如 `opencodex`，`reasoning_effort` 会因为 provider profile 解析失败而被静默丢弃。影响范围包括 delegate 子任务和 Desktop session。

这是配置语义和模型能力控制相关的问题。用户的核心诉求是：显式配置不应被静默忽略，尤其是 reasoning effort 这类会影响成本、质量和模型行为的重要参数。

相关新 Issue：  
- https://github.com/NousResearch/hermes-agent/issues/119810  
  `hermes config set agent.reasoning_effort` 虽然保存且运行时读取，但 CLI 却提示不是 recognized config key。

---

## 5. Bug 与稳定性

以下按影响严重程度和潜在用户范围排序。

### P2 / 高影响问题

#### 1. Desktop chat 在繁忙主机上冻结数分钟，生成回复可能不进入 UI  
Issue：https://github.com/NousResearch/hermes-agent/issues/119643  
状态：OPEN  
标签：`type/perf`, `comp/gateway`, `comp/desktop`, `area/sessions`, `P2`

用户报告 Desktop chat UI 在繁忙主机上数分钟无响应，且有 1,630 字符回复已生成但未显示，只能在 session 数据中找到。  
影响：直接损害聊天可用性和用户信任。  
当前是否有 fix PR：未看到明确对应 PR。

---

#### 2. 已完成 streaming 被误判为 mid-stream drop  
Issue：https://github.com/NousResearch/hermes-agent/issues/119663  
状态：OPEN  
标签：`comp/agent`, `area/streaming`, `P2`  
影响：生成内容可能被丢弃。  
当前是否有 fix PR：未看到明确对应 PR。

---

#### 3. Gateway webhook / platform 配置环境变量不展开  
Issue：https://github.com/NousResearch/hermes-agent/issues/119733  
状态：OPEN  
标签：`comp/gateway`, `area/auth`, `area/config`, `P2`  
相关 Issue：https://github.com/NousResearch/hermes-agent/issues/119763  
影响：secret、token、port 等配置路径不一致，可能导致部署失败或迫使用户硬编码敏感信息。  
当前是否有 fix PR：未看到明确对应 PR。

---

#### 4. QQBot Gateway 重启后群消息路由错误  
Issue：https://github.com/NousResearch/hermes-agent/issues/119805  
状态：OPEN  
标签：`comp/gateway`, `comp/cron`, `platform/qqbot`, `P2`

重启后向 QQ 群 openid 发送消息会错误路由到 `/v2/users/<group_openid>/messages`，直到该群有入站流量才恢复。  
影响：重启后主动群通知、cron 消息、自动化提醒可能全部失败。  
当前是否有 fix PR：未看到明确对应 PR。

---

#### 5. Gateway `--replace` 在一 profile 一 gateway 部署中导致 respawn storm  
Issue：https://github.com/NousResearch/hermes-agent/issues/119807  
状态：OPEN  
影响：多 profile host 上除持有 host lock 的单元外，其他 gateway 可能不断退出重启。  
对应 PR：https://github.com/NousResearch/hermes-agent/pull/119808  
状态：已有修复 PR，待合并。

---

#### 6. OpenAI `/v1/responses` stream 缺少 content_part 事件  
Issue：https://github.com/NousResearch/hermes-agent/issues/119758  
状态：OPEN  
标签：`comp/gateway`, `provider/openai`, `P2`

`/v1/responses` streaming endpoint 未发送 `response.content_part.added/done`，导致 OpenAI Python SDK 的 `responses.stream()` 每轮抛 `IndexError`。  
影响：OpenAI SDK 兼容性严重受损。  
当前是否有 fix PR：未看到明确对应 PR。

---

#### 7. Desktop “Cancel install” 无法终止 git / uv 子进程  
Issue：https://github.com/NousResearch/hermes-agent/issues/119753  
状态：OPEN  
标签：`comp/desktop`, `area/install-update`, `P2`

取消 first-launch install 或中途退出 app 只终止 shell / powershell，不终止其子进程，导致取消操作挂起直到长任务结束。  
影响：安装体验和资源控制较差，尤其在慢网络或失败安装环境中。  
当前是否有 fix PR：未看到明确对应 PR。

---

#### 8. Telegram lazy install 在 pip mirror + exclude-newer 下失败  
Issue：https://github.com/NousResearch/hermes-agent/issues/119704  
状态：OPEN  
标签：`comp/gateway`, `platform/telegram`, `area/config`, `P2`, `python:uv`

配置 Telegram gateway 后，lazy install `python-telegram-bot` 时可能因镜像索引与 `exclude-newer` 限制导致 tornado 无可用版本。  
影响：重建 venv 或更新后 Telegram gateway 无法启动。  
当前是否有 fix PR：未看到明确对应 PR。

---

#### 9. `reasoning_effort` 配置被静默丢弃  
Issue：https://github.com/NousResearch/hermes-agent/issues/119681  
状态：OPEN  
标签：`comp/agent`, `tool/delegate`, `comp/desktop`, `P2`  
影响：用户配置的推理强度未实际应用，影响模型质量、成本和一致性。  
当前是否有 fix PR：未看到明确对应 PR。

---

#### 10. MCP 安装失败后留下半提交配置  
Issue：https://github.com/NousResearch/hermes-agent/issues/119797  
状态：OPEN  
标签：`tool/mcp`, `area/config`, `P2`  
对应 PR：https://github.com/NousResearch/hermes-agent/pull/119798  
影响：`config.yaml` 和 `.env` 状态不一致，后续排障困难。  
状态：已有修复 PR，待合并。

---

### P3 / 中等影响问题

#### Todoist MCP OAuth 缺少 `code_challenge`  
Issue：https://github.com/NousResearch/hermes-agent/issues/119661  
状态：OPEN  
影响：Todoist 集成不可用。  
当前是否有 fix PR：未看到明确对应 PR。

#### CLI config migration 失败后仍把 `_config_version` 标记为最新  
Issue：https://github.com/NousResearch/hermes-agent/issues/119658  
状态：OPEN  
影响：失败 migration 不会再次运行，可能导致用户配置永久停留在半迁移状态。  
当前是否有 fix PR：未看到明确对应 PR。

#### `tool_call` 不修复 JSON-string `calls` payload  
Issue：https://github.com/NousResearch/hermes-agent/issues/119640  
状态：OPEN  
影响：模型输出 JSON 字符串化工具调用时，工具链直接失败。  
当前是否有 fix PR：未看到明确对应 PR。

#### mem0 `sync_turn` 强制 `infer=True`，成本高且与显式 mem0_add 不一致  
Issue：https://github.com/NousResearch/hermes-agent/issues/119627  
状态：OPEN  
影响：大规模使用时成本上升，记忆写入语义不一致。  
当前是否有 fix PR：未看到明确对应 PR。

#### Desktop 启动时自动写入上次 session 的 main model 到主配置  
Issue：https://github.com/NousResearch/hermes-agent/issues/119664  
状态：OPEN  
影响：无用户操作写配置，可能污染 profile 默认模型。  
当前是否有 fix PR：未看到明确对应 PR。

#### 被动更新检查匿名调用 GitHub API  
Issue：  
- https://github.com/NousResearch/hermes-agent/issues/119791  
- https://github.com/NousResearch/hermes-agent/issues/119792  

对应 PR：  
- https://github.com/NousResearch/hermes-agent/pull/119802  
- https://github.com/NousResearch/hermes-agent/pull/119796  
- https://github.com/NousResearch/hermes-agent/pull/119795  

状态：已有多个修复 PR；#119791 已关闭，#119792 仍 open。  
影响：共享出口下容易触发 GitHub rate limit，造成更新检查失败。

#### Desktop 更新检查失败时显示“已是最新版”  
Issue：https://github.com/NousResearch/hermes-agent/issues/119801  
对应 PR：https://github.com/NousResearch/hermes-agent/pull/119803  
状态：已有修复 PR，待合并。

#### Plugin Catalog 中 plugin 与 skill 同 ID 无法同时安装  
Issue：https://github.com/NousResearch/hermes-agent/issues/119776  
对应 PR：https://github.com/NousResearch/hermes-agent/pull/119799  
状态：已有修复 PR，待合并。

#### Memory provider migration 结果只写入 agent.log，用户终端无提示  
Issue：https://github.com/NousResearch/hermes-agent/issues/119769  
状态：OPEN  
影响：`allow_lazy_installs: false` 时用户可能静默失去 memory 功能。  
当前是否有 fix PR：未看到明确对应 PR。

#### 文档中的 CLI 示例无法直接运行  
Issue：https://github.com/NousResearch/hermes-agent/issues/119756  
状态：OPEN  
影响：profile 迁移、备份恢复、send、skills、sessions、kanban、cron 等文档命令复制即失败。  
当前是否有 fix PR：未看到明确对应 PR。

---

## 6. 功能请求与路线图信号

今日出现多条与 Agent 路由、成本控制、文件工具、分析可视化相关的新功能请求，并且部分已同步出现 PR，说明这些方向有较高概率进入近期版本讨论。

### 1. 文件工具增加 outline read mode  
Issue：https://github.com/NousResearch/hermes-agent/issues/119781  
PR：https://github.com/NousResearch/hermes-agent/pull/119785  
标签：`type/feature`, `tool/file`, `P4`

该功能为 `read_file` 增加 `outline: true`，对 Python 文件返回类、函数、签名、行号、docstring 摘要，而不是完整正文。  
路线图信号：面向长文件理解、代码库导航、减少 token 消耗。由于已有 PR，进入下一版本的可能性较高，但优先级为 P4，可能取决于评审成本。

---

### 2. 失败触发的模型层级升级与 sticky lock  
Issue：https://github.com/NousResearch/hermes-agent/issues/119780  
PR：https://github.com/NousResearch/hermes-agent/pull/119784  
标签：`type/feature`, `comp/agent`, `area/config`, `P3`

用户希望当便宜模型在硬任务上反复失败时，系统能自动升级到更强模型，并保持升级直到问题通过验证。  
路线图信号：Hermes 正在从“静态模型配置”向“任务结果驱动的动态路由”演进。PR 标有 `needs-decision`，说明产品语义仍需维护者确认。

---

### 3. Budget-aware downshift hook for auxiliary routing  
Issue：https://github.com/NousResearch/hermes-agent/issues/119778  
PR：https://github.com/NousResearch/hermes-agent/pull/119783  
标签：`type/feature`, `area/usage-cost`, `area/billing`, `P3`

该功能希望在 session 花费超过阈值后，将辅助路由降级到更便宜的 fallback tier。  
路线图信号：成本感知路由是个人 AI 助手长期运行的重要能力。由于已有使用量记录基础，且 PR 已提交，可能成为成本治理路线的一部分。

---

### 4. Deterministic auto-repair in turn recovery  
Issue：https://github.com/NousResearch/hermes-agent/issues/119777  
标签：`type/feature`, `comp/agent`, `tool/file`, `P3`

用户希望当 `write_file` 或 `patch` 后的语法检查失败时，系统可先尝试确定性 formatter 或自动修复，而不是消耗一次完整模型推理。  
路线图信号：这是降低 token 成本、提升代码编辑闭环效率的方向。今日未见对应 PR。

---

### 5. Model usage timeline analytics  
PR：https://github.com/NousResearch/hermes-agent/pull/119804  
标签：`type/feature`, `comp/dashboard`, `area/usage-cost`, `P3`

该 PR 新增本地 append-only `api_call_usage` ledger，并暴露 `/api/analytics/model-usage`，提供按小时 / 天、按模型聚合的 token 和 API call 桶。  
路线图信号：Hermes 正在加强本地分析、成本可视化和模型使用审计能力。该功能与 budget-aware routing 形成互补。

---

## 7. 用户反馈摘要

### 1. 用户希望配置行为“可预测、可解释、可恢复”

多个 Issue 指向配置系统一致性问题：

- `${VAR}` 在 Gateway 平台配置中不展开：https://github.com/NousResearch/hermes-agent/issues/119733  
- Webhook env vars 在 config.yaml 启用路径下被忽略：https://github.com/NousResearch/hermes-agent/issues/119763  
- MCP 安装失败后配置半提交：https://github.com/NousResearch/hermes-agent/issues/119797  
- migration 失败后仍标记为最新：https://github.com/NousResearch/hermes-agent/issues/119658  
- Desktop 启动自动写 config.yaml：https://github.com/NousResearch/hermes-agent/issues/119664  

这些反馈显示用户对 Hermes 的配置系统有较高依赖，尤其是在多 profile、secret 管理、插件安装、升级迁移场景中。当前不满点集中在：配置被静默忽略、被自动改写、失败后不可恢复。

---

### 2. 多平台 Gateway 用户关注“消息不能丢、重启后要恢复”

Gateway 相关反馈很多，覆盖 Telegram、QQBot、Webhook、TTS、OpenAI-compatible API：

- QQBot 重启后群消息路由错误：https://github.com/NousResearch/hermes-agent/issues/119805  
- Gateway `--replace` respawn storm：https://github.com/NousResearch/hermes-agent/issues/119807  
- OpenAI `/v1/responses` streaming 兼容性问题：https://github.com/NousResearch/hermes-agent/issues/119758  
- TTS 不应朗读 reasoning：https://github.com/NousResearch/hermes-agent/pull/119787  
- Telegram lazy install 失败：https://github.com/NousResearch/hermes-agent/issues/119704  

真实使用场景显示，Hermes 不只是本地聊天工具，而是被用户部署为长期在线的消息中枢。因此重启、更新、cron、群消息、语音回复等生产化路径的稳定性变得越来越重要。

---

### 3. Desktop 用户对安装更新和聊天实时性敏感

Desktop 相关反馈包括：

- Chat UI 冻结且回复丢失：https://github.com/NousResearch/hermes-agent/issues/119643  
- 更新后 gateway 未自动重启：https://github.com/NousResearch/hermes-agent/issues/119809  
- 更新检查失败误报最新版：https://github.com/NousResearch/hermes-agent/issues/119801  
- Cancel install 不能真正取消子进程：https://github.com/NousResearch/hermes-agent/issues/119753  
- Profile rail 颜色冲突：https://github.com/NousResearch/hermes-agent/issues/119701  

用户不满主要来自“系统已经做了事，但 UI 没有正确反映”或“UI 操作不能真正控制后端状态”。这类问题会显著影响非开发者用户对 Desktop 的信任。

---

### 4. 用户希望 Agent 更聪明地管理成本和能力

以下功能请求体现出高级用户正在构建长周期、复杂任务工作流：

- 失败后升级模型：https://github.com/NousResearch/hermes-agent/issues/119780  
- 超预算后降级模型：https://github.com/NousResearch/hermes-agent/issues/119778  
- 模型使用时间线：https://github.com/NousResearch/hermes-agent/pull/119804  
- 确定性自动修复减少推理开销：https://github.com/NousResearch/hermes-agent/issues/119777  

这说明 Hermes 的用户正在关注 **自动化任务质量、成本上限、模型路由策略、可观测性**，项目可能需要在下一阶段加强 policy engine 或 routing layer 的设计。

---

## 8. 待处理积压

基于今日数据，以下 open Issue / PR 建议维护者优先关注。这里的“积压”主要指：影响面较大、已有讨论或已有修复 PR 但尚未合并的问题。

### 优先合并的修复 PR

1. MCP 安装事务回滚  
   PR：https://github.com/NousResearch/hermes-agent/pull/119798  
   关联 Issue：https://github.com/NousResearch/hermes-agent/issues/119797  
   原因：防止配置半提交，影响用户环境可恢复性。

2. Gateway `--replace` 多 profile 修复  
   PR：https://github.com/NousResearch/hermes-agent/pull/119808  
   关联 Issue：https://github.com/NousResearch/hermes-agent/issues/119807  
   原因：可能导致部署环境 respawn storm，影响线上 gateway。

3. Desktop 更新检查失败展示修复  
   PR：https://github.com/NousResearch/hermes-agent/pull/119803  
   关联 Issue：https://github.com/NousResearch/hermes-agent/issues/119801  
   原因：避免误导用户“已是最新版”。

4. 被动 GitHub 更新检查鉴权  
   PR：  
   - https://github.com/NousResearch/hermes-agent/pull/119802  
   - https://github.com/NousResearch/hermes-agent/pull/119796  
   - https://github.com/NousResearch/hermes-agent/pull/119795  
   关联 Issue：  
   - https://github.com/NousResearch/hermes-agent/issues/119791  
   - https://github.com/NousResearch/hermes-agent/issues/119792  
   原因：多个重复 PR 出现，建议维护者尽快选定一个实现，关闭重复项。

5. Plugin Catalog plugin / skill ID 冲突  
   PR：https://github.com/NousResearch/hermes-agent/pull/119799  
   关联 Issue：https://github.com/NousResearch/hermes-agent/issues/119776  
   原因：影响插件生态扩展和 catalog 安装体验。

6. TTS 不朗读 reasoning  
   PR：https://github.com/NousResearch/hermes-agent/pull/119787  
   原因：直接改善语音回复用户体验，风险相对可控。

---

### 需要尽快 triage 的高影响 open Issue

1. Desktop chat freeze / 回复丢失  
   Issue：https://github.com/NousResearch/hermes-agent/issues/119643  
   建议：优先添加 UI/backend delivery tracing，确认消息是在 backend、gateway 还是 frontend 层丢失。

2. Streaming 完成内容被误判丢弃  
   Issue：https://github.com/NousResearch/hermes-agent/issues/119663  
   建议：尽快补充复现测试，避免 provider stream 竞态导致内容丢失。

3. Gateway config env substitution 不一致  
   Issue：https://github.com/NousResearch/hermes-agent/issues/119733  
   相关 Issue：https://github.com/NousResearch/hermes-agent/issues/119763  
   建议：统一 CLI loader 与 Gateway platform loader 的环境变量展开策略，并补充安全配置测试。

4. OpenAI `/v1/responses` stream SDK 不兼容  
   Issue：https://github.com/NousResearch/hermes-agent/issues/119758  
   建议：对照 OpenAI SDK streaming helper 事件顺序补齐 `response.content_part.added/done`。

5. QQBot 重启后群消息路由错误  
   Issue：https://github.com/NousResearch/hermes-agent/issues/119805  
   建议：检查 group openid 与 user openid 的持久化恢复逻辑，避免依赖入站流量修正状态。

6. Todoist MCP OAuth PKCE  
   Issue：https://github.com/NousResearch/hermes-agent/issues/119661  
   建议：确认 public client OAuth flow 是否始终生成 `code_challenge` / `code_verifier`，并补充 connector-level OAuth 测试。

---

## 总体健康度评估

Hermes Agent 今日表现出非常强的社区活跃度和快速修复动能，但稳定性压力明显上升。问题集中在 **升级安装、配置一致性、Gateway 长驻运行、Desktop 状态同步、streaming 可靠性、MCP 集成** 六个方面。积极信号是，多数具体问题当天已有 PR 响应；风险信号是，待合并 PR 数量高达 48 条，且存在重复修复 PR，维护者需要加强 triage、去重和发布节奏管理。

短期建议：优先发布一个以稳定性为核心的 patch 版本，聚焦配置事务性、Gateway 重启恢复、Desktop 更新路径、streaming 内容不丢失和 MCP OAuth / 安装一致性。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报

日期：2026-09-23  
仓库：github.com/qwibitai/nanoclaw  
统计窗口：过去 24 小时

---

## 1. 今日速览

过去 24 小时 NanoClaw 活跃度较高：共出现 2 条 Issue 更新、7 条 PR 更新，其中 3 个 PR 仍在等待合并，4 个 PR 已关闭或完成处理。今日重点集中在 **Codex / MCP 启动稳定性、安装向导、provider contract 注册、容器内 Claude Code / Agent SDK 升级，以及 CDSS 多渠道适配能力**。  
整体看，维护者正在同时推进两条主线：一是修复 setup、Codex、update-nanoclaw 等会影响安装或运行的稳定性问题；二是为 Customer Deployment Self Serve（CDSS）补齐 Slack / Teams 等企业渠道接入能力。  
社区互动数据较低，Issues 和 PR 均几乎没有评论与表情反馈，因此今日热度主要来自维护者密集提交和修复，而非外部用户讨论。

---

## 3. 项目进展

### 已关闭 / 完成处理的重要 PR

#### #3865 feat(cdss): Slack and Teams adapters per instance, pins, webhook mode, pending challenge  
链接：nanocoai/nanoclaw PR #3865  
状态：CLOSED  
作者：moshe-nanoco  

该 PR 推进了 CDSS 的渠道适配能力，新增或完善 Slack 与 Teams adapter，支持每个实例基于 `ChannelInstanceSpec` 独立构建。重点包括：

- Slack / Teams 每实例配置；
- webhook 模式；
- pin 机制；
- pending challenge 处理；
- 与 channels registry 分支配套。

这表明 NanoClaw 正在从单一或静态渠道接入，转向更适合企业部署的 **多实例、多租户、可动态配置的渠道体系**。

---

#### #3864 feat(cdss): channel credential provider, instance specs, per-instance webhook paths  
链接：nanocoai/nanoclaw PR #3864  
状态：CLOSED  
作者：moshe-nanoco  

该 PR 是 CDSS 的核心 seam 工作，为后续 Slack / Teams 等渠道动态实例化提供基础设施。主要改动包括：

- 新增 `ChannelCredentialProvider`；
- 引入 channel instance specs；
- 支持 per-instance webhook paths；
- 允许 operator surface 将已存储的聊天应用连接转换为运行中的 adapter instance；
- 主机无需知道凭据存储位置。

这是 CDSS 路线中的底层架构推进，价值在于让 NanoClaw 更适合自助式企业部署场景，尤其是需要在运行时接入不同客户、不同 workspace、不同渠道凭据的场景。

---

#### #3863 fix(setup): register a freshly installed provider contract before the gateway store uses it  
链接：nanocoai/nanoclaw PR #3863  
状态：CLOSED  
作者：glifocat  

该 PR 修复了 setup wizard 中 provider contract 注册时机的问题。此前在安装向导中途安装新的 provider contract 后，运行中的 setup 进程仍使用旧的 `src/provider-contracts/index` barrel，导致 gateway store 在首次 vault 写入前无法读取模型端点。

该修复直接对应 Issue #3862：  
链接：nanocoai/nanoclaw Issue #3862  

影响场景主要是 fresh install + Iron Proxy gateway provider + Codex device pairing。该问题会导致登录凭据无法正确 vault，属于安装链路上的高影响稳定性问题。

---

#### #3861 fix(setup): remember the image-source answer across resume so the Echo perk is offered once  
链接：nanocoai/nanoclaw PR #3861  
状态：CLOSED  
作者：glifocat  

该 PR 修复 setup wizard resume 后重复询问 Echo hardened image 来源的问题。此前 container step 已经询问并写入 `.env`，但 Echo perk reminder 在后续流程中会再次出现，导致用户重复确认。

这属于体验型稳定性修复，虽然不一定阻断安装，但会让首次安装和恢复安装流程显得不一致，增加用户困惑。

---

### 待合并的重要 PR

#### #3868 chore(container): bump Claude Code to 2.1.280 and the Agent SDK to 0.3.280  
链接：nanocoai/nanoclaw PR #3868  
状态：OPEN  
作者：amit-shafnir  

该 PR 升级 agent containers 中的 Claude Code 与 Agent SDK。摘要中提到 Claude Code 自 2.1.267 起会在首次请求记录 session system prompt，并在后续请求中重发该记录，这可能影响 resumed agents。PR 中包含防止升级静默破坏恢复会话的配置或处理。

这是一个维护型但风险较高的依赖升级 PR，涉及 agent runner、containers、providers 等核心区域。若合并，可能会提升兼容性，但也需要重点关注 resumed agent 行为回归。

---

#### #3867 chore(add-codex): pin @openai/codex 0.155.1  
链接：nanocoai/nanoclaw PR #3867  
状态：OPEN  
作者：amit-shafnir  

该 PR 将 `/add-codex` 中的 Codex CLI pin 从 `0.146.0` 升级到 `0.155.1`。PR 明确说明依赖 #3866，需要 providers 分支先合并。

升级动机包括：

- 0.146.0 已落后约两个月、18 个版本；
- 新版本修复 required-server 和 HTTP MCP handling；
- 对 NanoClaw 的 provider / MCP 使用场景更友好。

该 PR 是 Codex 生态兼容性维护的重要信号，但由于依赖 #3866，短期内合并顺序应为：先修 MCP server 等待逻辑，再升级 Codex pin。

---

#### #3866 fix(codex): wait for MCP servers before the first turn  
链接：nanocoai/nanoclaw PR #3866  
状态：OPEN  
作者：amit-shafnir  

该 PR 修复 Codex 在 turn 开始前未充分等待 MCP servers 的问题。摘要显示，自 Codex `0.147.0` 起，MCP servers 只有约 1 秒启动时间，随后 Codex 会在工具不可用的情况下继续执行 turn。

该问题影响较大，因为 NanoClaw 依赖 MCP 工具服务提供 agent 能力。如果工具服务未启动但 Codex 已开始执行，会导致 agent 行为缺失、工具调用失败或结果不可预测。PR 还会让 NanoClaw 自有 tool server 无法启动时显式失败，而不是静默降级。

---

## 4. 社区热点

今日没有出现评论量或表情反应显著集中的讨论。所有 Issue 记录显示评论数为 0，PR 评论字段未提供有效计数，点赞数均为 0。因此今日“热点”更多体现为维护者主动修复和路线推进，而非社区讨论驱动。

### 相对值得关注的主题

#### Codex / MCP 启动可靠性  
相关 PR：

- #3866 fix(codex): wait for MCP servers before the first turn  
  链接：nanocoai/nanoclaw PR #3866
- #3867 chore(add-codex): pin @openai/codex 0.155.1  
  链接：nanocoai/nanoclaw PR #3867

背后诉求：NanoClaw 正在加强与 Codex CLI、MCP servers 的协同，尤其关注首次 turn 前工具是否可用。这说明 agent 运行时的可靠性已经成为当前维护重点。

---

#### 企业渠道自助部署 CDSS  
相关 PR：

- #3864 feat(cdss): channel credential provider, instance specs, per-instance webhook paths  
  链接：nanocoai/nanoclaw PR #3864
- #3865 feat(cdss): Slack and Teams adapters per instance, pins, webhook mode, pending challenge  
  链接：nanocoai/nanoclaw PR #3865

背后诉求：企业用户需要在不重启、不暴露凭据位置的前提下动态接入 Slack / Teams 等渠道。这是 NanoClaw 从开发者工具向企业级部署平台演进的重要路线信号。

---

#### 安装向导与 provider contract 稳定性  
相关 Issue / PR：

- #3862 Codex device pairing under Iron Proxy cannot vault the login  
  链接：nanocoai/nanoclaw Issue #3862
- #3863 fix(setup): register a freshly installed provider contract before the gateway store uses it  
  链接：nanocoai/nanoclaw PR #3863
- #3861 fix(setup): remember the image-source answer across resume  
  链接：nanocoai/nanoclaw PR #3861

背后诉求：首次安装、恢复安装、provider 选择和凭据 vault 是用户进入 NanoClaw 的关键路径。维护者今日在这条路径上连续修复问题，说明 onboarding 体验仍是项目健康度的重要关注点。

---

## 5. Bug 与稳定性

### P0 / 高严重度：update-nanoclaw prepare 阶段崩溃

#### #3869 update-nanoclaw: controller archive list is missing transitive imports — prepare crashes with MODULE_NOT_FOUND  
链接：nanocoai/nanoclaw Issue #3869  
状态：OPEN  
作者：bgao  

问题摘要：  
`/update-nanoclaw` 的 Step 1 会从 upstream ref 中提取最新 controller，但当前 `git archive` 使用的是固定文件列表。controller 新增的 3 个传递依赖模块没有被包含在 archive 列表中，导致 `update-nanoclaw.ts prepare` 在真正执行更新前就因 `MODULE_NOT_FOUND` 崩溃。

影响分析：

- 影响更新流程；
- 发生在 prepare 阶段，用户可能无法进入后续迁移或修复步骤；
- 属于工具链/升级路径阻断问题；
- 当前未看到对应 fix PR。

建议优先级：高。建议维护者尽快补齐 archive 文件列表，或改为基于依赖图/目录级别归档，避免未来再次遗漏 transitive imports。

---

### P1 / 高严重度：Codex 首轮执行前 MCP servers 未准备好

#### #3866 fix(codex): wait for MCP servers before the first turn  
链接：nanocoai/nanoclaw PR #3866  
状态：OPEN  
作者：amit-shafnir  

问题摘要：  
Codex 自 `0.147.0` 起只给 MCP servers 约 1 秒启动时间，随后可能在 NanoClaw 工具不可用的情况下开始 turn。

影响分析：

- agent 首轮可能无法调用所需工具；
- MCP 依赖场景下结果可能不完整或失败；
- 可能被误判为模型能力问题，而非工具启动时序问题；
- 已有 fix PR，尚待合并。

建议优先级：高。该 PR 也是 #3867 升级 Codex pin 的前置条件，应优先 review 和合并。

---

### P1 / 高严重度：Fresh install 下 Iron Proxy + Codex device pairing 无法 vault 登录

#### #3862 Codex device pairing under Iron Proxy cannot vault the login in a fresh public-wizard run  
链接：nanocoai/nanoclaw Issue #3862  
状态：CLOSED  
作者：glifocat  

对应修复：

- #3863 fix(setup): register a freshly installed provider contract before the gateway store uses it  
  链接：nanocoai/nanoclaw PR #3863

问题摘要：  
fresh install 中通过 `bash nanoclaw.sh --gateway-provider iron-proxy` 启动，provider 选择和 Codex device pairing 流程下，provider contracts barrel 在 wizard 进程中 stale，导致 gateway store 在首次 vault 写入前无法读取新安装 provider contract 的 model endpoints。

影响分析：

- 影响首次安装；
- 影响 Iron Proxy gateway provider；
- 阻断 Codex 登录凭据写入；
- 已关闭，已有对应修复 PR。

建议：关注后续是否有回归测试覆盖 fresh wizard + provider contract 动态安装 + vault write 流程。

---

### P2 / 中等严重度：Setup resume 后重复询问 Echo hardened image 来源

#### #3861 fix(setup): remember the image-source answer across resume so the Echo perk is offered once  
链接：nanocoai/nanoclaw PR #3861  
状态：CLOSED  
作者：glifocat  

问题摘要：  
setup wizard 在 container step 已经询问 image source 并写入 `.env`，但 resume 后 Echo perk reminder 仍可能再次询问。

影响分析：

- 不一定阻断安装；
- 会造成用户困惑；
- 影响首次部署体验；
- 已关闭，修复已提交。

---

### P2 / 中等风险：Claude Code / Agent SDK 升级可能影响 resumed agents

#### #3868 chore(container): bump Claude Code to 2.1.280 and the Agent SDK to 0.3.280  
链接：nanocoai/nanoclaw PR #3868  
状态：OPEN  
作者：amit-shafnir  

问题摘要：  
Claude Code 2.1.267 之后 session system prompt 处理发生变化，可能影响 resumed agents。该 PR 升级到 Claude Code 2.1.280 和 Agent SDK 0.3.280，并包含避免恢复会话被静默破坏的处理。

影响分析：

- 涉及核心 agent container；
- 是依赖升级，也带有兼容性修复性质；
- 需要重点验证 resumed sessions、agent state、system prompt replay 行为。

---

## 6. 功能请求与路线图信号

今日没有明确由用户提出的新功能请求型 Issue。路线图信号主要来自维护者 PR。

### CDSS 企业部署能力持续增强

相关 PR：

- #3864 feat(cdss): channel credential provider, instance specs, per-instance webhook paths  
  链接：nanocoai/nanoclaw PR #3864
- #3865 feat(cdss): Slack and Teams adapters per instance, pins, webhook mode, pending challenge  
  链接：nanocoai/nanoclaw PR #3865

判断：  
CDSS 很可能是近期版本的重要功能方向。核心能力包括：

- 动态 channel instance；
- 凭据提供层抽象；
- Slack / Teams 多实例接入；
- webhook 路由按实例隔离；
- operator surface 与运行时 adapter 解耦。

这些能力通常服务于企业客户自助部署和多租户运维，预计后续还会继续扩展 channel registry、凭据存储、管理界面和部署自动化。

---

### Codex 集成继续升级

相关 PR：

- #3866 fix(codex): wait for MCP servers before the first turn  
  链接：nanocoai/nanoclaw PR #3866
- #3867 chore(add-codex): pin @openai/codex 0.155.1  
  链接：nanocoai/nanoclaw PR #3867

判断：  
Codex integration 正处于快速跟进上游版本的阶段。#3867 明确提到当前 pin 落后 18 个版本，且新版本包含 required-server 和 HTTP MCP handling 修复。这说明 NanoClaw 对 MCP / Codex 互操作的依赖正在加深，下一步很可能会继续完善：

- MCP server 启动就绪检查；
- required servers 的失败处理；
- HTTP MCP 兼容性；
- Codex CLI 安装与版本 pin 策略。

---

### Agent container 运行时升级

相关 PR：

- #3868 chore(container): bump Claude Code to 2.1.280 and the Agent SDK to 0.3.280  
  链接：nanocoai/nanoclaw PR #3868

判断：  
Agent runtime 依赖升级正在推进，但维护者对 resumed agents 的兼容性非常谨慎。预计短期路线会继续围绕以下方面展开：

- Claude Code 新版本兼容；
- Agent SDK 升级；
- session 恢复；
- system prompt replay 行为；
- container 镜像一致性。

---

## 7. 用户反馈摘要

由于今日 Issues 均无评论，用户反馈主要来自 Issue 描述本身。

### 更新流程痛点：升级工具在 prepare 阶段即崩溃

来源：

- #3869 update-nanoclaw: controller archive list is missing transitive imports  
  链接：nanocoai/nanoclaw Issue #3869

用户痛点：  
用户希望 `/update-nanoclaw` 能可靠地拉取 controller 并执行升级，但当前固定 archive 文件列表遗漏传递依赖，导致 `MODULE_NOT_FOUND`。这类问题会削弱用户对自动更新机制的信任，因为崩溃发生在“更新准备阶段”，用户甚至无法进入真正的更新流程。

---

### 首次安装痛点：provider contract 动态安装后不能立即使用

来源：

- #3862 Codex device pairing under Iron Proxy cannot vault the login  
  链接：nanocoai/nanoclaw Issue #3862
- #3863 fix(setup): register a freshly installed provider contract before the gateway store uses it  
  链接：nanocoai/nanoclaw PR #3863

用户痛点：  
fresh install 中，用户通过 public wizard 选择 Iron Proxy 和 Codex device pairing，希望安装向导能一次完成 provider 选择、登录和 vault 写入。但 provider contract barrel stale 导致刚安装的 provider contract 不能被当前进程识别，最终影响凭据保存。

这反映出 NanoClaw 的安装流程存在较多动态加载、运行中注册和状态同步需求，任何缓存或 barrel stale 都可能影响首次体验。

---

### 安装恢复体验痛点：重复提问造成流程不确定感

来源：

- #3861 fix(setup): remember the image-source answer across resume  
  链接：nanocoai/nanoclaw PR #3861

用户痛点：  
用户在 setup 中已经回答过 image source，resume 后又被再次询问，会让人怀疑此前配置是否保存成功。虽然这是小问题，但对首次安装信心有负面影响。

---

## 8. 待处理积压

基于过去 24 小时数据，未提供长期未响应 Issue / PR 的完整列表，因此无法判断真正意义上的长期积压。当前需要维护者重点关注的未处理项如下：

### #3869 update-nanoclaw prepare 崩溃  
链接：nanocoai/nanoclaw Issue #3869  
状态：OPEN  
优先级：高  

原因：影响升级路径，且目前未看到对应 fix PR。建议尽快修复 archive 文件列表或改造归档机制。

---

### #3866 Codex 等待 MCP servers  
链接：nanocoai/nanoclaw PR #3866  
状态：OPEN  
优先级：高  

原因：影响 Codex 首轮工具可用性，同时是 #3867 的前置条件。

---

### #3867 pin @openai/codex 0.155.1  
链接：nanocoai/nanoclaw PR #3867  
状态：OPEN  
优先级：中高  

原因：当前 Codex pin 落后较多版本，但该 PR 依赖 #3866。建议在 #3866 合并后尽快推进，以获得 required-server 和 HTTP MCP handling 修复。

---

### #3868 升级 Claude Code 和 Agent SDK  
链接：nanocoai/nanoclaw PR #3868  
状态：OPEN  
优先级：中高  

原因：涉及 agent container 核心运行时，需重点验证 resumed agents 与 system prompt replay 行为。建议合并前增加针对 session resume 的回归测试。

---

## 总体健康度评估

NanoClaw 今日维护活跃，核心团队在 24 小时内集中处理了安装、provider、Codex、MCP、container runtime 和 CDSS 等多个关键区域。项目处于较快迭代阶段，但也暴露出一些典型风险：上游依赖变化频繁、安装向导状态管理复杂、动态 provider / channel 注册机制容易出现时序问题。  
从健康度看，项目维护响应积极，Bug 有较快对应 PR；但从稳定性看，升级路径和首次安装路径仍需要更多自动化测试覆盖。短期最值得关注的是 #3869 的更新崩溃、#3866 的 MCP 启动等待，以及 #3868 的 agent runtime 升级兼容性。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-09-23）

## 1. 今日速览

过去 24 小时，IronClaw 没有新增或更新 Issues，也没有新版本发布；项目活动主要集中在 Pull Requests。今日共有 2 个新开/更新 PR，均处于 Open 状态，尚未合并或关闭，说明当前代码变更仍在评审或等待维护者处理阶段。整体活跃度评估为 **低到中等**：社区讨论热度较低，但仍有功能增强与稳定性修复进入队列。  
从 PR 内容看，今日重点分别落在 **host-runtime 内置时间能力修复/增强** 与 **WebUI 国际化扩展** 两个方向。

---

## 2. 版本发布

过去 24 小时 **无新版本发布**。  
暂无可分析的破坏性变更、迁移说明或发布节奏变化。

---

## 3. 项目进展

今日没有已合并或已关闭的重要 PR，因此从主干代码角度看，项目尚未产生实际落地变更。不过，有 2 个待合并 PR 进入队列，代表后续版本可能包含以下改进。

### 待评审 / 待合并 PR

#### PR #8108 — fix(host-runtime): add builtin.time shift and typed input issues  
- 状态：Open  
- 作者：Bortlesboat  
- 创建时间：2026-09-22  
- 链接：https://github.com/nearai/ironclaw/pull/8108  
- 类型：修复 / 能力增强  
- 影响范围：host-runtime、`builtin.time` 工具能力、时间输入处理

该 PR 为 `builtin.time` 增加了 `operation: "shift"` 能力，允许通过带符号的 `seconds`、`minutes`、`hours`、`days`、`weeks` 组合成一个 `TimeDelta`，并应用到指定 `input` 时间；如果未提供 `input`，则默认基于当前时间进行偏移。输出格式与 `now` 保持一致，包括 `iso`、`utc_iso`、`unix`、`unix_millis`，以及 `local_iso`、`timezone` 等字段。

这项变更对 AI 智能体和个人 AI 助手类场景有实际价值，例如：
- “三天后提醒我”
- “把会议时间往后推 2 小时”
- “计算下周一上午 9 点对应的 UTC 时间”
- “基于某个时间戳偏移若干分钟”

此外，标题中提到 “typed input issues”，说明该 PR 也可能修复了类型化输入相关的问题，有助于提升 runtime 工具调用的稳定性。

#### PR #8107 — feat(webui): add Italian (it) locale  
- 状态：Open  
- 作者：huiq777  
- 创建时间：2026-09-22  
- 链接：https://github.com/nearai/ironclaw/pull/8107  
- 类型：功能增强 / 国际化  
- 影响范围：WebUI、本地化、多语言支持

该 PR 新增意大利语 `it` 作为 WebUI 的第 12 个 locale，并说明该需求来自 Issue #7855。PR 摘要中特别提到，`it.ts` 覆盖了完整的英文 key union，包括 `en.ts` 以及两个懒注册的 sidecar packs：`device-link-translations.ts` 与 `inspector-translations.ts`，目的是避免字符串静默回退到英文。

相关需求来源：  
- Issue #7855：https://github.com/nearai/ironclaw/issues/7855  
- PR #8107：https://github.com/nearai/ironclaw/pull/8107  

这表明项目仍在推进国际化覆盖，尤其是 WebUI 面向更多地区用户的可用性。

---

## 4. 社区热点

今日没有 Issues 活动，也没有显示出评论数或反应数较高的讨论。两个 PR 的评论与点赞数据均未体现明显社区热度，因此今日社区讨论热度较低。

### 今日相对值得关注的 PR

#### PR #8108 — host-runtime 时间偏移与 typed input 修复  
- 链接：https://github.com/nearai/ironclaw/pull/8108  
- 评论：数据未提供 / 未显示活跃讨论  
- 👍：0  

该 PR 虽然没有明显讨论热度，但从能力层面看较为重要。时间计算是个人 AI 助手中的高频基础能力，尤其影响提醒、日程、任务规划、时间换算等 Agent 行为。若合并，将提升 runtime 内置工具的实用性和确定性。

#### PR #8107 — 新增意大利语 WebUI locale  
- 链接：https://github.com/nearai/ironclaw/pull/8107  
- 评论：数据未提供 / 未显示活跃讨论  
- 👍：0  

该 PR 反映出国际化需求仍在推进。其背后的用户诉求是让非英语用户能够更完整地使用 WebUI，尤其避免部分界面因缺失翻译而回退英文。

---

## 5. Bug 与稳定性

今日没有新建 Bug Issue，也没有用户报告新的崩溃、回归或生产级故障。不过，PR #8108 明确包含修复性质，值得作为稳定性相关变更重点关注。

### 中等优先级：`builtin.time` typed input issues

- 关联 PR：PR #8108  
- 链接：https://github.com/nearai/ironclaw/pull/8108  
- 状态：已有 fix PR，尚未合并  
- 严重程度：中等  
- 影响范围：host-runtime、内置时间工具、AI Agent 工具调用输入类型处理

从 PR 标题看，该变更修复了 `builtin.time` 的 typed input 问题。虽然摘要未完整披露具体错误表现，但类型化输入问题通常可能导致：
- 工具调用参数解析失败
- Agent 传入结构化参数后行为不符合预期
- 时间字段格式兼容性不足
- 测试或运行时出现输入校验异常

如果该问题影响到实际 Agent 的时间推理与调度能力，建议维护者优先 review 并确认测试覆盖。

---

## 6. 功能请求与路线图信号

今日没有新的功能请求 Issue，但两个 Open PR 暗示了项目近期可能的功能方向。

### 时间工具能力增强可能进入下一版本

- 关联 PR：PR #8108  
- 链接：https://github.com/nearai/ironclaw/pull/8108  

`builtin.time` 增加 `shift` 操作后，IronClaw 的 runtime 工具能力将从“获取当前时间”进一步扩展到“基于时间进行计算”。这对个人 AI 助手非常关键，因为大量任务都涉及相对时间表达。

可能进入下一版本的能力包括：
- 相对时间偏移
- 支持正负时间差
- 基于当前时间或输入时间计算目标时间
- 统一输出多种时间格式

### WebUI 国际化继续扩展

- 关联 PR：PR #8107  
- 链接：https://github.com/nearai/ironclaw/pull/8107  
- 关联需求：Issue #7855  
- 链接：https://github.com/nearai/ironclaw/issues/7855  

新增意大利语 locale 表明项目仍在扩展全球用户覆盖。PR 摘要中特别强调完整 key 覆盖，说明维护者或贡献者已经意识到“部分翻译缺失导致英文回退”会影响用户体验。

这可能预示后续路线图将继续包括：
- 更多 WebUI 语言包
- 翻译完整性校验
- sidecar translation pack 的一致性维护
- 国际化回归测试

---

## 7. 用户反馈摘要

过去 24 小时没有 Issues 评论数据，因此无法从真实用户评论中提炼新的痛点、满意点或使用场景。

基于今日 PR 内容，可间接观察到两类用户/贡献者诉求：

1. **Agent 时间处理需要更强的表达能力**  
   - 关联 PR：https://github.com/nearai/ironclaw/pull/8108  
   - 可能场景：提醒、日程、任务延后、时间换算、自然语言时间推理。  
   - 反馈信号：当前 `builtin.time` 可能不足以覆盖相对时间计算，typed input 也存在需要修复的问题。

2. **非英语用户希望获得完整本地化体验**  
   - 关联 PR：https://github.com/nearai/ironclaw/pull/8107  
   - 关联 Issue：https://github.com/nearai/ironclaw/issues/7855  
   - 可能场景：意大利语用户使用 WebUI、设备绑定、Inspector 等功能。  
   - 反馈信号：用户不仅需要新增语言，还需要避免局部 UI 回退英文。

---

## 8. 待处理积压

基于今日提供的数据，无法识别长期未响应的重要 Issue 或 PR；过去 24 小时 Issues 数量为 0，PR 仅有 2 个且均为 2026-09-22 创建/更新，暂不构成长期积压。

### 当前需要维护者关注的待处理项

#### PR #8108 — host-runtime 时间 shift 与 typed input 修复  
- 链接：https://github.com/nearai/ironclaw/pull/8108  
- 建议优先级：较高  
- 原因：涉及 runtime 基础能力与稳定性，可能影响 AI Agent 工具调用的可靠性。

#### PR #8107 — 新增 Italian locale  
- 链接：https://github.com/nearai/ironclaw/pull/8107  
- 建议优先级：中等  
- 原因：属于用户体验与国际化扩展，风险相对可控，但需要确认翻译完整性、key 覆盖和构建检查。

---

## 项目健康度评估

- Issues 活跃度：低，过去 24 小时无新增/更新  
- PR 活跃度：中等，新增/更新 2 个 Open PR  
- 发布节奏：今日无发布  
- 稳定性信号：无新增 Bug 报告，但存在一个 runtime 修复 PR  
- 社区讨论热度：低，未见高评论或高反应讨论  
- 维护风险：短期风险较低，主要关注 PR review 与合并节奏  

总体来看，IronClaw 今日处于 **低讨论、轻量开发推进** 状态。虽然没有发布和 Issue 活动，但两个 PR 分别覆盖核心 runtime 能力与 WebUI 国际化，若后续顺利合并，将为下一版本带来实用性与用户覆盖面的双重提升。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报｜2026-09-23

## 1. 今日速览

过去 24 小时，LobsterAI 项目没有新增或更新 Issue，但 Pull Request 活动非常集中，共有 10 个 PR 在当天被关闭或合并，显示维护侧正在进行高强度的发布后修复与稳定性收敛。今日还发布了新版本 **LobsterAI 2026.9.22**，主要围绕 OpenClaw 网关、插件启动、模型策略迁移、Windows 兼容性、Cowork 交互体验等方向进行修复和改进。  
整体来看，项目当前处于 **发布密集期 / 稳定性修复期**：用户侧问题未通过 GitHub Issues 集中沉淀，但多个 PR 摘要明确来自升级后启动失败、网关反复重启、Windows 私有目录创建失败等真实反馈。项目健康度较高，维护响应速度快，但 OpenClaw、插件、模型策略与跨平台兼容相关模块仍是近期风险集中区。

---

## 2. 版本发布

### LobsterAI 2026.9.22

- Release：[`LobsterAI 2026.9.22`](https://github.com/netease-youdao/LobsterAI/releases/tag/2026.9.22)
- 发布时间：2026-09-22

本次 Release 摘要中明确包含以下变更：

1. **修复 IM 原生定时任务与飞书投递**
   - PR：[`#2737 fix(im): restore native scheduled tasks and Feishu delivery`](https://github.com/netease-youdao/LobsterAI/pull/2737)
   - 影响范围：IM、定时任务、飞书通知/投递链路。
   - 价值：恢复自动化通知与任务投递能力，降低用户在企业协作场景中的功能中断风险。

2. **修复 OpenClaw Windows 网关退出与启动问题**
   - Release 摘要中提到：
     - `fix(openclaw): recover Windows gateway exits and repair startup`
   - 相关 PR 链接在输入数据中被截断，但从今日 PR 组合看，OpenClaw 相关修复是本次发布主线之一。
   - 影响范围：Windows 客户端、OpenClaw 网关、启动修复链路。

### 破坏性变更

今日 Release 数据中 **未明确声明 breaking changes**。  
不过，从多个 OpenClaw 修复 PR 的描述看，本次版本涉及：

- 模型策略迁移与 allowlist 重建；
- 插件 manifest 与版本兼容处理；
- OpenClaw 网关启动、配置同步、超时恢复；
- Windows 私有目录创建逻辑替换。

这些属于稳定性修复，但建议用户升级后重点观察：

- OpenClaw 网关是否能正常 ready；
- 已配置模型是否仍在可用列表中；
- nsp-clawguard 等插件是否正常启动；
- Windows 环境下 Doctor、Gateway、legacy session import 等流程是否恢复。

### 迁移注意事项

根据今日 PR 信息，建议用户升级到 `2026.9.22` 后关注以下事项：

- 如果此前遇到 **OpenClaw 网关无法启动、反复重启或插件启动失败**，应优先升级并重试。
- 如果此前存在旧模型 ID，例如 `DeepSeek V4 Pro` 等非规范模型 ID，升级后应检查模型配置是否被自动修复。
- 如果此前在 Windows 上因安全软件拦截 `powershell.exe Add-Type` 导致 Doctor、Gateway 或 SQLite staging 目录创建失败，本次修复可能已绕过相关问题。
- 如果使用 Kimi K3，应关注其输出 token 上限调整后是否符合预期。

---

## 3. 项目进展

今日 PR 主要集中在 **OpenClaw 稳定性、插件兼容、模型策略迁移、Cowork 体验、Kimi K3 能力提升** 五个方向。

### 3.1 Cowork 交互与进度展示增强

#### [`#2750 [area: renderer, area: main, area: openclaw, area: cowork] feat: cowork turn progress polish`](https://github.com/netease-youdao/LobsterAI/pull/2750)

- 状态：Closed
- 作者：`fisherdaddy`
- 创建/更新：2026-09-23
- 摘要：无详细描述
- 影响范围：renderer、main、openclaw、cowork

该 PR 标题显示主要是对 Cowork 回合进度展示进行体验打磨。结合前一个 PR `#2749`，可以判断团队正在增强 Cowork 执行过程的可观测性，使用户更清楚地看到多步骤任务、工具调用、编辑差异等过程。

#### [`#2749 feat(cowork): stream live per-step turn progress and diff stats`](https://github.com/netease-youdao/LobsterAI/pull/2749)

- 状态：Closed
- 作者：`fisherdaddy`
- 创建/更新：2026-09-22
- 链接：[`#2749`](https://github.com/netease-youdao/LobsterAI/pull/2749)

主要改动：

- 在工具调用仍在生成时展示实时活动细节：
  - `isGenerating`
  - `liveEditDiff`
- 通过 `ActivityGroupBlock` / `ToolCallGroup` 展示每步执行进展。
- 抽取共享 diff 统计辅助逻辑：
  - `toolDiffStats`
- 抽取 `ArtifactPreviewTabItem`，减少 `CoworkSessionDetail` 中的 artifact tab bar 重复代码。

项目意义：

- 提升 Cowork 长任务执行过程中的透明度。
- 降低用户面对“模型还在处理但界面无反馈”时的不确定感。
- 为后续更复杂的 agent 多步骤任务提供 UI 可观测性基础。

---

### 3.2 Kimi K3 能力修复与 SDK 解耦

#### [`#2748 fix(openclaw): raise Kimi K3 maxTokens and localize stream wrapper`](https://github.com/netease-youdao/LobsterAI/pull/2748)

- 状态：Closed
- 作者：`fisherdaddy`
- 创建/更新：2026-09-22
- 链接：[`#2748`](https://github.com/netease-youdao/LobsterAI/pull/2748)

主要改动：

- 将 Kimi K3 的 `maxTokens` 从 8,192 提升至与其 1,048,576 token 上下文能力相匹配的范围。
- 移除对 OpenClaw `plugin-sdk` 中 `createMoonshotKimiK3Wrapper` 的依赖。
- 新增本地 `kimiK3StreamWrapper` 实现。
- 增加默认 stream function loader。
- 增加 SDK export contract 相关检查。

项目意义：

- 修复 Kimi K3 大上下文模型能力被输出 token 限制削弱的问题。
- 降低 LobsterAI 对 OpenClaw plugin-sdk 内部实现的耦合。
- 提升模型流式输出适配的可维护性。

---

### 3.3 发布分支合入

#### [`#2747 Release/2026.9.21`](https://github.com/netease-youdao/LobsterAI/pull/2747)

- 状态：Closed
- 作者：`liuzhq1986`
- 创建/更新：2026-09-22
- 链接：[`#2747`](https://github.com/netease-youdao/LobsterAI/pull/2747)

该 PR 是发布分支相关操作，覆盖范围包括：

- renderer
- docs
- main
- openclaw
- cowork

项目意义：

- 表明项目在 2026.9.21 / 2026.9.22 附近存在连续发布节奏。
- 大范围模块标签说明此次发布包含前端、主进程、OpenClaw 与 Cowork 的综合更新。

---

### 3.4 OpenClaw 启动、配置与迁移稳定性修复

#### [`#2746 fix(openclaw): avoid unnecessary Clawguard startup lease waits`](https://github.com/netease-youdao/LobsterAI/pull/2746)

- 状态：Closed
- 作者：`btc69m979y-dotcom`
- 创建/更新：2026-09-22
- 链接：[`#2746`](https://github.com/netease-youdao/LobsterAI/pull/2746)

问题背景：

- Clawguard 启动修复流程可能在插件并不需要 repair 的情况下，仍阻塞 gateway startup。
- 可能出现错误：
  - `timed out waiting for plugin lifecycle lease core:plugin-lifecycle/global`
- 500ms lease 获取预算还包含同步 SQLite 工作，慢事务会进一步放大超时风险。

修复价值：

- 降低 Gateway 启动阶段被不必要 lease 等待卡住的概率。
- 改善 OpenClaw 插件生命周期管理的启动性能和容错性。

#### [`#2745 fix(openclaw): recover invalid generated model policies on upgrade`](https://github.com/netease-youdao/LobsterAI/pull/2745)

- 状态：Closed
- 作者：`btc69m979y-dotcom`
- 创建/更新：2026-09-22
- 链接：[`#2745`](https://github.com/netease-youdao/LobsterAI/pull/2745)

问题背景：

- 旧模型 ID，例如 `DeepSeek V4 Pro`，可能在升级后阻止整个 Gateway 启动。
- 即使用户选择了其他模型，旧模型 key 被复制进 `modelPolicy.allow` 后，也可能因为 OpenClaw 不接受该 ID 而导致启动失败。

修复价值：

- 提升升级路径健壮性。
- 避免无效 legacy 模型配置拖垮整个网关。
- 对已有用户尤其重要，因为老配置和新策略之间的兼容是桌面 AI 助手长期维护的关键风险点。

#### [`#2742 fix(openclaw): stabilize skill config sync and timeout recovery`](https://github.com/netease-youdao/LobsterAI/pull/2742)

- 状态：Closed
- 作者：`btc69m979y-dotcom`
- 创建/更新：2026-09-22
- 链接：[`#2742`](https://github.com/netease-youdao/LobsterAI/pull/2742)

问题背景：

PR 摘要明确来自 “9.20 客户端反复重启问题排查”。主要问题包括：

- 技能文件重复通知触发配置同步。
- OpenClaw 迁移后的 `modelPolicy` 与 LobsterAI 重建配置不一致，导致配置被反复改写。
- 配置 RPC 超时后，系统可能将已经生效的配置错误送入重启兜底，从而造成网关反复重启。

主要改动：

- 保留 `modelPolicy` 和迁移标记。
- 随模型增删更新托管 allowlist，同时保留用户显式策略。
- 过滤无效文件变化。
- 在超时后确认当前配置是否已实际生效，避免不必要重启。

项目意义：

- 这是今日最关键的稳定性 PR 之一。
- 直接针对用户可感知的“客户端反复重启”问题。
- 修复方向从单点容错扩展到配置一致性、文件监听、RPC 超时确认等系统性问题。

---

### 3.5 Windows 与插件兼容性修复

#### [`#2744 fix(openclaw): keep active exec sessions below system prompt cache boundary`](https://github.com/netease-youdao/LobsterAI/pull/2744)

- 状态：Closed
- 作者：`fisherdaddy`
- 创建/更新：2026-09-22
- 链接：[`#2744`](https://github.com/netease-youdao/LobsterAI/pull/2744)

主要改动：

- 将每轮的 `Active exec sessions:` 快照从 system prompt 的 Runtime section 移出。
- 改为放入当前 user turn 的 hidden runtime-context carrier。
- 避免运行中的后台进程在每一轮都使 provider prefix cache 失效。

项目意义：

- 优化 provider prefix cache 命中率。
- 对长期执行任务、后台命令、agent 工具调用场景有性能收益。
- 也说明项目正在关注 LLM 调用成本与延迟优化。

#### [`#2743 fix(openclaw): backport native koffi Windows private directory patch`](https://github.com/netease-youdao/LobsterAI/pull/2743)

- 状态：Closed
- 作者：`fisherdaddy`
- 创建/更新：2026-09-22
- 链接：[`#2743`](https://github.com/netease-youdao/LobsterAI/pull/2743)

问题背景：

以下流程会通过 `powershell.exe` 和 `Add-Type` 编译步骤创建 private SQLite staging directories：

- legacy session import
- device-identity migration
- Gateway write-admission preflight
- Doctor

如果安全软件阻止该子进程，相关流程会失败，并且 Quick Repair 无法恢复。

修复价值：

- 提升 Windows 环境下的兼容性。
- 降低安全软件、企业终端管控策略对 LobsterAI 启动和修复流程的影响。
- 对企业用户和 Windows 用户非常关键。

#### [`#2741 fix(plugins): support legacy nsp-clawguard startup`](https://github.com/netease-youdao/LobsterAI/pull/2741)

- 状态：Closed
- 作者：`btc69m979y-dotcom`
- 创建/更新：2026-09-22
- 链接：[`#2741`](https://github.com/netease-youdao/LobsterAI/pull/2741)

问题背景：

- 升级后 `nsp-clawguard` 无法启动。
- 2.4.13 发布包的 manifest 仍标为 2.4.12。
- 包含旧版模块加载、异步注册、缺失启动激活声明等问题。
- 用户日志显示旧 npm 安装记录指向不存在目录，触发 2.4.13 下载失败，阻断 gateway ready。

主要改动：

- 支持真实发布的 `2.4.13 / manifest 2.4.12` 组合。
- 保留对 `2.5.0` 的兼容。
- 修复 legacy nsp-clawguard 启动路径。

项目意义：

- 降低升级后插件元数据不一致造成的启动失败。
- 表明维护者愿意兼容实际发布包中的历史瑕疵，而不是要求用户手动清理环境。
- 对存量用户升级体验非常重要。

---

## 4. 社区热点

今日没有新增或更新 Issue，PR 的评论数在数据中均为 `undefined`，且反应数均为 0，因此无法基于 GitHub 互动量判断传统意义上的“最热讨论”。

不过，从 PR 摘要和问题来源看，以下方向是事实上的维护热点：

### 热点 1：OpenClaw 网关启动与反复重启

相关 PR：

- [`#2746 fix(openclaw): avoid unnecessary Clawguard startup lease waits`](https://github.com/netease-youdao/LobsterAI/pull/2746)
- [`#2745 fix(openclaw): recover invalid generated model policies on upgrade`](https://github.com/netease-youdao/LobsterAI/pull/2745)
- [`#2742 fix(openclaw): stabilize skill config sync and timeout recovery`](https://github.com/netease-youdao/LobsterAI/pull/2742)
- [`#2741 fix(plugins): support legacy nsp-clawguard startup`](https://github.com/netease-youdao/LobsterAI/pull/2741)

背后诉求：

- 用户希望升级后网关能稳定启动。
- 插件、模型策略、技能配置等子系统不能因为局部异常导致整个 Gateway 不可用。
- 对桌面 AI 助手而言，“启动即用”是基础体验，OpenClaw 是当前稳定性核心。

### 热点 2：Windows 环境兼容与安全软件干扰

相关 PR：

- [`#2743 fix(openclaw): backport native koffi Windows private directory patch`](https://github.com/netease-youdao/LobsterAI/pull/2743)
- Release 中提到的 Windows gateway exits/startup repair 相关修复：[`Release 2026.9.22`](https://github.com/netease-youdao/LobsterAI/releases/tag/2026.9.22)

背后诉求：

- Windows 用户需要在安全软件、企业终端策略存在的情况下仍能正常运行。
- Quick Repair、Doctor 等修复工具需要具备更强的自恢复能力。

### 热点 3：Cowork 任务执行过程可见性

相关 PR：

- [`#2750 feat: cowork turn progress polish`](https://github.com/netease-youdao/LobsterAI/pull/2750)
- [`#2749 feat(cowork): stream live per-step turn progress and diff stats`](https://github.com/netease-youdao/LobsterAI/pull/2749)

背后诉求：

- 用户需要知道 agent 正在做什么、改了什么、进行到哪一步。
- 对长任务、多工具调用、自动改文件等场景，透明度直接影响信任感。

---

## 5. Bug 与稳定性

今日没有 GitHub Issue 新报告 Bug，但多个 PR 明确修复了真实用户或升级路径中的稳定性问题。按严重程度排列如下。

### P0 / 严重：升级后 Gateway 无法启动

相关 PR：

- [`#2745 fix(openclaw): recover invalid generated model policies on upgrade`](https://github.com/netease-youdao/LobsterAI/pull/2745)
- [`#2741 fix(plugins): support legacy nsp-clawguard startup`](https://github.com/netease-youdao/LobsterAI/pull/2741)

问题表现：

- 旧模型 ID 被写入 `modelPolicy.allow` 后导致 OpenClaw 拒绝配置，Gateway 启动失败。
- nsp-clawguard 插件 manifest 与实际版本不一致，旧 npm 安装记录指向不存在目录，阻断 gateway ready。

修复状态：已有 fix PR，今日已关闭/合并。

---

### P0 / 严重：客户端或 Gateway 反复重启

相关 PR：

- [`#2742 fix(openclaw): stabilize skill config sync and timeout recovery`](https://github.com/netease-youdao/LobsterAI/pull/2742)

问题表现：

- 技能文件重复通知引发配置同步。
- 配置不一致导致反复改写。
- RPC 超时后误判配置失败，触发重启兜底。

修复状态：已有 fix PR，今日已关闭/合并。

---

### P1 / 高：Clawguard 启动 lease 等待导致 Gateway 启动被阻塞

相关 PR：

- [`#2746 fix(openclaw): avoid unnecessary Clawguard startup lease waits`](https://github.com/netease-youdao/LobsterAI/pull/2746)

问题表现：

- 出现 `timed out waiting for plugin lifecycle lease core:plugin-lifecycle/global`。
- 即使插件不需要 repair，也可能进入不必要等待。

修复状态：已有 fix PR，今日已关闭/合并。

---

### P1 / 高：Windows 私有目录创建受安全软件影响，Quick Repair 无法恢复

相关 PR：

- [`#2743 fix(openclaw): backport native koffi Windows private directory patch`](https://github.com/netease-youdao/LobsterAI/pull/2743)

问题表现：

- 安全软件阻止 `powershell.exe` / `Add-Type` 子进程。
- legacy session import、device-identity migration、Gateway preflight、Doctor 等流程失败。
- Quick Repair 无法恢复。

修复状态：已有 fix PR，今日已关闭/合并。

---

### P2 / 中：Provider prefix cache 被 Active exec sessions 变化频繁失效

相关 PR：

- [`#2744 fix(openclaw): keep active exec sessions below system prompt cache boundary`](https://github.com/netease-youdao/LobsterAI/pull/2744)

问题表现：

- 后台进程状态进入 system prompt Runtime section。
- 每轮变化导致 provider prefix cache 失效。
- 可能增加延迟和调用成本。

修复状态：已有 fix PR，今日已关闭/合并。

---

### P2 / 中：Kimi K3 输出 token 上限过低

相关 PR：

- [`#2748 fix(openclaw): raise Kimi K3 maxTokens and localize stream wrapper`](https://github.com/netease-youdao/LobsterAI/pull/2748)

问题表现：

- Kimi K3 虽有 1,048,576 token 上下文窗口，但输出上限被限制在 8,192。
- 大上下文任务可能无法充分发挥模型能力。

修复状态：已有 fix PR，今日已关闭/合并。

---

## 6. 功能请求与路线图信号

今日没有新增 Issue，因此没有直接来自 GitHub Issue 的新功能请求。不过，从 PR 方向可以提炼出以下路线图信号。

### 6.1 Cowork 将继续强化“过程透明”和“差异可视化”

相关 PR：

- [`#2750 feat: cowork turn progress polish`](https://github.com/netease-youdao/LobsterAI/pull/2750)
- [`#2749 feat(cowork): stream live per-step turn progress and diff stats`](https://github.com/netease-youdao/LobsterAI/pull/2749)

可能方向：

- 更细粒度的 tool call 状态展示。
- 更稳定的 live diff / edit diff 展示。
- Artifact 预览组件进一步模块化。
- 多步骤 agent 执行日志与用户可读进度条增强。

### 6.2 OpenClaw 将继续围绕“升级兼容”和“自恢复”演进

相关 PR：

- [`#2741`](https://github.com/netease-youdao/LobsterAI/pull/2741)
- [`#2742`](https://github.com/netease-youdao/LobsterAI/pull/2742)
- [`#2745`](https://github.com/netease-youdao/LobsterAI/pull/2745)
- [`#2746`](https://github.com/netease-youdao/LobsterAI/pull/2746)

可能方向：

- 插件 manifest 与实际版本不一致时的兼容策略。
- 模型策略迁移自动修复。
- 配置同步幂等化。
- RPC 超时后的二次确认机制。
- Gateway ready 阶段的更细粒度诊断。

### 6.3 模型适配会向“大上下文、低耦合 SDK”推进

相关 PR：

- [`#2748`](https://github.com/netease-youdao/LobsterAI/pull/2748)

可能方向：

- 更多模型的 max token / context window 策略修正。
- 模型 stream wrapper 本地化，减少对 plugin-sdk 私有实现的依赖。
- SDK export contract 测试增强，避免未来版本破坏适配层。

---

## 7. 用户反馈摘要

今日没有 GitHub Issues 评论数据，因此无法直接提炼 Issue 线程中的用户原文反馈。但 PR 摘要中包含多个来自真实排查或用户反馈的信号。

### 7.1 升级后启动失败是主要痛点

相关 PR：

- [`#2741`](https://github.com/netease-youdao/LobsterAI/pull/2741)
- [`#2745`](https://github.com/netease-youdao/LobsterAI/pull/2745)

用户痛点：

- 升级后 nsp-clawguard 无法启动。
- Gateway ready 被阻断，导致核心 AI 助手能力不可用。
- 旧配置、旧 npm 安装记录、错误 manifest 等历史状态对普通用户不可见，难以自行修复。

### 7.2 反复重启影响可用性和信任感

相关 PR：

- [`#2742`](https://github.com/netease-youdao/LobsterAI/pull/2742)

用户痛点：

- 客户端或网关反复重启会造成明显的不可用体验。
- 用户可能难以判断是模型配置、技能文件、插件还是网络/RPC 引起的问题。
- 需要系统具备更强的自动确认和自恢复机制。

### 7.3 Windows 用户受到安全软件和系统策略影响

相关 PR：

- [`#2743`](https://github.com/netease-youdao/LobsterAI/pull/2743)

用户痛点：

- 安全软件阻止 PowerShell 子进程后，用户很难理解为何 session import、Doctor 或 Gateway preflight 失败。
- Quick Repair 无法恢复时，用户会感到修复路径中断。

### 7.4 Cowork 用户需要更清楚地看到 agent 工作进展

相关 PR：

- [`#2749`](https://github.com/netease-youdao/LobsterAI/pull/2749)
- [`#2750`](https://github.com/netease-youdao/LobsterAI/pull/2750)

用户痛点：

- 多步骤 agent 任务执行时间较长时，若缺少实时进度，用户容易误以为卡住。
- 文件修改类任务需要展示 diff 统计，帮助用户理解修改范围。

---

## 8. 待处理积压

根据今日提供的数据：

- 最新 Issues：0 条
- 过去 24 小时 Issues 更新：0 条
- 过去 24 小时 PR 更新：10 条，均为 Closed
- 待合并 PR：0 条

因此，今日数据范围内 **没有可识别的长期未响应 Issue 或 PR**。

不过，建议维护者继续关注以下潜在积压风险：

1. **OpenClaw 相关问题是否缺少 Issue 沉淀**
   - 多个 PR 明确来自用户反馈或客户端排查，但没有对应 GitHub Issue。
   - 例如：
     - [`#2742`](https://github.com/netease-youdao/LobsterAI/pull/2742) 提到 “9.20 客户端反复重启问题排查”
     - [`#2741`](https://github.com/netease-youdao/LobsterAI/pull/2741) 提到 “2026-09-22 macOS 升级后 nsp-clawguard 问题反馈”
   - 建议将这类问题补建 tracking issue，方便后续复盘和用户搜索。

2. **Release notes 信息不完整**
   - 当前输入中的 Release 摘要被截断，无法完整确认所有变更。
   - 建议 Release 页面明确列出：
     - 修复的问题；
     - 影响平台；
     - 是否需要用户手动处理旧配置；
     - 已知问题。

3. **Windows 与插件升级路径需要持续回归测试**
   - 相关 PR：
     - [`#2743`](https://github.com/netease-youdao/LobsterAI/pull/2743)
     - [`#2741`](https://github.com/netease-youdao/LobsterAI/pull/2741)
   - 建议覆盖企业安全软件、旧 npm 安装记录、manifest 版本不一致、离线/半离线插件恢复等场景。

---

## 总体健康度评估

- **开发活跃度：高**
  - 24 小时内 10 个 PR 被关闭/合并，并有 1 个新版本发布。
- **社区 Issue 活跃度：低**
  - 今日无 Issue 更新，可能说明问题主要通过内部反馈或非 GitHub 渠道进入维护流程。
- **稳定性关注度：高**
  - 今日大多数 PR 都是启动、升级、插件、配置同步、Windows 兼容相关修复。
- **风险集中区：OpenClaw / 插件 / 升级迁移 / Windows**
  - 多个关键问题都围绕 Gateway ready、插件生命周期、模型策略迁移展开。
- **产品体验推进：中高**
  - Cowork 进度展示和 diff stats 表明项目不仅在修稳定性，也在继续改善 agent 协作体验。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报（2026-09-23）

项目：[`moltis-org/moltis`](https://github.com/moltis-org/moltis)  
统计窗口：过去 24 小时

---

## 1. 今日速览

过去 24 小时内，Moltis 项目整体活跃度较低：没有新的 Issue 更新，也没有版本发布，仅有 1 个由 Dependabot 提交的依赖升级 PR。  
今日唯一活跃事项集中在 Rust/Cargo 依赖维护，涉及将 `wasmtime-wasi` 从 `36.0.9` 升级到 `36.0.11`。  
从数据看，当前项目没有明显的用户反馈、Bug 报告或功能讨论进入活跃状态，社区交互较为安静。  
项目健康度方面，自动化依赖更新仍在运行，说明基础维护流程保持活跃，但缺少人工合并、功能推进或 Issue 处理信号。

---

## 2. 版本发布

过去 24 小时内无新版本发布。

---

## 3. 项目进展

过去 24 小时内无已合并或已关闭 PR，因此暂无明确的功能推进、Bug 修复落地或架构改动进入主分支。

当前新增的待处理 PR：

### [PR #1284 chore(deps): bump wasmtime-wasi from 36.0.9 to 36.0.11 in the cargo group across 1 directory](https://github.com/moltis-org/moltis/pull/1284)

- 状态：Open
- 作者：`dependabot[bot]`
- 类型：依赖维护 / Rust / Cargo
- 涉及依赖：[`wasmtime-wasi`](https://github.com/bytecodealliance/wasmtime)
- 变更内容：将 `wasmtime-wasi` 从 `36.0.9` 升级到 `36.0.11`
- 当前评论数：未提供
- 👍 反应数：0

该 PR 属于常规依赖升级，短期内更偏向稳定性、兼容性和安全维护，而非用户可见的新功能。由于尚未合并，今日项目主线代码未产生实际推进。

---

## 4. 社区热点

过去 24 小时内没有活跃 Issue，也没有高互动 PR。唯一更新项是 Dependabot 依赖升级 PR：

### [PR #1284](https://github.com/moltis-org/moltis/pull/1284)

- 互动情况：暂无点赞反应，评论数未提供
- 热点属性：低
- 背后诉求：保持 Wasmtime/WASI 运行时相关依赖处于较新补丁版本，降低潜在兼容性、安全性或运行时问题风险

从当前数据看，社区没有围绕新功能、Bug、使用体验或架构方向产生明显讨论。

---

## 5. Bug 与稳定性

过去 24 小时内没有新的 Bug 报告、崩溃问题或回归问题。

稳定性相关的间接事项：

### [PR #1284：升级 `wasmtime-wasi` 到 36.0.11](https://github.com/moltis-org/moltis/pull/1284)

- 严重程度：低 / 维护性更新
- 是否已有 fix PR：是，该 PR 本身为依赖更新
- 当前状态：Open，尚未合并
- 可能影响：若 `wasmtime-wasi` 上游补丁包含安全修复、WASI 行为修正或运行时稳定性改进，合并后可能提升项目底层执行环境的可靠性

当前没有证据表明 Moltis 存在新报告的稳定性问题。

---

## 6. 功能请求与路线图信号

过去 24 小时内没有新的功能请求 Issue，也没有功能类 PR 更新。

从今日数据无法判断新的路线图变化。  
唯一信号来自依赖维护：项目仍在跟进 Wasmtime/WASI 相关 Rust 生态更新，说明 WebAssembly / WASI 运行能力可能是项目底层能力的一部分，并需要持续保持兼容与安全。

相关 PR：

- [PR #1284：升级 `wasmtime-wasi`](https://github.com/moltis-org/moltis/pull/1284)

---

## 7. 用户反馈摘要

过去 24 小时内没有 Issue 评论数据，也没有用户反馈型讨论。

因此目前无法从今日数据中提炼出新的用户痛点、使用场景、满意点或不满意点。  
社区反馈面较安静，维护者可关注是否存在 Issue 提交流程门槛、用户转向其他渠道反馈，或当前项目处于低交互维护阶段。

---

## 8. 待处理积压

基于本次提供的数据，过去 24 小时内未发现长期未响应的重要 Issue 或 PR。当前可见的待处理事项为 1 个新开的依赖升级 PR：

### [PR #1284 chore(deps): bump wasmtime-wasi from 36.0.9 to 36.0.11](https://github.com/moltis-org/moltis/pull/1284)

- 当前状态：Open
- 建议优先级：中低
- 建议处理方式：
  - 检查 CI 是否通过
  - 关注 `wasmtime-wasi` 36.0.10 / 36.0.11 的变更说明
  - 如无破坏性变更，可考虑尽快合并，以保持依赖新鲜度

---

## 总体健康度评估

今日 Moltis 项目处于低活跃维护状态。没有 Issue、Bug、用户反馈或版本发布，说明短期内社区外部输入较少；同时 Dependabot 仍在自动提交依赖更新，表明基础维护自动化机制正常运行。  
建议维护者优先确认 [PR #1284](https://github.com/moltis-org/moltis/pull/1284) 的 CI 与兼容性结果，避免依赖更新积压。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报  
**日期：2026-09-23**  
**仓库：** https://github.com/agentscope-ai/CoPaw  
> 注：本日报基于提供的 GitHub 活动数据生成；Issue/PR 数据中链接指向 `agentscope-ai/QwenPaw`，下文按原始数据引用。

---

## 1. 今日速览

过去 24 小时内，项目活跃度较高：共有 **9 条 Issue 更新**、**13 条 PR 更新**，其中 **7 个 Issue 仍处于打开状态**，**10 个 PR 待合并**。  
今日活动明显集中在 **Console 体验、Windows 沙箱安全、聊天历史持久化、后台工具调用、SQLite 备份稳定性** 等方向。  
Bug 报告数量偏多，且涉及 **LLM 超时后无法恢复、文件卡片不渲染、QQ 网关事件重复处理、Windows ACL 风险、SQLite 备份锁问题** 等稳定性议题，说明项目当前处于较密集的修复与发布前收敛阶段。  
同时，`v2.2.2` 发布说明 PR 已打开，表明维护者可能正在为下一版本做最后整理，但今日暂无正式 Release。

---

## 3. 项目进展

### 已关闭 / 合并的重要 PR

#### 1. 修复桌宠审批流程中的调用者身份传递问题  
- PR：[#7933 fix(pet): preserve caller identity when resolving approvals](https://github.com/agentscope-ai/QwenPaw/pull/7933)  
- 状态：Closed  
- 影响范围：Desktop Pet、工具调用审批、Console API  
- 进展说明：  
  该 PR 修复了桌宠启用后，用户批准或拒绝待审批工具请求时出现的：

  ```text
  TypeError: resolve_request_wrapped() got an unexpected keyword argument 'actor'
  ```

  问题。修复点在于让 pet wrapper 接受 `actor` 参数，保持与 Console 端点一致的调用者身份传递。  
- 项目价值：  
  这是一个直接影响桌面端交互可用性的修复，有助于提升工具审批流程的稳定性和一致性。

---

#### 2. 修复桌面端打包后的模型目录校验  
- PR：[#7932 fix(desktop): validate sharded model catalog after packaging](https://github.com/agentscope-ai/QwenPaw/pull/7932)  
- 状态：Closed  
- 影响范围：Desktop build、PyInstaller、Provider model catalog  
- 进展说明：  
  该 PR 修复了桌面构建在 PyInstaller 完成后仍然查找旧版 `providers/data/model_catalog.json` 的问题。此前 #7899 已将模型目录拆分为 `index.json` 和 provider shards，但 Windows 与 bash 打包脚本仍沿用旧路径。  
- 项目价值：  
  该修复改善了桌面端发布链路的可靠性，降低发布构建失败风险，对 `v2.2.2` 发布准备具有直接意义。

---

#### 3. 单元测试跨平台修复尝试  
- PR：[#7938 test(unit): make the batch-3 lock and portability tests cross-platform](https://github.com/agentscope-ai/QwenPaw/pull/7938)  
- 状态：Closed  
- 影响范围：CI、Windows/Linux/macOS 单元测试、发布工作流  
- 进展说明：  
  该 PR 旨在修复前序测试覆盖提升工作引入的跨平台问题，尤其是 Windows CI 中的模块导入失败和可移植性测试问题。虽然该 PR 已关闭，但后续已有新的同名 PR #7941 继续推进。  
- 相关后续：  
  [#7941 test(unit): make the batch-3 lock and portability tests cross-platform](https://github.com/agentscope-ai/QwenPaw/pull/7941)

---

### 今日仍在推进的关键 PR

#### 聊天历史持久化与分页能力  
- PR：[#7931 feat(chat): add durable paginated transcript history](https://github.com/agentscope-ai/QwenPaw/pull/7931)  
- 状态：Open  
- 价值判断：高  
- 说明：  
  该 PR 引入按 session 存储的 SQLite transcript history，并支持稳定游标、分页加载、删除清理、用量持久化等能力。  
  这是对聊天系统基础设施的重要增强，若合并，将显著改善历史记录加载、刷新、长会话浏览和恢复体验。

---

#### 在线备份 SQLite 时避免释放 live locks  
- PR：[#7930 fix(backup): snapshot SQLite databases without releasing live locks](https://github.com/agentscope-ai/QwenPaw/pull/7930)  
- 状态：Open  
- 价值判断：高  
- 说明：  
  该 PR 针对在线备份直接读取并关闭 SQLite `-shm` 文件可能释放进程级锁的问题。该问题在 Linux 上可能导致另一个连接截断仍被映射的文件，引发 SIGBUS。  
  这是一个稳定性与数据安全相关的关键修复，建议优先评审。

---

#### Console 文件卡片渲染修复  
- PR：[#7949 fix(console): show sent files from serialized chat history](https://github.com/agentscope-ai/QwenPaw/pull/7949)  
- 状态：Open  
- 关联 Issue：[#7947](https://github.com/agentscope-ai/QwenPaw/issues/7947)  
- 说明：  
  该 PR 修复 `send_file_to_user` 产物在历史记录中以 JSON string 存储时，Console 无法识别并显示文件卡片的问题。  
- 项目价值：  
  直接回应用户关于文件交付不可见的反馈，是一个明确的用户体验修复。

---

#### 后台工具调用结果以 hint block 注入  
- PR：[#7944 fix(tool-calls): deliver background tool results as a hint block](https://github.com/agentscope-ai/QwenPaw/pull/7944)  
- 状态：Open  
- 说明：  
  该 PR 处理 offloaded/background tool call 完成后，如何将结果以 hint block 的形式注入上下文。  
- 项目价值：  
  对多轮 agent 推理、后台任务结果回传、工具调用一致性具有基础意义。

---

#### v2.2.2 发布说明  
- PR：[#7928 chore: release notes for v2.2.2](https://github.com/agentscope-ai/QwenPaw/pull/7928)  
- 状态：Open  
- 说明：  
  发布说明 PR 已打开，但内容仍较模板化。结合当前大量 bugfix PR，`v2.2.2` 可能正处于发布前准备阶段。

---

## 4. 社区热点

### 1. LLM 请求超时后进程无法自动恢复  
- Issue：[#7935 [Bug] LLM `Request timed out` 后永不自动恢复](https://github.com/agentscope-ai/QwenPaw/issues/7935)  
- 状态：Open  
- 评论数：3  
- 标签：bug, Cannot Reproduce  
- 热度原因：  
  这是今日评论最多的 Issue。用户报告一旦 LLM 调用出现 `openai.APITimeoutError: Request timed out.`，后续所有请求都会持续失败，必须手动重启 QwenPaw 进程才能恢复。  
- 背后诉求：  
  用户期望系统具备自动恢复能力，包括连接池重置、失败状态清理、provider client 重建、超时退避与重试等机制。  
- 风险判断：高  
  若问题成立，会直接影响长期运行场景，尤其是个人助理、IM Bot、后台 Agent 等无人值守部署。

---

### 2. Console 文件交付不可见  
- Issue：[#7947 send_file_to_user never renders its file card in the Console](https://github.com/agentscope-ai/QwenPaw/issues/7947)  
- 状态：Open  
- 评论数：2  
- 相关 PR：[#7949](https://github.com/agentscope-ai/QwenPaw/pull/7949)  
- 热度原因：  
  用户指出 `send_file_to_user` 已经交付文件，但 Console 完全没有文件卡片，也没有可点击入口。  
- 背后诉求：  
  用户需要可靠的 artifact/file delivery UI，尤其是在 agent 生成文件、报告、下载结果时。  
- 当前进展：  
  已有对应修复 PR，处理 serialized chat history 中的 output blocks 识别问题。

---

### 3. Stop 后立即发送消息返回 409  
- Issue：[#7929 v2.2.1 console 409 A task is already running](https://github.com/agentscope-ai/QwenPaw/issues/7929)  
- 状态：Closed  
- 评论数：2  
- 热点原因：  
  用户在 Console 中点击 Stop 后，前端已显示 idle，但立即发送下一条消息会返回：

  ```text
  409 A task is already running for this chat
  ```

- 背后诉求：  
  Stop 操作需要在前端 UI 状态、后端 task 状态、session lock 释放之间保持一致。  
- 结论：  
  虽已关闭，但该问题反映了异步任务生命周期管理仍是用户关注点。

---

### 4. Windows 沙箱 ACL 风险  
- Issue：[#7943 Windows sandbox ACL on a drive-root workspace can lock the volume](https://github.com/agentscope-ai/QwenPaw/issues/7943)  
- 状态：Open  
- 相关 Issue：[#7942](https://github.com/agentscope-ai/QwenPaw/issues/7942)  
- 热点原因：  
  用户报告当 workspace 配置为 `C:\` 等磁盘根目录时，Windows sandbox 首次运行可能写入继承 ACL，导致整个卷权限异常。  
- 背后诉求：  
  对危险 workspace 路径进行拒绝或强警告，避免系统级权限破坏。

---

## 5. Bug 与稳定性

以下按严重程度排序。

### 严重级别：高

#### 1. LLM 超时后无法自动恢复  
- Issue：[#7935](https://github.com/agentscope-ai/QwenPaw/issues/7935)  
- 状态：Open  
- 是否已有 fix PR：未发现明确关联 PR  
- 影响：  
  长时间运行的 agent 或 IM bot 可能在一次 provider 超时后进入不可恢复状态。  
- 建议：  
  优先检查 provider client 生命周期、异常后的连接池状态、retry/backoff、session state 是否被污染。

---

#### 2. SQLite 在线备份可能释放 live locks 并导致 SIGBUS  
- PR：[#7930](https://github.com/agentscope-ai/QwenPaw/pull/7930)  
- 状态：Open  
- 是否已有 fix PR：已有，即 #7930  
- 影响：  
  可能导致 Linux 环境中进程崩溃，属于数据层稳定性问题。  
- 建议：  
  建议作为发布阻断级修复处理，尤其是若 v2.2.2 包含备份功能相关改动。

---

#### 3. Windows drive-root workspace 可能导致整卷 ACL 风险  
- Issue：[#7943](https://github.com/agentscope-ai/QwenPaw/issues/7943)  
- 状态：Open  
- 相关 Issue：[#7942](https://github.com/agentscope-ai/QwenPaw/issues/7942)  
- 是否已有 fix PR：未发现明确关联 PR  
- 影响：  
  可能影响整个 Windows 卷的权限继承，属于高风险本地环境破坏问题。  
- 建议：  
  应立即禁止 `C:\`、`D:\` 等 drive root 作为 workspace；同时增加迁移提示和启动时校验。

---

### 严重级别：中高

#### 4. QQ 官方机器人网关 session resume 后重复投递事件  
- Issue：[#7946](https://github.com/agentscope-ai/QwenPaw/issues/7946)  
- 状态：Open  
- 是否已有 fix PR：未发现明确关联 PR  
- 影响：  
  QQ 官方机器人在服务端要求重连后，恢复 session 时可能整体重投事件，导致消息重复处理。  
- 场景：  
  QQ 长连接 WebSocket 模式，飞牛 fnOS 原生部署，Python 3.12。  
- 建议：  
  增加事件去重机制，例如基于 event id、message id、timestamp window 的幂等处理。

---

#### 5. Console `send_file_to_user` 文件卡片不显示  
- Issue：[#7947](https://github.com/agentscope-ai/QwenPaw/issues/7947)  
- 状态：Open  
- Fix PR：[#7949](https://github.com/agentscope-ai/QwenPaw/pull/7949)  
- 影响：  
  文件实际已产生，但用户无法在 Console 中看到或点击，造成“文件丢失”的感知。  
- 当前进展：  
  已有修复 PR，建议尽快合并并覆盖 array 与 serialized string 两种历史格式。

---

#### 6. 后台工具调用结果回传上下文问题  
- PR：[#7944](https://github.com/agentscope-ai/QwenPaw/pull/7944)  
- 状态：Open  
- 影响：  
  offloaded/background tool call 完成后，如果结果无法正确注入上下文，后续模型推理可能缺少工具执行结果。  
- 建议：  
  合并前重点验证多轮对话、pending hints、tool result blocks 在上下文中的顺序和可见性。

---

### 严重级别：中

#### 7. Console 设计影响用户输入  
- Issue：[#7948](https://github.com/agentscope-ai/QwenPaw/issues/7948)  
- 状态：Open  
- 是否已有 fix PR：可能与 #7940 有关联，但未明确绑定  
- 相关 PR：[#7940 feat(console): refine sidebar interactions and persist avatars](https://github.com/agentscope-ai/QwenPaw/pull/7940)  
- 影响：  
  用户反馈 Web Console 设计存在破坏输入体验的问题。Issue 描述较模板化，仍需维护者进一步追问复现路径。  
- 建议：  
  要求补充版本、浏览器、窗口尺寸、输入框行为录屏或截图。

---

#### 8. Stop 后立即发送消息返回 409  
- Issue：[#7929](https://github.com/agentscope-ai/QwenPaw/issues/7929)  
- 状态：Closed  
- 是否已有 fix PR：未在今日数据中看到明确关联 PR  
- 影响：  
  用户在中断任务后无法立即继续对话，影响 Console 交互流畅度。  
- 建议：  
  即便 Issue 已关闭，也建议补充回归测试，验证 Stop 后 task lock 的释放时序。

---

### 严重级别：低到中

#### 9. Provider 403 Cloudflare 页面被误判为凭证错误  
- PR：[#7934](https://github.com/agentscope-ai/QwenPaw/pull/7934)  
- 状态：Open  
- 影响：  
  Cloudflare bot challenge 返回 HTML 403 时，被分类为 authorization/permission_denied，误导用户排查 API key。  
- 项目价值：  
  修复后可提升错误提示准确性，减少配置排查成本。

---

#### 10. zip upload workspace root 路径校验使用字符串前缀匹配  
- PR：[#7937](https://github.com/agentscope-ai/QwenPaw/pull/7937)  
- 状态：Open  
- 影响：  
  `startswith` 无法正确表达路径边界，可能误判 sibling path。  
- 建议：  
  该类路径校验问题建议优先合并，并加入安全回归测试。

---

## 6. 功能请求与路线图信号

### 1. 增加 `@所有人` / `@ALL` 过滤能力  
- Issue：[#7945](https://github.com/agentscope-ai/QwenPaw/issues/7945)  
- 状态：Open  
- 用户诉求：  
  在飞书、钉钉或其他 IM 中，`@所有人` 通常用于群通知。如果机器人监听该类消息并触发 agent 回复，很多场景下会产生不必要的响应。  
- 路线图信号：  
  该需求指向 **IM channel 消息触发策略** 和 **机器人响应过滤规则**。  
- 纳入下一版本可能性：中  
  实现成本相对可控，可作为 channel-level filter 或全局 message preprocessor 配置加入。

---

### 2. 条件触发层插件：外部事件触发 agent 推理与通知  
- Issue：[#7939](https://github.com/agentscope-ai/QwenPaw/issues/7939)  
- 状态：Open  
- 用户诉求：  
  希望在 cron 定时任务之外，增加基于外部事件条件触发 agent 推理与通知的能力。用户已提供参考实现：  
  https://github.com/Mcpy/qwenpaw-event-trigger  
- 影响范围：  
  - Core / Backend：事件轮询引擎与 REST API  
  - Console：事件任务侧边栏 UI  
  - Skills：双语技能、agent 对话创建/管理  
- 路线图信号：  
  这是从“对话式 Agent”向“事件驱动型个人助理 / 自动化 Agent”演进的重要方向。  
- 纳入下一版本可能性：中低  
  功能范围较大，短期可能不会直接进入 patch release，但可能成为后续 minor version 的候选方向。

---

### 3. Console 侧边栏交互与头像持久化  
- PR：[#7940](https://github.com/agentscope-ai/QwenPaw/pull/7940)  
- 状态：Open  
- 类型：Feature / UX refinement  
- 内容：  
  优化 Console 侧边栏为更紧凑、可移动的导航界面，同时保留插件 slots；支持导航模式切换、会话分组切换与头像持久化。  
- 路线图信号：  
  Console 正在向更成熟的桌面级管理界面演进。  
- 纳入下一版本可能性：中  
  若风险可控，有可能进入 v2.2.2 或后续小版本；但若当前版本定位为稳定性修复，可能会延后。

---

### 4. 持久化分页聊天记录  
- PR：[#7931](https://github.com/agentscope-ai/QwenPaw/pull/7931)  
- 状态：Open  
- 类型：Feature / Infrastructure  
- 内容：  
  添加 per-session SQLite transcript storage、稳定游标、分页历史、删除清理、用量持久化。  
- 路线图信号：  
  项目正在补齐长期使用所需的 conversation persistence 能力。  
- 纳入下一版本可能性：中高  
  该能力对用户体验提升明显，但涉及数据模型与迁移风险，需看测试覆盖和兼容策略。

---

## 7. 用户反馈摘要

### 用户主要痛点

#### 1. 长时间运行稳定性仍是核心痛点  
- 代表 Issue：[#7935](https://github.com/agentscope-ai/QwenPaw/issues/7935)、[#7946](https://github.com/agentscope-ai/QwenPaw/issues/7946)、[#7930](https://github.com/agentscope-ai/QwenPaw/pull/7930)  
- 用户场景：  
  - 本地长期运行 QwenPaw / CoPaw  
  - IM Bot 挂载  
  - QQ 官方机器人 WebSocket 长连接  
  - 后台 agent 自动执行任务  
- 反馈总结：  
  用户对“无人值守运行”的要求越来越高，不能接受一次超时、重连或备份操作导致整个进程不可恢复或重复处理消息。

---

#### 2. Console 体验问题直接影响用户信任  
- 代表 Issue / PR：  
  - [#7947](https://github.com/agentscope-ai/QwenPaw/issues/7947)  
  - [#7948](https://github.com/agentscope-ai/QwenPaw/issues/7948)  
  - [#7949](https://github.com/agentscope-ai/QwenPaw/pull/7949)  
  - [#7940](https://github.com/agentscope-ai/QwenPaw/pull/7940)  
- 用户场景：  
  - 通过 Console 接收 agent 生成的文件  
  - 在 Web Console 中连续输入与中断任务  
  - 管理多会话、多工具、多插件入口  
- 反馈总结：  
  用户不仅关注模型回复能力，也高度依赖 Console 作为可视化工作台。一旦文件卡片不可见或输入交互不稳定，会被感知为“功能不可用”。

---

#### 3. 多平台部署暴露出边界问题  
- 代表 Issue / PR：  
  - [#7943](https://github.com/agentscope-ai/QwenPaw/issues/7943)  
  - [#7942](https://github.com/agentscope-ai/QwenPaw/issues/7942)  
  - [#7941](https://github.com/agentscope-ai/QwenPaw/pull/7941)  
  - [#7938](https://github.com/agentscope-ai/QwenPaw/pull/7938)  
- 用户场景：  
  - Windows 桌面端  
  - Windows sandbox  
  - Linux / fnOS 原生部署  
  - CI 多平台测试  
- 反馈总结：  
  随着用户部署环境扩展，Windows ACL、路径校验、CI 跨平台行为、打包产物校验等问题正在成为项目稳定性的关键环节。

---

#### 4. 用户开始提出更高级的自动化能力  
- 代表 Issue：  
  - [#7939](https://github.com/agentscope-ai/QwenPaw/issues/7939)  
  - [#7945](https://github.com/agentscope-ai/QwenPaw/issues/7945)  
- 用户场景：  
  - 外部事件驱动 agent  
  - IM 群聊中过滤无意义唤醒  
  - 条件触发通知  
- 反馈总结：  
  社区需求正在从“能对话、能调用工具”转向“可控地自动运行、可配置地响应外部事件”。

---

## 8. 待处理积压

从今日数据看，未发现明显“长期未响应”的历史积压项；大多数 Issue/PR 都是在 2026-09-22 至 2026-09-23 新建或更新。不过，以下打开项建议维护者优先关注，因为它们对发布质量或用户体验影响较大。

### 高优先级待处理

#### 1. LLM 超时后不可恢复  
- Issue：[#7935](https://github.com/agentscope-ai/QwenPaw/issues/7935)  
- 原因：影响长期运行可靠性，且暂无明确 fix PR。  
- 建议动作：复现、增加 provider recovery 测试、明确是否为 SDK/client/session 状态污染。

---

#### 2. Windows drive-root workspace ACL 风险  
- Issue：[#7943](https://github.com/agentscope-ai/QwenPaw/issues/7943)  
- 原因：可能造成系统级权限影响。  
- 建议动作：立即添加 workspace root 校验，禁止磁盘根路径。

---

#### 3. SQLite 在线备份锁问题  
- PR：[#7930](https://github.com/agentscope-ai/QwenPaw/pull/7930)  
- 原因：潜在崩溃与数据一致性风险。  
- 建议动作：优先评审并合并；加入 Linux SQLite WAL/SHM 场景回归测试。

---

#### 4. QQ 网关 resume 后重复事件处理  
- Issue：[#7946](https://github.com/agentscope-ai/QwenPaw/issues/7946)  
- 原因：IM Bot 场景中重复回复会显著影响用户体验。  
- 建议动作：设计统一 event dedup 层，避免各 channel 分散处理。

---

#### 5. Console 文件卡片不显示  
- Issue：[#7947](https://github.com/agentscope-ai/QwenPaw/issues/7947)  
- Fix PR：[#7949](https://github.com/agentscope-ai/QwenPaw/pull/7949)  
- 原因：已有明确修复方案，适合快速合并关闭用户反馈。  
- 建议动作：补充测试覆盖 serialized JSON string 与 block array 两种 artifact 形态。

---

## 总体健康度评估

今日项目处于 **高活跃、发布前修复密集、稳定性压力较高** 的状态。  
积极信号是：多个关键问题已有对应 PR 推进，尤其是 Console 文件卡片、SQLite 备份、后台工具结果、聊天历史持久化等方向；同时 `v2.2.2` release notes 已打开，说明版本收敛正在进行。  
风险信号是：Bug 类型较集中于 **长期运行恢复、任务生命周期、跨平台文件/权限、IM 网关幂等、数据层锁管理**，这些都属于个人 AI 助手在真实部署中非常关键的稳定性基础。  
建议维护者在下一版本中优先处理稳定性与数据安全问题，再纳入较大的 Console UX 和事件触发类新功能。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报

日期：2026-09-23  
仓库：qhkm/zeptoclaw  
观察窗口：过去 24 小时

---

## 1. 今日速览

过去 24 小时内，ZeptoClaw 没有新的 Issue、Issue 活跃讨论或关闭记录，说明社区侧反馈较为安静。项目今日主要活动来自 Dependabot 自动提交的 3 个依赖升级 PR，均处于待合并状态，尚未出现人工合并、关闭或代码功能推进。  

整体来看，今日项目活跃度偏低到中等，活跃点集中在依赖维护和 CI/CD 基础设施更新，而非功能开发或用户问题处理。当前没有新版本发布，也未观察到新的 Bug 报告、功能请求或社区热点讨论。  

项目健康度方面，自动化依赖更新机制正常运行，但仍需要维护者及时审查并合并相关 PR，以避免依赖积压和 CI 工具链滞后。

---

## 2. 项目进展

今日没有已合并或已关闭的 PR，因此暂无实际落地到主分支的功能、修复或架构改动。

当前新增的 3 个待处理 PR 均为依赖升级：

### 待合并 PR

1. [#706 fix(deps): bump actions/checkout from 6.0.2 to 7.0.1](https://github.com/qhkm/zeptoclaw/pull/706)  
   - 类型：GitHub Actions 依赖升级  
   - 作者：dependabot[bot]  
   - 状态：Open  
   - 影响范围：CI/CD checkout 步骤  
   - 说明：升级 `actions/checkout`，可能带来 GitHub Actions 执行环境兼容性、性能或安全相关改进。建议维护者重点确认现有工作流是否与 v7 系列兼容。

2. [#705 fix(deps): bump mail-parser from 0.11.3 to 0.11.9](https://github.com/qhkm/zeptoclaw/pull/705)  
   - 类型：Rust 依赖升级  
   - 作者：dependabot[bot]  
   - 状态：Open  
   - 影响范围：邮件解析相关逻辑  
   - 说明：升级 `mail-parser`，可能包含 Bug 修复、解析兼容性改进或安全性增强。由于邮件解析通常涉及边界格式、编码、附件、MIME 等复杂场景，建议运行完整测试套件并关注回归风险。

3. [#704 fix(deps): bump docker/build-push-action from 7.2.0 to 7.3.0](https://github.com/qhkm/zeptoclaw/pull/704)  
   - 类型：GitHub Actions / Docker 构建发布流程升级  
   - 作者：dependabot[bot]  
   - 状态：Open  
   - 影响范围：Docker 镜像构建与推送流程  
   - 说明：升级 `docker/build-push-action`，主要影响容器构建与发布链路。建议检查多平台构建、缓存、认证、镜像 tag 推送等流程是否正常。

今日项目整体向前推进程度有限，主要体现为依赖维护准备工作，尚未形成主分支实际变更。

---

## 3. 社区热点

今日没有 Issue 评论、PR 评论、点赞或高互动讨论记录。3 个新增 PR 均由 Dependabot 创建，评论数和反应数均为 0，未形成明显社区热点。

当前可关注的潜在维护热点如下：

- [#705 mail-parser 依赖升级](https://github.com/qhkm/zeptoclaw/pull/705)  
  - 关注原因：相较于纯 CI Action 升级，`mail-parser` 属于运行时或业务逻辑依赖，潜在影响更接近核心功能。
  - 背后诉求：保持邮件解析能力的稳定性、安全性和兼容性。
  - 当前热度：低，无评论和反应。

- [#706 actions/checkout 升级](https://github.com/qhkm/zeptoclaw/pull/706)  
  - 关注原因：影响 CI 工作流基础能力。
  - 背后诉求：保持 GitHub Actions 生态依赖更新，降低未来兼容性和安全风险。
  - 当前热度：低，无评论和反应。

- [#704 docker/build-push-action 升级](https://github.com/qhkm/zeptoclaw/pull/704)  
  - 关注原因：影响 Docker 构建与发布链路。
  - 背后诉求：保证镜像构建流程持续可用。
  - 当前热度：低，无评论和反应。

---

## 4. Bug 与稳定性

过去 24 小时内没有新报告的 Bug、崩溃、回归或稳定性问题。

### 稳定性相关观察

- 没有用户提交新的故障反馈。
- 没有 Issue 被标记为 Bug。
- 没有针对崩溃、构建失败或运行异常的讨论。
- 没有已合并的稳定性修复 PR。

### 潜在稳定性关注点

1. [#705 mail-parser 升级](https://github.com/qhkm/zeptoclaw/pull/705)  
   - 严重程度：中等，取决于项目对邮件解析功能的依赖程度。
   - 风险类型：解析行为变化、边界格式兼容性变化、潜在回归。
   - 是否已有 fix PR：该 PR 本身是依赖升级 PR，尚未合并。
   - 建议：合并前运行与邮件解析相关的回归测试，尤其是 MIME、多编码、附件、异常邮件格式等场景。

2. [#704 docker/build-push-action 升级](https://github.com/qhkm/zeptoclaw/pull/704)  
   - 严重程度：低到中等。
   - 风险类型：CI 构建参数、缓存行为、镜像推送行为变化。
   - 是否已有 fix PR：该 PR 本身是维护型升级 PR，尚未合并。
   - 建议：确认 Docker 构建工作流在 PR CI 中完整通过。

3. [#706 actions/checkout 升级](https://github.com/qhkm/zeptoclaw/pull/706)  
   - 严重程度：低到中等。
   - 风险类型：GitHub Actions checkout 行为变化、权限或默认参数变化。
   - 是否已有 fix PR：该 PR 本身是维护型升级 PR，尚未合并。
   - 建议：重点查看 CI 是否通过，并确认子模块、fetch-depth、token 权限等配置未受影响。

---

## 5. 功能请求与路线图信号

过去 24 小时内没有新的功能请求 Issue，也没有与产品路线图、Agent 能力、个人 AI 助手体验、插件系统、模型集成或 UI/UX 改进相关的讨论。

从今日 PR 看，短期路线图信号主要是维护性更新：

- CI/CD 工具链持续更新  
  - 相关 PR：
    - [#706 actions/checkout 升级](https://github.com/qhkm/zeptoclaw/pull/706)
    - [#704 docker/build-push-action 升级](https://github.com/qhkm/zeptoclaw/pull/704)
  - 可能影响：提升自动化构建、测试、发布流程的可靠性。
  - 是否可能进入下一版本：如果 CI 通过且无兼容性问题，较可能被快速合并。

- Rust 运行时依赖维护  
  - 相关 PR：
    - [#705 mail-parser 升级](https://github.com/qhkm/zeptoclaw/pull/705)
  - 可能影响：邮件解析能力的稳定性和兼容性。
  - 是否可能进入下一版本：取决于测试覆盖情况；如无回归，具备纳入下一版本的可能。

当前没有证据表明下一版本会包含新的用户可见功能。

---

## 6. 用户反馈摘要

今日没有新的 Issue、Issue 评论或用户反馈，因此无法提炼新的真实用户痛点或使用场景。

### 可确认的信息

- 没有用户报告使用障碍。
- 没有用户表达对现有功能的不满。
- 没有新的满意度反馈或使用案例。
- 没有关于 AI Agent、个人助手能力、部署体验、集成体验的新增讨论。

今日反馈面整体安静，可能意味着项目当前用户侧问题较少，也可能反映社区参与度或使用反馈渠道较弱。

---

## 7. 待处理积压

根据过去 24 小时数据，当前没有长期未响应的重要 Issue 或 PR 被更新，也没有可判断的历史积压项。

### 今日新增待处理 PR

以下 3 个 PR 均为 2026-09-22 创建并更新，属于新近待处理项，暂不构成长期积压，但建议维护者尽快审查：

1. [#706 fix(deps): bump actions/checkout from 6.0.2 to 7.0.1](https://github.com/qhkm/zeptoclaw/pull/706)  
   - 状态：Open  
   - 建议处理优先级：中  
   - 建议操作：查看 CI 结果，确认工作流兼容性后合并。

2. [#705 fix(deps): bump mail-parser from 0.11.3 to 0.11.9](https://github.com/qhkm/zeptoclaw/pull/705)  
   - 状态：Open  
   - 建议处理优先级：中到高  
   - 建议操作：重点检查邮件解析相关测试，确认无行为回归后合并。

3. [#704 fix/deps): bump docker/build-push-action from 7.2.0 to 7.3.0](https://github.com/qhkm/zeptoclaw/pull/704)  
   - 状态：Open  
   - 建议处理优先级：中  
   - 建议操作：确认 Docker 构建和推送流程通过后合并。

---

## 维护者建议

- 优先审查 [#705](https://github.com/qhkm/zeptoclaw/pull/705)，因为其涉及 Rust 运行时依赖，潜在影响比 CI Action 升级更接近项目功能行为。
- 对 [#704](https://github.com/qhkm/zeptoclaw/pull/704) 和 [#706](https://github.com/qhkm/zeptoclaw/pull/706) 可采用 CI 通过后快速合并策略，避免自动化依赖更新积压。
- 若项目希望提升社区活跃度，可在依赖升级 PR 中要求 Dependabot 自动分组或开启自动合并策略，以减少维护噪音。
- 当前无新 Bug 和无用户反馈是稳定信号，但也建议持续关注 Issue 区是否存在未被本观察窗口覆盖的历史问题。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报｜2026-09-23

## 1. 今日速览

过去 24 小时 ZeroClaw 活跃度较高：新增或更新 **6 条 Issues**、**11 条 Pull Requests**，但 **无 PR 合并/关闭**、**无 Issue 关闭**、**无新版本发布**。今日工作重心明显集中在 **WhatsApp Web 通道能力完善**、**运行时/工具链稳定性**、**安全策略缺陷** 与 **ZeroCode 会话根目录治理**。  
整体来看，项目处于“高开发输入、低落地输出”的状态：贡献者持续提交修复与功能 PR，但维护者合并节奏暂未跟上，多个 PR 标记为 `needs-maintainer-review`、`stacked` 或依赖其他 PR。  
风险方面，今日最值得优先关注的是 **S0 级安全问题 #11058**，以及 daemon 部署下通道映射缺失导致 webhook/cron/SOP 无通道的运行时问题 #11055。

---

## 3. 项目进展

过去 24 小时 **没有 PR 被合并或关闭**，因此主分支功能推进尚未实际落地。不过，从新增 PR 看，多个方向已经有较明确的实现候选。

### 3.1 WhatsApp Web 通道能力持续补齐

- [PR #11054 - feat(channels/whatsapp-web): render thematic breaks and setext headings](https://github.com/zeroclaw-labs/zeroclaw/pull/11054)  
  对应 [Issue #11052](https://github.com/zeroclaw-labs/zeroclaw/issues/11052)，修复 WhatsApp Web Markdown 转换中对 CommonMark thematic breaks 与 setext headings 的处理问题。  
  该 PR 若合并，将减少模型输出 Markdown 在 WhatsApp 中“原样泄露为符号”的情况，提升多渠道消息渲染一致性。

- [PR #11057 - fix(channels/whatsapp-web): honour suppress_voice before queueing TTS](https://github.com/zeroclaw-labs/zeroclaw/pull/11057)  
  修复 `suppress_voice` 未被 WhatsApp Web 自动语音回复路径尊重的问题。该修复影响文本/语音模式切换的可控性。

- [PR #11060 - fix(channels/whatsapp-web): queue a forced reply outside a voice chat](https://github.com/zeroclaw-labs/zeroclaw/pull/11060)  
  对应 [Issue #11059](https://github.com/zeroclaw-labs/zeroclaw/issues/11059)，使 `force_voice` 能真正传达到 WhatsApp Web 通道，用于强制发送语音回复。  
  该 PR 说明其堆叠在 #11057 之上，合并顺序需要维护者注意。

- [PR #11056 - docs(channels/whatsapp): document the voice-note round trip](https://github.com/zeroclaw-labs/zeroclaw/pull/11056)  
  补充 WhatsApp voice note 往返能力文档，说明该能力此前已存在但缺少文档覆盖。

**进展评估：** WhatsApp Web 通道正在从“可用”走向“行为可控、文档明确、格式兼容更好”。但目前这些改动均未合并，尚未形成正式发布价值。

### 3.2 测试与 CI 稳定性修复

- [PR #11049 - fix(test): gate Unix-only fixtures in Windows Clippy](https://github.com/zeroclaw-labs/zeroclaw/pull/11049)  
  修复 Windows Clippy 中 Unix-only 测试辅助代码触发 `-D warnings` 的问题。

- [PR #11051 - test(shell): emit UTF-8 bytes in hidden PowerShell fixture](https://github.com/zeroclaw-labs/zeroclaw/pull/11051)  
  修复 Windows-only PowerShell 隐藏输出回归测试中 UTF-8 输出不稳定的问题。

- [PR #11048 - fix(test): isolate OIDC mock servers from parallel port reuse](https://github.com/zeroclaw-labs/zeroclaw/pull/11048)  
  通过隔离 OIDC mock server 监听器，减少并行测试端口复用导致的不确定性。

**进展评估：** CI 与跨平台测试稳定性是今日重要主题，尤其是 Windows、OIDC、并行测试场景。若这些 PR 合并，将改善维护者合并队列的可靠性。

### 3.3 运行时、工具与代理能力演进

- [PR #11046 - fix(tools): stop inlining base64 into screenshot results](https://github.com/zeroclaw-labs/zeroclaw/pull/11046)  
  截图工具不再把 PNG base64 data URI 内联到工具结果文本中，改为仅返回保存路径与大小。  
  这可减少上下文污染、降低 token 消耗，并避免大体积图片内容进入模型上下文。

- [PR #11045 - feat(runtime): persist peer-agent inbox turns](https://github.com/zeroclaw-labs/zeroclaw/pull/11045)  
  大型运行时功能 PR，目标是持久化 peer-agent inbox turns。该 PR 标记为 `stacked`、`risk:high`、`size:XL`，并依赖 #10425 与 #11030。  
  由于涉及 cron、daemon、gateway、security、runtime 等多个模块，维护成本与回归风险较高。

- [PR #11044 - feat(zerocode): make session roots explicit and preserve resumed roots](https://github.com/zeroclaw-labs/zeroclaw/pull/11044)  
  改进 ZeroCode 会话根目录行为，使新会话默认使用 agent workspace，并为目录切换提供显式机制。  
  当前标记为 `needs-author-action`，说明仍需作者调整。

---

## 4. 社区热点

### 热点 1：WhatsApp Markdown 渲染问题

- [Issue #11052 - Render thematic breaks and setext headings for WhatsApp](https://github.com/zeroclaw-labs/zeroclaw/issues/11052)  
  评论数：3，今日 Issues 中讨论最多。  
  对应修复 PR：[PR #11054](https://github.com/zeroclaw-labs/zeroclaw/pull/11054)

**背后诉求：**  
用户希望模型生成的标准 Markdown 能在 WhatsApp Web 中自然显示，而不是把 `***`、`---`、`___` 等符号原样发送给联系人。该问题说明 ZeroClaw 的多渠道输出层需要进一步吸收 CommonMark 语义，而不是仅进行简单字符替换。

### 热点 2：WhatsApp 语音控制语义不一致

- [Issue #11059 - WhatsApp Web ignores force_voice](https://github.com/zeroclaw-labs/zeroclaw/issues/11059)  
  对应修复 PR：[PR #11060](https://github.com/zeroclaw-labs/zeroclaw/pull/11060)

- [PR #11057 - honour suppress_voice before queueing TTS](https://github.com/zeroclaw-labs/zeroclaw/pull/11057)

**背后诉求：**  
用户或开发者希望 `force_voice` 与 `suppress_voice` 这类消息级控制字段能在 WhatsApp Web 通道中得到严格执行。当前问题暴露出“运行时消息意图”与“通道实际发送行为”之间存在断层。

### 热点 3：安全策略中的高风险命令绕过

- [Issue #11058 - allowed_commands exempts high-risk command from block_high_risk_commands](https://github.com/zeroclaw-labs/zeroclaw/issues/11058)

**背后诉求：**  
用户期望 `block_high_risk_commands = true` 对高风险命令具有硬性优先级，即使命令在 `allowed_commands` 中也不应无提示执行。该问题属于安全边界定义不清或优先级错误，影响项目可信度。

---

## 5. Bug 与稳定性

以下按严重程度排序。

### S0：高风险命令可被 allowed_commands 绕过

- [Issue #11058 - allowed_commands entry exempts a high-risk command from block_high_risk_commands](https://github.com/zeroclaw-labs/zeroclaw/issues/11058)  
  严重程度：S0 - data loss / security risk  
  当前状态：Open  
  是否已有 fix PR：未看到直接对应 PR

**问题概述：**  
当 `block_high_risk_commands = true` 时，如果某个高风险命令字面量出现在 `allowed_commands` 中，该命令会绕过硬阻断，并在 `shell` 自动批准场景下无提示运行，且无审批与日志。

**影响评估：**  
这是今日最高优先级问题。它可能导致用户误以为高风险命令被系统阻止，实际却可被白名单放行，破坏安全配置的直觉与保障。

**建议优先级：极高。**  
建议维护者明确策略优先级：`block_high_risk_commands` 应优先于 `allowed_commands`，或至少要求显式审批与审计日志。

---

### S2 / Medium：daemon 未注册 channel-map factory

- [Issue #11055 - daemon never registers the channel-map factory](https://github.com/zeroclaw-labs/zeroclaw/issues/11055)  
  严重程度：Medium  
  当前状态：Open  
  是否已有 fix PR：未看到直接对应 PR

**问题概述：**  
`zeroclaw-runtime` 依赖注入的 channel map factory，但 daemon 部署中未注册该 factory，导致 webhook、cron、SOP turns 没有 channels。

**影响评估：**  
这会使通道寻址工具在 daemon 的多个入口点之外不可用。对于生产部署、自动化触发和长期运行 agent 场景，影响较大。

**建议优先级：高。**  
建议尽快补充 daemon 初始化路径测试，避免未来入口点与运行时 wiring 再次漂移。

---

### S2：WhatsApp Web 忽略 force_voice

- [Issue #11059 - WhatsApp Web ignores force_voice](https://github.com/zeroclaw-labs/zeroclaw/issues/11059)  
  严重程度：S2 - degraded behavior  
  当前状态：Open  
  是否已有 fix PR：有，[PR #11060](https://github.com/zeroclaw-labs/zeroclaw/pull/11060)

**问题概述：**  
`SendMessage.force_voice` 文档要求支持 TTS 的通道必须发送语音消息，但 WhatsApp Web sender 未读取该字段。

**影响评估：**  
该问题不会导致系统崩溃，但会破坏开发者对通道行为的预期，尤其是在用户明确要求语音回复的场景中。

---

### 行为缺陷：WhatsApp Web 未尊重 suppress_voice

- [PR #11057 - honour suppress_voice before queueing TTS](https://github.com/zeroclaw-labs/zeroclaw/pull/11057)

**问题概述：**  
虽然没有对应 Issue 列出，但 PR 描述显示 WhatsApp Web 自动语音路径此前未检查 `SendMessage.suppress_voice`，导致本应禁止语音的消息仍可能进入 TTS 队列。

**影响评估：**  
与 #11059 一起看，说明 WhatsApp Web 的消息模态控制存在系统性不一致。

---

### 测试稳定性问题

- [PR #11048 - isolate OIDC mock servers from parallel port reuse](https://github.com/zeroclaw-labs/zeroclaw/pull/11048)  
  并行测试中 OIDC mock server 端口复用导致不稳定。

- [PR #11049 - gate Unix-only fixtures in Windows Clippy](https://github.com/zeroclaw-labs/zeroclaw/pull/11049)  
  Windows Clippy 对未使用 Unix-only helper 报错。

- [PR #11051 - emit UTF-8 bytes in hidden PowerShell fixture](https://github.com/zeroclaw-labs/zeroclaw/pull/11051)  
  Windows PowerShell 隐藏输出 fixture 编码行为不稳定。

**影响评估：**  
这些问题主要影响 CI 可靠性与开发者体验。虽然风险较低，但若不处理，会拖慢维护者 review 与 release 节奏。

---

## 6. 功能请求与路线图信号

### 6.1 Knowledge Graph 作为一等记忆层

- [Issue #11053 - RFC: Knowledge graph as a first-class agent memory layer](https://github.com/zeroclaw-labs/zeroclaw/issues/11053)

**诉求：**  
当前 knowledge graph 位于 `zeroclaw-memory` 与 `zeroclaw-tools` 中，但以“工具”形式存在，而不是像 memory 一样自动捕获、自动浮现。RFC 希望将知识图谱提升为一等 agent memory layer。

**路线图信号：**  
这是明显的中长期架构提案，涉及 agent memory 设计范式：  
- 从“agent 主动调用工具”转向“系统自动维护记忆层”；  
- 可能影响 memory capture、retrieval、tool invocation、context construction；  
- 若采纳，将增强 ZeroClaw 作为个人 AI 助手和长期 agent 的核心竞争力。

**短期纳入下一版本可能性：中低。**  
该提案范围较大，当前未见实现 PR，更可能先进入设计讨论。

---

### 6.2 WhatsApp Markdown 兼容增强

- [Issue #11052](https://github.com/zeroclaw-labs/zeroclaw/issues/11052)  
- [PR #11054](https://github.com/zeroclaw-labs/zeroclaw/pull/11054)

**诉求：**  
改善 WhatsApp Web 对 CommonMark 输出的兼容，包括 thematic breaks 与 setext headings。

**下一版本可能性：高。**  
已有小尺寸实现 PR，风险相对可控，适合作为近期版本修复项合并。

---

### 6.3 原生投票消息也应进入 outbound pacing

- [Issue #11050 - Pace native polls with other outbound channel messages](https://github.com/zeroclaw-labs/zeroclaw/issues/11050)

**诉求：**  
#10984 引入 WhatsApp Web 原生 polls 后，`PacedChannel::send_poll` 直接转发到底层 channel，没有进入 per-recipient pacing queue。用户希望 poll 与普通消息一样受节流控制。

**路线图信号：**  
通道层正在从“支持更多消息类型”进入“所有消息类型遵守统一发送策略”的阶段。  
这类需求说明用户已经在真实对话节奏、限流、反垃圾、用户体验层面遇到问题。

**下一版本可能性：中。**  
目前没有对应 PR，但实现边界相对明确，可能成为 follow-up fix。

---

### 6.4 peer-agent inbox turns 持久化

- [PR #11045 - persist peer-agent inbox turns](https://github.com/zeroclaw-labs/zeroclaw/pull/11045)

**诉求：**  
增强多 agent / peer-agent 场景下 inbox turns 的持久化能力，使运行时更适合长期任务、daemon、cron、gateway 等异步场景。

**路线图信号：**  
ZeroClaw 正在增强“持续运行的个人/团队 agent”基础设施，而不只是单轮交互式助手。

**下一版本可能性：中低。**  
虽然已有 PR，但体量 XL、风险 high、且为 stacked PR，短期合并需要较多 review 与依赖清理。

---

### 6.5 ZeroCode 会话根目录显式化

- [PR #11044 - make session roots explicit and preserve resumed roots](https://github.com/zeroclaw-labs/zeroclaw/pull/11044)

**诉求：**  
让本地 Chat 和 Code session 默认使用所选 agent 的 workspace，而不是隐式使用 ZeroCode 启动目录，并在恢复会话时保留 root。

**路线图信号：**  
ZeroCode 正在补齐 IDE/本地开发助手场景中的项目上下文一致性。根目录错误会直接影响文件读写、代码修改、安全边界与用户信任。

**下一版本可能性：中。**  
已有 PR，但当前标记 `needs-author-action`，需要作者继续处理。

---

## 7. 用户反馈摘要

### 7.1 对多渠道输出一致性的要求提高

从 [Issue #11052](https://github.com/zeroclaw-labs/zeroclaw/issues/11052)、[Issue #11050](https://github.com/zeroclaw-labs/zeroclaw/issues/11050)、[Issue #11059](https://github.com/zeroclaw-labs/zeroclaw/issues/11059) 可以看出，用户已不满足于“消息能发出去”，而是要求：  
- Markdown 在不同渠道中语义正确；  
- poll、文本、语音等不同消息类型都遵守统一 pacing；  
- `force_voice` / `suppress_voice` 这类控制字段在通道端真实生效。

这说明 ZeroClaw 的 channel abstraction 正在经受更真实、更复杂的使用场景检验。

### 7.2 用户对安全配置的直觉非常敏感

[Issue #11058](https://github.com/zeroclaw-labs/zeroclaw/issues/11058) 反映出一个强烈痛点：安全开关必须“语义明确且优先级符合直觉”。  
当用户启用 `block_high_risk_commands = true` 时，他们预期该配置是硬性保护，而不是会被 `allowed_commands` 间接绕过。

### 7.3 daemon / 自动化部署场景正在增加

[Issue #11055](https://github.com/zeroclaw-labs/zeroclaw/issues/11055) 与 [PR #11045](https://github.com/zeroclaw-labs/zeroclaw/pull/11045) 都指向一个趋势：用户越来越多地把 ZeroClaw 用于长期运行、自动触发和多入口工作流，而不只是交互式 CLI。  
这要求项目在 runtime wiring、持久化、通道注册和 cron/webhook 路径上具备更强的一致性。

### 7.4 开发者体验与 CI 稳定性仍是基础诉求

[PR #11048](https://github.com/zeroclaw-labs/zeroclaw/pull/11048)、[PR #11049](https://github.com/zeroclaw-labs/zeroclaw/pull/11049)、[PR #11051](https://github.com/zeroclaw-labs/zeroclaw/pull/11051) 说明贡献者仍在修复跨平台测试与并行测试中的摩擦点。  
这类问题虽不直接面向终端用户，但会影响维护者合并速度和版本交付质量。

---

## 8. 待处理积压

当前数据仅覆盖过去 24 小时，无法识别真正“长期未响应”的历史 Issue/PR。不过，以下新增或活跃项已显示出较高维护优先级，建议尽快 triage。

### 高优先级待处理

1. [Issue #11058 - 高风险命令绕过安全阻断](https://github.com/zeroclaw-labs/zeroclaw/issues/11058)  
   - 类型：安全 / sandbox  
   - 风险：S0  
   - 状态：暂无对应 fix PR  
   - 建议：立即确认预期安全策略，并补充回归测试。

2. [Issue #11055 - daemon 未注册 channel-map factory](https://github.com/zeroclaw-labs/zeroclaw/issues/11055)  
   - 类型：runtime / channel wiring  
   - 风险：Medium  
   - 状态：暂无对应 fix PR  
   - 建议：优先排查 daemon 初始化路径，防止 webhook/cron/SOP 场景继续不可用。

3. [PR #11060 - force_voice 支持](https://github.com/zeroclaw-labs/zeroclaw/pull/11060) 与 [PR #11057 - suppress_voice 支持](https://github.com/zeroclaw-labs/zeroclaw/pull/11057)  
   - 类型：WhatsApp Web voice behavior  
   - 风险：中  
   - 注意：#11060 堆叠在 #11057 之上  
   - 建议：按依赖顺序 review，避免语音控制逻辑分裂。

### 需要维护者 Review 的较大变更

4. [PR #11045 - persist peer-agent inbox turns](https://github.com/zeroclaw-labs/zeroclaw/pull/11045)  
   - 标签：`risk:high`、`size:XL`、`stacked`、`needs-maintainer-review`  
   - 建议：拆分 review 计划，先确认依赖 PR 与数据模型边界。

5. [PR #11047 - propose bounded agent-turn placement exceptions](https://github.com/zeroclaw-labs/zeroclaw/pull/11047)  
   - 类型：docs/runtime 架构例外说明  
   - 标签：`needs-maintainer-review`  
   - 建议：维护者尽快确认是否接受该架构例外，避免后续相关 PR 缺少设计依据。

### 需要作者继续处理

6. [PR #11044 - ZeroCode session roots explicit](https://github.com/zeroclaw-labs/zeroclaw/pull/11044)  
   - 标签：`needs-author-action`  
   - 建议：作者完成维护者反馈后再进入合并队列。

---

## 项目健康度判断

**活跃度：高。**  
过去 24 小时有 17 条 Issue/PR 更新，且覆盖 channel、runtime、security、docs、tests、ZeroCode 等多个关键模块。

**合并效率：偏低。**  
今日无合并、无关闭，说明维护队列可能正在积压，尤其是 stacked PR 与 needs-review PR。

**风险水平：中高。**  
主要风险来自 [Issue #11058](https://github.com/zeroclaw-labs/zeroclaw/issues/11058) 的安全策略绕过，以及 [Issue #11055](https://github.com/zeroclaw-labs/zeroclaw/issues/11055) 的 daemon 通道注册缺陷。

**短期建议：**  
优先处理 S0 安全问题与 daemon channel-map wiring；随后合并小尺寸 WhatsApp 与 CI 稳定性 PR，以快速降低 bug 面并提升主分支健康度。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*