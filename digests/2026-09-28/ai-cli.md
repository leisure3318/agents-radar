# AI CLI 工具社区动态日报 2026-09-28

> 生成时间: 2026-09-28 04:16 UTC | 覆盖工具: 9 个

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

# 2026-09-28 AI CLI 工具生态横向对比分析报告

## 1. 生态全景

AI CLI 工具正在从“命令行问答/代码生成器”快速演进为 **多端 Agent 工作台**：CLI、TUI、桌面端、Web UI、IDE 插件、移动端和云端会话正在逐步融合。  
今日社区反馈的主线集中在 **会话状态一致性、MCP/工具生态、跨平台兼容性、安全权限边界、企业网络与遥测合规**。  
从活跃度看，OpenAI Codex、Qwen Code、OpenCode、Claude Code 处于高频迭代和高问题暴露阶段；Gemini CLI 则明显聚焦安全边界和 Agent 状态机修复。  
整体趋势表明，AI CLI 工具的竞争重点已不只是模型能力，而是 **运行时可靠性、工具调用闭环、平台适配、权限治理和真实工程工作流集成能力**。

---

## 2. 各工具活跃度对比

> 注：以下 Issues / PR 数量基于日报摘要中明确列出的过去 24 小时更新情况；部分项目实际总数可能更高。

| 工具 | 仓库 | 今日 Issues 活跃度 | 今日 PR 活跃度 | Release 情况 | 今日关键词 |
|---|---|---:|---:|---|---|
| Claude Code | anthropics/claude-code | ≥10 | 1 | 无 | 云/本地会话、MCP、沙箱、GitHub 集成、VS Code/iOS |
| OpenAI Codex | openai/codex | ≥10 | ≥10 | 7 个 Rust alpha | Windows 稳定性、TUI、daemon、MCP、桌面端 |
| Gemini CLI | google-gemini/gemini-cli | 4 | 8 | 1 个 nightly | Agent history、MCP structuredContent、安全边界 |
| GitHub Copilot CLI | github/copilot-cli | 2 | 0 | 无 | BYOK 多 Provider、ARM64 Linux 兼容 |
| Kimi Code CLI | MoonshotAI/kimi-cli | 0 | 0 | 无 | 无活动 |
| OpenCode | anomalyco/opencode | ≥10 | ≥10 | 无 | V2 桌面端/Web/TUI、MCP、Session/Tab |
| Pi | badlogic/pi-mono / earendil-works/pi | 13 | 3 | 无 | 会话性能、TUI、Provider 兼容、长输出 |
| Qwen Code | QwenLM/qwen-code | ≥10 | ≥10 | 无 | Managed Agent、Web Shell、遥测隐私、Ollama |
| DeepSeek TUI / Codewhale | Hmbown/Codewhale | 4 | 10 | 无 | Provider 配置、OpenRouter 计费、CLI exec、安全策略 |

### 活跃度判断

- **最高活跃组**：OpenAI Codex、Qwen Code、OpenCode、Claude Code  
  问题和 PR 都覆盖多个子系统，说明产品面和技术面都在快速扩张。
- **安全/稳定性集中修复组**：Gemini CLI、DeepSeek TUI、Pi  
  今日变更更聚焦运行时边界、工具调用、路径安全、会话状态。
- **低活动组**：GitHub Copilot CLI、Kimi Code CLI  
  Copilot CLI 有明确但数量较少的需求信号；Kimi Code CLI 今日无社区活动。

---

## 3. 共同关注的功能方向

### 3.1 会话状态一致性与长会话可靠性

涉及工具：

- Claude Code
  - `/resume` 不刷新 `CLAUDE.md` 和 memory。
  - 恢复会话后进入 agents 导致对话 fork。
  - VS Code plan review 显示旧版本计划。
- OpenAI Codex
  - thread 预热、归档、daemon/session 管理持续优化。
- Gemini CLI
  - `/rewind` 或 stream abort 后 history 以 model turn 结尾导致 400。
- OpenCode
  - session wake 失败导致 prompt 滞留。
  - Anthropic system update 与 tool result 顺序冲突。
- Pi
  - attach / new_chat 延迟随运行时间退化。
  - streaming 渲染成本随 transcript 增长。
- Qwen Code
  - Managed Agent session close/archive/delete 持久化。
  - Session Store failure gates。

**判断**：  
长会话、多入口、多 Agent、多 Provider 场景下，“会话看起来还在”不等于“上下文、工具状态、权限状态都一致”。会话状态机正在成为 AI CLI 的核心基础设施。

---

### 3.2 MCP 与工具生态稳定性

涉及工具：

- Claude Code
  - Windows agent-scoped MCP stdio 参数传递失败。
  - macOS plugin MCP server 被反复杀死。
  - Linux browser MCP 权限误拒。
- OpenAI Codex
  - 内置 `codex_apps` MCP 在 Windows 启动失败。
  - MCP server 状态发现与 thread 连接复用。
- Gemini CLI
  - MCP `structuredContent` 返回被记录为空 `functionResponse`。
- OpenCode
  - MCP stdio 超大帧不应撕裂整个连接。
  - Location 关闭时同步关闭 MCP servers。
- Qwen Code
  - `qwen mcp reconnect` 在关闭 usage statistics 后仍发送 telemetry。
- DeepSeek TUI
  - MCP / shell policy / workspace 读取边界加固。

**判断**：  
MCP 已成为 AI CLI 工具生态的事实扩展层，但当前问题集中在 **协议兼容、生命周期、权限、跨平台 stdio、遥测行为、错误隔离**。未来 MCP 稳定性会直接影响工具生态质量。

---

### 3.3 跨平台兼容性，尤其是 Windows 与 ARM64 Linux

涉及工具：

- OpenAI Codex
  - Windows daemon 安装失败。
  - Windows desktop 无限加载。
  - shell 执行 CMD/PowerShell 窗口闪烁、抢焦点。
  - Windows `--no-daemon` TUI 状态栏消失。
- Claude Code
  - Windows MCP 参数传递问题。
  - Linux sandbox 在 self-hosted GitHub Actions runner 下失败。
- GitHub Copilot CLI
  - ARM64 / Asahi Linux 上捆绑 `ripgrep` 因 jemalloc page size 崩溃。
- OpenCode
  - Windows PowerShell 无法原地升级。
  - macOS 签名问题导致 SSH 启动被 taskgated 杀死。
- Pi
  - macOS clipboard / OSC 52 / tmux 场景问题。
  - TTY stdin EIO 导致崩溃。
- Qwen Code
  - macOS Desktop 右侧面板关闭问题。
  - Webview / Remote-SSH 场景崩溃。

**判断**：  
AI CLI 已进入真实开发环境，不能只覆盖 Linux/macOS happy path。Windows、Remote-SSH、tmux、WSL、Asahi Linux、企业 runner、CI/CD 都在成为必测环境。

---

### 3.4 安全、权限、遥测与企业合规

涉及工具：

- Gemini CLI
  - headless folder trust 状态误传播。
  - A2A server 不应从外部 `agentSettings` 推导 trust。
  - glob / checkpoint 路径穿越修复。
  - external checker 环境变量泄露风险。
- Qwen Code
  - aux-model selector 泄露带 userinfo 的 `baseUrl`。
  - usage statistics opt-out 后仍发送 RUM。
  - PreToolUse hook 增加 `failMode: closed`。
- Claude Code
  - MCP Manual mode 仍被 classifier 拒绝。
  - safeguard false positive。
  - telemetry collector 在 sec-default 下强化组织策略。
- DeepSeek TUI
  - shell policy 解析失败 fail closed。
  - workspace-controlled 文件读取 no-follow / containment-check。
- Pi
  - auto-mode bash 审批误判 benign token echo。
- OpenAI Codex
  - Guardian / safety / quota / auth 状态相关问题。

**判断**：  
企业用户可以接受安全边界，但不能接受“不知道为什么被拒绝”或“关闭遥测后仍上传”。未来竞争点会包括：权限解释、审计日志、fail-open/fail-closed 策略、组织级策略强制和隐私配置一致性。

---

### 3.5 多 Provider、本地模型与 BYOK

涉及工具：

- GitHub Copilot CLI
  - BYOK 希望支持多个外部 Provider / Model。
- Qwen Code
  - Ollama 零参数工具 schema 兼容。
  - 32K 自定义 Provider 上下文预算指导。
  - Mem0 可选记忆能力。
- Pi
  - OpenAI Responses、OpenRouter、Claude、Fireworks 等兼容问题。
  - reasoning delta 兼容修复。
- DeepSeek TUI
  - Tsubasa Provider preset。
  - OpenRouter 计费修复。
  - 首次启动 route/provider 解析。
- OpenCode
  - Anthropic / Gemini / OpenAI-compatible 协议差异。
- OpenAI Codex
  - 自定义 provider 与 ChatGPT subscription rate limit 的边界问题。

**判断**：  
开发者正在要求 AI CLI 从“绑定某个官方模型”转向“多 Provider 编排层”。模型选择、工具 schema 归一化、计费估算、上下文预算和 BYOK 治理都会成为核心能力。

---

## 4. 差异化定位分析

### Claude Code

**定位**：Anthropic 生态下的多端 Agent 开发工作台。  
**侧重**：

- Claude 原生模型能力。
- 多端入口：CLI、Web、iOS、VS Code、桌面端。
- GitHub 集成、云端会话、agent view、MCP 插件。

**当前痛点**：

- 云/本地会话边界不够清晰。
- GitHub App 授权状态和实际访问能力不一致。
- MCP 权限、安全 classifier 与用户授权之间存在冲突。
- 多端 UI 状态同步问题开始增多。

**适合用户**：重度 Claude 用户、需要多端协作和云端代码会话的开发团队。

---

### OpenAI Codex

**定位**：OpenAI 面向 Agentic coding 的 CLI + 桌面端 + app-server runtime。  
**侧重**：

- Rust CLI/TUI 快速迭代。
- app-server daemon。
- Windows 桌面端。
- MCP、Computer Use、thread prewarming、TUI 交互。

**当前痛点**：

- Windows 端稳定性问题非常集中。
- daemon / sandbox / desktop 启动链路复杂。
- TUI 高频交互细节仍在打磨。
- 订阅、rate limit、自定义 provider 状态展示存在不一致。

**适合用户**：希望使用 OpenAI 模型、桌面端和 CLI 深度结合的开发者；但 Windows 用户短期需关注稳定性。

---

### Gemini CLI

**定位**：Google Gemini 生态下偏安全、自动化、Agent runtime 的 CLI。  
**侧重**：

- Agent history 状态机。
- Workspace trust。
- Headless / A2A server。
- 文件系统访问安全。
- Nightly 快速发布。

**当前痛点**：

- MCP `structuredContent` 兼容性。
- `/rewind` 和 stream abort 后的 history 合法性。
- 账号资格 / 产品许可问题影响使用入口。

**适合用户**：重视 Google 生态、自动化执行、安全边界和 headless 场景的团队。

---

### GitHub Copilot CLI

**定位**：GitHub Copilot 体系中的命令行入口。  
**侧重**：

- 与 Copilot App / GitHub 生态一致性。
- BYOK 外部模型配置。
- 简化 CLI 内开发辅助。

**当前痛点**：

- 社区活跃度相对较低。
- BYOK 多 Provider 能力落后于 Copilot App。
- ARM64 Linux 捆绑依赖兼容性不足。

**适合用户**：GitHub / Copilot 生态用户，尤其是希望在终端中复用 Copilot 能力的开发者。

---

### OpenCode

**定位**：开放式、多 Provider、V2 桌面/Web/TUI 一体的 AI coding 工作台。  
**侧重**：

- V2 Desktop / Web UI / TUI。
- 多 session / tab 工作流。
- MCP 生命周期管理。
- 多 Provider 兼容。
- Web 服务化和移动端访问。

**当前痛点**：

- V2 稳定性仍在快速修复期。
- TUI OOM、session wake、provider history 等运行时问题需要关注。
- Desktop 多项目 tab 信息架构仍需系统设计。
- 跨平台安装和签名链路不够成熟。

**适合用户**：希望使用开放、多 Provider、可自托管/可扩展 AI coding 工作台的开发者。

---

### Pi

**定位**：强调 Agent 运行时、扩展系统、TUI 性能和多 Provider 兼容的开发工具。  
**侧重**：

- 大型扩展配置。
- 长会话性能。
- 多模型运行时。
- TUI/CLI 真实终端体验。
- 长输出压缩和上下文保真。

**当前痛点**：

- 大量扩展时 session 创建性能退化。
- 长时间运行后 attach/new_chat 延迟增加。
- 跨 Provider transcript 兼容成本高。
- 上下文注入透明度不足。

**适合用户**：需要高度可扩展 Agent runtime、多 Provider 实验和长会话性能优化的技术用户。

---

### Qwen Code

**定位**：Qwen 模型生态下向 Managed Agent、多 Agent、Web Shell/Desktop 演进的平台型工具。  
**侧重**：

- Managed Agent。
- 持久 session lifecycle。
- Web Shell / Desktop。
- 自定义 Provider / Ollama。
- 企业代理、遥测、隐私配置。
- Mem0 长期记忆集成。

**当前痛点**：

- v0.24.6 UI/CLI 稳定性问题较多。
- Webview、右侧面板、`/cd` 等基础交互需修复。
- 代理、遥测、NO_PROXY、usage statistics 需要端到端一致。
- 工具 schema 跨模型兼容仍需增强。

**适合用户**：Qwen 模型用户、希望构建托管 Agent、多 Agent、私有模型/本地模型工作流的团队。

---

### DeepSeek TUI / Codewhale

**定位**：轻量 TUI/CLI Agent 工具，强调 Provider 配置、成本可见性和安全执行策略。  
**侧重**：

- Provider route。
- OpenRouter 计费。
- `exec` 自动化。
- shell policy。
- workspace 文件读取安全。
- TUI 首次启动体验。

**当前痛点**：

- Provider preset 覆盖仍需扩展。
- hook 审计数据不足。
- 多 Provider 配置优先级需继续打磨。

**适合用户**：偏终端、重视 Provider 切换、成本估算、shell 执行安全的开发者。

---

### Kimi Code CLI

**定位**：当前信息不足。  
**今日状态**：过去 24 小时无活动。  
**判断**：短期社区信号较弱，暂不适合基于今日数据评估技术方向。

---

## 5. 社区热度与成熟度

### 5.1 高热度、高迭代工具

#### OpenAI Codex

- 7 个 alpha release。
- ≥10 个 PR。
- ≥10 个 issue。
- Windows、TUI、daemon、MCP 同时推进。

**成熟度判断**：  
功能覆盖广，但处于快速演进和稳定性补课阶段。适合早期采用者，不适合对 Windows 生产稳定性要求极高的场景。

#### Qwen Code

- ≥10 个 issue。
- ≥10 个 PR。
- Managed Agent 主线清晰。
- 安全、隐私、UI、Provider、CI 同时活跃。

**成熟度判断**：  
正在从 CLI 向平台型 Agent runtime 演进。能力边界扩张快，但 v0.24.6 暴露出较多交互和集成问题。

#### OpenCode

- ≥10 个 issue。
- ≥10 个 PR。
- V2 桌面/Web/TUI 问题密集。
- MCP、session、provider、移动端都有修复。

**成熟度判断**：  
社区反馈和维护响应都很活跃。V2 处于快速打磨期，适合愿意参与迭代的开发者。

#### Claude Code

- Issue 覆盖面广。
- PR 较少，但问题信号集中在高价值能力：云端会话、GitHub、MCP、VS Code、iOS。

**成熟度判断**：  
产品形态成熟度较高，但多端和云/本地混合执行带来了新的复杂性。关键是提升状态可见性和权限一致性。

---

### 5.2 中等热度、重点修复工具

#### Gemini CLI

- Issue 数不多，但 PR 质量高。
- 多个 P1/P2 安全和稳定性修复。
- Nightly 发布稳定。

**成熟度判断**：  
维护方向清晰，偏工程化和安全边界。社区讨论量不如 Codex/Qwen/OpenCode，但修复聚焦度高。

#### Pi

- 13 个 issue，多数已关闭。
- 维护响应快。
- 重点在性能、TUI、Provider 兼容。

**成熟度判断**：  
运行时和扩展系统正在优化。适合技术用户，但大型扩展和长时间运行场景仍需观察。

#### DeepSeek TUI

- Issue 较少，PR 较多。
- 多个安全和 Provider 相关修复已关闭。
- 维护节奏积极。

**成熟度判断**：  
工具较聚焦，TUI/CLI 自动化体验持续改善。相比平台型工具，范围更窄但修复速度快。

---

### 5.3 低活动工具

#### GitHub Copilot CLI

- 2 个 issue。
- 无 PR、无 release。
- 需求集中但社区活动较低。

**成熟度判断**：  
背靠 GitHub/Copilot 生态，但 CLI 侧今日活跃度不高。BYOK 多 Provider 是值得关注的潜在方向。

#### Kimi Code CLI

- 无活动。

**成熟度判断**：  
今日无有效信号。

---

## 6. 值得关注的趋势信号

### 趋势一：AI CLI 正在变成“Agent 操作系统”

过去的 CLI 主要是问答和代码补全；现在多个工具都在建设：

- 持久 session。
- 多 Agent。
- MCP server。
- 工具权限。
- workspace trust。
- 云端/本地混合执行。
- 桌面/Web/IDE/移动端入口。

代表工具：

- Qwen Code：Managed Agent、Session Store、durable lifecycle。
- Claude Code：云端会话、remote control、多端状态。
- OpenAI Codex：app-server daemon、MCP、Computer Use。
- OpenCode：V2 Desktop/Web/TUI、MCP 生命周期。

**对开发者的参考价值**：  
选择 AI CLI 时，应评估其是否具备稳定的 runtime，而不仅是模型调用能力。

---

