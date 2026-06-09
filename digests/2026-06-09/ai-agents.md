# OpenClaw 生态日报 2026-06-09

> Issues: 19 | PRs: 33 | 覆盖项目: 13 个 | 生成时间: 2026-06-09 03:42 UTC

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

# OpenClaw 项目动态日报（2026-06-09）

## 1) 今日速览
今天 OpenClaw 处于明显的**高强度修复与兼容性收敛期**：过去 24 小时内有 **19 条 Issue 更新**、**33 条 PR 更新**，但**没有新 Release**，说明社区与维护者的注意力主要集中在稳定性、认证/Provider 兼容、消息投递与会话恢复等核心链路上。  
从问题分布看，P1/P2 的占比不低，且很多都带有 `session-state`、`message-loss`、`auth-provider`、`crash-loop` 等高影响标签，表明真实用户路径上的故障仍在被持续暴露。  
好消息是：当天已有 **9 个 PR 关闭/合并**、**5 个 Issue 关闭**，说明修复节奏并不慢，且不少变更直接针对可用性和兼容性风险。  
整体来看，项目健康度仍属**活跃且可控**，但短期内的主要风险是：**会话恢复、消息链路、跨 Provider 兼容**这三类问题的叠加。  

---

## 2) 项目进展
今天较有分量的 PR 关闭/合并，整体把项目往“更稳、更可运维”推进了一大步：

