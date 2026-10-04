# OpenClaw 生态日报 2026-10-04

> Issues: 31 | PRs: 50 | 覆盖项目: 13 个 | 生成时间: 2026-10-04 04:50 UTC

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
**日期：2026-10-04**  
**仓库：** [openclaw/openclaw](https://github.com/openclaw/openclaw)

---

## 1. 今日速览

过去 24 小时 OpenClaw 仍处于**高强度开发与高缺陷暴露并存**的状态：Issues 更新 31 条，其中 19 条仍在打开，12 条已关闭；PR 更新 50 条，其中 34 条待合并，16 条已合并或关闭。  
今日最显著的信号是：**2026.9.8 相关安装、更新、Gateway 启动、Windows/macOS/Docker 环境兼容性问题持续集中爆发**，多个问题被标记为 P0、release blocker 或 crash-loop。  
与此同时，维护侧正在推进大量 Gateway 主线程减负、会话状态一致性、插件/工具调用、Control UI 性能与体验修复，说明项目核心架构仍在快速迭代。  
整体健康度可以评价为：**工程活跃度很高，但稳定性压力偏大，尤其是升级链路、会话投递、插件生命周期和跨平台文件系统行为需要优先收敛。**

---

## 2. 版本发布

今日 **无新版本发布**。  
最近 Release 数据为空，说明今日主要活动集中在 Issue triage、修复 PR、重构 PR 与性能优化 PR 上，而不是正式版本交付。

---

## 3. 项目进展

以下为今日已关闭或合并状态的重要 PR，以及它们对项目推进的意义。

### 3.1 UI 与用户体验修复

- [PR #164574 - fix(ui): keep automation model provider choices distinct](https://github.com/openclaw/openclaw/pull/164574)  
  **状态：CLOSED**  
  关联并关闭 [Issue #164572](https://github.com/openclaw/openclaw/issues/164572)。  
  修复 Automations 模型选择器在多个 provider 暴露相同 model ID 时丢失 provider 身份的问题。  
  **影响：** 避免用户保存自动化任务时误选默认 provider，提升多模型/多供应商场景的可靠性。

- [PR #164577 - refactor(ui): deslop control UI](https://github.com/openclaw/openclaw/pull/164577)  
  **状态：CLOSED**  
  清理 Control UI 中的并行视图投影、无用选项和转发层。  
  **影响：** 无直接用户可见变化，但有助于降低 UI 状态维护复杂度，为后续交互修复降低成本。

### 3.2 更新流程与可观测性

- [PR #164746 - fix(update): name each candidate check before running it](https://github.com/openclaw/openclaw/pull/164746)  
  **状态：CLOSED**  
  改善 `openclaw update` 期间候选版本校验的进度输出，在每个检查开始前显示名称。  
  **影响：** 解决用户在长时间无输出时误以为更新卡死的问题，特别适合当前更新链路频繁出问题的背景。

### 3.3 插件、工具与搜索稳定性

- [PR #164737 - fix(agents): Tool Search crashes on large Unicode descriptions](https://github.com/openclaw/openclaw/pull/164737)  
  **状态：CLOSED**  
  修复 Tool Search 在大型 Unicode 工具描述上触发正则栈溢出崩溃的问题。  
  **影响：** 提升插件/工具生态在复杂描述、多语言描述场景下的稳定性。

- [PR #164617 - refactor(plugins): deslop plugins](https://github.com/openclaw/openclaw/pull/164617)  
  **状态：CLOSED**  
  清理插件子系统中的私有转发层、重复状态处理和未使用选项。  
  **影响：** 面向长期可维护性，降低插件生命周期问题的排查难度。

- [PR #164763 - refactor(plugins): deslop channel and plugin long tail](https://github.com/openclaw/openclaw/pull/164763)  
  **状态：CLOSED**  
  涉及大量 channel 与 plugin：Google Chat、Line、Signal、XAI、Copilot、Memory、Google Meet、file-transfer 等。  
  **影响：** 属于大规模维护性清理，有助于统一插件和 channel 行为，但由于覆盖面广，也需要关注潜在回归。

### 3.4 CI 与测试稳定性

- [PR #164750 - test(plugins,process,core): remove low-value tests](https://github.com/openclaw/openclaw/pull/164750)  
  **状态：CLOSED**  
  移除插件、process、core 中低价值或重复测试。  
  **影响：** 降低测试维护成本，但需要确保未削弱关键回归检测。

- [PR #164708 - refactor(core): deslop small core subsystems](https://github.com/openclaw/openclaw/pull/164708)  
  **状态：CLOSED**  
  清理核心子系统中的重复 credential 选择流程、一次性转发层和固定选项。  
  **影响：** 改善核心模块可维护性；该 PR 标记 security-sensitive 和 fleet，说明需要安全边界审查。

### 3.5 项目整体进展评估

今日项目推进方向主要集中在三类：

1. **更新/安装链路修复与可观测性增强**  
   对应当前大量 2026.9.8 相关安装与升级失败反馈。

2. **Gateway 主线程减负与会话状态重构**  
   多个待合并 PR 正在把同步 SQLite、会话 admission、branch/rewind、placement read 等迁移到 worker 或 projection。

3. **UI、插件、自动化与工具链维护性清理**  
   大量 “deslop” PR 表明项目正在主动偿还技术债。

整体来看，今日不是一个“功能发布日”，而是一个**稳定性止血 + 架构清理 + 性能铺垫日**。

---

## 4. 社区热点

### 4.1 Windows clean install 后无法连接 local gateway

- [Issue #164396 - Openclaw 2026.9.8 refuses to connect to its local gateway after clean node 22 LTS and windows 11 install](https://github.com/openclaw/openclaw/issues/164396)  
  **状态：OPEN**  
  **评论数：6**  
  **标签：P0、crash-loop、ux-release-blocker**  

这是今日评论最多的 Issue。用户在 Windows 11 + Node 22 LTS 的干净安装环境下完成 onboarding 后，OpenClaw 无法连接本地 Gateway。  
背后诉求非常明确：**新用户首次安装路径必须稳定**。该问题被标记为 P0 和 release blocker，说明它直接影响新用户转化与桌面端可用性。

---

### 4.2 npm updater package-swap 权限错误信息不足

- [Issue #164188 - package-swap permission failure does not identify rejected recovery object](https://github.com/openclaw/openclaw/issues/164188)  
  **状态：OPEN**  
  **评论数：5**  
  **标签：P2、maturity:stable、ux-friction**  

用户反馈 2026.9.7 升级到 2026.9.8 时，npm updater 在 `package-swap` 阶段因 recovery permissions unsafe 中止，但错误没有说明具体哪个 recovery object 被拒绝。  
核心诉求是：**失败可以接受，但失败必须可诊断、可恢复**。这与今日多个更新链路问题形成共振。

---

### 4.3 Streaming preview 被删除且无持久化替代

- [Issue #164610 - Streaming preview deleted without persistent replacement on harness turns](https://github.com/openclaw/openclaw/issues/164610)  
  **状态：CLOSED**  
  **评论数：3**  
  **标签：P1、message-loss**  

在 Telegram DM 绑定 ACP session、`streaming.mode: partial` 的情况下，用户观察到流式预览被删除后没有持久可见回复替代。  
这是一个典型的**消息投递一致性问题**，虽然已关闭，但它与今日多个 message-loss / session-state 问题高度相关。

---

### 4.4 MCP reload 实际未刷新 Gateway 缓存

- [Issue #164642 - mcp reload disposes CLI-local runtimes, not the running Gateway cache](https://github.com/openclaw/openclaw/issues/164642)  
  **状态：OPEN**  
  **评论数：3**  
  **标签：P2、ux-friction**  

用户执行 `openclaw mcp reload` 后，CLI 报告 runtime 已释放，但实际运行中的 Gateway 缓存没有刷新。  
背后诉求是：**CLI 命令语义必须与 Gateway 实际状态一致**，否则用户会误以为配置已生效。

---

### 4.5 429 rate limit 后用户消息“孤儿化”

- [Issue #164250 - Inbound user message becomes orphaned when model API rate-limits](https://github.com/openclaw/openclaw/issues/164250)  
  **状态：OPEN**  
  **评论数：3**  
  **标签：P1、session-state、message-loss**  

用户在 QQBot 渠道中遇到模型供应商返回 HTTP 429 后，消息写入数据库但未被重新挂接到下一次上下文组装中。  
这是严重的用户体验问题：**用户消息被保存但模型后续不可见**，会造成对话断裂和“机器人忘记刚才说了什么”的感知。

---

## 5. Bug 与稳定性

以下按严重程度和影响面排列。

### P0 / Release Blocker / Crash-loop

#### 5.1 Windows clean install 后 Gateway 不可达

- [Issue #164396](https://github.com/openclaw/openclaw/issues/164396)  
  **状态：OPEN**  
  **严重度：P0**  
  **影响：crash-loop、ux-release-blocker**  
  **是否已有 fix PR：未见明确 linked PR**  

影响 Windows 新装用户，是当前最应优先处理的问题之一。

---

#### 5.2 Z.AI Coding-Plan-Global onboarding 拒绝有效 API key

- [Issue #164327](https://github.com/openclaw/openclaw/issues/164327)  
  **状态：OPEN**  
  **严重度：P0**  
  **影响：auth-provider、ux-release-blocker**  
  **是否已有 fix PR：未见明确 linked PR**  

GLM-5.3 / 5.3-Flash 的 always-reasoning 行为导致 onboarding probe 无可用回复，最终丢弃 provider config。  
该问题影响特定供应商首次接入，属于**认证/供应商兼容性阻断**。

---

#### 5.3 macOS Desktop 更新卡在 post-core settlement

- [Issue #164695](https://github.com/openclaw/openclaw/issues/164695)  
  **状态：OPEN**  
  **严重度：P0**  
  **影响：regression、ux-release-blocker**  
  **是否已有 fix PR：未见明确 linked PR**  

用户反馈自 2026.9.1 起 macOS Desktop 更新持续失败，2026.9.7 到 2026.9.8 会发布新包但激活阶段无限停留。  
这是跨版本持续回归，说明 Desktop update 状态机需要重点审计。

---

#### 5.4 Docker overlayfs 上 npm package-swap EXDEV 回滚

- [Issue #164699](https://github.com/openclaw/openclaw/issues/164699)  
  **状态：OPEN**  
  **严重度：P0**  
  **影响：ux-release-blocker、Docker/overlayfs 更新失败**  
  **是否已有 fix PR：未见明确 linked PR**  

Docker image layer 中 `npm i -g` 安装后，默认 overlay2 文件系统在 package-swap 阶段触发 EXDEV。  
该问题直接影响容器部署，是生产环境升级路径风险。

---

#### 5.5 Windows managed update/restart 中止后 Scheduled Task 永久 disabled

- [Issue #164639](https://github.com/openclaw/openclaw/issues/164639)  
  **状态：OPEN**  
  **严重度：P0**  
  **影响：crash-loop、Gateway 无法自恢复**  
  **是否已有 fix PR：未见明确 linked PR**  

更新或重启中途 abort 后，Windows “OpenClaw Gateway” Scheduled Task 被永久禁用，导致 reboot 后 Gateway 也不会恢复。  
这是高风险运维缺陷，因为用户可能完全不知道为什么服务不再启动。

---

#### 5.6 doctor --fix 迁移查询不存在字段

- [Issue #164731](https://github.com/openclaw/openclaw/issues/164731)  
  **状态：OPEN**  
  **严重度：P0**  
  **影响：regression、ux-release-blocker**  
  **是否已有 fix PR：未见明确 linked PR**  

`legacy-cron-run-logs` 迁移查询 `task_runs.detail_json`，但 pre-2026.9.8 state DB 中不存在该字段。  
这会阻断旧版本用户通过 doctor 修复/迁移，属于升级兼容性问题。

---

#### 5.7 Windows sessions.create 路径比较仍失败

- [Issue #164762](https://github.com/openclaw/openclaw/issues/164762)  
  **状态：CLOSED**  
  **严重度：P0**  
  **影响：session-state、ux-release-blocker**  
  **是否已有 fix PR：Issue 已关闭，具体 PR 未在数据中明确列出**  

2026.9.8 shipped build 中 `sessions.create` 仍失败，原因是 guard 比较 extended-length path 与 plain path。  
虽然已关闭，但属于 Windows 会话创建核心路径，建议维护者确认修复是否已进入待发布版本。

---

### P1 / 消息丢失 / 会话状态

#### 5.8 429 后入站消息成为 orphaned message

- [Issue #164250](https://github.com/openclaw/openclaw/issues/164250)  
  **状态：OPEN**  
  **严重度：P1**  
  **影响：session-state、message-loss**  
  **是否已有 fix PR：未见明确 linked PR**  

模型供应商限流时，消息持久化但不再进入后续上下文，是高优先级对话一致性问题。

---

#### 5.9 one-way sessions_send 结果发到 internal-ui sink，用户收不到完成消息

- [Issue #164732](https://github.com/openclaw/openclaw/issues/164732)  
  **状态：OPEN**  
  **严重度：P1**  
  **影响：message-loss**  
  **是否已有 fix PR：未见明确 linked PR**  

`target-less message(action=send)` 在 inter-session turn 中只写入 internal transcript，却报告 “Sent visible reply”。  
这是典型的“系统认为已发送，用户实际没收到”，对信任影响较大。

---

#### 5.10 插件更新后 Gateway 启动错误清理 active npm plugin generations

- [Issue #164629](https://github.com/openclaw/openclaw/issues/164629)  
  **状态：OPEN**  
  **严重度：P1**  
  **影响：message-loss、auth-provider**  
  **是否已有 fix PR：未见明确 linked PR**  

插件更新后生成新的 `__openclaw-generation__g-*` 目录，但下一次 Gateway start 会清理仍处于 active 的 npm plugin generation。  
可能导致外部插件丢失、认证能力不可用或消息处理失败。

---

#### 5.11 Copilot plugin/MCP tool calls 第二轮后失败

- [Issue #164470](https://github.com/openclaw/openclaw/issues/164470)  
  **状态：CLOSED**  
  **严重度：P1**  
  **影响：session-state**  
  **是否已有 fix PR：Issue 已关闭，具体 PR 未在数据中明确列出**  

Copilot provider agent 从第二个 conversation turn 开始所有 plugin/MCP tool call 都报 `Async work scope is closed`。  
已关闭，说明可能已有修复或重复归档，但仍建议在回归测试中覆盖。

---

#### 5.12 subagent completion delivery window aborts requester turn

- [Issue #164141](https://github.com/openclaw/openclaw/issues/164141)  
  **状态：CLOSED**  
  **严重度：P1**  
  **影响：session-state、message-loss**  
  **是否已有 fix PR：Issue 已关闭，具体 PR 未在数据中明确列出**  

子代理 completion delivery window 导致 requester turn 被 abort。  
这是多代理协作场景下的关键一致性问题。

---

### P2 / 用户体验、兼容性与测试稳定性

#### 5.13 MCP reload 没有刷新运行中 Gateway 缓存

- [Issue #164642](https://github.com/openclaw/openclaw/issues/164642)  
  **状态：OPEN**  
  **严重度：P2**  
  **影响：ux-friction**  
  **是否已有 fix PR：未见明确 linked PR**

---

#### 5.14 Saved-draft recovery 出现在只读 subagent 面板

- [Issue #164733](https://github.com/openclaw/openclaw/issues/164733)  
  **状态：OPEN**  
  **严重度：P2**  
  **影响：ux-friction**  
  **已有 fix PR：** [PR #164766](https://github.com/openclaw/openclaw/pull/164766)  

对应 PR 已打开且标记 proof sufficient、ready for maintainer look，纳入下一版本概率较高。

---

#### 5.15 Browser Talk 忽略 session model/runtime overrides

- [Issue #164730](https://github.com/openclaw/openclaw/issues/164730)  
  **状态：OPEN**  
  **严重度：P2**  
  **影响：auth-provider / runtime 选择错误**  
  **是否已有 fix PR：未见明确 linked PR**  

用户在 Control UI 选择 Sol/OpenClaw，但 Browser Talk 后端实际执行 Astra/Codex。  
这是模型选择一致性问题，容易造成成本、权限和结果差异。

---

#### 5.16 QNAP ZFS bind mount 上 Doctor audit-log migration 失败

- [Issue #164703](https://github.com/openclaw/openclaw/issues/164703)  
  **状态：CLOSED**  
  **严重度：P2**  
  **影响：文件系统兼容性**  

QNAP QuTS + ZFS bind mount 上 `RENAME_NOREPLACE` 返回 EINVAL 导致迁移失败。  
已关闭，但与 Docker overlayfs EXDEV 一样，说明 OpenClaw 的更新/迁移逻辑需要更健壮地处理非标准文件系统语义。

---

#### 5.17 Private Node runtime 未传播给 npm lifecycle child process

- [Issue #164525](https://github.com/openclaw/openclaw/issues/164525)  
  **状态：CLOSED**  
  **严重度：P2**  
  **影响：安装/恢复兼容性**  

npm 使用兼容的 private Node 24.21.0，但 package `preinstall` child 从 PATH 解析到错误 node。  
已关闭，建议纳入安装链路回归测试。

---

#### 5.18 apply_patch 拒绝包含 en quad / em quad 的上下文

- [Issue #164740](https://github.com/openclaw/openclaw/issues/164740)  
  **状态：OPEN**  
  **严重度：P2**  
  **影响：patch 工具兼容性**  
  **已有 linked PR：标签显示 linked-pr-open**  

影响带特殊 Unicode 空格的源码修改场景。

---

#### 5.19 Gateway 内存压力突增

- [Issue #164736](https://github.com/openclaw/openclaw/issues/164736)  
  **状态：OPEN**  
  **严重度：P2**  
  **影响：性能/稳定性**  
  **是否已有 fix PR：未见明确 linked PR**  

macOS arm64 上 dense streaming model calls 期间 RSS/V8 heap 在短时间内升至 2-3 GiB，最高约 4 GB。  
虽然 GC 后可恢复，但 critical memory pressure 说明高并发/流式场景仍需优化。

---

## 6. 功能请求与路线图信号

### 6.1 Mattermost channel 增加 search message action

- [Issue #164765 - Add a search message action to the Mattermost channel](https://github.com/openclaw/openclaw/issues/164765)  
  **状态：OPEN**  
  **类型：Feature**  
  **优先级：P2**  

用户希望 Mattermost message tool 支持 `search` action，与 Discord 和 MS Teams 保持一致，后端使用 Mattermost team-scoped post search API。  
这是一个清晰的 channel parity 请求：**跨聊天平台能力一致性**。  
目前标签包含 `needs-product-decision`，说明是否纳入下一版本仍取决于产品判断。

---

### 6.2 工具直接交付最终回复，减少第二次模型调用

- [PR #164558 - feat(plugins): let tools deliver their finished reply without a second model turn](https://github.com/openclaw/openclaw/pull/164558)  
  **状态：OPEN**  
  **优先级：P2**  
  **风险标签：session-state、message-delivery、security-boundary**  

该 PR 允许插件工具在已经生成完整用户回复时直接交付，无需再走第二个模型 turn。  
如果合入，将带来两个明显收益：

1. 降低模型调用成本和延迟；
2. 改善 Telegram 等渠道中工具结果需要二次复述的问题。

但该 PR 风险较高，涉及消息投递和安全边界，短期可能需要更多证明。

---

### 6.3 Versioned upgrade recipes

- [PR #164501 - feat: add versioned upgrade recipes](https://github.com/openclaw/openclaw/pull/164501)  
  **状态：OPEN**  
  **优先级：P2**  
  **风险标签：compatibility、session-state、security-boundary**  

为旧安装提供可认证的升级路径，即使旧 runtime 无法启动，也能恢复中断更新并避免重复 effect。  
结合今日大量升级失败问题，该 PR 是当前路线图中非常关键的一项。  
如果成熟，可能成为下一个稳定版本的核心能力之一。

---

### 6.4 Heartbeat / background command completion 改进

- [PR #164719 - fix(heartbeat): answer a conversation's own background command completion in that conversation](https://github.com/openclaw/openclaw/pull/164719)  
  **状态：OPEN**  
  **优先级：P1**  

- [PR #164756 - fix(heartbeat): let a conversation's chained command completions skip the interval wait](https://github.com/openclaw/openclaw/pull/164756)  
  **状态：OPEN**  
  **优先级：P2，stacked on #164719**  

这组 PR 指向后台命令完成后如何唤醒原会话。  
它们说明 OpenClaw 正在强化“长任务/后台任务/周期监控”体验，尤其是 quiet heartbeat 配置下的可靠通知。

---

### 6.5 Control UI session list 性能优化

- [PR #164764 - perf(sessions): stop Control UI list refresh bursts](https://github.com/openclaw/openclaw/pull/164764)  
  **状态：OPEN**  
  **优先级：P2**  

减少 Control UI 会话列表全量刷新和分页重启，改为 compact rows 与 certified row updates。  
如果合入，将改善大规模会话用户的 UI 卡顿和刷新风暴问题。

---

## 7. 用户反馈摘要

### 7.1 安装与升级链路是当前最大痛点

多个用户在 Windows、macOS、Docker、QNAP ZFS、npm global install 等环境中遇到升级或启动失败：

- Windows clean install Gateway 不可达：[Issue #164396](https://github.com/openclaw/openclaw/issues/164396)
- macOS Desktop update 卡住：[Issue #164695](https://github.com/openclaw/openclaw/issues/164695)
- Docker overlayfs package-swap EXDEV：[Issue #164699](https://github.com/openclaw/openclaw/issues/164699)
- Windows Scheduled Task 被永久禁用：[Issue #164639](https://github.com/openclaw/openclaw/issues/164639)
- doctor 迁移旧 DB 失败：[Issue #164731](https://github.com/openclaw/openclaw/issues/164731)

用户核心不满集中在：**更新中断后无法自恢复、错误信息不够具体、服务静默不可用、跨平台文件系统行为处理不足**。

---

### 7.2 用户希望“系统说已发送”必须等于“用户实际收到”

多条消息投递相关 Issue 反映出强烈一致性诉求：

- one-way session 结果只进入 internal-ui sink：[Issue #164732](https://github.com/openclaw/openclaw/issues/164732)
- streaming preview 被删除无持久回复：[Issue #164610](https://github.com/openclaw/openclaw/issues/164610)
- 429 后消息 orphaned：[Issue #164250](https://github.com/openclaw/openclaw/issues/164250)
- subagent completion 中止 requester turn：[Issue #164141](https://github.com/openclaw/openclaw/issues/164141)

用户痛点是：**OpenClaw 内部 transcript、session、channel delivery 的状态不一致时，用户会直接感知为消息丢失或机器人失忆。**

---

### 7.3 多模型、多供应商、多 runtime 选择需要更可靠

相关反馈包括：

- Z.AI API key 被错误拒绝：[Issue #164327](https://github.com/openclaw/openclaw/issues/164327)
- Browser Talk 忽略 session model/runtime overrides：[Issue #164730](https://github.com/openclaw/openclaw/issues/164730)
- Automations 模型建议丢失 provider identity：[Issue #164572](https://github.com/openclaw/openclaw/issues/164572)
- LM Studio max effort 选择错误：[PR #164478](https://github.com/openclaw/openclaw/pull/164478)

这说明 OpenClaw 的用户正在越来越多地使用复杂 provider 组合，不再只是单一 OpenAI-like endpoint。  
维护者需要继续强化 provider identity、runtime override、model capability discovery 的端到端一致性。

---

### 7.4 高级用户在关注可维护性和长期风险

- [Issue #164702 - DataCloneError on Windows: Proxy behavior long-term maintenance risk](https://github.com/openclaw/openclaw/issues/164702)  
  用户并非报告立即故障，而是质疑当前修复方式是否会造成长期维护风险。  

这类反馈说明社区中存在深度用户和贡献者，他们不仅关心 bug 是否消失，也关心架构是否可持续。

---

## 8. 待处理积压

基于今日数据，无法判断“长期未响应”的绝对时长；但以下是**高优先级、仍打开、且未见明确 fix PR**的积压项，建议维护者优先 triage。

### 8.1 P0 且无明确 fix PR 的 release-blocking 问题

- [Issue #164396 - Windows clean install local gateway connection failure](https://github.com/openclaw/openclaw/issues/164396)  
  P0、crash-loop、ux-release-blocker。

- [Issue #164327 - Z.AI onboarding refuses valid API key](https://github.com/openclaw/openclaw/issues/164327)  
  P0、auth-provider、ux-release-blocker。

- [Issue #164695 - macOS Desktop update hangs after package publication](https://github.com/openclaw/openclaw/issues/164695)  
  P0、regression、ux-release-blocker。

- [Issue #164699 - Docker overlayfs package-swap EXDEV rollback](https://github.com/openclaw/openclaw/issues/164699)  
  P0、ux-release-blocker。

- [Issue #164639 - Windows Scheduled Task permanently disabled after aborted update](https://github.com/openclaw/openclaw/issues/164639)  
  P0、crash-loop、ux-release-blocker。

- [Issue #164731 - doctor --fix migration queries missing detail_json column](https://github.com/openclaw/openclaw/issues/164731)  
  P0、regression、ux-release-blocker。

这些问题共同指向一个主题：**2026.9.x 升级与恢复路径需要集中 hardening。**

---

### 8.2 P1 message-loss / session-state 问题

- [Issue #164250 - 429 后用户消息 orphaned](https://github.com/openclaw/openclaw/issues/164250)  
  P1、session-state、message-loss。

- [Issue #164732 - one-way sessions_send target-less message 未送达用户](https://github.com/openclaw/openclaw/issues/164732)  
  P1、message-loss。

- [Issue #164629 - Gateway start prunes active npm plugin generations](https://github.com/openclaw/openclaw/issues/164629)  
  P1、message-loss、auth-provider。

这些问题会直接损害用户对代理可靠性的信任，应避免被 P2 体验问题淹没。

---

### 8.3 高风险待合并 PR

- [PR #164501 - versioned upgrade recipes](https://github.com/openclaw/openclaw/pull/164501)  
  覆盖 docs、web-ui、gateway、cli、scripts、acpx，且有 compatibility、session-state、security-boundary 风险。  
  建议优先补充 proof 与迁移测试，因为它可能是解决当前升级事故的核心基础。

- [PR #164682 - keep chat admission responsive and bound to current authority](https://github.com/openclaw/openclaw/pull/164682)  
  影响 Gateway admission、session-store、authority 绑定。  
  对响应性和一致性有重要意义，但风险标签较重，需要维护者重点审查。

- [PR #164558 - tools deliver finished reply without second model turn](https://github.com/openclaw/openclaw/pull/164558)  
  涉及 message-delivery 和 security-boundary，功能价值高，但必须防止绕过模型/安全策略导致的投递异常。

- [PR #164719](https://github.com/openclaw/openclaw/pull/164719) 与 [PR #164756](https://github.com/openclaw/openclaw/pull/164756)  
  解决后台命令完成唤醒问题，但与 conversation routing、heartbeat cooldown、loop safety 相关。  
  建议作为一组审查，避免局部修复引入循环唤醒或重复投递。

---

## 总体结论

OpenClaw 今日展现出非常高的工程活跃度：50 条 PR 更新和 31 条 Issue 更新说明项目仍在快速推进。  
但从数据看，当前最主要风险不是功能缺失，而是 **2026.9.x 版本线的升级可靠性、跨平台兼容性、会话消息一致性和 Gateway 生命周期恢复能力**。  
建议维护团队短期聚焦三件事：

1. **冻结或收敛高风险重构，优先处理 P0 升级/启动阻断问题；**
2. **为 message-loss / session-state 建立更强的端到端回归测试；**
3. **将 versioned upgrade recipes、update 可观测性、doctor migration hardening 作为下一稳定版本的核心验收项。**

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析  
**日期：2026-10-04**

---

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态呈现出明显的“两极分化”：头部项目如 **OpenClaw、Hermes Agent、ZeroClaw、NanoBot** 保持高频迭代，而大量长尾项目当日无活动。整体技术焦点已从“能否接入模型和工具”转向 **安装升级可靠性、跨平台兼容、会话状态一致性、消息投递保证、MCP/插件生态、TUI/WebUI/桌面端体验** 等工程化问题。

其中，OpenClaw 与 Hermes Agent 暴露出大量 Windows、macOS、Docker、Gateway 生命周期和消息投递问题，说明复杂个人助手运行时正在进入“真实用户规模化使用后的稳定性压力期”。NanoBot、NanoClaw 更偏向质量收敛和边缘部署体验修复；ZeroClaw 则在 ZeroCode TUI 配置、混合本地/云端路由和运行时能力上快速扩张。整体来看，生态正在从“Agent Demo”迈向“常驻型、跨平台、可恢复、可观测的个人 AI 操作系统”。

---

## 2. 各项目活跃度对比

| 项目 | 仓库 | Issues 更新 | PR 更新 | Release 情况 | 今日状态概括 | 健康度评估 |
|---|---:|---:|---:|---|---|---|
| **OpenClaw** | openclaw/openclaw | 31 | 50 | 无新版本 | 高强度开发，同时 P0 升级、Gateway、Windows/macOS/Docker 问题集中爆发 | **活跃度极高，但稳定性压力大** |
| **Hermes Agent** | nousresearch/hermes-agent | 50 | 50 | 无新版本 | Issue 与 PR 双高，Windows、Gateway、消息投递、安全策略问题密集 | **活跃度极高，处于快速修复期** |
| **ZeroClaw** | zeroclaw-labs/zeroclaw | 14 | 26 | 无新版本 | ZeroCode Config、runtime routing、图片输入、TUI 稳定性集中推进 | **开发动能强，但合并吞吐不足** |
| **NanoBot** | HKUDS/nanobot | 2 | 16 | 无新版本 | WebUI 移动端、TUI 数据安全、MCP 兼容、CLI 桌面集成修复 | **健康，维护响应快** |
| **NanoClaw** | qwibitai/nanoclaw / nanocoai/nanoclaw* | 0 | 12 | 无新版本 | 更新回滚、Docker/systemd、Signal/WhatsApp/iMessage、自托管体验修复 | **低噪音、高维护质量** |
| **CoPaw / QwenPaw** | agentscope-ai/QwenPaw | 4 | 7 | 无新版本 | Console、深链、多模态能力、Provider 错误分类修复待合并 | **问题聚焦，主线尚未落地** |
| PicoClaw | sipeed/picoclaw | 0 | 0 | 无 | 无活动 | **静默** |
| NullClaw | nullclaw/nullclaw | 0 | 0 | 无 | 无活动 | **静默** |
| IronClaw | nearai/ironclaw | 0 | 0 | 无 | 无活动 | **静默** |
| LobsterAI | netease-youdao/LobsterAI | 0 | 0 | 无 | 无活动 | **静默** |
| TinyClaw | TinyAGI/tinyagi | 0 | 0 | 无 | 无活动 | **静默** |
| Moltis | moltis-org/moltis | 0 | 0 | 无 | 无活动 | **静默** |
| ZeptoClaw | qhkm/zeptoclaw | 0 | 0 | 无 | 无活动 | **静默** |

\* 用户摘要中 NanoClaw 仓库名存在不一致，日报正文 PR 链接指向 `nanocoai/nanoclaw`。

### 活跃度排序

按 Issues + PR 总量粗略排序：

1. **Hermes Agent：100**
2. **OpenClaw：81**
3. **ZeroClaw：40**
4. **NanoBot：18**
5. **NanoClaw：12**
6. **CoPaw：11**
7. 其他项目：0

---

## 3. OpenClaw 在生态中的定位

### 3.1 相对优势

OpenClaw 是今日样本中最具“全栈个人 AI 助手平台”特征的项目之一。它同时覆盖：

- Gateway 常驻服务；
- Desktop / CLI / Control UI；
- 多 channel：Telegram、QQBot、Google Chat、Line、Signal 等；
- 插件与工具调用；
- MCP / provider / runtime；
- 自动化任务；
- 会话状态、branch、rewind、session admission；
- 更新、doctor、跨平台安装链路。

与 NanoBot、NanoClaw 这类更聚焦某些前端或部署场景的项目相比，OpenClaw 的系统面更广，复杂度也更高。今日 50 条 PR 和 31 条 Issue 表明它拥有强维护动能和较大用户反馈面。

### 3.2 技术路线差异

OpenClaw 的路线更偏向 **“本地 Gateway + 多渠道连接 + 插件/工具生态 + Control UI + 自动化”** 的综合平台模式。它不是单一 CLI Agent，也不是纯 Web Chat，而是试图成为跨设备、跨渠道、跨 provider 的个人 AI 操作层。

对比来看：

- **Hermes Agent**：同样是全栈型，但今日更突出 Windows、Gateway、安全策略、消息平台和插件目录扩张。
- **NanoBot**：更强调 WebUI/TUI、MCP 兼容、OpenAI Responses API 与桌面 CLI App 集成。
- **NanoClaw**：更偏自托管、边缘设备、Docker/systemd、消息渠道可靠性。
- **ZeroClaw**：突出 ZeroCode TUI 配置、runtime routing、本地/云端混合推理。
- **CoPaw**：偏 Console、多 Agent、Qoder、自定义 Provider、多模态能力识别。

OpenClaw 的差异点在于：**它同时处理前端体验、Gateway 生命周期、会话一致性、插件生命周期、更新恢复和跨平台文件系统行为**，这使其更接近一个复杂的个人 AI runtime，而不只是 Agent 框架。

### 3.3 社区规模与风险

从当日数据看，OpenClaw 的活跃度仅次于 Hermes Agent，但 P0 问题密度更高，尤其集中在：

- Windows clean install Gateway 不可达；
- macOS Desktop 更新卡住；
- Docker overlayfs package-swap EXDEV；
- Windows Scheduled Task 被禁用；
- doctor 旧 DB 迁移失败；
- 429 后消息 orphaned；
- one-way session 结果未送达。

这说明 OpenClaw 已进入真实用户复杂环境验证阶段。其优势是问题暴露充分、维护动作密集；风险是高风险重构与稳定性止血并行，短期需要更强 release discipline。

---

## 4. 共同关注的技术方向

### 4.1 安装、更新与恢复路径可靠性

涉及项目：

- **OpenClaw**
  - Windows clean install Gateway crash-loop；
  - macOS Desktop update 卡住；
  - Docker overlayfs EXDEV；
  - Windows Scheduled Task disabled；
  - doctor migration 查询旧 DB 不存在字段。
- **Hermes Agent**
  - Windows 更新后 Desktop 无窗口；
  - launcher 固化 scratch interpreter；
  - runtime marker 不完整；
  - GitHub 受限网络安装问题；
  - interrupted update 留下 stale artifacts。
- **NanoClaw**
  - 更新 rollback 防止 `data/` 半删除；
  - cutover 前预加载 gateway helpers；
  - systemd 等待 Docker；
  - Raspberry Pi 无 RTC 导致 Signal 启动失败。
- **NanoBot**
  - Windows manifest 并发读写 race；
  - CLI App 桌面环境变量继承问题。

共同诉求：  
**安装和更新不能只在标准开发机上成功，必须覆盖 Windows、macOS、Docker、NAS、Raspberry Pi、overlayfs、ZFS、弱网络、无 RTC 设备等真实部署环境。**

---

### 4.2 Gateway / Runtime 主循环不能被阻塞

涉及项目：

- **OpenClaw**
  - Gateway 主线程减负；
  - SQLite、session admission、placement read 迁移到 worker/projection；
  - Gateway 内存压力问题。
- **Hermes Agent**
  - Windows named-pipe read 阻塞 Gateway event loop；
  - LONG RPC worker pool 饱和；
  - cron worker out-of-band death 后 claim 不释放。
- **ZeroClaw**
  - ZeroCode 终端断开后 CPU 自旋；
  - chat update 被无关 log notification 阻塞；
  - HTTP calls 统一 deadline。
- **NanoClaw**
  - Codex provider lifecycle retry/completion 状态处理。

共同诉求：  
常驻 AI 助手的 Gateway / runtime 必须具备 **非阻塞 I/O、worker pool backpressure、deadline、watchdog、claim recovery、资源泄漏防护**。

---

### 4.3 消息投递一致性与 message-loss 防护

涉及项目：

- **OpenClaw**
  - 429 后用户消息 orphaned；
  - target-less `sessions_send` 只写 internal sink；
  - streaming preview 删除后无持久回复；
  - subagent completion abort requester turn。
- **Hermes Agent**
  - Telegram approval prompt 被静默发送；
  - Matrix encrypted events 无 decryptor 时 silent deafness；
  - Telegram DM topics 重复创建。
- **NanoBot**
  - TUI 队列发送失败后提示词和附件丢失；
  - 后台压缩状态不应打扰活跃频道。
- **ZeroClaw**
  - Web chat 中途刷新丢 prompt；
  - chat updates 被日志阻塞。
- **CoPaw**
  - 跨 Agent 聊天消息归属错误；
  - foreground delegated agent timeout 应返回明确结果。

共同诉求：  
“系统认为已发送”必须等于“用户实际收到”。未来 Agent runtime 需要更强的 **delivery acknowledgement、durable outbox、session transcript 一致性、channel sink 校验、失败重放机制**。

---

### 4.4 多 Provider、多模型、多 runtime 能力一致性

涉及项目：

- **OpenClaw**
  - Z.AI onboarding 拒绝有效 API key；
  - Browser Talk 忽略 session model/runtime overrides；
  - Automations 模型 provider identity 丢失。
- **NanoBot**
  - OpenAI SDK 3.8.0 Responses API alias 序列化；
  - JSON Schema enum 校验；
  - MCP resources/prompts 分页与无 tools server 支持。
- **CoPaw**
  - catalog/prober 标记支持多模态，但 runtime 拦截图像输入；
  - Qoder 自定义 Provider 与 context usage；
  - provider finish_reason length 元数据。
- **ZeroClaw**
  - effort-aware local/cloud routing；
  - 图片 provider 请求被截断；
  - runtime/provider/channel 路由策略。
- **Hermes Agent**
  - OpenRouter prompt injection 误判导致 session 污染；
  - Anthropic custom provider SSE event order 兼容。

共同诉求：  
Provider 接入正在从“OpenAI-compatible 即可”走向 **能力探测、运行时 gate、错误 taxonomy、fallback policy、上下文用量、成本路由、多模态输入完整性** 的全链路一致。

---

### 4.5 MCP 与插件生态扩张

涉及项目：

- **OpenClaw**
  - 插件生命周期、active npm plugin generations、Tool Search Unicode 崩溃；
  - MCP reload 未刷新 Gateway cache；
  - tools 可直接交付最终回复。
- **NanoBot**
  - MCP resources/prompts 分页；
  - 无 tools capability server 连接；
  - Keenable MCP preset。
- **Hermes Agent**
  - Senpi MCP catalog；
  - socialforge、contentforge、digital-marketing-pro 插件目录。
- **NanoClaw**
  - Gateway approval card 优化；
  - 多渠道插件/adapter 稳定性。
- **ZeroClaw**
  - Seatbelt 初始化、native argument recovery、工具失败循环防护。

共同诉求：  
MCP 与插件已成为个人 AI 助手生态的主战场，但随之而来的是 **权限边界、生命周期、能力发现、工具调用幂等性、工具失败恢复、安全审计** 的复杂性。

---

### 4.6 TUI / WebUI / Desktop 的产品化体验

涉及项目：

- **NanoBot**
  - 移动端软键盘、触控控件、Safari preview 操作；
  - TUI Kitty keypad Enter；
  - TUI queued prompt 保留。
- **ZeroClaw**
  - ZeroCode Config 保存/取消、删除确认、alias 多选、字段描述、空状态解释；
  - Web chat persistence。
- **CoPaw**
  - Console boot splash 无错误展示和 retry；
  - `/chat/<id>` 深链失败。
- **Hermes Agent**
  - Dashboard LAN HTTP Ctrl+V；
  - Desktop SSH timeout 配置。
- **OpenClaw**
  - Control UI list refresh bursts；
  - Automations provider choice；
  - Saved-draft recovery 不应出现在只读 subagent 面板。

共同诉求：  
Agent 产品不再只是后端框架，用户对 **配置可解释性、状态可观测性、移动端体验、深链、重试、错误提示、键盘交互** 的要求正在快速提高。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 / 路线特征 | 当前主要风险 |
|---|---|---|---|---|
| **OpenClaw** | 全栈个人 AI 助手、Gateway、Control UI、多渠道、插件、自动化 | 高级个人用户、自动化用户、多渠道助手部署者 | 本地 Gateway + 多 provider/runtime + plugin/channel + session state | 升级链路、Gateway 生命周期、message-loss、跨平台 FS |
| **Hermes Agent** | Agent runtime、Desktop/TUI、消息平台、插件目录、安全策略 | 开发者、自托管用户、消息平台集成用户 | Gateway + Desktop + plugin/MCP catalog + terminal security | Windows 稳定性、Gateway 阻塞、安全规则误伤、消息投递 |
| **ZeroClaw** | ZeroCode TUI、配置运营、本地/云端 routing、工具边界 | TUI 用户、配置型运营者、混合推理使用者 | TUI-first + runtime routing + config system + local/cloud provider | PR 积压、P1 bug 未闭环、XL 高风险架构 PR |
| **NanoBot** | WebUI/TUI、MCP 兼容、Responses API、桌面 CLI App | 个人知识工作流用户、MCP 用户、Web/TUI 用户 | Python/Agent 工具层 + WebUI/TUI + MCP + provider adapters | TUI 数据丢失、MCP 兼容性、桌面环境变量 |
| **NanoClaw** | 自托管、边缘设备、Docker/systemd、多消息渠道 | Raspberry Pi/NAS/Docker 自托管用户 | 容器化部署 + systemd + chat adapters + update controller | 启动顺序、外部服务限流、更新原子性 |
| **CoPaw / QwenPaw** | Console、多 Agent、Qoder、自定义 Provider、多模态 | 多 Agent 工作流用户、自定义模型用户 | Console + agent delegation + provider capability resolver | Console 启动、深链、provider 错误分类、多模态 gate |
| 长尾静默项目 | 暂无当日动态 | 不明或低活跃用户 | 不明 | 活跃度不足，生态影响力有限 |

---

## 6. 社区热度与成熟度

### 6.1 第一梯队：高活跃、高复杂度、稳定性压力明显

包括：

- **Hermes Agent**
- **OpenClaw**

特点：

- Issues 和 PR 都非常多；
- 用户场景真实且复杂；
- Windows、macOS、Docker、Gateway、消息平台、provider 兼容问题密集；
- 社区反馈质量高；
- 修复响应快，但 release blocker 与 P1 bug 较多。

判断：  
这两个项目已经进入 **“平台化产品压力期”**。它们不缺功能和社区关注，短期关键是质量门禁、回归测试和 release discipline。

---

### 6.2 第二梯队：快速迭代，但尚未形成完全闭环

包括：

- **ZeroClaw**
- **NanoBot**
- **NanoClaw**
- **CoPaw**

特点：

- PR 活跃，Issue 数相对可控；
- 问题更聚焦；
- 很多 Issue 已有对应 PR；
- 但部分项目今日无合并，说明 review/merge 可能成为瓶颈。

细分来看：

- **ZeroClaw**：开发动能强，但 26 个 PR 无合并，且高风险 XL PR 较多，需要控制复杂度。
- **NanoBot**：维护节奏健康，WebUI/TUI/MCP 修复闭环较好。
- **NanoClaw**：社区噪音低，但 PR 高质量，偏工程硬化。
- **CoPaw**：Issue 少但影响核心路径，需尽快合并高优先级修复。

判断：  
这一梯队处于 **质量巩固 + 产品化体验增强阶段**。

---

### 6.3 第三梯队：当日静默或生态影响有限

包括：

- PicoClaw
- NullClaw
- IronClaw
- LobsterAI
- TinyClaw
- Moltis
- ZeptoClaw

特点：

- 过去 24 小时无 Issues / PR / Release；
- 无法判断长期健康度；
- 在今日横向生态中影响较低。

判断：  
这些项目可能处于低维护、稳定休眠、早期孵化或社区规模较小状态。技术决策者若考虑采用，应结合更长周期数据评估维护持续性。

---

## 7. 值得关注的趋势信号

### 7.1 个人 AI 助手正在从“聊天工具”升级为“常驻本地服务”

OpenClaw、Hermes、NanoClaw、ZeroClaw 都在处理 Gateway、systemd、Docker、Desktop、scheduled task、watchdog、runtime marker 等问题。这说明个人 AI 助手正在变成类似数据库、同步盘、开发环境一样的常驻服务。

对开发者的启示：

- 不要只设计 request-response；
- 需要考虑 daemon lifecycle；
- 需要支持自恢复、日志、health check、safe restart；
- update/rollback 是核心能力，不是附属脚本。

---

### 7.2 安装更新链路成为开源 Agent 的竞争壁垒

多个项目今日最大问题都不是模型能力，而是安装、更新、回滚、迁移失败。OpenClaw 的 2026.9.x 问题尤其典型。

对开发者的启示：

- 更新必须原子化；
- 文件系统语义要覆盖 overlayfs、ZFS、Windows path、macOS app bundle；
- doctor / migration 需要版本化、幂等、可诊断；
- 错误信息必须指向具体对象和恢复步骤。

---

### 7.3 “消息不丢”会成为 Agent Runtime 的基本指标

OpenClaw、Hermes、NanoBot、ZeroClaw、CoPaw 都出现了消息丢失、消息孤儿化、提示词丢失、投递静默失败或跨 Agent 归属错误。

对开发者的启示：

Agent 系统需要引入类似消息队列系统的思维：

- durable outbox；
- delivery ack；
- transcript 与 channel sink 双向校验；
- orphan message repair；
- retry / replay；
- idempotency key；
- session state invariant tests。

---

### 7.4 Provider 兼容不再只是 API schema 兼容

CoPaw 的多模态 gate、OpenClaw 的 Z.AI onboarding、Hermes 的 OpenRouter 403、NanoBot 的 OpenAI SDK alias、ZeroClaw 的图片截断都说明 provider 兼容已进入深水区。

对开发者的启示：

需要建立 provider abstraction 的新标准：

- capability discovery；
- runtime capability enforcement；
- multimodal payload validation；
- provider-specific error taxonomy；
- fallback eligibility；
- stream/non-stream fallback；
- context usage accounting；
- cost-aware routing。

---

### 7.5 MCP / 插件生态扩张正在带来安全与生命周期复杂度

NanoBot、Hermes、OpenClaw 都在扩展 MCP 和插件生态；与此同时，OpenClaw 出现 active plugin generation 被清理、Tool Search Unicode 崩溃，NanoBot 出现 legacy plugin request context 竞争，ZeroClaw 关注 Seatbelt 初始化和工具失败循环。

对开发者的启示：

插件系统需要尽早设计：

- 权限模型；
- 生命周期管理；
- 并发隔离；
- request context isolation；
- tool schema validation；
- 安全边界审计；
- 插件升级/回滚；
- 工具结果投递一致性。

---

### 7.6 TUI / WebUI / Desktop 体验成为差异化竞争点

ZeroClaw 的 Config TUI、NanoBot 的移动端 WebUI、CoPaw 的 Console 启动页、Hermes 的 Dashboard 粘贴、OpenClaw 的 Control UI 性能都显示，用户已经不满足于“命令能跑”。

对开发者的启示：

优秀 Agent 产品需要：

- 配置状态可解释；
- 保存/应用/重载状态可见；
- 错误可恢复；
- 深链可靠；
- 移动端可用；
- 键盘和终端细节完善；
- 长任务状态不刷屏、不丢上下文。

---

### 7.7 本地/云端混合推理正在成为下一阶段能力

ZeroClaw 的 effort-aware local/cloud routing、OpenClaw 的多 provider/runtime、CoPaw 的 fallback chain、NanoBot 的 MCP preset 都指向一个趋势：个人 AI 助手会根据任务复杂度、隐私、成本、延迟动态选择模型和执行环境。

对开发者的启示：

未来 Agent runtime 应提供：

- task effort estimation；
- local-first 策略；
- cloud escalation；
- privacy policy routing；
- cost cap；
- model capability matching；
- fallback chain observability。

---

## 总结判断

从今日数据看，开源个人 AI 助手生态正在进入 **工程化成熟期**。头部项目的竞争重点已经从“接入模型和工具”转向 **可靠安装、稳定更新、跨平台运行、消息一致性、插件安全、Provider 抽象、TUI/WebUI 产品体验**。

其中：

- **OpenClaw** 是全栈复杂度最高、社区活跃度最强之一的项目，但短期必须优先解决 P0 升级与 message-loss 问题。
- **Hermes Agent** 与 OpenClaw 类似，活跃度极高，适合观察 Gateway、安全策略和插件生态演进。
- **ZeroClaw** 在 TUI 配置和本地/云端路由上有差异化潜力，但需控制高风险 PR 积压。
- **NanoBot** 和 **NanoClaw** 更像稳健工程派，聚焦真实部署与交互细节。
- **CoPaw** 在多 Agent、Console、Provider 能力识别上值得关注，但需要尽快完成修复闭环。

对技术决策者而言，当前选型不应只看功能列表，而应重点评估：**更新恢复能力、Gateway 稳定性、消息投递保证、Provider 兼容深度、插件安全模型和维护者响应速度**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报  
日期：2026-10-04  
仓库：HKUDS/nanobot

---

## 1. 今日速览

过去 24 小时 NanoBot 活跃度较高：共有 **2 条 Issue 更新**、**16 条 PR 更新**，其中 **11 条 PR 仍待合并**，**5 条 PR 已关闭/合并**。今日工作重心明显集中在 **WebUI 移动端体验、TUI 稳定性、MCP 兼容性、CLI 桌面环境集成、Provider API 适配** 等方向。  
从数据看，社区反馈数量不多，但反馈质量较高，均指向真实使用场景中的阻塞问题，例如 Obsidian CLI 在 Wayland/GNOME 下无法识别运行中的应用、后台压缩向前台频道广播状态等。  
整体来看，项目维护节奏健康：多数新报告的问题已经出现对应修复 PR，说明维护者响应速度较快；但同时存在多个高优先级待合并修复，短期内仍需重点关注回归风险与平台兼容性。

---

## 2. 版本发布

过去 24 小时 **无新版本发布**。

---

## 3. 项目进展

今日共有 5 个 PR 关闭/合并，主要推进了 WebUI 触控体验、历史读取解耦与 Windows 稳定性修复。

### 已关闭/合并的重要 PR

#### WebUI 移动端与触控体验改进

- [PR #6023 fix(webui): enlarge preview controls on touch devices](https://github.com/HKUDS/nanobot/pull/6023)  
  该 PR 扩大了触控设备上的预览相关控件点击区域，包括预览标签选择、关闭按钮、面板关闭、图片查看器关闭等。  
  影响：改善移动端或触屏设备上的 WebUI 可用性，降低误触和难以点击的问题，同时保持桌面端细密布局不变。

- [PR #6022 fix(webui): keep touch navigation visible above the keyboard](https://github.com/HKUDS/nanobot/pull/6022)  
  修复 iOS 或移动浏览器中软键盘弹出后导航、消息区、工作台输入框被遮挡的问题。  
  影响：移动端会话体验明显改善，尤其是长时间使用 WebUI 进行聊天或编辑时，输入区域和导航保持可见。

- [PR #6021 fix(webui): hide unavailable website preview actions](https://github.com/HKUDS/nanobot/pull/6021)  
  修复了在不支持隔离网页预览的浏览器中仍显示“Preview website”操作的问题。此前在 Mobile Safari 中点击该操作可能导致会话界面被不支持的预览面板替换。  
  影响：减少移动端 WebUI 中不可用操作造成的困惑与界面中断。

#### 会话历史与 Windows 稳定性

- [PR #6017 refactor(session): decouple history tools from WebUI replay](https://github.com/HKUDS/nanobot/pull/6017)  
  将 `search_sessions` 与 `read_session` 的历史读取从 WebUI replay API 中解耦，改为通过 `SessionHistoryReader` 直接读取持久化会话记录。  
  影响：降低 Agent 工具层与 WebUI 展示层之间的耦合，为后续会话历史工具的稳定性、性能和可维护性打基础。

- [PR #6016 fix(webui): prevent Windows manifest read/replace races](https://github.com/HKUDS/nanobot/pull/6016)  
  修复 Windows 上并发 transcript 请求读取 `manifest.json` 时，另一个请求重建并替换该文件可能触发 `PermissionError: [WinError 5]` 的问题。  
  影响：提高 Windows 用户在查看历史记录、转录记录时的稳定性，减少 CI 和真实环境中的并发文件访问失败。

### 项目整体推进评估

今日进展主要是 **体验修复 + 稳定性修复 + 架构解耦**。虽然没有重大新功能发布，但多个 WebUI 和会话历史相关问题得到处理，项目在跨平台可用性和前端体验上有实质提升。  
当前仍有 11 个待合并 PR，其中包括 P0/P2 优先级修复，说明下一阶段重点仍将是稳定性收敛。

---

## 4. 社区热点

今日 Issues 和 PR 的评论、点赞数据整体较低：新增 Issue 均为 0 评论、0 反应；PR 评论数据未提供或为 undefined。因此，无法从互动量判断传统意义上的“最热讨论”。不过从问题严重性与维护响应速度看，以下议题值得关注。

### Obsidian CLI 在 NanoBot 环境下无法识别桌面应用

- Issue：[ #6024 CLI App for Obsidian says "unable to find Obsidian" under nanobot but works in terminal](https://github.com/HKUDS/nanobot/issues/6024)  
- 对应 PR：[ #6030 fix(cli-apps): preserve XDG_RUNTIME_DIR for desktop CLIs](https://github.com/HKUDS/nanobot/pull/6030)

用户反馈在 Ubuntu + GNOME + Wayland 环境下，Obsidian 已打开，命令在普通终端中可用，但通过 NanoBot CLI App 执行时提示无法找到 Obsidian。  
背后诉求是：NanoBot 作为个人 AI 助手需要可靠调用本地桌面应用，尤其是 Obsidian 这类知识管理工具。该问题暴露出桌面会话环境变量，特别是 `XDG_RUNTIME_DIR`，在 Gateway 与 CLI App 之间传递不完整的问题。

### 后台 idle/dream 周期不应打扰活跃频道

- Issue：[ #6029 Feature Request: Allow silent context compaction and suppress channel broadcasts for background idle/dream cycles](https://github.com/HKUDS/nanobot/issues/6029)

用户希望后台维护任务，例如 idle session 检查、自动 dream/heartbeat 周期、上下文压缩，不要向当前活跃频道广播“Compressing context…”等状态信息。  
背后诉求是：NanoBot 的后台自治能力应当更“无感”，避免维护任务打断用户当前交互。这是从“工具型 Agent”向“常驻个人 AI 助手”演进时的重要体验信号。

### TUI 队列发送失败后的数据丢失风险

- PR：[ #6026 fix(tui): retain queued prompts after send failure](https://github.com/HKUDS/nanobot/pull/6026)

该 PR 标注为 `priority: p0`，说明维护者认为其影响严重。问题是自动队列发送在传输层接受前就移除了队首内容，如果发送异常，文本和附件可能丢失。  
背后诉求是：TUI 用户通常依赖键盘和批量输入，任何提示词或附件丢失都会直接破坏信任感。

---

## 5. Bug 与稳定性

以下按严重程度与潜在影响排序。

### P0：TUI 队列发送失败导致提示词和附件丢失

- PR：[ #6026 fix(tui): retain queued prompts after send failure](https://github.com/HKUDS/nanobot/pull/6026)  
- 状态：OPEN  
- 严重程度：高 / P0  
- 是否已有修复：已有 PR，待合并

问题描述：自动队列发送在 transport 接受之前就移除队首条目，若发送异常，会导致文本和附件丢失。  
修复方案：仅在发送成功后移除队列条目；失败时恢复当前 composer draft。  
影响范围：TUI 用户、排队发送、多附件输入场景。

---

### 桌面 CLI 环境变量缺失导致 Obsidian 无法连接

- Issue：[ #6024](https://github.com/HKUDS/nanobot/issues/6024)  
- PR：[ #6030 fix(cli-apps): preserve XDG_RUNTIME_DIR for desktop CLIs](https://github.com/HKUDS/nanobot/pull/6030)  
- 状态：Issue OPEN，PR OPEN  
- 严重程度：中高  
- 是否已有修复：已有 PR，待合并

问题描述：在 GNOME/Wayland 下，Obsidian CLI 在普通终端中可找到运行中的桌面应用，但在 NanoBot CLI App 环境下失败。  
可能原因：`XDG_RUNTIME_DIR` 未正确传递到 CLI App 环境。  
影响范围：Linux 桌面用户、本地桌面应用集成、Obsidian 工作流。

---

### 后台上下文压缩/维护任务向活跃频道广播状态

- Issue：[ #6029](https://github.com/HKUDS/nanobot/issues/6029)  
- 状态：OPEN  
- 严重程度：中  
- 是否已有修复：暂无对应 PR

问题描述：后台 idle/dream/heartbeat 或 context compaction 触发时，会将“Compressing context…”等状态通知广播到活跃频道。  
影响：打断用户当前交互，降低常驻 Agent 的无感体验。  
建议关注点：是否需要增加 silent/background 模式、通知级别、频道广播开关，或区分用户触发与系统后台触发事件。

---

### TUI 保存文件编辑事件合并顺序错误

- PR：[ #6027 fix(tui): merge saved file edits in chronological order](https://github.com/HKUDS/nanobot/pull/6027)  
- 状态：OPEN  
- 严重程度：中  
- 是否已有修复：已有 PR，待合并

问题描述：保存的文件编辑事件按逆时间顺序合并，可能导致 start event 覆盖已完成的 diff 和 counters。  
影响范围：TUI diff viewer、文件编辑记录准确性。  
验证情况：回归测试修复后通过，TUI suite 257 passed。

---

### TUI Kitty 小键盘 Enter 无法提交提示词

- PR：[ #6025 fix(tui): submit prompts with Kitty keypad Enter](https://github.com/HKUDS/nanobot/pull/6025)  
- 状态：OPEN  
- 严重程度：中  
- 是否已有修复：已有 PR，待合并

问题描述：Kitty 终端的小键盘 Enter 被解码为 `kpenter`，但 composer 仅绑定普通 Enter，导致无法提交。  
影响范围：Kitty 终端用户、依赖小键盘输入的 TUI 用户。  
关联：Relates to [#5987](https://github.com/HKUDS/nanobot/issues/5987)。

---

### MCP 分页资源与 Prompt 未完整发现

- PR：[ #6018 fix(mcp): discover all resource and prompt pages](https://github.com/HKUDS/nanobot/pull/6018)  
- 状态：OPEN  
- 严重程度：中  
- 是否已有修复：已有 PR，待合并

问题描述：MCP servers 可能对 resource 和 prompt catalog 进行分页，但 `connect_mcp_servers()` 当前只请求第一页，导致后续资源和 prompt 未进入 agent tool registry。  
影响范围：大型 MCP 服务、资源/Prompt 较多的服务集成。  
背景：工具分页此前已在 [#5916](https://github.com/HKUDS/nanobot/pull/5916) 中处理，此 PR 补齐资源与 Prompt。

---

### MCP 无工具能力服务器连接失败

- PR：[ #6019 fix(mcp): connect to servers without tool capabilities](https://github.com/HKUDS/nanobot/pull/6019)  
- 状态：OPEN  
- 严重程度：中  
- 是否已有修复：已有 PR，待合并

问题描述：`connect_mcp_servers()` 初始化后总是调用 `tools/list`，但一些合法 MCP server 只暴露 resources 或 prompts，不声明 tools capability，可能返回 `Method not found` 并导致连接中断。  
影响范围：非工具型 MCP server、资源型或 Prompt 型服务。  
修复方向：仅在服务声明 tools capability 时请求工具列表。

---

### OpenAI SDK 3.8.0 Responses API 序列化兼容问题

- PR：[ #6020 fix(responses): serialize SDK models using API aliases](https://github.com/HKUDS/nanobot/pull/6020)  
- 状态：OPEN  
- 严重程度：中  
- 是否已有修复：已有 PR，待合并

问题描述：OpenAI SDK 3.8.0 引入 `ResponseFunctionToolCall.async_` 字段，其 API alias 为 `async`。NanoBot 调用 `model_dump()` 时未设置 `by_alias=True`，导致发送内部字段名 `async_` 到 API。  
影响范围：使用 OpenAI Responses API 与工具调用的用户。  
修复方向：使用 API alias 进行模型序列化。

---

### JSON Schema enum 校验类型混淆

- PR：[ #6013 fix: use JSON equality for enum validation](https://github.com/HKUDS/nanobot/pull/6013)  
- 状态：OPEN  
- 严重程度：中  
- 是否已有修复：已有 PR，待合并

问题描述：当前工具参数验证使用 Python membership 判断 enum，导致 `True` 可能被 `{"enum": [1]}` 接受，`0` 可能被 `{"enum": [false]}` 接受。  
影响范围：工具调用参数验证、严格 JSON Schema 兼容性。  
修复方向：改为符合 JSON 语义的等值判断，区分 boolean 与 number。

---

### 旧 entry-point 插件请求上下文竞争

- PR：[ #6015 fix(tools): isolate legacy entry-point plugin request context](https://github.com/HKUDS/nanobot/pull/6015)  
- 状态：OPEN  
- 严重程度：中  
- 是否已有修复：已有 PR，待合并

问题描述：通过 `nanobot.tools` entry-point 加载的旧插件如果将 request context 存在实例属性中，在异步执行时可能发生请求 A 读取请求 B 上下文的竞态。  
影响范围：旧插件体系、并发工具调用、上下文敏感型插件。  
风险：可能引发数据串扰或错误权限上下文。

---

### Windows transcript manifest 读写竞争

- 已关闭/合并 PR：[ #6016 fix(webui): prevent Windows manifest read/replace races](https://github.com/HKUDS/nanobot/pull/6016)  
- 相关待处理 PR：[ #6012 fix(webui): serialize transcript manifest readers with writers](https://github.com/HKUDS/nanobot/pull/6012)  
- 状态：一个修复已关闭/合并，另一个 PR 标记 conflict  
- 严重程度：中  
- 是否已有修复：已有部分修复，但仍需关注冲突 PR

问题描述：并发读取与重建 `manifest.json` 可能在 Windows 上造成 `PermissionError`。  
需要关注：#6012 当前标记 `conflict`，维护者需判断其是否仍有必要、是否应 rebase 或关闭。

---

## 6. 功能请求与路线图信号

### 后台维护任务静默化：向个人 AI 助手体验靠拢

- Issue：[ #6029](https://github.com/HKUDS/nanobot/issues/6029)

这是今日最明确的功能请求。用户希望 idle session checks、background dream/heartbeat cycles、automatic context compaction 等后台任务不要向活跃频道广播状态信息。  
路线图信号：  
- NanoBot 正在被用于更长期、更常驻的个人助手场景。  
- 用户希望系统级维护行为与用户主动交互解耦。  
- 后续可能需要引入：
  - 后台任务静默模式；
  - per-channel notification policy；
  - maintenance event visibility setting；
  - 区分 foreground task 与 background task 的事件模型。

纳入下一版本可能性：中等。该需求没有对应 PR，但影响体验且实现边界相对清晰，可能作为 WebUI/TUI 通知策略优化进入短期计划。

---

### Keenable MCP 预设：扩展外部搜索与网页内容获取能力

- PR：[ #6014 feat(webui): add Keenable MCP preset](https://github.com/HKUDS/nanobot/pull/6014)  
- 状态：OPEN

该 PR 为 Apps 添加 Keenable MCP preset，连接 `https://api.keenable.ai/mcp`，提供 `search_web_pages` 和 `fetch_page_content`，且无需 API key 即可使用，但按 IP 限速；也支持可选 API key。  
路线图信号：  
- NanoBot 继续增强 MCP 生态集成。  
- WebUI Apps 可能成为用户管理外部能力和预设工具的主要入口。  
- 搜索和网页读取仍是个人 AI 助手高频能力。

纳入下一版本可能性：较高。该 PR 已具备文档、provider、webui、feature、test 标签，范围明确。

---

### MCP 兼容性持续增强

- [PR #6018](https://github.com/HKUDS/nanobot/pull/6018)  
- [PR #6019](https://github.com/HKUDS/nanobot/pull/6019)

两个 MCP 修复共同释放出路线图信号：NanoBot 不仅支持“工具型 MCP server”，也在向更完整的 MCP 能力模型靠拢，包括 resources、prompts、分页 catalog、无 tools capability 的服务。  
纳入下一版本可能性：高。它们属于兼容性修复，且直接影响 MCP 服务可连接性和能力发现完整性。

---

## 7. 用户反馈摘要

今日 Issues 评论数量为 0，因此无法从评论线程中提取进一步讨论。但从 Issue 正文可提炼出以下真实用户痛点。

### Linux 桌面用户希望 NanoBot 能继承完整桌面会话环境

- Issue：[ #6024](https://github.com/HKUDS/nanobot/issues/6024)  
- 对应 PR：[ #6030](https://github.com/HKUDS/nanobot/pull/6030)

用户场景：Ubuntu + GNOME + Wayland + Obsidian 桌面版，通过 NanoBot 调用 Obsidian CLI。  
痛点：同一命令在普通终端可用，在 NanoBot 中失败，用户会认为 NanoBot 的 CLI App 环境不可靠。  
不满意点：本地应用已运行，但 Agent 无法发现，破坏本地工作流自动化。  
潜在满意点：维护者已提交修复 PR，说明问题被快速响应。

---

### 常驻后台 Agent 不应向前台制造噪音

- Issue：[ #6029](https://github.com/HKUDS/nanobot/issues/6029)

用户场景：NanoBot 长时间运行，后台执行 idle check、dream/heartbeat、context compaction。  
痛点：后台维护信息直接出现在活跃频道，会打断用户当前任务。  
不满意点：用户希望后台智能体更像“安静的助手”，而不是在维护状态变化时主动刷屏。  
产品启示：通知策略、后台任务状态可见性、会话上下文压缩的 UX 需要进一步精细化。

---

### 移动端 WebUI 用户需要更稳定的触控和键盘体验

- PR：[ #6021](https://github.com/HKUDS/nanobot/pull/6021)  
- PR：[ #6022](https://github.com/HKUDS/nanobot/pull/6022)  
- PR：[ #6023](https://github.com/HKUDS/nanobot/pull/6023)

虽然这些来自 PR 而非 Issue 评论，但修复内容反映了明确用户痛点：  
- 触控目标过小；  
- 软键盘遮挡导航或输入区；  
- Safari 等浏览器中出现不可用预览操作。  

这说明 NanoBot 的 WebUI 正在被更多移动设备用户使用，移动端体验已成为稳定性与可用性的一部分，而不仅是附加体验。

---

## 8. 待处理积压

由于本日报只包含过去 24 小时数据，无法准确识别“长期未响应”的历史 Issue 或 PR。以下是基于今日数据中需要维护者优先关注的待处理项。

### 高优先级待合并

- [PR #6026 fix(tui): retain queued prompts after send failure](https://github.com/HKUDS/nanobot/pull/6026)  
  P0，涉及提示词和附件丢失风险，建议优先 review 与合并。

- [PR #6030 fix(cli-apps): preserve XDG_RUNTIME_DIR for desktop CLIs](https://github.com/HKUDS/nanobot/pull/6030)  
  直接对应用户报告的 Obsidian CLI 问题，建议尽快验证 Linux/GNOME/Wayland 场景。

- [PR #6020 fix(responses): serialize SDK models using API aliases](https://github.com/HKUDS/nanobot/pull/6020)  
  涉及 OpenAI SDK 3.8.0 兼容性，若用户升级 SDK 可能影响工具调用。

---

### 存在冲突或需决策的 PR

- [PR #6012 fix(webui): serialize transcript manifest readers with writers](https://github.com/HKUDS/nanobot/pull/6012)  
  当前标记 `conflict`，且与已关闭/合并的 [PR #6016](https://github.com/HKUDS/nanobot/pull/6016) 主题相近。  
  建议维护者判断：
  - #6016 是否已经完全覆盖 #6012；
  - #6012 是否需要 rebase 后继续；
  - 或是否应关闭以减少重复修复路径。

---

### MCP 兼容性修复待收敛

- [PR #6018 fix(mcp): discover all resource and prompt pages](https://github.com/HKUDS/nanobot/pull/6018)  
- [PR #6019 fix(mcp): connect to servers without tool capabilities](https://github.com/HKUDS/nanobot/pull/6019)

这两个 PR 都围绕 MCP server 兼容性，建议合并前统一验证以下场景：  
- 仅 resources 的 server；  
- 仅 prompts 的 server；  
- 同时含 tools/resources/prompts 的 server；  
- catalog 分页；  
- 不声明 tools capability 的合法 server。

---

## 项目健康度结论

NanoBot 今日项目健康度整体良好：维护响应及时，新增用户问题已有对应修复 PR，WebUI/TUI/MCP/Provider 多线并进。短期风险集中在 **TUI 数据丢失、CLI 桌面环境兼容、MCP 能力发现不完整、OpenAI SDK 兼容性**。  
如果接下来 1-2 天内能合并 P0/P2 修复并解决 #6012 的冲突状态，项目稳定性将明显提升；同时，#6029 所代表的“后台任务静默化”需求值得纳入个人 AI 助手体验优化路线图。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报｜2026-10-04

## 1. 今日速览

Hermes Agent 今日社区活跃度很高：过去 24 小时共有 **50 条 Issue 更新**、**50 条 PR 更新**，其中新开或活跃 Issue 达 **49 条**，待合并 PR 达 **46 条**。  
整体来看，项目正处于高频问题发现与快速修复阶段，重点集中在 **Windows 安装/更新稳定性、Gateway 消息投递、Desktop/TUI 可用性、会话状态、工具安全边界** 等方面。  
今日没有新版本发布，但出现了大量针对当天或近期问题的修复 PR，说明维护者和社区正在积极推进短周期修复。  
健康度评估：**活跃度高、问题暴露充分、修复响应快；但安装更新链路、跨平台兼容性和 Gateway 稳定性仍是当前主要风险区。**

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

过去 24 小时 PR 更新 50 条，其中 **46 条仍待合并**，**4 条已合并或关闭**。提供的数据中展示的高评论 PR 均为 OPEN，因此无法确认已合并 PR 的具体内容；但从待合并 PR 看，项目在以下方向有明显推进。

### 3.1 Windows 安装与更新稳定性

- [PR #132587](https://github.com/NousResearch/hermes-agent/pull/132587)  
  **fix(install): report a relaunched Desktop that never shows a window**  
  对应 [Issue #132586](https://github.com/NousResearch/hermes-agent/issues/132586)。修复 Windows 更新后 Desktop 进程存在但窗口不可见的问题，并让该失败状态变得可观测。

- [PR #132580](https://github.com/NousResearch/hermes-agent/pull/132580)  
  **fix(cli): bound Windows goal gate timeout cleanup**  
  解决 Windows 下子进程持有 stdout/stderr 管道导致 `subprocess.run(... timeout=N)` 超时后仍无限等待的问题。

- [PR #132570](https://github.com/NousResearch/hermes-agent/pull/132570)  
  **fix(launchers): never bake scratch-tree interpreters into published commands**  
  修复发布命令中错误固化 scratch 临时目录解释器的问题，避免 scratch 被清理后 launcher 失效。

- [PR #132569](https://github.com/NousResearch/hermes-agent/pull/132569)  
  **fix(pm): write full pm-runtime.json marker so resident runtime resolves**  
  修复 runtime marker 信息不完整导致常驻运行时解析失败的问题。

### 3.2 Gateway、Cron 与 RPC 稳定性

- [PR #132581](https://github.com/NousResearch/hermes-agent/pull/132581)  
  **fix(cron): release a run's fire_claim when its external worker dies out-of-band**  
  解决外部 cron worker 被 OOM kill 后 `fire_claim` 在 TTL 内不释放，导致后续 tick 无法执行的问题。

- [PR #132575](https://github.com/NousResearch/hermes-agent/pull/132575)  
  **fix(gateway): fail fast when the long-RPC worker pool is saturated**  
  对应 [Issue #132546](https://github.com/NousResearch/hermes-agent/issues/132546)。为 TUI Gateway 的 LONG-handler 线程池增加饱和保护，避免单个卡死 handler 逐步耗尽所有 slow RPC 能力。

### 3.3 工具、Kanban 与安全边界

- [PR #132583](https://github.com/NousResearch/hermes-agent/pull/132583)  
  **fix(tools): point kanban artifact examples at the task workspace**  
  对应 [Issue #132498](https://github.com/NousResearch/hermes-agent/issues/132498)。修正文档示例中将交付物放到 `~/.hermes/cache/scratch` 的误导性路径，避免 deliverables 被清理且未进入 durable attachments。

- [PR #132582](https://github.com/NousResearch/hermes-agent/pull/132582)  
  **fix(deps): resolve npm audit advisories across workspaces**  
  升级多个前端依赖，包括 `brace-expansion`、`undici`、`js-yaml`、`YAML`、`Vitest`，处理 npm audit 安全建议。

### 3.4 消息平台与通信集成

- [PR #132578](https://github.com/NousResearch/hermes-agent/pull/132578)  
  **fix(messaging): point Signal setup guidance at the signal-cli HTTP daemon**  
  对应 [Issue #132554](https://github.com/NousResearch/hermes-agent/issues/132554)。修正 Signal 设置文档/界面链接，避免用户误装不兼容的 `bbernhard/signal-cli-rest-api`。

- [PR #132568](https://github.com/NousResearch/hermes-agent/pull/132568)  
  **fix(matrix): warn when encrypted events arrive with no E2EE decryptor instead of silent deafness**  
  改善 Matrix 加密消息不可解密时的可观测性，避免同步成功但消息静默丢失。

### 3.5 插件与 MCP 生态扩展

- [PR #132590](https://github.com/NousResearch/hermes-agent/pull/132590)  
  **feat(mcp): add Senpi catalog entry**  
  增加 Senpi MCP catalog entry，使 Hermes 可通过标准 OAuth 连接用户自己的 Senpi agent。

- [PR #132573](https://github.com/NousResearch/hermes-agent/pull/132573)  
  **feat(plugin-catalog): add socialforge**

- [PR #132572](https://github.com/NousResearch/hermes-agent/pull/132572)  
  **feat(plugin-catalog): add contentforge**

- [PR #132571](https://github.com/NousResearch/hermes-agent/pull/132571)  
  **feat(plugin-catalog): add digital-marketing-pro**

整体推进判断：今日虽然没有 release，但 PR 队列显示项目在 **修复安装链路、提高 Gateway 鲁棒性、补齐插件生态、增强消息平台可观测性** 方面持续推进。如果这些 PR 能顺利合并，下一版本的稳定性收益会比较明显。

---

## 4. 社区热点

### 4.1 Terminal 安全规则误杀正常 Shell 用法

- [Issue #132444](https://github.com/NousResearch/hermes-agent/issues/132444)  
  **[Bug]: hardline blocklist blocks shell function definitions and backticked prose as "system shutdown/reboot"**  
  评论数：5，今日最高。

用户反馈 hardline blocklist 会把 shell 函数定义、变量赋值、反引号中的文档文本误判为 shutdown/reboot 类危险命令。例如定义一个名为 `halt` 的函数也会触发阻断。  
背后诉求是：Hermes 的 terminal 安全策略需要更精准地区分 **真正执行危险命令** 与 **文本、函数名、文档内容或赋值语句**。这类问题直接影响开发者日常脚本编写体验，也关系到安全机制的可信度。

### 4.2 Desktop SSH 慢链路连接超时不可配置

- [Issue #132508](https://github.com/NousResearch/hermes-agent/issues/132508)  
  **Desktop: SSH connect and forward budgets are fixed at 15 s with no override**  
  评论数：3。

用户指出 Desktop 的 SSH connect timeout 与 forward timeout 均固定为 15 秒，且没有 override。在飞机 Wi-Fi、VPN、高延迟链路等场景中，会导致连接启动失败并循环重试。  
背后诉求是：远程 Desktop 连接应支持 **可配置超时**、更好的失败提示，以及对弱网络环境的容错。

### 4.3 Kanban artifact 示例路径误导

- [Issue #132498](https://github.com/NousResearch/hermes-agent/issues/132498)  
  **kanban artifact examples send deliverables to ~/.hermes/cache/scratch**  
  评论数：3。  
  已有修复 PR：[PR #132583](https://github.com/NousResearch/hermes-agent/pull/132583)。

该问题反映模型面对工具说明中的示例路径存在实际风险：交付物被引导写入 `~/.hermes/cache/scratch`，但该路径不会被 kernel 复制为 durable attachment，且可能在 24 小时空闲后被清理。  
背后诉求是：面向模型的工具 schema 示例必须具备 **可执行性与数据持久性保证**，否则会造成任务交付丢失。

### 4.4 Windows Gateway 事件循环被 named pipe 阻塞

- [Issue #132547](https://github.com/NousResearch/hermes-agent/issues/132547)  
  **_profile_reconcile_watcher blocks the gateway event loop on a Windows named-pipe read**  
  评论数：2，优先级 P1。

该问题指出 Windows 上 multiplex gateway 可能因 profile reconciler 中同步 named-pipe read 卡住 asyncio event loop，最终被 watchdog 以 exit 75 杀死。  
背后诉求是：Gateway 核心路径必须消除同步阻塞 I/O，尤其是在 Windows named pipe 场景中。

### 4.5 OpenRouter prompt injection 检测导致会话污染

- [Issue #132504](https://github.com/NousResearch/hermes-agent/issues/132504)  
  **OpenRouter 403 "prompt injection patterns detected" from bundled skills containing `<tool>`**  
  评论数：2，优先级 P1。

用户报告 bundled skills 中包含字面量 `<tool>`，触发 OpenRouter 的 prompt injection 检测，后续请求持续被拒绝，并被 Hermes 误标为 firewall block。  
背后诉求是：Provider 错误分类、会话污染恢复、skill 内容安全编码都需要改进。

---

## 5. Bug 与稳定性

以下按严重程度和影响面排列。

### P1 / 高风险

#### 5.1 Windows Gateway event loop 阻塞导致 watchdog 杀进程

- [Issue #132547](https://github.com/NousResearch/hermes-agent/issues/132547)  
  标签：`P1`, `comp/gateway`, `platform/windows`, `area/profiles`  
  状态：OPEN  
  Fix PR：未在提供数据中看到对应 PR。

影响：Windows 上 Gateway 可被同步 named-pipe read 阻塞，导致 `shutdown_watchdog` exit 75。  
风险：消息投递、profile 服务和多路复用 Gateway 可用性受影响。

#### 5.2 OpenRouter 403 导致整个 session 被污染

- [Issue #132504](https://github.com/NousResearch/hermes-agent/issues/132504)  
  标签：`P1`, `comp/agent`, `provider/openrouter`, `area/sessions`  
  状态：OPEN  
  Fix PR：未在提供数据中看到对应 PR。

影响：加载包含 `<tool>` 字符串的 bundled skill 后，OpenRouter 后续请求持续 403。  
风险：用户会话无法恢复，错误还被误分类为 firewall block，降低排障效率。

#### 5.3 Launcher 固化 scratch 解释器导致更新后命令失效

- [PR #132570](https://github.com/NousResearch/hermes-agent/pull/132570)  
  标签：`P1`, `area/install-update`  
  状态：OPEN  
  关联：修复 #131745。

影响：scratch 临时目录被清理后，发布命令 exit 127。  
判断：已有明确修复 PR，应优先合并。

#### 5.4 Runtime marker 不完整导致 resident runtime 无法解析

- [PR #132569](https://github.com/NousResearch/hermes-agent/pull/132569)  
  标签：`P1`, `area/install-update`  
  状态：OPEN  
  关联：修复 #129301。

影响：`pm-runtime.json` 缺少 python 与 sitePackages 信息，导致运行时解析反复失败。  
判断：安装/运行路径核心问题，建议优先 review。

---

### P2 / 中高风险

#### 5.5 Desktop SSH timeout 固定为 15 秒

- [Issue #132508](https://github.com/NousResearch/hermes-agent/issues/132508)  
  状态：OPEN  
  Fix PR：未见对应 PR。

影响：慢网络环境下 SSH Desktop 连接失败、启动循环。  
建议：增加配置项，例如 `desktop.ssh.connect_timeout_ms`、`forward_timeout_ms`，并在 UI 中提示。

#### 5.6 Windows 更新后 Desktop 无可见窗口

- [Issue #132586](https://github.com/NousResearch/hermes-agent/issues/132586)  
  状态：OPEN  
  Fix PR：[PR #132587](https://github.com/NousResearch/hermes-agent/pull/132587)

影响：用户看到多个 `Hermes.exe` 进程，但没有 GUI。  
判断：已有直接修复 PR，合并后可显著改善 Windows 更新体验。

#### 5.7 LONG-handler RPC pool 无超时保护

- [Issue #132546](https://github.com/NousResearch/hermes-agent/issues/132546)  
  状态：OPEN  
  Fix PR：[PR #132575](https://github.com/NousResearch/hermes-agent/pull/132575)

影响：一个卡死 handler 可逐步耗尽所有 LONG RPC worker，导致 `usage.bars`、`session.resume` 等超时。  
判断：PR 当前选择 fail fast，属于务实止血方案。

#### 5.8 Cron external worker 异常死亡后 fire_claim 不释放

- [PR #132581](https://github.com/NousResearch/hermes-agent/pull/132581)  
  状态：OPEN

影响：OOM kill 等 out-of-band 死亡后，job 在 300 秒 TTL 内不能重新触发。  
判断：提升 cron 可靠性，建议纳入下一补丁版本。

#### 5.9 Explicit session archive 只翻 flag，不清 runtime/lease/transcript

- [Issue #132497](https://github.com/NousResearch/hermes-agent/issues/132497)  
  状态：OPEN  
  Fix PR：未见对应 PR。

影响：用户显式 archive session 后，运行时状态仍驻留，active-session lease 和 transcript 仍存在。  
风险：会话生命周期语义不一致，可能导致资源泄漏或恢复行为混乱。

#### 5.10 Telegram 审批提示被静默发送

- [Issue #132516](https://github.com/NousResearch/hermes-agent/issues/132516)  
  状态：OPEN  
  Fix PR：未见对应 PR。

影响：需要人工批准的 exec-approval prompt 在 Telegram important 模式下可能 `disable_notification=True`，导致用户未看到，最终超时。  
风险：消息投递可靠性与安全审批流程受影响。

#### 5.11 Telegram DM topics 在 adapter rebuild 后重复创建

- [Issue #132522](https://github.com/NousResearch/hermes-agent/issues/132522)  
  状态：OPEN  
  Fix PR：未见对应 PR。

影响：网络事件后 Telegram adapter 重建，会重复创建 DM topics，而不是复用 config 中已有 thread IDs。

#### 5.12 Anthropic custom provider malformed SSE event order

- [Issue #132589](https://github.com/NousResearch/hermes-agent/issues/132589)  
  状态：OPEN，`needs-repro`  
  Fix PR：未见对应 PR。

影响：使用 `api_mode: anthropic_messages` 的自定义 provider 若 SSE 顺序不符合 Anthropic 规范，会导致流式处理失败。  
诉求：提供 non-stream fallback 或更稳健的 SSE 容错。

---

### P3 / 中低风险与可用性问题

#### 5.13 Kanban artifacts 示例路径错误

- [Issue #132498](https://github.com/NousResearch/hermes-agent/issues/132498)  
  Fix PR：[PR #132583](https://github.com/NousResearch/hermes-agent/pull/132583)

#### 5.14 Web toolset picker 状态显示不准确

- [Issue #132511](https://github.com/NousResearch/hermes-agent/issues/132511)  
  “Active backend” 忽略 `web.search_backend` / `web.extract_backend`。

- [Issue #132526](https://github.com/NousResearch/hermes-agent/issues/132526)  
  “Ready” badge 不反映真实 backend 可用性。

影响：功能实际可用，但 UI 状态误导用户。

#### 5.15 Dashboard HTTP LAN 场景 Ctrl+V 粘贴失效

- [Issue #132591](https://github.com/NousResearch/hermes-agent/issues/132591)  
  状态：OPEN。

影响：在 `http://<lan-ip>:<port>` 这种 NAS/自托管常见部署中，非安全上下文无法使用 Clipboard API，导致普通 Ctrl+V 无声失败。

#### 5.16 Docker destruction rules 覆盖不完整

- [Issue #132483](https://github.com/NousResearch/hermes-agent/issues/132483)  
  类型：security  
  状态：OPEN。

问题：已有破坏性操作规则覆盖 `docker/podman rm`、volume 删除等，但遗漏 `docker container rm`、`docker container prune`、`docker system prune` 等相邻写法。

---

## 6. 功能请求与路线图信号

### 6.1 Usage analytics 增加 All Time 范围

- [Issue #132579](https://github.com/NousResearch/hermes-agent/issues/132579)  
  **Add “All Time” range to token usage analytics**

用户希望在 token usage analytics 中查看安装以来的累计 token 使用量，而不仅限于 7/30/90 天。  
路线图信号：这是一个低风险、高可见度的 dashboard/CLI 功能，适合进入短期 backlog。

### 6.2 Hooks 支持只展示给用户、不进入模型上下文的 notice

- [PR #132584](https://github.com/NousResearch/hermes-agent/pull/132584)  
  **Hooks can show the user a notice that never reaches the model**

该 PR 允许 plugin 或 shell hook 返回 `notice` / `systemMessage`，展示在用户界面上，但不进入模型上下文。  
路线图意义：强化 Hermes 作为 agent runtime 的 UX 与安全边界，避免把运维提示、插件状态误注入模型上下文。

### 6.3 Browser vault fill 支持跨域支付 iframe 的需求

- [Issue #132541](https://github.com/NousResearch/hermes-agent/issues/132541)  
  **browser_vault_fill can't reach card number/CVV inside cross-origin hosted-fields payment iframes**

用户指出 Stripe Elements、Adyen、Braintree 等 PCI hosted-fields 使用跨域 OOPIF，当前 `browser_vault_fill` 无法填充卡号/CVV。  
路线图信号：这是一个复杂的浏览器自动化与安全边界问题，短期可能不会直接支持，但需要文档明确限制，并考虑与浏览器扩展或 payment request API 的集成方式。

### 6.4 Session housekeeping 静默 no-op 需要警告

- [Issue #132542](https://github.com/NousResearch/hermes-agent/issues/132542)  
  **Housekeeping silently no-ops on served profiles whose sessions block omits auto_archive/auto_prune**

用户希望当 served profile 未启用 session housekeeping 时，系统给出警告，而不是长期静默跳过。  
路线图信号：属于可观测性增强，与当前多个 session-state 风险问题方向一致。

### 6.5 插件目录继续扩张

- [PR #132590](https://github.com/NousResearch/hermes-agent/pull/132590) Senpi MCP  
- [PR #132573](https://github.com/NousResearch/hermes-agent/pull/132573) socialforge  
- [PR #132572](https://github.com/NousResearch/hermes-agent/pull/132572) contentforge  
- [PR #132571](https://github.com/NousResearch/hermes-agent/pull/132571) digital-marketing-pro  

路线图信号：Hermes 的 Plugin Catalog / MCP Catalog 正在继续扩容，生态侧增长明显。

---

## 7. 用户反馈摘要

### 7.1 Windows 用户仍承受较多安装和更新问题

相关条目：

- [Issue #132586](https://github.com/NousResearch/hermes-agent/issues/132586) Windows 更新后无窗口  
- [Issue #132532](https://github.com/NousResearch/hermes-agent/issues/132532) GitHub 受限网络安装韧性不足  
- [Issue #132531](https://github.com/NousResearch/hermes-agent/issues/132531) 中文 Windows 日志 UTF-8/GBK 混乱  
- [Issue #132431](https://github.com/NousResearch/hermes-agent/issues/132431) 中断更新留下 stale `.js` artifacts  
- [Issue #132558](https://github.com/NousResearch/hermes-agent/issues/132558) uv exclude-newer exact pins 缺失

用户痛点集中在：  
- 更新失败后的恢复路径不清晰；  
- Windows 中文环境日志不可读；  
- 中国大陆/GitHub 受限网络下缺少镜像与缓存失效处理；  
- interrupted update 后构建产物污染源码树。  

这说明 Windows 安装/更新链路仍是项目体验短板。

### 7.2 自托管与弱网络场景越来越常见

相关条目：

- [Issue #132508](https://github.com/NousResearch/hermes-agent/issues/132508) SSH 慢链路超时  
- [Issue #132591](https://github.com/NousResearch/hermes-agent/issues/132591) LAN HTTP Dashboard 粘贴失败  
- [Issue #132532](https://github.com/NousResearch/hermes-agent/issues/132532) GitHub-restricted network 安装问题

用户正在把 Hermes 部署到 NAS、LAN、远程主机、受限网络和移动网络环境中。项目需要更重视：  
- timeout 可配置；  
- 非 HTTPS 局域网体验；  
- mirror fallback；  
- 清晰的离线/半离线安装路径。

### 7.3 消息投递可靠性是高频痛点

相关条目：

- [Issue #132516](https://github.com/NousResearch/hermes-agent/issues/132516) Telegram 审批提示静默  
- [Issue #132522](https://github.com/NousResearch/hermes-agent/issues/132522) Telegram topic 重复创建  
- [PR #132568](https://github.com/NousResearch/hermes-agent/pull/132568) Matrix 加密消息不可解密时增加 warning  
- [Issue #132547](https://github.com/NousResearch/hermes-agent/issues/132547) Gateway event loop 阻塞

用户核心诉求是：消息不能“看似成功但实际丢失”。尤其审批、人机交互、DM topic、加密房间等场景，需要更强的 delivery guarantee 和 observability。

### 7.4 安全策略需要减少误伤，同时补齐破坏性命令覆盖

相关条目：

- [Issue #132444](https://github.com/NousResearch/hermes-agent/issues/132444) terminal blocklist 误杀  
- [Issue #132483](https://github.com/NousResearch/hermes-agent/issues/132483) Docker destruction rules 漏覆盖  
- [Issue #132502](https://github.com/NousResearch/hermes-agent/issues/132502) fail-closed unattended review escalation path

用户总体并不反对 fail-closed，而是希望：  
- 规则更精确；  
- 有清晰升级路径；  
- 误杀可解释；  
- 真正危险操作覆盖完整。

---

## 8. 待处理积压与维护者关注点

基于今日数据，以下问题虽然都是近期更新，但因优先级、影响面或暂无 fix PR，建议维护者优先 triage。

### 8.1 P1 且未见修复 PR

- [Issue #132547](https://github.com/NousResearch/hermes-agent/issues/132547)  
  Windows Gateway event loop 被 named-pipe read 阻塞。  
  建议：确认阻塞栈，迁移到 async/thread offload，增加 watchdog 前置诊断。

- [Issue #132504](https://github.com/NousResearch/hermes-agent/issues/132504)  
  OpenRouter prompt injection 误触发并污染 session。  
  建议：区分 provider policy block 与 firewall block；对 bundled skill 内容做转义或安全包装；提供 session recovery。

### 8.2 有 fix PR，建议优先 review / 合并

- [PR #132587](https://github.com/NousResearch/hermes-agent/pull/132587)  
  Windows Desktop relaunch 无窗口检测。

- [PR #132575](https://github.com/NousResearch/hermes-agent/pull/132575)  
  LONG RPC worker pool 饱和保护。

- [PR #132581](https://github.com/NousResearch/hermes-agent/pull/132581)  
  Cron worker out-of-band death 后释放 fire_claim。

- [PR #132574](https://github.com/NousResearch/hermes-agent/pull/132574)  
  uv exact pins 全量豁免 exclude-newer quarantine，对安装可用性影响较大。

- [PR #132582](https://github.com/NousResearch/hermes-agent/pull/132582)  
  npm audit advisories 修复，属于安全维护项。

### 8.3 需要产品/文档决策的问题

- [Issue #132502](https://github.com/NousResearch/hermes-agent/issues/132502)  
  fail-closed unattended review 的官方 resolution/escalation path。  
  建议：维护者给出明确支持流程，而不是仅依赖 allowlist 或人工猜测。

- [Issue #132541](https://github.com/NousResearch/hermes-agent/issues/132541)  
  跨域支付 iframe vault fill。  
  建议：短期文档说明限制；长期评估安全合规方案。

- [Issue #132579](https://github.com/NousResearch/hermes-agent/issues/132579)  
  Usage analytics All Time。  
  建议：作为低风险 feature 纳入 dashboard usage roadmap。

---

## 总体健康度判断

Hermes Agent 今日表现出非常强的社区参与度和问题发现能力，尤其是安装更新、Gateway、消息平台、工具安全等核心路径均有高质量 bug report 和对应修复 PR。  
短期风险主要来自 **Windows 平台稳定性、Gateway 阻塞、会话状态污染、消息投递静默失败**。  
积极信号是，多数高影响问题已经有对应 PR 或明确复现路径，维护者若能优先合并 P1/P2 稳定性修复，下一轮版本的可靠性会有明显提升。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-10-04）

## 1. 今日速览

过去 24 小时 NanoClaw **没有 Issue 更新**，但 Pull Request 非常活跃，共有 **12 条 PR 更新**，其中 **7 条仍待合并**、**5 条已合并或关闭**。今日工作重心明显集中在 **安装/更新流程稳定性、聊天渠道适配、容器与 CI 流水线治理、Agent Runner/Codex Provider 行为修复** 等方面。  
整体来看，项目处于 **高维护活跃度、低社区讨论噪音** 的状态：没有新增 Issue 或用户讨论，但核心团队和贡献者持续提交针对真实运行场景的修复。尤其是 Raspberry Pi、Docker/systemd、WhatsApp/Signal/iMessage 等边缘环境问题，显示 NanoClaw 正在补齐自托管与多渠道运行的可靠性短板。

---

## 2. 项目进展

今日共有 **5 条 PR 已关闭或完成处理**，主要集中在更新可靠性、安全加固、文档治理和本地渠道修复。

### 更新与回滚可靠性增强

- [PR #4016](https://github.com/nanocoai/nanoclaw/pull/4016)  
  **fix(update): load gateway helpers before cutover swaps node_modules**  
  状态：CLOSED  
  作者：glifocat  

  该 PR 修复 `/update-nanoclaw` 在更新过程中因 `pnpm install` 替换 `node_modules`，导致运行中的 controller 后续动态加载 gateway helpers 时崩溃的问题。  
  影响：降低更新过程中因 `tsx`、`esbuild` 等依赖升级导致的中断风险，是一次重要的 **在线更新稳定性修复**。

- [PR #4012](https://github.com/nanocoai/nanoclaw/pull/4012)  
  **fix(update): restore the snapshot by rename so a rollback never half-deletes data/**  
  状态：CLOSED  
  作者：glifocat  

  该 PR 修复更新失败回滚时可能把 `data/` 目录删到一半的问题。原先 rollback 会先删除 live root，再复制 snapshot；在 rootful Docker 场景下，root-owned mount folder 可能导致删除失败，从而留下半损坏的数据目录。  
  影响：显著提升更新失败后的数据安全性，属于高价值的 **灾难恢复路径修复**。

### 渠道安全与本地通信修复

- [PR #4013](https://github.com/nanocoai/nanoclaw/pull/4013)  
  **fix(chat-sdk): authenticate the loopback Gateway webhook**  
  状态：CLOSED  
  作者：glifocat  

  该 PR 为本地 Discord Gateway webhook 增加认证，避免同机其他进程向 loopback server 伪造事件。  
  影响：修复本地攻击面，属于 **安全加固类修复**，尤其适用于多用户主机或复杂本地服务环境。

- [PR #4008](https://github.com/nanocoai/nanoclaw/pull/4008)  
  **fix(add-imessage): open chat.db under Node with core's prebuilt better-sqlite3**  
  状态：CLOSED  
  作者：glifocat  

  该 PR 修复本地 iMessage backend 在 Node 下无法打开 `chat.db` 的问题。根因是依赖 `@photon-ai/imessage-kit` 引入的 `better-sqlite3` 版本没有预构建二进制，而 pnpm 跳过构建后导致新安装环境不可用。  
  影响：恢复 iMessage 本地后端能力，对使用 Apple Messages/iMessage 集成的用户较重要。

### 贡献流程治理

- [PR #4011](https://github.com/nanocoai/nanoclaw/pull/4011)  
  **docs(contributing): write down the core-or-fork rule**  
  状态：CLOSED  
  作者：glifocat  

  该 PR 将 “niche fixes go on your own fork” 的贡献规则写入文档，方便贡献者提前理解维护边界，也方便维护者在关闭不适合合入主线的 PR 时引用。  
  影响：改善社区协作预期，降低维护沟通成本。

**总体进展评估：**  
今日项目没有发布新版本，但在更新安全、数据回滚、本地渠道、Webhook 安全和贡献规范方面推进明显。若这些修复进入后续版本，预计会提升自托管用户在 Raspberry Pi、Docker、本地消息桥接、升级回滚等场景下的稳定性。

---

## 3. 社区热点

今日没有 Issue 更新，PR 的评论数和反应数均未提供或为 0，因此从显式互动指标看，**没有明显的高热度社区讨论**。不过从 PR 主题集中度看，以下方向是今日维护热点。

### 安装与启动稳定性

- [PR #4019](https://github.com/nanocoai/nanoclaw/pull/4019)  
  **fix(setup): wait for docker before starting the systemd unit**  
  状态：OPEN  
  作者：gbmerrall  

  诉求：在 Raspberry Pi 等设备重启时，systemd unit 可能早于 Docker daemon 启动，导致 NanoClaw host 报错 `FATAL: Container runtime failed to start`。  
  背后需求：自托管用户希望设备断电或重启后系统能够自动可靠恢复，不需要手动干预。

- [PR #4018](https://github.com/nanocoai/nanoclaw/pull/4018)  
  **fix(signal): use a monotonic clock for the daemon startup wait**  
  状态：OPEN  
  作者：gbmerrall  

  诉求：Raspberry Pi 没有 RTC，启动后 NTP 时间跳变可能让基于 `Date.now()` 的 30 秒等待预算失效，导致 Signal adapter 启动失败。  
  背后需求：边缘设备和低成本硬件部署需要更强的时间漂移容错。

### 自动化发布链路与人工审查平衡

- [PR #4010](https://github.com/nanocoai/nanoclaw/pull/4010)  
  **ci: open the agent-image repin PR as the image-refresh App**  
  状态：OPEN  
  作者：glifocat  

- [PR #4009](https://github.com/nanocoai/nanoclaw/pull/4009)  
  **ci: merge agent-image pin bumps by hand, drop the auto-approver**  
  状态：OPEN  
  作者：glifocat  

  诉求：镜像刷新流程希望自动创建可审查 PR，但最终合并仍由维护者手动完成。  
  背后需求：项目在提升自动化效率的同时，仍然保留对容器镜像 pin 变更的人工把关，说明维护团队对供应链与运行环境稳定性较为谨慎。

---

## 4. Bug 与稳定性

今日没有新的 Issue 报告，但 PR 中暴露出多个稳定性和安全问题。按影响严重程度排列如下。

### 高严重度

1. **更新回滚可能导致 `data/` 半删除**
   - 链接：[PR #4012](https://github.com/nanocoai/nanoclaw/pull/4012)
   - 状态：CLOSED
   - 类型：数据安全 / 更新回滚
   - 影响：更新失败后可能留下不完整的数据目录，影响恢复能力。
   - 修复状态：已有处理 PR，已关闭。

2. **更新 cutover 过程中替换 `node_modules` 导致 controller 崩溃**
   - 链接：[PR #4016](https://github.com/nanocoai/nanoclaw/pull/4016)
   - 状态：CLOSED
   - 类型：更新流程 / 运行时崩溃
   - 影响：当更新涉及 `tsx`、`esbuild` 等依赖变化时，cutover 可能失败。
   - 修复状态：已有处理 PR，已关闭。

3. **本地 Gateway webhook 缺少认证，可能接受伪造事件**
   - 链接：[PR #4013](https://github.com/nanocoai/nanoclaw/pull/4013)
   - 状态：CLOSED
   - 类型：安全 / 本地攻击面
   - 影响：同机进程可能向 loopback webhook 发送伪造事件。
   - 修复状态：已有处理 PR，已关闭。

### 中严重度

4. **systemd unit 未等待 Docker 就启动**
   - 链接：[PR #4019](https://github.com/nanocoai/nanoclaw/pull/4019)
   - 状态：OPEN
   - 类型：安装部署 / 启动顺序
   - 影响：Raspberry Pi 重启后可能因 Docker 未就绪而启动失败。
   - 修复状态：已有 fix PR，待合并。

5. **Signal adapter 启动等待使用系统时钟，受 NTP 跳变影响**
   - 链接：[PR #4018](https://github.com/nanocoai/nanoclaw/pull/4018)
   - 状态：OPEN
   - 类型：渠道适配 / 启动稳定性
   - 影响：无 RTC 设备上系统时间跳变可能导致 daemon startup wait 提前失败。
   - 修复状态：已有 fix PR，待合并。

6. **WhatsApp linking 在版本检查被限流时可能挂起**
   - 链接：[PR #4017](https://github.com/nanocoai/nanoclaw/pull/4017)
   - 状态：OPEN
   - 类型：setup / WhatsApp 渠道
   - 影响：当 `web.whatsapp.com` 返回 429 时，Baileys 可能回退到内置版本，导致链接流程异常。
   - 修复状态：已有 fix PR，待合并。

7. **Codex container provider 未正确尊重原生 retry 与完成状态**
   - 链接：[PR #4014](https://github.com/nanocoai/nanoclaw/pull/4014)
   - 状态：OPEN
   - 类型：Agent Runner / Provider 生命周期
   - 影响：当 Codex app-server 发出 `willRetry: true` 等生命周期事件时，provider 需要避免过早结束 turn。
   - 修复状态：已有 fix PR，待合并。

### 低到中严重度

8. **iMessage 本地 backend 无法打开 `chat.db`**
   - 链接：[PR #4008](https://github.com/nanocoai/nanoclaw/pull/4008)
   - 状态：CLOSED
   - 类型：渠道功能 / 本地依赖
   - 影响：新安装环境下 iMessage 集成不可用。
   - 修复状态：已有处理 PR，已关闭。

---

## 5. 功能请求与路线图信号

今日没有新的 Issue 型功能请求，但有一个明确的功能型 PR，显示下一阶段可能关注 **凭证审批体验优化**。

### 凭证无关的读取请求可跳过审批卡片

- [PR #4015](https://github.com/nanocoai/nanoclaw/pull/4015)  
  **feat(gateway): skip the approval card for reads that carry no credential**  
  状态：OPEN  
  作者：glifocat  

  该 PR 允许 operator 对不携带存储凭证的读取请求跳过 approval card；但任何可能使用 credential 的请求仍然会生成审批卡片。  
  路线图信号：
  - NanoClaw 正在优化 Gateway / Iron Proxy 背后的人工审批噪音。
  - 项目倾向于在安全边界不降低的前提下，减少低风险请求对 operator 的打扰。
  - 这可能进入下一版本，尤其适合频繁访问网页、产生大量 allowlisted non-model request 的场景。

### Agent 镜像更新流程改进

- [PR #4010](https://github.com/nanocoai/nanoclaw/pull/4010)  
  **ci: open the agent-image repin PR as the image-refresh App**  
  状态：OPEN  

- [PR #4009](https://github.com/nanocoai/nanoclaw/pull/4009)  
  **ci: merge agent-image pin bumps by hand, drop the auto-approver**  
  状态：OPEN  

  路线图信号：
  - 镜像 pin bump 将更自动化地产生 PR。
  - 合并阶段仍保留人工审查。
  - 项目在供应链自动化方面采取“自动提出、人工合并”的稳健策略。

---

## 6. 用户反馈摘要

今日没有 Issue 评论数据，因此无法直接从用户评论中提炼满意度或不满意点。但从 PR 摘要可推断出若干真实使用场景中的痛点。

### 自托管设备重启恢复能力不足

相关链接：
- [PR #4019](https://github.com/nanocoai/nanoclaw/pull/4019)
- [PR #4018](https://github.com/nanocoai/nanoclaw/pull/4018)

反馈信号：Raspberry Pi 这类设备在重启、无 RTC、Docker daemon 启动慢、NTP 时间校准等情况下容易触发启动失败。  
用户痛点：希望 NanoClaw 能像常驻服务一样稳定自恢复，而不是每次设备重启都需要排查 Docker 或 adapter 状态。

### 多渠道接入对外部服务波动敏感

相关链接：
- [PR #4017](https://github.com/nanocoai/nanoclaw/pull/4017)
- [PR #4008](https://github.com/nanocoai/nanoclaw/pull/4008)

反馈信号：WhatsApp Web 版本检查被限流、iMessage `chat.db` 读取依赖原生模块，都可能导致渠道配置或运行失败。  
用户痛点：消息渠道适配需要对第三方服务限制、本地原生依赖、安装环境差异有更强容错。

### Operator 审批噪音偏高

相关链接：
- [PR #4015](https://github.com/nanocoai/nanoclaw/pull/4015)

反馈信号：在 Iron Proxy 背后，一个网页可能触发大量 allowlisted non-model request，并生成许多 approval card。  
用户痛点：安全审批机制需要更精细地区分“真正涉及凭证风险”的请求和普通读取请求，避免操作员疲劳。

### 更新流程需要更强的原子性和可恢复性

相关链接：
- [PR #4016](https://github.com/nanocoai/nanoclaw/pull/4016)
- [PR #4012](https://github.com/nanocoai/nanoclaw/pull/4012)

反馈信号：更新时替换依赖、失败回滚、Docker root-owned 目录等都可能影响稳定性。  
用户痛点：用户希望系统更新失败时不会损坏数据，也不会因为依赖切换导致服务崩溃。

---

## 7. 待处理积压

基于今日数据，未发现长期未响应的 Issue 或 PR；所有打开的 PR 都创建或更新于 2026-10-03 至 2026-10-04，属于近期活跃处理范围。当前建议维护者优先关注以下仍处于 OPEN 状态的 PR。

### 高优先级待处理

1. [PR #4019](https://github.com/nanocoai/nanoclaw/pull/4019)  
   **fix(setup): wait for docker before starting the systemd unit**  
   建议优先级：高  
   原因：影响重启后的服务自恢复能力，尤其是 Raspberry Pi / Docker 自托管环境。

2. [PR #4018](https://github.com/nanocoai/nanoclaw/pull/4018)  
   **fix(signal): use a monotonic clock for the daemon startup wait**  
   建议优先级：高  
   原因：修复无 RTC 设备上时间跳变导致 Signal adapter 启动失败的问题。

3. [PR #4017](https://github.com/nanocoai/nanoclaw/pull/4017)  
   **fix(setup): fetch the current WhatsApp Web version before linking**  
   建议优先级：高  
   原因：影响 WhatsApp 初始链接体验，属于用户首次配置路径上的阻断问题。

4. [PR #4014](https://github.com/nanocoai/nanoclaw/pull/4014)  
   **fix(codex): honor native retry and completion status**  
   建议优先级：中高  
   原因：涉及 Codex app-server turn 生命周期处理，可能影响 Agent Runner 任务执行正确性。

### 中优先级待处理

5. [PR #4015](https://github.com/nanocoai/nanoclaw/pull/4015)  
   **feat(gateway): skip the approval card for reads that carry no credential**  
   建议优先级：中  
   原因：优化 operator 体验，但需要谨慎确认不会削弱凭证访问审计边界。

6. [PR #4010](https://github.com/nanocoai/nanoclaw/pull/4010)  
   **ci: open the agent-image repin PR as the image-refresh App**  
   建议优先级：中  
   原因：提升 agent image repin 流水线自动化程度。

7. [PR #4009](https://github.com/nanocoai/nanoclaw/pull/4009)  
   **ci: merge agent-image pin bumps by hand, drop the auto-approver**  
   建议优先级：中  
   原因：调整镜像 pin bump 合并策略，强化人工审查。

---

## 项目健康度判断

NanoClaw 今日表现为 **维护活跃、问题聚焦、社区讨论较少**。PR 更新量高，且多数变更不是表层功能，而是围绕安装、更新、回滚、安全、本地渠道和 Agent 生命周期的工程质量修复，说明项目正在从“功能扩展”进入更重视“可靠运行”的阶段。  
短期风险主要集中在仍未合并的启动与渠道修复 PR；若 [#4019](https://github.com/nanocoai/nanoclaw/pull/4019)、[#4018](https://github.com/nanocoai/nanoclaw/pull/4018)、[#4017](https://github.com/nanocoai/nanoclaw/pull/4017) 能尽快落地，自托管用户的安装与重启体验将明显改善。

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

# CoPaw 项目动态日报｜2026-10-04

> 数据来源显示相关条目位于 `agentscope-ai/QwenPaw` 仓库；以下日报按用户提供的 GitHub 数据整理。

---

## 1. 今日速览

过去 24 小时项目活跃度较高：新增/活跃 Issue 4 条，新增/更新 PR 7 条，但暂无 PR 合并或 Issue 关闭。今日动态集中在稳定性修复、模型能力识别、Console 会话导航、跨 Agent 会话与内容审查错误处理等方面。  
从健康度看，维护侧响应积极，已有多个修复 PR 对应近期用户反馈，但由于全部 PR 仍处于 Open 状态，修复尚未真正进入主线。当前风险主要集中在聊天深链、Console 启动、图像输入能力判断、内容审查误杀及跨 Agent 消息归属等核心使用路径。

---

## 2. 项目进展

今日无已合并或已关闭 PR，因此主线代码尚未产生实际推进。不过，维护者集中提交了 7 个待合并 PR，显示项目正在快速处理近期稳定性问题。

### 待合并的重要 PR

1. **修复运行时媒体能力判断**
   - PR：[#8100 fix(agents): use resolved media capabilities at runtime](https://github.com/agentscope-ai/QwenPaw/pull/8100)
   - 作用：修复模型目录/探测认为支持图像输入，但运行时仍按“不支持多模态”拦截的问题。
   - 关联问题：高度对应 Issue [#8093](https://github.com/agentscope-ai/QwenPaw/issues/8093)。
   - 影响：若合并，将改善多模态模型的实际可用性，减少“能力声明与运行时行为不一致”的问题。

2. **修复 Qoder 自定义 Provider 与上下文使用展示**
   - PR：[#8099 fix(qoder): enable custom providers and context usage](https://github.com/agentscope-ai/QwenPaw/pull/8099)
   - 作用：允许 Qoder 在模型发现和运行时正确使用自定义模型，并在 Console 中展示上下文用量。
   - 影响：对 BYOK、自定义模型和 Qoder 用户较重要，有助于提升可配置性和可观测性。

3. **修复前台委托 Agent 聊天超时处理**
   - PR：[#8098 fix(agents): return a result for foreground chat timeouts](https://github.com/agentscope-ai/QwenPaw/pull/8098)
   - 作用：子 Agent 超时时返回明确的 timeout 工具结果，而不是让取消异常继续传播并中断父级回合。
   - 影响：提升多 Agent 调度下的容错性。

4. **补充 PDF 工具结果回放测试**
   - PR：[#8097 test(agents): cover sent PDF tool-result replay](https://github.com/agentscope-ai/QwenPaw/pull/8097)
   - 作用：新增测试覆盖，不改变运行时行为。
   - 影响：增强 OpenAI Chat Completions 场景下 PDF 工具结果回放的回归保护。

5. **暴露 `finish_reason="length"` 截断信息**
   - PR：[#8096 fix(providers): surface finish_reason length truncation in chat response metadata](https://github.com/agentscope-ai/QwenPaw/pull/8096)
   - 作用：当模型输出因长度限制被截断时，将截断原因写入响应元数据。
   - 关联问题：PR 描述中提到 Issue `#8085`。
   - 影响：提升回答完整性判断能力，便于上层逻辑识别“回答结束”与“被截断”。

6. **修复跨 Agent 聊天消息用户归属**
   - PR：[#8095 fix(agents): attribute inter-agent chat messages to the current user](https://github.com/agentscope-ai/QwenPaw/pull/8095)
   - 作用：修复 `chat_with_agent` / `submit_to_agent` 发送的跨会话消息被错误注册为独立聊天的问题。
   - 影响：对跨 Agent 协作、会话追踪和用户上下文一致性有直接价值。

7. **修复 Console 侧边栏会话点击后的 last active chat id**
   - PR：[#8091 fix(console): track last active chat id on sidebar session click](https://github.com/agentscope-ai/QwenPaw/pull/8091)
   - 作用：修复点击历史会话后未更新 `lastActiveChatId`，导致新任务错误打开旧会话的问题。
   - 可能关联：与深链/会话激活类问题 [#8101](https://github.com/agentscope-ai/QwenPaw/issues/8101) 存在一定相关性，但不一定完全覆盖跨 Agent 深链问题。
   - 影响：改善 Console 会话导航一致性。

---

## 3. 社区热点

今日所有新 Issue 的评论数均为 1，点赞数均为 0；PR 暂无明确评论数据。从影响范围和核心链路重要性看，以下问题值得优先关注。

### 1. `/chat/<id>` 深链无法正确跨 Agent 或同 Agent 激活会话

- Issue：[#8101 [Bug]: Global /chat/<id> deep link fails across agents](https://github.com/agentscope-ai/QwenPaw/issues/8101)
- 状态：Open
- 评论：1
- 诉求分析：
  - 用户希望外部插件、集成或系统通知可以直接打开特定聊天会话。
  - 当前表现为跨 Agent 深链失败，同 Agent 深链也无法正确激活目标会话。
  - 这影响外部集成、分享链接、通知跳转、工作流回溯等场景。
- 相关 PR：
  - [#8091](https://github.com/agentscope-ai/QwenPaw/pull/8091) 修复侧边栏点击后的 last active chat id，但是否解决全局深链仍需确认。
  - [#8095](https://github.com/agentscope-ai/QwenPaw/pull/8095) 修复跨 Agent 消息归属，对跨 Agent 会话一致性有帮助，但不一定直接修复深链路由。

### 2. 多模态能力声明与运行时行为不一致

- Issue：[#8093 Runtime blocks image input while catalog/prober says supports_multimodal=true](https://github.com/agentscope-ai/QwenPaw/issues/8093)
- 状态：Open
- 评论：1
- 诉求分析：
  - 用户使用 `mimo-v2.6-flash`、`glm-5.3-flash` 等模型时，目录/探测显示支持多模态，但实际运行时拦截图像输入。
  - 这类问题会严重损害模型能力发现机制的可信度。
- 已有 Fix PR：
  - [#8100](https://github.com/agentscope-ai/QwenPaw/pull/8100)

### 3. Console 启动页缺少重试和错误展示

- Issue：[#8094 Console boot splash has no retry and no error surface](https://github.com/agentscope-ai/QwenPaw/issues/8094)
- 状态：Open
- 评论：1
- 诉求分析：
  - 用户反馈 Console 启动时停留在 `LOADING CONSOLE` 静态启动页。
  - WebView2 缓存过期或前端资源加载失败后，用户看不到错误信息，也无法重试。
  - 该问题对桌面端/Console 可用性影响较大。
- 当前 Fix PR：
  - 暂未看到直接对应 PR。

### 4. 内容审查误杀被归类为 bad_request，导致无重试无降级

- Issue：[#8092 Content-inspection false positives from Ali-style gateways](https://github.com/agentscope-ai/QwenPaw/issues/8092)
- 状态：Open
- 评论：1
- 诉求分析：
  - 用户在正常 DevOps 对话中遭遇 `data_inspection_failed`。
  - 当前系统将其归类为 `bad_request`，不触发 retry、fallback，也直接终止 turn。
  - 这暴露出 OpenAI-compatible gateway 场景下错误分类不够细的问题。
- 当前 Fix PR：
  - 暂未看到直接对应 PR。

---

## 4. Bug 与稳定性

按潜在影响程度排序如下。

### P0 / 高优先级：Console 启动永久卡死

- Issue：[#8094 Console boot splash has no retry and no error surface](https://github.com/agentscope-ai/QwenPaw/issues/8094)
- 影响：
  - 用户可能完全无法进入 Console。
  - 静态启动页没有错误提示、没有重试按钮，排障成本高。
  - WebView2 缓存问题在更新后可能造成持续性阻断。
- 是否已有 Fix PR：暂无直接对应 PR。
- 建议：
  - 为启动页增加错误边界、资源加载超时、重试按钮和清缓存指引。
  - 对前端资源版本和 WebView2 缓存失配增加检测。

### P0 / 高优先级：聊天深链无法激活目标会话

- Issue：[#8101 Global /chat/<id> deep link fails across agents](https://github.com/agentscope-ai/QwenPaw/issues/8101)
- 影响：
  - 外部插件、第三方集成、通知跳转、历史会话恢复均受影响。
  - 跨 Agent 和同 Agent 两类深链路径均存在问题，说明会话路由/激活状态管理可能有系统性缺陷。
- 是否已有 Fix PR：
  - 可能相关：[#8091](https://github.com/agentscope-ai/QwenPaw/pull/8091)、[#8095](https://github.com/agentscope-ai/QwenPaw/pull/8095)
  - 但目前没有明确标注完全修复 #8101。
- 建议：
  - 增加 `/chat/<id>` 的路由解析、Agent 切换、session activation、last active id 更新的端到端测试。

### P1 / 高优先级：多模态模型图像输入被错误拦截

- Issue：[#8093](https://github.com/agentscope-ai/QwenPaw/issues/8093)
- Fix PR：[#8100](https://github.com/agentscope-ai/QwenPaw/pull/8100)
- 影响：
  - 明明模型声明支持多模态，运行时却删除或拒绝图像内容。
  - 会导致用户认为模型能力不可用，影响多模态场景体验。
- 当前状态：
  - 已有针对性修复，等待合并。

### P1 / 高优先级：内容审查误杀不触发降级

- Issue：[#8092](https://github.com/agentscope-ai/QwenPaw/issues/8092)
- 影响：
  - benign DevOps 对话被网关误判后，系统直接终止 turn。
  - 12-model fallback chain 无法发挥作用。
  - 对生产环境可靠性影响明显。
- 是否已有 Fix PR：暂无直接对应 PR。
- 建议：
  - 将 `data_inspection_failed` 与用户请求格式错误区分处理。
  - 允许配置是否对该类错误进行 fallback、重试或提示用户改写。
  - 记录 provider/gateway 级别的误杀指标。

### P1 / 中高优先级：跨 Agent 消息归属错误

- PR：[#8095](https://github.com/agentscope-ai/QwenPaw/pull/8095)
- 影响：
  - 跨会话消息可能被注册为独立聊天。
  - 影响会话历史、用户上下文、跨 Agent 协作一致性。
- 当前状态：
  - 已有修复 PR，等待合并。

### P2 / 中优先级：前台委托 Agent 超时取消传播

- PR：[#8098](https://github.com/agentscope-ai/QwenPaw/pull/8098)
- 影响：
  - 子 Agent 超时会影响父回合，造成用户获得异常中断而不是明确的超时结果。
- 当前状态：
  - 已有修复 PR，等待合并。

### P2 / 中优先级：输出被截断但元数据未标识

- PR：[#8096](https://github.com/agentscope-ai/QwenPaw/pull/8096)
- 影响：
  - 用户或上层逻辑难以判断回答是自然完成还是被 token 上限截断。
  - 对长文本生成、代码生成、摘要任务影响较大。
- 当前状态：
  - 已有修复 PR，等待合并。

---

## 5. 功能请求与路线图信号

今日没有典型“新增功能请求”类 Issue，但多个 Bug 实际反映出用户对产品能力的路线图诉求。

### 1. 更可靠的外部深链与会话导航能力

- 相关 Issue：[#8101](https://github.com/agentscope-ai/QwenPaw/issues/8101)
- 相关 PR：[#8091](https://github.com/agentscope-ai/QwenPaw/pull/8091)、[#8095](https://github.com/agentscope-ai/QwenPaw/pull/8095)
- 路线图信号：
  - 用户正在将 CoPaw/QwenPaw 接入外部插件或集成系统。
  - `/chat/<id>` 不再只是内部路由，而是对外协作入口。
  - 后续可能需要全局 session resolver、Agent 自动切换、权限校验和深链 E2E 测试。

### 2. 多模型、多 Provider 的能力解析标准化

- 相关 Issue：[#8093](https://github.com/agentscope-ai/QwenPaw/issues/8093)
- 相关 PR：[#8100](https://github.com/agentscope-ai/QwenPaw/pull/8100)
- 路线图信号：
  - 模型 catalog、provider 原始元数据、探测结果、运行时 gate 之间需要统一能力来源。
  - 多模态支持不应只体现在 UI 或 catalog，而应贯穿实际请求构造链路。

### 3. 更强的 Provider 错误分类与弹性 fallback

- 相关 Issue：[#8092](https://github.com/agentscope-ai/QwenPaw/issues/8092)
- 路线图信号：
  - 用户已部署多 Provider、多模型 fallback chain。
  - 现有错误分类影响 fallback 策略有效性。
  - 后续可能需要 provider-specific error taxonomy、可配置 retry policy 和审查误杀恢复策略。

### 4. Qoder 自定义模型与 BYOK 支持增强

- 相关 PR：[#8099](https://github.com/agentscope-ai/QwenPaw/pull/8099)
- 路线图信号：
  - 自定义 Provider、BYOK、上下文使用统计正在成为 Qoder 用户的重要需求。
  - 若合并，可能进入下一版本的可用性改进清单。

---

## 6. 用户反馈摘要

### 主要痛点

1. **“看起来支持，但实际不能用”**
   - 代表问题：[#8093](https://github.com/agentscope-ai/QwenPaw/issues/8093)
   - 用户看到模型被 catalog/prober 标记为 `supports_multimodal=true`，但运行时仍拒绝图像输入。
   - 这类不一致会显著降低用户对模型能力发现机制的信任。

2. **“系统卡住时没有任何可操作信息”**
   - 代表问题：[#8094](https://github.com/agentscope-ai/QwenPaw/issues/8094)
   - Console 只显示静态 `LOADING CONSOLE`，没有报错、没有重试、没有清缓存建议。
   - 用户无法判断是网络、缓存、前端资源还是后端问题。

3. **“外部集成无法可靠跳回目标会话”**
   - 代表问题：[#8101](https://github.com/agentscope-ai/QwenPaw/issues/8101)
   - 用户使用外部插件或集成打开 `/chat/<id>`，但无法正确激活会话。
   - 说明项目已被用于更复杂的工作流，而不仅是单一 Web UI 聊天。

4. **“多模型 fallback 链没有在真实错误中发挥作用”**
   - 代表问题：[#8092](https://github.com/agentscope-ai/QwenPaw/issues/8092)
   - 用户配置了 12-model fallback chain，但 `data_inspection_failed` 被当作 bad request 后直接终止。
   - 用户期望系统能更智能地区分“请求真的错误”和“provider/gateway 临时拒绝”。

### 使用场景

- 自托管 pip 安装环境：[#8101](https://github.com/agentscope-ai/QwenPaw/issues/8101)
- Container 部署 + Telegram Channel：[#8092](https://github.com/agentscope-ai/QwenPaw/issues/8092)
- OpenAI-compatible gateway、多 Provider、多模型 fallback：[#8092](https://github.com/agentscope-ai/QwenPaw/issues/8092)
- 多模态模型调用：[#8093](https://github.com/agentscope-ai/QwenPaw/issues/8093)
- Console / WebView2 桌面或嵌入式前端：[#8094](https://github.com/agentscope-ai/QwenPaw/issues/8094)

---

## 7. 待处理积压

基于今日数据，未提供长期未响应 Issue/PR 信息，因此无法判断历史积压情况。不过，以下今日新增或更新的 Open 项目应优先跟进，避免转化为新的高优先级积压。

### 需要维护者优先确认的 Issue

1. [#8094 Console boot splash has no retry and no error surface](https://github.com/agentscope-ai/QwenPaw/issues/8094)  
   - 风险：可能导致 Console 无法启动。
   - 当前状态：Open，暂无明确 Fix PR。

2. [#8101 Global /chat/<id> deep link fails across agents](https://github.com/agentscope-ai/QwenPaw/issues/8101)  
   - 风险：影响外部集成和会话恢复。
   - 当前状态：Open，可能有相关 PR，但需确认覆盖范围。

3. [#8092 Content-inspection false positives classified as bad_request](https://github.com/agentscope-ai/QwenPaw/issues/8092)  
   - 风险：影响生产环境 fallback 可靠性。
   - 当前状态：Open，暂无明确 Fix PR。

4. [#8093 Runtime blocks image input despite multimodal capability](https://github.com/agentscope-ai/QwenPaw/issues/8093)  
   - 风险：多模态模型不可用。
   - 当前状态：Open，已有 Fix PR [#8100](https://github.com/agentscope-ai/QwenPaw/pull/8100)。

### 需要尽快 Review 的 PR

- [#8100](https://github.com/agentscope-ai/QwenPaw/pull/8100)：修复多模态能力运行时判断，建议优先合并。
- [#8091](https://github.com/agentscope-ai/QwenPaw/pull/8091)：修复 Console 会话导航状态，可能缓解会话错乱。
- [#8095](https://github.com/agentscope-ai/QwenPaw/pull/8095)：修复跨 Agent 消息用户归属，关系到多 Agent 协作一致性。
- [#8096](https://github.com/agentscope-ai/QwenPaw/pull/8096)：暴露输出截断元数据，有助于上层策略判断。
- [#8098](https://github.com/agentscope-ai/QwenPaw/pull/8098)：改善 Agent 超时容错。
- [#8099](https://github.com/agentscope-ai/QwenPaw/pull/8099)：增强 Qoder 自定义 Provider 与上下文可观测性。
- [#8097](https://github.com/agentscope-ai/QwenPaw/pull/8097)：测试增强，可低风险合并。

---

## 总体健康度评估

今日项目处于“高修复活跃、主线尚未落地”的状态。Issue 数量不多，但集中在启动、会话、模型能力、fallback 错误处理等核心路径，说明当前版本在复杂部署和多 Agent/多 Provider 场景下仍有稳定性压力。  
积极信号是维护侧已提交多项针对性 PR，尤其是 [#8100](https://github.com/agentscope-ai/QwenPaw/pull/8100)、[#8095](https://github.com/agentscope-ai/QwenPaw/pull/8095)、[#8091](https://github.com/agentscope-ai/QwenPaw/pull/8091) 对近期用户痛点有直接回应。短期重点应放在快速 Review、补充回归测试，并尽快合并高优先级稳定性修复。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 — 2026-10-04

## 1. 今日速览

过去 24 小时，ZeroClaw 活跃度很高：共出现 **14 条 Issue 更新** 与 **26 条 PR 更新**，但 **没有 Issue 关闭，也没有 PR 合并/关闭**，说明当前处于集中开发与评审积压阶段。  
今日工作重心明显集中在 **ZeroCode TUI 配置体验、运行时稳定性、通道交互、工具调用安全与路由策略** 等方向。  
从标签看，`zerocode`、`config`、`runtime`、`provider`、`channel` 是最活跃模块；同时存在多个 `priority:p1` 与 `risk:high` 项，项目短期内需要维护者加强 triage 与合并节奏。  
整体健康度评估：**开发动能强，但合并吞吐偏低；若高风险 PR 与 P1 Bug 持续堆积，可能影响下一个版本的稳定交付。**

---

## 2. 版本发布

今日 **无新版本发布**。  
最近 Releases 数据为空，因此暂无可分析的破坏性变更、迁移说明或升级建议。

---

## 3. 项目进展

今日没有 PR 被合并或关闭，因此严格意义上 **主干代码没有新的已落地进展**。不过，从新增与更新的 PR 看，多个方向已经进入实现或待评审状态，预计会构成下一轮版本的重要内容。

### 重要待合并 PR 动向

- [PR #11516 — feat(runtime): add effort-aware local and cloud routing](https://github.com/zeroclaw-labs/zeroclaw/pull/11516)  
  引入基于任务复杂度的本地/云端路由策略，允许简单或模糊任务留在本地、复杂任务转向云端。  
  这是一个 `risk:high`、`size:XL` 的架构级变更，涉及 `runtime`、`provider`、`channel`、`config` 等多个核心域。若合并，将显著推进 ZeroClaw 的混合推理与成本控制能力。

- [PR #11506 — feat(zerocode): show saved and applied config status](https://github.com/zeroclaw-labs/zeroclaw/pull/11506)  
  针对配置保存后“是否真正生效”的可观测性问题，增加 saved / applied 状态展示。  
  该 PR 覆盖面极广，涉及 agent、channel、daemon、gateway、provider、runtime、skills、tool、CLI 等，且为 `risk:high`、`size:XL`、stacked PR，合并前需要重点评审依赖链。

- [PR #11511 — feat(zerocode): make Config save and cancel predictable](https://github.com/zeroclaw-labs/zeroclaw/pull/11511)  
  改进 ZeroCode Config 中保存、取消、待编辑状态的行为一致性，对应用户在 TUI 配置编辑中的可预测性诉求。  
  该 PR 与 [Issue #11486](https://github.com/zeroclaw-labs/zeroclaw/issues/11486) 高度对应。

- [PR #11510 — feat(zerocode): confirm config deletion and reset](https://github.com/zeroclaw-labs/zeroclaw/pull/11510)  
  为配置删除和重置增加确认机制，降低误删风险，对应 [Issue #11487](https://github.com/zeroclaw-labs/zeroclaw/issues/11487)。

- [PR #11504 — fix(zerocode): scope Config filters and restore cancelled selection](https://github.com/zeroclaw-labs/zeroclaw/pull/11504)  
  修复 Config 过滤器同时影响左右面板、取消搜索后丢失选择的问题，对应 [Issue #11488](https://github.com/zeroclaw-labs/zeroclaw/issues/11488)。

- [PR #11507 — fix(agent): bound repeated tool failures and preserve completed work](https://github.com/zeroclaw-labs/zeroclaw/pull/11507)  
  针对工具调用失败循环与已完成工作保留问题进行修复，属于 agent loop 稳定性改进。与 [Issue #11484](https://github.com/zeroclaw-labs/zeroclaw/issues/11484) 中的重复工具调用风险相关。

结论：今日虽然没有合并，但 PR 队列显示项目正在围绕 **ZeroCode 可用性、配置安全、运行时路由、工具调用可靠性** 进行集中推进。

---

## 4. 社区热点

### 4.1 图片输入被截断，影响多模态能力

- [Issue #11478 — Images >64KB are silently truncated mid-file in provider requests](https://github.com/zeroclaw-labs/zeroclaw/issues/11478)  
  标签：`bug`, `provider`, `priority:p1`, `r:needs-repro`, `risk:medium`  
  评论数：2

这是今日评论最多的 Issue。用户报告 JPEG 图片超过约 48KB–64KB 后，在 provider 请求中被静默截断，模型只能看到图片上半部分，底部文字和细节不可见。  
该问题同时在 Matrix 与 Telegram 复现，说明缺陷很可能位于共享图片内联路径，而不是单一 channel。  
背后诉求是：ZeroClaw 作为多通道 AI 助手，需要可靠处理图片输入，尤其是包含文档、截图、长图、表格或 OCR 内容的场景。静默截断会造成模型“看似正常但回答错误”，风险高于显式失败。

目前状态：仍为 OPEN，且标记 `r:needs-repro`，暂无对应 fix PR 在今日数据中明确出现。

---

### 4.2 ZeroCode Config 体验成为集中改进热点

多个 Issue 与 PR 围绕 ZeroCode 配置界面展开，显示用户正在大量使用 TUI 配置能力，但对可发现性、一致性和安全性有较强诉求。

相关 Issue：

- [Issue #11492 — Improve action discovery in ZeroCode client settings](https://github.com/zeroclaw-labs/zeroclaw/issues/11492)  
- [Issue #11491 — Show saved versus applied config status in ZeroCode Config](https://github.com/zeroclaw-labs/zeroclaw/issues/11491)  
- [Issue #11490 — Explain empty Config sections and alias setup in ZeroCode](https://github.com/zeroclaw-labs/zeroclaw/issues/11490)  
- [Issue #11489 — Improve Config field labels and access to full descriptions](https://github.com/zeroclaw-labs/zeroclaw/issues/11489)  
- [Issue #11488 — ZeroCode Config filtering affects both panes and loses the section on cancel](https://github.com/zeroclaw-labs/zeroclaw/issues/11488)  
- [Issue #11487 — Confirm consequential Delete and Reset actions in ZeroCode Config](https://github.com/zeroclaw-labs/zeroclaw/issues/11487)  
- [Issue #11486 — Make ZeroCode Config save and cancel behavior predictable](https://github.com/zeroclaw-labs/zeroclaw/issues/11486)  
- [Issue #11485 — Offer multi-select pickers for ZeroCode Config alias references](https://github.com/zeroclaw-labs/zeroclaw/issues/11485)

对应 PR：

- [PR #11505 — expose settings actions and filter keybindings](https://github.com/zeroclaw-labs/zeroclaw/pull/11505)  
- [PR #11506 — show saved and applied config status](https://github.com/zeroclaw-labs/zeroclaw/pull/11506)  
- [PR #11508 — guide Config alias setup](https://github.com/zeroclaw-labs/zeroclaw/pull/11508)  
- [PR #11501 — show readable Config labels and full field details](https://github.com/zeroclaw-labs/zeroclaw/pull/11501)  
- [PR #11504 — scope Config filters and restore cancelled selection](https://github.com/zeroclaw-labs/zeroclaw/pull/11504)  
- [PR #11510 — confirm config deletion and reset](https://github.com/zeroclaw-labs/zeroclaw/pull/11510)  
- [PR #11511 — make Config save and cancel predictable](https://github.com/zeroclaw-labs/zeroclaw/pull/11511)  
- [PR #11502 — add multi-select editors for alias-reference arrays](https://github.com/zeroclaw-labs/zeroclaw/pull/11502)

分析：  
ZeroCode Config 正在从“可编辑配置”向“可安全运营配置”演进。用户关注点不再只是功能是否存在，而是配置变更是否可理解、可确认、可撤销、可验证生效。这是项目走向生产化和运维友好化的重要信号。

---

### 4.3 Web Chat 持久化与中途刷新体验

- [Issue #11517 — Web chat reloading mid-turn drops the user's prompt](https://github.com/zeroclaw-labs/zeroclaw/issues/11517)  
  标签：未显式列出完整标签，但内容为 Bug  
  严重程度：S2

用户报告在 `session_persistence = true` 的默认配置下，Dashboard 页面在 agent 回合运行中刷新会导致用户 prompt 从屏幕和 `localStorage` 中消失。  
这反映出 Web Chat 的 hydration 逻辑用较旧快照覆盖了本地运行中状态。  
背后诉求是：Web 端需要在刷新、断线重连、长任务执行中保持对话连续性，尤其是在 agent turn 尚未完成时不能丢失用户输入。

目前状态：OPEN，暂无对应 fix PR 在今日数据中明确出现。

---

## 5. Bug 与稳定性

以下按严重程度与影响范围排序。

### P1 / 高优先级

#### 1. 图片 provider 请求静默截断

- Issue：[Issue #11478](https://github.com/zeroclaw-labs/zeroclaw/issues/11478)  
- 标签：`priority:p1`, `provider`, `risk:medium`, `r:needs-repro`  
- 影响：Matrix、Telegram 等多通道图片输入  
- 现象：大图片被截断，模型只能看到上半部分  
- 风险：静默错误，可能产生错误回答但用户不易发现  
- Fix PR：今日数据中未发现明确对应 PR

#### 2. ZeroCode 聊天更新被无关日志通知阻塞

- Issue：[Issue #11482](https://github.com/zeroclaw-labs/zeroclaw/issues/11482)  
- 标签：`bug`, `priority:p1`, `status:in-progress`, `zerocode`, `risk:medium`  
- 影响：ZeroCode TUI 聊天响应延迟  
- 现象：daemon 已完成 turn 并发送最终 `session/update` 后，聊天 UI 仍可能排在无关 `logs/event` 后面  
- 用户影响：交互延迟、误以为 agent 未响应  
- Fix PR：今日数据中未发现明确一一对应 PR，但 [PR #11513](https://github.com/zeroclaw-labs/zeroclaw/pull/11513) 增加 runtime context 可观测性，可能有助于诊断；不是直接修复

#### 3. ZeroCode 终端断开后 100% CPU 自旋

- Issue：[Issue #11481](https://github.com/zeroclaw-labs/zeroclaw/issues/11481)  
- 标签：`bug`, `priority:p1`, `zerocode`, `risk:medium`  
- 影响：ZeroCode TUI 进程资源占用  
- 现象：终端断开后多个进程各占用约一个 CPU 核心  
- 风险：资源泄露、服务器负载升高、后台进程失控  
- Fix PR：今日数据中未发现明确对应 PR

---

### S2 / 中等严重度稳定性问题

#### 4. Web Dashboard 刷新中途丢失用户 prompt

- Issue：[Issue #11517](https://github.com/zeroclaw-labs/zeroclaw/issues/11517)  
- 影响：Web Chat 会话持久化  
- 现象：agent turn 运行中刷新页面，本地 prompt 被旧 snapshot 覆盖并从 localStorage 消失  
- Fix PR：今日数据中未发现明确对应 PR

#### 5. 成本 ledger 遇到 torn-write 后从汇总中静默丢弃记录

- Issue：[Issue #11515](https://github.com/zeroclaw-labs/zeroclaw/issues/11515)  
- 标签：`bug`  
- 影响：成本统计、账务可信度  
- 现象：`costs.jsonl` 出现半写入记录时，解析失败后仅 WARN，不隔离、不显式提示，汇总看起来仍完整  
- 风险：成本报表低估或不可信，运营人员难以及时发现数据损坏  
- Fix PR：今日数据中未发现明确对应 PR

#### 6. ZeroCode Agent 重复工具调用防护失效

- Issue：[Issue #11484](https://github.com/zeroclaw-labs/zeroclaw/issues/11484)  
- 标签：`bug`, `runtime`, `priority:p2`, `status:in-progress`, `zerocode`, `risk:medium`  
- 影响：Agent 工具调用循环  
- 现象：同一 GitHub commits URL 被重复 `web_fetch`，重复工具防护未能阻止  
- 可能 Fix PR：[PR #11507](https://github.com/zeroclaw-labs/zeroclaw/pull/11507)  
  该 PR 旨在限制重复工具失败并保留已完成工作，虽然摘要更聚焦失败恢复，但与工具循环稳定性高度相关。

#### 7. ZeroCode Config 过滤器作用域错误

- Issue：[Issue #11488](https://github.com/zeroclaw-labs/zeroclaw/issues/11488)  
- 标签：`bug`, `config`, `priority:p2`, `status:in-progress`, `zerocode`, `risk:medium`  
- 影响：Config TUI 搜索与导航  
- 现象：一个过滤器同时影响 section sidebar 和 detail content；取消搜索后可能丢失原 section  
- Fix PR：[PR #11504](https://github.com/zeroclaw-labs/zeroclaw/pull/11504)

---

## 6. 功能请求与路线图信号

### 6.1 ZeroCode Config 可用性将成为下一版本重点

今日大量功能请求与 PR 已形成完整闭环，较可能进入下一版本：

- 配置保存状态可观测  
  - Issue：[Issue #11491](https://github.com/zeroclaw-labs/zeroclaw/issues/11491)  
  - PR：[PR #11506](https://github.com/zeroclaw-labs/zeroclaw/pull/11506)

- 空配置段说明与 alias 设置引导  
  - Issue：[Issue #11490](https://github.com/zeroclaw-labs/zeroclaw/issues/11490)  
  - PR：[PR #11508](https://github.com/zeroclaw-labs/zeroclaw/pull/11508)

- 配置字段可读标签与完整描述  
  - Issue：[Issue #11489](https://github.com/zeroclaw-labs/zeroclaw/issues/11489)  
  - PR：[PR #11501](https://github.com/zeroclaw-labs/zeroclaw/pull/11501)

- 删除与重置操作二次确认  
  - Issue：[Issue #11487](https://github.com/zeroclaw-labs/zeroclaw/issues/11487)  
  - PR：[PR #11510](https://github.com/zeroclaw-labs/zeroclaw/pull/11510)

- 保存/取消行为一致化  
  - Issue：[Issue #11486](https://github.com/zeroclaw-labs/zeroclaw/issues/11486)  
  - PR：[PR #11511](https://github.com/zeroclaw-labs/zeroclaw/pull/11511)

- alias reference 数组多选编辑器  
  - Issue：[Issue #11485](https://github.com/zeroclaw-labs/zeroclaw/issues/11485)  
  - PR：[PR #11502](https://github.com/zeroclaw-labs/zeroclaw/pull/11502)

判断：这些功能请求已有成套 PR 支撑，且大多是 `status:in-progress`，进入下一版本的概率较高，前提是 stacked PR 依赖和高风险评审能够完成。

---

### 6.2 智能路由与本地/云端推理策略

- PR：[PR #11516 — add effort-aware local and cloud routing](https://github.com/zeroclaw-labs/zeroclaw/pull/11516)

该 PR 表明 ZeroClaw 正在向更细粒度的运行时调度演进：根据任务复杂度在本地模型与云端模型之间选择路线。  
这对个人 AI 助手尤其关键，因为它直接影响隐私、成本、延迟和能力上限。  
短期看，这是高风险架构变更；长期看，可能成为 ZeroClaw 的核心差异化能力之一。

---

### 6.3 大型生成内容转附件交付

- PR：[PR #11509 — prefer attachments for large generated artifacts](https://github.com/zeroclaw-labs/zeroclaw/pull/11509)

该 PR 建议将大型 HTML、脚本、电子表格、导出内容保存到 workspace，并通过文档标记回复，而不是直接塞进聊天消息。  
这反映出多通道助手正在处理越来越多“文件型产物”，项目需要从纯文本回复转向 artifact 管理。

---

### 6.4 Runtime 与工具调用边界强化

- [PR #11512 — bound HTTP calls with one deadline](https://github.com/zeroclaw-labs/zeroclaw/pull/11512)  
  将技能 HTTP 调用纳入统一 30 秒预算，覆盖 DNS、目标检查、请求发送、响应体读取，防止局部超时空洞。

- [PR #11499 — report Seatbelt initialization during registry construction](https://github.com/zeroclaw-labs/zeroclaw/pull/11499)  
  在工具注册构建阶段报告 Seatbelt 初始化错误，避免 agent 在安全隔离未正确初始化时继续使用工具。

这些 PR 表明项目在加强 agent 工具执行的安全边界和可预测性。

---

## 7. 用户反馈摘要

从今日 Issues 可以提炼出以下真实用户痛点：

1. **“模型看图不完整，但没有任何错误提示”**  
   代表 Issue：[Issue #11478](https://github.com/zeroclaw-labs/zeroclaw/issues/11478)  
   用户在 Matrix 和 Telegram 发送较大 JPEG 后，模型只能识别图片上半部分。痛点不是单纯失败，而是系统静默截断导致结果看似正常、实则错误。

2. **“配置保存了，但不知道是否真的生效”**  
   代表 Issue：[Issue #11491](https://github.com/zeroclaw-labs/zeroclaw/issues/11491)  
   运营者需要区分 persisted、applied、pending、rejected、awaiting reload 等状态，否则很难判断运行中的消费者是否采用了新配置。

3. **“TUI 配置编辑行为不一致，容易误操作”**  
   代表 Issue：[Issue #11486](https://github.com/zeroclaw-labs/zeroclaw/issues/11486)、[Issue #11487](https://github.com/zeroclaw-labs/zeroclaw/issues/11487)  
   不同编辑器保存/取消按键不一致，删除或重置缺少确认，导致用户对配置系统缺乏信心。

4. **“空配置页面不知道下一步该做什么”**  
   代表 Issue：[Issue #11490](https://github.com/zeroclaw-labs/zeroclaw/issues/11490)  
   空列表只显示 `[+ Add]` 和帮助提示，但没有说明该配置是否可选、是否未配置、是否阻塞后续功能。

5. **“长任务或 UI 队列问题会破坏交互连续性”**  
   代表 Issue：[Issue #11482](https://github.com/zeroclaw-labs/zeroclaw/issues/11482)、[Issue #11517](https://github.com/zeroclaw-labs/zeroclaw/issues/11517)  
   用户对聊天 UI 的期望是实时、可恢复、不中断；日志事件阻塞聊天更新或刷新丢 prompt 都会显著降低信任感。

6. **“成本数据看起来完整，但实际可能丢记录”**  
   代表 Issue：[Issue #11515](https://github.com/zeroclaw-labs/zeroclaw/issues/11515)  
   成本账本的完整性是运营和预算控制基础。WARN-only 的错误处理不足以满足生产使用需求。

---

## 8. 待处理积压

今日数据中未提供长期未响应 Issue/PR 的创建时间跨度，因此无法识别真正意义上的“长期无人响应”积压。不过，以下开放项值得维护者优先关注：

### 高优先级 Bug 积压

- [Issue #11478 — 图片输入静默截断](https://github.com/zeroclaw-labs/zeroclaw/issues/11478)  
  P1，影响多模态输入正确性，暂无明确 fix PR。

- [Issue #11482 — Chat updates wait behind unrelated log notifications](https://github.com/zeroclaw-labs/zeroclaw/issues/11482)  
  P1，影响 ZeroCode 实时交互体验，暂无明确直接 fix PR。

- [Issue #11481 — ZeroCode spins at 100% CPU after terminal disconnection](https://github.com/zeroclaw-labs/zeroclaw/issues/11481)  
  P1，涉及资源泄露与后台进程失控，暂无明确 fix PR。

- [Issue #11517 — Web chat reload mid-turn drops prompt](https://github.com/zeroclaw-labs/zeroclaw/issues/11517)  
  S2，影响默认持久化配置下的 Web Chat 可靠性。

- [Issue #11515 — cost ledger drops torn-write records](https://github.com/zeroclaw-labs/zeroclaw/issues/11515)  
  S2，影响成本统计可信度，建议增加 quarantine、显式错误状态或修复工具。

### 高风险 PR 评审积压

- [PR #11516 — effort-aware local and cloud routing](https://github.com/zeroclaw-labs/zeroclaw/pull/11516)  
  `risk:high`, `size:XL`，架构影响大，建议拆分或重点安排 runtime/provider 维护者评审。

- [PR #11506 — saved and applied config status](https://github.com/zeroclaw-labs/zeroclaw/pull/11506)  
  `risk:high`, `size:XL`, stacked，涉及模块极多，合并前需要确认依赖链和迁移影响。

- [PR #11512 — bound HTTP calls with one deadline](https://github.com/zeroclaw-labs/zeroclaw/pull/11512)  
  `risk:high`，涉及技能 HTTP 调用超时语义，建议重点验证兼容性和边界场景。

- [PR #11500 — delegate approval placement exception](https://github.com/zeroclaw-labs/zeroclaw/pull/11500)  
  文档型高风险 placement exception，可能阻塞相关 runtime delegate approval 功能合并。

- [PR #11497 — native argument-recovery placement exception](https://github.com/zeroclaw-labs/zeroclaw/pull/11497)  
  影响 native tool argument recovery 的合并路径，需要明确批准方与例外范围。

---

## 总体判断

ZeroClaw 今日呈现出 **高开发活跃、强产品化导向、但合并节奏不足** 的状态。  
ZeroCode Config 相关问题已经形成从用户反馈到实现 PR 的完整链路，是近期最明确的版本候选方向。  
同时，P1 级的图片截断、聊天更新阻塞、CPU 自旋问题尚未看到明确闭环，需要维护者优先 triage。  
建议下一步重点关注三件事：**合并 ZeroCode Config 的低/中风险改进、为 P1 Bug 指派 owner、拆分或加速评审高风险 XL PR**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*