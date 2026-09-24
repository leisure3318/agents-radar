# OpenClaw 生态日报 2026-09-24

> Issues: 6 | PRs: 44 | 覆盖项目: 13 个 | 生成时间: 2026-09-24 03:40 UTC

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

# OpenClaw 项目动态日报（2026-09-24）

## 1. 今日速览

过去 24 小时 OpenClaw 活跃度很高：Issues 更新 6 条，其中 5 条仍处于开放状态；PR 更新 44 条，其中 38 条待合并、6 条已合并或关闭。  
今日最重要的信号是 **2026.9.6 发布后 macOS App 存在严重启动崩溃风险**，官方已撤回 Sparkle 更新源，并提示等待 2026.9.7 热修复。  
开发侧主要集中在 **Gateway、Agent 会话状态、自动化 cron、消息投递、SQLite 阻塞迁移、Discord/Telegram 等多渠道稳定性**。  
整体看，项目维护节奏非常快，但当前主线存在较多 P0/P1/P2 级别稳定性与兼容性风险，短期内应优先控制发布质量和回归范围。

---

## 2. 版本发布

### v2026.9.6：openclaw 2026.9.6

- Release：[`v2026.9.6`](https://github.com/openclaw/openclaw/releases/tag/v2026.9.6)
- 状态：**已发布，但 macOS App 不建议升级**
- 官方警告摘要：
  - **macOS App 用户不要更新到 2026.9.6**
  - 该版本 macOS App 可能在应用内更新后 **每次启动即崩溃**
  - 相关问题：[#156861](https://github.com/openclaw/openclaw/issues/156861)
  - 官方已将 2026.9.6 从 Sparkle 更新源撤回
  - 2026.9.7 macOS 热修复正在进行中
  - 如 App 已无法启动，建议重新安装 2026.9.5 macOS 构建

### 破坏性影响与迁移注意事项

1. **macOS 用户**
   - 不建议通过应用内更新升级至 2026.9.6。
   - 已升级且无法启动的用户，应回退安装 2026.9.5。
   - 建议等待 2026.9.7 hotfix。

2. **自动更新机制**
   - 今日相关 PR [`#156972`](https://github.com/openclaw/openclaw/pull/156972) 正在修复 macOS 托管更新 handoff 激活失败问题，说明更新链路仍是当前重点风险区。

3. **维护者关注点**
   - 当前 release 已出现用户可感知的启动级回归，应考虑在后续发布中加强：
     - macOS in-app update 流程 E2E 验证
     - Sparkle feed 回滚机制
     - 更新后首次启动 smoke test
     - managed updater 权限/authority scope 验证

---

## 3. 项目进展

过去 24 小时共有 44 条 PR 更新，其中 6 条已合并或关闭。由于数据中未明确区分 “merged” 与 “closed without merge”，以下按“已关闭/完成处理”归纳。

### 已关闭/完成处理的重要 PR

#### 1. 命令系统重构：减少重复实现

- PR：[`#156931 refactor(commands): deslop commands`](https://github.com/openclaw/openclaw/pull/156931)
- 状态：Closed
- 标签：`gateway`、`commands`、`agents`、`size: XL`、`security-sensitive-changed`
- 影响：
  - 清理 Doctor、onboarding、models、status reporting 等命令路径中的重复 result projection、导航循环、policy lookup 和 forwarding 逻辑。
  - 声称无用户可见行为变更。
- 风险：
  - 标记了 `merge-risk: compatibility` 和 `security-sensitive-changed`，说明该重构虽然目标是内部质量提升，但涉及兼容性与安全敏感路径。

#### 2. 飞书通道重构

- PR：[`#156832 refactor(feishu): deslop Feishu`](https://github.com/openclaw/openclaw/pull/156832)
- 状态：Closed
- 标签：`channel: feishu`、`size: XL`
- 影响：
  - 清理飞书通道中重复的 tool registration、client admission、CardKit 请求、reply delivery 逻辑。
  - 目标是降低通道行为一致性维护成本。
- 用户影响：
  - 无预期行为变化。
- 项目意义：
  - 表明 OpenClaw 正在系统性清理多渠道 transport 层的技术债。

#### 3. Gateway runtime 与 worker environment 重构

- PR：[`#156759 refactor(gateway): deslop worker environments and gateway runtime`](https://github.com/openclaw/openclaw/pull/156759)
- 状态：Closed
- 标签：`gateway`、`size: XL`、`security-sensitive-changed`
- 影响：
  - 清理 Gateway runtime 与 worker environment 中重复的 admission、lifecycle validation、transport adapter、result projection 等逻辑。
- 风险：
  - 标记兼容性风险和安全敏感变更。
- 项目意义：
  - 对稳定性有长期收益，但短期需要严格回归验证，尤其是消息投递、会话权限和 worker 生命周期。

#### 4. 自动化 Prompt Markdown 预览功能尝试

- PR：[`#156981 feat(ui): restore rendered Markdown preview for automation prompts`](https://github.com/openclaw/openclaw/pull/156981)
- 状态：Closed
- 关联 Issue：[`#154036`](https://github.com/openclaw/openclaw/issues/154036)
- 影响：
  - 尝试在自动化/cron 编辑器中恢复只读 Markdown 渲染预览。
- 解读：
  - 虽然该 PR 已关闭，但它反映出用户对自动化 prompt 可读性、可审阅性的需求仍在。
  - 该方向可能会以更小范围或更符合上下文的方式重新进入路线图。

### 今日仍在推进的关键 PR

#### 1. 修复 cron/global session 投递到错误 agent

- PR：[`#156970 fix(cron): keep global-session deliveries on the selected agent`](https://github.com/openclaw/openclaw/pull/156970)
- 状态：Open，ready for maintainer look
- 优先级：P1
- 风险：`message-delivery`
- 影响：
  - 修复多个 agent 存在 raw `global` session 时，自动化可能使用另一个 agent 保存的 delivery destination。
- 重要性：
  - 对多 agent 用户非常关键，直接影响自动化消息是否投递给正确主体。

#### 2. 修复 cron 公告上下文丢失

- PR：[`#156962 fix(cron): retain command announcements in destination conversation context`](https://github.com/openclaw/openclaw/pull/156962)
- 状态：Open，waiting on author
- 关联 Issue：[`#156754`](https://github.com/openclaw/openclaw/issues/156754)
- 优先级：P1
- 影响：
  - 修复用户回复 cron announcement 后，agent 看不到此前计划消息上下文的问题。
- 项目意义：
  - 这是自动化与对话连续性的重要修复。

#### 3. 修复 Gateway 读取存储消息时阻塞

- PR：[`#156772 fix: gateway stalls while reading stored messages`](https://github.com/openclaw/openclaw/pull/156772)
- 状态：Open，waiting on author
- 优先级：P1
- 影响：
  - 将 stored-message lookup 和 message counts 从 Gateway 主线程移出，降低 Gateway stall 风险。
- 项目意义：
  - 对大规模会话、历史消息多的用户非常重要。

#### 4. Doctor 支持显式修复 SQLite index-only corruption

- PR：[`#156761 fix(state): repair index-only corruption explicitly in Doctor`](https://github.com/openclaw/openclaw/pull/156761)
- 状态：Open，ready for maintainer look
- 优先级：P0
- 关联：[`#156424`](https://github.com/openclaw/openclaw/issues/156424)、[`#126821`](https://github.com/openclaw/openclaw/issues/126821)
- 影响：
  - 为 SQLite index-only corruption 提供 `openclaw doctor --fix` 修复路径。
- 重要性：
  - P0，且涉及数据完整性，是当前最值得维护者优先审查的 PR 之一。

---

## 4. 社区热点

> 注：PR 数据中评论数显示为 `undefined`，因此无法精确按评论数排序。以下依据优先级、标签、风险范围、Issue 评论数和用户影响综合判断热点。

### 1. macOS 2026.9.6 启动崩溃与更新链路问题

- Release：[`v2026.9.6`](https://github.com/openclaw/openclaw/releases/tag/v2026.9.6)
- 相关 Issue：[`#156861`](https://github.com/openclaw/openclaw/issues/156861)
- 相关 PR：[`#156972 fix(update): allow verified macOS handoffs to activate`](https://github.com/openclaw/openclaw/pull/156972)

**背后诉求：**
- 用户需要可靠的桌面端更新体验。
- 更新流程不能在通过校验后因 authority scope 或 service stop 失败而无法激活。
- 当前问题已达到“发布后撤回”的严重程度，说明 release gate 需要增强。

### 2. 自动化 cron / agentTurn 的可靠性

- Issue：[`#156982 Scheduled agentTurn runs intermittently fail`](https://github.com/openclaw/openclaw/issues/156982)
- Issue：[`#156983 Completed cron agentTurn announce delivery fails`](https://github.com/openclaw/openclaw/issues/156983)
- PR：[`#156970 fix(cron): keep global-session deliveries on the selected agent`](https://github.com/openclaw/openclaw/pull/156970)
- PR：[`#156962 fix(cron): retain command announcements in destination conversation context`](https://github.com/openclaw/openclaw/pull/156962)

**背后诉求：**
- 用户正在把 OpenClaw 用作长期运行的自动化 agent，而不是一次性聊天工具。
- cron 任务需要具备：
  - 可恢复性
  - 正确会话绑定
  - 正确 announce delivery
  - 与用户并发消息交互时不丢失上下文
- 这类问题会直接影响用户对“个人 AI 助手可托付性”的信任。

### 3. Gateway、session-state 与 message-delivery 风险集中

- PR：[`#156941 fix(gateway): keep chat admission bound to current session authority`](https://github.com/openclaw/openclaw/pull/156941)
- PR：[`#156919 fix: return child followup results after yielding`](https://github.com/openclaw/openclaw/pull/156919)
- PR：[`#156978 fix: complete session archiving after the agent finishes`](https://github.com/openclaw/openclaw/pull/156978)
- PR：[`#156772 fix: gateway stalls while reading stored messages`](https://github.com/openclaw/openclaw/pull/156772)

**背后诉求：**
- 多 agent、多 session、子 agent、异步 followup、自动归档等能力已经进入复杂并发阶段。
- 用户关注的不再只是“能否回复”，而是：
  - 回复是否来自正确 session
  - 子任务完成后结果是否能返回
  - 会话归档是否真正执行
  - Gateway 是否在高负载下卡死

### 4. 多渠道稳定性：Discord、Telegram、Feishu、Bun Runtime

- PR：[`#156965 fix(discord): restore REST lookups under Bun`](https://github.com/openclaw/openclaw/pull/156965)
- PR：[`#156979 fix(discord): keep voice connect budget monotonic across clock skew`](https://github.com/openclaw/openclaw/pull/156979)
- PR：[`#156627 refactor(discord): keep thread-binding storage off the gateway event loop`](https://github.com/openclaw/openclaw/pull/156627)
- PR：[`#156688 refactor(telegram): persist topic bindings through SQLite workers`](https://github.com/openclaw/openclaw/pull/156688)
- PR：[`#156832 refactor(feishu): deslop Feishu`](https://github.com/openclaw/openclaw/pull/156832)

**背后诉求：**
- OpenClaw 的定位正在从单一客户端扩展到多通信渠道中枢。
- 用户期望 Discord、Telegram、Feishu 等通道在权限、线程绑定、REST 查询、消息上下文方面表现一致。
- 维护者正在将同步 SQLite 操作移出 Gateway event loop，这是健康的架构方向。

---

## 5. Bug 与稳定性

### P0 / 发布级风险

#### 1. macOS 2026.9.6 App 启动崩溃

- Release：[`v2026.9.6`](https://github.com/openclaw/openclaw/releases/tag/v2026.9.6)
- 相关 Issue：[`#156861`](https://github.com/openclaw/openclaw/issues/156861)
- 严重程度：发布阻断级
- 影响：
  - macOS App 可能更新后每次启动崩溃。
  - 版本已从 Sparkle feed 撤回。
- Fix 状态：
  - 2026.9.7 hotfix 正在进行中。
  - 相关更新链路 PR：[`#156972`](https://github.com/openclaw/openclaw/pull/156972)

#### 2. SQLite index-only corruption 修复路径

- PR：[`#156761 fix(state): repair index-only corruption explicitly in Doctor`](https://github.com/openclaw/openclaw/pull/156761)
- 严重程度：P0
- 影响：
  - 数据状态层存在 index-only corruption 场景，需要 Doctor 提供显式修复能力。
- Fix 状态：
  - PR 已开放，ready for maintainer look。

---

### P1 高优先级稳定性问题

#### 3. OAuth 路由上 model-runtime publication 被 superseded 后错误 fallback，导致误导性 quota/billing 报错

- Issue：[`#156975`](https://github.com/openclaw/openclaw/issues/156975)
- 状态：Open
- 标签：`P1`、`impact:message-loss`、`impact:auth-provider`
- 评论：2
- 问题摘要：
  - 内部 `prepared model runtime publication was superseded` 失败被送入 provider fallback。
  - fallback 到 OAuth provider 后暴露为 quota/billing 错误，掩盖真实 runtime failure。
- 用户影响：
  - 用户看到的是“额度不足/计费错误”，但实际根因可能是 runtime publication 被 superseded。
  - 会造成误判、错误排查方向和消息丢失风险。
- Fix PR：
  - 暂未在今日数据中看到明确对应 PR。

#### 4. Linux companion Tauri 附件读取卡住，发送按钮停在 “Preparing attachments…”

- Issue：[`#156956`](https://github.com/openclaw/openclaw/issues/156956)
- 状态：Open
- 标签：`P1`、`impact:ux-friction`
- 评论：2
- 问题摘要：
  - Linux desktop companion 中添加图片附件后，WebKitGTK FileReader 卡住。
  - pending attachment-read counter 未重置，导致发送按钮一直 disabled。
- 用户影响：
  - 无法发送带附件消息。
  - 必须移除附件才能恢复。
- Fix PR：
  - 暂未看到明确对应 PR。

#### 5. cron agentTurn 间歇失败：attempt disposed before transcript write

- Issue：[`#156982`](https://github.com/openclaw/openclaw/issues/156982)
- 状态：Open
- 评论：1
- 环境：
  - OpenClaw 2026.9.5
  - Gateway systemd service
  - Linux x64 NAS
  - Node v24.21.0
  - cron agentTurn，Telegram announce
- 用户影响：
  - 定时 agent 运行过程中 Gateway 仍存活，但任务写 transcript 前 attempt 已 disposed。
- 相关 PR：
  - cron/message delivery 方向相关：[`#156970`](https://github.com/openclaw/openclaw/pull/156970)、[`#156962`](https://github.com/openclaw/openclaw/pull/156962)
  - 但今日数据中未能确认有一一对应修复。

#### 6. cron agentTurn 完成后 announce delivery 与并发 inbound message 冲突

- Issue：[`#156983`](https://github.com/openclaw/openclaw/issues/156983)
- 状态：Open
- 评论：1
- 问题摘要：
  - cron agentTurn 已完成，但 announce delivery 在目标 session 中遇到并发 inbound message。
  - 失败信息为 `session rebound for sessionKey`。
- 用户影响：
  - 定时任务可能完成但无法正确通知用户。
  - 典型并发 session-state 问题。
- 相关 PR：
  - [`#156970`](https://github.com/openclaw/openclaw/pull/156970)
  - [`#156962`](https://github.com/openclaw/openclaw/pull/156962)
  - [`#156941`](https://github.com/openclaw/openclaw/pull/156941)

#### 7. macOS Homebrew Node 升级后，LaunchAgent Gateway 持有旧 Node 路径但 `status --deep` 未发现

- Issue：[`#156976`](https://github.com/openclaw/openclaw/issues/156976)
- 状态：Open
- 评论：1
- 问题摘要：
  - Homebrew `node@24` 升级后，正在运行的 macOS LaunchAgent Gateway 仍持有旧 Node 路径。
  - `openclaw status --deep` 仍报告 Gateway 和 Discord channel 健康，但 Discord 实际可能异常。
- 用户影响：
  - 健康检查给出假阳性。
  - 用户可能误以为系统正常。
- Fix PR：
  - 今日未看到明确对应 PR。
  - macOS 更新链路相关可关注 [`#156972`](https://github.com/openclaw/openclaw/pull/156972)，但它不是该问题的直接修复。

---

### P2 / P3 与性能、体验相关问题

#### 8. Prompt cache 每轮失效

- Issue：[`#156977`](https://github.com/openclaw/openclaw/issues/156977)
- 状态：Closed
- 标签：`P2`
- 问题摘要：
  - tool-set membership change 与 dynamic system-prompt suffix 导致 cached prefix 被擦除。
  - provider cache read dropped 明显增加，cache-read tokens 在单次 run 内显著下降。
- 用户影响：
  - 成本上升。
  - 响应性能下降。
  - prefix-cache provider 的收益被削弱。
- Fix 状态：
  - Issue 已关闭，但今日数据中未显示对应 PR。

---

## 6. 功能请求与路线图信号

### 1. 自动化编辑器 Markdown 预览

- PR：[`#156981 feat(ui): restore rendered Markdown preview for automation prompts`](https://github.com/openclaw/openclaw/pull/156981)
- 关联 Issue：[`#154036`](https://github.com/openclaw/openclaw/issues/154036)
- 状态：Closed
- 路线图信号：
  - 用户希望在自动化 prompt 编辑时能看到渲染后的 Markdown，降低复杂 prompt 的审阅成本。
  - 虽然该 PR 已关闭，但需求本身仍有价值，可能以更安全、更小范围的 UI 改动重新出现。

### 2. 自动化 timing 配置体验修复

- PR：[`#156974 fix(ui): automation exact timing switches back on after Save`](https://github.com/openclaw/openclaw/pull/156974)
- 状态：Open
- 影响：
  - 修复 hourly automation 保存后 Exact timing 自动重新开启、Stagger window 清空后旧值恢复的问题。
- 路线图信号：
  - 自动化配置正在成为核心使用路径。
  - 用户需要更可预测的调度 UI，尤其是 exact timing、stagger window 等细节。

### 3. QA Lab 工作量边界与 review 控制

- PR：[`#156980 fix(skills): bound QA work and review overhead`](https://github.com/openclaw/openclaw/pull/156980)
- 状态：Open
- 影响：
  - 防止 Auto QA 将未限定的 audit 扩大为 100-fix campaign。
  - 为 review planning 增加更明确的控制。
- 路线图信号：
  - OpenClaw 正在增强内部 agent/QA 自动化能力，但需要控制成本和范围。
  - “可控自动化”将成为后续重点。

### 4. Native 客户端工作过程展示改进

- iOS PR：[`#156944 fix(ios): keep agent narration visible during runs`](https://github.com/openclaw/openclaw/pull/156944)
- Android PR：[`#156950 improve(android): show tool outcomes in collapsed work`](https://github.com/openclaw/openclaw/pull/156950)
- 相关 Issue：[`#156926`](https://github.com/openclaw/openclaw/issues/156926)
- 路线图信号：
  - 用户不仅关心最终答案，也关心 agent 工作过程、tool outcome、运行中 narration 是否可见。
  - Native App 正在向更透明的 agent UX 演进。

### 5. 插件 hook 与模型选择扩展

- PR：[`#156971 fix(agents): call before_model_resolve on the CLI dispatch path`](https://github.com/openclaw/openclaw/pull/156971)
- 关联 Issue：[`#156038`](https://github.com/openclaw/openclaw/issues/156038)
- 路线图信号：
  - 插件希望在 CLI-dispatched turns 中动态替换模型。
  - 这说明 OpenClaw 的模型选择层正在向更可编程、更可扩展方向发展。

---

## 7. 用户反馈摘要

### 1. 自动化用户：需要“长期可靠运行”，不是偶尔成功

代表问题：

- [`#156982`](https://github.com/openclaw/openclaw/issues/156982)
- [`#156983`](https://github.com/openclaw/openclaw/issues/156983)
- [`#156970`](https://github.com/openclaw/openclaw/pull/156970)
- [`#156962`](https://github.com/openclaw/openclaw/pull/156962)

用户场景：
- 在 Linux NAS 上以 systemd 方式长期运行 Gateway。
- 使用 cron 在工作日定时触发 agentTurn。
- 通过 Telegram announce 接收结果。

痛点：
- cron 运行间歇失败。
- 完成后通知可能因 session 并发变化失败。
- 多 agent/global session 下可能投递到错误 agent。
- 用户期望 OpenClaw 成为“可托付的个人自动化代理”，而不是需要频繁人工排障的工具。

### 2. 桌面端用户：更新和附件体验必须稳定

代表问题：

- Release [`v2026.9.6`](https://github.com/openclaw/openclaw/releases/tag/v2026.9.6)
- [`#156956`](https://github.com/openclaw/openclaw/issues/156956)
- [`#156976`](https://github.com/openclaw/openclaw/issues/156976)

用户痛点：
- macOS App 更新后可能无法启动，属于高挫败体验。
- Linux companion 图片附件读取卡死，直接阻断发送。
- `status --deep` 健康检查不准确，降低用户对诊断工具的信任。

### 3. 多渠道用户：希望 Discord、Telegram、Feishu 等通道行为一致

代表 PR：

- [`#156965`](https://github.com/openclaw/openclaw/pull/156965)
- [`#156979`](https://github.com/openclaw/openclaw/pull/156979)
- [`#156627`](https://github.com/openclaw/openclaw/pull/156627)
- [`#156688`](https://github.com/openclaw/openclaw/pull/156688)
- [`#156832`](https://github.com/openclaw/openclaw/pull/156832)

用户痛点：
- Discord 在 Bun 下连接看似正常，但 REST metadata 和 reaction handling 失败。
- 系统时钟变化可能影响 Discord voice connect。
- Telegram/Discord thread binding 的 SQLite 同步操作可能拖慢 Gateway。
- 用户希望不同渠道在会话绑定、消息投递、权限和上下文保持方面一致可靠。

### 4. Agent 透明度用户：希望看到运行过程与工具结果

代表 PR：

- [`#156944`](https://github.com/openclaw/openclaw/pull/156944)
- [`#156950`](https://github.com/openclaw/openclaw/pull/156950)

用户诉求：
- 在 iOS 上，agent 运行或重连时 narration 不应消失。
- 在 Android 上，折叠 finished work 后仍应能看到 earlier tool problems。
- 说明用户正在把 agent 的“过程可解释性”视为核心体验，而不是附属 UI。

---

## 8. 待处理积压

> 今日数据仅覆盖过去 24 小时，无法完整判断“长期未响应”。以下列出当前仍开放、优先级高或风险标签重、需要维护者重点关注的积压项。

### 最高优先级

#### 1. P0：SQLite index-only corruption Doctor 修复

- PR：[`#156761`](https://github.com/openclaw/openclaw/pull/156761)
- 状态：Open，ready for maintainer look
- 原因：
  - P0。
  - 涉及数据完整性与 Doctor 修复能力。
  - 应优先完成 review、合并和回归验证。

#### 2. macOS 2026.9.6 崩溃 hotfix

- Release：[`v2026.9.6`](https://github.com/openclaw/openclaw/releases/tag/v2026.9.6)
- Issue：[`#156861`](https://github.com/openclaw/openclaw/issues/156861)
- 相关 PR：[`#156972`](https://github.com/openclaw/openclaw/pull/156972)
- 原因：
  - 影响发布信誉。
  - 已发生用户可感知崩溃。
  - 应尽快完成 2026.9.7 hotfix。

### P1 待处理

#### 3. Model runtime superseded 被错误 fallback，掩盖真实错误

- Issue：[`#156975`](https://github.com/openclaw/openclaw/issues/156975)
- 状态：Open
- 原因：
  - P1。
  - 影响 message loss 与 auth provider 错误展示。
  - 暂未看到明确 fix PR。

#### 4. Linux companion 附件读取 pending counter 不重置

- Issue：[`#156956`](https://github.com/openclaw/openclaw/issues/156956)
- 状态：Open
- 原因：
  - P1。
  - 直接阻断带附件发送。
  - 暂未看到明确 fix PR。

#### 5. cron/global session 投递、上下文保留、并发 session rebinding

- Issue：[`#156982`](https://github.com/openclaw/openclaw/issues/156982)
- Issue：[`#156983`](https://github.com/openclaw/openclaw/issues/156983)
- PR：[`#156970`](https://github.com/openclaw/openclaw/pull/156970)
- PR：[`#156962`](https://github.com/openclaw/openclaw/pull/156962)
- 原因：
  - 自动化可靠性是个人 AI 助手类产品的核心。
  - 当前多个问题都指向 session-state、delivery 和并发处理。

#### 6. Gateway 读取 stored messages 时阻塞

- PR：[`#156772`](https://github.com/openclaw/openclaw/pull/156772)
- 状态：Open，waiting on author
- 原因：
  - P1。
  - 影响 Gateway 可用性和消息投递时延。
  - 建议尽快补齐 native verification 与截图证据。

### 需要补证据或作者响应

#### 7. Discord thread-binding SQLite worker 化

- PR：[`#156627`](https://github.com/openclaw/openclaw/pull/156627)
- 状态：Open，waiting on author
- 风险：`message-delivery`、`availability`
- 原因：
  - 大型 XL 重构，且涉及 Gateway event loop 与 Discord delivery。
  - 需要充分 E2E 证据。

#### 8. Telegram topic binding SQLite worker 化

- PR：[`#156688`](https://github.com/openclaw/openclaw/pull/156688)
- 状态：Open，waiting on author
- 风险：`compatibility`、`session-state`、`availability`
- 原因：
  - 对 Telegram topic-bound conversations 影响较大。
  - 应补齐 telegram-e2e 证据后再合并。

#### 9. GitHub links 不应打开只读 reader

- PR：[`#156964`](https://github.com/openclaw/openclaw/pull/156964)
- 状态：Open，waiting on author
- 原因：
  - 涉及 web-ui、gateway、commands、GitHub extension。
  - 已标记 `dependencies-changed` 和 `security-sensitive-changed`。
  - 需要谨慎审查链接打开路径和安全边界。

---

## 项目健康度评估

- **活跃度：高**  
  24 小时内 44 条 PR 更新、6 条 Issue 更新，维护和贡献活动非常密集。

- **稳定性：中等偏紧张**  
  macOS 2026.9.6 发布级回归、P0 数据修复、P1 cron/Gateway/消息投递问题集中出现，说明当前主线处于高变更高风险阶段。

- **产品方向：清晰**  
  项目正在强化：
  - 自动化 cron/agentTurn
  - 多 agent session-state
  - 多渠道消息投递
  - Native App agent 过程展示
  - Gateway SQLite worker 化
  - Doctor 自修复能力

- **建议维护优先级：**
  1. 先完成 macOS 2026.9.7 hotfix 与更新链路验证。
  2. 优先合并或处理 P0/P1 的数据完整性、cron 投递、Gateway stall 修复。
  3. 对 XL 级重构 PR 严格要求 E2E 证据，避免在 release 回归期继续扩大风险面。
  4. 为 `status --deep`、自动化、附件上传等高频用户路径补充更强的端到端诊断与回归测试。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向分析报告  
日期：2026-09-24

---

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态呈现出明显的 **高活跃、高复杂度、高稳定性压力** 特征。OpenClaw、Hermes Agent、NanoBot、ZeroClaw、CoPaw 等项目都在快速修复核心链路问题，重点集中于 **Gateway、会话状态、消息投递、上下文压缩、Provider 兼容、多渠道集成与工具调用安全**。

整体看，生态已经从“单轮聊天助手”进入“长期运行的多渠道、多 Agent、可自动化执行的个人/团队智能体平台”阶段。用户反馈也从基础功能可用，转向更高阶的要求：**能否长期可靠运行、能否正确保持上下文、能否安全执行工具、能否接入企业环境、能否解释自身状态**。

不过，多个项目同时暴露出发布回归、数据一致性、会话并发、Provider 适配和桌面端稳定性问题，说明当前生态仍处于快速演进期，成熟度尚未完全匹配其功能复杂度。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 今日状态摘要 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 6 | 44 | v2026.9.6 已发布，但 macOS 更新撤回 | Gateway、cron、session-state、多渠道、SQLite 修复密集推进；macOS App 存在启动崩溃热修复压力 | **高活跃，但稳定性紧张** |
| **Hermes Agent** | 50 | 50 | 无 | Desktop、Gateway、认证、本地模型、MCP、CLI 多线修复；大量 Issue 当日有对应 PR | **极高活跃，修复响应快，但待合并压力大** |
| **NanoBot** | 2 | 17 | 无 | 上下文压缩、Memory 并发、Provider 多模态、WebUI 权限、CLI onboarding 修复集中 | **高活跃，核心稳定性持续加固** |
| **ZeroClaw** | 2 | 17 | 无 | Antigravity CLI、channel sender role、runtime trim、安全 shell policy、CI 优化并行推进 | **高开发活跃，但 17 个 PR 均未合并，Review backlog 明显** |
| **CoPaw** | 3 | 10 | 无 | Moonshot schema、流式 Provider 恢复、模型配置错误可观测性、A2A server 需求 | **活跃健康，企业化与互操作信号增强** |
| **NanoClaw** | 1 | 9 | v2.4.0 | 凭据网关、Iron Proxy、Mattermost、安装升级、容器生命周期修复 | **发布节奏稳定，运维可靠性增强中** |
| **LobsterAI** | 0 | 7 | 2026.9.23 | OpenClaw 配置热更新、插件降级启动、Cowork 可观测性、实验性决策模型 | **发布活跃，产品体验和运行时稳定性并进** |
| **IronClaw** | 0 | 2 | 无正式发布，1.4.1-rc.2 准备中 | 安全依赖更新、skill 文档澄清 | **低噪声维护，质量巩固阶段** |
| PicoClaw | 0 | 0 | 无 | 无活动 | **静默** |
| NanoClaw? Wait already included | - | - | - | - | - |
| NullClaw | 0 | 0 | 无 | 无活动 | **静默** |
| TinyClaw | 0 | 0 | 无 | 无活动 | **静默** |
| Moltis | 0 | 0 | 无 | 无活动 | **静默** |
| ZeptoClaw | 0 | 0 | 无 | 无活动 | **静默** |

> 注：部分数据仅覆盖过去 24 小时，不代表长期活跃度。

---

## 3. OpenClaw 在生态中的定位

### 3.1 定位概括

OpenClaw 是当前样本中最典型的 **多渠道、长运行、自动化个人 AI 助手平台**。它不仅覆盖桌面端、Gateway、Discord、Telegram、Feishu 等多入口，还在持续强化 cron 自动化、多 Agent 会话状态、消息投递、Doctor 自修复和 SQLite worker 化。

与 NanoBot 偏向 **上下文压缩 / Memory / Provider 适配**、ZeroClaw 偏向 **coding CLI 工具代理与安全策略**、NanoClaw 偏向 **多通道部署与凭据网关** 相比，OpenClaw 的核心差异在于：它更像一个正在走向生产级的 **个人 AI 操作系统 / 消息中枢 / 自动化代理运行时**。

### 3.2 优势

1. **社区与开发活跃度高**  
   过去 24 小时 44 条 PR 更新，仅次于 Hermes Agent 的 50 条，明显高于多数项目。

2. **多渠道能力领先**  
   今日涉及 Discord、Telegram、Feishu、macOS App、Gateway、cron 等多个入口和 transport 层，说明 OpenClaw 已不只是单客户端助手，而是多通信渠道中枢。

3. **自动化场景深入**  
   cron agentTurn、global session delivery、announcement context、session rebinding 等问题表明用户已在真实长期任务中使用 OpenClaw。

4. **自修复与诊断能力增强**  
   `openclaw doctor --fix` 针对 SQLite index-only corruption 的 P0 修复路径，是成熟运行时系统的重要标志。

### 3.3 当前短板

1. **发布质量压力突出**  
   v2026.9.6 macOS App 出现启动级崩溃并撤回 Sparkle feed，这是今日所有项目中最严重的 release regression 之一。

2. **高并发状态复杂度上升**  
   多 agent、global session、子 agent followup、session archiving、cron delivery 等路径同时出问题，说明架构能力已进入复杂并发阶段。

3. **XL 重构风险较高**  
   Gateway、commands、Feishu 等多个 XL 重构带有 `security-sensitive-changed`、`compatibility` 标签，短期需要更强 E2E gate。

### 3.4 社区规模对比

| 项目 | 今日 PR 活跃度 | Issue 活跃度 | 社区状态 |
|---|---:|---:|---|
| Hermes Agent | 50 | 50 | 最大声量，问题和修复同步爆发 |
| OpenClaw | 44 | 6 | 核心开发极活跃，用户反馈集中在稳定性 |
| NanoBot | 17 | 2 | 修复密度高，维护响应快 |
| ZeroClaw | 17 | 2 | 开发活跃但合并吞吐偏低 |
| CoPaw | 10 | 3 | 企业化需求开始显现 |
| NanoClaw | 9 | 1 | 发布驱动，运维能力增强 |
| LobsterAI | 7 | 0 | 产品发布节奏稳定，社区反馈较少 |

OpenClaw 在活跃度上处于第一梯队，仅次于 Hermes Agent；但在稳定性压力上也处于第一梯队。

---

## 4. 共同关注的技术方向

### 4.1 会话状态、消息投递与多 Agent 并发

涉及项目：**OpenClaw、Hermes Agent、ZeroClaw、NanoClaw、CoPaw**

共同诉求：

- 消息必须投递到正确 agent / session；
- 长任务、cron、子任务、重启恢复后不能丢上下文；
- 并发 inbound message 不应破坏 session binding；
- Gateway / channel runtime 需要更强一致性。

代表案例：

- OpenClaw：cron global session 投递到错误 agent、announcement context 丢失、Gateway stored messages stall。
- Hermes Agent：Slack startup resume placeholder、stale heartbeat 被当成用户 turn、Bot Screen profile route 错误。
- ZeroClaw：channel turns by sender role、runtime trim target 与 model capacity 区分。
- NanoClaw：warm turn transcript rotation。
- CoPaw：流式 Provider 卡住后的 quarantine 恢复。

**判断：** 会话状态一致性已经成为智能体平台的基础能力，不再是边缘问题。

---

### 4.2 长上下文、Memory 与压缩治理

涉及项目：**NanoBot、OpenClaw、NanoClaw、Hermes Agent**

共同诉求：

- 长会话不能无限增长；
- 历史压缩不能丢状态；
- 工具输出、大文件读取、pending delta 也要纳入预算治理；
- memory/history 数据必须具备并发一致性。

代表案例：

- NanoBot：Codex compaction state、oversized pending file reads、history compaction 并发覆盖、idle transcript replacement 阈值。
- OpenClaw：SQLite index-only corruption Doctor 修复、stored messages 读取阻塞。
- NanoClaw：warm turns transcript rotation。
- Hermes Agent：memory/skills 被自主更新、需要 pinned / immutable 控制。

**判断：** Memory 不再只是“存更多内容”，而是涉及压缩策略、恢复质量、并发写入、可审计修改与用户控制权。

---

### 4.3 Provider 兼容与模型路由

涉及项目：**NanoBot、Hermes Agent、CoPaw、ZeroClaw、LobsterAI**

共同诉求：

- 不同 Provider 的 schema、payload、多模态、streaming 行为差异需要被适配层屏蔽；
- 用户需要更灵活的模型发现、路由和决策机制；
- 本地模型与远端模型都要稳定可用。

代表案例：

- NanoBot：IO Intelligence provider、deepseek-flash 图片输入修复、CLI onboarding 复用 WebUI model discovery。
- Hermes Agent：Ollama tool-only payload、Linux NVIDIA 本地模型不可用、Nous Portal outage 误判认证失败。
- CoPaw：Moonshot / kimi-k3 拒绝 MCP tool schema。
- ZeroClaw：Antigravity CLI 集成、search_routes RFC。
- LobsterAI：实验性 Jev decision model tool。

**判断：** Provider 适配层正在成为 AI 助手项目的核心竞争力之一。

---

### 4.4 多渠道与企业协作平台集成

涉及项目：**OpenClaw、Hermes Agent、NanoClaw、CoPaw**

共同诉求：

- Slack、Discord、Telegram、Feishu、Teams、Mattermost 等通道行为要一致；
- bot identity、thread binding、topic binding、display name、profile routing 不能混乱；
- 企业用户需要更强的配置、权限和诊断能力。

代表案例：

- OpenClaw：Discord、Telegram、Feishu transport 稳定性和 SQLite worker 化。
- Hermes Agent：Slack resume、Teams acknowledgement、Desktop Bot Screen profile。
- NanoClaw：Mattermost channel、Teams bot display name 传递、Slack/Teams prompt name 一致性。
- CoPaw：A2A server 需求、可禁用预置模型和频道。

**判断：** 多渠道已经从“接入更多平台”进入“跨平台一致性和企业治理”阶段。

---

### 4.5 安全边界与权限控制

涉及项目：**ZeroClaw、NanoBot、Hermes Agent、OpenClaw、NanoClaw**

共同诉求：

- 工具执行必须有清晰的 hard block；
- WebUI / Gateway / credential gateway 需要严格身份边界；
- 插件、skills、credentials、memory 修改都需要更强控制。

代表案例：

- ZeroClaw：高风险 shell 命令即使 allowlist 命中也应阻断。
- NanoBot：WebUI Full Access 必须要求 handshake headers。
- Hermes Agent：auth outage 不应误判 token failure；skills/memory 需要 pinned guard。
- OpenClaw：多处 `security-sensitive-changed` PR，涉及 Gateway、commands、GitHub links。
- NanoClaw：OneCLI gateway ownership check 不应只依赖 group existence。

**判断：** Agent 能执行越多，安全边界就越重要；“默认安全失败”正在成为共识。

---

### 4.6 可观测性、诊断与用户信任

涉及项目：**OpenClaw、Hermes Agent、CoPaw、LobsterAI、NanoBot**

共同诉求：

- 错误不能被错误分类；
- 用户需要看到 agent 正在做什么；
- 健康检查不能假阳性；
- 配置、Provider、插件状态需要可解释。

代表案例：

- OpenClaw：`status --deep` 未发现 LaunchAgent 持有旧 Node 路径。
- Hermes Agent：Settings → Integrations 显示 SDK/MCP/model sync 状态需求。
- CoPaw：模型探测错误、active model config 错误、邀请失败原因细分。
- LobsterAI：Cowork per-step progress、diff stats、ActivityStepLine。
- NanoBot：mid-turn injected messages 日志增强、session storage conflict 提前解释。

**判断：** 可观测性正在从开发者调试能力，变成终端用户体验的一部分。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构特点 | 差异化关键词 |
|---|---|---|---|---|
| **OpenClaw** | 多渠道个人 AI 助手、cron 自动化、Gateway、session-state、Doctor | 高级个人用户、长期运行 agent 用户、多渠道用户 | Gateway 中心化、多 transport、多 agent session、SQLite worker 化 | **个人 AI 操作系统 / 自动化中枢** |
| **Hermes Agent** | Desktop/Bot、Gateway、CLI、本地模型、MCP、认证 | 桌面用户、本地模型用户、企业集成用户 | Desktop + Gateway + MCP + local model provider | **桌面智能体平台 / 本地模型集成** |
| **NanoBot** | Memory、上下文压缩、Provider、CLI/WebUI | 开发者、长上下文任务用户、代码分析用户 | MemoryStore、compaction pipeline、Provider catalog | **长上下文与 Memory 治理** |
| **ZeroClaw** | coding CLI 代理、channel runtime、安全策略、CI 工程 | 开发者、代码代理工作流用户、安全敏感自动化用户 | 多 coding CLI tool、runtime channel、policy engine | **编码代理编排 / 安全执行策略** |
| **CoPaw** | Provider 兼容、Console、A2A、存储后端演进 | 企业部署用户、Agent 网络集成者 | Provider normalization、async storage、A2A server 规划 | **企业 Agent 互操作平台** |
| **NanoClaw** | 多通道部署、凭据网关、skills、长期记忆 | 运维者、团队部署者、多通道企业用户 | credential gateway、skills install、containerized deployment | **部署运维型多通道 Agent 平台** |
| **LobsterAI** | 产品化 AI 助手、Cowork、OpenClaw 集成、决策模型 | 终端用户、产品化 Agent 用户 | Electron/renderer/main + OpenClaw runtime + MCP bridge | **产品体验与 Agent 可观测性** |
| **IronClaw** | skill 体系、发布质量、安全依赖 | 稳定部署用户、skill 开发者 | scoped virtual skill roots、RC 发布流程 | **低噪声质量巩固型项目** |

---

## 6. 社区热度与成熟度

### 6.1 快速迭代阶段

代表项目：**Hermes Agent、OpenClaw、NanoBot、ZeroClaw**

特征：

- PR 和 Issue 更新密集；
- 用户反馈集中在核心路径；
- 修复与重构并行；
- 稳定性风险较高。

其中：

- **Hermes Agent** 是今日声量最高项目，50 Issue + 50 PR，覆盖面极广。
- **OpenClaw** 是最接近“个人 AI 助手操作系统”的项目，但发布质量压力最明显。
- **NanoBot** 在 Memory/compaction 方向迭代最集中。
- **ZeroClaw** 开发活跃但合并吞吐不足，17 个开放 PR 无合并，短期 review 风险较高。

### 6.2 发布驱动与产品化阶段

代表项目：**NanoClaw、LobsterAI**

特征：

- 有正式 release；
- PR 更多围绕发布质量、产品体验、安装运维；
- 用户反馈较少，但内部迭代明确。

其中：

- **NanoClaw v2.4.0** 强调 credential gateway、Mattermost、Iron Proxy、安装升级。
- **LobsterAI 2026.9.23** 强调 Cowork 可观测性、OpenClaw 稳定性、实验性决策模型。

### 6.3 质量巩固阶段

代表项目：**IronClaw**

特征：

- Issue 噪声低；
- PR 数少但聚焦；
- 发布候选与依赖安全更新是重点。

IronClaw 当前处于低噪声维护状态，更多是在为 `1.4.1-rc.2` 做安全依赖和文档收敛。

### 6.4 静默或低活跃阶段

代表项目：**PicoClaw、NullClaw、TinyClaw、Moltis、ZeptoClaw**

过去 24 小时无活动，暂无法判断其长期状态。对技术选型而言，若需要高响应维护，应优先选择 OpenClaw、Hermes Agent、NanoBot、ZeroClaw、CoPaw、NanoClaw 等活跃项目。

---

## 7. 值得关注的趋势信号

### 7.1 智能体平台正在从“聊天”转向“长期托管执行”

OpenClaw 的 cron agentTurn、NanoClaw 的 warm turns、Hermes 的 background process heartbeat、NanoBot 的 idle compaction 都说明用户正在让 agent 长时间运行、定时执行、跨会话持续工作。

对开发者的启示：

- 必须设计 session lifecycle；
- 必须处理进程重启、并发消息和恢复；
- transcript、memory、tool result 都要有生命周期管理。

---

### 7.2 上下文压缩和 Memory 将成为核心基础设施

NanoBot 今日几乎所有关键问题都围绕 compaction 和 Memory；OpenClaw 也出现 SQLite corruption、stored message stall；Hermes 用户开始关注 memory/skills 不被自动篡改。

对开发者的启示：

- Memory 需要事务性和并发一致性；
- compaction 不能只压缩历史，还要处理 pending tool result；
- 用户需要控制哪些记忆可写、哪些不可写；
- 恢复质量比“是否有摘要”更重要。

---

### 7.3 Provider 兼容层的重要性快速上升

CoPaw 的 Moonshot schema 问题、Hermes 的 Ollama payload 问题、NanoBot 的 deepseek-flash 图片输入、ZeroClaw 的 Antigravity CLI、LobsterAI 的决策模型都指向同一个趋势：AI 助手不能假设所有模型服务商行为一致。

对开发者的启示：

- 需要 provider-specific normalization；
- schema、tool call、streaming、多模态都要做兼容测试；
- 本地模型和远程模型应共享一致抽象，但允许差异化适配；
- 模型发现、路由、fallback 不能掩盖真实错误。

---

### 7.4 多渠道接入进入“身份一致性”阶段

NanoClaw 修复 bot display name，OpenClaw 修复 Discord/Telegram/Feishu，Hermes 修复 Slack/Teams/Desktop profile routing。问题不再只是“能连上”，而是“是否以正确身份、正确上下文、正确线程响应”。

对开发者的启示：

- channel adapter 需要统一的 identity model；
- thread/topic/session binding 需要持久化和回归测试；
- 多平台差异不能暴露给最终用户；
- bot 自我认知与平台显示名应一致。

---

### 7.5 安全边界从配置项变成运行时硬约束

ZeroClaw 的 shell hard block、NanoBot 的 Full Access handshake、NanoClaw 的 gateway ownership、OpenClaw 的 security-sensitive Gateway PR，都说明 Agent 平台已进入“能执行危险操作”的阶段。

对开发者的启示：

- allowlist 不应覆盖 hard block；
- 插件、skills、credentials、shell、filesystem 都需要独立权限边界；
- 安全失败应优先于便利性；
- 审计、回滚、diff preview 会成为重要能力。

---

### 7.6 Agent 可观测性成为产品竞争点

LobsterAI 的 Cowork step progress、Hermes 的 Integrations 状态需求、CoPaw 的错误细分、OpenClaw 的 `status --deep` 假阳性问题，都表明用户需要知道系统到底处于什么状态。

对开发者的启示：

- Agent 工作过程应可见；
- tool outcome、diff、timing、model/provider 状态应可解释；
- 健康检查必须贴近真实可用性；
- 错误提示要避免把 runtime、auth、quota、config 混为一谈。

---

## 结论

当前个人 AI 助手 / 自主智能体开源生态正处于 **能力快速扩张与稳定性补课并行** 的阶段。OpenClaw、Hermes Agent、NanoBot、ZeroClaw 等项目已经具备相当复杂的 Agent runtime 能力，但同时也暴露出 session-state、message-delivery、memory consistency、provider compatibility、security boundary 等核心工程挑战。

对技术决策者而言：

- 若关注 **多渠道长期个人助手**，OpenClaw 是最值得重点跟踪的项目，但需警惕短期 release 风险。
- 若关注 **桌面端、本地模型和 MCP 生态**，Hermes Agent 具备最高社区声量。
- 若关注 **Memory 与长上下文治理**，NanoBot 的方向最集中。
- 若关注 **coding agent 与安全执行策略**，ZeroClaw 有明显差异化。
- 若关注 **企业 Agent 互操作与配置治理**，CoPaw 和 NanoClaw 更值得观察。
- 若关注 **产品化体验和 Agent 过程可视化**，LobsterAI 的 Cowork 方向具备参考价值。

未来 1-2 个版本周期内，生态竞争焦点很可能集中在：**稳定的长期自动化、可靠的上下文记忆、统一的 Provider 适配、安全的工具执行、跨渠道身份一致性，以及可解释的 Agent 运行过程**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报  
日期：2026-09-24  
项目：HKUDS/nanobot

---

## 1. 今日速览

过去 24 小时 NanoBot 活跃度较高：共有 **2 条 Issue 更新**、**17 条 PR 更新**，其中 **10 条 PR 仍待合并**，**7 条 PR 已合并或关闭**。今日工作重点集中在 **上下文压缩 / Memory 稳定性、Provider 兼容性、WebUI 权限控制、CLI 启动体验与工具链重构**。  
整体来看，项目正处于 **高频修复与重构并行阶段**：一方面继续修补 0.3.5 版本引入的回归和启动校验问题，另一方面在文件工具、API state、WebUI turn 生命周期等内部架构上做清理。  
健康度方面，维护者响应速度较快，多个 Issue 当日即有对应 PR，但也显示近期在 **上下文压缩、会话存储路径、Provider 多模态适配** 等核心路径上仍存在稳定性压力。

---

## 2. 项目进展

### 已合并 / 关闭的重要 PR

#### 1. 修复 Codex 压缩状态丢失问题  
- PR：[#5883 fix(agent): preserve state for required Codex compaction](https://github.com/HKUDS/nanobot/pull/5883)  
- 状态：已关闭  
- 影响范围：Agent、Provider、上下文压缩  
- 说明：  
  当恢复后的 Codex 请求超过本地输入预算时，系统会先进行历史摘要并清除 provider state，导致 Codex 自身的 native compaction 无法正确执行。该 PR 保留必要状态，避免在本地压缩阶段破坏 Codex 的内部上下文处理。  
- 项目推进：提升了 Codex 场景下长上下文恢复与压缩的可靠性，是今日稳定性修复中的重点。

#### 2. 新增 IO Intelligence / io.net Provider  
- PR：[#5875 feat(providers): add IO Intelligence (io.net) provider](https://github.com/HKUDS/nanobot/pull/5875)  
- 状态：已关闭  
- 影响范围：Provider 生态、WebUI、文档  
- 说明：  
  该 PR 来自 io.net 官方贡献，为 NanoBot 增加 IO Intelligence provider，使用户可以直接通过 io.net 推理服务运行模型。  
- 项目推进：扩展了 NanoBot 的模型供应商生态，体现出项目对第三方 provider 接入的开放性。

#### 3. 修正文档中的上下文压缩行为说明  
- PR：[#5882 docs: correct context compaction behavior and document /compact](https://github.com/HKUDS/nanobot/pull/5882)  
- 状态：已关闭  
- 影响范围：文档、用户预期管理  
- 说明：  
  文档此前仍描述为“保留最近消息原文”，但当前 idle compaction 实际会将此前对话替换为摘要，同时保留聊天历史存档。该 PR 修正文档并补充 `/compact` 行为说明。  
- 项目推进：减少用户对上下文记忆行为的误解，尤其是恢复会话时模型是否还能看到逐字原文的问题。

#### 4. 记录 mid-turn 注入消息内容  
- PR：[#5878 fix(agent): log mid-turn injected messages](https://github.com/HKUDS/nanobot/pull/5878)  
- 状态：已关闭  
- 影响范围：Agent 日志、可观测性  
- 说明：  
  原本 mid-turn injections 只记录数量，不记录内容。该 PR 增加文本预览日志，便于调试运行过程中注入的 follow-up message。  
- 项目推进：增强问题排查能力，对复杂 agent 执行链路的可观测性有帮助。

#### 5. 优化 grep 上下文分页构建  
- PR：[#5877 refactor(tools): build grep context pages incrementally](https://github.com/HKUDS/nanobot/pull/5877)  
- 状态：已关闭  
- 影响范围：工具系统、性能  
- 说明：  
  grep 过去会为每个匹配项构建上下文窗口并反复合并、格式化，导致密集搜索结果下重复工作较多。该 PR 改为增量构建页面。  
- 项目推进：改善搜索工具性能，并降低工具实现复杂度。

#### 6. 修复搜索范围与结果续读问题  
- PR：[#5876 fix(tools): keep searches scoped and results resumable](https://github.com/HKUDS/nanobot/pull/5876)  
- 状态：已关闭  
- 影响范围：文件搜索工具  
- 说明：  
  修复搜索工具可能漏掉 `*.{ts,tsx}`、在其他 checkout 中误匹配 root-relative pattern，以及超大结果只返回固定预览而隐藏 continuation offset 的问题。  
- 项目推进：提升搜索工具的准确性和可恢复性，减少用户重复搜索。

#### 7. 修复 deepseek-flash 图片输入被丢弃  
- PR：[#5886 fix(providers): preserve image inputs for deepseek-flash](https://github.com/HKUDS/nanobot/pull/5886)  
- 状态：已关闭  
- 影响范围：Provider、多模态输入  
- 说明：  
  修复 `deepseek-flash` 使用图片输入时，多模态内容被静默丢弃的问题。DeepSeek 官方 Vision 文档表明该模型支持图片输入，因此这是 provider 适配层的兼容性修复。  
- 项目推进：恢复 deepseek-flash 的多模态能力，避免用户在视觉任务中得到不完整上下文。

---

## 3. 社区热点

### 热点 1：大文件读取结果在压缩后仍导致回合中止  
- Issue：[#5879 Large read_file results survive compaction as unsummarized delta and abort the turn](https://github.com/HKUDS/nanobot/issues/5879)  
- 状态：Open  
- 评论数：2  
- 相关 PR：[#5880 fix: recover oversized pending file reads after compaction](https://github.com/HKUDS/nanobot/pull/5880)  
- 分析：  
  这是今日最明确的稳定性热点。用户报告大规模 `read_file` 工具结果即使在历史摘要成功后，仍作为未被摘要的新增 delta 留在上下文中，最终超过输入预算并中止当前 turn。  
  背后的核心诉求是：**上下文压缩不仅要压缩旧历史，也要能处理尚未被模型消费的新工具输出**。这对于代码仓库分析、日志读取、大文件审查等典型 agent 使用场景非常关键。

### 热点 2：0.3.5 要求 `_nanobot/sessions` 不得位于 workspace 内  
- Issue：[#5881 [bug, regression, priority: p2] 0.3.5版本要求_nanobot必须要搬到workspace外](https://github.com/HKUDS/nanobot/issues/5881)  
- 状态：Open  
- 评论数：0  
- 相关 PR：[#5887 fix(cli): explain session storage conflicts before startup](https://github.com/HKUDS/nanobot/pull/5887)  
- 分析：  
  这是来自中文用户的直接反馈，涉及 0.3.5 新增路径校验导致已有部署方式无法启动。用户质疑为什么同一个实例的 workspace 中不能放置 `_nanobot/sessions`。  
  该问题反映出项目在加强数据隔离和安全边界时，对既有用户迁移路径解释不足。PR #5887 已尝试将错误提前并输出更清晰的路径来源和冲突说明。

### 热点 3：Idle compaction 对短会话恢复质量的影响  
- PR：[#5885 feat(memory): gate idle transcript replacement on a token threshold](https://github.com/HKUDS/nanobot/pull/5885)  
- 状态：Open  
- 分析：  
  当前 idle compaction 会对每个过期 session 执行摘要替换，即使是非常短的对话。这对 memory pipeline 有利，但会降低短会话恢复时的逐字上下文质量。  
  该 PR 提出用 token 阈值控制 idle transcript replacement，反映出维护者正在平衡 **长期记忆归档** 与 **短会话恢复体验**。

---

## 4. Bug 与稳定性

按严重程度和影响面排序如下：

### P0：History compaction 可能覆盖并发追加记录  
- PR：[#5884 fix(memory): prevent history compaction from overwriting concurrent appends](https://github.com/HKUDS/nanobot/pull/5884)  
- 状态：Open  
- 严重程度：高，标记 priority:p0  
- 问题说明：  
  `MemoryStore._append_history_record()` 使用 `_append_lock` 序列化 cursor 分配和写入，但 `compact_history()` 之前没有使用同一把锁。它会读取文件快照、筛选保留项并原子替换文件，可能覆盖并发追加的记录。  
- 当前进展：已有修复 PR，待合并。  
- 风险：可能导致 memory/history.jsonl 数据丢失或历史记录不一致。

### P2：大文件读取结果压缩后仍超预算并中止 turn  
- Issue：[#5879](https://github.com/HKUDS/nanobot/issues/5879)  
- PR：[#5880 fix: recover oversized pending file reads after compaction](https://github.com/HKUDS/nanobot/pull/5880)  
- 状态：Issue Open，PR Open  
- 问题说明：  
  大量 `read_file` 结果在历史摘要后仍作为 pending tool-result delta 存活，最终超出输入预算。  
- 当前进展：已有直接修复 PR，说明维护者已定位并给出解决路径。  
- 风险：影响代码阅读、日志分析、批量文件读取等高频场景。

### P2：0.3.5 会话存储路径校验导致启动失败  
- Issue：[#5881](https://github.com/HKUDS/nanobot/issues/5881)  
- PR：[#5887 fix(cli): explain session storage conflicts before startup](https://github.com/HKUDS/nanobot/pull/5887)  
- 状态：Issue Open，PR Open  
- 问题说明：  
  0.3.5 新增规则要求 sessions 根目录不得落在 agent workspace 内，用户升级后出现启动失败。  
- 当前进展：PR #5887 主要改善启动前检测和错误解释，可能并不完全回滚校验逻辑。  
- 风险：对多实例、本地 workspace 与配置目录混放的用户有迁移影响。

### P2：CLI onboarding 模型发现逻辑仍使用空 stub  
- PR：[#5888 fix(cli): reuse WebUI model discovery in onboarding](https://github.com/HKUDS/nanobot/pull/5888)  
- 状态：Open  
- 问题说明：  
  LiteLLM migration 后，CLI onboarding 中模型 autocomplete 和上下文推荐仍连接到空实现，导致首次配置体验受损。  
- 当前进展：PR 计划复用 WebUI settings domain 的 provider catalog。  
- 风险：影响新用户初始化体验，尤其是 Quick Start 凭证和 endpoint 选择场景。

### P2：WebUI Full Access eligibility 缺少 handshake header 时过度宽松  
- PR：[#5890 fix(webui): require handshake headers for Full Access eligibility](https://github.com/HKUDS/nanobot/pull/5890)  
- 状态：Open  
- 问题说明：  
  Browser Full Access eligibility 在缺少或格式错误的 handshake headers 时会回退到 TCP peer address。该行为主要是为轻量测试连接保留，但生产上可能过于宽松。  
- 当前进展：PR 改为缺少 header 时拒绝资格，并在测试中补充真实 local handshake header。  
- 风险：涉及 WebUI 权限边界，建议优先审查。

### P2：deepseek-flash 图片输入被静默丢弃  
- PR：[#5886](https://github.com/HKUDS/nanobot/pull/5886)  
- 状态：已关闭  
- 问题说明：  
  多模态输入在 deepseek-flash provider 路径中丢失。  
- 当前进展：已处理。  
- 风险：若已合并，则对视觉任务用户是正向修复；若仅关闭未合并，则需确认是否有替代方案。

---

## 5. 功能请求与路线图信号

### 1. Provider 生态继续扩张：IO Intelligence 接入  
- PR：[#5875 feat(providers): add IO Intelligence (io.net) provider](https://github.com/HKUDS/nanobot/pull/5875)  
- 信号：  
  NanoBot 仍在积极扩展 provider 列表，并欢迎官方 provider 贡献。未来版本可能继续加强多 provider 配置、模型发现和 WebUI 设置页集成。

### 2. Memory / Compaction 将更加精细化  
- PR：[#5885 feat(memory): gate idle transcript replacement on a token threshold](https://github.com/HKUDS/nanobot/pull/5885)  
- Issue：[#5879](https://github.com/HKUDS/nanobot/issues/5879)  
- PR：[#5880](https://github.com/HKUDS/nanobot/pull/5880)  
- 信号：  
  近期多项改动集中于 compaction：包括 Codex native compaction、idle transcript replacement、大文件 tool result 压缩恢复、history 并发 compact。可以判断下一阶段路线图会持续强化 **长上下文治理、摘要策略、会话恢复质量与 memory 数据一致性**。

### 3. CLI 与 WebUI 配置体验趋于统一  
- PR：[#5888 fix(cli): reuse WebUI model discovery in onboarding](https://github.com/HKUDS/nanobot/pull/5888)  
- PR：[#5887 fix(cli): explain session storage conflicts before startup](https://github.com/HKUDS/nanobot/pull/5887)  
- 信号：  
  CLI onboarding 将复用 WebUI 的 provider catalog，减少两套配置逻辑分叉。启动错误也会更早暴露、更可解释。这表明项目在改善新用户配置体验和降低支持成本。

### 4. 内部架构正在收敛到更明确的 owner / state 模型  
- PR：[#5891 refactor(webui): clear turns only through the owner registry](https://github.com/HKUDS/nanobot/pull/5891)  
- PR：[#5892 refactor(api): use typed application state consistently](https://github.com/HKUDS/nanobot/pull/5892)  
- PR：[#5893 refactor(tools): remove unused global file state compatibility](https://github.com/HKUDS/nanobot/pull/5893)  
- 信号：  
  项目正在移除兼容性分支、全局状态和字符串键状态访问，转向 typed state、owner registry、显式 FileState。这通常意味着后续会有更强的可测试性和更少隐藏副作用。

---

## 6. 用户反馈摘要

### 用户痛点 1：升级后启动规则变化不透明  
- 来源：[#5881](https://github.com/HKUDS/nanobot/issues/5881)  
- 反馈内容：  
  用户升级到 0.3.5 后，发现 `_nanobot/sessions` 位于 workspace 内会被拒绝启动，并质疑为什么同一实例的 workspace 不能包含 `_nanobot`。  
- 真实场景：  
  用户可能运行多个 NanoBot 实例，并习惯将配置、sessions 与 workspace 放在同一目录树下。  
- 不满意点：  
  规则变化影响既有部署，但错误信息或迁移说明不足。  
- 项目响应：  
  PR #5887 正在改进冲突检测和错误解释，但是否提供自动迁移或兼容模式尚不明确。

### 用户痛点 2：大文件读取破坏 agent 连续执行  
- 来源：[#5879](https://github.com/HKUDS/nanobot/issues/5879)  
- 反馈内容：  
  即使历史压缩成功，大型 `read_file` 结果仍可能使当前 turn 因上下文超限而中止。  
- 真实场景：  
  代码库阅读、日志分析、文档批量读取、长文件审查。  
- 不满意点：  
  用户预期 compaction 能“救回”超预算请求，但新增工具结果没有被纳入摘要，导致体验上像是压缩机制失效。  
- 项目响应：  
  PR #5880 已提出恢复 oversized pending file reads 的修复方案。

### 用户痛点 3：短会话被摘要后恢复质量下降  
- 来源：[#5885](https://github.com/HKUDS/nanobot/pull/5885)  
- 反馈内容：  
  即使是很短的临时对话，也会在 idle compaction 后被摘要替代，导致恢复时模型不再看到原文。  
- 真实场景：  
  用户短时间离开后回到一个简短任务，希望模型仍保持精确上下文。  
- 项目响应：  
  PR #5885 提议基于 token 阈值决定是否替换 transcript，方向上更符合用户对短会话“原样恢复”的预期。

---

## 7. 待处理积压

基于本次提供的数据，未发现“长期未响应”的历史 Issue 或 PR；所有条目均集中在 2026-09-23 至 2026-09-24，且多数已有维护者或贡献者提交对应 PR。

不过，以下当前待处理项建议维护者优先关注：

### 高优先级待处理

1. **并发 compact 可能导致历史记录丢失**  
   - PR：[#5884](https://github.com/HKUDS/nanobot/pull/5884)  
   - 建议：优先审查并合并，因其涉及 memory 数据一致性，且标记为 priority:p0。

2. **大文件读取压缩恢复问题**  
   - Issue：[#5879](https://github.com/HKUDS/nanobot/issues/5879)  
   - PR：[#5880](https://github.com/HKUDS/nanobot/pull/5880)  
   - 建议：尽快验证多文件、大 delta、工具结果未消费等边界条件。

3. **0.3.5 sessions 路径回归体验**  
   - Issue：[#5881](https://github.com/HKUDS/nanobot/issues/5881)  
   - PR：[#5887](https://github.com/HKUDS/nanobot/pull/5887)  
   - 建议：除错误解释外，考虑补充迁移文档、自动检测建议、兼容配置或明确设计原因。

4. **WebUI Full Access handshake header 校验**  
   - PR：[#5890](https://github.com/HKUDS/nanobot/pull/5890)  
   - 建议：作为权限边界修复，应尽快完成安全审查。

### 中优先级待处理

5. **CLI onboarding 模型发现体验修复**  
   - PR：[#5888](https://github.com/HKUDS/nanobot/pull/5888)  
   - 建议：合并后可显著改善新用户首次配置体验。

6. **Idle transcript replacement 阈值策略**  
   - PR：[#5885](https://github.com/HKUDS/nanobot/pull/5885)  
   - 建议：需要明确默认阈值与对 Dream / memory pipeline 的影响，避免短会话恢复与长期记忆目标冲突。

7. **内部 state / lifecycle 重构系列**  
   - PR：[#5891](https://github.com/HKUDS/nanobot/pull/5891)  
   - PR：[#5892](https://github.com/HKUDS/nanobot/pull/5892)  
   - PR：[#5893](https://github.com/HKUDS/nanobot/pull/5893)  
   - 建议：这些 PR 有助于降低技术债，但需确保测试覆盖充分，避免移除旧兼容路径后影响第三方扩展或测试夹具。

---

## 综合评价

NanoBot 今日处于 **高活跃、高修复密度** 状态。项目维护节奏很快，多个用户可见问题在 24 小时内就有修复 PR 跟进，体现出较强响应能力。  
但从问题分布看，近期风险集中在 **上下文压缩、Memory 并发一致性、会话路径规则、Provider 多模态兼容与 WebUI 权限边界**。这些都属于 agent 系统的核心稳定性区域，建议下一版本发布前重点完成回归测试与迁移说明。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
日期：2026-09-24  
仓库：NousResearch/hermes-agent  
数据窗口：过去 24 小时

---

## 1. 今日速览

Hermes Agent 今日活跃度非常高：过去 24 小时内有 **50 条 Issue 更新**、**50 条 PR 更新**，说明项目正处于高频修复与快速迭代阶段。  
Issue 侧以 Bug 报告为主，集中在 **Desktop/Bot Screen、Gateway 消息投递、CLI、本地模型、MCP 工具集成、认证与会话状态** 等核心路径。  
PR 侧出现大量“对号入座”的修复提交，多个新报 Bug 已有对应 fix PR，体现出维护响应速度较快。  
不过，今日新增问题中包含 **P1 认证/安全边界问题**、多项 **P2 消息投递与会话状态问题**，短期稳定性压力较大。  
今日 **无新版本发布**，当前修复主要仍处于待合并状态。

---

## 2. 版本发布

今日无新版本发布。  
最近 Releases 数据为空。

---

## 3. 项目进展

过去 24 小时 PR 更新共 50 条，其中 **49 条待合并**，**1 条已合并/关闭**。由于数据中未展示已合并/关闭 PR 的具体编号，本日报无法确认该已完成 PR 的实际改动范围。

尽管如此，今日待合并 PR 中已经形成了一批较明确的修复推进方向，主要集中在以下几类：

### 3.1 认证与服务可用性修复

- [PR #120985](https://github.com/NousResearch/hermes-agent/pull/120985)  
  **fix(auth): preserve Nous credentials during portal outages**  
  对应 [Issue #120976](https://github.com/NousResearch/hermes-agent/issues/120976)。  
  该 PR 修复 Nous Portal 后端 503 时被误判为认证失败的问题，避免用户在服务短暂不可用时被错误要求重新登录，甚至无法切换 provider。  
  这是今日最关键的稳定性修复之一，影响认证链路和服务降级体验。

- [PR #120967](https://github.com/NousResearch/hermes-agent/pull/120967)  
  **fix(vault): keep NODE_EXTRA_CA_CERTS and TLS CA env vars in Bitwarden backend**  
  修复 Bitwarden CLI 子进程环境变量白名单过窄，导致企业或自签 CA 环境下 TLS 证书配置丢失的问题。  
  该修复对企业内网、代理、私有 CA 用户尤其重要。

### 3.2 Gateway / 消息投递 / 会话恢复

- [PR #120969](https://github.com/NousResearch/hermes-agent/pull/120969)  
  **fix(gateway): preserve startup resume placeholder**  
  对应 [Issue #120963](https://github.com/NousResearch/hermes-agent/issues/120963)。  
  修复 Gateway 启动恢复流程中空文本 placeholder 被送入模型的问题，降低 Slack 等平台重启恢复后的异常上下文污染风险。

- [PR #120968](https://github.com/NousResearch/hermes-agent/pull/120968)  
  **fix(gateway): enforce GFM indentation in fence-aware chunking**  
  对应 [Issue #120951](https://github.com/NousResearch/hermes-agent/issues/120951)。  
  修复缩进 Markdown code fence 被 chunker 错误切分的问题，改善长回复中代码块完整性。

- [PR #120984](https://github.com/NousResearch/hermes-agent/pull/120984)  
  **fix: suppress observed completion replay and cross-line env redaction**  
  处理终端进程完成状态被后续 run 重放，以及环境变量跨行脱敏问题。  
  该 PR 涉及 agent、gateway、TUI、terminal，风险面较广，但对 session-state 和 security-boundary 都有积极意义。

### 3.3 CLI 与终端工具修复

- [PR #120988](https://github.com/NousResearch/hermes-agent/pull/120988)  
  **fix(cli): drop stale queued process heartbeats**  
  对应 [Issue #120983](https://github.com/NousResearch/hermes-agent/issues/120983)。  
  修复后台进程已退出后，CLI 仍将过期 heartbeat 当成新用户消息投递的问题。

- [PR #120987](https://github.com/NousResearch/hermes-agent/pull/120987)  
  **fix(cli): suppress preparing tool lines under focus view and tool_progress off**  
  修复 CLI 在 focus view 或关闭 tool progress 时仍输出工具准备提示的问题，改善终端交互体验。

### 3.4 Desktop / Bot Mode 修复

- [PR #120970](https://github.com/NousResearch/hermes-agent/pull/120970)  
  **fix(desktop): route bot screen to target profile**  
  对应 [Issue #120966](https://github.com/NousResearch/hermes-agent/issues/120966)。  
  修复 Bot Mode 中所有 bot 都打开 launch profile 屏幕的问题。

- [PR #120977](https://github.com/NousResearch/hermes-agent/pull/120977)  
  **fix(desktop): add bot screen stop control**  
  对应 [Issue #120972](https://github.com/NousResearch/hermes-agent/issues/120972)。  
  为 bot 控制的 Screen session 增加显式 Stop 控制，解决屏幕会话无法关闭、预览状态误导用户的问题。

- [PR #120986](https://github.com/NousResearch/hermes-agent/pull/120986)  
  **fix(desktop): reconcile rewritten pasted attachment turns**  
  对应 [Issue #120978](https://github.com/NousResearch/hermes-agent/issues/120978)。  
  修复 Desktop 粘贴截图失败 turn 被错误重排到最新消息下方的问题。

### 3.5 MCP / 工具生态修复

- [PR #120965](https://github.com/NousResearch/hermes-agent/pull/120965)  
  **fix(mcp): drop empty params._meta from outbound JSON-RPC requests**  
  对应 [Issue #120923](https://github.com/NousResearch/hermes-agent/issues/120923)。  
  修复 Hermes 向 Meta Ads MCP 发送空 `_meta` 导致 HTTP 400 的兼容性问题。

- [PR #120979](https://github.com/NousResearch/hermes-agent/pull/120979)  
  **fix(mcp): interpolate env placeholders in portable plugin mcp servers**  
  修复 portable plugin MCP server 配置中 `${ENV_VAR}` 未插值的问题，提升插件可移植性和配置安全性。

### 3.6 文件、Cron、Kanban、Web 工具修复

- [PR #120982](https://github.com/NousResearch/hermes-agent/pull/120982)  
  对应 [Issue #120981](https://github.com/NousResearch/hermes-agent/issues/120981)。  
  修复 atomic write 的 EXIT trap 引号错误导致临时文件泄漏。

- [PR #120974](https://github.com/NousResearch/hermes-agent/pull/120974)  
  修复 Windows 上 cron 脚本任务无法可靠找到 bash 的问题。

- [PR #120973](https://github.com/NousResearch/hermes-agent/pull/120973)  
  修复 Kanban dashboard 在旧数据 timestamp 为 TEXT 时加载失败的问题。

- [PR #120990](https://github.com/NousResearch/hermes-agent/pull/120990)  
  修复 web_extract 将 Cloudflare challenge 页面误判为成功结果并写入缓存的问题。

---

## 4. 社区热点

### 4.1 Custom Ollama provider 在 tool continuation 后发送无 user message payload

- Issue：[ #120828](https://github.com/NousResearch/hermes-agent/issues/120828)  
- 状态：Open  
- 标签：type/bug, comp/agent, provider/ollama, P2, area/local-models  
- 评论数：4

这是今日评论最多的 Issue。用户报告在使用 OpenAI-compatible Ollama provider 时，Hermes 在 skill/tool continuation 或 stream retry 后可能发送不含 `role: user` 的 follow-up payload，导致 Ollama 的 Qwen renderer 拒绝请求。  
背后诉求是：Hermes 在本地模型与工具调用组合场景下，需要更严格地保证 chat payload 的结构合法性。该问题也反映出本地模型 provider 的兼容层仍存在边缘情况。

当前未在展示数据中看到明确对应 PR，建议维护者优先确认是否已有内部修复分支。

---

### 4.2 Bot Mode Screen 全部绑定到 launch display

- Issue：[ #120966](https://github.com/NousResearch/hermes-agent/issues/120966)  
- PR：[ #120970](https://github.com/NousResearch/hermes-agent/pull/120970)  
- 状态：Issue Open，PR Open  
- 标签：type/bug, comp/gateway, comp/tools, comp/desktop, P2  
- 评论数：1

用户在 Linux gateway 环境下发现 Bot Mode → Open Screen 对每个 bot 都打开同一个 launch profile 的显示 `DISPLAY=:20`，而不是各自 profile 的 display。  
该问题直接影响多 bot / 多 profile 隔离能力。已有 PR 修复 screen routing 使用 target profile，响应速度较快。

---

### 4.3 Meta Ads MCP 拒绝 Hermes 发出的空 params._meta

- Issue：[ #120923](https://github.com/NousResearch/hermes-agent/issues/120923)  
- PR：[ #120965](https://github.com/NousResearch/hermes-agent/pull/120965)  
- 状态：Issue Open，PR Open  
- 标签：type/bug, comp/tools, tool/mcp, P2  
- 评论数：1

用户在 Windows 10、Python 3.11、Hermes v0.21.4 环境下连接 Meta Ads MCP 时遇到 HTTP 400。根因是 Hermes 发送了空 `_meta` 字段，而远端 MCP 服务拒绝该格式。  
这说明 MCP 生态的实际兼容性仍需针对不同远端实现做收敛，尤其是 JSON-RPC payload 的空字段处理。

---

### 4.4 模型更新、SDK 版本管理、Integrations 可见性

相关 Issues：

- [Issue #120882](https://github.com/NousResearch/hermes-agent/issues/120882)  
  docs: Document model update flow and SDK version management
- [Issue #120881](https://github.com/NousResearch/hermes-agent/issues/120881)  
  feat: SDK update checker with npm registry polling
- [Issue #120880](https://github.com/NousResearch/hermes-agent/issues/120880)  
  feat: Model sync status visibility in Settings → Integrations
- [Issue #120879](https://github.com/NousResearch/hermes-agent/issues/120879)  
  feat: Display SDK and MCP client versions in Settings → Integrations

这一组由同一作者集中提出，指向同一个产品痛点：Desktop 用户无法理解模型自动发现、后端 model sync、SDK 版本、MCP client 版本、手动刷新和更新路径。  
这类需求不属于紧急 Bug，但具有明显路线图价值，适合纳入 Settings → Integrations 的可观测性改进。

---

## 5. Bug 与稳定性

以下按严重程度与影响面排序。

### P1：认证 / 安全边界

#### 5.1 Nous Portal outage 被误判为认证失败，阻塞 provider 切换

- Issue：[ #120976](https://github.com/NousResearch/hermes-agent/issues/120976)  
- PR：[ #120985](https://github.com/NousResearch/hermes-agent/pull/120985)  
- 状态：Issue Open，PR Open  
- 标签：type/bug, comp/cli, provider/nous, area/auth, P1, sweeper:risk-security-boundary

问题表现：Nous 后端 503 deployment unavailable 被客户端当作认证失败，导致刷新 token 失败后用户被锁在错误状态，甚至无法使用 `hermes model` 切换 provider。  
影响：服务降级路径、认证状态机、用户恢复能力。  
判断：已有修复 PR，建议优先 review 与合并。

---

### P2：本地模型 / Provider 兼容性

#### 5.2 Custom Ollama provider 发送 tool-only payload

- Issue：[ #120828](https://github.com/NousResearch/hermes-agent/issues/120828)  
- 状态：Open  
- 标签：type/bug, comp/agent, provider/ollama, P2, area/local-models  
- Fix PR：未在数据中看到明确对应 PR

影响：Ollama + Qwen + tool continuation / stream retry 场景。  
风险：本地模型工具调用不可用或间歇性失败。

#### 5.3 Linux + NVIDIA 本地模型默认不可用

- Issue：[ #120872](https://github.com/NousResearch/hermes-agent/issues/120872)  
- 状态：Open  
- 标签：type/bug, comp/cli, comp/desktop, area/local-models, P2  
- Fix PR：未见明确对应 PR

用户指出三个叠加问题：默认 backend 解析到不存在的 CUDA asset、Desktop UI 被 Linux-only `--local` flag 隐藏、64K context floor 导致 8GB 显卡被迫 spill。  
影响：Linux/NVIDIA 用户本地模型开箱体验。

---

### P2：Gateway / 消息投递 / 会话状态

#### 5.4 CLI 将过期后台进程 heartbeat 当作用户 turn 投递

- Issue：[ #120983](https://github.com/NousResearch/hermes-agent/issues/120983)  
- PR：[ #120988](https://github.com/NousResearch/hermes-agent/pull/120988)  
- 状态：Issue Open，PR Open  
- 标签：type/bug, comp/cli, tool/terminal, P2, sweeper:risk-session-state, sweeper:risk-message-delivery

影响：后台进程退出后，旧 heartbeat 可能污染会话并触发错误用户消息。  
已有 PR 检查 process session 和 start time，方向明确。

#### 5.5 Slack startup auto-resume 空文本 placeholder 进入模型

- Issue：[ #120963](https://github.com/NousResearch/hermes-agent/issues/120963)  
- PR：[ #120969](https://github.com/NousResearch/hermes-agent/pull/120969)  
- 状态：Issue Open，PR Open  
- 标签：type/bug, comp/gateway, platform/slack, P2

影响：容器重启、SIGTERM 中断 turn、Slack Socket Mode 恢复。  
风险：模型收到空消息或日志记录误导。

#### 5.6 `/api/sessions/{id}/chat` 静默截断 65,536 字符

- Issue：[ #120937](https://github.com/NousResearch/hermes-agent/issues/120937)  
- 状态：Open  
- 标签：type/bug, comp/gateway, P2, sweeper:risk-message-delivery  
- Fix PR：未见明确对应 PR

用户指出 `/api/sessions/{id}/chat` 和 `/chat/stream` 会静默截断长文本，但 `/v1/runs` 接受同样输入。  
影响：API 一致性、数据完整性、用户信任。  
建议：至少返回错误、warning 或明确截断标记。

#### 5.7 Markdown code fence chunker 无法识别缩进 fence

- Issue：[ #120951](https://github.com/NousResearch/hermes-agent/issues/120951)  
- PR：[ #120968](https://github.com/NousResearch/hermes-agent/pull/120968)  
- 状态：Issue Open，PR Open

影响：长回复中的代码块可能被拆断，尤其是列表内代码块。  
已有修复 PR。

#### 5.8 fence-balanced chunks 在长语言标签时超过 caller limit

- Issue：[ #120904](https://github.com/NousResearch/hermes-agent/issues/120904)  
- 状态：Open  
- 标签：type/bug, comp/gateway, P2  
- Fix PR：未见明确对应 PR

影响：消息平台长度限制、chunk 可靠性。  
与 #120951 同属 chunker 边界问题，建议合并测试覆盖。

---

### P2：Desktop / Bot Screen

#### 5.9 Bot Screen 路由到错误 profile

- Issue：[ #120966](https://github.com/NousResearch/hermes-agent/issues/120966)  
- PR：[ #120970](https://github.com/NousResearch/hermes-agent/pull/120970)  
- 状态：Issue Open，PR Open

影响：多 bot / 多 profile 桌面隔离。

#### 5.10 Desktop Bots Screen session 无法关闭，preview 不反映 bot actions

- Issue：[ #120972](https://github.com/NousResearch/hermes-agent/issues/120972)  
- PR：[ #120977](https://github.com/NousResearch/hermes-agent/pull/120977)  
- 状态：Issue Open，PR Open

影响：用户无法判断 bot 是否仍在控制屏幕，操作可见性差。

#### 5.11 Desktop composer caret 在 reconnect 后跳到草稿开头

- Issue：[ #120942](https://github.com/NousResearch/hermes-agent/issues/120942)  
- 状态：Open  
- 标签：type/bug, comp/desktop, area/sessions, P2  
- Fix PR：未见明确对应 PR

影响：断线重连后的输入体验，尤其是长草稿。

---

### P2：MCP / 工具

#### 5.12 Meta Ads MCP 拒绝空 `_meta`

- Issue：[ #120923](https://github.com/NousResearch/hermes-agent/issues/120923)  
- PR：[ #120965](https://github.com/NousResearch/hermes-agent/pull/120965)  
- 状态：Issue Open，PR Open

#### 5.13 atomic write 清理 trap 引号错误导致临时文件泄漏

- Issue：[ #120981](https://github.com/NousResearch/hermes-agent/issues/120981)  
- PR：[ #120982](https://github.com/NousResearch/hermes-agent/pull/120982)  
- 状态：Issue Open，PR Open

---

### P3：配置、文档、UI、平台兼容性

#### 5.14 memory provider boolean 配置错误会 500 整个 provider listing

- Issue：[ #120873](https://github.com/NousResearch/hermes-agent/issues/120873)  
- 状态：Open  
- 标签：type/bug, comp/cli, comp/plugins, tool/memory, P3  
- Fix PR：未见明确对应 PR

问题是 hand-edited config 或 env var 中 boolean 值非法时，`_coerce_bool` 抛出 ValueError，导致 provider listing 全面 500。  
建议降级为配置项级别错误，不应拖垮全局 provider 列表。

#### 5.15 Feishu / WeCom env-only credentials 被 setup 误判为未配置

- Issue：[ #120870](https://github.com/NousResearch/hermes-agent/issues/120870)  
- 状态：Open  
- 标签：type/bug, comp/cli, comp/plugins, platform/feishu, platform/wecom, P3  
- Fix PR：未见明确对应 PR

影响：环境变量配置用户的诊断体验。

#### 5.16 Kaspersky 误报 Electron main bundle

- Issue：[ #120897](https://github.com/NousResearch/hermes-agent/issues/120897)  
- 状态：Open  
- 标签：type/bug, comp/desktop, platform/windows, P3  
- Fix PR：未见明确对应 PR

影响：Windows 用户信任与安装体验。  
建议维护者提供 hash、签名说明、误报申诉流程。

---

## 6. 功能请求与路线图信号

### 6.1 Settings → Integrations 可观测性增强

相关 Issues：

- [#120879](https://github.com/NousResearch/hermes-agent/issues/120879)：显示 SDK 和 MCP client 版本  
- [#120880](https://github.com/NousResearch/hermes-agent/issues/120880)：显示 model sync 状态  
- [#120881](https://github.com/NousResearch/hermes-agent/issues/120881)：SDK update checker，轮询 npm registry  
- [#120882](https://github.com/NousResearch/hermes-agent/issues/120882)：补充模型更新流与 SDK 版本管理文档

路线图信号：  
用户已经开始关注 Hermes Desktop 的“可解释性”和“可维护性”，尤其是 Claude Code、Codex、Gemini SDK 与 MCP client 的版本状态。  
这些需求非常适合作为一个 Settings → Integrations 小型里程碑推进，包括：

- 当前 SDK/MCP 版本展示
- 最新版本检查
- 上次 model sync 时间
- 本次 sync 增删模型明细
- 手动 refresh
- 文档入口

目前未看到对应实现 PR，但需求边界清晰，可能进入下一版本规划。

---

### 6.2 Teams channel thread 处理确认反馈

- Issue：[ #120892](https://github.com/NousResearch/hermes-agent/issues/120892)  
- 状态：Open  
- 标签：type/feature, comp/plugins, P3

用户希望 Teams channel thread 中 bot 被 @mention 后能立即给出 processing acknowledgement。当前 typing indicator 在 channel thread 中无法渲染，导致长工具调用期间用户误以为 bot 没响应。  
该需求本质是跨平台消息体验一致性问题，和 Slack/Discord 的 “working” 状态类似。适合纳入平台 adapter UX 改进。

---

### 6.3 用户希望自主更新不要篡改资讯技能 / 记忆内容

- Issue：[ #120875](https://github.com/NousResearch/hermes-agent/issues/120875)  
- 状态：Open  
- 标签：type/bug, comp/agent, tool/memory, tool/skills, P3, needs-repro

用户中文反馈称，长期使用中获取资讯类服务、股票信息服务、skills 与 memory 会被自主更新或对话影响，最终偏离原始手写内容；即便设置只读、复制多份、要求不要修改也无法避免。  
该问题虽然标记 needs-repro，但释放出重要产品信号：用户需要更强的 memory/skills 变更控制，包括：

- skill pin / immutable 模式
- memory update approval
- diff preview
- per-skill write protection
- provenance / 修改来源追踪
- 回滚机制

相关 PR [#120971](https://github.com/NousResearch/hermes-agent/pull/120971) 正在修复 pinned / essential skill guard 对 categorized path 的判断问题，可能部分缓解“被误删/误改”的风险。

---

## 7. 用户反馈摘要

### 7.1 本地模型用户希望“开箱即用”，而不是调试 runtime

来自：

- [#120828](https://github.com/NousResearch/hermes-agent/issues/120828)
- [#120872](https://github.com/NousResearch/hermes-agent/issues/120872)

用户在 Ollama、本地 CUDA backend、Linux/NVIDIA 场景中遇到 payload、安装资产、UI flag、context floor 等问题。  
痛点不是单一 Bug，而是本地模型路径存在多个小坑叠加，导致“看似支持，但实际难以稳定使用”。

---

### 7.2 Desktop 用户需要更可信的状态同步

来自：

- [#120966](https://github.com/NousResearch/hermes-agent/issues/120966)
- [#120972](https://github.com/NousResearch/hermes-agent/issues/120972)
- [#120978](https://github.com/NousResearch/hermes-agent/issues/120978)
- [#120942](https://github.com/NousResearch/hermes-agent/issues/120942)

用户反馈集中在 Desktop 状态重排、屏幕控制、profile 路由、断线重连后的编辑器行为。  
共同诉求是：UI 应准确反映真实 backend/session 状态，不能出现“看起来还活着”“消息被挪位置”“输入光标突然跳转”这类破坏信任的体验。

---

### 7.3 企业与真实生产环境关注认证、证书、配置诊断

来自：

- [#120976](https://github.com/NousResearch/hermes-agent/issues/120976)
- [#120967](https://github.com/NousResearch/hermes-agent/pull/120967)
- [#120870](https://github.com/NousResearch/hermes-agent/issues/120870)
- [#120887](https://github.com/NousResearch/hermes-agent/issues/120887)

这些反馈说明 Hermes 正被用于更复杂的生产环境：私有 CA、env-only credentials、SSH backend、非登录 shell PATH、外部 provider CLI。  
用户不满意的点主要是：配置实际可用，但 UI 或 setup 工具显示不可用；环境变量在子进程中被过滤；后端 outage 被误判为 auth failure。

---

### 7.4 消息投递一致性是 Gateway 用户的核心关注

来自：

- [#120963](https://github.com/NousResearch/hermes-agent/issues/120963)
- [#120951](https://github.com/NousResearch/hermes-agent/issues/120951)
- [#120937](https://github.com/NousResearch/hermes-agent/issues/120937)
- [#120904](https://github.com/NousResearch/hermes-agent/issues/120904)

用户关注长消息、代码块、恢复消息、API 输入长度等场景。  
核心诉求是：不要静默丢内容，不要把内部 placeholder 当用户消息，不要破坏代码块格式。

---

## 8. 待处理积压

由于本次数据窗口仅覆盖过去 24 小时，未能识别“长期未响应”的历史积压。但从今日数据看，以下高优先级新积压建议维护者尽快处理：

### 8.1 已有 PR，建议优先 review / 合并

1. [PR #120985](https://github.com/NousResearch/hermes-agent/pull/120985)  
   Nous Portal outage 认证误判修复。对应 P1 [Issue #120976](https://github.com/NousResearch/hermes-agent/issues/120976)。

2. [PR #120988](https://github.com/NousResearch/hermes-agent/pull/120988)  
   CLI stale heartbeat 修复。对应 [Issue #120983](https://github.com/NousResearch/hermes-agent/issues/120983)。

3. [PR #120970](https://github.com/NousResearch/hermes-agent/pull/120970)  
   Bot Screen profile routing 修复。对应 [Issue #120966](https://github.com/NousResearch/hermes-agent/issues/120966)。

4. [PR #120965](https://github.com/NousResearch/hermes-agent/pull/120965)  
   MCP 空 `_meta` 修复。对应 [Issue #120923](https://github.com/NousResearch/hermes-agent/issues/120923)。

5. [PR #120969](https://github.com/NousResearch/hermes-agent/pull/120969)  
   Gateway startup resume placeholder 修复。对应 [Issue #120963](https://github.com/NousResearch/hermes-agent/issues/120963)。

6. [PR #120968](https://github.com/NousResearch/hermes-agent/pull/120968)  
   Markdown fence-aware chunking 修复。对应 [Issue #120951](https://github.com/NousResearch/hermes-agent/issues/120951)。

---

### 8.2 暂未看到对应 PR，但影响较大的 Issue

1. [Issue #120828](https://github.com/NousResearch/hermes-agent/issues/120828)  
   Custom Ollama provider tool-only payload。  
   建议优先级：高。影响本地模型 + tool calling。

2. [Issue #120872](https://github.com/NousResearch/hermes-agent/issues/120872)  
   Linux + NVIDIA 本地模型不可用。  
   建议优先级：高。影响本地模型开箱体验。

3. [Issue #120937](https://github.com/NousResearch/hermes-agent/issues/120937)  
   `/api/sessions/{id}/chat` 静默截断长输入。  
   建议优先级：高。涉及数据完整性和 API 可信度。

4. [Issue #120887](https://github.com/NousResearch/hermes-agent/issues/120887)  
   Desktop SSH model picker 因 PATH 缺失漏掉 external_process provider。  
   建议优先级：中高。影响远程 backend 与外部 provider 使用。

5. [Issue #120873](https://github.com/NousResearch/hermes-agent/issues/120873)  
   memory provider boolean 配置错误导致 provider listing 500。  
   建议优先级：中。应增强配置容错和错误隔离。

---

## 项目健康度评估

今日 Hermes Agent 的项目活跃度很高，维护侧对新问题的响应也较快，多个 Issue 在当天已经出现对应修复 PR。  
但从问题分布看，当前项目稳定性压力集中在 **状态同步、消息投递、认证降级、本地模型兼容、Desktop 多 profile 交互** 等复杂链路。  
短期建议优先合并 P1/P2 修复，并为 Gateway chunking、session resume、local model provider payload、Desktop Bot Screen 增加回归测试。  
中期建议加强 Settings/Integrations 可观测性，让用户能够理解模型、SDK、MCP、provider 的当前状态与更新路径。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报  
**日期：2026-09-24**  
**仓库：** https://github.com/qwibitai/nanoclaw

---

## 1. 今日速览

过去 24 小时 NanoClaw 活跃度较高：共出现 **1 条 Issue 更新、9 条 PR 更新、1 个新版本发布**。项目今日重点集中在 **v2.4.0 发布、安装/升级稳定性、通道身份一致性、凭据网关与技能体系扩展** 等方向。  
PR 层面，已有 **6 条 PR 关闭或完成处理**，另有 **3 条仍处于开放状态**，说明维护节奏较快，但仍有若干安装清理、长期记忆、运行时 transcript 管理问题待合并。整体来看，NanoClaw 正在从“多通道 Agent 平台”继续向 **更稳健的安装运维、更灵活的凭据网关、更丰富的技能生态** 演进。

---

## 2. 版本发布

### v2.4.0 发布

- Release：[`v2.4.0`](https://github.com/qwibitai/nanoclaw/releases/tag/v2.4.0)
- 相关 PR：[`#3877 chore(release): v2.4.0`](https://github.com/qwibitai/nanoclaw/pull/3877)

NanoClaw 今日发布 **v2.4.0**。从发布说明看，这是一次面向运营者和部署者的重要版本，主要覆盖凭据网关、社区门户、通道支持、模型/速度控制和 provider 重构。

### 主要更新内容

1. **凭据网关通过 skills 安装**
   - OneCLI 仍是默认 gateway。
   - 新增 **Iron Proxy** 作为可选凭据网关。
   - 相关稳定性修复见 [`#3872`](https://github.com/qwibitai/nanoclaw/pull/3872)。

2. **社区门户与 Echo hardened image 支持**
   - 增加 community-portal setup。
   - 支持 Echo 的 hardened image。
   - 引入 managed Slack app 配置能力。

3. **模型与速度控制增强**
   - 新增 installation-wide 级别控制。
   - 新增 per-group 级别控制。
   - 这意味着部署者可更精细地控制不同 Agent group 的模型选择与运行速度。

4. **新增 Mattermost channel**
   - 扩展了 NanoClaw 的企业协作平台接入范围。
   - 与 Slack、Teams 等已有通道形成更完整的多通道支持。

5. **OpenCode provider 重构**
   - 发布说明中明确提到 reworked OpenCode provider。
   - 这通常意味着 provider 层在兼容性、调用方式或稳定性上有较大调整。

### 破坏性变更与迁移注意事项

当前数据中未给出明确的 breaking changes 列表，但从 v2.4.0 内容和相关 PR 可推断，升级时建议重点关注：

- **凭据网关配置变化**：如从 OneCLI 扩展到 Iron Proxy，需要检查 gateway 相关 skill 安装和认证流程。
- **安装升级流程**：今日有多个安装/更新修复 PR，说明升级路径是本次版本的重要风险点。
  - [`#3873`](https://github.com/qwibitai/nanoclaw/pull/3873) 修复 cutover 阶段容器未停止导致更新卡住的问题。
  - [`#3879`](https://github.com/qwibitai/nanoclaw/pull/3879) 修复 native dependency 检测不充分的问题。
- **通道显示名行为变化**：当 `assistant_name` 未设置时，Agent prompt name 会跟随 bot display name，详见 [`#3875`](https://github.com/qwibitai/nanoclaw/pull/3875) 和 [`#3876`](https://github.com/qwibitai/nanoclaw/pull/3876)。

---

## 3. 项目进展

今日关闭或完成处理的 PR 主要集中在 **发布准备、安装/升级稳定性、通道身份一致性、Iron Proxy 兼容性** 等方面。

### 发布与版本整理

#### [`#3877 chore(release): v2.4.0`](https://github.com/qwibitai/nanoclaw/pull/3877)  
状态：Closed  
作者：glifocat

该 PR 完成 v2.4.0 发布准备，包括：

- 将 `package.json` 升级到 `2.4.0`。
- 将 `[Unreleased]` 内容整理到 `## [2.4.0]`。
- 使用面向 operator 的 changelog 结构，包括：
  - 更新前注意事项
  - 新功能
  - 修复
  - 可能的迁移提示

这是今日最核心的版本推进动作，标志着 v2.4.0 正式进入发布状态。

---

### 安装与升级稳定性

#### [`#3873 fix(update): stop this install's containers at cutover instead of waiting for them`](https://github.com/qwibitai/nanoclaw/pull/3873)  
状态：Closed  
作者：glifocat

该 PR 修复 `/update-nanoclaw` 在 cutover 阶段可能等待空闲 Agent 容器停止的问题。

**问题背景：**

- 更新流程会停止 host。
- 然后轮询 `docker ps --filter label=nanoclaw-install=<slug>`。
- 但空闲 Agent 容器通常只有 host 会停止。
- 当 host 已经停止后，容器不会被自动清理，导致更新流程等待至超时。

**影响：**

这是一个典型的升级可靠性问题，可能直接影响生产环境升级成功率。该修复提高了安装实例更新的确定性。

---

#### [`#3879 fix: detect a broken better-sqlite3 in rebuild-native.mjs`](https://github.com/qwibitai/nanoclaw/pull/3879)  
状态：Closed  
作者：danielsimonjr

该 PR 修复 `scripts/rebuild-native.mjs` 对 `better-sqlite3` native addon 的检测不足。

**问题背景：**

- 原检测逻辑使用 `require(pkg)`。
- 这可能只加载 JS wrapper，并没有真正触发 native addon 加载。
- 因此“包存在但 native addon 损坏”的情况可能被误判为正常。

**影响：**

`better-sqlite3` 是许多 Node.js 项目中对运行环境敏感的 native 依赖。该修复可减少安装后运行时才暴露数据库 native module 问题的概率，提升安装诊断质量。

---

### 通道与身份一致性

#### [`#3875 fix(channels): prompt name follows the bot's display name when assistant_name is unset`](https://github.com/qwibitai/nanoclaw/pull/3875)  
状态：Closed  
作者：Koshkoshinsk

该 PR 调整 Agent prompt name 的默认来源。

**此前行为：**

- runtime prompt 中 `You are <name>` 取 `assistant_name`。
- 如果未设置，则回退到 group name。

**修复后：**

- 当 `assistant_name` 未设置时，prompt name 跟随 bot display name。

**意义：**

这对共享 bot、企业协作平台、多 group 多 bot 场景非常重要。用户看到的 bot 名称与 Agent 自我认知一致，可以减少上下文混乱。

---

#### [`#3876 fix(teams): hand the bot's display name to the bridge from inbound activities`](https://github.com/qwibitai/nanoclaw/pull/3876)  
状态：Closed  
作者：Koshkoshinsk

该 PR 是 [`#3875`](https://github.com/qwibitai/nanoclaw/pull/3875) 的 Teams 侧补充。

**问题背景：**

- Slack 可在连接时通过 profile lookup 获取 bot profile。
- Teams adapter 无法以同样方式查询自身 profile。
- 因此需要从 inbound activities 中传递 bot display name 给 bridge。

**意义：**

该修复使 Teams 通道也能受益于 prompt name 与 bot display name 的一致性改进，体现出项目对不同 channel adapter 差异的适配能力。

---

### 凭据网关与 provider 稳定性

#### [`#3872 fix(iron-proxy): keep codex working through Iron after a rejected WebSocket upgrade`](https://github.com/qwibitai/nanoclaw/pull/3872)  
状态：Closed  
作者：glifocat

该 PR 修复 Codex 通过 Iron Proxy gateway 使用时的问题。

**问题表现：**

- Codex `0.155.1` 在通过 Iron Proxy 登录后，前几轮交互失败。
- 出现 `401`。
- 随后出现 `Failed to refresh token: 400`。

**原因摘要：**

PR 摘要中提到至少两个问题：

1. setup race：`credential-store.ts` 过早报告 Codex login complete。
2. WebSocket upgrade 被拒后，Iron Proxy 下的 Codex token 刷新路径出现问题。

**意义：**

Iron Proxy 是 v2.4.0 的新增 gateway 方向之一。该修复直接提升新 gateway 的可用性，是 v2.4.0 发布质量的重要保障。

---

## 4. 社区热点

由于今日 Issue/PR 数据中评论数多为 `undefined` 或 0，缺少明确的评论热度指标。按“是否涉及发布、升级可靠性、新功能扩展、用户可见行为变化”判断，今日热点主要集中在以下条目。

### 1. OneCLI gateway 安全边界与安装身份

- Issue：[`#3874 OneCLI gateway: ownership check uses group existence, not installation identity`](https://github.com/qwibitai/nanoclaw/issues/3874)
- 状态：Open
- 评论：0
- 作者：glifocat

该 Issue 指出 OneCLI gateway 的 ownership check 使用了 group existence，而不是 installation identity。

用户在 Issue 中明确勾选：

> confirm that this is not an exploitable vulnerability and can be discussed in public

这表明该问题并非可利用漏洞，但它涉及多安装、多 Agent group、凭据归属边界等安全设计问题。对一个支持 credential gateway 和多租户式安装的 Agent 平台而言，这类身份归属校验是长期稳定运营的关键。

---

### 2. Graphiti 长期记忆能力

- PR：[`#3870 feat(skills): add /add-graphiti knowledge-graph memory`](https://github.com/qwibitai/nanoclaw/pull/3870)
- 状态：Open
- 作者：ljluestc

该 PR 新增 `/add-graphiti` skill，为指定 Agent group 添加基于 Graphiti 和 Neo4j Community Edition 的可搜索、时序化长期记忆能力。

这是今日最明显的功能路线图信号，反映社区或维护者正在推动 NanoClaw 从“任务执行型 Agent”走向“具备长期上下文和知识图谱记忆的 Agent 平台”。

---

### 3. 安装清理和容器生命周期

- PR：[`#3878 fix(setup): stop the ping agent's container before deleting its folder`](https://github.com/qwibitai/nanoclaw/pull/3878)
- 状态：Open
- 作者：glifocat

该 PR 修复 setup post-ping cleanup 在删除临时 ping agent 文件夹前未停止容器的问题。

该问题与 [`#3873`](https://github.com/qwibitai/nanoclaw/pull/3873) 同属容器生命周期管理范畴，说明 NanoClaw 当前在安装、更新、清理流程中正集中补强 Docker/container 的边界行为。

---

## 5. Bug 与稳定性

### 高优先级

#### 1. 更新 cutover 阶段可能因空闲容器未停止而卡住

- PR：[`#3873 fix(update): stop this install's containers at cutover instead of waiting for them`](https://github.com/qwibitai/nanoclaw/pull/3873)
- 状态：Closed
- 严重程度：高
- 是否已有 fix：是

该问题会直接影响 `/update-nanoclaw` 的成功率，尤其是在已有 idle agent container 的安装实例中。已通过主动停止本安装下容器的方式修复。

---

#### 2. Iron Proxy 下 Codex 登录后 token 刷新失败

- PR：[`#3872 fix(iron-proxy): keep codex working through Iron after a rejected WebSocket upgrade`](https://github.com/qwibitai/nanoclaw/pull/3872)
- 状态：Closed
- 严重程度：高
- 是否已有 fix：是

该问题影响 v2.4.0 新增 Iron Proxy gateway 的核心可用性。表现为登录后早期请求失败、token refresh 失败。已修复。

---

### 中优先级

#### 3. OneCLI gateway ownership check 未绑定 installation identity

- Issue：[`#3874 OneCLI gateway: ownership check uses group existence, not installation identity`](https://github.com/qwibitai/nanoclaw/issues/3874)
- 状态：Open
- 严重程度：中
- 是否已有 fix：当前数据未显示对应 fix PR

该问题当前被标记为非可利用漏洞，但仍属于安全边界和身份模型一致性问题。建议维护者优先明确风险范围，并补充 installation identity 维度校验。

---

#### 4. `better-sqlite3` native addon 损坏未被安装脚本识别

- PR：[`#3879 fix: detect a broken better-sqlite3 in rebuild-native.mjs`](https://github.com/qwibitai/nanoclaw/pull/3879)
- 状态：Closed
- 严重程度：中
- 是否已有 fix：是

该问题可能导致安装阶段显示正常，但运行时数据库 native addon 加载失败。修复后安装脚本对 broken native addon 的检测更准确。

---

#### 5. setup ping agent 清理时未先停止容器

- PR：[`#3878 fix(setup): stop the ping agent's container before deleting its folder`](https://github.com/qwibitai/nanoclaw/pull/3878)
- 状态：Open
- 严重程度：中
- 是否已有 fix：有开放 PR，尚未完成

该问题可能产生悬挂容器或清理不完整的问题，尤其影响安装体验和资源回收。

---

### 低到中优先级

#### 6. warm query 下 transcript 只在容器启动时 rotation，长期任务可能导致 transcript 无限增长

- PR：[`#3871 fix(agent-runner): rotate transcripts between warm turns`](https://github.com/qwibitai/nanoclaw/pull/3871)
- 状态：Open
- 严重程度：中
- 是否已有 fix：有开放 PR，尚未完成

该问题主要影响长期运行、频繁调度、warm container 复用场景。若不处理，可能导致 session transcript 体积持续增长，进而影响性能、上下文质量或存储占用。

---

#### 7. Teams / Slack 等通道中 Agent prompt name 与 bot display name 不一致

- PR：[`#3875`](https://github.com/qwibitai/nanoclaw/pull/3875)、[`#3876`](https://github.com/qwibitai/nanoclaw/pull/3876)
- 状态：Closed
- 严重程度：低到中
- 是否已有 fix：是

这不是崩溃型 bug，但会影响多通道用户体验和 Agent 自我描述一致性。已修复。

---

## 6. 功能请求与路线图信号

### 1. Graphiti 知识图谱长期记忆

- PR：[`#3870 feat(skills): add /add-graphiti knowledge-graph memory`](https://github.com/qwibitai/nanoclaw/pull/3870)
- 状态：Open

这是今日最重要的功能型 PR。它为 Agent group 增加：

- searchable memory
- temporal long-term memory
- Graphiti 后端
- Neo4j Community Edition 存储

**路线图信号：**

NanoClaw 正在向“具备长期记忆与知识图谱能力的 Agent 平台”演进。若该 PR 合并，下一版本可能会出现更明确的 memory skill 生态。

---

### 2. 凭据网关技能化安装

- Release：[`v2.4.0`](https://github.com/qwibitai/nanoclaw/releases/tag/v2.4.0)
- 相关 PR：[`#3872`](https://github.com/qwibitai/nanoclaw/pull/3872)

v2.4.0 已将 credential gateways 与 skills 安装机制结合，并新增 Iron Proxy。这暗示未来 gateway 可能继续插件化，支持更多认证代理、provider 或隔离策略。

---

### 3. 多通道企业协作平台扩展

- Release：[`v2.4.0`](https://github.com/qwibitai/nanoclaw/releases/tag/v2.4.0)
- 相关 PR：[`#3875`](https://github.com/qwibitai/nanoclaw/pull/3875)、[`#3876`](https://github.com/qwibitai/nanoclaw/pull/3876)

新增 Mattermost channel，加上 Slack、Teams 相关修复，表明项目正在强化企业聊天平台集成。未来版本可能继续围绕 channel adapter 一致性、bot identity、权限边界进行优化。

---

### 4. 安装、更新、清理流程自动化

- PR：[`#3873`](https://github.com/qwibitai/nanoclaw/pull/3873)
- PR：[`#3878`](https://github.com/qwibitai/nanoclaw/pull/3878)
- PR：[`#3879`](https://github.com/qwibitai/nanoclaw/pull/3879)

多个 PR 同时处理安装、更新、native dependency、容器清理问题，说明维护者将“部署可靠性”视为近期重点。下一版本可能继续补强 setup/update 相关工具链。

---

## 7. 用户反馈摘要

今日公开 Issue 评论较少，唯一新增/活跃 Issue [`#3874`](https://github.com/qwibitai/nanoclaw/issues/3874) 评论数为 0。因此无法从评论中提炼大规模用户反馈，但可以从 Issue 和 PR 摘要中归纳出几个真实痛点。

### 1. 部署者关注凭据归属和安装边界

- 关联 Issue：[`#3874`](https://github.com/qwibitai/nanoclaw/issues/3874)

用户/贡献者关注 OneCLI gateway 的 ownership check 是否应绑定 installation identity，而不仅仅是 group existence。这反映出在多安装、多 group 场景中，用户希望凭据、Agent group、安装实例之间的边界更严格、更可审计。

---

### 2. 运维者需要更可靠的升级体验

- 关联 PR：[`#3873`](https://github.com/qwibitai/nanoclaw/pull/3873)、[`#3878`](https://github.com/qwibitai/nanoclaw/pull/3878)

多个修复指向容器生命周期管理问题，包括更新 cutover 和 setup ping cleanup。痛点是：用户不希望升级或安装过程中留下悬挂容器、卡住等待或需要手动 Docker 清理。

---

### 3. 多通道用户希望 bot 名称与 Agent 行为保持一致

- 关联 PR：[`#3875`](https://github.com/qwibitai/nanoclaw/pull/3875)、[`#3876`](https://github.com/qwibitai/nanoclaw/pull/3876)

当群组名、bot display name、`assistant_name` 不一致时，Agent 在 prompt 中自称的名称可能与用户看到的 bot 不一致。此次修复说明用户体验层面的细节正在被重视。

---

### 4. 长期运行 Agent 需要更好的上下文和资源管理

- 关联 PR：[`#3871`](https://github.com/qwibitai/nanoclaw/pull/3871)

warm queries 和 scheduled tasks 会让 session 长时间存活。用户实际场景中可能存在 recurring tasks，如果 transcript 不及时 rotation，会带来性能和上下文膨胀问题。

---

## 8. 待处理积压

当前数据仅覆盖过去 24 小时，未提供长期未响应 Issue/PR 的历史列表。因此本节仅列出今日仍开放、且值得维护者优先关注的事项。

### 1. OneCLI gateway ownership check 需要明确修复方案

- Issue：[`#3874 OneCLI gateway: ownership check uses group existence, not installation identity`](https://github.com/qwibitai/nanoclaw/issues/3874)
- 状态：Open
- 优先级建议：高

建议维护者尽快确认：

- 是否需要将 ownership check 改为 installation identity 绑定。
- 是否存在跨安装误识别风险。
- 是否需要补充回归测试。
- 是否影响 v2.4.0 的 credential gateway 体系。

---

### 2. setup ping agent 容器清理 PR 待合并

- PR：[`#3878 fix(setup): stop the ping agent's container before deleting its folder`](https://github.com/qwibitai/nanoclaw/pull/3878)
- 状态：Open
- 优先级建议：中高

该 PR 与安装体验直接相关，且与今日已关闭的 update cutover 修复属于同一类容器生命周期问题。建议尽快 review 并合并。

---

### 3. warm turn transcript rotation 待处理

- PR：[`#3871 fix(agent-runner): rotate transcripts between warm turns`](https://github.com/qwibitai/nanoclaw/pull/3871)
- 状态：Open
- 优先级建议：中

该 PR 对长期运行任务、定时任务和 warm container 复用场景很重要。建议关注其测试覆盖，尤其是：

- 多轮 warm query
- scheduled task
- transcript size threshold
- rotation 后上下文恢复行为

---

### 4. Graphiti 长期记忆 skill 待评审

- PR：[`#3870 feat(skills): add /add-graphiti knowledge-graph memory`](https://github.com/qwibitai/nanoclaw/pull/3870)
- 状态：Open
- 优先级建议：中

这是功能性增强，价值较高，但也可能引入新的部署依赖和运维复杂度，例如 Neo4j 服务、Graphiti 配置、数据持久化、权限和隐私问题。建议在合并前重点评审：

- skill 安装/卸载流程
- Neo4j 数据卷管理
- memory 查询权限
- 多 group 隔离
- 失败回滚策略

---

## 总体健康度评估

NanoClaw 今日项目健康度表现良好：发布节奏稳定，v2.4.0 带来明确的新能力；维护者快速处理安装、升级、通道、gateway 等关键路径问题；开放 PR 中既有稳定性修复，也有长期记忆等路线图级功能。  
主要风险集中在 **凭据身份边界、容器生命周期、长期运行资源管理** 三个方面。若 [`#3874`](https://github.com/qwibitai/nanoclaw/issues/3874)、[`#3878`](https://github.com/qwibitai/nanoclaw/pull/3878)、[`#3871`](https://github.com/qwibitai/nanoclaw/pull/3871) 能在短期内得到处理，v2.4.x 分支的稳定性将进一步增强。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报  
**日期：2026-09-24**  
**仓库：** [nearai/ironclaw](https://github.com/nearai/ironclaw)

---

## 1. 今日速览

过去 24 小时内，IronClaw **没有 Issue 更新**，说明用户侧缺陷反馈、功能请求和讨论活动较低。PR 侧有 **2 条新/更新的开放 PR**，均处于待合并状态，主要集中在 **发布准备、依赖安全更新与文档澄清**。今日没有新版本发布，也没有 PR 被合并或关闭，因此项目主干功能推进有限，但维护活动仍在持续。整体来看，项目今日活跃度为 **低到中等**：社区反馈较安静，核心维护者在为 `1.4.1-rc.2` 候选版本做收尾准备。

---

## 2. 版本发布

今日 **无新版本发布**。

当前可观察到的版本相关信号来自待合并 PR：

- [PR #8110 chore(release): cut 1.4.1-rc.2](https://github.com/nearai/ironclaw/pull/8110)

该 PR 表明项目正在推进 `1.4.1-rc.2` 候选版本，但截至日报时间尚未正式发布。

---

## 3. 项目进展

今日没有已合并或已关闭的 PR，因此暂无已经落地到主线的功能或修复。

不过有 2 个开放 PR 值得关注：

### 待合并：发布候选版本准备

- [PR #8110 chore(release): cut 1.4.1-rc.2](https://github.com/nearai/ironclaw/pull/8110)  
  **状态：OPEN**  
  **作者：** serrrfirat  
  **标签特征：** size: M, risk: low, scope: docs, scope: dependencies, contributor: core  

  该 PR 主要用于推进 `1.4.1-rc.2`，内容包括：

  - 将 dated release branch 从 `1.4.1-rc.1` 推进到 `1.4.1-rc.2`
  - 保持 RC2 范围聚焦于 RC1 已携带的 Google extension OAuth readiness fix
  - 刷新 lockfile，引入 patched `wasmtime 47.0.4` 与 `rustls 0.23.45`
  - 对齐当前 advisory database 中要求的安全依赖版本

  **影响判断：**  
  该 PR 不像是功能扩展，而是偏向发布工程和安全依赖维护。若合并，将提升即将发布候选版本的安全性与合规性，对稳定性和供应链安全有正面作用。

### 待合并：技能系统文档澄清

- [PR #8109 docs(skills): clarify scoped virtual skill roots](https://github.com/nearai/ironclaw/pull/8109)  
  **状态：OPEN**  
  **作者：** mmemcormier  

  该 PR 更新 skills 相关文档，重点包括：

  - 用 scoped virtual skill roots 替代过时的 host-directory discovery 指引
  - 明确 `/skills`、`/system/skills` 以及可选的 `/tenant-shared/skills`
  - 区分 runtime discovery 与 standalone legacy disk imports
  - 澄清 trust assignment，但不改变运行时行为

  **影响判断：**  
  这是面向开发者和运维使用者的文档改进，有助于减少对技能根目录、运行时发现机制和租户共享技能目录的误解。虽然不改变代码行为，但对采用 IronClaw skill 体系的用户具有实际价值。

---

## 4. 社区热点

今日没有 Issue 活动，也没有高评论或高反应数量的讨论。现有 2 个开放 PR 的评论数和反应数均未显示出明显社区热度。

相对而言，今日最值得关注的是：

1. [PR #8110 chore(release): cut 1.4.1-rc.2](https://github.com/nearai/ironclaw/pull/8110)  
   **热点原因：** 关联即将到来的 `1.4.1-rc.2`，并包含安全依赖更新。  
   **背后诉求：** 维护者希望在正式发布前消除 advisory database 中的依赖风险，尤其是 `wasmtime` 和 `rustls` 相关安全更新。

2. [PR #8109 docs(skills): clarify scoped virtual skill roots](https://github.com/nearai/ironclaw/pull/8109)  
   **热点原因：** 涉及 skill discovery 和 trust assignment 文档澄清。  
   **背后诉求：** 用户或贡献者可能在理解运行时技能发现路径、系统技能与租户共享技能边界时遇到歧义，因此需要更新官方文档。

---

## 5. Bug 与稳定性

过去 24 小时内没有新的 Bug Issue、崩溃报告或回归问题。

可观察到的稳定性相关工作主要来自：

- [PR #8110 chore(release): cut 1.4.1-rc.2](https://github.com/nearai/ironclaw/pull/8110)

### 稳定性与安全性关注点

| 严重程度 | 类型 | 说明 | 是否已有 fix PR |
|---|---|---|---|
| 中 | 依赖安全更新 | lockfile 刷新到 patched `wasmtime 47.0.4` 与 `rustls 0.23.45`，用于满足当前 advisory database 要求 | 是，[PR #8110](https://github.com/nearai/ironclaw/pull/8110) |
| 低 | 发布候选版本一致性 | 将 `1.4.1-rc.1` 推进到 `1.4.1-rc.2`，保持修复范围稳定 | 是，[PR #8110](https://github.com/nearai/ironclaw/pull/8110) |

今日没有发现新的高严重度生产问题。

---

## 6. 功能请求与路线图信号

今日没有新的功能请求 Issue。

不过从现有 PR 可以观察到两个路线图信号：

### 1. `1.4.1` 发布线正在收敛

- [PR #8110 chore(release): cut 1.4.1-rc.2](https://github.com/nearai/ironclaw/pull/8110)

`1.4.1-rc.2` 的准备说明 `1.4.1` 版本线可能已进入候选发布阶段。该版本看起来不会引入大范围功能变更，而是聚焦于：

- Google extension OAuth readiness fix
- 安全依赖修补
- 发布工程清理

### 2. Skill 体系文档正在标准化

- [PR #8109 docs(skills): clarify scoped virtual skill roots](https://github.com/nearai/ironclaw/pull/8109)

文档中强调 `/skills`、`/system/skills`、`/tenant-shared/skills` 这类 scoped virtual roots，说明项目正在进一步规范多来源、多租户或系统级 skill 管理方式。虽然该 PR 不改变运行时行为，但它可能为后续 skill 权限、隔离、发现机制和租户共享能力的演进打基础。

---

## 7. 用户反馈摘要

今日没有 Issue 评论数据，因此无法提炼新的真实用户反馈、痛点或满意度信号。

从文档 PR 可间接推断的潜在用户痛点包括：

- 用户可能仍在参考过时的 host-directory discovery 说明
- 使用者可能不清楚 runtime discovery 与 legacy disk imports 的区别
- 多路径 skill roots 的信任边界可能存在理解成本
- `/tenant-shared/skills` 这类共享目录可能需要更明确的使用约束和安全语义

相关 PR：

- [PR #8109 docs(skills): clarify scoped virtual skill roots](https://github.com/nearai/ironclaw/pull/8109)

---

## 8. 待处理积压

基于今日提供的数据，没有长期未响应的 Issue 或 PR 信息，因此无法判断历史积压情况。

当前需要维护者关注的待处理项主要是 2 个新近开放 PR：

1. [PR #8110 chore(release): cut 1.4.1-rc.2](https://github.com/nearai/ironclaw/pull/8110)  
   **建议优先级：高**  
   **原因：** 关联候选版本发布与安全依赖更新。如果 CI 通过且 review 无异议，应优先完成合并，以减少发布阻塞。

2. [PR #8109 docs(skills): clarify scoped virtual skill roots](https://github.com/nearai/ironclaw/pull/8109)  
   **建议优先级：中**  
   **原因：** 文档改动风险较低，有助于降低 skill 体系使用误解。建议尽快 review，避免文档与当前运行时模型继续脱节。

---

## 项目健康度评估

| 维度 | 今日状态 | 评估 |
|---|---|---|
| Issue 活跃度 | 0 条更新 | 低 |
| PR 活跃度 | 2 条开放 PR | 中低 |
| 发布节奏 | 无正式 release，但有 RC2 准备 PR | 稳定推进 |
| 稳定性风险 | 无新增 Bug，存在依赖安全更新 | 可控 |
| 社区讨论 | 无明显高热讨论 | 偏安静 |
| 维护者活动 | 有 core contributor 发布工程 PR | 持续维护中 |

**综合判断：** IronClaw 今日处于低噪声维护状态。没有新的用户问题或社区争议，核心活动集中在 `1.4.1-rc.2` 发布候选准备、安全依赖修补和 skill 文档准确性提升。项目健康度总体稳定，但短期重点应放在尽快 review 并合并发布相关 PR，推动 `1.4.1` 正式发布。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-09-24）

## 1. 今日速览

过去 24 小时，LobsterAI 没有新的 Issue 活动，但 PR 侧非常活跃，共有 7 个 PR 被关闭/合并处理，并发布了新版本 **LobsterAI 2026.9.23**。今日工作重心集中在 **OpenClaw 稳定性修复、Cowork 交互体验、实验性决策模型能力、运行时依赖升级与订阅活动展示策略**。  
从数据看，项目当前处于 **高频迭代与发布状态**：虽然社区 Issue 反馈较少，但核心维护者持续推进功能与稳定性改进。整体健康度较好，短期重点更偏向产品体验完善和底层代理/网关可靠性增强。

---

## 2. 版本发布

### LobsterAI 2026.9.23

- Release：<https://github.com/netease-youdao/LobsterAI/releases/tag/2026.9.23>
- 发布时间：2026-09-23

本次发布包含多个功能增强与稳定性修复，主要覆盖 **决策模型、Cowork 步骤流式展示、OpenClaw 配置热更新与插件异常降级** 等方向。

### 已知更新内容

#### 1. 新增实验性 Jev 决策模型工具

关联 PR：[#2753](https://github.com/netease-youdao/LobsterAI/pull/2753)

本次发布引入实验性的 **Jev decision model tool**，包括：

- BYO-key 决策模型服务配置；
- 客户端与 MCP tool handler；
- IPC bridge；
- OpenClaw `lobster-decision` extension；
- 设置页入口，位于实验性功能区域。

该功能表明 LobsterAI 正在加强 **AI Agent 的决策层能力**，为后续多模型协作、任务规划或策略选择提供基础设施。

#### 2. Cowork 支持每步骤实时进度与 diff 统计

关联 PR：[#2749](https://github.com/netease-youdao/LobsterAI/pull/2749)

Release notes 中提到新增 Cowork 的 **per-step turn progress** 与 **diff stats** 流式展示能力。虽然本日报数据中未列出 #2749 的完整 PR 信息，但结合 #2756 可判断 Cowork 的交互层正在被系统性重构，目标是提升长任务、多步骤 Agent 执行过程中的可观测性。

#### 3. Cowork 活动步骤渲染统一

关联 PR：[#2756](https://github.com/netease-youdao/LobsterAI/pull/2756)

统一 activity step 的展示方式，用单一 `ActivityStepLine` 组件覆盖：

- thinking；
- commands；
- reads / edits；
- search；
- web；
- media；
- agent；
- todo；
- schedule。

这将改善 Cowork 执行过程中的 UI 一致性，也有助于后续扩展更多 Agent 行为类型。

#### 4. OpenClaw 配置应用可靠性修复

关联 PR：[#2755](https://github.com/netease-youdao/LobsterAI/pull/2755)

修复代理端口或模型配置更新后，新任务仍可能使用旧配置的问题。该 PR 将运行时交付统一为带版本条件的 `config.apply`，确保配置真正应用后才允许新任务继续执行。

#### 5. OpenClaw 插件异常降级启动

关联 PR：[#2754](https://github.com/netease-youdao/LobsterAI/pull/2754)

当插件升级或校验失败时，不再直接拒绝整个网关启动，而是隔离失败插件并保留健康会话。这明显提升了插件生态下的容错能力。

#### 6. dsh runtime 升级至 0.1.5 rc.3

关联 PR：[#2752](https://github.com/netease-youdao/LobsterAI/pull/2752)

运行时依赖更新，有助于同步底层能力与 bugfix，但由于摘要信息较少，暂无法判断是否包含行为变化。

#### 7. 订阅试用活动展示范围扩大

关联 PR：[#2751](https://github.com/netease-youdao/LobsterAI/pull/2751)

将“一分钱体验活动”的弹窗展示范围扩展至匿名、已订阅及团队身份用户，但购买资格仍由服务端和 Portal 校验。

### 破坏性变更

基于当前数据，未看到明确标注的 breaking change。  
但以下变更可能带来行为层面的影响，建议用户和集成方关注：

- OpenClaw 配置热更新流程更严格，任务启动前会等待配置版本一致；
- 插件异常时不再整体阻断网关启动，而是采用隔离降级策略；
- 实验性 Jev 决策模型功能需要用户自行配置 key，并通过实验性功能入口启用。

### 迁移与升级注意事项

1. **使用 OpenClaw 的用户**  
   建议升级后重点验证模型配置、代理端口配置、插件加载状态是否符合预期。  
   相关 PR：
   - [#2755](https://github.com/netease-youdao/LobsterAI/pull/2755)
   - [#2754](https://github.com/netease-youdao/LobsterAI/pull/2754)

2. **使用插件能力的用户**  
   插件异常时系统会优先保留基础会话能力，而不是整体启动失败。管理员应关注日志中的插件隔离告警。

3. **尝试实验性决策模型的用户**  
   Jev decision model 处于实验性阶段，建议仅在测试环境或明确可回滚的环境中使用。  
   相关 PR：[#2753](https://github.com/netease-youdao/LobsterAI/pull/2753)

---

## 3. 项目进展

过去 24 小时共有 7 个 PR 被关闭/合并处理，主要进展如下。

### 3.1 Release 分支收敛与版本发布

#### #2757 Release/2026.9.23

- 链接：<https://github.com/netease-youdao/LobsterAI/pull/2757>
- 作者：liuzhq1986
- 状态：Closed
- 涉及领域：renderer、build、docs、main、openclaw、cowork

该 PR 对应 `2026.9.23` 版本发布收敛，覆盖多个核心模块，说明本次 release 并非单点变更，而是一次横跨前端渲染、构建、文档、OpenClaw 与 Cowork 的综合发布。

### 3.2 Cowork 执行过程可视化增强

#### #2756 feat(cowork): unify activity step rendering with turn timing

- 链接：<https://github.com/netease-youdao/LobsterAI/pull/2756>
- 作者：fisherdaddy
- 状态：Closed
- 涉及领域：renderer、main、cowork

该 PR 将原有 row/detail activity 变体统一为 `ActivityStepLine` 组件，并覆盖多类 Agent 执行动作。  
核心价值：

- 改善多步骤任务展示一致性；
- 支持更准确的 turn timing；
- 对分页加载的历史会话窗口也能计算跨页开始的 turn 时间；
- 为后续更复杂的 Agent 执行轨迹展示打基础。

这表明 LobsterAI 正在强化 **Agent 可观测性**，用户可以更清楚地理解 AI 当前在做什么、执行了哪些动作、耗时如何。

### 3.3 OpenClaw 配置热更新可靠性修复

#### #2755 fix(openclaw): reconcile config application before starting tasks

- 链接：<https://github.com/netease-youdao/LobsterAI/pull/2755>
- 作者：btc69m979y-dotcom
- 状态：Closed
- 涉及领域：renderer、docs、main、openclaw、cowork

该 PR 修复了配置更新后运行时仍使用旧配置的风险。  
问题背景是旧流程可能将 `config.set` 的保存成功误认为运行时已应用成功，导致新任务继续使用旧代理端口或旧模型配置。

修复要点：

- 将运行中的交付统一为带版本条件的 `config.apply`；
- 确认目标内容和应用版本一致后才放行新任务；
- 对无变化同步、断线、恢复冷却等状态进行一致性处理；
- 环境变化时要求启动真实新进程；
- 回迁 OpenClaw 上游候选观察缓存失效修复；
- 补充规格与版本补丁文档。

该 PR 属于稳定性关键修复，直接影响用户配置变更后的任务可靠性。

### 3.4 OpenClaw 插件异常容错增强

#### #2754 fix(openclaw): 插件异常时降级启动并保留基础会话

- 链接：<https://github.com/netease-youdao/LobsterAI/pull/2754>
- 作者：btc69m979y-dotcom
- 状态：Closed
- 涉及领域：build、docs、main、openclaw

该 PR 解决插件升级或校验失败时，整个网关拒绝启动的问题。  
改进后：

- 失败插件会被隔离；
- 配置仍被保留；
- 健康会话可以继续工作；
- 核心配置错误、迁移租约错误、状态迁移错误仍会拒绝启动。

这降低了插件异常对整体系统可用性的影响，对于依赖多插件、多模型环境的用户尤其重要。

### 3.5 实验性决策模型能力上线

#### #2753 feat(decision-model): add experimental Jev decision model tool

- 链接：<https://github.com/netease-youdao/LobsterAI/pull/2753>
- 作者：fisherdaddy
- 状态：Closed
- 涉及领域：renderer、build、main、openclaw

该 PR 新增实验性 Jev 决策模型工具，覆盖配置、客户端、MCP tool handler、IPC bridge 与 OpenClaw 扩展。  
项目层面意义较大：

- 表明 LobsterAI 正在尝试将“决策模型”作为 Agent 工作流中的独立能力；
- BYO-key 模式降低了平台侧模型绑定；
- MCP tool handler 和 OpenClaw extension 说明该能力可能被纳入工具调用或代理执行链路。

### 3.6 dsh runtime 升级

#### #2752 feat: update dsh runtime to 0.1.5 rc.3

- 链接：<https://github.com/netease-youdao/LobsterAI/pull/2752>
- 作者：fisherdaddy
- 状态：Closed
- 涉及领域：build、docs、main

该 PR 将 dsh runtime 更新到 `0.1.5 rc.3`。  
由于摘要为空，暂无法确认具体修复或新增能力，但作为 runtime 依赖升级，可能影响执行环境、任务运行性能或底层兼容性。

### 3.7 订阅试用活动触达范围扩大

#### #2751 feat(subscription-trial): broaden campaign visibility

- 链接：<https://github.com/netease-youdao/LobsterAI/pull/2751>
- 作者：Mind-Hand
- 状态：Closed
- 涉及领域：renderer、docs

该 PR 扩大“一分钱体验活动”的弹窗展示范围。  
变更内容：

- 移除客户端首次登录、订阅状态、团队身份展示门槛；
- 继续遵守隐私同意、启动遮罩、服务端 `active && visible`、本地弹窗频控；
- 更新中英文活动文案；
- 明确购买资格仍由服务端与 Portal 校验；
- 新增服务端对接文档。

该变更更多属于增长与商业化体验优化，目标是扩大活动可见性，同时将资格校验留在服务端，降低客户端误判风险。

---

## 4. 社区热点

今日没有 Issue 更新，也没有记录到评论数、表情反应较高的讨论项。所有 PR 的评论数在数据中均为 `undefined`，点赞数均为 0，因此无法基于互动数据判断真实社区热度。

不过从变更内容看，以下 PR 具备较高产品与技术关注度：

### 热点 1：OpenClaw 配置热更新一致性

- PR：[#2755](https://github.com/netease-youdao/LobsterAI/pull/2755)

该变更解决的是配置保存与运行时应用之间的不一致问题。背后的诉求是：用户修改模型或代理端口后，希望新任务立即使用新配置，而不是继续沿用旧状态。  
这类问题通常会直接影响用户对系统可靠性的信任。

### 热点 2：OpenClaw 插件异常降级

- PR：[#2754](https://github.com/netease-youdao/LobsterAI/pull/2754)

插件失败不应拖垮整个网关，这是 Agent 平台走向插件生态后必须解决的稳定性问题。该 PR 反映出项目正在从“功能可用”转向“复杂环境下可靠可用”。

### 热点 3：实验性 Jev 决策模型

- PR：[#2753](https://github.com/netease-youdao/LobsterAI/pull/2753)

决策模型能力可能成为后续 Agent 智能体任务规划、工具选择和策略执行的基础模块。虽然目前是实验性功能，但路线图信号较强。

---

## 5. Bug 与稳定性

今日没有新的 Issue 报告 Bug、崩溃或回归问题。但 PR 中包含多个明确的稳定性修复。

### 严重程度：高

#### OpenClaw 配置更新后新任务可能继续使用旧配置

- Fix PR：[#2755](https://github.com/netease-youdao/LobsterAI/pull/2755)
- 状态：Closed
- 影响范围：OpenClaw 配置、代理端口、模型配置、任务启动流程

问题表现：配置保存成功后，运行时未必真正应用完成，新任务可能继续使用旧配置。  
修复方式：使用带版本条件的 `config.apply`，确保配置内容和应用版本一致后再放行任务。

### 严重程度：高

#### 插件异常导致整个 OpenClaw 网关拒绝启动

- Fix PR：[#2754](https://github.com/netease-youdao/LobsterAI/pull/2754)
- 状态：Closed
- 影响范围：OpenClaw 插件系统、网关启动、基础会话能力

问题表现：插件升级或校验失败时，修复告警可能升级为整个网关启动失败，导致健康模型也无法对话。  
修复方式：隔离失败插件，保留健康会话能力；核心错误仍拒绝启动。

### 严重程度：中

#### Cowork 历史分页场景下 turn timing 可能不准确

- Fix PR：[#2756](https://github.com/netease-youdao/LobsterAI/pull/2756)
- 状态：Closed
- 影响范围：Cowork 活动步骤展示、会话分页、执行耗时展示

修复方式：新增 `leadingTurnStartTimestamp`，使分页加载的会话窗口仍可计算从上一页开始的 turn 时间。

---

## 6. 功能请求与路线图信号

今日没有新的 Issue，因此没有直接来自用户的新功能请求。不过从 PR 方向可观察到以下路线图信号。

### 6.1 决策模型可能成为 Agent 能力建设重点

- PR：[#2753](https://github.com/netease-youdao/LobsterAI/pull/2753)

实验性 Jev decision model tool 的接入说明项目正在探索独立的决策模型层。  
可能的后续方向：

- 多模型决策路由；
- Agent 执行前的策略选择；
- 工具调用决策优化；
- 与 MCP 工具链更深集成；
- OpenClaw 扩展生态中的决策插件化。

### 6.2 Cowork 可观测性会继续增强

- PR：[#2756](https://github.com/netease-youdao/LobsterAI/pull/2756)
- Release note 相关 PR：[#2749](https://github.com/netease-youdao/LobsterAI/pull/2749)

Cowork 正在强化 per-step progress、diff stats、turn timing 等能力。  
这表明项目后续可能继续围绕以下方向迭代：

- 更清晰的 Agent 执行轨迹；
- 代码变更 diff 统计；
- 长任务进度反馈；
- 多步骤任务的失败定位与恢复。

### 6.3 OpenClaw 将继续加强生产级稳定性

- PR：[#2755](https://github.com/netease-youdao/LobsterAI/pull/2755)
- PR：[#2754](https://github.com/netease-youdao/LobsterAI/pull/2754)

OpenClaw 相关改动集中在配置一致性、插件容错、任务启动前校验，说明该模块正向更可靠的运行时平台演进。

### 6.4 商业化与试用转化链路持续优化

- PR：[#2751](https://github.com/netease-youdao/LobsterAI/pull/2751)

订阅试用活动触达范围扩大，说明项目仍在优化用户转化路径。后续可能出现更多与 Portal、服务端资格校验、活动展示策略相关的改动。

---

## 7. 用户反馈摘要

今日没有 Issue 评论数据，因此无法直接提炼真实用户反馈。基于 PR 所修复的问题，可以间接归纳出以下潜在用户痛点：

1. **配置变更不可信**  
   用户修改代理端口或模型配置后，期望新任务立即使用新配置。若系统继续使用旧配置，会造成明显困惑。  
   相关 PR：[#2755](https://github.com/netease-youdao/LobsterAI/pull/2755)

2. **插件失败影响整体可用性**  
   在多插件环境中，单个插件异常不应导致所有模型和会话不可用。  
   相关 PR：[#2754](https://github.com/netease-youdao/LobsterAI/pull/2754)

3. **Agent 执行过程需要更透明**  
   用户希望知道 Cowork 正在执行哪一步、耗时多久、产生了哪些改动。  
   相关 PR：[#2756](https://github.com/netease-youdao/LobsterAI/pull/2756)

4. **订阅活动资格与展示逻辑需要清晰**  
   活动可见性扩大，但购买资格仍由服务端校验，说明客户端展示与实际购买资格之间需要明确文案解释。  
   相关 PR：[#2751](https://github.com/netease-youdao/LobsterAI/pull/2751)

---

## 8. 待处理积压

当前数据中没有开放 Issue，也没有待合并 PR：

- 过去 24 小时新开/活跃 Issue：0
- 过去 24 小时关闭 Issue：0
- 待合并 PR：0
- 已合并/关闭 PR：7

因此，今日没有可识别的长期未响应 Issue 或 PR。  
建议维护者后续重点关注：

1. **#2753 实验性决策模型的用户反馈与稳定性**
   - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2753>

2. **#2755 配置热更新修复上线后的回归验证**
   - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2755>

3. **#2754 插件降级启动策略的边界场景**
   - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2754>

4. **#2751 活动展示扩大后的用户体验与投诉风险**
   - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2751>

---

## 项目健康度评估

- **开发活跃度：高**  
  24 小时内处理 7 个 PR，并发布新版本。

- **社区反馈活跃度：低**  
  无 Issue 更新，PR 评论与反应数据缺失或较少。

- **稳定性投入：高**  
  OpenClaw 相关两个 PR 均直接面向运行时可靠性和故障隔离。

- **功能演进速度：较快**  
  决策模型、Cowork 可观测性、runtime 升级同时推进。

- **风险点：中等**  
  新增实验性决策模型和运行时升级可能带来兼容性与边界问题；OpenClaw 配置与插件机制变更也需要充分回归测试。

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

# CoPaw 项目动态日报  
日期：2026-09-24  
数据范围：过去 24 小时 GitHub Issues / Pull Requests / Releases  
> 注：输入数据中的链接标注为 `agentscope-ai/QwenPaw`，本文按用户指定项目 `agentscope-ai/CoPaw` 生成 GitHub 链接；如仓库存在迁移或镜像，请以实际仓库为准。

---

## 1. 今日速览

过去 24 小时，CoPaw 项目保持较高开发活跃度：新增或活跃 Issues 3 条，PR 更新 10 条，其中 8 条仍待合并，2 条已关闭或合并。今日没有新版本发布，说明当前重点仍在缺陷修复、架构改造和功能准备阶段，而非正式发版。

从内容看，项目维护重点集中在 **模型 Provider 兼容性、流式调用稳定性、配置错误可观测性、Web/Console 体验优化、存储后端演进** 等方向。社区侧也开始提出更偏平台化和企业集成的需求，例如 A2A Server、可禁用预置模型与频道等，显示 CoPaw 正从单体 AI 助手工具向更复杂的 Agent 网络与企业部署场景延伸。

整体健康度评估：**活跃度较高，问题响应较快，但待合并 PR 较多，短期需要维护者集中 Review，避免功能与修复积压。**

---

## 2. 项目进展

今日无新版本发布，因此本节聚焦已关闭/合并 PR 以及关键待合并 PR 的推进情况。

### 已关闭 / 已合并的重要 PR

#### #7955 docs(website): add download provenance and usage policy  
链接：[PR #7955](https://github.com/agentscope-ai/CoPaw/pull/7955)  
状态：CLOSED

该 PR 为官网补充了下载来源说明与使用政策页面，明确 Downloads 来自 CoPaw 开源项目构建，并标注 Apache License 2.0。  
这类变更虽然不直接影响运行时功能，但对项目治理、合规透明度和企业用户评估非常重要。

推进意义：

- 提升下载页面可信度；
- 明确开源许可证；
- 增加 Usage Policy 入口；
- 有助于降低企业用户采用时的合规疑虑。

---

#### #7952 fix(hub): distinguish invitation redemption failure reasons  
链接：[PR #7952](https://github.com/agentscope-ai/CoPaw/pull/7952)  
状态：CLOSED

该 PR 改进了邀请兑换失败时的错误区分。此前 `InvitationService.redeem()` 会把五类失败原因统一折叠为：

```text
PermissionError("Invalid or unavailable invitation")
```

导致注册接口始终返回相同的 403 错误，运营和支持人员无法区分是邀请码拼写错误、批次被撤销、邀请码过期，还是其他不可用原因。

推进意义：

- 提升 Hub / 注册流程的可观测性；
- 降低用户支持成本；
- 有利于企业或团队场景中的邀请制管理；
- 改善错误提示的可操作性。

---

### 今日仍待合并但值得关注的 PR

#### #7962 fix(providers): add the type Moonshot requires on enum tool schemas  
链接：[PR #7962](https://github.com/agentscope-ai/CoPaw/pull/7962)  
关联 Issue：[Issue #7959](https://github.com/agentscope-ai/CoPaw/issues/7959)

该 PR 直接响应 Moonshot / kimi-k3 在 MCP tool schema 校验中的兼容性问题。报告指出 Moonshot 会拒绝缺少顶层 `type` 的工具参数 schema，导致请求在模型调用前即 HTTP 400。

这是今日最明确的「Issue → Fix PR」闭环，建议优先 Review。

---

#### #7960 fix(providers): recover after stalled stream cleanup  
链接：[PR #7960](https://github.com/agentscope-ai/CoPaw/pull/7960)

该 PR 处理流式 Provider 读取卡住后，清理逻辑可能导致 provider/model key 长时间处于隔离状态的问题。变更引入 60 秒单调时钟 deadline，避免同一进程后续请求持续失败直到重启。

该修复对长时间运行的服务部署尤为关键。

---

#### #7954 feat(storage): add async backend contracts and migration foundation  
链接：[PR #7954](https://github.com/agentscope-ai/CoPaw/pull/7954)

该 PR 引入异步 SQLite/PostgreSQL 存储契约与迁移基础，目标是解决多个 CoPaw 实例通过 NFS 共享 SQLite 文件时可能出现的数据库错误，以及历史序列号与 session checkpoint 不连续问题。

这是一个偏长期架构演进的 PR，意味着项目正在考虑多实例部署、PostgreSQL 后端和迁移能力。

---

## 3. 社区热点

### 最高讨论度：#7959 Moonshot / kimi-k3 拒绝 MCP tool schema  
链接：[Issue #7959](https://github.com/agentscope-ai/CoPaw/issues/7959)  
状态：OPEN  
评论数：2  
关联修复：[PR #7962](https://github.com/agentscope-ai/CoPaw/pull/7962)

该 Issue 是今日最活跃的问题。用户报告当模型使用 Moonshot `kimi-cn` / `kimi-intl` provider，例如 `kimi-k3` 时，携带 MCP tools 的 agent turn 会因为工具参数 schema 中存在缺少顶层 `type` 的非空 `anyOf` union 而失败，HTTP 400 发生在模型实际调用前。

背后诉求：

- 用户希望 CoPaw 的 MCP 工具 schema 能兼容更多模型服务商；
- Provider 层需要屏蔽不同厂商 JSON Schema 方言差异；
- 对 Agent 工具调用链路而言，schema 兼容性是基础稳定性问题。

该问题已经有修复 PR #7962，说明维护响应速度较快。

---

### 企业 Agent 网络互操作：#7958 A2A server  
链接：[Issue #7958](https://github.com/agentscope-ai/CoPaw/issues/7958)  
状态：OPEN  
评论数：1

用户希望贡献 server-side A2A，让 CoPaw agents 能作为 A2A v1.0 peers 被网络中的其他 agent 发现和委托调用。该需求明确指出它是 #7484 的补充：#7484 偏 client-side，而本 issue 关注 server-side。

背后诉求：

- 企业内网中多个 Agent 系统之间需要互相发现；
- CoPaw 不只是调用外部 Agent，也应能被外部 Agent 调用；
- 项目可能需要考虑 agent discovery、能力描述、安全边界、鉴权和调用协议兼容。

这是一个强路线图信号，可能影响未来 Agent-to-Agent 互操作方向。

---

### 配置可控性：#7957 可手动禁用预置模型和频道  
链接：[Issue #7957](https://github.com/agentscope-ai/CoPaw/issues/7957)  
状态：OPEN  
评论数：1

用户建议允许手动停用或禁用预置模型与频道，理由是界面中存在很多未使用项会造成干扰。

背后诉求：

- 用户希望界面更简洁；
- 企业或个人部署中并非所有预置模型/频道都可用；
- 管理员可能需要隐藏不可用、未采购或不合规的 Provider；
- 这也与 Console 设置体验优化 PR #7956 的方向一致。

---

## 4. Bug 与稳定性

按严重程度和影响范围排序如下。

### 高优先级：Moonshot / kimi-k3 MCP 工具 schema 兼容性失败  
链接：[Issue #7959](https://github.com/agentscope-ai/CoPaw/issues/7959)  
状态：OPEN  
影响范围：Moonshot `kimi-cn` / `kimi-intl` provider，尤其是 `kimi-k3` 与 MCP tools 组合场景  
是否已有修复：有，[PR #7962](https://github.com/agentscope-ai/CoPaw/pull/7962)

问题表现：

- 使用 MCP tools 时，参数 schema 包含 Moonshot 不接受的结构；
- 请求在模型调用前即返回 HTTP 400；
- 对 Agent 工具调用链路是阻断性问题。

建议：

- 优先 Review 并合并 PR #7962；
- 增加 provider-specific schema normalization 测试；
- 对 Moonshot 这类严格 schema 校验服务商建立兼容性测试集。

---

### 高优先级：流式 Provider 清理卡住导致后续请求持续失败  
链接：[PR #7960](https://github.com/agentscope-ai/CoPaw/pull/7960)  
状态：OPEN

问题背景：

- 某些 streaming provider 的读取可能无法协作式结束；
- 清理逻辑延迟后，provider/model key 可能持续被 quarantine；
- 同一进程中的后续请求可能失败，直到服务重启。

该 PR 引入 60 秒 deadline 来限制隔离时间，是典型的服务稳定性修复。

建议：

- 补充长连接、超时、取消、异常 provider 的回归测试；
- 合并前确认 quarantine 恢复策略不会掩盖真实 Provider 故障。

---

### 中高优先级：发送前模型探测掩盖真实错误  
链接：[PR #7950](https://github.com/agentscope-ai/CoPaw/pull/7950)  
状态：OPEN

该 PR 修复聊天发送前 session-model probe 过度泛化错误的问题。此前除“模型已配置”之外的任何结果，都可能被当成“未配置模型”，例如网络抖动、代理超时、配置临时不可读等，最终向用户展示错误的配置提示。

影响：

- 用户看到的错误原因不准确；
- 真实网络或后端故障被误判为配置问题；
- 增加排障难度。

---

### 中高优先级：无法区分不可读配置与未选择模型  
链接：[PR #7951](https://github.com/agentscope-ai/CoPaw/pull/7951)  
状态：OPEN

该 PR 修复 `GET /api/models/active` 吞掉多类异常并返回全局模型的问题。此前 unreadable agent configuration 与 no model selected 无法区分，客户端可能错误展示模型状态。

影响：

- 配置文件权限、损坏、解析失败等问题被隐藏；
- 用户误以为系统仍有可用模型；
- 管理员排查难度增加。

---

### 中优先级：资源导入失败信息不够可操作  
链接：[PR #7953](https://github.com/agentscope-ai/CoPaw/pull/7953)  
状态：OPEN

该 PR 旨在保留 per-asset import failures 的可操作错误信息。虽然摘要较短，但方向上属于提升迁移、导入和 portability 场景下的诊断能力。

---

## 5. 功能请求与路线图信号

### A2A Server：将 CoPaw Agent 暴露为可发现的 A2A v1.0 peer  
链接：[Issue #7958](https://github.com/agentscope-ai/CoPaw/issues/7958)

这是今日最明显的路线图信号。用户不是简单要求一个 UI 功能，而是希望 CoPaw 在 Agent 网络中成为可被发现和委托的节点。

可能纳入后续版本的原因：

- 与 Agent 生态互操作趋势一致；
- 与已有 client-side A2A 需求互补；
- 适合企业内网多 Agent 协作场景；
- 若贡献者愿意提交实现，落地可能性较高。

潜在设计关注点：

- Agent discovery；
- A2A v1.0 协议兼容；
- 身份认证与权限控制；
- 能力描述与调用边界；
- 日志审计与限流。

---

### 可禁用预置模型和频道  
链接：[Issue #7957](https://github.com/agentscope-ai/CoPaw/issues/7957)

该需求与设置页、侧边栏、工具管理体验优化高度相关。当前已有 PR #7956 正在优化设置工作流与侧边栏交互：

- 链接：[PR #7956](https://github.com/agentscope-ai/CoPaw/pull/7956)

可能纳入后续版本的原因：

- 用户体验诉求明确；
- 与 Console 设置页重构方向一致；
- 实现复杂度相对可控；
- 对企业部署也有实际价值，例如隐藏不可用或未授权模型。

建议将其纳入 Console 设置体系中，以“启用/停用 Provider、模型、频道”的形式统一管理。

---

### 存储后端演进：异步 SQLite/PostgreSQL 与迁移基础  
链接：[PR #7954](https://github.com/agentscope-ai/CoPaw/pull/7954)

虽然这是 PR 而非 Issue，但它释放出明确路线图信号：CoPaw 正在从单机 SQLite 走向更适合多实例和企业部署的存储架构。

可能影响：

- PostgreSQL 后端支持；
- 异步存储访问契约；
- 数据迁移机制；
- 多实例部署稳定性；
- 历史记录与 session checkpoint 一致性。

---

## 6. 用户反馈摘要

### 用户痛点 1：不同模型服务商的 schema 兼容性不一致  
来源：[Issue #7959](https://github.com/agentscope-ai/CoPaw/issues/7959)

用户在 Moonshot / kimi-k3 场景下遇到 MCP tool schema 被拒绝的问题。这说明用户已经在真实工具调用场景中使用 CoPaw，而不是仅进行基础对话。  
痛点在于：同样的工具 schema 在不同 Provider 下表现不一致，用户很难自行判断是模型问题、Provider 问题还是 CoPaw schema 生成问题。

---

### 用户痛点 2：希望 CoPaw 能参与企业内网 Agent 协作  
来源：[Issue #7958](https://github.com/agentscope-ai/CoPaw/issues/7958)

用户明确提到 company intranet 场景，希望其他 agents 能发现并委托 CoPaw agents。这表明部分用户已经把 CoPaw 放入更大的企业 Agent 系统中，而不是单独使用。

核心诉求：

- Agent 可发现；
- Agent 可被委托；
- 支持标准化协议；
- 服务端能力与客户端能力同等重要。

---

### 用户痛点 3：预置模型和频道过多，影响管理体验  
来源：[Issue #7957](https://github.com/agentscope-ai/CoPaw/issues/7957)

用户希望可以禁用不使用的预置项，理由是界面中过多未使用内容会造成干扰。  
这类反馈说明 CoPaw 的功能覆盖面变广后，信息架构和可配置性开始成为用户体验瓶颈。

---

### 用户痛点 4：错误提示需要更准确、更可操作  
来源：[PR #7952](https://github.com/agentscope-ai/CoPaw/pull/7952)、[PR #7950](https://github.com/agentscope-ai/CoPaw/pull/7950)、[PR #7951](https://github.com/agentscope-ai/CoPaw/pull/7951)、[PR #7953](https://github.com/agentscope-ai/CoPaw/pull/7953)

多个 PR 都在修复“错误被吞掉或被错误归类”的问题，包括：

- 邀请兑换失败原因不明确；
- 模型探测把网络问题误判为未配置；
- 不可读配置被当作没有选择模型；
- 导入失败缺少 per-asset 级别的具体信息。

这说明项目进入更复杂使用场景后，用户和维护者都需要更强的诊断能力。

---

## 7. 待处理积压

基于过去 24 小时数据，未发现明确的“长期未响应” Issue 或 PR。但今日待处理队列中有 8 个 OPEN PR，维护者应关注短期 Review 积压风险。

### 建议优先 Review 的待处理 PR

1. [PR #7962](https://github.com/agentscope-ai/CoPaw/pull/7962)  
   修复 Moonshot MCP tool schema 兼容性问题，关联今日最活跃 Bug [Issue #7959](https://github.com/agentscope-ai/CoPaw/issues/7959)。建议优先处理。

2. [PR #7960](https://github.com/agentscope-ai/CoPaw/pull/7960)  
   修复 stalled stream cleanup 后 provider/model key 长时间隔离的问题，影响服务稳定性。

3. [PR #7950](https://github.com/agentscope-ai/CoPaw/pull/7950) 与 [PR #7951](https://github.com/agentscope-ai/CoPaw/pull/7951)  
   均与模型配置错误识别和错误提示准确性相关，建议合并评审，避免错误处理逻辑分叉。

4. [PR #7954](https://github.com/agentscope-ai/CoPaw/pull/7954)  
   涉及存储架构和迁移基础，改动可能较大，建议尽早进行架构层 Review，避免 Draft 长期悬挂。

5. [PR #7956](https://github.com/agentscope-ai/CoPaw/pull/7956)  
   Console 设置页与侧边栏优化范围较广，且摘要中明确仍在等待复验。建议拆分或分阶段合并，降低 Review 难度。

---

## 总结

今日 CoPaw 的开发活动集中在三个方向：**Provider 兼容与稳定性修复、错误可观测性提升、面向企业部署和 Agent 网络的能力扩展**。虽然没有新版本发布，但多个 PR 对实际使用可靠性有直接帮助，尤其是 Moonshot schema 修复、流式 Provider 恢复、模型配置错误识别等。

项目整体状态健康，社区反馈质量较高，且维护侧已有快速响应迹象。短期最大风险是待合并 PR 较多，建议维护者优先处理阻断性 Bug 和稳定性修复，再推进 Console 体验优化与存储架构演进。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报  
**日期：2026-09-24**  
**仓库：** github.com/zeroclaw-labs/zeroclaw

---

## 1. 今日速览

过去 24 小时 ZeroClaw 活跃度较高：共有 **2 个 Issue 更新**、**17 个 PR 更新**，但 **无 PR 合并/关闭**，也 **无新版本发布**。  
今日工作重心明显集中在 **CLI 工具扩展、运行时上下文/通道机制、CI 成本优化、依赖升级与安全策略修复**。  
从 PR 结构看，维护者和贡献者正在并行推进多个中高影响方向，其中包括 Antigravity CLI 集成、channel sender role 约束、运行时上下文裁剪修正，以及高风险 shell 命令拦截。  
项目整体处于 **高开发活跃、待评审队列较长** 的状态：17 个开放 PR 均未合并，短期内维护者评审压力较大。

---

## 2. 版本发布

过去 24 小时 **无新版本发布**。

---

## 3. 项目进展

今日没有已合并或已关闭的 PR，因此从“已落地变更”角度看，主分支暂无明确推进。不过，多个开放 PR 已形成清晰的开发方向，若后续合并，将对项目能力和稳定性产生较大影响。

### 重点待合并 PR

#### 3.1 新增 Antigravity CLI 编码代理工具

- **PR：** [#11076 feat(tools): add agy_cli coding-CLI tool for Antigravity CLI](https://github.com/zeroclaw-labs/zeroclaw/pull/11076)  
- **关联 Issue：** [#11075 Add `agy_cli` coding-CLI tool for Antigravity CLI](https://github.com/zeroclaw-labs/zeroclaw/issues/11075)  
- **状态：** Open  
- **规模：** XL  
- **影响范围：** docs、channel、config、runtime、tool、shell、ACP  

该 PR 计划新增 `agy_cli`，用于将编码任务委托给 Google Antigravity CLI `agy`。它将与现有的 `codex_cli`、`claude_code`、`gemini_cli`、`opencode_cli` 处于同类定位。  
由于 Issue 中提到 Google 已将终端 Gemini 使用迁移到 Antigravity CLI，且 Gemini CLI 对多数账户停止服务，该变更很可能是 ZeroClaw 维持 Google 侧代码代理能力的重要适配。

#### 3.2 Channel 调度能力增强：按 sender role 收窄 turn

- **PR：** [#11068 feat(channels): narrow channel turns by sender role](https://github.com/zeroclaw-labs/zeroclaw/pull/11068)  
- **状态：** Open  
- **规模：** XL  
- **影响范围：** docs、agent、channel、config、runtime、core  

该 PR 为 `[peer_groups.<name>]` 引入 `risk_profile` sender role，允许根据发送者角色更精细地匹配和约束 channel turn。  
这属于运行时与多代理协作策略层面的重要增强，有助于降低不同 peer group 间权限或风险配置误配的概率。

#### 3.3 修复运行时上下文裁剪语义

- **PR：** [#11067 fix(runtime): distinguish trim targets from model capacity](https://github.com/zeroclaw-labs/zeroclaw/pull/11067)  
- **状态：** Open  
- **规模：** XL  
- **影响范围：** docs、agent、channel、cron、runtime、core  

该 PR 试图区分“裁剪目标”和“模型容量”两个概念，恢复 `max_context_tokens` 与 `history_pruning.max_tokens` 的主动裁剪语义。  
如果合并，将改善长上下文调度时的准确性，避免在可容纳模型容量内过早丢弃最新受保护 turn。

#### 3.4 安全策略修复：即使 allowlist 命中也阻止高风险 shell 命令

- **PR：** [#11061 fix(security): block high-risk shell commands even when allowlisted](https://github.com/zeroclaw-labs/zeroclaw/pull/11061)  
- **状态：** Open  
- **标签：** bug、security、risk:high、needs-maintainer-review  
- **影响范围：** config、runtime、tool:delegate、security policy  

该 PR 修复 `validate_command_execution_for_shell` 在命中 `allowed_commands` 时跳过 `block_high_risk_commands` 检查的问题。  
报告场景显示，在启用 hard block 的 profile 中，如果 `rm` 被列入 allowlist，仍可能执行 `rm -rf` 这类高风险命令。该问题安全等级较高，应优先评审。

#### 3.5 依赖升级与供应链维护

- **PR：** [#11065 fix(deps): update matrix-sdk 0.19, rusqlite 0.40, otel 0.33](https://github.com/zeroclaw-labs/zeroclaw/pull/11065)  
- **状态：** Open  
- **规模：** S  

该 PR 升级 `matrix-sdk`、`rusqlite`、OpenTelemetry 等关键依赖。`matrix-sdk` 0.19.1 的升级还涉及 `imbl` / `imbl-sized-chunks` 依赖链调整，可能与安全或兼容性维护有关。

- **PR：** [#11062 chore(deps): bump the rust-all group across 1 directory with 9 updates](https://github.com/zeroclaw-labs/zeroclaw/pull/11062)  
- **状态：** Open  
- **作者：** dependabot[bot]  

Dependabot 提交了 Rust 依赖组升级，包括 `clap`、`clap_complete`、`flate2` 等多个包。属于常规依赖维护。

---

## 4. 社区热点

从可见数据看，今日 Issues 均为 **0 评论、0 反应**，PR 的评论数未提供，因此无法基于评论量或 reaction 量判断真正的“讨论热度”。不过，从变更规模、影响范围和安全风险看，以下议题最值得关注。

### 4.1 Antigravity CLI / `agy_cli` 集成

- **Issue：** [#11075 Add `agy_cli` coding-CLI tool for Antigravity CLI](https://github.com/zeroclaw-labs/zeroclaw/issues/11075)  
- **PR：** [#11076 feat(tools): add agy_cli coding-CLI tool for Antigravity CLI](https://github.com/zeroclaw-labs/zeroclaw/pull/11076)  

**背后诉求：**  
用户希望 ZeroClaw 能继续对接 Google 生态中的终端编码代理能力。由于 Gemini CLI 的服务可用性变化，项目需要快速跟进 Antigravity CLI。  
这反映出 ZeroClaw 用户对“可替换、多供应商 coding CLI 后端”的需求增强，工具层抽象需要持续适配外部 AI CLI 生态变化。

### 4.2 Web Search Provider 路由能力

- **Issue：** [#11074 RFC: search_routes — hint-based provider routing for web_search_tool](https://github.com/zeroclaw-labs/zeroclaw/issues/11074)  

**背后诉求：**  
用户希望为 `web_search_tool` 增加类似 `[[model_routes]]` 的 `[[search_routes]]`，根据 query hint 将搜索请求路由到不同 provider。  
典型场景包括：  
- 需要一手资料时使用某个搜索 provider；  
- 需要独立交叉验证时使用另一个 provider；  
- 避免一个 agent 只能绑定单一搜索后端。  

这表明 ZeroClaw 的用户已经开始关注 **检索质量、来源多样性与任务级路由策略**，搜索工具正在从“单一工具调用”走向“策略化检索基础设施”。

### 4.3 安全策略优先级

- **PR：** [#11061 fix(security): block high-risk shell commands even when allowlisted](https://github.com/zeroclaw-labs/zeroclaw/pull/11061)  

**背后诉求：**  
即使用户显式 allowlist 某些命令，也希望全局高风险命令拦截策略保持最高优先级。  
这反映出项目用户对 agent 执行 shell 命令时的安全边界非常敏感，尤其是在 delegate tool 或自动执行场景中。

---

## 5. Bug 与稳定性

### 高严重度

#### 5.1 高风险 shell 命令可能绕过 hard block

- **PR：** [#11061 fix(security): block high-risk shell commands even when allowlisted](https://github.com/zeroclaw-labs/zeroclaw/pull/11061)  
- **严重程度：高**  
- **状态：已有 fix PR，待维护者评审**  
- **标签：** `bug`、`security:policy`、`domain:security`、`risk:high`、`needs-maintainer-review`  

问题在于 `validate_command_execution_for_shell` 对字面命中 `allowed_commands` 的命令跳过了 `block_high_risk_commands` 检查。  
这可能导致配置中同时存在 allowlist 和高风险 hard block 时，`rm -rf` 等命令被错误允许。对自动化代理执行环境而言，这是高优先级安全修复。

---

### 中等严重度

#### 5.2 运行时上下文裁剪与模型容量语义混淆

- **PR：** [#11067 fix(runtime): distinguish trim targets from model capacity](https://github.com/zeroclaw-labs/zeroclaw/pull/11067)  
- **严重程度：中**  
- **状态：已有 fix PR，待合并**  

该问题会影响历史消息裁剪与模型上下文容量判断，可能导致可发送的最新 turn 被错误裁剪或上下文管理行为不符合预期。  
对长会话、cron agent、多 channel 场景影响更明显。

#### 5.3 Hailo connect-failure 测试在 macOS 上表现不一致

- **PR：** [#11080 test(providers): keep Hailo connect-failure test platform-independent](https://github.com/zeroclaw-labs/zeroclaw/pull/11080)  
- **严重程度：中低**  
- **状态：已有测试修复 PR**  

该测试在 macOS 上出现期望值不一致：  
- 实际：`Hailo-Ollama request timed out`  
- 期望：`Hailo-Ollama connection failed`  

该 PR 目标是让连接失败测试跨平台稳定，减少 CI 在 macOS 环境中的误报。

---

### 低严重度 / 工程稳定性

#### 5.4 Nix flake package 缺少 `meta.mainProgram`

- **PR：** [#11072 fix(nix): set meta.mainProgram on flake packages](https://github.com/zeroclaw-labs/zeroclaw/pull/11072)  
- **严重程度：低**  
- **状态：已有修复 PR**  

`buildZeroclaw` 派生的 flake packages 缺少 `meta.mainProgram`，导致 `lib.getExe` 回退到 deprecated pname guess，并产生 evaluation warning。  
该问题主要影响 Nix 用户体验与配置整洁度。

#### 5.5 `zerorelay` 与 runtime dev-dependency 循环

- **PR：** [#11066 fix(release): break the zerorelay and runtime dev-dependency cycle](https://github.com/zeroclaw-labs/zeroclaw/pull/11066)  
- **严重程度：低到中**  
- **状态：已有修复 PR**  

该 PR 处理 `zerorelay` 与 `zeroclaw-runtime` 之间的 dev-dependency cycle。虽然主要是发布/构建层面的维护问题，但依赖环可能影响 release 流程和包管理清晰度。

---

## 6. 功能请求与路线图信号

### 6.1 `agy_cli` 很可能进入近期版本

- **Issue：** [#11075](https://github.com/zeroclaw-labs/zeroclaw/issues/11075)  
- **PR：** [#11076](https://github.com/zeroclaw-labs/zeroclaw/pull/11076)  

该功能已经有对应 XL 级 PR，且变更覆盖 docs、runtime、config 和 tool 注册逻辑。  
由于需求背景明确，并且与现有 `codex_cli`、`claude_code`、`gemini_cli`、`opencode_cli` 架构一致，纳入下一版本的可能性较高。

### 6.2 `search_routes` 暗示搜索工具将走向策略化路由

- **Issue：** [#11074](https://github.com/zeroclaw-labs/zeroclaw/issues/11074)  
- **状态：Open，暂无对应 PR**  

该 RFC 提出为 `web_search_tool` 增加 `[[search_routes]]`，根据 hint 匹配 provider。  
目前尚未看到实现 PR，因此短期内是否进入下一版本不确定。但它与已有 `[[model_routes]]` 设计保持一致，具备较强的架构延续性。

### 6.3 Channel / Peer Group 风险画像继续强化

- **PR：** [#11068](https://github.com/zeroclaw-labs/zeroclaw/pull/11068)  

该 PR 表明 ZeroClaw 正在增强多 agent / 多 peer 场景下的 routing 与权限边界能力。  
`risk_profile` 与 sender role 的结合，可能成为后续更细粒度安全策略、外部 peer 分组和 runtime channel 管控的基础。

### 6.4 RFC 流程质量控制增强

- **PR：** [#11078 feat(intake): require alternatives on the RFC form](https://github.com/zeroclaw-labs/zeroclaw/pull/11078)  
- **PR：** [#11079 docs(contributing): route ordinary work by what the author knows](https://github.com/zeroclaw-labs/zeroclaw/pull/11079)  

这两项变更聚焦贡献流程：  
- 要求 RFC 表单中的 “Alternatives considered” 为必填；  
- 明确普通工作应根据作者已知信息选择先开 issue 还是直接 PR。  

这说明项目正在改善贡献入口质量，减少低信息量 RFC 和维护者沟通成本。

---

## 7. 用户反馈摘要

今日 Issue 评论数据为 0，因此无法从评论中提取多轮讨论或情绪反馈。但从新开 Issue 和 PR 摘要可以归纳出以下用户痛点与使用场景。

### 7.1 外部 AI CLI 生态变化带来的适配压力

- **相关：** [#11075](https://github.com/zeroclaw-labs/zeroclaw/issues/11075)、[#11076](https://github.com/zeroclaw-labs/zeroclaw/pull/11076)  

用户依赖 ZeroClaw 将任务委托给外部 coding CLI。Gemini CLI 可用性变化后，用户希望 ZeroClaw 快速支持 Antigravity CLI，避免 Google 生态能力断档。

### 7.2 搜索结果来源与任务意图需要更细粒度控制

- **相关：** [#11074](https://github.com/zeroclaw-labs/zeroclaw/issues/11074)  

用户不满足于单一 web search provider，希望根据查询意图选择不同 provider。  
这类需求说明 ZeroClaw 的用户正在构建更复杂的研究型 agent，需要同时兼顾 primary source、独立验证和 provider 多样性。

### 7.3 安全策略需要“全局硬约束”优先于局部 allowlist

- **相关：** [#11061](https://github.com/zeroclaw-labs/zeroclaw/pull/11061)  

用户希望即使命令被 allowlist，也不能绕过高风险命令拦截。  
这体现出在自动化 shell 执行场景中，用户更重视 fail-safe 行为，即安全策略冲突时应默认拒绝高风险操作。

### 7.4 CI 成本与反馈速度是维护者关注重点

- **相关 PR：**
  - [#11073 perf(ci): run CodeQL on master pushes only when analyzed code changes](https://github.com/zeroclaw-labs/zeroclaw/pull/11073)
  - [#11071 perf(ci): debounce master-push runs before the compile fleet starts](https://github.com/zeroclaw-labs/zeroclaw/pull/11071)
  - [#11070 perf(ci): skip Docker source builds when only the release workflow changed](https://github.com/zeroclaw-labs/zeroclaw/pull/11070)
  - [#11069 perf(ci): give colliding Rust matrix legs distinct cache keys](https://github.com/zeroclaw-labs/zeroclaw/pull/11069)
  - [#11064 perf(ci): run the Windows task-owner recovery tests as a parallel job](https://github.com/zeroclaw-labs/zeroclaw/pull/11064)
  - [#11063 ci(codeql): pin the Rust scan runner label and retire CI_USE_BLACKSMITH](https://github.com/zeroclaw-labs/zeroclaw/pull/11063)

大量 CI 相关 PR 表明项目维护者正在主动降低无效计算、缩短反馈路径，并改善 fork PR 场景下的 runner 配置可预测性。

---

## 8. 待处理积压

基于本次数据窗口，仅能看到过去 24 小时的 Issue/PR 更新，无法准确识别“长期未响应”的历史积压。不过，今日形成了明显的短期待评审队列：**17 个开放 PR 均未合并/关闭**，维护者应优先关注以下类别。

### 8.1 高优先级安全修复

- [#11061 fix(security): block high-risk shell commands even when allowlisted](https://github.com/zeroclaw-labs/zeroclaw/pull/11061)  
  - 原因：`risk:high`、`needs-maintainer-review`，涉及 shell 命令执行安全边界。

### 8.2 大规模运行时 / channel 变更

- [#11068 feat(channels): narrow channel turns by sender role](https://github.com/zeroclaw-labs/zeroclaw/pull/11068)  
- [#11067 fix(runtime): distinguish trim targets from model capacity](https://github.com/zeroclaw-labs/zeroclaw/pull/11067)  
- [#11076 feat(tools): add agy_cli coding-CLI tool for Antigravity CLI](https://github.com/zeroclaw-labs/zeroclaw/pull/11076)  

这些 PR 规模较大、影响面广，建议尽早分配 reviewer，避免长期悬挂后与后续 runtime/config 改动产生冲突。

### 8.3 CI 优化 PR 队列较长

- [#11073](https://github.com/zeroclaw-labs/zeroclaw/pull/11073)  
- [#11071](https://github.com/zeroclaw-labs/zeroclaw/pull/11071)  
- [#11070](https://github.com/zeroclaw-labs/zeroclaw/pull/11070)  
- [#11069](https://github.com/zeroclaw-labs/zeroclaw/pull/11069)  
- [#11064](https://github.com/zeroclaw-labs/zeroclaw/pull/11064)  
- [#11063](https://github.com/zeroclaw-labs/zeroclaw/pull/11063)  

这批 PR 目标一致：降低 CI 浪费、提高反馈效率。若相互独立，建议优先合并低风险 XS 级变更，以减少 CI 成本并释放后续开发效率。

### 8.4 依赖与构建维护

- [#11065 fix(deps): update matrix-sdk 0.19, rusqlite 0.40, otel 0.33](https://github.com/zeroclaw-labs/zeroclaw/pull/11065)  
- [#11062 chore(deps): bump the rust-all group across 1 directory with 9 updates](https://github.com/zeroclaw-labs/zeroclaw/pull/11062)  
- [#11066 fix(release): break the zerorelay and runtime dev-dependency cycle](https://github.com/zeroclaw-labs/zeroclaw/pull/11066)  
- [#11072 fix(nix): set meta.mainProgram on flake packages](https://github.com/zeroclaw-labs/zeroclaw/pull/11072)  

建议关注依赖升级和 release 构建链问题，避免在后续发布阶段集中暴露兼容性或构建问题。

---

## 项目健康度评估

ZeroClaw 今日呈现 **高活跃、高并行开发、低合并吞吐** 的状态。  
正向信号包括：  
- 新功能和架构演进持续推进；  
- 安全问题已有修复 PR；  
- CI 成本优化集中展开；  
- 贡献流程正在改善。  

潜在风险包括：  
- 17 个开放 PR 无合并，短期 review backlog 较重；  
- 多个 XL 级 runtime/channel/tool PR 同时存在，可能增加冲突和回归风险；  
- 高风险安全 PR 尚未合并，应优先处理。  

总体判断：项目活跃度健康，但维护者需要尽快对安全修复和大规模架构变更进行分流评审，以保持主分支稳定和贡献者反馈速度。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*