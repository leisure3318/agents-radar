# OpenClaw 生态日报 2026-06-07

> Issues: 7 | PRs: 7 | 覆盖项目: 13 个 | 生成时间: 2026-06-07 00:20 UTC

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

# OpenClaw 项目动态日报（2026-06-07）

## 1) 今日速览
OpenClaw 今天依然保持较高活跃度：过去 24 小时共有 **7 条 Issue 更新**、**7 条 PR 更新**，但 **没有新版本发布**，说明当前节奏更偏向“修复、补强、审查”而非正式发版。  
从合并/关闭的 PR 看，项目在 **状态持久化与迁移可靠性** 上继续推进，属于对底层稳定性很关键的工程改进。  
与此同时，社区侧出现了 **P1 级推理线程错误** 和 **版本回归构建失败** 等高优先级问题，表明项目仍处于“快速迭代但需控制稳定性风险”的阶段。  
整体判断：**活跃度高，健康度中上，但发布节奏略滞后于开发节奏**。

---

## 2) 项目进展
今日共有 **2 个重要 PR 已关闭/落地**，推进点主要集中在运行态状态迁移与去文件化：

- [#91034 fix: store acpx process state in sqlite](https://github.com/openclaw/openclaw/pull/91034)  
  将 ACPX gateway 的实例 ID 和进程租约从旧文件迁移到 SQLite-backed state，并补充 doctor migration。  
  **意义**：减少 legacy 文件状态带来的不一致与升级风险，提升插件/网关状态可恢复性。

- [#91030 fix: store device-pair notify state in sqlite](https://github.com/openclaw/openclaw/pull/91030)  
  将 device-pair 的通知订阅和请求去重状态迁移至 SQLite。  
  **意义**：同样是在做“状态统一存储”，降低多文件散落状态导致的维护成本。

### 今日推进的整体评价
这两条 PR 的共同点是：  
- 都在做 **持久化收敛**；  
- 都属于 **稳定性/可维护性提升**；  
- 对用户可见功能不算“新”，但对系统升级和长周期运行非常关键。  

可以认为，OpenClaw 今天在“产品功能”上没有明显扩张，但在“运行可靠性”上前进了 **一小步但很实在的一步**。  
其余 5 个 PR 仍在审查/等待中，说明当前主线仍然处于高并发开发状态。

---

## 3) 社区热点
今天最活跃的讨论主要集中在 **iOS/TestFlight、版本回归、跨线程推理错误、UI 可用性** 四类诉求。

### 热点 1：iOS TestFlight 访问请求反复出现
- [#91040 Request iOS TestFlight Access](https://github.com/openclaw/openclaw/issues/91040)  
  评论数 3，👍 1
- [#91038 Request iOS TestFlight Access](https://github.com/openclaw/openclaw/issues/91038)  
  评论数 2，👍 1

**分析**：  
同一类请求在同一天出现两次，说明用户对 **官方 iOS Node app / TestFlight 访问** 有持续需求。  
这类需求本质上不是“功能 bug”，而是 **移动端接入与产品可达性** 的诉求，反映出 OpenClaw 已经进入真实使用场景，用户希望更方便地在 iPhone 上接入。

### 热点 2：升级后构建失败的回归问题
- [#91035 [Bug]: Build fails on v2026.6.1](https://github.com/openclaw/openclaw/issues/91035)  
  评论数 2，👍 1

**分析**：  
这是典型的 **升级回归** 反馈，且发生在版本切换后构建失败，风险较高。  
这类问题通常会直接影响用户升级意愿，是需要尽快排查的“发布信任度”问题。

### 热点 3：推理模型线程继续时的加密内容错误
- [#91033 [Bug]: microsoft-foundry reasoning models return 400 invalid_encrypted_content when continuing a thread](https://github.com/openclaw/openclaw/issues/91033)  
  评论数 1，👍 1

**分析**：  
虽然评论不多，但这是 **P1 级** 问题，且涉及线程续写与 provider 兼容性，属于核心使用路径。  
这种错误往往会直接破坏“对话连续性”，对智能体产品体验影响很大。

### 热点 4：界面可用性与“别挡我视线”
- [#91036 [Feature]: workspace 右侧文件栏建议可自动隐去](https://github.com/openclaw/openclaw/issues/91036)  
  评论数 1，👍 1

**分析**：  
这是典型的 **界面密度/干扰感** 问题。用户不是要更多功能，而是要更少的视觉占用。  
说明部分用户已经进入高频工作流，对界面“留白”和“可折叠性”更敏感。

---

## 4) Bug 与稳定性
按严重程度排序，今日新增/活跃的主要问题如下：

### P1：推理线程续写失败，影响核心对话状态
- [#91033 [Bug]: microsoft-foundry reasoning models return 400 invalid_encrypted_content when continuing a thread](https://github.com/openclaw/openclaw/issues/91033)

**问题描述**：  
在 `microsoft-foundry` provider 的 reasoning model 上，继续线程时会报 `400 invalid_encrypted_content`。  
这意味着 OpenClaw 在 replay/continuation 处理上可能与 provider 的加密内容约束不兼容。

**影响**：  
- 直接影响线程连续性  
- 对“会话记忆/上下文续写”类功能杀伤较大  
- 属于优先级最高的稳定性问题之一

**是否已有 fix PR**：  
当前提供的 PR 列表中 **未见直接对应的修复 PR**。

---

### P2：升级到 v2026.6.1 后构建失败
- [#91035 [Bug]: Build fails on v2026.6.1](https://github.com/openclaw/openclaw/issues/91035)

**问题描述**：  
从 `v2026.5.20` 升级到 `v2026.6.1` 后，执行 `./scripts/docker/setup.sh` 最终构建失败。

**影响**：  
- 破坏升级路径  
- 影响新版本可用性  
- 可能阻塞一部分用户完成环境部署

**是否已有 fix PR**：  
当前提供的 PR 列表中 **未见直接对应的修复 PR**。

---

### 其他稳定性相关信号
- [#91041 fix(imessage): self-explaining private-API failures and dedicated send timeout](https://github.com/openclaw/openclaw/pull/91041)  
  虽然是 PR，但它说明 iMessage 通道在 macOS 26 环境下存在私有 API/超时问题，属于稳定性增强方向。

- [#91037 fix(config): allow thinkingLevelMap in persisted model schema](https://github.com/openclaw/openclaw/pull/91037)  
  指向配置持久化严格校验问题，虽不是崩溃型 bug，但属于会阻断 onboarding 的“硬错误”。

---

## 5) 功能请求与路线图信号
今日新增的功能诉求主要集中在 **记忆能力、界面可控性、移动端可达性**。

### 值得关注的功能请求

- [#91039 [Feature]: 从 sessions 文件提取会话内容并整理成日期记忆文件](https://github.com/openclaw/openclaw/issues/91039)  
  用户明确表达“OpenClaw 常常忘记”，希望系统自动从 `.openclaw/agents/main/sessions/` 中提取会话并生成日期记忆文件。  
  **路线图信号**：这是非常典型的 **session-state / memory pipeline** 诉求，说明用户已经开始把 OpenClaw 当作“持续工作的智能体”，而不是单次问答工具。

- [#91036 右侧 workspace 文件栏可自动隐去](https://github.com/openclaw/openclaw/issues/91036)  
  **路线图信号**：偏 UI/UX 改善，属于低风险高满意度的小功能，适合在稳定性修复后进入快速迭代。

- [#91040 / #91038 iOS TestFlight Access](https://github.com/openclaw/openclaw/issues/91040)  
  [#91038](https://github.com/openclaw/openclaw/issues/91038)  
  **路线图信号**：更像是产品分发/接入需求，不是纯 feature request，但反映出 **移动端使用场景在扩大**。

### 结合现有 PR 判断，较可能进入下一版本的内容
- [#91041 iMessage private API 错误可解释化 + 超时修复](https://github.com/openclaw/openclaw/pull/91041)
- [#90794 buffer-only attachment materialization](https://github.com/openclaw/openclaw/pull/90794)
- [#91031 OpenRouter OAuth login](https://github.com/openclaw/openclaw/pull/91031)
- [#91037 persisted model schema 支持 thinkingLevelMap](https://github.com/openclaw/openclaw/pull/91037)

**判断**：  
这些 PR 都带有明确的“可落地修复/能力补齐”特征，且多数是 P1/P2 或 ready-for-review 状态，**进入下一版本的概率较高**。  
相比之下，#91039 和 #91036 更像用户驱动型增强，优先级可能略后。

---

## 6) 用户反馈摘要
从今日 Issues 的描述中，可以提炼出几条非常清晰的真实用户反馈：

### 1. 用户已经在真实生产/半生产环境使用 OpenClaw
- 典型反馈见 [#91040](https://github.com/openclaw/openclaw/issues/91040) / [#91038](https://github.com/openclaw/openclaw/issues/91038)  
- 用户提到自己已经集成了 **Gateway、Telegram、WebChat、Google Workspace** 等能力  
**说明**：OpenClaw 不再只是试验项目，而是被用于实际工作流。

### 2. 用户最怕的是升级不稳
- [#91035](https://github.com/openclaw/openclaw/issues/91035)  
**痛点**：版本升级后构建直接坏掉，用户会对新版本失去信心。  
**需求本质**：需要更可靠的发布兼容性和迁移说明。

### 3. 用户希望“智能体别太健忘”
- [#91039](https://github.com/openclaw/openclaw/issues/91039)  
**痛点**：会话内容没有被有效沉淀，导致“OpenClaw 常常忘记”。  
**需求本质**：希望具备更强的长期记忆、会话归档、日期维度回溯能力。

### 4. 用户对界面干扰非常敏感
- [#91036](https://github.com/openclaw/openclaw/issues/91036)  
**痛点**：右侧文件栏太占空间，干扰注意力。  
**需求本质**：需要更强的可折叠/可隐藏 UI 设计。

### 5. 用户对 provider 兼容性和线程连续性要求很高
- [#91033](https://github.com/openclaw/openclaw/issues/91033)  
**痛点**：线程继续时出错，意味着模型对话无法顺畅延续。  
**需求本质**：不是单点错误，而是影响整个智能体交互体验的基础能力。

---

## 7) 待处理积压
严格来说，今日数据里没有“长期沉寂很多天”的老问题；但以下条目属于 **当前最值得维护者优先处理的待办队列**，一旦超过 48 小时仍无动作，就会形成明显积压。

### 高优先级待审 PR
- [#91031 Add OpenRouter OAuth login](https://github.com/openclaw/openclaw/pull/91031)  
  P2，且标记为 ready for maintainer look，属于明显的高价值能力扩展。

- [#91037 allow thinkingLevelMap in persisted model schema](https://github.com/openclaw/openclaw/pull/91037)  
  P1，且需要真实行为证据，可能卡在验证链路。

- [#91041 self-explaining private-API failures and dedicated send timeout](https://github.com/openclaw/openclaw/pull/91041)  
  与 iMessage 稳定性直接相关，建议优先 review。

- [#90794 materialize buffer-only message.send attachments](https://github.com/openclaw/openclaw/pull/90794)  
  涉及消息发送路径可靠性，且有 availability 风险标记。

### 高优先级待修 Issue
- [#91033 microsoft-foundry reasoning models invalid_encrypted_content](https://github.com/openclaw/openclaw/issues/91033)  
  P1，核心会话连续性问题。

- [#91035 Build fails on v2026.6.1](https://github.com/openclaw/openclaw/issues/91035)  
  回归问题，直接影响升级体验。

### 其他建议关注项
- [#91036 workspace file bar auto-hide](https://github.com/openclaw/openclaw/issues/91036)  
  虽非阻塞，但用户意愿明确，适合纳入 UX backlog。

- [#91039 session memory file generation](https://github.com/openclaw/openclaw/issues/91039)  
  与产品“记忆能力”方向高度一致，建议尽早形成产品讨论。

---

## 总体判断
OpenClaw 今日呈现出很典型的 **“底层稳定性修复 + 新能力待审 + 用户真实场景增强需求上升”** 的状态。  
项目健康度总体不错，尤其是在 **SQLite 化状态管理** 方面有实质进展；但同时，**P1/P2 Bug 仍在冒头**，说明当前最重要的不是“加速出功能”，而是确保发布质量、线程连续性和升级稳定性。  

如果你愿意，我可以继续把这份日报整理成：
1. **更适合 Slack/飞书群发的短版**，或  
2. **更适合管理层阅读的周报格式**。

---

## 横向生态对比

下面是一份面向技术决策者与开发者的横向对比分析。

---

## 1) 生态全景

过去 24 小时，个人 AI 助手/自主智能体开源生态呈现出明显的**分层活跃**特征：少数项目保持高频迭代（OpenClaw、Hermes Agent、ZeroClaw），其余项目大多静默或低活跃。  
整体需求重心已从“能用”转向“**能稳定长期工作**”，集中体现在状态持久化、Provider 兼容、升级回归、安全边界和 UX 可控性上。  
用户侧信号也更接近真实生产使用：移动端接入、会话记忆、桌面工作流、语音/多模态等诉求明显上升。  
从发版节奏看，**开发速度普遍快于发布速度**，说明生态仍处于“快速打磨、质量收敛”的阶段。

---

## 2) 各项目活跃度对比

> 说明：下表中的 Issues/PR 数为**过去 24 小时活跃数**；Release 为当天是否有新版本发布/披露。

| 项目 | Issues（24h） | PR（24h） | Release 情况 | 健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 7 | 7 | 无新版本发布 | **中上**：活跃度高，但稳定性压力仍在 |
| **Hermes Agent** | 8 | 20 | 未见新版本发布 | **高活跃**：需求密集，但 review/CI 压力较大 |
| **ZeroClaw** | 0 | 3 | 无新版本发布 | **稳健**：低噪音，偏底座安全与治理 |
| NanoBot | 0 | 0 | 无活动/未见新版本 | **低活跃**：静默观察 |
| PicoClaw | 0 | 0 | 无活动/未见新版本 | **低活跃**：静默观察 |
| NanoClaw | 0 | 0 | 无活动/未见新版本 | **低活跃**：静默观察 |
| NullClaw | 0 | 0 | 无活动/未见新版本 | **低活跃**：静默观察 |
| IronClaw | 0 | 0 | 无活动/未见新版本 | **低活跃**：静默观察 |
| LobsterAI | 0 | 0 | 无活动/未见新版本 | **低活跃**：静默观察 |
| TinyClaw | 0 | 0 | 无活动/未见新版本 | **低活跃**：静默观察 |
| Moltis | 0 | 0 | 无活动/未见新版本 | **低活跃**：静默观察 |
| CoPaw | 0 | 0 | 无活动/未见新版本 | **低活跃**：静默观察 |
| ZeptoClaw | 0 | 0 | 无活动/未见新版本 | **低活跃**：静默观察 |

**一句话结论**：生态中真正形成“开发-反馈-修复”闭环的，主要是 **OpenClaw / Hermes Agent / ZeroClaw** 三个项目。

---

## 3) OpenClaw 在生态中的定位

### 优势
- **真实用户信号强**：出现 iOS TestFlight、Gateway/Telegram/WebChat/Google Workspace 集成、会话记忆等诉求，说明已进入实际工作流。
- **工程主线清晰**：今天两条关键 PR 都在做 **SQLite 化状态收敛**，体现出对长期运行、升级迁移、状态一致性的重视。
- **问题更贴近“个人助手”场景**：记忆、线程连续性、UI 可折叠、移动端访问等，都是典型个人 AI 助手的高频需求。

### 相比同类的技术路线差异
- **相对 Hermes Agent**：OpenClaw 更偏向“**个人 AI 助手/工作流执行体**”，强调会话连续性、状态持久化和用户体验；Hermes 更像“**多 Provider / 多模态 / 多入口的能力平台**”，扩张更快、集成面更广。
- **相对 ZeroClaw**：OpenClaw 更偏“**用户侧能力与运行稳定性**”，ZeroClaw 更偏“**插件平台的安全治理与沙箱硬化**”。
- **对比其他静默项目**：OpenClaw 已经形成明确的社区互动和反馈链路，明显高于处于静默或低活跃状态的项目。

### 社区规模判断
- **中等偏活跃**：  
  - 比多数静默项目更有真实使用痕迹；  
  - 但从 PR 吞吐和议题广度看，仍不及 Hermes 的“高密度协同”；  
  - 社区关注点更聚焦，适合做深度产品化，而不是无限扩张。

---

## 4) 共同关注的技术方向

### 1. 状态持久化 / 记忆能力
- **OpenClaw**：将 ACPX process state、device-pair notify state 迁移到 SQLite；用户希望从 sessions 提取会话整理成记忆文件。  
- **Hermes Agent**：`Hindsight writes` 镜像到 owned log，强调可追溯性与持久记忆。  
- **共同诉求**：让智能体“别忘事”，并能长期可恢复、可审计。

### 2. Provider / 模型切换与兼容性
- **OpenClaw**：`microsoft-foundry reasoning models` 线程续写时报 `invalid_encrypted_content`。  
- **Hermes Agent**：`model.base_url` 覆盖、`/model` provider 切换、`user_peer_aliases` 解析一致性问题。  
- **共同诉求**：不同模型/Provider 间切换时，状态和配置不能污染，不能静默失效。

### 3. 安全边界与权限控制
- **Hermes Agent**：Telegram removed users 可在 auth check 前注入 prompts。  
- **ZeroClaw**：插件 sandbox 隔离、出站 SSRF 防护、环境变量隔离、签名策略。  
- **共同诉求**：智能体系统必须默认具备最小权限和安全隔离能力。

### 4. UX 可控性与工作台化
- **OpenClaw**：workspace 右侧文件栏自动隐去。  
- **Hermes Agent**：verbose 输出可折叠、字体/密度控制、桌面端布局修复。  
- **共同诉求**：用户已进入高频工作流，需要更低干扰、更高信息密度、更强可配置性。

### 5. 移动端 / 语音 / 多模态接入
- **OpenClaw**：iOS TestFlight 访问需求。  
- **Hermes Agent**：audio passthrough、voice shortcut、Gemini/Discord 多模态扩展。  
- **共同诉求**：智能体入口从桌面和 Web 扩展到移动端、语音和多模态。

---

## 5) 差异化定位分析

### OpenClaw
- **功能侧重**：长期会话、状态持久化、升级稳定性、用户工作流整合。  
- **目标用户**：重度个人助手用户、需要持续上下文的团队/个人。  
- **架构特征**：更强调运行态状态管理与迁移可靠性，SQLite 化是明显信号。  
- **定位一句话**：更像“**个人 AI 助手操作系统**”。

### Hermes Agent
- **功能侧重**：Provider/Model 切换、多模态、语音、桌面/TUI、国际化。  
- **目标用户**：开发者、重度 Agent 使用者、需要多入口集成的人群。  
- **架构特征**：广覆盖、多通道、多集成，功能面扩张快。  
- **定位一句话**：更像“**Agent 能力平台**”。

### ZeroClaw
- **功能侧重**：插件安全、沙箱隔离、签名治理、工具命名空间和限流。  
- **目标用户**：平台维护者、插件生态建设者、对安全合规敏感的团队。  
- **架构特征**：偏平台底座与治理层。  
- **定位一句话**：更像“**可治理的插件运行平台**”。

### 其余静默项目
- 当前缺少足够活动信号，难以判断是否在维护、收敛或转入低频迭代。

---

## 6) 社区热度与成熟度

### 快速迭代阶段
- **Hermes Agent**：  
  PR 更新量最高（20），议题覆盖安全、Provider、桌面端、多模态、i18n。  
  结论：**扩张快、需求多、backlog 压力大**，属于典型高速迭代期。

- **OpenClaw**：  
  Issue/PR 均衡（7/7），且用户诉求已进入真实工作流与稳定性修复。  
  结论：**功能逐步产品化，正在从“开发活跃”走向“质量收敛”**。

- **ZeroClaw**：  
  虽然 Issues 为 0，但 3 个 PR 都集中在基础安全和治理。  
  结论：**低噪音、高聚焦的底座强化期**。

### 质量巩固阶段
- **OpenClaw**：SQLite 收敛、线程连续性修复、升级回归排查，明显在补稳定性短板。  
- **ZeroClaw**：沙箱、签名、限流，属于典型“为规模化使用做硬化”的阶段。

### 低活跃/静默阶段
- **NanoBot、PicoClaw、NanoClaw、NullClaw、IronClaw、LobsterAI、TinyClaw、Moltis、CoPaw、ZeptoClaw**  
  当前没有活跃信号，建议按“观察池”处理。

---

## 7) 值得关注的趋势信号

### 趋势 1：智能体正在从“会回答”转向“会持续工作”
- 典型信号：OpenClaw 的会话记忆、SQLite 状态迁移；Hermes 的 owned log。  
- 对开发者的价值：**记忆、恢复、审计**将成为基础能力，而不是附加功能。

### 趋势 2：Provider 兼容性成为核心竞争力
- 典型信号：OpenClaw 的 reasoning thread 续写错误；Hermes 的 provider 切换/校验问题。  
- 对开发者的价值：需要把**配置隔离、状态幂等、模型兼容测试**做成一等公民。

### 趋势 3：安全默认值和权限边界正在前置
- 典型信号：Hermes 的 Telegram auth 问题；ZeroClaw 的 sandbox / signing / rate limit。  
- 对开发者的价值：Agent 平台不再能依赖“后置修补”，必须默认安全。

### 趋势 4：UX 从“能看”升级到“少打扰、可控制”
- 典型信号：OpenClaw 的文件栏自动隐藏；Hermes 的 verbose 折叠、密度控制。  
- 对开发者的价值：工作台型产品要把**信息噪音管理**作为核心设计目标。

### 趋势 5：移动端与多模态入口在扩大
- 典型信号：OpenClaw 的 TestFlight 需求；Hermes 的 audio passthrough、voice shortcut。  
- 对开发者的价值：下一代助手的入口不只在 Web/桌面，**语音和移动端**会越来越重要。

---

### 总结判断
当前生态的主线不是“谁发了更多新功能”，而是“谁能把智能体做成**可长期运行、可迁移、可治理、可扩展**的系统”。  
- **OpenClaw**：最像真实个人助手产品，正在补稳定性与记忆体系。  
- **Hermes Agent**：最像能力平台，扩张最快，但治理压力也最大。  
- **ZeroClaw**：最像基础设施层，专注安全和插件治理。  

如果你需要，我可以继续把这份内容整理成：
1. **适合汇报 PPT 的一页版结论**，或  
2. **带“投资/战略建议”视角的决策摘要版**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-06-07）

## 1) 今日速览
过去 24 小时，Hermes Agent 维持了**高强度的开发活跃度**：8 条 Issue 持续涌入、20 条 PR 集中更新，说明项目仍处在高频迭代阶段，且社区对功能扩展与稳定性修复都有持续需求。  
从主题看，今天的讨论重心明显集中在**安全与权限、模型/Provider 切换、桌面端与 TUI 体验、以及多模态/语音能力**上，说明项目正从“可用”向“更易用、更安全、更可扩展”推进。  
不过，从整日结果看，**仅 1 个 PR 进入 closed 状态**，合入效率相对输入量偏低，主线整合与审查压力仍然较大。  
整体判断：**活跃度高、需求密集、方向清晰，但 backlog 增长速度快于收敛速度，需关注 review/CI/维护者吞吐。**

---

## 3) 项目进展
今日仅有 **1 个 PR 关闭**，其余 19 个仍在待处理状态，说明项目仍处于“多线并行开发、少量收口”的阶段。

### 今日推进的关键 PR
- **#40870 `feat(memory): mirror Hindsight writes to owned log`**  
  链接：<https://github.com/NousResearch/hermes-agent/pull/40870>  
  这个 PR 聚焦记忆层持久化与可追溯性，尝试让 Hindsight 写入同步镜像到 owned log，属于**数据完整性/审计能力**方向的增强。  
  虽然状态为 **CLOSED**，但它代表了项目对“记忆数据可恢复、可审计”的持续投入；若后续重新打开并整合，价值较高。

### 今日整体前进量
- **新增/活跃 Issues：8**
- **PR 更新：20**
- **关闭 PR：1**
- **净待处理压力：继续上升**

结论：今天的“推进”更多体现在**方向扩展**，而不是大规模落地；项目能力边界继续拓宽，但主干收敛仍需时间。  
相关链接：<https://github.com/NousResearch/hermes-agent/pulls>

---

## 4) 社区热点
> 注：当前快照里，Issue 与 PR 的评论数基本为 0/未披露，**没有出现明显“高评论/高反应”的单条热点**。因此以下按“主题热度”和“潜在讨论度”归纳。

### 热点 1：安全与认证边界
- **#40863 Telegram removed users can inject prompts before auth check**  
  链接：<https://github.com/NousResearch/hermes-agent/issues/40863>  
  这类问题天然会引发社区高度关注，因为它涉及**权限检查时机错误**与**提示词注入风险**，属于“看似流程问题，实则安全漏洞”。

### 热点 2：Provider / Model 切换稳定性
- **#40862 model.base_url overwrite bug**  
  <https://github.com/NousResearch/hermes-agent/issues/40862>  
- **#40852 `/model` slash command provider switch bug**  
  <https://github.com/NousResearch/hermes-agent/issues/40852>  
- **#40874 `user_peer_aliases` not consulted in peer resolution**  
  <https://github.com/NousResearch/hermes-agent/issues/40874>  
  这一组问题都指向同一诉求：**跨 provider 切换时不能把旧配置/旧上下文“带过去”**。对重度用户来说，这属于高频、强痛点问题。

### 热点 3：桌面端与交互体验
- **#40875 Equanaut vertical overlap**  
  <https://github.com/NousResearch/hermes-agent/issues/40875>  
- **#40855 Voice shortcut not registered**  
  <https://github.com/NousResearch/hermes-agent/issues/40855>  
- **#40854 Collapsible verbose output**  
  <https://github.com/NousResearch/hermes-agent/issues/40854>  
  这些反馈体现出用户正在把 Hermes Agent 当作**日常工作台**而非实验工具，因此对 UI 细节、快捷键、日志可读性非常敏感。

### 热点 4：多模态/语音能力扩展
- **#40873 Audio passthrough for voice chat**  
  <https://github.com/NousResearch/hermes-agent/issues/40873>  
- **#40864 / #40860 / #40859 / #40858** 等多模态与 Gemini/Discord 相关 PR  
  <https://github.com/NousResearch/hermes-agent/pulls>  
  说明社区正在推动 Hermes Agent 向**音频、图像、Discord 机器人工作流**进一步扩展。

---

## 5) Bug 与稳定性
以下按严重程度排序，并标注是否已有对应 fix PR。

### P1 / 安全级
1. **#40863 Telegram removed users can inject prompts before auth check**  
   链接：<https://github.com/NousResearch/hermes-agent/issues/40863>  
   影响：被移出允许列表的用户仍可能在拒绝前让消息进入处理链，存在**提示词注入/越权处理**风险。  
   **当前未看到直接对应的 fix PR。**  
   风险等级：**高**，应优先处理。

### P2 / 功能性回归
2. **#40862 hermes model wizard overwrites `model.base_url`**  
   链接：<https://github.com/NousResearch/hermes-agent/issues/40862>  
   影响：添加新 provider 时污染默认模型配置，导致后续调用走错 endpoint。  
   **已有对应修复 PR：#40869**  
   <https://github.com/NousResearch/hermes-agent/pull/40869>

3. **#40852 `/model` slash command validates against wrong provider catalog**  
   链接：<https://github.com/NousResearch/hermes-agent/issues/40852>  
   影响：切换 provider 时校验逻辑错误，阻断正常模型切换。  
   **已有部分相关修复 PR：#40861**  
   <https://github.com/NousResearch/hermes-agent/pull/40861>  
   但从问题描述看，是否完全覆盖仍需确认。

4. **#40874 `user_peer_aliases` not consulted for per-call peer args**  
   链接：<https://github.com/NousResearch/hermes-agent/issues/40874>  
   影响：别名配置在 session 绑定时有效，但 per-call 参数路径不一致，导致行为不统一。  
   **暂无直接 fix PR。**

### P3 / 可用性与体验问题
5. **#40855 voice.record_key 在设置中可见但未注册快捷键**  
   链接：<https://github.com/NousResearch/hermes-agent/issues/40855>  
   影响：用户配置了却无效，属于“配置假成功”。  
   **暂无直接 fix PR。**

6. **#40875 Equanaut Prime / Only 纵向重叠**  
   链接：<https://github.com/NousResearch/hermes-agent/issues/40875>  
   影响：桌面端布局遮挡，明显影响可用性。  
   **暂无直接 fix PR。**

7. **#40854 verbose 输出不可折叠，工具调用难以定位错误**  
   链接：<https://github.com/NousResearch/hermes-agent/issues/40854>  
   影响：不致命，但会显著降低调试效率。  
   **暂无直接 fix PR。**

### 已在 PR 层面持续修补的稳定性面
- Discord / Gemini / gateway / batch runner / image_gen 等方向出现多条修复 PR，说明维护者正在补齐“高频边界问题”。  
  PR 示例：<https://github.com/NousResearch/hermes-agent/pulls>

---

## 6) 功能请求与路线图信号
今天的新需求非常集中，能清晰反映下一阶段路线图倾向：

### 可能进入下一版本的高优先级方向
1. **新增 Provider 集成**
   - **#40876 Add Cursor provider integration**  
     <https://github.com/NousResearch/hermes-agent/pull/40876>  
     这是明显的能力扩张信号：Hermes Agent 正在从“接入若干模型”走向“接入完整生态平台”。  
     若 review 顺利，**很可能进入下一轮版本候选**。

2. **音频/语音输入能力增强**
   - **#40873 OpenAI-compatible API audio passthrough**  
     <https://github.com/NousResearch/hermes-agent/issues/40873>  
     这反映用户希望把“语音聊天”升级为“真正的音频多模态输入链路”。  
     若实现成本可控，属于**中高优先级路线图信号**。

3. **可观测性与调试体验优化**
   - **#40854 Collapsible verbose output**  
     <https://github.com/NousResearch/hermes-agent/issues/40854>  
     这是典型的“从开发者工具向生产可用工具”过渡需求，具有较强普适性。

4. **桌面端体验完善**
   - **#40868 Font size and density controls**  
     <https://github.com/NousResearch/hermes-agent/pull/40868>  
   - **#40875 纵向布局修复**  
     <https://github.com/NousResearch/hermes-agent/issues/40875>  
     说明桌面端正在补齐“可配置性”和“不同窗口尺寸适配”。

5. **国际化/区域化**
   - **#40872 Korean README**  
     <https://github.com/NousResearch/hermes-agent/pull/40872>  
   - **#40849 move onboarding strings into i18n**  
     <https://github.com/NousResearch/hermes-agent/pull/40849>  
     这类 PR 表明项目在为更广泛用户群做准备，属于**增长型信号**而非单点修补。

### 路线图判断
如果这些 PR 通过率较高，下一版本大概率会围绕：
- **Provider 扩张**
- **桌面端可用性**
- **多模态能力**
- **国际化**
- **配置/状态稳定性修复**

---

## 7) 用户反馈摘要
从 Issues 的具体措辞里，可以提炼出以下真实用户痛点：

### 1. “配置改了，但系统行为没变”——信任感受损
- 代表：**#40862、#40855、#40874、#40852**  
  链接：
  - <https://github.com/NousResearch/hermes-agent/issues/40862>
  - <https://github.com/NousResearch/hermes-agent/issues/40855>
  - <https://github.com/NousResearch/hermes-agent/issues/40874>
  - <https://github.com/NousResearch/hermes-agent/issues/40852>  
  用户最反感的是**静默失败**：配置写进去了，但运行时未生效，或被旧状态覆盖。

### 2. 用户已经把 Hermes Agent 用在“日常工作流”里
- 代表：**#40854、#40875**  
  链接：
  - <https://github.com/NousResearch/hermes-agent/issues/40854>
  - <https://github.com/NousResearch/hermes-agent/issues/40875>  
  反馈重点不是“能不能跑”，而是“能不能高效看、快速找错、在小屏上正常用”。

### 3. 语音/多模态能力是强需求，而不是附加项
- 代表：**#40873、#40855**  
  链接：
  - <https://github.com/NousResearch/hermes-agent/issues/40873>
  - <https://github.com/NousResearch/hermes-agent/issues/40855>  
  用户希望 Hermes 能更自然地接入音频、快捷键、语音工作流，说明交互方式正在向“更自然输入”演进。

### 4. 安全与权限处理必须前置
- 代表：**#40863**  
  链接：<https://github.com/NousResearch/hermes-agent/issues/40863>  
  用户对“被移除用户仍可能影响系统”的敏感度很高，这类问题会直接影响对项目的信任。

---

## 8) 待处理积压
> 说明：本次快照中所有 Issue/PR 都是近 1 天内新开或活跃，并没有明显“长期沉默”的陈旧项。  
> 但从维护优先级看，以下条目最值得持续盯防，避免在待处理队列中越积越多。

### 建议优先跟进的积压项
1. **安全级未修复问题**
   - **#40863** Telegram prompt injection before auth check  
     <https://github.com/NousResearch/hermes-agent/issues/40863>  
   这是最应该进入快速通道的项。

2. **配置污染/切换回归**
   - **#40862** / **#40852** / **#40874**  
     <https://github.com/NousResearch/hermes-agent/issues/40862>  
     <https://github.com/NousResearch/hermes-agent/issues/40852>  
     <https://github.com/NousResearch/hermes-agent/issues/40874>  
   这三类问题会持续影响高级用户与多 provider 用户，属于“复发概率高”的积压。

3. **待审查 PR 积压偏大**
   - 共有 **19 个待合并 PR**：  
     <https://github.com/NousResearch/hermes-agent/pulls>  
   虽然方向丰富，但如果 review/CI 跟不上，容易把“功能增长”变成“集成拥堵”。

### 维护提醒
- 建议优先排查：**安全问题 > 配置回归 > 影响主流程的 UI/交互问题**
- 对高影响 PR 建议尽快做：
  1. owner 指派  
  2. CI/回归测试覆盖  
  3. 兼容性说明  
  4. 若涉及配置迁移，补充升级提示

---

如果你希望，我可以把这份日报进一步整理成：
1. **适合直接发布到团队群的精简版**，或  
2. **适合放进周报/晨会材料的表格版**。

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

# ZeroClaw 项目动态日报（2026-06-07）

## 1) 今日速览
ZeroClaw 今天整体呈现出**“高开发活跃、低运维噪音”**的状态：过去 24 小时内没有新增或活跃的 Issues，也没有新版本发布，但有 **3 条高相关联的功能型 PR 持续推进**。从内容看，团队正在集中补齐插件系统的关键能力，重点围绕 **sandbox 隔离、安全签名默认策略、插件工具命名空间与限流包装** 展开，说明项目正从“可运行”阶段向“可安全扩展”阶段推进。当前活跃度主要体现在代码层面，而不是用户反馈层面，整体健康度偏稳健。  
项目主页：<https://github.com/zeroclaw-labs/zeroclaw>

---

## 2) 版本发布
**今日无新版本发布。**  
- Releases 页：<https://github.com/zeroclaw-labs/zeroclaw/releases>

---

## 3) 项目进展
今天没有已合并/关闭的 PR，但有 3 条仍在推进中的关键 PR，构成了 ZeroClaw 当前最重要的研发主线：

### a. #7335 插件沙箱隔离：资源限制、SSRF 出站防护、环境变量隔离
- 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7335>
- 状态：OPEN
- 进展意义：
  - 这是插件系统安全边界的基础增强，核心是把“WASM 沙箱”从概念上的隔离，推进到**真正受约束的运行环境**。
  - 覆盖了 **资源限额、网络出站限制、环境变量作用域收缩**，可显著降低插件滥用 host 能力的风险。
- 对项目推进的作用：
  - 这是平台级硬化，属于**底座型改进**，后续插件生态扩展都要依赖它。

### b. #7336 插件签名策略默认提升为 permissive，并暴露签名状态
- 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7336>
- 状态：OPEN
- 进展意义：
  - 将插件信任默认策略从更保守/更弱的状态提升到 **permissive**，同时让验证状态可见。
  - 这意味着系统在“安全”和“易用”之间做出更可运营的平衡：默认不至于过严导致插件不可用，但会把签名状态显式呈现给用户。
- 对项目推进的作用：
  - 补上了插件安全链路中的**信任可观测性**，是沙箱硬化系列的重要一环。

### c. #7337 插件工具命名空间与 RateLimitedTool 包装
- 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7337>
- 状态：OPEN
- 进展意义：
  - 修复插件工具暴露为裸名称的问题，改为命名空间形式（`plugin__tool`），降低与原生/MCP 工具的冲突概率。
  - 引入 **RateLimitedTool wrapping**，让插件工具行为更接近平台级工具治理。
- 对项目推进的作用：
  - 这是插件工具体系的**可扩展性与治理能力补齐**，对后续大规模插件接入非常关键。

### 项目整体向前迈进了多少？
从这 3 个 PR 可以看出，ZeroClaw 今日推进的不是零散 feature，而是围绕插件系统做了一次**系统性补课**：  
- **安全边界**：#7335  
- **信任策略可见性**：#7336  
- **工具命名与限流治理**：#7337  

如果这些 PR 后续合并，将意味着插件体系在“可用”之外，进一步达到**可控、可治理、可规模化扩展**的成熟阶段。  
PR 列表：<https://github.com/zeroclaw-labs/zeroclaw/pulls>

---

## 4) 社区热点
**今日无 Issues 活跃，社区讨论热点主要集中在 PR。**

### 最活跃/最值得关注的 PR
1. **#7335 插件沙箱隔离**
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7335>
   - 热点原因：
     - 涉及插件系统的根安全边界，是典型的高优先级基础能力。
     - 用户/维护者通常会关注：沙箱是否真的限制了网络、资源与环境变量，是否会影响现有插件兼容性。

2. **#7336 默认签名策略与签名状态可见**
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7336>
   - 热点原因：
     - 触及“默认安全策略”，通常会引发关于**易用性 vs 安全性**的讨论。
     - 用户关心：默认 permissive 是否会放大风险，签名状态展示是否足够清晰。

3. **#7337 插件工具命名空间与限流**
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7337>
   - 热点原因：
     - 关乎工具生态兼容性，尤其是与原生/MCP 工具共存时是否会命名冲突。
     - 限流逻辑会影响插件执行体验，开发者会关注调用失败率、错误提示和边界行为。

### 背后的诉求
从这三条 PR 可以看出，社区/维护者当前最核心的诉求是：  
- **插件系统更安全**  
- **插件行为更可预测**  
- **工具生态更不易冲突**  
- **平台治理能力更接近生产级**

---

## 5) Bug 与稳定性
**今日没有新增 Issues，因此没有显式的 Bug / 崩溃 / 回归报告。**

### 按严重程度排序的已知问题
1. **高：插件沙箱“名义隔离、实际不受控”的风险**
   - 关联 PR：#7335  
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7335>
   - 说明：从 PR 描述看，当前问题是基础隔离能力不完整，属于高风险稳定性/安全性问题。
   - 是否已有 fix PR：**有，#7335 正在修复中**

2. **中：插件签名状态不可见/默认策略不理想**
   - 关联 PR：#7336  
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7336>
   - 说明：这类问题会导致用户对插件来源和可信度判断困难，可能引发误用。
   - 是否已有 fix PR：**有，#7336 正在修复中**

3. **中：插件工具裸命名导致冲突、限流缺失**
   - 关联 PR：#7337  
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7337>
   - 说明：这会影响多插件并存时的稳定性与可维护性。
   - 是否已有 fix PR：**有，#7337 正在修复中**

### 总体稳定性判断
当前没有用户侧问题积压，说明**公开故障面较小**；但从 PR 内容判断，维护团队正在主动预防未来规模化使用时可能出现的安全与治理风险，这对长期稳定性是正向信号。

---

## 6) 功能请求与路线图信号
今日没有新增 Issues 型功能请求，但从现有 PR 可以清晰读出下一阶段路线图信号：

### 高概率会进入下一版本的方向
1. **插件运行安全硬化**
   - 对应 PR：#7335  
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7335>
   - 判断：极可能是下一版的重要组成，因为它是整个插件体系安全上线前的基础条件。

2. **插件信任与签名策略可视化**
   - 对应 PR：#7336  
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7336>
   - 判断：很可能作为安全治理配套能力进入近期版本，尤其适合与沙箱硬化一起发布。

3. **插件工具平台化治理**
   - 对应 PR：#7337  
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7337>
   - 判断：如果插件系统开始扩大生态，这类命名空间与限流机制几乎是必选项，属于“扩展前提”。

### 路线图信号总结
ZeroClaw 的路线图正在从“支持插件”转向“**让插件在生产环境可控地运行**”。  
这意味着后续版本大概率会继续围绕：
- 沙箱/隔离
- 安全策略默认值
- 插件治理与观测
- 工具生态兼容性  
持续迭代。

---

## 7) 用户反馈摘要
**今日无 Issues 评论数据，无法从评论中提炼真实用户反馈。**

### 当前可观察到的“隐性用户需求”
虽然没有直接评论，但 PR 主题反映出用户最可能关心的问题包括：
- 插件是否真的安全隔离
- 插件是否容易接入、是否会破坏现有工作流
- 插件工具是否会与原生工具冲突
- 签名/可信状态是否足够透明

### 满意/不满意倾向
- **潜在满意点**：平台正在主动补齐安全和治理能力，说明维护方向偏成熟化。
- **潜在不满意点**：默认策略或更严格的限制可能引入使用门槛，需要在易用性上做好文档和提示。

相关 PR：
- <https://github.com/zeroclaw-labs/zeroclaw/pull/7335>
- <https://github.com/zeroclaw-labs/zeroclaw/pull/7336>
- <https://github.com/zeroclaw-labs/zeroclaw/pull/7337>

---

## 8) 待处理积压
从当前数据看，**没有长期未响应的 Issue**，因为今日 Issues 活跃度为 0，且最新 Issues 列表为空。  
不过仍有 3 条值得持续跟进的开放 PR，可视为“待处理积压中的高优先级项”：

1. **#7335 插件沙箱隔离**
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7335>
   - 关注点：安全边界、兼容性、性能开销

2. **#7336 默认签名策略与状态可见**
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7336>
   - 关注点：默认值是否合理、是否需要迁移说明

3. **#7337 插件工具命名空间与限流**
   - 链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7337>
   - 关注点：命名冲突是否完全消除、限流策略是否影响体验

---

## 总体结论
ZeroClaw 今日没有外部问题扰动，说明项目表面运行平稳；但内部研发显著活跃，且方向高度聚焦于**插件系统的安全化与生产化**。如果上述 3 个 PR 顺利推进并合并，项目将从“能扩展插件”迈向“**能安全、可治理地扩展插件**”，这通常是 AI 智能体平台走向成熟的重要标志。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*