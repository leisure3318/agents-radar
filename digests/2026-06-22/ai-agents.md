# OpenClaw 生态日报 2026-06-22

> Issues: 12 | PRs: 16 | 覆盖项目: 13 个 | 生成时间: 2026-06-22 02:05 UTC

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

以下是 **OpenClaw（openclaw/openclaw）2026-06-22 项目动态日报**。整体上看，项目今天非常活跃：过去 24 小时有 **12 条 Issue 更新、16 条 PR 更新、1 个新版本发布**，且讨论重心高度集中在 **会话状态、跨模型回退、记忆系统迁移、提示缓存稳定性** 这几类“底层可靠性”问题上。可以判断，项目当前处于 **高频修复 + 回归消化 + beta 稳定性打磨** 阶段，健康度总体不错，但 P1/P2 级稳定性风险依然明显。

---

## 1) 今日速览

- 今日的项目节奏明显偏“稳定性优先”：不仅发布了一个 beta 版本，还集中出现了多条与 **session state、failover、memory migration、prompt cache** 相关的高优先级反馈。  
- 从数据看，社区对“能不能稳定跑完、能不能正确回退、会不会丢状态/重复嵌入”这类问题非常敏感，这说明 OpenClaw 已进入更大规模使用后的真实压力测试阶段。  
- 过去 24 小时内有 **2 个 PR 关闭/合入**，虽数量不多，但覆盖了 **长上下文缓存稳定性** 和 **provider 上游失败回退** 两个关键面，属于高价值修复。  
- 目前整体状态可以概括为：**活跃度高、问题集中、修复导向明确，但稳定性债务仍在累积与清理中**。  

---

## 2) 版本发布

