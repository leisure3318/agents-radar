# OpenClaw 生态日报 2026-10-14

> Issues: 44 | PRs: 46 | 覆盖项目: 13 个 | 生成时间: 2026-10-14 13:15 UTC

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

# OpenClaw 项目动态日报｜2026-10-14

## 1. 今日速览

过去 24 小时 OpenClaw 维持了**极高活跃度**：Issues 更新 44 条，其中 25 条仍处于新开或活跃状态，19 条已关闭；PR 更新 46 条，其中 42 条仍待合并，4 条已合并或关闭。  
今日主题明显集中在 **Gateway 启动/维护诊断、更新失败、会话状态一致性、Guest 权限体验、SQLite/WAL 稳定性、Web UI Solid 迁移** 等方向。  
从健康度看，项目响应速度较快，多个当天报告的问题已经出现对应修复 PR；但高优先级稳定性问题仍较多，尤其是 P0/P1 更新失败、崩溃循环、会话恢复、事务阻塞等。  
今日没有新版本发布，因此当前开发主要处于修复积累与下一版本候选变更准备阶段。

---

## 2. 版本发布

今日无新版本发布。  
最新 Releases 数据为空。

---

## 3. 项目进展

过去 24 小时共有 46 条 PR 更新，其中 4 条已合并或关闭，42 条仍处于待合并状态。可见数据中已关闭的重要 PR 如下：

### 已关闭 / 完成的 PR

