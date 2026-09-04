# OpenClaw 生态日报 2026-09-04

> Issues: 23 | PRs: 66 | 覆盖项目: 13 个 | 生成时间: 2026-09-04 03:26 UTC

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

# OpenClaw 项目动态日报  
**日期：2026-09-04**  
数据来源：GitHub 近 24 小时更新

## 1) 今日速览
过去 24 小时，OpenClaw 处于**高强度活跃**状态：Issues 更新 23 条、PR 更新 66 条，并发布了 1 个新版本，说明项目仍在快速迭代和修复中。  
从内容看，今日讨论重心明显偏向**回归修复、跨端稳定性、账号/鉴权兼容性**，尤其集中在 Windows、Docker、iOS、Telegram、Slack 和 Gateway 相关路径。  
项目推进是“**功能继续前进，稳定性压力也同步上升**”的典型状态：一边在补齐 UI/移动端体验，一边处理升级后暴露的大量回归与边界条件问题。  
综合判断：**活跃度很高，但健康度属于“高产出 + 高修复负载”阶段**，短期需要重点压住 P0/P1 故障面。

---

## 2) 版本发布
### [v2026.9.1](https://github.com/openclaw/openclaw/releases/tag/v2026.9.1)
**发布摘要中可见的核心更新：**
- **Mermaid 图表支持全面增强**：聊天中 Mermaid blocks 现在可在 Control UI 以及原生 macOS / iOS / Android App 中渲染为图表。
- 支持**放大预览**。
- 移动端图表渲染失败时新增**重试机制**。

