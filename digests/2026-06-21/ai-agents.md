# OpenClaw 生态日报 2026-06-21

> Issues: 4 | PRs: 26 | 覆盖项目: 13 个 | 生成时间: 2026-06-21 04:25 UTC

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

以下为 **OpenClaw 2026-06-21 项目动态日报**。

## 1. 今日速览
过去 24 小时，OpenClaw 维持了很高的开发活跃度：**4 条 Issue 更新、26 条 PR 更新、无新版本发布**。从内容看，今天的工作重心明显偏向 **会话状态、消息交付、跨渠道兼容性、TTS/渲染细节** 等“体验与稳定性”层面，而不是大版本功能发布。  
Issue 侧新增/活跃与关闭各占一半，说明反馈流转还算顺畅；但 PR 侧 **25 条待合并、仅 1 条关闭**，显示出当前的 **审查/合并积压仍然偏高**。整体判断：**项目开发很活跃，健康度良好，但合并吞吐略跟不上贡献速度**。  
相关动态可见：Issue [#95474](https://github.com/openclaw/openclaw/issues/95474)、[#95477](https://github.com/openclaw/openclaw/issues/95477)、[#95388](https://github.com/openclaw/openclaw/issues/95388)、[#95478](https://github.com/openclaw/openclaw/issues/95478)；PR [#95486](https://github.com/openclaw/openclaw/pull/95486) 等。

## 3. 项目进展
### 今日已关闭/推进的重要 PR
- **PR #95284** — *fix(openai-completions): close thinking block at reasoning→content transition...*  
  这是今天确认关闭的唯一一个 PR，属于 **消息流/推理块边界处理** 的修复，直接关系到使用 `/reasoning on` 场景下的最终回答呈现正确性。  
  链接：<https://github.com/openclaw/openclaw/pull/95284>

### 今日最值得关注的“推进中”修复
虽然大多数 PR 仍未合并，但今天的更新显示多个高价值修复已进入评审或等待作者阶段，方向集中在：
- **消息交付连续性**：  
  - [#95404](https://github.com/openclaw/openclaw/pull/95404) 流式输出非最终答案的 assistant deltas  
  - [#95413](https://github.com/openclaw/openclaw/pull/95413) 保持 Telegram rich message 的换行  
  - [#95483](https://github.com/openclaw/openclaw/pull/95483) 保留 WhatsApp 原生引用回复  
  - [#95484](https://github.com/openclaw/openclaw/pull/95484) 修复 compaction 后首个保留用户前 assistant 回复丢失  
- **会话/任务状态可靠性**：  
  - [#95481](https://github.com/openclaw/openclaw/pull/95481) 跨崩溃交付 origin 恢复的 lease 模块  
  - [#95472](https://github.com/openclaw/openclaw/pull/95472) 跳过已完成会话的 abort controller  
  - [#95322](https://github.com/openclaw/openclaw/pull/95322) rollover 后保留 usage footer  
- **兼容性与防护**：  
  - [#95420](https://github.com/openclaw/openclaw/pull/95420) 限制 OpenRouter model catalog 读取  
  - [#95416](https://github.com/openclaw/openclaw/pull/95416) 限制 Inworld TTS 音频/错误体读取，防 OOM  
  - [#95476](https://github.com/openclaw/openclaw/pull/95476) 修复工具路径参数中的幻觉扩展名  
  - [#95400](https://github.com/openclaw/openclaw/pull/95400) 识别 Codex usage-limit payloads，减少错误 fallback  

**整体推进判断**：今天更像是“**稳定性修补与交付质量加固日**”，不是“功能大发布日”。从 PR 方向看，项目正在系统性补齐会话状态、消息链路、跨渠道输出和异常兜底，属于对核心体验的持续强化。

## 4. 社区热点
> 说明：PR 的评论/反应数据未提供，因此本节以 **Issue 热度** 为主。

- **#95388** — “Self-learning skills — borrowing ideas from Hermes Agent and SkillClaw”  
  该 Issue 是今天讨论度最高的一个：**2 条评论、1 个赞**。用户明确表达“日常在用、很喜欢”，并提出希望 OpenClaw 像 Hermes Agent / SkillClaw 一样，能在后台从对话中自动学习并沉淀可复用技能。  
  这类反馈说明社区里存在一批 **高频深度用户**，他们不满足于“完成任务”，而希望系统具备 **自我积累能力**。  
  链接：<https://github.com/openclaw/openclaw/issues/95388>

- **#95477** — “Post-task self-reflection for skill auto-creation ... + prefix cache optimization”  
  这是对 #95388 的延伸跟进，用户进一步澄清：现有的 `skills.workshop.autonomous.enabled` 并不等同于他想要的“自学习技能生成”。  
  评论虽少，但信号很强：这是一个 **明确的产品能力缺口**，且用户愿意拿 Hermes、SkillClaw、Reasonix 做对标。  
  链接：<https://github.com/openclaw/openclaw/issues/95477>

- **#95474** — “missing_tool_result ... is classified unclassified and triggers cross-provider model fallback”  
  这是今天最值得关注的稳定性问题之一，虽然只有 1 条评论，但直接涉及 **工具执行失败后的模型 fallback 策略**，可能影响成本、连续性和 provider 可信度。  
  链接：<https://github.com/openclaw/openclaw/issues/95474>

- **#95478** — “希望在文本转语音前将表情符号过滤掉”  
  用户希望 TTS 前过滤 emoji，避免把 🌸 读成“樱花”这类不自然输出。此类反馈看似小，但非常典型地反映了 **语音输出质量** 对产品感知的重要性。  
  链接：<https://github.com/openclaw/openclaw/issues/95478>

## 5. Bug 与稳定性
按严重程度排序，今日最重要的稳定性信号如下：

### 1) P2：`missing_tool_result` 被误判为 unclassified，触发跨 provider fallback
- **Issue**：[#95474](https://github.com/openclaw/openclaw/issues/95474)  
- **影响**：本地工具执行失败后，系统可能错误地切换到下一个模型提供方，带来 **行为不一致、成本上升、状态污染** 等连锁问题。  
- **是否已有 fix PR**：**暂无明确直指该 issue 的修复 PR**；但相关方向可关注 [#95400](https://github.com/openclaw/openclaw/pull/95400)，它在改进 embedded-agent / fallback 分类逻辑。

### 2) P1/P2 级别的会话与消息交付修复正在推进
这些虽然不是“今日新报 Bug”，但直接对应高风险稳定性区域，属于后续最可能转化为回归修复的内容：
- [#95484](https://github.com/openclaw/openclaw/pull/95484) — compaction 后 assistant 回复丢失，属于 **会话完整性** 问题  
- [#95481](https://github.com/openclaw/openclaw/pull/95481) — detached task 的 origin 恢复，属于 **跨崩溃交付可靠性**  
- [#95404](https://github.com/openclaw/openclaw/pull/95404) — 流式 assistant delta 展示，属于 **回复链路一致性**  
- [#95413](https://github.com/openclaw/openclaw/pull/95413) / [#95483](https://github.com/openclaw/openclaw/pull/95483) — 分别对应 Telegram / WhatsApp 的消息交付细节  
- [#95416](https://github.com/openclaw/openclaw/pull/95416) / [#95420](https://github.com/openclaw/openclaw/pull/95420) — 防 OOM 与响应体上限控制，属于 **安全边界与可用性**  

### 3) P3：体验型问题，影响较小但可见度高
- **Issue**：[#95478](https://github.com/openclaw/openclaw/issues/95478)  
- **影响**：不影响主流程，但会显著影响 TTS 体验的自然度。  
- **是否已有 fix PR**：**有**，对应 PR 为 [#95486](https://github.com/openclaw/openclaw/pull/95486)。

## 6. 功能请求与路线图信号
今天出现的功能诉求，显示 OpenClaw 的路线图正在向三个方向收敛：

### A. “自学习/自反思”能力
- **Issue**：[#95388](https://github.com/openclaw/openclaw/issues/95388)  
- **后续跟进**：[#95477](https://github.com/openclaw/openclaw/issues/95477)  
- **信号解读**：用户希望系统在任务结束后自动沉淀技能，而不是只做一次性执行。这是典型的 **agent 进化能力** 诉求。  
- **纳入下一版本的可能性**：中等偏高。虽然功能本身较大，但它已经有明确用户需求、重复讨论和产品对标，值得进入中长期路线图。

### B. 输出质量与人机交互细节优化
- **Issue**：[#95478](https://github.com/openclaw/openclaw/issues/95478)  
- **对应 PR**：[#95486](https://github.com/openclaw/openclaw/pull/95486)  
- **信号解读**：用户对 TTS、换行、引用回复、token 展示等细节非常敏感。这意味着 OpenClaw 的使用场景已经从“可用”进入“**高频生产使用**”，小瑕疵也会被放大。  
- **纳入下一版本的可能性**：高。因为已有直接修复 PR，落地成本低、收益明确。

### C. 稳定性和容错优先级继续上升
- **Issue**：[#95474](https://github.com/openclaw/openclaw/issues/95474)  
- **相关 PR**：[#95481](https://github.com/openclaw/openclaw/pull/95481)、[#95400](https://github.com/openclaw/openclaw/pull/95400)、[#95420](https://github.com/openclaw/openclaw/pull/95420)  
- **信号解读**：社区开始关注 failure classification、fallback、session recovery、response size limit 这类“底层韧性”问题。  
- **纳入下一版本的可能性**：高。因为这些是平台型项目的核心竞争力，且大多已进入实现阶段。

## 7. 用户反馈摘要
从今天的 Issue 表述中，可以提炼出几条很真实的用户痛点与偏好：

1. **用户愿意把 OpenClaw 当成日常主力工具使用**  
   - 来自 [#95388](https://github.com/openclaw/openclaw/issues/95388)  
   - 反馈中明确出现 “I’ve been using OpenClaw daily and I love it”，这说明项目已经进入 **高频真实场景**，不是纯试验性工具。

2. **用户想要“越用越聪明”的系统，而不只是一次性任务执行器**  
   - 来自 [#95388](https://github.com/openclaw/openclaw/issues/95388) 与 [#95477](https://github.com/openclaw/openclaw/issues/95477)  
   - 这类反馈显示一部分用户在追求 **技能沉淀、背景学习、自动复用**，对 agent 的长期记忆和自我改进有期待。

3. **输出自然度比“技术正确”更容易被感知**  
   - 来自 [#95478](https://github.com/openclaw/openclaw/issues/95478)  
   - 语音把 emoji 读成“樱花”这类问题，会立刻让用户感到“怪怪的”。说明 **多模态输出质量** 已经成为产品体验的一部分。

4. **用户对容错和 fallback 策略很敏感**  
   - 来自 [#95474](https://github.com/openclaw/openclaw/issues/95474)  
   - 一次本地工具失败，不应无条件升级为跨 provider fallback；否则会给用户一种“系统不稳定、不可预测”的印象。

## 8. 待处理积压
以下是今天最值得维护者优先关注的未决项，虽然很多都很新，但都处在高优先级、强信号位置：

- **#95477** — 自学习技能与 post-task self-reflection 诉求，且带有 `needs-maintainer-review` / `needs-product-decision` 标签  
  链接：<https://github.com/openclaw/openclaw/issues/95477>

- **#95474** — P2 级 bug，涉及 tool failure 分类与模型 fallback，属于高风险稳定性问题  
  链接：<https://github.com/openclaw/openclaw/issues/95474>

- **#95481** — P1 的跨崩溃任务交付恢复模块，当前状态 `waiting on author`，但对消息可靠性很关键  
  链接：<https://github.com/openclaw/openclaw/pull/95481>

- **#95484** — P1 的 compaction / successor transcript 修复，涉及会话连续性，同样是 `waiting on author`  
  链接：<https://github.com/openclaw/openclaw/pull/95484>

- **#95420** — OpenRouter model catalog 读取上限控制，已是 `ready for maintainer look`，建议尽快评审  
  链接：<https://github.com/openclaw/openclaw/pull/95420>

- **#95347** — memory_search 超时处理，`waiting on author`，属于性能/兼容性相关的基础修复  
  链接：<https://github.com/openclaw/openclaw/pull/95347>

---

**总体结论**：  
OpenClaw 今天的状态可以概括为 **“高活跃、强修复、重稳定性”**。社区反馈已经从“想要更多功能”逐渐演变为“想要更强的自学习、交付一致性和输出自然度”，这通常是项目从早期可用走向成熟的重要信号。当前主要风险不是需求不足，而是 **PR 堆积与评审吞吐**；若能加快高优先级修复落地，项目健康度会进一步提升。

---

## 横向生态对比

以下为基于 2026-06-21 动态摘要整理的**横向对比分析报告**。

---

## 1) 生态全景

过去 24 小时，个人 AI 助手 / 自主智能体开源生态整体呈现出**“高活跃、低发布、强修复”**的状态：头部项目仍在高频迭代，但主要精力集中在**稳定性、消息交付、跨端兼容、权限治理**等生产可用性问题上，而不是大版本功能扩张。  
社区需求也明显从“能跑”转向“**可预测、可恢复、可审计、可沉淀**”。  
其中，OpenClaw 与 Hermes Agent 是最活跃的两极：前者偏向**体验与交付链路精修**，后者偏向**桌面端 / 网关 / 插件体系的广域修复**。  
ZeroClaw 则更像工程推进型项目，强调治理、依赖收敛和技能子系统建设。  
其余项目基本处于静默或低活动状态，说明当前生态资源和社区注意力高度集中在少数头部仓库。

---

## 2) 各项目活跃度对比

| 项目 | 今日 Issues 更新数 | 今日 PR 更新数 | Release 情况 | 健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 4 | 26 | 无新版本 | **高活跃，健康良好；但 PR 积压偏高（25 open）** |
| **Hermes Agent** | 16 | 49 | 无新版本 | **最高活跃度；修复驱动明显，回归压力较大（39 open PR）** |
| **ZeroClaw** | 1 | 5 | 无新版本 | **中等活跃；工程推进稳定，但讨论热度低、待审查项开始累积** |
| NanoBot | 0 | 0 | 无活动 / 未见 release | **低活跃，静默** |
| PicoClaw | 0 | 0 | 无活动 / 未见 release | **低活跃，静默** |
| NanoClaw | 0 | 0 | 无活动 / 未见 release | **低活跃，静默** |
| NullClaw | 0 | 0 | 无活动 / 未见 release | **低活跃，静默** |
| IronClaw | 0 | 0 | 无活动 / 未见 release | **低活跃，静默** |
| LobsterAI | 0 | 0 | 无活动 / 未见 release | **低活跃，静默** |
| TinyClaw | 0 | 0 | 无活动 / 未见 release | **低活跃，静默** |
| Moltis | 0 | 0 | 无活动 / 未见 release | **低活跃，静默** |
| CoPaw | 0 | 0 | 无活动 / 未见 release | **低活跃，静默** |
| ZeptoClaw | 0 | 0 | 无活动 / 未见 release | **低活跃，静默** |

**简要结论：**
- **Hermes Agent**：原始活跃度最高，但也是“问题最密集”的项目。
- **OpenClaw**：活跃度略低于 Hermes，但社区讨论更聚焦，方向更清晰。
- **ZeroClaw**：提交在推进，但社区噪音低，属于“工程型推进”。
- 其余项目：当前对生态影响有限。

---

## 3) OpenClaw 在生态中的定位

### 优势
1. **问题聚焦度高**  
   OpenClaw 今天的更新几乎都围绕**会话状态、消息交付、跨渠道一致性、TTS/渲染细节**展开，说明其产品重心非常明确：  
   > 不只是“能做事”，而是“输出要对、要稳、要自然”。

2. **真实用户使用深度高**  
   #95388 明确出现“日常使用、很喜欢”的反馈，并且用户开始要求**自学习技能沉淀**，这意味着项目已经进入高频真实场景，而不是试验性工具阶段。

3. **用户体验修复链路成熟**  
   今天已有明确修复方向的 PR 覆盖 Telegram、WhatsApp、TTS、流式输出、compaction 后续写等，表明项目在做系统性的体验加固。

### 技术路线差异
与 Hermes Agent / ZeroClaw 相比，OpenClaw 更偏向：
- **会话与消息流正确性**
- **跨渠道输出一致性**
- **TTS / 富文本 / 流式呈现体验**
- **失败分类与 fallback 收敛**

而 Hermes 更偏向：
- **桌面端 + 网关 + 插件 + 多适配器**
- **Windows / Desktop 回归修复**
- **模型 / provider 可用性与自动化路由**

ZeroClaw 更偏向：
- **runtime / channels / skills 的工程治理**
- **依赖收敛、写保护、审计、预提交门禁**
- **贡献流程和平台化能力**

### 社区规模对比
- 按今日数据，OpenClaw 的活跃度**明显高于 ZeroClaw**，且讨论热度也更高。
- 与 Hermes 相比，OpenClaw 的原始 PR/Issue 量略低，但**社区讨论更聚焦、产品感更强**。
- 从“有问题就有人提、且提得很具体”这一点看，OpenClaw 已具备**中大型真实用户群**特征。

---

## 4) 共同关注的技术方向

### 方向 A：可靠交付与会话连续性
**涉及项目：OpenClaw、Hermes Agent、ZeroClaw**

- OpenClaw：  
  - #95484 修复 compaction 后首个保留用户前 assistant 回复丢失  
  - #95481 跨崩溃交付 origin 恢复  
  - #95404 流式 assistant deltas  
  - #95413 / #95483 Telegram / WhatsApp 消息交付细节
- Hermes Agent：  
  - #49925 transcript 在 auto-compress 失败时不能丢失  
  - #49924 Discord typing 状态卡住修复
- ZeroClaw：  
  - #8080 WebSocket 场景下 cron_add 投递默认值补齐

**共性诉求：**  
AI 智能体正在从“生成内容”转向“稳定交付内容”，会话状态与消息链路正确性成为核心竞争力。

---

### 方向 B：失败分类、fallback 与可用性控制
**涉及项目：OpenClaw、Hermes Agent、ZeroClaw**

- OpenClaw：  
  - #95474 missing_tool_result 被误判为 unclassified，触发跨 provider fallback  
  - #95416 / #95420 控制读取体积与 OOM 风险
- Hermes Agent：  
  - #49937 Windows 上 provider 初始化失败  
  - #49918 静默 ws close 导致 CPU 飙升  
  - #49901 模型切换前做可访问性检查  
  - #49912 keyless API 误判为未配置
- ZeroClaw：  
  - #8079 STT 凭据 env fallback
  - #8083 清理无条件依赖，降低运行时耦合

**共性诉求：**  
系统不能只“试着跑”，而要在失败前后都保持可预测；这推动了 provider 检查、fallback 分类和资源边界控制。

---

### 方向 C：最小权限、审计与治理
**涉及项目：Hermes Agent、ZeroClaw、OpenClaw**

- Hermes Agent：  
  - #49942 为 delegate_task / agent_profiles 增加 mutating_tools denylist  
  - #49943 子代理 pre-spawn plugin hook
- ZeroClaw：  
  - #8082 skills dashboard 增加 write-guard / skipped-audit / shadowed_by  
  - #8078 local pre-submission gate
- OpenClaw：  
  - #95416 限制 Inworld TTS 音频/错误体读取  
  - #95420 限制 OpenRouter model catalog 读取

**共性诉求：**  
智能体平台正在从“开放式工具调用”转向“**可控、可审计、最小权限**”架构。

---

### 方向 D：自学习 / 技能沉淀 / 任务后反思
**涉及项目：OpenClaw、Hermes Agent、ZeroClaw**

- OpenClaw：  
  - #95388 自学习技能诉求  
  - #95477 post-task self-reflection for skill auto-creation
- Hermes Agent：  
  - #49927 / #49929 AFK-V2 routing 与 classifier 自动化推进
- ZeroClaw：  
  - #8082 skills dashboard 强化治理与可视化

**共性诉求：**  
用户已经不满足于“完成一次任务”，而希望系统能**沉淀经验、自动生成可复用能力**。

---

## 5) 差异化定位分析

### OpenClaw
- **功能侧重**：消息交付、会话连续性、跨渠道一致性、TTS 与渲染质量
- **目标用户**：高频日常使用者、依赖多渠道消息交付的个人 AI 助手用户
- **架构特征**：偏“会话系统 + 交付管线 + 输出体验”
- **关键词**：稳定、自然、连续、真实可用

### Hermes Agent
- **功能侧重**：桌面端、网关、插件、模型/provider、跨平台适配
- **目标用户**：桌面端重度用户、自动化编排用户、需要多 adapter 的 power user
- **架构特征**：偏“平台型 orchestrator”
- **关键词**：广域兼容、插件治理、桌面稳定性

### ZeroClaw
- **功能侧重**：runtime、channels、skills、治理机制、贡献流程
- **目标用户**：维护者、贡献者、工程团队
- **架构特征**：偏“工程基础设施 + 治理能力”
- **关键词**：审计、门禁、收敛、兼容

### 其他静默项目
- 当前没有足够信号显示其形成明显活跃社区或清晰路线图，更多像探索性仓库或低频维护项目。

---

## 6) 社区热度与成熟度

### 快速迭代阶段
- **Hermes Agent**：Issues/PR 量最大，且桌面端、Windows、适配器回归较集中，说明仍处在高频迭代与修复期。
- **OpenClaw**：高活跃且问题聚焦，说明已进入“真实场景验证 + 体验打磨”阶段。

### 质量巩固阶段
- **ZeroClaw**：以工程修复和治理增强为主，讨论少但方向明确，更像是在做底座加固。
- 特征是：提交不少，但社区争议少、发布少、更多是“修细节”。

### 低活跃 / 静默阶段
- NanoBot、PicoClaw、NanoClaw、NullClaw、IronClaw、LobsterAI、TinyClaw、Moltis、CoPaw、ZeptoClaw  
  - 今日无活动，属于当前生态中的低热度项目。

---

## 7) 值得关注的趋势信号

### 1. 从“能生成”转向“能稳定交付”
用户越来越关注 assistant 的**状态连续性、消息正确性、失败恢复**，而不是单轮输出质量。  
这对开发者意味着：状态机、transcript、fallback、compaction、流式输出，正在成为核心能力。

### 2. 从“开放工具”转向“可控工具”
子代理权限、pre-spawn hook、denylist、write-guard、预提交门禁，说明业界正在加速进入**最小权限与审计优先**阶段。  
对平台方来说，治理能力已不再是附属功能，而是产品可信度的一部分。

### 3. 从“单次任务”转向“可进化系统”
自学习技能、post-task self-reflection、技能自动生成等诉求在 OpenClaw 中已非常明确。  
这意味着 agent 产品正在从执行器演化为**经验积累型系统**。

### 4. 从“功能正确”转向“体验自然”
TTS 前过滤 emoji、Telegram/WhatsApp 换行、typing 状态、assistant delta 呈现，这些都是“最后一公里体验”。  
说明 AI 助手已经进入高频使用期，用户对细节容忍度显著下降。

### 5. 从“单一模型接入”转向“多 provider 运维”
OpenClaw 的 fallback 分类、Hermes 的 provider 初始化与可访问性检查、ZeroClaw 的 env fallback，都说明**模型运维能力**正在成为产品基础设施。  
对开发者的价值在于：未来竞争不只是模型能力，而是**模型编排与失败治理能力**。

---

## 一句话结论

这个生态今天的核心特征不是“谁发布了新功能”，而是**谁更接近生产级可用**。  
OpenClaw 在“消息交付与体验稳定性”上最聚焦，Hermes 在“跨端平台与适配器”上最活跃，ZeroClaw 在“治理与工程基础设施”上最稳；共同趋势则是：**AI 智能体正在从聪明，走向可靠、可控、可进化。**

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-06-21）

## 1. 今日速览
过去 24 小时，Hermes Agent 保持了**高强度活跃**：Issues 更新 16 条、PR 更新 49 条，且仍有 39 条 PR 处于待合并状态，说明项目处在持续迭代与集中修复阶段。  
今日没有新版本发布，当前变化主要集中在**稳定性修复、桌面端兼容性、网关/插件行为修正**。  
从新增问题分布看，**Windows / Desktop / CLI 相关回归**最集中，说明用户对跨平台可用性的敏感度非常高。  
整体来看，项目活跃度很高，但也呈现出“**修复驱动型开发**”特征：新问题增长快，维护压力不低。  

**版本发布：** 今日无新 Release（0 个）。

---

## 2. 项目进展
今日已关闭/完成的可见关键 PR，主要推进了“**测试稳定性、数据保护、交互卡顿修复**”三类能力：

- [#49946](https://github.com/NousResearch/hermes-agent/pull/49946) `test(matrix): make voice-detection tests hermetic against mention gating`  
  让 Matrix 语音检测测试摆脱环境变量泄漏影响，提升 CI 稳定性，属于典型的“**消除偶发失败**”修复。

- [#49925](https://github.com/NousResearch/hermes-agent/pull/49925) `fix(gateway): preserve transcript when hygiene auto-compress can't rotate (#21301)`  
  修复会话清理/自动压缩在无法 rotate 时覆盖原始 transcript 的数据丢失问题，属于**高优先级完整性修复**。

- [#49924](https://github.com/NousResearch/hermes-agent/pull/49924) `fix(discord): stop "is typing…" orphaned by typing-loop recreate race`  
  修复 Discord 平台“正在输入”状态卡住问题，改善消息流转体验，减少状态不同步。

此外，今日可见的 issue 侧收口也很明确：  
- [#49927](https://github.com/NousResearch/hermes-agent/issues/49927) AFK-V2 意图分类已关闭  
- [#49929](https://github.com/NousResearch/hermes-agent/issues/49929) AFK-V2 gateway shadow-mode 路由已关闭  

这说明项目不仅在补 bug，也在推进 **V2 gateway / 路由 / 意图分类** 这类中期架构工作。

---

## 3. 社区热点
今日讨论最集中的主题，几乎全部围绕**Windows/Desktop 回归、模型/供应商兼容性、以及网关与插件可控性**展开。

### 评论最活跃的 Issue（当前并列，均 1 条评论）
- [#49937](https://github.com/NousResearch/hermes-agent/issues/49937) Windows 上 openai-codex provider 初始化失败，fresh agent init 全部报错  
  诉求：修复 Windows 新建 agent 的初始化链路，避免 CLI / api_server / Desktop 全线失败。

- [#49929](https://github.com/NousResearch/hermes-agent/issues/49929) AFK-V2 gateway shadow-mode routing  
  诉求：将 V2 路由纳入 turn loop 的影子模式，体现出对新网关架构的推进关注。

- [#49927](https://github.com/NousResearch/hermes-agent/issues/49927) AFK-V2 intent classifier  
  诉求：希望 V2 gateway 不再要求手工传入 intent_class，说明自动化路由需求明确。

- [#49920](https://github.com/NousResearch/hermes-agent/issues/49920) Desktop 更新后卡在 CONNECTING  
  诉求：修复更新后前端与后端连接失败，典型的桌面端升级回归问题。

- [#49911](https://github.com/NousResearch/hermes-agent/issues/49911) NVIDIA NIM 模型列表只显示前 50 个  
  诉求：提高模型选择可见性，避免关键模型被截断。

- [#49903](https://github.com/NousResearch/hermes-agent/issues/49903) Desktop v0.17.0 “Composer is not available”  
  诉求：升级后输入框失效，是最影响主路径的桌面端故障之一。

### 热点背后的共性诉求
1. **桌面端不能坏**：升级、启动、输入、对话、按钮可达性，任何一个环节出问题都会直接阻断使用。  
2. **模型/供应商切换要可靠**：用户不接受“看起来可选，但实际不可用”的体验。  
3. **路由与插件需要更强控制**：尤其是 subagent、delegate_task 这一类自动化执行路径，用户在意安全边界与可审计性。  

> PR 侧虽然缺少完整评论统计，但从更新内容看，热点明显集中在桌面、网关、插件、通信适配器与测试稳定性上。  
相关 PR： [#49945](https://github.com/NousResearch/hermes-agent/pull/49945)、[#49941](https://github.com/NousResearch/hermes-agent/pull/49941)、[#49940](https://github.com/NousResearch/hermes-agent/pull/49940)、[#49933](https://github.com/NousResearch/hermes-agent/pull/49933)

---

## 4. Bug 与稳定性
按严重程度排序，今日高优先级问题如下：

### P1
- [#49903](https://github.com/NousResearch/hermes-agent/issues/49903) Desktop v0.17.0 升级后出现 `Composer is not available`，输入框失效  
  影响：核心交互路径不可用，属于**阻断级故障**。  
  修复状态：**暂未见对应 fix PR**。

### P2
- [#49937](https://github.com/NousResearch/hermes-agent/issues/49937) Windows 上 openai-codex provider 初始化 OpenAI client 失败（空错误）  
  影响：fresh agent init 在 CLI / api_server / Desktop 全线失败。  
  修复状态：已有对应修复方向 [#49945](https://github.com/NousResearch/hermes-agent/pull/49945)。

- [#49920](https://github.com/NousResearch/hermes-agent/issues/49920) Desktop 更新后卡在 CONNECTING  
  影响：更新成功但应用无法完成启动，属于明显回归。  
  修复状态：**暂未见对应 fix PR**。

- [#49918](https://github.com/NousResearch/hermes-agent/issues/49918) WeCom adapter 在静默 ws close 时 CPU 飙升到 100%  
  影响：平台适配器资源泄漏/忙等，长期运行风险高。  
  修复状态：已有修复 PR [#49941](https://github.com/NousResearch/hermes-agent/pull/49941)。

### P3
- [#49908](https://github.com/NousResearch/hermes-agent/issues/49908) Kanban 拖到 Done 后又回滚  
  影响：任务完成状态不可信，影响工作流体验。  
  修复状态：已有修复 PR [#49933](https://github.com/NousResearch/hermes-agent/pull/49933)。

- [#49939](https://github.com/NousResearch/hermes-agent/issues/49939) Orchestration settings 面板无法折叠  
  影响：UI 可用性问题。  
  修复状态：已有修复 PR [#49940](https://github.com/NousResearch/hermes-agent/pull/49940)。

- [#49938](https://github.com/NousResearch/hermes-agent/issues/49938) Desktop 冷启动时可能出现 `address already in use`  
  影响：启动竞争条件导致应用无法完成 boot。  
  修复状态：**暂未见对应 fix PR**。

- [#49911](https://github.com/NousResearch/hermes-agent/issues/49911) NVIDIA NIM 模型列表截断，隐藏关键模型  
  影响：模型选择不完整，影响可发现性。  
  修复状态：**暂未见对应 fix PR**。

- [#49888](https://github.com/NousResearch/hermes-agent/issues/49888) Windows Desktop 更新弹窗按钮在高缩放下被遮挡  
  影响：用户可能无法完成更新操作。  
  修复状态：**暂未见对应 fix PR**。

---

## 5. 功能请求与路线图信号
今日新增的功能请求，明显指向“**更安全的子代理、更易用的模型/工具选择、更强的可观测性**”。

- [#49943](https://github.com/NousResearch/hermes-agent/issues/49943) 为 `delegate_task` 子代理增加 pre-spawn plugin hook  
  信号：用户希望插件能在子代理启动前进行拦截、审计或阻止。  
  路线图意义：这很像下一阶段插件治理能力，优先级较高。

- [#49942](https://github.com/NousResearch/hermes-agent/issues/49942) 为 `delegate_task / agent_profiles` 增加 `mutating_tools` denylist  
  信号：希望 leaf/orchestrator 子代理默认不具备写文件等破坏性工具。  
  路线图意义：这是典型的**最小权限**需求，和安全/可控性强相关。

- [#49912](https://github.com/NousResearch/hermes-agent/issues/49912) Firecrawl keyless API 被误判为未配置  
  信号：用户希望“即开即用”的工具接入体验。  
  路线图意义：低摩擦工具支持，有较强落地价值。

- [#49901](https://github.com/NousResearch/hermes-agent/issues/49901) 模型切换后增加 pre-flight 可访问性检查  
  信号：用户不希望切换成功但运行时才发现 403/阻断。  
  路线图意义：这是直接提升产品可信度的改进，较可能进入近期版本。

- [#49948](https://github.com/NousResearch/hermes-agent/pull/49948) Desktop cron provider/model selectors  
  虽是 PR，但它反映了明确路线：**让桌面端调度能力与运行时配置对齐**。  
  很可能是近版本会优先吸收的能力。

- [#49935](https://github.com/NousResearch/hermes-agent/pull/49935) openai-codex web search provider  
  与 [#49937](https://github.com/NousResearch/hermes-agent/issues/49937) 的 Windows codex 初始化问题一起看，说明 Codex 相关能力仍在快速试验和收敛中。

---

## 6. 用户反馈摘要
从今日 issues 可见，用户反馈非常集中，且痛点真实明确：

- **Windows 桌面端稳定性差异大**  
  用户反复遇到升级后启动失败、按钮不可见、composer 不可用、命令行闪窗等问题。  
  场景上基本是“更新后马上不能用”，容错空间很小。

- **模型与供应商切换的可靠性不足**  
  用户期望 Hermes 能做“可用性验证”，而不是仅仅保存配置。  
  这类反馈说明产品已进入多模型、多 provider 的复杂运维阶段。

- **平台适配器对长连接与断线处理仍需加强**  
  WeCom、Telegram、Discord、Matrix 等场景中，用户关心的不只是功能，还包括 CPU、FD、状态机是否稳定。

- **自动化工作流用户希望更可控**  
  subagent、delegate_task、Kanban 完成态、Orchestration 面板等反馈表明，用户已经在用 Hermes 做较重的任务编排，而不是单轮聊天。

- **正向信号：维护响应速度快、修复路径清晰**  
  今日已有多条问题对应上修复 PR，说明项目并非“反馈堆积不处理”，而是处于**高噪声、高响应**的健康维护状态。

---

## 7. 待处理积压
由于本次数据只覆盖“今日新增/活跃”条目，**没有明显的长期沉默 issue** 可直接识别；但以下是今天新出现、且优先级较高、值得尽快分配的待办：

- [#49903](https://github.com/NousResearch/hermes-agent/issues/49903) P1：Desktop composer 不可用，属于最高优先级
- [#49920](https://github.com/NousResearch/hermes-agent/issues/49920) P2：桌面更新后卡在 CONNECTING
- [#49938](https://github.com/NousResearch/hermes-agent/issues/49938) P3：冷启动地址冲突
- [#49911](https://github.com/NousResearch/hermes-agent/issues/49911) P3：NVIDIA NIM 模型列表截断
- [#49888](https://github.com/NousResearch/hermes-agent/issues/49888) P3：高缩放下更新按钮不可见

另外，PR 队列仍有 **39 条待合并**，说明代码贡献活跃，但审查与合并压力也不小。值得优先关注的开放 PR 包括：
- [#49945](https://github.com/NousResearch/hermes-agent/pull/49945) Windows OpenAI/SSL 初始化修复
- [#49941](https://github.com/NousResearch/hermes-agent/pull/49941) WeCom CPU spin 修复
- [#49940](https://github.com/NousResearch/hermes-agent/pull/49940) Kanban 面板可关闭性修复
- [#49933](https://github.com/NousResearch/hermes-agent/pull/49933) 完成任务状态回滚修复

---

### 总体判断
Hermes Agent 今日表现为：**高活跃、强修复、桌面端压力显著**。  
项目在网关、插件、平台适配与测试稳定性上持续推进，但 Windows/Desktop 侧的回归问题较集中，短期内应优先保障“可启动、可输入、可更新、可完成任务”这条主链路。

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

过去24小时无活动。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报｜2026-06-21

## 1. 今日速览
过去 24 小时，ZeroClaw 处于**高开发活跃、低讨论热度**状态：新增 1 个 RFC Issue、5 个 Pull Request，且全部仍为 Open，说明团队在持续推进功能与修复，但尚未形成新的合入交付。  
变更覆盖 `runtime`、`channels`、`agent`、`gateway`、`skills` 等核心模块，既有稳定性修复，也有能力补强，属于典型的“工程推进日”。  
当前没有新 Release，意味着今天的产出仍停留在审查与集成阶段，**项目健康度偏稳，但待审查积压开始上升**。  
从互动数据看，Issue/PR 几乎没有评论和点赞，说明今天的活动更像是贡献者驱动的提交潮，而非社区争议潮。

---

## 2. 项目进展
**今日没有已合并/关闭的重要 PR；以下为最值得关注的推进中变更：**

- **[#8083](https://github.com/zeroclaw-labs/zeroclaw/pull/8083)** `fix(runtime): drop unconditional rumqttc dependency`  
  清理 `zeroclaw-runtime` 对 `rumqttc` 的无条件依赖，减少 runtime 体积与耦合度，属于典型的依赖收敛优化。

- **[#8082](https://github.com/zeroclaw-labs/zeroclaw/pull/8082)** `feat(skills): dashboard write-guard, skipped-audit, and shadowed_by`  
  围绕 skills dashboard 的后续增强，补齐写保护、跳过审计、shadowed_by 等能力，强化可观测性和数据治理。

- **[#8081](https://github.com/zeroclaw-labs/zeroclaw/pull/8081)** `fix(tools): ReadSkillTool uses agent workspace for skill lookup`  
  修复技能读取路径使用错误工作区的问题，属于直接影响功能正确性的修复。

- **[#8080](https://github.com/zeroclaw-labs/zeroclaw/pull/8080)** `fix(agent): inject wss channel delivery defaults for cron_add on WebSocket…`  
  补齐 WebSocket 场景下 `cron_add` 的通道投递默认值，修复调度/消息投递链路的兼容性问题。

- **[#8079](https://github.com/zeroclaw-labs/zeroclaw/pull/8079)** `fix(channels): add env-based credential fallback for OpenAI STT provider`  
  为 OpenAI STT 提供环境变量凭据回退，提升部署兼容性，减少仅依赖配置文件时的失败概率。

**整体判断：**  
今天的提交并未转化为已发布版本，但从内容上看，ZeroClaw 正在同时推进“修 bug、补兼容、强治理、减耦合”四条线；若这些 PR 合并，将对稳定性和可用性形成**一轮小幅但实在的正向推进**。

---

## 3. 社区热点
**今天没有明显的评论型热点**：当前新增 Issue/PR 的评论数均为 0（或未提供），反应数也为 0，因此社区讨论热度较低，更多是开发者单向提交。

从“议题重要性”看，最值得关注的是：

- **[#8078](https://github.com/zeroclaw-labs/zeroclaw/issues/8078)** `RFC: zerocode local pre-submission gate`  
  这是一个偏战略性的 RFC，围绕“本地预提交门禁”建立贡献者门槛，属于项目治理与贡献流程升级，未来影响面可能大于单个功能修复。

- **[#8082](https://github.com/zeroclaw-labs/zeroclaw/pull/8082)**  
  skills dashboard 的治理能力增强，说明用户/维护者正在把“可见性、可编辑性、审计性”作为重要方向。

- **[#8081](https://github.com/zeroclaw-labs/zeroclaw/pull/8081)**  
  路径解析类修复通常意味着真实使用中的摩擦点，值得尽快 review。

**背后诉求：**  
当前“热度”不是来自争议，而是来自**质量门槛、路径正确性、配置兼容性**这些偏工程底层的问题。

---

## 4. Bug 与稳定性
按潜在影响排序，今日可见的稳定性相关事项如下：

1. **[#8081](https://github.com/zeroclaw-labs/zeroclaw/pull/8081)** — 技能读取路径错误  
   - 影响面：中高  
   - 问题本质：`ReadSkillTool` 使用了错误目录进行 skill lookup，可能导致技能读取失败或读错内容。  
   - 是否已有 fix PR：**有**，该 PR 即为修复；但目前仍未合并。  
   - 关联 issue：[#8047](https://github.com/zeroclaw-labs/zeroclaw/issues/8047)

2. **[#8080](https://github.com/zeroclaw-labs/zeroclaw/pull/8080)** — WebSocket 场景下 `cron_add` 缺少默认投递配置  
   - 影响面：中  
   - 问题本质：在特定通道/运行时组合下，调度投递默认值不完整，可能造成行为偏差。  
   - 是否已有 fix PR：**有**，该 PR 即为修复；但目前仍未合并。  
   - 关联 issue：[#5862](https://github.com/zeroclaw-labs/zeroclaw/issues/5862)

3. **[#8079](https://github.com/zeroclaw-labs/zeroclaw/pull/8079)** — OpenAI STT 凭据缺少 env fallback  
   - 影响面：中低  
   - 问题本质：仅从配置文件读取 API key，忽略环境变量，导致常见部署方式下报错。  
   - 是否已有 fix PR：**有**，该 PR 即为修复；但目前仍未合并。

4. **[#8083](https://github.com/zeroclaw-labs/zeroclaw/pull/8083)** — runtime 依赖无条件引入 `rumqttc`  
   - 影响面：低  
   - 问题本质：不必要的依赖耦合，会增加运行时负担与维护复杂度。  
   - 是否已有 fix PR：**有**，但目前仍未合并。  
   - 更偏向稳定性与工程整洁，而非直接故障。

**今日结论：**  
今天没有新增“崩溃/回归”型公开 Issue，但**修复类 PR 数量明显偏多**，说明仓库正在集中清理已知问题。若这些 PR 进入主干，短期稳定性会有明显改善。

---

## 5. 功能请求与路线图信号
今日最强的功能/路线图信号来自：

- **[#8078](https://github.com/zeroclaw-labs/zeroclaw/issues/8078)**  
  `zerocode local pre-submission gate` 是一个明显的“贡献流程基础设施”需求。  
  这类能力一旦落地，会把项目的质量控制前移到本地，降低 CI 往返成本，属于**高优先级、偏平台化**方向。  
  **判断：** 若 RFC 获认可，极有可能进入下一阶段路线图。

- **[#8082](https://github.com/zeroclaw-labs/zeroclaw/pull/8082)**  
  skills dashboard 的 write-guard / audit / shadow 逻辑，说明项目正继续强化 skills 子系统的治理能力。  
  **判断：** 很可能纳入下一版本，尤其若 dashboard 是重要用户入口。

- **[#8080](https://github.com/zeroclaw-labs/zeroclaw/pull/8080)**、**[#8079](https://github.com/zeroclaw-labs/zeroclaw/pull/8079)**  
  这两类更像“patch 级兼容修复”，通常会被优先纳入近期版本，以减少生产使用中的配置摩擦。

- **[#8083](https://github.com/zeroclaw-labs/zeroclaw/pull/8083)**  
  依赖收敛类变更通常不会成为 headline feature，但很适合跟随维护版本一起合并。

---

## 6. 用户反馈摘要
**直接来自 Issues 评论的反馈：今日没有可提炼的评论内容**，因为当前可见条目评论数为 0。  
不过从 Issue/PR 的标题与摘要，可以归纳出几类真实使用痛点：

- **希望把质量门槛前置到本地**  
  来自 **[#8078](https://github.com/zeroclaw-labs/zeroclaw/issues/8078)**：贡献者不想等到提交后才被 CI 拒绝，而是希望在本地先跑完整门槛。

- **技能读取必须与 agent workspace 对齐**  
  来自 **[#8081](https://github.com/zeroclaw-labs/zeroclaw/pull/8081)**：用户对“路径错位导致功能失效”容忍度很低，说明 workspace 语义是高频操作路径。

- **配置兼容性要贴近运维习惯**  
  来自 **[#8079](https://github.com/zeroclaw-labs/zeroclaw/pull/8079)**：用户倾向通过环境变量注入密钥，而不是只依赖 YAML/配置项。

- **WebSocket/cron 场景需要默认行为更稳**  
  来自 **[#8080](https://github.com/zeroclaw-labs/zeroclaw/pull/8080)**：边缘运行模式下的默认值缺失，会直接影响可用性。

**满意/不满意信号：**
- 不满意点主要集中在：默认行为不够稳、配置入口不够灵活、路径语义不一致。
- 满意点则体现在：项目持续快速响应这些问题，并通过 PR 形式不断补齐细节。

---

## 7. 待处理积压
**在当前可见数据窗口内，没有识别到“长期未响应”的高龄 Issue/PR。**  
但如果按“今日新增待处理项”来看，积压已形成，建议维护者优先关注：

1. **[#8078](https://github.com/zeroclaw-labs/zeroclaw/issues/8078)** — 战略性 RFC，影响贡献流程设计  
2. **[#8081](https://github.com/zeroclaw-labs/zeroclaw/pull/8081)** — 直接影响功能正确性的 bug fix  
3. **[#8080](https://github.com/zeroclaw-labs/zeroclaw/pull/8080)** — 调度/通道兼容修复  
4. **[#8079](https://github.com/zeroclaw-labs/zeroclaw/pull/8079)** — 常见部署方式兼容修复  
5. **[#8082](https://github.com/zeroclaw-labs/zeroclaw/pull/8082)** — skills 治理增强，值得尽快评审  
6. **[#8083](https://github.com/zeroclaw-labs/zeroclaw/pull/8083)** — 维护性优化，可作为顺手合入项

**维护建议：**  
若团队准备发维护版，优先审查 **[#8081](https://github.com/zeroclaw-labs/zeroclaw/pull/8081)**、**[#8080](https://github.com/zeroclaw-labs/zeroclaw/pull/8080)**、**[#8079](https://github.com/zeroclaw-labs/zeroclaw/pull/8079)**；若准备做路线图讨论，则应优先评估 **[#8078](https://github.com/zeroclaw-labs/zeroclaw/issues/8078)**。

---

如果你希望，我可以把这份日报进一步整理成：
1. **更适合管理层阅读的摘要版**，或  
2. **更适合投递到 Slack/飞书的短报版**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*