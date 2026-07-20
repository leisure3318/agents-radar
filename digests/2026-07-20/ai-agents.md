# OpenClaw 生态日报 2026-07-20

> Issues: 35 | PRs: 44 | 覆盖项目: 13 个 | 生成时间: 2026-07-20 03:22 UTC

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

以下为 **OpenClaw（openclaw/openclaw）在 2026-07-20 的项目动态日报**。  
总体来看，项目仍处于**高强度修复与回归清理期**：过去 24 小时有 **35 条 Issue 更新**、**44 条 PR 更新**，其中 **31 个 PR 仍待合并**，说明社区提交和问题反馈都很活跃，但待消化的变更量也不小。

---

## 1) 今日速览

今天的 OpenClaw 依旧是“**问题驱动型高活跃**”状态：新开/活跃 Issues 占比高（31/35），且不少集中在 **消息投递、会话状态、认证、Windows 兼容性** 等核心路径，说明主线功能仍在经历密集回归验证。  
PR 端也同样繁忙，过去 24 小时共有 **44 条 PR 更新**，但只有 **13 条完成合并/关闭闭环**，项目节奏呈现出“**修复推进快、审查压力也大**”的特征。  
从议题分布看，OpenClaw 当前的健康度是：**功能面持续扩张，稳定性与跨渠道一致性仍是最大风险点**。  
今日没有新版本发布，说明当前更像是一个**集中修补与验证窗口**，而不是发版窗口。

---

## 2) 项目进展

今天完成闭环的 PR 主要集中在 **onboarding、Telegram、Windows、MCP、Dashboard / UI** 等方向，反映出项目在“发布前稳定性”和“跨平台能力”两端同时推进。

