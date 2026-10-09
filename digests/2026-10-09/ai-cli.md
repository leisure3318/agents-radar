# AI CLI 工具社区动态日报 2026-10-09

> 生成时间: 2026-10-09 05:06 UTC | 覆盖工具: 9 个

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

# AI CLI 工具生态横向对比分析报告｜2026-10-09

## 1. 生态全景

当前 AI CLI 工具生态正在从“命令行聊天/代码助手”快速演进为 **可执行、可扩展、可治理的本地 Agent 平台**。  
社区反馈高度集中在 **安全边界、沙箱/权限、MCP/OAuth 集成、桌面端长会话、跨平台兼容、TUI 可观测性** 等生产级问题上。  
Claude Code、Codex、Copilot CLI、OpenCode、Qwen Code 等工具都在强化自动化执行能力，但同时也暴露出 agent 自动执行命令、会话恢复、权限确认、企业认证等方面的复杂性。  
整体来看，AI CLI 的竞争焦点已从“模型能力”转向 **工作流可靠性、生态集成、安全可控和企业环境适配**。

---

## 2. 各工具活跃度对比

> 说明：下表统计基于用户提供的日报摘要，Issues / PR 数为摘要中纳入重点观察的数量，不代表 GitHub 当日绝对总量。

| 工具 | 今日重点 Issues 数 | 今日重点 PR 数 | Release 情况 | 活跃度判断 |
|---|---:|---:|---|---|
| **Claude Code** | 10 | 0 | 发布 **v2.1.295** | 高，Issue 反馈集中，官方发布稳定 |
| **OpenAI Codex** | 10 | 10 | 发布 **rust-v0.162.0**，另有 0.163 alpha | 很高，Release / PR / Issue 同时活跃 |
| **Gemini CLI** | 7 | 4 | 无明确新 Release | 中高，安全相关讨论集中 |
| **GitHub Copilot CLI** | 10 | 1 | 发布 **v1.0.94 / v1.0.95 系列多个版本** | 高，发布密集，企业集成问题多 |
| **Kimi Code CLI** | 0 | 0 | 无 | 低，过去 24 小时无活动 |
| **OpenCode** | 10 | 10 | 无新 Release | 很高，V2 迁移与桌面端打磨活跃 |
| **Pi** | 10 | 10 | 无新 Release | 很高，SDK / Durable / MCP / Provider 修复活跃 |
| **Qwen Code** | 10 | 10 | 无新 Release，但发布流程有失败记录 | 很高，安全、多 Agent、Web Shell、打包链路活跃 |
| **DeepSeek TUI / Codewhale** | 10 | 10 | 无新 Release，0.10.2 发布阻塞活跃 | 很高，TUI、Provider、发布工程集中推进 |

### 活跃度结论

- **最活跃阵营**：OpenAI Codex、OpenCode、Pi、Qwen Code、DeepSeek TUI。  
- **发布节奏最密集**：GitHub Copilot CLI、OpenAI Codex、Claude Code。  
- **Issue 驱动最明显**：Claude Code、Gemini CLI。  
- **工程迭代最密集**：OpenCode、Pi、Qwen Code、DeepSeek TUI。  
- **当前无明显活动**：Kimi Code CLI。

---

## 3. 共同关注的功能方向

### 3.1 安全边界、权限与沙箱控制

多个工具都在处理 agent 自动执行带来的安全风险。

| 工具 | 具体诉求 |
|---|---|
| **Claude Code** | hooks 阻断语义、`onFailure: "block"`、auto mode 执行 `pkill -f` 误杀 GUI 应用 |
| **OpenAI Codex** | Windows 沙箱 Error 32、credential masking、沙箱凭据注入 |
| **Gemini CLI** | Untrusted Command Flags、shell wrapper 命令替换绕过、per-command sandbox 失效 |
| **Copilot CLI** | ACP 模式疑似忽略 sandbox、sandbox credential `injectHosts` |
| **OpenCode** | agent `deny browser` 失效、bash deny rule 绕过 |
| **Qwen Code** | daemon git worktree guard heredoc 绕过，已标记 P1 security |
| **DeepSeek TUI** | Windows shell 执行策略、网络策略即时生效、操作可停止 |

**判断**：  
AI CLI 正在进入“本地执行高权限命令”的阶段，安全模型已成为核心竞争力。未来工具需要提供可审计、可配置、可解释的权限体系，而不是简单的 yes/no 确认。

---

### 3.2 MCP / OAuth / Provider 生态兼容

MCP 已成为 AI CLI 接入外部工具、企业系统和 SaaS 服务的核心协议，但兼容性问题大量出现。

| 工具 | 具体诉求 |
|---|---|
| **Gemini CLI** | MCP OAuth 严格 RFC 9207 校验导致 Atlassian 等 Provider 阻塞 |
| **Copilot CLI** | MCP 重连循环、refresh token 轮换、Dataverse OAuth issuer mismatch |
| **OpenCode** | MCP JSON Schema union type 参数丢失、Chrome DevTools / WinDbg MCP 问题 |
| **Pi** | `mcp.json` 环境变量展开顺序、OAuth clientId/clientSecret、Basic 编码 |
| **Qwen Code** | Claude MCP 配置 UTF-8 BOM 导入失败 |
| **Claude Code** | hooks / plugins / sandbox 与 MCP 类似扩展场景有关 |
| **DeepSeek TUI** | Provider 登录、xAI OAuth、ChatGPT OAuth 参数问题 |

**判断**：  
MCP 正从“可选扩展协议”变成 AI CLI 的基础设施，但 OAuth、JSON Schema、transport 推断、token 生命周期仍是生态碎片化重灾区。

---

### 3.3 长任务、会话恢复与远程控制

AI coding agent 越来越多承担长时间任务，因此会话状态稳定性成为普遍痛点。

| 工具 | 具体诉求 |
|---|---|
| **Claude Code** | Desktop 自动更新后 Remote Control 未恢复 |
| **OpenAI Codex** | Conversation state not found、流式响应消失、远程压缩失败 |
| **OpenCode** | V1→V2 迁移丢失历史、legacy session 恢复、revert 误恢复整个 worktree |
| **Pi** | Durable 会话、attachable 子进程、`waitForIdle()` / `abort()` 生命周期语义 |
| **Qwen Code** | H4b child session、checkpoint continuation、foreground child wait recovery |
| **DeepSeek TUI** | Gemini 429 后自动重试、Operate 模式里程碑交回控制权 |

**判断**：  
“会话”正在从简单聊天上下文演变为包含文件状态、工具调用、子进程、远程任务和恢复点的复杂运行时对象。

---

### 3.4 TUI / Desktop / GUI 体验

CLI 工具并未停留在纯文本命令行，TUI、桌面端、Web Shell 都在快速发展。

| 工具 | 具体诉求 |
|---|---|
| **Claude Code** | `/usage` 残留字符、emoji 宽度、Windows 权限弹窗卡死 |
| **OpenAI Codex** | TUI leader shortcuts、hyperlink remapping panic、桌面端回复消失 |
| **Copilot CLI** | 启动阻塞、权限 UI、JSON 输出损坏、TUI 控件可读性 |
| **OpenCode** | Desktop 冷启动优化、长问题文本不可滚动、TUI Markdown 删除线 |
| **Pi** | pty read 分片泄漏到输入框、fullscreen repaint |
| **Qwen Code** | Web Shell artifact 下载、断线重连保留卡片、Shell preview ANSI/UTF-8 |
| **DeepSeek TUI** | shell run card 可检查/可停止、Terminal dock、Pet mode 主视图 |

**判断**：  
AI CLI 正在变成“Agent 控制台”，用户不仅要输入 prompt，还要观察进程、接管终端、管理 artifact、查看任务轨迹。

---

### 3.5 Windows / WSL / Linux Desktop 跨平台适配

跨平台问题在多个工具中都非常突出，尤其是 Windows 与 WSL。

| 工具 | 具体诉求 |
|---|---|
| **Claude Code** | Windows + VS Code hooks、Windows Terminal 权限 prompt、WSL2 Docker symlink |
| **OpenAI Codex** | Windows sandbox Error 32 / sharing violation / Crashpad |
| **Copilot CLI** | Windows WAM 登录崩溃、企业代理证书、macOS SecurityServer |
| **OpenCode** | Windows GUI 卡 Thinking、Desktop 跨平台体验 |
| **Pi** | WSL OAuth polling、Windows + NFS + HDD 边界 |
| **Qwen Code** | Windows browser-use Native Messaging、Linux AppImage ripgrep SIGSEGV |
| **DeepSeek TUI** | Windows shell 策略、workspace runtime 隔离 |

**判断**：  
Windows + WSL + 企业代理 + 桌面端是 AI CLI 工具最复杂的组合场景，也是未来企业落地必须补齐的基础能力。

---

## 4. 差异化定位分析

### Claude Code

**定位**：高集成度、官方主导、偏生产级 agent 执行工具。  
**功能侧重**：hooks、安全阻断、Remote Control、桌面端、插件 UI。  
**目标用户**：重度 Claude 用户、企业开发者、需要安全治理和远程控制的团队。  
**技术路线**：通过 hooks、permissions、desktop、terminal protocol 强化“可控 agent 执行”。  
**当前短板**：Windows / VS Code / WSL 兼容性、auto mode 命令安全、桌面端 session restore。

---

### OpenAI Codex

**定位**：面向本地与云端混合执行的 OpenAI coding agent 平台。  
**功能侧重**：worktree、Agent Command Center、Desktop、app-server、thread state、远程 code mode。  
**目标用户**：OpenAI 生态开发者、需要多会话/远程任务/桌面端体验的用户。  
**技术路线**：Rust CLI + Desktop + app-server + durable thread state，强调会话状态与远程路由。  
**当前短板**：Windows 沙箱稳定性、流式响应可靠性、容量/限流解释。

---

### Gemini CLI

**定位**：Google Gemini 生态下的安全优先型 CLI agent。  
**功能侧重**：YOLO mode、安全警告、sandbox、MCP OAuth、shell guard。  
**目标用户**：Gemini / Code Assist 用户、关注自动化执行与安全策略的开发者。  
**技术路线**：强化命令安全检测和沙箱策略，但仍在调整安全与自动化之间的平衡。  
**当前短板**：安全提示过于打断、MCP OAuth 兼容性、per-command sandbox 识别问题。

---

### GitHub Copilot CLI

**定位**：面向 GitHub / Microsoft 企业生态的 CLI agent。  
**功能侧重**：MCP、Entra / WAM、ACP session、sandbox credentials、企业代理证书。  
**目标用户**：GitHub Copilot 用户、企业开发者、Microsoft Entra / Dataverse / Dynamics 环境用户。  
**技术路线**：围绕 GitHub + Microsoft 身份体系和 MCP 生态做深度集成。  
**当前短板**：MCP 状态机、OAuth issuer 兼容、企业代理证书、ACP sandbox 一致性。

---

### Kimi Code CLI

**定位**：目前从本次数据看处于低活跃状态。  
**功能侧重**：无新增动态可判断。  
**目标用户**：Kimi / Moonshot 生态用户。  
**当前短板**：过去 24 小时无社区活动，生态活跃度暂弱。

---

### OpenCode

**定位**：快速演进的开源多模型 AI coding agent。  
**功能侧重**：V2 迁移、Desktop、TUI、MCP、Provider、多模型路由、权限系统。  
**目标用户**：开源社区、高度定制化用户、多模型使用者。  
**技术路线**：强调多 provider、多 UI 入口、插件/MCP 兼容和快速迭代。  
**当前短板**：V2 数据迁移可靠性、权限隔离、Desktop Windows 稳定性。

---

### Pi

**定位**：偏 SDK / 扩展运行时导向的 AI agent 框架型 CLI。  
**功能侧重**：Durable 会话、SDK 生命周期、MCP OAuth、扩展 API、Provider abstraction。  
**目标用户**：扩展开发者、SDK 集成者、需要嵌入式 agent runtime 的团队。  
**技术路线**：强化 session lifecycle、extension hook、provider 兼容和 durable store。  
**当前短板**：生命周期语义复杂、配置解析一致性、TUI 终端边界问题。

---

### Qwen Code

**定位**：面向多 Agent、Web Shell、Desktop 分发的快速迭代型 coding agent。  
**功能侧重**：daemon、git worktree guard、subagent、extension skills、Web Shell、Desktop packaging。  
**目标用户**：Qwen 生态用户、多 Agent 实验用户、需要 Web Shell / Desktop 的开发者。  
**技术路线**：推进多 Agent runtime、Web Shell 工作台、跨平台发行。  
**当前短板**：安全 guard、H4b session runtime、Windows browser-use、Linux 打包、CI 发布稳定性。

---

### DeepSeek TUI / Codewhale

**定位**：TUI-first 的 agent 控制台，强调终端操作体验和运行时控制。  
**功能侧重**：TUI 可观测性、Provider 登录、runtime store 隔离、发布工程、shell 操作控制。  
**目标用户**：终端重度用户、希望观察和接管 agent 执行过程的开发者。  
**技术路线**：以 TUI / runtime / provider 为核心，逐步补齐 IDE 嵌入和发布链路。  
**当前短板**：0.10.2 发布阻塞、Provider 登录稳定性、发布包体积与安全扫描自动化。

---

## 5. 社区热度与成熟度

### 社区热度分层

| 层级 | 工具 | 特征 |
|---|---|---|
| **高热度、高迭代** | OpenAI Codex、OpenCode、Pi、Qwen Code、DeepSeek TUI | Issue / PR 密集，底层架构和体验问题同时推进 |
| **高热度、官方发布稳定** | Claude Code、GitHub Copilot CLI | Release 频繁，社区反馈集中在生产级问题 |
| **中高热度、安全议题集中** | Gemini CLI | Issue 数不多，但讨论集中且指向安全/自动化冲突 |
| **低活跃** | Kimi Code CLI | 本周期无活动 |

### 成熟度判断

| 工具 | 成熟度判断 | 理由 |
|---|---|---|
| **Claude Code** | 较成熟 | 已有 hooks、desktop、remote control、plugins，但边界问题仍多 |
| **OpenAI Codex** | 快速成熟中 | Release / PR 密集，线程状态、路由、沙箱等基础设施快速补齐 |
| **Copilot CLI** | 企业化成熟中 | 与 Entra、MCP、ACP、sandbox 深度绑定，企业环境问题集中暴露 |
| **Gemini CLI** | 安全模型打磨期 | 安全能力增强明显，但用户体验仍需平衡 |
| **OpenCode** | V2 迁移关键期 | 活跃但迁移与数据可靠性问题突出 |
| **Pi** | 框架化深化期 | SDK / Durable / 扩展 API 诉求明显，适合深度集成场景 |
| **Qwen Code** | 架构扩张期 | 多 Agent、Web Shell、Desktop、daemon 同时推进，复杂度上升 |
| **DeepSeek TUI** | 发布稳定化阶段 | 0.10.2 前的 UX、Provider、发布工程修复密集 |
| **Kimi Code CLI** | 观察期 | 暂无足够活动数据判断成熟度变化 |

---

## 6. 值得关注的趋势信号

### 6.1 AI CLI 正在从“聊天工具”转向“本地 Agent Runtime”

今天多个项目都在处理 session、durable store、runtime store、child agent、worktree、artifact、terminal dock 等概念。  
这说明 AI CLI 的核心抽象正在变化：  
不再只是 prompt in / answer out，而是 **任务、状态、工具、权限、文件系统、进程和恢复点的综合运行时**。

**开发者参考价值**：  
选择工具时应关注其 session model、任务恢复能力和本地状态管理，而不仅是模型质量。

---

### 6.2 安全与自动化的矛盾成为主线

Claude Code 的 hook 阻断、Gemini CLI 的 YOLO mode 被安全警告打断、Qwen Code 的 heredoc guard 绕过、Copilot CLI 的 ACP sandbox 问题，都指向同一个矛盾：  
**用户希望 agent 自动执行，但又要求执行边界绝对可靠。**

**开发者参考价值**：  
在生产环境引入 AI CLI 时，应优先评估：

- 是否支持命令级权限策略；
- 是否支持 sandbox；
- 是否有审计日志；
- 是否能对高风险命令降级确认；
- hook / guard / permission 是否语义一致。

---

### 6.3 MCP 正在成为事实标准，但仍处于兼容性震荡期

几乎所有活跃工具都涉及 MCP 或类似扩展协议问题。  
OAuth issuer、RFC 9207 / 8414、JSON Schema union type、token rotation、transport 推断、server discovery 都在暴露生态不一致。

**开发者参考价值**：  
如果团队计划基于 MCP 扩展 AI CLI，应预留兼容层和诊断能力，尤其要测试：

- OAuth provider 差异；
- schema 中 nullable / union type；
- token refresh / rotation；
- 企业代理和证书；
- server 重连与恢复。

---

### 6.4 桌面端与 TUI 正在成为核心入口

Claude Code、Codex、OpenCode、Qwen Code、DeepSeek TUI 都在强化桌面端、Web Shell 或 TUI 控制台。  
这表明 AI CLI 并不意味着“只有命令行”，而是逐渐形成 **CLI + TUI + Desktop + Web Shell** 的多入口形态。

**开发者参考价值**：  
重度使用场景下，应关注工具是否提供：

- 长任务可视化；
- shell 进程可停止；
- artifact 管理；
- 会话恢复；
- 远程控制；
- 多窗口/多 workspace 支持。

---

### 6.5 Windows / WSL / 企业网络是落地难点

Windows 沙箱、WAM 登录、WSL Docker symlink、Native Messaging、企业代理证书、issuer mismatch 等问题大量出现。  
企业开发环境远比开源项目本地开发复杂，AI CLI 进入企业后会遇到身份、证书、代理、权限、EDR、安全策略等多重约束。

**开发者参考价值**：  
企业选型时，不能只在 macOS/Linux 个人环境验证，应覆盖：

- Windows Terminal；
- VS Code；
- WSL2；
- 企业代理；
- 自签 CA；
- Entra / SSO；
- 文件锁与杀毒软件干扰；
- MCP server 内网访问。

---

### 6.6 多模型 Provider 支持进入“细节兼容”阶段

OpenCode、Pi、DeepSeek TUI、Qwen Code 都在处理 Gemini、DashScope、OpenRouter、Vertex、LongCat、ChatGPT、xAI 等 provider 细节。  
问题不再是“能否接入 API”，而是：

