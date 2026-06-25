# OpenClaw 生态日报 2026-06-25

> Issues: 12 | PRs: 44 | 覆盖项目: 13 个 | 生成时间: 2026-06-25 01:34 UTC

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

以下是基于你提供的 OpenClaw GitHub 数据整理的 **2026-06-25 项目动态日报**。  
整体判断：**项目今天属于高活跃、强修复导向的一天**，PR 流量很大，且多数集中在稳定性、兼容性和安全边界；但同时也暴露出不少高优先级问题，说明项目仍处在“快速推进 + 持续补洞”的阶段。

---

## 1) 今日速览

过去 24 小时，OpenClaw 共发生 **12 条 Issue 更新**（7 新开/活跃、5 已关闭）和 **44 条 PR 更新**（34 待合并、10 已合并/关闭），并发布了 **1 个新版本**。  
从结构上看，今天的工作重心明显偏向 **数据一致性、模型解析、渠道兼容、网络响应边界限制** 等基础能力，这类修复通常意味着项目正在主动收敛风险面。  
与此同时，仍有较多高优先级的开放 PR 和 Issue，说明当前的主要矛盾不是“没人在做”，而是 **需求/缺陷增量仍然较快，review 与落地压力较大**。  
综合判断：**活跃度很高，健康度中上，但稳定性与回归修复仍是短期主线。**

- 项目主页：https://github.com/openclaw/openclaw

---

## 2) 版本发布

### 新版本
- **v2026.6.11-beta.1**  
  发布页：https://github.com/openclaw/openclaw/releases/tag/v2026.6.11-beta.1

### 已知更新重点
根据你提供的 release 摘要，当前版本最明确的亮点是：

- **更强的 channel 控制能力**
  - Slack relay mode
  - Mattermost 原生 `/oc_queue`
  - 支持 per-DM model overrides  
  对应提及：#94707、#95546、#95120

发布说明中可见的内容偏向 **渠道自动化与调优能力增强**，说明 OpenClaw 正在继续强化“多渠道 AI 助手编排”的核心卖点。

### 破坏性变更 / 迁移注意事项
你提供的 release 摘要里 **没有看到明确列出的 breaking changes**。  
但由于这是 **beta 版本**，建议关注以下迁移/验证点：

1. **Slack / Mattermost 路由逻辑**：确认 relay / queue 机制是否影响现有机器人工作流。
2. **按 DM 覆盖模型配置**：检查是否会覆盖全局模型策略，避免上线后出现模型选择偏差。
3. **自动化脚本兼容性**：如果你依赖 channel-specific 行为，建议先在 staging 验证。

---

## 3) 项目进展

今天值得关注的已关闭/合并类 PR，集中在几个方向：

### A. Cron / 状态持久化修复
- **#96601** / **#96615**：修复 cron failure alert 的 “enabled-with-defaults” 在 store roundtrip 后丢失问题  
  PR 链接：
  - https://github.com/openclaw/openclaw/pull/96601
  - https://github.com/openclaw/openclaw/pull/96615
- 对应 Issue：**#96589**  
  https://github.com/openclaw/openclaw/issues/96589

这类修复对项目很关键，因为它直接关系到 **任务告警可靠性**，属于高价值稳定性补丁。

### B. 模型别名解析修复
- **#96614**：使用 numeric collation 修复模型版本排序
  https://github.com/openclaw/openclaw/pull/96614
- 对应 Issue：**#96588**  
  https://github.com/openclaw/openclaw/issues/96588

这类问题看起来是“小排序 bug”，但实际会影响 **模型 alias 选型是否落到错误版本**，属于高风险的“静默错误”。

### C. Telegram 消息兼容性修复
- **#96613**：rich message 发送失败时回退到纯文本
  https://github.com/openclaw/openclaw/pull/96613
- 对应 Issue：**#96363**（PR 摘要中提及）
  
这类修复直接改善 **可达性**，尤其是 Telegram 对富文本的限制比较敏感，回退机制很重要。

### D. 升级/安装/锁管理类修复
- **#96528**：改进 session write lock 的 reclaim 机制
  https://github.com/openclaw/openclaw/pull/96528

这类底层修复说明项目在继续处理 **并发、恢复、卡死锁** 等基础设施问题。

### E. 边界读取与资源安全
今天虽然多数仍是 open PR，但整体方向非常明确：大量 PR 在做 **response body 读取限流**、**OOM 规避**、**输入/输出边界修复**。  
这说明维护者正在系统性地把外部服务响应从“默认信任”改为“限额读取”，属于非常典型的稳定性加固路线。

### 今日整体推进评价
从数量看，今天至少有 **10 个 PR 处于关闭/合并链路**，说明主线确实在继续前进；  
从质量看，推进的内容大多是 **修复优先级高、回归风险较大** 的问题，项目并非只在做功能堆叠，而是在持续做“地基加固”。

---

## 4) 社区热点

今天最活跃的讨论，主要集中在 **高影响 Bug 报告** 和 **强场景驱动的功能诉求**。

### 热点 Issue 1：Claude CLI headless warm-stdin 丢失会话连续性
- **#96564**  
  https://github.com/openclaw/openclaw/issues/96564  
- 数据：2 条评论，1 个 👍  
- 关注点：会话绑定每轮被 wipe，transcript-flush probe 无法成功，导致 **完整对话上下文丢失**

这显然是一个 **数据/状态一致性核心问题**，而且发生在 headless backend，影响的是自动化和长链路会话场景，风险极高。

### 热点 Issue 2：Google Vertex 最新模型不可识别
- **#96566**  
  https://github.com/openclaw/openclaw/issues/96566  
- 数据：2 条评论，1 个 👍  
- 关注点：升级后识别不了最新 Gemini 模型，直接影响企业用户接入

这条问题背后反映的是 **模型 catalog 更新滞后**，对依赖 Google enterprise AI 的用户影响很直接。

### 热点 Issue 3：Cron 数据跨升级静默丢失
- **#96617**  
  https://github.com/openclaw/openclaw/issues/96617  
- 数据：1 条评论，1 个 👍  
- 严重级别：P0

该问题属于非常典型的 **数据丢失型故障**，属于项目健康度的红线问题，社区关注度虽不高，但业务影响极大。

### 热点 PR 方向
尽管 PR 评论数未提供，但这些 PR 明显处于高关注区：
- **#96503**：OpenAI SSE / JSON 头部错配问题  
  https://github.com/openclaw/openclaw/pull/96503
- **#96393**：Cron command output 保留关键命令输出  
  https://github.com/openclaw/openclaw/pull/96393
- **#96529**：Cron embedded fallback 结果级失败处理  
  https://github.com/openclaw/openclaw/pull/96529

### 背后诉求总结
社区今天最核心的诉求可以概括为一句话：  
**“不要静默失败，不要丢状态，不要让外部 provider/渠道的边界问题影响主流程。”**

---

## 5) Bug 与稳定性

以下按严重程度排序：

### P0：Cron jobs 跨升级静默丢失
- **Issue #96617**  
  https://github.com/openclaw/openclaw/issues/96617  
- 状态：**已关闭**
- 风险：**数据丢失 / 状态丢失 / 消息丢失**
- 是否已有 fix PR：**有**
  - #96601：https://github.com/openclaw/openclaw/pull/96601
  - #96615：https://github.com/openclaw/openclaw/pull/96615

这是今天最应优先关注的稳定性问题，属于会直接影响生产可靠性的故障。

### P1：claude-cli headless warm-stdin 丢失会话连续性
- **Issue #96564**  
  https://github.com/openclaw/openclaw/issues/96564  
- 状态：**开放**
- 风险：**session-state / data-loss**
- 是否已有 fix PR：**未在提供数据中看到**

这是一个高风险的核心会话问题，且发生在 headless backend，影响自动化工作流。

### P1：cron failure alerts restart 后失效
- **Issue #96589**  
  https://github.com/openclaw/openclaw/issues/96589  
- 状态：**已关闭**
- 风险：**message-loss**
- 是否已有 fix PR：**有**
  - #96601：https://github.com/openclaw/openclaw/pull/96601
  - #96615：https://github.com/openclaw/openclaw/pull/96615

### P2：Google Vertex 最新模型识别异常
- **Issue #96566**  
  https://github.com/openclaw/openclaw/issues/96566  
- 状态：**已关闭**
- 风险：**auth-provider / model compatibility**
- 是否已有 fix PR：**未在提供数据中直接看到对应 PR**

### P2：Google Vertex 模型无法通过 openclaw.json 覆盖
- **Issue #96600**  
  https://github.com/openclaw/openclaw/issues/96600  
- 状态：**开放**
- 风险：**配置覆盖失效**
- 是否已有 fix PR：**未看到**

### P2：WebChat 音频附件渲染后滚动位置重置
- **Issue #96593**  
  https://github.com/openclaw/openclaw/issues/96593  
- 状态：**开放**
- 风险：**UX / message display**
- 是否已有 fix PR：**未看到**

### P2：voice-call get_status 找不到已完成会话
- **Issue #96586**  
  https://github.com/openclaw/openclaw/issues/96586  
- 状态：**开放**
- 风险：**session-state / message-loss**
- 是否已有 fix PR：**未看到**

### 已关闭的常规稳定性问题
- **#96610**：移动端聊天消息太窄  
  https://github.com/openclaw/openclaw/issues/96610
- **#96598**：streaming.mode = off 仍输出中间 assistant 文本  
  https://github.com/openclaw/openclaw/issues/96598

这说明今天不仅在修高危问题，也在做一些可见性较强的 UX/行为一致性修复。

---

## 6) 功能请求与路线图信号

今天出现的功能请求，和已有 PR 结合后，能看出几个较明确的路线图信号：

### A. Session archive 文件名应使用本地时区
- **Issue #96611**  
  https://github.com/openclaw/openclaw/issues/96611  

这是一个很典型的 **用户可感知行为修正**：跨时区用户在检索 session 归档时更符合直觉。  
如果后续进入主线，很可能会被视为 **session 管理体验优化**，优先级不低。

### B. Google Vertex 模型动态更新 + 可覆盖
- **Issue #96597**  
  https://github.com/openclaw/openclaw/issues/96597  
  https://github.com/openclaw/openclaw/issues/96588  
- 对应 PR：
  - **#96609** numeric-aware alias resolution  
    https://github.com/openclaw/openclaw/pull/96609

这组需求非常明确地指向：  
**模型 catalog 不能再是静态硬编码，必须支持动态拉取、版本更新和用户覆盖。**  
从 PR #96609 来看，团队已经开始处理 alias 排序这类底层问题，说明这条路线很可能被纳入下一轮版本演进。

### C. Mattermost 私有频道 chat_type 识别
- **Issue #96521**  
  https://github.com/openclaw/openclaw/issues/96521  
- 对应 PR：
  - https://github.com/openclaw/openclaw/pull/96521

这反映了项目在多渠道场景中继续补齐语义一致性，尤其是 **chat_type** 这种影响下游行为分支的字段。

### D. 任务/模型 fallback 行为完善
- **Issue/PR 方向**：
  - **#96529**：cron embedded result-level failures 触发 fallback  
    https://github.com/openclaw/openclaw/pull/96529
  - **#96619**：上游 transport error 也应作为 fallback-worthy  
    https://github.com/openclaw/openclaw/pull/96619

这说明 OpenClaw 的路线图正在往更成熟的 **“故障自动切换”** 方向演进。

### 可能纳入下一版本的信号
若按今天的推进节奏，以下方向最有可能进入下一波版本：
1. **模型解析 / catalog 管理**
2. **cron / 调度可靠性**
3. **Telegram / Mattermost / LINE 等渠道兼容**
4. **安全边界与 unbounded response 读取治理**

---

## 7) 用户反馈摘要

从 Issue 评论和内容里，今天用户真实痛点非常清晰：

### 1. “别丢会话、别丢状态”
- **#96564**：https://github.com/openclaw/openclaw/issues/96564
- **#96617**：https://github.com/openclaw/openclaw/issues/96617
- **#96586**：https://github.com/openclaw/openclaw/issues/96586

用户对 OpenClaw 的期待不是“能跑”，而是 **长时间、多轮、跨重启仍保持一致性**。  
这类场景一旦失败，体验不是局部瑕疵，而是“整个助手不可用”。

### 2. “最新模型要能及时用上”
- **#96566**：https://github.com/openclaw/openclaw/issues/96566
- **#96597**：https://github.com/openclaw/openclaw/issues/96597
- **#96600**：https://github.com/openclaw/openclaw/issues/96600

企业用户对 provider 的要求非常现实：  
**最新模型上线后应尽快可用，且支持自定义覆盖。**  
这说明 OpenClaw 用户群里有一部分是高度依赖前沿模型能力的生产用户。

### 3. “不要让通知/告警静默失效”
- **#96589**：https://github.com/openclaw/openclaw/issues/96589

cron failure alert 在重启后失效，用户的真实感受通常不是“配置丢了”，而是 **我以为在报警，实际上没有报警**。  
这类 silent failure 是最令用户不信任系统的类型。

### 4. “移动端和富媒体也要可用”
- **#96610**：https://github.com/openclaw/openclaw/issues/96610
- **#96593**：https://github.com/openclaw/openclaw/issues/96593
- **#96613**：https://github.com/openclaw/openclaw/pull/96613

用户在手机端阅读消息、或在富媒体消息中处理回复时，对可读性和回退能力很敏感。  
这说明 OpenClaw 不是只在桌面/命令行里用，**真实使用场景已经很“前台化”**。

### 5. “外部服务不稳定时，OpenClaw 也要稳”
- **#96503**、**#96618**、**#96620** 等大量 PR 都在做 response body 限制
- 链接：
  - https://github.com/openclaw/openclaw/pull/96503
  - https://github.com/openclaw/openclaw/pull/96618
  - https://github.com/openclaw/openclaw/pull/96620

用户需求本质上是：  
**不要因为 provider 返回异常内容，就让整个系统 OOM、挂死或行为异常。**

---

## 8) 待处理积压

以下是截至今日仍值得维护者优先关注的高价值积压项：

### 高优先级开放 Issue
1. **#96564** - claude-cli headless warm-stdin 丢失会话连续性  
   https://github.com/openclaw/openclaw/issues/96564  
   - P1，且涉及 data-loss/session-state

2. **#96600** - Google Vertex 模型覆盖失效  
   https://github.com/openclaw/openclaw/issues/96600  
   - 影响模型可配置性与企业用户使用

3. **#96611** - session archive filename 使用本地时区  
   https://github.com/openclaw/openclaw/issues/96611  
   - 体验问题，但对跨时区用户影响真实

4. **#96586** - voice-call get_status 无 fallback  
   https://github.com/openclaw/openclaw/issues/96586  
   - 影响已完成会话的可追溯性

5. **#96593** - WebChat 音频附件渲染后滚动异常  
   https://github.com/openclaw/openclaw/issues/96593  
   - UX 影响明显，属于前台可见问题

### 值得持续盯住的开放 PR
1. **#96619** - upstream transport errors 需要触发 fallback  
   https://github.com/openclaw/openclaw/pull/96619

