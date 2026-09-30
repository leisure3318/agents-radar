# OpenClaw 生态日报 2026-09-30

> Issues: 8 | PRs: 71 | 覆盖项目: 13 个 | 生成时间: 2026-09-30 04:33 UTC

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
日期：2026-09-30  
仓库：<https://github.com/openclaw/openclaw>

## 1. 今日速览

过去 24 小时 OpenClaw 仍处于**高活跃维护状态**：Issues 更新 8 条，其中 7 条仍开放、1 条关闭；PR 更新 71 条，其中 55 条待合并、16 条已合并或关闭。今日没有新版本发布，但主线工作集中在 Gateway 稳定性、更新流程、会话/自动化、插件性能、Web UI 与多渠道插件重构上。

从优先级看，新增问题中出现了多个 **P0/P1**：尤其是更新失败、Gateway RPC 失效、会话清理失败等，说明近期稳定性与发布体验仍是主要风险区。PR 侧则有大量“ready for maintainer look”的修复和重构，表明贡献流入充足，但维护者审核压力较高。

整体健康度评估：**活跃度很高，修复动能强，但待合并队列偏长，且发布/更新链路与 Gateway 运行时稳定性需要优先收敛。**

---

## 2. 版本发布

今日无新版本发布。  
最新 Releases：无。

---

## 3. 项目进展

今日 PR 更新量达到 71 条，多个方向有实质推进。以下为较重要的已关闭/合并或接近合并的变更。

### 3.1 渠道插件清理继续推进

