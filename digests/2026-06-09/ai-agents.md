# OpenClaw 生态日报 2026-06-09

> Issues: 52 | PRs: 45 | 覆盖项目: 13 个 | 生成时间: 2026-06-09 01:29 UTC

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

# OpenClaw 项目动态日报｜2026-06-09

## 1) 今日速览
过去 24 小时，OpenClaw 维持了**高强度迭代**：Issues 更新 52 条、PR 更新 45 条，并发布了 2 个新 beta 版本。  
从数据上看，项目处于“**问题密集暴露 + 快速修复推进**”阶段：Issue 侧有 34 条新开/活跃，18 条已关闭；PR 侧有 35 条待合并，10 条已合并/关闭。  
今天最突出的信号仍然是**消息投递可靠性、会话状态一致性、OAuth/MCP 兼容性、以及控制台性能**这几条主线，说明项目在多渠道/多模型/多协议接入下承压较大。  
整体健康度判断：**活跃度很高，修复响应也在持续，但稳定性债务仍然明显**。

---

## 2) 版本发布

### [v2026.6.5-beta.5](https://github.com/openclaw/openclaw/releases/tag/v2026.6.5-beta.5)
**主要更新：**
- QQBot 会在原生投递前剥离模型的 reasoning/thinking scaffolding，避免把原始 `<thinking>` 内容泄漏到频道回复中。
- MCP 工具结果的兼容性/规范化处理继续增强，覆盖 `resource_link`、`resource`、`audio`、异常图片等返回形态。

### [v2026.6.5-beta.3](https://github.com/openclaw/openclaw/releases/tag/v2026.6.5-beta.3)
**主要更新与 beta.5 同方向：**
- 同样包含 QQBot 的 thinking 内容剥离修复。
- 同样强化了 MCP 工具结果的形态兼容处理。

**破坏性变更/迁移注意：**
- 未见明确“breaking change”声明，但这两个 beta 都属于**行为层面修正**，对下游集成有实际影响：
  - 如果你的机器人/插件依赖原始 `<thinking>` 文本，升级后可能不再可见；
  - 如果你消费 MCP tool result 的结构，需确认对资源字段和异常图片的兼容性处理正常；
  - 建议对 QQBot、MCP 相关路径做一次回归测试。

---

## 3) 项目进展

今天最值得关注的已关闭 PR 主要有两项：