### 新版本：v2026.6.10-beta.1
- [Release v2026.6.10-beta.1](https://github.com/openclaw/openclaw/releases/tag/v2026.6.10-beta.1)

#### 主要更新
该 beta 版本的 highlights 明显围绕“会话与状态恢复可靠性”展开，核心包括：
- 更可靠的 agent turn 与 session state 保持
- 保留 pending subagent completion announcements
- 确保 chat history transcripts 不再为空
- 维护 media index 对齐
- 在 dormant 的 follow-up drains 上支持重启
- 统一修复 compaction model aliases 的解析一致性

#### 影响判断
- **未看到明确的破坏性变更公告**，本次发布更像是稳定性修复版而非接口重构版。
- 但由于它直接触及 **session replay / compaction / subagent drain** 等核心路径，建议 beta 用户重点回归验证：
  - 长会话恢复
  - 压缩后重放
  - 多子 agent 协作完成回调
  - 媒体索引/历史记录一致性

#### 迁移注意事项
- 暂无官方说明要求手工迁移。
- 但如果你依赖 **长期运行会话、复杂重放、跨 provider 回退**，建议升级后观察首轮 turn 是否出现状态漂移或 replay 差异。

---

## 3) 项目进展

今日较重要的已关闭/合入 PR 主要有 2 个：

1. [PR #95624](https://github.com/openclaw/openclaw/pull/95624) — **修复长上下文 tool-result prompt 缓存稳定性**
   - 解决了大上下文模型在累计 tool-result 文本跨过 prompt cap 后，缓存前缀失效、重复重写大量 token 的问题。
   - 这类修复对 **成本、延迟、长会话稳定性** 都很关键。
   - 对项目整体推进的意义：把“能跑”推进到“长跑不掉速”。

2. [PR #95523](https://github.com/openclaw/openclaw/pull/95523) — **将 provider upstream_error 识别为可回退的瞬态失败**
   - 让上游返回 `upstream_error` 时，系统能继续走 fallback chain，而不是直接终止。
   - 这直接提升了 **可用性与容灾能力**，尤其适合多 provider 运营场景。

### 总体推进评价
- 今日虽然只完成了 **2 个 PR** 的关闭/合入，但都属于高影响修复。
- 它们共同指向一个方向：**OpenClaw 正在把“复杂代理系统的稳定运行”作为核心产品能力去补强**。
- 从项目整体推进看，这种修复对用户价值通常大于大量小功能堆叠，尤其在 beta 阶段更重要。

---

## 4) 社区热点

以下是今日最活跃、最受关注的 Issues/PRs（按评论与反应综合）：

1. [Issue #95623](https://github.com/openclaw/openclaw/issues/95623) — tool_use.id sanitizer 漏掉 OpenAI-responses composite id，导致跨 provider failover replay 后 Anthropic 400，session 直接损坏  
   - 评论：6，👍：1  
   - 热点原因：这是一个典型的 **跨 provider 互操作 + replay 兼容性** 问题，而且会直接“砖掉”会话，严重影响可用性。
   - 背后诉求：用户希望系统在不同模型/平台之间切换时，**历史记录可以安全重放**，而不是因为 ID 形态不兼容导致 session 崩坏。  
   - 链接：<https://github.com/openclaw/openclaw/issues/95623>

2. [Issue #95495](https://github.com/openclaw/openclaw/issues/95495) — 2026.6.9 静默迁移 memory store，导致 1499 个文件被迫全量 re-embed  
   - 评论：6，👍：1  
   - 热点原因：这属于高危的 **数据迁移 + 成本爆炸 + 无升级提示** 问题，直接触发重新嵌入大批文件。
   - 背后诉求：用户需要的是 **升级可预期、迁移可追踪、成本可控**，而不是 silent relocation。  
   - 链接：<https://github.com/openclaw/openclaw/issues/95495>

3. [Issue #95601](https://github.com/openclaw/openclaw/issues/95601) — VoiceOver 友好的 chat history 诉求  
   - 评论：3，👍：1  
   - 热点原因：这是一个高质量的无障碍反馈，体现出产品已进入真实用户场景。
   - 背后诉求：用户认可现有改进，但希望 **聊天历史、模型选择、剩余用量** 等信息对屏幕阅读器更友好。  
   - 链接：<https://github.com/openclaw/openclaw/issues/95601>

4. [Issue #95610](https://github.com/openclaw/openclaw/issues/95610) — OpenAI prompt-cache prefix churn  
   - 评论：2，👍：1  
   - 热点原因：涉及 per-turn 动态注入破坏 prompt cache，直接影响 **成本与延迟**。
   - 背后诉求：用户希望缓存前缀尽量稳定，避免每轮都重建/失效。  
   - 链接：<https://github.com/openclaw/openclaw/issues/95610>

5. [PR #95604](https://github.com/openclaw/openclaw/pull/95604) — Discord 子 agent 进度展示  
   - 虽未提供评论数，但从标题和标签看，属于明显的用户感知增强方向。
   - 诉求本质：让长任务不“看起来像卡住”，提升协作可见性。  
   - 链接：<https://github.com/openclaw/openclaw/pull/95604>

---

## 5) Bug 与稳定性

按严重程度排列如下：

### P1 / 高危

1. [Issue #95623](https://github.com/openclaw/openclaw/issues/95623) — 跨 provider failover replay 的 tool_use.id 处理错误，Anthropic 400 导致 session 砖掉  
   - 严重性：**P1**
   - 影响：**session-state / auth-provider**
   - 是否已有 fix PR：**有相关修复 PR 在队列中**  
     - [PR #95629](https://github.com/openclaw/openclaw/pull/95629)（严格 replay sanitization，修复 raw OpenAI Responses tool ids）
   - 评估：这是今天最典型的“会话级故障”问题。

2. [Issue #95495](https://github.com/openclaw/openclaw/issues/95495) — memory store 静默迁移，触发全量重嵌入与潜在数据风险  
   - 严重性：**P1**
   - 影响：**session-state / data-loss**
   - 是否已有 fix PR：**有**
     - [PR #95631](https://github.com/openclaw/openclaw/pull/95631)
   - 评估：这是典型的升级回归，且影响面大、用户成本高。

### P2 / 中高危

3. [Issue #95610](https://github.com/openclaw/openclaw/issues/95610) — OpenAI prompt cache prefix churn  
   - 严重性：**P2**
   - 影响：**性能 / 成本 / other**
   - fix PR：**未见**
   - 评估：不会立刻崩，但长期会显著抬高 token 成本与响应延迟。

4. [Issue #95606](https://github.com/openclaw/openclaw/issues/95606) — Memory system 无法精确删除 stale memories，冲突条目并存  
   - 严重性：**P2**
   - 影响：**session-state / data-loss**
   - fix PR：**未见**
   - 评估：对记忆系统可信度影响很大，属于“慢性污染”型问题。  
   - 链接：<https://github.com/openclaw/openclaw/issues/95606>

5. [Issue #95597](https://github.com/openclaw/openclaw/issues/95597) — Codex native post_tool_use relay 跳过 middleware，导致 artifact 捕获中断  
   - 严重性：**P2**
   - 影响：**data-loss**
   - fix PR：**未见**
   - 评估：影响工具产物采集，属于数据链路完整性问题。  
   - 链接：<https://github.com/openclaw/openclaw/issues/95597>

6. [Issue #95609](https://github.com/openclaw/openclaw/issues/95609) — restart 恢复时对不可恢复 tail 强制要求用户重打  
   - 严重性：**P2**
   - 影响：**session-state**
   - fix PR：**未见**
   - 评估：不一定致命，但严重损害用户体验与连续性。  
   - 链接：<https://github.com/openclaw/openclaw/issues/95609>

7. [Issue #95612](https://github.com/openclaw/openclaw/issues/95612) — claude-cli runtime 返回 401，但 shell 中同命令可用  
   - 严重性：**P2**
   - 影响：**auth-provider**
   - fix PR：**未见**
   - 评估：这是典型的“运行环境与 CLI 认证状态不一致”问题，排障成本较高。  
   - 链接：<https://github.com/openclaw/openclaw/issues/95612>

### 已关闭但值得关注

8. [Issue #95619](https://github.com/openclaw/openclaw/issues/95619) — Heartbeat checker 把 HTML comment 误判为非空，导致 24/7 API 调用  
   - 状态：**已关闭**
   - 影响：**other / 成本浪费**
   - fix PR：数据中未给出
   - 评估：这是一个很典型的“看似小、实则会烧钱”的空内容判定 bug。  
   - 链接：<https://github.com/openclaw/openclaw/issues/95619>

---

## 6) 功能请求与路线图信号

今日出现的功能型需求，和当前 PR 队列结合后，能看到几个明显路线图信号：

1. [Issue #95630](https://github.com/openclaw/openclaw/issues/95630) — 为 channel-lane agent turns 增加 wall-clock deadline  
   - 这是一个偏架构层的能力诉求。
   - 信号判断：如果后续要增强 **长任务治理、调度器级 SLA、无 settlement bound 控制**，这个需求可能会进入下一阶段设计。
   - 但它属于平台级改造，落地难度较高，短期可能先以局部超时/调度优化形态出现。

2. [Issue #95601](https://github.com/openclaw/openclaw/issues/95601) — VoiceOver-friendly chat history  
   - 这是明显的可访问性需求。
   - 信号判断：若 OpenClaw 持续扩大终端用户群，**无障碍体验** 会成为产品成熟度的重要指标之一。

3. [PR #95604](https://github.com/openclaw/openclaw/pull/95604) — Discord 子 agent 进度展示  
   - 说明项目在强化 **多渠道可见性** 和 **长任务状态反馈**。
   - 路线图信号：未来很可能继续补齐 Telegram / WhatsApp / Discord 等渠道上的“执行态展示”。

4. [PR #95626](https://github.com/openclaw/openclaw/pull/95626) — Telegram 在 sendRichMessage 不支持时回退 sendMessage  
   - 说明项目在持续推进 **消息交付鲁棒性**。
   - 路线图信号：渠道兼容性修复仍是重点，不只是“发出去”，还要“尽量发成”。

5. [PR #95628](https://github.com/openclaw/openclaw/pull/95628) — Gemini web_search freshness 修复  
   - 说明模型/工具适配在继续加深。
   - 路线图信号：**搜索类工具参数兼容** 会持续成为稳定性维护重点。

---

## 7) 用户反馈摘要

从今日 Issues 的描述和评论语气看，用户真实痛点非常集中：

### 1. 用户最在意的是“会话不能断、状态不能错”
- 代表性反馈：
  - [Issue #95623](https://github.com/openclaw/openclaw/issues/95623)
  - [Issue #95609](https://github.com/openclaw/openclaw/issues/95609)
  - [Issue #95627](https://github.com/openclaw/openclaw/issues/95627)
- 用户场景：跨 provider 回退、重放、重启恢复、compaction 后继续对话。
- 诉求本质：**会话连续性必须可靠**，不能因为 sanitizer、thinking signature、restart tail 处理不当而让整段会话失效。

### 2. 用户很敏感于“迁移成本”和“隐性成本”
- 代表性反馈：
  - [Issue #95495](https://github.com/openclaw/openclaw/issues/95495)
  - [Issue #95610](https://github.com/openclaw/openclaw/issues/95610)
  - [Issue #95619](https://github.com/openclaw/openclaw/issues/95619)
- 用户场景：升级、缓存复用、heartbeat 任务。
- 诉求本质：  
  - 升级不能静默迁移  
  - 缓存不能轻易失效  
  - 定时任务不能无意中烧 API 成本

### 3. 用户开始期待更好的可用性和无障碍体验
- 代表性反馈：
  - [Issue #95601](https://github.com/openclaw/openclaw/issues/95601)
- 用户态度：并非只是在报 bug，也在明确表达“已有改进是有价值的”。
- 这说明产品已经有一定实际使用基础，开始出现 **体验层面的精细诉求**。

### 4. 用户希望工具/记忆系统“可纠错、可删除、可追踪”
- 代表性反馈：
  - [Issue #95606](https://github.com/openclaw/openclaw/issues/95606)
  - [Issue #95597](https://github.com/openclaw/openclaw/issues/95597)
- 诉求本质：记忆和 artifact 不是“尽量存”，而是要 **可控、可回滚、可精确修改**。

---

## 8) 待处理积压

以下条目当前仍处于高优先级但尚未看到明确维护者闭环，建议重点关注：

1. [Issue #95623](https://github.com/openclaw/openclaw/issues/95623) — 跨 provider replay sanitizer 失败，影响 session 可用性  
   - P1，高优先级，且已有相关 PR 队列，建议尽快跟进验证。

2. [Issue #95495](https://github.com/openclaw/openclaw/issues/95495) — memory store 静默迁移回归  
   - P1，数据/成本影响都大，虽已有修复 PR，但需要确认迁移路径与回滚策略。

3. [Issue #95610](https://github.com/openclaw/openclaw/issues/95610) — prompt cache churn  
   - 影响长期成本，适合尽早处理，避免所有 OpenAI 用户持续承受额外开销。

4. [Issue #95606](https://github.com/openclaw/openclaw/issues/95606) — stale memories 无法精删  
   - 对 memory 可信度是基础性问题，建议尽快进入产品决策或修复排期。

5. [PR #95604](https://github.com/openclaw/openclaw/pull/95604) — Discord 子 agent 进度展示  
   - 属于用户感知增强项，若证据补齐后尽快推进，会明显提升长任务可解释性。

6. [PR #95622](https://github.com/openclaw/openclaw/pull/95622) — WhatsApp QA 场景加固  
   - 该类测试 PR 对渠道稳定性很重要，但当前仍处于“needs proof”，建议维护者尽快确认验证链路。  
   - 链接：<https://github.com/openclaw/openclaw/pull/95622>

7. [PR #95626](https://github.com/openclaw/openclaw/pull/95626) — Telegram sendRichMessage 回退修复  
   - 也是高用户可见性修复，适合尽快 review/合并。  
   - 链接：<https://github.com/openclaw/openclaw/pull/95626>

8. [PR #95580](https://github.com/openclaw/openclaw/pull/95580) — compaction timeout 使用修复  
   - 与今日 release 的“compaction 可靠性”主题高度一致，建议优先审阅。  
   - 链接：<https://github.com/openclaw/openclaw/pull/95580>

---

如果你希望，我可以把这份日报进一步整理成：
1. **适合团队晨会的 1 页简报版**，或  
2. **适合发到 Slack / 飞书的精简播报版**。

---

## 横向生态对比

下面给出一份**横向对比分析报告**，面向技术决策者与开发者，尽量用数据说话、用结论落点。

---

# 1) 生态全景

过去 24 小时，这批个人 AI 助手 / 自主智能体项目整体呈现出一个很清晰的阶段特征：**“从功能可用，进入可靠性治理”**。  
多数活跃项目不再只堆新能力，而是在集中处理 **会话状态、跨模型回退、记忆迁移、MCP 安全边界、渠道一致性、CI/安装稳定性** 等底层问题。  
这说明生态已经从“原型竞争”进入“真实用户压力测试”阶段，用户开始用生产级标准衡量这些智能体系统。  
另一个明显趋势是：**多平台、多 provider、多工具链并存**，因此“兼容性”和“可回退”正在变成核心竞争力。  
总体看，这是一个**高迭代、强修复、重工程质量**的开源生态。

---

# 2) 各项目活跃度对比

> 说明：以下为过去 24 小时的动态摘要口径，按你提供的数据汇总。  
> “健康度评估”是基于活跃度、问题集中度、修复闭环情况做的综合判断。

| 项目 | Issues 更新 | PR 更新 | Release | 今日健康度评估 |
|---|---:|---:|---|---|
| OpenClaw | 12 | 16 | 1 个 beta 版 | **高活跃，修复导向明确；稳定性风险仍高** |
| NanoBot | 5 | 10 | 无 | **活跃，安全/会话问题集中；工程压力较大** |
| Hermes Agent | 50 | 50 | 无 | **极高活跃，快速扩张期；稳定性磨合明显** |
| PicoClaw | 0 | 1 | 无 | **低活跃，平稳但推进慢** |
| NanoClaw | 2 | 4 | 无 | **中低活跃，安全修补优先** |
| NullClaw | 0 | 0 | 无 | **静默** |
| IronClaw | 1 | 9 | 无 | **中高活跃，CI/测试收敛期，健康度较好** |
| LobsterAI | 1 | 0 | 无 | **低活跃，但出现高优先级安全告警** |
| TinyClaw | 0 | 0 | 无 | **静默** |
| Moltis | 0 | 0 | 无 | **静默** |
| CoPaw | 5 | 14 | 无 | **较活跃，UI/移动端与会话稳定性并进** |
| ZeptoClaw | 0 | 0 | 无 | **静默** |
| ZeroClaw | 9 | 27 | 无 | **高活跃，修复与兼容性收敛中** |

### 活跃度分层
- **第一梯队：** Hermes Agent、ZeroClaw、OpenClaw、CoPaw  
  特征：PR/Issue 都高，说明社区参与和工程推进都很活跃。
- **第二梯队：** NanoBot、IronClaw、NanoClaw  
  特征：问题集中、修复推进明显，偏“质量治理”。
- **低活跃/静默：** PicoClaw、LobsterAI、NullClaw、TinyClaw、Moltis、ZeptoClaw  
  特征：要么规模小，要么当前没有明显讨论热度。

---

# 3) OpenClaw 在生态中的定位

## 3.1 核心结论
OpenClaw 在这批项目里，最像一个**“核心 runtime / 参考实现型”**项目：  
它不是单纯做 UI，也不是只做渠道接入，而是聚焦在 **session state、failover、memory migration、prompt cache、compaction** 这类智能体底层可靠性问题上。

## 3.2 相比同类的优势
**优势 1：问题层级更底层**
- 今天的热点集中在：
  - 跨 provider replay 兼容
  - session state 维持
  - memory store 迁移
  - prompt cache 稳定性
- 这说明 OpenClaw 不是只修“表层体验”，而是在修**智能体内核**。

**优势 2：已进入 beta 稳定化阶段**
- 今日发布了 **v2026.6.10-beta.1**
- 说明项目已经从“功能堆叠”转向“稳定性打磨”
- 这在开源 AI 智能体项目里通常意味着成熟度更高

**优势 3：修复价值密度高**
- 今日仅合入/关闭 2 个 PR，但都直击关键路径：
  - 长上下文 prompt cache 稳定性
  - provider upstream_error 可回退
- 这类修复对真实用户的价值，往往高于大量小功能。

## 3.3 技术路线差异
OpenClaw 的路线更偏：
- **会话连续性优先**
- **多 provider 容错优先**
- **记忆系统可迁移、可恢复优先**
- **长任务/复杂上下文稳定性优先**

这和其他项目的差异很明显：
- **Hermes Agent** 更偏多平台、多入口、多工作流编排
- **NanoBot / ZeroClaw** 更偏 MCP、安全边界、渠道兼容和运行时稳定
- **CoPaw** 更偏前端交互、移动端可用性
- **IronClaw** 更偏 CI、测试闭包、工程基础设施
- **OpenClaw** 更像“底层能力中枢”

## 3.4 社区规模对比
从今日活跃量看：
- OpenClaw 属于**中高活跃**
- 但绝对热度不如 Hermes（50/50）这种超高讨论型项目
- 也不如 ZeroClaw 那样 PR 面很广、修复面很散

不过，OpenClaw 的优势不在“数量最大”，而在于：
- **讨论更集中**
- **问题更接近核心 runtime**
- **用户更接近真实生产压力测试**

换句话说：  
**OpenClaw 的社区规模未必最大，但“问题含金量”很高。**

---

# 4) 共同关注的技术方向

下面是跨项目反复出现的共同需求。

## 4.1 会话连续性与状态一致性
涉及项目：
- **OpenClaw**：session state、replay、restart、subagent completion
- **NanoBot**：duplicate tool_use id 导致 session poisoning
- **Hermes Agent**：profile override、thinking state、desktop/TUI 会话生命周期
- **CoPaw**：会话切换串台、消息队列污染
- **ZeroClaw**：配置传播不一致、alias rename 影响 task stack

共同诉求：
- 会话不能断
- 状态不能漂移
- 重启/切换/回退后要可恢复、可重放

---

## 4.2 跨 provider / 多模型回退能力
涉及项目：
- **OpenClaw**：provider upstream_error 视为可回退瞬态失败
- **NanoBot**：streamed tool_use id 重复导致 Anthropic 400
- **Hermes Agent**：delegate_task 按调用覆盖 model/provider、动态 thinking
- **CoPaw**：自动模型 failover 未真正生效
- **ZeroClaw**：provider 能力一致性、NVIDIA vision 补齐、model_switch 动态读取

共同诉求：
- 多模型不是“配置上支持”就够了，**运行时要真的可切换**
- 异常要能 fallback，而不是把整个 session 打死

---

## 4.3 记忆、迁移与缓存稳定性
涉及项目：
- **OpenClaw**：memory store 静默迁移、prompt cache prefix churn
- **NanoBot**：search_history / memory history 可检索
- **ZeroClaw**：channel tool prompts 与裁剪、模型目录动态化
- **Hermes Agent**：长期配置、profile 生命周期一致性
- **IronClaw**：测试闭包与缓存复用，虽然不属于记忆但同样是“一致性”问题

共同诉求：
- 迁移必须显式
- 缓存不能轻易失效
- 记忆要能查、能删、能追踪

---

## 4.4 MCP / 工具权限边界与安全隔离
涉及项目：
- **NanoBot**：enabledTools 绕过、资源与 prompt 暴露
- **LobsterAI**：私网访问默认恢复、SSRF 防护弱化
- **ZeroClaw**：MCP SecurityPolicy 要应用到 channel tool prompts
- **Hermes Agent**：header/cookie 脱敏、MCP OAuth 超时
- **NanoClaw**：approval smuggling、symlink 越界写入

共同诉求：
- 工具权限不能“看起来禁用、实际仍暴露”
- 审批要透明
- 默认安全边界要保守

---

## 4.5 多渠道交互一致性
涉及项目：
- **Hermes Agent**：Telegram / Teams / Matrix / WhatsApp
- **OpenClaw**：Discord 进度展示、Telegram fallback
- **CoPaw**：Feishu 群聊响应规则、移动端 UI
- **ZeroClaw**：Discord autocomplete、channel routing、gateway
- **NanoBot**：web fetch / MCP / onboarding wizard

共同诉求：
- 渠道行为要一致
- 配置要真的生效
- UI/交互不能因为平台不同而偏离

---

## 4.6 安装、CI、依赖与发布稳定性
涉及项目：
- **IronClaw**：full dependency closure、crates.io retry、Rust cache
- **NanoClaw**：host socket、dead peer service cleanup
- **ZeroClaw**：install.sh 架构识别、Docker 构建、gateway fail fast
- **PicoClaw**：文档与安装说明补全
- **OpenClaw / Hermes**：beta 稳定性与回归验证

共同诉求：
- “能装上、能跑起来”仍然是决定 adoption 的第一关
- CI 覆盖和发布链路稳定性正在变成开源 agent 项目的硬指标

---

# 5) 差异化定位分析

## 5.1 按功能侧重划分
| 项目 | 功能侧重 |
|---|---|
| OpenClaw | 核心运行时、会话状态、回退、记忆迁移 |
| Hermes Agent | 多平台接入、gateway、桌面/TUI、MCP 编排 |
| NanoBot | MCP 安全、会话污染修复、历史检索 |
| CoPaw | 前端体验、移动端适配、群聊/多会话交互 |
| ZeroClaw | runtime/gateway/provider/channel 的综合修复与能力补齐 |
| IronClaw | CI、测试闭包、依赖治理、工程基础设施 |
| NanoClaw | 安全、安装/更新、生命周期管理 |
| LobsterAI | 浏览器/网络边界安全 |
| PicoClaw | 使用引导、技能发现与安装体验 |
| 其余静默项目 | 当前无足够信息，暂难判断 |

## 5.2 按目标用户划分
- **OpenClaw**
  - 目标用户：重度 agent 用户、需要长会话和多 provider 容错的开发者/团队
- **Hermes Agent**
  - 目标用户：多平台、多入口、需要编排复杂工作流的用户
- **NanoBot / ZeroClaw**
  - 目标用户：关注 MCP、工具权限、安全隔离的高级用户
- **CoPaw**
  - 目标用户：更关注前端体验、移动端使用、多会话操作的用户
- **IronClaw**
  - 目标用户：维护者、CI/工程治理导向的开发团队
- **PicoClaw**
  - 目标用户：新手、需要技能搜索和安装引导的用户
- **LobsterAI**
  - 目标用户：涉及浏览器自动化或内网访问场景的用户

## 5.3 按技术架构差异划分
- **核心 runtime 型：** OpenClaw、ZeroClaw
- **多渠道编排型：** Hermes Agent、CoPaw
- **安全边界型：** NanoBot、NanoClaw、LobsterAI
- **工程基础设施型：** IronClaw
- **体验/文档型：** PicoClaw

---

# 6) 社区热度与成熟度

## 6.1 快速迭代阶段
这类项目的特征是：Issue/PR 都多，且集中在基础可靠性上。

- **Hermes Agent**
  - 50 Issues 更新 / 50 PR 更新
  - 明显处于高速迭代期
  - 风险：边做边暴露问题
- **ZeroClaw**
  - 9 Issues / 27 PR
  - 修复密度高，兼顾安全与兼容性
- **OpenClaw**
  - 12 Issues / 16 PR + beta release
  - 说明已进入“高频修复 + beta 稳定化”
- **CoPaw**
  - 5 Issues / 14 PR
  - UI 与稳定性并行，仍在快速收敛

## 6.2 质量巩固阶段
这类项目不一定最热，但非常明显在做“工程收口”。

- **IronClaw**
  - 重心在 CI、测试闭包、依赖治理
  - 典型的质量巩固阶段
- **NanoClaw**
  - 关注安全与安装生命周期
  - 修复优先，版本未收束
- **NanoBot**
  - 安全隔离、会话污染、历史检索
  - 属于质量治理和能力补强并行

## 6.3 低活跃或静默阶段
- **PicoClaw、LobsterAI、NullClaw、TinyClaw、Moltis、ZeptoClaw**
- 特征：
  - 要么社区规模小
  - 要么当前没有持续性讨论
  - 要么处于待启动/观望状态

---

# 7) 值得关注的趋势信号

## 趋势 1：智能体项目正在从“能对话”走向“能长期可靠运行”
表现：
- session state、restart、replay、compaction、failover 成为高频主题  
代表项目：
- OpenClaw、CoPaw、ZeroClaw、NanoBot、Hermes

**对开发者的参考价值：**
- 不要把“单轮成功”当成产品完成
- 需要把状态机、重放、恢复、回滚当成一等公民

---

## 趋势 2：跨 provider 兼容性正在成为核心产品能力
表现：
- tool id 格式、provider error 分类、模型能力一致性、fallback chain  
代表项目：
- OpenClaw、ZeroClaw、CoPaw、Hermes

**参考价值：**
- 抽象层要考虑“异构 provider 的最坏情况”
- 兼容不是接口层适配，而是运行时语义对齐

---

## 趋势 3：记忆和缓存已经从“效率优化”变成“成本与可信度问题”
表现：
- prompt cache churn、memory migration、re-embed 风险、历史检索  
代表项目：
- OpenClaw、NanoBot、ZeroClaw

**参考价值：**
- 缓存失效意味着成本上涨
- 迁移无提示意味着用户信任下降
- 记忆系统需要可追踪、可删除、可回滚

---

## 趋势 4：MCP 与工具生态的扩张正在同步放大安全面
表现：
- enabledTools 绕过、approval smuggling、SSRF、OAuth 超时、tool prompt policy  
代表项目：
- NanoBot、NanoClaw、LobsterAI、ZeroClaw、Hermes

**参考价值：**
- 工具生态越强，权限边界越要收紧
- 审批链路必须可见、可审计、可验证

---

## 趋势 5：多平台交互与移动端可用性变成“产品成熟度指标”
表现：
- Telegram / Feishu / Teams / Matrix / Discord / WhatsApp
- 移动端响应式、群聊响应规则、autocomplete、进度展示  
代表项目：
- Hermes、CoPaw、OpenClaw、ZeroClaw

**参考价值：**
- agent 产品不再只是 CLI/网页 demo
- 渠道一致性、移动端适配、可访问性会直接影响留存

---

## 趋势 6：CI、安装、依赖闭包、发布链路正在成为隐性竞争力
表现：
- IronClaw 的完整 closure CI
- NanoClaw 的 socket / service 清理
- ZeroClaw 的 install.sh / Docker / fail fast
- PicoClaw 的安装说明补齐

**参考价值：**
- 开源智能体项目的竞争，越来越多发生在“能否稳定安装、升级、回归”上
- 工程基础设施会直接影响社区贡献效率

---

# 一句话总结

这批项目所代表的开源 AI 智能体生态，正在从**功能竞争**转向**可靠性、兼容性、安全性和可运维性竞争**。  
OpenClaw 处在一个很有代表性的节点：**已经进入 beta 稳定化，且问题集中在核心 runtime 能力**，这使它在生态中具备较强的技术参考价值。  
如果你是开发者，最值得关注的不是“谁功能最多”，而是**谁先把状态一致性、回退机制、记忆迁移和安全边界做扎实**——这将决定下一阶段谁能真正进入可规模化使用。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-06-22）

## 1. 今日速览
今天 NanoBot 处于**高活跃、低发布**状态：过去 24 小时内出现了 5 条 Issues 和 10 条 PR，且**没有新版本发布**。  
从内容上看，讨论焦点集中在三条主线：**稳定性修复**、**MCP 安全/隔离修正**、以及**历史记忆与 Web/心跳相关能力增强**。  
值得注意的是，今日新增问题里有两条明确的安全告警，另有一条会直接“毒化会话”的流式 bug，说明项目当前的优先级更偏向**修复可用性与安全边界**。  
总体判断：项目热度高、反馈密集，工程推进方向清晰，但主线合并进度仍偏慢，短期内维护压力不小。  

---

## 3. 项目进展
今日仅有 **1 个 PR 收束**，其余 9 个仍在待合并状态，说明代码层面的“落地”还在排队中。  

- [#4432 docs(readme): update news through 2026-06-20](https://github.com/HKUDS/nanobot/pull/4432)  
  这是一次**文档回填/日更整理**，把 README 中的新闻记录补到 2026-06-20，并为 2026-06-21 的发布日留出位置。  
  **推进价值**：主要改善项目可读性和发布信息一致性，对运行时功能没有直接影响，但有助于降低新用户理解成本。  

**项目整体向前迈进的幅度：**  
- 从“主功能”角度看，今天没有明显的主线合并；  
- 从“工程健康度”角度看，多个关键修复 PR 已并行推进，说明团队正在同时处理**崩溃、会话污染、安全隔离、UI 体验**等问题；  
- 结论是：**进展有，但更多体现在修复管线和问题收敛，而非功能上线。**

---

## 4. 社区热点
> 说明：当前数据里 Issues/PR 的评论数大多为 0 或未提供，因此无法用“互动量”精确排序；以下按**影响面 + 紧急程度 + 关联 PR 密度**判断今天的热点。

### 4.1 MCP 安全隔离问题
- [#4434 [Security] Nanobot MCP `enabledTools` deny-all policy bypass exposes MCP resources and prompts to the model](https://github.com/HKUDS/nanobot/issues/4434)  
- [#4435 [Security] nanobot MCP `enabledTools` allowlist bypass exposes resource and prompt capabilities](https://github.com/HKUDS/nanobot/issues/4435)  
- 关联修复：[#4436 fix(tools): gate MCP resource and prompt registration behind enabledTools](https://github.com/HKUDS/nanobot/pull/4436)  

**为什么热：**  
这类问题直接挑战了 MCP 配置的核心承诺：`enabledTools` 如果不能真正阻断资源/提示能力，就会造成“配置看似禁用，实际仍可暴露”的风险。  
这不是单纯的 bug，而是**安全边界可信度问题**，非常容易引发用户对平台隔离能力的信任下降。

### 4.2 流式响应的会话污染问题
- [#4442 [bug] Duplicate tool_use ids in streamed responses poison a session](https://github.com/HKUDS/nanobot/issues/4442)  
- 关联修复：[#4443 fix: guard against duplicate tool_use ids in streamed responses](https://github.com/HKUDS/nanobot/pull/4443)、[#4444 fix(providers): dedupe tool_use ids to prevent Anthropic 400s](https://github.com/HKUDS/nanobot/pull/4444)  

**为什么热：**  
这是“单次异常流 → 整个 session 持续报 400 → 代理沉默”的典型高痛点故障，影响的是**会话级可用性**。  
用户会非常在意这类问题，因为它会让系统表现为“突然失声”，且恢复成本高。

### 4.3 记忆/历史检索能力
- [#4440 [enhancement] Proposal: a read-only `search_history` tool for recalling `memory/history.jsonl`](https://github.com/HKUDS/nanobot/issues/4440)  
- 关联实现：[#4439 feat(tools): add a read-only search_history tool](https://github.com/HKUDS/nanobot/pull/4439)  

**为什么热：**  
这是典型的“智能体长期记忆可检索性”诉求：用户想要回忆旧上下文，但又不希望把历史日志直接塞进当前上下文窗口。  
它体现的是对**长期对话、任务连续性、上下文成本控制**的真实需求。

### 4.4 任务调度与模型成本优化
- [#4431 Add heartbeat-specific model override](https://github.com/HKUDS/nanobot/issues/4431)  
- 关联实现：[#4437 [codex] add heartbeat trigger command](https://github.com/HKUDS/nanobot/pull/4437)  

**为什么热：**  
这反映出用户开始把 NanoBot 用在**后台持续运行**场景，进而关注“主模型太贵、心跳任务可否走廉价模型”的成本问题。  

---

## 5. Bug 与稳定性
按严重程度排序如下：

### 高危：MCP 安全隔离失效
- [#4434](https://github.com/HKUDS/nanobot/issues/4434)  
- [#4435](https://github.com/HKUDS/nanobot/issues/4435)  
**影响：** `enabledTools` 被绕过后，资源与 prompts 仍可能暴露给模型，属于**权限边界失守**。  
**是否已有 fix PR：** 有，见 [#4436](https://github.com/HKUDS/nanobot/pull/4436)。  
**判断：** 这是今天最应优先处理的一组问题。

### 高危：流式响应重复 `tool_use id` 导致会话报废
- [#4442](https://github.com/HKUDS/nanobot/issues/4442)  
**影响：** 一旦 session 中持久化了重复的 `tool_use id`，后续所有请求可能被 Anthropic 直接拒绝，导致代理“静默失效”。  
**是否已有 fix PR：** 有，见 [#4443](https://github.com/HKUDS/nanobot/pull/4443) 与 [#4444](https://github.com/HKUDS/nanobot/pull/4444)。  
**判断：** 这是典型的“单点异常放大成持续性故障”的稳定性问题，优先级极高。

### 中高危：MCP 连接重连路径崩溃
- [#4441 fix(mcp): force-close streamable_http generator on reconnect failure](https://github.com/HKUDS/nanobot/pull/4441)  
**影响：** Gateway 在 MCP 会话断开并重连时出现 `RuntimeError`，属于**运行时崩溃/异常终止**风险。  
**是否已有 fix PR：** 该 PR 本身就是修复。  
**判断：** 说明项目的连接管理与异步取消边界仍有脆弱点。

### 其他稳定性/体验问题
- [#4438 fix(cli): show search engines (incl. Keenable) in onboard wizard](https://github.com/HKUDS/nanobot/pull/4438)  
**影响：** 不会直接导致崩溃，但会误导配置流程，影响新用户上手成功率。  

---

## 6. 功能请求与路线图信号
今天的功能需求非常集中，且与已有 PR 高度重合，说明这些很可能进入下一轮版本：

### 6.1 历史检索工具：高概率进入下一版本
- 需求：[#4440](https://github.com/HKUDS/nanobot/issues/4440)  
- 实现中：[#4439](https://github.com/HKUDS/nanobot/pull/4439)  

**路线图信号：**  
这是明确的“用户提需求 → 已有 PR 跟进”的模式，优先级较高，极可能成为近期功能点。

### 6.2 心跳任务独立模型/触发器：偏中高优先级
- 需求：[#4431](https://github.com/HKUDS/nanobot/issues/4431)  
- 相关实现：[#4437](https://github.com/HKUDS/nanobot/pull/4437)  

**路线图信号：**  
表明 NanoBot 不再只是“主对话代理”，而是在向**后台自治任务调度器**演进。  
如果后续继续完善，这条线会直接影响成本和可扩展性。

### 6.3 Web 访问能力可配置化：有明确产品化倾向
- 相关 PR：[#4430 feat(web): configure web_fetch provider](https://github.com/HKUDS/nanobot/pull/4430)  

**路线图信号：**  
`web_fetch` provider 的显式配置，意味着 Web 读取能力正在从“隐式开关”走向“可控策略”，有利于 WebUI/企业场景配置管理。

---

## 7. 用户反馈摘要
从今天的 Issues/PR 摘要里，可以提炼出几类非常真实的用户痛点：

1. **“别把一次流式错误变成整个会话报废”**  
   - 对应：[#4442](https://github.com/HKUDS/nanobot/issues/4442)  
   - 用户在意的是会话连续性和容错，不希望因 provider 或流拼装问题导致整个 session 失效。

2. **“记忆要能查，但不要污染当前上下文”**  
   - 对应：[#4440](https://github.com/HKUDS/nanobot/issues/4440)、[#4439](https://github.com/HKUDS/nanobot/pull/4439)  
   - 这反映出用户已经在真实任务中积累了长历史，需要高效回忆旧信息。

3. **“允许列表就应该真的生效”**  
   - 对应：[#4434](https://github.com/HKUDS/nanobot/issues/4434)、[#4435](https://github.com/HKUDS/nanobot/issues/4435)、[#4436](https://github.com/HKUDS/nanobot/pull/4436)  
   - 用户对安全边界的预期非常明确：配置了 deny-all / allowlist 后，资源和 prompt 也必须一并受限。

4. **“后台心跳应该走更便宜的模型”**  
   - 对应：[#4431](https://github.com/HKUDS/nanobot/issues/4431)  
   - 使用场景已经从交互式聊天扩展到持续运行任务，成本敏感度明显提升。

5. **“新手配置流程不能把人带偏”**  
   - 对应：[#4438](https://github.com/HKUDS/nanobot/pull/4438)  
   - onboarding/wizard 的正确性直接影响初次使用体验，尤其是搜索引擎这种配置项，误导成本高。

---

## 8. 待处理积压
> 数据窗口内未看到“长期沉默”的历史陈旧项，但今天新增的高优先级开放项已经形成了明显短期积压，建议维护者优先处理。

### 优先级最高：安全与会话可用性
- [#4434](https://github.com/HKUDS/nanobot/issues/4434)  
- [#4435](https://github.com/HKUDS/nanobot/issues/4435)  
- [#4442](https://github.com/HKUDS/nanobot/issues/4442)  
- 相关修复 PR：[#4436](https://github.com/HKUDS/nanobot/pull/4436)、[#4443](https://github.com/HKUDS/nanobot/pull/4443)、[#4444](https://github.com/HKUDS/nanobot/pull/4444)  

### 功能待决策：已经有实现方向，适合尽快评审
- [#4440](https://github.com/HKUDS/nanobot/issues/4440) ↔ [#4439](https://github.com/HKUDS/nanobot/pull/4439)  
- [#4431](https://github.com/HKUDS/nanobot/issues/4431) ↔ [#4437](https://github.com/HKUDS/nanobot/pull/4437)  
- [#4430](https://github.com/HKUDS/nanobot/pull/4430)  
- [#4438](https://github.com/HKUDS/nanobot/pull/4438)  

### 稳定性修复待合并
- [#4441](https://github.com/HKUDS/nanobot/pull/4441)  
- [#4433](https://github.com/HKUDS/nanobot/pull/4433)  

**维护建议：**  
1. 先处理 **MCP 安全边界**，因为它是信任底座；  
2. 再处理 **`tool_use` 去重**，避免 session 被永久污染；  
3. 然后集中评审 **search_history / heartbeat / web_fetch** 这类已形成明确产品方向的功能 PR。  

如果你愿意，我也可以把这份日报再整理成一个**适合直接发到团队群里的简版摘要**。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
**日期：2026-06-22**  
仓库：<https://github.com/nousresearch/hermes-agent>

## 1) 今日速览
- 过去 24 小时内，Hermes Agent 保持**高强度活跃**：Issues 更新 50 条、PR 更新 50 条，但**没有新版本发布**，说明当前仍处于持续迭代和问题修复期，而非稳定发版期。
- 社区讨论明显聚焦在 **gateway / desktop(TUI) / MCP / auth** 等核心链路，既有崩溃、时序、兼容性问题，也有模型路由、thinking 开关、权限与安全相关诉求。
- 今日信号显示：项目**功能扩张很快**，但稳定性压力也同步上升，尤其是桌面端启动、MCP 生态、跨平台适配与安全红线（secret redaction）相关问题。
- 从“7 个 PR 已合并/关闭、50 个 PR 更新”来看，维护节奏依旧紧凑；但当前更像是**大量补丁和能力补齐并行**，而不是一次性的大版本收敛。

## 2) 版本发布
- **无新 Releases**  
  <https://github.com/nousresearch/hermes-agent/releases>

## 3) 项目进展
今日可确认的重要 PR 进展中，最值得关注的是以下修复/增强方向：

- **Telegram 富文本 finalize 兼容性修复**：解决流式预览与最终编辑消息在 `parse_mode` 切换时的渲染重叠问题，提升 Telegram 端消息展示稳定性。  
  PR: [#50512](https://github.com/nousresearch/hermes-agent/pull/50512)（已关闭/合并）

- **桌面端 second-instance 崩溃保护**：针对 `mainWindow` 已销毁后仍触发聚焦导致的崩溃，补上空对象/销毁状态守卫，属于典型桌面稳定性修复。  
  PR: [#50515](https://github.com/nousresearch/hermes-agent/pull/50515)（OPEN，修复 #50491）

- **/api/status 触发重复 pip 安装问题修复**：将 dashboard liveness probe 的副作用降到最低，避免状态轮询引发不必要的安装/检查开销，对启动和后台稳定性很关键。  
  PR: [#50524](https://github.com/nousresearch/hermes-agent/pull/50524)（OPEN）

- **CLI /prompt 编辑器写入能力**：新增通过 `$EDITOR` 编写多行提示词的交互，提升 CLI 的长提示创作体验。  
  PR: [#50509](https://github.com/nousresearch/hermes-agent/pull/50509)（OPEN）

- **安全与密钥处理补强**：围绕 header / cookie / set-cookie 的脱敏继续补洞，说明项目在安全面上的收敛仍在推进。  
  PR: [#50514](https://github.com/nousresearch/hermes-agent/pull/50514)（OPEN）

**整体推进判断**：今天的 PR 方向偏“修稳定性 + 增强可用性 + 补安全缺口”，对项目成熟度是正向推进；但大量边缘场景和平台适配问题同时暴露，说明 Hermes Agent 正处于**扩张期的工程磨合阶段**。

## 4) 社区热点
以下是今天讨论最活跃、最能代表社区诉求的条目：

1. **Gateway/TUI profile override 被重置，导致 SOUL.md/skills 解析回根 profile**  
   - Issue: [#50233](https://github.com/nousresearch/hermes-agent/issues/50233)  
   - 评论数：3  
   - 诉求分析：这是典型的“上下文/配置生命周期”问题，用户希望 profile 覆盖在 agent 构建与 lazy prompt 生成全过程内保持一致，说明大家对**多 profile、个性化行为隔离**很敏感。

2. **delegate_task 支持按调用覆盖 model/provider**  
   - Issue: [#50202](https://github.com/nousresearch/hermes-agent/issues/50202)  
   - 评论数：3  
   - 诉求分析：反映出用户开始把 Hermes 用于**多模型子代理编排**，希望同一工作流里不同任务使用不同模型，属于较明确的路线图信号。

3. **动态 thinking 开关/自我识别触发 escalation**  
   - Issue: [#50293](https://github.com/nousresearch/hermes-agent/issues/50293)  
   - 评论数：2  
   - 诉求分析：用户关注成本与推理能力之间的平衡，希望模型能按任务复杂度自适应启停 thinking，说明“**按需推理**”是强需求。

4. **Teams 端 slash confirm 没有按钮**  
   - Issue: [#50269](https://github.com/nousresearch/hermes-agent/issues/50269)  
   - 评论数：2  
   - 诉求分析：多平台一致性交互仍是痛点，用户希望 `/new`、`/reset`、`/undo` 这类高风险操作在 Teams 上也具备明确确认 UI。

5. **MCP OAuth 连接 40s 超时**  
   - Issue: [#50485](https://github.com/nousresearch/hermes-agent/issues/50485)  
   - 评论数：1  
   - 诉求分析：MCP 正在快速扩张，但 OAuth 这类交互式流程对超时、探测时序很敏感，用户期待更贴近真实授权流程的容错。

## 5) Bug 与稳定性
按严重程度排序，今日最值得关注的稳定性问题如下：

### P1 / 高严重度
- **FTS 写入损坏导致会话历史立即丢失**  
  Issue: [#50502](https://github.com/nousresearch/hermes-agent/issues/50502)  
  影响：表面上 `state.db` 看似正常，但消息插入通过 FTS 触发器失败，直接影响会话持久化与聊天历史完整性。  
  Fix 状态：**未见对应 fix PR**。

- **安全配置仍可能泄露头部凭证 / Cookie**  
  PR: [#50514](https://github.com/nousresearch/hermes-agent/pull/50514)  
  这是对已合并/已修补漏洞的补强，说明安全脱敏问题还没完全收口。  
  Fix 状态：**已有修复方向，PR 仍 OPEN**。

### P2 / 中高严重度
- **MCP OAuth 连接探测 40s 超时**  
  Issue: [#50485](https://github.com/nousresearch/hermes-agent/issues/50485)  
  影响：交互式授权流程在探测阶段被过早中止，阻断 MCP 添加与配置。  
  Fix 状态：**未见明确 fix PR**。

- **单个失败的 stdio MCP server 连锁拖垮整个 MCP bridge**  
  Issue: [#50394](https://github.com/nousresearch/hermes-agent/issues/50394)  
  影响：健康工具也会出现 `Unknown tool`，属于架构级稳定性隐患。  
  Fix 状态：**未见明确 fix PR**。

- **Desktop Thinking toggle 回弹 + `config.set reasoning` 写入异常键**  
  Issue: [#50449](https://github.com/nousresearch/hermes-agent/issues/50449)  
  影响：用户看见的开关状态与实际配置不一致，容易引发“功能没生效”的误判。  
  Fix 状态：**未见明确 fix PR**。

- **GitHub Copilot provider 返回 empty base URL**  
  Issue: [#50252](https://github.com/nousresearch/hermes-agent/issues/50252)  
  影响：即使 token 有效、检测到模型，也无法推理。  
  Fix 状态：**未见明确 fix PR**。

### P3 / 中等严重度
- **Desktop second-instance 崩溃**  
  Issue: [#50491](https://github.com/nousresearch/hermes-agent/issues/50491)  
  状态：已有对应修复 PR [#50515](https://github.com/nousresearch/hermes-agent/pull/50515)。

- **TUI session 不记录 cwd，Desktop 无法按 workspace 分组**  
  Issue: [#50438](https://github.com/nousresearch/hermes-agent/issues/50438)  
  影响：工作区归类混乱，主要影响可用性与会话管理体验。  
  Fix 状态：**未见明确 fix PR**。

- **Dashboard PTY WebSocket 在代理/公网场景被拒绝**  
  Issue: [#50365](https://github.com/nousresearch/hermes-agent/issues/50365)  
  影响：HTTP 可达但 WebSocket 断开，反映出跨代理部署兼容性问题。  
  Fix 状态：**未见明确 fix PR**。

## 6) 功能请求与路线图信号
今天的功能请求非常清晰地指向几个下一版本优先方向：

### 1. 多模型/多子代理编排
- **delegate_task 按调用覆盖 model/provider**  
  Issue: [#50202](https://github.com/nousresearch/hermes-agent/issues/50202)  
- **self-escalation 动态 thinking 开关**  
  Issue: [#50240](https://github.com/nousresearch/hermes-agent/issues/50240)  
- **动态 thinking ON/OFF 自我检测**  
  Issue: [#50293](https://github.com/nousresearch/hermes-agent/issues/50293)

> 信号：Hermes 正在从“单一对话代理”向“**可编排的任务执行系统**”演进。

### 2. CLI / 交互体验增强
- **/prompt 进入编辑器编写长提示**  
  PR: [#50509](https://github.com/nousresearch/hermes-agent/pull/50509)  
- **API 错误转成人类可读提示**  
  Issue: [#50460](https://github.com/nousresearch/hermes-agent/issues/50460)  
- **/new /reset /undo 等确认按钮在 Teams 上可视化**  
  Issue: [#50269](https://github.com/nousresearch/hermes-agent/issues/50269)

> 信号：用户希望 Hermes 不只是“能用”，而是**更像成熟产品**。

### 3. MCP 与工具生态继续扩张
- **MCP OAuth 超时修复**  
  Issue: [#50485](https://github.com/nousresearch/hermes-agent/issues/50485)  
- **API REST sessions 也加载 MCP tools**  
  Issue: [#50248](https://github.com/nousresearch/hermes-agent/issues/50248)  
- **MCP bridge 容错增强**  
  Issue: [#50394](https://github.com/nousresearch/hermes-agent/issues/50394)

> 信号：MCP 正在成为 Hermes 的核心卖点之一，但也正在成为稳定性压力最大的模块。

### 4. 平台能力补齐
- **Telegram 群组按用户路由**  
  Issue: [#50462](https://github.com/nousresearch/hermes-agent/issues/50462)  
- **WhatsApp channel_prompts 支持**  
  Issue: [#50320](https://github.com/nousresearch/hermes-agent/issues/50320)  
- **Matrix 反应 emoji 修正**  
  Issue: [#50429](https://github.com/nousresearch/hermes-agent/issues/50429)

> 信号：Hermes 的多平台策略继续推进，平台一致性与细粒度路由是下一阶段重点。

## 7) 用户反馈摘要
从今天的 Issues 内容看，真实用户痛点主要集中在以下几类：

- **“我明明改了配置，但系统行为还是旧的”**  
  典型案例：profile override 被重置、Thinking 开关回弹。  
  相关链接：[#50233](https://github.com/nousresearch/hermes-agent/issues/50233)、[#50449](https://github.com/nousresearch/hermes-agent/issues/50449)

- **“自动化/代理能力很强，但多模型协作还不够灵活”**  
  用户希望按任务切换模型、provider、thinking 策略。  
  相关链接：[#50202](https://github.com/nousresearch/hermes-agent/issues/50202)、[#50240](https://github.com/nousresearch/hermes-agent/issues/50240)

- **“桌面端和跨平台适配仍不够稳”**  
  启动卡死、窗口销毁崩溃、PTT/WebSocket 问题反复出现。  
  相关链接：[#50291](https://github.com/nousresearch/hermes-agent/issues/50291)、[#50491](https://github.com/nousresearch/hermes-agent/issues/50491)、[#50365](https://github.com/nousresearch/hermes-agent/issues/50365)

- **“MCP 很有用，但流程太脆弱”**  
  OAuth 超时、单点故障拖垮 bridge、REST session 不加载工具。  
  相关链接：[#50485](https://github.com/nousresearch/hermes-agent/issues/50485)、[#50394](https://github.com/nousresearch/hermes-agent/issues/50394)、[#50248](https://github.com/nousresearch/hermes-agent/issues/50248)

- **“安全和隐私要求很高，不能有明文泄露”**  
  特别是配置输出、header/cookie 脱敏。  
  相关链接：[#50245](https://github.com/nousresearch/hermes-agent/issues/50245)、[#50514](https://github.com/nousresearch/hermes-agent/pull/50514)

总体来看，用户对 Hermes 的评价是：**能力强、覆盖广，但希望更可靠、更可控、更少隐性失败**。

## 8) 待处理积压
以下条目当前仍是“高优先级待跟进”状态，建议维护者尽快分派：

- **FTS 写入腐坏导致会话历史丢失**  
  Issue: [#50502](https://github.com/nousresearch/hermes-agent/issues/50502)  
  备注：这类问题会直接损坏核心会话数据，建议优先排查。

- **MCP OAuth 探测 40s 超时**  
  Issue: [#50485](https://github.com/nousresearch/hermes-agent/issues/50485)  
  备注：对新用户接入影响大，且与交互式授权强相关。

- **Copilot provider empty base URL**  
  Issue: [#50252](https://github.com/nousresearch/hermes-agent/issues/50252)  
  备注：属于“已配置但不可用”的高挫败感问题。

- **TUI session 未记录 cwd**  
  Issue: [#50438](https://github.com/nousresearch/hermes-agent/issues/50438)  
  备注：影响 workspace 分组与桌面会话管理。

- **MCP bridge 单点故障拖垮全局工具可用性**  
  Issue: [#50394](https://github.com/nousresearch/hermes-agent/issues/50394)  
  备注：这是架构性问题，建议单独立项处理。

- **Matrix / Telegram / Teams 等平台交互不一致**  
  Issues: [#50429](https://github.com/nousresearch/hermes-agent/issues/50429)、[#50269](https://github.com/nousresearch/hermes-agent/issues/50269)、[#50320](https://github.com/nousresearch/hermes-agent/issues/50320)  
  备注：多平台体验差异会显著影响产品口碑。

---

### 综合判断
Hermes Agent 今天呈现出典型的**“高速演进 + 工程磨合”**特征：  
- 优势：功能覆盖面广，社区活跃，围绕 agent 编排、MCP、桌面端和多平台适配持续扩张。  
- 风险：稳定性、安全脱敏、会话持久化、跨平台一致性问题仍较集中。  
- 健康度：**中高活跃，但需要继续压实核心链路的可靠性**，尤其是 gateway、desktop、MCP 和 auth。

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发公众号/内部周报的精简版**，或  
2. **适合团队晨会的表格版（含优先级、影响面、建议动作）**。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-06-22）

## 1. 今日速览
PicoClaw 在过去 24 小时内整体处于**低活跃、稳定推进**状态：没有新增或关闭 Issues，也没有新版本发布，说明项目当前没有明显的故障爆发或紧急维护压力。  
今日唯一的代码层动态是 **1 条开放 PR**，内容聚焦于补充 `picoclaw skills search` 的安装说明，属于典型的“降低使用门槛”型改进。  
从健康度看，项目**问题面较平静**，但**功能推进主要停留在未合并提案**阶段，说明当前更多是增量优化而非版本驱动式迭代。  
总体判断：**项目运行平稳，社区反馈弱，开发节奏偏慢但没有明显风险信号**。  
链接：<https://github.com/sipeed/picoclaw>

---

## 2. 版本发布
今日**无新版本发布**。  
链接：<https://github.com/sipeed/picoclaw/releases>

---

## 3. 项目进展
今日没有合并或关闭的 PR，因此**没有直接进入主分支的功能增量**。  
当前最重要的推进来自 **PR #3152**：  
- 标题：`add installation instructions to picoclaw skills search`
- 方向：为 `picoclaw skills search` 输出补充技能安装方式说明
- 影响：提升新用户从“发现技能”到“安装技能”的转化效率，减少上手摩擦

从项目整体推进幅度看，今日属于**“体验优化提案在途”**，尚未形成实际发布成果；但如果该 PR 合并，会对可用性和文档完整度带来正向提升。  
链接：<https://github.com/sipeed/picoclaw/pull/3152>

---

## 4. 社区热点
今日没有 Issues 活跃，也没有多评论或高反应条目。  
当前唯一可视为社区焦点的是 **PR #3152**，尽管暂无评论和点赞，但它反映出用户/贡献者对以下诉求的关注：  
- 希望 `skills search` 的结果不仅能“搜到”，还要能“直接指导安装”
- 降低新用户理解成本
- 提升技能发现后的实际转化率

由于没有其他讨论线程，今日社区热点可概括为：**围绕使用引导与安装说明的轻量改进需求**。  
链接：<https://github.com/sipeed/picoclaw/pull/3152>

---

## 5. Bug 与稳定性
今日没有新增、活跃或关闭的 Issues，因此**未观测到新的 Bug、崩溃或回归问题**。  
按严重程度排序，今日稳定性信号为：  

1. **高严重度问题：无**  
   - 未发现影响核心功能的故障  
   - 链接：<https://github.com/sipeed/picoclaw/issues>

2. **中严重度问题：无**  
   - 未见功能降级、兼容性或使用阻塞类反馈  
   - 链接：<https://github.com/sipeed/picoclaw/issues>

3. **低严重度问题：无**  
   - 未见文档、提示语或体验细节类 bug 报告  
   - 链接：<https://github.com/sipeed/picoclaw/issues>

结论：**项目今日稳定性良好，暂无已知修复需求。**  
链接：<https://github.com/sipeed/picoclaw/issues>

---

## 6. 功能请求与路线图信号
今日最明确的功能请求来自 **PR #3152**，它本质上是一个“功能增强 + 使用引导补全”提案：  
- 需求点：在 `picoclaw skills search` 中加入安装说明
- 用户信号：用户希望工具输出能直接指导下一步操作，而不是仅提供信息
- 路线图含义：未来版本可能会继续加强**技能发现、安装、启用、引导式交互**等链路

结合现有信息判断，以下方向更可能进入下一阶段：  
- **安装/使用文档自动补全**
- **技能搜索结果增强**
- **新手引导与可操作提示优化**

由于当前没有其他功能 PR 或 Issue 进行交叉印证，不能确认是否已进入正式路线图，但该提案**符合低风险、强体验收益**的演进方向。  
链接：<https://github.com/sipeed/picoclaw/pull/3152>

---

## 7. 用户反馈摘要
今日没有 Issues 评论，因此**没有可提炼的直接用户反馈样本**。  
不过从 PR #3152 的内容可以间接看出潜在用户痛点：  
- “找得到技能，但不知道怎么装”
- 需要更完整的操作闭环
- 希望搜索结果更像“可执行指南”而不仅是索引输出

这说明 PicoClaw 的用户场景可能正在从“探索功能”转向“实际使用功能”，用户对**可操作性和安装路径清晰度**的要求在上升。  
链接：<https://github.com/sipeed/picoclaw/pull/3152>

---

## 8. 待处理积压
今日没有长期未响应的 Issues，也没有可识别的陈旧 PR 积压。  
当前唯一待处理项是 **PR #3152**，它虽非积压很久，但作为今日唯一活跃变更，建议维护者尽快审阅：  
- 若接受，将直接改善技能搜索的可用性
- 若需要补充说明，可在 PR 内尽快反馈，避免小改动长期悬置

从维护视角看，当前仓库**没有明显 backlog 风险**，但也意味着项目处于“低噪声、低推进”状态，后续需要靠合并与发布来维持节奏。  
链接：<https://github.com/sipeed/picoclaw/pulls>

---

### 总体结论
PicoClaw 今日表现为**低活跃、无故障、仅有单条功能增强提案**的平稳状态。项目健康度尚可，没有稳定性风险，但也缺少版本和合入层面的实质推进；若 PR #3152 能尽快合并，项目在新手体验和技能安装链路上会有可见提升。  
链接：<https://github.com/sipeed/picoclaw>

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-06-22）

## 1. 今日速览
过去 24 小时内，NanoClaw 共出现 **2 条 Issue 更新**、**4 条 PR 更新**，其中 **2 条 PR 已合并/关闭**，但 **未发布新版本**。  
今日动态明显偏向 **安全与稳定性修复**，而不是功能扩张：新增 Issue 全部是安全相关，说明项目当前的关注点集中在风险收敛与行为边界修正。  
从更新节奏看，项目仍保持较高活跃度，维护工作持续推进；但由于暂无 Release，说明这些修复尚未形成对外版本交付。  
整体健康度判断：**维护活跃、问题意识强，但仍处于“修复优先、版本未收束”的阶段**。

---

## 2. 项目进展
今日最重要的已合并/关闭 PR 是：

- **#2825 [CLOSED] fix(setup): wait for the host socket before failing the first chat**  
  链接：<https://github.com/qwibitai/nanoclaw/pull/2825>  
  作用：修复安装/初始化流程中的竞态问题，避免首次聊天时因宿主 socket 尚未就绪而误判失败。  
  价值：提升新安装用户的首次使用成功率，减少“刚装好就报错”的体验问题。

- **#2829 [CLOSED] [follows-guidelines] eee**  
  链接：<https://github.com/qwibitai/nanoclaw/pull/2829>  
  说明：从标题与摘要看更像流程/规范类提交，对核心功能推进有限，更多是仓库治理或审核流程层面的记录。

今日仍在推进但尚未完成的 PR：

- **#2826 [OPEN] fix(update-skills): nudge into skill updates, rebuild container on re-apply**  
  链接：<https://github.com/qwibitai/nanoclaw/pull/2826>  
  作用方向：确保技能更新不会被“可跳过”处理，减少宿主更新后遗漏通道/提供方技能修复的风险。

- **#2830 [OPEN] fix(setup): reap dead peer service registrations whose binary is gone**  
  链接：<https://github.com/qwibitai/nanoclaw/pull/2830>  
  作用方向：清理已失效的服务注册，避免系统持续尝试启动不存在的二进制，改善长期安装残留问题。

**整体推进判断：**  
今日至少有 **2 个修复类 PR 进入完成态**，另有 **2 个面向安装/更新健壮性的修复仍在推进**。  
这意味着项目不是在“堆功能”，而是在持续修补基础体验与生命周期管理，属于 **稳态增强型进展**。

---

## 3. 社区热点
> 说明：今日新增 Issues/PR 的评论数均为 **0** 或未提供明确评论统计，因此严格来说 **没有形成活跃讨论型热点**。  
> 当前“热点”主要由 **问题严重性** 和 **安全标签** 驱动，而非评论热度。

最值得关注的两个 Issue：

- **#2828 [OPEN] [Security] NanoClaw A2A attachment forwarding follows a symlinked inbox and writes outside the target session root**  
  链接：<https://github.com/qwibitai/nanoclaw/issues/2828>  
  诉求分析：这是一个高风险安全问题，核心诉求是 **防止附件转发机制越权写入**。如果 inbox 可被符号链接替换，就可能突破会话目录边界，造成文件写入污染或任意路径写入风险。

- **#2827 [OPEN] [Security] `add_mcp_server` approval flow hides runtime `args` and `env`, enabling approval smuggling**  
  链接：<https://github.com/qwibitai/nanoclaw/issues/2827>  
  诉求分析：这是一个 **审批透明性** 问题。用户真正关心的是：审批界面看到的内容必须与实际执行参数一致，否则会出现“表面审批、实际执行不透明”的风险。

**社区关注点结论：**  
今天社区关注并不是围绕新能力，而是围绕 **“AI 代理是否能被安全地约束”**。这类问题通常意味着用户开始把 NanoClaw 作为更高权限、更高自动化程度的基础设施使用，因此对权限、审批、文件边界的敏感度显著上升。

---

## 4. Bug 与稳定性
按严重程度排序，今日相关问题主要如下：

### 1) 高严重度：A2A 附件转发可越界写入
- **#2828 [OPEN] [Security] NanoClaw A2A attachment forwarding follows a symlinked inbox and writes outside the target session root**  
  链接：<https://github.com/qwibitai/nanoclaw/issues/2828>  
  影响：可能导致文件写入越过目标会话根目录，属于明显的隔离破坏风险。  
  是否已有 fix PR：**未见对应修复 PR**。

### 2) 高严重度：`add_mcp_server` 审批可被 smuggling
- **#2827 [OPEN] [Security] `add_mcp_server` approval flow hides runtime `args` and `env`, enabling approval smuggling**  
  链接：<https://github.com/qwibitai/nanoclaw/issues/2827>  
  影响：审批内容与实际执行参数不一致，存在绕过审查/误导审批的风险。  
  是否已有 fix PR：**未见对应修复 PR**。

### 3) 中严重度：失效服务注册导致持续拉起不存在二进制
- **#2830 [OPEN] fix(setup): reap dead peer service registrations whose binary is gone**  
  链接：<https://github.com/qwibitai/nanoclaw/pull/2830>  
  影响：会留下“僵尸式”的系统注册，影响安装清理、系统整洁性与后续维护。  
  状态：**已有修复 PR（OPEN）**，说明问题已进入工程处理阶段。

### 4) 已修复：首次聊天前 socket 未就绪
- **#2825 [CLOSED] fix(setup): wait for the host socket before failing the first chat**  
  链接：<https://github.com/qwibitai/nanoclaw/pull/2825>  
  影响：新安装用户容易碰到首聊失败。  
  状态：**已关闭，说明该稳定性问题已被处理**。

---

## 5. 功能请求与路线图信号
今日没有明显“纯功能新增”型 Issue，但从 PR/Issue 组合看，路线图信号非常清晰：**安全与运维稳健性优先**。

值得纳入下一版本关注的方向：

- **审批链路透明化**  
  来自 **#2827**：审批界面必须展示完整运行参数（至少要让用户明确知道 `args` 和 `env` 的最终形态）。  
  链接：<https://github.com/qwibitai/nanoclaw/issues/2827>

- **A2A 文件传输边界收紧**  
  来自 **#2828**：附件转发必须强制路径规范化、拒绝 symlink 跳转、确保只写入会话根目录。  
  链接：<https://github.com/qwibitai/nanoclaw/issues/2828>

- **更新流程从“建议”转为“强制完成”**  
  来自 **#2826**：skill 更新不应被视作可跳过项，且 re-apply 时需要重建容器。  
  链接：<https://github.com/qwibitai/nanoclaw/pull/2826>

- **安装/卸载生命周期清理自动化**  
  来自 **#2830**：清理失效服务注册，减少残留和系统污染。  
  链接：<https://github.com/qwibitai/nanoclaw/pull/2830>

**纳入下一版本的可能性判断：**
- **高概率**：#2825 已修复，说明稳定性补丁可以快速落地；#2830 也属于明确的工程修复，较可能进入下一批发布。
- **更高优先级但需审查**：#2827、#2828 属于安全问题，通常会被插队处理，可能在版本发布前成为核心修复项。
- **中等概率**：#2826 涉及更新策略与容器重建，可能与发布节奏绑定，适合作为版本升级体验优化的一部分。

---

## 6. 用户反馈摘要
> 本日 Issues **没有评论**，因此无法从对话中直接提炼“用户原话反馈”。以下为基于问题描述的真实痛点归纳。

### 真实痛点
- **安全边界不够硬**：用户担心代理系统在文件处理、审批执行、环境变量注入等环节存在越权空间。  
  链接：<https://github.com/qwibitai/nanoclaw/issues/2828>、<https://github.com/qwibitai/nanoclaw/issues/2827>

- **首次使用体验不稳定**：安装完成后立即开始使用，可能因 socket 未就绪而失败，影响“装好即用”的期待。  
  链接：<https://github.com/qwibitai/nanoclaw/pull/2825>

- **升级/更新不确定性**：用户希望更新后能真正覆盖到所有技能与容器层变化，而不是“主程序更新了、技能没跟上”。  
  链接：<https://github.com/qwibitai/nanoclaw/pull/2826>

- **系统残留清理不足**：卸载或删除后仍留下服务注册，会让用户感觉产品不够“干净”。  
  链接：<https://github.com/qwibitai/nanoclaw/pull/2830>

### 满意/不满意信号
- **满意点**：维护者对安装和更新路径问题响应较快，说明项目对真实使用痛点敏感。
- **不满意点**：当前最强烈的不满集中在 **安全可信度**，这类问题如果不优先解决，会直接影响用户对代理执行层的信任。

---

## 7. 待处理积压
根据当前提供的数据，**没有明显长期未响应的老 Issue/PR**；所有列出的条目均在 **2026-06-21** 创建或更新，时间上非常新。  
因此，积压问题不是“时间拖延”，而是“**高优先级事项集中涌入**”。

当前需要维护者重点盯住的待处理项：

- **#2828 [OPEN] Security：symlink inbox 越界写入**  
  链接：<https://github.com/qwibitai/nanoclaw/issues/2828>

- **#2827 [OPEN] Security：`add_mcp_server` 审批 smuggling**  
  链接：<https://github.com/qwibitai/nanoclaw/issues/2827>

- **#2826 [OPEN] 更新技能与容器重建**  
  链接：<https://github.com/qwibitai/nanoclaw/pull/2826>

- **#2830 [OPEN] 清理失效服务注册**  
  链接：<https://github.com/qwibitai/nanoclaw/pull/2830>

**提醒：** 虽然没有陈旧积压，但今日的 open 项都带有明显的“基础安全/可靠性”属性，建议优先级高于一般功能迭代。

---

### 总结判断
NanoClaw 今日呈现出典型的 **“安全修补 + 稳定性加固”** 状态：  
- 没有新版本，但有实质性修复在推进；  
- 两个安全 Issue 的优先级非常高；  
- 已合并的修复主要围绕安装首聊与生命周期问题；  
- 项目整体健康度尚可，且维护响应积极，但接下来版本是否稳健，取决于这些安全问题能否及时收敛。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

以下为 **IronClaw（nearai/ironclaw）2026-06-22 项目动态日报**，基于你提供的近24小时 GitHub 数据整理。

---

## 1. 今日速览

过去24小时，IronClaw 的活动以 **CI 稳定性、测试闭环和依赖更新** 为主，说明项目当前处于“工程质量加固期”而非大功能爆发期。  
PR 侧共有 **9 条更新**，其中 **6 条已关闭**，表明团队推进效率较高，且多数工作集中在 Reborn/closure 相关的基础设施完善。  
Issue 侧仅新增/活跃 **1 条增强请求**，且没有新的 Bug 报告，整体看 **健康度较好、风险可控**。  
当前没有新版本发布，说明今天更像是一次 **代码与稳定性收敛日**，而不是发布日。

---

## 2. 版本发布

**今日无新版本发布。**

- 最新 Releases：无
- 结论：今天没有可供用户直接升级的版本节点，当前变化主要体现在 PR 层面的实现推进与测试修复。

---

## 3. 项目进展

今日已关闭的关键 PR 主要集中在 **CI 可靠性、测试稳定性、closure 覆盖面** 三个方向，说明项目正在系统性解决“能跑、跑稳、跑全”的问题。

### 已关闭的重要 PR
1. **#5110** `ci(reborn): run the full reborn_cli dependency closure on every PR`  
   链接：<https://github.com/nearai/ironclaw/pull/5110>  
   影响：将 PR CI 的 `reborn-tests` 从 21-crate allowlist 扩展为 **完整 64-crate 依赖闭包**，显著提升覆盖范围，减少“主流程可用但闭包漏测”的风险。

2. **#5111** `fix(coding): read_file limit:0 footer + align stale concurrent-install test`  
   链接：<https://github.com/nearai/ironclaw/pull/5111>  
   影响：修复了两个确定性的 host_runtime 测试失败点，属于直接提升回归防线的修正。

3. **#5112** `test(host_runtime): clear closure-exposed test debt`  
   链接：<https://github.com/nearai/ironclaw/pull/5112>  
   影响：继续清理在完整 closure 下暴露出的测试债务，说明项目在从“局部绿”走向“全局绿”。

4. **#5113** `ci: extract cross-cutting jobs into platform-and-compat.yml`  
   链接：<https://github.com/nearai/ironclaw/pull/5113>  
   影响：将跨平台/兼容性相关任务抽离到独立 workflow，提高 CI 维护性与可读性。

5. **#5115** `ci(reborn): retry crates.io network failures in the closure`  
   链接：<https://github.com/nearai/ironclaw/pull/5115>  
   影响：为 crates.io 网络抖动引入重试，直接对抗依赖下载偶发失败，提升 CI 稳定性。

6. **#5118** `ci(reborn): share one Rust cache across the closure`  
   链接：<https://github.com/nearai/ironclaw/pull/5118>  
   影响：优化 Rust 缓存策略，减少 per-crate cache 分裂和 LRU 淘汰导致的重复下载/抖动，属于 CI 性能与稳定性的双重优化。

### 当前整体推进
- 今天的变更让项目在 **测试覆盖、缓存策略、网络容错、workflow 拆分** 上都更成熟。
- 从方向上看，这不是单点修补，而是对 **Reborn / closure CI 基础设施** 的集中整治。
- 如果把“工程债务清理”视作项目向前推进的主线，那么今天至少有 **6 个关键工作项** 已经明确收敛。

---

## 4. 社区热点

从你提供的数据看，**没有出现明显高评论、高反应的讨论爆点**：  
- Issue 评论数为 0  
- PR 评论数未披露具体值，但整体看没有明显热议线程

不过，仍有两个“需求热点”值得关注：

### 热点 1：Automations 的 Completed 汇总卡
- **#5117** `Automations: add a "Completed" summary card with a server-side completed count`  
  链接：<https://github.com/nearai/ironclaw/issues/5117>  
  诉求：在 `/v2/automations` 顶部摘要条增加一个 **COMPLETED** 卡片，显示已完成的 one-shot automations 数量。  
  背后需求：用户希望状态总览更完整，当前 6 宫格中存在空位，且与已上线的 **Completed** 过滤 tab 相互补齐。

### 热点 2：Workbench 的 Composio 连接器路由
- **#5109** `feat(reborn): read-only + gated-write connector route (Composio) for the Workbench`  
  链接：<https://github.com/nearai/ironclaw/pull/5109>  
  诉求：为桌面 Workbench 提供可用的连接器数据路由，服务真实工作流展示。  
  背后需求：更偏产品集成侧，说明 IronClaw 正在从“核心能力”向“可视化工作台数据接入”延伸。

---

## 5. Bug 与稳定性

今日**没有新增明确的用户 Bug/崩溃/回归 Issue**。  
但在稳定性层面，PR 列表显示团队在持续清理以下风险：

### 高优先级稳定性问题
1. **CI 依赖闭包不完整 / 漏测风险**
   - 相关 PR：**#5110**  
     <https://github.com/nearai/ironclaw/pull/5110>  
   - 状态：已关闭  
   - 说明：这是最核心的稳定性问题之一，涉及 PR CI 不能覆盖真实 ship 依赖闭包。

2. **crates.io 网络抖动导致构建失败**
   - 相关 PR：**#5115**  
     <https://github.com/nearai/ironclaw/pull/5115>  
   - 状态：已关闭  
   - 说明：属于典型的基础设施不稳定问题，已有针对性修复。

3. **缓存竞争与重复下载导致的 CI 抖动**
   - 相关 PR：**#5118**  
     <https://github.com/nearai/ironclaw/pull/5118>  
   - 状态：已关闭  
   - 说明：这类问题虽不直接表现为用户侧 bug，但会显著影响持续集成稳定性和反馈速度。

4. **host_runtime 测试债务**
   - 相关 PR：**#5111**、**#5112**  
     <https://github.com/nearai/ironclaw/pull/5111>  
     <https://github.com/nearai/ironclaw/pull/5112>  
   - 状态：已关闭  
   - 说明：修复的是确定性测试失败，属于“回归防线”层面的修正。

### 结论
- 今日稳定性工作明显强于 bug 报告数量，说明项目当前问题更多来自 **工程质量和 CI 可靠性**，而不是新增功能本身的严重故障。
- 从健康度看，这是一个偏正向信号：**修问题的速度大于报问题的速度**。

---

## 6. 功能请求与路线图信号

今日最明确的新需求来自 Issue：

### 1) Automations 增加 Completed 汇总卡
- **#5117**  
  <https://github.com/nearai/ironclaw/issues/5117>  
- 需求特点：
  - 直接补齐前端摘要条的空白位置
  - 与已上线的 Completed 过滤 tab 强相关
  - 需要 server-side completed count，说明不是纯展示层修补，而是涉及后端统计能力

### 路线图判断
这个需求 **很可能进入下一轮开发**，原因有三点：
1. 和现有 UI 结构强耦合，属于“缺口明显”的体验修复；
2. 已有配套能力（Completed filter tab）作为前置；
3. 实现粒度明确，适合快速落地。

### 其他潜在路线图信号
- **#5109**：Workbench 的 Composio connector route  
  <https://github.com/nearai/ironclaw/pull/5109>  
  更偏产品集成能力，若继续推进，可能成为桌面端工作台能力的重要一环。
- **#5116** 与 **#5114**：依赖升级  
  <https://github.com/nearai/ironclaw/pull/5116>  
  <https://github.com/nearai/ironclaw/pull/5114>  
  这类 PR 通常是版本发布前的健康性维护信号，可能为后续小版本合并铺路。

---

## 7. 用户反馈摘要

从当前 Issues 和 PR 叙述中，可以提炼出以下真实使用痛点与场景：

### 1) 用户需要“更完整的状态总览”
- 来自 **#5117**：<https://github.com/nearai/ironclaw/issues/5117>  
- 痛点：Automations 页面顶部摘要条存在空位，用户无法一眼看出“已完成”规模。  
- 场景：运营、任务管理、自动化监控场景下，用户需要快速判断任务执行结果。

### 2) 用户/维护者希望 CI 更接近真实生产闭包
- 来自 **#5110**、**#5112**  
  <https://github.com/nearai/ironclaw/pull/5110>  
  <https://github.com/nearai/ironclaw/pull/5112>  
- 痛点：以前 PR 测试覆盖面不足，导致某些回归在合并后才暴露。  
- 场景：大型 Rust 代码库、依赖闭包复杂，局部测试无法代表真实 ship 路径。

### 3) 依赖下载与缓存不稳定影响开发效率
- 来自 **#5115**、**#5118**  
  <https://github.com/nearai/ironclaw/pull/5115>  
  <https://github.com/nearai/ironclaw/pull/5118>  
- 痛点：网络抖动和缓存拆分会让本来无关代码的 PR 也出现失败。  
- 场景：并发 CI、高频提交、大型依赖树下载。

### 4) Workbench 需要更真实的连接器数据接入
- 来自 **#5109**  
  <https://github.com/nearai/ironclaw/pull/5109>  
- 痛点：Workbench 展示层需要实连接器数据支撑，不只是静态占位。  
- 场景：桌面端/工作台产品化过程中，数据面接通是用户体验的关键前提。

---

## 8. 待处理积压

从当前 24 小时数据看，**没有明显“长期未响应”的老 Issue/PR**；但以下条目已进入待处理池，建议维护者关注：

1. **#5116** `build(deps): bump the everything-else group across 1 directory with 44 updates`  
   <https://github.com/nearai/ironclaw/pull/5116>  
   说明：超大依赖升级包，覆盖面广，建议评估兼容性与回归风险。

2. **#5114** `build(deps): bump the tokio-ecosystem group across 1 directory with 4 updates`  
   <https://github.com/nearai/ironclaw/pull/5114>  
   说明：Tokio 生态相关升级通常需要较严格的回归验证，建议优先审查。

3. **#5109** `feat(reborn): read-only + gated-write connector route (Composio) for the Workbench`  
   <https://github.com/nearai/ironclaw/pull/5109>  
   说明：偏产品能力型 PR，若能推进，将提升 Workbench 的可用性。

4. **#5117** `Automations: add a "Completed" summary card...`  
   <https://github.com/nearai/ironclaw/issues/5117>  
   说明：虽然是新需求，但体验价值明确，建议纳入短期迭代评估。

---

### 总体结论

IronClaw 今天的核心特征是：**没有新版本，但工程质量建设非常活跃**。  
项目正在围绕 **CI 覆盖、测试稳定性、依赖可靠性** 做系统优化，同时产品侧也出现了 **Automations 完成态可视化** 和 **Workbench 连接器接入** 这类明确需求。  
从健康度看，当前是一个 **稳定推进、低故障、新需求清晰** 的良性状态。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-06-22）

## 1. 今日速览
过去 24 小时，LobsterAI 的仓库动态整体偏低：**仅有 1 条 Issue 更新、0 条 PR 更新、0 个新版本发布**。  
今日唯一值得重点关注的是一条**安全相关 Issue**，内容指向浏览器私网访问默认恢复以及 OpenClaw SSRF 防护被弱化，属于高优先级风险信号。  
从代码协作角度看，今天没有合并或关闭的 PR，说明项目在功能推进上暂时没有新增进展。  
整体活跃度判断为：**低活跃，但安全风险提示显著，维护侧需要尽快回应**。  
- 仓库主页：[netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)

---

## 2. 版本发布
**今日无新版本发布。**  
- Releases 页：[LobsterAI Releases](https://github.com/netease-youdao/LobsterAI/releases)

---

## 3. 项目进展
今天没有任何 PR 合并或关闭，因此**功能开发、修复落地和版本推进均未发生可见进展**。  
从项目推进幅度看，今日“向前迈进”的主要体现不在代码合流，而在于社区提交了一个安全告警 Issue，推动维护者关注潜在风险。

- 今日无 PR 可列示  
- PR 列表：[LobsterAI Pull Requests](https://github.com/netease-youdao/LobsterAI/pulls)

---

## 4. 社区热点
今日社区热点集中在唯一一条安全 Issue：

### [#2181 [OPEN] [Security] LobsterAI restores private-network browser access by default and weakens the bundled OpenClaw SSRF guard](https://github.com/netease-youdao/LobsterAI/issues/2181)
- 作者：YLChen-007
- 评论：0
- 👍：0
- 状态：OPEN

**热点分析：**
- 这类议题通常涉及**浏览器访问策略、内网访问边界和 SSRF 防护**，属于影响面较大的安全/合规问题。
- 虽然当前没有评论和反应，但问题标题本身已经足以形成关注焦点，说明外部提交者更关心的是**默认安全边界是否被削弱**。
- 从诉求上看，用户/研究者希望项目在默认配置下保持更严格的访问限制，避免私网资源暴露风险。

---

## 5. Bug 与稳定性
今日没有普通崩溃、回归或功能性 bug 的新增记录；但出现了**高严重度安全问题**，应优先纳入稳定性治理。

### 高严重度：私网访问默认恢复与 SSRF 防护弱化
- Issue：[#2181 Security Advisory](https://github.com/netease-youdao/LobsterAI/issues/2181)
- 影响：可能扩大浏览器对私有网络资源的访问范围，并削弱 OpenClaw 的 SSRF 保护边界
- 严重程度：**高**
- 是否已有 fix PR：**未见**
- 备注：从标题看，这不是单纯的边缘 bug，而是**安全策略退化**问题，建议尽快确认默认配置和防护逻辑

---

## 6. 功能请求与路线图信号
今天**没有明确的新功能请求**记录，也没有 PR 能反向佐证路线图方向。  
不过，从安全 Issue 的内容来看，项目后续可能会优先补强以下方向：
- 浏览器访问策略默认值的收紧
- SSRF 防护的恢复与强化
- 对私网访问能力的显式开关化、可审计化

**路线图信号判断：**
- 若维护者认可该问题，下一版更可能优先包含**安全修复**而非功能扩展
- 当前没有可见 PR，因此还不能确认是否已进入排期

相关链接：
- 安全 Issue：[#2181](https://github.com/netease-youdao/LobsterAI/issues/2181)
- PR 列表：[Pull Requests](https://github.com/netease-youdao/LobsterAI/pulls)

---

## 7. 用户反馈摘要
从当前 Issue 可提炼出的真实反馈偏向于**安全与默认行为控制**：

**用户痛点/担忧：**
- 默认允许或恢复私网访问，可能带来不可预期的网络暴露风险
- 内置 SSRF 保护如果被弱化，用户在运行浏览器相关能力时会更不安心

**潜在使用场景：**
- 面向浏览器自动化、网页访问、代理兼容场景的 AI 助手或智能体
- 需要访问企业内网、私有站点或受控网络资源的部署环境

**满意/不满意信号：**
- 暂无评论，无法判断广泛满意度
- 但 Issue 的存在说明部分用户/安全研究者对“默认安全姿态”存在明确不满或担忧

链接：
- [#2181](https://github.com/netease-youdao/LobsterAI/issues/2181)

---

## 8. 待处理积压
基于当前数据，**未发现长期未响应的历史积压项**；但今日新增的安全 Issue 已应进入高优先级待办。

### 重点待处理项
- [#2181 [OPEN] [Security] ...](https://github.com/netease-youdao/LobsterAI/issues/2181)
  - 状态：OPEN
  - 关注点：默认配置、安全边界、SSRF 防护
  - 建议：尽快确认是否为真实回归，并评估是否需要紧急修复或回滚默认策略

---

## 总体结论
LobsterAI 今日呈现出**“低代码活跃、强安全警报”**的状态：没有版本、没有 PR、没有功能推进，但出现了一个值得高度重视的安全问题。  
如果维护团队近期没有其他变更计划，建议优先处理该安全 Issue，以避免默认行为带来的风险外溢。

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

以下为 **2026-06-22 的 CoPaw 项目动态日报**（GitHub 数据源：`agentscope-ai/QwenPaw`，项目主页可参考 [CoPaw](https://github.com/agentscope-ai/CoPaw)）。

---

## 1) 今日速览

过去 24 小时内，项目保持了较高的开发与讨论活跃度：**Issues 更新 5 条、PR 更新 14 条、无新 Release**。从内容上看，社区关注点主要集中在两类问题：一是 **会话切换、消息路由、群聊响应规则** 等稳定性/逻辑问题，二是 **移动端响应式适配** 的集中补齐。  
整体判断：项目当前处于“**边修核心体验、边集中补 UI 可用性**”的阶段，开发方向清晰，但也说明核心交互仍存在回归风险。  
参考：[#5354](https://github.com/agentscope-ai/QwenPaw/issues/5354)、[#5358](https://github.com/agentscope-ai/QwenPaw/issues/5358)、[#5360](https://github.com/agentscope-ai/QwenPaw/issues/5360)

---

## 2) 项目进展

今日没有新版本发布，但有 **2 个 PR 关闭/完成**，方向上对体验改进非常明确：

- **[#5359](https://github.com/agentscope-ai/QwenPaw/pull/5359)**：在 PR #5350 基础上增强移动端 Chat Header 交互  
  - 多会话场景下标题支持下拉切换  
  - 折叠菜单居中，提升移动端可读性  
  - 保留 marquee 效果，兼顾信息密度与可视性  
  - 价值：这是对聊天主入口的进一步优化，直接提升移动端可用性

- **[#5365](https://github.com/agentscope-ai/QwenPaw/pull/5365)**：Agent Config 页面移动端适配相关 PR 已关闭  
  - 虽然该 PR 已关闭，但同主题仍有后续 PR 持续推进，说明该模块的响应式改造仍在迭代中  
  - 价值：反映设置/配置类页面正在补齐移动端体验短板

**整体推进判断：**  
过去一天的 PR 流向几乎被“**移动端响应式改造**”占据，覆盖 Chat、Sessions、CronJobs、Channels、Models、Agents、Security、SkillPool、Agent Config 等多个核心页面。  
这意味着项目并非只在修补单点问题，而是在推进一轮系统性的 UI 可用性升级。参考 PR 集群：[#5369](https://github.com/agentscope-ai/QwenPaw/pull/5369)、[#5368](https://github.com/agentscope-ai/QwenPaw/pull/5368)、[#5367](https://github.com/agentscope-ai/QwenPaw/pull/5367)、[#5366](https://github.com/agentscope-ai/QwenPaw/pull/5366)、[#5364](https://github.com/agentscope-ai/QwenPaw/pull/5364)、[#5363](https://github.com/agentscope-ai/QwenPaw/pull/5363)、[#5362](https://github.com/agentscope-ai/QwenPaw/pull/5362)、[#5361](https://github.com/agentscope-ai/QwenPaw/pull/5361)、[#5355](https://github.com/agentscope-ai/QwenPaw/pull/5355)、[#5350](https://github.com/agentscope-ai/QwenPaw/pull/5350)

---

## 3) 社区热点

### 热点 1：消息发送队列串台、会话切换异常
- **Issue:** [#5354](https://github.com/agentscope-ai/QwenPaw/issues/5354)
- 互动情况：**3 条评论**
- 现象：在切换 agent/对话时，消息队列里的内容可能发送到错误对象；切换后还出现原对话变灰、无法切回的问题
- 背后诉求：用户已经认可“消息队列”带来的效率提升，但希望它在多会话/多 agent 场景下具备**强隔离与状态一致性**

### 热点 2：Feishu 群聊响应规则与配置预期不一致
- **Issue:** [#5353](https://github.com/agentscope-ai/QwenPaw/issues/5353)
- 互动情况：**3 条评论**
- 现象：在飞书群聊中，智能体似乎始终必须 @ 才会响应，即便配置上预期不需要强制 @
- 背后诉求：用户希望 **渠道行为与配置项严格一致**，尤其是群聊场景的触发逻辑要可预测、可配置

### 热点 3：核心稳定性优先于新功能
- **Issue:** [#5360](https://github.com/agentscope-ai/QwenPaw/issues/5360)
- 互动情况：**1 条评论**
- 现象：明确呼吁在新增功能前先稳定核心应用、提升移动端和交互可靠性
- 背后诉求：说明部分用户已经开始把“**可用性/稳定性**”放在“**功能扩展**”之前

> PR 侧没有提供评论/点赞统计，但从数量和主题聚类看，**移动端响应式适配**显然是当前最集中的开发热点。参考：[#5369](https://github.com/agentscope-ai/QwenPaw/pull/5369)、[#5362](https://github.com/agentscope-ai/QwenPaw/pull/5362)、[#5350](https://github.com/agentscope-ai/QwenPaw/pull/5350)

---

## 4) Bug 与稳定性

按影响程度排序如下：

### 1. 会话切换与消息队列串台
- **Issue:** [#5354](https://github.com/agentscope-ai/QwenPaw/issues/5354)
- 严重性：**高**
- 风险：消息可能被发送到错误 agent/会话，属于明显的状态隔离问题，容易造成“错误回复”或数据混淆
- 相关修复 PR：**有部分关联修复方向**
  - [#5357](https://github.com/agentscope-ai/QwenPaw/pull/5357)：目标是在 embedded mode 完成时释放 session switch lock
- 结论：建议优先确认 #5357 是否覆盖 #5354 的全部复现场景，尤其是“消息队列 + 切换会话”的并发路径

### 2. Embedded console 会话切换时出现 `TypeError`
- **Issue:** [#5358](https://github.com/agentscope-ai/QwenPaw/issues/5358)
- 严重性：**高**
- 现象：切换 session 时，控制台偶发 `Cannot read properties of null (reading 'object')`
- 风险：属于前端运行时错误，可能导致嵌入式控制台交互不稳定
- 相关修复 PR：**存在强相关方向**
  - [#5357](https://github.com/agentscope-ai/QwenPaw/pull/5357)
- 结论：这是当前最值得优先回归验证的稳定性问题之一

### 3. 飞书群聊必须 @ 才响应
- **Issue:** [#5353](https://github.com/agentscope-ai/QwenPaw/issues/5353)
- 严重性：**中**
- 现象：配置与实际行为不一致，影响群聊自动响应体验
- 状态：**已关闭**
- 结论：问题可能已被处理或归并，但建议回看关闭原因，确认是否已真正消除

### 4. 自动模型 failover 缺失
- **Issue:** [#5351](https://github.com/agentscope-ai/QwenPaw/issues/5351)
- 严重性：**中偏高**
- 现象：`llm_routing` 配置可写入，但运行时未真正启用路由切换
- 风险：模型不可用时，系统韧性不足
- 相关修复 PR：当前未看到直接对应 PR
- 结论：这是核心能力增强项，偏“稳定性+容错”，值得进入近期规划

---

## 5) 功能请求与路线图信号

当前新增需求的信号非常清晰，主要有两条：

### 1. 自动模型 failover / 路由调度
- **Issue:** [#5351](https://github.com/agentscope-ai/QwenPaw/issues/5351)
- 需求本质：让 `local/cloud` 等路由配置在运行时真正生效，提升模型故障切换能力
- 路线图判断：这类功能与“稳定可用”强相关，且不属于纯 UI 改动，**有较大概率进入下一阶段优先队列**

### 2. 先稳定核心应用，再扩展新功能
- **Issue:** [#5360](https://github.com/agentscope-ai/QwenPaw/issues/5360)
- 需求本质：移动端适配、交互稳定、渠道联动等基础体验优先
- 路线图判断：这与当前 PR 群的方向高度一致，说明维护团队/社区已经在实际上执行“先补核心体验”的策略  
- 相关 PR 侧信号：[#5369](https://github.com/agentscope-ai/QwenPaw/pull/5369)、[#5362](https://github.com/agentscope-ai/QwenPaw/pull/5362)、[#5350](https://github.com/agentscope-ai/QwenPaw/pull/5350)

**综合判断：**  
下一版本最可能纳入的，不是“更花哨的新功能”，而是：
- 会话切换与状态锁修复
- 消息队列并发隔离
- 模型 failover / 路由容错
- 大量移动端响应式优化

---

## 6) 用户反馈摘要

从 Issues 描述中，能提炼出几条非常典型的真实用户痛点：

1. **效率提升后，更怕状态出错**
   - 在 [#5354](https://github.com/agentscope-ai/QwenPaw/issues/5354) 中，用户明确认可“消息队列极大提高了效率”
   - 但也指出切换会话时会串台，说明用户在意的是：**性能优化不能以牺牲正确性为代价**

2. **渠道行为必须和配置一致**
   - [#5353](https://github.com/agentscope-ai/QwenPaw/issues/5353) 体现出用户对群聊规则的预期很明确
   - 一旦“配置写了但行为不生效”，用户会直接认为系统不可信

3. **移动端可用性已成为真实生产问题**
   - [#5360](https://github.com/agentscope-ai/QwenPaw/issues/5360) 与一系列移动端 PR 共同说明：用户不是“想要”移动端体验，而是“已经在用”
   - 痛点集中在表格横向溢出、按钮被裁切、页面留白异常等，属于典型的实际使用障碍

4. **用户希望系统更稳，不要继续堆功能**
   - [#5360](https://github.com/agentscope-ai/QwenPaw/issues/5360) 的表述非常直接：先把核心功能做完整、做稳定
   - 这类反馈通常意味着产品已进入“成熟度提升期”，而非单纯新增功能期

---

## 7) 待处理积压

严格意义上，本次可见数据主要覆盖 **近 24 小时新增/活跃项**，暂未暴露明显的“长期沉默积压”。但从优先级看，以下开放项已经具备积压苗头，建议维护者重点盯住：

- **会话切换串台 / 队列状态污染**
  - [#5354](https://github.com/agentscope-ai/QwenPaw/issues/5354)
  - 这是当前最容易影响实际使用的稳定性问题

- **嵌入式控制台切换异常**
  - [#5358](https://github.com/agentscope-ai/QwenPaw/issues/5358)
  - 与 session 切换相关，建议和 [#5357](https://github.com/agentscope-ai/QwenPaw/pull/5357) 联动验证

- **模型 failover 未落地**
  - [#5351](https://github.com/agentscope-ai/QwenPaw/issues/5351)
  - 这是偏底层的容错能力需求，若拖延过久会影响可靠性口碑

- **“先稳定后扩展”的产品诉求**
  - [#5360](https://github.com/agentscope-ai/QwenPaw/issues/5360)
  - 这类 issue 不一定是代码 bug，但往往代表社区对项目成熟度的直接反馈，值得纳入路线图讨论

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合发微信群/Slack 的短版摘要**，或  
2. **适合放到 GitHub Discussions / 周报里的正式版模板**。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

## 今日速览

ZeroClaw 在过去 24 小时内保持了**高活跃、偏修复型**的迭代节奏：Issues 更新 9 条（7 新开/活跃、2 关闭），PR 更新 27 条（22 待合并、5 已合并/关闭），但**没有新版本发布**。  
从议题分布看，今日焦点集中在 **runtime/gateway/provider/channel** 这些核心链路，以及 **CI / Docker / 安装脚本** 这类基础设施稳定性问题。  
整体上，项目健康度是“**推进快，但仍在收敛技术债**”：一批用户可见问题已经有对应修复 PR，说明维护响应较快；但配置传播、跨平台安装、模型能力一致性仍是短期风险点。  

---

## 项目进展

### 1) 已确认关闭的关键修复
- **PR #8096** `[CLOSED]`：修复 `install.sh` 在 macOS 上错误下发 arm64 预编译包的问题，避免 Intel Mac 出现 “bad CPU type in executable”。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8096>  
  关联 Issue：<https://github.com/zeroclaw-labs/zeroclaw/issues/8095>

### 2) 今日最重要的推进方向（仍在审查/合并中）
- **PR #8100**：为 NVIDIA NIM provider 补齐 vision 支持，直接对应“多模态模型可文本但不可图像”的用户痛点。  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/8100>
- **PR #8109**：让 runtime 的 alias rename 走与 gateway 一致的级联更新路径，降低配置引用断裂和 task stack 风险。  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/8109>
- **PR #8110**：修复 Discord channel 的 autocomplete 在“父频道白名单”线程中误判拒绝的问题。  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/8110>
- **PR #8097**：让 `model_switch list_models` 从 live `models.dev` catalog 读取，而不是继续依赖硬编码列表。  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/8097>
- **PR #8112**：让 Node container-base 的选择基于 `.nvmrc` 显式推导，减少 Docker 基础镜像漂移风险。  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/8112>

### 3) 基础设施与安全收敛
- **PR #8119**：将 MCP `SecurityPolicy` 过滤应用到 channel tool prompts，防止 channel 侧暴露不该广告的工具。  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/8119>
- **PR #8115**：daemon 在 gateway 地址已占用时 fail fast，减少“看似启动成功、实际退化失败”的隐性故障。  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/8115>

**结论：**今天项目的前进主要体现在“**把用户报错点逐个变成修复 PR**”，而不是发布新版本；稳定性和兼容性修复是主线。  

---

## 社区热点

### 最活跃的讨论点
1. **Issue #8094** — Anthropic provider 在 Quickstart 里添加后，聊天窗口不可用，需 reset 才恢复  
   <https://github.com/zeroclaw-labs/zeroclaw/issues/8094>  
   - 这是今日最明确的用户体验热点：用户已经在 dashboard 配好了 provider，但 chat 侧没有即时生效。
   - 诉求本质是“**配置修改必须即时传播到可用路径**”，否则 Quickstart 的可用性会明显下降。

2. **Issue #8089** — Docker / Debian Dockerfile 构建失败，缺少 `aardvark-sys build.rs`  
   <https://github.com/zeroclaw-labs/zeroclaw/issues/8089>  
   - 这是典型的 CI / 构建链路阻塞问题，影响开发者与发布管道。
   - 虽然已关闭，但说明构建流程对仓库文件布局高度敏感。

3. **Issue #8095** — `install.sh` 在 Intel Mac 上装错 arm64 包  
   <https://github.com/zeroclaw-labs/zeroclaw/issues/8095>  
   - 说明安装脚本对硬件架构判断不可靠，直接影响新用户上手。
   - 已有对应关闭 PR #8096，属于“高痛点、已快速响应”的典型案例。  
     PR 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8096>

### 反应/点赞热度
- 当前可见数据里，**Issue/PR 的 👍 基本为 0**，说明今天的反馈更偏“故障单驱动”，而非情绪性讨论或广泛共鸣。
- 这类热度结构通常意味着：用户更关心“能不能用、能不能装、能不能稳定跑”，而不是新功能宣发。  

---

## Bug 与稳定性

> 按严重程度（以 Issue 正文中的 Severity 为准）排序。

| 严重度 | 问题 | 状态 | 是否已有修复 PR |
|---|---|---|---|
| **S0** | Anthropic provider 在 Quickstart 中加了后，chat 里不可用，直到 reset 才出现 | Open | **未见明确修复 PR** |
| **S0** | NVIDIA 兼容 provider 的 vision input 不可用 | Open | **有**：PR #8100 <https://github.com/zeroclaw-labs/zeroclaw/pull/8100> |
| **S1** | config alias rename RPC 可能导致 daemon task stack overflow | Open | **有**：PR #8109 <https://github.com/zeroclaw-labs/zeroclaw/pull/8109> |
| **S1** | Docker / Debian Dockerfile 构建失败，缺少 `aardvark-sys build.rs` | Closed | **未见对应 PR 编号**（Issue #8089） |
| **S1** | `install.sh` 在 Intel Mac 上误装 arm64 预编译包 | Closed | **有**：PR #8096 <https://github.com/zeroclaw-labs/zeroclaw/pull/8096> |
| **S2** | Discord autocomplete 在父频道白名单线程中误拒绝 | Open | **有**：PR #8110 <https://github.com/zeroclaw-labs/zeroclaw/pull/8110> |
| **S3** | `model_switch list_models` 返回过时的硬编码模型列表 | Open | **有**：PR #8097 <https://github.com/zeroclaw-labs/zeroclaw/pull/8097> |

### 稳定性判断
- **runtime / gateway / provider** 是今日最集中的故障面，且多项问题与“配置变更后不同步”“能力声明不一致”“RPC/alias 处理不安全”有关。  
- 这类问题通常不是单点 bug，而是**配置、注册、路由、缓存**之间的一致性问题；如果不优先收敛，后续会反复出现“改了但没生效”或“看起来支持、实际不可用”的投诉。  

---

## 功能请求与路线图信号

### 今日新增/强化的需求信号
1. **通道侧历史裁剪覆盖测试**  
   - Issue #8116：要求为 `tool_call_id` 的 JSON envelopes 增加 proactive-trim 覆盖。  
     <https://github.com/zeroclaw-labs/zeroclaw/issues/8116>  
   - 对应 PR #8117：  
     <https://github.com/zeroclaw-labs/zeroclaw/pull/8117>  
   - 信号：项目在向更稳健的消息裁剪逻辑演进，属于“**低可见度但高价值**”的质量投资。

2. **Node 容器基础镜像选择显式化**  
   - Issue #8105：希望 container-base major selection 更明确，避免 `cargo generate installers` 静默漂移。  
     <https://github.com/zeroclaw-labs/zeroclaw/issues/8105>  
   - 对应 PR #8112：  
     <https://github.com/zeroclaw-labs/zeroclaw/pull/8112>  
   - 信号：这更偏发行链路治理，预计很可能进入下一轮稳定版。

3. **Discord autocomplete 行为修正**  
   - Issue #8103：parent-allowlisted threads 中 autocomplete 失败。  
     <https://github.com/zeroclaw-labs/zeroclaw/issues/8103>  
   - 对应 PR #8110：  
     <https://github.com/zeroclaw-labs/zeroclaw/pull/8110>  
   - 信号：这是可直接提升渠道可用性的用户向修复，优先级较高。

4. **NVIDIA 兼容 provider 的多模态能力补齐**  
   - Issue #8099：vision_model_provider `nvidia` 不支持 vision input。  
     <https://github.com/zeroclaw-labs/zeroclaw/issues/8099>  
   - 对应 PR #8100：  
     <https://github.com/zeroclaw-labs/zeroclaw/pull/8100>  
   - 信号：属于用户能力诉求明确、且已有实现路径的功能增强，**很可能进入下一版本**。

### 路线图判断
- 从今天的 PR 组合看，ZeroClaw 下一阶段更像是在做：  
  **“channel 兼容性 + runtime 安全性 + provider 能力一致性 + CI/安装链路稳定”**  
- 暂时看不到大体量新功能发布信号；团队更像在为下一版做**可靠性封板**。  

---

## 用户反馈摘要

从 Issues 评论里能提炼出三个非常真实的痛点：

1. **“配置好了却不能立刻用”**  
   - 典型案例：Issue #8094  
     <https://github.com/zeroclaw-labs/zeroclaw/issues/8094>  
   - 用户在 Quickstart 里添加 Anthropic provider 后，dashboard 显示正常，但 chat 里不可用，必须 reset。  
   - 这反映出用户对“**配置变更即时生效**”有强预期。

2. **“安装/构建应该开箱即用”**  
   - 典型案例：Issue #8095、#8089  
     <https://github.com/zeroclaw-labs/zeroclaw/issues/8095>  
     <https://github.com/zeroclaw-labs/zeroclaw/issues/8089>  
   - Intel Mac 安装错误架构包、Docker 构建缺文件，都说明用户对安装与构建链路的容错非常低。  
   - 对开源项目来说，这类问题会直接影响首次体验和贡献者留存。

3. **“模型能力声明必须真实”**  
   - 典型案例：Issue #8099  
     <https://github.com/zeroclaw-labs/zeroclaw/issues/8099>  
   - 用户会默认“选了支持多模态的模型，就应该能传图”；如果 provider 层没有正确透传能力，就会被视为功能缺陷。  

---

## 待处理积压

严格来说，**本次 24h 数据里还没有真正“长期未响应”的老问题**，因为展示的 Issue / PR 基本都集中在 2026-06-21~2026-06-22。  
但从风险优先级看，以下条目如果继续跨天悬而未决，最容易形成 backlog：

- **Issue #8102**：config alias rename RPC 可能导致 daemon task stack overflow  
  <https://github.com/zeroclaw-labs/zeroclaw/issues/8102>  
  - 这是高风险工作流阻塞问题，建议优先跟踪其对应修复 PR #8109。  
    <https://github.com/zeroclaw-labs/zeroclaw/pull/8109>

- **Issue #8094**：Anthropic provider 添加后 chat 不可用  
  <https://github.com/zeroclaw-labs/zeroclaw/issues/8094>  
  - 直接影响 Quickstart 成功率，属于用户最容易感知的阻塞。

- **Issue #8099**：NVIDIA provider vision input 不可用  
  <https://github.com/zeroclaw-labs/zeroclaw/issues/8099>  
  - 多模态能力不一致会削弱 provider 可信度。

- **PR #8119**：channel tool prompts 应用 MCP policy  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/8119>  
  - 安全策略类变更建议不要长期悬置，避免 channel 侧暴露面扩大。

- **PR #8115**：gateway 地址冲突时 fail fast  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/8115>  
  - 这是稳定性增强项，若拖延会继续放大“静默退化”风险。

---

### 总体判断
ZeroClaw 今天的状态可以概括为：**活跃、务实、修复驱动明确**。  
项目正在快速处理“安装、构建、provider 能力、channel 授权、daemon 稳定性”等高频痛点；如果这些 PR 持续按当前节奏合并，下一版的用户体验和可维护性会有明显改善。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*