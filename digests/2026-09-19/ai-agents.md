# OpenClaw 生态日报 2026-09-19

> Issues: 1 | PRs: 71 | 覆盖项目: 13 个 | 生成时间: 2026-09-19 03:40 UTC

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
日期：2026-09-19  
仓库：github.com/openclaw/openclaw

---

## 1. 今日速览

过去 24 小时 OpenClaw 维持了**极高开发活跃度**：共有 **71 条 PR 更新**，其中 **66 条仍待合并**，**5 条已合并或关闭**；Issues 侧新增或活跃 **1 条**，说明当天主要精力集中在代码修复、发布流程、Web UI、Gateway、Agent Runtime 与 Talk/Live 语音链路上。  
今日发布了新版本 **v2026.9.5**，重点围绕升级安全性、Doctor 修复流程、历史保留与 Gateway 启动状态处理。  
从 PR 标签看，当前项目处于一个明显的**稳定性与发布工程强化周期**：大量 PR 聚焦 release recovery、Gateway 可用性、会话状态一致性、Codex 集成边界、模型/运行时选择、媒体去重与任务状态修复。  
整体健康度较高：维护者响应密集、修复面广，但待合并 PR 数量偏高，且多个高风险 PR 标记了 `compatibility`、`security-boundary`、`session-state`、`availability`，说明合并前仍需严格验证。

---

## 2. 版本发布

### v2026.9.5：openclaw 2026.9.5  
链接：<https://github.com/openclaw/openclaw/releases/tag/v2026.9.5>

本日发布的新版本为 **v2026.9.5**。根据 Release 摘要，本次版本重点在于**更安全的升级流程与历史状态保留**。

#### 主要更新亮点

- **更安全的升级与历史保留**
  - Doctor 在修复和升级过程中会保留 session history。
  - 保留 repeated-repair state，避免重复修复状态丢失。
  - 即使存在无效的 retained history，也能完成升级流程。
  - 避免在 Gateway 仍处于启动中的情况下反复阻塞或停止 Gateway。
  - 相关 PR / Issue 引用包括：#149741、#149956、#148901、#149308 等。

#### 对用户的影响

- 对终端用户而言，本版本主要改善升级体验，降低升级时历史会话、修复状态或 Gateway 服务状态异常导致的失败概率。
- 对运维用户而言，Doctor 行为更稳健，尤其是在服务刚启动、历史状态不完整或部分状态无效时，升级流程应更少卡死或误判。
- 对维护者而言，该版本也暴露出发布链路中的一些恢复和重试问题，今日多条 release 相关 PR 正是在 v2026.9.5 发布过程中或发布后补强自动恢复能力。

#### 破坏性变更

当前数据中未提供明确的 breaking changes。  
但由于多个相关 PR 带有 `compatibility`、`availability`、`security-boundary` 风险标签，建议用户在生产环境升级前仍执行常规验证，尤其是：

- Gateway 托管服务；
- Codex 扩展；
- Talk / Google Live；
- Web UI 会话恢复；
- 自定义 runtime / model 配置；
- 自动更新与 release 证据链相关流程。

#### 迁移与升级注意事项

- 建议升级前备份关键 session history 与配置。
- 如果正在使用托管 Gateway 服务，关注 stale service definition 修复相关 PR：  
  <https://github.com/openclaw/openclaw/pull/152120>
- 如果维护 npm / GitHub / ClawHub 发布流程，关注以下发布恢复 PR：
  - <https://github.com/openclaw/openclaw/pull/152434>
  - <https://github.com/openclaw/openclaw/pull/152435>
  - <https://github.com/openclaw/openclaw/pull/152432>
  - <https://github.com/openclaw/openclaw/pull/152437>

---

## 3. 项目进展

过去 24 小时共有 **5 条 PR 已合并或关闭**，但当前数据中仅展示了其中一条已关闭 PR 的详细信息。以下基于可见数据进行总结。

### 已关闭 / 完成的重要 PR

#### #152335 fix(state): name the originating refusal on blocked migration receipts  
链接：<https://github.com/openclaw/openclaw/pull/152335>  
状态：CLOSED  
标签：`docs`、`commands`、`maintainer`、`size: M`、`P3`、`status: needs proof`

该 PR 旨在改进 Doctor / migration receipt 的诊断能力：当迁移被阻塞时，不仅指出前一个失败步骤，还补充原始拒绝原因，帮助维护者和用户从单个 receipt 中定位 Doctor 停止的根因。

**项目推进意义：**

- 改善故障诊断可读性；
- 降低维护者排查 Doctor / migration 阻塞问题的成本；
- 对升级路径稳定性有间接帮助。

虽然该 PR 当前显示为关闭而非明确合并，但其问题指向与 v2026.9.5 的 Doctor/升级稳定性目标高度一致。

---

### 今日仍在推进中的关键 PR 方向

虽然大部分 PR 尚未合并，但从待合并 PR 看，项目今日主要推进以下几条主线：

#### A. 发布流程恢复与证据链修复

- #152434 fix(release): recover original npm publishers automatically  
  <https://github.com/openclaw/openclaw/pull/152434>
- #152435 fix(release): resume public GitHub release pages  
  <https://github.com/openclaw/openclaw/pull/152435>
- #152432 fix(release): reclaim orphaned ClawHub publication children  
  <https://github.com/openclaw/openclaw/pull/152432>
- #152437 fix(github): distinguish busy storage from publication locks  
  <https://github.com/openclaw/openclaw/pull/152437>
- #152411 fix(update): trace the delegating config runtime alias in the compatibility inventory  
  <https://github.com/openclaw/openclaw/pull/152411>

这些 PR 表明 v2026.9.5 发布过程中暴露了发布恢复、证据资产、GitHub Release 页面、ClawHub 子任务、npm publisher 追踪等问题。项目正在将“人工恢复”转为“自动识别并恢复”。

#### B. Web UI 会话、聊天与设置体验

- #152375 fix: stale session events clear the current chat  
  <https://github.com/openclaw/openclaw/pull/152375>
- #152398 refactor(ui): consolidate chat outbox and command settlement  
  <https://github.com/openclaw/openclaw/pull/152398>
- #152429 improve(ui): quiet settings and make chat progress optional  
  <https://github.com/openclaw/openclaw/pull/152429>
- #152394 fix: preserve selected runtime when changing models  
  <https://github.com/openclaw/openclaw/pull/152394>

这组 PR 指向 Control UI 的可靠性和使用体验：避免旧 session 事件清空当前聊天、统一 outbox 生命周期、减少设置页噪音、切换模型时保留 runtime。

#### C. Gateway、Talk、Google Live 与语音链路稳定性

- #152428 fix(talk): spoken agent consults over gateway-relay fail when a voice transcript lands before the run adopts its turn  
  <https://github.com/openclaw/openclaw/pull/152428>
- #152427 fix(talk): stopping or interrupting a Google Live reply over gateway-relay ends the whole session  
  <https://github.com/openclaw/openclaw/pull/152427>
- #152413 fix(google): Talk on Gemini 3.8 Live closes the session on the first agent consult and ignores thinkingLevel  
  <https://github.com/openclaw/openclaw/pull/152413>
- #152120 fix: repair stale Gateway service definitions during updates  
  <https://github.com/openclaw/openclaw/pull/152120>

这些 PR 反映 Talk / Live 语音能力当前仍处在快速修复期，尤其是 Google Live、Gemini 3.8、gateway-relay 场景下存在中断、会话关闭、agent consult 失败等高影响问题。

#### D. Agent Runtime、Skills 与性能优化

- #152399 refactor: simplify agent runtime preparation and dispatch  
  <https://github.com/openclaw/openclaw/pull/152399>
- #152369 improve(skills): skip tool checks for unselected skills  
  <https://github.com/openclaw/openclaw/pull/152369>
- #152312 perf(skills): keep status reads off installer imports  
  <https://github.com/openclaw/openclaw/pull/152312>
- #152401 improve: simplify streamed provider data checks  
  <https://github.com/openclaw/openclaw/pull/152401>
- #152366 improve: keep usage reports responsive with many sessions  
  <https://github.com/openclaw/openclaw/pull/152366>

这些改动集中在减少不必要的导入、状态读取、重复扫描和中间数据结构，显示项目正在优化大规模 session、skills 与 provider streaming 场景下的性能。

---

## 4. 社区热点

> 注：输入数据中 PR 的评论数均显示为 `undefined`，无法严格按评论数排序。因此本节按问题影响面、优先级标签、风险标签和是否关联用户痛点综合判断。

### 热点 1：Control UI 设置噪音与聊天进度卡片

- Issue #152424：  
  <https://github.com/openclaw/openclaw/issues/152424>
- 对应 PR #152429：  
  <https://github.com/openclaw/openclaw/pull/152429>

用户诉求是让 Control UI 更安静：  
设置页中大量 “Using default” 继承默认状态提示影响扫描效率；聊天进度卡片占用 composer 空间，且用户无法隐藏。

**背后诉求：**

- 高频用户希望 UI 降低视觉噪音；
- 用户希望区分“agent 行为”与“UI 展示偏好”，即隐藏进度卡片不应改变 agent 执行；
- 项目正在从功能堆叠阶段进入体验打磨阶段。

### 热点 2：v2026.9.5 发布恢复链路

- #152434：<https://github.com/openclaw/openclaw/pull/152434>
- #152435：<https://github.com/openclaw/openclaw/pull/152435>
- #152432：<https://github.com/openclaw/openclaw/pull/152432>
- #152437：<https://github.com/openclaw/openclaw/pull/152437>

多个 release 相关 PR 同日出现，说明 v2026.9.5 发布链路中存在实际恢复痛点，包括：

- npm 发布失败后需要定位原始 child run；
- GitHub Release 页面已公开但证据资产不完整；
- ClawHub 子发布任务滞留在环境 gate；
- SQLite writer 繁忙被误报为 publication lock。

**背后诉求：**

- 维护者希望发布流程具备自动恢复能力；
- 复杂多渠道发布需要更可靠的 evidence chain；
- 减少人工介入和错误操作，如要求删除已公开 release 页。

### 热点 3：Talk / Google Live / Gemini 3.8 实时语音问题

- #152428：<https://github.com/openclaw/openclaw/pull/152428>
- #152427：<https://github.com/openclaw/openclaw/pull/152427>
- #152413：<https://github.com/openclaw/openclaw/pull/152413>

这些 PR 反映实时语音链路的痛点集中在：

- agent consult 被 voice transcript 时序打断；
- stop / interrupt 误导致整个 session 结束；
- Gemini 3.8 Live 首次 agent consult 即关闭会话；
- thinkingLevel 被忽略。

**背后诉求：**

- 用户希望语音交互具备与文本会话同等的状态一致性；
- 实时语音中的 barge-in、中断、函数响应调度、session adoption 时序需要更强保障；
- Talk 功能可能是近期路线图中的重点模块，但仍存在明显稳定性挑战。

### 热点 4：Codex 集成边界与交付语义

- #151854：<https://github.com/openclaw/openclaw/pull/151854>
- #151863：<https://github.com/openclaw/openclaw/pull/151863>

Codex 相关 PR 带有 `compatibility`、`security-boundary` 等高风险标签，问题包括：

- catalog action 可能绑定到错误 native client 或 home；
- fork / continuation 行为可能报告错误结果；
- 回复和图片可能丢失或重复；
- approval scope 可能误导；
- quota handling 不一致。

**背后诉求：**

- 用户需要 Codex 扩展在多客户端、多 home、多 route 情况下保持严格边界；
- 维护者对安全边界和兼容性持谨慎态度；
- Codex 集成已进入复杂边缘场景修复阶段。

---

## 5. Bug 与稳定性

以下按严重程度和影响面排序。

### P1 / 高严重度

#### 1. Gateway 服务定义在更新后陈旧，影响可用性  
PR：#152120  
链接：<https://github.com/openclaw/openclaw/pull/152120>  
状态：OPEN，等待作者  
标签：`P1`、`gateway`、`cli`、`commands`、`merge-risk: availability`

问题描述：升级后旧的托管 Gateway 服务定义可能未被修复，例如 systemd 缺少 `KillMode=mixed`，Windows task 出现 zero trigger 等。  
影响：可能导致 Gateway 服务行为异常或升级后不可用。  
修复状态：已有 fix PR，但状态为 `waiting on author`，需要继续推进。

#### 2. Gemini 3.8 Live / Google Live Talk 会话关闭与参数忽略  
PR：#152413  
链接：<https://github.com/openclaw/openclaw/pull/152413>  
状态：OPEN，需要证明  
标签：`P1`、`extensions: google`

问题描述：Talk 在 `gemini-3.8-live-extended-thinking` 上首次 agent consult 可能因函数响应调度不被支持而关闭 Live session，并且 thinkingLevel 被忽略。  
影响：Google Live / Gemini 3.8 用户无法稳定完成语音 agent consult。  
修复状态：已有 fix PR，但仍需 proof。

---

### P2 / 中高严重度

#### 3. 旧 session 事件清空当前聊天  
PR：#152375  
链接：<https://github.com/openclaw/openclaw/pull/152375>  
状态：OPEN，ready for maintainer look  
标签：`P2`、`app: web-ui`

问题描述：延迟到达的旧 session reset 事件可能清空当前 conversation transcript。  
影响：当前对话内容和未发送草稿可能受影响。  
修复状态：已有 fix PR，维护者待审。

#### 4. 已完成任务在 late activity 后仍显示 running  
PR：#152367  
链接：<https://github.com/openclaw/openclaw/pull/152367>  
状态：OPEN，ready for maintainer look  
标签：`P2`、`app: web-ui`、`gateway`

问题描述：已完成或取消的后台任务，如果最终活动晚于记录的结束时间到达，可能继续显示为 running。  
影响：任务列表和 inspector 状态误导用户。  
修复状态：已有 fix PR。

#### 5. 切换模型时丢失已选 runtime  
PR：#152394  
链接：<https://github.com/openclaw/openclaw/pull/152394>  
状态：OPEN，ready for maintainer look  
标签：`P2`、`compatibility`

问题描述：仅切换模型时，`/model` 或 Control UI 可能清除 runtime pin。  
影响：用户预期的 runtime 选择被静默重置。  
修复状态：已有窄范围 fix PR，并包含 screenshot 与 telegram-e2e 证明。

#### 6. Google Live stop / interrupt 结束整个 session  
PR：#152427  
链接：<https://github.com/openclaw/openclaw/pull/152427>  
状态：OPEN

问题描述：通过 gateway-relay 使用 Google Live 时，停止、push-to-talk 或 barge-in 触发的 `talk.session.cancelOutput` 会导致整个 realtime session 在约一秒后结束。  
影响：语音会话中断体验严重。  
修复状态：已有 fix PR。

#### 7. Voice transcript 时序导致 spoken agent consult 失败  
PR：#152428  
链接：<https://github.com/openclaw/openclaw/pull/152428>  
状态：OPEN

问题描述：gateway-relay 下，如果 voice transcript 在 embedded run 采纳 turn 前落盘，agent consult 可能失败，报错为 `Session transcript keyed user is outside the current turn`。  
影响：语音 agent consult 在真实实时输入中不稳定。  
修复状态：已有 fix PR。

---

### P3 / 中低严重度与性能稳定性

#### 8. selected skills 准备时检查未选 skill 的工具依赖  
PR：#152369  
链接：<https://github.com/openclaw/openclaw/pull/152369>  
状态：OPEN，ready for maintainer look  
影响：可能因未选择 skill 的缺失工具而产生无关错误或额外开销。  
修复状态：已有改进 PR。

#### 9. usage reports 在大量 sessions 下响应变慢  
PR：#152366  
链接：<https://github.com/openclaw/openclaw/pull/152366>  
状态：OPEN，ready for maintainer look  
影响：大量 session 库存下 usage report 读取和解码过多无关 prompt。  
修复状态：已有性能改进 PR。

#### 10. read-only status / hook 报告加载安装器代码  
PR：#152312  
链接：<https://github.com/openclaw/openclaw/pull/152312>  
PR：#152433  
链接：<https://github.com/openclaw/openclaw/pull/152433>  
影响：只读诊断路径加载不必要模块，增加启动和报告成本。  
修复状态：已有性能优化 PR。

---

## 6. 功能请求与路线图信号

### 新功能请求：更安静的设置页与可选聊天进度卡片

Issue：#152424  
链接：<https://github.com/openclaw/openclaw/issues/152424>  
对应 PR：#152429  
链接：<https://github.com/openclaw/openclaw/pull/152429>

#### 用户需求

- 允许隐藏 chat progress cards；
- 避免在设置项下重复显示继承默认值状态；
- 让 Control UI 更容易浏览和配置。

#### 路线图判断

该需求被快速转化为 PR，且 PR 已覆盖 Appearance、Labs、Memory、schema-backed forms、device approval policy 等多个区域，说明此功能**很可能进入下一小版本或近期版本**。  
这也释放出一个信号：OpenClaw 正在加强“个人 AI 助手”场景中的可用性和低干扰交互，而不仅是核心 agent 能力。

---

### 潜在路线图信号 1：语音 Talk / Live 是近期重点

相关 PR：

- #152413：<https://github.com/openclaw/openclaw/pull/152413>
- #152427：<https://github.com/openclaw/openclaw/pull/152427>
- #152428：<https://github.com/openclaw/openclaw/pull/152428>

判断：Talk、Google Live、Gemini 3.8 Live、gateway-relay 相关问题密集出现，说明项目正在强化实时语音 Agent 体验。这类功能对个人 AI 助手场景非常关键，预计会持续得到投入。

---

### 潜在路线图信号 2：Agent Runtime 抽象继续收敛

相关 PR：

- #152399：<https://github.com/openclaw/openclaw/pull/152399>
- #152426：<https://github.com/openclaw/openclaw/pull/152426>
- #152369：<https://github.com/openclaw/openclaw/pull/152369>

判断：模型选择、认证刷新、skill 准备、runtime dispatch 正在被简化和统一。这显示 OpenClaw 可能在为更多 runtime、provider、skills 和 agent orchestration 场景做架构整理。

---

### 潜在路线图信号 3：发布自动恢复能力将成为维护基础设施重点

相关 PR：

- #152434：<https://github.com/openclaw/openclaw/pull/152434>
- #152435：<https://github.com/openclaw/openclaw/pull/152435>
- #152432：<https://github.com/openclaw/openclaw/pull/152432>
- #152437：<https://github.com/openclaw/openclaw/pull/152437>

判断：OpenClaw 发布系统涉及 npm、GitHub Release、ClawHub、证据资产和多级 workflow。今日 PR 显示维护者正在把发布失败后的恢复能力产品化，减少人工判断和删除资源的风险。

---

## 7. 用户反馈摘要

当前数据中仅有 1 条 Issue，且评论数为 1，未提供完整评论内容。因此以下基于 Issue 摘要和相关 PR 描述提炼用户痛点。

### 痛点 1：Control UI 信息密度过高

来源：#152424  
链接：<https://github.com/openclaw/openclaw/issues/152424>

用户认为设置页重复展示 inherited default / Using default 之类信息，导致扫描配置变困难。  
这类反馈说明 OpenClaw 的配置面已经足够复杂，用户开始关注“如何更快理解当前配置”，而不是仅仅需要更多选项。

### 痛点 2：聊天进度卡片占用输入区域

来源：#152424  
链接：<https://github.com/openclaw/openclaw/issues/152424>

用户希望隐藏 progress cards，原因是它们占据 composer 空间。  
这反映出在高频聊天或长会话场景中，UI 空间效率会直接影响用户满意度。

### 痛点 3：语音会话的中断语义不符合预期

来源：#152427、#152428、#152413  
链接：

- <https://github.com/openclaw/openclaw/pull/152427>
- <https://github.com/openclaw/openclaw/pull/152428>
- <https://github.com/openclaw/openclaw/pull/152413>

用户在语音场景中的预期是：停止当前回复、插话、push-to-talk 不应结束整个会话，也不应破坏 agent consult。  
这表明实时语音功能正在进入真实使用场景，边缘时序问题开始暴露。

### 痛点 4：发布和升级故障恢复仍偏维护者依赖

来源：#152434、#152435、#152432、#152437  
链接：

- <https://github.com/openclaw/openclaw/pull/152434>
- <https://github.com/openclaw/openclaw/pull/152435>
- <https://github.com/openclaw/openclaw/pull/152432>
- <https://github.com/openclaw/openclaw/pull/152437>

维护者面临的问题包括：重试发布时需要查找原始 child run、GitHub Release 公开页缺少证据资产、ClawHub 子任务孤儿化等。  
这些不是普通用户反馈，但会影响版本交付质量和发布节奏。

---

## 8. 待处理积压

> 今日 open PR 数量为 66，积压压力较高。以下列出需要维护者优先关注的高影响 PR。

### 1. #152120 repair stale Gateway service definitions during updates  
链接：<https://github.com/openclaw/openclaw/pull/152120>  
状态：OPEN，`waiting on author`  
优先级：P1  
风险：availability

该 PR 直接影响升级后的 Gateway 服务可用性，且关联 systemd / Windows task 等平台服务定义。建议优先推动作者响应或拆分可合并部分。

---

### 2. #151854 keep catalog actions bound to their source  
链接：<https://github.com/openclaw/openclaw/pull/151854>  
状态：OPEN，`needs proof`  
风险：compatibility、security-boundary  
影响范围：Codex、macOS、Web UI、Gateway、file-transfer

该 PR 触及 Codex catalog action 绑定、native client/home 边界和 fork/continuation 行为，风险较高但影响重要。建议补齐 proof 后进入维护者 review。

---

### 3. #151863 preserve delivery facts and native approval semantics  
链接：<https://github.com/openclaw/openclaw/pull/151863>  
状态：OPEN，ready for maintainer look  
风险：compatibility  
影响范围：Codex、agents

该 PR 处理 Codex 回复/图片丢失或重复、approval scope 误导、quota handling 等问题。已有 screenshot 与 telegram-e2e proof，建议维护者优先 review。

---

### 4. #152389 curate summarizer context with typed judgments  
链接：<https://github.com/openclaw/openclaw/pull/152389>  
状态：OPEN，needs proof  
风险：session-state、availability  
影响范围：compaction、summarizer、agents

该 PR 依赖 #152237 和 #152385，且明确为 draft follow-up。由于涉及 summarizer context、semantic snapshot、protected-source rules 和 fidelity measurements，建议维护者持续跟踪依赖链，避免长期悬挂。

---

### 5. #152398 consolidate chat outbox and command settlement  
链接：<https://github.com/openclaw/openclaw/pull/152398>  
状态：OPEN，ready for maintainer look  
影响范围：Web UI、agents  
规模：XL

该 PR 整合聊天 outbox mutation 与 command completion cleanup，可能是后续 UI 会话稳定性的基础重构。由于依赖 #152426，建议先合并较小依赖，再推进该 XL PR。

---

