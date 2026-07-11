# OpenClaw 生态日报 2026-07-11

> Issues: 47 | PRs: 71 | 覆盖项目: 13 个 | 生成时间: 2026-07-11 01:03 UTC

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

以下为 **OpenClaw 2026-07-11 项目动态日报**（基于你提供的 24h GitHub 数据）。

## 1) 今日速览

过去 24 小时，OpenClaw 仍处于**高强度活跃**状态：Issues 更新 47 条、PR 更新 71 条，说明社区参与度和维护节奏都很高。  
但从内容结构看，今天的新增/活跃项明显偏向**稳定性修复、会话状态一致性、权限/安全边界和 UI 可用性**，而不是大规模新功能。  
Issue 侧新增/活跃 33 条、关闭 14 条，净增压力仍在；PR 侧 49 条待合并、22 条已合并/关闭，说明主干修复推进在持续，但积压也不小。  
整体判断：**项目健康度为“高活跃、重修复、风险收敛中”**，短期内维护负载偏高。

---

## 2) 项目进展

今天可见的关键推进，主要集中在 3 个方向：

- **控制台聊天页可见性增强**
  - PR [#104010](https://github.com/openclaw/openclaw/pull/104010)（closed）实现了 **Background tasks pane in chat view**，对应 issue [#104003](https://github.com/openclaw/openclaw/issues/104003)。
  - 价值：把 subagent、cron、ACP、CLI/media 等后台工作从“隐藏状态”拉到聊天上下文旁边，直接提升可观测性和操控性。

- **消息通道一致性/安全性修复**
  - PR [#104007](https://github.com/openclaw/openclaw/pull/104007)（closed）修复 Slack group DM 的 sender policy 应用一致性。
  - 价值：减少群聊场景下的权限漂移和行为不一致，属于典型的通道正确性修复。

- **发布与验证链路更稳**
  - PR [#104025](https://github.com/openclaw/openclaw/pull/104025)（closed）修复 Telegram attestor 的 buffer overflow 风险。
  - 价值：这是偏发布保障/验证流程的硬化修复，降低稳定版验证被非功能性问题卡住的概率。

**项目整体向前迈进的幅度**：  
从可见样本看，今天至少完成了 **1 个面向用户的 UI 增强、1 个消息通道行为修复、1 个发布验证稳定性修复**。这说明团队在继续把“可见功能”和“基础可靠性”同步推进。

---

## 3) 社区热点

### 热点 1：会话/状态相关问题持续占据焦点
- [#103599](https://github.com/openclaw/openclaw/issues/103599) — Inbound messages are silently dropped when a reply run is active  
  - 0 评论，但属于 **P0 + data-loss + release-blocker**。
  - 诉求：用户最担心的不是“慢”，而是**消息直接丢失**。

- [#103911](https://github.com/openclaw/openclaw/issues/103911) — Dreaming sweep triggers EmbeddedAttemptSessionTakeoverError  
  - 1 评论，**P0**。
  - 诉求：定时后台任务与人工会话并发时，系统必须具备真正的写入隔离与续跑能力。

- [#103956](https://github.com/openclaw/openclaw/issues/103956) — `session.pruneAfter` ignored  
  - 2 评论，说明社区对会话生命周期控制很敏感。
  - 诉求：配置写了就应该生效，不能“看起来支持，实际上不工作”。

### 热点 2：认证、权限和安全边界
- [#103884](https://github.com/openclaw/openclaw/issues/103884) — GPT-5.6 Sol fails in OpenClaw Codex runtime  
  - 3 👍，2 评论。
  - 诉求：用户希望 OpenClaw 跟上上游 Codex/模型能力，不要因为封装版本滞后阻断可用模型。

- [#103980](https://github.com/openclaw/openclaw/issues/103980) — node approval can dispatch after caller timeout  
  - **P1 + security**。
  - 诉求：审批不能“过期后还生效”，否则会形成越权执行窗口。

- [#103900](https://github.com/openclaw/openclaw/issues/103900) — in-flight exec ignores hot tools.exec revocation  
  - **P1 + security**。
  - 诉求：热更新的安全策略必须即时收敛，不能只在新请求上生效。

### 热点 3：体验与可观测性
- [#103342](https://github.com/openclaw/openclaw/issues/103342) — Control UI page refresh causes forced logout/redirect loop  
  - 3 评论。
  - 诉求：控制台是日常工作入口，登录态/代理场景的稳定性直接影响可用性。

- [#104003](https://github.com/openclaw/openclaw/issues/104003) — Background tasks pane in the Control UI chat view  
  - 已关闭，对应 PR [#104010](https://github.com/openclaw/openclaw/pull/104010)。
  - 诉求：用户想在聊天时“看见系统在做什么”，避免黑盒感。

### PR 热点的判断
PR 列表里，热点更多体现在**高风险、large-size、needs proof** 的变更：
- [#103975](https://github.com/openclaw/openclaw/pull/103975) — validate older release targets
- [#104018](https://github.com/openclaw/openclaw/pull/104018) — readiness conditions and hosting profiles
- [#103968](https://github.com/openclaw/openclaw/pull/103968) — reject revoked forwarded exec approvals
- [#103880](https://github.com/openclaw/openclaw/pull/103880) — hot reload subsystem consistency
- [#103562](https://github.com/openclaw/openclaw/pull/103562) — retry reply session init conflicts

这些 PR 的共同特征是：**跨子系统、带状态/权限/交付风险、且通常需要证据或维护者复核**。

---

## 4) Bug 与稳定性

按严重程度排序如下：

### P0 / 阻断级
1. [#103599](https://github.com/openclaw/openclaw/issues/103599)  
   **Inbound messages are silently dropped when a reply run is active**  
   - 风险：消息静默丢失，属于最危险的用户数据损失类问题。  
   - fix PR：**未见直接对应 PR**。

2. [#103911](https://github.com/openclaw/openclaw/issues/103911)  
   **Dreaming sweep triggers EmbeddedAttemptSessionTakeoverError**  
   - 风险：定时后台任务与人工对话冲突，导致 session 接管错误。  
   - fix PR：**未见直接对应 PR**。

3. [#103879](https://github.com/openclaw/openclaw/issues/103879)  
   **旧 catalog.json 迁移后残留 config 导致 auth failures**  
   - 风险：升级/迁移后认证失败，影响直接可用性。  
   - fix PR：**未见直接对应 PR**。

### P1 / 高优先级
4. [#103980](https://github.com/openclaw/openclaw/issues/103980)  
   **node approval can dispatch after caller timeout**  
   - 风险：过期审批仍可触发执行，属于安全边界问题。  
   - fix PR：**未见直接对应 PR**。

5. [#103900](https://github.com/openclaw/openclaw/issues/103900)  
   **in-flight exec ignores hot tools.exec revocation**  
   - 风险：热撤权后仍可能执行危险命令。  
   - fix PR：**未见直接对应 PR**。

6. [#103992](https://github.com/openclaw/openclaw/issues/103992)  
   **late compaction reconcile TypeError causes tool-output outage**  
   - 风险：会话输出中断，且是回归问题。  
   - fix PR：**未见直接对应 PR**。

7. [#103683](https://github.com/openclaw/openclaw/issues/103683)  
   **embedded runs intermittently stall at embedded_run:started**  
   - 风险：运行挂起、无进展、无 hook 执行。  
   - fix PR：**未见直接对应 PR**。

8. [#103917](https://github.com/openclaw/openclaw/issues/103917)  
   **FsSafeError: root dir not found when subagent spawns after workspace deletion**  
   - 风险：Gateway crash-loop。  
   - fix PR：**未见直接对应 PR**。

### P2 / 中优先级但影响面广
9. [#103342](https://github.com/openclaw/openclaw/issues/103342)  
   **Nginx reverse proxy + token auth refresh causes redirect loop / logout**  
   - 风险：控制 UI 登录态不稳，影响日常操作。  
   - fix PR：**未见直接对应 PR**。

10. [#103956](https://github.com/openclaw/openclaw/issues/103956)  
    **session.pruneAfter ignored — sessions grow unbounded**  
    - 风险：存储/状态膨胀，后续会变成稳定性和成本问题。  
    - fix PR：**未见直接对应 PR**。

11. [#103910](https://github.com/openclaw/openclaw/issues/103910)  
    **usage-cost cache refreshing indefinitely**  
    - 风险：统计面板冻结、指标失真。  
    - fix PR：对应 [#103998](https://github.com/openclaw/openclaw/pull/103998)。

12. [#104014](https://github.com/openclaw/openclaw/issues/104014)  
    **packaged builds lose zod validation detail**  
    - 风险：上线后错误信息不可操作。  
    - fix PR：对应 [#104026](https://github.com/openclaw/openclaw/pull/104026)。

13. [#103954](https://github.com/openclaw/openclaw/issues/103954)  
    **MCP `disabled: true` silently ignored**  
    - 风险：配置语义失效，可能导致意外启动服务。  
    - fix PR：**未见直接对应 PR**。

---

## 5) 功能请求与路线图信号

今天的功能诉求很明确：**“让系统更可见、更可控、更适合多通道和复杂工作流”**。

### 已经开始落地的方向
- [#104003](https://github.com/openclaw/openclaw/issues/104003) → 已由 [#104010](https://github.com/openclaw/openclaw/pull/104010) 关闭  
  - 说明“聊天页里的后台任务可视化”已进入产品化。

- [#103639](https://github.com/openclaw/openclaw/issues/103639)  
  **Custom session display name**  
  - 已关闭，说明会话可识别性是明确需求。

### 可能进入下一版本的路线图信号
- [#104012](https://github.com/openclaw/openclaw/pull/104012) / [#103986](https://github.com/openclaw/openclaw/issues/103986)  
  **Web Control UI browser panel with annotate-to-prompt and element inspect**  
  - 强烈指向“浏览器内嵌 + 标注转 prompt”的高级交互需求。

- [#103989](https://github.com/openclaw/openclaw/pull/103989) / [#103987](https://github.com/openclaw/openclaw/issues/103987)  
  **opt-in AI purpose titles for tool calls**  
  - 说明用户需要更好的可读性，但必须明确“可选、可控、默认安全”。

- [#104021](https://github.com/openclaw/openclaw/issues/104021)  
  **在 web 会话面板中加载历史老会话**
  - 这是典型的“运维/复盘/长期知识回溯”需求，优先级很可能不低。

- [#104018](https://github.com/openclaw/openclaw/pull/104018)  
  **readiness conditions and hosting profiles**
  - 这是平台级改造，说明项目正在向更成熟的部署姿态演进。

- [#103841](https://github.com/openclaw/openclaw/issues/103841)  
  **Mattermost DM voice calls with STT/TTS**
  - 偏新形态通道扩展，属于中长期创新方向。

---

## 6) 用户反馈摘要

从今天的 issue 内容里，可以提炼出几类非常真实的用户痛点：

1. **用户最怕“静默失败”**
   - 例如 [#103599](https://github.com/openclaw/openclaw/issues/103599)、[#103910](https://github.com/openclaw/openclaw/issues/103910)、[#103954](https://github.com/openclaw/openclaw/issues/103954)。
   - 反馈本质：系统不能只是在日志里“报错”，而要让用户知道到底有没有成功。

2. **会话/任务状态必须可追踪**
   - [#104003](https://github.com/openclaw/openclaw/issues/104003) 请求后台任务面板，说明用户在意“Agent 到底正在干什么”。
   - [#103956](https://github.com/openclaw/openclaw/issues/103956) 和 [#103911](https://github.com/openclaw/openclaw/issues/103911) 则说明会话生命周期和并发隔离是实际使用中的痛点。

3. **安全策略要真正即时生效**
   - [#103980](https://github.com/openclaw/openclaw/issues/103980)、[#103900](https://github.com/openclaw/openclaw/issues/103877) 类问题说明用户并不接受“配置已改但旧请求还能跑”的情况。

4. **对文档和错误信息的可操作性要求很高**
   - [#103942](https://github.com/openclaw/openclaw/issues/103942)（文档与真实 payload 不一致）
   - [#104014](https://github.com/openclaw/openclaw/issues/104014)（打包后只剩 `Invalid input`）
   - 这类反馈表明：用户想要的是**能直接定位问题的错误信息**，而不是泛化报错。

5. **真实使用场景很复杂**
   - 代理场景：Nginx reverse proxy、HTTPS、token auth [#103342](https://github.com/openclaw/openclaw/issues/103342)
   - 多通道：Telegram、Slack、Discord、WhatsApp、Zalo、QQBot
   - 多运行时：Anthropic、Codex、ACP、Ollama
   - 结论：OpenClaw 正在被用于**复杂、分布式、跨通道的真实生产环境**，稳定性要求明显高于普通 demo 项目。

---

## 7) 待处理积压

以下是今天最值得维护者优先关注的积压项，优先级按风险与影响面综合排序：

### 重要未决 Issues
- [#103599](https://github.com/openclaw/openclaw/issues/103599) — P0，消息静默丢失
- [#103879](https://github.com/openclaw/openclaw/issues/103879) — P0，迁移后 auth failure
- [#103911](https://github.com/openclaw/openclaw/issues/103911) — P0，后台任务与会话接管冲突
- [#103980](https://github.com/openclaw/openclaw/issues/103980) — P1，过期审批仍可下发
- [#103900](https://github.com/openclaw/openclaw/issues/103900) — P1，撤权后仍可能执行
- [#103917](https://github.com/openclaw/openclaw/issues/103917) — P1，workspace 删除后 crash
- [#103683](https://github.com/openclaw/openclaw/issues/103683) — P1，embedded run stall
- [#103342](https://github.com/openclaw/openclaw/issues/103342) — P2，反向代理下强制登出
- [#103956](https://github.com/openclaw/openclaw/issues/103956) — P2，session prune 不生效
- [#103954](https://github.com/openclaw/openclaw/issues/103954) — P2，disabled 配置被忽略

### 需要证明/复核的高风险 PR
- [#103880](https://github.com/openclaw/openclaw/pull/103880) — hot reload consistency，XL，needs proof
- [#104018](https://github.com/openclaw/openclaw/pull/104018) — readiness conditions and hosting profiles，XL，needs proof
- [#103975](https://github.com/openclaw/openclaw/pull/103975) — validate older release targets，XL，ready for maintainer look
- [#103968](https://github.com/openclaw/openclaw/pull/103968) — reject revoked forwarded exec approvals，涉及 security boundary
- [#103562](https://github.com/openclaw/openclaw/pull/103562) — Discord reply session conflict retry，P1，需证据

**提醒**：这些 PR/Issue 的共同特征是“跨边界、跨状态、跨通道”，如果不尽快补证据或明确 owner，很容易拖成下一轮 release gate 的瓶颈。

---

如果你愿意，我可以把这份日报再整理成：
1. **适合内部 Slack/飞书转发的精简版**，或  
2. **适合管理层看的风险周报格式**。

---

## 横向生态对比

下面给出一份**横向对比分析报告**，基于你提供的 2026-07-11 过去 24 小时各项目动态。

---

# 1. 生态全景

个人 AI 助手 / 自主智能体开源生态正在从“能聊天、能跑任务”快速走向“**可控、可观测、可部署**”的生产化阶段。  
从多个项目的高频问题看，当前最核心的矛盾已不是“是否有功能”，而是**状态一致性、权限边界、跨通道兼容、长任务稳定性**。  
同时，生态正在明显分化为两类：一类是**控制台/多通道编排平台**，另一类是**运行时/记忆/工具链底座**。  
整体来看，社区活跃度很高，但大多项目都处于**持续修复和架构收敛**阶段，说明行业已从 demo 期进入真实使用期。  
对开发者来说，今天的共识非常明确：**“静默失败不可接受，安全与可观测性必须前置。”**

---

# 2. 各项目活跃度对比

> 说明：下表使用你提供的 24h “Issues 更新数 / PR 更新数 / Release 情况”。

| 项目 | Issues | PR | Release | 健康度评估 |
|---|---:|---:|---|---|
| OpenClaw | 47 | 71 | 无 | 高活跃，重修复，风险收敛中 |
| Hermes Agent | 50 | 50 | 无 | 高强度修复并行，回归风险偏高 |
| IronClaw | 16 | 50 | 无 | 高活跃，持续硬化期 |
| CoPaw / QwenPaw | 17 | 19 | 3 个版本 | 高活跃，发布后集中收尾 |
| ZeroClaw | 9 | 20 | 无 | 高活跃，稳定性与兼容性并进 |
| NanoBot | 2 | 11 | 无 | 中高活跃，技术债持续收敛 |
| PicoClaw | 2 | 8 | 无 | 提案/修复集中涌入，等待评审落地 |
| NanoClaw | 1 | 14 | 无 | 高活跃，快速重构期 |
| LobsterAI | 0 | 8 | 无 | 高合并、低讨论、无发布 |
| NullClaw | 1 | 0 | 无 | 低活跃，但出现高风险安全问题 |
| TinyClaw | 0 | 0 | 无 | 无活动 |
| Moltis | 0 | 0 | 无 | 无活动 |
| ZeptoClaw | 0 | 0 | 无 | 无活动 |

**粗略分层：**
- **第一梯队：** OpenClaw、Hermes Agent、IronClaw、CoPaw、ZeroClaw  
- **第二梯队：** NanoBot、PicoClaw、NanoClaw、LobsterAI  
- **低活跃/沉寂：** NullClaw、TinyClaw、Moltis、ZeptoClaw

---

# 3. OpenClaw 在生态中的定位

## 3.1 相对优势
OpenClaw 在本次样本中是**PR 量最高、Issue 量也处于第一梯队**的项目之一，且问题类型高度集中在：
- 会话状态一致性
- 权限/安全边界
- UI 可见性
- 发布与验证链路稳定性

这说明 OpenClaw 已经不是单纯的“智能体运行框架”，而是更接近一个**多通道、多状态、多权限的控制平面**。  
它的优势不是某个单点功能，而是**承载复杂生产场景的完整度**。

## 3.2 技术路线差异
OpenClaw 的路线很清晰：  
**“聊天界面 + 后台任务可视化 + 强状态治理 + 安全收敛”**。  

与其他项目相比：
- 相比 **NanoBot / NanoClaw**：OpenClaw 更偏“控制台和编排层”，不是只做 runtime 抽象。
- 相比 **Hermes Agent / LobsterAI**：OpenClaw 更强调**会话可视化、权限边界和跨通道正确性**。
- 相比 **CoPaw**：OpenClaw 更偏平台治理，CoPaw 更偏版本整固与记忆/工具治理。
- 相比 **ZeroClaw / IronClaw**：OpenClaw 更重“可用性和安全策略收敛”，后两者更偏运行时和工具链韧性。

## 3.3 社区规模对比
在本次样本中，OpenClaw 的 **47 Issues 更新 + 71 PR 更新** 属于**绝对高位**，和 Hermes（50/50）一起构成最活跃的两大社区之一。  
但 OpenClaw 的特点是：
- **跨子系统问题更多**
- **P0/P1 安全与状态问题更集中**
- **维护负载更重**

结论：  
OpenClaw 在生态中的定位更像是**“复杂智能体系统的控制与治理中枢”**，而不是单纯的功能型助手框架。

---

# 4. 共同关注的技术方向

以下是多个项目共同涌现的需求信号：

## 4.1 会话 / 状态一致性
涉及项目：
- OpenClaw：reply run、session.prune、后台任务与会话冲突
- NanoClaw：共享技能旧副本、turn 绑定
- Hermes Agent：共享会话、Gateway、上下文压缩
- IronClaw：运行时恢复、扩展状态准确性
- CoPaw：session_id 透传、长输出治理
- ZeroClaw：conversation.id、thought_signature 保真

**共同诉求：**  
智能体系统已经进入多轮、多任务、多来源并发阶段，必须保证**状态归属清晰、跨轮次不串、历史不丢**。

## 4.2 安全边界与权限即时生效
涉及项目：
- OpenClaw：审批超时、热撤权、通道 sender policy
- Hermes Agent：portal URL 降级、会话隔离、转录防篡改
- PicoClaw：OAuth refresh 并发安全、TLS 校验
- CoPaw：MCP 允许/拒绝策略失效、Windows 沙箱
- NullClaw：A2A 路由下跨调用方上下文复用

**共同诉求：**  
认证只是入口，后续资源访问、工具调用、上下文复用都必须做**持续授权**。

## 4.3 可观测性与失败可解释
涉及项目：
- OpenClaw：Background tasks pane
- IronClaw：RunFailureReason funnel、失败原因可见
- ZeroClaw：OTel conversation.id
- LobsterAI：发布收尾、跨模块修复
- CoPaw：run outcome 结构化输出

**共同诉求：**  
用户不接受“失败但不知道为什么”，需要**可追踪、可诊断、可回放**。

## 4.4 多通道 / 多平台兼容
涉及项目：
- OpenClaw：Slack / Telegram / Discord / WhatsApp / QQBot 等
- Hermes Agent：Desktop / Gateway / Slack / Telegram
- PicoClaw：WhatsApp / OAuth provider
- LobsterAI：WeCom / DingTalk / OpenClaw 协作链路
- ZeroClaw：Telegram、ACP 客户端、多 agent endpoint
- NanoClaw：WhatsApp 兼容、渠道默认值

**共同诉求：**  
智能体开始进入真实业务通道，**跨平台行为一致性**成为硬指标。

## 4.5 性能、缓存、内存与长任务治理
涉及项目：
- NanoBot：prompt 前缀缓存、Ollama 延迟
- NanoClaw：字符串分配、时间戳、token footer
- ZeroClaw：JSON 深拷贝热点
- Hermes Agent：socket 泄漏、更新器阻塞
- CoPaw：工具结果裁剪、长输出治理
- IronClaw：iteration ceiling、loop resilience

**共同诉求：**  
AI 智能体不再是“请求级 demo”，而是**长生命周期、持续运行、可扩展系统**，性能问题会直接变成可用性问题。

---

# 5. 差异化定位分析

## 5.1 功能侧重
- **OpenClaw**：控制台、会话治理、安全边界、可观测性
- **Hermes Agent**：桌面端 + Gateway + 多平台集成
- **IronClaw**：运行时韧性、失败恢复、Slack/扩展生命周期
- **CoPaw**：v2.0 架构升级后的稳定化、记忆与工具治理
- **NanoBot / NanoClaw**：核心 runtime、记忆、适配器与通道抽象
- **PicoClaw**：认证、WhatsApp 交互、生产安全与性能
- **ZeroClaw**：工具链性能、OTel、外部客户端接入
- **LobsterAI**：协作流程、IM 定时任务、发布整固
- **NullClaw**：更偏安全隔离问题的单点修补

## 5.2 目标用户
- **OpenClaw / Hermes / CoPaw / LobsterAI**：面向需要在生产中编排多通道、多工具、多会话的团队用户
- **NanoBot / NanoClaw / ZeroClaw / IronClaw**：更偏工程团队、平台开发者、重度 agent 架构使用者
- **PicoClaw**：偏通道集成与企业消息场景
- **NullClaw**：偏高安全要求、A2A/多租户隔离场景

## 5.3 技术架构差异
- **OpenClaw**：强控制面、强 UI、强状态治理
- **Hermes Agent**：桌面端与网关并重，强调跨平台执行链
- **CoPaw**：版本化重构后，强调记忆、工具结果与中间件治理
- **NanoClaw**：适配器声明式配置、provider-agnostic memory
- **ZeroClaw**：更强调 tool loop、OTel、协议保真与性能
- **IronClaw**：围绕 runtime resilience 和 failure taxonomy 展开
- **PicoClaw**：围绕 OAuth/WhatsApp/安全默认值展开
- **LobsterAI**：更像协作编排与发布收口平台

---

# 6. 社区热度与成熟度

## 6.1 快速迭代阶段
这些项目“问题多、PR 多、修复密集”，说明正在快速迭代：
- **OpenClaw**
- **Hermes Agent**
- **IronClaw**
- **CoPaw**
- **ZeroClaw**

特征：
- 高 Issue / 高 PR
- P0/P1 问题密集
- 多数集中在安全、状态、兼容、长任务治理
- 更像真实生产反馈驱动的修复期

## 6.2 质量巩固阶段
这些项目更像在收敛技术债、增强稳定性：
- **NanoBot**
- **NanoClaw**
- **PicoClaw**
- **LobsterAI**

特征：
- PR 以修复、重构、兼容为主
- 问题数量不大，但集中度高
- 更接近“可用性打磨”和“架构定型”

## 6.3 低活跃或沉寂
- **NullClaw**：活跃度低，但出现高风险安全问题，需要关注
- **TinyClaw / Moltis / ZeptoClaw**：当前无活动

---

# 7. 值得关注的趋势信号

## 7.1 智能体系统正在从“会做事”走向“可治理”
趋势表现：
- session / turn / contextId / conversation.id 被反复强调
- 记忆、会话、工具调用都在做显式归属

**对开发者的价值：**
> 未来的核心能力不是“能调用工具”，而是“能证明谁在什么上下文里调用了什么”。

## 7.2 安全边界从入口认证升级为持续授权
趋势表现：
- 超时后审批不能继续生效
- 撤权必须对 in-flight exec 生效
- provider / portal / webhook 必须做更严格校验

**对开发者的价值：**
> AI 智能体不是一次性请求，权限模型必须覆盖整个任务生命周期。

## 7.3 可观测性正在成为产品核心能力
趋势表现：
- background tasks pane
- OTel session correlation
- failure funnel
- structured run outcome

**对开发者的价值：**
> “黑盒 agent”正在失去市场，下一代产品必须默认带审计与回放能力。

## 7.4 多通道与多平台兼容已进入生产门槛
趋势表现：
- Slack / Telegram / WhatsApp / WeCom / DingTalk / Discord / Gateway / Desktop
- 用户越来越在真实业务通道中使用 agent

**对开发者的价值：**
> 通道适配不是附加功能，而是产品能否落地的必要条件。

## 7.5 性能问题开始从“优化项”变成“可用性问题”
趋势表现：
- prompt 缓存、JSON 深拷贝、socket 泄漏、长输出裁剪、iteration ceiling
- 本地模型与长任务场景都在放大性能短板

**对开发者的价值：**
> AI 系统必须默认考虑长周期运行、资源泄漏和大上下文成本。

## 7.6 默认行为必须更保守
趋势表现：
- opt-in 开关
- 默认关闭 sustained-goal
- adapter-declared defaults
- provider-correct semantics

**对开发者的价值：**
> 未来智能体产品的竞争点，不是“多激进”，而是“默认是否安全、是否可控”。

---

如果你愿意，我可以把这份报告再压缩成两种版本：
1. **管理层一页版**  
2. **研发周会版（表格 + 风险等级）**

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-07-11）

> 仓库：NanoBot / HKUDS/nanobot  
> 今日数据：过去 24 小时 Issues 更新 2 条，PR 更新 11 条，新增 Release 0 个  
> 总体判断：**活跃度较高，方向偏向稳定性修复、性能优化与交互体验打磨**

---

## 1. 今日速览

今天 NanoBot 依然保持较高的工程活跃度，虽然**没有新版本发布**，但 PR 流转明显偏快，且主题集中在 **Agent 核心运行时、WebUI 交互、MCP/provider 架构、性能热点与稳定性修复**。  
从数据看，仓库呈现出一种“**边修边重构**”的健康状态：一方面在补齐 crash、空提交、multimodal 兼容等问题，另一方面也在推进更长期的架构整理。  
今日新增/活跃 Issues 仅 2 条，说明外部问题反馈规模不大，但其中一个性能诉求非常强烈，已直接触及可用性。  
综合来看，项目当前处于**中高活跃、持续收敛技术债**的阶段。  
相关链接： [Repo](https://github.com/HKUDS/nanobot)

---

## 2. 版本发布

**今日无新版本发布。**  
Releases 为空，说明当前改动仍主要停留在 PR 收敛与功能/修复合流阶段。  
相关链接： [Releases](https://github.com/HKUDS/nanobot/releases)

---

## 3. 项目进展

今日有 **5 个 PR 关闭**，覆盖范围较广，代表项目向前推进的重点包括：

- **Agent 运行时/上下文基础重构**  
  - PR [#4868](https://github.com/HKUDS/nanobot/pull/4868) `refactor(agent): establish turn/runtime context foundation`  
  - 这是一个偏底层的基础改造，统一运行时与请求上下文，利于后续行为一致性、可测试性和多模型路由。
- **多模态消息崩溃修复**  
  - PR [#4869](https://github.com/HKUDS/nanobot/pull/4869) `fix(agent): guard .strip() on list-form msg.content — crash on multimodal messages`  
  - 直接提升稳定性，属于高价值修复。
- **任务路由功能收束**  
  - PR [#4874](https://github.com/HKUDS/nanobot/pull/4874) `Feat/task based model routing`  
  - 虽然摘要为空，但从标题看是模型路由方向的重要能力收口。
- **WebUI 交互改进**  
  - PR [#4876](https://github.com/HKUDS/nanobot/pull/4876) `feat(webui): guide queued prompt with second Enter`  
  - 改善“排队输入”的操作体验，减少误触和上下文混淆。
  - PR [#4877](https://github.com/HKUDS/nanobot/pull/4877) `feat(webui): highlight file previews and diffs`  
  - 增强 diff/preview 可读性，偏向开发者体验优化。

**整体推进判断：**  
今日关闭 PR 的组合说明项目并非只在做“表层功能”，而是在同时推进 **Agent 核心抽象、消息兼容性、路由能力和 UI 可用性**。这类进展通常对后续版本质量影响较大。  
相关链接： [PR 列表](https://github.com/HKUDS/nanobot/pulls)

---

## 4. 社区热点

今日讨论最集中的条目是：

1. **Issue #4867** — [Preserve exact prompt prefix to enable caching in Ollama and others](https://github.com/HKUDS/nanobot/issues/4867)  
   - 评论数：**3**
   - 这是今日最活跃的 issue。
   - 背后诉求非常明确：**本地模型/ Ollama 场景下的性能不可接受**，用户希望保留精确 prompt 前缀以启用缓存，减少每轮额外开销。
   - 从描述看，这不是“微优化”，而是直接影响**可用性**的性能问题。

2. **PR #4873** — [fix(dream): skip no-op periodic commit attempts](https://github.com/HKUDS/nanobot/pull/4873)  
   - 虽然当前未显示评论数，但它明显对应 Issue #4872 的诉求，属于高相关热点。
   - 热点本质是：**自动提交逻辑不能制造无意义空提交**，否则会污染仓库历史并降低可维护性。

3. **PR #4879** — [feat(long_task): gate sustained-goal behind opt-in flag (default off)](https://github.com/HKUDS/nanobot/pull/4879)  
   - 主题上很有争议性，涉及“持续目标/自动续作”是否应默认启用。
   - 背后诉求是：**长任务不能阻塞用户交互**，默认行为应该更保守。

**热点结论：**  
今日社区关注点高度集中在两个关键词：**性能** 与 **可控性**。前者来自 Ollama/local model 的缓存与延迟，后者来自 Dream/long_task 这类自动化行为是否“过度主动”。  
相关链接：  
- [Issue #4867](https://github.com/HKUDS/nanobot/issues/4867)  
- [Issue #4872](https://github.com/HKUDS/nanobot/issues/4872)  
- [PR #4873](https://github.com/HKUDS/nanobot/pull/4873)  
- [PR #4879](https://github.com/HKUDS/nanobot/pull/4879)

---

## 5. Bug 与稳定性

按严重程度排序，今日最值得关注的问题如下：

### 1) 高严重度：Ollama/本地模型每轮额外增加约 60 秒延迟
- **Issue**: [#4867](https://github.com/HKUDS/nanobot/issues/4867)  
- 性质：性能回归 / 可用性问题  
- 影响：用户明确表示在 Ollama 与 32GB VRAM 环境下“**totally unusable**”，说明问题已达到严重影响使用的程度。  
- **是否已有 fix PR：暂未看到直接对应的修复 PR**

### 2) 高严重度：多模态消息触发崩溃
- **PR/Fix**: [#4869](https://github.com/HKUDS/nanobot/pull/4869)  
- 性质：崩溃修复  
- 影响：`msg.content` 可能是 `list[dict]`，旧逻辑无条件 `.strip()` 会导致运行时异常。  
- **是否已有 fix PR：有，且已关闭**

### 3) 中严重度：Dream 周期性运行产生空提交
- **Issue**: [#4872](https://github.com/HKUDS/nanobot/issues/4872)  
- **Fix PR**: [#4873](https://github.com/HKUDS/nanobot/pull/4873)  
- 性质：仓库污染 / 流程噪音  
- 影响：空提交会增加 Git 历史噪音，削弱审计价值。  
- **是否已有 fix PR：有，对应修复 PR 已提交但当前仍为 Open**

### 4) 交互稳定性：long_task 的持续目标可能阻塞用户
- **PR**: [#4879](https://github.com/HKUDS/nanobot/pull/4879)  
- 性质：交互体验/可控性风险  
- 影响：用户在长任务期间可能无法及时介入。  
- **是否已有 fix PR：以“默认关闭 + opt-in”方式缓解**

相关链接：  
- [Issue #4867](https://github.com/HKUDS/nanobot/issues/4867)  
- [Issue #4872](https://github.com/HKUDS/nanobot/issues/4872)  
- [PR #4869](https://github.com/HKUDS/nanobot/pull/4869)  
- [PR #4873](https://github.com/HKUDS/nanobot/pull/4873)  
- [PR #4879](https://github.com/HKUDS/nanobot/pull/4879)

---

## 6. 功能请求与路线图信号

今日出现的功能诉求，整体上都指向“**让系统更稳、更快、更可控**”，而不是单纯扩张功能面。

### 可能进入下一版本的信号较强
- [#4867](https://github.com/HKUDS/nanobot/issues/4867)  
  - 这是典型的“影响核心可用性”的性能需求，且与本地模型生态（Ollama 等）强相关，优先级很可能较高。
- [#4879](https://github.com/HKUDS/nanobot/pull/4879)  
  - 将 sustained-goal 改为默认关闭，符合保守上线策略，较容易纳入下一轮稳定版。
- [#4878](https://github.com/HKUDS/nanobot/pull/4878)  
  - hook 自动发现属于平台化能力，若实现稳定，后续会提升扩展体验。
- [#4871](https://github.com/HKUDS/nanobot/pull/4871)  
  - 属于热路径性能优化，虽然是微优化，但与当前“性能诉求”方向高度一致。
- [#4873](https://github.com/HKUDS/nanobot/pull/4873)  
  - 修正 no-op commit 行为，属于流程层修复，通常更容易快速合入。

### 路线图信号判断
如果当前趋势延续，NanoBot 下一阶段更像是在形成一个版本主题：  
**“更低延迟的本地模型支持 + 更少副作用的自动化行为 + 更稳的 Agent 核心基础”**。  
相关链接：  
- [Issue #4867](https://github.com/HKUDS/nanobot/issues/4867)  
- [PR #4871](https://github.com/HKUDS/nanobot/pull/4871)  
- [PR #4873](https://github.com/HKUDS/nanobot/pull/4873)  
- [PR #4878](https://github.com/HKUDS/nanobot/pull/4878)  
- [PR #4879](https://github.com/HKUDS/nanobot/pull/4879)

---

## 7. 用户反馈摘要

从今日 Issues/PR 反馈中，可以提炼出以下真实用户痛点：

- **本地模型性能痛点很强**  
  - 用户希望保留精确 prompt 前缀，以便 Ollama 和类似系统利用缓存，说明 NanoBot 在 local-first 场景下的延迟成本已经触发不满。  
  - 相关链接： [#4867](https://github.com/HKUDS/nanobot/issues/4867)

- **自动化行为不能“自作主张”留下副作用**  
  - Dream 每次运行都创建空提交，会让用户觉得系统“动了但没产出”。  
  - 相关链接： [#4872](https://github.com/HKUDS/nanobot/issues/4872) / [#4873](https://github.com/HKUDS/nanobot/pull/4873)

- **长任务需要给用户保留控制权**  
  - sustained-goal 机制如果默认开启，会让用户在关键时刻无法插手。  
  - 相关链接： [#4879](https://github.com/HKUDS/nanobot/pull/4879)

- **多模态输入已进入实际使用阶段，兼容性不能假设为字符串**  
  - `msg.content` 可能是结构化块，说明真实用户已经在使用图片/多模态消息流。  
  - 相关链接： [#4869](https://github.com/HKUDS/nanobot/pull/4869)

- **开发者体验仍在持续优化**  
  - diff 高亮、文件预览增强、Markdown 共享 helper 等都说明贡献者群体对“可读性”和“可维护性”要求很高。  
  - 相关链接： [#4877](https://github.com/HKUDS/nanobot/pull/4877) / [#4870](https://github.com/HKUDS/nanobot/pull/4870)

---

## 8. 待处理积压

基于今日快照，建议维护者优先跟进以下尚未完全收敛的条目：

- **高优先级未闭环问题**
  - [#4867](https://github.com/HKUDS/nanobot/issues/4867) — Ollama/本地模型缓存与延迟问题，直接影响可用性
- **已提修复但仍待合并/确认的 PR**
  - [#4873](https://github.com/HKUDS/nanobot/pull/4873) — no-op 周期提交修复
  - [#4878](https://github.com/HKUDS/nanobot/pull/4878) — hook 自动发现
  - [#4879](https://github.com/HKUDS/nanobot/pull/4879) — sustained-goal 默认关闭
  - [#4871](https://github.com/HKUDS/nanobot/pull/4871) — 热路径性能优化
  - [#4875](https://github.com/HKUDS/nanobot/pull/4875) — MCP provider 生命周期重构
  - [#4870](https://github.com/HKUDS/nanobot/pull/4870) — channel Markdown helper 共享

**维护建议：**  
从项目健康度看，今日并不存在“大量堆积未动”的信号，但有几个条目显然属于**高价值、低容忍度**类别：性能、崩溃、自动化副作用。建议优先清理这些项，以防它们继续拖累用户体验。  
相关链接：  
- [Issues](https://github.com/HKUDS/nanobot/issues)  
- [PRs](https://github.com/HKUDS/nanobot/pulls)

---

如你愿意，我还可以把这份日报进一步整理成：
1. **适合发群的精简版**，或  
2. **适合管理层看的“风险/收益”版**。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-07-11）

## 1. 今日速览
过去 24 小时，Hermes Agent 处于**高强度修复与并行推进**状态：Issues 更新 50 条、PR 更新 50 条，且**没有新版本发布**。从主题分布看，活跃度主要集中在 **Desktop、Gateway、Agent、Tools、安全边界、Windows/Linux 兼容性** 这几条主线。  
整体判断是：项目当前**推进速度很快**，但也暴露出较多跨平台回归和安全/稳定性问题，属于“高活跃、高修复密度、短期回归风险仍偏高”的阶段。  
今日最明显的信号是，多数高频问题已经被拆成定向修复 PR，说明维护节奏在加快，下一版大概率会以稳定性补丁为主。

---

## 2. 版本发布
**今日无新 Releases。**  
- Releases 页面：无  
- 项目仓库：<https://github.com/nousresearch/hermes-agent>

---

## 3. 项目进展
> 说明：本次数据仅展示了**最新 50 条 PR 中的未完成项**，未列出那 6 条已合并/关闭 PR 的明细；因此以下以“今天最接近落地、且已明确对接 issue 的修复 PR”来概括项目进展。

今天的 PR 进展呈现出非常清晰的“问题闭环”特征，多个高优先级 issue 已经被转化为可合并修复：

- **桌面端附件上传链路**：[#62382](https://github.com/nousresearch/hermes-agent/pull/62382) 修复远端附件按 bounded chunks 流式上传，直接对应 [#62375](https://github.com/nousresearch/hermes-agent/issues/62375)。
- **上下文压缩安全性**：[#62378](https://github.com/nousresearch/hermes-agent/pull/62378) 为 summarizer prompt 加入“防幻觉/防编造”约束，对应 [#62365](https://github.com/nousresearch/hermes-agent/issues/62365)。
- **Telegram 审批安全**：[#62376](https://github.com/nousresearch/hermes-agent/pull/62376) 在命令预览被截断时隐藏审批按钮，对应 [#62359](https://github.com/nousresearch/hermes-agent/issues/62359)。
- **MCP keepalive 稳定性**：[#62371](https://github.com/nousresearch/hermes-agent/pull/62371) 修复空异常导致的无限重连问题，对应 [#62212](https://github.com/nousresearch/hermes-agent/issues/62212)。
- **Gateway 会话隔离**：[#62370](https://github.com/nousresearch/hermes-agent/pull/62370) 修正 `is_shared_multi_user_session` 的隔离逻辑。
- **权限/安全边界**：[#62373](https://github.com/nousresearch/hermes-agent/pull/62373) 拒绝 scheme 降级的 `portal_base_url`，这是明显的安全强化。
- **Provider/模型解析修复**：[#62367](https://github.com/nousresearch/hermes-agent/pull/62367)、[#62364](https://github.com/nousresearch/hermes-agent/pull/62364)、[#62362](https://github.com/nousresearch/hermes-agent/pull/62362) 分别覆盖自定义 provider、Gemini 模型发现、MiniMax reasoning timeout floor。
- **Agent/工具健壮性**：[#62368](https://github.com/nousresearch/hermes-agent/pull/62368)、[#62374](https://github.com/nousresearch/hermes-agent/pull/62374)、[#62360](https://github.com/nousresearch/hermes-agent/pull/62360) 主要修复 batch delegate、插件实例隔离、会话转录防篡改。
- **平台通信与体验**：[#62361](https://github.com/nousresearch/hermes-agent/pull/62361) 提升 Telegram 媒体上传重试能力，[#62363](https://github.com/nousresearch/hermes-agent/pull/62363) 让 Gateway 启动失败原因可见，降低“黑盒失败”。

**整体来看，今天项目不是在“做大功能”，而是在集中清理基础设施与安全债务。**  
这类修复如果按计划合并，会显著提升 Hermes 在桌面端、网关、MCP、Telegram 和模型接入上的可用性与可信度。

---

## 4. 社区热点
今天讨论最集中的话题，几乎都围绕“**实际可用性是否稳定**”展开，且多数问题都带有明确用户场景。

### 热点 Issue
- **桌面端终端启动失败 / 可执行位丢失**  
  [#62324](https://github.com/nousresearch/hermes-agent/issues/62324)  
  关键词：`stage-native-deps.mjs`、`node-pty`、`spawn-helper`、`posix_spawnp`。  
  诉求本质是：桌面端基础终端能力不能因打包/阶段脚本回归而失效。

- **Linux 更新链路受 npm 12 影响**  
  [#62171](https://github.com/nousresearch/hermes-agent/issues/62171)  
  这类问题说明用户非常依赖“update 即可用”的安装路径，一旦脚本策略变化，桌面版就会立即受损。

- **远端附件上传需要可续传、可分块**  
  [#62375](https://github.com/nousresearch/hermes-agent/issues/62375)  
  用户已经开始把 Hermes Desktop 当作重度文件工作台使用，16 MiB 上限和单次 base64 IPC 的设计已经不够。

- **长会话时间感知不足**  
  [#62369](https://github.com/nousresearch/hermes-agent/issues/62369)  
  用户希望 Agent 能理解“昨天/前天/上周”的上下文，否则长会话决策会偏离真实时间线。

- **Cron / no_agent 作业历史不可见**  
  [#62341](https://github.com/nousresearch/hermes-agent/issues/62341)  
  这说明脚本型自动化用户正在把 Hermes 当任务调度器用，但面板可观测性仍不足。

- **Browser 并发与 tab 归属冲突**  
  [#62338](https://github.com/nousresearch/hermes-agent/issues/62338)  
  [#62339](https://github.com/nousresearch/hermes-agent/issues/62339)  
  这组需求反映出用户正在多 agent 并发驱动同一浏览器 profile，协调机制成为刚需。

- **凭据与安全边界**  
  [#62336](https://github.com/nousresearch/hermes-agent/issues/62336)、[#62333](https://github.com/nousresearch/hermes-agent/issues/62333)  
  用户对“凭据是否会落盘”“refresh token 是否会丢失”非常敏感，尤其是本地密钥和 OAuth 场景。

### 热点判断
今天的社区热点并不是“新奇功能”，而是**生产可用性**：  
- 端到端上传  
- 更新/安装链路  
- 认证与凭据安全  
- 多会话/多 profile 并发  
- 时间感知与上下文稳定性

这说明 Hermes 正从“能用”进入“必须可靠”的阶段。

---

## 5. Bug 与稳定性
按严重程度排序如下：

### P1 / 高风险安全与逻辑正确性
- **上下文压缩会编造用户请求**  
  [#62365](https://github.com/nousresearch/hermes-agent/issues/62365)  
  影响：Agent 可能把不存在的需求写进压缩摘要，直接破坏任务真实性。  
  **已有 fix PR**：[#62378](https://github.com/nousresearch/hermes-agent/pull/62378)

### P2 / 安全、持久化、崩溃与系统性回归
- **终端环境快照把敏感环境变量写入磁盘**  
  [#62336](https://github.com/nousresearch/hermes-agent/issues/62336)  
  风险：凭据泄露，属于明确的安全边界问题。  
  **fix PR：未在本次数据中看到**

- **OAuth refresh_token 每次刷新都被抹掉，MCP 服务约 1 小时后失效**  
  [#62333](https://github.com/nousresearch/hermes-agent/issues/62333)  
  风险：认证生命周期断裂，影响所有 OAuth MCP 服务。  
  **fix PR：未在本次数据中看到**

- **Dashboard 长期积累 CLOSE_WAIT socket，最终 EMFILE**  
  [#62175](https://github.com/nousresearch/hermes-agent/issues/62175)  
  风险：长期运行后服务耗尽文件描述符，属于典型稳定性退化。  
  **fix PR：未在本次数据中看到**

- **Windows 更新器被外部进程占用 venv 时直接 abort**  
  [#62311](https://github.com/nousresearch/hermes-agent/issues/62311)  
  风险：GUI 更新链路被锁死，影响 Windows 用户升级。  
  **fix PR：未在本次数据中看到**

- **删除的工作目录导致终端后续命令永久失败**  
  [#62169](https://github.com/nousresearch/hermes-agent/issues/62169)  
  风险：会话环境失效后无法自愈。  
  **fix PR：未在本次数据中看到**

- **Desktop 下载/安装链路被 `stage-native-deps.mjs` 回归破坏**  
  [#62324](https://github.com/nousresearch/hermes-agent/issues/62324)  
  风险：本地终端能力无法启动。  
  **fix PR：未在本次数据中看到**

### P3 / 体验、可观测性与数据一致性
- **cron 的 no_agent 作业历史显示 “No runs yet”**  
  [#62341](https://github.com/nousresearch/hermes-agent/issues/62341)  
- **Desktop 聊天耗时计数器切换页面后重置**  
  [#62158](https://github.com/nousresearch/hermes-agent/issues/62158)  
- **多 profile 模型选择器在 current/new chats 间不一致**  
  [#62323](https://github.com/nousresearch/hermes-agent/issues/62323)  
- **Gemini live model discovery 失败，只回退到静态 4 模型**  
  [#62259](https://github.com/nousresearch/hermes-agent/issues/62259)  
- **状态/错误提示里显示内部 alias `custom` 而不是用户配置 provider 名**  
  [#62182](https://github.com/nousresearch/hermes-agent/issues/62182)  

### 已有修复 PR 的关键对应
- [#62375](https://github.com/nousresearch/hermes-agent/issues/62375) → [#62382](https://github.com/nousresearch/hermes-agent/pull/62382)
- [#62365](https://github.com/nousresearch/hermes-agent/issues/62365) → [#62378](https://github.com/nousresearch/hermes-agent/pull/62378)
- [#62359](https://github.com/nousresearch/hermes-agent/issues/62359) → [#62376](https://github.com/nousresearch/hermes-agent/pull/62376)
- [#62212](https://github.com/nousresearch/hermes-agent/issues/62212) → [#62371](https://github.com/nousresearch/hermes-agent/pull/62371)
- [#62353](https://github.com/nousresearch/hermes-agent/issues/62353) → [#62362](https://github.com/nousresearch/hermes-agent/pull/62362)

---

## 6. 功能请求与路线图信号
今天的新功能信号很明确：用户希望 Hermes 不只是“能对话”，而是能成为**多工作流协同平台**。

### 值得关注的功能请求
- **本地 skill → shared skill 的审核式晋升流程**  
  [#62384](https://github.com/nousresearch/hermes-agent/issues/62384)  
  这暗示技能管理正在从“自动生成”走向“可治理、可审查”。

- **远端附件分块上传 / 可续传**  
  [#62375](https://github.com/nousresearch/hermes-agent/issues/62375)  
  与桌面端真实使用场景高度一致，优先级很高，且已有修复 PR。  

- **给 Agent 注入消息时间戳，提高时间感知**  
  [#62369](https://github.com/nousresearch/hermes-agent/issues/62369)  
  这是长会话、多日任务的刚需，属于“能力型增强”而非纯 UI 需求。

- **账号级 GitHub PR Dashboard**  
  [#62352](https://github.com/nousresearch/hermes-agent/issues/62352)  
  说明桌面端用户开始期待 Hermes 进入工程管理中枢角色。

- **浏览器 profile/tab 并发隔离与租约管理**  
  [#62338](https://github.com/nousresearch/hermes-agent/issues/62338)、[#62339](https://github.com/nousresearch/hermes-agent/issues/62339)  
  这类需求通常会进入中期路线图，因为它直接决定多 agent 协作能力上限。

- **网络搜索自动降级到 DuckDuckGo**  
  [#62366](https://github.com/nousresearch/hermes-agent/issues/62366)  
  这是典型的“可靠性优先”功能请求，适合在下一版增强容错。

### 路线图判断
**更可能进入下一版的**：  
- 附件分块上传/续传  
- Gemini / MiniMax / provider 解析修复  
- Telegram / Gateway 的稳定性修复  
- 安全边界修复（tokens、transcript、URL 校验）

**更像中期功能演进的**：  
- GitHub PR Dashboard  
- skill 晋升工作流  
- 浏览器 tab lease / 并发协调  
- 会话时间戳增强

---

## 7. 用户反馈摘要
从 Issues 内容看，用户反馈的核心痛点可以归纳为以下几类：

1. **“别让基础功能突然坏掉”**  
   终端启动失败、更新器锁死、工作目录删除后命令全挂，这些问题说明用户对 Hermes 的底层执行链路有较强依赖。  
   相关：[#62324](https://github.com/nousresearch/hermes-agent/issues/62324)、[#62311](https://github.com/nousresearch/hermes-agent/issues/62311)、[#62169](https://github.com/nousresearch/hermes-agent/issues/62169)

2. **“我需要它适合长会话和多日任务”**  
   用户希望 Agent 具备时间感知，不要在压缩上下文时“脑补”不存在的需求。  
   相关：[#62369](https://github.com/nousresearch/hermes-agent/issues/62369)、[#62365](https://github.com/nousresearch/hermes-agent/issues/62365)

3. **“批量上传、附件、自动化都要更可靠”**  
   远端附件过大、单次 IPC 过重、媒体上传不稳定、cron 历史不可见，这些都说明用户已经把 Hermes 用在重度自动化场景。  
   相关：[#62375](https://github.com/nousresearch/hermes-agent/issues/62375)、[#62341](https://github.com/nousresearch/hermes-agent/issues/62341)、[#62361](https://github.com/nousresearch/hermes-agent/pull/62361)

4. **“安全和凭据不能出错”**  
   环境快照泄露、refresh token 丢失、transcript 可被写回、URL 降级校验缺失——用户对这类问题容忍度极低。  
   相关：[#62336](https://github.com/nousresearch/hermes-agent/issues/62336)、[#62333](https://github.com/nousresearch/hermes-agent/issues/62333)、[#62360](https://github.com/nousresearch/hermes-agent/pull/62360)、[#62373](https://github.com/nousresearch/hermes-agent/pull/62373)

5. **“模型与 provider 解析要准确，不要 silent fallback”**  
   用户不接受“看起来能用、实际上路由错了”的行为。  
   相关：[#62259](https://github.com/nousresearch/hermes-agent/issues/62259)、[#62254](https://github.com/nousresearch/hermes-agent/issues/62254)、[#62182](https://github.com/nousresearch/hermes-agent/issues/62182)、[#62367](https://github.com/nousresearch/hermes-agent/pull/62367)

---

## 8. 待处理积压
以下是当前最值得维护者优先认领的高风险条目，虽然其中不少是今天才出现，但都**尚未看到明确的修复闭环**，且对用户影响较大：

- **敏感环境变量落盘** — [#62336](https://github.com/nousresearch/hermes-agent/issues/62336)  
  安全风险高，建议优先处理。

- **OAuth refresh_token 被清空** — [#62333](https://github.com/nousresearch/hermes-agent/issues/62333)  
  这是认证稳定性问题，会直接打断 MCP 使用。

- **Dashboard socket 泄漏** — [#62175](https://github.com/nousresearch/hermes-agent/issues/62175)  
  长运行系统的经典积压项，可能演变成线上故障。

- **Windows 更新器 venv 锁冲突** — [#62311](https://github.com/nousresearch/hermes-agent/issues/62311)  
  Windows 用户升级路径被阻断，影响面大。

- **桌面端终端因 execute bit 丢失而失败** — [#62324](https://github.com/nousresearch/hermes-agent/issues/62324)  
  属于回归型高优先级 bug。

- **删除 CWD 后终端永久失败** — [#62169](https://github.com/nousresearch/hermes-agent/issues/62169)  
  会话恢复能力不足，适合进入修复队列。

- **多 profile / browser 并发冲突** — [#62338](https://github.com/nousresearch/hermes-agent/issues/62338)、[#62339](https://github.com/nousresearch/hermes-agent/issues/62339)  
  这是未来多 agent 协作的重要基础问题，建议尽早设计。

---

### 总体结论
Hermes Agent 今天呈现出典型的“**高活跃修复日**”：问题很多，但不少关键问题已被迅速拆成 PR。项目的主线正在从功能扩张转向**稳定性、安全性、跨平台一致性和多 agent 协作边界**。如果这些修复能按当前节奏合并，下一轮版本会明显改善桌面端与网关的可靠性。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-07-11）

## 1. 今日速览
过去 24 小时，PicoClaw 维持了**较高的开发活跃度**：新增/活跃 Issues 2 条、PR 8 条，但**没有任何 PR 合并或关闭，也没有新版本发布**。从提交主题看，社区和维护者的关注点高度集中在**OAuth 认证稳定性、WhatsApp 交互体验、安全加固和性能优化**四个方向。  
整体判断：项目当前处于**“提案与修复集中涌入、等待评审落地”**阶段，技术方向明确，健康度不错，但**交付节奏受评审/合并效率制约**。

---

## 3. 项目进展
**今日没有重要 PR 合并/关闭记录**，因此“已落地进展”暂时为 0。  
不过，从今日新增的 8 个 PR 来看，项目已经在以下方向上明显向前推进：

- **认证体系修复**  
  - [#3241 fix(auth): make OAuth refresh provider-correct and concurrency-safe](https://github.com/sipeed/picoclaw/pull/3241)  
    直接针对 [#3239](https://github.com/sipeed/picoclaw/issues/3239) 的问题，修正 OAuth refresh 的 provider 语义差异，并增强并发安全性。  
  - 这是今天最关键的“基础能力补丁”，如果合入，将显著降低登录/刷新 token 失败风险。

- **WhatsApp 交互体验增强**  
  - [#3242 feat(whatsapp): add native typing presence](https://github.com/sipeed/picoclaw/pull/3242)  
    对应 [#3240](https://github.com/sipeed/picoclaw/issues/3240)，补上 WhatsApp 原生 typing/presence 反馈，减少用户“发送后无响应”的等待感。

- **安全与稳定性加固**  
  - [#3246 fix: security and robustness hardening](https://github.com/sipeed/picoclaw/pull/3246)  
    涉及 MQTT TLS 证书校验、OAuth 超时、搜索读取边界控制等。  
  - [#3248 fix: bump Go to 1.25.12 to remediate stdlib vulnerabilities](https://github.com/sipeed/picoclaw/pull/3248)  
    直接消除标准库漏洞告警，属于生产环境很值得优先处理的供应链修复。

- **性能与代码质量优化**  
  - [#3243 refactor(seahorse): use strings.Builder in compaction string helpers](https://github.com/sipeed/picoclaw/pull/3243)  
  - [#3244 refactor(seahorse): cut allocations in summary XML assembly](https://github.com/sipeed/picoclaw/pull/3244)  
  - [#3245 refactor(skills): single-pass escapeXML, drop no-op Sprintf](https://github.com/sipeed/picoclaw/pull/3245)  
    这些 PR 主要减少字符串拼接和 XML 处理中的重复分配，属于面向性能和可维护性的基础优化。

- **国际化补全**  
  - [#3247 feat(i18n): add Czech translations for code wrap options](https://github.com/sipeed/picoclaw/pull/3247)  
    说明项目仍在持续扩展多语言支持。

**总体上**：如果上述 PR 后续陆续合入，PicoClaw 会在**认证正确性、消息交互体验、安全基线、运行效率**四个维度同步提升。

---

## 4. 社区热点
从今日数据看，**没有形成明显的“评论/点赞驱动型热点”**：  
- 所有最新 Issues 的评论数均为 0、👍 为 0  
- PR 评论数也未见活跃反馈（数据未给出具体评论）

因此，今日的“热点”更多体现为**开发者密集围绕同一类问题提交修复**，而不是公开讨论爆发。当前最值得关注的主题有：

1. **OAuth 刷新与并发安全**
   - [#3239 OAuth refresh requests use incompatible provider semantics and can race](https://github.com/sipeed/picoclaw/issues/3239)
   - [#3241 fix(auth): make OAuth refresh provider-correct and concurrency-safe](https://github.com/sipeed/picoclaw/pull/3241)  
   背后诉求：避免 token 刷新在不同 provider 上行为不一致，同时消除并发竞态。

2. **WhatsApp 回复过程中的可见反馈**
   - [#3240 Add typing presence to WhatsApp native replies](https://github.com/sipeed/picoclaw/issues/3240)
   - [#3242 feat(whatsapp): add native typing presence](https://github.com/sipeed/picoclaw/pull/3242)  
   背后诉求：减少“机器人卡住了”的感知，让用户知道系统正在生成回复。

3. **安全默认值与生产级稳健性**
   - [#3246 fix: security and robustness hardening](https://github.com/sipeed/picoclaw/pull/3246)
   - [#3248 fix: bump Go to 1.25.12 to remediate stdlib vulnerabilities](https://github.com/sipeed/picoclaw/pull/3248)  
   背后诉求：降低部署风险，减少默认配置带来的安全隐患。

---

## 5. Bug 与稳定性
按严重程度排序，今日最值得关注的问题如下：

### 高优先级：OAuth refresh 兼容性与竞态
- [#3239 OAuth refresh requests use incompatible provider semantics and can race](https://github.com/sipeed/picoclaw/issues/3239)  
  **影响**：可能导致 token 刷新失败、认证不稳定，且在并发场景下出现 race。  
  **状态**：已有修复 PR  
  - [#3241 fix(auth): make OAuth refresh provider-correct and concurrency-safe](https://github.com/sipeed/picoclaw/pull/3241)

### 中优先级：WhatsApp 回复过程缺少 typing/presence
- [#3240 Add typing presence to WhatsApp native replies](https://github.com/sipeed/picoclaw/issues/3240)  
  **影响**：不属于崩溃型 bug，但会显著影响用户体验，尤其在回复耗时较长时。  
  **状态**：已有修复 PR  
  - [#3242 feat(whatsapp): add native typing presence](https://github.com/sipeed/picoclaw/pull/3242)

### 中高优先级：生产安全与运行稳定性风险
- [#3246 fix: security and robustness hardening](https://github.com/sipeed/picoclaw/pull/3246)  
  **影响**：MQTT TLS 校验关闭、OAuth 超时缺失、搜索读取无边界等，属于典型生产风险点。  
  **状态**：直接修复 PR 已提交。

- [#3248 fix: bump Go to 1.25.12 to remediate stdlib vulnerabilities](https://github.com/sipeed/picoclaw/pull/3248)  
  **影响**：标准库漏洞会影响整体安全基线。  
  **状态**：直接修复 PR 已提交。

---

## 6. 功能请求与路线图信号
今日新增需求/功能信号主要集中在以下几个方向：

1. **WhatsApp 原生 typing presence**
   - [#3240](https://github.com/sipeed/picoclaw/issues/3240)
   - [#3242](https://github.com/sipeed/picoclaw/pull/3242)  
   **判断**：这是非常明确的下一版本候选功能，且已进入实现阶段。

2. **OAuth 刷新逻辑的 provider 正确性与并发安全**
   - [#3239](https://github.com/sipeed/picoclaw/issues/3239)
   - [#3241](https://github.com/sipeed/picoclaw/pull/3241)  
   **判断**：这是核心基础设施修复，优先级高，几乎可以视为“下一版本必带修复”。

3. **安全加固与默认配置收紧**
   - [#3246](https://github.com/sipeed/picoclaw/pull/3246)
   - [#3248](https://github.com/sipeed/picoclaw/pull/3248)  
   **判断**：偏基础设施升级，通常会被纳入稳定版本。

4. **i18n 与编辑体验完善**
   - [#3247](https://github.com/sipeed/picoclaw/pull/3247)  
   **判断**：属于低风险的体验补齐，适合随版本合并。

5. **性能优化与内存分配收敛**
   - [#3243](https://github.com/sipeed/picoclaw/pull/3243)
   - [#3244](https://github.com/sipeed/picoclaw/pull/3244)
   - [#3245](https://github.com/sipeed/picoclaw/pull/3245)  
   **判断**：更像是“为规模化使用做准备”的工程化优化，若 CI 稳定，也适合进入下一版本。

---

## 7. 用户反馈摘要
从 Issues 文本能提炼出几条非常真实的用户痛点：

- **用户希望机器人“有回应感”**  
  来自 [#3240](https://github.com/sipeed/picoclaw/issues/3240)：  
  用户发送消息后，如果系统需要几秒才能生成回复，界面却完全没有 typing/presence 提示，会让人误以为服务卡住或失联。  
  **场景**：WhatsApp 中与助手对话，等待较长回复时尤其明显。

- **用户希望 OAuth 刷新“按 provider 正确工作”**  
  来自 [#3239](https://github.com/sipeed/picoclaw/issues/3239)：  
  现有统一刷新逻辑对不同 OAuth provider 过于粗糙，导致刷新失败或行为异常。  
  **场景**：Dashboard/后台检查令牌有效性、自动刷新 token、并发访问同一账户时。

- **用户和维护者都重视安全默认值**  
  来自 [#3246](https://github.com/sipeed/picoclaw/pull/3246) 与 [#3248](https://github.com/sipeed/picoclaw/pull/3248)：  
  项目使用者不仅关心“能不能跑”，也关心“默认是否安全”“能否直接用于生产”。

整体来看，当前反馈并不尖锐，但诉求很一致：**更稳定、更像真人交互、更适合生产使用**。

---

## 8. 待处理积压
严格来说，今日数据里**没有长期未响应的 stale Issue/PR**：所有新增条目都来自 2026-07-10，且尚未产生评论积累。  
但从维护优先级看，以下条目最值得优先清理：

- **认证主线**  
  - [#3239](https://github.com/sipeed/picoclaw/issues/3239)  
  - [#3241](https://github.com/sipeed/picoclaw/pull/3241)

- **用户体验主线**  
  - [#3240](https://github.com/sipeed/picoclaw/issues/3240)  
  - [#3242](https://github.com/sipeed/picoclaw/pull/3242)

- **安全主线**  
  - [#3246](https://github.com/sipeed/picoclaw/pull/3246)  
  - [#3248](https://github.com/sipeed/picoclaw/pull/3248)

- **性能优化批次**  
  - [#3243](https://github.com/sipeed/picoclaw/pull/3243)  
  - [#3244](https://github.com/sipeed/picoclaw/pull/3244)  
  - [#3245](https://github.com/sipeed/picoclaw/pull/3245)

**提醒维护者**：当前不是“陈旧积压”问题，而是**同主题 PR 集中涌入导致的评审压力**。若合入节奏跟不上，容易形成“看起来很活跃，但实际版本没有推进”的状态。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-07-11）

## 1) 今日速览
今日 NanoClaw 处于**高活跃、偏工程收敛**的状态：过去 24 小时共有 **1 条 Issue 更新**、**14 条 PR 更新**，其中 **9 条已合并/关闭**、**5 条仍在处理中**，且**没有新版本发布**。从变更主题看，项目重心集中在**多提供方记忆系统、渠道默认配置重构、时间戳一致性修复**以及若干面向生产可用性的 bug 修补。  
整体判断：**项目健康度良好，开发推进强，但仍在快速重构期**，说明团队在持续补齐底层一致性与跨渠道行为的边角问题。  
当天没有明显“版本冻结”信号，反而更像是为下一轮发布做基础设施收敛。

---

## 2) 项目进展
今日最重要的进展集中在以下几组已合并/关闭 PR：

### A. 渠道与适配器架构收敛
- **[#3010](https://github.com/nanocoai/nanoclaw/pull/3010)** `feat: adapter-declared channel defaults`
- **[#3011](https://github.com/nanocoai/nanoclaw/pull/3011)** `feat(channels): ChannelDefaults declarations for all adapters + WhatsApp shared-number fix`

这组变更把原本散落在 core 中的渠道行为判断，推进为**由各适配器声明默认值**的模式，减少“核心层猜测”带来的隐式规则。  
**影响**：提升了渠道行为可解释性，降低后续新增渠道时的耦合成本，也修复了 WhatsApp 相关共享号码问题。

### B. 持久化记忆系统落地
- **[#3012](https://github.com/nanocoai/nanoclaw/pull/3012)** `feat(memory): add provider-agnostic persistent memory`
- **[#3013](https://github.com/nanocoai/nanoclaw/pull/3013)** `feat(codex): load shared memory on session start`

这两条 PR 表明项目在推进**跨提供方统一记忆层**：先定义 provider-neutral 的持久记忆树，再将其接入 Codex 的会话启动流程。  
**影响**：这是偏“平台层”的能力升级，意味着 NanoClaw 正在从“工具集合”向“统一上下文基础设施”演进。

### C. 时间戳一致性与可观测性修复
- **[#3006](https://github.com/nanocoai/nanoclaw/pull/3006)** `fix: ISO storage + local-time display for all timestamps`
- **[#3007](https://github.com/nanocoai/nanoclaw/pull/3007)** `fix: exchange archives stamp local time`
- **[#3005](https://github.com/nanocoai/nanoclaw/pull/3005)** `fix(codex): footer token 数字用单轮值替代累计值`

这组修复解决的是**“存储统一、展示本地化”**和**统计口径错误**问题。  
**影响**：提升日志、归档、任务行、Token footer 的一致性，避免时间偏移和夸大计量引起的误判，属于典型的生产可维护性提升。

### D. 工具与文档增强
- **[#3004](https://github.com/nanocoai/nanoclaw/pull/3004)** `Context preview tool`
- **[#3003](https://github.com/nanocoai/nanoclaw/pull/3003)** `docs(agent-browser): require bounded waits for custom conditions`

这类变更虽然不直接增加业务功能，但对**调试、复现、约束最佳实践**帮助很大。  
**影响**：降低 agent 场景调试成本，也为未来排查上下文差异和无界等待问题提供了工具与规范。

### 今日整体推进量判断
今天至少有 **9 个 PR 完成合并/关闭**，覆盖了架构、记忆、时间戳、文档和工具链。  
这说明项目不是单点修 bug，而是在**集中消化一波系统性重构**，属于“稳步前进、兼顾修边”的健康节奏。

---

## 3) 社区热点
> 注：当前数据里 **Issue/PR 的评论数与 reaction 基本为空**，因此无法严格按“讨论热度”排序；以下以**变更影响面与问题显著性**作为热点判断依据。

### 热点 1：旧群组共享技能失效
- **Issue**：[#3001](https://github.com/nanocoai/nanoclaw/issues/3001)  
- **对应修复 PR**：[#3002](https://github.com/nanocoai/nanoclaw/pull/3002)

这是今日最值得关注的“用户痛点型”问题：**shared-skills 重构后创建的旧 agent group 仍在使用旧的技能副本**，导致更新无法下发，且日志没有任何提示。  
**背后诉求**：用户希望升级后**配置能自动生效**，至少在失配时有明确告警，而不是静默失败。

### 热点 2：记忆系统跨提供方统一
- **PR**：[#3012](https://github.com/nanocoai/nanoclaw/pull/3012)
- **PR**：[#3013](https://github.com/nanocoai/nanoclaw/pull/3013)

这是偏“路线图级”的热点。它不只是新功能，而是把 NanoClaw 的记忆能力抽象为**provider-agnostic**，说明项目正在向多模型/多代理统一体验靠拢。  
**背后诉求**：用户希望不同 provider 下都能共享上下文与长期记忆，减少切换成本。

### 热点 3：WhatsApp / LID 兼容性问题
- **PR**：[#3008](https://github.com/nanocoai/nanoclaw/pull/3008)

该 PR 直接指向实际生产兼容性：`cachedGroupMetadata` 可能破坏 LID 群组的 SKDM 流程。  
**背后诉求**：跨 WhatsApp 形态的消息分发稳定性，尤其是群组身份与 sender-key 相关流程，属于高优先级稳定性需求。

---

## 4) Bug 与稳定性
按影响面与严重度排序：

### 1. 高严重度：旧群组技能副本导致静默阻塞
- **Issue**：[#3001](https://github.com/nanocoai/nanoclaw/issues/3001)
- **状态**：开放
- **是否已有 fix PR**：**有**，对应修复候选为 **[#3002](https://github.com/nanocoai/nanoclaw/pull/3002)**

**问题影响**：  
旧 group 在 shared-skills 重构前创建，仍运行 `.claude-shared/skills/` 里的旧内容，导致 `container/skills/` 的更新无法生效。更糟的是，这个失配是**静默的**，用户很难察觉。  
**稳定性结论**：这属于“升级后行为漂移”问题，优先级应当较高。

### 2. 中高严重度：WhatsApp LID 群组的 SKDM 兼容性风险
- **PR**：[#3008](https://github.com/nanocoai/nanoclaw/pull/3008)
- **状态**：开放
- **是否已有 fix PR**：**有，问题本身已被作为修复 PR 提出**

**问题影响**：  
`cachedGroupMetadata` 传入错误 JID 形态，可能破坏 LID 群组的 sender-key 分发。  
**稳定性结论**：属于真实生产链路 bug，影响消息分发可用性。

### 3. 中等严重度：agent-runner turn 绑定不正确
- **PR**：[#3014](https://github.com/nanocoai/nanoclaw/pull/3014)
- **状态**：开放
- **是否已有 fix PR**：**有**

**问题影响**：  
`hasIdenticalSend` 需要绑定到当前 turn，避免跨轮次误判。  
**稳定性结论**：这是典型的“状态边界”问题，容易引发重复发送/误去重，建议尽快合入并回归测试。

### 4. 已修复：Token footer 统计夸大
- **PR**：[#3000](https://github.com/nanocoai/nanoclaw/pull/3000)
- **状态**：已关闭
- **影响**：修正 Codex footer token 数字使用累计值的问题，改为单轮值优先  
- **结论**：这是已落地的稳定性修复，直接减少误报和数据观感错误。

---

## 5) 功能请求与路线图信号
今日功能信号比较清晰，主要集中在两条主线：

### A. 跨提供方持久记忆
- **[#3012](https://github.com/nanocoai/nanoclaw/pull/3012)** `feat(memory): add provider-agnostic persistent memory`
- **[#3013](https://github.com/nanocoai/nanoclaw/pull/3013)** `feat(codex): load shared memory on session start`

**路线图判断**：  
这非常像下一版本的核心能力之一。它不是单个 provider 的功能修补，而是把“记忆”抽成平台能力，具备明显的长期价值。  
**很可能被纳入下一版本**：高。

### B. 渠道默认值与适配器声明式配置
- **[#3010](https://github.com/nanocoai/nanoclaw/pull/3010)**  
- **[#3011](https://github.com/nanocoai/nanoclaw/pull/3011)**

**路线图判断**：  
这是架构层的标准化工作，目标是降低 core 的 heuristics。  
**很可能被纳入下一版本**：高，且会继续扩展到更多 adapter。

### C. 生产可维护性增强
- **[#3004](https://github.com/nanocoai/nanoclaw/pull/3004)** 上下文预览工具
- **[#3003](https://github.com/nanocoai/nanoclaw/pull/3003)** bounded waits 文档约束
- **[#3002](https://github.com/nanocoai/nanoclaw/pull/3002)** symlink 阻塞告警

**路线图判断**：  
这类需求说明团队正在补“可观测性”和“防误用”能力。虽然不一定是发布主卖点，但对成熟度提升很关键。  
**很可能在近期版本中持续出现**：中高。

---

## 6) 用户反馈摘要
从 Issue/PR 内容中可以提炼出几类真实用户痛点：

### 1. 升级后配置失效且无提示
- **来源**：[#3001](https://github.com/nanocoai/nanoclaw/issues/3001)
- **用户痛点**：老 group 升级后仍运行旧技能副本，更新不生效，但日志不提示。
- **场景**：已经部署过的 agent group，随着 shared-skills 重构后继续使用。
- **情绪倾向**：明显不满意点在于“**静默失败**”，而不是单纯功能缺失。

### 2. 多渠道适配不稳定
- **来源**：[#3008](https://github.com/nanocoai/nanoclaw/pull/3008)、[#3010](https://github.com/nanocoai/nanoclaw/pull/3010)、[#3011](https://github.com/nanocoai/nanoclaw/pull/3011)
- **用户痛点**：不同 channel / adapter 的默认行为不一致，且 WhatsApp 特例较多。
- **场景**：用户在真实消息通道中使用代理人时，最怕“某个边界 case 在某平台上失效”。

### 3. 上下文与记忆的一致性
- **来源**：[#3012](https://github.com/nanocoai/nanoclaw/pull/3012)、[#3013](https://github.com/nanocoai/nanoclaw/pull/3013)、[#3004](https://github.com/nanocoai/nanoclaw/pull/3004)
- **用户痛点**：希望看到“实际 agent 看到的内容”，并在新会话、清空、压缩后保持记忆一致。
- **正向反馈信号**：团队已经开始用 context preview 和 shared memory 去解决这类可解释性问题。

---

## 7) 待处理积压
> 说明：本快照中**没有明显长期沉默很久的旧工单**；但以下条目属于**当前应优先跟进的积压风险点**，因为它们直接关联生产可用性或关键架构演进。

### 优先级最高
- **[#3001](https://github.com/nanocoai/nanoclaw/issues/3001)** 旧 group 共享技能副本失效  
  这是会影响既有部署的高优先级问题，建议确认 **[#3002](https://github.com/nanocoai/nanoclaw/pull/3002)** 的合入状态。

### 需要尽快处理的开放 PR
- **[#3002](https://github.com/nanocoai/nanoclaw/pull/3002)** 容器层对共享 skill symlink 阻塞的告警
- **[#3008](https://github.com/nanocoai/nanoclaw/pull/3008)** WhatsApp LID 群组 SKDM 修复
- **[#3012](https://github.com/nanocoai/nanoclaw/pull/3012)** provider-agnostic persistent memory
- **[#3013](https://github.com/nanocoai/nanoclaw/pull/3013)** Codex 共享记忆启动加载
- **[#3014](https://github.com/nanocoai/nanoclaw/pull/3014)** agent-runner turn 绑定修复

### 维护建议
这些条目都在“**核心体验 + 稳定性**”路径上，建议维护者优先确认：
1. 是否有回归测试覆盖；
2. 是否存在旧部署升级迁移说明；
3. 是否需要在日志/告警层补“静默失败”提示。

---

## 总体结论
NanoClaw 今天展现出明显的**高工程密度推进**：一边在做渠道与记忆系统的架构升级，一边修复时间戳、token 统计、WhatsApp 兼容性等生产级问题。  
从健康度看，项目处于**积极演进且风险可控**的状态；从风险看，当前最需警惕的是**旧配置/旧部署在重构后静默失配**这一类问题。  
如果这些开放 PR 能尽快合并，NanoClaw 下一阶段会更接近一个**跨 provider、跨 channel、上下文一致且可解释**的 AI 智能体基础平台。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

以下为 **NullClaw（github.com/nullclaw/nullclaw）** 的 **2026-07-11 项目动态日报**。  
基于你提供的过去 24 小时 GitHub 数据，项目整体处于 **低活跃、零发版、零合并** 状态，但出现了一条 **高优先级安全/权限隔离类 Bug**，值得重点关注。

---

## 1) 今日速览

过去 24 小时内，NullClaw 的仓库活跃度整体偏低：**Issues 仅更新 1 条，PR 为 0，且没有任何版本发布**。  
从社区互动看，今日没有形成广泛讨论，说明项目当前主要处于“问题暴露、等待响应”的状态，而非功能推进期。  
不过，这 1 条新 Issue 指向的是 **A2A 路由下的跨调用方任务/上下文复用风险**，属于 **安全与隔离性** 问题，优先级明显高于普通缺陷。  
综合判断：**项目健康度在功能侧平稳，但安全侧出现了需要尽快响应的风险信号**。  
- Issue 链接：<https://github.com/nullclaw/nullclaw/issues/974>

---

## 2) 版本发布

**今日无新版本发布。**  
- Releases：无  
- 链接：<https://github.com/nullclaw/nullclaw/releases>

---

## 3) 项目进展

过去 24 小时内 **没有 PR 合并或关闭**，因此项目在功能实现、修复落地、架构演进方面 **没有可量化的代码层推进**。  
- PR 列表：无  
- 链接：<https://github.com/nullclaw/nullclaw/pulls>

从“项目向前迈进多少”的角度看：  
- **功能推进：0**
- **修复落地：0**
- **版本演进：0**

当前唯一的实质性变化来自 Issue 暴露，而不是代码提交。

---

## 4) 社区热点

今日最活跃、也是唯一活跃的讨论点是：

### #974 [OPEN] [BUG] NullClaw shared bearer A2A route allows cross-caller task and context reuse
- 链接：<https://github.com/nullclaw/nullclaw/issues/974>
- 作者：N0zoM1z0
- 评论：0
- 👍：0

**背后诉求分析：**  
该 Issue 描述的是：虽然 `/a2a` 路由受 bearer token 保护，但后续任务与会话权限却依赖 **裸 task id** 和 **用户可传入的 `contextId`**。这意味着只要共享有效 bearer，调用方之间可能发生 **任务历史读取、上下文复用、甚至跨用户数据串扰**。  
从用户诉求看，核心并不是“新功能”，而是希望项目在 **身份鉴别之后继续做严格的授权校验**，避免“认证通过但授权穿透”的问题。  
这是典型的 **多租户/代理执行场景隔离缺陷**，优先级很高。

---

## 5) Bug 与稳定性

今日报告的唯一 Bug，按严重程度排序如下：

### 1. 高严重度：A2A 路由存在跨调用方任务与上下文复用风险
- Issue：<https://github.com/nullclaw/nullclaw/issues/974>
- 状态：OPEN
- 评论：0
- 是否已有 fix PR：**未见**
- 影响面：权限隔离、任务数据安全、会话上下文边界
- 风险判断：**高**

**简要解读：**  
该问题不是单纯的逻辑错误，而是涉及 **bearer 认证之后的授权边界设计**。如果属实，可能导致：
- 读取其他调用方的任务历史
- 复用不应共享的上下文
- downstream 结果被错误串用
- 多租户或共享 token 场景下的数据泄露

**稳定性结论：**  
项目当前没有大规模崩溃或回归信号，但这一条问题足以构成 **安全稳定性警报**，应优先排查。

---

## 6) 功能请求与路线图信号

今日未见新的功能请求型 Issue 或 PR。  
因此，从公开信号上看，**当前没有明确的新功能路线图推进**，仓库焦点更偏向于缺陷与安全性修补。

不过，#974 暗示了一个潜在路线图方向：  
- **更严格的请求级授权校验**
- **task id 与 contextId 的所有权绑定**
- **A2A 场景下会话隔离与审计增强**

如果后续出现相关修复 PR，这类工作大概率会被纳入下一版本的优先修复范围。  
- 相关 Issue：<https://github.com/nullclaw/nullclaw/issues/974>

---

## 7) 用户反馈摘要

从当前 Issue 的内容看，用户反馈主要集中在以下真实痛点：

### 主要痛点
1. **认证与授权脱节**  
   用户并不满足于“请求带 token 就算安全”，更关注 token 之后的资源访问边界是否严格。

2. **上下文串扰风险**  
   在 AI 智能体/个人助手类系统中，`contextId` 一旦可被重用或猜测，就可能出现会话污染和隐私泄露。

3. **任务归属不清晰**  
   裸 task id 如果没有绑定调用方身份，会让任务历史、执行结果和中间状态暴露给其他用户。

### 使用场景指向
- 多用户共享 bearer 的 A2A 调用
- 代理/中间层转发任务
- 需要严格区分不同调用者上下文的企业场景

### 满意/不满意点
- **满意点：** 系统已经具备 bearer 级别的基础保护。
- **不满意点：** 保护层次停留在入口认证，未能覆盖后续资源授权与上下文隔离。

- Issue 链接：<https://github.com/nullclaw/nullclaw/issues/974>

---

## 8) 待处理积压

从提供的数据看，**当前没有长期未响应的旧 Issue 或 PR 被列出**。  
但需要提醒维护者的是：  

### 现有待处理重点
- **#974 仍为 OPEN，且属于高风险安全问题**
- 创建与更新均在 2026-07-10，说明它是 **刚出现但尚未得到处理** 的关键问题
- 目前 **无评论、无反应、无修复 PR**，容易在日常活跃度偏低时被延后

建议优先级：**立即确认复现、评估影响范围、补充授权校验并尽快发布修复**。  
- Issue 链接：<https://github.com/nullclaw/nullclaw/issues/974>

---

### 总体判断

NullClaw 今天的表现是：**代码侧没有新增推进，但安全侧出现了值得警惕的高优先级问题**。  
如果后续 24–48 小时内没有修复 PR 或维护者回应，这条 Issue 可能会成为本阶段最重要的健康度观察点。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-07-11）

## 1) 今日速览
今天 IronClaw 仍处在**高强度开发与稳定性修复并行**的状态：过去 24 小时有 **16 条 Issue 更新**、**50 条 PR 更新**，但**没有新 Release**，说明团队主要精力仍集中在功能打磨与回归收敛，而非发布节奏。  
从内容看，主线非常清晰：**Reborn 运行时韧性、Slack 生命周期、扩展状态准确性、模型/工具失败可恢复性**，都在密集推进。  
整体健康度判断：**研发活跃度高，工程投入强，但稳定性债务仍然明显**；当前更像是“持续硬化期”，而不是“稳定发布期”。  
项目链接：<https://github.com/nearai/ironclaw>

---

## 3) 项目进展
今天最重要的进展，是多个围绕 Reborn 与平台韧性的 PR 进入收束，体现出项目正在从“能跑”向“更稳、更可恢复”推进。

- **修复 Reborn 启动崩溃循环**：PR **#5967** 关闭了由过期 manifest 引发的 boot crash-loop，避免单租户部署在启动阶段直接挂死。  
  链接：<https://github.com/nearai/ironclaw/pull/5967>

- **提升 loop 迭代上限**：PR **#5960** 将默认 iteration ceiling 从 32 提升到 256，减少长工具链任务被过早 fail-close 的概率。  
  链接：<https://github.com/nearai/ironclaw/pull/5960>

- **失败原因分类体系继续完善**：PR **#5954** 建立了 RunFailureReason funnel 的基础，为后续统一失败分类、可恢复处理奠定架构。  
  链接：<https://github.com/nearai/ironclaw/pull/5954>

- **成功工具观察可持久化**：PR **#5939** 让模型可见的成功结果在 replay 场景中保留，更利于后续推理与回放一致性。  
  链接：<https://github.com/nearai/ironclaw/pull/5939>

- **失败解释限定为 reply-only**：PR **#5942** 收紧 failure explanation 的 capability view，减少不必要的工具暴露。  
  链接：<https://github.com/nearai/ironclaw/pull/5942>

- **Slack 生命周期与工具恢复继续补洞**：PR **#5957** 针对 Slack removal、OAuth activation、stale tool recovery 做收尾，说明 Slack 仍是当前高频修复面。  
  链接：<https://github.com/nearai/ironclaw/pull/5957>

- **Canary 轮转进入更稳定的 cron 体系**：PR **#5949** 关闭，表明 QA canary 已更好地纳入持续验证流程。  
  链接：<https://github.com/nearai/ironclaw/pull/5949>

**整体判断**：今天至少有一批关键 PR 收束，主线不再只是功能扩张，而是明显转向**运行时韧性、错误可见性、Slack/扩展生态一致性**。  
PR 汇总页：<https://github.com/nearai/ironclaw/pulls>

---

## 4) 社区热点
### 最活跃 Issue：GitHub 扩展状态误报
- **#5948** 是今日讨论最活跃的 Issue（已知评论数 **5**），核心诉求是：扩展实际上只是 **INSTALLED**，但助手却误报为“已激活/已配置”。这类问题直接影响用户对系统可信度的判断。  
  链接：<https://github.com/nearai/ironclaw/issues/5948>

### 集中讨论热点：Slack 相关 bug bash
今天的讨论重心明显聚集在 **Slack 发送、路由、撤回、生命周期** 上，相关 Issue 包括：
- **#5943** Slack DM 实际发到了当前频道，而不是私信  
  <https://github.com/nearai/ironclaw/issues/5943>
- **#5944** 表面提示“已发送到 Slack DM”，但消息实际上没有到达  
  <https://github.com/nearai/ironclaw/issues/5944>
- **#5945** 长流程多工具执行后报“model provider was unavailable”  
  <https://github.com/nearai/ironclaw/issues/5945>
- **#5946** 在确认目标 trigger 不可用之前就先改写了 Google Sheet  
  <https://github.com/nearai/ironclaw/issues/5946>

**背后的诉求**很一致：用户希望系统在外部动作上做到**真实可达、状态可证、失败可解释**，而不是“界面成功、实际失败”。

---

## 5) Bug 与稳定性
以下按严重程度排序：

### P0 / 高危
1. **启动崩溃循环**：**#5966**  
   Hosted single-tenant 部署在启动时因 stale manifest 导致 catalog load 失败，直接 crash-loop。  
   **已有修复 PR**：#5967  
   链接：<https://github.com/nearai/ironclaw/issues/5966>  
   修复 PR：<https://github.com/nearai/ironclaw/pull/5967>

2. **Slack DM 路由/送达错误**：**#5943、#5944**  
   一个是发到频道而不是 DM，一个是提示成功但实际未送达，属于高可信度外部动作缺陷。  
   **相关修复 PR**：#5957（生命周期/路由收尾）  
   链接：<https://github.com/nearai/ironclaw/issues/5943>  
   链接：<https://github.com/nearai/ironclaw/issues/5944>  
   相关 PR：<https://github.com/nearai/ironclaw/pull/5957>

3. **长多工具执行后异常失败**：**#5945**  
   多轮工具调用后返回非常泛化的 provider unavailable / model unavailable 错误，表现为“运行被消耗完但没有可操作反馈”。  
   **相关韧性 PR**：#5959、#5954  
   链接：<https://github.com/nearai/ironclaw/issues/5945>  
   PR：<https://github.com/nearai/ironclaw/pull/5959>  
   PR：<https://github.com/nearai/ironclaw/pull/5954>

### P1 / 中高风险
4. **多步子代理/mission 停滞或触发 tool-call limit**：**#5955**  
   典型症状是复杂任务推进中断，属于 agent orchestration 稳定性问题。  
   **相关缓解 PR**：#5960、#5959  
   链接：<https://github.com/nearai/ironclaw/issues/5955>  
   PR：<https://github.com/nearai/ironclaw/pull/5960>

5. **通用 ExternalChannel 扩展卸载时断连逻辑错误**：**#5953**  
   不仅 Slack，其他外部频道型扩展也可能受影响。  
   **相关修复 PR**：#5957  
   链接：<https://github.com/nearai/ironclaw/issues/5953>  
   PR：<https://github.com/nearai/ironclaw/pull/5957>

### P2 / 中风险
6. **扩展状态误报**：**#5948**  
   “已安装”被误说成“已激活/已配置”，属于状态机准确性问题。  
   **已有修复 PR**：#5952  
   链接：<https://github.com/nearai/ironclaw/issues/5948>  
   PR：<https://github.com/nearai/ironclaw/pull/5952>

7. **HTTP 工具对无 MCP 支持第三方服务失败**：**#5968**  
   反映出通用外联能力不足，尤其在 Attio 这类服务场景下。  
   链接：<https://github.com/nearai/ironclaw/issues/5968>

8. **opencode 默认模型列表缺少 GLM-5.2**：**#5969**  
   更偏配置/可发现性问题，但会直接影响用户开箱即用体验。  
   链接：<https://github.com/nearai/ironclaw/issues/5969>

---

## 6) 功能请求与路线图信号
今天的 Issue/PR 组合，已经能看出下一阶段路线图的几个方向：

- **MCP 注册与权限分层**会继续推进：PR **#5970** 的“per-user MCP registration store”说明团队在补齐更精细的安装者/用户级状态管理。  
  链接：<https://github.com/nearai/ironclaw/pull/5970>

- **忙线程消息调度与预算控制**是明显的下一个阶段：PR **#5963**、**#5964** 分别涉及 queued-message steering 和 budget approval as blocked gate。  
  链接：<https://github.com/nearai/ironclaw/pull/5963>  
  链接：<https://github.com/nearai/ironclaw/pull/5964>

- **模型失败恢复能力**是高优先级主线：PR **#5965**、**#5959** 都在做“让错误可恢复、可见、可分类”。  
  链接：<https://github.com/nearai/ironclaw/pull/5965>  
  链接：<https://github.com/nearai/ironclaw/pull/5959>

- **Reborn UI 一致性与组件统一**仍在持续：PR **#5938**、**#5940** 指向 dropdown / SelectMenu 的统一化，说明体验层面也在收敛。  
  链接：<https://github.com/nearai/ironclaw/pull/5938>  
  链接：<https://github.com/nearai/ironclaw/pull/5940>

**对下一版本的判断**：若这些 PR 评审顺利，下一波版本很可能包含  
1) 更稳的运行时恢复，  
2) 更准确的扩展状态与生命周期，  
3) 更完整的 MCP/外联能力，  
4) 更一致的 Reborn UI。

---

## 7) 用户反馈摘要
从今天的 Issues 看，真实用户痛点非常具体，且多集中在“**系统说了什么**”与“**系统实际做了什么**”不一致：

- 用户不接受“**看起来已激活，实际只是安装**”这种状态误导。  
  代表问题：#5948  
  链接：<https://github.com/nearai/ironclaw/issues/5948>

- 用户强烈依赖 **Slack** 作为交付与通知通道，因此“发错地方”“没发出去但系统说成功”会被视为严重可靠性问题。  
  代表问题：#5943、#5944  
  链接：<https://github.com/nearai/ironclaw/issues/5943>  
  链接：<https://github.com/nearai/ironclaw/issues/5944>

- 用户在做自动化时，希望系统**先确认条件可用，再执行副作用操作**。  
  代表问题：#5946（先改 Sheet，后发现 trigger 不可用）  
  链接：<https://github.com/nearai/ironclaw/issues/5946>

- 用户在复杂 agent 工作流里追求的是“**任务推进**”，不是“任务卡死后泛化报错”。  
  代表问题：#5945、#5955  
  链接：<https://github.com/nearai/ironclaw/issues/5945>  
  链接：<https://github.com/nearai/ironclaw/issues/5955>

- 用户还有明确的集成需求：**opencode 默认模型可见性**、**第三方 HTTP 外联**、**Google Sheets 自动化**、**投资笔记多子代理拆解**。  
  代表问题：#5969、#5968、#5946、#5955  
  链接：<https://github.com/nearai/ironclaw/issues/5969>  
  链接：<https://github.com/nearai/ironclaw/issues/5968>  
  链接：<https://github.com/nearai/ironclaw/issues/5946>  
  链接：<https://github.com/nearai/ironclaw/issues/5955>

---

## 8) 待处理积压
以下是当前仍开放、且影响面较大的积压项，建议维护者优先盯审：

- **#5970** per-user MCP registration store，属于架构级能力，后续会影响安装/注册/权限边界。  
  <https://github.com/nearai/ironclaw/pull/5970>

- **#5959** Reborn loop resilience，覆盖深层可用性重试、迭代 backstop、工具失败原因可见化。  
  <https://github.com/nearai/ironclaw/pull/5959>

- **#5965** recoverable errors reach the model，属于“让模型知道发生了什么”的关键底座。  
  <https://github.com/nearai/ironclaw/pull/5965>

- **#5964 / #5963** 预算门控与 busy thread steering，和真实多人多任务场景强相关。  
  <https://github.com/nearai/ironclaw/pull/5964>  
  <https://github.com/nearai/ironclaw/pull/5963>

- **#5957** Slack 生命周期与 stale tool recovery，仍是高频用户路径上的关键修复面。  
  <https://github.com/nearai/ironclaw/pull/5957>

- **#5941** 覆盖率相关 CI 回归修复，影响持续交付稳定性。  
  <https://github.com/nearai/ironclaw/pull/5941>

**提醒**：虽然这些 PR 多数尚无评论记录，但它们都属于“高影响、跨模块、容易连锁出错”的类型，值得尽快完成评审与合流。

--- 

如果你希望，我可以把这份日报进一步整理成：
1. **适合老板/管理层阅读的一页版**，或  
2. **适合研发周会的表格版（含风险等级与优先级）**。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

以下为 **2026-07-11 / LobsterAI** 项目动态日报（基于过去 24 小时 GitHub 数据）：

---

## 1. 今日速览

过去 24 小时内，LobsterAI 处于**“高合并、低讨论、无发布”**的状态：没有新增或活跃 Issues，也没有新版本发布，但有 **8 个 PR 完成关闭/合并**，说明团队主要精力集中在功能修复、兼容性补丁和发布收尾上。  
从变更分布看，更新覆盖了 **renderer、cowork、main、openclaw、docs、build、artifacts** 等多个模块，属于一次较典型的**跨模块稳定性整固**。  
整体活跃度判断为：**中等偏高，但偏工程推进而非社区讨论**。  
项目健康度方面，当前没有暴露新的问题积压，且合并内容以修复类为主，说明主线正在持续收敛和稳定化。

参考仓库：  
- [netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)

---

## 3. 项目进展

今日最重要的推进来自以下已关闭 PR，整体上推动了 **发布收口、协作流程稳定、IM/定时任务兼容、内存索引迁移、交互体验修复** 等方向：

1. **发布收尾与版本打包**
   - [#2317 Release/2026.7.8](https://github.com/netease-youdao/LobsterAI/pull/2317)  
   涉及 `renderer / build / docs / main / openclaw / cowork / im / artifacts` 多模块，明显是一次发布相关的总集成 PR，说明项目在做版本归档与交付准备。

2. **交互体验修复：Windows 标题栏 Logo 压缩问题**
   - [#2316 fix(renderer): prevent Windows title bar logo compression](https://github.com/netease-youdao/LobsterAI/pull/2316)  
   修复侧边栏折叠后更新徽标场景下的 Logo 拉伸/压缩问题，并保持 macOS 行为一致，体现了对跨平台 UI 一致性的维护。

3. **协作流程修复：队列化 follow-up 连接**
   - [#2315 fix(cowork): connect queued follow-up coordinator](https://github.com/netease-youdao/LobsterAI/pull/2315)  
   解决跨会话和最小化状态下 queued follow-up 的处理问题，增强协作任务在复杂生命周期中的连续性。

4. **IM 定时任务兼容修复：保留群 ID 大小写**
   - [#2314 fix(scheduled-task): preserve WeCom and DingTalk group ID casing](https://github.com/netease-youdao/LobsterAI/pull/2314)  
   这是一个较关键的兼容性修补：修复企微/钉钉群聊 ID 被错误小写化的问题，并补足历史定时任务兼容逻辑，降低定时投递误报风险。

5. **协作队列修复：仅提交选中的 queued steer**
   - [#2313 fix(cowork): submit only the selected queued steer](https://github.com/netease-youdao/LobsterAI/pull/2313)  
   强化 FIFO 处理逻辑并补回归测试，说明协作编排仍在持续打磨。

6. **状态恢复修复：askuser 最小化状态丢失**
   - [#2312 fix: askuser minimize state loss](https://github.com/netease-youdao/LobsterAI/pull/2312)  
   解决窗口最小化过程中的状态丢失，属于直接影响用户使用连续性的修复。

7. **内存索引迁移：所有 agent 的 FTS-only 索引迁移**
   - [#2311 fix(memory): migrate fts-only indexes for all agents](https://github.com/netease-youdao/LobsterAI/pull/2311)  
   这是偏底层的数据/索引维护工作，说明项目在处理历史数据一致性和迁移可靠性。

8. **功能增强：协作支持文件夹上下文附件**
   - [#2310 feat(cowork): add folder context attachments](https://github.com/netease-youdao/LobsterAI/pull/2310)  
   新增文件夹作为可移除 prompt 附件，并以路径上下文方式发送给 OpenClaw，属于较实用的输入上下文增强。

**整体向前迈进的幅度：**  
- 从“数量”看：24 小时内关闭 8 个 PR，交付节奏很快。  
- 从“质量”看：多数变更都在修复稳定性、兼容性和协作流程问题，说明项目正在从功能扩张转向**可用性与可靠性收敛**。  
- 从“范围”看：覆盖前端渲染、协作引擎、OpenClaw、IM、构建发布链路，属于一次**全链路健康检查式推进**。

---

## 4. 社区热点

**结论：今日几乎没有明显社区热点。**  
- Issues 数量为 0，没有新增/活跃讨论。  
- 所有 PR 的评论数与反应数均未显示活跃增长，当前也没有明显的“高讨论、高互动”对象。

从现有 PR 内容看，最接近用户关切的热点主要集中在以下几类，但更多体现为“问题修复需求”而非社区公开讨论：

- [#2314](https://github.com/netease-youdao/LobsterAI/pull/2314)：IM 群任务投递兼容性，反映用户对**定时消息可靠送达**的强依赖。  
- [#2310](https://github.com/netease-youdao/LobsterAI/pull/2310)：文件夹上下文附件，反映用户希望更方便地把本地资料纳入协作上下文。  
- [#2315](https://github.com/netease-youdao/LobsterAI/pull/2315) / [#2313](https://github.com/netease-youdao/LobsterAI/pull/2313)：说明协作队列和 follow-up 流程是当前最需要稳定的工作流之一。

---

## 5. Bug 与稳定性

今日没有新的 Issues，因此**没有新增公开 Bug 报告**；但从已关闭 PR 可以看出，项目正在积极修复一些潜在稳定性问题。按影响优先级梳理如下：

### 高优先级
1. **IM 定时任务兼容问题：群 ID 大小写错误**
   - [#2314 fix(scheduled-task): preserve WeCom and DingTalk group ID casing](https://github.com/netease-youdao/LobsterAI/pull/2314)  
   影响定时投递准确性，属于功能正确性问题。  
   **状态：已有 fix PR。**

2. **Memory 索引迁移不完整/不一致**
   - [#2311 fix(memory): migrate fts-only indexes for all agents](https://github.com/netease-youdao/LobsterAI/pull/2311)  
   涉及 agent 的索引一致性，可能影响检索/记忆能力。  
   **状态：已有 fix PR。**

### 中优先级
3. **协作队列/最小化状态丢失**
   - [#2315 fix(cowork): connect queued follow-up coordinator](https://github.com/netease-youdao/LobsterAI/pull/2315)
   - [#2312 fix: askuser minimize state loss](https://github.com/netease-youdao/LobsterAI/pull/2312)  
   影响多轮交互和后台运行体验，偏流程稳定性问题。  
   **状态：已有 fix PR。**

### 低优先级
4. **Windows 标题栏 Logo 显示异常**
   - [#2316 fix(renderer): prevent Windows title bar logo compression](https://github.com/netease-youdao/LobsterAI/pull/2316)  
   属于 UI 细节问题，影响体验但不影响核心功能。  
   **状态：已有 fix PR。**

> 总体来看，今日没有新增崩溃/严重故障公开暴露，稳定性问题主要已通过 PR 修复或收敛。

---

## 6. 功能请求与路线图信号

今日没有新 Issues，因此没有新增公开的功能请求，但从 PR 中可以识别出若干**“已被验证的需求信号”**，很可能进入下一版本或持续迭代：

1. **文件夹上下文附件**
   - [#2310](https://github.com/netease-youdao/LobsterAI/pull/2310)  
   说明用户需要更高效地把本地目录作为上下文输入，而不是逐个上传文件。  
   **路线图信号：强。** 属于实用性较强的协作增强特性。

2. **队列化协作 follow-up / steer 流程**
   - [#2315](https://github.com/netease-youdao/LobsterAI/pull/2315)
   - [#2313](https://github.com/netease-youdao/LobsterAI/pull/2313)  
   说明协作任务编排、排队、恢复、最小化状态保持是当前产品体验的重要方向。  
   **路线图信号：强。** 可能继续延伸到更完整的多会话协作管理。

3. **IM/定时任务可靠性**
   - [#2314](https://github.com/netease-youdao/LobsterAI/pull/2314)  
   说明企业 IM 场景下的定时投递可靠性仍是重点。  
   **路线图信号：中到强。** 可能继续补充更多通道兼容与投递可观测性。

4. **记忆/检索索引维护自动化**
   - [#2311](https://github.com/netease-youdao/LobsterAI/pull/2311)  
   说明项目已在重视底层检索质量和升级后的数据一致性。  
   **路线图信号：中。** 后续可能补充更完善的迁移检测与修复机制。

---

## 7. 用户反馈摘要

由于今日没有新增 Issues，也没有可见的活跃评论流，本日**缺少直接的用户反馈文本**。但从已关闭 PR 的修复方向，仍可提炼出几个真实用户痛点：

1. **用户希望协作流程不中断**
   - 来源：[#2315](https://github.com/netease-youdao/LobsterAI/pull/2315)、[#2313](https://github.com/netease-youdao/LobsterAI/pull/2313)  
   痛点：跨会话、最小化、队列切换时任务容易丢失或处理不正确。  
   说明用户对“正在进行的协作任务”连续性非常敏感。

2. **用户希望定时消息/群任务可靠送达**
   - 来源：[#2314](https://github.com/netease-youdao/LobsterAI/pull/2314)  
   痛点：群 ID 规范化或通道差异会直接影响投递结果，且可能导致误报成功。  
   说明企业 IM 场景对可追踪性和准确性要求较高。

3. **用户希望更自然地引入本地文件夹上下文**
   - 来源：[#2310](https://github.com/netease-youdao/LobsterAI/pull/2310)  
   痛点：仅支持单文件上下文不够高效，目录级上下文更贴近实际工作流。  
   说明用户在知识工作场景下偏好“批量、目录化”的输入方式。

4. **用户对跨平台体验细节敏感**
   - 来源：[#2316](https://github.com/netease-youdao/LobsterAI/pull/2316)  
   痛点：标题栏图标显示异常虽然不致命，但会影响整体专业感。  
   说明项目用户对桌面端完成度有较高期待。

---

## 8. 待处理积压

**结论：今日没有明显的公开积压风险。**  
- Issues：0 条，无待响应问题。  
- PR：8 条均已关闭/合并，暂无待处理 PR 堆积。

不过，从维护视角仍有两类值得持续关注的“隐性积压”：

1. **跨模块修复是否需要后续回归验证**
   - 相关 PR：[#2314](https://github.com/netease-youdao/LobsterAI/pull/2314)、[#2311](https://github.com/netease-youdao/LobsterAI/pull/2311)  
   这类涉及数据/兼容迁移的修复通常需要观察后续运行数据，防止出现“修了一个点，漏了一个历史边角”。

2. **协作链路的连续性问题是否还有残留**
   - 相关 PR：[#2315](https://github.com/netease-youdao/LobsterAI/pull/2315)、[#2313](https://github.com/netease-youdao/LobsterAI/pull/2312)  
   多轮协作、最小化恢复、队列调度属于高频场景，建议继续监控是否还有状态同步遗漏。

如果从“公开积压”角度给结论：**当前仓库健康度良好，暂无明显堆积。**

---

如需，我可以进一步把这份日报整理成：
1. **更适合发邮件/飞书的简版**，或  
2. **适合管理层阅读的 KPI 风格周报模板**。

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

# CoPaw（QwenPaw）项目动态日报  
**日期：2026-07-11**  
**统计窗口：过去 24 小时**

---

## 1) 今日速览

过去 24 小时，项目保持高强度活跃：**Issues 更新 17 条**（15 条新开/活跃、2 条关闭），**PR 更新 19 条**（7 条待合并、12 条已合并/关闭），并且**发布了 3 个版本**。这表明团队正处于 **v2.0 发布后的集中收尾与稳定化阶段**，交付节奏很快。  
从内容看，今天的工作重心主要落在 **核心架构升级、发布后回归修复、Windows 兼容性、MCP 权限控制、记忆链路与工具输出处理** 这几条线上。整体健康度可以评价为：**活跃度高、推进快，但稳定性压力也明显上升**。  
相关总览：  
- Issues 总览：<https://github.com/agentscope-ai/QwenPaw/issues>  
- PR 总览：<https://github.com/agentscope-ai/QwenPaw/pulls>  
- Releases 总览：<https://github.com/agentscope-ai/QwenPaw/releases>

---

## 2) 版本发布

### v2.0.0（Stable）
Release notes 片段显示，本次稳定版的核心是 **Runtime 2.0**：基于 **AgentScope 2.0** 对内核进行了重构，属于项目级架构升级。  
这类升级通常意味着运行时、工具链、记忆/会话链路、配置与兼容性都会发生较大变化；结合今天集中出现的升级后问题，**应视为潜在破坏性版本**。  
**迁移建议：**
1. 升级前备份 `config`、工作区与记忆数据。  
2. 优先在 Windows、MCP、记忆、沙箱等关键路径上做回归验证。  
3. 关注升级指南需求，当前社区已经明确提出“希望提供升级指南”。  
4. 如果使用自动记忆、长工具输出、局部禁用 MCP 工具，升级后应重点验证行为是否符合预期。  
- Release 链接：<https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.0.0>  
- 相关问题：<https://github.com/agentscope-ai/QwenPaw/issues/5948>（升级指南诉求）

### v2.0.0-beta.7
本次 beta.7 主要包含两类变化：  
- **网站首页文案与视觉更新**，突出 QwenPaw 2.0 的新能力；  
- **ReMe summarize 任务补传 session_id**，修复记忆归因问题。  
这说明团队在 beta 阶段已经开始修复“发布后体验”和“记忆一致性”问题。  
- Release 链接：<https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.0.0-beta.7>  
- 对应 PR：<https://github.com/agentscope-ai/QwenPaw/pull/5940>、<https://github.com/agentscope-ai/QwenPaw/pull/5938>

### v2.0.0-beta.6
beta.6 更偏向稳定性与基础回归：  
- 增加了 **channels 模块单测**；  
- 执行了 **版本号 bump**；  
- 修复了 **tool result error state 透传** 之类的底层边界问题。  
这表明团队在正式版前已经持续做“可发布性”修补。  
- Release 链接：<https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.0.0-beta.6>  
- 对应 PR：<https://github.com/agentscope-ai/QwenPaw/pull/5812>、<https://github.com/agentscope-ai/QwenPaw/pull/5915>

---

## 3) 项目进展

今天合并/关闭的 PR 共 **12 个**，占 PR 更新量的 **63%**，说明代码与文档收敛速度较快。比较重要的推进点如下：

1. **记忆链路修复：补齐 session_id 透传**  
   `fix(memory): propagate session_id into ReMe summarize tasks` 修复了自动记忆任务中 session 归因缺失的问题，对历史摘要与会话一致性很关键。  
   - PR：<https://github.com/agentscope-ai/QwenPaw/pull/5938>  
   - 关联 Issue：<https://github.com/agentscope-ai/QwenPaw/issues/5950>（同属记忆链路问题集合）

2. **聊天/工具结果错误态展示优化**  
   `feat(chat): handle error state in ToolCardShell component` 改善了工具执行失败时的 UI 反馈，降低“失败但看不懂”的使用成本。  
   - PR：<https://github.com/agentscope-ai/QwenPaw/pull/5928>

3. **时间注入机制调整，移除冗余工具**  
   `fix: per-message current time injection, drop get_current_time tool` 让每条消息使用更新鲜的时间上下文，同时删除不再需要的工具，属于模型上下文与工具设计的结构性优化。  
   - PR：<https://github.com/agentscope-ai/QwenPaw/pull/5923>

4. **官网与文档更新，强化 2.0 传播与可用性**  
   - 首页视觉与文案更新：<https://github.com/agentscope-ai/QwenPaw/pull/5940>  
   - 2.0 文档更新：<https://github.com/agentscope-ai/QwenPaw/pull/5932>  
   - 新闻格式微调：<https://github.com/agentscope-ai/QwenPaw/pull/5937>  
   这些改动虽然不直接影响核心运行，但对版本切换、用户理解和传播很重要。

5. **插件市场兼容标签覆盖**  
   `fix(console): cover plugin market compatibility labels` 提升了兼容信息的可信度，减少插件选择成本。  
   - PR：<https://github.com/agentscope-ai/QwenPaw/pull/5926>

6. **工具结果截断/历史回放相关工作继续推进**  
   当前已有两条重要修复线在推进：  
   - `fix: use standard truncation hint for scroll-capped tool results`：<https://github.com/agentscope-ai/QwenPaw/pull/5953>  
   - `refactor(tool_calls): unify tool-result capping into ToolResultPruningMiddleware`：<https://github.com/agentscope-ai/QwenPaw/pull/5935>  
   这说明项目正在把“长输出治理”从临时补丁推进为统一中间件方案。

整体看，今天的 PR 收敛不只是“修 bug”，还包括 **记忆、上下文、UI、文档、官网、工具链与发布工程** 的同步推进，说明项目已经进入 **2.0 发布后的工程整固期**。  
- PR 总览：<https://github.com/agentscope-ai/QwenPaw/pulls>

---

## 4) 社区热点

今天社区讨论最集中的问题，基本都与 **升级后回归、权限失效、记忆/上下文异常** 有关。

### 热点 1：Windows 桌面壳沙箱异常严重
- **Issue #5951**：<https://github.com/agentscope-ai/QwenPaw/issues/5951>  
  评论数最高（5 条），问题描述为：`execute_shell_command` 触发 pwsh 递归爆炸、内存飙到 20GB，且沙箱无法关闭，用户甚至被迫回退到旧版。  
  **诉求本质**：安全沙箱不能成为新的不可控风险，且必须提供关闭/回退手段。

### 热点 2：MCP 子工具允许/拒绝策略失效
- **Issue #5947**：<https://github.com/agentscope-ai/QwenPaw/issues/5947>  
  4 条评论，用户明确指出在 v2.0.0 中禁用某些子工具后，agent 仍然可以调用。  
  **诉求本质**：权限控制必须实时生效，不能出现“界面上禁了、实际还可调用”的错配。

### 热点 3：中文记忆文件导致 embedding 400 错误
- **Issue #5950**：<https://github.com/agentscope-ai/QwenPaw/issues/5950>  
  2 条评论，用户指出中文内容在重建索引时出现长度超限，根因是按字符数而非 token 数截断。  
  **诉求本质**：对中文和本地 embedding 场景的真实支持不足，属于模型适配层问题。

### 热点 4：长工具输出与 recall_history 的交互困惑
- **Issue #5946**：<https://github.com/agentscope-ai/QwenPaw/issues/5946>  
  2 条评论，系统提示“Full output preserved durably” 后，agent 误以为内容已出上下文而进行无效 recall_history。  
  **诉求本质**：上下文保留提示语与 agent 行为不一致，容易诱发无效工具调用。

### 其他关注点
- **升级错误提示**：<https://github.com/agentscope-ai/QwenPaw/issues/5954>  
- **自动记忆模块缺失**：<https://github.com/agentscope-ai/QwenPaw/issues/5952>  
- **Windows 本地 file URI 兼容性**：<https://github.com/agentscope-ai/QwenPaw/issues/5934>  

总体上，热点几乎全部围绕 **v2.0 升级后的稳定性与兼容性**，说明用户当前最关心的不是新功能宣传，而是“升级后能不能稳用”。

---

## 5) Bug 与稳定性

按严重程度排序如下：

### 1. 桌面壳沙箱递归爆炸，导致内存飙升到 20GB
- **Issue #5951**：<https://github.com/agentscope-ai/QwenPaw/issues/5951>  
- 严重性：**极高**，可直接导致系统失控、用户回退版本。  
- 状态：**暂无对应 fix PR**。  
- 影响面：Windows 桌面壳、shell 执行链路、沙箱控制。

### 2. MCP 工具允许/拒绝策略失效
- **Issue #5947**：<https://github.com/agentscope-ai/QwenPaw/issues/5947>  
- 严重性：**高**，涉及权限控制失真。  
- 对应修复 PR：**有**，`#5949`  
  - PR：<https://github.com/agentscope-ai/QwenPaw/pull/5949>  
- 关注点：修复是否能做到“立即生效”，避免策略延迟。

### 3. 中文记忆文件触发 embedding 400 错误
- **Issue #5950**：<https://github.com/agentscope-ai/QwenPaw/issues/5950>  
- 严重性：**高**，影响中文用户的自动记忆/索引能力。  
- 状态：**暂无对应 fix PR**。  
- 根因特征：截断逻辑按字符数而不是 token 数。

### 4. 长工具输出引发无效 recall_history
- **Issue #5946**：<https://github.com/agentscope-ai/QwenPaw/issues/5946>  
- 严重性：**中高**，虽不一定崩溃，但会造成 agent 行为异常、浪费上下文。  
- 对应修复 PR：**有**，`#5953`  
  - PR：<https://github.com/agentscope-ai/QwenPaw/pull/5953>  

### 5. 自动记忆任务报缺失模块
- **Issue #5952**：<https://github.com/agentscope-ai/QwenPaw/issues/5952>  
- 严重性：**中高**，会导致 memory summarize 全线失效。  
- 状态：**暂无对应 fix PR**。  

### 6. Windows file URI 在历史回放中被改坏
- **Issue #5934**：<https://github.com/agentscope-ai/QwenPaw/issues/5934>  
- 严重性：**中**，影响 Windows 本地媒体引用回放。  
- 状态：**暂无直接对应 fix PR**。  

### 7. Scroll mode 下 ToolResultLimiter 不可用
- **Issue #5929**：<https://github.com/agentscope-ai/QwenPaw/issues/5929>  
- 严重性：**中**，属于产品体验和工具治理问题。  
- 对应修复 PR：**有**，`#5953`  
  - PR：<https://github.com/agentscope-ai/QwenPaw/pull/5953>  

### 8. 其他兼容性问题
- **GBK/中文 Windows 编码兼容**：<https://github.com/agentscope-ai/QwenPaw/pull/5927>（open PR）  
  这条未必对应上面某个具体 issue，但能看出 Windows 兼容问题仍在持续补洞。

结论：今天暴露的问题不是单点 bug，而是 **v2.0 的稳定性、权限一致性、中文/Windows 兼容、长输出治理** 同时承压。  
- Issue 总览：<https://github.com/agentscope-ai/QwenPaw/issues>  
- 对应修复 PR：<https://github.com/agentscope-ai/QwenPaw/pull/5949>、<https://github.com/agentscope-ai/QwenPaw/pull/5953>

---

## 6) 功能请求与路线图信号

今天的新需求与设计提案，已经能看出下一阶段路线图的轮廓：

### 可能进入下一版本的方向

1. **会话分组 + 导入导出**
- **Issue #5943**：<https://github.com/agentscope-ai/QwenPaw/issues/5943>  
- 信号：这是明显的 console 信息管理需求，属于高频生产力功能，较可能进入下一轮版本规划。

2. **全局运行配置**
- **Issue #5919**：<https://github.com/agentscope-ai/QwenPaw/issues/5919>  
- 信号：用户希望避免每个智能体重复配置，说明“配置治理”已成为实际痛点。

3. **LaTeX/KaTeX 渲染**
- **Issue #5921**：<https://github.com/agentscope-ai/QwenPaw/issues/5921>  
- 信号：更偏知识工作与学术场景增强，若目标用户群继续扩展，这项需求优先级会提升。

4. **SSE 返回结构化 run outcome，服务 API 自动化**
- **PR #5930**：<https://github.com/agentscope-ai/QwenPaw/pull/5930>  
- 信号：面向外部系统集成，说明项目正在向“可编排、可自动化”的 Agent OS 方向演进。

5. **观测性增强：追踪 user/session/version**
- **PR #5922**：<https://github.com/agentscope-ai/QwenPaw/pull/5922>  
- 信号：这类能力通常进入中后期产品化阶段，尤其适合企业/团队落地。

6. **Windows 沙箱与工具结果治理**
- **PR #5931**：<https://github.com/agentscope-ai/QwenPaw/pull/5931>  
- **PR #5935**：<https://github.com/agentscope-ai/QwenPaw/pull/5935>  
- 信号：属于安全和稳定性主线，优先级通常会被前置。

综合判断，下一版本最可能优先吸收的方向是：  
**“会话管理 + 可观测性 + Windows/安全稳定性修复 + 自动化接口增强”**。  
- 路线图信号入口：<https://github.com/agentscope-ai/QwenPaw/issues>、<https://github.com/agentscope-ai/QwenPaw/pulls>

---

## 7) 用户反馈摘要

从今天的评论与问题描述里，可以提炼出几类非常真实的用户痛点：

1. **升级后必须有清晰迁移路径**
- 用户直接询问升级破坏性变更、历史消息/日志/记忆是否兼容。  
- 相关链接：<https://github.com/agentscope-ai/QwenPaw/issues/5948>  
- 反馈含义：用户愿意升级，但前提是“可预期、可回退、可验证”。

2. **安全机制不能变成不可控风险**
- “沙箱无法关闭”“pwsh 递归爆炸”“必须回退旧版”说明一旦安全策略实现不稳，用户会立即失去信任。  
- 相关链接：<https://github.com/agentscope-ai/QwenPaw/issues/5951>

3. **Windows 生态兼容性仍是关键门槛**
- file URI、GBK、pwsh、桌面壳等问题反复出现。  
- 相关链接：<https://github.com/agentscope-ai/QwenPaw/issues/5934>、<https://github.com/agentscope-ai/QwenPaw/pull/5927>

4. **中文与本地模型场景需要更精细的 token 级治理**
- 记忆文件、embedding、截断策略都暴露出“按字符处理”与“按 token 处理”的差异。  
- 相关链接：<https://github.com/agentscope-ai/QwenPaw/issues/5950>

5. **长输出不只是展示问题，而是 agent 行为问题**
- 用户并不只在乎“页面显示省略”，更在乎 agent 是否会据此做出错误工具调用。  
- 相关链接：<https://github.com/agentscope-ai/QwenPaw/issues/5946>

6. **配置管理需要从“手动改文件”走向“产品化”**
- 用户明确希望提供全局配置能力，说明当前配置体验偏工程化，不够友好。  
- 相关链接：<https://github.com/agentscope-ai/QwenPaw/issues/5919>

总体上，用户反馈的核心是：  
**“我要的是稳定、可迁移、可控、对中文/Windows 友好、对自动化场景可靠”**。  
- 反馈入口：<https://github.com/agentscope-ai/QwenPaw/issues>

---

## 8) 待处理积压

由于这是 24 小时快照，严格意义上的“长期未响应”需要更长时间维度才能确认；不过从当前状态看，以下高优先级项仍然值得维护者优先盯住：

### 高优先级未解决 Issues
- **#5951 桌面壳沙箱递归爆炸**：<https://github.com/agentscope-ai/QwenPaw/issues/5951>  
- **#5950 中文记忆文件 embedding 400**：<https://github.com/agentscope-ai/QwenPaw/issues/5950>  
- **#5952 auto-memory 缺失模块**：<https://github.com/agentscope-ai/QwenPaw/issues/5952>  
- **#5934 Windows file URI 回放失败**：<https://github.com/agentscope-ai/QwenPaw/issues/5934>  

### 高优先级待合并/待审 PR
- **#5949 MCP 访问策略即时生效**：<https://github.com/agentscope-ai/QwenPaw/pull/5949>  
- **#5953 统一工具结果截断提示**：<https://github.com/agentscope-ai/QwenPaw/pull/5953>  
- **#5935 统一工具结果裁剪中间件**：<https://github.com/agentscope-ai/QwenPaw/pull/5935>  
- **#5931 Windows 受限 token 沙箱**：<https://github.com/agentscope-ai/QwenPaw/pull/5931>  
- **#5930 SSE 结构化 run outcome**：<https://github.com/agentscope-ai/QwenPaw/pull/5930>  
- **#5922 观测性增强**：<https://github.com/agentscope-ai/QwenPaw/pull/5922>  

### 运维/发布类待收口
- **#5944 Release Duty v2.0.0 稳定版安装验证**：<https://github.com/agentscope-ai/QwenPaw/issues/5944>  
- **#5941 Release Duty v2.0.0-beta.7 安装验证**：<https://github.com/agentscope-ai/QwenPaw/issues/5941>  

这部分建议维护者优先按顺序处理：  
**先稳住崩溃/安全/权限，再处理兼容性与体验优化，最后收口文档与发布验证。**

---

如果你愿意，我可以把这份日报进一步整理成：
1. **更适合公众号/飞书群的短版**，或  
2. **更适合内部周报/管理层阅读的表格版**。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报（2026-07-11）

## 1. 今日速览
- 过去 24 小时内，ZeroClaw 保持**高活跃度**：新增/活跃 Issue 9 条、PR 更新 20 条，但仅 1 条 PR 关闭，说明团队仍处于“高输入、谨慎合入”的消化阶段。  
- 今日讨论与改动高度集中在 **runtime/agent 流式行为、provider 兼容性、Telegram/ZeroCode 体验、MCP 工具链性能、CI/文档** 等方向，属于典型的“稳定性修复 + 集成兼容”并行期。  
- **今日无新版本发布**，当前更像是在为下一轮补丁版/功能版做收敛与回归修复。  
- 从健康度看，项目整体**工程推进积极**，且社区反馈非常贴近真实使用场景；但开放项依然较多，短期 backlog 压力不小。  

---

## 3. 项目进展
- **PR #8932**（工具缓存优化）已关闭：`[tool, tool:mcp] fix(tools): cache MCP tool spec to stop per-iteration input_schema deep clone (#8642)`  
  - 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8932>  
  - 意义：该方向针对 MCP-heavy 场景的高频深拷贝热点，属于明显的性能/内存优化收口动作。  
- 今日整体推进的“主线”并不在单一大功能发布，而在多个关键子系统的质量修补：
  - Gemini 工具调用历史保真：PR #8935  
    <https://github.com/zeroclaw-labs/zeroclaw/pull/8935>
  - 流式叙述去重/修正：PR #8930、#8951  
    <https://github.com/zeroclaw-labs/zeroclaw/pull/8930>  
    <https://github.com/zeroclaw-labs/zeroclaw/pull/8951>
  - Webhook 验证能力增强：PR #8949  
    <https://github.com/zeroclaw-labs/zeroclaw/pull/8949>
- **阶段性判断**：今天的提交更像是把“真实用户已经撞到的边角问题”逐步补齐，项目正在从“能用”向“可规模化稳定使用”推进。  

---

## 4. 社区热点
- **Issue #8933** 是今日最明确的讨论热点（已有 1 条评论）：  
  **[Feature] Add gen_ai.conversation.id for cross-turn session correlation in OTel export**  
  - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8933>  
  - 热点原因：这不是单纯的字段新增，而是把 ZeroClaw 的 turn/session 关系标准化映射到 OTel 生态，明显面向可观测性与跨回合追踪需求。  
- **Issue #8958** 代表了另一个非常强的需求信号：  
  **ACP agent selection via ?agent= query param**  
  - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8958>  
  - 背后诉求：外部客户端（如 Thunderbolt）希望通过标准化 query param 在多 agent endpoint 中选择目标 agent，说明用户已在真实第三方客户端场景中集成 ZeroClaw。  
- 从反应/评论可见度来看，今日热点并不分散，**讨论核心集中在“观测标准化”和“外部客户端兼容”** 两类需求上。  

---

## 5. Bug 与稳定性
> 按严重程度从高到低排列，并标注是否已有 fix PR。

### S1：工作流阻断
- **Issue #8934** — Gemini function calls fail because `thought_signature` is dropped from assistant history  
  - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8934>  
  - 影响：Gemini 多轮工具调用在后续请求阶段失败，属于**流程阻断级**问题。  
  - 对应修复 PR：**PR #8935**  
    <https://github.com/zeroclaw-labs/zeroclaw/pull/8935>

### S2：用户可见退化 / 性能热点
- **Issue #8936** — `loop_detector::hash_value` 每次工具调用深拷贝整棵 JSON 树  
  - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8936>  
  - 风险：长工具链/大参数场景下会放大 RSS 增长与分配开销。  
  - 对应修复 PR：**PR #8937**  
    <https://github.com/zeroclaw-labs/zeroclaw/pull/8937>

- **Issue #8952** — streamed narration 在前后空白差异时被重复输出  
  - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8952>  
  - 影响：用户可见的重复文本，属于明显体验退化。  
  - 相关修复 PR：**PR #8951、PR #8930**  
    <https://github.com/zeroclaw-labs/zeroclaw/pull/8951>  
    <https://github.com/zeroclaw-labs/zeroclaw/pull/8930>

- **Issue #8945** — ZeroCode 输入框阻断 macOS 文本替换  
  - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8945>  
  - 影响：影响 macOS 原生输入习惯，属于 TUI 交互兼容问题。  
  - 是否已有 fix PR：**未见明确对应 PR**

- **Issue #8944** — ZeroCode transcript 鼠标复制阻断按词选择  
  - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8944>  
  - 影响：复制/选中文本行为过于“消息级”，降低可用性。  
  - 是否已有 fix PR：**未见明确对应 PR**

- **Issue #8950** — Telegram `setMyCommands` 因命令数超限失败  
  - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8950>  
  - 影响：机器人命令菜单无法注册，直接削弱 Telegram 通道功能可发现性。  
  - 是否已有 fix PR：**未见明确对应 PR**

### 其他值得关注
- **Issue #8958** 虽是 feature request，但也带有明显稳定性/兼容性意义：外部客户端接入多 agent 场景时缺少标准选择入口。  
  - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8958>  

---

## 6. 功能请求与路线图信号
- **#8933：OTel 会话关联标准化**  
  - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8933>  
  - 路线图信号：非常强。该需求直接提升观测能力，且与分布式追踪/多轮对话诊断高度相关，**很可能进入下一轮重点合入范围**。  

- **#8958：多 agent endpoint 的外部客户端 agent 选择**  
  - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8958>  
  - 路线图信号：非常强。它来自真实第三方 ACP 客户端接入验证，说明 ZeroClaw 正在从“内部可用”走向“外部客户端可集成”。  

- **#8949：Webhook GET + challenge-echo 的插件验证能力**  
  - 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8949>  
  - 路线图信号：中高。表明插件生态的接入认证链路正在完善，后续大概率继续补齐 webhook/verification 相关流程。  

- **#8956：skills install 错误本地化**  
  - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8956>  
  - 路线图信号：中等。更偏产品成熟度与一致性，但说明项目正在持续打磨 CLI 可维护性与国际化体验。  

**综合判断**：下一版本最可能优先吸纳的主题是 **可观测性标准化、外部客户端兼容、多 agent 入口设计、插件验证链路**。  

---

## 7. 用户反馈摘要
- **真实使用场景非常多样**：  
  - Gemini 多轮函数调用：<https://github.com/zeroclaw-labs/zeroclaw/issues/8934>  
  - Telegram bot 通道：<https://github.com/zeroclaw-labs/zeroclaw/issues/8950>  
  - macOS TUI/输入法：<https://github.com/zeroclaw-labs/zeroclaw/issues/8945>  
  - ZeroCode transcript 交互：<https://github.com/zeroclaw-labs/zeroclaw/issues/8944>  
  - MCP/长工具链性能：<https://github.com/zeroclaw-labs/zeroclaw/issues/8936>  
  - ACP 外部客户端接入：<https://github.com/zeroclaw-labs/zeroclaw/issues/8958>  

- **用户最在意的痛点**主要是：
  1. **协议/历史元数据不能丢**，否则多轮工具调用会直接失败。  
     - 例：Gemini 的 `thought_signature` 问题。<https://github.com/zeroclaw-labs/zeroclaw/issues/8934>
  2. **流式输出必须稳定且不重复**，否则会影响对话自然度。  
     - 例：重复 narration。<https://github.com/zeroclaw-labs/zeroclaw/issues/8952>
  3. **TUI/输入与复制行为要尊重系统习惯**，否则影响日常可用性。  
     - 例：macOS 文本替换、按词选择。<https://github.com/zeroclaw-labs/zeroclaw/issues/8945>  
       <https://github.com/zeroclaw-labs/zeroclaw/issues/8944>
  4. **性能问题已经进入真实负载层面**，不是纯理论优化。  
     - 例：loop_detector 深拷贝与内存压力。<https://github.com/zeroclaw-labs/zeroclaw/issues/8936>

- **积极信号**：Issue 描述普遍很完整，且经常直接给出复现、影响面和修复方向，说明社区里有不少重度用户在参与共建，而不是仅仅“报错”。  

---

## 8. 待处理积压
> 由于本日报仅覆盖 24 小时数据，无法严格判断“长期未响应”；以下按**影响面 + 优先级 + 现实紧迫度**列出当前最值得持续跟踪的积压候选。

1. **#8934** — Gemini thought_signature 丢失导致工作流阻断  
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8934>  
   - 说明：S1 等级，且已有对应 PR #8935，建议优先推进合并验证。  

2. **#8936** — loop_detector 深拷贝性能热点  
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8936>  
   - 说明：在长工具链/大参数场景中会持续放大资源消耗，建议作为 runtime 性能主线跟进。  

3. **#8958** — ACP 多 agent 选择能力  
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8958>  
   - 说明：外部客户端接入需求明确，若不尽快标准化，后续集成成本会继续上升。  

4. **#8950** — Telegram 命令菜单超限  
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8950>  
   - 说明：影响通道初始化成功率，建议尽快排查命令裁剪/分组策略。  

5. **#8945 / #8944** — ZeroCode 交互体验退化  
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8945>  
     <https://github.com/zeroclaw-labs/zeroclaw/issues/8944>  
   - 说明：虽然不阻断核心功能，但会直接影响日常使用体验，适合纳入 UI/UX 修复批次。  

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **更适合管理层阅读的 1 页简报版**，或  
2. **更适合研发例会的“风险/机会/优先级”版**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*