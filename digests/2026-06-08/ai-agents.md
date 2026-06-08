# OpenClaw 生态日报 2026-06-08

> Issues: 14 | PRs: 23 | 覆盖项目: 13 个 | 生成时间: 2026-06-08 04:13 UTC

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

以下为 **OpenClaw（openclaw/openclaw）2026-06-08 项目动态日报**。  
整体看，今天是一个**高活跃、偏稳定性修复与安全修补**的工作日：过去 24 小时有 **14 条 Issue 更新**、**23 条 PR 更新**，但**没有新版本发布**。从内容上看，讨论集中在 **会话状态、消息投递、工具调用生命周期、记忆系统兼容性** 以及 **安全边界**，说明项目仍处于快速迭代和持续收敛边界问题的阶段。

---

## 1. 今日速览

- 今天社区和维护者围绕多个高优先级缺陷展开密集讨论，尤其是 **安全配置反转、崩溃循环、消息重复/丢失、控制台行为异常** 等问题，表明项目当前的主要压力来自“正确性与稳定性”而不是大功能扩张。  
  参考：[#91283](https://github.com/openclaw/openclaw/issues/91283)、[#91312](https://github.com/openclaw/openclaw/issues/91312)、[#91302](https://github.com/openclaw/openclaw/issues/91302)

- 今日新增/活跃 Issue 中，**12 条为新开或继续活跃，2 条已关闭**；PR 侧有 **18 条待合并、5 条已合并/关闭**，说明开发流水线很忙，但尚未进入“版本收口”阶段。  
  参考：[#91319](https://github.com/openclaw/openclaw/pull/91319)、[#91306](https://github.com/openclaw/openclaw/pull/91306)、[#91124](https://github.com/openclaw/openclaw/pull/91124)

- 这一日的信号非常清晰：**安全、会话一致性、消息投递可靠性、memory/cron 子系统兼容性** 是当前最关键的健康指标。  
  参考：[#91301](https://github.com/openclaw/openclaw/issues/91301)、[#91307](https://github.com/openclaw/openclaw/issues/91307)、[#91298](https://github.com/openclaw/openclaw/issues/91298)

- 从完成度看，今天已有 **5 个 PR 关闭/完成**，覆盖 Telegram 入口、Anthropic 回放历史、MCP 资源回收、记忆集合重绑定等核心路径；这是一次明显的“稳定性推进日”。  
  参考：[#91306](https://github.com/openclaw/openclaw/pull/91306)、[#91304](https://github.com/openclaw/openclaw/pull/91304)、[#91124](https://github.com/openclaw/openclaw/pull/91124)、[#91297](https://github.com/openclaw/openclaw/pull/91297)、[#91294](https://github.com/openclaw/openclaw/pull/91294)

---

## 2. 版本发布

- **今日无新版本发布**（Releases 为空）。  
  参考：OpenClaw Releases 页面（无）：https://github.com/openclaw/openclaw/releases

---

## 3. 项目进展

今天已完成/关闭的 PR，主要推进了以下几类能力：

1. **消息入口与投递链路修复**
   - **Telegram 入口路由修复**：唤醒 isolated polling drain，避免 worker-spooled inbound update 卡在队列中。  
     PR: [#91306](https://github.com/openclaw/openclaw/pull/91306)  
     对应问题：[#86957](https://github.com/openclaw/openclaw/issues/86957)（PR 标题中引用）

2. **模型/历史回放兼容性修复**
   - **移除 Anthropic replay 历史中的 reasoning_content 占位签名**，降低从 OpenAI-compatible provider 切换到 Anthropic 时的回放错误风险。  
     PR: [#91304](https://github.com/openclaw/openclaw/pull/91304)

3. **资源回收与性能清理**
   - **MCP lease release 不再刷新 lastUsedAt**，帮助 idle 清理真正回收进程资源，缓解进程/内存线性增长问题。  
     PR: [#91124](https://github.com/openclaw/openclaw/pull/91124)

4. **记忆系统一致性修复**
   - **qmd collections 在 workspace/root path 漂移时重新绑定**，避免记忆检索继续指向旧目录。  
     PR: [#91297](https://github.com/openclaw/openclaw/pull/91297)
   - 另一条相关 PR 也已关闭，继续收敛同类问题：  
     PR: [#91294](https://github.com/openclaw/openclaw/pull/91294)

**整体推进判断：**
- 今天的完成项没有明显扩张新功能，而是集中修复“入口、回放、资源回收、记忆绑定”这些**项目核心路径**。
- 这类 PR 的价值很高：它们直接减少 crash-loop、消息丢失、旧数据污染和资源泄漏，属于“提升平台可信度”的实质性进展。
- 以今天完成的 5 个 PR 计，约占今日 PR 更新量的 **22%**，说明流水线推进正常，但仍有较多待审事项需要继续消化。

---

## 4. 社区热点

> 说明：当前数据中 **Issue 有评论/点赞统计**，但 **PR 未提供评论/反应统计**。因此本节以最活跃的 Issue 为主，并补充几条与之强相关的 PR。

### 讨论最活跃的 Issues

1. **#91283 — minSecurity inverted：security="full" 被错误夹到 allowlist**
   - 评论：5，👍：1  
   - 链接：[#91283](https://github.com/openclaw/openclaw/issues/91283)
   - 热点原因：这是一个**安全等级反转**问题，直接影响 session 安全配置生效方式，风险高、复现明确，因此成为今日最受关注的安全 Issue。
   - 对应修复 PR：[#91288](https://github.com/openclaw/openclaw/pull/91288)

2. **#91312 — stale thinking block signatures 导致重复崩溃**
   - 评论：4，👍：1  
   - 链接：[#91312](https://github.com/openclaw/openclaw/issues/91312)
   - 热点原因：涉及 **session crash-loop**，且与 compaction cycle 相关，属于会话稳定性高风险问题。该 Issue 已关闭，说明有较快响应。  
   - 闭环状态：已关闭（数据未给出对应 PR 链接）

3. **#91316 — Control UI 中 `/reset soft` 参数被截断**
   - 评论：2，👍：1  
   - 链接：[#91316](https://github.com/openclaw/openclaw/issues/91316)
   - 热点原因：这是典型的 **UI 到 gateway 的参数丢失** 问题，直接影响用户操作语义，容易被真实用户立即感知。

4. **#91301 — npm-shrinkwrap 锁定 vulnerable hono@4.12.18**
   - 评论：2，👍：1  
   - 链接：[#91301](https://github.com/openclaw/openclaw/issues/91301)
   - 热点原因：这是明确的 **供应链安全** 问题，下游 npm consumer 会触发 audit 报告，属于容易引发升级优先级的安全事项。  
   - 对应修复 PR：[#91303](https://github.com/openclaw/openclaw/pull/91303)

5. **#91295 — CLI backend 需要 post-parse text rewrite hook**
   - 评论：2，👍：1  
   - 链接：[#91295](https://github.com/openclaw/openclaw/issues/91295)
   - 热点原因：属于 **插件 SDK 能力增强** 请求，说明生态侧用户在尝试把“plain text assistant 输出”做更灵活的后处理。
   - 对应 PR：暂无明确修复 PR；相关提案见 Issue 本身。

6. **#91120 — Codex native subagent completion 可能显示 no-output/null**
   - 评论：2，👍：1  
   - 链接：[#91120](https://github.com/openclaw/openclaw/issues/91120)
   - 热点原因：子代理完成状态与主代理结果不一致，会影响多 agent 协作的可信度。

### 相关 PR 热点（以状态信号为主）
- [#91308](https://github.com/openclaw/openclaw/pull/91308) xAI realtime voice provider（大体量新增能力，等待作者推进）
- [#91311](https://github.com/openclaw/openclaw/pull/91311) trusted skill symlinks 通过
- [#91310](https://github.com/openclaw/openclaw/pull/91310) memory embedding provider fallback
- [#91303](https://github.com/openclaw/openclaw/pull/91303) shrinkwrap 安全修复

---

## 5. Bug 与稳定性

按严重程度和用户影响排序：

### P1 / 高风险

1. **#91283 — security="full" 被错误降级到 allowlist**
   - 链接：[#91283](https://github.com/openclaw/openclaw/issues/91283)
   - 风险：安全配置失真，可能导致 session 安全边界弱化。
   - 是否已有 fix PR：**有**，[#91288](https://github.com/openclaw/openclaw/pull/91288)

2. **#91302 — claude-cli tool-call 后空文本触发 empty_response fallback，Telegram 群重复回复**
   - 链接：[#91302](https://github.com/openclaw/openclaw/issues/91302)
   - 风险：会造成**用户可见重复消息**，属于 message-loss / duplicate delivery 类问题。
   - 是否已有 fix PR：**疑似有相关修复**，[#91319](https://github.com/openclaw/openclaw/pull/91319)（标题直接指向 silent reply fallback policy）

3. **#91307 — Feishu DM session 在 subagent announce 后陷入无限循环**
   - 链接：[#91307](https://github.com/openclaw/openclaw/issues/91307)
   - 风险：会话级无限循环，可导致 session-state 污染与 crash-loop。
   - 是否已有 fix PR：**未见明确对应 PR**

4. **#91301 — vulnerable hono@4.12.18**
   - 链接：[#91301](https://github.com/openclaw/openclaw/issues/91301)
   - 风险：供应链安全问题，影响下游安装方。
   - 是否已有 fix PR：**有**，[#91303](https://github.com/openclaw/openclaw/pull/91303)

### P2 / 中高风险

5. **#91320 — aborted assistant messages 后遗留 orphaned tool_result blocks，Anthropic API 400**
   - 链接：[#91320](https://github.com/openclaw/openclaw/issues/91320)
   - 风险：会在后续 turn 中直接引发 API 400，破坏对话连续性。
   - 是否已有 fix PR：**未见明确对应 PR**

6. **#91284 — doctor 将 trusted-proxy gateway auth 误报为 unauthenticated**
   - 链接：[#91284](https://github.com/openclaw/openclaw/issues/91284)
   - 风险：安全诊断误报，可能干扰运维判断。
   - 是否已有 fix PR：**未见明确对应 PR**

7. **#91285 — Tool Lifecycle / Gateway Recovery edge case**
   - 链接：[#91285](https://github.com/openclaw/openclaw/issues/91285)
   - 风险：工具执行成功后，后续 agent response 生成失败，偏 crash/恢复类。
   - 是否已有 fix PR：**未见明确对应 PR**

8. **#91300 — openclaw-weixin channel announce delivery delivered=true 但实际未发出**
   - 链接：[#91300](https://github.com/openclaw/openclaw/issues/91300)
   - 风险：典型“表面成功、实际失败”的投递一致性问题，影响消息可靠性。
   - 是否已有 fix PR：**未见明确对应 PR**

### 回归 / 兼容性 / 可用性问题

9. **#91316 — `/reset soft` 参数被截断**
   - 链接：[#91316](https://github.com/openclaw/openclaw/issues/91316)
   - 风险：控制台行为异常，用户命令语义丢失。
   - 是否已有 fix PR：**未见明确对应 PR**

10. **#91298 — cron.payload.model 无法清空为 inherit**
    - 链接：[#91298](https://github.com/openclaw/openclaw/issues/91298)
    - 风险：配置清理不可逆，patch 语义不完整。
    - 是否已有 fix PR：**有**，[#91313](https://github.com/openclaw/openclaw/pull/91313) / [#91318](https://github.com/openclaw/openclaw/pull/91318)

11. **#91213 — /context detail 未解释为何无法 compact**
    - 链接：[#91213](https://github.com/openclaw/openclaw/pull/91213)
    - 风险：可观测性不足，用户容易误判“有历史但不能压缩”。
    - 是否已有 fix PR：**该 PR 本身即修复提案**

---

## 6. 功能请求与路线图信号

今天出现的功能/能力诉求，和已有 PR 的方向基本一致，说明路线图在向 **插件化、实时音频、可观测性、权限边界** 继续延伸。

### 值得关注的功能请求

1. **#91295 — CLI backend 增加 `transformAssistantText` hook**
   - 链接：[#91295](https://github.com/openclaw/openclaw/issues/91295)
   - 信号判断：这是非常明确的 **SDK 能力补齐** 请求，且需求具体、场景清晰（LLM CLI 仅输出 plain text 时的后处理）。
   - 路线图价值：高。若 OpenClaw 继续强化插件生态，这类 hook 很可能进入下一批版本候选。

2. **#91308 — xAI realtime voice provider**
   - 链接：[#91308](https://github.com/openclaw/openclaw/pull/91308)
   - 信号判断：这是大体量新能力，且标记了 proof sufficient、扩展契约明确，说明已经接近可评审阶段。
   - 路线图价值：中高。若语音/Realtime 是产品方向之一，它是非常像“下一版本功能包”的候选项。

3. **#91213 — `/context detail` 增加 compaction 诊断信息**
   - 链接：[#91213](https://github.com/openclaw/openclaw/pull/91213)
   - 信号判断：这是明显的 **UX 可观测性增强**，帮助用户理解上下文为什么不能压缩。
   - 路线图价值：中高，尤其适合随稳定性版本一起落地。

4. **#91311 — trusted skill symlinks 通过**
   - 链接：[#91311](https://github.com/openclaw/openclaw/pull/91311)
   - 信号判断：属于 **安全边界放开但保留白名单约束** 的能力演进，对 skill workshop / CLI / gateway 都有影响。
   - 路线图价值：中高，但需要安全审查优先。

5. **#91315 — embedded mode 下 allowAgents 配置可暴露 sessions_spawn**
   - 链接：[#91315](https://github.com/openclaw/openclaw/pull/91315)
   - 信号判断：这类“小而明确”的可用性修复，通常更容易被纳入近期补丁版本。
   - 路线图价值：高，且落地概率较高。

### 更可能进入下一版本的方向
- **安全/供应链修复**：[#91283](https://github.com/openclaw/openclaw/issues/91283)、[#91301](https://github.com/openclaw/openclaw/issues/91301)
- **消息投递与 fallback 语义修复**：[#91302](https://github.com/openclaw/openclaw/issues/91302)、[#91319](https://github.com/openclaw/openclaw/pull/91319)
- **控制台/UX 可观测性提升**：[#91316](https://github.com/openclaw/openclaw/issues/91316)、[#91213](https://github.com/openclaw/openclaw/pull/91213)
- **插件与 provider 扩展**：[#91295](https://github.com/openclaw/openclaw/issues/91295)、[#91308](https://github.com/openclaw/openclaw/pull/91308)

---

## 7. 用户反馈摘要

从今日 Issues 的描述看，用户的真实痛点主要集中在以下几类：

1. **“看起来成功，实际上没成功” 的假阳性问题**
   - 例如 delivered=true 但消息没发出去、doctor 误报、tool_result 残留等。  
   - 相关链接：[#91300](https://github.com/openclaw/openclaw/issues/91300)、[#91284](https://github.com/openclaw/openclaw/issues/91284)、[#91320](https://github.com/openclaw/openclaw/issues/91320)

2. **会话状态不稳定，容易进入重复崩溃或循环**
   - 用户非常敏感于 crash-loop、compaction 失效、subagent 交互异常。  
   - 相关链接：[#91312](https://github.com/openclaw/openclaw/issues/91312)、[#91307](https://github.com/openclaw/openclaw/issues/91307)、[#91285](https://github.com/openclaw/openclaw/issues/91285)

3. **消息投递/回复语义丢失**
   - 例如 `/reset soft` 参数被吞、Claude CLI 空文本导致 fallback 重复回复、Telegram/Weixin 入口的投递链路不一致。  
   - 相关链接：[#91316](https://github.com/openclaw/openclaw/issues/91316)、[#91302](https://github.com/openclaw/openclaw/issues/91302)、[#91300](https://github.com/openclaw/openclaw/issues/91300)

4. **配置与兼容性边界不清晰**
   - 安全等级被反向夹断、cron patch 无法清空字段、provider 别名/回退规则不一致。  
   - 相关链接：[#91283](https://github.com/openclaw/openclaw/issues/91283)、[#91298](https://github.com/openclaw/openclaw/issues/91298)、[#91310](https://github.com/openclaw/openclaw/pull/91310)

5. **用户希望更强的可观察性与可定制性**
   - 例如 CLI 后处理 hook、context detail 诊断、插件化的文本变换。  
   - 相关链接：[#91295](https://github.com/openclaw/openclaw/issues/91295)、[#91213](https://github.com/openclaw/openclaw/pull/91213)

总体来说，今天的反馈不是“想要更多花哨功能”，而是更务实地要求：
- **别丢消息**
- **别重复回复**
- **别误报**
- **别崩溃循环**
- **别让配置看起来改了其实没改**

这说明 OpenClaw 的用户正在把它用于更接近生产的场景，容错要求越来越高。

---

## 8. 待处理积压

以下是今日仍未闭环、且优先级较高的待处理项，建议维护者优先关注：

### 仍待处理的重点 Issue
- **#91283** 安全等级反转（已出现 fix PR，但问题影响面高）  
  https://github.com/openclaw/openclaw/issues/91283
- **#91307** Feishu DM 无限循环  
  https://github.com/openclaw/openclaw/issues/91307
- **#91320** aborted assistant 后残留 tool_result 导致 Anthropic 400  
  https://github.com/openclaw/openclaw/issues/91320
- **#91300** Weixin announce 投递失败但标记成功  
  https://github.com/openclaw/openclaw/issues/91300
- **#91316** `/reset soft` 参数丢失  
  https://github.com/openclaw/openclaw/issues/91316
- **#91284** trusted-proxy 被 doctor 误判  
  https://github.com/openclaw/openclaw/issues/91284
- **#91285** 工具生命周期/恢复边缘问题  
  https://github.com/openclaw/openclaw/issues/91285

### 仍待处理的重点 PR
- **#91308** xAI realtime voice provider（等待作者推进）  
  https://github.com/openclaw/openclaw/pull/91308
- **#91305** Control UI bootstrap config base-path 修复（等待作者）  
  https://github.com/openclaw/openclaw/pull/91305
- **#91311** trusted skill symlinks（安全边界相关）  
  https://github.com/openclaw/openclaw/pull/91311
- **#91303** hono 安全修复（需尽快推进）  
  https://github.com/openclaw/openclaw/pull/91303
- **#91081** session-file listings 性能优化（较早一条，仍处于待审）  
  https://github.com/openclaw/openclaw/pull/91081

### 值得额外提醒的“相对更早仍未收口”项
- **#91081**（昨天创建，今天仍未完成）—— NFS `readdir` 压力优化，属于基础设施性能改进。  
  https://github.com/openclaw/openclaw/pull/91081
- **#91213**（昨天创建，今天仍在推进）—— compaction 诊断增强，属于用户体验与可观测性改进。  
  https://github.com/openclaw/openclaw/pull/91213

---

## 总体判断

OpenClaw 今天的状态可以概括为：**活跃度高、修复密集、稳定性压力仍然偏大，但核心子系统正在被持续修补**。  
尤其是安全、消息链路、会话状态、memory/cron 的兼容性问题集中出现，说明项目正处于从“快速功能堆叠”向“生产级可靠性收敛”的关键阶段。  
若后续能尽快推进几条高优先级修复 PR 合并，并补上针对消息投递和会话异常的回归测试，项目健康度会明显改善。

---

## 横向生态对比

下面是一份基于你提供的 2026-06-08 各仓库动态的**横向对比分析报告**。  
说明：表中“Issues/PR”均指**今日动态条数**，不是仓库历史总量。

---

## 1) 生态全景

个人 AI 助手 / 自主智能体开源生态，整体已经从“能跑起来”进入“能否稳定生产可用”的阶段。今天的共性不是大规模新功能扩张，而是围绕**会话状态、消息投递、崩溃恢复、模型兼容、配置安全、可观测性**做密集修补。  
这说明生态正在从“原型驱动”转向“基础设施驱动”：谁能更好地解决可靠性、兼容性和安全边界，谁就更容易形成长期壁垒。  
从活跃度看，第一梯队是 **Hermes Agent / OpenClaw / CoPaw**，它们都处于高频迭代与问题收敛并行阶段。  
中低活跃项目则更偏向工程质量打磨或局部问题修复，整体生态呈现出明显的“生产化收敛”趋势。

---

## 2) 各项目活跃度对比

| 项目 | 今日 Issues | 今日 PR | Release 情况 | 健康度评估 |
|---|---:|---:|---|---|
| **Hermes Agent** | 33 | 50 | 无 | **高活跃但压力较大**：迭代快，桌面端/Gateway/跨平台问题集中 |
| **OpenClaw** | 14 | 23 | 无 | **高活跃**：安全、会话、消息链路、memory/cron 稳定性是核心 |
| **CoPaw** | 7 | 6 | 无 | **活跃推进**：插件/MCP/测试基建收敛，方向清晰 |
| **NanoBot** | 1 | 5 | 无 | **小体量高聚焦**：问题少但都很关键，偏稳定性修复 |
| **PicoClaw** | 0 | 2 | 无 | **低噪音、质量导向**：工程基础修复，整体稳定 |
| **IronClaw** | 1 | 0 | 无 | **低活跃但有高风险兼容问题**：模型参数适配需尽快处理 |
| **ZeroClaw** | 0 | 3 | 无 | **低噪音持续推进**：配置安全、路由、交互恢复 |
| NanoClaw | 0 | 0 | 无 | 沉寂 |
| NullClaw | 0 | 0 | 无 | 沉寂 |
| LobsterAI | 0 | 0 | 无 | 沉寂 |
| TinyClaw | 0 | 0 | 无 | 沉寂 |
| Moltis | 0 | 0 | 无 | 沉寂 |
| ZeptoClaw | 0 | 0 | 无 | 沉寂 |

---

## 3) OpenClaw 在生态中的定位

### 位置判断
OpenClaw 属于这组项目里的**第一梯队**，活跃度仅次于 Hermes Agent，但其讨论质量更偏向**核心运行时可靠性**而不是 UI/桌面体验扩展。  
它的社区信号非常明确：今天的热点集中在**安全等级反转、消息重复/丢失、会话循环、tool 生命周期、记忆绑定、供应链安全**，说明它更像一个“AI 智能体底座/运行时平台”，而不是单一客户端。

### 相比同类的优势
1. **问题面更贴近生产环境**
   - 关注点是 session 安全、消息投递、回放兼容、资源回收、memory 一致性。
   - 这类问题是“生产可用性”的核心指标。

2. **修复链路完整**
   - 很多高优先级 Issue 已经出现对应 PR，说明社区/维护者响应速度快，闭环意识强。

3. **技术边界清晰**
   - 不是单纯扩功能，而是在收敛 runtime、gateway、memory、tool lifecycle 等基础路径。

### 技术路线差异
- **OpenClaw**：偏“运行时与协议层”——会话、消息、工具、记忆、安全边界。
- **Hermes Agent**：偏“桌面工作台 + 多平台运维”——GUI、gateway、跨平台恢复、附件/预览体验。
- **CoPaw**：偏“插件化 / MCP / 模型接入平台”——扩展体系、工具控制、测试与集成。
- **NanoBot**：偏“上下文与历史管理”——prompt bloat、transcript 生命周期。
- **PicoClaw**：偏“工程质量/可维护性”——日志、错误链、基础设施。
- **ZeroClaw**：偏“安全配置 + 路由可靠性”。
- **IronClaw**：偏“模型兼容与参数透传正确性”。

### 社区规模对比
- **第一梯队**：Hermes Agent、OpenClaw  
- **第二梯队**：CoPaw  
- **局部高价值、低噪音**：NanoBot、PicoClaw、ZeroClaw  
- **低活跃/单点问题型**：IronClaw  
- **沉寂**：NanoClaw、NullClaw、LobsterAI、TinyClaw、Moltis、ZeptoClaw

---

## 4) 共同关注的技术方向

### 1. 会话状态与上下文一致性
涉及项目：
- **OpenClaw**：会话循环、orphaned tool_result、compaction / replay 兼容
- **NanoBot**：dream 关闭后历史仍注入 prompt、session 删除后历史复活
- **Hermes Agent**：gateway crash/restart 后 turn 内容丢失
- **CoPaw**：会话筛选、管理能力需求上升

**共同诉求**：  
要么能恢复，要么别丢；要么能关闭，要么别继续偷偷运行。

---

### 2. 消息投递可靠性与“假阳性成功”
涉及项目：
- **OpenClaw**：Telegram / Weixin / announce delivered=true 但实际未发出、重复回复
- **ZeroClaw**：outbound message queue、webhook 路由到正确实例
- **Hermes Agent**：附件/预览/流式恢复相关链路
- **NanoBot**：历史读取和 transcript 可见性

**共同诉求**：  
“看起来成功”不够，必须“真实送达、真实生效、真实可追踪”。

---

### 3. 模型与供应商兼容性
涉及项目：
- **OpenClaw**：Anthropic / OpenAI-compatible 切换、memory embedding fallback
- **Hermes Agent**：pricing、模型/通道适配、多平台生态
- **CoPaw**：qwen3.7-plus 卡住、9router 支持
- **IronClaw**：gpt-5.5 temperature 兼容性
- **PicoClaw**：更偏底层质量，但也体现工程兼容性理念

**共同诉求**：  
不同模型/供应商的能力边界越来越碎，需要动态适配、能力检测和参数裁剪。

---

### 4. 插件化 / MCP / 工具控制
涉及项目：
- **OpenClaw**：trusted skill symlinks、CLI hook 诉求、allowAgents / sessions_spawn
- **CoPaw**：插件扩展基础设施、MCP 工具白名单、skill provider API
- **ZeroClaw**：gated_actions 校验、webhook 路由
- **Hermes Agent**：optional-skills、平台能力扩展

**共同诉求**：  
生态不再只要“能连”，而是要求**可控、可插拔、可审计**。

---

### 5. 安全、权限与配置正确性
涉及项目：
- **OpenClaw**：security inverted、vulnerable dependency、trusted proxy 误报
- **ZeroClaw**：unknown security.otp.gated_actions 校验
- **CoPaw**：MCP 工具白名单
- **Hermes Agent**：企业代理、SSL/连接错误、title generation 配置
- **IronClaw**：请求参数错误导致模型不可用，也属于“配置/参数边界”问题

**共同诉求**：  
安全不再只是“有没有”，而是“配置是否真实生效、是否可验证、是否可诊断”。

---

## 5) 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 架构特征 |
|---|---|---|---|
| **OpenClaw** | 会话、消息、工具、记忆、安全边界 | 生产化智能体使用者、平台维护者 | 更像核心 runtime / gateway 平台 |
| **Hermes Agent** | Desktop 工作台、跨平台恢复、附件预览 | 重度桌面用户、多平台用户 | Desktop + Gateway 双中心 |
| **CoPaw** | 插件生态、MCP、模型接入、测试基建 | 想扩展能力的高级用户 / 团队 | 平台化、模块化趋势明显 |
| **NanoBot** | 历史回收、上下文控制、WebUI 管理 | 小团队/个人助手用户 | 以会话数据流为核心 |
| **PicoClaw** | 日志、错误处理、基础质量 | 关注稳定性和可维护性的开发者 | 工程质量优先 |
| **IronClaw** | 模型参数与供应商兼容 | 需要新模型快速可用的用户 | 兼容适配层问题突出 |
| **ZeroClaw** | 安全配置、路由、交互恢复 | 有多实例/多通道需求的用户 | 网关与路由能力突出 |

---

## 6) 社区热度与成熟度

### 快速迭代阶段
- **Hermes Agent**
- **OpenClaw**
- **CoPaw**

特征：
- Issues 和 PR 都多
- 修复与新能力并行
- 用户反馈密集，说明正在被更广泛地真实使用
- 也意味着稳定性压力最高

### 质量巩固阶段
- **NanoBot**
- **PicoClaw**
- **ZeroClaw**

特征：
- 体量不大，但问题非常聚焦
- 重点是打磨核心路径、减少回归
- 更像“收敛型修复日”

### 低活跃 / 单点风险阶段
- **IronClaw**
- **NanoClaw / NullClaw / LobsterAI / TinyClaw / Moltis / ZeptoClaw**

特征：
- 前者是“有明确高风险问题，但整体活跃低”
- 后者基本无公开活动，缺少可判断信号

---

## 7) 值得关注的趋势信号

### 趋势 1：AI 智能体项目正在“生产化”
用户最在意的不是花哨功能，而是：
- 不丢消息
- 不重复回复
- 不崩溃循环
- 不出现假阳性成功

**对开发者的价值**：  
要把“可靠性”当作核心特性，而不是附属问题。

---

### 趋势 2：状态管理正在成为护城河
从 OpenClaw、NanoBot、Hermes 看，大家都在处理：
- 会话恢复
- 历史回收
- transcript 管理
- crash 后续接

**对开发者的价值**：  
智能体不是纯推理系统，而是**带状态的长期任务系统**。

---

### 趋势 3：模型兼容层的重要性持续上升
OpenClaw、CoPaw、IronClaw 都暴露出模型接入/参数适配问题。  
这说明“多模型、多供应商、多协议”已成为默认现实。

**对开发者的价值**：  
需要 capability detection、参数降级、provider abstraction，而不是硬编码默认值。

---

### 趋势 4：插件化与工具治理将成为标配
OpenClaw、CoPaw、ZeroClaw 都在往这条路走。  
未来竞争点不是“能不能扩展”，而是：
- 是否可控
- 是否可审计
- 是否可卸载
- 是否最小权限

**对开发者的价值**：  
要把安全边界和扩展机制一起设计，而不是后补。

---

### 趋势 5：可观测性正在从“加分项”变成“必需项”
PicoClaw 的日志与错误链修复、OpenClaw 的诊断类问题、Hermes 的 crash recovery、ZeroClaw 的配置校验，都说明：
- 用户希望知道为什么失败
- 维护者希望知道失败发生在哪里

**对开发者的价值**：  
没有可观测性，智能体系统就很难进入生产环境。

---

## 一句话总结

这一天的开源 AI 智能体生态，核心关键词不是“更多功能”，而是**更强的可靠性、更严的兼容性、更清晰的安全边界，以及更可控的扩展体系**。  
OpenClaw 处于第一梯队，优势在于核心 runtime 收敛快、问题面贴近生产；Hermes 更像跨平台工作台，CoPaw 在平台化方向更活跃，NanoBot/PicoClaw/ZeroClaw 则体现出质量巩固阶段的典型特征。

如果你愿意，我可以继续把这份分析压缩成一版 **“管理层 1 页简报”**，或者整理成 **“研发团队周会 PPT 大纲”**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-06-08）

## 1) 今日速览
今天 NanoBot 的仓库活动呈现出**“小体量、高聚焦”**的特征：过去 24 小时内仅有 **1 条 Issue 更新**、**5 条 PR 更新**，且**没有新版本发布**。  
讨论焦点高度集中在一个实际影响体验的历史记录注入问题：当 `dream.enabled=false` 时，历史内容仍可能持续进入 system prompt，带来 prompt 膨胀风险。  
从 PR 侧看，维护者与贡献者已经围绕同一问题提交了多个修复方案，说明项目对该类稳定性问题响应较快。  
整体活跃度不算高，但**技术讨论密度高、问题定位明确**，属于典型的“少量高价值更新日”。

---

## 2) 版本发布
**今日无新版本发布。**

- Releases：无  
- 影响判断：当前更像是补丁修复与文档/流程整理日，而非功能迭代发布日。

---

## 3) 项目进展
今天最重要的进展，是围绕“Dream 关闭后仍注入历史消息”的问题，出现了**明确的修复链路**，显示项目正在向更稳健的上下文管理推进。

### 已关闭的重要 PR
- **PR #4244 — fix: advance dream cursor when dream is disabled**  
  链接：<https://github.com/HKUDS/nanobot/pull/4244>  
  说明：这是对 Issue #4242 的直接修复提案，目标是在 `dream.enabled=false` 时仍推进 `.dream_cursor`，避免 `read_unprocessed_history()` 一次性回灌全部历史。  
  进展意义：如果该修复被采纳/合并，将直接降低 prompt 失控风险，改善长会话稳定性与 token 成本。

### 其他推进中的 PR
- **PR #4247 — fix(webui): auto-compact transcript when file exceeds size limit**  
  链接：<https://github.com/HKUDS/nanobot/pull/4247>  
  进展意义：针对 WebUI transcript 超过 8MB 后直接跳过、导致历史“消失”的问题，提出自动压缩方案，有助于提升前端历史可用性。

- **PR #4246 — fix(session): delete_session also removes legacy path files to prevent history revival**  
  链接：<https://github.com/HKUDS/nanobot/pull/4246>  
  进展意义：补齐会话删除逻辑对 legacy 路径的清理，防止已删除历史因旧路径残留而“复活”，属于数据一致性修复。

- **PR #4245 — docs: remove nightly branch guidance**  
  链接：<https://github.com/HKUDS/nanobot/pull/4245>  
  进展意义：清理过时的贡献与 CI 分支策略文档，降低协作歧义，属于项目治理与流程收敛。

- **PR #4243 — fix: advance dream cursor when Dream is disabled to prevent prompt bloat**  
  链接：<https://github.com/HKUDS/nanobot/pull/4243>  
  进展意义：与 #4244 同类，说明该问题已经被多个贡献者同时关注，反映出它的真实痛点很明确。

### 今日整体推进量
从结果上看，今天的进展主要集中在：
- **上下文/历史处理稳定性**
- **会话删除一致性**
- **WebUI 长文本保护**
- **文档与 CI 规则清理**

这类改动虽然不一定增加新功能，但对 NanoBot 这种 AI 智能体/个人助手项目来说，属于**直接影响可用性和可信度的关键修复**。

---

## 4) 社区热点
今天没有明显的高评论、高反应讨论线程；从给定数据看，**所有条目的评论数与点赞数都很低**，说明社区互动强度不高，但技术关注点非常集中。

### 今日最相关的热点
1. **Issue #4242 — Disabling dream.enabled still injects all chat history into system prompt via Recent History section**  
   链接：<https://github.com/HKUDS/nanobot/issues/4242>  
   热点原因：这是今天唯一的 Issue，且直接触发了多个修复 PR。  
   背后诉求：用户希望关闭 Dream 功能后，系统真的停止消耗/注入未处理历史，避免上下文污染与 token 膨胀。

2. **PR #4243 / #4244 — 关于 Dream cursor 推进的修复方案**  
   链接：<https://github.com/HKUDS/nanobot/pull/4243>  
   链接：<https://github.com/HKUDS/nanobot/pull/4244>  
   热点原因：同一问题被两个修复 PR 并行响应，说明这是当日最受关注的技术点。  
   背后诉求：保持 prompt 干净、避免历史重复注入、减少长会话退化。

3. **PR #4247 — WebUI transcript 自动压缩**  
   链接：<https://github.com/HKUDS/nanobot/pull/4247>  
   热点原因：解决的是“文件过大就整段不可读”的明显体验问题。  
   背后诉求：用户希望 WebUI 在长会话下依然可用，不因单文件过大而丢失历史。

> 热度判断：**讨论互动少，但问题严重度较高**；属于“少评论、强需求”的典型工程型社区日。

---

## 5) Bug 与稳定性
按影响程度排序，今天的主要问题如下：

### 1. 高优先级：Dream 关闭后仍注入全部历史，导致 prompt bloat
- **Issue #4242**  
  链接：<https://github.com/HKUDS/nanobot/issues/4242>  
  影响：当 `dream.enabled=false` 时，历史游标不推进，`read_unprocessed_history()` 可能回读全部积压历史，导致 system prompt 持续膨胀。  
  严重性：高，直接影响模型上下文质量、token 成本和会话稳定性。  
  是否已有 fix PR：**有**  
  - PR #4243：<https://github.com/HKUDS/nanobot/pull/4243>  
  - PR #4244：<https://github.com/HKUDS/nanobot/pull/4244>

### 2. 中高优先级：WebUI transcript 超过大小限制后历史整体消失
- **PR #4247**  
  链接：<https://github.com/HKUDS/nanobot/pull/4247>  
  说明：虽然当前给出的数据中未列出对应 Issue，但 PR 描述明确指出当 transcript 超过 8MB 时，读取函数直接返回空，导致聊天历史在 WebUI 中“消失”。  
  严重性：中高，属于明显的数据可见性/体验回归。  
  是否已有 fix PR：**有（正在修复中）**

### 3. 中优先级：删除会话后旧路径文件残留，可能导致历史“复活”
- **PR #4246**  
  链接：<https://github.com/HKUDS/nanobot/pull/4246>  
  说明：`delete_session()` 只清理 workspace 路径，未清理 legacy global directory，可能导致已删除会话再次被加载。  
  严重性：中，影响数据一致性和用户对“删除”的信任。  
  是否已有 fix PR：**有**

---

## 6) 功能请求与路线图信号
今天虽然没有明显“新功能型 Issue”爆发，但从 PR 方向看，路线图信号比较清晰，主要集中在**体验稳定性和协作治理**。

### 可能进入下一版本/补丁版本的方向
1. **上下文历史控制更精细化**
   - 相关：Issue #4242  
     <https://github.com/HKUDS/nanobot/issues/4242>
   - 相关 PR：#4243、#4244  
     <https://github.com/HKUDS/nanobot/pull/4243>  
     <https://github.com/HKUDS/nanobot/pull/4244>
   - 信号：项目正在强化“关闭某个智能行为后，相关数据流也应同步停用”的一致性设计。

2. **长会话/大文件场景的 WebUI 容错**
   - 相关：PR #4247  
     <https://github.com/HKUDS/nanobot/pull/4247>
   - 信号：用户对长会话可视化、历史保留、自动整理能力有明确需求，后续可能进一步演化为自动摘要、分段加载、按窗口压缩等能力。

3. **会话生命周期管理更完整**
   - 相关：PR #4246  
     <https://github.com/HKUDS/nanobot/pull/4246>
   - 信号：删除、迁移、兼容 legacy 数据路径等，会继续是个人 AI 助手类项目的重要维护方向。

4. **项目协作规范收敛**
   - 相关：PR #4245  
     <https://github.com/HKUDS/nanobot/pull/4245>
   - 信号：在仓库协作中逐步去除旧的 nightly/双分支思路，说明项目在向更简洁的贡献流程收敛。

---

## 7) 用户反馈摘要
从今日 Issue/PR 文本可以提炼出较真实的用户痛点：

### 主要痛点 1：关闭功能不等于停止数据流
- 来源：Issue #4242  
  <https://github.com/HKUDS/nanobot/issues/4242>
- 用户场景：用户明确关闭 `dream.enabled`，希望系统不要继续把未处理历史灌入 prompt。  
- 真实诉求：**配置开关要严格生效**，避免“表面关闭、内部仍运行”的不一致行为。  
- 不满意点：会话 prompt 被持续污染，成本增加，行为不可预测。

### 主要痛点 2：长会话不能因为文件过大就彻底丢失
- 来源：PR #4247  
  <https://github.com/HKUDS/nanobot/pull/4247>
- 用户场景：WebUI 中 transcript 文件超过上限后，历史直接不可读。  
- 真实诉求：**即使超大，也要尽量保留可访问性**，最好自动整理而不是直接丢弃。  
- 不满意点：历史“消失”会显著打击用户对系统可靠性的信任。

### 主要痛点 3：删除操作必须彻底
- 来源：PR #4246  
  <https://github.com/HKUDS/nanobot/pull/4246>
- 用户场景：删除 session 后仍可能从 legacy 路径重新读回。  
- 真实诉求：**删除即删除**，不能让旧数据再次出现。  
- 不满意点：造成“我明明删了，为什么又回来了”的困惑与不安全感。

---

## 8) 待处理积压
从本次数据看，**没有明显的长期未响应、跨天积压条目**；但有几个今天刚出现、值得维护者持续盯住的开放项：

### 仍需跟进的开放条目
- **Issue #4242** — 根因问题待彻底解决  
  <https://github.com/HKUDS/nanobot/issues/4242>

- **PR #4243** — Dream 关闭时推进 cursor 的修复方案  
  <https://github.com/HKUDS/nanobot/pull/4243>

- **PR #4245** — 文档与 CI 分支策略清理  
  <https://github.com/HKUDS/nanobot/pull/4245>

- **PR #4246** — 删除会话时清理 legacy 路径  
  <https://github.com/HKUDS/nanobot/pull/4246>

- **PR #4247** — WebUI transcript 超限自动压缩  
  <https://github.com/HKUDS/nanobot/pull/4247>

### 维护提醒
- 由于今天出现的是**同一主题的多方案并发修复**，建议维护者尽快统一技术路线，避免重复工作。
- 若 #4242 最终被 #4243/#4244 解决，建议补充测试覆盖，确保 `dream.enabled=false`、长会话、历史回收三类路径都不会再回归。

---

## 总体判断
NanoBot 今天的健康度表现为：**问题不多，但都很关键；互动不热，但修复导向明确**。  
从工程角度看，项目正在补齐 AI 助手最敏感的三类基础能力：**上下文控制、长会话稳定性、会话生命周期一致性**。  
如果这些修复能在近期合并落地，项目整体可靠性会有明显提升。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-06-08）

## 1) 今日速览
过去 24 小时，Hermes Agent 的代码与社区活动都非常活跃：Issues 新增/活跃 33 条，PR 更新 50 条，显示出明显的高频迭代状态。与此同时，**Issues 关闭数为 0**、PR 仅 **3 条合并/关闭**，说明项目当前更偏向“快速收集问题 + 并行修复”的阶段，问题消化速度仍有提升空间。今天的讨论重心高度集中在 **Desktop 端回归、Gateway 稳定性、跨平台兼容、消息平台适配**，反映出项目已从纯功能扩展进入“稳定性与体验修复”密集期。整体来看，项目活跃度很高，但稳定性压力也同步升高。  
- 仓库主页：https://github.com/nousresearch/hermes-agent

---

## 2) 项目进展：今日合并/关闭的重要 PR
今日已合并/关闭的 PR 共 3 个；在当前摘要中可确认的代表性变更是：

- [#41777 refactor(yuanbao): consolidate media resolution into dedicated pipeline middlewares](https://github.com/nousresearch/hermes-agent/pull/41777)  
  这是一次结构性重构，把 Yuanbao 入站媒体解析从单体逻辑拆分为可组合 pipeline middlewares。  
  **意义**：提高可维护性、降低后续功能耦合成本，属于平台适配层的架构优化。

> 注：其余 2 个已合并/关闭 PR 未在本次摘要中展开，但从今日 PR 列表看，项目正同步推进桌面端、Slack、Gateway、状态页等多条修复线。

### 今日推进的“向前一步”
从 PR 队列可以看出，项目今天不仅在修 bug，还在补齐关键能力与架构债务，尤其集中在：
- **Desktop 稳定性**：[#41787](https://github.com/nousresearch/hermes-agent/pull/41787)、[#41783](https://github.com/nousresearch/hermes-agent/pull/41783)、[#41775](https://github.com/nousresearch/hermes-agent/pull/41775)、[#41770](https://github.com/nousresearch/hermes-agent/pull/41770)
- **Gateway 恢复/会话恢复**：[#41772](https://github.com/nousresearch/hermes-agent/pull/41772)、[#41765](https://github.com/nousresearch/hermes-agent/pull/41765)、[#41764](https://github.com/nousresearch/hermes-agent/pull/41764)
- **平台适配增强**：[#41771](https://github.com/nousresearch/hermes-agent/pull/41771)、[#41784](https://github.com/nousresearch/hermes-agent/pull/41784)
- **安全/配置正确性**：[#41776](https://github.com/nousresearch/hermes-agent/pull/41776)、[#41786](https://github.com/nousresearch/hermes-agent/pull/41786)

---

## 3) 社区热点：今日讨论最活跃的 Issues / PRs
> 由于本次数据中大多数条目的评论数为 0 或 1，真正“热”的更多体现在**问题密度**与**提交速度**，而不是长线程争论。

### 讨论较活跃的 Issues
1. [#41737 Desktop update on Linux freezes at 100% and doesn't restart](https://github.com/nousresearch/hermes-agent/issues/41737)  
   Linux 桌面端更新卡死，属于典型“更新链路故障”，影响面高。

2. [#41676 macOS launchctl fallback gateway not recognized as healthy, causing repeated --replace restarts](https://github.com/nousresearch/hermes-agent/issues/41676)  
   涉及 macOS 后台进程健康判断，属于服务可用性问题。

3. [#41662 Windows Gateway cron scheduler circular dependency + os.kill(pid,0) broken](https://github.com/nousresearch/hermes-agent/issues/41662)  
   Windows 下定时任务与进程存活检测双重故障，影响自动恢复。

4. [#41696 incomplete turn's session content lost after gateway crash/restart](https://github.com/nousresearch/hermes-agent/issues/41696)  
   直接指向“生成中断后内容丢失”，属于高优先级数据可恢复性诉求。

5. [#41702 Auto-open assistant-message preview attachments](https://github.com/nousresearch/hermes-agent/issues/41702)  
   反映用户希望预览链接更符合“点开即看”的工作流。

### 今日讨论背后的诉求
- **“别卡住、别丢内容、别重复重启”**：用户最在意的是稳定运行和恢复能力。
- **“桌面端要更像一个完整工作台”**：预览、附件、滚动、主题、字体等 UI/UX 诉求集中出现。
- **“跨平台别出幺蛾子”**：Linux / Windows / macOS 都出现了平台特有问题，说明 Hermes 正在经历典型的多平台成熟期阵痛。

### 相关 PR 热点
- [#41787 fix(desktop): recover root boundary from transient render races](https://github.com/nousresearch/hermes-agent/pull/41787)
- [#41765 fix(#41696): Streaming content checkpoint for gateway crash recovery](https://github.com/nousresearch/hermes-agent/pull/41765)
- [#41780 fix(#41745): Add TCP keepalive transport to auxiliary client OpenAI instances](https://github.com/nousresearch/hermes-agent/pull/41780)
- [#41772 fix(tui_gateway): recover sessions from state.db after gateway restart](https://github.com/nousresearch/hermes-agent/pull/41772)

---

## 4) Bug 与稳定性：按严重程度排序

### P1 / 高风险：会话丢失、服务中断、更新失败
1. [#41696](https://github.com/nousresearch/hermes-agent/issues/41696) — **Gateway crash/restart 时当前 turn 内容丢失**  
   - 影响：正在生成的内容不可恢复，用户体验和数据连续性受损。  
   - 状态：**已有对应修复 PR** [#41765](https://github.com/nousresearch/hermes-agent/pull/41765)

2. [#41737](https://github.com/nousresearch/hermes-agent/issues/41737) — **Linux Desktop 更新卡在 100% 后不重启**  
   - 影响：更新流程冻结，用户无法完成升级。  
   - 状态：当前未见明确 fix PR

3. [#41662](https://github.com/nousresearch/hermes-agent/issues/41662) — **Windows Gateway cron 与进程检测失效，无法自动恢复**  
   - 影响：核心自动化与 watchdog 失灵。  
   - 状态：当前未见明确 fix PR

4. [#41645](https://github.com/nousresearch/hermes-agent/issues/41645) — **WSL/终端异常关闭后会话无法恢复**  
   - 影响：历史会话直接“断档”，对长期任务打击很大。  
   - 状态：当前未见明确 fix PR

### P2 / 中高风险：平台适配、连接与数据一致性
5. [#41676](https://github.com/nousresearch/hermes-agent/issues/41676) — **macOS launchctl fallback gateway 健康检查异常，导致反复重启**  
   - 状态：暂无明确 fix PR

6. [#41660](https://github.com/nousresearch/hermes-agent/issues/41660) — **WhatsApp bare phone number 发送失败**  
   - 状态：暂无明确 fix PR

7. [#41669](https://github.com/nousresearch/hermes-agent/issues/41669) — **Desktop Gateway 模式下无法附加截图/文件**  
   - 状态：暂无明确 fix PR

8. [#41699](https://github.com/nousresearch/hermes-agent/issues/41699) — **Docker 中 HERMES_UID/HERMES_GID 不生效**  
   - 状态：暂无明确 fix PR

9. [#41732](https://github.com/nousresearch/hermes-agent/issues/41732) — **Discord 进度输出泄露为代码块**  
   - 状态：暂无明确 fix PR

### P3 / 体验与兼容性回归
10. [#41750](https://github.com/nousresearch/hermes-agent/issues/41750) — **Desktop sidebar 水平滚动条回归**  
    - 状态：有对应修复 PR [#41775](https://github.com/nousresearch/hermes-agent/pull/41775)

11. [#41739](https://github.com/nousresearch/hermes-agent/issues/41739) — **Dashboard React 无限重渲染崩溃**  
    - 状态：有对应修复 PR [#41787](https://github.com/nousresearch/hermes-agent/pull/41787)

12. [#41745](https://github.com/nousresearch/hermes-agent/issues/41745) — **企业代理环境下辅助功能 SSL/连接错误**  
    - 状态：有对应修复 PR [#41780](https://github.com/nousresearch/hermes-agent/pull/41780)

13. [#41744](https://github.com/nousresearch/hermes-agent/issues/41744) — **禁用 title generation 配置失效**  
    - 状态：暂无明确 fix PR

---

## 5) 功能请求与路线图信号
今天的新功能请求非常集中，且与现有 PR 形成了明显“需求—实现”对应关系，说明部分需求有较高概率进入下一版本。

### 高概率纳入下一版本的方向
1. **Desktop 预览链路增强**
   - [#41702 自动打开 assistant-message 的 preview attachment](https://github.com/nousresearch/hermes-agent/issues/41702)
   - [#41701 YAML frontmatter 渲染为表格](https://github.com/nousresearch/hermes-agent/issues/41701)
   - [#41736 assistant-message Preview 链接走 file tab](https://github.com/nousresearch/hermes-agent/issues/41736)
   - 对应 PR：
     - [#41762](https://github.com/nousresearch/hermes-agent/pull/41762)
     - [#41787](https://github.com/nousresearch/hermes-agent/pull/41787)（相关桌面渲染稳定性）

   **判断**：这是非常明确的桌面工作流优化，且需求呈同一方向聚集，优先级很可能较高。

2. **Desktop 主题系统增强**
   - [#41766 DesktopThemeTypography 增加 baseSize/fontSize 支持](https://github.com/nousresearch/hermes-agent/issues/41766)
   - 对应 PR：[#41770](https://github.com/nousresearch/hermes-agent/pull/41770)

   **判断**：属于一致性补齐，风险低、收益明确，适合快速合入。

3. **Gateway 会话恢复与崩溃恢复**
   - [#41763 crash-cause diagnostics](https://github.com/nousresearch/hermes-agent/issues/41763)
   - [#41696 turn checkpoint](https://github.com/nousresearch/hermes-agent/issues/41696)
   - 对应 PR：
     - [#41765](https://github.com/nousresearch/hermes-agent/pull/41765)
     - [#41772](https://github.com/nousresearch/hermes-agent/pull/41772)

   **判断**：这是当前最有路线图特征的方向之一，因为它直接回应了用户对“断线可恢复”的核心诉求。

4. **成本/可观测性补齐**
   - [#41710 deepseek-v4-flash pricing missing](https://github.com/nousresearch/hermes-agent/issues/41710)
   - [#41731 xiaomi (MiMo) pricing missing](https://github.com/nousresearch/hermes-agent/issues/41731)

   **判断**：虽然是数据配置类问题，但对 insights / Langfuse / 成本监控很关键，容易被纳入小版本修正。

5. **多平台能力增强**
   - [#41659 Apple Silicon GPU underutilized for STT](https://github.com/nousresearch/hermes-agent/issues/41659)
   - [#41767 optional-skills/email: add agenticboxes-email](https://github.com/nousresearch/hermes-agent/issues/41767)
   - [#41771 WeCom native streaming](https://github.com/nousresearch/hermes-agent/pull/41771)

   **判断**：这类需求代表生态扩展方向，若合并将进一步强化 Hermes 的“多通道智能体平台”定位。

---

## 6) 用户反馈摘要
从今日 Issues 的描述中，可以很清楚地看到用户的真实痛点：

### 1. 用户最怕“中断后丢内容”
- [#41696](https://github.com/nousresearch/hermes-agent/issues/41696)
- [#41645](https://github.com/nousresearch/hermes-agent/issues/41645)

用户希望在 gateway 崩溃、终端异常关闭、WSL 重启等情况下，**上下文和生成中的内容都能保留下来**。这说明 Hermes 已被用于较长链路、较高依赖度的任务，不再只是短对话工具。

### 2. 桌面端正在被当成“主工作台”使用
- [#41735](https://github.com/nousresearch/hermes-agent/issues/41735)
- [#41750](https://github.com/nousresearch/hermes-agent/issues/41750)
- [#41782](https://github.com/nousresearch/hermes-agent/issues/41782)
- [#41781](https://github.com/nousresearch/hermes-agent/issues/41781)

用户对滚动位置、侧边栏、跳转行为、构建一致性非常敏感，说明桌面端已不是“可选界面”，而是重要生产入口。

### 3. 跨平台兼容性是实际使用门槛
- [#41737](https://github.com/nousresearch/hermes-agent/issues/41737) Linux 更新卡死
- [#41676](https://github.com/nousresearch/hermes-agent/issues/41676) macOS 健康检查异常
- [#41662](https://github.com/nousresearch/hermes-agent/issues/41662) Windows cron / kill 兼容问题

这类反馈表明，Hermes 的用户群已非常分散，平台细节会直接决定可用性。

### 4. 用户期待更“智能”的预览/附件工作流
- [#41702](https://github.com/nousresearch/hermes-agent/issues/41702)
- [#41701](https://github.com/nousresearch/hermes-agent/issues/41701)
- [#41736](https://github.com/nousresearch/hermes-agent/issues/41736)

用户不满足于“能显示”，而是希望预览内容自动打开、结构化呈现、链接能自然进入文件管理流。说明 UX 正在成为核心竞争力。

### 5. 可观测性与计费准确性也受到关注
- [#41710](https://github.com/nousresearch/hermes-agent/issues/41710)
- [#41731](https://github.com/nousresearch/hermes-agent/issues/41731)

用户希望不同模型的成本统计准确可见，这对实际部署、审计和成本控制很重要。

---

## 7) 待处理积压
由于本次数据覆盖的是“今天”的活跃项，严格意义上的“长期未响应”样本不多；但以下 **高优先级、尚未看到明确修复闭环** 的问题，值得维护者尽快纳入 backlog 处理：

- [#41737 Linux Desktop 更新卡死](https://github.com/nousresearch/hermes-agent/issues/41737)
- [#41676 macOS gateway 健康检查误判](https://github.com/nousresearch/hermes-agent/issues/41676)
- [#41662 Windows cron / os.kill 兼容问题](https://github.com/nousresearch/hermes-agent/issues/41662)
- [#41645 WSL/异常关闭后会话损坏](https://github.com/nousresearch/hermes-agent/issues/41645)
- [#41660 WhatsApp JID suffix 缺失](https://github.com/nousresearch/hermes-agent/issues/41660)
- [#41744 auxiliary.title.enabled 被忽略](https://github.com/nousresearch/hermes-agent/issues/41744)

### 维护者提醒
当前最值得优先处理的是：
1. **会话恢复 / 崩溃恢复**（[#41696](https://github.com/nousresearch/hermes-agent/issues/41696), [#41645](https://github.com/nousresearch/hermes-agent/issues/41645)）  
2. **Desktop 更新与渲染稳定性**（[#41737](https://github.com/nousresearch/hermes-agent/issues/41737), [#41739](https://github.com/nousresearch/hermes-agent/issues/41739), [#41750](https://github.com/nousresearch/hermes-agent/issues/41750)）  
3. **平台适配与消息通道兼容**（[#41662](https://github.com/nousresearch/hermes-agent/issues/41662), [#41676](https://github.com/nousresearch/hermes-agent/issues/41660), [#41732](https://github.com/nousresearch/hermes-agent/issues/41732)）  

---

## 总体判断
Hermes Agent 今日呈现出典型的“高活跃、快迭代、强修复”状态：PR 量大，说明开发动力充足；但 Issues 关闭为 0，且集中爆发于桌面端与 gateway 的稳定性问题，表明项目正处于从“功能扩张”向“工程化成熟”过渡的关键期。若后续能尽快把 [#41696](https://github.com/nousresearch/hermes-agent/issues/41696)、[#41737](https://github.com/nousresearch/hermes-agent/issues/41737)、[#41662](https://github.com/nousresearch/hermes-agent/issues/41662) 等核心稳定性问题闭环，项目健康度会明显提升。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

以下为 **PicoClaw（sipeed/picoclaw）2026-06-08 项目动态日报**。  
数据特征：**Issues 0 更新、PR 2 更新、无新版本发布**。整体上属于**低噪音、以工程质量修复为主**的一天。

---

## 1. 今日速览

今天 PicoClaw 没有新增 Issues，也没有版本发布，项目外部反馈面相对安静。  
活跃度主要集中在代码层面的两个开放 PR，且都指向**基础工程质量提升**：一个是统一结构化日志输出，一个是修正错误包装方式以恢复 `errors.Is()` / `errors.As()` 的可用性。  
这意味着项目当前更偏向**稳定性、可观测性与可维护性**的打磨，而不是功能扩张。  
从日内节奏看，项目处于**中低活跃、低风险、质量导向**状态。

相关链接：  
- 仓库：<https://github.com/sipeed/picoclaw>  
- PR #3050：<https://github.com/sipeed/picoclaw/pull/3050>  
- PR #3051：<https://github.com/sipeed/picoclaw/pull/3051>

---

## 3. 项目进展

今日**没有已合并或已关闭的重要 PR**，因此没有可以确认的“已交付”增量。  
不过，当前两条开放 PR 本身代表了明确的推进方向：

- **PR #3050**：将 `log.Printf` / `fmt.Printf` 替换为结构化 logger  
  - 推进方向：统一日志管道，减少直接写入 stderr/stdout 的碎片化输出  
  - 价值：更利于生产环境日志检索、聚合和告警

- **PR #3051**：将错误包装从 `%v` 修正为 `%w`  
  - 推进方向：恢复错误链路的可追踪性  
  - 价值：让上层调用方可以正确使用 `errors.Is()` / `errors.As()` 判断和分类错误

总体来看，今天项目的“向前迈进”主要体现在**基础设施质量修复正在排队进入评审**，这类改动通常对长期稳定性收益较高。

相关链接：  
- PR #3050：<https://github.com/sipeed/picoclaw/pull/3050>  
- PR #3051：<https://github.com/sipeed/picoclaw/pull/3051>

---

## 4. 社区热点

基于当前数据，**没有活跃讨论型 Issues**，也没有评论数/反应数突出的条目。  
当天最接近“热点”的是两个新开的 PR，但它们目前都**评论为 0、点赞为 0**，说明尚处于提交初期，社区讨论尚未展开。

当前可见的潜在关注点：

- **日志标准化**：  
  PR #3050 反映出维护者希望把生产代码里的散落输出统一到结构化日志体系。  
  背后的诉求通常是：线上排障更快、日志字段更规范、可观测性更好。  
  链接：<https://github.com/sipeed/picoclaw/pull/3050>

- **错误链可追踪性**：  
  PR #3051 说明项目对错误封装和调用方判定能力有较高要求。  
  诉求通常来自：上层业务需要可靠区分“网络错误”“发送失败”“可重试/不可重试”等类型。  
  链接：<https://github.com/sipeed/picoclaw/pull/3051>

结论：**今日没有真正意义上的社区热点，更多是工程改进型 PR 的静默推进。**

---

## 5. Bug 与稳定性

今日没有新增 Issues，因此**没有公开记录的崩溃、回归或严重缺陷报告**。  
但从开放 PR 的内容看，项目正在修复两类会直接影响稳定性与排障效率的问题：

### 高优先级潜在稳定性问题
1. **错误包装不规范，影响调用方错误识别**  
   - 影响：`errors.Is()` / `errors.As()` 失效，可能导致上层误判错误类型，影响重试、降级或告警逻辑  
   - 状态：已有对应修复 PR  
   - 链接：<https://github.com/sipeed/picoclaw/pull/3051>

### 中优先级可观测性问题
2. **生产代码仍使用 `log.Printf` / `fmt.Printf` 直接输出**  
   - 影响：日志不进入统一 backend，线上排查、聚合、过滤和审计能力下降  
   - 状态：已有对应修复 PR  
   - 链接：<https://github.com/sipeed/picoclaw/pull/3050>

综合判断：**暂无外部报告的稳定性事故，但代码层面正在主动收敛潜在风险。**

---

## 6. 功能请求与路线图信号

今天没有新增 Issues，因此**没有明确的新功能请求**。  
不过，现有 PR 已经释放出清晰的路线图信号：

- **更强的结构化日志支持**  
  - 可能成为后续版本的工程基础能力  
  - 对应 PR：<https://github.com/sipeed/picoclaw/pull/3050>

- **更标准的错误处理与错误链保真**  
  - 这类改动通常会被纳入一个以“稳定性修复/质量提升”为主题的版本  
  - 对应 PR：<https://github.com/sipeed/picoclaw/pull/3051>

如果这两项 PR 顺利合并，它们很可能成为**下一版本中最先落地的底层改进**，优先级通常高于纯功能型需求，因为它们对后续开发、排障和兼容性都有基础性作用。

---

## 7. 用户反馈摘要

由于今天**没有 Issues 评论**，无法从真实用户对话中提炼出明确的痛点、满意点或场景反馈。  
换句话说，当前日报**缺少直接用户声音**，只能从 PR 内容间接推断关注点：

- 用户/维护者较重视 **日志可观测性**
- 用户/维护者较重视 **错误可判定性**
- 项目场景很可能对 **生产可维护性** 有较高要求

数据层面结论：**今日未采集到可引用的用户反馈样本。**  
相关仓库：<https://github.com/sipeed/picoclaw>

---

## 8. 待处理积压

截至今日，**没有长期未响应的 Issue 记录**；但从维护角度看，当前的“待处理积压”主要是两条新开放 PR：

- **PR #3050 — refactor: replace log.Printf/fmt.Printf with structured logger**  
  状态：OPEN，创建于 2026-06-08  
  关注点：日志体系统一、生产输出规范化  
  链接：<https://github.com/sipeed/picoclaw/pull/3050>

- **PR #3051 — fix: use %w instead of %v for error wrapping in channels and mcp**  
  状态：OPEN，创建于 2026-06-08  
  关注点：错误链保真、接口可诊断性  
  链接：<https://github.com/sipeed/picoclaw/pull/3051>

维护者建议优先关注这两项，因为它们属于**低表面功能变更、但高长期收益**的基础修复；一旦积压，通常会持续影响日志治理和错误治理的后续工作。

---

### 总体结论

PicoClaw 今天整体表现为：**外部反馈安静、内部工程修复活跃、项目健康度稳定**。  
没有版本发布和 Issue 增量说明没有明显事故；两条开放 PR 则表明项目正在向**更规范的日志体系**和**更可靠的错误处理**演进。  
若这些 PR 顺利合并，项目的可维护性和线上排障能力会获得实质提升。

如需，我也可以把这份日报进一步整理成：  
1) **适合团队周报的精简版**，或  
2) **适合公众号/飞书消息推送的摘要版**。

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

# IronClaw 项目动态日报  
**日期：2026-06-08**  
仓库：[`nearai/ironclaw`](https://github.com/nearai/ironclaw)

---

## 1) 今日速览
今天 IronClaw 的公开动态整体偏低：**过去 24 小时仅新增/活跃 1 条 Issue，未出现 PR 更新，也没有新版本发布**。  
从活跃度看，项目处于**低变更、轻量维护**状态，说明开发推进节奏较平缓，但社区反馈仍在持续进入。  
当前最值得关注的是一个**高影响兼容性 Bug**：`openai/gpt-5.5` 在当前版本下会被强制携带 `temperature=0.7`，导致请求直接返回 400。  
这类问题对实际可用性影响较大，虽不是“多点开花”的高活跃日，但**稳定性风险信号较明确**。  
- 相关 Issue：[`#4535`](https://github.com/nearai/ironclaw/issues/4535)

---

## 2) 版本发布
**今日无新版本发布。**  
- Releases：[`nearai/ironclaw Releases`](https://github.com/nearai/ironclaw/releases)

---

## 3) 项目进展
**今日无 PR 合并或关闭，因此没有可量化的功能推进或修复落地。**  
从项目进展角度看，今天没有“代码侧”实质推进，整体前进主要停留在**问题暴露与需求收集**层面。  
这意味着后续进展是否加速，取决于维护者是否能快速响应当前的兼容性问题并推动修复 PR。  
- PR 列表：[`nearai/ironclaw Pull Requests`](https://github.com/nearai/ironclaw/pulls)

---

## 4) 社区热点
今日社区讨论热点主要集中在以下 Issue（也是当前唯一活跃项）：

### ① `openai/gpt-5.5` 忽略 Temperature 设置
- Issue：[`#4535`](https://github.com/nearai/ironclaw/issues/4535)
- 状态：Open
- 作者：sunglow666
- 评论数：0
- 👍：0

**背后诉求分析：**  
用户希望 UI 中的 Temperature 设置能够真实生效，但目前在 `openai/gpt-5.5` 场景下，请求被固定携带 `temperature=0.7`，与模型约束不兼容，直接导致 400 错误。  
这反映出用户对 IronClaw 的核心期待不是“能连通”，而是**参数控制必须准确、可预测**，尤其是在模型兼容性逐步变化的情况下。  
- 仓库首页：[`nearai/ironclaw`](https://github.com/nearai/ironclaw)

> 今日没有 PR 热点，因为没有任何 PR 更新。

---

## 5) Bug 与稳定性
按严重程度排序，今日报告的稳定性问题如下：

### 高：`openai/gpt-5.5` 请求参数错误导致接口直接失败
- Issue：[`#4535`](https://github.com/nearai/ironclaw/issues/4535)
- 现象：无论 UI 中 Temperature 设为多少，实际请求仍发送 `temperature=0.7`
- 结果：模型返回 HTTP 400，提示该模型不支持 0.7
- 影响：**模型不可用**
- 已有 fix PR：**未见**
- 备注：这是典型的**参数透传/模型适配回归**问题，优先级应较高

### 中/低：今日未见其他新增 Bug 报告
- Issues 列表：[`nearai/ironclaw/issues`](https://github.com/nearai/ironclaw/issues)

---

## 6) 功能请求与路线图信号
今日没有明确的新功能需求型 Issue，现有活跃内容更偏向**兼容性修复**而非功能扩展。  
不过从 `#4535` 可以提炼出一个明显的路线图信号：  
- **需要更细粒度的模型参数适配逻辑**，避免对不同模型统一套用同一套默认参数
- 对于 `openai/gpt-5.5` 这类新模型，IronClaw 可能需要在下一版本中加强：
  1. 模型能力检测  
  2. Temperature 约束校验  
  3. 请求参数的动态降级/屏蔽策略

若后续出现对应修复 PR，这类兼容性工作很可能被纳入下一个版本的修复范围。  
- 相关 Issue：[`#4535`](https://github.com/nearai/ironclaw/issues/4535)  
- PR 页面：[`nearai/ironclaw/pulls`](https://github.com/nearai/ironclaw/pulls)

---

## 7) 用户反馈摘要
从今日公开 Issues 中可以提炼出以下真实用户反馈：

### 主要痛点
- **参数设置“看起来能调，实际不生效”**：用户在 UI 中修改 Temperature，但底层请求未按预期变化。
- **模型兼容性不足会直接阻断使用**：不是结果质量问题，而是请求层面直接报错，属于高阻断体验问题。
- **用户期待可控性**：IronClaw 作为 AI 智能体/个人 AI 助手工具，用户很重视对模型行为的可预测控制。

### 用户场景
- 使用 `openai/gpt-5.5` 的对话或智能体任务场景
- 依赖 Temperature 调节生成随机性/创造性的用户
- 需要稳定跑通 staging 环境的集成测试或内部验证场景

### 满意/不满意点
- **不满意**：参数被覆盖、请求失败、无法使用
- **尚未体现满意点**：今日没有正向反馈或成功案例相关评论

- 反馈来源：[`Issue #4535`](https://github.com/nearai/ironclaw/issues/4535)

---

## 8) 待处理积压
基于今天的数据，**没有明显“长期未响应”的老旧高优先级 Issue/PR 可识别**。  
不过有一个值得立即关注的待处理项：

### 当前优先待处理
- `openai/gpt-5.5` Temperature 兼容性问题：[`#4535`](https://github.com/nearai/ironclaw/issues/4535)

**原因：**  
该问题直接影响模型可用性，且属于当前新增/活跃问题中唯一的高影响项。虽然它并非“长期积压”，但从维护优先级看应尽快进入 triage。  
- Issues 列表：[`nearai/ironclaw/issues`](https://github.com/nearai/ironclaw/issues)

---

## 总体判断
**项目健康度：中性偏谨慎。**  
优点是今日没有大规模故障、没有新增发布风险，也没有 PR 争议；  
但缺点也很明确：**没有代码层推进，同时出现了一个会直接阻断模型使用的兼容性 Bug**。  
如果维护团队能快速响应 `#4535`，项目稳定性会明显改善；否则该问题可能成为用户对新模型支持信心的负面信号。  

如果你需要，我也可以把这份日报进一步整理成：
1. **适合发邮件/飞书的简报版**  
2. **适合内部看板的表格版**  
3. **包含“风险等级/优先级”字段的运维版**

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

# CoPaw 项目动态日报（2026-06-08）

## 1. 今日速览
今天 CoPaw 的社区活跃度保持在较高水平：过去 24 小时内共更新 7 条 Issues、6 条 PR，且没有新版本发布，说明当前仍处于高频迭代与问题收敛阶段。  
从内容看，讨论焦点主要集中在**模型接入兼容性、会话管理能力、插件扩展体系、MCP 工具控制**以及**稳定性修复**。  
今日关闭了 4 个测试规划类 Issue 和 1 个 WIP PR，表明团队在做架构与测试基建的整理和收敛，而不是单纯堆功能。  
整体判断：项目处于**活跃推进、偏工程化建设**阶段，健康度不错，但用户侧对“接入兼容”和“稳定性”的诉求仍然明显。  

---

## 3. 项目进展
今日最值得关注的推进，主要不是“功能正式发布”，而是几个方向的**前置收敛与基础能力建设**：

- **插件扩展基础设施继续推进**  
  PR [#4997](https://github.com/agentscope-ai/QwenPaw/pull/4997) 和 [#4998](https://github.com/agentscope-ai/QwenPaw/pull/4998) 都在做 WIP 级别的插件扩展架构，覆盖菜单、路由、UI Slot、Chat 扩展 API 等能力。  
  这意味着项目正在从“单体应用”向“可扩展平台”演进，属于中长期架构升级信号。

- **MCP 工具控制能力增强**  
  PR [#5002](https://github.com/agentscope-ai/QwenPaw/pull/5002) 提出“按服务器维度白名单控制工具”，并带前端开关 UI。  
  这对企业/复杂场景非常关键：用户不再只能“整站启用/禁用 MCP”，而是可以细粒度控制工具暴露面。

- **稳定性修复正在补位**  
  PR [#5000](https://github.com/agentscope-ai/QwenPaw/pull/5000) 针对 `loop_config.json / prd.json` 损坏导致的 agent 崩溃做修复，这是典型的高价值稳定性补丁。  
  如果合并，将明显降低“配置异常导致整段会话崩掉”的风险。

- **扩展/卸载生命周期治理**  
  PR [#5008](https://github.com/agentscope-ai/QwenPaw/pull/5008) 增加 uninstall hooks 并暴露 skill provider API。  
  这类工作通常意味着插件/技能体系正在补齐生命周期管理，是平台化能力的重要一环。

- **前端测试规划在收敛**  
  今日关闭的 Issues [#5004](https://github.com/agentscope-ai/QwenPaw/issues/5004)、[#5005](https://github.com/agentscope-ai/QwenPaw/issues/5005)、[#5006](https://github.com/agentscope-ai/QwenPaw/issues/5006)、[#5007](https://github.com/agentscope-ai/QwenPaw/issues/5007) 都属于 Vitest 测试计划拆分项。  
  这说明团队正在把“高体量测试工作”拆成可执行单元，利于后续持续提升覆盖率。

**总体评价：**  
今天的代码/协作推进更偏向“打地基”和“降风险”，不是单纯追求功能数量；从长期看，这是项目向更稳定、更可扩展方向前进的积极信号。  
链接汇总：[#4997](https://github.com/agentscope-ai/QwenPaw/pull/4997) / [#4998](https://github.com/agentscope-ai/QwenPaw/pull/4998) / [#5000](https://github.com/agentscope-ai/QwenPaw/pull/5000) / [#5002](https://github.com/agentscope-ai/QwenPaw/pull/5002) / [#5008](https://github.com/agentscope-ai/QwenPaw/pull/5008)

---

## 4. 社区热点
今日讨论最集中的热点，基本都围绕**可用性、兼容性和检索效率**展开：

1. **模型接入/兼容性问题最受关注**  
   - Issue [#5003](https://github.com/agentscope-ai/QwenPaw/issues/5003)：用户反馈“使用阿里 coding plan 的 qwen3.7-plus 会一直卡住”，评论数 3，是今日最活跃条目。  
   - Issue [#5001](https://github.com/agentscope-ai/QwenPaw/issues/5001)：用户询问是否支持 9router，评论数 2。  
   这说明社区对“更多模型源接入 + 连接稳定性”的需求很强，且不是单纯的功能好奇，而是直接影响使用。

2. **会话管理/检索效率需求开始浮现**  
   - Issue [#4999](https://github.com/agentscope-ai/QwenPaw/issues/4999)：希望“会话按标题筛选”。  
   这通常出现在用户会话量上来之后，说明产品正进入“多会话、高频使用”的真实场景，用户开始关注信息检索效率。

3. **插件体系是潜在高热话题**  
   - PR [#4997](https://github.com/agentscope-ai/QwenPaw/pull/4997) 与 [#4998](https://github.com/agentscope-ai/QwenPaw/pull/4998) 都在推进插件扩展基础设施，虽然当前未见评论数据，但从主题上看极可能成为后续社区讨论重点。  
   这类 PR 一旦成熟，通常会显著扩大生态吸引力。  

**背后诉求总结：**  
社区正在从“能不能用”转向“好不好用、稳不稳定、能不能接更多来源、能不能更快找到内容”。  
链接：[#5003](https://github.com/agentscope-ai/QwenPaw/issues/5003) / [#5001](https://github.com/agentscope-ai/QwenPaw/issues/5001) / [#4999](https://github.com/agentscope-ai/QwenPaw/issues/4999) / [#4997](https://github.com/agentscope-ai/QwenPaw/pull/4997) / [#4998](https://github.com/agentscope-ai/QwenPaw/pull/4998)

---

## 5. Bug 与稳定性
按严重程度排序，今日主要风险点如下：

### 高：模型调用卡死 / 会话不可用
- Issue [#5003](https://github.com/agentscope-ai/QwenPaw/issues/5003)  
  用户报告在使用阿里 coding plan 的 `qwen3.7-plus` 时“会一直卡住”。  
  这类问题通常直接影响主流程，属于高优先级稳定性问题。  
  **是否已有 fix PR：** 本次数据中**未看到直接对应的修复 PR**。

### 中高：配置文件损坏导致 agent 崩溃
- PR [#5000](https://github.com/agentscope-ai/QwenPaw/pull/5000)  
  该修复针对 `loop_config.json` / `prd.json` 被 LLM 编辑损坏、并发写入异常等导致的崩溃问题。  
  这是明显的“防崩溃”补丁，若合并会显著提升会话容错能力。  
  **状态：** 仍为开放 PR，建议优先审查合并。

### 中：第三方模型/路由器接入失败
- Issue [#5001](https://github.com/agentscope-ai/QwenPaw/issues/5001)  
  用户询问 9router 支持，并给出“models cannot connect”的日志片段。  
  这更像兼容性/接入问题，不一定是代码崩溃，但会直接影响使用范围。  
  **是否已有 fix PR：** 数据中未见明确对应修复。

**整体判断：**  
当前稳定性问题主要集中在“模型链路”和“配置容错”两个面向；后者已有明确修复方向，前者仍需尽快定位是否为 provider 适配、超时策略或连接层问题。  
链接：[#5003](https://github.com/agentscope-ai/QwenPaw/issues/5003) / [#5001](https://github.com/agentscope-ai/QwenPaw/issues/5001) / [#5000](https://github.com/agentscope-ai/QwenPaw/pull/5000)

---

## 6. 功能请求与路线图信号
今日的新需求，基本都指向下一阶段的产品增强方向：

1. **会话筛选能力**  
   - Issue [#4999](https://github.com/agentscope-ai/QwenPaw/issues/4999)：会话按标题筛选  
   这说明用户已经积累到一定数量的会话，需要更好的检索/管理能力。  
   **路线图判断：** 很可能属于近期待办，属于“低风险、高感知”的体验增强项。

2. **更多模型源/路由器接入**  
   - Issue [#5001](https://github.com/agentscope-ai/QwenPaw/issues/5001)：9router support  
   - Issue [#5003](https://github.com/agentscope-ai/QwenPaw/issues/5003)：阿里 coding plan 的模型卡住  
   **路线图判断：** 如果项目目标是扩大兼容性，这类需求优先级会很高，尤其当它们来自真实使用场景而不是概念性提案。

3. **插件和工具生态能力**  
   - PR [#4997](https://github.com/agentscope-ai/QwenPaw/pull/4997) / [#4998](https://github.com/agentscope-ai/QwenPaw/pull/4998)（插件扩展基础设施）  
   - PR [#5002](https://github.com/agentscope-ai/QwenPaw/pull/5002)（MCP 工具白名单）  
   - PR [#5008](https://github.com/agentscope-ai/QwenPaw/pull/5008)（uninstall hooks + skill provider API）  
   **路线图判断：** 这组 PR 共同指向“插件化/平台化”路线，极可能构成下一版本的核心能力骨架。

**优先级推断：**  
若下一版本以“稳定性 + 可扩展性”为主题，`#5000`、`#5002`、`#5008`、`#4997/#4998` 这条线的落地概率较高。  
链接：[#4999](https://github.com/agentscope-ai/QwenPaw/issues/4999) / [#5001](https://github.com/agentscope-ai/QwenPaw/issues/5001) / [#5003](https://github.com/agentscope-ai/QwenPaw/issues/5003) / [#4997](https://github.com/agentscope-ai/QwenPaw/pull/4997) / [#4998](https://github.com/agentscope-ai/QwenPaw/pull/4998) / [#5002](https://github.com/agentscope-ai/QwenPaw/pull/5002) / [#5008](https://github.com/agentscope-ai/QwenPaw/pull/5008)

---

## 7. 用户反馈摘要
从今日 Issue 可以提炼出几类真实用户痛点：

- **“模型能不能稳定连上”是首要体验底线**  
  用户在 [#5003](https://github.com/agentscope-ai/QwenPaw/issues/5003) 中直接描述“会一直卡住”，说明只要链路不稳，功能再多也难以建立信任。

- **用户希望支持更多第三方模型/中转服务**  
  [#5001](https://github.com/agentscope-ai/QwenPaw/issues/5001) 反映出生态兼容性需求：不仅要支持官方或主流模型，还希望对各种 router / provider 有更宽的兼容面。

- **会话管理开始从“存在”走向“可检索”**  
  [#4999](https://github.com/agentscope-ai/QwenPaw/issues/4999) 的“按标题筛选”需求，说明用户已经在产生较多会话内容，开始需要更强的信息组织能力。

- **用户对排障过程是参与的**  
  从 [#5003](https://github.com/agentscope-ai/QwenPaw/issues/5003) 和 [#5001](https://github.com/agentscope-ai/QwenPaw/issues/5001) 的描述可以看出，用户会附带日志和环境信息，这通常意味着社区对项目有一定投入，但也说明当前问题已足够影响实际工作流。  

总体上，用户当前最在意的是：**稳定性、兼容性、可管理性**，而不是单纯追新功能。  
链接：[#5003](https://github.com/agentscope-ai/QwenPaw/issues/5003) / [#5001](https://github.com/agentscope-ai/QwenPaw/issues/5001) / [#4999](https://github.com/agentscope-ai/QwenPaw/issues/4999)

---

## 8. 待处理积压
本次数据中没有明确的“长期未响应”旧条目，新增问题和 PR 都是 2026-06-08 当天创建，因此严格意义上的历史积压不可见。  
不过，下面这些**今天新增但尚未实质落地**的开放项，已经具备“潜在积压”特征，建议维护者尽快分流：

- **高优先级稳定性待办**  
  - Issue [#5003](https://github.com/agentscope-ai/QwenPaw/issues/5003)：模型卡死问题  
  - PR [#5000](https://github.com/agentscope-ai/QwenPaw/pull/5000)：配置损坏崩溃修复  
  这两项直接影响核心可用性，建议优先处理。

- **平台化/生态型开放 PR**  
  - PR [#4997](https://github.com/agentscope-ai/QwenPaw/pull/4997)  
  - PR [#4998](https://github.com/agentscope-ai/QwenPaw/pull/4998)  
  - PR [#5002](https://github.com/agentscope-ai/QwenPaw/pull/5002)  
  - PR [#5008](https://github.com/agentscope-ai/QwenPaw/pull/5008)  
  这几项属于“影响面广、架构意义强”的工作，如果评审节奏慢，容易形成隐性积压。

- **兼容性需求待确认**  
  - Issue [#5001](https://github.com/agentscope-ai/QwenPaw/issues/5001)  
  需要尽快确认 9router 是否纳入支持范围，否则会持续累积类似诉求。  

**建议维护者关注顺序：**  
`#5003` → `#5000` → `#5002` / `#5008` → `#4997/#4998` → `#5001/#4999`。  
链接：[#5003](https://github.com/agentscope-ai/QwenPaw/issues/5003) / [#5000](https://github.com/agentscope-ai/QwenPaw/pull/5000) / [#5002](https://github.com/agentscope-ai/QwenPaw/pull/5002) / [#5008](https://github.com/agentscope-ai/QwenPaw/pull/5008) / [#4997](https://github.com/agentscope-ai/QwenPaw/pull/4997) / [#4998](https://github.com/agentscope-ai/QwenPaw/pull/4998) / [#5001](https://github.com/agentscope-ai/QwenPaw/issues/5001) / [#4999](https://github.com/agentscope-ai/QwenPaw/issues/4999)

---

如果你愿意，我也可以把这份日报进一步整理成**适合直接发到飞书/Slack/企微的简版**，或者输出成**表格化周报模板**。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报  
**日期：2026-06-08**  
仓库：`zeroclaw-labs/zeroclaw`

## 1) 今日速览
今天 ZeroClaw 的活跃度以 **PR 驱动** 为主，过去 24 小时内没有新的 Issues 动态，也没有新版本发布。  
仓库新增了 **3 个待合并 PR**，其中 2 个是偏稳定性/修复类，1 个是网关路由功能增强，说明当前团队主要在做 **配置安全、消息流恢复、Webhook 路由** 这三条线的迭代。  
从数据看，项目 **讨论热度不高，但代码推进持续**，属于“低噪音、偏工程实现”的健康状态。  
由于今天没有合并或关闭记录，说明 **产出主要停留在审查阶段**，项目整体处于“功能推进中、尚未落盘”的状态。

---

## 2) 版本发布
**今日无新版本发布**，暂无 Release 说明、破坏性变更或迁移事项需要披露。

---

## 3) 项目进展
今天 **没有已合并/已关闭的重要 PR**，因此严格意义上没有新的代码正式进入主干。  
但从新增 PR 的内容看，项目在以下方向继续推进：

- **配置安全性增强**  
  PR [`#7368`](https://github.com/zeroclaw-labs/zeroclaw/pull/7368)  
  `fix(config): warn on unknown security.otp.gated_actions entries`  
  解决 `security.otp.gated_actions` 允许“合法但不存在”的动作名静默通过的问题，降低配置误写带来的安全隐患。

- **Webhook 路由能力增强**  
  PR [`#7367`](https://github.com/zeroclaw-labs/zeroclaw/pull/7367)  
  `feat(gateway): route inbound webhooks per channel alias (#6312)`  
  修复多实例通道配置下 webhook 总是落到第一个实例的问题，朝着“多租户/多实例通道可用性”迈进一步。

- **消息输入/队列交互修复**  
  PR [`#7366`](https://github.com/zeroclaw-labs/zeroclaw/pull/7366)  
  `fix(zerocode): restore mid-turn input so the outbound message queue works`  
  重点恢复“回复中也可继续输入”的交互能力，直接影响消息队列工作流的可用性。

**整体评估：**  
今日没有“已完成落地”的里程碑，但从 PR 主题看，ZeroClaw 正在同时补齐 **安全、路由、交互流程** 三类基础能力，这类工作对项目长期稳定性和可扩展性很关键。

---

## 4) 社区热点
今天没有 Issues 活跃记录，且当前 3 个 PR 的评论数均未显示有效讨论量（`comments: undefined`，反应数为 0）。  
因此，**社区热点主要集中在 PR 层面，而不是 Issue 讨论层面**。

当前最值得关注的 3 个活跃条目：

1. [`#7368`](https://github.com/zeroclaw-labs/zeroclaw/pull/7368)  
   主题：安全配置校验  
   诉求：避免 OTP gate 配置中的拼写错误、伪造动作名静默生效。  
   背后问题：安全配置“看似成功、实际无效”是高风险场景，维护者对这类 silent failure 的敏感度很高。

2. [`#7367`](https://github.com/zeroclaw-labs/zeroclaw/pull/7367)  
   主题：网关 webhook 按 channel alias 路由  
   诉求：支持同一通道类型下多个实例的精确分发。  
   背后问题：多实例部署时的路由歧义会直接影响业务可用性，属于典型的扩展性需求。

3. [`#7366`](https://github.com/zeroclaw-labs/zeroclaw/pull/7366)  
   主题：恢复中途输入与消息队列工作流  
   诉求：修复“响应过程中无法继续输入”导致的交互割裂。  
   背后问题：这是面向实际用户操作链路的体验修复，通常代表已有用户在真实使用中遇到阻断。

**结论：**  
今日没有“讨论型热点”，但 PR 本身已经反映出项目的真实关注点：**稳定性、配置正确性、消息流交互体验**。

---

## 5) Bug 与稳定性
今日没有新增 Issues，因此 **没有来自 Issue 的直接故障报告**。  
不过，新增 PR 中包含两类明确的 Bug 修复信号，按严重程度排序如下：

### 高优先级 / 中等风险
- [`#7366`](https://github.com/zeroclaw-labs/zeroclaw/pull/7366)  
  `fix(zerocode): restore mid-turn input so the outbound message queue works`  
  **问题性质：** 交互链路回归，影响用户在回复过程中继续输入/提交内容。  
  **影响：** 直接影响核心工作流，可视为使用体验和功能可用性问题。  
  **当前状态：** 已有修复 PR。

### 低优先级 / 低风险
- [`#7368`](https://github.com/zeroclaw-labs/zeroclaw/pull/7368)  
  `fix(config): warn on unknown security.otp.gated_actions entries`  
  **问题性质：** 配置静默接受未知动作名，可能导致安全策略失效。  
  **影响：** 风险偏“配置误用 + 安全弱化”，更像预防性修复。  
  **当前状态：** 已有修复 PR。

### 非 Bug，但与稳定性相关
- [`#7367`](https://github.com/zeroclaw-labs/zeroclaw/pull/7367)  
  `feat(gateway): route inbound webhooks per channel alias (#6312)`  
  **问题性质：** 多实例配置下路由不准确。  
  **影响：** 不是传统崩溃 bug，但会造成业务投递错误，属于可靠性问题。  
  **当前状态：** 以功能增强方式修复。

**稳定性判断：**  
今日没有大规模事故、无崩溃、无公开回归波动；当前暴露的问题更偏 **局部回归与配置校验不足**，整体看项目稳定面尚可，但需要尽快处理这类“默默错误”的场景。

---

## 6) 功能请求与路线图信号
今日没有新的 Issues，因此 **没有来自 Issue 的显式功能请求**。  
但从 PR 内容可以推断出一些清晰的路线图信号：

### 可能进入下一版本的方向
1. **多实例/多通道路由能力增强**  
   - 相关 PR：[`#7367`](https://github.com/zeroclaw-labs/zeroclaw/pull/7367)  
   - 路线图信号：项目正在补齐网关层的精确路由能力，后续可能继续扩展 alias、分流、优先级或回退策略。

2. **安全配置可验证性提升**  
   - 相关 PR：[`#7368`](https://github.com/zeroclaw-labs/zeroclaw/pull/7368)  
   - 路线图信号：项目开始重视“配置是否真的生效”，未来可能出现更多配置 lint / 校验 / 警告机制。

3. **消息队列与交互流程重构**  
   - 相关 PR：[`#7366`](https://github.com/zeroclaw-labs/zeroclaw/pull/7366)  
   - 路线图信号：说明核心交互模型仍在演进，后续可能围绕“输入、发送、排队、并发交互”继续优化。

**判断：**  
如果这些 PR 在近期合并，下一版本很可能会以 **可用性修复 + 路由增强 + 安全提示** 为主，而不是大范围新功能发布。

---

## 7) 用户反馈摘要
今天 **没有 Issues 评论数据**，因此无法从评论中提炼真实用户反馈原文。  
不过结合 PR 描述，仍能归纳出项目当前用户最可能的痛点：

- **安全配置容易“写错但不报错”**  
  用户希望系统在安全策略配置错误时能及时提示，而不是静默接受。  
  这反映出用户对 **可解释性和配置反馈** 的要求很高。

- **多实例场景下消息路由不准确**  
  用户在使用多个 `whatsapp.work` / `whatsapp.personal` 一类配置时，需要 webhook 正确进入对应实例。  
  这说明项目的用户已经开始在 **更复杂的生产配置** 中使用 ZeroClaw，而不只是单实例测试环境。

- **消息回复中断用户继续输入**  
  用户希望在机器人/代理响应过程中仍可编辑、附加、提交输入。  
  这表明实际使用场景偏向 **高频交互式协作**，而不是一次性问答。

**满意/不满意趋势：**
- 满意点：项目明显在修复真实工作流问题，说明维护者在跟进使用场景。  
- 不满意点：当前暴露的问题多属于“细节但关键”的流程缺陷，一旦出现就会影响核心体验。

---

## 8) 待处理积压
从当前数据看，**没有长期未响应的重要 Issue 或 PR**：  
- Issues：0  
- PR：3 个均为 **2026-06-08 创建/更新**，暂无积压时间可言

因此今天不存在明显的“陈旧堆积”问题。  
不过，维护者仍应优先关注以下 3 个当天新增 PR，因为它们都触及核心链路：

- [`#7366`](https://github.com/zeroclaw-labs/zeroclaw/pull/7366) — 交互链路修复，可能影响用户主流程  
- [`#7367`](https://github.com/zeroclaw-labs/zeroclaw/pull/7367) — 网关路由修复/增强，影响多实例生产配置  
- [`#7368`](https://github.com/zeroclaw-labs/zeroclaw/pull/7368) — 安全配置校验，影响安全策略可信度

---

## 总体结论
ZeroClaw 今天呈现出一种典型的 **“低 Issue 噪音、PR 持续推进”** 状态。  
虽然没有版本发布和代码合并，但新增 PR 集中在 **安全性、路由正确性、交互恢复** 这三类高价值问题上，说明项目正在围绕“生产可用性”做细化打磨。  
从健康度看，项目当前 **没有明显失控信号**，但也尚未出现“快速交付”的版本落地；接下来几个 PR 的审查与合并节奏，将直接决定下一阶段的项目推进速度。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*