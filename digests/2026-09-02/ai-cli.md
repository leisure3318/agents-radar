# AI CLI 工具社区动态日报 2026-09-02

> 生成时间: 2026-09-02 03:27 UTC | 覆盖工具: 9 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Kimi Code CLI](https://github.com/MoonshotAI/kimi-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/badlogic/pi-mono)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [DeepSeek TUI](https://github.com/Hmbown/DeepSeek-TUI)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

以下为基于你提供的 2026-09-02 社区动态整理的**横向对比分析报告**，面向技术决策者与开发者。

---

# AI CLI 工具生态横向对比报告（2026-09-02）

## 1) 生态全景
整体来看，AI CLI 工具正在从“命令行聊天/补全工具”快速演进为**状态化、可调度、可集成的 agent 工作台**。  
社区讨论的中心已不再只是单次对话质量，而是扩展到**会话连续性、后台任务、跨端同步、模型路由、权限控制、MCP/插件生态、以及桌面/TUI 体验**。  
从发版节奏看，多数项目都在以小步快跑方式持续修复回归，说明该赛道仍处于**高迭代、强反馈、生产化加速**阶段。  
同时，多个项目都在暴露相似痛点，表明行业正在进入“**多模型 + 多端 + 多任务 + 强约束**”的复杂工作流阶段。

---

## 2) 各工具活跃度对比

| 工具 | 今日 Issues 数 | 今日 PR 数 | Release 情况 |
|---|---:|---:|---|
| Claude Code | 10 | 0 | 2 个 release（v2.1.257 / v2.1.258） |
| OpenAI Codex | 10 | 10 | 5 个 release（1 个 stable + 4 个 alpha） |
| Gemini CLI | 5 | 9 | 3 个 release（nightly / preview / 0.58.0） |
| GitHub Copilot CLI | 10 | 0 | 1 个 release（v1.0.83-1） |
| Kimi Code CLI | 0 | 1 | 1 个 release（1.50.0） |
| OpenCode | 12 | 10 | 1 个 release（v1.18.26） |
| Pi | 10 | 9 | 无新 release |
| Qwen Code | 10 | 10 | 1 个 release（cua-driver-rs-v0.20.3） |
| DeepSeek TUI | 1 | 10 | 无新 release |

**直观观察：**
- **高活跃度**：OpenCode、Qwen Code、OpenAI Codex、Pi，表现为 Issues 与 PR 同时高频更新。
- **强发版节奏**：Codex、Gemini CLI、Claude Code，呈现连续发布与快速修复特征。
- **低反馈量但有发版**：Kimi Code CLI，社区噪音较低，偏维护型。
- **高 PR、低 Issue**：DeepSeek TUI，更像作者主导型快速重构项目。

---

## 3) 共同关注的功能方向

### 1. 会话连续性、恢复与跨端同步
多个工具都在强化“**任务不中断、状态可恢复**”：
- **Claude Code**：跨会话消息展示、scheduled tasks、远程会话空消息问题
- **Codex**：线程状态、跨设备同步、历史记录丢失、scheduled tasks 渲染失败
- **Qwen Code**：turn 恢复、session navigation、daemon 续跑
- **OpenCode**：session / root-session progress、tool call 观测
- **DeepSeek TUI**：runtime goal 持久化、host 接管续跑

这说明行业已经从“单轮问答”进入“**长任务工作流**”阶段。

### 2. 模型路由、兼容性与一致性
几乎所有工具都在处理“**模型能不能用、会不会被误切、参数是否真的生效**”：
- **Claude Code**：Fable 5.1 可用性、意外模型切换、默认模型
- **Codex**：容量提示、模型切换、custom endpoint model ID
- **Gemini CLI**：模型选择器里缺少 Flash 新模型
- **OpenCode**：Claude / Bedrock / Ollama / Alibaba / OpenAI-compatible 路由问题
- **Pi**：多 provider 兼容、thinking overrides、OpenRouter 成本与路由
- **Qwen Code**：OpenAI-compatible proxy、tool call 格式、图片输入兼容

核心诉求是：**模型选择要可预测，路由要可解释，降级要可见**。

### 3. 权限、安全与策略误伤控制
多个项目都在处理“**安全策略太硬、误拦正常工作**”：
- **Claude Code**：安全分类器误判合法安全工作
- **Codex**：Guardian / sandbox / permissions / network requirements
- **Gemini CLI**：受限环境认证崩溃、Git 配置兼容、安全密钥清理
- **Copilot CLI**：OAuth、sandbox.disabled、permissions-config
- **Pi**：扩展与自动化链路的信任状态、provider 失败定位
- **Qwen Code**：daemon / ACP 权限请求、release 质量门禁

趋势很明确：社区要的是**默认安全，但不要过度阻断**。

### 4. TUI / Desktop / 多平台体验
CLI 工具正被当成“**桌面生产力工具**”来用，而不是纯终端脚本：
- **Claude Code**：Desktop banner、SSH 登录、Windows BSOD
- **Codex**：Windows 交互、macOS 终端打不开、宠物拖拽错位
- **Gemini CLI**：macOS 启动卡认证、Git 仓库启动崩溃
- **Copilot CLI**：PowerShell、Windows sandbox、MCP 配置
- **OpenCode**：Windows desktop 崩溃、Web UI、滚动条、路径问题
- **DeepSeek TUI**：fullscreen / inline / settings / diff cards / tool output

这说明 UI 已经成为 CLI 工具竞争力的重要组成部分。

### 5. 成本、额度与可观测性
用户越来越关心“**用了多少、为什么失败、状态在哪里**”：
- **Claude Code**：session cost tracking
- **Codex**：额度感知规划、提前预警
- **Pi**：actual cost、BYOK flag、serving provider
- **OpenCode / Qwen Code**：tool timing、progress、job outcomes、replay/reasoning 观测

这类需求表明：AI CLI 正在从“黑盒体验”转向“**可审计、可预算、可运维**”。

---

## 4) 差异化定位分析

### Claude Code
- **功能侧重**：模型接入、跨会话协作、后台任务与安全策略治理。
- **目标用户**：重度代码代理用户、远程开发场景、对生产稳定性敏感的团队。
- **技术路线**：强 agent 化，强调 session / routine / desktop 体验的完整链路。

### OpenAI Codex
- **功能侧重**：线程状态、跨端同步、异步用户输入、权限与企业约束。
- **目标用户**：复杂多任务开发者、企业内部 agent 使用者。
- **技术路线**：偏“状态机 + 工作流基础设施”，强调可恢复和可编排。

### Gemini CLI
- **功能侧重**：认证启动、Git 工作流兼容、skill manager、模型可用性同步。
- **目标用户**：使用受限环境和本地 Git 工作流的开发者。
- **技术路线**：偏稳定性与环境兼容修正，产品更像“可靠 CLI 工具”。

### GitHub Copilot CLI
- **功能侧重**：MCP / OAuth、企业登录、权限模型、Windows/PowerShell 兼容。
- **目标用户**：企业开发者、受控终端环境用户、GitHub 生态内用户。
- **技术路线**：强调企业可控、集成规范与工作流对接。

### Kimi Code CLI
- **功能侧重**：版本同步、协议清理、依赖维护。
- **目标用户**：偏稳定使用者、已有生态用户。
- **技术路线**：当前更像维护收敛期，社区讨论量低，发版较克制。

### OpenCode
- **功能侧重**：多 provider 兼容、MCP/插件生态、桌面/Web UI、Windows 稳定性。
- **目标用户**：多模型集成用户、桌面工作台用户、对插件/可观测性敏感的开发者。
- **技术路线**：偏“开放集成平台”，同时兼顾 UI 与生态。

### Pi
- **功能侧重**：多 provider 编排、模型 override、扩展 API、计费透明。
- **目标用户**：多模型运营者、自动化/RPC 用户、需要统一入口的高级开发者。
- **技术路线**：强“中间层”定位，强调 provider 抽象与会话/工具层编排。

### Qwen Code
- **功能侧重**：session 导航、Web Shell/TUI、daemon/channel/ACP、CI/release 稳定性。
- **目标用户**：长会话开发者、Web/TUI 混合工作流用户。
- **技术路线**：明显在向“完整工作台”演进，尤其重视会话管理与发布工程。

### DeepSeek TUI
- **功能侧重**：TUI 交互、runtime 持久化、模型 fleet、设置系统、可视化细节。
- **目标用户**：终端重度用户、偏本地工作台体验的开发者。
- **技术路线**：聚焦 TUI 体验和运行时可持续性，项目风格偏作者驱动的高频重构。

---

## 5) 社区热度与成熟度

### 社区热度较高、反馈面广
- **OpenCode、Qwen Code、OpenAI Codex、Pi**
- 特征：Issues 和 PR 同时高频，说明社区既在提需求，也在推动实现。
- 其中 **OpenCode / Qwen Code** 更像“功能扩张期”，**Codex** 更像“基础能力打底 + 企业化适配期”。

### 发版密集、稳定性修复明显
- **Claude Code、Gemini CLI、Codex**
- 特征：连续 release、回归修复、平台兼容和策略调整较多。
- 这类项目通常处于“**快速迭代但仍在磨稳定性**”阶段。

### 社区反馈较少、偏维护型
- **Kimi Code CLI**
- 特征：今天几乎没有新增 Issue，更多是 release 和依赖同步。
- 从数据上看，社区噪音较低，但也意味着外部反馈信号较少。

### 高频重构、产品形态仍在收敛
- **DeepSeek TUI**
- 特征：PR 数很高，围绕布局、状态、runtime、设置系统持续重构。
- 更像是“**单点体验深挖期**”，而不是大规模社区驱动期。

---

## 6) 值得关注的趋势信号

### 1. AI CLI 正在变成“状态化 agent 平台”
过去 CLI 主要是交互入口，现在社区更关注：
- 任务能否后台继续
- 会话能否恢复
- 线程/turn 是否可导航
- 外部集成是否能看到状态

**开发者参考价值：**  
需要把“会话、任务、权限、模型、成本”都当成一等公民，而不是附属日志。

### 2. 多模型、多 provider 兼容已成为主战场
Claude、Codex、OpenCode、Pi、Qwen、Gemini 都在处理类似问题：
- 模型路由
- capability 声明
- tool call 格式
- provider-specific policy
- 降级和切换

**开发者参考价值：**  
未来竞争点不只是“模型更强”，而是“**异构模型环境里是否稳定可控**”。

### 3. 安全策略正在从“强拦截”转向“精细授权”
误报、误拦、sandbox 失效、权限粒度不足在各项目都很突出。  
这意味着行业正在从“先保守”转向“**默认安全 + 可解释放行**”。

**开发者参考价值：**  
权限系统需要支持路径级、会话级、任务级的更细粒度控制。

### 4. CLI 的 UI 层正在显著增厚
滚动条、状态卡、diff 高亮、fullscreen/inline、输出样式、desktop 面板等问题密集出现。  
说明用户已经把 CLI 当作**长期主工作台**使用。

**开发者参考价值：**  
纯命令输出已经不够，良好的 TUI/desktop 体验会直接影响留存。

### 5. 成本可见性正在成为刚需
费用、额度、模型容量、执行阶段成本，越来越多地进入社区讨论。  

**开发者参考价值：**  
要尽早提供预算预警、成本归因、任务中断前提示，否则长任务用户会快速流失。

### 6. 发布工程与 CI 稳定性是产品可信度的一部分
Qwen、Codex、Gemini、Claude 都在处理 release/CI/回归问题。  
说明“能不能稳定发版”本身就是产品能力。

**开发者参考价值：**  
要把 CI、验证环境、发布门禁视为产品的一部分，而不是纯工程内务。

---

如果你愿意，我可以进一步把这份报告整理成两种版本之一：
1. **一页纸高管摘要版**，或  
2. **适合内部评审的对比矩阵版（按能力维度拆表）**。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下为基于你提供的数据整理的 **Claude Code Skills 社区热点报告**。  
**说明**：当前 PR 样本里评论数字段未完整给出，因此“热门 PR 排行”采用了 **问题影响面 + 需求普适性 + 与社区痛点的关联度** 的综合排序。

---

## 1) 热门 Skills 排行（5~8 个）

### 1. [#1298](https://github.com/anthropics/skills/pull/1298) `fix(skill-creator): run_eval.py always reports 0% recall`
- **功能**：修复 `skill-creator` 的评测链路，让 `run_eval.py` 正确统计 recall，并修正 Windows 流读取、触发检测、并行 worker 等问题。
- **社区热点**：这是“技能优化工具链”的根问题，直接影响后续 Skill 迭代质量；属于基础设施级修复。
- **状态**：OPEN

### 2. [#514](https://github.com/anthropics/skills/pull/514) `Add document-typography skill`
- **功能**：为生成文档增加排版质量控制，重点解决孤行、寡行、标题悬挂、编号对齐等问题。
- **社区热点**：文档输出质量是高频需求，且痛点非常具体，容易引发广泛共鸣。
- **状态**：OPEN

### 3. [#723](https://github.com/anthropics/skills/pull/723) `feat: add testing-patterns skill`
- **功能**：覆盖测试金字塔、单测、React 测试、集成测试等完整测试实践。
- **社区热点**：测试生成/测试规范化是开发类 Skills 中最常见、最实用的方向之一。
- **状态**：OPEN

### 4. [#568](https://github.com/anthropics/skills/pull/568) `add ServiceNow platform skill`
- **功能**：面向 ServiceNow 平台的广域技能，覆盖 ITSM、ITOM、ITAM/SAM、FSM、SPM、CSM、IntegrationHub 等。
- **社区热点**：典型企业平台型 Skill，适合大型组织的真实工作流，落地价值高。
- **状态**：OPEN

### 5. [#1367](https://github.com/anthropics/skills/pull/1367) `feat(skills): add self-audit`
- **功能**：在交付前做机械化文件校验 + 四维推理审计，主打输出质量门禁。
- **社区热点**：反映社区对“结果可靠性/自检能力”的强需求，属于高复用的通用能力。
- **状态**：OPEN

### 6. [#525](https://github.com/anthropics/skills/pull/525) `Add pyxel skill for retro game development`
- **功能**：面向复古像素游戏开发，提供迭代式开发流程。
- **社区热点**：创作型/游戏类 Skills 持续有需求，属于高可见度的应用场景。
- **状态**：OPEN

### 7. [#1628](https://github.com/anthropics/skills/pull/1628) `Add Hivemind: Zero-Cost Multi-Agent Orchestration Skill`
- **功能**：通过 headless worker 做机械任务分发，Claude Code 负责规划、审查和合并。
- **社区热点**：多代理编排是近期很强的社区趋势，关注点在“降本、分工、上下文节省”。
- **状态**：OPEN

### 8. [#1607](https://github.com/anthropics/skills/pull/1607) `Update claude-api skill: mark four retired model IDs as retired`
- **功能**：修正 Claude API Skill 中的模型状态标记，避免使用过时模型信息。
- **社区热点**：虽然偏维护，但属于高风险信息准确性问题，关系到 API 使用正确性。
- **状态**：OPEN

---

## 2) 社区需求趋势

### A. **可靠性 / 评测 / 自检工具链**
社区明显在追求“Skill 本身更可信”：
- [#556](https://github.com/anthropics/skills/issues/556) `run_eval.py: claude -p never triggers skills/commands (0% trigger rate across all queries)`
- [#1390](https://github.com/anthropics/skills/issues/1390) `mcp-builder: evaluation.py scores 0/N ...`
- [#1487](https://github.com/anthropics/skills/issues/1487) `claude-api skill eagerly injects ~156k tokens`
- 代表性方向：**评测修复、触发检测、上下文预算控制、结果自检**

### B. **文档生成质量与格式修复**
文档类需求非常集中，尤其是 Office / PDF / ODT 生态：
- [#12](https://github.com/anthropics/skills/issues/12) `Add guidance to avoid whitespace reformatting in docx/ooxml skill`
- [#189](https://github.com/anthropics/skills/issues/189) `document-skills and example-skills plugins install identical content...`
- 代表性方向：**docx/ooxml 细节正确性、模板填充、排版一致性、格式兼容**

### C. **企业平台与行业垂直技能**
企业用户希望 Skills 直接覆盖真实业务系统：
- [#228](https://github.com/anthropics/skills/issues/228) `Enable org-wide skill sharing in Claude.ai`
- [#29](https://github.com/anthropics/skills/issues/29) `Usage with bedrock`
- [#568](https://github.com/anthropics/skills/pull/568) `ServiceNow platform skill`
- 代表性方向：**组织共享、Bedrock 集成、ITSM/ITOM/ITAM 等企业场景**

### D. **安全、信任边界与治理**
社区对 Skills 的“权限边界”非常敏感：
- [#492](https://github.com/anthropics/skills/issues/492) `Security: Community skills distributed under anthropic/ namespace...`
- [#412](https://github.com/anthropics/skills/issues/412) `agent-governance`
- 代表性方向：**命名空间可信度、权限隔离、审计轨迹、治理策略**

### E. **开发工作流自动化：测试、前端、代码质量**
高频工程类需求持续出现：
- [#723](https://github.com/anthropics/skills/pull/723) `testing-patterns`
- [#210](https://github.com/anthropics/skills/pull/210) `frontend-design clarity and actionability`
- [#202](https://github.com/anthropics/skills/issues/202) `skill-creator should be updated to best practice`
- 代表性方向：**测试生成、前端实现规范、代码审查、自省式质量门禁**

---

## 3) 高潜力待合并 Skills

> 结合问题热度、修复价值和落地紧迫性，下面这些 PR 最有可能近期进入合并节奏。

- [#1298](https://github.com/anthropics/skills/pull/1298) `run_eval.py always reports 0% recall`  
  **原因**：直接修复核心评测链路，影响整个 `skill-creator` 生态。

- [#1099](https://github.com/anthropics/skills/pull/1099) `skill-creator: fix run_eval.py crash on Windows when reading from subprocess pipe`  
  **原因**：Windows 兼容性是典型“低成本高收益”修复。

- [#1050](https://github.com/anthropics/skills/pull/1050) `skill-creator: fix Windows subprocess + encoding bugs`  
  **原因**：同样属于跨平台稳定性修复，且改动小、收益明确。

- [#1602](https://github.com/anthropics/skills/pull/1602) `fix: resolve evaluation serialization, benchmark metrics, encoding, and script stability issues`  
  **原因**：覆盖多个评测/稳定性 bug，属于系统性补洞。

- [#1607](https://github.com/anthropics/skills/pull/1607) `Update claude-api skill: mark four retired model IDs as retired`  
  **原因**：信息维护型修复，风险低、合并门槛通常较低。

- [#538](https://github.com/anthropics/skills/pull/538) `fix(pdf): correct case-sensitive file references in SKILL.md`  
  **原因**：典型文件引用错误，影响真实使用，容易快速合并。

- [#539](https://github.com/anthropics/skills/pull/539) `fix(skill-creator): warn on unquoted description with YAML special characters`  
  **原因**：提升前置校验，减少隐性配置错误。

- [#541](https://github.com/anthropics/skills/pull/541) `fix(docx): prevent tracked change w:id collision with existing bookmarks`  
  **原因**：文档损坏类 bug 优先级高，且修复路径明确。

---

## 4) Skills 生态洞察

**一句话总结**：  
当前社区最集中的诉求是——**让 Skills 更可靠、更可共享、更能覆盖真实工作流，同时优先解决文档、测试、企业平台和评测链路中的高频质量问题。**

如果你愿意，我还可以把这份报告进一步整理成：
- **“管理层摘要版”**
- **“适合发到 GitHub Discussion/Slack 的短报告版”**
- **“按主题分组的表格版（Markdown）”**

---

# Claude Code 社区动态日报（2026-09-02）

## 1) 今日速览
今天 Claude Code 的更新重点仍然围绕**稳定性修复、模型接入与跨会话/调度能力**展开：最新发布修复了 macOS 12 启动回归和远程/定时会话的空消息问题，同时引入了 Fable 5.1 与时间格式配置。  
社区 Issues 则明显聚焦在**模型误判/降级、会话同步、桌面端体验、Windows/macOS 平台兼容性**等高频痛点，说明生产可用性与工作流连续性仍是核心关注点。

---

## 2) 版本发布

### [v2.1.258](https://github.com/anthropics/claude-code/releases/tag/v2.1.258)
- 修复 Claude Code 在 **macOS 12（Monterey）无法启动**的问题，这是 2.1.255 引入的回归。
- 修复 **远程会话/定时会话**在重新发送权限批准后出现 `"user messages must have non-empty content"` 的失败问题。

### [v2.1.257](https://github.com/anthropics/claude-code/releases/tag/v2.1.257)
- 新增 **Claude Fable 5.1**（`claude-fable-5-1`），并设为默认 Fable 模型。
- Fable 5.1 参数：**1M context、$10/$50 per Mtok、$0.25/Mtok cache reads**。
- 新增 **时间格式**（`timeFormat`）与 **时区**（`timeZone`）设置，支持 12 小时、24 小时、UTC 及 strftime 模式。

---

## 3) 社区热点 Issues

> 说明：以下优先选择过去 24 小时内更新、影响面较大或讨论信号较强的 Issue。

### 1. [#91345](https://github.com/anthropics/claude-code/issues/91345) — Fable 5.1 requires unstable release of Claude Code
- **为什么重要**：新模型 Fable 5.1 刚上线就出现版本门槛问题，直接影响模型可用性与升级路径。
- **社区反应**：已有 **4 条评论**，属于当天较活跃条目，说明用户在接入新模型时遇到了明确阻碍。

### 2. [#91332](https://github.com/anthropics/claude-code/issues/91332) — Desktop app shows an unlabeled banner
- **为什么重要**：桌面端 UI 文案/提示异常会影响日常使用体验，属于“看似小、但高频”的可用性问题。
- **社区反应**：**3 条评论**，说明问题可见度较高，且用户较快复现到了。

### 3. [#91371](https://github.com/anthropics/claude-code/issues/91371) — Local scheduled tasks silently hang mid-run
- **为什么重要**：定时任务中途挂起会阻断后续调度，属于自动化/后台任务场景的高优先级稳定性问题。
- **社区反应**：当前无评论，但标题与标签指向 **routines** 场景，影响生产自动化。

### 4. [#91362](https://github.com/anthropics/claude-code/issues/91362) — Cross-session peer messages collapse to one-line preview
- **为什么重要**：跨会话消息展示退化会直接影响协作上下文，容易导致错误决策。
- **社区反应**：标记为 **regression**，并明确指出 2.1.247 之后出现，属于回归类问题，关注度高。

### 5. [#91361](https://github.com/anthropics/claude-code/issues/91361) — Safety classifier blocks legitimate defensive security work
- **为什么重要**：安全分类器误拦截会影响合法安全研发、渗透测试和防御性分析工作流。
- **社区反应**：属于 **enhancement** 口径但本质是策略/模型行为投诉，反映出社区对“误伤率”的敏感度在上升。

### 6. [#91378](https://github.com/anthropics/claude-code/issues/91378) — Legitimate code incorrectly flagged as malicious or unsafe
- **为什么重要**：这类误判直接影响正常开发任务，尤其在安全、网络、权限相关代码中容易造成中断。
- **社区反应**：当前无评论，但属于典型的高影响模型安全误报。

### 7. [#91375](https://github.com/anthropics/claude-code/issues/91375) — Unexpected model switch to Opus 4.8 during testing
- **为什么重要**：模型自动切换会影响一致性、成本和测试结果可重复性。
- **社区反应**：当前无评论，但这是典型的“模型选择/路由”稳定性问题。

### 8. [#91379](https://github.com/anthropics/claude-code/issues/91379) — Session cost tracking unclear when code review stalled mid-task
- **为什么重要**：成本可观测性直接关系到用户是否愿意持续使用，尤其在长会话和代码审查场景中。
- **社区反应**：无评论，但提到 **$85** 的会话成本，说明痛点很强烈。

### 9. [#91366](https://github.com/anthropics/claude-code/issues/91366) — Claude Desktop (Windows/MSIX) causes recurring kernel BSODs
- **为什么重要**：涉及系统级蓝屏，属于最严重的桌面端稳定性风险之一。
- **社区反应**：虽然当前无评论，但该 Issue 以多月证据和相关历史 Issue 佐证，可信度与严重性都很高。

### 10. [#91358](https://github.com/anthropics/claude-code/issues/91358) — Can not /login via SSH, URL not displayed/copy-able
- **为什么重要**：SSH 登录链路是远程开发与服务器工作流的基础能力，登录失败会直接卡住使用。
- **社区反应**：已有 **1 条评论**，且被标记为 duplicate，说明问题可能并非孤例。

---

## 4) 重要 PR 进展

- **过去 24 小时内无 PR 更新**。  
  GitHub 数据显示 PR 数量为 **0**，因此本日报无法提炼具体 PR 进展。  
  链接：<https://github.com/anthropics/claude-code/pulls>

---

## 5) 功能需求趋势

从当天 Issues 可以明显看出，社区需求集中在以下方向：

1. **模型支持与模型一致性**
   - 新模型 Fable 5.1 接入后，用户关注可用版本、默认模型切换、意外降级/切换等问题。
   - 代表 Issue：[#91345](https://github.com/anthropics/claude-code/issues/91345)、[#91375](https://github.com/anthropics/claude-code/issues/91375)

2. **安全分类器误判治理**
   - 大量反馈集中在“合法代码被判危险/被降级/被拦截”，说明安全策略正在影响真实开发效率。
   - 代表 Issue：[#91361](https://github.com/anthropics/claude-code/issues/91361)、[#91378](https://github.com/anthropics/claude-code/issues/91380)、[#91364](https://github.com/anthropics/claude-code/issues/91364)

3. **跨会话协作与消息同步**
   - 用户对跨会话消息的完整展示、审批状态、可追踪性要求越来越高。
   - 代表 Issue：[#91362](https://github.com/anthropics/claude-code/issues/91362)、[#91372](https://github.com/anthropics/claude-code/issues/91372)

4. **任务调度/后台执行可靠性**
   - scheduled tasks、background agents、远程会话等自动化能力是增长重点，但也更容易暴露竞态和挂起问题。
   - 代表 Issue：[#91371](https://github.com/anthropics/claude-code/issues/91371)、[#91353](https://github.com/anthropics/claude-code/issues/91353)

5. **桌面端与多平台兼容性**
   - macOS、Windows、MSIX、SSH、Local Network、VS Code/Desktop 同步等问题密集出现。
   - 代表 Issue：[#91332](https://github.com/anthropics/claude-code/issues/91332)、[#91373](https://github.com/anthropics/claude-code/issues/91373)、[#91366](https://github.com/anthropics/claude-code/issues/91366)、[#91358](https://github.com/anthropics/claude-code/issues/91358)

6. **成本可视化与可控性**
   - 用户开始明确要求更好的 session cost tracking，以及减少更新打扰。
   - 代表 Issue：[#91379](https://github.com/anthropics/claude-code/issues/91379)、[#91356](https://github.com/anthropics/claude-code/issues/91356)

---

## 6) 开发者关注点

综合今天的反馈，开发者最需要关注的痛点是：

- **回归稳定性**：最新版本已经出现 macOS 启动、远程会话空消息等回归，说明发布后验证链路仍需加强。  
  参考：[#91345](https://github.com/anthropics/claude-code/issues/91345)、[#91373](https://github.com/anthropics/claude-code/issues/91373)

- **模型路由与安全策略的“误伤率”**：合法开发、审计、防御性安全工作被误判，直接影响生产效率。  
  参考：[#91361](https://github.com/anthropics/claude-code/issues/91361)、[#91378](https://github.com/anthropics/claude-code/issues/91378)

- **跨会话/后台任务的可解释性**：消息是否送达、审批是否挂起、任务为何卡住，用户希望有清晰可见的状态反馈。  
  参考：[#91372](https://github.com/anthropics/claude-code/issues/91372)、[#91371](https://github.com/anthropics/claude-code/issues/91371)

- **桌面端交互细节与平台一致性**：包括 banner、zoom、登录链接、权限提示、MSIX 安装恢复等，都是影响留存的细节。  
  参考：[#91332](https://github.com/anthropics/claude-code/issues/91332)、[#91377](https://github.com/anthropics/claude-code/issues/91377)、[#91357](https://github.com/anthropics/claude-code/issues/91357)

- **成本和行为透明度**：用户希望知道模型为什么切换、任务花了多少钱、更新是否可延后或静默。  
  参考：[#91379](https://github.com/anthropics/claude-code/issues/91379)、[#91356](https://github.com/anthropics/claude-code/issues/91356)、[#91375](https://github.com/anthropics/claude-code/issues/91375)

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发飞书/企业微信的精简版**，或  
2. **带“风险等级/优先级”的管理层版**。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

以下为 **2026-09-02 OpenAI Codex 社区动态日报**（基于 `github.com/openai/codex` 过去 24 小时数据）。

---

## 1) 今日速览
今天 Codex 社区的讨论重心非常集中：**会话/线程状态可靠性、跨端同步、额度/模型限制感知**，以及 **Windows/macOS 平台回归**。  
版本侧则延续了 **0.153.0-alpha** 系列的小步快跑，同时 `0.152.1` 带来一项针对 **Guardian 审核与 Node REPL policy** 的修复。  
PR 侧则主要围绕 **权限/审核、插件 CLI、app-server schema、异步用户输入** 等基础能力补强。

---

## 2) 版本发布

### rust-v0.152.1
- 修复：**Guardian approval review 现在会遵守 model metadata 中提供的 Node REPL policies**。  
- 这意味着审批/安全检查在某些交互场景下会更一致，减少“策略存在但未生效”的问题。  
- 链接：<https://github.com/openai/codex/releases/tag/rust-v0.152.1>

### rust-v0.153.0-alpha.5 / alpha.4 / alpha.2 / alpha.1
- 过去 24 小时内连续发布多个 **0.153.0-alpha** 预发布版本。
- 当前可见信息较少，说明仍处于 **快速迭代与内部验证阶段**，重点可能是打底能力与回归修复。
- 链接：
  - <https://github.com/openai/codex/releases/tag/rust-v0.153.0-alpha.5>
  - <https://github.com/openai/codex/releases/tag/rust-v0.153.0-alpha.4>
  - <https://github.com/openai/codex/releases/tag/rust-v0.153.0-alpha.2>
  - <https://github.com/openai/codex/releases/tag/rust-v0.153.0-alpha.1>

---

## 3) 社区热点 Issues

### 1. 额度感知的任务规划：避免任务执行到一半被中断
- Issue：[#42182](https://github.com/openai/codex/issues/42182)
- 重点：用户希望 Codex 在规划长任务时**主动考虑剩余额度**，把 5 小时/周额度当成约束条件。
- 重要性：这直接影响长任务、批处理和多步修复的可完成性。
- 社区反应：目前评论不多，但这是典型的 **“可用性预期”** 问题，关注度很可能持续上升。

### 2. macOS Scheduled Tasks 已完成但结果未渲染到目标聊天
- Issue：[#42175](https://github.com/openai/codex/issues/42175)
- 重点：定时任务已完成并触发 NOTIFY，但结果没有正确显示到目标 chat。
- 重要性：涉及 **自动化任务闭环**，属于生产可用性问题。
- 社区反应：已有跟进评论，说明问题复现明确、影响真实工作流。

### 3. 跨任务委派提示被旧上下文覆盖
- Issue：[#42131](https://github.com/openai/codex/issues/42131)
- 重点：新的 delegated prompt 会被 stale task context 覆盖。
- 重要性：这是 **上下文隔离** 问题，直接影响多任务协作和 agent 的正确性。
- 社区反应：评论数不高，但问题属于高风险逻辑缺陷，尤其在连续任务场景下。

### 4. Windows 桌面宠物拖拽/命中区域错位
- Issue：[#42190](https://github.com/openai/codex/issues/42190)
- 重点：宠物移动或缩放后，交互区域与可见位置脱节。
- 重要性：虽属 UI 问题，但会破坏桌面端交互体验，属于典型平台回归。
- 社区反应：已有 1 条评论，说明是可感知且容易复现的前端问题。

### 5. TUI rewind 默认分叉，无法保留当前 thread
- Issue：[#42189](https://github.com/openai/codex/issues/42189)
- 重点：回退/编辑历史时默认 fork 出新 session，导致会话历史膨胀。
- 重要性：影响 CLI/TUI 的核心交互模型，尤其对频繁修正提示词的开发者不友好。
- 社区反应：问题描述非常具体，说明用户对“保留线程”的诉求明确。

### 6. macOS 集成终端无法通过按钮或快捷键打开
- Issue：[#42180](https://github.com/openai/codex/issues/42180)
- 重点：更新后 integrated terminal 完全打不开。
- 重要性：属于 **关键工作流阻断**，会直接影响本地开发与调试。
- 社区反应：1 条评论，但影响面大，属于高优先级回归。

### 7. 昨天的聊天和工作记录丢失
- Issue：[#42177](https://github.com/openai/codex/issues/42177)
- 重点：登录 CLI 后历史记录消失。
- 重要性：这是 **数据可见性/持久化** 问题，用户信任度敏感。
- 社区反应：虽然评论不多，但“记录丢失”类问题通常会迅速引发持续反馈。

### 8. Web / iPhone / 桌面项目聊天不同步
- Issue：[#42176](https://github.com/openai/codex/issues/42176)
- 重点：某些对话只在一台设备可见，Web 和 iPhone 不显示。
- 重要性：跨端同步是 ChatGPT/Codex 生态的基础能力。
- 社区反应：属于典型“多端一致性”故障，通常会被高频复现。

### 9. Windows 下 `--ignore-user-config` 导致 exec 没有可用 sandbox
- Issue：[#42172](https://github.com/openai/codex/issues/42172)
- 重点：所有命令都被 policy 拒绝，连只读读取也无法执行。
- 重要性：这是 **CLI 核心执行路径** 回归，影响自动化与可复现性。
- 社区反应：问题描述详细、对比历史版本明确，属于“可定位但破坏性强”的 bug。

### 10. 模型容量提示“已满”但仍持续失败
- Issue：[#42169](https://github.com/openai/codex/issues/42169)
- 重点：GPT-5.6 Sol 在桌面端反复返回 “Selected model is at capacity”。
- 重要性：涉及 **模型选择与可用性提示**，会让用户误判系统状态。
- 社区反应：用户在实际使用中持续遇到，说明体验不稳定且很直接。

---

## 4) 重要 PR 进展

### 1. 支持结构化异步用户输入请求
- PR：[#42178](https://github.com/openai/codex/pull/42178)
- 内容：用 `request_user_input_async` 替代旧接口，支持多个问题、建议答案，并允许 turn 继续。
- 价值：增强 agent 与用户的**异步协作能力**，适合复杂任务中途澄清。

### 2. 为 app-server 提供可缓存的 Bazel schema bundle
- PR：[#42174](https://github.com/openai/codex/pull/42174)
- 内容：新增 `schema_bundle` 规则，生成稳定/实验性 schema 目录，并带入 pinned `zstd`。
- 价值：提升构建可复用性与产物稳定性。

### 3. 支持 network requirements 的 header injections
- PR：[#42173](https://github.com/openai/codex/pull/42173)
- 内容：解析 `experimental_network.header_injections`，并进入 `NetworkConstraints`。
- 价值：让网络约束更精细，适合企业/受控网络环境。

### 4. 记录 app tool analytics 的 result source
- PR：[#42164](https://github.com/openai/codex/pull/42164)
- 内容：新增 per-tool `analytics_result_source`，并记录 host 生成的 source IDs。
- 价值：提升工具调用分析能力，便于定位结果来源与链路质量。

### 5. 将 tool JSON Schema 代码拆分为更聚焦的模块
- PR：[#42161](https://github.com/openai/codex/pull/42161)
- 内容：拆分 schema types、traversal helpers、compaction 逻辑。
- 价值：改善代码可维护性，降低大模块耦合。

### 6. 在 app-server thread metadata 中暴露模型设置
- PR：[#42151](https://github.com/openai/codex/pull/42151)
- 内容：为 Thread 增加 `model` 和 `reasoningEffort` 字段。
- 价值：增强线程级状态可观测性，帮助同步与恢复。

### 7. 支持 plugin CLI 的 remote marketplaces
- PR：[#42150](https://github.com/openai/codex/pull/42150)
- 内容：`codex plugin list` 支持远程 catalog 条目，并支持增删远程插件。
- 价值：扩展插件生态管理能力，利于分发与组织化配置。

### 8. Full Access 下跳过 Guardian reviews
- PR：[#42147](https://github.com/openai/codex/pull/42147)
- 内容：识别 Full Access 场景，避免对确认型动作做不必要的 model review。
- 价值：减少高权限场景的阻塞，提高执行效率。

### 9. 在 executor 上下文中解析 permission requests
- PR：[#42146](https://github.com/openai/codex/pull/42146)
- 内容：按所选 executor 环境解析相对路径、home、workspace roots 和 temp dirs。
- 价值：修正权限请求与执行环境不一致的问题。

### 10. 为 Plus / Team 增加早期额度预警
- PR：[#42142](https://github.com/openai/codex/pull/42142)
- 内容：当剩余约 5 小时窗口低于 50% 时发出警告。
- 价值：与今天的额度相关 issue 形成呼应，提升耗尽前的可预见性。

---

## 5) 功能需求趋势

从今日 Issues 看，社区最关注的方向主要有：

1. **会话/线程连续性与跨端同步**
   - 反复出现：线程丢失、历史缺失、手机/网页/桌面不同步、fork 过多。
   - 说明用户非常依赖 Codex 的“状态连续性”。

2. **额度与模型可用性管理**
   - 包括剩余额度感知、容量错误提示、任务中途不中断、切换模型后仍被阻断等。
   - 用户希望 Codex 在执行前就做 **资源规划**。

3. **CLI/TUI 与自动化执行稳定性**
   - rewind、tool call、sandbox、blocked by policy 等问题集中。
   - 说明重度用户对命令行工作流的容错率很低。

4. **桌面端平台回归修复**
   - macOS、Windows 都有明显回归：终端打不开、窗口控件错位、同步异常、冻结等。
   - 平台兼容性是今天非常显眼的信号。

5. **更精细的权限/安全策略**
   - Guardian、sandbox、permissions、network requirements、REPL policy 相关内容持续出现。
   - 社区既要安全，又要求“别过度阻断”。

---

## 6) 开发者关注点

今日开发者反馈中的高频痛点，主要集中在：

- **状态丢失**：聊天记录、任务历史、跨设备会话同步不稳定。
- **上下文污染**：新任务被旧线程上下文覆盖，fork 行为不符合预期。
- **执行受阻**：sandbox / policy / capacity 限制导致命令或任务无法推进。
- **平台回归**：Windows 与 macOS 的桌面端、终端、交互控件问题较集中。
- **可预见性不足**：额度耗尽、模型容量、权限审批没有在任务开始前充分提示。
- **协作体验缺口**：异步提问、任务继续执行、结果渲染与通知链路仍在补齐。

---

如果你需要，我也可以把这份日报进一步整理成：
1. **适合公众号/博客发布的成稿版**，或  
2. **适合内部晨会的 PPT 版要点提纲**。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-09-02）

## 1) 今日速览
今天 Gemini CLI 的更新重心明显偏向 **稳定性、权限兼容性与安全修复**：一方面发布了新的 nightly 版本，同时完成了 0.58.0 正式版与 0.59.0-preview.0 的发布；另一方面，社区讨论集中在 **macOS/受限环境下的认证启动问题、Git 配置兼容性、新模型可用性** 等高优先级问题上。  
从 PR 走向看，维护团队正在同步推进 **认证崩溃修复、Git 配置保留、敏感密钥清理、技能系统大小写一致性** 等基础能力完善。

---

## 2) 版本发布

### v0.59.0-nightly.20260902.g4963a4456
- 主要变更：`fix(core): improve destination validation and connection routing in web fetch utilities`
- 亮点：强化了 web fetch 工具的目标地址校验与连接路由，偏向安全与网络请求稳定性。  
- 链接：<https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0-nightly.20260902.g4963a4456>

### v0.59.0-preview.0
- 主要变更：
  - 自动生成 v0.58.0 的 Changelog
  - 版本号 bump 到新的 nightly
  - 还包含部分修复项（当前摘要被截断）
- 亮点：这是 0.59.0 预览版发布前的整合节点，说明版本节奏正在加速推进。  
- 链接：<https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0-preview.0>

### v0.58.0
- 主要变更：
  - 自动生成 v0.57.0-preview.0 的 Changelog
  - 修复 symlink 评估与 ignore path 处理一致性
  - 还有更多重构/修复项（摘要截断）
- 亮点：正式版发布说明稳定性修复已进入阶段性落地。  
- 链接：<https://github.com/google-gemini/gemini-cli/releases/tag/v0.58.0>

---

## 3) 社区热点 Issues
> 今日仅更新 5 条 Issue，以下全部纳入重点观察。

### 1. macOS 子目录下启动卡在 “Waiting for authentication...”
- Issue：[#29153](https://github.com/google-gemini/gemini-cli/issues/29153)
- 重要性：`priority/p1` + `area/security`，属于启动/认证链路的高优先级阻塞问题，直接影响可用性。
- 社区反应：已出现 2 条评论，且被 bot triaged，说明问题已进入快速分流。
- 关注点：macOS、子目录、认证等待卡死，典型的环境相关启动故障。

### 2. 用户级 Git 配置在执行 commit 时被忽略
- Issue：[#29152](https://github.com/google-gemini/gemini-cli/issues/29152)
- 重要性：`area/core`，影响 CLI 代用户执行 git 操作时的基本正确性。
- 社区反应：已有 2 条评论，说明这是可复现且具备一定影响面的配置兼容问题。
- 关注点：`~/.gitconfig` 未被尊重，可能导致提交身份错误，影响自动化提交场景。

### 3. 3.6 / 3.7 Flash 仍未出现在模型选择器
- Issue：[#29164](https://github.com/google-gemini/gemini-cli/issues/29164)
- 重要性：`priority/p1` + `area/core`，直接关联模型可选性与产品可用范围。
- 社区反应：已被 triaged，虽然当前评论不多，但属于“用户看得见、会直接影响体验”的问题。
- 关注点：模型 picker 与最新模型列表同步不及时。

### 4. SkillManager 的优先级与激活状态在大小写不一致时失效
- Issue：[#29150](https://github.com/google-gemini/gemini-cli/issues/29150)
- 重要性：`area/agent`，影响技能系统的覆盖规则和活跃状态判断。
- 社区反应：当前处于 `need-triage`，但描述非常具体，且涉及内部数据结构设计缺陷。
- 关注点：大小写敏感性导致 workspace skill、built-in skill、extension skill 的优先级与状态出现错配。

### 5. Agent 产生严重幻觉：注入口语化对话并误归因于用户提示
- Issue：[#29157](https://github.com/google-gemini/gemini-cli/issues/29157)
- 重要性：`area/agent`，属于输出可信度与内容正确性问题，影响用户对 Agent 的信任。
- 社区反应：当前 0 评论但已有 1 个赞，说明问题可能引发更多关注。
- 关注点：模型输出中出现“伪装成用户输入”的内容，属于高风险质量问题。

---

## 4) 重要 PR 进展
> 今日仅更新 9 条 PR，以下全部纳入重点观察。

### 1. 防止在 Git 仓库中认证阶段崩溃
- PR：[#29163](https://github.com/google-gemini/gemini-cli/pull/29163)
- 内容：修复 macOS Seatbelt 或其他受限权限环境下，启动时读取 Git branch name 导致的崩溃。
- 价值：直击今日最关键的启动/认证稳定性问题，和 Issue #29153 高度相关。

### 2. 不再清空用户的全局 / 系统 Git 配置
- PR：[#29156](https://github.com/google-gemini/gemini-cli/pull/29156)
- 内容：修正 `ShellExecutionService.prepareExecution` 对 `GIT_CONFIG_GLOBAL`、`GIT_CONFIG_SYSTEM` 的处理。
- 价值：恢复对用户 git 身份配置的尊重，直接回应 Issue #29152。

### 3. 处理 skill precedence 与 active state 的大小写不一致
- PR：[#29151](https://github.com/google-gemini/gemini-cli/pull/29151)
- 内容：修复 `SkillManager` 在技能覆盖和活跃状态追踪上的 case-insensitive 失配。
- 价值：补齐 Agent/Skill 系统的基础一致性，降低技能冲突。

### 4. 修正 `isEmpty()` 对 BOM 编码内容的解码错误
- PR：[#29155](https://github.com/google-gemini/gemini-cli/pull/29155)
- 内容：支持 UTF-16/UTF-32 等 BOM 编码文本的正确空内容判断。
- 价值：修复计划文件、配置文件等内容识别偏差，减少误判。

### 5. 清理 `chrome-devtools-mcp` 中硬编码的 Google CrUX API Key
- PR：[#29158](https://github.com/google-gemini/gemini-cli/pull/29158)
- 内容：从构建产物和第三方资产中移除敏感密钥。
- 价值：典型安全修复，避免凭据泄露进入 npm 包或构建层。

### 6. 夜间版本 bump 到 0.59.0-nightly.20260902.g4963a4456
- PR：[#29165](https://github.com/google-gemini/gemini-cli/pull/29165)
- 内容：自动化 nightly 发布版本更新。
- 价值：说明每日构建链路正常推进，发布节奏稳定。

### 7. 夜间版本 bump 到 0.60.0-nightly.20260901.g0bd1d4397
- PR：[#29162](https://github.com/google-gemini/gemini-cli/pull/29162)
- 内容：为下一轮 nightly 发布做版本准备。
- 价值：表明主干已持续滚动到 0.60.0 预备阶段。

### 8. v0.58.0 的自动生成 Changelog
- PR：[#29161](https://github.com/google-gemini/gemini-cli/pull/29161)
- 内容：生成正式版 0.58.0 的发布说明。
- 价值：发布流程自动化程度高，减少人工维护成本。

### 9. v0.59.0-preview.0 的自动生成 Changelog
- PR：[#29159](https://github.com/google-gemini/gemini-cli/pull/29159)
- 内容：生成预览版 0.59.0 的发布说明。
- 价值：说明版本文档与发布节奏同步推进。

---

## 5) 功能需求趋势
从今日 Issues 可以看出，社区关注点主要集中在以下方向：

1. **认证与启动稳定性**
   - 典型表现：macOS、子目录、受限权限环境下启动卡死或崩溃。  
   - 相关链接：[#29153](https://github.com/google-gemini/gemini-cli/issues/29153)、[#29163](https://github.com/google-gemini/gemini-cli/pull/29163)

2. **Git 工作流兼容性**
   - 典型表现：尊重用户全局/系统 git 配置、正确识别提交身份。  
   - 相关链接：[#29152](https://github.com/google-gemini/gemini-cli/issues/29152)、[#29156](https://github.com/google-gemini/gemini-cli/pull/29156)

3. **模型可用性与模型选择器同步**
   - 典型表现：新模型（3.6/3.7 Flash）未出现在 picker 中。  
   - 相关链接：[#29164](https://github.com/google-gemini/gemini-cli/issues/29164)

4. **Agent / Skill 系统一致性**
   - 典型表现：技能优先级、激活状态、大小写处理不一致。  
   - 相关链接：[#29150](https://github.com/google-gemini/gemini-cli/issues/29150)、[#29151](https://github.com/google-gemini/gemini-cli/pull/29151)

5. **输出可信度与幻觉控制**
   - 典型表现：Agent 生成与用户输入不一致的内容，甚至错误归因。  
   - 相关链接：[#29157](https://github.com/google-gemini/gemini-cli/issues/29157)

6. **安全与敏感信息治理**
   - 典型表现：API key 清理、destination validation、权限环境下行为收敛。  
   - 相关链接：[#29158](https://github.com/google-gemini/gemini-cli/pull/29158)、[#29120](https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0-nightly.20260902.g4963a4456)

---

## 6) 开发者关注点
综合今日社区反馈，开发者最常遇到的痛点主要是：

- **环境兼容性不足**：macOS、子目录、restricted permissions、Git 仓库启动链路容易出现异常。  
  - 参考：[#29153](https://github.com/google-gemini/gemini-cli/issues/29153)、[#29163](https://github.com/google-gemini/gemini-cli/pull/29163)

- **对用户本地配置的尊重不够**：尤其是 Git 配置被覆盖/忽略，影响自动化提交体验。  
  - 参考：[#29152](https://github.com/google-gemini/gemini-cli/issues/29152)、[#29156](https://github.com/google-gemini/gemini-cli/pull/29156)

- **模型与产品列表同步不及时**：新模型可用但 picker 不可见，会直接阻断测试与迁移。  
  - 参考：[#29164](https://github.com/google-gemini/gemini-cli/issues/29164)

- **Agent 行为一致性与可解释性不足**：技能优先级、状态追踪、输出幻觉都在影响用户信任。  
  - 参考：[#29150](https://github.com/google-gemini/gemini-cli/issues/29150)、[#29157](https://github.com/google-gemini/gemini-cli/issues/29157)

- **安全治理持续加强**：敏感 key 清理、URL/连接校验等都在往“默认安全”方向收敛。  
  - 参考：[#29158](https://github.com/google-gemini/gemini-cli/pull/29158)、[v0.59.0-nightly.20260902.g4963a4456](https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0-nightly.20260902.g4963a4456)

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合发 Slack/飞书的短版**，或  
2. **适合周报归档的表格版**。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-09-02）
数据来源：`github.com/github/copilot-cli`

## 1) 今日速览
今天社区讨论几乎被“**稳定性 + 兼容性**”两条主线占满：MCP/OAuth、自定义模型、Windows/PowerShell、长会话内存泄露、sandbox 行为等问题密集出现，说明 Copilot CLI 正在进入更复杂的企业与多后端集成场景。  
与此同时，新版 `v1.0.83-1` 主要补强了会话排序、企业登录约束和 MCP 配置体验，反映出产品一边推进易用性，一边强化企业可控性。  
[Release: v1.0.83-1](https://github.com/github/copilot-cli/releases/tag/v1.0.83-1)

---

## 2) 版本发布
### `v1.0.83-1`
- **新增**：Split Sessions 侧边栏支持 `Recent / Created / Name / classic None` 排序，并可跨重启保持选中顺序。  
- **新增**：企业管理员可通过 `forceLoginOrgs` 管理设置，将登录强制绑定到批准的 GitHub Organizations。  
- **改进**：`/mcp config` 以及 MCP add/edit 流程体验优化。  
[Release: v1.0.83-1](https://github.com/github/copilot-cli/releases/tag/v1.0.83-1)

---

## 3) 社区热点 Issues
> 本日更新的 12 条 Issue 中，以下 10 条最值得关注（均为近 24 小时内新增/更新，且当前评论量普遍较低，属于“刚冒头但影响面大”的问题）。

1. **#4681 MCP OAuth 初始化请求缺少 `User-Agent`，自定义头被忽略**  
   影响远程 MCP 服务器 OAuth 登录后的初始化链路，属于协议/兼容性问题，可能导致企业侧审计、网关或代理规则失效。  
   社区反应：**2 条评论，0 👍**，说明问题已被快速确认但仍偏早期。  
   [链接](https://github.com/github/copilot-cli/issues/4681)

2. **#4680 自定义 OpenAI-compatible endpoint 收到错误 model ID，直接中断会话**  
   对接非 OpenAI 模型名时，CLI 发送了错误的模型 ID，属于“配置正确但运行失败”的高优先级集成 bug。  
   社区反应：**2 条评论，0 👍**，典型的外部后端兼容性问题。  
   [链接](https://github.com/github/copilot-cli/issues/4680)

3. **#4686 长会话后 Node.js OOM 崩溃，疑似 libuv handle 泄露**  
   这是稳定性红线问题：长时间运行后直接内存耗尽，会影响持续使用和企业场景中的守护式/长任务。  
   社区反应：**1 条评论，0 👍**，但问题描述非常具体，排查价值高。  
   [链接](https://github.com/github/copilot-cli/issues/4686)

4. **#4683 PowerShell ConstrainedLanguage 模式下每条命令都输出错误块**  
   影响 AppLocker / WDAC 等受控 Windows 环境，属于企业用户高频痛点，可能污染所有 shell 输出。  
   社区反应：**1 条评论，0 👍**，明显面向企业桌面管控环境。  
   [链接](https://github.com/github/copilot-cli/issues/4683)

5. **#4690 `/plugin marketplace add` 在长路径仓库上失败**  
   Marketplace / 插件生态导入失败，且由文件路径长度触发，属于“数据规模稍大就崩”的鲁棒性问题。  
   社区反应：**0 评论，0 👍**，但对 marketplace 使用链路很关键。  
   [链接](https://github.com/github/copilot-cli/issues/4690)

6. **#4689 Issues / Pull requests 面板忽略 `gh repo set-default`，总解析到 fork**  
   影响 TUI 中的仓库上下文选择，直接干扰 fork-based 协作流程，属于工作流体验问题。  
   社区反应：**0 评论，0 👍**，但触及 GitHub 贡献模式的基础路径。  
   [链接](https://github.com/github/copilot-cli/issues/4689)

7. **#4688 子代理并发限制不感知机器负载，导致主机过载并冻结 UI**  
   这是典型的性能与调度问题：静态并发数在高负载下会放大资源争用，最终影响 CLI 自身可用性。  
   社区反应：**0 评论，0 👍**，但问题定义非常清楚，适合进入性能优化队列。  
   [链接](https://github.com/github/copilot-cli/issues/4688)

8. **#4687 `/compact` 后丢失仓库级 instruction 文件（AGENTS.md / CLAUDE.md 等）**  
   这会破坏会话中已建立的 repo 规则，尤其影响代码规范、分支策略和安全约束的持续执行。  
   社区反应：**0 评论，0 👍**，属于上下文管理核心问题。  
   [链接](https://github.com/github/copilot-cli/issues/4687)

9. **#4682 `permissions-config.json` 需要持久化、路径范围级 write approvals**  
   当前 write 授权粒度偏粗，无法对特定目录/文件做长期预批准，明显影响团队内的安全与效率平衡。  
   社区反应：**0 评论，0 👍**，属于权限模型增强诉求。  
   [链接](https://github.com/github/copilot-cli/issues/4682)

10. **#4679 sandbox.disabled 未生效，Shell 仍初始化 BaseContainer 并在 Windows 上报错**  
    这是直接阻断 shell 执行的严重问题，且发生在 Windows 场景，优先级很高。  
    社区反应：**0 评论，0 👍**，但对可用性影响极大。  
    [链接](https://github.com/github/copilot-cli/issues/4679)

---

## 4) 重要 PR 进展
过去 24 小时 **未检测到更新的 Pull Request**，因此本日暂无可列出的 PR 合并/审阅进展。  
[Pull Requests 列表](https://github.com/github/copilot-cli/pulls)

---

## 5) 功能需求趋势
1. **MCP / 协议兼容性增强**：围绕 OAuth、Header、初始化请求的兼容问题明显增多。  
   [#4681](https://github.com/github/copilot-cli/issues/4681)

2. **自定义模型与第三方推理后端支持**：用户希望在 OpenAI-compatible endpoint 上稳定使用非 OpenAI 模型名。  
   [#4680](https://github.com/github/copilot-cli/issues/4680)

3. **企业环境兼容性**：Windows、PowerShell ConstrainedLanguage、WDAC/AppLocker 等受控场景需求上升。  
   [#4683](https://github.com/github/copilot-cli/issues/4683) / [#4679](https://github.com/github/copilot-cli/issues/4679)

4. **长会话稳定性与性能治理**：内存泄露、并发调度、UI 冻结成为重要信号。  
   [#4686](https://github.com/github/copilot-cli/issues/4686) / [#4688](https://github.com/github/copilot-cli/issues/4688)

5. **上下文保持与工作流连续性**：`/compact` 后保留 repo 级规则、默认仓库解析、会话状态持久化都在被强化需求。  
   [#4687](https://github.com/github/copilot-cli/issues/4687) / [#4689](https://github.com/github/copilot-cli/issues/4689)

6. **权限模型细粒度化**：用户希望 write approvals 能按路径持久化，减少重复审批成本。  
   [#4682](https://github.com/github/copilot-cli/issues/4682)

7. **插件/Marketplace 鲁棒性**：长路径、克隆位置选择等工程细节正在影响实际可用性。  
   [#4690](https://github.com/github/copilot-cli/issues/4690)

---

## 6) 开发者关注点
- **稳定性优先级继续上升**：长会话 OOM、sandbox 失效、并发过载都属于“能用到一半突然坏掉”的高风险问题。  
  [#4686](https://github.com/github/copilot-cli/issues/4686) / [#4688](https://github.com/github/copilot-cli/issues/4679)

- **企业环境适配是重点**：受控 Windows、登录组织白名单、MCP 与代理/审计链路兼容，都是面向企业落地的关键能力。  
  [#4683](https://github.com/github/copilot-cli/issues/4683) / [Release](https://github.com/github/copilot-cli/releases/tag/v1.0.83-1) / [#4681](https://github.com/github/copilot-cli/issues/4681)

- **外部后端和协议边界要更稳**：自定义 OpenAI-compatible endpoint、MCP OAuth 初始化等问题表明，CLI 正在被用到更复杂的生态对接中。  
  [#4680](https://github.com/github/copilot-cli/issues/4680) / [#4681](https://github.com/github/copilot-cli/issues/4681)

- **上下文/规则持久化需求增强**：用户不希望 `compact` 或切换面板后丢失 repo 级规则与默认仓库语义。  
  [#4687](https://github.com/github/copilot-cli/issues/4687) / [#4689](https://github.com/github/copilot-cli/issues/4689)

- **权限与审批粒度在变细**：社区开始要求更持久、更路径化的授权模型，以平衡安全与效率。  
  [#4682](https://github.com/github/copilot-cli/issues/4682)

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合内部周报的精简版**，或  
2. **带优先级排序的研发待办版**。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

以下日报严格基于你提供的 GitHub 数据生成。  
**说明：**过去 24 小时内更新的 **Issues 为 0 条**、**PR 为 1 条**，因此部分“列出 10 条”的要求在当前数据下无法真实满足；我将按**全部可用信息**整理，并明确标注数据边界，避免虚构。

---

# 2026-09-02｜Kimi Code CLI 社区动态日报

## 1. 今日速览
今天的核心动态是 **Kimi Code CLI 发布了 1.50.0**，属于一次以稳定性和兼容性为主的小版本更新，重点包含 `kosong` 相关修复、release 依赖版本同步，以及 shell 相关的渐进式兼容改进。  
社区侧 **没有新增/更新的 Issues**，说明本周期用户反馈较少，讨论重心主要集中在发版与版本对齐。

---

## 2. 版本发布

### [1.50.0](https://github.com/MoonshotAI/kimi-cli/releases/tag/1.50.0)
本次发布可见的更新重点包括：

- **修复 `kosong` 对 anthropic-beta header 的处理**：当没有声明 beta 特性时，不再注入空的 `anthropic-beta` header，减少无效请求头。
- **release 依赖升级**：`kosong` bump 到 `0.56.0`，体现出对底层组件的同步维护。
- **shell 相关增强**：release note 中出现了 `feat(shell): deprecation-aware...`，表明 shell 交互/兼容性正在向“感知弃用项”的方向演进。
- **版本与包装器同步**：对应的 PR 已同步 `kimi-cli==1.50.0` 约束，确保 Python wrapper 和 CLI 版本一致。

---

## 3. 社区热点 Issues

### 结论
**过去 24 小时内没有更新的 Issues（0 条）**，因此本日报无法从 Issue 中挑选 10 个高关注条目，也无法客观评估评论热度、争议点或社区反应。

### 可用结论
- 当前没有新的问题反馈信号。
- 社区关注度更偏向于“发版完成度”和“版本一致性”，而不是新增故障讨论。

> Issues 列表：**暂无更新条目**  
> GitHub Issues 页：<https://github.com/MoonshotAI/kimi-cli/issues>

---

## 4. 重要 PR 进展

> 说明：过去 24 小时内实际更新的 PR 仅 **1 条**；以下同时补充了本次 1.50.0 发布说明中提到的关联 PR，便于完整理解这次发版。

### 1) [#2632 chore(release): bump kimi-cli to 1.50.0](https://github.com/MoonshotAI/kimi-cli/pull/2632)
- 状态：**CLOSED**
- 作者：sailist
- 核心内容：
  - 将 `kimi-cli` 升级到 `1.50.0`
  - 将当前 release notes 迁移到 1.50.0 下
  - 同步 `packages/kimi-code` wrapper 版本以及 `kimi-cli==1.50.0` 的依赖 pin
- 重要性：
  - 这是典型的 **发版收口 PR**，代表代码、文档、包装器依赖完成统一对齐。

### 2) [#2580 fix(kosong): omit empty anthropic-beta header when no beta features declared](https://github.com/MoonshotAI/kimi-cli/pull/2580)
- 状态：来自 release notes 的关联 PR
- 核心内容：
  - 当未声明 beta 功能时，不再发送空的 `anthropic-beta` header
- 重要性：
  - 属于 **请求协议清理/兼容性修复**，能减少无意义参数，降低接口侧潜在歧义。

### 3) [#2581 chore(release): bump kosong to 0.56.0](https://github.com/MoonshotAI/kimi-cli/pull/2581)
- 状态：来自 release notes 的关联 PR
- 核心内容：
  - 升级 `kosong` 到 `0.56.0`
- 重要性：
  - 表明项目对关键依赖保持同步，通常有助于稳定性和后续修复落地。

> PR 总体观察：当前可见 PR 以 **版本同步、依赖升级、协议修复** 为主，没有出现大规模功能重构或高争议改动。

---

## 5. 功能需求趋势

由于本周期 **没有新增 Issues**，无法从 Issue 讨论中提炼出“用户显式需求榜单”。  
但结合本次 release 和 PR，可以看出当前社区/开发侧的关注方向主要集中在：

1. **CLI 协议与请求头兼容性**
   - 如 `anthropic-beta` header 的清理，说明大家在意请求是否“干净、可控、少副作用”。

2. **版本发布与依赖同步**
   - `kimi-cli`、`kosong`、`packages/kimi-code` 的版本对齐，说明社区很重视“包装器—CLI—依赖”三方一致性。

3. **Shell 交互体验与弃用兼容**
   - release note 中出现 shell 相关增强，说明对终端交互体验和向后兼容能力有持续投入。

> 趋势判断：当前更像是一个 **成熟化维护阶段**，重点在稳定性、兼容性、发布质量，而非激进扩展新能力。

---

## 6. 开发者关注点

从已有提交信息和发布内容看，开发者最值得关注的痛点/需求主要有：

- **无效请求头治理**
  - 空 `anthropic-beta` header 的移除，说明开发者在关注请求层面的规范性和可维护性。

- **版本链路一致性**
  - release PR 同步 wrapper 版本和依赖 pin，反映出开发者对“版本漂移”比较敏感。

- **底层依赖升级节奏**
  - `kosong` 升级到 `0.56.0`，说明项目依赖的演进需要及时跟进，以避免兼容问题积累。

- **shell 行为的弃用感知**
  - shell 相关“deprecation-aware”改进，说明工具链需要更早暴露弃用信息，帮助用户平滑迁移。

---

如果你愿意，我还可以把这份日报进一步整理成两种格式之一：  
1. **适合公众号/飞书群的精简版**  
2. **适合技术周报的表格版**

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-09-02）

## 1. 今日速览
过去 24 小时，OpenCode 发布了 **v1.18.26**，核心修复集中在 Claude 5 / Bedrock 推理会话的兼容性与稳定性上，说明项目仍在持续打磨多模型接入体验。  
与此同时，社区讨论重心明显落在 **模型/Provider 兼容、MCP/插件链路可观测性、以及 Windows/Desktop 稳定性** 三条线上，代表性问题包括工具调用失败、启动崩溃和 Web UI 在不安全 origin 下异常。  
- [v1.18.26 Release](https://github.com/anomalyco/opencode/releases/tag/v1.18.26)
- [#46625 Tool calls not executed](https://github.com/anomalyco/opencode/issues/46625)
- [#46691 Desktop crash on launch](https://github.com/anomalyco/opencode/issues/46691)

## 2. 版本发布
- [v1.18.26](https://github.com/anomalyco/opencode/releases/tag/v1.18.26)：  
  - 修复 Claude 5 session 对陈旧 thinking blocks 的容忍度，避免在 prompt/tool 变更后直接失败。  
  - Bedrock GPT-5.6 模型现支持 `none` reasoning effort。  
  - Bedrock reasoning 与 replay 处理更稳定。  
  - 工具调用计时统计继续修正，朝更准确的运行观测推进。  

## 3. 社区热点 Issues
- [#46625 Ollama qwen2.5-coder:7b tool calls are not executed by OpenCode](https://github.com/anomalyco/opencode/issues/46625)：本地 Ollama 场景下“能回答但不能执行工具”属于高优先级阻断问题；**4 条评论且已关闭**，说明社区复现较集中、处理推进较快。
- [#46686 Add Session List Management to Windows Desktop Version](https://github.com/anomalyco/opencode/issues/46686)：Windows Desktop 的会话列表管理是典型的生产力需求；**2 条评论、已关闭**，表明桌面端工作流能力仍在补齐。
- [#46685 Subagent permission/error events leave external integrations no way to see root-session progress](https://github.com/anomalyco/opencode/issues/46685)：子会话事件广播与根会话状态不一致，会直接影响外部集成的进度展示；**2 条评论，开放中**，属于可观测性/事件模型问题。
- [#46680 Settings & Connect Provider dialogs hide their scrollbar](https://github.com/anomalyco/opencode/issues/46680)：设置页和连接提供商对话框隐藏滚动条，属于明显的桌面可用性缺陷；**2 条评论，开放中**，说明已有用户在不同平台复现。
- [#46658 Azure CLI account discovery blocks every startup for signed-in users](https://github.com/anomalyco/opencode/issues/46658)：Azure 账户发现同步阻塞启动，影响所有带 CLI 登录缓存的用户；**2 条评论且已关闭**，这是启动性能类高优先级问题。
- [#46604 Can't select pro google models via /models](https://github.com/anomalyco/opencode/issues/46604)：CLI 内 `/models` 无法看到 Google Pro 模型，但命令行直连可用，说明模型目录与实际能力存在偏差；**2 条评论，开放中**。
- [#46617 The bug of git scan](https://github.com/anomalyco/opencode/issues/46617)：Git 扫描对 `.gitignore` 的静默过滤会让“无结果”与“被过滤”难以区分，属于工具透明度问题；**2 条评论且已关闭**。
- [#46691 Windows 11: OpenCode Desktop crashes on launch with repeated GPU process failures](https://github.com/anomalyco/opencode/issues/46691)：桌面端启动即崩且涉及 GPU 进程反复失败，属于严重稳定性问题；**1 条评论，开放中**，但影响面很高。
- [#46662 Web UI over plain HTTP: sessions appear empty / missing](https://github.com/anomalyco/opencode/issues/46662)：HTTP 明文访问下会话/附件异常，直接影响自建部署用户；**1 条评论，开放中**，偏安全与运行环境兼容问题。
- [#46628 MCP tool schemas are not sanitized for Anthropic](https://github.com/anomalyco/opencode/issues/46628)：MCP 工具 schema 未做 Anthropic 兼容清洗会导致请求在首个工具调用前就 400；**1 条评论，开放中**，对 MCP 生态集成影响很大。
- [#46722 Skills silently dropped from available_skills when MCP server is configured](https://github.com/anomalyco/opencode/issues/46722)：配置 MCP 后 skills 静默消失，属于“没有报错但能力丢失”的高风险问题；**1 条评论，开放中**，很适合优先排查。
- [#46647 Reasoning variants ineffective for alibaba provider](https://github.com/anomalyco/opencode/issues/46647)：Alibaba provider 下 reasoning 控制参数被静默丢弃，影响 Qwen3 等模型的推理预算管理；**1 条评论，开放中**，偏 Provider 兼容性问题。

## 4. 重要 PR 进展
- [#46723 fix(app): stabilize optimistic prompt position](https://github.com/anomalyco/opencode/pull/46723)：修复长会话下乐观提交 prompt 在虚拟列表刷新时位置抖动的问题，改善输入体验。
- [#46721 refactor(core): carry typed job outcomes for stops](https://github.com/anomalyco/opencode/pull/46721)：让停止 shell / subagent 的结果类型化，避免把用户主动停止误报为失败。
- [#46717 feat(app): add timeline detail presets and placement controls](https://github.com/anomalyco/opencode/pull/46717)：新增 timeline 细节预设与展示位置控制，强化长会话的信息密度管理。
- [#46716 feat(core): add grep matching options](https://github.com/anomalyco/opencode/pull/46716)：给 grep 工具增加 literal / caseSensitive 选项，提升搜索精度与可控性。
- [#46715 fix(app): keep background hint visible for at least one second](https://github.com/anomalyco/opencode/pull/46715)：避免短任务让“Move to background”提示一闪而过，减少交互噪音。
- [#46714 feat(tui): add read-only file preview dialog](https://github.com/anomalyco/opencode/pull/46714)：为 TUI 增加只读文件预览弹窗，补足文件查看型工作流。
- [#46713 fix(app): keep new local sessions in the selected directory](https://github.com/anomalyco/opencode/pull/46713)：确保新建 Local session 保持用户选定目录，不再被替换成缓存 canonical path。
- [#46712 fix(desktop): open PowerShell in the project directory on Windows](https://github.com/anomalyco/opencode/pull/46712)：修复 Windows 下“Open in → PowerShell”打开路径错误的问题。
- [#46711 feat(app): show working when timeline progress is hidden](https://github.com/anomalyco/opencode/pull/46711)：当 timeline 进度被隐藏时，仍显示 Working fallback，增强任务进行中的可见性。
- [#46710 copy models.dev snapshot without structuredClone](https://github.com/anomalyco/opencode/pull/46710)：优化 models.dev snapshot 复制路径，减少 `structuredClone` 的重复开销，偏性能优化。

## 5. 功能需求趋势
- **模型/Provider 兼容与 reasoning 控制**：社区频繁反馈 Google / Alibaba / Bedrock / Ollama 等 provider 的模型选择、thinking/reasoning 参数和工具调用能力差异。  
  代表：[#46604](https://github.com/anomalyco/opencode/issues/46604)、[#46647](https://github.com/anomalyco/opencode/issues/46647)、[#46625](https://github.com/anomalyco/opencode/issues/46625)

- **MCP / 插件生态的稳定性与可观测性**：MCP 工具 schema、skills 发现、事件总线元数据都在被持续追问，说明生态集成已进入“可用性细化”阶段。  
  代表：[#46628](https://github.com/anomalyco/opencode/issues/46628)、[#46722](https://github.com/anomalyco/opencode/issues/46722)、[#46685](https://github.com/anomalyco/opencode/issues/46685)、[#46652](https://github.com/anomalyco/opencode/issues/46652)

- **桌面端与 Web UI 的可用性补全**：滚动条、会话列表、路径补全、PowerShell 打开、只读预览等需求，说明用户正在把 OpenCode 当作日常工作台使用。  
  代表：[#46686](https://github.com/anomalyco/opencode/issues/46686)、[#46680](https://github.com/anomalyco/opencode/issues/46680)、[#46661](https://github.com/anomalyco/opencode/issues/46661)、[#46712](https://github.com/anomalyco/opencode/pull/46712)、[#46714](https://github.com/anomalyco/opencode/pull/46714)

- **稳定性、启动性能与环境兼容**：从 Azure CLI 启动阻塞、Windows GPU 崩溃，到 HTTP origin 下 Web API 不可用，社区明显希望减少“能跑但不稳”的边缘情况。  
  代表：[#46658](https://github.com/anomalyco/opencode/issues/46658)、[#46691](https://github.com/anomalyco/opencode/issues/46691)、[#46662](https://github.com/anomalyco/opencode/issues/46662)、[#46617](https://github.com/anomalyco/opencode/issues/46617)

## 6. 开发者关注点
- **上下文与推理链路的鲁棒性**：包括 stale thinking blocks、prompt admission 重试、上下文压缩等，说明“长任务不中断”是核心诉求。  
  参考：[#46625](https://github.com/anomalyco/opencode/issues/46625)、[#46698](https://github.com/anomalyco/opencode/issues/46698)、[#46709](https://github.com/anomalyco/opencode/pull/46709)

- **事件流与状态回传要更透明**：用户和外部集成都在要求更清晰的 session / agent / job 状态，否则“没报错但看不懂进度”会持续困扰高级用户。  
  参考：[#46685](https://github.com/anomalyco/opencode/issues/46685)、[#46652](https://github.com/anomalyco/opencode/issues/46652)、[#46721](https://github.com/anomalyco/opencode/pull/46721)

- **MCP / 插件体系需要更强的兼容层**：schema 清洗、skills 发现、工具定义边界都在暴露生态接入成本。  
  参考：[#46628](https://github.com/anomalyco/opencode/issues/46628)、[#46722](https://github.com/anomalyco/opencode/issues/46722)

- **Windows / Desktop 是高频痛点区域**：包括 PowerShell 路径、GPU 崩溃、滚动条、会话管理、启动行为等，桌面体验仍是社区最敏感的落点之一。  
  参考：[#46691](https://github.com/anomalyco/opencode/issues/46691)、[#46712](https://github.com/anomalyco/opencode/pull/46712)、[#46680](https://github.com/anomalyco/opencode/issues/46680)、[#46686](https://github.com/anomalyco/opencode/issues/46686)

如果你愿意，我也可以把这份日报进一步整理成 **适合发到 Slack/飞书的短版**，或者输出成 **表格版**。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# 2026-09-02 Pi 社区动态日报

## 今日速览
过去 24 小时内，Pi 社区主要聚焦在 **模型/Provider 兼容性**、**工具链可靠性** 和 **扩展 API 能力完善** 三条主线；Issues 更新 35 条，PR 更新 9 条，整体节奏偏“修 bug + 补能力”。  
值得注意的是，今天没有新的 Release，但有两条较重要的开放问题仍在推进：**OpenRouter 计费/账单信息保真** 与 **内联图片渲染比例异常**。

---

## 社区热点 Issues

1. **[#8938 Wide, short inline images are stretched vertically](https://github.com/badlogic/pi-mono/issues/8938)**【OPEN】  
   内联图片纵向拉伸属于高可见度 UI 问题，直接影响 TUI 阅读体验；已有 **3 条评论**，说明复现路径和尺寸计算细节已经引发较集中讨论。

2. **[#8940 Preserve OpenRouter actual cost, cost details, BYOK flag, and serving provider](https://github.com/badlogic/pi-mono/issues/8940)**【OPEN】  
   这是计费链路的准确性问题，涉及实际成本、成本明细和 BYOK 标识，影响面从“显示”延伸到“账单可信度”；**2 条评论**，属于优先级较高的基础能力补齐。

3. **[#8981 Anthropic OAuth requests pin claude-cli/2.1.75, rejected for claude-fable-5-1](https://github.com/badlogic/pi-mono/issues/8981)**【CLOSED】  
   OAuth 请求被固定到旧 UA，导致新模型直接被 Anthropic 拒绝，属于典型的 provider 兼容性回归；**1 条评论**，但影响明确且直接阻断使用。

4. **[#8973 Grok 4.6 re-issues the identical tool call indefinitely](https://github.com/badlogic/pi-mono/issues/8973)**【CLOSED】  
   这是较严重的执行回归：工具结果已写入，但下一轮仍重复同一 tool call，容易造成无限循环；**2 条评论**，问题性质偏“阻塞级”。

5. **[#8979 Write tools report UTF-16 code units as byte counts](https://github.com/badlogic/pi-mono/issues/8979)**【CLOSED】  
   写工具的字节统计不准确，会影响文件写入反馈和自动化判断；虽然是细节 bug，但会影响多语言场景下的工具可信度；**1 条评论**。

6. **[#8978 Improve GLM 5.3 / GLM 5.3 Flash for Fireworks provider](https://github.com/badlogic/pi-mono/issues/8978)**【CLOSED】  
   这是新模型接入/路由规则问题，说明 Fireworks provider 的模型匹配逻辑仍偏硬编码；**1 条评论**，但对模型生态扩展很关键。

7. **[#8977 llama.cpp provider catalog silently empty under --cap-drop ALL](https://github.com/badlogic/pi-mono/issues/8977)**【CLOSED】  
   容器权限收紧后模型目录静默为空，且报错具有误导性，属于部署环境里的“隐性故障”；**1 条评论**，很容易困扰生产环境排障。

8. **[#8965 RpcClient.waitForIdle() can miss agent_settled and time out after fast prompts](https://github.com/badlogic/pi-mono/issues/8965)**【CLOSED】  
   这是 RPC/自动化链路的竞态问题：事件可能在监听器挂载前就已发出，导致超时；**1 条评论**，但对自动化稳定性影响较大。

9. **[#8964 Extensions can't stream through the composed provider](https://github.com/badlogic/pi-mono/issues/8964)**【CLOSED】  
   扩展侧缺少 stream/streamSimple 能力，意味着 token 级增量输出难以实现；**1 条评论**，属于扩展生态能力短板。

10. **[#8961 GitHub Copilot Fable 5 ignores the selected thinking level](https://github.com/badlogic/pi-mono/issues/8961)**【CLOSED】  
    模型路由/能力映射不完整，导致用户选了 thinking level 也不生效；**1 条评论**，直接影响模型控制精度。

---

## 重要 PR 进展

> 本窗口内共 9 条更新 PR，以下为全部关键进展。

1. **[#8980 feat(coding-agent): ingest external entries in in-memory sessions](https://github.com/badlogic/pi-mono/pull/8980)**【OPEN】  
   为内存会话接入外部条目，利于把 RPC/自动化侧数据更自然地并入同一会话流。

2. **[#8969 feat(coding-agent): add model and thinking overrides to subagent tool](https://github.com/badlogic/pi-mono/pull/8969)**【CLOSED】  
   子代理工具支持显式覆盖模型与 thinking 参数，增强多模型调度能力，适合“快模型探路 + 重模型规划”的用法。

3. **[#8966 fix(coding-agent): --provider without --model selects that provider's default; auth failures name the failing provider](https://github.com/badlogic/pi-mono/pull/8966)**【CLOSED】  
   修复 `--provider` 单独使用时被忽略的问题，并让认证失败信息指向具体 provider，提升 CLI 可用性和排障效率。

4. **[#8963 DRAFT: dev branch](https://github.com/badlogic/pi-mono/pull/8963)**【OPEN】  
   作为 CI/开发分支的草稿 PR，主要用于持续集成和分支验证。

5. **[#8957 Fix/wrap UI prompt context lose prototypes](https://github.com/badlogic/pi-mono/pull/8957)**【CLOSED】  
   修复 UI prompt 上下文丢失原型链的问题，属于前端运行时兼容性修正。

6. **[#8951 feat(coding-agent): hide headless sessions from the resume picker by default](https://github.com/badlogic/pi-mono/pull/8951)**【CLOSED】  
   默认隐藏自动化/无头会话，减少 `/resume` 列表噪音，改善人工恢复会话的效率。

7. **[#8950 fix(coding-agent): keep theme markers visible](https://github.com/badlogic/pi-mono/pull/8950)**【CLOSED】  
   修复主题标记不可见问题，属于 UI 可读性改进。

8. **[#8946 fix(extensions): never serve a stale pre-trust runtime to the final load pass](https://github.com/badlogic/pi-mono/pull/8946)**【CLOSED】  
   修复信任状态切换时复用过期 runtime 的问题，降低扩展加载阶段的状态污染风险。

9. **[#8941 fix(ai): add supportsMaxOutputTokens compat flag for openai-responses](https://github.com/badlogic/pi-mono/pull/8941)**【CLOSED】  
   为 OpenAI Responses 兼容层增加 `max_output_tokens` 开关，解决部分网关不接受该参数导致的 400 错误。

---

## 功能需求趋势

1. **模型/Provider 兼容性持续升温**  
   社区关注点集中在 Anthropic、OpenRouter、Fireworks、Copilot Fable、Bedrock、llama.cpp 等 provider 的行为一致性与路由规则上。  
   代表问题：[#8981](https://github.com/badlogic/pi-mono/issues/8981)、[#8978](https://github.com/badlogic/pi-mono/issues/8978)、[#8961](https://github.com/badlogic/pi-mono/issues/8961)、[#8977](https://github.com/badlogic/pi-mono/issues/8977)

2. **扩展 API 正在向“可编排、可流式、可回调”演进**  
   开发者希望扩展能拿到更完整的生命周期控制：新上下文、流式输出、事件注销、预检结果回调等。  
   代表问题/PR：[#8972](https://github.com/badlogic/pi-mono/issues/8972)、[#8964](https://github.com/badlogic/pi-mono/issues/8964)、[#8975](https://github.com/badlogic/pi-mono/issues/8975)

3. **会话管理与 /resume 体验仍是高频需求**  
   社区对“自动化会话”和“人工会话”的区分越来越明确，希望减少噪音、提升恢复效率。  
   代表问题/PR：[#8954](https://github.com/badlogic/pi-mono/issues/8954)、[#8952](https://github.com/badlogic/pi-mono/issues/8952)、[#8951](https://github.com/badlogic/pi-mono/pull/8951)

4. **工具执行可靠性优先级很高**  
   写工具、编辑工具、RPC idle 检测、streamed tool-call 校验等问题说明：只要涉及自动化执行，社区更在意“稳定、准确、可重试”。  
   代表问题：[#8979](https://github.com/badlogic/pi-mono/issues/8979)、[#8965](https://github.com/badlogic/pi-mono/issues/8965)、[#8959](https://github.com/badlogic/pi-mono/issues/8959)

5. **计费与用量数据要求更精细**  
   OpenRouter 的 actual cost、cost details、BYOK flag、serving provider 说明用户开始把 Pi 当作多 provider 统一入口，对账单透明度要求更高。  
   代表问题：[#8940](https://github.com/badlogic/pi-mono/issues/8940)

---

## 开发者关注点

1. **错误提示需要更“定位友好”**  
   许多问题都暴露出“报错不指向根因”的痛点，例如 provider 名称不明确、权限/认证失败被包装成通用错误。  
   代表：[#8966](https://github.com/badlogic/pi-mono/pull/8966)、[#8977](https://github.com/badlogic/pi-mono/issues/8977)、[#8981](https://github.com/badlogic/pi-mono/issues/8981)

2. **API 行为变更需要同步文档**  
   例如 `pi.setModel()` 语义变化、扩展 API 能力边界等，如果文档不同步，开发者会把“设计变更”误判为“Bug”。  
   代表：[#8976](https://github.com/badlogic/pi-mono/issues/8976)

3. **自动化/RPC 稳定性是核心底座**  
   `agent_settled` 竞态、session 文件头缺失、tool call 重复等问题，说明自动化链路的状态机和事件顺序仍需继续加固。  
   代表：[#8965](https://github.com/badlogic/pi-mono/issues/8965)、[#8973](https://github.com/badlogic/pi-mono/issues/8973)、[#8939](https://github.com/badlogic/pi-mono/issues/8939)

4. **跨模型生态的“适配面”还在快速扩张**  
   新模型上线快、provider 约束多，Pi 需要持续补齐路由规则、兼容参数和能力声明，否则会出现“能选但不可用”的体验落差。  
   代表：[#8978](https://github.com/badlogic/pi-mono/issues/8978)、[#8961](https://github.com/badlogic/pi-mono/issues/8961)、[#8941](https://github.com/badlogic/pi-mono/pull/8941)

如果你愿意，我也可以把这份日报再压缩成 **适合内部群发的 200 字版本**，或者整理成 **表格版（Issue/PR/影响面/优先级）**。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-09-02）

> 数据来源：`github.com/QwenLM/qwen-code`（过去 24 小时）

## 1) 今日速览
今天社区讨论重心集中在 **会话管理 / Web Shell / Daemon 稳定性**，同时也出现了多条围绕 **工具调用兼容性、CI/发布稳定性、性能优化** 的高优先级问题。  
从 PR 侧看，团队正在同步推进 **发布链路稳定化**、**OpenTUI 迁移**、**会话导航协议** 和 **输出样式/命令体系** 等方向，说明产品与基础设施都在加速收敛。  
此外，`v0.22.4-preview.0` 的发布失败也把 **质量门禁与发布环境抖动** 推到了台前。

---

## 2) 版本发布
- [cua-driver-rs-v0.20.3](https://github.com/QwenLM/qwen-code/releases/tag/cua-driver-rs-v0.20.3)  
  更新为 Qwen CUA Driver 预编译二进制包，覆盖：
  - macOS：codesigned + notarized universal binary + `QwenCuaDriver.app`
  - Linux：unsigned（x86_64 + arm64，glibc 2.31 floor）
  - Windows：unsigned UIAccess worker + native SDK payload（x86_64 + arm64）

---

## 3) 社区热点 Issues
以下挑选了过去 24 小时内最值得关注的 10 个 Issue：

1. [#10710 serve: reloading a session whose turn was killed mid-flight hides already-persisted assistant messages](https://github.com/QwenLM/qwen-code/issues/10710)  
   - 重要性：涉及 `qwen serve` 的会话恢复一致性，turn 中途被杀后，已落盘的 assistant 消息在重载时消失，属于数据可见性与状态同步问题。  
   - 社区反应：4 条评论，属于当前会话管理里讨论最活跃的题目之一。

2. [#10698 Build fails on Node 20 with ESM errors](https://github.com/QwenLM/qwen-code/issues/10698)  
   - 重要性：直接影响 Node 20 下的构建可用性，属于开发环境兼容问题。  
   - 社区反应：4 条评论，说明对新版 Node 适配的关注度较高。

3. [#10750 feat(web-shell): add session-wide turn navigation](https://github.com/QwenLM/qwen-code/issues/10750)  
   - 重要性：Web Shell 会话级 turn 导航是高价值交互能力，关系到长会话检索和历史定位。  
   - 社区反应：3 条评论，且已进入 in-progress，说明需求明确、推进较快。

4. [#10749 TUI scrolling loads previous prompts into the input instead of scrolling the conversation](https://github.com/QwenLM/qwen-code/issues/10749)  
   - 重要性：属于明显的交互回归，影响日常使用体验。  
   - 社区反应：3 条评论，说明复现路径清晰、用户感知强。

5. [#10716 Web Shell workflow follow-ups from PR #10594 review](https://github.com/QwenLM/qwen-code/issues/10716)  
   - 重要性：是 Web Shell 工作流收尾项集合，涉及代码收敛和交付稳定性。  
   - 社区反应：3 条评论，反映出审查后遗留项较多、需要持续整理。

6. [#10711 feat(channels): support /btw side questions](https://github.com/QwenLM/qwen-code/issues/10711)  
   - 重要性：增强 Channel 场景下的“旁路提问”能力，属于高频交互扩展。  
   - 社区反应：3 条评论，表明用户对不中断主任务的提问方式有明确需求。

7. [#10693 bug(core): image reads wedge OpenAI-compatible routes that reject the re-encoded JPEG data URL](https://github.com/QwenLM/qwen-code/issues/10693)  
   - 重要性：图片输入会让兼容 OpenAI 的路由直接卡死，影响多模态工作流。  
   - 社区反应：3 条评论，说明这类兼容性问题比较容易触发并影响实际使用。

8. [#10689 bug(core): "Model response contained a malformed tool call" repeatedly fails turns on kimi-k3 via OpenAI-compatible proxy](https://github.com/QwenLM/qwen-code/issues/10689)  
   - 重要性：长会话 + 第三方代理 + 工具调用异常，属于高风险组合问题。  
   - 社区反应：3 条评论，且指向真实代理兼容痛点。

9. [#10757 Release Failed for v0.22.4-preview.0 on 2026-09-02](https://github.com/QwenLM/qwen-code/issues/10757)  
   - 重要性：直接影响预览版发布流程，质量门禁失败会阻塞版本流转。  
   - 社区反应：虽然仅 1 条评论，但它触发了后续多条发布修复 PR，优先级很高。

10. [#10734 ci: the 1000 ms CPU budget in shellAstParser.test.ts is a wall-clock number applied to a CPU-time metric — deterministic red on GitHub-hosted runners](https://github.com/QwenLM/qwen-code/issues/10734)  
    - 重要性：属于典型的 CI 稳定性问题，且是“确定性红灯”。  
    - 社区反应：2 条评论，问题虽不大热，但对主干健康影响直接。

---

## 4) 重要 PR 进展
以下挑选了过去 24 小时内最值得关注的 10 个 PR：

1. [#10765 fix(ci): keep release validation off contended ECS hosts](https://github.com/QwenLM/qwen-code/pull/10765)  
   - 作用：把发布验证任务迁移到更稳定的 ECS 主机标签，目标是降低资源争用导致的失败。

2. [#10763 fix(cli): route the /output-style dialog in the OpenTUI registry](https://github.com/QwenLM/qwen-code/pull/10763)  
   - 作用：修复 OpenTUI 中 `/output-style` 对话路由缺失，恢复 build 可用性并补齐命令一致性。

3. [#10761 feat: load custom output styles from ~/.qwen/output-styles and .qwen/output-styles](https://github.com/QwenLM/qwen-code/pull/10761)  
   - 作用：支持用户级和项目级自定义输出样式，增强可配置性与团队协作能力。

4. [#10760 fix(release): cap Vitest workers in the quality_scripts lane (#10755)](https://github.com/QwenLM/qwen-code/pull/10760)  
   - 作用：限制 release 流水线中的 Vitest worker 数，降低并发抖动，提升质量脚本稳定性。

5. [#10759 fix(serve): keep the Conversations runtime outside the workspace registration limit](https://github.com/QwenLM/qwen-code/pull/10759)  
   - 作用：避免 daemon 侧 Conversations runtime 被误当作普通 workspace 占额，减少启动/发布受限问题。

6. [#10758 fix(ci): stabilize verify-capture fallback-grey test on fontless hosts (#10757)](https://github.com/QwenLM/qwen-code/pull/10758)  
   - 作用：修复无字体主机上的截图测试不稳定问题，正面回应发布失败。

7. [#10756 ci: split lint and static checks out of the Test job](https://github.com/QwenLM/qwen-code/pull/10756)  
   - 作用：把 lint/static 从 Test job 拆出去，减少测试任务耦合，提升 CI 可维护性。

8. [#10754 fix(web-shell): disable Push while the branch is behind its upstream](https://github.com/QwenLM/qwen-code/pull/10754)  
   - 作用：在分支落后 upstream 时禁用 Push，避免错误推送和状态不一致。

9. [#10751 feat(serve): add session turn navigation protocol](https://github.com/QwenLM/qwen-code/pull/10751)  
   - 作用：实现 session-wide turn navigation 的 daemon/SDK 协议基础，是 #10750 的第一阶段交付。

10. [#10739 feat(opentui): Activate the OpenTUI backend behind QWEN_TUI_RENDERER](https://github.com/QwenLM/qwen-code/pull/10739)  
    - 作用：OpenTUI 后端开始真正可启动，说明 ink→OpenTUI 迁移进入实装阶段。

---

## 5) 功能需求趋势
从所有 Issue 看，社区当前最关注的功能方向主要集中在以下几类：

- **会话管理与历史导航**  
  代表：[#10710](https://github.com/QwenLM/qwen-code/issues/10710)、[#10750](https://github.com/QwenLM/qwen-code/issues/10750)、[#10717](https://github.com/QwenLM/qwen-code/issues/10717)  
  关键词：turn 恢复、跨会话导航、session summary、可追溯性。

- **Web Shell / TUI 交互体验**  
  代表：[#10749](https://github.com/QwenLM/qwen-code/issues/10749)、[#10716](https://github.com/QwenLM/qwen-code/issues/10716)、[#10702](https://github.com/QwenLM/qwen-code/issues/10702)  
  关键词：滚动、表格编辑、工作流交付、界面细节。

- **Daemon / Channel / ACP 稳定性**  
  代表：[#10705](https://github.com/QwenLM/qwen-code/issues/10705)、[#10688](https://github.com/QwenLM/qwen-code/issues/10688)、[#10710](https://github.com/QwenLM/qwen-code/issues/10710)  
  关键词：权限请求、消息阻塞、队列背压、会话一致性。

- **模型兼容性与内容生成鲁棒性**  
  代表：[#10693](https://github.com/QwenLM/qwen-code/issues/10693)、[#10692](https://github.com/QwenLM/qwen-code/issues/10692)、[#10689](https://github.com/QwenLM/qwen-code/issues/10689)、[#10700](https://github.com/QwenLM/qwen-code/issues/10700)  
  关键词：OpenAI-compatible proxy、XML tool call、图像输入、malformed tool call。

- **构建 / 发布 / CI 稳定性**  
  代表：[#10698](https://github.com/QwenLM/qwen-code/issues/10698)、[#10734](https://github.com/QwenLM/qwen-code/issues/10734)、[#10757](https://github.com/QwenLM/qwen-code/issues/10757)  
  关键词：Node 20、测试预算、发布失败、runner 争用。

- **扩展能力与输出定制**  
  代表：[#10711](https://github.com/QwenLM/qwen-code/issues/10711)、[#10745](https://github.com/QwenLM/qwen-code/issues/10745)、[#10684](https://github.com/QwenLM/qwen-code/issues/10684)  
  关键词：`/btw`、编辑器可用性、自托管 memory、输出样式。

---

## 6) 开发者关注点
结合 issue 和 PR 的信号，开发者当前最明显的痛点有：

- **发布与 CI 的不稳定性仍是核心问题**  
  多个 PR 都在修复 release lane、test worker、无字体环境截图测试等问题，说明“能否稳定发版”是近期重点。  
  参考：[#10757](https://github.com/QwenLM/qwen-code/issues/10757)、[#10765](https://github.com/QwenLM/qwen-code/pull/10765)、[#10760](https://github.com/QwenLM/qwen-code/pull/10760)

- **Node / ESM / 工具链兼容仍存在摩擦**  
  Node 20 构建失败暴露了模块系统兼容成本，后续可能还会影响开发者本地环境。  
  参考：[#10698](https://github.com/QwenLM/qwen-code/issues/10698)

- **长会话、恢复、导航、持久化的一致性问题较集中**  
  包括 turn 被 kill 后消息丢失、session-wide navigation、summary 标题结构化等，说明“会话可恢复性”正在成为产品基础能力。  
  参考：[#10710](https://github.com/QwenLM/qwen-code/issues/10710)、[#10750](https://github.com/QwenLM/qwen-code/issues/10750)、[#10717](https://github.com/QwenLM/qwen-code/issues/10717)

- **模型输出的容错与协议兼容仍需加固**  
  工具调用格式、图片编码、代理兼容等问题，反映出不同模型/网关组合下的边界条件很多。  
  参考：[#10693](https://github.com/QwenLM/qwen-code/issues/10693)、[#10692](https://github.com/QwenLM/qwen-code/issues/10692)、[#10689](https://github.com/QwenLM/qwen-code/issues/10689)

- **Web Shell / TUI 的细节体验仍在持续打磨**  
  滚动、快捷键、表格编辑、输出样式、外部编辑器可用性等问题，说明交互层仍处于高频迭代期。  
  参考：[#10749](https://github.com/QwenLM/qwen-code/issues/10749)、[#10702](https://github.com/QwenLM/qwen-code/issues/10702)、[#10745](https://github.com/QwenLM/qwen-code/issues/10745)、[#10761](https://github.com/QwenLM/qwen-code/pull/10761)

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合发到群里的精简版**，或  
2. **适合周报/晨会的表格版**。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报  
**日期：2026-09-02**  
**数据来源：GitHub `github.com/Hmbown/DeepSeek-TUI`（更新视图中部分链接显示为 `Hmbown/CodeWhale`）**

---

## 1) 今日速览
今天社区动态的核心是 **TUI 体验的持续重构与细节打磨**：从布局、状态栏、工具输出、diff 展示到设置页与运行时行为，都在围绕“更像一个稳定可用的 AI 开发工作台”推进。  
另一方面，**runtime / fleet / model catalog** 等底层能力也在补齐，说明项目正在从“可用”向“可持续运行、可恢复、可管理”演进。  
今日没有新 Release，但 PR 更新非常活跃，整体以作者主导的功能落地和体验修复为主。

---

## 2) 版本发布
**无新 Releases。**

---

## 3) 社区热点 Issues
> 今日仅有 1 条 Issue 更新，因此热点以这条为核心。

### 1. [#5806] OpenDesign 兼容性：MCP 优先，原生运行时适配后续
- **链接**：[#5806](https://github.com/Hmbown/CodeWhale/issues/5806)
- **为什么重要**：这是一个面向生态扩展的需求，目标是让 DeepSeek TUI 能与 `nexu-io/open-design` 这类设计工作流工具协同，覆盖原型、deck、设计系统、导出等设计开发场景。
- **社区反应**：当前 **0 评论、0 👍**，说明还处于作者提案/功能探索阶段，尚未形成明显的社区讨论，但方向很值得关注，因为它可能打开“AI 编码代理 + 设计工作台”的新使用场景。
- **看点**：  
  - 先走 **MCP 集成**，降低接入门槛  
  - 后续考虑 **native runtime adapter**，意味着更深度的原生能力接入  
  - 指向“编码代理 CLI → 设计引擎”的扩展路线

---

## 4) 重要 PR 进展
> 今日共有 24 条 PR 更新，以下选取 10 条最值得关注的进展。

### 1. [#5816] runtime-api：重建持久化 goals，并由 host 接管续跑循环
- **链接**：[#5816](https://github.com/Hmbown/CodeWhale/pull/5816)
- **内容**：线程上的 goal 在主机重启后仍能恢复，并继续执行；`PUT /v1/threads/{id}/goal` 会把目标注入缓存引擎并触发后续 turn。
- **意义**：补强运行时可靠性，解决“进程重启后任务中断”的问题，是 agent 工作流可持续化的关键基础。

### 2. [#5815] fleet：用户添加的模型就是你的 fleet，且优先展示
- **链接**：[#5815](https://github.com/Hmbown/CodeWhale/pull/5815)
- **内容**：在 `/model` 中可通过 `⇧F` 将某个 provider+model route 加入 fleet，fleet 位置前置，强调用户自定义模型集合。
- **意义**：模型管理从“列表选择”升级为“个人 fleet”，更贴近多模型并行开发的真实需求。

### 3. [#5814] TUI：`/fullscreen` 与 `/inline` 支持运行时切换
- **链接**：[#5814](https://github.com/Hmbown/CodeWhale/pull/5814)
- **内容**：支持在普通终端与 alternate screen 间切换；`/inline` 保留 shell 回滚历史，`/fullscreen` 回到全屏模式。
- **意义**：这是典型的 TUI 体验增强，直接影响开发者的终端工作流。

### 4. [#5813] diff cards：高亮行内真正变化的词
- **链接**：[#5813](https://github.com/Hmbown/CodeWhale/pull/5813)
- **内容**：当某一行被替换时，diff 卡片会突出显示实际变动的词。
- **意义**：提升代码审阅和文本 diff 的可读性，属于“看得更快、更准”的细节优化。

### 5. [#5812] tool output 保留颜色
- **链接**：[#5812](https://github.com/Hmbown/CodeWhale/pull/5812)
- **内容**：工具输出不再剥离 ANSI 色彩，保留 cargo、git 等命令原始颜色。
- **意义**：对开发者非常实用，尤其是终端工具链依赖颜色表达状态时，信息密度和可读性都会显著提升。

### 6. [#5811] 信息行下移到 composer 下方
- **链接**：[#5811](https://github.com/Hmbown/CodeWhale/pull/5811)
- **内容**：会话事实行移动到 composer 下方作为最后一行，避免覆盖 transcript 上方区域。
- **意义**：改善信息层级，减少视觉干扰，让主对话内容更稳定。

### 7. [#5810] settings：统一 settings schema，`/settings` 只是它的投影
- **链接**：[#5810](https://github.com/Hmbown/CodeWhale/pull/5810)
- **内容**：重做 `/settings` 面板结构，包括 tabs、groups、label/value、description band 和 preview 行。
- **意义**：设置体系标准化，说明项目在向“可维护的大型配置面板”靠拢。

### 8. [#5809] work surface 默认位于 composer 下方
- **链接**：[#5809](https://github.com/Hmbown/CodeWhale/pull/5809)
- **内容**：tasks / agents / to-do 区域默认放到 composer 下方；支持配置与快捷切换。
- **意义**：这是明显的工作流改造，目标是让“工作区”与“输入区”更符合终端操作习惯。

### 9. [#5807] bundled model catalog 可再次变旧
- **链接**：[#5807](https://github.com/Hmbown/CodeWhale/pull/5807)
- **内容**：修复内置模型快照 TTL 过长导致的“永远看起来是最新”的问题，加入陈旧性判断。
- **意义**：这是模型管理的可信度修复，避免用户基于过期 catalog 做错误选择。

### 10. [#5799] tool cells 自带状态
- **链接**：[#5799](https://github.com/Hmbown/CodeWhale/pull/5799)
- **内容**：运行中、失败、警告等状态直接体现在 transcript 的 tool cell 中。
- **意义**：提升状态可见性，减少用户在上下文中来回判断工具执行情况的成本。

---

## 5) 功能需求趋势
从今日 Issues 和 PR 的方向看，社区最关注的功能趋势主要集中在以下几个方面：

1. **TUI 布局与交互可控性增强**
   - `/inline`、`/fullscreen`、work surface placement、信息行、footer、composer 等都在调整  
   - 说明用户希望终端 UI 更贴合个人工作流，而不是固定布局

2. **模型管理与多模型协同**
   - fleet、model catalog、staleness、route 管理是重点  
   - 用户不仅要“能用模型”，还要“能管理自己的模型集合”

3. **运行时可靠性与任务持续性**
   - runtime API、goal persistence、continuation loop、host-managed restart recovery  
   - 显示出对 agent 长任务、断点恢复、后台续跑的强需求

4. **工具输出与可观测性**
   - 保留 ANSI 颜色、tool cell 状态、diff 高亮  
   - 目标是让开发者更快判断命令执行结果和变化内容

5. **配置系统的结构化与可维护性**
   - settings schema 统一、配置面板投影化  
   - 反映出项目正在从“零散配置项”转向“标准配置模型”

6. **生态集成能力**
   - OpenDesign 兼容性、MCP、runtime adapter  
   - 暗示用户希望 DeepSeek TUI 不只是聊天/执行工具，而是可以嵌入更广泛的 AI 开发链路

---

## 6) 开发者关注点
今日反馈和代码推进中，最明显的痛点/高频需求有：

- **终端界面层级过乱**：信息行、footer、work surface、composer 的摆放反复调整，说明 UI 信息密度已经接近“需要重新规划”的阶段。
- **状态表达不够直观**：tool cell、diff、ANSI color、focus owner 相关修复都表明，开发者强烈依赖“看一眼就懂”的状态反馈。
- **长任务恢复能力不足**：runtime goal 持久化和续跑是典型需求，说明用户希望 agent 能像“后台任务”一样持续运行。
- **模型选择与管理成本高**：fleet 前置、catalog staleness 修复，说明多模型环境下“选什么、何时过期、如何切换”是核心问题。
- **配置与设置页可扩展性压力增大**：settings schema 重构意味着配置项正在快速膨胀，需要更强的组织结构。
- **生态接入需求上升**：OpenDesign/MCP 的出现表明，社区开始期待更强的外部工作流整合能力。

---

如果你愿意，我可以把这份日报进一步整理成：
1. **适合微信群/飞书的短版**，或  
2. **适合内部周报系统的 Markdown 表格版**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*