**从已提供的摘要看：**
- 未看到明确的破坏性变更说明。
- 但结合今日问题流，**升级迁移需特别关注**：
  - Windows Gateway 启动脚本/任务计划兼容性问题：[#137813](https://github.com/openclaw/openclaw/issues/137813)
  - 旧版 GitHub PAT 身份在 2026.9.1 后 fail-close：[#137836](https://github.com/openclaw/openclaw/issues/137836)
  - 8.2 迁移后配置/状态文件冲突：[#137866](https://github.com/openclaw/openclaw/issues/137866)

**迁移注意事项：**
- Windows 用户如果采用 Scheduled Task / `gateway.cmd` 启动，建议优先验证更新后的 Gateway 是否能正常拉起。
- 依赖旧身份体系或历史配置（如 legacy PAT、旧 workspace-state）的用户，升级前应先检查兼容性。
- 移动端使用 Mermaid 的团队可重点验证“渲染失败重试”和“长图预览滚动”是否符合预期。

---

## 3) 项目进展
今日可明确确认的已关闭/推进 PR 中，最重要的是：

- [#137818](https://github.com/openclaw/openclaw/pull/137818) **fix(cli): accept URL messages before session destinations**  
  这是对 Issue [#137815](https://github.com/openclaw/openclaw/issues/137815) 的修复，解决了 `--message` 参数在 session destination 之前传入 URL 时被错误判定为缺值的问题。  
  这类 CLI 可用性修复对命令行用户非常关键，也说明团队在处理“**输入解析顺序**”这类容易被忽略但影响真实使用的边界问题。

**整体推进判断：**
- 今日 PR 流量非常大（66 条更新），说明开发推进面很广，覆盖：
  - CLI / Gateway / Session 管理
  - Slack / Telegram / Discord 通道适配
  - iOS / web UI / browser 等前端体验
  - 安全边界、鉴权、迁移兼容性
- 但从已展示内容看，**真正完成合入并关闭的 PR 数量偏少**，当前更像是“多线并行推进、待审核积压较多”的阶段。

**值得关注的开放型推进项：**
- [#137775](https://github.com/openclaw/openclaw/pull/137775) 改进 tool failure 的静默风险
- [#137849](https://github.com/openclaw/openclaw/pull/137849) macOS 头像体验
- [#137863](https://github.com/openclaw/openclaw/pull/137863) Slack 会话控制路由
- [#137821](https://github.com/openclaw/openclaw/pull/137821) CLI action replay 失败恢复

---

## 4) 社区热点
> 说明：PR 评论数在当前数据中未提供，因此以下以 Issues 的评论活跃度为主。

### 讨论最活跃的 Issues
1. **[#137705](https://github.com/openclaw/openclaw/issues/137705)**  
   Telegram streaming 路径在 rich-link allowlist 外泄露原始 Markdown：**6 条评论**  
   **诉求背后：** 这是一个兼具**安全/隐私 + 消息展示正确性**的问题，说明用户对通道输出“降级行为”非常敏感，尤其是 file:// 这类本不应外显的链接形式。

2. **[#137845](https://github.com/openclaw/openclaw/issues/137845)**  
   Harness 内部错误被错误地包装成 provider/model request failed：**3 条评论**  
   **诉求背后：** 用户希望**错误分类准确**，否则会严重干扰排障，尤其在 session-store、projection、内部状态异常时。

3. **[#137843](https://github.com/openclaw/openclaw/issues/137843)**  
   iOS branch picker 在 active run 期间仍可交互：**3 条评论**  
   **诉求背后：** 典型的**移动端状态一致性**问题，说明用户对“运行中禁止误操作”的预期很强。

4. **[#137729](https://github.com/openclaw/openclaw/issues/137729)**  
   transcript replay / error classification 中未保护的 `.trim()` 导致崩溃：**3 条评论**  
   **诉求背后：** 用户对“**不应因空字段崩溃**”非常敏感，尤其是在每个 agent turn 都可能触发的热路径上。

5. **[#137085](https://github.com/openclaw/openclaw/issues/137085)**  
   macOS 升级后设备身份卡在 native-importing，handshake timeout：**3 条评论**  
   **诉求背后：** 这是典型的升级后兼容性问题，用户最关心的是“**升级不能把设备打挂**”。

### 次热点
- [#137820](https://github.com/openclaw/openclaw/issues/137820) 多 agent 配置下外部 HTTP client 调 `/v1/chat/completions` 报 `AgentSelectionRequiredError`
- [#137842](https://github.com/openclaw/openclaw/issues/137842) Control UI provider cards 缺少插件引导的 reconnect 动作
- [#137813](https://github.com/openclaw/openclaw/issues/137813) Windows Gateway 升级后完全起不来，属于高关注故障

**总体判断：**
- 热点讨论集中在**“出错时是否能正确恢复/正确归因”**，而不是单纯的新功能。
- 用户对 OpenClaw 的期望已经从“能跑”上升到“**升级后必须稳定、状态必须正确、错误必须可解释**”。

---

## 5) Bug 与稳定性
按严重程度排序如下：

### P0 / release blocker 风险
- **[#137813](https://github.com/openclaw/openclaw/issues/137813)**  
  Windows Gateway 在更新到 2026.9.1 后无法启动，`--task-supervisor` 退出码为 0 但子进程未生成。  
  **影响：** 直接阻断服务启动，属于最高优先级。  
  **fix PR：** 当前提供数据中**未看到对应修复 PR**。

### P1 / 高优先级稳定性问题
- **[#137773](https://github.com/openclaw/openclaw/issues/137773)**  
  Docker 环境下 `OPENCLAW_INSTALL_BROWSER=1` 造成 root-owned cache，Gateway 因 SQLite temp dir 问题无法启动。  
  **fix PR：** 未见。

- **[#137836](https://github.com/openclaw/openclaw/issues/137836)**  
  2026.9.1 后 legacy PAT-keyed GitHub identity fail-close，所有 exec 无法恢复。  
  **fix PR：** 未见。

- **[#137805](https://github.com/openclaw/openclaw/issues/137805)**  
  LanceDB 记忆读取不会观察到其他进程写入的数据，直到 Gateway 重启。  
  **影响：** 跨进程数据一致性失效，属于 session-state 风险。  
  **fix PR：** 未见。

- **[#137127](https://github.com/openclaw/openclaw/issues/137127)**  
  iOS App Store 版本缺少 revision-hash 修复，导致 Skill Workshop 修复未随当前商店包发布。  
  **fix PR：** 未见。

### P2 / 中优先级但影响面明显
- **[#137705](https://github.com/openclaw/openclaw/issues/137705)** Telegram streaming 泄露 raw Markdown
- **[#137729](https://github.com/openclaw/openclaw/issues/137729)** `.trim()` 未防御空值导致 crash
- **[#137820](https://github.com/openclaw/openclaw/issues/137820)** 多 agent 下外部 HTTP client 选择错误
- **[#137843](https://github.com/openclaw/openclaw/issues/137843)** iOS branch picker 在运行中仍可启用
- **[#137845](https://github.com/openclaw/openclaw/issues/137845)** 内部错误被错误展示为 provider failure
- **[#137085](https://github.com/openclaw/openclaw/issues/137085)** macOS 升级后 handshake timeout
- **[#137866](https://github.com/openclaw/openclaw/issues/137866)** legacy workspace-state 与 SQLite state 冲突，触发 crash-loop
- **[#137864](https://github.com/openclaw/openclaw/issues/137864)** embeddings 接口对 row cap 不兼容

### 已关闭但值得注意
- **[#137815](https://github.com/openclaw/openclaw/issues/137815)** 已关闭，且有明确修复 PR [#137818](https://github.com/openclaw/openclaw/pull/137818)
- **[#137826](https://github.com/openclaw/openclaw/issues/137826)** 已关闭，属于“ask_user 中途回答导致 turn 失效”的状态写回问题
- **[#137858](https://github.com/openclaw/openclaw/issues/137858)** 已关闭，Discord 入站消息在长任务刚结束后被静默丢失

**稳定性结论：**
今天暴露的 bug 不是单点故障，而是覆盖了**启动、鉴权、状态机、跨进程一致性、消息通道、移动端交互**多个面，说明当前版本线的回归测试压力较大。  
其中最需要立即盯住的是 [#137813](https://github.com/openclaw/openclaw/issues/137813)、[#137773](https://github.com/openclaw/openclaw/issues/137773)、[#137836](https://github.com/openclaw/openclaw/issues/137836)。

---

## 6) 功能请求与路线图信号
今天的功能请求呈现出明显的“**体验补齐 + 自动化增强 + 可观测性增强**”三条线。

### 有较高概率进入下一版本的需求
- **[#137848](https://github.com/openclaw/openclaw/issues/137848)**  
  使用 macOS 账户头像作为 Gateway owner avatar  
  **路线图信号：强。** 对应 PR [#137849](https://github.com/openclaw/openclaw/pull/137849) 已出现，说明该需求很可能进入近期版本。

- **[#137842](https://github.com/openclaw/openclaw/issues/137842)**  
  Control UI provider cards 暴露插件指导的 reconnect 动作  
  **路线图信号：中高。** 属于 UI/插件生态可用性增强，符合平台化方向。

- **[#137823](https://github.com/openclaw/openclaw/issues/137823)**  
  群聊 mention gating 的静默跳过缺少默认级诊断  
  **路线图信号：中。** 更像“可观测性补丁”，如果团队重视排障体验，较容易进入修复排程。

- **[#137302](https://github.com/openclaw/openclaw/pull/137302)**  
  将 pre-run directive rejection 记录为诊断事件  
  **路线图信号：中高。** 说明项目在向“可审计、可追踪”的控制面增强。

### 可能需要产品决策或安全审查
- **[#137808](https://github.com/openclaw/openclaw/issues/137808)**  
  Guarded Workboard autopilot  
  **信号：高价值但高门槛。** 需要产品决策和安全审查，短期不太像直接合入项。

**路线判断：**
近期路线很可能围绕：
1. **跨端一致体验**（iOS/macOS/web UI）
2. **通道控制与自动化**（Slack/Telegram/Workboard）
3. **错误可解释性与可观测性**（diagnostics、provider routing、failure copy）

---

## 7) 用户反馈摘要
从 Issues 评论与摘要中，可以提炼出以下真实痛点：

### 1. 用户最怕“升级后直接不可用”
- [#137813](https://github.com/openclaw/openclaw/issues/137813)：Windows 更新后 Gateway 根本起不来
- [#137085](https://github.com/openclaw/openclaw/issues/137085)：macOS 升级后身份状态卡死、握手超时
- [#137866](https://github.com/openclaw/openclaw/issues/137866)：旧状态文件与 SQLite 冲突，导致 crash-loop

**场景画像：** 这些用户通常已经在生产环境或准生产环境使用 OpenClaw，升级容忍度很低。

### 2. 用户非常在意“错误信息是否真实”
- [#137845](https://github.com/openclaw/openclaw/issues/137845)：内部错误被误报成 provider failure
- [#137705](https://github.com/openclaw/openclaw/issues/137705)：Telegram 输出泄露原始 Markdown，表明降级路径不够干净
- [#137729](https://github.com/openclaw/openclaw/issues/137729)：异常空值直接崩溃，真实上游错误被掩盖

**场景画像：** 这类反馈表明用户不仅要“有错误提示”，更要“**提示准确、可解释、可恢复**”。

### 3. 移动端和多端协同体验仍有摩擦
- [#137843](https://github.com/openclaw/openclaw/issues/137843)：iOS active run 期间仍能误操作分支
- [#137127](https://github.com/openclaw/openclaw/issues/137127)：App Store 版本与仓库修复不同步
- [#137704](https://github.com/openclaw/openclaw/pull/137704)：tall Mermaid 预览滚动问题修复，说明图表体验已成为真实使用场景

### 4. 用户希望“默认行为更智能”
- [#137848](https://github.com/openclaw/openclaw/issues/137848)：头像不要再用默认首字母，直接拿 macOS 账户图更自然
- [#137842](https://github.com/openclaw/openclaw/issues/137842)：插件已经知道怎么 reconnect，UI 应直接暴露动作

**总体反馈：**
用户已从“接受早期版本瑕疵”转向“期待默认正确、升级平滑、出错透明”。这对 OpenClaw 是积极信号，但也意味着质量门槛正在提高。

---

## 8) 待处理积压
以下是当前值得维护者持续关注、但仍未明显推进到“可关闭”状态的高优先级项：

### 高优先级开放问题
- [#137813](https://github.com/openclaw/openclaw/issues/137813) Windows Gateway 2026.9.1 启动失败
- [#137773](https://github.com/openclaw/openclaw/issues/137773) Docker 下 browser install 导致 root cache / startup fail
- [#137836](https://github.com/openclaw/openclaw/issues/137836) legacy PAT GitHub identity fail-close
- [#137805](https://github.com/openclaw/openclaw/issues/137805) LanceDB 跨进程读不到新写入
- [#137127](https://github.com/openclaw/openclaw/issues/137127) iOS App Store 缺少关键修复

### 待作者补充 / 待证明的开放 PR
- [#137618](https://github.com/openclaw/openclaw/pull/137618) waiting on author
- [#137832](https://github.com/openclaw/openclaw/pull/137832) waiting on author
- [#137302](https://github.com/openclaw/openclaw/pull/137302) needs proof
- [#137788](https://github.com/openclaw/openclaw/pull/137788) needs proof
- [#137754](https://github.com/openclaw/openclaw/pull/137754) needs proof

### 需要维护者快速评估的开放 PR
- [#137775](https://github.com/openclaw/openclaw/pull/137775) tool failure 静默风险
- [#137821](https://github.com/openclaw/openclaw/pull/137821) completed CLI actions replay
- [#137863](https://github.com/openclaw/openclaw/pull/137863) Slack session controls routing
- [#137849](https://github.com/openclaw/openclaw/pull/137849) macOS account picture avatar

**积压判断：**
当前 backlog 的关键不是“数量少”，而是“**高风险项占比高**”。尤其是启动失败、鉴权失效、跨进程一致性和错误掩盖类问题，如果不优先处理，会直接影响版本口碑和升级信心。

---

如果你希望，我可以把这份日报进一步整理成：
1. **适合发内部群的精简版**，或  
2. **适合管理层看的 1 页摘要版**。

---

## 横向生态对比

以下为基于 2026-09-04 过去 24 小时数据的**横向对比分析报告**。

---

# 1) 生态全景

从今日数据看，个人 AI 助手 / 自主智能体开源生态整体处于**高活跃、强修复、重一致性**阶段。  
项目不再只卷“能不能跑”，而是集中处理**会话状态、跨端一致性、协议兼容、可观测性、升级回归**等工程问题。  
一个明显趋势是：**功能扩展仍在继续，但质量和边界条件正在成为第一优先级**。  
同时，生态正在从单一聊天工具，演进为覆盖 **CLI、Desktop、WebUI、Mobile、Gateway、Messaging Channels、MCP/Provider** 的多入口智能体平台。

---

# 2) 各项目活跃度对比

> 说明：以下为今日 24h 统计口径，Release 指今日是否有新版本发布。

| 项目 | Issues 更新 | PR 更新 | Release | 健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 23 | 66 | **有**（1 个） | **高活跃 + 高修复负载**，功能推进快，但回归压力大 |
| **NanoBot** | 3 | 8 | 无 | **高活跃 + 修复闭环较好**，偏 WebUI 体验打磨 |
| **Hermes Agent** | 50 | 50 | 无 | **超高活跃但承压明显**，多线并行，稳定性问题集中 |
| **PicoClaw** | 0 | 5 | 无 | **低讨论、轻维护**，以依赖升级为主 |
| **NanoClaw** | 4 | 6 | 无 | **高活跃、低交付**，问题与功能并行积累 |
| **NullClaw** | 0 | 0 | 无 | **无活动** |
| **IronClaw** | 2 | 9 | 无 | **工程修复推进中**，讨论少、代码侧更活跃 |
| **LobsterAI** | 1 | 10 | 无 | **发布收口阶段**，修复集中、体验优化密集 |
| **TinyClaw** | 0 | 0 | 无 | **无活动** |
| **Moltis** | 0 | 0 | 无 | **无活动** |
| **CoPaw** | 14 | 15 | 无 | **高活跃、问题分布广**，一致性与稳定性压力较大 |
| **ZeptoClaw** | 0 | 0 | 无 | **无活动** |
| **ZeroClaw** | 17 | 24 | 无 | **高活跃、强修复期**，阻塞型问题较多 |

### 活跃度分层
- **第一梯队（最活跃）**：Hermes Agent、OpenClaw、ZeroClaw、CoPaw
- **第二梯队（高活跃但更偏收敛）**：NanoClaw、NanoBot、LobsterAI、IronClaw
- **轻维护型**：PicoClaw
- **无活动**：NullClaw、TinyClaw、Moltis、ZeptoClaw

---

# 3) OpenClaw 在生态中的定位

## 定位判断
OpenClaw 是当前生态里最典型的**平台型、全栈型智能体控制面项目**。  
它不是单点工具，而是同时覆盖：

- CLI / Session 管理
- Gateway / 鉴权 / 启动链路
- 桌面与移动端 UI
- Slack / Telegram / Discord 等消息通道
- iOS / macOS / Android 多端体验
- Mermaid / 图表 / 富内容渲染

## 相对优势
1. **覆盖面最广**
   - 比 NanoBot、LobsterAI 更偏平台级；
   - 比 Hermes、ZeroClaw 更强调“多端体验 + 通道接入 + 控制面一体化”。

2. **社区贡献密度高**
   - 今日 **66 条 PR 更新**，是这批项目里 PR 活跃度最高的；
   - 说明参与者多、修复面广、产品演进速度快。

3. **产品化程度高**
   - 今日已有正式版本发布；
   - 且 release 直接面向移动端和 UI 能力增强，说明项目已进入“可交付、可体验、可升级”的阶段。

## 技术路线差异
OpenClaw 的路线更像是：
- **“控制面 + 多端呈现 + 多通道分发”**
而不是单纯的：
- 模型接入层
- 纯 CLI agent
- 只做桌面端 client
- 只做 runtime / scheduler

这意味着它的优势是生态位更完整，但代价是：
- 回归面更大
- 升级兼容性更难
- 状态一致性问题更容易暴露

## 社区规模对比
以今日数据看，OpenClaw 的社区规模属于**第一梯队**：

- PR 活跃度：**明显高于** NanoBot、IronClaw、LobsterAI、CoPaw、NanoClaw
- Issue 活跃度：虽不如 Hermes 的 50 条那么极端，但仍属于高频反馈项目
- 综合贡献面：**大于多数同类项目**，仅与 Hermes、ZeroClaw 处于相近量级

一句话概括：  
**OpenClaw 是生态里“最像平台”的项目之一，也是今天最强的全栈智能体基础设施候选。**

---

# 4) 共同关注的技术方向

## 方向一：会话 / 上下文一致性
**涉及项目：** OpenClaw、NanoBot、Hermes Agent、IronClaw、CoPaw、ZeroClaw、NanoClaw  
**共同诉求：**
- session 不要串线
- title / metadata 要一致
- context budget 要准确
- replay / compaction / cache key 要正确
- 多 profile、多 channel、多 turn 的状态不能漂移

**典型问题：**
- OpenClaw：legacy PAT、workspace-state、action replay、tool failure 分类
- NanoBot：session title、runtime context 默认值
- Hermes：profile/state.db 串线、response interruption
- IronClaw：prompt budget 不含非 transcript 内容
- CoPaw：会话按 channel 拆分的架构争议
- ZeroClaw：transcript 持久化分页、runtime 预算记录

---

## 方向二：跨端 / 多渠道一致体验
**涉及项目：** OpenClaw、Hermes Agent、NanoBot、LobsterAI、CoPaw、ZeroClaw  
**共同诉求：**
- Desktop / Web / Mobile 行为一致
- Telegram / Slack / Discord / Feishu / WhatsApp / Matrix 接入稳定
- 运行中不误操作
- 更新、退出、重连要可控
- 富 UI / PWA / MCP App 能正确渲染

**典型问题：**
- OpenClaw：iOS / macOS / Windows / Telegram / Slack / Docker
- NanoBot：iOS PWA、移动端输入
- LobsterAI：浏览器桥、安装器、窗口行为
- CoPaw：Feishu、OpenCode header、桌面远程连接
- ZeroClaw：OpenCode session header、gateway / relay / channel send

---

## 方向三：可观测性与错误归因
**涉及项目：** OpenClaw、Hermes Agent、IronClaw、ZeroClaw、CoPaw  
**共同诉求：**
- 错误不能被笼统包装
- 静默失败要可见
- provider / model / internal / harness 要准确区分
- 日志、诊断、history、audit 要完善

**典型问题：**
- OpenClaw：内部错误被错误分类、流式 Markdown 泄露
- Hermes：response interrupted、plugin hooks 不触发
- IronClaw：cancel 语义、preview panic、budget 误差
- ZeroClaw：cron 静默失败、health 输出信息泄露
- CoPaw：Langfuse 输出空白

---

## 方向四：Provider / 协议兼容性
**涉及项目：** Hermes Agent、OpenClaw、ZeroClaw、CoPaw、IronClaw  
**共同诉求：**
- OpenAI-compatible / Anthropic / OpenRouter / OpenCode 等协议变更要快速适配
- session header、OAuth、PKCE、cache key 不能丢
- 多 provider 选择要明确
- 本地模型与云模型能力要统一抽象

**典型问题：**
- Hermes：OpenRouter OAuth PKCE、provider catalog
- OpenClaw：legacy GitHub identity fail-close
- ZeroClaw：OpenCode session header、Anthropic extended thinking 透传
- CoPaw：OpenCode API header 兼容
- IronClaw：OpenAI request path cache key

---

## 方向五：稳定性、CI 与发布质量
**涉及项目：** Hermes Agent、PicoClaw、IronClaw、LobsterAI、ZeroClaw  
**共同诉求：**
- CI 不要被测试噪音拖垮
- 依赖升级要持续化
- 发布前要收口
- 主干稳定性要优先于新功能堆叠

---

# 5) 差异化定位分析

## 按项目看，差异主要体现在三层：功能侧重、目标用户、架构形态

| 项目 | 功能侧重 | 目标用户 | 架构关键词 |
|---|---|---|---|
| **OpenClaw** | 全栈控制面、多通道、多端 UI | 需要统一入口的团队/高级用户 | Gateway、Session、UI、Mobile、Channel |
| **NanoBot** | WebUI 体验、国际化、PWA、上下文可视化 | 偏前端体验导向用户 | WebUI、locale、PWA、title/session |
| **Hermes Agent** | Desktop/CLI/Cron/Plugin/Group Chat | 多 profile、重运维、重自动化用户 | profile、state.db、scheduler、hooks |
| **PicoClaw** | 轻维护、依赖升级 | 稳定运行优先的用户 | 依赖管理、基础维护 |
| **NanoClaw** | CLI、任务调度、SQLite、channel 适配 | 需要可编排任务与渠道接入的用户 | router、scheduler、SQLite、mount |
| **IronClaw** | prompt budget、Host API、cancel 语义 | 注重模型请求治理与成本控制的用户 | budget、cache key、host-api |
| **LobsterAI** | 桌面客户端、浏览器/MCP、Windows 体验 | 桌面工作流用户 | WebView、browser bridge、installer |
| **CoPaw** | 多渠道会话、监控、远程接入 | 企业 IM / 多端协同用户 | session continuity、observability |
| **ZeroClaw** | gateway/runtime/protocol/CI/发行基础设施 | 需要协议兼容与稳定运行的用户 | gateway、runtime、relay、CI |

## 关键差异总结
- **OpenClaw**：最偏“平台与控制面”
- **NanoBot**：最偏“WebUI 与体验一致性”
- **Hermes Agent**：最偏“桌面/CLI/调度/插件的多入口协同”
- **IronClaw**：最偏“请求治理、预算、协议语义”
- **LobsterAI**：最偏“桌面客户端 + 浏览器容器能力”
- **CoPaw / ZeroClaw**：最偏“多渠道、运行时、协议与可观测性”

---

# 6) 社区热度与成熟度

## 快速迭代阶段
这些项目的共同特征是：**Issue 和 PR 都多，且大量问题是 P0/P1/P2 或架构一致性问题**。

- **OpenClaw**：活跃度最高之一，且发布后立即出现多路径回归，说明处于高速迭代期
- **Hermes Agent**：50/50 的高频节奏，说明社区输入输出极密集，但承压明显
- **ZeroClaw**：24 PR、17 Issue，修复和协议兼容并行，属于强推进阶段
- **CoPaw**：问题分布广，跨渠道和会话一致性争议多，仍在快速打磨
- **NanoClaw**：问题和新 PR 同时密集，但交付尚未收敛

## 质量巩固阶段
这些项目更偏向“把已有能力做稳”：

- **NanoBot**：修复闭环较清晰，偏 WebUI 体验收敛
- **IronClaw**：代码推进明显，但讨论热度不高，更像工程修复驱动
- **LobsterAI**：多条 PR 已关闭，明显在为版本发布收口
- **PicoClaw**：主要是依赖维护，没有明显功能冲刺

## 低活跃 / 休眠阶段
- **NullClaw**
- **TinyClaw**
- **Moltis**
- **ZeptoClaw**

这些项目今日没有活动，短期不构成生态趋势样本。

---

# 7) 值得关注的趋势信号

## 趋势 1：AI 助手从“单聊天框”转向“多入口协同系统”
用户越来越要求：
- Web、Desktop、Mobile、IM、Gateway 行为一致
- 同一会话在不同端可接续
- 更新、退出、重连都不能破坏工作流

**参考项目：** OpenClaw、Hermes Agent、CoPaw、NanoBot、LobsterAI

**对开发者的价值：**
- 入口一致性会成为产品成熟度的核心指标
- 不是“做多少入口”，而是“入口之间是否同一状态机”

---

## 趋势 2：会话 / 上下文管理正在成为核心竞争力
很多项目都在处理：
- budget
- compaction
- replay
- cache key
- title / metadata
- session continuity

**参考项目：** NanoBot、IronClaw、OpenClaw、Hermes Agent、ZeroClaw、CoPaw

**对开发者的价值：**
- 未来竞争不只在模型能力，而在**上下文治理能力**
- 谁能更准确地管理上下文，谁就更容易做出稳定体验

---

## 趋势 3：错误分类和可观测性正在从“工程细节”变成“产品能力”
用户不接受：
- 静默失败
- 错误误报
- provider / internal / model 混淆
- 成功提示但实际没执行

**参考项目：** OpenClaw、Hermes Agent、IronClaw、ZeroClaw、CoPaw

**对开发者的价值：**
- 需要把诊断、审计、错误解释作为产品的一部分设计
- “能用”已经不够，“可解释、可追责、可恢复”才是门槛

---

## 趋势 4：协议兼容和供应商适配节奏加快
OpenAI-compatible、Anthropic、OpenRouter、OpenCode、Feishu、Matrix、MCP UI 等需求同步出现。  
这说明生态在进入**多 provider、多协议、多渠道并存**阶段。

**参考项目：** Hermes Agent、ZeroClaw、CoPaw、OpenClaw、IronClaw

**对开发者的价值：**
- 需要把 provider 与 channel 抽象做得更干净
- 协议变化将持续成为维护成本来源

---

## 趋势 5：富 UI / Browser / MCP App 正在变成新方向
仅靠纯文本输出已经不够，用户开始要求：
- 交互式 UI 渲染
- 内置浏览器桥
- PWA / WebView / desktop container
- MCP Apps / prefab UI

**参考项目：** LobsterAI、OpenClaw、NanoBot

**对开发者的价值：**
- Agent 产品将越来越像“工作台”而不是“聊天机器人”
- UI 容器化能力会成为差异化竞争点

---

如果你希望，我可以进一步把这份报告整理成：
1. **适合汇报给管理层的 1 页版**，或  
2. **适合技术团队评审的“机会/风险矩阵版”**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-09-04）

## 1) 今日速览
过去 24 小时，NanoBot 以 **WebUI 体验修复与一致性增强** 为主线，活动较活跃：新增/活跃 Issues 3 条，PR 更新 8 条，且没有新版本发布，说明当前仍处于高频修补与功能打磨阶段。  
今日讨论和开发重心明显集中在 **多语言、会话标题、移动端/PWA、上下文可视化** 等前端体验相关问题上，属于“用户可感知”的高价值改进。  
从节奏看，项目健康度整体不错：有明确的 bug 修复闭环（例如 #5644 对应 #5651、#5647 对应 #5648），但也暴露出若干尚未完全收敛的边界问题，提示 WebUI 相关代码仍在快速迭代中。  
总体判断：**活跃度高、修复导向强、产品体验持续向前推进，但尚未进入版本发布收敛期**。  

---

## 2) 项目进展
今日状态变更为 **Closed** 的 PR 有 2 条，均指向 WebUI 的体验与一致性提升：

- **#5650 [CLOSED] fix(webui): preserve Hero model preset during chat creation**  
  链接：<https://github.com/HKUDS/nanobot/pull/5650>  
  作用：解决 Hero 选中模型预设在新建会话/首条消息过程中丢失的问题，避免“进入聊天后模型配置被切换”这类体验断裂。  
  价值：提升会话创建链路的稳定性，减少前端 optimistic session 与最终持久会话之间的配置漂移。

- **#5646 [CLOSED] fix(webui): show language names only in their native form**  
  链接：<https://github.com/HKUDS/nanobot/pull/5646>  
  作用：语言选择器仅展示各语言的母语名称，同时清理 locale registry 中未使用的英文显示名。  
  价值：减少多语言界面认知负担，也与后续 locale registry 的并发修复形成配套优化。

**整体推进幅度**：  
今天的推进不是“新增大功能”，而是更偏向 **把 WebUI 的核心交互链路做稳、做顺、做一致**。从 PR 主题看，项目在向“更可靠的会话管理 + 更友好的移动端/多语言支持 + 更透明的上下文呈现”方向持续迈进。  

---

## 3) 社区热点
当前最活跃的讨论点主要集中在 **#5644**，它也是今日已知评论最多的 Issue。  

- **#5644 [OPEN] [bug] [WebUI] Channel locale registry drops a locale when two locales load concurrently at startup**  
  链接：<https://github.com/HKUDS/nanobot/issues/5644>  
  评论数：1，👍：0  
  热点原因：这是一个典型的并发初始化缺陷，影响启动阶段的多语言注册完整性；对使用多语言 WebUI 的用户来说，属于“看似小、实际影响面不小”的问题。  
  背后诉求：用户希望 **启动时 locale 注册是确定性的、不会丢翻译**，尤其是 `en` 这类基础语言不能因并发加载被遗漏。

其他 PR/Issue 当前可见的 reaction 都是 0，说明今天的热度主要来自 **明确的功能/缺陷驱动**，而不是广泛争论型讨论。  
此外，#5644 已有对应修复 PR #5651，表明社区反馈已被较快承接。  
- 对应 PR：<https://github.com/HKUDS/nanobot/pull/5651>  

---

## 4) Bug 与稳定性
按当前影响面与紧迫性排序，今日主要问题如下：

### 1. WebUI 启动并发下 locale 丢失（高）
- Issue：[#5644](https://github.com/HKUDS/nanobot/issues/5644)
- 现象：`loadChannelLocale()` 在并发加载时可能把某个 locale（如 `en`）丢掉。
- 风险：影响多语言可用性，且发生在启动/初始化阶段，属于基础稳定性问题。
- 状态：**已有 fix PR**
  - PR：[#5651](https://github.com/HKUDS/nanobot/pull/5651)

### 2. WebUI 会话标题在缺少 webui flag 时无法生成（中高）
- Issue：[#5647](https://github.com/HKUDS/nanobot/issues/5647)
- 现象：frontend envelope 不带 webui 标记时，session title 生成逻辑失效。
- 风险：用户会看到标题缺失或投影失败，影响会话可读性与统一会话模式体验。
- 状态：**已有 fix PR**
  - PR：[#5648](https://github.com/HKUDS/nanobot/pull/5648)

### 3. 0.3.0 中 Current Time runtime context 默认缺失（中）
- Issue：[#5645](https://github.com/HKUDS/nanobot/issues/5645)
- 现象：与 0.2.2 相比，0.3.0 在未传入 runtime_context_blocks 时不再默认注入 Current Time。
- 风险：这既是行为回归，也与文档/用户预期不一致，会影响依赖时间上下文的提示词与工作流。
- 状态：**当前未见对应 fix PR**

**稳定性判断**：  
今天暴露的问题大多不是“崩溃型”，而是 **初始化并发、元数据投递、默认上下文行为** 这类容易被忽视但高频触达的缺陷。对 AI 助手产品而言，这类问题直接影响“系统是否可靠”的感知，因此优先级不低。  

---

## 5) 功能请求与路线图信号
今日新增/活跃 PR 里，能看出 NanoBot 的下一步路线偏向以下几个方向：

- **上下文可视化与透明度增强**
  - PR：[#5649 feat(webui): visualize per-request context reuse](https://github.com/HKUDS/nanobot/pull/5649)
  - 信号：用户开始关注“每次请求到底复用了多少上下文、token 花在哪儿”，说明产品正从“能用”走向“可解释、可调试”。

- **移动端输入体验与流式发送**
  - PR：[#5640 feat(webui): mobile keyboard input and streaming send](https://github.com/HKUDS/nanobot/pull/5640)
  - 信号：移动端使用场景在增加，且输入法、Enter 键、发送方式等细节开始成为重点。

- **iOS PWA 兼容性修复**
  - PR：[#5641 fix(webui): iOS PWA tap and status-bar fixes](https://github.com/HKUDS/nanobot/pull/5641)
  - 信号：项目在强化“可安装、可触控、可日常使用”的 PWA 体验，说明 WebUI 已不只是桌面浏览器场景。

- **会话标题与会话元数据稳定性**
  - PR：[#5648 fix(webui): check session metadata when generating webui titles](https://github.com/HKUDS/nanobot/pull/5648)
  - 相关 issue：[#5647](https://github.com/HKUDS/nanobot/issues/5647)
  - 信号：会话生命周期管理仍在打磨，标题、session key、metadata 投影一致性可能会继续成为后续版本重点。

- **运行时上下文默认行为**
  - Issue：[#5645](https://github.com/HKUDS/nanobot/issues/5645)
  - 信号：若社区确认这是行为回归，下一版很可能会出现补丁式修正，恢复默认时间上下文或明确文档约束。

**对下一版本的判断**：  
最有可能被纳入下一轮发布的，是 **WebUI 体验修复包**：多语言、标题生成、移动端/PWA、上下文可视化、会话元数据一致性。它们都具有较强的用户可感知价值，且彼此之间高度相关。  

---

## 6) 用户反馈摘要
基于今日 Issue/PR 反馈，可以提炼出几类真实用户痛点与使用场景：

1. **多语言用户希望“开箱即稳”**  
   - 链接：[#5644](https://github.com/HKUDS/nanobot/issues/5644)、[#5646](https://github.com/HKUDS/nanobot/pull/5646)  
   - 痛点：启动时 locale 丢失、语言名展示不统一，会直接破坏国际化体验。  
   - 场景：多语言团队、海外用户、需要切换界面语言的普通用户。

2. **用户希望会话标题能可靠生成并正确落到对应会话**
   - 链接：[#5647](https://github.com/HKUDS/nanobot/issues/5647)、[#5648](https://github.com/HKUDS/nanobot/pull/5648)  
   - 痛点：标题缺失会让长会话难以管理，尤其在 unifiedSession / 前端 envelope 场景中更明显。  
   - 场景：高频聊天、多个会话并行、依赖标题快速定位历史对话的用户。

3. **用户对默认运行时上下文有明确预期**
   - 链接：[#5645](https://github.com/HKUDS/nanobot/issues/5645)  
   - 痛点：0.3.0 行为变化未充分延续旧版默认能力，造成“文档说有、实际却没有”的落差。  
   - 场景：依赖当前时间、时区、系统状态的提示词工作流。

4. **移动端与 PWA 使用者需要更自然的触控与输入行为**
   - 链接：[#5640](https://github.com/HKUDS/nanobot/pull/5640)、[#5641](https://github.com/HKUDS/nanobot/pull/5641)  
   - 痛点：桌面交互逻辑直接迁移到手机上会产生误触、键盘行为不符合预期、状态栏遮挡等问题。  
   - 场景：手机浏览器、iOS PWA、触控式日常使用。

5. **进阶用户希望看到上下文复用与 token 使用情况**
   - 链接：[#5649](https://github.com/HKUDS/nanobot/pull/5649)  
   - 痛点：不知道模型到底用了多少上下文、复用了哪些历史信息，不利于调优与成本感知。  
   - 场景：重度用户、调参与评测、关注 token 成本的团队用户。

> 注：当前元数据里评论数量很少，因此以上“反馈摘要”主要结合 issue/PR 描述进行归纳，而非大量评论文本挖掘。  

---

## 7) 待处理积压
当前样本里的 Issue/PR 都是 **9/3–9/4 新近创建**，暂时**没有明显“长期未响应”** 的积压项可确认。  
不过从优先级和风险看，以下条目值得维护者优先盯住：

- **[#5645](https://github.com/HKUDS/nanobot/issues/5645)**：运行时上下文默认行为回归，且目前未见 fix PR，建议尽快确认是否为版本行为变更还是无意回退。  
- **[#5641](https://github.com/HKUDS/nanobot/pull/5641)**：iOS PWA 修复覆盖面广，移动端问题通常需要真机验证，建议跟踪测试结果。  
- **[#5640](https://github.com/HKUDS/nanobot/pull/5640)**：涉及输入法与流式发送交互，容易引入回归，建议和桌面端行为一起做回归测试。  
- **[#5639](https://github.com/HKUDS/nanobot/pull/5639)**：范围较宽，涉及会话标签、TUI 流式显示、配对提示等多个子项，适合重点审阅拆分风险。  

---

### 总体结论
NanoBot 今日呈现出典型的 **高频前端体验迭代日**：问题不在“是否有活力”，而在于“如何把活力转化为稳定交付”。  
从 PR 与 Issue 的联动情况看，维护团队响应较快，WebUI 相关 bug 已形成较好的修复闭环；若接下来能尽快收敛 runtime context 默认行为并完成移动端/PWA 与上下文可视化相关 PR，下一次发布的用户感知提升会比较明显。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
**日期：2026-09-04**  
仓库：[`NousResearch/hermes-agent`](https://github.com/nousresearch/hermes-agent)

---

## 1) 今日速览

今天 Hermes Agent 仍处于**高强度活跃**状态：过去 24 小时内有 **50 条 Issue 更新**、**50 条 PR 更新**，几乎形成 1:1 的同步输入与产出节奏，说明社区参与度和维护压力都很高。  
但从结果看，**新版本发布为 0**，而 PR 队列里仍有 **49 个待合并**，表明项目当前更偏向“快速收集问题、持续修复、尚未进入集中发版”的阶段。  
今天的问题主要集中在 **Desktop / CLI / Cron / Gateway / Plugin / Local Models** 等核心链路，且不少是 **P1/P2 稳定性与状态一致性问题**，这意味着项目健康度是“活跃但承压”的。  
积极信号是：多个高危问题已经出现对应修复 PR，说明维护节奏并不滞后。  

---

## 2) 版本发布

**今日无新版本发布。**  
最新 Releases 为空，暂不涉及版本更新说明或迁移注意事项。

---

## 3) 项目进展

今天没有可识别的“已合并/已关闭 PR 详情”条目出现在提供的数据中，但从 PR 队列看，项目在若干关键方向上已经形成了明显的推进信号：

- **Cron / 调度可靠性修复正在推进**  
  - `PeriodicScheduler` 的并发/阻塞问题已有明确修复 PR：[`#102615`](https://github.com/nousresearch/hermes-agent/pull/102615)  
  - 与之关联的上游问题是 [`#102574`](https://github.com/nousresearch/hermes-agent/issues/102574)  
  - 这类修复会直接提升安全定时任务、转交心跳、后台调度的稳定性。

- **Responses / Codex 会话工具调用重复 ID 问题开始收敛**  
  - 修复 PR：[`#102640`](https://github.com/nousresearch/hermes-agent/pull/102640)  
  - 对应 Bug：[`#102629`](https://github.com/nousresearch/hermes-agent/issues/102629)  
  - 这是典型的会话状态一致性修复，能减少 `/v1/responses` 400 错误。

- **模型选择器/Provider Catalog 的可见性与一致性在增强**  
  - 修复 PR：[`#102641`](https://github.com/nousresearch/hermes-agent/pull/102641)  
  - 这类工作能减少 Desktop/TUI/Web 之间模型条目显示不一致的问题。

- **Group Chat / Bot Mode 正在扩展到更多入口**  
  - 功能 PR：[`#102637`](https://github.com/nousresearch/hermes-agent/pull/102637)  
  - 相关增强 PR：[`#102638`](https://github.com/nousresearch/hermes-agent/pull/102638)  
  - 说明团队仍在推进“多会话、多渠道协作”这一核心产品方向。

综合看，今天的进展不是“版本发布式”的，而是**稳定性修复 + 跨端体验补强 + 多代理/群聊能力扩展**并行推进。

---

## 4) 社区热点

今天讨论最活跃的条目，主要集中在以下几类：

### 1. 高优先级稳定性 Bug：系统级/调度级故障
- [`#102486`](https://github.com/nousresearch/hermes-agent/issues/102486)  
  **问题点**：systemd 249 下 `OOMPolicy=kill` 被拒绝，导致 restart-safe cron worker dispatch fail-closed。  
  **热度**：3 条评论  
  **解读**：这是一个典型的“环境兼容性导致的基础设施故障”，会直接影响生产可用性。

- [`#102526`](https://github.com/nousresearch/hermes-agent/issues/102526)  
  **问题点**：Desktop 启动后 session store 绑定到错误 profile 的 state.db。  
  **热度**：2 条评论  
  **解读**：属于严重的跨 profile 状态串线问题，影响用户信任。

### 2. 插件/钩子系统在不同入口不一致
- [`#102592`](https://github.com/nousresearch/hermes-agent/issues/102592)  
  **问题点**：`hermes serve` / `dashboard` 启动时插件发现被跳过，hooks 不会触发。  
  **热度**：2 条评论  
  **解读**：用户在网页端/桌面后端会“以为插件生效，实际完全没跑”，属于高隐蔽性问题。

- [`#102504`](https://github.com/nousresearch/hermes-agent/issues/102504)  
  **问题点**：`hermes serve` 不注册 config.yaml shell hooks。  
  **热度**：2 条评论  
  **解读**：与上一个问题共同指向“CLI 与 serve/dashboard 的启动路径不一致”。

### 3. 桌面端可用性与体验细节
- [`#102460`](https://github.com/nousresearch/hermes-agent/issues/102460)  
  **问题点**：Profile rail 折叠后，recolor 功能不可达。  
  **热度**：3 条评论  
  **解读**：说明 Desktop 的信息密度提升后，基础管理动作被隐藏。

- [`#102597`](https://github.com/nousresearch/hermes-agent/issues/102597)  
  **问题点**：All-profiles recents list 里希望每条 session 显示 profile marker。  
  **热度**：2 条评论  
  **解读**：这是用户对“多 profile 归属可视化”的明确诉求。

### 4. 反馈/反应最明显的单项
- [`#102511`](https://github.com/nousresearch/hermes-agent/issues/102511)  
  **反应**：👍 1  
  **问题点**：`hermes cron run` 在 caller timeout 后会让 agent-backed execution 处于 unknown 状态。  
  **解读**：虽评论不多，但已经出现正反馈，说明该问题具有较强共鸣。

---

## 5) Bug 与稳定性

以下按严重程度排序：

### P1：会影响核心流程或造成系统级风险
1. [`#102486`](https://github.com/nousresearch/hermes-agent/issues/102486)  
   **系统兼容性导致 cron worker 失败关闭**  
   - systemd 249 解析 `OOMPolicy=kill` 异常  
   - **修复 PR：暂无明确对应项**

2. [`#102526`](https://github.com/nousresearch/hermes-agent/issues/102526)  
   **Desktop 默认 bot 打开了错误 profile 的 state.db**  
   - 典型 profile 串线问题，风险极高  
   - **修复 PR：暂无明确对应项**

3. [`#102574`](https://github.com/nousresearch/hermes-agent/issues/102574)  
   **共享周期调度器让一个阻塞回调卡住全部 safety timer**  
   - **修复 PR：[`#102615`](https://github.com/nousresearch/hermes-agent/pull/102615)**

4. [`#102589`](https://github.com/nousresearch/hermes-agent/issues/102589)  
   **cron/lifecycle_guard 误打开 state.db，可能破坏 POSIX 锁，导致 WAL split-brain**  
   - **修复 PR：暂无明确对应项**

### P2：会破坏关键功能或导致错误状态持续
1. [`#102592`](https://github.com/nousresearch/hermes-agent/issues/102592)  
   **serve/dashboard 启动时插件 hooks 永远不触发**  
   - **修复 PR：暂无明确对应项**

2. [`#102504`](https://github.com/nousresearch/hermes-agent/issues/102504)  
   **serve 入口不注册 shell hooks**  
   - **修复 PR：暂无明确对应项**

3. [`#102511`](https://github.com/nousresearch/hermes-agent/issues/102511)  
   **cron run 超时后执行状态变 unknown**  
   - **修复 PR：暂无明确对应项**

4. [`#102566`](https://github.com/nousresearch/hermes-agent/issues/102566)  
   **finish_reason=stop 但最终回复被替换成 `[response interrupted]`**  
   - **修复 PR：暂无明确对应项**

5. [`#102629`](https://github.com/nousresearch/hermes-agent/issues/102629)  
   **Responses 重放 duplicate call_id 导致 400**  
   - **修复 PR：[`#102640`](https://github.com/nousresearch/hermes-agent/pull/102640)**

6. [`#102618`](https://github.com/nousresearch/hermes-agent/issues/102618)  
   **Desktop 孤儿 session 无法打开，Retry 无效**  
   - **修复 PR：暂无明确对应项**

### P3：体验/兼容性/边缘功能问题，但数量很多
- [`#102632`](https://github.com/nousresearch/hermes-agent/issues/102632) Nix 封装缺少 `hermes_state_holders / hermes_state_registry`
- [`#102619`](https://github.com/nousresearch/hermes-agent/issues/102619) Local Models 对 unified-memory Mac 的模型大小判断偏保守
- [`#102616`](https://github.com/nousresearch/hermes-agent/issues/102616) Local Models 中旧的 version check failed 错误残留
- [`#102608`](https://github.com/nousresearch/hermes-agent/issues/102608) TUI 覆盖终端标题，影响 tmux/zellij
- [`#102593`](https://github.com/nousresearch/hermes-agent/issues/102593) Strix Halo / BIOS carve 下模型价格误判
- [`#102554`](https://github.com/nousresearch/hermes-agent/issues/102554) Discord 适配器重连后旧 fatal status 不清除
- [`#102500`](https://github.com/nousresearch/hermes-agent/issues/102500) Windows 非 ASCII 页面内容导致 browser_exec 输出为空
- [`#102629`](https://github.com/nousresearch/hermes-agent/issues/102629) duplicate tool call_id
- [`#102626`](https://github.com/nousresearch/hermes-agent/issues/102626) Desktop context window 设置不生效

总体判断：**今天的稳定性风险主要不是“单点崩溃”，而是“状态一致性、调度可靠性、跨入口行为不一致”三类问题叠加**。  
好消息是，至少两项高风险问题已经有修复 PR：[`#102615`](https://github.com/nousresearch/hermes-agent/pull/102615)、[`#102640`](https://github.com/nousresearch/hermes-agent/pull/102640)。

---

## 6) 功能请求与路线图信号

今天新增/活跃的功能请求，明显体现出 Hermes Agent 的路线图仍在向三个方向扩展：

### 1. 更强的多 profile / 多会话可视化
- [`#102597`](https://github.com/nousresearch/hermes-agent/issues/102597)：希望 All-profiles recents list 每行都显示 profile marker  
- [`#102460`](https://github.com/nousresearch/hermes-agent/issues/102460)：profile rail 折叠后 recolor 不可达

**判断**：这类需求很像 Desktop 下一版本的候选增强，属于“可见性与可管理性”优化，落地概率较高。

### 2. MoA 配置可编辑性增强
- [`#102582`](https://github.com/nousresearch/hermes-agent/issues/102582)：在 `hermes moa configure` 中暴露 per-slot reasoning effort
- [`#102585`](https://github.com/nousresearch/hermes-agent/issues/102585)：允许改现有 slot 的 max_tokens / reasoning_effort 而不必重选 provider/model
- [`#102584`](https://github.com/nousresearch/hermes-agent/issues/102584)：暴露 per-slot max_tokens

**判断**：这些需求已经与现有 schema 强相关，且 PR 链路清晰，**非常像下一版本的候选功能包**。

### 3. 更多认证与 Provider 接入
- [`#102639`](https://github.com/nousresearch/hermes-agent/pull/102639)：OpenRouter OAuth PKCE
- [`#102499`](https://github.com/nousresearch/hermes-agent/issues/102499)：Google Antigravity 作为 provider
- [`#102552`](https://github.com/nousresearch/hermes-agent/issues/102552)：自定义 OpenAI 兼容 provider 的模型 picker 去重与隐藏能力

**判断**：Provider 生态仍是 Hermes 的重要增长面，尤其是 OAuth/订阅式登录和自定义 provider 可见性，具备较高的产品优先级。

### 4. 群聊与跨渠道协作
- [`#102637`](https://github.com/nousresearch/hermes-agent/pull/102637)：`hermes group` 把请求转入 hosted Group Chat
- [`#102638`](https://github.com/nousresearch/hermes-agent/pull/102638)：让 group send 走 Desktop 协调的 Group Chats
- [`#102570`](https://github.com/nousresearch/hermes-agent/issues/102570)：把 TUI slash commands 带到 messaging channels

**判断**：这是 Hermes “Agent 协作层”最明显的路线图信号之一，后续很可能继续加速。

---

## 7) 用户反馈摘要

从 Issues 的描述里，可以提炼出几类非常真实的用户痛点：

### 1. 用户最在意“跨入口一致性”
用户反复提到：**TUI、Desktop、dashboard、serve、CLI 不该表现不同**。  
例如：
- 插件 hooks 在 `serve/dashboard` 不生效：[`#102592`](https://github.com/nousresearch/hermes-agent/issues/102592)
- shell hooks 在 `serve` 不注册：[`#102504`](https://github.com/nousresearch/hermes-agent/issues/102504)
- context window 设置在 Desktop 不生效：[`#102626`](https://github.com/nousresearch/hermes-agent/issues/102626)

**含义**：用户不是只要“功能能跑”，而是要求**同一配置在所有入口都有效**。

### 2. 多 profile / 多 bot 场景变得很复杂
- 默认 profile 打开了别的 profile 的 state.db：[`#102526`](https://github.com/nousresearch/hermes-agent/issues/102526)
- 希望每条 session 一眼看出属于哪个 profile：[`#102597`](https://github.com/nousresearch/hermes-agent/issues/102597)

**含义**：Hermes 已经从单助手走向“多身份、多工作区、多 bot”，但状态隔离和视觉标识还没完全跟上。

### 3. 用户对稳定性容忍度很低，尤其是“silent failure”
典型如：
- browser_exec 在 Windows 非 ASCII 页面下静默返回空输出：[`#102500`](https://github.com/nousresearch/hermes-agent/issues/102500)
- Discord adapter 重连后状态仍显示失败：[`#102554`](https://github.com/nousresearch/hermes-agent/issues/102554)
- assistant 正常返回却被写成 `[response interrupted]`：[`#102566`](https://github.com/nousresearch/hermes-agent/issues/102566)

**含义**：用户最不满意的是“看起来成功，实际上失败”的隐性故障。

### 4. 用户愿意提出细粒度产品能力诉求
例如：
- per-slot reasoning effort / max_tokens：[`#102582`](https://github.com/nousresearch/hermes-agent/issues/102582)、[`#102584`](https://github.com/nousresearch/hermes-agent/issues/102584)
- 模型列表排除隐藏 provider：[`#102641`](https://github.com/nousresearch/hermes-agent/pull/102641)
- 群聊从任意会话发起：[`#102637`](https://github.com/nousresearch/hermes-agent/pull/102637)

**含义**：这说明 Hermes 的用户并不只是“尝鲜”，而是在深度使用并推动产品往更专业的方向演进。

---

## 8) 待处理积压

以下是今天数据里值得维护者优先盯住的积压项，按“重要且当前仍无明确修复”优先：

1. [`#102486`](https://github.com/nousresearch/hermes-agent/issues/102486)  
   **systemd 249 兼容性导致 cron dispatch fail closed**  
   - P1，影响面大，当前未见对应 fix PR

2. [`#102526`](https://github.com/nousresearch/hermes-agent/issues/102526)  
   **Desktop 读错 profile 的 state.db**  
   - P1，属于数据隔离/串线级别问题

3. [`#102592`](https://github.com/nousresearch/hermes-agent/issues/102592)  
   **serve/dashboard 插件 hooks 不触发**  
   - 这是架构一致性问题，建议尽快定位 startup discovery 链路

4. [`#102504`](https://github.com/nousresearch/hermes-agent/issues/102504)  
   **config.yaml shell hooks 在 serve 入口丢失**  
   - 与上条高度相关，可能共享根因

5. [`#102589`](https://github.com/nousresearch/hermes-agent/issues/102589)  
   **raw open state.db 破坏 gateway 锁**  
   - 这是偏底层的风险问题，值得优先审查

6. [`#102618`](https://github.com/nousresearch/hermes-agent/issues/102618)  
   **Desktop 孤儿 session 无法恢复，Retry 失效**  
   - 用户可见阻塞，且当前没有明确修复 PR

7. [`#102566`](https://github.com/nousresearch/hermes-agent/issues/102566)  
   **正常完成的回复被错误替换为 interrupted**  
   - 影响信任度，属于典型的状态持久化 bug

8. [`#102632`](https://github.com/nousresearch/hermes-agent/issues/102632)  
   **Nix 打包缺少 Python 模块**  
   - 兼容性问题，可能影响发布包用户

---

## 总体结论

Hermes Agent 今天呈现出一个很典型的开源高活跃阶段：**输入很多、修复也在推进，但系统稳定性和入口一致性仍是主战场**。  
从数据看，项目的核心挑战已经从“单一功能实现”转向“多端、多 profile、多 provider、多调度器并存下的状态正确性”。  
如果后续能把 [`#102615`](https://github.com/nousresearch/hermes-agent/pull/102615)、[`#102640`](https://github.com/nousresearch/hermes-agent/pull/102640) 这类修复尽快合入，并尽快处理 [`#102486`](https://github.com/nousresearch/hermes-agent/issues/102486)、[`#102526`](https://github.com/nousresearch/hermes-agent/issues/102526) 这类 P1 问题，项目健康度会明显改善。  

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合公众号/内部周报的精简版**，或  
2. **带“风险分级 + 下一步建议”的管理层版本**。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报  
**日期：2026-09-04**  
仓库：[`sipeed/picoclaw`](https://github.com/sipeed/picoclaw)

## 1. 今日速览
过去 24 小时内，PicoClaw 的社区活跃度偏低：**Issues 零更新、无新版本发布**，说明产品侧没有出现新的用户反馈或紧急故障。  
但维护侧仍有一定动作，**新增/更新了 5 个 PR，全部为依赖升级类自动化提交（Dependabot）**，体现出项目在持续进行基础维护。  
整体来看，项目当前处于**“低讨论、轻维护、无交付落地”**状态：健康度尚可，但今日没有实质性的功能合并或问题修复。  
从信号上看，当前工作重心更偏向**依赖安全与兼容性更新**，而不是功能迭代。  

---

## 2. 版本发布
**今日无新版本发布。**  
可关注发布页：[`Releases`](https://github.com/sipeed/picoclaw/releases)

---

## 3. 项目进展
今日**没有合并或关闭的重要 PR**，因此项目代码层面没有发生可确认的交付推进。  
不过，5 个待合并 PR 反映出项目正在推进一轮依赖升级，主要涉及 Go 生态与 SDK 版本更新，这类变更通常用于：
- 修复潜在安全风险
- 保持与上游库兼容
- 为后续功能开发降低技术债

今日更新的 PR：
- [`#3364`](https://github.com/sipeed/picoclaw/pull/3364) `build(deps): bump github.com/aws/aws-sdk-go-v2 from 1.42.0 to 1.45.1`
- [`#3362`](https://github.com/sipeed/picoclaw/pull/3362) `build(deps): bump golang.org/x/term from 0.44.0 to 0.45.0`
- [`#3363`](https://github.com/sipeed/picoclaw/pull/3363) `build(deps): bump github.com/ergochat/irc-go from 0.6.0 to 0.7.0`
- [`#3361`](https://github.com/sipeed/picoclaw/pull/3361) `build(deps): bump google.golang.org/protobuf from 1.36.11 to 1.36.12`
- [`#3360`](https://github.com/sipeed/picoclaw/pull/3360) `build(deps): bump github.com/larksuite/oapi-sdk-go/v3 from 3.9.4 to 3.11.0`

**整体向前迈进的幅度：**
- 功能交付：**0**
- 稳定性/维护性推进：**中等**
- 代码变更落地：**尚未发生（全部待审）**

---

## 4. 社区热点
今日**没有活跃 Issues**，也**没有出现评论最多或反应最多的讨论**。  
当前可见的社区注意力主要集中在自动化依赖升级 PR 上，而不是用户驱动的问题反馈。  
这意味着：
- 暂时没有明显的使用阻塞或争议性话题
- 项目讨论热度偏低
- 维护工作主要由机器人驱动，而非真实用户反馈驱动

相关链接：
- Issues 列表：[`Issues`](https://github.com/sipeed/picoclaw/issues)
- PR [`#3364`](https://github.com/sipeed/picoclaw/pull/3364)
- PR [`#3363`](https://github.com/sipeed/picoclaw/pull/3363)
- PR [`#3362`](https://github.com/sipeed/picoclaw/pull/3362)
- PR [`#3361`](https://github.com/sipeed/picoclaw/pull/3361)
- PR [`#3360`](https://github.com/sipeed/picoclaw/pull/3360)

---

## 5. Bug 与稳定性
**今日未收到新的 Bug、崩溃或回归报告。**  
按严重程度排序：  
1. **高严重度**：无  
2. **中严重度**：无  
3. **低严重度**：无  

当前也**没有已知的 fix PR** 指向用户报告的问题。  
从稳定性角度看，这一日没有明显风险暴露；但由于没有 Issues 活跃，也要警惕“低反馈不等于无问题”，可能存在尚未被反馈的隐性故障。  

参考：
- [`Issues`](https://github.com/sipeed/picoclaw/issues)
- [`Pull Requests`](https://github.com/sipeed/picoclaw/pulls)

---

## 6. 功能请求与路线图信号
**今日没有新的功能请求型 Issues。**  
从现有 PR 看，路线图信号主要来自依赖升级，而不是新能力开发：

- [`#3364`](https://github.com/sipeed/picoclaw/pull/3364) AWS SDK 升级
- [`#3363`](https://github.com/sipeed/picoclaw/pull/3363) IRC 库升级
- [`#3360`](https://github.com/sipeed/picoclaw/pull/3360) 飞书 OAPI SDK 升级

这通常意味着下一阶段如果有版本发布，优先级更可能是：
- 依赖兼容性整理
- 安全更新
- 构建/运行稳定性修复

**可推断：**
- 暂未看到明确的新功能路线图信号
- 如果这些依赖升级顺利合并，后续可能为更大范围的业务功能迭代清理环境

---

## 7. 用户反馈摘要
**今日无 Issues 评论数据，也无可提炼的用户反馈。**  
因此本日无法从评论中归纳真实用户痛点、满意点或典型使用场景。  
这本身也释放出一个信号：项目当前的外部反馈链路较弱，用户声音未明显进入公开讨论层面。  

参考：
- [`Issues`](https://github.com/sipeed/picoclaw/issues)

---

## 8. 待处理积压
今日积压主要体现在**5 个待处理依赖升级 PR**，且均为 2026-09-03 创建/更新，尚未合并：

- [`#3364`](https://github.com/sipeed/picoclaw/pull/3364) `github.com/aws/aws-sdk-go-v2` 1.42.0 → 1.45.1
- [`#3363`](https://github.com/sipeed/picoclaw/pull/3363) `github.com/ergochat/irc-go` 0.6.0 → 0.7.0
- [`#3362`](https://github.com/sipeed/picoclaw/pull/3362) `golang.org/x/term` 0.44.0 → 0.45.0
- [`#3361`](https://github.com/sipeed/picoclaw/pull/3361) `google.golang.org/protobuf` 1.36.11 → 1.36.12
- [`#3360`](https://github.com/sipeed/picoclaw/pull/3360) `github.com/larksuite/oapi-sdk-go/v3` 3.9.4 → 3.11.0

**维护建议：**
- 优先确认升级后的编译与回归测试结果
- 重点关注 SDK 主版本/次版本升级可能带来的接口变更
- 若这些 PR 长期未审，建议集中做一次依赖升级批处理与兼容性验证

**Issues 积压方面：**
- 当前没有可见的长期未响应 Issue
- 但由于 Issues 总量为 0，建议继续观察是否存在“未公开但实际存在”的用户问题

参考：
- [`Pull Requests`](https://github.com/sipeed/picoclaw/pulls)
- [`Issues`](https://github.com/sipeed/picoclaw/issues)

---

## 总结判断
PicoClaw 今天的状态可以概括为：**无用户侧波动、无版本交付、但维持了正常的依赖维护节奏**。  
从项目健康度看，短期没有明显风险；从发展动能看，今天的信号偏弱，说明项目目前更像是在做“底座保养”而非“产品推进”。  
接下来最值得关注的是：这些依赖升级 PR 是否能顺利合并，以及是否会带来新的发布节奏。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

以下为 **NanoClaw（2026-09-04）项目动态日报**。  
数据窗口：过去 24 小时内 **4 条 Issue 更新、6 条 PR 更新、0 个新版本发布**。整体看，项目处于**高活跃、低交付**状态：讨论和修复点很多，但当天没有合并/关闭记录，说明工作主要停留在排队与评审阶段。

---

## 1) 今日速览

过去 24 小时，NanoClaw 的活跃度明显偏高，新增/活跃事项共 **10 条**，且全部仍处于开放状态。  
问题与改进点主要集中在 **CLI 配置正确性、任务调度逻辑、SQLite 并发与测试稳定性、消息路由性能、渠道适配** 等核心模块。  
从内容看，项目当前不是“单点修补”，而是多个子系统同时推进，体现出较强的迭代节奏。  
不过，**没有新版本发布，也没有 PR 合并/关闭**，因此今日更多体现为“需求与修复积累”，尚未转化为可发布成果。  
总体判断：**开发活跃度高，工程议题密集，交付侧仍在蓄力。**

---

## 2) 版本发布

**今日无新版本发布。**

- Releases：无
- 影响：本日没有可回溯的发布说明、破坏性变更或迁移事项

---

## 3) 项目进展

**今日没有已合并/关闭的重要 PR**，因此没有“已经落地”的版本级进展可直接确认。  
但从 6 个开放 PR 的主题来看，项目正在同时推进以下方向：

- **核心路由优化**：#3711 推动“按需加载 inbound 内容”，减少无谓成本
- **渠道适配增强**：#3712 处理 WhatsApp 文档 caption 与媒体下载策略
- **配置能力增强**：#3713 记录 agent group 的 delivery mode
- **运行时稳定性**：#3708 调整 SQLite 连接 PRAGMA 顺序，缓解锁竞争
- **测试/环境治理**：#3710 清理测试遗留的临时目录
- **执行控制能力**：#3707 为 poll loop 增加 admission gate seam

### 结论
- **代码层面：** 今日尚未出现合并落地
- **工程推进：** 但已经形成一组明显的“下一步改进包”
- **项目向前迈进的程度：** 更像是“架构与稳定性议题集中收敛”，而不是“今天完成了多少可见功能上线”

相关 PR：
- [#3713 feat(config): record a per-agent-group delivery mode](https://github.com/qwibitai/nanoclaw/pull/3713)
- [#3712 fix(whatsapp): read document captions, and stop downloading media nobody wants](https://github.com/qwibitai/nanoclaw/pull/3712)
- [#3711 feat(router): defer expensive inbound content until an agent will receive it](https://github.com/qwibitai/nanoclaw/pull/3711)
- [#3710 test: remove the temp directories the suite leaves behind](https://github.com/qwibitai/nanoclaw/pull/3710)
- [#3708 fix(agent-runner): set busy_timeout before journal_mode on outbound open](https://github.com/qwibitai/nanoclaw/pull/3708)
- [#3707 feat(agent-runner): add registerAdmissionGate poll-loop seam](https://github.com/qwibitai/nanoclaw/pull/3707)

---

## 4) 社区热点

从可见数据看，**最明确的讨论热点是 Issue #3706**，因为它是今日唯一显示有评论的条目（1 条评论）。  
其余 Issue/PR 虽然也在活跃更新，但未提供评论数，因此无法确认“讨论最热”的排序；从反应数看，也基本没有明显点赞反馈，说明当前热度更多来自**真实使用痛点**，而不是广泛围观。

### 重点热点
- [#3706 ncl groups config add-mount silently produces a broken double-nested path when --container is an absolute path](https://github.com/qwibitai/nanoclaw/issues/3706)

### 热点背后的诉求
- 用户希望 CLI 参数能**自然接受绝对路径**
- 这类问题属于**高频、易踩坑、直接影响配置正确性**的 UX/功能缺陷
- 从评论出现可以推断：这是一个**具备复现性、值得维护者优先回应**的问题

### 次级热点信号
虽然没有评论统计，但以下 PR 主题显示出社区关注点很集中：
- [#3711](https://github.com/qwibitai/nanoclaw/pull/3711) / [#3712](https://github.com/qwibitai/nanoclaw/pull/3712)：消息内容按需加载、WhatsApp 媒体处理效率
- [#3708](https://github.com/qwibitai/nanoclaw/pull/3708)：SQLite 并发/锁竞争
- [#3710](https://github.com/qwibitai/nanoclaw/pull/3710)：测试残留与环境污染

---

## 5) Bug 与稳定性

以下按影响程度排序：

### 1. 高：测试并发不稳定，可能互相删除数据库
- [#3709 Mailbox SQLite tests use a fixed /tmp fixture root — concurrent vitest runs delete each other's databases](https://github.com/qwibitai/nanoclaw/issues/3709)
- **影响面：** 开发者本地并行测试、CI 多工位/多 worktree 场景
- **风险：** 非确定性失败，削弱测试可信度，影响持续集成效率
- **当前状态：** 已报告，**未见明确对应 fix PR**

### 2. 高：`add-mount` 在绝对路径下生成错误的双重嵌套路径
- [#3706 ncl groups config add-mount silently produces a broken double-nested path when --container is an absolute path](https://github.com/qwibitai/nanoclaw/issues/3706)
- **影响面：** CLI 配置与挂载路径正确性
- **风险：** 直接生成坏配置，可能导致容器内路径错误、挂载失效
- **当前状态：** 已报告，**未见明确对应 fix PR**

### 3. 高：任务 recurrence 更新后未重算下次触发时间
- [#3705 ncl tasks update --recurrence doesn't recompute the next scheduled fire (process_after)](https://github.com/qwibitai/nanoclaw/issues/3705)
- **影响面：** 定时任务语义正确性
- **风险：** 用户修改节奏后，任务仍按旧节奏触发，属于逻辑回归/错误调度
- **当前状态：** 已报告，**未见明确对应 fix PR**

### 相关稳定性修复信号
虽然不是上述 Issue 的直接修复，但以下 PR 值得关注：
- [#3708](https://github.com/qwibitai/nanoclaw/pull/3708)：调整 SQLite PRAGMA 顺序，目标是缓解锁等待/并发打开问题
- [#3710](https://github.com/qwibitai/nanoclaw/pull/3710)：清理测试遗留目录，提升测试与环境稳定性

---

## 6) 功能请求与路线图信号

今天的功能诉求非常清晰，主要集中在“**更强的可扩展性**”和“**更低的运行成本**”。

### 可能纳入下一版本的信号

#### 1) agent group 的 delivery mode 配置
- [#3713 feat(config): record a per-agent-group delivery mode](https://github.com/qwibitai/nanoclaw/pull/3713)
- **路线图信号：** 项目正在支持不同模型/代理对消息投递契约的差异化处理
- **价值：** 为“不支持 envelope contract”的模型提供替代投递路径

#### 2) inbound 内容延迟解析
- [#3711 feat(router): defer expensive inbound content until an agent will receive it](https://github.com/qwibitai/nanoclaw/pull/3711)
- **路线图信号：** 核心路由正从“先完全解析再分发”向“按需解析”演进
- **价值：** 降低网络请求、下载和无效处理开销

#### 3) WhatsApp 文档 caption 与媒体处理优化
- [#3712 fix(whatsapp): read document captions, and stop downloading media nobody wants](https://github.com/qwibitai/nanoclaw/pull/3712)
- **路线图信号：** 渠道适配正在从“能用”走向“省流量、少副作用、信息更完整”
- **价值：** 更贴近真实消息工作流

#### 4) 扩展点/Hook 需求
- [#3704 Would you accept a protected session-assembly hook on SqliteAgentMailbox for subclassing implementations?](https://github.com/qwibitai/nanoclaw/issues/3704)
- **路线图信号：** 有 fork/二次开发场景希望获得更稳定的继承点
- **价值：** 对生态和定制化很重要，可能推动 API/内部 seam 的设计调整

### 判断
如果按当前 PR 组合看，**#3711 + #3712 + #3713** 最像下一轮可合并的路线图内容，因为它们分别覆盖了：
- 路由核心
- 渠道适配
- 配置/协议元数据

---

## 7) 用户反馈摘要

从 Issues/PR 描述中，可以提炼出几类真实用户痛点：

### 1. “默认行为要符合直觉”
- [#3706](https://github.com/qwibitai/nanoclaw/issues/3706)
- 用户希望 `--container /absolute/path` 这种输入能按直觉工作，而不是悄悄生成错误路径
- 反映出对 CLI 可用性的要求很高：**不希望参数存在隐式约束**

### 2. “改了设置就要立即生效”
- [#3705](https://github.com/qwibitai/nanoclaw/issues/3705)
- 用户修改任务频率后，希望下一次触发时间自动重算
- 说明使用者把 NanoClaw 当作**实际生产调度工具**在使用，而不是玩具级 demo

### 3. “测试和开发环境不能互相污染”
- [#3709](https://github.com/qwibitai/nanoclaw/issues/3709)
- 体现出开发者在多 worktree / 并行 vitest 场景下对稳定性的敏感
- 这通常意味着项目已经进入**多人协作、持续集成密集**阶段

### 4. “框架要可扩展，fork 不想一直打补丁”
- [#3704](https://github.com/qwibitai/nanoclaw/issues/3704)
- fork 维护者希望有受保护的 hook，而不是只能覆盖大量内部实现
- 这表明 NanoClaw 已经有**二次开发/私有定制**用户群

### 5. “不要为无用信息付费”
- [#3711](https://github.com/qwibitai/nanoclaw/pull/3711) / [#3712](https://github.com/qwibitai/nanoclaw/pull/3712)
- 用户希望只在真正需要时才拉取内容、下载媒体
- 反映出对**性能、带宽与响应时间**的关注

---

## 8) 待处理积压

**严格按当前数据看，没有可确认的“长期未响应”积压项**：  
所有列出的 Issue/PR 都是 **2026-09-03 创建或更新**，仍处于 24 小时内的新鲜状态。

### 但从优先级角度，建议维护者优先盯住这些开放项：
1. [#3709](https://github.com/qwibitai/nanoclaw/issues/3709) — 测试并发稳定性，影响 CI 与开发效率  
2. [#3706](https://github.com/qwibitai/nanoclaw/issues/3706) — CLI 配置正确性，影响真实用户输入  
3. [#3705](https://github.com/qwibitai/nanoclaw/issues/3705) — 调度语义，影响任务执行结果  
4. [#3704](https://github.com/qwibitai/nanoclaw/issues/3704) — 扩展点诉求，影响生态与 fork 维护成本  

---

## 总体结论

NanoClaw 今日表现为**高频活跃、问题导向明确、架构演进持续推进**。  
短期内，项目的核心关注点不是新增“花哨功能”，而是：
- 让 CLI 行为更可靠
- 让调度语义更准确
- 让测试与 SQLite 并发更稳定
- 让路由和渠道处理更省资源
- 让框架更易扩展

如果你愿意，我可以把这份日报进一步整理成：
1. **适合发群里的简版日报**，或  
2. **适合管理层阅读的“风险/机会”版周报格式**。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

以下为 **IronClaw（nearai/ironclaw）2026-09-04 项目动态日报**。  
整体看，今天是一个**以代码推进为主、讨论热度偏低**的工作日：过去 24 小时共有 **2 条 Issue 更新**、**9 条 PR 更新**，其中 **3 条 PR 已关闭/合并**，没有新版本发布。项目重心集中在 **上下文预算、缓存键、命令/响应链路、WebUI/Host API 稳定性** 等核心路径，说明团队仍在持续修补基础能力与边界问题。当前活跃度不低，但更多是工程实现层面的推进，而非社区讨论驱动。

---

## 1. 今日速览

- 今天的项目动态主要由 PR 推动，**9 条 PR 更新、3 条已关闭/合并**，表明维护者在持续清理主干问题并推进功能修复。
- 没有新版本发布，说明当前更像是一个**持续集成与问题收敛阶段**，尚未进入集中发版窗口。
- 新增/活跃 Issue 只有 2 条，且评论和反应都很少，社区讨论热度较低，但问题聚焦非常明确：**上下文预算计算**与**失败分类/质量分析**。
- 从 PR 主题看，项目正在同时处理**模型上下文治理、缓存一致性、取消语义、权限/接入边界和 UI 测试稳定性**，健康度总体偏稳，但仍存在一些关键链路上的 bug 修复需求。

---

## 2. 版本发布

- **今日无新版本发布。**

---

## 3. 项目进展

今天已关闭/合并的关键 PR 主要有 3 条，分别推进了测试稳定性、CI 可靠性与 UI/主干修复：

### 已关闭/合并的 PR
1. **#8060 `ci(nextest): give the whole-tree architecture scans real timeout headroom`**  
   链接：<https://github.com/nearai/ironclaw/pull/8060>  
   这条 PR 解决的是 CI 中全树架构扫描接近超时的问题，给 `ironclaw_architecture_tests` 更合理的时间余量。  
   **价值**：提升 CI 稳定性，减少“非功能性失败”对主干健康度的干扰。

2. **#8058 `test(webui): use the live extension id in the notification-setup boundary test`**  
   链接：<https://github.com/nearai/ironclaw/pull/8058>  
   该 PR 修复了 WebUI 边界测试中使用过时 extension id 导致的失败问题。  
   **价值**：直接修复主干测试红灯，减少对其他 PR 的连带阻塞。

3. **#8055 `fix(webui): follow authorizeTraceHold to trace-api.ts in the asset test`**  
   链接：<https://github.com/nearai/ironclaw/pull/8055>  
   修正了静态资源测试的引用路径，避免由于代码重构导致测试失效。  
   **价值**：修复主干回归问题，是典型的“维护型推进”，对持续交付很关键。

### 今日推进的核心方向
- **稳定性修复占主导**：CI、WebUI 测试、资产引用等基础链路问题被持续收敛。
- **产品行为修正并行推进**：包括取消语义、上下文预算、缓存键等，会直接影响运行时体验和模型请求质量。
- **项目整体前进幅度**：今天更像是在为后续版本“清障”，虽然没有发版，但对主干可用性和后续合并效率的提升是实打实的。

---

## 4. 社区热点

> 说明：今天的 Issues/PR 基本都没有评论或反应数据（多数为 0 或未提供），因此**没有明显的高互动热点**。当前“热度”更多体现为开发者主动提交的工程修复，而非社区集中讨论。

### 相对最值得关注的条目
1. **Issue #8057 `[enhancement] Prompt budget should account for non-transcript prompt material`**  
   链接：<https://github.com/nearai/ironclaw/issues/8057>  
   诉求集中在：**prompt context budget 只算 transcript，不算 identity/SYSTEM.md、skills、memory、tool schemas 等额外材料**。  
   背后的需求很明确：用户希望预算逻辑与实际请求负载一致，避免模型请求超出预期预算。

2. **PR #8053 `feat(loop): derive the prompt context budget from the model's advertised window`**  
   链接：<https://github.com/nearai/ironclaw/pull/8053>  
   这条 PR 与 #8057 高度相关，直接解决“预算与模型窗口脱节”的问题。  
   说明：项目当前正在把上下文预算从“编译时固定值”迁移到“模型能力感知”的更合理方式。

3. **PR #8059 `fix(responses): send cancel reason the product surface accepts`**  
   链接：<https://github.com/nearai/ironclaw/pull/8059>  
   该 PR 指向取消接口与产品层语义不一致的问题，涉及实际用户操作体验。  
   虽然没有评论热度，但从功能影响上看，属于“高频交互路径”的修复。

### 热点判断
- 今天没有明显的“讨论热点”，但有明显的**技术热点**：  
  **上下文预算、请求缓存、取消语义、WebUI 测试、主干稳定性**。
- 这意味着社区问题并未爆炸，但维护团队正集中清理“基础设施型痛点”。

---

## 5. Bug 与稳定性

按严重程度排序如下：

### 1) 高严重度：潜在运行时越界/崩溃风险
**PR #8056 `fix(host-api): avoid malformed preview range panic`**  
链接：<https://github.com/nearai/ironclaw/pull/8056>  
- 问题：当嵌入式 tool-result 文本出现“关闭 JSON 分隔符早于开启分隔符”的异常结构时，可能触发 panic。
- 影响：这是典型的**输入异常导致的崩溃风险**，属于稳定性优先级很高的问题。
- 状态：已有修复 PR，建议优先合并与回归验证。

### 2) 高严重度：上下文预算不准确，可能导致请求超限或行为偏差
**Issue #8057 `Prompt budget should account for non-transcript prompt material`**  
链接：<https://github.com/nearai/ironclaw/issues/8057>  
- 问题：当前预算只统计 transcript，未计入 identity、skills、memory、channel context、tool schemas 等。
- 影响：可能导致实际发给 provider 的请求体**超过预算认知**，引发截断、请求失败或上下文管理偏差。
- 关联修复：**PR #8053**  
  链接：<https://github.com/nearai/ironclaw/pull/8053>

### 3) 中严重度：取消接口语义错误，导致用户无法终止运行
**PR #8059 `fix(responses): send cancel reason the product surface accepts`**  
链接：<https://github.com/nearai/ironclaw/pull/8059>  
- 问题：`/cancel` 接口返回 `400 invalid_request`，无论 in-progress 还是 completed 状态都无法成功取消。
- 影响：影响用户控制正在运行的任务，是明显的产品功能缺陷。
- 状态：已有修复 PR，但需要尽快验证端到端行为。

### 4) 中低严重度：命令/接入首次体验异常
**PR #8054 `fix(assistant): check pairing before command admission so first contact gets the connect notice`**  
链接：<https://github.com/nearai/ironclaw/pull/8054>  
- 问题：未绑定用户首次 `/start` 收到的是命令列表，而不是配对/连接提示。
- 影响：属于新用户引导问题，会降低首次使用体验。
- 状态：仍为开放 PR。

### 5) 低到中严重度：测试/回归导致主干红灯
**PR #8055**、**PR #8058**、**PR #8060**  
链接：  
- <https://github.com/nearai/ironclaw/pull/8055>  
- <https://github.com/nearai/ironclaw/pull/8058>  
- <https://github.com/nearai/ironclaw/pull/8060>  
这些问题主要是测试和 CI 稳定性，但对维护效率影响很大。  
**结论**：项目当前最需要的是“修复真实 bug + 降低测试噪音”双线并进。

---

## 6. 功能请求与路线图信号

今天的功能请求和路线图信号非常明确，主要集中在以下两个方向：

### 1) 上下文预算治理
**Issue #8057**  
链接：<https://github.com/nearai/ironclaw/issues/8057>  
**PR #8053**  
链接：<https://github.com/nearai/ironclaw/pull/8053>  

- 这是今天最强的路线图信号之一。
- 从 issue 到 PR 的联动看，团队正在把 prompt budget 从“粗粒度 transcript 计算”升级为“全量 prompt 成本感知”。
- 这类改动很可能会进入下一轮稳定版本，因为它直接影响模型请求正确性和成本控制。

### 2) 请求链路与交互语义修复
**PR #8059**（取消语义）  
链接：<https://github.com/nearai/ironclaw/pull/8059>  
**PR #8054**（首次接触配对提示）  
链接：<https://github.com/nearai/ironclaw/pull/8054>  

- 这两条都指向“产品表面”的行为修正。
- 一类是**运行中控制能力**，一类是**首次使用引导**。
- 若后续验证顺利，预计会作为下一版本的可见功能/体验改进纳入。

### 3) 基础设施与缓存优化
**PR #8062 `fix(llm): send conversation cache keys on OpenAI request paths`**  
链接：<https://github.com/nearai/ironclaw/pull/8062>  

- 虽然仍是开放 PR，但它说明项目在推动**会话级缓存键一致性**。
- 这通常意味着：更好的复用、更低的重复开销，以及更稳定的 OpenAI/兼容 API 行为。
- 属于中长期有价值的底层优化，值得跟踪。

---

## 7. 用户反馈摘要

由于今天的 Issues/PR **几乎没有评论互动**，用户反馈主要来自标题与摘要中的“问题陈述”，可以提炼出以下真实痛点：

### 1) 用户对“预算是否真实可用”非常敏感
来源：**Issue #8057**  
链接：<https://github.com/nearai/ironclaw/issues/8057>  
- 真实场景：用户在使用 agent loop 时，会叠加 identity、skills、memory、tool schemas 等多种 prompt 材料。
- 痛点：预算只算 transcript，导致用户看到的“可用上下文”与实际请求不一致。
- 不满意点：**系统内部口径与实际 API 请求口径不一致**，容易导致难以解释的失败。

### 2) 用户需要更可靠的中断/取消能力
来源：**PR #8059**  
链接：<https://github.com/nearai/ironclaw/pull/8059>  
- 真实场景：任务执行中需要取消，但接口行为不符合预期。
- 痛点：取消请求发出后依旧无法终止，给用户造成“系统不可控”的感觉。
- 不满意点：控制平面语义不稳定，影响可信度。

### 3) 新用户首次接入体验存在引导缺口
来源：**PR #8054**  
链接：<https://github.com/nearai/ironclaw/pull/8054>  
- 真实场景：Telegram 首次接触的未配对用户发送 `/start`。
- 痛点：先看到命令菜单，而不是应有的配对连接提示。
- 不满意点：**信息呈现顺序不符合用户预期**，容易让新用户误以为系统可直接使用。

### 4) 维护者和贡献者更关注“减少回归噪音”
来源：**#8055、#8058、#8060**  
链接：  
- <https://github.com/nearai/ironclaw/pull/8055>  
- <https://github.com/nearai/ironclaw/pull/8058>  
- <https://github.com/nearai/ironclaw/pull/8060>  
- 这说明社区/维护者对稳定主干和可持续合并效率非常敏感。
- 这类反馈通常来自持续集成实践，而不是终端用户，但对项目健康度很关键。

---

## 8. 待处理积压

以下条目值得维护者持续关注，尤其是长期未响应或仍开放的关键项：

### 1) Issue #8057：上下文预算遗漏非 transcript 材料
链接：<https://github.com/nearai/ironclaw/issues/8057>  
- 这是当前最值得跟进的开放需求之一。
- 已经有相关 PR #8053，建议尽快完成 review/验证闭环。

### 2) PR #8053：基于模型窗口推导 prompt budget
链接：<https://github.com/nearai/ironclaw/pull/8053>  
- 影响面大，且与 #8057 强相关。
- 如果合并，能直接改善预算一致性和模型兼容性。

### 3) PR #8062：会话缓存键下发到 OpenAI 请求路径
链接：<https://github.com/nearai/ironclaw/pull/8062>  
- 这是较大的变更（XL），虽标记 low risk，但建议重点审查缓存键域隔离与跨轮次一致性。
- 涉及请求路径，值得在合并前充分验证。

### 4) PR #8056：preview range panic 修复
链接：<https://github.com/nearai/ironclaw/pull/8056>  
- 这是稳定性优先项。
- 如果已通过验证，应尽快纳入，以减少 host-api 潜在崩溃风险。

### 5) PR #8054：首次配对提示顺序修复
链接：<https://github.com/nearai/ironclaw/pull/8054>  
- 属于用户首次体验问题，建议尽快处理，避免新用户流失。

---

## 总体结论

今天的 IronClaw 处于**“稳定性修复 + 核心行为校正”**的推进阶段：  
- **工程侧**：CI、WebUI、Host API、请求取消、缓存键、上下文预算都在持续修补；  
- **产品侧**：首次体验、取消语义、预算准确性是最明确的用户价值点；  
- **社区侧**：讨论热度不高，但问题集中且方向清晰，说明项目目前的挑战主要是“把基础能力做对、做稳”。

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合直接发到 Slack/飞书 的简版**，或  
2. **适合管理层阅读的周报/日会版**。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-09-04）

## 1. 今日速览
今天 LobsterAI 仍处于**高频修复与发版收口**状态：过去 24 小时内没有新版本发布，但有 **10 条 PR 更新全部进入关闭/合并结果**，说明仓库维护节奏很快，且多数工作集中在发布前的体验修整与稳定性补强。  
从内容看，今天的改动覆盖了**浏览器交互恢复、安装器稳定性、窗口行为优化、语音配额提示、OpenClaw 体积控制**等关键链路，属于对主流程和边缘体验的同步打磨。  
同时，新增/活跃 Issue 只有 **1 条**，讨论热度不高，社区反馈相对聚焦，当前项目健康度表现为：**开发活跃、问题收敛、需求清晰**。  
值得关注的是，今天唯一的新需求集中在 **MCP Apps / Prefab UI 渲染支持**，这与桌面端可交互能力扩展方向高度一致。  
- Issue：[#2601](https://github.com/netease-youdao/LobsterAI/issues/2601)

---

## 2. 项目进展
今天最重要的进展可以概括为：**围绕 2026.9.4 发布线，对核心交互、安装体验和桌面客户端兼容性做了一轮集中修复与回归**。

### 关键 PR 与推进点
1. **恢复交互式内置浏览器能力**  
   - PR：[#2602](https://github.com/netease-youdao/LobsterAI/pull/2602)  
   - 作用：恢复 Agent Browser、浏览器 MCP 桥、持久化浏览器配置、加密凭据、审批控制的自动填充与设置管理。  
   - 评价：这是今天最“平台级”的改动之一，直接补回桌面端与网页/浏览器交互的关键能力。

2. **安装更新与退出行为更安全**  
   - PR：[#2609](https://github.com/netease-youdao/LobsterAI/pull/2609)  
   - 作用：安装更新时若存在 agent turn / scheduled task，先确认再执行，避免中断任务；退出应用也增加确认，减少误操作。  
   - 评价：属于高价值稳定性改进，明显降低用户在更新和退出时的数据/任务中断风险。

3. **Windows 安装器与启动链路修复**  
   - PR：[#2605](https://github.com/netease-youdao/LobsterAI/pull/2605)  
   - PR：[#2606](https://github.com/netease-youdao/LobsterAI/pull/2606)  
   - 作用：安装器声明 DPI-aware，修复图标模糊；启动 helper 进程时不再弹出控制台窗口。  
   - 评价：这类修复虽不改变功能边界，但会显著改善 Windows 用户的第一印象和安装体验。

4. **OpenClaw / dsh 相关依赖收敛与体积优化**  
   - PR：[#2607](https://github.com/netease-youdao/LobsterAI/pull/2607)  
   - 作用：停止 peer install 导致的插件体积膨胀，并移除 dsh 作为 MCP server 的委派链路。  
   - 评价：这是工程化优化，减少无效耦合，降低包体和维护复杂度。

5. **语音输入额度与文案体验调整**  
   - PR：[#2603](https://github.com/netease-youdao/LobsterAI/pull/2603)  
   - PR：[#2604](https://github.com/netease-youdao/LobsterAI/pull/2604)  
   - 作用：优化“语音额度用尽”文案；按钮在额度耗尽时保持可点击但呈现稳定的弱化状态。  
   - 评价：增强用户对额度状态的理解，同时减少误判“功能失效”的困惑。

6. **IM / Bot 卡片布局改进**  
   - PR：[#2599](https://github.com/netease-youdao/LobsterAI/pull/2599)  
   - 作用：限制多实例 bot 卡片的响应式列数、压缩空卡片展示。  
   - 评价：属于细节体验修补，提升信息密度与视觉一致性。

7. **发版准备收口**  
   - PR：[#2600](https://github.com/netease-youdao/LobsterAI/pull/2600)  
   - 作用：为 2026.8.31 版本准备整体发布内容。  
   - 评价：说明仓库当前已经处于连续发版和补丁迭代阶段，而不是单点开发期。

### 整体向前迈进了多少
如果按“产品能力”看，今天的推进不是新增很多大功能，而是把**浏览器交互、安装/退出、Windows 兼容性、资源体积、语音状态展示**这些影响用户感知最强的链路一并修好。  
这类工作对项目健康度的提升非常直接，意味着 **可用性、稳定性、发布可信度** 都在同步上升。

---

## 3. 社区热点
今天社区最活跃、最值得关注的点是唯一的开放 Issue：

- **#2601 Support rendering MCP Apps / Prefab UI in the desktop client**  
  [Issue 链接](https://github.com/netease-youdao/LobsterAI/issues/2601)  
  - 评论数：1  
  - 反应数：0  
  - 状态：OPEN

### 热点分析
这个需求本质上是在问：**桌面客户端能否直接渲染 MCP Apps 返回的交互式 HTML UI**。  
它对应的真实诉求是：当 MCP server 采用 `io.modelcontextprotocol/ui` 扩展时，客户端不仅要“读懂工具结果”，还要能**原生展示可交互界面**，例如 PrefectHQ Prefab / FastMCP 这类返回 `ui://` 资源的场景。

这说明用户/开发者已经不满足于文本化工具调用，而是希望 LobsterAI 具备：
- 更强的 **MCP UI 承载能力**
- 更自然的 **桌面端交互体验**
- 对新一代 **Agent 工具生态** 的兼容性

从热度看，当前社区讨论不算大，但诉求方向非常明确，属于**高价值基础能力需求**。

---

## 4. Bug 与稳定性
今天没有新增明确的崩溃日志或大规模故障报告，但从关闭的 PR 来看，**稳定性修复非常集中**。以下按潜在影响程度排序：

### 高优先级
1. **更新/退出时中断运行中的 agent 任务风险**
   - PR：[#2609](https://github.com/netease-youdao/LobsterAI/pull/2609)
   - 问题：安装更新或退出应用时，可能直接打断 agent turn / scheduled task。
   - 现状：已通过确认弹窗与流程调整修复。

2. **内置浏览器交互能力回归**
   - PR：[#2602](https://github.com/netease-youdao/LobsterAI/pull/2602)
   - 问题：Agent Browser / MCP bridge / 持久化配置等关键能力需要恢复。
   - 现状：已关闭，说明相关链路已被恢复或补齐。

### 中优先级
3. **Windows 安装器图标模糊、启动辅助进程弹控制台窗口**
   - PR：[#2605](https://github.com/netease-youdao/LobsterAI/pull/2605)
   - PR：[#2606](https://github.com/netease-youdao/LobsterAI/pull/2606)
   - 问题：影响 Windows 用户安装体验和启动观感。
   - 现状：均已关闭，属于已修复问题。

4. **语音输入额度耗尽后的 UI 状态与文案不清晰**
   - PR：[#2603](https://github.com/netease-youdao/LobsterAI/pull/2603)
   - PR：[#2604](https://github.com/netease-youdao/LobsterAI/pull/2604)
   - 问题：容易让用户误以为按钮失效，或不清楚当前额度状态。
   - 现状：已修复，且补了视觉与文案双重提示。

### 低优先级
5. **Bot 卡片布局在多实例场景下不够稳定**
   - PR：[#2599](https://github.com/netease-youdao/LobsterAI/pull/2599)
   - 问题：视觉布局与响应式展示需要收敛。
   - 现状：已调整。

总体看，今天没有暴露出新的严重稳定性漏洞，反而是**一批影响体验的潜在问题被集中处理**，这对即将发布的版本是积极信号。

---

## 5. 功能请求与路线图信号
今天最明确的新功能请求来自：

- **#2601 Support rendering MCP Apps / Prefab UI in the desktop client**  
  [Issue 链接](https://github.com/netease-youdao/LobsterAI/issues/2601)

### 这条需求释放的路线图信号
- 用户希望 LobsterAI 不只是 MCP 调用执行器，而是一个**能够承载交互式应用的桌面容器**
- 这意味着未来版本可能继续加强：
  - 内置浏览器 / WebView 承载能力
  - MCP UI 协议兼容
  - 资源加载与安全隔离
  - 工具结果的富 UI 呈现

### 结合今日 PR 判断
- **[#2602](https://github.com/netease-youdao/LobsterAI/pull/2602)** 已经恢复浏览器桥与交互式浏览器能力，这与 #2601 的方向高度一致  
- 因此，#2601 很可能不是孤立需求，而是**下一阶段桌面端“富交互 MCP”能力演进**的自然延伸  
- 如果后续继续推进，这条需求进入下一版本的概率较高

---

## 6. 用户反馈摘要
> 说明：当前数据中仅展示了 Issue 标题与摘要，未提供完整评论正文；因此以下为**基于公开摘要的保守提炼**，避免过度推断。

从唯一活跃 Issue #2601 可以看出，用户最关心的是：

- **实际使用场景**：MCP server 返回的不再是纯文本，而是可交互 HTML UI
- **核心痛点**：LobsterAI 桌面客户端当前无法直接渲染这类 UI，导致工具能力“有输出但展示不完整”
- **隐含诉求**：用户希望在桌面端直接完成查看、交互、确认，而不是跳转外部浏览器或丢失富交互结构

这类反馈说明：
- 用户对 LobsterAI 的期待已经从“AI 助手”提升到“**AI 工作台 / 运行容器**”
- 对富界面支持的要求正在变成真实生产需求，而不只是实验性质能力

---

## 7. 待处理积压
根据当前给出的数据，**没有明显长期未响应的高优先级积压项**：  
- 唯一开放 Issue **#2601** 是 **2026-09-03 创建、同日更新**，还不属于“陈旧积压”
- 过去 24 小时的 PR 更新全部已关闭/收敛，说明维护节奏正常

### 需要持续关注的事项
- **#2601** 仍然值得重点跟进，因为它涉及桌面端对 MCP Apps 富 UI 的基础兼容能力  
  [Issue 链接](https://github.com/netease-youdao/LobsterAI/issues/2601)

### 维护建议
- 若下一版本继续围绕浏览器/网页容器能力演进，建议将 #2601 作为候选路线图项优先评估
- 目前没有明显“长期无人处理”的信号，项目积压压力较低，整体健康度良好

---

## 总体结论
LobsterAI 今天的状态可以概括为：**开发活跃、修复密集、版本准备充分、社区诉求清晰**。  
虽然没有新版本发布，但通过 10 条关闭 PR，项目在浏览器交互、Windows 体验、安装/退出安全、语音提示与工程体积等方面完成了明显收口。  
唯一的新 Issue #2601 也指向一个很明确的未来方向：**桌面端支持 MCP Apps / Prefab UI 的富交互渲染能力**。这条线如果推进，将显著增强 LobsterAI 在 Agent 工具生态中的竞争力。

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

以下为 **2026-09-04 CoPaw 项目动态日报**（基于过去 24 小时 GitHub 数据）：

---

## 1) 今日速览

过去 24 小时内，项目保持了**较高的开发与讨论活跃度**：Issues 更新 14 条、PR 更新 15 条，说明社区仍在持续集中反馈产品体验、稳定性和兼容性问题。  
当前没有新版本发布，说明团队今天的重心更偏向于**问题修复、架构调整和功能迭代准备**，而不是正式发版。  
从内容分布看，讨论热点集中在 **会话管理、渠道兼容、桌面/Web 体验、监控可观测性、启动性能** 等核心能力上，属于典型的“成长中项目”阶段。  
整体健康度判断：**活跃度高，需求真实且分布广，但也暴露出若干需要尽快收敛的稳定性与一致性问题**。  
- GitHub: https://github.com/agentscope-ai/QwenPaw

---

## 2) 版本发布

**今日无新版本发布。**  
- Releases: https://github.com/agentscope-ai/QwenPaw/releases

---

## 3) 项目进展

今日有 5 个 PR 处于已关闭/已合并状态，推进方向主要集中在 **安全治理、会话一致性、版本文档、执行契约** 等底层能力：

1. **#7525 fix(governance): require approval for non-auto-denied critical findings**  
   将安全治理策略从“CRITICAL 直接拒绝”调整为“需审批/按规则处理”，更符合 UI 语义，减少误杀。  
   - PR: https://github.com/agentscope-ai/QwenPaw/pull/7525

2. **#7523 fix(chat): sync resolved sessions during streaming**  
   修复流式生成期间会话映射同步问题，支持用户在消息生成时切换多个会话，改善聊天并发体验。  
   - PR: https://github.com/agentscope-ai/QwenPaw/pull/7523

3. **#7522 chore: bump the version to 2.2.1b1**  
   完成版本号提升，通常意味着一轮修复/迭代已进入发布准备阶段。  
   - PR: https://github.com/agentscope-ai/QwenPaw/pull/7522

4. **#7520 feat(agent): add protected execution contract**  
   引入“受保护执行契约”，强化 agent 的任务执行边界、阻断与授权语义，有利于后续安全和工具链扩展。  
   - PR: https://github.com/agentscope-ai/QwenPaw/pull/7520

5. **#7517 docs: update website for v2.2.0**  
   文档/官网同步升级，说明项目在向外部发布和对齐版本说明。  
   - PR: https://github.com/agentscope-ai/QwenPaw/pull/7517

**整体推进评估：**  
今天的代码进展不是“单点修补”，而是围绕 **会话状态、治理规则、执行安全、版本交付** 形成了较完整的一组收敛动作。可以认为项目至少有 **5 条关键工作线** 进入收尾或稳定化阶段。  
- PR 列表: https://github.com/agentscope-ai/QwenPaw/pulls

---

## 4) 社区热点

今天讨论最活跃的 Issues 主要有 4 条，均为 **2 条评论**，热点集中在实际使用痛点：

### A. 会话按“渠道”分裂的架构问题
- Issue #7541 `[question] Ошибка архитектуры: разделение сессий по каналам`
- 链接: https://github.com/agentscope-ai/QwenPaw/issues/7541

**诉求分析：**  
用户认为“channel 只是输入/传输层，不应该成为会话隔离维度”，希望同一用户在 web、desktop、telegram 等入口看到统一会话。  
这反映出社区对 **跨端连续性** 的期待已经很强，产品的“多渠道”能力正在从“能接入”走向“必须一致”。

### B. Feishu 会话 consumer 卡死，导致静默无响应
- Issue #7534 `[BUG] QwenPaw feishu session: queue consumer stays alive & stuck -> session silently unresponsive; new messages can't spawn a new consumer`
- 链接: https://github.com/agentscope-ai/QwenPaw/issues/7534

**诉求分析：**  
这是明显的稳定性痛点：会话表面存活、实际失去响应，且新消息无法恢复。用户想要的是 **自动恢复、幂等重建、故障可观测**。  
这类问题优先级通常很高，因为它直接影响机器人“在线性”。

### C. OpenCode API 需要新增 session header
- Issue #7531 `[Bug]: OpenCode API now requires x-opencode-session header`
- 链接: https://github.com/agentscope-ai/QwenPaw/issues/7531

**诉求分析：**  
属于外部 API 变更驱动的兼容性问题。用户明确提示服务端开始要求 header，说明社区对 **供应商 API 变化的快速适配** 很敏感。  
这类问题往往具备明确修复路径，因此讨论热度虽不算最高，但对可用性影响直接。

### D. 希望增加手机远程连接桌面的能力
- Issue #7519 `[Feature]: 增加手机移动端远程连接桌面的能力`
- 链接: https://github.com/agentscope-ai/QwenPaw/issues/7519

**诉求分析：**  
这是非常典型的“移动办公/随时接管”需求，说明 QwenPaw 已经被用户当作**持续运行的工作台**，而不是一次性工具。  
需求背后是：查看对话、处理审批、访问文件、恢复连接——都指向 **跨终端接续工作**。

---

## 5) Bug 与稳定性

按影响程度排序，今日报告的主要 Bug / 稳定性问题如下：

### 1. Feishu 会话静默卡死，且新消息无法重新创建 consumer
- Issue #7534  
- 链接: https://github.com/agentscope-ai/QwenPaw/issues/7534  
- 严重性：**高**
- 现状：未看到对应 fix PR（当前数据中暂无明确修复 PR）
- 影响：消息通道可收消息但不可继续处理，属于“隐性故障”，对自动化场景非常危险。

### 2. OpenCode API 缺少 `x-opencode-session` header
- Issue #7531  
- 链接: https://github.com/agentscope-ai/QwenPaw/issues/7531  
- 严重性：**高**
- 已有 fix PR：**#7536**
- PR 链接: https://github.com/agentscope-ai/QwenPaw/pull/7536  
- 影响：若不修复，未来请求可能直接报错，属于外部依赖变更引起的兼容性风险。

### 3. 启用 Langfuse 监控后工具输出为空白
- Issue #7529  
- 链接: https://github.com/agentscope-ai/QwenPaw/issues/7529  
- 严重性：**中高**
- 已有 fix PR：**#7532**
- PR 链接: https://github.com/agentscope-ai/QwenPaw/pull/7532  
- 影响：工具实际上执行成功，但观测链路失真，排障和审计能力下降。

### 4. WeCom 不支持 base64 data URL 图片发送
- Issue #7516  
- 链接: https://github.com/agentscope-ai/QwenPaw/issues/7516  
- 严重性：**中**
- 当前未见明确 fix PR
- 影响：对图片类消息工作流不友好，容易阻塞多渠道自动化。

### 5. 桌面端聊天输入框右键复制缺失
- Issue #7545  
- 链接: https://github.com/agentscope-ai/QwenPaw/issues/7545  
- 严重性：**中**
- 当前未见明确 fix PR
- 影响：桌面端与 Web 端体验不一致，属于典型的可用性回退。

### 6. 在线更新在前台进行，更新期间应用不可用
- Issue #7543  
- 链接: https://github.com/agentscope-ai/QwenPaw/issues/7543  
- 严重性：**中**
- 当前未见明确 fix PR
- 影响：阻塞使用链路，尤其对长时间在线用户体验较差。

### 7. 会话按渠道拆分的架构问题
- Issue #7541  
- 链接: https://github.com/agentscope-ai/QwenPaw/issues/7541  
- 严重性：**中**
- 当前未见明确 fix PR
- 影响：不一定是“bug”，但会显著削弱多端协同体验。

---

## 6) 功能请求与路线图信号

今天新增/活跃的功能请求，方向很集中，已经能看到明显的路线图信号：

### 1. 手机远程连接桌面端
- Issue #7519  
- 链接: https://github.com/agentscope-ai/QwenPaw/issues/7519  
**路线图信号：高**  
这是“远程接管 + 持续会话”能力，属于较强的产品级需求，若团队继续强化跨端体验，这类功能很可能进入后续版本候选。

### 2. 后台更新，避免前台阻塞
- Issue #7543  
- 链接: https://github.com/agentscope-ai/QwenPaw/issues/7543  
**路线图信号：高**  
属于明显的桌面端体验优化，且修复路径清晰，适合进入短周期迭代。

### 3. 可配置关闭默认 About 身份行
- Issue #7540  
- 链接: https://github.com/agentscope-ai/QwenPaw/issues/7540  
**路线图信号：中高**  
反映出用户对 persona 定制化的诉求增强。若项目继续强调“可塑造 agent”，这类开关会很有价值。

### 4. Matrix/Element 兼容增强
- Issue #7535  
- 链接: https://github.com/agentscope-ai/QwenPaw/issues/7535  
**路线图信号：中高**  
面向企业 IM 的认证兼容升级，若 Matrix 是重点渠道，这会是较实用的增强项。

### 5. 消息按钮能力
- Issue #7533  
- 链接: https://github.com/agentscope-ai/QwenPaw/issues/7533  
**路线图信号：中**  
这是交互能力增强，可能与“可点击选项、继续对话、定制 channel”一并推进。

### 6. 保留 persona 和对话风格的 context compaction
- Issue #7527  
- 链接: https://github.com/agentscope-ai/QwenPaw/issues/7527  
**路线图信号：高**  
这类问题非常贴近核心体验：上下文压缩后不能丢人格与关系信息。  
如果后续版本继续做 memory / context 方向，这会是关键能力之一。

### 7. 统一运行时环境管理
- PR #7538  
- 链接: https://github.com/agentscope-ai/QwenPaw/pull/7538  
**路线图信号：高**  
虽然是 PR，但其方向明显属于基础设施层重构，和环境变量、配置优先级、加密存储有关，后续很可能影响更多功能。

### 8. scroll-back message pagination
- PR #7542  
- 链接: https://github.com/agentscope-ai/QwenPaw/pull/7542  
**路线图信号：高**  
与长对话、压缩后消息回放直接相关，和用户对“历史对话可追溯”的诉求一致。

**综合判断：**  
下一阶段很可能围绕以下四条主线推进：  
- **跨端一致性**：mobile / desktop / web / channel 统一  
- **会话与上下文管理**：compaction、pagination、persona 保留  
- **稳定性与兼容性**：外部 API、IM 渠道、监控输出  
- **桌面端体验**：启动速度、更新机制、交互细节

---

## 7) 用户反馈摘要

从今日 Issues 的描述中，可以提炼出几个非常明确的真实用户痛点：

1. **“我希望在任何入口都看到同一个会话”**  
   说明用户已经把 QwenPaw 当作持续工作的个人 AI 中枢，而不是单一 channel 机器人。  
   - 相关 Issue: https://github.com/agentscope-ai/QwenPaw/issues/7541

2. **“看起来在线，实际上已经卡死”**  
   Feishu consumer 的问题暴露出用户对“静默失败”非常敏感，用户要的不只是报错，而是自动恢复与可诊断性。  
   - 相关 Issue: https://github.com/agentscope-ai/QwenPaw/issues/7534

3. **“外部服务一变更，我的工作流就断了”**  
   OpenCode header 事件说明用户希望项目对第三方 API 变化更快适配。  
   - 相关 Issue: https://github.com/agentscope-ai/QwenPaw/issues/7531

4. **“监控有数据，但关键字段是空的”**  
   Langfuse 工具输出为空会让用户难以追踪 agent 行为，说明 observability 需要“可读、完整、可审计”。  
   - 相关 Issue: https://github.com/agentscope-ai/QwenPaw/issues/7529

5. **“桌面端和 Web 端不要表现不一致”**  
   复制、更新、加载等细节差异会直接影响用户对产品成熟度的判断。  
   - 相关 Issue: https://github.com/agentscope-ai/QwenPaw/issues/7545  
   - 相关 Issue: https://github.com/agentscope-ai/QwenPaw/issues/7543

6. **“长对话不要丢人格、丢上下文”**  
   这说明用户已不满足于“记住任务”，还希望保留语气、关系和风格。  
   - 相关 Issue: https://github.com/agentscope-ai/QwenPaw/issues/7527

---

## 8) 待处理积压

从这份 24 小时数据看，**没有明显“长期沉默”的历史积压项**，因为大多数 Issue/PR 都是 9 月 3 日至 9 月 4 日新鲜产生的。  
但从维护优先级角度，建议立即关注以下高影响条目，避免它们演变为后续积压：

### 优先关注 1：Feishu 会话静默卡死
- Issue #7534
- 链接: https://github.com/agentscope-ai/QwenPaw/issues/7534  
这是最像“生产事故”的问题，应该优先 triage。

### 优先关注 2：OpenCode session header 兼容
- Issue #7531 / PR #7536
- Issue: https://github.com/agentscope-ai/QwenPaw/issues/7531  
- PR: https://github.com/agentscope-ai/QwenPaw/pull/7536  
属于有明确外部期限的兼容问题，建议尽快合入。

### 优先关注 3：Langfuse 输出空白
- Issue #7529 / PR #7532
- Issue: https://github.com/agentscope-ai/QwenPaw/issues/7529  
- PR: https://github.com/agentscope-ai/QwenPaw/pull/7532  
观测链路问题虽不一定影响主流程，但会严重影响排障与质量治理。

### 优先关注 4：跨端会话一致性/远程访问
- Issue #7541、#7519
- 链接:  
  - https://github.com/agentscope-ai/QwenPaw/issues/7541  
  - https://github.com/agentscope-ai/QwenPaw/issues/7519  
这两项代表产品方向，建议尽早纳入路线图评估。

### 优先关注 5：待审 PR 较多，且多为基础能力改动
- PR 列表: https://github.com/agentscope-ai/QwenPaw/pulls  
当前有 10 个待合并 PR，包含环境管理、浏览器启动、聊天分页、测试覆盖等，建议安排专题 review，避免基础设施改动堆积。

---

如需，我可以继续把这份日报整理成：
1. **更适合管理层阅读的精简版**，或  
2. **更适合团队周会使用的“风险/机会/建议”版**。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

以下为 **ZeroClaw（zeroclaw-labs/zeroclaw）2026-09-04 项目动态日报**。  
**结论先行：**项目今日处于**高活跃、强修复、并行推进**状态；过去24小时内有 **17 条 Issues 更新**、**24 条 PR 更新**，但**无新版本发布**，说明当前重点仍是问题收敛与能力补齐，而非对外发版。

---

## 1. 今日速览

- 过去24小时内，ZeroClaw 的项目讨论与开发都很密集：**17 个 Issues 活跃、24 个 PR 更新**，覆盖 provider、runtime、gateway、docs、CI、zerocode 等核心面。
- 当前信号显示，团队并不是在做单点小修，而是在同时推进**关键 bug 修复、架构性功能补齐、文档与 CI 收敛**，整体属于“高并发修复期”。
- 今日没有新版本发布，说明这些变更仍在合并前验证阶段，项目短期内更像是在为下一次集中发布做准备。
- 从 Issue 严重度看，仍有多个 **S1 workflow blocked** 级别问题在排队，健康度总体可控，但**阻塞型问题占比偏高**，需要持续关注。

参考：
- Issues 总览：<https://github.com/zeroclaw-labs/zeroclaw/issues>
- PR 总览：<https://github.com/zeroclaw-labs/zeroclaw/pulls>

---

## 2. 项目进展

> 过去24小时内，数据中显示 **24 条 PR 更新，1 条已合并/关闭，23 条待处理**。  
> 由于当前提供的列表仅展示了开放中的 PR，**已完成的那 1 条 PR 未在明细中列出**，无法准确点名。

从公开 PR 内容看，项目推进主要集中在以下几条主线：

### A. provider / 会话兼容性修复
- **[#10604](https://github.com/zeroclaw-labs/zeroclaw/pull/10604)**：修复 OpenCode 请求未发送 `x-opencode-session`，直接对应问题 **[#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603)**。
- **[#10605](https://github.com/zeroclaw-labs/zeroclaw/pull/10605)**：让 Anthropic extended thinking 能通过 OpenAI-compatible gateway 透传。
- **[#10602](https://github.com/zeroclaw-labs/zeroclaw/pull/10602)**：对 replay-safe 的空流进行一次恢复重试，提升 provider 稳定性。

### B. runtime / cron / channel 行为修复
- **[#10599](https://github.com/zeroclaw-labs/zeroclaw/pull/10599)**：补齐 cron 非执行记录，修复“静默失败不可见”的问题，对应 issue **[#10594](https://github.com/zeroclaw-labs/zeroclaw/issues/10594)**。
- **[#10600](https://github.com/zeroclaw-labs/zeroclaw/pull/10600)**：修复 outbound send “没发出去却报成功”的问题。
- **[#10601](https://github.com/zeroclaw-labs/zeroclaw/pull/10601)**：让 bounded delegate target 正确遵守 delegation policy。
- **[#10597](https://github.com/zeroclaw-labs/zeroclaw/pull/10597)**：记录上下文使用与 budget trims，增强 runtime 可观测性。
- **[#10596](https://github.com/zeroclaw-labs/zeroclaw/pull/10596)**：ACP transcript 持久化分页，属于偏结构性的 runtime 能力补齐。

### C. 产品与分发基础设施
- **[#10590](https://github.com/zeroclaw-labs/zeroclaw/pull/10590)**：新增 canonical release target registry，为发行流程统一口径。
- **[#10591](https://github.com/zeroclaw-labs/zeroclaw/pull/10591)**：加入 MCP launcher 与平台分发。
- **[#10592](https://github.com/zeroclaw-labs/zeroclaw/pull/10592)**：`relay claim` 支持自助注册，增强终端用户 onboarding。

### D. UI / zerocode 体验
- **[#10595](https://github.com/zeroclaw-labs/zeroclaw/pull/10595)**：修复长 thinking 输出导致的 wrapped rows 缓存问题。
- **[#10584](https://github.com/zeroclaw-labs/zeroclaw/pull/10584)**：Todo tracker 可关闭，并持久化显示状态。
- **[#10583](https://github.com/zeroclaw-labs/zeroclaw/pull/10583)**：`/api/upload` 接收任意文件并按 RPC-parity 打文档标记。

### E. 文档、CI 与依赖升级
- **[#10607](https://github.com/zeroclaw-labs/zeroclaw/pull/10607)**：优化 PR gate 浪费，并加入 Blacksmith fork-PR canary。
- **[#10598](https://github.com/zeroclaw-labs/zeroclaw/pull/10598)**、**[#10587](https://github.com/zeroclaw-labs/zeroclaw/pull/10587)**、**[#10586](https://github.com/zeroclaw-labs/zeroclaw/pull/10586)**：依赖批量升级，说明 CI/前端/基础库正在做周期性健康维护。

**整体判断：**  
今天的 PR 面呈现出明显的“**修复主导 + 基础设施加固 + 文档补齐**”节奏。若后续这些 PR 按当前方向合并，项目会在 **会话一致性、调度可见性、通道送达可靠性、发版基础设施** 四个方面同步前进。

---

## 3. 社区热点

当前最活跃的讨论点，明显集中在**阻塞型 bug** 和 **架构跟进型 tracker** 上。

### 热点 1：zerocode 启动目录被错误覆盖
- **Issue**：[#10609](https://github.com/zeroclaw-labs/zeroclaw/issues/10609)
- 状态：OPEN，评论 1，👍 0
- 诉求：本地启动的 `zerocode` 会忽略启动目录，强制切到 agent workspace，直接影响用户工作流。
- 背后含义：这是典型的“**路径语义错误**”，对本地开发和多项目切换非常敏感，属于容易被用户立刻感知的阻塞问题。

### 热点 2：OpenCode 会话头缺失，影响模型与账号安全
- **Issue**：[#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603)
- 状态：OPEN，评论 1，👍 1
- 诉求：ZeroClaw 没有发送 `x-opencode-session`，导致 OpenCode 侧会话粘连、缓存失效，并可能引发账号风控风险。
- 背后含义：这是“**协议兼容 + 账户安全**”双重诉求，属于高优先级问题，也解释了为什么对应 PR **[#10604](https://github.com/zeroclaw-labs/zeroclaw/pull/10604)** 很快出现。

### 热点 3：ACP / Memory continuity 路线的公开协调
- **Issue**：[#10570](https://github.com/zeroclaw-labs/zeroclaw/issues/10570)
- 状态：OPEN，评论 1，👍 0
- 诉求：把记忆连续性能力放到公开 tracker 中协调，避免“本地板卡片化推进”。
- 背后含义：这说明社区对 **长期上下文、会话连续性、分阶段实施** 有清晰期待，且希望路线公开透明。

### PR 热点信号
虽然当前数据未提供 PR 的评论数/反应数，但从标题和体量看，以下 PR 具备明显高关注度：
- **[#10607](https://github.com/zeroclaw-labs/zeroclaw/pull/10607)**（CI gate 优化）
- **[#10605](https://github.com/zeroclaw-labs/zeroclaw/pull/10605)**（Anthropic extended thinking 透传）
- **[#10604](https://github.com/zeroclaw-labs/zeroclaw/pull/10604)**（OpenCode session 修复）
- **[#10590](https://github.com/zeroclaw-labs/zeroclaw/pull/10590)**（release target registry）

---

## 4. Bug 与稳定性

按严重程度排序，当前最值得关注的 bug 如下：

### S1 - workflow blocked

1. **[#10609](https://github.com/zeroclaw-labs/zeroclaw/issues/10609)**  
   `zerocode` 忽略启动目录，强制使用 agent workspace 作为 cwd。  
   - 影响：本地工作流可能直接被打断。
   - fix PR：**未看到明确对应 PR**

2. **[#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603)**  
   OpenCode provider 未发送 `x-opencode-session`。  
   - 影响：会话缓存、Go 模型行为、账号风控风险。
   - fix PR：**[#10604](https://github.com/zeroclaw-labs/zeroclaw/pull/10604)**

3. **[#10593](https://github.com/zeroclaw-labs/zeroclaw/issues/10593)**  
   `backup.schedule_cron` 在无人认领 `__builtin_backup` 时悄然不调度。  
   - 影响：备份功能名义开启但实际无效，且几乎没有告警。
   - fix PR：**未看到明确对应 PR**

### S2 - degraded behavior

4. **[#10594](https://github.com/zeroclaw-labs/zeroclaw/issues/10594)**  
   cron 在“任务未执行”时不记录历史，导致静默失败不可见。  
   - 影响：运维排障困难、状态不可审计。
   - fix PR：**[#10599](https://github.com/zeroclaw-labs/zeroclaw/pull/10599)**

### S3 - minor issue

5. **[#10585](https://github.com/zeroclaw-labs/zeroclaw/issues/10585)**  
   新 log sink 回归导致 migration tests 在默认并行 runner 下竞争。  
   - 影响：主要是 CI 稳定性和测试可重复性。
   - fix PR：**未看到明确对应 PR**

### 补充：非 bug 但值得视为稳定性相关
- **[#10606](https://github.com/zeroclaw-labs/zeroclaw/issues/10606)**：`/health` 未鉴别化输出可能泄露组件错误信息，偏安全/信息暴露问题。
- **[#10600](https://github.com/zeroclaw-labs/zeroclaw/pull/10600)**、**[#10601](https://github.com/zeroclaw-labs/zeroclaw/pull/10601)**、**[#10602](https://github.com/zeroclaw-labs/zeroclaw/pull/10602)** 都属于“防静默失败、提升恢复能力”的稳定性修复方向。

**稳定性判断：**  
ZeroClaw 当前不是“崩溃型失稳”，而是更典型的**协议不一致、状态不透明、静默失败**问题偏多。好消息是，已有多条 PR 正在补这些短板。

---

## 5. 功能请求与路线图信号

当前新功能请求和路线图信号，主要集中在 **gateway / runtime / docs / multimodal / channel** 五个方向。

### 可能优先进入下一版本的方向

1. **OpenAI-compatible / Anthropic 能力透传**
   - 相关 PR：**[#10605](https://github.com/zeroclaw-labs/zeroclaw/pull/10605)**
   - 价值：这类能力直接提升模型路由兼容性，通常更容易进入近期版本。

2. **OpenCode / provider 会话一致性修复**
   - 相关 Issue/PR：**[#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603)** → **[#10604](https://github.com/zeroclaw-labs/zeroclaw/pull/10604)**
   - 价值：这是明显的高优先级兼容修复，且有安全诉求，合入概率高。

3. **cron / runtime 可观测性增强**
   - 相关 PR：**[#10599](https://github.com/zeroclaw-labs/zeroclaw/pull/10599)**、**[#10597](https://github.com/zeroclaw-labs/zeroclaw/pull/10597)**
   - 价值：提升运维体验，属于“稳定性底座”型能力。

4. **多模态默认阈值上调**
   - 相关 Issue/PR：**[#10588](https://github.com/zeroclaw-labs/zeroclaw/issues/10588)**、**[#10589](https://github.com/zeroclaw-labs/zeroclaw/pull/10589)**
   - 价值：如果社区对图像输入的诉求持续上升，这类默认值调整会非常实用。

5. **文档与内部链接治理**
   - 相关 Issue：**[#10579](https://github.com/zeroclaw-labs/zeroclaw/issues/10579)**、**[#10580](https://github.com/zeroclaw-labs/zeroclaw/issues/10580)**
   - 价值：文档修复未必“炫目”，但通常很容易合并，且能显著减少新用户摩擦。

### 明确的路线图信号：已接受但待实现的 follow-up
这些 issue 带有 `status:accepted`，说明路线方向已被认可，后续进入实现概率较高：

- **[#10577](https://github.com/zeroclaw-labs/zeroclaw/issues/10577)**：opt-in single-tool provider rounds
- **[#10576](https://github.com/zeroclaw-labs/zeroclaw/issues/10576)**：gateway verbatim channel send without an agent turn
- **[#10575](https://github.com/zeroclaw-labs/zeroclaw/issues/10575)**：web_dist_dir bundle/daemon compatibility manifest
- **[#10574](https://github.com/zeroclaw-labs/zeroclaw/issues/10574)**：observe-only WASM observer lifecycle callbacks

**路线图判断：**  
这些“accepted follow-up”很像下一阶段的正式路线候选，说明 ZeroClaw 的演进正在从“能用”走向“**协议完整、边界清晰、架构规范化**”。

---

## 6. 用户反馈摘要

从 Issue 文案和少量评论里，可以归纳出几类非常真实的用户痛点：

### 1) “我启动了，但它没按我预期的工作目录跑”
- 代表问题：**[#10609](https://github.com/zeroclaw-labs/zeroclaw/issues/10609)**
- 用户场景：本地开发、多项目切换、临时目录执行。
- 反馈本质：用户对“当前目录语义”非常敏感，路径被强制重定向会直接破坏心智模型。

### 2) “协议字段没带上，导致后端行为不稳定，甚至有风险”
- 代表问题：**[#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603)**
- 用户场景：OpenCode / Go 模型 / relay 兼容链路。
- 反馈本质：用户并不只关心“请求发出去了”，而是关心**会话能否正确粘连**、**缓存是否生效**、**账号是否会被误判异常**。

### 3) “系统没报错，但实际上没执行”
- 代表问题：**[#10593](https://github.com/zeroclaw-labs/zeroclaw/issues/10593)**、**[#10594](https://github.com/zeroclaw-labs/zeroclaw/issues/10594)**
- 用户场景：备份、cron、守护进程。
- 反馈本质：用户更怕“**静默失败**”而不是显式报错，因为这会让他们误以为系统正常运行。

### 4) “文档缺页、链接断裂，增加上手成本”
- 代表问题：**[#10579](https://github.com/zeroclaw-labs/zeroclaw/issues/10579)**、**[#10580](https://github.com/zeroclaw-labs/zeroclaw/issues/10580)**
- 用户场景：新用户、集成者、排查配置的人。
- 反馈本质：文档链路完整性正在被当作产品质量的一部分，而不仅仅是附属物。

### 5) “我需要更强的可见性和更少的手工操作”
- 代表问题：**[#10597](https://github.com/zeroclaw-labs/zeroclaw/pull/10597)**、**[#10584](https://github.com/zeroclaw-labs/zeroclaw/pull/10584)**、**[#10592](https://github.com/zeroclaw-labs/zeroclaw/pull/10592)**
- 用户场景：预算跟踪、Todo 面板、relay 自助 enrollment。
- 反馈本质：用户希望 ZeroClaw 更“自解释”、更少依赖人工排障和手工配置。

---

## 7. 待处理积压

由于当前数据只覆盖最近24小时，严格意义上的“长期未响应”样本不足；不过从**重要性 + 当前状态 + 缺少明确处理路径**来看，以下事项值得维护者优先关注：

### 高优先但尚未见明确 fix PR
- **[#10609](https://github.com/zeroclaw-labs/zeroclaw/issues/10609)**：启动目录被覆盖，直接阻断工作流。
- **[#10593](https://github.com/zeroclaw-labs/zeroclaw/issues/10593)**：备份调度无声失败，属于高风险数据保护问题。
- **[#10585](https://github.com/zeroclaw-labs/zeroclaw/issues/10585)**：CI/测试回归，可能放大后续合并风险。
- **[#10606](https://github.com/zeroclaw-labs/zeroclaw/issues/10606)**：health 响应泄露组件错误信息，偏安全治理。

### 已接受但仍待实现的路线型积压
- **[#10577](https://github.com/zeroclaw-labs/zeroclaw/issues/10577)**
- **[#10576](https://github.com/zeroclaw-labs/zeroclaw/issues/10576)**
- **[#10575](https://github.com/zeroclaw-labs/zeroclaw/issues/10575)**
- **[#10574](https://github.com/zeroclaw-labs/zeroclaw/issues/10574)**

这些不是“无人认领的小问题”，而是**已经确认值得做、但需要明确实现推进**的路线资产，适合进入更正式的里程碑管理。

---

如果你愿意，我可以进一步把这份日报整理成：
1. **适合 Slack/飞书群发的精简版**，或  
2. **适合管理层阅读的一页式摘要版**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*