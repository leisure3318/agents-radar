# OpenClaw 生态日报 2026-10-13

> Issues: 35 | PRs: 56 | 覆盖项目: 13 个 | 生成时间: 2026-10-13 05:55 UTC

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
**日期：2026-10-13**  
**仓库：** [openclaw/openclaw](https://github.com/openclaw/openclaw)

---

## 1. 今日速览

过去 24 小时 OpenClaw 维持了**非常高的工程活跃度**：Issues 更新 35 条，其中 21 条仍处于新开或活跃状态，14 条已关闭；PR 更新 56 条，其中 43 条仍待合并，13 条已合并或关闭。今日还发布了一个 beta 版本 **v2026.10.5-beta.2**，重点集中在 `openclaw update` 的恢复、交接、回滚与旧状态兼容问题上。

从议题分布看，项目当前的核心压力集中在三类问题：**Gateway 生命周期稳定性、更新/迁移可靠性、认证与模型提供商兼容性**。尤其是 P0/P1 级别的 update failure、Gateway crash-loop、状态所有权 heartbeat、睡眠/时钟漂移触发重启等问题，说明 OpenClaw 在“长期运行的个人 AI 助手 / 自主管理 Agent”场景中仍面临较高稳定性挑战。

PR 侧则显示维护者正在快速修复启动、重启、恢复、配置验证、CI、认证与 UI 体验问题，工程推进速度较快，但积压的高优先级 Issue 仍多，短期内项目健康度可评为：**活跃度高、响应快，但稳定性风险偏高，beta 渠道仍需谨慎使用**。

---

## 2. 版本发布

### v2026.10.5-beta.2  
**发布标题：** openclaw 2026.10.5-beta.2  
**链接：** [Release v2026.10.5-beta.2](https://github.com/openclaw/openclaw/releases/tag/v2026.10.5-beta.2)

#### 主要更新

本次 beta 的核心改进集中在 `openclaw update` 的恢复与兼容能力：

- **Update finish / recover 流程增强**
  - `openclaw update` 现在会尝试结算 stale handoff leases。
  - 能处理已完成 receipts。
  - 能处理旧版 **2026.9.8 recovery records**。
  - 避免因 `update-recovery-pending` 直接中止。

- **服务运行时保持能力增强**
  - 更新过程中继续保留 service heap limit。
  - 保持 webhook listeners。
  - 改善 Windows short-path / 短路径相关处理，虽然 release 摘要被截断，但从今日 Issues 看，Windows 更新路径、链接包、pnpm workspace symlink 仍是活跃问题区域。

#### 迁移与升级注意事项

结合今日 Issue 反馈，升级到该 beta 时建议重点关注：

1. **从 2026.9.x 升级的用户需保留状态目录备份**
   - 今日仍出现多个 2026.9.9 到 2026.10.x 的 `package-swap`、`retired-state-format`、`update-executor-settlement` 问题。
   - 相关 Issue：
     - [#170410 Update failure: retired-state-format](https://github.com/openclaw/openclaw/issues/170410)
     - [#170545 Update failure: update-executor-settlement](https://github.com/openclaw/openclaw/issues/170545)
     - [#170682 Update failure: package-swap](https://github.com/openclaw/openclaw/issues/170682)

2. **Windows 用户需谨慎进行 git-source / linked package 更新**
   - 新报问题显示 Windows git-source update 在 runtime staging 时可能递归展开 workspace symlink，触发路径长度或 `EINVAL`。
   - 相关 Issue：[#170700](https://github.com/openclaw/openclaw/issues/170700)

3. **使用 Gateway 长驻模式的用户需关注睡眠、系统时间回拨、强制停止后的状态所有权问题**
   - 相关 Issue：
     - [#169829 Gateway self-restarts when wall clock steps backwards](https://github.com/openclaw/openclaw/issues/169829)
     - [#170525 macOS lid-close sleep expires state-owner heartbeat](https://github.com/openclaw/openclaw/issues/170525)
     - [#170597 forced Gateway stop leaves dead-PID state-owner record](https://github.com/openclaw/openclaw/issues/170597)

#### 破坏性变更

当前 release 摘要中未明确列出 breaking changes。不过从今日 Issues 看，部分用户在从 2026.9.x / 2026.10.1 升级到新版本时仍遇到 state format、package swap、recovery settlement 等阻塞问题。因此对于生产环境或自动化 Agent 部署，建议将 **v2026.10.5-beta.2 视为需要验证的 beta 升级**，避免直接在无备份的主实例上滚动更新。

---

## 3. 项目进展

今日 PR 总量很高，56 条更新中有 13 条已合并或关闭。重要推进主要集中在以下方向。

### 3.1 Gateway 与更新恢复链路

- [PR #170696 fix(gateway): keep updates responsive under startup load](https://github.com/openclaw/openclaw/pull/170696)  
  **状态：OPEN**  
  目标是让 managed deployment acceptance 在启动或 replay 压力下不再误超时，同时减少 rollback 阶段重复失败。该 PR 与今日多条 update failure、Gateway startup load 问题高度相关，若合并，可能显著改善大型状态目录或重启恢复场景下的更新成功率。

- [PR #170020 fix(gateway): recover after sleep expires state ownership](https://github.com/openclaw/openclaw/pull/170020)  
  **状态：OPEN，P1**  
  针对长时间睡眠导致 ownership heartbeat 过期后 Gateway 无法访问状态的问题。与 macOS 合盖睡眠问题 [#170525](https://github.com/openclaw/openclaw/issues/170525) 及时间漂移问题 [#169829](https://github.com/openclaw/openclaw/issues/169829) 属同一稳定性主题。

- [PR #170699 fix(gateway): resume sessions whose restart-aborted run finished before the recovery marker](https://github.com/openclaw/openclaw/pull/170699)  
  **状态：OPEN**  
  修复 Gateway 重启中断 session 后，某些 run 在 recovery marker 写入前已经完成 abort cleanup，导致恢复逻辑跳过的问题。该 PR 对“重启后会话不中断”的用户体验很关键。

- [PR #170697 fix(agents): keep streamed answer when a restart aborts the run](https://github.com/openclaw/openclaw/pull/170697)  
  **状态：OPEN**  
  解决 Gateway restart drain 中断 run 时，已经 stream 给客户端的回答从 transcript 中消失的问题。它补强了 session 持久化一致性。

### 3.2 性能与启动体验

- [PR #170612 fix(gateway): reduce stalls after readiness on large agent fleets](https://github.com/openclaw/openclaw/pull/170612)  
  **状态：OPEN**  
  修复大型 agent fleet 在 readiness 后仍因数据库路径比较、配置 hash 等操作造成阻塞的问题。对多 Agent 部署、团队或自动化集群使用者有直接价值。

- [PR #170695 perf(config): stop blocking plugin-update config writes on repeated migration checks](https://github.com/openclaw/openclaw/pull/170695)  
  **状态：OPEN**  
  针对 plugin update 完成 deferred migration 后重复读取 migration ledger、触发同步 SQLite snapshot 的性能问题。与 Issue [#170496](https://github.com/openclaw/openclaw/issues/170496) 中“每次只读都复制 state DB”高度相关。

- [PR #170685 fix: avoid blocking SQLite snapshots during config validation](https://github.com/openclaw/openclaw/pull/170685)  
  **状态：OPEN**  
  减少 config read/write/validation 中阻塞 SQLite snapshot preparation。该方向显示维护者正系统性削减同步 DB 访问对 CLI 与 Gateway 的阻塞。

### 3.3 认证、模型与 provider 兼容

- [PR #170632 fix(auth): publish synchronous SDK credential mutations](https://github.com/openclaw/openclaw/pull/170632)  
  **状态：OPEN，security-sensitive-changed**  
  解决 SDK credential mutation 可能绕过 Gateway publication lifecycle 的问题。该 PR 涉及认证安全边界，风险较高但重要性也高。

- [PR #170009 feat(models): support endpoint-resolved custom model aliases](https://github.com/openclaw/openclaw/pull/170009)  
  **状态：OPEN，P2，ready for maintainer look**  
  支持 endpoint-resolved custom model aliases，避免自定义 router alias 返回具体 upstream model id 时误报“Model route changed”。这对使用自建模型路由、多供应商代理的用户有明显价值。

- [PR #170692 fix(status): prepare runtime config before resolving online usage](https://github.com/openclaw/openclaw/pull/170692)  
  **状态：OPEN**  
  修复 `status --usage --json` 在读取 Codex account identity 时未准备 plugin runtime config，导致保留泛化 OpenAI “Token expired” 的问题。

### 3.4 UI 与用户体验

- [PR #170662 fix(control-ui): stop hiding settled chat rows on reload](https://github.com/openclaw/openclaw/pull/170662)  
  **状态：OPEN**  
  解决登录操作者 reload chat/dashboard deep link 时 transcript 中心区域空白的问题。与 Issue [#170030](https://github.com/openclaw/openclaw/issues/170030) 中 Control UI 丢失近期对话的痛点相近。

- [PR #170688 fix(ui): align sidebar avatar and search with navigation controls](https://github.com/openclaw/openclaw/pull/170688)  
  **状态：OPEN**  
  视觉对齐修复，影响较小但有助于新导航侧栏体验。

### 3.5 已关闭 / 已完成的重要修复

以下 PR 已关闭，结合标题和描述可能代表修复完成或被替代：

- [PR #170621 fix(gateway): reduce reconnect work on busy hosts](https://github.com/openclaw/openclaw/pull/170621)  
  针对繁忙主机上 Gateway connect 可能耗尽 15 秒 deadline、重复 owner-profile ensure 的问题。

- [PR #170628 fix(ci): use PR CI for broad proof and replay failed tests locally](https://github.com/openclaw/openclaw/pull/170628)  
  改善 PR 准备流程和失败测试复现效率。

- [PR #170234 fix(agents): prompt cache invalidated when code mode catalog changes mid-session](https://github.com/openclaw/openclaw/pull/170234)  
  解决 Code Mode 长会话中 tool catalog 漂移导致 prompt cache 失效、后续 turn 成本升高的问题。

---

## 4. 社区热点

### 4.1 Gateway 状态所有权与自重启问题

- [Issue #169829 Gateway self-restarts when the system wall clock steps backwards](https://github.com/openclaw/openclaw/issues/169829)  
  **状态：OPEN，P1，impact: crash-loop，4 评论**  
  用户在 WSL2 + systemd user unit 环境中报告系统 wall clock 回拨后，Gateway state-ownership heartbeat 使用 wall clock 判断过期，从而自重启。  
  **背后诉求：** Gateway 的状态所有权判定应使用 monotonic clock 或能容忍 NTP / VM / WSL 时间跳变。对长驻个人 AI 助手而言，系统时间漂移不应导致 crash-loop。

- [Issue #170525 macOS lid-close sleep expires state-owner heartbeat](https://github.com/openclaw/openclaw/issues/170525)  
  **状态：OPEN，P1，impact: crash-loop，2 评论**  
  macOS 合盖睡眠 / DarkWake / 唤醒后，state-owner heartbeat 过期并触发 Gateway restart。  
  **背后诉求：** 桌面个人助手必须能适应普通笔记本睡眠/唤醒生命周期，而不是将睡眠当作状态所有权异常。

- [PR #170020 fix(gateway): recover after sleep expires state ownership](https://github.com/openclaw/openclaw/pull/170020)  
  **状态：OPEN，P1**  
  是目前最直接相关的修复 PR。

### 4.2 Update failure 与迁移恢复问题

- [Issue #170410 Update failure: retired-state-format](https://github.com/openclaw/openclaw/issues/170410)  
  **状态：OPEN，P0，impact: ux-release-blocker**  
  2026.9.9 用户在 Linux 上通过 Gateway RPC update 遇到 retired-state-format。  
  **背后诉求：** 旧状态格式必须有可靠升级路径，不能阻塞发布。

- [Issue #170545 Update failure: update-executor-settlement](https://github.com/openclaw/openclaw/issues/170545)  
  **状态：OPEN，P0，stable，impact: ux-release-blocker**  
  Windows 2026.9.9 更新失败，涉及 update executor settlement。  
  **背后诉求：** Windows 更新链路可靠性仍需加强，尤其是从 stable 版本升级。

- [Issue #170335 successful update removes database snapshots it said must be preserved](https://github.com/openclaw/openclaw/issues/170335)  
  **状态：OPEN，P2，impact: data-loss，linked-pr-open**  
  用户报告成功更新后，命令提示必须保留的 pre-migration database snapshots 目录却消失。  
  **背后诉求：** 更新工具对备份/快照的承诺必须可信，涉及数据安全感与回滚能力。

### 4.3 认证与 provider failover

- [Issue #170388 Provider failover misses mid-message HTTP status](https://github.com/openclaw/openclaw/issues/170388)  
  **状态：CLOSED，P2，impact: auth-provider，diamond lobster**  
  `inferSignalStatus` 只识别 leading token 或字段里的 HTTP 状态，无法识别 Gemini 报错中间的 `(503)`，导致 5xx/429 不触发 failover。  
  **背后诉求：** 多 provider 环境下，错误识别要适配真实 API 文案，而不是仅依赖理想结构化字段。

- [Issue #170503 Claude CLI auth login falsely reports unauthenticated](https://github.com/openclaw/openclaw/issues/170503)  
  **状态：CLOSED，P1，impact: auth-provider**  
  WSL2 上 Claude CLI probe 3 秒超时导致误判未认证。  
  **背后诉求：** 认证探测要区分“超时/慢响应”和“未认证”，否则会破坏已有登录状态的信任。

### 4.4 UI 历史记录与会话可见性

- [Issue #170030 Control UI loses recent conversation from rendered history](https://github.com/openclaw/openclaw/issues/170030)  
  **状态：OPEN，P2**  
  2026.9.8 Control UI 仅显示 1–3 条近期对话，随后跳到 20–36 小时前内容。  
  **背后诉求：** 用户对 AI 助手最基本的期待是“对话历史可靠可见”。历史错乱会直接破坏使用信心。

- [PR #170662 fix(control-ui): stop hiding settled chat rows on reload](https://github.com/openclaw/openclaw/pull/170662)  
  **状态：OPEN**  
  与 UI reload 后隐藏 settled chat rows 相关，可能缓解类似体验问题。

---

## 5. Bug 与稳定性

以下按严重程度与影响范围排序。

### P0：发布阻塞 / 升级阻塞

1. [#170410 Update failure: retired-state-format](https://github.com/openclaw/openclaw/issues/170410)  
   - **状态：OPEN**
   - **影响：** ux-release-blocker
   - **环境：** 2026.9.9，Linux x64，Node 24.19.0
   - **fix PR：** 未明确关联
   - **风险：** 老版本状态格式升级路径不完整，可能阻塞稳定版用户迁移。

2. [#170545 Update failure: update-executor-settlement](https://github.com/openclaw/openclaw/issues/170545)  
   - **状态：OPEN**
   - **影响：** ux-release-blocker，stable
   - **环境：** 2026.9.9，Windows x64，Node 24.18.1
   - **fix PR：** 未明确关联
   - **风险：** Windows stable 用户升级失败，影响 beta 推进与 release 信心。

### P1：Crash-loop / Gateway 生命周期严重问题

3. [#169829 Gateway self-restarts when wall clock steps backwards](https://github.com/openclaw/openclaw/issues/169829)  
   - **状态：OPEN**
   - **影响：** crash-loop
   - **fix PR：** 相关方向可能是 [PR #170020](https://github.com/openclaw/openclaw/pull/170020)
   - **风险：** WSL2、VM、NTP 校时环境中 Gateway 可能反复自重启。

4. [#170525 macOS lid-close sleep expires state-owner heartbeat](https://github.com/openclaw/openclaw/issues/170525)  
   - **状态：OPEN**
   - **影响：** crash-loop
   - **fix PR：** 相关方向为 [PR #170020](https://github.com/openclaw/openclaw/pull/170020)
   - **风险：** 笔记本日常睡眠/唤醒场景不稳定。

5. [#170644 Gateway hot reload during startup escalates to self-restart](https://github.com/openclaw/openclaw/issues/170644)  
   - **状态：OPEN**
   - **影响：** crash-loop，stable
   - **fix PR：** 未明确关联
   - **风险：** startup 阶段 hot reload 与 cron monitor recovery 交互仍可能导致自重启。

6. [#170693 permanently deferred session-migration files are re-scanned on every startup](https://github.com/openclaw/openclaw/issues/170693)  
   - **状态：OPEN**
   - **影响：** session-state，crash-loop
   - **fix PR：** 未明确关联
   - **风险：** 大量 historical transcript deferred 文件导致 startup migration lease 超时，Gateway 启动失败。

7. [#170597 forced Gateway stop leaves dead-PID state-owner record](https://github.com/openclaw/openclaw/issues/170597)  
   - **状态：OPEN**
   - **影响：** state ownership / maintenance
   - **fix PR：** 未明确关联
   - **风险：** 强制停止后重启 Gateway 无法验证 ownership，用户被卡在“maintenance finishes”状态。

### P2：数据一致性、认证、性能与 UX 问题

8. [#170335 successful update removes database snapshots it said must be preserved](https://github.com/openclaw/openclaw/issues/170335)  
   - **状态：OPEN**
   - **影响：** data-loss
   - **fix PR：** 标记 `linked-pr-open`，但数据中未列出具体 PR
   - **风险：** 备份/回滚可信度受损。

9. [#170496 Read-only state-DB snapshot copied per read](https://github.com/openclaw/openclaw/issues/170496)  
   - **状态：OPEN**
   - **影响：** crash-loop / 性能
   - **fix PR：** 可能相关：[PR #170685](https://github.com/openclaw/openclaw/pull/170685)、[#170695](https://github.com/openclaw/openclaw/pull/170695)
   - **风险：** 繁忙 Gateway 中每次读都复制 SQLite，cron tick 放大开销。

10. [#170393 Codex OAuth migration blocked: schema 20, bridge supports up to 19](https://github.com/openclaw/openclaw/issues/170393)  
    - **状态：OPEN**
    - **影响：** auth-provider
    - **fix PR：** 未明确关联
    - **风险：** 旧安装迁移到 2026.10.2 时 OAuth、session history 保留路径不完整。

11. [#170666 macOS update keeps verifying previous Gateway past --timeout budget](https://github.com/openclaw/openclaw/issues/170666)  
    - **状态：OPEN**
    - **影响：** update UX
    - **fix PR：** 未明确关联
    - **风险：** 用户显式设置超时后，update 仍远超预算运行，削弱 CLI 可控性。

12. [#170678 Worktree-backed sessions_spawn is lost on Gateway hard restart](https://github.com/openclaw/openclaw/issues/170678)  
    - **状态：OPEN**
    - **影响：** session-state
    - **fix PR：** 未明确关联
    - **风险：** hard restart 后 child session、worktree、admission 状态不可恢复。

13. [#170700 Windows git-source update fails in preflight-runtime-stage](https://github.com/openclaw/openclaw/issues/170700)  
    - **状态：OPEN**
    - **影响：** Windows update
    - **fix PR：** 未明确关联
    - **风险：** pnpm workspace symlink 递归展开导致路径过长或 EINVAL。

### 已关闭的重要 Bug

- [#170388 Provider failover misses mid-message HTTP status](https://github.com/openclaw/openclaw/issues/170388)  
  5xx/429 failover 识别问题已关闭。

- [#170062 TTS-only assistant turns disappear from replay](https://github.com/openclaw/openclaw/issues/170062)  
  TTS-only assistant turn 在 OpenAI Completions replay 中丢失的问题已关闭。

- [#170027 TTS-only heartbeat replies dropped before speech synthesis](https://github.com/openclaw/openclaw/issues/170027)  
  TTS heartbeat reply 未生成语音的问题已关闭。

- [#170503 Claude CLI auth login falsely reports unauthenticated](https://github.com/openclaw/openclaw/issues/170503)  
  Claude CLI 认证误判问题已关闭。

- [#170620 autoclaw-productivity email pattern uses unsupported regex lookaround](https://github.com/openclaw/openclaw/issues/170620)  
  OpenAI API 不支持 regex lookaround 导致请求失败的问题已关闭。

---

## 6. 功能请求与路线图信号

### 6.1 自主管理 Agent 的 Gateway restart/update 能力

- [Issue #170681 Feature: graceful agent-initiated Gateway restart/update](https://github.com/openclaw/openclaw/issues/170681)  
  **状态：OPEN，P3，needs-security-review，impact: security**  
  用户希望 autonomous agents 可以通过受支持的 graceful tool action 重启或更新自己的 Gateway，而不需要人类 owner 介入。  
  **路线图信号：** 这是 OpenClaw 向“自管理 AI 智能体基础设施”演进的重要需求，但涉及安全边界、权限授权、误操作防护，短期内不太可能直接进入默认功能，可能以 opt-in、policy-gated、owner-approved 模式推进。

### 6.2 Active Memory per-agent overrides

- [Issue #170661 Feature: per-agent Active Memory overrides](https://github.com/openclaw/openclaw/issues/170661)  
  **状态：OPEN，P2，source-repro，impact: auth-provider**  
  当前 active-memory 配置是 plugin-wide，用户希望支持每个 agent 独立配置 mode、model、timeoutMs 等。  
  **路线图信号：** 多 Agent 部署中，不同 Agent 的记忆策略、成本预算和延迟要求不同。该需求与 OpenClaw 的 agent fleet 场景高度契合，较可能进入后续版本。

### 6.3 Browser extension opt-in / on-demand connection

- [Issue #170670 Browser extension: opt-in / on-demand connection instead of always-on relay](https://github.com/openclaw/openclaw/issues/170670)  
  **状态：OPEN，P2，impact: security**  
  用户对浏览器启动后扩展即持续连接 Gateway 表示隐私不适，希望改为 opt-in 或 on-demand。  
  **路线图信号：** 这是典型的“隐私感知 UX”需求。即便当前连接空闲，用户感知仍是“AI 一直连着浏览器”。该问题可能推动浏览器扩展加入显式连接状态、手动授权、站点级权限或临时会话模式。

### 6.4 Native per-platform gate results

- [Issue #170679 Native per-platform gate results](https://github.com/openclaw/openclaw/issues/170679)  
  **状态：CLOSED，P3**  
  用户希望 node exec / cloud workers 能针对多个平台运行 gate，并产出 per-platform 的 passed/failed/skipped 结果。  
  **路线图信号：** 虽然已关闭，但反映出 OpenClaw 用户正在将其用于跨平台自动验证和 CI-like 工作流。

### 6.5 Endpoint-resolved custom model aliases

- [PR #170009 feat(models): support endpoint-resolved custom model aliases](https://github.com/openclaw/openclaw/pull/170009)  
  **状态：OPEN，ready for maintainer look**  
  该功能已进入 PR 阶段，较有可能进入近期版本。对自建 router、模型别名和多提供商环境非常实用。

---

## 7. 用户反馈摘要

### 7.1 用户最明显的不满：更新链路不可预测

多个 Issue 来自自动生成或用户确认的 update failure report，涉及 `package-swap`、`retired-state-format`、`update-executor-settlement`、`preflight-runtime-stage` 等。用户痛点不是单一错误，而是：

- 更新失败后恢复路径不清晰。
- 某些错误需要维护者介入判断。
- Windows、Linux、macOS 都有不同更新失败形态。
- 用户担心状态目录、数据库快照、认证资料在更新中丢失。

代表 Issue：

- [#170076 Update failure: package-swap 2026.10.1](https://github.com/openclaw/openclaw/issues/170076)
- [#170682 Update failure: package-swap 2026.9.9](https://github.com/openclaw/openclaw/issues/170682)
- [#170335 successful update removes database snapshots](https://github.com/openclaw/openclaw/issues/170335)
- [#170700 Windows git-source update fails](https://github.com/openclaw/openclaw/issues/170700)

### 7.2 长驻 Gateway 用户期望“像系统服务一样可靠”

用户场景包括 WSL2 systemd user unit、macOS laptop、Linux systemd system unit、autonomous agents。反馈显示他们不是把 OpenClaw 当一次性 CLI，而是当长期运行的个人 AI 助手基础设施。因此：

- 系统睡眠不应导致 Gateway crash-loop。
- wall clock 回拨不应触发 state ownership 丢失。
- hard restart 后 session/worktree/admission 应可恢复。
- `doctor --fix` 对 live Gateway 应有清晰安全行为。

代表 Issue：

- [#169829](https://github.com/openclaw/openclaw/issues/169829)
- [#170525](https://github.com/openclaw/openclaw/issues/170525)
- [#170597](https://github.com/openclaw/openclaw/issues/170597)
- [#170678](https://github.com/openclaw/openclaw/issues/170678)

### 7.3 认证与 provider 体验需要更容错

用户使用 Claude CLI、Gemini、Codex OAuth、自定义模型路由等复杂 provider 组合。反馈集中在：

- CLI 探测超时不能等同于未认证。
- provider 错误文案需要更智能解析。
- OAuth schema bridge 需要覆盖新版本数据库。
- 自定义模型 alias 不应触发误导性 route changed 提示。

代表 Issue / PR：

- [#170503 Claude CLI auth login falsely reports unauthenticated](https://github.com/openclaw/openclaw/issues/170503)
- [#170388 Provider failover misses mid-message HTTP status](https://github.com/openclaw/openclaw/issues/170388)
- [#170393 Codex OAuth migration blocked](https://github.com/openclaw/openclaw/issues/170393)
- [PR #170009](https://github.com/openclaw/openclaw/pull/170009)

### 7.4 UI 反馈集中在“历史可见性”和“加载状态”

Control UI 相关反馈显示，用户对 chat history 的可靠性非常敏感：

- 最近对话从 rendered history 中消失。
- reload deep link 时 transcript 空白。
- settled chat rows 被隐藏。
- 旧 interrupted incoming items 混入当前活动。

代表 Issue / PR：

- [#170030 Control UI loses recent conversation](https://github.com/openclaw/openclaw/issues/170030)
- [PR #170662 fix(control-ui): stop hiding settled chat rows on reload](https://github.com/openclaw/openclaw/pull/170662)

---

## 8. 待处理积压

以下项目建议维护者优先关注，原因是它们处于高优先级、影响面广，或已有 PR 但仍等待决策/证明。

### 8.1 高优先级 Issue 待处理

1. [#170410 Update failure: retired-state-format](https://github.com/openclaw/openclaw/issues/170410)  
   - **优先级：P0**
   - **建议：** 明确是否由 v2026.10.5-beta.2 覆盖；若未覆盖，应提供手动恢复说明与自动迁移计划。

2. [#170545 Update failure: update-executor-settlement](https://github.com/openclaw/openclaw/issues/170545)  
   - **优先级：P0**
   - **建议：** Windows stable update 阻塞，应优先复现并给出 workaround。

3. [#169829 Gateway self-restarts on wall clock rollback](https://github.com/openclaw/openclaw/issues/169829)  
   - **优先级：P1**
   - **建议：** 明确 state ownership heartbeat 是否改用 monotonic clock，以及旧记录如何迁移。

4. [#170525 macOS sleep expires state-owner heartbeat](https://github.com/openclaw/openclaw/issues/170525)  
   - **优先级：P1**
   - **建议：** 与 [PR #170020](https://github.com/openclaw/openclaw/pull/170020) 联动，确认是否覆盖 macOS DarkWake/lid-open 路径。

5. [#170693 session-migration files re-scanned on every startup](https://github.com/openclaw/openclaw/issues/170693)  
   - **优先级：P1**
   - **建议：** 对 permanently deferred 文件增加一次性标记或跳过索引，避免启动 lease 被历史文件耗尽。

6. [#170597 forced Gateway stop leaves dead-PID state-owner record](https://github.com/openclaw/openclaw/issues/170597)  
   - **优先级：P1**
   - **建议：** `doctor --fix` 对 live Gateway 的行为需要产品决策：拒绝、排队、发起 graceful maintenance，还是要求显式 `--force-live`。

### 8.2 关键 PR 待维护者审查

1. [PR #170020 fix(gateway): recover after sleep expires state ownership](https://github.com/openclaw/openclaw/pull/170020)  
   - **原因：** 直接对应多个 P1 crash-loop / sleep / heartbeat 问题。

2. [PR #170696 fix(gateway): keep updates responsive under startup load](https://github.com/openclaw/openclaw/pull/170696)  
   - **原因：** 与 update reliability、startup load、rollback timeout 强相关。

3. [PR #170632 fix(auth): publish synchronous SDK credential mutations](https://github.com/openclaw/openclaw/pull/170632)  
   - **原因：** 安全敏感，涉及 credential authority，一旦设计不稳会影响认证可信边界。

4. [PR #170467 perf(gateway): retain boot filesystem facts in their owners](https://github.com/openclaw/openclaw/pull/170467)  
   - **状态：waiting on author，XL，merge-risk: auth-provider / availability**
   - **原因：** 性能收益潜力大，但合并风险高，需要作者补充证明。

5. [PR #170539 refactor(sessions): retain membership authority at effects](https://github.com/openclaw/openclaw/pull/170539)  
   - **状态：needs proof，XL，merge-risk: automation / security-boundary**
   - **原因：** session membership authority 是安全与自动化核心边界，应要求充分测试与迁移说明。

6. [PR #170009 feat(models): support endpoint-resolved custom model aliases](https://github.com/openclaw/openclaw/pull/170009)  
   - **状态：ready for maintainer look**
   - **原因：** 功能边界清晰，用户价值明确，可能适合较快纳入下一版本。

---

## 总体健康度评估

- **开发活跃度：高**  
  24 小时内 35 条 Issue 更新、56 条 PR 更新，说明维护者和社区反馈都非常活跃。

- **响应速度：较高**  
  多个 P1/P2 问题已有相关 PR 或已关闭，修复节奏快。

- **稳定性：中等偏低**  
  当前高优先级问题集中在 Gateway 生命周期、更新恢复、状态迁移和认证边界，均属于核心路径。对于生产级长期运行部署，仍建议谨慎升级 beta。

- **项目方向：清晰但压力较大**  
  OpenClaw 正从“AI 助手工具”演进为“长驻、自恢复、多 Agent、自主管理的本地 AI 基础设施”。今日的问题与 PR 都说明项目正在补齐系统服务级可靠性，但这也带来了 update、state ownership、session recovery、安全授权等复杂工程挑战。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告  
**日期：2026-10-13**

---

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态呈现出明显的“两极化”：头部项目如 **OpenClaw、Hermes Agent、ZeroClaw、CoPaw/QwenPaw** 保持高频 Issue/PR 流动，正在从“可用工具”走向“长期运行、自恢复、多端接入、可治理的 Agent 基础设施”。  
技术焦点高度集中在 **Gateway/daemon 生命周期、更新与恢复、权限与认证、多 Agent 编排、MCP 工具生态、成本与上下文管理、桌面/WebUI 体验** 等核心路径。  
与此同时，PicoClaw、IronClaw、Moltis 等项目虽然活跃度较低，但议题方向具有代表性，尤其是 **MCP 扩展示例、频道投递安全、benchmark 质量评估**。  
整体来看，生态已进入“生产化补课期”：功能扩展仍快，但用户反馈越来越集中在可靠性、安全边界、跨平台兼容和长期运行成本上。

---

## 2. 各项目活跃度对比

> 注：Issues / PR 数为摘要中过去 24 小时更新量；健康度为基于活跃度、修复推进、风险暴露和积压情况的综合判断。

| 项目 | Issues 更新 | PR 更新 | Release | 今日主要主题 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 35 | 56 | **v2026.10.5-beta.2** | Gateway 生命周期、update/recovery、状态所有权、认证/provider、UI 历史 | **高活跃，高风险**：响应快，但 P0/P1 稳定性压力大 |
| **Hermes Agent** | 50 | 50 | 无 | Desktop/Gateway、Slack/Telegram/QQBot、Kanban、工具调用、Windows 更新 | **高活跃，中高风险**：反馈密集，PR 积压和重复方案较多 |
| **ZeroClaw** | 11 | 28 | 无 | prompt cache、成本统计、runtime 安全、ZeroCode、工具 schema | **高活跃，治理较强**：安全与成本治理清晰，仍有缓存/路由问题 |
| **CoPaw / QwenPaw** | 8 | 19 | 无 | Windows 稳定性、Creator、Console 多端同步、web_search provider、channels 插件化 | **高活跃，快速迭代**：生态扩展强，但 Windows/Hub 恢复需优先处理 |
| **NanoBot** | 1 | 10 | 无 | WebUI、文档技能、图像 API、PPTX 解析、MCP 示例 | **中高活跃，健康**：PR 质量较聚焦，讨论热度低 |
| **LobsterAI** | 0 | 10 | 无 | Desktop Cowork、Computer Use、Expert Plaza、Artifacts、Windows Open With | **中高活跃，产品化推进明显** |
| **NanoClaw** | 0 | 5 | 无 | OneCLI 兼容、Feishu 卡片、审批线程、测试隔离 | **中等活跃，维护型健康** |
| **Moltis** | 1 | 2 | 无 | spawn 权限、chat/sub-agent 一致性、channel-bound session 安全 | **低到中活跃，安全议题重要** |
| **PicoClaw** | 2 | 0 | 无 | Telegram MarkdownV2、Plazmi MCP/CLI 示例 | **低活跃，需维护者回应** |
| **IronClaw** | 2 | 0 | 无 | hosted-MCP 扩展、benchmark failure taxonomy | **低活跃，质量监控持续** |
| **NullClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **ZeptoClaw** | 0 | 0 | 无 | 无活动 | **静默** |

---

## 3. OpenClaw 在生态中的定位

### 3.1 定位概括

OpenClaw 当前是本批项目中最接近“本地长期运行个人 AI 基础设施”的代表项目之一。它不仅关注聊天、工具调用或 UI，而是围绕 **Gateway、状态目录、更新恢复、session recovery、provider 认证、多 Agent 长驻运行** 构建完整运行时。

与 NanoBot、PicoClaw 等偏轻量助手/工具壳层项目相比，OpenClaw 的工程复杂度明显更高；与 Hermes Agent、ZeroClaw、CoPaw 相比，它在 **Gateway 生命周期、update 机制和本地状态所有权** 方面暴露的问题更多，也说明其承担了更重的系统服务角色。

### 3.2 相对优势

| 维度 | OpenClaw 表现 |
|---|---|
| **工程活跃度** | 35 Issues / 56 PR，位居第一梯队 |
| **版本节奏** | 今日唯一发布 beta：v2026.10.5-beta.2 |
| **核心基础设施能力** | Gateway、update/recovery、state ownership、session recovery、provider auth 均有系统性投入 |
| **长期运行场景覆盖** | 明确面向 macOS sleep、WSL2/systemd、Windows update、large agent fleets 等真实部署环境 |
| **社区反馈密度** | P0/P1 问题多，说明用户使用深度较高且覆盖多平台 |

### 3.3 主要短板

OpenClaw 的短板也与其定位直接相关：  
- **稳定性风险偏高**：Gateway crash-loop、sleep/clock drift、state owner heartbeat、dead-PID ownership 等问题集中出现。  
- **升级链路复杂**：`retired-state-format`、`update-executor-settlement`、`package-swap`、Windows symlink/path 问题说明 update/recovery 仍是最大压力区。  
- **beta 渠道风险大**：虽然响应快，但 P0/P1 未完全清零前，不适合无备份生产滚动升级。

### 3.4 与同类项目对比

| 对比对象 | OpenClaw 差异 |
|---|---|
| **Hermes Agent** | Hermes 更强在多平台 connector、Kanban 工作流、Desktop 任务编排；OpenClaw 更聚焦 Gateway/update/state 基础设施可靠性 |
| **ZeroClaw** | ZeroClaw 更突出成本治理、prompt cache、runtime 安全文档化；OpenClaw 更突出本地 Gateway 生命周期和更新恢复 |
| **CoPaw/QwenPaw** | CoPaw 强在 Console、Creator、provider 扩展和 channels 插件化；OpenClaw 更像底层个人 AI 服务运行时 |
| **NanoBot** | NanoBot 更偏 WebUI、文档技能、轻量可用性；OpenClaw 工程栈更重，系统服务属性更强 |
| **LobsterAI** | LobsterAI 偏桌面产品化、Computer Use、Expert Plaza；OpenClaw 偏底层自治运行与状态管理 |

---

## 4. 共同关注的技术方向

### 4.1 Gateway / daemon / runtime 生命周期可靠性

涉及项目：**OpenClaw、Hermes Agent、CoPaw、ZeroClaw、LobsterAI、NanoClaw**

| 项目 | 具体诉求 |
|---|---|
| OpenClaw | sleep/唤醒、wall clock 回拨、dead PID state owner、Gateway startup load、update rollback |
| Hermes Agent | Desktop reconnect、Gateway queued completion、Windows `/update` prompt、redelivery ledger |
| CoPaw | Hub restart 后 Local runtimes 未恢复、Creator stale PID 启动崩溃 |
| ZeroClaw | runtime prompt cache、remote ZeroCode pairing、runtime holding-crate 例外治理 |
| LobsterAI | Computer Use MCP bridge 在 stdio 关闭后退出，避免孤儿进程 |
| NanoClaw | Feishu 卡片生命周期、OneCLI/gateway pin 兼容 |

**结论：** Agent 项目正在从短进程工具转向长期运行服务，生命周期管理成为基础能力。

---

### 4.2 更新、迁移与恢复链路

涉及项目：**OpenClaw、Hermes Agent、NanoClaw、CoPaw**

| 项目 | 具体问题 |
|---|---|
| OpenClaw | update failure、旧状态格式迁移、handoff lease、package swap、Windows git-source staging |
| Hermes Agent | Windows `/update` autostash prompt 不可达、Electron unpacked tree 完整性 |
| NanoClaw | OneCLI 1.43+ secrets API 变更，改用 agent grants API |
| CoPaw | Hub/runtime desired state 恢复、项目删除前释放日志句柄 |

**结论：** “自动更新 + 状态迁移 + 回滚”已成为个人 AI 助手能否生产化的核心门槛。

---

### 4.3 MCP 与外部工具生态

涉及项目：**NanoBot、PicoClaw、IronClaw、ZeroClaw、CoPaw、LobsterAI、Hermes Agent**

| 项目 | 具体方向 |
|---|---|
| NanoBot | 受限 MCP tools 示例，Plazmi world catch-up |
| PicoClaw | Plazmi MCP/CLI 持久 Agent 示例 |
| IronClaw | hosted-MCP Plazmi extension，声明式 auth/egress |
| ZeroClaw | per-agent MCP grants、deferred tool loading、远程 HTTP MCP 示例 |
| CoPaw | channels 插件化、web_search provider、Firecrawl/Tavily |
| LobsterAI | Computer Use MCP bridge 生命周期与 runtime 分发 |
| Hermes Agent | ACP HTTP MCP capability、VirusTotal hosted MCP catalog |

**结论：** MCP 正在成为开源 Agent 生态的事实工具接入层，但安全授权、声明式配置和示例化 onboarding 仍待成熟。

---

### 4.4 权限、安全与访问控制

涉及项目：**OpenClaw、Hermes Agent、Moltis、ZeroClaw、CoPaw、NanoClaw、NanoBot**

| 项目 | 安全议题 |
|---|---|
| OpenClaw | SDK credential mutation publication、agent-initiated Gateway restart/update 需安全审查 |
| Hermes Agent | Slack bot 不应执行 Gateway 控制命令、delegate_task 输出脱敏 |
| Moltis | channel-bound session 可能绕过 chat access policy |
| ZeroClaw | SOP external approval tool authority、pairing token、mTLS bearer |
| CoPaw | 工具审批 timeout race、protected execution prompt i18n |
| NanoClaw | 审批卡片线程投递正确性 |
| NanoBot | WebUI bang command shell 执行需安全审查 |

**结论：** Agent 从“辅助工具”升级为“可执行主体”后，权限模型必须覆盖工具、频道、会话、子 Agent、审批和外部连接器。

---

### 4.5 成本、上下文和 prompt cache 管理

涉及项目：**ZeroClaw、CoPaw、OpenClaw、Hermes Agent**

| 项目 | 具体诉求 |
|---|---|
| ZeroClaw | personality 文件每轮重读、日期进入 system prompt、deferred MCP tool 激活破坏 cache |
| CoPaw | Scroll 上下文压缩、active results 回收、长轮次恢复 |
| OpenClaw | Code Mode tool catalog 变化导致 prompt cache 失效，large agent fleets 启动性能 |
| Hermes Agent | message version provenance across compaction、Telegram observe image turns 上下文膨胀 |

**结论：** 长会话成本已成为真实用户关注点。prompt 前缀稳定性、压缩语义和工具声明策略会直接影响成本与质量。

---

### 4.6 多端 UI、Desktop 与 WebUI 体验

涉及项目：**LobsterAI、NanoBot、Hermes Agent、CoPaw、OpenClaw、ZeroClaw**

| 项目 | 体验方向 |
|---|---|
| LobsterAI | Expert Plaza、Desktop Companion Composer、Open With、会话标题生成 |
| NanoBot | WebUI gallery、bang commands、权限切换、chat rows reload |
| Hermes Agent | Desktop approval replay、billing UI、Kanban completion prompt |
| CoPaw | Console deep links、多端消息首帧回显 |
| OpenClaw | Control UI 历史可见性、reload 后 transcript 空白 |
| ZeroClaw | ZeroCode Cost tab、按键污染 transcript、成本 warning |

**结论：** 桌面/WebUI 正从“聊天界面”演进为 Agent 操作台，必须承载权限、成本、任务状态和工具执行反馈。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构特征 | 当前阶段 |
|---|---|---|---|---|
| **OpenClaw** | 本地 Gateway、长期运行、更新恢复、多 Agent 状态管理 | 重度个人 AI 助手用户、自主管理 Agent 部署者 | 本地服务化 Gateway + 状态所有权 + update executor | 快速修复核心稳定性 |
| **Hermes Agent** | Desktop/Gateway、多平台消息、Kanban 自动化、工具编排 | 需要跨 Slack/Telegram/Desktop 协作的高级用户 | Gateway + Desktop + 多 connector + Kanban workflow | 高并发维护与平台兼容修复 |
| **ZeroClaw** | runtime 成本治理、ZeroCode、prompt cache、安全配对 | 成本敏感、远程 CLI、生产化 Agent 用户 | Rust/runtime 治理色彩强，ADR/exception 流程明显 | 质量治理与成本优化 |
| **CoPaw/QwenPaw** | Console、Creator、channels 插件化、provider 扩展 | Web Console、多端用户、工具/模型配置用户 | Hub/runtime + Console + plugin/channel 体系 | 生态扩展与 Windows 稳定性并行 |
| **NanoBot** | WebUI、文档技能、图像工具、文档解析 | 轻量助手、文档问答、WebUI 用户 | 应用 runtime 组装工具，强调 UI 工程化 | 健康迭代，偏产品易用性 |
| **LobsterAI** | 桌面 Cowork、Computer Use、Expert Plaza、Artifacts | 桌面 AI 助手用户、文件/图形/系统工作流用户 | Electron/Desktop + MCP bridge + runtime kits | 产品化与桌面入口扩展 |
| **NanoClaw** | 企业 IM 集成、安装兼容、审批流、Feishu | 企业协作平台用户、技能部署者 | OneCLI/gateway 依赖，多 channel 集成 | 维护型稳定性改进 |
| **Moltis** | 多 Agent preset、spawn 权限、channel-bound session | 多 Agent 编排和团队频道用户 | preset-driven agent orchestration | 安全边界补强期 |
| **PicoClaw** | Telegram、MCP/CLI 示例、轻量持久 Agent | Telegram bot 用户、轻量 agent 实验者 | 较轻量 CLI/MCP/channel 结合 | 低活跃需求收集期 |
| **IronClaw** | hosted-MCP extension、benchmark 质量分析 | 扩展开发者、模型评估用户 | Reborn 扩展机制 + failure taxonomy | 质量监控与扩展讨论期 |

---

## 6. 社区热度与成熟度

### 6.1 第一梯队：高活跃、快速迭代、稳定性压力较大

项目：**OpenClaw、Hermes Agent、ZeroClaw、CoPaw/QwenPaw**

特征：  
- 单日 Issue/PR 更新量高。  
- 多个 P0/P1/P2 级问题有对应 PR。  
- 用户反馈来自真实部署：Windows、macOS、WSL2、Slack、Telegram、Desktop、Hub、Gateway。  
- 技术债集中在生命周期、恢复、权限、跨平台兼容。

判断：  
这类项目已进入“生产化试炼场”。开发者采用时应关注 release channel、迁移说明、备份策略和安全配置。

---

### 6.2 第二梯队：中高活跃、功能产品化明显

项目：**NanoBot、LobsterAI、NanoClaw**

特征：  
- PR 更新稳定，Issue 相对少。  
- 更偏向产品体验、WebUI/Desktop、渠道集成和 provider 正确性。  
- 风险相对可控，但外部依赖和平台兼容仍是重点。

判断：  
这类项目适合关注具体能力落地，例如桌面工作流、文档解析、IM 入口、WebUI 操作台。

---

### 6.3 第三梯队：低活跃但议题有代表性

项目：**Moltis、PicoClaw、IronClaw**

特征：  
- Issue 少，PR 少或无。  
- 议题集中在安全边界、MCP 示例、扩展机制、模型质量评估。  
- 维护者响应速度仍需观察。

判断：  
适合作为技术趋势观察对象，尤其是 MCP 扩展示例、频道投递权限和 benchmark failure taxonomy。

---

### 6.4 静默项目

项目：**NullClaw、TinyClaw、ZeptoClaw**

过去 24 小时无活动，暂无法判断技术进展。若用于技术选型，应进一步查看更长周期活跃度、release 历史和维护者响应。

---

## 7. 值得关注的趋势信号

### 7.1 Agent runtime 正在系统服务化

OpenClaw、Hermes、CoPaw、ZeroClaw 的问题都表明，Agent 不再只是一次性 CLI，而是长期运行的本地/远程服务。  
开发者需要为自己的 Agent 系统设计：

- crash recovery；
- sleep/wake handling；
- monotonic clock；
- state ownership；
- update rollback；
- runtime desired state 恢复；
- orphan process cleanup。

**参考价值：** 如果你的 Agent 要长期在线，生命周期管理应被视为核心架构，而不是运维细节。

---

### 7.2 MCP 生态进入“安全示例化”阶段

多个项目都出现 Plazmi、VirusTotal、hosted-MCP、restricted MCP tools、per-agent grants 等议题。  
这说明社区不再满足于“能接 MCP server”，而是需要：

- 最小权限工具暴露；
- 声明式 auth；
- egress policy；
- hosted MCP catalog；
- per-agent grants；
- 可运行示例。

**参考价值：** Agent 开发者应尽早设计工具授权边界，避免把所有工具无差别暴露给模型。

---

### 7.3 成本治理从后台统计走向实时 UX

ZeroClaw 的 cost warning、UTC 统计，OpenClaw/ZeroClaw 的 prompt cache 议题，CoPaw 的上下文回收，都说明成本已成为真实用户决策因素。  
未来 Agent 产品需要提供：

- prompt cache 稳定性；
- 成本预警；
- 按 session / agent / tool 归因；
- 多模态路由释放；
- 压缩前后 provenance。

**参考价值：** 成本可观测性会直接影响用户信任，尤其是长会话、多 Agent 和多模态场景。

---

### 7.4 多 Agent 编排需要权限图，而不是自由 spawn

Moltis 的 `spawn.allow`、Hermes 的 delegate lifecycle、ZeroClaw 的 tool authority、OpenClaw 的 agent-initiated restart/update 都指向同一趋势：  
Agent 间调用必须有明确权限模型。

未来成熟系统可能需要：

- coordinator / worker graph；
- spawn allowlist；
- delegate-only agent；
- per-agent tool grants；
- 子任务生命周期隔离；
- 审批与审计记录。

**参考价值：** 多 Agent 系统的核心不是“能生成更多 Agent”，而是“能治理 Agent 之间的权力关系”。

---

### 7.5 Desktop/WebUI 正成为 Agent 操作系统入口

LobsterAI 的 Expert Plaza、Open With、Desktop Composer，NanoBot 的 gallery/bang commands，Hermes 的 Desktop/Kanban，CoPaw 的 Console deep links 都说明 UI 正在从聊天窗口升级为操作平台。  
关键能力包括：

- Agent 发现与召唤；
- 文件入口；
- shell/tool 执行；
- 成本展示；
- 审批流；
- 多端同步；
- 历史和 transcript 可靠性。

**参考价值：** 对开发者而言，Agent UX 不只是 prompt 设计；操作台的信息架构、权限提示和任务状态反馈同样关键。

---

### 7.6 跨平台兼容仍是开源 Agent 的硬门槛

Windows 文件锁、Node/macOS 12、WSL2 clock drift、macOS sleep、Electron unpacked tree、Telegram MarkdownV2 等问题广泛存在。  
这说明个人 AI 助手面向真实用户时，必须覆盖大量系统差异。

**参考价值：** 若项目目标是桌面/本地 Agent，测试矩阵至少应覆盖 Windows、macOS Intel/ARM、Linux、WSL2、sleep/wake、路径长度、文件锁和系统时间漂移。

---

## 结论

今日生态的核心关键词是：**长期运行、可恢复、可治理、可观测、可扩展**。  
OpenClaw 代表了本地 Agent 基础设施化方向，但当前稳定性压力最大；Hermes、CoPaw 和 ZeroClaw 分别在多平台工作流、Console/插件生态、成本与 runtime 治理上快速推进；NanoBot、LobsterAI 则更偏产品体验和桌面/WebUI 落地。

对技术决策者而言，选型时不应只看功能清单，而应重点评估：  
1. Gateway/runtime 是否能长期稳定运行；  
2. 更新和状态迁移是否可靠；  
3. 工具/MCP/多 Agent 权限是否清晰；  
4. 成本和上下文是否可观测；  
5. 桌面/WebUI 是否具备可信的审批、历史和任务反馈。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报  
**日期：2026-10-13**  
**仓库：HKUDS/nanobot**

## 1. 今日速览

过去 24 小时 NanoBot 维持了较高开发活跃度：共出现 **1 条 Issue 更新**、**10 条 PR 更新**，其中 **3 条 PR 仍待合并**，**7 条 PR 已关闭或合并**。今日没有新版本发布，说明当前主要处于功能迭代、修复与重构阶段，而非正式发版窗口。  
从 PR 内容看，项目重点集中在 **WebUI 能力增强、文档技能、图像工具架构解耦、Provider 稳定性、文档解析修复** 等方向。整体健康度较好：维护者持续推进 P2 优先级任务，同时社区也开始提出围绕 MCP 工具受限访问与示例场景的扩展建议。

---

## 2. 项目进展

今日关闭/合并的 PR 主要推动了 NanoBot 在 **WebUI 可用性、图像生成架构、Provider 测试稳定性、内置文档问答能力** 等方面的改进。

### 已关闭/合并的重要 PR

#### 2.1 内置文档技能：让 NanoBot 能基于本地文档解释自身用法  
- PR：[#6176 feat(skills): explain nanobot usage from bundled documentation](https://github.com/HKUDS/nanobot/pull/6176)  
- 作者：chengyongru  
- 标签：未列出  
- 状态：Closed  

该 PR 引入 `nanobot-document` 内置技能，使用户在询问模型配置、聊天应用连接、错误诊断等问题时，NanoBot 可以按需查找并读取与当前安装版本匹配的文档。  
这项改动对个人 AI 助手类项目非常关键：它降低了用户配置门槛，也减少了“模型幻觉式解释文档”的风险，让助手能够基于真实 bundled documentation 给出回答。

**影响判断：中高。**  
它提升了 NanoBot 的自解释能力和可维护性，有助于新用户上手和老用户排障。

---

#### 2.2 WebUI 权限切换修复：允许从 Default 切回 Full Access  
- PR：[#6175 fix(webui): allow switching Default permissions back to Full Access](https://github.com/HKUDS/nanobot/pull/6175)  
- 作者：chengyongru  
- 标签：bug, documentation, webui, fix, test, priority: p2  
- 状态：Closed  

该 PR 修复了 WebUI 中普通 topic 权限切换的问题。此前用户可以从 Full Access 切换到 Default，但在远程或代理连接下无法切回 Full Access，因为 gateway 会声明 `can_use_full_access=false`，导致 composer toggle 被禁用且 scope update 被拒绝。

**影响判断：高。**  
这是一个直接影响用户操作体验和权限控制的 Bug。对于依赖 WebUI 进行远程 agent 操作的用户来说，该修复能减少误锁权限、无法恢复权限的问题。

---

#### 2.3 图像生成架构重构：从 AgentLoop 中解耦 provider-specific 状态  
- PR：[#6172 refactor(agent): compose image tools in application runtimes](https://github.com/HKUDS/nanobot/pull/6172)  
- 作者：chengyongru  
- 标签：refactor, test, priority: p2  
- 状态：Closed  

该 PR 将图像生成工具从 `AgentLoop` 内部的 provider-specific 参数与缓存状态中剥离出来，改为由应用 runtime 组装 `ImageGenerationTool`，并注册到共享 `ToolRegistry`。  
这意味着图像能力从 agent loop 主流程中进一步模块化，后续接入不同图像 provider、调整配置或支持多 runtime 会更清晰。

**影响判断：中高。**  
这是架构健康度提升型改动，短期用户感知可能不强，但长期有利于可扩展性和维护性。

---

#### 2.4 Codex 图像 API 修复：改用独立 Codex Images API  
- PR：[#6177 fix(image): use standalone Codex Images API](https://github.com/HKUDS/nanobot/pull/6177)  
- 作者：chengyongru  
- 标签：documentation, provider, fix, test, priority: p2  
- 状态：Closed  

此前 Codex 图像生成通过向 `/codex/responses` 发送带 `image_generation` tool 的文本模型请求来完成。该 PR 改为使用官方 `openai/codex` client 支持的独立 Codex Images API：`/codex/images/generations`，并使用 `gpt-image-2`，从 `data[].b64_json` 中解析结果。

**影响判断：高。**  
这属于 provider 接口正确性修复。对于使用 Codex 图像生成的用户，可能直接影响功能可用性和兼容性。

---

#### 2.5 Provider 测试稳定性：分离 EOF 检查与流式时间控制  
- PR：[#6174 test(providers): separate EOF checks from stream timing](https://github.com/HKUDS/nanobot/pull/6174)  
- 作者：chengyongru  
- 标签：provider, test, priority: p2  
- 状态：Closed  

该 PR 针对 CI 中 `test_silent_stream_rejects_eof_without_completion[content-azure]` 的 timeout 问题进行测试修复。原有 fixture 在 300ms idle deadline 下为每个事件加入 50ms 延迟，导致 Linux Python 3.14 coverage job 尚未观察到预期 `connection` error 就超时。

**影响判断：中。**  
该修复提升了测试可靠性，减少 flaky CI 对主分支迭代效率的影响，尤其对多 provider 流式响应逻辑的稳定性有帮助。

---

#### 2.6 WebUI 扩展相关 PR  
- PR：[#6178 Feat/webui extensions](https://github.com/HKUDS/nanobot/pull/6178)  
- 作者：lsd-techno  
- 状态：Closed  
- 摘要：未提供详细描述  

该 PR 标题显示与 WebUI extensions 功能相关，但由于摘要为空，无法从当前数据判断其具体实现内容、关闭原因或是否已合并。

**影响判断：未知。**  
建议维护者在 PR 说明中补充上下文，便于社区理解 WebUI 扩展能力的演进方向。

---

#### 2.7 Open Source Partners 文档更新  
- PR：[#6180 Add Sol AI to Open Source Partners](https://github.com/HKUDS/nanobot/pull/6180)  
- 作者：TheSolai  
- 标签：documentation, priority: p2  
- 状态：Closed  

该 PR 将 Sol AI 加入 Open Source Partners 区域。Sol AI 被描述为一个由 Dross 维护的个人 AI agent 博客，记录真实生产构建、agent workflow 和架构决策。

**影响判断：低到中。**  
主要是生态与社区文档层面的更新，有助于展示 NanoBot 或相关 agent 生态的使用案例与合作伙伴。

---

### 仍待处理的重要 PR

#### 2.8 WebUI 组件图库与展示层重构  
- PR：[#6179 refactor(webui): separate presentation views and expand component gallery](https://github.com/HKUDS/nanobot/pull/6179)  
- 作者：chengyongru  
- 标签：documentation, webui, refactor, feature, test, priority: p2  
- 状态：Open  

该 PR 新增 `bun run gallery`，作为无需 gateway 的 WebUI 组件参考入口。它覆盖了 202 个当前 source modules 中的 159 个，并提供 120 个 live example families。所有 foundation modules 和 18 个 channel registrations 都有示例。

**影响判断：高。**  
这是 WebUI 工程化和设计系统建设的重要一步。若合并，将显著提升前端组件可发现性、复用性和回归测试便利性。

---

#### 2.9 PPTX 表格解析修复：保留空列  
- PR：[#6181 fix(documents): preserve empty PPTX table columns](https://github.com/HKUDS/nanobot/pull/6181)  
- 作者：maxazure  
- 标签：bug, fix, test, priority: p2  
- 状态：Open  

该 PR 修复 PPTX 表格抽取时空单元格被丢弃的问题。例如 `Name / Q1 / Q2` 表中 `Alice / 空 / 100` 会被错误抽取为 `Alice\t100`，导致列错位。该 PR 保留每个 cell 的位置，同时继续跳过整行为空的行，并增加真实 PPTX 回归测试。

**影响判断：高。**  
这是典型的数据抽取正确性问题。对于使用 NanoBot 处理办公文档、报告或表格型知识源的用户，该问题可能导致事实错配，应优先合并。

---

#### 2.10 WebUI bang commands 通过 gateway 执行  
- PR：[#6173 feat(webui): run bang commands through the gateway](https://github.com/HKUDS/nanobot/pull/6173)  
- 作者：chengyongru  
- 标签：documentation, webui, feature, test, priority: p2  
- 状态：Open  

当前 WebUI 会将 `!command` 当作普通聊天发送，而 TUI 和 gateway 已支持直接用户 shell 执行。该 PR 将 `!command` 和 `! command` 路由到现有 gateway handler 和 `ExecTool`，使用选中的 workspace 与配置好的执行策略。

**影响判断：中高。**  
这将提升 WebUI 与 TUI 的能力一致性，但涉及 shell 执行与权限策略，合并前需要特别关注安全边界、用户提示和审计能力。

---

## 3. 社区热点

今日可见的讨论热度整体偏低：提供的数据中 Issue 评论数为 0，PR 评论数未提供或为 undefined，点赞数均为 0。因此，无法识别出明显的“高评论”或“高反应”热点。不过从内容重要性看，以下条目值得关注。

### 3.1 MCP 受限工具示例：Plazmi 世界追赶场景  
- Issue：[#6182 Proposal: optional Plazmi world catch-up example through restricted MCP tools](https://github.com/HKUDS/nanobot/issues/6182)  
- 作者：cairn-agent  
- 状态：Open  
- 评论：0  
- 反应：0  

该提案建议添加一个小型示例：已有 agent 重新访问 Plazmi，一个现实 UTC 时间会在会话间持续流逝的 homemaking world。该示例将通过受限 MCP tools 展示 agent 如何在外部世界状态持续变化的情况下进行“catch-up”。

**背后诉求：**  
用户希望 NanoBot 的 MCP 文档不仅解释配置方法，还能提供更接近真实 agent 场景的安全示例，尤其是：  
- 外部 MCP server 与核心系统分离；  
- 使用 `enabledTools` 限制工具暴露；  
- agent 在跨会话、持续世界状态中的恢复与追踪能力；  
- 通过示例说明如何安全地与外部服务交互。

**热度判断：潜在热点。**  
虽然目前没有评论和反应，但该议题与 MCP、安全工具授权、持续环境交互相关，可能对后续文档和示例路线有价值。

---

### 3.2 WebUI 组件图库与 gallery 体系  
- PR：[#6179 refactor(webui): separate presentation views and expand component gallery](https://github.com/HKUDS/nanobot/pull/6179)  
- 状态：Open  

该 PR 虽然没有可见评论数据，但规模较大，覆盖 159/202 个 source modules，并涉及 WebUI 组件展示、搜索、导航、示例覆盖等能力。  
这类改动通常会影响前端开发体验、设计一致性和后续扩展成本，建议维护者重点 review。

---

### 3.3 WebUI shell bang command 支持  
- PR：[#6173 feat(webui): run bang commands through the gateway](https://github.com/HKUDS/nanobot/pull/6173)  
- 状态：Open  

该 PR 涉及 WebUI 直接触发 shell 执行能力。它满足了 WebUI 与 TUI 功能一致性的诉求，但也引入权限、安全和执行策略层面的敏感点。  
即使当前没有显示评论，也建议作为安全相关变更重点审查。

---

## 4. Bug 与稳定性

按影响范围和严重程度排序如下。

### 高优先级

#### 4.1 PPTX 表格空列丢失导致列错位  
- Fix PR：[#6181 fix(documents): preserve empty PPTX table columns](https://github.com/HKUDS/nanobot/pull/6181)  
- 状态：Open  
- 类型：Bug / 文档解析 / 测试  

**问题描述：**  
PPTX 表格抽取时会在 join row 前丢弃空 cell，导致后续值左移。例如 `Alice / 空 / 100` 被错误解析为 `Alice\t100`。

**影响：**  
这会造成文档理解中的结构化数据错位，尤其影响财务、季度指标、表格型报告等场景。Agent 可能基于错误列关系生成错误结论。

**修复状态：**  
已有 fix PR，建议优先 review 并合并。

---

#### 4.2 WebUI 权限无法从 Default 切回 Full Access  
- Fix PR：[#6175 fix(webui): allow switching Default permissions back to Full Access](https://github.com/HKUDS/nanobot/pull/6175)  
- 状态：Closed  
- 类型：Bug / WebUI / 权限  

**问题描述：**  
远程或代理连接下，gateway 将 `can_use_full_access` 标记为 false，导致用户无法从 Default permissions 切回 Full Access。

**影响：**  
影响用户对 agent 权限的恢复与控制，可能造成 WebUI 会话操作受限。

**修复状态：**  
已关闭/合并，问题应已在主线中得到处理。

---

#### 4.3 Codex 图像生成接口路径不正确  
- Fix PR：[#6177 fix(image): use standalone Codex Images API](https://github.com/HKUDS/nanobot/pull/6177)  
- 状态：Closed  
- 类型：Provider / 图像生成 / API 兼容性  

**问题描述：**  
此前使用 `/codex/responses` 和 `image_generation` tool 方式请求图像生成，而不是独立 Codex Images API。

**影响：**  
可能导致 Codex 图像生成不可用、行为不一致或与官方 client 不兼容。

**修复状态：**  
已关闭/合并，改用 `/codex/images/generations` 与 `gpt-image-2`。

---

### 中优先级

#### 4.4 Provider 流式测试在 Python 3.14 coverage job 中 timeout  
- Fix PR：[#6174 test(providers): separate EOF checks from stream timing](https://github.com/HKUDS/nanobot/pull/6174)  
- 状态：Closed  
- 类型：测试稳定性 / Provider  

**问题描述：**  
CI 中 `test_silent_stream_rejects_eof_without_completion[content-azure]` 在 Linux Python 3.14 coverage job 下 timeout。

**影响：**  
主要影响 CI 稳定性和开发效率，不一定直接影响用户运行时行为。

**修复状态：**  
已关闭/合并，测试逻辑已调整。

---

## 5. 功能请求与路线图信号

### 5.1 MCP 受限工具与持续世界示例  
- Issue：[#6182 Proposal: optional Plazmi world catch-up example through restricted MCP tools](https://github.com/HKUDS/nanobot/issues/6182)  
- 状态：Open  

该 Issue 是今日唯一新增/活跃 Issue，提出为 MCP 配置指南补充一个可选示例。该示例围绕 Plazmi 这类真实时间持续流逝的外部世界，展示 agent 如何通过受限 MCP tools 进行状态追赶。

**路线图信号：**  
NanoBot 社区对 MCP 的关注正在从“如何配置”转向“如何安全地构建真实场景示例”。这可能推动后续文档增加：  
- MCP 外部 server 示例；  
- `enabledTools` 最小权限配置；  
- agent 跨会话恢复上下文的实践；  
- 外部世界状态同步示例；  
- 工具权限边界说明。

**纳入下一版本可能性：中。**  
该提案属于文档/示例型贡献，风险较低。如果维护者认可示例价值，较容易以 docs/example 的形式进入后续版本。

---

### 5.2 WebUI 组件图库与组件覆盖率提升  
- PR：[#6179 refactor(webui): separate presentation views and expand component gallery](https://github.com/HKUDS/nanobot/pull/6179)  
- 状态：Open  

该 PR 显示项目正在强化 WebUI 的工程化基础设施。`bun run gallery` 作为 gateway-free 的组件参考入口，有利于独立开发、视觉回归和组件复用。

**路线图信号：**  
NanoBot WebUI 可能正从功能堆叠阶段进入更系统的组件体系建设阶段。

**纳入下一版本可能性：高。**  
PR 已打开且内容完整，带有测试和文档标签，若 review 通过，很可能成为下一批 WebUI 改进的一部分。

---

### 5.3 WebUI 执行 bang commands  
- PR：[#6173 feat(webui): run bang commands through the gateway](https://github.com/HKUDS/nanobot/pull/6173)  
- 状态：Open  

该功能将 WebUI 中的 `!command` 与 TUI/gateway 的 shell 执行能力对齐。

**路线图信号：**  
NanoBot 正在推动多端体验一致性，让 WebUI 不只是聊天界面，也能承载更完整的 agent 操作入口。

**纳入下一版本可能性：中。**  
功能价值明确，但涉及 shell 执行安全，可能需要更严格 review。

---

### 5.4 内置文档问答技能  
- PR：[#6176 feat(skills): explain nanobot usage from bundled documentation](https://github.com/HKUDS/nanobot/pull/6176)  
- 状态：Closed  

该功能表明 NanoBot 正在增强“自助式使用指导”能力。未来用户可能可以直接询问 NanoBot 如何配置模型、连接应用、诊断错误，而无需手动翻阅文档。

**路线图信号：**  
项目可能继续强化 documentation-aware agent 能力，让助手更像“产品内专家”。

---

## 6. 用户反馈摘要

今日只有 1 条 Issue，且评论数为 0，因此可提炼的直接用户反馈有限。基于 Issue 和 PR 摘要，主要痛点与使用场景如下。

### 6.1 用户希望看到更真实的 MCP 使用示例  
- 来源：[#6182](https://github.com/HKUDS/nanobot/issues/6182)  

用户认可当前 MCP 配置指南已经区分 external server 与 core，并推荐 `enabledTools`，但希望进一步看到一个完整、真实、受限工具访问的示例。  
这反映出用户在 MCP 实践中的核心问题不是“有没有配置项”，而是“如何安全地组合工具、server 和 agent 行为”。

---

### 6.2 文档解析用户依赖结构化准确性  
- 来源：[#6181](https://github.com/HKUDS/nanobot/pull/6181)  

PPTX 表格空列丢失问题说明，用户或开发者正在将 NanoBot 用于文档理解、表格抽取、报告解析等场景。  
该场景下，单元格位置比纯文本内容更重要。一旦列错位，agent 生成的解释、总结或后续操作都会被污染。

---

### 6.3 WebUI 用户需要可靠的权限控制与功能一致性  
- 来源：[#6175](https://github.com/HKUDS/nanobot/pull/6175)、[#6173](https://github.com/HKUDS/nanobot/pull/6173)  

WebUI 权限切换修复和 bang command 支持都表明用户正在把 WebUI 作为主要操作入口，而不仅是辅助界面。  
用户期待 WebUI 拥有与 TUI/gateway 一致的能力，同时权限切换不能因远程或代理部署而失效。

---

### 6.4 开发者关注 WebUI 可维护性和组件可视化  
- 来源：[#6179](https://github.com/HKUDS/nanobot/pull/6179)  

组件 gallery 的建设说明项目维护者或贡献者需要更好的 WebUI 组件发现、预览和复用机制。  
这类需求通常来自项目规模扩大后的维护压力：组件数量增加后，如果没有 gallery 和示例，修改成本和回归风险都会上升。

---

## 7. 待处理积压

基于当前提供的数据，仅覆盖过去 24 小时活动，无法可靠识别“长期未响应”的 Issue 或 PR。不过以下开放项建议维护者优先关注。

### 7.1 优先 review：PPTX 表格空列修复  
- PR：[#6181 fix(documents): preserve empty PPTX table columns](https://github.com/HKUDS/nanobot/pull/6181)  
- 原因：影响文档抽取正确性，且已有明确修复与回归测试。  
- 建议：优先合并，避免结构化文档理解继续产生列错位。

---

### 7.2 安全审查：WebUI bang command 执行  
- PR：[#6173 feat(webui): run bang commands through the gateway](https://github.com/HKUDS/nanobot/pull/6173)  
- 原因：涉及 shell command 执行，需要确保 workspace、execution policy、权限提示和审计路径清晰。  
- 建议：在合并前重点检查默认安全策略、远程访问场景和误触发风险。

---

### 7.3 大型 WebUI 重构 review  
- PR：[#6179 refactor(webui): separate presentation views and expand component gallery](https://github.com/HKUDS/nanobot/pull/6179)  
- 原因：涉及 WebUI presentation views、component gallery、模块覆盖和 live examples，改动面可能较大。  
- 建议：重点检查组件导出边界、gallery 与生产代码的隔离、测试覆盖和后续维护成本。

---

### 7.4 新增 MCP 示例提案待回应  
- Issue：[#6182 Proposal: optional Plazmi world catch-up example through restricted MCP tools](https://github.com/HKUDS/nanobot/issues/6182)  
- 原因：社区贡献者提出可贡献示例，目前无评论。  
- 建议：维护者可先回应是否欢迎该方向，并明确示例应满足的安全、文档和维护标准。

---

## 项目健康度结论

NanoBot 今日表现出 **较强的维护活跃度和工程推进节奏**。虽然没有新版本发布，但 10 条 PR 更新覆盖了功能、修复、测试、文档和架构重构多个方面，说明项目仍处于快速迭代期。  
短期内最值得关注的是 **PPTX 文档解析正确性修复、WebUI bang command 安全审查、WebUI gallery 大型重构**。社区侧目前讨论热度不高，但 MCP 示例提案显示用户正在探索更真实、更安全的 agent 外部工具使用场景，这可能成为后续文档与示例体系的重要方向。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
日期：2026-10-13  
仓库：NousResearch/hermes-agent

---

## 1. 今日速览

过去 24 小时 Hermes Agent 活跃度非常高：Issues 更新 50 条，其中 45 条仍处于打开或活跃状态；PR 更新 50 条，其中 48 条仍待合并。今日没有新版本发布，但问题报告和修复 PR 呈现明显的“高并发维护”状态，尤其集中在 Desktop、Gateway、多平台消息投递、Kanban/cron 工作流、工具调用和会话状态管理等模块。

从健康度看，项目社区反馈密集，维护者或贡献者响应速度较快，多个新 Issue 已经出现对应修复 PR；但同时也暴露出较大的稳定性压力：Windows 更新流程、Slack/Telegram/QQBot 投递、Desktop 会话恢复、Kanban 自动化任务、工具桥接等核心路径均有 P2 级问题。整体判断：项目处于快速迭代和密集修复阶段，活跃度高，但短期回归风险和 PR 积压压力也较高。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日 PR 更新 50 条，其中 2 条已合并或关闭，48 条仍待合并。由于数据中未明确标注“已合并”的 PR，仅可确认以下关闭项和重要修复推进。

### 已关闭 / 已处理的重要 PR

#### PR #137625：修复 vLLM 输出 token 上限错误解析  
链接：https://github.com/NousResearch/hermes-agent/pull/137625  
状态：Closed  
相关领域：Agent、上下文压缩、模型输出控制  
摘要：该 PR 针对 vLLM 在 `max_tokens` 超过 `max_model_len=max_total_tokens` 时返回的新错误格式进行解析适配。此前 Hermes 无法识别该类输出上限错误，可能误判为普通失败或无法自动调整输出 token。  
影响：提升对 vLLM 后端的兼容性，有助于减少大上下文或高输出预算场景下的失败率。

---

### 今日出现明确修复路径的重点进展

#### PR #137641：Desktop 重连后延迟 approval replay，避免会话未 rebind 时请求失败  
链接：https://github.com/NousResearch/hermes-agent/pull/137641  
关联 Issue：https://github.com/NousResearch/hermes-agent/issues/137640  
影响模块：Desktop、Sessions、Approval  
推进意义：修复 Desktop WebSocket 断线恢复后，在 `session.resume` 完成前就请求 `approval.pending` 导致 4001 错误的问题。该修复直接改善长时间断线后的会话连续性。

#### PR #137643 / PR #137642：修复 `tool_call` 调用直接列出的工具时被拒绝  
链接：  
- https://github.com/NousResearch/hermes-agent/pull/137643  
- https://github.com/NousResearch/hermes-agent/pull/137642  
关联 Issue：https://github.com/NousResearch/hermes-agent/issues/137639  
影响模块：Agent、Tools  
推进意义：当前模型通过 `tool_call` 调用本会话已直接暴露的工具会被拒绝，造成每次命中浪费一次模型迭代。两个 PR 给出不同修复思路：一个返回可重发的直接调用形状，另一个直接分派调用。该问题与工具调用效率和模型自动纠错成本密切相关。

#### PR #137638：修复 Windows `/update` 网关更新提示超时  
链接：https://github.com/NousResearch/hermes-agent/pull/137638  
关联 Issue：https://github.com/NousResearch/hermes-agent/issues/137635  
影响模块：CLI、Gateway、Windows 更新  
推进意义：解决 Windows 下聊天内 `/update` 遇到 autostash restore prompt 时，提示无法抵达用户但仍等待 300 秒的问题。该修复可显著降低 Windows 用户更新流程卡死体验。

#### PR #137637：限制 Slack bot 触发 Gateway 控制命令  
链接：https://github.com/NousResearch/hermes-agent/pull/137637  
关联 Issue：https://github.com/NousResearch/hermes-agent/issues/137636  
影响模块：Slack、Gateway、Auth、安全边界  
推进意义：防止 allowlisted peer bot 执行 gateway commands 或 approval 操作，同时允许其继续进行普通对话。该修复对 Slack 集成的安全边界非常重要。

#### PR #137632：Telegram observe mode 图片回合持久化清理  
链接：https://github.com/NousResearch/hermes-agent/pull/137632  
关联 Issue：https://github.com/NousResearch/hermes-agent/issues/137627  
影响模块：Gateway、Telegram、Sessions、Compression  
推进意义：修复 Telegram observe mode 中图片消息持久化时保存包装后的上下文，导致每轮上下文膨胀并阻塞压缩的问题。

#### PR #137630：新增模型可调用 Kanban 工作流工具  
链接：https://github.com/NousResearch/hermes-agent/pull/137630  
关联 Issue：https://github.com/NousResearch/hermes-agent/issues/137622  
影响模块：CLI、Tools、Kanban  
推进意义：将已有 Kanban CLI 操作暴露为模型可调用工具，包括 update、archive、dependency add/remove、notify subscribe，使模型编排任务流更完整。

---

## 4. 社区热点

### 1. ACP 未声明 HTTP MCP 能力，阻塞外部 runtime 集成  
Issue #137500  
链接：https://github.com/NousResearch/hermes-agent/issues/137500  
评论数：3  
标签：`type/bug`, `comp/acp`, `tool/mcp`, `P4`, `duplicate`  
热点诉求：用户希望 `hermes acp` 在 ACP initialize 响应中声明 `mcpCapabilities.http`，使外部 runtime 能够挂载 HTTP MCP server。该问题直接影响 qwen-audio-agent 等外部集成。  
分析：虽然优先级标为 P4 且带 duplicate，但该问题反映 Hermes 在多 Agent / 外部 runtime 互操作方面的协议兼容性诉求正在上升。

### 2. 中断主 Agent 对话会取消所有 delegated subagent 任务  
Issue #137620  
链接：https://github.com/NousResearch/hermes-agent/issues/137620  
评论数：2  
状态：Closed  
标签：`type/bug`, `comp/agent`, `tool/delegate`, `P2`  
热点诉求：用户在主 Agent 和多个子 Agent 并行工作时，希望中断主对话不会误杀已委派的子任务。  
分析：这是典型的多 Agent 编排隔离问题。用户期望主线程交互和后台 delegated tasks 拥有独立生命周期，反映 Hermes 在长期任务和并行代理场景中的需求增强。

### 3. Desktop Kanban 完成卡片失败且无 summary prompt  
Issue #137609  
链接：https://github.com/NousResearch/hermes-agent/issues/137609  
评论数：2  
状态：Closed  
标签：`comp/plugins`, `comp/desktop`, `P3`  
热点诉求：用户拖拽卡片到 Done 或通过菜单完成时，后端要求 completion evidence，但前端没有提示填写 summary，导致完成操作被阻断。  
分析：这是产品交互与后端校验不一致的问题。Kanban 已成为 Hermes 的重要工作流入口，完成路径必须提供可解释、可审计的证据采集机制。

### 4. Slack 官方 connector 搜索缺少 `search:read` scope  
Issue #137588  
链接：https://github.com/NousResearch/hermes-agent/issues/137588  
评论数：2  
状态：Open  
标签：`platform/slack`, `comp/portal`, `P2`  
热点诉求：用户使用官方 Slack connector 时，workspace-wide message search 因缺少 `search:read` scope 失败。  
分析：这属于连接器权限配置与用户预期不一致的问题。对于企业或团队知识检索场景，Slack 搜索能力是核心功能，P2 优先级合理。

### 5. Billing Plans 在 Free plan 下错误显示 Downgrade  
Issue #137544  
链接：https://github.com/NousResearch/hermes-agent/issues/137544  
评论数：2  
状态：Open  
标签：`comp/desktop`, `area/billing`, `P2`  
热点诉求：Free 用户查看 Plus/Super 计划时按钮显示为 Downgrade，而不是 Upgrade/Choose。  
分析：该问题不仅是 UI 文案错误，还可能引导错误计费流程，影响付费转化和用户信任。

---

## 5. Bug 与稳定性

以下按影响程度和优先级整理。

### 高优先级 / P2 / 安全与会话一致性

#### Slack bot 可执行 Gateway 控制或审批命令  
Issue：https://github.com/NousResearch/hermes-agent/issues/137636  
修复 PR：https://github.com/NousResearch/hermes-agent/pull/137637  
状态：Issue Closed，PR Open  
影响：安全边界、Slack 集成、审批控制  
说明：allowlisted peer bot 可能触发 gateway commands 或 approval prompts。已有 PR 将 bot sender 映射为 `allow_gateway_control=False`。这是今日最重要的安全修复之一。

#### Desktop 重连后在 session rebind 前查询 pending approvals  
Issue：https://github.com/NousResearch/hermes-agent/issues/137640  
修复 PR：https://github.com/NousResearch/hermes-agent/pull/137641  
状态：Issue Open，PR Open  
影响：Desktop 会话恢复、审批状态  
说明：WebSocket 断线较久后，backend 可能回收 runtime，Desktop 过早请求 `approval.pending` 导致 4001。已有修复延迟 approval replay。

#### Telegram observe mode 图片消息持久化包装上下文，导致上下文膨胀  
Issue：https://github.com/NousResearch/hermes-agent/issues/137627  
修复 PR：https://github.com/NousResearch/hermes-agent/pull/137632  
状态：Issue Open，PR Open  
影响：Telegram、会话持久化、上下文压缩  
说明：图片回合保存了 observe wrapper，使上下文每轮翻倍并阻塞 compaction。对长期群聊观察模式影响较大。

#### Windows `/update` autostash prompt 不可达且等待 300 秒  
Issue：https://github.com/NousResearch/hermes-agent/issues/137635  
修复 PR：https://github.com/NousResearch/hermes-agent/pull/137638  
状态：Issue Open，PR Open  
影响：Windows、CLI、Gateway 更新流程  
说明：Windows 上更新流程暂停 gateway 后，restore prompt 无法通过聊天抵达用户，导致完整超时等待。已有 PR 改为立即采用默认行为并保留 autostash。

#### QQBot 重启后 redelivery 丢失群聊类型，误走 C2C endpoint  
Issue：https://github.com/NousResearch/hermes-agent/issues/137605  
状态：Open  
影响：QQBot、消息投递、重启恢复  
说明：重启后的重投递缺失 group chat type，导致群聊 obligation 发送到 `/v2/users` C2C endpoint。尚未在数据中看到对应 PR。

#### Gateway queued background completions 缺少 drain 时 consumption recheck  
Issue：https://github.com/NousResearch/hermes-agent/issues/137606  
状态：Open  
影响：Gateway、后台任务、会话状态、消息投递  
说明：已排队的后台 completion 可能重新唤醒已经回答的 turn，存在重复响应或状态错乱风险。

#### delegate_task 子 Agent 输出未做 secret redaction  
Issue：https://github.com/NousResearch/hermes-agent/issues/137594  
状态：Open  
影响：Delegation、Memory、Hooks、安全  
说明：子 Agent 的最终回答、错误、tool trace、process output 可能进入父模型、异步队列、memory hook 和 spill file，缺少秘密脱敏。该问题具有明显安全与隐私风险。

---

### 中高优先级 / P2 / 工具调用与平台兼容

#### `tool_call` 调用直接列出的工具被拒绝，浪费模型迭代  
Issue：https://github.com/NousResearch/hermes-agent/issues/137639  
修复 PR：  
- https://github.com/NousResearch/hermes-agent/pull/137643  
- https://github.com/NousResearch/hermes-agent/pull/137642  
状态：Issue Open，PR Open  
影响：Tools、Agent 执行效率  
说明：模型通过 `tool_call` 命名当前 session 已直接暴露的工具时被拒绝，需要再试一次。已有两个修复方案，维护者需统一策略，避免重复实现。

#### macOS 12 Monterey 无法安装 pinned Node，Node 相关功能不可用  
Issue：https://github.com/NousResearch/hermes-agent/issues/137512  
状态：Open  
影响：macOS 12、CLI、TUI、Dashboard、PTY、linters  
说明：固定版本 Node 在 macOS 12 上因 dyld libc++ symbol 问题无法运行，导致多个 Node-dependent 功能不可用。该问题对老系统用户影响较大。

#### Slack connector 搜索缺少 `search:read` scope  
Issue：https://github.com/NousResearch/hermes-agent/issues/137588  
状态：Open  
影响：Slack、Portal、搜索功能  
说明：官方 connector 可认证但搜索失败。需要更新 OAuth scopes、文档和可能的重新授权流程。

#### Billing Plans Free 用户看到 paid tier 为 Downgrade  
Issue：https://github.com/NousResearch/hermes-agent/issues/137544  
状态：Open  
影响：Desktop、Billing  
说明：可能影响计费动作和用户信任，建议优先处理。

#### Native Telegram DM topics 缺少 `direct_messages_topic_id`  
Issue：https://github.com/NousResearch/hermes-agent/issues/137568  
状态：Open  
影响：Telegram、Gateway、Plugins  
说明：Telegram 原生 topics DM 下，发送 metadata 只带 `thread_id`，导致 Bot API 报 `message thread not found`。

---

### Kanban / cron / 自动化工作流稳定性

#### Kanban iteration budget 用尽后卡片无可诊断路径  
Issue：https://github.com/NousResearch/hermes-agent/issues/137600  
状态：Open  
影响：Kanban、cron worker  
说明：worker 达到 90/90 iteration limit 后仅给出预算耗尽消息，没有下一步建议或可操作结果。反映自动任务失败后的可诊断性不足。

#### Kanban completion records 无 integration point / session 绑定  
Issue：https://github.com/NousResearch/hermes-agent/issues/137598  
状态：Open  
影响：Kanban、审计、成本归因  
说明：178 张 done cards 中 0 张记录 integration evidence，导致完成状态不可审计，成本无法按卡片归因。

#### Worktree branch 已被 sibling worktree checkout 时任务 setup 失败  
Issue：https://github.com/NousResearch/hermes-agent/issues/137596  
修复 PR：https://github.com/NousResearch/hermes-agent/pull/137617  
状态：Issue Open，PR Open  
影响：Kanban、CLI、worktree 管理  
说明：同名 branch 已在其他 worktree checkout 时，任务 setup 失败。PR #137617 增加占用路径报告和安全下一步提示。

#### Kanban worker rc=0 但未调用 complete/block，导致卡片静默停滞  
Issue：https://github.com/NousResearch/hermes-agent/issues/137597  
状态：Open  
影响：Kanban 自动化协议  
说明：worker 成功退出但未报告结果，卡片状态无变化，需要人工排查。

---

### Desktop / 插件 / 附件体验

#### Desktop 本地 bot relay 在 remote primary 时丢失  
Issue：https://github.com/NousResearch/hermes-agent/issues/137618  
修复 PR：  
- https://github.com/NousResearch/hermes-agent/pull/137626  
- https://github.com/NousResearch/hermes-agent/pull/137624  
状态：Issue Open，PR Open  
影响：Desktop、bot relay、profiles  
说明：remote primary 连接存在时，本机托管的 bots 从 relay peer set 中被排除，导致 roster 可见但不可用。已有两个修复 PR，存在重复实现，需要维护者合并取舍。

#### Desktop 云附件读取可能冻结窗口  
PR：https://github.com/NousResearch/hermes-agent/pull/137616  
状态：Open  
影响：Desktop、附件预览  
说明：恢复含已驱逐云端 PDF 附件的对话时，`PreviewAttachment` mount 阶段同步读取文件元数据，可能冻结整个窗口。

#### Windows Electron unpacked tree 不完整应被拒绝  
PR：https://github.com/NousResearch/hermes-agent/pull/137644  
状态：Open  
影响：Desktop、Windows 打包  
说明：electron-builder copy 过程被 EBUSY 干扰时，可能留下缺少关键资源的 `win-unpacked`。PR 增加不完整 tree 检测。

---

## 6. 功能请求与路线图信号

### 模型可调用 Kanban 工作流工具  
Issue：https://github.com/NousResearch/hermes-agent/issues/137622  
PR：https://github.com/NousResearch/hermes-agent/pull/137630  
状态：Issue Closed，PR Open  
信号：很可能进入近期版本。  
内容：将 Kanban 的 update、archive、dependency_add/remove、notify_subscribe 暴露给模型调用。  
路线图意义：Hermes 正在从“人类 CLI 操作 Kanban”转向“模型直接编排任务流”。

### Kanban `edit` / `comment` 支持 `--body-file`  
Issue：https://github.com/NousResearch/hermes-agent/issues/137599  
状态：Open  
信号：值得纳入 CLI 体验改进。  
内容：当前 `create` 支持 `--body-file`，但 `edit` 和 `comment` 不支持，用户只能用 `--body "$(cat file)"`，存在 shell quoting 和 backticks 执行风险。  
路线图意义：这属于小而高价值的 CLI 安全和可用性增强。

### VirusTotal hosted MCP 加入 optional MCP catalog  
PR：https://github.com/NousResearch/hermes-agent/pull/137631  
状态：Open  
信号：MCP 生态持续扩展。  
内容：通过 `hermes mcp install virustotal` 安装 VirusTotal 官方 hosted MCP，支持 OAuth 登录和威胁报告工具。  
路线图意义：Hermes 正在强化安全分析、威胁情报、外部工具目录化集成能力。

### Message version provenance across compaction  
PR：https://github.com/NousResearch/hermes-agent/pull/137629  
状态：Open  
信号：会话压缩和外部 transcript reader 可靠性增强。  
内容：在消息编辑后再发生 compaction 时，保留 message version provenance，帮助外部读取者区分原始消息、编辑版本和压缩副本。  
路线图意义：表明 Hermes 对长期会话、可审计 transcript、上下文压缩一致性越来越重视。

### Prompt Enhancer 插件升级  
PR：https://github.com/NousResearch/hermes-agent/pull/137634  
状态：Open  
信号：插件目录持续维护。  
内容：将 prompt-enhancer 从 v1.3.0 提升到 v1.6.1，包括 pure-SDK migration、model pin、icon semantics 等。  
路线图意义：插件生态正在同步上游能力，并逐步标准化 SDK 使用方式。

---

## 7. 用户反馈摘要

### 多 Agent 并行任务需要更强的生命周期隔离  
代表 Issue：https://github.com/NousResearch/hermes-agent/issues/137620  
用户场景：主 Agent 与多个 delegated subagents 并行工作，用户中断主对话只是为了纠正当前交流，不希望所有子任务被取消。  
痛点：中断语义过于粗粒度，后台任务缺少隔离和恢复机制。  
产品启示：Hermes 的 delegate/subagent 能力已经进入真实并行工作流使用场景，需要更清晰的任务生命周期模型。

### Desktop 和 Kanban 的交互闭环仍有断点  
代表 Issues：  
- https://github.com/NousResearch/hermes-agent/issues/137609  
- https://github.com/NousResearch/hermes-agent/issues/137598  
- https://github.com/NousResearch/hermes-agent/issues/137600  
用户场景：用户依赖 Kanban 追踪自动化任务、完成状态、成本和审计信息。  
痛点：完成卡片时没有 summary prompt；done 状态没有 integration/session 证据；budget exhaustion 后没有下一步建议。  
产品启示：Kanban 不只是任务列表，已经承担自动化执行、审计、结果归因和协作闭环功能。

### 多平台消息连接器的可靠性和权限配置是当前核心痛点  
代表 Issues：  
- Slack search scope：https://github.com/NousResearch/hermes-agent/issues/137588  
- Telegram DM topics：https://github.com/NousResearch/hermes-agent/issues/137568  
- Telegram observe image turns：https://github.com/NousResearch/hermes-agent/issues/137627  
- QQBot redelivery：https://github.com/NousResearch/hermes-agent/issues/137605  
用户场景：用户通过 Slack、Telegram、QQBot 等平台接入 Hermes，希望消息搜索、群聊、DM topics、重启恢复都能可靠运行。  
痛点：平台 API 细节差异大，metadata、scope、thread id、redelivery ledger 容易出错。  
产品启示：Gateway 和 platform adapters 是当前稳定性投入重点。

### Windows 和 macOS 旧版本兼容性仍需加强  
代表 Issues：  
- Windows update prompt：https://github.com/NousResearch/hermes-agent/issues/137635  
- macOS 12 Node：https://github.com/NousResearch/hermes-agent/issues/137512  
- Windows breakaway fallback：https://github.com/NousResearch/hermes-agent/issues/137621  
用户场景：用户在 Windows 或 macOS Monterey 上使用 Desktop、Dashboard、TUI、PTY、更新流程。  
痛点：系统差异导致更新卡死、Node 无法运行、子进程管理 fallback 分散。  
产品启示：跨平台兼容层需要集中治理，而不是多个 call sites 各自修补。

### 工具调用体验需要降低模型自我修正成本  
代表 Issue：https://github.com/NousResearch/hermes-agent/issues/137639  
用户场景：模型调用工具时，某些工具已直接暴露，但通过 `tool_call` 入口会被拒绝。  
痛点：虽然错误信息准确，但模型需要额外一轮迭代才能改用直接调用。  
产品启示：Agent 工具层不仅要“正确”，还要对模型友好，减少无效迭代和成本。

---

## 8. 待处理积压

今日积压以“新开高优先级问题 + 多个重复修复 PR”形式为主。维护者需要优先关注以下方向。

### 1. 多个问题已有重复或竞争 PR，需要尽快定稿

#### `tool_call` 直接工具调用修复存在两个方案  
Issue：https://github.com/NousResearch/hermes-agent/issues/137639  
PR：  
- https://github.com/NousResearch/hermes-agent/pull/137643  
- https://github.com/NousResearch/hermes-agent/pull/137642  
建议：尽快决定是“返回可重发 direct call”还是“直接 dispatch”，避免工具调用路径出现行为分叉。

#### Desktop local bot relay 修复存在两个 PR  
Issue：https://github.com/NousResearch/hermes-agent/issues/137618  
PR：  
- https://github.com/NousResearch/hermes-agent/pull/137626  
- https://github.com/NousResearch/hermes-agent/pull/137624  
建议：合并语义相近的修复，避免重复改动 relay route 选择逻辑。

#### Windows CREATE_BREAKAWAY_FROM_JOB fallback 已出现多处重复实现  
Issue：https://github.com/NousResearch/hermes-agent/issues/137621  
状态：Open  
说明：Issue 指出当前已有 6 个开放 PR 重复实现相同 fallback，且 exception filter 不一致。  
建议：将该逻辑收敛到 `_subprocess_compat`，统一 Windows 子进程兼容层。

---

### 2. 高风险安全/隐私问题仍待修复

#### delegate_task 输出未脱敏进入 parent、memory、hooks  
Issue：https://github.com/NousResearch/hermes-agent/issues/137594  
状态：Open  
建议：优先评估 secret redaction 策略，明确哪些通道需要脱敏、哪些需要原始输出、是否引入策略开关。

#### Email Authentication-Results 多 header 支持  
PR：https://github.com/NousResearch/hermes-agent/pull/137633  
状态：Open  
说明：iCloud Mail 使用多个 authserv-id，当前单值配置不足。  
建议：该 PR 与邮件安全边界相关，应尽快 review。

---

### 3. Gateway redelivery / session-state 类问题集中爆发

待关注 Issues：  
- Telegram observe image turns：https://github.com/NousResearch/hermes-agent/issues/137627  
- QQBot redelivery 群聊类型丢失：https://github.com/NousResearch/hermes-agent/issues/137605  
- Delivery ledger reconnect 归因不准确：https://github.com/NousResearch/hermes-agent/issues/137608  
- Partial chunk redelivery 重复可见 head：https://github.com/NousResearch/hermes-agent/issues/137607  
- Queued background completion re-wake answered turn：https://github.com/NousResearch/hermes-agent/issues/137606  

建议：这些问题共同指向 delivery ledger、session state、redelivery marker 和 consumption check 的系统性风险。建议维护者按“投递幂等性”和“会话状态机一致性”建立统一测试矩阵。

---

### 4. Kanban 自动化审计与失败恢复待系统化

待关注 Issues：  
- Budget exhaustion 无诊断路径：https://github.com/NousResearch/hermes-agent/issues/137600  
- Completion records 不绑定 integration/session：https://github.com/NousResearch/hermes-agent/issues/137598  
- Worker rc=0 但不 complete/block：https://github.com/NousResearch/hermes-agent/issues/137597  
- Worktree branch 冲突：https://github.com/NousResearch/hermes-agent/issues/137596  

建议：Kanban 已不仅是 UI 功能，而是自动化执行层。建议引入强制 worker outcome protocol、completion evidence schema、session/cost attribution，并在 worker 失败时生成可操作诊断。

---

## 总体健康度评估

- 活跃度：高。24 小时内 50 条 Issue 更新、50 条 PR 更新，社区和贡献者响应密集。  
- 维护效率：中高。多个 P2 问题在同日已有对应 PR，但重复 PR 较多，说明 triage 和方案收敛压力上升。  
- 稳定性风险：中高。Gateway、Desktop、Windows、Telegram/Slack/QQBot、Kanban 自动化等核心路径均有新问题。  
- 路线图信号：明确。Hermes 正在强化模型可调用工作流、MCP 生态、长期会话压缩、跨平台连接器和自动化任务编排。  
- 今日建议优先级：先合并安全边界和会话状态修复，其次处理 Windows/Desktop 阻塞问题，再统一 Kanban 与 Gateway 的系统性设计。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-10-13）

## 1. 今日速览

过去 24 小时，PicoClaw 项目有 **2 条 Issue 更新**，其中 **2 条为新开/活跃 Issue**，没有 Issue 关闭记录；Pull Request 方面 **无新增、合并或关闭 PR**。整体来看，今日项目活跃度偏低到中等，主要活动集中在 **Bug 报告** 与 **功能/示例提案**，尚未看到对应的代码修复推进。  
社区反馈显示，用户正在关注 PicoClaw 在 **Telegram MarkdownV2 输出稳定性** 以及 **MCP/CLI 持久化 Agent 示例生态** 方面的能力。当前没有新版本发布，也没有合并 PR，说明今日项目更多处于问题收集与需求输入阶段，而非发布或代码交付阶段。

---

## 2. 项目进展

今日没有 Pull Request 更新：

- 新增 PR：0
- 合并 PR：0
- 关闭 PR：0
- 待合并 PR：0

因此，过去 24 小时内项目主线代码层面暂无可见推进。今日的主要进展来自社区侧输入：一个稳定性 Bug 报告，以及一个围绕 MCP/CLI 与持久 Agent 会话的示例提案。

---

## 3. 社区热点

### 3.1 Telegram MarkdownV2 转义问题导致格式回退

- Issue：[#3426 - Telegram MarkdownV2 skips escaping link labels and blockquote text, causing plain-text fallback](https://github.com/sipeed/picoclaw/issues/3426)
- 状态：Open
- 作者：little-twain
- 创建时间：2026-10-12
- 评论数：1
- 反应数：0

该 Issue 是今日唯一带有评论互动的问题，也是当前最明确的稳定性反馈。用户指出，当启用 Telegram MarkdownV2 时，链接标签与引用块文本中的保留字符未被正确转义，可能导致 Telegram 拒绝消息。PicoClaw 随后回退到纯文本输出，造成整个回复失去格式。

背后的核心诉求是：  
- PicoClaw 在 Telegram 渠道输出时应具备更可靠的 MarkdownV2 转义逻辑；
- 不应因为局部 Markdown 转义失败而导致整条消息格式丢失；
- 对链接文本、blockquote 等 Markdown 结构的处理需要更细粒度、更符合 Telegram MarkdownV2 规则。

从影响面看，该问题会直接影响用户在 Telegram 中阅读 AI 回复的体验，尤其是包含链接、引用、特殊字符的长回复。

---

### 3.2 持久化 Agent 会话示例提案：Plazmi MCP/CLI

- Issue：[#3427 - Proposal: low-dependency Plazmi MCP/CLI example for persistent agent sessions](https://github.com/sipeed/picoclaw/issues/3427)
- 状态：Open
- 作者：cairn-agent
- 创建时间：2026-10-13
- 评论数：0
- 反应数：0

该 Issue 是一个功能与生态示例提案。提案方认为 PicoClaw 的 MCP CLI 与 heartbeat 能力适合承载一个小型“持久世界”示例。Plazmi 提供基于真实 UTC 时间运行的 homes、gardens、neighbour interactions，以及面向返回 Agent 的 `pulse` / `digest` 能力。

该提案反映出社区对以下方向的兴趣：  
- 使用 PicoClaw 构建长期运行的 Agent 会话；
- 通过 MCP/CLI 接入外部世界状态或模拟环境；
- 为开发者提供低依赖、易运行的参考示例；
- 展示 Agent 在多次会话之间保持状态、接收摘要和继续行动的能力。

目前该提案尚无维护者回应，也没有配套 PR，因此仍处于早期讨论阶段。

---

## 4. Bug 与稳定性

### 高优先级：Telegram MarkdownV2 转义不完整导致格式化消息回退

- Issue：[#3426](https://github.com/sipeed/picoclaw/issues/3426)
- 状态：Open
- 是否已有 Fix PR：未发现
- 影响范围：Telegram 集成、MarkdownV2 输出、格式化回复稳定性
- 严重程度：中到高

#### 问题描述

在启用 Telegram MarkdownV2 的情况下，PicoClaw 的 Markdown 转换逻辑似乎没有正确转义以下内容中的保留字符：

- 链接标签文本；
- blockquote 引用文本；
- 可能还包括其他被视作“完整实体”而跳过转义的 Markdown 片段。

一旦 Telegram 拒绝该消息，PicoClaw 会回退到纯文本输出，导致整条回复失去 Markdown 格式。

#### 用户影响

该问题会影响以下使用场景：

- AI 回复中包含链接说明文本；
- 回复中包含引用、摘要、命令输出或多段格式化文本；
- Telegram Bot 用作主要交互界面；
- 用户依赖 Markdown 样式提升可读性。

#### 初步判断

该问题并非单纯的显示瑕疵，而是格式化消息发送失败后的整体回退问题。建议维护者优先检查：

1. Telegram MarkdownV2 reserved characters 的完整转义覆盖；
2. 链接 label 与 URL 的分离处理；
3. blockquote 行内特殊字符转义；
4. fallback 策略是否可以局部降级，而非整条消息纯文本化；
5. 是否需要增加回归测试，覆盖链接、引用、括号、下划线、感叹号、连字符等特殊字符组合。

---

## 5. 功能请求与路线图信号

### 5.1 Plazmi MCP/CLI 示例：持久化 Agent 会话与真实时间世界

- Issue：[#3427](https://github.com/sipeed/picoclaw/issues/3427)
- 状态：Open
- 是否已有 PR：未发现
- 类型：示例 / 集成 / 开发者体验增强

该提案建议为 PicoClaw 增加一个低依赖的 Plazmi MCP/CLI 示例，用于展示持久 Agent 会话能力。Plazmi 提供真实 UTC 时间下运行的 homes、gardens、neighbour interactions，以及 `pulse` / `digest` 等机制，可帮助 Agent 在返回时获取世界状态摘要。

#### 可能反映的路线图信号

该 Issue 暗示社区希望 PicoClaw 不仅是一个聊天或命令执行工具，也能成为：

- 持久 Agent 的运行壳层；
- MCP 工具调用与外部世界状态的桥接层；
- 支持长期任务、周期性 heartbeat、状态摘要的 Agent 框架；
- 可通过示例快速理解的开发者工具。

#### 纳入下一版本的可能性

目前没有对应 PR，也没有维护者评论，因此短期内是否进入下一版本仍不明确。若该功能以“examples/”目录中的低依赖示例形式提交，而不影响核心架构，合入门槛可能较低。建议提案方补充：

- 最小可运行示例；
- 依赖列表；
- MCP/CLI 调用方式；
- heartbeat 集成点；
- 安全与网络访问边界；
- 与 PicoClaw 当前能力的具体对接方式。

---

## 6. 用户反馈摘要

今日用户反馈主要集中在两个方向。

### 6.1 对 Telegram 输出可靠性的反馈

相关 Issue：[#3426](https://github.com/sipeed/picoclaw/issues/3426)

用户痛点非常明确：Telegram MarkdownV2 模式下，特殊字符未被正确转义会导致消息发送失败，并进一步触发纯文本回退。用户不满的重点不是单个字符显示异常，而是 **整条回复的格式化能力丢失**。

这说明 PicoClaw 的多渠道输出层需要更强的健壮性，尤其是在 Telegram 这种 Markdown 规则较严格的平台上。对于依赖 Telegram 作为主要 AI 助手入口的用户来说，格式稳定性直接影响可读性与信任感。

### 6.2 对持久 Agent 示例和生态集成的需求

相关 Issue：[#3427](https://github.com/sipeed/picoclaw/issues/3427)

用户希望 PicoClaw 能展示更具体的 Agent 长期运行场景，而不仅是一次性 CLI 或聊天交互。Plazmi 提案体现出一种使用场景：Agent 可以在真实时间驱动的世界中周期性返回、读取摘要、继续互动。

这类反馈说明，PicoClaw 的 MCP CLI 与 heartbeat 能力已经吸引到希望构建“持续存在的 AI Agent”的用户。若项目希望强化个人 AI 助手或 Agent runtime 定位，相关示例可能具有较高的展示价值。

---

## 7. 待处理积压

基于本次提供的数据，无法判断长期未响应的历史 Issue 或 PR；过去 24 小时内没有发现长期积压 PR，也没有关闭记录。当前需要维护者关注的新增开放事项如下：

1. [#3426 - Telegram MarkdownV2 skips escaping link labels and blockquote text, causing plain-text fallback](https://github.com/sipeed/picoclaw/issues/3426)  
   - 类型：Bug / 稳定性
   - 建议优先级：高
   - 原因：影响 Telegram 输出可靠性，且可能导致整条回复格式丢失。
   - 建议动作：确认复现、补充测试用例、修复 MarkdownV2 转义逻辑。

2. [#3427 - Proposal: low-dependency Plazmi MCP/CLI example for persistent agent sessions](https://github.com/sipeed/picoclaw/issues/3427)  
   - 类型：功能提案 / 示例生态
   - 建议优先级：中
   - 原因：有助于展示 PicoClaw 的 MCP CLI、heartbeat 与持久 Agent 能力。
   - 建议动作：维护者可先回应是否接受 examples 方向，并要求提案方提供最小 PR。

---

## 项目健康度评估

今日 PicoClaw 的社区输入保持活跃，但代码交付侧较安静。没有新版本、没有 PR 更新，也没有 Issue 关闭，说明短期维护活动有限。  
从健康度看，项目仍有用户在真实场景中使用并反馈问题，尤其是 Telegram 集成与 MCP/CLI Agent 场景；但维护者需要尽快回应新增 Issue，特别是会影响消息发送稳定性的 [#3426](https://github.com/sipeed/picoclaw/issues/3426)，以避免用户体验问题累积。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报｜2026-10-13

仓库：NanoClaw（github.com/qwibitai/nanoclaw）  
统计窗口：过去 24 小时  
数据概览：Issues 更新 0 条，Pull Requests 更新 5 条，新版本发布 0 个

---

## 1. 今日速览

过去 24 小时 NanoClaw 没有新增或活跃 Issue，说明用户侧公开反馈较少，项目讨论热度偏低。PR 侧共有 5 条更新，其中 3 条仍处于 Open 状态，2 条已关闭或已合并，显示维护工作主要集中在安装兼容性、技能测试隔离、Feishu 渠道稳定性、安全审批体验以及社区资料维护上。  
整体来看，今日项目活跃度属于**中等偏维护型活跃**：没有版本发布和大规模功能变更，但有多项面向稳定性、集成体验和运维细节的修复推进。当前值得维护者重点关注的是 OneCLI 兼容性修复、测试环境隔离，以及已关闭 PR 是否已正确进入主分支和后续版本。

---

## 2. 项目进展

今日共有 2 条 PR 进入关闭状态，主要集中在 Feishu 渠道稳定性和审批流体验修复。

### 已关闭 / 可能已合并的重要 PR

#### PR #4080｜修复审批卡片在请求者私聊线程中的投递位置

- 状态：CLOSED
- 标签：`area/security`
- 作者：amit-shafnir
- 链接：https://github.com/qwibitai/nanoclaw/pull/4080

该 PR 修复了审批请求卡片未正确进入请求者所在线程的问题。典型场景是用户在审批者自己的 DM 线程中触发如 `ncl destinations-add` 这类需要管理员审批的操作，审批卡片此前会被发送到 DM 顶层，导致用户在原线程内等待却看不到审批结果。

**项目推进意义：**

- 改善审批流程的可见性与可用性。
- 降低因卡片位置错误导致的误判、重复操作或审批超时。
- 由于该 PR 归类在安全区域，说明审批链路的正确性对权限控制和管理操作有直接影响。

---

#### PR #4079｜修复 Feishu 进度卡片误撤回，并调整语音摘要模型环境变量读取

- 状态：CLOSED
- 标签：`area/agent-runner`、`area/channels`、`area/configuration`、`area/containers`、`area/core`、`area/repository-maintenance`、`area/skills`、`area/tools`
- 作者：tier2tech-tian
- 链接：https://github.com/qwibitai/nanoclaw/pull/4079

该 PR 解决了 Feishu 群聊中频繁出现“撤回了一条消息”的问题。根据 PR 描述，问题发生在进度卡片执行过 Bash 工具后，`turn_end` 折叠导致当前 steps 只剩思考旁白，`hasVisibleProcess` 被误判为 false，从而触发 `im.message.delete` 删除卡片。

修复内容包括：

- `cleanupProgressCard` 改用 `allSteps` 判断是否存在可见过程。
- 保留“纯思考、无工具起手卡可删除”的原有设计。
- 新增回归测试，通过缺陷注入验证问题可复现。
- `VOICE_SUMMARY_MODEL` 改为调用时通过 `readEnvFile` 读取，避免仅依赖进程启动时的环境变量。

**项目推进意义：**

- 提升 Feishu 渠道中 Agent 执行过程的透明度。
- 减少用户对“消息被撤回”的困惑和不信任感。
- 加强语音摘要配置的运行时一致性。
- 涉及核心、渠道、容器、技能和工具多个区域，属于影响面较广的稳定性修复。

---

## 3. 社区热点

今日无 Issue 更新，PR 评论数与反应数数据均未提供或为 0，因此没有明显的高热度社区讨论。当前社区信号主要来自新增 PR，而非用户在 Issue 中的集中反馈。

### PR #4083｜将 Sol AI 加入 Community 区域

- 状态：OPEN
- 标签：`area/repository-maintenance`
- 作者：TheSolai
- 链接：https://github.com/qwibitai/nanoclaw/pull/4083

该 PR 请求将 Sol AI 加入项目 Community section。Sol AI 被描述为一个围绕 OpenClaw 的个人 AI agent 博客，内容包括真实世界的自主工作流和生产级 agent 架构，对 OpenClaw 或 NanoClaw 构建者具有参考价值。

**背后诉求：**

- 社区希望 NanoClaw 生态能够收录外部实践案例。
- 用户和开发者对“生产级 agent 架构”“真实 autonomous workflow”存在持续关注。
- 这类 PR 虽不改变核心代码，但有助于增强项目生态感和外部可见性。

---

### PR #4082｜修复 OneCLI 安装流程，使用 agent grants API，并将 gateway pin 升至 1.45.0

- 状态：OPEN
- 标签：`kind/bug`、`delivery/skill`、`PR: Fix`、`PR: Skill`、`area/setup-installation`、`area/skills`、`area/tools`
- 作者：chiptoe-svg
- 链接：https://github.com/qwibitai/nanoclaw/pull/4082

该 PR 针对 OneCLI 1.43+ 中多个 secrets 相关命令返回 `410 Gone` 的问题提出修复方案。核心变更是让技能使用 OneCLI 的 agent grants API，并将 gateway pin 从此前 stopgap 版本迁移到 1.45.0。

**背后诉求：**

- 用户希望安装路径尽快脱离 OneCLI 1.42.0 的临时兼容方案。
- NanoClaw 对外部 CLI 和 gateway 版本依赖较强，依赖升级会直接影响安装成功率。
- 该 PR 若合并，可能成为下一版本或近期补丁中的关键安装稳定性修复。

---

## 4. Bug 与稳定性

过去 24 小时没有新增 Issue 类型的 Bug 报告，但有多条 PR 直接处理 Bug、回归风险和稳定性问题。按影响范围和严重程度排列如下。

### 高优先级：OneCLI 1.43+ 安装兼容性问题

- 相关 PR：#4082
- 状态：OPEN，已有 fix PR
- 链接：https://github.com/qwibitai/nanoclaw/pull/4082

**问题表现：**

OneCLI 1.43+ 中 `onecli agents set-secrets`、`agents secrets`、`agents set-secret-mode` 等命令返回 `410 Gone`，导致当前安装或技能配置流程无法继续依赖旧命令。

**影响判断：**

- 影响 setup / installation 路径。
- 对新用户、CI 安装、自动化部署影响较大。
- 如未合并，项目可能继续依赖 OneCLI 1.42.0 stopgap，带来技术债。

**当前进展：**

已有 PR 使用 OneCLI agent grants API 替代旧 secrets 命令，并将 gateway pin 升级至 1.45.0。

---

### 中高优先级：Feishu 进度卡片被误撤回

- 相关 PR：#4079
- 状态：CLOSED，可能已修复
- 链接：https://github.com/qwibitai/nanoclaw/pull/4079

**问题表现：**

Feishu 群聊中 Agent 已执行工具，但进度卡片在结束时被误判为无可见过程，从而被撤回。用户只看到“大狗撤回了一条消息”，无法理解 Agent 实际发生了什么。

**影响判断：**

- 直接影响 Feishu 渠道用户体验。
- 对 agent runner 的过程可观测性有负面影响。
- 容易造成用户误以为任务失败或系统异常。

**当前进展：**

PR 已关闭，并新增回归测试。若已合并，该问题应已在主线得到修复。

---

### 中优先级：审批卡片未进入正确线程

- 相关 PR：#4080
- 状态：CLOSED，可能已修复
- 链接：https://github.com/qwibitai/nanoclaw/pull/4080

**问题表现：**

需要审批的操作在请求者线程中触发后，审批卡片被发送到 DM 顶层，而非原线程。用户在原线程中等待时无法看到审批卡片。

**影响判断：**

- 影响管理类命令和审批流可用性。
- 对权限操作有潜在安全与审计体验影响。
- 虽不一定造成权限绕过，但会造成审批流程断裂。

---

### 中优先级：技能更新测试受外部环境变量污染

- 相关 PR：#4081
- 状态：OPEN，已有 fix PR
- 标签：`kind/bug`、`area/skills`
- 链接：https://github.com/qwibitai/nanoclaw/pull/4081

**问题表现：**

`scripts/update-skills.test.ts` 会受到调用者环境中的 `NANOCLAW_REGISTRY_REMOTE` 或 `NANOCLAW_CHANNELS_REMOTE` 影响。`resolveRegistryRemote` 读取这些环境变量，但端到端刷新测试未清理覆盖项，可能导致测试在不同开发者或 CI 环境中表现不一致。

**影响判断：**

- 主要影响测试稳定性和 CI 可重复性。
- 不一定直接影响生产运行，但会降低维护者对测试结果的信任。
- 属于典型的环境隔离问题，建议尽快合并。

---

### 中低优先级：语音摘要模型环境变量读取时机问题

- 相关 PR：#4079
- 状态：CLOSED，可能已修复
- 链接：https://github.com/qwibitai/nanoclaw/pull/4079

**问题表现：**

`VOICE_SUMMARY_MODEL` 原先只从 `process.env` 读取，可能无法反映 `.env` 文件的最新配置。

**影响判断：**

- 影响语音摘要模型配置的可预期性。
- 对依赖 `.env` 动态配置的部署方式不友好。
- 已在 #4079 中改为调用时通过 `readEnvFile` 读取。

---

## 5. 功能请求与路线图信号

今日没有新 Issue 类型的功能请求，但从 PR 可以看出几个路线图信号。

### 1. 安装与外部依赖兼容性仍是近期重点

- 相关 PR：#4082
- 链接：https://github.com/qwibitai/nanoclaw/pull/4082

OneCLI agent grants API 的切换和 gateway 1.45.0 pin 更新表明 NanoClaw 正在适配上游 CLI 的接口变化。该 PR 很可能进入近期维护版本，因为它直接影响安装成功率和技能交付路径。

---

### 2. 技能系统测试可靠性正在加强

- 相关 PR：#4081
- 链接：https://github.com/qwibitai/nanoclaw/pull/4081

隔离 registry remote 环境变量说明维护者开始关注技能刷新测试的 hermetic / deterministic 特性。后续可能继续出现围绕 skills registry、channels remote、E2E refresh 流程的测试加固工作。

---

### 3. 多渠道 Agent 体验仍在持续打磨

- 相关 PR：#4079
- 链接：https://github.com/qwibitai/nanoclaw/pull/4079

Feishu 进度卡片、语音摘要模型配置等修复说明项目不仅关注核心 agent runner，也在持续优化不同企业协作平台中的用户体验。未来路线图中，多渠道可观测性、消息卡片生命周期和语音/摘要能力可能继续成为重点。

---

### 4. 社区生态资料开始扩展

- 相关 PR：#4083
- 链接：https://github.com/qwibitai/nanoclaw/pull/4083

Sol AI 的加入请求体现了外部开发者希望将自己的生产实践、博客或案例纳入 NanoClaw 社区索引。若维护者接受该类贡献，项目的 Community section 可能逐渐成为 agent workflow 实践案例库。

---

## 6. 用户反馈摘要

今日没有 Issue 评论数据，因此无法从 Issues 中提炼直接用户反馈。现有可观察反馈主要来自 PR 描述中暴露的真实使用场景。

### 可见痛点

1. **安装流程容易受上游 CLI 变更影响**  
   - 来源：PR #4082  
   - 链接：https://github.com/qwibitai/nanoclaw/pull/4082  
   - 用户痛点是 OneCLI 1.43+ 命令变更导致原有 secrets 配置方式失效，安装体验被迫依赖旧版本 workaround。

2. **Agent 过程卡片被误撤回会严重影响用户信任**  
   - 来源：PR #4079  
   - 链接：https://github.com/qwibitai/nanoclaw/pull/4079  
   - Feishu 用户看到“撤回了一条消息”，但不知道 Agent 实际执行过哪些工具，容易误解为系统异常或操作失败。

3. **审批流需要保持线程上下文一致**  
   - 来源：PR #4080  
   - 链接：https://github.com/qwibitai/nanoclaw/pull/4080  
   - 审批卡片脱离原线程会让用户在关键权限操作中失去反馈，影响安全操作的可见性。

4. **开发和 CI 环境需要更强隔离**  
   - 来源：PR #4081  
   - 链接：https://github.com/qwibitai/nanoclaw/pull/4081  
   - 环境变量污染测试说明项目维护者在不同本地或 CI 环境中可能遇到不稳定测试结果。

### 满意 / 不满意信号

- 正向信号：维护者正在通过回归测试和更细粒度环境读取修复真实问题，说明项目对稳定性问题响应积极。
- 负向信号：多个问题都与集成边界有关，包括 OneCLI、Feishu、`.env`、测试环境变量，说明 NanoClaw 的外部依赖和多环境一致性仍是主要风险来源。

---

## 7. 待处理积压

当前数据窗口内没有长期未响应的 Issue 或 PR 信息。所有 Open PR 均为 2026-10-12 创建，属于新近积压，建议按影响面排序处理。

### 建议优先处理

#### PR #4082｜OneCLI agent grants 与 gateway 1.45.0 兼容修复

- 状态：OPEN
- 链接：https://github.com/qwibitai/nanoclaw/pull/4082
- 建议优先级：高

该 PR 影响安装路径和技能交付，且针对 OneCLI 1.43+ 的真实兼容性问题。建议尽快完成 review、验证升级路径，并明确是否需要迁移说明。

---

#### PR #4081｜隔离 registry remote 环境变量覆盖

- 状态：OPEN
- 链接：https://github.com/qwibitai/nanoclaw/pull/4081
- 建议优先级：中

该 PR 有助于提升测试稳定性，尤其是 E2E refresh 测试在 CI 和本地环境的一致性。建议在 #4082 之后尽快处理，避免环境污染继续影响后续贡献者。

---

#### PR #4083｜添加 Sol AI 到 Community section

- 状态：OPEN
- 链接：https://github.com/qwibitai/nanoclaw/pull/4083
- 建议优先级：低到中

这是社区生态类维护 PR，风险较低。建议维护者确认 Community section 的收录标准，例如是否要求与 NanoClaw 直接相关、是否接受个人博客、是否需要案例质量审查。

---

## 项目健康度评估

- **活跃度**：中等。Issue 侧安静，PR 侧有 5 条更新，维护活动持续。
- **稳定性趋势**：改善中。今日多个 PR 聚焦 bugfix、测试隔离和渠道体验。
- **发布节奏**：今日无新版本，暂未看到 release 层面的交付信号。
- **主要风险**：外部依赖兼容性、企业 IM 渠道消息生命周期、测试环境污染。
- **短期建议**：优先合并并验证 #4082 和 #4081；确认 #4079、#4080 是否已真正合入主线，并在下一次发布说明中突出 Feishu 与审批流修复。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-10-13）

## 1. 今日速览

过去 24 小时，IronClaw 项目共有 **2 条 Issue 更新**，其中 **2 条为新开/活跃 Issue**，没有 Issue 关闭，也没有 PR 更新或版本发布。整体来看，今日项目活跃度偏低，主要活动集中在 **扩展机制提案** 与 **失败用例归因分析** 两类议题上。  
当前没有合并代码变更，因此项目功能层面暂无可见推进；但 #8135 提供了基准测试失败分类信息，有助于后续模型质量与稳定性改进。社区互动方面，两条 Issue 均暂无评论和点赞，说明相关议题尚处于初始提交阶段，维护者反馈仍待跟进。

---

## 2. 项目进展

今日无 Pull Request 更新。

- 待合并 PR：0
- 已合并 / 已关闭 PR：0
- 新增代码层面的功能、修复或重构：暂无可见记录

从数据看，今日项目没有通过 PR 推进功能或修复。项目进展主要体现在 Issue 层面的需求收集与测试失败归因沉淀。

---

## 3. 社区热点

今日社区讨论热度整体较低，两条新 Issue 均暂无评论与反应。

### [#8136 Proposal: optional hosted-MCP Plazmi extension using declarative auth and egress](https://github.com/nearai/ironclaw/issues/8136)

- 状态：Open
- 作者：cairn-agent
- 创建 / 更新：2026-10-13
- 评论数：0
- 👍：0

该 Issue 提出希望基于 IronClaw / Reborn 现有的扩展机制，为 Plazmi 提供一个可选的 hosted-MCP companion extension。提案重点是利用已有的 **声明式 hosted-MCP metadata、API-key auth 与 egress 配置能力**，避免将特定 vendor 逻辑直接加入 host。

背后的诉求包括：

- 希望第三方能力通过扩展方式接入，而非侵入核心宿主逻辑。
- 希望认证、网络访问和 MCP 元数据通过声明式配置管理。
- 体现出用户对 IronClaw 扩展架构稳定性与可组合性的关注。

目前该提案尚未获得维护者或社区反馈，是否进入路线图仍不明确。

### [#8135 Daily ironclaw failure taxonomy — 2026-10-12](https://github.com/nearai/ironclaw/issues/8135)

- 状态：Open
- 作者：pranavraja99
- 创建 / 更新：2026-10-12
- 评论数：0
- 👍：0

该 Issue 是一份每日失败用例分类报告，分析了 officeqa 基准测试中的 **52 个 non-pass 任务**。摘要中指出，这些失败未发现例外情况，均被归类为 **真实模型质量错误**，涉及 DeepSeek-V4-Flash 等模型表现问题。

背后的诉求包括：

- 持续追踪 benchmark 非通过任务。
- 区分模型质量问题、测试框架问题和潜在系统缺陷。
- 为后续模型评估、调参或回归分析提供依据。

该 Issue 更偏向质量监控与评估数据沉淀，不是直接的功能请求或 Bug 修复单。

---

## 4. Bug 与稳定性

今日没有明确报告新的崩溃、运行时异常或系统级回归问题。

### 中低优先级：模型质量失败分类

#### [#8135 Daily ironclaw failure taxonomy — 2026-10-12](https://github.com/nearai/ironclaw/issues/8135)

- 类型：质量分析 / Benchmark failure taxonomy
- 严重程度：中低，取决于相关 benchmark 对项目目标的重要性
- 是否已有 fix PR：否
- 当前状态：Open

该 Issue 报告 officeqa benchmark 中存在 **52 个 non-pass 任务**，并将其归因为真实模型质量错误，而非测试基础设施异常或已知例外。  
从稳定性角度看，这不构成传统意义上的运行时 Bug，但对 AI agent 或个人 AI 助手类项目而言，benchmark 失败会直接影响系统可靠性、任务完成率和用户信任度。

建议维护者后续关注：

- 是否需要将失败任务进一步细分为推理错误、工具调用错误、知识缺失或格式遵循问题。
- 是否存在特定模型、任务类型或 prompt 模式导致的集中失败。
- 是否需要创建后续修复 PR 或 benchmark regression tracking。

---

## 5. 功能请求与路线图信号

### [#8136 Proposal: optional hosted-MCP Plazmi extension using declarative auth and egress](https://github.com/nearai/ironclaw/issues/8136)

- 类型：功能请求 / 扩展机制提案
- 状态：Open
- 是否已有相关 PR：否
- 进入下一版本可能性：暂无法判断，需维护者确认

该提案释放了一个较明确的路线图信号：用户希望 IronClaw 的扩展系统能够支持更多外部 hosted-MCP 服务，并通过声明式方式管理认证与出站访问策略。

潜在价值：

- 增强 IronClaw 生态的第三方集成能力。
- 降低将 vendor-specific 逻辑耦合进核心 host 的风险。
- 验证 Reborn 扩展接口在真实外部服务接入场景中的适用性。

潜在风险或需要澄清的问题：

- hosted-MCP extension 的安全边界如何定义。
- API key 管理是否满足最小权限原则。
- egress 声明是否需要审核、沙箱或策略限制。
- Plazmi companion 是否应作为官方示例、社区扩展，还是独立第三方包。

由于目前没有配套 PR，也没有维护者评论，因此该功能是否被纳入下一版本仍不确定。

---

## 6. 用户反馈摘要

今日 Issues 中没有评论，因此可提炼的用户反馈主要来自 Issue 正文。

### 扩展集成诉求

来自 [#8136](https://github.com/nearai/ironclaw/issues/8136) 的反馈显示，用户希望通过 IronClaw 已有的声明式扩展机制接入外部服务，而不是要求核心项目直接内置第三方 vendor 逻辑。这反映出用户对以下方面有明确期待：

- 扩展系统应具备足够表达力。
- 外部服务接入应低耦合、可选安装。
- 认证与网络访问能力应配置化、声明式、可审计。

### 模型质量与评估透明度诉求

来自 [#8135](https://github.com/nearai/ironclaw/issues/8135) 的报告显示，项目持续关注 benchmark 失败原因。用户或维护者希望通过每日失败分类，区分真实模型质量问题与系统问题。

这说明当前项目健康度不仅依赖代码稳定性，也依赖：

- 模型在任务集上的完成率。
- benchmark 失败是否可解释。
- 质量问题是否能被持续追踪并转化为改进任务。

---

## 7. 待处理积压

基于今日提供的数据，未发现长期未响应的重要 Issue 或 PR。当前可见的待处理事项主要是今日新增或近期更新的两个 Open Issue：

1. [#8136 Proposal: optional hosted-MCP Plazmi extension using declarative auth and egress](https://github.com/nearai/ironclaw/issues/8136)  
   建议维护者尽快确认该扩展方向是否符合项目边界，并给出对 hosted-MCP、auth 与 egress 声明式配置的接受标准。

2. [#8135 Daily ironclaw failure taxonomy — 2026-10-12](https://github.com/nearai/ironclaw/issues/8135)  
   建议维护者判断是否需要从失败分类报告中拆分出可执行的修复任务，例如模型评估、prompt 调整、测试集标注或回归追踪。

---

## 项目健康度判断

今日 IronClaw 项目处于 **低代码变更、轻量社区输入、质量监控持续进行** 的状态。没有新版本、没有 PR 合并，也没有 Bug fix 进入代码库，说明短期内功能和稳定性没有明显推进。  
不过，#8136 显示出生态扩展方面的潜在需求，#8135 则体现了项目对 benchmark 质量的持续跟踪。整体健康度可评估为：**维护活动偏低，但议题方向具有建设性；后续关键在于维护者是否及时响应并将 Issue 转化为可执行 PR 或路线图任务。**

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-10-13

## 1. 今日速览

过去 24 小时，LobsterAI 仓库 **Issue 无新增或更新**，但 PR 活动较高，共有 **10 条 PR 更新**，其中 **1 条仍处于 Open 状态，9 条已关闭/合并**。今日开发重点集中在 **桌面端 Cowork 体验、Computer Use 能力、IM 稳定性、Windows/Open With 集成、Artifacts 预览体验** 等方向。  
整体来看，项目处于 **高频迭代、偏工程落地与稳定性修复并行推进** 的状态：既有面向用户体验的新能力，也有较多底层进程生命周期、运行时兼容和 UI 边界问题修复。  
需要注意的是，今日没有新版本发布，也没有新的 Issue 反馈进入，因此社区侧信号较弱，主要动态来自维护者与贡献者提交的 PR。

---

## 3. 项目进展

### 3.1 Expert Plaza 与 Agent 召唤流程进入待合并状态

- PR：[#2849 feat(experts): add configurable expert plaza and summon flow](https://github.com/netease-youdao/LobsterAI/pull/2849)  
- 状态：Open  
- 领域：`renderer`、`docs`、`main`、`cowork`

该 PR 是今日唯一仍处于开放状态的功能型 PR，重点是新增 **Expert Plaza**，用于发现和召唤面向特定任务的 Agent。同时将 Kits 迁移到共享的 **Kits / Skills / Connectors** 目录体系中。

从摘要看，该能力引入了来自 **Overmind 与版本化 CDN catalog** 的专家内容，意味着 LobsterAI 桌面客户端未来可以在不重新构建客户端的情况下更新专家内容、排序和展示策略。这是一个较明显的产品化与平台化信号：

- Agent 能力从“内置固定功能”向“可配置、可分发、可运营的专家广场”演进；
- 内容更新与客户端发布解耦；
- 后续可能形成插件、专家、技能、连接器统一入口。

该 PR 若合并，预计会成为下一阶段桌面端 Agent 发现与调用体验的重要基础设施。

---

### 3.2 IM 后台 accumulator 销毁逻辑修复

- PR：[#2850 fix(im): safely destroy background accumulators](https://github.com/netease-youdao/LobsterAI/pull/2850)  
- 状态：Closed  
- 领域：`main`、`im`  
- 关联：Fixes #926

该 PR 修复了 `IMCoworkHandler.destroy()` 在清理后台投递 accumulator 时可能抛错的问题。问题根因是该 accumulator 设计上没有 promise rejection callback，但销毁流程中直接调用了相关回调，导致异常风险。

本次改动通过 **optional invocation** 方式调用 accumulator rejection callback，从而避免空回调导致销毁流程失败。该修复属于稳定性增强，尤其影响 IM/Cowork 后台投递链路的资源释放与异常清理。

对项目推进意义：

- 降低 IM 后台任务销毁阶段异常；
- 改善资源清理的容错性；
- 对长期运行的桌面客户端稳定性有积极影响。

---

### 3.3 Windows “Open With” 能力推进

- PR：[#2848 feat: open with](https://github.com/netease-youdao/LobsterAI/pull/2848)  
- 状态：Closed  
- 领域：`renderer`、`build`、`main`、`cowork`、`platform: windows`

该 PR 标题显示新增了 **Open With** 能力，且明确涉及 Windows 平台。虽然 PR 摘要为空，但从标签可判断其涉及：

- 主进程；
- 渲染层；
- 构建配置；
- Cowork 流程；
- Windows 平台集成。

这类能力通常与文件右键菜单、系统打开方式、文件传入应用处理流程相关。若已合并，将增强 LobsterAI 作为桌面 AI 助手处理本地文件、文档或任务上下文的入口能力。

---

### 3.4 Desktop Companion Composer 功能推进

- PR：[#2847 feat: desktop companion composer](https://github.com/netease-youdao/LobsterAI/pull/2847)  
- 状态：Closed  
- 领域：`renderer`、`docs`、`main`、`cowork`

该 PR 标题显示新增了 **desktop companion composer**。虽然缺少详细摘要，但从标签看，该能力横跨主进程、渲染层、文档和 Cowork，说明它可能与桌面伴随式输入、会话撰写器或任务编排入口有关。

结合 LobsterAI 当前的 Cowork、Agent、Expert Plaza 等方向，Desktop Companion Composer 可能是将 AI 助手嵌入桌面工作流的重要组成部分，面向更低摩擦的任务输入与会话启动。

---

### 3.5 新桌面会话标题自动生成能力

- PR：[#2846 feat(cowork): generate titles for new desktop sessions](https://github.com/netease-youdao/LobsterAI/pull/2846)  
- 状态：Closed  
- 领域：`renderer`、`docs`、`main`、`cowork`

该 PR 为用户主动新建的桌面会话增加 **异步标题生成** 能力。用户新建会话后，系统先显示现有本地标题，再基于首条提问异步生成简短标题。

关键设计点：

- 仅针对用户主动新建的桌面会话；
- 适用于所有 Agent；
- 历史会话、后续轮次、IM、定时任务和分叉不触发；
- 最多发送 1000 个 Unicode 字符的原始用户文本；
- 仅附带少量文档文件名；
- 排除图片、文件本体、磁盘路径和运行时提示；
- 生成失败、超额、超时或未登录时静默保留原标题；
- 不提示失败、不重试、不阻塞首轮对话。

该设计体现出较强的产品细节意识：既提升会话管理体验，又尽量降低隐私风险和失败感知。它改善的是长期使用中的信息组织能力，尤其适合高频创建桌面会话的用户。

---

### 3.6 Computer Use MCP Bridge 生命周期修复

- PR：[#2845 fix(computer-use): exit the MCP bridge when its stdio closes](https://github.com/netease-youdao/LobsterAI/pull/2845)  
- 状态：Closed  
- 领域：`main`

该 PR 修复了 Computer Use MCP bridge 仅在 `SIGINT` / `SIGTERM` 下退出的问题。根据摘要，OpenClaw 停止 stdio MCP servers 的方式是关闭 stdin；当 gateway 崩溃循环或被 `SIGKILL` 终止时，操作系统会关闭 stdin，但不会发送信号，导致 bridge 进程可能残留。

本次修复使 MCP bridge 在 stdio 关闭时也能退出，有助于避免：

- 孤儿进程；
- 资源泄漏；
- Computer Use 能力异常残留；
- 网关崩溃后的进程状态不一致。

这是一个较重要的稳定性修复，尤其影响 Computer Use 与 MCP 生态的可靠性。

---

### 3.7 Computer Use 支持 Intel Mac

- PR：[#2844 feat(computer-use): support Intel Macs with a mac-x64 runtime](https://github.com/netease-youdao/LobsterAI/pull/2844)  
- 状态：Closed  
- 领域：`docs`、`main`

该 PR 为 Computer Use 增加 `mac-x64` runtime 0.2.2。此前 Computer Use 仅提供 `win-x64` 与 `mac-arm64` runtime，因此在 Intel Mac，或 Rosetta 下运行的 x64 构建中，相关 kit 不会出现在 kit market，MCP server 也不会被注入。

该 PR 的推进意义较明确：

- 扩大 Computer Use 覆盖平台；
- 修复 Intel Mac 用户无法使用 Computer Use 的能力缺口；
- 改善 kit market 展示与 MCP server 注入逻辑；
- 对仍使用 Intel Mac 的用户具有直接价值。

---

### 3.8 Release/2026.9.24 分支处理

- PR：[#2843 Release/2026.9.24](https://github.com/netease-youdao/LobsterAI/pull/2843)  
- 状态：Closed  
- 领域：`renderer`、`build`、`docs`、`main`、`openclaw`、`skills`、`cowork`、`im`、`artifacts`、`platform: windows`

该 PR 覆盖范围非常广，涉及多个核心模块和 Windows 平台。虽然摘要为空，但从标题和标签看，它应与 `2026.9.24` 版本线或发布分支整理有关。

由于今日“新版本发布”为 0，该 PR 的关闭不等于当天正式发布新版本。更合理的判断是：维护者在处理发布分支、回合并或发布准备相关内容，但 GitHub Releases 尚未产生新的公开版本。

---

### 3.9 暂时隐藏单轮积分展示

- PR：[#2842 feat(cowork): hide per-turn credits chip until the breakdown is reworked](https://github.com/netease-youdao/LobsterAI/pull/2842)  
- 状态：Closed  
- 领域：`renderer`、`cowork`

该 PR 暂时隐藏了助手回复下方的单轮积分 chip，例如 “21.78 积分”，以及相关 usage popover。原因是当前数值和明细仍需重构，例如总数尚未反映图片生成成本。

这说明项目团队对成本展示的准确性较谨慎。在计费、积分或用量展示场景中，不准确的明细容易引发用户误解甚至信任问题，因此先隐藏再重构是较稳妥的选择。

---

### 3.10 Artifacts 预览缩放与平移修复

- PR：[#2841 fix(artifacts): let zoomed image, SVG and Mermaid previews pan to every edge](https://github.com/netease-youdao/LobsterAI/pull/2841)  
- 状态：Closed  
- 领域：`renderer`、`artifacts`

该 PR 修复了 Artifacts 预览面板中图片、SVG 和 Mermaid 内容在缩放后无法平移到边缘的问题。用户报告中提到，图片放大到例如 160% 后，左侧部分无法访问。

问题原因是：

- 预览器使用 `transform: scale()`；
- 缩放原点位于中心；
- 外层容器使用 `overflow-auto`；
- CSS transform 不会扩展滚动区域，导致部分内容不可达。

这是一个典型的前端交互边界问题，修复后将改善图片、SVG 和 Mermaid 图表在 Artifacts 中的查看体验，尤其适合查看大图、流程图、架构图和复杂 Mermaid 图的用户。

---

## 4. 社区热点

今日没有新的 Issue，也没有 Issue 评论数据。PR 数据中评论数均为 `undefined`，点赞数均为 0，因此无法基于评论量或反应量判断真实社区讨论热点。

从 PR 主题热度和影响范围看，以下内容值得关注：

1. **Expert Plaza / Agent 召唤流程**
   - PR：[#2849](https://github.com/netease-youdao/LobsterAI/pull/2849)
   - 关注点：Agent 发现、专家市场、远程 catalog、内容动态配置。
   - 背后诉求：用户需要更容易找到合适的任务型 Agent，而不是手动配置或记忆不同能力入口。

2. **Computer Use 稳定性与平台覆盖**
   - PR：[#2845](https://github.com/netease-youdao/LobsterAI/pull/2845)、[#2844](https://github.com/netease-youdao/LobsterAI/pull/2844)
   - 关注点：MCP bridge 生命周期、Intel Mac 支持。
   - 背后诉求：Computer Use 是复杂能力，用户更关心“能不能稳定运行”和“我的设备能不能用”。

3. **桌面会话体验优化**
   - PR：[#2846](https://github.com/netease-youdao/LobsterAI/pull/2846)、[#2847](https://github.com/netease-youdao/LobsterAI/pull/2847)
   - 关注点：会话标题、桌面伴随式 composer。
   - 背后诉求：高频桌面 AI 使用中，入口效率与历史会话管理变得越来越重要。

---

## 5. Bug 与稳定性

### 高优先级

#### 5.1 Computer Use MCP bridge 在 stdio 关闭后可能不退出

- PR：[#2845 fix(computer-use): exit the MCP bridge when its stdio closes](https://github.com/netease-youdao/LobsterAI/pull/2845)
- 状态：Closed
- 严重程度：高
- 是否已有 fix PR：是，#2845

该问题可能导致 MCP bridge 进程在网关异常、crash loop 或被强制终止后残留。对于本地桌面应用来说，孤儿进程和资源泄漏会影响长期稳定性，因此属于较重要修复。

---

#### 5.2 IMCoworkHandler 销毁后台 accumulator 时可能抛错

- PR：[#2850 fix(im): safely destroy background accumulators](https://github.com/netease-youdao/LobsterAI/pull/2850)
- 状态：Closed
- 严重程度：中高
- 是否已有 fix PR：是，#2850
- 关联 Issue：#926

该问题发生在 IM 后台投递 accumulator 清理阶段，属于销毁流程中的异常处理缺陷。修复后可以提升 IM/Cowork 后台链路在会话结束或资源释放时的健壮性。

---

### 中优先级

#### 5.3 Intel Mac 无法使用 Computer Use runtime

- PR：[#2844 feat(computer-use): support Intel Macs with a mac-x64 runtime](https://github.com/netease-youdao/LobsterAI/pull/2844)
- 状态：Closed
- 严重程度：中
- 是否已有 fix PR：是，#2844

此前 Intel Mac 与 Rosetta x64 构建缺少 `mac-x64` runtime，导致 Computer Use kit 不显示、MCP server 不注入。该问题属于平台兼容性缺口，影响特定用户群体。

---

#### 5.4 Artifacts 缩放后无法平移至图片/SVG/Mermaid 边缘

- PR：[#2841 fix(artifacts): let zoomed image, SVG and Mermaid previews pan to every edge](https://github.com/netease-youdao/LobsterAI/pull/2841)
- 状态：Closed
- 严重程度：中
- 是否已有 fix PR：是，#2841

该问题直接影响 Artifacts 内容查看，尤其是大图、复杂 SVG 或 Mermaid 图。虽然不属于崩溃类问题，但会明显影响使用体验。

---

### 低到中优先级

#### 5.5 积分展示明细不完整，暂时隐藏 per-turn credits chip

- PR：[#2842 feat(cowork): hide per-turn credits chip until the breakdown is reworked](https://github.com/netease-youdao/LobsterAI/pull/2842)
- 状态：Closed
- 严重程度：中
- 是否已有处理 PR：是，#2842

当前积分明细尚未完整反映所有成本，例如图片生成成本。团队选择先隐藏展示入口，避免用户基于不完整数据产生误解。

---

## 6. 功能请求与路线图信号

今日没有新 Issue，因此没有直接来自用户的新功能请求。但从 PR 方向可以观察到以下路线图信号：

### 6.1 Agent 市场化与动态分发

- PR：[#2849 feat(experts): add configurable expert plaza and summon flow](https://github.com/netease-youdao/LobsterAI/pull/2849)

Expert Plaza、Overmind、版本化 CDN catalog 的组合表明，LobsterAI 正在将 Agent 能力从静态内置转向动态配置与远程分发。该能力很可能成为下一版本的重要功能候选。

---

### 6.2 桌面 AI 入口继续增强

- PR：[#2847 feat: desktop companion composer](https://github.com/netease-youdao/LobsterAI/pull/2847)
- PR：[#2848 feat: open with](https://github.com/netease-youdao/LobsterAI/pull/2848)

Desktop Companion Composer 和 Windows Open With 都指向同一个趋势：LobsterAI 不只是一个聊天窗口，而是在尝试成为操作系统级工作流入口。后续可能继续加强：

- 文件右键唤起 AI；
- 桌面浮窗或伴随式输入；
- 针对本地文件的上下文分析；
- 与 Cowork 会话的无缝衔接。

---

### 6.3 Computer Use 进入多平台稳定化阶段

- PR：[#2844](https://github.com/netease-youdao/LobsterAI/pull/2844)
- PR：[#2845](https://github.com/netease-youdao/LobsterAI/pull/2845)

Computer Use 同时出现平台支持和进程生命周期修复，说明该能力已经进入更广泛用户覆盖与稳定性打磨阶段。下一版本可能继续围绕 MCP、OpenClaw、runtime 分发和平台兼容进行优化。

---

### 6.4 会话管理体验精细化

- PR：[#2846 feat(cowork): generate titles for new desktop sessions](https://github.com/netease-youdao/LobsterAI/pull/2846)

自动生成会话标题表明团队正在优化长周期使用中的组织体验。未来可能继续出现：

- 会话自动归类；
- 会话摘要；
- 任务状态标记；
- 基于 Agent 或文件上下文的历史检索。

---

## 7. 用户反馈摘要

今日没有新增 Issue，也没有可用的 Issue 评论数据，因此无法提炼新的真实用户反馈。不过从 PR 摘要中可间接看到几个已被维护者响应的用户痛点：

1. **Artifacts 缩放预览不可达边缘**
   - 相关 PR：[#2841](https://github.com/netease-youdao/LobsterAI/pull/2841)
   - 用户痛点：图片放大后无法查看左侧区域，影响图像、SVG、Mermaid 预览。
   - 场景：查看复杂图表、架构图、生成图片或流程图。

2. **Intel Mac 用户无法使用 Computer Use**
   - 相关 PR：[#2844](https://github.com/netease-youdao/LobsterAI/pull/2844)
   - 用户痛点：kit market 中不出现 Computer Use，MCP server 不注入。
   - 场景：仍使用 Intel Mac 或 Rosetta x64 构建的用户希望使用桌面自动化能力。

3. **积分展示不准确可能造成误解**
   - 相关 PR：[#2842](https://github.com/netease-youdao/LobsterAI/pull/2842)
   - 用户痛点：单轮积分和 usage breakdown 不完整，尤其缺少图片生成成本。
   - 场景：用户希望了解每次对话或生成任务的成本，但当前展示尚不足够可靠。

4. **桌面会话标题管理负担**
   - 相关 PR：[#2846](https://github.com/netease-youdao/LobsterAI/pull/2846)
   - 用户痛点：新建会话后如果标题不清晰，后续查找和管理成本较高。
   - 场景：高频使用多个 Agent、多个任务会话的用户。

---

## 8. 待处理积压

基于今日数据，仓库过去 24 小时没有新增或活跃 Issue，也未提供长期未响应 Issue/PR 列表。因此无法识别真正意义上的长期积压项。

当前唯一仍需关注的开放 PR 是：

### 8.1 Expert Plaza 与 Agent 召唤流程待评审/合并

- PR：[#2849 feat(experts): add configurable expert plaza and summon flow](https://github.com/netease-youdao/LobsterAI/pull/2849)
- 状态：Open
- 建议关注点：
  - CDN catalog 的版本兼容策略；
  - Expert 内容动态更新的安全边界；
  - Kits / Skills / Connectors 目录迁移是否影响旧路径；
  - 桌面客户端离线或 catalog 拉取失败时的降级体验；
  - Expert 排序和内容变更是否需要可观测性或灰度控制。

该 PR 覆盖产品入口、内容分发和 Agent 调用流程，建议维护者优先完成设计评审与兼容性验证。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报  
**日期：2026-10-13**  
**仓库：** [moltis-org/moltis](https://github.com/moltis-org/moltis)

## 1. 今日速览

过去 24 小时，Moltis 项目活跃度偏低但聚焦度较高：新增/更新 Issue 1 条，新增/更新 PR 2 条，暂无合并、关闭或版本发布。今日动态主要集中在 **多 Agent 调度权限控制**、**聊天路径与子 Agent 行为一致性**，以及一个较重要的 **频道绑定会话访问策略绕过问题**。  
从信号看，项目正在强化 Agent 编排场景下的安全边界与一致性体验，尤其是 `spawn_agent`、preset、channel-bound session 等核心能力。当前健康度整体稳定，但 Issue #1303 暴露出访问控制与消息投递路径之间存在潜在高风险设计缺口，建议维护者优先评估。

---

## 2. 项目进展

过去 24 小时没有 PR 被合并或关闭，因此主分支暂无可确认的代码层面推进。不过有 2 个开放 PR 体现了明确的演进方向。

### 开放 PR：Preset spawn.allow 权限控制

- [PR #1302 - Preset spawn.allow: allowlist for spawn_agent targets](https://github.com/moltis-org/moltis/pull/1302)  
  **作者：** ManuRakh  
  **状态：** Open  
  **创建时间：** 2026-10-12  

该 PR 引入 `agents.presets.<id>.spawn.allow` 配置，用于限制某个调用方只能通过 `spawn_agent` 派生到指定 preset。其核心价值是为多 Agent 组织结构、协调器-执行器图谱、受控 delegation 场景提供更细粒度的安全边界。

主要变化包括：

- 在 `resolve_preset` 阶段执行目标 allowlist 校验，避免进入 provider 执行阶段后才失败；
- 根据调用 Agent 的权限动态调整工具 schema / description，只暴露允许派生的目标；
- 有助于防止 Agent 越权调用未授权 preset。

该 PR 对项目整体方向的意义较大：Moltis 正在从“能编排 Agent”走向“可治理、可约束地编排 Agent”。

---

### 开放 PR：Chat 与 sub-agent 行为一致性

- [PR #1301 - Chat ↔ sub-agent parity: persona, system_prompt_suffix, delegate_only, preset model](https://github.com/moltis-org/moltis/pull/1301)  
  **作者：** ManuRakh  
  **状态：** Open  
  **创建时间：** 2026-10-12  
  **最后更新：** 2026-10-13  

该 PR 试图解决 direct chat 与 `spawn_agent` 子运行之间行为不一致的问题。当前一些 preset 字段只影响子 Agent，不影响用户直接与同一 Agent 聊天，导致“作为子 Agent 被调用”和“直接聊天”出现人格、系统提示词、模型选择等差异。

涉及方向包括：

- 子 Agent persona 与直接 chat persona 对齐；
- `system_prompt_suffix` 在不同调用路径中的一致应用；
- `delegate_only` 行为统一；
- preset model 在 chat 与 sub-agent 路径中的一致性。

该 PR 对用户体验和配置可预测性影响明显。对于 coordinator/worker 架构、角色化 Agent、组织图式多 Agent 应用来说，一致性是降低误配置和调试成本的关键。

---

## 3. 社区热点

今日没有出现高评论数或高反应数的讨论：新增 Issue 评论数为 0，两个 PR 也未显示有效评论数据。因此热点更多体现在议题本身的重要性，而非社区讨论热度。

### 安全与访问策略热点

- [Issue #1303 - Web turns on a channel-bound session are delivered to the channel, bypassing the account's chat access policy](https://github.com/moltis-org/moltis/issues/1303)  
  **作者：** texxronn  
  **状态：** Open  
  **评论：** 0  
  **反应：** 0  

该 Issue 指出，当 web UI、cron、webhook 或 `sessions_send` 等非 gateway turn 运行在 **channel-bound session** 上时，Moltis 会将其降级为 public context，这本身是预期行为；但问题在于，系统仍会把回复投递到对应 channel chat。

背后诉求可以概括为：

1. **访问策略应当覆盖所有入口路径**  
   用户认为即使上下文被降级，消息投递也不应绕过 account 的 chat access policy。

2. **Web UI 应有明确风险提示**  
   如果一次 web turn 会向外部 channel 发送消息，界面应提示用户该行为会影响频道聊天，而不是静默发送。

3. **Channel-bound session 的语义需要更严格定义**  
   当前行为可能混淆“在某个频道上下文中生成回复”和“向该频道实际投递消息”两个概念。

该问题虽然暂无评论，但从标题和摘要看，属于安全边界和产品预期层面的高优先级议题。

---

## 4. Bug 与稳定性

### 高严重度：Channel-bound session 可能绕过账号聊天访问策略

- [Issue #1303 - Web turns on a channel-bound session are delivered to the channel, bypassing the account's chat access policy](https://github.com/moltis-org/moltis/issues/1303)  
  **状态：** Open  
  **是否已有明确修复 PR：** 暂未看到直接关联的 fix PR  
  **创建时间：** 2026-10-12  

**问题描述：**  
当 web UI、cron、webhook、`sessions_send` 等非 gateway 入口对 channel-bound session 发起 turn 时，系统会：

- 将上下文降级为 public context；
- 禁用工具或私有上下文访问；
- 但仍然将模型回复投递到绑定的 channel chat。

这可能造成两个问题：

1. **访问策略绕过**  
   即使 account 的 chat access policy 不允许某些聊天行为，系统仍可能通过绑定频道发送回复。

2. **用户不可见的副作用**  
   Web UI 或其他入口可能没有清楚提醒用户：“这次操作会向频道发送消息”。

**影响评估：**  
该问题可能影响多租户、团队频道、集成聊天平台、企业权限控制等场景。即便没有私有上下文泄露，未经授权或未提示的频道投递也可能造成信息扩散、审计缺口和合规风险。

**建议优先级：高。**  
建议维护者优先确认：

- 非 gateway turn 是否应默认禁止投递到 channel；
- 是否需要新增显式参数控制“只生成不发送”；
- channel-bound session 在 web UI 中是否应展示醒目警告；
- chat access policy 是否应在投递层再次校验。

---

## 5. 功能请求与路线图信号

今日新增或活跃 PR 显示出两个明确路线图信号：**Agent 编排安全治理** 与 **Agent 行为一致性**。

### 方向一：受控的 Agent 派生与组织结构

- [PR #1302 - Preset spawn.allow: allowlist for spawn_agent targets](https://github.com/moltis-org/moltis/pull/1302)

该 PR 很可能被纳入后续版本，因为它补足了 `spawn_agent` 在复杂组织图中的权限约束能力。对于企业级或生产环境使用，允许 Agent 自由 spawn 其他 Agent 可能带来不可控行为；allowlist 是自然且必要的治理机制。

潜在后续路线：

- preset 级权限模型；
- org-chart / coordinator graph 的显式配置；
- 工具调用权限与 Agent 身份绑定；
- 动态工具 schema 与权限裁剪。

### 方向二：Direct chat 与 sub-agent parity

- [PR #1301 - Chat ↔ sub-agent parity: persona, system_prompt_suffix, delegate_only, preset model](https://github.com/moltis-org/moltis/pull/1301)

该 PR 指向配置一致性问题。用户期望“同一个 Agent”无论是被直接对话，还是作为子 Agent 被调用，都应遵守相同 persona、系统提示词和模型配置。

潜在后续路线：

- preset 字段语义统一；
- chat runner 与 sub-agent runner 抽象收敛；
- 更清晰的 delegate-only Agent 使用体验；
- 改善 coordinator/worker 模式下的可预测性。

### 方向三：频道绑定会话的安全交互模型

- [Issue #1303 - Web turns on a channel-bound session are delivered to the channel](https://github.com/moltis-org/moltis/issues/1303)

虽然这是 Bug 报告，但也暴露出一个产品设计方向：Moltis 需要更清晰地区分“使用频道上下文生成回复”和“向频道投递回复”。这可能推动后续出现：

- dry-run / no-delivery 模式；
- web UI 明确投递提示；
- channel-bound session 的发送策略配置；
- 投递前 access policy 二次校验。

---

## 6. 用户反馈摘要

今日唯一明确的用户反馈来自 [Issue #1303](https://github.com/moltis-org/moltis/issues/1303)。

### 用户痛点

1. **权限策略与实际消息投递不一致**  
   用户观察到，系统虽然在上下文层面做了降级处理，但在最终投递层仍可能把消息发送到频道。这说明用户对访问策略的期望是端到端的，而不只是上下文访问控制。

2. **Web UI 缺少副作用提示**  
   用户希望当 web turn 会触发频道消息时，界面能给出明确警告。当前行为可能让操作者误以为只是本地或网页中的一次交互。

3. **多入口行为不可预测**  
   web UI、cron、webhook、`sessions_send` 等入口都可能触发类似行为。用户希望这些入口在权限与投递语义上保持一致。

### 使用场景推断

该反馈很可能来自将 Moltis 连接到真实聊天频道或团队协作平台的用户。他们关注：

- 频道消息是否会被无意发送；
- Agent 是否会绕过组织设定的聊天访问策略；
- 自动化任务是否可能在不恰当的上下文中发声；
- Web UI 操作者是否能明确知道自己正在影响外部频道。

### 满意与不满意信号

- **满意点：** 系统已具备 public context 降级机制，说明安全隔离已有基础设计。
- **不满意点：** 降级并未阻止频道投递，导致用户认为安全模型不完整。

---

## 7. 待处理积压

根据本次提供的数据，无法判断是否存在长期未响应的重要 Issue 或 PR；今日可见的 1 个 Issue 和 2 个 PR 都是在 2026-10-12 创建或近期更新，不属于长期积压。

但有三个待处理事项值得维护者优先关注：

1. **高优先级安全/策略问题待确认**  
   - [Issue #1303](https://github.com/moltis-org/moltis/issues/1303)  
   建议尽快给出 triage 结论，确认是设计预期、Bug，还是需要新增配置项。

2. **权限治理 PR 待评审**  
   - [PR #1302](https://github.com/moltis-org/moltis/pull/1302)  
   该 PR 涉及 `spawn_agent` 安全边界，建议重点审查权限解析顺序、schema 裁剪是否完整，以及是否存在绕过路径。

3. **行为一致性 PR 待评审**  
   - [PR #1301](https://github.com/moltis-org/moltis/pull/1301)  
   该 PR 影响 chat 与 sub-agent 两条核心路径，建议重点验证向后兼容性，尤其是已有 preset 配置在 direct chat 中生效后是否会改变现有用户预期。

---

## 总体健康度评估

**健康度：中等偏稳，需关注安全边界。**

Moltis 今日没有版本发布和合并记录，短期代码推进有限；但开放 PR 显示项目仍在围绕多 Agent 编排能力进行结构性增强。当前最值得关注的是 [Issue #1303](https://github.com/moltis-org/moltis/issues/1303)，它涉及 access policy 与 channel delivery 的一致性，属于可能影响生产环境信任边界的问题。若维护者能及时处理该 Issue，并推进 #1301、#1302 两个 PR，项目在 Agent 编排安全性和配置一致性方面将有明显提升。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报  
**日期：2026-10-13**  
**数据范围：过去 24 小时 GitHub 活动**  
**仓库数据来源：agentscope-ai/QwenPaw / CoPaw 相关项目数据**

---

## 1. 今日速览

过去 24 小时内，项目活跃度较高：共有 **8 条 Issue 更新**、**19 条 PR 更新**，其中 **17 个 PR 仍待合并**，**2 个 PR 已关闭或合并**。  
今日重点集中在 **Windows 稳定性、Creator 插件、Console 聊天体验、模型与工具提供商扩展、上下文/记忆机制重构** 等方向。  
社区反馈显示，用户在真实部署场景中遇到的问题较集中，包括 Windows 文件句柄占用、运行时恢复、跨设备消息同步、反向代理路径部署等。  
整体来看，项目处于高频迭代阶段，但待合并 PR 数量较多，短期内需要维护者加强 Review 与合并节奏，避免修复积压。

---

## 2. 项目进展

今日共有 **2 个 PR 进入已关闭/已合并状态**，主要围绕上下文恢复与工具审批流程稳定性。

### 已关闭 / 已合并的重要 PR

#### PR #8193：提前回收 active results，验证上下文溢出恢复  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8193  
状态：CLOSED  
作者：rayrayraykk  

该 PR 针对长轮次对话中 Scroll 上下文压缩触发不及时的问题进行了修复。此前，在 completed-turn eviction 和 consumed-thinking omission 后，active turn 仍可能超过压缩阈值，导致可回收的工具结果持续累积。  
该改动有助于提升长对话、工具调用密集场景下的上下文稳定性，降低超出上下文窗口的风险。

**项目推进意义：**
- 改善长会话中的上下文管理；
- 降低复杂任务中因上下文膨胀导致的失败概率；
- 为后续更复杂的 agent 执行链路提供稳定基础。

---

#### PR #8188：保留审批决策并处理 timeout race  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8188  
状态：CLOSED  
作者：zhaozhuang521  

该 PR 修复了工具审批流程中的竞态问题。此前如果用户在工具真正进入等待状态前完成审批，审批结果可能丢失，最终导致工具调用被错误拒绝。  
该修复确保审批请求对象被正确保留，使工具在执行时能够读取到用户此前的决策。

**关联 Issue：**
- https://github.com/agentscope-ai/QwenPaw/issues/8105

**项目推进意义：**
- 提升 human-in-the-loop 工具调用可靠性；
- 降低用户已批准但系统误判拒绝的体验问题；
- 对需要人工审批的高风险工具执行场景非常关键。

---

## 3. 社区热点

### 1）Windows 下 Creator 项目删除失败  
Issue #8206：https://github.com/agentscope-ai/QwenPaw/issues/8206  
PR #8210：https://github.com/agentscope-ai/QwenPaw/pull/8210  

**热度：**
- Issue 评论数：2
- 状态：OPEN
- 已有修复 PR：是，#8210

该问题报告称，在 Windows 环境下，一旦项目自身的 `creator.log` 被写入，删除项目时会因为日志文件句柄未释放导致目录重命名失败，触发 `WinError 5`。  
对应 PR #8210 已提出修复方案：在删除项目目录前关闭 per-project logging，避免 `os.replace` 或 atomic replace 时遇到文件占用。

**背后诉求：**
- Windows 用户希望 Creator 插件具备更可靠的文件生命周期管理；
- 插件应避免长期持有项目目录内文件句柄；
- 删除、重命名、迁移项目等操作需要具备跨平台一致性。

---

### 2）Creator 启动 hook 在 stale pid 下崩溃  
Issue #8194：https://github.com/agentscope-ai/QwenPaw/issues/8194  
PR #8196：https://github.com/agentscope-ai/QwenPaw/pull/8196  

**热度：**
- Issue 评论数：2
- 状态：OPEN
- 已有修复 PR：是，#8196

用户反馈 Windows 环境中，如果 `creator-runtime/runtime-owner.json` 保存了过期 pid，插件启动 hook 调用 `os.kill(pid, 0)` 时可能抛出 `SystemError`，而不是常规的 `OSError`，导致 QwenPaw Desktop 启动失败。  
PR #8196 已对该问题进行兼容处理，将 `OSError` 和 `SystemError` 都视为 stale peer 结果。

**背后诉求：**
- 插件启动逻辑需要将 runtime owner 检测视为“建议性检查”，而不是致命错误；
- Windows 平台异常行为需要被显式兼容；
- Desktop 启动路径不应因可恢复的状态文件问题而中断。

---

### 3）Firecrawl 作为 web_search provider 的集成请求  
Issue #8199：https://github.com/agentscope-ai/QwenPaw/issues/8199  
PR #8200：https://github.com/agentscope-ai/QwenPaw/pull/8200  

**热度：**
- Issue 评论数：1
- 状态：OPEN
- 已有功能 PR：是，#8200
- 作者来自 Firecrawl 团队

Firecrawl 团队成员提出将 Firecrawl 添加为第三个 `web_search` provider，并提交了配套 PR。  
PR #8200 实现了 `FirecrawlProvider`，通过 `https://api.firecrawl.dev/v2/search` 接口获取搜索结果，并映射到现有的 title / url / snippet 结构。

**背后诉求：**
- 用户希望 web_search 能支持更多第三方服务；
- 工具生态正在向插件化、多 provider 方向扩展；
- 外部服务团队愿意主动维护集成，说明项目生态具备一定吸引力。

---

### 4）跨设备消息在当前 turn 结束前不可见  
Issue #8202：https://github.com/agentscope-ai/QwenPaw/issues/8202  
PR #8203：https://github.com/agentscope-ai/QwenPaw/pull/8203  

**热度：**
- Issue 评论数：1
- 状态：OPEN
- 已有修复 PR：是，#8203

用户反馈，从 Web Console 或移动端发送消息后，该消息只有在 run 结束后才会持久化到聊天历史。运行过程中，其他设备通过 `GET /api/chats` 看不到该消息，SSE 流中也没有用户自己的消息。  
PR #8203 尝试在新 run stream 的第一帧回显用户消息，以改善实时反馈体验。

**背后诉求：**
- 多端使用场景需要更强的实时一致性；
- 用户希望消息一发送即可在历史、流式响应、其他设备中可见；
- 当前“run end 才持久化”的设计影响协作和移动端体验。

---

## 4. Bug 与稳定性

以下按严重程度与影响面排序。

### P0 / 高优先级：Desktop 启动失败

#### Issue #8194：Creator startup hook 因 stale pid 崩溃  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8194  
状态：OPEN  
修复 PR：https://github.com/agentscope-ai/QwenPaw/pull/8196  

**问题影响：**
- QwenPaw Desktop 可能无法启动；
- 影响 Windows 用户；
- 触发条件为 `runtime-owner.json` 中存在 stale pid。

**当前进展：**
- 已有 PR #8196，修复方式较小且明确；
- 建议优先 Review 并合并。

---

### P0 / 高优先级：Hub 重启后 Local runtimes 未恢复

#### Issue #8213：Hub restart 后 desired-running Local runtimes 停止，cron jobs 被静默跳过  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8213  
状态：OPEN  
修复 PR：暂无明确关联 PR  

**问题影响：**
- Hub 重启后，用户期望持续运行的本地 runtime 未自动恢复；
- runtime 内启用的 cron jobs 会静默错过执行；
- Hub 本身可能仍显示健康，容易造成隐性任务丢失。

**风险判断：**
这是今日新增问题中影响面较大的稳定性问题，尤其影响自动化任务、定时任务和长期运行 agent 场景。建议维护者优先确认是否为 runtime desired state 恢复逻辑缺失。

---

### P1 / 高优先级：Windows 项目删除失败

#### Issue #8206：Creator 项目删除时因 creator.log 文件句柄未释放失败  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8206  
状态：OPEN  
修复 PR：https://github.com/agentscope-ai/QwenPaw/pull/8210  

**问题影响：**
- Windows 用户无法删除 Creator 项目；
- 错误表现为 `WinError 5` 或 `503 STORAGE_INTEGRITY_ERROR`；
- 一旦日志文件被写入后稳定复现。

**当前进展：**
- PR #8210 已提出关闭日志句柄后再执行目录删除；
- 修复路径明确，建议优先合并。

---

### P1 / 中高优先级：跨设备消息实时不可见

#### Issue #8202：用户消息在 turn 完成前不可见  
链接：https://github.com/agentscope-ai/QwenPaw/issues/8202  
状态：OPEN  
修复 PR：https://github.com/agentscope-ai/QwenPaw/pull/8203  

**问题影响：**
- 多设备使用时状态不同步；
- Web Console 和移动端体验受影响；
- 用户发送消息后缺少即时反馈，可能误以为发送失败。

**当前进展：**
- PR #8203 通过 run stream 第一帧回显用户消息来缓解；
- 但历史持久化时机是否也需要调整，仍值得进一步讨论。

---

### P1 / 中高优先级：工具流 GeneratorExit 异常

#### PR #8212：finish tool streams without yielding during GeneratorExit  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8212  
状态：OPEN  

**问题影响：**
- 工具调用被中断或出错时，AgentScope 的 `Toolkit.call_tool()` 生成器可能在 finalization 阶段 yield；
- 日志中出现 `RuntimeError: async generator ignored GeneratorExit`；
- 可能影响工具调用链路的清理稳定性。

**当前进展：**
- 已有小尺寸修复 PR；
- 建议尽快 Review，避免异常日志掩盖真实工具错误。

---

### P2 / 中优先级：Console 深链访问异常

#### PR #8209：resolve deep links across agents  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8209  
状态：OPEN  

**问题影响：**
- 直接访问 `/chat/<id>` 时，依赖当前 Agent 和侧边栏列表；
- 可能跳转到空白 session 或加载历史失败；
- 影响分享链接、书签、多 Agent 切换场景。

**当前进展：**
- PR #8209 添加 API 用于解析 session 对应 Agent；
- PR 体量为 XXL，需重点关注回归风险。

---

### P2 / 中优先级：GitHub 技能导入损坏二进制文件

#### PR #8198：preserve binary files in GitHub imports  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8198  
状态：OPEN，Under Review  
关联 Issue：https://github.com/agentscope-ai/QwenPaw/issues/8179  

**问题影响：**
- GitHub skill import 时二进制文件可能因 UTF-8 解码替换而被静默损坏；
- 对包含图片、模型资产、压缩包或其他二进制资源的技能包影响较大。

**当前进展：**
- PR 已进入 Review；
- 建议优先合并，以免技能生态中出现难以排查的资产损坏。

---

## 5. 功能请求与路线图信号

### 1）Firecrawl web_search provider

Issue #8199：https://github.com/agentscope-ai/QwenPaw/issues/8199  
PR #8200：https://github.com/agentscope-ai/QwenPaw/pull/8200  

这是今日最明确的生态扩展信号之一。Firecrawl 团队主动提出并提交实现，说明 QwenPaw 的工具 provider 架构正在吸引外部服务集成。  
考虑到已有 PR 且范围较清晰，该功能有较大概率进入后续版本。

---

### 2）Tavily API key 支持与 credential store 集成

PR #8204：https://github.com/agentscope-ai/QwenPaw/pull/8204  

该 PR 为内置 `tavily` web_search provider 添加可选 API key 配置，支持通过 Console / credentials 使用付费 Tavily key，并处理 unpaid quota、rate limit、bad key 等情况。  

**路线图信号：**
- web_search provider 正在从“固定内置服务”走向“可配置、可认证、多 provider”；
- credential store 的重要性上升；
- 搜索工具能力可能成为近期重点迭代方向。

---

### 3）Decision model 配置与 JEV provider

PR #8205：https://github.com/agentscope-ai/QwenPaw/pull/8205  

该 PR 新增 `model_type` 属性，默认为 `chat`，可配置为 `decision`，并引入 JEV provider。  
这表明模型配置正在从单一聊天模型扩展到更细粒度的角色化模型，例如用于结构化决策、路由或安全判断的模型。

**可能影响：**
- 后续 routing features 可能依赖 decision model；
- 模型管理 UI 和配置 schema 可能需要跟进；
- 多模型协作能力将增强。

---

### 4）Protected execution contract prompt 的 i18n 支持

Issue #8211：https://github.com/agentscope-ai/QwenPaw/issues/8211  

用户指出当前 Scroll context management prompt 已支持基于 agent config 中 `language` 字段选择中英文，但 protected execution contract prompt 尚未具备同等 i18n 能力。  

**路线图信号：**
- 国际化需求正在从 UI 层延伸到系统 prompt 层；
- 对非英语用户而言，agent 内部约束和安全执行提示也需要本地化；
- 如果项目希望扩大中文、英文以外用户群，prompt i18n 可能需要系统性建设。

---

### 5）模型池缺少删除能力

Issue #8195：https://github.com/agentscope-ai/QwenPaw/issues/8195  

用户反馈模型池 / 模型管理 UI 只有启用 / 禁用操作，没有永久删除模型条目的能力，导致废弃或损坏的模型配置无法清理。  

**路线图信号：**
- 模型管理从“可用性切换”进入“生命周期管理”阶段；
- 后续可能需要支持删除、归档、重命名、验证、批量清理等管理操作。

---

### 6）ESP32 硬件接入，类似 Meta Muse

Issue #8189：https://github.com/agentscope-ai/QwenPaw/issues/8189  

用户希望支持类似 Meta Muse 的硬件接入能力，使 ESP32 设备能够接入 QwenPaw。  

**路线图信号：**
- 社区对 AI 助手硬件化、IoT 接入有兴趣；
- 如果 channels 插件化方向推进，硬件接入可能成为未来 channel/plugin 的扩展场景；
- 可与 PR #8187 的 channels 插件化和子进程隔离能力形成长期关联。

---

### 7）Channels 插件化与子进程隔离

PR #8187：https://github.com/agentscope-ai/QwenPaw/pull/8187  

该 PR 体量为 XXXL，目标是将 channels 抽离为插件并支持子进程隔离。  

**路线图信号：**
- 项目架构正在向插件化、隔离执行和可扩展 channel 生态演进；
- 对安全性、稳定性、第三方 channel 接入都有长远意义；
- 但 PR 规模较大，建议拆分 Review，降低合并风险。

---

## 6. 用户反馈摘要

### Windows 用户对稳定性和文件锁问题高度敏感

来自 Issue #8206、#8194 的反馈集中表明，Windows 平台上的 Creator 插件仍存在若干兼容性问题，包括文件句柄未释放、`os.kill(pid, 0)` 异常类型不一致等。  
用户痛点并非单纯功能缺失，而是“启动失败”“项目无法删除”这类阻断性问题。

相关链接：
- https://github.com/agentscope-ai/QwenPaw/issues/8206
- https://github.com/agentscope-ai/QwenPaw/issues/8194

---

### 多端用户希望消息状态实时一致

Issue #8202 显示，用户在 Web Console 和移动端之间切换时，希望消息发送后立即能在历史和流中看到，而不是等到整个 turn 结束。  
这说明 QwenPaw 的用户场景正在从单端调试，逐步进入多端、持续会话、移动端协同使用阶段。

相关链接：
- https://github.com/agentscope-ai/QwenPaw/issues/8202
- https://github.com/agentscope-ai/QwenPaw/pull/8203

---

### 用户希望工具和模型配置更可控

Firecrawl、Tavily API key、模型池删除、decision model 等反馈说明，用户开始关注更精细的配置能力：

- 搜索 provider 可选择；
- API key 可配置；
- 模型可分类；
- 废弃模型可删除；
- provider 行为可控且可维护。

相关链接：
- https://github.com/agentscope-ai/QwenPaw/issues/8199
- https://github.com/agentscope-ai/QwenPaw/pull/8200
- https://github.com/agentscope-ai/QwenPaw/pull/8204
- https://github.com/agentscope-ai/QwenPaw/issues/8195
- https://github.com/agentscope-ai/QwenPaw/pull/8205

---

### 部署用户关注反向代理与路径前缀支持

PR #8197 反映出用户在反向代理部署场景中遇到 Console basename 问题。  
当代理保留 `/qwenpaw` 等路径前缀时，Console router 和静态资源 URL 不能正确处理，影响私有化部署和企业环境部署。

相关链接：
- https://github.com/agentscope-ai/QwenPaw/pull/8197

---

## 7. 待处理积压

从本次数据看，过去 24 小时内新增和更新的 Issue / PR 都较新，未发现明显“长期无人响应”的条目。不过，当前有多个重要 PR 仍待 Review 或合并，建议维护者重点关注以下积压风险。

### 高优先级待处理 PR

#### PR #8196：修复 Windows stale pid 启动崩溃  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8196  
原因：对应 Desktop 启动失败问题，修复范围小，建议优先合并。

#### PR #8210：修复 Windows Creator 项目删除失败  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8210  
原因：对应用户明确报告的删除失败问题，影响 Creator 核心操作。

#### PR #8203：Console run stream 首帧回显用户消息  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8203  
原因：改善多端消息同步和即时反馈体验。

#### PR #8198：GitHub skill import 保留二进制文件  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8198  
原因：避免技能包资产静默损坏，影响生态可靠性。

---

### 需要架构层 Review 的大体量 PR

#### PR #8187：channels 插件化与子进程隔离  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8187  
风险：体量 XXXL，涉及架构边界、安全隔离和插件生命周期，建议拆分或分阶段合入。

#### PR #8207：proactive memory 重构到 reme-integrated  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8207  
风险：体量 XXXL，涉及 memory / proactive feature，可能影响 agent 行为一致性。

#### PR #8209：跨 Agent 解析 chat deep links  
链接：https://github.com/agentscope-ai/QwenPaw/pull/8209  
风险：体量 XXL，涉及 Console 路由、session-agent 解析、历史加载逻辑，需重点测试多 Agent 场景。

---

## 总体健康度评估

今日 CoPaw / QwenPaw 项目表现出较高活跃度，社区反馈与贡献都较密集，尤其是外部贡献者和第三方服务团队开始提交 provider 集成，说明生态吸引力正在增强。  
但稳定性方面，Windows、Hub runtime 恢复、跨设备消息同步等问题值得优先处理，其中 #8194、#8206、#8213 都属于会直接影响用户使用连续性的缺陷。  
建议短期维护重点放在：**合并小型稳定性修复 PR、确认 Hub runtime 恢复问题、控制大型架构 PR 的 Review 风险、完善 web_search provider 与 credential store 路线**。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 — 2026-10-13

## 1. 今日速览

过去 24 小时 ZeroClaw 活跃度较高：新增/活跃 Issues 11 条，PR 更新 28 条，其中 22 条仍待合并，6 条已合并或关闭。今日没有新版本发布，项目主要处于“修复与稳定性推进”阶段，而非发布阶段。  
从议题分布看，核心关注点集中在 runtime/daemon、Agent prompt 缓存、ZeroCode 体验、成本统计、工具权限与安全认证等方面。整体健康度良好：问题报告质量较高，多个 Bug 已经有对应修复 PR，但待合并队列较长，维护者需要重点关注 prompt cache、成本控制与安全相关 PR 的合并节奏。

---

## 2. 项目进展

今日可见的重要进展主要来自已关闭/已合并 PR 以及一批接近可合并的修复 PR。

### 已关闭/合并的重要 PR

- **修复 RustSec 安全告警：升级 quinn-proto**
  - PR: [#11682 fix(deps): bump quinn-proto to 0.11.19 to clear five RustSec advisories](https://github.com/zeroclaw-labs/zeroclaw/pull/11682)
  - 影响：修复 `quinn-proto` 0.11.15 相关的 5 个 RustSec advisories，其中包括远程 panic、内存保护绕过等风险。
  - 价值：这是今日最重要的安全稳定性进展之一，有助于降低网络协议层面的潜在攻击面。

- **记录 roster-bound pairing token 例外已获批准**
  - PR: [#11699 docs(runtime): record the approval of the roster-bound pairing token exception](https://github.com/zeroclaw-labs/zeroclaw/pull/11699)
  - 影响：为 runtime 中 roster-bound pairing token 相关改动补齐 ADR-016/holding-crate 例外文档。
  - 价值：说明安全配对 token 方向正在推进，并且维护者在架构边界上保持审查流程。

- **提出/调整 roster-bound pairing token runtime 放置例外**
  - PR: [#11684 docs(runtime): propose roster-bound pairing token placement exception](https://github.com/zeroclaw-labs/zeroclaw/pull/11684)
  - PR: [#11685 docs(runtime): propose roster-bound pairing token placement exception](https://github.com/zeroclaw-labs/zeroclaw/pull/11685)
  - 影响：围绕 gateway pairing token 的 runtime 实现位置进行文档化约束。
  - 价值：虽然是文档类 PR，但与认证路径、远程配对和安全边界相关，对后续功能落地有铺垫意义。

- **为 per-session personality snapshot 申请 runtime 例外**
  - PR: [#11702 docs(runtime): propose holding-crate exception for per-session personality snapshot](https://github.com/zeroclaw-labs/zeroclaw/pull/11702)
  - 影响：为修复 Agent 每轮重读 personality 文件导致 prompt cache 失效的问题提供架构例外依据。
  - 价值：直接支撑 [#11698](https://github.com/zeroclaw-labs/zeroclaw/pull/11698)，有助于降低长会话成本和 prompt cache miss。

### 待合并但推进明显的关键 PR

- **稳定 Agent personality 文件快照，避免每轮 bust prompt cache**
  - PR: [#11698 fix(runtime): keep personality files stable per session so edits don't bust the prompt cache](https://github.com/zeroclaw-labs/zeroclaw/pull/11698)
  - 对应 Issue: [#11696](https://github.com/zeroclaw-labs/zeroclaw/issues/11696)
  - 影响：Agent 首次构建 system prompt 时渲染 `AGENTS.md`、`SOUL.md`、`TOOLS.md` 等 personality 文件，之后在会话内复用快照。
  - 项目推进：这是 runtime 成本优化和 prompt cache 稳定性的核心修复，若合并，将显著减少长会话中的重复前缀失效。

- **ZeroCode 成本面板 UTC 统计修复**
  - PR: [#11695 fix(zerocode): count the dashboard's By Period costs in UTC like the tracker](https://github.com/zeroclaw-labs/zeroclaw/pull/11695)
  - 对应 Issue: [#11694](https://github.com/zeroclaw-labs/zeroclaw/issues/11694)
  - 影响：让 Cost tab 的 By Period 统计与 `CostTracker` 的 UTC 日/月维度一致。
  - 项目推进：改善用户对成本限制、当日花费和模型消费的理解，降低误判预算状态的风险。

- **ZeroCode 显示 cost warn_at_percent 警告**
  - PR: [#11692 feat(runtime): surface cost warn_at_percent warnings in ZeroCode](https://github.com/zeroclaw-labs/zeroclaw/pull/11692)
  - 影响：当消费达到 daily/monthly limit 的 `warn_at_percent` 阈值时，在 ZeroCode 中暴露 warning。
  - 项目推进：让成本控制从“超限阻断”提前到“接近超限预警”，对重度 Agent 使用者更友好。

- **修复 model_routing_config upsert_agent 覆盖问题**
  - PR: [#11693 fix(tools): preserve targeted agent upserts](https://github.com/zeroclaw-labs/zeroclaw/pull/11693)
  - 相关 Issue: [#11708](https://github.com/zeroclaw-labs/zeroclaw/issues/11708)
  - 影响：`model_routing_config upsert_agent` 保留未显式传入的 agent 字段、risk/runtime profile 引用，避免局部更新造成意外覆盖。
  - 项目推进：提升工具配置类操作的安全性和可预测性。

- **ZeroCode 输入与 transcript 污染修复**
  - PR: [#11700 fix(zerocode): keep composer and completion keys and clicks out of the transcript](https://github.com/zeroclaw-labs/zeroclaw/pull/11700)
  - 影响：避免 Up/Down/Esc、点击和补全相关按键进入聊天 transcript。
  - 项目推进：改善 TUI 可用性，减少误输入污染上下文。

---

## 3. 社区热点

今日讨论最集中的主题不是单一大型争论，而是一组围绕“成本、prompt cache、长会话稳定性”的问题。

- **Agent 每轮重读 personality 文件导致 prompt cache 失效**
  - Issue: [#11696 perf(runtime): system prompt is rebuilt from disk every turn](https://github.com/zeroclaw-labs/zeroclaw/issues/11696)
  - Fix PR: [#11698](https://github.com/zeroclaw-labs/zeroclaw/pull/11698)
  - 热点诉求：用户希望长会话中 system prompt 前缀保持稳定，避免 personality 文件轻微变动影响所有 live sessions 的缓存命中率。
  - 背后信号：ZeroClaw 的使用者已经在关注推理成本、prompt cache 命中和多会话长期运行效率，说明项目进入更偏生产化的使用阶段。

- **deferred MCP tool 激活后 system prompt 改变，导致缓存失效**
  - Issue: [#11703 perf(runtime): activating a deferred tool via tool_search changes the system prompt](https://github.com/zeroclaw-labs/zeroclaw/issues/11703)
  - 热点诉求：启用 `mcp.deferred_loading = true` 时，用户希望工具激活不会改变 prompt 前缀结构。
  - 背后信号：MCP deferred loading 的性能优化与 prompt cache 稳定性之间存在张力，需要更稳定的工具声明/激活模型。

- **ZeroCode Cost tab 混用 UTC 与本地日统计**
  - Issue: [#11694 [Bug]: ZeroCode Cost tab mixes UTC and local-day totals](https://github.com/zeroclaw-labs/zeroclaw/issues/11694)
  - Fix PR: [#11695](https://github.com/zeroclaw-labs/zeroclaw/pull/11695)
  - 热点诉求：用户需要明确知道 dashboard 中“today”到底是 UTC day 还是 local day。
  - 背后信号：成本可观测性已经成为用户信任系统的重要组成部分。

- **远程 ZeroCode 认证体验：通过 mTLS plane 获取 bearer**
  - Issue: [#11679 [Feature]: zerocode obtains and stores its own bearer over the mTLS plane](https://github.com/zeroclaw-labs/zeroclaw/issues/11679)
  - 热点诉求：希望远程 ZeroCode setup 从“手动 curl gateway 获取 token”简化为“operator mint code → zerocode --connect → connected”。
  - 背后信号：远程 Agent/CLI 的安全配对和低摩擦 onboarding 是路线图上的重要方向。

---

## 4. Bug 与稳定性

按严重程度和影响范围整理如下。

### S2 — 降级行为 / 明显影响体验或成本

- **system prompt 每轮从磁盘重建，personality 文件变更会破坏所有 live sessions 的 prompt cache**
  - Issue: [#11696](https://github.com/zeroclaw-labs/zeroclaw/issues/11696)
  - Fix PR: [#11698](https://github.com/zeroclaw-labs/zeroclaw/pull/11698)
  - 影响：增加推理成本，降低长会话 prompt cache 命中率。
  - 状态：已有明确修复 PR，建议优先审查。

- **model_routing_config 工具 schema 缺少 action-specific required arguments**
  - Issue: [#11708](https://github.com/zeroclaw-labs/zeroclaw/issues/11708)
  - 相关 PR: [#11693](https://github.com/zeroclaw-labs/zeroclaw/pull/11693)
  - 影响：模型调用 `upsert_scenario` 等 action 时容易遗漏必填参数，造成重复失败调用。
  - 状态：已有相关工具配置修复，但是否完全覆盖 schema 必填参数问题仍需确认。

- **multimodal max_image_turns 未释放 vision route**
  - Issue: [#11706](https://github.com/zeroclaw-labs/zeroclaw/issues/11706)
  - 影响：图片超出历史保留轮次后，provider 仍被固定到 `vision_model_provider`，导致整个会话持续走视觉模型。
  - 状态：暂无可见修复 PR。
  - 风险：可能带来成本上升、模型路由错误和非视觉任务质量下降。

### S3 — 轻微问题 / 成本、可用性或数据准确性

- **deferred tool 通过 tool_search 激活后改变 system prompt，破坏 prompt cache**
  - Issue: [#11703](https://github.com/zeroclaw-labs/zeroclaw/issues/11703)
  - 影响：仅在 `mcp.deferred_loading = true` 时出现，主要造成成本问题。
  - 状态：暂无可见修复 PR。

- **channel 和 agent::run system prompt 仍携带日期，午夜破坏 prompt cache**
  - Issue: [#11704](https://github.com/zeroclaw-labs/zeroclaw/issues/11704)
  - 影响：每天每个 live session 至少一次完整前缀 cache miss。
  - 状态：暂无可见修复 PR。

- **ZeroCode Cost tab 混用 UTC 与 local-day totals**
  - Issue: [#11694](https://github.com/zeroclaw-labs/zeroclaw/issues/11694)
  - Fix PR: [#11695](https://github.com/zeroclaw-labs/zeroclaw/pull/11695)
  - 影响：用户可能误解当日/当月成本统计。
  - 状态：已有修复 PR。

- **ACP session store 替换 trimmed transcript 时重写 created_at**
  - Issue: [#11675](https://github.com/zeroclaw-labs/zeroclaw/issues/11675)
  - 影响：`acp_messages` 和 `acp_tool_calls` 的历史创建时间被错误刷新；当前 master 尚未读取这些列，因此暂无可见症状。
  - 状态：暂无可见修复 PR。
  - 风险：未来一旦 UI 或审计功能展示这些时间戳，会暴露数据真实性问题。

- **ZeroCode 暂停队列提示使用 ⌥P，但 macOS Terminal 会输入 π**
  - Issue: [#11691](https://github.com/zeroclaw-labs/zeroclaw/issues/11691)
  - 相关 PR: [#11700](https://github.com/zeroclaw-labs/zeroclaw/pull/11700)
  - 影响：macOS Terminal 用户按提示操作可能无法恢复队列，反而输入字符。
  - 状态：PR #11700 处理了按键/点击进入 transcript 的问题，但是否修正提示文案仍需确认。

### 测试与 CI 稳定性

- **并发写入导致 runtime trace JSON 测试不稳定**
  - PR: [#11688 test(runtime): tolerate concurrent writers when checking persisted trace correlation](https://github.com/zeroclaw-labs/zeroclaw/pull/11688)
  - 影响：提高测试在并发 trace 写入场景下的容错性。

- **Windows CI 中 provider 测试使用硬编码 `/tmp`**
  - PR: [#11681 test(providers): use owned temp dirs instead of hard-coded /tmp](https://github.com/zeroclaw-labs/zeroclaw/pull/11681)
  - 影响：提升跨平台测试稳定性，尤其是 Windows CI。

- **RPC symlink/allowed root/workspace 相关测试覆盖**
  - PR: [#11687 test(rpc): cover a workspace and allowed root configured through a link](https://github.com/zeroclaw-labs/zeroclaw/pull/11687)
  - PR: [#11683 test(rpc): install the attachment-source session at its resolved workspace](https://github.com/zeroclaw-labs/zeroclaw/pull/11683)
  - 影响：加强路径解析、workspace confinement 和 attachment source 权限边界测试。

---

## 5. 功能请求与路线图信号

- **远程 ZeroCode 通过 mTLS plane 获取并存储 bearer token**
  - Issue: [#11679](https://github.com/zeroclaw-labs/zeroclaw/issues/11679)
  - 诉求：让远程 ZeroCode 的认证流程与 gateway 认证能力对齐，减少手动 token 获取步骤。
  - 路线图信号：与 roster-bound pairing token 相关文档 PR [#11684](https://github.com/zeroclaw-labs/zeroclaw/pull/11684)、[#11685](https://github.com/zeroclaw-labs/zeroclaw/pull/11685)、[#11699](https://github.com/zeroclaw-labs/zeroclaw/pull/11699) 呼应，说明“安全配对 + 远程接入简化”很可能是近期重点方向。

- **SOP run 在 external approval 后恢复时缺少起始 turn 的 tool authority 记录**
  - Issue: [#11677](https://github.com/zeroclaw-labs/zeroclaw/issues/11677)
  - 诉求：明确 SOP step 在外部审批恢复后应使用何种工具权限，并将决策写入 SOP contract。
  - 路线图信号：ZeroClaw 正在强化“工具权限随上下文变化”的可审计语义，这对企业/安全敏感场景非常关键。

- **Plazmi 示例：展示 per-agent MCP grants 和 bounded catch-up**
  - Issue: [#11705](https://github.com/zeroclaw-labs/zeroclaw/issues/11705)
  - 诉求：贡献一个游戏世界示例，用远程 HTTP MCP server 展示每个 agent 的 MCP 授权边界和追赶机制。
  - 路线图信号：社区希望看到更完整、真实的 MCP 权限示例。若采纳，可提升文档和 onboarding 质量。

- **ZeroCode 成本预警可视化**
  - PR: [#11692](https://github.com/zeroclaw-labs/zeroclaw/pull/11692)
  - 诉求：不只在预算超限时阻断，而是在接近阈值时提前提醒。
  - 路线图信号：成本治理正在从后台策略走向前端用户体验。

- **Agent rename recovery 的 bounded exception**
  - PR: [#11701 docs(runtime): propose bounded committed agent-rename recovery exception](https://github.com/zeroclaw-labs/zeroclaw/pull/11701)
  - 诉求：为 agent rename recovery 在 runtime holding crate 中的实现路径提供例外。
  - 路线图信号：Agent 生命周期管理和恢复能力仍在演进。

---

## 6. 用户反馈摘要

- **用户非常关注长会话成本**
  - 相关 Issue: [#11696](https://github.com/zeroclaw-labs/zeroclaw/issues/11696)、[#11703](https://github.com/zeroclaw-labs/zeroclaw/issues/11703)、[#11704](https://github.com/zeroclaw-labs/zeroclaw/issues/11704)
  - 痛点：system prompt 稳定性不足会导致 prompt cache 频繁失效，用户直观感受到成本增加。
  - 解读：ZeroClaw 用户正在进行较长时间、多轮、多 session 的真实使用，而非短 demo。

- **成本展示需要更清晰、更一致**
  - 相关 Issue: [#11694](https://github.com/zeroclaw-labs/zeroclaw/issues/11694)
  - 痛点：同一 Cost tab 中不同区域使用不同“today”定义，却没有标签说明。
  - 解读：成本面板不仅是展示信息，也是用户判断预算风险的依据，因此时间维度必须明确。

- **模型路由和工具 schema 对小模型尤其敏感**
  - 相关 Issue: [#11708](https://github.com/zeroclaw-labs/zeroclaw/issues/11708)
  - 使用场景：用户在 ZeroCode 中使用 Ollama `qwen3.5:9b`，模型反复调用 `model_routing_config` 但遗漏必填参数。
  - 痛点：schema 不够明确时，本地/小型模型更容易陷入失败重试循环。
  - 解读：如果 ZeroClaw 要支持本地模型和轻量模型，工具 schema 需要更强约束与更少歧义。

- **macOS Terminal 用户体验存在细节问题**
  - 相关 Issue: [#11691](https://github.com/zeroclaw-labs/zeroclaw/issues/11691)
  - 痛点：提示使用 `⌥P`，但 macOS Terminal 中该组合键可能输入 `π`。
  - 解读：TUI 键位提示需要考虑不同终端和平台差异。

- **远程部署 setup 仍偏重手工操作**
  - 相关 Issue: [#11679](https://github.com/zeroclaw-labs/zeroclaw/issues/11679)
  - 痛点：当前远程 ZeroCode 需要 operator 在 daemon host 上手动 curl gateway 获取 bearer token。
  - 解读：用户希望远程连接流程更接近一键配对，同时保持 mTLS 安全边界。

---

## 7. 待处理积压

基于今日数据，未发现“长期未响应”的历史 Issue/PR 信息；当前可识别的是短期积压：22 个 PR 仍处于 open 状态，11 个 Issues 今日均未关闭。建议维护者优先关注以下条目。

### 高优先级待处理

- **合并 personality snapshot 修复，降低 prompt cache 成本**
  - Issue: [#11696](https://github.com/zeroclaw-labs/zeroclaw/issues/11696)
  - PR: [#11698](https://github.com/zeroclaw-labs/zeroclaw/pull/11698)

- **确认 deferred MCP loading 对 prompt cache 的影响修复方案**
  - Issue: [#11703](https://github.com/zeroclaw-labs/zeroclaw/issues/11703)

- **处理 multimodal vision provider pinning**
  - Issue: [#11706](https://github.com/zeroclaw-labs/zeroclaw/issues/11706)
  - 风险：影响多模态会话路由和成本。

- **澄清/修复 model_routing_config action-specific schema**
  - Issue: [#11708](https://github.com/zeroclaw-labs/zeroclaw/issues/11708)
  - 相关 PR: [#11693](https://github.com/zeroclaw-labs/zeroclaw/pull/11693)

- **推进远程 ZeroCode bearer over mTLS 设计**
  - Issue: [#11679](https://github.com/zeroclaw-labs/zeroclaw/issues/11679)
  - 相关 PR: [#11684](https://github.com/zeroclaw-labs/zeroclaw/pull/11684)、[#11699](https://github.com/zeroclaw-labs/zeroclaw/pull/11699)

### 中优先级待处理

- **Cost tab UTC/local day 统一**
  - Issue: [#11694](https://github.com/zeroclaw-labs/zeroclaw/issues/11694)
  - PR: [#11695](https://github.com/zeroclaw-labs/zeroclaw/pull/11695)

- **ZeroCode 成本 warning 展示**
  - PR: [#11692](https://github.com/zeroclaw-labs/zeroclaw/pull/11692)

- **ACP created_at 数据正确性**
  - Issue: [#11675](https://github.com/zeroclaw-labs/zeroclaw/issues/11675)

- **SOP external approval 后的 tool authority 语义**
  - Issue: [#11677](https://github.com/zeroclaw-labs/zeroclaw/issues/11677)

---

## 项目健康度判断

ZeroClaw 今日呈现出高活跃、强工程治理、但短期积压上升的状态。安全依赖修复、认证配对文档、prompt cache 优化、成本面板修复都说明项目正在向生产可用性推进。  
主要风险集中在三类：一是 prompt cache 稳定性影响成本；二是多模态和工具路由行为仍有边界 Bug；三是远程认证与工具权限模型仍处在设计/落地过程中。总体来看，项目维护节奏健康，但建议尽快合并已成型的成本与缓存修复 PR，以降低用户在长会话场景中的实际使用成本。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*