- [#91551](https://github.com/openclaw/openclaw/pull/91551) **Fix config.patch explicit array replacement**  
  这是一个影响面很广的配置安全修复：将 `config.patch` 的数组替换行为明确化，避免未确认的 patch 静默删除数组项。对 docs / iOS / Web UI / Gateway / Agents 都有保护价值，能减少“配置改坏了但看不出来”的风险。

- [#91550](https://github.com/openclaw/openclaw/pull/91550) **fix: bound native hook relay lifetime**  
  给原生 hook relay 加了统一 deadline，防止 stdin/桥接路径长期挂住。对 timeout、挂死、输入路径卡死这类问题是直接减压。

- [#91547](https://github.com/openclaw/openclaw/pull/91547) **Fix Docker store seed target packages**  
  修复 Docker runtime-assets 的 seed 包装策略，避免把不该进当前架构的 optional packages 一并打进去。对多架构构建和发布稳定性很关键。

- [#91568](https://github.com/openclaw/openclaw/pull/91568) **perf(control-ui): trace first assistant event**  
  增强首个 assistant 事件的链路追踪，提升 Control UI 首响应时延观测能力。属于“先把问题量化”的基础建设。

- [#91583](https://github.com/openclaw/openclaw/pull/91583) **perf(control-ui): warn on slow first replies**  
  在 UI 侧对慢首答进行警告，更利于用户感知与故障定位。

- [#91574](https://github.com/openclaw/openclaw/pull/91574) **feat: dogfood reusable ClawHub package publish**  
  这是发布链路的工程化改造，能提升可复用性和发布一致性。

- [#91430](https://github.com/openclaw/openclaw/pull/91430) **fix(openai): honor configured embedding model input limits**  
  直接修复第三方 OpenAI-compatible embedding 模型输入限制不匹配导致的索引失败问题。

- [#91395](https://github.com/openclaw/openclaw/pull/91395) **fix(cron): inherit default model fallbacks for plain-string agent models**  
  修复 cron 场景下模型 fallback 丢失的问题，降低单点模型失败风险。

**阶段性判断：**  
今天的合并/关闭 PR 以**稳定性、配置安全、发布工程、可观测性**为主，说明项目正在把“能跑”进一步推向“可控、可诊断、可回滚”。  
按数量看，**9 条 PR 关闭/合并**，对应 **5 条 Issue 关闭**，修复产出是明显存在的；但从问题主题看，核心链路仍有不少高优先级待解。  

---

## 3) 社区热点
今天讨论热度最高的主题，集中在**会话恢复/消息丢失、流式渲染、成本控制、更新一致性、渠道稳定性**。

- [#91555](https://github.com/openclaw/openclaw/issues/91555)  
  **Feishu `/compact` 被长模型调用“饿死”并在 300s per-chat cap 下被驱逐**  
  - 评论数：2  
  - 👍：1  
  - 这是今天最活跃的 Issue。它触发的是典型的“长会话不可恢复”焦虑：用户明确在表达“我不是要新功能，我要把大会话救回来”。

- [#91575](https://github.com/openclaw/openclaw/issues/91575)  
  **请求在发起前做预算/成本检查，避免免费额度被打爆**  
  - 评论数：1  
  - 👍：1  
  - 背后诉求很清晰：用户希望系统不要在额度耗尽后继续“盲打”，而是提前告警或拦截。

- [#91569](https://github.com/openclaw/openclaw/issues/91569)  
  **桌面端停留在旧版本，gateway 自更新后出现 protocol mismatch，却没有应用内提示**  
  - 评论数：1  
  - 👍：1  
  - 反映的是更新链路割裂：CLI/gateway 更新了，但桌面端不知道，导致用户卡在半升级状态。

- [#91582](https://github.com/openclaw/openclaw/issues/91582)  
  **Feishu streaming card 不自动增高，内容被裁切**  
  - 评论数：1  
  - 👍：1  
  - 这类问题直接影响“流式输出是否可读”，属于明显的交互体验缺陷。

- [#91564](https://github.com/openclaw/openclaw/issues/91564)  
  **Telegram 某个 forum topic 变成永久 inbound black hole**  
  - 评论数：1  
  - 👍：1  
  - 属于消息投递层的严重稳定性问题，用户关心的是“消息到底有没有进来”。

- [#91565](https://github.com/openclaw/openclaw/issues/91565)  
  **会话重命名能力**（已关闭）  
  - 👍：2  
  - 虽然已经关闭，但点赞数说明这是明确存在的产品需求：用户希望更好地管理历史会话。

**PR 侧说明：**  
本次数据没有提供 PR 评论数，因此无法定量判断 PR 热度；但从标签和内容看，讨论焦点仍是“兼容性修复”和“安全/稳定性增强”。

---

## 4) Bug 与稳定性
按严重程度排序如下：

### P1 / 高优先级开放问题

- [#91555](https://github.com/openclaw/openclaw/issues/91555) **Feishu `/compact` 被长调用饿死，300s cap 导致大会话不可恢复**  
  - 状态：OPEN  
  - 影响：`session-state`、`message-loss`  
  - 是否已有 fix PR：**未见明确对应 PR**  
  - 这是今天最值得优先处理的会话恢复类问题，直接影响长会话可恢复性。

- [#91564](https://github.com/openclaw/openclaw/issues/91564) **Telegram forum topic 成为永久 inbound black hole**  
  - 状态：OPEN  
  - 影响：`session-state`、`message-loss`  
  - 是否已有 fix PR：**未见明确对应 PR**  
  - 属于“消息到了，但系统没有接住”的高风险故障。

- [#91569](https://github.com/openclaw/openclaw/issues/91569) **桌面端停留旧版本，gateway 自动更新后出现 protocol mismatch**  
  - 状态：OPEN  
  - 影响：行为错误 / 更新一致性  
  - 是否已有 fix PR：**未见明确对应 PR**  
  - 这类问题会让用户误以为“系统坏了”，实际上是版本协同失败。

### P2 / 中高优先级开放问题

- [#91542](https://github.com/openclaw/openclaw/issues/91542) **Gemini (jjcc/openai-compat) 拒绝 cron tool schema**  
  - 状态：OPEN  
  - 影响：`auth-provider` / 工具 schema  
  - 是否已有 fix PR：**有，[#91559](https://github.com/openclaw/openclaw/pull/91559)**  
  - 这是今天少数已经出现明确修复 PR 的问题，说明维护链路响应是跟得上的。

- [#91582](https://github.com/openclaw/openclaw/issues/91582) **Feishu streaming card 高度不自动增长，内容被裁切**  
  - 状态：OPEN  
  - 影响：`message-loss` / 可视化输出  
  - 是否已有 fix PR：**未见**

- [#91554](https://github.com/openclaw/openclaw/issues/91554) **systemd gateway service 更新后因环境变量未加载而重启失败**  
  - 状态：OPEN  
  - 影响：`auth-provider`、`crash-loop`  
  - 是否已有 fix PR：**未见**

- [#91585](https://github.com/openclaw/openclaw/issues/91585) **Codex app-server user MCP projection 丢失 OAuth 配置**  
  - 状态：OPEN  
  - 影响：`auth-provider` / MCP 兼容  
  - 是否已有 fix PR：**未见**

- [#91560](https://github.com/openclaw/openclaw/issues/91560) **Codex ACP native route 在 OAuth（ChatGPT login）下报 Authentication required**  
  - 状态：OPEN  
  - 影响：`auth-provider`  
  - 是否已有 fix PR：**未见**

- [#91562](https://github.com/openclaw/openclaw/issues/91562) **Feishu streaming replies 只显示最新 token**  
  - 状态：OPEN  
  - 影响：回归 / 流式渲染  
  - 是否已有 fix PR：**未见**

- [#91552](https://github.com/openclaw/openclaw/issues/91552) **Codex app-server binding sidecar 残留旧 GPT model，导致后续 embedded run 路由错误**  
  - 状态：OPEN  
  - 影响：`session-state`、模型路由  
  - 是否已有 fix PR：**未见**

### 今日已关闭的稳定性问题

- [#91577](https://github.com/openclaw/openclaw/issues/91577) **Subagent spawning broken on v2026.3.28**  
- [#91576](https://github.com/openclaw/openclaw/issues/91576) **memorySearch schema blocks `dimensions` key**  
- [#91571](https://github.com/openclaw/openclaw/issues/91571) **Dreaming reports `Embeddings: unavailable` when memory.backend is QMD**  
- [#91558](https://github.com/openclaw/openclaw/issues/91558) **Kimi Code thinking/tool replay fails**

这些已关闭项说明维护者当天确实在清理“已知故障面”，但仍有多个高影响开放问题留在队列里。

---

## 5) 功能请求与路线图信号
今天的新需求信号，主要指向**费用控制、会话管理、MCP 自动同步、移动端体验**这几个方向：

- [#91575](https://github.com/openclaw/openclaw/issues/91575) **请求增加预算/成本前置检查**  
  - 这类需求非常像下一步会被产品化的“保护阀”，尤其适合免费额度或按量计费场景。

- [#91572](https://github.com/openclaw/openclaw/issues/91572) **Dreaming light phase 应该 ingest workspace 文件创建事件**  
  - 说明用户希望 AI 对工作区结构变化更敏感，而不只是读 `memory/*.md`。

- [#91556](https://github.com/openclaw/openclaw/issues/91556) **支持 MCP `notifications/tools/list_changed` + 增加 HTTP reload endpoint**  
  - 这是典型的 MCP 生态适配诉求，偏平台级能力，优先级不低。

- [#91565](https://github.com/openclaw/openclaw/issues/91565) **会话重命名能力**  
  - 虽然已关闭，但这个需求信号很明确：用户需要更好的会话整理能力。

- [#91557](https://github.com/openclaw/openclaw/pull/91557) **Improve iPad and iPhone control surfaces**  
  - 虽然是 PR，但它本身也是路线图信号：移动端控制面正在向更完整的产品形态演进。

- [#91561](https://github.com/openclaw/openclaw/pull/91561) **keyless web_search providers 误报缺 key**  
  - 这类改动表明：随着 provider 类型增加， onboarding 与能力发现的 UX 仍在持续打磨。

**路线图判断：**  
结合今天合并的稳定性修复和在审 PR（如 [#91584](https://github.com/openclaw/openclaw/pull/91584)、[#91581](https://github.com/openclaw/openclaw/pull/91581)、[#91567](https://github.com/openclaw/openclaw/pull/91567)），下一版本大概率仍会优先围绕：  
1) **渠道消息交付可靠性**，  
2) **认证/Provider 兼容性**，  
3) **会话与更新链路稳定性**，  
4) **可观测性与 UX 小修**。  

---

## 6) 用户反馈摘要
从今天的 Issue 描述里，可以很清楚地提炼出用户的真实痛点：

- **长会话不可恢复，是最敏感的用户体验破坏。**  
  例如 [#91555](https://github.com/openclaw/openclaw/issues/91555) 指出 Feishu `/compact` 会被长模型调用“饿死”，最终导致大会话不可恢复。用户要的不是新能力，而是“别丢、别卡、能救回来”。

- **流式输出不仅要“能流”，还要“能看”。**  
  [#91582](https://github.com/openclaw/openclaw/issues/91582) 和 [#91562](https://github.com/openclaw/openclaw/issues/91562) 共同反映出：Feishu 场景里，渲染高度和 token 累积都可能出问题，影响阅读连续性。

- **成本控制是刚需，不是高级功能。**  
  [#91575](https://github.com/openclaw/openclaw/issues/91575) 说明免费额度用户非常在意“发送前先判断预算”，否则会出现重复失败请求和不必要的消耗。

- **更新链路不一致，会让用户感知为“系统坏了”。**  
  [#91569](https://github.com/openclaw/openclaw/issues/91569) 反映了 gateway/desktop 版本协同不足带来的 protocol mismatch，属于典型的运维型 UX 问题。

- **消息投递必须可验证、可恢复。**  
  [#91564](https://github.com/openclaw/openclaw/issues/91564) 的“inbound black hole”描述非常直接：用户最担心的是“消息到底有没有进来”。

- **多 Provider / OpenAI-compatible 生态正在扩大，但兼容性还没完全跟上。**  
  [#91585](https://github.com/openclaw/openclaw/issues/91585)、[#91560](https://github.com/openclaw/openclaw/issues/91560)、[#91542](https://github.com/openclaw/openclaw/issues/91542)、[#91552](https://github.com/openclaw/openclaw/issues/91552) 都说明，认证、schema、模型路由、工具投影层正在成为新的复杂区。

总体看，用户反馈非常“场景化”和“问题导向”：大家愿意给出复现场景、报错、版本号和业务影响，这对项目维护是好事，也说明项目已经进入真实部署深水区。

---

## 7) 待处理积压
> 说明：本日报只覆盖近 24 小时数据，**不足以严格判断“长期未响应”**。下面列的是**当前最容易演化为积压**、且优先级最高的待回应项。

### 优先关注的开放 Issue
- [#91555](https://github.com/openclaw/openclaw/issues/91555) — Feishu `/compact` 会话不可恢复，P1 + message-loss  
- [#91564](https://github.com/openclaw/openclaw/issues/91564) — Telegram topic inbound black hole，P1 + message-loss  
- [#91569](https://github.com/openclaw/openclaw/issues/91569) — 更新后 protocol mismatch，P1 + behavior bug  
- [#91554](https://github.com/openclaw/openclaw/issues/91554) — systemd gateway 重启失败，P2 + crash-loop  
- [#91585](https://github.com/openclaw/openclaw/issues/91585) — Codex MCP projection 丢 OAuth 配置，P2 + auth-provider  
- [#91562](https://github.com/openclaw/openclaw/issues/91562) — Feishu streaming 回归，P2 + regression  
- [#91582](https://github.com/openclaw/openclaw/issues/91582) — Feishu 卡片高度裁切，P2 + message-loss  
- [#91575](https://github.com/openclaw/openclaw/issues/91575) — 成本/预算前置检查，P2 + 产品决策  
- [#91572](https://github.com/openclaw/openclaw/issues/91572) — Dreaming 输入源增强，P2 + product decision  
- [#91556](https://github.com/openclaw/openclaw/issues/91556) — MCP list_changed / reload endpoint，P2 + 产品/平台路线图  

### 需要持续跟进的开放 PR
- [#91584](https://github.com/openclaw/openclaw/pull/91584) — Slack mention gating，当前需要真实行为证明  
- [#91581](https://github.com/openclaw/openclaw/pull/91581) — package update restart recovery，需验证恢复路径  
- [#91567](https://github.com/openclaw/openclaw/pull/91567) — OpenAI realtime voice auth 策略调整  
- [#91580](https://github.com/openclaw/openclaw/pull/91580) — dense text delta snapshot trimming，涉及 session-state 风险  
- [#91566](https://github.com/openclaw/openclaw/pull/91566) — stale main session startup recovery，影响面较大  

**总体提醒：**  
今天的“积压风险”不是数量，而是**高优先级问题很多都落在消息交付、认证、更新协同、会话状态**这些基础链路上。只要这些问题不收敛，就会持续放大用户对稳定性的感知。

---

## 横向生态对比

以下为基于 2026-06-09 各项目动态的**横向对比分析报告**，面向技术决策者与开发者。

---

## 1. 生态全景

个人 AI 助手 / 自主智能体开源生态，今天呈现出非常清晰的“**生产化深水区**”特征：大家不再只讨论“能不能跑”，而是在集中解决**会话恢复、消息可靠性、Provider 兼容、认证/计费正确性、跨平台一致性**这些基础问题。  
头部项目普遍没有发布新版本，但 PR 与 Issue 流转活跃，说明生态处于**高频修复、持续收敛**阶段。  
另一个明显信号是：**MCP、OpenAI-compatible、桌面端/gateway 协同、流式 UI、权限与审计**，已经成为多个项目共同面对的核心工程问题。  
整体看，这是一个从“功能探索”转向“平台化与可运维化”的生态。

---

## 2. 各项目活跃度对比

| 项目 | 今日 Issues 数 | 今日 PR 数 | Release 情况 | 健康度评估 |
|---|---:|---:|---|---|
| OpenClaw | 19 | 33 | 无新 Release | 高活跃，处于高强度修复与兼容性收敛期 |
| NanoBot | 0 | 0 | 无活动 | 静默 |
| Hermes Agent | 14 | 50 | 无新 Release | 高活跃，强修复导向，工程推进很快 |
| PicoClaw | 0 | 4 | 无新 Release | 低噪声活跃，偏质量巩固 |
| NanoClaw | 0 | 1 | 无新 Release | 低活跃，维护收尾型 |
| NullClaw | 0 | 0 | 无活动 | 静默 |
| IronClaw | 3 | 2 | 无新 Release | 中等偏高活跃，聚焦底层能力补强 |
| LobsterAI | 1 | 1 | 无新 Release | 低到中等活跃，偏产品体验增强 |
| TinyClaw | 0 | 0 | 无活动 | 静默 |
| Moltis | 0 | 0 | 无活动 | 静默 |
| CoPaw | 3 | 2 | 无新 Release | 中等偏高活跃，功能推进与问题修复并行 |
| ZeptoClaw | 0 | 0 | 无活动 | 静默 |
| ZeroClaw | 2 | 1 | 无新 Release | 中等活跃，偏架构与质量修正 |

---

## 3. OpenClaw 在生态中的定位

### 3.1 生态位置
OpenClaw 是今天这组项目里的**头部综合平台型代表**。  
与其他项目相比，它的特点不是“某一条链路做得最专”，而是**覆盖面最广、问题面最复杂、社区反馈最贴近真实生产环境**。

### 3.2 优势
- **场景覆盖广**：Feishu、Telegram、Codex、desktop/gateway、OpenAI-compatible provider、MCP 等都在同一生态内持续暴露问题。
- **修复节奏快**：今天有明显的 PR 合并/关闭产出，说明项目不是“讨论型社区”，而是“实际修复型社区”。
- **工程化能力强**：配置 patch、native hook relay deadline、Docker seed、可观测性增强等，显示出对稳定性和发布工程的重视。
- **用户反馈更真实**：Issue 主题高度集中在会话恢复、消息丢失、更新一致性，这通常意味着已经进入真实部署深水区。

### 3.3 与同类的技术路线差异
- **相对 Hermes Agent**：OpenClaw 更像“多渠道消息与会话平台”，Hermes 更偏“gateway/desktop/provider/file tools 的工程化打磨”。
- **相对 IronClaw**：OpenClaw 更强调端到端业务链路和用户体验，IronClaw 更强调运行时、鉴权与轨迹可观测性。
- **相对 PicoClaw / NanoClaw**：OpenClaw 已经是大规模社区驱动的复杂平台，后两者更像轻量或收敛型项目。

### 3.4 社区规模对比
仅从今日活跃信号看，OpenClaw 与 Hermes Agent 属于**第一梯队**。  
- OpenClaw：**问题覆盖更广，用户场景更复杂**，体现更大的外部使用面。  
- Hermes Agent：**PR 流转更密集**，体现更强的工程推进节奏。  

可以理解为：  
**OpenClaw 的“用户面”更宽，Hermes 的“开发面”更强。**

---

## 4. 共同关注的技术方向

### 4.1 Provider / 模型兼容性
涉及项目：**OpenClaw、Hermes Agent、IronClaw、CoPaw**  
共同诉求：
- OpenAI-compatible 接口兼容
- 多 Provider 配置正确识别
- tool schema / embedding limit / base URL / keyless provider 处理
- 避免“配置成功但调用失败”

### 4.2 会话状态、消息可靠性与流式体验
涉及项目：**OpenClaw、Hermes Agent、CoPaw、LobsterAI**  
共同诉求：
- 长会话可恢复
- 消息不丢、不重复
- 流式输出不卡、不裁切
- 首答延迟可观测、慢回复可提示

### 4.3 认证、权限、计费与安全默认值
涉及项目：**OpenClaw、Hermes Agent、IronClaw、ZeroClaw**  
共同诉求：
- OAuth / tenant identity / auth evidence 完整性
- 计费前置检查、避免误扣费
- recovery key、secret 不落普通日志
- webhook secret 读取与热更新安全

### 4.4 更新一致性与跨平台稳定性
涉及项目：**OpenClaw、Hermes Agent、ZeroClaw、PicoClaw**  
共同诉求：
- desktop/gateway 版本一致性
- macOS / Windows / Linux 行为统一
- CI lint 和测试覆盖到所有平台分支
- migration / close / restart 路径更健壮

### 4.5 可观测性与调试能力
涉及项目：**OpenClaw、Hermes Agent、IronClaw**  
共同诉求：
- 首个 assistant event tracing
- trajectory observer hook
- 状态和权限更可解释
- 方便审计、回放、排障

---

## 5. 差异化定位分析

| 定位类型 | 代表项目 | 核心侧重 | 目标用户 |
|---|---|---|---|
| 全栈平台型 | OpenClaw、Hermes Agent、CoPaw | 多渠道接入、Provider 兼容、会话/工具链稳定性 | 真实部署用户、集成开发者 |
| 底层运行时/架构型 | IronClaw、ZeroClaw | 鉴权、tenant、hook、轨迹、API 边界、CI 质量 | 平台工程师、核心贡献者 |
| 轻量维护/质量收敛型 | PicoClaw、NanoClaw | 配置持久化、迁移健壮性、lint/Close 处理 | 维护者、早期使用者 |
| 产品体验增强型 | LobsterAI | 通知、协作可见性、任务完成反馈 | 终端用户、协作场景用户 |
| 静默/低活动型 | NanoBot、NullClaw、TinyClaw、Moltis、ZeptoClaw | 今日无明显公开动向 | 暂无法判断 |

### 关键差异点
- **OpenClaw**：更偏“多场景大平台”，重在消息链路与会话恢复。
- **Hermes Agent**：更偏“桌面 + gateway + provider 工程体系”，重交互与跨平台。
- **IronClaw**：更偏“运行时底座”，重鉴权、tenant、可观测性。
- **CoPaw**：更偏“插件/A2A 与多渠道交互”，重生态扩展。
- **PicoClaw / NanoClaw**：更偏“稳定性修补和配置可靠性”，像在做基础加固。
- **LobsterAI**：更偏“协作体验与通知闭环”，产品味更强。

---

## 6. 社区热度与成熟度

### 第一层：快速迭代阶段
- **OpenClaw**
- **Hermes Agent**
- **CoPaw**
- **IronClaw**

特征：Issue/PR 活跃，用户反馈密集，问题集中在真实生产链路，说明已进入持续打磨期。

### 第二层：质量巩固阶段
- **PicoClaw**
- **NanoClaw**
- **ZeroClaw**

特征：以稳定性、CI、迁移、API 边界修正为主，功能增量较少，工程质量治理优先。

### 第三层：低噪声或静默阶段
- **NanoBot**
- **NullClaw**
- **TinyClaw**
- **Moltis**
- **ZeptoClaw**

特征：今日没有显著公开活跃，难以从社区层面判断当前演进方向。

### 介于产品增强与成熟收敛之间
- **LobsterAI**

特征：有明确功能增强，但体量不大，路线更偏体验补齐而非大规模架构演进。

---

## 7. 值得关注的趋势信号

### 7.1 “可用”正在让位于“可控、可恢复、可审计”
长会话恢复、消息投递可靠性、轨迹观察、状态可解释性，已经成为多个项目的核心议题。  
这对开发者的启示是：**AI 智能体不再只是推理问题，而是分布式状态系统问题。**

### 7.2 Provider 生态碎片化持续加剧
OpenAI-compatible、Gemini、MiniMax、Z.AI、OpenRouter、Claude/Codex 等多 Provider 并存，导致 schema、认证、计费、上下文限制都需要兼容。  
启示：**统一抽象层必须更强，否则集成成本会迅速放大。**

### 7.3 计费正确性已经是信任问题，不是附属功能
误扣费、额度检查、订阅权益优先级等问题频繁出现。  
启示：**费用链路需要前置校验与可追溯设计**，否则用户信任会先于功能崩塌。

### 7.4 跨平台质量门禁成为门槛能力
macOS、Windows、Linux 的行为一致性、lint 覆盖、服务启动语义、窗口行为，都在成为“能否进入生产”的分水岭。  
启示：**AI 智能体系统的竞争力，越来越取决于工程质量，而不是单点模型能力。**

### 7.5 MCP / 工具 schema 兼容是新一轮集成痛点
工具名非法字符、schema 拒绝、动态更新、列表变更通知等问题反复出现。  
启示：**MCP 生态正在变成智能体平台的重要接口层，谁先把兼容性做稳，谁就更容易形成生态壁垒。**

---

## 一句话总结

今天的开源 AI 智能体生态，已经从“功能探索期”进入“**平台化、生产化、质量治理期**”。  
头部项目的竞争焦点不再是“谁能接更多模型”，而是**谁能把会话、消息、认证、计费、跨平台和可观测性做得更可靠**。  

如果你愿意，我还可以把这份报告进一步压缩成：
1. **管理层 1 页版摘要**，或  
2. **技术团队晨会版要点清单**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

以下为 **Hermes Agent（NousResearch/hermes-agent）** 的 **2026-06-09 项目动态日报**。  
总体看，今天是一个**高活跃、强修复导向**的工作日：过去 24 小时共有 **14 条 Issue 变动**、**50 条 PR 变动**，但**没有新版本发布**。讨论和提交主要集中在 **gateway / desktop / provider / file tools / 跨平台稳定性** 等核心路径，说明项目仍处在持续打磨与快速迭代阶段。

---

## 1) 今日速览

- 今天项目整体活跃度很高，PR 流转远高于 Issue 增量，说明开发侧在密集推进功能与修复，但尚未形成新的 release 节点。
- 从话题分布看，用户关注点高度集中在**桌面端交互体验、网关启动/恢复逻辑、模型 provider 兼容性、文件工具路径处理**等“高频使用链路”。
- 另一方面，今天没有新版本发布，意味着当前更像是**修复收敛期**而非“发布验证期”。
- 质量信号上，已有若干问题对应到明确的修复 PR，说明团队对关键缺陷的响应速度仍然较快。

---

## 2) 版本发布

- **今日无新版本发布**（无 Release）。

---

## 3) 项目进展

今天已确认关闭/合并的关键 PR 主要有两类：**兼容性修复** 与 **能力补齐**。

### 已关闭的代表性 PR
- **#42564** [CLOSED] `feat(stt): add local_http provider for HTTP-based local STT service`  
  链接：<https://github.com/NousResearch/hermes-agent/pull/42564>  
  价值：把本地 STT 从“进程内模型”扩展到 **HTTP 型本地服务**，降低模型反复加载成本，也更适合部署型用户。

- **#42562** [CLOSED] `fix(xai): alias web_search Responses tool name`  
  链接：<https://github.com/NousResearch/hermes-agent/pull/42562>  
  价值：修复 xAI Responses 工具名兼容问题，减少不同平台工具 schema 不一致导致的调用失败。

### 今日推进的整体方向
虽然公开样本里已关闭 PR 数量有限，但今天可见的 open PR 质量很高，说明项目推进面非常广，覆盖：
- **gateway 能力增强**：workspace 命令、音频 TTS endpoint、终端命令展示优化
- **desktop 体验修复**：自动滚动、表格粘贴、运行面板、工作区切换
- **文件工具可靠性**：路径空格、转义字符处理
- **provider 兼容性**：DeepSeek / MiniMax / ZAI / OpenRouter 等模型与上下文元数据修正

**结论**：今天项目并非停滞，而是在为下一轮发布做“横向收敛”——把高频路径、跨平台兼容和交互稳定性优先补齐。

---

## 4) 社区热点

今天最活跃的话题主要集中在几个“直接影响可用性/成本/隐私”的问题上。

### 讨论最集中的 Issue
- **#42533** [CLOSED] MiniMax / ZAI API 调用失败，3 次重试后仍报 500/400  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42533>  
  评论数：2  
  诉求：用户希望 Hermes 在 provider 链路上更稳，至少要能正确区分上游 500、400 与模型兼容性问题，避免“重试无效但报错不清晰”。

- **#42536** [OPEN] Z.AI/GLM Coding Plan 用户被错误扣余额而非订阅额度  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42536>  
  评论数：1  
  诉求：这是一个典型的**计费/鉴权路由顺序**问题，用户最敏感的是“是否会被额外收费”。

- **#42524** [OPEN] macOS 26 下 gateway start/restart 走 fallback，`launchctl` 退出码 5  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42524>  
  评论数：1  
  诉求：用户希望 macOS 新版本上的 gateway 生命周期管理更可解释、更可控，而不是“能跑但状态不清楚”。

- **#42505** [OPEN] Matrix recovery key 默认写入普通日志  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42505>  
  评论数：1  
  诉求：这是明显的**安全与隐私**顾虑，用户希望默认行为更保守，避免敏感信息落到常规日志里。

### 热点判断
今天的讨论并不是“理念型争论”，而是非常典型的**生产可用性问题**：
- 钱会不会被误扣
- 密钥会不会泄露
- macOS/Windows 上会不会卡住
- provider 兼容是否稳定

这说明 Hermes 的用户已经进入更偏 **真实工作流依赖** 的阶段，对稳定性、计费正确性、可预期行为的要求很高。

---

## 5) Bug 与稳定性

下面按严重程度梳理今天的主要 Bug / 回归 / 稳定性问题。

### P1 / 高优先级

- **#42524** [OPEN] macOS 26：gateway start/restart 中 `launchctl` 退出 5，回退到 detached process  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42524>  
  影响：影响 gateway 在新 macOS 版本上的启动语义与状态一致性，属于核心运行路径问题。  
  是否已有 fix PR：**未见明确对应修复 PR**

### P2 / 中高优先级

- **#42536** [OPEN] Z.AI / GLM Coding Plan 被错误扣除 wallet balance  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42536>  
  影响：直接关系到用户成本与订阅权益，属于强烈的产品信任问题。  
  是否已有 fix PR：**未见**

- **#42505** [OPEN] Matrix recovery key 被默认写入普通日志  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42505>  
  影响：安全/隐私风险，尤其是 headless 或服务器部署场景。  
  是否已有 fix PR：**未见**

- **#42517** [OPEN] `ExecStop` 应写入 planned-stop marker，而非推断信号来源  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42517>  
  影响：gateway 停止流程的状态判断可能不稳定，容易引发系统服务管理上的歧义。  
  是否已有 fix PR：**未见**

- **#42544** [OPEN] Windows 上 terminal 工具每次执行都会闪 cmd 窗口  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42544>  
  影响：强烈的 UX 干扰，尤其在多轮工具调用时非常明显。  
  是否已有 fix PR：**未见**

- **#42503** [OPEN] post-tool 空/进度型 assistant turn 会被当成最终答案  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42503>  
  影响：可能导致任务提前停止，是“代理执行正确性”层面的关键问题。  
  是否已有 fix PR：**有，#42566**  
  PR 链接：<https://github.com/NousResearch/hermes-agent/pull/42566>

- **#42556** [OPEN] `write_file` 在带空格路径下创建了字面反斜杠目录  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42556>  
  影响：文件工具路径处理回归，直接影响写文件/补丁类操作。  
  是否已有 fix PR：**疑似有，#42565**  
  PR 链接：<https://github.com/NousResearch/hermes-agent/pull/42565>

### P3 / 低于上述但仍需关注

- **#42501** [OPEN] Desktop app “消失不见”  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42501>  
  影响：桌面安装/运行可见性问题，虽未必高危，但会显著损害用户信任。  
  是否已有 fix PR：**未见**

### 已关闭但值得记录的稳定性问题
- **#42533** [CLOSED] MiniMax / ZAI 调用失败  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42533>  
  状态：已关闭，但说明 provider 路由与兼容性仍需持续回归测试。

- **#42557** [CLOSED] Desktop 回复不滚动到底部  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42557>  
  状态：已关闭，属于桌面端典型交互问题。

---

## 6) 功能请求与路线图信号

今天的新功能需求并不少，而且大多和“工作流可用性”直接相关。以下几个方向，比较像下一阶段会被纳入路线图的候选。

### 高潜力需求
- **#42577** [OPEN PR] gateway 增加 `/workspace` 命令（兼容 `/cwd`）  
  链接：<https://github.com/NousResearch/hermes-agent/pull/42577>  
  方向判断：非常贴合 Hermes 的“会话绑定项目目录”能力，属于**gateway 工作区体验的补全项**。

- **#42525** [OPEN] Desktop UI 内允许切换 workspace/directory  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42525>  
  方向判断：与上面的 gateway workspace 能力高度一致，说明用户已经不满足于只改 config.yaml，希望在 UI 内闭环。

- **#42506** [OPEN] 增加 usememos/memos 作为官方 memory provider plugin  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42506>  
  方向判断：反映出用户希望 memory 层更开放、可插拔，插件生态有扩张信号。

- **#42575** [CLOSED] 增加“修改密码”按钮到用户安全设置  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42575>  
  方向判断：这是**账号自助管理**需求，说明项目正往更完整的产品化控制台演进。

- **#42568** [OPEN PR] OpenAI 兼容 `/v1/audio/speech` TTS endpoint  
  链接：<https://github.com/NousResearch/hermes-agent/pull/42568>  
  方向判断：如果落地，会显著增强对 OpenAI 风格客户端的兼容性，属于平台能力扩张。

### 路线图信号总结
今天的功能诉求大致分成三类：
1. **工作区/会话管理**：workspace、cwd、Desktop UI 切换目录  
2. **平台能力扩展**：TTS、memory provider、消息网关命令  
3. **自助运维与安全**：改密码、密钥不落日志、权限/计费路径正确

这说明 Hermes 的用户已经在要求它从“能用”走向“可管理、可扩展、可审计”。

---

## 7) 用户反馈摘要

从今天的 Issue 描述里，可以提炼出几条很真实的用户痛点：

### 1. 用户对“成本正确性”极其敏感
- 典型表现：**#42536**  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42536>  
  用户不接受“订阅用户却被算进 wallet balance”，因为这会直接影响信任与付费意愿。

### 2. 用户希望桌面端是真正可日常使用的生产工具
- 典型表现：**#42557**、**#42516**、**#42525**、**#42501**  
  链接：
  - <https://github.com/NousResearch/hermes-agent/issues/42557>
  - <https://github.com/NousResearch/hermes-agent/issues/42516>
  - <https://github.com/NousResearch/hermes-agent/issues/42525>
  - <https://github.com/NousResearch/hermes-agent/issues/42501>  
  痛点包括：回复位置错乱、会话排序不符合预期、无法直接换工作区、应用“消失”。

### 3. 用户非常在意跨平台稳定性
- 典型表现：**#42524**（macOS 26）、**#42544**（Windows）  
  链接：
  - <https://github.com/NousResearch/hermes-agent/issues/42524>
  - <https://github.com/NousResearch/hermes-agent/issues/42544>  
  说明 Hermes 已经被用于多平台真实环境，系统级兼容性问题会被迅速放大。

### 4. 用户喜欢把 Hermes 用在“自动化执行”而不是纯聊天
- 典型表现：**#42501** 中提到用 WhatsApp 检查 cronjobs  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42501>  
  说明用户把它当作跨渠道 agent / 自动化中枢使用，这类场景对工具调用、状态同步和通知准确性要求很高。

### 5. 安全与隐私默认值需要更保守
- 典型表现：**#42505**  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42505>  
  用户希望 recovery key、token、敏感中间态默认不要出现在普通日志里。

---

## 8) 待处理积压

> 说明：本次数据未提供每个 Issue/PR 的历史更新时间跨度，因此无法严格判定“长期未响应”。下面按**核心影响面 + 仍处于未关闭状态**挑出最值得维护者优先跟进的积压项；同时也列出几个与旧问题链路相关的持续修复信号。

### 优先关注的未关闭核心问题
- **#42524** macOS 26 gateway 启动/重启异常  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42524>

- **#42536** ZAI Coding Plan 计费路由错误  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42536>

- **#42505** Matrix recovery key 日志泄露风险  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42505>

- **#42544** Windows terminal 闪窗  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42544>

- **#42517** ExecStop 标记逻辑不稳  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42517>

- **#42501** Desktop app 消失  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42501>

### 与历史问题链路相关、建议继续盯紧的修复线
- **#41631** 相关 gateway 停止语义问题  
  链接：<https://github.com/NousResearch/hermes-agent/issues/41631>  
  当前关联：**#42517**、历史 PR **#41642 / #41690**

- **#41092** OpenRouter base URL 兼容问题  
  链接：<https://github.com/NousResearch/hermes-agent/issues/41092>  
  当前关联：**#42558**  
  PR 链接：<https://github.com/NousResearch/hermes-agent/pull/42558>

- **#42256** 表格粘贴问题  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42256>  
  当前关联：**#42573**  
  PR 链接：<https://github.com/NousResearch/hermes-agent/pull/42573>

- **#42366** streaming 自动滚动问题  
  链接：<https://github.com/NousResearch/hermes-agent/issues/42366>  
  当前关联：**#42570**  
  PR 链接：<https://github.com/NousResearch/hermes-agent/pull/42570>

- **#65** Slack reaction lifecycle 兼容问题  
  链接：<https://github.com/NousResearch/hermes-agent/issues/65>  
  当前关联：**#42561**  
  PR 链接：<https://github.com/NousResearch/hermes-agent/pull/42561>

---

### 综合判断

Hermes Agent 今天的状态可以概括为：**高活跃、高密度修复、高真实用户反馈**。  
项目在往“更稳定的 agent 平台”方向推进，尤其围绕 **gateway、desktop、provider、文件工具** 四个核心面持续打补丁与补能力；同时，**计费正确性、隐私默认值、跨平台行为一致性** 已经是用户最关心的底层信任问题。  
如果后续这些高优先级 open issue 能继续被快速闭环，下一版的用户体感提升会非常明显。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

以下为 **2026-06-09 PicoClaw（sipeed/picoclaw）项目动态日报**。

---

## 1. 今日速览

今日项目整体呈现出**“无用户侧事件、以代码修复与稳定性加固为主”的低噪声活跃状态**。  
过去 24 小时内没有 Issues 更新，也没有新版本发布，说明社区问题反馈与发布节奏都比较平稳。  
但 PR 侧有 **4 条新增且均处于 Open 状态**，集中在配置持久化、数据库/文件关闭错误处理、迁移兼容性等方向，体现出维护重点正在向**可靠性与代码健壮性**倾斜。  
从健康度看，项目当前没有明显外部故障信号，但也**尚未形成可交付的版本进展**，今日更偏“内部修补与审查积压”的阶段。  
GitHub 总览：<https://github.com/sipeed/picoclaw>

---

## 2. 版本发布

今日**无新版本发布**。  
Releases 为空，暂无可报告的版本更新、破坏性变更或迁移说明。  
Releases 页面：<https://github.com/sipeed/picoclaw/releases>

---

## 3. 项目进展

今日没有 PR 被合并或关闭，**主干未发生直接交付进展**；不过，4 条新增 PR 反映出项目正在推进一组明确的修复型改动，主要覆盖：

- **会话配置持久化修复**：#3067 修复 `dm_scope` 无法保存的问题，属于影响配置可用性的功能性 bug 修正。  
  链接：<https://github.com/sipeed/picoclaw/pull/3067>
- **临时文件关闭错误处理一致性**：#3066 统一显式忽略 `Close()` 返回值，减少误报和 linter 噪音。  
  链接：<https://github.com/sipeed/picoclaw/pull/3066>
- **数据库迁移/PRAGMA 失败路径健壮性**：#3065 处理 `db.Close()` 的返回值，增强迁移失败时的代码一致性。  
  链接：<https://github.com/sipeed/picoclaw/pull/3065>
- **配置迁移模型名类型检查**：#3064 为类型断言补上 `ok` 判断，避免畸形配置触发 panic。  
  链接：<https://github.com/sipeed/picoclaw/pull/3064>

**整体判断**：今天的“前进”主要体现在**稳定性补丁堆积**，而不是功能面落地；如果这些 PR 后续合并，项目将获得更好的配置兼容性、错误处理一致性和崩溃防护能力。  
PR 列表：<https://github.com/sipeed/picoclaw/pulls>

---

## 4. 社区热点

### 今日最活跃的讨论点
- **PR #3067：SessionConfig 增加 `DmScope` 字段以持久化 `dm_scope` 设置**  
  链接：<https://github.com/sipeed/picoclaw/pull/3067>  
  这是今天最接近“用户可感知问题”的条目，因为它直接修复了“UI 可改但保存后丢失”的配置痛点。  
  背后诉求很明确：用户希望后台配置项能够**真正持久化**，避免每次刷新后恢复默认值。

- **PR #3064：迁移模型名索引时增加类型检查**  
  链接：<https://github.com/sipeed/picoclaw/pull/3064>  
  反映出维护者在强化配置数据的容错边界，诉求是避免异常配置导致运行时崩溃。

- **PR #3065 / #3066：统一显式忽略 Close() 错误**  
  链接：<https://github.com/sipeed/picoclaw/pull/3065>  
  链接：<https://github.com/sipeed/picoclaw/pull/3066>  
  这类改动说明项目当前对“lint 清洁度”和“错误路径一致性”比较重视，诉求偏工程质量治理。

### 讨论热度判断
- 根据给定数据，**所有 PR 的评论数与点赞数均为 0**，因此今天并没有形成真正意义上的社区热点或争议讨论。
- Issues 侧也没有新增或活跃条目，因此**没有显著的用户集中反馈点**。  
Issues 页：<https://github.com/sipeed/picoclaw/issues>

---

## 5. Bug 与稳定性

今日没有新增 Issues，但从 PR 内容看，项目正在处理一组**潜在 bug / 稳定性缺陷**，按严重程度排序如下：

1. **高严重度：配置迁移中类型断言可能引发 panic**  
   - PR：#3064  
   - 问题：`model_name` 若不是 string，会在未检查类型的情况下触发 panic。  
   - 影响：可能导致配置迁移或启动路径崩溃。  
   - 状态：**已有 fix PR，当前为 Open**。  
   - 链接：<https://github.com/sipeed/picoclaw/pull/3064>

2. **中严重度：`dm_scope` 设置无法持久化**  
   - PR：#3067  
   - 问题：前端能改、保存后丢失，刷新即回默认值。  
   - 影响：用户配置体验受损，可能误判为“配置不生效”。  
   - 状态：**已有 fix PR，当前为 Open**。  
   - 链接：<https://github.com/sipeed/picoclaw/pull/3067>

3. **中低严重度：临时文件 Close 错误未显式处理**  
   - PR：#3066  
   - 问题：写入/同步失败路径中对 `tmpFile.Close()` 返回值处理不一致。  
   - 影响：主要是代码规范与错误处理一致性，间接影响排障可读性。  
   - 状态：**已有 fix PR，当前为 Open**。  
   - 链接：<https://github.com/sipeed/picoclaw/pull/3066>

4. **低到中严重度：数据库关闭错误未显式处理**  
   - PR：#3065  
   - 问题：`db.Close()` 在多条错误路径上被忽略，触发 lint 警告。  
   - 影响：更多是工程质量与维护一致性问题。  
   - 状态：**已有 fix PR，当前为 Open**。  
   - 链接：<https://github.com/sipeed/picoclaw/pull/3065>

**结论**：今日没有新增“外部报告的故障”，但项目内部已经识别出几处值得尽快合并的可靠性问题；其中 #3064 的潜在崩溃风险最值得优先关注。

---

## 6. 功能请求与路线图信号

今日**没有新的 Issues 型功能需求**进入视野，因此没有来自用户评论的明确路线图诉求。  
不过，从 PR 动向可以提炼出几个比较清晰的路线图信号：

- **配置持久化与会话隔离体验**是当前重要方向之一  
  - 代表 PR：#3067  
  - 含义：用户侧配置项需要更可靠地进入后端模型与存储层，避免“UI 能改但实际不生效”。  
  - 链接：<https://github.com/sipeed/picoclaw/pull/3067>

- **系统稳定性/容错性治理**正在持续推进  
  - 代表 PR：#3064、#3065、#3066  
  - 含义：项目可能会在下一阶段继续吸收一批“修复型、清理型”变更，优先提升健壮性而非扩展新功能。  
  - 链接：  
    - <https://github.com/sipeed/picoclaw/pull/3064>  
    - <https://github.com/sipeed/picoclaw/pull/3065>  
    - <https://github.com/sipeed/picoclaw/pull/3066>

**判断**：如果这些 PR 在下一轮被合并，它们更像是为下一版本做“基础设施铺垫”，而不是直接发布新特性。

---

## 7. 用户反馈摘要

由于今日 **Issues 为空且无评论数据**，当前无法从用户评论中提炼出真实的口碑分化、使用场景差异或明确不满意点。  
不过，从 PR #3067 所反映的问题可以推断出一个非常典型的用户痛点：  
- 用户在配置页修改了会话范围（`dm_scope`），但保存后无法保留设置，导致他们对“保存成功”的信任下降。  
- 这类问题通常发生在“前端展示与后端持久化模型不一致”的场景，属于典型的可用性 bug。  

相关链接：  
- PR #3067：<https://github.com/sipeed/picoclaw/pull/3067>  
- Issues 页：<https://github.com/sipeed/picoclaw/issues>

---

## 8. 待处理积压

基于今天提供的数据，**没有观察到长期未响应的重要 Issue**；Issues 列表为 0，说明当前并不存在明显的社区积压。  
但从维护工作量看，今日新增的 4 个 Open PR 已经形成了一个**等待审查的短期 backlog**，建议维护者优先关注：

1. #3064 — 高优先级，避免配置异常导致 panic  
   <https://github.com/sipeed/picoclaw/pull/3064>

2. #3067 — 直接影响用户配置保存体验  
   <https://github.com/sipeed/picoclaw/pull/3067>

3. #3065 — 数据库关闭错误一致性处理  
   <https://github.com/sipeed/picoclaw/pull/3065>

4. #3066 — 临时文件关闭错误处理统一化  
   <https://github.com/sipeed/picoclaw/pull/3066>

**维护建议**：如果后续两三天内这些 PR 仍未进入合并流程，建议安排集中 Review，以免修复型变更继续堆积，拖慢下一个版本节奏。  
PR 总览：<https://github.com/sipeed/picoclaw/pulls>

---

如果你愿意，我也可以把这份日报进一步整理成**更适合发送到群里/邮件里的简版**，或者输出成**表格版周报模板**。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-06-09）

> 项目仓库： [NanoClaw / qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw)

## 1. 今日速览
今天 NanoClaw 的整体活跃度偏低，过去 24 小时 **没有 Issues 变动**，仅有 **1 条 PR 更新** 且已关闭，说明社区主要活动集中在一次性修正或流程性提交上。  
当前没有新版本发布，也没有公开的用户问题积压，项目表面上保持稳定。  
从数据看，今日更像是“维护性收尾日”，而不是功能推进日。  
整体健康度判断：**低波动、低风险、低外显需求**。  
相关仓库： [https://github.com/qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw)

## 2. 版本发布
今日 **无新版本发布**。  
版本页： [Releases](https://github.com/qwibitai/nanoclaw/releases)

## 3. 项目进展
今日唯一的重要变动是 PR **#2716** 已关闭：

- **#2716 [CLOSED] [follows-guidelines] resolve check test 0609 once**  
  作者：zybChaitin  
  时间：2026-06-09  
  链接： [PR #2716](https://github.com/qwibitai/nanoclaw/pull/2716)

从标题和内容摘要来看，这更像是一次 **检查/测试修复或提交流程对齐**，而不是面向用户的新功能。  
因此，今天项目“向前迈进”的幅度主要体现在：

- 增强了 CI / 检查流程的稳定性预期
- 降低了后续合并中出现格式或规范性失败的概率
- 对主干代码健康度有轻微正向作用，但 **不构成产品能力扩展**

总体评价：**有维护价值，但对产品功能推进有限**。

## 4. 社区热点
今日 **没有 Issues 活跃**，且唯一 PR **无评论、无点赞数据**，因此没有形成可识别的社区讨论热点。

- Issues 列表： [Issues](https://github.com/qwibitai/nanoclaw/issues)
- PR #2716： [https://github.com/qwibitai/nanoclaw/pull/2716](https://github.com/qwibitai/nanoclaw/pull/2716)

背后的含义是：  
当前社区关注点并未集中在功能诉求、Bug 争议或产品路线讨论上，而是偏向低噪声运行状态。  
这通常意味着：

- 近期没有集中爆发的使用障碍
- 用户反馈流量较小
- 维护者可能暂时没有被高频需求打断

## 5. Bug 与稳定性
今日 **没有新增 Bug、崩溃或回归问题记录**。  
按严重程度看，当前为：

1. **严重问题：无**
2. **一般缺陷：无**
3. **回归问题：无**

因此暂无可关联的 fix PR。  
稳定性相关页面： [Issues](https://github.com/qwibitai/nanoclaw/issues)

结论：从公开数据看，NanoClaw 今日没有暴露新的稳定性风险，项目运行状态相对平稳。

## 6. 功能请求与路线图信号
今日 **没有新增功能请求 Issues**，因此没有直接的用户路线图信号。  
不过，从 PR #2716 的性质看，项目当前仍在处理 **规范遵循、检查流程、基础工程质量** 相关事项，而非扩展新能力。

可观察到的路线图倾向：

- 短期：继续清理 CI / 校验 / 规范类问题
- 中期：若后续出现新的 Issues，才可能形成明确的功能优先级
- 目前：**看不出下一版本的新增功能方向**

相关链接：  
- 功能/问题入口： [Issues](https://github.com/qwibitai/nanoclaw/issues)  
- 当前 PR： [PR #2716](https://github.com/qwibitai/nanoclaw/pull/2716)

## 7. 用户反馈摘要
今日 **没有 Issues 评论**，因此无法从用户反馈中提炼真实痛点、使用场景或满意/不满意点。  

这意味着：

- 暂无公开用户反馈样本
- 暂无法判断用户最关心的功能或使用摩擦
- 也没有可验证的满意度信号

反馈入口： [Issues](https://github.com/qwibitai/nanoclaw/issues)

## 8. 待处理积压
基于当前数据，**没有可识别的长期未响应重要 Issue 或 PR 积压**。  
理由是：

- 今日 Issues 变动为 0
- 当前最新已知 PR 数量极少，且唯一 PR 已关闭
- 没有公开显示的老问题或悬而未决的讨论

建议维护者持续关注：

- 后续是否出现集中报错
- 是否有新的功能需求开始累积
- CI / 检查类 PR 是否反复出现，提示工程质量或流程成本偏高

仓库与待办入口：  
- [项目主页](https://github.com/qwibitai/nanoclaw)  
- [Issues](https://github.com/qwibitai/nanoclaw/issues)  
- [Pull Requests](https://github.com/qwibitai/nanoclaw/pulls)

---

## 总体结论
NanoClaw 在 2026-06-09 呈现出 **低活跃、低风险、偏维护型** 的项目状态。  
今天没有用户问题、没有版本发布，唯一的 PR 更偏向检查/规范修复，说明项目当前处于稳定整理阶段，而不是快速迭代阶段。  
如果这种趋势持续，接下来最值得关注的将不是“新功能爆发”，而是 **是否开始出现首批真实用户反馈与路线图需求**。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

以下为 **IronClaw（nearai/ironclaw）** 截至 **2026-06-09** 的项目动态日报。整体上看，项目今天保持了**中等偏高的活跃度**：出现了 3 条新/活跃 Issue、2 个 PR 更新，但**没有新版本发布**。讨论重心主要集中在 **LLM provider 配置、Reborn 鉴权/租户语义、以及运行轨迹可观测性** 等基础能力上，说明项目仍在持续打磨核心底座。

---

## 1) 今日速览

今天 IronClaw 的动态呈现出“**问题驱动 + 架构补强**”的特征：一方面，社区提交了若干与 **Minimax provider 配置失败**、**Reborn auth evidence 需要携带 tenant identity**、**OpenAI-compatible 超时 turn 的 admission 边界**相关的问题；另一方面，PR 也在推进 **出站目标权限状态规范化** 和 **RebornRuntimeInput 轨迹观察 hook** 这类基础能力。  
从数据上看，今天的活跃度不算爆发式，但讨论都集中在产品底层路径上，说明项目仍处于**持续完善核心机制**的阶段。  
没有新版本发布，意味着今天更多是**问题暴露与功能打底**，而非正式交付窗口。  
综合判断：**项目健康度稳定，技术深度活跃，当前更像是“打地基”的一天”。**

---

## 2) 版本发布

**今日无新版本发布。**

- Releases：无  
- 链接：  
  - [GitHub Releases - nearai/ironclaw](https://github.com/nearai/ironclaw/releases)

---

## 3) 项目进展

今天最重要的项目推进来自 1 个已关闭 PR 和 1 个仍在进行中的 WIP PR。

### 已合并/关闭的重要 PR
#### PR #4589 - [CLOSED] Add channel-neutral outbound target authority status
- 链接：<https://github.com/nearai/ironclaw/pull/4589>
- 价值判断：这是一个**低风险、文档/产品安全导向**的变更，核心在于：
  - 增加了更安全的 `final_reply_target_status`；
  - 规范了 outbound 默认偏好状态（如 `none_configured` / `available` / `unavailable`）；
  - 引入了**channel-neutral** 的 direct target authority resolution；
  - 在展示汇总前重新校验 saved targets，降低权限/目标失效带来的误导。

**推进意义：**
- 这类改动虽然不直接“面向炫技功能”，但能显著减少用户在**目标投递、回复绑定、权限判断**上的歧义。
- 对项目整体来说，属于把“**错误可解释性**”和“**状态可信度**”往前推进了一步。
- 可视为 IronClaw 在多通道/多目标交付逻辑上的一次**稳定性补强**。

### 进行中的 PR
#### PR #4588 - [OPEN] feat(reborn): trajectory observer hook on RebornRuntimeInput (WIP)
- 链接：<https://github.com/nearai/ironclaw/pull/4588>
- 当前状态：Draft / WIP
- 价值判断：该 PR 目标是让下游调用方能实时观察 Reborn agent run 的 **trajectory**（每步 tool/capability 调用与结果）。

**推进意义：**
- 这是一个偏“平台能力”的增强，若落地，将显著提升：
  - 调试能力
  - 运行时可观测性
  - 复杂 agent 流程的审计与回放能力
- 对于一个围绕 AI agent / personal AI assistant 的项目来说，这类 hook 很可能成为后续生态扩展的重要基础。

**总体进展评估：**
- 今天的 PR 进展并不多，但方向明确：  
  **一个在收敛交付状态与权限语义，一个在增强运行轨迹可观测性。**  
- 这说明项目并非单纯增加功能，而是在逐步补齐**核心运行框架**。

---

## 4) 社区热点

今日最活跃、最值得关注的讨论集中在以下 Issues/PR 上（按讨论热度/问题重要性综合判断）：

### Issue #4587 - Bug: Cannot configure Minimax provider
- 链接：<https://github.com/nearai/ironclaw/issues/4587>
- 评论数：1
- 反应：0
- 热点原因：这是一个**直接影响可用性**的 bug，用户在配置 Minimax provider 后尝试 chat 即报错。  
- 背后诉求：
  - 希望 provider 配置流程能正确读取并识别密钥元数据；
  - 希望错误信息能更清晰，减少“配置成功但实际不可用”的落差；
  - 对多 provider 支持的稳定性有较高期待。

### Issue #4585 - Reborn auth evidence should carry tenant identity
- 链接：<https://github.com/nearai/ironclaw/issues/4585>
- 评论数：1
- 反应：0
- 热点原因：这是一个**架构/安全边界**问题，涉及 auth evidence 里缺少 tenant identity，导致 tenant-aware validation 难以实现。  
- 背后诉求：
  - 希望鉴权模型能够支持多租户语义；
  - 希望认证信息传递链路具备更完整的上下文；
  - 这类需求通常来自生产落地后的隔离/合规要求。

### Issue #4586 - Verify OpenAI-compatible timed-out turns are bounded by turn admission
- 链接：<https://github.com/nearai/ironclaw/issues/4586>
- 评论数：0
- 反应：0
- 热点原因：虽未产生评论，但它触及的是 **turn admission 与超时运行的边界**，属于 correctness 话题。  
- 背后诉求：
  - 用户希望超时 turn 不会突破系统已建立的 admission/reservation 约束；
  - 反映出对 turn 持久化契约、资源边界和一致性的关注。

### PR #4588 - RebornRuntimeInput trajectory observer hook（WIP）
- 链接：<https://github.com/nearai/ironclaw/pull/4588>
- 热点原因：WIP 但方向明确，属于**可观测性增强**，容易引发下游开发者关注。  
- 背后诉求：
  - 更好的运行时 trace；
  - 更容易进行 agent 行为分析、调试和审计；
  - 对复杂工作流尤其重要。

**总结：**
- 今天的“热点”不是表层功能，而是**平台底层可用性、鉴权模型、可观测性**。
- 这通常意味着项目正从“能跑”迈向“可控、可审计、可规模化”。

---

## 5) Bug 与稳定性

按严重程度综合排序，今日主要问题如下：

### 1. Issue #4587 - Minimax provider 无法配置后正常使用
- 链接：<https://github.com/nearai/ironclaw/issues/4587>
- 严重程度：**高**
- 原因：
  - 这是直接阻断用户使用的功能性故障；
  - 配置后 chat 报错，说明 provider 集成链路存在断点；
  - 报错内容提示 key metadata 读取失败，可能涉及 secret 管理或 provider snapshot 的一致性问题。
- 是否已有 fix PR：**未见明确对应 fix PR**

### 2. Issue #4586 - timed-out turns 与 admission 边界验证
- 链接：<https://github.com/nearai/ironclaw/issues/4586>
- 严重程度：**中高**
- 原因：
  - 虽然不是直接 crash，但涉及 turn admission 的契约正确性；
  - 若处理不严谨，可能导致超时 turn 的资源边界失控、状态污染或一致性问题。
- 是否已有 fix PR：**未见明确对应 fix PR**

### 3. Issue #4585 - auth evidence 缺 tenant identity
- 链接：<https://github.com/nearai/ironclaw/issues/4585>
- 严重程度：**中**
- 原因：
  - 这是基础架构缺口；
  - 短期不一定导致崩溃，但会限制 tenant-aware validation 与多租户安全能力。
- 是否已有 fix PR：**未见明确对应 fix PR**

### 稳定性观察
- 今天没有大面积崩溃或批量关闭问题的迹象；
- 问题类型更偏向**集成、契约、上下文缺失**，说明系统整体运行不至于失稳，但在复杂场景下仍有明显补强空间。

---

## 6) 功能请求与路线图信号

今天出现的需求，能较清晰地映射出未来路线图的几个方向：

### 方向 A：多 provider 接入稳定性
- 相关 Issue：[#4587](https://github.com/nearai/ironclaw/issues/4587)
- 信号判断：**高概率进入后续修复优先级**
- 原因：
  - provider 配置失败属于直接影响用户接入的阻断问题；
  - 如果 IronClaw 正在强化多模型/多供应商支持，这类 bug 会优先修。

### 方向 B：Reborn 鉴权与多租户语义完善
- 相关 Issue：[#4585](https://github.com/nearai/ironclaw/issues/4585)
- 信号判断：**很可能纳入中短期架构演进**
- 原因：
  - tenant identity 是多租户系统的基础；
  - 该需求明显是为了支持更严格的验证和隔离；
  - 与 production 化、企业场景落地高度相关。

### 方向 C：运行时轨迹可观测性
- 相关 PR：[#4588](https://github.com/nearai/ironclaw/pull/4588)
- 信号判断：**很可能成为下一批能力增强中的重点**
- 原因：
  - agent trajectory 观察能力是调试、评估和审计的基础设施；
  - 对复杂 Reborn runtime 来说，这属于强需求，不像“锦上添花”。

### 方向 D：状态/权限可解释性
- 相关 PR：[#4589](https://github.com/nearai/ironclaw/pull/4589)
- 信号判断：**已在路线图上开始落地**
- 原因：
  - outbound target authority status 的规范化说明团队已在重构“状态可见性”和“权限判断”的用户体验；
  - 后续可能继续扩展到更多 channel / target 场景。

---

## 7) 用户反馈摘要

从今天的 Issues 文本中，可以提炼出几类非常真实的用户痛点与使用场景：

### 痛点 1：配置看似成功，实际使用失败
- 来源：[#4587](https://github.com/nearai/ironclaw/issues/4587)
- 用户场景：
  - 用户已经配置了 Minimax provider；
  - 进入 chat 后却立刻报错；
  - 日志显示 key metadata 无法读取。
- 反馈含义：
  - 用户对“**配置即生效**”的预期很强；
  - 目前系统在 secret/provider snapshot 之间的状态同步不够稳。

### 痛点 2：多租户身份在链路中不完整
- 来源：[#4585](https://github.com/nearai/ironclaw/issues/4585)
- 用户场景：
  - 在验证 OpenAI-compatible / Reborn 的鉴权主体时，希望能和 caller user、tenant 一起判断；
  - 但 contract 中缺少 tenant identity。
- 反馈含义：
  - 这类反馈通常来自真实部署环境；
  - 用户已经开始关心**组织级隔离、权限边界和审计**，而不仅仅是个人开发体验。

### 痛点 3：运行态边界与持久化契约需要更严谨
- 来源：[#4586](https://github.com/nearai/ironclaw/issues/4586)
- 用户场景：
  - 关注超时 turns 是否会突破已建立的 admission/reservation 边界；
  - 关注 turn persistence contract 的一致性。
- 反馈含义：
  - 用户对系统“正确性”要求很高；
  - 他们希望行为边界能被明确证明，而不是依赖经验假设。

### 满意点
- 从 PR #4588 的方向可看出，社区对更强的 runtime 可观测性有积极期待；
- PR #4589 也显示项目在改善“状态与权限的可解释性”，这通常会提升用户体验。

---

## 8) 待处理积压

基于当前数据，**没有发现明显“长期未响应”的陈年积压项**；今天新增的 Issue 和 PR 都是当日创建/更新，属于活跃响应期。

但仍有几个需要维护者持续关注的待处理项：

### 重点待跟进 PR
#### PR #4588 - trajectory observer hook（WIP）
- 链接：<https://github.com/nearai/ironclaw/pull/4588>
- 原因：
  - 属于基础设施型增强，若长时间停留在 WIP，会影响下游调试/审计需求；
  - 值得尽快明确设计边界与落地节奏。

### 重点待跟进 Issue
#### Issue #4587 - Minimax provider 配置失败
- 链接：<https://github.com/nearai/ironclaw/issues/4587>
- 原因：
  - 这是直接影响用户使用的阻断问题；
  - 建议尽快确认是否与 secret metadata、provider snapshot 读取流程有关。

#### Issue #4585 - tenant identity 缺失
- 链接：<https://github.com/nearai/ironclaw/issues/4585>
- 原因：
  - 这是多租户能力演进的关键前置问题；
  - 若项目面向企业/组织场景，应优先明确协议层修改方案。

---

## 总体结论

今天的 IronClaw 显示出一个比较健康的开源项目状态：  
- **问题暴露明确**，且集中在核心链路；
- **PR 方向务实**，围绕权限、状态、可观测性做补强；
- **没有发布版本**，但项目并未停滞，反而在为后续稳定交付继续加固底座。

如果把今天概括成一句话：  
> **IronClaw 正在从“功能推进”转向“平台化与可控性建设”，这对项目长期稳定演进是正向信号。**

如需，我也可以把这份日报进一步整理成 **适合内部晨会的精简版** 或 **适合公众号/周报的分析版**。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-06-09）

## 1. 今日速览
今天 LobsterAI 的整体活跃度处于**低到中等**水平：过去 24 小时内仅有 **1 条 Issue** 和 **1 条 PR** 发生更新，且没有新版本发布。项目讨论主要集中在**能力边界与兼容性诉求**上，说明用户开始主动探索 Agent 集成方向。与此同时，PR 侧完成了一项偏产品体验增强的功能，表明项目仍在持续推进可用性与协作体验优化。整体来看，项目健康度稳定，社区关注点较明确，但今天并未出现大规模功能迭代或紧急修复信号。

---

## 2. 版本发布
**今日无新版本发布。**

- Releases：暂无  
- 影响：本日新增内容主要体现在 PR 合并带来的代码层变化，尚未形成对外可发布的版本节点。  
- 链接：  
  - [LobsterAI Releases](https://github.com/netease-youdao/LobsterAI/releases)

---

## 3. 项目进展
今天最重要的推进来自一个已关闭 PR：

### [#2130] feat(cowork): add task completion notifications
- 链接：<https://github.com/netease-youdao/LobsterAI/pull/2130>
- 状态：**CLOSED / 已合并或关闭**
- 涉及范围：`renderer`、`build`、`docs`、`main`
- 功能摘要：
  - 为 Cowork 场景增加**任务完成通知**
  - 提供 **General settings** 中的开关控制
  - 通知内容强调**隐私安全**，不暴露任务标题或用户提示词
  - 增加 **macOS Dock badge** 与 **Windows taskbar** 计数提示

### 推进意义
这次变更属于明显的**用户体验增强**与**协作流程补齐**，对 LobsterAI 的“任务流完成闭环”有直接帮助。虽然不是大规模架构升级，但它补上了一个非常实际的交互缺口，有助于提升用户在后台协作时的可感知性。  
从项目整体节奏看，今天的进展属于**小步快跑式优化**：功能点不大，但对可用性与跨平台体验有正向增益。

---

## 4. 社区热点
今天最活跃的讨论集中在以下 Issue：

### [#2131] LobsterAI 支持 hermes agent有计划吗？
- 链接：<https://github.com/netease-youdao/LobsterAI/issues/2131>
- 状态：**OPEN**
- 互动：**1 条评论**
- 👍：0
- 主题：用户询问是否计划支持 **hermes agent**

### 背后诉求分析
这条 Issue 反映出社区用户已经开始将 LobsterAI 视为一个可扩展的 Agent 平台/框架来评估，而不只是单一功能产品。提问本质上是在确认：
1. **模型/Agent 协议兼容性**是否会成为官方方向；
2. **生态接入能力**是否足够开放；
3. 是否会跟随更广泛的 Agent 标准或第三方 agent 方案演进。

这类问题通常意味着用户对产品的期待已从“能用”转向“能接入、能扩展、能协同”。如果官方后续给出路线图回应，将有助于稳定开发者预期。

---

## 5. Bug 与稳定性
**今日未见明确的 Bug、崩溃或回归类报告。**

### 观察结论
- 当前开放 Issue #2131 属于**功能/路线图询问**，并非缺陷报告
- 本日 PR #2130 聚焦于通知与 UI 提示增强，未显示出明显稳定性风险信号
- 未发现与崩溃、数据丢失、构建失败相关的公开问题

### 严重程度排序
1. **无明确 Bug 报告**
   - 相关链接：  
     - [#2131 Hermes agent 支持计划](https://github.com/netease-youdao/LobsterAI/issues/2131)

### 是否已有 fix PR
- **无对应 bug fix PR**
- 今日 PR #2130 不是修复问题，而是功能增强

---

## 6. 功能请求与路线图信号
今日最明确的功能请求来自：

### [#2131] LobsterAI 支持 hermes agent有计划吗？
- 链接：<https://github.com/netease-youdao/LobsterAI/issues/2131>

### 路线图信号解读
这条需求说明社区正在关注 LobsterAI 是否会支持更多 Agent 形态或协议适配。如果结合今天已合并的 [#2130](https://github.com/netease-youdao/LobsterAI/pull/2130) 来看，项目当前仍在优先完善**使用体验、协作可见性、跨平台通知**等基础能力，而不是立即扩展到更复杂的 Agent 生态兼容。

### 可能纳入下一版本的方向
- **高概率**：体验增强类功能继续推进，例如通知、状态提示、后台协作可见性
- **中概率**：对外部 agent 的兼容讨论进入评估阶段，但是否落地仍需官方确认
- **不确定**：hermes agent 支持是否会进入近期版本，当前仅见用户询问，尚无官方承诺或对应实现 PR

---

## 7. 用户反馈摘要
从今天的 Issue 评论和 PR 主题中，可以提炼出以下真实用户反馈与场景：

### 主要痛点
- 用户希望 LobsterAI 能支持更多 **Agent 接入方式**，说明在实际使用中，兼容性和生态扩展是关键诉求
- 对后台任务而言，用户希望有更明确的**完成反馈**，避免“任务做完但不知道结果”的不确定感

### 使用场景
- **协作场景（Cowork）**：用户在非前台场景下运行任务，希望通过通知、角标等方式掌握进度
- **开发者/集成者场景**：用户开始关心不同 agent 的支持计划，说明其用途可能已从单纯使用转向二次集成或平台化接入

### 满意点 / 不满意点
- **满意点**：项目持续优化通知与协作体验，且注重隐私安全设计
- **待改进点**：社区仍在追问更广泛的 agent 兼容性，说明官方路线图在这一块可能还不够明确

相关链接：
- [#2130 任务完成通知](https://github.com/netease-youdao/LobsterAI/pull/2130)
- [#2131 hermes agent 支持计划](https://github.com/netease-youdao/LobsterAI/issues/2131)

---

## 8. 待处理积压
**本次数据中未发现明显的长期未响应重要 Issue 或 PR。**

### 需要关注的潜在待办
- [#2131](https://github.com/netease-youdao/LobsterAI/issues/2131) 虽然是新近开放且已有 1 条评论，但它代表了一个值得维护者尽快回应的**路线图信号**：  
  是否支持 hermes agent，最好给出“计划中 / 暂无计划 / 需社区 PR”的明确答复，以减少重复询问并提升社区预期管理质量。

### 当前积压判断
- 无证据表明今天存在高优先级、长期滞留的阻塞项
- 项目节奏正常，未见积压恶化迹象

---

## 总体结论
LobsterAI 今天的动态体现出一个**稳定推进、社区关注逐步向生态兼容延伸**的开源项目状态：一方面，项目持续优化协作通知这类实际体验；另一方面，用户开始主动询问更高层的 Agent 兼容路线。当前项目健康度良好，但若能对 hermes agent 这类问题给出明确方向，将更有助于增强社区信心与开发者参与度。

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

# CoPaw 项目动态日报（2026-06-09）

## 1) 今日速览
今天项目处于**“问题修复 + 功能推进并行”**的活跃状态：过去 24 小时内共有 **3 条 Issues 更新**、**2 条 PR 更新**，但**没有新版本发布**，也**没有 PR 合并**。从反馈内容看，社区关注点集中在 **MCP 工具兼容性、Console/Skill 交互体验、以及微信频道主动模式的重复回复问题**，都属于会直接影响使用体验的事项。  
整体判断：**活跃度中等偏高，项目仍在快速迭代，但交付侧今天偏静态**，更多体现为需求收敛和缺陷暴露，而非版本落地。  
相关链接：[#5034](https://github.com/agentscope-ai/QwenPaw/issues/5034)、[#5031](https://github.com/agentscope-ai/QwenPaw/issues/5031)、[#5030](https://github.com/agentscope-ai/QwenPaw/issues/5030)

---

## 2) 版本发布
**今日无新版本发布。**

---

## 3) 项目进展
今天**没有已合并或已关闭的 PR**，因此从“代码已落地”的角度看，项目在过去 24 小时内**没有可确认的正式交付增量**。不过，当前有 **2 个开放 PR** 持续推进，说明主线仍在扩展：

- **#5033**：`feat(plugin/cloudpaw): enhance A2A capabilities and add host slash command support`  
  重点在 **A2A 能力增强、路由重构、host 侧 slash command 框架**，如果合并，将明显增强插件/代理协作能力。  
  链接：[#5033](https://github.com/agentscope-ai/QwenPaw/pull/5033)

- **#5032**：`feat(tui): bundle the terminal chat UI into qwenpaw (Phase 1)`  
  重点是把独立终端聊天 UI 整合进主程序，意味着 **CLI/TUI 一体化** 迈出第一步，对本地交互体验提升较大。  
  链接：[#5032](https://github.com/agentscope-ai/QwenPaw/pull/5032)

**项目整体前进幅度判断：**  
- 从版本发布看：**0 进展**  
- 从功能演进看：**2 条主线功能正推进中**，覆盖“插件/A2A 能力”和“终端交互入口整合”  
- 从交付节奏看：**仍在审阅与收敛阶段，尚未进入新的对外发布窗口**  

---

## 4) 社区热点
今天讨论最活跃的条目主要集中在以下几个问题：

1. **#5034 [Bug] MCP 工具名称含非法字符导致 OpenAI API 400**
   - 评论数：2
   - 现象：工具名中包含点号 `.` 时，调用 OpenAI API 报 400，影响工具链正常工作。
   - 背后诉求：用户希望 **MCP 工具命名能够自动规整/兼容 OpenAI 命名规范**，避免服务端工具名直接透传引发失败。
   - 链接：[#5034](https://github.com/agentscope-ai/QwenPaw/issues/5034)

2. **#5031 [Bug] Skill slash invocation 在 Console 中被展开成 SKILL.md 内容**
   - 评论数：2
   - 现象：在 Console 里用 `/pdf 分析pdf` 这类 slash 命令时，界面显示逻辑异常，像是把技能文档内容直接展开出来。
   - 背后诉求：用户希望 **slash 命令保持简洁、可预测的交互语义**，而不是被 UI/插件层“二次展开”。
   - 链接：[#5031](https://github.com/agentscope-ai/QwenPaw/issues/5031)

3. **#5030 主动模式下微信频道问答出现“同一问题回复两次”**
   - 评论数：1
   - 现象：开启主动模式后，微信频道里同一个问题会得到两次相似回复。
   - 背后诉求：用户关心 **消息路由是否重复触发、主动模式是否稳定可控**。
   - 链接：[#5030](https://github.com/agentscope-ai/QwenPaw/issues/5030)

**热点总结：**  
社区当前的核心关切不是“新增功能炫不炫”，而是**基础交互是否可靠**：命名兼容、命令展示、消息去重，这些都是上线后最容易影响口碑的基础问题。  
链接汇总：[#5034](https://github.com/agentscope-ai/QwenPaw/issues/5034)、[#5031](https://github.com/agentscope-ai/QwenPaw/issues/5031)、[#5030](https://github.com/agentscope-ai/QwenPaw/issues/5030)

---

## 5) Bug 与稳定性
按影响面和严重程度排序：

### 1. #5034 - MCP 工具名称包含非法字符导致 OpenAI API 400
- 严重程度：**高**
- 影响范围：核心工具调用链
- 用户影响：一旦 MCP 工具名不符合规范，聊天/工具调用直接失败，属于**会中断功能可用性**的问题。
- 状态：**已关闭**
- 修复线索：摘要中注明“已在后续版本修复，见 `stateful_client.py`”，说明该问题**已有修复方向或已在后续版本中处理**。
- 链接：[#5034](https://github.com/agentscope-ai/QwenPaw/issues/5034)

### 2. #5030 - 主动模式下微信频道出现重复回复
- 严重程度：**中高**
- 影响范围：微信频道 + 主动模式
- 用户影响：同一问题两次回复，会显著破坏对话一致性，并让用户误判系统状态。
- 已知缓解：用户反馈中提到**关闭主动模式并重启容器后恢复正常**，说明问题可能与主动模式的消息触发链有关。
- 修复状态：**未见明确 fix PR**
- 链接：[#5030](https://github.com/agentscope-ai/QwenPaw/issues/5030)

### 3. #5031 - Console 中 skill slash invocation 展开异常
- 严重程度：**中**
- 影响范围：Console / Skill 交互
- 用户影响：不影响核心推理，但会造成**交互混乱和心智负担**，属于明显的 UX 缺陷。
- 修复状态：**未见明确 fix PR**
- 链接：[#5031](https://github.com/agentscope-ai/QwenPaw/issues/5031)

**稳定性判断：**  
今天暴露的问题主要集中在**工具命名规范、消息触发幂等性、前端展示语义一致性**三类，说明项目在向更复杂的插件与多渠道场景扩展时，稳定性治理仍是重点。  
链接汇总：[#5034](https://github.com/agentscope-ai/QwenPaw/issues/5034)、[#5030](https://github.com/agentscope-ai/QwenPaw/issues/5030)、[#5031](https://github.com/agentscope-ai/QwenPaw/issues/5031)

---

## 6) 功能请求与路线图信号
今天的 PR 与 Issue 共同传递出几个清晰的路线图信号：

### 1. 插件/A2A 能力继续增强
- 来源：[#5033](https://github.com/agentscope-ai/QwenPaw/pull/5033)
- 信号：`cloudpaw` 的 A2A 增强、路由重构、host slash command 支持，说明项目正往**更强的代理协作与插件生态**演进。
- 可能进入下一版本的原因：这类能力属于平台级增强，通常更容易被纳入主版本节奏。

### 2. 终端聊天 UI 一体化正在推进
- 来源：[#5032](https://github.com/agentscope-ai/QwenPaw/pull/5032)
- 信号：TUI 被整合到主程序，说明团队在推动 **“单入口体验”**，降低用户启动与使用门槛。
- 可能进入下一版本的原因：用户体验提升明确，且 Phase 1 已形成可审阅实现。

### 3. 基础兼容性与交互稳定性会成为优先修复项
- 来源：[#5034](https://github.com/agentscope-ai/QwenPaw/issues/5034)、[#5030](https://github.com/agentscope-ai/QwenPaw/issues/5030)、[#5031](https://github.com/agentscope-ai/QwenPaw/issues/5031)
- 信号：当前用户反馈集中在“能不能稳定用”“交互是不是符合预期”，这类问题通常会被优先纳入近期修复计划。
- 可能进入下一版本的原因：其中 #5034 已经有修复线索，#5030/#5031 也都属于高频体验问题。

**路线图判断：**  
若下一版本继续推进，最有可能同时覆盖 **插件生态增强、TUI 集成、以及基础交互修复** 三条线。  
链接：[#5033](https://github.com/agentscope-ai/QwenPaw/pull/5033)、[#5032](https://github.com/agentscope-ai/QwenPaw/pull/5032)、[#5034](https://github.com/agentscope-ai/QwenPaw/issues/5034)、[#5030](https://github.com/agentscope-ai/QwenPaw/issues/5030)、[#5031](https://github.com/agentscope-ai/QwenPaw/issues/5031)

---

## 7) 用户反馈摘要
从今天的 Issues 评论和描述中，可以提炼出几类真实用户痛点：

### 1. “兼容性必须默认做好”
- 代表问题：[#5034](https://github.com/agentscope-ai/QwenPaw/issues/5034)
- 场景：MCP 工具名含点号等非规范字符
- 用户感受：用户不希望自己理解底层 API 命名约束，系统应自动处理。
- 说明：这类反馈体现出用户对“**开箱即用**”的期待很高。

### 2. “Console 里的命令应该保持清晰、不要被展开得过于复杂”
- 代表问题：[#5031](https://github.com/agentscope-ai/QwenPaw/issues/5031)
- 场景：slash command 触发技能后，界面把内容展开成 SKILL.md
- 用户感受：可预测性差，容易让用户误解系统实际执行了什么。

### 3. “主动模式要稳定，不能重复发言”
- 代表问题：[#5030](https://github.com/agentscope-ai/QwenPaw/issues/5030)
- 场景：微信频道接入，开启主动模式后同一问题被答两次
- 用户感受：这是典型的“**看起来像系统失控**”的问题，即使有临时 workaround，也会降低信任。

**总体反馈画像：**  
用户既在使用更复杂的多渠道部署，也在使用技能、MCP、主动模式等进阶能力，说明项目的真实使用场景已经进入“**生产化/半生产化**”阶段，因而对稳定性、幂等性、交互一致性的要求明显提高。  
链接汇总：[#5034](https://github.com/agentscope-ai/QwenPaw/issues/5034)、[#5031](https://github.com/agentscope-ai/QwenPaw/issues/5031)、[#5030](https://github.com/agentscope-ai/QwenPaw/issues/5030)

---

## 8) 待处理积压
从当前快照看，**没有明显“长期未响应”的老旧高优先级条目**；今天展示的 Issues 和 PR 大多都是 **2026-06-09 当日新建或更新**，因此更像是一个**新的待办队列**，而不是历史积压。

但维护者仍需尽快关注以下开放项，避免热度继续累积：

- **#5033**：A2A / 插件 / host slash command 的增强 PR，属于平台能力扩展，建议尽快完成评审。  
  链接：[#5033](https://github.com/agentscope-ai/QwenPaw/pull/5033)

- **#5032**：TUI 一体化 PR，涉及用户入口变化，建议重点看启动行为与兼容性。  
  链接：[#5032](https://github.com/agentscope-ai/QwenPaw/pull/5032)

- **#5030**：主动模式重复回复问题，若持续存在，容易影响频道侧用户信任，建议优先排查。  
  链接：[#5030](https://github.com/agentscope-ai/QwenPaw/issues/5030)

- **#5031**：Console 技能展示异常，属于高可见度 UX 问题，适合尽快修复。  
  链接：[#5031](https://github.com/agentscope-ai/QwenPaw/issues/5031)

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合发群里的精简版**，或  
2. **适合管理层阅读的表格版**。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报（2026-06-09）

## 1. 今日速览
ZeroClaw 今天整体呈现出**“低发布、高讨论、偏架构/质量修正”**的活跃状态：过去 24 小时内新增/活跃 Issues 2 条、PR 1 条，但**没有新版本发布、也没有 PR 合并/关闭**，说明项目当前更多处于需求澄清、缺陷暴露与代码重构评审阶段。  
从问题类型看，今天的新增内容同时覆盖了**功能增强**（webhook secret 读取时机调整）和**稳定性/CI 缺陷**（Windows/macOS lint 覆盖缺失），体现出社区对“配置一致性”和“跨平台质量门禁”的关注正在增强。  
PR 方面出现了一个**runtime → api 的公共类型抽离**，这类改动通常意味着项目正在推进接口层稳定化与模块边界清晰化。  
综合判断，ZeroClaw 今日活跃度为**中等偏低的开发型活跃**：没有交付物落地，但问题输入和架构演进信号都较明确。  

---

## 2. 版本发布
今日**无新版本发布**。

---

## 3. 项目进展
今日**没有 PR 合并或关闭**，因此没有直接进入主线的代码交付。  
不过，当前唯一开放 PR 指向了一个明显的架构整理方向：将 `HookHandler` 与 `HookResult` 从 runtime 下移到 `zeroclaw-api`，这通常意味着项目在推动**公共 API 抽象前置**，减少 runtime 对上层的耦合，利于后续扩展和插件化生态。

- [#7411 [runtime] refactor(api): move HookHandler trait and HookResult to zeroclaw-api](https://github.com/zeroclaw-labs/zeroclaw/pull/7411)

**整体推进判断：**  
今天项目在“产品功能落地”上没有直接前进，但在“架构边界清晰化”上已经出现了可见推进信号；如果该 PR 合并，后续开发者在 hook 相关扩展、复用和跨 crate 调用上会更顺畅。

---

## 4. 社区热点
今天的社区热点主要集中在两类诉求：**运行时配置行为**与**跨平台质量保障**。  
虽然两条 Issue 和一条 PR 都没有评论，但它们本身都指向了较明确的开发痛点，因此可视为今日讨论焦点的核心。

### 热点 1：Webhook signing secret 读取时机
- [#7410 [OPEN] [Feature]: Read gateway webhook signing secrets from AppState.config at handler time instead of caching at startup](https://github.com/zeroclaw-labs/zeroclaw/issues/7410)

**背后诉求：**  
用户希望 webhook 签名密钥不在启动时快照缓存，而是在 handler 执行时从 `AppState.config` 动态读取。这个需求通常意味着：
1. 运行时配置可能会变化；
2. 用户希望配置修改能尽快生效；
3. 当前缓存策略在“多 alias webhook routing”或配置热更新场景下可能存在一致性问题。  

这类诉求一般来自更成熟的部署方式：希望服务不必重启即可更新密钥或路由策略。

### 热点 2：CI lint gate 跨平台缺失
- [#7409 [OPEN] [Bug]: clippy lint gate is Linux-only — Windows/macOS-gated code is never linted (broken Windows tests on tree)](https://github.com/zeroclaw-labs/zeroclaw/issues/7409)

**背后诉求：**  
社区关注的是“代码质量门禁是否真的覆盖了所有平台分支”。当前 lint 仅在 Linux 上运行，意味着 Windows/macOS 条件编译代码可能长期未被 clippy 检查，最终把问题留到平台测试阶段才暴露。  
这类问题反映出用户/维护者对 ZeroClaw 的期待已经不止于“Linux 可用”，而是希望它具备**跨平台可维护性**。

### 热点 3：API 边界重构
- [#7411 [runtime] refactor(api): move HookHandler trait and HookResult to zeroclaw-api](https://github.com/zeroclaw-labs/zeroclaw/pull/7411)

**背后诉求：**  
这是一个偏基础设施的热点，虽然没有评论，但其本质是推动公共接口标准化。对扩展型框架/智能体系统来说，这类抽象迁移通常是后续功能扩展的前置条件。

---

## 5. Bug 与稳定性
今日报告的稳定性问题主要有 1 条，严重程度较明确：

### P2 / S2：跨平台 lint 门禁不完整，可能掩盖 Windows/macOS 问题
- [#7409 [OPEN] [Bug]: clippy lint gate is Linux-only — Windows/macOS-gated code is never linted (broken Windows tests on tree)](https://github.com/zeroclaw-labs/zeroclaw/issues/7409)

**问题概述：**  
CI 中的 `lint` 任务只在 `ubuntu-latest` 上跑 `cargo clippy --workspace --all-targets -- -D warnings`，而 Windows/macOS 条件分支代码没有被同等 lint 覆盖。  
**影响：**
- 平台相关代码质量无法提前暴露；
- Windows/macOS 测试失败可能会在更晚阶段出现；
- 容易形成“Linux 绿、其他平台红”的不一致状态。  

**是否已有 fix PR：**  
- **当前数据中未看到对应 fix PR。**

**补充：**  
这类问题属于典型的 CI 质量门禁缺口，不一定会直接造成线上崩溃，但会显著增加跨平台回归风险。

---

## 6. 功能请求与路线图信号
今日最明确的功能信号来自 webhook 配置读取时机的调整需求：

### 可能进入路线图的增强项
- [#7410 [OPEN] [Feature]: Read gateway webhook signing secrets from AppState.config at handler time instead of caching at startup](https://github.com/zeroclaw-labs/zeroclaw/issues/7410)

**路线图解读：**
- 如果项目正在支持 webhook 多路由、别名路由或配置动态更新，这个需求很可能会被纳入近期迭代；
- 它与 #7367 的 review follow-up 关联，说明这不是孤立需求，而是已有设计演进中的一环；
- 如果维护者强调运行时安全和可预测性，可能会评估是否需要更细粒度的配置刷新策略，而不仅仅是“每次 handler 读取”。

### 与现有 PR 的关联判断
- [#7411](https://github.com/zeroclaw-labs/zeroclaw/pull/7411) 显示项目正在整理 hook 相关公共接口；
- 如果 hook/handler 体系将继续扩展，那么 #7410 的“handler time 读取配置”逻辑很可能会与新的 API 边界设计一起被考虑。  

**结论：**  
今日的功能路线图信号偏向于**运行时配置灵活性**与**hook 体系抽象化**两条线。

---

## 7. 用户反馈摘要
从今日 Issues 的描述可以提炼出两类真实用户痛点：

### 1) 对动态配置生效的需求很强
- [#7410](https://github.com/zeroclaw-labs/zeroclaw/issues/7410)

**用户痛点：**  
启动时缓存 webhook secret 的做法在配置变化、别名路由、复审后的设计调整中可能不够灵活。  
**隐含场景：**
- 需要频繁轮换签名密钥；
- 希望配置变更无需重启；
- 希望不同 webhook 路由能在同一时刻读取最新状态。  
**满意/不满意点：**
- 满意：系统已有明确的 `AppState.config` 结构；
- 不满意：缓存时机过早，降低了可维护性和配置一致性。

### 2) 对跨平台工程质量有更高预期
- [#7409](https://github.com/zeroclaw-labs/zeroclaw/issues/7409)

**用户痛点：**  
CI lint 只覆盖 Linux，让非 Linux 平台代码缺乏同等质量检查。  
**隐含场景：**
- 有 Windows/macOS 用户或贡献者；
- 项目存在条件编译代码；
- 期望“测试/静态检查”在所有平台分支上都更可靠。  
**满意/不满意点：**
- 满意：项目已经具备 CI 体系；
- 不满意：CI 覆盖范围不足，导致质量保障不完整。

---

## 8. 待处理积压
从今天提供的数据看，**没有明显的长期未响应、长期积压的旧 Issue/PR 被单独列出**。  
但有两个值得维护者尽快关注的开放项：

- [#7410 Feature: handler time 读取 webhook signing secrets](https://github.com/zeroclaw-labs/zeroclaw/issues/7410)  
  这是带有设计调整意味的功能需求，且与既有 review 相关，建议尽快确认是否采纳。

- [#7409 Bug: clippy lint gate 仅 Linux 生效](https://github.com/zeroclaw-labs/zeroclaw/issues/7409)  
  这是 CI 质量缺口问题，建议尽快评估是否补齐 Windows/macOS lint 任务。

- [#7411 runtime/api 重构 PR](https://github.com/zeroclaw-labs/zeroclaw/pull/7411)  
  属于基础 API 边界调整，建议维护者尽快完成架构审查，避免公共接口长期悬而未决。

---

### 今日总体结论
ZeroClaw 今日没有版本发布、也没有交付型合并，但社区输入质量较高：一条指向**动态配置与 webhook 处理一致性**，一条指向**跨平台 CI 稳定性**，再加上一条**公共 API 抽象迁移 PR**，说明项目正处于“为下一阶段扩展做结构性整理”的阶段。  
从健康度看，项目当前的主要风险不在于功能停滞，而在于**质量门禁覆盖不足**与**运行时配置策略是否足够灵活**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*