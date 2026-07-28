# OpenClaw 生态日报 2026-07-28

> Issues: 37 | PRs: 61 | 覆盖项目: 13 个 | 生成时间: 2026-07-28 00:59 UTC

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

# OpenClaw 项目动态日报｜2026-07-28

## 1. 今日速览
今天 OpenClaw 依然处于高强度迭代期：过去 24 小时共有 **37 条 Issue 更新**、**61 条 PR 更新**，说明项目在持续吸收真实部署反馈并快速修补。  
从议题分布看，讨论重心仍集中在 **会话状态、消息投递、权限/认证、性能与稳定性**，且多数问题都不是“崩溃型”，而是更棘手的**静默错误、路由错乱、消息丢失**。  
PR 侧已有 **25 条进入已合并/关闭状态**，推进速度不弱，但 **本日无新 Release**，意味着不少改动仍处于验证或评审阶段。  
整体判断：项目健康度偏好，但当前是典型的“**功能推进与稳定性修复并行**”阶段，维护压力较高。  

---

## 2. 版本发布
**今日无新版本发布。**  
（因此本日报不展开版本更新与迁移说明。）

---

## 3. 项目进展
今天最有代表性的推进，集中在以下几个方向：

- **会话感知能力补齐**  
  - PR [`#114835`](https://github.com/openclaw/openclaw/pull/114835)：为模型暴露“watched-session awareness”，直接回应 Issue [`#114797`](https://github.com/openclaw/openclaw/issues/114797)。  
  - 这类改动会改善模型对“可读会话范围”的理解，属于典型的产品语义补强。

- **消息投递与交互一致性**  
  - PR [`#114816`](https://github.com/openclaw/openclaw/pull/114816)：修复 TUI 场景下的丢回复、会话串线、终端输入安全问题。  
  - PR [`#114812`](https://github.com/openclaw/openclaw/pull/114812)：让 ClickClack 侧边栏跟随宿主主题。  
  - PR [`#114822`](https://github.com/openclaw/openclaw/pull/114822)：修复 Telegram 预览里未修改回复闪现的问题。  
  - 这些 PR 说明团队正在系统性处理“消息展示—修改—投递”的一致性问题。

- **认证与入门流程修复**  
  - PR [`#114823`](https://github.com/openclaw/openclaw/pull/114823)：在写入 agent 状态前验证 provider 配置。  
  - PR [`#114825`](https://github.com/openclaw/openclaw/pull/114825)：修复 Google 无效 API key 的认证分类。  
  - PR [`#114282`](https://github.com/openclaw/openclaw/pull/114282)：支持 GitHub Copilot fine-grained token。  
  - 这类改动直接降低“配置看似成功、实际运行失败”的概率。

- **性能与系统稳定性**
  - PR [`#114820`](https://github.com/openclaw/openclaw/pull/114820)：防止 cron 完成后重启重复执行。  
  - PR [`#114829`](https://github.com/openclaw/openclaw/pull/114829)：减少 sessions.catalog.list 的整库克隆开销。  
  - PR [`#114833`](https://github.com/openclaw/openclaw/pull/114833)：缓存 Claude 本地会话扫描。  
  - PR [`#114777`](https://github.com/openclaw/openclaw/pull/114777)：复用 SQLite prepared statements。  
  - 这些修复表明项目正在从“功能正确”走向“高负载可用”。

- **架构与扩展性**
  - PR [`#114817`](https://github.com/openclaw/openclaw/pull/114817)：从 owner fragments 派生 gateway schema registry。  
  - PR [`#114819`](https://github.com/openclaw/openclaw/pull/114819)：引入 provenance-gated memory。  
  - PR [`#114830`](https://github.com/openclaw/openclaw/pull/114830)：限制 native Codex QA sandbox 影响生产。  
  - 说明项目在做更深层的边界收敛与架构治理。

**整体看，今日 25 条已处理 PR 代表项目在多个子系统同时“补洞 + 提质”，推进面很广，但也意味着回归面不小。**

---

## 4. 社区热点
今日最活跃的话题，几乎都围绕“**静默失败**”和“**状态一致性**”。

### 评论最活跃的 Issues
- Issue [`#114690`](https://github.com/openclaw/openclaw/issues/114690)  
  Discord 源回复在 native Codex compaction 后可能被重复发送，体现出“同一 turn 内 compaction 之后状态重复执行”的风险。  
  **诉求核心：** 防止已成功投递的消息在上下文压缩后再次触发。

- Issue [`#114653`](https://github.com/openclaw/openclaw/issues/114653)  
  `sessions_send` / `sessions_history` 在 spawned-session 可见性查询中把临时故障和策略拒绝混为一谈。  
  **诉求核心：** 需要可观测性、重试与更精确的错误分类，否则安全策略和基础设施故障无法区分。

- Issue [`#114561`](https://github.com/openclaw/openclaw/issues/114561)  
  Telegram isolated polling ingress 在初次 drain 后遗漏后续更新。  
  **诉求核心：** 解决消息漏派发，避免“看似正常、实际丢消息”。

- Issue [`#114402`](https://github.com/openclaw/openclaw/issues/114402)  
  tool-result-truncation 导致 system prompt 片段泄漏到模型输出。  
  **诉求核心：** prompt 组装要更严格，否则存在信息泄露与行为污染风险。

### 讨论背后的共同诉求
- 用户不只要“能跑”，更要 **可预期、可追踪、可恢复**。  
- 真实部署场景高度依赖 Discord / Telegram / Slack / Workboard / Codex / TUI 等多入口，任何一个环节的静默失败都会被放大成“消息丢失”或“会话错乱”。  
- 项目当前的社区反馈表明：**可靠性已经和功能本身一样重要**。

---

## 5. Bug 与稳定性
下面按严重程度整理今日最值得关注的 Bug/回归问题，并标注是否已有 fix PR。

### P1 / 高严重度
1. Issue [`#114774`](https://github.com/openclaw/openclaw/issues/114774)  
   **用户消息 body 在长工具循环中间歇丢失**，属于明显的 session-state + message-loss 问题。  
   - 影响：模型能看到内部上下文块，却丢失原始用户正文。  
   - Fix PR：**未见对应 PR**。

2. Issue [`#114612`](https://github.com/openclaw/openclaw/issues/114612)  
   **SQLite 内存表无保留策略，可能持续膨胀并填满磁盘。**  
   - 影响：长期运行实例的容量风险。  
   - Fix PR：**未见对应 PR**。

3. Issue [`#114724`](https://github.com/openclaw/openclaw/issues/114724)  
   **legacy workboard claim 没有 ownerId 时会永久锁卡。**  
   - 影响：会话/任务卡不可恢复，属于状态锁死。  
   - Fix PR：**未见对应 PR**。

4. Issue [`#114758`](https://github.com/openclaw/openclaw/issues/114758)  
   **compaction/contextPruning 默认值不一致，导致 prepared-runtime exact-config 解析失败。**  
   - 影响：直接阻断运行配置恢复。  
   - Fix PR：**未见对应 PR**。

5. Issue [`#114784`](https://github.com/openclaw/openclaw/issues/114784)  
   **Google 400 “API key not valid” 未被识别为 auth error，导致 fallback 停在 Google。**  
   - 影响：认证失败后无法正确降级。  
   - Fix PR：**有**，PR [`#114825`](https://github.com/openclaw/openclaw/pull/114825)。

### P2 / 中高严重度
6. Issue [`#114690`](https://github.com/openclaw/openclaw/issues/114690)  
   **Discord 成功回复在 native Codex compaction 后可能重复发送。**  
   - 影响：消息重复，用户侧体验和幂等性受损。  
   - Fix PR：**未见对应 PR**。

7. Issue [`#114653`](https://github.com/openclaw/openclaw/issues/114653)  
   **spawned-session 可见性查询把临时故障误判为策略拒绝。**  
   - 影响：安全与可用性边界被混淆。  
   - Fix PR：**未见对应 PR**。

8. Issue [`#114805`](https://github.com/openclaw/openclaw/issues/114805)  
   **`/hooks/agent deliver:true` 向 Discord 静默失败。**  
   - 影响：外部系统以为已交付，实际上未投递。  
   - Fix PR：**未见对应 PR**。

9. Issue [`#114826`](https://github.com/openclaw/openclaw/issues/114826)  
   **Zod 生成的未锚定正则破坏 llama.cpp tool calling。**  
   - 影响：工具调用能力失效。  
   - Fix PR：**未见对应 PR**。

### 已关闭但说明问题已被纳入修复闭环
- Issue [`#114561`](https://github.com/openclaw/openclaw/issues/114561)：Telegram isolate polling 丢消息，已关闭。  
- Issue [`#114796`](https://github.com/openclaw/openclaw/issues/114796)：Telegram stop timeout 太短导致长轮询问题，已关闭。  
- Issue [`#114753`](https://github.com/openclaw/openclaw/issues/114753)：Code Mode 隐藏政策要求的直接消息投递，已关闭。  
- Issue [`#114733`](https://github.com/openclaw/openclaw/issues/114733)：Codex catalog conversation 路由错误，已关闭。  
- Issue [`#114729`](https://github.com/openclaw/openclaw/issues/114729)：catalog continuation 把草稿发进错误会话，已关闭。  

**结论：** 今日稳定性问题的主轴不是“崩溃”，而是 **消息投递、会话路由、compaction、fallback、权限判定** 这些高复杂度状态问题。

---

## 6. 功能请求与路线图信号
今天的功能需求呈现出很清晰的路线图信号：**让模型更懂上下文、让插件更好接入、让 UI 更一致、让 memory 更可控。**

### 值得关注的新增需求
- Issue [`#114797`](https://github.com/openclaw/openclaw/issues/114797)  
  **让模型感知 watched-session 权限与可读范围。**  
  - 路线图信号：非常强。对应 PR [`#114835`](https://github.com/openclaw/openclaw/pull/114835) 已出现，说明很可能进入下一版。

- Issue [`#114795`](https://github.com/openclaw/openclaw/issues/114795)  
  **ClickClack 讨论侧边栏跟随 Control UI 主题。**  
  - 路线图信号：中强。对应 PR [`#114812`](https://github.com/openclaw/openclaw/pull/114812) 已开放。

- Issue [`#114685`](https://github.com/openclaw/openclaw/issues/114685)  
  **讨论频道改成可读 session title，而不是 hash。**  
  - 路线图信号：已在推进，相关 PR [`#114813`](https://github.com/openclaw/openclaw/pull/114813) 已关闭，说明该方向大概率会落地。

- Issue [`#114448`](https://github.com/openclaw/openclaw/issues/114448)  
  **memory_search 希望改用 node CLI channel，而非 HTTP baseUrl。**  
  - 路线图信号：偏基础设施型，体现用户对环境独立性的诉求，但目前还不像已排入即将发布的版本。

- Issue [`#114782`](https://github.com/openclaw/openclaw/issues/114782)  
  **manifest-first host contribution bundles。**  
  - 路线图信号：更偏平台化与插件生态设计，可能进入中长期规划。

- Issue [`#114819`](https://github.com/openclaw/openclaw/issues/114819)  
  **provenance-gated memory + dreaming 默认开启。**  
  - 路线图信号：功能与治理双重升级，且已有 PR [`#114819`](https://github.com/openclaw/openclaw/pull/114819) 对应。

### 更可能进入下一版本的方向
综合 Issue 与 PR 同步出现的情况，下一版更可能优先覆盖：
1. **会话可见性 / 记忆 / 语义提示**：[`#114797`](https://github.com/openclaw/openclaw/issues/114797)、[`#114835`](https://github.com/openclaw/openclaw/pull/114835)  
2. **消息投递可靠性**：[`#114805`](https://github.com/openclaw/openclaw/issues/114805)、[`#114822`](https://github.com/openclaw/openclaw/pull/114822)  
3. **认证与 onboarding**：[`#114784`](https://github.com/openclaw/openclaw/issues/114784)、[`#114825`](https://github.com/openclaw/openclaw/pull/114825)、[`#114823`](https://github.com/openclaw/openclaw/pull/114823)  
4. **性能与可扩展性**：[`#114829`](https://github.com/openclaw/openclaw/pull/114829)、[`#114833`](https://github.com/openclaw/openclaw/pull/114833)、[`#114777`](https://github.com/openclaw/openclaw/pull/114777)

---

## 7. 用户反馈摘要
从今日 Issue 内容看，真实用户痛点非常集中：

- **“我以为发出去了，但其实没发出去”**  
  - 典型场景：Discord、Telegram、Slack、hooks、TUI。  
  - 对应问题：消息静默丢失、预览闪现、重复发送、延迟路由错乱。  
  - 反馈特征：用户最不能接受的是“表面成功，实际失败”。

- **“同一个会话在不同阶段表现不一致”**  
  - 典型场景：Codex compaction、catalog continuation、startup 路由切换、Workboard 编辑。  
  - 对应问题：会话被错误重定向、active session 被解绑、旧状态残留。  
  - 反馈特征：用户希望状态机更稳定，别让 UI 和后台各说各话。

- **“长时间运行后开始慢、开始漏、开始乱”**  
  - 典型场景：长工具循环、heartbeat + scheduled embedded runs、sessions.catalog.list、SQLite/内存增长。  
  - 对应问题：性能退化、内存膨胀、重复扫描、缓存与生命周期管理不足。  
  - 反馈特征：项目正在从“实验可用”进入“生产可用”，压力开始暴露。

- **“权限和错误分类需要更准”**  
  - 典型场景：spawned-session visibility、Google auth fallback、alsoAllow policy、legacy claim owner 识别。  
  - 对应问题：把临时故障当拒绝、把认证失败当普通错误、把合法能力裁掉。  
  - 反馈特征：用户希望系统能更聪明地判断“能不能做”和“为什么不能做”。

总体来看，用户对 OpenClaw 的**扩展性、自动化能力、跨平台入口**是认可的，但对 **静默失败、状态漂移、可恢复性不足** 仍有明显不满。

---

## 8. 待处理积压
以下是今天最值得维护者优先盯住的待处理项。  
说明：仅凭本日报数据，无法严格判断“积压时长”，但这些条目都处于 **高优先级、影响真实使用、且仍需维护者介入** 的状态。

### 高优先级未闭环 Issues
- [`#114612`](https://github.com/openclaw/openclaw/issues/114612) — SQLite 无界增长，磁盘风险
- [`#114724`](https://github.com/openclaw/openclaw/issues/114724) — legacy workboard claim 永久锁卡
- [`#114774`](https://github.com/openclaw/openclaw/issues/114774) — 长工具循环丢用户消息正文
- [`#114758`](https://github.com/openclaw/openclaw/issues/114758) — compaction 默认值导致配置解析失败
- [`#114690`](https://github.com/openclaw/openclaw/issues/114690) — Discord 回复重复发送
- [`#114653`](https://github.com/openclaw/openclaw/issues/114653) — 可见性查询把临时故障当策略拒绝
- [`#114805`](https://github.com/openclaw/openclaw/issues/114805) — `/hooks/agent deliver:true` 静默不投递
- [`#114826`](https://github.com/openclaw/openclaw/issues/114826) — llama.cpp tool calling 受 Zod regex 影响
- [`#114784`](https://github.com/openclaw/openclaw/issues/114784) — Google 无效 key 误分类

### 需要维护者评审的 PR 堆积
- [`#114835`](https://github.com/openclaw/openclaw/pull/114835) — watched-session awareness
- [`#114823`](https://github.com/openclaw/openclaw/pull/114823) — onboarding 前置验证
- [`#114820`](https://github.com/openclaw/openclaw/pull/114820) — cron 防重复执行
- [`#114822`](https://github.com/openclaw/openclaw/pull/114822) — Telegram 预览修复
- [`#114830`](https://github.com/openclaw/openclaw/pull/114830) — Codex QA sandbox 边界
- [`#114829`](https://github.com/openclaw/openclaw/pull/114829) — sessions.catalog.list 性能优化
- [`#114833`](https://github.com/openclaw/openclaw/pull/114833) — Claude 会话扫描 memoize
- [`#114777`](https://github.com/openclaw/openclaw/pull/114777) — SQLite prepared statement 复用
- [`#114821`](https://github.com/openclaw/openclaw/pull/114821) — credential process-tree timeout 去抖
- [`#114625`](https://github.com/openclaw/openclaw/pull/114625) — Nextcloud Talk room kind lookup 重试

---

### 总体结论
OpenClaw 今天的状态可以概括为：**高活跃、高修复强度、但稳定性议题仍在密集暴露**。  
项目已经不只是“在加功能”，而是在进入更成熟产品阶段时，集中补齐 **幂等性、可观测性、状态一致性、权限判定、性能边界**。  
如果接下来能把这些 P1/P2 的静默失败问题持续收敛，OpenClaw 的产品可信度会显著提升。

---

## 横向生态对比

以下是基于你提供的 2026-07-28 各项目动态形成的**横向对比分析报告**。我尽量用一致口径做了归纳，便于技术决策者快速扫描。

---

# 1) 生态全景

过去 24 小时，个人 AI 助手 / 自主智能体开源生态整体呈现出三个特征：**高并发迭代、强可靠性修复、平台化扩张并行**。  
多数项目已经不再只卷“能不能跑”，而是在集中处理**消息投递、会话状态、权限鉴权、跨平台兼容、工具链正确性**等生产级问题。  
同时，技能市场、插件生态、MCP/Provider 接入、WebUI 可观测性等需求明显增多，说明生态正在从“单体 agent”向“可组合平台”演进。  
整体看，行业已进入**从功能验证期转向质量治理期**的阶段，但不同项目所处成熟度差异仍然很大。

---

# 2) 各项目活跃度对比

> 说明：表中“Release”指过去 24 小时是否有新版本发布；“健康度”是基于活跃度、问题暴露、闭环速度与发布状态的综合判断。

| 项目 | Issues 更新 | PR 更新 | Release | 健康度评估 |
|---|---:|---:|---|---|
| OpenClaw | 37 | 61 | 无 | **高活跃，高修复压力；典型平台级快速迭代期** |
| NanoBot | 2 | 21 | 无 | **中高活跃，修复与新功能并进，审查压力中等** |
| Hermes Agent | 50 | 50 | 无 | **极高活跃，但稳定性风险偏高，处于强迭代期** |
| PicoClaw | 0 | 0 | 无 | **无活动，低可见度** |
| NanoClaw | 0 | 3 | 无 | **低活跃，偏核心链路修复，等待合并落地** |
| NullClaw | 0 | 0 | 无 | **无活动，低可见度** |
| IronClaw | 23 | 29 | **有，v1.0.0** | **已进入稳定版收口阶段，质量治理优先** |
| LobsterAI | 4 | 5 | 无 | **中等活跃，但存在高危数据/兼容问题** |
| TinyClaw | 0 | 0 | 无 | **无活动，低可见度** |
| Moltis | 0 | 1 | 无 | **低活跃，偏基础设施建设期** |
| CoPaw | 9 | 12 | 无 | **高需求驱动，但 PR 堆积明显，review 压力上升** |
| ZeptoClaw | 0 | 0 | 无 | **无活动，低可见度** |
| ZeroClaw | 15 | 35 | 无 | **高活跃高并行修复，质量治理优先** |

### 快速分层
- **最活跃梯队**：Hermes Agent、OpenClaw、ZeroClaw、CoPaw、IronClaw  
- **中等活跃梯队**：NanoBot、LobsterAI  
- **低活跃 / 工程推进型**：NanoClaw、Moltis  
- **无活动梯队**：PicoClaw、NullClaw、TinyClaw、ZeptoClaw

---

# 3) OpenClaw 在生态中的定位

## 定位判断
OpenClaw 是当前生态里最典型的**“平台级、强消息路由、多入口协同”**项目之一。  
它不是只做单一对话或单一自动化场景，而是在同时覆盖：
- 多渠道投递：Discord / Telegram / Slack / TUI / hooks / Codex / Workboard
- 会话与上下文治理：compaction、catalog、watched-session awareness
- 权限与认证：provider 配置、token、auth 分类、fallback
- 性能与稳定性：缓存、prepared statement、cron 防重放、整库克隆优化

## 相比同类的优势
1. **问题面最广，说明真实部署面也更广**  
   这类项目往往是“先在生产里被打磨”的，OpenClaw 的 issue 主题高度贴近真实系统行为，而不是纯接口层讨论。

2. **技术治理力度强**  
   今日大量 PR 都围绕“静默失败、状态一致性、幂等性、错误分类”展开，说明它已经进入成熟产品的工程治理阶段。

3. **社区反馈质量高**  
   用户讨论不再是简单的“能不能加功能”，而是直接要求“可预期、可追踪、可恢复”。

## 与其他项目的技术路线差异
- **相比 Hermes Agent**：OpenClaw 更偏“生态编排 / 多渠道系统”，Hermes 更偏“桌面端 + 工具链 + 跨平台 agent runtime”。
- **相比 IronClaw**：OpenClaw 仍处于高强度迭代期；IronClaw 已完成 1.0.0 发布，更像进入稳定版后的收口治理。
- **相比 NanoBot / CoPaw**：OpenClaw 的系统面更复杂，更强调可靠性和路由一致性，而后两者更偏多代理工作台、技能生态和可配置性。
- **相比 ZeroClaw**：ZeroClaw 更强调安全、兼容、迁移、CI 质量；OpenClaw 则更强调多入口消息与会话状态管理。

## 社区规模对比
从今天的更新体量看，OpenClaw 处于**第一梯队**：  
- Issue 更新 37、PR 更新 61，且已合并/关闭 PR 多达 25 条，说明社区反馈与维护闭环都很强。  
- 相比 Hermes（50/50）更像“广覆盖”；相比 IronClaw 更像“持续重构中的大平台”；相比 NanoClaw / Moltis 则明显更成熟、更复杂。  
**结论：OpenClaw 是生态中偏“中大型平台型项目”的代表。**

---

# 4) 共同关注的技术方向

下面是今天多个项目共同涌现的技术方向：

## 1. 消息投递可靠性与会话路由一致性
**涉及项目**：OpenClaw、Hermes Agent、IronClaw、NanoClaw、ZeroClaw  
**具体诉求**：
- 避免消息发错 session
- 避免静默丢消息
- 避免 compaction / 切页 / 重连后状态漂移
- 保证“看起来已发送”与“实际已投递”一致

## 2. 权限、认证与安全边界
**涉及项目**：OpenClaw、Hermes Agent、IronClaw、CoPaw、ZeroClaw、LobsterAI  
**具体诉求**：
- token / OAuth / profile 存储更稳
- 错误分类更准确
- 默认 fail-closed
- 不把临时故障误判为策略拒绝
- 防 SSRF、路径穿越、脱敏失效、模型可调用工具暴露

## 3. 长会话、compaction、记忆与上下文治理
**涉及项目**：OpenClaw、NanoBot、Hermes Agent、IronClaw、CoPaw  
**具体诉求**：
- 记忆/上下文不要污染
- compaction 后不重复执行
- session 恢复后状态一致
- Dream / memory / approval 的边界更明确

## 4. 多代理、子代理、技能生态
**涉及项目**：NanoBot、CoPaw、Moltis、IronClaw、OpenClaw  
**具体诉求**：
- 子代理隔离
- approval_level / policy 继承
- skill / provider / plugin 更易扩展
- marketplace / SDK / host integration 更标准化

## 5. 跨平台兼容与桌面体验
**涉及项目**：Hermes Agent、LobsterAI、IronClaw、ZeroClaw  
**具体诉求**：
- Windows/macOS 兼容
- shell / path / locale / driver 一致性
- 桌面 GUI 路由正确
- 流式输出和编辑器交互稳定

## 6. 可观测性与用户反馈闭环
**涉及项目**：Moltis、IronClaw、OpenClaw、ZeroClaw  
**具体诉求**：
- instrumentation / telemetry
- in-app feedback
- 更明确的状态与诊断信息
- 更好的错误解释与恢复路径

---

# 5) 差异化定位分析

## A. 平台型消息与会话编排
**代表项目**：OpenClaw  
**特点**：
- 多入口、多渠道、多状态机并行
- 强调消息投递与会话一致性
- 更像“agent orchestration platform”

**适合用户**：  
需要跨 Discord/Telegram/Slack/TUI/hook/codex 的团队和平台开发者。

---

## B. 桌面端 + 跨平台 agent runtime
**代表项目**：Hermes Agent、IronClaw  
**特点**：
- GUI、桌面会话、工具链、系统集成更强
- 对 Windows/macOS/remote mode 更敏感
- 更注重可用性和用户交互闭环

**适合用户**：  
重桌面交互、强调本地执行与多平台一致性的用户。

---

## C. 多代理工作台 / 技能生态 / 可配置生产力平台
**代表项目**：NanoBot、CoPaw  
**特点**：
- 子代理、技能市场、provider 扩展、read-only session
- 强调配置管理、隔离、审批继承、生态插件化
- 更像“AI 工作台”而非单一 agent

**适合用户**：  
希望构建多代理工作流、技能市场或企业内部助手平台的团队。

---

## D. 稳定性与安全优先的工程治理型项目
**代表项目**：ZeroClaw、LobsterAI、Moltis  
**特点**：
- 强调 CI、迁移、权限、Windows/安全、可观测性
- 功能推进相对谨慎
- 更像“把底座做稳”

**适合用户**：  
对安全、兼容、测试和可运营性要求高的企业场景。

---

## E. 低活跃或待观察项目
**代表项目**：PicoClaw、NullClaw、TinyClaw、ZeptoClaw  
**特点**：
- 今日无活动
- 生态信号不足
- 当前更适合作为观察对象，而非主判断样本

---

# 6) 社区热度与成熟度

## 快速迭代阶段
这些项目今天的特征是：**issue/PR 活跃、修复密集、稳定性压力大**。
- **OpenClaw**
- **Hermes Agent**
- **ZeroClaw**
- **CoPaw**
- **LobsterAI**

其中：
- OpenClaw / Hermes / ZeroClaw：更像“高活跃平台型快速迭代”
- CoPaw：需求很明确，但 review 吞吐偏慢
- LobsterAI：活跃不算最高，但存在较敏感的稳定性/数据问题

## 质量巩固阶段
这些项目更像是在做**收口、兼容、修复、底座治理**：
- **IronClaw**：已发 1.0.0，明显进入稳定版收口
- **NanoClaw**：开放 PR 少，重点在核心链路修复
- **Moltis**：偏观测与反馈基础设施，生态噪声低
- **NanoBot**：修复和产品能力并进，处于成熟化过渡阶段

## 低噪声/观察期
- **PicoClaw、NullClaw、TinyClaw、ZeptoClaw**  
目前缺少足够活动信号，暂不宜做强趋势判断。

---

# 7) 值得关注的趋势信号

## 1. “静默失败”正在成为最高优先级问题
多项目都在修复：
- 消息实际未投递
- 会话切错
- compaction 后重复执行
- 预检只给 reaction 不给文本
- 认证失败被误分类

**对开发者的启示**：  
AI 智能体的竞争焦点，已经从“是否有能力”转向“是否能被信任”。

---

## 2. 状态机治理比模型能力更关键
今天大量问题都不是模型本身，而是：
- session 生命周期
- 记忆/审批继承
- 路由切换
- fallback / recovery
- 运行时重试与幂等

**启示**：  
做 agent 不能只看 prompt 和 model；真正的产品力来自**状态系统设计**。

---

## 3. 多代理/技能生态正在平台化
出现频率很高的需求包括：
- skills marketplace
- provider 内置化
- host integration / SDK extension points
- custom MCP server
- sub-agent isolation

**启示**：  
开源 agent 项目正在从“单体助手”向“可扩展平台”演进，生态接口设计会越来越重要。

---

## 4. 企业与生产环境开始主导需求
Windows/macOS 兼容、OAuth、SSRF、防泄漏、可审计、feedback widget、release tracker 等都说明：
- 用户不再只是试用者
- 他们开始把这些项目放进实际工作流

**启示**：  
真正决定项目生命力的，不是 demo 效果，而是**生产可用性和运维可控性**。

---

## 5. 可观测性与反馈闭环正在上升为标配
像 Moltis 的 instrumentation、IronClaw 的 WebUI feedback、OpenClaw 的错误分类改进，都指向同一件事：  
**agent 必须能解释自己、暴露状态、支持诊断。**

**启示**：  
未来优秀的 AI 助手框架，不只是“会做事”，还要“能说清楚自己做了什么、为什么失败、下一步怎么恢复”。

---

如果你愿意，我可以继续把这份报告再压缩成两种版本之一：
1. **管理层 1 页摘要版**  
2. **研发团队晨会版（更偏行动项）**

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-07-28）

## 1. 今日速览
NanoBot 过去 24 小时保持了**较高的开发活跃度**：共更新 2 个 Issue、21 个 PR，且没有新版本发布。  
从 PR 结构看，项目重心同时覆盖了 **WebUI、记忆/会话存储、Dream 模式、渠道接入、文档与稳定性修复**，说明当前仍处于高频迭代期。  
已关闭/合并的 PR 有 11 个，占比超过一半，表明维护者在持续收敛问题并推动功能落地。  
不过，仍有多项高优先级修复与新功能处于开放状态，短期内项目呈现“**推进快、并发高、待合并事项也多**”的典型特征。

---

## 3. 项目进展
今日已关闭/合并的 PR 主要集中在以下方向，说明项目在“体验修复 + 核心能力补强”两条线上同步推进：

- **Git 存储层修复**
  - [#5124 fix(gitstore): return real git object ids instead of hex-of-hex](https://github.com/HKUDS/nanobot/pull/5124)  
    修正了 Git 对象 ID 被二次 hex 编码的问题，直接影响记忆/会话对象追踪准确性，是底层可靠性修复。
  - 影响：降低存储层 ID 错配风险，属于基础设施级修复。

- **WebUI 交互稳定性**
  - [#5121 fix(webui): prevent composer resize scroll jitter](https://github.com/HKUDS/nanobot/pull/5121)  
    解决输入框 resize 引发的滚动抖动，提升对话编辑与完成追踪体验。
  - [#5119 fix(webui): soften model selector emphasis](https://github.com/HKUDS/nanobot/pull/5119)  
    调整模型选择器视觉强调，修复样式 token 问题。
  - [#5113 fix(webui): stabilize repeated model preset rows](https://github.com/HKUDS/nanobot/pull/5113)  
    修复重复 preset 行的 React key 问题，避免重复/错位渲染。
  - 影响：WebUI 体验更稳定，降低前端状态错乱风险。

- **记忆 / Dream 模式修复**
  - [#5114 fix(memory): preserve Dream input integrity](https://github.com/HKUDS/nanobot/pull/5114)  
    保证 Dream 输入完整性，并允许写回规范记忆文件。
  - [#5107 feat(memory): restore Dream model preset override](https://github.com/HKUDS/nanobot/pull/5107)  
    恢复 Dream 模式的模型预设覆盖能力，减少运行时配置偏差。
  - 影响：Dream 运行链路更可控，记忆系统与调度逻辑更一致。

- **文档与发布可发现性**
  - [#5123 docs: improve README landing page](https://github.com/HKUDS/nanobot/pull/5123)
  - [#5109 docs: improve README discoverability](https://github.com/HKUDS/nanobot/pull/5109)  
    这类 PR 虽不改变核心逻辑，但显著提升项目首屏表达、使用场景理解和贡献路径可见性。

- **高优先级功能/平台扩展仍在推进**
  - [#5111 feat(sdk): add host integration extension points](https://github.com/HKUDS/nanobot/pull/5111)
  - [#5115 feat(channels): add LINE Messaging API channel](https://github.com/HKUDS/nanobot/pull/5115)
  - [#5116 feat(webui): add skills.sh marketplace and skill management](https://github.com/HKUDS/nanobot/pull/5116)
  - [#5112 feat(webui): expose Dream runs as read-only sessions](https://github.com/HKUDS/nanobot/pull/5112)
  - [#5110 feat(config): make status actionable for agent readiness](https://github.com/HKUDS/nanobot/pull/5110)

**整体判断：**  
今日的已完成工作更多是在“**修正底座、稳定交互、补齐记忆与 Dream 能力**”，属于对产品成熟度有直接贡献的变更。若这些高优先级开放 PR 后续顺利合并，NanoBot 的“可用性、可观测性、可扩展性”都会继续上台阶。

---

## 4. 社区热点
> 由于提供的数据中，PR 未给出明确评论数/点赞数，以下以**可确认的互动量**和**议题影响面**综合判断。

- **最活跃讨论点：#5125**
  - [#5125 Decouple isolated (context isolation) from message() delivery suppression](https://github.com/HKUDS/nanobot/issues/5125)  
    这是今日唯一可确认有评论的 Issue（1 条评论），讨论集中在 `isolated` 参数的语义拆分：  
    1) 上下文隔离；2) 消息投递抑制。  
    背后诉求是把“运行环境隔离”和“消息显示策略”解耦，避免单个参数承担过多职责，提升 API 可理解性与可维护性。

- **高关注功能面：技能市场与 WebUI 扩展**
  - [#5116 feat(webui): add skills.sh marketplace and skill management](https://github.com/HKUDS/nanobot/pull/5116)  
    面向技能发现、安装与管理的工作流，直接关系到 NanoBot 的“可扩展生态”。
  - [#5112 feat(webui): expose Dream runs as read-only sessions](https://github.com/HKUDS/nanobot/pull/5112)  
    将 Dream 运行结果以只读会话方式暴露，利于审计、复盘和用户理解。
  - [#5115 feat(channels): add LINE Messaging API channel](https://github.com/HKUDS/nanobot/pull/5115)  
    代表渠道生态扩张，面向日本、台湾、泰国、印尼等市场，具有明确的场景牵引。

- **偏“高价值修复”的热点**
  - [#5118 [bug] Session consolidation drops uploaded media paths...](https://github.com/HKUDS/nanobot/issues/5118)  
    直接关系到上传文件能否在归档后被找回，属于用户资产完整性问题。
  - [#5126 fix(gitstore): return real git object ids instead of hex-of-hex](https://github.com/HKUDS/nanobot/pull/5126)  
    指向底层对象标识错误，影响范围通常比表面 UI 问题更大。

---

## 5. Bug 与稳定性
按严重程度与潜在影响排序如下：

1. **高严重度：文件状态相关安全问题**
   - [#5104 fix: the file_state in file_state.py](https://github.com/HKUDS/nanobot/pull/5104)  
     已关闭。描述中明确标注为 **HIGH severity security finding**，属于应优先处置的安全修复。  
     **状态：已有修复 PR，且已关闭。**

2. **高影响：上传媒体路径在归档/整合后丢失，文件不可恢复**
   - [#5118 [bug] Session consolidation drops uploaded media paths...](https://github.com/HKUDS/nanobot/issues/5118)  
     影响用户上传的附件在 session consolidation 后可能不可恢复，直接触及数据可用性与信任。  
     **状态：已有对应修复方向 PR [#5120](https://github.com/HKUDS/nanobot/pull/5120)（开放中）。**

3. **中高影响：GitStore 返回错误对象 ID**
   - [#5126 fix(gitstore): return real git object ids instead of hex-of-hex](https://github.com/HKUDS/nanobot/pull/5126)  
     这类 bug 会影响对象引用、追踪与存储一致性，属于底层正确性问题。  
     **状态：已有修复 PR；同题还有已关闭的 [#5124](https://github.com/HKUDS/nanobot/pull/5124)。**

4. **中等影响：无效 idle-compaction 时间戳处理**
   - [#5117 fix(session): tolerate invalid idle-compaction timestamps](https://github.com/HKUDS/nanobot/pull/5117)  
     当前仍开放。问题集中在持久化时间戳格式不合法时的容错与 aware/naive datetime 混用。  
     **状态：已有 fix PR，但尚未关闭。**

5. **中等影响：`isolated` 参数语义耦合**
   - [#5125 Decouple isolated (context isolation) from message() delivery suppression](https://github.com/HKUDS/nanobot/issues/5125)  
     当前已关闭，但反映出 API 设计层面存在语义混杂，可能造成误用。  
     **状态：问题已关闭，具体修复路径需关注后续实现。**

---

## 6. 功能请求与路线图信号
今日新增/活跃的需求主要表现为“平台化”和“可扩展性”两条路线：

- **技能生态/市场化方向**
  - [#5116 feat(webui): add skills.sh marketplace and skill management](https://github.com/HKUDS/nanobot/pull/5116)  
    这是一个明确的产品扩展信号：把 NanoBot 从“单点 AI 助手”推进到“技能安装与分发平台”。  
    若后续体验与安全策略完善，这类能力很可能进入下一版本重点。

- **渠道扩展方向**
  - [#5115 feat(channels): add LINE Messaging API channel](https://github.com/HKUDS/nanobot/pull/5115)  
    说明项目希望继续扩大多渠道接入能力。LINE 在东亚/东南亚有明确用户基础，若合并，对国际化非常有帮助。

- **更强的运行可观测与状态管理**
  - [#5110 feat(config): make status actionable for agent readiness](https://github.com/HKUDS/nanobot/pull/5110)  
    把 `status` 从“信息展示”升级为“可执行的 readiness 检查”，对部署和排障很有价值。  
    这类功能通常会被运维/自托管用户高度关注。

- **Dream 模式产品化**
  - [#5112 feat(webui): expose Dream runs as read-only sessions](https://github.com/HKUDS/nanobot/pull/5112)  
    体现出项目正在把 Dream 从“内部运行机制”包装成“可审阅、可回放”的用户可见能力。

- **Host integration / SDK 扩展**
  - [#5111 feat(sdk): add host integration extension points](https://github.com/HKUDS/nanobot/pull/5111)  
    这是非常强的路线图信号：项目正向“第三方宿主/插件化集成”迈进，未来可能形成更开放的生态。

**路线图判断：**  
若以可落地性和业务价值看，**skills 市场、SDK 扩展、LINE 渠道、status 可执行化**，都属于下一版本中较可能继续推进的主线。

---

## 7. 用户反馈摘要
从 Issues/PR 题目和描述中，可以提炼出几类真实用户痛点：

- **“我上传的文件不能丢”**
  - [#5118](https://github.com/HKUDS/nanobot/issues/5118)  
    用户非常在意附件路径与归档后可恢复性。这个问题说明 NanoBot 已进入“真实工作流存档”阶段，用户对数据完整性的敏感度很高。

- **“一个参数不要同时承担两个意思”**
  - [#5125](https://github.com/HKUDS/nanobot/issues/5125)  
    对 `isolated` 的反馈不是单纯功能缺失，而是 API 设计语义混乱。用户希望“上下文隔离”和“消息投递抑制”可独立控制。

- **“我希望 UI 行为稳定、可预测”**
  - [#5121](https://github.com/HKUDS/nanobot/pull/5121)
  - [#5113](https://github.com/HKUDS/nanobot/pull/5113)  
    这些 PR 背后的反馈说明，用户对滚动抖动、重复行错乱这类“低级但影响体验”的问题容忍度很低。

- **“Dream / 记忆系统要可控、可追溯”**
  - [#5114](https://github.com/HKUDS/nanobot/pull/5114)
  - [#5107](https://github.com/HKUDS/nanobot/pull/5107)  
    用户不只关心模型能力，也关心运行时上下文是否完整、模型预设是否按预期生效。

- **“部署后要能快速确认环境是否可用”**
  - [#5110](https://github.com/HKUDS/nanobot/pull/5110)  
    这反映出自托管用户对 readiness 和故障排查的需求正在上升。

---

## 8. 待处理积压
严格来说，本次数据里没有“长期沉寂多日”的老 Issue/PR；但以下开放项都属于**高优先级、值得维护者持续盯进展**的待处理事项：

- **高优先级开放 Bug**
  - [#5118](https://github.com/HKUDS/nanobot/issues/5118)  
    归档后附件路径丢失，影响数据恢复能力。

- **开放中的关键修复**
  - [#5126](https://github.com/HKUDS/nanobot/pull/5126)  
    Git 对象 ID 正确性问题，底层影响面较大。
  - [#5117](https://github.com/HKUDS/nanobot/pull/5117)  
    时间戳容错与 session 过期逻辑，属于稳定性关键路径。
  - [#5120](https://github.com/HKUDS/nanobot/pull/5120)  
    与 #5118 直接对应，建议优先推进。

- **高价值新功能，但实现面较大**
  - [#5116](https://github.com/HKUDS/nanobot/pull/5116)  
  - [#5115](https://github.com/HKUDS/nanobot/pull/5115)  
  - [#5112](https://github.com/HKUDS/nanobot/pull/5112)  
  - [#5111](https://github.com/HKUDS/nanobot/pull/5111)  
  这些 PR 代表产品扩张方向，但也通常伴随更多评审与测试成本。

---

### 总体结论
NanoBot 今日表现为**高强度迭代、修复与扩展并进**：  
一方面，多个关键 bug/回归已被修复或正在修复，显示项目在提升成熟度；另一方面，技能市场、渠道扩展、SDK 扩展、Dream 产品化等功能说明项目仍在快速拉大能力边界。  
整体健康度偏正向，但由于开放 PR 数量仍高，建议后续重点关注 **数据完整性、存储正确性、WebUI 稳定性和高优先级安全修复**。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-07-28）

## 1. 今日速览
过去 24 小时，Hermes Agent 维持了**高强度活跃**：Issues 更新 50 条、PR 更新 50 条，但**没有新版本发布**，说明当前重心仍集中在功能打磨、Bug 修复和跨平台兼容性回收。  
从议题分布看，今日新增/活跃问题明显偏向 **Desktop GUI、会话路由、工具链稳定性、Windows/macOS 兼容、鉴权与安全边界**，属于典型的“活跃迭代期”特征。  
同时出现了若干 **P1/P2 级别**问题，尤其是中断失效、长会话死锁、错会话消息投递等，说明项目整体仍在快速推进，但稳定性压力不小。  
综合判断：**项目健康度为“高活跃、强迭代、稳定性风险中等偏高”**。  
- Issues 总体：50 条（新开/活跃 48，关闭 2）  
- PR 总体：50 条（待合并 38，已合并/关闭 12）  
- Releases：0  
- 相关总览链接：  
  - [Issues 列表](https://github.com/NousResearch/hermes-agent/issues)  
  - [PR 列表](https://github.com/NousResearch/hermes-agent/pulls)

---

## 2. 版本发布
今日**无新版本发布**。  
- Releases 页面： [Hermes Agent Releases](https://github.com/NousResearch/hermes-agent/releases)

---

## 3. 项目进展
今日公开可见的已关闭 PR 主要集中在 **桌面交互修复、自动格式化回流、编辑器行为修正**，这类变更虽然偏小，但对产品体验和代码健康都有直接收益。  
可确认的关闭项包括：

- [#73004 fmt(js): `npm run fix` auto-fix](https://github.com/NousResearch/hermes-agent/pull/73004)  
  自动格式化/修复类 PR，说明代码风格与 lint 问题在持续收口。
- [#73003 fix(desktop): zero Tip skipDelayDuration so the hover delay actually sticks](https://github.com/NousResearch/hermes-agent/pull/73003)  
  修正桌面端 Tip 悬停延迟，属于细节体验优化。
- [#72995 fix(desktop): send a message edit when the arrow is clicked](https://github.com/NousResearch/hermes-agent/pull/72995)  
  修复桌面编辑器中发送箭头失效的问题，属于直接影响可用性的 UI 修复。
- [#73002 fmt(js): `npm run fix` auto-fix](https://github.com/NousResearch/hermes-agent/pull/73002)  
  另一条自动格式化回流，表明仓库仍在持续进行自动维护。

**项目整体向前迈进的判断：**  
- 今日至少有 **12 个 PR 完成合并/关闭**，说明维护节奏很快。  
- 目前可见的“已完成”工作偏向 **桌面端体验修补 + 自动化质量回收**，这通常意味着主干正在为后续更大功能变更做清理。  
- 同时待审 PR 数仍多，意味着短期内仍会以“小步快跑”的方式推进。

---

## 4. 社区热点
> 说明：当前数据里 Issues 有评论数，PR 没有完整评论字段，因此“社区热点”主要以**讨论最活跃的 Issues**为主。

### 热点 1：Desktop 会话切换导致消息错投
- [#72971 Desktop GUI: prompt.submit sends to wrong session after session switch while model response is slow](https://github.com/NousResearch/hermes-agent/issues/72971)
- 评论数：3
- 关注点：用户在多个会话间切换时，慢响应场景下消息会进入**错误会话**，这是典型的状态一致性问题。  
- 背后诉求：桌面端需要更强的**会话隔离、消息路由幂等性和 UI 状态同步**。

### 热点 2：Windows 启动性能/技能扫描问题
- [#72970 Windows startup slow: optional skill provenance backfill repeatedly scans active skills](https://github.com/NousResearch/hermes-agent/issues/72970)
- 评论数：3
- 关注点：启动阶段重复扫描技能树，导致 Windows 启动明显变慢。  
- 背后诉求：用户希望 Hermes CLI/桌面端在 Windows 上具备更稳定的启动性能，不要把“可选同步”变成启动阻塞。

### 热点 3：文件修改验证器误判
- [#72884 file-mutation verifier falsely claims target was unchanged after terminal mutation](https://github.com/NousResearch/hermes-agent/issues/72884)
- 评论数：2
- 关注点：工具链验证器对“终端成功修改”识别错误，直接影响 agent 对执行结果的判断。  
- 背后诉求：希望 Hermes 在“动作是否真正生效”上更可信，避免误导后续推理。

### 热点 4：文件工具会吞掉 XML/HTML 样式标签
- [#72797 write_file/execute_code/patch silently strip XML-like tags from content arguments](https://github.com/NousResearch/hermes-agent/issues/72797)
- 评论数：2，👍：1
- 关注点：工具传输层对内容做了不透明处理，导致标签丢失。  
- 背后诉求：用户需要**内容原样传递**，尤其在代码、HTML、XML、配置模板场景下。

### 热点 5：安全与状态边界问题
- [#72989 quoted/ambiguous text can become a permanent model ban without confirmation](https://github.com/NousResearch/hermes-agent/issues/72989)
- [#72910 SSRF guard allows IPv6 special-use destinations](https://github.com/NousResearch/hermes-agent/issues/72910)
- [#72925 Secret redaction should be name-driven, not vendor-prefix-driven](https://github.com/NousResearch/hermes-agent/issues/72925)

这些问题虽然评论少，但显著指向社区对 **安全边界、记忆污染、误操作不可逆后果** 的担忧。  
用户在意的不只是“能跑”，而是“不会误伤、不会泄露、不会把误解写进永久状态”。

---

## 5. Bug 与稳定性
以下按严重程度排序：

### P1 / 高危
1. [#72975 Interrupt/abort silently no-ops when force_close_tcp_sockets() finds 0 sockets](https://github.com/NousResearch/hermes-agent/issues/72975)  
   - 影响：中断表面上成功，实际请求继续挂在网络上，可能持续数分钟。  
   - 风险：**控制面失效**，用户无法可靠停止请求。  
   - 相关 fix PR：**未见直接对应**。

2. [#72940 Agent loop deadlock: LLM response received but not processed](https://github.com/NousResearch/hermes-agent/issues/72940)  
   - 影响：长会话中 agent 收到模型响应，但不再执行工具调用或输出。  
   - 风险：**会话卡死**，属于典型运行时死锁/状态机错误。  
   - 相关 fix PR：**未见直接对应**。

### P2 / 高影响
3. [#72971 Desktop GUI: prompt.submit sends to wrong session after session switch](https://github.com/NousResearch/hermes-agent/issues/72971)  
   - 影响：消息投递到错误会话，属于**数据错路由**。  
   - 相关 fix PR：**未见直接对应**。

4. [#72989 quoted/ambiguous text can become a permanent model ban without confirmation](https://github.com/NousResearch/hermes-agent/issues/72989)  
   - 影响：把歧义/引用内容当成明确指令，写入永久记忆。  
   - 风险：**记忆污染 + 不可逆配置变更**。  
   - 相关 fix PR：**未见直接对应**。

5. [#72925 Secret redaction should be name-driven, not vendor-prefix-driven](https://github.com/NousResearch/hermes-agent/issues/72925)  
   - 影响：凭供应商前缀做脱敏，容易漏掉未知厂商密钥。  
   - 风险：**凭证泄露**。  
   - 相关 fix PR：**未见直接对应**。

6. [#72969 Windows: computer-use status uses cua-driver 0.12.6 but doctor/tool session runs 0.8.3](https://github.com/NousResearch/hermes-agent/issues/72969)  
   - 影响：状态、doctor、实际会话版本不一致。  
   - 风险：**环境漂移/兼容性问题**。  
   - 相关候选 PR：[#73007 fix(computer-use): normalize cua-driver result envelopes](https://github.com/NousResearch/hermes-agent/pull/73007)（**可能相关，但非直接同一问题**）。

### P3 / 中低危但高频
7. [#72797 file tools strip XML-like tags](https://github.com/NousResearch/hermes-agent/issues/72797)  
8. [#72884 verifier false claims after terminal mutation](https://github.com/NousResearch/hermes-agent/issues/72884)  
9. [#72981 Managed Cloud Honcho dependency install permission denied](https://github.com/NousResearch/hermes-agent/issues/72981)  
10. [#72927 `hermes doctor` false negative for Docker daemon](https://github.com/NousResearch/hermes-agent/issues/72927)  
11. [#72944 macOS runtime and canonical-suite portability failures](https://github.com/NousResearch/hermes-agent/issues/72944)  

### 安全边界类
- [#72910 SSRF guard allows IPv6 special-use destinations](https://github.com/NousResearch/hermes-agent/issues/72910)  
- [#72925 Secret redaction should be name-driven, not vendor-prefix-driven](https://github.com/NousResearch/hermes-agent/issues/72925)  

**稳定性判断：**  
今日暴露的问题不是“单点故障”，而是集中反映出：  
- 会话状态管理仍脆弱  
- 工具层内容传输与验证链路存在误判  
- Windows/桌面端兼容问题仍较集中  
- 安全边界（SSRF、脱敏、记忆写入）仍需加强

---

## 6. 功能请求与路线图信号
今日新增/活跃的功能诉求，比较清晰地指向以下几个方向：

### 1) 多会话/多 GUI 实例的状态同步
- [#72948 Sync Pinned Sessions Amid Multiple GUI Apps (Mac/Windows)](https://github.com/NousResearch/hermes-agent/issues/72948)
- 诉求：远程 gateway 场景下，希望 Mac/Windows GUI 的 pinned sessions 同步。  
- 路线图信号：如果 Hermes 继续强化 remote-gateway + 多端体验，这类需求值得纳入。

### 2) Gemini 企业网关兼容
- [#72952 Support Gemini-native enterprise gateways with custom base URL and auth header](https://github.com/NousResearch/hermes-agent/issues/72952)
- 诉求：支持自定义 `/v1beta` base URL 和 auth header。  
- 路线图信号：这是较典型的企业集成需求，若 Hermes 想扩大私有化部署覆盖面，优先级会逐渐上升。

### 3) 插件输出可见性增强
- [#72854 Plugin Output Visibility in Desktop UI — Allow Custom Output Formats per Plugin](https://github.com/NousResearch/hermes-agent/issues/72854)
- 诉求：桌面端不只显示原始 JSON，要让用户看到插件的人类可读输出。  
- 路线图信号：这类需求非常贴近“AI 助手可解释性”，有利于提升桌面端体验。

### 4) 基于 turn 的动态路由
- [#72942 pre_gateway_dispatch action to route a turn to another profile](https://github.com/NousResearch/hermes-agent/issues/72942)
- 诉求：希望能在 gateway dispatch 前把一次对话转发到另一个 profile。  
- 路线图信号：说明用户在探索更复杂的**动态代理编排**。

### 5) Obsidian vault 显式选择
- 对应 PR：[#73006 feat: support explicit Obsidian vault selection](https://github.com/NousResearch/hermes-agent/pull/73006)
- 这是今日最接近“可落地下一版本”的新能力之一，因为已有明确 PR 在推进。  
- 路线图信号：若 PR 通过，较可能被纳入下一次版本整合。

### 哪些更可能进入下一版本？
结合当前 PR 动向，以下变更更像“近期可落地项”：
- [#73006 Explicit Obsidian vault selection](https://github.com/NousResearch/hermes-agent/pull/73006)
- [#73008 feat(discord): add durable thread run lifecycle](https://github.com/NousResearch/hermes-agent/pull/73008)
- [#73015 fix(desktop): resolve keybinds through the active keyboard layout](https://github.com/NousResearch/hermes-agent/pull/73015)  
  （虽然是 bug fix，但对桌面功能体验影响大，通常也会一起进入版本节奏）

---

## 7. 用户反馈摘要
从今天的 Issues 可以提炼出几条非常明确的真实用户痛点：

### 1) “我需要它别把消息发错地方”
- 代表问题：[#72971](https://github.com/NousResearch/hermes-agent/issues/72971)
- 反馈本质：用户对 Hermes 的期待已经从“能聊天”升级到“多会话正确路由”。  
- 场景：多个 session 并行、模型响应慢、用户频繁切换会话。

### 2) “我希望中断是真的中断”
- 代表问题：[#72975](https://github.com/NousResearch/hermes-agent/issues/72975)
- 反馈本质：控制操作必须是强语义的，不能只在日志上成功。  
- 场景：长时间请求、需要快速止损、避免资源继续消耗。

### 3) “工具输出和验证要可信”
- 代表问题：[#72884](https://github.com/NousResearch/hermes-agent/issues/72884)、[#72797](https://github.com/NousResearch/hermes-agent/issues/72797)
- 反馈本质：工具链不能静默改写内容、不能对修改结果误判。  
- 场景：代码/配置编辑、文件写入、自动修复、内容模板生成。

### 4) “安全策略不能误伤用户”
- 代表问题：[#72989](https://github.com/NousResearch/hermes-agent/issues/72989)、[#72925](https://github.com/NousResearch/hermes-agent/issues/72925)、[#72910](https://github.com/NousResearch/hermes-agent/issues/72910)
- 反馈本质：用户对**记忆污染、凭证泄露、SSRF 防护漏洞**非常敏感。  
- 场景：企业部署、带有敏感凭证的工作流、外部链接抓取。

### 5) “跨平台一致性还不够”
- 代表问题：[#72970](https://github.com/NousResearch/hermes-agent/issues/72970)、[#72969](https://github.com/NousResearch/hermes-agent/issues/72969)、[#72944](https://github.com/NousResearch/hermes-agent/issues/72944)、[#72819](https://github.com/NousResearch/hermes-agent/issues/72819)
- 反馈本质：Windows/macOS/远程模式的体验仍有明显差异。  
- 场景：本地桌面、远程 gateway、Docker/WSL/Windows 混合环境。

### 总体情绪判断
用户对 Hermes 的评价正从“功能丰富”转向“**可靠性、可解释性、跨平台一致性**”。  
也就是说，产品已经进入更成熟阶段，用户不再满足于“能做”，而更在意“做得对、做得稳、做得可追踪”。

---

## 8. 待处理积压
> 说明：当前数据主要覆盖近 24 小时新增/活跃项，未给出完整历史年龄。因此这里将“待处理积压”定义为：**高优先级但尚未形成闭环的待跟进项**，而非严格意义上的长期陈旧工单。

### 优先级最高的待跟进 Issues
- [#72975 P1 中断失效](https://github.com/NousResearch/hermes-agent/issues/72975)  
- [#72940 P1 长会话死锁](https://github.com/NousResearch/hermes-agent/issues/72940)  
- [#72971 P2 错会话投递](https://github.com/NousResearch/hermes-agent/issues/72971)  
- [#72989 P2 记忆污染/永久封禁误触发](https://github.com/NousResearch/hermes-agent/issues/72989)  
- [#72925 P2 脱敏策略不足](https://github.com/NousResearch/hermes-agent/issues/72925)  
- [#72969 P2 Windows 计算机使用版本不一致](https://github.com/NousResearch/hermes-agent/issues/72969)  
- [#72910 P3 SSRF IPv6 特殊用途绕过](https://github.com/NousResearch/hermes-agent/issues/72910)  

### 待审 PR backlog 也偏大
当前有 **38 个 PR 待合并**，建议维护者优先审查以下类型：
- [#73005 fix(cli): honor safe-mode isolation in one-shot](https://github.com/NousResearch/hermes-agent/pull/73005)  
- [#73007 fix(computer-use): normalize cua-driver result envelopes](https://github.com/NousResearch/hermes-agent/pull/73007)  
- [#73011 fix(skills): fail closed when the agent-created skill security scan errors](https://github.com/NousResearch/hermes-agent/pull/73011)  
- [#72998 fix(agent): preserve Codex watchdog error causality](https://github.com/NousResearch/hermes-agent/pull/72998)  

### 维护建议
1. 先处理 **P1/P2 稳定性问题**，避免“高活跃但高故障感知”的用户体验。  
2. 对桌面端会话/路由/编辑器交互进行专项回归。  
3. 对安全相关问题采取默认 fail-closed 策略。  
4. 对跨平台问题建立 Windows/macOS/remote mode 的固定回归集。

---

如果你希望，我还可以把这份日报进一步整理成：
1. **适合发给团队的 Slack/飞书简版**，或  
2. **带“趋势判断 + 风险等级”的管理层周报格式**。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-07-28）
项目仓库：<https://github.com/qwibitai/nanoclaw>

## 1. 今日速览
今日 NanoClaw 处于“**低外部讨论、持续内部修复**”状态：过去 24 小时没有新增或活跃 Issues，也没有新版本发布，但有 **3 个待合并 PR** 持续推进，且都集中在核心体验与集成稳定性上。  
从信号上看，项目并非停滞，而是以 **bug fix / 边界修复** 为主线进行维护，说明维护者仍在持续打磨关键路径。  
当前社区互动较弱，未见评论、点赞等反馈积累，因此今日更像是一次“**工程推进日**”而非“社区发酵日”。  
综合判断：**开发活跃度中等偏低，但健康度尚可，重点在于修复积压问题并等待审核落地**。  
PR 入口：<https://github.com/qwibitai/nanoclaw/pulls>

---

## 2. 项目进展
今日没有已合并/关闭的 PR，但有 3 个重要修复类 PR 处于开放状态，代表项目正在向“更稳、更可用”的方向推进。

### 重点 PR
1. **#3143 Preserve resolved approval card content**  
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/3143>  
   - 作用：修复审批卡片在“已解决”状态下内容丢失的问题，保留标题与请求细节，只替换按钮为决策结果/超时状态。  
   - 意义：这是典型的 **核心交互完整性修复**，能提升工作流可追溯性，减少用户在审核/审批场景中的信息丢失。

2. **#3142 forward image/file attachments through the mounted inbox**  
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/3142>  
   - 作用：修复 Signal 附件在消息中拼入不可访问路径的问题，改为通过已挂载 inbox 正确转发图片/文件附件。  
   - 意义：这是 **通信集成链路的可用性修复**，直接影响多媒体附件、文档附件的读取与处理成功率。

3. **#3141 respect container.json skill selection for CLAUDE.md fragments**  
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/3141>  
   - 作用：修复 compose 流程中对 `container.json` skill 选择的忽略问题，确保 CLAUDE.md 片段按预期拼装。  
   - 意义：这是 **配置驱动行为一致性** 的修复，影响技能/容器编排的稳定性，属于底层执行逻辑修正。

### 今日推进量判断
- **代码层面推进：3 项修复并行推进**
- **落地层面推进：0 项已合并**
- **项目整体进度：偏“修复整固”而非“新功能扩张”**

这说明 NanoClaw 当前的重点是先把 **审批、附件、技能拼装** 这三类关键路径修稳，再谈更高层功能扩展。

---

## 3. 社区热点
今日没有 Issues，因此 **没有 issue 维度的讨论热点**。  
从 PR 活跃度看，今日的“社区关注点”实际上全部集中在 3 个开放 PR 上，但它们目前都 **无评论、无点赞**，因此尚未形成明显的讨论热点。

### 当前最活跃条目
- **#3143** 审批卡片内容保留修复  
  链接：<https://github.com/qwibitai/nanoclaw/pull/3143>
- **#3142** Signal 附件转发修复  
  链接：<https://github.com/qwibitai/nanoclaw/pull/3142>
- **#3141** CLAUDE.md 片段选择修复  
  链接：<https://github.com/qwibitai/nanoclaw/pull/3141>

### 背后的诉求判断
这些 PR 反映出的诉求高度一致：
- 用户希望 **核心交互流程不丢信息**
- 希望 **附件与文件能够被可靠访问**
- 希望 **容器/技能配置能严格按预期生效**

换句话说，今日热点不是“新能力”，而是“**基础体验可靠性**”。

---

## 4. Bug 与稳定性
今日没有 Issues 报告，因此 **没有新增公开 Bug 单**；不过从开放 PR 可以明显看出当前最关键的稳定性问题集中在以下几类。

### 高优先级问题
1. **附件路径不可访问，导致文件/图片无法读取**  
   - 关联 PR：#3142  
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/3142>  
   - 严重程度：**高**  
   - 影响：直接影响附件处理链路，可能造成消息可见但内容不可用。  
   - 状态：已有 fix PR，等待合并。

2. **已解决审批卡片内容丢失**  
   - 关联 PR：#3143  
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/3143>  
   - 严重程度：**中高**  
   - 影响：影响审批结果的上下文保留，可能削弱审计与回溯能力。  
   - 状态：已有 fix PR，等待合并。

3. **compose 流程未正确遵循 container.json 技能选择**  
   - 关联 PR：#3141  
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/3141>  
   - 严重程度：**中**  
   - 影响：配置与运行结果不一致，可能造成部分工作流行为偏差。  
   - 状态：已有 fix PR，等待合并。

### 稳定性结论
今天没有崩溃/回归类 Issues 暴露，但 3 个修复 PR 都指向 **核心链路稳定性**，说明项目当前更需要把“看不见但关键”的底层问题尽快收口。

---

## 5. 功能请求与路线图信号
今日没有新增 Issues，因此 **没有公开的新功能需求** 可直接归档。  
但从 PR 内容看，项目路线图信号很清晰：开发重心正在向以下方向倾斜。

### 路线图信号
- **工作流持久化与状态保真**  
  - 信号来源：#3143  
  - 链接：<https://github.com/qwibitai/nanoclaw/pull/3143>  
  - 含义：用户需要审批/决策类卡片在状态变化后仍保留完整上下文。

- **多模态/附件处理链路的可靠访问**  
  - 信号来源：#3142  
  - 链接：<https://github.com/qwibitai/nanoclaw/pull/3142>  
  - 含义：附件不是边缘功能，而是实际高频输入，必须能被稳定读取与转发。

- **容器化技能编排的配置一致性**  
  - 信号来源：#3141  
  - 链接：<https://github.com/qwibitai/nanoclaw/pull/3141>  
  - 含义：项目正在强化“配置即行为”的可预测性，这通常是中后期工程成熟度提升的重要标志。

### 哪些更可能进入下一版本
若按当前动向判断，以下方向较可能进入下一轮版本整合：
1. 附件处理修复与边界增强  
2. 审批/决策卡片的状态保真  
3. 容器技能选择与 compose 逻辑一致性

这些都属于 **高价值基础设施修复**，优先级通常高于新功能扩展。

---

## 6. 用户反馈摘要
由于今天 **没有 Issues 和评论数据**，无法直接从用户评论中提炼“真实反馈原文”。  
不过从 PR 主题可以反推出用户最可能的痛点：

### 反映出的真实使用痛点
- **用户希望审批卡片在处理后仍可回看完整内容**  
  - 对应：#3143  
  - 链接：<https://github.com/qwibitai/nanoclaw/pull/3143>

- **用户在 Signal 场景下需要可靠的附件打开能力**  
  - 对应：#3142  
  - 链接：<https://github.com/qwibitai/nanoclaw/pull/3142>

- **用户依赖 container.json 与 CLAUDE.md 的配置联动，要求行为严格一致**  
  - 对应：#3141  
  - 链接：<https://github.com/qwibitai/nanoclaw/pull/3141>

### 满意/不满意信号
- **满意信号**：维护者持续修复核心路径，说明项目仍在认真处理可用性问题。  
- **不满意信号**：目前缺少用户评论/反馈积累，可能意味着社区参与度较弱，或问题主要在内部/开发侧发现。

---

## 7. 待处理积压
今日没有公开 Issues，因此 **长期未响应的 Issue 无法从本次数据中识别**。  
不过，当前最明确的“待处理积压”是 3 个开放 PR，它们都指向核心流程，值得维护者优先审查。

### 待处理 PR
1. **#3143** Preserving resolved approval card content  
   - <https://github.com/qwibitai/nanoclaw/pull/3143>

2. **#3142** Attachment forwarding fix for Signal  
   - <https://github.com/qwibitai/nanoclaw/pull/3142>

3. **#3141** Respect container.json skill selection  
   - <https://github.com/qwibitai/nanoclaw/pull/3141>

### 维护建议
- 优先合并影响 **附件访问** 和 **审批信息保真** 的修复  
- 对 compose / container 配置链路做一次回归验证  
- 若未来出现类似问题，建议尽快转为 Issue 归档，形成可追踪的缺陷池

---

### 总结一句话
NanoClaw 今日没有发布和 Issue 爆发，但有 **3 个围绕核心体验的修复 PR** 持续推进，说明项目正处于“**修稳定、补关键链路**”阶段；短期健康度尚可，下一步关键看这些 PR 能否尽快合并落地。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-07-28）

## 1) 今日速览
过去 24 小时，IronClaw 保持了**高强度活跃**：共出现 **23 条 Issues 更新**、**29 条 PR 更新**，其中 **10 个 PR 已合并/关闭**，并且刚刚发布了 **1.0.0 稳定版**。整体信号非常明确：项目已从“架构重写”阶段进入“稳定性打磨 + 生态接入 + WebUI 体验修补”的阶段。  
今天新增/活跃的问题集中在 **WebUI 交互、扩展连接、OAuth、会话流式体验、Telegram/Slack 行为一致性** 等用户可感知场景，说明项目正在快速补齐 v1 上线后的体验短板。  
同时，合并的 PR 以 **测试门禁、凭据生命周期、沙箱安全、错误分类、释放准备** 为主，体现出团队在为稳定发布做收口。  
- 仓库主页：<https://github.com/nearai/ironclaw>

---

## 2) 版本发布
### IronClaw v1.0.0（2026-07-27）
- 发布页：<https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.0.0>

**发布要点**
- 这是 **重构后的 IronClaw 首个稳定版**，不是 0.29.x 的延续版本，而是一次**从零重建**：
  - agent runtime
  - storage
  - extension host
  - web UI
- 发布说明明确指出：
  - `ironclaw` 二进制现在是**重构后的 CLI**
  - 旧的 v1 monolith 以 `ironclaw-legacy` 形式保留

**破坏性变更 / 迁移注意事项**
- **二进制名称变化**：自动化脚本、CI、部署命令如果仍依赖旧 monolith 行为，需要改为调用 `ironclaw`，并确认是否应切换到 `ironclaw-legacy`。
- **架构层面已重建**：扩展、存储、运行时、WebUI 的行为可能与旧线存在语义差异；迁移时应优先验证：
  - 扩展接入流程
  - OAuth/凭据链路
  - 会话恢复与流式输出
  - outbound delivery 的目标选择
- **建议迁移顺序**：
  1. 先验证 CLI 与服务启动
  2. 再验证核心交互链路（chat / tools / extensions）
  3. 最后迁移依赖 legacy 的自动化和脚本

---

## 3) 项目进展
过去 24 小时内，项目的“前进”主要体现在两条线：**稳定发布收口** 与 **运行时/测试基础设施加固**。

### 已合并/关闭的关键 PR
- **#6736** `chore(release): bump ironclaw to 1.0.0`  
  完成 1.0.0 发布前的版本抬升与发布收尾。  
  链接：<https://github.com/nearai/ironclaw/pull/6736>

- **#6735** `fix(runner): a compaction outage is not a driver bug`  
  修正运行时错误分类，避免把 `CompactionUnavailable` 误标为 `driver_bug`，提升可观测性和排障准确度。  
  链接：<https://github.com/nearai/ironclaw/pull/6735>

- **#6723** `sandbox: add unwired credential-firewall primitives (CA + obligation staging)`  
  为 sandbox 凭据防火墙引入基础原语，是后续安全隔离与证书体系的重要地基。  
  链接：<https://github.com/nearai/ironclaw/pull/6723>

- **#6722** `test(integration): cover the expired-credential resume arm`  
  补齐“凭据过期后重新连接并继续任务”的集成测试，增强用户在会话中断后的恢复能力。  
  链接：<https://github.com/nearai/ironclaw/pull/6722>

- **#6721** `ci: pin TZ/locale for tests and reject orphan-history branches`  
  提高 CI 决定性，减少时间/语言环境带来的不稳定；同时增加分支历史校验。  
  链接：<https://github.com/nearai/ironclaw/pull/6721>

- **#6710** `test(e2e): add credential-lifecycle fault profiles`  
  建立凭据生命周期故障模型，为后续 401 / wrong_scope / expired_credential 等场景提供测试基础。  
  链接：<https://github.com/nearai/ironclaw/pull/6710>

- **#6709** `ci: count shell self-tests as tests in the regression gate`  
  让 shell 自测纳入回归门禁，减少“测试存在但不被计入”的盲区。  
  链接：<https://github.com/nearai/ironclaw/pull/6709>

### 总体推进判断
- 从结果看，项目今天不是在“加新功能”上发力，而是在**把 v1 的底座做实**。
- 关键推进点包括：
  - 发布流程完成收口
  - 凭据生命周期与错误分类更完善
  - sandbox 安全链路补地基
  - CI/测试门禁更严格
- 这意味着 IronClaw 正从“能跑”向“可长期维护、可稳定扩展”推进。

---

## 4) 社区热点
> 注：当前数据里 **评论数/反应数大多为 0 或未披露**，因此严格意义上的“最热帖”无法仅凭互动指标精确判断。以下按**主题关注度 + 更新频率 + 对产品影响面**提取今日热点。

### 热点主题 1：WebUI 体验与账号可见性
- **#6743** `Add in-app feedback / bug report widget to IronClaw WebUI`  
  链接：<https://github.com/nearai/ironclaw/issues/6743>
- **#6742** `Add user profile details view in the WebUI`  
  链接：<https://github.com/nearai/ironclaw/issues/6742>

**背后诉求**
- 用户希望在产品内直接反馈问题，而不是离开 WebUI 去找 Slack/GitHub。
- 用户也希望知道“当前到底登录的是哪个账号”，这说明多账号/个人与工作账号切换是现实场景。

### 热点主题 2：扩展连接与 OAuth 稳定性
- **#6741** `Extension OAuth connection fails for Gmail, Calendar after completing sign-in flow`  
  链接：<https://github.com/nearai/ironclaw/issues/6741>

**背后诉求**
- 连接成功后仍失败，说明扩展接入链路的状态一致性有问题。
- 这类问题对“可用性信任”打击很大，属于高优先级修复项。

### 热点主题 3：v1 launch checklist 的核心稳定性问题
- **#6718** `Streaming only resumes after switching pages`  
  链接：<https://github.com/nearai/ironclaw/issues/6718>
- **#6719** `Conversation history fails to load after backend errors`  
  链接：<https://github.com/nearai/ironclaw/issues/6719>
- **#6716** `Model incorrectly claims Slack integration is unavailable`  
  链接：<https://github.com/nearai/ironclaw/issues/6716>
- **#6717** `Agent gives incorrect Telegram pairing instructions after pairing succeeds`  
  链接：<https://github.com/nearai/ironclaw/issues/6717>

**背后诉求**
- 用户关注的不只是“功能存在”，而是**状态恢复、错误后恢复、模型说明是否与真实系统一致**。
- 对于 AI 助手产品，这类问题直接影响用户对 agent 可靠性的判断。

### 热点主题 4：平台能力扩展
- **#6734** `Give IronClaw agent access to its own documentation...`  
  链接：<https://github.com/nearai/ironclaw/issues/6734>
- **#6733** `Ship manifest-declared /model and /status commands across Telegram, Slack, and WebUI`  
  链接：<https://github.com/nearai/ironclaw/issues/6733>
- **#6727** `...support for connecting a custom/arbitrary MCP server`  
  链接：<https://github.com/nearai/ironclaw/issues/6727>

**背后诉求**
- 用户和贡献者都在推动 IronClaw 从“预置能力集合”走向“可配置、可扩展、可自助接入”的平台。

---

## 5) Bug 与稳定性
按严重程度排列如下：

### 高严重度
1. **#6720** `Task runs indefinitely and stop button fails to cancel execution`  
   链接：<https://github.com/nearai/ironclaw/issues/6720>  
   影响：任务无法停止，属于典型的“控制面失效”，会直接消耗资源并损害用户信任。  
   关联修复：当前快照中**未见明确 fix PR**。

2. **#6741** `Extension OAuth connection fails for Gmail, Calendar after completing sign-in flow`  
   链接：<https://github.com/nearai/ironclaw/issues/6741>  
   影响：认证完成后仍失败，属于高优先级接入阻断。  
   关联修复：当前快照中**未见明确 fix PR**。

3. **#6719** `Conversation history fails to load after backend errors`  
   链接：<https://github.com/nearai/ironclaw/issues/6719>  
   影响：历史记录加载失败会让会话中断、上下文丢失。  
   关联修复：当前快照中**未见明确 fix PR**。

### 中严重度
4. **#6718** `Streaming only resumes after switching pages`  
   链接：<https://github.com/nearai/ironclaw/issues/6718>  
   影响：流式体验断裂，用户必须通过页面切换“手动修复”。  
   关联修复：可关注 **#6708** `fix(webui): recover SSE across reloads and proxy EOFs`  
   链接：<https://github.com/nearai/ironclaw/pull/6708>

5. **#6716** `Model incorrectly claims Slack integration is unavailable`  
   链接：<https://github.com/nearai/ironclaw/issues/6716>  
   影响：模型对系统能力的描述不可信，属于“错误引导”。  
   关联修复：当前快照中未见明确 fix PR。

6. **#6717** `Agent gives incorrect Telegram pairing instructions after pairing succeeds`  
   链接：<https://github.com/nearai/ironclaw/issues/6717>  
   影响：配对成功后仍给出过时指引，属于状态一致性问题。  
   关联修复：当前快照中未见明确 fix PR。

### 低严重度但值得修复
7. **#6713** `Reset “Always allow” when the active approval gate changes`  
   链接：<https://github.com/nearai/ironclaw/issues/6713>  
   影响：会带来错误授权风险，虽不一定立即致命，但属于安全/交互边界问题。

8. **#6711** `preserve selected appearance theme across SPA navigation`  
   链接：<https://github.com/nearai/ironclaw/issues/6711>  
   影响：主题状态在 SPA 导航中丢失，影响体验一致性。  
   关联修复：可关注 **#6712** `fix(webui): preserve route state across SPA navigation`  
   链接：<https://github.com/nearai/ironclaw/pull/6712>

---

## 6) 功能请求与路线图信号
今天新增的功能诉求，明显指向两类路线：**产品体验补强** 与 **平台可扩展性增强**。

### 更可能进入下一版本的“近端需求”
- **#6743** WebUI 内置反馈/报 bug 组件  
  链接：<https://github.com/nearai/ironclaw/issues/6743>  
  判断：这是很典型的低成本高收益 UX 功能，适合作为发布后快速补齐项。

- **#6742** WebUI 账号详情视图  
  链接：<https://github.com/nearai/ironclaw/issues/6742>  
  判断：多账号/身份确认是基础需求，优先级较高。

- **#6733** 跨 Telegram / Slack / WebUI 的 `/model` 和 `/status`  
  链接：<https://github.com/nearai/ironclaw/issues/6733>  
  判断：属于统一产品语义的关键能力，和 v1 的“多通道一致性”目标高度契合。

- **#6727** 支持连接自定义 MCP server  
  链接：<https://github.com/nearai/ironclaw/issues/6727>  
  判断：这是平台生态扩展的核心诉求，价值很高，预计会进入中短期路线图。

### 中长期平台路线图信号
- **#6731** Integrate IronHub into IronClaw  
  链接：<https://github.com/nearai/ironclaw/issues/6731>  
  这是“工具市场化/技能市场化”的方向，属于长期平台战略。

- **#6734** 让 agent 访问自身文档  
  链接：<https://github.com/nearai/ironclaw/issues/6734>  
  这是典型的“让 agent 自举，减少幻觉”的高价值需求，适合和文档/帮助体系一起推进。

- **#6732** 统一 outbound delivery 执行与自动化目标  
  链接：<https://github.com/nearai/ironclaw/issues/6732>  
  更偏运行时架构，但会直接影响多渠道产品一致性。

- **#6730 / #6729** memory provider 生命周期与 extension 安装持久化重构  
  链接：<https://github.com/nearai/ironclaw/issues/6730>、<https://github.com/nearai/ironclaw/issues/6729>  
  这些更像是 v1 之后继续打磨平台内核的信号。

---

## 7) 用户反馈摘要
从 Issues 里能提炼出几类非常真实的用户痛点：

### 1. “我想在产品里直接反馈，而不是到处找入口”
- 代表问题：**#6743**  
  链接：<https://github.com/nearai/ironclaw/issues/6743>  
  说明用户已经开始把 IronClaw 当作日常工具，希望它具备内建反馈闭环。

### 2. “我想知道我到底登录的是谁”
- 代表问题：**#6742**  
  链接：<https://github.com/nearai/ironclaw/issues/6742>  
  说明产品已进入多账号、多身份、多环境并存的使用阶段，身份可见性变成刚需。

### 3. “连接看起来成功了，但实际上还是坏的”
- 代表问题：**#6741**  
  链接：<https://github.com/nearai/ironclaw/issues/6741>  
  这是最危险的一类体验问题：用户会误以为是自己操作错误，而不是系统缺陷。

### 4. “任务在跑，但我控制不住它”
- 代表问题：**#6720**  
  链接：<https://github.com/nearai/ironclaw/issues/6720>  
  反映出任务取消、执行控制、停止语义仍需加强。

### 5. “聊天/流式/历史记录不够稳”
- 代表问题：**#6718**、**#6719**  
  链接：<https://github.com/nearai/ironclaw/issues/6718>、<https://github.com/nearai/ironclaw/issues/6719>  
  这说明用户对“持续对话”的容错预期很高，任何断流、恢复失败都会被视为重大退化。

### 6. “agent 说的话不可信/不够贴近真实系统”
- 代表问题：**#6716**、**#6717**  
  链接：<https://github.com/nearai/ironclaw/issues/6716>、<https://github.com/nearai/ironclaw/issues/6717>  
  说明产品的 AI 解释层与真实系统状态之间，仍有一致性鸿沟。

### 总体评价
- 用户并不是在抱怨“功能太少”，而是在抱怨**状态不稳、描述不准、恢复不顺、入口不清晰**。
- 这类反馈通常出现在产品从 alpha/beta 转入正式使用之后，是一个积极信号：说明用户开始把它当“生产工具”而非“实验品”。

---

## 8) 待处理积压
> 说明：本次数据窗口只有 24 小时，**没有真正意义上可判断为“长期沉寂”的历史积压项**。以下列出的是当前仍未处理、且影响面较大的开放项，建议维护者优先关注。

### 高优先级开放 Issues
- **#6741** Gmail/Calendar OAuth 连接失败  
  链接：<https://github.com/nearai/ironclaw/issues/6741>
- **#6720** 任务无法停止  
  链接：<https://github.com/nearai/ironclaw/issues/6720>
- **#6719** 会话历史在后端错误后无法加载  
  链接：<https://github.com/nearai/ironclaw/issues/6719>
- **#6718** 流式输出只能靠切页恢复  
  链接：<https://github.com/nearai/ironclaw/issues/6718>

### 高价值开放 PR
- **#6740** TLS termination seam for the sandbox egress proxy  
  链接：<https://github.com/nearai/ironclaw/pull/6740>
- **#6739** dependabot 依赖升级大包  
  链接：<https://github.com/nearai/ironclaw/pull/6739>
- **#6737** restore the extension behaviors silently reverted  
  链接：<https://github.com/nearai/ironclaw/pull/6737>
- **#6724** memory provider contract 重构  
  链接：<https://github.com/nearai/ironclaw/pull/6724>
- **#6728** provider journeys reverse-order nightly test  
  链接：<https://github.com/nearai/ironclaw/pull/6728>
- **#6715** systemd user lingering  
  链接：<https://github.com/nearai/ironclaw/pull/6715>
- **#6708** SSE across reloads and proxy EOFs  
  链接：<https://github.com/nearai/ironclaw/pull/6708>

### 积压判断
- 这些项大多是**大体量、低风险或基础设施型工作**，对 v1 稳定度和可维护性很关键。
- 尤其是 **#6724 / #6737 / #6740 / #6708**，都属于“看起来不是最热，但会决定后续版本质量”的核心工作。

---

## 总体结论
IronClaw 今天的状态可以概括为：**发布已落地，稳定性问题仍在集中暴露，产品正在从“架构完成”走向“用户可用”**。  
v1.0.0 的发布说明项目已经完成一次关键跃迁，但 Issues 侧也清楚显示：接下来最重要的不是再做一次大重构，而是把 **WebUI、扩展连接、会话恢复、多通道一致性、权限与控制面** 这些基础体验做稳。  
如果把今天看作一个分水岭，那么 IronClaw 已经进入了“正式产品化”的第二阶段。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

以下为 **LobsterAI（netease-youdao/LobsterAI）2026-07-28 项目动态日报**。  
时间窗口基于过去 24 小时数据：**Issues 更新 4 条，PR 更新 5 条，新版本发布 0 个**。

---

## 1) 今日速览

过去 24 小时内，LobsterAI 维持了较高的工程活跃度：**有 4 个新/活跃 Issue 和 5 个 PR 更新**，说明用户反馈与开发推进都比较频繁。  
从内容看，今日焦点明显偏向 **稳定性、安全性、Windows 兼容性与产品能力补齐**，其中还出现了一个**数据完整性级别的严重 Bug**。  
同时，今天没有新版本发布，说明当前仍处于持续修复与功能迭代阶段，而非正式发布节奏。  
整体判断：**项目活跃度中高，但健康度呈“高活跃 + 高问题暴露”并存状态**，需要尽快处理关键 Bug，避免用户信任受损。

---

## 2) 版本发布

**今日无新版本发布**。  
- 最新 Releases：无  
- 因此本日报不涉及版本说明、破坏性变更或迁移注意事项。

---

## 3) 项目进展

今日共有 **4 个 PR 关闭**，覆盖了文档、技能、安全修复、渲染器能力与 Agent 运行稳定性等方向，说明项目仍在持续向“可用性 + 安全性 + 易用性”推进。

### 今日已合并/关闭的重要 PR

1. **[#2386](https://github.com/netease-youdao/LobsterAI/pull/2386)**  
   `fix(agentEngine): terminate no-progress tool loops before token budget exhaustion`  
   - 处理 Agent 工具调用陷入无进展循环的问题  
   - 在 token 预算耗尽前终止低效循环，提升执行稳定性与资源利用率  
   - 对长任务、复杂工具链场景尤其重要

2. **[#2389](https://github.com/netease-youdao/LobsterAI/pull/2389)**  
   `fix(email): prevent attachment path traversal`  
   - 修复邮件技能附件路径穿越风险  
   - 增加跨平台安全测试，并提升 bundled email skill 版本  
   - 属于明确的安全修复，价值较高

3. **[#2388](https://github.com/netease-youdao/LobsterAI/pull/2388)**  
   `feat(artifacts): 新增预览工具栏分享与部署入口`  
   - 为 Artifact 预览工具栏加入分享按钮  
   - 浏览器工具栏按内容类型区分“分享/部署”动作  
   - 抽取发布目标判定策略并补齐测试，减少误部署  
   - 补充设计文档，说明该功能已进入产品化落地阶段

4. **[#2387](https://github.com/netease-youdao/LobsterAI/pull/2387)**  
   `Feat/2026.7.20 sites`  
   - 从标题看更偏向站点/内容更新类改动  
   - 由于摘要信息较少，无法确认其具体业务收益  
   - 但它作为闭合 PR，说明文档/站点链路仍在维护

### 今日整体推进判断

- **稳定性**：[#2386](https://github.com/netease-youdao/LobsterAI/pull/2386) 直接降低了“工具无进展死循环”风险  
- **安全性**：[#2389](https://github.com/netease-youdao/LobsterAI/pull/2389) 修补了附件路径穿越漏洞  
- **产品能力**：[#2388](https://github.com/netease-youdao/LobsterAI/pull/2388) 强化了 Artifact 分享/部署路径  
- **工程治理**：多个 PR 带测试与文档，说明项目在补齐可维护性

总体上，项目今天完成了 **“安全补洞 + 稳定性加固 + 功能入口优化”** 三条线并行推进，属于实质性前进。

---

## 4) 社区热点

从当前数据看，**24 小时内各 Issue/PR 的评论数均为 0（或未提供）**，因此严格意义上没有形成“高评论 / 高反应”的热帖。  
不过从议题重要性来看，以下几条最值得关注：

### 热点 1：严重数据完整性 Bug
- **[#2393](https://github.com/netease-youdao/LobsterAI/issues/2393)**  
  `[Bug Report] LobsterAI 加速器在字符串改写时把 \f 字节对 (5C 66) 替换为 \x0C`  
- 这是一个会导致文件数据静默损坏的问题，且摘要显示可 100% 复现  
- 背后诉求：用户希望写文件、改写字符串时**不破坏原始转义内容**，尤其在脚本、Windows 路径、JSON、文档等场景  
- 这类问题通常会迅速影响信任度，是优先级最高的反馈之一

### 热点 2：Windows / 中文路径 / Shell 兼容性
- **[#2390](https://github.com/netease-youdao/LobsterAI/issues/2390)**  
  `LobsterAI 问题报告：exec 工具默认 Shell 及中文路径编码问题`  
- 用户集中反馈 exec 工具在 Windows 上对 shell 选择、中文路径编码处理不佳  
- 背后诉求：希望工具链更符合现代 Windows 环境，尤其要兼容 `pwsh.exe`、中文用户名与路径  
- 这说明 LobsterAI 在 Windows 用户群体中仍有明显环境适配压力

### 热点 3：任务编排能力缺口
- **[#2392](https://github.com/netease-youdao/LobsterAI/issues/2392)**  
  `定时任务的问题`  
- 用户希望定时任务能选择 agent 和 skill  
- 背后诉求：从“能定时执行”升级为“可控地调度指定能力”  
- 说明项目进入更精细化的自动化使用阶段

### 热点 4：技能管理体验
- **[#2391](https://github.com/netease-youdao/LobsterAI/issues/2391)**  
  `技能重命名的问题`  
- 需求非常直接：技能需要支持重命名  
- 这通常是知识库/工作流类产品成熟度提升的信号，属于高频基础体验诉求

---

## 5) Bug 与稳定性

按严重程度排序，今日新增/活跃 Bug 主要如下：

### 1. 🔴 严重：文件内容静默损坏
- **[#2393](https://github.com/netease-youdao/LobsterAI/issues/2393)**  
  `字符串改写时把 \f 替换为 \x0C，导致文件数据静默损坏`
- 严重等级：**数据完整性严重**
- 特征：**100% 可复现**
- 影响：任何包含字面转义 token 的写入操作都可能受影响
- **是否已有 fix PR：未看到直接对应的修复 PR**

### 2. 🟠 高：Windows 默认 Shell 与中文路径编码问题
- **[#2390](https://github.com/netease-youdao/LobsterAI/issues/2390)**  
  `exec 工具默认 Shell 及中文路径编码问题`
- 影响：Windows 终端执行、路径解析、中文用户名环境
- 风险：会导致命令执行失败、路径不可用或结果异常
- **是否已有 fix PR：当前未见明确对应修复 PR**

### 3. 🟡 中：定时任务能力缺失
- **[#2392](https://github.com/netease-youdao/LobsterAI/issues/2392)**  
  `定时任务没办法选择使用哪个 agent，也没法选择使用的 skill`
- 更偏功能缺口，但会影响自动化稳定性与可预期性
- **是否已有 fix PR：未见对应 PR**

### 4. 🟡 中：技能不可重命名
- **[#2391](https://github.com/netease-youdao/LobsterAI/issues/2391)**  
  `请添加一个功能：技能可以重命名`
- 这是产品体验问题，但通常不是紧急稳定性风险
- **是否已有 fix PR：未见对应 PR**

### 稳定性结论

- 今天最值得警惕的是 **[#2393](https://github.com/netease-youdao/LobsterAI/issues/2393)**：它不是普通 bug，而是会造成**静默数据破坏**的高危问题。  
- 其次是 Windows shell / 编码兼容性问题 **[#2390](https://github.com/netease-youdao/LobsterAI/issues/2390)**，它会显著影响企业和本地开发用户体验。  
- 好消息是，项目同时也在通过 **[#2386](https://github.com/netease-youdao/LobsterAI/pull/2386)**、**[#2389](https://github.com/netease-youdao/LobsterAI/pull/2389)** 主动补稳定性与安全短板。

---

## 6) 功能请求与路线图信号

今日新增的功能需求，透露出几个较明确的路线图方向：

### 1. 定时任务可指定 agent / skill
- **[#2392](https://github.com/netease-youdao/LobsterAI/issues/2392)**  
- 这是典型的工作流编排增强需求  
- 若项目后续继续强化自动化能力，这一需求**较可能进入下一阶段规划**

### 2. 技能支持重命名
- **[#2391](https://github.com/netease-youdao/LobsterAI/issues/2391)**  
- 属于基础管理能力补齐  
- 需求简单直接，落地成本通常不高，**有较大概率被纳入短期迭代**

### 3. Artifact 分享与部署入口优化
- **[#2388](https://github.com/netease-youdao/LobsterAI/pull/2388)**  
- 这说明项目路线正在从“生成内容”延伸到“内容分发与部署”  
- 若该方向持续推进，后续很可能进一步完善：
  - 分享链路
  - 发布目标判定
  - 预览/部署一体化体验

### 4. 安全与稳定性优先级仍高
- **[#2389](https://github.com/netease-youdao/LobsterAI/pull/2389)**、**[#2386](https://github.com/netease-youdao/LobsterAI/pull/2386)** 显示团队持续修补底层问题  
- 结合 **[#2393](https://github.com/netease-youdao/LobsterAI/issues/2393)** 与 **[#2390](https://github.com/netease-youdao/LobsterAI/issues/2390)**，可以判断下一个版本大概率仍会优先处理：
  - 数据安全
  - 环境兼容
  - Agent 执行稳定性

---

## 7) 用户反馈摘要

从 Issues 中能提炼出以下真实用户痛点：

### 1. 用户非常在意“结果是否可靠”
- 来自 **[#2393](https://github.com/netease-youdao/LobsterAI/issues/2393)**  
- 用户不是在抱怨“功能没有”，而是在抱怨“写进去的内容被悄悄改坏了”  
- 这说明对 AI 工具来说，**数据不被破坏比功能炫技更重要**

### 2. Windows 用户对环境兼容性敏感
- 来自 **[#2390](https://github.com/netease-youdao/LobsterAI/issues/2390)**  
- 用户已明确指出默认 shell 选择、中文路径编码等现实问题  
- 这类反馈通常来自真实生产环境，而不是实验环境

### 3. 用户希望自动化任务更可控
- 来自 **[#2392](https://github.com/netease-youdao/LobsterAI/issues/2392)**  
- 定时任务不只是“按时跑”，而是要指定执行主体（agent）和能力（skill）  
- 这表明用户已将 LobsterAI 用于更复杂的工作流自动化

### 4. 用户需要更好的资产管理
- 来自 **[#2391](https://github.com/netease-youdao/LobsterAI/issues/2391)**  
- 技能重命名的需求说明用户开始积累一定数量的技能资产  
- 这通常意味着产品进入“中度以上使用”阶段

---

## 8) 待处理积压

以下是当前值得维护者重点关注的待处理项：

### 高优先级积压
1. **[#2393](https://github.com/netease-youdao/LobsterAI/issues/2393)**  
   严重数据完整性问题，建议尽快定位并发布修复

2. **[#2390](https://github.com/netease-youdao/LobsterAI/issues/2390)**  
   Windows exec shell 与中文路径编码问题，影响面广，建议尽快确认兼容策略

### 中优先级积压
3. **[#2392](https://github.com/netease-youdao/LobsterAI/issues/2392)**  
   定时任务能力缺口，建议纳入任务调度体验优化

4. **[#2391](https://github.com/netease-youdao/LobsterAI/issues/2391)**  
   技能重命名需求，属于低风险高频体验改进

### 需要持续跟踪的开放 PR
5. **[#2394](https://github.com/netease-youdao/LobsterAI/pull/2394)**  
   `[area: docs, platform: windows] Fix/windows install manual overwrite blocked`  
   - 该 PR 当前仍为 OPEN  
   - 与 Windows 安装体验相关，建议关注其是否与近期 Windows 问题形成联动修复

---

## 总体判断

LobsterAI 今日呈现出一个很典型的开源 AI 工具项目状态：  
**开发活跃、修复动作持续，但同时暴露出安全、兼容性和数据完整性问题。**

如果从项目健康度来看：
- **优点**：PR 推进节奏不错，且已有稳定性/安全性修复落地  
- **风险**：新的严重 Bug 与环境兼容问题说明底层可靠性仍需加强  
- **趋势**：产品正在从“能用”向“可控、可部署、可集成”演进

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合团队周报的精简版**  
2. **适合公众号/社区发布的解读版**  
3. **适合内部研发看板的表格版**

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报（2026-07-28）

## 1) 今日速览
今天 Moltis 的整体活跃度偏低，Issues 侧保持静默，过去 24 小时没有新增或关闭的问题单，说明社区层面的故障反馈和需求提交都较少。  
PR 侧有 1 条新增开放中的工作，且内容较实质，聚焦在**代理运行时的观测埋点与用户反馈采集基础设施**，这通常属于平台能力建设，意味着项目仍在持续打底。  
今天没有新版本发布，因此用户侧没有可直接消费的功能增量。  
综合判断：**项目健康度稳定、外部噪音低，内部仍有推进，但当前更多体现为工程基础设施的前置建设，而非面向终端用户的显性版本交付。**

相关链接：  
- [PR #1174: Add instrumentation and feedback collection infrastructure](https://github.com/moltis-org/moltis/pull/1174)

---

## 2) 版本发布
今日**无新版本发布**。

相关链接：  
- [Releases](https://github.com/moltis-org/moltis/releases)

---

## 3) 项目进展
今日最重要的进展来自 **PR #1174**：  
- 引入了**agent instrumentation** 能力；
- 设计了**可插拔 backend** 的采集架构；
- 通过 `ObservationSink` 做**多后端 fanout**；
- 在此之上增加了**终端用户反馈收集**基础设施。

这类改动通常会显著提升项目的可观测性、可运营性和后续问题定位能力。虽然该 PR 仍处于 Open 状态，尚未为用户形成可直接使用的发布物，但从项目演进角度看，它属于**底层平台能力补强**，对后续分析、评估、优化代理行为非常关键。  
如果顺利合并，这将是从“能运行”走向“可监控、可反馈、可迭代”的重要一步。

相关链接：  
- [PR #1174](https://github.com/moltis-org/moltis/pull/1174)

---

## 4) 社区热点
今天没有 Issues 活跃，也没有新增评论数据，因此**社区热点基本集中在唯一的开放 PR #1174**。  
由于该 PR 当前评论数为 0，说明讨论尚未展开；从主题看，潜在关注点主要会落在：
- 埋点对性能的影响；
- 后端可插拔机制是否足够通用；
- 采集到的数据是否可控、可配置；
- 用户反馈采集是否涉及隐私/权限边界。

当前没有更高热度的 Issue 或 PR 可供比较，整体社区讨论热度偏低。

相关链接：  
- [PR #1174](https://github.com/moltis-org/moltis/pull/1174)

---

## 5) Bug 与稳定性
今日没有新增或关闭的 Issues，因此**没有可确认的 Bug、崩溃或回归问题报告**。  
从风险管理角度看，这意味着：
- 当前未见公开稳定性告警；
- 但也缺少新的用户反馈来验证近期版本或主干的实际运行质量。

按严重程度排序的 Bug 列表：  
1. **无已知公开 Bug**
2. **无已知回归**
3. **无崩溃报告**

是否已有 fix PR：  
- **无对应 Bug，因此无 fix PR 可列出**

相关链接：  
- [Issues](https://github.com/moltis-org/moltis/issues)

---

## 6) 功能请求与路线图信号
今天没有新增 Issues，因此**没有直接来自用户的新功能请求**。  
不过，PR #1174 本身释放出一个清晰的路线图信号：项目正在优先建设**观测、反馈、可运营能力**。这通常意味着后续版本可能继续围绕以下方向演进：
- 运行时监控与诊断；
- 用户反馈闭环；
- 采集后端生态扩展；
- 更细粒度的代理行为分析。

从当前已有 PR 的内容判断，这类基础设施很可能会被纳入下一阶段交付，甚至成为后续功能迭代的前提。

相关链接：  
- [PR #1174](https://github.com/moltis-org/moltis/pull/1174)  
- [Issues](https://github.com/moltis-org/moltis/issues)

---

## 7) 用户反馈摘要
由于今日没有 Issues 评论，也没有 PR 评论，**无法从公开讨论中提炼出新的真实用户反馈**。  
这意味着当前缺少可量化的痛点样本，暂时看不到用户对功能、稳定性或易用性的直接评价。  
从项目状态看，用户反馈入口可能仍处于较弱活跃阶段，而 PR #1174 所做的反馈采集基础设施，恰好可能用于改善这一现状。

相关链接：  
- [Issues](https://github.com/moltis-org/moltis/issues)  
- [PR #1174](https://github.com/moltis-org/moltis/pull/1174)

---

## 8) 待处理积压
今日没有发现长期未响应的 Issue 或 PR 列表中的新增积压项。  
但从“**唯一活跃 PR 仍处于 Open**”这一事实看，当前最需要关注的待处理项是：
- **PR #1174**：这是今天最重要、也是唯一显著的待办工作，值得维护者尽快评审、补充测试与推进合并判断。

如果该 PR 长期悬而未决，可能会延后项目在可观测性与反馈闭环上的整体建设进度。

相关链接：  
- [PR #1174](https://github.com/moltis-org/moltis/pull/1174)

---

## 总体判断
- **外部活跃度：低**
- **工程推进：有，但集中在基础设施层**
- **稳定性风险：当前公开数据下较低**
- **社区反馈：暂时不足**
- **下一步关注点：PR #1174 的评审与合并进展**

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合群发的短版摘要**，或  
2. **适合内部周报/晨报的更正式版本**。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw（agentscope-ai/QwenPaw）项目动态日报｜2026-07-28

**数据概览**
- 过去 24 小时 Issues 更新：**9** 条（新开/活跃 8，已关闭 1）
- 过去 24 小时 PR 更新：**12** 条（待合并 11，已合并/关闭 1）
- 新版本发布：**0**
- 整体判断：**开发活跃、社区参与度高，但 review/合并吞吐偏慢，待处理 PR 堆积开始显现。**

---

## 1) 今日速览

今天项目没有发布新版本，但问题和 PR 都很活跃，说明代码迭代仍在高频推进。  
讨论焦点主要集中在 **多代理/子代理隔离、审批权限继承、插件兼容性、开发体验** 和 **模型提供方扩展**。  
从数据看，新增/活跃 Issue 以真实使用痛点为主，且多条问题已出现对应修复 PR，说明社区反馈正在较快转化为代码。  
不过当前仅有 **1 个 PR 关闭**，其余 **11 个 PR 仍待合并**，表明维护者的审查压力在上升。  
总体来看，项目处于**高活跃、强需求驱动**阶段，健康度良好，但需要尽快提升合并效率与稳定性收敛速度。

---

## 2) 版本发布

本日**无新 Release**。

---

## 3) 项目进展

### 今日最重要的已关闭 PR
- **#6493** `[closed] fix(agents): align copy_skills/copy_jobs by skipping empty scaffolding`  
  链接：<https://github.com/agentscope-ai/QwenPaw/pull/6493>

### 推进解读
这个 PR 直接修复了“复制 Agent 配置”时，`copy_skills=false` / `copy_jobs=false` 在磁盘上未被完全尊重的问题。  
它属于典型的**行为一致性修复**：前端/接口已经表达“不复制”，但工作区初始化仍然偷偷生成目录，导致用户配置与实际结果不一致。  
这类修复对项目很重要，因为它能减少配置漂移，也能提升 Agent 复制/派生场景下的可预期性。

### 今日推进的整体意义
- 在**工作区管理**方向继续补齐一致性问题
- 说明项目正在从“功能可用”向“行为严格一致”过渡
- 虽然仅 1 个 PR 关闭，但其问题类型偏底层，实际价值高于数量体现

---

## 4) 社区热点

> 说明：今日所有条目的 👍 均为 0，说明讨论尚未出现明显情绪极化，但诉求非常集中。

### 热点 1：开发安装文档漏掉测试依赖
- **Issue #6501** `[OPEN] [Bug]: documented development install omits the test extra`  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6501>
- **相关 PR #6502** `[OPEN] [first-time-contributor] fix(dev): include test extra in setup instructions`  
  链接：<https://github.com/agentscope-ai/QwenPaw/pull/6502>

**背后诉求：**  
贡献者按文档走却无法直接运行 `pytest`，说明文档与真实贡献流程不一致。  
这是非常典型的**开发者体验问题**，也是新贡献者最容易撞上的第一道门槛。

---

### 热点 2：子代理审批权限继承
- **Issue #6506** `[OPEN] [bug] Session-level approval_level (OFF) not inherited by spawn_subagent child sessions`  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6506>
- **相关 PR #6508** `fix(agents): inherit session approval_level in spawn_subagent`  
  链接：<https://github.com/agentscope-ai/QwenPaw/pull/6508>

**背后诉求：**  
用户在主会话关闭审批后，子代理仍然继续弹审批，这会破坏自动化体验。  
这类问题直接影响 Mission Mode / `spawn_subagent` 场景的可用性，属于高优先级行为修复。

---

### 热点 3：模型提供方扩展
- **Issue #6490** `[OPEN] [Feature]: Add Volcengine Agent Plan and Xiaomi MiMo Standard API as built-in providers`  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6490>
- **Issue #6498** `[OPEN] [Feature] Add Atlas Cloud as a built-in model provider`  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6498>
- **相关 PR #6499** `[OPEN] [first-time-contributor] feat(models): add Atlas Cloud provider`  
  链接：<https://github.com/agentscope-ai/QwenPaw/pull/6499>

**背后诉求：**  
用户希望更多“即插即用”的 provider，而不是自己手工配置 OpenAI-compatible endpoint。  
这反映出 CoPaw 的用户已经从“尝鲜”转向“生产使用”，对**厂商适配、发现性、内置化**的要求明显提升。

---

### 热点 4：子代理列表与会话管理
- **Issue #6507** `[OPEN] [enhancement] [Feature]: Group or filter sub-agent sessions in chat history list`  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6507>
- **Issue #6509** `[OPEN] [enhancement] [Feature]: Support isolation between Sub Agents and complete isolation of sessions within a single Sub Agent`  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6509>

**背后诉求：**  
多代理场景已经从“能跑”进入“可管理”的阶段。  
用户开始关心：  
1. 子代理会话不要污染主聊天历史；  
2. 不同任务/不同用户之间要强隔离；  
3. 单个 Sub Agent 的会话资源也不能串档。  

这说明项目正在面对**真实多任务、多用户、多会话**场景的复杂性。

---

## 5) Bug 与稳定性

### 高优先级问题（按风险排序）

1. **#6505** `[OPEN] [Bug]: Mission Mode spawns unbounded sub-sessions`  
   链接：<https://github.com/agentscope-ai/QwenPaw/issues/6505>  
   风险：可能无限派生子会话，带来**成本失控、资源耗尽、任务雪崩**。  
   状态：**暂无对应 fix PR**（至少在本批数据中未出现）。

2. **#6506** `[OPEN] session-level approval_level 不继承到子会话`  
   链接：<https://github.com/agentscope-ai/QwenPaw/issues/6506>  
   风险：会导致本应自动执行的子任务频繁请求权限，破坏工作流连续性。  
   状态：已有 fix PR **#6508**  
   链接：<https://github.com/agentscope-ai/QwenPaw/pull/6508>

3. **#6496** `[OPEN] Legacy plugins silently disabled on QwenPaw 2.0+ due to implicit max version derivation`  
   链接：<https://github.com/agentscope-ai/QwenPaw/issues/6496>  
   风险：旧插件被“静默禁用”，属于**兼容性回归**，且不易被用户第一时间发现。  
   状态：已有 fix PR **#6497**  
   链接：<https://github.com/agentscope-ai/QwenPaw/pull/6497>

4. **#6501** `[OPEN] documented development install omits the test extra`  
   链接：<https://github.com/agentscope-ai/QwenPaw/issues/6501>  
   风险：影响贡献者安装链路与测试执行，属于**低危但高摩擦**问题。  
   状态：已有 fix PR **#6502**  
   链接：<https://github.com/agentscope-ai/QwenPaw/pull/6502>

### 已关闭但值得记录
- **#6494** `[CLOSED] 升级到 2 后老是问我要权限，请问是要改什么配置？`  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6494>  
  这更像是**配置/使用理解问题**，说明升级后审批策略对用户的可解释性仍需加强。

---

## 6) 功能请求与路线图信号

### 明确的功能诉求
1. **内置更多模型/服务提供方**
   - **#6490** Volcengine Agent Plan / Xiaomi MiMo Standard API  
     <https://github.com/agentscope-ai/QwenPaw/issues/6490>
   - **#6498** Atlas Cloud  
     <https://github.com/agentscope-ai/QwenPaw/issues/6498>
   - 对应 PR：**#6499**  
     <https://github.com/agentscope-ai/QwenPaw/pull/6499>

   **判断：**这类需求非常可能进入下一版本，因为它们直接提升产品覆盖面和落地能力。

2. **子代理治理能力增强**
   - **#6507** 会话分组/过滤  
     <https://github.com/agentscope-ai/QwenPaw/issues/6507>
   - **#6509** 子代理隔离与资源隔离  
     <https://github.com/agentscope-ai/QwenPaw/issues/6509>

   **判断：**这是多代理产品成熟化的标志，属于中短期高概率路线图项。

3. **会话审批策略与自动化体验**
   - **#6506** 子会话继承 approval_level  
     <https://github.com/agentscope-ai/QwenPaw/issues/6506>
   - 对应 PR：**#6508**  
     <https://github.com/agentscope-ai/QwenPaw/pull/6508>

   **判断：**如果该修复顺利合并，很可能成为下一轮稳定性补丁的一部分。

4. **安全与兼容性**
   - **#6500** 浏览器 CDP 暴露改为显式 opt-in  
     <https://github.com/agentscope-ai/QwenPaw/pull/6500>
   - **#6496** legacy 插件兼容修复  
     <https://github.com/agentscope-ai/QwenPaw/issues/6496>

   **判断：**这两类需求更偏“基础设施治理”，通常会被优先纳入补丁版本。

---

## 7) 用户反馈摘要

从今天的 Issue 和 PR 可以提炼出几个非常明确的用户痛点：

- **“默认行为必须和文档一致”**  
  贡献者希望安装、测试、开发流程一次成功，不想在文档和实际命令之间来回试错。  
  代表条目：**#6501 / #6502**  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6501> / <https://github.com/agentscope-ai/QwenPaw/pull/6502>

- **“自动化流程不能被多余权限打断”**  
  用户升级后仍然频繁被询问权限，尤其在子代理场景下会极大降低自动化价值。  
  代表条目：**#6494 / #6506 / #6508**  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6494> / <https://github.com/agentscope-ai/QwenPaw/issues/6506> / <https://github.com/agentscope-ai/QwenPaw/pull/6508>

- **“多代理可以强大，但必须可控、可隔离、可管理”**  
  用户已经开始在 Mission Mode、spawn_subagent、多会话协作中遇到会话串扰、历史混杂、资源互访等问题。  
  代表条目：**#6505 / #6507 / #6509**  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6505> / <https://github.com/agentscope-ai/QwenPaw/issues/6507> / <https://github.com/agentscope-ai/QwenPaw/issues/6509>

- **“生态适配要足够广，最好内置化”**  
  用户不断请求新的 provider，说明项目正在成为“多模型工作台”，而不是单一模型客户端。  
  代表条目：**#6490 / #6498 / #6499**  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6490> / <https://github.com/agentscope-ai/QwenPaw/issues/6498> / <https://github.com/agentscope-ai/QwenPaw/pull/6499>

---

## 8) 待处理积压

### 当前最值得维护者优先关注的开放项
1. **#6505** Mission Mode 子会话无限派生风险  
   <https://github.com/agentscope-ai/QwenPaw/issues/6505>  
   这是今天最需要关注的稳定性/成本风险点。

2. **#6509** 子代理隔离与会话完全隔离  
   <https://github.com/agentscope-ai/QwenPaw/issues/6509>  
   属于架构级治理问题，越早设计越好。

3. **#6507** 子代理会话在历史列表中分组/过滤  
   <https://github.com/agentscope-ai/QwenPaw/issues/6507>  
   直接影响可用性，且会随着自动化任务增多而迅速恶化。

4. **#6490** 新增内置 provider 请求  
   <https://github.com/agentscope-ai/QwenPaw/issues/6490>  
   反映用户增长诉求，值得纳入供给侧路线图。

### 待审 PR 积压也已形成
- **#6508** <https://github.com/agentscope-ai/QwenPaw/pull/6508>
- **#6502** <https://github.com/agentscope-ai/QwenPaw/pull/6502>
- **#6497** <https://github.com/agentscope-ai/QwenPaw/pull/6497>
- **#6500** <https://github.com/agentscope-ai/QwenPaw/pull/6500>
- **#6499** <https://github.com/agentscope-ai/QwenPaw/pull/6499>

**判断：**  
当前不是“无人维护”，而是“贡献很活跃、审查资源相对吃紧”。如果不及时消化这些 PR，后续问题与修复会进一步堆积。

---

### 总体结论

CoPaw 今天的信号很清晰：**产品在快速走向多代理化、可治理化和多 provider 化**。  
社区贡献积极，且问题大多来自真实使用场景，说明产品进入了更成熟的应用阶段。  
下一步最关键的不是“缺少需求”，而是**尽快合并高价值修复、处理子代理隔离与权限继承、控制 PR 堆积**。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报｜2026-07-28

## 1) 今日速览

过去 24 小时，ZeroClaw 仍处于**高活跃、强并行修复**状态：Issues 有 15 条更新，PR 有 35 条更新，说明维护节奏很快，但真正结束的 PR 只有 3 条，交付落地仍偏审慎。  
当前讨论重心集中在**稳定性、配置迁移、跨平台兼容、权限/安全边界**，而不是新增大功能。  
从信号上看，项目健康度总体良好：大量问题被显式打上 `accepted`、`in-progress`、`no-stale` 等状态，表明维护流程活跃且有跟进。  
但同时，**高优先级问题较多、待合并 PR 堆积明显**，短期内会给 review 和集成带来压力。  
总体判断：ZeroClaw 处于**“高活跃修复期”**，质量治理优先级高于功能扩张。

---

## 3) 项目进展

过去 24 小时内，已公开可见的“结束项”里，最重要的是以下 PR：

- **#9450 [closed] fix(deps): update nostr to 0.44.5**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/9450>  
  作用：升级 `nostr` 到 0.44.5，修复上游 **RUSTSEC-2026-0216** 的远程 DoS 风险，属于明确的安全维护收益。  
  价值判断：这是典型的“低风险、直接收益”合并，增强了项目供应链安全性。

结合 Issues 侧今天关闭的 **#9429**，可以看出团队正在持续清理 CI/测试稳定性问题，但从 PR 列表看，**已知还有 32 条 PR 处于待合并**，说明项目并非缺少产出，而是**审查与集成处于拥堵状态**。  
整体上，今日进展更多体现在**安全、测试、配置与跨平台适配**，而不是面向用户的大版本功能发布。

---

## 4) 社区热点

严格按你给出的数据看，**没有出现高评论/高点赞的“爆点”讨论**：多数 Issue/PR 评论数为 0 或 1，👍 也几乎为 0。  
因此今日“热点”更准确地说是**维护者集中处理的高优先级痛点**：

1. **Telegram 渠道预检只加 reaction、不回文本，用户会误以为代理失效**  
   Issue：#9465  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9465>  
   诉求：当 precheck 拒绝回复时，至少要给出可理解的文本反馈，而不是只留一个表情。

2. **`config init` / 配置迁移会生成无法被严格加载的配置，影响新装和升级用户**  
   Issue：#9436  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9436>  
   诉求：初始化结果必须“可直接用”，否则 onboarding 会被破坏。

3. **认证 profile 存储在字段重命名后加载失败，阻塞所有 auth 子命令**  
   Issue：#9474  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9474>  
   诉求：对旧存储做兼容迁移，避免升级后不可用。

4. **SOP 运行中缺少 operator cancellation 路径**  
   Issue：#9425  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9425>  
   诉求：运行中的工作流需要可控中止，否则会卡住运营与人工干预流程。

5. **安全工具 `vi_verify` 不应在没有链验证器时继续暴露给模型调用**  
   PR：#9472  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/9472>  
   诉求：把安全边界收紧，避免“看起来可用、实际上不可验证”的危险状态。

结论：今天社区关注点不是“争论型需求”，而是**“系统行为是否可信、是否可恢复、是否可迁移”**。

---

## 5) Bug 与稳定性

按严重程度和影响面排序，今日最值得关注的 Bug 如下：

### S1 / workflow blocked
- **#9474 auth profile store fails to load — `model_provider` required with no migration from pre-rename stores**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9474>  
  影响：`zeroclaw auth` 子命令直接失败，属于典型升级兼容问题。  
  状态：暂无可见 fix PR。

- **#9425 Running SOP jobs have no operator cancellation path**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9425>  
  影响：运行中的 SOP 无法取消，流程被动卡住。  
  状态：暂无可见 fix PR。

### S2 / degraded behavior
- **#9436 `config init` writes template sections that fail the strict loader**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9436>  
  影响：新配置生来“降级”，迁移命令退出 1。  
  Fix 线索：已有修复 PR **#9454**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/9454>

- **#9465 inbound channel message precheck declines but sender gets only reaction, no text**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9465>  
  影响：Telegram 场景下用户感知为“机器人坏了”。  
  状态：暂无可见 fix PR。

- **#9463 Wire WASM memory plugins into runtime backend selection**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9463>  
  影响：功能已存在但生产路径不可达，属于“能编译、不能用”。  
  状态：暂无可见 fix PR。

### CI / tests / release quality
- **#9462 zeroclaw-plugins lib unit tests behind `plugins-wasmtime` feature never execute in CI**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9462>  
  影响：测试覆盖存在盲区，可能放过回归。  
  状态：暂无可见 fix PR。

- **#9429 tests use fixed wall-clock timeouts as assertions, causing flakes on slow runners**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9429>  
  影响：CI 不稳定，易产生假失败。  
  当前：已关闭  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9429>

### Security / policy
- **#9460 Windows key-file ACLs at creation**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9460>  
  影响：密钥文件创建时的权限边界不够严。  
  状态：暂无可见 fix PR。

- **#9432 stop registering `vi_verify` as model-callable tool**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9432>  
  影响：安全工具暴露面过大。  
  Fix 线索：已有对应 PR **#9472**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/9472>

---

## 6) 功能请求与路线图信号

今天出现的功能/路线图信号，明显偏向**平台化与治理能力增强**：

- **Anthropic stored-profile OAuth alias contract**  
  Issue：#9464  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9464>  
  信号：说明认证与 provider 路由正在走向更清晰的契约化设计。  
  可能性：若 PR #9420 路径稳定，这类 RFC 很可能继续被纳入近期版本。

- **WASM memory plugins 接入 runtime backend selection**  
  Issue：#9463  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9463>  
  信号：这是明显的架构补全工作，属于中短期路线图候选。  
  可能性：与 runtime/backend 相关，优先级较高。

- **Containerfile 变更纳入 PR CI 校验**  
  Issue：#9456  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9456>  
  信号：CI 覆盖面扩展，偏工程治理。  
  可能性：若维护者强调发布一致性，这类改进大概率会进入下一轮。

- **v0.8.5 weekly non-breaking release tracker**  
  Issue：#9459  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9459>  
  信号：项目已经进入周期性发布编排阶段。  
  可能性：多数当前 PR 都在围绕这个 tracker 收敛，说明下一版本以稳定性和兼容性修复为主。

综合判断：**下一版本更像“修复+硬化+兼容性释放”，而不是大功能上线。**

---

## 7) 用户反馈摘要

从 Issues 的表述可以提炼出几类真实用户痛点：

1. **“能跑，但没反馈”会被认为是故障**  
   例如 #9465（Telegram 只发 reaction 不发文本）  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9465>  
   用户真正要的是“可解释的拒绝”，而不是沉默。

2. **升级兼容是高敏感区**  
   例如 #9474（auth store 字段重命名后直接坏掉）  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9474>  
   用户不接受“升级即失效”，说明迁移策略必须更稳。

3. **初始化结果必须可直接落盘、可立即使用**  
   例如 #9436（config init 产出严格 loader 不接受的模板）  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9436>  
   这类问题通常对新用户打击最大。

4. **运行中的任务必须可中断、可回收**  
   例如 #9425（SOP job 无取消路径）  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9425>  
   说明项目开始进入更重的生产使用场景。

5. **跨平台和 CI 稳定性正在成为“基础体验”而非附加项**  
   例如 #9429、#9462、#9455、#9467  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9429>  
   用户对 Windows/slow runner/fixture 可移植性的期待明显提高。

总体上，用户反馈传递出一个很清晰的信号：**ZeroClaw 已经从“能做功能”转向“必须足够可靠、可迁移、可治理”**。

---

## 8) 待处理积压

当前没有明显“长期沉默多天”的证据，但从今日快照看，仍有一批**高优先级、尚未闭环**的问题值得维护者优先盯住：

- **#9474** 认证存储迁移失败，属于阻塞型问题  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9474>

- **#9425** SOP 取消路径缺失，生产可操作性不足  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9425>

- **#9465** Telegram 场景下拒答无文本反馈，直接影响用户感知  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9465>

- **#9463** WASM memory backend 生产路径未打通  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9463>

- **#9462** CI 未覆盖到关键插件测试，存在回归盲区  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9462>

- **#9460** Windows 密钥文件 ACL 加固  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/9460>

同时，PR 侧也存在明显积压：
- **#9447** 依赖链较长、且标记了 `needs-author-action`  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/9447>
- **#9466 / #9454 / #9452 / #9449** 等多条 PR 也带有 `needs-author-action`  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/9466>  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/9454>  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/9452>  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/9449>

**维护建议**：优先清理“阻塞型 bug + 有现成 fix PR 的条目”，同时处理 `needs-author-action` 的 PR，能显著降低 review 堆积。

---

### 结论

ZeroClaw 今日的状态可以概括为：**高活跃、强修复、偏治理、重稳定**。  
项目在安全升级、配置正确性、跨平台兼容和测试可靠性上持续推进，但当前最需要关注的是：**高优先级问题较多、PR 积压较深、部分核心路径存在迁移和可操作性缺口**。  
如果下一阶段能把 `config/auth/CI/security` 这几条主线继续收敛，项目健康度会明显提升。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*