2. **#96503** - OpenAI SSE / JSON 头部错配修复  
   https://github.com/openclaw/openclaw/pull/96503

3. **#96393** - Cron 输出保留 action-required 命令内容  
   https://github.com/openclaw/openclaw/pull/96393

4. **#96336** - managed state dirs 强制 0o700  
   https://github.com/openclaw/openclaw/pull/96336

5. **#96250** - gateway service 默认 NODE_OPTIONS 扩大内存上限  
   https://github.com/openclaw/openclaw/pull/96250

### 维护提醒
这些积压项有一个共同点：  
它们大多不是“锦上添花”，而是 **稳定性、安全性、可恢复性、可观测性** 的底线建设。  
如果 review 资源有限，建议优先保证：

- **P0/P1 的 data-loss 类问题**
- **fallback / 恢复链路**
- **provider 响应边界限制**
- **模型解析与版本选择正确性**

---

### 总结
今天的 OpenClaw 是一个很典型的“**高强度修 bug、兼顾版本推进**”状态：  
**产出多、问题也多，但方向是健康的——维护者正在把项目往更稳、更可控、更适合生产的方向收敛。**

如果你愿意，我可以继续把这份日报整理成：
1. **适合公众号/内部周报的精简版**  
2. **适合团队例会的要点版**  
3. **按“风险优先级”重新排序的运维关注版**

---

## 横向生态对比

以下报告基于 **2026-06-25 过去 24 小时更新量** 做横向比较，聚焦开源个人 AI 助手 / 自主智能体生态。

---

## 1) 生态全景

整体来看，这一生态已经从“能聊天、能调用模型”进入到“**多渠道编排 + 长会话稳定性 + 权限与可观测性治理**”的阶段。  
今天最明显的共性，不再是单纯堆功能，而是围绕 Telegram / Slack / Mattermost / DingTalk / Signal / WebUI 等真实入口，解决交付、回退、状态保持和安全边界问题。  
同时，多个项目都在补齐 **OIDC、allowlist、fallback、trace、日志、cron、multi-user** 这类平台化能力，说明智能体产品正在向“可运营、可审计、可持续交付”的方向收敛。  
从活跃度看，生态里已经形成了几个第一梯队项目，竞争点不在“有没有做”，而在“谁更稳、谁更适合生产”。

---

## 2) 各项目活跃度对比

> 说明：以下为今日更新量，不是仓库累计总量。

| 项目 | Issues 更新 | PR 更新 | Release 情况 | 健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 12 | 44 | **1 个新版本**：v2026.6.11-beta.1 | **高活跃，健康中上，但修复压力大** |
| **NanoBot** | 7 | 12 | 无 | **高活跃，需求驱动强，安全/兼容修复并行** |
| **Hermes Agent** | 50 | 50 | 无 | **第一梯队高活跃，攻坚期，稳定性问题密集** |
| **PicoClaw** | 1 | 4 | 无 | **中等偏稳，偏修复收敛** |
| **NanoClaw** | 1 | 11 | 无 | **研发活跃，但合并落地偏慢** |
| **NullClaw** | 0 | 0 | 无 | **无活动** |
| **IronClaw** | 14 | 15 | 无 | **高活跃，进入收敛与打磨阶段** |
| **LobsterAI** | 0 | 4 | 无 | **低讨论、持续修补，偏稳定性维护** |
| **TinyClaw** | 0 | 0 | 无 | **无活动** |
| **Moltis** | 0 | 0 | 无 | **无活动** |
| **CoPaw** | 7 | 20 | 无 | **高活跃，需求旺盛，开放 PR 较多** |
| **ZeptoClaw** | 0 | 0 | 无 | **无活动** |
| **ZeroClaw** | 7 | 25 | 无 | **高活跃，但仍处方案推进期，未见落地收口** |

**按今日变动总量粗排：**  
Hermes Agent（100） > OpenClaw（56） > ZeroClaw（32） > IronClaw（29） > CoPaw（27） > NanoBot（19） > NanoClaw（12） > PicoClaw（5） > LobsterAI（4） > 其余无活动。

---

## 3) OpenClaw 在生态中的定位

### 核心优势
- **多渠道编排能力强**：Slack relay、Mattermost `/oc_queue`、per-DM model overrides 等，说明它不是单一聊天机器人，而是偏“渠道中枢”。
- **修复导向明确**：今天大量 PR 聚焦 cron、模型别名排序、Telegram 回退、响应体限流、session lock 等底层稳定性问题，说明项目在主动压风险。
- **已有版本节奏**：相比很多仍处“纯开发态”的项目，OpenClaw 已经有 **beta release**，代表其产品化和发布流程更成熟。
- **问题闭环能力较强**：不少高优先级 Issue 已有对应 PR，说明维护链路较完整。

### 技术路线差异
OpenClaw 的路线不是“单点能力最强”，而是偏向：
1. **多渠道路由与模型策略控制**
2. **稳定性优先的生产化治理**
3. **对外部 provider 边界的收敛**
4. **对静默失败的系统性治理**

这和一些更偏“平台架构先行”或“前端产品体验先行”的项目不同。OpenClaw 更像是在做 **可上线、可运营的 AI 助手编排层**。

### 社区规模对比
按今日活跃度，OpenClaw 属于**第一梯队**，与 **Hermes Agent、ZeroClaw、CoPaw** 同级。  
差异在于：
- **Hermes Agent**：更新更密，故障与修复量更大，偏攻坚态；
- **ZeroClaw**：方案讨论很多，但尚未合并收口，偏架构前置；
- **CoPaw**：开放 PR 较多，需求旺盛，偏生态扩张；
- **OpenClaw**：在高活跃基础上，已有 beta release，**成熟度略高于纯方案推进型项目**。

---

## 4) 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **多渠道兼容与消息一致性** | OpenClaw、NanoBot、Hermes Agent、IronClaw、CoPaw、ZeroClaw | Telegram / Slack / Mattermost / DingTalk / Signal / Discord / WebUI 的消息格式、回退、渲染一致性 |
| **状态保持与静默失败治理** | OpenClaw、Hermes Agent、IronClaw、LobsterAI、CoPaw | session continuity、cron 恢复、reconnect、fallback、避免 message loss / data loss |
| **模型与 provider 兼容** | OpenClaw、NanoBot、PicoClaw、CoPaw、Hermes Agent | OpenAI-compatible、model catalog、alias resolution、provider routing、动态模型更新 |
| **安全与权限边界** | NanoBot、IronClaw、ZeroClaw、OpenClaw | API 认证、allowlist、delegate 边界、OIDC、SOP、工具审批链路 |
| **可观测性与诊断** | Hermes Agent、IronClaw、OpenClaw、ZeroClaw | 日志可见性、trace 传递、失败诊断、progress payload、debug 透明度 |
| **长会话与大数据负载** | CoPaw、Hermes Agent、OpenClaw、LobsterAI | 大会话文件、上下文压缩、response body 限制、OOM 规避、性能退化控制 |

**一句话总结：**  
生态正在从“模型接入”转向“**可靠交付 + 安全治理 + 可观测运营**”。

---

## 5) 差异化定位分析

### 1. OpenClaw
- **功能侧重**：多渠道编排、cron、模型解析、fallback、稳定性治理
- **目标用户**：希望把 AI 助手接入多个 IM / 工作流渠道的生产团队
- **架构特征**：偏中台化、编排层、生产化硬化

### 2. Hermes Agent
- **功能侧重**：Slack / desktop / gateway / observability / provider 回退
- **目标用户**：企业协作场景、桌面端重度用户、需要强可观测性的团队
- **架构特征**：企业集成味更浓，强调“看得见、可诊断”

### 3. ZeroClaw
- **功能侧重**：SOP、OIDC、多用户、delegate 安全边界、goal mode
- **目标用户**：平台级、团队级、企业级 Agent 系统
- **架构特征**：更像下一代平台底座，安全与自治优先

### 4. NanoBot
- **功能侧重**：Telegram/DingTalk/WebUI 兼容、API 安全、webhook/gateway
- **目标用户**：快速接入 IM 通道、轻量部署、开放 API 场景
- **架构特征**：偏轻量网关型助手，工程可用性和安全默认值重要

### 5. NanoClaw
- **功能侧重**：Telegram multi-bot、remote MCP、container 兼容
- **目标用户**：多 bot / 多实例 / 集成型自动化用户
- **架构特征**：强调扩展性和部署适配

### 6. IronClaw
- **功能侧重**：Reborn WebUI、日志、授权、Slack 集成、运行时稳定性
- **目标用户**：需要交互式 WebUI 与企业集成的用户
- **架构特征**：更偏“产品化 UI + 运行时治理”

### 7. PicoClaw
- **功能侧重**：OpenAI-compatible、tool call、GUI/page automation
- **目标用户**：网页自动化、企业后台操作、GUI Agent 研发者
- **架构特征**：浏览器/页面自动化导向，强调与前端状态的兼容

### 8. CoPaw
- **功能侧重**：插件生态、长会话、memory search、OpenAI response format
- **目标用户**：重度使用者、插件开发者、需要扩展生态的团队
- **架构特征**：功能面更广，生态扩展和体验优化并重

### 9. LobsterAI
- **功能侧重**：作为 OpenClaw 下游集成，修复执行链路和输出质量
- **目标用户**：依赖 OpenClaw 的集成型用户
- **架构特征**：偏 downstream 工程整合

---

## 6) 社区热度与成熟度

### 第一梯队：高活跃、快速迭代
- **Hermes Agent**
- **OpenClaw**
- **ZeroClaw**
- **CoPaw**
- **IronClaw**

特征：issues/PR 密集、问题多、修复也快，适合判断为“高速演进期”。

### 第二梯队：活跃但更偏功能收敛
- **NanoBot**
- **NanoClaw**
- **PicoClaw**
- **LobsterAI**

特征：更新量不低，但更像在围绕具体问题打磨，讨论热度和发布节奏较温和。

### 质量巩固阶段较明显
- **OpenClaw**：已有 beta release，明显在做稳定性收敛
- **IronClaw**：PR 收敛明显，偏 Reborn 体验与运行稳定
- **LobsterAI**：少量 PR、少讨论，偏底层兼容修补
- **PicoClaw**：开放 PR 不多，明显以修复为主

### 低活跃/暂停状态
- **NullClaw**
- **TinyClaw**
- **Moltis**
- **ZeptoClaw**

---

## 7) 值得关注的趋势信号

### 1. 智能体产品正在从“会回答”转向“会交付”
代表信号：
- OpenClaw 的 cron / fallback / session 一致性
- Hermes 的 tool progress、reconnect、desktop update flow
- ZeroClaw 的 goal mode、SOP、delegate boundary

**启示：**  
Agent 的核心竞争力已经不是纯模型能力，而是任务执行可靠性。

### 2. 多渠道兼容成为基础设施，不再是附加项
代表项目：
- OpenClaw、NanoBot、Hermes Agent、IronClaw、CoPaw、ZeroClaw

**启示：**  
谁能稳定支持 Telegram / Slack / Mattermost / DingTalk / Signal / Discord / WebUI，谁就更接近生产入口。

### 3. “静默失败”正在成为最不能接受的问题
代表现象：
- 会话丢失、cron 丢失、tool progress 丢失、消息空发、富文本回退失败

**启示：**  
开源智能体项目要把 fallback、重试、回退、状态持久化当成一等公民。

### 4. 安全与权限边界开始前置到产品设计
代表项目：
- NanoBot 的 API auth
- ZeroClaw 的 SOP / OIDC / delegate policy
- IronClaw 的 auth gate / bearer token
- OpenClaw 的安全边界和 response 限流

**启示：**  
Agent 系统不再是单机玩具，默认安全配置和权限治理是竞争门槛。

### 5. 可观测性从“运维附属功能”升级为产品能力
代表项目：
- Hermes Agent 的日志与 progress payload
- IronClaw 的 hosted observability
- ZeroClaw 的工具可见性
- OpenClaw 的错误边界与失败修复

**启示：**  
能否定位“为什么失败”，正在成为用户是否信任 Agent 的关键。

### 6. 长会话、长任务、长记忆成为默认场景
代表项目：
- CoPaw 的大文件会话
- Hermes 的长压缩 / timeout
- OpenClaw 的 session 和 cron
- LobsterAI 的 final answer / snapshot 处理

**启示：**  
下一阶段的竞争点是“长期稳定运行”，不是“单轮演示效果”。

---

如果你愿意，我可以继续把这份分析整理成：
1. **适合汇报的 1 页版 PPT 文案**
2. **适合技术周报的精简版**
3. **带结论优先级的决策摘要版**

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 | 2026-06-25

## 1. 今日速览
过去 24 小时，NanoBot 维持了较高的迭代活跃度：**7 条 Issues 更新、12 条 PR 更新、0 个新版本发布**。从议题分布看，维护重点仍集中在 **Telegram / DingTalk 富消息兼容、WebUI 交互稳定性、语音转写格式兼容、API 安全边界** 等“直接影响可用性”的基础能力上。  
整体来看，项目处于**高活跃、强需求驱动**状态：一方面有已关闭的修复类 PR 推进交付，另一方面新增 PR 数量仍明显高于关闭量，说明社区贡献充足，但也反映出待整合的功能和修复较多。

---

## 3. 项目进展
### 今日已关闭的重要 PR
- **#4487 `[CLOSED] [bug, valid, webui] fix(webui): keep multi-file apply_patch edits`**  
  链接：<https://github.com/HKUDS/nanobot/pull/4487>  
  价值：修复 WebUI 对 `apply_patch` 多文件编辑场景的处理问题，提升了**多文件修改回放、活动摘要和持久化转录**的一致性。对 WebUI 的真实编辑工作流属于较关键的稳定性增强。

- **#4498 `[CLOSED] [invalid] Sync/upstream 2026 06 24`**  
  链接：<https://github.com/HKUDS/nanobot/pull/4498>  
  价值：偏同步维护性质，对用户功能影响较小，但说明仓库仍在保持上游同步和日常整理。

### 今日“推进中的主线”
虽然今日没有新版本发布，但多个开放 PR 已经把后续方向勾勒得很清楚，主要集中在：
- **Telegram 富消息兼容**：#4489、#4495、#4505
- **DingTalk 富文本与超时修复**：#4501
- **WebUI 语音转写与移动端体验**：#4493、#4494
- **平台能力扩展**：#4502（webhook）、#4496（CLI 跨渠道转发）、#4504（skills 子目录）

这表明项目正在从“基础可用”向“多渠道兼容 + 产品化体验”继续推进。

---

## 4. 社区热点
> 说明：当前公开数据里，Issues/PR 的评论热度整体不高；**最高可见评论数仅为 1**，且反应数均为 0。热点主要来自“真实使用中出错”的问题，而不是长讨论型需求。

### 最活跃的讨论点
- **DingTalk 富文本与超时问题** — Issue **#4497**  
  链接：<https://github.com/HKUDS/nanobot/issues/4497>  
  评论数：1  
  诉求：用户在发送文件/图片、richText 场景下遇到 **HTTP 超时** 与 **富文本类型不被支持** 的问题，说明 DingTalk 通道在“消息类型覆盖”和“传输健壮性”上存在短板。

