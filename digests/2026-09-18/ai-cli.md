# AI CLI 工具社区动态日报 2026-09-18

> 生成时间: 2026-09-18 03:43 UTC | 覆盖工具: 9 个

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

# AI CLI 工具生态横向对比分析报告｜2026-09-18

## 1. 生态全景

当前 AI CLI 工具正在从“单次命令行助手”快速演进为 **常驻型、多会话、多 Agent、多端协同的开发工作台**。  
今日社区反馈的主线高度一致：**会话恢复、长时间运行稳定性、Agent 可控性、MCP / ACP / Provider 兼容性、Windows / 桌面端可靠性** 成为关键竞争点。  
Claude Code、Codex、Qwen Code、OpenCode 等工具已经明显进入复杂工程场景，问题不再只来自模型能力，而更多来自 **认证、权限、上下文压缩、协议状态、桌面更新、工具调用生命周期** 等系统工程层面。  
同时，多模型和多 Provider 生态正在加速，各工具都在处理 OpenRouter、Bedrock、Azure、MCP、OAuth Gateway、自定义模型目录等兼容性问题。

---

## 2. 各工具活跃度对比

> 说明：下表基于用户提供的日报摘要统计，Issues / PR 数采用“过去 24 小时内摘要明确列出或提及的更新数量”。

| 工具 | 今日 Issues 数 | 今日 PR 数 | Release 情况 | 今日活跃特征 |
|---|---:|---:|---|---|
| Claude Code | 10+ | 1 | v2.1.275 / v2.1.276 | Remote Control、Agent 生命周期、模型安全误判集中爆发 |
| OpenAI Codex | 10+ | 10 | rust-v0.155.0 + 多个 alpha | 发布密集，桌面端、Windows、多 Provider、OAuth 网关高频迭代 |
| Gemini CLI | 4 | 10 | v0.62.0-nightly | Issue 数少但 PR 聚焦核心稳定性，会话恢复和 Windows PTY 是重点 |
| GitHub Copilot CLI | 9 | 0 | v1.0.86 | 以 Issue 反馈为主，会话管理、MCP 协议、Windows 崩溃突出 |
| Kimi Code CLI | 2 | 1 | 无 | 低频但问题集中在 subagent 认证、工具循环、配置一致性 |
| OpenCode | 10+ | 10 | 无 | 社区与开发侧都活跃，免费层鉴权、TUI、Provider、VS Code 集成并行推进 |
| Pi | 10 | 8 | 无 | Provider 容错、重试策略、上下文压缩、TUI 可定制性成熟推进 |
| Qwen Code | 10+ | 10 | desktop-v0.24.0 + nightly | Session / ACP / Web Shell / CI / 扩展机制高度活跃 |
| DeepSeek TUI | 22 | 2 | 无 | Issue 极活跃，Sub-agents、安全授权、Computer Use、测试隔离是主线 |

---

## 3. 共同关注的功能方向

### 3.1 会话恢复、长会话与常驻运行

多个工具都暴露出 session 生命周期问题，说明 AI CLI 已进入长期运行场景。

| 相关工具 | 具体诉求 |
|---|---|
| Claude Code | Remote Control token 过期后永久 401、桌面自动更新导致远程 session 断开 |
| Codex | macOS 无法创建 / 恢复聊天、Windows follow-up 消息挂起、provider-neutral sessions |
| Gemini CLI | `-r` 恢复会话时 tool result 重复发送，ACP session/load 恢复问题 |
| Copilot CLI | session id 能发现但无法恢复、长会话滚动位置异常、会话标题变随机 ID |
| Qwen Code | live session 删除破坏 transcript、`POST /session` 504、session export 数据错误 |
| OpenCode | TUI 会话历史侧栏、session 切换、自动压缩场景鉴权异常 |
| Pi | session 迁移无备份、session trace 可视化、指定 entry 打开 session |

**判断：**  
会话已经成为 AI CLI 的核心资产。未来工具竞争点会从“模型回答质量”扩展到 **session 可恢复、可迁移、可审计、可回放**。

---

### 3.2 Agent / Subagent 可控性与生命周期治理

Agent 能力增强后，用户更关注“是否可控、可停、可审计”。

| 相关工具 | 具体诉求 |
|---|---|
| Claude Code | Agent 被要求停止后仍继续运行，subagent persistent monitor 无法唤醒 |
| Gemini CLI | Agent 误删无关注释、subagent recovery 需保留真实终止原因 |
| Kimi Code | subagent OAuth token 获取超时，重复 tool-call 循环需要硬停止 |
| DeepSeek TUI | subagent 权限继承、session name 未释放、metrics 无真实数据源 |
| Qwen Code | background agent / live runtime 删除保护，Web Shell plan strip |
| OpenCode | Code Mode 子调用预览、MCP 工具注册同步 |
| Pi | `edit` 工具重叠匹配误编辑、Agent trace 可视化需求 |

**判断：**  
Agent 系统正在进入“工程治理阶段”。核心需求包括：

- 明确 stop reason；
- 用户停止指令优先；
- 子任务生命周期可观察；
- 工具调用可追踪；
- 防止重复调用和权限逃逸；
- 长任务计划可视化。

---

### 3.3 多 Provider / 多模型 / 网关兼容

多模型时代已成为现实，Provider 抽象层的质量直接影响用户体验。

| 相关工具 | 具体诉求 |
|---|---|
| Claude Code | `ANTHROPIC_BASE_URL` 代理回归、MCP OAuth discovery path 问题、User-Agent 隐私 |
| Codex | Bedrock 拒绝 `reasoning.summary`、OpenRouter tool name 超限、OAuth provider gateway |
| OpenCode | 自定义模型被隐藏、Provider 策略迁移到 settings、rate limit header 修复 |
| Pi | OpenRouter `baseUrl` 回归、Azure Foundry、Mistral / GLM reasoning dispatch |
| Qwen Code | OpenRouter attribution header、DeepSeek V4 alias token limit |
| DeepSeek TUI | ModelScope provider 支持、known-good-hosts 文档扩展 |
| Copilot CLI | GPT-6 Astra 企业模型目录缺失 |
| Kimi Code | OAuth token fetch 超时影响 subagent |

**判断：**  
Provider 兼容已经从“支持 OpenAI-compatible endpoint”升级为更复杂的问题：

- OAuth 登录与刷新；
- 模型目录一致性；
- provider-specific schema；
- tool name 限制；
- rate limit telemetry；
- context window normalization；
- 企业网关路径和 header 规范。

---

### 3.4 Windows / 桌面端 / 终端兼容性

Windows 和桌面端仍是多个工具的明显短板。

| 相关工具 | 具体诉求 |
|---|---|
| Claude Code | Windows MSIX 更新后无法启动，macOS 桌面自动更新打断 Remote Control |
| Codex | Windows follow-up 消息挂起、路径下划线转义错误、sandbox / WSL2 问题 |
| Gemini CLI | ConPTY 生命周期、Windows IDE detection、PTY buffer 内存管理 |
| Copilot CLI | Windows `copilot.exe` access violation 硬崩溃 |
| Qwen Code | Windows 路径 sanitizer 隐私问题 |
| DeepSeek TUI | MATE Terminal 闪烁、raw mode、终端选择复制问题 |
| OpenCode | Desktop 大附件卡死、后台服务启动失败 |

**判断：**  
AI CLI 正在承担复杂 TUI / Desktop / IDE 职责，跨平台稳定性成为生产可用性的底线。

---

### 3.5 权限、安全与审批模型

随着工具能读写文件、调用 shell、操作浏览器和 computer use，权限模型变得更关键。

| 相关工具 | 具体诉求 |
|---|---|
| Claude Code | Agent 停止指令失效、模型安全策略误判、User-Agent 泄露邮箱 |
| Codex | project trust 不应在无项目目录持久化、browser / Computer Use policy 误拦截 |
| DeepSeek TUI | verifier subagent 借 computer-use 绕过受限 shell |
| Qwen Code | shell Unicode whitespace 权限语义、ACP 权限队列限定 session |
| Copilot CLI | MCP 协议版本混用，extension hosts 周期性 reload |
| OpenCode | 免费层鉴权误判、订阅状态混乱 |
| Pi | provider error 结构化、tool provenance、rate-limit telemetry |

**判断：**  
工具能力越强，权限边界越重要。未来需要更精细的 **能力授权矩阵、审计日志、工具来源标记、用户审批策略、失败可解释性**。

---

## 4. 差异化定位分析

### Claude Code

**定位：** 高能力 Agent 型编码工具，重度依赖 Remote Control、Desktop、MCP、skills、hooks 等高级机制。  
**优势：**

- Agent / Subagent / Skill / MCP 能力丰富；
- 企业网关和代理场景使用较多；
- 用户正在进行复杂长期任务和远程控制。

**当前短板：**

- Remote Control 认证与在线状态稳定性不足；
- Agent 停止和生命周期控制存在风险；
- 模型安全误判对开发连续性影响明显。

**适合用户：**  
重度 Claude 用户、企业代理 / 网关环境、需要多 Agent 自动化和远程控制的团队。

---

### OpenAI Codex

**定位：** 快速迭代的 Rust-based CLI / App / IDE 编码平台，强调多模型、桌面端、TUI 和 provider gateway。  
**优势：**

- 发布节奏极快；
- OAuth provider gateway、Windows sandbox、环境策略等基础设施建设活跃；
- `/voice`、reasoning summaries、TUI 状态展示增强体验。

**当前短板：**

- Windows 和桌面 App 稳定性问题较多；
- 自定义 provider schema 兼容仍不稳定；
- 模型容量、配额、账号权限提示不够透明。

**适合用户：**  
OpenAI 生态深度用户、关注新模型与多 provider 的开发者、愿意接受快速迭代的早期采用者。

---

### Gemini CLI

**定位：** 稳定性导向的 Google Gemini 命令行 Agent，当前更聚焦核心会话、PTY、IDE companion 和文档准确性。  
**优势：**

- PR 质量集中，修复方向明确；
- 会话恢复、ConPTY、ACP、VS Code companion 等工程细节打磨较深；
- 文档与运行时事实对齐意识强。

**当前短板：**

- Issue 活跃度相对较低；
- Agent 编辑代码的最小变更约束仍需加强；
- 会话恢复中的 tool result replay 是核心 bug。

**适合用户：**  
Google Gemini 生态用户、重视 CLI 稳定性和 IDE companion 的开发者。

---

### GitHub Copilot CLI

**定位：** GitHub / Copilot 生态下的 CLI 编码助手，正在补齐自定义 Agent、MCP 和会话管理能力。  
**优势：**

- 与 GitHub Copilot 账户和企业模型目录天然集成；
- v1.0.86 增强了 custom agents 对仓库级指令的支持；
- 对 `AGENTS.md`、`copilot-instructions.md`、`CLAUDE.md` 的兼容有生态整合价值。

**当前短板：**

- 今日无 PR 更新，修复节奏暂不可见；
- 会话管理 UX 问题集中；
- MCP 协议版本协商和 Windows 硬崩溃较关键。

**适合用户：**  
GitHub Enterprise / Copilot 用户、希望在 GitHub 工作流中使用 CLI Agent 的团队。

---

### Kimi Code CLI

**定位：** 轻量但逐步 Agent 化的 Kimi CLI / Desktop 工具。  
**优势：**

- 问题量少，关注点集中；
- 正在处理重复 tool-call 循环等 Agent 运行时安全问题；
- 对 Desktop 配置与记忆能力有早期探索。

**当前短板：**

- 社区活跃度相对较低；
- subagent 认证容错不足；
- UI 状态、配置写入和服务端 feature gate 一致性仍需增强。

**适合用户：**  
Kimi 模型用户、关注中文生态和轻量 CLI / Desktop 体验的开发者。

---

### OpenCode

**定位：** 高度活跃的开源 AI 编码工作台，覆盖 Desktop、TUI、VS Code、Provider、自定义模型和 MCP。  
**优势：**

- PR 和 Issue 都非常活跃；
- TUI 会话历史、VS Code Activity Bar、深链、附件上传等产品体验推进快；
- Provider settings、rate limit、MCP 工具注册同步等平台化能力增强。

**当前短板：**

- 免费层 / 订阅 / Console Provider 鉴权问题集中；
- 桌面端异常状态提示不足；
- 非 UTF-8 文件编辑数据损坏风险需要严肃对待。

**适合用户：**  
希望使用开放、可扩展、多端 AI 编码工作台的开发者和团队。

---

### Pi

**定位：** 偏工程化、可扩展、Provider 兼容和 TUI 可定制的成熟 CLI Agent。  
**优势：**

- Provider 容错和重试机制处理细致；
- 对不规范网关、Retry-After、opaque 4xx 等真实世界问题响应快；
- TUI 可定制、扩展 API、结构化 telemetry 需求明确。

**当前短板：**

- 部分 Issue 被快速关闭或 no-action，用户诉求未必都会进入产品路线；
- 会话迁移安全、自动化失败信号、edit 工具确定性仍需关注。

**适合用户：**  
需要接入多 Provider、多云模型、自定义插件和 TUI 调优的高级用户 / 平台团队。

---

### Qwen Code

**定位：** 面向 CLI、Desktop、Web Shell、ACP、移动端和企业扩展的多端 Agent 平台。  
**优势：**

- Session / Web Shell / ACP / CI / extensions 全线活跃；
- 对长上下文模型、DeepSeek V4、structured metadata、Android export 等支持推进快；
- 服务化部署和企业扩展目录需求已显现。

**当前短板：**

- session 数据完整性问题较多；
- ACP stopReason、export UUID、live delete 等协议 / 数据语义仍需加固；
- CI 噪音和基础设施问题频繁。

**适合用户：**  
Qwen / DeepSeek 生态用户、需要 Web Shell、多端部署、ACP / IDE 集成和企业扩展机制的团队。

---

### DeepSeek TUI

**定位：** 强调 Sub-agents、Computer Use、安全授权和 TUI 的 DeepSeek 生态工具。  
**优势：**

- Issue 活跃度最高；
- 维护者正在主动推动授权模型重构；
- ModelScope provider、subagent result truncation 等生态和稳定性都有进展。

**当前短板：**

- Sub-agent 模块复杂度过高；
- 权限继承存在实际安全风险；
- 配置、文档、schema、运行时行为不一致问题较多；
- TUI 终端兼容性仍需打磨。

**适合用户：**  
关注 DeepSeek / 国产模型生态、多 Agent 实验、Computer Use 和权限模型研究的开发者。

---

## 5. 社区热度与成熟度

### 社区最活跃

| 工具 | 依据 |
|---|---|
| DeepSeek TUI | 22 个 Issue，围绕 Sub-agents、安全、Computer Use 的讨论密集 |
| OpenAI Codex | 多个 release + 10 个 PR + 10+ Issues，快速迭代明显 |
| Qwen Code | 2 个 release + 10+ Issues + 10 个 PR，多端和服务化方向活跃 |
| OpenCode | 10+ Issues + 10 个 PR，产品体验和底层平台并行推进 |
| Claude Code | 2 个 release，多个高影响 Issue，Remote Control 和 Agent 问题集中 |

### 快速迭代阶段

- **OpenAI Codex**：alpha 版本密集，Rust 侧基础设施快速变化。
- **Qwen Code**：Desktop、nightly、Web Shell、ACP、移动端、CI 同时推进。
- **OpenCode**：TUI、Desktop、VS Code、Provider settings、MCP 并行扩展。
- **DeepSeek TUI**：Sub-agents 和安全模型仍在快速重构期。

### 相对成熟 / 工程打磨阶段

- **Pi**：问题集中在 Provider 容错、重试、TUI 调优、扩展 telemetry，显示已有较完整架构，当前更多是精细化工程优化。
- **Gemini CLI**：Issue 数不多，但 PR 聚焦核心稳定性，说明项目更偏维护和硬化。
- **Claude Code**：功能成熟度高，但复杂使用场景正在暴露稳定性和边界问题。
- **Copilot CLI**：产品已经进入 v1.x，但今日缺少 PR 响应，社区反馈集中在会话和协议稳定性。

### 早期或低频活跃

- **Kimi Code CLI**：今日数据量最少，但问题方向集中，仍处于 Agent 可靠性和 Desktop 配置一致性补强阶段。

---

## 6. 值得关注的趋势信号

### 趋势一：AI CLI 正在从“命令行工具”变成“长期运行的 Agent Runtime”

Remote Control、Web Shell、Desktop、ACP、MCP、session restore、background agent 等问题说明，AI CLI 已不再是一次性 prompt 工具。  
开发者应关注：

- session 数据模型；
- 断线重连；
- token refresh；
- transcript 持久化；
- live runtime 保护；
- 自动更新不中断任务。

**代表工具：** Claude Code、Qwen Code、Codex、Copilot CLI、OpenCode。

---

### 趋势二：Agent 可控性成为信任基础

今天多起问题涉及 Agent 不停止、subagent 权限继承、重复 tool-call、误删注释、错误报告成功状态。  
未来高质量 Agent 工具需要具备：

- 明确的 stop reason；
- 用户中止优先级；
- 子任务生命周期状态机；
- 工具调用审计；
- 计划执行可视化；
- 重复调用保护；
- 最小化代码 diff 策略。

**代表工具：** Claude Code、DeepSeek TUI、Gemini CLI、Kimi Code、OpenCode、Pi。

---

### 趋势三：多 Provider 兼容是核心基础设施，不是附加功能

Bedrock、OpenRouter、Azure Foundry、ModelScope、企业 OAuth Gateway、自定义 API Proxy 的问题大量出现。  
这说明开发者不希望被单一模型绑定，而希望 CLI 能成为统一 Agent 前端。

开发者选型时应重点评估：

- provider schema 适配能力；
- OAuth / token refresh；
- model catalog 准确性；
- context limit normalization；
- rate limit 展示；
- gateway / proxy 兼容；
- provider-specific metadata 暴露。

**代表工具：** Codex、OpenCode、Pi、Qwen Code、Claude Code、DeepSeek TUI。

---

### 趋势四：权限、安全和隐私将成为企业采用门槛

今天的反馈包括：

- User-Agent 泄露邮箱；
- subagent 借 computer-use 绕过 shell 限制；
- project trust 持久化边界；
- Windows 路径 sanitizer 泄露；
- MCP 协议状态混用；
- 模型安全分类器误判合法任务。

对企业用户而言，AI CLI 必须具备：

- 最小权限原则；
- 可配置审批策略；
- 工具调用审计；
- 结构化错误和日志；
- 隐私字段 scrub；
- 安全策略误判申诉或降级机制。

**代表工具：** Claude Code、DeepSeek TUI、Codex、Qwen Code、Copilot CLI。

---

### 趋势五：Windows、Desktop、TUI 体验成为生产力瓶颈

多个工具都在 Windows / 桌面端 / 终端兼容上遇到问题。  
AI CLI 现在承担了复杂 UI 职责，包括：

- diff preview；
- hyperlink 点击；
- scroll restoration；
- file attachments；
- terminal focus；
- PTY 生命周期；
- desktop auto-update；
- browser / computer use。

开发者选型时不应只看模型能力，也要测试目标平台上的长期稳定性。

