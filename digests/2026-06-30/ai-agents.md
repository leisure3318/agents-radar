# OpenClaw 生态日报 2026-06-30

> Issues: 25 | PRs: 20 | 覆盖项目: 13 个 | 生成时间: 2026-06-30 01:34 UTC

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

# OpenClaw 项目动态日报（2026-06-30）

## 1. 今日速览
过去 24 小时，OpenClaw 的社区与维护活动都很活跃：**Issues 更新 25 条、PR 更新 20 条**，但**没有新版本发布**。  
整体信号显示，项目当前仍处在“**高频修复与边界加固**”阶段，讨论重心集中在会话状态、认证/权限、消息投递、插件能力和更新兼容性等高风险链路。  
从优先级看，今天新增或更新的条目里 **P0/P1 占比偏高**，说明维护压力主要来自稳定性与回归问题，而不是单纯功能扩展。  
好的一面是，修复管线已经明显启动：多条关键 PR 已进入 proof/review 流程，说明问题识别后，项目响应速度仍然较快。  

---

## 2. 版本发布
**今日无新版本发布。**

---

## 3. 项目进展
今天真正落地的“前进”主要体现在 **1 个修复 PR 关闭**，对应一个长期影响用户体验的文档/查询误报问题：

- **[#97964](https://github.com/openclaw/openclaw/pull/97964)** `fix(memory-wiki): strip fenced code blocks before wikilink extraction`  
  这个 PR 关闭了由代码块中的 `[[...]]` 误触发的 wikilink 误报问题，直接回应了 **[#97945](https://github.com/openclaw/openclaw/issues/97945)**。  
  这类修复对 wiki lint 的可用性提升明显，属于“减少噪音、提高工具可信度”的基础改进。

此外，虽然未合并，但今天新开的/更新的修复 PR 已覆盖多个核心方向：  
- 代理与网络转发：**[#97713](https://github.com/openclaw/openclaw/pull/97713)**  
- 会话/消息投递：**[#97966](https://github.com/openclaw/openclaw/pull/97966)**、**[#97963](https://github.com/openclaw/openclaw/pull/97963)**  
- 认证与边界加固：**[#97952](https://github.com/openclaw/openclaw/pull/97952)**、**[#97969](https://github.com/openclaw/openclaw/pull/97969)**、**[#97868](https://github.com/openclaw/openclaw/pull/97868)**  

**项目整体推进幅度判断：中等偏高。**  
虽然今天只有 1 个 PR 关闭，但修复议题覆盖面广，说明维护重点已从“发现问题”转向“集中修补核心链路”。

---

## 4. 社区热点
今天的热点主要来自 **高严重度 Bug 的真实用户反馈**，评论数最高的 Issue 明显集中在“功能失效但不崩溃”的体验问题上：

1. **[#97877](https://github.com/openclaw/openclaw/issues/97877)** — *empty-error-retry blocked by hadPotentialSideEffects*  
   - **评论：4，👍：1**  
   - 诉求：模型在临时 5xx 后应具备稳定重试能力，不能因为之前做过一次工具调用就“静默终止”。  
   - 背后反映：用户对“**不中断会话**”和“**失败可恢复**”的容忍度非常低。

2. **[#97799](https://github.com/openclaw/openclaw/issues/97799)** — *Molty can't reply*（已关闭）  
   - **评论：3，👍：1**  
   - 诉求：付费后能否真正完成基础聊天闭环，是用户最直接的产品体验门槛。  
   - 背后反映：用户对“**可用性高于功能堆叠**”的期望非常明确。

3. **[#97749](https://github.com/openclaw/openclaw/issues/97749)** — *Support per-agent plugin installation*  
   - **评论：2，👍：1**  
   - 诉求：不同 agent 工作区应能独立安装同一插件。  
   - 背后反映：多 agent、多 workspace 的隔离诉求正在变强，用户希望插件能力更“实例化”。

4. **[#97871](https://github.com/openclaw/openclaw/issues/97871)** — *Agent --local hangs with Ollama and LM Studio*  
   - **评论：2，👍：1**  
   - 诉求：本地模型要可用、可预测，不能出现“命令挂死但单点测试成功”的不一致。  
   - 背后反映：本地运行时兼容性仍是高频痛点。

5. **[#97971](https://github.com/openclaw/openclaw/issues/97971)** — *6 项改进建议*  
   - **评论：1，👍：1**  
   - 诉求：CLI 优先级可预测、SecretRef 文档、更新透明化、token 登录、自愈审计等。  
   - 背后反映：用户开始从“修 bug”转向“**要求工程化和可运维性**”。

---

## 5. Bug 与稳定性
按严重度和影响面排序，今天最值得关注的稳定性问题如下：

### P1 / 高优先级、影响真实用户工作流
- **[#97970](https://github.com/openclaw/openclaw/issues/97970)** — `openclaw update` 补全 `gateway.bind=lan` 与 `auth.mode:none` 冲突，导致 exit 78  
  - 影响：更新后直接挂掉，且可能触发 systemd 重启死循环。  
  - **已有 fix PR：未看到对应 PR。**

- **[#97877](https://github.com/openclaw/openclaw/issues/97877)** — 空错误重试被 `hadPotentialSideEffects` 阻断，导致 5xx 后静默终止  
  - 影响：会话中只要之前执行过工具调用，后续 transient failure 就可能无法自动恢复。  
  - **已有 fix PR：有，[#97966](https://github.com/openclaw/openclaw/pull/97966)**。

- **[#97871](https://github.com/openclaw/openclaw/issues/97871)** — `agent --local` 在 Ollama / LM Studio 下卡死  
  - 影响：本地模型路径可用性不足，且与 capability model run 行为不一致。  
  - **已有 fix PR：未看到对应 PR。**

- **[#97934](https://github.com/openclaw/openclaw/issues/97934)** — OpenRouter 401 “Missing Authentication header” 回归  
  - 影响：升级到 2026.6.10 后模型调用直接失败。  
  - **已有 fix PR：未看到对应 PR。**

- **[#97919](https://github.com/openclaw/openclaw/issues/97919)** — 运行中的 background work 在 turn boundary 被 SIGKILL  
  - 影响：`Workflow` / `run_in_background` / 依赖它们的技能无法可靠交付。  
  - **已有 fix PR：未看到对应 PR。**

- **[#97886](https://github.com/openclaw/openclaw/issues/97886)** — Feishu 插件 WebSocket 收不到 `im.message.receive_v1`  
  - 影响：消息型集成无法工作，直接影响机器人可用性。  
  - **已有 fix PR：未看到对应 PR。**

### P2 / 中等优先级，但有明确稳定性风险
- **[#97927](https://github.com/openclaw/openclaw/issues/97927)** — 上下文溢出保护低估 `bashExecution/compactionSummary` turn 长度  
  - 风险：保护失效后可能埋下后续崩溃或截断问题。  
  - **已有 fix PR：未看到对应 PR。**

- **[#97925](https://github.com/openclaw/openclaw/issues/97925)** — xAI/Grok 的 decrypt 400 触发 circuit breaker，无自动恢复  
  - 风险：会话级故障放大，影响持续性调用。  
  - **已有 fix PR：未看到对应 PR。**

- **[#97945](https://github.com/openclaw/openclaw/issues/97945)** — wiki lint 仍会把 fenced code 中的 `[[...]]` 当成 wikilink  
  - 风险：误报噪音高，影响工具信任度。  
  - **已有 fix PR：有，[#97964](https://github.com/openclaw/openclaw/pull/97964)**。

- **[#97911](https://github.com/openclaw/openclaw/issues/97911)** — `tools.deny` 未能隐藏 Codex deferred tools 中的 `skill_workshop`  
  - 风险：工具策略和实际暴露不一致，涉及权限边界。  
  - **已有 fix PR：未看到对应 PR。**

- **[#97904](https://github.com/openclaw/openclaw/issues/97904)** — 处理 reasoning_content 时，内容被错误展示给用户  
  - 风险：可能是信息泄露/输出污染问题。  
  - **已有 fix PR：未看到对应 PR。**

### 已关闭但值得关注的稳定性问题
- **[#97967](https://github.com/openclaw/openclaw/issues/97967)** — Android 端停留在 “Connecting”  
- **[#97957](https://github.com/openclaw/openclaw/issues/97957)** — iOS 设备审批出现 `unknown requestId`  
- **[#97893](https://github.com/openclaw/openclaw/issues/97893)** — Gateway OOM crash after 2–3 days  
- **[#97793](https://github.com/openclaw/openclaw/issues/97793)** — CLI root help fast path 可能挂起  
- **[#97905](https://github.com/openclaw/openclaw/issues/97905)** — `memory_search corpus=sessions` 回归为 0 结果  

这些已关闭条目说明：**会话、移动端配对、长期运行内存、CLI 快速路径** 依旧是稳定性关键面。

---

## 6. 功能请求与路线图信号
今天新增的功能需求并不只是“要新能力”，更多是在推动 OpenClaw 朝着 **多 Agent 隔离、可运维、可移植、可审计** 的方向演化。

### 可能更接近下一版本的信号
- **[#97749](https://github.com/openclaw/openclaw/issues/97749)** — per-agent plugin installation  
  - 这是很强的“多 agent 隔离”需求，和现有大量 agent-scoped 修复 PR 的方向一致。  
  - 如果继续推进，可能会优先被纳入插件生命周期改造链路。

- **[#97971](https://github.com/openclaw/openclaw/issues/97971)** — CLI 优先级、SecretRef 文档、update 透明化、token 登录、自愈审计  
  - 这里面 **CLI 优先级** 和 **update 透明化** 属于低改动高收益项；  
  - **SecretRef / token 登录 / 审计** 更偏安全与运维，和今天的安全边界修复 PR 群高度同向。  
  - 其中部分内容更像“下一轮维护版本”会吸收的工作。

- **[#97938](https://github.com/openclaw/openclaw/issues/97938)** — Computer Use plugin manifest contract  
  - 属于插件生态基础设施，作用面大，但也更架构化。  
  - 不是短平快修复，但很像中期路线图中的关键能力。

### 更像中长期路线图的信号
- **[#97885](https://github.com/openclaw/openclaw/issues/97885)** — portable Agent Bundles export/import  
  - 明显是“可迁移性”能力，价值高但改动面也大。  

- **[#97924](https://github.com/openclaw/openclaw/issues/97924)** — session rotation/archive lifecycle event  
  - 这是自动化/编排能力请求，适合长期演进。  

总体判断：**短期更可能纳入下一版本的是边界清晰、低耦合的运维与安全增强；中长期再看插件打包、会话生命周期和跨实例迁移。**

---

## 7. 用户反馈摘要
从今天的 Issue 评论和摘要里，可以提炼出几类非常真实的用户痛点：

1. **“不能静默失败，必须可恢复”**  
   - 来自 **[#97877](https://github.com/openclaw/openclaw/issues/97877)**、**[#97934](https://github.com/openclaw/openclaw/issues/97934)**  
   - 用户能接受 transient failure，但不能接受工具调用后会话直接卡死、没有重试或自愈。

2. **“本地/第三方模型路径要稳定且一致”**  
   - 来自 **[#97871](https://github.com/openclaw/openclaw/issues/97871)**、**[#97925](https://github.com/openclaw/openclaw/issues/97925)**  
   - 用户在 Ollama、LM Studio、Grok、OpenRouter 等不同提供方之间切换，期望行为一致、错误可解释。

3. **“多 agent、多 workspace 场景需要更强隔离”**  
   - 来自 **[#97749](https://github.com/openclaw/openclaw/issues/97749)**、**[#97935](https://github.com/openclaw/openclaw/issues/97935)**  
   - 用户已经在用 OpenClaw 做“多会话、多工作区、跨 session 协作”的事情，现有全局化设计开始碰到上限。

4. **“安全边界与权限必须和文档一致”**  
   - 来自 **[#97911](https://github.com/openclaw/openclaw/issues/97911)**、**[#97970](https://github.com/openclaw/openclaw/issues/97970)**、**[#97971](https://github.com/openclaw/openclaw/issues/97971)**  
   - 用户不仅要功能，还要求默认值、权限、更新脚本、CLI 优先级可预测且可审计。

5. **“移动端与消息插件必须可靠收发”**  
   - 来自 **[#97967](https://github.com/openclaw/openclaw/issues/97967)**、**[#97886](https://github.com/openclaw/openclaw/issues/97886)**  
   - 说明 OpenClaw 已被用于真实生产通讯链路，消息收发失败会直接被用户感知为“不可用”。

---

## 8. 待处理积压
以下是今天最值得维护者优先盯住的积压项，按“高风险且尚未有明确修复落地”优先：

### 需要尽快确认/推进的高优先级 Issue
- **[#97970](https://github.com/openclaw/openclaw/issues/97970)** — update 后 `gateway.bind` 与 `auth.mode:none` 冲突，可能直接把升级用户打挂  
- **[#97871](https://github.com/openclaw/openclaw/issues/97871)** — `agent --local` 本地模型卡死  
- **[#97934](https://github.com/openclaw/openclaw/issues/97934)** — OpenRouter 401 回归  
- **[#97919](https://github.com/openclaw/openclaw/issues/97919)** — background work 在 turn 边界被杀  
- **[#97886](https://github.com/openclaw/openclaw/issues/97886)** — Feishu WebSocket 事件丢失  
- **[#97911](https://github.com/openclaw/openclaw/issues/97911)** — `tools.deny` 权限边界失效  
- **[#97904](https://github.com/openclaw/openclaw/issues/97904)** — reasoning_content 外泄/误显示  

### 已有修复 PR、但仍需跟踪合并/验证
- **[#97877](https://github.com/openclaw/openclaw/issues/97877)** ↔ **[#97966](https://github.com/openclaw/openclaw/pull/97966)**  
- **[#97945](https://github.com/openclaw/openclaw/issues/97945)** ↔ **[#97964](https://github.com/openclaw/openclaw/pull/97964)**  

### Review 队列中的关键 PR
- **[#97713](https://github.com/openclaw/openclaw/pull/97713)** — 代理/NO_PROXY 匹配增强  
- **[#97952](https://github.com/openclaw/openclaw/pull/97952)** — native controls 需 admin  
- **[#97963](https://github.com/openclaw/openclaw/pull/97963)** — background completion 送达正确 session  
- **[#97969](https://github.com/openclaw/openclaw/pull/97969)** — `can_use_tool` 返回形状修正  
- **[#97968](https://github.com/openclaw/openclaw/pull/97968)** — memory embedding provider 未注册时要显式暴露  
- **[#97669](https://github.com/openclaw/openclaw/pull/97669)** — Claude CLI 子进程 OAuth 过期提示  

**提醒维护者：** 当前积压不是“普通功能排队”，而是以 **会话连续性、认证边界、消息投递可靠性、升级兼容性** 为核心的高风险集合，建议优先收敛这条主线。

---

## 横向生态对比

以下为基于 2026-06-30 各项目日报整理的**横向对比分析**，面向技术决策者与开发者阅读。

---

# 1) 生态全景

过去 24 小时，个人 AI 助手 / 自主智能体开源生态整体呈现出一个非常明确的趋势：**从“功能扩张”转向“生产可用性加固”**。多数活跃项目的讨论重心不再是“能不能做”，而是**会话能否持续、工具调用是否准确、通道是否稳定、权限边界是否明确**。  
同时，生态已明显分化为两类：一类是像 **OpenClaw / Hermes / IronClaw / ZeroClaw** 这样持续高频修复、问题暴露充分的主干项目；另一类是像 **LobsterAI** 这样进入发布收敛与质量巩固阶段的下游整合项目。  
跨项目共识也越来越强：**多渠道接入、多 provider 兼容、长会话状态管理、安全治理与可观测性**，已经成为智能体基础设施的“标配议题”。  
简言之，生态正在从“做一个 AI 助手”进化为“做一个能稳定跑业务的智能体平台”。

---

# 2) 各项目活跃度对比

> 说明：健康度评估为基于当天动态的综合判断，不代表长期质量排名。

| 项目 | Issues 更新 | PR 更新 | Release 情况 | 今日总活跃度 | 健康度评估 |
|---|---:|---:|---|---:|---|
| OpenClaw | 25 | 20 | 无新版本 | 45 | **高活跃，承压中高**（核心链路修复密集） |
| NanoBot | 4 | 12 | 无新版本 | 16 | **中高**（功能推进快，安全/稳定性问题明确） |
| Hermes Agent | 50 | 50 | 无新版本 | 100 | **高活跃，强修复期**（问题暴露充分，修复密度高） |
| PicoClaw | 0 | 0 | 无活动 | 0 | **低活跃/停滞** |
| NanoClaw | 1 | 5 | 无新版本 | 6 | **中等偏上**（接入扩展与鉴权修复并行） |
| NullClaw | 1 | 2 | 无新版本 | 3 | **偏低**（稳定性风险高于功能风险） |
| IronClaw | 11 | 21 | 无新版本 | 32 | **高活跃，质量收敛期**（QA/CI 与工作流修复密集） |
| LobsterAI | 0 | 11 | **有新版本 2026.6.29** | 11 | **健康良好**（发布后快速巩固） |
| TinyClaw | 0 | 0 | 无活动 | 0 | **低活跃/停滞** |
| Moltis | 0 | 0 | 无活动 | 0 | **低活跃/停滞** |
| CoPaw | 9 | 27 | 无新版本 | 36 | **高活跃，整体正向**（稳定性与体验修复并进） |
| ZeptoClaw | 0 | 0 | 无活动 | 0 | **低活跃/停滞** |
| ZeroClaw | 2 | 32 | 无新版本 | 34 | **高活跃，积极但有通道阻塞风险** |

**活跃度排序（按今日总更新量）**：  
Hermes Agent > OpenClaw > CoPaw > ZeroClaw > IronClaw > NanoBot > NanoClaw > LobsterAI > NullClaw

---

# 3) OpenClaw 在生态中的定位

## 定位结论
OpenClaw 是当前生态中最接近“**通用型 AI 智能体操作系统**”的项目之一：它关注的不是单一通道或单一 UI，而是**会话连续性、认证与权限、消息投递、插件能力、更新兼容性**这些底层主链路。  
从今天的数据看，它的社区活跃度在同类中处于**第一梯队**，仅次于 Hermes Agent 的超高更新量，但 OpenClaw 的问题覆盖面更广，说明它承担的是更“底座化”的压力。

## 优势
1. **覆盖面广**  
   今天的 Issue/PR 同时覆盖代理网络、会话投递、认证边界、插件安装、更新兼容、本地模型兼容等多个关键层，说明项目已经进入真实生产使用阶段。

2. **修复响应快**  
   像 `wikilink` 误报这种基础问题，已经能快速形成并关闭修复 PR，表明维护链路成熟。

3. **安全与边界意识强**  
   今天高频出现的是权限、工具暴露、reasoning_content 泄露、update 冲突等问题，说明项目在主动收口风险面，而不是只做功能。

4. **生态外溢能力强**  
   诸如 per-agent plugin installation、portable Agent Bundles、session rotation 等议题，已经明显超出“单机助手”范畴，接近平台化能力。

## 技术路线差异
与同类相比，OpenClaw 的路线更偏向：
- **Agent Runtime + Plugin Ecosystem + Session/Permission Governance**
- 而不是只做某一个通道接入或单一 UI

这意味着它的复杂度更高，但长期平台价值也更大。

## 社区规模对比
按今日更新量看：
- **OpenClaw：45**
- **Hermes Agent：100**
- **CoPaw：36**
- **ZeroClaw：34**
- **IronClaw：32**

结论是：**OpenClaw 是生态中的第二梯队领跑者，且其问题广度和底层性让它更像“基础设施核心项目”而不是“边缘应用项目”**。  
如果只看社区规模，它略小于 Hermes Agent；但如果看“覆盖的系统风险面”，它的战略重要性非常高。

---

# 4) 共同关注的技术方向

## 1. 会话连续性与失败恢复
**涉及项目**：OpenClaw、Hermes Agent、NanoBot、IronClaw、LobsterAI、CoPaw  
**具体诉求**：
- transient failure 后不要静默终止
- background work 不要在 turn boundary 被杀
- tool_call id 不要被污染
- turn cache / history 不要丢失或错乱
- 长会话、长上下文下桌面端不要冻结

**趋势判断**：  
智能体产品已经从“单轮问答”进入“长生命周期任务执行”，会话状态管理成为核心能力。

---

## 2. 多 provider / 多通道兼容
**涉及项目**：OpenClaw、Hermes Agent、NanoClaw、NanoBot、CoPaw、ZeroClaw、IronClaw  
**具体诉求**：
- OpenRouter / Grok / Anthropic / Ollama / LM Studio 等 provider 行为一致
- Discord / Slack / Telegram / Feishu / DingTalk / GitHub 等通道稳定接入
- enterprise / GHE / 私有 endpoint / 自定义 BaseURL 支持
- URL-only adapter、attachment、streaming、WebSocket 等边界链路修复

**趋势判断**：  
生态正在从“模型适配器”进化为“多渠道、多 provider 中枢”，兼容性比单点性能更关键。

---

## 3. 权限、沙箱与安全边界
**涉及项目**：OpenClaw、NanoBot、ZeroClaw、CoPaw、LobsterAI、IronClaw、Hermes Agent  
**具体诉求**：
- tools.deny / workspace restrict / admin 权限要真实生效
- SOP / step scope / payload ingress 要可控
- secret / API key / 控制字符清理
- plugin approval、canary、RBAC、OAuth 路由要一致

**趋势判断**：  
AI 智能体的安全治理正在从“外围配置项”变成“核心执行模型的一部分”。

---

## 4. 可观测性与运维可用性
**涉及项目**：NanoBot、LobsterAI、IronClaw、OpenClaw、CoPaw  
**具体诉求**：
- session timestamp、Markdown export、日志可复制
- canary / QA 结果与 artifacts 关联
- failure detail 透传
- update 行为透明、diagnostic 信息可解释

**趋势判断**：  
用户已经不仅要“能用”，而是要“**可诊断、可回放、可审计**”。

---

# 5) 差异化定位分析

## OpenClaw
- **侧重**：核心智能体运行底座、权限边界、插件生态、会话稳定性
- **目标用户**：深度使用者、平台集成方、重度工作流用户
- **架构特征**：偏平台级，强调 agent-scoped 行为和系统边界

## Hermes Agent
- **侧重**：多 provider、多平台消息投递、桌面端与长上下文稳定性
- **目标用户**：跨平台、跨消息通道、生产级多渠道用户
- **架构特征**：更像“消息/模型网关 + 智能体执行层”

## NanoBot
- **侧重**：WebUI、CLI、企业 Copilot/GHE 兼容、会话归档
- **目标用户**：个人用户 + 企业部署用户
- **架构特征**：偏“可部署、可观察、可分享”的助手产品

## NanoClaw
- **侧重**：聊天通道接入、安装引导、鉴权一致性、附件内容处理
- **目标用户**：多渠道机器人集成用户
- **架构特征**：通道适配器导向，偏接入层

## NullClaw
- **侧重**：Telegram 通道、SSE 流式工具调用、CLI REPL 交互
- **目标用户**：轻量终端/单通道用户
- **架构特征**：小而专，强调入口通道稳定性

## IronClaw
- **侧重**：Reborn / WebUI v2 / QA / CI / Google 工具链 / 工作流自动化
- **目标用户**：内部生产协作与业务自动化用户
- **架构特征**：偏工作流平台与 QA 体系

## LobsterAI
- **侧重**：下游集成、版本回灌、稳定化修复
- **目标用户**：已有 OpenClaw 核心能力的落地用户
- **架构特征**：更像“产品化发行版”而非主创新仓库

## CoPaw
- **侧重**：企业 IM 通道、工具治理、上下文效率、模型兼容性
- **目标用户**：企业协作/自动化场景
- **架构特征**：通道与治理并重，强调稳定可控

## ZeroClaw
- **侧重**：SOP、MCP、插件治理、渠道接入、Agent 管理 UI
- **目标用户**：平台型/流程型智能体构建者
- **架构特征**：更偏平台与编排能力

---

# 6) 社区热度与成熟度

## 第一层：快速迭代阶段
**Hermes Agent、OpenClaw、IronClaw、ZeroClaw、CoPaw**
- 特征：Issue/PR 密集，问题暴露充分，修复推进快
- 共性：真实用户正在高强度使用，反馈不断涌入
- 结论：处于“**高压修复 + 架构收敛**”阶段

## 第二层：质量巩固阶段
**LobsterAI、NanoBot、NanoClaw、NullClaw**
- 特征：问题相对聚焦，PR 以修复/体验打磨为主
- 共性：开始强调稳定性、可观测性、发布收口
- 结论：更接近“**可用性优化 / 版本打磨**”阶段

## 第三层：低活跃或停滞
**PicoClaw、TinyClaw、Moltis、ZeptoClaw**
- 特征：今天无活动
- 共性：缺乏近期维护信号
- 结论：当前不适合作为生态趋势样本，但可视为长期观察对象

---

# 7) 值得关注的趋势信号

## 1. 智能体产品正在“工程化”
过去大家更多关注“模型聪不聪明”，现在大家更关注：
- 是否静默失败
- 是否能恢复
- 是否可审计
- 是否可回放
- 是否可控

这对开发者的启示是：**智能体系统的核心竞争力，越来越像分布式系统工程能力，而不是单纯 prompt 技巧**。

---

## 2. 多 provider / 多通道一致性成为刚需
用户会在 OpenRouter、Anthropic、Ollama、LM Studio、Grok、Copilot、GHE 以及多种 IM 通道之间切换。  
因此，智能体框架必须提供：
- 统一错误模型
- 统一配置语义
- 统一权限语义
- 统一消息投递抽象

这会决定项目能否进入真实生产环境。

---

## 3. 长会话与后台任务是硬门槛
background work、turn boundary、history sync、cache consistency、compaction、streaming tool calls 等问题反复出现，说明：
- 智能体不再是“单次回答”
- 而是在做“长期任务管理”

未来的框架必须把**状态机、事件流、恢复机制**作为一等公民。

---

## 4. 安全治理正向底层迁移
workspace guard、tools.deny、payload safety ingress、secret sanitization、RBAC 收敛都在说明：  
**AI 智能体不是“会调用工具的聊天机器人”，而是“带权限和边界的执行系统”**。

对开发者的价值在于：安全设计不能后补，必须内建。

---

## 5. 可观测性正在变成用户需求，而非运维附属品
Markdown 导出、日志可复制、failure detail 透传、QA artifact 关联、session timestamp 等需求的共同点是：  
用户想知道“系统到底做了什么”。

这意味着未来的智能体产品，必须把**日志、轨迹、导出、审计**纳入主流程。

---

# 简短结论

- **OpenClaw**：生态中的核心底座型项目，覆盖最广、风险面最大，正在进入高频修复与边界加固阶段。  
- **Hermes Agent**：今日最活跃，属于高吞吐修复期，强调多 provider / 多平台 / 长会话稳定性。  
- **IronClaw / ZeroClaw / CoPaw**：更偏工作流、治理、通道与平台化能力，是“智能体工程化”的代表。  
- **LobsterAI**：已经进入发布后质量巩固期，适合作为“产品化落地版”观察。  
- **NanoBot / NanoClaw / NullClaw**：各自聚焦 UI、接入和通道稳定性，处于较明确的场景化演进中。  
- **停滞项目**：当前无活动，暂不构成生态趋势样本。

如果你需要，我可以进一步把这份报告整理成：
1. **一页纸决策摘要版**，或  
2. **适合汇报的 PPT 结构版**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

以下为 **NanoBot（HKUDS/nanobot）2026-06-30 项目动态日报**。  
整体来看，项目今天呈现出 **“高提交、低落地”** 的特征：过去 24 小时共有 **4 条 Issue 更新**、**12 条 PR 更新**，但 **无新版本发布**、仅 **1 个 PR 关闭**，说明开发活跃度较高，但审查与合并节奏相对保守。与此同时，今日新增/暴露的问题集中在 **安装流程、会话一致性与命令安全** 等关键路径，属于需要优先处理的稳定性信号。

---

## 1) 今日速览

- 过去 24 小时 NanoBot 仍处于高强度迭代阶段：**12 条 PR 更新** 远高于 Issue 更新，开发侧明显活跃，但可见产出主要仍停留在 PR 队列，说明评审与集成仍是当前瓶颈。  
- 今日没有新版本发布，意味着当前工作更偏向 **功能打磨、修复和架构整理**，而非对外集中发版。  
- 新暴露的 Issue 中，既有 **安装脚本崩溃** 这类新手路径问题，也有 **tool_call id 污染、shell 路径绕过** 这类会话与安全问题，项目健康度整体仍可控，但风险点明确。  
- 从 PR 内容看，团队正在同时推进 **WebUI 体验、执行安全、MCP 安全、Copilot/GHE 兼容性、会话触发器、上下文压缩** 等方向，说明产品面和基础能力都在扩展。  
- 今日综合活跃度评估：**高活跃、强迭代、待整合压力上升**。  
  - Issues 更新：4  
  - PR 更新：12  
  - 关闭/合并 PR：1  
  - 新版本：0

---

## 2) 版本发布

- **今日无新版本发布。**  
  GitHub Releases 当前无新增条目。  
  链接：`https://github.com/HKUDS/nanobot/releases`

---

## 3) 项目进展

### 今日关闭/收口的重要 PR

1. **PR #4585：Add WebUI session timestamps and Markdown export**  
   链接：`https://github.com/HKUDS/nanobot/pull/4585`  
   - 这个 PR 将 WebUI 会话侧边栏的相对时间戳展示与 Markdown 导出能力一次性收口。  
   - 从描述看，它把“会话可追溯性”和“会话可分享/归档”两项实用能力纳入了 WebUI 主流程，属于明显的用户可见进展。  
   - 与同主题的拆分 PR 相比，它更像是一个“功能整合/落地节点”，说明 WebUI 相关路线已进入交付阶段。

### 今日仍在推进、但尚未合并的高价值 PR

- **PR #4586：Show WebUI session timestamps by default**  
  `https://github.com/HKUDS/nanobot/pull/4586`  
- **PR #4587：Add WebUI session Markdown export**  
  `https://github.com/HKUDS/nanobot/pull/4587`  

这两项与 #4585 共同构成一个完整能力链：  
**默认展示会话时间 → 支持导出 Markdown → 提升 WebUI 的可用性与可归档性。**

### 今日整体推进量评估

- 从变更面看，今天不是“单点修补”，而是多个模块并行推进：
  - **WebUI**：时间戳、导出、默认行为优化
  - **执行安全**：shell guard 路径提取修复
  - **会话稳定性**：tool_call id 修复
  - **Provider 兼容性**：Copilot/GHE endpoint override
  - **系统能力**：本地 triggers、outbound 事件类型化、上下文压缩

这意味着 NanoBot 正在从“可用”向“更适合复杂企业/重度使用场景”迈进，尤其是在 **可维护性、可审计性、安全性和大上下文效率** 上。

---

## 4) 社区热点

### 今日最受关注的 Issue

1. **Issue #4599：Bug: Install script crash issue**  
   链接：`https://github.com/HKUDS/nanobot/issues/4599`  
   - 今日唯一明确带有评论的 Issue（1 条评论），且是 **安装脚本崩溃** 这类高优先级入口问题。  
   - 用户反馈指向默认 Linux 安装脚本在进入 TUI 后立即崩溃，说明问题发生在 **首装/初始化流程**，对新用户影响极大。  
   - 这类问题通常会直接影响项目口碑，因为它会阻断“第一次成功体验”。

### 今日较热的 PR 主题

虽然 PR 评论数未给出，但从更新频率和主题看，以下几条明显属于当前讨论焦点：

- **PR #4598：support GitHub Copilot endpoint overrides for enterprise/GHE**  
  `https://github.com/HKUDS/nanobot/pull/4598`  
  - 诉求来自企业/GHE 场景：支持端点与 client ID 可配置，说明已有用户在尝试把 NanoBot 接入企业化 Copilot 环境。

- **PR #4596：fix(streaming) apply_final_call_ids id corruption**  
  `https://github.com/HKUDS/nanobot/pull/4596`  
  - 直接对应严重 Bug #4595，说明会话一致性问题已经被社区快速定位并形成修复路径。

- **PR #4594：fix(exec) extract absolute paths after equals sign in shell guard**  
  `https://github.com/HKUDS/nanobot/pull/4594`  
  - 这条与 #4592 对应，背后是用户对 **workspace 边界保护** 与命令执行安全性的需求。

---

## 5) Bug 与稳定性

以下按严重程度排序：

### 1. 高危安全问题：shell guard 可被 `=` 语法绕过
- **Issue #4592：ExecTool path extraction misses absolute paths after equals sign**  
  链接：`https://github.com/HKUDS/nanobot/issues/4592`  
- 问题描述：启用 `restrictToWorkspace` 后，shell 命令守卫在提取绝对路径时未把 `=` 视为有效分隔符，导致类似 `curl --output=/etc/passwd` 这类写法可能绕过工作区边界检查。  
- 风险等级：**高**，属于潜在安全绕过。  
- 是否已有 fix PR：**有**  
  - **PR #4594**：`https://github.com/HKUDS/nanobot/pull/4594`

### 2. 高危稳定性问题：tool_call id 被错误覆盖，导致会话污染
- **Issue #4595：apply_final_call_ids overwrites correct tool_call ids...**  
  链接：`https://github.com/HKUDS/nanobot/issues/4595`  
- 问题描述：`apply_final_call_ids()` 会用过期/不匹配的流式 delta id 覆盖最终消息中的正确 `tool_call.id`，会导致后续会话持续出现重复或错误的 tool use id。  
- 风险等级：**高**，因为它会引起 **永久性的 session poisoning**，影响后续所有工具调用。  
- 是否已有 fix PR：**有**  
  - **PR #4596**：`https://github.com/HKUDS/nanobot/pull/4596`

### 3. 中高优先级：默认 Linux 安装脚本在 TUI 阶段崩溃
- **Issue #4599：Bug: Install script crash issue**  
  链接：`https://github.com/HKUDS/nanobot/issues/4599`  
- 问题描述：默认 Linux 安装脚本进入 TUI 后立刻崩溃，用户无需交互即可复现。  
- 风险等级：**中高**，因为它影响 **首次安装与新用户留存**。  
- 是否已有 fix PR：**暂未看到对应修复 PR**

### 4. 已关闭测试项，不计入稳定性风险
- **Issue #4597：this is a test\n hello!**  
  链接：`https://github.com/HKUDS/nanobot/issues/4597`  
- 已关闭，且看起来是测试性提交，不构成真实产品风险。

---

## 6) 功能请求与路线图信号

今天出现的功能/增强诉求，整体指向以下几个方向：

### 1. 企业/GHE 兼容：Copilot provider endpoint override
- **PR #4598：support GitHub Copilot endpoint overrides for enterprise/GHE**  
  `https://github.com/HKUDS/nanobot/pull/4598`  
- 这反映出用户已开始把 NanoBot 用在 **企业内网、GHE 或 Copilot for Business** 场景。  
- 这类能力一旦合并，通常会成为下一阶段的基础兼容项，优先级较高。

### 2. 会话可观察性与可归档：WebUI timestamps / Markdown export
- **PR #4586**：`https://github.com/HKUDS/nanobot/pull/4586`  
- **PR #4587**：`https://github.com/HKUDS/nanobot/pull/4587`  
- 说明用户对“会话记录”“审计”“复盘”和“分享”有真实需求。  
- 这类能力非常像下一版本的候选发布内容，因为它们提升的是 **产品使用深度** 而不只是功能数量。

### 3. 复杂交互场景：session-bound local triggers
- **PR #4591：Add session-bound local triggers**  
  `https://github.com/HKUDS/nanobot/pull/4591`  
- 体现出用户希望将外部触发器与会话强绑定，适合自动化、异步注入消息、工作流联动等场景。  
- 如果后续配合 WebUI/CLI 一起打通，可能会形成一个较完整的“事件驱动助手”能力。

### 4. 大上下文效率：tool output 压缩与 pruning
- **PR #4588：optimization... reducing context/input tokens from tool uses**  
  `https://github.com/HKUDS/nanobot/pull/4588`  
- 这类优化通常来自重度使用者痛点：工具输出太长、上下文成本高、token 浪费明显。  
- 若合并，有较强的版本价值，因为它能直接改善长会话质量与成本。

### 5. 内部架构与可维护性：typed outbound events、memory hygiene
- **PR #4590**、**PR #4589**  
  - `https://github.com/HKUDS/nanobot/pull/4590`  
  - `https://github.com/HKUDS/nanobot/pull/4589`  
- 前者偏基础设施抽象，后者偏记忆清理策略。  
- 这些信号表明项目开始处理“系统长跑”问题：可观测性、事件结构化、记忆膨胀控制。

**路线图判断：**  
如果按今天的 PR 聚类，下一版本最可能纳入的方向是：
1. **WebUI 体验增强**  
2. **安全与沙箱边界修补**  
3. **企业/GHE 兼容**  
4. **上下文压缩与效率优化**

---

## 7) 用户反馈摘要

从 Issue 与 PR 说明里，可以提炼出几个比较真实的用户痛点：

### 1. “安装就崩”会直接打断首次体验
- 来源：**Issue #4599**  
  `https://github.com/HKUDS/nanobot/issues/4599`  
- 用户反馈表明默认 Linux 安装流程在进入 TUI 后立即退出。  
- 这类反馈通常来自首次试用者，说明项目的 **入门路径稳定性** 仍需加强。

### 2. 会话一致性对重度用户很关键
- 来源：**Issue #4595 / PR #4596**  
  - Issue：`https://github.com/HKUDS/nanobot/issues/4595`  
  - PR：`https://github.com/HKUDS/nanobot/pull/4596`  
- 用户遇到的是“工具调用 id 被污染”这种相当底层的问题，说明 NanoBot 已进入 **多工具、并发流式、长期会话** 的真实使用阶段。  
- 这类痛点不只是 bug，而是“可靠性”要求的体现。

### 3. 用户希望把 NanoBot 用在更复杂的企业环境
- 来源：**PR #4598**  
  `https://github.com/HKUDS/nanobot/pull/4598`  
- 需要覆写 Copilot 端点和 client ID，说明用户有明确的企业部署诉求。  
- 这意味着“本地可跑”已经不够，用户开始追求 **可配置、可接入、可落地**。

### 4. 用户希望更方便地保存、查看和分享会话
- 来源：**PR #4585 / #4586 / #4587**  
  - `https://github.com/HKUDS/nanobot/pull/4585`  
  - `https://github.com/HKUDS/nanobot/pull/4586`  
  - `https://github.com/HKUDS/nanobot/pull/4587`  
- 导出 Markdown、显示时间戳，都是典型的“复盘/协作/审计”需求。  
- 这说明项目用户中不仅有单人试用者，也有 **需要长期保存会话记录的生产用户**。

---

## 8) 待处理积压

严格来说，今天没有出现“长期未响应”的老问题；当前待处理项大多是 **24 小时内新增的高价值 PR/Issue**，仍在正常响应窗口内。  
不过，从维护者视角，以下条目建议优先排队跟进：

### 优先级较高的待处理项

1. **Issue #4599：安装脚本崩溃**  
   `https://github.com/HKUDS/nanobot/issues/4599`  
   - 影响新用户，建议优先复现并定位。

2. **PR #4598：Copilot/GHE endpoint override**  
   `https://github.com/HKUDS/nanobot/pull/4598`  
   - 企业兼容性信号强，值得尽快评审。

3. **PR #4596：tool_call id 修复**  
   `https://github.com/HKUDS/nanobot/pull/4596`  
   - 对会话稳定性关键，建议尽快合入。

4. **PR #4594：shell guard 安全修复**  
   `https://github.com/HKUDS/nanobot/pull/4594`  
   - 涉及安全边界，应优先处理。

5. **PR #4591：session-bound local triggers**  
   `https://github.com/HKUDS/nanobot/pull/4591`  
   - 代表新的交互范式，适合纳入路线图讨论。

### 总体判断

- 当前不是“陈旧积压严重”，而是 **新问题与新 PR 密集涌入**。  
- 维护重点已经从“有没有功能”转向 **如何稳定地把功能合进去**。  
- 建议维护者重点关注：  
  1. 安全相关 PR（#4594、#4584）  
  2. 会话一致性修复（#4596）  
  3. 新用户入口问题（#4599）  
  4. WebUI 与企业兼容能力的整合节奏（#4585-#4587、#4598）

---

如果你愿意，我也可以把这份日报进一步整理成 **适合直接发到飞书/Slack/Notion 的简版周报格式**。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

以下为 **Hermes Agent（NousResearch/hermes-agent）2026-06-30 项目动态日报**。  
**数据口径**：过去 24 小时 Issues 更新 50 条（48 新开/活跃，2 关闭），PR 更新 50 条（47 待合并，3 已合并/关闭），**无新版本发布**。

---

## 1) 今日速览

Hermes Agent 今天呈现出非常高的工程活跃度，且讨论重心明显偏向 **稳定性、兼容性与数据正确性**。从 50 条 Issues 和 50 条 PR 的双高活跃来看，项目处于“高吞吐修复期”：一方面社区持续提交精确复现与修复补丁，另一方面也暴露出不少跨平台、跨 Provider、跨消息通道的边界问题。  
今天的议题覆盖 **gateway 消息投递、desktop/TUI 稳定性、cron 调度、工具参数精度、Provider 兼容性、状态库可靠性** 等多个核心面向，说明项目正从“功能扩展”进入“生产可用性加固”阶段。  
整体健康度评价：**活跃度高、问题暴露充分、修复推进积极，但稳定性债务仍较集中**。

---

## 2) 项目进展

> 说明：本次可见数据里，明确已关闭/合并的 PR 数量较少；真正有代表性的“进展”更多体现为：多个高优先级 Bug 已被迅速转化为修复 PR，形成闭环。

### 今日较有代表性的关闭/推进项
- **重复/冲突项已关闭**：`truncate_message()` 相关修复有重复 PR 被关闭，说明维护者已开始收敛同类修复分支。  
  - [PR #55311](https://github.com/NousResearch/hermes-agent/pull/55311)（已关闭，duplicate）

### 今日最值得关注的修复推进（虽然多数仍待合并，但已明显进入落地阶段）
这些 PR 表明项目正快速推进多个高风险问题的补丁化：

- **工具参数精度修复**：大整数不再经由 `float()` 造成精度损失，直接影响 Discord/Telegram ID 等高位整数工具调用正确性。  
  - [PR #55324](https://github.com/NousResearch/hermes-agent/pull/55324)  
  - [PR #55315](https://github.com/NousResearch/hermes-agent/pull/55315)

- **Telegram/聊天投递安全性**：清理 lone surrogate，避免平台送达层崩溃。  
  - [PR #55326](https://github.com/NousResearch/hermes-agent/pull/55326)  
  - [PR #55310](https://github.com/NousResearch/hermes-agent/pull/55310)

- **cron 调度一致性**：避免“重存同一 schedule”时把本该到点运行的任务悄悄推后。  
  - [PR #55325](https://github.com/NousResearch/hermes-agent/pull/55325)  
  - [PR #55318](https://github.com/NousResearch/hermes-agent/pull/55318)

- **消息分发与对用户提示**：当模型已退役/改名时，聊天回复给出更明确的可恢复指引。  
  - [PR #55327](https://github.com/NousResearch/hermes-agent/pull/55327)

- **ZFS/SQLite 稳定性**：WAL fallback 对 `disk I/O error` 进行兼容。  
  - [PR #55322](https://github.com/NousResearch/hermes-agent/pull/55322)

- **安全/显示层清理**：masked secret 过滤控制字符，降低日志污染和终端异常风险。  
  - [PR #55321](https://github.com/NousResearch/hermes-agent/pull/55321)

**综合判断**：今天的 PR 方向高度一致，都是在补齐 Hermes Agent 的“最后一公里”稳定性。若上述修复逐步合并，项目在 **消息投递可靠性、工具调用准确性、状态库稳定性、UI 可用性** 上都会明显前进一大步。

---

## 3) 社区热点

今天最热的话题明显集中在 **“平台兼容性缺口”** 和 **“生产环境稳定性”** 上。  
按评论数看，热点主要集中在以下 Issues：

- **Reasoning 配置被静默丢弃**
  - [Issue #55276](https://github.com/NousResearch/hermes-agent/issues/55276)
  - 评论数：2
  - 诉求：`reasoning_effort / thinking_budget` 对 custom、zai 以及部分 chat_completions provider 不能“悄悄失效”，用户希望行为一致、可预期。

- **Anthropic Messages 在未识别 host 上 404**
  - [Issue #55268](https://github.com/NousResearch/hermes-agent/issues/55268)
  - 评论数：2
  - 诉求：URL heuristic 不应决定 API mode，用户希望 MoA aggregator 在非标准 host 下也能正常工作。

- **macOS Desktop 在 128K token 附近崩溃/冻结**
  - [Issue #55191](https://github.com/NousResearch/hermes-agent/issues/55191)
  - 评论数：2
  - 诉求：长对话与 compaction 场景下，桌面端必须保持可用，不能“卡死窗口但后端还活着”。

此外，虽然评论数较少，但今天新增的多条 issue 都带有很强的工程共识：  
- [Issue #55314](https://github.com/NousResearch/hermes-agent/issues/55314) 大整数被 float 误伤  
- [Issue #55309](https://github.com/NousResearch/hermes-agent/issues/55309) Telegram 送达前未清理 surrogate  
- [Issue #55305](https://github.com/NousResearch/hermes-agent/issues/55305) ZFS 上 state.db 可能损坏  

**背后诉求总结**：社区正在把 Hermes Agent 当作一个“可上生产”的多渠道 AI 中枢来使用，要求的不只是功能多，而是 **跨 provider、跨平台、跨数据库环境的稳定和一致**。

---

## 4) Bug 与稳定性

按影响面和严重度排序，今天的 Bug 主要集中在以下几类：

### A. 可能导致会话中断 / 数据损坏 / 投递失败的高严重度问题

1. **ZFS + 多连接导致 state.db / WAL 异常，可能损坏会话状态**
   - [Issue #55305](https://github.com/NousResearch/hermes-agent/issues/55305)
   - 风险：会话列表、侧边栏查询全面失败，属于 **session-breaking**。
   - 对应 fix PR： [PR #55322](https://github.com/NousResearch/hermes-agent/pull/55322)

2. **Telegram 送达时遇到 lone surrogate 导致回复崩溃**
   - [Issue #55309](https://github.com/NousResearch/hermes-agent/issues/55309)
   - 风险：单条回复就可能把整次发送打断。
   - 对应 fix PR： [PR #55326](https://github.com/NousResearch/hermes-agent/pull/55326)、[PR #55310](https://github.com/NousResearch/hermes-agent/pull/55310)

3. **工具参数大整数经 float 解析后精度丢失**
   - [Issue #55314](https://github.com/NousResearch/hermes-agent/issues/55314)
   - 风险：工具调用到错误 ID，属于隐蔽但严重的正确性问题。
   - 对应 fix PR： [PR #55324](https://github.com/NousResearch/hermes-agent/pull/55324)、[PR #55315](https://github.com/NousResearch/hermes-agent/pull/55315)

4. **Desktop/TUI 在工具结果结束后无 assistant 响应，界面回到 ready**
   - [Issue #55316](https://github.com/NousResearch/hermes-agent/issues/55316)
   - 风险：用户以为流程结束，但实际上丢失了最终答复，影响任务闭环。
   - 对应 fix PR： [PR #55317](https://github.com/NousResearch/hermes-agent/pull/55317)

### B. 高可见度稳定性问题

5. **macOS Desktop 在约 128K token compaction 时 renderer crash-loop**
   - [Issue #55191](https://github.com/NousResearch/hermes-agent/issues/55191)
   - 风险：长会话直接冻结空白窗口，属于明显的可用性阻断。
   - fix PR：本次数据中**未看到对应修复 PR**

6. **gateway 聊天回复对 model unavailable 缺少清晰引导**
   - [Issue #55323](https://github.com/NousResearch/hermes-agent/issues/55323)
   - 风险：用户会把“模型退役/改名”误判为可重试故障。
   - 对应 fix PR： [PR #55327](https://github.com/NousResearch/hermes-agent/pull/55327)

### C. 中高风险交互/格式兼容问题

7. **truncation 对 fenced code block 的边界判断过松**
   - [Issue #55292](https://github.com/NousResearch/hermes-agent/issues/55292)
   - 风险：长回复被错误切分，代码块语义损坏。
   - 对应 fix PR： [PR #55328](https://github.com/NousResearch/hermes-agent/pull/55328)

8. **gateway 在 ZFS/WAL 上的 fallback 需要更宽的错误标记**
   - [Issue #55305](https://github.com/NousResearch/hermes-agent/issues/55305)
   - 对应 fix PR： [PR #55322](https://github.com/NousResearch/hermes-agent/pull/55322)

9. **WhatsApp/Discord/Graph/Home Assistant/BlueBubbles 等平台的响应体读取无上限**
   - [Issue #55296](https://github.com/NousResearch/hermes-agent/issues/55296)  
   - [Issue #55284](https://github.com/NousResearch/hermes-agent/issues/55284)  
   - [Issue #55279](https://github.com/NousResearch/hermes-agent/issues/55279)  
   - [Issue #55260](https://github.com/NousResearch/hermes-agent/issues/55260)  
   - [Issue #55274](https://github.com/NousResearch/hermes-agent/issues/55274)  
   - 风险：内存压力、错误体放大、网关侧 DoS 风险。

### D. 安全与文本净化类问题

10. **masked secret 可能保留控制字符**
   - [Issue #55319](https://github.com/NousResearch/hermes-agent/issues/55319)
   - 风险：日志/终端污染，甚至引发不可见字符问题。
   - 对应 fix PR： [PR #55321](https://github.com/NousResearch/hermes-agent/pull/55321)

11. **save_env_value 可能将 ASCII 控制字符写入 API key**
   - [Issue #55335](https://github.com/NousResearch/hermes-agent/issues/55335)
   - 风险：环境变量持久化异常，Windows 上还可能触发 `ValueError`。
   - fix PR：本次数据中**未看到对应修复 PR**

**稳定性结论**：今天暴露的问题不只是“单点 bug”，而是集中反映了 Hermes Agent 在 **消息投递边界、状态持久化、长文本处理、跨平台编码、工具参数解析** 上的工程硬度仍需加强。

---

## 5) 功能请求与路线图信号

今天的功能请求并不只是“加功能”，更多是对 Hermes 现有工作流的 **可配置性、可操作性和可扩展性** 的诉求。

### 可能进入下一版本的信号较强
- **桌面端聊天宽度可配置**
  - [Issue #55287](https://github.com/NousResearch/hermes-agent/issues/55287)
  - 信号：这是典型高频 UX 请求，且实现成本相对可控，比较像下一版可落地的桌面增强。

- **外部 shell worker 的 running→review Kanban handoff**
  - [Issue #55267](https://github.com/NousResearch/hermes-agent/issues/55267)
  - 信号：说明 Hermes 正在从“单机 agent”走向“外部 worker 协作平台”。

- **自我改进 review 应写入参考文件而非污染 SKILL.md**
  - [Issue #55255](https://github.com/NousResearch/hermes-agent/issues/55255)
  - 信号：这类内部工具链改进对长期维护很关键，可能作为技能系统整洁化的一部分进入后续版本。

- **可配置禁用 trigram FTS 索引，避免 state.db 膨胀**
  - [Issue #55233](https://github.com/NousResearch/hermes-agent/issues/55233)
  - 信号：面向大规模部署的运维需求，若采纳会明显改善自托管体验。

- **provider reasoning 配置兼容性修复**
  - [Issue #55276](https://github.com/NousResearch/hermes-agent/issues/55276)
  - 信号：虽然是 bug，但本质上也是能力补齐；若合并，能提升多 provider 一致性。

### 与路线图相关的 PR 信号
- **Slack token 类型告警**
  - [PR #55332](https://github.com/NousResearch/hermes-agent/pull/55332)
  - 说明项目在加强平台接入的“配置自检”能力。

- **视频生成 provider 生命周期回调**
  - [PR #55320](https://github.com/NousResearch/hermes-agent/pull/55320)
  - 说明能力层正在扩展到更丰富的 agent/tool 生态。

- **Gemini / SSO / desktop 的兼容修复**
  - [PR #55329](https://github.com/NousResearch/hermes-agent/pull/55329)
  - [PR #55330](https://github.com/NousResearch/hermes-agent/pull/55330)
  - [PR #55331](https://github.com/NousResearch/hermes-agent/pull/55331)
  - 表明短期路线图仍会优先围绕“现有场景可用性”展开。

**路线图判断**：下一版本大概率会以 **稳定性修复 + provider/platform 兼容 + 桌面端体验修整** 为主，而不是激进新增大功能。

---

## 6) 用户反馈摘要

从今天的 Issues/PR 评论与摘要中，能提炼出几类非常真实的用户痛点：

### 1. “不要静默失败，要行为一致”
- [Issue #55276](https://github.com/NousResearch/hermes-agent/issues/55276)
- [Issue #55268](https://github.com/NousResearch/hermes-agent/issues/55268)
- 用户最不满意的是“设置了却没生效”或“heuristic 误判”，尤其在自定义 provider、ZAI、Anthropic Messages 场景里。

### 2. “长会话不能把桌面端搞死”
- [Issue #55191](https://github.com/NousResearch/hermes-agent/issues/55191)
- [Issue #55316](https://github.com/NousResearch/hermes-agent/issues/55316)
- 用户会持续拉长对话，期望 Hermes 能处理超长上下文而不是冻结窗口或丢最后一条回复。

### 3. “消息平台必须稳定、可恢复、可解释”
- [Issue #55309](https://github.com/NousResearch/hermes-agent/issues/55309)
- [Issue #55323](https://github.com/NousResearch/hermes-agent/issues/55323)
- [Issue #55292](https://github.com/NousResearch/hermes-agent/issues/55292)
- 真实场景里，Hermes 已经被当成跨平台消息中枢，用户对 Telegram/WhatsApp/Discord/WeCom 等平台的格式与投递成功率非常敏感。

### 4. “自托管用户很在意存储和运维细节”
- [Issue #55305](https://github.com/NousResearch/hermes-agent/issues/55305)
- [Issue #55233](https://github.com/NousResearch/hermes-agent/issues/55233)
- [Issue #55335](https://github.com/NousResearch/hermes-agent/issues/55335)
- 这类反馈说明项目用户不只是普通桌面用户，还有大量生产/自托管部署者，关注数据库膨胀、WAL、环境变量和控制字符等细节。

### 5. “社区希望更强的工程化保障”
- [PR #55324](https://github.com/NousResearch/hermes-agent/pull/55324)
- [PR #55321](https://github.com/NousResearch/hermes-agent/pull/55321)
- [PR #55322](https://github.com/NousResearch/hermes-agent/pull/55322)
- 社区提交的补丁普遍带有回归测试，说明用户对 Hermes 的期待已经从“能用”转向“可验证地正确”。

---

## 7) 待处理积压

> 说明：本次快照里未见明显“长期沉默未响应”的老问题，但有几类 **高影响、尚未看到明确修复落地** 的 open 项，应优先安排。

### 建议优先跟进的 open 项
1. **macOS Desktop 长上下文 crash-loop**
   - [Issue #55191](https://github.com/NousResearch/hermes-agent/issues/55191)
   - 影响：高，且直接阻断桌面端使用。

2. **reasoning 配置在 custom/zai/provider profile 下静默丢失**
   - [Issue #55276](https://github.com/NousResearch/hermes-agent/issues/55276)
   - 影响：高，涉及模型推理能力的一致性。

3. **BlueBubbles REST helpers 无上限缓冲**
   - [Issue #55274](https://github.com/NousResearch/hermes-agent/issues/55274)
   - 影响：中高，可能放大内存风险。

4. **桌面端 chat width 可配置**
   - [Issue #55287](https://github.com/NousResearch/hermes-agent/issues/55287)
   - 影响：中，属于典型高频 UX 改进。

5. **外部 shell worker 的 running→review handoff**
   - [Issue #55267](https://github.com/NousResearch/hermes-agent/issues/55267)
   - 影响：中高，关系到 agent 协作工作流扩展。

6. **API key / secret 中控制字符清理**
   - [Issue #55335](https://github.com/NousResearch/hermes-agent/issues/55335)
   - 影响：中高，涉及配置卫生与跨平台稳定性。

### PR 层面的“待审积压”信号
- 今天 PR 量很大，但大多仍是 open，说明维护者需要尽快完成分类和优先级排序：  
  - [PR #55324](https://github.com/NousResearch/hermes-agent/pull/55324)  
  - [PR #55326](https://github.com/NousResearch/hermes-agent/pull/55326)  
  - [PR #55327](https://github.com/NousResearch/hermes-agent/pull/55327)  
  - [PR #55328](https://github.com/NousResearch/hermes-agent/pull/55328)  
  - [PR #55322](https://github.com/NousResearch/hermes-agent/pull/55322)  
  - [PR #55321](https://github.com/NousResearch/hermes-agent/pull/55321)  

**提醒**：如果这些高风险修复不能尽快合并，后续最可能出现的不是“新功能缺失”，而是 **投递失败、会话损坏、长对话不可用、平台适配不稳定** 等直接影响使用体验的问题。

---

### 总体结论

Hermes Agent 今天的社区动态体现出一个很清晰的信号：项目已经进入 **“大规模实战反馈驱动修复”** 阶段。  
这对开源项目是好事——说明真实用户在高强度使用它；但也意味着维护者需要持续把优先级放在 **稳定性、兼容性、正确性、可诊断性** 上。  
如果今天这些修复 PR 能在后续几天持续合并，Hermes Agent 的整体健康度会明显改善。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-06-30）

## 1) 今日速览
过去 24 小时，NanoClaw 维持了**较高的开发活跃度、较低的社区讨论热度**：共有 **1 条 Issue 更新**、**5 条 PR 更新**，但**没有新版本发布**。从 PR 内容看，团队主要在推进 **Discord 接入、Slack Socket Mode 体验、单 provider 安装下的鉴权修复** 等关键路径，说明项目仍处于持续扩展与稳定性打磨阶段。  
今天的信号偏向“**功能扩张 + 核心链路修 bug**”并行，健康度总体不错，但依然存在若干影响真实使用的高优先级问题，尤其是附件内容丢失与安装/配置链路的兼容性问题。  
**总体活跃度评估：中高**；**讨论热度：偏低**；**交付节奏：偏快但仍以 PR 驱动为主**。

---

## 3) 项目进展
今日最值得关注的是 **2 个 PR 关闭**、**3 个 PR 仍在开放中**，项目在“功能补齐”和“稳定性修复”两条线上同时推进。

### 已关闭的重要 PR
1. **[PR #2883](https://github.com/qwibitai/nanoclaw/pull/2883)** — `feat: voice-notify v3 意图分流 + kill-switch`  
   这条 PR 把语音播报摘要从“全量一刀切”升级为按意图分流（action / silent / navigate / tech_status / notify），并增加了 `VOICE_SUMMARY_VERSION=off` 的运行时开关。  
   **推进意义**：提升了语音输出的可控性与可用性，降低长文本、代码块、长表格对播报体验的干扰，属于明显的用户体验优化。

2. **[PR #2882](https://github.com/qwibitai/nanoclaw/pull/2882)** — `fix(ncl): default messaging-groups create instance to channel_type`  
   该 PR 解决了 `ncl messaging-groups create` 在 `instance` 字段上的 `NOT NULL` 约束错误。  
   **推进意义**：修复了 CLI 创建流程的基础数据完整性问题，属于偏底层但影响真实操作的稳定性修复。

### 仍在推进的开放 PR
- **[PR #2886](https://github.com/qwibitai/nanoclaw/pull/2886)** — 新 agent 继承安装时 provider，避免单 provider 安装下 401
- **[PR #2885](https://github.com/qwibitai/nanoclaw/pull/2885)** — Slack Socket Mode 纳入 guided setup
- **[PR #2884](https://github.com/qwibitai/nanoclaw/pull/2884)** — 新增 Discord channel adapter，并修复 Gateway approval 按钮路由

**项目整体前进幅度判断**：今天的提交/PR 主要集中在“接入面扩展 + 安装/鉴权/播报体验修复”，说明 NanoClaw 正在从“可用”走向“更完整、更稳”。如果这些开放 PR 继续合并，下一步很可能会显著提升多渠道兼容性与首次配置成功率。

---

## 4) 社区热点
今天社区讨论热度并不高，**只有 1 条 Issue 带有评论**，且整体反应数为 0，说明当前仓库的互动主要仍发生在开发协作层，而非公开讨论层。

### 讨论最活跃的条目
1. **[Issue #2888](https://github.com/qwibitai/nanoclaw/issues/2888)** — `Discord (and likely other url-only chat-sdk adapters) drop image/file attachments — agent only sees filename`  
   - 评论数：1  
   - 👍：0  
   - 关注点：附件在 Discord 里被代理层“看丢了”，只剩元数据，内容未传给 agent。  

**背后的诉求**：用户希望在 Discord 里发送截图、文档、图片后，agent 能像 Telegram 场景那样真正读取附件内容，而不是只能拿到文件名和大小。这个诉求非常实际，直接影响“借图排障、传文档协作、截图提问”等高频使用场景。

### 次级热点（以开发协作为主）
- **[PR #2884](https://github.com/qwibitai/nanoclaw/pull/2884)**：Discord 支持本身就是明显的产品扩展方向  
- **[PR #2885](https://github.com/qwibitai/nanoclaw/pull/2885)**：Slack Socket Mode guided setup 补齐，说明项目在追求部署体验一致性  
- **[PR #2886](https://github.com/qwibitai/nanoclaw/pull/2886)**：配置/权限链路的鉴权修复，表明真实部署环境中仍有“默认值不一致”类问题

---

## 5) Bug 与稳定性
按影响面与严重程度排序，今日可见的问题如下：

### 1. 高严重度：Discord / URL-only adapter 附件内容丢失
- **[Issue #2888](https://github.com/qwibitai/nanoclaw/issues/2888)**  
- 现象：用户发送图片/截图/文件后，agent 只收到 `{type, name, mimeType, size}` 这类元数据，**无法获得附件内容**。  
- 影响：  
  - 截图排障失效  
  - 文件/文档解析失效  
  - Discord 场景下的多模态工作流被阻断  
- 当前状态：**未见明确对应 fix PR**（从给定数据看）。  
- 判断：这是今天最值得优先处理的稳定性问题之一，因为它直接损害核心使用路径。

### 2. 中高严重度：单 provider 安装下新 agent 可能触发 401
- **[PR #2886](https://github.com/qwibitai/nanoclaw/pull/2886)**  
- 问题：新 agent 组创建时默认 provider 不匹配安装实际 provider，导致单 provider 环境出现鉴权失败。  
- 状态：**已有修复 PR 正在推进**。  
- 影响：会直接影响“新 channel 注册/新 agent 接入”这条关键 onboarding 链路。

### 3. 中等严重度：CLI 创建 messaging group 触发 NOT NULL 约束错误
- **[PR #2882](https://github.com/qwibitai/nanoclaw/pull/2882)**  
- 问题：`instance` 字段未被正确写入，导致 `ncl messaging-groups create` 失败。  
- 状态：**已关闭，问题应已收敛**。  
- 影响：影响基础管理命令的可靠性，但范围比附件丢失和鉴权失败更局部。

---

## 6) 功能请求与路线图信号
今天的 PR 与 Issue 共同释放出几个比较清晰的路线图信号：

### 信号 A：多渠道接入仍是主线
- **[PR #2884](https://github.com/qwibitai/nanoclaw/pull/2884)** 明确新增 Discord adapter  
- **[Issue #2888](https://github.com/qwibitai/nanoclaw/issues/2888)** 又暴露出 URL-only adapter 的附件处理缺陷  
**判断**：下一版本很可能继续围绕“聊天平台接入”增强，尤其是 Discord 及其与现有 Chat SDK 桥接层的兼容性。

### 信号 B：安装/引导流程要补齐不同部署模式
- **[PR #2885](https://github.com/qwibitai/nanoclaw/pull/2885)** 把 Slack Socket Mode 纳入 guided setup  
**判断**：这说明项目正在从“功能可用”转向“安装体验完整”，下一版本大概率会继续补齐不同 channel 的 guided setup 分支。

### 信号 C：权限/Provider 配置需要更强的默认一致性
- **[PR #2886](https://github.com/qwibitai/nanoclaw/pull/2886)** 说明当前在“新 agent 自动继承安装 provider”上存在一致性问题  
**判断**：这类修复通常会被纳入近期版本，因为它直接影响 onboarding 成功率与单 provider 部署可用性。

### 信号 D：多模态输入能力正在成为用户预期
- **[Issue #2888](https://github.com/qwibitai/nanoclaw/issues/2888)** 表明用户已经默认期望 agent 能读取图片/文件内容，而不是只识别文件名  
**判断**：附件下载、内容抽取、预处理链路很可能会成为近期优先级较高的改进方向。

---

## 7) 用户反馈摘要
从现有 Issue 描述中，可以提炼出较明确的用户痛点与使用场景：

### 真实痛点
- **[Issue #2888](https://github.com/qwibitai/nanoclaw/issues/2888)**：Discord 中发送的图片/文件只剩“文件名”，内容没进 agent  
  - 用户不满意点：系统“看见了附件，却没读到附件”  
  - 直接后果：截图提问、文件协作、图片排障等常见场景不可用  

### 使用场景
- 在 Discord 里发送截图给 agent 进行问题定位
- 上传文件/文档让 agent 读取并总结
- 在多渠道场景下期待行为一致：Telegram 可以，Discord 却不行

### 用户感受趋势
- **满意点**：项目已经能在多渠道场景下跑通，且 Telegram 附件链路是正常的，说明基础架构并非完全失效。  
- **不满意点**：不同 adapter 之间能力不一致，尤其是“url-only chat-sdk adapter”一类在附件处理上存在功能断层，这会显著削弱用户对跨平台一致性的信任。

---

## 8) 待处理积压
严格按“长期未响应”定义，**今天给出的数据里没有足够证据表明存在真正长期沉默的老 Issue/PR**。不过，有几条**当前仍在等待处理、且优先级较高**的条目值得维护者尽快跟进：

1. **[Issue #2888](https://github.com/qwibitai/nanoclaw/issues/2888)** — 附件内容丢失，影响面大，建议优先排查桥接层  
2. **[PR #2886](https://github.com/qwibitai/nanoclaw/pull/2886)** — 单 provider 安装下 401 修复，属于 onboarding 核心链路  
3. **[PR #2885](https://github.com/qwibitai/nanoclaw/pull/2885)** — Slack guided setup 补齐，影响安装体验  
4. **[PR #2884](https://github.com/qwibitai/nanoclaw/pull/2884)** — Discord adapter，上线后将直接扩大项目可用场景

**提醒**：如果维护者希望降低“功能扩展快、边角 bug 也快暴露”的风险，建议优先收敛 #2888 与 #2886；这两类问题分别对应“多模态输入”和“鉴权/接入”，都属于高价值主链路。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

以下为 **NullClaw（https://github.com/nullclaw/nullclaw）** 的 **2026-06-30 项目动态日报**。

---

## 1) 今日速览

过去 24 小时，NullClaw 共有 **1 条 Issue 更新**、**2 条 PR 更新**，但 **没有新版本发布**。整体来看，项目今天处于 **中低活跃度**：有新增问题暴露，也有两项功能/体验改进在推进，但尚未出现代码合并落地。  
当前最值得关注的是 **Telegram 通道空闲后失联** 的稳定性问题，这类问题会直接影响 AI 助手的长期在线可用性。与此同时，两个开放 PR 分别聚焦 **SSE 流式场景下的原生工具调用** 和 **CLI REPL 交互体验**，说明项目仍在持续打磨核心能力与使用体验。  
综合判断：**开发节奏稳定，但稳定性风险高于功能风险**；短期健康度取决于通道可靠性修复进展。  
相关链接：  
- 仓库主页：https://github.com/nullclaw/nullclaw  
- 今日新增/活跃 Issue：[#972](https://github.com/nullclaw/nullclaw/issues/972)  
- 今日活跃 PR：[#971](https://github.com/nullclaw/nullclaw/pull/971)、[#970](https://github.com/nullclaw/nullclaw/pull/970)

---

## 2) 项目进展

**今日没有已合并或已关闭的关键 PR**，因此从“已落地代码”角度看，项目今天的实质推进有限。  
不过，两个开放 PR 反映了明确的演进方向：

- **[#971 feat(streaming): native tool calls during SSE streaming](https://github.com/nullclaw/nullclaw/pull/971)**  
  目标是让支持原生工具调用的模型/供应商在 **SSE 流式输出过程中** 也能直接发起工具调用，减少当前通过 prompt injection 方式兜底带来的能力损失。  
  若合并，这会明显增强 NullClaw 的 **流式 agent 能力**，对复杂对话、边生成边调用工具的场景很关键。

- **[#970 fix(cli): handle arrow keys in agent REPL](https://github.com/nullclaw/nullclaw/pull/970)**  
  这是一个偏小但高频的交互修复：让 `nullclaw agent` 的交互式 REPL 支持方向键、历史导航、Home/End、删除、光标移动等。  
  若合并，会显著改善 **CLI 可用性**，降低终端用户的输入摩擦。

**推进幅度判断：**  
从功能覆盖看，项目正同时补强 **“模型/工具调用链路”** 与 **“人机交互入口”** 两条主线；但由于今天没有合并，整体前进更多体现在 **开发排队与方案成熟**，而非已发布能力。  
相关链接：  
- [PR #971](https://github.com/nullclaw/nullclaw/pull/971)  
- [PR #970](https://github.com/nullclaw/nullclaw/pull/970)

---

## 3) 社区热点

截至本日报统计窗口，**没有出现高评论、高点赞的热点讨论**：  
- [Issue #972](https://github.com/nullclaw/nullclaw/issues/972)：评论 0，👍 0  
- [PR #971](https://github.com/nullclaw/nullclaw/pull/971)：评论 0，👍 0  
- [PR #970](https://github.com/nullclaw/nullclaw/pull/970)：评论 0，👍 0  

这说明今天社区互动总体偏清淡，尚未形成围绕某个问题的集中讨论。  
但从内容热度上看，**#972 的稳定性问题**最接近真实用户痛点，原因在于它影响的是“能否持续可用”而不是单纯的功能丰富度；而 **#971 / #970** 则更像是维护者主动推动的产品优化方向。  
相关链接：  
- [Issue #972](https://github.com/nullclaw/nullclaw/issues/972)  
- [PR #971](https://github.com/nullclaw/nullclaw/pull/971)  
- [PR #970](https://github.com/nullclaw/nullclaw/pull/970)

---

## 4) Bug 与稳定性

### 最高优先级：Telegram 通道空闲后失去响应
- **[#972 [OPEN] [bug] telegram channel stop respond after some idle time](https://github.com/nullclaw/nullclaw/issues/972)**  
  现象：Telegram channel 在前一天工作正常后，第二天早上开始不再响应；但后端仍然工作正常，`nullclaw agent -m "ping"` 可正常返回。  
  **严重程度：高**，因为它影响的是外部入口通道的持续在线能力，直接破坏无人值守/长期运行使用场景。  
  **可能原因方向：** 更像是 Telegram 连接保持、会话恢复、长时间空闲后的 channel 复活机制问题，而不是核心推理或后端服务故障。  
  **是否已有 fix PR：** 当前未看到直接关联的修复 PR。  
  链接：[#972](https://github.com/nullclaw/nullclaw/issues/972)

### 其他稳定性信号
- 当前数据中没有看到崩溃、回归或大规模报错的其他新增条目。  
- 由于今日唯一 bug 直接指向“通道失联”，建议维护者优先确认是否存在 **keepalive / reconnect / session timeout** 相关缺陷。  
链接：  
- [Issue #972](https://github.com/nullclaw/nullclaw/issues/972)

---

## 5) 功能请求与路线图信号

今天没有新增明确的“功能需求 Issue”，但两个开放 PR 已经释放出较清晰的路线图信号：

1. **流式工具调用原生化**  
   - [PR #971](https://github.com/nullclaw/nullclaw/pull/971)  
   这很可能是下一阶段的重要能力增强点。对于 AI agent 来说，“边流式输出边调用工具”会显著改善响应速度与能力表达，属于高价值方向。

2. **CLI 交互体验打磨**  
   - [PR #970](https://github.com/nullclaw/nullclaw/pull/970)  
   这是典型的“低风险、高收益”优化，通常更容易进入近期版本。

**路线图判断：**  
如果项目准备下一个版本，这两个 PR 都具备较高的纳入可能性，其中 **#970 更像短平快的体验修复**，**#971 更像能力层升级**。  
从产品策略看，NullClaw 正在向“更强的流式 agent + 更顺手的终端交互”演进。  
相关链接：  
- [PR #971](https://github.com/nullclaw/nullclaw/pull/971)  
- [PR #970](https://github.com/nullclaw/nullclaw/pull/970)

---

## 6) 用户反馈摘要

当前能提炼出的真实用户反馈主要来自 **[#972](https://github.com/nullclaw/nullclaw/issues/972)**：

- **使用场景**：用户将 Telegram 作为日常/跨天可用的外部交互入口，期望它能在长时间空闲后自动恢复或持续在线。  
- **核心痛点**：前一晚正常，第二天早上失联，说明用户对“**长期稳定在线**”的要求非常高。  
- **正向反馈**：后端仍可正常响应，说明问题并非核心 agent 引擎失效，而是 **通道层** 出现了故障；这至少意味着基础推理/执行链路是健康的。  
- **不满点**：外部通道不稳定会让用户感知为“产品不可依赖”，这类问题对 AI 助手尤其敏感。

链接：  
- [Issue #972](https://github.com/nullclaw/nullclaw/issues/972)

---

## 7) 待处理积压

从当前数据看，**没有明显的“长期未响应”积压项**：  
- [Issue #972](https://github.com/nullclaw/nullclaw/issues/972) 是当天新报问题；  
- [PR #971](https://github.com/nullclaw/nullclaw/pull/971) 与 [PR #970](https://github.com/nullclaw/nullclaw/pull/970) 也都在近两天内更新，尚不属于陈旧积压。  

不过，从维护优先级角度，建议按以下顺序跟进：

1. **先 triage #972**：因为它影响实际可用性，且涉及外部通道稳定性。  
2. **再 review #971**：涉及流式工具调用，是能力增强的关键 PR。  
3. **随后处理 #970**：虽为体验优化，但范围相对可控，适合快速合并。  

链接：  
- [Issue #972](https://github.com/nullclaw/nullclaw/issues/972)  
- [PR #971](https://github.com/nullclaw/nullclaw/pull/971)  
- [PR #970](https://github.com/nullclaw/nullclaw/pull/970)

---

### 总体结论

NullClaw 今天的状态可以概括为：**开发活跃度中等偏低，但方向明确；功能演进在持续，稳定性问题需要优先修复。**  
如果后续能尽快处理 Telegram 通道的空闲失联问题，同时推进流式工具调用和 CLI 交互优化，项目的用户体验和可用性都会明显提升。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-06-30）

## 1) 今日速览
今天 IronClaw 仍处于**高活跃、强迭代**状态：过去 24 小时内有 **11 条 Issue 更新**、**21 条 PR 更新**，但**没有新版本发布**，说明团队主要精力仍集中在持续修复、QA 回归和基座能力完善上。  
从内容看，当前主线集中在 **Reborn / WebUI v2 / CI / 集成测试 / 自动化工作流**，并且问题多数来自真实使用路径：Google 工具链、Slack/Sheets/Routine、web search、认证与交互流。  
整体判断：**开发推进速度快，但稳定性压力也在上升**，属于“持续向前，但需要加快收敛回归”的阶段。  
关键数据：**PR 21 条更新（13 已合并/关闭，8 待处理）**，项目在一天内有较强的收束能力，但核心用户路径仍有多个高优先级 bug 暴露。  

---

## 2) 版本发布
**今日无新版本发布。**

---

## 3) 项目进展
今天已合并/关闭的 PR 主要把项目往三个方向推进：**可测试性增强、QA 流程标准化、以及 WebUI/CI 稳定性修补**。

### 重点已完成 PR
- [#5425](https://github.com/nearai/ironclaw/pull/5425) `design(reborn): multi-user RBAC convergence`
  - 输出了多用户 RBAC 收敛设计，明确“复用已有能力、避免新增层级”的原则。
  - 对后续多用户权限体系是重要的路线图信号。
- [#5423](https://github.com/nearai/ironclaw/pull/5423) `Accept QA7 routine wording variants`
  - 放宽 QA 文本门槛，允许 routine / automation / cron / schedule / fires / watches 等多种表述。
  - 说明团队在提升 QA 规则的鲁棒性，减少“措辞过严导致误报”。
- [#5422](https://github.com/nearai/ironclaw/pull/5422) `Fix /canary PR target validation`
  - 修正 `/canary` 目标校验，避免测试错误 PR 头。
  - 对 live QA / canary 的可信度提升明显。
- [#5414](https://github.com/nearai/ironclaw/pull/5414) `fix(webui-v2): make log entry text selectable/copyable`
  - 修复 WebUI v2 日志页文本无法复制的问题。
  - 直接改善排障体验，属于高可见度 UX 修复。
- [#5408](https://github.com/nearai/ironclaw/pull/5408) `ci: ignore unreachable wasmtime wasi advisory`
  - 临时处理依赖安全告警，降低 CI 噪音，但保留后续升级空间。
- [#5406](https://github.com/nearai/ironclaw/pull/5406) `Use QA sheet prompts in Reborn live QA`
  - 将 Reborn live QA 的提示词与 QA 表单统一，减少“测试脚本和真实用户意图不一致”的偏差。
- [#5405](https://github.com/nearai/ironclaw/pull/5405) `chore: upgrade Rust version to 1.96`
  - 抬升 Rust 基线并统一 MSRV，属于底层工程能力升级。
- [#5402](https://github.com/nearai/ironclaw/pull/5402) `test(reborn-itest): shared-persistence group tests`
  - 补齐共享持久化组测试，覆盖 approvals / auth / memory / secrets / extensions 等薄弱面。
- [#5400](https://github.com/nearai/ironclaw/pull/5400) `fix(ci): stabilize extension crate name parsing and Windows clippy`
  - 稳定扩展解析和 Windows CI，减少平台差异导致的误失败。
- [#5399](https://github.com/nearai/ironclaw/pull/5399) `Add /canary PR comment trigger`
  - 为维护者提供 `/canary` 评论触发能力，进一步标准化验证流程。
- [#5398](https://github.com/nearai/ironclaw/pull/5398) `Fix live canary workflow expression`
  - 修复 workflow 表达式错误，避免零任务失败记录。
- [#5397](https://github.com/nearai/ironclaw/pull/5397) `Limit scheduled live canary to Reborn WebUI v2 QA`
  - 将定时 canary 收敛到 Reborn WebUI v2 QA，减少 legacy 路线噪音。

### 整体推进判断
- **短期收益最大的是 QA/CI 体系修复**：canary、live QA、测试样本、日志可复制性都在持续补强。
- **中期价值最大的是 Reborn 能力收敛**：RBAC 设计、错误详情透传、共享持久化测试等，都是后续产品化的基础。
- **今日“向前迈进”的量**：13 个 PR 已关闭/合并，说明团队在高频改动下仍能保持一定收敛效率；但开放 PR 仍有 8 个，说明主线尚未完全稳定。

---

## 4) 社区热点
> 注：本批数据中 **PR 的评论数未给出**，Issue 的点赞数也几乎为 0，因此以下热点主要按“更新活跃度 + 问题影响面”判断。当前唯一明确有评论的是 [#5413](https://github.com/nearai/ironclaw/issues/5413)（1 条评论）。

### 热点 1：Reborn / WebUI v2 的真实路径问题
- [#5421](https://github.com/nearai/ironclaw/issues/5421)  
  `web search under ironclaw-reborn: not zero-config by default`
- [#5420](https://github.com/nearai/ironclaw/issues/5420)  
  `Routine delivery target is a global per-user default, not per-routine`
- [#5415](https://github.com/nearai/ironclaw/issues/5415)  
  `Multi-tool Google Sheets workflow fails with protocol violation`

**背后诉求**：用户已经在真实业务流里使用 IronClaw，不再只是单工具演示；他们要求的是**多工具编排、默认配置正确、自动化输出隔离**，而不是“能跑但不稳”。

### 热点 2：认证 / 连接状态的一致性
- [#5416](https://github.com/nearai/ironclaw/issues/5416)  
  `Incorrect Google connection state causes contradictory authentication flow`
- [#5426](https://github.com/nearai/ironclaw/issues/5426)  
  `Cannot create a routine: system drive is not available`

**背后诉求**：用户希望“已连接/未连接/安装/激活”这些状态有清晰边界，不能在关键时刻出现前后矛盾或资源不可用。

### 热点 3：用户可操作性与可观察性
- [#5413](https://github.com/nearai/ironclaw/issues/5413)  
  `Reborn inline OAuth refresh swallows non-applied refresh silently`
- [#5412](https://github.com/nearai/ironclaw/issues/5412)（已关闭）  
  `webui v2: log entry text is not selectable / copyable`

**背后诉求**：排障和操作体验要更“可解释、可复制、可追踪”，否则会拖慢定位问题的速度。

---

## 5) Bug 与稳定性
按严重程度排序如下：

| 严重程度 | Issue | 问题摘要 | 是否已有 fix PR |
|---|---|---|---|
| **高** | [#5415](https://github.com/nearai/ironclaw/issues/5415) | 多工具 Google Sheets 工作流在 18–25 次 tool calls 场景中触发 `protocol violation`，会直接打断任务链 | **未见** |
| **高** | [#5420](https://github.com/nearai/ironclaw/issues/5420) | Routine 的 delivery target 变成“用户全局默认值”，导致一个 routine 改 Slack，其他 routine 也被重路由 | **未见** |
| **中高** | [#5421](https://github.com/nearai/ironclaw/issues/5421) | `ironclaw-reborn serve` 下 web search 不是 zero-config，还会重复要求 NEAR AI 认证 | **未见** |
| **中** | [#5416](https://github.com/nearai/ironclaw/issues/5416) | Google 连接状态判断错误，出现“已连接”与“未激活”相互矛盾的认证流程 | **未见** |
| **中** | [#5426](https://github.com/nearai/ironclaw/issues/5426) | 创建 routine 时提示 system drive 不可用，阻断核心创建路径 | **未见** |
| **中** | [#5417](https://github.com/nearai/ironclaw/issues/5417) | Hacker News 搜索触发了错误 skill（tech-debt-tracker），属于路由/意图选择偏差 | **未见** |
| **中低** | [#5418](https://github.com/nearai/ironclaw/issues/5418) | 工具活动后消息顺序错乱，影响对话可读性 | **未见** |
| **中低** | [#5419](https://github.com/nearai/ironclaw/issues/5419) | automation 没有 rename 入口，导致自动生成名字不可控 | **未见** |
| **已修复** | [#5412](https://github.com/nearai/ironclaw/issues/5412) | WebUI v2 日志文本不可选择/复制 | **有**，对应 PR [#5414](https://github.com/nearai/ironclaw/pull/5414) |
| **已关闭** | [#5413](https://github.com/nearai/ironclaw/issues/5413) | inline OAuth refresh 静默吞掉未生效刷新 | **未见明确关联 PR** |

### 稳定性判断
- 目前稳定性问题主要不是“单点崩溃”，而是**工作流级别的错误传播**：协议违例、状态机矛盾、默认值串扰、skill 路由错误。
- 这类问题通常比 UI 小瑕疵更影响用户信任，尤其是涉及 **Google 工具、Routine、web search、OAuth** 的链路。
- 好消息是：项目已经开始补测试、补 canary、补日志能力，说明团队对稳定性问题是有响应策略的。

---

## 6) 功能请求与路线图信号
今天的新增/推进内容里，虽然大部分是 bug，但也出现了几条明显的功能与路线图信号：

### 可能进入下一版本的方向
- **多用户 RBAC 收敛**  
  - 设计 PR：[#5425](https://github.com/nearai/ironclaw/pull/5425)  
  - 信号强：说明 IronClaw 正在向更成熟的多用户协作和权限边界演进。
- **更透明的失败反馈**
  - 相关 PR：[#5403](https://github.com/nearai/ironclaw/pull/5403) `send real failure detail to the model`
  - 价值很高：失败原因不再只给“类别”，而是给可诊断信息（同时保留 secrets 安全边界）。
- **QA 结果与产物可追溯**
  - 相关 PR：[#5424](https://github.com/nearai/ironclaw/pull/5424) `Link failed Reborn QA cases to artifacts`
  - 对维护者很关键：失败 case 能直接跳到 `results.json`、`test-output.log`、trace 等产物。
- **Deep-link / 私有安装能力**
  - 相关 PR：[#5409](https://github.com/nearai/ironclaw/pull/5409) `feat(reborn-ironhub): deep-link register/install gateway + private manifest source`
  - 说明产品形态在向“可安装、可分发、可注册”的生态能力演进。
- **自动化命名、delivery 范围、web search 零配置**
  - 相关 Issues：[#5419](https://github.com/nearai/ironclaw/issues/5419)、[#5420](https://github.com/nearai/ironclaw/issues/5420)、[#5421](https://github.com/nearai/ironclaw/issues/5421)
  - 这些是非常典型的“下一轮体验优化”需求，优先级大概率不低。

### 路线图判断
如果看今天的 PR/Issue 组合，IronClaw 下一阶段很可能围绕：
1. **Reborn 生产化**：RBAC、auth、failure detail、canary QA。
2. **工作流可靠性**：多工具链、Routine、Sheets/Slack/Gmail 等真实业务路径。
3. **可观测性与可排障**：日志可复制、失败产物关联、真实错误透传。

---

## 7) 用户反馈摘要
从 Issue 描述里，能提炼出几类非常真实的用户痛点：

### 1. 用户不是在“试功能”，而是在“跑业务”
- 代表问题：  
  - [#5415](https://github.com/nearai/ironclaw/issues/5415) Google Sheets 多工具流程失败  
  - [#5420](https://github.com/nearai/ironclaw/issues/5420) routine delivery 串扰  
  - [#5416](https://github.com/nearai/ironclaw/issues/5416) Google 连接状态矛盾
- 反馈含义：用户已经把 IronClaw 接到真实账号、真实表格、真实 Slack、真实邮件链路上。

### 2. 用户对“默认行为”很敏感
- 代表问题：  
  - [#5421](https://github.com/nearai/ironclaw/issues/5421) web search 不是 zero-config  
  - [#5420](https://github.com/nearai/ironclaw/issues/5420) per-routine 配置变成全局默认  
- 反馈含义：默认值一旦不正确，会直接造成“我以为它会这样，但它其实不是”的信任损伤。

### 3. 用户希望工具状态更一致、更可解释
- 代表问题：  
  - [#5416](https://github.com/nearai/ironclaw/issues/5416) 连接/激活说法矛盾  
  - [#5413](https://github.com/nearai/ironclaw/issues/5413) 静默刷新失败
- 反馈含义：不是不能失败，而是**失败必须显式、状态必须统一**。

### 4. 用户在意可读性和可修改性
- 代表问题：  
  - [#5418](https://github.com/nearai/ironclaw/issues/5418) 消息顺序乱  
  - [#5419](https://github.com/nearai/ironclaw/issues/5419) 自动化不能重命名  
  - [#5412](https://github.com/nearai/ironclaw/issues/5412) 日志文本不可复制（已修复）
- 反馈含义：随着使用频率上升，UX 的“小问题”会迅速放大成排障成本。

---

## 8) 待处理积压
> 说明：本次数据只覆盖最近 24 小时，**无法严格判断“长期未响应”**。下面列出的是**当前仍开放、且对主线影响较大的待处理项**，建议维护者优先关注。

### 当前优先级较高的开放项
- [#5415](https://github.com/nearai/ironclaw/issues/5415) 多工具 Google Sheets protocol violation
- [#5420](https://github.com/nearai/ironclaw/issues/5420) routine delivery target 串扰
- [#5421](https://github.com/nearai/ironclaw/issues/5421) web search 非 zero-config
- [#5416](https://github.com/nearai/ironclaw/issues/5416) Google auth 状态矛盾
- [#5426](https://github.com/nearai/ironclaw/issues/5426) routine 创建时 system drive 不可用
- [#5417](https://github.com/nearai/ironclaw/issues/5417) Hacker News 搜索 skill 路由错误
- [#5424](https://github.com/nearai/ironclaw/pull/5424) failed QA artifacts 关联（待审）
- [#5427](https://github.com/nearai/ironclaw/pull/5427) mock-MCP scaffold 抽取（待审）
- [#5410](https://github.com/nearai/ironclaw/pull/5410) Dependabot 依赖升级（待审）
- [#5409](https://github.com/nearai/ironclaw/pull/5409) IronHub deep-link/install gateway（待审）
- [#5407](https://github.com/nearai/ironclaw/pull/5407) SSE resume 后 skill bubble 丢失（待审）
- [#5403](https://github.com/nearai/ironclaw/pull/5403) 失败详情透传（待审）
- [#5401](https://github.com/nearai/ironclaw/pull/5401) WebUI v2 文案本地化（待审）

### 关注建议
- **先审高风险工作流修复**：#5415、#5420、#5421、#5416。
- **再审可观测性/测试基础设施**：#5424、#5427、#5407、#5403。
- **并行处理依赖与工程化 PR**：#5410、#5401、#5409。

---

## 总体结论
IronClaw 今天的状态可以概括为：**前进很快、修复很多、但真实场景的稳定性问题仍然集中暴露**。  
如果把“开发健康度”看作一个维度，今天是积极的；如果把“用户体验稳定性”看作另一个维度，则仍处于需要持续修补的阶段。  
接下来最关键的是：**尽快把多工具工作流、认证状态、Routine 配置隔离和 web search 默认行为这四类问题收敛掉**，否则它们会成为 Reborn 规模化使用的主要阻力。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报  
**日期：2026-06-30**  
数据来源：GitHub（[netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)）

---

## 1) 今日速览
过去 24 小时内，LobsterAI 主要表现为**发布收敛与稳定性修复驱动**：共更新 11 个 PR，且全部已关闭/合并，同时发布了 1 个新版本，说明团队在积极完成版本回灌与主干同步。  
Issues 侧 **0 条新增/活跃/关闭**，意味着今天没有明显的外部故障爆发或用户集中反馈，社区讨论热度也相对低。  
从内容上看，修复重点集中在 **OpenClaw 运行稳定性**、**Cowork 交互细节**、**OAuth 路由** 与 **cron 历史同步**，属于“修体验、稳底座”的典型维护日。  
综合判断：**项目活跃度偏高，但讨论活跃度偏低；健康度良好，当前处于发布后快速巩固阶段。**

---

## 2) 版本发布
### 新版本：**2026.6.29**
- 发布链接：[# Release 2026.6.29](https://github.com/netease-youdao/LobsterAI/releases/tag/2026.6.29)

### 版本重点
根据本日 PR 回灌内容，这个版本更像是一次**稳定性与兼容性修复版**，核心包括：

1. **OpenClaw 稳定性增强**
   - 修复插件审批走权限系统：
     - PR: [#2217](https://github.com/netease-youdao/LobsterAI/pull/2217)
   - 保持 agent bootstrap 工作区与任务 cwd 分离：
     - PR: [#2227](https://github.com/netease-youdao/LobsterAI/pull/2227)
   - 保持用户 turn cache 稳定：
     - PR: [#2219](https://github.com/netease-youdao/LobsterAI/pull/2219)
   - 保留 cron run 后续历史：
     - PR: [#2220](https://github.com/netease-youdao/LobsterAI/pull/2220)
   - 将 OpenAI OAuth 路由到 ChatGPT responses provider：
     - PR: [#2221](https://github.com/netease-youdao/LobsterAI/pull/2221)

2. **Cowork 交互体验修复**
   - 清理导航 rail 预览：
     - PR: [#2218](https://github.com/netease-youdao/LobsterAI/pull/2218)
   - 清理并对齐 conversation rail tooltips：
     - PR: [#2222](https://github.com/netease-youdao/LobsterAI/pull/2222)
   - 将 conversation rail 修复重新应用到 release：
     - PR: [#2226](https://github.com/netease-youdao/LobsterAI/pull/2226)

### 破坏性变更与迁移注意事项
- **未见明确的 breaking change 声明。**
- 但有一项行为修正需要注意：
  - **Agent bootstrap 目录不再跟随任务 cwd**，而是保持独立工作区。
  - 这意味着依赖“项目目录中读取 SOUL.md / IDENTITY.md / USER.md / MEMORY.md / memory/”的旧行为将不再成立。
  - 相关修复见：[#2227](https://github.com/netease-youdao/LobsterAI/pull/2227)

---

## 3) 项目进展
今日最重要的进展是：**release/2026.6.29 成功推进到 main**，说明本轮修复已完成主干整合。  
- 发布回灌主 PR：[#2228](https://github.com/netease-youdao/LobsterAI/pull/2228)

### 今日推进的关键能力点
1. **Agent 稳定性更强**
   - 用户 turn cache 稳定性修复降低上下文错乱风险：[#2219](https://github.com/netease-youdao/LobsterAI/pull/2219)
   - bootstrap workspace 与任务 cwd 解耦，减少身份/记忆文件误加载：[#2227](https://github.com/netease-youdao/LobsterAI/pull/2227)
   - cron run 历史同步避免重复/破坏性替换：[#2220](https://github.com/netease-youdao/LobsterAI/pull/2220)

2. **权限与连接器链路更清晰**
   - 插件审批改为走 permissions 体系，说明 OpenClaw 的权限治理在收口：[#2217](https://github.com/netease-youdao/LobsterAI/pull/2217)
   - OpenAI OAuth 重定向至 ChatGPT responses provider，减少兼容分叉：[#2221](https://github.com/netease-youdao/LobsterAI/pull/2221)

3. **UI/交互细节更精致**
   - conversation rail tooltip / preview 多次修订，说明团队在持续打磨多会话导航体验：[#2218](https://github.com/netease-youdao/LobsterAI/pull/2218), [#2222](https://github.com/netease-youdao/LobsterAI/pull/2222), [#2223](https://github.com/netease-youdao/LobsterAI/pull/2223)
   - 回滚与重提交流程说明 release 分支和 main 的变更隔离策略较严格：[#2224](https://github.com/netease-youdao/LobsterAI/pull/2224), [#2225](https://github.com/netease-youdao/LobsterAI/pull/2225), [#2226](https://github.com/netease-youdao/LobsterAI/pull/2226)

### 整体向前迈进了多少
可以概括为：**本日不是“新功能爆发日”，而是“平台稳定性、权限体系、历史一致性与 UI 体验”系统性补强日。**  
从工程成熟度看，这类集中修复通常比单点功能更能提升实际可用性，尤其对 AI 助手/智能体产品的长期运行至关重要。

---

## 4) 社区热点
### 结论：今日没有明显社区讨论热点
- Issues：**0 条**，无新增也无活跃：  
  - Issues 列表：<https://github.com/netease-youdao/LobsterAI/issues>
- PR 方面：虽然有 11 个更新，但**评论数未提供或为 0，点赞也为 0**，看不出明显的争议性讨论。

### 可视为“隐性热点”的方向
尽管没有评论热度，PR 的主题显示社区/维护侧的关注点集中在：
- **OpenClaw 稳定性**：[#2219](https://github.com/netease-youdao/LobsterAI/pull/2219), [#2220](https://github.com/netease-youdao/LobsterAI/pull/2227)
- **多会话/导航 rail 的可读性与可用性**：[#2218](https://github.com/netease-youdao/LobsterAI/pull/2218), [#2222](https://github.com/netease-youdao/LobsterAI/pull/2223)
- **认证与权限链路**：[#2217](https://github.com/netease-youdao/LobsterAI/pull/2217), [#2221](https://github.com/netease-youdao/LobsterAI/pull/2221)

### 背后诉求
用户更在意的是：
- 智能体是否**记得住、跑得稳**
- 多会话导航是否**更清楚、更不干扰**
- 认证、插件审批是否**可控且一致**

---

## 5) Bug 与稳定性
> 由于今日没有公开 Issues，本节主要基于已合并/关闭的修复 PR 归纳潜在问题。

### 高优先级：OpenClaw 运行时一致性与记忆稳定
1. **Agent bootstrap 工作区与任务 cwd 混用**
   - 影响：可能导致身份文件、记忆文件从错误目录加载，破坏 persona 与长期记忆
   - 状态：已修复
   - PR：[#2227](https://github.com/netease-youdao/LobsterAI/pull/2227)

2. **用户 turn cache 不稳定**
   - 影响：对话序列序列化/缓存可能发生抖动或回退
   - 状态：已修复
   - PR：[#2219](https://github.com/netease-youdao/LobsterAI/pull/2219)

3. **cron run 历史同步会丢失后续消息/产生重复替换**
   - 影响：历史记录一致性受损，可能造成上下文缺失
   - 状态：已修复
   - PR：[#2220](https://github.com/netease-youdao/LobsterAI/pull/2220)

### 中优先级：权限与认证路由
4. **插件审批未正确经过 permissions**
   - 影响：权限治理链路可能不完整
   - 状态：已修复
   - PR：[#2217](https://github.com/netease-youdao/LobsterAI/pull/2217)

5. **OpenAI OAuth 路由不符合预期 provider**
   - 影响：认证/调用链兼容性风险
   - 状态：已修复
   - PR：[#2221](https://github.com/netease-youdao/LobsterAI/pull/2221)

### 低优先级：UI 预览与 tooltip 细节
6. **conversation rail tooltip 中混入 thinking / plan tags / artifact tokens**
   - 影响：预览可读性下降
   - 状态：已修复
   - PR：[#2218](https://github.com/netease-youdao/LobsterAI/pull/2218), [#2222](https://github.com/netease-youdao/LobsterAI/pull/2223)

---

## 6) 功能请求与路线图信号
今日没有新增 Issues，因此**未见明确的外部功能请求**。  
不过，从 PR 主题可以识别出下一阶段路线图的强信号：

### 可能进入下一版本的方向
1. **OpenClaw 作为核心智能体运行底座继续强化**
   - 关键词：cache、workspace、history、permissions、OAuth
   - 说明：产品正在把“能跑”升级为“长期可稳定运行、权限边界清晰、历史可追踪”
   - 相关 PR：[#2217](https://github.com/netease-youdao/LobsterAI/pull/2217), [#2219](https://github.com/netease-youdao/LobsterAI/pull/2220), [#2221](https://github.com/netease-youdao/LobsterAI/pull/2227)

2. **Cowork 的会话导航体验继续优化**
   - 关键词：conversation rail、tooltip、preview、hover
   - 说明：多人/多会话场景下的内容识别与快速切换体验仍是重点
   - 相关 PR：[#2218](https://github.com/netease-youdao/LobsterAI/pull/2218), [#2222](https://github.com/netease-youdao/LobsterAI/pull/2223), [#2226](https://github.com/netease-youdao/LobsterAI/pull/2226)

3. **发布流程趋于规范化**
   - 关键词：release branch、backport、revert、promote to main
   - 说明：团队可能继续强化“先 release 验证，再合并主干”的节奏
   - 相关 PR：[#2224](https://github.com/netease-youdao/LobsterAI/pull/2224), [#2225](https://github.com/netease-youdao/LobsterAI/pull/2228)

---

## 7) 用户反馈摘要
由于今日 **Issues 为 0**，没有可直接引用的用户评论或反馈线程。  
因此，本日的“用户反馈”更多是从修复方向反推用户痛点：

### 推测出的真实痛点
- **智能体身份/记忆不能跑偏**
  - 用户最在意 agent 是否保持一致人格与长期记忆
  - 线索：[#2227](https://github.com/netease-youdao/LobsterAI/pull/2227), [#2219](https://github.com/netease-youdao/LobsterAI/pull/2219)

- **历史记录不能丢、不能重复**
  - 用户希望 cron 或同步场景下上下文保持完整
  - 线索：[#2220](https://github.com/netease-youdao/LobsterAI/pull/2220)

- **多会话导航预览要“干净且可扫读”**
  - 用户不希望在 rail/tooltip 中看到思考痕迹、artifact token 或杂乱标签
  - 线索：[#2218](https://github.com/netease-youdao/LobsterAI/pull/2218), [#2222](https://github.com/netease-youdao/LobsterAI/pull/2223)

- **权限和认证路径要统一**
  - 用户/管理者希望插件审批和 OAuth 链路具备可解释性和一致性
  - 线索：[#2217](https://github.com/netease-youdao/LobsterAI/pull/2217), [#2221](https://github.com/netease-youdao/LobsterAI/pull/2221)

---

## 8) 待处理积压
### 当前可见积压：低
根据你提供的数据：
- Issues：**0**
- PR：今日更新的 11 个已全部关闭/合并

这意味着在**当前可见范围内，没有明显的未响应积压**。  
如果从维护角度看，当前最值得持续观察的不是“待处理队列”，而是这些修复在真实用户环境中的回归表现：

- OpenClaw 工作区隔离是否影响既有自定义流程  
  - 参考：[#2227](https://github.com/netease-youdao/LobsterAI/pull/2227)
- cron 历史同步是否彻底消除重复/丢失  
  - 参考：[#2220](https://github.com/netease-youdao/LobsterAI/pull/2220)
- conversation rail 的 tooltip/preview 是否已稳定收敛  
  - 参考：[#2218](https://github.com/netease-youdao/LobsterAI/pull/2223)

---

## 总体判断
LobsterAI 今日呈现出非常典型的**发布后稳定化修复日**特征：  
**代码活动高、问题反馈低、修复聚焦明确、主干已完成回灌。**  
从项目健康度看，这是一个偏正面的信号，说明仓库当前更像是在“打磨可用性与可靠性”，而不是被动应对大量线上故障。

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

# CoPaw 项目动态日报（2026-06-30）

## 1. 今日速览
- 过去 24 小时内，项目保持较高工程活跃度：**9 条 Issue 更新、27 条 PR 更新**，其中 **13 条 PR 已合并/关闭**，说明主线工作推进速度快于问题沉淀速度。
- 今日讨论重心明显偏向**工具输出正确性、通道体验、模型兼容性和部署稳定性**，例如工具卡片计数错误 [#5624](https://github.com/agentscope-ai/QwenPaw/issues/5624)、钉钉流式输出过慢 [#5603](https://github.com/agentscope-ai/QwenPaw/issues/5603)、纯文本模型图片回退 [#5615](https://github.com/agentscope-ai/QwenPaw/issues/5615) 等。
- 版本层面暂无新 Release，但多个已合并 PR 继续围绕 **2.0.0b2** 之后的收尾与修复展开，显示项目仍处于“快速修正 + 体验打磨”的阶段 [#5608](https://github.com/agentscope-ai/QwenPaw/pull/5608)、[#5613](https://github.com/agentscope-ai/QwenPaw/pull/5613)。
- 从社区反应看，**没有高赞失控型舆情**，主要是围绕真实使用场景提出的可操作诉求，项目健康度整体偏正向。

## 2. 项目进展
今日已合并/关闭的 PR 里，较有代表性的推进集中在以下方向：

- **版本与发布节奏收尾**：版本号升级到 **2.0.0b2**，说明项目进入新阶段的稳定化准备 [#5608](https://github.com/agentscope-ai/QwenPaw/pull/5608)。
- **工具治理更精细**：修复/增强工具的配置感知启停，减少工具行为与配置不一致的问题 [#5604](https://github.com/agentscope-ai/QwenPaw/pull/5604)。
- **部署稳定性增强**：限制 supervisord 在启动失败时的无限重启，降低线上部署事故概率 [#5613](https://github.com/agentscope-ai/QwenPaw/pull/5613)。
- **文档与交互整理**：上下文管理文档、网站图示、会话高亮和计划模式相关内容持续清理，说明产品正在从“功能堆叠”走向“架构/文档/体验一致性” [#5614](https://github.com/agentscope-ai/QwenPaw/pull/5614)、[#5618](https://github.com/agentscope-ai/QwenPaw/pull/5618)、[#5619](https://github.com/agentscope-ai/QwenPaw/pull/5619)。
- **测试结构对齐**：测试目录从 `runner/` 迁移到 `chats/`，并处理 review 问题，有助于提升 CI 可信度和代码组织一致性 [#5611](https://github.com/agentscope-ai/QwenPaw/pull/5611)。

**总体判断**：今日推进的 13 个已完成 PR，主要在“版本收尾、稳定性、治理、文档和测试”上补强，属于对项目底座质量的持续加固。

## 3. 社区热点
今日讨论最集中的问题，基本都来自真实使用中的“卡点”：

- **工具调用结果卡片计数错误**：`glob_search / read_file / grep_search` 等工具的结果卡片标题始终显示 `1`，与实际返回数量不符，且已出现 3 条评论，属于今天最核心的可见问题 [#5624](https://github.com/agentscope-ai/QwenPaw/issues/5624)。  
  - 诉求本质：**UI 不能误导用户对工具输出规模的判断**。
  - 相关修复已在审：[#5628](https://github.com/agentscope-ai/QwenPaw/pull/5628)。

- **钉钉通道流式输出过慢**：长文本在钉钉端逐字输出，严重影响可用性，说明企业消息通道的“实时感”仍是痛点 [#5603](https://github.com/agentscope-ai/QwenPaw/issues/5603)。  
  - 诉求本质：**同样内容，控制台能快，通道侧也要快**。

- **自定义 Telegram BaseURL**：希望支持私有化或替代端点，说明用户对部署自由度和通道可替换性有明确需求 [#5630](https://github.com/agentscope-ai/QwenPaw/issues/5630)。

- **纯文本模型的图片自动转文字描述**：用户希望在不支持多模态时自动走 vision fallback，说明真实工作流里“上传图片但模型不支持”的场景非常常见 [#5615](https://github.com/agentscope-ai/QwenPaw/issues/5615)。

- **评论最多的已关闭条目**：`test-label-permission` 这类权限测试问题虽非典型用户反馈，但也体现出维护者在补齐边界条件验证 [#5625](https://github.com/agentscope-ai/QwenPaw/issues/5625)。

## 4. Bug 与稳定性
按影响面和使用阻塞程度，今日的 Bug/稳定性问题可排序如下：

1. **自动化任务无故终止**  
   - 问题：用户反馈自动化任务会“莫名其妙终止”，且无任何手动干预 [#5616](https://github.com/agentscope-ai/QwenPaw/issues/5616)  
   - 影响：高，直接影响自动化可靠性  
   - 修复状态：**暂无明确 fix PR**

2. **钉钉通道流式输出过慢**  
   - 问题：卡片式流式输出在钉钉端逐字渲染，长文本等待时间过长 [#5603](https://github.com/agentscope-ai/QwenPaw/issues/5603)  
   - 影响：高，影响企业通道日常可用性  
   - 修复状态：**暂无明确 fix PR**

3. **工具卡片计数始终显示 1**  
   - 问题：`glob_search/read_file/grep_search` 等工具的结果数量显示错误 [#5624](https://github.com/agentscope-ai/QwenPaw/issues/5624)  
   - 影响：中高，属于明显 UI/可信度缺陷  
   - 修复状态：**已有对应修复 PR 在审** [#5628](https://github.com/agentscope-ai/QwenPaw/pull/5628)

4. **工具执行 OFF 模式仍弹审批**  
   - 问题：Web UI 关闭工具审批后仍出现审批提示，属于治理逻辑回归 [#5623](https://github.com/agentscope-ai/QwenPaw/pull/5623)  
   - 影响：中高，影响工具执行效率和配置可信度  
   - 修复状态：**已有修复 PR**

补充：`#5626` 已关闭，且与 `#5624` 同类，说明该 UI 计数问题已经被维护者识别为重复/同源问题 [#5626](https://github.com/agentscope-ai/QwenPaw/issues/5626)。

## 5. 功能请求与路线图信号
今天新增/活跃的需求，清晰地指向几个后续迭代方向：

- **多通道配置能力继续增强**
  - 需求包括 Telegram 自定义 BaseURL [#5630](https://github.com/agentscope-ai/QwenPaw/issues/5630)、Windows 托盘后台运行 [#5622](https://github.com/agentscope-ai/QwenPaw/issues/5622)、钉钉流式输出优化 [#5603](https://github.com/agentscope-ai/QwenPaw/issues/5603)。
  - 结合已开的通道相关 PR（如 per-channel `no_text_debounce` 开关 [#5617](https://github.com/agentscope-ai/QwenPaw/pull/5617)），说明**通道层可配置性**很可能是下一阶段重点。

- **模型/供应商兼容性扩展**
  - 需求包括纯文本模型图片 fallback [#5615](https://github.com/agentscope-ai/QwenPaw/issues/5615)、自定义模型协议 [#5609](https://github.com/agentscope-ai/QwenPaw/issues/5609)。
  - 再结合 provider kwargs 路由修复 [#5607](https://github.com/agentscope-ai/QwenPaw/pull/5607)，可以判断**兼容更多非标准接口与多模态回退**，很可能进入下一版本候选。

- **工具治理与安全策略**
  - 已有 PR 涵盖工具启停逻辑 [#5604](https://github.com/agentscope-ai/QwenPaw/pull/5604)、OFF 模式审批修复 [#5623](https://github.com/agentscope-ai/QwenPaw/pull/5623)、Sandbox 文档补齐 [#5621](https://github.com/agentscope-ai/QwenPaw/pull/5621)。
  - 这说明下一版本大概率会继续强化**工具执行安全、审批一致性、沙箱说明**。

- **上下文/记忆体验**
  - 文档与行为修正集中出现：上下文管理文档更新 [#5629](https://github.com/agentscope-ai/QwenPaw/pull/5629)、scroll 记忆策略说明 [#5631](https://github.com/agentscope-ai/QwenPaw/pull/5631)。
  - 信号表明项目正在把“上下文管理”从内部实现推进到**用户可理解、可配置**的层面。

## 6. 用户反馈摘要
从今日 Issues 可提炼出几个真实痛点：

- **准确性优先于“看起来能跑”**：工具输出数量不准会直接削弱用户对系统的信任 [#5624](https://github.com/agentscope-ai/QwenPaw/issues/5624)。
- **企业通道更看重吞吐和响应速度**：钉钉端逐字渲染的问题说明用户在真实工作流中非常在意“完整响应能否尽快出现” [#5603](https://github.com/agentscope-ai/QwenPaw/issues/5603)。
- **自动化任务需要强可靠性**：任务无故终止对自动化使用场景是高风险问题 [#5616](https://github.com/agentscope-ai/QwenPaw/issues/5616)。
- **用户希望平台更开放、更可部署**：自定义 Telegram BaseURL、自定义模型协议、Windows 托盘后台运行都体现出明显的“可私有化、可扩展、可常驻”诉求 [#5630](https://github.com/agentscope-ai/QwenPaw/issues/5630)、[#5609](https://github.com/agentscope-ai/QwenPaw/issues/5609)、[#5622](https://github.com/agentscope-ai/QwenPaw/issues/5622)。
- **多模态兼容是刚需，而不是加分项**：纯文本模型遇到图片不能直接失败，用户希望系统自动补齐能力 [#5615](https://github.com/agentscope-ai/QwenPaw/issues/5615)。

整体来看，用户反馈以“**阻塞型问题**”为主，说明项目已进入真实生产/准生产使用阶段，需求更偏向稳定性、兼容性与效率。

## 7. 待处理积压
严格来说，当前数据里**没有足够证据表明存在跨多日未响应的老积压**；但以下条目影响面较大，建议维护者优先跟进，避免从“新问题”演变成“体验事故”：

- **工具结果计数错误**，建议尽快合并修复并补回归测试 [#5624](https://github.com/agentscope-ai/QwenPaw/issues/5624)、[#5628](https://github.com/agentscope-ai/QwenPaw/pull/5628)
- **自动化任务异常终止**，属于高优先级可靠性问题 [#5616](https://github.com/agentscope-ai/QwenPaw/issues/5616)
- **钉钉流式输出性能问题**，影响企业场景使用体验 [#5603](https://github.com/agentscope-ai/QwenPaw/issues/5603)
- **纯文本模型图片 fallback**，若不处理，容易在多模态场景引发直接失败 [#5615](https://github.com/agentscope-ai/QwenPaw/issues/5615)
- **自定义协议/BaseURL 需求**，对生态扩展和私有化部署很关键 [#5609](https://github.com/agentscope-ai/QwenPaw/issues/5609)、[#5630](https://github.com/agentscope-ai/QwenPaw/issues/5630)

---

**结论**：CoPaw 今天的状态可以概括为“**高频推进、以稳定性与兼容性修补为主**”。没有新发布，但 PR 消化效率不错，且用户反馈高度贴近真实使用场景；如果接下来能快速闭环工具计数、通道性能和自动化可靠性，项目健康度会进一步提升。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

以下为 **ZeroClaw（[zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)）2026-06-30 项目动态日报**。

## 1) 今日速览
过去 24 小时内，仓库保持了很高的开发活跃度：**Issues 更新 2 条，PR 更新 32 条，其中 7 条已合并/关闭**，但**没有新版本发布**。这说明项目当前仍处于“高频开发、低频发版”的推进阶段，功能和修复都在快速收敛，但尚未进入版本化交付。  
从主题上看，今日主线集中在 **渠道接入、MCP/工具链、SOP 安全与执行边界、Agent 体验** 等方向，说明 ZeroClaw 正在同时推进平台能力与产品可用性。整体健康度偏积极，但**稳定性与发布节奏**仍是需要继续补强的部分。  
相关入口：[仓库首页](https://github.com/zeroclaw-labs/zeroclaw)

## 2) 版本发布
**今日无新版本发布**（Releases: 0）。  
最新 Release：无  
入口：[Releases](https://github.com/zeroclaw-labs/zeroclaw/releases)

## 3) 项目进展
今日已确认收口的代表性 PR，主要集中在 **安全加固、依赖修复、执行边界控制**：

- **[#8502](https://github.com/zeroclaw-labs/zeroclaw/pull/8502)** `feat(sop): complete payload safety ingress`  
  为 SOP 外部内容引入安全辅助能力，覆盖触发内容截断、规范化、标记框架、prompt guard 筛查与出站脱敏复用。  
  **意义**：强化了外部输入进入 SOP 流程时的安全链路，降低 prompt 注入和不可信 payload 风险。

- **[#8500](https://github.com/zeroclaw-labs/zeroclaw/pull/8500)** `fix(deps): bump anyhow for RUSTSEC-2026-0190`  
  升级 `anyhow` 以修复 RustSec 安全公告相关问题。  
  **意义**：属于典型的供应链安全修补，提升运行时基础稳定性。

- **[#8493](https://github.com/zeroclaw-labs/zeroclaw/pull/8493)** `feat(sop): enforce step scope and mode events`  
  在 SOP 执行中收紧 step 工具可见范围，并增加模式事件。  
  **意义**：让 SOP 执行边界更清晰，减少“工具越权调用”类问题。

综合来看，今日至少有 **7 个 PR 进入合并/关闭状态**，意味着主干正在持续吸收新能力；公开摘要中可见的 3 个关键收口项，明显把项目推进到了 **“安全性、依赖健康、执行治理”** 这几个更靠近生产化的层面。  
相关入口：[Pull Requests](https://github.com/zeroclaw-labs/zeroclaw/pulls)

## 4) 社区热点
从当前数据看，今日并没有出现“高评论、高反应”的明显爆点；**唯一明确带有评论的 Issue 是**：

- **[#8505](https://github.com/zeroclaw-labs/zeroclaw/issues/8505)** `[bug] Telegram channel cannot be configured`  
  评论数：1，👍：0  
  **背后诉求**：用户已经完成 quickstart / zerocode 配置，但 `channels doctor` 仍提示未配置，且机器人只在 CLI 响应、TG 不响应。  
  **热点判断**：这是一个强烈的“可用性/可观测性”问题，说明用户对 **通道配置成功与否的反馈机制** 期待很高。

另外两个虽未见评论但值得视作“需求热点”的方向是：
- **[#8478](https://github.com/zeroclaw-labs/zeroclaw/issues/8478)** Agent enabled toggle in Dashboard Agents  
  反映用户希望在 Dashboard 里直接启停 Agent，减少“看得到状态、却改不了状态”的认知落差。
- **[#8504](https://github.com/zeroclaw-labs/zeroclaw/pull/8504)** GitHub channel with SOP ingress  
  说明社区对 **多渠道接入与 GitHub 事件流入** 的需求持续增强。

## 5) Bug 与稳定性
按严重程度排序，今日最值得关注的是：

1. **[#8505](https://github.com/zeroclaw-labs/zeroclaw/issues/8505)** `[bug] Telegram channel cannot be configured`  
   - 严重级别：**S1 - workflow blocked**
   - 现象：TG 机器人不响应，CLI 正常；channels doctor 仍认为未配置。
   - 影响：直接阻断 Telegram 通道使用，属于高优先级生产阻塞问题。
   - **是否已有 fix PR**：当前数据中**未看到对应 fix PR**。

补充的稳定性修复信号：
- **[#8497](https://github.com/zeroclaw-labs/zeroclaw/pull/8497)** `fix(tools): avoid manual Windows verbatim prefix slicing`  
  属于 Windows/工具链兼容性修复，能减少 CI/平台差异引发的失败。
- **[#8499](https://github.com/zeroclaw-labs/zeroclaw/pull/8499)** `fix(hardware): preserve inner error in serial and uno-q bridge timeout handlers`  
  改善超时错误的结构化日志，可提升故障排查效率。
- **[#8501](https://github.com/zeroclaw-labs/zeroclaw/pull/8501)** `fix(config): warn when sqlite memory requests vector search without an embedder`  
  这是配置层面的“误用预警”，可减少静默失败。

结论：**今日没有披露崩溃类大面积事故，但有一个明确的 S1 级通道故障**，值得优先排查。

## 6) 功能请求与路线图信号
今日新增/活跃的功能诉求，明显指向以下路线：

- **[#8478](https://github.com/zeroclaw-labs/zeroclaw/issues/8478)** `feat(zerocode): add an agent enabled toggle in Dashboard Agents`  
  **信号**：Agent 管理 UI 正在从“只展示状态”走向“可操作状态”。  
  **路线图判断**：低风险、高可见度，较可能进入下一轮迭代。

- **[#8504](https://github.com/zeroclaw-labs/zeroclaw/pull/8504)** `feat(channels): add GitHub channel with SOP ingress`  
  **信号**：平台正强化 GitHub 作为一等通道，目标是把 issue/PR/review/workflow 事件纳入 SOP 流水线。  
  **路线图判断**：属于战略型能力，若稳定落地，会显著扩展 ZeroClaw 的“工程协作中枢”属性。

- **[#8495](https://github.com/zeroclaw-labs/zeroclaw/pull/8495)** `feat(channels/dingtalk): streaming message support`  
  **信号**：对企业 IM 场景的消息流式交付需求增强。  
  **路线图判断**：若渠道侧优先级上升，这类功能可能很快进入正式版本。

- **[#8508](https://github.com/zeroclaw-labs/zeroclaw/pull/8508)** `feat(mcp): resources-as-context, pinning, and named-prompt rendering`  
  **信号**：MCP 能力正在从“连接”进入“上下文管理”。  
  **路线图判断**：很像下一阶段的核心平台能力，和 Agent 的实际可用性强相关。

- **[#8509](https://github.com/zeroclaw-labs/zeroclaw/pull/8509)** `feat(sop): add procedural memory workshop`  
  **信号**：SOP 进入“创建—审核—应用”闭环。  
  **路线图判断**：功能价值高，但复杂度与风险也高，可能属于中期能力。

- **[#8491](https://github.com/zeroclaw-labs/zeroclaw/pull/8491)** `feat(plugins): per-call execution limits and FND-001 backend taxonomy`  
  **信号**：平台开始系统化管理插件执行资源与后端分类。  
  **路线图判断**：更偏基础设施治理，利于后续规模化。

总体上看，**渠道接入 + Agent 管理 UX + MCP/SOP 工具化** 是最明确的路线图信号。

## 7) 用户反馈摘要
> 注：当前数据未提供评论正文，以下为基于 issue 标题与摘要的用户诉求归纳。

- **Telegram 通道配置失败**：  
  用户已经完成配置流程，但实际机器人不响应，且诊断工具仍提示未配置。  
  这反映出两个痛点：  
  1) 配置链路可能存在状态同步或识别逻辑问题；  
  2) 诊断信息对用户不够“可解释”，容易造成“我明明配好了，系统却说没配”的挫败感。  
  入口：[#8505](https://github.com/zeroclaw-labs/zeroclaw/issues/8505)

- **Dashboard 里缺少 Agent 启停开关**：  
  用户希望 UI 显式提供 enable/disable 控件，说明当前“状态可见但不可直接操作”的设计已经影响效率。  
  这类反馈通常来自真实管理场景，而不是纯功能想象。  
  入口：[#8478](https://github.com/zeroclaw-labs/zeroclaw/issues/8478)

综合来看，用户最在意的是：**配置可预期、状态可诊断、操作可直达**。  
入口：[Issues](https://github.com/zeroclaw-labs/zeroclaw/issues)

## 8) 待处理积压
由于当前只有 24 小时快照，**无法严格判断“长期未响应”**；但从优先级和工作量看，以下条目值得维护者优先关注：

- **[#8505](https://github.com/zeroclaw-labs/zeroclaw/issues/8505)** — S1 级 Telegram 通道阻断，建议尽快定位配置/路由/守护进程链路问题。
- **[#8496](https://github.com/zeroclaw-labs/zeroclaw/pull/8496)** `fix(tools/mcp): centralize deferred-MCP access policy as single source of truth`  
  已标记 **needs-author-action**，如果作者不补充，容易成为合并瓶颈。
- **[#8504](https://github.com/zeroclaw-labs/zeroclaw/pull/8504)**、**[#8508](https://github.com/zeroclaw-labs/zeroclaw/pull/8508)**、**[#8509](https://github.com/zeroclaw-labs/zeroclaw/pull/8509)**、**[#8491](https://github.com/zeroclaw-labs/zeroclaw/pull/8491)**  
  这些都是体量较大、风险较高的开放 PR，代表着“功能推进快，但评审与集成压力也大”。

如果只挑今天最该盯的积压项，优先级建议为：  
**#8505 > #8496 > #8504/#8508/#8509/#8491**。  
入口：[Pull Requests](https://github.com/zeroclaw-labs/zeroclaw/pulls)

---

### 简要结论
今天的 ZeroClaw 呈现出典型的 **高开发强度、低发版频率** 特征：主线在推进，尤其是渠道、SOP、MCP 和 Agent 体验相关能力，但 **Telegram 通道 S1 故障** 说明项目在真实接入场景上仍有明显稳定性压力。  
若后续能尽快收敛高风险 PR，并补上更清晰的配置诊断与 UI 操作闭环，项目健康度会明显提升。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*