### 已关闭/完成闭环的关键 PR
- [#111569 fix(onboard): preserve gateway settings on rerun](https://github.com/openclaw/openclaw/pull/111569)  
  非交互式 onboarding 重跑不再误清空网关网络与认证配置，降低“重跑即丢配置”的风险。
- [#111260 fix(cron): run Windows exit watchers when ComSpec is blank](https://github.com/openclaw/openclaw/pull/111260)  
  修复 Windows 上 ComSpec 为空时的退出 watcher 误行为，增强 CLI / cron 稳定性。
- [#111551 fix(telegram): honor linkPreview:false on draft-stream replies](https://github.com/openclaw/openclaw/pull/111551)  
  修复 Telegram 草稿流式回复仍展开链接预览的问题，对应 [#111525](https://github.com/openclaw/openclaw/issues/111525)。
- [#111282 fix(agents): reject non-UTF-8 MCP App sandbox CSP metadata](https://github.com/openclaw/openclaw/pull/111282)  
  强化 MCP App sandbox CSP 校验，避免损坏策略被静默窄化。
- [#111605 improve(swarm): close out wait, phase, and worker follow-ups](https://github.com/openclaw/openclaw/pull/111605)  
  收尾 Swarm 的若干 follow-up，体现出 E2E 级别的后续修整。
- [#111552 feat(dashboard): persist MCP Apps as board widgets](https://github.com/openclaw/openclaw/pull/111552)  
  为 Dashboard widget 持久化 MCP App 提供后端承载能力，是偏平台化的关键能力。
- [#111585 feat(ui): render MCP Apps in dashboard widgets](https://github.com/openclaw/openclaw/pull/111585)  
  补上 Dashboard 端的渲染 / 生命周期半边，使 widget 持久化具备可见性。

### 今日推进的总体意义
- **消息与会话链路更稳**：Telegram 相关修复进入收尾，说明消息投递正确性仍是主战场。
- **Windows / CLI 兼容性继续补洞**：对 ComSpec、退出 watcher、路径处理等问题持续修复。
- **Dashboard / MCP 进入“可落地”阶段**：从持久化到渲染的链路在打通，后续更适合做稳定性压测。
- 按汇总口径，过去 24 小时共 **13 个 PR 完成闭环**，说明项目在高压 triage 下仍保持了不错的交付吞吐。

---

## 3) 社区热点

今天讨论最热的基本都集中在 **高优先级 Bug**，而且评论都围绕“**回归是否可复现、根因是否已清、是否需要维护者介入**”展开。

### 热点 Issues
1. [#111519 Telegram DM replies fall back after stale DM-scope cleanup in 2026.7.2-beta.3](https://github.com/openclaw/openclaw/issues/111519)  
   - **5 条评论，1 个赞**
   - 关键词：`session-state`、`message-loss`、P1  
   - 诉求本质：用户关心的是 **DM 回复不能丢、不能延后、不能错归属**。这类问题直接打击机器人作为消息代理的核心可信度。

2. [#111506 EmbeddedAttemptSessionTakeoverError: rapid-fire requests cause session lock contention on heavy contexts](https://github.com/openclaw/openclaw/issues/111506)  
   - **5 条评论，1 个赞**
   - 关键词：高上下文、锁竞争、会话并发  
   - 诉求本质：在重上下文场景下，用户希望模型请求是**顺序、稳定、可等待关闭**的，而不是“连发导致锁冲突”。

3. 一组 3 评论热点，集中在多个高影响路径：
   - [#111510 codex/* provider POSTs to legacy /backend-api/responses (403)](https://github.com/openclaw/openclaw/issues/111510)
   - [#111538 active-memory plugin causes session looping](https://github.com/openclaw/openclaw/issues/111538)
   - [#111479 WebChat Read Aloud TTS button removed](https://github.com/openclaw/openclaw/issues/111479)
   - [#111576 Telegram agent turn ends after acknowledgement — real reply never sends](https://github.com/openclaw/openclaw/issues/111576)
   - [#111578 Gateway auth token dropped from service-env on update](https://github.com/openclaw/openclaw/issues/111578)

### 热点结论
社区最关心的不是“新花活”，而是 **跨渠道消息完整性、认证续存、会话不死锁、UI 不回退**。  
这说明 OpenClaw 的用户群对产品的基本标准非常明确：**一旦涉及消息丢失、认证失效或会话卡死，就会立即上升为 P1/P0 级别问题**。

---

## 4) Bug 与稳定性

以下按严重程度排序，优先列出影响面最大、对生产可用性最敏感的问题。

### P0 / 最高优先级
- [#111578 Gateway auth token dropped from service-env on update](https://github.com/openclaw/openclaw/issues/111578)  
  **影响：auth-provider / ux-release-blocker**  
  更新后 `OPENCLAW_GATEWAY_AUTH_TOKEN` 再次丢失，且 CLI 本地认证也失败。  
  **现状：暂无可见 fix PR。**  
  这是典型的“更新后直接失去可用性”的阻断级问题。

### P1 / 高严重度
- [#111519 Telegram DM replies fall back after stale DM-scope cleanup](https://github.com/openclaw/openclaw/issues/111519)  
  **影响：session-state / message-loss**  
  Telegram 私聊回复归属异常，后续才通过 conversation fallback 送达，存在消息丢失/错序风险。  
  **现状：暂无可见 fix PR。**
- [#111576 Telegram agent turn ends after acknowledgement](https://github.com/openclaw/openclaw/issues/111576)  
  **影响：message-loss**  
  只发了 ACK，真正回复没发出去。  
  **现状：暂无可见 fix PR。**
- [#111577 Chronic Discord invalid-session/zombie reconnect storms](https://github.com/openclaw/openclaw/issues/111577)  
  **影响：message-loss**  
  Discord 连接长期陷入 invalid-session / zombie 重连，导致私信静默丢失。  
  **现状：暂无可见 fix PR。**
- [#111572 Telegram `reason: stopped` wedge still occurs](https://github.com/openclaw/openclaw/issues/111572)  
  **影响：session-state / message-loss**  
  Telegram 转发/停止链路仍有 wedge，说明此前 fix 不完整。  
  **现状：暂无可见 fix PR。**
- [#111442 default memory hook blocks repeated channel restart recovery](https://github.com/openclaw/openclaw/issues/111442)  
  **影响：session-state / message-loss**  
  默认 memory 插件阻断多次重启恢复，属于“恢复路径失效”。

### P2 / 中高优先级
- [#111506 EmbeddedAttemptSessionTakeoverError](https://github.com/openclaw/openclaw/issues/111506)  
  重上下文下锁竞争明显，属于稳定性与吞吐问题。
- [#111520 Model Setup 'Test & use' fails on configless gateways](https://github.com/openclaw/openclaw/issues/111520)  
  **影响：auth-provider / ux-release-blocker**  
  首次配置失败，且 owner 未正确提交。
- [#111627 doctor --fix crashes on timed out publication](https://github.com/openclaw/openclaw/issues/111627)  
  `doctor --fix` 在写配置前崩溃，导致自动修复流程失效。
- [#111567 SYSTEM_RUN_DENIED on Windows node despite correct approvals](https://github.com/openclaw/openclaw/issues/111567)  
  Windows 节点执行审批异常，属于平台可用性问题。
- [#111566 ingress drain holds a lane permanently](https://github.com/openclaw/openclaw/issues/111566)  
  死信写入失败会把 lane 永久卡住，恢复性差。

### 已有 fix PR 的示例
- [#111525 telegram: linkPreview:false ignored by draft-streaming path](https://github.com/openclaw/openclaw/issues/111525)  
  已有对应修复 PR：[#111551](https://github.com/openclaw/openclaw/pull/111551)

---

## 5) 功能请求与路线图信号

今天的新功能需求主要集中在 **Control UI、会话编排、跨平台体验、Telegram/消息表达能力** 上。  
从已有 PR 看，部分需求已经进入实现阶段，说明它们很可能被纳入下一版本或下一轮迭代。

### 更可能进入下一版本的请求
- [#111583 Agent-controlled session status, attention, and TTL in the sessions tool](https://github.com/openclaw/openclaw/pull/111583)  
  这是明确的开放 PR，且直接对应“让 agent 可控会话状态”的产品能力，优先级很高。
- [#111597 Unify native offline client storage across platforms](https://github.com/openclaw/openclaw/issues/111597)  
  对应 PR：[#111598](https://github.com/openclaw/openclaw/pull/111598)  
  这是 iOS / macOS 离线存储统一，属于平台基础设施级改造，长期价值高。
- [#111412 WebChat message editing & response regeneration](https://github.com/openclaw/openclaw/issues/111412)  
  很典型的高频 UX 需求，属于“用户一旦习惯就会反复要”的功能。
- [#111454 Telegram native Thinking indicator via Bot API 10.2](https://github.com/openclaw/openclaw/issues/111454)  
  更偏渠道体验增强，容易作为“低风险高感知”功能加入。
- [#111563 Make agent-generated setup commands aware of the user's login shell](https://github.com/openclaw/openclaw/issues/111563)  
  这类 shell 适配属于小而痛的真实需求，若已修复其他 shell 问题，后续很可能继续推进。

### 路线图信号
从今日 PR 可以看出，路线图正在朝以下方向收敛：
- **会话状态更强控制**：[#111610](https://github.com/openclaw/openclaw/pull/111610)、[#111583](https://github.com/openclaw/openclaw/pull/111583)
- **UI 结构化与可恢复性**：[#111615](https://github.com/openclaw/openclaw/pull/111615)、[#111613](https://github.com/openclaw/openclaw/pull/111613)
- **移动端 / 本地存储统一**：[#111598](https://github.com/openclaw/openclaw/pull/111598)
- **渠道兼容与消息正确性**：[#111404](https://github.com/openclaw/openclaw/pull/111404)、[#111551](https://github.com/openclaw/openclaw/pull/111551)

---

## 6) 用户反馈摘要

从 Issue 评论和提案内容看，用户的真实痛点非常集中，且都围绕“**不能丢、不能乱、不能卡**”。

### 主要痛点
1. **消息完整性是第一诉求**  
   Telegram、Discord、WhatsApp 相关问题频繁出现，用户最不能接受的是：
   - 回复丢失
   - 重复发送
   - ACK 后真回复消失
   - 草稿流式路径和非流式路径行为不一致  
   代表性问题：
   - [#111519](https://github.com/openclaw/openclaw/issues/111519)
   - [#111576](https://github.com/openclaw/openclaw/issues/111576)
   - [#111549](https://github.com/openclaw/openclaw/issues/111549)

2. **会话状态与恢复能力必须稳定**  
   用户很在意 agent 在重启、compact、plugin 注入、session cleanup 后能否继续工作：
   - [#111442](https://github.com/openclaw/openclaw/issues/111442)
   - [#111506](https://github.com/openclaw/openclaw/issues/111506)
   - [#111566](https://github.com/openclaw/openclaw/issues/111566)

3. **认证与配置不能“更新即失效”**  
   反复出现的认证 token 丢失、provider 解析错误、configless gateway 失败，都说明用户对“升级不破坏生产可用性”极其敏感：
   - [#111578](https://github.com/openclaw/openclaw/issues/111578)
   - [#111520](https://github.com/openclaw/openclaw/issues/111520)
   - [#111550](https://github.com/openclaw/openclaw/issues/111550)

4. **UX 期待在增长**
   用户已经不满足于“能用”，开始要求：
   - 可编辑消息 / 重新生成回复：[#111412](https://github.com/openclaw/openclaw/issues/111412)
   - 原生 Thinking 指示器：[#111454](https://github.com/openclaw/openclaw/issues/111454)
   - 读出功能替代方案：[#111479](https://github.com/openclaw/openclaw/issues/111479)

### 满意与不满意的信号
- **满意点**：用户愿意提交高质量复现、版本号、场景细节，说明产品仍有活跃且重度依赖的核心用户群。
- **不满意点**：一旦影响到渠道消息、认证、会话状态，用户会明确把问题标成 **P1 / P0 / release blocker**，容忍度很低。

---

## 7) 待处理积压

> 说明：由于这是单日快照，“长期未响应”无法严格从时间维度证明；以下按**高优先级 + 仍处于待维护者响应/需信息/需复现** 的积压池来判断。

### 高优先级待跟进 Issues
- [#111578 Gateway auth token dropped from service-env on update](https://github.com/openclaw/openclaw/issues/111578)  
  P0，且带 `needs-product-decision`，是当前最该优先处理的阻断问题。
- [#111519 Telegram DM replies fall back after stale DM-scope cleanup](https://github.com/openclaw/openclaw/issues/111519)  
  P1，消息归属异常，影响真实投递结果。
- [#111577 Discord invalid-session/zombie reconnect storms](https://github.com/openclaw/openclaw/issues/111577)  
  P1，长期连接稳定性风险。
- [#111572 Telegram reason: stopped wedge still occurs](https://github.com/openclaw/openclaw/issues/111572)  
  P1，表明既有修复未覆盖根因。
- [#111566 ingress drain holds a lane permanently](https://github.com/openclaw/openclaw/issues/111566)  
  P1，恢复路径被锁死。
- [#111567 SYSTEM_RUN_DENIED on Windows node](https://github.com/openclaw/openclaw/issues/111567)  
  P1，Windows 执行路径异常。
- [#111627 doctor --fix crashes before persisting config migrations](https://github.com/openclaw/openclaw/issues/111627)  
  P1，直接影响自动修复工具的可信度。
- [#111520 Model Setup 'Test & use' fails on configless gateways](https://github.com/openclaw/openclaw/issues/111520)  
  P0/P1 级别的首次配置失败。

### 需要维护者重点审查的开放 PR
- [#111615 feat(system-agent): agentic cached caretaker greeting with quick actions](https://github.com/openclaw/openclaw/pull/111615)  
  体量大、状态敏感、需要证明。
- [#111598 refactor(apple): unify offline client databases](https://github.com/openclaw/openclaw/pull/111598)  
  影响 iOS/macOS 存储架构，需仔细审查。
- [#111610 refactor(ui): extract the steered-message lifecycle into a typed state machine](https://github.com/openclaw/openclaw/pull/111610)  
  典型高风险状态机重构。
- [#111626 fix(feishu,reef): drop empty/whitespace channel/entry strings](https://github.com/openclaw/openclaw/pull/111626)  
  小修但涉及 channel/entry 规范化，需确认边界。
- [#111404 fix(message): ignore populated location on text sends](https://github.com/openclaw/openclaw/pull/111404)  
  Telegram 可见性证明仍在补充。
- [#111600 fix(gateway): add single-flight guard to update.run](https://github.com/openclaw/openclaw/pull/111600)  
  直接修并发更新冲突，值得尽快审。

---

### 一句话结论
**OpenClaw 今天的核心特征是：需求很活跃、修复也在推进，但“消息正确性 + 会话稳定性 + 认证连续性”仍是最需要守住的底线。**  
如果后续能继续把 Telegram / Discord / Gateway / Windows 这些高频故障链路收敛，项目健康度会明显提升。

---

## 横向生态对比

以下为基于 2026-07-20 近 24 小时动态的**横向对比分析报告**，面向技术决策者与开发者。

---

# 1. 生态全景

整体看，个人 AI 助手 / 自主智能体开源生态已从“功能堆叠”进入“**可靠性与运行语义收敛**”阶段。  
当前最突出的共性不再是新模型接入，而是**会话状态不丢、跨渠道消息不乱、认证更新不失效、工具调用可恢复**。  
同时，项目正在从“能跑”走向“可控、可审计、可部署”：桌面端、离线场景、Windows / Linux 兼容、成本可见性、MCP/ACP 资源流转都在被集中打磨。  
生态内部已经形成分层：一类是高活跃、面向生产使用的全栈项目；一类是偏架构重构和能力收敛的项目；还有少数仓库处于低噪音维护或发布驱动状态。

---

# 2. 各项目活跃度对比

> 说明：下表中的 Issues / PR 为“过去 24h 活跃更新量”口径。

| 项目 | Issues | PR | Release | 健康度评估 |
|---|---:|---:|---|---|
| OpenClaw | 35 | 44 | 无 | **高活跃高压**：修复密集、回归集中、社区反馈最强 |
| NanoBot | 2 | 11 | 无 | **中高活跃**：偏安全、架构与稳定性修补 |
| Hermes Agent | 50 | 50 | 无 | **最高强度迭代**：跨执行面一致性与状态治理压力大 |
| PicoClaw | 3 | 1 | 无 | **中低活跃**：核心链路修补，讨论热度不高 |
| NanoClaw | 2 | 5 | 无 | **中活跃**：平台能力与体验并行推进 |
| NullClaw | 0 | 0 | 无 | **静默**：无可见活动 |
| IronClaw | 4 | 41 | 无 | **高强度工程推进**：重构收敛、质量固化明显 |
| LobsterAI | 0 | 0 | 无 | **静默** |
| TinyClaw | 0 | 0 | 无 | **静默** |
| Moltis | 0 | 0 | **1 个新 Release** | **低噪音发布驱动**：协作面冷静，但有版本推进 |
| CoPaw | 8 | 4 | 无 | **中高活跃**：用户反馈驱动，体验与稳定性补课 |
| ZeptoClaw | 0 | 0 | 无 | **静默** |
| ZeroClaw | 6 | 18 | 无 | **高活跃**：终端交互、渠道兼容、安全与 CI 并进 |

---

# 3. OpenClaw 在生态中的定位

## 优势
1. **社区反馈强度最高的一档**  
   OpenClaw 24h 内有 35 条 Issue 更新、44 条 PR 更新，且高优先级问题集中在**消息投递、会话状态、认证连续性、Windows 兼容**等生产关键路径，说明它是一个“真实用户在高频使用”的项目，而不是纯实验仓库。

2. **覆盖面最广，产品化程度高**  
   从 Telegram、Discord 到 Gateway、Dashboard、Windows、MCP，OpenClaw 的能力面明显更“全栈”。  
   这意味着它不仅在做模型接入，更在做**跨渠道智能体平台**。

3. **问题类型更接近生产红线**  
   其热点不是新功能炫技，而是：  
   - 消息丢失 / 错序  
   - token 丢失 / 认证失败  
   - session wedge / lock contention  
   - UI / 通道行为回退  
   这类问题一旦出现，直接影响可用性，因此项目的工程成熟度要求很高。

## 技术路线差异
- 相比 **Hermes** 的“跨执行面统一 runtime contract”，OpenClaw 更偏向**跨渠道消息正确性 + 门面稳定性**。
- 相比 **IronClaw** 的“架构重构与状态存储收敛”，OpenClaw 更像是在**真实产品场景里做高压回归清理**。
- 相比 **NanoBot / ZeroClaw** 这类更聚焦平台能力、工具链或终端交互的项目，OpenClaw 的重点是**生产级多通道助手的整体可靠性**。

## 社区规模对比
- 按 24h 活跃更新量看，OpenClaw 处于**第一梯队**，与 Hermes、IronClaw 属于最活跃的几个仓库之一。
- 但它的社区特征更像“**高频故障反馈 + 快速 triage**”，说明用户使用强度高、对稳定性容忍度低。
- 如果只看“问题热度”，OpenClaw 的 P0/P1 占比和反馈紧迫性，在样本中非常突出。

**结论：OpenClaw 是生态中最典型的“生产型多渠道智能体平台”代表。**

---

# 4. 共同关注的技术方向

## 1) 会话状态、恢复与生命周期一致性
**涉及项目：** OpenClaw、Hermes、IronClaw、NanoBot、CoPaw  
**共同诉求：**
- 重启后状态不能丢
- turn / session / profile 不能串
- late result、ack、fallback 不应破坏原始语义
- 恢复机制要可验证、可回滚、可解释

**典型表现：**
- OpenClaw：Telegram DM fallback、ack 后真回复丢失
- Hermes：共享 runtime contract、profile-scoped restore、cost 状态持久化
- IronClaw：turn-state store 收敛、crash-consistency、recoverability contract
- NanoBot：turn lifecycle 统一、late subagent result 语义修正
- CoPaw：per-agent auto-memory profiles

---

## 2) 跨渠道消息正确性
**涉及项目：** OpenClaw、PicoClaw、Hermes、ZeroClaw、CoPaw  
**共同诉求：**
- 消息不能丢、不能错归属、不能 silent fail
- bot API / msg_id / ACK / 回复链路必须严格对齐平台语义
- 视觉、多模态、草稿流式、群聊 / 私聊边界要一致

**典型表现：**
- OpenClaw：Telegram / Discord / WhatsApp 相关问题密集
- PicoClaw：MCP 断连导致 agent loop 挂死，多模态路由失配
- Hermes：Telegram、Discord、Codex streaming 协议一致性
- ZeroClaw：QQ、Nextcloud Talk、WhatsApp 的消息协议细节
- CoPaw：聊天报错、思考输出结构、离线模式兼容

---

## 3) 安全、权限与治理前置
**涉及项目：** NanoBot、ZeroClaw、OpenClaw、Hermes  
**共同诉求：**
- workspace / filesystem / sandbox 边界更严格
- allowlist、CIDR、secret、CSP、CI 注入风险需要治理
- 安全不是附属功能，而是平台级门槛

**典型表现：**
- NanoBot：filesystem 校验、browser companion 安全启动
- ZeroClaw：workflow_dispatch shell injection、secret prompt 反馈
- OpenClaw：gateway auth token 保持、非 UTF-8 CSP metadata 拒绝
- Hermes：路径穿越、安全边界、依赖 floor 提升

---

## 4) MCP / 工具结果的结构化流转
**涉及项目：** OpenClaw、NanoBot、PicoClaw、ZeroClaw  
**共同诉求：**
- 工具结果要能落盘、能引用、能结构化传递
- 不要把 base64 / 中间态直接塞进模型上下文
- 远程 MCP、embedded resource、artifact delivery 是关键能力

**典型表现：**
- OpenClaw：Dashboard widget / MCP App 持久化
- NanoBot：远程 Streamable HTTP MCP server
- PicoClaw：MCP server 断连处理
- ZeroClaw：MCP / ACP embedded resource blob、deliver_file

---

## 5) 桌面端、终端与离线体验
**涉及项目：** Hermes、CoPaw、OpenClaw、IronClaw、ZeroClaw  
**共同诉求：**
- 本地桌面/终端要像“产品”而不是 demo
- Linux / Windows / macOS 的兼容性要稳定
- 离线、首次启动、REPL、帮助、缩放、恢复等体验要补齐

---

# 5. 差异化定位分析

## OpenClaw
- **功能侧重：** 多渠道消息代理、Gateway、Dashboard、Windows 兼容、MCP 生态
- **目标用户：** 真实生产使用的多渠道 agent 用户、需要消息完整性的团队
- **架构特征：** 全栈、多入口、多渠道，强调端到端正确性

## Hermes Agent
- **功能侧重：** runtime contract 统一、desktop、cost 可见性、session/profile 治理
- **目标用户：** 多入口执行面的一体化助手用户
- **架构特征：** 更偏“统一运行时模型”的平台路线

## IronClaw
- **功能侧重：** turn-state 收敛、crash consistency、recoverability、REPL/onboarding
- **目标用户：** 关注底层架构稳定与可验证性的开发者
- **架构特征：** 强重构、强验证、偏基础设施化

## NanoBot
- **功能侧重：** subagent、多 agent 协作、安全治理、provider 扩展
- **目标用户：** 想做可组合智能体平台的用户
- **架构特征：** 平台型、模块化、安全边界意识强

## PicoClaw
- **功能侧重：** 核心链路修补、MCP 连接、工具参数契约
- **目标用户：** 轻量接入、边缘集成用户
- **架构特征：** 小而聚焦，当前更像稳定性补洞期

## NanoClaw
- **功能侧重：** host hooks、技能学习、远程 MCP、审批可见性
- **目标用户：** 希望把 agent 做成可扩展工作台的人
- **架构特征：** 平台可扩展性导向，偏“下一代助手框架”

## ZeroClaw
- **功能侧重：** ZeroCode、终端交互、渠道协议、安全 CI
- **目标用户：** 终端重度用户、机器人多渠道接入用户
- **架构特征：** CLI / bot 工程化深，强调协议正确性和可操作性

## CoPaw
- **功能侧重：** 桌面体验、结果呈现、离线兼容、多 Agent 配置
- **目标用户：** 需要交互体验和桌面可用性的个人用户
- **架构特征：** 更偏产品体验型助手

## Moltis
- **功能侧重：** 发布驱动、低噪音维护
- **目标用户：** 更偏稳定使用者
- **架构特征：** 当前更像成熟维护态，而非高速迭代态

---

# 6. 社区热度与成熟度

## 快速迭代阶段
- **Hermes Agent**：50 Issues / 50 PR，变更密度极高，处于强工程推进窗口
- **OpenClaw**：高频 bug triage + 多 PR 并行，典型高压修复期
- **IronClaw**：PR 吞吐极高，架构重构和质量收口同时推进
- **ZeroClaw**：PR、Issue 双活跃，渠道、安全、终端体验齐头并进

## 功能打磨 / 质量巩固阶段
- **NanoBot**：安全、生命周期、provider 与桌面细节逐步完善
- **CoPaw**：用户反馈驱动，重点在稳定性和结果呈现优化
- **PicoClaw**：问题聚焦但规模不大，偏核心路径修补
- **NanoClaw**：路线图信号强，但仍处于能力铺设阶段

## 发布驱动 / 低噪音维护
- **Moltis**：有 release，但缺少公开协作噪音，偏稳态推进

## 静默或低活动
- **NullClaw、LobsterAI、TinyClaw、ZeptoClaw**
- 当前无可见活跃信号，难以判断技术推进状态

---

# 7. 值得关注的趋势信号

## 1) “会话/状态”正在成为智能体产品的核心竞争壁垒
开发者越来越关心：
- session 不丢
- turn 不乱
- profile 不串
- 重启可恢复
- late result 可解释

这说明未来竞争点不只是模型能力，而是**运行时状态工程能力**。

---

## 2) “跨渠道一致性”比“单点能力”更重要
Telegram、Discord、QQ、WhatsApp、Nextcloud Talk、WebChat、Desktop 都在被同一类问题反复验证：  
**消息必须按平台语义精确投递**。  
对 AI 智能体开发者来说，渠道适配不是适配器层的小事，而是产品可信度的核心。

---

## 3) 安全与治理正在从“补丁”变为“默认设计”
allowlist、sandbox、workspace、CSP、注入防护、CI 安全扫描都在前移。  
这意味着未来开源智能体项目如果没有**默认安全边界**，很难进入真实部署场景。

---

## 4) 桌面端和离线场景的重要性显著上升
Linux / Windows / macOS、离线预览、桌面恢复、托盘、REPL 体验都说明：  
AI 助手正在从云端 demo 走向**本地化、长期驻留、可恢复的生产工具**。

---

## 5) 结果呈现正在从“过程中心”转向“结果中心”
用户不再接受被大量 thinking / tool call / debug 输出淹没。  
更优的方向是：
- 过程可折叠
- 状态可追踪
- 结果突出显示
- 错误可恢复

这对交互设计和日志设计都是重要信号。

---

## 6) MCP / ACP / Tool artifact 流转会成为基础能力
工具调用不只是“给模型看”，而是要**能产出文件、资源、可引用 artifact**。  
这类能力会直接决定智能体是否能进入复杂工作流，而不只是聊天场景。

---

## 总结判断

当前生态的主旋律是：**从“能用的智能体”走向“可部署、可恢复、可治理的智能体系统”**。  
OpenClaw、Hermes、IronClaw 属于第一梯队，分别代表**多渠道生产化、运行时统一、架构收敛**三种路线；NanoBot、ZeroClaw、NanoClaw、CoPaw 则在**平台扩展、终端交互、技能/记忆、桌面体验**上形成差异化探索。  
对开发者来说，接下来最值得投入的不是再做一个“会回答问题的 agent”，而是把**状态、渠道、安全、恢复、观测**做成一套可复用的工程底座。

如果你愿意，我可以进一步把这份报告整理成：
1. **一页 PPT 风格摘要版**，或  
2. **带“机会点 / 风险点 / 投资优先级”的决策版表格**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-07-20）

## 1) 今日速览
今天 NanoBot 处于**高强度开发但低讨论噪音**的状态：过去 24 小时内没有新版本发布，但有 **11 个 PR 更新**，其中 **2 个已关闭**，其余仍在推进中，说明主线仍以功能完善、稳定性修复和安全加固为主。  
Issue 侧只新增/活跃了 **2 条且全部已关闭**，其中一个是多智能体协作方向的提案，另一个是本地触发器在禁用通道下仍执行的 bug，后者已被对应 PR 修复。  
整体来看，项目当前活跃度很高，但活跃点集中在代码层面而非社区讨论层面，反映出仓库进入了较密集的迭代和修补阶段。  
从优先级看，今天的变化对 **安全性、回归稳定性、平台兼容性** 贡献最大，属于“持续打补丁 + 逐步增强架构”的健康推进节奏。

---

## 2) 版本发布
**今日无新版本发布。**

- 最新 Releases：无  
- 影响：当前变化主要停留在 PR 合并与问题修复阶段，尚未形成可对外宣告的版本节点。  
- 关注点：如果后续要出版本，今天出现的 **p0/p1 修复**（尤其是文件系统安全和触发器/子代理生命周期问题）很可能会成为发布前的重要门槛。

---

## 3) 项目进展
今天最值得关注的进展来自两个已关闭 PR，分别覆盖了 **触发器安全修复** 与 **WebUI Windows 兼容性修复**：

1. **#4990 fix(triggers): reject deliveries to disabled channels**  
   - 链接：<https://github.com/HKUDS/nanobot/pull/4990>  
   - 作用：修复本地触发器在目标 channel 已禁用后仍继续执行的问题。  
   - 价值：直接关闭了对应 Issue **#4991**，避免无效模型调用和状态污染。  
   - 这类修复对系统健康度提升非常明确，属于“实际可感知”的稳定性改进。

2. **#4994 fix(webui): resolve Windows package manager shims**  
   - 链接：<https://github.com/HKUDS/nanobot/pull/4994>  
   - 作用：改善 WebUI 构建/调用在 Windows 下通过 shim（如 bun.cmd）运行的兼容性。  
   - 价值：补齐跨平台体验短板，减少 Windows 环境构建失败的概率。  
   - 对开源项目来说，这类兼容性修复会明显降低用户首次使用门槛。

此外，虽然仍处于 OPEN 状态，但今天的未合并 PR 也显示出项目的推进方向非常清晰：
- **安全性增强**：#4987 文件系统绑定校验、#4997 浏览器 companion 安全启动  
- **架构演进**：#4993 统一 turn 生命周期、#4992 晚到子代理结果的交付语义调整  
- **能力扩展**：#4996 Atlas Cloud provider 支持、#4998 Ollama prompt-cache 诊断文档  
- **功能修正**：#4989 transcription env 解析、#4988 cron turn 空结果静默处理、#4995 依赖清单迁移

**整体向前迈进的幅度**：今天至少有 **2 个明确问题被关闭**，同时 **9 个高优先级 PR 仍在推进**。这说明项目并非停滞，而是在多个关键子系统上同步推进，特别是安全、provider、WebUI、调度和 agent 生命周期五条线。

---

## 4) 社区热点
从今天提供的数据看，**没有明显高评论/高反应的讨论帖**：  
- 最新 Issues 均为 **0 评论、0 👍**  
- 最新 PR 的评论字段也未显示活跃讨论（多数为 undefined）  
因此今天社区“热度”更像是**开发驱动型**，而不是“讨论驱动型”。

不过，以下两类议题显然最能代表社区关注点：

### 热点 1：多智能体协作演进
- Issue：**#4999 Proposal: evolve the current subagent system toward multi-agent collaboration**  
  链接：<https://github.com/HKUDS/nanobot/issues/4999>  
- 诉求分析：用户希望 subagent 不只是“后台任务执行器”，而是具备**持久身份、共享状态、agent-to-agent 协作**能力的真正多智能体系统。  
- 背后信号：这是从“工具型子代理”走向“协作型智能体”的架构诉求，属于路线图级别需求。

### 热点 2：子代理/触发器的生命周期一致性
- PR：**#4992 fix(webui): deliver late subagent results as new turns**  
  链接：<https://github.com/HKUDS/nanobot/pull/4992>  
- PR：**#4990 fix(triggers): reject deliveries to disabled channels**  
  链接：<https://github.com/HKUDS/nanobot/pull/4990>  
- 诉求分析：社区对“任务晚到、结果回流、通道禁用后的行为”非常敏感，说明真实使用中已经出现了**状态不一致**与**消息路由边界不清**的问题。

### 热点 3：安全与可控性
- PR：**#4987 fix(filesystem): bind workspace checks to opened files**  
  链接：<https://github.com/HKUDS/nanobot/pull/4987>  
- PR：**#4997 feat(webui): add secure browser companion launch**  
  链接：<https://github.com/HKUDS/nanobot/pull/4997>  
- 诉求分析：用户对文件访问安全、浏览器伴侣启动安全的关注，说明 NanoBot 在接近“可实际部署”的阶段后，安全边界开始成为焦点。

---

## 5) Bug 与稳定性
按严重程度排序，今天最值得关注的问题如下：

### 1. P0：文件系统工作区校验可能被绕过或绑定不严
- PR：**#4987 fix(filesystem): bind workspace checks to opened files**  
  链接：<https://github.com/HKUDS/nanobot/pull/4987>  
- 风险：涉及 `read_file` / `write_file` / `edit_file` 的工作区校验与句柄绑定，属于**高风险安全修复**。  
- 影响：如果工作区边界验证不可靠，可能导致越权访问或错误文件写入。  
- 状态：**有修复 PR，仍为 OPEN**。

### 2. P1：禁用通道仍可触发本地触发器执行
- Issue：**#4991 [bug] Local triggers report success after their target channel is disabled**  
  链接：<https://github.com/HKUDS/nanobot/issues/4991>  
- 修复 PR：**#4990**  
  链接：<https://github.com/HKUDS/nanobot/pull/4990>  
- 风险：会消耗模型资源、产生虚假成功状态，并造成调度与状态记录不一致。  
- 状态：**已修复并关闭**。

### 3. P1：晚到的子代理结果在 WebUI 中交付语义不一致
- PR：**#4992 fix(webui): deliver late subagent results as new turns**  
  链接：<https://github.com/HKUDS/nanobot/pull/4992>  
- 风险：子代理返回太晚时，可能与原始 turn 生命周期脱节，影响用户理解和记录一致性。  
- 状态：**OPEN，属于回归/语义一致性问题**。

### 4. P1：transcription 路径未正确解析 `${VAR}` 环境引用
- PR：**#4989 fix(transcription): resolve ${VAR} env refs in transcription api_key/api_base**  
  链接：<https://github.com/HKUDS/nanobot/pull/4989>  
- 风险：会导致转写 API 认证失败，即使用户配置本身是正确的。  
- 状态：**OPEN，影响可用性**。

### 5. P1：cron/scheduled turn 在空模型输出时不应暴露占位文本
- PR：**#4988 fix(agent): keep scheduled (cron) turns silent when the model ends empty**  
  链接：<https://github.com/HKUDS/nanobot/pull/4988>  
- 风险：定时任务本应静默，却可能输出不必要的占位消息，污染用户体验。  
- 状态：**OPEN，偏 UX/稳定性回归**。

### 6. P1：浏览器 companion 启动流程的安全设计仍在完善
- PR：**#4997 feat(webui): add secure browser companion launch**  
  链接：<https://github.com/HKUDS/nanobot/pull/4997>  
- 风险：涉及本地 status endpoint、HttpOnly/SameSite session、bootstrap secret 轮换等敏感机制。  
- 状态：**OPEN，属于安全增强而非纯 bug，但风险等级高**。

---

## 6) 功能请求与路线图信号
今天出现的功能/能力请求，和已有 PR 的组合信号很明确：

### 1. 多智能体协作能力
- Issue：**#4999 Proposal: evolve the current subagent system toward multi-agent collaboration**  
  链接：<https://github.com/HKUDS/nanobot/issues/4999>  
- 路线图信号：这是最明确的“下一阶段架构演进”诉求。  
- 结合现有 PR：  
  - **#4993** 统一 internal turn lifecycle  
    <https://github.com/HKUDS/nanobot/pull/4993>  
  - **#4992** 处理晚到子代理结果  
    <https://github.com/HKUDS/nanobot/pull/4992>  
- 判断：项目正在先把 **turn / message 生命周期打稳**，再考虑更复杂的多 agent 协同，这是一条合理的演进路径。  
- 结论：**高度可能进入下一阶段规划**。

### 2. 新 provider 接入需求
- PR：**#4996 Add Atlas Cloud provider support**  
  链接：<https://github.com/HKUDS/nanobot/pull/4996>  
- 路线图信号：用户希望 NanoBot 能更快接入新的 OpenAI-compatible provider。  
- 说明：这类需求通常会进入“provider 扩展优先级池”，因为能直接扩大可用模型来源和部署场景。  
- 结论：**很可能被纳入近期版本**。

### 3. 更好的部署/诊断能力
- PR：**#4998 docs(ollama): document tool prompt cache diagnostics**  
  链接：<https://github.com/HKUDS/nanobot/pull/4998>  
- 路线图信号：用户开始关注 **prompt cache、tool call 稳定性、模板位置** 等更细的性能和诊断问题。  
- 结论：这表明 NanoBot 已经进入“深水区优化”，不是只做基础功能了。

### 4. 文件系统安全和通道生命周期治理
- PR：**#4987**、**#4990**、**#4992**、**#4993**  
- 结论：这些问题虽然是修补性质，但共同指向一条路线：  
  **系统正在从“能跑”走向“可控、可审计、可安全扩展”**。

---

## 7) 用户反馈摘要
今天的 Issues 没有评论串，因此**无法从讨论中提炼大量显性反馈**；但从问题描述本身，已经能看出真实用户痛点：

### 真实痛点 1：用户希望 subagent 不只是任务执行器
- 来源：**#4999**  
  链接：<https://github.com/HKUDS/nanobot/issues/4999>  
- 反馈含义：用户在尝试更复杂的协同工作流，希望系统支持持久状态、共享上下文和 agent 间协作。  
- 场景：多任务编排、分工执行、结果互相引用。

### 真实痛点 2：用户不接受“禁用后仍然执行”的幽灵行为
- 来源：**#4991** / **#4990**  
  链接：<https://github.com/HKUDS/nanobot/issues/4991>  
  链接：<https://github.com/HKUDS/nanobot/pull/4990>  
- 反馈含义：一旦 channel 被禁用，用户预期系统立即停止相关触发器，不能继续消耗资源。  
- 场景：长时间运行的 local triggers、维护中的工作区、成本敏感环境。

### 真实痛点 3：用户需要更少“莫名其妙失败”的跨平台体验
- 来源：**#4994**  
  链接：<https://github.com/HKUDS/nanobot/pull/4994>  
- 反馈含义：Windows shim 问题代表用户在实际安装链路中会遇到工具可用但调用失败的情况。  
- 场景：本地开发、企业桌面环境、Windows 用户首次接入。

### 真实痛点 4：用户希望调试和部署更可解释
- 来源：**#4998**  
  链接：<https://github.com/HKUDS/nanobot/pull/4998>  
- 反馈含义：用户不仅要功能，还要知道“为什么 prompt cache 没命中 / 工具调用为何重建”。  
- 场景：性能调优、模型成本控制、稳定性排障。

---

## 8) 待处理积压
基于你提供的 24 小时窗口，**没有明显“长期未响应”的 Issue**：  
- 今天的 2 个 Issue 都已关闭  
- 最近 PR 主要是当天或前一天创建，暂无明显长期沉默迹象

但从维护优先级角度，建议重点关注以下“尚未清空”的高价值积压：

### 高优先级待处理 PR
1. **#4987** 文件系统安全修复  
   <https://github.com/HKUDS/nanobot/pull/4987>  
   - p0，建议优先审查与合并

2. **#4993** 统一内部 turn 生命周期  
   <https://github.com/HKUDS/nanobot/pull/4993>  
   - 架构性改动，影响面大，建议尽快评审

3. **#4992** 晚到 subagent 结果处理  
   <https://github.com/HKUDS/nanobot/pull/4992>  
   - 影响用户体验和状态一致性，建议和 #4993 一起看

4. **#4996** Atlas Cloud provider 支持  
   <https://github.com/HKUDS/nanobot/pull/4996>  
   - 能扩展生态和用户覆盖面，值得推进

5. **#4997** 安全浏览器 companion 启动  
   <https://github.com/HKUDS/nanobot/pull/4997>  
   - 安全敏感，建议联动安全审查

### 需要持续关注的路线图信号
- **#4999** 多智能体协作提案  
  <https://github.com/HKUDS/nanobot/issues/4999>  
- 这不是简单 bug，而是中长期架构方向，建议维护者尽早给出回应，避免需求在社区中持续积压。

---

如果你愿意，我可以把这份日报进一步整理成：
1. **适合发群/飞书的短版**，或  
2. **适合内部周报的表格版**。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-07-20）

## 1. 今日速览
- 过去 24 小时，项目出现 **50 条 Issues 更新**、**50 条 PR 更新**，且 **没有新版本发布**，说明仓库正处于高强度迭代与审查窗口，变更密度很高。  
- 今日讨论主轴非常集中：**会话状态/恢复、Desktop 体验、Gateway/Telegram/Discord 集成、计费可见性、以及安全与兼容性修复**。  
- 从议题分布看，项目正在从“单点功能修补”转向“跨执行面一致性与运行时契约统一”，例如生命周期 hooks、会话来源、profile 作用域等问题都在被集中追问。  
- 整体活跃度：**高**；但从问题类型看，**稳定性与兼容性压力仍然较大**，尤其是 session-state、auth、message delivery、desktop restore 这几条主线。  

---

## 2. 项目进展
- 今日可见的已关闭 PR 里，最值得关注的是 **[PR #67818](https://github.com/nousresearch/hermes-agent/pull/67818)**（`perf(desktop): virtualize the review-pane diff`），它修复了 Desktop review pane 在大文件 diff 场景下的全量 Shiki 渲染卡顿问题，有助于降低界面冻结和交互阻塞风险。  
- 按总量统计，今天共有 **7 个 PR 已合并/关闭**；不过在你提供的可见样本里，能够明确确认的仅是上述 1 个关闭 PR，其余完成项未展开。  
- 从今天新开的 PR 方向看，项目正同步推进 **desktop 体验优化、gateway/cron 行为修正、插件兼容性补强、安全加固**，说明主线工作仍在围绕“可用性 + 可靠性”持续收敛。  

---

## 3. 社区热点
### 评论最活跃的 Issue
1. **[Issue #67798](https://github.com/nousresearch/hermes-agent/issues/67798)**  
   `Make lifecycle hooks a shared runtime contract across all execution surfaces`  
   - 这是一个明显的架构级诉求：希望把生命周期 hook 从 gateway-owned 变成 runtime-owned，统一覆盖 agent / cli / tui / cron / plugins / desktop。  
   - 背后诉求是 **“跨入口一致行为”**，避免不同执行面各自实现导致的分叉与维护成本。  

2. **[Issue #67783](https://github.com/nousresearch/hermes-agent/issues/67783)**  
   `computer_use: align foreground and typed-browser escalation with cua-driver 0.9.0`  
   - 关注点是 computer_use 在新驱动版本下的前台/升级策略是否仍然符合预期。  
   - 说明社区对 **自动化执行链路的可证据化、可升级性** 非常敏感。  

3. **[Issue #67648](https://github.com/nousresearch/hermes-agent/issues/67648)**（已关闭）  
   `RFC: bundle Perseus Vault as an official memory provider`  
   - 反映出用户希望 Hermes 在 memory provider 上提供更“官方化”的集成选择。  
   - 本质上是对 **记忆层稳定性、产品化入口和供应链整合** 的诉求。  

4. **[Issue #67644](https://github.com/nousresearch/hermes-agent/issues/67644)**（已关闭）  
   `Desktop app: chat history lost when switching tabs/sessions`  
   - 说明 Desktop 的会话/历史状态管理仍是高敏感区。  
   - 用户最关心的是 **“切换后不丢历史、不丢上下文”**。  

### 与热点直接相关的 PR
- **[PR #67834](https://github.com/nousresearch/hermes-agent/pull/67834)**：`feat(desktop): show running session cost in the desktop status bar`  
- **[PR #67823](https://github.com/nousresearch/hermes-agent/pull/67823)**：`fix(desktop): scope restored navigation by profile (#67709)`  
- **[PR #67813](https://github.com/nousresearch/hermes-agent/pull/67813)**：`fix(computer_use): align foreground and bring_to_front with cua-driver 0.9.0`  

> 热点总结：社区并不是只在“要新功能”，而是在持续要求 Hermes 把 **会话、状态、驱动、计费、身份边界** 做成可预测、可恢复、可审计的系统行为。  

---

## 4. Bug 与稳定性
### 最高优先级：安全/完整性风险
1. **[Issue #67723](https://github.com/nousresearch/hermes-agent/issues/67723)**  
   `CRITICAL: workspaceClosure path-traversal in fix(nix)`  
   - 这是一个明显的 **路径穿越安全风险**，尽管标签里标了 `invalid`，但问题描述本身属于高危安全边界。  
   - **当前未看到对应 fix PR**。  

### P2 级别：核心流程回归 / 数据错误
2. **[Issue #67781](https://github.com/nousresearch/hermes-agent/issues/67781)**  
   `Daily 4AM session_reset resurrected by stale-route recovery`  
   - 这是典型的 **会话复活 / 状态回收失效**，直接导致应被清空的上下文被重新带回，伴随成本持续累积。  
   - **当前未看到对应 fix PR**。  

3. **[Issue #67709](https://github.com/nousresearch/hermes-agent/issues/67709)**  
   `Desktop cold-start restore can resume a session into the wrong profile and create duplicate session IDs`  
   - 属于 **profile 作用域错误 + session ID 重复**，会影响桌面端启动恢复的可信度。  
   - **已有修复 PR：[#67823](https://github.com/nousresearch/hermes-agent/pull/67823)**。  

4. **[Issue #67783](https://github.com/nousresearch/hermes-agent/issues/67783)**  
   `computer_use: align foreground and typed-browser escalation with cua-driver 0.9.0`  
   - 驱动升级后的契约漂移，容易引发自动化执行误判。  
   - **已有修复 PR：[#67813](https://github.com/nousresearch/hermes-agent/pull/67813)**。  

5. **[Issue #67821](https://github.com/nousresearch/hermes-agent/issues/67821)**  
   `Desktop: provider base URL / API key saved in Settings should apply to live sessions immediately`  
   - 这是配置热更新问题，影响 **已打开会话** 的立即生效。  
   - **当前未看到对应 fix PR**。  

6. **[Issue #67764](https://github.com/nousresearch/hermes-agent/issues/67764)**  
   `cost_status overwritten on every API call across SQL, in-memory, and /insights aggregations`  
   - 属于 **计费状态被“最近一次调用覆盖”** 的数据完整性问题，会误导用户对真实消耗的判断。  
   - **当前未看到对应 fix PR**。  

7. **[Issue #67762](https://github.com/nousresearch/hermes-agent/issues/67762)**  
   `agent.session_estimated_cost_usd resets to $0 on gateway restart`  
   - gateway 重启后估算成本清零，是明显的 **状态重建缺陷**。  
   - **当前未看到对应 fix PR**。  

### P3 / 兼容性 / 交互退化
8. **[Issue #67705](https://github.com/nousresearch/hermes-agent/issues/67705)**  
   `Codex commentary streaming emits output_item.added + done with no output_text.delta events`  
   - 这是 **OpenAI Responses API 流式契约违规**，会影响客户端兼容。  
   - **当前未看到对应 fix PR**。  

9. **[Issue #67732](https://github.com/nousresearch/hermes-agent/issues/67732)**  
   `macOS: sudo gateway install writes plist to /var/root...`  
   - 安装路径/launchd 行为异常，容易造成“看似安装成功但其实退化到 root-run”的隐患。  
   - **当前未看到对应 fix PR**。  

10. **[Issue #67817](https://github.com/nousresearch/hermes-agent/issues/67817)**  
    `Telegram fails to connect: 'HTTPXRequest' object attribute 'do_request' is read-only`  
    - 这是插件/依赖版本兼容性断裂。  
    - **当前未看到对应 fix PR**。  

---

## 5. 功能请求与路线图信号
1. **[Issue #67798](https://github.com/nousresearch/hermes-agent/issues/67798)**  
   `Make lifecycle hooks a shared runtime contract across all execution surfaces`  
   - 这是今天最强的路线图信号之一。  
   - 它意味着 Hermes 正在尝试把“事件 hooks”从单一 gateway 逻辑上升为 **全运行时契约**。  
   - 若推进，可能影响 agent / cli / gateway / tui / cron / plugins / desktop 的统一设计。  

2. **[Issue #67765](https://github.com/nousresearch/hermes-agent/issues/67765)** + **[PR #67834](https://github.com/nousresearch/hermes-agent/pull/67834)**  
   `Show running session cost in the desktop status bar`  
   - 这是典型的“高感知 UX + 计费透明化”需求。  
   - 由于已有 draft PR，**进入下一版本候选的概率较高**。  

3. **[Issue #67820](https://github.com/nousresearch/hermes-agent/issues/67820)** + **[PR #67820](https://github.com/nousresearch/hermes-agent/pull/67820)**  
   `support custom API session sources`  
   - 这是面向多入口/多来源会话治理的能力，适合 API Server 与 Desktop 统一。  
   - 如果实现稳定，可能成为 **下一轮平台能力增强**。  

4. **[Issue #67803](https://github.com/nousresearch/hermes-agent/issues/67803)**  
   `Add VOICEVOX-compatible engine as a built-in TTS provider`  
   - 说明社区在推动更强的本地化 TTS 能力，尤其是日语场景。  
   - 这类功能更偏“差异化能力”，短期未必进入核心线，但有明确需求基础。  

5. **[Issue #67699](https://github.com/nousresearch/hermes-agent/issues/67699)**  
   `delegate_task should pass env vars or accept a profile parameter`  
   - 指向子代理环境隔离和 profile 传递能力。  
   - 这是 **多代理/多上下文编排** 方向的重要信号。  

6. **[Issue #67831](https://github.com/nousresearch/hermes-agent/issues/67831)**  
   `clarify Qwen Cloud PAYG billing lane`  
   - 反映出用户在 provider 选择和计费模型上需要更清晰的产品语义。  
   - 若后续配合文档和 UI 改进，可能被纳入提供商配置体验优化。  

---

## 6. 用户反馈摘要
- **会话不能丢、不能串号**：用户最不能接受的是切 tab、冷启动、重连后历史丢失或恢复到错误 profile。相关反馈见 **[Issue #67644](https://github.com/nousresearch/hermes-agent/issues/67644)**、**[Issue #67709](https://github.com/nousresearch/hermes-agent/issues/67709)**、**[PR #67823](https://github.com/nousresearch/hermes-agent/pull/67823)**。  
- **计费必须透明且持久化**：用户希望看到实时成本，并且 gateway 重启后不应清零或被覆盖。相关反馈见 **[Issue #67764](https://github.com/nousresearch/hermes-agent/issues/67764)**、**[Issue #67762](https://github.com/nousresearch/hermes-agent/issues/67762)**、**[Issue #67765](https://github.com/nousresearch/hermes-agent/issues/67765)**。  
- **消息/插件集成不能“静默失败”**：Telegram、Discord、Codex streaming 等边缘集成一旦协议或权限出问题，就会直接影响用户工作流。相关反馈见 **[Issue #67702](https://github.com/nousresearch/hermes-agent/issues/67702)**、**[Issue #67817](https://github.com/nousresearch/hermes-agent/issues/67817)**、**[Issue #67705](https://github.com/nousresearch/hermes-agent/issues/67705)**。  
- **自动化执行要可升级、可验证**：computer_use 与驱动版本契约不一致会让用户对自动化可靠性失去信心。相关反馈见 **[Issue #67783](https://github.com/nousresearch/hermes-agent/issues/67783)**、**[PR #67813](https://github.com/nousresearch/hermes-agent/pull/67813)**。  
- **配置修改应该即时生效**：桌面端保存 API key / base URL 后，用户期待现有会话立即切换到新配置，而不是等新会话才生效。相关反馈见 **[Issue #67821](https://github.com/nousresearch/hermes-agent/issues/67821)**。  

---

## 7. 待处理积压
### 值得优先 triage 的未结 Issue
- **[Issue #67723](https://github.com/nousresearch/hermes-agent/issues/67723)**：Nix `workspaceClosure` 路径穿越安全风险  
- **[Issue #67781](https://github.com/nousresearch/hermes-agent/issues/67781)**：daily session reset 被 stale-route 恢复“复活”  
- **[Issue #67764](https://github.com/nousresearch/hermes-agent/issues/67764)**：`cost_status` 被每次 API 调用覆盖  
- **[Issue #67762](https://github.com/nousresearch/hermes-agent/issues/67762)**：gateway 重启后估算成本清零  
- **[Issue #67732](https://github.com/nousresearch/hermes-agent/issues/67732)**：macOS sudo 安装写错 launchd 位置  
- **[Issue #67705](https://github.com/nousresearch/hermes-agent/issues/67705)**：Codex commentary streaming 协议不一致  
- **[Issue #67821](https://github.com/nousresearch/hermes-agent/issues/67821)**：Desktop 保存设置后不立即影响 live session  
- **[Issue #67817](https://github.com/nousresearch/hermes-agent/issues/67817)**：Telegram 插件兼容性断裂  

### 值得尽快审阅的开放 PR
- **[PR #67835](https://github.com/nousresearch/hermes-agent/pull/67835)**：Desktop Update 安装流程补上 browser stage  
- **[PR #67834](https://github.com/nousresearch/hermes-agent/pull/67834)**：Desktop 状态栏显示运行中 session cost（draft）  
- **[PR #67831](https://github.com/nousresearch/hermes-agent/pull/67831)**：Qwen Cloud PAYG 计费线澄清  
- **[PR #67827](https://github.com/nousresearch/hermes-agent/pull/67827)**：secrets scope miss 时回退到 `os.environ`  
- **[PR #67816](https://github.com/nousresearch/hermes-agent/pull/67816)**：Telegram group allowlist fallback + command sender identity  
- **[PR #67814](https://github.com/nousresearch/hermes-agent/pull/67814)**：依赖漏洞 floor 提升  
- **[PR #67823](https://github.com/nousresearch/hermes-agent/pull/67823)**：Desktop profile-scoped restore  
- **[PR #67813](https://github.com/nousresearch/hermes-agent/pull/67813)**：computer_use 驱动契约修正  

> 积压判断：当前 backlog 的“高风险项”主要集中在 **安全、状态恢复、计费准确性、消息传递** 四类，建议维护者优先 triage 这些会直接影响用户信任度和生产可用性的议题。  

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发群/Slack 的短版摘要**，或  
2. **适合内部周报的表格版（含优先级、是否有修复 PR、影响面）**。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报｜2026-07-20

## 1. 今日速览
过去 24 小时，PicoClaw 以“问题反馈驱动”为主：Issues 更新 3 条，其中 2 条为新增/活跃问题，1 条已关闭；PR 仅 1 条处于待合并状态，未见新版本发布。整体看，项目今天的活跃度 **中等偏低**，代码合并推进有限，但问题暴露集中且指向明确。当前最值得关注的是 **MCP 连接失败导致 agent loop 挂死** 的高影响稳定性问题，已经直接影响聊天回复链路。与此同时，`exec` 工具参数默认值、微信通道图片处理等问题也说明项目正在修补工具契约与多通道边界场景。整体健康度判断：**功能推进放缓，稳定性和兼容性修复优先级上升**。

---

## 2. 项目进展
**今日没有合并或关闭的重要 PR。**

- 当前唯一活跃 PR 为 **[#3267 - fix scope bug for refresh agy token](https://github.com/sipeed/picoclaw/pull/3267)**，仍处于开放待审状态。
- 这条 PR 指向认证/令牌刷新链路中的 scope 传递问题，若合并，将有助于降低 `antigravity` 场景下的刷新失败率与鉴权报错。

**阶段性判断：**
- 今日代码层面的“已落地推进”较少；
- 但从 PR 方向看，项目正在继续处理 **鉴权稳定性** 与 **调用链健壮性**，属于对核心可用性的修补，而非新增大功能。

---

## 3. 社区热点
今日没有出现“高评论数”或“高反应数”的热帖，所有最新 Issues/PR 的评论与点赞均为 0，说明社区讨论还没有形成明显发酵。

### 关注度最高的议题（按问题影响度而非评论数）
1. **[#3269 - MCP server connection fails, agent loop hangs](https://github.com/sipeed/picoclaw/issues/3269)**  
   - 诉求：当 MCP server 连接失败时，agent loop 不应卡死，聊天界面应继续可用或优雅降级。
   - 背后需求：用户希望 **主对话链路与外部工具链解耦**，不要因为工具层失败导致整机“失声”。

2. **[#3268 - exec tool action should default to "run"](https://github.com/sipeed/picoclaw/issues/3268)**  
   - 诉求：`exec` 工具的 `action` 参数不应强制必填，默认值应为 `run`。
   - 背后需求：用户希望工具调用对 LLM 更宽容，减少因 schema 约束过严引发的失败。

3. **[#3267 - fix scope bug for refresh agy token](https://github.com/sipeed/picoclaw/pull/3267)**  
   - 虽然是 PR 而非讨论帖，但它反映出社区/维护者当前关注的是 **登录态刷新失败** 这一类底层可用性问题。

---

## 4. Bug 与稳定性
按严重程度排序如下：

### 高：MCP 连接失败会挂死 agent loop
- **[#3269 - [BUG] If the MCP server connection fails, the agent loop will hang](https://github.com/sipeed/picoclaw/issues/3269)**
- 影响：聊天接口可能停止响应用户，属于直接影响核心可用性的故障。
- 风险判断：高。因为它不是单点工具失败，而是会拖垮整个 agent 循环。
- Fix PR：**当前数据未显示对应 fix PR**。

### 中高：`exec` 工具 `action` 不应强制必填
- **[#3268 - [Bug]: exec tool action parameter should default to "run"](https://github.com/sipeed/picoclaw/issues/3268)**
- 影响：LLM 工具调用可能因缺省参数而失败，导致执行链不稳定。
- 风险判断：中高。问题本身不一定崩溃，但会显著影响工具成功率与体验一致性。
- Fix PR：**当前数据未显示对应 fix PR**。

### 中：微信通道给非视觉模型传图导致前置报错
- **[#3266 - [BUG] Weixin channel passes images to non-vision model](https://github.com/sipeed/picoclaw/issues/3266)**
- 影响：用户在图片处理流程中先看到模型报错，破坏交互体验，也暴露通道与模型能力判断不足。
- 风险判断：中。属于跨通道兼容性问题，已影响实际用户场景。
- Fix PR：**未见对应 fix PR 信息**；该 Issue 已关闭，说明问题可能已通过直接修复或关联提交处理。

---

## 5. 功能请求与路线图信号
今日没有看到明确的“新功能”型需求，更多是 **API/工具契约优化** 与 **健壮性增强** 的信号。

### 值得关注的路线图信号
- **[#3268](https://github.com/sipeed/picoclaw/issues/3268)** 暗示：工具 schema 需要更符合 LLM 常见调用习惯。  
  这类改动通常 **低破坏性、收益直接**，很可能进入下一轮小版本修复包。
- **[#3267](https://github.com/sipeed/picoclaw/pull/3267)** 暗示：认证刷新链路仍在打磨。  
  如果该 PR 合并，说明短期路线图更偏向 **鉴权、会话、token 刷新** 等基础设施稳定性，而不是新增 AI 能力。

**判断：**
- 下一版本更可能优先吸收的是 **兼容性修正、默认值优化、失败降级** 这类“体验型修复”。
- 目前尚未看到明确指向新能力扩展的大需求。

---

## 6. 用户反馈摘要
由于本日报告中的 Issues/PR **评论数均为 0**，用户反馈主要来自首发问题描述，而不是长讨论线程。可以提炼出以下真实痛点：

1. **用户不接受“工具失败导致对话全挂”**  
   - 来源：[#3269](https://github.com/sipeed/picoclaw/issues/3269)
   - 场景：MCP 服务不可达或断连时，用户仍希望聊天可继续运行，至少应给出降级提示，而不是静默卡死。

2. **用户希望工具调用更容错**  
   - 来源：[#3268](https://github.com/sipeed/picoclaw/issues/3268)
   - 场景：LLM 常见调用会省略冗余字段，`exec` 工具若强制要求 `action`，会放大调用失败率。

3. **用户期望多模态处理按模型能力自动分流**  
   - 来源：[#3266](https://github.com/sipeed/picoclaw/issues/3266)
   - 场景：在微信/ iLink 等通道收到图片时，系统应先判断当前模型是否支持视觉输入，再决定是否转发给 LLM。

**满意/不满意点：**
- 满意点：项目明显在处理真实场景下的问题，且问题定位较具体。
- 不满意点：部分核心链路在异常状态下缺少兜底，用户体验容易被单点故障打断。

---

## 7. 待处理积压
根据当前数据，**真正长期未响应的历史积压项无法从样本中直接判断**；但从“尚未关闭且无评论”的状态看，以下项目值得维护者尽快处理：

1. **[#3269 - MCP 断连导致 agent loop 挂死](https://github.com/sipeed/picoclaw/issues/3269)**  
   - 优先级建议：最高
   - 原因：直接影响聊天主链路，属于可用性红线。

2. **[#3268 - exec 默认参数问题](https://github.com/sipeed/picoclaw/issues/3268)**  
   - 优先级建议：高
   - 原因：影响工具调用成功率，且修复成本可能较低。

3. **[#3267 - token refresh scope bug PR](https://github.com/sipeed/picoclaw/pull/3267)**  
   - 优先级建议：尽快 review/merge
   - 原因：认证刷新问题若不尽快合并，会持续影响相关使用场景。

---

如果你希望，我还可以把这份日报再整理成：
1. **更适合邮件/飞书推送的精简版**，或  
2. **适合周报归档的表格版**。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

以下为 **NanoClaw（github.com/qwibitai/nanoclaw）2026-07-20 项目动态日报**。  
整体来看，项目今天呈现出**“活跃提案多、落地变更少”**的状态：过去 24 小时有 **2 条 Issues** 和 **5 条 PR** 更新，但**没有新版本发布，也没有 PR 合并/关闭**。从内容上看，社区与维护者的关注点高度集中在 **可扩展性、MCP 集成、聊天交互体验、审批可见性** 等核心方向，说明项目仍处于持续打磨平台能力的阶段。当前健康度偏积极，但由于缺少合并与发布，今天的进展主要体现在**待审变更积累**而非已交付成果。

---

## 1. 今日速览

- 过去 24 小时内，NanoClaw 新增/活跃 **2 个 Issue**、**5 个 PR**，整体更新频率不低，说明项目仍保持较强的开发热度。
- 但今天**没有任何 PR 合并/关闭，也没有版本发布**，因此“可见产出”暂时仍停留在待审阶段。
- 今日新增需求主要围绕两条主线展开：**让 NanoClaw 更易扩展（host hooks、技能自动学习）**，以及**提升运行稳定性和交互体验（Telegram、Chat、模板、审批）**。
- 综合判断：项目处于**活跃讨论 + 持续提交**状态，健康度良好，但需要尽快把待办 PR 转化为合并成果，才能形成版本推进。

相关链接：
- Issues 列表：<https://github.com/qwibitai/nanoclaw/issues>
- PR 列表：<https://github.com/qwibitai/nanoclaw/pulls>

---

## 2. 版本发布

**今日无新版本发布**，因此本日不涉及版本说明、破坏性变更或迁移注意事项。

---

## 3. 项目进展

### 今日无已合并/关闭的重要 PR
今天的 5 个 PR 均为 **Open** 状态，因此严格意义上讲，**没有“已落地”的项目进展**。  
不过，从 PR 主题看，项目正在并行推进以下能力：

1. **远程 MCP 能力扩展**
   - PR：**feat: support remote Streamable HTTP MCP servers**
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/3092>
   - 意义：如果合并，将显著增强 NanoClaw 对远程 MCP 服务的接入能力，提升部署灵活性与生态兼容性。

2. **聊天交互体验优化**
   - PR：**fix(chat): keep typing active for processing turns**
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/3093>
   - 意义：改善“处理过程中 typing 状态提前结束”的体验问题，有助于降低用户对“卡住/无响应”的感知。

3. **Telegram 集成稳定性修复**
   - PR：**fix(telegram): retry transient bot identity lookup**
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/3094>
   - 意义：针对短暂性身份查询失败加入重试机制，偏向稳定性与容错增强。

4. **模板上下文 Markdown 顺序修正**
   - PR：**fix(templates): prepend all top-level context Markdown**
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/3090>
   - 意义：修复模板上下文拼接顺序问题，直接影响 prompt/上下文质量。

5. **审批列表可见性增强**
   - PR：**feat(ncl): surface unknown-sender holds in `ncl approvals list`**
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/3088>
   - 意义：把原本隐藏的 unknown-sender 审批项纳入 CLI 可见范围，提升运维可操作性。

### 今日“前进了多少”？
- **已交付：0**
- **待合并改进：5**
- 结论：项目今天的前进主要体现在**方案成熟度与待发布内容积累**，而不是已上线结果。

---

## 4. 社区热点

> 说明：本日所有 Issues/PR 的评论数均为 0 或未提供，反应数也几乎为 0，因此“热点”更多来自**提案方向和提交集中度**，而非讨论热度。

### 热点 1：让 NanoClaw 更可扩展的“host hooks”
- Issue：**Feature request: standardize composable host extension hooks for skills (hosthooks)**
- 链接：<https://github.com/qwibitai/nanoclaw/issues/3091>
- 关注点：当前社区技能若要改动 host/runner 行为，往往需要直接 patch 源码；该提案希望通过标准化 hook 降低冲突与维护成本。
- 背后诉求：**多技能共存、减少对核心代码的字符串级修改、提升可组合性**。

### 热点 2：Agent 自主学习技能
- Issue：**Feature request: agent-driven skill learning, let NanoClaw create and refine its own skills from experience**
- 链接：<https://github.com/qwibitai/nanoclaw/issues/3089>
- 关注点：希望 NanoClaw 能基于重复任务经验自动生成/优化 skills。
- 背后诉求：**减少人工编写技能的成本，让系统更接近“自我演化”的个人 AI 助手平台**。

### 热点 3：远程 MCP 接入
- PR：**feat: support remote Streamable HTTP MCP servers**
- 链接：<https://github.com/qwibitai/nanoclaw/pull/3092>
- 关注点：打通远程 Streamable HTTP MCP servers，意味着 NanoClaw 的工具/能力接入方式更加开放。
- 背后诉求：**面向外部服务、远程部署与更广泛工具生态**。

### 热点判断
- 今天的“热”主要是**架构方向热**，不是“争议讨论热”。
- 两个 Issue 指向未来平台能力，三个以上 PR 指向稳定性/体验修复，说明社区关注点较聚焦，且偏实用。

---

## 5. Bug 与稳定性

> 说明：今天没有新提交的 bug 报告型 Issue；以下内容主要来自“修复类 PR”，属于**潜在或已识别问题的修复方向**，尚未确认合并生效。

### 高优先级
1. **Telegram bot identity lookup 短暂失败**
   - PR：<https://github.com/qwibitai/nanoclaw/pull/3094>
   - 风险：可能影响 Telegram 集成在不稳定网络/接口抖动时的可用性。
   - 状态：**已有 fix PR，待审**

### 中优先级
2. **Chat 处理过程中 typing 状态提前结束**
   - PR：<https://github.com/qwibitai/nanoclaw/pull/3093>
   - 风险：影响对话体验，容易让用户误以为系统停止响应。
   - 状态：**已有 fix PR，待审**

3. **模板顶层上下文 Markdown 顺序问题**
   - PR：<https://github.com/qwibitai/nanoclaw/pull/3090>
   - 风险：可能影响 prompt 上下文组织与最终生成质量。
   - 状态：**已有 fix PR，待审**

### 低到中优先级
4. **unknown-sender holds 在审批列表中不可见**
   - PR：<https://github.com/qwibitai/nanoclaw/pull/3088>
   - 风险：更偏操作性/可维护性问题，影响审批流程的可观测性。
   - 状态：**已有功能性修复 PR，待审**

### 总结
- 今日未见明显崩溃/回归型 Issue 暴露。
- 当前稳定性信号主要来自 PR 修复，说明项目在做**主动性收敛**，但还没有形成“已确认修复”的闭环。

---

## 6. 功能请求与路线图信号

今天最明确的路线图信号有两条：

### 方向 A：平台可扩展性
- Issue：**标准化 composable host extension hooks**
- 链接：<https://github.com/qwibitai/nanoclaw/issues/3091>
- 含义：这是在为“多技能并存、少冲突、少 patch”铺路。
- 判断：**很可能进入下一阶段重点讨论/实现**，因为它直接关系到 NanoClaw 作为可组合 AI 平台的基础设计。

### 方向 B：Agent 自主学习与技能生成
- Issue：**agent-driven skill learning**
- 链接：<https://github.com/qwibitai/nanoclaw/issues/3089>
- 含义：从“手工安装技能”走向“代理自动沉淀技能”。
- 判断：属于**中长期路线图信号**，若项目目标是个人 AI 助手平台，这条需求与愿景高度一致。

### 与现有 PR 的联动判断
- **PR #3092（远程 MCP）**：很可能成为下一版本的基础能力之一，因为它直接拓宽工具接入边界。
- **PR #3088（审批可见性）**：更像是配套运营能力，通常容易被纳入近期版本。
- **PR #3093/#3094/#3090**：修复类 PR，若测试通过，通常也更容易先于大功能合并。

### 结论
最有可能被纳入下一版本的内容是：
1. **远程 MCP 支持**
2. **聊天与 Telegram 稳定性修复**
3. **审批可见性增强**
4. **模板上下文修正**

而 **host hooks / 自主学习技能** 更像是**战略级功能提案**，可能进入后续版本规划或架构预研。

---

## 7. 用户反馈摘要

> 说明：本日 Issues/PR 均无评论，因此以下为基于标题与摘要提炼的“隐含用户反馈”，不代表真实对话内容。

### 主要痛点
- **技能扩展太依赖手工 patch**
  - 反馈来源：<https://github.com/qwibitai/nanoclaw/issues/3091>
  - 真实场景：用户希望接入自定义能力时，不想直接改核心源码。

- **技能创建成本高，缺乏自动沉淀机制**
  - 反馈来源：<https://github.com/qwibitai/nanoclaw/issues/3089>
  - 真实场景：重复执行的任务很多，但每次都要人工写 skill，效率低。

- **Telegram 集成偶发不稳定**
  - 反馈来源：<https://github.com/qwibitai/nanoclaw/pull/3094>
  - 真实场景：外部消息渠道的身份查找抖动会直接影响使用体验。

- **聊天处理态反馈不连续**
  - 反馈来源：<https://github.com/qwibitai/nanoclaw/pull/3093>
  - 真实场景：用户在等待模型处理时，需要持续的“正在工作”信号。

- **审批与持有状态不够透明**
  - 反馈来源：<https://github.com/qwibitai/nanoclaw/pull/3088>
  - 真实场景：运维/审批链路中的隐藏状态会造成排查困难。

### 用户满意点
- 用户明显认可 NanoClaw 的**可扩展代理框架定位**，否则不会集中提出 hooks、skills、MCP 等平台级需求。
- 这说明项目已经具备“可被拿来继续做平台”的吸引力。

### 用户不满意点
- 目前仍存在**“要改核心、要懂内部实现”**的门槛。
- 一些交互信号与状态可见性还不够完善，影响“像产品一样稳定”的感受。

---

## 8. 待处理积压

> 基于当前数据，这些条目都在 2026-07-19 创建/更新，**不属于长期积压**；但它们是当前最需要维护者关注的待处理项。

### 待处理 Issue
1. **#3091 Feature request: standardize composable host extension hooks for skills (hosthooks)**
   - 链接：<https://github.com/qwibitai/nanoclaw/issues/3091>
   - 价值：平台扩展架构核心问题，建议优先评估技术方案。

2. **#3089 Feature request: agent-driven skill learning**
   - 链接：<https://github.com/qwibitai/nanoclaw/issues/3089>
   - 价值：关系到 NanoClaw 的长期产品愿景，建议进入路线图讨论。

### 待处理 PR
1. **#3094 fix(telegram): retry transient bot identity lookup**
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/3094>

2. **#3093 fix(chat): keep typing active for processing turns**
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/3093>

3. **#3092 feat: support remote Streamable HTTP MCP servers**
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/3092>

4. **#3090 fix(templates): prepend all top-level context Markdown**
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/3090>

5. **#3088 feat(ncl): surface unknown-sender holds in `ncl approvals list`**
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/3088>

### 维护提醒
- 当前 backlog 的特点是：**方向明确、数量不大、但都较关键**。
- 建议优先处理：
  1. **稳定性修复类 PR**
  2. **远程 MCP 能力**
  3. **审批/可观测性增强**
- 这样既能尽快产出可见收益，也能为后续大范围扩展打基础。

---

如果你愿意，我可以把这份日报进一步整理成：
1. **适合直接发群的简版**，或  
2. **带“风险等级 / 优先级 / 负责人建议”的运维版日报**。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-07-20）

## 1) 今日速览
今天 IronClaw 仍处于**高强度工程推进**状态：过去 24 小时内有 **4 条 Issues 更新**、**41 条 PR 更新**，其中 **32 条 PR 已合并/关闭**，说明主线开发推进非常快。  
从内容上看，今天的重心明显落在 **reborn 架构重构、turn-state 存储收敛、错误可恢复性、以及本地开发/REPL 体验** 四条线上。  
项目没有新版本发布，但这并不代表停滞，反而更像是**在做大版本前的核心收束与稳定化**。  
需要注意的是，Issue 侧**今日无关闭**，说明新问题或持续讨论仍在进入队列，维护节奏偏“开发驱动”，而不是“问题清空驱动”。  

---

## 2) 版本发布
**今日无新 Release。**  
- 最新 Releases：无

---

## 3) 项目进展
今日 PR 侧的推进，核心可以概括为：**把架构重构从“可运行”推进到“可收敛、可验证、可交付”**。

### 关键已关闭/落地 PR
1. **能力结果模型继续收敛，关键架构翻转完成**
   - PR [#6299](https://github.com/nearai/ironclaw/pull/6299)  
     `CapabilityOutcome` / mirror DTO 继续被压缩到 `host_api::Resolution`，属于 §5.3 Slice C 的收官式整合。
   - PR [#6293](https://github.com/nearai/ironclaw/pull/6293)  
     producers 直接输出 `Resolution`，删除 `CapabilityOutcome`，意味着旧的中间抽象基本被清掉。
   - PR [#6287](https://github.com/nearai/ironclaw/pull/6287)  
     loop-facing result 完成 atomic flip，是这一条线上的关键节点。

2. **turn-state 存储收敛进入“可验证修复”阶段**
   - PR [#6295](https://github.com/nearai/ironclaw/pull/6295)  
     crash-consistency chaos suite 上线，并修复了它暴露的两个真实 crash-recovery 缺陷。
   - PR [#6281](https://github.com/nearai/ironclaw/pull/6281)  
     turn-state row store 的性能/争用优化，去掉冗余 global commit_gate。
   - PR [#6298](https://github.com/nearai/ironclaw/pull/6298)（开放中）  
     async write-behind durability mode 正在补齐收敛的最后一块能力拼图。

3. **编译期开关大幅清理，降低维护复杂度**
   - PR [#6296](https://github.com/nearai/ironclaw/pull/6296)  
     删除 14 个 compile-time features，约 1,100 个 `cfg` 站点被解除 gating。  
     这类改动对后续构建、测试、理解成本的收益很大，是“降复杂度”的实质进展。

4. **部署/组合配置开始从“配置名”转向“配置数据”**
   - PR [#6282](https://github.com/nearai/ironclaw/pull/6282)  
     `RebornBuildInput` 直接携带 `DeploymentConfig`，为 composition 配置主线铺路。

5. **文档、测试与 onboarding 体验继续推进**
   - PR [#6294](https://github.com/nearai/ironclaw/pull/6294)  
     缩短 onboarding quick start，降低首次使用门槛。
   - PR [#6297](https://github.com/nearai/ironclaw/pull/6297)（开放中）  
     onboard launcher / REPL / Web UI 启动体验继续增强。
   - PR [#6289](https://github.com/nearai/ironclaw/pull/6289)（开放中）  
     REPL 增加 thinking spinner 和 markdown 渲染，偏用户可感知体验优化。
   - PR [#6292](https://github.com/nearai/ironclaw/pull/6292)  
     freeze facade method set，用测试锁定 API 面，减少回归面。

### 今日整体推进量化判断
- **主干架构重构继续前进**，且已经从“拆旧代码”进入“收尾 + 回归防护”阶段。
- **稳定性工程明显增强**：不仅修问题，还开始用 chaos suite 和回归测试把问题“钉死”。
- **用户体验线同步推进**：onboarding、REPL、错误提示都在补齐，说明项目正在从“工程可用”走向“体验可用”。

---

## 4) 社区热点
### 最活跃的 Issues
1. **Issue [#6263](https://github.com/nearai/ironclaw/issues/6263)**  
   `[refactoring, reborn] §4.3 final store consolidation: retire InMemoryTurnStateStore...`  
   - 评论数：**9**（今日 Issues 中最高）
   - 关注点：turn-state 存储最后一块 InMemoryStore 债务收口
   - 背后诉求：**删旧架构、减少内存态与持久态分叉、确保不 livelock 且可证明安全**

2. **Issue [#6274](https://github.com/nearai/ironclaw/issues/6274)**  
   `Finish DeploymentConfig as the main composition config`
   - 评论数：2
   - 关注点：让 `DeploymentConfig` 成为真正主组合配置
   - 背后诉求：**配置数据化、减少 profile 名称派生、降低组合层重复逻辑**

### 其他值得关注的热点
3. **Issue [#6284](https://github.com/nearai/ironclaw/issues/6284)**  
   `error-recoverability endgame`
   - 评论数：0，但主题非常关键
   - 背后诉求：**模型能看到错误、理解原因、并获得可操作的恢复机会**  
   这是典型的“系统可恢复性”诉求，不是单点 bug，而是产品级可靠性要求。

4. **Issue [#6290](https://github.com/nearai/ironclaw/issues/6290)**  
   `Invalid value (attachments.mime_type) when sending/generating PDF files`
   - 评论数：0
   - 背后诉求：**PDF 文件发送/生成路径稳定性**，属于直接影响用户工作流的高价值 bug。

### PR 层面的热点判断
- 今日 PR 没有给出统一评论/反应统计，因此无法严格按“评论数最多”排序。  
- 但从内容影响面看，最受关注的主线是：
  - [#6295](https://github.com/nearai/ironclaw/pull/6295) crash-consistency + 两个真实缺陷修复
  - [#6296](https://github.com/nearai/ironclaw/pull/6296) 大规模 feature cleanup
  - [#6293](https://github.com/nearai/ironclaw/pull/6293) capability-result collapse
  - [#6297](https://github.com/nearai/ironclaw/pull/6297) onboarding launcher / Web UI
  - [#6301](https://github.com/nearai/ironclaw/pull/6301) 运行失败消息收敛
  - [#6302](https://github.com/nearai/ironclaw/pull/6302) stream retry 后保留已完成回复

---

## 5) Bug 与稳定性
以下按“对用户影响 + 风险程度”排序：

### 1. PDF 发送/生成失败：`attachments.mime_type` 无效
- Issue [#6290](https://github.com/nearai/ironclaw/issues/6290)
- 严重性：**中高**
- 影响：直接影响 PDF 文件发送/生成，属于用户可见的功能故障
- 当前状态：**尚未看到对应 fix PR**
- 备注：这类问题往往意味着附件处理链路、文件识别或工具依赖配置存在缺口

### 2. 运行错误可恢复性不足（系统性稳定性风险）
- Issue [#6284](https://github.com/nearai/ironclaw/issues/6284)
- 严重性：**高**
- 影响：如果 mid-run 错误不能被模型感知/恢复，会造成任务失败、重试无效或上下文丢失
- 当前状态：**有明显推进，但仍在整理设计/实现收口**
- 相关修复/支撑 PR：
  - [#6295](https://github.com/nearai/ironclaw/pull/6295) 已修复其测试套件暴露的两个 crash-recovery 缺陷
  - [#6291](https://github.com/nearai/ironclaw/pull/6291) 正在把 recoverability contract 纳入设计文档与实现状态

### 3. turn-state 存储一致性与 crash recovery
- Issue [#6263](https://github.com/nearai/ironclaw/issues/6263)
- 严重性：**高**
- 影响：turn-state 是对话/执行状态的核心基础设施，若收敛不彻底会引入 livelock、恢复不一致、写入语义复杂等风险
- 当前状态：**已有大量修复与收口动作**
- 相关 fix PR：
  - [#6295](https://github.com/nearai/ironclaw/pull/6295)（chaos suite + 真实缺陷修复）
  - [#6281](https://github.com/nearai/ironclaw/pull/6281)（性能/争用优化）
  - [#6298](https://github.com/nearai/ironclaw/pull/6298)（进一步引入 async write-behind）

### 4. chat 流式错误/失败消息展示不一致
- PR [#6301](https://github.com/nearai/ironclaw/pull/6301)（开放中）
- PR [#6302](https://github.com/nearai/ironclaw/pull/6302)（开放中）
- 严重性：**中**
- 影响：用户看到重复失败提示、或者已成功回复被后续 retry 错误覆盖
- 备注：这类问题不一定导致数据损坏，但会严重影响“产品可信度”

---

## 6) 功能请求与路线图信号
从今日 Issues/PR 的组合看，下一阶段的需求信号非常清晰：

### 1. 存储与状态管理继续收敛
- 相关 Issue：[#6263](https://github.com/nearai/ironclaw/issues/6263)
- 相关 PR：[#6281](https://github.com/nearai/ironclaw/pull/6281)、[#6295](https://github.com/nearai/ironclaw/pull/6295)、[#6298](https://github.com/nearai/ironclaw/pull/6298)
- 判断：**大概率会进入下一版本主线**  
  因为这是架构主线且已有验证/修复链条，属于必须收口的底座工作。

### 2. 错误可恢复性与“模型可见错误”能力
- 相关 Issue：[#6284](https://github.com/nearai/ironclaw/issues/6284)
- 相关 PR：[#6291](https://github.com/nearai/ironclaw/pull/6291)、[#6301](https://github.com/nearai/ironclaw/pull/6301)、[#6302](https://github.com/nearai/ironclaw/pull/6302)
- 判断：**很可能进入下一版本**  
  因为它影响的是运行稳定性与用户信任，且已经有配套修复在推进。

### 3. Composition / DeploymentConfig 成为主配置入口
- 相关 Issue：[#6274](https://github.com/nearai/ironclaw/issues/6274)
- 相关 PR：[#6282](https://github.com/nearai/ironclaw/pull/6282)
- 判断：**较高概率进入下一版本**
  配置模型一旦统一，会显著减少下游工具链重复推导。

### 4. 本地开发与首次使用体验
- 相关 PR：[#6294](https://github.com/nearai/ironclaw/pull/6294)、[#6297](https://github.com/nearai/ironclaw/pull/6297)、[#6289](https://github.com/nearai/ironclaw/pull/6289)
- 判断：**很可能作为次级优先级进入下一轮发布**
  因为它们不一定是“底座级别”，但对拉新和使用留存非常关键。

### 5. PDF/附件能力的修复
- 相关 Issue：[#6290](https://github.com/nearai/ironclaw/issues/6290)
- 判断：**建议纳入最近一个补丁版本或 hotfix**
  这是明确的用户可见 bug，处理优先级应高于一般 UX 文案优化。

---

## 7) 用户反馈摘要
从 Issue 与 PR 描述中，可以提炼出几类真实用户痛点：

### 1. “我能不能稳定地把文件发出去？”
- 来源：Issue [#6290](https://github.com/nearai/ironclaw/issues/6290)
- 反馈核心：PDF 生成/发送时报 `attachments.mime_type` 错误
- 场景：文档工作流、附件处理、自动生成内容发送
- 含义：用户对**文件类能力的稳定性**有明确要求，且容错空间很小

### 2. “第一次使用别卡在环境配置里”
- 来源：PR [#6285](https://github.com/nearai/ironclaw/pull/6285)、[#6294](https://github.com/nearai/ironclaw/pull/6294)、[#6297](https://github.com/nearai/ironclaw/pull/6297)
- 反馈核心：首次启动链路存在 token、user id、WebUI、corepack 等一串断点
- 场景：本地开发、从零启动、onboarding
- 含义：用户希望 **开箱即用**，而不是先理解一堆运行时前置条件

### 3. “错误要说清楚，还要能继续”
- 来源：Issue [#6284](https://github.com/nearai/ironclaw/issues/6284)、PR [#6301](https://github.com/nearai/ironclaw/pull/6301)
- 反馈核心：错误信息需要包含原因与可恢复路径，且不要重复展示冲突消息
- 场景：模型运行中断、stream 错误、上下文长度失败
- 含义：用户不只要“失败”，更要**失败后的行动建议**

### 4. “REPL 不能装死，输出也别像原始日志”
- 来源：PR [#6289](https://github.com/nearai/ironclaw/pull/6289)
- 反馈核心：REPL 在思考期间无反馈，且 markdown 原样输出
- 场景：交互式终端使用
- 含义：用户对**交互反馈、可见进度、可读格式**很敏感

### 5. “已完成的结果不要被后续重试噪声覆盖”
- 来源：PR [#6302](https://github.com/nearai/ironclaw/pull/6302)
- 反馈核心：final reply 已到达后，不应被 trailing retryable error 误伤
- 场景：流式返回、网络/推送异常
- 含义：用户更关心**最终结果的完整保留**，而不是协议层中间噪声

---

## 8) 待处理积压
严格来说，按当前 24 小时窗口看，**没有明显“长期未响应”的老化项**；大多数重要 Issue/PR 都是今天或昨天创建/更新的，说明维护团队响应节奏很快。  
但从“积压风险”角度，以下条目值得持续盯防：

### 高优先级未关闭 Issue
- [#6263](https://github.com/nearai/ironclaw/issues/6263) — turn-state 最后收口，涉及架构与一致性
- [#6274](https://github.com/nearai/ironclaw/issues/6274) — DeploymentConfig 成为主配置入口
- [#6284](https://github.com/nearai/ironclaw/issues/6284) — error recoverability endgame
- [#6290](https://github.com/nearai/ironclaw/issues/6290) — PDF/attachments bug

### 重要但仍开放的 PR
- [#6291](https://github.com/nearai/ironclaw/pull/6291) — recoverability contract 文档与实现状态收敛
- [#6297](https://github.com/nearai/ironclaw/pull/6297) — onboard launcher / Web UI
- [#6288](https://github.com/nearai/ironclaw/pull/6288) — Dependabot 大批依赖更新
- [#6289](https://github.com/nearai/ironclaw/pull/6289) — REPL spinner + markdown
- [#6298](https://github.com/nearai/ironclaw/pull/6298) — turn-state async write-behind
- [#6300](https://github.com/nearai/ironclaw/pull/6300) — provider_factory 回归修复
- [#6301](https://github.com/nearai/ironclaw/pull/6301) — 失败消息收敛
- [#6302](https://github.com/nearai/ironclaw/pull/6302) — 保留完成回复，避免重试尾噪覆盖

### 维护建议
- 优先处理 **[#6290](https://github.com/nearai/ironclaw/issues/6290)**，它是直接面向用户的功能故障。
- 对 **[#6263](https://github.com/nearai/ironclaw/issues/6263)** 与 **[#6284](https://github.com/nearai/ironclaw/issues/6284)** 继续保持高优先级，因为它们决定项目的长期稳定性与可恢复性。
- 若本周计划发版，建议把 **[#6300](https://github.com/nearai/ironclaw/pull/6300)**、**[#6301](https://github.com/nearai/ironclaw/pull/6301)**、**[#6302](https://github.com/nearai/ironclaw/pull/6302)** 作为“稳定性补丁组”重点看护。

---

### 总体判断
IronClaw 今日表现出典型的**“高速度重构 + 高密度稳定化”**特征：架构层在收口，用户体验层在补洞，稳定性层在用测试和 chaos suite 建立护栏。  
从健康度看，项目是**活跃且方向明确**的；唯一需要警惕的是，Issue 关闭速度仍落后于 PR 交付速度，后续要防止“重构推进很快，但用户问题积压”这种节奏失衡。

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

# Moltis 项目动态日报（2026-07-20）

> 仓库：**Moltis**（[github.com/moltis-org/moltis](https://github.com/moltis-org/moltis)）  
> 统计窗口：过去 24 小时

---

## 1) 今日速览

过去 24 小时内，Moltis 的 **Issues 与 Pull Requests 均无新增或状态变更**，社区层面的交互非常冷静。  
不过项目 **有 1 个新版本发布**，说明维护者在推进版本节奏，项目并非停滞，而是更偏向“发布驱动”而非“讨论驱动”。  
从当前数据看，**协作活跃度较低**，但**发布活跃度存在**，整体健康度可判断为“稳定、低噪声、轻量更新”。  
由于缺少 release notes、Issues 和 PR 讨论内容，今天无法识别具体功能进展或用户痛点。

相关链接：  
- 仓库主页：[Moltis](https://github.com/moltis-org/moltis)  
- Issues 列表：[Issues](https://github.com/moltis-org/moltis/issues)  
- PR 列表：[Pull Requests](https://github.com/moltis-org/moltis/pulls)  

---

## 2) 版本发布

### 新版本
- **20260719.01**  
  发布链接：[v20260719.01](https://github.com/moltis-org/moltis/releases/tag/20260719.01)

### 已知信息
当前数据仅显示版本号，**未提供 release notes / changelog**，因此无法可靠判断：
- 这次发布新增了哪些功能
- 是否包含 bug 修复或性能优化
- 是否存在破坏性变更（breaking changes）
- 是否需要用户迁移或重新配置

### 迁移注意事项
由于缺少具体说明，建议维护者或使用者重点检查：
- 是否调整了配置格式或默认值
- 是否升级了依赖导致兼容性变化
- 是否涉及 API、协议、数据结构变更

**结论：** 这是一次“已发布但说明不足”的版本更新，发布动作明确，但可解释性较弱。  
链接：[Release v20260719.01](https://github.com/moltis-org/moltis/releases/tag/20260719.01)

---

## 3) 项目进展

过去 24 小时内，**没有 PR 合并或关闭记录**，因此没有可归因的代码层推进。

### 今日的重要推进
- **无**
- **无**
- **无**

### 项目整体向前迈进了多少
从协作数据看，**代码合并进展为 0**；但从发布记录看，项目至少完成了 **1 次版本发布推进**。  
这意味着当前进展主要体现在 **发布链路**，而不是 **开发协作链路**。

相关链接：  
- PR 列表：[Pull Requests](https://github.com/moltis-org/moltis/pulls)  
- Release 列表：[Releases](https://github.com/moltis-org/moltis/releases)

---

## 4) 社区热点

过去 24 小时内，**没有活跃 Issues 或 PR**，因此不存在“评论最多”或“反应最多”的讨论热点。

### 今日最活跃讨论
- **无**

### 背后的诉求
当前没有公开讨论数据，无法识别用户关注点、争议点或功能偏好。

相关链接：  
- Issues：[https://github.com/moltis-org/moltis/issues](https://github.com/moltis-org/moltis/issues)  
- PRs：[https://github.com/moltis-org/moltis/pulls](https://github.com/moltis-org/moltis/pulls)

---

## 5) Bug 与稳定性

过去 24 小时内，**没有新增 Bug、崩溃、回归或稳定性相关 Issues**。

### 按严重程度排序
1. **严重/高危 Bug：无**
2. **中等 Bug：无**
3. **低优先级问题：无**

### 是否已有 fix PR
- **无对应问题，因此也无 fix PR 可追踪**

### 稳定性判断
从公开协作数据看，项目当前**没有明显故障信号**。  
但需要注意：**“没有报告”不等于“没有问题”**，仅能说明该时间窗内未暴露出稳定性风险。

相关链接：  
- Issues：[Issues](https://github.com/moltis-org/moltis/issues)  
- PRs：[Pull Requests](https://github.com/moltis-org/moltis/pulls)

---

## 6) 功能请求与路线图信号

过去 24 小时内，**没有新增功能需求 Issues**，也没有相关 PR 暗示路线图方向。

### 今日新功能诉求
- **无**

### 可能纳入下一版本的信号
- **无可识别信号**

### 研判
在没有 issue/PR 讨论的情况下，无法判断用户对 Agent 能力、工作流集成、记忆、工具调用或 UI/CLI 体验的偏好变化。

相关链接：  
- 功能诉求通常可从 Issues 观察：[Issues](https://github.com/moltis-org/moltis/issues)  
- 代码实现线索可从 PR 观察：[Pull Requests](https://github.com/moltis-org/moltis/pulls)

---

## 7) 用户反馈摘要

由于过去 24 小时内 **Issues 评论为 0**，当前无法从真实用户反馈中提炼痛点、使用场景或满意/不满意之处。

### 可确认的反馈结论
- **无评论数据**
- **无用户情绪信号**
- **无可提炼的场景描述**

### 解释
这通常意味着：
- 项目近期用户互动较少
- 新版本发布后尚未触发反馈
- 或社区讨论集中在其他渠道，而非 GitHub Issues

相关链接：  
- Issues：[https://github.com/moltis-org/moltis/issues](https://github.com/moltis-org/moltis/issues)

---

## 8) 待处理积压

从当前快照看，**没有长期未响应的重要 Issue 或 PR**，也没有可见积压对象。

### 今日积压情况
- **未响应重要 Issue：无**
- **未处理 PR：无**
- **长期悬而未决条目：无**

### 维护提醒
虽然今天没有显性积压，但建议维护者持续关注：
- 发布说明是否补充完整
- 新版本是否引发后续反馈
- 是否需要建立更清晰的变更日志与 issue 模板

相关链接：  
- Issues：[https://github.com/moltis-org/moltis/issues](https://github.com/moltis-org/moltis/issues)  
- PRs：[https://github.com/moltis-org/moltis/pulls](https://github.com/moltis-org/moltis/pulls)

---

## 总体结论

Moltis 在 2026-07-20 的公开协作面呈现出 **“低互动、低噪声、已有发布动作”** 的状态。  
就健康度而言，当前没有暴露明显风险；就发展活跃度而言，**代码讨论几乎静默，但版本发布仍在推进**。  
建议后续重点补充 **release notes** 和 **变更说明**，这样可以显著提升外部可观察性与用户迁移信心。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

以下为 **2026-07-20 CoPaw（agentscope-ai/QwenPaw）项目动态日报**。  
整体上看，项目今日活跃度 **中等偏高**：过去 24 小时内有 **8 条 Issue 更新**、**4 条 PR 更新**，但 **没有新版本发布**。当前社区反馈主要集中在 **稳定性、离线可用性、桌面端体验** 和 **结果呈现优化**，说明项目正处于“功能继续推进、体验与可靠性补课”的阶段。

---

## 1. 今日速览

今天的 CoPaw 主要表现为“**用户反馈驱动型活跃**”：新增和活跃的工单几乎都围绕实际使用中的阻塞问题展开，包括聊天报错、token 参数不生效、离线模式失效、Linux 桌面缩放问题等。  
与此同时，PR 侧虽然没有新版本落地，但出现了版本号 bump、配置复制、安全 allowlist CIDR、沙箱 fallback 可配置等方向，说明项目仍在持续完善 **发布准备、配置能力和安全治理**。  
从健康度看，项目没有明显停滞，但今日信号显示：**用户在“能不能稳定用、能不能更好用”上的诉求强于新增大功能**。  
整体判断：项目活跃度 **中上**，但当前更需要维护者集中处理 **bug 修复和 UX 改善**，以免工单进一步堆积。

---

## 2. 项目进展

### 今日关闭的重要 PR
- **#6266 chore: bump version to 2.0.1b1**（已关闭）  
  链接：<https://github.com/agentscope-ai/QwenPaw/pull/6266>  
  说明：这是一个版本号提升 PR，通常意味着项目进入发布/打包准备阶段。尽管今日没有实际 Release，但此类 PR 往往代表维护者正在为后续版本做收口和标记。

### 今日仍在推进的关键 PR
- **#6256 feat(governance): make sandbox-unavailable fallback action configurable**（开放）  
  链接：<https://github.com/agentscope-ai/QwenPaw/pull/6256>  
  价值：增强沙箱不可用时的 fallback 行为可配置性，直接提升命令执行场景的可控性与治理能力。

- **#6259 feat(security): support CIDR in no-auth host allowlist**（开放）  
  链接：<https://github.com/agentscope-ai/QwenPaw/pull/6259>  
  价值：把 no-auth host allowlist 从单个 IP 扩展到 CIDR，明显偏向企业/内网部署场景，属于安全与运维能力补强。

- **#6262 feat(agents): add one-click copy of agent configuration**（开放）  
  链接：<https://github.com/agentscope-ai/QwenPaw/pull/6262>  
  价值：改善 Agent 配置复用体验，降低创建新 Agent 的配置成本。

### 项目整体向前迈进的程度
今天的 PR 组合显示出项目在三条线上同步推进：
1. **发布准备**：版本 bump，说明节奏在收口；
2. **安全与治理**：CIDR allowlist、sandbox fallback 可配置；
3. **效率与体验**：Agent 配置一键复制。

这意味着项目并不只是“修 bug”，而是在向 **可部署、可治理、可复用** 的成熟形态推进。  
不过，由于今日没有真正发布版本，增量更多停留在“功能准备阶段”，尚未转化为面向用户的稳定版本交付。

---

## 3. 社区热点

### 热点 1：多工具调用的 thinking 内容重复
- **#6257 [bug] Multiple tool calls produce identical thinking output**  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6257>  
  状态：OPEN  
  评论：2  
  关注点：当 agent 在同一轮中执行多个 tool call 时，每个 call 的 thinking block 内容完全相同。  
  背后诉求：用户希望 **每次工具调用都能呈现独立 reasoning**，而不是重复粘贴同一段思考文本。这反映出用户对“Agent 过程可解释性”的期待很高，但不希望过程噪音污染输出。

### 热点 2：Linux 桌面端缩放失效
- **#6252 [Bug] Desktop (Tauri) mode — Ctrl +/- / Ctrl + wheel zoom does not work on Linux**  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6252>  
  状态：OPEN  
  评论：2  
  关注点：Linux 下桌面端缩放快捷键无效。  
  背后诉求：桌面端用户需要基本的 **可访问性与 UI 可调节能力**。该问题看似细小，但会直接影响长时间使用体验。

### 热点 3：结果呈现与思考过程占屏问题
- **#6260 [enhancement] 在结果呈现上需要提升**  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6260>  
  状态：OPEN  
  👍：1  
  关注点：用户明确提出希望把思考和工具调用折叠起来，避免占满屏幕，让最终结果更突出。  
  背后诉求：这反映出用户对“**结果优先**”的交互偏好：过程可以保留，但不应喧宾夺主。

### 热点判断
今日讨论最活跃的点并不是新功能本身，而是 **输出结构、桌面可用性和 reasoning 展示方式**。这表明项目用户已经从“能不能跑”进入到“**能不能更像一个成熟生产工具**”的阶段。

---

## 4. Bug 与稳定性

以下按影响面和严重程度排序：

### 1) 聊天过程中直接报错
- **#6255 [bug] chat error 聊天报错**  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6255>  
  状态：OPEN  
  影响：聊天中途触发 `openai.BadRequestError`，属于**直接打断对话**的稳定性问题。  
  严重度：高  
  是否已有 fix PR：**未见明确 fix PR**

### 2) OpenAI 模型最大输出 token 不生效
- **#6258 [bug] openai 模型最大输出token不生效**  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6258>  
  状态：OPEN  
  影响：模型输出长度不可控，可能导致成本、响应时间和上下文管理问题。  
  严重度：高  
  是否已有 fix PR：**未见明确 fix PR**

### 3) 离线环境下 code 模式无法预览文件
- **#6261 [bug] 离线环境使用code模式，无法预览文件内容，因为需要使用在线资源**  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6261>  
  状态：OPEN  
  影响：离线场景中核心能力受限，尤其影响内网/隔离环境用户。  
  严重度：中高  
  是否已有 fix PR：**未见明确 fix PR**

### 4) 多工具调用的 thinking 重复
- **#6257 [bug] Multiple tool calls produce identical thinking output**  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6257>  
  状态：OPEN  
  影响：影响 reasoning 可信度和可读性，但不一定阻断主流程。  
  严重度：中  
  是否已有 fix PR：**未见明确 fix PR**

### 5) Linux 桌面端缩放快捷键失效
- **#6252 [Bug] Desktop (Tauri) mode — Ctrl +/- / Ctrl + wheel zoom does not work on Linux**  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6252>  
  状态：OPEN  
  影响：影响桌面端可用性与可访问性。  
  严重度：中  
  是否已有 fix PR：**未见明确 fix PR**

### 稳定性结论
今日 bug 以 **运行时错误、参数控制失效、离线兼容性不足** 为主，说明项目当前的主要风险不在“没有功能”，而在于 **功能在不同环境/模型/交互路径下的稳定性不足**。  
尤其是 **#6255、#6258、#6261**，建议优先级靠前。

---

## 5. 功能请求与路线图信号

### 新出现/持续升温的功能请求

- **#6264 [enhancement] 希望支持最小化到系统托盘**  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6264>  
  状态：CLOSED  
  信号：典型桌面端需求，说明有用户在长期驻留使用场景中依赖托盘能力。  
  价值判断：如果后续有桌面端增强规划，这类功能有较高落地价值。

- **#6263 [enhancement] Feature: Support per-agent auto-memory profiles**  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6263>  
  状态：OPEN  
  信号：用户希望不同 Agent 采用不同记忆结构，而不是共享单一 `auto_memory.yaml`。  
  价值判断：这是较强的架构性需求，符合“多 Agent 场景差异化配置”的路线。

- **#6260 [enhancement] 在结果呈现上需要提升**  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6260>  
  状态：OPEN  
  信号：用户希望 UI/交互层面更强调结果、弱化过程。  
  价值判断：很可能进入下一轮交互体验优化方向。

### 与已存在 PR 的路线图关联
以下 PR 与用户诉求高度一致，且有较大机会进入下一版本：
- **#6262 一键复制 Agent 配置**：直接回应多 Agent 配置复用需求  
  <https://github.com/agentscope-ai/QwenPaw/pull/6262>
- **#6259 支持 CIDR allowlist**：偏企业部署、安全合规  
  <https://github.com/agentscope-ai/QwenPaw/pull/6259>
- **#6256 沙箱 fallback 可配置**：提升复杂执行环境下的可控性  
  <https://github.com/agentscope-ai/QwenPaw/pull/6256>

### 路线图判断
从今天的 issue/pr 组合看，下一版本很可能优先聚焦：
1. **部署安全与治理能力**
2. **桌面端与交互体验**
3. **多 Agent 配置与记忆定制**
4. **稳定性修复**

---

## 6. 用户反馈摘要

从今日 Issues 评论与描述中，可以提炼出几个非常明确的用户痛点：

### 1) 用户希望“结果优先”，不要让过程淹没结论
- 来源：**#6260**  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6260>  
  反馈关键词：思考块太长、工具调用占屏、结果被埋没。  
  说明：用户并不排斥 Agent 的推理过程，但希望 UI 提供折叠/收纳机制，让交付结果更聚焦。

### 2) 离线与内网用户非常在意“可独立运行”
- 来源：**#6261**  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6261>  
  反馈关键词：离线 code 模式无法预览文件，依赖在线资源。  
  说明：QwenPaw 已被用于较严肃的离线/隔离场景，用户对网络依赖非常敏感。

### 3) 桌面端用户对基础交互可用性要求很高
- 来源：**#6252**、**#6264**  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6252>  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6264>  
  反馈关键词：缩放失效、系统托盘。  
  说明：桌面产品不只是“能打开”，而是要符合操作系统习惯，支持常见快捷键与后台驻留。

### 4) 用户希望 Agent 行为更可控、更可解释
- 来源：**#6257**、**#6258**  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6257>  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6258>  
  反馈关键词：thinking 重复、token 限制不生效。  
  说明：一方面是 reasoning 质量，另一方面是生成边界控制，体现出用户对“Agent 不是黑箱”的要求。

### 总结
当前用户并未集中抱怨“核心能力不可用”，而是更多指出：  
**交互展示不够克制、环境兼容不足、配置控制不够细、稳定性仍需打磨。**

---

## 7. 待处理积压

> 说明：本次数据中未见非常长期沉默的老工单，但存在一批**当天新开、仍未获得明确响应**的重要条目，建议维护者尽快初步回复，以避免形成积压。

### 建议优先跟进的开放 Issue
- **#6255 聊天报错**  
  <https://github.com/agentscope-ai/QwenPaw/issues/6255>
- **#6258 OpenAI 最大输出 token 不生效**  
  <https://github.com/agentscope-ai/QwenPaw/issues/6258>
- **#6261 离线 code 模式无法预览文件**  
  <https://github.com/agentscope-ai/QwenPaw/issues/6261>
- **#6257 多工具调用 thinking 重复**  
  <https://github.com/agentscope-ai/QwenPaw/issues/6257>
- **#6252 Linux 桌面缩放失效**  
  <https://github.com/agentscope-ai/QwenPaw/issues/6252>
- **#6263 per-agent auto-memory profiles**  
  <https://github.com/agentscope-ai/QwenPaw/issues/6263>

### 建议优先审查的开放 PR
- **#6256 sandbox-unavailable fallback 可配置**  
  <https://github.com/agentscope-ai/QwenPaw/pull/6256>
- **#6259 CIDR allowlist 支持**  
  <https://github.com/agentscope-ai/QwenPaw/pull/6259>
- **#6262 一键复制 Agent 配置**  
  <https://github.com/agentscope-ai/QwenPaw/pull/6262>

### 积压风险判断
当前积压不在“数量过多”，而在“**问题类型偏用户感知强、影响面广**”。如果这些条目不能快速得到确认、复现和分流，后续容易演变为“高频重复反馈”。

---

## 总体结论

今天的 CoPaw 处于一个比较典型的“**活跃迭代但尚未发布收口**”阶段：  
- 有 **版本 bump**，说明在为发布做准备；
- 有多条 **安全、配置、治理、体验** 方向 PR 在推进；
- 但用户侧反馈明显聚焦于 **稳定性、离线兼容、桌面可用性和结果呈现**。

从项目健康度看，CoPaw 的社区反馈是积极的：用户愿意提出具体、可复现、贴近真实使用场景的问题，这通常意味着产品已经进入真实使用扩散阶段。  
接下来若能优先解决 **聊天报错、token 控制、离线预览、输出展示** 等问题，项目整体口碑和可用性会有明显提升。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报（2026-07-20）

## 1. 今日速览
过去 24 小时，ZeroClaw 处于**高活跃、低合并**状态：Issues 更新 6 条，PR 更新 18 条，但实际仅有 **1 个 PR 关闭**，说明项目当前主要在吸纳需求、修复问题和推进方案评审，而不是集中发布交付。  
本日**没有新版本发布**，也没有明显的发布节奏信号，整体更像是在为下一轮版本做功能收敛与稳定性打底。  
关注点明显集中在 **ZeroCode 交互体验、MCP/ACP 资源传递、渠道兼容性、安全与 CI** 等方向。  
从健康度看，项目维持良好的社区输入，但**待合并 PR 堆积较多（17 个）**，后续需要关注合并吞吐与优先级收敛。

---

## 2. 项目进展
今日唯一明确关闭的 PR 是：

- [#9161 docs(ci): correct stale Rust-CodeQL note in codeql.yml](https://github.com/zeroclaw-labs/zeroclaw/pull/9161)  
  这是一个低风险文档/CI 注释修正，主要价值在于清理过时说明，减少维护误导，对功能面贡献不大，但属于健康维护的一部分。

虽然今天没有功能级合并，但**待推进的主线非常清晰**：  
- [#9181 Nextcloud Talk replies via signed bot API](https://github.com/zeroclaw-labs/zeroclaw/pull/9181)  
- [#9180 QQ group replies propagate msg_id](https://github.com/zeroclaw-labs/zeroclaw/pull/9180)  
- [#9173 terminal-safe help and browse controls](https://github.com/zeroclaw-labs/zeroclaw/pull/9173)  
- [#9166 diff-aware Semgrep scan & SARIF upload](https://github.com/zeroclaw-labs/zeroclaw/pull/9166)  
- [#9160 pass selected socket to spawned daemon](https://github.com/zeroclaw-labs/zeroclaw/pull/9160)

**阶段性判断：**  
项目今天的“向前迈进”更多体现在**问题面覆盖更广、修复面更实**，但从交付结果看仍以“待合并积累”为主，实际已落地的增量有限。

---

## 3. 社区热点
> 说明：本日列出的 Issues/PR **评论数均为 0 或未提供**，因此严格意义上没有形成“评论驱动型热点”。以下按**更新频率、问题紧迫性和标题主题**归纳今日最受关注方向。

### 热点方向 1：MCP / ACP 嵌入资源与文件交付
- [#9179 MCP embedded resource blob intake for the model](https://github.com/zeroclaw-labs/zeroclaw/issues/9179)
- [#9178 ACP embedded resource blob + deliver_file](https://github.com/zeroclaw-labs/zeroclaw/issues/9178)

**背后诉求：**  
用户希望模型工具返回的二进制内容能**落到工作区文件**里，而不是把 base64 直接暴露给模型上下文。这类需求本质上是在解决“模型可读性、引用稳定性和上下文膨胀”的问题，属于 AI agent 产品化的核心能力。

### 热点方向 2：ZeroCode 交互与键盘/命令语义统一
- [#9172 Use one command descriptor source for ZeroCode slash commands](https://github.com/zeroclaw-labs/zeroclaw/issues/9172)
- [#9171 Make ZeroCode modifier semantics independent of key characters](https://github.com/zeroclaw-labs/zeroclaw/issues/9171)
- [#9173 add terminal-safe help and browse controls](https://github.com/zeroclaw-labs/zeroclaw/pull/9173)
- [#9164 show feedback for secret prompts](https://github.com/zeroclaw-labs/zeroclaw/pull/9164)

**背后诉求：**  
ZeroCode 用户明显在追求**更稳定的键盘交互、更清晰的命令来源和更安全的输入反馈**。这说明终端端产品已经进入“可用性精修”阶段，而不只是功能可达。

### 热点方向 3：渠道适配与消息协议正确性
- [#9181 Nextcloud Talk signed bot API](https://github.com/zeroclaw-labs/zeroclaw/pull/9181)
- [#9180 QQ reply msg_id propagation](https://github.com/zeroclaw-labs/zeroclaw/pull/9180)
- [#9159 WhatsApp Web setup to WhatsApp config](https://github.com/zeroclaw-labs/zeroclaw/pull/9159)

**背后诉求：**  
多渠道机器人接入正在从“能连上”转向“**协议细节必须完全正确**”。用户更在意消息是否能成功送达、引用是否正确、被动/主动消息的边界是否符合平台要求。

---

## 4. Bug 与稳定性
### 高优先级 / 影响面较大
- [#9177 JIT loading fails with “Engine protocol startup was aborted” for Qwen3.6-35B-A3B](https://github.com/zeroclaw-labs/zeroclaw/issues/9177)  
  - 严重程度：**S2 - degraded behavior**  
  - 影响：JIT 加载模型失败，属于直接影响可用性的启动问题。  
  - 状态：**当前未看到对应 fix PR**。

### 高风险安全问题
- [#9165 prevent shell injection via workflow_dispatch tag input](https://github.com/zeroclaw-labs/zeroclaw/pull/9165)  
  - 类型：CI / security  
  - 影响：`workflow_dispatch` 参数进入脚本拼接路径，存在注入风险。  
  - 状态：**已有修复 PR**。

### 启动与初始化稳定性
- [#9169 time out stalled daemon initialization](https://github.com/zeroclaw-labs/zeroclaw/pull/9169)  
  - 类型：daemon / zeroCode  
  - 影响：避免 daemon 已接受但无响应时终端长时间空白卡死。  
  - 状态：**已有修复 PR**。

### 连接/启动参数错误导致的运行时问题
- [#9160 pass selected socket to spawned daemon](https://github.com/zeroclaw-labs/zeroclaw/pull/9160)  
  - 类型：runtime / zerocode  
  - 影响：修复本地 IPC 端点传递不一致导致的启动/连接异常。  
  - 状态：**已有修复 PR**。

### 通道兼容性与行为回归
- [#9181 Nextcloud Talk replies via signed bot API](https://github.com/zeroclaw-labs/zeroclaw/pull/9181)  
- [#9180 propagate triggering msg_id on QQ group replies](https://github.com/zeroclaw-labs/zeroclaw/pull/9180)  
- [#9159 map WhatsApp Web setup to WhatsApp config](https://github.com/zeroclaw-labs/zeroclaw/pull/9159)  
- [#9175 bridge OpenRouter credential into typed config](https://github.com/zeroclaw-labs/zeroclaw/pull/9175)  
- [#9164 show feedback for secret prompts](https://github.com/zeroclaw-labs/zeroclaw/pull/9164)

**结论：**  
今天的稳定性议题主要不是“大规模崩溃”，而是**启动失败、初始化卡死、协议不匹配、配置桥接错误和安全风险**。这类问题虽然不一定在表面上引发 crash，但会明显拉低实际可用性。

---

## 5. 功能请求与路线图信号
### 可能进入下一版本的高概率需求
1. [#9172 Use one command descriptor source for ZeroCode slash commands](https://github.com/zeroclaw-labs/zeroclaw/issues/9172)  
   - 已标记 `status:accepted`，且属于 ZeroCode 核心交互一致性优化，**很像下一版本会优先落地的功能**。

2. [#9171 Make ZeroCode modifier semantics independent of key characters](https://github.com/zeroclaw-labs/zeroclaw/issues/9171)  
   - 同样为 `status:accepted`，解决的是键位语义和平台行为一致性问题，**优先级较高**。

3. [#9178 ACP embedded resource blob + deliver_file](https://github.com/zeroclaw-labs/zeroclaw/issues/9178)  
   - 这是面向 agent 文件回传与可引用资源的能力升级，属于**AI 助手产品化的关键能力**。

4. [#9179 MCP embedded resource blob intake for the model](https://github.com/zeroclaw-labs/zeroclaw/issues/9179)  
   - 与上条形成闭环：输入端接收资源，输出端可交付文件，说明项目在向**“工具结果可结构化落盘”**方向演进。

5. [#9182 support PowerShell as the native shell on Windows](https://github.com/zeroclaw-labs/zeroclaw/pull/9182)  
   - Windows 生态兼容性增强，若测试稳定，很可能进入近期版本集合。

### 路线图信号总结
- **AI agent 资源流转能力**：MCP/ACP embedded resource 相关需求正在形成双向闭环。
- **ZeroCode 可用性治理**：键盘语义、命令发现、帮助入口和输入反馈在集中修补。
- **多渠道稳定适配**：QQ、Nextcloud Talk、WhatsApp 等渠道的协议细节修复密集出现。
- **安全与 CI 收敛**：shell injection、Semgrep、CodeQL 等问题表明项目在补强工程化底座。

---

## 6. 用户反馈摘要
> 由于本日 Issues/PR 基本无评论，本节根据问题描述与变更主题提炼用户痛点。

### 真实痛点 1：模型工具返回的二进制/资源不好用
- [#9179](https://github.com/zeroclaw-labs/zeroclaw/issues/9179)
- [#9178](https://github.com/zeroclaw-labs/zeroclaw/issues/9178)

用户希望工具输出能变成**工作区中的真实文件**，并且模型侧不要被 base64 污染。说明他们的使用场景已经进入“文档、附件、引用、审阅”这类更复杂工作流。

### 真实痛点 2：终端交互可达性不足
- [#9173](https://github.com/zeroclaw-labs/zeroclaw/pull/9173)
- [#9164](https://github.com/zeroclaw-labs/zeroclaw/pull/9164)

用户需要在终端被宿主拦截快捷键时，仍能通过命令完成帮助和浏览操作；同时也希望在输入 secret 时得到**“已接收但不泄露内容”**的正反馈。这反映出 ZeroCode 正在面对更真实的终端环境，而不是理想化输入环境。

### 真实痛点 3：跨渠道消息必须“按平台规矩来”
- [#9181](https://github.com/zeroclaw-labs/zeroclaw/pull/9181)
- [#9180](https://github.com/zeroclaw-labs/zeroclaw/pull/9180)
- [#9159](https://github.com/zeroclaw-labs/zeroclaw/pull/9159)

用户关心的不是“能不能发”，而是**发出去是否被平台正确接受、回复是否带对引用、配置是否和实际渠道一致**。

### 真实痛点 4：启动和加载可靠性
- [#9177](https://github.com/zeroclaw-labs/zeroclaw/issues/9177)
- [#9169](https://github.com/zeroclaw-labs/zeroclaw/pull/9169)
- [#9160](https://github.com/zeroclaw-labs/zeroclaw/pull/9160)

用户对“模型启动失败、daemon 卡住、socket 传错”非常敏感，因为这类问题会直接把产品体验从“慢”变成“不可用”。

---

## 7. 待处理积压
> 说明：当前快照中**没有看到长期沉默多日的老项目**；不过以下条目属于今天新增/活跃但尚未关闭的关键积压，建议维护者优先盯紧。

### 高优先级待办
- [#9177 JIT loading fails with “Engine protocol startup was aborted”](https://github.com/zeroclaw-labs/zeroclaw/issues/9177)  
  直接影响模型加载成功率，属于应尽快定位的稳定性问题。

- [#9165 prevent shell injection via workflow_dispatch tag input](https://github.com/zeroclaw-labs/zeroclaw/pull/9165)  
  安全风险项，建议优先合并或尽快完成安全复核。

- [#9160 pass selected socket to spawned daemon](https://github.com/zeroclaw-labs/zeroclaw/pull/9160)  
  运行时连接可靠性问题，和 daemon 启动链路强相关。

### 路线图型积压
- [#9179 MCP embedded resource blob intake for the model](https://github.com/zeroclaw-labs/zeroclaw/issues/9179)
- [#9178 ACP embedded resource blob + deliver_file](https://github.com/zeroclaw-labs/zeroclaw/issues/9178)

这两项很可能会演化为下一阶段的 agent 能力主线，建议尽早统一接口设计，避免 MCP/ACP 双栈重复实现。

### 已接受但仍待落地
- [#9172 Use one command descriptor source for ZeroCode slash commands](https://github.com/zeroclaw-labs/zeroclaw/issues/9172)
- [#9171 Make ZeroCode modifier semantics independent of key characters](https://github.com/zeroclaw-labs/zeroclaw/issues/9171)

既然已经标记为 accepted，建议把它们从“讨论项”尽快推进到实现排期，否则容易形成“已认可但久拖不落”的体验债。

---

如果你希望，我也可以把这份日报进一步整理成：
1. **适合 Slack/飞书发送的短版**，或  
2. **适合管理层阅读的 1 页摘要版**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*