- [PR #171557 - refactor(ui): consolidate session identity rendering in Solid](https://github.com/openclaw/openclaw/pull/171557)  
  **状态：Closed**  
  该 PR 将 Solid 侧边栏、聊天头部、分享菜单、命令面板中的 session identity 渲染统一到 Solid 实现，移除旧 Lit template 依赖。  
  **意义：** 推进 Web UI 从 Lit 向 Solid 的迁移，降低前端渲染链路复杂度。  
  **用户影响：** 预期无明显行为变化，但有助于减少 UI 维护成本和未来回归风险。

### 今日仍在推进、值得关注的修复 PR

虽然多数 PR 尚未合并，但不少已经具备清晰问题范围，部分标记为 proof sufficient 或 ready for maintainer look：

- [PR #172114 - fix: save guest project choices in New Session](https://github.com/openclaw/openclaw/pull/172114)  
  关联 Guest 新会话项目选择无法保存问题。  
  对应 Issue：[Issue #172083](https://github.com/openclaw/openclaw/issues/172083)  
  **状态：Open，ready for maintainer look**  
  **影响：** 修复 Guest 用户在 New Session 中选择项目后刷新丢失的问题。

- [PR #172137 - fix: guest commands fail during workspace checkpoints](https://github.com/openclaw/openclaw/pull/172137)  
  对应 Issue：[Issue #172106](https://github.com/openclaw/openclaw/issues/172106)  
  **状态：Open，waiting on author**  
  **影响：** 解决 Guest 在托管项目中执行命令时，因前一个后台命令正在 checkpoint workspace 导致 sandbox 暂停而失败的问题。

- [PR #172117 - fix(mac): long exec commands through the macOS app node fail after 20 seconds](https://github.com/openclaw/openclaw/pull/172117)  
  **状态：Open，ready for maintainer look，P1**  
  **影响：** 修复通过 macOS app node 执行长命令约 20 秒后失败的问题，改善 macOS companion app 作为执行节点的稳定性。

- [PR #172110 - fix(cli): avoid session ID failures after gateway startup](https://github.com/openclaw/openclaw/pull/172110)  
  **状态：Open**  
  **影响：** 修复 Gateway 刚 ready 但 session store 尚未初始化时，`openclaw agent --session-id <id>` 间歇失败的问题。

- [PR #172132 - fix(update): Doctor fails after short commands complete](https://github.com/openclaw/openclaw/pull/172132)  
  **状态：Open**  
  **影响：** 修复短命令完成后 Doctor 输出完成但原生更新仍失败的问题，属于更新链路稳定性修复。

- [PR #172080 - fix: preserve inbound messages when queued turn preparation fails](https://github.com/openclaw/openclaw/pull/172080)  
  对应 Issue：[Issue #171837](https://github.com/openclaw/openclaw/issues/171837)  
  **状态：Open**  
  **影响：** 避免 queued turn 准备阶段失败时 inbound message 丢失，属于 message-loss 防护。

- [PR #172134 - fix(code-mode): stop GC thrash and bound captured output](https://github.com/openclaw/openclaw/pull/172134)  
  **状态：Open**  
  **影响：** 限制 Code Mode 输出捕获并在 worker 接近 heap limit 且持续 major GC 时主动 retire，改善内存稳定性。

- [PR #172138 - fix: retain causes in startup maintenance warnings](https://github.com/openclaw/openclaw/pull/172138)  
  **状态：Open**  
  **影响：** Gateway post-ready maintenance warnings 将保留 nested cause 和 storage error code，提高运维可诊断性。

- [PR #172143 - fix: let real-Gateway CI finish after its tests pass](https://github.com/openclaw/openclaw/pull/172143)  
  **状态：Open**  
  **影响：** 修复 real-Gateway CI 测试通过后仍因整体 job deadline 被取消的问题，改善 CI 可信度。

### 项目整体推进评估

今日推进主要集中在三个方向：

1. **稳定性与可诊断性增强**：Gateway startup、Doctor、update、WAL maintenance、CI、macOS exec 等均有修复 PR。
2. **权限与 Guest 体验修复**：Guest project choice、Guest command checkpoint、Guest attachment 访问等问题集中出现。
3. **Web UI 技术栈迁移**：多个 PR 继续推进 Lit 到 Solid 的重构，属于长期架构清理工作。

从数据看，今日“问题发现”和“修复提交”均很活跃，但 42 个 PR 仍待合并，说明维护者 review/merge 压力较高。

---

## 4. 社区热点

### 1. Doctor NOCOW repair 在旧 Linux 上过晚失败

- [Issue #171933 - doctor NOCOW repair: refusal on Linux < 4.7 arrives only after a full per-file inventory](https://github.com/openclaw/openclaw/issues/171933)  
  **状态：Closed**  
  **评论数：7，今日最活跃 Issue**  
  **标签：P2、diamond lobster、source-repro、queueable-fix**

**问题概述：**  
在 Linux 4.4 + btrfs 环境下，`doctor --fix` 会先对 SQLite store 目录逐文件执行 inventory/getfacl，之后才发现当前内核缺少 `RENAME_EXCHANGE` 等能力，导致修复不可执行。用户认为失败应该更早暴露，避免长时间无效扫描。

**背后诉求：**  
用户需要 Doctor 工具在平台能力不满足时更早 fail-fast，减少大规模文件扫描带来的等待和误导。

---

### 2. Gateway 启动失败只输出泛化错误，systemd crash loop 无法诊断

- [Issue #172053 - Gateway startup failure prints only generic CLI command failed](https://github.com/openclaw/openclaw/issues/172053)  
  **状态：Closed**  
  **评论数：5**  
  **标签：P2、linked-pr-open、maturity:stable、impact:ux-friction**

**问题概述：**  
Gateway 启动失败时仅输出：

```text
[openclaw] The CLI command failed.
[openclaw] For help, run `openclaw doctor`.
```

缺少 `Reason:`、stack 或底层错误原因，使 systemd journal 中的 crash loop 难以定位。

**背后诉求：**  
稳定运行 OpenClaw 的用户更需要运维级可诊断信息，而不是面向普通用户的泛化错误提示。

相关方向 PR：

- [PR #172138 - fix: retain causes in startup maintenance warnings](https://github.com/openclaw/openclaw/pull/172138)
- [PR #172120 - fix: surface ACP startup session-scan failures](https://github.com/openclaw/openclaw/pull/172120)

---

### 3. SQLite 事务永久打开，阻塞 WAL checkpoint

- [Issue #172091 - worker SQLite transaction stays open forever behind unanswered cross-thread admission wait](https://github.com/openclaw/openclaw/issues/172091)  
  **状态：Open**  
  **评论数：4**  
  **标签：P2、needs-maintainer-review、needs-info、impact:other**

**问题概述：**  
Windows x64 环境下，worker thread 的 SQLite write transaction 可能在跨线程 admission wait 未响应时永久保持打开，进而阻塞 shared-state WAL checkpoints。

**背后诉求：**  
用户关注长期运行稳定性，尤其是重启后 shared-state 数据库维护是否会被单个悬挂事务永久拖住。

**当前状态：**  
仍需维护者 review 和更多信息，暂无明确 fix PR。

---

### 4. Doctor session migration 遇到重复 session header 时拒绝完成

- [Issue #172109 - Doctor refuses session migration when a JSONL has two session headers with the same id](https://github.com/openclaw/openclaw/issues/172109)  
  **状态：Open**  
  **评论数：4**  
  **标签：P1、session-state、crash-loop、diamond lobster、queueable-fix**

**问题概述：**  
当 legacy JSONL 中存在两个相同 event id 但 timestamp 不同的 session header 时，`openclaw doctor --fix` 无法完成 session migration。

**背后诉求：**  
用户希望 Doctor 在面对历史数据异常时能够容错、去重或给出可执行修复路径，而不是阻塞整个迁移。

**风险：**  
该问题标记 P1，影响 session-state 和 crash-loop，是今日最需要优先处理的开放问题之一。

---

### 5. `/compact` 后 WebChat 渲染出陈旧 assistant reply

- [Issue #172048 - After /compact, webchat renders a stale pre-compact assistant reply](https://github.com/openclaw/openclaw/issues/172048)  
  **状态：Closed**  
  **评论数：4**

**问题概述：**  
在长会话执行 `/compact` 后，下一条 assistant 回复中混入压缩前的旧回复内容，表现为 UI 层历史拼接异常。

**背后诉求：**  
用户希望长会话压缩后，WebChat 和 TUI/Gateway 的历史状态保持一致，避免展示层污染新回复。

---

## 5. Bug 与稳定性

以下按严重程度和影响面排序。

### P0 / Release blocker 类问题

#### 更新失败：global-install-failed

- [Issue #172100 - Update failure: global-install-failed 2026.9.4](https://github.com/openclaw/openclaw/issues/172100)  
  **状态：Closed**  
  **标签：P0、impact:ux-release-blocker**

用户在 Linux x64、Node 26.8.1、OpenClaw 2026.9.4 环境下报告全局安装更新失败。该类自动生成 update failure report 说明 OpenClaw 内置更新诊断正在捕获失败现场。

---

#### 更新失败：managed-service-update-handoff

- [Issue #172063 - Update failure: managed-service-update-handoff 2026.9.8](https://github.com/openclaw/openclaw/issues/172063)  
  **状态：Closed**  
  **标签：P0、impact:ux-release-blocker**

发生在 macOS arm64、Node 26.7.0 环境下，涉及 Gateway 托管服务更新交接失败。

---

#### 更新失败：requested

- [Issue #171974 - Update failure: requested 2026.9.9](https://github.com/openclaw/openclaw/issues/171974)  
  **状态：Closed**  
  **标签：P0、impact:ux-release-blocker**

同样是自动确认的更新失败报告，发生在 macOS arm64。

---

#### update 被 stale `update-recovery-pending` 阻塞

- [Issue #171955 - openclaw update blocked by stale update-recovery-pending](https://github.com/openclaw/openclaw/issues/171955)  
  **状态：Closed**  
  **标签：P0、maturity:stable、impact:ux-release-blocker**

更新已完成到 `publication-complete` 阶段后，仍残留 `update-recovery-pending`，导致后续 `openclaw update` 被拒绝。  
**影响：** 这是高风险更新状态机问题，容易导致用户无法升级或需要人工介入。

---

### P1 高优先级稳定性问题

#### Doctor session migration 因重复 header 失败

- [Issue #172109](https://github.com/openclaw/openclaw/issues/172109)  
  **状态：Open**  
  **是否已有 fix PR：未见明确 PR，但标签显示 queueable-fix / fix-shape-clear**  
  **影响：session-state、crash-loop**

该问题可能阻塞 legacy session migration，应优先处理。

---

#### macOS x64 更新失败，snapshot cleanup repair 不收敛

- [Issue #172104 - macOS x64 2026.10.1 -> 2026.10.3 update fails snapshot cleanup](https://github.com/openclaw/openclaw/issues/172104)  
  **状态：Open**  
  **是否已有 fix PR：未见明确 PR**  
  **影响：crash-loop、stable**

用户在 macOS Intel npm-global 安装上从 2026.10.1 更新到 2026.10.3 失败，且文档中的 repair 路径无法收敛。

---

#### MCP runtime slots 硬编码 256，无管理清理路径

- [Issue #172055 - Hardcoded 256 cap with no admin path to clear it](https://github.com/openclaw/openclaw/issues/172055)  
  **状态：Open**  
  **是否已有 fix PR：未见明确 PR**  
  **标签：P1、platinum hermit、impact:ux-friction**

当 bundle-MCP runtime 达到 256 个 server-holding runtime 后，节点拒绝新连接，且 `openclaw mcp` 相关重置无法清理该 cap，只能硬重启进程。  
**风险：** 长期运行或多 agent 环境容易触发，属于运维体验与可用性问题。

---

#### A2A queued followup 导致 agent↔agent ack loop

- [Issue #171985 - A2A queued followup sends host notices to peer as messages](https://github.com/openclaw/openclaw/issues/171985)  
  **状态：Closed**  
  **标签：P1、impact:message-loss、diamond lobster**

A2A 场景下，busy session 中 queued followup 会把 host notices 当作消息发给 peer，可能造成 agent-to-agent ack loop。  
**影响：** 影响多 agent 通信可靠性和 message-loss 风险。

---

#### isolated cron run rows 复制 base usageFamilySessionIds 导致 OOM

- [Issue #171913 - isolated cron run rows copy base usageFamilySessionIds, worker OOM](https://github.com/openclaw/openclaw/issues/171913)  
  **状态：Closed**  
  **标签：P1、impact:session-state、impact:crash-loop**

Cron maintenance worker 每分钟发生 `ERR_WORKER_OUT_OF_MEMORY`，原因是 isolated cron run rows 复制了 base row 的 usageFamilySessionIds，造成 O(n²) 数据膨胀。

---

#### macOS app node 长命令 20 秒后失败

- [PR #172117 - fix(mac): long exec commands through the macOS app node fail after 20 seconds](https://github.com/openclaw/openclaw/pull/172117)  
  **状态：Open，ready for maintainer look，P1**  
  **是否已有 fix PR：已有**

修复 macOS companion app exec host 在长命令场景下提前判定 unavailable 的问题。

---

### P2 中高优先级问题

#### Guest project choices 无法保存

- [Issue #172083 - Guest project choices fail to save in New Session](https://github.com/openclaw/openclaw/issues/172083)  
  **状态：Open**  
  **Fix PR：** [PR #172114](https://github.com/openclaw/openclaw/pull/172114)

Guest 在 New Session 中选择项目后，保存失败并在 reload 后丢失。  
**影响：** 直接影响 Guest 用户的入门与项目切换体验。

---

#### Guest commands 在 workspace checkpoint 期间失败

- [Issue #172106 - Guest commands can fail while previous workspace checkpoint pauses sandbox](https://github.com/openclaw/openclaw/issues/172106)  
  **状态：Open**  
  **Fix PR：** [PR #172137](https://github.com/openclaw/openclaw/pull/172137)

托管项目中，前一个后台命令完成后的 workspace checkpoint 会暂停 sandbox，导致 Guest 后续命令失败。

---

#### Guest reader 无法打开可读消息附件

- [Issue #172130 - Guest readers cannot open attachments on readable messages](https://github.com/openclaw/openclaw/issues/172130)  
  **状态：Open**  
  **是否已有 fix PR：未见明确 PR**

Guest 有 narrow session read permission，可以读取 conversation 和 messages，但无法打开其附件。  
**影响：** 权限模型中“消息可读但附件不可读”的不一致会造成协作体验割裂。

---

#### Foreign memory-provider diagnostics 绕过 SecretRef

- [Issue #172098 - Foreign memory-provider CLI/doctor probes bypass SecretRef resolution](https://github.com/openclaw/openclaw/issues/172098)  
  **状态：Open**  
  **标签：P2、auth-provider、ux-friction、queueable-fix**

Memory provider 的 CLI/doctor probes 未正确 materialize SecretRef，导致 Hindsight 报 `Invalid API key`。  
**影响：** 诊断工具和实际运行路径不一致，易误导用户判断 provider 配置失败。

---

#### Markdown frontmatter 被 path set 意外丢弃

- [Issue #172123 - path set discards unrelated Markdown frontmatter during body edits](https://github.com/openclaw/openclaw/issues/172123)  
  **状态：Open**  
  **标签：P2、impact:data-loss、linked-pr-open**

`openclaw path set` 在编辑 body 字段或追加 section 时，可能静默丢弃 unrelated Markdown frontmatter。  
**影响：** 标记为 data-loss，应尽快确认对应 PR 质量。

---

#### WAL maintenance 对预期 checkpoint contention 发出误导警告

- [Issue #172118 - WAL maintenance warns on expected single-pass checkpoint contention](https://github.com/openclaw/openclaw/issues/172118)  
  **状态：Open**  
  **标签：P2、linked-pr-open**

当 reader 阻塞 checkpoint 时，maintenance 每 tick 记录 warning，即便这是预期的单次 contention。  
**影响：** 增加运维噪音，可能掩盖真实故障。

---

#### Remote TUI 被 background subsystem logs 覆盖

- [Issue #172119 - background subsystem logs overwrite the remote TUI screen](https://github.com/openclaw/openclaw/issues/172119)  
  **状态：Open**  
  **标签：P2、linked-pr-open、ux-friction**

Remote TUI 全屏绘制时，background subsystem logs 直接写入 terminal，覆盖界面。  
**影响：** TUI 可用性问题，尤其影响远程 Gateway 连接场景。

---

#### active-memory lane-1 quick recall 在 2-core 主机上几乎每轮超时

- [Issue #172085 - active-memory lane-1 quick recall times out on almost every turn](https://github.com/openclaw/openclaw/issues/172085)  
  **状态：Open**  
  **标签：P2、platinum hermit、needs-live-repro**

1500ms preflight budget 短于 memory search worker 约 5s 的 cold start，导致低配主机上 active memory recall 经常失败。  
**影响：** 低资源环境下 memory 功能不稳定。

---

## 6. 功能请求与路线图信号

### 系统 Agent 读取 Gateway health

- [Issue #171971 - Let the system agent read gateway health](https://github.com/openclaw/openclaw/issues/171971)  
  **状态：Open**  
  **标签：P2、linked-pr-open**

希望在 system agent 的 direct `openclaw` tool 中暴露只读 `health` action，映射已有 `{ kind: "health" }` canonical operation。  
**路线图信号：** 这是可诊断性和自愈 agent 能力的一部分，且已有 linked PR，进入下一版本概率较高。

---

### 条件式本地 skill 安装，保留恢复内容

- [Issue #172142 - Conditional local skill installation with preserved recovery content](https://github.com/openclaw/openclaw/issues/172142)  
  **状态：Open**

请求新增 opt-in conditional local skill install operation，能在并发编辑和中断恢复场景下给出可重复结果。  
**路线图信号：** 反映 skill 安装正在从简单覆盖走向事务化、可恢复的自动化流程。

---

### Memory 搜索支持 FTS5 trigram fallback 和代码标识符子词切分

- [Issue #172093 - feat(memory): add FTS5 trigram fallback and CamelCase/snake_case sub-tokenization](https://github.com/openclaw/openclaw/issues/172093)  
  **状态：Open**  
  **标签：P2、needs-product-decision、session-state**

用户希望 memory search 能更好支持代码标识符，如 `repairDoctorSqliteNoCow`、`doctor-sqlite-nocow`。  
**路线图信号：** OpenClaw 的 memory 功能正被用于代码库检索场景，现有 FTS tokenization 对开发者体验不足。

---

### 本地执行增加轻量 OS 原生 sandbox

- [Issue #172090 - feat(security): add lightweight native OS process sandboxing](https://github.com/openclaw/openclaw/issues/172090)  
  **状态：Open**  
  **标签：security、P2、needs-security-review、needs-product-decision**

建议在 macOS 使用 Seatbelt，在 Linux 使用 Landlock/Bubblewrap，为 local exec 提供介于 Docker/VM 与 unrestricted host execution 之间的轻量隔离。  
**路线图信号：** 安全边界是当前本地 agent 执行能力的重要路线图议题，但需要安全 review。

---

### Gateway API 支持命名共享 API-key profiles

- [Issue #172045 - Allow named shared API-key profiles through the Gateway API](https://github.com/openclaw/openclaw/issues/172045)  
  **状态：Open**  
  **标签：enhancement、P2、auth-provider、needs-product-decision**

希望管理员可以通过 public Gateway API 创建或更新命名共享 provider API-key profile。  
**路线图信号：** 反映团队/多用户部署中，对集中管理 provider credentials 的需求上升。

---

### sessions_spawn 支持从指定起点 fork branch

- [Issue #172027 - Feature: sessions_spawn child as sessions.fork branch from a chosen start point](https://github.com/openclaw/openclaw/issues/172027)  
  **状态：Open**  
  **标签：P2、needs-product-decision、session-state**

用户希望 agent 能像 Control UI 的 “Fork from here” 一样创建可见分支，而不是只能 isolated 或复制整段请求上下文。  
**路线图信号：** 会话树、分支可视化与 agent-driven workflow 的融合需求增强。

---

## 7. 用户反馈摘要

### 主要痛点

1. **更新链路仍是最集中痛点之一**  
   多个 update failure issue 涉及 macOS arm64、macOS x64、Linux x64、Node 24/26 等环境。用户遇到的问题包括 global install 失败、managed service handoff 失败、snapshot cleanup 不收敛、stale recovery state 阻塞更新。  
   代表 Issue：  
   - [#172100](https://github.com/openclaw/openclaw/issues/172100)  
   - [#172063](https://github.com/openclaw/openclaw/issues/172063)  
   - [#172104](https://github.com/openclaw/openclaw/issues/172104)  
   - [#171955](https://github.com/openclaw/openclaw/issues/171955)

2. **运维诊断信息不足**  
   Gateway 启动失败只输出泛化 CLI 错误，Doctor 在不支持的内核上过晚失败，maintenance warning 丢失 nested cause。  
   用户希望 OpenClaw 面向长期服务部署时提供明确 Reason、error code、stack/cause 和可执行 remediation。  
   代表 Issue / PR：  
   - [Issue #172053](https://github.com/openclaw/openclaw/issues/172053)  
   - [Issue #171933](https://github.com/openclaw/openclaw/issues/171933)  
   - [PR #172138](https://github.com/openclaw/openclaw/pull/172138)

3. **Guest 与协作权限体验存在断点**  
   Guest 能选择项目但无法持久化，能读消息但不能打开附件，命令执行会受到 checkpoint 暂停影响。  
   这说明 Guest 权限模型已经进入真实协作场景验证阶段，用户期待“可读、可执行、可恢复”的一致体验。  
   代表 Issue / PR：  
   - [Issue #172083](https://github.com/openclaw/openclaw/issues/172083)  
   - [PR #172114](https://github.com/openclaw/openclaw/pull/172114)  
   - [Issue #172130](https://github.com/openclaw/openclaw/issues/172130)  
   - [Issue #172106](https://github.com/openclaw/openclaw/issues/172106)  
   - [PR #172137](https://github.com/openclaw/openclaw/pull/172137)

4. **会话状态一致性仍是核心稳定性挑战**  
   `/compact` 后渲染旧回复、restart recovery 未启动即终止、session migration 卡住、Codex context budget 缺失导致过早 compact、idempotency key 在 Gateway restart 后行为不一致。  
   代表 Issue：  
   - [#172048](https://github.com/openclaw/openclaw/issues/172048)  
   - [#172000](https://github.com/openclaw/openclaw/issues/172000)  
   - [#172109](https://github.com/openclaw/openclaw/issues/172109)  
   - [#171854](https://github.com/openclaw/openclaw/issues/171854)  
   - [#171173](https://github.com/openclaw/openclaw/issues/171173)

5. **低资源和长期运行环境暴露更多边界问题**  
   包括 2-core 主机 memory recall 超时、MCP runtime slots 达到 256 无法释放、cron maintenance worker OOM、SQLite transaction/WAL checkpoint 阻塞。  
   代表 Issue：  
   - [#172085](https://github.com/openclaw/openclaw/issues/172085)  
   - [#172055](https://github.com/openclaw/openclaw/issues/172055)  
   - [#171913](https://github.com/openclaw/openclaw/issues/171913)  
   - [#172091](https://github.com/openclaw/openclaw/issues/172091)

### 正向反馈信号

- 自动 update failure report 的结构化输出说明项目已有较成熟的故障采集机制。
- 多个 Issue 在同日出现 linked PR 或 queueable-fix 标签，说明 triage 和修复响应较快。
- Web UI Solid 迁移持续推进，反映维护团队在处理 bug 的同时仍在进行架构债务清理。

### 负向反馈信号

- P0/P1 更新与 crash-loop 问题数量偏多。
- 多个问题需要 live repro、needs-info、needs-product-decision，说明复现路径和产品边界仍需进一步收敛。
- 大量 PR 等待 maintainer review，短期内可能形成 review backlog。

---

## 8. 待处理积压

以下为今日数据中值得维护者优先关注的开放项和可能积压项。

### 高优先级开放 Issue

- [Issue #172109 - Doctor refuses session migration when duplicate session headers exist](https://github.com/openclaw/openclaw/issues/172109)  
  **优先级：P1**  
  **原因：** session-state + crash-loop，且影响 Doctor migration 完成度。

- [Issue #172104 - macOS x64 update fails snapshot cleanup; repair does not converge](https://github.com/openclaw/openclaw/issues/172104)  
  **优先级：P1**  
  **原因：** 更新失败且 repair 不收敛，属于高用户挫败问题。

- [Issue #172055 - MCP runtime slots hard cap 256 without admin reset path](https://github.com/openclaw/openclaw/issues/172055)  
  **优先级：P1**  
  **原因：** 长期运行实例会被 hard cap 卡死，只能硬重启。

- [Issue #172091 - SQLite transaction stays open forever and blocks WAL checkpoints](https://github.com/openclaw/openclaw/issues/172091)  
  **优先级：P2，但稳定性风险高**  
  **原因：** 数据库维护被永久阻塞，可能引发后续性能和一致性问题。

- [Issue #172130 - Guest readers cannot open attachments on readable messages](https://github.com/openclaw/openclaw/issues/172130)  
  **优先级：中高**  
  **原因：** 权限模型不一致，影响协作体验。

- [Issue #172123 - path set discards unrelated Markdown frontmatter](https://github.com/openclaw/openclaw/issues/172123)  
  **优先级：P2，data-loss**  
  **原因：** 涉及静默数据丢失，应尽快确认修复状态。

### 待 Review / 待作者处理 PR

- [PR #172114 - save guest project choices](https://github.com/openclaw/openclaw/pull/172114)  
  **状态：ready for maintainer look**  
  **建议：** Guest 体验修复，范围清晰，可优先 review。

- [PR #172117 - macOS long exec commands fail after 20 seconds](https://github.com/openclaw/openclaw/pull/172117)  
  **状态：ready for maintainer look，P1**  
  **建议：** macOS 执行稳定性问题，建议优先合并或请求补充测试。

- [PR #172141 - queued messages cannot be removed while sessions_send turn is running](https://github.com/openclaw/openclaw/pull/172141)  
  **状态：ready for maintainer look**  
  **建议：** 用户可见交互问题，已有 screenshot proof，可较快处理。

- [PR #172137 - guest commands fail during workspace checkpoints](https://github.com/openclaw/openclaw/pull/172137)  
  **状态：waiting on author**  
  **建议：** 与 Guest 权限和 sandbox checkpoint 相关，需作者尽快补充。

- [PR #172139 - report uncompleted channel probes with failing exit status](https://github.com/openclaw/openclaw/pull/172139)  
  **状态：waiting on author，merge-risk: compatibility**  
  **建议：** 涉及 CLI exit status 兼容性，应明确 breaking/compatibility 影响。

- [PR #172015 - allow Podman gateway link-local for provider-owned embedding origin](https://github.com/openclaw/openclaw/pull/172015)  
  **状态：needs proof，merge-risk: security-boundary**  
  **建议：** 涉及安全边界，需补充证明和安全评估后再推进。

### 架构性积压

- Web UI Solid 迁移 PR 数量较多：  
  - [PR #171646](https://github.com/openclaw/openclaw/pull/171646)  
  - [PR #171555](https://github.com/openclaw/openclaw/pull/171555)  
  - [PR #171641](https://github.com/openclaw/openclaw/pull/171641)  
  - [PR #171558](https://github.com/openclaw/openclaw/pull/171558)  
  - [PR #171887](https://github.com/openclaw/openclaw/pull/171887)  
  - [PR #171846](https://github.com/openclaw/openclaw/pull/171846)

  **建议：** 可按风险拆分合并，优先合并无用户可见变化、CI 充分、删除旧 Lit dependency 的小中型 PR，避免大型 UI 迁移长期堆积造成冲突。

---

## 总体健康度评估

OpenClaw 今日表现为**高活跃、高修复密度、但稳定性压力明显**。  
Issue 关闭率在今日更新中约为 43%（19/44），说明维护团队 triage 和关闭速度较快；但 42 个 PR 仍待合并，且多个 P0/P1 问题集中在 update、Gateway、session-state、SQLite、macOS exec 等核心路径，短期 release readiness 仍需谨慎。  
建议下一步优先处理：  
1. P0/P1 更新与 crash-loop 问题；  
2. Doctor / Gateway 诊断信息质量；  
3. Guest 权限和协作体验一致性；  
4. data-loss / message-loss 类问题；  
5. 高风险 PR 的 proof 与 security review。

---

## 横向生态对比

# AI 智能体 / 个人 AI 助手开源生态横向对比分析  
日期：2026-10-14

---

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态呈现出 **头部项目高强度迭代、长尾项目相对静默** 的分化格局。OpenClaw、Hermes Agent、CoPaw/QwenPaw、NanoBot 等项目集中暴露并修复 **会话状态、Gateway/通道稳定性、桌面端体验、工具调用可靠性、安全边界** 等生产级问题。  
整体趋势显示，这一类项目已从“Agent 能跑起来”进入“长期运行、多人协作、跨平台桌面、外部通道接入、可观测与可恢复”的工程化阶段。  
OpenClaw 与 Hermes Agent 代表高复杂度、高社区反馈密度的基础设施型 Agent 平台；LobsterAI 与 CoPaw/QwenPaw 更偏产品化桌面助手与工作台；NanoBot 则表现出小而快、聚焦 WebUI 和会话生命周期质量的维护节奏。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release 情况 | 今日重点 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 44 | 46 | 无新版本 | Gateway、Doctor、更新失败、Guest 权限、SQLite/WAL、Solid UI 迁移 | **高活跃，高压力**。响应快，但 P0/P1 稳定性问题较多，PR backlog 明显 |
| **NanoBot** | 2 | 12 | 无新版本 | WebUI 修复、idle compaction、重连状态、MCP presets | **健康活跃**。问题集中、修复明确，风险主要在 session lifecycle |
| **Hermes Agent** | 50 | 50 | 无新版本 | Gateway 消息投递、Telegram、code-exec、Desktop、安装安全、OAuth | **极高活跃，高风险积压**。Issue/PR 密度最高之一，安全和消息可靠性压力大 |
| **PicoClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **NanoClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **NullClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **IronClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **LobsterAI** | 0 | 7 | **2026.10.13** | Office 编辑、macOS Computer Use、桌面伴侣、设置安全、Windows UTF-8 | **发布后巩固良好**。Issue 安静，维护侧活跃，产品化方向清晰 |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **Moltis** | 0 | 0 | 无 | 无活动 | **静默** |
| **CoPaw / QwenPaw** | 8 | 13 | **v2.2.2-beta.5 / beta.6** | beta 验证、Console、Cron、Agent 间调用、OpenUI、模型管理 | **快速 beta 迭代**。发布活跃，用户侧稳定性仍需收敛 |
| **ZeptoClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **ZeroClaw** | 0 | 6 | 无 | event-watch channel、ZeroCode session cap、delegate 可观测性、Telegram 授权 | **功能演进活跃**。Issue 安静，但 PR 涉及高风险核心路径 |

---

## 3. OpenClaw 在生态中的定位

### 3.1 定位概括

OpenClaw 是今日样本中最典型的 **基础设施型个人 AI 助手 / Agent Runtime 平台** 之一。它的核心关注点不是单一 UI 或单一聊天体验，而是围绕 Gateway、Session State、Doctor、Update、Guest 权限、SQLite/WAL、macOS app node、Web UI 技术栈迁移等完整运行时体系展开。

与 NanoBot、LobsterAI、CoPaw 等相比，OpenClaw 更接近“可长期运行的本地/远程 Agent 操作系统底座”。

### 3.2 相对优势

| 维度 | OpenClaw 表现 |
|---|---|
| **社区规模与反馈密度** | 24 小时内 44 个 Issue、46 个 PR，活跃度处于生态头部 |
| **工程覆盖面** | 覆盖 Gateway、CLI、Doctor、Update、Session、Guest、SQLite、macOS node、Web UI 等多层 |
| **故障采集能力** | update failure report、Doctor、Gateway maintenance warning 等机制较成熟 |
| **响应速度** | 多个当天 Issue 已出现 linked PR 或 queueable-fix 标签 |
| **架构演进** | Web UI 从 Lit 向 Solid 迁移，说明项目仍在清理长期架构债务 |

### 3.3 当前短板

OpenClaw 的主要问题不是“缺少功能”，而是 **核心路径稳定性压力偏高**：

- 多个 P0/P1 更新失败、crash-loop、session migration 问题；
- Gateway 启动诊断、Doctor repair、WAL checkpoint 等运维路径仍有噪音或信息不足；
- Guest 权限模型在真实协作场景中暴露不一致；
- 42 个 PR 待合并，维护者 review 压力明显。

### 3.4 与同类项目的技术路线差异

| 对比对象 | 差异 |
|---|---|
| **Hermes Agent** | 两者都偏基础设施型，但 Hermes 今日更集中在外部通道、插件、Desktop、安全审计和 OpenAI-compatible API；OpenClaw 更突出 Doctor、Update、Gateway、Session Store、SQLite/WAL 等本地运行时可靠性 |
| **NanoBot** | NanoBot 更轻量，聚焦 WebUI、Provider、session compaction 和 MCP presets；OpenClaw 更复杂，运维和多用户/Guest 权限体系更重 |
| **LobsterAI** | LobsterAI 更偏产品化桌面助手，强调 Office、Computer Use、桌面伴侣；OpenClaw 更偏底层 Agent runtime 和开发者/运维工具链 |
| **CoPaw/QwenPaw** | CoPaw 更像智能体工作台与 Console 平台，强调 OpenUI、模型管理、beta 发布；OpenClaw 更重稳定运行、更新、诊断和会话一致性 |
| **ZeroClaw** | ZeroClaw 正在推进 runtime/channel/ZeroCode 能力，方向与 OpenClaw 有部分重叠，但今日社区反馈规模明显小于 OpenClaw |

---

## 4. 共同关注的技术方向

### 4.1 会话状态一致性与压缩 / 归档安全

涉及项目：

- **OpenClaw**：`/compact` 后 WebChat 渲染旧回复、Doctor session migration 重复 header、queued turn message-loss。
- **NanoBot**：idle compaction 可能归档仍在运行的 direct turn。
- **Hermes Agent**：in-place compaction timestamp carry 顺序错误导致重复渲染和时间漂移。
- **CoPaw/QwenPaw**：Agent 间调用被静默取消、消息导航定位不准。
- **ZeroClaw**：foreground delegate tool calls 需要回显到 parent turn。

共同诉求：

- 会话压缩不能污染后续上下文；
- 运行中 turn 不应被 idle compaction 或 archive 误处理；
- 父子 Agent / delegate 的执行轨迹需要在主会话中可见；
- session migration 和历史数据异常需要容错路径。

---

### 4.2 Gateway / 通道 / 外部入口可靠性

涉及项目：

- **OpenClaw**：Gateway startup diagnostics、session store 初始化 race、systemd crash loop。
- **Hermes Agent**：Telegram turn 卡死、Gateway unclean death 后重启循环、Feishu/Webhook/Telegram 消息投递。
- **CoPaw/QwenPaw**：飞书通道下多 Agent 调用取消。
- **ZeroClaw**：Telegram unauthorized notice、event-watch channel。
- **NanoBot**：WebUI reconnect 后 turn 状态 reconcile。

共同诉求：

- 外部入口必须有超时、watchdog、恢复机制；
- Gateway 健康检查不能仅“进程存活”，还要反映 session/store/channel 是否 ready；
- IM / Webhook / Desktop / REST API 等入口需要统一的消息状态模型；
- 失败应可诊断，而不是静默排队或无日志卡死。

---

### 4.3 桌面端与本地执行体验

涉及项目：

- **LobsterAI**：macOS Computer Use、desktop companion、Windows Python 子进程 UTF-8。
- **Hermes Agent**：Windows Desktop SSH、macOS Share Sheet、Electron `/dev/shm` crash、Windows glass UI。
- **CoPaw/QwenPaw**：Windows 桌面启动 readiness、日志轮转、channel SDK 延迟加载。
- **OpenClaw**：macOS app node 长命令 20 秒后失败。

共同诉求：

- 桌面 AI 助手正在成为高频入口；
- Windows/macOS/Linux 平台细节开始成为真实瓶颈；
- 本地子进程、SSH、Computer Use、桌面 companion 都需要更强的权限、编码、超时和日志处理；
- 用户期待 AI 助手从“聊天窗口”扩展成“系统级辅助入口”。

---

### 4.4 安全边界与凭据保护

涉及项目：

- **Hermes Agent**：pm lock sha256 路径风险、attachment downloader DNS rebinding、MCP schema poisoning、OAuth pool token revoke。
- **LobsterAI**：Provider 设置导出默认不含凭据、加密备份、原子导入。
- **OpenClaw**：Podman gateway link-local security-boundary、SecretRef diagnostics。
- **ZeroClaw**：Telegram authorization-aware notice。
- **CoPaw/QwenPaw**：插件菜单可见性、Hub Docker 部署边界。

共同诉求：

- 凭据和 provider profile 需要安全默认值；
- 安装/更新/下载器必须 fail-closed；
- MCP、插件、外部工具 schema 需要防注入；
- 通道授权和未授权反馈需要可配置且不泄露敏感信息。

---

### 4.5 MCP / 工具生态扩展

涉及项目：

- **NanoBot**：新增 118 个 MCP presets，总数到 134。
- **OpenClaw**：MCP runtime slots hard cap 256，无 admin reset path。
- **Hermes Agent**：MCP SSE 单事件 1 MiB 限制、MCP schema poisoning。
- **LobsterAI**：Release 中强调 MCP 工具管理改进。
- **ZeroClaw**：event-watch channel 与外部 API polling，可视为工具/通道生态扩展。

共同诉求：

- MCP 工具数量快速增长后，配置、健康检查、资源回收、安全扫描成为新问题；
- 用户希望“开箱即用”的工具 presets；
- 维护者需要处理 runtime cap、schema 安全、large tools/list、权限边界。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 / 产品形态 |
|---|---|---|---|
| **OpenClaw** | Gateway、Doctor、Update、Session、Guest、SQLite/WAL、Web UI 迁移 | 高级个人用户、开发者、长期运行部署者、协作场景用户 | 重运行时、重运维、重状态管理的 Agent 基础设施 |
| **Hermes Agent** | 多通道 Gateway、Desktop、插件、安全、OAuth、OpenAI-compatible API、code-exec | 自动化重度用户、IM Bot 用户、插件开发者、Desktop 用户 | Agent Gateway + Desktop + 插件生态，外部入口丰富 |
| **NanoBot** | WebUI、session compaction、Provider、MCP presets、转录 | 轻量 Web 助手用户、研究/工程用户、MCP 初学者 | Python/WebUI 风格，迭代轻快，修复粒度小 |
| **LobsterAI** | Office 编辑、Computer Use、桌面伴侣、MCP 工具管理、专家漏斗 | 普通个人 AI 助手用户、办公用户、中文桌面用户 | 产品化桌面 AI 助手，强调可用性与本地生产力 |
| **CoPaw/QwenPaw** | Console、OpenUI、模型管理、多 Agent、Hub、beta 发布验证 | Agent 工作台用户、企业/团队试用者、插件/UI 开发者 | 智能体工作台 + Console + 插件 UI + 多 Agent 编排 |
| **ZeroClaw** | Channel event-watch、ZeroCode、多会话、delegate 可观测性、Telegram 集成 | 开发者、高级自动化用户、通道集成用户 | Runtime + Channel + ZeroCode，偏系统能力演进 |
| **静默项目** | 暂无活动 | 不明确 | 当前生态影响力较低或处于低维护期 |

---

## 6. 社区热度与成熟度

### 6.1 第一梯队：高活跃、高复杂度、高稳定性压力

- **OpenClaw**
- **Hermes Agent**

特点：

- Issue/PR 数量都接近或超过 40；
- 用户已经进入真实生产或准生产使用；
- 问题不再是基础功能缺失，而是 crash-loop、更新失败、通道卡死、message-loss、安全边界、长期运行资源泄漏；
- 社区反馈密集，但维护者 review 压力较大。

判断：

> 这类项目已进入“平台级成熟化”的关键阶段，短期最重要的是稳定性、可观测性和 release readiness。

---

### 6.2 第二梯队：快速迭代与质量巩固并行

- **NanoBot**
- **CoPaw/QwenPaw**
- **LobsterAI**
- **ZeroClaw**

特点：

- PR 活跃，但 Issue 数相对可控；
- 有明确产品方向或技术主线；
- NanoBot 偏质量修复，CoPaw 偏 beta 发布与工作台能力扩展，LobsterAI 偏桌面产品化，ZeroClaw 偏 runtime/channel 演进；
- 多数问题边界清晰，适合快速合并和持续 beta 验证。

判断：

> 这些项目处于“能力扩展 + 质量巩固”阶段，若能控制大 PR 风险，有机会快速提升用户体验和生态位置。

---

### 6.3 第三梯队：低活跃或静默项目

- PicoClaw
- NanoClaw
- NullClaw
- IronClaw
- TinyClaw
- Moltis
- ZeptoClaw

特点：

- 过去 24 小时无 Issue、PR、Release；
- 无法判断是稳定低维护、暂停开发，还是社区关注度较低；
- 在今日生态讨论中的影响力有限。

判断：

> 对技术选型者而言，这些项目需要结合更长时间窗口观察维护连续性，不宜仅凭单日数据判断生死。

---

## 7. 值得关注的趋势信号

### 7.1 Agent 项目正在从“功能演示”转向“长期运行基础设施”

OpenClaw、Hermes Agent、CoPaw 都在处理 Gateway、session、cron、update、Doctor、日志轮转、health check 等问题。这说明用户已经不满足于一次性 prompt 执行，而是希望 AI 助手像后台服务一样长期稳定运行。

对开发者的参考：

- 从第一天就设计 watchdog、超时、恢复、诊断和状态机；
- 不要只做“happy path”；
- session store、update state、tool execution log 应具备可恢复性。

---

### 7.2 会话状态是 Agent 系统的核心技术债

多个项目同时出现 compact、archive、migration、fork、parent-child turn、direct turn、queued message、timestamp carry 等问题。会话不是简单聊天记录，而是 Agent 的执行上下文、审计轨迹和恢复单元。

对开发者的参考：

- session event log 应有严格 schema；
- compact / fork / archive 需要幂等和可回滚；
- parent-child agent、delegate、tool calls 应明确事件归属；
- UI 展示状态不能与后端状态脱节。

---

### 7.3 桌面 AI 助手正在成为竞争焦点

LobsterAI 的 desktop companion、macOS Computer Use，Hermes 的 Desktop 反馈，CoPaw 的 Windows 桌面启动优化，OpenClaw 的 macOS app node 修复，都说明桌面端正在从“附加 UI”变成核心入口。

对开发者的参考：

- 桌面端要重视系统权限、编码、窗口层级、日志、安装更新；
- macOS/Windows/Linux 差异会显著影响体验；
- Computer Use、划词工具栏、Share Sheet、SSH remote、本地工具执行会成为高价值能力。

---

### 7.4 外部通道与多 Agent 协作正在真实落地

Telegram、Feishu、Webhook、Bot Mode rooms、ChatWithAgent、delegate_task、event-watch channel 等反馈表明，用户正在把 Agent 接入 IM、团队群组、家庭自动化和自动化工作流。

对开发者的参考：

- 通道消息必须有 delivery state、ack、超时和重试；
- 多 Agent 协作需要 trace id、取消原因、调用链日志；
- 未授权访问、mention、默认 reader、群组路由要有统一抽象。

---

### 7.5 MCP 与工具生态进入规模化阶段

NanoBot 一次性扩展 MCP presets，OpenClaw 暴露 MCP runtime cap，Hermes 遇到 MCP schema 和 large tools/list 问题，LobsterAI 将 MCP 工具管理列为版本亮点。

对开发者的参考：

- MCP 不只是“接入工具”，还需要生命周期管理；
- presets、权限、健康检查、schema 扫描、资源回收会成为基础能力；
- 大工具列表和动态 schema 需要性能与安全双重设计。

---

### 7.6 安全默认值正在成为成熟项目的分水岭

Hermes 和 LobsterAI 今日都出现明显安全强化：安装器路径校验、凭据导出保护、DNS rebinding、MCP schema poisoning、OAuth pool 等。Agent 系统连接本地文件、浏览器、凭据、外部 API 后，安全边界比普通聊天应用复杂得多。

对开发者的参考：

- 所有来自配置、lock/state、provider、plugin、MCP 的输入都应 schema validate；
- 凭据导出默认应不包含 secrets；
- 安装、更新、下载路径必须 fail-closed；
- 插件和工具调用需要最小权限原则。

---

## 结论

今日生态的核心关键词是：**稳定性、可观测性、桌面化、通道化、安全边界、会话一致性**。

OpenClaw 与 Hermes Agent 代表高复杂度 Agent 基础设施的真实压力；NanoBot、LobsterAI、CoPaw/QwenPaw、ZeroClaw 则分别在 WebUI、桌面产品化、智能体工作台和 runtime/channel 能力上快速推进。  
对技术决策者而言，选择这类项目时应重点评估三点：**长期运行可靠性、会话状态模型成熟度、工具/通道安全边界**。对开发者而言，未来竞争不只在模型调用能力，而在谁能把 Agent 做成稳定、可恢复、可审计、可扩展的日常系统。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报｜2026-10-14

## 1. 今日速览

过去 24 小时，NanoBot 项目活跃度较高：共出现 **2 条 Issue 更新**、**12 条 PR 更新**，其中 **4 个 PR 仍待合并**，**8 个 PR 已关闭或合并**。今日工作重点集中在 **WebUI 稳定性与体验修复、会话 idle compaction 可靠性、Provider 兼容性、性能优化与代码去重重构**。  
整体来看，项目处于高频维护状态，维护者对 WebUI 细节问题和会话生命周期问题响应迅速；不过今日新报的 direct entry point 会话压缩问题仍需重点跟进。当前没有新版本发布。

---

## 2. 项目进展

### WebUI 体验与稳定性持续修复

- [PR #6212](https://github.com/HKUDS/nanobot/pull/6212) **fix(webui): remove subtask polling and load error UI**  
  状态：已关闭/合并  
  该 PR 移除了 subtask snapshots 的 3 秒轮询 fallback，以及 gateway 关闭后可能出现的冗余红色错误提示。  
  **影响**：减少 WebUI 中重复或误导性的错误反馈，降低前端轮询带来的额外开销，使连接异常状态更统一地由 host connection indicator 表达。

- [PR #6209](https://github.com/HKUDS/nanobot/pull/6209) **fix(webui): restore and synchronize live activity sheen**  
  状态：已关闭/合并  
  修复 live activity 标签中动态 sheen 效果失效的问题，包括 Tailwind `after:` utility 覆盖文本、React element 传参导致无法渲染文本、turn-level processing header 未应用效果等。  
  **影响**：改善运行中任务的可视反馈，让用户更清楚地感知 agent 正在处理。

- [PR #6205](https://github.com/HKUDS/nanobot/pull/6205) **fix(webui): prevent equation tags from overlapping formulas**  
  状态：已关闭/合并  
  修复 KaTeX 编号公式标签与公式内容重叠的问题，通过测量 equation tag 并为其预留宽度。  
  **影响**：提升数学公式渲染质量，尤其对科研、工程、教育类用户较重要。

- [PR #6207](https://github.com/HKUDS/nanobot/pull/6207) **fix(webui): require double tildes for strikethrough**  
  状态：已关闭/合并  
  修复单波浪线 `~text~` 被错误解析为删除线的问题，改为仅 `~~text~~` 触发删除线。  
  **影响**：避免数学区间、普通文本中的 `~` 被误解析，提升 Markdown 与数学内容混排可靠性。

### 性能优化与资源使用改进

- [PR #6208](https://github.com/HKUDS/nanobot/pull/6208) **perf(webui): stream bounded file diff previews**  
  状态：已关闭/合并  
  大文件编辑预览此前会先完整 materialize unified diff，再截取 500 行预览。该 PR 改为 bounded lookahead 流式消费 hunk，并按索引 yield source lines。  
  **影响**：显著降低大文件 diff 预览时的内存与 CPU 浪费，提升大文件编辑场景下 WebUI 响应性。

- [PR #6203](https://github.com/HKUDS/nanobot/pull/6203) **fix(session): skip transcript preview when scanning idle sessions**  
  状态：待合并  
  该 PR 修复 [Issue #6192](https://github.com/HKUDS/nanobot/issues/6192) 相关问题：`AutoCompact.check_expired` 只需要 session key 与 `updated_at`，但此前调用 `SessionManager.list_sessions()` 会遍历 transcript lines 生成 WebUI preview。  
  **影响**：对拥有大量 session 文件的 workspace，该改动可明显降低 idle scan 成本，是重要的性能与可扩展性优化。

### Provider 与转录能力维护

- [PR #6210](https://github.com/HKUDS/nanobot/pull/6210) **fix(providers): preserve supported Kimi K3 reasoning efforts**  
  状态：已关闭/合并  
  修正 Kimi K3 reasoning effort 参数处理，保留官方支持的 `low`、`high`、`max`，并同步设置建议到官方文档。  
  **影响**：提升 Kimi K3 provider 配置准确性，避免用户设置被错误归一化。

- [PR #6206](https://github.com/HKUDS/nanobot/pull/6206) **refactor(transcription): share JSON request retries**  
  状态：已关闭/合并  
  将 Multipart/JSON transcription posts 与 AssemblyAI upload/poll 逻辑中的 HTTP retry、JSON response validation 抽取到 `_request_json_with_retry`。  
  **影响**：降低 provider adapter 代码重复，提升转录请求的维护性与一致性。

### 代码结构与持久化逻辑重构

- [PR #6204](https://github.com/HKUDS/nanobot/pull/6204) **refactor: deduplicate durable writes and file-edit path resolution**  
  状态：已关闭/合并  
  将 cron job stores、local trigger queues、automation run records 中重复的 durable write sequence 集中处理，并去重 file-edit activity tracking 的路径解析与错误处理逻辑。  
  **影响**：减少关键持久化路径的重复实现，降低未来回归风险。

### 新功能与预设扩展

- [PR #6216](https://github.com/HKUDS/nanobot/pull/6216) **feat(webui): expand MCP service presets**  
  状态：待合并  
  当前 Apps 提供 16 个 MCP presets，该 PR 新增 118 个，总数达到 134 个，并补充 `docs/mcp-presets.md` 中的 provider prerequisites 与 capability limits。  
  **影响**：这是今日最显著的功能扩展 PR，若合并，将大幅降低用户配置 MCP 服务连接的门槛，尤其是 Google Workspace 等远程 OAuth/API-key/local-server 场景。

### 会话生命周期修复

- [PR #6215](https://github.com/HKUDS/nanobot/pull/6215) **fix(agent): skip idle compaction during direct turns**  
  状态：待合并  
  针对 direct turn 不进入 `_pending_queues`，导致 idle compaction 可能错误压缩仍在运行的 session 的问题。PR 将持有 dispatch lock 的 session 纳入活跃判定。  
  **影响**：这是今日最关键的稳定性修复之一，直接关联数据一致性与会话保存正确性。

- [PR #6211](https://github.com/HKUDS/nanobot/pull/6211) **fix(webui): reconcile turns after reconnect**  
  状态：待合并  
  修复连接中断期间 running turn spinner 消失、完成后在其他 topic 中可能保留 partial answer 的问题。  
  **影响**：提升断线重连后的会话状态一致性，减少用户看到过期或部分答案的概率。

---

## 3. 社区热点

今日数据中，Issues 和 PR 的 **评论数与 reaction 数整体很低**：Issue 均为 0 评论、0 点赞，PR 评论字段未提供。热点主要来自问题本身的重要性，而非讨论热度。

### 重点关注：idle compaction 与 direct entry point 的会话一致性问题

- [Issue #6214](https://github.com/HKUDS/nanobot/issues/6214) **Idle compaction can archive a session whose turn is still running through the direct entry point**  
  状态：Open  
  作者反馈：在 Linux + Python 3.12、main 分支 `cdb6210` 上复现。  
  核心问题是 `_check_expired_sessions_if_due` 通过 `active_session_keys=self._pending_queues.keys()` 避免压缩活跃 session，但 `process_direct` 路径并不写入 `_pending_queues`，因此 direct turn 运行中仍可能被判定 idle 并归档。  
  关联修复：[PR #6215](https://github.com/HKUDS/nanobot/pull/6215)

- [Issue #6213](https://github.com/HKUDS/nanobot/issues/6213) **Idle compaction can archive a session whose turn is still running through the direct entry point**  
  状态：Closed  
  内容与 #6214 基本一致，可能是重复提交后关闭。  
  关联修复：[PR #6215](https://github.com/HKUDS/nanobot/pull/6215)

**背后诉求分析**：  
用户关注的是 agent 会话执行期间的数据安全与最终保存一致性。direct entry point 绕开常规 pending queue 后，idle compaction 的活跃判断出现盲区，可能造成 summary checkpoint 与最终保存互相覆盖。这类问题虽然讨论量不高，但稳定性风险高，尤其影响长耗时 direct turn、后台自动化或非 WebUI 调用场景。

---

## 4. Bug 与稳定性

按影响程度排序如下：

### 高优先级：direct turn 运行中可能被 idle compaction 归档

- Issue：[Issue #6214](https://github.com/HKUDS/nanobot/issues/6214)  
- 重复关闭项：[Issue #6213](https://github.com/HKUDS/nanobot/issues/6213)  
- 修复 PR：[PR #6215](https://github.com/HKUDS/nanobot/pull/6215)  
- 状态：Issue Open，修复 PR Open  
- 风险：运行中的 direct session 可能被错误归档；最终保存可能覆盖 summary checkpoint。  
- 影响面：direct API / direct entry point 用户、长耗时 turn、自动化调用场景。  
- 建议：优先 review 并合并 #6215；同时补充 regression test 覆盖 `process_direct` 与 idle TTL 交错场景。

### 中高优先级：断线重连后 turn 状态不一致

- PR：[PR #6211](https://github.com/HKUDS/nanobot/pull/6211)  
- 状态：Open  
- 问题：连接中断期间 running turn 的 spinner 可能消失，并显示 update dot；若 turn 在用户切换 topic 后完成，返回时可能看到 partial answer，直到刷新浏览器。  
- 风险：用户误判任务状态或看到不完整结果。  
- 建议：优先合并，尤其适合在下一次 patch release 前进入。

### 中优先级：idle session 扫描性能问题

- PR：[PR #6203](https://github.com/HKUDS/nanobot/pull/6203)  
- 关联：[Issue #6192](https://github.com/HKUDS/nanobot/issues/6192)  
- 状态：Open  
- 问题：idle scan 阶段不必要地生成 transcript preview，在大量 session 文件 workspace 中性能开销明显。  
- 风险：后台维护任务拖慢大 workspace，影响整体响应。  
- 建议：尽快合并，属于低风险高收益优化。

### 中优先级：WebUI 渲染与交互细节问题

- 删除线误解析：[PR #6207](https://github.com/HKUDS/nanobot/pull/6207)  
- 公式编号重叠：[PR #6205](https://github.com/HKUDS/nanobot/pull/6205)  
- live activity 动效失效：[PR #6209](https://github.com/HKUDS/nanobot/pull/6209)  
- subtask 错误 UI 与轮询：[PR #6212](https://github.com/HKUDS/nanobot/pull/6212)  
- 状态：均已关闭/合并  
- 影响：主要影响 WebUI 可读性、反馈一致性与误导性错误提示。  
- 评价：今日 WebUI 稳定性推进明显，多个小而具体的 UX 回归得到修复。

### 中低优先级：Provider 参数兼容问题

- PR：[PR #6210](https://github.com/HKUDS/nanobot/pull/6210)  
- 状态：已关闭/合并  
- 问题：Kimi K3 reasoning effort 参数未完整保留官方支持值。  
- 影响：可能导致用户配置意图被错误修改。  
- 评价：修复及时，并同步官方文档，有利于减少 provider 使用困惑。

---

## 5. 功能请求与路线图信号

### MCP service presets 大规模扩展，显示 Apps / MCP 集成将继续增强

- PR：[PR #6216](https://github.com/HKUDS/nanobot/pull/6216)  
- 状态：Open  
- 内容：将 MCP presets 从 16 个扩展到 134 个，覆盖远程 OAuth、API-key、本地 server 连接方式，并在文档中补充 provider 前置条件与能力限制。  
- 路线图信号：  
  - NanoBot 正在强化「开箱即用的外部服务连接」能力。  
  - WebUI Apps 可能成为后续集成体验的重要入口。  
  - 用户不再需要手工配置大量 MCP 服务，降低采用门槛。  
- 可能纳入下一版本概率：高。该 PR 标签包含 `feature`、`new-provider`、`documentation`、`test`，且目标明确。

### 会话与自动压缩机制继续优化

- PR：[PR #6215](https://github.com/HKUDS/nanobot/pull/6215)  
- PR：[PR #6203](https://github.com/HKUDS/nanobot/pull/6203)  
- 路线图信号：  
  - 项目正在加强长期会话、大规模 workspace、后台压缩与历史管理能力。  
  - 未来版本可能更关注 session lifecycle 的正确性与性能。

### WebUI 重连与实时状态同步是近期重点

- PR：[PR #6211](https://github.com/HKUDS/nanobot/pull/6211)  
- 路线图信号：  
  - 对长时间运行任务、断线重连、多 topic 切换场景的体验正在被主动修复。  
  - 这说明 NanoBot 的 WebUI 已进入更细粒度的可靠性打磨阶段。

---

## 6. 用户反馈摘要

今日 Issues 评论较少，没有形成多轮讨论，但从提交内容可提炼出以下真实痛点：

1. **长耗时 direct turn 的会话安全性不足**  
   - 来源：[Issue #6214](https://github.com/HKUDS/nanobot/issues/6214)  
   - 用户能够在 Linux + Python 3.12 环境中复现 direct entry point 与 idle compaction 的冲突。  
   - 痛点：后台压缩逻辑不应影响仍在执行的任务，尤其是 direct API 调用路径。

2. **WebUI 在网络波动下容易出现状态错位**  
   - 来源：[PR #6211](https://github.com/HKUDS/nanobot/pull/6211)  
   - 痛点：断线重连后 spinner、update dot、partial answer 状态可能不一致。  
   - 使用场景：长回答生成、用户切换 topic、浏览器连接中断后恢复。

3. **大规模 session workspace 对后台扫描性能敏感**  
   - 来源：[PR #6203](https://github.com/HKUDS/nanobot/pull/6203)  
   - 痛点：idle scan 不应触发 transcript preview 这类 WebUI 展示工作。  
   - 使用场景：有数千个 session 文件的长期用户或团队环境。

4. **Markdown 与数学内容混排需要更严格兼容**  
   - 来源：[PR #6207](https://github.com/HKUDS/nanobot/pull/6207)、[PR #6205](https://github.com/HKUDS/nanobot/pull/6205)  
   - 痛点：单波浪线、公式编号等细节会直接影响技术文档、数学推导、科研内容的阅读体验。

---

## 7. 待处理积压

基于当前提供的 24 小时数据，未发现明确的「长期未响应」Issue 或 PR。不过以下仍处于 Open 状态，建议维护者优先关注：

1. [PR #6215](https://github.com/HKUDS/nanobot/pull/6215) **fix(agent): skip idle compaction during direct turns**  
   - 优先级：高  
   - 原因：关联正在 Open 的稳定性问题 [Issue #6214](https://github.com/HKUDS/nanobot/issues/6214)，涉及会话归档与最终保存一致性。

2. [PR #6211](https://github.com/HKUDS/nanobot/pull/6211) **fix(webui): reconcile turns after reconnect**  
   - 优先级：中高  
   - 原因：影响断线重连后的结果一致性与用户信任。

3. [PR #6203](https://github.com/HKUDS/nanobot/pull/6203) **fix(session): skip transcript preview when scanning idle sessions**  
   - 优先级：中高  
   - 原因：对大 workspace 性能影响明显，且改动目标清晰。

4. [PR #6216](https://github.com/HKUDS/nanobot/pull/6216) **feat(webui): expand MCP service presets**  
   - 优先级：中  
   - 原因：功能价值高，但涉及 118 个新增 presets，建议重点 review 文档准确性、provider prerequisites、OAuth/API-key/local server 连接边界与测试覆盖。

5. [Issue #6214](https://github.com/HKUDS/nanobot/issues/6214) **Idle compaction can archive a session whose turn is still running through the direct entry point**  
   - 优先级：高  
   - 原因：应在 #6215 合并后关闭，并补充回归测试说明。

---

## 项目健康度评估

NanoBot 今日维护节奏健康，PR 流量较高，且多数改动集中在明确的 bug 修复、性能优化和代码维护上。WebUI 体验问题被快速拆解并修复，说明前端质量控制持续加强；Provider 与 transcription 相关改动也显示后端集成层在持续收敛复杂度。  
需要重点关注的是 session lifecycle 相关问题，尤其是 idle compaction 与 direct entry point 的交互，这类问题可能影响数据一致性。若 [PR #6215](https://github.com/HKUDS/nanobot/pull/6215)、[PR #6211](https://github.com/HKUDS/nanobot/pull/6211)、[PR #6203](https://github.com/HKUDS/nanobot/pull/6203) 能尽快合并，项目短期稳定性将明显提升。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
**日期：2026-10-14**  
**仓库：NousResearch/hermes-agent**

---

## 1. 今日速览

过去 24 小时 Hermes Agent 活跃度非常高：Issues 更新 50 条，其中 49 条仍处于打开或活跃状态，仅 1 条关闭；PR 更新 50 条，其中 49 条待合并，仅 1 条已合并或关闭。今日新增/活跃问题集中在 **Gateway 消息投递与会话状态、CLI/配置、Desktop 跨平台兼容、工具调用稳定性、安全边界** 等核心路径。  
整体来看，社区正在密集发现并修补边缘场景和生产级问题，尤其是 Telegram/Feishu/Webhook、OAuth 凭据池、MCP、code-exec、安装/更新安全等模块。项目健康度表现为“高活跃、高问题密度、高修复跟进”，但 open PR 积压明显，且外部贡献者受 open-PR 限制影响，可能拖慢修复进入主线的速度。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日数据中显示有 **1 个 PR 已合并或关闭**，但提供的 PR 明细中展示的 20 条均为 OPEN 状态，因此无法确认具体合并内容。尽管如此，今日新开的修复 PR 覆盖多个高优先级问题，显示项目在以下方向有明显推进：

### 3.1 `/api/status` 健康检查超时修复

- PR：[#138400 fix(dashboard): return the /api/status health fallback at its deadline](https://github.com/NousResearch/hermes-agent/pull/138400)  
- PR：[#138399 fix(cli): return the /api/status health fallback at its route deadline](https://github.com/NousResearch/hermes-agent/pull/138399)  
- 对应 Issue：[#138388](https://github.com/NousResearch/hermes-agent/issues/138388)

问题在于 `_bounded_health_probe()` 虽标称 1 秒预算，但 `ThreadPoolExecutor.__exit__` 会在超时后继续等待 worker，导致接口实际阻塞超过 deadline。两个 PR 都尝试让 `/api/status` 在路由预算内返回，直接改善 Dashboard/CLI 健康检查响应性。

### 3.2 code-exec / web_extract 空 RPC 响应导致缓存污染

- PR：[#138391 fix(code-exec): do not consume a blank RPC line as the reply](https://github.com/NousResearch/hermes-agent/pull/138391)  
- 对应 Issue：[#138373](https://github.com/NousResearch/hermes-agent/issues/138373)

该问题会导致持久 `execute_code` session 中，一次空 RPC reply 后，后续 `web_extract` 返回上一次调用的页面，属于工具调用结果错配。修复方向是避免把空行当作有效 JSON reply 消费，保护 session kernel 内的调用边界。

### 3.3 Gateway / Telegram 卡死前置 watchdog

- PR：[#138383 Fix/138358 preagent watchdog](https://github.com/NousResearch/hermes-agent/pull/138383)  
- 对应 Issue：[#138358](https://github.com/NousResearch/hermes-agent/issues/138358)

Telegram turn 在 agent 启动前卡住 80 分钟，无回复、无日志、后续消息排队。PR 标题显示引入 pre-agent watchdog，若实现完整，将缓解 gateway 消息队列被单个 turn 阻塞的问题。

### 3.4 Windows Desktop SSH 稳定性修复

- PR：[#138393 fix(desktop): stop Windows SSH stdin probes orphaning remote PowerShell](https://github.com/NousResearch/hermes-agent/pull/138393)  
- 对应 Issue：[#138378](https://github.com/NousResearch/hermes-agent/issues/138378)

修复 Windows OpenSSH + PowerShell stdin `ReadToEnd()` EOF 竞态导致的 20 秒超时、80%+ 失败率问题。该修复对 Desktop 远程连接体验影响较大，尤其是 Windows remote 用户。

### 3.5 会话压缩时间戳修复

- PR：[#138377 fix(state): run the timestamp carry before the in-place compaction archive](https://github.com/NousResearch/hermes-agent/pull/138377)  
- 对应 Issue：[#138355](https://github.com/NousResearch/hermes-agent/issues/138355)

修复 in-place compaction 中 `_carry_parent_timestamps` 在 archive 之后执行导致 donor 查询失效的问题。该问题会引发逻辑消息重复渲染、时间戳漂移，属于会话状态一致性问题。

### 3.6 安装/包管理安全修复

- PR：[#138376 fix(pm): fail closed on off-shape lock sha256 before it becomes a store path](https://github.com/NousResearch/hermes-agent/pull/138376)  
- 对应 Issue：[#138359](https://github.com/NousResearch/hermes-agent/issues/138359)

针对 `lock.json` 中 `sha256` 未做形状校验，可能进入路径拼接并触发任意目录删除的问题，PR 采取 fail-closed 校验。该方向属于安全边界收紧，建议优先 review。

---

## 4. 社区热点

### 4.1 `/api/status` 一秒 fallback 实际超时

- Issue：[#138388](https://github.com/NousResearch/hermes-agent/issues/138388)  
- 状态：OPEN  
- 评论数：3  
- 标签：`type/bug`, `comp/cli`, `P2`  
- 相关 PR：[#138400](https://github.com/NousResearch/hermes-agent/pull/138400), [#138399](https://github.com/NousResearch/hermes-agent/pull/138399)

这是今日评论最多的问题。背后诉求是：CLI/Dashboard 的健康检查必须严格遵守超时预算，不能因为 executor shutdown 行为导致接口挂起。该问题说明 Hermes 在本地服务发现、gateway 健康检查路径上仍有同步阻塞风险。

### 4.2 code-exec session 中 web_extract 返回上一次结果

- Issue：[#138373](https://github.com/NousResearch/hermes-agent/issues/138373)  
- 状态：OPEN  
- 评论数：2  
- 标签：`type/bug`, `tool/web`, `tool/code-exec`, `P2`  
- 相关 PR：[#138391](https://github.com/NousResearch/hermes-agent/pull/138391)

用户发现一次空 RPC reply 后，后续 `web_extract` 返回旧数据。这类问题对 Agent 工具可靠性影响很大，因为它会让模型基于错误网页内容继续推理。

### 4.3 包管理安全链：路径遍历、facts.json 环境注入、downloader loopback gate bypass

- Issue：[#138359](https://github.com/NousResearch/hermes-agent/issues/138359)  
- 状态：OPEN  
- 评论数：2  
- 标签：`type/security`, `comp/cli`, `P2`, `area/install-update`  
- 相关 PR：[#138376](https://github.com/NousResearch/hermes-agent/pull/138376)

该 Issue 来自代码审计，指出多个安装/更新路径上的安全边界问题。用户诉求非常明确：安装器、包管理器、下载器必须对来自 lock/state 文件的值做严格 schema/shape 校验，避免路径穿越与环境注入。

### 4.4 Gateway 非正常死亡后重启循环、cron 被孤立、异步 delegation 消耗 provider quota

- Issue：[#138343](https://github.com/NousResearch/hermes-agent/issues/138343)  
- 状态：OPEN  
- 评论数：2  
- 标签：`comp/gateway`, `comp/cron`, `tool/delegate`, `P0`  
- 相关修复线索：Issue 中提到 PR #138342

这是今日优先级最高的 Issue 之一，标记为 P0。它反映出 gateway 非正常退出后，PID 复用、cron 状态、异步 delegation delivery 之间可能存在恢复一致性问题，并可能持续消耗 provider quota。该问题直接影响生产部署的可靠性与成本控制。

### 4.5 Desktop 崩溃与平台兼容问题

- Issue：[#138277](https://github.com/NousResearch/hermes-agent/issues/138277)  
- 状态：OPEN  
- 评论数：2  
- 标签：`comp/desktop`, `P2`  
- 链接：[#138277](https://github.com/NousResearch/hermes-agent/issues/138277)

用户报告 Electron renderer 崩溃，日志提示 `/dev/shm` 权限问题。该问题偏向环境/平台兼容，但对 Desktop 用户是直接阻断型体验。

---

## 5. Bug 与稳定性

以下按严重程度与影响面排序。

### P0 / 阻断级

#### 5.1 Gateway 重启循环、cron stranded、异步 delegation 消耗 quota

- Issue：[#138343](https://github.com/NousResearch/hermes-agent/issues/138343)  
- 状态：OPEN  
- 严重度：P0  
- 模块：Gateway、Cron、Delegate、Sessions  
- 是否已有 fix PR：Issue 中提到 PR #138342，但本日报数据未提供该 PR 详情

影响：gateway 非正常死亡后恢复失败，cron 可能被 stranded，异步 delegation delivery 可能持续烧 provider quota。该问题同时涉及 session state、message delivery 和 provider 成本，是今日最需要维护者优先关注的问题。

---

### P1 / 高优先级

#### 5.2 Telegram turn 在 agent 启动前卡死，后续消息排队 80 分钟

- Issue：[#138358](https://github.com/NousResearch/hermes-agent/issues/138358)  
- 状态：OPEN  
- 严重度：P1  
- 模块：Gateway、Telegram、Sessions  
- Fix PR：[#138383](https://github.com/NousResearch/hermes-agent/pull/138383)

影响：用户发送 Telegram DM 后无回复、无日志、gateway 仍健康，导致问题不易被监控发现。后续消息静默排队，属于消息投递可靠性问题。

#### 5.3 Anthropic OAuth pool 在 delegate_task 子任务间互相 revoke token

- Issue：[#138337](https://github.com/NousResearch/hermes-agent/issues/138337)  
- 状态：OPEN  
- 严重度：P1  
- 模块：Agent、Delegate、Anthropic OAuth、Auth  
- Fix PR：暂未在今日列表中看到对应 PR

影响：多个 delegate_task 子任务共享同一个 `CredentialPool`，401 恢复时可能互相刷新并 revoke token，最终在 refresh cap 处失败。该问题影响多 Agent/子任务协作的稳定性。

---

### P2 / 中高优先级

#### 5.4 `/api/status` health fallback 超过 deadline

- Issue：[#138388](https://github.com/NousResearch/hermes-agent/issues/138388)  
- Fix PR：[#138400](https://github.com/NousResearch/hermes-agent/pull/138400), [#138399](https://github.com/NousResearch/hermes-agent/pull/138399)

影响：健康检查接口可能阻塞超过 1 秒预算，影响 CLI/Dashboard 状态展示与自动化探活。

#### 5.5 code-exec `web_extract` 返回前一次调用结果

- Issue：[#138373](https://github.com/NousResearch/hermes-agent/issues/138373)  
- Fix PR：[#138391](https://github.com/NousResearch/hermes-agent/pull/138391)

影响：工具调用结果污染，可能导致 Agent 后续推理基于错误页面内容。

#### 5.6 pm lock sha256 未校验导致路径风险

- Issue：[#138359](https://github.com/NousResearch/hermes-agent/issues/138359)  
- Fix PR：[#138376](https://github.com/NousResearch/hermes-agent/pull/138376)

影响：安装/更新流程中存在高危路径删除风险，同时伴随环境注入和 loopback gate 绕过等安全边界问题。

#### 5.7 Dashboard loopback 登录在设置 `public_url` 时 PKCE state cookie 丢失

- Issue：[#138321](https://github.com/NousResearch/hermes-agent/issues/138321)  
- 状态：OPEN  
- 模块：CLI、Dashboard、Auth  
- Fix PR：暂未看到

影响：用户从 loopback 打开登录入口时，PKCE cookie 绑定到本地 origin，但 OAuth callback 被固定到 `public_url`，最终出现 “Missing PKCE state cookie”。这是典型部署拓扑兼容问题。

#### 5.8 OpenAI-compatible API 忽略 top-level `reasoning_effort`

- Issue：[#138299](https://github.com/NousResearch/hermes-agent/issues/138299)  
- 状态：OPEN  
- 模块：Gateway、Streaming、OpenAI compatibility  
- Fix PR：暂未看到

影响：严格遵循 OpenAI 标准字段的客户端无法控制 reasoning effort，例如 Homarr assistant 不能禁用 thinking。说明 Hermes API 兼容层仍需跟进生态客户端习惯。

#### 5.9 `model.default` 指定的模型被 model-switch validator 拒绝

- Issue：[#138261](https://github.com/NousResearch/hermes-agent/issues/138261)  
- 状态：OPEN  
- 模块：CLI、Config  
- Fix PR：暂未看到

影响：用户能看到当前模型，也能正常调用 `/chat/completions`，但切换时被拒绝，形成配置一致性问题。

#### 5.10 Windows Desktop SSH 到 Windows remote 超时

- Issue：[#138378](https://github.com/NousResearch/hermes-agent/issues/138378)  
- Fix PR：[#138393](https://github.com/NousResearch/hermes-agent/pull/138393)

影响：Windows OpenSSH + PowerShell stdin EOF 竞态导致 80%+ 连接失败率，严重影响 Desktop remote 工作流。

#### 5.11 Kimi catalog 过期与 `k3-256k` context length 错误

- Issue：[#138375](https://github.com/NousResearch/hermes-agent/issues/138375)  
- Fix PR：[#138394](https://github.com/NousResearch/hermes-agent/pull/138394)

影响：静态模型目录与实际 provider roster 不一致，会造成模型选择、上下文压缩、能力预估错误。

#### 5.12 MCP SSE 单事件 1 MiB 限制导致 large tools/list 失败

- Issue：[#138329](https://github.com/NousResearch/hermes-agent/issues/138329)  
- 状态：OPEN  
- 模块：Tools、MCP  
- Fix PR：暂未看到

影响：大型 MCP server 的 `tools/list` 如果以单个 SSE event 超过 1 MiB 返回，会被报告为 “SSE stream ended without a response”。对工具生态兼容性影响较大。

---

### P3 / 普通优先级与体验问题

#### 5.13 Achievements 扫描跳过 archived sessions

- Issue：[#138310](https://github.com/NousResearch/hermes-agent/issues/138310)  
- 状态：OPEN  
- 模块：Plugins、Sessions

影响：归档 session 后 lifetime totals 与 per-session maxima 统计缩水，影响成就/统计类插件准确性。

#### 5.14 CLI `/history` 打印图片 turn 时暴露 base64 data URL

- Issue：[#138330](https://github.com/NousResearch/hermes-agent/issues/138330)  
- 状态：OPEN  
- 模块：CLI、Vision input

影响：历史记录可读性差，且可能污染终端输出。

#### 5.15 Skills fallback 建议指向不存在的 `/skill <name>`

- Issue：[#138349](https://github.com/NousResearch/hermes-agent/issues/138349)  
- 状态：OPEN  
- 模块：Agent、CLI、TUI、Skills

影响：当 skill slash command 冲突时，系统给出的替代命令不可用，造成用户困惑。

#### 5.16 Windows Desktop sidebar glass 冷启动后保持不透明

- Issue：[#138395](https://github.com/NousResearch/hermes-agent/issues/138395)  
- 状态：OPEN  
- 模块：Desktop、Windows

影响：视觉体验问题，但用户提供了复现与本地验证修复线索。Issue 还提到早前 PR #111503 已关闭未合并，说明该问题有历史积压。

---

## 6. 功能请求与路线图信号

### 6.1 macOS Share Sheet 集成

- Issue：[#138278](https://github.com/NousResearch/hermes-agent/issues/138278)  
- 状态：OPEN  
- 模块：Desktop  
- 类型：Feature

用户希望从 macOS share sheet 直接把文本、URL、图片、视频发送到 Hermes Desktop，减少“复制 → 打开 Desktop → 选 profile → 新 session → 粘贴 → 提交”的流程。该需求符合个人 AI 助手高频输入入口的产品方向，若 Desktop 近期聚焦原生体验，可能进入路线图。

### 6.2 Bot Mode rooms：未被 @mention 的消息路由给默认 reader

- Issue：[#138347](https://github.com/NousResearch/hermes-agent/issues/138347)  
- 状态：OPEN  
- 模块：Desktop  
- 类型：Feature

用户提出 hub-and-spoke 多 Bot 房间：默认由 chief 读取未指名消息，专门角色通过 `@mention` 被唤起。这反映出社区对多 Agent 协作编排、角色路由、群组式工作区的需求增长。

### 6.3 Feishu outbound @Name 需要发送真实 mention entity

- Issue：[#138345](https://github.com/NousResearch/hermes-agent/issues/138345)  
- 状态：OPEN  
- 模块：Plugins、Feishu、Message delivery  
- 类型：Feature

当前 Feishu adapter 可以接收真实 mention，但无法发送真实 mention，导致多个 Hermes 实例在 `require_mention` 模式下无法互相唤起。Issue 提到“3 open PRs since May”，说明该方向已有长期社区推动，且对企业 IM 多 bot 协作非常关键。

### 6.4 REST API 支持从第 N 条消息 fork session

- PR：[#138381 feat(gateway): fork a session from message N over the REST API](https://github.com/NousResearch/hermes-agent/pull/138381)  
- 状态：OPEN  
- 模块：Gateway、Sessions  
- 类型：Feature

该 PR 为外部 UI 提供“rewind to here”“edit and resend”“retry with another model”的基础能力。它与 ChatGPT/Claude 类产品中的分支会话、重试、编辑重发体验一致，具备较强产品价值，可能成为下一版本的重要 API 能力。

### 6.5 Credential pool quota-window-aware 策略

- PR：[#138390 pool: quota-window-aware selection strategies](https://github.com/NousResearch/hermes-agent/pull/138390)  
- 状态：OPEN  
- 模块：Agent、CLI、OpenAI provider、Auth/Billing  
- 类型：Feature

新增 `earliest_reset`、`fresh_first` 等策略，基于外部 quota-probe cache 选择 credential。该功能直接回应多账号、多 token、限额窗口管理的实际需求，有助于降低 429 与成本浪费。

### 6.6 Plugin Catalog 新增插件

- PR：[#138398 plugin-catalog: add effortless-hermes](https://github.com/NousResearch/hermes-agent/pull/138398)  
- PR：[#138389 plugin-catalog: add codex-truly](https://github.com/NousResearch/hermes-agent/pull/138389)

插件生态继续扩展。`effortless-hermes` 关注根据 prompt 难度动态调整 reasoning effort；`codex-truly` 则涉及 Codex OAuth/catalog 相关能力。这说明社区在围绕成本优化、模型能力路由、外部认证集成持续扩展。

### 6.7 Vault 注册表单保护

- PR：[#138384 feat(vault): protect registration fills on owned nested documents](https://github.com/NousResearch/hermes-agent/pull/138384)  
- 状态：OPEN  
- 模块：Agent、Gateway、Browser、Auth  
- 类型：Feature/Security boundary

该 PR 依赖 #133689，意图保护浏览器注册表单填充场景中的 nested document。它显示 Hermes 在浏览器自动化与凭据安全之间继续强化边界。

---

## 7. 用户反馈摘要

### 7.1 用户希望 Hermes 更像稳定后台服务，而不是“会悄悄卡住”的本地进程

Telegram 卡死 80 分钟、gateway 重启循环、cron stranded、异步 delegation 消耗 quota 等问题表明，真实用户已经把 Hermes 用在长时间运行的自动化或聊天入口中。用户痛点不是单次调用失败，而是 **失败后没有超时、没有回复、没有自恢复、没有明显日志**。

相关链接：

- [#138358](https://github.com/NousResearch/hermes-agent/issues/138358)  
- [#138343](https://github.com/NousResearch/hermes-agent/issues/138343)

### 7.2 用户对 OpenAI-compatible API 的兼容性期望较高

Homarr assistant 使用 top-level `reasoning_effort`，但 Hermes 只读取 `model_options`。这说明用户期望 Hermes 的 `/v1/chat/completions` 尽可能兼容标准 OpenAI 客户端，而不是要求客户端适配 Hermes 扩展字段。

相关链接：

- [#138299](https://github.com/NousResearch/hermes-agent/issues/138299)

### 7.3 Desktop 用户关注原生平台体验

macOS 用户希望支持 Share Sheet；Windows 用户报告玻璃效果冷启动异常、SSH 到 Windows remote 高失败率；Linux/Electron 用户遇到 `/dev/shm` 权限导致 renderer crash。这些反馈表明 Desktop 已进入较真实的跨平台使用阶段，平台细节成为体验瓶颈。

相关链接：

- [#138278](https://github.com/NousResearch/hermes-agent/issues/138278)  
- [#138395](https://github.com/NousResearch/hermes-agent/issues/138395)  
- [#138378](https://github.com/NousResearch/hermes-agent/issues/138378)  
- [#138277](https://github.com/NousResearch/hermes-agent/issues/138277)

### 7.4 企业 IM / 多 Bot 协作场景正在增强

Feishu outbound mention、Telegram message queue、Bot Mode rooms 等问题都指向一个趋势：用户不只是单人单会话使用 Hermes，而是希望将其接入 IM、群组、多 Bot 工作区和自动化流程。

相关链接：

- [#138345](https://github.com/NousResearch/hermes-agent/issues/138345)  
- [#138347](https://github.com/NousResearch/hermes-agent/issues/138347)  
- [#138365](https://github.com/NousResearch/hermes-agent/issues/138365)

### 7.5 用户对安全边界和供应链安全的关注显著提升

今日多个安全 Issue/PR 来自逐行审计，覆盖 pm lock/state、tts/stt command provider、webhook/weixin media redirect、attachment downloader DNS rebinding、MCP schema injection 等。社区正在从“功能可用”转向“默认安全、失败关闭、边界明确”。

相关链接：

- [#138359](https://github.com/NousResearch/hermes-agent/issues/138359)  
- [#138362](https://github.com/NousResearch/hermes-agent/issues/138362)  
- [#138361](https://github.com/NousResearch/hermes-agent/issues/138361)  
- [#138376](https://github.com/NousResearch/hermes-agent/pull/138376)  
- [#138387](https://github.com/NousResearch/hermes-agent/pull/138387)  
- [#138386](https://github.com/NousResearch/hermes-agent/pull/138386)

---

## 8. 待处理积压

由于本日报仅包含过去 24 小时数据，无法完整判断所有长期未响应 Issue/PR。但从今日条目中可以识别出几个需要维护者优先关注的积压信号。

### 8.1 Open PR 数量过高，外部贡献者受限

- PR：[#138400](https://github.com/NousResearch/hermes-agent/pull/138400)  
- 相关说明：该 PR 明确写到 “Draft only because of #131859”，表示仓库 open-PR limit 阻止外部作者创建 non-draft 或 draft→ready。

建议：维护者应优先清理可快速合并的 bugfix/security PR，降低贡献者阻塞。否则高质量修复会停留在 draft 或无法进入 review 流程。

### 8.2 Feishu mention 方向已有长期开放 PR

- Issue：[#138345](https://github.com/NousResearch/hermes-agent/issues/138345)

Issue 提到该方向自 5 月以来已有 3 个 open PR。该功能影响 Feishu 多实例 bot-to-bot 协作，建议维护者明确方案：是支持 outbound mention entity，还是设计统一的 IM mention abstraction。

### 8.3 Windows Desktop sidebar glass 问题曾有未合并修复

- Issue：[#138395](https://github.com/NousResearch/hermes-agent/issues/138395)  
- 历史 PR：#111503，已关闭未合并

用户指出该问题在 v0.22.0 仍存在，并已有本地验证修复。建议重新评估旧 PR 或要求用户提交精简复现修复。

### 8.4 高风险安全 PR 需要尽快 review

建议优先 review 以下 PR：

- [#138376 fix(pm): fail closed on off-shape lock sha256 before it becomes a store path](https://github.com/NousResearch/hermes-agent/pull/138376)  
- [#138387 fix(security): pin attachment downloads to the validated address](https://github.com/NousResearch/hermes-agent/pull/138387)  
- [#138386 fix(security): quarantine poisoned MCP schemas and scan beyond 64 KiB](https://github.com/NousResearch/hermes-agent/pull/138386)

这些 PR 涉及路径遍历、DNS rebinding、MCP schema prompt injection 等安全边界。即使部分标签为 P3，也建议按安全风险而非功能优先级处理。

### 8.5 Gateway/session/message-delivery 相关问题集中爆发

建议将以下问题归并为一个短期稳定性 milestone：

- [#138343 Gateway restart loop after unclean death](https://github.com/NousResearch/hermes-agent/issues/138343)  
- [#138358 Telegram turn wedges before the agent starts](https://github.com/NousResearch/hermes-agent/issues/138358)  
- [#138365 Idle /queue or /steer as a bare photo caption drops the photo](https://github.com/NousResearch/hermes-agent/issues/138365)  
- [#138355 `_carry_parent_timestamps` no-op in compaction paths](https://github.com/NousResearch/hermes-agent/issues/138355)  
- [#138381 fork session from message N over REST API](https://github.com/NousResearch/hermes-agent/pull/138381)

这些问题共同指向 Hermes 的核心：会话状态、消息队列、外部入口和恢复机制。若下一版本能集中修复，将明显提升项目稳定性与用户信任。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

过去24小时无活动。

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

# LobsterAI 项目动态日报｜2026-10-14

项目：netease-youdao/LobsterAI  
统计窗口：过去 24 小时  
数据来源：GitHub Issues / Pull Requests / Releases

---

## 1. 今日速览

过去 24 小时内，LobsterAI **没有新的 Issue 活动**，但 PR 侧非常活跃，共有 **7 条 PR 更新**，其中 **1 条仍处于 Open 状态，6 条已关闭或合并**，显示维护团队主要在集中推进功能收敛、稳定性修复与发布后完善。

今日还伴随一个新版本发布：**LobsterAI 2026.10.13**，该版本引入 Office 文档编辑、macOS Computer Use、MCP 工具管理改进、界面刷新以及 OpenClaw 稳定性增强，属于一次功能与体验并重的较大版本更新。

从今日 PR 分布看，重点集中在 **桌面伴侣、设置导入导出安全、Windows 兼容性、埋点分析、技能边界约束** 等方向，说明项目正在从“功能扩张”进入“可用性、可靠性、可观测性和安全性增强”的阶段。

整体活跃度评估：**较高**。虽然社区 Issue 没有新增反馈，但维护端提交密集，且围绕刚发布版本进行配套修复和能力补强，项目健康度良好。

---

## 2. 版本发布

### LobsterAI 2026.10.13

链接：  
https://github.com/netease-youdao/LobsterAI/releases/tag/2026.10.13

发布时间：2026-10-13

#### 主要更新内容

根据 Release 摘要，本次版本重点包括：

1. **Office 文档编辑能力**
   - 新增或增强对 Office 类文档的编辑能力。
   - 这意味着 LobsterAI 的任务执行范围进一步从对话、检索、工具调用扩展到办公生产力场景。
   - 对用户而言，典型价值在于可直接处理文档修改、内容整理、格式调整等任务。

2. **macOS Computer Use 支持**
   - 引入对 macOS 的 Computer Use 能力支持。
   - 该能力通常意味着 AI 可以在用户授权下理解并操作桌面环境，用于更复杂的自动化任务。
   - 这将强化 LobsterAI 在个人 AI 助手方向的定位。

3. **MCP 工具管理改进**
   - MCP 工具管理能力得到增强。
   - 预计包括工具配置、启停、发现、调用或权限管理等体验优化。
   - 对依赖外部工具、插件和 Agent 工作流的用户较为关键。

4. **界面刷新与任务体验优化**
   - Release 提到 refreshed interface 和 smoother task experience。
   - 表明本版本不仅关注底层能力，也在优化前端交互、任务流转和用户感知体验。

5. **OpenClaw 稳定性与可靠性提升**
   - Release 明确提到 OpenClaw 的稳定性和可靠性有显著改进。
   - 结合今日 PR 中涉及 OpenClaw 与 Windows 子进程 UTF-8 的修复，可见该模块仍是近期重点维护区域。

#### 破坏性变更

当前 Release 摘要中未明确列出 Breaking Changes。  
基于现有数据，暂未发现必须迁移的 API、配置或数据结构变更。

建议用户升级前关注以下潜在影响：

- Office 文档编辑能力可能涉及新增权限、文件访问路径或本地组件依赖。
- macOS Computer Use 可能涉及系统辅助功能、屏幕录制或自动化权限授权。
- MCP 工具管理改进可能影响已有 MCP 工具配置方式或工具启用状态。
- OpenClaw 相关稳定性改进可能改变部分任务执行行为或错误处理方式。

#### 迁移与升级注意事项

建议升级用户重点检查：

- 是否需要重新授权 macOS 辅助功能权限。
- MCP 工具配置是否仍可正常加载。
- Office 文档相关任务是否需要额外文件权限。
- Windows 用户关注子进程编码相关修复是否影响本地脚本或 Python 工具链。
- 若使用设置导入导出功能，应注意今日相关 PR 已加强凭据导出安全策略。

---

## 3. 项目进展

今日共有 7 条 PR 更新，其中 6 条已关闭或合并，1 条仍待处理。整体来看，项目在以下方向有实质推进。

---

### 3.1 Windows / OpenClaw / Cowork：默认子进程使用 UTF-8

PR：#2868  
状态：Open  
作者：fisherdaddy  
链接：https://github.com/netease-youdao/LobsterAI/pull/2868

#### 内容概述

该 PR 标题为：

> fix(python): default Windows child processes to UTF-8

涉及标签：

- area: main
- area: openclaw
- area: cowork

#### 影响分析

这是一个偏底层兼容性修复，目标是让 Windows 下 Python 子进程默认使用 UTF-8 编码。

该问题对以下场景影响较大：

- Windows 用户运行 Python 工具、脚本或插件。
- OpenClaw 调用本地子进程。
- Cowork 相关任务中存在非 ASCII 文本、中文路径、中文输出或多语言内容。
- 工具执行结果需要被 LobsterAI 正确解析并回传给前端。

#### 项目推进意义

该 PR 若合并，将显著降低 Windows 环境下的编码错误、乱码、子进程输出解析失败等问题。  
考虑到 LobsterAI 面向中文用户和跨平台桌面使用场景，这属于较重要的稳定性修复。

---

### 3.2 技能边界：限制影视和音乐搜索到基础信息

PR：#2867  
状态：Closed  
作者：liuzhq1986  
链接：https://github.com/netease-youdao/LobsterAI/pull/2867

#### 内容概述

标题：

> fix(skills): restrict film and music search to basic information

涉及标签：

- area: docs
- area: skills

#### 影响分析

该 PR 对影视、音乐搜索技能的行为边界进行了限制，使其聚焦于“基础信息”检索。

可能涉及的优化方向包括：

- 避免技能返回过多、过深或版权敏感内容。
- 降低搜索结果噪声。
- 明确技能职责，提升回答稳定性。
- 避免用户误以为该技能可提供完整内容、资源下载或深度解析。

#### 项目推进意义

这是技能治理层面的修复。  
对于个人 AI 助手项目而言，技能边界清晰非常重要，有助于提升回答一致性、合规性和工具调用可控性。

---

### 3.3 数据分析：打通专家和任务使用漏斗

PR：#2866  
状态：Closed  
作者：btc69m979y-dotcom  
链接：https://github.com/netease-youdao/LobsterAI/pull/2866

#### 内容概述

标题：

> feat(analytics): connect expert and task usage funnels

涉及标签：

- area: renderer
- area: docs
- area: main
- area: cowork
- area: artifacts

摘要显示，该 PR 为以下模块增加可关联埋点：

- 专家发现
- 任务执行
- 能力调用
- 媒体生成
- 产物使用

并通过以下字段进行链路关联：

- journeyId
- taskId
- turnId

同时强调继续沿用现有 `rlog → wisdom` 链路，并保留旧模板与 `expert_kit` 事件含义。

#### 隐私与数据边界

该 PR 特别说明新增事件不会上传：

- 提示词
- 搜索正文
- 工具参数
- 错误原文
- 文件内容

这是一个重要信号：项目在增强产品分析能力的同时，仍在控制敏感数据采集范围。

#### 影响分析

该 PR 将提升维护团队对以下问题的洞察能力：

- 用户是否能发现专家能力。
- 用户是否成功召唤专家。
- 专家是否真实运行。
- 任务是否完成、失败或被取消。
- 能力调用在哪一步失败。
- 媒体生成或本地保存是否存在稳定性问题。
- 产物是否被复用。

#### 项目推进意义

这是产品成熟度提升的关键工作。  
从开源项目和 AI 助手产品角度看，埋点漏斗可以帮助团队识别真实使用瓶颈，为后续路线图提供数据依据。

---

### 3.4 桌面伴侣功能

PR：#2865  
状态：Closed  
作者：fisherdaddy  
链接：https://github.com/netease-youdao/LobsterAI/pull/2865

#### 内容概述

标题：

> feat: desktop companion

涉及标签：

- area: renderer

该 PR 摘要内容较少，但结合今日另一个桌面伴侣修复 PR #2862，可以判断桌面伴侣是近期重点推进方向。

#### 可能影响

桌面伴侣通常指常驻桌面、划词工具栏、快捷操作、上下文辅助等能力。  
这类功能对个人 AI 助手非常关键，因为它可以让 AI 从单独 App 变为系统级辅助入口。

#### 项目推进意义

如果该 PR 已合并，则说明 LobsterAI 正在增强桌面级入口和即时辅助能力。  
这会提升用户在浏览、阅读、写作、翻译、总结等日常场景中的使用频率。

---

### 3.5 Windows：隔离开发版应用身份

PR：#2864  
状态：Closed  
作者：fisherdaddy  
链接：https://github.com/netease-youdao/LobsterAI/pull/2864

#### 内容概述

标题：

> fix(windows): isolate development app identity

涉及标签：

- area: main

#### 影响分析

该 PR 可能解决开发版本与正式版本在 Windows 环境下的应用身份冲突问题，例如：

- 应用数据目录冲突。
- 系统通知身份冲突。
- 协议注册冲突。
- 快捷方式或安装包标识混淆。
- 开发版覆盖正式版配置。

#### 项目推进意义

这是开发和测试体验相关的基础修复。  
隔离开发应用身份可以降低测试新功能时影响正式环境的风险，有助于维护者和贡献者更安全地验证改动。

---

### 3.6 设置安全：安全导出 Provider 并保留旧版本导入兼容

PR：#2863  
状态：Closed  
作者：fisherdaddy  
链接：https://github.com/netease-youdao/LobsterAI/pull/2863

#### 内容概述

标题：

> fix(settings): secure provider exports and preserve legacy imports

涉及标签：

- area: renderer

摘要显示，该 PR 做了多项安全与兼容性修复：

- Provider 导出默认不包含凭据。
- v3 认证备份需要用户密码。
- 保留 v1 / v2 导入兼容。
- 导入失败采用原子失败机制。
- 增加凭据路由保护。
- 增加加密、旧 fixture、篡改、部分导入、取消等回归测试。

#### 影响分析

这是今日最重要的安全相关 PR 之一。

它解决的是设置导入导出中非常敏感的一类问题：  
AI 助手通常保存模型 Provider、API Key、本地服务地址、账号令牌等配置，如果导出逻辑不安全，可能导致凭据泄露。

#### 项目推进意义

该 PR 显著提升了设置备份、迁移、恢复功能的安全性和可靠性。

对用户的实际价值包括：

- 默认导出更安全。
- 需要凭据备份时有明确认证步骤。
- 老版本备份仍可导入，降低升级成本。
- 导入失败不会造成半写入状态。
- 防止凭据进入错误 Provider 或错误位置。

---

### 3.7 桌面伴侣：稳定划词工具栏菜单

PR：#2862  
状态：Closed  
作者：fisherdaddy  
链接：https://github.com/netease-youdao/LobsterAI/pull/2862

#### 内容概述

标题：

> fix(desktop-companion): stabilize selection toolbar menu

涉及标签：

- area: renderer
- area: docs
- area: main

摘要显示，该 PR 主要调整划词工具栏体验：

- 主栏固定为：
  - 翻译
  - 复制
  - 朗读
  - 总结
  - 更多
- 更多按钮改为省略号。
- 更多菜单包括：
  - 解释
  - 问问 LobsterAI
  - 在此应用中禁用
  - 更多设置
- 菜单默认在工具栏下方展开。
- 仅在屏幕下方空间不足时向上展开。
- Electron 窗口提前预留菜单空间。
- 渲染层只测量工具栏本身。
- 切换菜单不再调整窗口位置和尺寸。
- 空白区域保持点击穿透。
- 更新定位、菜单开关、透明区域点击等回归测试、说明和截图。

#### 影响分析

该 PR 解决的是桌面伴侣划词菜单在展开、收起时因窗口缩放导致的闪烁问题。

这类问题虽然不是核心能力缺失，但对用户体验影响明显，因为划词工具栏属于高频、轻量、即时交互入口。  
如果出现闪烁、位置跳动、遮挡或点击不稳定，会直接影响用户对桌面助手的信任感。

#### 项目推进意义

该 PR 说明团队正在打磨桌面伴侣的细节体验。  
结合 #2865，可以判断桌面伴侣正在从功能实现阶段进入体验稳定阶段。

---

## 4. 社区热点

今日没有 Issue 更新，PR 也未提供有效评论数和反应数数据；所有 PR 的评论字段均为 `undefined`，点赞数均为 0。  
因此，严格按评论和反应数据看，今日没有形成明显的社区讨论热点。

不过，从 PR 内容重要性和覆盖面来看，以下事项值得关注。

---

### 热点 1：专家与任务使用漏斗埋点

PR：#2866  
链接：https://github.com/netease-youdao/LobsterAI/pull/2866

#### 关注原因

该 PR 覆盖 renderer、docs、main、cowork、artifacts 多个区域，且直接服务于专家功能、任务执行和产物复用分析。

#### 背后诉求

维护团队需要更精确地回答：

- 用户是否发现了专家能力？
- 专家是否被召唤？
- 任务是否真的开始运行？
- 用户在哪一步放弃？
- 工具失败、生成失败、本地保存失败分别占多少？
- 哪些专家能力具有真实复用价值？

这表明 LobsterAI 正在从“功能提供”走向“行为分析驱动优化”。

---

### 热点 2：桌面伴侣体验稳定

PR：#2862  
链接：https://github.com/netease-youdao/LobsterAI/pull/2862

PR：#2865  
链接：https://github.com/netease-youdao/LobsterAI/pull/2865

#### 关注原因

今日有两条与 desktop companion 相关的 PR，说明桌面伴侣是当前高优先级方向。

#### 背后诉求

用户可能希望 LobsterAI 不只是一个聊天窗口，而是能够在日常桌面操作中随时提供：

- 翻译
- 复制
- 朗读
- 总结
- 解释
- 对选中文本继续追问
- 对特定应用禁用
- 快速进入设置

这类能力更接近个人 AI 助手的实际使用场景。

---

### 热点 3：设置导入导出安全

PR：#2863  
链接：https://github.com/netease-youdao/LobsterAI/pull/2863

#### 关注原因

Provider 配置通常包含 API Key、访问令牌、模型服务地址等敏感信息。  
该 PR 明确强化凭据导出策略，是项目安全成熟度提升的体现。

#### 背后诉求

用户需要在多设备、多版本之间迁移配置，但又不希望误导出敏感凭据。  
维护者需要同时兼顾：

- 安全默认值
- 备份完整性
- 旧版本兼容
- 导入失败可回滚
- 防篡改能力

---

## 5. Bug 与稳定性

今日没有新的 Issue 报告 Bug。  
但从 PR 标题和内容看，维护团队主动修复了多项稳定性和兼容性问题。

---

### 高优先级：Provider 设置导出安全与导入兼容

PR：#2863  
状态：Closed  
链接：https://github.com/netease-youdao/LobsterAI/pull/2863

#### 问题类型

安全与数据一致性问题。

#### 可能影响

- 凭据被误导出。
- 旧版本备份无法导入。
- 导入过程中出现部分写入。
- 篡改后的备份未被正确识别。
- 凭据被路由到错误配置位置。

#### 修复状态

已有修复 PR，状态为 Closed。

#### 重要性

高。  
原因是该问题涉及用户敏感凭据和配置数据完整性。

---

### 中高优先级：Windows Python 子进程编码问题

PR：#2868  
状态：Open  
链接：https://github.com/netease-youdao/LobsterAI/pull/2868

#### 问题类型

跨平台兼容性 / 编码问题。

#### 可能影响

- Windows 下 Python 子进程输出乱码。
- 中文路径或中文内容处理失败。
- OpenClaw / Cowork 调用本地工具时解析异常。
- 工具执行结果无法正确返回。

#### 修复状态

已有 fix PR，但仍处于 Open 状态，尚待合并。

#### 重要性

中高。  
对 Windows 中文用户和本地工具调用场景影响较大。

---

### 中优先级：桌面伴侣划词工具栏闪烁与定位不稳定

PR：#2862  
状态：Closed  
链接：https://github.com/netease-youdao/LobsterAI/pull/2862

#### 问题类型

桌面交互稳定性 / UI 回归。

#### 可能影响

- 工具栏展开更多菜单时窗口闪烁。
- 菜单展开方向不符合预期。
- 窗口尺寸调整导致视觉跳动。
- 透明区域点击穿透异常。

#### 修复状态

已有修复 PR，状态为 Closed。

#### 重要性

中。  
该问题影响高频交互体验，但不属于核心任务执行失败。

---

### 中优先级：Windows 开发版应用身份隔离

PR：#2864  
状态：Closed  
链接：https://github.com/netease-youdao/LobsterAI/pull/2864

#### 问题类型

开发环境隔离 / Windows 应用身份冲突。

#### 可能影响

- 开发版与正式版配置混用。
- 本地调试污染正式环境。
- 应用身份、通知、协议或缓存冲突。

#### 修复状态

已有修复 PR，状态为 Closed。

#### 重要性

中。  
主要影响开发者和测试人员，但对项目发布质量有间接价值。

---

### 低到中优先级：影视和音乐搜索技能边界过宽

PR：#2867  
状态：Closed  
链接：https://github.com/netease-youdao/LobsterAI/pull/2867

#### 问题类型

技能行为约束 / 搜索结果边界。

#### 可能影响

- 返回超出基础信息范围的内容。
- 用户预期不清晰。
- 工具行为不稳定或噪声较高。

#### 修复状态

已有修复 PR，状态为 Closed。

#### 重要性

低到中。  
偏产品策略和技能治理，但有助于长期稳定。

---

## 6. 功能请求与路线图信号

今日没有新的 Issue，因此没有直接来自用户的新功能请求。  
但从 Release 和 PR 可以观察到明确的路线图信号。

---

### 信号 1：Office 文档编辑将成为重要生产力能力

Release：2026.10.13  
链接：https://github.com/netease-youdao/LobsterAI/releases/tag/2026.10.13

#### 判断

Office 文档编辑进入正式 Release，说明 LobsterAI 正在加强办公场景能力。  
后续可能继续扩展：

- Word 文档修改
- PPT 内容生成与编辑
- Excel 数据处理
- 文档摘要、润色、格式化
- 多文档协作处理

---

### 信号 2：Computer Use 正在向 macOS 扩展

Release：2026.10.13  
链接：https://github.com/netease-youdao/LobsterAI/releases/tag/2026.10.13

#### 判断

macOS Computer Use 支持是个人 AI 助手方向的重要里程碑。  
后续可能出现更多围绕系统操作的能力：

- 自动打开应用
- 跨应用复制和填写
- 屏幕内容理解
- GUI 自动化
- 任务录制与回放
- 用户授权下的本地自动操作

---

### 信号 3：桌面伴侣将成为高频入口

PR：#2865  
链接：https://github.com/netease-youdao/LobsterAI/pull/2865

PR：#2862  
链接：https://github.com/netease-youdao/LobsterAI/pull/2862

#### 判断

桌面伴侣相关 PR 连续出现，说明该能力不是一次性功能，而是正在持续打磨。

后续可能被纳入下一版本的方向包括：

- 更稳定的划词菜单
- 更多快捷动作
- 应用级禁用规则
- 上下文问答
- 系统托盘或悬浮入口
- 与翻译、总结、朗读等技能深度结合

---

### 信号 4：MCP 工具生态将继续增强

Release：2026.10.13  
链接：https://github.com/netease-youdao/LobsterAI/releases/tag/2026.10.13

#### 判断

MCP 工具管理改进已经进入版本亮点，说明 LobsterAI 正在重视工具生态和可扩展性。

后续可能继续推进：

- MCP 工具市场或推荐
- 工具权限管理
- 工具健康检查
- 工具调用日志
- 工具失败诊断
- 多工具编排

---

### 信号 5：专家系统将进入数据驱动优化阶段

PR：#2866  
链接：https://github.com/netease-youdao/LobsterAI/pull/2866

#### 判断

专家发现、召唤、任务执行、产物复用等漏斗被打通后，说明专家功能可能进入持续迭代阶段。

后续团队可能基于数据优化：

- 专家入口曝光位置
- 专家推荐策略
- 专家任务成功率
- 用户等待和取消体验
- 失败提示与重试机制
- 专家产物复用路径

---

## 7. 用户反馈摘要

今日 Issues 更新为 0 条，因此没有新的公开用户反馈、评论或痛点可提炼。

不过，结合今日 PR 可以推断维护团队正在回应或预防以下典型用户痛点：

---

### 7.1 桌面划词入口需要更稳定

相关 PR：#2862  
链接：https://github.com/netease-youdao/LobsterAI/pull/2862

潜在用户痛点：

- 划词后工具栏闪烁。
- 展开更多菜单时位置跳动。
- 操作入口不够稳定。
- 想快速使用翻译、总结、朗读、解释等操作。

维护响应：

- 固定主工具栏顺序。
- 调整更多菜单结构。
- 预留菜单空间，减少窗口尺寸变化。
- 保持透明区域点击穿透。
- 增加回归测试。

---

### 7.2 配置迁移要安全且兼容

相关 PR：#2863  
链接：https://github.com/netease-youdao/LobsterAI/pull/2863

潜在用户痛点：

- 想备份 Provider 设置，但担心 API Key 泄露。
- 希望从旧版本迁移设置不失败。
- 导入失败时不希望破坏现有配置。
- 希望加密备份有明确保护机制。

维护响应：

- 默认无凭据导出。
- 认证备份需要用户密码。
- 保留 v1 / v2 导入兼容。
- 原子导入失败。
- 增加篡改和取消测试。

---

### 7.3 Windows 用户需要更可靠的本地工具执行

相关 PR：#2868  
链接：https://github.com/netease-youdao/LobsterAI/pull/2868

潜在用户痛点：

- Windows 下中文输出乱码。
- Python 子进程处理中文失败。
- 本地工具调用结果不可读。
- OpenClaw / Cowork 任务在 Windows 上不稳定。

维护响应：

- 准备将 Windows 子进程默认设为 UTF-8。
- 该修复仍在 Open 状态，需要继续跟进。

---

## 8. 待处理积压

基于今日提供的数据，没有长期未响应的 Issue 或历史 PR 信息，因此无法判断长期积压项。  
不过，当前仍有 1 条 Open PR 值得维护者优先关注。

---

### 待处理 PR：Windows 子进程 UTF-8 修复

PR：#2868  
状态：Open  
作者：fisherdaddy  
链接：https://github.com/netease-youdao/LobsterAI/pull/2868

#### 建议优先级

高。

#### 原因

- 涉及 Windows 平台兼容性。
- 涉及 Python 子进程，可能影响多个本地工具调用场景。
- 标签覆盖 main、openclaw、cowork，影响范围不小。
- 与 Release 中 OpenClaw 稳定性增强方向一致。
- 对中文用户尤其重要。

#### 建议维护动作

- 尽快补充或确认 Windows 中文输出回归测试。
- 验证对子进程环境变量、编码参数、shell 调用方式的影响。
- 检查是否影响非 UTF-8 旧脚本。
- 合并前可重点测试：
  - 中文路径
  - 中文标准输出
  - 中文标准错误
  - Python 工具调用
  - Cowork 任务链路
  - OpenClaw 本地执行链路

---

## 总体健康度评估

今日 LobsterAI 项目呈现出 **维护活跃、Issue 安静、发布后快速修复和增强** 的状态。

关键指标：

- Issues 更新：0
- PR 更新：7
- Open PR：1
- Closed / Merged PR：6
- 新 Release：1

综合判断：

- **开发活跃度：高**
- **社区反馈活跃度：低**
- **发布节奏：活跃**
- **稳定性投入：高**
- **安全意识：增强**
- **产品方向：清晰，聚焦个人 AI 助手、桌面伴侣、Computer Use、Office 生产力和 MCP 工具体系**

今日最值得关注的是三条主线：

1. **桌面伴侣体验打磨**：#2862、#2865  
2. **配置与凭据安全增强**：#2863  
3. **Windows / OpenClaw 稳定性修复**：#2868  

如果 #2868 能尽快完成合并，LobsterAI 在 Windows 中文环境和本地工具调用上的可靠性将进一步提升。

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

# CoPaw 项目动态日报｜2026-10-14

> 数据来源：GitHub 过去 24 小时活动。  
> 注：本次数据中的 Issue / PR 链接均指向 `agentscope-ai/QwenPaw` 仓库，以下日报按提供的数据进行分析。

---

## 1. 今日速览

过去 24 小时项目活跃度较高：共有 **8 条 Issue 更新**、**13 条 PR 更新**，并连续发布了 **2 个 beta 版本：v2.2.2-beta.5 与 v2.2.2-beta.6**。  
今日工作重心明显集中在 **v2.2.2 beta 版本稳定性验证、桌面端/控制台体验修复、插件化 UI 能力扩展** 三个方向。  
PR 侧有 **4 个已关闭/合并项**，其中包括版本号提升、E2E 测试修复、历史数据库路径与备份修复；另有 **9 个待合并 PR**，包含 OpenUI、模型管理、启动性能、日志轮转等较大改动。  
Issue 侧新增问题以 **控制台交互、Agent 间调用稳定性、Cron Job 配置、Hub Docker 文档缺失** 为主，说明 beta 阶段用户正在覆盖更多真实使用场景。  
整体来看，项目处于 **高频 beta 迭代与稳定性收敛阶段**，健康度良好，但仍存在多 Agent 调用取消、桌面启动、配置体验等需要优先处理的问题。

---

## 2. 版本发布

### v2.2.2-beta.6

链接：  
https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.2-beta.6

该版本为今日第二个 beta 版本，主要延续 v2.2.2 系列的稳定性修复与发布验证。

已知包含的变更：

- 修复 E2E 测试选择器与当前 Console UI 不一致的问题  
  PR：[#8247](https://github.com/agentscope-ai/QwenPaw/pull/8247)
- 修复历史数据库路径与便携备份支持问题  
  PR：[#8246](https://github.com/agentscope-ai/QwenPaw/pull/8246)
- 版本号提升至 `2.2.2b6`  
  PR：[#8250](https://github.com/agentscope-ai/QwenPaw/pull/8250)

相关发布验证 Issue：

- [#8258 [Release Duty] QwenPaw v2.2.2-beta.6 Installation Verification](https://github.com/agentscope-ai/QwenPaw/issues/8258)

#### 破坏性变更

当前数据中未明确显示破坏性变更。  
但 `history` 路径解析逻辑发生调整，涉及外部数据库路径、`~`、`..`、符号链接、工作区外路径等场景，建议使用自定义历史数据库路径的用户重点验证。

#### 迁移注意事项

- 如果用户曾配置过自定义历史数据库路径，应重点检查：
  - 绝对路径是否仍能正确解析；
  - 工作区外数据库是否能正常读取；
  - 备份文件是否按预期生成；
  - 便携备份是否不会错误依赖本机路径。
- 由于该版本包含 E2E 修复，建议维护者确认发布流水线与桌面端安装验证是否已全部通过。

---

### v2.2.2-beta.5

链接：  
https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.2-beta.5

该版本是 v2.2.2 beta 系列的前一个发布版本，重点包含 Console 与 Provider 相关修复。

已知包含的变更：

- 修复 Console 中粘贴长文本时草稿内容保留问题  
  PR：[#8119](https://github.com/agentscope-ai/QwenPaw/pull/8119)
- 修复 providers 对新版 GPT token limit 参数的识别问题  
  PR：[#8090](https://github.com/agentscope-ai/QwenPaw/pull/8090)
- 版本号提升至 `2.2.2b5`  
  PR：[#8238](https://github.com/agentscope-ai/QwenPaw/pull/8238)

相关发布验证 Issue：

- [#8242 [Release Duty] QwenPaw v2.2.2-beta.5 Installation Verification](https://github.com/agentscope-ai/QwenPaw/issues/8242)

#### 破坏性变更

当前数据中未显示明确破坏性变更。

#### 迁移注意事项

- 使用 OpenAI / GPT 兼容 Provider 的用户，应验证 token limit 参数是否符合预期。
- 高频使用 Console 长文本输入的用户，可关注粘贴大段内容后的草稿恢复体验。

---

## 3. 项目进展

今日已关闭/合并的重要 PR 共 4 个，其中 2 个为版本号提升，2 个为实际修复。

### 已推进的关键修复

#### 1. 修复 E2E 测试与当前 Console UI 不匹配

PR：[#8247 fix(e2e): align selectors with current console ui](https://github.com/agentscope-ai/QwenPaw/pull/8247)

该 PR 修复了发布过程中由于 UI 结构变化导致的 E2E 失败问题。  
摘要中提到，失败原因并非版本 bump 本身，而是此前 UI 调整后测试仍使用旧选择器，例如 Settings 父级标题变更等。

影响：

- 提升发布流水线可靠性；
- 减少 beta 发布被过期测试阻塞的概率；
- 为后续 Console UI 调整建立更准确的自动化验证基础。

---

#### 2. 支持外部历史数据库路径与便携备份

PR：[#8246 fix(history): support external database paths and portable backups](https://github.com/agentscope-ai/QwenPaw/pull/8246)

该 PR 允许历史数据库使用原生绝对路径，包括工作区外路径，同时支持：

- 工作区相对路径；
- `..`；
- `~`；
- 符号链接；
- 外部数据库路径；
- 更明确的便携备份行为。

影响：

- 增强桌面端与高级用户的数据管理能力；
- 对多环境迁移、外置盘、企业部署、便携版使用更友好；
- 降低历史记录因路径限制导致不可用的风险。

---

#### 3. v2.2.2 beta 版本推进

PR：

- [#8238 chore: bump the version to 2.2.2b5](https://github.com/agentscope-ai/QwenPaw/pull/8238)
- [#8250 chore: bump the version to 2.2.2b6](https://github.com/agentscope-ai/QwenPaw/pull/8250)

这两个 PR 推动了今日两个 beta 版本发布。  
结合 Release Duty Issue 可以看出，项目正在通过高频 beta 版本进行安装验证和回归收敛。

---

### 项目整体推进评估

今日项目推进幅度较明显：

- 发布节奏：**一天内 2 个 beta 版本**，说明 v2.2.2 进入密集验证阶段；
- 稳定性：修复了 E2E 与历史路径相关问题；
- 功能演进：OpenUI、模型管理、评估网站、inline UI plugin 等大体量 PR 已进入待合并状态；
- 风险点：多 Agent 调用取消、Cron Job 编辑、导航定位等用户侧问题尚无明确修复合并。

整体判断：项目今日从 **发布工程稳定性与数据路径能力** 上向前推进明显，但用户侧运行时稳定性仍需要继续收敛。

---

## 4. 社区热点

今日 Issue 评论数整体不高，多数为 1 条评论，暂无明显“爆发式”讨论。但从问题类型看，以下议题最值得关注。

### 1. Hub 模式 Docker 启动文档缺失

Issue：

- [#8256 [Docs]: 文档中Hub模式缺少DOCKER方式启动方法](https://github.com/agentscope-ai/QwenPaw/issues/8256)
- [#8255 [Docs]](https://github.com/agentscope-ai/QwenPaw/issues/8255)

用户反馈 Hub 模式文档中缺少 Docker 启动方式，当前按 Docker 启动得到的是非 Hub 模式，但在沙龙中听到的信息与实际体验不一致。

背后诉求：

- 用户希望通过 Docker 快速部署 Hub 模式；
- 文档与产品能力之间存在认知落差；
- Hub 模式中的 Docker 镜像环境选项暗示该能力应当可用，但缺乏明确启动命令。

分析：

这是典型的“功能存在但入口/文档不完整”问题。对新用户和企业部署用户影响较大，建议合并重复 Issue，并尽快补充：

- Hub 模式 Docker 启动命令；
- 必要环境变量；
- 与普通模式的区别；
- Docker Compose 示例；
- 常见错误排查。

---

### 2. Agent 间调用会话被静默取消

Issue：[#8252 [Bug] Agent 间调用会话被静默取消（CancelledError）](https://github.com/agentscope-ai/QwenPaw/issues/8252)

该问题描述较完整，涉及：

- Windows 10 AMD64；
- QwenPaw Desktop 2.2.1；
- 多 Agent 舰队；
- Orchestrator / Reasoner / Executor / Reviewer / Defender；
- 飞书通道入口；
- Agent 之间通过 `ChatWithAgent` 调用；
- 会话被 `CancelledError` 静默取消；
- 产物归零；
- 未记录取消发起方和原因。

背后诉求：

- 用户正在使用较复杂的多 Agent 协作场景；
- 当前错误可观测性不足；
- 用户需要知道是谁取消、为什么取消、是否为超时/并发/资源抢占。

分析：

这是今日最重要的运行时稳定性反馈之一。它不只是单点 Bug，还暴露了 Agent 编排链路中的可观测性问题。建议优先补充日志字段和取消原因追踪。

---

### 3. Settings Center 未遵循菜单可见性覆盖

Issue：[#8254 Settings Center ignores public menu visibility overrides for built-in entries](https://github.com/agentscope-ai/QwenPaw/issues/8254)  
修复 PR：[#8257 fix(console): honor menu visibility in Settings Center](https://github.com/agentscope-ai/QwenPaw/pull/8257)

该问题已有快速响应的修复 PR。  
用户指出插件可以通过 public menu API 隐藏内置快捷入口，主侧边栏会遵循该设置，但 Settings Center 中对应入口仍然显示。

背后诉求：

- 插件系统需要一致的权限与可见性语义；
- UI 入口隐藏不应只在主侧边栏生效；
- Settings Center 也应使用同一套 menu visibility 判断。

分析：

这是插件 API 一致性问题，影响插件开发者体验。已有 PR 说明维护响应较快，预计可进入后续 beta。

---

## 5. Bug 与稳定性

以下按影响严重程度排序。

### P0 / P1：多 Agent 调用被静默取消，缺少取消原因追踪

Issue：[#8252](https://github.com/agentscope-ai/QwenPaw/issues/8252)  
状态：Open  
是否已有 fix PR：未见明确关联 PR

影响范围：

- 多 Agent 协作；
- Agent 间 `ChatWithAgent` 调用；
- 飞书通道入口；
- Windows 桌面端；
- 复杂任务编排。

风险：

- 会话产物归零；
- 用户无法判断是哪个 Agent 或模块触发取消；
- 缺少取消原因会严重影响排障；
- 对企业自动化、多 Agent 工作流可靠性影响较大。

建议：

- 在 `CancelledError` 捕获点记录调用链、发起方、取消原因、trace id；
- 区分用户取消、超时取消、上游 Agent 取消、资源回收取消、系统 shutdown；
- 在 UI 或日志中暴露可诊断信息。

---

### P1：Cron Job 修改时默认时间丢失，Request Content 显示 `[object Object]`

Issue：[#8249 [Bug]: Cron Job Modification BUG](https://github.com/agentscope-ai/QwenPaw/issues/8249)  
状态：Open  
是否已有 fix PR：未见明确关联 PR

影响范围：

- v2.2.2 beta5；
- 手动修改 Cron Job；
- 定时任务时间字段；
- Request Content 编辑区域。

用户反馈：

- 修改 cron job 时，默认时间总是变成 0 小时 0 分钟；
- 选择不同时间后点击 Task Type，Request Content 显示 `[object Object]`，而不是原始内容。

风险：

- 用户可能误改定时任务执行时间；
- 请求内容序列化异常可能导致任务配置损坏；
- 影响自动化任务可靠性。

建议：

- 检查 cron 编辑表单的初始值回填；
- 检查 Task Type 切换时 Request Content 的序列化逻辑；
- 增加任务编辑回归测试。

---

### P1 / P2：消息导航目录定位不准确

Issue：[#8251 [Bug][Console] Message-navigation directory cannot locate accurately](https://github.com/agentscope-ai/QwenPaw/issues/8251)  
状态：Open  
是否已有 fix PR：未见明确关联 PR

用户指出 PR [#8214](https://github.com/agentscope-ai/QwenPaw/pull/8214) 修复了“用户无法中断自动定位”的一部分，但导航目录仍存在定位不准确问题。  
根因描述为：位置按条目数量分摊，只有 active anchor 被测量。

影响：

- 长对话或复杂消息列表中，点击导航目录无法精准定位；
- 影响 Console 阅读体验；
- 对频繁回看多轮 Agent 输出的用户影响明显。

建议：

- 对每个 anchor 进行实际测量或使用虚拟列表兼容方案；
- 避免按 item count 简单估算位置；
- 增加长消息、不同高度消息、异步渲染内容的测试。

---

### P2：Settings Center 不遵循菜单可见性覆盖

Issue：[#8254](https://github.com/agentscope-ai/QwenPaw/issues/8254)  
修复 PR：[#8257](https://github.com/agentscope-ai/QwenPaw/pull/8257)  
状态：Issue Open，PR Open

影响：

- 插件隐藏内置菜单入口后，Settings Center 中仍显示；
- UI 一致性受损；
- 插件开发者无法完全控制可见性。

当前进展：

- 已有小体量修复 PR；
- 预计较容易合入后续 beta。

---

### P2：交互式 HTML 预览失效

PR：[#8245 fix(console): restore interactive HTML previews](https://github.com/agentscope-ai/QwenPaw/pull/8245)  
状态：Open

虽然未见对应 Issue，但 PR 描述表明存在以下问题：

- 依赖 JavaScript 渲染的 HTML 在只读预览中为空白；
- 缺少解释性提示；
- 纯动态页面需要展示提示与“Open in browser”按钮；
- 静态内容仍应可预览，并附带说明。

影响：

- 对使用 Agent 生成 HTML、报表、可视化内容的用户影响较大；
- 尤其影响 Console 中查看生成网页的体验。

---

### P2：Windows 桌面端日志轮转问题

PR：[#8243 fix(tauri): rotate sidecar desktop logs on Windows](https://github.com/agentscope-ai/QwenPaw/pull/8243)  
状态：Open

问题：

- sidecar 的长生命周期 tee handle 可能阻止 Windows 上 `RotatingFileHandler` 重命名 `desktop.log`；
- 导致日志文件无限增长；
- crash trace 需要分离到单独轮转文件。

影响：

- Windows 桌面用户磁盘占用风险；
- 长时间运行场景下日志不可控；
- 排障日志与崩溃日志混杂。

---

### P2：桌面启动 readiness 判断过早

PR：[#8241 fix(desktop): wait for core readiness and preserve startup connection capacity](https://github.com/agentscope-ai/QwenPaw/pull/8241)  
状态：Open

问题：

- 桌面启动时将 `/api/version` 作为 readiness 判断；
- 但该 endpoint 在 core agents 初始化完成前就可能响应；
- 可能导致 Console 过早进入，资源与启动流程竞争；
- Windows 上 socket 连接容量也可能受到影响。

影响：

- 桌面端启动可靠性；
- 初次进入 Console 时的稳定性；
- Windows 用户体验。

---

## 6. 功能请求与路线图信号

今日待合并 PR 中包含多项路线图级别信号。

### 1. Inline OpenUI 与智能 UI 能力

PR：

- [#8248 feat(plugins): add inline OpenUI support for Intelligent UI](https://github.com/agentscope-ai/QwenPaw/pull/8248)
- [#8239 feat(chat): support inline UI plugins and scoped message submission](https://github.com/agentscope-ai/QwenPaw/pull/8239)

这两个 PR 共同指向一个明确方向：  
项目正在从“文本对话式 Agent”向“可交互 UI + Agent 输出”的方向演进。

能力包括：

- 在 Chat 回复中渲染交互式 UI；
- 支持 OpenUI 组件目录、parser、响应式 runtime；
- 插件可在 assistant message 内嵌 UI；
- action 可提交回原始 conversation；
- 保持组件状态与输入焦点；
- 为 OpenUI Lang 和自定义 UI 库提供扩展基础。

路线图信号：

- 智能体输出不再局限于 Markdown；
- Console 将成为可交互应用承载层；
- 未来可能支持表单、控制面板、工具调用结果 UI、可操作报告等高级场景。

---

### 2. JSON 驱动的评测网站与 leaderboard

PR：[#8253 feat(website): add JSON-driven evaluation index](https://github.com/agentscope-ai/QwenPaw/pull/8253)

该 PR 新增 JSON 驱动的 QwenPaw evaluation website。维护者可将版本化评测结果提交到 `website/evaluation/results/`，网站构建时验证并生成 leaderboard。

路线图信号：

- 项目开始系统化呈现不同 SDK 版本或运行结果；
- 有助于增强项目透明度；
- 对 benchmark、模型/Agent 框架能力比较、版本质量追踪有价值。

可能纳入下一版本的概率：中高。  
虽然 PR 体量为 XXXL，但属于 website 侧功能，对核心运行时影响相对可控。

---

### 3. 模型管理体验重构

PR：[#8240 feat(console): refine model management experience](https://github.com/agentscope-ai/QwenPaw/pull/8240)

该 PR 聚焦模型管理页面的信息架构与交互体验。

主要方向：

- 明确全局默认模型作用域；
- 模型页聚焦 provider、凭据和模型目录；
- 支持在 provider 卡片内直接添加或修改 API Key；
- 完整配置仍由设置入口承担；
- 修正搜索空状态、接入变体名称、provider 操作术语；
- 延迟加载非首屏 provider 图标；
- 优化对话页模型管理态退出入口；
- 补齐思考能力联动、自动保存和响应式验证。

路线图信号：

- 项目正在降低模型配置门槛；
- 面向多 provider、多模型、多 Agent 配置场景做体验优化；
- 对个人 AI 助手类产品非常关键。

---

### 4. 启动性能优化：跳过禁用 channel SDK

PR：[#8244 perf(channels): skip disabled channel SDKs during configured startup](https://github.com/agentscope-ai/QwenPaw/pull/8244)

问题背景：

- 配置化启动时会在检查 channel 是否启用前导入所有内置 channel SDK；
- 默认 Windows 桌面配置仅启用 Console，但 discovery 步骤测得耗时 15.1 秒；
- 此期间 event loop 无法服务启动请求。

路线图信号：

- 桌面端冷启动性能正在成为重点优化方向；
- channel 模块加载会更按需化；
- 对个人用户和 Windows 用户体验改善明显。

---

### 5. Hub Docker 文档需求

Issue：

- [#8256](https://github.com/agentscope-ai/QwenPaw/issues/8256)
- [#8255](https://github.com/agentscope-ai/QwenPaw/issues/8255)

这是用户提出的明确文档功能需求。  
若 Hub 模式已支持 Docker，应补文档；若尚未完全支持，则需要明确当前限制。

预计纳入下一版本文档更新的概率较高，因为问题边界清晰且实现成本较低。

---

## 7. 用户反馈摘要

### 真实使用场景

今日用户反馈显示，项目已被用于较复杂场景：

- 多 Agent 舰队协作：Orchestrator / Reasoner / Executor / Reviewer / Defender  
  Issue：[#8252](https://github.com/agentscope-ai/QwenPaw/issues/8252)
- 飞书通道作为入口，Agent 间通过 `ChatWithAgent` 互相调用  
  Issue：[#8252](https://github.com/agentscope-ai/QwenPaw/issues/8252)
- Windows 桌面端生产或准生产使用  
  Issues：[#8252](https://github.com/agentscope-ai/QwenPaw/issues/8252), [#8251](https://github.com/agentscope-ai/QwenPaw/issues/8251)
- Cron Job 定时任务管理  
  Issue：[#8249](https://github.com/agentscope-ai/QwenPaw/issues/8249)
- Hub 模式 Docker 部署  
  Issues：[#8256](https://github.com/agentscope-ai/QwenPaw/issues/8256), [#8255](https://github.com/agentscope-ai/QwenPaw/issues/8255)

---

### 用户痛点

#### 1. 可观测性不足

在 Agent 调用被取消时，用户不知道：

- 谁取消了任务；
- 为什么取消；
- 是否超时；
- 是否资源竞争；
- 是否上游 Agent 主动中止；
- 是否系统异常。

对应 Issue：[#8252](https://github.com/agentscope-ai/QwenPaw/issues/8252)

---

#### 2. 配置编辑存在状态丢失或序列化异常

Cron Job 修改时：

- 原始时间未正确回填；
- Request Content 显示 `[object Object]`。

对应 Issue：[#8249](https://github.com/agentscope-ai/QwenPaw/issues/8249)

这类问题会直接降低用户对自动化任务系统的信任。

---

#### 3. 长对话导航体验仍不稳定

用户反馈导航目录定位不准确，说明 Console 在长消息、复杂消息高度场景下仍需继续打磨。

对应 Issue：[#8251](https://github.com/agentscope-ai/QwenPaw/issues/8251)

---

#### 4. 文档与实际能力之间存在落差

Hub Docker 启动方式缺失，使用户无法确认：

- Hub 模式是否支持 Docker；
- 应使用哪个镜像；
- 需要哪些参数；
- 为什么启动后是非 Hub 模式。

对应 Issues：

- [#8256](https://github.com/agentscope-ai/QwenPaw/issues/8256)
- [#8255](https://github.com/agentscope-ai/QwenPaw/issues/8255)

---

### 正向信号

- 对 Settings Center 菜单可见性问题，维护者已有修复 PR：[#8257](https://github.com/agentscope-ai/QwenPaw/pull/8257)，响应速度较快。
- E2E 与发布验证问题被迅速修复并进入 beta.6，说明维护团队对发布质量较敏感。
- 多个 PR 正在改善 Windows 桌面端体验，包括启动 readiness、日志轮转、channel SDK 延迟加载等。

---

## 8. 待处理积压

由于本次数据仅覆盖过去 24 小时，无法判断“长期未响应”的历史积压。不过从今日新增与仍 Open 的事项看，以下问题建议维护者优先关注。

### 高优先级待处理

#### 1. 多 Agent `CancelledError` 静默取消

Issue：[#8252](https://github.com/agentscope-ai/QwenPaw/issues/8252)

建议优先级：高  
原因：影响复杂 Agent 编排与真实自动化工作流，且缺少可观测性。

---

#### 2. Cron Job 修改 BUG

Issue：[#8249](https://github.com/agentscope-ai/QwenPaw/issues/8249)

建议优先级：高  
原因：可能导致定时任务配置错误或请求内容损坏。

---

#### 3. 桌面启动 readiness 与连接容量

PR：[#8241](https://github.com/agentscope-ai/QwenPaw/pull/8241)

建议优先级：高  
原因：影响桌面端启动稳定性，且与 Windows 用户体验直接相关。

---

#### 4. Windows 日志轮转

PR：[#8243](https://github.com/agentscope-ai/QwenPaw/pull/8243)

建议优先级：中高  
原因：长时间运行可能导致日志无限增长，应在稳定版前处理。

---

### 中优先级待处理

#### 5. Settings Center 菜单可见性修复

Issue：[#8254](https://github.com/agentscope-ai/QwenPaw/issues/8254)  
PR：[#8257](https://github.com/agentscope-ai/QwenPaw/pull/8257)

建议优先级：中  
原因：修复范围清晰，已有 PR，适合尽快合入。

---

#### 6. 消息导航定位准确性

Issue：[#8251](https://github.com/agentscope-ai/QwenPaw/issues/8251)

建议优先级：中  
原因：影响长对话体验，但不属于阻断级问题。

---

#### 7. Hub Docker 文档缺失与重复 Issue 合并

Issues：

- [#8256](https://github.com/agentscope-ai/QwenPaw/issues/8256)
- [#8255](https://github.com/agentscope-ai/QwenPaw/issues/8255)

建议优先级：中  
原因：用户部署入口受阻；同时存在重复反馈，建议关闭重复项并集中处理。

---

### 大体量 PR 审查提醒

以下 PR 体量较大，建议维护者安排专项 review，避免长期悬挂：

- [#8253 feat(website): add JSON-driven evaluation index](https://github.com/agentscope-ai/QwenPaw/pull/8253)
- [#8248 feat(plugins): add inline OpenUI support for Intelligent UI](https://github.com/agentscope-ai/QwenPaw/pull/8248)
- [#8240 feat(console): refine model management experience](https://github.com/agentscope-ai/QwenPaw/pull/8240)
- [#8239 feat(chat): support inline UI plugins and scoped message submission](https://github.com/agentscope-ai/QwenPaw/pull/8239)

这些 PR 指向项目下一阶段的重要能力：评测透明化、交互式 UI、模型配置体验、插件化消息交互。建议在 beta 阶段明确是否纳入 v2.2.2，或拆分至后续版本以降低发布风险。

---

## 项目健康度结论

今日 CoPaw / QwenPaw 仓库表现出 **高活跃、高迭代、强 beta 收敛** 的状态。  
发布层面一天内推出两个 beta，说明维护团队正在快速修复回归并验证安装链路；功能层面，OpenUI、inline UI plugin、模型管理、评测网站等 PR 显示产品方向正在从基础 Agent 对话扩展到更完整的智能体工作台。  
主要风险集中在 **复杂 Agent 编排稳定性、Windows 桌面端启动与日志、任务配置表单可靠性**。  
若能优先解决 `CancelledError` 可观测性、Cron Job 编辑异常、桌面 readiness 等问题，v2.2.2 系列有望进一步提升稳定版质量。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报  
**日期：2026-10-14**  
**仓库：** [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## 1. 今日速览

过去 24 小时，ZeroClaw 没有新的 Issue 更新，也没有新版本发布，但 PR 活动较集中，共有 **6 条 PR 更新**，其中 **5 条仍处于 Open 状态，1 条已关闭**。今日工作重点明显偏向 **运行时能力、通道系统、ZeroCode 会话管理、Telegram 集成与文档/架构约束**。  
从标签看，今日 PR 覆盖 `runtime`、`channel`、`zerocode`、`agent`、`daemon`、`config`、`integration` 等多个核心区域，说明项目仍处于较活跃的功能演进阶段。  
需要注意的是，今日多项 PR 带有 `risk:high` 或涉及运行时、授权、安全、通道观察等关键路径，短期内维护者评审压力较高。整体健康度良好，但当前更偏“高变更密度、高评审需求”的开发状态。

---

## 2. 项目进展

今日没有已合并 PR；共有 1 个 PR 关闭，5 个功能/文档 PR 仍在等待评审或合并。

### 已关闭 PR

#### [#11729 feat(zerocode): make the per-pane session cap configurable](https://github.com/zeroclaw-labs/zeroclaw/pull/11729)  
**状态：Closed**  
**作者：Audacity88**  
**标签：** `docs`, `zerocode`, `size:M`, `channel:acp`

该 PR 旨在让 ZeroCode 单 pane 可跟踪的 session 数量上限从固定编译期常量变为可配置项。摘要显示，原先每个 pane 最多只能跟踪 8 个 session，当用户按 worktree 保持一个 session 时容易触顶，只能关闭仍需保留的会话。

不过，该 PR 当前已关闭。结合后续打开的 [#11731](https://github.com/zeroclaw-labs/zeroclaw/pull/11731) 内容高度相似，较可能是被后续 PR 替代或重提。维护者后续应重点关注 #11731 的评审状态。

---

### 待合并的重要 PR

#### [#11733 feat(channels): add scoped event-watch SOP observers](https://github.com/zeroclaw-labs/zeroclaw/pull/11733)  
**状态：Open**  
**作者：sagewe**  
**标签：** `docs`, `dependencies`, `channel`, `config`, `scripts`, `channel:core`, `size:XL`

该 PR 增加一个可选的 `channel-event-watch` 输入型 channel，用于 Fastmail 新邮件观察和 Home Assistant 状态条件观察。其核心思路是通过普通 API polling 发现候选事件，而不是每次都调用模型判断，从而降低模型调用成本并提升事件观察效率。

该 PR 体量为 `size:XL`，涉及 channel core、依赖、配置和脚本，属于今日最重要的系统级变更之一。如果合并，ZeroClaw 的通道能力将从被动/轮询式接口进一步扩展到更结构化的事件观察机制。

---

#### [#11732 docs(runtime): propose recall, docs and status placement exceptions](https://github.com/zeroclaw-labs/zeroclaw/pull/11732)  
**状态：Open**  
**作者：Audacity88**  
**标签：** `docs`, `domain:architecture`, `risk:high`, `risk:manual`, `size:XS`, `type:docs`

该 PR 向 `crates/zeroclaw-runtime/AGENTS.md` 添加三个有边界的 placement exception，覆盖 recall、docs 和 status placement 相关场景，并关联 #10567、#9579、#11513。

虽然变更体量为 `size:XS`，但被标记为 `risk:high` 和 `domain:architecture`，说明其影响不在代码规模，而在架构边界和长期维护约束。该 PR 可能会影响后续运行时子系统的职责划分和贡献规范。

---

#### [#11731 feat(zerocode): configure per-pane session cap](https://github.com/zeroclaw-labs/zeroclaw/pull/11731)  
**状态：Open**  
**作者：Audacity88**  
**标签：** `docs`, `zerocode`, `size:M`, `channel:acp`

该 PR 延续 #11729 的方向，目标是让 ZeroCode 每个 pane 的 session cap 可配置。摘要指出，之前 pane 最多只能跟踪 8 个 session，包括 focused、background 和 retained reconnect entries；对于一个 worktree 一个 session 的使用方式，这个限制很容易被触发。

如果合并，该变更将改善多工作区、多会话用户的使用体验，也会让 daemon 侧 ACP 的 `max_sessions` 能力更好地反映到 ZeroCode UI/会话管理中。

---

#### [#11730 feat(runtime): show a foreground delegate's tool calls in the parent turn](https://github.com/zeroclaw-labs/zeroclaw/pull/11730)  
**状态：Open**  
**作者：Audacity88**  
**标签：** `docs`, `agent`, `runtime`, `tool:delegate`, `zerocode`, `size:L`

该 PR 解决 foreground agentic delegate 在执行工具循环时，父 turn、RPC stream 和 ZeroCode 无法实时展示其 tool calls 的问题。此前，delegate 虽然在工作，但由于 observer 是 inert，用户只能等到 child 最终回答后才看到结果，长时间 delegate 看起来像“卡住”或“无响应”。

该 PR 对用户可见性和调试体验意义较大。如果合并，前台 delegate 的工具调用会出现在 parent turn 中，使复杂代理任务的执行过程更透明。

---

#### [#11728 feat(telegram): make unauthorized notices configurable and authorization-aware](https://github.com/zeroclaw-labs/zeroclaw/pull/11728)  
**状态：Open**  
**作者：Audacity88**  
**标签：** `docs`, `channel`, `config`, `daemon`, `integration`, `runtime`, `channel:core`, `channel:telegram`, `domain:security`, `risk:high`, `size:L`

该 PR 继续推进此前 #10401 中关于 Telegram unauthorized notice 可配置化的工作，并将其适配到当前 channel APIs。摘要中提到，原 PR 已关闭，但贡献历史被保留。

该 PR 的重点是让 Telegram 未授权访问提示具备配置能力，并且变得 authorization-aware。由于涉及 Telegram channel、daemon、runtime、配置和安全域，且带有 `risk:high`，这是今日另一个需要重点审查的高影响变更。

---

## 3. 社区热点

今日没有 Issue 活动，PR 的评论数和 reaction 数据均未提供或为 0，因此无法基于评论热度判断真实社区讨论强度。以下按变更影响面和风险标签列出今日最值得关注的热点 PR。

### 1. 事件观察与自动化通道能力  
- PR：[ #11733 feat(channels): add scoped event-watch SOP observers](https://github.com/zeroclaw-labs/zeroclaw/pull/11733)  
- 关注点：Fastmail 新邮件观察、Home Assistant 状态条件、输入型 channel、低模型调用成本事件检测。  
- 背后诉求：用户希望 AI 助手能更主动地感知外部系统事件，而不是依赖用户手动触发或频繁模型判断。

### 2. ZeroCode 多会话容量限制  
- PR：[ #11731 feat(zerocode): configure per-pane session cap](https://github.com/zeroclaw-labs/zeroclaw/pull/11731)  
- 相关关闭 PR：[ #11729 feat(zerocode): make the per-pane session cap configurable](https://github.com/zeroclaw-labs/zeroclaw/pull/11729)  
- 关注点：单 pane session 上限从固定值转为可配置。  
- 背后诉求：多 worktree、多任务、多会话用户需要更高的并发会话管理能力。

### 3. Delegate 工具调用可观测性  
- PR：[ #11730 feat(runtime): show a foreground delegate's tool calls in the parent turn](https://github.com/zeroclaw-labs/zeroclaw/pull/11730)  
- 关注点：前台 delegate 执行工具时，父 turn 和 ZeroCode 应实时显示进度。  
- 背后诉求：复杂代理任务需要更好的可解释性、可调试性和用户信任感。

### 4. Telegram 未授权提示配置化  
- PR：[ #11728 feat(telegram): make unauthorized notices configurable and authorization-aware](https://github.com/zeroclaw-labs/zeroclaw/pull/11728)  
- 关注点：安全、授权状态感知、Telegram 集成体验。  
- 背后诉求：生产环境中，用户希望对未授权交互的提示内容和行为进行细粒度控制。

---

## 4. Bug 与稳定性

过去 24 小时没有新的 Issue，因此没有明确的新报告 Bug、崩溃或回归问题。

不过，从 PR 摘要可以识别出若干稳定性与可用性相关的改进点：

### 高优先级

#### 前台 delegate 执行期间缺乏可见性  
- PR：[ #11730](https://github.com/zeroclaw-labs/zeroclaw/pull/11730)  
- 严重程度：中高  
- 类型：可观测性 / 用户体验 / 调试能力  
- 是否已有 fix PR：是，#11730  
- 影响：长时间运行的 delegate 在 UI 和 RPC stream 中看起来没有进展，可能被用户误认为卡死或失败。

#### Telegram 未授权提示与授权状态处理  
- PR：[ #11728](https://github.com/zeroclaw-labs/zeroclaw/pull/11728)  
- 严重程度：高  
- 类型：安全 / 集成行为 / 配置一致性  
- 是否已有 fix PR：是，#11728  
- 影响：未经授权用户交互的提示策略如果不可配置或不够 authorization-aware，可能影响部署安全策略和用户体验。

### 中优先级

#### ZeroCode pane session 上限过低且不可配置  
- PR：[ #11731](https://github.com/zeroclaw-labs/zeroclaw/pull/11731)  
- 相关关闭 PR：[ #11729](https://github.com/zeroclaw-labs/zeroclaw/pull/11729)  
- 严重程度：中  
- 类型：容量限制 / 多会话体验  
- 是否已有 fix PR：是，#11731  
- 影响：多 worktree 使用场景下容易达到 8 个 session 的固定限制，阻碍长期会话保留和并行任务管理。

---

## 5. 功能请求与路线图信号

虽然今日没有新 Issue，但多个 PR 本身反映出明显的路线图方向。

### 事件驱动型 Channel 能力增强  
- PR：[ #11733](https://github.com/zeroclaw-labs/zeroclaw/pull/11733)  
- 可能纳入下一版本的概率：中高  
- 路线图信号：ZeroClaw 正在从传统 channel 调用扩展到 scoped event-watch observer，支持邮件、新状态条件等外部事件触发能力。  
- 潜在价值：更适合个人 AI 助手场景中的“主动感知”和“条件触发自动化”。

### ZeroCode 多会话管理能力  
- PR：[ #11731](https://github.com/zeroclaw-labs/zeroclaw/pull/11731)  
- 可能纳入下一版本的概率：中高  
- 路线图信号：ZeroCode 正在加强多 session、多 worktree 的高级工作流支持。  
- 潜在价值：提升开发者和重度用户的并行任务处理能力。

### Runtime / Agent 可观测性增强  
- PR：[ #11730](https://github.com/zeroclaw-labs/zeroclaw/pull/11730)  
- 可能纳入下一版本的概率：中高  
- 路线图信号：运行时不只关注任务完成，也开始重视过程可视化、工具调用轨迹和父子 agent 的执行关系。  
- 潜在价值：提升复杂代理系统的透明度和可调试性。

### Telegram 集成安全与配置能力  
- PR：[ #11728](https://github.com/zeroclaw-labs/zeroclaw/pull/11728)  
- 可能纳入下一版本的概率：中  
- 路线图信号：外部消息通道的安全策略正在被产品化和配置化。  
- 潜在价值：适合真实部署环境，尤其是多人群组、公开 bot、家庭自动化或团队助手场景。

### Runtime 架构边界文档化  
- PR：[ #11732](https://github.com/zeroclaw-labs/zeroclaw/pull/11732)  
- 可能纳入下一版本的概率：中  
- 路线图信号：项目在快速演进时开始补充 architecture placement exception，说明维护者在控制复杂度和模块边界。  
- 潜在价值：降低后续贡献者误改核心 runtime 边界的风险。

---

## 6. 用户反馈摘要

今日没有 Issue 评论数据，也没有可用的 PR 评论数据，因此无法直接提炼真实用户评论中的满意或不满意反馈。以下仅基于 PR 摘要中暴露的问题场景进行归纳，不代表新增社区评论。

### 多 worktree 用户遇到 session 容量瓶颈  
- 相关 PR：[ #11731](https://github.com/zeroclaw-labs/zeroclaw/pull/11731)、[ #11729](https://github.com/zeroclaw-labs/zeroclaw/pull/11729)  
- 痛点：每个 ZeroCode pane 固定最多 8 个 session，在一个 worktree 对应一个 session 的工作流中很快达到上限。  
- 影响：用户不得不关闭仍想保留的会话，影响任务连续性。

### 长时间 delegate 任务缺少进度反馈  
- 相关 PR：[ #11730](https://github.com/zeroclaw-labs/zeroclaw/pull/11730)  
- 痛点：delegate 正在执行工具调用，但父 turn 和 UI 中没有过程展示。  
- 影响：用户无法判断任务是在正常运行、卡住还是失败。

### 消息通道部署需要更细粒度安全配置  
- 相关 PR：[ #11728](https://github.com/zeroclaw-labs/zeroclaw/pull/11728)  
- 痛点：Telegram 未授权访问提示需要可配置，并应根据授权状态做出更准确的行为。  
- 影响：影响真实生产部署中的安全策略、隐私提示和用户交互体验。

### 用户希望 AI 助手具备更主动的事件感知能力  
- 相关 PR：[ #11733](https://github.com/zeroclaw-labs/zeroclaw/pull/11733)  
- 场景：Fastmail 新邮件、Home Assistant 状态条件。  
- 诉求：无需频繁调用模型，也能通过普通 API polling 发现事件候选，从而降低成本并提升响应速度。

---

## 7. 待处理积压

由于输入数据仅覆盖过去 24 小时，且没有提供长期未响应 Issue / PR 列表，无法判断真正意义上的长期积压项。以下是今日新增或更新后仍待维护者关注的高优先级开放 PR。

### 高风险 / 高影响待评审

1. [#11733 feat(channels): add scoped event-watch SOP observers](https://github.com/zeroclaw-labs/zeroclaw/pull/11733)  
   - 原因：`size:XL`，涉及 channel core、配置、依赖和脚本。  
   - 建议：重点审查事件观察边界、配置默认值、模型调用规避逻辑和外部 API polling 行为。

2. [#11728 feat(telegram): make unauthorized notices configurable and authorization-aware](https://github.com/zeroclaw-labs/zeroclaw/pull/11728)  
   - 原因：涉及 `domain:security` 和 `risk:high`。  
   - 建议：重点审查授权判断路径、默认配置安全性、未授权提示是否可能泄露信息。

3. [#11730 feat(runtime): show a foreground delegate's tool calls in the parent turn](https://github.com/zeroclaw-labs/zeroclaw/pull/11730)  
   - 原因：涉及 runtime、agent、delegate tool loop 和 ZeroCode 展示。  
   - 建议：重点审查父子 turn 事件归属、RPC stream 兼容性、UI 展示是否会引入重复事件或顺序问题。

4. [#11732 docs(runtime): propose recall, docs and status placement exceptions](https://github.com/zeroclaw-labs/zeroclaw/pull/11732)  
   - 原因：虽然是文档 PR，但标记为 `risk:high` 和 `domain:architecture`。  
   - 建议：维护者应确认 placement exception 是否符合长期架构边界。

5. [#11731 feat(zerocode): configure per-pane session cap](https://github.com/zeroclaw-labs/zeroclaw/pull/11731)  
   - 原因：关系到 ZeroCode 多会话容量和 ACP 配置一致性。  
   - 建议：确认默认值、配置迁移、超限行为和旧用户兼容性。

---

## 总体健康度评估

ZeroClaw 今日没有 Issue 和 Release 活动，但 PR 变更密度较高，且集中在核心能力演进上。项目短期研发活跃度良好，尤其在 **事件观察、代理运行时可观测性、ZeroCode 多会话、Telegram 安全配置** 等方向有明显推进。  
主要风险在于今日开放 PR 多数影响核心运行路径或安全边界，维护者需要投入较多 review 资源。若这些 PR 能顺利合并，项目将向更主动、更可配置、更适合真实部署的个人 AI 助手平台继续前进。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*