### 趋势二：MCP 已成为扩展生态核心，但仍处在稳定性建设期

今日多个项目的 MCP 问题覆盖：

- 参数传递。
- structuredContent 兼容。
- stdio 生命周期。
- 超大帧处理。
- reconnect 行为。
- 权限模式。
- server 状态发现。

**对开发者的参考价值**：  
如果团队计划基于 MCP 构建内部工具，应优先验证：

1. Windows/macOS/Linux 行为是否一致；
2. stdio server 崩溃或超大响应时是否会污染整个会话；
3. 权限审批和审计日志是否符合企业要求；
4. 工具返回结构是否能被模型正确消费。

---

### 趋势三：Windows 是当前 AI coding 工具的最大稳定性战场

OpenAI Codex 今日 Windows 问题尤其集中：

- daemon 安装失败。
- desktop loading spinner。
- CMD/PowerShell 窗口抢焦点。
- TUI 状态栏消失。
- MCP 启动失败。

其他工具也存在 Windows / PowerShell / Remote-SSH / macOS 签名问题。

**对开发者的参考价值**：  
企业若以 Windows 为主力开发环境，应谨慎评估：

- 后台 daemon 安装权限；
- PowerShell / CMD 工具调用体验；
- sandbox / reparse point / UAC 行为；
- 桌面端自动更新稳定性。

---

### 趋势四：安全边界从“功能附属”变成“核心竞争力”

Gemini CLI、Qwen Code、DeepSeek TUI、Claude Code 都出现了高优先级安全/权限/隐私问题：

- workspace trust 误传播；
- 路径穿越；
- 环境变量泄露；
- telemetry opt-out 不生效；
- 凭据出现在 baseUrl 输出；
- classifier 误拒；
- shell policy fail closed。

**对开发者的参考价值**：  
在生产或企业环境中，应优先选择支持以下能力的工具：

- 明确的权限模型；
- 可解释的拒绝原因；
- 遥测可关闭且行为可验证；
- hook 支持 fail-closed；
- 工具调用审计；
- workspace 文件访问 containment；
- 组织级策略管理。

---

### 趋势五：多 Provider 与 BYOK 正在成为标配需求

用户不再满足于单一模型后端，而是希望：

- 配置多个 Provider；
- 按任务选择模型；
- 使用本地 Ollama；
- 接入 OpenRouter；
- 支持 OpenAI-compatible provider；
- 控制上下文预算；
- 显示成本和 token 使用；
- BYOK 与官方订阅额度边界清晰。

代表工具：

- Copilot CLI：多 Provider BYOK 诉求。
- Qwen Code：Ollama、自定义 Provider、32K context。
- DeepSeek TUI：OpenRouter 计费、Tsubasa preset。
- Pi / OpenCode：多 Provider transcript/tool-call 兼容。

**对开发者的参考价值**：  
未来 AI CLI 选型应看其是否具备 Provider 抽象层，而不是只看默认模型质量。

---

### 趋势六：上下文预算和状态可观测性变得越来越重要

多个问题本质上都指向“用户不知道实际送给模型的是什么”：

- Claude Code `/resume` 不刷新 CLAUDE.md。
- Pi `AGENTS.md` 被读取但未注入 system prompt。
- Qwen Code exclude skill 后仍注入 Skills listing。
- Gemini CLI structuredContent 被丢失。
- OpenCode compaction reason 不准确。
- DeepSeek TUI hook 不知道真实执行命令。

**对开发者的参考价值**：  
高质量 AI CLI 需要提供：

- prompt/context inspection；
- tool-call trace；
- compaction reason；
- model/provider route 显示；
- 成本和 token 统计；
- session 状态和工作目录可见性。

否则长任务和团队协作会很难 debug。

---

## 结论

今日 AI CLI 工具生态呈现出明显的平台化趋势：工具不再只是“调用模型的终端壳”，而是在演进为具备 **会话管理、工具生态、权限模型、多端 UI、多 Provider 路由和企业合规能力** 的 Agent runtime。

从技术决策角度看：

- 若关注 **Claude 生态和云端代码会话**：Claude Code 最值得跟踪，但需关注状态一致性和 GitHub/MCP 稳定性。
- 若关注 **OpenAI 模型和桌面/CLI 一体化**：Codex 迭代最快，但 Windows 稳定性是短期风险。
- 若关注 **安全边界和自动化执行**：Gemini CLI 今日信号最强。
- 若关注 **开放、多 Provider、Web/Desktop/TUI 工作台**：OpenCode 和 Qwen Code 处于快速平台化阶段。
- 若关注 **终端原生、Provider 配置和成本可见性**：DeepSeek TUI 是轻量但活跃的选择。
- 若关注 **扩展系统和长会话性能实验**：Pi 值得技术型团队观察。
- 若已深度使用 GitHub/Copilot：Copilot CLI 的 BYOK 多 Provider 能力是后续关键看点。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告  
数据截止：2026-09-28  
仓库：github.com/anthropics/skills

> 注：PR 列表标注为“按评论数排序”，但评论数字段显示为 `undefined`，因此以下热度判断基于排序位置、Issue 关联度、更新时间与社区问题集中度综合分析。

---

## 1. 热门 Skills 排行