### 6. #152413 Google Talk / Gemini 3.8 Live fix  
链接：<https://github.com/openclaw/openclaw/pull/152413>  
状态：OPEN，needs proof  
优先级：P1

影响 Google Live / Gemini 3.8 语音体验。建议尽快补充复现和验证证据，避免 Talk 功能在关键 provider 上持续不可用。

---

### 7. #152393 block stale WebChat replies after media deduplication  
链接：<https://github.com/openclaw/openclaw/pull/152393>  
状态：OPEN，needs proof  
风险：会话写入权限、媒体去重

该 PR 处理 stale WebChat replies 在媒体折叠后绕过 session-writer authority metadata 的问题。虽然优先级为 P2，但涉及消息投递正确性，建议补 proof 后优先审查。

---

## 总体健康度评估

OpenClaw 今日表现出**非常高的维护活跃度和较强的问题响应能力**。v2026.9.5 已发布，同时围绕发布恢复、升级安全、Gateway 可用性、Web UI 状态一致性、Talk 实时语音和 Codex 集成边界展开密集修复。  
主要风险在于：待合并 PR 数量偏高，且多个 PR 涉及 session-state、availability、compatibility 与 security-boundary，说明当前代码变更需要谨慎排队、充分验证和分批合入。  
短期建议维护者优先处理 P1/P2、带 proof 的 ready PR，以及 release recovery 链路；中期则应继续压缩大 PR 依赖链，降低积压造成的合并冲突和验证成本。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析  
日期：2026-09-19

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态呈现出明显的“高频修复、稳定性收敛、安全边界强化”特征。OpenClaw、Hermes Agent、CoPaw/QwenPaw、LobsterAI 是今日最活跃的项目，PR 更新量分别达到 71、50、20、19，说明头部项目仍处于快速迭代期。  
从议题看，生态共同关注点已经从“能否调用模型和工具”转向“会话状态是否可靠、升级是否安全、工具执行是否可控、多端 UI 是否稳定、第三方 Provider 是否兼容”。  
语音实时交互、多 Agent / subagent、插件与 Skills、Gateway 多通道、Shell/exec 安全、Provider transport 兼容性，正在成为个人 AI 助手项目的核心竞争面。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 今日重点 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 1 | 71 | **v2026.9.5** | 发布恢复、Doctor 升级、Gateway、Talk/Live、Web UI、Codex | **极高活跃，高维护响应；但 66 个 Open PR 带来积压与合并风险** |
| **Hermes Agent** | 50 | 50 | 无 | Desktop、Gateway、TUI、会话 DB、消息平台、插件安全 | **高反馈、高修复压力；P1/P2 稳定性问题较多** |
| **CoPaw / QwenPaw** | 10 | 20 | **v2.2.2-beta.1** | Console、Prompt Injection、防上下文膨胀、Creator、Skill | **Beta 快速迭代中；安全与多模态上下文管理风险突出** |
| **LobsterAI** | 0 | 19 | 无 | OpenClaw 启动恢复、Windows 升级、Skills、Cowork、IM | **开发活跃但社区讨论少；质量收敛和产品化修复明显** |
| **ZeroClaw** | 3 | 11 | 无 | Runtime、Shell 安全、Provider cache、Delegate、Gateway | **修复密集；安全与 runtime 架构问题需优先处理** |
| **NanoBot** | 2 | 9 | 无 | WebUI 恢复、Discord 清理、移动端、exec 安全 | **修复响应快；处于稳定性打磨阶段** |
| **NanoClaw** | 3 | 3 | 无 | Codex transport、Slack provisioning、CLI 校验 | **社区输入活跃但合并节奏偏慢；需维护者 triage** |
| **ZeptoClaw** | 0 | 2 | 无 | 登录限流、OpenAI-compatible reasoning 输出 | **低到中等活跃；安全与 Provider 兼容方向明确** |
| **IronClaw** | 0 | 1 | 无 | Gmail / Google Calendar OAuth readiness | **低活跃；唯一 PR 指向核心集成可用性** |
| **Moltis** | 0 | 1 | 无 | Groq Provider、strict schema | **低活跃；Provider 兼容修复有实际价值** |
| **PicoClaw** | 0 | 0 | 无 | 无 | **今日无活动** |
| **NullClaw** | 0 | 0 | 无 | 无 | **今日无活动** |
| **TinyClaw** | 0 | 0 | 无 | 无 | **今日无活动** |

---

## 3. OpenClaw 在生态中的定位

### 3.1 相对优势

OpenClaw 是今日 PR 更新量最高的项目，达到 **71 条 PR 更新**，并且同日发布了 **v2026.9.5**。相比其他项目，OpenClaw 的优势主要体现在：

1. **发布工程和升级链路成熟度较高**  
   v2026.9.5 聚焦 Doctor、session history、repeated-repair state、Gateway 启动状态等升级安全问题，同时有多条 release recovery PR 补强 npm、GitHub Release、ClawHub 证据链。

2. **系统覆盖面广**  
   今日变更横跨：
   - Gateway；
   - Web UI；
   - Agent Runtime；
   - Talk / Google Live；
   - Codex；
   - Skills；
   - Release automation；
   - Session state；
   - Provider streaming。

3. **维护响应密集**  
   多个高影响问题已经有对应 PR，例如 Gateway service definition、Web UI stale session event、Google Live session close、runtime/model pin 等。

4. **作为底层基础设施被其他项目依赖或集成**  
   LobsterAI 今日大量 PR 直接围绕 OpenClaw 启动恢复、Windows staging、Gateway 重启预算、MCP 配置同步展开，说明 OpenClaw 已具备被产品型 AI 助手封装和复用的基础设施属性。

### 3.2 技术路线差异

与 Hermes、CoPaw、LobsterAI 等更偏“产品端 / Console / Desktop”的项目相比，OpenClaw 更像是一个 **Agent Runtime + Gateway + Web UI + Release Infrastructure** 的综合平台。

| 对比维度 | OpenClaw | Hermes Agent | CoPaw / QwenPaw | LobsterAI |
|---|---|---|---|---|
| 核心定位 | Agent 平台与运行时基础设施 | 多端 AI 助手平台 | Console / Skill / Creator 工作台 | 桌面产品化 AI 助手 |
| 今日重点 | 发布恢复、Gateway、Talk、Runtime | Desktop、消息平台、会话状态 | Console、Prompt Injection、多模态上下文 | OpenClaw 集成、Windows、IM、Cowork |
| 风险标签 | compatibility、availability、security-boundary、session-state | P1/P2 会话与平台稳定性 | Beta 安全、多模态、插件兼容 | 启动/升级/付费媒体触发 |
| 技术风格 | 平台化、基础设施化 | 多端、多通道 | Console 工作流与 Creator 能力 | 产品体验和本地兼容 |

### 3.3 社区规模对比

从今日数据看，OpenClaw 的 **PR 更新量最高**，但 Issue 活动较少，说明当天主要是维护者和贡献者集中推进代码修复。Hermes Agent 的 **Issues 与 PR 均为 50**，社区反馈更密集，真实用户问题暴露更多。CoPaw、LobsterAI 则处于功能和质量快速推进期，但规模略低于 OpenClaw 与 Hermes。

---

## 4. 共同关注的技术方向

## 4.1 会话状态、恢复与取消语义

涉及项目：**OpenClaw、NanoBot、Hermes Agent、CoPaw、LobsterAI、ZeroClaw**

共同诉求：

- `/stop` 后不应恢复已取消任务；
- session history / recovery journal 需要可靠；
- stale session event 不应污染当前聊天；
- subagent / delegate 的状态应可中断、可追踪；
- 网关重启后会话状态应保持一致。

典型案例：

- OpenClaw：旧 session reset 事件清空当前聊天、Doctor 保留 session history。
- NanoBot：WebUI `/stop` 后 follow-up 在 gateway restart 后被重放。
- Hermes：`/stop` 停止后台 delegate 子代理并返回 interrupted partial results。
- CoPaw：interrupted requests、compaction、recall 相关修复。
- LobsterAI：Gateway deferred restart、新会话阻塞、启动恢复。
- ZeroClaw：delegate sub-agent session identity 传递需求。

**判断：**  
会话控制语义已经成为 AI Agent 产品可信度的核心。用户要求“停止就是停止、恢复不能违背用户意图、后台子任务必须可见且可控”。

---

## 4.2 Gateway、多通道与实时通信

涉及项目：**OpenClaw、Hermes Agent、NanoBot、ZeroClaw、LobsterAI、IronClaw**

共同诉求：

- Gateway 需要稳定启动、重启、恢复；
- Telegram、Discord、WhatsApp、WeCom、Slack、Weixin 等通道需要可靠投递；
- WebSocket stream 需要更完整事件；
- 多 profile / 多配置来源不能串线。

典型案例：

- OpenClaw：Gateway service definitions、gateway-relay Talk 问题。
- Hermes：Telegram DSML 泄露、Discord/WeCom/WhatsApp 修复。
- NanoBot：Discord reaction task 清理。
- ZeroClaw：`/ws/chat` 希望转发 tool result payload。
- LobsterAI：微信投递回执、IM 登录路由。
- IronClaw：Web UI 管理员配置 Google OAuth client 后 provider readiness 异常。

**判断：**  
AI 助手正在从本地 CLI 走向多通道常驻服务，Gateway 已成为核心基础设施。

---

## 4.3 工具执行安全与审批边界

涉及项目：**CoPaw、ZeroClaw、NanoBot、Hermes Agent、ZeptoClaw、LobsterAI**

共同诉求：

- Shell / exec 调用前要有安全审查；
- Prompt injection 不能删除技能、知识库等长期资产；
- 登录、插件、环境变量、付费媒体触发都需要更强边界；
- 工具调用分类、审批、权限继承要准确。

典型案例：

- CoPaw：Prompt Injection 试图删除所有技能；工具输出截断 marker 绕过。
- ZeroClaw：Git `--attr-source` 隐藏 mutating subcommand，影响审批分类。
- NanoBot：可选 Jev shell safeguard。
- Hermes：插件沙箱、环境变量 secret masking、blocking hook request。
- ZeptoClaw：公开面板密码登录限流。
- LobsterAI：付费图片/视频生成前检查用户意图。

**判断：**  
Agent 安全正在从“模型提示约束”转向“系统级策略约束”。审批分类、资源保护、限流、沙箱、外部 guard API 将成为常规能力。

---

## 4.4 多模态上下文与大载荷管理

涉及项目：**CoPaw、OpenClaw、Hermes Agent、LobsterAI**

共同诉求：

- 图片、音频、文件不能无限进入上下文；
- tool result pruning 需要覆盖非文本块；
- provider 对 audio/image content part 的兼容差异需要处理；
- 媒体生成要区分用户明确意图与上下文残留状态。

典型案例：

- CoPaw：图片 base64 DataBlock 不被裁剪；音频导致 DeepSeek 422 并使会话永久失败。
- OpenClaw：媒体去重与 stale WebChat replies。
- Hermes：附件预览、文件工作流、message delivery。
- LobsterAI：防止未明确请求时触发付费图片/视频生成。

**判断：**  
多模态不再只是“支持上传”，而是涉及上下文生命周期、成本控制、provider 兼容、安全触发条件的系统工程。

---

## 4.5 Provider 兼容性与传输可靠性

涉及项目：**OpenClaw、NanoClaw、Moltis、ZeptoClaw、ZeroClaw、CoPaw**

共同诉求：

- OpenAI-compatible endpoint 需要更宽容解析；
- WebSocket / SSE / HTTP transport 需可配置；
- Groq、Anthropic、DeepSeek、Gemini Live 等 provider 差异需要显式适配；
- prompt-cache 成本与命中率成为实际问题。

典型案例：

- NanoClaw：Codex Responses transport 在代理环境下需可配置。
- Moltis：Groq 加入 OpenAI-compatible provider。
- ZeptoClaw：读取 reasoning model 的 `reasoning_content`。
- ZeroClaw：Anthropic prompt-cache TTL 与 tool spec 排序。
- OpenClaw：Google Live / Gemini 3.8 Talk 修复。
- CoPaw：DeepSeek 不接受 OpenAI `input_audio` content part。

**判断：**  
Provider abstraction 已成为 Agent 框架的核心竞争力。谁能更好处理 provider 方言、transport 限制、缓存成本和多模态差异，谁就更适合真实部署。

---

## 4.6 UI / Desktop / Console 体验打磨

涉及项目：**OpenClaw、Hermes Agent、CoPaw、NanoBot、LobsterAI**

共同诉求：

- 设置页降低噪音；
- 移动端触控体验改善；
- 文件视图、附件预览、工作目录选择要准确；
- Console / Desktop 需要更像完整工作台。

典型案例：

- OpenClaw：隐藏 chat progress cards、减少 settings “Using default” 噪音。
- Hermes：Desktop 附件预览、prompt clip、移动端输入、Kanban 触控。
- CoPaw：Console file-area 旧内容、工作目录面板、terminal tabs。
- NanoBot：移动端聊天行点击、WebUI 重连提示。
- LobsterAI：Skills marketplace tag counts、Cowork model modes。

**判断：**  
个人 AI 助手的竞争点正在从底层 Agent 能力扩展到“长期使用是否顺手”。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 / 路线特征 |
|---|---|---|---|
| **OpenClaw** | Agent Runtime、Gateway、Web UI、Talk、Doctor、发布工程 | 开发者、运维用户、集成方、平台型用户 | 平台化基础设施，强调升级安全、Gateway 可用性、runtime 抽象 |
| **Hermes Agent** | Desktop、TUI、Gateway、消息平台、插件、安全 | 高级个人用户、多平台用户、插件开发者 | 多端产品形态，覆盖 Desktop / TUI / Gateway / 插件生态 |
| **CoPaw / QwenPaw** | Console、Skill、Creator、Memory、ReMe、视频生成 | Console 工作流用户、创作型用户、Skill 用户 | Beta 快速迭代，强化 Console workspace、Creator control-plane |
| **LobsterAI** | 桌面端、OpenClaw 集成、IM、Cowork、Skills 市场 | 普通桌面用户、企业 IM 用户、协作场景 | 产品化封装明显，重视 Windows、升级、IM、付费能力控制 |
| **NanoBot** | WebUI、Discord、subagent、exec safeguard | 轻量部署用户、WebUI 用户、Discord bot 用户 | 修复导向，关注生命周期、恢复语义与执行安全 |
| **NanoClaw** | CLI group 管理、Codex、Slack、配置一致性 | CLI 用户、企业网络用户、Slack 集成用户 | 偏配置与集成工具链，需加强校验和 transport 可配置 |
| **ZeroClaw** | Runtime、Shell tool、安全策略、Provider cache、Delegate | 开发者、自动化用户、安全敏感用户 | 强调 shell/runtime 安全与 provider 成本优化 |
| **ZeptoClaw** | 轻量面板、Provider 兼容、安全限流 | 自托管用户、小规模部署用户 | 小而精，补齐公网面板安全和模型兼容 |
| **IronClaw** | 第三方扩展、Google OAuth、provider readiness | 使用 Gmail / Calendar 的个人助手用户 | 扩展集成导向，关注 Web UI 管理配置路径 |
| **Moltis** | Provider 接入、OpenAI-compatible、多模型 | 多 provider 用户、Groq 用户 | 聚焦模型 provider 兼容性 |
| **PicoClaw / NullClaw / TinyClaw** | 今日无活动 | 暂无法判断 | 暂无近期信号 |

---

## 6. 社区热度与成熟度

### 6.1 第一梯队：快速迭代 + 高复杂度

包括：**OpenClaw、Hermes Agent、CoPaw / QwenPaw、LobsterAI**

特点：

- PR 更新量高；
- 涉及多个核心模块；
- 同时推进功能、稳定性、安全和 UI；
- 积压风险较高。

其中：

- **OpenClaw**：基础设施和发布工程最强，PR 更新量最高。
- **Hermes Agent**：用户反馈最密集，Issues 与 PR 均为 50。
- **CoPaw / QwenPaw**：Beta 阶段功能推进快，但安全和多模态上下文问题集中。
- **LobsterAI**：产品化修复明显，尤其是 OpenClaw 集成和 Windows 兼容。

### 6.2 第二梯队：质量巩固 + 定向修复

包括：**NanoBot、ZeroClaw、NanoClaw、ZeptoClaw**

特点：

- 活跃度中等；
- 问题较聚焦；
- 更偏稳定性、安全、配置和集成修复。

其中：

- **NanoBot**：WebUI 和通道生命周期修复及时。
- **ZeroClaw**：安全与 runtime 架构议题权重高。
- **NanoClaw**：社区反馈有价值，但维护合并节奏需提升。
- **ZeptoClaw**：小规模但方向清晰，安全和 Provider 兼容持续补齐。

### 6.3 第三梯队：低活跃 / 单点维护

包括：**IronClaw、Moltis**

特点：

- 今日仅 1 个 PR；
- 但 PR 均有明确实际价值；
- 更像是围绕特定集成或 provider 做点状修复。

### 6.4 静默项目

包括：**PicoClaw、NullClaw、TinyClaw**

过去 24 小时无活动，无法从今日数据判断项目健康度或路线变化。

---

## 7. 值得关注的趋势信号

### 7.1 Agent 产品正在进入“状态一致性竞争”阶段

多个项目都在修复 stop、resume、recovery、session history、subagent lifecycle 问题。  
这说明真实用户已经开始长时间运行 Agent，并期待其具备和传统软件一样清晰的状态语义。

对开发者的启示：

- 需要显式定义 cancel / stop / interrupt / resume 的区别；
- durable journal 必须尊重用户取消意图；
- subagent 和后台任务必须可观测、可中断、可回收。

---

### 7.2 Gateway 正在成为个人 AI 助手的标准组件

OpenClaw、Hermes、LobsterAI、NanoBot、ZeroClaw 都在处理 Gateway 或通道问题。  
AI 助手不再只是 CLI 或 Web Chat，而是需要连接 Telegram、Discord、WhatsApp、WeCom、Slack、Google、IM、Desktop、Mobile。

对开发者的启示：

- Gateway 需要独立的生命周期管理；
- 多 profile、多 provider、多 channel 的隔离非常重要；
- 消息投递需要 idempotency、retry ledger 和可观测性。

---

### 7.3 安全边界从 prompt 层下沉到 runtime 层

Prompt Injection、防误删技能、Shell 命令分类、exec guard、插件沙箱、登录限流、secret masking 同时出现。  
这表明社区已经认识到：仅靠 prompt 约束无法保障 Agent 安全。

对开发者的启示：

- 高风险工具必须有 policy engine；
- 关键资产目录应默认保护；
- shell command parser 需要保守处理复杂参数；
- 插件和第三方 skill 应运行在能力受限环境中；
- 用户付费或破坏性操作必须要求明确意图。

---

### 7.4 多模态上下文生命周期成为新痛点

CoPaw 的图片 base64、音频 DataBlock 问题，与 OpenClaw、Hermes、LobsterAI 的媒体去重、附件预览、付费媒体触发形成呼应。  
多模态能力越强，上下文膨胀、provider 不兼容、费用误触发问题越突出。

对开发者的启示：

- 图片、音频、文件应优先使用引用机制，而不是长期 inline；
- pruning 不能只覆盖 text；
- provider adapter 必须处理不同 content part 方言；
- 媒体生成需要严格的用户意图检测。

---

### 7.5 Provider 兼容性成为框架能力分水岭

Groq、Anthropic、DeepSeek、Gemini Live、OpenAI-compatible、Codex transport 等问题同时出现。  
这说明 Agent 框架必须面对 provider 差异，而不能假设所有服务都完全兼容 OpenAI API。

对开发者的启示：

- Provider abstraction 需要支持方言扩展；
- transport 应可配置，例如 WebSocket / SSE / HTTP；
- reasoning content、tool schema、audio/image parts 都要做兼容层；
- prompt-cache 成本优化会影响生产部署成本。

---

### 7.6 UI 工作台化趋势明显

Console terminal、Desktop attachment preview、工作目录面板、Skills marketplace、chat progress card、mobile touch 修复等信号表明，个人 AI 助手正在从“聊天窗口”走向“完整工作台”。

对开发者的启示：

- 文件视图、终端、任务状态、会话历史、插件管理会成为标配；
- UI 状态必须与磁盘、session、agent 执行状态保持一致；
- 高频用户更重视低噪音、可配置和空间效率。

---

## 总结判断

今日生态呈现出明显分化：

- **OpenClaw** 是基础设施型头部项目，发布工程、Gateway、Runtime 和升级安全能力突出。
- **Hermes Agent** 是用户反馈密度最高的多端产品型项目，真实使用场景复杂度最高。
- **CoPaw / QwenPaw** 处于高活跃 beta 阶段，Console、Creator、Skill 能力推进快，但安全和多模态上下文需要收敛。
- **LobsterAI** 更偏产品化和桌面端集成，围绕 OpenClaw、IM、Windows、Skills 做实际体验优化。
- **NanoBot、ZeroClaw、NanoClaw、ZeptoClaw** 则在更聚焦的方向上补强安全、生命周期、配置和 Provider 兼容。

对技术决策者而言，短期选型应重点考察四类能力：**会话状态可靠性、Gateway/多通道成熟度、工具安全边界、Provider 兼容层质量**。这些已经成为个人 AI 助手与自主智能体框架能否进入真实长期使用场景的关键门槛。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-09-19）

## 1. 今日速览

过去 24 小时，NanoBot 保持较高开发活跃度：新增/活跃 Issue 2 条，PR 更新 9 条，其中 7 条仍待合并，2 条已关闭。今日工作重心明显集中在 **WebUI 稳定性、会话恢复、移动端交互、Discord 生命周期清理**，同时也出现了面向执行安全的新能力提案。  
从健康度看，项目维护响应较快：两个新报 Bug 均已有对应修复 PR，说明问题发现到修复链路较短。不过，大量 PR 仍处于开放状态，短期内需要维护者集中 review，以避免修复积压。  
今日无新版本发布，整体处于 **密集修复与回归测试阶段**，更像是下一次稳定版本发布前的质量收敛周期。

---

## 2. 项目进展

今日共有 2 个 PR 进入关闭状态，另有多项关键修复仍在等待合并。

### 已关闭 / 已完成的重要 PR