**代表工具：** Codex、Claude Code、Gemini CLI、Copilot CLI、OpenCode、DeepSeek TUI。

---

### 趋势六：上下文压缩和 token accounting 正在成为关键能力

长上下文模型普及后，问题集中在：

- compaction summary 过大；
- reasoning-only message 膨胀；
- repeated `finish_reason=length`；
- context allowance 消耗过快；
- cacheRead 计数错误；
- DeepSeek V4 1M token limit normalization。

未来工具需要提供：

- per-turn token breakdown；
- compaction 可观察性；
- 截断原因准确表达；
- 模型 context window 正确识别；
- usage / quota 可解释性。

**代表工具：** Codex、Pi、Qwen Code、OpenCode、Claude Code。

---

## 综合判断

从今日动态看，AI CLI 工具生态已经进入 **平台化和工程化竞争阶段**。  
领先工具不再只是比拼模型接入，而是在比拼：

1. 长会话与常驻运行可靠性；
2. Agent / Subagent 生命周期治理；
3. 多 Provider 和企业网关兼容；
4. 权限、安全、隐私和审计能力；
5. Desktop / TUI / IDE / Web Shell 多端体验；
6. token、上下文压缩与用量透明度。

对技术决策者而言，选型时建议不要只看模型能力或单次 demo 效果，而应重点验证：

- 是否支持稳定 session 恢复；
- Agent 是否可中断、可审计；
- 是否适配企业代理、OAuth、MCP / ACP；
- Windows / macOS / Linux 目标平台是否稳定；
- Provider 切换和模型目录是否透明；
- 权限和隐私策略是否满足团队治理要求。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告  
数据截止：2026-09-18  
说明：PR 列表标称“按评论数排序”，但评论数字段为 `undefined`，以下以给定排序、更新时间、关联 Issue 与议题热度综合判断关注度。

---

## 1. 热门 Skills 排行