- tool schema 是否兼容；
- enum 类型是否严格；
- quota 错误是否可重试；
- thinking 参数是否支持；
- model list 是否按权限过滤；
- 登录流程是否可恢复。

**开发者参考价值**：  
多模型 CLI 的价值在上升，但也要评估其 provider abstraction 是否足够成熟。

---

### 6.7 发布工程和供应链安全成为项目成熟度指标

Copilot CLI 的 checksum 校验、DeepSeek TUI 的 crates.io 10 MiB 限制、Qwen Code 的 Release CI 失败、OpenCode 的 V2 数据迁移问题，都说明 AI CLI 项目已经进入工程化深水区。

**开发者参考价值**：  
采用开源 AI CLI 时，应关注：

- Release 是否稳定；
- 安装脚本是否校验完整性；
- 迁移是否可回滚；
- CI 是否可靠；
- 数据目录是否有备份策略；
- 插件/扩展是否有权限边界。

---

## 总体结论

当前 AI CLI 工具生态已经进入 **agent runtime 竞争阶段**。  
Claude Code、Codex、Copilot CLI 更偏官方生态和生产级入口；OpenCode、Pi、Qwen Code、DeepSeek TUI 则在开源、扩展、TUI/Web Shell、多 Agent 方向快速推进。  
短期内最值得关注的共性问题是 **安全执行、MCP/OAuth 兼容、会话恢复、Windows/企业环境适配、TUI/桌面端可观测性**。  
对技术决策者而言，选型时不应只比较模型能力，而应重点评估工具在 **权限治理、长任务可靠性、扩展生态、跨平台稳定性和发布工程成熟度** 上的表现。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告  
数据截止：2026-10-09  
仓库：github.com/anthropics/skills

> 注：PR 列表声明为“按评论数排序”，但评论数字段显示为 `undefined`，因此以下以给定排序、Issue 评论热度、更新时间和议题关联综合判断社区关注度。

---

## 1. 热门 Skills 排行