- [PR #5812：fix(agent): run explicit recovery continuations](https://github.com/HKUDS/nanobot/pull/5812)  
  状态：Closed  
  该 PR 修复了 WebUI 恢复流程中的显式 continuation 无法进入 Agent turn processor 的问题。其核心价值在于区分持续目标 continuation 与其他内部 continuation，确保恢复动作可以正确派发到 AgentLoop。  
  这对 WebUI 在网关重启、恢复会话、继续执行中断任务等场景的可靠性有直接帮助。

- [PR #5810：fix(webui): show all channels when only WebUI is enabled](https://github.com/HKUDS/nanobot/pull/5810)  
  状态：Closed  
  该 PR 修复了当仅启用 WebUI 通道时，Channels 设置页错误地默认显示 Enabled 过滤器，从而隐藏其他可配置通道的问题。  
  该修复提升了配置发现性，尤其对新用户或只通过 WebUI 启动 NanoBot 的用户更友好。

### 今日仍待合并的关键推进

- [PR #5809：fix(agent): discard stopped follow-up recovery journal](https://github.com/HKUDS/nanobot/pull/5809)  
  对应 [Issue #5808](https://github.com/HKUDS/nanobot/issues/5808)，用于防止 WebUI `/stop` 后被取消的 follow-up 在网关重启后被恢复执行。

- [PR #5807：fix(discord): clean up reaction state on stop](https://github.com/HKUDS/nanobot/pull/5807)  
  对应 [Issue #5806](https://github.com/HKUDS/nanobot/issues/5806)，用于清理 Discord 停止后的 reaction task 与 pending reaction 状态。

- [PR #5813：fix(webui): clear stale restart prompt after reconnect](https://github.com/HKUDS/nanobot/pull/5813)  
  修复网关重启后 WebUI 仍保留旧的 `requires_restart` 设置快照、错误提示用户再次重启的问题。

- [PR #5814：fix(webui): remove intermediate answer footer gap](https://github.com/HKUDS/nanobot/pull/5814)  
  优化 WebUI 中间回答片段的 footer/timestamp 预留空间问题，改善流式输出期间的视觉连续性。

- [PR #5805：fix(webui): keep mobile chat rows tappable](https://github.com/HKUDS/nanobot/pull/5805)  
  修复移动端/触屏设备上聊天行可能被隐藏操作区拦截点击的问题。

- [PR #5811：refactor(agent): execute subagents through private sessions](https://github.com/HKUDS/nanobot/pull/5811)  
  重构 subagent 执行路径，让委托任务通过私有内存子会话运行，并复用共享 AgentLoop 上下文与压缩路径。

- [PR #5815：feat(exec): add optional Jev shell safeguard](https://github.com/HKUDS/nanobot/pull/5815)  
  新增可选 shell 执行安全防护，通过 OpenRouter Decisions API 对 `exec` 调用进行预检查，默认关闭。

整体来看，今日项目推进幅度较明显：虽然正式关闭的 PR 只有 2 个，但待合并 PR 中包含多个直接对应 Bug 的修复项，若合并完成，将显著提升 WebUI 恢复、移动端交互、Discord 运行时清理以及执行安全能力。

---

## 3. 社区热点

今日 Issue 和 PR 的评论、点赞数据整体偏低，暂无明显“高讨论量”热点。所有新增 Issue 评论数均为 0，PR 反应数也为 0，说明今日更多是开发者主动发现与提交修复，而非大规模用户讨论驱动。

### 主要关注点

- [Issue #5808：WebUI follow-ups canceled by /stop replay after gateway restart](https://github.com/HKUDS/nanobot/issues/5808)  
  诉求：用户在 WebUI 中执行 `/stop` 后，期望被取消的 follow-up 不再继续执行。但当前持久化 recovery journal 中仍保留这些消息，网关重启后又被重新排队。  
  背后反映的问题是：**用户取消意图与系统恢复机制之间存在语义冲突**。

- [Issue #5806：Discord runtime leaves reaction tasks alive after stop](https://github.com/HKUDS/nanobot/issues/5806)  
  诉求：Discord 通道停止后应彻底清理 reaction 相关后台任务和状态。  
  背后反映的问题是：**通道生命周期管理仍存在资源泄漏风险**，尤其在长时间运行或频繁启停场景中可能放大。

- [PR #5815：feat(exec): add optional Jev shell safeguard](https://github.com/HKUDS/nanobot/pull/5815)  
  虽然暂无讨论，但该 PR 信号较强：项目开始增强 `exec` 工具调用前的安全审查能力。这说明维护者可能正在关注 AI Agent 执行 shell 命令时的风险控制。

---

## 4. Bug 与稳定性

按潜在影响程度排序如下。

### 高优先级：WebUI `/stop` 后取消的 follow-up 被重放

- Issue：[Issue #5808](https://github.com/HKUDS/nanobot/issues/5808)  
- Fix PR：[PR #5809](https://github.com/HKUDS/nanobot/pull/5809)  
- 状态：Issue Open，修复 PR Open  
- 影响范围：WebUI、会话取消、网关重启、恢复机制  
- 问题描述：用户停止当前 WebUI turn 后，内存队列被清空，但 durable recovery journal 中仍保留 follow-up。网关重启后，`RecoveryCoordinator` 会重新排队这些已取消消息。  
- 风险分析：该问题可能导致用户明确取消的任务在重启后继续执行，属于较严重的“用户意图违背”问题。对 Agent 类产品而言，这会影响信任感与可控性。  
- 修复方向：PR #5809 通过在显式 session cancellation 开始时快照 durable follow-up ID，并在 worker 停止后确认这些 follow-up，从而避免已取消任务被恢复。

### 中高优先级：Discord 停止后 reaction 任务未清理

- Issue：[Issue #5806](https://github.com/HKUDS/nanobot/issues/5806)  
- Fix PR：[PR #5807](https://github.com/HKUDS/nanobot/pull/5807)  
- 状态：Issue Open，修复 PR Open  
- 影响范围：Discord channel runtime、后台任务、资源清理  
- 问题描述：`DiscordChannel._reset_runtime_state()` 会取消 typing tasks 并清理 stream/channel cache，但没有取消或清理 `_working_emoji_tasks` 与 `_pending_reactions`。  
- 风险分析：如果通道频繁 stop/start，可能产生残留异步任务、状态污染或潜在内存泄漏。  
- 修复方向：PR #5807 增加 delayed working-emoji task 的取消与 await，并在相同生命周期边界清理 pending reaction messages。

### 中优先级：WebUI 重连后残留错误重启提示

- PR：[PR #5813](https://github.com/HKUDS/nanobot/pull/5813)  
- 状态：Open  
- 影响范围：WebUI 设置页、网关重启、用户提示  
- 问题描述：网关重启后，浏览器端可能保留重启前的 `requires_restart` 设置快照，导致用户被错误要求再次重启。  
- 风险分析：不会直接破坏任务执行，但会造成配置状态混乱和用户误操作。  
- 修复方向：浏览器重连时刷新 settings，并同步 settings controller。

### 中优先级：WebUI 中间回答 footer 间距异常

- PR：[PR #5814](https://github.com/HKUDS/nanobot/pull/5814)  
- 状态：Open  
- 影响范围：WebUI 流式回答展示  
- 问题描述：活跃 turn 中的非终态 assistant slice 保留 timestamp/footer 空间，造成中间回答视觉间距异常。  
- 风险分析：主要是 UI 体验问题，但会影响长回答、流式输出场景下的阅读体验。  
- 修复方向：活跃 turn 中移除非终态片段的 footer reservation，最终答案仍保留 footer 几何结构。

### 中优先级：移动端聊天行点击被隐藏操作区拦截

- PR：[PR #5805](https://github.com/HKUDS/nanobot/pull/5805)  
- 状态：Open  
- 影响范围：WebUI 移动端/触屏交互  
- 问题描述：透明 trailing action trigger 在移动端仍可命中，导致第一次点击可能落在隐藏操作区，而不是打开会话。  
- 风险分析：影响移动端基本可用性，尤其对触屏用户不友好。  
- 修复方向：隐藏操作触发器在 hover、focus 或菜单打开前设为 pointer-inert。

---

## 5. 功能请求与路线图信号

今日没有由 Issue 明确提出的新功能请求，但 PR 中出现了两个明显的路线图信号。

### 执行安全能力增强

- PR：[PR #5815：feat(exec): add optional Jev shell safeguard](https://github.com/HKUDS/nanobot/pull/5815)  
- 类型：新功能  
- 当前状态：Open  
- 路线图信号：NanoBot 正在加强 Agent 执行外部命令时的安全边界。该 PR 增加可选的 `tools.exec.jevGuard` 预执行检查，使用 OpenRouter Decisions API，对模型响应中的 normalized `exec` 调用进行批量决策。  
- 纳入下一版本可能性：较高，但取决于维护者对外部依赖、默认关闭策略、失败回退逻辑和凭据复用设计的 review 结果。由于该功能默认关闭，对现有用户破坏性较低。

### Subagent 执行架构收敛

- PR：[PR #5811：refactor(agent): execute subagents through private sessions](https://github.com/HKUDS/nanobot/pull/5811)  
- 类型：重构 / 架构演进  
- 当前状态：Open  
- 路线图信号：项目正在尝试减少 subagent 的独立执行路径，将委托任务纳入共享 `AgentLoop`、上下文压缩和 session 管理体系。  
- 纳入下一版本可能性：中等偏高。该 PR 影响 Agent 内核路径，收益是降低重复逻辑和提升一致性，但也需要更充分测试以避免破坏 spawn/SDK 合约。

### WebUI 体验持续打磨

- PR：[PR #5813](https://github.com/HKUDS/nanobot/pull/5813)、[PR #5814](https://github.com/HKUDS/nanobot/pull/5814)、[PR #5805](https://github.com/HKUDS/nanobot/pull/5805)  
- 类型：体验修复  
- 当前状态：Open  
- 路线图信号：WebUI 正在从“可用”转向“细节稳定”，重点覆盖重连、移动端、流式输出布局等真实使用场景。  
- 纳入下一版本可能性：高。这些 PR 影响面相对局部，且均包含测试或回归覆盖描述。

---

## 6. 用户反馈摘要

由于今日新增 Issue 均无评论，用户反馈主要来自 Issue 描述和复现步骤，而非后续讨论。

### 用户痛点一：用户点击停止后，系统必须真正停止

- 来源：[Issue #5808](https://github.com/HKUDS/nanobot/issues/5808)  
- 场景：WebUI 中用户停止一个活跃 turn，随后网关重启。  
- 痛点：用户认为 `/stop` 是明确取消操作，但系统恢复机制仍可能重放被取消的 follow-up。  
- 反馈含义：对 AI Agent 产品而言，“停止”“取消”“恢复”这些控制语义必须清晰一致，否则会削弱用户对自动化执行的信任。

### 用户痛点二：长时间运行的 Discord 集成需要可靠清理

- 来源：[Issue #5806](https://github.com/HKUDS/nanobot/issues/5806)  
- 场景：Discord channel stop 后，reaction 相关任务仍残留。  
- 痛点：后台任务未清理可能造成运行时状态污染，尤其是在 bot 长时间运行、重连、热重载或测试环境中。  
- 反馈含义：多通道 Agent 系统需要严格的生命周期边界，尤其是异步任务、缓存和 pending 状态。

### 用户痛点三：WebUI 在移动端和重连后的体验仍需修补

- 来源：[PR #5805](https://github.com/HKUDS/nanobot/pull/5805)、[PR #5813](https://github.com/HKUDS/nanobot/pull/5813)、[PR #5814](https://github.com/HKUDS/nanobot/pull/5814)  
- 场景：移动端点击会话、网关重启后继续使用设置页、查看流式回答。  
- 痛点：隐藏点击区域、过期状态提示和布局间距都会造成“产品不稳定”的感知。  
- 反馈含义：WebUI 已经进入较深入的可用性打磨阶段，用户体验问题开始被系统性修复。

---

## 7. 待处理积压

当前数据仅覆盖过去 24 小时，未提供长期未响应 Issue/PR 信息，因此无法判断真正意义上的长期积压。不过，从今日状态看，有几类待处理项值得维护者优先关注：

### 需要优先 review 的 Bug 修复 PR

- [PR #5809：fix(agent): discard stopped follow-up recovery journal](https://github.com/HKUDS/nanobot/pull/5809)  
  对应 [Issue #5808](https://github.com/HKUDS/nanobot/issues/5808)。该问题涉及用户取消语义和恢复机制，建议优先 review。

- [PR #5807：fix(discord): clean up reaction state on stop](https://github.com/HKUDS/nanobot/pull/5807)  
  对应 [Issue #5806](https://github.com/HKUDS/nanobot/issues/5806)。该问题涉及异步任务生命周期和资源清理，建议尽快合并或反馈修改意见。

- [PR #5813：fix(webui): clear stale restart prompt after reconnect](https://github.com/HKUDS/nanobot/pull/5813)  
  影响重启后 WebUI 状态一致性，建议与恢复流程相关 PR 一并验证。

### 需要谨慎 review 的架构/安全 PR

- [PR #5811：refactor(agent): execute subagents through private sessions](https://github.com/HKUDS/nanobot/pull/5811)  
  涉及 subagent 执行路径重构，可能影响 AgentLoop、上下文压缩、SDK/spawn 合约，建议重点检查回归测试覆盖面。

- [PR #5815：feat(exec): add optional Jev shell safeguard](https://github.com/HKUDS/nanobot/pull/5815)  
  涉及 shell 执行安全、OpenRouter Decisions API、凭据复用与代理配置，建议重点审查失败模式、默认关闭策略、隐私和外部调用行为。

---

## 总体健康度评估

NanoBot 今日表现为 **高开发活跃、低社区讨论、强修复导向**。新增 Bug 均已有对应修复 PR，说明维护效率较好；同时 WebUI 与 Discord 的问题集中在生命周期和状态一致性上，属于 Agent 产品走向稳定时常见的质量收敛问题。  
短期建议维护者优先合并高确定性的稳定性修复，再审慎推进 subagent 架构重构和 exec 安全增强。若当前 7 个开放 PR 能在充分测试后合并，项目的 WebUI 可靠性、移动端体验、Discord 清理能力和执行安全边界都会有明显提升。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
日期：2026-09-19  
仓库：NousResearch/hermes-agent  
统计窗口：过去 24 小时

---

## 1. 今日速览

过去 24 小时 Hermes Agent 活跃度非常高：Issues 更新 50 条，PR 更新 50 条，说明项目仍处于高频迭代与密集问题反馈阶段。今日没有新版本发布，但已有大量修复型 PR 打开，集中在 Desktop、Gateway、TUI、会话状态、消息投递、Windows/macOS 平台兼容性等方向。  
从问题分布看，当前项目的主要压力点不是单一功能缺失，而是多端、多平台、多会话场景下的稳定性与一致性：包括附件预览、会话恢复、后台子代理、更新流程、移动端输入、消息平台适配等。  
PR 侧有 42 个仍待合并，8 个已合并或关闭，维护节奏活跃，但积压风险也在上升，尤其是 P1/P2 稳定性问题需要优先清理。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日 PR 更新 50 条，其中 8 条已合并或关闭、42 条仍待合并。已关闭的重要 PR 主要集中在 Desktop 附件预览与 `/stop` 后台子代理控制。

### 重要已关闭 / 已完成 PR

#### 3.1 Desktop 附件预览路径回退修复  
- PR：[#115621 fix(desktop): fall back to home/attachments dir for missing preview targets](https://github.com/NousResearch/hermes-agent/pull/115621)  
- 状态：CLOSED  
- 关联 Issue：[#115609](https://github.com/NousResearch/hermes-agent/issues/115609)  
- 影响范围：Desktop、Windows、附件预览  
- 内容摘要：  
  `previewFileTarget` 在找不到目标文件时，新增对 Hermes home 目录与 attachments 目录的回退解析，避免 `.xlsx`、`.docx` 等历史附件引用因相对路径解析错误而无法打开。  
- 项目推进意义：  
  这是一个典型的 Desktop 用户体验修复，解决了历史聊天记录中附件无法预览的问题，尤其对 Windows 用户影响明显。

#### 3.2 `/stop` 能停止后台 delegate 子代理并返回部分结果  
- PR：[#115616 /stop halts background subagents and returns their partial results as interrupted completions](https://github.com/NousResearch/hermes-agent/pull/115616)  
- 状态：CLOSED  
- 关联场景：Gateway、TUI、ACP、delegate task、会话状态  
- 内容摘要：  
  `/stop` 现在可以终止当前会话中的后台 `delegate_task` 子任务及其子树，并把部分输出作为 `status=interrupted` 的完成通知返回。  
- 项目推进意义：  
  该修复提升了用户对后台 agent / subagent 的可控性，减少“停止主会话但子任务仍在跑”的资源泄漏和状态错觉。

---

### 今日仍待合并但推进明显的 PR

#### 3.3 Desktop 密码与登录列表增加搜索和类型过滤  
- PR：[#115622 feat(desktop): search and kind filter on the Passwords & Logins list](https://github.com/NousResearch/hermes-agent/pull/115622)  
- 类型：Feature  
- 意义：  
  针对大量凭据场景优化设置页可用性，说明 Hermes 正在加强个人 AI 助手中的凭据管理与长期账户体验。

#### 3.4 Dashboard 环境变量编辑器隐藏敏感值  
- PR：[#115620 Mask secret values in the environment editor](https://github.com/NousResearch/hermes-agent/pull/115620)  
- 类型：Security  
- 意义：  
  防止 API Keys / 环境变量编辑时泄露 secret，并禁用拼写检查、减少密码管理器误填风险。该 PR 与个人 AI 助手的本地安全边界高度相关。

#### 3.5 Desktop 插件沙箱化与 capability-gated SDK bridge  
- PR：[#115619 Desktop: catalog-installed plugins run in a sandboxed realm behind a capability-gated SDK bridge](https://github.com/NousResearch/hermes-agent/pull/115619)  
- 类型：Security  
- 意义：  
  Catalog 插件从 renderer realm 转为 sandboxed iframe realm，并通过能力门控 SDK 通信。该方向非常关键，说明插件生态正在从“可扩展”转向“可控扩展”。

#### 3.6 Windows 更新流程修复  
- PR：[#115615 fix(cli): symmetric Windows resume-failure handling + atexit disarm](https://github.com/NousResearch/hermes-agent/pull/115615)  
- 关联 Issue：[#115563](https://github.com/NousResearch/hermes-agent/issues/115563)  
- 意义：  
  修复 Windows 上 `hermes update` 在“Already up to date”情况下仍 exit 1 的问题，降低更新流程误报失败。

#### 3.7 多 profile 会话恢复作用域修复  
- PR：[#115614 fix(tui-gateway): resolve deferred/cold resume overrides under launch-profile scope](https://github.com/NousResearch/hermes-agent/pull/115614)  
- 关联 Issue：[#115607](https://github.com/NousResearch/hermes-agent/issues/115607)  
- 意义：  
  修复 multiplexed gateway 场景中会话恢复使用错误 profile 配置的问题，是多用户 / 多 profile 部署稳定性的关键补丁。

#### 3.8 Discord / WeCom / WhatsApp 等消息平台修复  
- Discord：[#115611](https://github.com/NousResearch/hermes-agent/pull/115611)  
- Weixin / WeCom：[#115608](https://github.com/NousResearch/hermes-agent/pull/115608)  
- WhatsApp：[#115603](https://github.com/NousResearch/hermes-agent/pull/115603)  
- 意义：  
  多个平台适配器同时出现修复，表明 Hermes 的消息投递层已成为真实用户使用的重要入口，也暴露出跨平台消息语义、重试账本、profile 隔离等复杂问题。

---

## 4. 社区热点

以下为过去 24 小时评论最多或讨论热度较高的问题。

### 4.1 Desktop prompt clip 交互问题  
- Issue：[#115462 Desktop - prompt clip: single click expands and collapses at once](https://github.com/NousResearch/hermes-agent/issues/115462)  
- 评论数：3  
- 标签：`type/bug`, `P3`, `comp/desktop`  
- 用户诉求：  
  用户希望长 prompt 折叠块既能方便阅读，又能保留编辑与 checkpoint restore 能力。但当前单击会同时展开和折叠，且 clean state 下鼠标移动也会触发折叠，导致阅读和选择文本体验不稳定。  
- 背后信号：  
  Desktop 的 chat history 交互已经进入“精细体验优化”阶段，用户不只关注功能是否存在，也关注阅读、编辑、恢复之间的交互边界。

### 4.2 Desktop 附件预览 ENOENT  
- Issue：[#115609 Desktop: attachment preview ENOENT for home-relative refs](https://github.com/NousResearch/hermes-agent/issues/115609)  
- 评论数：2  
- 标签：`P2`, `comp/desktop`, `platform/windows`  
- 已有修复：  
  - [#115621](https://github.com/NousResearch/hermes-agent/pull/115621) 已关闭  
  - [#115618](https://github.com/NousResearch/hermes-agent/pull/115618) OPEN  
  - [#115617](https://github.com/NousResearch/hermes-agent/pull/115617) OPEN  
- 用户诉求：  
  聊天历史中的附件应该可直接预览，尤其是 Excel / Word 等工作流文件。  
- 背后信号：  
  Hermes Desktop 已被用于真实文件工作流，附件引用路径需要跨 OS、跨 cwd、跨历史记录保持稳定。

### 4.3 TUI live compression 配置崩溃  
- Issue：[#115572 Bug: NameError in _apply_live_compression_config](https://github.com/NousResearch/hermes-agent/issues/115572)  
- 评论数：2  
- 标签：`P2`, `comp/tui`, `area/config`, `area/compression`  
- 问题摘要：  
  `_apply_live_compression_config()` 调用了未定义 / 未导入的 `is_truthy_value`，导致所有 compressor，包括内置 compressor，在 live config apply 时崩溃。  
- 背后信号：  
  context compression 是长会话 agent 的核心能力；配置热更新崩溃会直接影响长上下文、多轮任务体验。

### 4.4 Gateway Telegram DSML tool-call markup 泄露  
- Issue：[#115475 hardcoded stream: True leaks DSML tool-call markup into Telegram](https://github.com/NousResearch/hermes-agent/issues/115475)  
- 评论数：1  
- 标签：`P1`, `comp/gateway`, `platform/telegram`, `area/streaming`, `area/message-delivery`  
- 用户诉求：  
  Telegram 交互不应显示内部 DSML tool-call 标签，而应正确执行工具调用。  
- 背后信号：  
  对消息平台用户而言，工具调用抽象必须完全隐藏；任何协议泄露都会被视为严重体验破坏。

### 4.5 会话数据库结构损坏  
- Issue：[#115571 worker transcript write fails with structural corruption](https://github.com/NousResearch/hermes-agent/issues/115571)  
- 评论数：1  
- 标签：`P1`, `comp/agent`, `area/sessions`  
- 用户诉求：  
  会话数据库必须可靠，不能因 messages 表结构损坏导致 worker transcript 写入失败。  
- 背后信号：  
  Hermes 正在被用于长期会话和生产环境，`state.db` 可靠性是核心基础设施问题。

---

## 5. Bug 与稳定性

以下按严重程度和影响范围排序。

### P1 / 高优先级问题

#### 5.1 会话数据库 messages 表结构损坏  
- Issue：[#115571](https://github.com/NousResearch/hermes-agent/issues/115571)  
- 状态：OPEN  
- 组件：Agent、Sessions  
- 严重性：P1  
- 描述：  
  Hermes v0.21.0 下 `messages` 表出现 row IDs out of order 和索引不一致，导致 worker transcript 写入失败。  
- Fix PR：当前数据中未看到明确对应 PR。  
- 风险：  
  影响会话持久化、历史恢复和 agent 可靠性，应优先诊断根因和提供修复 / 恢复工具。

#### 5.2 Telegram 消息中泄露 DSML tool-call markup  
- Issue：[#115475](https://github.com/NousResearch/hermes-agent/issues/115475)  
- 状态：OPEN  
- 组件：Gateway、Telegram、Streaming  
- 严重性：P1  
- 描述：  
  Gateway API 调用中硬编码 `stream: True`，导致 DeepSeek / Nous 场景下工具调用标签直接出现在 Telegram 聊天中。  
- Fix PR：当前数据中未看到明确对应 PR。  
- 风险：  
  破坏工具调用体验，影响所有 Telegram profile 的正常交互。

---

### P2 / 中高优先级问题

#### 5.3 Desktop 附件预览路径解析失败  
- Issue：[#115609](https://github.com/NousResearch/hermes-agent/issues/115609)  
- 状态：OPEN  
- 组件：Desktop、Windows  
- 严重性：P2  
- Fix PR：  
  - [#115621](https://github.com/NousResearch/hermes-agent/pull/115621) CLOSED  
  - [#115618](https://github.com/NousResearch/hermes-agent/pull/115618) OPEN  
  - [#115617](https://github.com/NousResearch/hermes-agent/pull/115617) OPEN  
- 风险：  
  影响历史附件预览和下载，尤其是 Windows home-relative 路径。

#### 5.4 TUI live compression 配置热更新崩溃  
- Issue：[#115572](https://github.com/NousResearch/hermes-agent/issues/115572)  
- 状态：OPEN  
- 严重性：P2  
- Fix PR：当前数据中未看到明确对应 PR。  
- 风险：  
  所有 context engine 可能受影响，属于低级 NameError 但影响面大。

#### 5.5 多 profile / multiplexed gateway 会话恢复使用错误配置  
- Issue：[#115607](https://github.com/NousResearch/hermes-agent/issues/115607)  
- 状态：OPEN  
- 严重性：P2  
- Fix PR：[#115614](https://github.com/NousResearch/hermes-agent/pull/115614) OPEN  
- 风险：  
  多 profile 用户可能在恢复会话时使用错误 provider overrides，导致模型、认证或本地模型配置错配。

#### 5.6 ACP `_finish_turn` 异常导致 session wedged  
- Issue：[#115588](https://github.com/NousResearch/hermes-agent/issues/115588)  
- 状态：OPEN  
- 严重性：P2  
- Fix PR：当前数据中未看到明确对应 PR。  
- 描述：  
  `_finish_turn` 仍在 try/finally 外释放 `is_running`，tail exception 会导致 session 卡住。  
- 风险：  
  直接影响会话可继续性，是典型的状态机释放问题。

#### 5.7 Windows active-session registry lock 饥饿  
- Issue：[#115578](https://github.com/NousResearch/hermes-agent/issues/115578)  
- 状态：OPEN  
- 严重性：P2  
- 组件：Desktop、CLI、Windows、Sessions  
- 描述：  
  Windows 上 active-session registry lock 持有约 80ms，且 `LK_LOCK` 不公平，在多个 lease 下 poller 容易饥饿。  
- Fix PR：当前数据中未看到明确对应 PR。  
- 风险：  
  多会话或高频轮询场景下可能导致 Desktop 状态不一致或响应变慢。

#### 5.8 Windows `hermes update` “Already up to date” 仍 exit 1  
- Issue：[#115563](https://github.com/NousResearch/hermes-agent/issues/115563)  
- 状态：OPEN  
- 严重性：P2  
- Fix PR：[#115615](https://github.com/NousResearch/hermes-agent/pull/115615) OPEN  
- 风险：  
  更新流程误报失败，影响 Windows 用户信任度和自动化部署。

#### 5.9 Gateway large state.db 启动 watchdog 续租问题  
- Issue：[#115542](https://github.com/NousResearch/hermes-agent/issues/115542)  
- 状态：OPEN  
- 严重性：P2  
- 描述：  
  大型 `state.db` 在 unclean exit 后执行 `PRAGMA quick_check(1)`，但没有更新 startup watchdog progress lease，可能进入重启循环。  
- Fix PR：当前数据中未看到明确对应 PR。  
- 风险：  
  对大规模长期用户影响明显，尤其是 30GB+ state.db 的生产 profile。

#### 5.10 Gateway Discord 启动 warm-up 日志锁阻塞导致 exit 75  
- Issue：[#115516](https://github.com/NousResearch/hermes-agent/issues/115516)  
- 状态：OPEN  
- 严重性：P2  
- Fix PR：当前数据中未看到明确对应 PR。  
- 风险：  
  日志 handler 锁竞争不应阻塞 asyncio event loop；此类问题会造成偶发启动失败，难以诊断。

#### 5.11 Desktop SSH mode 继承 `umask 077`  
- Issue：[#115512](https://github.com/NousResearch/hermes-agent/issues/115512)  
- 状态：OPEN  
- 严重性：P2  
- 组件：Desktop、SSH backend、terminal tool  
- 描述：  
  SSH 模式启动远端 backend 时未恢复 `umask`，导致 terminal tool 和 sudo 创建 0600/0700 文件。  
- Fix PR：当前数据中未看到明确对应 PR。  
- 风险：  
  影响远程开发环境文件权限，可能造成团队协作问题。

#### 5.12 `/undo` 和 `/retry` 在无 assistant reply 后失效  
- Issue：[#115493](https://github.com/NousResearch/hermes-agent/issues/115493)  
- 状态：OPEN  
- 严重性：P2  
- 组件：Agent、CLI、Sessions  
- 描述：  
  某次 turn 无 assistant reply 后，durable transcript 留下 unanswered user row，后续 alternation repair 改写历史，导致 rewind 持久化失败。  
- Fix PR：当前数据中未看到明确对应 PR。  
- 风险：  
  影响用户从失败 turn 中恢复，是会话可操作性的核心问题。

---

### P3 / 普通优先级但影响体验的问题

#### 5.13 Desktop prompt clip 展开 / 折叠交互异常  
- Issue：[#115462](https://github.com/NousResearch/hermes-agent/issues/115462)  
- 状态：OPEN  
- Fix PR：当前数据中未看到明确对应 PR。

#### 5.14 Android dashboard `/chat` 输入重复与 Backspace 回退  
- Issue：[#115505](https://github.com/NousResearch/hermes-agent/issues/115505)  
- 状态：OPEN  
- 组件：Dashboard、Mobile  
- 风险：  
  移动端输入体验严重受损，尤其涉及 IME composition。

#### 5.15 Kanban 触屏点击卡片变成拖动  
- Issue：[#115568](https://github.com/NousResearch/hermes-agent/issues/115568)  
- 状态：OPEN  
- Fix PR：[#115605](https://github.com/NousResearch/hermes-agent/pull/115605) OPEN  
- 风险：  
  影响移动端插件 / dashboard Kanban 操作。

#### 5.16 Memory `hindsight_reflect` 忽略 tag filter  
- Issue：[#115499](https://github.com/NousResearch/hermes-agent/issues/115499)  
- 状态：OPEN  
- 组件：Plugins、Memory  
- 风险：  
  反思扫描整个 memory bank，既影响性能，也可能引入不相关记忆污染。

#### 5.17 OpenCode Zen retired model 仍出现在 picker  
- Issue：[#115496](https://github.com/NousResearch/hermes-agent/issues/115496)  
- 状态：OPEN  
- 组件：CLI、Model catalog  
- 风险：  
  用户选中后请求失败，属于 catalog 维护问题。

---

## 6. 功能请求与路线图信号

### 6.1 Web dashboard 支持 GFM table 渲染  
- Issue：[#115539 feat(web): GFM table rendering in dashboard session view](https://github.com/NousResearch/hermes-agent/issues/115539)  
- 状态：OPEN  
- 类型：Feature  
- 诉求：  
  TUI 已能渲染 Markdown 表格，但 web dashboard 仍显示为 pipe 文本。  
- 路线图信号：  
  用户希望 web dashboard 与 TUI 在输出呈现能力上保持一致。该需求清晰、范围可控，适合进入下一轮 dashboard polish。

### 6.2 External context engines 接收 `max_tokens`  
- Issue：[#115517](https://github.com/NousResearch/hermes-agent/issues/115517)  
- 状态：OPEN  
- 类型：Feature  
- 组件：Agent、Plugins、Compression  
- 诉求：  
  第三方 context engine 希望在 `update_model()` 中拿到 `max_tokens`，并可选接收 compaction event。  
- 路线图信号：  
  Hermes 的 context engine 插件生态正在成形，外部引擎作者需要更完整的模型上下文预算信息。

### 6.3 Windows 系统托盘：关闭窗口时隐藏到托盘  
- Issue：[#115604](https://github.com/NousResearch/hermes-agent/issues/115604)  
- 状态：OPEN  
- 类型：Feature  
- 组件：Desktop、Windows  
- 诉求：  
  用户希望 Hermes 能作为后台 agent 常驻，而不是点击窗口关闭后直接退出。  
- 路线图信号：  
  个人 AI 助手正在向“后台长期运行服务”形态演进，系统托盘、后台驻留、启动项管理会变得重要。

### 6.4 `hermes auth rename` 支持重命名凭据 label  
- Issue：[#115558](https://github.com/NousResearch/hermes-agent/issues/115558)  
- 状态：OPEN  
- 类型：Feature  
- 组件：CLI、Auth  
- 诉求：  
  当前 `hermes auth` 支持 add/list/remove/reset/priority 等，但无法重命名已有 pooled credential 的 label。  
- 相关 PR：  
  [#115622](https://github.com/NousResearch/hermes-agent/pull/115622) 正在增强 Desktop 凭据列表搜索和过滤。  
- 路线图信号：  
  凭据管理正在从基础功能转向可维护性和规模化管理。

### 6.5 可配置 blocking-capable hook events  
- Issue：[#115554](https://github.com/NousResearch/hermes-agent/issues/115554)  
- 状态：OPEN  
- 类型：Feature  
- 组件：Agent、Plugins、Config  
- 诉求：  
  用户希望 `pre_llm_call` 等 hook 能像 `pre_tool_call` 一样阻断流程，用于 prompt injection / jailbreak 检测。  
- 路线图信号：  
  企业化和安全场景开始要求 message-plane policy enforcement。该需求与插件安全、agent guardrail 方向高度相关。

### 6.6 Plugin Catalog 新增 `hermes-peer`  
- PR：[#115601 feat(plugin-catalog): add hermes-peer plugin](https://github.com/NousResearch/hermes-agent/pull/115601)  
- 状态：OPEN  
- 类型：Feature  
- 诉求：  
  同机 Hermes session 之间的 peer messaging。  
- 路线图信号：  
  Hermes 插件生态正在从工具扩展走向多 agent / 多 session 协作。

---

## 7. 用户反馈摘要

### 7.1 用户正在把 Hermes 当作长期运行的个人 agent  
Windows 托盘需求 [#115604](https://github.com/NousResearch/hermes-agent/issues/115604)、后台 subagent 停止控制 [#115616](https://github.com/NousResearch/hermes-agent/pull/115616)、phantom subagent running [#115556](https://github.com/NousResearch/hermes-agent/issues/115556) 都说明用户希望 Hermes 能稳定后台运行，并且后台任务状态必须可信。

### 7.2 文件与附件工作流已经进入真实使用场景  
附件预览问题 [#115609](https://github.com/NousResearch/hermes-agent/issues/115609) 以及相关 PR [#115621](https://github.com/NousResearch/hermes-agent/pull/115621)、[#115618](https://github.com/NousResearch/hermes-agent/pull/115618)、[#115617](https://github.com/NousResearch/hermes-agent/pull/115617) 表明，用户正在通过 Hermes 处理 Excel、Word 等办公文件。路径解析、home-relative refs、attachments dir 这些底层细节会直接影响信任感。

### 7.3 多 profile、多平台、多消息通道是当前复杂度来源  
WhatsApp profile bridge 问题 [#115603](https://github.com/NousResearch/hermes-agent/pull/115603)、Discord 重复发送 [#115611](https://github.com/NousResearch/hermes-agent/pull/115611)、Weixin rate limit ledger [#115608](https://github.com/NousResearch/hermes-agent/pull/115608)、Telegram DSML 泄露 [#115475](https://github.com/NousResearch/hermes-agent/issues/115475) 显示 Hermes 已经不只是本地 CLI/TUI 工具，而是多通道 agent 网关。用户痛点集中在“消息只发一次、失败能重试、内部协议不泄露、profile 不串线”。

### 7.4 移动端和触屏体验仍需补齐  
Android IME 输入问题 [#115505](https://github.com/NousResearch/hermes-agent/issues/115505) 与 Kanban 触屏点击问题 [#115568](https://github.com/NousResearch/hermes-agent/issues/115568) 表明移动端 dashboard 尚不够稳。对于个人 AI 助手而言，移动端入口的重要性会持续上升。

### 7.5 用户对安全边界的关注上升  
环境变量 secret masking [#115620](https://github.com/NousResearch/hermes-agent/pull/115620)、插件沙箱 [#115619](https://github.com/NousResearch/hermes-agent/pull/115619)、blocking hook feature [#115554](https://github.com/NousResearch/hermes-agent/issues/115554) 都指向同一趋势：用户和维护者都在推动 Hermes 从“强大工具”向“可安全扩展的 agent 平台”演进。

---

## 8. 待处理积压与维护者关注点

> 注：当前数据仅覆盖过去 24 小时，无法严格判断“长期未响应”。以下列出今日新出现或仍未见明确修复 PR 的高影响问题，建议维护者优先分流。

### 8.1 P1 会话数据库结构损坏需立即分诊  
- Issue：[#115571](https://github.com/NousResearch/hermes-agent/issues/115571)  
- 建议：  
  - 确认是否为 SQLite 写入并发、WAL、迁移或索引维护问题。  
  - 提供 read-only diagnosis、repair / export 工具。  
  - 明确 v0.21.0 是否存在数据损坏风险。

### 8.2 Telegram DSML 泄露暂无明确 fix PR  
- Issue：[#115475](https://github.com/NousResearch/hermes-agent/issues/115475)  
- 建议：  
  - 优先检查 gateway API 调用中 `stream` 与工具调用执行路径。  
  - 添加 Telegram adapter 回归测试，确保 DSML 不进入用户可见消息。

### 8.3 TUI compression NameError 属于低成本高影响修复  
- Issue：[#115572](https://github.com/NousResearch/hermes-agent/issues/115572)  
- 建议：  
  - 快速补 import / helper 定义。  
  - 添加所有 compressor 的 live config apply smoke test。

### 8.4 大型 state.db 启动 watchdog 问题可能影响生产用户  
- Issue：[#115542](https://github.com/NousResearch/hermes-agent/issues/115542)  
- 建议：  
  - quick_check 期间续租 progress lease。  
  - 对超大 state.db 提供分阶段检查或后台检查策略。

### 8.5 `/undo`、`/retry` 在异常 turn 后失效影响恢复体验  
- Issue：[#115493](https://github.com/NousResearch/hermes-agent/issues/115493)  
- 建议：  
  - 明确 unanswered user row 的持久化语义。  
  - 将 alternation repair 与 rewind 持久化解耦，避免一个失败 turn 污染后续整段会话。

### 8.6 Windows 会话锁与更新流程需集中处理  
- Issues：  
  - [#115578 Windows active-session registry lock starvation](https://github.com/NousResearch/hermes-agent/issues/115578)  
  - [#115563 Windows update aborts on relaunch-verification failure](https://github.com/NousResearch/hermes-agent/issues/115563)  
- PR：  
  - [#115615](https://github.com/NousResearch/hermes-agent/pull/115615)  
- 建议：  
  Windows 相关问题今日密集出现，建议建立平台专项回归测试矩阵，覆盖 update、session registry、Desktop preview、background process 等路径。

---

## 综合健康度评估

Hermes Agent 今日表现为“高活跃、高反馈、高修复压力”的状态。项目社区参与度和维护响应都很强，尤其是 Desktop、Gateway、插件安全、消息平台适配方面的 PR 非常密集。  
但从 Issues 看，当前稳定性风险也较高：P1/P2 问题覆盖会话数据库、消息投递、会话恢复、更新流程、Windows/macOS 平台行为和大型状态库启动。建议下一阶段优先压缩 P1/P2 稳定性积压，再推进插件生态和 Desktop 体验增强，以避免功能扩张超过核心可靠性承载能力。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报  
日期：2026-09-19  
仓库：github.com/qwibitai/nanoclaw  
数据窗口：过去 24 小时

---

## 1. 今日速览

过去 24 小时内，NanoClaw 有 **3 条 Issue 更新**、**3 条 PR 更新**，但 **无 Issue 关闭、无 PR 合并、无新版本发布**。整体活跃度处于 **中等偏活跃**：社区持续提交问题与修复方案，但维护侧尚未完成合并或关闭动作。今日关注点集中在 **CLI 配置一致性、生成文件可编辑性提示、Codex Responses 传输稳定性、Slack direct-mode provisioning 可靠性**。从健康度看，项目仍有较强的外部反馈与贡献输入，但需要维护者尽快 triage 与合并关键修复，以避免用户体验问题积累。

---

## 2. 项目进展

今日没有已合并或已关闭的 PR，因此主干代码层面暂无明确推进。

当前有 3 个待合并 PR，均与实际运行稳定性或集成可靠性相关：

### 待合并 PR

- [PR #3852 fix(slack): rotate the manager token before direct-mode provisioning](https://github.com/nanocoai/nanoclaw/pull/3852)  
  作者：samueldg  
  状态：OPEN  
  标签：`area/skills`  
  该 PR 试图修复 Slack direct-mode provisioning 中 app configuration token 过期的问题。Slack app configuration token 生成后 12 小时过期，而当前 NanoClaw 内部没有调用 `tooling.tokens.rotate` 进行续期，也未读取 refresh token，导致 direct-mode provisioning 可能失败。

- [PR #3851 fix(codex): make Responses transport configurable](https://github.com/nanocoai/nanoclaw/pull/3851)  
  作者：ionescu77  
  状态：OPEN  
  标签：`area/agent-runner`, `area/configuration`, `area/providers`  
  该 PR 针对代理环境下 WebSocket 传输不稳定的问题，提出让 Codex Responses transport 可配置。它与历史问题 [Issue #3338](https://github.com/nanocoai/nanoclaw/issues/3338) 相关，也参考了此前类似改动 [PR #2672](https://github.com/nanocoai/nanoclaw/pull/2672)。

- [PR #3850 Fix/codex http sse transport](https://github.com/nanocoai/nanoclaw/pull/3850)  
  作者：ionescu77  
  状态：OPEN  
  标签：`area/agent-runner`, `area/channels`, `area/configuration`, `area/containers`, `area/providers`, `area/repository-maintenance`, `area/setup-installation`, `area/skills`  
  该 PR 同样围绕 Codex HTTP/SSE transport，覆盖面较广，可能与 #3851 存在目标重叠或实现路径差异。建议维护者尽快判断二者是否应合并、拆分或关闭其一，避免重复工作。

---

## 3. 社区热点

今日所有新 Issue 的评论数均为 0，PR 也未显示有效评论数据，因此暂未形成高互动讨论。不过从主题分布看，以下议题具有较高维护优先级：

### 1. Codex Responses transport 在代理环境下的稳定性

- [PR #3851](https://github.com/nanocoai/nanoclaw/pull/3851)  
- [PR #3850](https://github.com/nanocoai/nanoclaw/pull/3850)  

这两个 PR 均指向 Codex transport 的可靠性问题，尤其是 WebSocket 在代理网络下的不稳定。背后的用户诉求是：  
- 在企业网络、代理、防火墙环境中稳定运行 NanoClaw  
- 支持 HTTP/SSE 等更兼容的传输方式  
- 通过配置项切换 transport，而不是硬编码某种传输协议

这是一个明显的部署可用性问题，对企业用户、远程开发环境和受限网络用户影响较大。

### 2. Slack direct-mode provisioning 失败

- [PR #3852](https://github.com/nanocoai/nanoclaw/pull/3852)  

Slack token 过期导致 provisioning 失败，属于集成可靠性问题。其核心诉求是：  
- 自动处理短生命周期 token  
- 避免用户在 direct-mode provisioning 中遇到不可恢复的认证失败  
- 让 Slack skill 的初始化流程更稳定

### 3. CLI 文档与实际能力不一致

- [Issue #3853](https://github.com/nanocoai/nanoclaw/issues/3853)  

用户指出 `CLAUDE.md` 中的 `Admin CLI (ncl)` 表格落后于 `ncl help`，缺失 `policies`、`messaging-groups send`、`sessions history` 等命令。该问题虽然是文档类，但会直接影响用户发现和正确使用 CLI 能力。

---

## 4. Bug 与稳定性

按影响程度排序如下：

### 高优先级：Codex Responses transport 在代理环境下不稳定

- [PR #3851 fix(codex): make Responses transport configurable](https://github.com/nanocoai/nanoclaw/pull/3851)  
- [PR #3850 Fix/codex http sse transport](https://github.com/nanocoai/nanoclaw/pull/3850)  
- 相关历史 Issue：[Issue #3338](https://github.com/nanocoai/nanoclaw/issues/3338)

影响：  
在代理、防火墙或企业网络环境中，WebSocket transport 可能导致 Codex Responses traffic 不稳定或失败。这会直接影响 agent-runner 与 provider 通信能力，属于运行时可靠性问题。

是否已有 fix PR：  
已有两个相关 PR，但均未合并。需要维护者评估 #3850 与 #3851 的关系，避免重复或冲突。

---

### 高优先级：Slack direct-mode provisioning 因 token 过期失败

- [PR #3852 fix(slack): rotate the manager token before direct-mode provisioning](https://github.com/nanocoai/nanoclaw/pull/3852)

影响：  
Slack app configuration token 12 小时后过期，而当前系统未进行 token rotate，也没有读取 refresh token。用户在配置 Slack direct mode 时可能遇到 provisioning 失败。

是否已有 fix PR：  
已有 [PR #3852](https://github.com/nanocoai/nanoclaw/pull/3852)，待 review 与合并。

---

### 中优先级：`groups config update --model` 接受任意字符串且无校验

- [Issue #3855](https://github.com/nanocoai/nanoclaw/issues/3855)  
  作者：bmultini  
  状态：OPEN  
  标签：`kind/bug`, `triage/unresolved`

问题摘要：  
在 NanoClaw 2.3.0、Linux 环境下，命令：

```bash
ncl groups config update --id <group-id> --model <anything>
```

会原样保存任意字符串，即使模型名不存在也无校验、无警告，并返回 exit code 0。

影响：  
- 用户可能误配置不存在的模型  
- 错误直到后续运行时才暴露  
- 缺少可发现的合法 model 列表，降低 CLI 可用性

是否已有 fix PR：  
暂无对应 PR。

建议：  
- 增加模型名校验  
- 提供 `ncl models list` 或类似发现机制  
- 对未知模型返回非 0 exit code 或至少给出 warning  
- 如果允许自定义 provider/model，应明确区分“已知模型”和“自定义模型”

---

### 中优先级：编辑 `groups/<folder>/CLAUDE.md` 会在 spawn 时被静默丢弃

- [Issue #3854](https://github.com/nanocoai/nanoclaw/issues/3854)  
  作者：bmultini  
  状态：OPEN  
  标签：`kind/bug`, `triage/unresolved`

问题摘要：  
`groups/<folder>/CLAUDE.md` 是生成文件，首行提示：

```html
<!-- Composed at spawn - do not edit. Standing instructions: instructions.prepend.md. Memory: memory/. -->
```

但用户编辑该文件后，spawn 时修改会被丢弃，而 `groups restart` 没有任何提示。

影响：  
- 用户以为修改已经生效，但实际上被覆盖  
- 对 group instructions / memory 的心智模型不清晰  
- 容易造成调试困难

是否已有 fix PR：  
暂无对应 PR。

建议：  
- 在 `groups restart` 或 spawn 过程中检测本地修改并警告  
- 将生成文件标记得更明显  
- 文档中明确推荐编辑 `instructions.prepend.md` 或 memory 目录  
- 可考虑在生成文件旁添加 README 或 `.generated` 标记

---

## 5. 功能请求与路线图信号

今日没有明确以 feature request 形式提交的新需求，但多个 Issue/PR 暗含路线图信号：

### 1. CLI 配置应具备更强的 schema 校验与发现能力

- [Issue #3855](https://github.com/nanocoai/nanoclaw/issues/3855)

该问题反映出用户希望 `ncl` 不只是“写配置”，还应提供：  
- 合法值校验  
- 可用 model 列表发现  
- 配置错误的即时反馈  
- 更严格的 exit code 语义

这可能演化为后续版本中的 CLI validation / introspection 能力。

---

### 2. 生成文件与用户可编辑文件需要更清晰的边界

- [Issue #3854](https://github.com/nanocoai/nanoclaw/issues/3854)

用户反馈显示，NanoClaw 的 group 文件结构需要更强的可解释性。潜在路线图方向包括：  
- 生成文件变更检测  
- 用户编辑入口统一化  
- restart/spawn 时的配置变更提示  
- 更清晰的 group lifecycle 文档

---

### 3. Transport 可配置性正在成为稳定性重点

- [PR #3851](https://github.com/nanocoai/nanoclaw/pull/3851)  
- [PR #3850](https://github.com/nanocoai/nanoclaw/pull/3850)

从两个相近 PR 看，Codex Responses transport 的可配置化很可能进入下一版本候选内容。该方向对企业网络和代理环境尤其重要。

---

### 4. Slack provisioning 需要自动 token 生命周期管理

- [PR #3852](https://github.com/nanocoai/nanoclaw/pull/3852)

Slack app configuration token 过期处理是集成类功能成熟度的重要信号。如果合并，该修复可能显著提升 Slack skill 的开箱可用性。

---

## 6. 用户反馈摘要

今日 Issue 评论数均为 0，因此主要从 Issue/PR 描述中提炼用户痛点。

### 用户痛点 1：CLI 接受无效配置但不提示

相关链接：  
- [Issue #3855](https://github.com/nanocoai/nanoclaw/issues/3855)

用户不满点：  
- `--model` 可传入任意字符串  
- 没有校验、没有 warning  
- exit code 仍为 0  
- 用户不知道合法 model 列表在哪里查看

使用场景：  
用户通过 CLI 修改 group 配置，希望选择模型，但缺少发现与验证机制。

---

### 用户痛点 2：生成文件可被编辑，但修改会被静默覆盖

相关链接：  
- [Issue #3854](https://github.com/nanocoai/nanoclaw/issues/3854)

用户不满点：  
- `CLAUDE.md` 虽提示为生成文件，但仍容易被用户误编辑  
- 修改在 spawn/restart 后丢失  
- 系统没有明显提示，导致用户误判配置生效状态

使用场景：  
用户尝试修改 group 行为或 instructions，却修改到了生成产物。

---

### 用户痛点 3：文档落后于实际 CLI 能力

相关链接：  
- [Issue #3853](https://github.com/nanocoai/nanoclaw/issues/3853)

用户不满点：  
- `CLAUDE.md` 中的 Admin CLI 表格与 `ncl help` 不一致  
- 缺失 `policies`、`messaging-groups send`、`sessions history`  
- 用户难以发现已有能力

使用场景：  
用户阅读仓库根目录文档，希望了解 `ncl` 可用命令，但文档信息不完整。

---

### 用户痛点 4：代理环境下 WebSocket transport 不可靠

相关链接：  
- [PR #3851](https://github.com/nanocoai/nanoclaw/pull/3851)  
- [PR #3850](https://github.com/nanocoai/nanoclaw/pull/3850)

用户不满点：  
- WebSocket 在代理环境中不稳定  
- 缺少可配置 transport 选项  
- 网络环境限制会影响 agent/provider 通信

使用场景：  
企业网络、代理服务器、受限开发环境中运行 NanoClaw。

---

## 7. 待处理积压

基于今日提供的数据，未发现“长期未响应”的历史 Issue 或 PR 条目。不过有以下短期待处理项值得维护者优先关注：

### 需要尽快 triage 的新 Issue

- [Issue #3855：`groups config update --model` 缺少校验](https://github.com/nanocoai/nanoclaw/issues/3855)  
  建议优先级：中高  
  原因：会导致错误配置被静默写入，影响后续运行稳定性。

- [Issue #3854：`groups/<folder>/CLAUDE.md` 编辑被静默丢弃](https://github.com/nanocoai/nanoclaw/issues/3854)  
  建议优先级：中  
  原因：属于用户体验与配置可预期性问题，容易造成困惑。

- [Issue #3853：`CLAUDE.md` Admin CLI 文档缺失命令](https://github.com/nanocoai/nanoclaw/issues/3853)  
  建议优先级：中  
  原因：文档与实际 CLI 不一致，影响功能发现。

### 需要维护者决策的开放 PR

- [PR #3851：Codex Responses transport 可配置](https://github.com/nanocoai/nanoclaw/pull/3851)  
- [PR #3850：Codex HTTP/SSE transport 修复](https://github.com/nanocoai/nanoclaw/pull/3850)  

建议：  
优先判断两个 PR 是否重复、互补或冲突。若都解决 Codex transport 可靠性问题，应明确一个主方案，避免贡献者重复推进。

- [PR #3852：Slack manager token rotate](https://github.com/nanocoai/nanoclaw/pull/3852)  

建议：  
尽快 review。该问题有明确失败路径和清晰修复方向，适合作为小范围稳定性修复进入下一版本。

---

## 总体健康度评估

NanoClaw 今日社区输入较活跃，但维护输出暂时不足。新增问题集中在 **CLI 可用性、文档一致性、网络传输稳定性、第三方集成可靠性**，都属于影响真实用户体验的方向。短期内，建议维护者优先处理 Codex transport 与 Slack token 两类运行时可靠性 PR，同时对新开的 CLI/文档问题进行快速 triage。整体看，项目仍保持健康的外部反馈流入，但需要提升合并与问题关闭节奏，以维持用户信心。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报  
日期：2026-09-19  
项目：nearai/ironclaw  
数据窗口：过去 24 小时

---

## 1. 今日速览

过去 24 小时内，IronClaw 项目整体活跃度较低：无 Issue 更新、无版本发布，仅有 1 个新的开放 PR。今日唯一活跃项集中在 **扩展集成稳定性修复**，主要针对 Gmail / Google Calendar 在特定 OAuth 配置路径下激活失败的问题。该 PR 尚未合并，但指向的是实际部署中的阻断性问题，具备较高维护优先级。整体来看，项目今日没有大规模功能推进，但在第三方服务集成可靠性方面有明确修复动作。

---

## 2. 版本发布

过去 24 小时内无新版本发布。

---

## 3. 项目进展

过去 24 小时内没有 PR 被合并或关闭，因此主分支暂无可确认的新功能或修复落地。

### 待合并 PR

#### [PR #8102: fix(extensions): resolve provider-instance readiness live, administrator configuration first](https://github.com/nearai/ironclaw/pull/8102)

- 状态：OPEN
- 作者：henrypark133
- 创建时间：2026-09-18
- 更新时间：2026-09-18
- 评论数：未提供
- 👍：0

该 PR 主要修复 Gmail / Google Calendar 扩展在特定部署配置下无法激活的问题。根据摘要描述，当部署方通过 **Web UI 管理员配置** 设置 Google OAuth client，而不是通过环境变量配置时，OAuth 流程本身可以完成，包括用户授权、code 返回和 token exchange，但最终扩展激活会失败。

该修复说明项目正在加强扩展 provider 实例的 readiness 判断逻辑，并优先处理管理员配置路径。这对依赖 Web UI 进行部署和配置的用户尤其重要，可能直接影响 Google 生态扩展的可用性。

项目推进评估：  
今日没有已合并代码，因此正式进展有限；但该 PR 针对真实激活失败场景，若合并，将提升扩展系统在多配置来源下的稳定性。

---

## 4. 社区热点

今日没有 Issue 讨论，也没有多个活跃 PR 可形成明显社区热点。唯一值得关注的是以下 PR：

### [PR #8102: Gmail / Google Calendar provider readiness 修复](https://github.com/nearai/ironclaw/pull/8102)

该 PR 反映出一个较明确的部署使用痛点：  
- 管理员通过 Web UI 配置 Google OAuth client 是合理且常见的部署方式；
- 当前系统可能更偏向环境变量配置路径；
- OAuth 成功后仍激活失败，说明问题不在 OAuth 认证本身，而在后续 provider instance readiness 或配置解析阶段。

背后的用户诉求是：  
项目需要在不同部署配置方式之间保持一致行为，尤其是 Web UI 管理配置与环境变量配置不应导致扩展激活结果不一致。

---

## 5. Bug 与稳定性

### 高优先级

#### Gmail / Google Calendar 扩展 OAuth 完成后激活失败  
- 相关 PR：[PR #8102](https://github.com/nearai/ironclaw/pull/8102)
- 严重程度：高
- 状态：已有 fix PR，尚未合并
- 影响范围：使用 Web UI 管理员配置 Google OAuth client 的部署环境
- 涉及模块：extensions、provider instance readiness、Google OAuth 配置路径

问题表现：  
在部分部署中，Google OAuth 完整流程可以成功完成，包括授权、授权码返回和 token 交换，但 Gmail / Google Calendar 扩展最终无法激活。

影响分析：  
这类问题会直接阻断用户使用 Google 服务集成能力，属于功能不可用级别的问题。由于 Gmail 和 Google Calendar 通常是个人 AI 助手场景中的核心集成能力，该问题对实际可用性影响较大。

修复方向：  
PR 标题和摘要显示，修复重点是让 provider instance readiness 以实时状态解析，并优先处理管理员配置，从而确保 Web UI 配置路径下的 provider 能正确进入可激活状态。

---

## 6. 功能请求与路线图信号

过去 24 小时内没有新的 Issue，因此没有明确的新功能请求。

不过，从 [PR #8102](https://github.com/nearai/ironclaw/pull/8102) 可以观察到一个潜在路线图信号：

### 配置管理与扩展可用性正在成为重点

该 PR 不是新增功能，而是修复配置路径导致的扩展不可用问题。它暗示 IronClaw 的扩展系统可能正在向更成熟的部署模型演进，尤其是：

- 支持管理员通过 Web UI 管理 OAuth client；
- 减少对环境变量配置的单一路径依赖；
- 提高 provider readiness 判断的动态性；
- 改善第三方集成在多租户或托管部署环境中的可靠性。

如果该方向持续推进，后续版本可能会继续强化 Web UI 管理配置、OAuth provider 管理、扩展激活诊断等能力。

---

## 7. 用户反馈摘要

过去 24 小时内无 Issue 评论数据，无法从用户讨论中提炼新的直接反馈。

从今日唯一 PR 的摘要可间接推断出以下用户痛点：

- 用户或部署管理员希望通过 Web UI 完成 Google OAuth client 配置，而不是依赖环境变量；
- OAuth 成功但最终激活失败会造成较强困惑，因为表面上认证流程已经完成；
- Gmail / Google Calendar 这类核心个人助理集成一旦不可用，会明显影响产品体验；
- 当前系统在配置来源一致性和错误可诊断性方面可能仍有改进空间。

---

## 8. 待处理积压

根据本次提供的数据，过去 24 小时内没有长期未响应的 Issue 或 PR 信息可供判断。

当前需要维护者优先关注的待处理项是：

### [PR #8102](https://github.com/nearai/ironclaw/pull/8102)

建议维护者尽快 review，重点确认：

- Web UI 管理员配置是否优先于或正确合并于环境变量配置；
- provider instance readiness 是否在 OAuth token exchange 后实时刷新；
- Gmail 与 Google Calendar 是否均覆盖测试；
- 修复是否影响使用环境变量配置 OAuth client 的既有部署；
- 是否需要补充回归测试，避免后续 provider 配置路径再次出现不一致。

---

## 项目健康度评估

今日 IronClaw 活跃度偏低，但维护方向明确。没有新增 Issue 和版本发布，说明社区侧反馈量较少；同时唯一新增 PR 直接针对 Google 扩展激活失败，属于对实际部署稳定性的修复。短期内项目健康度取决于该 PR 的 review 与合并速度。如果该修复及时合入，将有助于提升 IronClaw 在个人 AI 助手核心集成场景中的可靠性。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报｜2026-09-19

## 1. 今日速览

过去 24 小时，LobsterAI 仓库 **Issue 无新增或更新**，但 Pull Request 非常活跃，共有 **19 条 PR 更新**，其中 **13 条仍处于 Open 状态，6 条已关闭**。  
今日工作重点明显集中在 **OpenClaw 启动恢复、Windows 升级兼容、网关生命周期、MCP 配置同步、Skills 市场体验、Cowork 模型路由** 等方向。  
从数据看，项目处于 **高开发活跃度、低社区讨论度** 状态：维护与功能迭代密集，但缺少 Issue 侧的公开反馈与讨论沉淀。  
整体健康度偏积极，尤其是稳定性修复覆盖面较广，不过当前仍有较多关键修复 PR 待合并，建议维护者优先完成回归验证与 release 分支收敛。

---

## 2. 版本发布

过去 24 小时 **无新版本 Release**。

不过今日出现了一个与发布流程相关的 PR：

- [PR #2715 Release/2026.9.18](https://github.com/netease-youdao/LobsterAI/pull/2715)  
  状态：Closed  
  涉及范围：`renderer`、`docs`、`main`、`openclaw`、`cowork`、`im`、`artifacts`

该 PR 表明项目近期可能围绕 `2026.9.18` 版本进行发布整理或回滚/关闭处理，但当前数据中未看到正式 Release 产物。

---

## 3. 项目进展

今日共有 6 条 PR 进入 Closed 状态，主要涉及 OpenClaw、IM 登录通道、定时任务、子 Agent 可见性和发布流程。

### 3.1 OpenClaw 启动恢复与工作区修复

- [PR #2701 fix(openclaw): harden startup recovery and Feishu secret routing](https://github.com/netease-youdao/LobsterAI/pull/2701)  
  作者：btc69m979y-dotcom  
  状态：Closed  
  涉及：`docs`、`main`、`openclaw`

该 PR 针对 9.18 排查中可复现的问题进行修复，重点包括：

- Windows 网关生命周期增强；
- Electron 主进程异常退出或 IPC 断开后的子进程处理；
- 启动期间暂存关闭请求；
- 限制失去父进程的子进程存活时间；
- 保持已有 owner 保护逻辑，避免误杀外部进程；
- 修复升级启动兼容问题；
- 修复飞书凭据路由错位。

这类修复对桌面端稳定性非常关键，尤其是 OpenClaw 作为底层执行/网关组件时，其启动失败会直接影响用户主流程。

- [PR #2702 fix: openclaw workspace setup recovery](https://github.com/netease-youdao/LobsterAI/pull/2702)  
  作者：fisherdaddy  
  状态：Closed  
  涉及：`renderer`、`docs`、`main`、`openclaw`、`im`

该 PR 标题显示聚焦 OpenClaw workspace 初始化/恢复流程。虽然摘要为空，但从标签看，影响范围横跨渲染层、主进程、IM 与文档，说明它可能是面向工作区设置失败后的恢复能力补强。

### 3.2 IM 登录与投递回执

- [PR #2718 fix: weixin qq qr login channel routing](https://github.com/netease-youdao/LobsterAI/pull/2718)  
  作者：fisherdaddy  
  状态：Closed  
  涉及：`renderer`、`docs`、`main`、`openclaw`、`im`

该 PR 修复微信、QQ 二维码登录通道路由问题。  
这类问题通常会影响用户接入 IM 渠道的首要路径，属于高感知度修复。

- [PR #2717 feat: scheduled task weixin delivery receipt](https://github.com/netease-youdao/LobsterAI/pull/2717)  
  作者：fisherdaddy  
  状态：Closed  
  涉及：`renderer`、`main`、`openclaw`

该 PR 增加定时任务场景下的微信投递回执能力。  
这说明 LobsterAI 正在增强 IM/自动化任务链路的可靠性，使系统不只是“发送任务”，还能够跟踪消息投递状态。

### 3.3 Cowork 与子 Agent 可见性

- [PR #2703 feat: subagent session visibility](https://github.com/netease-youdao/LobsterAI/pull/2703)  
  作者：fisherdaddy  
  状态：Closed  
  涉及：`renderer`、`docs`、`main`、`cowork`、`artifacts`

该 PR 关注子 Agent 会话可见性。  
这与多 Agent 协作、Cowork 场景中的透明度相关，有助于用户理解复杂任务中不同子 Agent 的执行轨迹。

### 3.4 发布流程推进

- [PR #2715 Release/2026.9.18](https://github.com/netease-youdao/LobsterAI/pull/2715)  
  作者：liuzhq1986  
  状态：Closed  
  涉及：`renderer`、`docs`、`main`、`openclaw`、`cowork`、`im`、`artifacts`

该 PR 涉及多个核心模块，可能是一次发布分支整理。由于当前无 Release 记录，建议后续关注是否会产生正式版本标签或安装包。

---

## 4. 社区热点

今日没有 Issue 更新，也没有 PR 评论数、反应数等有效互动数据；所有 PR 的点赞数均为 0，评论字段为 `undefined`。因此，严格从“评论最多/反应最多”角度看，今日没有明显社区讨论热点。

但从 PR 影响范围和问题严重程度看，以下方向值得关注：

### 4.1 OpenClaw 启动与升级恢复

相关 PR：

- [PR #2719 fix(openclaw): repair leftovers from older builds at startup instead of failing every launch](https://github.com/netease-youdao/LobsterAI/pull/2719)
- [PR #2709 fix(openclaw): fall back when Windows private SQLite staging dirs fail](https://github.com/netease-youdao/LobsterAI/pull/2709)
- [PR #2708 fix(openclaw): let callers apply a pending deferred gateway restart](https://github.com/netease-youdao/LobsterAI/pull/2708)
- [PR #2707 fix(openclaw): only refill gateway restart budget after a stability window](https://github.com/netease-youdao/LobsterAI/pull/2707)
- [PR #2701 fix(openclaw): harden startup recovery and Feishu secret routing](https://github.com/netease-youdao/LobsterAI/pull/2701)

背后诉求：  
用户希望升级、重装、配置变更后应用能够自动恢复，而不是反复启动失败或要求用户手工清理数据目录。OpenClaw 网关的稳定性正在成为项目近期最核心的工程关注点。

### 4.2 Skills 生态体验

相关 PR：

- [PR #2713 feat(skills): show result counts on marketplace tag pills](https://github.com/netease-youdao/LobsterAI/pull/2713)
- [PR #2712 feat(skills): ask before replacing an installed skill on re-import](https://github.com/netease-youdao/LobsterAI/pull/2712)
- [PR #2711 fix(skills): keep skill version when SKILL.md frontmatter is invalid YAML](https://github.com/netease-youdao/LobsterAI/pull/2711)

背后诉求：  
用户在 Skills 市场中需要更明确的分类数量、搜索反馈和版本管理能力。第三方 Skill 的 `SKILL.md` 质量参差不齐，因此平台需要更强的容错能力。

### 4.3 Cowork 模型模式

相关 PR：

- [PR #2716 feat(cowork): add Auto and Max model modes](https://github.com/netease-youdao/LobsterAI/pull/2716)

背后诉求：  
用户希望在 Cowork 会话中减少模型选择成本，同时也希望在关键任务中可以固定使用“最强模型”。这体现出产品正在向更智能的模型路由与用户可控性平衡演进。

---

## 5. Bug 与稳定性

以下按潜在严重程度排序。

### P0 / P1：启动失败、升级失败、网关不可用

#### 5.1 旧版本残留导致每次启动失败

- [PR #2719 fix(openclaw): repair leftovers from older builds at startup instead of failing every launch](https://github.com/netease-youdao/LobsterAI/pull/2719)  
  状态：Open  
  作者：alison-xx

问题描述：  
从旧版本升级，或 Windows 卸载后重装但保留 `%APPDATA%\LobsterAI` 时，旧构建残留可能导致每次启动失败。

修复方向：  
PR 计划在启动阶段自动修复旧构建遗留问题，而不是要求用户手动清理数据目录。

当前状态：已有 fix PR，待合并。

#### 5.2 Windows 私有 SQLite staging 目录创建失败

- [PR #2709 fix(openclaw): fall back when Windows private SQLite staging dirs fail](https://github.com/netease-youdao/LobsterAI/pull/2709)  
  状态：Open  
  作者：alison-xx

问题描述：  
OpenClaw v2026.8.1 在 Windows 上通过 PowerShell + `Add-Type` 创建受保护 ACL 的私有 SQLite staging 目录。若安全软件阻止 `powershell.exe`、Constrained Language Mode 拒绝 `Add-Type`，或缺少 C# 编译器，流程会失败。

修复方向：  
增加 fallback 路径，避免因为安全环境差异导致启动或数据 staging 失败。

当前状态：已有 fix PR，待合并。

#### 5.3 网关延迟重启状态阻塞新会话

- [PR #2708 fix(openclaw): let callers apply a pending deferred gateway restart](https://github.com/netease-youdao/LobsterAI/pull/2708)  
  状态：Open  
  作者：alison-xx

问题描述：  
配置变化导致网关重启被延迟时，即使网关已经空闲，新会话仍可能被拒绝，并提示“please try again later”。

修复方向：  
允许调用方在合适时机应用 pending deferred restart。

当前状态：已有 fix PR，待合并。

#### 5.4 网关崩溃后无限重启

- [PR #2707 fix(openclaw): only refill gateway restart budget after a stability window](https://github.com/netease-youdao/LobsterAI/pull/2707)  
  状态：Open  
  作者：alison-xx

问题描述：  
网关刚进入 healthy 状态后又迅速崩溃，自动重启计数被过早重置，导致无限重启。

修复方向：  
只有经过稳定窗口后才重置重启预算。

当前状态：已有 fix PR，待合并。

---

### P1：付费媒体生成误触发

#### 5.5 用户未明确请求时可能触发付费图片/视频生成

- [PR #2714 fix(media): check user intent before generating paid images and videos](https://github.com/netease-youdao/LobsterAI/pull/2714)  
  状态：Open  
  作者：alison-xx

问题描述：  
媒体模型选择状态会跨消息保持，而媒体生成回调只检查是否选择了模型。这样聊天模型可能在用户没有明确要求时触发付费图片或视频生成。

影响：  
涉及费用、用户信任和误操作风险，优先级较高。

修复方向：  
在生成付费媒体前检查用户意图。

当前状态：已有 fix PR，待合并。

---

### P1 / P2：数据迁移、安装器与本地环境兼容

#### 5.6 数据迁移恢复时 Chromium Partitions 被占用

- [PR #2705 fix(data-migration): skip Chromium Partitions in backup and restore](https://github.com/netease-youdao/LobsterAI/pull/2705)  
  状态：Open  
  作者：alison-xx

问题描述：  
在运行中的应用内恢复数据迁移备份时，清理旧数据步骤可能因 `userData/Partitions` 被占用而遇到 `EBUSY` 并回滚。

修复方向：  
备份和恢复时跳过 Chromium persistent partitions。

当前状态：已有 fix PR，待合并。

#### 5.7 Windows 安装器 Skills 备份失败

- [PR #2706 fix(installer): build Skills backup file records as PSCustomObject](https://github.com/netease-youdao/LobsterAI/pull/2706)  
  状态：Open  
  作者：alison-xx

问题描述：  
升级安装时，旧版 Skills 备份 helper 在 Windows PowerShell 5.1 下失败，导致安装器进入 skill-backup-failed 路径。

修复方向：  
将 Skills 备份文件记录构造为 `PSCustomObject`，提升 PowerShell 5.1 兼容性。

当前状态：已有 fix PR，待合并。

#### 5.8 macOS 本地测试路径断言失败

- [PR #2704 test: resolve macOS tmpdir symlinks in path assertions](https://github.com/netease-youdao/LobsterAI/pull/2704)  
  状态：Open  
  作者：alison-xx

问题描述：  
macOS 上 `os.tmpdir()` 返回 `/var/folders/...`，但 `/var` 是 `/private/var` 的 symlink，导致本地测试路径断言失败，而 Linux CI 通过。

修复方向：  
在测试断言中处理真实路径解析差异。

当前状态：已有 test 修复 PR，待合并。

---

### P2：Skills 元数据与 MCP 配置一致性

#### 5.9 无效 YAML frontmatter 导致 Skill 版本丢失

- [PR #2711 fix(skills): keep skill version when SKILL.md frontmatter is invalid YAML](https://github.com/netease-youdao/LobsterAI/pull/2711)  
  状态：Open  
  作者：alison-xx

问题描述：  
第三方 `SKILL.md` 中常见不严格 YAML，例如未加引号的 `description: Use when: ...`，会导致 `js-yaml` 抛错，进而丢弃整个 frontmatter，使 Skill 缺失版本号。

影响：  
Marketplace 会将其与 `0.0.0` 比较，可能错误显示更新状态。

当前状态：已有 fix PR，待合并。

#### 5.10 MCP per-server toolFilter 与并行调用能力未同步给 OpenClaw

- [PR #2710 feat(mcp): pass per-server toolFilter and parallel tool calls to OpenClaw](https://github.com/netease-youdao/LobsterAI/pull/2710)  
  状态：Open  
  作者：alison-xx

问题描述：  
OpenClaw 已支持 per-server MCP 工具筛选和并行工具调用配置，但 LobsterAI 配置同步只写入 command/url/headers，导致用户无法按会话加载所需 MCP 工具集合。

当前状态：已有增强 PR，待合并。

---

## 6. 功能请求与路线图信号

虽然今日没有新的 Issue 型功能请求，但多个 Open PR 暴露出清晰的路线图方向。

### 6.1 Cowork 模型路由将更智能

- [PR #2716 feat(cowork): add Auto and Max model modes](https://github.com/netease-youdao/LobsterAI/pull/2716)  
  状态：Open

该 PR 为 Cowork 增加两种会话级模型模式：

- **Auto**：每轮自动选择合适模型；
- **Max**：使用用户可用模型中最强的模型。

路线图信号：  
LobsterAI 正在从“用户手动选模型”向“系统智能路由 + 用户可覆盖”演进。这对多模型、多任务 Agent 产品非常重要。

### 6.2 Skills 市场体验将继续增强

- [PR #2713 feat(skills): show result counts on marketplace tag pills](https://github.com/netease-youdao/LobsterAI/pull/2713)  
  状态：Open

新增 Marketplace tag pill 数量展示，让用户在搜索与分类浏览时更快判断结果分布。

- [PR #2712 feat(skills): ask before replacing an installed skill on re-import](https://github.com/netease-youdao/LobsterAI/pull/2712)  
  状态：Open

重新导入已安装 Skill 时，不再静默安装为 `<id>-1`、`<id>-2`，而是询问是否替换。

路线图信号：  
Skills 生态正在从“可安装”向“可维护、可升级、可治理”发展。

### 6.3 MCP 工具治理能力增强

- [PR #2710 feat(mcp): pass per-server toolFilter and parallel tool calls to OpenClaw](https://github.com/netease-youdao/LobsterAI/pull/2710)  
  状态：Open

该 PR 表明 MCP 集成将支持更细粒度的工具选择和并行能力声明。  
这对大型工具集、企业内 MCP Server、多 Agent 调用性能优化都有明显价值。

### 6.4 IM 与定时任务能力继续扩展

- [PR #2717 feat: scheduled task weixin delivery receipt](https://github.com/netease-youdao/LobsterAI/pull/2717)  
  状态：Closed

定时任务接入微信投递回执，说明 LobsterAI 可能正在加强消息交付闭环能力，尤其是面向自动提醒、任务通知、企业协作等场景。

---

## 7. 用户反馈摘要

今日没有 Issue 更新，也没有可见评论数据，因此无法从 Issues 评论中提炼直接用户反馈。

不过从 PR 摘要可以间接观察到以下用户痛点：

### 7.1 升级和重装后的稳定性是主要痛点

相关 PR：

- [PR #2719](https://github.com/netease-youdao/LobsterAI/pull/2719)
- [PR #2701](https://github.com/netease-youdao/LobsterAI/pull/2701)
- [PR #2709](https://github.com/netease-youdao/LobsterAI/pull/2709)

痛点：  
用户升级、卸载重装或保留旧数据目录后，不希望应用每次启动失败。桌面 AI 助手类产品需要极强的本地状态兼容与自动修复能力。

### 7.2 Windows 企业/安全环境兼容性压力较大

相关 PR：

- [PR #2709](https://github.com/netease-youdao/LobsterAI/pull/2709)
- [PR #2706](https://github.com/netease-youdao/LobsterAI/pull/2706)

痛点：  
PowerShell 限制、安全软件拦截、Windows PowerShell 5.1 差异等问题会影响安装、升级、SQLite staging 和 Skills 备份。  
这说明 LobsterAI 的用户环境可能包含较多受控 Windows 机器或企业安全策略场景。

### 7.3 用户需要更可控的付费能力触发机制

相关 PR：

- [PR #2714](https://github.com/netease-youdao/LobsterAI/pull/2714)

痛点：  
付费图片/视频生成必须严格基于用户明确意图，不能因为上下文残留或模型回调而误触发。  
这是 AI 助手产品信任建设中的关键细节。

### 7.4 Skills 生态需要减少重复、误判和查找成本

相关 PR：

- [PR #2713](https://github.com/netease-youdao/LobsterAI/pull/2713)
- [PR #2712](https://github.com/netease-youdao/LobsterAI/pull/2712)
- [PR #2711](https://github.com/netease-youdao/LobsterAI/pull/2711)

痛点：  
用户重新导入 Skill 时不希望产生重复副本；第三方 Skill 元数据不规范时也希望系统能尽量容错；浏览市场时需要更清晰的结果数量提示。

---

## 8. 待处理积压

今日没有长期未响应 Issue 数据，也没有历史 PR 年龄信息。以下列出过去 24 小时新增或更新、但仍处于 Open 状态且建议优先关注的 PR。

### 高优先级待处理

1. [PR #2719 fix(openclaw): repair leftovers from older builds at startup instead of failing every launch](https://github.com/netease-youdao/LobsterAI/pull/2719)  
   建议优先级：高  
   原因：直接影响旧版本升级和重装后的启动成功率。

2. [PR #2714 fix(media): check user intent before generating paid images and videos](https://github.com/netease-youdao/LobsterAI/pull/2714)  
   建议优先级：高  
   原因：涉及付费操作误触发和用户信任。

3. [PR #2709 fix(openclaw): fall back when Windows private SQLite staging dirs fail](https://github.com/netease-youdao/LobsterAI/pull/2709)  
   建议优先级：高  
   原因：Windows 安全环境下可能导致 OpenClaw 启动/运行失败。

4. [PR #2707 fix(openclaw): only refill gateway restart budget after a stability window](https://github.com/netease-youdao/LobsterAI/pull/2707)  
   建议优先级：高  
   原因：防止网关无限重启，影响后台稳定性。

5. [PR #2708 fix(openclaw): let callers apply a pending deferred gateway restart](https://github.com/netease-youdao/LobsterAI/pull/2708)  
   建议优先级：高  
   原因：配置变更后可能阻塞新会话。

### 中优先级待处理

6. [PR #2705 fix(data-migration): skip Chromium Partitions in backup and restore](https://github.com/netease-youdao/LobsterAI/pull/2705)  
   原因：影响应用内数据迁移恢复流程。

7. [PR #2706 fix(installer): build Skills backup file records as PSCustomObject](https://github.com/netease-youdao/LobsterAI/pull/2706)  
   原因：影响 Windows 升级安装过程中的 Skills 备份。

8. [PR #2711 fix(skills): keep skill version when SKILL.md frontmatter is invalid YAML](https://github.com/netease-youdao/LobsterAI/pull/2711)  
   原因：影响第三方 Skills 版本识别与市场更新判断。

9. [PR #2712 feat(skills): ask before replacing an installed skill on re-import](https://github.com/netease-youdao/LobsterAI/pull/2712)  
   原因：减少重复 Skill，提高用户升级体验。

10. [PR #2710 feat(mcp): pass per-server toolFilter and parallel tool calls to OpenClaw](https://github.com/netease-youdao/LobsterAI/pull/2710)  
    原因：增强 MCP 工具选择与并行调用能力。

### 功能增强类待处理

11. [PR #2716 feat(cowork): add Auto and Max model modes](https://github.com/netease-youdao/LobsterAI/pull/2716)  
    原因：增强 Cowork 模型路由体验。

12. [PR #2713 feat(skills): show result counts on marketplace tag pills](https://github.com/netease-youdao/LobsterAI/pull/2713)  
    原因：提升 Skills 市场可发现性。

13. [PR #2704 test: resolve macOS tmpdir symlinks in path assertions](https://github.com/netease-youdao/LobsterAI/pull/2704)  
    原因：改善 macOS 本地测试一致性，降低贡献者调试成本。

---

## 总体评估

LobsterAI 今日表现为 **开发活动非常密集，但社区互动数据较少**。  
工程重点集中在 OpenClaw 稳定性、Windows 兼容、数据迁移、Skills 生态治理和 Cowork 模型路由能力。  
如果上述 Open PR 能在短期内完成合并与验证，项目在下一版本中预计会显著提升：

- 启动成功率；
- 升级兼容性；
- Windows 环境适配；
- Skills 市场体验；
- 付费媒体生成安全性；
- 多模型 Cowork 易用性。

建议维护者优先处理 OpenClaw 和付费媒体生成相关 PR，随后推进 Skills 与 Cowork 功能增强进入发布候选。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报（2026-09-19）

项目：[`moltis-org/moltis`](https://github.com/moltis-org/moltis)  
统计窗口：过去 24 小时

---

## 1. 今日速览

过去 24 小时内，Moltis 项目整体活跃度偏低，但出现了 1 个具有实际影响的开放 PR。今日没有新的 Issue、关闭 Issue 或版本发布，说明社区问题反馈相对安静，维护节奏主要集中在代码层面的修复与能力补齐。  
唯一新增 PR 聚焦于 **Groq 作为 OpenAI-compatible Provider 的接入修复**，同时修正了严格 schema 中 `required` 为空时的问题，属于对模型提供商兼容性和工具调用稳定性的改进。  
从健康度看，项目今日没有明显回归或崩溃报告，但也缺少 Issue 讨论数据，因此无法判断更广泛的用户反馈趋势。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日没有已合并或已关闭的 PR。

### 待合并 PR

#### [PR #1276 - Add Groq as OpenAI-compatible provider + fix empty-required strict schemas](https://github.com/moltis-org/moltis/pull/1276)

- 状态：Open
- 作者：Kaboka22
- 创建时间：2026-09-19
- 更新时间：2026-09-19
- 评论数：暂无数据
- 👍 反应：0

该 PR 主要解决 Groq 在当前 Moltis 中无法作为 OpenAI-compatible Provider 正常使用的问题。根据 PR 摘要，Groq 此前未被加入 `OPENAI_COMPAT_PROVIDERS`，导致其请求落入 `genai` fallback 路径，而该路径存在以下限制：

- 仅注册一个模型；
- 丢弃所有 tool schemas；
- 模型 ID 路由异常；
- 可能导致 Groq chat 功能基本不可用。

此外，该 PR 还修复了严格 schema 中 `required` 为空时的处理问题，可能与工具调用、结构化输出或 provider schema 校验有关。

**项目推进意义：**

- 提升 Groq Provider 的一等支持能力；
- 改善 OpenAI-compatible Provider 路由一致性；
- 增强工具 schema 处理的稳定性；
- 对依赖 Groq 低延迟推理或替代 OpenAI API 的用户具有较高实用价值。

目前该 PR 尚未合并，项目整体尚未在主分支层面完成实质推进。

---

## 4. 社区热点

今日没有新增 Issue，也没有高评论或高反应的讨论。

### 今日值得关注的 PR

#### [PR #1276 - Add Groq as OpenAI-compatible provider + fix empty-required strict schemas](https://github.com/moltis-org/moltis/pull/1276)

虽然该 PR 当前没有明显社区互动数据，但其主题反映了一个明确诉求：  
用户或贡献者希望 Moltis 能更完整地支持 OpenAI-compatible Provider，而不是在非 OpenAI 官方提供商上退化到功能受限的 fallback 路径。

背后的潜在需求包括：

- 使用 Groq 等高性能推理服务；
- 保持工具调用 schema 在多 provider 间的一致性；
- 避免因 provider 路由错误导致模型不可用；
- 降低接入第三方模型服务时的配置和调试成本。

---

## 5. Bug 与稳定性

今日没有新增 Bug Issue。

不过，今日开放的 PR 暗示了一个实际稳定性问题：

### 中等严重度：Groq Provider 路由与工具 schema 丢失

- 关联 PR：[PR #1276](https://github.com/moltis-org/moltis/pull/1276)
- 状态：已有修复 PR，尚未合并
- 影响范围：使用 Groq chat 或 Groq 作为 OpenAI-compatible Provider 的用户
- 可能影响：
  - Groq chat 不可用或行为异常；
  - tool schemas 被丢弃，影响工具调用；
  - 模型 ID 路由错误；
  - fallback provider 仅注册单模型，导致多模型选择受限。

该问题更偏向 provider 集成与路由稳定性，而非核心运行时崩溃。目前已有修复方向，建议维护者优先 review。

---

## 6. 功能请求与路线图信号

今日没有新的 Issue 形式功能请求。

但从 [PR #1276](https://github.com/moltis-org/moltis/pull/1276) 可以观察到一个明确的路线图信号：

### OpenAI-compatible Provider 支持将继续扩展

该 PR 将 Groq 注册为一等 OpenAI-compatible Provider，说明项目可能正在强化多模型、多 provider 兼容能力。后续可能被纳入版本规划的方向包括：

- 更完整的 OpenAI-compatible provider 注册机制；
- Groq、Together、Fireworks、OpenRouter 等第三方 provider 的统一支持；
- tool calling / schema 在不同 provider 间的兼容性增强；
- 更可靠的模型 ID 路由；
- 减少 fallback 路径导致的能力损失。

如果该 PR 被合并，Groq 支持很可能成为下一版本的一个用户可见改进点。

---

## 7. 用户反馈摘要

今日没有新的 Issue 评论或用户反馈数据，因此无法提炼真实用户评论中的满意点或痛点。

根据今日 PR 内容，可间接推断当前用户/贡献者遇到的痛点包括：

- Groq chat 在 Moltis 中“配置了但不可用”或表现异常；
- OpenAI-compatible provider 没有被统一处理；
- fallback 路径导致工具 schema 丢失；
- 多 provider 场景下模型路由不符合预期；
- 严格 schema 对空 `required` 的处理可能引发兼容性问题。

这些问题主要集中在 **Provider 兼容性、工具调用可靠性、模型路由一致性** 三个方面。

---

## 8. 待处理积压

基于今日提供的数据，未发现长期未响应的重要 Issue 或 PR。

### 当前需要维护者关注的开放 PR

#### [PR #1276 - Add Groq as OpenAI-compatible provider + fix empty-required strict schemas](https://github.com/moltis-org/moltis/pull/1276)

建议维护者优先 review 的原因：

- 修复范围明确；
- 对 Groq 用户影响较大；
- 涉及 tool schema 和 provider routing，属于关键兼容性路径；
- 若合并，可明显提升 Moltis 在多模型生态中的可用性。

---

## 今日结论

Moltis 今日社区层面较安静，没有 Issue 活动和版本发布，但新增的 [PR #1276](https://github.com/moltis-org/moltis/pull/1276) 具有较高价值。它不仅修复 Groq Provider 的实际可用性问题，也暴露出项目在 OpenAI-compatible provider 统一处理方面仍有完善空间。短期内，建议维护者重点 review 并测试该 PR，尤其关注 tool schema、模型路由和严格 schema 校验在不同 provider 下的一致性。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报  
**日期：2026-09-19**  
**数据源：GitHub `agentscope-ai/CoPaw` / 数据条目实际指向 `agentscope-ai/QwenPaw`**

---

## 1. 今日速览

过去 24 小时项目活跃度很高：共出现 **10 条 Issue 更新**、**20 条 PR 更新**，并发布了 **1 个 beta 版本 v2.2.2-beta.1**。  
今日活动主要集中在 **Console 前端体验、工具结果裁剪与上下文膨胀、Prompt Injection 防护、驱动/策略并发一致性、Windows CI 稳定性** 等方向。  
从 PR 数量看，维护与修复节奏较快，已有多个 Issue 在当天即出现对应修复 PR，说明项目响应速度较好。  
不过，今日新增 Bug 中包含 **安全类、上下文爆炸类、会话永久失败类、并发写覆盖类** 等高影响问题，短期内稳定性与安全性仍是版本推进的主要风险点。  
整体健康度判断：**开发活跃、响应及时，但 beta 阶段质量压力较大，需优先收敛高严重度缺陷后再推进正式发布。**

---

## 2. 版本发布

### v2.2.2-beta.1

- Release：[`v2.2.2-beta.1`](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.2-beta.1)
- 发布类型：Beta
- 相关发布验证 Issue：[#7849](https://github.com/agentscope-ai/QwenPaw/issues/7849)

#### 主要更新内容

根据 Release 说明，本次 beta 版本包含：

1. **Console 分组聊天历史改进**
   - 相关 PR：[#7665](https://github.com/agentscope-ai/QwenPaw/pull/7665)
   - 方向：改进 Console 中 grouped chat history 的展示与管理体验。

2. **Memory / ReMe slash commands 统一**
   - 相关 PR：[#7444](https://github.com/agentscope-ai/QwenPaw/pull/7444)
   - 方向：统一记忆相关 slash command 的使用方式，降低用户心智负担。

3. **版本号升级至 2.2.2b1**
   - 相关 PR 未完整展示，但 release notes 中提到由 `@cuiyuebing` 完成版本 bump。

#### 破坏性变更

从当前 Release 摘要中未看到明确的 breaking change 声明。  
但结合今日 Issue/PR 情况，需要注意 beta 版本周边存在兼容性风险：

- 插件 `qwenpaw-pet 0.1.1` 与 `QwenPaw 2.2.2b2` 的工具审批接口存在不兼容，表现为丢失 `actor` 参数。
  - Issue：[#7856](https://github.com/agentscope-ai/QwenPaw/issues/7856)

#### 迁移与使用注意事项

建议 beta 用户重点关注以下事项：

- 使用插件生态，尤其是 `qwenpaw-pet` 的用户，升级到 2.2.2 beta 系列前应确认插件是否适配新的 tool approval 参数。
- 使用多媒体输入、图片查看、音频文件发送能力的用户，应关注当前上下文累积与 provider 兼容问题。
- Windows 用户或依赖 release workflow 的维护者，应留意今日多个 Windows CI / snapshot / reload test 修复 PR。

---

## 3. 项目进展

今日 PR 更新 20 条，其中 **15 条仍待合并**，**5 条已关闭/合并**。整体来看，项目主要推进了 **发布流程稳定、Console 回归修复、技能批量能力、版本推进** 等工作。

### 重要已关闭 / 已合并 PR

#### 1. 恢复 Assistant response actions

- PR：[#7851](https://github.com/agentscope-ai/QwenPaw/pull/7851)
- 标题：`fix(console): restore assistant response actions`
- 作者：`zhijianma`
- 影响范围：Console / Chat UI

该 PR 修复了 Assistant 响应操作按钮相关回归，包括：

- 适配 `AgentScopeRuntimeWebUI 1.2` 的响应结构读取 assistant timestamp。
- 移除 host 注入的 regenerate control，使按钮显示逻辑回归 `actions.replace` / `actions.list`。
- 增加回归测试覆盖。

**项目推进意义：**  
改善 Chat UI 的基础交互可靠性，减少 Console 重构后引入的行为不一致。

---

#### 2. Skill 批量广播能力

- PR：[#7852](https://github.com/agentscope-ai/QwenPaw/pull/7852)
- 标题：`feat(skill): Add skill batch broadcast`
- 作者：`Leirunlin`
- 影响范围：Skill pool / Space

该 PR 为 skill pool 到 space 的批量操作增加了 batch broadcast 能力。

**项目推进意义：**  
增强技能管理效率，适合多空间、多技能场景下的批量分发需求，是技能生态管理能力的一次功能性增强。

---

#### 3. 修复 Console E2E 选择器与 session-list 断言

- PR：[#7860](https://github.com/agentscope-ai/QwenPaw/pull/7860)
- 标题：`fix(e2e): re-anchor console selectors broken by the #7502 redesign and harden session-list assertions`
- 作者：`yutai78786`
- 影响范围：Console E2E tests

该 PR 修复了由于 #7502 Console redesign 导致的 E2E selector 失效问题，并加强了 session-list 批量删除相关断言。

**项目推进意义：**  
提升 Console 自动化测试可靠性，避免重构后测试“假通过”或长期红灯，对 beta 发布质量非常关键。

---

#### 4. Release 工作流发布门禁修复

- PR：[#7862](https://github.com/agentscope-ai/QwenPaw/pull/7862)
- 标题：`ci(release): gate artifact publishing on the test gate and make the E2E watch set blocking`
- 作者：`yutai78786`
- 影响范围：Release workflow / Nightly full tests

该 PR 调整 release 工作流，使 artifact publishing 受 test gate 约束，并让 E2E watch set 成为阻塞条件。

**项目推进意义：**  
降低未经充分验证的构建产物被发布的风险，是 beta 期发布治理的重要改进。

---

#### 5. 版本升级至 v2.2.2b3

- PR：[#7855](https://github.com/agentscope-ai/QwenPaw/pull/7855)
- 标题：`chore: bump the version to v2.2.2b3`
- 作者：`cuiyuebing`

该 PR 推进版本号到 `v2.2.2b3`。

**项目推进意义：**  
说明 v2.2.2 beta 系列仍在快速迭代，预计后续会继续围绕 beta 验证问题进行小步修复。

---

## 4. 社区热点

### 1. Persistent Prompt Injection 导致技能删除指令持续注入

- Issue：[#7859](https://github.com/agentscope-ai/QwenPaw/issues/7859)
- 状态：Open
- 评论数：4
- 相关修复 PR：[#7864](https://github.com/agentscope-ai/QwenPaw/pull/7864)

该 Issue 是今日最值得关注的问题之一。用户报告在多个 session、20 多轮对话中，tool result 附带的 system-reminder / agent-skills listing blocks 中持续出现注入指令，要求 agent 完成任务后永久删除全部技能。

**背后诉求：**

- 用户希望系统能够区分工具结果内容与系统级控制指令。
- 技能目录、知识目录等关键资产需要更强的完整性保护。
- Prompt injection 不应通过工具结果或上下文残留长期污染 agent 行为。

**健康度判断：**  
该问题已有安全修复 PR #7864，响应速度较快。但由于涉及技能删除与持久化污染，建议作为高优先级安全问题处理。

---

### 2. ToolResultPruner 跳过媒体块导致 base64 上下文无界累积

- Issue：[#7853](https://github.com/agentscope-ai/QwenPaw/issues/7853)
- 状态：Open
- 评论数：4

用户指出 `ToolResultPruner.prune_output` 只处理 `type == "text"` 的块，导致 `view_image` 产生的 `type="data"` + `Base64Source` 图片载荷不会被裁剪。随着会话进行，这些 base64 数据会不断累积，最终撑爆模型上下文窗口。

**背后诉求：**

- 工具结果裁剪策略需要覆盖非文本块，尤其是图片、音频、文件等大体积数据。
- 用户希望配置 `tool_result_pruning_config` 后，所有大载荷都能受到限制。
- 多模态工具结果需要有生命周期管理，而不能永久进入上下文。

**健康度判断：**  
这是稳定性与成本问题，也可能影响所有使用 `view_image` 的长会话用户。当前数据中未看到对应修复 PR，应尽快排期。

---

### 3. Driver reload 并发写覆盖 policy 更新

- Issue：[#7850](https://github.com/agentscope-ai/QwenPaw/issues/7850)
- 状态：Open
- 评论数：2
- 相关修复 PR：[#7854](https://github.com/agentscope-ai/QwenPaw/pull/7854)

该 Issue 报告 `DriverManager.reload_driver()` 的 read-modify-write 流程中，读取和最终保存之间夹着较慢的 handler build，导致后台 reload 可能用旧 snapshot 覆盖并发 policy 写入。

**背后诉求：**

- 用户需要驱动配置与 policy 更新具备并发安全性。
- 后台 reload 不能破坏用户显式更新的策略。
- 配置卡片保存逻辑需要避免 stale write。

**健康度判断：**  
已有 PR #7854 针对该问题进行修复，说明维护者对并发一致性问题响应较快。

---

### 4. Creator create-video 控制面设计与实现

- PR：[#7874](https://github.com/agentscope-ai/QwenPaw/pull/7874)
- PR：[#7875](https://github.com/agentscope-ai/QwenPaw/pull/7875)

今日同时出现实现 PR 与文档规范 PR，说明 `Creator create-video` 可能是近期路线图重点。  
该功能旨在让 Main Chat 可以完成“制作视频”类用户请求，而不暴露 Creator 内部 project ID、element ID 等实现细节。

**背后诉求：**

- 用户希望通过自然语言直接生成视频，而不是理解底层 Creator 项目结构。
- 系统需要清晰划分 public schema 与 private action boundary。
- 需要有 durable control-plane，支持 setup、approval、artifact、cancel 等完整生命周期。

---

## 5. Bug 与稳定性

以下按严重程度排序。

### P0 / 安全与数据破坏风险

#### 1. Prompt Injection 指令要求删除所有技能

- Issue：[#7859](https://github.com/agentscope-ai/QwenPaw/issues/7859)
- 状态：Open
- 严重程度：高
- 影响：技能目录、知识目录完整性；潜在持久化上下文污染
- 修复 PR：[#7864](https://github.com/agentscope-ai/QwenPaw/pull/7864)

相关 PR #7864 增加了 skill / knowledge directory 的完整性保护，防止 prompt-injected deletion。

---

#### 2. 工具输出截断可被字面量 marker 绕过

- PR：[#7871](https://github.com/agentscope-ai/QwenPaw/pull/7871)
- 状态：Open
- 严重程度：高
- 影响：超大工具输出可绕过 body limit，造成上下文膨胀或资源消耗

该 PR 修复 literal `<<<TRUNCATED>>>` 出现在输出正文中时绕过截断的问题。  
虽然该条是 PR 而非 Issue，但从描述看属于安全/稳定性相关缺陷。

---

### P1 / 会话不可用、上下文爆炸、数据一致性

#### 3. ToolResultPruner 不裁剪媒体块，导致图片 base64 无界累积

- Issue：[#7853](https://github.com/agentscope-ai/QwenPaw/issues/7853)
- 状态：Open
- 严重程度：高
- 修复 PR：当前数据中未看到

影响使用 `view_image` 的长会话，可能导致每次请求超出模型上下文窗口。

---

#### 4. DeepSeek 拒绝 OpenAI `input_audio` content part，音频 fallback 未触发

- Issue：[#7876](https://github.com/agentscope-ai/QwenPaw/issues/7876)
- 状态：Open
- 严重程度：高
- 修复 PR：当前数据中未看到

用户报告通过 `send_file_to_user` 发送本地 `.wav` 后，音频 `DataBlock` 会保存在 session history 中。后续每次模型调用都会重新读取并 base64 inline，DeepSeek 返回 422 `unknown variant`，且 audio fallback classifier 未触发，导致会话永久失败。

**影响：**

- 单次发送音频文件即可使会话后续不可用。
- 多 provider 内容兼容层需要更稳健地处理 audio content part。
- 与 #7853 一样，暴露出多媒体 DataBlock 生命周期与裁剪问题。

---

#### 5. Driver reload 覆盖并发 policy 写入

- Issue：[#7850](https://github.com/agentscope-ai/QwenPaw/issues/7850)
- 状态：Open
- 严重程度：中高
- 修复 PR：[#7854](https://github.com/agentscope-ai/QwenPaw/pull/7854)

该问题可能造成用户配置丢失，尤其在后台 reload 与用户修改 policy 并发发生时。

---

#### 6. qwenpaw-pet 0.1.1 破坏 2.2.2b2 tool approvals

- Issue：[#7856](https://github.com/agentscope-ai/QwenPaw/issues/7856)
- 状态：Open
- 严重程度：中高
- 修复 PR：当前数据中未看到

插件丢失 `actor` 参数，导致 QwenPaw Desktop `2.2.2-beta.2` / backend `2.2.2b2` 下工具审批异常。  
这是典型插件 API 兼容性问题，建议在 beta release notes 中明确说明。

---

### P2 / Console 体验与功能回归

#### 7. 会话级工作目录面板 UI 问题

- Issue：[#7877](https://github.com/agentscope-ai/QwenPaw/issues/7877)
- 状态：Open
- 严重程度：中
- 修复 PR：当前数据中未看到

问题包括：

- 浏览目录可视区只有约 3 行。
- “最近项目”恒为空且无写入入口。
- 选择目录后“应用”仍禁用。

这是 Console UI 可用性问题，会直接影响用户配置工作目录的体验。

---

#### 8. 文件被 agent 重写后，File-area tab 仍显示旧内容

- Issue：[#7866](https://github.com/agentscope-ai/QwenPaw/issues/7866)
- 状态：Open
- 严重程度：中
- 修复 PR：[#7867](https://github.com/agentscope-ai/QwenPaw/pull/7867)

PR #7867 在 tab 激活时重新校验文件内容，修复 workspace view 缓存导致的旧内容展示问题。

---

#### 9. Chat stream 中途死亡后 Console 缺少自恢复路径

- PR：[#7865](https://github.com/agentscope-ai/QwenPaw/pull/7865)
- 状态：Open
- 严重程度：中
- 关联 Issue：未在数据中给出

该 PR 指出 SDK reconnect 只由 session mount 触发，若 chat stream 在运行中中断，Console 没有自愈机制。  
这是用户长任务体验中的重要可靠性问题。

---

### P3 / 测试、CI、工程稳定性

#### 10. ACP shutdown fallback 可能跳过 session cleanup 并泄漏 event loop

- Issue：[#7857](https://github.com/agentscope-ai/QwenPaw/issues/7857)
- 状态：Open
- 严重程度：中
- 修复 PR：当前数据中未看到

---

#### 11. 测试中存在 unawaited coroutine warnings

- Issue：[#7858](https://github.com/agentscope-ai/QwenPaw/issues/7858)
- 状态：Open
- 严重程度：中低
- 修复 PR：当前数据中未看到

该问题虽然不一定导致测试失败，但会掩盖真实 async lifecycle 缺陷。

---

#### 12. Windows 单测与 reload / snapshot 稳定性

- PR：[#7863](https://github.com/agentscope-ai/QwenPaw/pull/7863)
- PR：[#7870](https://github.com/agentscope-ai/QwenPaw/pull/7870)
- 状态：Open

两个 PR 均指向 Windows 测试稳定性问题，包括 Uvicorn reload 子进程 import、LF checkout、hash-verified Data Console assets 等。

---

## 6. 功能请求与路线图信号

### 1. Creator create-video 正在成为近期重点能力

- 实现 PR：[#7874](https://github.com/agentscope-ai/QwenPaw/pull/7874)
- 文档 PR：[#7875](https://github.com/agentscope-ai/QwenPaw/pull/7875)

该方向具有明显路线图信号：同一天出现实现与规范文档，说明维护者正在将 Creator 视频生成能力产品化。  
预计可能进入后续 v2.2.2 beta 或 v2.2.x 版本。

**可能纳入内容：**

- Main Chat 直接发起视频创建。
- 用户无需感知 Creator 内部 project / element ID。
- 增加 approval、setup、final artifact、cancel 等控制面语义。
- 公共 schema 与私有 action 边界更加清晰。

---

### 2. Console 多 Tab 认证终端

- PR：[#7861](https://github.com/agentscope-ai/QwenPaw/pull/7861)
- 状态：Open

该 PR 添加了 lazy-loaded xterm terminal，支持：

- 独立终端 tabs。
- 会话级 working directory。
- 自动创建首个 terminal。
- 重命名、右键关闭、resize、collapse。
- 有界 output replay。
- 认证要求。

**路线图意义：**  
Console 正在从单纯 Chat + Files UI 向更完整的 agent workspace 演进，支持在会话上下文中进行终端操作。

---

### 3. Skill 管理能力增强

- 已关闭 PR：[#7852](https://github.com/agentscope-ai/QwenPaw/pull/7852)

Skill batch broadcast 表明项目在继续强化技能池、空间分发、批量管理能力。  
结合 #7859 的安全问题，后续 skill 体系可能同时向 **更强管理能力** 与 **更强安全保护** 两个方向发展。

---

### 4. Scroll / Memory / Recall 能力持续打磨

- PR：[#7872](https://github.com/agentscope-ai/QwenPaw/pull/7872)
- PR：[#7873](https://github.com/agentscope-ai/QwenPaw/pull/7873)

相关改动包括：

- 保留 interrupted requests，避免 follow-up compaction 将旧请求指令移出 live context。
- 当 advanced Python recall 因 sandbox 不可用被省略时，向模型和用户解释限制。

**路线图意义：**  
项目正在强化长上下文、历史召回、压缩与中断恢复能力，这是个人 AI 助手类项目的核心能力之一。

---

## 7. 用户反馈摘要

### 1. 用户担忧 Agent 执行链中的安全边界不足

代表 Issue：[#7859](https://github.com/agentscope-ai/QwenPaw/issues/7859)

用户遇到的不是一次性错误，而是跨 session、多轮次持续出现的 prompt injection 指令。这表明用户真实痛点在于：

- 不知道恶意指令从哪里进入。
- 无法确认技能与知识目录是否安全。
- 担心 agent 执行工具时会误删长期资产。

用户对系统的期待是：**关键资产目录必须默认受到保护，不能仅依赖模型自觉忽略恶意提示。**

---

### 2. 多模态数据进入上下文后缺乏可控生命周期

代表 Issue：

- [#7853](https://github.com/agentscope-ai/QwenPaw/issues/7853)
- [#7876](https://github.com/agentscope-ai/QwenPaw/issues/7876)

图片 base64 与音频 DataBlock 都暴露出类似问题：

- 一旦进入 session history，后续请求会反复携带。
- 裁剪、fallback、provider compatibility 没有覆盖所有 block type。
- 用户难以通过配置解决问题。

用户真实诉求是：**图片、音频、文件等大体积上下文应有明确的裁剪、引用、过期和 provider 转换策略。**

---

### 3. Console 用户对“看到的内容是否最新”非常敏感

代表 Issue：[#7866](https://github.com/agentscope-ai/QwenPaw/issues/7866)  
相关 PR：[#7867](https://github.com/agentscope-ai/QwenPaw/pull/7867)

用户指出 session file card 已显示新内容，但 file-area tab 仍显示旧内容。  
这类问题会降低用户对 agent 文件修改结果的信任。

用户真实诉求是：**Workspace UI 必须与磁盘状态保持一致，尤其当文件由 agent 自动改写时。**

---

### 4. 用户希望 Console 基础工作流更顺滑

代表 Issue：[#7877](https://github.com/agentscope-ai/QwenPaw/issues/7877)

工作目录选择面板存在高度不足、最近项目为空、选择后应用按钮禁用等问题。  
这些反馈说明 Console 的某些基础操作仍存在摩擦。

用户真实诉求是：**会话工作目录应该易于浏览、选择、复用，并且 UI 状态反馈明确。**

---

### 5. 插件生态对 API 兼容性变化敏感

代表 Issue：[#7856](https://github.com/agentscope-ai/QwenPaw/issues/7856)

`qwenpaw-pet 0.1.1` 与新 beta 的 tool approval 接口不兼容，说明插件作者和用户都需要更明确的接口变更说明。

用户真实诉求是：**beta 版本可以变化，但插件接口变更应有迁移说明、兼容层或清晰错误提示。**

---

## 8. 待处理积压

由于本日报仅包含过去 24 小时数据，无法严格判断“长期未响应”的历史积压。但从今日数据看，以下问题值得维护者优先跟进，避免演变为高影响积压。

### 高优先级待处理

1. **ToolResultPruner 不裁剪媒体块**
   - Issue：[#7853](https://github.com/agentscope-ai/QwenPaw/issues/7853)
   - 当前未见修复 PR
   - 建议优先级：P1

2. **DeepSeek 音频 content part 导致会话永久失败**
   - Issue：[#7876](https://github.com/agentscope-ai/QwenPaw/issues/7876)
   - 当前未见修复 PR
   - 建议优先级：P1

3. **qwenpaw-pet 插件与 2.2.2 beta tool approvals 不兼容**
   - Issue：[#7856](https://github.com/agentscope-ai/QwenPaw/issues/7856)
   - 当前未见修复 PR
   - 建议优先级：P1/P2，取决于插件使用量

4. **ACP shutdown fallback 泄漏 event loop / 跳过 cleanup**
   - Issue：[#7857](https://github.com/agentscope-ai/QwenPaw/issues/7857)
   - 当前未见修复 PR
   - 建议优先级：P2

5. **unawaited coroutine warnings 掩盖异步生命周期缺陷**
   - Issue：[#7858](https://github.com/agentscope-ai/QwenPaw/issues/7858)
   - 当前未见修复 PR
   - 建议优先级：P2/P3

6. **工作目录面板可用性问题**
   - Issue：[#7877](https://github.com/agentscope-ai/QwenPaw/issues/7877)
   - 当前未见修复 PR
   - 建议优先级：P2

### 待 Review 的重要 PR

1. **Prompt Injection / 技能目录保护**
   - PR：[#7864](https://github.com/agentscope-ai/QwenPaw/pull/7864)
   - 建议优先 Review，安全影响较大。

2. **Driver reload 并发 policy 更新保护**
   - PR：[#7854](https://github.com/agentscope-ai/QwenPaw/pull/7854)
   - 建议尽快合并，降低配置覆盖风险。

3. **File-area tab 内容重新校验**
   - PR：[#7867](https://github.com/agentscope-ai/QwenPaw/pull/7867)
   - 直接修复用户可见回归。

4. **工具输出截断绕过修复**
   - PR：[#7871](https://github.com/agentscope-ai/QwenPaw/pull/7871)
   - 建议作为稳定性/安全相关修复优先处理。

5. **Scroll 中断请求保留与 recall 限制说明**
   - PR：[#7872](https://github.com/agentscope-ai/QwenPaw/pull/7872)
   - PR：[#7873](https://github.com/agentscope-ai/QwenPaw/pull/7873)
   - 对长任务和历史召回体验有直接影响。

---

## 总体判断

CoPaw / QwenPaw 今日处于 **高活跃 beta 迭代状态**。项目在 Console、Creator、Skill、Scroll、CI 发布治理等方向均有明显推进；同时社区反馈暴露出多模态上下文管理、安全边界、插件兼容和 UI 一致性方面的集中问题。  
建议维护团队在继续推进 Creator create-video、Console terminal 等新功能的同时，将 **Prompt Injection 防护、媒体 DataBlock 裁剪、provider 内容兼容、并发配置写保护** 作为 v2.2.2 后续 beta 收敛的关键门槛。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报（2026-09-19）

## 1. 今日速览

过去 24 小时，ZeptoClaw 项目没有新的 Issue 更新，也没有新版本发布，社区反馈面相对安静。PR 侧有 2 条更新，其中 1 条已关闭，1 条仍处于待合并状态，说明维护活动主要集中在代码层面的修复与安全加固。今日重点集中在两个方向：OpenAI-compatible 推理模型响应兼容性，以及公开面板密码登录的速率限制。整体来看，项目活跃度为**低到中等**，但更新内容具有较高实用价值，尤其是安全与模型兼容性方面。

---

## 2. 项目进展

### 已关闭 PR

#### [#703 feat(providers): read reasoning-model replies on OpenAI-compatible endpoints](https://github.com/qhkm/zeptoclaw/pull/703)

- 状态：Closed
- 作者：qhkm
- 创建时间：2026-09-18
- 更新时间：2026-09-18
- 评论数：未提供
- 反应数：0

该 PR 处理了 OpenAI-compatible endpoint 上 reasoning model 的响应解析问题。部分推理模型会将思考内容返回在 `reasoning_content` 字段中，并且在 token budget 用尽或尚未进入正式回答阶段时，`content` 可能为 `null`。此前 ZeptoClaw 只读取 `content`，并通过 `unwrap_or_default()` 将 `null` 转为空字符串，可能导致用户看到空回复，无法理解模型实际产生了推理内容。

该变更提升了 ZeptoClaw 对推理模型和 OpenAI 兼容服务的适配能力，尤其适用于使用 reasoning model、本地兼容 API 服务或第三方模型网关的用户。虽然该 PR 当前状态为 Closed，数据未明确表明是否已合并，因此不能确认该能力已经进入主分支。

### 待合并 PR

#### [#702 fix(panel): rate-limit password login attempts](https://github.com/qhkm/zeptoclaw/pull/702)

- 状态：Open
- 作者：qhkm
- 创建时间：2026-09-18
- 更新时间：2026-09-18
- 评论数：未提供
- 反应数：0

该 PR 为公开面板的密码登录端点增加了速率限制。此前该接口允许无限次密码尝试，唯一的阻力是 bcrypt 的计算成本。更新后，同一 socket peer IP 在滚动 60 秒窗口内最多允许 5 次尝试，第 6 次请求会在 JSON 解析或密码校验之前直接返回 HTTP 429，并附带 `Retry-After: 60`。

这是一个明确的安全加固改动，降低了面板密码被暴力破解的风险，也减少了大量无效 bcrypt 校验对服务端资源的消耗。该 PR 仍处于 Open 状态，建议维护者优先审查并合并。

---

## 3. 社区热点

今日没有 Issue 更新，也没有提供 PR 评论数据，因此没有明显的社区讨论热点。

相对而言，以下两个 PR 可视为今日技术关注点：

1. [#702 fix(panel): rate-limit password login attempts](https://github.com/qhkm/zeptoclaw/pull/702)  
   关注点：公开面板登录安全、防暴力破解、服务端资源保护。  
   背后诉求：ZeptoClaw 如果用于公网部署，管理面板的安全边界会变得更重要。该 PR 体现出项目正在补齐基础安全防护能力。

2. [#703 feat(providers): read reasoning-model replies on OpenAI-compatible endpoints](https://github.com/qhkm/zeptoclaw/pull/703)  
   关注点：OpenAI-compatible 接口兼容性、reasoning model 输出解析。  
   背后诉求：越来越多模型服务会通过 OpenAI 兼容格式暴露 reasoning 字段，项目需要适配非标准但常见的扩展字段，避免空回复和用户体验损失。

---

## 4. Bug 与稳定性

### 高优先级

#### 登录端点缺少速率限制  
- 关联 PR：[https://github.com/qhkm/zeptoclaw/pull/702](https://github.com/qhkm/zeptoclaw/pull/702)
- 状态：已有 fix PR，尚未合并
- 严重程度：高

公开面板密码登录允许无限次尝试，存在暴力破解风险。虽然 bcrypt 本身增加了攻击成本，但不能替代请求级限流。该问题对于公网部署场景尤其重要，建议优先处理。

### 中优先级

#### OpenAI-compatible reasoning model 返回空内容时解析不完整  
- 关联 PR：[https://github.com/qhkm/zeptoclaw/pull/703](https://github.com/qhkm/zeptoclaw/pull/703)
- 状态：PR 已关闭，是否合并未从数据中确认
- 严重程度：中

部分 reasoning model 会将内容放在 `reasoning_content` 中，而 `content` 可能为 `null`。此前解析逻辑可能导致 ZeptoClaw 将实际存在的推理输出显示为空字符串。这不是崩溃类问题，但会造成明显的功能异常和用户困惑。

### 今日未见新 Bug 报告

过去 24 小时没有新的 Issue，因此没有来自用户侧的新崩溃、回归或错误报告。

---

## 5. 功能请求与路线图信号

今日没有新增 Issue，也没有明确的用户功能请求。但从 PR 更新可以观察到两个潜在路线图方向：

1. **增强模型提供商兼容性**  
   - 关联 PR：[https://github.com/qhkm/zeptoclaw/pull/703](https://github.com/qhkm/zeptoclaw/pull/703)  
   ZeptoClaw 正在适配 OpenAI-compatible endpoint 中更复杂的返回结构，尤其是 reasoning model 的 `reasoning_content`。这表明后续版本可能继续提升对第三方模型网关、本地模型服务和推理模型的支持。

2. **强化公开面板安全性**  
   - 关联 PR：[https://github.com/qhkm/zeptoclaw/pull/702](https://github.com/qhkm/zeptoclaw/pull/702)  
   登录限流属于基础安全能力。若该方向继续推进，后续可能还会看到审计日志、IP 封禁、验证码、多因素认证或更细粒度的访问控制等改进。

---

## 6. 用户反馈摘要

今日没有 Issue 评论或用户讨论数据，因此无法提炼新的真实用户反馈。

从现有 PR 内容可以间接推断两个使用场景：

- 有用户或维护者正在使用 OpenAI-compatible endpoint 接入 reasoning model，并遇到 `content` 为空但 `reasoning_content` 有内容的响应格式问题。
- ZeptoClaw 的公开面板可能存在公网访问或半公网访问场景，因此密码登录端点的暴力破解防护成为需要补齐的安全能力。

这些信号表明，ZeptoClaw 的使用场景正在从本地或受信环境扩展到更复杂的模型接入和更高安全要求的部署环境。

---

## 7. 待处理积压

基于今日提供的数据，未发现长期未响应的 Issue 或 PR。

当前值得维护者优先关注的是：

1. [#702 fix(panel): rate-limit password login attempts](https://github.com/qhkm/zeptoclaw/pull/702)  
   - 原因：安全相关，且仍处于 Open 状态。
   - 建议：优先审查限流策略是否适用于代理部署、反向代理场景和真实客户端 IP 获取方式。

2. [#703 feat(providers): read reasoning-model replies on OpenAI-compatible endpoints](https://github.com/qhkm/zeptoclaw/pull/703)  
   - 原因：已关闭但数据未明确是否合并。
   - 建议：确认该兼容性修复是否已进入主分支；如果只是关闭未合并，应说明后续处理计划，避免相关问题重复出现。

---

## 项目健康度评估

- 活跃度：低到中等
- 维护响应：有维护者直接提交 PR，说明项目仍在持续维护
- 稳定性：今日未见新崩溃或回归报告
- 安全性：正在补强登录限流，方向积极
- 生态兼容性：正在增强对 reasoning model 和 OpenAI-compatible endpoint 的支持

总体而言，ZeptoClaw 今日没有明显社区噪音或大规模问题暴露，但两个 PR 均指向关键质量维度：**安全性**与**模型兼容性**。如果 [#702](https://github.com/qhkm/zeptoclaw/pull/702) 能尽快合并，项目在公网部署场景下的安全基线将有所提升。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报｜2026-09-19

## 1. 今日速览

过去 24 小时，ZeroClaw 保持较高开发活跃度：共出现 **3 条 Issue 更新**、**11 条 PR 更新**，其中 **10 个 PR 仍待合并**，**1 个 PR 已关闭**。今日活动主要集中在 **runtime、shell 工具、安全策略、delegate 子代理、provider transport、ZeroCode 配置管理** 等核心区域。  
整体来看，项目当前处于 **密集修复与能力补强阶段**：一方面有高风险安全与工具分类问题被报告，另一方面多个小型修复 PR 正在尝试提升运行时稳定性、缓存命中率和跨平台 shell 体验。  
需要注意的是，今日新增/活跃 Issue 中有多个被标记为 **risk:high** 或 **domain:security**，说明安全边界与代理运行时仍是近期维护重点。发布层面今日 **无新版本发布**。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

### 已关闭 / 合并相关 PR

#### #10957 fix(nix): remove stale cargo git hashes  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10957  
状态：Closed  
作者：rtimush  

该 PR 移除了已经不存在的 Cargo git 依赖对应的 Nix hash，并更新了 flakes 依赖，以解决 Nix 无法从 crates.io 拉取源码的问题。虽然该 PR 当前状态为关闭，数据中未显示是否合并，但它反映出构建与包管理链路存在维护需求。

**影响评估：**

- 改进方向：Nix 构建环境、依赖拉取可靠性。
- 用户影响：主要影响使用 Nix/Flakes 构建 ZeroClaw 的开发者。
- 项目前进程度：属于基础设施修复，功能层面增量较小，但对可复现构建和开发者体验有正向意义。

---

### 今日仍在推进的重要 PR

#### #10965 fix(runtime): heap-pin detached peer turns before cost scopes  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10965  
状态：Open  
作者：Audacity88  

该 PR 修复 runtime 中 detached peer turn 在嵌套 cost scope 下可能导致测试栈溢出的问题。摘要显示当前 master 上已有回归测试会在默认测试栈下溢出并中止 parallel runtime suite。

**意义：**

- 属于稳定性修复。
- 风险标记为 `risk:medium`。
- 如果合并，预计可提升 runtime 测试稳定性，并减少并行执行场景下的崩溃风险。

---

#### #10964 fix(zerocode): refresh the config field list once after a save  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10964  
状态：Open  
作者：Audacity88  

该 PR 修复 ZeroCode Config 中保存配置后重复调用 `config/list` 的问题，避免在保存后重复刷新字段列表。

**意义：**

- 减少重复请求。
- 改善 ZeroCode 配置管理 UI/交互性能。
- 属于中等规模修复，标记为 `size:M`、`risk:medium`。

---

#### #10960 feat(providers): ZEROCLAW_CACHE_TTL to raise or disable the prompt-cache TTL  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10960  
状态：Open  
作者：iceHub82  

该 PR 为 Anthropic provider 增加 `ZEROCLAW_CACHE_TTL`，用于提高或禁用 prompt-cache TTL。当前 `CacheControl::ephemeral()` 固定为 5 分钟缓存，导致调用间隔超过 5 分钟时无法复用缓存，同时仍需承担 cache-write 成本。

**意义：**

- 直接回应 provider 成本优化诉求。
- 有望降低 Anthropic 使用场景下的重复缓存写入成本。
- 属于 provider transport 层增强，可能对下一版本用户体验有明显改善。

---

#### #10959 fix(runtime): sort tool specs so the prompt-cache prefix is stable  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10959  
状态：Open  
作者：iceHub82  

该 PR 修复工具规格列表顺序不稳定导致 prompt-cache prefix 不稳定的问题。由于 MCP registry 使用 `HashMap`，工具列表顺序可能在不同进程中变化，影响 Anthropic provider 缓存断点命中。

**意义：**

- 改善缓存稳定性。
- 与 #10960 一起构成 prompt-cache 成本与性能优化方向。
- 对 agent 工具调用场景有实际价值。

---

#### #10956 feat(runtime): detect platform default shell  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10956  
状态：Open  
作者：NiuBlibing  

该 PR 尝试在用户未配置 shell 时自动检测平台默认 shell。Windows 上探测 `pwsh`、`powershell`、`cmd.exe`；macOS/Linux 优先使用当前用户登录 shell，再回退到常见 shell。

**意义：**

- 改善跨平台 shell 工具体验。
- 涉及 `domain:security` 与 `tool:shell`，风险较高。
- 当前标记为 `needs-author-action`，说明仍需作者进一步处理维护者反馈。

---

#### #10955 feat(runtime): detect encoding for shell output  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10955  
状态：Open  
作者：NiuBlibing  

该 PR 将 shell stdout/stderr 保留为原始字节直到统一解码边界，并优先 UTF-8，其次使用 `chardetng` 与 `encoding_rs`，最后回退到 UTF-8 lossy。

**意义：**

- 解决非 UTF-8 shell 输出乱码问题。
- 影响 shell tool、cron shell jobs、shell-backed skills 等多个路径。
- 当前也标记为 `needs-author-action`，需要进一步完善。

---

#### #10954 feat(shell): initialize PowerShell output as UTF-8  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10954  
状态：Open  
作者：NiuBlibing  

该 PR 在 PowerShell/pwsh 执行用户命令前初始化输出编码为 UTF-8，并将设置失败包裹在空 `try/catch` 中，避免影响命令执行。

**意义：**

- 针对 Windows/PowerShell 输出编码体验。
- 与 #10955 形成互补。
- 当前需要作者操作，可能仍存在实现或测试层面的维护者反馈。

---

## 4. 社区热点

今日评论数整体不高，所有活跃 Issue 的评论数均为 1，PR 反应数也未显示明显聚集。但从标签和风险等级看，热点集中在以下几个方向。

### 安全与 shell 工具审批分类

#### #10966 [Bug]: Git --attr-source can hide a mutating subcommand from approval classification  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10966  
作者：Audacity88  
评论：1  
标签：`bug`, `security`, `tool:shell`, `security:policy`, `priority:p1`, `risk:high`, `status:accepted`

该 Issue 指出 Git 全局选项扫描器没有消费 `--attr-source` 的独立参数值，导致某些值可能伪装成只读子命令，从而隐藏真实的变更型 subcommand，影响审批分类。

**背后诉求：**

- 用户/贡献者希望 shell 工具的安全策略能准确识别命令意图。
- 对 mutating command 的审批边界要求更严格。
- 这类问题一旦存在绕过空间，可能影响自动化 agent 执行命令时的安全可信度。

---

### delegate 子代理上下文与身份传递

#### #10963 [Feature]: Forward session identity to delegate sub-agents  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10963  
作者：eppofahmi  
评论：1  
标签：`enhancement`, `agent`, `runtime`, `tool:delegate`, `domain:security`, `domain:architecture`, `risk:high`

该 Issue 指出 `delegate` 构建子代理 prompt 时只使用 LLM 生成的 `context`，没有将 session identity 明确传给 sub-agent。

**背后诉求：**

- 用户希望子代理在执行任务时保持主会话身份与上下文连续性。
- 这不仅是功能问题，也涉及安全与架构边界：哪些身份信息应该被传递、如何避免越权或上下文污染，是后续设计重点。

---

### gateway 工具结果流式传输

#### #10962 [Feature]: Forward tool result payloads over the gateway /ws/chat stream  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10962  
作者：eppofahmi  
评论：1  
标签：`enhancement`, `gateway`, `runtime`, `tool:delegate`, `risk:high`, `r:needs-repro`

该 Issue 指出 `/ws/chat` stream 当前只发送工具调用开始/结束帧，但不携带工具返回结果 payload。客户端只能知道工具执行生命周期，却无法从流里直接获得结果内容。

**背后诉求：**

- 面向实时客户端或 IDE/前端集成时，用户希望完整消费工具执行结果。
- 当前事件流缺乏 result payload，限制了外部 UI 对 agent 工具调用的可观测性。
- `r:needs-repro` 表明维护者可能仍需要复现路径或更明确的协议期望。

---

## 5. Bug 与稳定性

按严重程度和影响面排序如下。

### P1 / 高风险：Git `--attr-source` 可影响 mutating command 审批分类

#### #10966 [Bug]: Git --attr-source can hide a mutating subcommand from approval classification  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10966  
状态：Open  
严重程度：S0 - data loss / security risk  
标签：`priority:p1`, `risk:high`, `security:policy`, `tool:shell`, `status:accepted`

**问题概述：**  
Git 全局选项扫描器没有正确消费 `--attr-source` 的独立值，导致后续真实的 mutating subcommand 可能被隐藏或误分类。

**影响：**

- 可能导致安全审批分类错误。
- 对 shell 工具和 sandbox 策略有直接风险。
- 已被标记为 `status:accepted`，说明维护者认可问题有效性。

**是否已有 fix PR：**  
今日数据中未发现直接关联该 Issue 的修复 PR。

---

### 中风险：runtime 栈溢出 / 并行测试中止

#### #10965 fix(runtime): heap-pin detached peer turns before cost scopes  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10965  
状态：Open  
标签：`bug`, `runtime`, `risk:medium`, `size:XS`

**问题概述：**  
runtime 中 recipient 的 `process_message` future 在嵌套 cost scope 下可能造成默认测试栈溢出，导致 parallel runtime suite abort。

**影响：**

- 影响 runtime 稳定性。
- 对测试可靠性和异步执行边界较关键。

**是否已有 fix PR：**  
已有修复 PR，即 #10965，待合并。

---

### 中风险：ZeroCode 配置保存后重复刷新字段列表

#### #10964 fix(zerocode): refresh the config field list once after a save  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10964  
状态：Open  
标签：`bug`, `zerocode`, `risk:medium`, `size:M`

**问题概述：**  
ZeroCode Config 的多个保存分支在保存后重复调用 `load_fields(&prefix)` 与 `pop_to_field_list_keep_cursor()`，造成同一 prefix 下重复 `config/list`。

**影响：**

- 可能导致不必要的请求。
- 对配置管理体验和性能有负面影响。

**是否已有 fix PR：**  
已有修复 PR，即 #10964，待合并。

---

### 中风险：工具规格顺序不稳定导致 prompt-cache 命中下降

#### #10959 fix(runtime): sort tool specs so the prompt-cache prefix is stable  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10959  
状态：Open  
标签：`bug`, `agent`, `runtime`, `topic:provider-transport`, `risk:medium`

**问题概述：**  
工具列表来自无序 map，进程间顺序可能不同，导致 Anthropic prompt-cache 的 prefix 不稳定，从而影响缓存复用。

**影响：**

- 增加 provider 调用成本。
- 降低缓存命中率。
- 对工具数量较多的 agent 场景影响更明显。

**是否已有 fix PR：**  
已有修复 PR，即 #10959，待合并。

---

### 中风险：channel interruption scope key 存在边界碰撞风险

#### #10958 fix(channels): use length-prefixed interruption scope keys to prevent boundary collisions  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10958  
状态：Open  
标签：`bug`, `channel:core`, `risk:medium`, `needs-author-action`, `size:M`

**问题概述：**  
原有 interruption scope key 使用下划线转义和拼接，可能出现边界碰撞。该 PR 改为带 tag 和长度前缀的规范编码。

**影响：**

- 涉及 channel core。
- 属于边界安全和正确性修复。
- 当前需要作者进一步处理。

**是否已有 fix PR：**  
已有修复 PR，即 #10958，但尚未合并。

---

## 6. 功能请求与路线图信号

### delegate 子代理身份传递可能进入架构层讨论

#### #10963 [Feature]: Forward session identity to delegate sub-agents  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10963  

该请求具备较强路线图信号，因为它同时涉及：

- agent runtime；
- delegate 工具；
- session identity；
- 安全边界；
- 子代理上下文一致性。

如果 ZeroClaw 后续强化多代理/子代理协作能力，该 Issue 很可能成为 delegate 架构改造的一部分。不过由于标签包含 `domain:security`、`domain:architecture` 和 `risk:high`，短期内可能需要维护者先明确设计原则，而非直接实现。

---

### gateway `/ws/chat` 工具结果 payload 暴露需求明确

#### #10962 [Feature]: Forward tool result payloads over the gateway /ws/chat stream  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10962  

该请求说明外部客户端需要更完整的 tool lifecycle 可观测性。当前 stream 只有 started/finished 事件，没有工具返回内容，限制了前端实时展示、日志记录、调试和自动化集成能力。

**是否可能进入下一版本：**

- 有可能，但依赖协议设计和复现。
- 当前标记 `r:needs-repro`，说明维护者还需要更具体的问题复现或期望行为描述。
- 如果 gateway 是项目近期重点，该能力具有较高优先级潜力。

---

### Anthropic prompt-cache 成本优化方向明显

#### #10960 feat(providers): ZEROCLAW_CACHE_TTL to raise or disable the prompt-cache TTL  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10960  

#### #10959 fix(runtime): sort tool specs so the prompt-cache prefix is stable  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10959  

这两个 PR 共同指向 provider transport 层的缓存优化：

- #10960 允许配置缓存 TTL 或禁用缓存；
- #10959 通过稳定工具规格排序提升缓存 prefix 稳定性。

**路线图信号：**

ZeroClaw 正在从“能调用模型”进一步走向“更低成本、更可预测地调用模型”。这对高频 agent 使用、长上下文场景和 Anthropic 用户尤其重要。两者均为小型 PR，若测试通过，进入下一版本的概率较高。

---

### 跨平台 shell 体验是近期重点

相关 PR：

- #10956 detect platform default shell  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10956
- #10955 detect encoding for shell output  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10955
- #10954 initialize PowerShell output as UTF-8  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10954

这些 PR 显示 shell 工具正在补强跨平台可用性，重点包括：

- 自动选择默认 shell；
- Windows PowerShell/pwsh 输出 UTF-8 初始化；
- 非 UTF-8 输出自动检测；
- cron、skills、shell tool 等多路径统一处理。

不过其中多个 PR 标记为 `needs-author-action`，且 #10956 涉及安全域，预计需要更多审查。

---

## 7. 用户反馈摘要

基于今日 Issues 与 PR 摘要，可提炼出以下用户痛点和使用场景。

### 1. 用户担心 agent shell 执行的安全审批被绕过

对应 Issue：  
#10966 https://github.com/zeroclaw-labs/zeroclaw/issues/10966  

反馈表明，用户或贡献者正在关注 shell 工具中命令分类的准确性。尤其是在 Git 命令中，全局参数和子命令解析如果存在漏洞，可能导致实际会修改数据的命令被误判为安全读取类操作。

**用户痛点：**

- 不希望 agent 在未经正确审批的情况下执行 mutating 操作。
- 需要安全策略能处理复杂 CLI 参数组合。
- 期望 sandbox/approval classification 更保守、更可靠。

---

### 2. 多代理场景下，子代理缺少明确会话身份

对应 Issue：  
#10963 https://github.com/zeroclaw-labs/zeroclaw/issues/10963  

用户希望 delegate sub-agent 能获得 session identity，而不是只依赖 LLM 生成的 context。

**用户痛点：**

- 子代理执行时上下文身份不完整。
- 多代理链路中的权限、归属、审计信息可能不清晰。
- 当前 delegate prompt 构建方式可能不足以支撑复杂 agent orchestration。

---

### 3. Gateway 实时客户端无法读取工具结果

对应 Issue：  
#10962 https://github.com/zeroclaw-labs/zeroclaw/issues/10962  

用户使用 `/ws/chat` stream 时，只能看到工具开始和结束事件，看不到工具结果 payload。

**用户痛点：**

- 前端或客户端无法实时展示工具返回内容。
- 调试和审计不方便。
- 对构建第三方 UI、IDE 插件或 observability 面板不友好。

---

### 4. Provider 缓存成本和稳定性成为实际问题

对应 PR：  
#10960 https://github.com/zeroclaw-labs/zeroclaw/pull/10960  
#10959 https://github.com/zeroclaw-labs/zeroclaw/pull/10959  

贡献者明确指出 Anthropic cache TTL 固定 5 分钟会导致调用间隔较长时无法复用缓存，并产生额外 cache-write 成本。同时，工具顺序不稳定也会削弱缓存命中率。

**用户痛点：**

- 长间隔调用无法利用 prompt-cache。
- 无法配置或关闭缓存策略。
- 工具顺序不稳定导致“看似相同的请求”无法复用缓存。

---

### 5. Windows 与非 UTF-8 shell 输出体验仍需完善

对应 PR：  
#10954 https://github.com/zeroclaw-labs/zeroclaw/pull/10954  
#10955 https://github.com/zeroclaw-labs/zeroclaw/pull/10955  
#10956 https://github.com/zeroclaw-labs/zeroclaw/pull/10956  

这些 PR 反映出实际用户在跨平台 shell 使用中可能遇到：

- PowerShell 输出编码不一致；
- 非 UTF-8 输出乱码；
- 未显式配置 shell 时默认行为不理想；
- cron、skills、shell tool 之间处理方式不统一。

---

## 8. 待处理积压

> 注：本日报仅基于过去 24 小时数据生成，缺少 Issue/PR 的完整历史时间线，因此无法判断“长期未响应”的全部积压项。以下为今日数据中值得维护者优先关注的待处理项。

### 高优先级待处理

#### #10966 Git `--attr-source` 命令分类安全问题  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10966  
原因：`priority:p1`、`risk:high`、`status:accepted`，且涉及 shell 安全审批。  
建议：尽快分配修复 PR，并补充 Git global option scanner 的回归测试。

---

#### #10963 delegate 子代理 session identity 传递  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10963  
原因：涉及 agent architecture 与 security，风险高。  
建议：维护者先明确设计边界：哪些 identity 可传递、如何防止 prompt 注入或越权继承。

---

#### #10962 gateway `/ws/chat` 缺少 tool result payload  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10962  
原因：影响客户端集成和工具调用可观测性。  
建议：先补充 repro 与协议期望，再判断是否新增 result frame 或扩展 finished frame。

---

### 需要作者继续处理的 PR

#### #10958 channel interruption scope key 边界碰撞修复  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10958  
状态：Open，`needs-author-action`  
建议：作者根据维护者反馈完善实现或测试，因该 PR 涉及 channel core，建议保持审查谨慎。

---

#### #10956 平台默认 shell 检测  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10956  
状态：Open，`needs-author-action`  
建议：重点审查默认 shell 选择是否可能改变安全预期，尤其是 Windows 与 macOS/Linux fallback 行为。

---

#### #10955 shell 输出编码检测  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10955  
状态：Open，`needs-author-action`  
建议：补充多平台、多编码测试，尤其是 cron、skills、shell tool 的一致性。

---

#### #10954 PowerShell 输出初始化为 UTF-8  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10954  
状态：Open，`needs-author-action`  
建议：与 #10955 协调边界，避免重复处理或编码策略冲突。

---

## 项目健康度评估

今日 ZeroClaw 的维护活跃度较高，PR 数量明显多于 Issue 数量，说明贡献者正在主动推进修复和增强。项目当前的主要健康风险集中在三类：**shell/security 审批边界、runtime 稳定性、gateway/delegate 架构一致性**。  
积极信号是，多个问题已经有对应 PR 或明确改进方向，且多数 PR 规模较小，具备快速合并可能。需要警惕的是，高风险安全 Issue #10966 当前尚未看到对应修复 PR，应作为短期维护优先级。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*