- **Telegram 空消息/富消息兼容问题** — Issue **#4499** / **#4488**  
  链接：<https://github.com/HKUDS/nanobot/issues/4499>  
  链接：<https://github.com/HKUDS/nanobot/issues/4488>  
  评论数：1 / 0  
  诉求：用户希望 Telegram 消息在不同客户端中都能正确显示，但目前出现“空消息”“Web 端不支持”等兼容性回归，说明 **Bot API 10.1 富格式** 对旧客户端/网页端存在明显分裂。

### 相关 PR 形成的讨论面
- <https://github.com/HKUDS/nanobot/pull/4501>  
- <https://github.com/HKUDS/nanobot/pull/4505>  
- <https://github.com/HKUDS/nanobot/pull/4489>  

这些 PR 都围绕 Telegram / DingTalk 的消息格式兼容展开，说明社区当前最关心的是：**“消息能发出去”之外，还要“在各种客户端里正常看见”**。

---

## 5. Bug 与稳定性
按影响面和严重程度排序如下：

### 1) 安全风险：OpenAI-compatible API 在全网卡绑定时缺少认证
- **Issue #4490** — `feat(api): require auth when the OpenAI-compatible API binds to all interfaces`  
  链接：<https://github.com/HKUDS/nanobot/issues/4490>  
  严重性：**高**
  
  风险点：当服务绑定到 `0.0.0.0` 等非 loopback 地址时，如果没有认证保护，可能形成**未授权访问面**。这是典型的安全边界问题，优先级应高于一般功能优化。  
  fix PR：**当前未看到对应修复 PR**。

### 2) WebUI 交互故障：主页发送不跳转、重启后卡住流式输出、停止按钮失效
- **Issue #4500** — `WebUI: Home page send doesn't navigate, self-restart leaves stuck streaming, stop button reports 'No active task to stop'`  
  链接：<https://github.com/HKUDS/nanobot/issues/4500>  
  严重性：**高**
  
  影响：会话流转和停止控制异常，容易让用户感知为“界面卡死”或“任务不可控”，属于直接影响 WebUI 主路径的稳定性问题。  
  fix PR：**当前未看到对应修复 PR**。

### 3) DingTalk 富文本丢失 + HTTP 超时
- **Issue #4497** — `[bug] fix(dingtalk): 支持富文本格式和超时设定`  
  链接：<https://github.com/HKUDS/nanobot/issues/4497>  
  严重性：**中高**
  
  现象：日志中出现 `httpx.ConnectTimeout`，同时 `richText` / `file` 类型消息被判定为不支持。  
  fix PR：**#4501**  
  链接：<https://github.com/HKUDS/nanobot/pull/4501>  

### 4) Telegram Web 富消息回归
- **Issue #4488** — `[bug, regression] telegram web: "This message is not supported on the web version of Telegram"`  
  链接：<https://github.com/HKUDS/nanobot/issues/4488>  
  严重性：**中高**
  
  影响：Android 客户端正常，但 Telegram Web 无法渲染，说明富消息格式与客户端兼容性不足。  
  fix PR：**#4489、#4505**  
  链接：<https://github.com/HKUDS/nanobot/pull/4489>  
  链接：<https://github.com/HKUDS/nanobot/pull/4505>  

### 5) 语音转写失败：WebM → WAV 格式不兼容
- **Issue #4492** — `fix(webui): WebM→WAV conversion for Xiaomi MiMo ASR transcription`  
  链接：<https://github.com/HKUDS/nanobot/issues/4492>  
  严重性：**中**
  
  场景：浏览器默认录音为 WebM/Opus，但 MiMo ASR 仅接受 wav/mp3/mpeg，导致 WebUI 语音转写失败。  
  fix PR：**#4493**  
  链接：<https://github.com/HKUDS/nanobot/pull/4493>  

### 6) Telegram 发送结果为空消息
- **Issue #4499** — `Telegram channel: agent replies sent as empty messages`  
  链接：<https://github.com/HKUDS/nanobot/issues/4499>  
  严重性：**高**
  
  该问题描述为“已生成并发送，但客户端显示空气泡”，属于**内容丢失型故障**。  
  当前状态：**已关闭**，但在本次提供的数据里**未看到明确关联 fix PR**，建议维护者回看关闭原因是否确认为已修复。

---

## 6. 功能请求与路线图信号
当前新增需求呈现出三个明确方向，且部分已经有对应 PR，说明大概率会进入下一阶段迭代：

### A. 平台能力与入口扩展
- **#4502 `Add gateway webhook triggers`**  
  链接：<https://github.com/HKUDS/nanobot/pull/4502>  
  信号：把 gateway 从“聊天通道”进一步扩展为**通用 webhook 入口**，适合接入更多外部事件源，优先级偏高。

- **#4496 `relay cross-channel sends to gateway from CLI agent`**  
  链接：<https://github.com/HKUDS/nanobot/pull/4496>  
  信号：补齐 CLI agent 在跨渠道发送上的能力缺口，对多渠道工作流价值较大。

### B. 体验与可配置性
- **#4504 `support skills in subdirectories`**  
  链接：<https://github.com/HKUDS/nanobot/pull/4504>  
  信号：属于可维护性/组织结构优化，适合中短期落地。

- **#4491 `add workspace Dream prompt override`**  
  链接：<https://github.com/HKUDS/nanobot/pull/4491>  
  信号：反映用户对**工作区级提示词治理**的需求在上升，利于多人协作和个性化配置。

### C. 安全与兼容性
- **#4490 API 认证需求**  
  链接：<https://github.com/HKUDS/nanobot/issues/4490>  
  信号：属于“必须处理”的安全硬需求，即使不是功能型 PR，也更像下一版本的底线能力。

综合判断：**下一个版本大概率会优先纳入“Telegram/DingTalk 兼容修复 + API 安全加固 + WebUI 交互修复”**，其次才是 webhook、skills 组织和 prompt 覆盖等增强项。

---

## 7. 用户反馈摘要
从今天的 Issue 叙述可以看出，用户反馈非常“场景化”，主要痛点如下：

- **多端一致性不足**：  
  用户不是在抽象地讨论“富消息”，而是在关心 **Android 能看、Telegram Web 不能看、DingTalk 会丢格式** 这类真实体验差异。  
  相关链接：<https://github.com/HKUDS/nanobot/issues/4488>、<https://github.com/HKUDS/nanobot/issues/4497>

- **输入输出链路容易断**：  
  语音转写链路中，浏览器录音格式与后端 ASR 限制不匹配，导致“用户已经说话了，但系统识别失败”。  
  相关链接：<https://github.com/HKUDS/nanobot/issues/4492>

- **交互路径要“可控”而不是“能跑”**：  
  WebUI 用户不只要求消息发送成功，还要求**从首页发送时自动进入会话、停止按钮真正生效、重启后不要卡住**。这说明项目已经进入更成熟的产品使用阶段。  
  相关链接：<https://github.com/HKUDS/nanobot/issues/4500>

- **安全边界被用户主动关注**：  
  不是只有维护者在考虑认证问题，用户也已经开始意识到 **对外暴露 API 的风险**。  
  相关链接：<https://github.com/HKUDS/nanobot/issues/4490>

总体上，用户反馈并不追求“更多功能”本身，而是更在意 **跨客户端兼容、默认可用、安全默认值、WebUI 流程闭环**。

---

## 8. 待处理积压
> 说明：本次数据窗口仅覆盖 24 小时，因此**严格意义上的“长期积压”样本不足**。下面列出的是当前仍未形成明显讨论、但优先级较高的 open 项，建议作为下一轮 triage 重点关注。

### 需要尽快分流/确认的 open Issue
- **#4490 API 未认证暴露风险**  
  链接：<https://github.com/HKUDS/nanobot/issues/4490>

- **#4500 WebUI 核心交互卡死问题**  
  链接：<https://github.com/HKUDS/nanobot/issues/4500>

- **#4503 HVTracker trust badge 加入 README**  
  链接：<https://github.com/HKUDS/nanobot/issues/4503>  
  说明：偏文档/信誉展示，优先级低于修复类问题，但属于明确的新需求。

### 已有修复 PR、但建议持续跟踪的 open PR
- **#4501 DingTalk 修复**：<https://github.com/HKUDS/nanobot/pull/4501>  
- **#4505 Telegram Web 兼容开关**：<https://github.com/HKUDS/nanobot/pull/4505>  
- **#4493 MiMo ASR 格式修复**：<https://github.com/HKUDS/nanobot/pull/4493>  
- **#4502 webhook triggers**：<https://github.com/HKUDS/nanobot/pull/4502>  

这些 PR 若在后续 24–48 小时内没有进一步评论/合并动作，建议维护者优先确认测试覆盖与回归风险。

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合直接发到群里的精简版**，或  
2. **适合放入周报/公告的正式版 Markdown**。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-06-25）

## 1. 今日速览
过去 24 小时，Hermes Agent 维持**高强度活跃**：Issues 更新 50 条、PR 更新 50 条，说明项目仍处于密集迭代和修复期。今日没有新版本发布，主要精力集中在**稳定性修复、跨平台消息交付、桌面端体验**和**模型/提供商回退逻辑**上。  
从数据看，项目并非“停滞”，而是典型的**高活跃开源维护态**：问题发现速度快、修复也在快速推进，但 bug/回归类工单占比仍然较高，说明产品在多平台、多后端环境下的鲁棒性仍是当前主战场。

---

## 2. 版本发布
**今日无新 Releases。**

---

## 3. 项目进展
今日有多项高价值 PR 关闭/合并，重点推动了以下方向：