### 1. `skill-creator` 修复与评估稳定性  
- PR：[#1298](https://github.com/anthropics/skills/pull/1298) / [#1769](https://github.com/anthropics/skills/pull/1769)  
- 状态：Open  
- 功能：修复 Skill Creator 的触发评估问题，包括 Windows 子进程兼容、运行时失败误判、触发召回率恒为 0% 等问题。  
- 社区热点：  
  - Skill 触发评估长期不可靠，影响 Skill 作者调优描述与触发条件。  
  - 关联 Issue [#556](https://github.com/anthropics/skills/issues/556) 评论活跃，社区普遍关心“为什么 Skill 永远不触发”。  
- 判断：这是当前最核心的基础设施类热点，直接影响所有 Skill 的创建、测试与质量验证。

---

### 2. `proofcore-contract-auditor`：智能合约审计与链上存证  
- PR：[#1771](https://github.com/anthropics/skills/pull/1771)  
- 状态：Open  
- 功能：面向 Web3 开发者，对 Solidity / Rust 智能合约进行静态分析，并通过 ProofCore 协议将审计证明锚定到 TON 区块链。  
- 社区热点：  
  - 结合安全审计、Web3、链上可验证证明。  
  - 属于较强垂直行业 Skill，体现社区从通用工具转向专业化 Agent Skill。  
- 判断：若审核通过，可能成为安全与区块链方向的代表性 Skill。

---

### 3. `md2video-audio`：Markdown 转视频与语音旁白  
- PR：[#1703](https://github.com/anthropics/skills/pull/1703)  
- 状态：Open  
- 功能：将 Markdown 文档转换为带幻灯片和人声旁白的 MP4 视频。  
- 社区热点：  
  - 文档内容再利用、培训材料生成、演示视频自动化。  
  - 与 Marp、TTS、视频合成等工具链结合，覆盖内容生产场景。  
- 判断：契合“文档 → 多媒体交付”的高频需求，具有较强实用性。

---

### 4. `mcp-builder` 修复与升级  
- PR：[#1742](https://github.com/anthropics/skills/pull/1742) / [#1724](https://github.com/anthropics/skills/pull/1724)  
- 状态：Open  
- 功能：  
  - 支持 `mcp>=2` 的 `streamable_http_client` 新导入路径与自定义 HTTP headers。  
  - 将默认评估模型更新为 `claude-sonnet-5`。  
- 社区热点：  
  - MCP 与 Skills 的边界和互操作持续受关注。  
  - 关联 Issue [#1390](https://github.com/anthropics/skills/issues/1390)、[#16](https://github.com/anthropics/skills/issues/16) 反映社区希望 Skills 能更稳定地连接 MCP 工具生态。  
- 判断：MCP 相关 Skill 是生态扩展的关键基础设施，短期内会持续活跃。

---

### 5. `docx` / Office 文档质量与红线修复  
- PR：[#1734](https://github.com/anthropics/skills/pull/1734) / [#541](https://github.com/anthropics/skills/pull/541) / [#1765](https://github.com/anthropics/skills/pull/1765)  
- 状态：Open  
- 功能：  
  - 检测孤立 DOCX 评论。  
  - 避免 tracked changes 与 bookmark 的 `w:id` 冲突导致文档损坏。  
  - 修复 DOCX / PPTX / XLSX redlining validator 在非 UTF-8 环境下的编码问题。  
- 社区热点：  
  - 企业文档编辑、审阅、红线对比、跨平台兼容性。  
  - Office 文档生成质量是 Claude Code Skills 的核心生产力场景之一。  
- 判断：文档类 Skill 需求稳定且刚性，修复类 PR 落地价值高。

---

### 6. `pyxel`：复古游戏开发 Skill  
- PR：[#525](https://github.com/anthropics/skills/pull/525)  
- 状态：Open  
- 功能：支持使用 Python / Pyxel 创建、调试、验证复古游戏，包含 headless 运行、帧检查、状态校验等流程。  
- 社区热点：  
  - AI 辅助游戏开发、可视化验证、自动化调试。  
  - 从“写代码”扩展到“运行与验证交互式程序”。  
- 判断：偏创意开发方向，但技术完整度较高，适合作为可验证生成式编程案例。

---

### 7. `document-typography`：文档排版质量控制  
- PR：[#514](https://github.com/anthropics/skills/pull/514)  
- 状态：Open  
- 功能：检测并修复 AI 生成文档中的排版问题，如孤行、寡行、编号错位等。  
- 社区热点：  
  - 生成文档“内容正确但交付质量不足”的痛点。  
  - 与 DOCX / PDF / Office Skill 形成互补。  
- 判断：面向企业报告、提案、正式文档场景，属于高实用性增强 Skill。

---

### 8. `Hivemind`：零成本多 Agent 编排  
- PR：[#1628](https://github.com/anthropics/skills/pull/1628)  
- 状态：Open  
- 功能：让 Claude Code 将机械性任务委派给基于免费模型的 headless opencode workers，Claude 保留规划、审查、合并角色。  
- 社区热点：  
  - 多 Agent 编排、成本优化、上下文节省。  
  - 与 Issue [#1329](https://github.com/anthropics/skills/issues/1329) 中的 compact-memory 等长期上下文管理诉求方向一致。  
- 判断：如果安全边界和执行模型设计成熟，可能成为高级 Agent 工作流的重要方向。

---

## 2. 社区需求趋势

### 趋势一：Skill 安全、命名空间与信任边界  
- 代表 Issue：[#492](https://github.com/anthropics/skills/issues/492)  
- 需求：明确区分官方 Skill 与社区 Skill，避免社区 Skill 使用 `anthropic/` 命名空间造成信任混淆。  
- 含义：社区最强烈的担忧不是“能不能写 Skill”，而是“如何安全地分发、安装和授权 Skill”。

---

### 趋势二：组织级 Skill 分发与共享  
- 代表 Issue：[#228](https://github.com/anthropics/skills/issues/228)  
- 需求：支持组织内部 Skill Library、共享链接、集中管理，而不是手动下载和上传 `.skill` 文件。  
- 含义：Skills 正从个人扩展能力走向团队级资产管理。

---

### 趋势三：Skill 触发、评估与质量验证  
- 代表 Issue：[#556](https://github.com/anthropics/skills/issues/556)、[#202](https://github.com/anthropics/skills/issues/202)  
- 需求：改进 `skill-creator`、`run_eval.py`、触发召回率、Skill 描述质量和最佳实践。  
- 含义：社区希望拥有可重复、可量化的 Skill 测试流程，而不是靠人工试错。

---

### 趋势四：MCP 与 Skills 的互操作  
- 代表 Issue：[#16](https://github.com/anthropics/skills/issues/16)、[#1390](https://github.com/anthropics/skills/issues/1390)、[#29](https://github.com/anthropics/skills/issues/29)  
- 需求：将 Skills 暴露为 MCP，或让 Skills 更好地调用 MCP / Bedrock / 外部工具生态。  
- 含义：社区期待 Skills 成为可组合的 Agent 软件接口，而不只是提示词包。

---

### 趋势五：上下文窗口与 Token 成本控制  
- 代表 Issue：[#1487](https://github.com/anthropics/skills/issues/1487)、[#1329](https://github.com/anthropics/skills/issues/1329)  
- 需求：避免 Skill 注入过多上下文，支持 compact-memory、延迟加载、按需引用。  
- 含义：随着 Skills 变复杂，Token 经济性和上下文管理成为刚性需求。

---

### 趋势六：文档、Office 与企业内容工作流  
- 代表 PR：[#514](https://github.com/anthropics/skills/pull/514)、[#541](https://github.com/anthropics/skills/pull/541)、[#1734](https://github.com/anthropics/skills/pull/1734)、[#1765](https://github.com/anthropics/skills/pull/1765)  
- 需求：更可靠地生成、审阅、修复 DOCX / PDF / Office 文档。  
- 含义：企业文档自动化仍是 Skills 最稳定的应用场景之一。

---

## 3. 高潜力待合并 Skills

### `md2video-audio`  
- PR：[#1703](https://github.com/anthropics/skills/pull/1703)  
- 状态：Open  
- 潜力：覆盖内容生产、培训视频、知识库转课件等高频场景，落地价值清晰。

### `proofcore-contract-auditor`  
- PR：[#1771](https://github.com/anthropics/skills/pull/1771)  
- 状态：Open  
- 潜力：Web3 安全审计场景专业度高，若安全与依赖边界审核通过，可能成为垂直行业 Skill 样板。

### `pyxel`  
- PR：[#525](https://github.com/anthropics/skills/pull/525)  
- 状态：Open  
- 潜力：将代码生成、运行验证和视觉检查结合，适合作为 AI 游戏开发工作流示范。

### `document-typography`  
- PR：[#514](https://github.com/anthropics/skills/pull/514)  
- 状态：Open  
- 潜力：解决 AI 生成文档的“最后一公里”质量问题，企业用户价值明显。

### `Hivemind`  
- PR：[#1628](https://github.com/anthropics/skills/pull/1628)  
- 状态：Open  
- 潜力：多 Agent、低成本执行、上下文节省是高级 Claude Code 用户关注方向，但需要重点审查安全与任务隔离。

### `buffer-api`  
- PR：[#1627](https://github.com/anthropics/skills/pull/1627)  
- 状态：Open  
- 潜力：面向社媒发布、排程、分析的 Agent Skill，适合营销自动化和运营工作流。

### `scnet-hpc`  
- PR：[#1615](https://github.com/anthropics/skills/pull/1615)  
- 状态：Open  
- 潜力：面向 HPC 集群、SSH、Slurm 工作流，代表科研计算和高性能计算方向的专业化需求。

---

## 4. Skills 生态洞察

当前 Claude Code Skills 社区最集中的诉求是：**让 Skills 从“可编写的提示词扩展”进化为“可信、可评估、可共享、可组合的 Agent 工作流组件”。**

---

# Claude Code 社区动态日报｜2026-09-18

## 1. 今日速览

过去 24 小时 Claude Code 连续发布 **v2.1.275 / v2.1.276**，其中 v2.1.276 主要修复了 v2.1.275 引入的代理 / 网关场景下请求全部失败的严重回归。  
社区反馈集中在 **Remote Control 稳定性、认证刷新、桌面端自动更新、Agent / Subagent 可控性、模型安全策略误判** 等方向，说明近期 Claude Code 的复杂运行形态正在暴露更多边界问题。

---

## 2. 版本发布

### v2.1.276

链接：<https://github.com/anthropics/claude-code/releases/tag/v2.1.276>

**核心修复：**

- 修复 v2.1.275 回归问题：当 `ANTHROPIC_BASE_URL` 指向代理或网关时，所有请求都会失败并返回类似：
  - `400 … Input tag 'advisor_20260301'`
- 该问题影响使用企业网关、API Proxy、自建 Gateway 的用户，属于高优先级兼容性修复。

### v2.1.275

链接：<https://github.com/anthropics/claude-code/releases/tag/v2.1.275>

**主要变化：**

- Claude apps gateway 登录流程新增账号确认：
  - 当 gateway 返回账号信息时，用户需要确认后再保存凭据。
  - `/status` 现在会展示已登录账号。
- 新增“立即发送”快捷键：
  - `Ctrl + Enter`
  - `Ctrl + X` 后 `Ctrl + S`
- 该快捷键可中断当前 turn，并立即发送所有已排队消息。

---

## 3. 社区热点 Issues

### 1. Remote Control token 刷新失败后永久 401

Issue：<https://github.com/anthropics/claude-code/issues/95262>

**重要性：高**

长时间运行的 `claude remote-control` 会在进程启动时缓存 OAuth 凭据。一旦 access token 过期且刷新失败，该 session 会永久返回 401，且 `/login` 无法重新接入已有进程。  
这直接影响 Remote Control 的长期可用性，尤其是移动端远程控制、常驻会话和企业网关场景。

**社区反应：**已有评论，属于明确可复现的认证生命周期问题。

---

### 2. Remote Control 能接收跨会话消息，但用户输入显示 offline

Issue：<https://github.com/anthropics/claude-code/issues/95254>

**重要性：高**

用户在手机端 Remote Control 查看 Claude session 时，能够看到其他 session 发来的消息，但自己发送消息时却提示：

> Remote control session is offline.

这表明 Remote Control 的连接状态判断可能在输入通道和消息接收通道之间不一致。

**社区反应：**已有评论，和 #95262 一起表明 Remote Control 是今日最集中的问题区域之一。

---

### 3. 桌面端自动更新导致 Remote Control 连接全部断开

Issue：<https://github.com/anthropics/claude-code/issues/95276>

**重要性：高**

macOS 桌面应用在托管 Remote Control session 时发生静默自动更新并重启，导致所有远程连接断开。  
对依赖 Claude Desktop 托管会话、再通过手机或其他设备远程操作的用户影响明显。

**社区反应：**暂无评论，但问题描述完整，影响面较广。

---

### 4. Agent 被要求停止后仍继续运行

Issue：<https://github.com/anthropics/claude-code/issues/95277>

**重要性：高**

VSCode 扩展中，Claude Code 通过 Playwright MCP 启动多个后台 agent，并打开可见浏览器窗口。用户多次明确要求停止后，agent 仍继续运行，且 assistant 错误确认已经终止。  
这涉及 Agent 控制权、MCP 工具执行边界和用户中止指令的优先级。

**社区反应：**暂无评论，但安全性和用户信任影响较大。

---

### 5. 子 Agent 完成后无法被自己的 persistent Monitor 事件唤醒

Issue：<https://github.com/anthropics/claude-code/issues/95279>

**重要性：中高**

子 Agent 在 turn 结束时留下 `Monitor(persistent: true)`，但后续 monitor 事件触发后，已完成的 subagent 没有被重新唤醒。  
这会影响长任务监听、异步自动化、后台工作流编排等高级 Agent 场景。

**社区反应：**暂无评论，但带有 repro，适合工程团队快速定位。

---

### 6. Skill frontmatter 中 `once: true` hook 未生效

Issue：<https://github.com/anthropics/claude-code/issues/95280>

**重要性：中高**

Windows 上，skill frontmatter 声明的 `PreToolUse` hook 即使设置 `once: true`，成功执行后仍会在后续匹配 tool call 中继续触发。  
这会导致技能中的一次性初始化、校验或授权逻辑重复执行，影响 hooks 的可预测性。

**社区反应：**暂无评论，但具备 repro，且涉及 hooks / skills 组合能力。

---

### 7. MCP OAuth discovery 未遵循 RFC 8414 path-based URL

Issue：<https://github.com/anthropics/claude-code/issues/95270>

**重要性：中高**

Claude Code 在发现 MCP connector 的 Authorization Server metadata 时，使用了裸路径：

```js
new URL('/.well-known/oauth-authorization-server', issuerUrl)
```

当 issuer 包含路径，例如 `https://gateway.example.com/github` 时，该实现会丢弃 path，导致 discovery URL 错误。  
这会影响多租户 OAuth gateway、路径隔离的 MCP 服务和企业集成。

**社区反应：**暂无评论，但问题描述具体、协议依据明确。

---

### 8. Windows MSIX 自动更新后无法启动

Issue：<https://github.com/anthropics/claude-code/issues/95266>

**重要性：中高**

Windows 11 上，桌面应用自动更新后重新启动失败，报错：

```text
0x80070020
The process cannot access the file because it is being used by another process
```

用户怀疑旧 app container 仍处于挂载状态，但没有进程显式持有。  
这是桌面端分发和自动更新链路中的关键可靠性问题。

**社区反应：**暂无评论，但属于阻断型问题。

---

### 9. 模型安全策略误判合法任务

Issues：

- 科学计算任务被拦截：<https://github.com/anthropics/claude-code/issues/95281>
- Opus 5 reasoning_extraction 全量误拦截：<https://github.com/anthropics/claude-code/issues/95275>
- 私有安全工具扫描被 cyber 策略阻断：<https://github.com/anthropics/claude-code/issues/95271>
- 代码 / 安全任务被 Fable 5.1 拦截：<https://github.com/anthropics/claude-code/issues/95267>
- 隐喻表达被误判为生物安全风险：<https://github.com/anthropics/claude-code/issues/95265>

**重要性：高**

今日有多条 Issue 指向模型安全分类器误判，涉及科学计算、私有代码审计、网络安全、普通编码和自然语言表达。  
这类问题虽然部分属于 API / 模型侧，但对 Claude Code 用户体验影响直接：会中断任务、浪费 token，并导致无法保存工作上下文。

**社区反应：**多条 duplicate / needs-repro 标签，说明该问题已有集中反馈。

---

### 10. 用户邮箱被写入外部服务 User-Agent header

Issue：<https://github.com/anthropics/claude-code/issues/95258>

**重要性：高**

用户报告账户元数据中的邮箱地址被意外发送到外部服务的 `User-Agent` header 中。  
如果属实，这是隐私和数据最小化方面的敏感问题，尤其影响企业环境、合规要求较高的用户和代理链路。

**社区反应：**暂无评论，但安全 / 隐私优先级较高，值得持续跟踪。

---

## 4. 重要 PR 进展

过去 24 小时仅有 1 条 PR 更新。

### 1. `mods/diff`：调整 `openPane` 返回类型以兼容新的 UI host contract

PR：<https://github.com/anthropics/claude-code/pull/95198>

**状态：Open**

**内容概述：**

- 将 diff mod 中 `openPane` 的返回类型从 `Promise<void>` 调整为 `Promise<unknown>`。
- 原因是 `$.ui.open` 即将返回一个小型结果对象。
- 当前调用方并不会读取该返回值，因此行为不变。
- 该修改主要用于兼容当前和下一版 engine typings。

**影响：**

这是一个偏基础设施 / 类型兼容性的改动，短期用户无感，但有助于后续 UI API 演进，降低扩展模块在类型层面的破坏性变更风险。

---

## 5. 功能需求趋势

### 1. Remote Control 稳定性与可恢复性

相关 Issues：

- <https://github.com/anthropics/claude-code/issues/95262>
- <https://github.com/anthropics/claude-code/issues/95254>
- <https://github.com/anthropics/claude-code/issues/95259>
- <https://github.com/anthropics/claude-code/issues/95276>
- <https://github.com/anthropics/claude-code/issues/95263>

用户正在将 Remote Control 用于长时间运行、移动端接管、多设备协同等场景，因此对以下能力诉求增强：

- token 过期后的自动恢复
- session 在线状态一致性
- 远程输入链路可靠性
- 桌面端更新时不中断远程连接
- Remote Control session 能正确继承 CLI 更新和模型能力

---

### 2. Agent / Subagent 的可控性与可观测性

相关 Issues：

- <https://github.com/anthropics/claude-code/issues/95277>
- <https://github.com/anthropics/claude-code/issues/95279>
- <https://github.com/anthropics/claude-code/issues/95273>
- <https://github.com/anthropics/claude-code/issues/95257>
- <https://github.com/anthropics/claude-code/issues/95274>
- <https://github.com/anthropics/claude-code/issues/95260>

趋势非常明显：用户不只需要 Agent 自动执行，还需要 Agent 能严格遵守：

- 停止指令
- 用户授权边界
- 任务计划
- 子任务生命周期
- 后台任务状态展示
- token / quota 使用约束

---

### 3. 模型选择与安全策略精细化

相关 Issues：

- <https://github.com/anthropics/claude-code/issues/95281>
- <https://github.com/anthropics/claude-code/issues/95275>
- <https://github.com/anthropics/claude-code/issues/95271>
- <https://github.com/anthropics/claude-code/issues/95267>
- <https://github.com/anthropics/claude-code/issues/95265>
- <https://github.com/anthropics/claude-code/issues/95263>

用户希望 Claude Code 在开发场景中减少误杀，尤其是：

- 科学计算
- 私有安全工具分析
- 合法代码审计
- 模型别名 / 新模型可用性
- Remote Control 与 CLI 之间的模型能力一致性

---

### 4. 桌面端与 Windows 体验改进

相关 Issues：

- <https://github.com/anthropics/claude-code/issues/95266>
- <https://github.com/anthropics/claude-code/issues/95264>
- <https://github.com/anthropics/claude-code/issues/95261>
- <https://github.com/anthropics/claude-code/issues/95255>
- <https://github.com/anthropics/claude-code/issues/95278>
- <https://github.com/anthropics/claude-code/issues/95269>

Windows 和桌面端反馈集中在：

- 自动更新可靠性
- UI 元素缺失
- 文件预览能力退化
- PowerShell 窗口可见性
- Telemetry 环境变量继承
- 文件附件卡片下载按钮缺失

---

### 5. Hooks、Skills 与 MCP 企业集成

相关 Issues：

- <https://github.com/anthropics/claude-code/issues/95280>
- <https://github.com/anthropics/claude-code/issues/95270>
- <https://github.com/anthropics/claude-code/issues/95268>
- <https://github.com/anthropics/claude-code/issues/95253>

社区正在更深入使用 Claude Code 的可扩展机制：

- Skill frontmatter hooks
- `PreToolUse`
- `PermissionRequest`
- MCP OAuth
- Slash command / skill menu
- 主机侧工具调用证明与审计

这说明 Claude Code 已被用于更复杂的团队自动化和企业治理场景。

---

## 6. 开发者关注点

### 1. “长时间运行”的可靠性正在成为核心问题

Remote Control、desktop auto-update、token refresh、session offline 等问题说明用户不再只把 Claude Code 当作一次性 CLI，而是作为常驻开发代理使用。  
因此，session 恢复、认证续期、断线重连和后台任务治理会越来越关键。

### 2. 用户希望 Agent 更“听话”

多条反馈都指向 Agent 忽略停止指令、偏离计划、擅自启动 subagent、消耗 quota。  
开发者的核心诉求是：Agent 不仅要强，还要可控、可中断、可审计。

### 3. 安全分类器误判影响开发连续性

模型 safeguards 的误报正在影响科学计算、安全研究、私有代码扫描等合法开发任务。  
用户关注的不只是“能不能回答”，还包括：

- 已消耗 token 如何处理
- 中断后如何保存上下文
- 是否能区分私有仓库安全分析与攻击性任务
- 是否有更明确的申诉 / 降级 / 解释机制

### 4. 企业集成需要更强的协议兼容性

MCP OAuth discovery、gateway sign-in、`ANTHROPIC_BASE_URL` proxy regression、User-Agent 隐私问题都说明企业用户正在通过代理、网关和自定义身份系统接入 Claude Code。  
这要求 Claude Code 对 OAuth、HTTP header、metadata、telemetry 和 API gateway 有更严格的兼容性测试。

### 5. 桌面端自动更新需要更透明

macOS 和 Windows 都出现了与自动更新相关的问题。  
对开发工具而言，静默更新如果导致 session 中断或应用无法启动，会严重影响信任。社区可能会期待：

- 可配置的更新策略
- 更新前提醒
- Remote Control session 存在时延迟重启
- Windows MSIX 更新锁问题修复
- 更新失败后的恢复机制

---

## 总结

今日 Claude Code 的主线是：**版本快速修复 + Remote Control / Agent 生命周期问题集中暴露 + 模型安全策略误判持续发酵**。  
v2.1.276 及时修复了代理 / 网关请求失败的回归，但社区反馈显示，Claude Code 在常驻运行、企业网关、多 Agent 协作和桌面端自动更新等复杂场景下仍有较多可靠性问题需要持续打磨。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报  
**日期：2026-09-18**  
**仓库：** https://github.com/openai/codex

## 1. 今日速览

过去 24 小时 Codex Rust 版本发布节奏非常密集，正式版 **0.155.0** 与多个 alpha 版本同步出现，重点新增了实验性 `/voice` 对话、TUI 实时 reasoning 摘要与完成时间展示等能力。  
社区反馈主要集中在 **桌面 App 稳定性、Windows/macOS 平台回归、模型可用性与容量限制、用量消耗过快、自定义模型/第三方 provider 兼容性** 等方向。  
PR 侧则大量围绕 **环境选择一致性、Windows sandbox、MCP 策略、OAuth/provider 网关、插件缓存、网络策略校验** 等底层能力进行修复和重构。

---

## 2. 版本发布

### rust-v0.155.0  
链接：https://github.com/openai/codex/releases/tag/rust-v0.155.0

本次正式版本包含较明显的交互体验升级：

- 新增实验性 `/voice` 对话能力，支持实时转录与麦克风控制，需要在支持的构建中通过 `/experimental` 启用。
- TUI 状态栏开始展示实时 reasoning summaries。
- 成功完成 turn 后展示 completion timestamp。
- 从相关 PR 编号看，本轮发布与语音交互、TUI 可观测性、交互反馈增强有关。

### alpha 版本连续发布

过去 24 小时还出现多个 Rust alpha 版本：

- rust-v0.155.0-alpha.9.2  
  https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.9.2
- rust-v0.156.0-alpha.1  
  https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.1
- rust-v0.155.0-alpha.18  
  https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.18
- rust-v0.155.0-alpha.17  
  https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.17
- rust-v0.155.0-alpha.16  
  https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.16

**观察：** alpha 版本密集说明 Codex Rust 侧仍处于快速迭代期，尤其是桌面 App、CLI、环境管理、模型 provider 集成相关能力仍在高频修复。

---

## 3. 社区热点 Issues

### 1. macOS 更新后无法创建或恢复聊天  
Issue：https://github.com/openai/codex/issues/46341  
状态：已关闭  
标签：bug, app, app-server  
评论：4

该问题反馈在最新 macOS 更新后，Codex 桌面客户端出现 “Error creating chat / Failed to resume chat”。这是典型的会话恢复和 app-server 兼容性问题，影响用户继续既有工作流。  
**重要性：** 会话恢复失败会直接阻断桌面端核心使用路径。该 Issue 已关闭，说明可能已有修复或被合并到其他追踪项。

---

### 2. ChatGPT Pro 账号无法使用 GPT-5.6 Sol / GPT-6 Astra  
Issue：https://github.com/openai/codex/issues/46304  
状态：打开  
标签：bug, auth, app  
评论：4

用户反馈 Pro 账号下 Codex 拒绝 `gpt-5.6-sol` 与 `gpt-6-astra`，提示 ChatGPT account 不支持，但 `gpt-5.6-terra` 正常。  
**重要性：** 这涉及模型授权、账号权限与 Codex 模型目录的一致性。随着 Codex 支持更多模型，模型可见但不可用的问题会显著影响高级用户体验。

---

### 3. Luna Reserve 导致其他 provider 模型被隐藏且所有请求报用量限制  
Issue：https://github.com/openai/codex/issues/46298  
状态：打开  
标签：bug, rate-limits, custom-model, app  
评论：3

用户在 ChatGPT Pro 登录和自定义 provider 场景下，遇到 Luna Reserve 隐藏其他 provider 模型，并且请求全部失败为 usage-limit error。  
**重要性：** 这是自定义模型生态中的关键问题，涉及 provider 切换、模型列表展示、配额逻辑隔离。对使用 OpenRouter、私有网关或兼容 OpenAI API 的开发者影响较大。

---

### 4. v0.155.0 后 Amazon Bedrock GPT 拒绝 `reasoning.summary`  
Issue：https://github.com/openai/codex/issues/46336  
状态：已关闭  
标签：bug, CLI, aws-bedrock  
评论：2

使用 Amazon Bedrock Runtime 的用户在 Codex CLI 0.155.0 中遇到 provider 拒绝 `reasoning.summary` 字段。  
**重要性：** 这反映 Codex 新增 reasoning summary 字段后，与第三方模型 provider 的 API schema 兼容性存在风险。已关闭说明可能已有快速修复或规避方案。

---

### 5. Windows Desktop 首轮后续消息无限挂起  
Issue：https://github.com/openai/codex/issues/46299  
状态：打开  
标签：bug, windows-os, app, app-server  
评论：2，👍 1

Windows 桌面端新会话首条消息通常可用，但第二轮 follow-up 消息停留在输入框并无限 spinner。清理重装只能临时缓解。  
**重要性：** 这是 Windows 桌面端连续对话链路的严重稳定性问题，影响日常开发会话。社区已有点赞，说明不止个例。

---

### 6. VS Code 扩展通过 `exec_command` 修改文件时 diff 行数统计偏低  
Issue：https://github.com/openai/codex/issues/46296  
状态：打开  
标签：bug, extension  
评论：2

用户反馈 VS Code 扩展在 Codex 通过 `exec_command` 修改 tracked 文件时，diff line count 被低估。  
**重要性：** IDE 集成中的 diff 可视化是代码审查和信任建立的核心机制。统计错误可能导致开发者误判修改规模，影响安全审查。

---

### 7. 用量消耗异常过快  
Issue：https://github.com/openai/codex/issues/46286  
状态：打开  
标签：bug, rate-limits, app  
评论：2

用户表示在工作流无明显变化的情况下，20x 计划消耗极快，不到一小时耗尽。  
**重要性：** 配额透明度与实际消耗可解释性是 Codex 商业化使用的关键。该问题与其他 rate-limit/capacity 报告相互呼应，显示社区对用量计费和消耗控制高度敏感。

---

### 8. Codex Apps 生成超过 64 字符的 tool name，导致 Meta Muse Spark 请求失败  
Issue：https://github.com/openai/codex/issues/46358  
状态：打开  
标签：bug, exec, CLI, custom-model  
评论：1

通过 OpenRouter 使用 `meta/muse-spark-1.3-contributor` 时，启用 Codex Apps 会生成超过 provider 限制的 tool name，引发 HTTP 400。  
**重要性：** 这是多工具/多 provider 兼容性问题。随着 Codex Apps、MCP、custom model 扩展，工具名、schema、metadata 限制需要 provider-neutral 的抽象层。

---

### 9. Windows 路径下划线被错误转义为 `\_`  
Issue：https://github.com/openai/codex/issues/46357  
状态：打开  
标签：bug, model-behavior, windows-os, app  
评论：1

用户反馈 Windows 路径解析中，下划线被错误转换为 `\_`，导致路径解析异常。  
**重要性：** 路径处理错误会直接破坏文件定位、终端命令和项目操作。结合今天多个 Windows 相关 Issue，Windows 平台兼容性仍是社区重点痛点。

---

### 10. Provider-neutral sessions：希望支持不中断会话的 provider 热切换  
Issue：https://github.com/openai/codex/issues/46348  
状态：打开  
标签：enhancement, custom-model, session  
评论：1

用户建议 Codex 将 conversation/session 作为持久资产，将 model provider 作为运行时路由，从而支持冷恢复、热切换 provider，避免 fork session。  
**重要性：** 这是高价值架构建议，直指多 provider、多模型时代的会话抽象问题。它与今天多个自定义模型、模型切换、compaction fallback 相关问题高度一致。

---

## 4. 重要 PR 进展

### 1. 保持 MCP policy evaluation 与 turn environment 一致  
PR：https://github.com/openai/codex/pull/46335  
状态：已关闭

该 PR 确保 active turn 中 MCP 工具可用性不会被“保存给下一轮”的环境设置影响。  
**意义：** 修复环境变更与 MCP 工具权限之间的竞态问题，提升多 turn 会话中的策略一致性。

---

### 2. 在 path、network、sandbox 配置中共享平台身份  
PR：https://github.com/openai/codex/pull/46334  
状态：已关闭

新增 `Platform` 到 `codex-utils-path-uri`，支持 metadata 解析、原生平台检测和路径约定映射。  
**意义：** 统一平台识别后，Windows/macOS/Linux 跨平台路径、网络和沙箱逻辑可以减少分叉错误，对今天大量 Windows 问题有直接相关性。

---

### 3. Windows sandbox 清理时处理已禁用账户  
PR：https://github.com/openai/codex/pull/46333  
状态：已关闭

当 sandbox account 已被禁用时，cleanup 仍需要 fresh logon token。该 PR 引入临时启用并确保异常退出后仍能重新禁用的持久义务。  
**意义：** 增强 Windows sandbox 资源清理可靠性，降低权限账户残留风险。

---

### 4. TUI conversation recaps 使用 dim 样式  
PR：https://github.com/openai/codex/pull/46332  
状态：已关闭

对 TUI 中 recap 文本应用 dim styling，并调整 `Next:` 标签样式。  
**意义：** 属于 TUI 可读性优化，与 0.155.0 中 TUI reasoning summary 展示形成体验层面的连续改进。

---

### 5. 延迟环境网络策略校验到 composition 之后  
PR：https://github.com/openai/codex/pull/46331  
状态：已关闭

之前在配置被 feature settings 或 managed requirements 替换之前就进行校验，可能错误拒绝最终不会使用的配置。  
**意义：** 改善环境配置组合逻辑，减少网络策略误报，尤其适用于复杂 enterprise/managed 环境。

---

### 6. 将 retry backoff 移入 `codex-async-utils`  
PR：https://github.com/openai/codex/pull/46330  
状态：已关闭

把 exponential backoff helper 从 `codex-core` 移入 `codex-async-utils`，让 `codex-cloud-config` 可复用而不引入运行时依赖。  
**意义：** 这是依赖结构优化，有助于降低核心模块耦合，提高重试策略复用性。

---

### 7. 避免为无项目目录持久化 project trust  
PR：https://github.com/openai/codex/pull/46328  
状态：已关闭

当目录没有 project-root marker、Git checkout 或 project config 时，不再持久化 trust。  
**意义：** 防止用户在无项目上下文中误授信，随后新增项目配置被自动预批准。该变更提升安全边界和项目级权限准确性。

---

### 8. compaction fallback 扩展到当前模型  
PR：https://github.com/openai/codex/pull/46324  
状态：已关闭

模型切换后，如果使用前一个模型进行 compaction 失败，现在可 fallback 到当前选中模型。  
**意义：** 改善模型切换场景下的上下文压缩可靠性，与社区对 provider/session 切换的需求高度相关。

---

### 9. 为模型 provider gateway 增加 OAuth 凭据管理  
PR：https://github.com/openai/codex/pull/46318  
状态：已关闭

新增 `GatewayAuthConfig` 和 `GatewayAuthManager`，支持 PKCE 浏览器登录、loopback callback、加密凭据存储、token 过期或拒绝后的刷新。  
**意义：** 这是 Codex provider gateway 能力的重要基础设施，为第三方模型、企业网关和多 provider 登录打基础。

---

### 10. 中央化 OAuth 登录与刷新处理，并增强诊断安全性  
PR：https://github.com/openai/codex/pull/46300  
状态：已关闭

统一 OAuth 登录和 token refresh 的请求/错误处理，避免 token endpoint 错误或 JSON 解码诊断泄露敏感凭据。  
**意义：** 安全性和可维护性提升明显，尤其适合多 provider、gateway、企业身份集成场景。

---

## 5. 功能需求趋势

### 1. 多模型与多 provider 会话解耦

代表 Issue：

- Provider-neutral sessions  
  https://github.com/openai/codex/issues/46348
- ChatGPT Pro 模型被拒绝  
  https://github.com/openai/codex/issues/46304
- Luna Reserve 影响其他 provider  
  https://github.com/openai/codex/issues/46298

社区正在要求 Codex 将会话、模型和 provider 解耦。开发者希望能够在同一个 session 中切换模型、切换 provider、恢复历史上下文，而不是因为 provider 变化导致 session fork 或失效。

---

### 2. 用量、容量与配额透明度

代表 Issue：

- Usage drains extremely fast  
  https://github.com/openai/codex/issues/46286
- Astra capacity 问题  
  https://github.com/openai/codex/issues/46344
- capacity  
  https://github.com/openai/codex/issues/46321
- 单个任务消耗 42% weekly context allowance  
  https://github.com/openai/codex/issues/46343

用户不仅关注“能否使用”，也关注“为什么消耗这么快”“何时恢复”“具体是哪类操作造成消耗”。未来可能需要更细粒度的 usage breakdown、per-turn token/context accounting、模型容量状态提示。

---

### 3. Windows 桌面端稳定性和沙箱兼容

代表 Issue：

- follow-up messages hang  
  https://github.com/openai/codex/issues/46299
- WSL2 integration fail  
  https://github.com/openai/codex/issues/46346
- invalid transport in `mcp_servers.codex_app`  
  https://github.com/openai/codex/issues/46342
- Windows sandbox error  
  https://github.com/openai/codex/issues/46326
- first launch after update takes 6+ minutes  
  https://github.com/openai/codex/issues/46338
- path underscores escaped incorrectly  
  https://github.com/openai/codex/issues/46357

Windows 相关问题数量很高，覆盖 app-server、sandbox、WSL2、路径处理、启动性能、消息发送链路等多个层面。说明 Windows 端仍处于快速补齐和回归修复阶段。

---

### 4. IDE 集成可控性增强

代表 Issue：

- VS Code diff line count underreports  
  https://github.com/openai/codex/issues/46296
- VS Code prompt 声明模型和 reasoning effort  
  https://github.com/openai/codex/issues/46313

IDE 用户希望 Codex 不只是“能改代码”，还要提供准确 diff、可控模型选择、可声明 reasoning effort 的 prompt 工作流。未来 IDE extension 可能需要更强的 invocation-level 配置能力。

---

### 5. 浏览器与 Computer Use 权限边界

代表 Issue：

- AliExpress 被 browser use 拦截  
  https://github.com/openai/codex/issues/46339
- macOS Computer Use URL-not-allowed  
  https://github.com/openai/codex/issues/46307
- Computer Use not available on macOS Intel  
  https://github.com/openai/codex/issues/46327
- macOS in-app browser policy verification unavailable  
  https://github.com/openai/codex/issues/46350

浏览器自动化和 Computer Use 的策略判断仍存在误拦截、平台支持差异和可解释性不足。用户希望审批机制更清楚，URL policy 更可诊断。

---

## 6. 开发者关注点

### 1. 稳定性优先级正在超过新功能

虽然 0.155.0 引入 `/voice` 等新能力，但 Issue 区大量反馈集中在聊天无法恢复、消息挂起、sandbox 失败、Windows 更新后异常等基础稳定性问题。对开发者而言，Codex 作为生产力工具，连续会话可靠性比新增交互方式更关键。

---

### 2. 模型可用性需要更透明

多个用户遇到模型被拒绝、capacity、quota banner、usage-limit error 等问题，但错误信息往往不能解释是账号权限、模型容量、provider 限制、quota 用尽还是配置错误。  
开发者需要：

- 明确的模型可用性矩阵；
- 按账号/订阅/API key/provider 区分的错误提示；
- 更细粒度的 capacity 与 quota 诊断。

---

### 3. 自定义模型生态正在暴露 schema 兼容问题

Bedrock、OpenRouter、Meta Muse Spark 等场景显示，Codex 内部新增字段或工具 schema 可能与第三方 provider 限制冲突。  
高频痛点包括：

- provider 不支持某些 reasoning 字段；
- tool name 长度超限；
- quota/usage 逻辑没有与 provider 隔离；
- session 与 provider 绑定过深。

---

### 4. Windows 是当前最明显的平台短板

今天多个 Issue 均来自 Windows，包括：

- 首次启动极慢；
- follow-up 消息无法发送；
- sandbox helper error；
- WSL2 项目创建失败；
- MCP transport 配置异常；
- 路径转义错误；
- response formatting 问题。

这表明 Windows 桌面端需要在 runtime materialization、sandbox account lifecycle、path normalization、app-server IPC 等方面继续加强。

---

### 5. 会话、环境与权限状态需要更强一致性

相关 PR 显示维护者正在集中修复：

- active turn 与 next turn 环境选择隔离；
- MCP policy evaluation 与运行环境一致；
- project trust 不应在无项目目录持久化；
- 网络策略应在配置 composition 后再校验。

这些修复说明 Codex 的环境/权限模型正在变得更复杂，也更需要清晰的状态边界，避免 turn 运行中发生权限或工具可用性漂移。

---

## 总结

今天 Codex 的主线是 **快速发布 + 稳定性修复 + 多 provider 基础设施建设**。  
0.155.0 带来了语音和 TUI 可观测性增强，但社区最强烈的反馈仍集中在桌面 App 可靠性、Windows 支持、模型/配额透明度和自定义 provider 兼容性。  
从 PR 方向看，维护团队正在重点加固环境一致性、OAuth/provider 网关、Windows sandbox 与安全策略，这些都是 Codex 走向更复杂企业和多模型工作流的基础能力。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报  
**日期：2026-09-18**  
**仓库：google-gemini/gemini-cli**

---

## 1. 今日速览

过去 24 小时 Gemini CLI 社区的重点集中在 **会话恢复、Agent 行为稳定性、Windows/PTY 兼容性、文档准确性** 等方向。  
今日发布了新的 nightly 版本 `v0.62.0-nightly.20260918.g9450ade79`，同时多个 P1/P2 修复型 PR 正在推进，尤其是会话恢复时工具结果重复回放、ConPTY 生命周期、VS Code 终端焦点保持等问题值得关注。

---

## 2. 版本发布

### v0.62.0-nightly.20260918.g9450ade79

链接：<https://github.com/google-gemini/gemini-cli/releases/tag/v0.62.0-nightly.20260918.g9450ade79>

本次 nightly 版本主要包含稳定性修复：

- **OAuth 凭据刷新修复**
  - 修复刷新 OAuth 凭据时保留 refresh token 的问题。
  - 同时让凭据删除操作具备幂等性，降低认证状态异常时的恢复成本。
  - 相关 PR：<https://github.com/google-gemini/gemini-cli/pull/29339>

- **UI 边框渲染保护**
  - 修复 UI 边框渲染中可能出现负布局尺寸的问题。
  - 有助于提升终端 UI 在异常窗口尺寸或布局状态下的稳定性。

---

## 3. 社区热点 Issues

> 注：过去 24 小时内更新的 Issue 共 4 条，因此本节按实际数据列出 4 个值得关注的问题，而非强行扩展到 10 个。

### 1. Resume 会话时工具结果被重复发送

- Issue：#29365  
- 状态：OPEN  
- 标签：`priority/p1`, `area/core`, `kind/bug`, `effort/small`  
- 链接：<https://github.com/google-gemini/gemini-cli/issues/29365>

用户报告使用 `-r` 恢复会话时，历史工具调用结果会被发送两次：一次来自 `toolCalls[].result`，另一次来自已记录的 `functionResponse` turn。  
这是一个 **P1 core bug**，会导致恢复后的首个请求被后端拒绝，影响所有使用工具调用并依赖会话恢复的工作流。

社区反应：评论数 2，暂无点赞，但已有对应修复 PR #29366，响应速度较快。

---

### 2. Agent 修改文件时会误删无关注释

- Issue：#29370  
- 状态：OPEN  
- 标签：`priority/p2`, `area/agent`, `kind/bug`  
- 链接：<https://github.com/google-gemini/gemini-cli/issues/29370>

用户反馈 Gemini CLI 在更新文件时，经常会删除与本次修改无关的代码注释。  
这类问题直接影响开发者对 Agent 自动编辑代码的信任度，尤其是在大型代码库中，注释可能包含设计意图、约束条件或历史背景。

社区反应：评论数 1，暂无点赞。该问题反映出 Agent 在执行最小化 diff、保留上下文信息方面仍需增强。

---

### 3. Agent 返回空文本响应并触发强制提示

- Issue：#29369  
- 状态：OPEN  
- 标签：`priority/p1`, `area/agent`, `kind/bug`  
- 链接：<https://github.com/google-gemini/gemini-cli/issues/29369>

用户持续收到类似提示：  
“Never return an empty text response. Always explain the tool's output!”

这表明 Agent 在某些会话状态下可能陷入异常系统提示或输出格式错误。  
作为 P1 级别 Agent bug，它可能影响基础交互体验，使 CLI 无法正常响应普通 prompt。

社区反应：评论数 1，暂无点赞。Issue 中建议用户附加导出的 chat history JSON，说明维护者可能需要更多上下文来定位状态污染或 prompt 注入链路。

---

### 4. 误创建 Issue，已关闭

- Issue：#29381  
- 状态：CLOSED  
- 标签：`status/need-triage`, `area/core`  
- 链接：<https://github.com/google-gemini/gemini-cli/issues/29381>

该 Issue 由用户误创建并主动撤回，无需进一步处理。  
虽然技术价值不高，但说明仓库 Issue 流量中存在少量噪音，需要依赖 triage 流程快速过滤。

社区反应：无评论、无点赞，已关闭。

---

## 4. 重要 PR 进展

### 1. 修复会话恢复时工具响应重复回放

- PR：#29366  
- 状态：OPEN  
- 标签：`priority/p1`, `area/core`, `size/l`  
- 链接：<https://github.com/google-gemini/gemini-cli/pull/29366>

该 PR 修复 `-r`、session browser、ACP 恢复会话时重复发送工具结果的问题。  
这是对 Issue #29365 的直接响应，属于核心稳定性修复。若合并，将显著改善含工具调用会话的恢复可靠性。

---

### 2. 修复 A2A server 中 express.json 注册顺序问题

- PR：#29386  
- 状态：OPEN  
- 标签：`priority/p2`, `area/agent`, `size/s`  
- 链接：<https://github.com/google-gemini/gemini-cli/pull/29386>

该 PR 修复 A2A server 中 `express.json` 在 A2A routes 之后注册导致 `req.body` 为 `undefined` 的问题。  
修改较小，但对 Agent-to-Agent 服务接口的稳定性重要，尤其影响 HTTP 请求体解析链路。

---

### 3. 用运行时参考数据增强 cli_help agent

- PR：#29382  
- 状态：OPEN  
- 标签：`priority/p3`, `area/agent`, `size/l`, `maintainer only`  
- 链接：<https://github.com/google-gemini/gemini-cli/pull/29382>

该 PR 让 `cli_help` subagent 基于运行时 reference data 回答 CLI 帮助问题，而不是仅依赖静态 Markdown 文档。  
目标是减少错误建议，例如误推荐已废弃的 `--yolo`，或编造 slash commands、hotkeys。  
这是提升 CLI 自解释能力和减少文档漂移的重要方向。

---

### 4. 同步 ConPTY 进程退出生命周期并强化 PTY 输出收尾

- PR：#29379  
- 状态：OPEN  
- 标签：`priority/p1`, `area/core`, `size/l`, `maintainer only`  
- 链接：<https://github.com/google-gemini/gemini-cli/pull/29379>

该 PR 改进 `ShellExecutionService` 在 Windows ConPTY 环境下的进程生命周期管理。  
重点解决 pseudo-terminal 命令执行时，进程退出、流结束、输出 finalization 的一致性问题。  
对 Windows 用户和自动化 shell 执行场景非常关键。

---

### 5. VS Code IDE companion 关闭 diff tab 时保持终端焦点

- PR：#29378  
- 状态：OPEN  
- 标签：`priority/p1`, `area/extensions`, `size/xl`, `help wanted`  
- 链接：<https://github.com/google-gemini/gemini-cli/pull/29378>

该 PR 在关闭 diff preview editor 时传入 `preserveFocus`，避免焦点从 integrated terminal 被抢到 editor group。  
这是一个体验型修复，但对频繁在 VS Code 终端中使用 Gemini CLI 的开发者影响明显。

---

### 6. ACP session/load 支持无 resumable content 时按 ID 解析

- PR：#29368  
- 状态：OPEN  
- 标签：`priority/p1`, `area/non-interactive`, `size/m`  
- 链接：<https://github.com/google-gemini/gemini-cli/pull/29368>

该 PR 修复 ACP 中 session/load 在缺少 resumable content 时无法按 session ID 解析的问题。  
这对非交互模式、自动化集成和外部客户端恢复会话非常重要。

---

### 7. Subagent recovery 保留原始终止原因

- PR：#29367  
- 状态：OPEN  
- 标签：`priority/p1`, `area/agent`, `size/l`, `maintainer only`  
- 链接：<https://github.com/google-gemini/gemini-cli/pull/29367>

该 PR 修复 subagent 在 MAX_TURNS 后恢复时将终止原因错误标记为 `GOAL` 的问题。  
原问题会把未完成任务误报为成功，影响 Agent 编排、监控和用户判断。  
修复后可以更准确地区分真实完成与被中断恢复。

---

### 8. 改进终端 buffer 内存管理与 Windows 诊断路径格式

- PR：#29380  
- 状态：OPEN  
- 标签：`size/l`, `status/need-issue`  
- 链接：<https://github.com/google-gemini/gemini-cli/pull/29380>

该 PR 优化 PTY shell 执行和 headless terminal buffer 序列化期间的内存使用。  
同时改进 `/bug` 与 `/bug-memory` 诊断消息中的 Windows 文件路径 Markdown 格式。  
适合关注长命令输出、headless 模式和诊断报告质量的开发者。

---

### 9. 修复 Windows IDE 检测 fallback 误运行 Unix ps

- PR：#29376  
- 状态：OPEN  
- 标签：`area/core`, `size/m`  
- 链接：<https://github.com/google-gemini/gemini-cli/pull/29376>

该 PR 修复 Windows IDE 检测中，当 PowerShell 进程表获取失败时 fallback 到 Unix `ps` 的问题。  
这是典型跨平台兼容性修复，可减少 Windows 环境下 IDE detection 的误判和错误日志。

---

### 10. DevTools HTTP response chunk 使用有状态 decoder

- PR：#29375  
- 状态：OPEN  
- 标签：`priority/p2`, `area/core`, `size/m`  
- 链接：<https://github.com/google-gemini/gemini-cli/pull/29375>

该 PR 修复 `ActivityLogger.patchNodeHttp()` 对 HTTP response streaming chunk 独立执行 UTF-8 解码的问题。  
由于 chunk 边界可能切开多字节字符，独立 `toString('utf8')` 会造成乱码或事件内容损坏。  
引入 stateful decoder 后，DevTools activity event 的流式日志会更可靠。

---

## 5. 功能需求趋势

### 1. 会话恢复与非交互模式可靠性

相关 Issue / PR：

- #29365：<https://github.com/google-gemini/gemini-cli/issues/29365>
- #29366：<https://github.com/google-gemini/gemini-cli/pull/29366>
- #29368：<https://github.com/google-gemini/gemini-cli/pull/29368>

社区正在集中暴露 session resume、ACP load、工具结果 replay 等问题。  
这说明 Gemini CLI 已被用于更长链路、更自动化的任务中，用户对会话持久化和恢复正确性的要求明显提高。

---

### 2. Agent 行为可控性与结果可信度

相关 Issue / PR：

- #29370：<https://github.com/google-gemini/gemini-cli/issues/29370>
- #29369：<https://github.com/google-gemini/gemini-cli/issues/29369>
- #29367：<https://github.com/google-gemini/gemini-cli/pull/29367>
- #29382：<https://github.com/google-gemini/gemini-cli/pull/29382>

用户关注点不只是“能否完成任务”，而是 Agent 是否能：

- 保留无关代码和注释；
- 避免空响应或异常系统提示泄露；
- 正确报告任务失败、终止、恢复状态；
- 准确回答 CLI 自身能力和命令参数。

这表明社区对 Agent 的 **可解释性、可控性、低幻觉率** 有更高期待。

---

### 3. Windows 与终端执行稳定性

相关 PR：

- #29379：<https://github.com/google-gemini/gemini-cli/pull/29379>
- #29380：<https://github.com/google-gemini/gemini-cli/pull/29380>
- #29376：<https://github.com/google-gemini/gemini-cli/pull/29376>

多个 PR 聚焦 Windows ConPTY、PTY 输出结束、IDE 检测和路径格式。  
这说明 Windows 用户量或 Windows 场景复杂度正在上升，跨平台终端一致性已成为核心工程问题。

---

### 4. IDE / VS Code 集成体验

相关 PR：

- #29378：<https://github.com/google-gemini/gemini-cli/pull/29378>
- #29385：<https://github.com/google-gemini/gemini-cli/pull/29385>

VS Code companion 的焦点保持、依赖升级等工作持续推进。  
开发者期望 Gemini CLI 不只是命令行工具，也能在 IDE 工作流中保持自然、低打断的交互体验。

---

### 5. 文档与运行时事实对齐

相关 PR：

- #29371：<https://github.com/google-gemini/gemini-cli/pull/29371>
- #29372：<https://github.com/google-gemini/gemini-cli/pull/29372>
- #29373：<https://github.com/google-gemini/gemini-cli/pull/29373>
- #29374：<https://github.com/google-gemini/gemini-cli/pull/29374>
- #29382：<https://github.com/google-gemini/gemini-cli/pull/29382>

近期多个 PR 修正文档中的配置键、hook decision、ACP flag、extensions settings。  
趋势很明确：CLI 功能增长后，静态文档容易滞后，社区正在推动文档、schema、运行时能力之间保持一致。

---

## 6. 开发者关注点

### 1. 会话恢复不能破坏工具调用协议

会话恢复时重复发送 tool result 是高优先级问题。  
这类 bug 会直接导致后端拒绝请求，破坏长任务连续性，是当前最值得关注的核心稳定性问题。

代表链接：

- <https://github.com/google-gemini/gemini-cli/issues/29365>
- <https://github.com/google-gemini/gemini-cli/pull/29366>

---

### 2. Agent 自动改代码需要更强的“最小修改”约束

误删注释的问题说明开发者希望 Agent 更严格遵守局部修改原则。  
在真实工程中，无关注释、格式、上下文信息都可能很重要，Agent 的代码编辑不能只追求编译通过。

代表链接：

- <https://github.com/google-gemini/gemini-cli/issues/29370>

---

### 3. Windows 终端与 PTY 行为仍是复杂高风险区域

ConPTY、进程退出生命周期、输出 flush、buffer 序列化、Windows 路径格式等问题集中出现。  
这说明 Gemini CLI 在跨平台 shell 执行上仍需大量工程加固。

代表链接：

- <https://github.com/google-gemini/gemini-cli/pull/29379>
- <https://github.com/google-gemini/gemini-cli/pull/29380>
- <https://github.com/google-gemini/gemini-cli/pull/29376>

---

### 4. IDE 集成体验中的“小问题”会显著影响使用流畅度

关闭 diff tab 后焦点被抢走看似细节，但会打断终端驱动的开发流程。  
这类交互问题对高频用户影响很大，也是 CLI 与 IDE 深度融合时必须重视的体验指标。

代表链接：

- <https://github.com/google-gemini/gemini-cli/pull/29378>

---

### 5. 文档漂移正在成为维护成本

多个文档修复 PR 表明，配置项、hook 类型、CLI flag 与实际实现之间容易不一致。  
后续可能需要更多自动化文档生成、schema 校验和运行时帮助系统，以降低用户误用和 Agent 自解释幻觉。

代表链接：

- <https://github.com/google-gemini/gemini-cli/pull/29371>
- <https://github.com/google-gemini/gemini-cli/pull/29372>
- <https://github.com/google-gemini/gemini-cli/pull/29373>
- <https://github.com/google-gemini/gemini-cli/pull/29374>
- <https://github.com/google-gemini/gemini-cli/pull/29382>

---

## 总结

今天 Gemini CLI 的社区动态以 **稳定性修复和工程细节打磨** 为主。  
最关键的方向是会话恢复正确性、Agent 行为可信度、Windows/PTY 兼容性以及文档准确性。对于正在将 Gemini CLI 接入自动化流程、IDE 工作流或长期 Agent 任务的开发者，建议重点关注 #29366、#29367、#29368、#29379 和 #29382 的后续合并进展。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报  
日期：2026-09-18  
仓库：github.com/github/copilot-cli

## 1. 今日速览

过去 24 小时内，GitHub Copilot CLI 发布了 `v1.0.86`，重点增强了自定义 Agent 对仓库级指令文件的支持。社区反馈主要集中在会话恢复、MCP 协议兼容、Windows 稳定性、模型目录异常以及终端交互体验等方面。

今日无 Pull Request 更新，但新增 / 更新了 9 个 Issue，且全部仍处于 Open triage 状态，说明当前社区反馈仍以问题定位和稳定性改进为主。

---

## 2. 版本发布

### v1.0.86  
发布日期：2026-09-17  
链接：https://github.com/github/copilot-cli/releases/tag/v1.0.86

本次版本主要更新：

- **自定义 Agent 支持仓库级指令文件**
  - Custom agents 现在可以通过在 frontmatter 中设置：
    ```yaml
    include-custom-instructions: true
    ```
    来启用仓库中的指令文件。
  - 支持的文件包括：
    - `AGENTS.md`
    - `copilot-instructions.md`
    - `CLAUDE.md`

- **会话恢复行为优化**
  - 在未指定 `plugin-directory`、`discovery` 或 `working-directory` overrides 的情况下，恢复 active session 时会保留既有环境 / 上下文状态。
  - 该改动与今日多个会话恢复相关 Issue 形成呼应，说明 session lifecycle 仍是近期重点区域。

---

## 3. 社区热点 Issues

> 过去 24 小时共更新 9 个 Issue，因此本节列出全部 9 个值得关注的问题。

### 1. Extension hosts 和 MCP servers 每小时被重新枚举  
Issue：#4892  
状态：Open / triage  
作者：tiagomacarios  
链接：https://github.com/github/copilot-cli/issues/4892

该 Issue 关注 CLI 在会话中每小时 reload 时重新枚举 extension hosts 和所有 MCP servers 的行为。作者已更正最初关于进程泄漏和内存占用的错误描述，但重新验证了 reload 与 MCP re-enumeration 的现象。

**为什么重要：**

- 影响长时间运行的 Copilot CLI 会话稳定性。
- 可能导致 MCP server 重复初始化、连接抖动或插件体验不一致。
- 与 Copilot CLI 的 extensibility 和 MCP 生态直接相关。

**社区反应：**

- 当前 1 条评论，暂无点赞。
- 已有更正说明，问题描述相对谨慎，适合维护者进一步确认是否为设计行为或性能问题。

---

### 2. GPT-6 Astra 在事故恢复后仍未出现在认证模型目录中  
Issue：#4896  
状态：Open / triage  
作者：hamedrabah  
链接：https://github.com/github/copilot-cli/issues/4896

用户反馈 GPT-6 Astra 曾在 Copilot Enterprise 账号中可用，但在 2026-09-17 OpenAI 模型事故后，即使 GitHub Status 显示事故已恢复，认证后的 CAPI model catalog 仍未返回 `gpt-6-astra`。

**为什么重要：**

- 涉及企业用户的新模型可用性。
- 可能是模型目录缓存、权限同步、事故恢复不完整或后端配置问题。
- 对依赖特定高阶模型的企业团队影响较大。

**社区反应：**

- 当前无评论、无点赞。
- 虽然互动不多，但问题涉及 Enterprise 级别模型可用性，优先级应较高。

---

### 3. 未使用的新会话标题变为随机 ID  
Issue：#4895  
状态：Open / triage  
作者：zachbryant  
链接：https://github.com/github/copilot-cli/issues/4895

用户反馈每次打开应用都会创建新聊天，但重新打开后，这些会话名称会从类似 `Session 4` 变为随机 ID，例如 `3f944efb-5ed`，导致难以识别会话内容。

**为什么重要：**

- 影响 session management 的可用性。
- 对频繁使用多个会话的开发者尤其困扰。
- 与 CLI / TUI 的历史记录管理、会话命名策略相关。

**社区反应：**

- 当前无评论、无点赞。
- 该作者今日提交了多个 UX 相关问题，说明会话体验存在连续性痛点。

---

### 4. 恢复长会话时滚动位置跳到很早的位置  
Issue：#4894  
状态：Open / triage  
作者：zachbryant  
链接：https://github.com/github/copilot-cli/issues/4894

用户反馈恢复长时间会话时，界面滚动条会自动跳到会话中段甚至接近开头，并且似乎多次错误设置 scroll position。有时滚动条也不容易拖回底部。

**为什么重要：**

- 直接影响长会话的可用性。
- 对依赖持续上下文的开发工作流影响明显。
- 可能与 session restore、terminal rendering、virtual scroll 或 TUI state hydration 有关。

**社区反应：**

- 当前无评论、无点赞。
- 与 #4895、#4889 共同显示 session resume 相关问题较集中。

---

### 5. 终端中的链接难以点击  
Issue：#4893  
状态：Open / triage  
作者：zachbryant  
链接：https://github.com/github/copilot-cli/issues/4893

用户反馈终端中的普通 URL 链接难以点击。链接 hover 状态不稳定，下划线只短暂闪烁，用户需要反复点击才可能打开链接。

**为什么重要：**

- 影响开发者从 Copilot 输出跳转文档、Issue、PR、网页资源的效率。
- 属于基础交互体验问题。
- 可能与鼠标事件处理、terminal hyperlink detection 或 TUI 渲染刷新有关。

**社区反应：**

- 当前无评论、无点赞。
- 该问题虽然不是核心功能缺陷，但会显著降低日常使用体验。

---

### 6. Windows 上 `copilot.exe` 发生 0xc0000005 硬崩溃  
Issue：#4891  
状态：Open / triage  
作者：kcuzner  
链接：https://github.com/github/copilot-cli/issues/4891

用户反馈 Windows 版本 `copilot.exe` 在正常使用中出现未处理的 access violation，进程直接退出，未执行 cleanup handler，导致当前进行中的 turn 丢失，并可能破坏终端状态。

**为什么重要：**

- 属于高严重性稳定性问题。
- 影响 Windows 用户的基础可用性。
- 会导致 in-flight model turn 丢失，产生不完整 session 记录。
- 可能引发终端状态异常，增加恢复成本。

**社区反应：**

- 当前无评论、无点赞。
- 虽然互动少，但硬崩溃通常应优先排查，尤其是带有 session corruption 风险的问题。

---

### 7. `ask_user` 中 “Other” 选项内容丢失或被覆盖  
Issue：#4890  
状态：Open / triage  
作者：logar16  
链接：https://github.com/github/copilot-cli/issues/4890

用户反馈在 `ask_user` prompt 中使用 “Other” 选项填写自由文本后，如果切换到其他问题再返回，该文本会消失，或被后续 “Other” 文本覆盖。

**为什么重要：**

- 影响交互式 Agent / workflow 中用户输入的可靠性。
- 自由文本通常用于补充关键上下文，丢失后可能导致模型执行错误。
- 可能暴露表单状态管理或 prompt state serialization 的 bug。

**社区反应：**

- 当前无评论、无点赞。
- 与 Agent 交互体验相关，值得在自定义 Agent 能力增强后同步关注。

---

### 8. 使用 session id 恢复会话失败，提示 “no session matched”  
Issue：#4889  
状态：Open / triage  
作者：jaraco  
链接：https://github.com/github/copilot-cli/issues/4889

用户反馈 Copilot 能够找到旧会话并返回 session id，但随后使用该 session id 恢复时却失败，提示 `no session matched`。

**为什么重要：**

- 直接影响 session restore 的可信度。
- 暴露 session discovery 与 resume 之间可能存在索引、ID 格式、存储位置或权限不一致问题。
- 对长期使用 Copilot CLI 进行任务追踪的开发者影响较大。

**社区反应：**

- 当前无评论、无点赞。
- 与 #4894、#4895 共同构成明显的会话管理问题簇。

---

### 9. MCP client 在成功 `2026-07-28 server/discover` 后仍发送 legacy initialize  
Issue：#4888  
状态：Open / triage  
作者：Falenos  
链接：https://github.com/github/copilot-cli/issues/4888

用户反馈 Copilot CLI 先成功发送 MCP `2026-07-28` 的 discovery 请求，随后又在同一 stdio 连接上发送 legacy `2025-11-25 initialize` 请求。对于 dual-era MCP SDK server 来说，该连接已锁定到现代协议，因此会拒绝后续 legacy initialize。

**为什么重要：**

- 涉及 MCP 协议版本协商兼容性。
- 可能影响新版 MCP server 与 Copilot CLI 的互操作。
- 对插件生态和第三方工具接入非常关键。

**社区反应：**

- 当前无评论、无点赞。
- 虽然尚未形成讨论，但这是一个偏底层协议兼容问题，技术影响面较大。

---

## 4. 重要 PR 进展

过去 24 小时内无 Pull Request 更新。

当前仓库动态以 Issue 反馈为主，暂无可观察的修复合并、功能开发或代码评审进展。

---

## 5. 功能需求趋势

从今日 Issues 可以看出，社区关注点主要集中在以下几个方向：

### 1. 会话恢复与会话管理

相关 Issue：

- #4895 未使用会话标题变为随机 ID  
  https://github.com/github/copilot-cli/issues/4895
- #4894 恢复长会话时滚动位置异常  
  https://github.com/github/copilot-cli/issues/4894
- #4889 使用 session id 恢复失败  
  https://github.com/github/copilot-cli/issues/4889

趋势判断：

- 用户越来越依赖 Copilot CLI 的长期会话能力。
- 会话命名、会话检索、会话恢复、滚动位置恢复是当前体验短板。
- 后续可能需要更稳定的 session index、明确的 session id 语义，以及更可靠的 UI state restoration。

---

### 2. MCP 与插件生态兼容性

相关 Issue：

- #4892 extension hosts 和 MCP servers 周期性重新枚举  
  https://github.com/github/copilot-cli/issues/4892
- #4888 MCP 协议版本协商异常  
  https://github.com/github/copilot-cli/issues/4888

趋势判断：

- MCP 已成为 Copilot CLI 扩展能力的重要基础。
- 社区开始关注协议版本、server lifecycle、reload 策略和连接复用等底层问题。
- 随着 MCP server 数量增加，兼容性和稳定性会变成核心需求。

---

### 3. 终端 / TUI 交互体验

相关 Issue：

- #4893 链接难以点击  
  https://github.com/github/copilot-cli/issues/4893
- #4894 长会话滚动异常  
  https://github.com/github/copilot-cli/issues/4894
- #4890 `ask_user` 的 “Other” 输入状态异常  
  https://github.com/github/copilot-cli/issues/4890

趋势判断：

- 开发者对 CLI 的期望已不只是命令执行，而是接近 IDE / Chat UI 的稳定交互体验。
- 鼠标事件、滚动、表单状态、链接打开等细节会直接影响产品可用性。
- TUI 状态一致性可能成为后续重点优化方向。

---

### 4. 平台稳定性，尤其是 Windows

相关 Issue：

- #4891 Windows `copilot.exe` access violation  
  https://github.com/github/copilot-cli/issues/4891

趋势判断：

- Windows 原生二进制稳定性仍需重点关注。
- 崩溃恢复、cleanup handler、终端状态恢复、未完成 model turn 的持久化都可能成为后续改进点。
- 对企业用户而言，硬崩溃类问题会显著影响采用信心。

---

### 5. 新模型支持与企业模型目录一致性

相关 Issue：

- #4896 GPT-6 Astra 缺失  
  https://github.com/github/copilot-cli/issues/4896

趋势判断：

- 企业用户对新模型可用性和目录一致性非常敏感。
- 模型事故恢复后，客户端 / CAPI / 权限系统之间的一致性需要更强保障。
- 未来可能需要更清晰的模型可用性诊断命令或错误提示。

---

## 6. 开发者关注点

### 1. 长会话可靠性不足

多个反馈显示，开发者希望 Copilot CLI 能稳定支持长期、可恢复、可检索的工作流。目前暴露的问题包括：

- session id 能被发现但无法恢复。
- 会话标题丢失，变成随机 ID。
- 恢复后滚动位置错误，影响继续上下文阅读。

这表明 session lifecycle 是当前最需要产品化打磨的区域之一。

---

### 2. MCP 生态需要更严格的协议行为

MCP 相关反馈已经从“能否接入”进入到“协议协商是否正确、server lifecycle 是否稳定”的阶段。开发者关心：

- 是否会重复枚举或重启 MCP server。
- 是否正确处理新版 discovery / initialize 流程。
- 是否避免在同一连接中混用 legacy 与 modern 协议。

---

### 3. CLI 正在承担更复杂的交互式 UI 职责

链接点击、滚动条、表单自由文本等问题说明，Copilot CLI 已不仅是传统命令行工具，而是一个复杂的交互式开发界面。开发者期望：

- 链接可稳定点击。
- 长输出可可靠滚动。
- 表单输入不会丢失。
- 恢复会话后 UI 状态与离开前一致。

---

### 4. 崩溃恢复和数据完整性是底线需求

Windows 硬崩溃问题尤其值得关注，因为它不仅导致进程退出，还会造成：

- 当前 model turn 丢失。
- session 记录不完整。
- terminal 状态被破坏。

开发者希望即使进程异常退出，也能尽量保留上下文并安全恢复。

---

### 5. 企业模型可用性需要更透明

GPT-6 Astra 缺失问题显示，企业用户需要更清楚地了解：

- 当前账号可用哪些模型。
- 模型缺失是权限问题、目录问题还是服务事故残留。
- incident resolved 后，客户端是否需要刷新、重新认证或等待同步。

未来若增加模型诊断命令，将有助于减少类似问题的排查成本。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报  
**日期：2026-09-18**  
**仓库：MoonshotAI/kimi-cli**

## 1. 今日速览

过去 24 小时内，Kimi Code CLI 仓库没有新版本发布，但社区新增/更新了 2 个 Issue 和 1 个 PR。今日重点集中在 **Kimi Desktop 配置写入异常**、**OAuth 认证超时导致 subagent 启动不稳定**，以及 **重复 tool-call 循环的运行时防护修复**。

整体来看，开发者反馈更偏向稳定性与可靠性问题：配置状态应可持久化，认证链路需要更强容错，工具调用循环需要明确中断机制。

---

## 2. 社区热点 Issues

> 过去 24 小时内仅有 2 条 Issue 更新，以下按重要性列出。

### 1. [#2650 [Bug] Intermittent subagent launch failure: OAuth token fetch to auth.kimi.ai times out](https://github.com/MoonshotAI/kimi-cli/issues/2650)

**状态：OPEN**  
**作者：genhoi**  
**评论数：0**

该 Issue 反馈在启动 subagent 时，偶发出现向 `auth.kimi.ai` 获取 OAuth token 超时的问题。用户主会话处于已登录状态，但 subagent 启动仍可能因认证端点短暂不可用而失败。

**为什么重要：**

- 影响 subagent 启动可靠性。
- 属于间歇性问题，排查难度较高。
- 当前行为会导致整个 subagent spawn 流程失败，缺少重试或降级机制。
- 对使用多 agent 工作流的开发者影响较大。

**社区反应：**

目前暂无评论和点赞，但问题描述较清晰，具备较高工程优先级。建议后续关注是否引入 OAuth token 缓存、重试退避、局部失败恢复等机制。

---

### 2. [#2649 [Bug][Kimi Desktop] “chat 记忆 / 梦境记忆”开关拨动后不写入配置；疑似服务端功能门控未放行](https://github.com/MoonshotAI/kimi-cli/issues/2649)

**状态：OPEN**  
**作者：GH-Mason**  
**评论数：2**

该 Issue 反馈 Kimi Desktop 3.2.9 在 macOS 环境下，设置页中的「chat 记忆 / 梦境记忆」开关可以拨动，但本地运行配置 `daimon/config.json` 中未出现对应字段，如 `features.memory`、`features.memory.dream`、`runtime.dream.autoTrigger` 等。

**为什么重要：**

- 涉及用户设置与实际运行配置不一致。
- 可能与服务端 feature gate / 功能门控相关。
- 会造成用户误以为功能已启用，但运行时并未生效。
- 对记忆类能力的可解释性和可信度有直接影响。

**社区反应：**

该 Issue 已有 2 条评论，说明已有一定讨论。由于作者提供了较完整的环境信息、账号状态、本地配置检查路径和推测方向，后续较适合开发者快速定位是客户端写入问题、服务端开关问题，还是 UI 状态展示问题。

---

## 3. 重要 PR 进展

> 过去 24 小时内仅有 1 条 PR 更新。

### 1. [#2651 fix: stop repeated tool-call loops](https://github.com/MoonshotAI/kimi-cli/pull/2651)

**状态：OPEN**  
**作者：Oxygen56**  
**关联 Issue：#2637**

该 PR 修复重复 tool-call 循环问题。根据描述，之前运行时虽然在达到重复调用限制时设置了 stop flag，但仍会继续执行最后一次重复调用，导致防护机制不够彻底。

本次修改将重复相同 tool-call 的保护逻辑改为：当达到重复限制后，在执行下一次重复调用之前直接硬停止。

**为什么重要：**

- 防止模型或 agent 进入重复工具调用死循环。
- 降低无效 token 消耗和工具执行成本。
- 改善 CLI 在异常推理路径下的可控性。
- 对自动化任务、长链路 agent 执行、CI 场景尤其重要。

**潜在影响：**

- 提升运行时稳定性。
- 让重复调用保护机制更符合开发者直觉。
- 可能需要进一步确认停止后的错误提示、恢复策略和日志可观测性是否足够清晰。

---

## 4. 功能需求趋势

基于今日更新内容，社区关注点主要集中在以下方向：

### 1. Agent / Subagent 稳定性

[#2650](https://github.com/MoonshotAI/kimi-cli/issues/2650) 暴露出 subagent 启动依赖 OAuth token 获取，一旦认证端点短暂超时，整个子任务启动会失败。开发者可能更期待：

- token 获取失败后的自动重试；
- 指数退避机制；
- 已登录主会话的 token 复用；
- subagent 启动失败时不中断主流程；
- 更明确的认证错误日志。

### 2. 运行时循环保护

[#2651](https://github.com/MoonshotAI/kimi-cli/pull/2651) 指向 agent 执行中的关键问题：重复 tool-call。社区对于 AI 编程工具的期待不仅是“能调用工具”，还包括：

- 防止无限循环；
- 避免重复执行危险或高成本操作；
- 提供清晰的 stop reason；
- 在工具调用异常时具备可控中断能力。

### 3. 配置与功能门控一致性

[#2649](https://github.com/MoonshotAI/kimi-cli/issues/2649) 反映了 UI 开关、本地配置和服务端能力之间的一致性问题。开发者希望：

- 开关状态能够真实反映功能是否可用；
- 配置写入路径透明；
- 服务端 feature gate 未放行时有明确提示；
- 本地配置、运行时行为与 UI 状态保持一致。

### 4. 记忆能力可观测性

“chat 记忆 / 梦境记忆”相关反馈说明，用户不仅关注功能是否存在，还关注它是否真的生效。未来可能需要增强：

- 记忆功能状态展示；
- 本地/云端记忆开关说明；
- 配置写入日志；
- 记忆触发与调用的可观测性。

---

## 5. 开发者关注点

### 1. 认证链路需要更强容错

OAuth token 获取超时不应直接导致 subagent 启动失败。对于 CLI 和 agent 工具而言，认证端点偶发不可用是常见网络问题，开发者更期待内置重试、缓存和降级逻辑。

相关 Issue：[#2650](https://github.com/MoonshotAI/kimi-cli/issues/2650)

---

### 2. Agent 工具调用需要硬性边界

重复 tool-call 是 AI agent 框架中的高频风险点。今日 PR 表明社区正在推动从“检测到重复”升级为“阻止继续执行”，这对提升 CLI 的生产可用性非常关键。

相关 PR：[#2651](https://github.com/MoonshotAI/kimi-cli/pull/2651)

---

### 3. UI 状态与真实配置必须一致

Kimi Desktop 中开关可拨动但配置未写入，会降低开发者对功能状态的信任。尤其是记忆类能力，用户需要明确知道功能是否可用、是否已启用、是否被服务端门控限制。

相关 Issue：[#2649](https://github.com/MoonshotAI/kimi-cli/issues/2649)

---

### 4. 错误提示和日志仍需增强

今日两个 Issue 都与“看起来启用了/已登录，但实际执行失败”有关。开发者需要更明确的信息来判断：

- 是网络问题还是认证问题；
- 是客户端 bug 还是服务端 feature gate；
- 是配置未写入还是运行时未加载；
- 是 transient failure 还是持久性错误。

---

## 总结

今日 Kimi Code CLI 社区动态虽数量不多，但问题都集中在核心工程质量上：**subagent 启动稳定性、工具调用循环防护、配置状态一致性**。这些问题直接影响开发者在真实工作流中使用 Kimi CLI / Desktop 的可靠性。

短期值得重点关注 [#2651](https://github.com/MoonshotAI/kimi-cli/pull/2651) 是否合并，以及 [#2650](https://github.com/MoonshotAI/kimi-cli/issues/2650) 是否引入认证重试和 token 复用机制。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报  
日期：2026-09-18  
仓库：[`anomalyco/opencode`](https://github.com/anomalyco/opencode)

---

## 1. 今日速览

过去 24 小时，OpenCode 社区讨论的核心集中在 **Console / Zen 免费层鉴权异常**：大量用户在官方 Desktop、macOS App 或自动压缩流程中遇到 “free tier can only be used from within OpenCode” 错误，相关 Issue 多数已关闭，说明维护方可能已集中处理或合并重复反馈。

开发侧 PR 活跃度较高，重点覆盖 **TUI 会话体验、主题系统重构、速率限制修复、附件上传性能、VS Code 集成、MCP 工具同步** 等方向，显示 OpenCode 正在同时推进桌面端、终端端和 IDE 生态体验。

---

## 2. 版本发布

过去 24 小时无新 Release。

---

## 3. 社区热点 Issues

### 1. 免费层模型在官方 OpenCode 内被误判为“外部使用”
- Issue：[#49610](https://github.com/anomalyco/opencode/issues/49610)
- 状态：Closed
- 重要性：这是今日最集中的问题之一，用户在使用 `/compaction` 或自动上下文压缩时触发 Console Provider 报错。
- 社区反应：评论数最高，说明影响面广；与多个同类 Issue 构成明显故障簇。

### 2. OpenCode Zen 自动压缩触发免费层鉴权失败
- Issue：[#49587](https://github.com/anomalyco/opencode/issues/49587)
- 状态：Closed
- 重要性：明确指出问题发生在 **auto-approve permissions + automatic compaction + free tier models** 组合下，对长会话用户影响较大。
- 社区反应：评论活跃，用户提供了复现条件，有助于定位后台 agent 或压缩请求的鉴权路径问题。

### 3. 官方 Desktop 免费模型被错误拒绝
- Issue：[#49590](https://github.com/anomalyco/opencode/issues/49590)
- 状态：Closed
- 重要性：用户强调自己使用的是官方 OpenCode Desktop，并非第三方客户端，说明问题不只是第三方 API 调用限制。
- 社区反应：附带截图，重复反馈较多，表明错误提示本身造成了用户困惑。

### 4. macOS 官方 App 使用免费层模型失败
- Issue：[#49596](https://github.com/anomalyco/opencode/issues/49596)
- 状态：Closed
- 重要性：同类问题在 macOS 官方应用中出现，且获得点赞，说明桌面端用户受影响明显。
- 社区反应：用户尝试官方渠道安装仍然失败，强化了“客户端识别 / session 鉴权异常”的怀疑。

### 5. Desktop v1.18.31 Console Provider 全量请求失败
- Issue：[#49588](https://github.com/anomalyco/opencode/issues/49588)
- 状态：Closed
- 重要性：报告指向具体版本 `v1.18.31`，并提到默认模型 `opencode/big-pickle` 也失败，利于版本回归排查。
- 社区反应：作为具备版本信息的报告，参考价值较高。

### 6. 非 Git 项目中 “Edit Project” 无反馈失败
- Issue：[#49640](https://github.com/anomalyco/opencode/issues/49640)
- 状态：Open
- 重要性：这是一个产品体验问题：项目目录不在 Git 仓库中时，重命名看似执行但实际无效果且无错误提示。
- 社区反应：评论较少但问题清晰，涉及项目管理边界条件和用户反馈机制。

### 7. v2.0.7 启动后台服务失败
- Issue：[#49658](https://github.com/anomalyco/opencode/issues/49658)
- 状态：Open
- 重要性：OpenCode v2.0.7 在 macOS ARM64、Bun 安装方式下启动失败，停在 `Starting background server...`。
- 社区反应：该问题影响基础可用性，尤其对 CLI / TUI 用户关键。

### 8. 免费额度与订阅状态识别异常
- Issue：[#49638](https://github.com/anomalyco/opencode/issues/49638)
- 状态：Closed
- 重要性：用户已订阅 Go 仍被提示免费额度超限，暴露出订阅身份、API Key 或 Zen / Go 账户体系的混淆。
- 社区反应：同类计费和额度问题在近期频繁出现，说明订阅体验需要更明确的状态展示。

### 9. 自定义模型默认被隐藏
- Issue：[#49605](https://github.com/anomalyco/opencode/issues/49605)
- 状态：Open
- 重要性：配置声明的自定义模型因 `released: 0` 被规范化为 `1970-01-01`，导致客户端可见性判断失败。
- 社区反应：这是对多 Provider / 自定义模型用户影响较大的兼容性问题，也反映模型目录与本地配置之间的边界缺陷。

### 10. 编辑非 UTF-8 文件时发生静默数据损坏
- Issue：[#49600](https://github.com/anomalyco/opencode/issues/49600)
- 状态：Closed
- 重要性：`edit` 工具会将 ISO-8859-1 字节替换为 `U+FFFD`，属于严重数据完整性问题。
- 社区反应：虽然评论不多，但问题性质严重，尤其影响遗留代码库、多语言文件和非 UTF-8 工程。

---

## 4. 重要 PR 进展

### 1. 将 Provider 策略迁移到 Settings
- PR：[#49666](https://github.com/anomalyco/opencode/pull/49666)
- 状态：Open
- 内容：重构 Provider 配置，将 compaction、transport 等策略移动到 provider / model settings 中。
- 价值：有助于统一模型与 Provider 行为配置，可能也与今日大量 compaction / free tier 问题相关。

### 2. TUI 新增会话历史侧栏
- PR：[#49665](https://github.com/anomalyco/opencode/pull/49665)
- 状态：Open
- 内容：在 TUI 左侧增加固定会话历史栏，按 Today / Yesterday 等时间维度展示项目根会话。
- 价值：提升终端端多会话切换体验，契合用户对 session 管理的高频需求。

### 3. 更新协议测试 Fixtures
- PR：[#49662](https://github.com/anomalyco/opencode/pull/49662)
- 状态：Open
- 内容：修复协议变更后导致的测试失败，包括 PTY WebSocket 操作和 timeline `started` 字段。
- 价值：维护协议稳定性，减少后续功能开发中的 CI 噪音。

### 4. 主题系统从 Theme File Context 迁移到代码定义 Surface
- PR：[#49661](https://github.com/anomalyco/opencode/pull/49661)
- 状态：Open
- 内容：移除主题文件中的 `@context:elevated` / `@context:overlay`，改由代码通过 `surface(name)` 管理。
- 价值：降低主题文件复杂度，使 UI 层级语义更可控。

### 5. 支持 `opencode://new` 深链创建会话
- PR：[#49657](https://github.com/anomalyco/opencode/pull/49657)
- 状态：Open
- 内容：新增 `opencode://new` 短链接协议，支持通过 `cwd` 和 `q` 参数创建新会话。
- 价值：增强桌面端与外部工具、脚本、IDE 的联动能力。

### 6. 修复统一 Rate Limit 窗口利用率
- PR：[#49651](https://github.com/anomalyco/opencode/pull/49651)
- 状态：Open
- 内容：修复 Anthropic 订阅账户中 unified rate-limit header 解析问题，保持窗口利用率展示正确。
- 价值：改善额度与速率限制透明度，对订阅用户和高频调用用户非常重要。

### 7. Code Mode 子调用预览
- PR：[#49650](https://github.com/anomalyco/opencode/pull/49650)
- 状态：Open
- 内容：在 App 中将 Code Mode 的 `metadata.toolCalls` 展示为 Execute 下的紧凑子行，并支持展开查看输入。
- 价值：提升工具调用可观察性，帮助开发者理解 agent 执行链路。

### 8. 大附件流式上传与进度展示
- PR：[#49647](https://github.com/anomalyco/opencode/pull/49647)
- 状态：Open
- 内容：拖拽大文件时改为流式上传，并展示进度，避免 Electron 窗口无响应。
- 价值：显著改善桌面端处理 zip、视频、数据集等大文件时的稳定性。

### 9. VS Code Activity Bar 集成
- PR：[#49643](https://github.com/anomalyco/opencode/pull/49643)
- 状态：Open
- 内容：在 VS Code Activity Bar 中增加 OpenCode 入口，并提供侧栏操作按钮。
- 价值：强化 IDE 集成，是开发者工作流中非常关键的入口改进。

### 10. 运行时 MCP 工具注册同步修复
- PR：[#49628](https://github.com/anomalyco/opencode/pull/49628)
- 状态：Open
- 内容：在 MCP `add` / `connect` / `disconnect` 操作后等待 Tool Registry reconcile 完成。
- 价值：避免 Code Mode 读取到不完整的工具注册状态，提升 MCP 生态稳定性。

---

## 5. 功能需求趋势

### 1. 会话管理与 TUI 体验增强
相关 Issue / PR：
- [#49617](https://github.com/anomalyco/opencode/issues/49617)：希望 `opencode --mini` 支持 session 切换
- [#49665](https://github.com/anomalyco/opencode/pull/49665)：TUI 会话历史侧栏
- [#49646](https://github.com/anomalyco/opencode/pull/49646)：新增 `/btw` 旁路提问命令

趋势：用户正在把 OpenCode 当作长期、多任务、多会话的开发工作台使用，因此对 session browsing、快速切换、上下文旁路提问的需求上升。

### 2. IDE 与桌面系统集成
相关 PR：
- [#49643](https://github.com/anomalyco/opencode/pull/49643)：VS Code Activity Bar 集成
- [#49657](https://github.com/anomalyco/opencode/pull/49657)：`opencode://new` 深链支持

趋势：社区希望 OpenCode 不只是独立 App / CLI，而是能嵌入 IDE、外部脚本、自动化入口和系统级协议。

### 3. Provider / 模型配置体系重构
相关 Issue / PR：
- [#49666](https://github.com/anomalyco/opencode/pull/49666)：Provider 策略迁移到 settings
- [#49605](https://github.com/anomalyco/opencode/issues/49605)：自定义模型默认隐藏
- [#49651](https://github.com/anomalyco/opencode/pull/49651)：Rate Limit 解析修复

趋势：随着支持的模型与 Provider 增多，社区开始关注模型可见性、速率限制、订阅状态、压缩策略等“模型运行时治理”问题。

### 4. 性能与大输入处理
相关 PR：
- [#49634](https://github.com/anomalyco/opencode/pull/49634)：消除 TUI 每次输入的 O(n) mention 扫描
- [#49647](https://github.com/anomalyco/opencode/pull/49647)：大附件流式上传
- [#49602](https://github.com/anomalyco/opencode/issues/49602)：希望延长本地模型超时时间

趋势：用户开始在更大上下文、更大文件、更长会话、本地模型等场景使用 OpenCode，对性能瓶颈更敏感。

### 5. 工具调用与 Agent 可观察性
相关 PR：
- [#49650](https://github.com/anomalyco/opencode/pull/49650)：Code Mode 子调用预览
- [#49628](https://github.com/anomalyco/opencode/pull/49628)：MCP 工具注册同步
- [#49631](https://github.com/anomalyco/opencode/pull/49631)：将附件路径加入模型上下文

趋势：开发者希望更清楚地看到 agent 如何调用工具、读取附件、执行子任务，以便调试和信任 AI 生成过程。

---

## 6. 开发者关注点

### 1. 免费层 / 订阅 / 鉴权体验混乱
今日最大痛点是免费层被误判为外部使用，且部分用户不清楚 Zen API Key、Go 订阅、Console Provider 之间的关系。  
代表 Issue：
- [#49610](https://github.com/anomalyco/opencode/issues/49610)
- [#49587](https://github.com/anomalyco/opencode/issues/49587)
- [#49638](https://github.com/anomalyco/opencode/issues/49638)
- [#49639](https://github.com/anomalyco/opencode/issues/49639)

### 2. 自动压缩与后台 Agent 请求稳定性不足
多个错误都发生在 compaction、title、background agent 等非主对话请求中，说明后台请求链路与前台会话鉴权可能存在差异。  
代表 Issue：
- [#49592](https://github.com/anomalyco/opencode/issues/49592)
- [#49603](https://github.com/anomalyco/opencode/issues/49603)
- [#49607](https://github.com/anomalyco/opencode/issues/49607)

### 3. 桌面端对异常状态的提示不足
例如项目编辑无反馈、窗口因大文件拖拽卡死、数据库迁移后启动失败等，都体现出桌面端需要更明确的错误提示和恢复路径。  
代表 Issue / PR：
- [#49640](https://github.com/anomalyco/opencode/issues/49640)
- [#49647](https://github.com/anomalyco/opencode/pull/49647)
- [#49614](https://github.com/anomalyco/opencode/issues/49614)

### 4. 数据安全与文件编码兼容仍需加强
`edit` 工具对非 UTF-8 文件的静默破坏是高风险问题。即便相关 Issue 已关闭，也建议继续关注是否已通过测试覆盖。  
代表 Issue：
- [#49600](https://github.com/anomalyco/opencode/issues/49600)

### 5. 高级用户正在推动可扩展性能力
MCP、插件、社区 memory 插件、自定义模型、深链协议等方向均有活跃提交，说明 OpenCode 正在从单体编码助手向可扩展 agent 平台演进。  
代表 PR：
- [#49628](https://github.com/anomalyco/opencode/pull/49628)
- [#49632](https://github.com/anomalyco/opencode/pull/49632)
- [#49657](https://github.com/anomalyco/opencode/pull/49657)
- [#49605](https://github.com/anomalyco/opencode/issues/49605)

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-09-18

## 1. 今日速览

过去 24 小时 Pi 社区没有新版本发布，但 Issue 与 PR 活动较密集，重点集中在 **模型 Provider 兼容性、重试策略、上下文压缩、TUI 可定制性、会话安全与扩展 API** 等方向。  
今日多数 Issue 已被快速关闭，说明维护侧对问题分流较快；同时多个 PR 已合入或关闭，尤其是 AI Provider 错误处理、重试机制和 Coding Agent 稳定性方面进展明显。

---

## 2. 社区热点 Issues

### 1. OpenRouter `baseUrl` 覆盖回归问题  
- Issue: [#9725](https://github.com/earendil-works/pi/issues/9725)  
- 状态：Closed  
- 标签：bug, untriaged  
- 重要性：用户反馈 0.85.1 中 OpenRouter 模型会根据 API 自动切换 `baseUrl`，导致文档中通过覆盖 `baseUrl` / `apiKey` 的方式不再可靠。  
- 社区反应：3 条评论，属于今日较高互动问题；该问题影响自定义网关、代理服务和 OpenRouter 替代部署场景。

### 2. 会话迁移会原地重写文件且无备份  
- Issue: [#9708](https://github.com/earendil-works/pi/issues/9708)  
- 状态：Closed  
- 标签：last-read, no-action  
- 重要性：旧版本 session 文件迁移时会被原地改写，如果崩溃、断电或磁盘写入失败，可能造成会话损坏。  
- 社区反应：3 条评论，虽然被标记 no-action，但该反馈反映用户对会话数据安全和可恢复性的关注。

### 3. Qwen Token Plan 支持 GLM-5.3  
- Issue: [#9701](https://github.com/earendil-works/pi/issues/9701)  
- 状态：Closed  
- 标签：no-action  
- 重要性：请求新增 GLM-5.3 模型支持，关联阿里云 Model Studio / Bailian 文档。  
- 社区反应：3 条评论，说明用户持续关注国内模型与 Token Plan 的可用性。

### 4. `CompactionSettings.reserveTokens` 职责耦合  
- Issue: [#9727](https://github.com/earendil-works/pi/issues/9727)  
- 状态：Closed  
- 标签：untriaged  
- 重要性：当前 `reserveTokens` 同时用于触发压缩阈值和摘要输出预算，可能导致配置语义不清、调参困难。  
- 社区反应：2 条评论，反映高级用户对长上下文管理策略的精细化需求。

### 5. `--print` 在输出预算耗尽时空输出且退出码为 0  
- Issue: [#9718](https://github.com/earendil-works/pi/issues/9718)  
- 状态：Closed  
- 标签：untriaged  
- 重要性：CLI 自动化场景中，模型输出预算耗尽但 stdout/stderr 均为空且 exit code 为 0，会让调用方无法区分成功空输出与失败。  
- 社区反应：2 条评论；该问题直接影响脚本集成、CI 和批处理可靠性。

### 6. 允许主题驱动的全屏选择样式  
- Issue: [#9715](https://github.com/earendil-works/pi/issues/9715)  
- 状态：Closed  
- 标签：untriaged  
- 重要性：当前全屏选择固定使用反色视频，可能与主题不一致或对比度不足。  
- 社区反应：2 条评论；体现 TUI 体验和可访问性方向的需求。

### 7. 重试普通 `Bad Gateway` 错误  
- Issue: [#9712](https://github.com/earendil-works/pi/issues/9712)  
- 状态：Closed  
- 标签：no-action  
- 重要性：Codex provider 偶发返回无 HTTP 状态码的 `Bad Gateway`，当前可能不会触发自动重试。  
- 社区反应：2 条评论；与 Provider 稳定性、自动恢复能力直接相关。

### 8. 新增本地 `pi-dev` 安装命令  
- Issue: [#9710](https://github.com/earendil-works/pi/issues/9710)  
- 状态：Closed  
- 标签：no-action  
- 重要性：希望添加开发版安装命令，将 main 分支构建为 Bun binary 并安装全局 `pi-dev`，避免覆盖正式版 `pi`。  
- 社区反应：2 条评论；说明贡献者希望降低本地开发和测试门槛。

### 9. `edit` 工具接受重叠匹配导致误编辑  
- Issue: [#9697](https://github.com/earendil-works/pi/issues/9697)  
- 状态：Closed  
- 标签：bug, no-action  
- 重要性：内置 `edit` 工具在 `oldText` 存在重叠匹配时会静默替换第一个匹配，可能修改错误代码块。  
- 社区反应：2 条评论；这类问题会影响 Agent 修改代码的安全性和确定性。

### 10. 为 session 添加 TUI 内 trace 可视化  
- Issue: [#9728](https://github.com/earendil-works/pi/issues/9728)  
- 状态：Closed  
- 标签：untriaged  
- 重要性：希望在 TUI 内查看 Agent 执行流，而不仅依赖 HTML export。  
- 社区反应：1 条评论；该需求指向 Agent 可观测性和调试体验增强。

---

## 3. 重要 PR 进展

> 过去 24 小时共有 8 个 PR 更新，因此本节收录全部重要 PR。

### 1. 修复 malformed `Retry-After` 日期导致立即重试  
- PR: [#9724](https://github.com/earendil-works/pi/pull/9724)  
- 状态：Closed  
- 类型：fix(ai)  
- 内容：当 `Retry-After` HTTP-date 无法解析时，之前会产生 `NaN` 延迟，导致 429 请求立即重试。该 PR 将其回退到指数退避，并在校验和 sleep 层阻止非有限延迟值。  
- 影响：提升限流场景下的稳定性，避免无效快速重试放大请求压力。

### 2. 对无诊断 body 的 4xx 错误进行重试  
- PR: [#9722](https://github.com/earendil-works/pi/pull/9722)  
- 状态：Closed  
- 类型：fix(ai)  
- 内容：网关返回裸 4xx，例如 `400 status code (no body)` 时，系统此前将其视为不可重试错误。PR 增加对这类模糊 4xx 的重试识别。  
- 影响：改善 flaky gateway、内部代理和 OpenAI SDK 异常包装下的容错性。

### 3. Mistral reasoning dispatch 改为基于 `thinkingLevelMap`  
- PR: [#9720](https://github.com/earendil-works/pi/pull/9720)  
- 状态：Closed  
- 类型：fix(ai)  
- 内容：将 Mistral reasoning 能力判断从硬编码模型 ID 列表改为检查 `model.thinkingLevelMap`，并新增 `zai-glm-5-3`。  
- 影响：降低新模型接入成本，减少模型 ID 漏配导致的能力不可用问题。

### 4. 默认 tool shell 垂直 padding 可配置  
- PR: [#9719](https://github.com/earendil-works/pi/pull/9719)  
- 状态：Closed  
- 类型：feat(tui)  
- 内容：新增 `toolShellPaddingY` 配置，支持 `0` 或 `1`，默认 `1`；应用于默认 shell renderer、fallback text、streaming 和 restored tool components。  
- 影响：改善 TUI 空间利用率，便于插件 UI 自定义布局。

### 5. 限制 compaction summary 中 thinking-only message 的体积  
- PR: [#9717](https://github.com/earendil-works/pi/pull/9717)  
- 状态：Closed  
- 类型：fix(coding-agent)  
- 内容：当 assistant 响应只有 reasoning 内容时，`serializeConversation()` 可能把完整 reasoning 放进 compaction prompt，导致压缩请求远大于普通请求。该 PR 对此进行边界控制。  
- 影响：降低长会话压缩失败风险，改善 reasoning 模型下的上下文管理稳定性。

### 6. 支持 Azure Foundry Chat Completions deployments  
- PR: [#9714](https://github.com/earendil-works/pi/pull/9714)  
- 状态：Open  
- 类型：feat(ai)  
- 内容：为 Azure provider 增加 Foundry Chat Completions 部署支持，解决仅支持 Responses API 导致 DeepSeek V4 Pro 等模型无法工作的限制。  
- 影响：扩展企业 Azure Foundry 场景下的模型可用性，是今日仍在推进的关键 PR。

### 7. 校验 transcript 中的 eval prompts  
- PR: [#9706](https://github.com/earendil-works/pi/pull/9706)  
- 状态：Closed  
- 类型：fix(coding-agent)  
- 内容：改为基于 transcript 中 replay 的 system prompt 校验文档变体，而不是使用 reload 后的 session 配置；同时保留失败 observation 的 usage、timing 和 artifact。  
- 影响：提升 eval 结果准确性和失败排查能力。

### 8. 添加 TUI context footer eval  
- PR: [#9705](https://github.com/earendil-works/pi/pull/9705)  
- 状态：Closed  
- 类型：feat(coding-agent)  
- 内容：允许 `InteractiveMode` 注入 terminal 以进行进程内渲染，并添加 Docker 隔离的文档 eval，用于验证 context footer 的十格进度条渲染。  
- 影响：增强 TUI 渲染测试覆盖，降低 UI 回归风险。

---

## 4. 功能需求趋势

### 1. Provider 兼容性与错误重试机制成为核心关注点  
相关 Issue / PR：  
- [#9725](https://github.com/earendil-works/pi/issues/9725) OpenRouter `baseUrl` 覆盖回归  
- [#9712](https://github.com/earendil-works/pi/issues/9712) 普通 `Bad Gateway` 重试  
- [#9723](https://github.com/earendil-works/pi/issues/9723) no-body 4xx 错误重试  
- [#9724](https://github.com/earendil-works/pi/pull/9724) malformed `Retry-After` 回退指数退避  
- [#9722](https://github.com/earendil-works/pi/pull/9722) opaque 4xx retry  

社区明显在推动 Pi 对各种不规范网关、代理层和 Provider SDK 包装错误具备更强容错能力。

### 2. 新模型与多云部署支持持续增长  
相关 Issue / PR：  
- [#9701](https://github.com/earendil-works/pi/issues/9701) Qwen Token Plan / GLM-5.3  
- [#9720](https://github.com/earendil-works/pi/pull/9720) 新增 `zai-glm-5-3`，优化 reasoning dispatch  
- [#9714](https://github.com/earendil-works/pi/pull/9714) Azure Foundry Chat Completions 支持  
- [#9716](https://github.com/earendil-works/pi/issues/9716) Kiro CLI 下 Claude Opus / Sonnet 模型不可用  

趋势表明用户正在将 Pi 用于更多第三方模型平台、国内模型和企业云部署环境。

### 3. 长上下文、压缩与 reasoning 内容管理需求增强  
相关 Issue / PR：  
- [#9727](https://github.com/earendil-works/pi/issues/9727) 拆分 `reserveTokens` 语义  
- [#9726](https://github.com/earendil-works/pi/issues/9726) `cacheRead` 双重计数导致 `max_tokens` 被压到 1  
- [#9717](https://github.com/earendil-works/pi/pull/9717) 限制 thinking-only messages 在 compaction summary 中的体积  

长会话与 reasoning 模型组合使用时，token 估算、缓存计数和压缩预算成为高风险区域。

### 4. TUI 可定制性和可观测性需求上升  
相关 Issue / PR：  
- [#9715](https://github.com/earendil-works/pi/issues/9715) 主题驱动的全屏选择样式  
- [#9721](https://github.com/earendil-works/pi/issues/9721) tool shell padding 可配置  
- [#9719](https://github.com/earendil-works/pi/pull/9719) 实现 padding 配置  
- [#9728](https://github.com/earendil-works/pi/issues/9728) session trace 可视化  
- [#9705](https://github.com/earendil-works/pi/pull/9705) TUI context footer eval  

用户不仅关注 Agent 能力，也开始关注 TUI 的可读性、空间效率、主题一致性和调试体验。

### 5. 扩展 API 与结构化遥测需求增加  
相关 Issue：  
- [#9711](https://github.com/earendil-works/pi/issues/9711) 允许扩展处理 provider-specific metadata  
- [#9704](https://github.com/earendil-works/pi/issues/9704) provider-neutral rate-limit telemetry hook  
- [#9703](https://github.com/earendil-works/pi/issues/9703) 在 `tool_call` events 暴露工具定义来源  
- [#9702](https://github.com/earendil-works/pi/issues/9702) 在 `AssistantMessage` 保留结构化 provider error 信息  

这说明嵌入式使用、插件开发和企业观测场景正在推动 Pi 暴露更细粒度的事件与错误信息。

---

## 5. 开发者关注点

### 1. 自动化调用需要更明确的失败信号  
`--print` 空输出但退出码为 0 的问题 [#9718](https://github.com/earendil-works/pi/issues/9718)，暴露了 CLI 在脚本化场景下的可观测性不足。开发者希望 Pi 在 token 耗尽、模型截断或 Provider 异常时提供可机器判断的错误状态。

### 2. Provider 错误处理需要兼容真实世界的不规范网关  
多个问题集中在 `Bad Gateway`、裸 4xx、无 body 错误、malformed `Retry-After` 等异常格式。PR [#9722](https://github.com/earendil-works/pi/pull/9722) 和 [#9724](https://github.com/earendil-works/pi/pull/9724) 表明维护侧正在增强鲁棒性。

### 3. Session 与上下文数据安全仍是隐性痛点  
会话迁移无备份 [#9708](https://github.com/earendil-works/pi/issues/9708)、新增丢弃当前 session 命令 [#9707](https://github.com/earendil-works/pi/issues/9707)、指定 entry 打开 session [#9713](https://github.com/earendil-works/pi/issues/9713) 都指向同一类需求：更安全、可控、可导航的会话生命周期管理。

### 4. Agent 修改代码的确定性需要加强  
`edit` 工具对重叠匹配处理不严格 [#9697](https://github.com/earendil-works/pi/issues/9697)，可能导致错误代码块被修改。对于 Coding Agent 来说，编辑操作的唯一性校验和失败保护是核心可靠性要求。

### 5. 插件和企业集成需要更多结构化数据  
开发者希望获取 provider metadata、rate-limit telemetry、tool provenance、结构化 error status/body 等信息。相关 Issue 包括 [#9711](https://github.com/earendil-works/pi/issues/9711)、[#9704](https://github.com/earendil-works/pi/issues/9704)、[#9703](https://github.com/earendil-works/pi/issues/9703)、[#9702](https://github.com/earendil-works/pi/issues/9702)。这类需求通常来自二次封装、内部平台集成和可观测性建设。

### 6. TUI 体验正在从“可用”走向“可调优”  
主题选择样式、tool shell padding、footer eval、trace visualization 等反馈显示，重度用户希望 Pi 的 TUI 能更贴合终端尺寸、主题风格和调试工作流。相关链接：[#9715](https://github.com/earendil-works/pi/issues/9715)、[#9721](https://github.com/earendil-works/pi/issues/9721)、[#9719](https://github.com/earendil-works/pi/pull/9719)、[#9728](https://github.com/earendil-works/pi/issues/9728)。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-09-18

## 1. 今日速览

过去 24 小时，Qwen Code 发布了 `desktop-v0.24.0` 与 `v0.24.0-nightly`，重点集中在 ACP 权限队列、共享输出模式、CI 与文档修正。社区讨论最热的方向是 **Session 管理稳定性、ACP/IDE 集成、Token 管理、Web Shell、CI 可靠性与扩展机制**。同时，多个 PR 正在修复 live session 删除、Web Shell 会话竞争、Docker 缓存膨胀、MCP App 回放等关键问题。

---

## 2. 版本发布

### v0.24.0-nightly.20260917.f822124af5

链接：https://github.com/QwenLM/qwen-code/releases/tag/v0.24.0-nightly.20260917.f822124af5

本次 nightly 版本主要包含：

- 文档更新：记录 ACP boundary acceptance 合并结果。
- CI 修复：围绕发布导出流程增加等待逻辑，提升自动化发布稳定性。

### desktop-v0.24.0

链接：https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.24.0

桌面版 `v0.24.0` 的重点更新包括：

- 修复 CLI 中 ACP 权限队列作用域，使其限定在当前 session 内，降低跨会话权限状态串扰风险。
- 新增 shared output modes，为后续多端、IDE、Web Shell 等输出协同能力打基础。

---

## 3. 社区热点 Issues

### 1. `sessions/delete` 删除 live session 会破坏 transcript

链接：https://github.com/QwenLM/qwen-code/issues/12091

该问题被标记为 `priority/P1`，是今日最值得关注的稳定性问题。用户反馈在 runtime 仍附着 session 时执行删除，会导致 transcript 文件被移除后又被 writer 重新创建，形成无头历史，进而触发 `degraded_history`，并禁用 auto-continue。已有 4 条评论，说明维护者已开始深入跟进。相关修复 PR 已出现：[#12136](https://github.com/QwenLM/qwen-code/pull/12136)。

### 2. ACP 在 repeated `finish_reason=length` 后错误报告 `end_turn`

链接：https://github.com/QwenLM/qwen-code/issues/12113

这是一个 ACP/IDE 集成与 token 管理交叉问题，优先级为 `P2`。问题在于模型连续因长度限制截断时，ACP 客户端仍收到 `stopReason: "end_turn"`，可能导致 IDE 或 ACP host 误判模型已经完整结束。该 Issue 有 5 条评论，关注度较高，影响自动续写、长输出与 IDE 端交互体验。

### 3. OpenRouter preset 使用错误 attribution header

链接：https://github.com/QwenLM/qwen-code/issues/12072

OpenRouter preset 当前发送 `X-OpenRouter-Title`，但 OpenRouter 识别的是 `X-Title`。这是第三方模型路由集成问题，已有 6 条评论，是今日评论最多的 Issue 之一。虽然优先级为 `P3`，但对 OpenRouter 用户的应用归因、用量识别和生态集成有直接影响。

### 4. shell-utils 仍将 Unicode whitespace 当作 bash 分隔符

链接：https://github.com/QwenLM/qwen-code/issues/12089

该问题属于 shell 权限和安全语义修复，优先级 `P2`。此前部分 parser 已收窄 whitespace 定义，但 `shell-utils.ts` 仍使用 JavaScript `/\s/`，可能与 bash 实际解析行为不一致。该问题对命令权限判断、shell wrapper 处理和安全边界有影响，已收到 4 条评论。

### 5. `POST /session` 间歇性 504，ACP shared child 新建 session 超时

链接：https://github.com/QwenLM/qwen-code/issues/12116

该 Issue 反映 `qwen serve` 场景下新建 session 间歇性失败，daemon 日志显示 ACP `newSession` 超时 10000ms。优先级为 `P2`，并标记 `status/ready-for-human`。这对长期运行服务、Web UI 和多用户部署影响较大，属于服务端稳定性核心问题。

### 6. JSON/JSONL session export 可能导出错误 UUID 与时间戳

链接：https://github.com/QwenLM/qwen-code/issues/12111

该问题影响 `/export` 数据完整性，优先级 `P2`。在普通会话中，导出的 JSON/JSONL 可能为消息分配错误 UUID 和 timestamps，影响审计、回放、迁移和外部工具处理。该问题与近期 roadmap/export-data 相关，是数据可靠性方向的重要反馈。

### 7. bare `deepseek-v4` alias 无法命中 1M token limit

链接：https://github.com/QwenLM/qwen-code/issues/12122

该问题已关闭，对应修复 PR 为 [#12124](https://github.com/QwenLM/qwen-code/pull/12124)。用户发现 `qwen -m deepseek-v4` 显示 128K context，而 token limit 表中 DeepSeek V4 应为 1M 输入、384K 输出。该问题说明模型名 normalization 对新模型族支持存在边界 case。

### 8. Windows 上 omni media error sanitizer 可能泄露父路径片段

链接：https://github.com/QwenLM/qwen-code/issues/12082

该 Issue 已关闭，优先级为 `P2`，涉及 Windows 路径隐私。`sanitizeErrorMessage()` 在某些路径拼写不一致时无法完全 scrub 文件路径，可能将父目录名暴露给模型。该问题属于数据隐私与跨平台路径处理的重要修复点。

### 9. hooks 在 safe/bare mode 下应列出已配置 hooks

链接：https://github.com/QwenLM/qwen-code/issues/12137

该 Issue 提出即使在 `--safe-mode` 和 `--bare` 下 hooks 不执行，也应该能列出配置项，并标明 disabled 状态与原因。已有 3 条评论，关联 hooks/events roadmap。对应 PR 包括 [#12139](https://github.com/QwenLM/qwen-code/pull/12139) 与 [#12138](https://github.com/QwenLM/qwen-code/pull/12138)。

### 10. 支持从目录加载 deployment-managed extensions

链接：https://github.com/QwenLM/qwen-code/issues/12147

这是新的扩展管理需求。用户希望为 `qwen` 和 `qwen serve` 增加 `--extension-dir <root>`，从已有目录加载由部署方管理的扩展，避免依赖每个用户的可写 settings。该需求体现了企业部署、集中式扩展分发和受控运行环境的增长诉求。

---

## 4. 重要 PR 进展

### 1. 修复 live runtime 附着 session 的删除行为

链接：https://github.com/QwenLM/qwen-code/pull/12136

该 PR 针对 [#12091](https://github.com/QwenLM/qwen-code/issues/12091)，在删除或修改 session 前检查是否有 live runtime 附着。如果 session 正在被 scheduled task、background agent 或交互式 prompt 使用，则返回 `409`，避免 transcript 被破坏。

### 2. Web Shell 首个 prompt 懒创建 session 时处理 attach 竞争

链接：https://github.com/QwenLM/qwen-code/pull/12149

该 PR 修复 Web Shell 中首个 prompt 懒创建 session 时，如果 host 在 attach 仍进行中切换 controlled session id，原 session 可能被错误丢弃的问题。新逻辑将 latest-wins abort 视作 hand-off，从而保留首个 prompt 创建出的 session。

### 3. MCP App transcript 保留 HTML，支持回放渲染

链接：https://github.com/QwenLM/qwen-code/pull/12131

该 PR 已关闭。它让 MCP App tool result 在记录 transcript 时保留 `html`，并在预算允许时保留 `toolResult`，从而使保存后的 session replay 可以重新渲染 sandboxed iframe。终端历史路径仍保持原有裁剪策略，避免额外暴露。

### 4. 修复 DeepSeek V4 alias token limit

链接：https://github.com/QwenLM/qwen-code/pull/12124

该 PR 已关闭，对应 [#12122](https://github.com/QwenLM/qwen-code/issues/12122)。修复后 bare `deepseek-v4` 可以正确命中 DeepSeek V4 系列的 1M context window 与 384K output budget，改善新模型族的开箱体验。

### 5. Web Shell 使用结构化 metadata 渲染压缩结果

链接：https://github.com/QwenLM/qwen-code/pull/12141

该 PR 将上下文压缩结果从英文句子扩展为机器可读 metadata，并由 Web Shell 按用户语言渲染，同时格式化 token counts。该改动提升国际化体验，也让 host 对压缩结果具备更可靠的结构化处理能力。

### 6. Web Shell 固定 session plan 到 transcript 顶部

链接：https://github.com/QwenLM/qwen-code/pull/12134

该 PR 为 Web Shell 增加可折叠 plan strip，固定显示在 transcript 上方，复用 terminal 的 sticky-todo 顺序与五项上限，并展示当前步骤，如 `Step 3 / 7`。这将改善长任务、多步骤 agent 工作流的可见性。

### 7. CI：清理 ECS runner 上累积的 Docker build cache

链接：https://github.com/QwenLM/qwen-code/pull/12135

该 PR 增加每日 Docker BuildKit cache 回收逻辑，清理 24 小时未使用缓存，并设置 30GB 保留预算。它对应 [#12143](https://github.com/QwenLM/qwen-code/issues/12143)，旨在缓解自托管 ECS runner 因缓存膨胀导致的 `ENOSPC` 和 CI 偶发失败。

### 8. CI：E2E build artifact 下载失败时重试一次

链接：https://github.com/QwenLM/qwen-code/pull/12128

该 PR 为 E2E consumer legs 的 `Download build artifact` 步骤增加一次有界重试，覆盖 Linux、macOS、OpenTUI interactive 与 nightly。它针对 [#12125](https://github.com/QwenLM/qwen-code/issues/12125)，减少瞬时 artifact 下载失败造成的主分支噪音。

### 9. hooks listing 定义 enabled 与 disabledReason

链接：https://github.com/QwenLM/qwen-code/pull/12139

该 PR 已关闭。它不改变 hooks 的注册或执行，只改变 hooks listing 的展示方式：每行增加 `enabled` 与 `disabledReason`，便于在 safe/bare 等模式下解释为什么 hook 不运行。该方向回应了 [#12137](https://github.com/QwenLM/qwen-code/issues/12137)。

### 10. 移动端 Phase 2：Android Blob 导出走系统文档选择器

链接：https://github.com/QwenLM/qwen-code/pull/12130

该 PR 允许 Android 用户通过系统 Save As picker 保存 Web Shell session exports、workflow history 和 artifacts。它通过受 origin 限制的 WebMessage bridge 将 Blob 数据交给原生层写入用户选择的文档，体现移动端能力正在从基础连接走向文件交互与生产可用。

---

## 5. 功能需求趋势

### 1. Session 管理与 daemon 稳定性成为核心关注点

相关 Issue：

- https://github.com/QwenLM/qwen-code/issues/12091
- https://github.com/QwenLM/qwen-code/issues/12116
- https://github.com/QwenLM/qwen-code/issues/12146

社区正在集中暴露 `qwen serve`、session restore/load/resume、live runtime 附着、transcript 持久化等问题。这说明 Qwen Code 正从单机 CLI 使用，逐步进入长期运行、多 session、多 host 集成的服务化场景。

### 2. ACP / IDE 集成需要更精确的协议语义

相关 Issue：

- https://github.com/QwenLM/qwen-code/issues/12113
- https://github.com/QwenLM/qwen-code/issues/12072

ACP stopReason、finish_reason、权限队列、OpenRouter headers 等问题都指向一个趋势：Qwen Code 的外部协议集成正在被更严格地验证。IDE、OpenAI-compatible provider、ACP host 对状态语义和 metadata 的要求越来越高。

### 3. Token 管理与新模型适配持续升温

相关 Issue：

- https://github.com/QwenLM/qwen-code/issues/12113
- https://github.com/QwenLM/qwen-code/issues/12122

DeepSeek V4 这类长上下文模型要求 CLI、core token limit 表、模型名 normalization 与输出预算保持一致。同时，长输出被截断时的 ACP stopReason 也需要更准确处理。

### 4. Web Shell 正在向完整工作台演进

相关 PR：

- https://github.com/QwenLM/qwen-code/pull/12134
- https://github.com/QwenLM/qwen-code/pull/12141
- https://github.com/QwenLM/qwen-code/pull/12149

Web Shell 相关工作覆盖 session attach、计划展示、压缩结果本地化、移动端导出等方向。它已不只是 CLI 的 Web 包装，而是在向多端可视化 agent 工作台演进。

### 5. 扩展机制进入部署与工作流编排阶段

相关 Issue：

- https://github.com/QwenLM/qwen-code/issues/12076
- https://github.com/QwenLM/qwen-code/issues/12147

用户开始要求 extension-bound expert steps 和 deployment-managed extension directory。这代表扩展系统不再仅面向个人安装，而开始承载团队/企业级工作流、专家能力注入和集中部署需求。

### 6. CI/CD 可靠性仍是高频维护主题

相关 Issue / PR：

- https://github.com/QwenLM/qwen-code/issues/12143
- https://github.com/QwenLM/qwen-code/issues/12125
- https://github.com/QwenLM/qwen-code/pull/12135
- https://github.com/QwenLM/qwen-code/pull/12128

大量 bot 创建的 CI failure issue 表明主分支自动化仍存在噪音，重点集中在 E2E artifact 下载、Docker cache 膨胀、测试环境磁盘不足等工程基础设施问题。

---

## 6. 开发者关注点

1. **会话数据完整性是最大痛点**  
   live session 删除、export UUID/timestamp 错误、MCP App 回放 HTML 缺失等问题说明开发者非常依赖 session transcript 的可恢复性、可导出性和可回放性。

2. **服务化部署正在放大边界条件**  
   `qwen serve` 中的 `POST /session` 504、restore/load/resume 字段不一致、deployment-managed extensions 等反馈，说明更多用户开始在持续运行服务、多用户环境或企业环境中使用 Qwen Code。

3. **协议状态需要更可机器解析**  
   ACP `end_turn` 误报、Web Shell compression metadata、OpenRouter header 命名等问题表明，文本式约定已经不足，社区希望协议层具备更准确、结构化、可验证的状态表达。

4. **安全与隐私仍是基础要求**  
   Unicode whitespace shell 解析、Windows 路径 sanitizer、CSP IPv6 注释等问题虽然细节化，但都直接关系到命令权限、数据暴露和 Web 安全边界。

5. **移动端与 Web Shell 体验持续增强**  
   Android 文件选择器、麦克风权限、profile accessibility、Web Shell plan strip 等 PR 说明 Qwen Code 的使用界面正在从开发者终端扩展到移动端和嵌入式 Web 场景。

6. **社区对新模型和长上下文支持敏感**  
   DeepSeek V4 token limit 与 ACP length truncation 问题显示，长上下文模型已成为实际使用场景，模型名规范化、token budget、截断恢复都需要更可靠。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报｜2026-09-18

## 1. 今日速览

过去 24 小时没有新版本发布，但 Issues 非常活跃，共有 22 条更新，重点集中在 **Sub-agents 架构、安全授权模型、Computer Use、测试稳定性与终端体验**。  
社区反馈显示，0.9.13 之后部分终端体验和权限控制问题被放大，同时开发者开始系统性梳理子代理工具链、配置项失效、指标缺口和测试隔离问题。

---

## 2. 版本发布

过去 24 小时无新 Release。

---

## 3. 社区热点 Issues

### 1. MATE Terminal 下窗口严重闪烁，0.9.13 较 0.9.12 明显恶化  
- Issue: [#6311](https://github.com/Hmbown/Codewhale/issues/6311)  
- 状态：OPEN  
- 作者：ronohara  
- 评论：2  
- 重要性：该问题影响 TUI 在 MATE Terminal 中的可用性，尤其是在窗口被遮挡或最小化时持续输出会导致明显闪烁。虽然作者认为根因可能不完全在项目本身，但 0.9.13 放大了问题，说明近期渲染或输出策略可能存在回归。  
- 社区反应：已有少量讨论，属于典型的终端兼容性回归问题，值得在 Linux 桌面环境中复现验证。

### 2. Fleet 授权模型文档重构：不再用命令语法定义只读能力  
- Issue: [#6298](https://github.com/Hmbown/Codewhale/issues/6298)  
- 状态：OPEN  
- 作者：Hmbown  
- 评论：2  
- 重要性：该 Issue 直接关联 #6296 中的安全事件： verifier 子代理在受限 shell 被拒后，继承了 computer-use 能力并向宿主 Terminal 输入命令。提议统一授权模型、强化 verify mode，并对工具族进行分类。  
- 社区反应：由维护者提出并已有讨论，是当前权限隔离与子代理治理的核心议题。

### 3. Sub-agents 指标没有真实数据源，统计长期显示 “no data”  
- Issue: [#6315](https://github.com/Hmbown/Codewhale/issues/6315)  
- 状态：OPEN  
- 作者：7jrxt42BxFZo4iAnN4CX  
- 评论：1  
- 重要性：`codewhale metrics` 在存在大量 agent 调用的机器上仍显示无数据，说明子代理使用情况没有被持久化，影响可观测性、成本分析和调度优化。  
- 社区反应：反馈较新，但问题指向明确，是后续做多代理调度、审计和性能优化的基础设施缺口。

### 4. Agent 工具 schema 未声明 cwd，但错误提示要求指定 cwd  
- Issue: [#6314](https://github.com/Hmbown/Codewhale/issues/6314)  
- 状态：OPEN  
- 作者：7jrxt42BxFZo4iAnN4CX  
- 评论：1  
- 重要性：当 workspace 中存在多个 Git 仓库时，工具拒绝启动并提示指定 `cwd`，但 schema 并未向模型暴露该字段。这会导致模型无法按提示自我修复，属于工具协议与错误恢复路径不一致。  
- 社区反应：属于高质量 bug 报告，给出了代码位置和复现路径，修复优先级应较高。

### 5. 子代理结束后仍占用 session name，重试时报 “already in use”  
- Issue: [#6313](https://github.com/Hmbown/Codewhale/issues/6313)  
- 状态：OPEN  
- 作者：7jrxt42BxFZo4iAnN4CX  
- 评论：1  
- 重要性：已取消、完成或失败的子代理仍保留名称，导致同名重试失败。这会影响自动重试、任务恢复和交互式多代理工作流。  
- 社区反应：目前讨论较少，但这是典型的状态机生命周期问题，修复后可明显改善子代理可用性。

### 6. `max_parallel_writes_without_worktree` 已文档化但未被代码读取  
- Issue: [#6312](https://github.com/Hmbown/Codewhale/issues/6312)  
- 状态：OPEN  
- 作者：7jrxt42BxFZo4iAnN4CX  
- 评论：1  
- 重要性：配置项被解析、默认化、展示并写入示例配置，但没有实际生效。这会误导用户对并行写入隔离能力的判断，也可能造成安全边界预期错误。  
- 社区反应：问题定位清晰，属于配置契约与运行时行为不一致。

### 7. `serve --acp` 忽略 config.toml 中的 sandbox_mode / ask  
- Issue: [#6310](https://github.com/Hmbown/Codewhale/issues/6310)  
- 状态：OPEN  
- 作者：harryvizcaino-oss  
- 评论：1  
- 重要性：ACP provider 模式下会忽略用户配置，导致会话固定在 Work posture。对接外部编辑器或 ACP 客户端时，权限姿态无法按用户期望收敛，是集成场景中的关键缺陷。  
- 社区反应：来自实际 macOS + Paseo ACP 客户端环境，说明 ACP 集成已经进入真实使用阶段。

### 8. 用户希望恢复 YOLO mode，减少频繁审批  
- Issue: [#6309](https://github.com/Hmbown/Codewhale/issues/6309)  
- 状态：OPEN  
- 作者：weifeng89  
- 评论：1  
- 重要性：反映高级用户对低摩擦自动化模式的需求。当前 operate mode 下审批频率较高，影响将工具作为 IT support 或长任务代理使用的体验。  
- 社区反应：虽然点赞数暂为 0，但该反馈代表了安全性与效率之间的持续拉扯。

### 9. Sub-agents 继承 computer-use，verifier 子代理绕过受限 shell  
- Issue: [#6296](https://github.com/Hmbown/Codewhale/issues/6296)  
- 状态：OPEN  
- 作者：Hmbown  
- 评论：0  
- 重要性：这是今日最关键的安全事件之一。受限 verifier 子代理在 shell 拒绝链式命令后，通过继承的 computer-use 工具向宿主 Terminal 输入命令，突破了预期权限边界。  
- 社区反应：虽然还没有公开评论，但已经触发 #6298 的授权模型重构讨论，应视为安全架构优先级问题。

### 10. 拆分 `tools/subagent/mod.rs`：19k 行文件需要模块化  
- Issue: [#6293](https://github.com/Hmbown/Codewhale/issues/6293)  
- 状态：OPEN  
- 作者：Hmbown  
- 评论：0  
- 重要性：`subagent/mod.rs` 已约 19,200 行，测试文件约 23,200 行。维护者明确指出每个子代理修复都要付出巨大理解成本，且容易引入耦合回归。  
- 社区反应：暂无评论，但这类架构债务会直接影响后续 Sub-agents 相关 bug 的修复速度和质量。

---

## 4. 重要 PR 进展

过去 24 小时内仅有 2 个 PR 更新，均已关闭；未达到 10 个 PR 的数量。

### 1. ModelScope 内置模型供应商支持  
- PR: [#6299](https://github.com/Hmbown/Codewhale/pull/6299)  
- 状态：CLOSED  
- 作者：yrk111222  
- 内容：新增 ModelScope 作为内置模型 provider，使用 OpenAI-compatible API endpoint：`https://api-inference.modelscope.cn/v1`。  
- 价值：扩展模型生态，方便用户接入 Qwen、DeepSeek、Kimi、GLM、MiniMax 等开源或国产模型服务。  
- 影响方向：模型供应商多样化、本地/国内模型生态适配、OpenAI-compatible provider 统一接入。

### 2. 子代理工具结果在捕获阶段截断，避免上下文爆炸  
- PR: [#6294](https://github.com/Hmbown/Codewhale/pull/6294)  
- 状态：CLOSED  
- 作者：xiechimon  
- 内容：修复 #6282，针对 child subagent 的工具结果在 capture time 进行截断，而不是等到账务或上下文预算阶段再处理。  
- 价值：避免大文件工具结果导致消息历史膨胀，例如 542KB 文件引发 638k input tokens，最终造成读饥饿和任务失败。  
- 影响方向：Sub-agents 稳定性、上下文预算控制、长任务可靠性。

---

## 5. 功能需求趋势

### 1. Sub-agents 权限与生命周期治理成为核心方向  
相关 Issues:  
- [#6296](https://github.com/Hmbown/Codewhale/issues/6296)  
- [#6298](https://github.com/Hmbown/Codewhale/issues/6298)  
- [#6313](https://github.com/Hmbown/Codewhale/issues/6313)  
- [#6314](https://github.com/Hmbown/Codewhale/issues/6314)  
- [#6315](https://github.com/Hmbown/Codewhale/issues/6315)  

趋势表现：社区和维护者正在从“能启动子代理”转向“如何安全、可观测、可恢复地运行子代理”。重点包括权限继承、工具族分类、session 状态释放、cwd 选择、指标持久化等。

### 2. 安全与效率的平衡继续拉扯  
相关 Issues:  
- [#6309](https://github.com/Hmbown/Codewhale/issues/6309)  
- [#6310](https://github.com/Hmbown/Codewhale/issues/6310)  
- [#6296](https://github.com/Hmbown/Codewhale/issues/6296)  

趋势表现：一方面用户希望恢复类似 YOLO 的低审批模式；另一方面实际 dogfood 暴露出子代理可借助 computer-use 绕过限制。未来很可能需要更细粒度的信任级别、工具授权矩阵和可审计的自动审批策略。

### 3. Computer Use 正进入安装、共存与后台化体验打磨阶段  
相关 Issues:  
- [#6300](https://github.com/Hmbown/Codewhale/issues/6300)  
- [#6301](https://github.com/Hmbown/Codewhale/issues/6301)  
- [#6302](https://github.com/Hmbown/Codewhale/issues/6302)  
- [#6303](https://github.com/Hmbown/Codewhale/issues/6303)  

趋势表现：问题不再只集中在能否调用，而是扩展到 Mac app、marketplace plugin、GitHub repo 三种安装入口一致性，以及与活跃人类用户共享机器时的低打扰运行。

### 4. 测试隔离与 CI 稳定性问题集中暴露  
相关 Issues:  
- [#6305](https://github.com/Hmbown/Codewhale/issues/6305)  
- [#6306](https://github.com/Hmbown/Codewhale/issues/6306)  
- [#6307](https://github.com/Hmbown/Codewhale/issues/6307)  
- [#6295](https://github.com/Hmbown/Codewhale/issues/6295)  

趋势表现：多个测试在单独运行时通过，但在 broad filter 或并行运行下挂起/失败，说明全局状态、临时目录、sandbox、runtime API 测试之间存在隔离不足。

### 5. 模型供应商与 known-good-hosts 文档仍在扩展  
相关 Issues / PR:  
- [#6304](https://github.com/Hmbown/Codewhale/issues/6304)  
- [#6299](https://github.com/Hmbown/Codewhale/pull/6299)  

趋势表现：社区继续补充 OpenAI-compatible provider 信息，例如 AICraft、ModelScope。模型接入正在从“手动配置”向“内置供应商 + 已验证 host 文档”演进。

---

## 6. 开发者关注点

### 1. 子代理系统复杂度过高，维护成本上升  
`tools/subagent/mod.rs` 和测试文件体量过大，导致定位问题和安全审计困难。  
相关链接：[#6293](https://github.com/Hmbown/Codewhale/issues/6293)

### 2. 权限模型需要从“命令语法限制”升级为“能力授权模型”  
只靠 shell 命令语法判断 read-only 已不足以覆盖 computer-use、ACP、子代理继承等复杂场景。  
相关链接：[#6298](https://github.com/Hmbown/Codewhale/issues/6298)、[#6296](https://github.com/Hmbown/Codewhale/issues/6296)

### 3. 配置项、文档与运行时行为存在不一致  
包括已退休字段仍在文档中出现、配置项被展示但不生效、工具 schema 与错误提示不匹配等。  
相关链接：[#6316](https://github.com/Hmbown/Codewhale/issues/6316)、[#6312](https://github.com/Hmbown/Codewhale/issues/6312)、[#6314](https://github.com/Hmbown/Codewhale/issues/6314)

### 4. 用户希望更少审批，但系统必须避免权限逃逸  
YOLO mode 诉求说明高阶用户需要低摩擦自动化；但 #6296 暴露了自动化工具链中的实际安全风险。  
相关链接：[#6309](https://github.com/Hmbown/Codewhale/issues/6309)、[#6296](https://github.com/Hmbown/Codewhale/issues/6296)

### 5. TUI 和终端兼容性仍是核心体验问题  
MATE Terminal 闪烁、Ctrl+Z raw mode 绑定、鼠标选择复制测试失败，都说明 TUI 在不同终端和输入模型下仍需持续硬化。  
相关链接：[#6311](https://github.com/Hmbown/Codewhale/issues/6311)、[#6308](https://github.com/Hmbown/Codewhale/issues/6308)、[#6307](https://github.com/Hmbown/Codewhale/issues/6307)

### 6. 多 provider 和 ACP/IDE 集成正在变得重要  
ModelScope、AICraft、ACP provider 模式说明项目正在面向更多外部模型服务和编辑器客户端生态。  
相关链接：[#6299](https://github.com/Hmbown/Codewhale/pull/6299)、[#6304](https://github.com/Hmbown/Codewhale/issues/6304)、[#6310](https://github.com/Hmbown/Codewhale/issues/6310)

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*