### 1. `skill-creator` 修复与评估体系改进  
- PR：[#1298 fix(skill-creator): isolate trigger evals and handle Windows and runtime failures](https://github.com/anthropics/skills/pull/1298)  
- 状态：OPEN  
- 功能：修复 Skill 触发评估中的误判、Windows 子进程兼容性问题、运行时失败被错误计为非触发的问题。  
- 社区讨论热点：  
  - Skill 触发评估准确性  
  - Windows 环境兼容  
  - 运行失败与负样本判断逻辑  
  - 与 Issue [#556](https://github.com/anthropics/skills/issues/556)、[#1383](https://github.com/anthropics/skills/issues/1383) 高度相关  
- 热度判断：`skill-creator` 是生态基础设施，多个 Issue 和 PR 都围绕其可靠性、安全性、验证流程展开，是当前最受关注的核心模块。

---

### 2. `mcp-builder` MCP 2.x 兼容修复  
- PR：[#1742 fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers](https://github.com/anthropics/skills/pull/1742)  
- 状态：OPEN  
- 功能：适配 `mcp>=2.0.0` 中 `streamable_http_client` 的导入变更，并支持自定义 HTTP headers。  
- 社区讨论热点：  
  - MCP 生态快速演进导致的兼容性问题  
  - MCP Server 连接、认证、HTTP headers 支持  
  - 与 Issue [#1390](https://github.com/anthropics/skills/issues/1390) 中 MCP evaluation 失败问题方向一致  
- 热度判断：MCP 是 Claude Code 外部工具生态的重要入口，`mcp-builder` 的稳定性直接影响 Skills 与外部服务集成。

---

### 3. `proofcore-contract-auditor` 智能合约审计  
- PR：[#1771 feat(skills): add proofcore-contract-auditor for smart contract notarization](https://github.com/anthropics/skills/pull/1771)  
- 状态：OPEN  
- 功能：为 Web3 开发者提供 Solidity 与 Rust 智能合约静态分析，并将审计证明锚定到 TON Blockchain。  
- 社区讨论热点：  
  - 智能合约自动审计  
  - 加密证明与审计可验证性  
  - Web3 场景下的安全自动化  
- 热度判断：属于垂直领域高价值 Skill，结合安全审计与区块链证明，具备较强差异化。

---

### 4. `docx` 文档处理稳定性增强  
- PR：[#1734 Detect orphaned docx comments](https://github.com/anthropics/skills/pull/1734)  
- PR：[#1792 fix(docx): report LibreOffice timeout as an error and verify the output](https://github.com/anthropics/skills/pull/1792)  
- PR：[#541 fix(docx): prevent tracked change w:id collision with existing bookmarks](https://github.com/anthropics/skills/pull/541)  
- 状态：OPEN  
- 功能：改进 DOCX 评论、修订痕迹、LibreOffice 转换超时、OOXML ID 冲突等文档处理问题。  
- 社区讨论热点：  
  - 生成文档的可靠性  
  - tracked changes 正确性  
  - Word / LibreOffice 兼容  
  - 企业文档自动化中的文件损坏风险  
- 热度判断：文档类 Skills 是官方仓库中的核心应用场景之一，DOCX 相关 PR 数量多、问题细，说明社区使用频率高。

---

### 5. `md2video-audio` Markdown 转视频与语音  
- PR：[#1703 Add md2video-audio skill](https://github.com/anthropics/skills/pull/1703)  
- 状态：OPEN  
- 功能：将 Markdown 文档编译为带拟真人声旁白的 MP4 视频，使用 Marp 等工具生成演示幻灯片。  
- 社区讨论热点：  
  - 内容生产自动化  
  - 文档到视频的低成本转换  
  - 教学、培训、营销材料生成  
- 热度判断：代表社区对“多模态内容生成型 Skills”的需求，尤其是从文本资产自动扩展到视频资产。

---

### 6. `notion-spec-to-implementation` 与 `quantitative-resume-auditor`  
- PR：[#1245 Add notion-spec-to-implementation and quantitative-resume-auditor skills](https://github.com/anthropics/skills/pull/1245)  
- 状态：OPEN  
- 功能：  
  - `notion-spec-to-implementation`：将 Notion 中的产品或技术规格转化为可执行任务。  
  - `quantitative-resume-auditor`：量化评估简历质量。  
- 社区讨论热点：  
  - 产品规格到工程任务的自动拆解  
  - Notion 与 Claude Code 工作流衔接  
  - 职业材料质量评估  
- 热度判断：体现社区对“业务文档 → 可执行工程任务”的强需求，是典型工作流自动化方向。

---

### 7. `pyxel` 复古游戏开发 Skill  
- PR：[#525 Add pyxel skill for retro game development](https://github.com/anthropics/skills/pull/525)  
- 状态：OPEN  
- 功能：支持使用 Python Pyxel 框架创建、调试、验证复古游戏，包括无头运行、帧检查和状态验证。  
- 社区讨论热点：  
  - 游戏开发自动化  
  - 可视化结果验证  
  - Headless 测试与交互模拟  
- 热度判断：虽然是垂直场景，但覆盖“代码生成 + 运行验证 + 可视化调试”的完整闭环，具备示范价值。

---

### 8. `awt` AI 端到端测试 Skill  
- PR：[#822 feat: add AWT AI-powered E2E testing skill](https://github.com/anthropics/skills/pull/822)  
- 状态：OPEN  
- 功能：引入 AI Watch Tester，让 Claude 通过视觉与浏览器控制自动执行 E2E 测试。  
- 社区讨论热点：  
  - 零代码测试生成  
  - 浏览器自动化  
  - AI 驱动的视觉回归与端到端验证  
- 热度判断：测试自动化是社区持续关注方向，该 Skill 与 Issue 中关于 eval、trigger、quality gate 的讨论形成呼应。

---

## 2. 社区需求趋势

### 1. 安全、权限与信任边界  
- Issue：[#492 Security: Community skills distributed under anthropic namespace enable trust boundary abuse](https://github.com/anthropics/skills/issues/492)  
- Issue：[#1394 skill-creator eval-viewer display-path XSS](https://github.com/anthropics/skills/issues/1394)  
- Issue：[#1175 Concerns regarding Security and Context Window when handling SharePoint Online documents](https://github.com/anthropics/skills/issues/1175)  
- 趋势：社区高度关注 Skill 的来源可信度、命名空间隔离、权限边界、XSS、企业文档访问控制等问题。  
- 代表需求：官方与社区 Skill 明确区分、权限声明、审计机制、安全沙箱。

---

### 2. 组织级共享与企业分发  
- Issue：[#228 Enable org-wide skill sharing in Claude.ai](https://github.com/anthropics/skills/issues/228)  
- 趋势：用户希望在组织内部集中管理、分享和分发 Skills，而不是手动传 `.skill` 文件。  
- 代表需求：企业 Skill Library、组织级安装、共享链接、版本控制与权限管理。

---

### 3. Skill 触发、评估与质量验证  
- Issue：[#556 run_eval.py: claude -p never triggers skills/commands](https://github.com/anthropics/skills/issues/556)  
- Issue：[#1383 skill-creator silent benchmark failures](https://github.com/anthropics/skills/issues/1383)  
- PR：[#1298](https://github.com/anthropics/skills/pull/1298)  
- 趋势：社区不只需要创建 Skill，还需要可靠判断 Skill 是否会被正确触发、是否有效、是否退化。  
- 代表需求：标准化 eval、trigger 测试、benchmark、质量门禁、自动验证工具。

---

### 4. 文档自动化与 Office 格式处理  
- PR：[#1734 Detect orphaned docx comments](https://github.com/anthropics/skills/pull/1734)  
- PR：[#1792 fix(docx): report LibreOffice timeout as an error and verify the output](https://github.com/anthropics/skills/pull/1792)  
- PR：[#514 Add document-typography skill](https://github.com/anthropics/skills/pull/514)  
- PR：[#486 Add ODT skill](https://github.com/anthropics/skills/pull/486)  
- 趋势：文档生成、修订、排版、格式转换仍是高频需求，尤其面向企业办公场景。  
- 代表需求：DOCX / PDF / ODT / LibreOffice 兼容、排版质量控制、修订痕迹处理。

---

### 5. 测试生成与软件质量保障  
- PR：[#822 AWT AI-powered E2E testing skill](https://github.com/anthropics/skills/pull/822)  
- PR：[#723 testing-patterns skill](https://github.com/anthropics/skills/pull/723)  
- Issue：[#1385 Reasoning Quality Gate Pipeline](https://github.com/anthropics/skills/issues/1385)  
- 趋势：社区希望 Claude Code 不只是写代码，还能生成测试、执行验证、进行质量审查。  
- 代表需求：E2E 测试、单元测试模式、React 测试、质量门禁、交付前验证。

---

### 6. 工作流自动化与外部系统集成  
- PR：[#1245 notion-spec-to-implementation](https://github.com/anthropics/skills/pull/1245)  
- PR：[#1742 mcp-builder fix](https://github.com/anthropics/skills/pull/1742)  
- Issue：[#29 Usage with Bedrock](https://github.com/anthropics/skills/issues/29)  
- 趋势：Skills 正在从单点能力走向企业工作流编排，与 Notion、MCP、Bedrock、SharePoint 等系统连接。  
- 代表需求：规格转任务、MCP 工具集成、云平台部署、企业知识库访问。

---

## 3. 高潜力待合并 Skills

### 1. `md2video-audio`  
- PR：[#1703](https://github.com/anthropics/skills/pull/1703)  
- 状态：OPEN  
- 潜力原因：覆盖 Markdown、幻灯片、语音、视频生成完整链路，适合内容生产、培训、课程和营销场景。  
- 落地可能性：高。功能边界清晰，用户价值直观。

---

### 2. `notion-spec-to-implementation`  
- PR：[#1245](https://github.com/anthropics/skills/pull/1245)  
- 状态：OPEN  
- 潜力原因：连接产品规格与工程执行，是 Claude Code 在团队协作中的典型高价值用例。  
- 落地可能性：高。若解决 Notion 认证与权限边界问题，应用面较广。

---

### 3. `awt` AI-powered E2E testing  
- PR：[#822](https://github.com/anthropics/skills/pull/822)  
- 状态：OPEN  
- 潜力原因：测试自动化需求强，尤其是浏览器控制、视觉验证、零代码测试生成。  
- 落地可能性：中高。依赖外部工具能力，可能需要额外安全与稳定性审查。

---

### 4. `testing-patterns`  
- PR：[#723](https://github.com/anthropics/skills/pull/723)  
- 状态：OPEN  
- 潜力原因：提供通用测试哲学与实践模式，适合广泛软件开发场景。  
- 落地可能性：高。偏指导型 Skill，风险低，适合作为基础开发 Skill。

---

### 5. `document-typography`  
- PR：[#514](https://github.com/anthropics/skills/pull/514)  
- 状态：OPEN  
- 潜力原因：解决 AI 生成文档中常见但容易被忽略的排版质量问题，如孤行、寡行、编号错位。  
- 落地可能性：中高。与现有文档 Skills 互补明显。

---

### 6. `pyxel`  
- PR：[#525](https://github.com/anthropics/skills/pull/525)  
- 状态：OPEN  
- 潜力原因：虽然领域较窄，但展示了 Claude Code 在图形程序、游戏调试、帧级验证中的能力边界。  
- 落地可能性：中。可能作为示范型 Skill 或垂直开发 Skill 合并。

---

### 7. `proofcore-contract-auditor`  
- PR：[#1771](https://github.com/anthropics/skills/pull/1771)  
- 状态：OPEN  
- 潜力原因：Web3 安全审计属于高价值垂直场景，结合链上证明具有差异化。  
- 落地可能性：中。可能需要更严格的安全声明、误报控制与外部依赖审查。

---

## 4. Skills 生态洞察

**一句话总结：当前 Claude Code Skills 社区最集中的诉求，是让 Skills 从“可写、可分享”升级为“可信、可评估、可组织化分发，并能稳定接入真实工作流”。**

---

# Claude Code 社区动态日报  
日期：2026-09-28  
仓库：anthropics/claude-code

## 1. 今日速览

过去 24 小时没有新版本发布，但 Issue 活跃度较高，新增/更新问题集中在 **远程/云端会话、MCP、沙箱、GitHub 集成、VS Code/iOS/桌面端体验** 等方向。  
社区反馈显示，Claude Code 正在从单一 CLI 工具扩展到多端、多会话、多环境协作场景，但由此带来的 **会话状态一致性、权限边界、平台差异和 UI 可辨识性** 问题开始增多。

---

## 2. 社区热点 Issues

### 1. macOS TUI：恢复会话后进入 agents 导致对话被 fork  
Issue：[#97736](https://github.com/anthropics/claude-code/issues/97736)  
标签：`bug`, `platform:macos`, `area:tui`, `area:agent-view`  
状态：Open，评论 2

该问题描述在恢复会话后，通过左箭头进入 agents 视图会导致对话被意外 fork。  
重要性在于它影响会话连续性，尤其对长上下文、多 agent 协作场景风险较高。当前已有少量讨论，是今日评论较多的问题之一。

---

### 2. Windows：Agent-scoped inline MCP stdio 未传递尾随目录参数  
Issue：[#97707](https://github.com/anthropics/claude-code/issues/97707)  
标签：`bug`, `platform:windows`, `area:mcp`, `area:agents`  
状态：Open，评论 2

该问题涉及 agent 作用域内的 inline `mcpServers` 配置在 Windows 上无法正确转发 trailing directory 参数。  
MCP 是 Claude Code 扩展生态的关键能力，该问题可能导致 agent 与本地工具链、stdio 服务集成失败，对 Windows 用户和插件开发者影响较大。

---

### 3. iPad/iPhone：本地 Remote Control 会话与云端会话难以区分  
Issue：[#97734](https://github.com/anthropics/claude-code/issues/97734)  
标签：`enhancement`, `platform:ios`, `area:ui`  
状态：Open，评论 1

用户反馈 Claude iPad App 的 Code tab 中，本地远控会话和云端会话视觉上几乎一致。  
该问题直接影响用户对 **运行位置、计费/配额、隐私边界、执行环境** 的判断。随着 Claude Code 支持本地与云端混合执行，这类状态可见性需求会越来越重要。

---

### 4. Linux sandbox：自托管 GitHub Actions runner 下 Bash 全部失败  
Issue：[#97730](https://github.com/anthropics/claude-code/issues/97730)  
标签：`bug`, `platform:linux`, `area:sandbox`  
状态：Open，评论 1

在默认布局的 self-hosted GitHub Actions runner 中，启用 `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1` 后，所有 Bash tool call 在执行前失败。  
该问题对 CI/CD 场景影响明显，尤其是把 Claude Code 集成进自动化 runner 的团队。它也暴露出 sandbox 与文件系统路径、权限隔离之间仍有兼容性问题。

---

### 5. GitHub 集成：状态检查正常但 Claude Code 无法访问私有仓库  
Issue：[#97706](https://github.com/anthropics/claude-code/issues/97706)  
标签：`bug`, `platform:web`, `github-integration`  
状态：Open，评论 1

用户在 GitHub App 设置中确认仓库已授权，但 Claude Code 云会话仍提示无法访问。  
该问题反映 GitHub App 授权状态、Claude Web 端展示状态与实际访问能力之间可能存在不一致。对依赖私有仓库进行云端代码任务的用户来说，这是阻塞级问题。

---

### 6. macOS MCP/插件：`claude-bin --channels` 反复杀死插件 MCP server  
Issue：[#97701](https://github.com/anthropics/claude-code/issues/97701)  
标签：`bug`, `has repro`, `platform:macos`, `area:mcp`, `regression`, `area:plugins`  
状态：Open，评论 1

该问题被标记为 regression，发生在 Claude Code 2.1.283。用户以 daemon 方式运行 channel plugin 时，会话持续 churn，并反复终止插件 MCP server。  
重要性较高，因为它影响长期运行的插件/通道集成场景，也可能暗示新版在 MCP 生命周期管理上存在回归。

---

### 7. Linux MCP 权限：切换到 Manual mode 后仍拒绝浏览器动作  
Issue：[#97741](https://github.com/anthropics/claude-code/issues/97741)  
标签：`bug`, `platform:linux`, `area:mcp`, `area:permissions`  
状态：Open

用户报告即使会话切换到 Manual mode，并明确批准操作，auto-mode classifier 仍持续拒绝浏览器相关动作。  
这类问题影响 Claude Code 与浏览器 MCP 工具的可用性，也暴露出权限模式、用户授权和安全分类器之间的优先级冲突。

---

### 8. VS Code：计划评审面板显示旧版本 plan  
Issue：[#97740](https://github.com/anthropics/claude-code/issues/97740)  
标签：`bug`, `has repro`, `platform:macos`, `platform:vscode`  
状态：Open

当模型在同一批工具调用中写入 plan 文件并调用 `ExitPlanMode` 时，VS Code 扩展的计划评审面板可能显示旧版本计划。  
风险在于用户看到并批准的是旧计划，但实际审批结果可能对应新计划，属于典型的 UI 状态不同步问题。对 IDE 内审批流和 agent plan review 的可信度影响较大。

---

### 9. CLI 云端模式：`claude --cloud` 静默忽略 `--effort` 参数  
Issue：[#97738](https://github.com/anthropics/claude-code/issues/97738)  
标签：`bug`, `has repro`, `area:cli`  
状态：Open

用户发现 `claude --cloud "<prompt>" --model sonnet --effort low` 中，`--model` 生效，但 `--effort` 被静默忽略，云端会话仍以 medium effort 运行。  
这会影响成本、延迟和任务执行预期。更重要的是 CLI 没有给出警告，降低了自动化脚本中的可观测性。

---

### 10. `/resume` 不刷新 CLAUDE.md 和 auto-memory 上下文  
Issue：[#97722](https://github.com/anthropics/claude-code/issues/97722)  
标签：`bug`, `has repro`, `platform:macos`, `area:core`, `memory`  
状态：Open

用户反馈在运行中的会话里使用 `/resume <id>` 切换会话时，`CLAUDE.md` 和自动记忆上下文仍保持旧状态；而 `claude --resume` 和 `/clear` 可以重新加载。  
这属于上下文一致性问题，可能导致模型基于过期项目指令或错误记忆执行任务，对多项目切换用户影响较大。

---

## 3. 重要 PR 进展

### 1. sec-default：collector records 在 user tier 之后继续保留  
PR：[#97688](https://github.com/anthropics/claude-code/pull/97688)  
作者：poteat  
状态：Open

该 PR 调整了组织级 `sec-default` 场景下 telemetry collector 的记录处理逻辑。核心变化是：当组织启用 sec-default 时，用户侧插件不能再删除或重写发送到 collector 的记录。  
这与企业安全、审计和组织级策略强制执行相关。对于使用 Claude Code 插件体系的组织用户来说，该 PR 可能提升遥测与安全记录的完整性，但也意味着插件层的可控性会进一步受限。

> 过去 24 小时仅有 1 条 PR 更新，因此本日报不额外扩展到 10 条。

---

## 4. 功能需求趋势

### 1. 云端/本地会话状态可视化

相关 Issues：  
- [#97734](https://github.com/anthropics/claude-code/issues/97734)  
- [#97737](https://github.com/anthropics/claude-code/issues/97737)  
- [#97739](https://github.com/anthropics/claude-code/issues/97739)

社区希望更明确地区分云端、本地、远程控制、等待输入、设备离线等状态。  
这说明 Claude Code 的多环境执行能力已经带来认知负担，UI 需要提供更强的运行位置和状态提示。

---

### 2. GitHub 集成稳定性与多账号/多组织支持

相关 Issues：  
- [#97706](https://github.com/anthropics/claude-code/issues/97706)  
- [#97723](https://github.com/anthropics/claude-code/issues/97723)  
- [#97721](https://github.com/anthropics/claude-code/issues/97721)  
- [#97732](https://github.com/anthropics/claude-code/issues/97732)

GitHub 集成相关问题较多，包括私有仓库访问失败、组织仓库连接困难、多账号切换不顺畅，以及部分低质量测试提交。  
整体趋势表明，用户正在更频繁地尝试把 Claude Code 接入真实 GitHub 工作流，但当前授权、状态展示和账号模型仍需打磨。

---

### 3. MCP 与插件生态稳定性

相关 Issues：  
- [#97707](https://github.com/anthropics/claude-code/issues/97707)  
- [#97701](https://github.com/anthropics/claude-code/issues/97701)  
- [#97741](https://github.com/anthropics/claude-code/issues/97741)

MCP 问题覆盖 Windows 参数传递、macOS 插件 server 生命周期、Linux 浏览器 MCP 权限控制等。  
随着 MCP 成为连接本地工具、浏览器、外部服务的核心扩展机制，社区对其跨平台稳定性和权限行为一致性的要求正在上升。

---

### 4. 沙箱与 CI/CD 环境兼容性

相关 Issues：  
- [#97730](https://github.com/anthropics/claude-code/issues/97730)  
- [#97731](https://github.com/anthropics/claude-code/issues/97731)

Linux sandbox 在 GitHub Actions self-hosted runner、root/cap-drop、不同 UID 目录等场景下出现失败。  
这说明 Claude Code 在更严格的自动化环境、企业 runner、容器化环境中的兼容性仍是重要改进方向。

---

### 5. IDE 与桌面端交互体验

相关 Issues：  
- [#97740](https://github.com/anthropics/claude-code/issues/97740)  
- [#97718](https://github.com/anthropics/claude-code/issues/97718)  
- [#97715](https://github.com/anthropics/claude-code/issues/97715)  
- [#97729](https://github.com/anthropics/claude-code/issues/97729)

反馈集中在 VS Code plan review 状态不同步、桌面端 Markdown 复制行为异常、`/bug` 模态窗口阻塞复制粘贴，以及希望 SSH 远程会话内支持 in-app Browser。  
这表明 Claude Code 的 GUI/IDE 工作流正在被更多开发者深度使用，细节体验问题更容易成为生产力阻塞点。

---

### 6. 会话、上下文与记忆一致性

相关 Issues：  
- [#97736](https://github.com/anthropics/claude-code/issues/97736)  
- [#97722](https://github.com/anthropics/claude-code/issues/97722)  
- [#97726](https://github.com/anthropics/claude-code/issues/97726)  
- [#97733](https://github.com/anthropics/claude-code/issues/97733)

用户希望会话恢复、切换、trust prompt、autocompact 等机制更可控、更一致。  
特别是长会话和多 agent 场景下，上下文刷新、项目指令加载和 session-scoped 配置成为关键需求。

---

### 7. 安全策略误判与可解释性

相关 Issues：  
- [#97728](https://github.com/anthropics/claude-code/issues/97728)  
- [#97719](https://github.com/anthropics/claude-code/issues/97719)  
- [#97717](https://github.com/anthropics/claude-code/issues/97717)

多个用户反馈非安全类项目被 safeguard 标记，部分 issue 已标记 duplicate。  
这类误判会直接中断开发流程，尤其是在产品规格、CRM、普通项目命名等上下文中。开发者希望安全策略有更好的解释、申诉或恢复路径。

---

## 5. 开发者关注点

### 1. “同一个会话在不同入口看到的状态不一致”

典型表现包括：  
- VS Code plan review 显示旧计划：[ #97740](https://github.com/anthropics/claude-code/issues/97740)  
- `/resume` 不刷新项目上下文：[ #97722](https://github.com/anthropics/claude-code/issues/97722)  
- agent 远程执行请求实际本地执行：[ #97739](https://github.com/anthropics/claude-code/issues/97739)

开发者关注的不只是功能是否存在，而是 Claude Code 是否能准确表达当前运行状态和上下文边界。

---

### 2. 跨平台一致性仍是主要痛点

Windows、macOS、Linux、WSL、iOS、VS Code 均有问题反馈。  
其中 MCP、sandbox、hooks、desktop UI 在不同平台上的行为差异较明显，说明 Claude Code 的平台适配复杂度正在上升。

---

### 3. 云端执行参数和本地执行边界需要更透明

相关问题包括：  
- `--effort` 在 cloud 模式下被忽略：[ #97738](https://github.com/anthropics/claude-code/issues/97738)  
- 本地与云端会话无法区分：[ #97734](https://github.com/anthropics/claude-code/issues/97734)  
- agent 声称远程执行但实际本地运行：[ #97739](https://github.com/anthropics/claude-code/issues/97739)

这类问题会影响成本控制、隐私判断和任务调度预期，是云端 Code session 走向生产使用前必须解决的体验问题。

---

### 4. GitHub 集成进入真实工作流后暴露更多边界条件

私有仓库、组织仓库、多账号、GitHub App 权限同步等问题正在集中出现。  
用户期望 Claude Code 不仅能连接 GitHub，还要能清晰解释“已授权但不可访问”的原因，并提供可操作的修复路径。

---

### 5. 安全与权限策略需要更好的用户反馈

从 MCP 权限拒绝到 safeguard false positive，再到 telemetry collector 策略增强，社区对安全机制的关注度明显提升。  
开发者通常接受安全边界，但希望系统能提供明确原因、当前模式、是否可人工确认以及如何解除阻塞。

---

## 总结

今天 Claude Code 社区没有版本发布，但问题反馈覆盖面广，重点集中在 **多端体验、云/本地会话状态、MCP 插件生态、GitHub 集成、沙箱兼容性和安全策略误判**。  
整体来看，Claude Code 正处于从开发者 CLI 工具向多端 agent 工作台演进的阶段，社区最关注的是：功能不只要强，还要 **状态清晰、权限可控、跨平台一致、适合真实工程工作流**。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报  
**日期：2026-09-28**  
**仓库：openai/codex**

---

## 1. 今日速览

过去 24 小时 Codex 社区活跃度很高，主要焦点集中在 **Windows 桌面端与 CLI 0.157.1 的稳定性问题**：包括 app-server daemon 安装失败、桌面应用加载失败、后台 CMD/PowerShell 窗口抢焦点、TUI 显示异常等。  
同时，官方连续发布多个 Rust alpha 版本，并合入大量 TUI、MCP、Windows sandbox、线程预热、Mermaid 渲染与指标采集相关 PR，显示当前开发重点仍在 **CLI/TUI 体验、桌面端可靠性、MCP 能力与跨平台兼容性**。

---

## 2. 版本发布

过去 24 小时内发布了 7 个 Rust alpha 版本，版本节奏非常密集：

- [`rust-v0.159.0-alpha.12`](https://github.com/openai/codex/releases/tag/rust-v0.159.0-alpha.12)
- [`rust-v0.159.0-alpha.11`](https://github.com/openai/codex/releases/tag/rust-v0.159.0-alpha.11)
- [`rust-v0.159.0-alpha.10`](https://github.com/openai/codex/releases/tag/rust-v0.159.0-alpha.10)
- [`rust-v0.159.0-alpha.9`](https://github.com/openai/codex/releases/tag/rust-v0.159.0-alpha.9)
- [`rust-v0.159.0-alpha.8`](https://github.com/openai/codex/releases/tag/rust-v0.159.0-alpha.8)
- [`rust-v0.158.0-alpha.15.4`](https://github.com/openai/codex/releases/tag/rust-v0.158.0-alpha.15.4)
- [`rust-v0.158.0-alpha.15.3`](https://github.com/openai/codex/releases/tag/rust-v0.158.0-alpha.15.3)

这些 release 描述较简略，未披露完整 changelog。从同日合入的 PR 看，近期 alpha 版本可能覆盖以下方向：

- Windows sandbox / daemon 启动可靠性
- TUI 鼠标、滚动、链接、状态栏与提示文案优化
- MCP server 状态发现与连接复用
- Codex thread 预热与会话管理优化
- Mermaid、Markdown、终端渲染细节修复
- 工具调用、技能上下文与 Guardian 相关指标增强

---

## 3. 社区热点 Issues

### 1. Windows 内置 `codex_apps` MCP 启动失败  
Issue：[#48835](https://github.com/openai/codex/issues/48835)  
标签：`bug`, `windows-os`, `mcp`, `CLI`, `connectivity`  
状态：Open｜评论：4

该问题报告 Codex CLI 0.157.1 在 Windows 11 上启动内置 `codex_apps` MCP 时失败，出现 HTTP request failed / response body 解码错误。  
**重要性：** MCP 是 Codex 扩展能力的重要入口，内置 MCP 启动失败会直接影响 app、工具与外部资源集成。  
**社区反应：** 该 issue 是今日评论数最高的问题之一，说明 Windows + MCP 组合存在较明显阻塞。

---

### 2. Windows daemon 安装因 `FSCTL_SET_REPARSE_POINT` 权限失败  
Issue：[#48853](https://github.com/openai/codex/issues/48853)  
标签：`bug`, `windows-os`, `CLI`, `app-server`  
状态：Open｜评论：3

用户反馈 CLI 0.157.1 无法安装 managed app-server daemon，报错 `Access is denied. (os error 5)`。  
**重要性：** app-server daemon 是桌面端与 CLI 协同的关键基础设施，安装失败会导致 Codex 无法正常启动或退化到 `--no-daemon` 模式。  
**社区反应：** 评论较多，且与多个 Windows app-server / sandbox 问题相互呼应。

---

### 3. TUI / CLI 用户体验问题  
Issue：[#48845](https://github.com/openai/codex/issues/48845)  
标签：`bug`, `TUI`, `CLI`  
状态：Open｜评论：3

该 issue 以 “UI UX Fix” 为主题，聚焦 CLI TUI 的交互体验问题。  
**重要性：** TUI 是 Codex CLI 高频入口，任何交互瑕疵都会放大影响开发者日常使用效率。  
**社区反应：** 评论数靠前，说明用户对终端体验的细节敏感度很高。

---

### 4. Windows `--no-daemon` 模式下底部状态栏消失、界面无法滚动  
Issue：[#48846](https://github.com/openai/codex/issues/48846)  
标签：`bug`, `windows-os`, `TUI`, `CLI`  
状态：Open｜评论：2

用户在 Windows 11 + CLI 0.157.1 中使用 `--no-daemon` 模式时，底部状态栏消失且界面无法滚动。  
**重要性：** 在 daemon 安装失败或用户主动禁用 daemon 时，`--no-daemon` 是关键 fallback 路径；如果该模式不可用，会削弱 CLI 的可恢复性。  
**社区反应：** 与 #48853 形成明显关联：daemon 问题迫使用户进入 no-daemon，但 no-daemon 又出现 TUI 缺陷。

---

### 5. Windows 桌面应用更新后无限加载  
Issue：[#48832](https://github.com/openai/codex/issues/48832)  
标签：`bug`, `windows-os`, `app`  
状态：Open｜评论：2

用户在 Windows 10 Pro 上更新 Codex 桌面应用后，应用卡在 loading spinner。  
**重要性：** 这是典型的启动阻塞问题，影响范围可能较广，尤其是自动更新用户。  
**社区反应：** 与 #48822、#48818、#48820 等 Windows app 启动 / workspace / organization settings 问题表现相似，可能存在共同根因。

---

### 6. Windows CLI 0.157.1 执行 shell 时控制台窗口闪烁  
Issue：[#48826](https://github.com/openai/codex/issues/48826)  
标签：`bug`, `windows-os`, `CLI`, `tool-calls`  
状态：Open｜评论：2｜👍 3

用户反馈从 CLI 0.155.1 升级到 0.157.1 后，shell 执行时出现控制台窗口闪烁，而旧版本没有该问题。  
**重要性：** 这是影响工具调用体验的回归问题，可能干扰用户输入、焦点与多任务工作流。  
**社区反应：** 点赞数较高，说明该问题具有可见影响，并被多位用户认可。

---

### 7. Windows CLI 0.157.1 后台 CMD/PowerShell 窗口抢焦点  
Issue：[#48859](https://github.com/openai/codex/issues/48859)  
标签：`bug`, `windows-os`, `CLI`, `tool-calls`  
状态：Open｜评论：1｜👍 1

该问题与 #48826 类似，但更严重：后台命令窗口不仅闪现，还会抢占前台焦点，打断用户输入。  
**重要性：** 对开发者生产力影响很大，特别是在 Codex 频繁执行 shell tool call 时。  
**社区反应：** 虽评论较少，但描述清晰，属于高优先级体验回归。

---

### 8. Windows 桌面端无法加载 organization settings / workspace requirements  
Issue：[#48818](https://github.com/openai/codex/issues/48818)  
标签：`bug`, `windows-os`, `app`, `connectivity`  
状态：Open｜评论：1

用户 clean install 后立即出现 “Unable to load organization settings”，但 Web 端可正常使用。  
**重要性：** 该问题指向桌面端认证、组织配置、网络代理或安全策略加载链路，属于启动阶段阻塞。  
**社区反应：** 与多个类似 issue 重复出现，表明 Windows 桌面端配置加载路径需要重点排查。

---

### 9. VS Code 扩展显示 `Rate limit: Unavailable`，`/subscriptions` 返回 403  
Issue：[#48843](https://github.com/openai/codex/issues/48843)  
标签：`bug`, `extension`, `auth`, `rate-limits`  
状态：Open｜评论：1

用户反馈 VS Code extension 认证成功且 Codex chat 可用，但 `/status` 中 rate limit 不可用，并伴随 `/subscriptions` 403。  
**重要性：** 该问题影响 IDE 内的额度感知、状态展示与用户信任。  
**社区反应：** 说明 Codex 的 IDE 集成不仅需要模型调用可用，也需要订阅、配额、认证状态一致可靠。

---

### 10. GPT-6 Sol / Luna / Astra 对正常提示误报 Invalid prompt safety error  
Issue：[#48817](https://github.com/openai/codex/issues/48817)  
标签：`bug`, `model-behavior`, `CLI`  
状态：Open｜评论：1

用户反馈多个 GPT-6 系列模型在 CLI 中对良性 prompt 触发安全错误。  
**重要性：** 模型行为与安全拦截误判会直接阻断开发任务，尤其在代码生成、自动化修复和 CLI agent 场景中影响明显。  
**社区反应：** 这是模型层面的质量问题，虽评论不多，但优先级不低。

---

## 4. 重要 PR 进展

### 1. Windows sandbox provisioning service 启动等待优化  
PR：[#48829](https://github.com/openai/codex/pull/48829)  
状态：Closed

该 PR 在 Windows sandbox provisioning service 启动过程中增加短暂轮询等待，最多等待 5 秒，避免 readiness check 过早失败。  
**价值：** 有助于改善 Windows 桌面端 / sandbox 初始化稳定性，可能与近期大量 Windows 启动问题相关。

---

### 2. 修复 Windows terminal capture 的 SGR mouse reporting  
PR：[#48799](https://github.com/openai/codex/pull/48799)  
状态：Closed

通过单独写入并 flush SGR 编码请求，改善 Windows 终端鼠标事件上报。  
**价值：** 直接关联 TUI 鼠标选择、点击、滚动等问题，对 Windows CLI 体验影响较大。

---

### 3. TUI 中断提示文案简化  
PR：[#48830](https://github.com/openai/codex/pull/48830)  
状态：Closed

将 interrupted turn 的提示改为更短、更中性的 secondary text，不再建议用户告诉模型如何改进。  
**价值：** 改善中断场景下的 TUI 体验，减少用户认知负担。

---

### 4. 允许首次 turn 前归档 thread  
PR：[#48828](https://github.com/openai/codex/pull/48828)  
状态：Closed

此前新建 thread 在首次 turn 前没有 rollout，归档会因 missing-rollout 失败。该 PR 通过在归档前持久化已加载的非临时 thread 修复问题。  
**价值：** 提升会话管理可靠性，减少新建空会话无法清理的问题。

---

### 5. Ghostty 与 Kitty 中 transcript 链接 hover 显示手型指针  
PR：[#48827](https://github.com/openai/codex/pull/48827)  
状态：Closed

在 Codex 捕获鼠标输入时，为 Ghostty / Kitty 终端中的可操作 transcript 链接显示 hand pointer，并复用链接命中测试逻辑。  
**价值：** 强化终端链接交互反馈，改善现代终端用户体验。

---

### 6. 为 idle threads 增加 history-aware prewarming  
PR：[#48812](https://github.com/openai/codex/pull/48812)  
状态：Closed

新增 `CodexThread::prewarm_with_history()`，可基于已有对话历史和已执行工具元数据预热 WebSocket response。  
**价值：** 有助于降低下一轮响应延迟，提升长会话或恢复会话的交互速度。

---

### 7. 单个 MCP server 状态发现与 thread 连接复用  
PR：[#48783](https://github.com/openai/codex/pull/48783)  
状态：Closed

为 `mcpServerStatus/list` 增加可选 `serverName`，并允许复用 thread 已有 MCP 连接。  
**价值：** 降低 MCP 状态查询开销，增强 MCP 调试与管理能力。

---

### 8. Mermaid label 保留标点与分号  
PR：[#48814](https://github.com/openai/codex/pull/48814)  
状态：Closed

修复 Mermaid 渲染中过度按分号拆分、拒绝 label 标点的问题，支持如 `A["Go []; &"]` 等复杂标签。  
**价值：** 改善 Markdown / 图表渲染准确性，对文档生成、架构图输出场景有帮助。

---

### 9. 模态框打开时允许 transcript 滚轮滚动  
PR：[#48805](https://github.com/openai/codex/pull/48805)  
状态：Closed

在 “Implement this plan?” 等 modal 出现时，允许用户滚动可见 transcript 回看上下文。  
**价值：** 改善长计划确认时的可审阅性，是非常实用的交互优化。

---

### 10. 为工具与技能上下文指标使用显式 histogram buckets  
PR：[#48819](https://github.com/openai/codex/pull/48819)  
状态：Closed

为 tool fragment size、namespace count、enabled / kept skill count 等指标设置显式 bucket。  
**价值：** 增强遥测和性能分析能力，便于后续定位工具上下文膨胀、技能筛选效率等问题。

---

## 5. 功能需求趋势

### 1. Windows 端稳定性成为最高优先级

今日大量 issue 集中在 Windows：

- daemon 安装失败：[#48853](https://github.com/openai/codex/issues/48853)
- MCP 启动失败：[#48835](https://github.com/openai/codex/issues/48835)
- 桌面应用加载失败：[#48832](https://github.com/openai/codex/issues/48832)、[#48822](https://github.com/openai/codex/issues/48822)
- organization settings 加载失败：[#48818](https://github.com/openai/codex/issues/48818)、[#48820](https://github.com/openai/codex/issues/48820)
- shell 执行窗口闪烁 / 抢焦点：[#48826](https://github.com/openai/codex/issues/48826)、[#48859](https://github.com/openai/codex/issues/48859)

趋势非常明确：**Windows 是当前 Codex 桌面端与 CLI 稳定性测试的主战场**。

---

### 2. TUI 交互细节持续被关注

相关 issue 与 PR 都很多：

- 状态栏消失、无法滚动：[#48846](https://github.com/openai/codex/issues/48846)
- 鼠标选择导致冻结：[#48808](https://github.com/openai/codex/issues/48808)
- macOS Copy on Select 回归：[#48841](https://github.com/openai/codex/issues/48841)
- transcript 链接 hover：[#48827](https://github.com/openai/codex/pull/48827)
- modal 内滚动：[#48805](https://github.com/openai/codex/pull/48805)
- 短耗时 footer 展示：[#48807](https://github.com/openai/codex/pull/48807)

趋势显示 Codex CLI 已进入“高频工具”阶段，用户开始关注非常细的终端交互一致性。

---

### 3. MCP 与 app-server 仍是核心基础设施方向

MCP 相关问题和 PR 同时活跃：

- 内置 `codex_apps` MCP 启动失败：[#48835](https://github.com/openai/codex/issues/48835)
- 单 server MCP 状态发现：[#48783](https://github.com/openai/codex/pull/48783)
- MCP app resource URI 处理：[#48764](https://github.com/openai/codex/pull/48764)
- app-server daemon 安装失败：[#48853](https://github.com/openai/codex/issues/48853)

可以看出，Codex 正在强化其作为 **agent runtime + tool ecosystem** 的基础能力，但连接可靠性仍需提升。

---

### 4. IDE 与扩展集成需求上升

VS Code extension 出现订阅 / rate limit 状态不一致问题：

- [#48843](https://github.com/openai/codex/issues/48843)

同时社区也出现与 Claude Code 互操作相关的功能需求：

- [#48803](https://github.com/openai/codex/issues/48803)

趋势表明，用户希望 Codex 不只是单独 CLI / App，而是能更自然融入现有 IDE、agent、终端和开发工作流。

---

### 5. Computer Use / 浏览器控制仍存在稳定性缺口

相关 issue：

- Chrome extension 启用但 runtime 未加载：[#48813](https://github.com/openai/codex/issues/48813)
- Windows Computer Use 无法正常工作：[#48842](https://github.com/openai/codex/issues/48842)
- SOL / Luna Computer Use 表现不如 Astra：[#48815](https://github.com/openai/codex/issues/48815)
- app-pane attachment 后浏览器点击失效：[#48804](https://github.com/openai/codex/issues/48804)

趋势显示，Computer Use 是高价值功能，但依赖浏览器扩展、runtime 注入、模型能力、桌面权限等多个环节，整体链路仍较脆弱。

---

## 6. 开发者关注点

### 1. 升级后的回归风险

多个问题明确指出“升级后才出现”：

- Windows app 更新后无法加载：[#48832](https://github.com/openai/codex/issues/48832)
- CLI 0.157.1 shell 窗口闪烁，0.155.1 不存在：[#48826](https://github.com/openai/codex/issues/48826)
- Copy on Select 更新后失效：[#48841](https://github.com/openai/codex/issues/48841)

开发者当前最担心的是：**新版本功能增加，但基础体验回归**。

---

### 2. 桌面端启动链路不透明

用户频繁遇到：

- organization settings 无法加载
- workspace requirements 加载失败
- app-server daemon 安装失败
- 内部 git worker 不可用
- 新 conversation 无法开始

代表 issue：

- [#48818](https://github.com/openai/codex/issues/48818)
- [#48820](https://github.com/openai/codex/issues/48820)
- [#48854](https://github.com/openai/codex/issues/48854)

痛点在于错误信息虽然出现，但用户难以判断是网络、权限、订阅、组织策略、daemon、sandbox 还是本地缓存问题。

---

### 3. Windows 权限与后台进程管理需要加强

Windows 用户集中反馈：

- os error 5 权限失败
- reparse point 操作失败
- 后台命令窗口抢焦点
- sandbox provisioning 时序问题

代表 issue / PR：

- [#48853](https://github.com/openai/codex/issues/48853)
- [#48859](https://github.com/openai/codex/issues/48859)
- [#48829](https://github.com/openai/codex/pull/48829)

这说明 Codex 在 Windows 上需要更稳健地处理 UAC、文件系统权限、ConPTY、后台进程创建和服务启动时序。

---

### 4. 额度、订阅与模型状态展示需要更一致

相关反馈包括：

- VS Code extension `Rate limit: Unavailable`：[#48843](https://github.com/openai/codex/issues/48843)
- macOS desktop 启动 ambient suggestions 消耗大量 token：[#48833](https://github.com/openai/codex/issues/48833)
- 自定义 provider 下仍被 ChatGPT subscription rate limit 禁用 Composer：[#48816](https://github.com/openai/codex/issues/48816)

开发者希望明确知道：

- 哪些 token 是后台任务消耗的
- 哪些额度来自 ChatGPT 订阅
- 自定义 provider 是否应绕过 ChatGPT 限额
- IDE / App / CLI 的 rate limit 状态是否一致

---

### 5. 模型行为与安全拦截需要更可解释

代表 issue：

- GPT-6 Sol / Luna / Astra 误拒良性 prompt：[#48817](https://github.com/openai/codex/issues/48817)
- Computer Use 中 SOL / Luna 不如 Astra：[#48815](https://github.com/openai/codex/issues/48815)

开发者关注的不只是“模型能不能回答”，还包括：

- 安全错误是否准确
- 拒绝原因是否可诊断
- 不同模型在工具调用 / Computer Use 中是否有一致能力
- 模型选择是否应有更明确的能力说明

---

## 总结

今日 Codex 社区的核心信号是：**Windows 端稳定性、TUI 交互质量、MCP/app-server 基础设施和额度/订阅状态一致性** 是当前最主要的开发者痛点。  
从 PR 合入情况看，团队正在快速修复终端交互、Windows sandbox、MCP 状态发现、thread 预热和渲染细节；但从 issue 分布看，桌面端启动链路和 Windows CLI 工具调用仍需要更系统性的稳定性改进。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报  
**日期：2026-09-28**  
**仓库：google-gemini/gemini-cli**

---

## 1. 今日速览

过去 24 小时，Gemini CLI 发布了新的 nightly 版本 `v0.63.0-nightly.20260928.g2fe7c2d3f`，同时社区集中反馈了 agent 对话历史、MCP 工具返回结构、账号资格与授权等问题。  
PR 侧重点非常明确：一方面修复 `/rewind`、中断流、quota 重试等核心稳定性问题，另一方面有多项安全修复围绕 workspace trust、路径越界、环境变量泄露展开，说明项目近期正在强化安全边界与自动化执行场景的可靠性。

---

## 2. 版本发布

### v0.63.0-nightly.20260928.g2fe7c2d3f

- **类型**：Nightly Release
- **发布时间**：2026-09-28
- **变更范围**：相较于 `v0.63.0-nightly.20260926.g2fe7c2d3f`
- **Changelog**：  
  https://github.com/google-gemini/gemini-cli/compare/v0.63.0-nightly.20260926.g2fe7c2d3f...v0.63.0-nightly.20260928.g2fe7c2d3f

本次 nightly 版本主要对应自动版本推进，结合过去 24 小时的 PR 活动看，后续版本大概率会包含 agent 请求历史修复、headless 模式信任状态修复、quota retry 分类修复，以及多项安全边界加固。

---

## 3. 社区热点 Issues

> 过去 24 小时内更新的 Issue 共 4 条，因此本节按实际数据列出 4 条重点 Issue。

### 1. MCP 工具通过 `structuredContent` 返回结果时被记录为空响应

- **Issue**：[#29526](https://github.com/google-gemini/gemini-cli/issues/29526)
- **状态**：Open
- **标签**：`priority/p2`, `area/agent`, `kind/bug`, `status/need-information`
- **作者**：feiiiiii5
- **评论数**：7
- **点赞数**：0

**问题概述**：  
用户反馈，当 MCP tool 声明了 `outputSchema` 并按照 MCP 规范通过 `structuredContent` 返回结果时，Gemini CLI 将该调用记录为成功，但传给模型的 `functionResponse` 为空。

**为什么重要**：  
这直接影响 MCP 工具集成的正确性。对于依赖结构化返回的工具链，模型拿不到实际工具结果会导致后续推理错误、重复调用工具，或产生不符合预期的回答。

**社区反应**：  
该 Issue 在一天内已有 7 条评论，是今日讨论最活跃的问题，说明 MCP 兼容性和 agent 工具调用链路是社区高度关注的方向。

---

### 2. `/rewind` 或中断流后出现 400 Bad Request

- **Issue**：[#29530](https://github.com/google-gemini/gemini-cli/issues/29530)
- **状态**：Open
- **标签**：`status/need-triage`, `area/agent`
- **作者**：asieveking
- **评论数**：0
- **点赞数**：0

**问题概述**：  
当用户使用 `/rewind` 回退对话，或工具流被中断时，内存中的 chat history 可能以 `role: 'model'` 结尾。随后如果发起 API 请求，会触发：

> `Requests ending with a model turn are not supported`

**为什么重要**：  
这是 agent 会话状态管理中的核心稳定性问题。`/rewind`、stream abort、空用户消息过滤等场景都可能触发该问题，影响交互式 CLI 的连续使用体验。

**社区反应**：  
虽然暂时没有评论，但已有对应修复 PR [#29527](https://github.com/google-gemini/gemini-cli/pull/29527)，说明问题已被开发侧快速响应。

---

### 3. 付费 Google AI 账号在 Antigravity 中显示不符合资格

- **Issue**：[#29524](https://github.com/google-gemini/gemini-cli/issues/29524)
- **状态**：Open
- **标签**：`priority/p2`, `area/security`, `kind/bug`, `status/need-information`
- **作者**：Siyad007
- **评论数**：2
- **点赞数**：0

**问题概述**：  
用户表示自己拥有有效的 Google AI Pro 订阅，但在登录 Antigravity 时收到账号不符合 Gemini Code 相关资格的错误提示。

**为什么重要**：  
账号资格、订阅状态、产品授权之间的映射问题会直接影响开发者能否使用 Gemini Code / Antigravity 相关能力。对于付费用户而言，这类阻断性问题优先级较高。

**社区反应**：  
已有 2 条评论，目前仍需更多信息。该问题反映出账号体系、授权识别和产品资格校验仍是用户使用过程中的痛点。

---

### 4. 个人用户被提示没有有效产品许可证并被锁定

- **Issue**：[#29529](https://github.com/google-gemini/gemini-cli/issues/29529)
- **状态**：Open
- **标签**：`status/need-triage`, `area/enterprise`
- **作者**：nzkinwi
- **评论数**：0
- **点赞数**：0

**问题概述**：  
用户报告收到：

> `you do not have a valid license of this product`

并表示自己作为个人用户被完全锁定，即使尝试清理本地缓存也无法恢复。

**为什么重要**：  
这类问题涉及产品许可、企业授权和个人账号使用边界。如果误判为无许可证，会直接造成用户不可用，是高影响的访问控制问题。

**社区反应**：  
目前尚未有评论，但与 [#29524](https://github.com/google-gemini/gemini-cli/issues/29524) 一样，指向账号资格和授权判断链路的稳定性问题。

---

## 4. 重要 PR 进展

> 过去 24 小时内更新的 PR 共 8 条，因此本节按实际数据列出 8 条重要 PR。

### 1. 修复 quota 错误分类时忽略 `RetryInfo` 延迟为 0 的问题

- **PR**：[#29532](https://github.com/google-gemini/gemini-cli/pull/29532)
- **状态**：Open
- **标签**：`area/platform`, `size/m`
- **作者**：Linxiushen

**内容概述**：  
`classifyGoogleError()` 之前会丢弃服务端返回的 `RetryInfo` 中 delay 为 0 的情况，导致本应立即重试的 rate limit 被错误分类为 terminal quota error。

**影响**：  
该修复可避免不必要地终止请求、触发模型 fallback 或 credits 流程，对高频调用、自动化 agent、CI 场景非常重要。

---

### 2. 自动提升 nightly 版本至 `0.63.0-nightly.20260928.g2fe7c2d3f`

- **PR**：[#29531](https://github.com/google-gemini/gemini-cli/pull/29531)
- **状态**：Open
- **标签**：`size/s`, `status/need-issue`
- **作者**：gemini-cli-robot

**内容概述**：  
自动版本号提升，用于 nightly release 流程。

**影响**：  
属于发布工程自动化的一部分，说明项目仍保持高频 nightly 发布节奏。

---

### 3. 修复 headless 模式下 folder trust 状态传播错误

- **PR**：[#29528](https://github.com/google-gemini/gemini-cli/pull/29528)
- **状态**：Open
- **标签**：`priority/p1`, `area/core`, `size/m`
- **作者**：amelidev

**内容概述**：  
修复 `useFolderTrust` 在 headless 模式下无条件向父组件 `AppContainer` 上报 `onTrustChange(true)` 的问题。即使工作区实际未被信任，父组件也会收到已信任状态，造成状态不一致。

**影响**：  
这是 P1 级别修复，直接关系到 headless / 自动化执行环境中的 workspace trust 安全模型，能够避免未受信任工作区被错误当作可信环境处理。

---

### 4. 确保请求内容不会以 model turn 结尾

- **PR**：[#29527](https://github.com/google-gemini/gemini-cli/pull/29527)
- **状态**：Open
- **标签**：`priority/p1`, `area/agent`, `size/m`
- **作者**：asieveking
- **关联 Issue**：[#29530](https://github.com/google-gemini/gemini-cli/issues/29530)

**内容概述**：  
修复当历史记录以 model turn 结尾时，API 请求返回 400 Bad Request 的问题。典型场景包括 `/rewind`、stream 中断、尾部空用户消息被剥离等。

**影响**：  
这是 agent 对话状态机的重要稳定性修复。合入后可显著减少交互式会话被异常状态卡住的情况。

---

### 5. A2A server 创建任务时不再从请求的 `agentSettings` 推导 workspace trust

- **PR**：[#29525](https://github.com/google-gemini/gemini-cli/pull/29525)
- **状态**：Open
- **标签**：`size/s`
- **作者**：venkatchalla06

**内容概述**：  
`CoderAgentExecutor.createTask()` 之前会将外部调用者传入的 `agentSettings` 直接传给 `runInIsolatedEnv()`，使得 `agentSettings.isTrusted` 可能影响实际 trust 状态。该 PR 修复这一问题，使 createTask 与其他入口保持一致的 settings 归一化逻辑。

**影响**：  
提升 A2A server 在外部输入场景下的安全性，防止调用方通过请求参数影响工作区信任边界。

---

### 6. 限制外部 safety checker 的环境变量和输出大小

- **PR**：[#29523](https://github.com/google-gemini/gemini-cli/pull/29523)
- **状态**：Open
- **标签**：`priority/p2`, `area/security`, `size/m`, `size/l`
- **作者**：ManoharPaturi

**内容概述**：  
`CheckerRunner` 之前会在启动第三方 checker binary 时传入完整 CLI 进程环境变量，并且无限制累积 stdout。该 PR 通过最小化环境变量和限制输出大小来缓解两个风险：

1. checker 可能读取 `GEMINI_API_KEY` 等敏感环境变量；
2. 恶意或异常 checker 输出无限内容导致内存风险。

**影响**：  
这是重要的供应链与插件执行安全加固，尤其适合使用外部 checker、自动化审查和 CI 集成的用户。

---

### 7. 限制 glob 工具匹配范围在已验证搜索目录内

- **PR**：[#29522](https://github.com/google-gemini/gemini-cli/pull/29522)
- **状态**：Open
- **标签**：`area/security`, `size/m`
- **作者**：ManoharPaturi

**内容概述**：  
`GlobToolInvocation.execute` 虽然验证了 `dir_path`，但将未验证的 `pattern` 传给 glob 库。由于 glob 12 中绝对路径 pattern 会绕过 `cwd` 从文件系统根目录解析，类似 `/etc/*.conf` 的 pattern 可能访问搜索目录外的文件。

**影响**：  
该修复可防止 glob 工具越过授权目录边界，是工具调用沙箱化的重要改进。

---

### 8. 将 legacy checkpoint 路径限制在 checkpoint 目录内

- **PR**：[#29521](https://github.com/google-gemini/gemini-cli/pull/29521)
- **状态**：Open
- **标签**：`priority/p1`, `area/security`, `size/m`
- **作者**：ManoharPaturi

**内容概述**：  
`_getCheckpointPath` 和 `deleteCheckpoint` 使用原始 tag 拼接 legacy fallback 路径，可能因 `..` 路径片段被规范化而访问 checkpoint 目录外的文件。例如 `x/../../secret` 可能解析到非预期位置。

**影响**：  
这是 P1 安全修复，重点防止路径穿越导致的越权读取或删除风险。

---

## 5. 功能需求趋势

基于今日 Issues 与 PR，可以观察到以下趋势：

### 1. Agent 会话状态可靠性成为核心关注点

相关条目：

- Issue [#29530](https://github.com/google-gemini/gemini-cli/issues/29530)
- PR [#29527](https://github.com/google-gemini/gemini-cli/pull/29527)

用户和开发者都在关注 `/rewind`、stream abort、空消息裁剪等复杂交互场景下的历史记录一致性。Gemini CLI 作为 agentic CLI，需要更稳健地维护 user/model/tool turn 顺序。

---

### 2. MCP 工具兼容性和结构化输出处理需求上升

相关条目：

- Issue [#29526](https://github.com/google-gemini/gemini-cli/issues/29526)

MCP tool 的 `structuredContent` 与 `outputSchema` 支持已经成为工具生态兼容性的关键。社区希望 Gemini CLI 能严格遵循 MCP 规范，把结构化工具返回正确传递给模型。

---

### 3. Workspace trust 与 headless / A2A 自动化安全边界持续强化

相关条目：

- PR [#29528](https://github.com/google-gemini/gemini-cli/pull/29528)
- PR [#29525](https://github.com/google-gemini/gemini-cli/pull/29525)

多个 PR 都围绕 trust state 处理，尤其是 headless 模式和 A2A server 这类无人值守、外部调用入口。趋势表明项目正在减少“外部输入影响信任判断”的风险。

---

### 4. 文件系统访问控制成为安全修复重点

相关条目：

- PR [#29522](https://github.com/google-gemini/gemini-cli/pull/29522)
- PR [#29521](https://github.com/google-gemini/gemini-cli/pull/29521)

glob pattern、checkpoint tag 等路径输入都可能带来目录逃逸风险。当前维护重点是确保工具执行、检查点管理等能力严格限制在已授权目录内。

---

### 5. 账号资格、授权与产品许可问题仍是用户侧痛点

相关条目：

- Issue [#29524](https://github.com/google-gemini/gemini-cli/issues/29524)
- Issue [#29529](https://github.com/google-gemini/gemini-cli/issues/29529)

用户反馈集中在付费账号不符合资格、个人用户被提示无有效许可证等访问问题。这类问题虽不一定属于 CLI 核心代码，但会直接影响 Gemini Code / Antigravity 相关产品的可用性。

---

## 6. 开发者关注点

### 1. 工具调用结果不能丢失或被错误转换

MCP `structuredContent` 被转换为空 `functionResponse` 的问题，会破坏工具调用闭环。开发者期望 CLI 在 MCP、function calling、agent response 之间保持语义一致。

相关链接：  
[#29526](https://github.com/google-gemini/gemini-cli/issues/29526)

---

### 2. 对话历史需要具备更强的容错能力

`/rewind`、流式输出中断、工具流 abort 都是 CLI 中常见操作。用户不希望这些操作导致后续请求直接 400。开发者关注点是：Gemini CLI 应在发送请求前自动修正或裁剪非法 history。

相关链接：  
[#29530](https://github.com/google-gemini/gemini-cli/issues/29530)  
[#29527](https://github.com/google-gemini/gemini-cli/pull/29527)

---

### 3. 自动化运行场景下的安全边界必须更清晰

headless、A2A server、external checker 都属于自动化和可扩展入口。一旦 trust state、环境变量、路径访问控制处理不严，可能带来较高安全风险。今日多个 PR 表明维护者正在系统性收紧这些边界。

相关链接：  
[#29528](https://github.com/google-gemini/gemini-cli/pull/29528)  
[#29525](https://github.com/google-gemini/gemini-cli/pull/29525)  
[#29523](https://github.com/google-gemini/gemini-cli/pull/29523)

---

### 4. 文件访问工具需要防止路径逃逸

glob 与 checkpoint 路径处理问题说明，开发者在使用 AI CLI 执行文件操作时，非常依赖工具层面的路径隔离保障。未来类似 read、write、search、checkpoint、restore 等工具都需要统一的路径验证策略。

相关链接：  
[#29522](https://github.com/google-gemini/gemini-cli/pull/29522)  
[#29521](https://github.com/google-gemini/gemini-cli/pull/29521)

---

### 5. Quota 与重试策略需要准确反映服务端意图

`RetryInfo` delay 为 0 被误判为 terminal quota error，会导致本可恢复的请求失败。对开发者而言，准确的 retry / fallback 策略直接影响 CLI 在高并发、长任务和自动化脚本中的稳定性。

相关链接：  
[#29532](https://github.com/google-gemini/gemini-cli/pull/29532)

---

## 总结

今日 Gemini CLI 社区动态的主线是 **稳定性修复 + 安全边界加固**。  
Agent 历史状态、MCP 结构化输出、quota retry 分类属于开发体验和运行稳定性问题；workspace trust、路径穿越、环境变量泄露则体现出项目在面向自动化 agent 和外部工具生态时，正在加强默认安全模型。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报  
**日期：2026-09-28**  
**仓库：github.com/github/copilot-cli**

## 1. 今日速览

过去 24 小时内，GitHub Copilot CLI 没有发布新版本，也没有新的 PR 更新。社区动态主要集中在两个新 Issue：一个是 ARM64 / Asahi Linux 环境下捆绑 `ripgrep` 因 jemalloc 页大小不兼容导致崩溃，另一个是 BYOK 场景下对多外部模型 / 多 Provider 支持的功能诉求。

整体来看，今天的反馈分别指向 **跨平台兼容性** 与 **模型接入灵活性** 两个方向，前者影响特定 Linux-on-Apple-Silicon 用户的可用性，后者反映开发者希望 Copilot CLI 与 Copilot App 在外部模型配置能力上保持一致。

---

## 2. 版本发布

过去 24 小时内无新 Release。

---

## 3. 社区热点 Issues

> 过去 24 小时内仅有 2 条 Issue 更新，因此以下列出全部值得关注的 Issue，而非 10 条。

### 1. Bundled ripgrep 在 16KB page size ARM64 内核上因 jemalloc 崩溃  
- **Issue**：[#4977](https://github.com/github/copilot-cli/issues/4977)  
- **状态**：Open / triage  
- **作者**：richardpowellus  
- **创建时间**：2026-09-27  
- **评论数**：0  
- **点赞数**：0  

**问题概述**：  
Copilot CLI 捆绑的 `ripgrep` 二进制文件位于类似 `<pkg-dir>/ripgrep/bin/linux-arm64/rg` 的路径下。该二进制静态链接了 jemalloc，并假设系统页大小为 4KB。对于使用 16KB page size 的 ARM64 Linux 内核，例如 Asahi Linux 默认配置，`rg` 会立即 abort，报出 jemalloc 的 `Unsupported system page size` 相关错误。

**为什么重要**：  
- 影响 Linux-on-Apple-Silicon / Asahi Linux 用户的基础可用性。  
- `ripgrep` 通常用于代码搜索、上下文检索等 CLI 内部能力，崩溃可能导致 Copilot CLI 的关键功能不可用。  
- 暴露出捆绑二进制在不同 ARM64 Linux 发行版与内核配置上的兼容性问题。

**社区反应**：  
目前尚无评论和点赞，但该问题属于明确的运行时兼容性缺陷，后续可能需要维护者评估是否更换构建参数、动态链接策略，或提供不依赖固定页大小假设的 `ripgrep` 构建。

---

### 2. BYOK 希望支持多个外部模型 / Provider  
- **Issue**：[#4976](https://github.com/github/copilot-cli/issues/4976)  
- **状态**：Open / triage  
- **作者**：MLgentDev  
- **创建时间**：2026-09-27  
- **评论数**：0  
- **点赞数**：3  

**问题概述**：  
当前 GitHub Copilot App 已支持配置多个外部模型或 Provider，但 Copilot CLI 的 BYOK 配置目前仅支持单一 Provider / Model。用户建议扩展现有配置能力，例如支持多个 `COPILOT_PROVIDER_*` 或更灵活的 provider/model 选择机制。

**为什么重要**：  
- 反映开发者对 BYOK，即 Bring Your Own Key / Bring Your Own Model，场景的实际需求正在增强。  
- CLI 用户往往需要在不同模型之间切换，例如代码生成、解释、重构、测试生成等任务可能对应不同模型。  
- 多 Provider 支持有助于企业环境中的模型治理、成本控制、区域合规和供应商冗余。

**社区反应**：  
该 Issue 已获得 3 个点赞，是今日互动最高的反馈。虽然暂无评论，但点赞表明社区对多模型 / 多 Provider 支持存在明确兴趣。

---

## 4. 重要 PR 进展

过去 24 小时内无 Pull Request 更新。

---

## 5. 功能需求趋势

基于今日更新的 Issue，可以观察到以下趋势：

### 1. 多模型与多 Provider 支持需求上升  
代表 Issue：[#4976](https://github.com/github/copilot-cli/issues/4976)

开发者希望 Copilot CLI 不只是绑定单一外部模型，而是能够像 Copilot App 一样配置多个 Provider，并在不同任务或上下文中灵活选择模型。这表明 CLI 用户对模型接入的要求正在从“可用”转向“可组合、可切换、可治理”。

### 2. BYOK 能力需要与桌面 / App 体验对齐  
代表 Issue：[#4976](https://github.com/github/copilot-cli/issues/4976)

用户明确对比了 Copilot App 与 Copilot CLI 的能力差异。对于重度 CLI 用户来说，如果 App 端已有多 Provider 配置能力，那么 CLI 端缺失相同能力会造成体验断层。

### 3. ARM64 Linux 兼容性成为值得关注的运行环境问题  
代表 Issue：[#4977](https://github.com/github/copilot-cli/issues/4977)

随着 Apple Silicon 用户使用 Asahi Linux 等环境进行开发，ARM64 Linux 已不再是边缘场景。捆绑二进制依赖如果对页大小、glibc、allocator 或内核特性有固定假设，可能会影响 CLI 工具在新兴开发环境中的可靠性。

### 4. 捆绑工具链的可移植性需要加强  
代表 Issue：[#4977](https://github.com/github/copilot-cli/issues/4977)

Copilot CLI 依赖内置 `ripgrep` 提供搜索能力，但静态链接 jemalloc 导致在 16KB page size 系统上崩溃。未来可能需要更保守的构建选项、更广泛的测试矩阵，或允许用户回退到系统自带 `rg`。

---

## 6. 开发者关注点

### 1. 特定平台下 CLI 无法正常运行  
相关 Issue：[#4977](https://github.com/github/copilot-cli/issues/4977)

开发者关注 Copilot CLI 是否能在非主流但日益增长的开发环境中稳定运行，尤其是 ARM64 Linux、Asahi Linux、不同 page size 内核等环境。此类问题虽然影响面相对集中，但一旦触发通常是阻断性问题。

### 2. 希望 CLI 具备更强的模型配置灵活性  
相关 Issue：[#4976](https://github.com/github/copilot-cli/issues/4976)

BYOK 用户希望在 Copilot CLI 中配置并使用多个外部模型 / Provider，而不是被限制在单一配置上。这对于企业用户、多模型工作流和成本优化场景尤其重要。

### 3. CLI 与 Copilot App 功能一致性  
相关 Issue：[#4976](https://github.com/github/copilot-cli/issues/4976)

当 Copilot App 已支持多外部模型配置时，CLI 用户自然期待相同能力。这说明社区不仅关注单个功能，也关注不同 Copilot 产品形态之间的一致体验。

### 4. 内置依赖的透明度与可替换性  
相关 Issue：[#4977](https://github.com/github/copilot-cli/issues/4977)

捆绑 `ripgrep` 崩溃表明，开发者可能需要更多方式来诊断、替换或绕过内置二进制依赖。例如支持使用系统安装的 `rg`，或提供平台兼容性说明。

---

## 总结

今日 Copilot CLI 社区没有版本和 PR 更新，但两个 Issue 都具有较强信号价值：[#4977](https://github.com/github/copilot-cli/issues/4977) 暴露了 ARM64 / Asahi Linux 环境下捆绑依赖的兼容性问题，[#4976](https://github.com/github/copilot-cli/issues/4976) 则体现了 BYOK 用户对多模型、多 Provider 支持的明确诉求。短期内，建议重点关注维护者是否会针对 `ripgrep` 构建兼容性和 BYOK 配置扩展给出路线回应。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报｜2026-09-28

## 1. 今日速览

过去 24 小时 OpenCode 社区主要围绕 **V2 桌面端 / Web UI / TUI 稳定性** 展开，高频问题集中在会话标签管理、移动端交互、MCP 生命周期、模型调用历史兼容性以及 Windows / macOS 安装运行问题。  
PR 侧修复活跃，多个 Issue 已有对应修复提交，尤其是 Anthropic 工具历史、移动端 Question 控件、TUI 链接重复打开、MCP 连接稳定性等问题进入处理阶段。  
今日无新版本发布。

---

## 2. 社区热点 Issues

### 1. Project-level tabs：按项目组织会话标签  
Issue: [#51759](https://github.com/anomalyco/opencode/issues/51759)  
状态：Open｜评论：4  
该需求建议将当前“所有 session 混在同一顶部标签栏”的设计改为 **项目级 Tab + 左侧项目内 session 列表**。这反映出 V2 桌面端在多项目并行开发场景下的信息架构压力，是今日讨论度最高的功能请求之一。

### 2. 误关 Tab 后无法恢复  
Issue: [#51717](https://github.com/anomalyco/opencode/issues/51717)  
状态：Closed｜评论：4  
用户希望桌面端支持类似浏览器的 “Reopen closed tab”。虽然该 Issue 已关闭并标记合规相关，但需求本身与多 session 工作流强相关，和 #51759 一起显示出社区对 Tab / Session 管理体验的关注。

### 3. 行内代码 `write/edit` 被误识别为文件路径  
Issue: [#51723](https://github.com/anomalyco/opencode/issues/51723)  
状态：Open｜评论：3  
桌面端将包含斜杠的行内代码误渲染为可点击文件路径，点击后报 “File not found”。这是典型的 Markdown / 聊天消息渲染误判问题，影响阅读体验，已有对应 PR [#51722](https://github.com/anomalyco/opencode/pull/51722)。

### 4. Anthropic system update 与本地工具结果顺序冲突  
Issue: [#51764](https://github.com/anomalyco/opencode/issues/51764)  
状态：Open｜评论：2  
Anthropic 消息转换在本地 tool call 与 tool result 之间插入 system update 时被拒绝，导致原本可恢复的工具历史失败。该问题直接影响长会话、恢复会话和工具调用可靠性，已有修复 PR [#51765](https://github.com/anomalyco/opencode/pull/51765)。

### 5. 移动端 Question 工具控件被截断  
Issue: [#51770](https://github.com/anomalyco/opencode/issues/51770)  
状态：Open｜评论：2  
V2 Web App 在 iPhone 15 Pro 等移动视口下，长问题或多个选项会把 Next / Submit 挤出屏幕，用户无法完成回答。该问题影响移动端可用性，已有 PR [#51771](https://github.com/anomalyco/opencode/pull/51771)。

### 6. TUI 授权链接修改点击会打开重复浏览器标签  
Issue: [#51756](https://github.com/anomalyco/opencode/issues/51756)  
状态：Open｜评论：2  
TUI 中对授权链接进行 modified click 时，终端原生 OSC 8 hyperlink 和 OpenCode 自身 opener 同时触发，导致打开两个浏览器标签。已有 PR [#51757](https://github.com/anomalyco/opencode/pull/51757) 修复。

### 7. TUI 间歇性 OOM，内存暴涨至 24–28GB  
Issue: [#51761](https://github.com/anomalyco/opencode/issues/51761)  
状态：Open｜评论：1  
用户报告 V2 TUI 内存以 500MB/s–1GB/s 线性增长，最终被 OOM killer 杀死，目前尚未找到稳定触发条件。这是今日最值得关注的稳定性问题之一，若复现范围扩大，可能成为阻塞性缺陷。

### 8. 非英文语言环境下 desktop 渲染 todowrite 崩溃  
Issue: [#51762](https://github.com/anomalyco/opencode/issues/51762)  
状态：Open｜评论：1  
桌面端在非英文 locale 下打开包含 `todowrite` 工具调用的 session 时，renderer 崩溃。原因指向 `Intl.ListFormat` 与未定义 title 的组合问题，说明国际化路径仍存在边界条件。

### 9. Windows PowerShell 下 V2 无法原地升级  
Issue: [#51755](https://github.com/anomalyco/opencode/issues/51755)  
状态：Open｜评论：1  
当前文档安装器偏 bash，Windows 原生 PowerShell 用户无法顺畅升级，只能手动替换 zip 内二进制。该问题体现出 Windows 平台安装 / 更新链路仍不够成熟。

### 10. macOS 27 下 ad-hoc signed binary 被 taskgated 杀死  
Issue: [#51742](https://github.com/anomalyco/opencode/issues/51742)  
状态：Open｜评论：1  
用户报告 2.0.6 自动更新包为 ad-hoc 签名，在 macOS 27 通过 SSH 启动时被 `taskgated` 以 Code Signature Invalid 杀死，影响 headless / SSH 自动化场景。该类问题对 CI、远程开发和服务化部署影响较大。

---

## 3. 重要 PR 进展

### 1. 修复移动端 Question 控件不可见  
PR: [#51771](https://github.com/anomalyco/opencode/pull/51771)  
状态：Open  
关联 Issue [#51770](https://github.com/anomalyco/opencode/issues/51770)。该 PR 调整 V2 Web App 中长问题和多选项场景下的高度计算，确保 Next / Submit 在移动视口内可见。

### 2. 延迟 Anthropic system updates，等待本地 tool result  
PR: [#51765](https://github.com/anomalyco/opencode/pull/51765)  
状态：Open  
关联 Issue [#51764](https://github.com/anomalyco/opencode/issues/51764)。修复 Anthropic 消息历史中 system update 插入时机问题，避免在本地工具调用结果尚未输出前破坏消息顺序。

### 3. TUI 链接 modified click 交给终端处理  
PR: [#51757](https://github.com/anomalyco/opencode/pull/51757)  
状态：Open  
关联 Issue [#51756](https://github.com/anomalyco/opencode/issues/51756)。该修复避免 TUI 和终端原生 hyperlink handler 双重触发，解决授权链接重复打开的问题。

### 4. 修复行内代码误判为文件路径  
PR: [#51722](https://github.com/anomalyco/opencode/pull/51722)  
状态：Open  
关联 Issue [#51723](https://github.com/anomalyco/opencode/issues/51723)。调整 `inlineCodeKind` 判断逻辑，不再把普通 `word/word` 形式的行内代码一律识别为文件路径。

### 5. 记录 overflow 作为独立 compaction reason  
PR: [#51767](https://github.com/anomalyco/opencode/pull/51767)  
状态：Open  
当 provider 因上下文过长拒绝请求而触发压缩时，此前会被记录为普通 `auto`。该 PR 增加更精确的 compaction reason，有助于诊断上下文溢出与自动压缩行为。

### 6. 修复 session wake 失败导致 prompt 滞留  
PR: [#51751](https://github.com/anomalyco/opencode/pull/51751)  
状态：Open  
解决 prompt 已持久化进入 inbox，但 advisory session wake 失败后 runner 未消费的问题。该修复提升任务调度可靠性，避免输入被“静默搁置”。

### 7. MCP stdio 超大帧失败时不关闭整个 transport  
PR: [#51743](https://github.com/anomalyco/opencode/pull/51743)  
状态：Open  
关联 Issue [#51092](https://github.com/anomalyco/opencode/issues/51092)。当本地 MCP server 返回超过约 10MiB 的消息时，改为让该调用失败，而不是撕裂整个连接，提升 MCP 连接鲁棒性。

### 8. provider 返回 length finish 且无内容时应判失败  
PR: [#51741](https://github.com/anomalyco/opencode/pull/51741)  
状态：Open  
关联 Issue [#50949](https://github.com/anomalyco/opencode/issues/50949)。修复 provider 以 `finish_reason: "length"` 结束但没有任何文本、reasoning 或 tool call 时仍被当成正常 Step 的问题。

### 9. `opencode web` 增加 `--no-open`  
PR: [#51736](https://github.com/anomalyco/opencode/pull/51736)  
状态：Open  
关联 Issue [#43636](https://github.com/anomalyco/opencode/issues/43636)。新增 `--no-open` 参数，用于启动 Web 服务但不自动打开浏览器，适合 systemd、容器、WSL 自动启动等服务化场景。

### 10. 关闭 Location 时同步关闭 MCP servers  
PR: [#51730](https://github.com/anomalyco/opencode/pull/51730)  
状态：Open  
修复配置 reload 或 Location 失效后，旧 stdio MCP 进程继续存活并与新进程重叠的问题。该 PR 对长期运行的开发环境和频繁 reload 场景非常关键。

---

## 4. 功能需求趋势

### 1. Session / Tab 工作流增强  
相关 Issue: [#51759](https://github.com/anomalyco/opencode/issues/51759), [#51717](https://github.com/anomalyco/opencode/issues/51717), [#51740](https://github.com/anomalyco/opencode/issues/51740), [#51738](https://github.com/anomalyco/opencode/issues/51738)  
用户希望桌面端更接近 IDE / 浏览器式工作流：按项目组织 session、恢复关闭的 tab、正确显示 tab 预览项目名、降低 tab hover 延迟。

### 2. 移动端 Web UI 可用性  
相关 Issue: [#51770](https://github.com/anomalyco/opencode/issues/51770)  
V2 Web UI 已被用于移动设备场景，社区开始反馈小屏交互问题。Question tool 的选项与提交按钮可见性，是当前最直接的移动端痛点。

### 3. 登录与身份认证体验  
相关 Issue: [#51763](https://github.com/anomalyco/opencode/issues/51763)  
用户希望 Web UI 登录支持 passkey。说明 OpenCode 的 Web 化使用场景正在增长，认证方式也需要更现代化。

### 4. MCP 稳定性与生命周期管理  
相关 Issue: [#51731](https://github.com/anomalyco/opencode/issues/51731), [#51709](https://github.com/anomalyco/opencode/issues/51709)  
社区持续关注 MCP server 重复启动、reload 后旧进程残留、连接未正确关闭等问题。MCP 已成为 OpenCode 插件和工具生态的重要底座。

### 5. 多模型与 provider 兼容性  
相关 Issue: [#51739](https://github.com/anomalyco/opencode/issues/51739), [#51750](https://github.com/anomalyco/opencode/issues/51750), [#51764](https://github.com/anomalyco/opencode/issues/51764)  
问题集中在模型 catalog、subagent 模型切换、Anthropic / Gemini / OpenAI-compatible 协议差异等方向。社区对“多模型可靠切换”和“provider 行为一致性”的要求正在提高。

### 6. 跨平台安装与自动更新  
相关 Issue: [#51755](https://github.com/anomalyco/opencode/issues/51755), [#51742](https://github.com/anomalyco/opencode/issues/51742), [#51745](https://github.com/anomalyco/opencode/issues/51745)  
Windows PowerShell 升级、macOS 签名、Windows hardlink 跨卷失败等问题显示，OpenCode 在跨平台二进制分发和自更新链路上仍有完善空间。

---

## 5. 开发者关注点

1. **V2 稳定性仍是核心关注点**  
   TUI OOM、session wake 滞留、compaction 边界错误、provider length 空输出等问题说明，V2 runtime 在长会话和复杂工具调用场景下仍需加强稳定性。

2. **桌面端多项目体验需要系统性设计**  
   多个 Issue 指向 tab 组织、tab 预览、误关恢复、项目名显示等体验问题。用户已经将 OpenCode 当作长期运行的多项目工作台使用，而不是单次 CLI 工具。

3. **MCP 生态进入“长期运行可靠性”阶段**  
   问题不再只是能否连接 MCP，而是 reload、关闭、超大消息、重复进程、transport 生命周期等工程化细节。

4. **模型协议差异带来的兼容成本上升**  
   Anthropic system update、Gemini thought signature、OpenAI-compatible tool call 等问题说明，多 provider 支持需要更严格的消息归一化和历史修复机制。

5. **跨平台体验对采用率影响明显**  
   Windows 和 macOS 用户反馈集中在安装、升级、签名和服务运行。若 OpenCode 要覆盖更广泛开发者群体，平台原生安装体验需要继续补强。

6. **Web UI 和移动端使用场景正在增长**  
   passkey 登录、移动端 Question tool 布局、`opencode web --no-open` 等需求显示，OpenCode 正从本地 TUI / Desktop 向 Web 服务化和远程使用扩展。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-09-28

## 1. 今日速览

过去 24 小时内，Pi 社区没有新版本发布，但 Issue 活跃度较高，共有 13 条 Issue 更新，且大多已关闭，说明维护响应较快。今日讨论重点集中在 **会话启动性能、TUI/CLI 稳定性、模型运行时兼容性、上下文注入、工具调用与输出截断处理** 等开发者高频痛点上。

PR 方面共有 3 条更新，主要涉及 shell 输出压缩、AI reasoning delta 兼容，以及一次学习型提交；整体来看，社区正在围绕“更稳定的 Agent 运行时”和“更可靠的长上下文/工具调用体验”持续改进。

---

## 2. 社区热点 Issues

### 1. `ModelRuntime.create()` 支持显式传入 `authContext`
- Issue：[#10112](https://github.com/earendil-works/pi/issues/10112)
- 状态：Closed
- 作者：sangwoopak-dev
- 重要性：该需求希望 `CreateModelRuntimeOptions` 暴露 `authContext?: AuthContext`，并转发到底层 `createModels(...)`。
- 影响：对需要在不同认证上下文中动态创建模型运行时的集成方很重要，尤其是多租户、插件化或外部宿主环境。
- 社区反应：评论 2 条，点赞 0；虽然互动不多，但属于 API 完整性修复，已快速关闭。

### 2. 会话创建重复加载所有扩展，导致 CLI 延迟从 4s 增至 280s+
- Issue：[#10105](https://github.com/earendil-works/pi/issues/10105)
- 状态：Closed
- 作者：wu546526
- 重要性：用户报告在包含 34 个 package、70+ 扩展的大型配置下，每次新会话都会重新加载扩展，导致性能成本累积。
- 影响：直接影响长时间运行的 CLI / host 进程体验，是大型插件生态下的关键性能问题。
- 社区反应：评论 2 条，点赞 0；反馈包含具体环境和耗时数据，具有较高诊断价值。

### 3. `attach / new_chat` 会话创建延迟随时间退化至 140s+
- Issue：[#10104](https://github.com/earendil-works/pi/issues/10104)
- 状态：Closed
- 作者：wu546526
- 重要性：该问题指出在服务运行约 15 小时后，新建或附加会话会出现严重延迟，并伴随 CPU 峰值。
- 影响：对 Web UI、长期运行的 Agent 服务和多会话场景影响明显。
- 社区反应：评论 2 条，点赞 0；与 #10105 共同指向会话生命周期和扩展管理的性能瓶颈。

### 4. `AGENTS.md` 被读取但未注入 system prompt
- Issue：[#10101](https://github.com/earendil-works/pi/issues/10101)
- 状态：Closed
- 作者：nonkr
- 重要性：用户通过 `strace` 确认 `AGENTS.md` 文件被资源加载器打开，但内容未进入 system prompt。
- 影响：会导致项目级 Agent 指令失效，影响一致性、自动化流程和团队规范注入。
- 社区反应：评论 2 条，点赞 0；问题定位较清晰，属于上下文装配链路的重要缺陷。

### 5. Darwin 多路复用环境下 clipboard 复制跳过 OSC 52
- Issue：[#10114](https://github.com/earendil-works/pi/issues/10114)
- 状态：Closed
- 作者：zhcsyncer
- 重要性：macOS 原生剪贴板复制成功后会跳过 OSC 52，但在 tmux / 远程客户端场景中，用户端剪贴板不会更新。
- 影响：影响 SSH、tmux、远程开发等终端工作流中的复制体验。
- 社区反应：评论 1 条，点赞 0；该问题补充了此前 clipboard 修复在多路复用场景下的边界情况。

### 6. 主题系统无法关闭粗体样式
- Issue：[#10111](https://github.com/earendil-works/pi/issues/10111)
- 状态：Closed
- 作者：ZenStudioLab
- 重要性：当前 TUI 组件中字体粗细被硬编码，`theme.bold()` 总是应用 `chalk.bold`，主题无法完全控制视觉风格。
- 影响：影响自定义主题、低对比度主题和极简风格主题的表现。
- 社区反应：评论 1 条，点赞 0；属于 TUI 可定制性和开发者体验改进。

### 7. interactive mode 中 TTY stdin `EIO` 导致未捕获崩溃
- Issue：[#10110](https://github.com/earendil-works/pi/issues/10110)
- 状态：Closed
- 作者：salmanabdurrahman
- 重要性：关闭终端窗口、断开 SSH、结束 tmux/zellij pane 时，`pi` 会因 `read EIO` 未捕获异常崩溃。
- 影响：这是典型的终端生命周期异常处理问题，会影响 CLI 稳定性和日志清洁度。
- 社区反应：评论 1 条，点赞 0；被标记为 bug，修复优先级较高。

### 8. auto-mode bash 审批误判 benign token-echo 为“社工攻击”
- Issue：[#10109](https://github.com/earendil-works/pi/issues/10109)
- 状态：Closed
- 作者：namasme
- 重要性：同一任务、同一模型、同一会话下，bash 审批屏会拒绝 benign token echo，但 byte-identical 的 write tool 操作可以通过。
- 影响：暴露了安全审批策略在不同工具路径上的不一致性，可能影响 auto-mode 的可预测性。
- 社区反应：评论 1 条，点赞 0；对安全策略、工具权限和误报控制都有参考价值。

### 9. 切换到 `openai-responses` 模型时，历史 transcript 中 tool-call ID 冲突导致 400
- Issue：[#10106](https://github.com/earendil-works/pi/issues/10106)
- 状态：Closed
- 作者：khentmoba
- 重要性：在一个主要使用其他 provider 的会话中，历史工具调用 ID 可能与 OpenAI Responses API 的约束冲突，切换模型后触发 400。
- 影响：这会影响跨 provider 长会话、模型热切换和多后端兼容性。
- 社区反应：评论 1 条，点赞 0；对多模型运行时适配具有实际意义。

### 10. 流式输出时，渲染成本随 transcript 长度增长
- Issue：[#10102](https://github.com/earendil-works/pi/issues/10102)
- 状态：Closed
- 作者：grknbyk
- 重要性：用户指出主屏幕渲染路径存在缓存利用不足问题，导致 streaming 时每帧渲染成本随 transcript 增长。
- 影响：长对话、长 shell 输出和持续流式响应场景下，TUI 性能会明显下降。
- 社区反应：评论 1 条，点赞 0；与今日多个性能问题形成呼应，显示社区对长会话性能较敏感。

---

## 3. 重要 PR 进展

> 过去 24 小时内仅有 3 条 PR 更新，因此本节列出全部 PR。

### 1. 保留 shell 输出 tail-truncated 前的有用信息
- PR：[#10113](https://github.com/earendil-works/pi/pull/10113)
- 状态：Closed
- 作者：arjunkshah12345-hash
- 内容：当 bash / PowerShell 输出被截断时，当前只保留尾部 2,000 行或 50KB，可能丢失位于截断前的关键行。该 PR 在设置 `SUPERCOMPRESS_API_KEY` 且保存文件不超过 120,000 字符时，对被截断输出进行压缩，以保留更多有用信息。
- 价值：提升 Agent 对长命令输出的理解能力，尤其适用于测试日志、构建日志、错误堆栈和大规模 grep 结果。

### 2. 修复 AI reasoning detail 中仅包含 signature 的 delta 被丢弃
- PR：[#10100](https://github.com/earendil-works/pi/pull/10100)
- 状态：Closed
- 作者：Serenity-2026
- 内容：Claude via OpenRouter 可能流式返回仅包含 `signature`、不包含 `text` 的 `reasoning_details` delta。此前校验函数要求 `text` 必须为 string，导致这些 delta 被丢弃。
- 价值：增强对不同模型供应商 reasoning 流格式的兼容性，避免思考签名信息丢失，提升多 provider 支持质量。

### 3. 学习型 Git 实验提交
- PR：[#10099](https://github.com/earendil-works/pi/pull/10099)
- 状态：Closed
- 作者：jiaqitang-1
- 内容：提交个人 Git 实验作业，并说明只修改了 `members/jiaqitang-1/README.md`。
- 价值：不是核心功能 PR，但反映仓库中存在学习或社区成员贡献流程。

---

## 4. 功能需求趋势

### 1. 会话启动与长时间运行性能优化
相关 Issue：
- [#10105](https://github.com/earendil-works/pi/issues/10105)
- [#10104](https://github.com/earendil-works/pi/issues/10104)
- [#10102](https://github.com/earendil-works/pi/issues/10102)

趋势说明：  
社区对 session 创建、extension loading、streaming render 的性能退化非常敏感。尤其是在大量扩展、长 transcript、长期运行服务中，性能成本会被持续放大。

### 2. 多模型 / 多 provider 兼容性
相关 Issue / PR：
- [#10112](https://github.com/earendil-works/pi/issues/10112)
- [#10106](https://github.com/earendil-works/pi/issues/10106)
- [#10108](https://github.com/earendil-works/pi/issues/10108)
- [#10100](https://github.com/earendil-works/pi/pull/10100)

趋势说明：  
开发者正在推动 Pi 更好地兼容不同模型后端，包括 OpenAI Responses、OpenRouter、Claude、Fireworks 等。关注点包括认证上下文传递、tool-call ID 兼容、默认模型目录完整性，以及 reasoning stream 格式适配。

### 3. TUI / CLI 稳定性与终端体验
相关 Issue：
- [#10114](https://github.com/earendil-works/pi/issues/10114)
- [#10111](https://github.com/earendil-works/pi/issues/10111)
- [#10110](https://github.com/earendil-works/pi/issues/10110)

趋势说明：  
终端用户反馈集中在剪贴板、多路复用器、主题可定制性和异常退出处理。Pi 的 CLI/TUI 使用场景较重，因此终端边界问题正在成为持续优化方向。

### 4. Agent 上下文与项目指令注入
相关 Issue：
- [#10101](https://github.com/earendil-works/pi/issues/10101)

趋势说明：  
`AGENTS.md` 作为项目级行为约束文件，如果被读取但未注入系统提示，会直接影响 Agent 的可控性。社区对“上下文实际是否进入模型”越来越关注。

### 5. 安全审批与工具调用一致性
相关 Issue：
- [#10109](https://github.com/earendil-works/pi/issues/10109)

趋势说明：  
auto-mode 的安全审批机制需要在 bash、write 等不同工具路径间保持一致。误判会影响自动化能力，过度放行则带来安全风险，后续可能需要更透明的审批解释和统一策略。

### 6. 长输出处理与信息保真
相关 Issue / PR：
- [#10103](https://github.com/earendil-works/pi/issues/10103)
- [#10113](https://github.com/earendil-works/pi/pull/10113)

趋势说明：  
长 paste、长 shell 输出、日志截断等场景都指向同一个问题：Agent 需要在有限上下文内尽可能保留关键诊断信息。社区正在探索压缩、缓存、外部文件保存与编辑器交互等方案。

---

## 5. 开发者关注点

### 1. 大型扩展配置下的性能可预测性
多个反馈显示，在 70+ extensions、长期运行 host、多 session 场景下，Pi 的性能可能快速退化。开发者希望扩展加载、session 初始化和渲染路径具备更强缓存能力，避免重复计算。

### 2. 长会话中的跨模型切换可靠性
跨 provider 使用已成为常态，但不同后端对 tool-call ID、reasoning delta、认证上下文的要求不同。开发者需要 Pi 在模型切换时自动处理兼容问题，而不是让历史 transcript 触发 API 错误。

### 3. CLI/TUI 需要更好适配真实终端环境
SSH、tmux、zellij、macOS clipboard、终端关闭、EIO 异常等都是实际开发场景。社区希望 Pi 不仅在标准本地终端下可用，也能在远程和多路复用环境中稳定运行。

### 4. Agent 指令和上下文透明性不足
`AGENTS.md` 被读取但未进入 prompt 的问题说明，开发者希望能够确认哪些上下文真正被注入模型。未来可能需要更好的 debug view、prompt inspection 或 context trace 工具。

### 5. 自动审批系统需要降低误报
auto-mode 的安全拦截如果在不同工具路径上表现不一致，会降低用户对自动化模式的信任。开发者关注的是：既要安全，也要可解释、可复现、可配置。

### 6. 长文本输入与输出需要更强保真机制
无论是 `/bug` 外部编辑器丢失大段 paste，还是 shell 输出截断导致关键行不可见，都说明长文本处理仍是 Agent 工具链的痛点。社区更倾向于通过压缩、临时文件、摘要保留和智能截断来改善体验。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报  
**日期：2026-09-28**  
**仓库：QwenLM/qwen-code**

## 1. 今日速览

过去 24 小时 Qwen Code 社区主要围绕 **v0.24.6 稳定性、Web Shell/Desktop 体验、遥测与代理隐私、Managed Agent 架构演进** 展开。  
Issues 中多起 P1/P2 问题集中在 Webview 崩溃、右侧面板无法关闭、工具 schema 兼容、NO_PROXY/usage statistics 失效等实际使用痛点；PR 侧则快速跟进了 Ollama、MCP reconnect、aux-model 凭据泄露、Runtime Broker 数值持久化等修复。  
同时，Managed Agent 相关 PR 和 Issue 持续高频推进，说明多 Agent、持久会话、托管运行时与扩展运行时仍是当前主线研发方向。

---

## 2. 社区热点 Issues

### 1. Webview 在 `@file` 引用场景下崩溃  
- Issue：[#12826](https://github.com/QwenLM/qwen-code/issues/12826)  
- 状态：已关闭  
- 标签：P1、bug、UI、web-shell  
- 重要性：这是过去一天评论最多的问题之一，影响 VSCode Remote-SSH 下使用 `@file.tsx` 引用时的核心交互流程。  
- 社区反应：7 条评论，说明复现和修复讨论较活跃；该问题已关闭，推测已有修复或规避方案落地。  

### 2. aux-model selector 泄露带 userinfo 的 `baseUrl` 凭据  
- Issue：[#12856](https://github.com/QwenLM/qwen-code/issues/12856)  
- 状态：开放  
- 标签：P2、bug、configuration、security、credential-security  
- 重要性：涉及 `visionModel`、`imageModel`、`advisorModel`、`fastModel`、`compactionModel` 等设置项，若 `baseUrl` 中嵌入 token，可能在公共输出面暴露。  
- 社区反应：5 条评论，安全影响明确；对应修复 PR [#12862](https://github.com/QwenLM/qwen-code/pull/12862) 已开启。  

### 3. Skill 工具被排除后仍注入 Skills listing  
- Issue：[#12835](https://github.com/QwenLM/qwen-code/issues/12835)  
- 状态：开放  
- 标签：P2、bug、core、context-performance  
- 重要性：即使通过 `--exclude-tools skill` 排除了 Skill 工具，请求中仍包含 Skills 相关 system reminder，影响工具隔离与上下文预算。  
- 社区反应：5 条评论；该问题与上下文性能、工具最小化和 OpenAI logging 可观测性直接相关。  

### 4. cua-sdk 下载 native payload 时不遵守代理配置  
- Issue：[#12829](https://github.com/QwenLM/qwen-code/issues/12829)  
- 状态：开放  
- 标签：P2、bug、integration、installation、packaging  
- 重要性：在需要 HTTP(S) proxy 的网络环境中，`@qwen-code/cua-sdk` 安装会超时，影响企业和受限网络用户安装。  
- 社区反应：5 条评论，且更新到 2026-09-28，说明仍在跟进。  

### 5. 32K 上下文模型的自定义 Provider 适配指导  
- Issue：[#12886](https://github.com/QwenLM/qwen-code/issues/12886)  
- 状态：开放  
- 标签：P3、feature-request、configuration、token-management、context-performance  
- 重要性：用户希望为 32,768 token 上下文模型提供更清晰的工具/system payload 缩减方案，或在超出预算前给出 preflight 提示。  
- 社区反应：4 条评论，反映自定义 OpenAI-compatible provider 用户对上下文预算控制的需求上升。  

### 6. macOS Desktop 右侧扩展面板打开后无法关闭  
- Issue：[#12874](https://github.com/QwenLM/qwen-code/issues/12874)  
- 状态：开放  
- 标签：P2、bug、UI、macOS、web-shell  
- 重要性：影响 Desktop 端文件变更、侧边任务、网页预览、轨迹、终端等右侧面板的基本可用性。  
- 社区反应：4 条评论；对应修复 PR [#12876](https://github.com/QwenLM/qwen-code/pull/12876) 已开启。  

### 7. Runtime Broker 中 fastjson2 负 scale BigDecimal 持久化后不可读  
- Issue：[#12859](https://github.com/QwenLM/qwen-code/issues/12859)  
- 状态：开放  
- 标签：P2、bug、core、sdk  
- 重要性：这是 Runtime Broker 持久化一致性问题，可能导致 JDBC 中出现写入后无法读取的数据行。  
- 社区反应：4 条评论；对应修复 PR [#12870](https://github.com/QwenLM/qwen-code/pull/12870) 已开启。  

### 8. `qwen mcp reconnect` 在关闭 usage statistics 后仍发送 session_start  
- Issue：[#12844](https://github.com/QwenLM/qwen-code/issues/12844)  
- 状态：开放  
- 标签：P2、bug、telemetry、mcp、data-privacy  
- 重要性：用户显式禁用使用统计后仍上传 RUM 事件，属于隐私和配置遵从性问题。  
- 社区反应：4 条评论；对应修复 PR [#12857](https://github.com/QwenLM/qwen-code/pull/12857) 已开启。  

### 9. `/cd` 命令在 v0.24.6 中无法正常切换会话工作目录  
- Issue：[#12843](https://github.com/QwenLM/qwen-code/issues/12843)  
- 状态：开放，需补充信息  
- 标签：P1、bug、CLI、commands、interactive  
- 重要性：`/cd` 是交互式 CLI 的基础工作流能力，若无法准确切换目录会影响多项目、多层目录开发体验。  
- 社区反应：3 条评论，目前需要更多复现信息。  

### 10. Ollama 拒绝无参数工具：`parameters` 字段缺失  
- Issue：[#12878](https://github.com/QwenLM/qwen-code/issues/12878)  
- 状态：开放  
- 标签：P2、bug、core、content-generation  
- 重要性：使用 OpenAI auth type 连接本地 Ollama 时，零参数工具会触发 400，导致会话整体不可用。  
- 社区反应：3 条评论；修复 PR [#12879](https://github.com/QwenLM/qwen-code/pull/12879) 已提交。  

---

## 3. 重要 PR 进展

### 1. 将 Mem0 作为可选记忆能力集成到主 CLI  
- PR：[#12891](https://github.com/QwenLM/qwen-code/pull/12891)  
- 状态：开放  
- 类型：feature  
- 内容：新增 opt-in 的 Mem0 连接能力，可通过 `memory.mem0` 配置 endpoint 和凭据引用，并自动注册 MCP server，提供稳定的 user/repository scope。  
- 价值：增强长期记忆和跨会话检索能力，是 Qwen Code 向更持久化 Agent 体验演进的重要一步。  

### 2. Managed Agent：新增 FG6b Session Store failure gates  
- PR：[#12888](https://github.com/QwenLM/qwen-code/pull/12888)  
- 状态：开放  
- 类型：test  
- 内容：为 Hosted workspace tool integration suite 增加 7 个 Session Store 故障门，覆盖参数、intent、pre-start checkpoint、结果持久化和 reply loss 等场景。  
- 价值：提升多进程、托管工具调用链路在故障情况下的可验证性。  

### 3. ACP 集成测试为模型 round trip 单独分配请求预算  
- PR：[#12885](https://github.com/QwenLM/qwen-code/pull/12885)  
- 状态：已关闭  
- 类型：test  
- 内容：将 `session/prompt` 的预算提高到 180s，其他本地 JSON-RPC 请求保持较短预算。  
- 价值：降低 CI 中模型响应延迟导致的误报，同时保持本地 RPC 故障能快速暴露。  

### 4. Node REPL bounded-cancellation 测试放宽时间边界  
- PR：[#12884](https://github.com/QwenLM/qwen-code/pull/12884)  
- 状态：已关闭  
- 类型：test/fix  
- 内容：将相关测试中的 host-driven exec timeout 从 200ms 调整到 2000ms，case budget 从 10s 调整到 20s。  
- 价值：修复或缓解主分支 CI 中由于 runner load 导致的 flaky failure，对应 Issue [#12882](https://github.com/QwenLM/qwen-code/issues/12882)。  

### 5. Managed Agent：严格配置快照与兼容性评估 M3  
- PR：[#12883](https://github.com/QwenLM/qwen-code/pull/12883)  
- 状态：已关闭  
- 类型：feature  
- 内容：实现 ordinary-host Managed engine 设计中的 M3 切片，在 Managed session 运行前执行配置兼容性评估，并生成只读配置快照。  
- 价值：为 Managed 模式在普通 `qwen serve` host 上稳定运行提供前置约束。  

### 6. Managed Agent：Session close/archive/delete 持久化操作  
- PR：[#12881](https://github.com/QwenLM/qwen-code/pull/12881)  
- 状态：开放  
- 类型：feature  
- 内容：实现 Stage D4，使 Session close、archive、delete 成为 durable operations，并更新 contract v1.18。  
- 价值：补齐持久会话生命周期管理能力，是 session-management roadmap 的关键推进。  

### 7. Ollama Provider 为零参数工具注入空 `parameters`  
- PR：[#12879](https://github.com/QwenLM/qwen-code/pull/12879)  
- 状态：开放  
- 类型：fix  
- 内容：针对 Ollama 不接受缺失 `parameters` 的 function tool schema，新增 Provider 逻辑，为无参数工具注入空参数对象。  
- 价值：修复本地 Ollama 后端不可用问题，对应 Issue [#12878](https://github.com/QwenLM/qwen-code/issues/12878)。  

### 8. 修复 macOS Web Shell 右侧面板关闭按钮区域问题  
- PR：[#12876](https://github.com/QwenLM/qwen-code/pull/12876)  
- 状态：开放  
- 类型：fix  
- 内容：将 macOS Desktop shell 中 docked right panel 下移，避开 titlebar drag region，解决面板打开后无法关闭的问题。  
- 价值：直接改善 Desktop 用户的基础 UI 可用性，对应 Issue [#12874](https://github.com/QwenLM/qwen-code/issues/12874)。  

### 9. 为 PreToolUse command hooks 增加 `failMode: "closed"`  
- PR：[#12875](https://github.com/QwenLM/qwen-code/pull/12875)  
- 状态：开放  
- 类型：feature/fix  
- 内容：为 command hooks 增加按 hook 配置的 `failMode`，默认保持 `"open"`，可选择 `"closed"` 以在 hook 传输失败、超时、非零退出等情况下阻止工具继续执行。  
- 价值：增强安全敏感场景下的 hook 策略表达能力。  

### 10. 清理 aux-model selector 输出中的 userinfo 凭据  
- PR：[#12862](https://github.com/QwenLM/qwen-code/pull/12862)  
- 状态：开放  
- 类型：security fix  
- 内容：针对 `visionModel`、`imageModel`、`advisorModel`、`fastModel`、`compactionModel` 等设置，将对外输出中的 baseUrl userinfo 凭据 scrub 掉。  
- 价值：修复潜在凭据泄露问题，对应 Issue [#12856](https://github.com/QwenLM/qwen-code/issues/12856)。  

---

## 4. 功能需求趋势

### 1. Managed Agent 与多 Agent 运行时持续升温  
相关 Issue/PR：  
- [#12827](https://github.com/QwenLM/qwen-code/issues/12827)  
- [#12847](https://github.com/QwenLM/qwen-code/issues/12847)  
- [#12867](https://github.com/QwenLM/qwen-code/issues/12867)  
- [#12872](https://github.com/QwenLM/qwen-code/issues/12872)  
- [#12881](https://github.com/QwenLM/qwen-code/pull/12881)  
- [#12888](https://github.com/QwenLM/qwen-code/pull/12888)  

社区和维护者正在围绕 Managed Agent 的 extension runtime、durable session lifecycle、Hosted tool turn fault gates、Session Store failure gates 等方向持续推进。趋势非常明确：Qwen Code 正从单会话 CLI/IDE 助手演进为具备持久会话、多 Agent 协作和托管执行能力的平台。

### 2. 隐私、遥测和代理配置遵从性成为高频关注点  
相关 Issue/PR：  
- [#12820](https://github.com/QwenLM/qwen-code/issues/12820)  
- [#12844](https://github.com/QwenLM/qwen-code/issues/12844)  
- [#12852](https://github.com/QwenLM/qwen-code/issues/12852)  
- [#12857](https://github.com/QwenLM/qwen-code/pull/12857)  

用户对 `NO_PROXY`、usage statistics opt-out、MCP reconnect 中的 RUM 上传行为高度敏感。企业环境下，代理、隐私开关和遥测行为需要严格遵从显式配置。

### 3. Web Shell/Desktop UX 问题集中暴露  
相关 Issue/PR：  
- [#12826](https://github.com/QwenLM/qwen-code/issues/12826)  
- [#12874](https://github.com/QwenLM/qwen-code/issues/12874)  
- [#12890](https://github.com/QwenLM/qwen-code/issues/12890)  
- [#12876](https://github.com/QwenLM/qwen-code/pull/12876)  
- [#12858](https://github.com/QwenLM/qwen-code/pull/12858)  

Webview 崩溃、右侧面板无法关闭、终端渲染抖动等问题显示 Desktop/Web Shell 的使用面正在扩大，用户对稳定、可预测的 UI 体验要求提高。

### 4. 自定义 Provider 与本地模型兼容性需求增强  
相关 Issue/PR：  
- [#12878](https://github.com/QwenLM/qwen-code/issues/12878)  
- [#12879](https://github.com/QwenLM/qwen-code/pull/12879)  
- [#12886](https://github.com/QwenLM/qwen-code/issues/12886)  

Ollama、本地 OpenAI-compatible provider、32K context 模型等场景反映出社区正在将 Qwen Code 接入更多非官方或私有模型后端。工具 schema、上下文预算、预检提示将成为兼容性的关键点。

### 5. 上下文性能与系统提示最小化需求增加  
相关 Issue：  
- [#12835](https://github.com/QwenLM/qwen-code/issues/12835)  
- [#12886](https://github.com/QwenLM/qwen-code/issues/12886)  

用户开始关注工具列表、system reminder、skills listing 等系统 payload 对上下文窗口的占用。尤其在 32K 模型或自定义模型场景下，如何裁剪初始上下文将影响可用性。

---

## 5. 开发者关注点

### 1. v0.24.6 的交互稳定性仍是当前痛点  
Webview 崩溃、`/cd` 命令异常、macOS 右侧面板无法关闭、终端视图抖动等问题说明 v0.24.6 在 UI/CLI 交互层仍有若干高优先级回归需要处理。  
代表 Issue：  
- [#12826](https://github.com/QwenLM/qwen-code/issues/12826)  
- [#12843](https://github.com/QwenLM/qwen-code/issues/12843)  
- [#12874](https://github.com/QwenLM/qwen-code/issues/12874)  
- [#12890](https://github.com/QwenLM/qwen-code/issues/12890)  

### 2. 企业网络环境下的代理支持不完整  
安装 native payload、遥测上传、NO_PROXY 解析、MCP reconnect 等路径均出现代理或绕过代理配置不一致的问题。  
代表 Issue/PR：  
- [#12829](https://github.com/QwenLM/qwen-code/issues/12829)  
- [#12820](https://github.com/QwenLM/qwen-code/issues/12820)  
- [#12852](https://github.com/QwenLM/qwen-code/issues/12852)  
- [#12857](https://github.com/QwenLM/qwen-code/pull/12857)  

### 3. 安全和隐私配置需要端到端一致  
aux-model selector 凭据泄露、usage statistics opt-out 未生效等问题都属于“配置表面显示已关闭，但底层路径未完全遵守”的风险。  
代表 Issue/PR：  
- [#12856](https://github.com/QwenLM/qwen-code/issues/12856)  
- [#12862](https://github.com/QwenLM/qwen-code/pull/12862)  
- [#12844](https://github.com/QwenLM/qwen-code/issues/12844)  
- [#12857](https://github.com/QwenLM/qwen-code/pull/12857)  

### 4. CI 与集成测试需要更强的抗抖动能力  
主分支 CI、nightly release、ACP integration、Node REPL timing test 等均出现或修复了稳定性问题。  
代表 Issue/PR：  
- [#12882](https://github.com/QwenLM/qwen-code/issues/12882)  
- [#12880](https://github.com/QwenLM/qwen-code/issues/12880)  
- [#12884](https://github.com/QwenLM/qwen-code/pull/12884)  
- [#12885](https://github.com/QwenLM/qwen-code/pull/12885)  

### 5. 工具调用 schema 的跨模型兼容性需加强  
Ollama 拒绝无参数工具、deferred `tool_call` schema 允许空 arguments 等问题显示，不同模型/Provider 对 function calling schema 的容忍度不同。  
代表 Issue/PR：  
- [#12878](https://github.com/QwenLM/qwen-code/issues/12878)  
- [#12879](https://github.com/QwenLM/qwen-code/pull/12879)  
- [#12889](https://github.com/QwenLM/qwen-code/issues/12889)  

---  

总体来看，今天的 Qwen Code 社区动态呈现出两条主线：一是围绕 v0.24.6 的实际使用问题快速修复；二是 Managed Agent、持久化会话、多 Agent 协作和本地/自定义模型兼容能力的持续建设。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报｜2026-09-28

## 1. 今日速览

过去 24 小时没有新版本发布，但维护者集中推进了一批稳定性、安全边界和 TUI 首次启动体验修复。社区反馈主要集中在 OpenRouter 计费、超大 prompt 执行、Provider 预设扩展以及工具调用审计能力等方向，其中部分问题已快速对应到修复 PR。

---

## 3. 社区热点 Issues

> 过去 24 小时内更新的 Issue 共 4 条，因此本节按实际数据列出 4 条重点 Issue。

### 1. Tsubasa Provider 预设支持请求  
- Issue：[#6695](https://github.com/Hmbown/Codewhale/issues/6695)  
- 状态：OPEN  
- 标签：enhancement, needs-triage  
- 重要性：用户希望通过现有 OpenAI-compatible transport 增加 Tsubasa provider descriptor，避免手动配置自定义 provider。  
- 社区反应：暂无评论与点赞，仍处于需求确认阶段。  
- 关注点：新模型 / 新服务商接入体验、Provider preset 管理。

### 2. OpenRouter 会话费用始终显示 “rate unavailable”  
- Issue：[#6690](https://github.com/Hmbown/Codewhale/issues/6690)  
- 状态：OPEN  
- 标签：bug, needs-triage  
- 重要性：影响 OpenRouter 用户的成本可见性。问题涉及 `~` alias ID 破坏 provider lake 刷新，以及主路径未正确使用 `custom_models` overrides。  
- 社区反应：暂无评论与点赞，但已被维护者快速响应，对应修复 PR 已关闭。  
- 关注点：计费准确性、OpenRouter 模型元数据刷新、custom model 覆盖逻辑。

### 3. `tool_call_after` 缺少实际执行命令回执  
- Issue：[#6689](https://github.com/Hmbown/Codewhale/issues/6689)  
- 状态：OPEN  
- 标签：needs-triage  
- 重要性：当前 hook 只能拿到截断结果、成功状态与退出码，无法可靠获知 admission / rewrite 后真正执行的 shell 命令。  
- 社区反应：暂无评论与点赞。  
- 关注点：工具调用审计、可观测性、安全合规、自动化日志。

### 4. `codewhale exec` 超大 prompt 因 argv 限制触发 E2BIG  
- Issue：[#6688](https://github.com/Hmbown/Codewhale/issues/6688)  
- 状态：OPEN  
- 标签：needs-triage  
- 重要性：`exec` 只能通过命令行参数传 prompt，超过 Linux 单参数约 128 KiB 限制时，程序尚未启动就失败。  
- 社区反应：暂无评论与点赞，但已有修复 PR #6692 关闭。  
- 关注点：CLI 可用性、大上下文输入、stdin / prompt file 支持。

---

## 4. 重要 PR 进展

### 1. 修复 TUI Provider 切换后的 missing-key 状态  
- PR：[#6696](https://github.com/Hmbown/Codewhale/pull/6696)  
- 状态：CLOSED  
- 内容：修复在 tmux 等环境中继承 `CODEWHALE_PROVIDER` / `CODEWHALE_MODEL` 后，切换到已有 key 的 route 时仍保留 missing-key 启动状态的问题。  
- 影响：改善首次启动和 Provider 切换体验，减少误判配置缺失。

### 2. 首次启动优先使用已配置 route  
- PR：[#6694](https://github.com/Hmbown/Codewhale/pull/6694)  
- 状态：CLOSED  
- 内容：修复 fresh home 下即便配置了 provider + key 或 endpoint + model，TUI 仍打开 provider picker 并高亮默认 DeepSeek 的问题。  
- 影响：提升配置驱动启动的一致性。

### 3. 保持 root default model 与所属 provider 的绑定  
- PR：[#6693](https://github.com/Hmbown/Codewhale/pull/6693)  
- 状态：CLOSED  
- 内容：修复 `default_text_model` 作为 active route fallback 时无法记录所属 provider，导致路由归属混乱的问题。  
- 影响：提高多 provider 配置下的模型解析可靠性。

### 4. `exec` 支持从 `--prompt-file` 或 stdin 读取 prompt  
- PR：[#6692](https://github.com/Hmbown/Codewhale/pull/6692)  
- 状态：CLOSED  
- 关联 Issue：[#6688](https://github.com/Hmbown/Codewhale/issues/6688)  
- 内容：新增 `--prompt-file <PATH>`，并支持从 stdin 输入 prompt，绕过 argv 大小限制。  
- 影响：显著增强批处理、大 prompt、自动化脚本场景的可用性。

### 5. 修复 OpenRouter 计费不可用  
- PR：[#6691](https://github.com/Hmbown/Codewhale/pull/6691)  
- 状态：CLOSED  
- 关联 Issue：[#6690](https://github.com/Hmbown/Codewhale/issues/6690)  
- 内容：避免 OpenRouter `/v1/models` 刷新因单条异常数据整体失败，并补强 declared rates / lake pricing 路径。  
- 影响：OpenRouter 会话费用可重新被正确估算，改善成本追踪体验。

### 6. 首次启动避免错误采用本地 Ollama  
- PR：[#6687](https://github.com/Hmbown/Codewhale/pull/6687)  
- 状态：OPEN  
- 内容：修复 fresh config 已指定 provider/model 时，若本地 Ollama 服务运行，TUI 错误切换到 Ollama 模型的问题。  
- 影响：避免本地服务自动发现覆盖用户显式配置。

### 7. Footer 中保留 thinking effort 标签  
- PR：[#6686](https://github.com/Hmbown/Codewhale/pull/6686)  
- 状态：OPEN  
- 内容：调整 80 列窄宽度下 footer route identity 的最小宽度，确保 `thinking: xhigh` 等 reasoning label 不被截断。  
- 影响：改善推理模型状态展示，尤其是窄终端用户体验。

### 8. 统一受限读取 anchors、notes 与 registry names  
- PR：[#6685](https://github.com/Hmbown/Codewhale/pull/6685)  
- 状态：OPEN  
- 内容：将 workspace-controlled 文件读取统一收敛到 no-follow、containment-checked 的 confined helper。  
- 影响：降低符号链接、目录逃逸等路径安全风险。

### 9. 为 RLM turn 增加 wall-clock 上限  
- PR：[#6684](https://github.com/Hmbown/Codewhale/pull/6684)  
- 状态：OPEN  
- 内容：RLM 循环原本无 wall-clock bound，可能因模型或 Python round 卡死而无限占用；现在复用 child wall-clock budget。  
- 影响：提升长时间任务稳定性，避免单 turn 无限挂起。

### 10. 加固 shell policy：解析失败时 fail closed  
- PR：[#6675](https://github.com/Hmbown/Codewhale/pull/6675)  
- 状态：OPEN  
- 内容：强化 `crates/execpolicy` 中的 shell 命令策略，对于只能运行时解析的变量、替换、glob、brace 等情况更保守处理，并收紧前缀匹配。  
- 影响：提高命令执行安全边界，减少策略绕过风险。

---

## 5. 功能需求趋势

### 1. Provider 与模型生态扩展
- 代表 Issue：[#6695](https://github.com/Hmbown/Codewhale/issues/6695)  
- 趋势：用户希望更多第三方模型服务能以 preset 形式开箱即用，而不是手动配置 endpoint、key name 与 model alias。  
- 说明：Provider descriptor 体系会成为提升模型接入体验的关键。

### 2. 成本可观测性与计费准确性
- 代表 Issue：[#6690](https://github.com/Hmbown/Codewhale/issues/6690)  
- 趋势：随着 OpenRouter 等聚合服务使用增加，用户越来越依赖 TUI 内部展示 token / cost 信息。  
- 说明：模型价格源刷新、异常数据容错、custom model pricing override 都是后续重点。

### 3. CLI 自动化与大上下文输入
- 代表 Issue：[#6688](https://github.com/Hmbown/Codewhale/issues/6688)  
- 趋势：开发者开始将 `codewhale exec` 集成进脚本、CI 或批处理流程，对 stdin、文件输入、大 prompt 支持提出要求。  
- 说明：CLI 不再只是交互入口，也在成为自动化 agent workflow 的执行层。

### 4. 工具调用审计与 Hook 可观测性
- 代表 Issue：[#6689](https://github.com/Hmbown/Codewhale/issues/6689)  
- 趋势：用户希望 hook 能拿到 admission 后的真实执行命令，而不仅是截断结果。  
- 说明：对于安全审计、企业合规、复现 agent 行为非常重要。

### 5. 安全边界与路径隔离
- 代表 PR：[#6685](https://github.com/Hmbown/Codewhale/pull/6685)、[#6675](https://github.com/Hmbown/Codewhale/pull/6675)、[#6678](https://github.com/Hmbown/Codewhale/pull/6678)  
- 趋势：维护者正在系统性加固 workspace 文件读取、shell 执行策略、路径 containment、MCP 工具权限等边界。  
- 说明：这是 AI coding 工具进入更复杂项目和团队环境后的必然需求。

---

## 6. 开发者关注点

1. **配置优先级必须可预测**  
   多个 PR 都围绕首次启动 route、provider/model 归属、Ollama 自动发现覆盖配置等问题展开，说明用户对“显式配置不应被自动探测覆盖”非常敏感。

2. **OpenRouter 等聚合 Provider 的兼容性仍需打磨**  
   当前问题不仅是模型调用，还包括 alias、价格刷新、异常模型数据容错、自定义模型价格等配套能力。

3. **CLI 需要适配真实工程输入规模**  
   argv 限制导致大 prompt 无法进入程序，暴露出命令行 agent 在自动化场景中的典型问题。`--prompt-file` 和 stdin 支持是必要演进。

4. **安全与审计成为核心议题**  
   今日大量 PR 聚焦 shell policy、路径 containment、MCP server 权限、workspace 文件读取、后台 shell 清理等，显示项目正在向更严格的 trust boundary 演进。

5. **TUI 细节体验仍在快速迭代**  
   Footer 标签截断、首次启动 provider picker、missing-key 状态残留等问题虽小，但直接影响开发者日常使用流畅度。

6. **Hook 与执行回执需要更完整的数据模型**  
   用户不仅关心工具是否成功，还关心“实际运行了什么”。这对调试、审计、复现和 agent 安全策略都很关键。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*