- [PR #91531](https://github.com/openclaw/openclaw/pull/91531)  
  **perf(control-ui): reuse startup model metadata**  
  作用：减少 Control UI 启动时的额外模型元数据 RPC，降低 chat startup 的冷启动延迟。  
  意义：这是一个面向用户体感的性能优化，能直接改善“打开即等”的问题。

- [PR #91496](https://github.com/openclaw/openclaw/pull/91496)  
  **chore: bump Codex app-server to 0.137.0**  
  作用：升级 Codex app-server 版本并刷新相关生成协议资产。  
  意义：体现项目对 Codex 生态兼容性的持续跟进，属于基础设施型推进。

**整体推进评价：**
- 今日已关闭 PR 以**性能优化**和**集成依赖升级**为主，说明主线仍在稳步推进；
- 结合今日开放 PR 的方向，项目当前明显在同时推进：
  - 可靠性修复
  - 启动/交互性能优化
  - 多渠道集成兼容
  - QA/测试基础设施建设

---

## 4) 社区热点

今天讨论最集中的内容并不是单一“大爆点”，而是**多个高优先级生产问题并行**，评论数最高的条目大多在 2–3 条之间，说明社区反馈较分散但都很具体。

### 热点 Issues
- [#91482](https://github.com/openclaw/openclaw/issues/91482)  
  **dir_list exposed without usable node context**  
  诉求：避免把不可用的节点目录能力暴露给模型，防止模型“猜错节点”后产生错误行为。  
  背后反映的是：**工具面向模型的暴露必须与真实运行态严格一致**。

- [#91362](https://github.com/openclaw/openclaw/issues/91362)  
  **cron sessions do not inherit agents.defaults.model.fallbacks**  
  诉求：全局模型回退配置在隔离 cron 会话里也要一致继承。  
  背后反映的是：**配置继承一致性**对自动化任务非常关键。

- [#91434](https://github.com/openclaw/openclaw/issues/91434)  
  **LM Studio sessions start without tools**  
  诉求：工具型会话不能“悄悄启动但没工具”，应当显式警告或回退。  
  背后反映的是：用户对**fail-fast** 和可观测性要求很高。

- [#91433](https://github.com/openclaw/openclaw/issues/91433)  
  **MCP remote OAuth: streamable-http servers fail**  
  诉求：远程 MCP + OAuth 必须能连通，且错误要可读、可定位。  
  背后反映的是：**MCP 生态兼容性**已成为外部集成的核心痛点。

- [#91445](https://github.com/openclaw/openclaw/issues/91445)  
  **WhatsApp Desktop reply bubble doesn’t render**  
  诉求：消息“发出去了”不等于“用户看得见”，渲染链路同样重要。  
  背后反映的是：**消息投递成功率与 UI 呈现**被用户视为同等重要。

### 热点相关 PR
- [#91541](https://github.com/openclaw/openclaw/pull/91541)  
  对应修复 #91445，说明社区问题能快速被转成修复分支，响应链路较快。
- [#91523](https://github.com/openclaw/openclaw/pull/91523)  
  对应性能问题 #91517，说明 CPU/读盘瓶颈已进入修复周期。
- [#91451](https://github.com/openclaw/openclaw/pull/91451)  
  对应 MCP/OAuth 类问题，说明外部协议兼容性问题正在被系统性处理。

---

## 5) Bug 与稳定性

按严重程度排序，今天最值得警惕的稳定性问题如下：

### P0 / 生产级高风险
- [#91440](https://github.com/openclaw/openclaw/issues/91440)  
  **Dashboard Stop 可能损坏 session 文件 + 权限隔离缺少护栏**  
  风险：涉及数据损坏与权限隔离，属于最高优先级。  
  **状态：未见明确 fix PR。**

### P1 / 强影响、可能导致会话或消息链路异常
- [#91537](https://github.com/openclaw/openclaw/issues/91537)  
  **Codex yolo mode 泄漏 app-server 进程和 binding 文件**  
  风险：资源泄漏、配额耗尽、文件污染。  
  **状态：未见 fix PR。**

- [#91530](https://github.com/openclaw/openclaw/issues/91530)  
  **Telegram replies 可能“看似发送成功”但实际消失**  
  风险：消息丢失，且本地状态误判为成功。  
  **状态：未见 fix PR。**

- [#91527](https://github.com/openclaw/openclaw/issues/91527)  
  **subagent announce 仍可 3 次重复**  
  风险：重复消息、交互污染。  
  **状态：未见 fix PR。**

- [#91420](https://github.com/openclaw/openclaw/issues/91420)  
  **delivery retry loop 可能污染活跃 session**  
  风险：重试逻辑破坏 session，属于消息与会话状态双重风险。  
  **状态：未见 fix PR。**

- [#91434](https://github.com/openclaw/openclaw/issues/91434)  
  **LM Studio 会话启动时没有工具**  
  风险：工具依赖型任务会“静默失败”。  
  **状态：未见 fix PR。**

- [#91428](https://github.com/openclaw/openclaw/issues/91428)  
  **Ollama 下只渲染第一个 token/word**  
  风险：输出截断，直接影响可用性。  
  **状态：未见 fix PR。**

- [#91489](https://github.com/openclaw/openclaw/issues/91489)  
  **Windows child_process spawn claude 失败（.cmd 处理缺失）**  
  风险：Windows 环境下命令启动失败。  
  **状态：未见 fix PR。**

### P1 / 已出现对应修复 PR 的问题
- [#91433](https://github.com/openclaw/openclaw/issues/91433)  
  **MCP remote OAuth streamable-http 连接失败**  
  **相关 fix PR：** [#91451](https://github.com/openclaw/openclaw/pull/91451)

- [#91517](https://github.com/openclaw/openclaw/issues/91517)  
  **getSubagentRunsSnapshotForRead 频繁全量重读 SQLite，CPU 飙高**  
  **相关 fix PR：** [#91523](https://github.com/openclaw/openclaw/pull/91523)

- [#91445](https://github.com/openclaw/openclaw/issues/91445)  
  **WhatsApp Desktop quote reply bubble 不渲染**  
  **相关 fix PR：** [#91541](https://github.com/openclaw/openclaw/pull/91541)

### P2 / 仍需跟进的功能性 bug
- [#91532](https://github.com/openclaw/openclaw/issues/91532)  
  cron isolated session 误判失败
- [#91525](https://github.com/openclaw/openclaw/issues/91525)  
  macOS 下 exec 子进程 XPC_SERVICE_NAME 异常
- [#91522](https://github.com/openclaw/openclaw/issues/91522)  
  WSL2 下 member-info fetch failed 回归
- [#91460](https://github.com/openclaw/openclaw/issues/91460)  
  tool-result 截断导致请求 schema 非法
- [#91497](https://github.com/openclaw/openclaw/issues/91497)  
  memory index meta 未写入
- [#91492](https://github.com/openclaw/openclaw/issues/91492)  
  post-compaction guard 持锁过久
- [#91485](https://github.com/openclaw/openclaw/issues/91485)  
  inter-session 消息泄漏到主 session

**稳定性判断：**
- 今天的 bug 主题非常集中在 **“表面成功、实际失败”** 类型问题；
- 这类问题对用户信任伤害最大，因为它们往往不会直接报错，而是悄悄丢消息、错状态、错渲染；
- 好消息是，部分高影响问题已经有明确修复 PR，说明团队对核心事故类问题的响应速度还不错。

---

## 6) 功能请求与路线图信号

今天的新功能需求很明确，且大多和“更像生产工具”有关：

- [#91534](https://github.com/openclaw/openclaw/issues/91534)  
  **cron 增加 `--command`，支持纯 shell 执行**  
  信号：用户希望 cron 任务能绕过 agent turn，减少延迟和成本。  
  **路线图判断：高概率进入下一版本候选。**

- [#91475](https://github.com/openclaw/openclaw/issues/91475)  
  **claude-cli 支持 ultracode（xhigh + dynamic workflows）**  
  信号：用户在追求更高强度的 Claude 工作流能力。  
  **路线图判断：中高优先级，偏能力扩展。**

- [#91504](https://github.com/openclaw/openclaw/issues/91504)  
  **OpenRouter 支持更多 image generation 模型**  
  信号：图像生成能力正从“可用”走向“模型矩阵扩展”。  
  **路线图判断：中优先级，取决于 OpenRouter 适配成本。**

- [#91498](https://github.com/openclaw/openclaw/issues/91498)  
  **同一 provider 下不同 runtime/alias 使用不同 auth profile**  
  信号：企业/多环境用户对认证隔离的需求增强。  
  **路线图判断：偏平台能力，可能进入中期规划。**

- [#91518](https://github.com/openclaw/openclaw/issues/91518)  
  **Slack 增加 durable inbound receive journal**  
  信号：用户已开始要求 Slack 与 Telegram 一样具备重启抗丢能力。  
  **路线图判断：如果 Slack 是重点渠道，这类可靠性增强很可能上升为优先级。**

- [#91416](https://github.com/openclaw/openclaw/issues/91416)  
  **Control UI 增加 session 状态切换（all / running）**  
  信号：历史会话可见性是用户强需求，偏管理体验。  
  **路线图判断：UI 可用性优化，落地概率高。**

**结合已有 PR 判断，下一版本更可能纳入的方向：**
- [#91541](https://github.com/openclaw/openclaw/pull/91541) —— WhatsApp 回复泡泡修复
- [#91523](https://github.com/openclaw/openclaw/pull/91523) —— CPU/读盘瓶颈修复
- [#91451](https://github.com/openclaw/openclaw/pull/91451) —— MCP OAuth 兼容修复
- [#91538](https://github.com/openclaw/openclaw/pull/91538) —— Control UI 启动性能优化
- [#91529](https://github.com/openclaw/openclaw/pull/91529) —— 截图/转录图像脱敏修复

---

## 7) 用户反馈摘要

从今天的 Issue 反馈中，可以提炼出几个非常真实的用户痛点：

1. **“成功”不能只是本地成功，必须端到端成功**  
   用户多次反馈“会话看起来执行了，但消息没发出去 / bubble 没显示 / 结果为空”。  
   代表性条目：  
   - [#91530](https://github.com/openclaw/openclaw/issues/91530)  
   - [#91445](https://github.com/openclaw/openclaw/issues/91445)  
   - [#91394](https://github.com/openclaw/openclaw/issues/91394)

2. **自动化任务需要稳定、可继承、可复现的配置**  
   cron / isolated session / fallback / session target 等场景反复暴露配置继承问题。  
   代表性条目：  
   - [#91362](https://github.com/openclaw/openclaw/issues/91362)  
   - [#91532](https://github.com/openclaw/openclaw/issues/91532)  
   - [#91420](https://github.com/openclaw/openclaw/issues/91420)

3. **集成生态很广，但协议边界很脆弱**  
   LM Studio、Ollama、MCP、ACP、Telegram、WhatsApp、Slack、Discord 都在今天的反馈里出现。  
   这说明用户已经把 OpenClaw 用成一个**多渠道 AI 编排层**，任何单点兼容问题都会放大。

4. **性能问题开始直接影响可用性**  
   CPU 打满、启动等待、compaction 锁持有、SQLite 重读等问题，已经不是“慢一点”而是“能不能用”。  
   代表性条目：  
   - [#91517](https://github.com/openclaw/openclaw/issues/91517)  
   - [#91538](https://github.com/openclaw/openclaw/pull/91538)  
   - [#91492](https://github.com/openclaw/openclaw/issues/91492)

5. **用户并不反对复杂能力，但要求默认安全**  
   例如思考链路、工具结果、媒体内容、OAuth 错误、权限边界都被频繁提及。  
   说明用户希望系统“更聪明”，但前提是**不泄漏、不误发、不静默失败**。

---

## 8) 待处理积压

以下是今天数据里最值得维护者持续盯住的高优先级积压项，当前**未见明确 fix PR** 或仍在等待进一步验证：

### 高优先级开放 Issue
- [#91440](https://github.com/openclaw/openclaw/issues/91440) — P0 数据损坏/权限隔离
- [#91537](https://github.com/openclaw/openclaw/issues/91537) — P1 进程泄漏
- [#91530](https://github.com/openclaw/openclaw/issues/91530) — P1 消息丢失
- [#91527](https://github.com/openclaw/openclaw/issues/91527) — P1 重复消息
- [#91420](https://github.com/openclaw/openclaw/issues/91420) — P1 重试污染 session
- [#91434](https://github.com/openclaw/openclaw/issues/91434) — P1 工具缺失
- [#91428](https://github.com/openclaw/openclaw/issues/91428) — P1 输出截断
- [#91489](https://github.com/openclaw/openclaw/issues/91489) — P1 Windows 启动失败
- [#91532](https://github.com/openclaw/openclaw/issues/91532) — P2 误判失败
- [#91525](https://github.com/openclaw/openclaw/issues/91525) — P2 macOS 子进程异常
- [#91460](https://github.com/openclaw/openclaw/issues/91460) — P2 tool schema 损坏

### 仍在等待推进的开放 PR
- [#91541](https://github.com/openclaw/openclaw/pull/91541) — WhatsApp 修复
- [#91523](https://github.com/openclaw/openclaw/pull/91523) — CPU 性能修复
- [#91451](https://github.com/openclaw/openclaw/pull/91451) — MCP OAuth 修复
- [#91529](https://github.com/openclaw/openclaw/pull/91529) — 图像脱敏修复
- [#91538](https://github.com/openclaw/openclaw/pull/91538) — 启动性能优化
- [#91535](https://github.com/openclaw/openclaw/pull/91535) — Skill Workshop RPC 路由修正

**维护建议：**
- 优先清理 **P0/P1 的“静默失败”类问题**；
- 对消息投递、会话状态、OAuth/MCP、工具可用性做统一回归矩阵；
- 将“表面成功但实际失败”的问题作为本阶段稳定性主攻方向。

---

如果你愿意，我可以把这份日报进一步整理成：
1. **适合发 Slack/Telegram 的简版**，或  
2. **适合内部周会的管理层摘要版**。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析（2026-06-09）

## 1) 生态全景
过去 24 小时，这个生态整体呈现出一个很清晰的阶段性特征：**从“功能跑通”转向“生产可用”**。高活跃项目普遍在处理消息投递可靠性、会话状态一致性、OAuth/MCP 兼容性、性能与桌面体验等问题，说明真实用户已经把这些项目用于多渠道、多模型、多协议的生产场景。  
同时，生态内部已经分化出两类项目：一类是 **高频迭代的综合型平台**（如 OpenClaw、Hermes Agent、ZeroClaw、CoPaw），另一类是 **偏工程质量/安全治理/单点能力补强** 的项目（如 PicoClaw、NanoClaw、LobsterAI）。  
整体来看，行业关注点已不再是“能不能回答”，而是“**是否端到端成功、是否可控、是否可恢复、是否可审计**”。  
这意味着开源 AI 智能体生态正在进入真正的工程化竞争阶段。

---

## 2) 各项目活跃度对比

| 项目 | Issues 数 | PR 数 | Release 情况 | 健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 52 | 45 | 2 个 beta（v2026.6.5-beta.3 / beta.5） | **高活跃**；修复密集，稳定性债务仍明显 |
| **NanoBot** | 1 | 5 | 无 | **活跃但轻量**；以功能增强和回归修复为主 |
| **Hermes Agent** | 50 | 50 | 无 | **高活跃**；多线并行，评审/合并压力较大 |
| **PicoClaw** | 0 | 11 | 无 | **维护型活跃**；以质量加固和稳定性修复为主 |
| **NanoClaw** | 1 | 2 | 无 | **低到中活跃**；安全硬化与可用性问题并行 |
| **NullClaw** | 0 | 0 | 无 | **无活动** |
| **IronClaw** | 10 | 35 | 无 | **高活跃**；安全治理、兼容性和架构收敛并进 |
| **LobsterAI** | 0 | 4 | 无 | **低噪声维护**；聚焦登录链路和数据恢复可靠性 |
| **TinyClaw** | 0 | 0 | 无 | **无活动** |
| **Moltis** | 0 | 0 | 无 | **无活动** |
| **CoPaw** | 6 | 8 | 无 | **高活跃**；反馈密集，稳定性是主轴 |
| **ZeptoClaw** | 0 | 0 | 无 | **无活动** |
| **ZeroClaw** | 7 | 29 | 无 | **高活跃**；回归修复多，主干整合压力较大 |

> 注：这里的 PR/Issues 指当日更新/活跃量；OpenClaw、Hermes、ZeroClaw、IronClaw 处于第一梯队，PicoClaw/LobsterAI/NanoClaw 更偏质量巩固型。

---

## 3) OpenClaw 在生态中的定位

### 优势
- **集成面最广之一**：围绕 QQ/WhatsApp/Telegram/Slack/MCP/OAuth/LM Studio/Ollama 等多渠道与多协议问题密集出现，说明它是一个真正的**多渠道 AI 编排层**，不是单一聊天机器人。
- **问题到修复的响应快**：热点 Issue 很快能转成修复 PR，且当天就有 2 个 beta 发布，表明它具备较强的**工程闭环能力**。
- **生态代表性强**：它暴露的问题类型最“全”——投递可靠性、会话状态、OAuth/MCP、性能、UI、跨平台兼容都在同一天集中出现，说明其社区覆盖了最广的真实使用场景。

### 技术路线差异
OpenClaw 更像是 **“控制平面 + 协议适配器 + 运行时编排”** 的综合型平台：  
- 重点不只是模型调用，而是消息、会话、工具、渠道、认证、渲染的一整套链路；
- 修复方向明显偏向**端到端可靠性**与**跨协议一致性**。

与其他项目相比：
- 比 **NanoBot** 更偏平台化和多渠道；
- 比 **Hermes Agent** 更强调消息/协议接入与投递一致性；
- 比 **IronClaw** 更偏产品运行层，而不是纯安全治理；
- 比 **PicoClaw** 更活跃、更外向，生态压力也更大。

### 社区规模对比
从当日更新量看，OpenClaw 的规模属于**第一梯队**，与 Hermes Agent 接近（52/45 vs 50/50）。  
但 OpenClaw 的社区讨论更分散、覆盖面更广，且有明确 beta 发布节奏，说明它的**外部影响面和集成面更大**，是观察整个生态成熟度的典型样本。

---

## 4) 共同关注的技术方向

### 1. 端到端可靠性与会话一致性
**涉及项目**：OpenClaw、Hermes Agent、CoPaw、ZeroClaw、LobsterAI、NanoClaw  
**共同诉求**：
- 不能只看“本地执行成功”，要看消息是否真正投递、UI 是否真正渲染、状态是否真正同步；
- 会话恢复、删除、切换、重试不能污染历史或产生“看似成功、实际失败”的状态。

### 2. 多模型路由与按会话/运行时配置
**涉及项目**：OpenClaw、NanoBot、Hermes Agent、IronClaw、ZeroClaw、CoPaw  
**共同诉求**：
- 按会话切换模型、按 runtime/alias 使用不同 auth profile；
- 模型 provider、fallback、max input length、switch profile 等配置要和真实会话强绑定；
- 用户希望系统支持**任务级别的模型选择**，而不是全局单配置。

### 3. 安全边界与权限治理
**涉及项目**：OpenClaw、IronClaw、NanoClaw、CoPaw  
**共同诉求**：
- egress lockdown、credential boundary、OAuth 安全、keychain 隔离；
- 让 agent “能做事”之前先“不能越界”；
- 尤其在外部工具、Webhook、审批流、自生成工具场景里，安全默认值正在变成核心卖点。

### 4. 可观测性与可诊断性
**涉及项目**：Hermes Agent、OpenClaw、PicoClaw、LobsterAI、IronClaw  
**共同诉求**：
- 需要 usage/token/cost、登录回调诊断、health check、错误包装、parse error 语义；
- 生态开始从“能跑”进入“**能排障、能计费、能解释**”阶段。

### 5. 性能与桌面/终端体验
**涉及项目**：Hermes Agent、CoPaw、OpenClaw、ZeroClaw、LobsterAI  
**共同诉求**：
- 启动速度、UI 卡顿、TUI 可读性、窗口聚焦、长连接超时、切换响应；
- 用户对体验细节的容忍度在下降，性能问题已直接影响可用性。

---

## 5) 差异化定位分析

### 按项目定位看
- **OpenClaw**：多渠道、多协议、强编排的综合型 AI 助手平台，偏“生态中枢”。
- **Hermes Agent**：Desktop + Gateway + 多平台适配，强调国际化、可观测性和复杂工作流支持。
- **IronClaw**：偏企业级治理和安全边界，重视 credential、egress、tenant、hook audit 等基础设施控制。
- **CoPaw**：更偏“用户可用、上手舒服”的消费级/准生产级 Agent 工具，兼顾插件生态和多 agent 体验。
- **ZeroClaw**：TUI/配置/运行时一致性更强，偏命令行和运维可控场景。
- **NanoBot**：更轻量，聚焦会话级模型选择和内容渲染能力，偏“单机/单用户多模型助手”。
- **PicoClaw / LobsterAI / NanoClaw**：更偏专项修复或安全/恢复/通道能力完善，工程质量导向更明显。
- **NullClaw / TinyClaw / Moltis / ZeptoClaw**：当前无可见活动，暂不具备足够对比样本。

### 目标用户差异
- **OpenClaw / Hermes / IronClaw / ZeroClaw**：面向重度用户、维护者、平台型集成者；
- **CoPaw / NanoBot**：更接近个人生产力、轻量工作流、模型试验用户；
- **PicoClaw / LobsterAI / NanoClaw**：偏具体通道、企业部署或安全治理场景。

### 架构差异
- **OpenClaw、Hermes**：更像全栈编排平台；
- **IronClaw**：更像治理层/策略层；
- **ZeroClaw**：更像终端驱动的运行时控制台；
- **NanoBot**：更像轻量助手内核；
- **CoPaw**：更偏产品化工作台；
- **PicoClaw、LobsterAI、NanoClaw**：更偏垂直能力和工程质量补强。

---

## 6) 社区热度与成熟度

### 快速迭代阶段
- **OpenClaw**：高 Issue / 高 PR / 有 beta 发布，明显处于高频修复和快速演进阶段。
- **Hermes Agent**：Issue 与 PR 都是 50 级别，讨论广、修复多，处于高压迭代期。
- **ZeroClaw**：PR 多、Issue 也不少，正在进行较强的主干整合。
- **CoPaw**：反馈密度高，围绕学习循环、多 agent、性能卡顿在快速打磨。
- **IronClaw**：虽然更偏治理，但 PR 密集，说明仍是强迭代状态。

### 质量巩固阶段
- **PicoClaw**：几乎无 Issue，PR 以稳定性修复为主，明显偏工程质量巩固。
- **LobsterAI**：少量 PR 集中在登录和数据恢复，属于典型的可用性修补阶段。
- **NanoClaw**：当前聚焦安全与多模态输入缺陷修复，属于边缘能力补课期。
- **NanoBot**：体量小、节奏稳，偏功能精修与体验完善。

### 低活跃/空白
- **NullClaw、TinyClaw、Moltis、ZeptoClaw**：无可见活动，暂不纳入成熟度比较。

---

## 7) 值得关注的趋势信号

### 1. “表面成功”正在被系统性纠偏
多个项目都在处理“消息发出但用户看不到”“任务执行但状态没变”“会话启动但工具缺失”“登录完成但窗口没回来”这类问题。  
**参考项目**：OpenClaw、Hermes Agent、CoPaw、ZeroClaw、LobsterAI、NanoClaw  
**行业意义**：AI 智能体正在从“单步成功”走向“端到端成功”指标体系。

### 2. 多模型/多后端已成为默认需求
按会话切模型、按 runtime 切 auth profile、provider 切换、fallback 继承、模型列表完整性，已经是多个项目同时面对的问题。  
**参考项目**：OpenClaw、NanoBot、Hermes Agent、IronClaw、ZeroClaw  
**行业意义**：未来助手产品的核心不是“一个模型”，而是“**模型路由策略**”。

### 3. 安全与权限边界从附加项变成主功能
egress lockdown、credential boundary、OAuth 流程、keychain 隔离、审批上下文、WebAuthn/Passkey，都在快速前移。  
**参考项目**：IronClaw、NanoClaw、OpenClaw、CoPaw  
**行业意义**：AI Agent 的可用性正在被“可控性”重新定义。

### 4. 可观测性和成本透明度成为采用门槛
token、cost、usage、health check、diagnostics、parse error 语义被频繁提及。  
**参考项目**：Hermes Agent、IronClaw、PicoClaw、LobsterAI、OpenClaw  
**行业意义**：开发者和企业用户都在要求“能看清、能计量、能解释”。

### 5. 桌面端与终端端体验仍是主战场
启动速度、卡顿、窗口聚焦、TUI 主题、locale 生效、长连接超时等问题频发。  
**参考项目**：Hermes Agent、CoPaw、ZeroClaw、LobsterAI、OpenClaw  
**行业意义**：Agent 产品的竞争已不只是后端能力，而是**交互链路的完整体验**。

### 6. Agent 正从“聊天工具”演化为“工作流编排层”
cron、automation run history、plugin market、voice pipeline、learning loop、subagent durability 等信号表明，项目们正在把 Agent 做成可运行、可审计、可扩展的工作流系统。  
**参考项目**：CoPaw、ZeroClaw、IronClaw、OpenClaw、Hermes Agent  
**行业意义**：AI 智能体的产品边界正在从对话框扩展到任务系统。

---

如果你需要，我可以继续把这份分析压缩成：
1. **适合管理层周会的 1 页摘要版**，或  
2. **适合开发团队落地讨论的“趋势 + 机会点”行动清单版**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-06-09）

## 1) 今日速览
过去 24 小时，NanoBot 处于**高开发活跃、低发布节奏**状态：新增/活跃 Issue 1 条，开放 PR 5 条，且没有新版本发布。  
从内容看，社区与贡献者的关注点主要集中在**模型路由灵活性、消息/内存稳定性、WebUI 可用性和数学公式渲染**。  
今天没有已合并/关闭的 PR，说明**实际落地变更为 0**，但提交质量较高，属于“功能与稳定性并进”的典型开发日。  
整体健康度评估：**积极活跃，需求明确，当前以功能增强和回归修复为主，未见版本级风险信号。**

---

## 2) 版本发布
**今日无新版本发布。**

- 最新 Releases：无  
- 影响判断：当前项目仍处于连续提交、尚未形成新发布包的阶段，用户若要获取最新改动，需要关注后续 PR 合并情况与下一次 release。

---

## 3) 项目进展
**今日无已合并/关闭的重要 PR。**  
不过，过去 24 小时内新增的 5 个开放 PR，已经把项目推进到了几个关键方向：

1. **消息处理稳定性提升**  
   - [#4257 fix(utils): make split_message fenced-code-block-aware](https://github.com/HKUDS/nanobot/pull/4257)  
   解决长消息拆分时误切进 fenced code block 的问题，避免 HTML 渲染破损。

2. **会话历史与记忆一致性修复**  
   - [#4256 fix(memory): keep history cursor monotonic](https://github.com/HKUDS/nanobot/pull/4256)  
   修复 `MemoryStore` 游标不单调、历史压缩后 cursor 回退等问题，降低历史错乱风险。

3. **WebUI 可视化增强**
   - [#4255 feat(webui): version badge with real-time PyPI update notifications](https://github.com/HKUDS/nanobot/pull/4255)  
   为 WebUI 增加版本徽标与更新提醒，提升用户对新版本的感知。

4. **Token 估算准确性提升**
   - [#4254 Apply microcompaction when estimating session prompt tokens (#4222)](https://github.com/HKUDS/nanobot/pull/4254)  
   修复 `/status` 与会话 token 估算偏差，避免与实际送模前状态不一致。

5. **WebUI Markdown/公式渲染增强**
   - [#4252 fix(webui): render TeX math delimiters](https://github.com/HKUDS/nanobot/pull/4252)  
   增加 TeX 数学公式分隔符支持，改善技术类内容展示体验。

**整体推进判断：**  
今天的开发重心不是“发版”，而是围绕**稳定性、可观测性、渲染能力、模型使用灵活性**做增强。若这些 PR 后续合并，项目会在**交互质量与核心运行可靠性**上有一轮明显提升。

---

## 4) 社区热点
今日讨论最活跃、评论最多的条目是：

- [#4253 [OPEN] [enhancement] support overriding model per conversation](https://github.com/HKUDS/nanobot/issues/4253)

### 热点分析
该 Issue 的核心诉求是：**希望能按会话覆盖全局模型设置**。  
提出者明确表达了两类典型模型使用场景：

- **openrouter**：能力强、速度快，适合高效率任务
- **本地 llamacpp**：私有、慢、便宜，适合隐私敏感任务

这说明用户并不满足于“全局一个模型”的模式，而是希望 NanoBot 支持**按任务动态切换推理后端**。  
背后的真实诉求是：**隐私、成本、响应速度之间的权衡需要更细粒度的控制**。

### 其他值得关注的讨论/提案
- [#4255 version badge with real-time PyPI update notifications](https://github.com/HKUDS/nanobot/pull/4255)  
  体现出用户对**版本可见性和升级提醒**的需求。
- [#4252 render TeX math delimiters](https://github.com/HKUDS/nanobot/pull/4252)  
  指向文档/技术场景用户对**数学公式渲染**的需求。

---

## 5) Bug 与稳定性
今日未见独立的高严重度 bug Issue；但有 3 个明显属于**稳定性/回归修复**方向的 PR，按潜在影响排序如下：

### 1. 历史一致性风险
- [#4256 fix(memory): keep history cursor monotonic](https://github.com/HKUDS/nanobot/pull/4256)  
  **严重性：高**  
  说明：历史 cursor 可能在 stale / compacted / negative 等情况下出现不单调，影响会话记忆与历史检索一致性。  
  **是否已有 fix PR：是**，当前已由该 PR 提出修复。

### 2. 渲染破损风险
- [#4257 fix(utils): make split_message fenced-code-block-aware](https://github.com/HKUDS/nanobot/pull/4257)  
  **严重性：中高**  
  说明：长消息拆分可能切断 fenced code block，导致 HTML 结构破损或代码块显示异常。  
  **是否已有 fix PR：是**。

### 3. 状态估算偏差
- [#4254 Apply microcompaction when estimating session prompt tokens (#4222)](https://github.com/HKUDS/nanobot/pull/4254)  
  **严重性：中**  
  说明：`/status` 和 token 估算可能基于未 microcompact 的历史，导致“看起来可发、实际可能超限”的不一致。  
  **是否已有 fix PR：是**。

### 补充
- 当前没有看到崩溃、数据丢失或安全相关告警的直接证据。  
- 现阶段稳定性问题更多是**一致性、渲染和估算准确性**，属于“会影响体验，但尚未上升为灾难性故障”的类型。

---

## 6) 功能请求与路线图信号
今日出现的功能信号较清晰，以下几项值得纳入下一版本评估：

### 高优先级候选：按会话覆盖模型
- [#4253 support overriding model per conversation](https://github.com/HKUDS/nanobot/issues/4253)  
  **路线图信号：强**  
  原因：这是明确的用户工作流需求，且直接关联隐私、成本与性能三者平衡。  
  若实现得当，可能成为 NanoBot 在“多模型智能体编排”上的关键能力。

### 中高优先级候选：WebUI 更新提醒
- [#4255 version badge with real-time PyPI update notifications](https://github.com/HKUDS/nanobot/pull/4255)  
  **路线图信号：中强**  
  原因：提升产品可感知性，减少用户错过更新。属于低风险、用户可见度高的增强项。

### 中优先级候选：TeX 数学渲染
- [#4252 fix(webui): render TeX math delimiters](https://github.com/HKUDS/nanobot/pull/4252)  
  **路线图信号：中**  
  原因：面向知识型/研究型用户，改善内容表达质量，对 WebUI 体验提升明显。

### 偏稳定性修复，不属于功能主线但很重要
- [#4256 history cursor monotonic](https://github.com/HKUDS/nanobot/pull/4256)
- [#4257 fenced-code-block-aware split_message](https://github.com/HKUDS/nanobot/pull/4257)
- [#4254 microcompaction token estimation](https://github.com/HKUDS/nanobot/pull/4254)

这些 PR 更像是下一次发版前的“质量底盘”。

---

## 7) 用户反馈摘要
从当前 Issues 的表达来看，用户反馈主要集中在**模型选择粒度不够细**：

- 用户希望对不同会话使用不同模型配置，而不是被全局设置绑定。
- 典型使用场景是：
  - **高敏感任务**：优先本地模型，强调私密性
  - **高时效任务**：优先在线高性能模型，强调速度与能力
- 这说明 NanoBot 已经进入“多模型并用”的真实生产/准生产场景，用户不再只把它当作单一聊天工具，而是当作**工作流助手**。

当前可见的满意点较少，但可以推断出用户对以下方向有期待：
- 更灵活的模型路由
- 更透明的版本更新提示
- 更稳定的消息与历史处理
- 更好的技术内容渲染能力

相关链接：
- [#4253 support overriding model per conversation](https://github.com/HKUDS/nanobot/issues/4253)
- [#4255 version badge with real-time PyPI update notifications](https://github.com/HKUDS/nanobot/pull/4255)
- [#4252 render TeX math delimiters](https://github.com/HKUDS/nanobot/pull/4252)

---

## 8) 待处理积压
从当前数据看，**没有明显长期未响应的老 Issue / PR**：全部条目均在 2026-06-08 创建或更新，尚属“新鲜积压”。  
不过，以下条目值得维护者持续盯紧，因为它们分别对应产品核心能力或稳定性底座：

- [#4253 按会话覆盖模型](https://github.com/HKUDS/nanobot/issues/4253) —— 直接关系到多模型工作流
- [#4256 记忆游标单调性](https://github.com/HKUDS/nanobot/pull/4256) —— 关系历史一致性
- [#4257 分块拆消息与代码块兼容](https://github.com/HKUDS/nanobot/pull/4257) —— 关系渲染完整性
- [#4254 token 估算与 microcompaction](https://github.com/HKUDS/nanobot/pull/4254) —— 关系状态准确性
- [#4255 WebUI 版本提醒](https://github.com/HKUDS/nanobot/pull/4255) —— 关系升级触达
- [#4252 TeX 公式渲染](https://github.com/HKUDS/nanobot/pull/4252) —— 关系专业内容体验

### 总结判断
- **暂无长期堆积信号**
- **但存在一批高价值、短周期内应决策的开放项**
- 若这些 PR/Issue 能在下一轮集中处理，NanoBot 会在“可用性 + 稳定性 + 多模型能力”上形成明显跃升

---

如需，我可以继续把这份日报整理成：
1. **适合发布到内部周报的精简版**，或  
2. **适合公众号/技术博客的分析版**。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-06-09）

## 1. 今日速览
过去 24 小时，Hermes Agent 处于**高活跃、强反馈**状态：Issues 更新 50 条、PR 更新 50 条，说明社区仍在持续高频提交缺陷修复与功能改进。  
从内容看，今天的讨论重心明显偏向 **Desktop 体验修补、网关/平台适配稳定性、以及授权/可观测性问题**，属于典型的“成熟度提升期”信号。  
但同时也能看出一个明显特征：**待合并 PR 47 条**，说明开发侧产出很强，评审与落地压力同样不小。  
整体判断：项目健康度良好、反馈活跃，但当前更像是**多线修 bug 与打磨体验**，而不是大版本冲刺期。

---

## 2. 版本发布
**今日无新版本发布**（Release 为空）。

---

## 3. 项目进展
今日可见的已关闭 PR 中，最明确的一项是：

- [#42495 feat(setup): auto-set web.extract_backend when Tavily is selected as web backend](https://github.com/nousresearch/hermes-agent/pull/42495)  
  这是一个偏“体验优化 + 性能改善”的修复/增强：当选择 Tavily 作为 web backend 时，自动补齐 `web.extract_backend`，避免继续走较慢的默认抽取链路。对重网页抽取场景有直接收益。

结合当前开放 PR 的方向，可以看出项目在以下几条线上继续推进：

- **Desktop 体验修复**：如 [#42497](https://github.com/nousresearch/hermes-agent/pull/42497)、[#42490](https://github.com/nousresearch/hermes-agent/pull/42490)、[#42482](https://github.com/nousresearch/hermes-agent/pull/42482)
- **Gateway/平台稳定性**：如 [#42499](https://github.com/nousresearch/hermes-agent/pull/42499)、[#42489](https://github.com/nousresearch/hermes-agent/pull/42489)
- **Cron / Memory / 运行时健壮性**：如 [#42481](https://github.com/nousresearch/hermes-agent/pull/42481)、[#42485](https://github.com/nousresearch/hermes-agent/pull/42485)

**项目整体向前迈进的方式**：今天的进展更偏“修补关键路径 + 降低高频故障”，不是功能爆发式增长，但属于对产品可用性非常重要的持续推进。

> 注：统计显示当日共有 3 个 PR 已合并/关闭，但当前摘要中仅明确展示了 1 个已关闭 PR；其余 2 个未在样本里展开。

---

## 4. 社区热点
今天讨论最活跃的主要集中在以下 Issues（按评论数与影响面综合）：

1. [#42267 Gateway stop/restart notifications bypass i18n system](https://github.com/nousresearch/hermes-agent/issues/42267)  
   评论最多的热点之一。核心诉求是：网关停止/重启通知硬编码英文，绕过 i18n，影响非英语用户。  
   **背后诉求**：Hermes 已开始服务多语言用户，语言一致性已从“锦上添花”变成“基础体验”。

2. [#42306 Langfuse GENERATION spans missing usage/token counts/costs](https://github.com/nousresearch/hermes-agent/issues/42306)  
   虽然该 issue 已关闭，但讨论点非常典型：可观测性“看到了 span，却没有看到真正有价值的 usage/cost 数据”。  
   **背后诉求**：用户已经在认真做成本治理和链路观测，不满足于 trace 存在，而要求指标完整。

3. [#42449 delegate_task corrupts parent context_length via shared plugin context engine singleton](https://github.com/nousresearch/hermes-agent/issues/42449)  
   P1 级别、且涉及父子代理上下文污染，属于高风险问题。  
   **背后诉求**：多代理/委派场景正在被真实使用，系统级状态隔离已经是刚需。

4. [#42270 TUI /model picker caps model list at 50](https://github.com/nousresearch/hermes-agent/issues/42270)  
   用户明确指出大模型目录被截断，尤其影响 NVIDIA NIM 这类大 catalog provider。  
   **背后诉求**：用户希望“能选到全部模型”，而不是被默认上限误伤。

5. [#42256 Desktop composer pasting Excel text inserts tabs](https://github.com/nousresearch/hermes-agent/issues/42256)  
   这是典型的桌面端输入体验问题，说明用户在真实办公流中使用 Desktop。  
   **背后诉求**：从“能用”走向“像原生编辑器一样顺手”。

总体来看，**热点以评论推动为主，reaction 较少**，说明社区更偏技术型、问题导向型讨论，而非情绪型发酵。

---

## 5. Bug 与稳定性
按严重程度排序，今天最值得关注的 Bug 如下：

### P1 / 高风险
- [#42449 delegate_task corrupts parent context_length via shared plugin context engine singleton](https://github.com/nousresearch/hermes-agent/issues/42449)  
  多代理委派会污染父上下文长度，可能引发不可预期的上下文压缩异常。  
  **状态**：暂无明确修复 PR 映射，建议尽快确认 owner。

- [#42405 Memory at capacity → replace zero-match retry loop → no response](https://github.com/nousresearch/hermes-agent/issues/42405)  
  内存达到上限后出现无声挂起，用户会直接感知为“助手没回话”。  
  **状态**：暂无对应 fix PR；这是典型的高优先级可用性问题。

### P2 / 影响面较大
- [#42376 macOS gateway restart/install plist breaks launchctl bootstrap](https://github.com/nousresearch/hermes-agent/issues/42376)  
  影响 macOS 安装/重启流程，属于部署稳定性问题。  
  **状态**：暂未见对应修复 PR。

- [#42362 Discord slash command buttons return “not authorized” without allowlist](https://github.com/nousresearch/hermes-agent/issues/42362)  
  可发起命令但无法点确认按钮，属于交互闭环断裂。  
  **状态**：未见修复 PR。

- [#42299 Media delivery rejects docker container paths under terminal.backend=docker](https://github.com/nousresearch/hermes-agent/issues/42299)  
  Docker 场景下媒体路径校验失败，影响实际文件交付。  
  **状态**：暂无对应 fix PR。

- [#42303 cron bump_use skipped on wakeAgent=false / script-only paths](https://github.com/nousresearch/hermes-agent/issues/42303)  
  会导致 curator 误判技能“过时”并被裁剪。  
  **状态**：暂无直接修复 PR。

- [#42466 Cron Hindsight retain race causes “cannot schedule new futures after interpreter shutdown”](https://github.com/nousresearch/hermes-agent/issues/42466)  
  属于 cron 运行时竞争问题，容易造成间歇性失败。  
  **状态**：已有修复 PR [#42481](https://github.com/nousresearch/hermes-agent/pull/42481) 对应。

### P3 / 体验与准确性问题
- [#42267 i18n 绕过](https://github.com/nousresearch/hermes-agent/issues/42267)  
- [#42270 模型列表被截断](https://github.com/nousresearch/hermes-agent/issues/42270) —— 已有修复 PR [#42496](https://github.com/nousresearch/hermes-agent/pull/42496)  
- [#42431 Desktop Files panel remote mode ENOENT](https://github.com/nousresearch/hermes-agent/issues/42431) —— 已有修复 PR [#42497](https://github.com/nousresearch/hermes-agent/pull/42497)  
- [#42409 Artifacts 时间戳显示为 1970](https://github.com/nousresearch/hermes-agent/issues/42409)  
- [#42422 Desktop 删除 session 后又“复活”](https://github.com/nousresearch/hermes-agent/issues/42422)  
- [#42401 打开新页面导致未发送 prompt 丢失](https://github.com/nousresearch/hermes-agent/issues/42401)  
- [#42477 Telegram 成本/Token 统计严重低报](https://github.com/nousresearch/hermes-agent/issues/42477)  
- [#42478 危险命令审批提示缺少上下文](https://github.com/nousresearch/hermes-agent/issues/42478) —— 有修复 PR [#42489](https://github.com/nousresearch/hermes-agent/pull/42489)  
- [#42479 Stop 后 UI running 状态未清除](https://github.com/nousresearch/hermes-agent/issues/42479)

**稳定性判断**：项目当前的主要风险不是单点崩溃，而是**状态一致性、长链路编排、以及 Desktop/网关/插件之间的边界问题**。这类问题一旦进入真实使用，会明显拉低用户对“可靠性”的感知。

---

## 6. 功能请求与路线图信号
今日新出现的功能诉求，显示 Hermes 的用户群体正在从“尝鲜”转向“重度生产使用”：

- [#42388 Background-review fork write scope decoupling](https://github.com/nousresearch/hermes-agent/issues/42388)  
  要求把后台自我改进能力与写入权限解耦，明显是**安全边界**诉求。  
  **路线图信号**：若继续推进 agent 自我改进/自我审查能力，这类权限隔离会越来越重要。

- [#42307 native, shell-free mail tool for untrusted-input surfaces](https://github.com/nousresearch/hermes-agent/issues/42307)  
  希望为不可信输入场景提供无 shell 的邮件工具，以降低 prompt injection 风险。  
  **路线图信号**：安全工具化、最小权限工具链，可能成为后续平台能力建设方向。

- [#42448 OIDC 登录里 WebAuthn / Passkey / Touch ID 不触发](https://github.com/nousresearch/hermes-agent/issues/42448)  
  说明企业/个人安全登录已经开始进入 Desktop 主路径。  
  **路线图信号**：认证体验会越来越重要，尤其是 OIDC + Passkey 这一类现代登录方式。

- [#42473 aX platform adapter contribution path](https://github.com/nousresearch/hermes-agent/issues/42473)  
  是关于平台适配器的贡献路径询问。  
  **路线图信号**：平台生态仍在扩张，社区正试探“如何以最小成本接入新平台”。

- [#42478 Dangerous command approval prompts lack context](https://github.com/nousresearch/hermes-agent/issues/42478)  
  这类问题表面上是 UX，实质上是**安全决策解释能力**。  
  **路线图信号**：审批系统可能会继续增强“解释 + 风险上下文 + 审批链”能力。  
  对应 PR：[#42489](https://github.com/nousresearch/hermes-agent/pull/42489)

**判断**：下一个版本若要提升用户满意度，可能会优先吸纳三类需求：  
1) 安全与权限边界；2) Desktop/网关稳定性；3) 可观测性与成本透明度。

---

## 7. 用户反馈摘要
从今天的 Issues 文本里，可以提炼出几个非常清晰的真实痛点：

1. **“我不是只要功能，我要完整可用的生产体验”**  
   用户在报 Desktop、Cron、Gateway、Discord、Telegram 等问题时，描述都非常具体，说明 Hermes 已进入真实工作流，而不是实验环境。

2. **“界面细节会直接影响信任感”**  
   例如：
   - [#42409](https://github.com/nousresearch/hermes-agent/issues/42409) 时间戳错到 1970  
   - [#42468](https://github.com/nousresearch/hermes-agent/issues/42468) Copy ID 无响应  
   - [#42401](https://github.com/nousresearch/hermes-agent/issues/42401) Prompt 误丢失  
   这些不是“大功能”，但会快速损害用户对产品可靠性的信任。

3. **“多平台、跨后端是真实场景，不再是边角情况”**  
   Docker、macOS、Discord、Telegram、Feishu、Photon、OIDC、TUI 大目录等问题同时出现，说明 Hermes 的使用面很广，兼容性正在成为主战场。

4. **“用户正在认真管理成本、token 和可观测性”**  
   如 [#42477](https://github.com/nousresearch/hermes-agent/issues/42477) 与 [#42306](https://github.com/nousresearch/hermes-agent/issues/42306)。  
   这类反馈表明，项目已经被用于较高频的实际对话/自动化，成本统计偏差会直接影响是否继续采用。

5. **“用户愿意提需求，也愿意给出修复方向”**  
   今天不少 issue 已经写出 root cause 或 PR 方向，这说明社区对项目结构理解较深，维护者有机会通过快速响应把问题转化成高质量贡献。

---

## 8. 待处理积压
从今天的数据看，真正“长期未响应”的历史老 issue 在当前样本中不明显，但**高优先级且尚未闭环**的问题已经不少，建议维护者尽快分派：

- [#42449 P1 delegate_task 上下文污染](https://github.com/nousresearch/hermes-agent/issues/42449)
- [#42405 内存满载后无声挂起](https://github.com/nousresearch/hermes-agent/issues/42405)
- [#42376 macOS launchctl/安装链路问题](https://github.com/nousresearch/hermes-agent/issues/42376)
- [#42362 Discord 确认按钮授权死胡同](https://github.com/nousresearch/hermes-agent/issues/42362)
- [#42299 Docker media delivery 路径失配](https://github.com/nousresearch/hermes-agent/issues/42299)
- [#42466 Cron Hindsight retain race](https://github.com/nousresearch/hermes-agent/issues/42466) —— 已有修复 PR [#42481](https://github.com/nousresearch/hermes-agent/pull/42481)
- [#42448 OIDC/Passkey 登录失败](https://github.com/nousresearch/hermes-agent/issues/42448)

另外，PR 侧的积压也很值得关注：**47 个待合并 PR** 表明贡献热度高，但如果 review 节奏跟不上，容易形成“修复堆积、上线延迟”的问题。

---

### 总体结论
Hermes Agent 今天呈现出典型的**高活跃、高反馈、高修复密度**特征：  
- 优点是社区非常活跃，问题定位细致，修复方向清晰；  
- 风险是 Desktop、Gateway、Cron、权限与可观测性同时暴露边界问题，说明系统复杂度已经进入“必须靠工程治理稳住”的阶段。  

如果维护团队能把今天暴露的几个高优先级问题尽快收敛，项目整体健康度会继续提升；反之，PR 堆积和跨模块稳定性问题会成为下一阶段的主要压力源。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-06-09）

## 1) 今日速览
PicoClaw 今日呈现出明显的“低 Issue、高 PR”维护型活跃状态：过去 24 小时没有新增或活跃 Issue，也没有新版本发布，但有 11 条 PR 更新，说明开发活动主要集中在代码修复与功能推进上。  
已完成/关闭的 PR 有 5 条，内容几乎都围绕稳定性、错误处理和类型安全加固，表明项目当前优先级偏向“减少潜在故障面”。  
同时，仍有 6 条开放 PR 在推进，其中既包括新功能（DeltaChat gateway），也包括 Windows 体验优化和更规范的错误处理。  
整体判断：项目健康度较稳，工程质量在持续补强，但社区讨论热度不高，外部反馈信号偏弱。

---

## 2) 项目进展
今日较重要的已完成/关闭 PR 主要集中在“可靠性修复”和“运行时安全”两条主线，整体让 PicoClaw 的基础质量更稳了一步。

- **#3062 [CLOSED] fix: health check always returning not ready**  
  修复健康检查始终返回“不就绪”的问题，直接影响部署探针、自动编排与服务可观测性。  
  链接：<https://github.com/sipeed/picoclaw/pull/3062>

- **#3056 [CLOSED] fix(tools): add ok checks for context value type assertions in base.go**  
  统一修复多个 `ctx.Value()` 类型断言未做 `ok` 检查的问题，降低 panic 风险，增强工具层健壮性。  
  链接：<https://github.com/sipeed/picoclaw/pull/3056>

- **#3057 [CLOSED] fix(tools): add ok checks for type assertions in subagent and spawn tools**  
  修复 `subagent` 与 `spawn` 工具中的不安全断言，减少参数异常导致的运行时崩溃。  
  链接：<https://github.com/sipeed/picoclaw/pull/3057>

- **#3058 [CLOSED] fix(webfetch): add ok check for type assertion in isAllowedFirstHopHost**  
  为 webfetch 的主机判断逻辑补上安全断言，避免上下文类型不匹配引发隐患。  
  链接：<https://github.com/sipeed/picoclaw/pull/3058>

- **#3055 [CLOSED] fix(agent): handle os.Getwd error in NewContextBuilder**  
  补齐 `os.Getwd()` 错误处理，减少静默失败，提升上下文构建的可预测性。  
  链接：<https://github.com/sipeed/picoclaw/pull/3055>

- **#3053 [CLOSED] fix(evolution): add ok check for LoadOrStore type assertion in lockStoreFile**  
  修复 `sync.Map.LoadOrStore` 的不安全断言，避免锁对象异常造成并发风险。  
  链接：<https://github.com/sipeed/picoclaw/pull/3053>

**推进评估：** 今日共有 11 条 PR 更新，其中 5 条已关闭/完成，完成率约 **45%**。从内容看，项目今天“向前迈进”的主要不是功能数量，而是**质量与稳定性基线显著加固**；这对后续版本发布的可用性很关键。

---

## 3) 社区热点
今日没有明显的社区讨论热点：Issues 数量为 0，且可见 PR 的评论数均未披露/为 0，说明当前互动更多是贡献者驱动，而非用户讨论驱动。  
不过，从“更新活跃度”和“潜在影响”看，以下条目最值得关注：

- **#3063 [OPEN] feat: add deltachat gateway**  
  这是当前最明确的功能扩展信号，代表项目仍在扩展消息网关生态。  
  链接：<https://github.com/sipeed/picoclaw/pull/3063>

- **#3061 [OPEN] fix(launcher): hide console flashes in all Windows child processes**  
  面向 Windows GUI 体验的优化，虽然是修复，但很可能直接影响桌面用户体验。  
  链接：<https://github.com/sipeed/picoclaw/pull/3061>

- **#3060 [OPEN] fix: use %w for error wrapping and handle json.MarshalIndent error**  
  属于可观测性与错误链路修复，通常是维护者关注度较高的“质量型改进”。  
  链接：<https://github.com/sipeed/picoclaw/pull/3060>

**背后诉求判断：**  
当前社区/贡献者关注点主要集中在三类需求：  
1. **扩协议/扩网关**（例如 DeltaChat gateway）  
2. **提升平台体验**（尤其是 Windows 启动时的窗口闪烁问题）  
3. **增强错误可追踪性与稳定性**（统一修复错误处理和断言安全问题）

---

## 4) Bug 与稳定性
当前没有新增 Issue 报告，因此以下问题主要来自今日 PR 暴露/修复的缺陷。按严重程度排序如下：

1. **高：健康检查错误地一直返回 not ready**  
   可能导致部署系统误判服务状态，影响自动拉起、探针与监控。  
   - 已有修复 PR：**#3062**  
   链接：<https://github.com/sipeed/picoclaw/pull/3062>

2. **高：多处类型断言缺少 `ok` 检查，存在 panic 风险**  
   涉及工具层、webfetch、LINE、evolution 等多个模块，属于典型的运行时稳定性隐患。  
   - 已有修复 PR：**#3056、#3057、#3058、#3054、#3053**  
   链接：  
   <https://github.com/sipeed/picoclaw/pull/3056>  
   <https://github.com/sipeed/picoclaw/pull/3057>  
   <https://github.com/sipeed/picoclaw/pull/3058>  
   <https://github.com/sipeed/picoclaw/pull/3054>  
   <https://github.com/sipeed/picoclaw/pull/3053>

3. **中：错误包装不规范，且存在 `json.MarshalIndent` 错误被忽略的问题**  
   会削弱错误链路的可追踪性，增加排障成本。  
   - 已有修复 PR：**#3060**（开放中）  
   链接：<https://github.com/sipeed/picoclaw/pull/3060>

4. **中：资源 Close() 错误在 error path / retry loop 中被隐式忽略**  
   主要影响代码规范与资源释放可审计性，短期不一定致命，但会积累维护成本。  
   - 已有修复 PR：**#3059**（开放中）  
   链接：<https://github.com/sipeed/picoclaw/pull/3059>

5. **低-中：Windows 子进程控制台闪烁**  
   更偏体验问题，但对 GUI 形态的启动器用户影响明显。  
   - 已有修复 PR：**#3061**（开放中）  
   链接：<https://github.com/sipeed/picoclaw/pull/3061>

---

## 5) 功能请求与路线图信号
今日最明确的新功能需求来自以下 PR：

- **#3063 [OPEN] feat: add deltachat gateway**  
  这是一个清晰的协议/网关扩展请求，说明项目生态仍在向多渠道接入方向演进。  
  链接：<https://github.com/sipeed/picoclaw/pull/3063>

**路线图判断：**
- 如果项目下一阶段继续沿“多网关接入”发展，**#3063** 很可能进入下一版本候选。
- 结合今日大量稳定性修复来看，维护者当前似乎在为新功能扩展做“底盘加固”，即先稳后扩。
- **#3061** 虽不是功能 PR，但其面向 Windows 发行体验的改进，也很可能作为次级优先项进入近期版本范围。

---

## 6) 用户反馈摘要
当前 **Issues 为空**，且评论数据不可见，因此没有足够的直接用户反馈可提炼。  
不过，从今日 PR 诉求可以反推出几类真实痛点：

- **稳定性焦虑**：多个模块存在不安全类型断言，说明用户更在意“不能崩”。  
  链接参考：<https://github.com/sipeed/picoclaw/pull/3056>

- **可观测性不足**：错误包装和错误检查缺失，说明排障体验有待加强。  
  链接参考：<https://github.com/sipeed/picoclaw/pull/3060>

- **服务状态不可信**：health check 异常会直接影响用户对系统可用性的判断。  
  链接参考：<https://github.com/sipeed/picoclaw/pull/3062>

- **平台体验细节**：Windows 控制台闪烁说明桌面端/启动器用户对“无感启动”有期待。  
  链接参考：<https://github.com/sipeed/picoclaw/pull/3061>

---

## 7) 待处理积压
当前没有长期未响应的 Issue：过去 24 小时 Issues 更新为 0，且仓库中可见 Issues 数量为 0。  
不过，仍有 6 条开放 PR 需要持续跟进，虽不属于“陈旧积压”，但仍是当前待办核心：

- **#3063** 新功能：DeltaChat gateway  
  <https://github.com/sipeed/picoclaw/pull/3063>

- **#3061** Windows 子进程控制台闪烁修复  
  <https://github.com/sipeed/picoclaw/pull/3061>

- **#3060** 错误包装与 `json.MarshalIndent` 错误处理  
  <https://github.com/sipeed/picoclaw/pull/3060>

- **#3059** 显式忽略 Close() 错误  
  <https://github.com/sipeed/picoclaw/pull/3059>

- **#3054** LINE 通道类型断言修复  
  <https://github.com/sipeed/picoclaw/pull/3054>

- **#3053** evolution 锁存储类型断言修复  
  <https://github.com/sipeed/picoclaw/pull/3053>

**维护建议：** 优先推进 **#3063、#3061、#3060**，因为它们分别对应功能扩展、平台体验和错误可观测性，最可能影响下一次版本质量与用户感知。

---

如果你愿意，我还可以把这份日报进一步整理成：  
1. **更适合发给团队的简报版**，或  
2. **适合自动化订阅推送的 JSON / Markdown 模板版**。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-06-09）

## 1. 今日速览
过去 24 小时内，NanoClaw 只有 **1 条 Issue 更新** 和 **2 条 PR 更新**，没有新版本发布，整体活跃度属于**低到中等**，但方向非常明确：**安全加固** 与 **可用性修复** 同时推进。  
当前最值得关注的是一个高影响的多模态输入问题：WhatsApp 进入的图片/文档/音频附件无法被 agent 访问，直接影响真实工作流。  
与此同时，项目在安全边界上持续收紧：一条安全加固 PR 处于待合并状态，另一条出站隔离方案已关闭，说明维护者正在探索更稳妥的运行边界。  
综合来看，项目健康度仍然不错，但**用户体验型 bug** 已经开始显现为优先级更高的待办。

---

## 2. 版本发布
今日**无新版本发布**。

---

## 3. 项目进展
### 已关闭的重要 PR
- **[PR #2713：feat(security): egress lockdown (opt-in, off by default)](https://github.com/qwibitai/nanoclaw/pull/2713)**  
  这条 PR 聚焦于**出站网络隔离**：将 agent 容器放入 Docker `--internal` 网络，并通过 OneCLI gateway 统一出网，目标是减少 agent 直连互联网的风险。  
  虽然当前状态为 **CLOSED**，但它清晰地反映出项目正在向**更强的安全边界控制**演进。  
  **推进意义**：从“默认可直连”向“可控出网”思路转变，是平台化与企业级部署能力的重要一步。

### 仍在推进的重要 PR
- **[PR #2714：security: fix four auth/security issues](https://github.com/qwibitai/nanoclaw/pull/2714)**  
  这条 PR 仍处于 **OPEN** 状态，修补了至少四类认证/安全问题，包括：
  - webhook-server 默认绑定 `127.0.0.1`
  - 增加 `WEBHOOK_BIND_HOST` 配置
  - sender-approval 使用 `crypto.randomUUID()` 替换 `Math.random()`
  
  **推进意义**：这是对外暴露面和授权机制的系统性加固，若合并，将显著降低 webhook 暴露与批准 ID 可预测带来的风险。

**整体评价**：今天项目的“前进”主要体现在**安全治理能力增强**，而不是功能扩张；这类变更通常对中长期稳定性价值更高。

---

## 4. 社区热点
今天没有出现明显的高评论/高反应讨论，现有条目互动都很低（评论数基本为 0 或未提供）。  
不过从**实际影响面**看，最值得关注的是：

- **[Issue #2715：Inbound WhatsApp media (images/docs/audio) is unreachable by the agent](https://github.com/qwibitai/nanoclaw/issues/2715)**  
  这是当前最有“社区热度潜力”的问题，虽然尚未产生评论，但它直接触及核心使用场景：**用户通过 WhatsApp 发来的文件，agent 却无法读取**。  
  背后的诉求很明确：用户希望 NanoClaw 能稳定支持**多模态消息流入、附件可访问、会话上下文可用**。

**结论**：今天没有“讨论热”的证据，但有一个**高优先级、高用户感知**的问题已经出现，后续很可能成为关注焦点。

---

## 5. Bug 与稳定性
按严重程度排序：

### 1) 高严重度：WhatsApp 附件不可访问
- **[Issue #2715](https://github.com/qwibitai/nanoclaw/issues/2715)**  
  **现象**：图片、文档、音频等附件被下载到宿主机目录 `DATA_DIR/attachments`，但该目录**没有挂载到 agent 容器**；agent 被传入的路径在容器内不存在。  
  **影响**：agent 无法打开用户上传的文件，导致多模态输入链路失效。  
  **是否已有 fix PR**：当前数据中**未看到对应 fix PR**。  
  **稳定性判断**：这是典型的“能收到但不能用”的运行时集成缺陷，属于**高优先级可用性 bug**。

### 2) 中高严重度：安全暴露面与认证风险
- **[PR #2714](https://github.com/qwibitai/nanoclaw/pull/2714)**（修复中，未合并）  
  这不是已确认的线上 bug，但说明项目已识别出多个 auth/security 风险点。  
  **影响**：如果这些修复不及时落地，可能带来 webhook 暴露、批准 ID 可预测等安全问题。  
  **是否已有 fix PR**：有，且正在审查中。

---

## 6. 功能请求与路线图信号
今天没有看到典型的“新功能需求 Issue”，但有两个非常强的路线图信号：

### 1) 多模态附件可用性将成为近期优先项
- **[Issue #2715](https://github.com/qwibitai/nanoclaw/issues/2715)**  
  这更像是“产品能力缺口”而不只是 bug。  
  **判断**：大概率会被纳入下一轮修复/版本候选，因为它直接影响核心场景：WhatsApp inbound media processing。

### 2) 安全硬化仍在持续收敛
- **[PR #2714](https://github.com/qwibitai/nanoclaw/pull/2714)**  
- **[PR #2713](https://github.com/qwibitai/nanoclaw/pull/2713)**  
  说明路线图上已经出现明确信号：  
  - 更安全的 webhook 默认配置  
  - 更安全的 approval token 生成  
  - 更严格的网络出站控制  
  这些都很像下一版本的“基础能力增强项”。

**综合判断**：下一版本最可能优先纳入的方向是：
1. 安全加固落地  
2. 附件/文件可访问性修复  
3. 与容器网络和会话文件路径相关的稳定性整理

---

## 7. 用户反馈摘要
从当前 Issue 内容中，可以提炼出以下真实用户反馈：

- **核心痛点**：用户已经能把 WhatsApp 媒体发进来，但 agent 读不到，说明“输入链路”与“容器内执行环境”没有对齐。  
- **真实场景**：用户不是只发纯文本，而是希望 agent 处理**图片、文档、音频**等混合内容。  
- **不满意点**：系统在文件落盘路径与容器挂载之间出现断层，造成“路径存在于宿主机但不存在于 agent 容器”的错误体验。  
- **潜在满意点**：问题描述非常清楚，说明该用户已经把问题定位到了部署/挂载层面，社区或维护者若快速修复，会显著提升口碑。

相关链接：
- **[Issue #2715](https://github.com/qwibitai/nanoclaw/issues/2715)**

---

## 8. 待处理积压
当前值得维护者优先关注的积压项如下：

1. **[Issue #2715](https://github.com/qwibitai/nanoclaw/issues/2715)**  
   高优先级可用性问题，直接影响 WhatsApp 多模态输入。

2. **[PR #2714](https://github.com/qwibitai/nanoclaw/pull/2714)**  
   安全修复已进入待合并阶段，建议尽快完成审查与合入。

3. **[PR #2713](https://github.com/qwibitai/nanoclaw/pull/2713)**  
   已关闭但主题重要，反映出项目在出站隔离/网络控制上的长期方向，建议关注是否有后续替代实现或拆分后的新 PR。

---

### 简要结论
NanoClaw 今天的信号很清晰：**安全性在补课，真实用户场景在暴露**。  
如果说 PR #2714 / #2713 体现的是项目向“更可控、更企业化”演进，那么 Issue #2715 则说明项目必须尽快补齐“**文件进来后能否真正被 agent 使用**”这一基础能力。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

以下为 **IronClaw（nearai/ironclaw）2026-06-09 项目动态日报**。  
数据窗口：过去 24 小时。

## 1) 今日速览
过去 24 小时，IronClaw 维持了**高活跃度**：Issues 更新 10 条、PR 更新 35 条，其中 PR 有 14 条已合并/关闭，说明团队正处于持续交付而非停滞状态。  
当天没有新版本发布，但代码层面的推进很明显，主要集中在 **LLM 兼容性修复、工具调用结构调整、触发器/出站投递、hooks 审计与 Reborn 基础设施**。  
从结果看，项目整体呈现出“**修 bug + 补能力 + 做架构收敛**”的健康演进节奏。  
当前没有看到大规模争议型讨论，说明社区反馈更多被快速转化为工程修复。  

---

## 2) 项目进展
今天合并/关闭的 PR 里，最值得关注的是这些方向：

- **ToolCall 错误语义增强**：`#4576` 为 `ToolCall` 增加 `arguments_parse_error` 字段，补齐工具调用失败时的错误表达能力，利于后续在 LLM/provider 链路中做更精细的归因。  
  链接：<https://github.com/nearai/ironclaw/pull/4576>

- **Google Calendar 可见性修复**：`#4578` 修复 `list_events` 默认不传 `timeMin` 导致返回最早事件的问题，直接解决“查未来会议却看到旧日程”的用户痛点。  
  对应 Issue：`#4577` 已关闭。  
  链接：<https://github.com/nearai/ironclaw/pull/4578> ｜ <https://github.com/nearai/ironclaw/issues/4577>

- **Codex 模型发现兼容性修复**：`#4566` 自动检测 `client_version`，解除硬编码版本对新模型（如 `gpt-5.5`）的屏蔽。  
  对应 Issue：`#4564` 已关闭。  
  链接：<https://github.com/nearai/ironclaw/pull/4566> ｜ <https://github.com/nearai/ironclaw/issues/4564>

- **触发投递默认值与 scoped delivery**：`#4574`、`#4581` 持续推进“按个人/共享 Agent 区分默认出站策略”的实现，说明平台正在从单一租户默认策略，走向更细粒度的运行时投递控制。  
  链接：<https://github.com/nearai/ironclaw/pull/4574> ｜ <https://github.com/nearai/ironclaw/pull/4581>

- **Reborn 子代理能力升级**：`#4572` 将 `researcher` 子代理改为更结构化的 `planner`，并重构 `spawn_subagent` 参数，属于 Reborn 方向的重要能力收敛。  
  链接：<https://github.com/nearai/ironclaw/pull/4572>

- **文档与计划清理**：`#4579`、`#4573` 等文档 PR 持续收敛触发投递与边界说明，表明团队在推进实现的同时也在同步清理路线图。  
  链接：<https://github.com/nearai/ironclaw/pull/4579> ｜ <https://github.com/nearai/ironclaw/pull/4573>

**整体推进幅度**：  
今天至少有 **8 条较明确的合并/关闭 PR（在你提供的前 20 条中可见）**，覆盖多个核心子系统；如果算上 Issues 的关闭，已经把一批用户可见 bug 和平台基础能力问题同步推进，属于“**一次有效的工程密度日**”。

---

## 3) 社区热点
> 说明：当前数据里 PR 的评论数未提供，因此“讨论最活跃”主要依据 Issue 评论数与更新密度判断。

### 热点 1：`#4560` 路由/安全策略相关的 HTTP 透传问题
- Issue：Route Trace Commons onboarding HTTP 通过 host network-egress policy 走漏  
- 评论数：1（本日 Issues 中最高）  
- 状态：已关闭  
- 链接：<https://github.com/nearai/ironclaw/issues/4560>

**为何热**：  
这是一个带有明显**安全/合规边界**的基础设施问题，涉及 onboarding 请求是否绕过 host egress 服务。虽然评论不多，但这类问题通常意味着维护者与审查者之间已经进行了较集中、技术导向的确认。

### 热点 2：Google Calendar / Codex 兼容性问题持续被关注
- `#4577`：Google Calendar 返回最旧事件而非未来事件  
  链接：<https://github.com/nearai/ironclaw/issues/4577>
- `#4564`：Codex 模型发现被硬编码 `client_version` 限制  
  链接：<https://github.com/nearai/ironclaw/issues/4564>

**为何热**：  
这两类问题都属于“**外部集成体验直接失真**”——用户一旦遇到，就会感觉工具“不可信”或“结果明显不对”。

### 反应热度
- 本日展示数据中，Issues 的 👍 均为 0。  
- 这说明社区更偏向“**直接报错/修复闭环**”，而不是表态式互动。

---

## 4) Bug 与稳定性
以下按严重程度排序，并标注是否已有修复 PR：

### 高：Hosted agent 运行中却返回 403 Forbidden
- Issue：`#4557` Some hosted agents return 403 Forbidden while instance remains running  
- 影响：运行态与可访问性状态不一致，属于生产可用性问题。  
- 修复状态：**未在今日数据中看到明确 fix PR**  
- 链接：<https://github.com/nearai/ironclaw/issues/4557>

### 高：Chat completion 在带 tools 时重复序列化 `model` 字段，导致 DeepSeek 400
- Issue：`#4548` Bug: duplicate top-level `model` field when tools are included  
- 影响：直接导致请求被外部 API 拒绝，属于协议级兼容性故障。  
- 修复状态：**未看到明确 fix PR**  
- 链接：<https://github.com/nearai/ironclaw/issues/4548>

### 中高：Telegram 升级后新消息会开启新对话，破坏会话连续性
- Issue：`#4556` Production: Telegram creates a new conversation after upgrading from 0.28.2 to 0.29.1  
- 影响：升级回归，影响消息上下文连续性。  
- 修复状态：**未看到明确 fix PR**  
- 链接：<https://github.com/nearai/ironclaw/issues/4556>

### 中：Codex ChatGPT 订阅路径隐藏新模型
- Issue：`#4564` hardcoded client_version hides newer models  
- 修复 PR：`#4566` 已关闭  
- 影响：不是崩溃，但会让用户误以为“模型不存在”。  
- 链接：<https://github.com/nearai/ironclaw/issues/4564> ｜ <https://github.com/nearai/ironclaw/pull/4566>

### 中：Google Calendar `list_events` 返回最旧事件
- Issue：`#4577` list_events returns oldest events instead of upcoming  
- 修复 PR：`#4578` 已关闭  
- 影响：用户最常见的“查最近日程”场景失真。  
- 链接：<https://github.com/nearai/ironclaw/issues/4577> ｜ <https://github.com/nearai/ironclaw/pull/4578>

### 高（安全/策略）：onboarding HTTP 绕过 host egress policy
- Issue：`#4560` Route Trace Commons onboarding HTTP through the host network-egress policy  
- 状态：已关闭  
- 修复状态：**问题已关闭，说明大概率已有修复/策略收敛**，但今日列表里未显示对应 PR 编号。  
- 链接：<https://github.com/nearai/ironclaw/issues/4560>

---

## 5) 功能请求与路线图信号

### `#4545` Self-serve secret setup and grants for user-generated tools
- 链接：<https://github.com/nearai/ironclaw/issues/4545>  
- 诉求：允许用户为自生成工具自助配置 secret，并通过 IronClaw 流程授予权限。  
- 路线图判断：**很可能会进入下一阶段主线**。  
- 原因：当前已有多条相关 PR 在推进：
  - `#4565` credential-boundary egress blocks  
    <https://github.com/nearai/ironclaw/pull/4565>
  - `#4563` no-exposure egress blocks  
    <https://github.com/nearai/ironclaw/pull/4563>
  - `#4567` hook quarantine audit  
    <https://github.com/nearai/ironclaw/pull/4567>
  - `#4569` tenant predicate key caps  
    <https://github.com/nearai/ironclaw/pull/4569>  
  这说明平台正在补齐“**可控凭据 + 可审计出站**”的基础设施。

### `#4543` Runtime service profiles for credentialed generic HTTP and skill-declared service requirements
- 链接：<https://github.com/nearai/ironclaw/issues/4543>  
- 诉求：让 generic HTTP 能消费用户配置的第三方凭据，并支持技能声明服务需求。  
- 路线图判断：**高度像下一版本或近版本的核心能力**。  
- 原因：它和当前的 scoped outbound defaults、hooks 审计、credential egress 防护形成完整闭环。  
  相关 PR：
  - `#4574` / `#4581` scoped outbound defaults  
    <https://github.com/nearai/ironclaw/pull/4574> ｜ <https://github.com/nearai/ironclaw/pull/4581>

### `#4554` i18n 覆盖不完整与 translator runtime crashes
- 链接：<https://github.com/nearai/ironclaw/issues/4554>  
- 路线图判断：**更像产品成熟度提升项**，重要但不一定最优先。  
- 信号：说明 WebUI v2 已经进入“多语言可用性”和“翻译运行时稳定性”阶段。

### `#4551` Reborn production Postgres storage config
- 链接：<https://github.com/nearai/ironclaw/issues/4551>  
- 路线图判断：**基础设施/部署侧的近期开关项**。  
- 信号：与 `#4582` 的 subagent durability 设计、`#4580` 的 automation run history UI 一起看，Reborn 正在补生产可运营能力。  
  相关 PR：  
  - `#4582` docs(reborn): WU-B subagent durability sub-spec  
    <https://github.com/nearai/ironclaw/pull/4582>  
  - `#4580` Add automation run history UI  
    <https://github.com/nearai/ironclaw/pull/4580>

---

## 6) 用户反馈摘要
从今天的 Issues 可以提炼出几类非常真实的用户痛点：

1. **“系统看起来运行中，但实际上不可用”**
   - 典型：`#4557` 403 Forbidden 但实例仍显示 RUNNING  
   - 这类反馈通常来自生产环境用户，最在意的是可用性与状态一致性。  
   - 链接：<https://github.com/nearai/ironclaw/issues/4557>

2. **“升级不应该破坏对话连续性”**
   - 典型：`#4556` Telegram 升级后开新会话  
   - 用户期望消息通道升级透明、会话上下文可延续。  
   - 链接：<https://github.com/nearai/ironclaw/issues/4556>

3. **“外部工具调用必须严格遵守 API 协议”**
   - 典型：`#4548` DeepSeek 400、`#4577` Calendar 返回错误区间、`#4564` Codex 新模型不可见  
   - 用户对集成稳定性非常敏感，任何字段/参数异常都会被感知为“产品不好用”。  
   - 链接：<https://github.com/nearai/ironclaw/issues/4548> ｜ <https://github.com/nearai/ironclaw/issues/4577> ｜ <https://github.com/nearai/ironclaw/issues/4564>

4. **“国际化和界面稳定性也影响信任”**
   - 典型：`#4554` i18n 覆盖不足与 translator 崩溃  
   - 说明有非英语或多语用户在使用，且 UI 稳定性已成为基本门槛。  
   - 链接：<https://github.com/nearai/ironclaw/issues/4554>

5. **“用户希望对凭据与出站能力有更细粒度控制”**
   - 典型：`#4543`、`#4545`  
   - 这表明 IronClaw 正从“能跑”走向“**可治理、可授权、可审计**”。  
   - 链接：<https://github.com/nearai/ironclaw/issues/4543> ｜ <https://github.com/nearai/ironclaw/issues/4545>

---

## 7) 待处理积压
> 说明：你提供的数据仅覆盖过去 24 小时，严格意义上无法判断“长期未响应”。下面列出的是**当前仍开放且优先级高、值得维护者继续盯紧的积压项**。

### 需要优先关注的开放 Issue
- `#4557` 403 Forbidden while instance remains running  
  <https://github.com/nearai/ironclaw/issues/4557>
- `#4556` Telegram 升级后新开对话  
  <https://github.com/nearai/ironclaw/issues/4556>
- `#4548` DeepSeek duplicate model field  
  <https://github.com/nearai/ironclaw/issues/4548>
- `#4545` self-serve secret setup and grants  
  <https://github.com/nearai/ironclaw/issues/4545>
- `#4543` credentialed generic HTTP / service profiles  
  <https://github.com/nearai/ironclaw/issues/4543>
- `#4554` i18n coverage & translator crashes  
  <https://github.com/nearai/ironclaw/issues/4554>
- `#4551` Reborn production Postgres storage config  
  <https://github.com/nearai/ironclaw/issues/4551>

### 需要持续推进的开放 PR
- `#4584` system-sentinel id minting centralization  
  <https://github.com/nearai/ironclaw/pull/4584>
- `#4583` NormalizingProvider decorator  
  <https://github.com/nearai/ironclaw/pull/4583>
- `#4582` WU-B subagent durability sub-spec  
  <https://github.com/nearai/ironclaw/pull/4582>
- `#4580` automation run history UI  
  <https://github.com/nearai/ironclaw/pull/4580>
- `#4575` system ResourceScope JSON round-trip  
  <https://github.com/nearai/ironclaw/pull/4575>
- `#4571` OpenAI compat security gates  
  <https://github.com/nearai/ironclaw/pull/4571>
- `#4569` tenant predicate key caps  
  <https://github.com/nearai/ironclaw/pull/4569>
- `#4567` hook quarantine durable audit  
  <https://github.com/nearai/ironclaw/pull/4567>
- `#4565` credential-boundary egress blocks  
  <https://github.com/nearai/ironclaw/pull/4565>
- `#4563` no-exposure egress blocks  
  <https://github.com/nearai/ironclaw/pull/4563>

---

### 总体判断
IronClaw 今天的状态可以概括为：**高频迭代、问题闭环较快、路线图聚焦在安全治理与 LLM/工具兼容性**。  
没有新版本发布，但从 PR 结构看，下一阶段很可能围绕 **LLM provider 标准化、出站与凭据治理、Reborn 生产化、WebUI 体验完善** 继续推进。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-06-09）

## 1. 今日速览
过去 24 小时内，LobsterAI 的公开协作活跃度偏低：**Issues 无新增/无更新**，但 **PR 有 4 条合并/关闭**，说明维护重心集中在代码修复与稳定性打磨，而非功能扩张。  
今天没有新版本发布，整体处于“**持续修补、快速收敛**”的状态。  
从 PR 内容看，团队主要在处理 **登录回调诊断、Windows 登录后窗口聚焦、数据迁移/恢复安全性** 等基础体验问题。  
综合判断：项目当前健康度较稳，社区讨论不活跃，但核心维护动作明确，偏向生产可用性优化。  

---

## 2. 项目进展
今日共有 **4 个 PR 已关闭**，均为修复/维护类变更，整体推进集中在“**提升登录链路可靠性 + 强化数据迁移安全**”。

### 关键 PR
- **[#2129](https://github.com/netease-youdao/LobsterAI/pull/2129)**  
  `[CLOSED] [area: renderer, area: main] chore(auth): add login callback diagnostics`  
  为登录回调增加诊断日志，明确记录客户端使用的是 **overmind** 还是 **fallback portal login URL**，以及桌面登录是否使用 **本地 callback redirect**。  
  **价值**：提升排障效率，尤其有助于定位 Windows 开发模式下的回调 fallback 问题。

- **[#2127](https://github.com/netease-youdao/LobsterAI/pull/2127)**  
  `[CLOSED] [area: main] fix(auth): improve Windows focus after callback login`  
  改善本地 callback / deep link 登录后主窗口置顶与聚焦行为，减少“浏览器登录完成后应用没有自动弹出/切回”的体验问题。  
  **价值**：直接改善 Windows 平台登录完成后的可见性与可达性。

- **[#2128](https://github.com/netease-youdao/LobsterAI/pull/2128)**  
  `[CLOSED] [area: renderer, area: main] fix(data-migration): exclude Network directory from backup and preserve on restore`  
  数据迁移中排除 `Network` 目录备份，并在恢复时保留。  
  **价值**：降低恢复过程对运行时网络相关目录的误处理风险，属于数据安全/恢复一致性修复。

- **[#2126](https://github.com/netease-youdao/LobsterAI/pull/2126)**  
  `[CLOSED] [area: renderer, area: main] fix(data-migration): restore data in place and preserve runtime locks`  
  将恢复策略从“重命名整个 user data 目录”改为“原地替换可恢复数据”，并保留运行时锁文件（如 `SingletonLock`、`Socket`、`Cookie`、`lockfile`）。失败时仅在目标已被触碰且回滚包就绪时回滚。  
  **价值**：这是今天最偏底层、也最关键的稳定性修复之一，显著降低数据恢复导致的运行态损坏和锁文件丢失风险。

### 整体推进幅度
今天的变更不是“新增功能”，而是对两个高风险链路做了集中治理：  
1. **登录链路**：更好诊断 + 更可靠回到应用窗口；  
2. **数据迁移/恢复链路**：避免破坏运行态目录结构与锁文件。  

这类修复对项目的实际贡献通常高于一般 UI 调整，说明项目当前把重点放在 **可用性、可恢复性、排障能力** 上。

---

## 3. 社区热点
今日公开数据中 **没有 Issues**，且 PR 的评论数未显示有效讨论量，说明今天几乎没有形成明显社区热点。

### 可见的“低讨论高执行”PR
- **[#2129](https://github.com/netease-youdao/LobsterAI/pull/2129)**：登录回调诊断
- **[#2127](https://github.com/netease-youdao/LobsterAI/pull/2127)**：Windows 登录聚焦
- **[#2128](https://github.com/netease-youdao/LobsterAI/pull/2128)**：数据迁移备份/恢复策略
- **[#2126](https://github.com/netease-youdao/LobsterAI/pull/2126)**：原地恢复与锁文件保留

### 背后诉求分析
这些 PR 的主题高度一致，反映出社区/团队的主要诉求集中在：
- **登录后“进不来 / 回不去”** 的桌面体验问题；
- **数据恢复过程不够安全**，可能影响运行态；
- **缺少足够诊断信息**，导致排障成本高。  

换言之，当前热点不在功能讨论，而在 **可靠性与故障恢复**。

---

## 4. Bug 与稳定性
今日没有公开 Issues，因此**没有新增可追踪的 Bug 工单**；但从已关闭 PR 来看，项目正在主动修复以下稳定性问题。

### 按潜在严重程度排序
1. **数据迁移/恢复可能破坏运行态目录或锁文件**  
   - 相关修复：**[#2126](https://github.com/netease-youdao/LobsterAI/pull/2126)**  
   - **严重程度：高**  
   - 影响：可能导致应用状态异常、锁文件丢失、恢复后运行不稳定。  
   - 状态：**已通过 fix PR 修复**

2. **恢复过程中错误处理 `Network` 目录**  
   - 相关修复：**[#2128](https://github.com/netease-youdao/LobsterAI/pull/2128)**  
   - **严重程度：中高**  
   - 影响：可能造成网络配置/缓存相关数据异常，影响恢复结果的一致性。  
   - 状态：**已通过 fix PR 修复**

3. **Windows 登录回调后主窗口不易回到前台**  
   - 相关修复：**[#2127](https://github.com/netease-youdao/LobsterAI/pull/2127)**  
   - **严重程度：中**  
   - 影响：用户以为登录失败或应用未响应，实际是窗口焦点没有正确恢复。  
   - 状态：**已通过 fix PR 修复**

4. **登录回调/portal 路径缺少足够诊断信息**  
   - 相关修复：**[#2129](https://github.com/netease-youdao/LobsterAI/pull/2129)**  
   - **严重程度：中**  
   - 影响：问题不一定直接影响功能，但会显著增加排障时间。  
   - 状态：**已通过 chore PR 增强诊断**

### 小结
今日稳定性工作明显偏“**高价值修复**”，尤其是数据恢复链路的处理，说明维护者对潜在损坏性问题是有主动治理动作的。

---

## 5. 功能请求与路线图信号
今日 **没有公开 Issues**，因此没有直接可见的“用户新功能请求”。

### 来自 PR 的路线图信号
虽然没有显式需求工单，但从修复方向可以看出，下一阶段很可能继续围绕以下方向推进：
- **登录体验完善**：  
  包括 callback / deep link / portal fallback 的兼容性与可诊断性。  
  参考：**[#2129](https://github.com/netease-youdao/LobsterAI/pull/2129)**、**[#2127](https://github.com/netease-youdao/LobsterAI/pull/2127)**

- **数据迁移与恢复安全性**：  
  包括目录白名单/黑名单、运行时文件保留、失败回滚策略完善。  
  参考：**[#2128](https://github.com/netease-youdao/LobsterAI/pull/2128)**、**[#2126](https://github.com/netease-youdao/LobsterAI/pull/2126)**

### 哪些更可能进入下一版本
从工程投入看，**登录流程可靠性** 和 **数据迁移恢复** 更像是下一版本的优先项，因为它们直接影响安装、启动、恢复、升级等关键用户路径。

---

## 6. 用户反馈摘要
今日没有 Issues 评论数据，因此**没有可直接抽取的用户原声反馈**。

### 可从修复方向反推的用户痛点
- **Windows 用户在登录后容易遇到“应用没弹回前台”** 的体验问题；
- **开发/调试环境下的登录回调路径不稳定、难定位**；
- **数据恢复/迁移操作对运行态文件不够友好**，用户会担心数据完整性；
- **恢复失败时缺少清晰的回滚与恢复边界**。  

### 满意/不满意点
- 当前公开数据中没有满意度评论；
- 但从维护动作看，项目方正在补齐一些“用户不一定会表扬，但会因为缺失而抱怨”的基础能力：**可恢复性、可诊断性、可见性**。

---

## 7. 待处理积压
从本日报公开数据看：
- **Issues：0**
- **PR：4 条均已关闭**
- **无新版本**
- **无公开待处理积压**

### 结论
今日没有明显的长期未响应工单或悬而未决的 PR 积压。  
这通常意味着仓库当前处于一个**低噪声、低外部反馈、内部维护驱动**的阶段。  

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **更适合内部周报/晨报的精简版**，或  
2. **适合发布到公众号/社区的分析版**。

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

## 1. 今日速览
过去 24 小时，CoPaw 维持了**高活跃、低发版**的迭代状态：Issues 更新 6 条、PR 更新 8 条，但**没有新 Release**。这说明团队当前重点仍集中在**稳定性修复、会话/上下文链路优化、以及生态功能扩展**，而非版本发布。  
从社区反馈看，讨论热度主要集中在两类问题：一类是**产品路线与能力升级**（如学习循环/技能迭代），另一类是**真实使用中的稳定性与性能痛点**（Windows 卡顿、multi-agent 不稳、内存压缩报错等）。  
整体判断：项目**活跃度高、反馈密度高**，说明用户使用面广；但当前仍处于**“边修边扩”**阶段，稳定性仍是最核心的健康度指标。

---

## 3. 项目进展
- **PR #5018 已关闭**：[`fix: propagate ModelInfo.max_input_length to AgentScope context_size for auto-compaction`](https://github.com/agentscope-ai/QwenPaw/pull/5018)  
  这个变更把 `ModelInfo.max_input_length` 传递给 AgentScope 的 `context_size`，使自动压缩上下文更贴近用户配置的模型窗口。  
  **意义**：这是一个偏底层但非常关键的修复，直接影响 `/compact` 与自动内存压缩的准确性，属于提升稳定性的实质进展。

- 今日其余 **7 个 PR 仍在推进中**，覆盖安全、会话恢复、插件市场、typing indicator、工作区路径约束等方向：  
  - [`#5028`](https://github.com/agentscope-ai/QwenPaw/pull/5028) 安全：按安装实例隔离 keychain master key  
  - [`#5027`](https://github.com/agentscope-ai/QwenPaw/pull/5027) 清理 warmup session 并支持 session resume  
  - [`#5026`](https://github.com/agentscope-ai/QwenPaw/pull/5026) 修复 session_id 重复拼接导致的文件名问题  
  - [`#5023`](https://github.com/agentscope-ai/QwenPaw/pull/5023) 插件市场 Tab + Platform 集成  
  - [`#5022`](https://github.com/agentscope-ai/QwenPaw/pull/5022) 保护 agent workspace 恢复目标路径  
  - [`#5021`](https://github.com/agentscope-ai/QwenPaw/pull/5021) 修复 auto-compaction 忽略模型 max_input_length  
  - [`#5020`](https://github.com/agentscope-ai/QwenPaw/pull/5020) Yuanbao 通道 typing indicator

**项目向前迈进的量化判断**：今天至少完成了**1 个关键修复闭环**，同时有多条围绕“会话、压缩、安全、插件生态”的主线 PR 持续排队，说明项目正在从“功能可用”向“体验稳定 + 生态扩展”过渡。

---

## 4. 社区热点
### 热点 1：学习循环/技能自迭代的方向讨论
- [`#5017 [enhancement] [Feature]: 建议关注 Hermes Agent 的发展，借鉴其"学习循环"等优势特性`](https://github.com/agentscope-ai/QwenPaw/issues/5017)  
  - 评论：7，👍：2  
  - 诉求核心：希望项目参考 Hermes Agent 的“学习循环（Learning Loop）”能力，让 Agent 能**从自身行为中自动创建、迭代技能**。  
  - 背后信号：这不是单点功能建议，而是**对下一代 Agent 能力边界**的讨论，说明用户已经开始期待 CoPaw 在“会用”之外进一步进入“会学”。

### 热点 2：Windows Desktop 前端卡顿、CPU 飙升
- [`#5015 1.1.11 及以下版本，windows desktop 版本，前端加载不流畅`](https://github.com/agentscope-ai/QwenPaw/issues/5015)  
  - 评论：5，👍：0  
  - 诉求核心：任务运行时会话切换卡顿、CPU 激增。  
  - 背后信号：桌面端体验已经成为真实阻塞点，用户对“可用性”要求高于“新增能力”。

### 热点 3：多智能体会话不稳定
- [`#5016 Web Console multi-agent chat is unstable`](https://github.com/agentscope-ai/QwenPaw/issues/5016)  
  - 评论：2，👍：0  
  - 诉求核心：自定义/导入 agent 在多智能体聊天中可回复，但新 chat 记录与展示不稳定。  
  - 背后信号：多 agent 工作流是高价值场景，但当前**会话注册、展示、持久化**链路还不够稳。

### 热点 4：内存压缩期间崩溃
- [`#5019 内存压缩期间 as_msg_handler.py 报错 AttributeError`](https://github.com/agentscope-ai/QwenPaw/issues/5019)  
  - 评论：2，👍：0  
  - 诉求核心：压缩逻辑默认 `source` 是 dict，但实际收到 str 时崩溃。  
  - 背后信号：说明项目在**边界输入处理**上仍有健壮性缺口。

---

## 5. Bug 与稳定性
按严重程度排序如下：

1. **高严重：内存压缩触发崩溃**
   - [`#5019`](https://github.com/agentscope-ai/QwenPaw/issues/5019)  
   - 问题：`as_msg_handler.py` 在 `source` 为字符串时调用 `.get()` 导致 `AttributeError`，可能直接引发运行中断。  
   - 状态：**已关闭**  
   - 是否已有 fix PR：**无直接对应 PR 可见**；但相关链路修复可参考 [`#5018`](https://github.com/agentscope-ai/QwenPaw/pull/5018)。

2. **高严重：后台 inter-agent task 文件路径错误**
   - [`#5025`](https://github.com/agentscope-ai/QwenPaw/issues/5025)  
   - 问题：`submit_to_agent` 在任务执行时出现 `FileNotFoundError`，影响后台任务提交。  
   - 状态：**开放**  
   - 是否已有 fix PR：**有**，[`#5026`](https://github.com/agentscope-ai/QwenPaw/pull/5026)（修复 `user_id == session_id` 时文件名重复拼接问题）。

3. **中高严重：Web Console multi-agent chat 不稳定**
   - [`#5016`](https://github.com/agentscope-ai/QwenPaw/issues/5016)  
   - 问题：新会话注册/展示不可靠，影响多智能体核心使用路径。  
   - 状态：**开放**  
   - 是否已有 fix PR：当前数据中**未见直接对应 fix PR**。

4. **中严重：Windows Desktop 前端卡顿、CPU 激增**
   - [`#5015`](https://github.com/agentscope-ai/QwenPaw/issues/5015)  
   - 问题：任务运行时会话切换明显卡顿，用户体验受损。  
   - 状态：**开放**  
   - 是否已有 fix PR：**未见**。

5. **中严重：Pet 功能闪退/卡顿 + 默认智能体无法自定义**
   - [`#5029`](https://github.com/agentscope-ai/QwenPaw/issues/5029)  
   - 问题：Pet 不稳定，且部分入口仍会回跳 default，破坏用户配置预期。  
   - 状态：**开放**  
   - 是否已有 fix PR：**未见**。

---

## 6. 功能请求与路线图信号
### 明显的用户需求
- [`#5017`](https://github.com/agentscope-ai/QwenPaw/issues/5017)  
  用户明确希望项目关注 Hermes Agent 的“学习循环”能力，说明大家不只看重工具化能力，也开始期待**Agent 的自我进化与技能沉淀**。  
  这类需求更像**中长期路线图信号**，短期内不一定快速落地，但很可能影响后续产品叙事。

- [`#5029`](https://github.com/agentscope-ai/QwenPaw/issues/5029)  
  用户希望**默认智能体可自定义**，且 Pet 在稳定性未达标前不应默认强推。  
  这类反馈很适合转化为**配置自由度优化**与**功能实验性标识**。

### 更可能进入下一版本的方向
结合已有 PR 看，以下方向进入下一版本的概率较高：
- **会话/上下文正确性修复**：[`#5018`](https://github.com/agentscope-ai/QwenPaw/pull/5018)、[`#5021`](https://github.com/agentscope-ai/QwenPaw/pull/5021)、[`#5026`](https://github.com/agentscope-ai/QwenPaw/pull/5026)
- **会话恢复与启动清理**：[`#5027`](https://github.com/agentscope-ai/QwenPaw/pull/5027)
- **安全增强**：[`#5028`](https://github.com/agentscope-ai/QwenPaw/pull/5028)
- **插件生态扩展**：[`#5023`](https://github.com/agentscope-ai/QwenPaw/pull/5023)
- **交互体验增强**：[`#5020`](https://github.com/agentscope-ai/QwenPaw/pull/5020)

---

## 7. 用户反馈摘要
从今日 Issues 的评论与描述里，可以提炼出几条非常真实的用户画像与痛点：

- **满意点：本地化和上手体验不错**
  - 来自 [`#5017`](https://github.com/agentscope-ai/QwenPaw/issues/5017) 的反馈明确提到：  
    “国内用起来特别舒服、设置清晰无门槛、开箱即用”。  
  - 这说明 CoPaw 的**可安装性、配置路径和本地体验**已经建立了正向口碑。

- **痛点 1：性能与流畅度不足**
  - [`#5015`](https://github.com/agentscope-ai/QwenPaw/issues/5015) 反映 Windows 桌面端在任务运行时明显卡顿。  
  - 用户关注的不只是“能不能跑”，而是“跑的时候顺不顺”。

- **痛点 2：多智能体和后台任务链路不稳定**
  - [`#5016`](https://github.com/agentscope-ai/QwenPaw/issues/5016)、[`#5025`](https://github.com/agentscope-ai/QwenPaw/issues/5025) 都指向会话/任务编排层的问题。  
  - 这表明用户已经开始把 CoPaw 用在更复杂的工作流里，稳定性短板会被迅速放大。

- **痛点 3：默认行为过于硬编码**
  - [`#5029`](https://github.com/agentscope-ai/QwenPaw/issues/5029) 指出 default agent 可能绕过用户设置。  
  - 用户希望系统行为更“尊重配置”，而不是为了默认路径牺牲可控性。

---

## 8. 待处理积压
> 说明：当前数据只覆盖最近 24 小时，无法严格判断“长期未响应”时长；以下按**仍开放且影响面较大**来列出，供维护者优先关注。

### 高优先级开放 Issue
- [`#5016`](https://github.com/agentscope-ai/QwenPaw/issues/5016) 多智能体会话不稳定  
- [`#5015`](https://github.com/agentscope-ai/QwenPaw/issues/5015) Windows Desktop 性能卡顿  
- [`#5017`](https://github.com/agentscope-ai/QwenPaw/issues/5017) 学习循环/能力演进方向建议  
- [`#5029`](https://github.com/agentscope-ai/QwenPaw/issues/5029) Pet 稳定性与默认智能体可配置性  
- [`#5025`](https://github.com/agentscope-ai/QwenPaw/issues/5025) submit_to_agent 会话文件路径错误

### 仍在等待 review/合入的关键 PR
- [`#5028`](https://github.com/agentscope-ai/QwenPaw/pull/5028) keychain 安全隔离  
- [`#5027`](https://github.com/agentscope-ai/QwenPaw/pull/5027) warmup session 清理 + 恢复  
- [`#5023`](https://github.com/agentscope-ai/QwenPaw/pull/5023) 插件市场  
- [`#5021`](https://github.com/agentscope-ai/QwenPaw/pull/5021) 自动压缩上下文窗口修复  
- [`#5020`](https://github.com/agentscope-ai/QwenPaw/pull/5020) typing indicator  
- [`#5022`](https://github.com/agentscope-ai/QwenPaw/pull/5022) workspace 路径保护  
- [`#5026`](https://github.com/agentscope-ai/QwenPaw/pull/5026) session 文件命名修复

---

### 总体结论
今天的 CoPaw 表现为**“高活跃、强反馈、重修复”**：社区在推动产品向更强的 Agent 能力演进，同时也持续暴露出会话、压缩、桌面性能和默认行为等基础问题。项目健康度总体向好，但短期内最关键的任务仍是：**先把稳定性和体验地基打牢，再谈更激进的能力升级**。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

## 1. 今日速览

过去 24 小时，ZeroClaw 保持**高活跃、以修复和稳定性加固为主**的状态：新增/活跃 Issues 7 条，PR 更新 29 条，但**没有新 Release**，说明当前仍处在高密度迭代与集成阶段。  
问题集中在 **zerocode TUI/配置联动、Matrix 通道、runtime 历史与网关稳定性**，覆盖从交互层到基础设施层，表明项目面向真实场景的打磨仍在继续。  
PR 侧有 4 个条目进入 closed 状态，显示部分关键修复已推进，但**待合并 PR 仍有 25 条**，主干整合压力依然较大。  
整体健康度偏积极：**开发热度高、修复面广、风险点也更集中在回归与 UX 一致性**。  

---

## 3. 项目进展

今日进入 closed 状态、最值得关注的 PR 主要有以下几项：

- [#7398](https://github.com/zeroclaw-labs/zeroclaw/pull/7398) / [#7397](https://github.com/zeroclaw-labs/zeroclaw/pull/7397)  
  **cron 任务支持 pause/resume**：允许 scheduled task 在不删除重建的情况下启停，提升运维友好度，也减少任务配置的破坏性操作。  
  这类能力对长期运行的自动化场景非常关键，意味着项目从“能跑”在向“可运维、可回收”迈进。

- [#7388](https://github.com/zeroclaw-labs/zeroclaw/pull/7388)  
  **Matrix 会话按 alias 隔离，并修复 key backup 使用配置密钥**：解决多个 Matrix block 共用会话存储带来的串扰问题。  
  这是典型的多实例隔离修复，直接提升了多通道部署的安全性与可预测性。

- [#7403](https://github.com/zeroclaw-labs/zeroclaw/pull/7403)  
  **guard trim_history，避免 orphan-cascade 把消息历史清空**：这是一个很关键的 runtime 安全补丁，防止历史裁剪链式删除后把对话内容全部抹掉。  
  对对话代理类产品来说，这属于“底层保险丝”级别的修复。

**整体推进判断：**  
今天的已关闭 PR 主要落在**定时任务、会话隔离、历史安全**三个方向，说明项目正在补齐“基础设施可靠性”和“可运维性”短板，而不是只做表层功能。  

---

## 4. 社区热点

> 说明：本次快照里，Issue/PR 的评论数和反应数大多未充分暴露，且 Issue 评论均为 0，因此以下按**更新时效 + 影响面**筛选“讨论热点”。

- [#7373](https://github.com/zeroclaw-labs/zeroclaw/issues/7373)  
  **Quickstart 可能把用户卡在编辑/提交流程后**  
  背后诉求很明确：新用户上手流程不能“走进去出不来”，这是 onboarding 体验的关键风险点。

- [#7395](https://github.com/zeroclaw-labs/zeroclaw/issues/7395)  
  **Config 中修改 model-provider 后，活动中的 Chat session 不会更新**  
  用户期待的是“配置修改后立刻生效”，而不是重启或重新进入会话。说明配置热更新/状态同步是当前痛点。

- [#7400](https://github.com/zeroclaw-labs/zeroclaw/issues/7400)  
  **Locale 切换看起来没有效果，直到重启/下载后才体现**  
  这是典型的“设置生效延迟”问题，容易让用户误以为功能失效。

- [#7377](https://github.com/zeroclaw-labs/zeroclaw/issues/7377)  
  **深色主题在浅色终端配置下可能出现不可读文字**  
  说明 TUI 主题与终端环境兼容性仍需继续打磨，属于高频可见的 UX 问题。

- [#7376](https://github.com/zeroclaw-labs/zeroclaw/issues/7376)  
  **Dashboard 隐藏不可用/错误状态，并把历史误标成 active sessions**  
  这是观察性与状态呈现问题，会直接影响排障效率和用户信任感。

- [#7404](https://github.com/zeroclaw-labs/zeroclaw/pull/7404)  
  **Matrix /sync 精确 30 秒超时问题**  
  这是跨平台/长连接通道稳定性热点，和实际部署中的连接可靠性直接相关。

**热点结论：**  
今天的“热”并不体现在大量评论，而是体现在**真实使用链路上的阻塞、状态不一致和可见性不足**。用户关心的不是单点功能，而是“改了是否立刻生效、状态是否可信、流程是否会卡死”。  

---

## 5. Bug 与稳定性

按严重程度排序如下：

### S1 - workflow blocked
- [#7373](https://github.com/zeroclaw-labs/zeroclaw/issues/7373)  
  **Quickstart 在编辑/提交流后可能让用户卡住**  
  影响新用户路径，属于明确的流程阻断。  
  **Fix PR：本次快照中未见直接对应的 fix PR。**

### S2 - degraded behavior
- [#7395](https://github.com/zeroclaw-labs/zeroclaw/issues/7395)  
  **修改 model-provider 后，活跃 Chat session 不更新**  
  会造成配置与实际运行状态脱节。  
  **Fix PR：未见直接对应 PR。**

- [#7377](https://github.com/zeroclaw-labs/zeroclaw/issues/7377)  
  **深色主题可能继承不可读的终端前景色**  
  影响可用性与可读性，属于明显的交互退化。  
  **Fix PR：未见直接对应 PR。**

- [#7376](https://github.com/zeroclaw-labs/zeroclaw/issues/7376)  
  **Dashboard 隐藏错误/不可用状态，并误标历史会话**  
  会削弱可观测性与诊断效率。  
  **Fix PR：未见直接对应 PR。**

### S3 - minor issue
- [#7400](https://github.com/zeroclaw-labs/zeroclaw/issues/7400)  
  **Locale 切换看起来无效，需重启/下载后才体现**  
  属于 minor，但很容易让用户误判功能异常。  
  **Fix PR：未见直接对应 PR。**

- [#7378](https://github.com/zeroclaw-labs/zeroclaw/issues/7378)  
  **macOS 下 Cmd-C 可能被当作退出 chord**  
  是平台兼容性问题，影响日常使用习惯。  
  **Fix PR：未见直接对应 PR。**

**稳定性判断：**  
本日暴露的问题大多属于**交互状态同步、平台兼容性、主题/渲染一致性**，而不是纯逻辑崩溃。说明系统“能跑”，但在真实终端环境和动态配置场景下仍存在不少边界问题。  

---

## 6. 功能请求与路线图信号

以下 PR/议题比较像下一阶段路线图的信号：

- [#7394](https://github.com/zeroclaw-labs/zeroclaw/pull/7394)  
  **Voice Pipeline facade**  
  这是面向未来音频通道的架构性铺垫，说明项目在扩展多模态/语音能力。

- [#7391](https://github.com/zeroclaw-labs/zeroclaw/pull/7391)  
  **配置 channels.max_concurrent_per_channel**  
  这是典型的可运维参数化能力，适合进入正式版本的基础配置集。

- [#7407](https://github.com/zeroclaw-labs/zeroclaw/pull/7407)  
  **要求配置过的 model switch profiles**  
  属于安全与正确性增强，能减少“切到不存在的模型配置”的运行错误。

- [#7406](https://github.com/zeroclaw-labs/zeroclaw/pull/7406)  
  **对已安装工具抑制 skill suggestions**  
  更偏 UX 与智能推荐准确性，说明 runtime tool 生态在变复杂，建议引导也需要更精准。

- [#7390](https://github.com/zeroclaw-labs/zeroclaw/pull/7390)  
  **把翻译资源移动到 git submodule**  
  这是国际化工程化方向的信号，偏维护性，但对后续多语言扩展很有帮助。

**路线图判断：**  
下一版本更可能优先纳入的是**可配置性、运行时安全、通道扩展能力**，而不是单纯新增 UI 花样。  

---

## 7. 用户反馈摘要

从 Issues 描述里可以提炼出几类非常明确的真实痛点：

1. **配置改了不立刻生效**  
   典型代表：[#7395](https://github.com/zeroclaw-labs/zeroclaw/issues/7395)、[#7400](https://github.com/zeroclaw-labs/zeroclaw/issues/7400)。  
   用户希望的是“改完即用”，而不是靠重启或重新进入流程去刷新状态。

2. **交互流程会卡住或误导用户**  
   典型代表：[#7373](https://github.com/zeroclaw-labs/zeroclaw/issues/7373)、[#7376](https://github.com/zeroclaw-labs/zeroclaw/issues/7376)。  
   这说明 onboarding 和 dashboard 的状态反馈仍需加强。

3. **终端/TUI 兼容性仍有现实摩擦**  
   典型代表：[#7377](https://github.com/zeroclaw-labs/zeroclaw/issues/7377)、[#7378](https://github.com/zeroclaw-labs/zeroclaw/issues/7378)。  
   用户在 macOS、浅色/深色终端配置、复制快捷键等真实场景里遇到了体验问题。

4. **用户希望工具链更“聪明”，但不能误判**  
   典型代表：[#7406](https://github.com/zeroclaw-labs/zeroclaw/pull/7406)、[#7407](https://github.com/zeroclaw-labs/zeroclaw/pull/7407)。  
   这说明项目的推荐/切换逻辑已经从“有功能”进入到“必须足够准确”的阶段。

**用户满意点：**  
从大量修复 PR 可以看出，维护者对稳定性问题响应积极，且正在把很多隐性故障转化为显式保护逻辑，这对用户信任是正向信号。  

---

## 8. 待处理积压

本次快照里没有明显“沉默很久”的单条老 Issue 数据，但**待合并 PR 仍有 25 条**，这本身就是主要积压。建议维护者优先关注以下高价值项：

- [#7407](https://github.com/zeroclaw-labs/zeroclaw/pull/7407) — model switch profile 校验，正确性强、风险高  
- [#7406](https://github.com/zeroclaw-labs/zeroclaw/pull/7406) — tool suggestion 去噪，影响面大  
- [#7404](https://github.com/zeroclaw-labs/zeroclaw/pull/7404) — Matrix 超时修复，部署稳定性关键  
- [#7402](https://github.com/zeroclaw-labs/zeroclaw/pull/7402) — 避免 gateway 因 accept() 异常崩溃  
- [#7394](https://github.com/zeroclaw-labs/zeroclaw/pull/7394) — voice pipeline 架构预留  
- [#7391](https://github.com/zeroclaw-labs/zeroclaw/pull/7391) — 通道并发预算可配置  
- [#7393](https://github.com/zeroclaw-labs/zeroclaw/pull/7393) — memory API 响应内容限长  
- [#7392](https://github.com/zeroclaw-labs/zeroclaw/pull/7392) — MCP registry drop 清理回归测试  
- [#7408](https://github.com/zeroclaw-labs/zeroclaw/issues/7408) — runtime tool 子标签映射补全（CI/标注链路）

**优先级建议：**  
先处理**崩溃/阻塞流程/状态错误**，再处理**UX 和文档**，最后是**维护类和规范类** PR。这样可以最大化降低回归风险，并提升下一轮发布的稳定性。  

---  

如果你愿意，我也可以把这份日报进一步整理成：  
- **适合发到团队群的短版**，或  
- **适合放到 Notion / 飞书的正式日报版**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*