### 1. `mcp-builder`：MCP v2 兼容与连接能力修复  
- **PR**：[#1742 fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers](https://github.com/anthropics/skills/pull/1742)  
- **状态**：Open  
- **功能/变更**：修复 `mcp>=2.0.0` 中 `streamable_http_client` 导入路径变化，并支持自定义 HTTP headers。  
- **社区讨论热点**：MCP 生态升级后，现有 Skill 连接真实 MCP Server 的兼容性、鉴权 headers、HTTP client 配置成为高频痛点。  
- **关联关注**：Issue [#1390](https://github.com/anthropics/skills/issues/1390) 也指出 `mcp-builder` evaluation 对真实 MCP Server 评分异常。

---

### 2. `skill-creator`：Skill 评估、触发率与跨平台稳定性  
- **PR**：[#1298 fix(skill-creator): isolate trigger evals and handle Windows and runtime failures](https://github.com/anthropics/skills/pull/1298)  
- **状态**：Open  
- **功能/变更**：隔离 trigger evals，修复 Windows 下 `select()`、并发 worker、runtime failure 被误判为 non-trigger 等问题。  
- **社区讨论热点**：Skill 是否能被正确触发、评估结果是否可信，是社区最关心的基础设施问题之一。  
- **关联 Issues**：  
  - [#556 run_eval.py 0% trigger rate](https://github.com/anthropics/skills/issues/556)  
  - [#1352 parallel workers false-negative trigger rates](https://github.com/anthropics/skills/issues/1352)  
  - [#1383 benchmark / Windows / shadowing issues](https://github.com/anthropics/skills/issues/1383)

---

### 3. `proofcore-contract-auditor`：智能合约审计与链上证明  
- **PR**：[#1771 feat(skills): add proofcore-contract-auditor for smart contract notarization](https://github.com/anthropics/skills/pull/1771)  
- **状态**：Open  
- **功能/变更**：新增面向 Web3 开发者的智能合约审计 Skill，支持 Solidity、Rust 静态分析，并将审计证明锚定到 TON Blockchain。  
- **社区讨论热点**：AI 代码审计、合约安全、审计结果可验证性，以及是否应将链上证明机制纳入 Skill 工作流。  
- **潜力判断**：属于垂直领域高价值 Skill，面向 Web3 安全和合规场景。

---

### 4. `docx`：Word 文档处理可靠性与批注/修订检测  
- **PR**：  
  - [#1734 Detect orphaned docx comments](https://github.com/anthropics/skills/pull/1734)  
  - [#1792 fix(docx): report LibreOffice timeout as an error and verify the output](https://github.com/anthropics/skills/pull/1792)  
- **状态**：Open  
- **功能/变更**：检测孤立 DOCX 批注；修复 LibreOffice 超时仍报告成功的问题，并校验输出文件中是否仍残留修订标记。  
- **社区讨论热点**：AI 生成/修改 Office 文档时，用户更关注“结果是否真实完成”“批注和修订是否干净”“自动化是否可靠”。  
- **潜力判断**：文档类 Skills 是官方仓库的核心方向之一，DOCX 质量控制需求持续稳定。

---

### 5. `md2video-audio`：Markdown 转视频与语音旁白  
- **PR**：[#1703 Add md2video-audio skill](https://github.com/anthropics/skills/pull/1703)  
- **状态**：Open  
- **功能/变更**：将 Markdown 文档编译为带人声旁白的 MP4 视频，结合 Marp 生成幻灯片并加入音频。  
- **社区讨论热点**：内容生产自动化、文档转演示视频、零成本生成课程/汇报材料。  
- **潜力判断**：契合“从文本到多媒体交付物”的强需求，适合教育、营销、技术文档场景。

---

### 6. `notion-spec-to-implementation` / `quantitative-resume-auditor`：工作流自动化与职业文档审核  
- **PR**：[#1245 Add notion-spec-to-implementation and quantitative-resume-auditor skills](https://github.com/anthropics/skills/pull/1245)  
- **状态**：Open  
- **功能/变更**：  
  - `notion-spec-to-implementation`：将 Notion 产品/技术规格转化为可执行任务、验收标准和进度追踪。  
  - `quantitative-resume-auditor`：量化审核简历质量。  
- **社区讨论热点**：从“文档/需求”直接进入“可执行任务”的自动化流程，以及个人生产力场景的标准化评估。  
- **潜力判断**：工作流编排类 Skill 具备广泛企业落地价值。

---

### 7. `pyxel`：复古游戏开发与可验证调试  
- **PR**：[#525 Add pyxel skill for retro game development](https://github.com/anthropics/skills/pull/525)  
- **状态**：Open  
- **功能/变更**：支持用 Python Pyxel 创建、调试和验证复古游戏，包括 headless 运行、输入驱动测试、帧检查和状态校验。  
- **社区讨论热点**：让 Claude 不只是生成代码，还能运行、观察、验证交互式程序。  
- **潜力判断**：虽是细分方向，但代表“可执行验证型 Skill”的趋势。

---

### 8. `AWT`：AI 驱动的端到端测试  
- **PR**：[#822 feat: add AWT AI-powered E2E testing skill](https://github.com/anthropics/skills/pull/822)  
- **状态**：Open  
- **功能/变更**：引入 AI Watch Tester，使 Claude 通过视觉和浏览器控制自动生成和运行 E2E 测试。  
- **社区讨论热点**：零代码测试生成、浏览器自动化、AI 观察页面状态并验证用户流程。  
- **潜力判断**：测试自动化是 Claude Code 的高频使用场景，具备较强落地空间。

---

## 2. 社区需求趋势

### 趋势一：Skill 安全与信任边界成为最高优先级  
- **代表 Issue**：[#492 Security: Community skills distributed under anthropic/ namespace enable trust boundary abuse](https://github.com/anthropics/skills/issues/492)  
- **关注点**：社区 Skill 以 `anthropic/` 命名空间分发，可能被误认为官方 Skill，造成权限信任边界混淆。  
- **需求方向**：Skill 签名、官方/社区命名空间隔离、权限提示、Marketplace 信任标识。

---

### 趋势二：组织级 Skill 分发与共享  
- **代表 Issue**：[#228 Enable org-wide skill sharing in Claude.ai](https://github.com/anthropics/skills/issues/228)  
- **关注点**：用户希望在组织内直接共享 Skill，而不是手动下载 `.skill` 文件再通过 Slack/Teams 分发。  
- **需求方向**：企业 Skill Library、组织级安装、分享链接、权限管理、版本控制。

---

### 趋势三：Skill 触发与评估体系需要更可靠  
- **代表 Issues**：  
  - [#556 run_eval.py 0% trigger rate](https://github.com/anthropics/skills/issues/556)  
  - [#1352 parallel workers false-negative trigger rates](https://github.com/anthropics/skills/issues/1352)  
  - [#1383 skill-creator benchmark and trigger issues](https://github.com/anthropics/skills/issues/1383)  
- **关注点**：Skill 的 trigger rate、benchmark、eval viewer、Windows 兼容性和并发测试结果不稳定。  
- **需求方向**：标准化评估框架、可靠触发测试、跨平台 eval 工具、可解释评分。

---

### 趋势四：代码审查、安全审计与治理类 Skills 增长  
- **代表 Issues/PRs**：  
  - [#412 agent-governance](https://github.com/anthropics/skills/issues/412)  
  - [#1771 proofcore-contract-auditor](https://github.com/anthropics/skills/pull/1771)  
  - [#1961 skill-creator eval viewer security hardening](https://github.com/anthropics/skills/pull/1961)  
- **关注点**：AI Agent 系统治理、合约安全、XSS/DNS rebinding/CSRF 等本地工具安全。  
- **需求方向**：安全审计 Skill、Agent Governance、供应链风险检测、权限与审计日志。

---

### 趋势五：文档与 Office 自动化仍是核心需求  
- **代表 PRs**：  
  - [#1734 Detect orphaned docx comments](https://github.com/anthropics/skills/pull/1734)  
  - [#1792 fix(docx): LibreOffice timeout and output verification](https://github.com/anthropics/skills/pull/1792)  
  - [#514 document-typography](https://github.com/anthropics/skills/pull/514)  
  - [#486 ODT skill](https://github.com/anthropics/skills/pull/486)  
- **关注点**：DOCX/ODT/PDF 的生成、转换、模板填充、排版质量、修订痕迹清理。  
- **需求方向**：企业文档自动化、格式验证、排版质量控制、跨格式转换。

---

### 趋势六：测试生成与可执行验证场景升温  
- **代表 PRs**：  
  - [#822 AWT E2E testing](https://github.com/anthropics/skills/pull/822)  
  - [#1980 webapp-testing shell=True security fix](https://github.com/anthropics/skills/pull/1980)  
  - [#525 pyxel skill](https://github.com/anthropics/skills/pull/525)  
- **关注点**：Claude 需要能运行、观察、验证，而不是只生成静态代码。  
- **需求方向**：浏览器 E2E 测试、游戏/GUI 自动化验证、headless execution、安全测试运行器。

---

## 3. 高潜力待合并 Skills

### `md2video-audio`  
- **PR**：[#1703](https://github.com/anthropics/skills/pull/1703)  
- **状态**：Open  
- **看点**：覆盖 Markdown → Slides → Voiceover → MP4 的完整内容生产链，面向教育、培训、汇报等高频场景。  
- **落地潜力**：高。

### `AWT`  
- **PR**：[#822](https://github.com/anthropics/skills/pull/822)  
- **状态**：Open  
- **看点**：AI 视觉 + 浏览器控制 + E2E 测试生成，是 Claude Code 自动化测试能力的重要补充。  
- **落地潜力**：高。

### `proofcore-contract-auditor`  
- **PR**：[#1771](https://github.com/anthropics/skills/pull/1771)  
- **状态**：Open  
- **看点**：结合智能合约静态分析与链上证明，适合 Web3 安全、审计和合规场景。  
- **落地潜力**：中高，垂直但价值明确。

### `notion-spec-to-implementation`  
- **PR**：[#1245](https://github.com/anthropics/skills/pull/1245)  
- **状态**：Open  
- **看点**：将 Notion 规格文档拆解为 Claude Code 可执行任务，连接产品管理与工程执行。  
- **落地潜力**：高，尤其适合团队工作流。

### `pyxel`  
- **PR**：[#525](https://github.com/anthropics/skills/pull/525)  
- **状态**：Open  
- **看点**：强调 headless 运行、帧检查和状态验证，代表可验证开发型 Skill。  
- **落地潜力**：中，技术模式值得复用。

### `ODT`  
- **PR**：[#486](https://github.com/anthropics/skills/pull/486)  
- **状态**：Open  
- **看点**：支持 OpenDocument 文档创建、模板填充、解析和转换，补足非 Microsoft Office 文档生态。  
- **落地潜力**：中高，适合政府、教育、开源办公场景。

### `document-typography`  
- **PR**：[#514](https://github.com/anthropics/skills/pull/514)  
- **状态**：Open  
- **看点**：关注孤行、寡行、编号错位等 AI 生成文档常见质量问题。  
- **落地潜力**：高，适合作为文档生成类 Skill 的质量层。

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：让 Skills 从“可用的提示词包”升级为“可信、可分发、可评估、可验证执行的企业级自动化组件”。**

---

# Claude Code 社区动态日报｜2026-10-09

## 1. 今日速览

过去 24 小时，Claude Code 发布了 **v2.1.295**，重点增强了 hooks 的失败阻断能力，并新增 Program Status Protocol 支持，体现出官方正在加强自动化流程的可控性与终端状态集成体验。  
社区反馈集中在 **hooks 安全语义、桌面端 Remote Control、Windows/VS Code 兼容性、TUI 渲染、权限交互与插件 UI** 等方向；今日无 Pull Request 更新。

---

## 2. 版本发布

### v2.1.295

链接：https://github.com/anthropics/claude-code/releases/tag/v2.1.295

主要更新：

- **Hooks 新增 `onFailure: "block"`**
  - 适用于 command 和 HTTP hooks。
  - 当 hook 无法启动、超时，或以非预期状态码退出时，可阻止后续动作继续执行。
  - 这对安全审计、权限拦截、企业合规工作流非常重要，尤其适合将 Claude Code 接入 CI、内部审批或安全策略系统。

- **新增 Program Status Protocol，OSC 7501 支持**
  - 支持该协议的终端可以显示 Claude Code 当前状态。
  - 有助于改善长任务、后台任务、agent 执行中的可观测性。

> 观察：本次发布与今日多个 hooks/security 相关 Issue 形成呼应，说明 Claude Code 正在把“AI agent 的可控执行”作为重点方向推进。

---

## 3. 社区热点 Issues

### 1. UserPromptSubmit hook 阻止提示词后，print mode 仍发送到模型 API

链接：https://github.com/anthropics/claude-code/issues/100695  
状态：Open  
标签：bug, has repro, platform:macos, area:security, area:hooks

该 Issue 指出：即使 `UserPromptSubmit` hook 返回阻止结果，提示词在 print mode 下仍可能被发送到模型 API。  
这属于 **安全边界与 hooks 语义一致性问题**，尤其影响企业用户用 hooks 做提示词审计、脱敏、合规拦截的场景。

社区反应：目前暂无评论，但报告包含复现步骤，优先级应较高。

---

### 2. Windows + VS Code 下 Bash 首次结果触发 CwdChanged，FileChanged 停止触发

链接：https://github.com/anthropics/claude-code/issues/100696  
状态：Open  
标签：bug, has repro, platform:windows, platform:vscode, area:hooks

该问题出现在 Windows VS Code 扩展环境中：路径盘符大小写从 `c:\` 变为 `C:\` 后触发 `CwdChanged`，随后 `FileChanged` 不再触发。  
这会影响依赖文件变更事件的自动化工具、插件和 agent 工作流。

社区反应：暂无评论，但 Windows + VS Code 是高频使用组合，值得关注。

---

### 3. 桌面端自动更新重启后，Remote Control 未重新绑定已有 Code 会话

链接：https://github.com/anthropics/claude-code/issues/100694  
状态：Open  
标签：bug, has repro, platform:macos, area:desktop

用户反馈 macOS 桌面端自动更新重启后，原本启用 Remote Control 的长时间 Code 会话没有恢复远程控制绑定。  
这会影响通过 claude.ai 或移动端远程跟踪本地 Claude Code 会话的用户。

社区反应：暂无评论，但与另一个类似问题 #100680 形成重复趋势，说明桌面端 session restore 逻辑存在稳定性隐患。

---

### 4. Desktop stealth update relaunch 不恢复 Remote Control

链接：https://github.com/anthropics/claude-code/issues/100680  
状态：Open  
标签：bug, platform:macos, area:desktop

该 Issue 与 #100694 高度相关，描述桌面端静默更新重启后，恢复的会话没有继续启用 Remote Control。  
对于长任务、远程监控和跨设备工作流而言，这是明显的体验断点。

社区反应：暂无评论，但多用户独立报告提高了问题可信度。

---

### 5. Auto mode 执行 `pkill -f "cat"` 导致 macOS 图形应用被误杀

链接：https://github.com/anthropics/claude-code/issues/100684  
状态：Open  
标签：bug, has repro, platform:macos, area:bash, area:permissions

用户报告 Claude Code 在 auto mode 中执行了意图终止单个 `cat` 进程的命令，但由于 `pkill -f` 进行子串匹配，命中了 `/Applications` 路径中的内容，导致多个 GUI 应用被终止。  
这是典型的 **agent 自动执行命令风险**，暴露出 shell 命令生成、权限确认和危险命令防护仍需加强。

社区反应：暂无评论，但影响严重，建议官方优先增强高风险 Bash 命令的上下文检查。

---

### 6. Windows 权限选择弹窗卡死，只能按 ESC 退出

链接：https://github.com/anthropics/claude-code/issues/100692  
状态：Open  
标签：bug, platform:windows, area:tui, area:permissions

用户反馈在 Windows Terminal 中，权限选择 prompt 出现后无法正常选择 accept 或 decline，只能通过 ESC 退出。  
这直接影响 Claude Code 的交互式权限模型，尤其在连接 Supabase 等外部工具时会阻断工作流。

社区反应：暂无评论，但权限 UI 是 agent 安全体验核心，值得关注。

---

### 7. 插件 AbovePrompt 区域在桌面端 split view 右侧面板不渲染

链接：https://github.com/anthropics/claude-code/issues/100686  
状态：Open  
标签：bug, has repro, platform:windows, area:plugins, area:desktop

用户报告在 Windows 桌面端 Code tab 的 split view 中，插件通过 `ui.render` 渲染的 AbovePrompt band 在右侧面板不显示。  
这影响插件作者构建上下文提示、状态栏、token 信息等 UI 扩展。

社区反应：暂无评论，但该问题与 Claude Code 插件生态成熟度相关。

---

### 8. WSL2 下 `claude plugin eval` 因 Docker Desktop symlink 拒绝 Bash 授权场景

链接：https://github.com/anthropics/claude-code/issues/100681  
状态：Open  
标签：bug, has repro, platform:wsl, area:plugins, area:sandbox

在 WSL2 + Docker Desktop 集成环境中，`~/.docker/contexts` symlink 触发 sandbox 预检查问题，导致 `claude plugin eval` 拒绝某些需要 Bash 授权的场景。  
该问题影响插件开发者在 WSL2 环境中测试与分发插件。

社区反应：暂无评论，但 WSL2 是 Windows 开发者高频环境，问题具备代表性。

---

### 9. Termux Android 中输入肤色 emoji 后 prompt/statusline 不同步

链接：https://github.com/anthropics/claude-code/issues/100687  
状态：Open  
标签：bug, has repro, platform:android, area:tui, area:agent-view

用户在 Termux Android 环境下使用 Claude Code agent 后台会话时，输入带肤色修饰符的 emoji 后出现 prompt/statusline 渲染错位。  
这类问题通常与 Unicode 宽度计算、终端 repaint、软键盘交互有关。

社区反应：暂无评论，但报告提及与既有 emoji/terminal 渲染问题相关，说明 TUI 跨终端兼容仍是长期挑战。

---

### 10. `/usage` 面板在终端高度不足时切换 day/week 视图残留字符

链接：https://github.com/anthropics/claude-code/issues/100671  
状态：Open  
标签：bug, has repro, platform:macos, area:tui

用户反馈当 `/usage` 面板高度超过终端高度时，在 day/week 视图之间切换会留下旧字符。  
虽然不是阻塞性问题，但影响使用量查看体验，也反映 TUI diff/clear 逻辑仍有边界问题。

社区反应：暂无评论，具备清晰复现条件。

---

## 4. 重要 PR 进展

过去 24 小时内无 Pull Request 更新。

链接：https://github.com/anthropics/claude-code/pulls

> 观察：今日社区活动主要集中在 Issues，尤其是 bug 复现与体验反馈；暂无公开 PR 可跟踪。

---

## 5. 功能需求趋势

### 1. Hooks 与安全拦截能力增强

相关链接：

- https://github.com/anthropics/claude-code/issues/100695
- https://github.com/anthropics/claude-code/issues/100696
- https://github.com/anthropics/claude-code/releases/tag/v2.1.295

社区正在关注 hooks 的可靠性、安全语义和执行一致性。  
v2.1.295 新增 `onFailure: "block"` 是积极信号，但用户也发现了 hook 阻止后仍可能进入模型 API 的边界问题。

趋势判断：  
Claude Code 的 hooks 体系正在从“扩展能力”演进为“安全与治理基础设施”。

---

### 2. 桌面端 Code tab 的会话恢复与 Remote Control 稳定性

相关链接：

- https://github.com/anthropics/claude-code/issues/100694
- https://github.com/anthropics/claude-code/issues/100680
- https://github.com/anthropics/claude-code/issues/100672

桌面端用户希望 Claude Code 能稳定恢复会话、路径、Remote Control 状态，并在多会话场景下更符合开发者直觉。  
自动更新后的会话恢复问题尤其影响长任务和远程控制体验。

趋势判断：  
桌面端正在成为核心入口，session lifecycle 管理会越来越关键。

---

### 3. Windows / VS Code / WSL 兼容性

相关链接：

- https://github.com/anthropics/claude-code/issues/100696
- https://github.com/anthropics/claude-code/issues/100692
- https://github.com/anthropics/claude-code/issues/100681
- https://github.com/anthropics/claude-code/issues/100686

今日多个问题集中在 Windows 生态：VS Code 扩展、Windows Terminal、WSL2、Docker Desktop、桌面端 split view。  
这些问题多与路径规范化、终端交互、sandbox、插件渲染有关。

趋势判断：  
Windows 开发体验仍是 Claude Code 需要持续打磨的重点，特别是 VS Code + WSL2 的组合。

---

### 4. 插件系统与 UI 扩展能力

相关链接：

- https://github.com/anthropics/claude-code/issues/100686
- https://github.com/anthropics/claude-code/issues/100690
- https://github.com/anthropics/claude-code/issues/100681

插件相关问题涉及 UI 渲染、Input 状态同步、sandbox 评估。  
这说明社区已经开始更深入地构建 Claude Code 插件，而不只是使用内置功能。

趋势判断：  
插件生态正在进入早期活跃阶段，稳定的 UI API、权限模型和跨平台一致性将决定开发者采用速度。

---

### 5. TUI 渲染与终端协议支持

相关链接：

- https://github.com/anthropics/claude-code/issues/100671
- https://github.com/anthropics/claude-code/issues/100687
- https://github.com/anthropics/claude-code/issues/100691
- https://github.com/anthropics/claude-code/releases/tag/v2.1.295

今日多个 TUI 问题涉及 iTerm2、Termux、Windows Terminal、usage 面板、emoji 宽度计算等。  
同时 v2.1.295 增加 OSC 7501 支持，说明官方也在加强终端协议层能力。

趋势判断：  
Claude Code 作为终端原生工具，跨终端一致性仍是体验核心。

---

## 6. 开发者关注点

### 1. 安全控制必须可预测

开发者正在用 hooks、permissions、sandbox 来约束 Claude Code 的行为。  
但如果 hook 阻止后仍发送到模型，或 auto mode 执行高风险 shell 命令，就会破坏信任边界。

代表 Issue：

- https://github.com/anthropics/claude-code/issues/100695
- https://github.com/anthropics/claude-code/issues/100684

---

### 2. Agent 自动执行命令需要更强防护

`pkill -f` 误杀 GUI 应用的案例说明，AI agent 在自动模式下生成 shell 命令时，仍需要更强的风险识别与确认机制。  
建议方向包括：

- 对 `pkill`, `rm`, `chmod`, `chown`, `killall` 等高风险命令增加提示。
- 展示命令影响范围。
- 在 auto mode 中对模糊匹配命令降级为确认模式。

代表 Issue：

- https://github.com/anthropics/claude-code/issues/100684

---

### 3. 桌面端用户需要稳定的长会话体验

Remote Control、自动更新、会话恢复、默认目录选择等问题，说明桌面端用户已经将 Claude Code 用于长时间、持续性的开发任务。  
一旦更新重启破坏远程控制或 session 状态，会明显影响工作流连续性。

代表 Issue：

- https://github.com/anthropics/claude-code/issues/100694
- https://github.com/anthropics/claude-code/issues/100680
- https://github.com/anthropics/claude-code/issues/100672

---

### 4. Windows 生态仍需系统性优化

Windows 用户反馈覆盖 VS Code、Windows Terminal、桌面端、WSL2 与 Docker Desktop。  
这些不是单点问题，而是跨平台抽象层的一组兼容性挑战。

代表 Issue：

- https://github.com/anthropics/claude-code/issues/100696
- https://github.com/anthropics/claude-code/issues/100692
- https://github.com/anthropics/claude-code/issues/100681
- https://github.com/anthropics/claude-code/issues/100686

---

### 5. 插件开发者需要更稳定的 UI 与沙箱行为

随着插件能力被更多用户尝试，Input 状态同步、AbovePrompt 渲染、plugin eval sandbox 等问题开始暴露。  
这表明插件 API 已进入真实使用阶段，接下来需要更完整的文档、测试矩阵和兼容性保障。

代表 Issue：

- https://github.com/anthropics/claude-code/issues/100690
- https://github.com/anthropics/claude-code/issues/100686
- https://github.com/anthropics/claude-code/issues/100681

---

## 总结

今日 Claude Code 的主线是：**安全可控的 agent 执行、桌面端长会话可靠性、跨平台 TUI/插件兼容性**。  
v2.1.295 在 hooks 失败阻断和终端状态协议上迈出一步，但社区反馈显示，hooks 安全语义、auto mode 命令风险、Remote Control 恢复、Windows/WSL 兼容性仍是近期最值得官方优先处理的方向。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报  
**日期：2026-10-09**  
**仓库：github.com/openai/codex**

---

## 1. 今日速览

今天 Codex 社区的主线集中在 **0.162.0 正式发布**、Windows 沙箱 Error 32 回归、桌面端会话/流式响应异常以及容量与限流体验问题。  
从 Issues 看，Windows Desktop 与沙箱初始化仍是最高频痛点；从 PR 看，团队正在强化 **线程读状态、会话路由、TUI 可用性、沙箱凭据与可观测性** 等底层能力。

---

## 2. 版本发布

### rust-v0.162.0  
链接：https://github.com/openai/codex/releases/tag/rust-v0.162.0

今日最重要的稳定版本是 **0.162.0**。已披露的更新重点包括：

- **托管 Git worktree 能力增强**  
  在启用 worktrees 功能后，可从受信任的本地项目创建和列出托管 Git worktrees。  
  相关 PR：[#50148](https://github.com/openai/codex/pull/50148)

- **Agent Command Center 任务置顶**  
  支持使用 `p` 键置顶任务，并在服务端支持时将任务保存在共享的 Pinned 分组中。  
  相关 PR：[#51500](https://github.com/openai/codex/pull/51500)

- **导航与复制体验改进**  
  Release 摘要显示本版还包含导航、复制等交互相关更新，但当前数据中描述被截断。

### rust-v0.163.0-alpha.1 / alpha.2  
链接：  
- https://github.com/openai/codex/releases/tag/rust-v0.163.0-alpha.1  
- https://github.com/openai/codex/releases/tag/rust-v0.163.0-alpha.2

0.163.0 alpha 线继续推进，但当前 Release 描述较简略，仅标记为 alpha 发布。适合关注前沿能力的开发者测试，生产环境建议优先跟踪 0.162.0 稳定线。

### rust-v0.162.0-alpha.17.2  
链接：https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.17.2

该版本为 0.162.0 前序 alpha 补丁线，当前数据未披露具体变更详情。

---

## 3. 社区热点 Issues

### 1. Windows 沙箱 Error 32：本地执行失败  
Issue：[#52391](https://github.com/openai/codex/issues/52391)  
状态：Open｜评论：2

用户在 Windows 10 环境下遇到本地执行阶段 ACL 校验失败，错误为 `error 32`。该问题重要性较高，因为它直接阻断 Codex Desktop 的本地任务执行能力，且与近期多个 Windows 沙箱回归报告相互印证。

---

### 2. Windows elevated sandbox 与 `node_repl.exe` 冲突  
Issue：[#52389](https://github.com/openai/codex/issues/52389)  
状态：Open｜评论：2

该问题报告称在启用 `windows.sandbox = "elevated"` 时，若 `node_repl.exe` 正在运行，沙箱设置会因 OS error 32 失败。它与浏览器控制、MCP、App Server 运行时均有关联，是当前 Windows 生态中最值得关注的底层兼容性问题之一。

---

### 3. Windows 更新后沙箱初始化 sharing violation  
Issue：[#52360](https://github.com/openai/codex/issues/52360)  
状态：Open｜评论：2

用户在 Windows Desktop 更新后遇到沙箱初始化失败，表现为 sharing violation / OS error 32。该问题与 #52391、#52389、#52404、#52365 等形成明显聚类，说明 Windows 文件句柄、运行时组件与沙箱 ACL 校验之间仍存在稳定性风险。

---

### 4. Windows 沙箱 Error 32 修复版本发布时间请求  
Issue：[#52409](https://github.com/openai/codex/issues/52409)  
状态：Open｜评论：1

社区用户请求确认 PR [#51822](https://github.com/openai/codex/pull/51822) 对 Windows 沙箱 Error 32 的修复何时进入 Desktop 发行版。该 Issue 的重要性在于，它反映了用户不仅关注修复本身，也关注 **修复从合并到客户端发布的可见时间线**。

---

### 5. Windows Desktop Crashpad 确认的主进程/浏览器进程崩溃  
Issue：[#52408](https://github.com/openai/codex/issues/52408)  
状态：Open｜评论：1

用户在 Windows 26.1002.7124.0 中报告 active requests 期间发生 Crashpad 记录的 browser/main-process 崩溃。该问题影响桌面端稳定性，尤其是在长任务和高交互场景下可能导致会话中断。

---

### 6. macOS 桌面端 HTTP 400 与远程压缩失败  
Issue：[#52406](https://github.com/openai/codex/issues/52406)  
状态：Open｜评论：1

用户在 macOS Desktop 中反复遇到 HTTP 400 `{"detail":"Bad Request"}`，且普通模型请求和 remote compaction 均可能失败。该问题值得关注，因为它涉及长上下文会话恢复能力，且压缩机制无法作为稳定恢复路径。

---

### 7. 流式连接断开并重试 sampling request  
Issue：[#52380](https://github.com/openai/codex/issues/52380)  
状态：Open｜评论：3

这是今日评论数最高的 Issue。用户报告 `stream disconnected - retrying sampling request`，说明 Codex 在模型流式响应阶段存在连接不稳定或重试体验问题。虽然点赞数不高，但评论活跃度显示该问题已引起社区排查兴趣。

---

### 8. 桌面端页面反复初始化 / Conversation state not found  
Issue：[#52373](https://github.com/openai/codex/issues/52373)  
状态：Open｜评论：2

用户报告主进程仍在运行，但 UI 在短时间内反复初始化并返回首页，同时日志出现 `Conversation state not found`。该问题可能指向前端状态恢复、会话目录、持久化存储或路由同步缺陷。

---

### 9. GPT-6 / Codex macOS Chat 模式最终响应消失  
Issue：[#52385](https://github.com/openai/codex/issues/52385)  
状态：Open｜评论：1

用户报告 GPT-6 在 macOS Chat 模式中流式输出完成后，最终回答立即消失。该问题与 #52403、#52398 等“回复空白 / 流式响应消失”报告高度相关，说明 Desktop UI 对流式完成态的处理仍需增强。

---

### 10. Pro 20x 频繁出现 “Selected model is at capacity”  
Issue：[#52397](https://github.com/openai/codex/issues/52397)  
状态：Open｜评论：1

用户在 Pro 20x 订阅下，尤其是并发 Codex sessions 时频繁遇到模型容量错误。该问题反映出高阶订阅用户对 **容量保障、并发策略、限流解释透明度** 的诉求正在上升。

---

## 4. 重要 PR 进展

### 1. 实验性 app-server 线程已读状态更新  
PR：[#52395](https://github.com/openai/codex/pull/52395)  
状态：Closed

新增 `thread/readState/update`，允许客户端在不覆盖未见结果或其他窗口显式标记的情况下，将线程标记为已读或未读。该能力对多窗口、多设备或长任务通知体验非常关键。

---

### 2. 线程已读状态变更通知  
PR：[#52384](https://github.com/openai/codex/pull/52384)  
状态：Closed

新增实验性 `thread/readState/changed` 通知。当线程终止活动更新 read state，或 revert 清除 unread 状态时，向订阅者广播变更。这是线程状态同步能力的重要补充。

---

### 3. app-server 暴露 durable thread read state  
PR：[#52350](https://github.com/openai/codex/pull/52350)  
状态：Closed

在 `thread/read` 和 `thread/list` 中暴露实验性 `readState` / `readStates`，面向 durable local user threads。该 PR 与 #52395、#52384 共同构成线程已读状态体系。

---

### 4. 增加带 revision 校验的 durable thread read state  
PR：[#52337](https://github.com/openai/codex/pull/52337)  
状态：Closed

引入 `thread_read_state` 持久化机制，并通过 revision 校验避免旧快照覆盖新未读结果。这对避免多客户端并发状态冲突非常重要。

---

### 5. 保留 gRPC code mode 的每会话路由  
PR：[#52381](https://github.com/openai/codex/pull/52381)  
状态：Closed

修复共享 transport 下，不同 session 可能被分配到不同 host 时的路由问题。通过捕获并复用 `x-code-mode-route` metadata，确保后续 RPC 到达持有该 session 状态的 host。该修复与远程执行和 code mode 稳定性直接相关。

---

### 6. 扩展 realtime v3 voice 支持  
PR：[#52363](https://github.com/openai/codex/pull/52363)  
状态：Closed

为 Realtime v3 增加独立 voice list，包含 v1 voices 以及 16 个新增 voice，并在 v3 请求中使用新列表校验。该 PR 扩大了实时语音能力的可选范围。

---

### 7. 终端 hyperlink remapping 前裁剪 wrapped source range  
PR：[#52330](https://github.com/openai/codex/pull/52330)  
状态：Closed

修复 wrapping 过程中 cursor sentinel 可能越过输入末尾，导致 hyperlink remapping 时 slice source text 发生 panic 的问题。这是一个面向 TUI/终端稳定性的低层修复。

---

### 8. 为代理沙箱会话增加可选凭据遮蔽  
PR：[#52302](https://github.com/openai/codex/pull/52302)  
状态：Closed

新增默认关闭的 `features.credential_masking`，允许通过已启用的 network proxy 进行 credential brokerage，同时保留自定义 credential providers 和 managed configuration 优先级。该能力与企业安全、沙箱隔离、受控凭据注入高度相关。

---

### 9. 自定义 OTLP metrics exporter 不再受 analytics 关闭影响  
PR：[#52278](https://github.com/openai/codex/pull/52278)  
状态：Closed

修复关闭 OpenAI analytics 时，也意外关闭用户自定义 OTLP metrics collector 的问题。现在用户可在禁用 OpenAI 分析的同时，将指标导出到自己的观测系统。

---

### 10. TUI 增加可配置持久 leader shortcuts  
PR：[#52273](https://github.com/openai/codex/pull/52273)  
状态：Closed

新增 `tui.keymap.global.leader`，默认 `ctrl-x`，支持 `leader c` 等符号化绑定。该功能提升了 TUI 的可配置性，适合重度 CLI 用户和定制化工作流。

---

## 5. 功能需求趋势

### 1. Windows 沙箱与本地执行稳定性  
相关 Issues：  
- [#52391](https://github.com/openai/codex/issues/52391)  
- [#52389](https://github.com/openai/codex/issues/52389)  
- [#52360](https://github.com/openai/codex/issues/52360)  
- [#52404](https://github.com/openai/codex/issues/52404)  
- [#52365](https://github.com/openai/codex/issues/52365)

Windows Error 32、`node_repl.exe` sharing violation、ACL validation failure 是今日最明显的热点。用户期待更可靠的沙箱初始化、进程占用诊断、自动恢复和明确的修复发布节奏。

### 2. 桌面端会话状态与流式响应可靠性  
相关 Issues：  
- [#52373](https://github.com/openai/codex/issues/52373)  
- [#52385](https://github.com/openai/codex/issues/52385)  
- [#52403](https://github.com/openai/codex/issues/52403)  
- [#52398](https://github.com/openai/codex/issues/52398)  
- [#52366](https://github.com/openai/codex/issues/52366)

多个用户反馈页面反复初始化、回答完成后消失、空白回复、Stop 无效、线程运行态无法结束。社区需求集中在更强的状态恢复、流式完成态一致性和会话生命周期管理。

### 3. 远程任务、Cloud/Dots 与多环境同步  
相关 Issues：  
- [#52410](https://github.com/openai/codex/issues/52410)  
- [#52374](https://github.com/openai/codex/issues/52374)  
- [#52370](https://github.com/openai/codex/issues/52370)

用户正在更多使用 SSH remote、Codex Cloud、Dots 等跨环境能力。问题集中在 thread id 冲突、远程删除后本地目录未同步、cloud task continuation 失败等方向。

### 4. 模型容量、限流与订阅权益透明度  
相关 Issues：  
- [#52397](https://github.com/openai/codex/issues/52397)  
- [#52394](https://github.com/openai/codex/issues/52394)  
- [#52405](https://github.com/openai/codex/issues/52405)  
- [#52382](https://github.com/openai/codex/issues/52382)

高阶订阅用户对容量与额度体验尤为敏感。常见诉求包括：并发会话容量保障、剩余额度与 capacity error 的解释一致性、后台任务不应继续消耗额度、用量与账单规则更透明。

### 5. 浏览器控制与 Computer Use 稳定性  
相关 Issues：  
- [#52377](https://github.com/openai/codex/issues/52377)  
- [#52407](https://github.com/openai/codex/issues/52407)  
- [#52388](https://github.com/openai/codex/issues/52388)

浏览器自动化和 Dots 场景中，用户遇到 trusted Node child 退出、CUA launcher 失败、OTP 授权流程不可控等问题。社区期待更可诊断的浏览器启动流程、更明确的授权恢复路径和更细粒度的权限授权。

---

## 6. 开发者关注点

### 1. Windows 本地执行仍是最大阻塞点  
今日多个高相关 Issue 都指向 Windows 沙箱初始化失败，特别是 OS error 32 / sharing violation。对依赖本地文件读写、浏览器控制和 MCP 的开发者来说，这类问题会直接导致 Codex 无法进入可用状态。

### 2. 长任务可靠性不足影响生产使用  
流式断开、server overloaded、任务显示完成但后台仍运行、Stop 无效等问题，都会削弱 Codex 作为长期 autonomous coding agent 的可信度。开发者希望看到更强的任务状态机、重试策略和可见的恢复机制。

### 3. UI 状态与底层 session 状态不一致  
回答消失、页面重新初始化、远程线程路由到 stale copy、线程删除后目录不更新等反馈，说明 Desktop/Web/App Server 之间仍存在状态同步边界问题。今日多项 read state PR 表明官方正在补齐线程状态基础设施。

### 4. 高阶用户关注容量、公平性与可解释性  
Pro / Pro 20x 用户对 “At Capacity” 与用量剩余之间的矛盾反应明显。未来需要更清晰地区分：订阅额度、模型实时容量、并发限制、后台任务消耗和服务端排队策略。

### 5. CLI/TUI 重度用户需要更可配置、更稳定的体验  
TUI leader shortcuts、footer 文本选择、clipboard 问题、终端 hyperlink panic 修复等都说明 CLI 仍是 Codex 的核心使用入口之一。社区需求不是单纯新增功能，而是更贴近开发者日常终端工作流的细节打磨。

---

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报  
**日期：2026-10-09**  
**仓库：google-gemini/gemini-cli**

## 1. 今日速览

过去 24 小时 Gemini CLI 社区讨论高度集中在**安全机制与开发效率之间的平衡**：新近引入的 “Untrusted Command Flags” 安全警告被多位用户反馈会破坏 YOLO mode，并频繁中断 MCP 场景下的基础文件操作。与此同时，安全相关问题仍在持续暴露与修复，包括 shell wrapper 命令替换绕过、sandbox per-command 规则失效、MCP OAuth RFC 9207 兼容性等。

PR 侧重点也明显偏向安全修复与执行流稳定性，其中 shell-utils 的命令替换防护已有修复 PR 跟进，A2A server 的工具调用拒绝隔离问题被标记为 P1。

---

## 2. 社区热点 Issues

> 过去 24 小时共更新 7 个 Issue，以下全部纳入关注。

### 1. Gemini CLI v0.63.0 破坏 YOLO mode  
- **Issue**：[#29682](https://github.com/google-gemini/gemini-cli/issues/29682)  
- **状态**：OPEN，`status/need-triage`  
- **作者**：nkolmykov-debug  
- **评论**：5  
- **重要性**：这是今日讨论度最高的 Issue。用户反馈 v0.63.0 中的 “Untrusted Command Flags” 安全警告会在 YOLO mode 下频繁触发，导致原本自动化执行体验被打断。  
- **社区反应**：已有 5 条评论，说明该问题影响到了实际工作流，尤其是依赖高自动化执行模式的用户。

### 2. MCP OAuth 严格 RFC 9207 校验阻塞部分 Provider  
- **Issue**：[#29681](https://github.com/google-gemini/gemini-cli/issues/29681)  
- **状态**：OPEN，`status/need-triage`, `area/security`  
- **作者**：ng-galien  
- **评论**：3  
- **重要性**：Gemini CLI 在 `/mcp auth <server>` 中严格要求 OAuth 2.0 RFC 9207 的 `iss` 支持，但部分服务商如 Atlassian 可能未完全支持，导致认证失败。  
- **社区反应**：用户提出 opt-in 配置方案，反映出企业 MCP 集成中对安全标准与兼容性的双重需求。

### 3. sessionModifiedBuildFiles 安全警告重复触发  
- **Issue**：[#29687](https://github.com/google-gemini/gemini-cli/issues/29687)  
- **状态**：OPEN，`status/need-triage`  
- **作者**：ng-galien  
- **评论**：1  
- **重要性**：当构建配置文件如 `package.json`、`pom.xml`、`build.gradle` 被修改后，CLI 会在运行构建命令前给出安全警告。但问题在于该警告没有被正确清除，导致每次构建命令都会重复提示。  
- **社区反应**：该问题与 #29682/#29680 类似，体现出安全提示过度持久化会显著影响开发体验。

### 4. Sandbox per-command 规则在 Linux/macOS 上不生效  
- **Issue**：[#29686](https://github.com/google-gemini/gemini-cli/issues/29686)  
- **状态**：OPEN，`status/need-triage`  
- **作者**：mteper-vetsource  
- **评论**：1  
- **重要性**：用户反馈启用 `security.toolSandboxing: true` 后，`sandbox.toml` 中针对具体命令的权限配置没有生效，因为命令名始终被识别为 `trap`。  
- **社区反应**：该问题直接影响沙箱策略的可用性，尤其是对 `gradlew`、构建工具、网络访问和路径白名单有精细控制需求的团队。

### 5. 请求支持 Gemini 4 Argon / Gemini 4 Pro  
- **Issue**：[#29689](https://github.com/google-gemini/gemini-cli/issues/29689)  
- **状态**：OPEN，`status/need-triage`, `area/agent`  
- **作者**：sdcb  
- **评论**：0  
- **重要性**：社区开始请求在 Gemini CLI 中正式支持 Gemini 4 Argon / Gemini 4 Pro，覆盖 Gemini Code Assist Enterprise / Standard OAuth 用户以及 API Key 用户。  
- **社区反应**：虽然暂无评论，但这是今日最明确的新模型支持诉求，反映企业用户对最新模型接入的期待。

### 6. shell-utils 中存在命令替换 Guard 绕过  
- **Issue**：[#29685](https://github.com/google-gemini/gemini-cli/issues/29685)  
- **状态**：OPEN，`status/need-triage`, `area/security`  
- **作者**：zainnadeem786  
- **评论**：0  
- **重要性**：该 Issue 指出 `packages/core/src/utils/shell-utils.ts` 中 `stripShellWrapper` 对 shell 参数的正则识别过于严格，可能被中间 shell flags 绕过，从而影响命令替换防护。  
- **社区反应**：虽然暂无讨论，但已有对应 PR 跟进，属于高优先级安全修复方向。

### 7. “Untrusted Command Flags” 警告严重影响 MCP + YOLO 工作流  
- **Issue**：[#29680](https://github.com/google-gemini/gemini-cli/issues/29680)  
- **状态**：OPEN，`status/need-triage`  
- **作者**：alexanderpino  
- **评论**：0  
- **重要性**：与 #29682 类似，该 Issue 明确指出新安全警告让 Gemini CLI 在 MCP server 使用场景下频繁中断，开发效率不如 Claude Code。  
- **社区反应**：虽然暂无评论，但该反馈与 #29682 形成呼应，说明问题并非孤例。

---

## 3. 重要 PR 进展

> 过去 24 小时共更新 4 个 PR，以下全部纳入关注。

### 1. 修复 shell wrapper flags 导致的命令替换防护绕过  
- **PR**：[#29688](https://github.com/google-gemini/gemini-cli/pull/29688)  
- **状态**：OPEN  
- **标签**：`area/security`, `size/m`  
- **作者**：zainnadeem786  
- **内容**：修复 `stripShellWrapper()` 在 POSIX shell wrapper 包含中间或链式 flags 时无法稳定识别的问题，防止 command substitution guard 被绕过。  
- **影响**：这是对 #29685 所描述安全问题的直接修复，有助于提升 shell 命令执行前的安全检测可靠性。

### 2. 加固 shell wrapper stripping 正则，防止中间 flag 绕过  
- **PR**：[#29684](https://github.com/google-gemini/gemini-cli/pull/29684)  
- **状态**：CLOSED  
- **标签**：`area/security`, `size/m`, `size/l`  
- **作者**：zainnadeem786  
- **内容**：同样围绕 `packages/core/src/utils/shell-utils.ts` 中的 `stripShellWrapper` 逻辑，试图增强正则以覆盖带有中间 flag 的 shell wrapper。  
- **影响**：该 PR 已关闭，可能被 #29688 替代或重构。说明维护者或贡献者正在迭代更合适的安全修复方案。

### 3. A2A server：将工具拒绝限制在当前 active call  
- **PR**：[#29683](https://github.com/google-gemini/gemini-cli/pull/29683)  
- **状态**：OPEN  
- **标签**：`priority/p1`, `size/l`  
- **作者**：jvargassanchez-dot  
- **内容**：当模型在 A2A server 流程中连续发出多个文件修改工具调用，例如 `write_file` 或 `replace`，拒绝其中一个文件修改时，之前可能影响整个批次。该 PR 将拒绝行为隔离到当前 active call。  
- **影响**：被标记为 P1，说明该问题对 A2A server 的交互正确性和用户确认流程影响较大。

### 4. ORVIA：采用跨项目执行工作流  
- **PR**：[#29679](https://github.com/google-gemini/gemini-cli/pull/29679)  
- **状态**：OPEN  
- **标签**：`priority/p1`, `size/s`  
- **作者**：rehmantraders550-lab  
- **内容**：标题显示该 PR 旨在引入或调整跨项目执行工作流，但描述内容仍较为空泛。  
- **影响**：尽管信息不足，但被标记为 P1，值得继续观察其后续补充说明、review 反馈和实现范围。

---

## 4. 功能需求趋势

### 1. 安全提示需要更细粒度的信任与豁免机制  
相关 Issue：  
- [#29682](https://github.com/google-gemini/gemini-cli/issues/29682)  
- [#29680](https://github.com/google-gemini/gemini-cli/issues/29680)  
- [#29687](https://github.com/google-gemini/gemini-cli/issues/29687)

社区正在集中反馈：安全警告本身有必要，但当前策略过于频繁，尤其在 YOLO mode、MCP server、构建命令等自动化场景中，会严重降低 CLI 的可用性。后续可能需要：
- 针对 YOLO mode 的信任策略；
- 对已确认风险的 session 级缓存；
- 对 MCP 来源参数的 allowlist；
- 对 build file 修改警告的单次确认或状态清除机制。

### 2. MCP 生态兼容性成为企业集成重点  
相关 Issue：  
- [#29681](https://github.com/google-gemini/gemini-cli/issues/29681)  
- [#29680](https://github.com/google-gemini/gemini-cli/issues/29680)

MCP 相关反馈主要集中在两个方向：OAuth 认证兼容性和 MCP server 驱动命令时触发的安全提示。随着企业用户接入 Atlassian 等外部系统，Gemini CLI 需要在标准合规与现实兼容之间提供更多配置空间。

### 3. 沙箱权限模型需要更可靠的命令识别  
相关 Issue：  
- [#29686](https://github.com/google-gemini/gemini-cli/issues/29686)

用户希望通过 `sandbox.toml` 为不同命令配置独立权限，例如允许 Gradle 访问 `~/.gradle` 或使用网络。但当前命令名被错误识别为 `trap`，导致 per-command 规则失效。这表明沙箱机制不仅需要安全，还需要足够可预测、可调试。

### 4. 新模型支持诉求开始出现  
相关 Issue：  
- [#29689](https://github.com/google-gemini/gemini-cli/issues/29689)

社区已经开始要求 Gemini CLI 支持 Gemini 4 Argon / Gemini 4 Pro，尤其是 Enterprise / Standard OAuth 用户和 API Key 用户。这类需求通常会影响：
- model ID 解析；
- Code Assist Enterprise 权限；
- API Key 模型可用性；
- 默认模型选择策略；
- 文档与错误提示。

---

## 5. 开发者关注点

### 1. “安全增强”正在与“无打断自动化”发生冲突  
今日最明显的痛点是：Gemini CLI 引入的安全机制正在频繁打断 YOLO mode。对于希望 CLI 自动执行文件操作、构建、测试、MCP 工具调用的开发者来说，过多确认会直接破坏自动化体验。

### 2. 企业 MCP 场景需要更强的兼容性开关  
严格执行 RFC 9207 虽然安全，但部分主流服务商未完整支持 `iss` 时会导致认证失败。开发者希望有 opt-in 或 per-provider 配置，而不是只能在安全合规和可用性之间二选一。

### 3. Shell 命令安全仍是高风险区域  
`shell-utils.ts` 相关 Issue 和 PR 表明，Gemini CLI 的 shell wrapper 解析、防命令替换、防注入逻辑仍在快速加固中。由于 CLI 天然会执行本地命令，这类修复对安全边界非常关键。

### 4. 沙箱规则需要更透明、更可验证  
当用户配置了 per-command sandbox 策略，却因为内部命令识别问题完全不生效时，会削弱对安全模型的信任。后续可能需要更好的 debug 输出，例如显示实际匹配到的 command key、应用的规则和被拒绝原因。

### 5. 用户期待更快接入最新 Gemini 模型  
Gemini 4 Argon / Gemini 4 Pro 支持请求说明，CLI 用户，尤其是企业用户，希望 Gemini CLI 能快速跟进最新模型能力，而不是只依赖底层 API 或外部配置绕行。

---

## 总结

今日 Gemini CLI 社区的主线非常清晰：**安全能力正在增强，但需要更好的产品化落地**。开发者并不反对安全警告、OAuth 校验或沙箱限制，但希望它们具备更细粒度的配置、更少重复打扰，以及对 MCP、YOLO mode、企业 OAuth、新模型等真实工作流的良好兼容。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报  
**日期：2026-10-09**  
**仓库：github.com/github/copilot-cli**

## 1. 今日速览

过去 24 小时 Copilot CLI 发布节奏密集，连续推出 `v1.0.95-*` 与 `v1.0.94-*` 多个版本，重点围绕 **MCP 稳定性、认证体验、ACP 上下文与沙箱配置** 进行修复和增强。  
社区反馈集中在 **MCP 连接/认证、沙箱安全边界、证书与代理兼容性、启动体验、权限交互 UX** 等方向，显示 Copilot CLI 正在从“可用”走向更复杂企业与多工具环境下的“可靠可控”。

---

## 2. 版本发布

### v1.0.95-2  
链接：<https://github.com/github/copilot-cli/releases/tag/v1.0.95-2>

**修复**
- `copilot config` 现在支持 sandbox credential 的 `injectHosts` keys。
- Bash、Zsh、Fish 补全也支持相关 key completion。

**影响**
- 对启用沙箱凭据注入的用户更友好，尤其适用于受控网络、企业代理或分层凭据注入场景。

---

### v1.0.95-1  
链接：<https://github.com/github/copilot-cli/releases/tag/v1.0.95-1>

**新增**
- macOS 上可用时使用原生 Microsoft Entra broker authentication。
- 不可用时回退到浏览器认证。

**影响**
- 改善 macOS 企业身份认证体验。
- 对依赖 Entra ID、MCP 远程服务或企业单点登录的用户较重要。

---

### v1.0.95-0  
链接：<https://github.com/github/copilot-cli/releases/tag/v1.0.95-0>

**改进**
- Managed plugin setup 不再在每次消息失败时重试，而是改为每小时或策略变更后重试。

**修复**
- `--context` 现在会正确应用到新建和恢复的 ACP sessions，不再静默使用默认或历史保存的 context tier。

**影响**
- 降低插件失败时的重复重试噪音。
- 修复 ACP session 上下文不一致问题，对依赖不同上下文层级的开发者较关键。

---

### v1.0.94  
链接：<https://github.com/github/copilot-cli/releases/tag/v1.0.94>

**新增 / 改进 / 修复**
- 新增 Claude Haiku 5.5 到模型选择与 `--model` 补全。
- `copilot mcp add` 在 MCP 配置初始化中断后可干净恢复。
- MCP enable/disable 可在 server discovery 前工作，且不会启动 MCP servers。
- Assisted permissions 会把可见 shell code 发送给 permission judge，减少不必要的手动批准。

**影响**
- 模型选择继续扩展。
- MCP 生命周期管理和权限审批体验均有改善。

---

### v1.0.94-5  
链接：<https://github.com/github/copilot-cli/releases/tag/v1.0.94-5>

**修复**
- `copilot mcp add` 在 MCP 配置初始化被中断后可以正常恢复。

---

### v1.0.94-4  
链接：<https://github.com/github/copilot-cli/releases/tag/v1.0.94-4>

**修复**
- MCP enable/disable 可在 server discovery 前生效，无需启动 MCP servers。
- Assisted permissions 改进 shell code 传递逻辑，减少不必要的人工批准。

---

## 3. 社区热点 Issues

### 1. MCP 已连接仍反复重连，导致 prompt 全部排队  
Issue：[#5091](https://github.com/github/copilot-cli/issues/5091)  
状态：Open / triage  
作者：subbucse  
评论：1 / 👍 0

**问题概述**  
用户反馈某个 session 中所有 prompt 都被 queued，CLI 持续尝试重连已经连接的 MCP。退出并恢复 session 后问题仍然存在。

**为什么重要**  
这类问题直接影响 Copilot CLI 的核心交互能力：用户输入无法执行，session 恢复也无法绕过故障。它也暴露了 MCP connection state 管理可能存在状态机不一致问题。

**社区反应**  
已有 1 条评论，说明问题开始被关注。虽然点赞数不高，但其严重程度较高，值得优先排查。

---

### 2. Copilot 在新 MCP 协议下发送 `ping`，且复用 rotated refresh tokens  
Issue：[#5079](https://github.com/github/copilot-cli/issues/5079)  
状态：Open / triage  
作者：chinmaymjog  
评论：1 / 👍 1

**问题概述**  
用户指出 Copilot CLI / Desktop app 的 MCP session 在协商 2026-07-28 协议后仍发送 `ping`，并且存在复用已轮换 refresh token 的问题。

**为什么重要**  
这涉及 MCP 协议兼容性与 OAuth token 生命周期管理。若处理不当，可能导致 MCP 服务端兼容失败、认证异常，甚至引发安全边界问题。

**社区反应**  
已有 1 个点赞和 1 条评论，是今日较有技术深度的问题之一。

---

### 3. Secret redaction 导致 JSON 输出损坏  
Issue：[#5092](https://github.com/github/copilot-cli/issues/5092)  
状态：Open / triage  
作者：dalemyers  
评论：0 / 👍 0

**问题概述**  
当 tool result 中包含类似 `self.authorization_prefix = "Bearer "` 的无害源码文本时，`--output-format json` 可能输出非法 JSON。原因疑似为事件序列化后又进行了纯文本 secret filter 处理。

**为什么重要**  
这会影响自动化集成、日志处理、CI 管道和结构化消费场景。对于把 Copilot CLI 作为机器可读 agent 工具链一部分的用户，JSON 输出稳定性是基础能力。

**社区反应**  
暂无评论和点赞，但问题定位较清晰，工程影响较大。

---

### 4. ACP 模式忽略 `--sandbox` 和 `sandbox.enabled`，shell 命令未被沙箱化  
Issue：[#5089](https://github.com/github/copilot-cli/issues/5089)  
状态：Open / triage  
作者：JereStay-MSFT  
评论：0 / 👍 0

**问题概述**  
用户反馈在 `copilot --acp` 模式下，即便启用 `--sandbox --experimental` 且配置了 `sandbox.enabled: true`、`allowBypass: false`，shell 命令仍然未被沙箱约束。

**为什么重要**  
这是安全边界相关问题。若 ACP 模式绕过 sandbox，会影响企业环境中对文件系统访问、命令执行和策略约束的信任基础。

**社区反应**  
暂无评论，但安全影响明显，属于高优先级风险类反馈。

---

### 5. Windows 首次 Entra WAM 登录 MCP server 时崩溃  
Issue：[#5088](https://github.com/github/copilot-cli/issues/5088)  
状态：Open / triage  
作者：dcallahanmth  
评论：0 / 👍 0

**问题概述**  
Windows 上首次使用 Microsoft Entra account broker / WAM 登录远程 MCP server 时，CLI 进程在 `msalruntime.dll` 中发生 `0xc0000005` access violation。

**为什么重要**  
这影响 Windows 企业用户使用 Entra 认证的 MCP server。崩溃级问题比普通认证失败更严重，可能阻塞组织级采用。

**社区反应**  
暂无评论，但与新版 Entra broker authentication 方向高度相关，应关注后续修复。

---

### 6. 启动体验差：MCP、plugins 加载阻塞用户输入  
Issue：[#5090](https://github.com/github/copilot-cli/issues/5090)  
状态：Open / triage  
作者：glutio  
评论：0 / 👍 0

**问题概述**  
用户认为 CLI 启动时加载 MCP、plugins 等过程阻塞工作流，尤其在大型仓库和多工具环境下体验较差，希望这些初始化过程异步化。

**为什么重要**  
这是典型的开发者体验问题。随着 MCP server 和插件数量增加，启动耗时会成为高频痛点。

**社区反应**  
暂无评论，但该问题代表了复杂工作区下的性能与交互需求。

---

### 7. macOS 1.0.93 回归：sandbox 下原生 HTTPS 请求因证书格式失败  
Issue：[#5085](https://github.com/github/copilot-cli/issues/5085)  
状态：Open / triage  
作者：polarctos  
评论：0 / 👍 0

**问题概述**  
从 1.0.93 开始，Copilot CLI 在 macOS sandbox 中若无法访问 `com.apple.SecurityServer`，原生 HTTPS 请求会因 `bad certificate format` 失败。

**为什么重要**  
这影响使用沙箱工具运行 Copilot CLI 的开发者，也提示近期网络栈或证书处理逻辑存在兼容性回归。

**社区反应**  
暂无评论，但问题描述具体，便于定位。

---

### 8. 企业代理 / 证书场景下 AI model 请求失败：UnknownIssuer  
Issue：[#5081](https://github.com/github/copilot-cli/issues/5081)  
状态：Open / triage  
作者：boeschenstein  
评论：0 / 👍 0

**问题概述**  
CLI 和 app 初期可部分工作，但数分钟后请求 AI model 失败，错误为 proxy tunnel failed / invalid peer certificate / UnknownIssuer。

**为什么重要**  
证书链、代理和企业网络兼容性是 Copilot CLI 在企业内落地的关键条件。此类问题会造成使用中断且不易自助恢复。

**社区反应**  
暂无评论，但与 #5085 一起反映出证书和原生 HTTP 请求路径近期值得关注。

---

### 9. MCP OAuth：Dataverse MCP 因 RFC 8414 issuer 校验失败  
Issue：[#5082](https://github.com/github/copilot-cli/issues/5082)  
状态：Open / triage  
作者：kermaperuna  
评论：0 / 👍 0

**问题概述**  
连接 Dataverse / Dynamics 365 MCP server 时，因 `login.windows.net` 与 `login.microsoftonline.com` issuer 不匹配而被 RFC 8414 issuer check 拒绝。

**为什么重要**  
这是企业 SaaS MCP 集成中的典型 OAuth 兼容问题。严格标准校验与现实身份提供方行为之间需要更细致的兼容策略。

**社区反应**  
暂无评论，但对 Microsoft 生态 MCP 集成非常关键。

---

### 10. 希望跨 session 记住权限批准  
Issue：[#5083](https://github.com/github/copilot-cli/issues/5083)  
状态：Open / triage  
作者：ChristoferTiselius  
评论：0 / 👍 0

**问题概述**  
用户希望 Copilot CLI 的权限批准不仅限于当前 session，而是可选择在当前仓库或全局范围记住。

**为什么重要**  
权限确认是 agent 工具的安全关键点，但重复审批会影响效率。该需求反映了用户希望在安全和便利之间获得更精细的控制。

**社区反应**  
暂无评论，但与近期 assisted permissions 改进方向一致。

---

## 4. 重要 PR 进展

过去 24 小时数据中仅有 1 条 PR 更新。

### 1. 安装脚本校验：确保 checksum 条目匹配实际下载 tarball  
PR：[#5093](https://github.com/github/copilot-cli/pull/5093)  
状态：Open  
作者：hobostay  
评论：未提供 / 👍 0

**问题背景**  
安装脚本当前使用：

```sh
sha256sum -c --ignore-missing SHA256SUMS.txt
```

在某些情况下可能出现“校验成功但并未真正校验下载 tarball”的问题。

**修复方向**  
该 PR 旨在确保 checksum verification 针对下载的 tarball 找到并验证对应条目，避免空验证或错误匹配。

**为什么重要**  
这是供应链安全相关改进。安装脚本的 checksum 校验是用户信任二进制分发的关键环节，尤其适用于自动化安装、CI/CD 和企业镜像环境。

**社区反应**  
当前暂无明显社区互动，但从安全意义看优先级较高。

---

## 5. 功能需求趋势

### 1. MCP 稳定性与生命周期管理  
相关 Issues：  
- [#5091](https://github.com/github/copilot-cli/issues/5091)  
- [#5079](https://github.com/github/copilot-cli/issues/5079)  
- [#5082](https://github.com/github/copilot-cli/issues/5082)  
- [#5086](https://github.com/github/copilot-cli/issues/5086)

MCP 是今日最集中的反馈方向，问题覆盖连接重试、协议兼容、OAuth issuer 校验、remote session steering 等。社区对 MCP 的期待已经从“能连接”升级到“状态一致、认证稳健、远程可控”。

---

### 2. 企业认证与证书兼容性  
相关 Issues：  
- [#5088](https://github.com/github/copilot-cli/issues/5088)  
- [#5085](https://github.com/github/copilot-cli/issues/5085)  
- [#5081](https://github.com/github/copilot-cli/issues/5081)  
- [#5082](https://github.com/github/copilot-cli/issues/5082)

Entra、WAM、OAuth、代理证书、macOS SecurityServer 等问题频繁出现。随着 Copilot CLI 进入企业开发环境，身份认证和证书链处理成为关键稳定性指标。

---

### 3. 沙箱与权限控制  
相关 Issues：  
- [#5089](https://github.com/github/copilot-cli/issues/5089)  
- [#5083](https://github.com/github/copilot-cli/issues/5083)  
- Release [v1.0.95-2](https://github.com/github/copilot-cli/releases/tag/v1.0.95-2)

用户既要求更强的沙箱隔离，也希望权限审批能被合理记忆。趋势是：Copilot CLI 需要提供更细粒度、可审计、可配置的安全策略。

---

### 4. CLI 启动与交互体验  
相关 Issues：  
- [#5090](https://github.com/github/copilot-cli/issues/5090)  
- [#5087](https://github.com/github/copilot-cli/issues/5087)  
- [#5084](https://github.com/github/copilot-cli/issues/5084)  
- [#5078](https://github.com/github/copilot-cli/issues/5078)

社区关注点包括启动时阻塞、单选/多选视觉区分、ask_user markdown 渲染、等待用户反馈时的 tab 状态提示。这说明 Copilot CLI 的 TUI/交互细节正在成为影响日常效率的重要因素。

---

### 5. 自动化与机器可读输出  
相关 Issues：  
- [#5092](https://github.com/github/copilot-cli/issues/5092)

`--output-format json` 被 secret redaction 破坏说明 Copilot CLI 已被部分用户用于自动化流水线或程序化消费。结构化输出的稳定性将越来越重要。

---

### 6. 安装、升级与版本清理  
相关 Issues / PR：  
- [#5077](https://github.com/github/copilot-cli/issues/5077)  
- [#5093](https://github.com/github/copilot-cli/pull/5093)

用户希望自动清理旧版本，同时社区也在推动安装脚本 checksum 校验更可靠。分发链路的安全性与可维护性正在受到更多关注。

---

## 6. 开发者关注点

### 1. MCP 相关问题已经成为最高频痛点  
今日多个 issue 都与 MCP 相关，包括连接状态、重连循环、OAuth、协议行为、server discovery、remote session steering。对开发者而言，MCP 是 Copilot CLI 扩展能力的核心，但当前稳定性仍是主要挑战。

### 2. 企业环境兼容性仍需加强  
Windows WAM 崩溃、macOS sandbox 证书失败、代理证书 UnknownIssuer、Dataverse OAuth issuer mismatch，都说明 Copilot CLI 在企业网络与身份环境中仍面临复杂兼容问题。

### 3. 安全边界和权限策略需要更明确  
ACP 模式疑似绕过 sandbox 是严重信号。另一方面，用户希望权限批准可跨 session 记忆，说明安全策略需要兼顾可控性和低摩擦体验。

### 4. 启动性能和异步初始化需求增强  
随着 MCP 和插件生态扩展，启动时同步加载会成为明显瓶颈。用户希望 CLI 能先进入可用状态，再后台加载 MCP、plugins 等资源。

### 5. TUI 细节影响实际生产力  
单选/多选控件难区分、ask_user 不渲染 markdown、多 tab 下无法判断是否等待反馈，这些看似细节的问题，会在长时间使用中显著影响开发者体验。

### 6. 结构化输出和安装链路正在进入生产级要求  
JSON 输出不能被 redaction 破坏，安装 checksum 不能出现空验证。社区已经开始从“交互式使用”转向“脚本化、自动化、可审计使用”。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报｜2026-10-09

## 1. 今日速览

过去 24 小时 OpenCode 社区活跃度较高，重点集中在 **V2 迁移稳定性、Desktop/TUI 体验、MCP/Provider 兼容性、权限与安全边界** 等方向。  
虽然今日没有新 Release，但有多项修复型 PR 已关闭，尤其是桌面端启动性能、剪贴板/任务提示格式、Vertex/Mistral 支持、文件监听器开关等，显示团队正在快速打磨 V2 体验。

---

## 3. 社区热点 Issues

### 1. V1→V2 迁移丢失历史消息，高优先级  
Issue: [#53971](https://github.com/anomalyco/opencode/issues/53971)  
状态：Open，已复现，severity: high，评论 3

该问题会导致旧版本会话迁移到 V2 后历史消息为空，影响用户对历史上下文和长期项目记录的信任。  
由于涉及数据迁移与兼容性，是 V2 推广过程中的关键阻塞点。

---

### 2. 回滚消息会恢复整个 worktree，误删其他会话未提交改动  
Issue: [#54026](https://github.com/anomalyco/opencode/issues/54026)  
状态：Open，已复现，severity: high，评论 1

这是一个高风险数据安全问题：用户在一个会话中执行 revert，可能会覆盖其他会话产生的未提交改动。  
对于多会话并行开发、AI agent 自动修改代码的场景影响较大，社区应重点关注其修复进展。

---

### 3. 项目 ID 含 NUL 字节导致项目无法解析、TUI 无法选择模型  
Issue: [#53991](https://github.com/anomalyco/opencode/issues/53991)  
状态：Open，已复现，评论 4  
相关 PR: [#54030](https://github.com/anomalyco/opencode/pull/54030)

异常缓存的 project ID 会使 `Project.fromDirectory` 报错，进一步阻断目录解析和 TUI 模型选择。  
该问题已出现对应修复 PR，说明维护者已开始处理项目身份恢复与缓存容错。

---

### 4. LongCat 2.5 Preview Free 请求失败：Endpoint unavailable  
Issue: [#53978](https://github.com/anomalyco/opencode/issues/53978)  
状态：Open，pending close / triaging，评论 5

这是今日评论数最高的 Issue，反映用户在 OpenCode Go 订阅下使用 LongCat 2.5 Preview Free 时遇到上游端点不可用。  
该类问题可能涉及模型供应商可用性、订阅权限、区域或路由配置，属于用户感知强烈的服务稳定性问题。

---

### 5. Desktop 长问题文本不可滚动，回答按钮不可达  
Issue: [#54035](https://github.com/anomalyco/opencode/issues/54035)  
状态：Open，评论 2

桌面端问题面板在长 Markdown 文本下无法滚动，导致提交/关闭按钮被挤出可视区域，用户无法继续交互。  
这是典型的 UX 阻塞问题，会直接影响 agent 提问确认、权限确认、交互式工作流。

---

### 6. Windows GUI 输入后卡在 “Thinking...”  
Issue: [#53980](https://github.com/anomalyco/opencode/issues/53980)  
状态：Open，pending close / triaging，评论 3

Windows GUI 无响应问题仍是跨平台体验中的关键痛点。  
考虑到 OpenCode 正在强化 Desktop 使用场景，Windows 稳定性会直接影响更广泛用户采用。

---

### 7. TUI Markdown 删除线未渲染  
Issue: [#54037](https://github.com/anomalyco/opencode/issues/54037)  
状态：Open，已复现，评论 3

在终端支持 ANSI 删除线的情况下，TUI 中 `~~text~~` 没有正确渲染。  
虽然不是阻塞性问题，但反映 TUI Markdown 渲染一致性仍需完善，尤其对长会话 transcript 可读性有影响。

---

### 8. 任务提示与复制多段消息缺少空格  
Issue: [#54045](https://github.com/anomalyco/opencode/issues/54045)  
状态：Open，评论 3  
相关 PR: [#54046](https://github.com/anomalyco/opencode/pull/54046)

TUI 复制多段文本时缺少分隔符，例如 `Read-only mediumresearch.`，同时任务委派提示也存在拼接问题。  
该问题已有修复 PR 并关闭，说明维护响应较快，属于 V2 细节体验打磨。

---

### 9. Agent 权限：deny browser 失效，execute 权限会暴露 browser tools  
Issue: [#54044](https://github.com/anomalyco/opencode/issues/54044)  
状态：Open，评论 1

子 agent 即使在 frontmatter 中显式禁止 browser，只要拥有 `execute` 权限仍会暴露完整 browser namespace。  
这涉及 agent 权限隔离和安全边界，是多 agent / Code Mode 场景中的重要安全问题。

---

### 10. MCP JSON Schema union type 参数被丢弃，导致 JSON Parse EOF  
Issue: [#54016](https://github.com/anomalyco/opencode/issues/54016)  
状态：Open，pending close / triaging，评论 1

MCP 客户端在处理 `type: ["string", "null"]` 这类 JSON Schema union type 时丢失参数，生成截断 JSON。  
随着 MCP 工具生态扩大，Schema 兼容性将直接影响 OpenCode 与外部工具链集成的可靠性。

---

## 4. 重要 PR 进展

### 1. 修复 Desktop 冷启动性能  
PR: [#54060](https://github.com/anomalyco/opencode/pull/54060)  
状态：Closed

该 PR 显著优化 `bun dev:desktop` 冷启动表现。Windows 下 Home ready 中位数从约 **44.8s 降至 9.7s**，窗口可见时间也明显缩短。  
对桌面端开发调试体验和贡献者效率影响很大。

---

### 2. 修复任务委派与剪贴板文本间距  
PR: [#54046](https://github.com/anomalyco/opencode/pull/54046)  
状态：Closed  
关联 Issue: [#54045](https://github.com/anomalyco/opencode/issues/54045)

复用 TUI 展示逻辑来处理复制文本，避免多段消息直接拼接；同时修复 task delegation prompt 的 spacing 问题。  
这是一次小而关键的交互一致性修复。

---

### 3. 新增 Vertex Mistral 路由  
PR: [#54058](https://github.com/anomalyco/opencode/pull/54058)  
状态：Closed  
关联 Issue: [#49741](https://github.com/anomalyco/opencode/issues/49741)

为 Google Vertex 上的 Mistral 模型增加专用路由，并处理 Vertex 不接受 `prompt_cache_key` 的限制。  
这是模型供应商支持扩展的重要进展。

---

### 4. 新增 `OPENCODE_DISABLE_FILEWATCHER` 环境变量  
PR: [#54036](https://github.com/anomalyco/opencode/pull/54036)  
状态：Closed  
关联 Issue: [#48657](https://github.com/anomalyco/opencode/issues/48657)

允许用户在大型 monorepo、深层构建产物、网络挂载或资源受限环境中关闭文件监听器。  
这有助于降低资源消耗，提升复杂项目下的稳定性。

---

### 5. 修复 Vertex MaaS 模型 thinking toggle  
PR: [#54040](https://github.com/anomalyco/opencode/pull/54040)  
状态：Closed

为 Vertex OpenAI-compatible MaaS 路由增加 thinking toggle 变体处理，支持 `none / thinking` 等配置。  
这提升了对 Vertex MaaS 模型推理行为控制的兼容性。

---

### 6. 优化 `/connect` 多连接展示  
PR: [#54054](https://github.com/anomalyco/opencode/pull/54054)  
状态：Closed

当同一 provider 有多个连接时，右侧摘要由冗长标签改为 “3 connections” 形式，避免 UI 挤压。  
这是对 TUI 信息密度和可读性的改进。

---

### 7. 修复 Desktop 浏览器页面闪白  
PR: [#54038](https://github.com/anomalyco/opencode/pull/54038)  
状态：Closed

打开浏览器选项菜单或 popover 时，页面曾出现一两帧空白。该 PR 保持页面直到 still 图像可见，减少视觉闪烁。  
对内置 browser 工具体验有直接改善。

---

### 8. 修复 Gemini enum 非字符串值问题  
PR: [#54031](https://github.com/anomalyco/opencode/pull/54031)  
状态：Closed，needs: compliance  
关联 Issue: [#54033](https://github.com/anomalyco/opencode/issues/54033)

将发给 Gemini 的 enum 值字符串化，解决 Gemini API 对 schema enum 类型要求更严格导致的请求失败。  
虽然 PR 已关闭，但带有合规标签，后续可能仍需规范化处理。

---

### 9. 忽略损坏的 cached project id  
PR: [#54030](https://github.com/anomalyco/opencode/pull/54030)  
状态：Open，needs: issue  
关联 Issue: [#53991](https://github.com/anomalyco/opencode/issues/53991)

针对 `.git/opencode` 缓存文件中出现控制字符或 NUL 字节的情况，修复项目解析失败问题。  
这是项目身份系统容错能力的重要补丁。

---

### 10. 恢复 markerless projects 中的 legacy sessions  
PR: [#54048](https://github.com/anomalyco/opencode/pull/54048)  
状态：Open，needs: issue  
关联 Issue: [#53450](https://github.com/anomalyco/opencode/issues/53450)

修复非 Git/Hg 目录创建 V2 项目时，旧会话无法正确恢复的问题。  
该 PR 与 V1/V2 数据迁移、项目识别机制相关，是 V2 兼容旧数据的重要工作。

---

## 5. 功能需求趋势

### 1. V2 迁移与数据恢复仍是核心关注点  
相关 Issues / PRs:  
- [#53971](https://github.com/anomalyco/opencode/issues/53971)  
- [#54009](https://github.com/anomalyco/opencode/issues/54009)  
- [#54048](https://github.com/anomalyco/opencode/pull/54048)  
- [#54030](https://github.com/anomalyco/opencode/pull/54030)

用户正在集中反馈 V1→V2 迁移中的历史消息丢失、SQLite schema 不兼容、项目 ID 损坏、legacy session 恢复失败等问题。  
这表明 V2 数据迁移链路仍是当前最需要稳定化的部分。

---

### 2. Desktop / GUI 体验持续升温  
相关 Issues / PRs:  
- [#53980](https://github.com/anomalyco/opencode/issues/53980)  
- [#54035](https://github.com/anomalyco/opencode/issues/54035)  
- [#54059](https://github.com/anomalyco/opencode/issues/54059)  
- [#54060](https://github.com/anomalyco/opencode/pull/54060)  
- [#54038](https://github.com/anomalyco/opencode/pull/54038)

社区开始更多使用 Desktop GUI，因此 Windows 可用性、SSH 远程连接错误提示、长文本交互、启动速度、浏览器面板渲染等问题明显增加。

---

### 3. MCP 兼容性需求增强  
相关 Issues:  
- [#54016](https://github.com/anomalyco/opencode/issues/54016)  
- [#54041](https://github.com/anomalyco/opencode/issues/54041)  
- [#54042](https://github.com/anomalyco/opencode/issues/54042)  
- [#54050](https://github.com/anomalyco/opencode/issues/54050)

用户在 MCP schema、Chrome DevTools MCP、WinDbg MCP Secure Mode、MCP child process 启动等场景中遇到问题。  
这说明 OpenCode 的 MCP 客户端正在面对更复杂的真实工具生态，需要提升协议兼容性和错误诊断能力。

---

### 4. 多模型与 Provider 兼容性仍是高频方向  
相关 Issues / PRs:  
- [#53978](https://github.com/anomalyco/opencode/issues/53978)  
- [#54025](https://github.com/anomalyco/opencode/issues/54025)  
- [#54033](https://github.com/anomalyco/opencode/issues/54033)  
- [#54058](https://github.com/anomalyco/opencode/pull/54058)  
- [#54040](https://github.com/anomalyco/opencode/pull/54040)

LongCat、Gemini、OpenAI-compatible provider、Vertex MaaS、Vertex Mistral 都有相关反馈或修复。  
社区对模型接入的要求已从“能调用”升级到“schema 严格兼容、thinking 参数可控、错误可诊断”。

---

### 5. Agent 权限与安全隔离逐渐成为重点  
相关 Issues:  
- [#54044](https://github.com/anomalyco/opencode/issues/54044)  
- [#54008](https://github.com/anomalyco/opencode/issues/54008)  
- [#54057](https://github.com/anomalyco/opencode/issues/54057)

用户开始关注 agent frontmatter 权限、browser tools 暴露、bash deny rule 绕过、V1/V2 agent 配置兼容性等问题。  
这反映出 OpenCode 在多 agent / 自动执行能力增强后，权限模型需要更细粒度和更可解释。

---

## 6. 开发者关注点

1. **V2 迁移可靠性是当前最大痛点**  
   历史会话为空、迁移反复失败、项目 ID 损坏、markerless project 恢复异常等问题直接影响用户升级信心。

2. **桌面端正在进入高频使用阶段，但跨平台稳定性仍需加强**  
   Windows GUI 卡住、SSH 错误提示不准确、长问题面板不可滚动、启动慢等反馈集中出现。

3. **Provider 与模型 schema 兼容性需要更强防御式处理**  
   Gemini enum、OpenAI-compatible tool arguments、Vertex MaaS thinking toggle、LongCat endpoint unavailable 等问题说明模型适配层仍需更稳健。

4. **MCP 工具链兼容性成为重要生态指标**  
   JSON Schema union type、XPIA sampling、Chrome DevTools MCP 包、MCP 子进程启动条件等都在暴露真实集成场景中的边界问题。

5. **权限系统需要更透明、更可验证**  
   Agent `deny browser` 失效、bash wrapper 绕过 deny rule 等反馈显示，开发者希望 OpenCode 的权限声明与实际执行路径严格一致。

6. **大型项目与复杂环境下的性能控制需求增加**  
   文件监听器开关、Nix store 更新限制、长会话 provider stream silent、server 重启等问题说明高级用户需要更多运行时控制能力和故障恢复机制。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报（2026-10-09）

## 1. 今日速览

过去 24 小时 Pi 社区主要围绕 **ChatGPT 登录兼容、Durable 会话、MCP/OAuth、TUI 稳定性、扩展 API 能力** 展开讨论与修复。虽然今日无新版本发布，但 Issue 与 PR 活跃度较高，多个闭环修复集中在 provider 兼容、认证流程、工具声明同步和终端交互细节上。

值得注意的是，SDK/扩展开发者开始更频繁地提出对 **会话生命周期、渲染钩子、模型运行时暴露、compaction 进度感知** 等底层能力的需求，说明 Pi 的扩展生态正在从“工具接入”走向更深层的“运行时集成”。

---

## 2. 社区热点 Issues

### 1. ChatGPT 登录场景下工具声明适配问题  
**Issue:** [#10666](https://github.com/earendil-works/pi/issues/10666)  
**状态:** Closed ｜评论数：4  

该问题关注 ChatGPT 登录用户在使用 OpenAI Responses adapter 时，初始工具声明未按 ChatGPT plan 所需方式放入 namespace 或 additional context，导致 tool calls 不能正常工作。  
**重要性:** 直接影响 ChatGPT 账号登录后的工具调用体验，是 provider 兼容层面的关键问题。  
**社区反应:** 评论数较高，且已关闭，说明修复或处理较快。

---

### 2. Durable 会话支持 attachable 子进程执行  
**Issue:** [#10659](https://github.com/earendil-works/pi/issues/10659)  
**状态:** Closed ｜评论数：4  

提议让 Durable conversation 的 pending generation 可以由独立 `pi` 进程执行，并共享同一个 durable SQLite store，适合 HerdR、tmux 等 pane 托管场景。  
**重要性:** 这是 Durable 模式向更强“可恢复、可挂载、可并行托管”方向演进的信号。  
**社区反应:** 讨论活跃，说明用户对长任务、终端复用和会话持久化有明确需求。

---

### 3. TUI 终端响应碎片泄漏到输入框  
**Issue:** [#10657](https://github.com/earendil-works/pi/issues/10657)  
**状态:** Open ｜评论数：4  

当终端响应被拆成多个 pty read 且间隔超过约 50ms 时，部分可打印片段会被插入 composer，例如 `24;28;32;42c`。  
**重要性:** 这是 TUI 层面的稳定性问题，影响嵌入式终端、远程终端或特殊 pty 转发环境。  
**社区反应:** 仍处于 Open，值得继续关注后续修复。

---

### 4. `mcp.json` 中环境变量展开顺序导致 transport 识别错误  
**Issue:** [#10654](https://github.com/earendil-works/pi/issues/10654)  
**状态:** Open ｜评论数：4  

用户反馈 `{"url": "${MY_VAR}"}` 在 MCP 配置中不能正确解析 transport，而 `http://${VAR}` 可以正常工作。问题在于 transport 解析发生在环境变量展开之前。  
**重要性:** MCP 是 Pi 扩展工具生态的重要基础，配置解析一致性会直接影响外部服务接入。  
**社区反应:** 讨论较多，仍未关闭，可能需要配置加载流程层面的修正。

---

### 5. DashScope/Qwen 429 `insufficient_quota` 被误判为不可重试  
**Issue:** [#10656](https://github.com/earendil-works/pi/issues/10656)  
**状态:** Open ｜评论数：3  

阿里云 DashScope/Bailian 会用 HTTP 429 + `insufficient_quota` 表示临时 TPS/TPM 限流，但 Pi 将其归类为不可重试的计费错误。  
**重要性:** 影响 Qwen/DashScope 用户的稳定性，尤其在高并发或长任务场景下会导致不必要失败。  
**社区反应:** 已有对应 PR [#10677](https://github.com/earendil-works/pi/pull/10677) 关闭，说明修复路径明确。

---

### 6. Codemode 工具声明丢失输入约束  
**Issue:** [#10707](https://github.com/earendil-works/pi/issues/10707)  
**状态:** Closed ｜评论数：2  

Codemode 生成的 tool declaration 会遗漏 `minimum`、`maximum`、`default` 等输入约束，整数类型也可能退化为普通 number。  
**重要性:** 直接影响模型在 codemode-only 模式下正确调用工具，可能导致参数越界或类型错误。  
**社区反应:** 已关闭，表明该问题可能已被快速处理。

---

### 7. `session.abort()` 后已延迟的 continuation 仍继续执行  
**Issue:** [#10705](https://github.com/earendil-works/pi/issues/10705)  
**状态:** Closed ｜评论数：2  

SDK 1.1.0 中，在 `agent_settled` 订阅者调用 `session.abort()` 后，一个已排队的 extension continuation 仍可能发起新的 HTTP provider 请求。  
**重要性:** 这是 SDK 生命周期控制问题，影响宿主应用对会话终止的可靠性。  
**社区反应:** 与 #10704 共同反映扩展与会话 idle/abort 语义需要更严格定义。

---

### 8. `waitForIdle()` 在 settled-handler compaction 中过早 resolve  
**Issue:** [#10704](https://github.com/earendil-works/pi/issues/10704)  
**状态:** Closed ｜评论数：2  

SDK host 依赖 `waitForIdle()` 判断会话空闲，但在 `agent_settled` extension 仍执行 `ctx.compact()` 且 continuation 尚未运行时，`waitForIdle()` 已 resolve。  
**重要性:** 对集成 Pi SDK 的上层系统来说，idle 语义不准确会导致任务调度、UI 状态或资源释放出错。  
**社区反应:** 已关闭，说明生命周期一致性问题受到维护者关注。

---

### 9. 扩展 API 需要支持普通消息与 thinking block 渲染钩子  
**Issue:** [#10701](https://github.com/earendil-works/pi/issues/10701)  
**状态:** Closed ｜评论数：2  

用户希望 Pi 提供类似 `registerToolRenderer` 的公开渲染钩子，用于 assistant/user 消息及 thinking 内容块的组件级渲染。  
**重要性:** 反映扩展生态正在从工具输出渲染扩展到完整 transcript UI 定制。  
**社区反应:** 与 [#10692](https://github.com/earendil-works/pi/issues/10692) thinking-block visibility 需求形成呼应。

---

### 10. Streaming 期间 transport failure 只显示 `terminated`，丢失真实 cause  
**Issue:** [#10697](https://github.com/earendil-works/pi/issues/10697)  
**状态:** Closed ｜评论数：2  

Streaming 过程中的底层传输错误被简化为裸 `terminated`，真实 `error.cause` 未传递给用户。  
**重要性:** 错误可观测性不足会严重影响 provider、网络和代理问题排查。  
**社区反应:** 已关闭，表明错误链保留与诊断体验正在改善。

---

## 3. 重要 PR 进展

### 1. Durable：允许扩展标注 aborted tool result  
**PR:** [#10703](https://github.com/earendil-works/pi/pull/10703)  
**状态:** Open  

该 PR 允许扩展在工具被 abort 后对 durable error result 进行标注。当前 `afterTool` 仅在工具执行完成后触发，无法覆盖取消场景。  
**价值:** 提升 Durable 工具执行链的可解释性和扩展可控性。

---

### 2. MCP OAuth `clientId` 支持环境变量与命令展开  
**PR:** [#10698](https://github.com/earendil-works/pi/pull/10698)  
**状态:** Closed  

修复 `mcp.json` 中 `oauth.clientId` 未经过 `resolveConfigValueOrThrow` 的问题，使 `${VAR}` 与 `!command` 和 `clientSecret` 一样可用。  
**价值:** 改善 MCP OAuth 配置一致性，降低动态凭据接入成本。

---

### 3. OAuth device polling 在 `slow_down` 后调整轮询间隔  
**PR:** [#10694](https://github.com/earendil-works/pi/pull/10694)  
**状态:** Open  

针对 WSL/Ubuntu 时间偏差导致 OAuth polling 持续略快、无法成功的问题，调整 device polling 的 margin。  
**价值:** 提升 Copilot 等 OAuth device flow 在 WSL 环境下的认证稳定性。

---

### 4. MCP OAuth HTTP Basic 凭据按规范 form-encode  
**PR:** [#10690](https://github.com/earendil-works/pi/pull/10690)  
**状态:** Closed  

修复 `client_secret_basic` 中 client ID 与 secret 未按 RFC 6749 §2.3.1 独立 form-encode 的问题。  
**价值:** 增强对严格 OAuth server 的兼容性，修复对应 Issue [#10686](https://github.com/earendil-works/pi/issues/10686)。

---

### 5. `prepareRequest` 后同步工具声明  
**PR:** [#10689](https://github.com/earendil-works/pi/pull/10689)  
**状态:** Closed  

修复 agent loop 在 `prepareRequest` 替换 context 后，工具声明仍使用旧状态的问题。  
**价值:** 保证 provider request 中的 executable tools 与 canonical message list 一致，避免模型看到过期工具声明。

---

### 6. 过滤 package resources 时保留 manifest 边界  
**PR:** [#10688](https://github.com/earendil-works/pi/pull/10688)  
**状态:** Closed  

修复对象形式 package settings 可能暴露现有 `pi` manifest 外资源的问题。  
**价值:** 提升包资源解析安全性，避免扩展/技能边界被意外扩大。

---

### 7. 支持 npm 12 `npm pack --json` 输出格式  
**PR:** [#10680](https://github.com/earendil-works/pi/pull/10680)  
**状态:** Closed  

npm 12 将 `npm pack --json` 从数组改为以 package name 为 key 的对象，该 PR 增加对新旧格式的兼容。  
**价值:** 修复 package install checks、publish dry runs、本地 release 和打包流程在 npm 12 下失败的问题。

---

### 8. DashScope quota throttling 归类为可重试  
**PR:** [#10677](https://github.com/earendil-works/pi/pull/10677)  
**状态:** Closed  

将 DashScope 的 `insufficient_quota` 限流错误从不可重试计费错误中区分出来，按临时 throttling 处理。  
**价值:** 改善 Qwen/DashScope provider 的鲁棒性，修复 Issue [#10656](https://github.com/earendil-works/pi/issues/10656)。

---

### 9. OpenRouter 仅列出当前 key 可用模型  
**PR:** [#10672](https://github.com/earendil-works/pi/pull/10672)  
**状态:** Open  

在 OpenRouter refresh 时结合 catalog 与 `/models/user`，仅保留用户 key 可访问的 chat models，并同步上下文长度、最大输出和价格信息。  
**价值:** 降低用户选择不可用模型的概率，提升模型列表准确性。

---

### 10. 新增 `pi auth --continue`  
**PR:** [#10663](https://github.com/earendil-works/pi/pull/10663)  
**状态:** Open  

新增通用 continuation handoff 入口，用于完成在其他位置启动的认证流程。命令接受或提示输入 base64url JSON payload，并与 continuation service 交互完成认证。  
**价值:** 为跨进程、跨环境或外部 UI 发起的认证流程提供统一 CLI 收口。

---

## 4. 功能需求趋势

### 1. Durable 会话与长任务托管能力增强  
相关：[#10659](https://github.com/earendil-works/pi/issues/10659)、[#10703](https://github.com/earendil-works/pi/pull/10703)  
社区希望 Durable 不只是“持久化记录”，还要支持独立 worker、tmux/HerdR 托管、attach view、aborted tool annotation 等更完整的长任务运行模型。

### 2. MCP 与 OAuth 配置兼容性持续升温  
相关：[#10654](https://github.com/earendil-works/pi/issues/10654)、[#10686](https://github.com/earendil-works/pi/issues/10686)、[#10698](https://github.com/earendil-works/pi/pull/10698)、[#10690](https://github.com/earendil-works/pi/pull/10690)  
MCP 已成为外部工具接入的重点路径。用户集中反馈环境变量展开、OAuth clientId/clientSecret、Basic 编码、transport 推断等配置边界问题。

### 3. 扩展 API 从工具层走向运行时与 UI 深度集成  
相关：[#10701](https://github.com/earendil-works/pi/issues/10701)、[#10692](https://github.com/earendil-works/pi/issues/10692)、[#10674](https://github.com/earendil-works/pi/issues/10674)、[#10706](https://github.com/earendil-works/pi/issues/10706)  
扩展作者需要更多内部能力：消息渲染、thinking block 展开状态、compaction 进度、父 session 的 model runtime 等。这表明 Pi 的插件生态正在向复杂应用级集成发展。

### 4. Provider 兼容与错误分类精细化  
相关：[#10656](https://github.com/earendil-works/pi/issues/10656)、[#10697](https://github.com/earendil-works/pi/issues/10697)、[#10666](https://github.com/earendil-works/pi/issues/10666)、[#10672](https://github.com/earendil-works/pi/pull/10672)  
不同模型平台对错误码、工具声明、模型权限、认证协议的实现差异正在暴露。社区需要 Pi 在 provider abstraction 中更细致地处理平台差异。

### 5. TUI 细节与终端兼容性仍是高频关注点  
相关：[#10657](https://github.com/earendil-works/pi/issues/10657)、[#10710](https://github.com/earendil-works/pi/issues/10710)、[#10668](https://github.com/earendil-works/pi/pull/10668)  
终端碎片响应、fullscreen 退出重绘、overlay 与 modal 冲突等问题说明 Pi 的 TUI 需要继续加强复杂终端环境下的健壮性。

---

## 5. 开发者关注点

1. **生命周期语义需要更精确**  
   `abort()`、`waitForIdle()`、`agent_settled`、deferred continuation、compaction 等事件之间的边界正在成为 SDK 集成者的关键痛点。  
   相关：[#10705](https://github.com/earendil-works/pi/issues/10705)、[#10704](https://github.com/earendil-works/pi/issues/10704)

2. **配置解析需要统一顺序和语义**  
   MCP 配置中 URL、headers、env、OAuth 字段的变量展开逻辑不完全一致，容易让用户误判配置是否有效。  
   相关：[#10654](https://github.com/earendil-works/pi/issues/10654)、[#10698](https://github.com/earendil-works/pi/pull/10698)

3. **错误信息需要保留根因**  
   Streaming transport failure 被简化为 `terminated` 这类问题会降低排障效率。开发者希望错误链、HTTP 状态、provider body 能完整传递。  
   相关：[#10697](https://github.com/earendil-works/pi/issues/10697)

4. **扩展作者需要更多 UI 和运行时钩子**  
   仅能注册 tool renderer 已不足够，社区希望能控制 message rendering、thinking visibility、compaction progress、model runtime 等。  
   相关：[#10701](https://github.com/earendil-works/pi/issues/10701)、[#10692](https://github.com/earendil-works/pi/issues/10692)、[#10706](https://github.com/earendil-works/pi/issues/10706)

5. **多 provider 支持正在进入“细节兼容”阶段**  
   DashScope、OpenRouter、ChatGPT sign-in、Copilot OAuth、llama.cpp 等平台都有各自协议细节。Pi 需要在统一抽象和平台特化之间保持平衡。  
   相关：[#10677](https://github.com/earendil-works/pi/pull/10677)、[#10672](https://github.com/earendil-works/pi/pull/10672)、[#10702](https://github.com/earendil-works/pi/issues/10702)、[#10694](https://github.com/earendil-works/pi/pull/10694)

6. **终端和跨平台环境仍需打磨**  
   Windows + NFS + HDD、WSL 时钟偏差、pty read 分片、fullscreen repaint 等问题说明 Pi 在复杂本地开发环境中的边界情况仍较多。  
   相关：[#10661](https://github.com/earendil-works/pi/issues/10661)、[#10657](https://github.com/earendil-works/pi/issues/10657)、[#10710](https://github.com/earendil-works/pi/issues/10710)

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报｜2026-10-09

## 1. 今日速览

过去 24 小时内，Qwen Code 社区主要聚焦在 **安全边界、Session / 多 Agent 稳定性、跨平台打包与 Web Shell 体验** 等方向。没有新的 Release 发布，但发布流程与主干 CI 仍有多起失败记录，说明当前工程稳定性和自动化发布链路仍是短期重点。

安全相关问题中，daemon git worktree guard 对 heredoc 的处理被指出存在绕过风险，并已有对应修复 PR；同时，Linux / Windows 平台兼容性问题密集出现，包括 Desktop AppImage 中 vendored runtime、ripgrep、browser-use Native Messaging 等。

---

## 2. 社区热点 Issues

### 1. daemon git worktree guard：heredoc 输入 shell/interpreter 时仍会执行被剥离内容  
- Issue: [#13705](https://github.com/QwenLM/qwen-code/issues/13705)  
- 状态：OPEN  
- 标签：`priority/P1`, `category/security`, `scope/shell`, `scope/git`, `scope/vulnerability`, `daemon`  
- 评论数：4  
- 重要性：这是今日最值得关注的安全问题之一。当前 guard 会在解析前剥离 heredoc body，假设其只是 stdin 数据；但当接收方是 `bash`、`python` 等解释器时，heredoc body 实际是可执行程序，从而可能绕过工作区保护。  
- 社区反应：评论较多，且已出现对应修复 PR [#13724](https://github.com/QwenLM/qwen-code/pull/13724)，说明维护者已快速响应。

### 2. H4b 子 Session：PostToolUse 已知未来挂载未计入 admission  
- Issue: [#13709](https://github.com/QwenLM/qwen-code/issues/13709)  
- 状态：OPEN  
- 标签：`priority/P1`, `category/core`, `scope/session-management`, `roadmap/multi-agent`, `roadmap/hooks-events`, `daemon`  
- 评论数：3  
- 重要性：该问题影响多 Agent / 子 Session runtime 的资源挂载判断。当前 child admission 只检查“当前状态”，未考虑 PostToolUse 阶段即将发生的挂载，可能导致并发控制或资源隔离不准确。  
- 社区反应：作为 P1 且 blocked 的核心问题，说明其与近期 H4b runtime 改造高度相关，后续修复会影响多 Agent 稳定性。

### 3. Linux Desktop：vendored x64-linux ripgrep 被 post-link 改写并启动即 SIGSEGV  
- Issue: [#13680](https://github.com/QwenLM/qwen-code/issues/13680)  
- 状态：OPEN  
- 标签：`priority/P1`, `category/platform`, `scope/linux`, `scope/packaging`, `roadmap/platform-distribution`  
- 评论数：3  
- 重要性：Desktop Linux 包内置的 ripgrep 被 `patchelf` 改写后发生崩溃，影响 Linux 桌面端启动探测与搜索能力。该类问题会直接影响发行质量。  
- 社区反应：已有修复方向对应 PR [#13695](https://github.com/QwenLM/qwen-code/pull/13695)，聚焦保持 bundled runtime 完整性。

### 4. subagent 定义中不能包含 `${identifier}`  
- Issue: [#13689](https://github.com/QwenLM/qwen-code/issues/13689)  
- 状态：OPEN  
- 标签：`priority/P2`, `category/core`, `scope/core`  
- 评论数：5  
- 重要性：`.qwen/agents/*.md` 中只要出现 `${identifier}`，即使是在代码块或文档示例中，也会被模板系统误判，导致 subagent 启动失败。这对编写复杂 Agent 定义、包含 shell/JS 示例的用户影响明显。  
- 社区反应：评论数并列最高，说明复现面较广；已有 PR [#13694](https://github.com/QwenLM/qwen-code/pull/13694) 尝试保留未知占位符为字面量。

### 5. extension skills 无法通过 bare authored name 调用  
- Issue: [#13683](https://github.com/QwenLM/qwen-code/issues/13683)  
- 状态：OPEN  
- 标签：`priority/P2`, `category/tools`, `scope/extensions`  
- 评论数：4  
- 重要性：#10841 后扩展 skill 注册为 `<extension>:<authoredName>`，但 live invocation 严格校验注册名，导致用户无法按文档中的裸名称调用扩展能力，即使名称无歧义。  
- 社区反应：已有 PR [#13690](https://github.com/QwenLM/qwen-code/pull/13690) 修复裸名称解析，说明该问题对扩展生态体验较关键。

### 6. Windows 上 browser-use skill 不可用：Native Messaging host 未注册  
- Issue: [#13663](https://github.com/QwenLM/qwen-code/issues/13663)  
- 状态：OPEN  
- 标签：`priority/P2`, `category/platform`, `scope/installation`, `scope/windows`  
- 评论数：4  
- 重要性：Windows 用户无法正常使用 browser-use skill，因为 Native Messaging host 目前只支持 macOS / Linux 注册。这是典型跨平台能力缺口。  
- 社区反应：同一方向还有性能退化问题 [#13692](https://github.com/QwenLM/qwen-code/issues/13692)，并有 PR [#13699](https://github.com/QwenLM/qwen-code/pull/13699) 让不支持平台 fail fast，避免无意义等待。

### 7. `stripAnalysisBlock` rebind-path 会错误剥离 payload 中引用的 reasoning pair  
- Issue: [#13707](https://github.com/QwenLM/qwen-code/issues/13707)  
- 状态：OPEN  
- 标签：`priority/P3`, `category/core`, `scope/session-management`  
- 评论数：5  
- 重要性：问题出在 session 压缩 / reasoning tag 处理路径中：payload 内部合法引用 `</state_snapshot>` 等标签时，multi-closer rebind path 可能错误剥离内容。该问题关系到会话摘要和上下文保真。  
- 社区反应：评论数最高之一，表明核心会话处理逻辑仍在持续审查和修正。

### 8. Claude MCP 配置带 UTF-8 BOM 时导入失败  
- Issue: [#13710](https://github.com/QwenLM/qwen-code/issues/13710)  
- 状态：OPEN  
- 标签：`priority/P3`, `category/configuration`, `scope/mcp`, `scope/windows`  
- 评论数：3  
- 重要性：Windows 环境中配置文件带 BOM 较常见，当前 Claude MCP import 会在 `JSON.parse` 前未剥离 BOM，导致 `.claude.json` 或 `claude_desktop_config.json` 无法导入。  
- 社区反应：已有对应 PR [#13711](https://github.com/QwenLM/qwen-code/pull/13711)，属于低风险但高实用性的兼容性修复。

### 9. H4b foreground child wait 不具备 restart recovery 能力  
- Issue: [#13708](https://github.com/QwenLM/qwen-code/issues/13708)  
- 状态：OPEN  
- 标签：`priority/P2`, `category/core`, `scope/session-management`, `roadmap/multi-agent`, `daemon`  
- 评论数：3  
- 重要性：foreground child-agent 调用跳过 Runtime reservation 后，也失去了 checkpoint continuation 所需的恢复锚点，可能导致重启后无法正确恢复等待状态。  
- 社区反应：与 #13709 一样属于 H4b child-Session runtime 后续问题，显示多 Agent runtime 仍在强化恢复语义。

### 10. Release v0.25.1-preview.1 发布流程失败  
- Issue: [#13720](https://github.com/QwenLM/qwen-code/issues/13720)  
- 状态：OPEN  
- 标签：`type/bug`, `status/ready-for-agent`, `autofix/in-progress`  
- 评论数：2  
- 重要性：preview 发布流程在 `integration_none` job 失败，且同一版本前一天已有失败记录 [#13696](https://github.com/QwenLM/qwen-code/issues/13696)。这说明发布自动化链路仍存在稳定性问题。  
- 社区反应：由 bot 自动创建并标记 autofix，属于维护团队需要持续压降的工程质量问题。

---

## 3. 重要 PR 进展

### 1. 修复 heredoc 输入 shell/interpreter 时的安全绕过  
- PR: [#13724](https://github.com/QwenLM/qwen-code/pull/13724)  
- 状态：OPEN  
- 类型：安全修复  
- 内容：daemon worktree guard 在 heredoc feeding shell/interpreter 时改为 fail closed，避免将实际可执行程序当作普通 stdin 数据剥离后放行。  
- 关联 Issue：[#13705](https://github.com/QwenLM/qwen-code/issues/13705)

### 2. 保持 Desktop AppImage 中 bundled runtime 完整性  
- PR: [#13695](https://github.com/QwenLM/qwen-code/pull/13695)  
- 状态：OPEN  
- 类型：平台 / 打包修复  
- 内容：Linux 安装包构建时跳过对 runtime 文件的 post-link RPATH 写入，避免改写 checksummed runtime；同时复用完整性检查。  
- 关联 Issue：[#13680](https://github.com/QwenLM/qwen-code/issues/13680)

### 3. browser-use 在无法注册 Native Messaging host 的平台上快速失败  
- PR: [#13699](https://github.com/QwenLM/qwen-code/pull/13699)  
- 状态：OPEN  
- 类型：平台兼容 / 性能修复  
- 内容：将 Native Messaging host 支持条件显式化，在不支持平台注册时 fail fast，避免用户等待 35 秒连接超时。  
- 关联 Issue：[#13692](https://github.com/QwenLM/qwen-code/issues/13692), [#13663](https://github.com/QwenLM/qwen-code/issues/13663)

### 4. subagent prompt 中未知 `${identifier}` 保持字面量  
- PR: [#13694](https://github.com/QwenLM/qwen-code/pull/13694)  
- 状态：OPEN  
- 类型：核心修复  
- 内容：调整模板渲染逻辑，避免 subagent 定义文件中的 shell 变量、JS 模板字符串或代码块示例被误当作占位符处理。  
- 关联 Issue：[#13689](https://github.com/QwenLM/qwen-code/issues/13689)

### 5. 允许 extension skills 通过无歧义裸名称调用  
- PR: [#13690](https://github.com/QwenLM/qwen-code/pull/13690)  
- 状态：OPEN  
- 类型：扩展系统修复  
- 内容：当 bare authored name 能唯一匹配一个 enabled skill 时，允许用户直接用裸名称调用，而无需 `<extension>:<name>`。  
- 关联 Issue：[#13683](https://github.com/QwenLM/qwen-code/issues/13683)

### 6. 导入 Claude MCP 配置时剥离 UTF-8 BOM  
- PR: [#13711](https://github.com/QwenLM/qwen-code/pull/13711)  
- 状态：OPEN  
- 类型：配置兼容修复  
- 内容：Claude MCP importer 在解析 JSON 前容忍并剥离 UTF-8 BOM，提升 Windows / 编辑器保存配置时的兼容性。  
- 关联 Issue：[#13710](https://github.com/QwenLM/qwen-code/issues/13710)

### 7. Shell preview ring buffer 处理部分 ANSI / UTF-8 前缀  
- PR: [#13725](https://github.com/QwenLM/qwen-code/pull/13725)  
- 状态：OPEN  
- 类型：CLI / Shell 输出修复  
- 内容：修复 bounded Shell preview ring buffer 从编码序列中间开始时产生的 ANSI CSI 残留和 UTF-8 前缀截断问题，改善终端输出预览质量。

### 8. Web Shell：允许下载 changed 状态的 workspace artifacts  
- PR: [#13718](https://github.com/QwenLM/qwen-code/pull/13718)  
- 状态：OPEN  
- 类型：Web Shell 体验修复  
- 内容：artifact card 处于 `changed` 状态时也提供 Download，下载当前 workspace 文件内容。解决编辑后预览可用但下载按钮消失的问题。

### 9. Web Shell：断线重连时保留 artifact cards  
- PR: [#13714](https://github.com/QwenLM/qwen-code/pull/13714)  
- 状态：OPEN  
- 类型：Web Shell 稳定性修复  
- 内容：选中 session 临时断连或重连时保留已加载 artifact cards，重连后再刷新 catalog，避免 UI 瞬时丢失上下文。

### 10. managed-agent：协调 approval delivery 与并发 session titles  
- PR: [#13682](https://github.com/QwenLM/qwen-code/pull/13682)  
- 状态：OPEN  
- 类型：多 Agent / 会话一致性修复  
- 内容：在 dispatcher attachment-cache 丢失后恢复已接受的 Workspace approval answers，并避免 Harness-disabled replicas 错误抢占 pending deliveries，同时修正并发 session title 处理。

---

## 4. 功能需求趋势

### 1. 权限与 AUTO mode 配置自动化  
- 代表 Issue：[#13691](https://github.com/QwenLM/qwen-code/issues/13691)  
- 趋势：社区希望增加 `/auto-mode-setup` 或类似命令，根据本地项目、包管理器、构建工具、测试命令等自动生成权限策略。  
- 解读：用户希望降低 AUTO mode 上手成本，同时保持安全边界可解释、可调整。

### 2. Memory 系统的语义去重与跨目录合并  
- 代表 Issue：  
  - [#13721](https://github.com/QwenLM/qwen-code/issues/13721)  
  - [#13722](https://github.com/QwenLM/qwen-code/issues/13722)  
- 趋势：用户希望 extract agent 在写入新 memory 前进行相似度检测，并在用户级 memory 与项目级 memory 之间发现重复主题时提示合并。  
- 解读：随着 memory 使用频率提高，社区开始关注长期上下文的质量治理，而不仅是写入能力。

### 3. Web Shell 可用性与 artifact / trajectory 体验增强  
- 代表 PR：  
  - [#13716](https://github.com/QwenLM/qwen-code/pull/13716)  
  - [#13718](https://github.com/QwenLM/qwen-code/pull/13718)  
  - [#13714](https://github.com/QwenLM/qwen-code/pull/13714)  
- 趋势：Web Shell 正从“可运行”走向“可审计、可回看、可恢复”。用户希望更好地浏览历史 trajectory、稳定访问 artifact、在断线重连后保留上下文。  
- 解读：Web Shell 已成为 Qwen Code 交互体验的重要入口。

### 4. 跨平台发行与 Desktop 下载体验  
- 代表 Issue：  
  - [#13656](https://github.com/QwenLM/qwen-code/issues/13656)  
  - [#13680](https://github.com/QwenLM/qwen-code/issues/13680)  
  - [#13704](https://github.com/QwenLM/qwen-code/issues/13704)  
- 趋势：社区关注 Desktop 安装包下载入口、README 链接自动更新、Linux x64 / arm64 vendored binary 正确性。  
- 解读：随着 Desktop 分发扩大，平台打包、二进制完整性和下载路径一致性成为重点。

### 5. 测试、CI 与发布链路稳定性  
- 代表 Issue：  
  - [#13720](https://github.com/QwenLM/qwen-code/issues/13720)  
  - [#13715](https://github.com/QwenLM/qwen-code/issues/13715)  
  - [#13684](https://github.com/QwenLM/qwen-code/issues/13684)  
- 趋势：多起 Release / Main CI / SDK Java 失败被自动追踪，社区和维护者正在通过 autofix、超时边界、测试稳定性增强来降低主干噪音。  
- 解读：项目规模扩大后，CI 可靠性已成为开发效率瓶颈之一。

---

## 5. 开发者关注点

1. **安全边界需要更保守的默认策略**  
   heredoc、shell interpreter、git worktree guard 等问题表明，开发者对自动化执行路径的安全性非常敏感。当前方向是对不确定场景 fail closed，而不是依赖字符串剥离或弱解析。

2. **多 Agent / Session runtime 正处于高强度打磨期**  
   H4b child-Session、foreground child wait、PostToolUse mount、checkpoint continuation 等问题集中出现，说明多 Agent 架构正在进入复杂状态恢复与资源隔离阶段。

3. **Windows 支持仍存在明显体验缺口**  
   browser-use Native Messaging、PowerShell hook `windowsHide`、MCP BOM 配置解析等问题都与 Windows 强相关。用户反馈显示，Windows 企业环境、ConPTY、Edge-only 环境需要更完善的兼容策略。

4. **Linux Desktop 打包质量影响用户第一印象**  
   x64-linux ripgrep SIGSEGV、arm64-linux vendored binary 失败、AppImage runtime 被改写等问题说明，Linux 发行链路需要更严格的二进制完整性检查和架构覆盖。

5. **扩展与 subagent 作者需要更宽容的文本处理能力**  
   `${identifier}` 被模板系统误处理、extension skill 裸名称无法调用，都会影响自定义 Agent 和扩展生态。开发者期望“文档中的代码示例就是字面内容”，而不是被隐式模板系统破坏。

6. **Web Shell 正在被当作长期工作台使用**  
   artifact 下载、断线重连保留卡片、历史 trajectory 浏览等 PR 表明，开发者不只关心单次对话结果，也关心过程回放、产物管理和会话连续性。

7. **自动化发布与 CI 仍需降噪**  
   多个 bot issue 显示 Release / Main CI / SDK Java 仍有不稳定点。对贡献者而言，稳定 CI 是合并效率和维护体验的基础。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报（2026-10-09）

## 1. 今日速览

过去 24 小时没有新 Release，但 0.10.2 相关修复与发布阻塞问题非常活跃，重点集中在 TUI 可观测性、登录认证、运行时隔离、发布流程和安全依赖。  
Issue 侧新增/更新 10 条，其中多项由维护者直接提出，显示当前社区重点在“稳定发布 0.10.2”和“提升终端/运行时体验”；PR 侧有多项修复已进入或接近合并状态。

---

## 3. 社区热点 Issues

### 1. Gemini 429 错误后自动等待并重试任务  
[#6923](https://github.com/codewhale-hq/Codewhale/issues/6923) · OPEN · `bug`, `enhancement`, `needs-triage`

用户反馈 Gemini 返回 429 限流错误后，希望系统能够等待并自动重试最后一个任务，而不是让用户手动恢复。  
这对长任务和代理式工作流很重要，能减少因临时限流导致的中断成本。当前评论 1 条、点赞 0，仍处于待分流状态。

### 2. Bash/shell 操作需要可检查、可停止  
[#6931](https://github.com/codewhale-hq/Codewhale/issues/6931) · OPEN · `bug`, `tui`, `ux`, `v0.10.2`

维护者指出，TUI 中大量 `run` 卡片输出折叠后，用户难以重新定位仍在运行或已完成的 shell 操作。  
该问题直接影响代理执行命令时的可控性：用户需要能检查、停止、追踪每个 Bash/shell 操作。评论 0、点赞 0，但属于 0.10.2 UX 关键项。

### 3. xAI OAuth 登录、凭据接管与恢复验证  
[#6926](https://github.com/codewhale-hq/Codewhale/issues/6926) · CLOSED · `providers`

该任务用于检查 xAI 认证链路，尤其是 OAuth 登录、凭据采用与恢复流程。  
虽然没有复现新的 xAI 故障，但它与 ChatGPT 登录修复并行，说明多 Provider 认证稳定性是当前维护重点。已关闭，表示验证或处理阶段已完成。

### 4. 修复 ChatGPT 登录因 unsupported originator 参数被拒绝  
[#6925](https://github.com/codewhale-hq/Codewhale/issues/6925) · OPEN · `bug`, `providers`

0.10.1 中 ChatGPT 登录在进入登录前即失败，返回 HTTP 400 和 `invalid_authorize_request`。  
维护者已定位到一个额外 query 参数可能导致授权请求被拒绝，这是 Provider 登录链路中的高优先级问题。评论 0、点赞 0，但对 ChatGPT Provider 可用性影响较大。

### 5. 2026-10-08 安全扫描  
[#6918](https://github.com/codewhale-hq/Codewhale/issues/6918) · OPEN · `security`, `bot-authored`

夜间安全与依赖扫描显示 CodeQL 告警未能读取，原因是 `GITHUB_CODEWHALE_SECURITY_PAT` 未配置。  
这类 Issue 虽然不是功能缺陷，但影响项目安全治理和自动化审计完整性。社区互动较低，主要由机器人维护流程驱动。

### 6. 原生 Engine 启动需能从 dead owner publication 安全恢复  
[#6915](https://github.com/codewhale-hq/Codewhale/issues/6915) · OPEN

该 Issue 关注 Native Engine 启动时，如果检测到已失效的 owner publication，如何安全恢复。  
摘要中提到本地已有修复提交，并覆盖多个 plugin/startup/approval 路径，但推送和发布仍需 release owner 处理。该问题影响运行时启动可靠性。

### 7. 实现标准化永久删除会话能力  
[#6914](https://github.com/codewhale-hq/Codewhale/issues/6914) · OPEN

当前 Runtime API 支持 GET/PATCH conversation，但缺少标准的永久删除操作及能力声明。  
这对于客户端、IDE 插件或多会话管理工具很重要，因为“删除保存的 session”和“永久删除 conversation”语义不同，需要明确 API 能力协商。

### 8. TUI 工作区 Dock 中加入 Terminal 视图  
[#6912](https://github.com/codewhale-hq/Codewhale/issues/6912) · OPEN · `enhancement`, `tui`

该需求希望在 TUI work dock 中查看模型的 PTY 会话，并允许用户直接向其中输入。  
这是代理式开发工具的重要方向：从“模型执行命令”扩展为“用户可实时观察和接管命令行会话”。摘要显示相关候选实现已在 PR #6907 中，且已有多项验证通过。

### 9. Release 版本号夹具需随版本升级同步更新  
[#6911](https://github.com/codewhale-hq/Codewhale/issues/6911) · OPEN · `ci`

0.10.2 版本升级后，仍有测试 fixture 标记为 0.10.1，导致 Ubuntu 测试失败。  
该问题暴露出发布自动化中的版本一致性风险，需要 `check-versions` 和 `prepare-release` 更可靠地覆盖版本化产物。

### 10. 发布前检查 crates.io 10 MiB tarball 限制  
[#6910](https://github.com/codewhale-hq/Codewhale/issues/6910) · OPEN · `release-blocker`, `packaging`

v0.10.1 发布时，28 个 crate 中已有 26 个上传成功，但 `codewhale-tui` 因超过 crates.io 10 MiB 限制而失败，导致发布被“部分搁浅”。  
这是明确的 release blocker，要求在首次上传前增加 tarball 体积保护，避免再次出现不可逆的半发布状态。

---

## 4. 重要 PR 进展

### 1. 允许模型在里程碑处交回目标控制权  
[#6930](https://github.com/codewhale-hq/Codewhale/pull/6930) · OPEN

该 PR 修复 Operate 模式中代理无法在阶段性里程碑停下来的问题。  
修复后，模型可以完成一个阶段后停下并询问下一步，减少方向错误时的返工成本，适合长任务和人工协同工作流。

### 2. 修复 Windows 执行策略中重定向被误判为命令分隔符  
[#6929](https://github.com/codewhale-hq/Codewhale/pull/6929) · OPEN

此前 Windows 上包含单独 `&` 的 shell 命令会被安全门禁硬阻断。  
该 PR 明确“重定向不是命令分隔符”，可减少合法命令被误拦截的问题，同时保留对高风险命令的保护。

### 3. `/network allow` 后无需重启即可重新读取网络策略  
[#6928](https://github.com/codewhale-hq/Codewhale/pull/6928) · OPEN

用户执行 `/network allow <host>` 后，配置已写入，但当前会话仍可能继续拒绝网络访问。  
该 PR 让 TUI/Engine 重新读取网络策略，使授权立即生效，改善开发者在联网任务中的交互体验。

### 4. 每个 runtime store 一个控制端点，每个 workspace 一个 driver  
[#6924](https://github.com/codewhale-hq/Codewhale/pull/6924) · OPEN

该 PR 解决同一用户在同一机器上使用多个 runtime store 时，客户端因共享 control socket 而互相拒绝的问题。  
对 VS Code 等编辑器扩展尤其重要，因为它们通常按 workspace 隔离 runtime store。

### 5. 更新多语言 `/provider` 描述  
[#6922](https://github.com/codewhale-hq/Codewhale/pull/6922) · CLOSED

该 PR 修复 es-419、ja、pt-BR、vi、zh-Hans 等语言包中 `/provider` 帮助文本仍停留在旧描述的问题。  
虽然是文案修复，但能降低多语言用户理解 Provider/Model 切换命令时的困惑。

### 6. app-server hook 日志应写到 state db 旁，而不是 cwd  
[#6921](https://github.com/codewhale-hq/Codewhale/pull/6921) · CLOSED

此前 app-server 在项目目录中启动时，可能把 `.deepseek/events.jsonl` 写入当前项目。  
该 PR 将 hook 日志放在 state db 附近，避免污染用户项目目录，也更符合状态数据集中管理的预期。

### 7. Pet mode 成为 Codewhale 主视图  
[#6920](https://github.com/codewhale-hq/Codewhale/pull/6920) · CLOSED

`/pet on` 后，动画 GPUI whale 将成为主终端视图，同时保留消息框、粘贴、光标、队列消息和权限控制。  
该 PR 偏向体验创新：通过更具可视化和陪伴感的界面增强 TUI 的交互吸引力。

### 8. 翻译 `/profile` 回复内容  
[#6919](https://github.com/codewhale-hq/Codewhale/pull/6919) · CLOSED

该 PR 修复 `/profile` 在所有 locale 下都返回英文的问题。  
涉及 profile 切换、当前 profile 状态、模型和 Provider 展示、失败提示等文本，对国际化体验有直接改善。

### 9. 安全依赖升级：Next.js 16.3.6 → 16.3.8  
[#6917](https://github.com/codewhale-hq/Codewhale/pull/6917) · OPEN · `bot-authored`

夜间安全扫描发现 `web/` 中 Next.js 存在高危 advisory，并导致 `npm-audit` 失败。  
该 PR 自动升级到 16.3.8，用于恢复安全审计通过状态，是安全维护链路中的必要更新。

### 10. 允许嵌入方声明 server surface  
[#6916](https://github.com/codewhale-hq/Codewhale/pull/6916) · CLOSED

编辑器扩展通过 `codewhale serve --http` 启动时，之前 telemetry surface 只能显示为通用 `serve`。  
该 PR 允许客户端通过 `CODEWHALE_TELEMETRY_SURFACE` 声明自身类型，便于区分 VS Code、其他 IDE 或 headless API 客户端。

---

## 5. 功能需求趋势

### 1. TUI 可观测性与可控性增强

多个 Issue/PR 都围绕“用户如何观察、接管、停止模型执行的操作”展开，包括 shell run card 可检查、PTY Terminal dock、Pet mode 主视图等。  
这说明社区正在从简单命令执行转向更成熟的 agent 操作台体验。

相关链接：  
- [#6931](https://github.com/codewhale-hq/Codewhale/issues/6931)  
- [#6912](https://github.com/codewhale-hq/Codewhale/issues/6912)  
- [#6920](https://github.com/codewhale-hq/Codewhale/pull/6920)

### 2. Provider 登录与模型服务稳定性

ChatGPT 登录失败、xAI OAuth 验证、Gemini 429 自动重试都指向同一类需求：多模型 Provider 接入必须更稳定、更可恢复。  
开发者不只需要“能接入”，还需要限流、授权失败、凭据恢复等异常路径有清晰处理。

相关链接：  
- [#6925](https://github.com/codewhale-hq/Codewhale/issues/6925)  
- [#6926](https://github.com/codewhale-hq/Codewhale/issues/6926)  
- [#6923](https://github.com/codewhale-hq/Codewhale/issues/6923)

### 3. IDE / Workspace 级运行时隔离

每个 runtime store 独立控制端点、每个 workspace 独立 driver 的设计，显示项目正在适配更复杂的 IDE 嵌入场景。  
这对多项目、多窗口、多工作区同时运行 AI agent 很关键。

相关链接：  
- [#6924](https://github.com/codewhale-hq/Codewhale/pull/6924)  
- [#6916](https://github.com/codewhale-hq/Codewhale/pull/6916)

### 4. 发布工程和供应链可靠性

0.10.2 当前有明显发布工程压力，包括版本戳 fixture 不一致、crates.io 包体积限制、安全扫描凭据缺失、依赖高危升级等。  
社区关注点不只是功能迭代，也包括发布过程的可重复、可预检和可恢复。

相关链接：  
- [#6911](https://github.com/codewhale-hq/Codewhale/issues/6911)  
- [#6910](https://github.com/codewhale-hq/Codewhale/issues/6910)  
- [#6918](https://github.com/codewhale-hq/Codewhale/issues/6918)  
- [#6917](https://github.com/codewhale-hq/Codewhale/pull/6917)

### 5. 国际化与用户命令反馈完善

`/provider`、`/profile` 多语言修复表明 CLI/TUI 命令系统的本地化仍在补齐。  
对于面向全球开发者的 AI 工具，命令帮助和状态反馈的一致性会直接影响采用体验。

相关链接：  
- [#6922](https://github.com/codewhale-hq/Codewhale/pull/6922)  
- [#6919](https://github.com/codewhale-hq/Codewhale/pull/6919)

---

## 6. 开发者关注点

1. **长任务中断与恢复成本高**  
   Gemini 429、目标无法在里程碑停下、shell 操作不可追踪，都反映开发者希望 agent 工作流更可暂停、可恢复、可人工接管。  
   相关：[#6923](https://github.com/codewhale-hq/Codewhale/issues/6923)、[#6930](https://github.com/codewhale-hq/Codewhale/pull/6930)、[#6931](https://github.com/codewhale-hq/Codewhale/issues/6931)

2. **认证和 Provider 接入仍是高风险区域**  
   ChatGPT 登录失败、xAI OAuth 验证说明多 Provider 生态下，OAuth 参数、凭据采纳、异常恢复需要更严格测试和兼容策略。  
   相关：[#6925](https://github.com/codewhale-hq/Codewhale/issues/6925)、[#6926](https://github.com/codewhale-hq/Codewhale/issues/6926)

3. **TUI 需要更像“Agent 控制台”**  
   用户不仅要看模型输出，还要看它开的终端、正在跑的进程、可停止的 shell 任务，以及更直观的主视图。  
   相关：[#6912](https://github.com/codewhale-hq/Codewhale/issues/6912)、[#6920](https://github.com/codewhale-hq/Codewhale/pull/6920)

4. **发布流程需要前置校验，避免半发布**  
   crates.io 10 MiB 限制导致 v0.10.1 部分 crate 已发布、部分失败，是典型不可逆发布事故。版本戳 fixture 未同步也说明 prepare-release 仍需加强。  
   相关：[#6910](https://github.com/codewhale-hq/Codewhale/issues/6910)、[#6911](https://github.com/codewhale-hq/Codewhale/issues/6911)

5. **嵌入式和多工作区场景正在成为重点**  
   VS Code 等 IDE 扩展需要 workspace 级 runtime 隔离、明确 telemetry surface，以及更可靠的 server 控制端点。  
   相关：[#6924](https://github.com/codewhale-hq/Codewhale/pull/6924)、[#6916](https://github.com/codewhale-hq/Codewhale/pull/6916)

6. **安全与依赖治理仍依赖自动化补强**  
   安全扫描凭据缺失、Next.js 高危升级说明项目在安全自动化方面仍有待完善，尤其是 bot 扫描、审计失败和依赖升级闭环。  
   相关：[#6918](https://github.com/codewhale-hq/Codewhale/issues/6918)、[#6917](https://github.com/codewhale-hq/Codewhale/pull/6917)

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*