- **桌面端更新体验改善**  
  - PR: [#52210 fix(desktop): surface update progress lines](https://github.com/nousresearch/hermes-agent/pull/52210)  
  - 价值：让桌面端更新界面能实时展示进度，而不是只显示静态文案，提升可观测性与用户感知。

- **Slack 场景增强**
  - PR: [#52219 fix(slack): handle bot alert Block Kit text](https://github.com/nousresearch/hermes-agent/pull/52219)  
  - PR: [#52224 feat(gateway): add slack ingest command entrypoints](https://github.com/nousresearch/hermes-agent/pull/52224)  
  - 价值：加强 Slack 告警消息解析与“历史导入/ingest”入口，说明 Hermes 正在继续强化企业协作场景。

- **Gateway 工具进度可见性**
  - PR: [#52215 Show plugin progress payloads in gateway](https://github.com/nousresearch/hermes-agent/pull/52215)  
  - 价值：把插件/工具的进度反馈更直接地呈现给用户，减少“工具在跑但看不到状态”的黑盒感。

- **桌面崩溃修复**
  - PR: [#52229 fix(desktop): stop refText crash on undefined composer attachment holes](https://github.com/nousresearch/hermes-agent/pull/52229)  
  - 价值：修掉因附件数组空洞导致的桌面白屏/离线问题，是明显的稳定性收益。

- **其他已关闭 PR**
  - [#52219](https://github.com/nousresearch/hermes-agent/pull/52219)  
  - [#52215](https://github.com/nousresearch/hermes-agent/pull/52215)  
  - [#52210](https://github.com/nousresearch/hermes-agent/pull/52210)  
  - [#52224](https://github.com/nousresearch/hermes-agent/pull/52224)  
  - [#52229](https://github.com/nousresearch/hermes-agent/pull/52229)

**整体判断：** 今日“向前推进”的内容主要是**用户可见的可靠性增强**，尤其集中在桌面端、Slack、Gateway 三条链路，属于能直接降低投诉率的修复。

---

## 4. 社区热点
今日最受关注的议题，基本都围绕**消息交付可靠性、跨平台兼容性、模型调用稳定性**展开。

### 热点 Issue 1：移动端输入法导致重复/错误插词
- Issue: [#52110 Dashboard: Mobile autocomplete/autocorrect inserts duplicate or wrong words in input field](https://github.com/nousresearch/hermes-agent/issues/52110)
- 讨论特征：当前评论数最多（2 条）之一。
- 背后诉求：移动端输入体验必须稳定，尤其是自动纠错/联想输入不能破坏消息内容；这类 bug 对聊天类产品影响非常直接。

### 热点 Issue 2：自定义 provider 切换错误（已关闭）
- Issue: [#52003 bug: /model switches provider from custom:xiaomi-token-plan to xiaomi](https://github.com/nousresearch/hermes-agent/issues/52003)
- 讨论特征：同样是高关注问题，已关闭。
- 背后诉求：用户在多 provider/自定义 provider 环境下，需要**模型路由严格保持一致**，不能出现“看似切模型、实际切错 provider”的行为。

### 热点 Issue 3：非可编辑平台工具进度被静默丢弃
- Issue: [#52212 Non-edit platforms silently drop all tool progress](https://github.com/nousresearch/hermes-agent/issues/52212)
- 对应修复 PR：
  - [#52221 fix(gateway): deliver progress in separate mode on non-edit platforms](https://github.com/nousresearch/hermes-agent/pull/52221)
  - [#52222 fix(gateway): allow tool progress on non-edit platforms with separate grouping](https://github.com/nousresearch/hermes-agent/pull/52222)
- 背后诉求：用户在 QQ、微信、Signal、邮件、Webhook 等平台上也希望看到工具执行进度；“静默丢失”会让代理看起来像卡死。

### 热点 Issue 4：Discord 心跳受阻
- Issue: [#52197 gateway cross-process agent-cache invalidation stalls the event loop](https://github.com/nousresearch/hermes-agent/issues/52197)
- 背后诉求：对实时平台而言，事件循环阻塞会直接导致心跳异常、连接不稳定，是高优先级生产问题。

### 热点 Issue 5：Anthropic 双次压缩后请求 400
- Issue: [#52160 bug(adapter): HTTP 400 after double context compression](https://github.com/nousresearch/hermes-agent/issues/52160)
- 背后诉求：长上下文、长会话压缩是现实生产场景，一旦压缩后消息结构不符合供应商要求，整个会话链路就会崩。

**社区热度结论：** 今天的“热点”并不是单纯功能讨论，而是明显偏向**生产可用性**：输入不准、消息丢失、连接中断、provider 路由错误、长会话失败。

---

## 5. Bug 与稳定性
以下按严重程度排列，并标注是否已有 fix PR。

### P1 / 高风险
1. **Discord 心跳与事件循环阻塞**
   - Issue: [#52197](https://github.com/nousresearch/hermes-agent/issues/52197)
   - 风险：缓存失效清理在锁内执行，可能阻塞 asyncio loop，触发 Discord heartbeat 问题。
   - 状态：**暂无明确 fix PR**

### P2 / 影响生产可用性
2. **非编辑平台静默丢失工具进度**
   - Issue: [#52212](https://github.com/nousresearch/hermes-agent/issues/52212)
   - Fix PR: [#52221](https://github.com/nousresearch/hermes-agent/pull/52221), [#52222](https://github.com/nousresearch/hermes-agent/pull/52222)
   - 影响：QQ、微信、Signal、Webhook、Email 等平台上工具执行“无反馈”。

3. **BrokenPipe/ConnectionReset 等未触发连接池重建**
   - Issue: [#52216](https://github.com/nousresearch/hermes-agent/issues/52216)
   - Fix PR: [#52226](https://github.com/nousresearch/hermes-agent/pull/52226), [#52227](https://github.com/nousresearch/hermes-agent/pull/52227)
   - 影响：传输层恢复不完整，可能导致后续调用持续失败。

4. **推理模型被错误的 stale timeout 杀死**
   - Issue: [#52217](https://github.com/nousresearch/hermes-agent/issues/52217)
   - Fix PR: [#52231](https://github.com/nousresearch/hermes-agent/pull/52231)
   - 影响：o1/o3、DeepSeek R1、Nemotron、QwQ 等长思考模型容易超时中断。

5. **Anthropic 双次压缩后请求结构错误**
   - Issue: [#52160](https://github.com/nousresearch/hermes-agent/issues/52160)
   - 状态：**暂无明确 fix PR**
   - 影响：长会话场景下直接 HTTP 400，属于会话稳定性问题。

6. **点击“Update now”后网关/桌面同时宕机**
   - Issue: [#52218](https://github.com/nousresearch/hermes-agent/issues/52218)
   - 状态：**暂无明确 fix PR**
   - 影响：更新流程有潜在全局中断风险。

7. **桌面 cron 与 gateway 竞态导致任务挂起**
   - Issue: [#52202](https://github.com/nousresearch/hermes-agent/issues/52202)
   - 状态：**暂无明确 fix PR**
   - 影响：同一 HERMES_HOME 下双调度器抢占，可能让消息投递卡到 timeout。

### P3 / 体验与兼容性问题
8. **移动端输入法联想插词错误**
   - Issue: [#52110](https://github.com/nousresearch/hermes-agent/issues/52110)
   - 状态：暂无明确 fix PR

9. **Windows 桌面端中文乱码**
   - Issue: [#52013](https://github.com/nousresearch/hermes-agent/issues/52013)
   - 状态：暂无明确 fix PR

10. **Telegram channel 附件被静默丢弃**
   - Issue: [#52126](https://github.com/nousresearch/hermes-agent/issues/52126)
   - 状态：暂无明确 fix PR

11. **Feishu Markdown table 导致整条消息降级为纯文本**
   - Issue: [#52046](https://github.com/nousresearch/hermes-agent/issues/52046)
   - 状态：暂无明确 fix PR

12. **Delegated child 超过 timeout**
   - Issue: [#52185](https://github.com/nousresearch/hermes-agent/issues/52185)
   - 状态：暂无明确 fix PR

### 已关闭/已修复信号
- [#52003](https://github.com/nousresearch/hermes-agent/issues/52003) 已关闭：自定义 provider 切换错误
- [#52158](https://github.com/nousresearch/hermes-agent/issues/52158) 已关闭：流式输出中 code fence 被破坏
- [#52210](https://github.com/nousresearch/hermes-agent/pull/52210) 已关闭：桌面更新进度显示

---

## 6. 功能请求与路线图信号
今日新出现/持续升温的功能诉求，能清晰看出 Hermes 的路线图正在向**多平台可用性、可观测性、企业集成**收敛。

### 明显的功能诉求
- **俄语本地化**
  - Issue: [#52137 Add Russian localization](https://github.com/nousresearch/hermes-agent/issues/52137)
  - 信号：UI 国际化需求开始显著增长，说明产品使用面在扩张。

- **Kanban 依赖可点击化**
  - Issue: [#52068 clickable links to parent and child dependencies](https://github.com/nousresearch/hermes-agent/issues/52068)
  - 信号：用户已经在把 Hermes 当作“任务编排/项目管理界面”在用。

- **web_extract 空结果的可选处理**
  - Issue: [#52120 Optional handling for empty web_extract results](https://github.com/nousresearch/hermes-agent/issues/52120)
  - 信号：用户希望工具失败能“优雅退化”，而不是把空结果当成功处理。

- **W3C traceparent 传播到 MCP**
  - Issue: [#52211 Propagate W3C traceparent headers to MCP servers](https://github.com/nousresearch/hermes-agent/issues/52211)
  - 信号：可观测性正在成为一等需求，尤其面向分布式 tracing。

- **Gusto 自动化/集成**
  - Issue: [#52146 Gusto not available for automation/integration](https://github.com/nousresearch/hermes-agent/issues/52146)
  - 信号：企业 HR/Payroll 场景正在出现，但受 API 访问限制。

### 与已有 PR 的路线图联动
以下方向很可能优先进入下一版或最近几个版本：
- [#52221](https://github.com/nousresearch/hermes-agent/pull/52221) / [#52222](https://github.com/nousresearch/hermes-agent/pull/52222)：非编辑平台工具进度
- [#52226](https://github.com/nousresearch/hermes-agent/pull/52226) / [#52227](https://github.com/nousresearch/hermes-agent/pull/52227)：传输恢复
- [#52230](https://github.com/nousresearch/hermes-agent/pull/52230) / [#52233](https://github.com/nousresearch/hermes-agent/pull/52233)：explicit auxiliary rate limit fallback
- [#52231](https://github.com/nousresearch/hermes-agent/pull/52231)：长思考模型超时调整
- [#52232](https://github.com/nousresearch/hermes-agent/pull/52232)：`/learn` 命令路径修复

**判断：** 下一版本最可能优先收录的是**稳定性修复 + 进度可见性 + Slack/桌面端体验**，其次才是纯功能扩展和本地化。

---

## 7. 用户反馈摘要
从今日 Issues 的内容来看，用户反馈呈现出几个非常一致的真实痛点：

1. **“看得见”比“能跑”更重要**
   - 代表问题：[#52212](https://github.com/nousresearch/hermes-agent/issues/52212)、[#52215](https://github.com/nousresearch/hermes-agent/pull/52215)
   - 用户不接受工具在后台工作却没有反馈，尤其在非可编辑平台上。

2. **跨平台输入/渲染一致性很脆弱**
   - 代表问题：[#52110](https://github.com/nousresearch/hermes-agent/issues/52110)、[#52013](https://github.com/nousresearch/hermes-agent/issues/52013)
   - 移动端自动纠错、Windows 编码、桌面输入框都在暴露“最后一公里”问题。

3. **多 provider 场景下，路由必须可预期**
   - 代表问题：[#52003](https://github.com/nousresearch/hermes-agent/issues/52003)、[#52228](https://github.com/nousresearch/hermes-agent/issues/52228)
   - 用户在意的是“调用哪家模型”是否稳定，而不是仅仅“有 fallback”。

4. **企业/协作平台要求高可靠交付**
   - 代表问题：[#52126](https://github.com/nousresearch/hermes-agent/issues/52126)、[#52046](https://github.com/nousresearch/hermes-agent/issues/52046)、[#52197](https://github.com/nousresearch/hermes-agent/issues/52197)
   - 只要附件、Block Kit、心跳、消息投递有一个环节出问题，就会显著影响整体体验。

**总体情绪：** 用户对 Hermes 的多平台能力是认可的，但对“稳定、可解释、可追踪”的要求很高；任何 silent failure 都会被迅速放大。

---

## 8. 待处理积压
以下是今日值得维护者优先关注的未闭环问题（当前尚无明确 fix PR，且影响面较大）：

- [#52197](https://github.com/nousresearch/hermes-agent/issues/52197) Discord 心跳阻塞风险（P1）
- [#52160](https://github.com/nousresearch/hermes-agent/issues/52160) Anthropic 双次压缩后 400
- [#52218](https://github.com/nousresearch/hermes-agent/issues/52218) 更新后网关/桌面中断
- [#52202](https://github.com/nousresearch/hermes-agent/issues/52202) 桌面 cron 与 gateway 竞态
- [#52179](https://github.com/nousresearch/hermes-agent/issues/52179) Bedrock Guardrails 未生效
- [#52149](https://github.com/nousresearch/hermes-agent/issues/52149) Main agent 的 web/browser 工具失败
- [#52126](https://github.com/nousresearch/hermes-agent/issues/52126) Telegram channel 附件丢失
- [#52013](https://github.com/nousresearch/hermes-agent/issues/52013) Windows 中文乱码
- [#52185](https://github.com/nousresearch/hermes-agent/issues/52185) delegated child 超时越界

**建议：**
- 先处理会影响心跳、消息投递、会话完整性的 P1/P2 问题；
- P3 体验类问题可合并进后续版本的兼容性修复批次；
- 对已出现对应 PR 的问题，建议尽快完成测试与回归验证，缩短从 issue 到稳定发布的闭环时间。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合团队周报/晨会的简版**，或  
2. **适合直接发布到 GitHub Discussions / Notion 的 Markdown 版**。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-06-25）

## 1. 今日速览
今天 PicoClaw 的仓库活跃度属于**中等偏高，但以修复型工作为主**：过去 24 小时内没有新版本发布，说明尚未进入对外交付节奏。社区层面仅有 1 条 Issue 变动且已关闭，表明用户侧讨论量不大，但问题导向清晰。代码侧则有 4 条 PR 持续开放，且全部集中在 OpenAI 兼容、日志、错误处理和调度优化等基础能力上，反映出项目当前正处在**打磨稳定性与兼容性**阶段。整体来看，项目健康度较稳，但“合并落地”进展暂时不明显，更多是等待审查与集成。  
相关链接：  
- Issue #3167：https://github.com/sipeed/picoclaw/issues/3167  
- PR #3165：https://github.com/sipeed/picoclaw/pull/3165  
- PR #3166：https://github.com/sipeed/picoclaw/pull/3166  
- PR #3168：https://github.com/sipeed/picoclaw/pull/3168  
- PR #3169：https://github.com/sipeed/picoclaw/pull/3169  

## 2. 版本发布
**今日无新版本发布。**  
相关链接：  
- Releases：https://github.com/sipeed/picoclaw/releases

## 3. 项目进展
今日**没有重要 PR 合并或关闭**，因此代码层面的“已落地推进”有限；不过从新增/活跃 PR 的内容看，项目正在集中修复影响体验和可用性的关键问题。

- **PR #3165：恢复 Seed XML tool calls 解析**
  - https://github.com/sipeed/picoclaw/pull/3165
  - 作用：让 OpenAI-compatible 返回中的 `seed:tool_call` XML 块能被还原为结构化 tool calls，并避免泄漏到用户可见内容。
  - 价值：提升工具调用兼容性，尤其对接多家模型供应商时更稳。

- **PR #3166：修复 openai_compat 的日志调用导致构建失败**
  - https://github.com/sipeed/picoclaw/pull/3166
  - 作用：将错误的 `log.Printf` 替换为包内结构化 logger，解决 `undefined: log` 的编译问题。
  - 价值：这是一个**直接影响构建成功率**的修复，优先级很高。

- **PR #3168：处理模型列表接口中的错误响应读取失败**
  - https://github.com/sipeed/picoclaw/pull/3168
  - 作用：当非 200 响应体无法读取时，返回真实读取错误，避免空错误或误导性 HTTP 提示。
  - 价值：提升故障可诊断性，减少排障成本。

- **PR #3169：heartbeat 场景跳过 evolution cold path**
  - https://github.com/sipeed/picoclaw/pull/3169
  - 作用：避免心跳轮次触发不必要的 evolution 冷路径与 token 消耗。
  - 价值：优化成本与调度效率，属于稳定性/资源优化类改进。

**整体推进判断：**  
今天的推进更多体现在“修复与打底”，而不是新增功能落地；如果这些 PR 逐步合并，项目在兼容性、构建稳定性和运行成本方面会有明显提升。  
相关链接：  
- PR #3165：https://github.com/sipeed/picoclaw/pull/3165  
- PR #3166：https://github.com/sipeed/picoclaw/pull/3166  
- PR #3168：https://github.com/sipeed/picoclaw/pull/3168  
- PR #3169：https://github.com/sipeed/picoclaw/pull/3169  

## 4. 社区热点
今天没有出现高评论量或高反应量的讨论；从可见数据看，**社区热点主要集中在用户对 MVVM 框架适配的疑问**，其次是开发侧对兼容性与稳定性的连续修复。

- **热点 Issue：#3167 - 咨询 PageAgent 是否有针对 Vue 等 MVVM 架构的适配方案或规划？**
  - https://github.com/sipeed/picoclaw/issues/3167
  - 讨论指向：企业后台项目中的 Vue 2 + Element UI 场景，页面大量依赖 `v-model`、组件 state、watcher 等机制，用户担心“仅操作 DOM”的 GUI Agent 难以准确覆盖框架内部状态。
  - 背后诉求：希望 PageAgent 不只是“看得见、点得到”，而是能更好理解和影响现代前端框架中的**数据流与状态流**。

- **开发侧潜在热点：PR #3165 / #3166 / #3168 / #3169**
  - https://github.com/sipeed/picoclaw/pull/3165
  - https://github.com/sipeed/picoclaw/pull/3166
  - https://github.com/sipeed/picoclaw/pull/3168
  - https://github.com/sipeed/picoclaw/pull/3169
  - 这些 PR 虽未体现出评论活跃，但从主题看，说明仓库当前最受关注的不是“新能力”，而是**兼容性、编译稳定性、错误可观测性和成本控制**。

## 5. Bug 与稳定性
今日未见新增“崩溃类 Issue”，但有 4 个修复型 PR 直接指向稳定性问题。按影响严重度排序如下：

1. **构建失败修复：PR #3166**
   - https://github.com/sipeed/picoclaw/pull/3166
   - 问题：`openai_compat` 中错误使用 `log.Printf` 导致 `undefined: log` 构建失败。
   - 严重程度：**高**，因为会阻断编译与交付。
   - 状态：已有 fix PR，等待合并。

2. **错误响应读取失败：PR #3168**
   - https://github.com/sipeed/picoclaw/pull/3168
   - 问题：当模型列表请求返回非 200 且错误体读取失败时，错误信息可能空洞或误导。
   - 严重程度：**中高**，影响排障效率和服务稳定性判断。
   - 状态：已有 fix PR，等待合并。

3. **Tool call 解析兼容问题：PR #3165**
   - https://github.com/sipeed/picoclaw/pull/3165
   - 问题：OpenAI-compatible 响应中的 Seed XML tool calls 需要恢复为结构化调用，避免内容泄漏。
   - 严重程度：**中**，主要影响工具调用正确性与跨模型兼容。
   - 状态：已有 fix PR，等待合并。

4. **Heartbeat 资源浪费：PR #3169**
   - https://github.com/sipeed/picoclaw/pull/3169
   - 问题：heartbeat turn 不应触发 evolution cold path，避免额外 token 消耗。
   - 严重程度：**中**，偏性能/成本优化。
   - 状态：已有 fix PR，等待合并。

补充说明：  
- 现有公开数据中，今日没有新增崩溃型 Issue。  
- 但从 PR 主题看，项目仍处于“修复细节、提升稳健性”的连续迭代阶段。  
相关链接：  
- PR #3165：https://github.com/sipeed/picoclaw/pull/3165  
- PR #3166：https://github.com/sipeed/picoclaw/pull/3166  
- PR #3168：https://github.com/sipeed/picoclaw/pull/3168  
- PR #3169：https://github.com/sipeed/picoclaw/pull/3169  

## 6. 功能请求与路线图信号
今天最明确的功能需求来自 **Issue #3167**：  
- https://github.com/sipeed/picoclaw/issues/3167

### 需求信号
用户希望 PageAgent 对 **Vue / MVVM 架构** 有更好的适配或规划，而不仅仅依赖 DOM 级别操作。这个信号说明：
- 目标用户已开始把 PicoClaw 放到真实企业后台系统中验证；
- 需求从“能自动化”升级为“能理解框架状态并稳定执行”；
- 产品路线可能需要考虑更深层的页面语义识别、组件状态交互、框架事件链路理解。

### 与现有 PR 的关联判断
- **PR #3165**（tool call 兼容）与该需求间接相关：说明项目在增强多模型/多供应商适配能力；
- **PR #3166 / #3168** 体现出工程层面在补齐稳定性和可观测性，这通常是进入更复杂企业场景前的必要步骤；
- 因此，**Vue/MVVM 适配**较可能进入下一阶段路线图，但从当前数据看，尚未看到正式实现 PR。

相关链接：  
- Issue #3167：https://github.com/sipeed/picoclaw/issues/3167  
- PR #3165：https://github.com/sipeed/picoclaw/pull/3165  
- PR #3166：https://github.com/sipeed/picoclaw/pull/3166  
- PR #3168：https://github.com/sipeed/picoclaw/pull/3168  

## 7. 用户反馈摘要
从 Issue #3167 的内容，可以提炼出真实用户反馈如下：

- **使用场景**：Vue 2 + Element UI 的企业管理后台。  
  - 链接：https://github.com/sipeed/picoclaw/issues/3167

- **用户认可的点**：  
  - 认可 PageAgent 作为“客户端网页增强型 GUI Agent”的方向；
  - 认为它对业务系统辅助操作、网页自动化验证很有价值。

- **用户痛点**：  
  - 现有实现更偏向页面 DOM 操作，但企业后台依赖 `v-model`、组件 state、watcher、事件总线等机制；
  - 如果只操作 DOM，可能无法准确驱动 Vue 组件状态或保证动作生效。

- **用户关注点**：  
  - 是否有针对 MVVM 的适配方案；
  - 是否有明确的后续规划；
  - 是否能支持更高可靠性的企业后台操作场景。

- **满意/不满意倾向**：  
  - 满意：方向正确，定位清晰；
  - 不满意/担忧：框架内状态难以覆盖，导致自动化效果不稳定。

总体来看，这类反馈说明 PicoClaw 已经触达“真实业务系统自动化”需求，但产品能力仍需要向**框架感知与状态驱动**进一步演进。  
相关链接：  
- Issue #3167：https://github.com/sipeed/picoclaw/issues/3167  

## 8. 待处理积压
当前快照中**没有明显的长期未响应旧 Issue**，但存在 4 个当天新增且仍处于开放状态的 PR，构成了短期积压核心。建议维护者优先按以下顺序关注：

1. **PR #3166 — 构建失败修复**
   - https://github.com/sipeed/picoclaw/pull/3166
   - 原因：阻断构建，优先级最高。

2. **PR #3168 — 错误响应读取失败修复**
   - https://github.com/sipeed/picoclaw/pull/3168
   - 原因：提升错误可观测性，对排障重要。

3. **PR #3165 — Seed XML tool calls 兼容修复**
   - https://github.com/sipeed/picoclaw/pull/3165
   - 原因：影响工具调用链路，可能涉及模型兼容面。

4. **PR #3169 — heartbeat 冷路径优化**
   - https://github.com/sipeed/picoclaw/pull/3169
   - 原因：偏优化项，可在核心稳定修复后合入。

补充：  
- **Issue #3167** 已关闭，说明至少一项用户咨询已得到处理；  
- 但从路线图视角看，MVVM 适配问题可能会继续以新 issue 或讨论形式出现，值得持续跟踪。  
相关链接：  
- PR #3166：https://github.com/sipeed/picoclaw/pull/3166  
- PR #3168：https://github.com/sipeed/picoclaw/pull/3168  
- PR #3165：https://github.com/sipeed/picoclaw/pull/3165  
- PR #3169：https://github.com/sipeed/picoclaw/pull/3169  
- Issue #3167：https://github.com/sipeed/picoclaw/issues/3167  

---

如果你愿意，我也可以把这份日报进一步整理成**适合群发的简版**，或者输出成**JSON / Markdown 模板**方便自动化发布。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-06-25）

## 1) 今日速览
过去 24 小时，NanoClaw 呈现出“**高 PR 活跃、低社区互动**”的状态：共更新 11 条 PR、1 条 Issue，但没有新版本发布，说明项目今天主要在做功能扩展与修复收敛，而不是发布节奏推进。  
从 PR 主题看，重点集中在 **Telegram 多实例、远程 MCP、容器兼容、Signal 群消息路由、测试稳定性、OpenCode 参数修复** 等方向，覆盖面较广，显示项目仍处于持续扩张和打磨阶段。  
唯一新 Issue 也指向 **Telegram multi-bot** 的回归/缺失问题，说明用户对多机器人支持的需求很强。  
整体来看，项目研发活跃度高，但**讨论热度和合并转化率偏低**：10 个 PR 仍在 open，1 个 PR 关闭，尚未形成可发布版本的收敛态。  
相关链接：[Issue #2852](https://github.com/qwibitai/nanoclaw/issues/2852) / [PR #2853](https://github.com/qwibitai/nanoclaw/pull/2853) / [PR #2854](https://github.com/qwibitai/nanoclaw/pull/2854)

---

## 2) 版本发布
今日**无新版本发布**，因此本节省略。

---

## 3) 项目进展
今天最明确的“收敛动作”是 **PR #2849 被关闭**，同类能力随后由新的 PR 继续推进，说明维护者/贡献者正在对 Telegram 多 bot 方案进行实现路径整理，而不是简单叠加补丁。  
此外，虽然多数 PR 尚未合并，但这些更新已将项目推进到多个关键层面：  
- **Telegram 多实例能力**：围绕 `TELEGRAM_BOT_TOKEN_<SUFFIX>` 的支持正在形成方案链路  
- **容器/跨平台兼容**：macOS、Docker-in-Docker、CA 挂载等问题被集中处理  
- **协议与集成扩展**：远程 MCP、Matrix 原生适配等方向继续增强 NanoClaw 的连接能力  
- **稳定性修复**：测试 poll loop、Signal 群消息标记、OpenCode 参数传递等问题进入修复阶段  

从“项目整体向前迈进多少”来看，今天更像是 **把多个真实使用场景从“能跑”推进到“可维护、可扩展”** 的一天，但由于绝大多数 PR 仍未合并，进展更多体现在“方案成熟度提升”，而非“版本落地”。  
相关链接：[PR #2849](https://github.com/qwibitai/nanoclaw/pull/2849) / [PR #2853](https://github.com/qwibitai/nanoclaw/pull/2853) / [PR #2854](https://github.com/qwibitai/nanoclaw/pull/2854)

---

## 4) 社区热点
今天**没有明显的高评论或高点赞热点**：最新 Issue 与 PR 的评论数均为 0 或未提供，说明社区互动主要仍停留在提交层面，而非讨论层面。  
但从内容重要性看，最值得关注的“潜在热点”是 **Telegram multi-bot**：  
- 用户在 Issue #2852 里明确询问“多 bot 支持是否还会实现”  
- 对应功能又在 PR #2853 中被重新提出，表明这是一个正在被社区持续追问的需求  
- 该需求背后反映的是 **多账号、多角色、多机器人并行运营** 场景，属于高价值集成能力  

另一个值得关注但互动不高的条目是 **macOS / Rancher Desktop 下 CA 挂载导致 API 连接失败** 的 PR #2854，这类问题通常会直接影响可用性，但当前没有评论数据说明讨论尚未展开。  
相关链接：[Issue #2852](https://github.com/qwibitai/nanoclaw/issues/2852) / [PR #2853](https://github.com/qwibitai/nanoclaw/pull/2853) / [PR #2854](https://github.com/qwibitai/nanoclaw/pull/2854)

---

## 5) Bug 与稳定性
本日没有新增“明确的 bug issue”，但有多条**修复型 PR**暴露出当前的稳定性关注点。按严重程度建议如下：

### 1. 高严重度：macOS / 容器环境 API 连接失败
- **PR #2854**：`fix(onecli): redirect TMPDIR so gateway CA mounts into containers on macOS`
- 问题描述：在 macOS + Rancher Desktop / Apple `container` 场景下，代理 CA 无法正确挂载，导致所有 agent API 调用失败
- 影响：直接阻断 API 调用，属于**可用性级别问题**
- 状态：已有修复 PR，但仍为 open  
链接：[PR #2854](https://github.com/qwibitai/nanoclaw/pull/2854)

### 2. 中高严重度：Docker-in-Docker / 群组权限问题
- **PR #2846**：`fix(container-runner): support Docker-in-Docker agent groups`
- 问题描述：容器内需要精确挂载 docker.sock，并处理 group 权限
- 影响：会阻碍容器组内使用 Docker 能力，影响部署与扩展场景
- 状态：已有修复 PR，但仍为 open  
链接：[PR #2846](https://github.com/qwibitai/nanoclaw/pull/2846)

### 3. 中等严重度：测试 poll loop 互相抢消息，导致回归不稳定
- **PR #2851**：`fix(test): stop abandoned poll loops from stealing later tests' messages`
- 问题描述：测试辅助循环未在 timeout 时正确停止，后续测试消息被“抢走”
- 影响：影响测试可靠性，容易制造假阴性/假阳性
- 状态：已有修复 PR，但仍为 open  
链接：[PR #2851](https://github.com/qwibitai/nanoclaw/pull/2851)

### 4. 中等严重度：Signal 群消息缺少路由标记
- **PR #2850**：`fix(signal): set isMention and isGroup on inbound group messages`
- 问题描述：群消息缺少 `isMention` / `isGroup`，路由器无法区分定向消息和群噪声
- 影响：会导致群聊自动化判断失真
- 状态：已有修复 PR，但仍为 open  
链接：[PR #2850](https://github.com/qwibitai/nanoclaw/pull/2850)

### 5. 低到中等严重度：OpenCode / SQLite CLI 参数透传问题
- **PR #2848**：`fix(opencode): cwd and .env fallback for provider/model env vars`
- **PR #2845**：`fix: forward positional params in q.ts`
- 影响：会影响配置解析与参数化查询，偏功能正确性与可维护性
- 状态：已有修复 PR，但仍为 open  
链接：[PR #2848](https://github.com/qwibitai/nanoclaw/pull/2848) / [PR #2845](https://github.com/qwibitai/nanoclaw/pull/2845)

---

## 6) 功能请求与路线图信号
今天的功能信号非常清晰，且不少需求已经从“讨论”进入“实现草案”：

### 最可能进入下一版本的需求
1. **Telegram 多 bot / 多实例支持**
   - 直接来自用户 Issue #2852
   - 对应实现 PR #2853 已出现
   - 这是当前最强的路线图信号，优先级很可能较高  
   链接：[Issue #2852](https://github.com/qwibitai/nanoclaw/issues/2852) / [PR #2853](https://github.com/qwibitai/nanoclaw/pull/2853)

2. **远程 MCP Server 支持**
   - PR #2847 提出支持 URL-based remote MCP
   - 这会明显扩展 NanoClaw 的生态连接能力，符合“多源集成”路线  
   链接：[PR #2847](https://github.com/qwibitai/nanoclaw/pull/2847)

3. **Signal / Telegram 等消息通道的可用性增强**
   - PR #2850、#2853 都属于高频使用通道的增强
   - 说明项目在“主流 IM 集成”上的投入仍在加码  
   链接：[PR #2850](https://github.com/qwibitai/nanoclaw/pull/2850) / [PR #2853](https://github.com/qwibitai/nanoclaw/pull/2853)

4. **容器与跨平台可部署性**
   - PR #2854、#2846 说明项目正持续修复本地/容器部署摩擦
   - 这类能力通常会优先进入维护版本  
   链接：[PR #2854](https://github.com/qwibitai/nanoclaw/pull/2854) / [PR #2846](https://github.com/qwibitai/nanoclaw/pull/2846)

### 中长期路线图信号
- **Matrix 原生持久化 E2EE 适配器**：PR #2844，属于较大体量基础设施升级  
  链接：[PR #2844](https://github.com/qwibitai/nanoclaw/pull/2844)
- **/learn skill**：PR #2843，表明项目仍在推进 AI agent 能力的“技能化”封装  
  链接：[PR #2843](https://github.com/qwibitai/nanoclaw/pull/2843)

---

## 7) 用户反馈摘要
由于今日 Issue / PR 评论数几乎为 0，**没有形成可提炼的评论型共识**；但从 Issue 正文中，仍能读出很明确的用户痛点：

### 真实痛点 1：多 bot 支持曾存在、后来消失
- 用户在 Issue #2852 中明确表示“we had it, and then it got removed”
- 这说明用户感知到的是**功能回退/能力丢失**，不是单纯的新需求
- 用户还提到 “Claude cannot get it to work”，意味着当前文档或实现路径对用户不够友好  
链接：[Issue #2852](https://github.com/qwibitai/nanoclaw/issues/2852)

### 真实痛点 2：功能说明与实际体验不一致
- 同一 Issue 中提到“it’s said that there is ‘instance’ support, but Claude cannot get it to work”
- 这通常意味着**文档、配置样例、实际代码行为之间存在落差**
- 用户最后问 “Or do we need to look elsewhere?”，反映出一定的流失风险  
链接：[Issue #2852](https://github.com/qwibitai/nanoclaw/issues/2852)

### 真实痛点 3：容器/平台兼容性会直接影响使用可行性
- PR #2854 所描述的 macOS + Rancher Desktop 场景中，API 调用直接失败
- 这类反馈表明用户希望 NanoClaw 能在主流开发环境中“开箱即用”  
链接：[PR #2854](https://github.com/qwibitai/nanoclaw/pull/2854)

---

## 8) 待处理积压
当前数据窗口内**没有足够信息证明存在“长期未响应”的老积压项**；不过从今日新增内容看，以下条目值得维护者尽快处理，因为它们要么是高价值需求，要么是高影响修复：

### 优先级最高：Telegram multi-bot 需求
- **Issue #2852**：用户明确追问是否会重新实现多 bot 支持，且当前无评论回应
- 这是最接近“产品方向确认”的待办，建议尽快给出明确答复（会做 / 不做 / 预计时间）  
链接：[Issue #2852](https://github.com/qwibitai/nanoclaw/issues/2852)

### 高价值待审：与该需求对应的实现 PR
- **PR #2853**：多 bot 实现方案已提交，但仍处 open
- 若能快速 review，将直接缓解用户对功能回归的焦虑  
链接：[PR #2853](https://github.com/qwibitai/nanoclaw/pull/2853)

### 影响可用性的修复 PR
- **PR #2854**、**PR #2846**：分别对应 macOS 容器 CA 挂载与 Docker-in-Docker 权限问题
- 这类问题一旦不处理，会直接影响部署与调用成功率  
链接：[PR #2854](https://github.com/qwibitai/nanoclaw/pull/2854) / [PR #2846](https://github.com/qwibitai/nanoclaw/pull/2846)

---

## 总体判断
**NanoClaw 今日的健康度：研发活跃、方向清晰，但发布转化偏慢。**  
项目当前的核心挑战不是“有没有需求”，而是 **如何把高密度的开放 PR 迅速转化为可验证、可发布、可文档化的能力**。  
如果后续能优先收敛 Telegram multi-bot、容器兼容和远程 MCP 这三条主线，项目的用户感知价值会明显提升。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报｜2026-06-25

## 1. 今日速览
过去 24 小时，IronClaw 的活动保持高位：Issues 更新 14 条、PR 更新 15 条，合计 29 次变动，且没有新版本发布。  
从内容上看，讨论和修复重心高度集中在 **Reborn WebUI**、**工具权限/审批链路**、**日志与可观测性**、**Slack 集成** 以及 **运行时稳定性**。  
今日已有 7 个 PR 进入“已合并/关闭”状态，说明团队在持续把问题从发现推进到落地修复。  
整体判断：**项目处于高活跃、快速收敛阶段**，但也暴露出 Reborn 相关功能仍在密集打磨，稳定性与可观测性仍是当前健康度的核心指标。

---

## 2. 项目进展
今日最重要的推进，来自一批围绕 Reborn 体验与运行稳定性的 PR 收敛：

- [#5194](https://github.com/nearai/ironclaw/pull/5194) `fix(reborn): recover SSE turn-event stream from rebase on reconnect`  
  恢复 WebUI 断线重连后的 SSE 事件流，修复 Slack 线程与 WebUI 混用时的“断开后无法继续发送”问题，直接提升会话连续性。

- [#5193](https://github.com/nearai/ironclaw/pull/5193) `fix(ci): restore green main`  
  修复 CI 工作流重复 key 和测试忽略问题，恢复主分支稳定性，属于典型的“基础设施止血”。

- [#5186](https://github.com/nearai/ironclaw/pull/5186) `fix(reborn): localize settings labels and adjust automation filters`  
  完善 Reborn 设置页本地化与自动化筛选标签，偏产品可用性与国际化收尾。

- [#5185](https://github.com/nearai/ironclaw/pull/5185) `Fix Slack admin setup visibility for WebUI operator tokens`  
  调整 Slack 管理配置对 WebUI operator token 的可见性与路由权限，降低“配置被误隐藏”的运维摩擦。

- [#5181](https://github.com/nearai/ironclaw/pull/5181) `Allow Slack enablement env override`  
  为 Slack 启用增加环境变量开关，更利于 Railway/托管环境部署。

- [#5178](https://github.com/nearai/ironclaw/pull/5178) `fix(reborn): skip NEAR AI MCP without durable auth storage`  
  避免在没有持久化认证存储的场景下自动引入 NEAR AI MCP，减少本地开发/轻量部署的启动失败概率。

- [#5175](https://github.com/nearai/ironclaw/pull/5175) `refactor(reborn): temporarily disable spawn_subagent capability`  
  临时关闭 `spawn_subagent` 能力，属于运行时收敛动作，说明团队在控制复杂度与风险面。

另外，Issue [#5187](https://github.com/nearai/ironclaw/issues/5187) 已关闭，对应的设置本地化与自动化筛选调整已形成闭环。

**总体推进评估：**  
今天至少有 **7 个实现/修复项**完成收敛，覆盖会话恢复、CI、权限、Slack、国际化和运行时配置，说明项目在“功能可用性 + 稳定性”两条线上都有进展。

---

## 3. 社区热点
> 注：本日数据里显性评论并不多，已知最高评论数的条目仅 [#5182](https://github.com/nearai/ironclaw/issues/5182) 为 1 条评论；reaction 基本为 0 或未提供。  
> 因此“热点”更多体现为**同主题条目密集出现**，而不是单条帖子高互动。

### 3.1 Reborn 可观测性与日志诊断
- [#5182](https://github.com/nearai/ironclaw/issues/5182) `Reborn hosted observability: meaningful logs + failure diagnostics out of the binary`
- [#5179](https://github.com/nearai/ironclaw/issues/5179) `Web UI logs are not available for multi-tenancy users`
- [#5199](https://github.com/nearai/ironclaw/pull/5199) `fix(reborn): allow web ui logs for multi-tenancy users`

**背后诉求：**  
用户/运维侧明显希望从“二进制黑盒”走向“可定位问题的可观测系统”。特别是在 hosted `serve`、多租户场景里，日志不可见会直接阻断排障。

### 3.2 工具权限、审批与身份状态
- [#5196](https://github.com/nearai/ironclaw/issues/5196) `Ask each time` 通过后仍报 authorization 错误并重复审批
- [#5197](https://github.com/nearai/ironclaw/issues/5197) `Disabled` 工具可能诱导助手去调用别的工具
- [#5192](https://github.com/nearai/ironclaw/issues/5192) 拒绝工具审批后仍可能继续弹出更多审批请求
- [#5191](https://github.com/nearai/ironclaw/issues/5191) 内部 skill 激活/上下文预算消息泄露到聊天 UI
- [#5190](https://github.com/nearai/ironclaw/issues/5190) 无效/过期 bearer token 进入 UI 后，后续操作无响应
- [#5180](https://github.com/nearai/ironclaw/pull/5180) `fix(reborn): populate provider on runtime auth-required gates`
- [#5195](https://github.com/nearai/ironclaw/pull/5195) `fix(reborn): persist approval-card always allow as tool settings`

**背后诉求：**  
这组问题表明，用户最在意的不是“能不能点开”，而是**审批结果是否可预测、身份状态是否一致、错误是否可解释**。当前痛点集中在工具调用的状态机与授权流程，而不是单纯功能缺失。

### 3.3 WebUI 体验与响应式布局
- [#5188](https://github.com/nearai/ironclaw/issues/5188) `Improve Reborn WebUI v2 responsive sidebar behavior`
- [#5183](https://github.com/nearai/ironclaw/pull/5183) `style(webui-v2): improve responsive sidebar behavior`
- [#5186](https://github.com/nearai/ironclaw/pull/5186) 本地化与筛选标签优化

**背后诉求：**  
这类反馈更偏“日常使用体验”，说明 Reborn 已不只是能跑，而是在往“可长期使用、跨设备稳定交互”的方向推进。

---

## 4. Bug 与稳定性
按影响面和严重程度排序如下：

| 严重度 | 问题 | 影响 | 状态 / 相关 fix |
|---|---|---|---|
| 高 | [#5190](https://github.com/nearai/ironclaw/issues/5190) 无效/过期 UI bearer token 进入应用后，后续动作不响应 | 认证状态错乱会让用户误以为系统卡死，影响整站可用性 | 关联修复信号：[#5180](https://github.com/nearai/ironclaw/pull/5180)（auth gate provider 填充） |
| 高 | [#5196](https://github.com/nearai/ironclaw/issues/5196) `Ask each time` 审批后仍触发授权错误并重复审批 | 形成死循环式审批体验，严重影响工具可用性 | 暂未看到直接对应 fix PR |
| 高 | [#5197](https://github.com/nearai/ironclaw/issues/5197) 禁用工具后，助手可能调用其他工具而非直接报不可用 | 破坏权限边界，影响预期控制 | 暂未看到直接对应 fix PR |
| 高 | [#5203](https://github.com/nearai/ironclaw/pull/5203) `fast-fail a dead/degraded provider instead of wedging every run` | 外部 provider 故障时可能把整条运行链路拖到 30+ 分钟，属于明显的稳定性风险 | 仍为 OPEN，但已给出明确修复方向 |
| 中高 | [#5184](https://github.com/nearai/ironclaw/issues/5184) NEAR AI MCP lookup 不可用导致启动失败 | 启动阶段失败影响部署成功率 | 关联修复：[#5178](https://github.com/nearai/ironclaw/pull/5178)（避免无 durable storage 时自动 bootstrap） |
| 中 | [#5179](https://github.com/nearai/ironclaw/issues/5179) 多租户用户无法访问 Web UI 日志 | 阻断排障，特别影响运维与企业场景 | 关联修复：[#5199](https://github.com/nearai/ironclaw/pull/5199)（OPEN） |
| 中 | [#5189](https://github.com/nearai/ironclaw/issues/5189) 成功的 tool run 在执行中不显示 activity details | 造成体验不一致，降低可解释性 | 暂未看到对应 fix PR |
| 中 | [#5182](https://github.com/nearai/ironclaw/issues/5182) 二进制内缺乏有意义的日志与失败诊断 | 运维定位成本高，尤其在 hosted deployment 中 | 暂无直接 fix PR；更像平台级可观测性缺口 |

**稳定性判断：**  
今天的 bug 不是单点故障，而是围绕 **认证、审批、可观测性、外部依赖降级** 的系统性问题。好消息是，团队已经开始用 PR 直接补这些缺口；坏消息是，这些都属于“影响真实用户体验”的高频路径，仍需持续收敛。

---

## 5. 功能请求与路线图信号
今日新增/推进的需求，透露出下一阶段的路线图方向：

- [#5177](https://github.com/nearai/ironclaw/pull/5177) `feat(reborn): add Slack personal (user-token) tool`  
  这是一个明显的功能扩展信号：从 bot token 走向 user token，目标是支持更完整的 Slack 历史、DM、群组消息和搜索。  
  **判断：** 如果继续推进，很可能是下一版本的重要能力点，但实现范围大、权限边界复杂。

- [#5176](https://github.com/nearai/ironclaw/pull/5176) `docs(reborn): subagent thread harness — foundational design + PR0/PR1 plan`  
  虽然是文档 PR，但它把 subagent 从一次性任务提升为可恢复线程，说明这是中长期架构方向。  
  **判断：** 更像下一阶段核心架构路线，而不是短平快功能。

- [#5201](https://github.com/nearai/ironclaw/issues/5201) `Reborn memory: remaining #3537 milestones after the M2 lift`
  M2 lift 已完成后，剩余 memory milestone 被单独拆出来，说明 memory 体系还在继续推进。  
  **判断：** 属于持续演进型路线图，短期内会有更多拆分式 PR。

- [#5188](https://github.com/nearai/ironclaw/issues/5188) / [#5183](https://github.com/nearai/ironclaw/pull/5183) 响应式侧边栏
- [#5182](https://github.com/nearai/ironclaw/issues/5182) 可观测性与失败诊断
- [#5180](https://github.com/nearai/ironclaw/pull/5180) runtime auth gate provider 填充

**路线图判断：**  
这些条目合起来说明，下一版本大概率会优先围绕 **WebUI 交互稳定性、认证/授权流程、日志可见性、Slack/外部集成** 继续增强，而不是追求大而全的新功能。

---

## 6. 用户反馈摘要
从 Issues 的真实表述里，可以提炼出几个非常明确的用户痛点：

1. **“系统能跑，但我看不懂发生了什么”**  
   - 代表链接：[#5182](https://github.com/nearai/ironclaw/issues/5182)、[#5179](https://github.com/nearai/ironclaw/issues/5179)  
   - 场景：hosted serve、multi-tenancy、运维排障  
   - 诉求：日志、失败原因、运行上下文必须能直接看到

2. **“审批/认证流程不可信”**  
   - 代表链接：[#5196](https://github.com/nearai/ironclaw/issues/5196)、[#5197](https://github.com/nearai/ironclaw/issues/5197)、[#5192](https://github.com/nearai/ironclaw/issues/5192)、[#5190](https://github.com/nearai/ironclaw/issues/5190)  
   - 场景：工具授权、UI bearer token、禁用工具  
   - 诉求：授权状态要一致，拒绝/允许应该明确生效，不应出现重复弹窗或“静默失败”

3. **“UI 交互反馈不完整”**  
   - 代表链接：[#5189](https://github.com/nearai/ironclaw/issues/5189)、[#5191](https://github.com/nearai/ironclaw/issues/5191)  
   - 场景：工具执行中、内部 skill 调度  
   - 诉求：用户希望看到的是任务状态，而不是内部调试信息或空白反馈

4. **“部署兼容性要更强”**  
   - 代表链接：[#5184](https://github.com/nearai/ironclaw/issues/5184)、[#5181](https://github.com/nearai/ironclaw/pull/5181)、[#5178](https://github.com/nearai/ironclaw/pull/5178)  
   - 场景：Railway、无 durable storage、本地开发  
   - 诉求：默认行为要对轻量部署更友好，避免配置稍有缺失就启动失败

---

## 7. 待处理积压
> 说明：本次提供的数据里没有明显“长期未响应”的老 Issue/PR 时间跨度，因此这里先按**高优先级在办项**列出，供维护者优先跟进。

- [#5203](https://github.com/nearai/ironclaw/pull/5203) `fast-fail a dead/degraded provider instead of wedging every run`  
  这是高影响稳定性问题，建议优先推进到可验证状态。

- [#5202](https://github.com/nearai/ironclaw/pull/5202) `fix recurring trigger poller hang`  
  触发器轮询挂死会影响自动化链路，属于会“悄悄坏掉”的风险点。

- [#5199](https://github.com/nearai/ironclaw/pull/5199) `allow web ui logs for multi-tenancy users`  
  直接对应可观测性痛点，且对企业/多租户尤为关键。

- [#5180](https://github.com/nearai/ironclaw/pull/5180) `populate provider on runtime auth-required gates`  
  认证门禁路径属于高频路径，适合尽快收敛。

- [#5177](https://github.com/nearai/ironclaw/pull/5177) `add Slack personal (user-token) tool`  
  功能价值高，但范围大、风险高，建议明确拆分里程碑。

- [#5176](https://github.com/nearai/ironclaw/pull/5176) `subagent thread harness`  
  这是架构级路线图信号，适合持续跟踪，不宜在后续被功能杂项稀释。

---

### 总体结论
IronClaw 今天的表现可以概括为：**开发推进快、问题聚焦准、修复闭环在形成，但 Reborn 相关的认证/审批/日志/部署兼容性仍是当前主战场**。  
如果后续几天能继续把 [#5203](https://github.com/nearai/ironclaw/pull/5203)、[#5199](https://github.com/nearai/ironclaw/pull/5199)、[#5180](https://github.com/nearai/ironclaw/pull/5180) 这类高影响项落地，项目健康度会明显提升。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-06-25）

## 1. 今日速览
今天 LobsterAI 的活跃度以 **PR 修复/优化** 为主，过去 24 小时内没有新增 Issues，也没有 Release 发布，但合并/关闭了 4 个 PR，说明仓库当前仍在持续推进稳定性和体验修正。  
从内容上看，今天的改动主要集中在 **OpenClaw 启动链路、shell snapshot 行为、协同/计划模式渲染一致性、最终回答去重** 等“底层可靠性 + 交互一致性”方向。  
整体来看，项目处于 **中等开发活跃、低社区讨论** 的状态：有实际交付，但公开讨论与反馈信号较弱。  
GitHub：仓库主页 https://github.com/netease-youdao/LobsterAI

---

## 2. 版本发布
今日 **无新版本发布**，未检测到新的 Release。  
GitHub Releases：https://github.com/netease-youdao/LobsterAI/releases

---

## 3. 项目进展
今日共关闭 4 个 PR，推进的重点基本都是“让现有能力更稳、更一致”：

1. **修复 cowork 最终回答前缀重复问题**  
   PR：[#2197](https://github.com/netease-youdao/LobsterAI/pull/2197)  
   作用：当 managed OpenClaw run 丢失 `chat.final`、回退到 `chat.history` 时，避免 assistant 前缀重复拼接。  
   价值：提升最终回答输出的可读性与一致性，减少“重复开头”类体验 bug。

2. **修复 OpenClaw shell snapshot 中多余 dock app 启动问题**  
   PR：[#2196](https://github.com/netease-youdao/LobsterAI/pull/2196)  
   作用：在 macOS/Linux 上保持 OpenClaw gateway 走 `utilityProcess`，同时把 `ELECTRON_RUN_AS_NODE` 的作用域收敛到 shell snapshot 的 env-capture 命令。  
   价值：降低 Electron 将 Node 脚本误判为 app path 的风险，改善平台兼容性与启动行为稳定性。

3. **统一 OpenClaw gateway 的 spawn 启动方式**  
   PR：[#2195](https://github.com/netease-youdao/LobsterAI/pull/2195)  
   作用：macOS/Linux 也通过 `spawn` + `ELECTRON_RUN_AS_NODE=1` 启动 gateway，与 Windows 路径行为收敛。  
   价值：减少跨平台 child process 调用差异，提升 OpenClaw 链路的可维护性与一致性。

4. **修复协同/计划模式中仅加粗的 plan heading 渲染**  
   PR：[#2194](https://github.com/netease-youdao/LobsterAI/pull/2194)  
   作用：将类似 `**Summary**` 且正文换行开始的 label 正确渲染为 heading。  
   价值：改善计划展示效果，增强与 Kimi 风格 proposed plan 输出的兼容性。

**总体推进判断：**  
今天的 4 个 PR 没有引入新功能大版本，但在 **OpenClaw 执行链路、计划/协同展示、最终输出质量** 上做了多点修补，属于典型的“打基础、修边角、提稳定”的日常推进。  
GitHub PR 汇总：https://github.com/netease-youdao/LobsterAI/pulls

---

## 4. 社区热点
今日 **没有形成明显社区热点**：  
- Issues：0 条更新，未见新讨论  
- PR：4 条均已关闭，且数据中未显示评论数与 reaction 活跃度

说明当前活跃主要来自维护者/贡献者的代码修复，而非用户集中提问或集中反馈。  
可查看的相关 PR 链接：
- [#2197](https://github.com/netease-youdao/LobsterAI/pull/2197)
- [#2196](https://github.com/netease-youdao/LobsterAI/pull/2196)
- [#2195](https://github.com/netease-youdao/LobsterAI/pull/2195)
- [#2194](https://github.com/netease-youdao/LobsterAI/pull/2194)

---

## 5. Bug 与稳定性
今日没有新增 Issues 报告的 Bug，但从已关闭 PR 可以看出，维护重点集中在稳定性修复与回归控制。按潜在影响排序如下：

1. **OpenClaw 跨平台启动/子进程误判问题**  
   - 相关 PR：[#2195](https://github.com/netease-youdao/LobsterAI/pull/2195)  
   - 相关 PR：[#2196](https://github.com/netease-youdao/LobsterAI/pull/2196)  
   - 严重性：**高**  
   - 风险：可能影响 macOS/Linux/Windows 下 gateway 启动、shell snapshot 执行和 Electron 子进程行为。  
   - 状态：已有 fix PR

2. **最终回答前缀重复/输出冗余**  
   - 相关 PR：[#2197](https://github.com/netease-youdao/LobsterAI/pull/2197)  
   - 严重性：**中**  
   - 风险：影响回答展示质量，造成用户感知上的“答案被重复包装”。  
   - 状态：已有 fix PR

3. **Plan heading 渲染不一致**  
   - 相关 PR：[#2194](https://github.com/netease-youdao/LobsterAI/pull/2194)  
   - 严重性：**中低**  
   - 风险：影响协同/计划模式的可读性与格式一致性。  
   - 状态：已有 fix PR

**结论：** 今日未见新报错，但已有修复集中覆盖了“执行链路”和“结果展示”两类核心稳定性问题，属于较健康的维护信号。  
Issues 页：https://github.com/netease-youdao/LobsterAI/issues

---

## 6. 功能请求与路线图信号
今天没有新增 Issues，因此 **没有明确的新功能需求** 来自用户提案。  
但从已合并/关闭 PR 可以看出，仓库当前的路线图信号偏向以下方向：

1. **增强 OpenClaw 的跨平台一致性**  
   - 相关 PR：[#2195](https://github.com/netease-youdao/LobsterAI/pull/2195)  
   - 相关 PR：[#2196](https://github.com/netease-youdao/LobsterAI/pull/2196)  
   这通常意味着下一步会继续收敛不同操作系统上的启动、子进程和环境变量处理差异。

2. **提升协同/计划模式的格式兼容性**  
   - 相关 PR：[#2194](https://github.com/netease-youdao/LobsterAI/pull/2194)  
   说明项目可能会继续优化不同模型输出风格的兼容渲染，减少前端展示层的碎片化问题。

3. **改善最终回答生成的容错与回退路径**  
   - 相关 PR：[#2197](https://github.com/netease-youdao/LobsterAI/pull/2197)  
   这类修复往往预示着后续仍会增强 chat history / final answer 的兜底逻辑。

GitHub PR 页：https://github.com/netease-youdao/LobsterAI/pulls

---

## 7. 用户反馈摘要
今日没有 Issues 评论数据，因此 **无法从真实评论中直接抽取用户反馈**。  
不过从修复内容可以反推当前用户最关心的使用场景与痛点：

- **稳定输出最终答案**：用户不希望最终回复出现重复前缀、拼接异常。  
  相关 PR：[#2197](https://github.com/netease-youdao/LobsterAI/pull/2197)

- **跨平台可用性**：OpenClaw 在 macOS/Linux/Windows 上的启动和执行一致性，对真实部署非常关键。  
  相关 PR：[#2195](https://github.com/netease-youdao/LobsterAI/pull/2195)  
  相关 PR：[#2196](https://github.com/netease-youdao/LobsterAI/pull/2196)

- **协同/计划视图可读性**：用户会在意计划标题是否正确展示，因为这直接影响任务理解效率。  
  相关 PR：[#2194](https://github.com/netease-youdao/LobsterAI/pull/2194)

总体判断：当前用户痛点更偏向 **“结果是否可靠、展示是否一致、跨平台是否少出错”**，而不是新增能力诉求。  
Issues 页：https://github.com/netease-youdao/LobsterAI/issues

---

## 8. 待处理积压
基于当前提供的数据，**没有看到新增的待处理 Issues，也没有未闭合 PR**，因此今日视图下 **暂无明显积压**。  
不过，由于未提供历史未结项清单，无法判断仓库是否存在更早期的长期 open issue/PR；建议维护者额外巡检以下入口，确认是否有被忽略的老问题：

- Issues：https://github.com/netease-youdao/LobsterAI/issues
- Pull Requests：https://github.com/netease-youdao/LobsterAI/pulls

---

### 总体结论
LobsterAI 今天的状态可以概括为：**“无外显社区波动，持续做稳定性与兼容性修复”**。  
从 4 个已关闭 PR 看，项目正朝着更可靠的 OpenClaw 执行链路、更稳定的跨平台行为、以及更一致的协同输出格式前进；这对 AI 智能体与个人助手类项目来说，属于非常关键的工程性进步。

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

以下为 **CoPaw（数据源：agentscope-ai/QwenPaw）2026-06-25 项目动态日报**。

## 1) 今日速览
过去 24 小时，项目保持了 **高活跃度**：Issues 更新 7 条、PR 更新 20 条，说明社区仍在持续反馈问题并提交修复与新需求。  
从内容看，讨论焦点集中在 **前端渲染稳定性、长会话/大文件性能、内网部署可用性、插件生态兼容性** 等基础能力上，属于“使用深度增长后暴露出来的系统性问题”。  
今日没有新版本发布，意味着当前仍处于持续迭代和问题收敛阶段，而不是发版收口阶段。  
整体判断：项目健康度不错、需求旺盛，但 **开放 PR 数明显高于已完成项**，后续需要关注评审与合并吞吐。

---

## 2) 项目进展
今日已完成收口的 PR 主要集中在 **兼容性、稳定性与运维可操作性**：

- [PR #5475](https://github.com/agentscope-ai/QwenPaw/pull/5475)  
  修复 cron 任务在 **历史会话兼容** 与 **异常 tool_call 历史清洗** 下的重复失败问题。  
  这类修复对老数据迁移和定时任务可靠性很关键。

- [PR #5483](https://github.com/agentscope-ai/QwenPaw/pull/5483)  
  允许编辑和删除已启用的 cron jobs，提升了任务管理的可操作性，降低“启用后无法调整”的维护成本。

- [PR #5478](https://github.com/agentscope-ai/QwenPaw/pull/5478)  
  围绕文件预览的相对路径/回退逻辑做调整，属于典型的回归控制型变更，有助于减少预览链路上的异常。

- [PR #5498](https://github.com/agentscope-ai/QwenPaw/pull/5498)  
  将 “Current date” 从静态环境上下文迁移到 **按用户消息动态前缀**，改善长会话中的时间陈旧问题，也更利于 prompt cache 稳定。

**阶段性评价：**  
这些完成项虽然不属于大功能发布，但都在补齐底座能力：**会话兼容、任务可靠性、路径行为、提示词时效性**。对项目来说，这是向“可长期稳定使用”迈进的重要一步。

---

## 3) 社区热点
今日热点主要集中在 **Issues 侧**，且都带有较强的真实使用场景。

- [Issue #5497](https://github.com/agentscope-ai/QwenPaw/issues/5497)  
  **内网安装后客户端白屏**（2 条评论）。  
  这是最典型的“部署即不可用”类问题，诉求很明确：离线/内网环境下必须能稳定启动，不能依赖外网资源或特殊安装路径。

- [Issue #5480](https://github.com/agentscope-ai/QwenPaw/issues/5480)  
  **Console 长消息排版错乱，切换选项卡后恢复**（2 条评论）。  
  说明前端渲染存在布局重算缺失或流式消息渲染问题，用户关注点是“内容正确显示”，而不仅是“能收到消息”。

- [Issue #5479](https://github.com/agentscope-ai/QwenPaw/issues/5479)  
  **大会话文件 >500KB 打开时报错并崩溃**（2 条评论）。  
  这反映出用户已经开始在真实工作流中积累较长会话，系统需要面对历史数据增长带来的性能与可读性压力。

- [Issue #5501](https://github.com/agentscope-ai/QwenPaw/issues/5501)  
  **宽屏模式下发送按钮对不齐**（1 条评论）。  
  热度不高，但说明 UI 响应式布局仍有细节问题，尤其是在桌面宽屏工作场景下。

**PR 侧热度判断：**  
当前 PR 列表没有提供评论数，且从数据上看没有明显“高争议 PR”。社区讨论重心仍然偏向 **问题暴露与需求提出**，而不是对单个方案展开激烈评审。

---

## 4) Bug 与稳定性
按影响面和严重程度排序：

1. [Issue #5497](https://github.com/agentscope-ai/QwenPaw/issues/5497) — **内网安装后客户端白屏**  
   - 严重性：高  
   - 影响：启动即不可用，属于阻断级问题  
   - 现状：未看到直接对应的修复 PR

2. [Issue #5479](https://github.com/agentscope-ai/QwenPaw/issues/5479) — **大会话文件 >500KB 打开崩溃**  
   - 严重性：高  
   - 影响：历史会话无法查看，影响长期使用  
   - 现状：未看到直接对应的修复 PR

3. [Issue #5480](https://github.com/agentscope-ai/QwenPaw/issues/5480) — **长消息排版错乱，切换 tab 后恢复**  
   - 严重性：中  
   - 影响：阅读与上下文理解受损，但有临时恢复手段  
   - 现状：未见明确直连修复 PR；与前端流式渲染链路相关，可能与 [PR #5487](https://github.com/agentscope-ai/QwenPaw/pull/5487)、[PR #5495](https://github.com/agentscope-ai/QwenPaw/pull/5495) 这类流式/事件翻译改动方向相关

4. [Issue #5501](https://github.com/agentscope-ai/QwenPaw/issues/5501) — **宽屏下发送按钮错位**  
   - 严重性：低  
   - 影响：视觉与交互一致性问题，不影响核心功能  
   - 现状：暂无对应修复 PR

补充：  
- [Issue #5476](https://github.com/agentscope-ai/QwenPaw/issues/5476) 已关闭，属于 **移动端无法切换智能体** 的稳定性问题，说明项目在移动端交互链路上已有一定修复进展。

---

## 5) 功能请求与路线图信号
今日的新功能诉求非常集中，且很多都已经出现了对应 PR，说明这些方向大概率会进入下一轮迭代：

- [Issue #5484](https://github.com/agentscope-ai/QwenPaw/issues/5484) / [PR #5492](https://github.com/agentscope-ai/QwenPaw/pull/5492)  
  **支持通过 pip 从 PyPI 安装插件**  
  这是很强的路线图信号：说明项目正在从“ZIP 分发插件”向更标准的 Python 包生态靠拢。  
  对插件生态、贡献者接入和企业集成都很有价值。

- [Issue #5489](https://github.com/agentscope-ai/QwenPaw/issues/5489)  
  **Support OpenAI response format**  
  这是明显的兼容性诉求，目标是降低模型接入成本、扩大模型/服务适配面。  
  从生态角度看，这类需求优先级通常较高。

- [Issue #5482](https://github.com/agentscope-ai/QwenPaw/issues/5482) / [PR #5482](https://github.com/agentscope-ai/QwenPaw/pull/5482)  
  **增强 memory search 与简化 metadata 展示**  
  反映出用户开始重视“可检索、可理解、可管理”的记忆系统，而不仅仅是存储。

- [PR #5490](https://github.com/agentscope-ai/QwenPaw/pull/5490)  
  **工具卡图片内联展示 + gallery 导航**  
  指向多模态/工具输出场景的体验优化。

- [PR #5488](https://github.com/agentscope-ai/QwenPaw/pull/5488)  
  **用户输入缩略图侧边栏**  
  属于长对话场景下的导航增强，说明产品正在面向“重度使用者”优化。

- [PR #5491](https://github.com/agentscope-ai/QwenPaw/pull/5491)  
  **DashScope generate_kwargs 兼容性修复**  
  体现出对旧配置/旧路径兼容的持续投入。

- [PR #5496](https://github.com/agentscope-ai/QwenPaw/pull/5496)  
  **GLM 模型工具 schema 兼容性修复**  
  也是典型的模型适配扩展信号。

**结论：**  
下一版本最可能优先纳入的方向，是 **插件安装标准化、OpenAI 格式兼容、模型/provider 兼容、长会话导航与多模态展示优化**。

---

## 6) 用户反馈摘要
从 Issues 评论和描述里，可以提炼出几类真实痛点：

- **内网/离线部署诉求强烈**  
  用户不是在“理想环境”里使用，而是在企业内网、无外网、限制安装包来源的环境中部署。  
  [Issue #5497](https://github.com/agentscope-ai/QwenPaw/issues/5497)

- **长会话已成为常态使用模式**  
  大会话文件 >500KB 就崩溃，说明用户已经把它用于持续对话、知识积累或多轮任务执行。  
  [Issue #5479](https://github.com/agentscope-ai/QwenPaw/issues/5479)

- **Markdown/流式消息展示必须稳定**  
  长消息排版错乱、切换标签后恢复，说明用户对“实时内容呈现”非常敏感。  
  [Issue #5480](https://github.com/agentscope-ai/QwenPaw/issues/5480)

- **移动端和宽屏桌面都在被真实使用**  
  移动端不能切换智能体、宽屏发送按钮错位，说明用户群并不局限于单一终端。  
  [Issue #5476](https://github.com/agentscope-ai/QwenPaw/issues/5476)、[Issue #5501](https://github.com/agentscope-ai/QwenPaw/issues/5501)

- **用户提交的问题比较具体，且带截图/版本/复现步骤**  
  这说明社区参与质量较高，对维护者来说是利好：问题定位成本相对可控。

---

## 7) 待处理积压
严格按“长期未响应”判断，**当前 24 小时数据不足以确认真正的老积压项**；但从优先级与影响面看，以下 open 条目应尽快纳入维护者跟踪池：

- [Issue #5497](https://github.com/agentscope-ai/QwenPaw/issues/5497) — 内网白屏，阻断级
- [Issue #5479](https://github.com/agentscope-ai/QwenPaw/issues/5479) — 大会话崩溃，性能/稳定性关键项
- [Issue #5480](https://github.com/agentscope-ai/QwenPaw/issues/5480) — 前端流式渲染问题，影响日常阅读体验
- [Issue #5489](https://github.com/agentscope-ai/QwenPaw/issues/5489) — OpenAI response format，生态兼容关键需求
- [Issue #5484](https://github.com/agentscope-ai/QwenPaw/issues/5484) — pip 安装插件，生态建设关键需求
- [Issue #5501](https://github.com/agentscope-ai/QwenPaw/issues/5501) — UI 对齐问题，低优先级但可快速修复

**维护建议：**  
优先处理“**启动不可用 / 会话崩溃 / 数据量增长后失效**”三类问题；这些最容易影响用户留存与口碑。  
同时，建议尽快对 **插件 pip 安装、OpenAI 格式兼容** 这类高频路线图需求做明确取舍，以减少重复提问和 PR 分散。

---

### 总体结论
CoPaw 今天呈现出典型的“**高活跃、强反馈、重稳定性修复**”状态：社区提交密集，需求覆盖部署、性能、兼容性和 UX 细节。  
如果后续能把 **长会话性能、内网部署白屏、流式渲染稳定性** 这三类问题持续收敛，项目的可用性和信任度会明显提升。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报（2026-06-25）

## 1) 今日速览
过去 24 小时，ZeroClaw 处于**高活跃、低落地**状态：Issues 新开/活跃 7 条，PR 活跃 25 条，但**没有任何 PR 合并或关闭**，也**没有新版本发布**。这说明团队当前主要精力集中在功能设计、缺陷修复和安全/架构补洞，处于明显的“方案推进期”。  
从内容结构看，今日讨论重心集中在 **SOP 控制平面、OIDC/多用户架构、delegate 安全边界、MCP 工具可见性** 等基础能力上，属于对产品成熟度影响较大的主线。  
整体健康度上，项目表现出较强的工程推进速度，但交付侧尚未出现实质性合并，短期内更像是在为下一轮版本做密集铺垫。  
- 项目主页：<https://github.com/zeroclaw-labs/zeroclaw>

---

## 2) 版本发布
**无新版本发布。**

- Releases：<https://github.com/zeroclaw-labs/zeroclaw/releases>

---

## 3) 项目进展
今日没有 PR 合并/关闭，因此严格意义上“已落地”的进展为 0；但从公开 PR 内容看，项目正在同步推进多个关键方向，且很多 PR 已经具备较完整的实现描述，说明研发工作量较大、推进明显。

### 值得关注的推进方向
1. **SOP 能力补齐到可发布级别**
   - PR #8304：`feat(sop): out-of-band approval plane with fail-closed timeout and PriorityBased gate fix`
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8304>
   - 价值：把 SOP 审批从“工具内”推进到“带外审批平面”，并引入 fail-closed 超时策略，明显提升可控性与安全性。

2. **delegate / tool 权限边界修复**
   - PR #8284：`[runtime] fix(runtime): gate delegate sub-tools with parent agent's SecurityPolicy`
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8284>
   - PR #8285：`[runtime] fix(delegate): intersect caller's per-agent tool gate at delegate boundary`
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8285>
   - PR #8286：`[config] fix(config): extend ensure_no_escalation_beyond to cover allowed_tools and excluded_tools`
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8286>
   - 价值：这组 PR 直指 #8279 的权限绕过问题，属于高优先级安全加固。

3. **MCP 工具展示与网关可见性修复**
   - PR #8305：`[gateway] fix(gateway): fallback to all MCP servers when first agent has no bun…`
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8305>
   - 价值：直接回应 #8302，改善 dashboard 工具列表和 MCP 服务器可见性，减少“能力实际可用但前端不可见”的割裂感。

4. **面向稳定性的回归测试密集补强**
   - PR #8301、#8300、#8299、#8298、#8297、#8296、#8294、#8293、#8292、#8287
   - 例如：
     - <https://github.com/zeroclaw-labs/zeroclaw/pull/8301>
     - <https://github.com/zeroclaw-labs/zeroclaw/pull/8297>
   - 价值：大量边界测试表明团队正在系统性收敛行为定义，降低后续回归风险。

### 今日“前进了多少”
- **代码交付层面：0（无合并）**
- **路线图推进层面：较大**
  - 安全边界、审批流、身份与多用户、MCP 可见性、TUI/渠道交互都在持续推进。
  - 这意味着项目虽然没有“发布式进展”，但“可发布能力的拼图”在快速补齐。

---

## 4) 社区热点
今日热点主要集中在**高优先级功能请求与安全/可用性缺陷**。不过从数据看，Issue/PR 的评论数整体偏低，说明讨论多为“提交驱动”，社区反馈尚未形成大规模来回讨论。

### 讨论/关注度相对最高的条目
1. **#8303 RFC: Goal mode for bounded autonomous session work**
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8303>
   - 热度：1 👍，0 评论
   - 诉求：用户希望系统具备“目标驱动的持久自治模式”，能围绕单一目标持续执行，直到完成/暂停/取消/预算耗尽。
   - 背后信号：这是典型的“Agent 产品从对话走向任务执行”的能力诉求，说明用户已开始把 ZeroClaw 当作可持续代理执行框架，而不是单轮工具。

2. **#8279 delegate bypasses parent's tool allowlist**
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8279>
   - 热度：0 评论，但严重级别最高（S0）
   - 诉求：代理链路中的权限继承必须严格约束，否则会形成安全漏洞。
   - 背后信号：安全边界是社区极敏感点，且已触发后续多 PR 修复。

3. **#8302 configured mcp servers tools are not shown in the tools list**
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8302>
   - 热度：0 评论
   - 诉求：前端工具列表与后端实际能力不一致，影响可发现性与可用性。
   - 背后信号：用户关注“能力是否真实可见”，这对平台级产品非常关键。

4. **#8290 / #8289 / #8288 路线图 tracker**
   - 链接：
     - <https://github.com/zeroclaw-labs/zeroclaw/issues/8290>
     - <https://github.com/zeroclaw-labs/zeroclaw/issues/8289>
     - <https://github.com/zeroclaw-labs/zeroclaw/issues/8288>
   - 背后信号：社区和维护者都在推动“多用户 / OIDC / SOP”三条主线，说明项目已进入平台化能力建设阶段。

---

## 5) Bug 与稳定性
按严重程度排序，今日报告的 Bug 主要集中在**安全边界、工具展示、发行打包**三个层面。

### S0 / 安全风险
1. **#8279 delegate bypasses parent's tool allowlist — sub-agent can invoke tools the parent policy excludes**
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8279>
   - 影响：子代理可能调用父策略禁止的工具，属于明确的权限绕过风险。
   - 是否已有 fix PR：**有**
     - #8284：<https://github.com/zeroclaw-labs/zeroclaw/pull/8284>
     - #8285：<https://github.com/zeroclaw-labs/zeroclaw/pull/8285>
     - #8286：<https://github.com/zeroclaw-labs/zeroclaw/pull/8286>

### S2 / 功能降级
2. **#8302 configured mcp servers tools are not shown in the tools list**
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8302>
   - 影响：已配置的 MCP 工具在 dashboard 不可见，造成“能用但看不见”的体验断层。
   - 是否已有 fix PR：**有**
     - #8305：<https://github.com/zeroclaw-labs/zeroclaw/pull/8305>

### S3 / 轻微问题
3. **#8275 Scoop manifest does not register zerocode**
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8275>
   - 影响：Windows 安装/路径暴露不完整，主要是工具链可用性问题。
   - 是否已有 fix PR：**当前未看到对应 PR**

### 稳定性判断
- 今日的 bug 不是“偶发崩溃型”，而是**权限、可见性、发布完整性**问题，说明项目当前的稳定性挑战主要来自**架构边界**而非运行时崩坏。
- 好消息是：最严重的 S0 问题已经有多条修复 PR 跟进，显示维护者对高风险问题响应较快。

---

## 6) 功能请求与路线图信号
今日新增/活跃的需求，明显在向“平台化 Agent 系统”的路线收敛。以下几项最可能进入下一版本或近期迭代：

### 高概率进入近期待办的方向
1. **#8303 Goal mode for bounded autonomous session work**
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8303>
   - 信号：这是非常典型的下一阶段能力，和“自治执行、预算控制、暂停/恢复”强相关。
   - 结合现有 PR：若 #8304 的审批平面落地，goal mode 的执行闭环基础会更完整。

2. **#8290 multi-user milestone**
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8290>
   - 信号：身份隔离、记忆隔离、按发送方授权，是从单用户工具走向企业/团队级部署的前提。

3. **#8289 OIDC milestone**
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8289>
   - 信号：统一 Principal + 可插拔 AuthProvider，说明认证体系正在标准化。
   - 结合现有 PR：OIDC 是后续多用户能力的基础设施。

4. **#8288 SOP milestone**
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8288>
   - 信号：SOP 已经从“功能点”升级为“可验收里程碑”，显示其优先级很高。
   - 结合现有 PR：#8304 直接对齐这一路线图。

### 中高概率进入近期版本的增强
5. **#8302 MCP 工具展示修复**
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8302>
   - 理由：已有 PR #8305 跟进，属于短平快修复。

6. **#8283 a2a.exposed_skills 空技能警告**
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8283>
   - 理由：涉及配置误导和 agent card 语义清晰度，适合近期待发布修正。
   - PR 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8283>

7. **#8281 yolo preset fully unrestricted**
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8281>
   - 理由：关系到“全自主预设”是否真的符合产品语义，可能被当作体验与配置修正纳入。

---

## 7) 用户反馈摘要
从 Issues 的描述可以提炼出几个非常明确的用户痛点与使用场景：

### 真实痛点
1. **“能力存在，但系统没正确暴露出来”**
   - 来自 #8302：MCP 服务器工具在工具列表中不可见。
   - 说明用户在乎的是“可发现性”和“前端一致性”，而不仅是后端是否工作。

2. **“权限必须严格，不允许代理链路偷偷放大能力”**
   - 来自 #8279：delegate 绕过父策略 allowlist。
   - 说明用户已在真实场景中使用多代理/子代理机制，对安全边界敏感度很高。

3. **“我需要的是围绕目标自动完成，而不是一轮一轮交互”**
   - 来自 #8303。
   - 说明用户的使用方式正在从聊天辅助，转向任务编排与持续执行。

4. **“安装、渠道、工具名规范必须稳定，否则自动化和脚本会出问题”**
   - 来自 #8275、#8287、#8294、#8299、#8301 等回归测试/打包问题。
   - 用户对 CLI、TUI、通道格式和安装分发链路有较强依赖。

### 满意/不满意的侧面信号
- **满意点**：社区愿意主动提交 RFC、tracker、修复 PR，说明项目的扩展面与开放度被认可。
- **不满意点**：大量问题围绕“边界条件、权限、配置语义”，反映当前产品仍处在快速扩张期，某些行为契约还不够稳固。

---

## 8) 待处理积压
从当前数据看，**没有明显“长期未响应”的历史积压**，因为本日报范围内的 Issue/PR 基本都创建于 2026-06-24，更新也集中在 24 小时内。  
不过，以下几项属于**必须优先盯住的高价值待办**，虽然不算“老积压”，但优先级很高：

1. **#8279 安全绕过问题**
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8279>
   - 原因：S0，必须持续跟踪其修复 PR 的 review 与合并状态。

2. **#8304 SOP 带外审批平面**
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8304>
   - 原因：体量大、风险高，容易成为发布门槛。

3. **#8303 Goal mode RFC**
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8303>
   - 原因：属于下一阶段产品形态，值得尽快评估是否纳入 roadmap。

4. **#8290 / #8289 / #8288 三大里程碑 tracker**
   - 链接：
     - <https://github.com/zeroclaw-labs/zeroclaw/issues/8290>
     - <https://github.com/zeroclaw-labs/zeroclaw/issues/8289>
     - <https://github.com/zeroclaw-labs/zeroclaw/issues/8288>
   - 原因：这些 tracker 将决定项目接下来是继续“补功能”，还是进入“平台化发布”阶段。

---

## 总体结论
ZeroClaw 今天的状态可以概括为：**研发非常活跃，发布尚未落地，路线图正在加速收敛。**  
最重要的信号不是某个单点修复，而是项目已经同时在推进 **安全边界、身份体系、SOP 审批、自治模式、MCP 可见性** 五条主线——这意味着它正在从“可用原型”向“可部署平台”演进。  
短期内，维护者最需要关注的是：**先把高风险权限问题和关键体验缺口收口，再决定下一步的版本发布节奏。**

如果你愿意，我也可以把这份日报进一步整理成：
- **适合发给管理层的简版**
- **适合发到 GitHub Discussion/周报群的口语版**
- **CSV/Markdown 表格版，方便归档**

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*