- PR：[#161596 refactor(channels): deslop tier-2 channel plugins second pass](https://github.com/openclaw/openclaw/pull/161596)  
  状态：Closed  
  涉及 Google Chat、iMessage、LINE、Mattermost、Teams、Nostr、Tlon、WhatsApp Web、Zalo 等二线渠道插件。

  该 PR 继续清理渠道插件中的重复队列、账户、路由和结果处理逻辑。虽然属于重构类变更，但覆盖渠道广，长期看有助于降低多渠道维护成本，并减少不同渠道行为漂移的风险。

### 3.2 Web UI 聊天通知间距修复

- PR：[#161479 fix(ui): balance spacing around chat notices](https://github.com/openclaw/openclaw/pull/161479)  
  状态：Closed  
  类型：UI 修复

  修复系统通知与相邻消息之间上下间距不平衡的问题。用户可见影响较小，但属于体验打磨，有助于提升聊天界面的一致性。

### 3.3 发布流程支持记录已诊断的精确 flake

- PR：[#161515 feat(release): let a release lead record an exact-job flake instead of blocking publication](https://github.com/openclaw/openclaw/pull/161515)  
  状态：Closed  
  类型：发布工程 / CI 流程

  该 PR 试图让发布负责人在 Full Release Validation 中记录已诊断的特定 job flake，避免被已知波动测试无限阻塞发布。考虑到今日同时出现 CI timing refresh 问题，该方向对发布效率非常关键。

### 3.4 Gateway 与插件性能相关修复排队中

- PR：[#161267 fix(plugins): Gateway freezes on model changes with large plugins](https://github.com/openclaw/openclaw/pull/161267)  
  状态：Open，P0，ready for maintainer look  
  链接：<https://github.com/openclaw/openclaw/pull/161267>

  修复大型插件场景下切换模型导致 Gateway 冻结数分钟、`config.patch` 最终触发 recovery restart 的问题。该 PR 优先级为 P0，且有充分 proof，是今日最需要维护者关注的稳定性修复之一。

- PR：[#161551 perf(gateway): read GitHub publication options without whole-database snapshots](https://github.com/openclaw/openclaw/pull/161551)  
  状态：Open，P2  
  链接：<https://github.com/openclaw/openclaw/pull/161551>

  避免读取 GitHub 发布选项时持有整库快照，减少秒级延迟和 `SQLite snapshot staging owner launch context changed` 类错误。

### 3.5 会话、自动化与消息恢复路径持续修复

- PR：[#161085 fix(cron): sessions_send fails after current automation runs](https://github.com/openclaw/openclaw/pull/161085)  
  状态：Open，P1，needs proof  
  链接：<https://github.com/openclaw/openclaw/pull/161085>

  目标是修复 current automation 的 cron session 在调度运行后，`sessions_send` 因 session key 与 placement 不匹配而失败的问题。该 PR 与今日已关闭的 cron tracing Issue 形成同一问题域：自动化/cron 的会话上下文与可观测性仍在修正中。

- PR：[#161402 fix(workers): launch model-fallback relaunches on the durable transcript leaf](https://github.com/openclaw/openclaw/pull/161402)  
  状态：Open，P1，needs proof  
  链接：<https://github.com/openclaw/openclaw/pull/161402>

  修复云 worker 模型 fallback 基于过期 transcript base relaunch，导致 `stale-base-leaf` 的问题。涉及可用性和 session-state 风险。

---

## 4. 社区热点

> 注：提供的数据中 PR 评论数显示为 `undefined`，因此以下热点主要依据优先级、标签、影响面和更新活跃度判断。

### 4.1 更新失败与发布体验成为最高优先级痛点

- Issue：[#161590 Update failure: global-install-failed (2026.9.3)](https://github.com/openclaw/openclaw/issues/161590)  
  状态：Open，P0，impact:ux-release-blocker  
  用户环境：darwin/arm64，从 2026.9.3 更新到 2026.9.7 失败

- Issue：[#161593 update.run reports success but spawns helper inside gateway process tree, making update impossible](https://github.com/openclaw/openclaw/issues/161593)  
  状态：Open，P0，impact:ux-release-blocker  
  链接：<https://github.com/openclaw/openclaw/issues/161593>

这两个 Issue 共同指向：OpenClaw 的更新链路在某些平台和运行形态下会“看似成功、实际不可完成”。其中 #161593 尤其严重，因为 `update.run` 返回 `ok:true`，但 helper 运行在 Gateway 自身进程树内，后续 preflight 又拒绝杀掉父服务，形成逻辑死锁。

背后诉求：用户希望更新流程具备更强的自诊断能力，避免“成功提示”和实际状态不一致；同时更新 helper 的进程隔离与托管服务检测需要更可靠。

### 4.2 Gateway RPC 权限/连接关闭问题触及安全与消息丢失

- Issue：[#161601 Agent tool RPCs fail: 'Gateway client authority closed before dispatching \<method\>' - persists across restarts and credential rotation](https://github.com/openclaw/openclaw/issues/161601)  
  状态：Open，P1  
  标签：impact:security、impact:message-loss、needs-security-review  
  链接：<https://github.com/openclaw/openclaw/issues/161601>

用户报告在 Windows 11、Node 24.19.0、Task Scheduler S4U session 0 启动 gateway 的场景下，Agent tool RPC 持续失败，即使重启和轮换凭证仍未恢复。这类问题影响工具调用、消息投递和权限边界，是典型的“可用性 + 安全语义”复合问题。

背后诉求：Gateway 应在 authority 生命周期、凭证轮换、服务会话隔离方面提供更明确的恢复路径和错误解释。

### 4.3 自动化、cron 与 tracing 问题继续活跃

- Issue：[#161278 diagnostics-otel: cron turns split into two root traces](https://github.com/openclaw/openclaw/issues/161278)  
  状态：Closed  
  链接：<https://github.com/openclaw/openclaw/issues/161278>

该 Issue 报告 cron-triggered agent turn 被导出为两个独立 root traces：一个空的 `openclaw.message.processed` span，以及一个单独的 `openclaw.harness.run` tree。该问题今日已关闭，说明可观测性链路已有处理进展。

相关 PR：

- [#161085 fix(cron): sessions_send fails after current automation runs](https://github.com/openclaw/openclaw/pull/161085)

背后诉求：用户和维护者需要 cron/automation 的 traces 能准确表达单次 turn 的完整调用树，否则调试自动化、消息延迟和失败恢复会非常困难。

### 4.4 大型重构继续推进，但维护者审核压力上升

代表性 PR：

- [#161574 refactor(meeting): share browser meeting transport scaffolding](https://github.com/openclaw/openclaw/pull/161574)  
- [#161352 refactor: consolidate cross-directory duplicate code](https://github.com/openclaw/openclaw/pull/161352)  
- [#161433 refactor(ui): deslop UI lib and shell second pass](https://github.com/openclaw/openclaw/pull/161433)  
- [#161057 refactor(skills): make Skill Workshop a direct, versioned self-learning loop](https://github.com/openclaw/openclaw/pull/161057)

这些 PR 覆盖 meeting 插件、跨目录公共逻辑、UI shell、Skill Workshop 等多个关键区域。它们多数标有 XL、compatibility/security-boundary/session-state 等风险标签，说明虽然长期价值高，但短期 review 成本和回归风险都不低。

---

## 5. Bug 与稳定性

以下按严重程度和用户影响排序。

### P0 / 发布阻塞级

#### 5.1 更新失败：global-install-failed

- Issue：[#161590 Update failure: global-install-failed (2026.9.3)](https://github.com/openclaw/openclaw/issues/161590)  
  状态：Open  
  严重程度：P0  
  影响：UX release blocker  
  是否已有 fix PR：数据中未发现明确关联 fix PR

用户从 OpenClaw 2026.9.3 更新到 2026.9.7 时，在 darwin/arm64 上 global install 阶段失败。该问题直接影响升级成功率，应优先定位是否与安装权限、全局包管理器、macOS runtime 打包或 2026.9.7 发布包有关。

#### 5.2 update.run 返回成功但实际无法更新

- Issue：[#161593 update.run reports success but spawns helper inside gateway process tree, making update impossible](https://github.com/openclaw/openclaw/issues/161593)  
  状态：Open  
  严重程度：P0  
  影响：UX release blocker  
  是否已有 fix PR：数据中未发现明确关联 fix PR

该问题比普通更新失败更危险：用户收到成功反馈，但后续更新流程因 helper 位于 Gateway 自身 cgroup / process tree 内而被 preflight 阻止。建议尽快修正 `update.run` 的成功判定，确保 helper 进程隔离满足托管服务 preflight。

#### 5.3 Gateway 大型插件切换模型冻结

- PR：[#161267 fix(plugins): Gateway freezes on model changes with large plugins](https://github.com/openclaw/openclaw/pull/161267)  
  状态：Open，ready for maintainer look  
  严重程度：P0  
  是否已有 fix PR：已有，即 #161267

该问题已有修复 PR，且标注 proof sufficient。建议优先 review，因为它直接影响 Gateway 可用性，并可能导致“recovery restart required”。

---

### P1 / 高影响稳定性问题

#### 5.4 Agent tool RPC 持续失败，重启和轮换凭证无效

- Issue：[#161601 Agent tool RPCs fail: 'Gateway client authority closed before dispatching \<method\>'](https://github.com/openclaw/openclaw/issues/161601)  
  状态：Open  
  严重程度：P1  
  影响：security、message-loss  
  是否已有 fix PR：数据中未发现明确关联 fix PR

该问题涉及 Gateway authority 生命周期和 tool RPC dispatch。由于标签包含 `needs-security-review`，建议先做最小复现和安全边界评估，再决定修复方向。

#### 5.5 Native one-shot 成功后在 cleanup 阶段被判失败

- Issue：[#161576 Native one-shot success is rejected at cleanup; actual-route settlement remains unconfirmed](https://github.com/openclaw/openclaw/issues/161576)  
  状态：Open  
  严重程度：P1  
  影响：ux-friction  
  是否已有 fix PR：数据中未发现明确关联 fix PR

用户报告 native one-shot Codex run 实际完成了工作和最终响应，但 OpenClaw 因 client cleanup 无法确认而返回错误。这会造成“任务完成但系统报错”的强烈不一致体验，也可能影响调用方对执行结果的信任。

#### 5.6 Paired Gateway clients reconnect timeout

- PR：[#161421 fix: paired clients time out behind queued connection metadata](https://github.com/openclaw/openclaw/pull/161421)  
  状态：Open，ready for maintainer look  
  严重程度：P1  
  是否已有 fix PR：已有，即 #161421

该 PR 修复 paired clients 在 reconnect 时被 display/last-seen metadata 写入阻塞导致超时的问题。对多客户端场景较重要，且涉及安全边界，需谨慎 review。

#### 5.7 Cloud worker model fallback 使用过期 transcript base

- PR：[#161402 fix(workers): launch model-fallback relaunches on the durable transcript leaf](https://github.com/openclaw/openclaw/pull/161402)  
  状态：Open，needs proof  
  严重程度：P1  
  是否已有 fix PR：已有，即 #161402

该问题会导致 fallback 总是因为 `stale-base-leaf` 失败，影响云 worker 的容错能力。

---

### P2 / 中高优先级稳定性问题

#### 5.8 CI timing refresh 无法处理 Node 24 compatibility job

- Issue：[#161550 CI timing refresh aborts on checks-node-compat-node24](https://github.com/openclaw/openclaw/issues/161550)  
  状态：Open  
  严重程度：P2  
  是否已有 fix PR：数据中未发现明确关联 fix PR

`scripts/ci-shard-timings-refresh.mts` 在处理包含 `checks-node-compat-node24` 的 release CI child 时失败，原因是没有 shard descriptor。该问题影响 CI shard timing 刷新，可能间接影响发布验证效率。

#### 5.9 Plugin SDK 缺少 nested operations 的 pre-effect authorization boundary

- Issue：[#161584 Plugin SDK: authorize resolved nested operations at a pre-effect boundary](https://github.com/openclaw/openclaw/issues/161584)  
  状态：Open  
  严重程度：P2  
  影响：security  
  是否已有 fix PR：无，且标注 no-new-fix-pr、needs-product-decision、needs-security-review

这是安全边界设计问题，而非单点 bug。需要产品和安全共同决定 API contract。

#### 5.10 sessions.create 缺少 durable per-session system-context contract

- Issue：[#161581 sessions.create: define durable per-session system-context contract and authority](https://github.com/openclaw/openclaw/issues/161581)  
  状态：Open  
  严重程度：P2  
  影响：session-state、security  
  是否已有 fix PR：无，且需 maintainer/product/security review

该问题指向长期会话上下文能力缺口：`sessions.create` 可设置模型、runtime、workspace、permissions、tools 和 initial turn，但不能附加受边界约束、归属于 session 的持久 system context。

---

## 6. 功能请求与路线图信号

### 6.1 浏览器 existing-session 支持页面文本提取

- PR：[#161240 [Feature]: support page text extraction for existing-session browsers](https://github.com/openclaw/openclaw/pull/161240)  
  状态：Open，ready for maintainer look  
  关联：Closes #159610

该功能为 Chrome MCP `existing-session` profiles 补齐 `text` route，避免 agent 只能依赖更大的 snapshot 或调用者自定义脚本读取页面文本。该 PR 体量小、proof sufficient，且用户价值明确，较可能进入下一版本或近期主线。

### 6.2 macOS App 迁移到 OpenClaw Bun fork 私有运行时

- PR：[#161603 feat(macos): run the private app runtime on the OpenClaw Bun fork](https://github.com/openclaw/openclaw/pull/161603)  
  状态：Open  
  风险：compatibility  
  链接：<https://github.com/openclaw/openclaw/pull/161603>

该 PR 将 OpenClaw.app 的私有 runtime 迁移到固定的 OpenClaw Bun fork，并包含完整发布包、CLI、Gateway 和 Control UI。它是 macOS packaging/runtime 的重要路线信号，但因体量 XL 且兼容性风险高，短期是否进入发布取决于验证质量。

### 6.3 Skill Workshop 自学习循环重构

- PR：[#161057 refactor(skills): make Skill Workshop a direct, versioned self-learning loop](https://github.com/openclaw/openclaw/pull/161057)  
  状态：Open，needs proof  
  链接：<https://github.com/openclaw/openclaw/pull/161057>

该 PR 说明 OpenClaw 仍在推进“agent 使用中自我改进”的核心能力。当前问题包括后台 review 失败、scratch 文件膨胀、Codex runtime 周期 review 停止等。若通过，将改善 Skill Workshop 的可靠性和可控性。

### 6.4 Meeting transport 抽象化

- PR：[#161574 refactor(meeting): share browser meeting transport scaffolding](https://github.com/openclaw/openclaw/pull/161574)  
  状态：Open  
  涉及 Zoom、Teams、Slack huddles、file transfer  
  链接：<https://github.com/openclaw/openclaw/pull/161574>

该 PR 将会议类插件重复的浏览器 transport wiring 和 page-script assembly 抽象为共享 scaffolding。路线图信号是：OpenClaw 正在把会议/实时协作插件从“各自实现”向“共享基础设施”迁移。

### 6.5 聊天截图缩略图优化

- PR：[#161602 improve(chat): image tiles download full-size transcript screenshots](https://github.com/openclaw/openclaw/pull/161602)  
  状态：Open，waiting on author  
  链接：<https://github.com/openclaw/openclaw/pull/161602>

该 PR 让 Activity image strips 和 Chat transcript thumbnails 下载 bounded PNG thumbnail，而非完整大图。用户价值是降低带宽和加载时间，适合进入体验优化类版本，但当前仍等待作者处理。

---

## 7. 用户反馈摘要

### 7.1 “更新成功提示”与真实状态不一致是强烈不满点

来自：

- [#161590](https://github.com/openclaw/openclaw/issues/161590)
- [#161593](https://github.com/openclaw/openclaw/issues/161593)

用户痛点集中在更新流程：一类是 global install 直接失败，另一类是系统返回 `ok:true` 但后续因 helper 进程位置错误导致不可能完成更新。后者尤其影响信任，因为用户无法从表面提示判断真实状态。

### 7.2 Gateway 作为托管服务运行时，权限和生命周期问题更突出

来自：

- [#161601](https://github.com/openclaw/openclaw/issues/161601)

用户场景是 Windows 11 + Task Scheduler S4U session 0 + 单 Gateway 端口。该场景下 RPC authority 被关闭且无法通过重启或凭证轮换恢复，说明 OpenClaw 在“后台托管服务 + 工具 RPC + 权限恢复”组合下仍有边界问题。

### 7.3 用户希望任务完成结果与系统清理状态分离

来自：

- [#161576](https://github.com/openclaw/openclaw/issues/161576)

用户报告 native one-shot 实际已完成任务，但 cleanup 未确认导致整体被判失败。反馈信号是：用户更关心“业务任务是否完成”，而不是底层 client cleanup 是否完美收尾。系统应更清晰地区分“结果成功但清理异常”和“任务失败”。

### 7.4 大型插件场景下，性能问题会直接破坏核心使用体验

来自：

- [#161267](https://github.com/openclaw/openclaw/pull/161267)

大型插件导致模型切换冻结数分钟，属于明显的生产可用性问题。用户期望 Gateway 在大型插件生态下仍保持响应，不应因插件复制或 runtime 准备导致阻塞。

### 7.5 自动化和 cron 用户需要更可靠的可观测性

来自：

- [#161278](https://github.com/openclaw/openclaw/issues/161278)
- [#161085](https://github.com/openclaw/openclaw/pull/161085)

用户希望 cron-triggered turns 的 traces、session key、reply hooks 和 automation authority 能保持一致。当前多个问题说明自动化链路仍是复杂且易出错的子系统。

---

## 8. 待处理积压

> 基于今日数据，无法确认“长期未响应”的完整历史时长；以下列出的是当前最值得维护者优先关注的开放项。

### 8.1 高优先级、已有修复但仍待合并

- [#161267 fix(plugins): Gateway freezes on model changes with large plugins](https://github.com/openclaw/openclaw/pull/161267)  
  P0，ready for maintainer look。建议优先 review，避免大型插件用户继续遭遇 Gateway 冻结。

- [#161421 fix: paired clients time out behind queued connection metadata](https://github.com/openclaw/openclaw/pull/161421)  
  P1，ready for maintainer look。涉及 paired client reconnect 和安全边界。

- [#161319 fix(auto-reply): release canceled thinking-catalog waits](https://github.com/openclaw/openclaw/pull/161319)  
  P1，ready for maintainer look。修复取消 reply 时 thinking-catalog 底层操作未释放的问题。

- [#161558 fix(runtime): join unbound native workers during shutdown](https://github.com/openclaw/openclaw/pull/161558)  
  P2，ready for maintainer look。修复 runtime teardown 后 native supervisor thread 残留。

### 8.2 高优先级但仍需 proof 或作者动作

- [#161085 fix(cron): sessions_send fails after current automation runs](https://github.com/openclaw/openclaw/pull/161085)  
  P1，needs proof。涉及 cron session、authority 和 automation。

- [#161069 fix: stalled chat turns ask users to retry instead of answering from gathered context](https://github.com/openclaw/openclaw/pull/161069)  
  P1，needs proof。用户体验影响大：卡住的 chat turn 不应浪费已收集上下文。

- [#161402 fix(workers): launch model-fallback relaunches on the durable transcript leaf](https://github.com/openclaw/openclaw/pull/161402)  
  P1，needs proof。影响 cloud-worker fallback 可用性。

- [#161465 fix(crabbox): first dispatch fails when the backend cannot capture native snapshots](https://github.com/openclaw/openclaw/pull/161465)  
  P1，waiting on author。影响 Crabbox Linux profile 首次 cloud dispatch。

### 8.3 需要产品/安全决策的设计类 Issue

- [#161584 Plugin SDK: authorize resolved nested operations at a pre-effect boundary](https://github.com/openclaw/openclaw/issues/161584)  
  需要 product decision 与 security review。建议明确 Plugin SDK nested operation 的授权模型。

- [#161581 sessions.create: define durable per-session system-context contract and authority](https://github.com/openclaw/openclaw/issues/161581)  
  需要 maintainer/product/security review。建议作为 session-state 路线图议题处理。

### 8.4 发布与 CI 工程待处理

- [#161550 CI timing refresh aborts on checks-node-compat-node24](https://github.com/openclaw/openclaw/issues/161550)  
  P2。影响 CI timing refresh，建议尽快补齐 Node 24 compatibility job 的 shard descriptor 或让脚本优雅跳过未知 job。

- [#161590 Update failure: global-install-failed](https://github.com/openclaw/openclaw/issues/161590)  
  P0。尚未看到关联修复 PR。

- [#161593 update.run reports success but spawns helper inside gateway process tree](https://github.com/openclaw/openclaw/issues/161593)  
  P0。尚未看到关联修复 PR，建议提升为发布阻塞项跟踪。

---

## 总结

OpenClaw 今日开发活动非常密集，PR 队列中既有大量重构，也有多个直接影响用户体验和稳定性的修复。最紧迫的问题集中在三条线：**更新/发布链路、Gateway 运行时稳定性、会话与自动化一致性**。建议维护者优先处理 P0 更新失败与大型插件 Gateway 冻结，其次收敛 P1 的 RPC authority、cron session、cloud-worker fallback 和 paired client reconnect 问题。整体看，项目活跃度高、修复储备充足，但 review 与发布质量门控将决定下一版本能否稳定落地。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告  
日期：2026-09-30

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态整体呈现 **高活跃、强修复、重稳定性** 的态势。OpenClaw、Hermes Agent、ZeroClaw、CoPaw 等项目均出现大量 Issue/PR 更新，说明真实用户场景正在快速暴露运行时、渠道、会话、权限和发布链路问题。

从技术主题看，生态关注点已从“能否调用模型和工具”转向 **多渠道一致性、会话状态可靠性、插件/工具安全边界、本地模型接入、桌面端与 Web UI 体验、自动化任务可观测性**。同时，多个项目都出现了安全相关议题，包括 memory isolation、subagent session scope、CI 供应链、Office COM 自动化风险、Wasmtime 更新等，表明 Agent 运行时安全正在成为核心竞争力。

OpenClaw 仍是本批项目中体量和活跃度最突出的核心参照项目之一，但其待合并队列和 P0/P1 稳定性问题也更集中，体现出大型 Agent 平台在快速演进阶段的典型工程压力。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 今日重点 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 8 | 71 | 无 | Gateway 稳定性、更新链路、会话/自动化、插件性能、Web UI | **高活跃，高修复动能，但 P0/P1 较多，review 压力大** |
| **NanoBot** | 3 | 20 | 无 | Provider fallback、Subagent 安全、TUI/WebUI、Telegram 策略 | **活跃健康，修复闭环快，安全边界意识强** |
| **Hermes Agent** | 50 | 50 | 无 | 桌面端状态、安装更新、Slack/Discord 上下文、本地模型缓存、安全 CI | **极高活跃但零合并，稳定性压力高** |
| **PicoClaw** | 4 | 3 | 无 | Web UI 状态透明、消息队列、失败 turn 可见性 | **中高活跃，问题聚焦，UI 可信度待提升** |
| **NanoClaw** | 0 | 5 | 无 | Iron Gateway、本地模型、代理认证、CI pin | **低噪音，中等开发活跃，合并节奏偏慢** |
| **NullClaw** | 1 | 0 | 无 | Hosted MemCode memory engine 提案 | **低活跃，偏路线讨论，无稳定性负面信号** |
| **IronClaw** | 0 | 2 | `ironclaw-v1.4.1` | Google OAuth 修复、Wasmtime 安全更新、tool selection PR | **低到中等活跃，但发布节奏健康，偏质量巩固** |
| **LobsterAI** | 1 | 4 | 无 | Markdown/Artifacts、Windows 安装器、Gateway restart、多 Agent diary | **中等活跃，体验修复扎实，runtime 同步需关注** |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **Moltis** | 1 | 0 | 无 | Goal mode / Ralph loop 功能请求 | **低活跃，需求收集阶段** |
| **CoPaw** | 6 | 17 | 无 | 文件/多模态上下文、Provider、Embedding、终端/CI/桌面端 | **高活跃，工程修复快，但核心路径 Bug 较多** |
| **ZeptoClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **ZeroClaw** | 8 | 31 | 无 | Memory isolation、渠道多模态、插件生命周期、用户认证、配置 | **高活跃，安全响应快，但待合并 PR 多** |

---

## 3. OpenClaw 在生态中的定位

### 3.1 综合定位

OpenClaw 是本批项目中最接近“全栈个人 AI 助手 / Agent 平台”的项目之一。它覆盖 Gateway、插件系统、多渠道接入、Web UI、会话、自动化、发布更新、Skill Workshop、云 worker、browser/meeting 等复杂能力，技术面广度明显高于多数同类项目。

与 NanoBot、PicoClaw、NanoClaw 等更聚焦某些子系统的项目相比，OpenClaw 更像一个 **大型 Agent runtime + 多渠道/多插件平台**。这带来了生态优势，也带来了显著工程复杂度。

### 3.2 优势

1. **社区与贡献活跃度领先**  
   OpenClaw 今日 PR 更新 71 条，是所有项目中 PR 活动最高者。大量 PR 标注 `ready for maintainer look`，说明贡献供给充足。

2. **平台能力完整**  
   涉及 Gateway、插件、Web UI、自动化、会话、云 worker、browser、meeting、skills、自更新等模块。相比 NanoBot、PicoClaw 等项目，OpenClaw 的系统边界更大。

3. **工程化程度高**  
   今日出现发布验证 flake 管理、CI timing refresh、更新 helper process tree、Gateway snapshot 性能等问题，说明项目已进入较成熟的平台工程阶段，关注点不只是功能实现，而是发布质量和运行时可靠性。

4. **插件和多渠道生态更复杂**  
   大量渠道插件重构覆盖 Google Chat、iMessage、LINE、Mattermost、Teams、WhatsApp Web、Zalo 等，表明 OpenClaw 的渠道面比多数项目更宽。

### 3.3 风险与短板

1. **P0/P1 稳定性问题集中**  
   更新失败、Gateway 冻结、RPC authority closed、session cleanup、cloud-worker fallback、paired clients reconnect 等问题均影响核心路径。

2. **待合并队列偏长**  
   今日 71 条 PR 更新，其中 55 条待合并，维护者 review 压力显著高于 NanoBot、PicoClaw、NanoClaw 等中小项目。

3. **发布/更新链路仍是弱点**  
   #161590、#161593 说明 OpenClaw 在自更新、helper 隔离、托管 Gateway 进程检测方面仍需收敛。这一点与 Hermes Agent 的安装/更新问题形成共性。

### 3.4 与同类项目对比

| 对比维度 | OpenClaw | Hermes Agent | ZeroClaw | NanoBot | PicoClaw |
|---|---|---|---|---|---|
| 平台广度 | 很高 | 很高 | 高 | 中高 | 中 |
| 今日 PR 活跃 | 最高，71 | 高，50 | 高，31 | 中高，20 | 低中，3 |
| 稳定性压力 | 高 | 很高 | 中高 | 中 | 中 |
| 安全议题 | Gateway authority、Plugin SDK、session context | CI 安全、平台上下文、clipboard | Memory isolation、Wasmtime、password auth | Subagent isolation、secure form | 较少 |
| 产品侧重点 | 全栈 Agent runtime + 多渠道插件 | Desktop/CLI/API + 平台集成 | 安全、多渠道、插件生命周期 | TUI/WebUI、Provider、Subagent | Web UI 交互透明度 |
| 当前阶段 | 快速迭代 + 稳定性收敛 | 爆发式问题涌入，待合并不足 | 快速迭代，安全修复活跃 | 稳健迭代 | UI 可信度补强 |

---

## 4. 共同关注的技术方向

### 4.1 更新、安装与发布链路可靠性

涉及项目：**OpenClaw、Hermes Agent、LobsterAI、IronClaw、NanoClaw**

- OpenClaw：`update.run` 返回成功但 helper 运行在 Gateway process tree 内，导致实际无法更新；global install 失败。
- Hermes Agent：Windows 安装器 Launch 卡死、`hermes update` stale receipt、代理网络下 partial clone 失败。
- LobsterAI：Windows 安装器在检测到用户 skills 时中止升级，并补充迁移提示。
- IronClaw：发布 `1.4.1`，修复 Google OAuth 激活并包含 Wasmtime 安全更新。
- NanoClaw：CI pin、cosign pin、Dependabot，强调发布供应链可重复性。

**结论：** Agent 产品开始进入“真实桌面/长期运行/自动更新”阶段，安装和更新体验已成为用户信任的关键组成。

---

### 4.2 Gateway / Runtime 稳定性

涉及项目：**OpenClaw、LobsterAI、NanoClaw、ZeroClaw、CoPaw**

- OpenClaw：大型插件切换模型导致 Gateway 冻结；Gateway RPC authority closed；SQLite snapshot staging 问题。
- LobsterAI：修复 gateway restart budget。
- NanoClaw：Iron Gateway 支持本地模型 endpoint、keyless local HTTP model。
- ZeroClaw：runtime context budget clamp 修复，插件 host Wasmtime 安全更新。
- CoPaw：桌面端 backend reconciliation、Provider inline media request bound。

**结论：** Gateway 已成为 Agent 系统的控制平面核心，涉及模型路由、权限、插件、文件、多渠道和本地服务访问，其稳定性决定整体产品可用性。

---

### 4.3 会话、Subagent 与 Memory 隔离

涉及项目：**OpenClaw、NanoBot、ZeroClaw、LobsterAI、Hermes Agent、PicoClaw**

- OpenClaw：sessions.create system-context contract、cron session key mismatch、cloud-worker stale transcript base。
- NanoBot：subagent snapshots 限定当前 session；新增 session-owned task messaging/cancellation。
- ZeroClaw：owned sessions 通过 `spawn_subagent` / `execute_pipeline` 访问 shared memory plane，S0 安全问题。
- LobsterAI：多 Agent explicit ownership 下 Dream Diary 面板为空，可能与 ambient-owner fallback 相关。
- Hermes Agent：subagent lifecycle event 需要转发到 API session stream。
- PicoClaw：后台 subagent 等待机制误用 scheduling primitive，触发 autonomous-loop tick。

**结论：** 多 Agent / Subagent 已从概念能力进入真实使用阶段，核心挑战是 **session ownership、memory plane、任务生命周期、事件可观测性和安全边界**。

---

### 4.4 多渠道、多模态输入一致性

涉及项目：**OpenClaw、ZeroClaw、CoPaw、NanoBot、Hermes Agent**

- OpenClaw：二线渠道插件大规模清理，覆盖 Google Chat、iMessage、LINE、Mattermost、Teams、WhatsApp Web 等。
- ZeroClaw：WhatsApp Web 图片保存、caption 丢失、Lark/飞书富文本图片解析。
- CoPaw：`send_file_to_user` 文件/图片内容块污染上下文，工具输出 PDF 自动回灌导致模型错误。
- NanoBot：Telegram per-chat / per-topic group policy。
- Hermes Agent：Slack/Discord slash command、button、thread、voice input 上下文不一致导致 prompt pin 翻转。

**结论：** 渠道能力已不只是“收发消息”，而是要保证 **上下文、身份、文件、多模态、频道策略、技能绑定** 的一致性。

---

### 4.5 本地模型与 Provider catalog

涉及项目：**NanoBot、NanoClaw、Hermes Agent、CoPaw、OpenClaw**

- NanoBot：provider fallback 在 insufficient credits 时失效；OpenAI retired model 过滤；Codex model discovery 避免 release-pinned filtering。
- NanoClaw：keyless local model over HTTP、provider 声明 exact host:port endpoint、配置阶段校验 model URL。
- Hermes Agent：本地模型 follow-up turns 因 tool schema 变化重复 prefill，P0 性能问题。
- CoPaw：Provider fallback cooldown、Creator OpenAI/DashScope 能力适配失败。
- OpenClaw：Gateway 读取 GitHub publication options 性能问题、大型插件切换模型冻结。

**结论：** 多 Provider、本地模型、自托管 OpenAI-compatible 服务正在成为标准使用场景。模型 catalog、能力声明、fallback、缓存稳定性是下一阶段关键基础设施。

---

### 4.6 UI 状态透明度与错误可观测性

涉及项目：**PicoClaw、OpenClaw、CoPaw、NanoBot、LobsterAI、Hermes Agent**

- PicoClaw：working indicator、steering queue state、failed turn 可见性。
- OpenClaw：native one-shot 实际成功但 cleanup 失败，用户需要区分“任务成功”和“清理异常”。
- CoPaw：Provider 错误被泛化提示吞掉，Embedding reindex 日志误导。
- NanoBot：WebUI/TUI 上传、模型选择、secure form。
- LobsterAI：Dream Diary 底层文件更新但 UI 空。
- Hermes Agent：Desktop 首条消息丢失、重复 assistant reply、`/context` 误判无 active agent。

**结论：** Agent 产品的用户体验核心不再是“界面好看”，而是 **状态真实、错误可操作、后台任务可追踪、失败不沉默**。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 / 路线特征 |
|---|---|---|---|
| **OpenClaw** | 全栈 Agent runtime、多渠道插件、Gateway、Web UI、自动化、Skill Workshop | 高级个人助手用户、插件开发者、自动化场景、平台集成者 | 大型 Gateway-centric 架构，插件和会话系统复杂，强调多渠道与长期自动化 |
| **NanoBot** | Provider fallback、TUI/WebUI、Telegram、Subagent 安全 | 轻量 Agent 用户、聊天机器人用户、TUI/WebUI 使用者 | 迭代快，测试补充积极，Subagent session scope 收敛明显 |
| **Hermes Agent** | Desktop/CLI/API、Slack/Discord、OpenAI SIWC、本地模型、Subagent observability | 桌面用户、团队协作集成者、第三方客户端开发者 | 生态大、反馈多，但合并节奏短期滞后；平台 adapter 和桌面状态复杂 |
| **PicoClaw** | Web UI 交互可靠性、长任务状态、steering queue | 以 Web UI 操作 Agent 的个人用户 | 聚焦 UI 可信度和 Agent 长任务状态可见性，架构相对轻量 |
| **NanoClaw** | Iron Gateway、本地模型、安全供应链 | 本地模型用户、受控网络/代理环境用户 | 强调 gateway policy、本地 HTTP 模型和 CI 供应链 pin |
| **NullClaw** | Memory interface、可插拔记忆后端 | 关注长期记忆与轻量助手的用户 / 第三方记忆服务商 | 低活跃但 memory abstraction 有生态吸引力 |
| **IronClaw** | 稳定发布、OAuth 扩展、Wasmtime、tool selection | 生产部署者、Google 生态用户、多工具助手用户 | 发布节奏稳，偏成熟项目；新增 embedding tool selection 体现工具发现优化路线 |
| **LobsterAI** | 桌面体验、Artifacts、Markdown、OpenClaw runtime 集成、多 Agent UI | 桌面个人助手用户、文档/Artifacts 工作流用户 | 更偏产品化桌面应用，依赖内置 OpenClaw runtime，需要关注上游同步 |
| **Moltis** | Goal mode / agent loop 需求 | 追求自主执行 loop 的用户 | 当前低活跃，处于路线需求探索阶段 |
| **CoPaw** | Console、Provider、文件/多模态、Embedding、终端、Windows 桌面 | 企业/团队 Agent、Provider 集成用户、Console 管理员 | 工程修复密集，关注跨平台、Provider 和多模态上下文治理 |
| **ZeroClaw** | 安全、Memory isolation、插件生命周期、多渠道、用户认证、RAG/A2A RFC | 安全敏感用户、插件生态开发者、多渠道 Agent 用户 | 安全议题突出，插件/CLI/认证体系完善中，路线向知识与 A2A 扩展 |

---

## 6. 社区热度与成熟度

### 6.1 快速迭代 / 高压力层

项目：**OpenClaw、Hermes Agent、ZeroClaw、CoPaw**

特征：

- Issue/PR 更新量高。
- 多个 P0/P1/S0/S1 问题并发。
- 修复 PR 供应充足，但 review 和合并压力明显。
- 用户场景复杂，涵盖桌面端、Web UI、多渠道、Provider、本地模型、插件、自动化、安全。

判断：

- **OpenClaw**：高活跃且工程能力强，但稳定性收敛是短期关键。
- **Hermes Agent**：问题和 PR 同时爆发，但今日无合并，需防止积压。
- **ZeroClaw**：安全响应快，S0 memory isolation 当日有修复 PR，健康度积极。
- **CoPaw**：工程修复快，但文件/多模态/Provider 主路径问题影响较大。

### 6.2 稳健迭代 / 功能巩固层

项目：**NanoBot、PicoClaw、LobsterAI、NanoClaw、IronClaw**

特征：

- PR 数量中等或偏低。
- 问题较聚焦，修复方向清晰。
- 更强调体验、配置、Provider、本地模型或发布质量。
- 相比高压力层，系统边界更可控。

判断：

- **NanoBot**：安全和测试意识强，Subagent 设计逐步成熟。
- **PicoClaw**：Web UI 可信度是当前核心。
- **LobsterAI**：产品化体验持续打磨，但需跟进内置 runtime。
- **NanoClaw**：本地模型和 Iron Gateway 路线清晰。
- **IronClaw**：已有稳定版发布，偏质量维护和生产可用性。

### 6.3 低活跃 / 路线观察层

项目：**NullClaw、Moltis、TinyClaw、ZeptoClaw**

特征：

- 今日几乎无代码变更。
- NullClaw 和 Moltis 各有一个功能提案，分别指向 memory backend 和 goal loop。
- TinyClaw、ZeptoClaw 无活动。

判断：

- **NullClaw**：记忆接口具备生态吸引力，但需维护者回应。
- **Moltis**：Goal mode 方向有战略价值，但仍处需求萌芽。
- **TinyClaw / ZeptoClaw**：短期无活跃信号。

---

## 7. 值得关注的趋势信号

### 7.1 Agent 安全边界正在从“模型安全”扩展到“运行时安全”

今日多个项目出现安全相关议题：

- ZeroClaw：owned session memory isolation S0。
- NanoBot：subagent snapshots 限定当前 session。
- OpenClaw：Plugin SDK nested operation pre-effect authorization、Gateway authority closed。
- Hermes Agent：CI autofix human review、history-check gate。
- CoPaw：Office COM 自动化风险识别。
- IronClaw / ZeroClaw：Wasmtime 安全更新。
- NanoClaw：GitHub Actions/cosign pin。

**参考价值：**  
Agent 开发者需要将安全设计下沉到 memory、tool、subagent、plugin、CI、desktop automation、provider credential 等多个层面，而不是只关注 prompt injection。

---

### 7.2 多 Agent / Subagent 正进入工程落地期

相关信号：

- OpenClaw：automation/session/fallback/transcript 问题频繁。
- NanoBot：session-owned task messaging and cancellation。
- Hermes Agent：subagent lifecycle events 进入 API stream。
- ZeroClaw：subagent/pipeline memory private。
- PicoClaw：subagent 等待机制和 autonomous-loop tick。
- LobsterAI：多 Agent explicit ownership 下 Dream Diary 面板异常。

**参考价值：**  
Subagent 能力的难点不是 spawn，而是 **ownership、取消、消息、memory、trace、UI 可见性和失败恢复**。

---

### 7.3 本地模型和多 Provider 将成为默认假设

相关信号：

- NanoClaw：keyless local model over HTTP、exact host:port endpoint。
- Hermes Agent：本地模型 prompt cache 因 tool schema 变化失效。
- NanoBot：fallback、retired model filtering、Codex dynamic discovery。
- CoPaw：fallback cooldown、Creator 多 Provider 失败。
- OpenClaw：大型插件/模型切换导致 Gateway 冻结。

**参考价值：**  
Agent 框架需要内建模型能力声明、catalog 刷新、fallback 策略、错误分类、上下文缓存稳定性和本地服务访问策略。

---

### 7.4 多模态和文件 Artifact 需要与模型输入解耦

相关信号：

- CoPaw：工具输出文件自动回灌导致模型错误；file/image content block 污染上下文。
- ZeroClaw：WhatsApp Web 图片保存、caption 丢失、Lark 图片解析。
- LobsterAI：Markdown 链接在 Artifact card 内打开。
- NanoBot：MCP server working directory 下 Markdown image 解析。
- PicoClaw：失败 turn 和 queued message 可见性。

**参考价值：**  
未来 Agent 系统应区分：

1. 用户可见 artifact；
2. 模型可读 structured context；
3. 可选文件引用；
4. 多模态模型可消费内容；
5. 渠道原始附件。

否则文件和图片会频繁污染上下文或触发 provider 错误。

---

### 7.5 “真实状态 UI”成为 Agent 产品成熟度标志

相关信号：

- PicoClaw：honest working indicator、steering queue state、failed turn visible。
- Hermes Agent：Desktop 首条消息丢失、重复渲染、`/context` 状态错误。
- OpenClaw：任务成功但 cleanup 失败应分离表达。
- CoPaw：错误信息和 embedding reindex 统计不可信。
- LobsterAI：底层 DREAMS.md 有内容但 UI 空。

**参考价值：**  
Agent UI 不能只展示聊天气泡。成熟产品需要显示 turn 状态、队列状态、后台任务、失败原因、清理异常、artifact 状态、session ownership 和 trace。

---

### 7.6 工具发现从“模型主动搜索”走向“Host 侧智能推荐”

相关信号：

- IronClaw：embedding-based opt-in tool selection。
- OpenClaw：大型插件模型切换性能问题。
- ZeroClaw：插件 staged admission 和 verified update。
- CoPaw：技能下载 offload、浏览器配置扩展。
- NanoBot：subagent 可控协作能力增强。

**参考价值：**  
当工具数量增加，单纯依赖模型读完整 tools array 或调用 `tool_search` 会带来延迟、token 和准确性问题。Host 侧工具预选、权限过滤、embedding ranking、插件生命周期管理将变得重要。

---

## 总体结论

当前开源个人 AI 助手 / 自主智能体生态正从“功能实现期”进入“工程可信期”。最活跃的项目不再只是增加新能力，而是在处理真实用户环境中的复杂问题：更新失败、Gateway 冻结、Subagent 越权、渠道上下文漂移、本地模型缓存失效、多模态文件污染、桌面端状态不一致。

OpenClaw 在生态中处于平台型核心位置，能力面和社区活跃度领先，但短期必须优先收敛更新链路、Gateway 稳定性和会话/自动化一致性。对技术决策者而言，选择项目时应重点评估三点：**运行时安全边界、错误与状态可观测性、多 Provider/本地模型适配成熟度**。这些因素正在比单一功能数量更能决定 Agent 平台的长期可用性。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报  
**日期：2026-09-30**  
**项目：HKUDS/nanobot**

---

## 1. 今日速览

过去 24 小时 NanoBot 活跃度较高：共有 **3 条 Issue 更新**、**20 条 PR 更新**，其中 **12 条 PR 仍待合并**，**8 条 PR 已关闭或合并**。今日工作重心集中在 **WebUI/TUI 体验修复、Provider 模型与 fallback 稳定性、Telegram 群组策略、Subagent 安全边界** 等方向。  
从标签看，今日 PR 大多带有 `fix`、`test`、`priority: p2`，说明维护者正在持续补齐回归测试并处理实际使用中的边缘问题；同时也出现了 `security`、`priority: p1` 的安全修复，表明子代理会话隔离是近期重点。  
社区反馈数量不多，Issues/PRs 评论与点赞均较低，但问题质量较高，集中反映真实场景中的可用性与稳定性痛点。整体来看，项目处于 **高开发活跃、快速修复、功能并行推进** 的健康状态。

---

## 2. 项目进展

### 2.1 Provider fallback 与模型可用性修复

#### [#5968 fix(providers): honor configured fallbacks on "insufficient credits"](https://github.com/HKUDS/nanobot/pull/5968)  
状态：**已关闭 / 已处理**  
关联 Issue：[ #5967 ](https://github.com/HKUDS/nanobot/issues/5967)

该 PR 修复了 OpenAI-compatible provider 在返回 **HTTP 400 + “insufficient credits”** 时，NanoBot 没有正确触发 fallback model 的问题。  
此前，当某个网关额度耗尽时，即使用户已配置 fallback，系统也可能直接把 provider 原始错误返回给用户，导致用户误以为代理整体失效。

推进意义：

- 提升多模型 fallback 的可靠性。
- 改善使用第三方 OpenAI-compatible 网关时的容错体验。
- 解决了一个直接影响可用性的 provider 层 Bug。

---

### 2.2 Subagent 安全边界与会话隔离

#### [#5976 fix(my): scope subagent snapshots to the current session](https://github.com/HKUDS/nanobot/pull/5976)  
状态：**已关闭 / 已处理**  
标签：`security`, `priority: p1`

这是今日最重要的稳定性与安全性相关 PR。它将 `my` 工具中的 subagent 快照限制在当前 canonical session 内，避免跨会话查看或遍历不属于当前上下文的任务信息。

主要改动：

- `my` 只返回当前会话拥有的 subagent task。
- 没有 session context 时不返回任务。
- 当前 session 不可用时拒绝直接 subagent inspection。
- 保持现有 `spawn` 和 `my` 接口行为，但收紧作用域。

推进意义：

- 强化多会话环境下的数据隔离。
- 降低 subagent task 信息泄露风险。
- 为后续更复杂的 subagent 协作能力打下安全基础。

---

#### [#5969 fix(agent): require subagent consolidator at construction](https://github.com/HKUDS/nanobot/pull/5969)  
状态：**已关闭 / 已处理**

该 PR 要求构造 `SubagentManager` 时显式传入 keyword-only 的 `Consolidator`，并在 runtime 资源创建前拒绝 `None`。同时避免创建 fallback consolidator。

推进意义：

- 减少隐式默认行为导致的运行时不确定性。
- 提升 subagent 管理器初始化路径的可预测性。
- 与 #5976 一起收紧 subagent 基础设施的安全和稳定性。

---

### 2.3 TUI 体验与结构改进

#### [#5966 fix(tui): keep overflow picker choices reachable](https://github.com/HKUDS/nanobot/pull/5966)  
状态：**已关闭 / 已处理**

修复 TUI `PickerMenu` 在候选项超出可视窗口时，部分选项无法触达的问题。新增了滚动窗口、键盘选择保持、方向/范围提示等行为，并覆盖键盘、鼠标、过滤刷新等测试场景。

推进意义：

- 改善 TUI 中模型、选项、菜单等 picker 的可用性。
- 减少长列表场景下的交互阻塞。
- 增强 TUI 自动化测试覆盖。

---

#### [#5964 fix(tui): align controls and header with transcript](https://github.com/HKUDS/nanobot/pull/5964)  
状态：**已关闭 / 已处理**

该 PR 调整了 TUI 控件、header、composer 与 transcript 内容列的对齐方式，移除 session header 固定宽度限制。

推进意义：

- 改善 TUI 视觉一致性。
- 提升不同终端宽度下的布局适配。
- 属于用户体验层面的精修。

---

#### [#5975 refactor(tui): organize source by feature boundaries](https://github.com/HKUDS/nanobot/pull/5975)  
状态：**已关闭 / 已处理**

该 PR 对 TUI 代码进行按功能边界重组，将源码和测试划分到 `app`、`client`、`composer`、`menus`、`platform`、`rendering`、`views` 等目录下。

推进意义：

- 降低 TUI 模块维护复杂度。
- 为后续功能迭代提供更清晰的代码结构。
- 属于中长期维护性提升。

---

### 2.4 WebUI 本地化修正

#### [#5982 Correct misleading Taiwanese WebUI messages](https://github.com/HKUDS/nanobot/pull/5982)  
状态：**已关闭 / 已处理**

该 PR 修正了 zh-TW WebUI 中 20 条容易误导用户的文案，使其更贴近英文源文案和实际 UI 行为。

推进意义：

- 改善繁体中文用户体验。
- 降低错误文案引发的操作误解。
- 体现项目对国际化质量的关注。

---

## 3. 社区热点

今日 Issues 和 PRs 的评论数、点赞数整体较低，大多数条目评论为 0 或未提供评论数据。因此严格按“评论最多 / 反应最多”排序并不明显。但从问题影响范围和关联 PR 看，以下主题最值得关注。

### 3.1 Provider fallback 在额度不足时失效

- Issue：[ #5967 Fallback models are skipped when a provider reports "insufficient credits" ](https://github.com/HKUDS/nanobot/issues/5967)  
- Fix PR：[ #5968 ](https://github.com/HKUDS/nanobot/pull/5968)  
- 状态：Issue 已关闭，PR 已关闭 / 已处理

用户诉求：

- 当主模型或 provider 不可用时，希望系统自动切换到 fallback。
- 用户已经配置了 fallback，但系统仍直接报错，造成“Bot 停止工作”的体验。

分析：

这是典型的高影响稳定性问题，尤其影响使用 OpenAI-compatible 网关、多 provider 路由、额度有限账户的用户。修复后，NanoBot 在复杂 provider 环境中的鲁棒性会明显提升。

---

### 3.2 OpenAI 模型选择器仍展示已下线模型

- Issue：[ #5977 Model picker lists OpenAI models that already shut down ](https://github.com/HKUDS/nanobot/issues/5977)  
- Fix PR：[ #5979 fix(webui): hide provider models past OpenAI shutdown_date ](https://github.com/HKUDS/nanobot/pull/5979)  
- 相关关闭 PR：[ #5978 ](https://github.com/HKUDS/nanobot/pull/5978)

用户诉求：

- 模型下拉框不应展示已经 shutdown 的 OpenAI 模型。
- 用户希望在设置中选择的模型就是实际可调用模型，而不是下一轮对话才失败。

分析：

该问题体现了 WebUI 模型目录与 provider 实际可用性之间的同步问题。OpenAI `GET /v1/models` 仍可能返回 retired model id，导致 NanoBot picker 展示不可用模型。#5979 通过过滤 `shutdown_date <= today` 的模型来降低误选风险。

---

### 3.3 Telegram 群组策略需要更细粒度控制

- Issue：[ #5972 Telegram: per-chat and per-topic group policy ](https://github.com/HKUDS/nanobot/issues/5972)  
- PR：[ #5973 feat(telegram): per-chat and per-topic group policy overrides ](https://github.com/HKUDS/nanobot/pull/5973)  
- PR：[ #5974 feat(commands): add /group to manage reply policy from chat ](https://github.com/HKUDS/nanobot/pull/5974)

用户诉求：

- 当前 Telegram `groupPolicy` 是 channel-wide，只能在 `"open"` 和 `"mention"` 间全局选择。
- 在大型 supergroup 或 forum topics 场景中，用户希望不同 topic 有不同策略：项目讨论区可以主动参与，公告区保持安静。

分析：

这是明显的路线图信号。已有两个 PR 覆盖底层策略 override 与 `/group` 管理命令，其中 #5974 依赖 #5973。若后续评审顺利，这一功能很可能进入下一版本或近期主干。

---

## 4. Bug 与稳定性

按影响程度与是否已有修复排序如下。

### 高优先级 / 安全相关

#### 4.1 Subagent 快照可能缺少当前会话作用域限制

- PR：[ #5976 fix(my): scope subagent snapshots to the current session ](https://github.com/HKUDS/nanobot/pull/5976)  
- 状态：已关闭 / 已处理  
- 标签：`security`, `priority: p1`

影响：

- 在多会话环境中，若 subagent inspection 没有严格绑定 session，存在信息边界不清的问题。
- 该问题已通过当前 session scope 限制进行修复。

---

### 高影响稳定性

#### 4.2 Provider 返回 “insufficient credits” 时 fallback 未触发

- Issue：[ #5967 ](https://github.com/HKUDS/nanobot/issues/5967)  
- Fix PR：[ #5968 ](https://github.com/HKUDS/nanobot/pull/5968)  
- 状态：Issue 已关闭，Fix PR 已关闭 / 已处理

影响：

- 主 provider 额度耗尽时，即使配置 fallback，也可能直接失败。
- 影响 agent 连续可用性。
- 已有修复。

---

#### 4.3 OpenAI 已下线模型仍出现在 WebUI picker

- Issue：[ #5977 ](https://github.com/HKUDS/nanobot/issues/5977)  
- Fix PR：[ #5979 ](https://github.com/HKUDS/nanobot/pull/5979)  
- 状态：Issue 打开，Fix PR 打开  
- 相关关闭 PR：[ #5978 ](https://github.com/HKUDS/nanobot/pull/5978)

影响：

- 用户选择 retired model 后，下一轮对话直接报 `model_not_found`。
- 问题并非 key 权限，而是模型目录展示了不可用条目。
- 已有 open fix PR，预计可较快处理。

---

### 中等优先级 / 用户体验与回归

#### 4.4 TUI / WebUI 附件上传因 Base64 WebSocket frame 过大失败

- PR：[ #5980 fix(webui): upload TUI and WebUI attachments over binary HTTP ](https://github.com/HKUDS/nanobot/pull/5980)  
- 状态：打开

影响：

- 图片转 Base64 后可能超过 1 MiB WebSocket frame。
- gateway 返回 1009，TUI 重连后可能丢失未确认 draft。
- PR 方案是改用认证 HTTP 上传原始文件 bytes。

---

#### 4.5 ExecTool argument-vector command 丢失 PATH

- PR：[ #5986 fix(tools): preserve PATH for argument-vector commands ](https://github.com/HKUDS/nanobot/pull/5986)  
- 状态：打开

影响：

- `ExecTool` 执行 argument-vector command 时无法正确查找可执行文件。
- 修复方案是在保持环境隔离的同时保留父进程 `PATH`，并正确应用 `pathPrepend` / `pathAppend`。
- 已包含回归测试。

---

#### 4.6 工具参数 `null` 类型与 `enum` 校验不严格

- PR：[ #5965 fix: 执行 null 参数的类型和枚举校验 ](https://github.com/HKUDS/nanobot/pull/5965)  
- 状态：打开

影响：

- `type: "null"` 或 `type: ["null"]` 曾错误接受空字符串、数字、布尔值和容器。
- nullable 参数可能在 enum 校验前直接通过。
- 修复后更符合 JSON Schema 对 `null` 与 `enum` 的语义。

---

#### 4.7 Markdown 图片无法根据 MCP server 工作目录解析

- PR：[ #5971 fix(webui): resolve markdown images against MCP server working dirs ](https://github.com/HKUDS/nanobot/pull/5971)  
- 状态：打开

影响：

- MCP stdio server 在独立 `cwd` 下生成文件，例如 Playwright 生成 `shot.png`。
- Agent 输出 `![desc](shot.png)` 时，WebUI 无法正确解析文件路径，显示为失效 attachment chip。
- 该修复对浏览器自动化、截图、文件 artifact 场景较重要。

---

## 5. 功能请求与路线图信号

### 5.1 Telegram per-chat / per-topic group policy

- Issue：[ #5972 ](https://github.com/HKUDS/nanobot/issues/5972)  
- PR：[ #5973 ](https://github.com/HKUDS/nanobot/pull/5973)  
- PR：[ #5974 ](https://github.com/HKUDS/nanobot/pull/5974)

路线图判断：**较可能进入近期版本**

理由：

- 用户需求明确，来自真实 supergroup / forum topics 使用场景。
- 已有底层 override PR 和 `/group` 管理命令 PR。
- #5974 明确依赖 #5973，说明实现路径已拆分并进入评审阶段。

---

### 5.2 WebUI 中通过安全表单收集凭据

- PR：[ #5970 feat(webui): collect credentials through a mid-turn secure form ](https://github.com/HKUDS/nanobot/pull/5970)  
- 状态：打开  
- 标签：`security`, `feature`

路线图判断：**值得重点关注，可能成为 WebUI 安全交互能力的一部分**

背景：

当浏览器驱动 agent，例如 Playwright MCP，需要用户登录 LinkedIn 等网站时，当前只能把账号密码直接输入聊天。这会导致凭据进入：

- 模型上下文
- session transcript
- provider 请求日志

该 PR 通过 mid-turn secure form 收集凭据，目标是避免敏感信息进入模型上下文。

---

### 5.3 WebUI reasoning effort 改为 catalog-backed 选择

- PR：[ #5983 feat(webui): add catalog-backed reasoning effort selection ](https://github.com/HKUDS/nanobot/pull/5983)  
- 状态：打开

路线图判断：**可能纳入下一轮 WebUI 易用性优化**

价值：

- 将 Reasoning effort 从高级选项中的自由文本，提升为模型下方的可选择项。
- 通过 provider catalog 获取模型能力，减少用户猜测支持值的成本。
- 有助于降低配置错误。

---

### 5.4 Codex 模型发现避免 release-pinned catalog filtering

- PR：[ #5984 fix(codex): avoid release-pinned model catalog filtering ](https://github.com/HKUDS/nanobot/pull/5984)  
- 状态：打开

路线图判断：**偏平台兼容性修复，可能较快合入**

问题：

Codex 模型发现是动态且账号认证相关的，但 endpoint 会根据 `client_version` 过滤可见模型。如果 discovery 固定到某个已发布 CLI 版本，新模型可能在 NanoBot 发版前不可见。

该 PR 使用 `client_version=99.99.99` 避免 release-pinned 过滤，使模型发现更及时。

---

### 5.5 Subagent session-owned task messaging and cancellation

- PR：[ #5985 feat(subagent): add session-owned task messaging and cancellation ](https://github.com/HKUDS/nanobot/pull/5985)  
- 状态：打开  
- 依赖背景：建立在 #5976 的安全收敛之后

路线图判断：**中期重要能力，可能推动 Subagent 从“观察/快照”走向“可控协作”**

主要能力：

- session-owned task messaging
- task cancellation
- full UUID task 标识
- 有界内存 inbox
- receipt / ack 机制

这表明 NanoBot 的 subagent 设计正在向多任务协同、可控生命周期管理方向演进。

---

### 5.6 TUI active turn 中接受 `/goal` 请求

- PR：[ #5981 fix(tui): accept goal requests during active turns ](https://github.com/HKUDS/nanobot/pull/5981)  
- 状态：打开

路线图判断：**可能作为 TUI 交互增强进入近期版本**

功能含义：

- `/goal <task>` 可在 active turn 中提交隐藏 agent input。
- Enter 立即发送，Tab 等待。
- 生成请求使用已有上下文，不额外加 prompt wrapper。

这说明 TUI 正在支持更灵活的“边运行边追加目标”工作流。

---

## 6. 用户反馈摘要

### 6.1 “我配置了 fallback，但 bot 还是直接失败”

来源：

- [#5967](https://github.com/HKUDS/nanobot/issues/5967)

痛点：

用户期望 fallback 是可靠兜底机制，尤其是在 provider 额度耗尽时。但由于特定错误文本没有被识别，fallback 被跳过。  
这类问题对用户信任影响较大，因为用户已经主动配置了高可用方案，却没有得到预期行为。

当前状态：

- 已有修复 PR [#5968](https://github.com/HKUDS/nanobot/pull/5968)
- Issue 已关闭

---

### 6.2 “模型下拉框展示了已经不可用的模型”

来源：

- [#5977](https://github.com/HKUDS/nanobot/issues/5977)

痛点：

用户在设置中选择 `gpt-5-chat-latest` 或 `gpt-5.3-chat-latest` 后，下一次 Telegram 对话直接失败，而同一 API key 下其他模型可用。  
这说明用户并不只是遇到 provider 权限问题，而是 UI 给出了错误选择。

当前状态：

- 修复 PR [#5979](https://github.com/HKUDS/nanobot/pull/5979) 打开
- 另有 [#5978](https://github.com/HKUDS/nanobot/pull/5978) 已关闭，可能是替代或重复提交

---

### 6.3 “Telegram 大群里，bot 需要按 topic 控制发言”

来源：

- [#5972](https://github.com/HKUDS/nanobot/issues/5972)

痛点：

一个 bot 同时服务多个 topic 时，单一 `groupPolicy` 无法覆盖真实需求。  
典型场景是：

- 项目讨论 topic：希望 bot 主动参与
- 公告 topic：希望 bot 保持安静
- 忙碌 supergroup：不希望 bot 全局开放式响应

当前状态：

- 底层 override PR [#5973](https://github.com/HKUDS/nanobot/pull/5973) 打开
- 管理命令 PR [#5974](https://github.com/HKUDS/nanobot/pull/5974) 打开，且依赖 #5973

---

### 6.4 “不要把登录凭据直接发到聊天和模型上下文里”

来源：

- [#5970](https://github.com/HKUDS/nanobot/pull/5970)

痛点：

浏览器自动化 agent 需要用户凭据时，当前交互路径不够安全。用户不希望密码出现在：

- 聊天记录
- 模型上下文
- provider 日志
- session transcript

当前状态：

- 安全表单 PR 已打开
- 这是 WebUI 安全交互能力的重要方向

---

## 7. 待处理积压

当前数据仅覆盖过去 24 小时，未显示长期未响应的 Issue 或 PR。因此以下不是“长期积压”，而是今日仍需维护者重点关注的开放项。

### 7.1 需要优先评审的安全与稳定性 PR

- [#5970 feat(webui): collect credentials through a mid-turn secure form](https://github.com/HKUDS/nanobot/pull/5970)  
  涉及凭据处理与模型上下文隔离，建议安全评审优先。

- [#5985 feat(subagent): add session-owned task messaging and cancellation](https://github.com/HKUDS/nanobot/pull/5985)  
  建立在 subagent session isolation 之上，涉及任务所有权、消息、取消和内存 inbox，建议重点检查并发、权限边界和资源释放。

- [#5986 fix(tools): preserve PATH for argument-vector commands](https://github.com/HKUDS/nanobot/pull/5986)  
  影响工具执行可靠性，且涉及环境变量隔离，应尽快评审。

---

### 7.2 需要合并顺序管理的 stacked PR

- [#5973 feat(telegram): per-chat and per-topic group policy overrides](https://github.com/HKUDS/nanobot/pull/5973)  
- [#5974 feat(commands): add /group to manage reply policy from chat](https://github.com/HKUDS/nanobot/pull/5974)

说明：

#5974 明确依赖 #5973。建议先完成 #5973 的设计与测试评审，再让 #5974 rebase，以减少重复 diff 和评审噪音。

---

### 7.3 WebUI 模型目录与 provider catalog 相关 PR 可能存在重叠

- [#5979 fix(webui): hide provider models past OpenAI shutdown_date](https://github.com/HKUDS/nanobot/pull/5979)  
- [#5983 feat(webui): add catalog-backed reasoning effort selection](https://github.com/HKUDS/nanobot/pull/5983)  
- [#5984 fix(codex): avoid release-pinned model catalog filtering](https://github.com/HKUDS/nanobot/pull/5984)

说明：

这几项都与 provider catalog、模型发现、模型能力展示有关。建议维护者统一检查：

- catalog 数据来源
- 缓存与刷新策略
- shutdown model 过滤
- client_version 对可见性的影响
- 模型能力字段对 UI 配置项的驱动方式

---

### 7.4 附件与文件 artifact 处理链路需要整体关注

- [#5980 fix(webui): upload TUI and WebUI attachments over binary HTTP](https://github.com/HKUDS/nanobot/pull/5980)  
- [#5971 fix(webui): resolve markdown images against MCP server working dirs](https://github.com/HKUDS/nanobot/pull/5971)

说明：

这两个 PR 都指向文件与附件处理体验：一个解决上传通道问题，另一个解决 MCP 工具产物路径解析问题。建议从端到端角度测试：

- TUI 上传
- WebUI 上传
- WebSocket 重连
- HTTP binary upload 鉴权
- MCP working directory artifact 解析
- Markdown image 渲染
- 大文件与图片场景

---

## 总体健康度评估

NanoBot 今日项目健康度较好。维护活动密集，PR 数量显著高于 Issue 数量，说明项目处于主动修复和功能推进阶段，而不是被动响应问题。  
值得肯定的是，今日多个修复都包含测试，并且安全相关 PR 得到了明确标注和优先级提升。短期风险主要集中在开放 PR 较多、功能线并行推进，可能带来评审压力和合并顺序管理成本。  
建议维护者优先处理 **安全边界、provider 可用性、模型 catalog 正确性、附件上传链路** 四类问题，以保障下一版本的稳定性和用户信任。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
日期：2026-09-30  
仓库：NousResearch/hermes-agent

---

## 1. 今日速览

Hermes Agent 今日活跃度非常高：过去 24 小时新增或更新 **50 条 Issues**、**50 条 Pull Requests**，但 **无 Issue 关闭、无 PR 合并、无新版本发布**，说明社区反馈和修复提交密集涌入，但维护端尚未完成收敛。  
今日问题集中在 **桌面端会话状态、安装/更新链路、Slack/Discord 网关上下文一致性、本地模型缓存、Windows/macOS 平台稳定性、安全 CI 流程** 等方向。  
P0/P1 级问题不少，尤其是 Slack/Discord slash command 导致 prompt pins 翻转、本地模型 follow-up 重新 prefill、Windows 安装器启动卡死等，显示项目当前处于快速迭代但稳定性压力较大的阶段。  
与此同时，多个 fix PR 已经在当天提出，覆盖 PTY 泄漏、插件依赖锁、CI 安全、OpenAI ChatGPT 登录、Claude 原生视觉、Git 代理等问题，说明社区和维护者响应速度较快，但需要尽快完成评审合并以降低积压风险。

---

## 2. 版本发布

今日无新版本发布。  
最新 Releases 数据为空，因此暂无破坏性变更、迁移说明或版本更新内容。

---

## 3. 项目进展

今日没有合并或关闭的 PR，因此严格意义上项目主干尚未产生已落地进展。不过，过去 24 小时内新增了多项针对高优先级问题的修复 PR，显示出明显的修复方向。

### 重点待合并 PR

1. **修复桌面端 PTY 泄漏**
   - PR：[#128943 fix(desktop): reap terminal PTYs after renderer crashes](NousResearch/hermes-agent PR #128943)
   - 关联 Issue：[#128942](NousResearch/hermes-agent Issue #128942)
   - 价值：针对 macOS 桌面端 renderer 崩溃后未清理 embedded terminal PTY，最终导致系统无法分配 PTY、终端类应用全部失效的问题。
   - 状态：OPEN，WIP。

2. **修复插件 enable 依赖锁失败**
   - PR：[#128941 fix(pm): allow compatible resvg releases during plugin locks](NousResearch/hermes-agent PR #128941)
   - 关联 Issue：[#128937](NousResearch/hermes-agent Issue #128937)
   - 价值：放宽 `resvg-py` 精确版本锁，避免 `uv` 因包元数据缺失阻塞所有插件启用。
   - 状态：OPEN，WIP。

3. **修复构建依赖 receipt 失效导致 update 循环失败**
   - PR：[#128946 fix(build): refuse a completed-install receipt whose packages lost their manifests](NousResearch/hermes-agent PR #128946)
   - 关联 Issue：[#128935](NousResearch/hermes-agent Issue #128935)
   - 价值：解决 `node_modules/.hermes-node-deps` receipt 存在但依赖实际残缺时，`hermes update` 错误跳过 `npm ci`，导致前端构建持续失败的问题。
   - 状态：OPEN。

4. **修复 API session stream 缺少 subagent 生命周期事件**
   - PR：[#128944 fix(api): forward subagent lifecycle events on session streams](NousResearch/hermes-agent PR #128944)
   - 关联 Issue：[#128936](NousResearch/hermes-agent Issue #128936)
   - 价值：让 `/api/sessions/{id}/chat/stream` 与 `/v1/runs` 在 subagent 生命周期事件上保持一致，对第三方客户端集成很重要。
   - 状态：OPEN，WIP。

5. **新增官方 Sign in with ChatGPT provider**
   - PR：[#128926 feat(openai): add official Sign in with ChatGPT plan provider](NousResearch/hermes-agent PR #128926)
   - 关联 Issue：[#128880](NousResearch/hermes-agent Issue #128880)
   - 价值：支持通过 OpenAI 官方 SIWC 授权流程使用 ChatGPT plan allowance，而不再仅依赖 Codex 路径。
   - 状态：OPEN。

6. **修复 CI 安全边界**
   - PR：[#128933 fix(ci): require human review on autofix bot PRs and re-vet the patch on the privileged side](NousResearch/hermes-agent PR #128933)
   - 关联 Issue：[#128931](NousResearch/hermes-agent Issue #128931)
   - 价值：阻止 `js-autofix` 工作流在没有人工审核的情况下自动合并由不受信任 job 自检的 bot 输出。
   - 状态：OPEN。

7. **修复 history-check 永远无法拒绝的问题**
   - PR：[#128932 fix(ci): run the unrelated-histories gate against the PR head](NousResearch/hermes-agent PR #128932)
   - 关联 Issue：[#128930](NousResearch/hermes-agent Issue #128930)
   - 价值：让 unrelated histories 检查真正针对 PR head，而不是 pull_request merge ref。
   - 状态：OPEN。

整体判断：今日项目“修复供给”充足，但“合并落地”为零。短期健康度取决于这些高优先级 PR 是否能快速评审并合入。

---

## 4. 社区热点

### 1. `hermes doctor --live` 浏览器检测误报

- Issue：[#128759 [Bug]: `hermes doctor --live` falsely fails Browser when agent-browser works but Python Playwright extra is absent](NousResearch/hermes-agent Issue #128759)
- 评论数：5，今日最高。
- 标签：`type/bug`, `comp/cli`, `tool/browser`, `P2`
- 核心诉求：用户在 PM-managed 安装中启用了 Browser tool，`agent-browser` 实际可用，但 `hermes doctor --live` 因 Python Playwright extra 缺失而误报 Browser 不可用。
- 背后信号：诊断命令当前可能过度绑定某一实现细节，而不是检测实际配置的 browser backend。这会削弱用户对 doctor 检测结果的信任。

### 2. 本地模型 follow-up turns 重复 prefill

- Issue：[#128817 [Bug]: Follow-up turns re-prefill because tool schemas change between turns](NousResearch/hermes-agent Issue #128817)
- 评论数：3
- 标签：`type/bug`, `comp/agent`, `tool/mcp`, `P0`, `area/local-models`
- 核心诉求：在同一 CLI session 中，后续对话本应复用上下文缓存，但因为 tool schemas 在 turn 之间变化，导致整个 prompt 被重新 prefill。
- 背后信号：这直接影响本地 OpenAI-compatible server 的交互延迟和可用性。Issue 描述中首轮 `ping` 约 53 秒，后续 `ping` 仍然触发昂贵 prefill，属于高性能成本问题。

### 3. Slack slash-command 丢失 channel prompt/source names

- Issue：[#128720 [Bug]: Slack slash-command turns drop the channel prompt and source names](NousResearch/hermes-agent Issue #128720)
- 评论数：2
- 标签：`type/bug`, `comp/plugins`, `platform/slack`, `P0`
- 核心诉求：Slack slash command 与普通 Slack 消息进入 gateway 的元数据不一致，缺少 channel prompt 和 source names，导致 pinned session-context prompt 被翻转。
- 背后信号：企业/团队协作场景依赖平台上下文一致性，该类问题可能让同一 channel 中的 bot 行为出现不稳定甚至错误身份/技能上下文。

### 4. Desktop `/context` 总是返回 “No active agent”

- Issue：[#128874 [Bug]: Desktop /context always answers "No active agent"](NousResearch/hermes-agent Issue #128874)
- 评论数：1
- 标签：`type/bug`, `comp/tui`, `comp/desktop`, `area/sessions`, `P2`
- 核心诉求：桌面端已有活跃 agent 正在 streaming，但 slash worker 未初始化 `HermesCLI.agent`，导致 `/context` 等 live slash output 命令误判无 active agent。
- 背后信号：桌面端与 TUI/CLI 共享逻辑时，session lease 和 agent ownership 边界仍存在架构性不一致。

### 5. Windows 安装器 Launch 卡死

- Issue：[#128804 [Bug]: Windows Hermes-Setup.exe intermittently hangs on Launch](NousResearch/hermes-agent Issue #128804)
- 评论数：1
- 标签：`type/bug`, `comp/cli`, `comp/desktop`, `platform/windows`, `P1`
- 核心诉求：Windows 安装器 bootstrap 成功后，点击 Launch 时 `invoke('launch_hermes_desktop')` 不返回，也未启动 `Hermes.exe`。
- 背后信号：安装成功后的首次启动体验存在不确定性，对新用户转化影响较大。

---

## 5. Bug 与稳定性

以下按严重程度和影响范围排列。

### P0：高风险 / 上下文错误 / 性能灾难

1. **本地模型 follow-up turns 重新 prefill**
   - Issue：[#128817](NousResearch/hermes-agent Issue #128817)
   - 影响：本地模型会话延迟显著增加，缓存收益消失。
   - 可能原因：tool schemas 在 turns 之间变化，破坏 prompt cache。
   - Fix PR：暂无明确关联 PR。

2. **Slack slash-command 丢失 channel prompt/source names**
   - Issue：[#128720](NousResearch/hermes-agent Issue #128720)
   - 影响：Slack slash command 与普通消息的上下文不一致，可能导致错误 prompt pin。
   - Fix PR：暂无明确关联 PR。

3. **Discord relayed slash commands/buttons 使用 raw username 且缺少 chat labels**
   - Issue：[#128796](NousResearch/hermes-agent Issue #128796)
   - 影响：Discord relay 场景中 session-context prompt 可能被翻转。
   - Fix PR：暂无明确关联 PR。

4. **Discord slash/thread/voice input 丢失 channel skill**
   - Issue：[#128787](NousResearch/hermes-agent Issue #128787)
   - 影响：Discord 多入口触发时无法保持 channel skill bindings，严重影响平台插件一致性。
   - Fix PR：暂无明确关联 PR。

### P1：安装/启动关键路径问题

1. **Windows 安装器 Launch 间歇性卡死**
   - Issue：[#128804](NousResearch/hermes-agent Issue #128804)
   - 影响：首次安装后无法启动桌面端，且无 `Hermes.exe` 进程。
   - Fix PR：暂无明确关联 PR。

### P2：会话、桌面端、工具链稳定性

1. **macOS 桌面端 PTY 泄漏导致系统无法分配 PTY**
   - Issue：[#128942](NousResearch/hermes-agent Issue #128942)
   - Fix PR：[#128943](NousResearch/hermes-agent PR #128943)
   - 影响：Hermes app 泄漏 `/dev/ptmx` handles，最终导致 Terminal/iTerm 等所有终端应用报 `openpty: Device not configured`。
   - 风险：虽然标 P2，但实际系统级影响较大，建议优先评审。

2. **Desktop first message silently dropped**
   - Issues：
     - [#128867](NousResearch/hermes-agent Issue #128867)
     - [#128869](NousResearch/hermes-agent Issue #128869)
   - 影响：桌面端新会话首条消息丢失，Windows 场景复现；可能是 #63574 修复后的回归或残留路径。
   - Fix PR：暂无明确关联 PR。

3. **Desktop duplicate assistant reply**
   - Issue：[#128870](NousResearch/hermes-agent Issue #128870)
   - 影响：同一 assistant turn 在 UI 中渲染两次。Issue 提供 frame-level evidence，倾向于前端 streaming bubble 未被 replacement。
   - Fix PR：暂无明确关联 PR。

4. **Desktop `/context` 总是 No active agent**
   - Issue：[#128874](NousResearch/hermes-agent Issue #128874)
   - 影响：桌面端 live slash command 功能失效。
   - Fix PR：暂无明确关联 PR。

5. **`/voice status` 安装依赖时阻塞 CLI/TUI 并造成 VM 级 CPU/I/O 压力**
   - Issue：[#128810](NousResearch/hermes-agent Issue #128810)
   - 影响：CLI/TUI 不可用，事件循环出现 131–281 秒 stall。
   - Fix PR：暂无明确关联 PR。

6. **压缩后的 tool-result summary 丢失 persisted-output path**
   - Issue：[#128786](NousResearch/hermes-agent Issue #128786)
   - 影响：大输出被持久化后，context compressor 摘要丢失路径，用户后续无法找回完整工具输出。
   - Fix PR：暂无明确关联 PR。

7. **Claude 模型图片未作为 native vision content 发送**
   - Issue：[#128928](NousResearch/hermes-agent Issue #128928)
   - Fix PR：[#128938](NousResearch/hermes-agent PR #128938)
   - 影响：Claude 视觉模型能力未被正确识别，可能 fallback 到文本路径。
   - 备注：同一 Issue 还包含越南语 UI 语言请求。

### P2/P3：安装、更新、依赖、配置问题

1. **PM-built install environments 缺失 locales**
   - Issue：[#128799](NousResearch/hermes-agent Issue #128799)
   - 影响：所有翻译字符串显示为 raw key，例如 `gateway.status.header`。
   - 相关 PR：[#128923](NousResearch/hermes-agent PR #128923) 主要优化 i18n catalog parsing，但不一定直接解决缺失 locales 打包问题。

2. **`hermes update` 因 stale `.hermes-node-deps` receipt 反复失败**
   - Issue：[#128935](NousResearch/hermes-agent Issue #128935)
   - Fix PR：[#128946](NousResearch/hermes-agent PR #128946)
   - 影响：桌面端无法重建，持续提示“应用版本过旧”。

3. **Windows + China proxy 下 `hermes update` partial clone 失败且错误不可操作**
   - Issue：[#128915](NousResearch/hermes-agent Issue #128915)
   - Fix PR：[#128922](NousResearch/hermes-agent PR #128922)
   - 影响：内部 Git 调用未保留用户代理/TLS 配置，导致更新失败。
   - PR 目标：保留 `http.proxy`, `https.proxy`, `http.sslBackend`, `http.schannelUseSSLCAInfo` 等配置。

4. **PM-managed install updater 永久拒绝、pm subcommands 崩溃、delivery children 使用 bare tools python**
   - Issue：[#128876](NousResearch/hermes-agent Issue #128876)
   - 影响：PM workspace/source root 分裂导致多个安装更新路径故障。
   - Fix PR：暂无明确关联 PR。

5. **插件 enable 被 `resvg-py==0.4.0` 元数据问题阻塞**
   - Issue：[#128937](NousResearch/hermes-agent Issue #128937)
   - Fix PR：[#128941](NousResearch/hermes-agent PR #128941)
   - 影响：可能阻塞所有插件启用。

6. **MiniMax-M2.7 auxiliary client 404**
   - Issue：[#128830](NousResearch/hermes-agent Issue #128830)
   - 影响：compression、title_generation、approval 等辅助任务在 `minimax-cn` provider 下返回 404。
   - Fix PR：暂无明确关联 PR。

### P3：安全与自动化

1. **`js-autofix` 可自动合并未经可信侧复核的 bot 输出**
   - Issue：[#128931](NousResearch/hermes-agent Issue #128931)
   - Fix PR：[#128933](NousResearch/hermes-agent PR #128933)
   - 影响：CI 安全边界不足，可能让自动修复内容无人工审核进入 main。

2. **history-check 永远无法拒绝 unrelated histories**
   - Issue：[#128930](NousResearch/hermes-agent Issue #128930)
   - Fix PR：[#128932](NousResearch/hermes-agent PR #128932)
   - 影响：工作流检查逻辑目标错误，安全门禁形同虚设。

---

## 6. 功能请求与路线图信号

### 1. 官方 Sign in with ChatGPT plan 支持

- Issue：[#128880 feat: support official Sign in with ChatGPT plan usage alongside Codex](NousResearch/hermes-agent Issue #128880)
- PR：[#128926 feat(openai): add official Sign in with ChatGPT plan provider](NousResearch/hermes-agent PR #128926)
- 信号强度：高。
- 判断：已有实现 PR，且覆盖 auth/provider/CLI/plugins 等组件，较可能进入后续版本。
- 用户诉求：通过 OpenAI 官方 SIWC flow 使用 ChatGPT plan allowance，而不是依赖 Codex 方案。

### 2. Delegation observability for external API clients

- Issue：[#128936](NousResearch/hermes-agent Issue #128936)
- PR：[#128944](NousResearch/hermes-agent PR #128944)
- 信号强度：高。
- 判断：已有 WIP PR 先支持 `subagent.start` / `subagent.complete`，说明该方向已被采纳。
- 用户诉求：第三方桌面客户端通过 HTTP/SSE 集成 Hermes 时，需要观察 subagent 生命周期与 child transcript。

### 3. JEV Router 自动触发 MoA

- Issue：[#128947 [Feature]: Extend JEV Router to Auto-Trigger MoA for High-Complexity Tasks](NousResearch/hermes-agent Issue #128947)
- 信号强度：中。
- 用户诉求：对复杂任务自动启用 Mixture-of-Agents，提升深度代码审查、跨文档一致性验证、安全审计的质量。
- 当前状态：暂无对应 PR，仍处早期路线图提案阶段。

### 4. 背景 memory/skills review 改为“有学习信号才运行”

- Issue：[#128884 [Feature]: Run the background review when something was learned](NousResearch/hermes-agent Issue #128884)
- 信号强度：中。
- 用户诉求：当前 background review 按固定间隔触发，容易在没有新信息时浪费资源；希望根据用户或工作中是否产生可学习内容来触发。
- 当前状态：暂无对应 PR。

### 5. 越南语 UI 支持

- Issue：[#128928](NousResearch/hermes-agent Issue #128928)
- 信号强度：中低。
- 用户诉求：在 Desktop 设置中增加 Vietnamese / `vi` UI language。
- 备注：该 Issue 同时包含 Claude 视觉 bug；其中视觉修复已有 PR [#128938](NousResearch/hermes-agent PR #128938)，但越南语本地化暂无明确 PR。

### 6. Computer use 剪贴板读写能力

- PR：[#128939 [ci-reviewed] computer_use can read and write the system clipboard](NousResearch/hermes-agent PR #128939)
- 信号强度：高。
- 用户价值：`computer_use` 不再只能通过逐键输入传递文本，可以读写系统剪贴板，支持文本、图片、文件。
- 风险点：涉及系统剪贴板权限与安全边界，需重点审查。

### 7. Onboarding 状态后端化

- PR：[#128929 Onboarding state lives in the backend](NousResearch/hermes-agent PR #128929)
- 信号强度：中高。
- 用户价值：first-run guide、失败启动计数、setup chat 发放由后端统一控制，降低前端状态漂移。
- 备注：基于 `onboarding/next` 集成分支，可能不会立即进 main。

---

## 7. 用户反馈摘要

1. **用户对安装/更新链路容错不满**
   - 代表 Issue：
     - [#128935](NousResearch/hermes-agent Issue #128935)
     - [#128915](NousResearch/hermes-agent Issue #128915)
     - [#128876](NousResearch/hermes-agent Issue #128876)
     - [#128804](NousResearch/hermes-agent Issue #128804)
   - 真实痛点：用户不只是遇到失败，还遇到“每次 update 都失败”“错误信息不可操作”“安装成功但无法启动”等阻断性体验。
   - 场景：Windows、macOS PM-managed install、中国代理网络、桌面端自动更新。

2. **桌面端会话状态仍存在明显不一致**
   - 代表 Issue：
     - [#128867](NousResearch/hermes-agent Issue #128867)
     - [#128869](NousResearch/hermes-agent Issue #128869)
     - [#128870](NousResearch/hermes-agent Issue #128870)
     - [#128874](NousResearch/hermes-agent Issue #128874)
   - 真实痛点：新会话首条消息丢失、assistant 回复重复、slash command 误判无 active agent，这些问题会让用户认为“消息系统不可信”。
   - 影响：对日常聊天、长会话和桌面端主入口体验伤害较大。

3. **平台集成用户非常关注上下文一致性**
   - 代表 Issue：
     - Slack [#128720](NousResearch/hermes-agent Issue #128720)
     - Discord [#128796](NousResearch/hermes-agent Issue #128796)
     - Discord [#128787](NousResearch/hermes-agent Issue #128787)
   - 真实痛点：slash command、buttons、thread、voice input 与普通消息的元数据不一致，导致 prompt/skill/session context 发生漂移。
   - 场景：团队协作机器人、频道绑定技能、跨消息源 relay。

4. **本地模型用户对缓存性能非常敏感**
   - 代表 Issue：[#128817](NousResearch/hermes-agent Issue #128817)
   - 真实痛点：follow-up turn 重新 prefill 让本地模型交互成本过高，尤其是长上下文或工具 schema 多的 session。
   - 健康度信号：该 Issue 标 P0，说明维护者也认为这是关键路径问题。

5. **高级用户开始推动更强的 API 和 agent 可观测性**
   - 代表 Issue：[#128936](NousResearch/hermes-agent Issue #128936)
   - 对应 PR：[#128944](NousResearch/hermes-agent PR #128944)
   - 真实痛点：第三方客户端需要知道 subagent 何时开始、结束、输出在哪里，否则无法提供接近官方 UI 的体验。
   - 路线图含义：Hermes Agent 正被用于外部客户端和深度集成场景，而不仅是官方 CLI/Desktop。

6. **安全社区正在审查 CI/workflow 边界**
   - 代表 Issue：
     - [#128931](NousResearch/hermes-agent Issue #128931)
     - [#128930](NousResearch/hermes-agent Issue #128930)
   - 对应 PR：
     - [#128933](NousResearch/hermes-agent PR #128933)
     - [#128932](NousResearch/hermes-agent PR #128932)
   - 真实痛点：自动化修复与历史检查工作流存在“看似有门禁，实际无效”的风险。

---

## 8. 待处理积压

由于本日报数据仅覆盖过去 24 小时，无法可靠判断“长期未响应”的历史积压。不过，从今日数据看，以下开放项需要维护者优先 triage 或合并：

### 最高优先级待处理

1. **P0 本地模型缓存失效**
   - Issue：[#128817](NousResearch/hermes-agent Issue #128817)
   - 原因：直接影响本地模型性能与交互可用性。
   - 当前缺口：暂无对应 fix PR。

2. **P0 Slack/Discord prompt pin 翻转系列**
   - Issues：
     - [#128720](NousResearch/hermes-agent Issue #128720)
     - [#128796](NousResearch/hermes-agent Issue #128796)
     - [#128787](NousResearch/hermes-agent Issue #128787)
   - 原因：平台集成上下文不一致，影响团队协作场景可靠性。
   - 当前缺口：暂无明确 fix PR。

3. **P1 Windows 安装器 Launch 卡死**
   - Issue：[#128804](NousResearch/hermes-agent Issue #128804)
   - 原因：影响新用户首次启动。
   - 当前缺口：暂无明确 fix PR。

4. **macOS PTY 泄漏**
   - Issue：[#128942](NousResearch/hermes-agent Issue #128942)
   - PR：[#128943](NousResearch/hermes-agent PR #128943)
   - 建议：尽快评审，因为该问题可影响整个系统终端能力。

5. **更新链路相关 PR 批量待合并**
   - PR：
     - [#128946](NousResearch/hermes-agent PR #128946)
     - [#128922](NousResearch/hermes-agent PR #128922)
     - [#128920](NousResearch/hermes-agent PR #128920)
     - [#128919](NousResearch/hermes-agent PR #128919)
   - 原因：安装/更新问题高度集中，是今日最明显的稳定性主题之一。

6. **CI 安全修复待合并**
   - PR：
     - [#128933](NousResearch/hermes-agent PR #128933)
     - [#128932](NousResearch/hermes-agent PR #128932)
   - 原因：涉及 main 分支保护和自动化安全边界，建议优先 review。

7. **API subagent observability**
   - Issue：[#128936](NousResearch/hermes-agent Issue #128936)
   - PR：[#128944](NousResearch/hermes-agent PR #128944)
   - 原因：对第三方客户端生态具有放大效应，且已有 WIP 实现。

---

## 总体健康度评估

- **社区活跃度：高**  
  24 小时内 100 条 Issue/PR 更新，说明用户基数和贡献者活跃度强。

- **维护响应：中高**  
  多个问题当天即出现 fix PR，尤其是 PTY、插件锁、CI 安全、OpenAI SIWC、Claude vision、Git proxy 等。

- **稳定性压力：高**  
  P0/P1/P2 问题数量较多，且集中在安装更新、桌面端会话、平台 adapter、上下文缓存等核心路径。

- **发布节奏：暂未体现**  
  今日无 release、无 merge、无 close。若开放 PR 在短期内无法合入，积压和重复报告风险会上升。

- **建议维护重点**  
  先处理 P0 上下文/缓存问题与 P1 安装启动问题，再批量合并已有明确修复 PR，尤其是 [#128943](NousResearch/hermes-agent PR #128943)、[#128946](NousResearch/hermes-agent PR #128946)、[#128941](NousResearch/hermes-agent PR #128941)、[#128933](NousResearch/hermes-agent PR #128933)、[#128932](NousResearch/hermes-agent PR #128932)。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报  
**日期：2026-09-30**  
**仓库：sipeed/picoclaw**

---

## 1. 今日速览

过去 24 小时，PicoClaw 社区活跃度较高，集中在 **Web UI 交互可靠性、Agent 忙碌状态反馈、消息队列可见性、失败回合可见性** 等用户体验与稳定性问题上。今日新增/活跃 Issues 共 **4 条**，均处于 Open 状态；Pull Requests 更新 **3 条**，全部为待合并状态，暂无合并或关闭记录。

从内容来看，当前项目的主要矛盾不是核心能力缺失，而是 **AI Agent 长时间运行、后台任务、Web UI 会话管理和消息投递状态不透明** 所带来的使用信任问题。多条 Issue 与 PR 之间存在明显对应关系，说明维护者或贡献者已经开始围绕近期用户反馈快速补齐 Web UI 的状态反馈与错误展示能力。

整体健康度评估：**活跃度良好，问题响应方向明确，但短期内稳定性与可观测性仍是主要风险点**。若今日的 3 个 PR 能尽快评审合并，将显著改善用户在 Web UI 中与 Agent 交互时的可预期性。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日没有已合并或已关闭的 PR，因此代码层面尚无正式落地进展。不过，有 3 个新的待合并 PR 与近期 Issue 高度相关，代表项目正在推进以下方向：

### 待合并 PR

#### #3412 fix(agent): make a failed turn visible to the user  
链接：sipeed/picoclaw PR #3412  
状态：Open  
作者：racso2609  

该 PR 试图解决一个关键可用性问题：当一次 Agent turn 执行失败且未产生回复时，用户当前只能看到“沉默”，难以判断是仍在运行、已失败，还是消息丢失。PR 描述指出，错误通知本身已经生成，但在输出链路中被多个环节丢弃或抑制。

**推进意义：**
- 提升失败场景下的透明度；
- 降低用户误判“系统卡死”的概率；
- 对 Agent 型产品而言，这是稳定性体验的重要补强。

---

#### #3411 feat(web): honest, state-driven working indicator  
链接：sipeed/picoclaw PR #3411  
状态：Open  
作者：racso2609  

该 PR 对应 Issue #3406 的第一部分，目标是将 Web UI 中目前基于固定文案轮播的“thinking”提示，替换为更真实、状态驱动的工作指示器。

**推进意义：**
- 改善用户对 Agent 当前状态的判断；
- 减少“它到底是否还在工作”的不确定感；
- 是 Web UI 从演示型界面向日常可用界面演进的重要一步。

---

#### #3410 fix(pico/web): surface steering queue state so queued/dropped messages are no longer invisible  
链接：sipeed/picoclaw PR #3410  
状态：Open  
作者：racso2609  

该 PR 对应 Issue #3408，聚焦 Web UI 中当 Agent 忙碌时，用户新发送的消息会进入 steering queue，但此前成功入队没有确认，队列满时也没有反馈，导致用户以为消息“消失”。

**推进意义：**
- 解决消息排队与丢弃不可见的问题；
- 提升 Web UI 在多轮输入、长任务交互中的可信度；
- 对长时间运行 Agent 场景非常关键。

---

## 4. 社区热点

今日讨论热度主要集中在 Web UI 的“状态透明度”问题。虽然各 Issue 评论数不高，但多个问题高度相关，形成了清晰的产品改进主题。

### #3408 Web UI: 忙碌时消息被隐式排队，队列满后静默丢弃  
链接：sipeed/picoclaw Issue #3408  
状态：Open  
评论数：1  
作者：racso2609  

**核心诉求：**
用户在 Agent 正在处理上一轮时继续发送消息，这些消息不会显示在聊天窗口中，而是作为 steering input 被排队。如果队列已满，消息会被静默丢弃，没有任何 UI 反馈。

**背后反映的问题：**
- 用户无法判断消息是否被系统接收；
- “聊天窗口”与“控制/steering 队列”的语义不一致；
- 对需要连续指令、实时纠偏的 Agent 使用场景影响较大。

**相关 PR：**
- #3410 fix(pico/web): surface steering queue state so queued/dropped messages are no longer invisible  
  链接：sipeed/picoclaw PR #3410

---

### #3406 Web UI: 更清晰的工作状态、手动/频道会话分离、更丰富的会话列表与归档  
链接：sipeed/picoclaw Issue #3406  
状态：Open  
评论数：0  
作者：racso2609  

**核心诉求：**
该 Issue 更像一个 Web UI 产品体验路线图，提出了三类问题：
1. Agent 是否仍在思考不够清晰；
2. 手动会话与 channel/session 语义可能混杂；
3. 会话列表需要更丰富的信息与归档能力。

**背后反映的问题：**
Web UI 已经成为日常使用 PicoClaw 的主要入口，但当前界面仍缺少成熟聊天/Agent 产品所需的状态、历史与会话管理能力。

**相关 PR：**
- #3411 feat(web): honest, state-driven working indicator  
  链接：sipeed/picoclaw PR #3411

---

### #3407 Web UI: 模型仍在思考时，会话从列表中消失  
链接：sipeed/picoclaw Issue #3407  
状态：Open  
评论数：1  
作者：racso2609  

**核心诉求：**
新建会话在模型仍在运行时，可能从历史会话列表中消失，形成“ghost session”。用户仍在当前聊天页中，但无法通过历史列表重新进入该会话。

**背后反映的问题：**
- 会话状态持久化或列表刷新逻辑可能存在一致性问题；
- 长任务执行期间，会话生命周期展示不稳定；
- 用户对历史记录可靠性的信任会受到影响。

---

### #3409 调度原语被当作后台 subagent 等待机制，触发不期望的 autonomous-loop tick  
链接：sipeed/picoclaw Issue #3409  
状态：Open  
评论数：1  
作者：rogeriomarino2014-ship-it  

**核心诉求：**
在 subagent-driven development 场景中，Agent 使用 `ScheduleWakeup` 或 cron-style wakeup 作为短延迟等待机制，以便轮询后台 subagent 完成情况。但该调度行为会触发额外的 autonomous-loop tick，产生副作用。

**背后反映的问题：**
- 当前调度原语同时承担“等待/轮询”和“自主循环唤醒”语义；
- 背景 subagent 协作需要更专门的等待机制；
- Agent 编排层需要更清晰的执行控制模型。

---

## 5. Bug 与稳定性

以下按严重程度与用户影响范围排序。

### 高优先级：消息排队不可见且队列满时静默丢弃  
Issue：#3408  
链接：sipeed/picoclaw Issue #3408  
状态：Open  
影响范围：Web UI、Agent 忙碌时多轮输入、steering input  
是否已有 fix PR：有，#3410  
链接：sipeed/picoclaw PR #3410  

**问题描述：**
当 Agent 正在处理当前 turn 时，用户发送的新消息不会出现在聊天中，而是被放入 steering queue。若队列已满，消息会被丢弃且没有提示。

**稳定性影响：**
这会造成用户输入不可追踪，属于较严重的交互可靠性问题。对于需要持续纠偏、插入新指令或观察 Agent 状态的工作流，影响明显。

---

### 高优先级：失败 turn 对用户不可见  
PR：#3412  
链接：sipeed/picoclaw PR #3412  
状态：Open  
对应 Issue：数据中未提供明确 Issue 编号  

**问题描述：**
当 Agent 的一次执行失败且没有产生回复时，错误通知虽然在内部生成，但未能正确展示给用户，导致前端表现为“无响应”。

**稳定性影响：**
失败不可见会放大用户对系统卡死、丢消息或后端无响应的误判，是 Agent 产品中非常影响信任感的问题。

**修复进展：**
已有 PR #3412 待评审合并。

---

### 中高优先级：会话在模型思考时从列表中消失  
Issue：#3407  
链接：sipeed/picoclaw Issue #3407  
状态：Open  
是否已有 fix PR：当前数据中未看到直接对应 PR  

**问题描述：**
模型仍在运行时，新建会话可能从会话列表消失。用户仍处在该会话页面，但无法从历史列表中再次访问。

**稳定性影响：**
该问题影响会话持久性与用户对历史记录的信任。若用户刷新页面或离开当前界面，可能无法找回该会话。

---

### 中优先级：调度原语作为等待机制时触发意外 autonomous-loop tick  
Issue：#3409  
链接：sipeed/picoclaw Issue #3409  
状态：Open  
是否已有 fix PR：当前数据中未看到对应 PR  

**问题描述：**
后台 subagent 场景中，Agent 将调度唤醒能力用作等待/轮询机制，但该行为会触发不期望的 autonomous-loop tick。

**稳定性影响：**
这可能导致额外执行、状态推进或非预期的 autonomous 行为。对于复杂多 Agent 编排场景，该问题可能引入隐性副作用。

---

### 中优先级：Web UI 工作状态提示不真实  
Issue：#3406  
链接：sipeed/picoclaw Issue #3406  
状态：Open  
是否已有 fix PR：部分已有，#3411  
链接：sipeed/picoclaw PR #3411  

**问题描述：**
当前 Web UI 使用固定轮播文案与动画展示“thinking”状态，但无法真实反映 Agent 的实际状态。

**稳定性影响：**
严格来说这是 UX 问题，但在长任务 Agent 场景下，状态提示不准确会被用户感知为稳定性问题。

---

## 6. 功能请求与路线图信号

### 1. Web UI 状态驱动的工作指示器  
Issue：#3406  
链接：sipeed/picoclaw Issue #3406  
相关 PR：#3411  
链接：sipeed/picoclaw PR #3411  

**路线图信号：**
该功能很可能进入近期版本，因为已经有对应 PR，并且 PR 明确表示是 #3406 的 “part 1”。这意味着 Web UI 的工作状态展示可能会被分阶段改造。

---

### 2. Steering queue / events surface  
Issue：#3408  
链接：sipeed/picoclaw Issue #3408  
相关 PR：#3410  
链接：sipeed/picoclaw PR #3410  

**路线图信号：**
该能力同样具备较强落地可能性。PR 已经针对排队成功、队列满、消息不可见等问题做修复，说明维护方向是将内部事件或队列状态暴露给前端。

**潜在后续方向：**
- 在 UI 中展示“已排队”状态；
- 队列满时提示用户；
- 区分普通聊天消息与 steering input；
- 提供事件流或调试面板。

---

### 3. 会话列表增强与归档  
Issue：#3406  
链接：sipeed/picoclaw Issue #3406  

**路线图信号：**
该需求目前尚未看到直接 PR，但在 #3406 中被明确提出。考虑到 Web UI 已成为日常使用入口，会话管理增强可能会成为后续重点。

**可能包含：**
- 更清晰区分手动会话与 channel session；
- 会话列表展示更丰富的状态与摘要；
- 支持归档；
- 避免会话被临时状态或后台任务影响而“消失”。

---

### 4. Background subagent 等待机制  
Issue：#3409  
链接：sipeed/picoclaw Issue #3409  

**路线图信号：**
该需求反映了 PicoClaw 在多 Agent / subagent 编排场景中的进阶使用需求。虽然目前没有对应 PR，但它可能推动调度系统或 Agent runtime 增加更明确的等待/轮询原语。

**潜在设计方向：**
- 区分 wakeup 与 wait；
- 为 subagent completion 提供事件驱动通知；
- 避免用 cron-style scheduling 模拟短等待；
- 降低 autonomous-loop 被误触发的风险。

---

## 7. 用户反馈摘要

今日用户反馈主要集中在以下几个痛点：

### 1. “我发出的消息到底有没有被接收？”
相关 Issue：#3408  
链接：sipeed/picoclaw Issue #3408  

用户在 Agent 忙碌时发送消息，但消息没有出现在聊天记录中，也没有“已排队”提示。若队列满还会被静默丢弃。这类体验会直接削弱用户对系统可靠性的信任。

---

### 2. “它还在思考，还是已经失败了？”
相关 Issue：#3406  
链接：sipeed/picoclaw Issue #3406  
相关 PR：#3411、#3412  
链接：sipeed/picoclaw PR #3411  
链接：sipeed/picoclaw PR #3412  

用户需要真实状态，而不是通用 spinner 或固定“thinking”文案。长时间运行的 Agent 如果没有明确状态，会让用户无法判断是否需要等待、重试或中断。

---

### 3. “我的会话为什么不见了？”
相关 Issue：#3407  
链接：sipeed/picoclaw Issue #3407  

会话在模型仍在处理时从列表中消失，造成“ghost session”。这类问题会影响用户对历史记录、任务连续性和 Web UI 会话管理的信任。

---

### 4. “调度能力和等待能力需要分开”
相关 Issue：#3409  
链接：sipeed/picoclaw Issue #3409  

高级用户在 subagent-driven development 中遇到调度语义混用的问题。该反馈说明 PicoClaw 的用户正在探索更复杂的后台 Agent 编排模式，现有 runtime primitives 可能需要更细粒度的控制能力。

---

## 8. 待处理积压

基于今日提供的数据，暂无长期未响应的历史 Issue 或 PR 信息可供判断。当前可见的待处理重点主要是新近打开且尚未合并的 PR 与 Issue：

### 需要优先评审的 PR

1. #3410 fix(pico/web): surface steering queue state so queued/dropped messages are no longer invisible  
   链接：sipeed/picoclaw PR #3410  
   建议优先级：高  
   原因：直接修复消息静默丢弃/不可见问题，对 Web UI 可靠性影响大。

2. #3412 fix(agent): make a failed turn visible to the user  
   链接：sipeed/picoclaw PR #3412  
   建议优先级：高  
   原因：失败不可见会导致用户误判系统卡死，是核心信任问题。

3. #3411 feat(web): honest, state-driven working indicator  
   链接：sipeed/picoclaw PR #3411  
   建议优先级：中高  
   原因：改善状态透明度，并且是 #3406 的第一阶段实现。

---

### 需要维护者进一步 triage 的 Issue

1. #3407 Web UI ghost session  
   链接：sipeed/picoclaw Issue #3407  
   建议优先级：中高  
   原因：影响会话可恢复性与历史记录可信度，目前未见对应 PR。

2. #3409 Scheduling primitive triggers unwanted autonomous-loop tick  
   链接：sipeed/picoclaw Issue #3409  
   建议优先级：中  
   原因：影响高级 subagent 编排场景，可能需要 runtime 设计层面的决策。

3. #3406 Web UI broader UX roadmap  
   链接：sipeed/picoclaw Issue #3406  
   建议优先级：中  
   原因：其中已有部分被 #3411 覆盖，但会话分离、会话列表增强、归档等仍需拆分任务。

---

## 总体判断

PicoClaw 今日的动态显示，项目正在从“功能可用”阶段向“日常可靠使用”阶段推进。Web UI 相关问题集中爆发，但同时也出现了直接对应的修复 PR，说明社区反馈与实现之间的闭环较快。

短期内最值得关注的是：  
- 是否合并 #3410，解决消息队列不可见与静默丢弃；  
- 是否合并 #3412，让失败 turn 能被用户感知；  
- 是否合并 #3411，建立更真实的 Agent 工作状态展示；  
- 是否进一步处理 #3407 的会话消失问题。  

如果这些问题得到解决，PicoClaw 的 Web UI 可信度和 Agent 交互稳定性将有明显提升。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-09-30）

## 1. 今日速览

过去 24 小时，NanoClaw 没有新的 Issue 更新，也没有新版本发布，社区反馈侧相对安静。  
PR 侧保持中等活跃，共有 5 个开放 PR 更新，主要集中在 **Iron Proxy / Iron Gateway、本地模型接入、Provider 端点声明、CI 供应链加固** 等方向。  
今日没有 PR 被合并或关闭，因此项目代码主线尚未实际推进，但待合并队列中出现了多项与稳定性、安全性和本地模型体验相关的重要改动。  
整体来看，项目健康度表现为：**用户反馈低噪音、维护开发持续推进、但合并节奏暂时偏慢**。

---

## 2. 项目进展

今日没有已合并或已关闭的 PR，因此暂无进入主分支的实际变更。

不过，待合并 PR 显示出几个明确推进方向：

### Iron / Proxy / Gateway 能力增强

- [PR #3969 fix(iron-proxy): send a Basic challenge with the front proxy's 407](https://github.com/qwibitai/nanoclaw/pull/3969)  
  状态：Open  
  类型：Bug Fix  
  方向：Iron Proxy、技能交付、代理认证兼容性  
  该 PR 修复 Git 通过 Iron Proxy 拉取时的代理认证问题。当前前置代理在缺失身份时返回裸 `407`，但 Git/libcurl 需要收到 `Proxy-Authenticate` challenge 后才会发送代理凭据。该修复有助于提升通过代理访问 Git 的兼容性。

- [PR #3966 feat(iron): allow a keyless model on this machine over plain HTTP](https://github.com/qwibitai/nanoclaw/pull/3966)  
  状态：Open  
  类型：Feature  
  方向：Iron、本地模型、Provider  
  该 PR 允许同机 keyless model 通过 `http://host.docker.internal:<port>/v1` 使用，仅开放 provider 声明的端口和 OpenAI 推理路由。它指向一个重要路线：更友好地支持本地模型、局域环境和无需 API key 的推理服务。

- [PR #3965 fix(opencode,iron): check the model URL against the selected gateway at the prompt](https://github.com/qwibitai/nanoclaw/pull/3965)  
  状态：Open  
  类型：Bug Fix  
  方向：OpenCode、Iron、本地模型配置体验  
  该 PR 在配置阶段就校验本地模型 URL 是否符合所选 gateway 的规则，避免用户保存一个之后每轮调用都会失败的 URL。它属于配置体验和错误前置化改进。

- [PR #3964 feat(gateway): let a provider declare exact host:port model endpoints](https://github.com/qwibitai/nanoclaw/pull/3964)  
  状态：Open  
  类型：Feature  
  方向：Gateway、Provider、本地模型端点声明  
  允许 provider 声明精确的 `host:port` 模型端点，并由 core 像 model domains 一样自动批准。这可以减少非默认端口模型调用时反复出现 approval card 的问题。

### CI 与供应链安全加固

- [PR #3968 ci: pin workflow actions and cosign, add Dependabot](https://github.com/qwibitai/nanoclaw/pull/3968)  
  状态：Open  
  类型：Hardening  
  方向：CI、安全、容器、仓库维护  
  该 PR 将 GitHub Actions 和 cosign 固定到精确版本，并引入 Dependabot 维护这些 pin。目标是避免上游 tag 变动导致 CI 执行内容发生不可控变化，是供应链安全层面的重要加固。

---

## 3. 社区热点

今日没有 Issue 更新，PR 评论数和反应数均未显示有效活跃数据，因此没有明显的高热讨论线程。

相对值得关注的热点方向如下：

### 本地模型与 Iron Gateway 体验改进

相关 PR：

- [PR #3964 feat(gateway): let a provider declare exact host:port model endpoints](https://github.com/qwibitai/nanoclaw/pull/3964)
- [PR #3965 fix(opencode,iron): check the model URL against the selected gateway at the prompt](https://github.com/qwibitai/nanoclaw/pull/3965)
- [PR #3966 feat(iron): allow a keyless model on this machine over plain HTTP](https://github.com/qwibitai/nanoclaw/pull/3966)

分析：  
这 3 个 PR 都围绕 **本地模型、Provider 配置、Gateway 访问控制** 展开，说明 NanoClaw 正在强化本地推理服务的接入体验。背后的用户诉求可能包括：

- 使用本地 OpenAI-compatible 服务；
- 避免每次调用都触发 approval；
- 在配置阶段尽早发现 URL 或 Gateway 策略不匹配；
- 在 Iron 环境中安全地允许同机 HTTP 模型访问。

### CI 供应链安全

相关 PR：

- [PR #3968 ci: pin workflow actions and cosign, add Dependabot](https://github.com/qwibitai/nanoclaw/pull/3968)

分析：  
该 PR 指向维护者对 CI 可重复性和供应链安全的关注。对于 AI 智能体类项目，CI、容器、签名工具链的稳定性会直接影响发布可信度和贡献者安全。

---

## 4. Bug 与稳定性

今日没有新的 Issue 报告 Bug，但有 2 个开放中的 Bug Fix PR 值得关注。

### 高优先级：Iron Proxy 代理认证兼容性问题

- [PR #3969 fix(iron-proxy): send a Basic challenge with the front proxy's 407](https://github.com/qwibitai/nanoclaw/pull/3969)  
  严重程度：中高  
  状态：已有 Fix PR，待合并  
  影响范围：Git fetch、Iron Proxy、代理认证流程  

问题摘要：  
前置代理在缺失身份时返回裸 `407`，但 Git/libcurl 需要 `Proxy-Authenticate` challenge 才会继续发送代理凭据。这会导致通过 Iron Proxy 执行 Git fetch 时失败。

影响判断：  
该问题对依赖 Git 拉取能力的工作流影响较大，尤其是在代理隔离、容器环境或受控网络中运行 NanoClaw 的用户。

---

### 中优先级：OpenCode / Iron 本地模型 URL 校验时机不佳

- [PR #3965 fix(opencode,iron): check the model URL against the selected gateway at the prompt](https://github.com/qwibitai/nanoclaw/pull/3965)  
  严重程度：中  
  状态：已有 Fix PR，待合并  
  影响范围：OpenCode 设置流程、本地模型配置、Iron Gateway  

问题摘要：  
此前配置流程可能建议或保存一个在 Iron Gateway 下不可用的本地模型 URL，导致之后每轮调用失败。该 PR 将校验前移到 prompt 阶段，并在失败时给出 gateway 的原因。

影响判断：  
这属于典型的配置体验问题。虽然不一定导致系统崩溃，但会造成用户首次接入本地模型时的失败和困惑。

---

## 5. 功能请求与路线图信号

今日没有来自 Issue 的新功能请求，但开放 PR 显示出几个明确路线图信号。

### 本地模型作为一等接入场景

相关 PR：

- [PR #3966 feat(iron): allow a keyless model on this machine over plain HTTP](https://github.com/qwibitai/nanoclaw/pull/3966)
- [PR #3964 feat(gateway): let a provider declare exact host:port model endpoints](https://github.com/qwibitai/nanoclaw/pull/3964)

判断：  
NanoClaw 可能正在将本地模型接入体验提升为更正式的支持场景，包括：

- 允许 keyless local model；
- 支持 plain HTTP 的同机访问；
- 限定访问端口和推理路由；
- 允许 provider 显式声明可信 `host:port` 端点；
- 减少重复 approval。

这很可能进入下一版本或近期迭代，因为相关 PR 已经成组出现，并且覆盖 core、provider、gateway 和 skill 层。

---

### 安全边界与可用性的平衡

相关 PR：

- [PR #3966 feat(iron): allow a keyless model on this machine over plain HTTP](https://github.com/qwibitai/nanoclaw/pull/3966)
- [PR #3964 feat(gateway): let a provider declare exact host:port model endpoints](https://github.com/qwibitai/nanoclaw/pull/3964)

判断：  
这些 PR 并非简单放开本地 HTTP，而是通过 provider 声明、端口限制、OpenAI inference route 限定等方式控制访问范围。这说明项目路线不是单纯提高便利性，而是在可用性和安全边界之间做受控开放。

---

### CI 可重复性和供应链安全将继续加强

相关 PR：

- [PR #3968 ci: pin workflow actions and cosign, add Dependabot](https://github.com/qwibitai/nanoclaw/pull/3968)

判断：  
引入 Dependabot 来维护固定版本，意味着后续可能会出现更多依赖升级 PR。项目维护模式可能从“使用浮动 tag”转向“精确 pin + 自动更新”，这对长期稳定发布是正向信号。

---

## 6. 用户反馈摘要

今日没有新的 Issue 或 Issue 评论数据，因此无法提炼直接用户反馈。

从 PR 摘要间接反映出的用户痛点包括：

1. **通过代理执行 Git 操作不稳定**  
   相关链接：[PR #3969](https://github.com/qwibitai/nanoclaw/pull/3969)  
   用户可能在 Iron Proxy 环境下遇到 Git fetch 无法正确发送代理凭据的问题。

2. **本地模型 URL 配置失败成本高**  
   相关链接：[PR #3965](https://github.com/qwibitai/nanoclaw/pull/3965)  
   现有流程可能让用户保存不可用配置，之后每轮调用都失败，反馈链路过长。

3. **非默认端口模型端点需要反复批准**  
   相关链接：[PR #3964](https://github.com/qwibitai/nanoclaw/pull/3964)  
   本地或自托管模型服务常使用非默认端口，反复 approval 会影响连续使用体验。

4. **希望在本机安全使用无需 API key 的模型服务**  
   相关链接：[PR #3966](https://github.com/qwibitai/nanoclaw/pull/3966)  
   这反映出 NanoClaw 用户可能越来越多地将本地 LLM、OpenAI-compatible server、容器环境结合使用。

---

## 7. 待处理积压

当前数据仅覆盖最近 24 小时，且没有长期 Issue / PR 年龄、最后响应时间、审阅状态等信息，因此无法判断真正意义上的长期积压。

不过，从今日视角看，以下 5 个开放 PR 构成短期待处理队列：

| PR | 类型 | 关注点 | 建议优先级 |
|---|---|---:|---:|
| [#3969](https://github.com/qwibitai/nanoclaw/pull/3969) | Bug Fix | Iron Proxy 代理认证 | 高 |
| [#3965](https://github.com/qwibitai/nanoclaw/pull/3965) | Bug Fix | OpenCode / Iron URL 校验 | 中高 |
| [#3968](https://github.com/qwibitai/nanoclaw/pull/3968) | Hardening | CI pin、cosign、Dependabot | 中高 |
| [#3966](https://github.com/qwibitai/nanoclaw/pull/3966) | Feature | Keyless local model over HTTP | 中 |
| [#3964](https://github.com/qwibitai/nanoclaw/pull/3964) | Feature | Provider 声明 exact host:port | 中 |

维护者建议：

- 优先审阅并合并 [PR #3969](https://github.com/qwibitai/nanoclaw/pull/3969)，因为它直接影响 Git fetch 代理可用性；
- 将 [PR #3964](https://github.com/qwibitai/nanoclaw/pull/3964)、[#3965](https://github.com/qwibitai/nanoclaw/pull/3965)、[#3966](https://github.com/qwibitai/nanoclaw/pull/3966) 作为一组本地模型 / Iron Gateway 体验改进进行联合评审，避免策略不一致；
- 尽快处理 [PR #3968](https://github.com/qwibitai/nanoclaw/pull/3968)，降低 CI 供应链风险，并为后续自动依赖维护打基础。

---

## 总体健康度评估

NanoClaw 今日没有发布和 Issue 活动，但 PR 侧体现出持续维护。当前活跃点集中在 **Iron Gateway、本地模型支持、代理兼容性、供应链安全**，这些都是 AI 智能体和个人 AI 助手项目中较关键的基础能力。  
短期风险主要是 5 个 PR 均处于开放状态，尚未形成合并产出；如果审阅及时，下一轮版本很可能在本地模型接入体验和运行安全性上有明显改善。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报  
**日期：2026-09-30**  
**仓库：** [nullclaw/nullclaw](https://github.com/nullclaw/nullclaw)

---

## 1. 今日速览

过去 24 小时内，NullClaw 仓库仅有 **1 条 Issue 更新**，无 Pull Request 更新，也无新版本发布，整体开发活动处于 **低活跃状态**。  
今日唯一新增议题来自 MemCode 创始人，围绕 NullClaw 的 **memory interface / 可插拔记忆引擎** 提出远程托管记忆后端的集成建议。  
从内容看，这不是 Bug 报告，而是偏产品能力扩展和生态集成方向的功能提案，说明 NullClaw 当前的记忆系统架构已经吸引外部服务方关注。  
由于没有 PR、Release 或维护者回复，今日尚无法判断该提案是否会进入近期路线图。

---

## 3. 项目进展

过去 24 小时内没有新的 Pull Request 创建、合并或关闭。

- **合并 PR：0**
- **关闭 PR：0**
- **待合并 PR：0**
- **功能推进：暂无可确认进展**
- **修复推进：暂无可确认进展**

今日项目代码层面没有可观测变更，因此项目主干功能、稳定性和发布节奏未出现明显推进。

---

## 4. 社区热点

### Issue #1015：Hosted MemCode engine for nullclaw memory interface  
- **状态：** Open  
- **作者：** vivekgupta-memcode  
- **创建时间：** 2026-09-29  
- **评论数：** 0  
- **反应数：** 👍 0  
- **链接：** [https://github.com/nullclaw/nullclaw/issues/1015](https://github.com/nullclaw/nullclaw/issues/1015)

该 Issue 是今日唯一活跃讨论项，主题是为 NullClaw 的 memory interface 增加一个 **Hosted MemCode engine**。提案认为，NullClaw 已经支持多个可替换的 memory engine，并且保持了较小的运行时占用；如果引入远程托管记忆选项，用户可以在不增加本地存储负担的前提下，让部分记忆在多设备之间保持可用。

从诉求上看，这背后反映了 AI 智能体与个人 AI 助手类项目中的一个典型需求：

- 用户希望记忆能力不局限于本地设备；
- 多设备同步和长期记忆可用性开始变得重要；
- 项目需要在本地优先、隐私、安全、可移植性和云端便利性之间做架构取舍；
- 第三方记忆服务商希望通过 NullClaw 的可插拔接口接入生态。

目前该 Issue 尚无评论，也没有维护者反馈，因此热度主要来自其战略方向价值，而非社区互动量。

---

## 5. Bug 与稳定性

过去 24 小时内未发现新的 Bug、崩溃、回归或稳定性问题报告。

| 严重程度 | Issue | 描述 | 是否有修复 PR |
|---|---|---|---|
| - | - | 今日无 Bug 报告 | - |

当前数据中没有显示稳定性风险增加，也没有紧急修复需求。不过，由于今日整体活跃度较低，仅凭 24 小时数据无法全面评估项目长期稳定性。

---

## 6. 功能请求与路线图信号

### 远程托管记忆引擎集成：Hosted MemCode engine  
- **Issue：** [#1015](https://github.com/nullclaw/nullclaw/issues/1015)  
- **类型：** 功能请求 / 第三方集成提案  
- **方向：** Memory engine、跨设备记忆、远程托管存储  
- **当前状态：** Open，暂无维护者回应，暂无关联 PR

该提案释放出一个较明确的路线图信号：NullClaw 的记忆接口可能具备扩展到第三方远程后端的潜力。若该方向被接受，未来可能涉及以下工作：

1. **新增 MemCode memory engine adapter**  
   将 MemCode 作为一个可选 memory engine 接入 NullClaw。

2. **远程记忆同步能力**  
   支持用户在多台设备之间共享部分长期记忆。

3. **隐私与权限控制设计**  
   远程记忆服务需要明确哪些数据会上传、如何加密、是否支持用户删除与导出。

4. **配置与默认策略**  
   需要决定是否默认禁用远程后端，并让用户显式选择开启。

5. **故障降级机制**  
   当远程服务不可用时，NullClaw 是否回退到本地记忆引擎，需要有明确行为。

从当前数据判断，该功能是否进入下一版本仍不确定。没有关联 PR，也没有维护者确认，因此只能视为早期路线图信号。

---

## 7. 用户反馈摘要

今日唯一反馈来自第三方服务提供方，而非普通终端用户。其核心观点可以概括为：

- **使用场景：** 用户希望在多个设备之间访问选定的 AI 记忆。
- **痛点：** 本地存储虽然轻量，但跨设备共享和长期可用性有限。
- **期望能力：** 在不显著增加本地运行时或存储负担的情况下，接入远程托管记忆服务。
- **满意点：** 提案中特别提到 NullClaw 已经支持多个可替换 memory engine，且 runtime footprint 很小，说明项目当前架构在扩展性和轻量化方面已有一定吸引力。
- **潜在担忧：** 远程记忆会带来隐私、安全、供应商锁定、可用性和数据所有权问题，但 Issue 摘要中尚未展开讨论。

相关链接：[#1015 Hosted MemCode engine for nullclaw memory interface](https://github.com/nullclaw/nullclaw/issues/1015)

---

## 8. 待处理积压

基于本次提供的数据，无法识别长期未响应的重要 Issue 或 PR。今日可见的唯一待处理事项如下：

### 待维护者初步回应

- **Issue：** [#1015 Hosted MemCode engine for nullclaw memory interface](https://github.com/nullclaw/nullclaw/issues/1015)  
- **状态：** Open  
- **建议关注点：**
  - 是否接受第三方托管记忆引擎作为官方支持方向；
  - 是否要求先提交设计文档或 RFC；
  - 是否需要定义 memory engine adapter 的安全与隐私规范；
  - 是否应将其作为插件、可选依赖或外部示例集成；
  - 是否存在品牌、商业合作或维护责任边界问题。

---

## 项目健康度判断

今日 NullClaw 的 GitHub 活跃度偏低，缺少代码合并、版本发布和维护者互动。不过，新增 Issue 显示出外部生态对 NullClaw 记忆接口的兴趣，尤其是在个人 AI 助手常见的长期记忆与跨设备同步方向上。  
短期来看，项目没有明显稳定性风险；中期来看，如何处理远程记忆后端、第三方集成与隐私边界，可能会成为影响 NullClaw 产品定位和生态开放度的重要议题。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-09-30）

项目：[`nearai/ironclaw`](https://github.com/nearai/ironclaw)  
统计窗口：过去 24 小时

---

## 1. 今日速览

过去 24 小时内，IronClaw 项目没有新的 Issue 更新，说明用户侧反馈与 Bug 报告相对平静。PR 侧有 2 条更新，其中 1 条已关闭/完成，1 条仍处于开放状态，开发活动主要集中在版本发布与 Loop Host 工具选择能力增强上。项目今日发布了稳定版本 `ironclaw-v1.4.1`，重点修复 Google OAuth 激活问题，并包含 Wasmtime 安全更新，整体偏向稳定性与安全维护。  
从活跃度看，今日属于**低到中等活跃度**：社区讨论不多，但核心维护动作明确，版本推进节奏健康。

---

## 2. 版本发布

### `ironclaw-v1.4.1`：稳定版发布

- 发布日期：2026-09-29
- Release：[`ironclaw-v1.4.1`](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.4.1)
- 版本性质：稳定版 promoted from `1.4.1-rc.2`

#### 主要更新内容

本次发布是对 `1.4.1-rc.2` 的稳定版提升，核心包含两类改动：

1. **Google OAuth 激活修复**
   - 修复 Google 扩展，例如 Gmail、Google Calendar，在特定部署场景下无法正确激活的问题。
   - 该问题发生在部署运营方通过 Web UI 提供 Google OAuth client，而不是通过其他配置路径提供时。
   - 对依赖 Google 生态扩展的部署者和最终用户较为重要。

2. **Wasmtime 安全更新**
   - Release Notes 明确提到包含 Wasmtime security update。
   - 这类更新通常涉及运行时沙箱、安全边界或依赖漏洞修复，对 Agent/工具执行类项目尤其关键。

#### 破坏性变更

根据当前提供的 Release Notes，未发现明确的 breaking changes。  
不过由于该版本涉及运行时依赖 Wasmtime 更新，建议依赖底层执行环境、插件运行或自定义部署脚本的用户进行回归验证。

#### 迁移注意事项

建议升级用户关注以下事项：

- 如果部署中使用 Gmail 或 Google Calendar 扩展，应优先升级到 `1.4.1`。
- 如果 Google OAuth client 是通过 Web UI 配置的，升级后应重新验证：
  - OAuth 授权流程是否正常；
  - Google 扩展是否可被正确激活；
  - 已授权账号是否仍可正常访问对应服务。
- 如果环境中存在自定义 Wasmtime 相关配置，建议在 staging 环境中先验证工具执行、沙箱隔离与插件加载流程。

---

## 3. 项目进展

### 已关闭 / 已完成 PR

#### PR #8120：`chore(release): promote 1.4.1-rc.2 to 1.4.1`

- 链接：[`#8120`](https://github.com/nearai/ironclaw/pull/8120)
- 状态：CLOSED
- 作者：`henrypark133`
- 类型：Release / CI / Docs / Dependencies
- 规模：L
- 风险：Medium
- 贡献者类型：Core contributor

#### 推进内容

该 PR 将已测试的 `ironclaw-v1.4.1-rc.2` 提升为稳定版 `1.4.1`，并完成了相关版本化工作：

- 将 shipping package 与 lockfile 更新到 `1.4.1`；
- 更新 root changelog 与 public changelog；
- 纳入来自 RC2 的三个提交；
- 配合发布 `ironclaw-v1.4.1`。

#### 项目影响

该 PR 标志着 `1.4.1` 从 RC 候选版本正式进入稳定发布阶段。项目整体向前推进主要体现在：

- 修复 Google OAuth 配置路径下的实际使用问题；
- 引入 Wasmtime 安全更新；
- 完成稳定版元数据、文档与锁文件同步；
- 降低部署者在 Google 扩展启用流程中的失败概率。

综合来看，这是一次偏稳定性、安全性和发布工程的推进，而不是大规模功能扩展。

---

### 仍开放的重要 PR

#### PR #8119：`feat(loop-host): opt-in tool selection with embeddings`

- 链接：[`#8119`](https://github.com/nearai/ironclaw/pull/8119)
- 状态：OPEN
- 作者：`CjS77`
- 类型：Feature / Docs / Dependencies
- 规模：XL
- 风险：Medium
- 贡献者类型：New contributor

#### 功能概述

该 PR 引入可选的 turn-start tool selection 机制。核心思路是在对话第一次模型调用之前，host 根据用户消息与已授权工具进行 embedding 匹配排序，并向模型优先暴露最相关的工具。

其目标是：

- 减少模型首次调用前对 `tool_search` 的依赖；
- 降低工具发现的额外 round trip；
- 提升 Agent 在多工具环境中的响应效率；
- 保持 tools array 字节级一致性，尽量降低兼容性风险。

#### 项目影响

这是一个较重要的 Agent 执行体验优化方向。若合并，IronClaw 在以下方面可能有明显改进：

- 工具调用路径更短；
- 首轮响应延迟降低；
- 在工具数量较多的场景下，模型更容易看到相关工具；
- 更适合复杂个人 AI 助手场景，例如日历、邮件、文件、知识库、外部 API 混合调用。

由于该 PR 规模为 XL，风险为 Medium，建议维护者重点关注：

- embedding 排序的可解释性；
- 授权工具过滤逻辑是否安全；
- 是否会影响已有 `tool_search` 行为；
- 是否存在 token 增量或上下文污染；
- opt-in 配置的默认关闭策略是否清晰。

---

## 4. 社区热点

今日没有 Issues 更新，也没有显示评论数或 reaction 数较高的讨论。当前可观察的热点主要来自开放 PR。

### 热点 1：工具选择与 Agent 执行效率

- PR：[`#8119 feat(loop-host): opt-in tool selection with embeddings`](https://github.com/nearai/ironclaw/pull/8119)
- 评论数：数据未提供
- 反应数：0
- 状态：OPEN

#### 背后诉求分析

该 PR 反映出 IronClaw 正在优化 Agent 在复杂工具环境下的工具发现效率。传统流程中，模型可能需要先调用 `tool_search`，再决定使用哪个工具，这会增加一次或多次 round trip。通过在 turn start 阶段基于 embedding 预选工具，系统可以更主动地帮助模型发现相关能力。

这类需求通常来自以下场景：

- 用户授权了大量工具或扩展；
- 模型首轮不知道有哪些工具可用；
- 对响应延迟敏感；
- 个人 AI 助手需要在邮件、日历、搜索、文件等工具之间快速路由；
- 希望减少模型“问一轮再调用工具”的低效交互。

目前该 PR 尚未合并，后续是否进入下一版本值得关注。

---

## 5. Bug 与稳定性

### 今日新报告 Bug

过去 24 小时没有新的 Issue 更新，因此没有新的公开 Bug 报告、崩溃报告或回归问题。

### 今日已修复 / 发布的稳定性问题

#### Google OAuth 激活问题

- Release：[`ironclaw-v1.4.1`](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.4.1)
- 相关 PR：[`#8120`](https://github.com/nearai/ironclaw/pull/8120)
- 严重程度：中等
- 状态：已随 `1.4.1` 发布

该问题影响 Google 扩展的激活流程，尤其是运营方通过 Web UI 提供 Google OAuth client 的部署方式。修复后，Gmail 与 Google Calendar 等扩展的激活路径应更加稳定。

#### Wasmtime 安全更新

- Release：[`ironclaw-v1.4.1`](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.4.1)
- 相关 PR：[`#8120`](https://github.com/nearai/ironclaw/pull/8120)
- 严重程度：中到高，取决于具体漏洞影响面
- 状态：已随 `1.4.1` 发布

Wasmtime 作为运行时安全边界相关组件，其安全更新对 IronClaw 这类支持工具/扩展执行的项目非常重要。建议生产环境尽快升级。

---

## 6. 功能请求与路线图信号

今日没有新的 Issue 形式的功能请求。不过开放 PR 中出现了清晰的路线图信号。

### 可能进入下一版本的方向：Embedding 驱动的工具预选择

- PR：[`#8119`](https://github.com/nearai/ironclaw/pull/8119)
- 当前状态：OPEN
- 纳入下一版本可能性：中等

该 PR 所代表的方向是：让 Loop Host 在对话开始时根据用户消息自动排序并选择候选工具，从而提升 Agent 的工具调用效率。

#### 路线图信号

这表明 IronClaw 可能正在从“模型主动搜索工具”的模式，逐步补充“Host 侧智能推荐工具”的能力。对个人 AI 助手而言，这是一个重要演进方向，因为真实使用中用户通常不会显式说明要调用哪个工具，而是直接提出任务，例如：

- “帮我看看明天下午有没有空”
- “把这封邮件整理成待办”
- “查一下我上周和某人的会议记录”
- “给客户发一封跟进邮件”

这些任务都依赖系统在背后快速判断应使用哪些授权工具。`#8119` 正是针对这一类体验优化。

---

## 7. 用户反馈摘要

由于过去 24 小时没有 Issue 更新，也没有可用的 Issue 评论数据，今日没有新的直接用户反馈可提炼。

从现有 PR 与 Release 内容间接可见的用户痛点包括：

1. **Google 扩展激活流程需要更稳定**
   - 相关 Release：[`ironclaw-v1.4.1`](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.4.1)
   - 用户场景：部署者通过 Web UI 配置 Google OAuth client，并希望 Gmail、Google Calendar 能顺利启用。
   - 痛点：OAuth 配置路径差异导致扩展激活失败。

2. **多工具 Agent 的工具发现成本较高**
   - 相关 PR：[`#8119`](https://github.com/nearai/ironclaw/pull/8119)
   - 用户场景：用户授权多个工具后，希望助手能直接判断任务所需工具。
   - 痛点：模型可能需要额外 `tool_search` 回合，增加延迟和交互成本。

---

## 8. 待处理积压

基于今日提供的数据，没有发现长期未响应的重要 Issue 或 PR。当前值得维护者重点关注的是开放中的大型功能 PR。

### 需要关注的开放 PR

#### PR #8119：`feat(loop-host): opt-in tool selection with embeddings`

- 链接：[`#8119`](https://github.com/nearai/ironclaw/pull/8119)
- 状态：OPEN
- 规模：XL
- 风险：Medium
- 作者：新贡献者 `CjS77`

#### 维护建议

该 PR 规模较大且涉及 Loop Host 的工具选择逻辑，建议优先安排 review，重点检查：

- 是否保持 opt-in，不影响默认行为；
- 工具授权边界是否严格；
- embedding 排序是否可能泄露或错误暴露工具信息；
- 是否有足够测试覆盖；
- 是否有文档说明如何启用、调试和回退；
- 与现有 `tool_search` 机制是否兼容。

---

## 总体健康度评估

IronClaw 今日整体健康度良好。虽然 Issue 和社区讨论活跃度较低，但项目完成了稳定版本发布，并包含实际用户影响较大的 Google OAuth 修复与安全依赖更新。开放中的 `#8119` 显示项目仍在推进 Agent 工具调用体验优化，方向符合个人 AI 助手系统的发展需求。

短期建议：

- 生产用户优先升级到 [`ironclaw-v1.4.1`](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.4.1)；
- 维护者尽快 review [`#8119`](https://github.com/nearai/ironclaw/pull/8119)；
- 对 Wasmtime 更新进行部署侧验证；
- 对 Google OAuth Web UI 配置路径补充文档与测试用例。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报  
日期：2026-09-30  
仓库：netease-youdao/LobsterAI

---

## 1. 今日速览

过去 24 小时内，LobsterAI 项目共有 **1 条 Issue 更新**、**4 条 Pull Request 更新**，无新版本发布。整体活跃度处于 **中等偏高**：虽然社区新增问题不多，但维护侧集中处理了渲染、Artifacts、Windows 安装器和 OpenClaw gateway 稳定性相关问题。  
今日更新主要围绕 **用户体验修复与运行稳定性增强** 展开，尤其是 Markdown 渲染、Artifact 打开行为、Windows 升级提示和 gateway 重启预算等方面。  
社区侧最值得关注的是一个与 **多分身 / 多 Agent 配置下梦境日记面板为空** 相关的 Bug，涉及内置 OpenClaw runtime 与上游修复同步问题，可能影响使用多 Agent 显式 ownership 配置的高级用户。

---

## 2. 项目进展

### PR #2783：修复 gateway restart budget  
链接：https://github.com/netease-youdao/LobsterAI/pull/2783  
状态：CLOSED  
标签：`area: main`, `area: openclaw`

该 PR 聚焦于 **gateway 重启预算** 的修复，属于运行时稳定性方向的改动。虽然摘要信息较少，但从标签看，该问题横跨主进程与 OpenClaw 集成层，可能与 runtime gateway 异常重启、重试策略或资源保护有关。

**影响判断：**

- 有助于降低 gateway 异常循环重启带来的稳定性风险。
- 对依赖 OpenClaw runtime 的核心智能体能力可能有正向影响。
- 与今日新开的 Issue #2779 同样涉及 OpenClaw runtime，说明近期维护重点之一是 runtime 集成稳定性。

---

### PR #2782：Windows 安装器在备份中止升级时提示迁移用户 skills  
链接：https://github.com/netease-youdao/LobsterAI/pull/2782  
状态：CLOSED  
标签：`platform: windows`

该 PR 改进 Windows 安装器在检测到安装目录中存在用户 skills 并因此中止升级时的提示体验。此前可能仅显示英文状态文本，现在会列出安装树中的用户 skill 文件夹，并通过本地化的中英文弹窗提示用户将其移动到 per-user skills root。

**推进内容：**

- 提升 Windows 用户升级失败时的可理解性。
- 明确告诉用户需要手动迁移哪些 skill 文件夹。
- 继续采用 fail-closed 策略，即在存在风险时阻止升级，避免用户数据被覆盖或丢失。

**影响判断：**

这是一个偏产品体验和数据安全的修复。对于使用自定义 skills 的 Windows 用户，升级路径会更加清晰，降低“升级失败但不知道如何处理”的挫败感。

---

### PR #2781：修复 Markdown 中货币美元符号被误识别为行内数学公式  
链接：https://github.com/netease-youdao/LobsterAI/pull/2781  
状态：CLOSED  
标签：`area: renderer`, `area: artifacts`

该 PR 修复了 Markdown 渲染中 `$3/$15` 这类文本被 `remark-math` 错误解析为 KaTeX 行内数学公式的问题。修复方式是引入类似 Pandoc 的分隔符规则：行内数学公式的 opening `$` 和 closing `$` 需要满足非空白字符等条件，从而避免普通货币金额被误判。

**推进内容：**

- 修复普通文本中的美元金额显示异常。
- 避免一个错误的 `$...$` 配对影响段落后续内容渲染。
- 提升 assistant 消息、Artifacts Markdown 预览等场景的文本可靠性。

**影响判断：**

该修复对金融、报价、预算、账单、购物清单等场景非常重要。对于个人 AI 助手类产品，Markdown 渲染准确性直接影响用户对内容可信度的判断。

---

### PR #2780：Markdown 链接在匹配的 Artifact 卡片中打开  
链接：https://github.com/netease-youdao/LobsterAI/pull/2780  
状态：CLOSED  
标签：`area: renderer`, `area: cowork`, `area: artifacts`

该 PR 改进 assistant 消息中的内联 Markdown 链接打开逻辑，使链接文件优先在匹配的 Artifact card 中打开，而不是交给外部应用处理。同时放宽 Artifact 解析器以识别 linked files，并扩展自动预览策略、slice state 和 analytics。

**推进内容：**

- assistant 消息中的文件链接会通过共享 opener 路由。
- 匹配到的文件可在同一 Artifact 卡片中打开。
- 扩展 Artifact 自动预览能力。
- 改善 cowork、renderer 与 artifacts 之间的交互一致性。
- 增加相关状态管理和分析埋点支持。

**影响判断：**

这是今日最明显的功能体验增强。它让 LobsterAI 内部的文档、产物和对话消息形成更连贯的工作流，减少用户在外部应用与 LobsterAI 之间来回切换。

---

## 3. 社区热点

### Issue #2779：多分身配置下“梦境日记”面板为空  
链接：https://github.com/netease-youdao/LobsterAI/issues/2779  
状态：OPEN  
作者：probe528-maker  
评论数：1  
反应数：0

该 Issue 是今日唯一活跃 Issue，也是当前最值得关注的社区反馈。用户报告在以下环境中出现问题：

- LobsterAI 2026.9.23
- macOS 27.0 arm64
- 内置 runtime：OpenClaw 2026.8.1 `ea80657`
- `agents.entries` 下配置 5 个 agent
- `agents.ownership = "explicit"`
- 已设置 `agents.defaults.systemAgent.agentId = "main"`

**现象：**

- 设置 → 梦境 → 日记 Diary 标签页一直显示“还没有梦境日记”。
- 但工作区中的 `DREAMS.md` 文件持续正常更新，且已有约 7.7KB 内容。
- 用户判断问题与内置 runtime 缺少 `doctor.memory.*` 的 `ambient-owner` 回退有关，并指出上游已经修复，LobsterAI 侧待跟进。

**背后诉求：**

该反馈来自高级用户，使用了多 Agent、多分身、显式 ownership 等复杂配置。核心诉求不是梦境生成失败，而是 **UI 面板无法正确读取或归属已有梦境日记数据**。这表明 LobsterAI 在多 Agent ownership 机制与 UI 数据读取之间仍存在边界条件问题。

---

## 4. Bug 与稳定性

### 高优先级：多 Agent 显式 ownership 下梦境日记面板为空  
链接：https://github.com/netease-youdao/LobsterAI/issues/2779  
严重程度：高  
状态：OPEN  
是否已有 fix PR：暂无明确对应 PR

**问题描述：**

在多分身配置下，`DREAMS.md` 文件本身正常更新，但设置页中的梦境日记面板显示为空。该问题影响数据可见性和用户信任，尤其是对于依赖梦境日记功能进行长期记忆、反思或自动总结的用户。

**影响范围推测：**

- 多 Agent 配置用户
- 使用 `agents.ownership = "explicit"` 的用户
- 依赖 `agents.defaults.systemAgent.agentId` 的场景
- 使用内置 OpenClaw 2026.8.1 runtime 的版本

**风险：**

- 用户可能误以为梦境日记功能未运行。
- UI 状态与底层文件状态不一致，增加排查成本。
- 如果上游 OpenClaw 已修复但 LobsterAI 内置 runtime 尚未同步，可能需要尽快升级 runtime 或 backport patch。

---

### 中优先级：gateway restart budget 修复  
链接：https://github.com/netease-youdao/LobsterAI/pull/2783  
严重程度：中  
状态：CLOSED  
是否已有 fix PR：有，PR #2783

该 PR 表明近期存在 gateway 重启预算相关问题。虽然没有对应 Issue 信息，但它属于稳定性修复，可能用于避免 gateway 在异常情况下无限重启或过早停止。

---

### 中优先级：Markdown 中美元金额误渲染为数学公式  
链接：https://github.com/netease-youdao/LobsterAI/pull/2781  
严重程度：中  
状态：CLOSED  
是否已有 fix PR：有，PR #2781

该问题会导致 `$3/$15` 等常见文本被错误渲染为 KaTeX，影响 assistant 输出可读性。对涉及价格、预算、财务、购物等内容的用户影响明显。

---

### 低到中优先级：Windows 安装器升级中止提示不清晰  
链接：https://github.com/netease-youdao/LobsterAI/pull/2782  
严重程度：低到中  
状态：CLOSED  
是否已有 fix PR：有，PR #2782

该问题不会直接破坏功能，但会影响升级体验。对于存在用户自定义 skills 的 Windows 用户，旧提示可能导致不知道如何恢复升级。

---

## 5. 功能请求与路线图信号

### Artifact 内部打开 Markdown 链接的体验增强  
链接：https://github.com/netease-youdao/LobsterAI/pull/2780

PR #2780 虽然不是传统意义上的用户功能请求，但释放出明确的路线图信号：LobsterAI 正在强化 **对话内容、文件链接、Artifacts 卡片和预览系统之间的一体化体验**。

**可能进入下一版本的方向：**

- 更智能的 Artifact 文件识别。
- 更一致的内部文件打开行为。
- assistant 消息与工作区文件之间更顺滑的跳转。
- 面向 cowork 场景的协作产物预览增强。

---

### 多 Agent / 多分身 ownership 兼容性可能成为近期重点  
链接：https://github.com/netease-youdao/LobsterAI/issues/2779

Issue #2779 暗示，多 Agent 显式 ownership 配置下，部分 UI 面板与底层 memory / diary 数据源之间存在不一致。由于该问题涉及 `doctor.memory.*` 和 `ambient-owner` 回退，未来版本可能会纳入：

- OpenClaw runtime 升级。
- memory owner fallback 逻辑修复。
- 梦境日记面板读取逻辑增强。
- 多 Agent 默认 system agent 归属策略完善。

---

## 6. 用户反馈摘要

### 用户痛点一：数据实际存在，但 UI 显示为空  
相关 Issue：https://github.com/netease-youdao/LobsterAI/issues/2779

用户反馈的关键矛盾是：`DREAMS.md` 持续更新，但设置页中的 Diary 标签页为空。这类问题会严重影响用户对功能状态的判断，因为底层数据与前端展示不一致。

**用户真实诉求：**

- 希望梦境日记面板能够正确读取已有梦境内容。
- 希望多 Agent 配置下系统能够自动选择正确 owner。
- 希望 LobsterAI 尽快跟进上游 runtime 修复。

---

### 用户痛点二：高级配置下的边界问题仍需要更强兼容性  
相关 Issue：https://github.com/netease-youdao/LobsterAI/issues/2779

该用户使用 5 个 agent、显式 ownership 和默认 systemAgent 配置，属于高级使用场景。反馈说明 LobsterAI 已被用于较复杂的个人 AI 助手环境，但相关 UI 和 runtime 集成仍需要覆盖更多组合配置。

---

### 用户痛点三：Windows 升级失败时需要明确操作指引  
相关 PR：https://github.com/netease-youdao/LobsterAI/pull/2782

虽然这是维护侧 PR，但它反映出用户升级过程中可能遇到的真实困扰：安装器出于安全原因中止升级，但旧提示不足以指导用户下一步操作。此次修复通过本地化弹窗和列出 skill 文件夹，改善了可操作性。

---

## 7. 待处理积压

基于本次提供的数据，过去 24 小时内没有发现长期未响应的 Issue 或 PR。当前最需要维护者继续跟进的是今日新开的开放 Issue：

### 需要跟进：Issue #2779  
链接：https://github.com/netease-youdao/LobsterAI/issues/2779  
状态：OPEN  
建议优先级：高

**建议维护动作：**

1. 确认 LobsterAI 内置 OpenClaw 2026.8.1 是否确实缺少上游修复。
2. 判断是否可以升级内置 runtime，或 backport `doctor.memory.*` 的 `ambient-owner` fallback 修复。
3. 在多 Agent 显式 ownership 场景下补充回归测试。
4. 检查 Dream Diary 面板的数据读取逻辑是否与 `DREAMS.md` 更新路径一致。
5. 在 Issue 中回复用户预期修复版本或临时 workaround。

---

## 项目健康度评估

今日 LobsterAI 的维护节奏较稳，4 个 PR 覆盖稳定性、安装器、渲染和 Artifact 工作流，说明项目仍在持续打磨核心使用体验。社区反馈量不高，但 Issue #2779 的技术含量较高，指向多 Agent 架构与 runtime 同步问题，建议优先处理。整体来看，项目健康度良好，但在 **内置 runtime 更新节奏、多 Agent ownership 兼容性、UI 与底层数据一致性** 方面仍需加强。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报（2026-09-30）

## 1. 今日速览

过去 24 小时，Moltis 项目活跃度较低：仅有 1 条新 Issue 更新，未出现 Pull Request 更新，也没有新版本发布。  
今日新增讨论集中在「Goal mode / Ralph loop」类能力，反映用户希望 Moltis 在智能体目标规划、持续执行与循环推理方面进一步增强。  
当前没有新报告的 Bug、崩溃或回归问题，短期稳定性信号较平稳。  
但由于没有 PR 活动，说明今日代码层面的推进有限，项目主要处于需求收集与路线图信号沉淀阶段。

---

## 2. 项目进展

过去 24 小时无新增、合并或关闭的 Pull Request。

- 今日合并 PR：0
- 今日关闭 PR：0
- 待合并 PR：0

从现有数据看，今日没有可确认的代码变更进入主干，也没有功能、修复或文档改进被合并。因此项目在实现层面的推进幅度较小，主要进展来自社区提出的新功能需求。

---

## 3. 社区热点

### [Issue #1289 — [Feature]: Goal mode or ralph loop](https://github.com/moltis-org/moltis/issues/1289)

- 状态：Open
- 类型：Enhancement / Feature Request
- 作者：abda11ah
- 创建时间：2026-09-29
- 更新时间：2026-09-29
- 评论数：0
- 👍 数：0

这是过去 24 小时唯一活跃的社区议题。虽然目前尚无评论和反应，但该 Issue 指向一个较核心的智能体能力方向：让 Moltis 支持类似「Goal mode」或「Ralph loop」的目标驱动循环执行机制。

从标题和摘要可推断，用户诉求可能包括：

- 让 AI 助手围绕长期目标持续推进任务，而不是单轮对话式响应；
- 支持自动规划、执行、检查、再规划的循环；
- 增强智能体的自主性和任务完成能力；
- 可能希望 Moltis 在复杂任务中具备更强的上下文保持与迭代能力。

该需求与个人 AI 助手和 AI Agent 产品的核心演进方向高度相关，值得维护者进一步追问具体使用场景、交互方式、风险控制和默认行为边界。

---

## 4. Bug 与稳定性

过去 24 小时未发现新的 Bug、崩溃、回归或稳定性相关 Issue。

| 严重程度 | 问题 | 状态 | Fix PR |
|---|---|---|---|
| 高 | 无 | - | - |
| 中 | 无 | - | - |
| 低 | 无 | - | - |

当前数据表明，今日没有用户报告明显的稳定性问题。不过，由于当天总体 Issue 数量较少，这只能说明短期内没有新增负面信号，不能直接等同于整体稳定性已充分验证。

---

## 5. 功能请求与路线图信号

### [Issue #1289 — Goal mode or ralph loop](https://github.com/moltis-org/moltis/issues/1289)

该 Issue 是今日唯一新增功能请求，属于智能体执行模型层面的增强建议。

潜在路线图信号：

1. **目标驱动模式**
   - 用户希望 Moltis 不只是被动响应，而是能够接受一个目标并持续推进。
   - 这可能需要任务分解、状态追踪、执行日志、失败重试等能力。

2. **循环式智能体架构**
   - “ralph loop” 暗示用户希望引入类似反复计划、行动、观察、反思的 agent loop。
   - 这类能力通常会影响系统架构，包括工具调用、记忆、上下文压缩和安全中断机制。

3. **更强的自主性与可控性平衡**
   - Goal mode 往往伴随风险，例如无限循环、错误执行、资源消耗过高或未经确认的高风险操作。
   - 若进入路线图，建议配套设计执行步数限制、用户确认点、任务预算、权限控制和可观察日志。

目前没有关联 PR，因此短期内是否进入下一版本尚无法判断。若维护者认可该方向，下一步可能是将该 Issue 拆解为更具体的设计提案或 RFC，例如：

- Goal mode 的用户界面与交互流程；
- agent loop 的状态机设计；
- 工具调用和权限边界；
- 是否默认启用；
- 与现有聊天模式的关系；
- 如何避免无限循环和不确定行为。

---

## 6. 用户反馈摘要

基于今日唯一 Issue，可提炼出以下用户反馈：

- **核心痛点**：用户可能认为当前 Moltis 的交互更偏单轮或短程任务执行，缺少围绕长期目标持续推进的能力。
- **期望场景**：用户希望 AI 助手能够进入某种目标模式，在任务未完成前持续规划、执行和修正。
- **产品期待**：Moltis 若能支持 Goal mode，将更接近完整 AI Agent，而不仅是对话助手或工具调用入口。
- **反馈热度**：目前评论数和点赞数均为 0，说明该需求尚未形成广泛共识，但其方向与 AI 智能体领域趋势一致，值得观察后续社区反应。

相关链接：

- [Issue #1289 — [Feature]: Goal mode or ralph loop](https://github.com/moltis-org/moltis/issues/1289)

---

## 7. 待处理积压

当前提供的数据仅覆盖过去 24 小时，未包含长期未响应的历史 Issue 或 PR 列表，因此无法可靠判断哪些积压项已长期停滞。

今日需要维护者关注的待处理项：

| 类型 | 链接 | 建议动作 |
|---|---|---|
| Feature Request | [Issue #1289](https://github.com/moltis-org/moltis/issues/1289) | 请求作者补充更明确的使用场景、预期行为、与现有功能的差异，以及是否有参考实现 |
| Roadmap Discussion | [Issue #1289](https://github.com/moltis-org/moltis/issues/1289) | 评估是否需要升级为设计讨论或 RFC，尤其是 agent loop、权限控制和安全退出机制 |

建议维护者优先对 #1289 进行初步回应，以避免潜在高价值功能需求沉没。即使暂不实现，也可以通过标签、问题拆分或路线图说明引导社区进一步讨论。

---

## 总体健康度评估

今日 Moltis 项目处于低活跃、需求驱动状态。没有 PR 和 Release 表明代码推进有限，但也没有新增 Bug 报告，稳定性层面未出现负面信号。唯一新增 Issue 指向智能体核心能力增强，虽然当前互动较少，但具备较高产品战略价值。建议维护者关注 Goal mode / agent loop 方向，并尽快收集更多用例以判断是否纳入后续路线图。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报｜2026-09-30

> 数据范围：过去 24 小时 GitHub Issues / PR 活动  
> 注：本次数据条目中的仓库链接显示为 `agentscope-ai/QwenPaw`，以下链接按原始数据生成。

---

## 1. 今日速览

过去 24 小时项目活跃度较高：Issues 更新 6 条，其中 5 条仍处于 Open 状态；PR 更新 17 条，其中 8 条待合并、9 条已合并或关闭。  
今日工作重心明显偏向稳定性修复、跨平台兼容、E2E 测试适配、桌面端与 Provider 可靠性。  
社区反馈集中在模型能力适配、文件/多模态上下文污染、OpenAI / DashScope 集成失败、Embedding 重建异常等真实生产问题上。  
整体来看，项目维护响应较快，短时间内已有多项 CI、终端、数据库连接、跨平台问题被修复，但仍存在若干影响用户主路径的高优先级 Bug 等待处理。

---

## 2. 项目进展

今日无新版本发布，但 PR 活动密集，多个稳定性与工程质量问题已推进。

### 已合并 / 已关闭的重要 PR

#### 数据库与 Hub 稳定性

- [PR #8038｜fix(hub): close database connections after transactions](https://github.com/agentscope-ai/QwenPaw/pull/8038)  
  修复 Hub SQLite 事务结束后连接生命周期管理问题。  
  主要改进：
  - 成功提交或事务失败后显式关闭连接
  - PRAGMA 初始化失败时关闭连接
  - 防止连接泄漏导致的资源耗尽或锁竞争  
  **影响评估：** 对 Hub 长时间运行稳定性有直接提升。

#### Console / E2E 测试适配

- [PR #8037｜fix(console): align e2e tests with redesigned UI](https://github.com/agentscope-ai/QwenPaw/pull/8037)  
  将 Console E2E 页面对象与选择器适配到新版 UI。覆盖 ACP、Channels、Cron Jobs、Heartbeat、Runtime Config、Security、Skills、Tools 等多个模块。  
  **影响评估：** 提升新版 Console 的回归测试覆盖度，有助于降低后续 UI 改动引入的回归风险。

- [PR #8039｜fix(ci): correct first-time PR detection and add automatic size labels](https://github.com/agentscope-ai/QwenPaw/pull/8039)  
  修复首次 PR 检测逻辑，避免已有多个 Open PR 的贡献者反复收到“first PR”欢迎标签。新增自动 PR size 标签。  
  **影响评估：** 改善社区协作体验与维护者分拣效率。

#### 终端与跨平台兼容

- [PR #8032｜fix(terminal): support high posix descriptors](https://github.com/agentscope-ai/QwenPaw/pull/8032)  
  将 POSIX PTY readiness wait 从 `select` 替换为 `poll`，避免文件描述符超过 `FD_SETSIZE` 时失败。  
  **影响评估：** 修复高并发或长时间运行环境下终端会话异常问题。

- [PR #8023｜fix(terminal): support high posix descriptors](https://github.com/agentscope-ai/QwenPaw/pull/8023)  
  同类终端高 FD 修复，包含 descriptor > 1023 的回归测试。  
  **影响评估：** 与 #8032 共同说明终端稳定性是近期重点修复方向。

- [PR #8026｜fix(ci): address cross-platform paths, sandbox cleanup, and Windows terminal interrupts](https://github.com/agentscope-ai/QwenPaw/pull/8026)  
  修复 Windows 路径、UNC / file URL、sandbox 清理、时区加载、Windows 终端输入等跨平台问题。  
  **影响评估：** 对 Windows 用户、桌面端和 CI 稳定性均有帮助。

- [PR #8024｜fix(portability): reject invalid qoder timezones](https://github.com/agentscope-ai/QwenPaw/pull/8024)  
  修复 Windows 上空白 timezone 值可能触发 `PermissionError` 的问题。  
  **影响评估：** 小范围但明确的可移植性修复。

#### 桌面端与用户体验

- [PR #8025｜fix(desktop): disable NSIS solid compression](https://github.com/agentscope-ai/QwenPaw/pull/8025)  
  禁用 NSIS solid compression。  
  **影响评估：** 可能用于改善 Windows 安装包构建、安装或增量处理问题，但 PR 描述较空，建议维护者补充变更背景。

- [PR #8021｜fix(chat): restore compact copy action icons](https://github.com/agentscope-ai/QwenPaw/pull/8021)  
  恢复聊天气泡中的紧凑复制按钮图标。  
  **影响评估：** 属于 UI 细节修复，改善聊天交互体验。

---

## 3. 社区热点

### 最高讨论度 Issue

#### [Issue #8036｜Creator: OpenAI integration, image credentials/capabilities, and resume failures](https://github.com/agentscope-ai/QwenPaw/issues/8036)

- 状态：Open
- 评论数：2
- 作者：ekzhu
- 主题：Creator 在 OpenAI 文本 / 图像模型、图像凭据、模型能力识别，以及 Kimi K3 / DashScope resume 场景中出现失败。

**背后诉求：**

用户希望连接测试通过后，实际生成也能稳定执行；当 Provider 返回明确错误时，UI 不应只显示泛化提示“本次执行未完成，可重试继续”，而应保留可操作的错误信息。  
这反映出当前 Provider 集成层存在两个关键痛点：

1. **连接测试与真实调用能力不一致**  
   连接测试成功并不代表文本生成、图像生成、resume 等能力可用。

2. **错误信息被 UI 或上层执行框架吞掉**  
   用户难以判断是凭据问题、模型能力问题、Provider 限制，还是恢复流程问题。

该问题对 Creator 主路径影响较大，建议优先定位。

---

### 其他活跃反馈

#### [Issue #8042｜Tool output files are auto-fed back to model as input](https://github.com/agentscope-ai/QwenPaw/issues/8042)

工具生成的 PDF 等文件被自动回灌给模型，若模型不支持该文件格式，会导致 Internal error。  
该问题反映出多模态 / 文件上下文注入缺少模型能力判断与降级策略。

#### [Issue #8040｜embedding reindex incomplete](https://github.com/agentscope-ai/QwenPaw/issues/8040)

ReMe embedding 重建时部分 CJK chunk 超出 Provider 单条 token 限制，导致整个 batch 静默丢弃。  
用户已提供较完整的根因链路，说明该问题可复现、可验证，修复价值较高。

#### [Issue #8035｜Transcription settings cannot configure transcription_model](https://github.com/agentscope-ai/QwenPaw/issues/8035)

切换 transcription provider 后，页面无法正确配置或更新 `transcription_model`，导致转写静默失败。  
该问题涉及设置页、配置持久化和 provider 能力匹配。

---

## 4. Bug 与稳定性

以下按影响严重程度排序。

### P0 / 高优先级：会导致主流程持续失败或数据链路污染

#### [Issue #8022｜send_file_to_user 产生的 file/image 内容块污染会话上下文，导致后续请求持续 400](https://github.com/agentscope-ai/QwenPaw/issues/8022)

- 状态：Open
- 影响：后续请求对所有模型持续 400
- 涉及场景：`send_file_to_user`、file/image content block、空 assistant 消息、模型能力降级
- 是否已有 fix PR：可能与 [PR #8034](https://github.com/agentscope-ai/QwenPaw/pull/8034) 的 inline media request bound 有关联，但未显示直接关联

**分析：**  
这是典型的会话上下文污染问题。一旦历史消息中残留模型不支持的 file/image 内容块，后续轮次即使用户输入正常，也会持续失败。该类问题对用户感知非常差，因为它会让整个会话“坏掉”。

建议：
- 在发送给模型前按模型能力过滤 / 降级 content block
- 对工具输出文件与用户可见文件区分处理
- 对空 assistant 消息做清理
- 提供会话修复或上下文重置机制

---

#### [Issue #8042｜工具输出文件自动回灌给模型导致 Internal error](https://github.com/agentscope-ai/QwenPaw/issues/8042)

- 状态：Open
- 影响：模型不支持工具输出文件格式时直接失败
- 环境：QwenPaw Hub 2.2.1、runtime image 2.2.1、WeCom、模型通道
- 是否已有 fix PR：暂无明确对应 PR

**分析：**  
与 #8022 同属“文件上下文自动注入缺少模型能力判断”的问题。工具输出应该分为：
- 给用户看的 artifact
- 给模型继续推理用的 structured output / text summary
- 可选注入的文件引用

当前行为过于自动化，导致模型接收到不支持的 PDF 等输入。

---

### P1：Provider / Creator / 多模型集成失败

#### [Issue #8036｜OpenAI integration, image credentials/capabilities, and resume failures](https://github.com/agentscope-ai/QwenPaw/issues/8036)

- 状态：Open
- 影响：Creator 使用 OpenAI 文本 / 图像模型失败，Kimi K3 on DashScope resume 失败
- 是否已有 fix PR：暂无明确对应 PR

**分析：**  
问题覆盖面较广：OpenAI 文本、图像凭据、模型能力识别、DashScope resume。建议拆分为多个可验证子问题，否则修复和回归测试成本较高。

---

#### [Issue #8035｜转写设置页无法配置或更新 transcription_model](https://github.com/agentscope-ai/QwenPaw/issues/8035)

- 状态：Open
- 影响：切换 provider 后转写静默失效
- 是否已有 fix PR：暂无明确对应 PR

**分析：**  
这是配置 UI 与实际 provider 参数不一致导致的功能不可用。用户痛点在于“页面看似可配置，但关键字段未被正确处理”。

---

### P1：Embedding / ReMe 数据可靠性

#### [Issue #8040｜Embedding reindex incomplete，CJK chunk 超出 per-item token limit 导致 batch 静默丢弃](https://github.com/agentscope-ai/QwenPaw/issues/8040)

- 状态：Open
- 影响：Embedding 重建结果不完整，但日志显示 processed=126/126，容易造成误判
- 是否已有 fix PR：暂无明确对应 PR
- 关联：用户提到是 #5950 的复现

**分析：**  
这是数据完整性问题。危险点不只是失败，而是“部分失败被成功日志掩盖”。  
建议：
- 对单条 chunk 做 provider token limit 预检查
- batch 内单项失败不应导致整批静默丢失
- processed 指标应区分 submitted / succeeded / failed / skipped
- 对 CJK token 估算增加安全余量

---

### P1 / P2：桌面端、Provider、技能系统、测试体系待合并修复

#### [PR #8033｜fix(tauri): stop reconciling away a live desktop instance's backend](https://github.com/agentscope-ai/QwenPaw/pull/8033)

- 状态：Open
- 问题：Windows 桌面端重复启动时，第二实例会终止第一实例仍在使用的 backend
- 影响：第一个窗口可能永久失去后端连接
- 建议优先级：高

#### [PR #8034｜fix(providers): bound inline media per request, not just per file](https://github.com/agentscope-ai/QwenPaw/pull/8034)

- 状态：Open
- 问题：单文件 2MB 限制无法约束整体请求体大小，多图会持续累积导致请求过大
- 影响：Provider gateway byte limit 被触发
- 与 Issues 关联：可能部分缓解 #8022 / #8042 类多模态上下文问题，但不完全等价

#### [PR #8027｜fix(skills): offload pool skill download to a worker thread](https://github.com/agentscope-ai/QwenPaw/pull/8027)

- 状态：Open
- 问题：技能下载流程在 async handler 内执行阻塞文件系统操作
- 影响：下载大技能时阻塞事件循环
- 建议：尽快合并，属于服务端响应性修复

#### [PR #8031｜test: stop leaking unawaited coroutines from scheduling mocks](https://github.com/agentscope-ai/QwenPaw/pull/8031)

- 状态：Open
- 问题：测试中未 await coroutine，产生 RuntimeWarning
- 影响：掩盖真实异步生命周期问题
- 建议：作为测试健康度修复处理

---

## 5. 功能请求与路线图信号

今日功能类信号主要来自 Provider、浏览器、模型 fallback 与安全策略方向。

### 浏览器能力增强

#### [PR #8029｜feat(browser): let config drop Playwright default launch arguments](https://github.com/agentscope-ai/QwenPaw/pull/8029)

- 状态：Open
- 诉求：允许配置移除 Playwright 默认启动参数，例如 `--disable-extensions`
- 使用场景：`identity: "avatar"` + 持久化 `user_data_dir` 时加载用户已安装扩展
- 路线图信号：浏览器 Agent 正在从“受控自动化环境”向“真实用户浏览器身份 / profile”靠近

该功能如果合并，将提升浏览器自动化在真实桌面环境中的可用性，尤其是需要扩展、登录态、持久 profile 的场景。

---

### Provider fallback 可靠性

#### [PR #8020｜feat(providers): add cooldown to model fallback candidates](https://github.com/agentscope-ai/QwenPaw/pull/8020)

- 状态：Open
- 诉求：失败的 fallback candidate 在冷却期内跳过，避免每次请求都重复撞上不可用 primary
- 解决问题：
  - 5xx 时重复等待 `1+2+4s`
  - 429 时可能每轮请求都等待最多 60s
- 路线图信号：多模型 fallback 策略正在从“简单链式重试”升级为“状态感知调度”

该 PR 很可能进入下一版本，因为它能显著改善 Provider 不稳定时的用户体验。

---

### 安全策略增强

#### [PR #8028｜fix(security): flag inline Office COM automation in shell commands](https://github.com/agentscope-ai/QwenPaw/pull/8028)

- 状态：Open
- 诉求：在 Windows 且 sandbox 关闭、approval level 为 auto 时，识别并阻止 Office COM 自动化命令
- 风险：Agent 可能附着到用户真实 Office 单实例进程，访问或修改敏感文档
- 路线图信号：项目正在加强 Agent 执行本地命令时的风险识别，尤其是 Windows 桌面自动化安全边界

---

### 多模态请求体治理

#### [PR #8034｜fix(providers): bound inline media per request, not just per file](https://github.com/agentscope-ai/QwenPaw/pull/8034)

- 状态：Open
- 诉求：不仅限制单文件大小，也限制整次请求的 inline media 总量
- 路线图信号：多模态上下文将更严格地受 request-level budget 管理

结合 #8022 和 #8042，这一方向大概率会继续扩展到“按模型能力降级 content”和“工具输出 artifact 不自动注入模型”。

---

## 6. 用户反馈摘要

### 主要痛点一：错误信息不可操作

来自 [Issue #8036](https://github.com/agentscope-ai/QwenPaw/issues/8036) 的反馈显示，用户在 Creator 中遇到 OpenAI / DashScope 相关失败时，UI 往往用通用提示覆盖 Provider 的真实错误。  
用户真正需要的是：
- 明确是哪一个 provider / model / capability 失败
- 凭据错误、模型不支持、网络错误、rate limit、resume 失败要区分
- 连接测试结果应与真实生成能力一致或至少说明覆盖范围

### 主要痛点二：模型能力与上下文内容不匹配

[Issue #8022](https://github.com/agentscope-ai/QwenPaw/issues/8022) 与 [Issue #8042](https://github.com/agentscope-ai/QwenPaw/issues/8042) 都指向同一类问题：系统把 file/image/PDF 等内容自动放入上下文，但没有根据模型能力进行降级。  
用户不满点在于：
- 一次工具输出可能污染整个后续会话
- 模型不支持某类文件时没有提前拦截
- 错误表现为持续 400 或 Internal error，用户难以自救

### 主要痛点三：配置页看似成功，实际功能失效

[Issue #8035](https://github.com/agentscope-ai/QwenPaw/issues/8035) 表明用户在设置转写 provider 后，关键字段 `transcription_model` 无法配置或更新，最终导致转写静默失败。  
这类问题会降低用户对控制台配置可靠性的信任。

### 主要痛点四：批处理日志与真实结果不一致

[Issue #8040](https://github.com/agentscope-ai/QwenPaw/issues/8040) 中，Embedding reindex 日志显示全部 processed，但实际有 chunks 失败。  
用户痛点不是单纯失败，而是系统没有真实反映失败状态，可能导致用户误以为知识库已完整重建。

---

## 7. 待处理积压

从过去 24 小时数据看，没有明显“长期无人响应”的历史积压条目；但以下新近 Open 项目优先级较高，建议维护者尽快分流处理。

### 高优先级 Open Issues

1. [Issue #8022｜send_file_to_user file/image 内容块污染上下文导致持续 400](https://github.com/agentscope-ai/QwenPaw/issues/8022)  
   建议优先级：P0  
   原因：污染会话上下文，影响所有后续模型请求。

2. [Issue #8042｜工具输出文件自动回灌导致模型 Internal error](https://github.com/agentscope-ai/QwenPaw/issues/8042)  
   建议优先级：P0 / P1  
   原因：与文件 artifact、模型能力适配、企业 IM 渠道使用场景相关。

3. [Issue #8036｜Creator OpenAI / image / Kimi K3 resume 多项失败](https://github.com/agentscope-ai/QwenPaw/issues/8036)  
   建议优先级：P1  
   原因：影响 Creator 主路径与 Provider 集成可信度。

4. [Issue #8040｜Embedding reindex incomplete 且日志误导](https://github.com/agentscope-ai/QwenPaw/issues/8040)  
   建议优先级：P1  
   原因：涉及知识库完整性与批处理可观测性。

5. [Issue #8035｜Transcription settings 无法配置 transcription_model](https://github.com/agentscope-ai/QwenPaw/issues/8035)  
   建议优先级：P1 / P2  
   原因：配置 UI 与实际运行参数不一致，导致功能静默失效。

### 待 Review 的关键 Open PR

1. [PR #8034｜限制单次请求 inline media 总量](https://github.com/agentscope-ai/QwenPaw/pull/8034)  
   建议优先 review，可能缓解多模态请求体过大问题。

2. [PR #8033｜修复 Windows 桌面端多实例 backend 被误杀](https://github.com/agentscope-ai/QwenPaw/pull/8033)  
   建议优先 review，影响桌面端可用性。

3. [PR #8020｜Provider fallback candidate cooldown](https://github.com/agentscope-ai/QwenPaw/pull/8020)  
   建议优先 review，可显著改善模型不可用或限流时的体验。

4. [PR #8028｜识别 Office COM 自动化高风险 shell 命令](https://github.com/agentscope-ai/QwenPaw/pull/8028)  
   建议安全方向优先 review，尤其面向 Windows 本地 Agent 场景。

5. [PR #8027｜技能池下载 offload 到 worker thread](https://github.com/agentscope-ai/QwenPaw/pull/8027)  
   建议尽快合并，降低 async 服务阻塞风险。

---

## 项目健康度评估

- **活跃度：高**  
  24 小时内 17 条 PR 更新、6 条 Issue 更新，维护与社区反馈都较活跃。

- **工程推进：良好**  
  多个 CI、E2E、终端、跨平台、数据库连接问题已修复，说明维护者在持续偿还工程稳定性债务。

- **用户侧风险：中高**  
  当前 Open Issues 多集中在模型调用、文件上下文、多模态能力、Provider 集成、知识库重建等核心路径，对真实用户影响较大。

- **建议关注方向：**  
  1. 模型能力感知与 content 自动降级  
  2. 工具输出 artifact 与模型输入上下文解耦  
  3. Provider 错误透传与可观测性  
  4. Embedding 批处理失败的真实统计  
  5. Windows 桌面端与本地自动化安全边界

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报（2026-09-30）

## 1. 今日速览

过去 24 小时 ZeroClaw 活跃度很高：Issues 更新 8 条，PR 更新 31 条，其中 26 条仍待合并，5 条已合并或关闭，显示项目处于密集开发与修复周期。今日工作重点集中在 **安全与权限隔离、渠道能力修复、插件生命周期、CLI 用户管理、配置与运行时稳定性** 等方向。  
值得关注的是，社区新报了一个 **S0 级内存隔离安全问题**，并且已经出现对应修复 PR，响应速度较快。与此同时，WhatsApp Web、Lark/飞书、语音转写等渠道相关问题也有明确修复动作，说明项目正在补齐多渠道 Agent 输入能力的一致性。  
整体来看，ZeroClaw 今日健康度偏积极：问题发现密集、修复跟进及时，但待合并 PR 数量较多，短期内维护者需要重点关注 Review 与合并节奏，避免积压扩大。

---

## 2. 项目进展

今日无新版本发布，因此本节聚焦已关闭/合并的重要 PR 与对项目推进的影响。

### 已关闭/合并的重要 PR

#### 1. 修复显式上下文预算被错误限制的问题  
- PR：[#11260 fix(config): stop clamping explicit context budgets to the 32k fallback stub](https://github.com/zeroclaw-labs/zeroclaw/pull/11260)  
- 状态：CLOSED  
- 影响范围：`agent`、`config`、`gateway`、`runtime`、文档  
- 推进内容：  
  该 PR 修复了当 provider profile 未声明 `context_window` 时，系统错误地将显式配置的上下文预算钳制到 32k fallback stub 的问题。  
- 项目意义：  
  这属于运行时容量配置的关键修复，能够避免用户明明配置了更高上下文预算，却被系统回退逻辑意外限制。对长上下文 Agent、RAG、复杂工具链调用场景都有直接影响。  
- 健康度信号：  
  这是配置与运行时边界上的稳定性修复，有助于降低“配置正确但行为异常”的用户困惑。

#### 2. 升级 Wasmtime 以应对 RustSec 安全公告  
- PR：[#11253 fix/deps: bump wasmtime to 48.0.x for RUSTSEC-2026-0313..0316](https://github.com/zeroclaw-labs/zeroclaw/pull/11253)  
- 状态：CLOSED  
- 影响范围：依赖、安全、WASM runtime  
- 推进内容：  
  将插件宿主使用的 Wasmtime 从受影响版本升级到 48.0.x，以响应 2026-09-24 发布的多个 RustSec advisory。  
- 项目意义：  
  ZeroClaw 的插件体系依赖 WASM runtime，Wasmtime 安全更新对插件隔离与执行安全非常关键。  
- 健康度信号：  
  安全依赖问题被快速处理，说明维护团队对供应链安全和 CI 必需门禁较为敏感。

#### 3. 补充 link body 零长度限制测试  
- PR：[#11245 test(link): cover zero length body limits](https://github.com/zeroclaw-labs/zeroclaw/pull/11245)  
- 状态：CLOSED  
- 影响范围：channel/link enrichment 测试  
- 推进内容：  
  增加对 link body extraction 中零字符限制场景的测试覆盖。  
- 项目意义：  
  虽然是小型测试 PR，但有助于锁定边界行为，防止链接内容提取逻辑在极端配置下回归。

> 注：数据概览显示今日共有 5 条 PR 已合并/关闭，但提供的 PR 明细中仅展示了部分关闭项。以上为可从当前数据中明确识别的重要关闭 PR。

---

## 3. 社区热点

今日 Issues 的评论量整体不高，最高评论数为 2；PR 评论数字段未提供，因此热点主要根据严重程度、影响面、是否已有修复 PR、以及功能战略意义综合判断。

### 1. 配置 Cron 调度无法通过 Config API 写入  
- Issue：[#11237 Bug: config editor cannot write declarative cron schedule](https://github.com/zeroclaw-labs/zeroclaw/issues/11237)  
- 状态：OPEN  
- 评论：2  
- 严重程度：S1  
- 诉求分析：  
  用户希望通过 `/config/cron` dashboard editor 或 config API 作者化配置拥有的 scheduled job，但当前 declarative schedule 虽然可读，却无法正确写回。  
- 背后痛点：  
  对于个人 AI 助手和自动化 Agent 来说，定时任务是核心能力之一。如果配置层无法写入 cron schedule，会阻塞用户通过 UI/API 管理自动化工作流。  
- 是否已有 fix PR：当前数据中未看到明确关联修复 PR。

### 2. Owned session 内存隔离存在高风险绕过  
- Issue：[#11239 Bug: owned sessions reach the shared memory plane through spawn_subagent and execute_pipeline](https://github.com/zeroclaw-labs/zeroclaw/issues/11239)  
- 状态：OPEN  
- 标签：`bug`、`memory`、`security`、`tool:delegate`、`risk:high`  
- 严重程度：S0  
- 诉求分析：  
  principal-bound / owned session 本应只访问 owner 私有 memory plane，但 `spawn_subagent` 与 `execute_pipeline` 两条工具路径仍可能使用未按 owner scope 限定的 memory handle。  
- 背后痛点：  
  这是多用户、多租户、委托子 Agent 场景下的核心安全边界问题。一旦 owned session 可以触达 shared memory plane，就可能造成数据泄露或越权读写。  
- 关联修复 PR：  
  [#11266 fix(memory): keep owned-session subagent and pipeline memory private](https://github.com/zeroclaw-labs/zeroclaw/pull/11266)  
- 健康度判断：  
  这是今日最关键的问题之一。好消息是修复 PR 已经在同日打开，响应速度较快。

### 3. WhatsApp Web 图片处理能力补齐  
- Issue：[#11255 Feature: Save inbound WhatsApp Web images to the workspace and mark them like Telegram](https://github.com/zeroclaw-labs/zeroclaw/issues/11255)  
- 状态：OPEN  
- 评论：1  
- 诉求分析：  
  用户希望 WhatsApp Web 入站图片像 Telegram 一样保存到 workspace，并以 `[IMAGE:<path>]` marker 传递给 Agent。  
- 关联 PR：  
  [#11259 feat(channels/whatsapp-web): save inbound images and mark them like Telegram](https://github.com/zeroclaw-labs/zeroclaw/pull/11259)  
- 背后痛点：  
  多渠道 Agent 用户期望不同 IM 渠道的媒体输入语义一致，否则同一个 Agent 在 Telegram 与 WhatsApp 上会表现不一致。

### 4. 文档检索/RAG 能力 RFC  
- Issue：[#11235 RFC: Knowledge corpus — document retrieval RAG for the agent](https://github.com/zeroclaw-labs/zeroclaw/issues/11235)  
- 状态：OPEN  
- 评论：1  
- 诉求分析：  
  提议引入 Knowledge corpus / document retrieval 能力，使 Agent 能够基于操作员维护的文档、语言和工具文档、OS 参考、安全标准等回答问题。  
- 背后痛点：  
  这是 ZeroClaw 从“工具型 Agent”迈向“知识增强型个人/组织助手”的路线图信号。  
- 当前判断：  
  该 RFC 是能力边界级别的新子系统提案，短期未必进入下一版本，但长期战略价值较高。

### 5. A2A 协议 crate RFC  
- Issue：[#11254 RFC: A2A protocol crate zeroclaw-a2a](https://github.com/zeroclaw-labs/zeroclaw/issues/11254)  
- 状态：OPEN  
- 诉求分析：  
  提议将 A2A wire model、outbound client、inbound discovery 等能力整理为独立协议 crate。  
- 背后痛点：  
  随着 Agent-to-Agent 能力逐步扩展，协议模型分散在多个边界中会增加维护成本。独立 crate 有助于统一契约与复用。  
- 当前判断：  
  这是架构级重构信号，若被接受，可能影响后续 A2A 相关开发组织方式。

---

## 4. Bug 与稳定性

以下按严重程度排序，并标注当前是否已有对应修复 PR。

### S0：Owned session 通过子 Agent / pipeline 访问共享内存平面  
- Issue：[#11239](https://github.com/zeroclaw-labs/zeroclaw/issues/11239)  
- 严重程度：S0，数据丢失 / 安全风险  
- 影响组件：memory、delegate tool、pipeline  
- 问题摘要：  
  owned session 本应限制在 owner 私有 memory plane，但 `spawn_subagent` 和 `execute_pipeline` 可能创建或持有未按 owner scoped 的 memory handle。  
- 风险：  
  可能导致跨用户、跨 session 的隐私数据访问，属于高优先级安全边界问题。  
- Fix PR：  
  已有修复 PR：[#11266 fix(memory): keep owned-session subagent and pipeline memory private](https://github.com/zeroclaw-labs/zeroclaw/pull/11266)  
- 建议：  
  优先 Review 和合并 #11266，并补充针对 owned session、subagent、pipeline 的回归测试。

### S1：Config editor 无法写入 declarative cron schedule  
- Issue：[#11237](https://github.com/zeroclaw-labs/zeroclaw/issues/11237)  
- 严重程度：S1，阻塞配置拥有的 scheduled job 作者化  
- 影响组件：config/onboarding、gateway/api、`/config/cron` dashboard editor  
- 问题摘要：  
  `config.toml` 中 declarative schedule 可加载、可读，但通过配置编辑器或 API 写入存在问题。  
- Fix PR：未见明确关联 PR。  
- 建议：  
  维护者应尽快确认 schema 序列化、tagged object 写回路径，以及 dashboard editor 与 gateway API 的一致性。

### S2：Validation results 可能在未执行检查或未测量计算值时写入报告  
- Issue：[#11233](https://github.com/zeroclaw-labs/zeroclaw/issues/11233)  
- 严重程度：S2  
- 影响组件：unknown  
- 问题摘要：  
  报告中可能写入了并未实际运行的 validation check，或写入未测量的 computed values。  
- 用户来源：  
  DefuzeX 使用其开源 SDK KUMA 做 AI Agent 行为安全测试时发现。  
- 风险：  
  这会损害验证报告可信度，尤其影响安全、合规、自动化评估场景。  
- Fix PR：未见明确关联 PR。  
- 建议：  
  需要优先厘清 validation pipeline 的执行状态、结果来源与报告生成之间的契约，避免“看似通过但实际未验证”的假阳性。

### S2：WhatsApp Web 丢失图片、视频、文档 caption  
- Issue：[#11257](https://github.com/zeroclaw-labs/zeroclaw/issues/11257)  
- 严重程度：S2  
- 影响组件：channel / WhatsApp Web  
- 问题摘要：  
  入站图片、视频、文档的 caption 被丢弃，Agent 只能看到 `[Image]`、`[Video]`、`[Document]` placeholder，无法看到用户随媒体发送的文字。  
- Fix PR：当前数据中未见明确关联修复 PR。  
- 建议：  
  应与 #11259 的图片保存逻辑协同处理，将媒体 marker 与 caption 合并为完整 Agent 输入。

### S3：`initial_prompt` 已文档化但未发送给 Groq/OpenAI transcription  
- Issue：[#11256](https://github.com/zeroclaw-labs/zeroclaw/issues/11256)  
- 严重程度：S3  
- 影响组件：channel / transcription  
- 问题摘要：  
  `initial_prompt` 被配置和文档接受，声称会发送到 Whisper API，但 Groq 和 OpenAI transcription provider 实际没有发送该字段。  
- Fix PR：  
  已有修复 PR：[#11258 fix(channels): send initial_prompt to Groq and OpenAI transcription](https://github.com/zeroclaw-labs/zeroclaw/pull/11258)  
- 建议：  
  合并前应确认不同 provider 的 API 字段名、兼容性，以及是否需要补充集成测试。

---

## 5. 功能请求与路线图信号

### 1. WhatsApp Web 入站图片持久化与 Telegram 对齐  
- Issue：[#11255](https://github.com/zeroclaw-labs/zeroclaw/issues/11255)  
- PR：[#11259](https://github.com/zeroclaw-labs/zeroclaw/pull/11259)  
- 路线图信号：  
  多渠道媒体输入能力正在向统一抽象收敛。Telegram 已有 `[IMAGE:<path>]` marker 体验，WhatsApp Web 正在补齐。  
- 进入下一版本可能性：高  
  因为已有实现 PR，且范围相对明确。

### 2. Lark/飞书富文本 post 消息中的图片解析  
- PR：[#11267 fix(channels/lark): parse image elements in Feishu post messages](https://github.com/zeroclaw-labs/zeroclaw/pull/11267)  
- 路线图信号：  
  企业协作渠道正在增强多模态/富文本消息解析能力。  
- 进入下一版本可能性：较高  
  修复目标清晰，属于渠道兼容性补丁。

### 3. 插件更新与受验证替换流程  
- PR：[#11261 feat(plugins): replace an installed package through staged admission](https://github.com/zeroclaw-labs/zeroclaw/pull/11261)  
- PR：[#11262 feat(cli): add zeroclaw plugin update with verified replacement](https://github.com/zeroclaw-labs/zeroclaw/pull/11262)  
- 路线图信号：  
  ZeroClaw 插件生态正在从“安装/列出”走向更完整的生命周期管理，包括 staged admission、verified replacement、rollback 等。  
- 进入下一版本可能性：中高  
  但两个 PR 为 stacked 关系，需要先合并 host half，再合并 CLI 层。

### 4. 本地 roster 密码认证与用户管理 CLI  
- PR：[#11264 feat(security): verify roster passwords through a password auth provider](https://github.com/zeroclaw-labs/zeroclaw/pull/11264)  
- PR：[#11265 feat(cli): zeroclaw user commands for roster password lifecycle](https://github.com/zeroclaw-labs/zeroclaw/pull/11265)  
- 路线图信号：  
  项目正在补齐本地身份认证与管理员初始化能力，尤其是 first admin、密码轮换、禁用密码、忘记密码修复等运维场景。  
- 进入下一版本可能性：中高  
  但 #11265 依赖 #11264，合并顺序和安全审查较关键。

### 5. Zerocode Config 面板新增只读 plugins 子标签  
- PR：[#11263 feat(zerocode): add a read-only plugins sub-tab to the Config pane](https://github.com/zeroclaw-labs/zeroclaw/pull/11263)  
- 路线图信号：  
  Zerocode/TUI 正在成为可观测和配置管理入口，不只是 CLI 的附属界面。  
- 进入下一版本可能性：中  
  属于 UI/可视化增强，风险相对可控。

### 6. Knowledge corpus / RAG  
- RFC：[#11235](https://github.com/zeroclaw-labs/zeroclaw/issues/11235)  
- 路线图信号：  
  社区希望 Agent 可以基于本地或运营者维护的文档进行问答。  
- 进入下一版本可能性：低到中  
  这是新子系统级别能力，预计需要设计评审、存储/索引/检索/权限模型讨论。

### 7. A2A protocol crate  
- RFC：[#11254](https://github.com/zeroclaw-labs/zeroclaw/issues/11254)  
- 路线图信号：  
  Agent-to-Agent 协议相关能力可能被抽象为独立 crate，降低跨边界维护成本。  
- 进入下一版本可能性：中  
  若已有 A2A 相关代码基础，抽 crate 可能比全新功能更快落地，但仍涉及架构边界调整。

---

## 6. 用户反馈摘要

### 1. 用户对“配置即事实来源”的期望很强  
- 代表 Issue：[#11237](https://github.com/zeroclaw-labs/zeroclaw/issues/11237)  
- 用户痛点：  
  declarative `config.toml` 能读不能写，会破坏用户对配置 API 和 dashboard editor 的信任。  
- 使用场景：  
  用户希望通过配置界面或 API 管理定时 Agent 任务，而不是只能手工修改文件。

### 2. 多渠道输入一致性是用户的核心诉求  
- 代表 Issue：[#11255](https://github.com/zeroclaw-labs/zeroclaw/issues/11255)、[#11257](https://github.com/zeroclaw-labs/zeroclaw/issues/11257)  
- 用户痛点：  
  Telegram 可以传递图片路径 marker，但 WhatsApp Web 只能给 Agent 一个 `[Image]` 占位符；媒体 caption 也会丢失。  
- 使用场景：  
  用户通过 WhatsApp 发送截图、照片、文档并附带说明，希望 Agent 能同时理解媒体和文字上下文。

### 3. 文档与实际行为不一致会迅速暴露  
- 代表 Issue：[#11256](https://github.com/zeroclaw-labs/zeroclaw/issues/11256)  
- 用户痛点：  
  `initial_prompt` 文档写明会发送给 Whisper API，但实际 provider 未发送。  
- 影响：  
  这会导致用户调试语音转写时误以为 prompt 生效，从而浪费时间。

### 4. 安全测试社区开始关注 Agent 实际行为验证  
- 代表 Issue：[#11233](https://github.com/zeroclaw-labs/zeroclaw/issues/11233)  
- 用户痛点：  
  validation report 如果包含未实际执行的检查结果，会削弱行为安全测试结果的可信度。  
- 使用场景：  
  外部安全测试工具 KUMA 对 ZeroClaw Agent 行为做验证，说明项目开始受到 Agent 安全评估生态的关注。

### 5. 用户正在推动 ZeroClaw 走向知识型与协作型 Agent  
- 代表 RFC：[#11235](https://github.com/zeroclaw-labs/zeroclaw/issues/11235)、[#11254](https://github.com/zeroclaw-labs/zeroclaw/issues/11254)  
- 用户诉求：  
  一方面希望 Agent 能读组织文档、技术文档和标准；另一方面希望 A2A 协议能力更加模块化、可维护。  
- 说明：  
  社区关注点已从基础可用性扩展到知识管理、协议互操作和多 Agent 协作。

---

## 7. 待处理积压

当前数据仅覆盖过去 24 小时，未提供长期未响应 Issue/PR 的完整时间线，因此无法严格判断“长期未响应”。但从今日数据看，以下事项应被维护者优先关注，避免形成高风险积压。

### 高优先级待处理

#### 1. S0 内存隔离安全问题需尽快合并修复  
- Issue：[#11239](https://github.com/zeroclaw-labs/zeroclaw/issues/11239)  
- Fix PR：[#11266](https://github.com/zeroclaw-labs/zeroclaw/pull/11266)  
- 建议：  
  优先安排安全 Review、补充回归测试并尽快合并。

#### 2. S1 Cron config 写入阻塞暂无明确修复 PR  
- Issue：[#11237](https://github.com/zeroclaw-labs/zeroclaw/issues/11237)  
- 建议：  
  这是 workflow-blocking 问题，建议维护者尽快分配 owner，并确认是否属于 API 序列化、dashboard editor、或 config schema 的责任边界问题。

#### 3. Validation report 可信度问题需要 triage  
- Issue：[#11233](https://github.com/zeroclaw-labs/zeroclaw/issues/11233)  
- 建议：  
  该问题影响安全测试与自动化验证可信度，即使组件暂未明确，也应尽快标注 owner 和复现路径。

#### 4. WhatsApp Web caption 丢失问题尚无明确修复 PR  
- Issue：[#11257](https://github.com/zeroclaw-labs/zeroclaw/issues/11257)  
- 相关 PR：[#11259](https://github.com/zeroclaw-labs/zeroclaw/pull/11259) 处理图片保存，但不一定覆盖 caption 丢失  
- 建议：  
  可考虑将媒体保存、marker 生成、caption 合并统一设计，避免后续继续出现渠道行为不一致。

### 待合并 PR 积压风险

过去 24 小时共有 31 条 PR 更新，其中 26 条待合并。以下 PR 体量较大或涉及关键路径，建议维护者明确 Review 优先级：

- [#11264 feat(security): verify roster passwords through a password auth provider](https://github.com/zeroclaw-labs/zeroclaw/pull/11264)  
- [#11265 feat(cli): zeroclaw user commands for roster password lifecycle](https://github.com/zeroclaw-labs/zeroclaw/pull/11265)  
- [#11261 feat(plugins): replace an installed package through staged admission](https://github.com/zeroclaw-labs/zeroclaw/pull/11261)  
- [#11262 feat(cli): add zeroclaw plugin update with verified replacement](https://github.com/zeroclaw-labs/zeroclaw/pull/11262)  
- [#11263 feat(zerocode): add a read-only plugins sub-tab to the Config pane](https://github.com/zeroclaw-labs/zeroclaw/pull/11263)  
- [#11266 fix(memory): keep owned-session subagent and pipeline memory private](https://github.com/zeroclaw-labs/zeroclaw/pull/11266)  

这些 PR 覆盖安全、CLI、插件系统、TUI、内存隔离等关键模块。若 Review 堆积，可能拖慢下一版本节奏，并增加 stacked PR 冲突成本。

---

## 总体健康度判断

ZeroClaw 今日活跃度高，社区反馈集中且质量较高，问题报告通常包含明确影响范围与复现/代码线索。项目在安全、插件、渠道、多模态输入、用户认证、配置管理等方向都有实质推进，显示出较强的工程动能。  
主要风险在于：**待合并 PR 较多、关键安全修复仍未落地、若干 S1/S2 问题暂无明确修复 PR**。建议维护团队短期将 Review 资源优先投向 #11266、#11237、#11233、#11257 及其相关实现，以保持项目稳定性与用户信任。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*