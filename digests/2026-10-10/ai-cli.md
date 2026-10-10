# AI CLI 工具社区动态日报 2026-10-10

> 生成时间: 2026-10-10 04:51 UTC | 覆盖工具: 9 个

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

# AI CLI 工具生态横向对比分析报告｜2026-10-10

## 1. 生态全景

当前主流 AI CLI / Agent 工具正在从“命令行问答与代码生成”快速演进为 **多端协同、长任务执行、工具调用、沙箱隔离、MCP / Provider 扩展、Multi-Agent 编排** 的工程代理平台。  
社区反馈的主线已经不再是“能否生成代码”，而是 **能否稳定执行真实开发任务、跨平台运行、恢复长会话、解释权限和安全决策**。  
Windows、Desktop / Web Shell、远程控制、沙箱、会话恢复、工具调用生命周期成为几乎所有活跃项目的共性痛点。  
同时，多个项目正在强化插件、MCP、BYOK、多 Provider、本地模型和 Multi-Agent 能力，说明 AI CLI 正在成为开发者工作流中的可编排基础设施，而非单一 CLI 工具。

---

## 2. 各工具活跃度对比

> 说明：下表基于题目提供的过去 24 小时社区摘要统计；Issue / PR 数为摘要中明确覆盖或列出的数量，不一定等同于仓库真实新增总量。

| 工具 | 今日 Issue 活跃度 | 今日 PR 活跃度 | Release 情况 | 活跃重点 |
|---|---:|---:|---|---|
| **Claude Code** | 约 10 个重点 Issue | 0 个 PR 更新 | **v2.1.296** | Desktop Code tab、Windows Bash、插件焦点、安全误报、subagent 压缩 |
| **OpenAI Codex** | 约 10 个重点 Issue | 约 10 个重点 PR | **rust-v0.162.1**、**0.163.0-alpha.4/5** | Windows 沙箱、Computer Use、DeviceCheck / Cloudflare 403、安全检查、Dots 长任务 |
| **Gemini CLI** | 5 个 Issue | 9 个 PR | **v0.65.0 nightly**、**v0.64.0-preview.1** | JSON stream、超时配置、原子写入、Windows 测试、终端 UX |
| **GitHub Copilot CLI** | 约 10 个重点 Issue | 1 个 PR | **v1.0.95**、**v1.0.96-0/1/2** | 沙箱权限、ACP session、BYOK、多模型路由、Windows/macOS 集成 |
| **Kimi Code CLI** | 0 | 0 | 无 | 过去 24 小时无活动 |
| **OpenCode** | 约 10 个重点 Issue | 约 10 个重点 PR | 无 | v2 回归、TUI / Desktop、MCP OAuth、权限策略、Code Mode 长任务 |
| **Pi** | 约 10 个重点 Issue | 约 10 个重点 PR | 无 | Provider 兼容、TUI 细节、SDK Agent 生命周期、Durable 会话 |
| **Qwen Code** | 约 10 个重点 Issue | 约 10 个重点 PR | **v0.25.1-preview.1**、**v0.25.0-nightly** | Managed Agent、Multi-Agent、Web Shell、MCP、SDK API 契约 |
| **DeepSeek TUI / Codewhale** | 13 个 Issue | 6 个 PR | 无 | Runtime/TUI 拆分、后台任务可见性、Workflow Runtime、OAuth、Windows 路径 |
| **总体** | 高活跃 | 高活跃 | 多项目连续发布 | 长任务、沙箱、跨平台、MCP、Multi-Agent、会话恢复成为主轴 |

---

## 3. 共同关注的功能方向

### 3.1 长任务、后台任务与会话生命周期

多个工具都在暴露类似问题：任务运行时间变长后，用户需要更强的 **可见性、可取消性、可恢复性和状态一致性**。

| 工具 | 具体诉求 |
|---|---|
| **Claude Code** | Desktop Code tab 编辑 / 撤回消息会杀掉后台任务；subagent 被 autocompact thrashing 中断 |
| **OpenAI Codex** | Dots 已完成但仍显示运行 9 天；Computer Use 任务停滞后无法分支恢复 |
| **GitHub Copilot CLI** | session event host ack 超时后后续事件永久失败 |
| **OpenCode** | Code Mode `execute` 和 plugin tool 无超时；中断后需要保留已完成嵌套调用结果 |
| **Pi** | 工具忽略 abort signal 会导致 run 永久卡住；Durable resume 语义需要文档化 |
| **Qwen Code** | recovery-blocked session 阻塞同 daemon 其他 session；child_run 未启动却长期 running |
| **DeepSeek TUI / Codewhale** | 后台长任务不可见；会话切换被阻塞时需要展示具体任务名称 |

**判断：** AI CLI 正在进入“长事务代理”阶段，任务状态机、取消语义、后台任务面板、失败恢复将成为核心竞争力。

---

### 3.2 Windows 与跨平台兼容性

Windows 是今日最集中的痛点之一，覆盖 shell、路径、沙箱、桌面端、测试权限、安装器等多个层面。

| 工具 | Windows 相关问题 |
|---|---|
| **Claude Code** | Git Bash 命令长度截断、反斜杠处理错误；Windows Server 2022 启动挂起；非 C 盘 Bash tool 问题 |
| **OpenAI Codex** | Windows 沙箱 provisioning、Computer Use、Cloudflare 403、tool safety rejection、os error 32 |
| **Gemini CLI** | Windows 无 symlink 权限导致测试失败 |
| **GitHub Copilot CLI** | Windows Desktop 无法 spawn bundled Git；winget 安装后 `/upgrade` 状态不一致；长路径权限问题 |
| **OpenCode** | Windows TUI 卡顿、CLI 启动无响应、Desktop 托盘缺失 |
| **Pi** | Windows + WezTerm 输入序列泄漏 |
| **DeepSeek TUI / Codewhale** | Windows junction / relocated state root 导致 sub-agent 和 artifact 写入失败 |

**判断：** Windows 体验已从“能安装运行”升级到“能否生产使用”。企业采用场景下，Windows shell、路径、权限、沙箱、包管理器一致性会直接影响工具落地。

---

### 3.3 沙箱、权限与安全策略透明度

安全能力正在成为 AI CLI 的核心基础设施，但社区集中反馈“过度拦截、误报、不可解释、审批链路缺失”。

| 工具 | 具体诉求 |
|---|---|
| **Claude Code** | 安全分类器误报，阻止合法认证架构文档；插件被误判安全风险 |
| **OpenAI Codex** | safety-check 阻断 S3 修复；Windows 工具拒绝缺少 review ID 和审批入口 |
| **GitHub Copilot CLI** | 沙箱阻断 Gradle daemon、本地 Git 凭据受限、HOME override 触发误判 |
| **OpenCode** | plan agent shell 命令需确认；`experimental.policies` 权限 action 被静默丢弃；拒绝工具调用后恢复语义错误 |
| **DeepSeek TUI / Codewhale** | Full Access 阻塞后台 API；工具默认行为与文档不一致 |
| **Qwen Code** | Web Shell 编辑权限弹窗展示完整文件，影响审查效率 |

**判断：** 未来优秀工具需要提供 **权限决策来源、拒绝原因、review ID、审批流、审计日志、误报申诉**，而不是简单地 allow / deny。

---

### 3.4 MCP、插件与外部工具生态

MCP 和插件系统成为多个项目扩展能力的关键路径，但认证、工具发现、UI 焦点和配置热更新问题频繁出现。

| 工具 | 具体诉求 |
|---|---|
| **Claude Code** | Desktop 插件 pane 输入框无法聚焦；插件失焦后无法恢复 |
| **OpenCode** | MCP OAuth 在 `*.localhost` 回归；环境变量凭据缓存导致 token 为空；401 后需要标记 `needs_auth` |
| **Qwen Code** | MCP HTTP server 显示 connected 但工具未注册；lazy-spawn 工具发现需修复 |
| **DeepSeek TUI / Codewhale** | MCP 文档与 0.10.2 实际默认行为不一致 |
| **Pi** | Provider / 扩展系统受 Bun / Node 运行时差异影响 |
| **Gemini CLI** | agent 文件操作、调试控制台、核心工具链稳定性持续修复 |

**判断：** MCP / 插件生态已经从“接入能力”进入“可靠性工程”阶段。认证状态、热更新、工具发现、UI 交互、错误解释将决定生态上限。

---

### 3.5 Multi-Agent、subagent 与任务编排

多 Agent 不再是概念功能，多个项目已在处理真实工程问题。

| 工具 | 具体诉求 |
|---|---|
| **Claude Code** | subagent `autoCompactWindow` 配置、压缩 thrashing、后台任务中断 |
| **GitHub Copilot CLI** | BYOK 下 sub-agent 继承错误 wire API |
| **Qwen Code** | Managed Agent、child Workspace、team record contract、agent identity API |
| **DeepSeek TUI / Codewhale** | Workflow verify gate 死锁、sub-agent state path 校验 |
| **Pi** | SDK Agent 生命周期事件、abort 语义、自定义消息触发 agent run |
| **OpenCode** | Code Mode execute、plugin tool、嵌套调用结果保留 |

**判断：** 行业正在从“单 Agent 单轮工具调用”走向 **多 Agent、多任务、可恢复、可审计的执行平台**。

---

## 4. 差异化定位分析

### Claude Code

**定位：** 面向 Claude 生态的官方级开发代理，强调 Desktop / CLI 一体化、subagent、企业策略管理。  
**功能侧重：**

- Claude Desktop Code tab
- CLI 与 Desktop gateway policy
- subagent 与上下文压缩
- GitHub 集成、Remote Control、插件生态

**目标用户：** Claude 重度用户、企业团队、依赖 Desktop + CLI 双端协同的开发者。  
**当前短板：** Desktop Code tab 稳定性、插件焦点、Windows Bash、后台任务生命周期、安全误报。

---

### OpenAI Codex

**定位：** OpenAI 体系下的工程代理与桌面自动化平台，兼具 CLI、Desktop、Computer Use、Dots。  
**功能侧重：**

- Windows / macOS Desktop app
- Computer Use
- Dots 长任务
- 沙箱与 exec-server
- 安全检查和审批体系
- code-mode runtime 演进

**目标用户：** ChatGPT / OpenAI 生态用户、需要桌面自动化和复杂工程任务的开发者。  
**当前短板：** Windows 沙箱、网络认证 403、长任务状态同步、安全检查可解释性。

---

### Gemini CLI

**定位：** 更偏传统 CLI 工具链和开发者终端体验，维护节奏轻快，关注 core 稳定性。  
**功能侧重：**

- CLI 请求处理
- 文件系统操作
- 终端交互细节
- 发布和依赖治理
- 跨平台测试兼容

**目标用户：** 偏命令行工作流、Google / Gemini 生态开发者、重视轻量 CLI 的用户。  
**当前短板：** 长请求 timeout 配置、loading 可观测性、Windows 测试环境兼容。

---

### GitHub Copilot CLI

**定位：** 与 GitHub、Copilot、企业身份和 IDE / ACP 集成紧密的工程代理。  
**功能侧重：**

- 沙箱权限和凭据注入
- ACP session 协议
- GitHub / gh 身份集成
- BYOK、多模型路由
- 企业策略和 Entra auth

**目标用户：** GitHub 企业用户、Copilot 用户、IDE / SDK 集成场景。  
**当前短板：** ACP 大规模性能、沙箱权限边界、多账号 Git 凭据、Windows Desktop 集成。

---

### OpenCode

**定位：** 社区驱动、v2 快速演进中的开放式 AI coding agent，强调插件、MCP、Code Mode。  
**功能侧重：**

- TUI / Desktop
- MCP / OAuth
- Code Mode
- 权限策略
- Provider / 模型支持
- 多 Agent 互操作生态

**目标用户：** 开源社区用户、喜欢可扩展 Agent 框架的开发者、跨工具编排用户。  
**当前短板：** v2 回归较多、Windows TUI、付费额度状态一致性、工具调用生命周期。

---

### Pi

**定位：** 更偏 SDK / Agent runtime / Provider 兼容层的高级开发者工具。  
**功能侧重：**

- 多 Provider 适配
- Durable session
- SDK Agent 生命周期
- TUI 精细交互
- Codemode
- 配置 schema 与环境诊断

**目标用户：** 构建自定义 Agent、自动化系统、dashboard、多进程 durable session 的高级开发者。  
**当前短板：** Provider 差异适配复杂、Bun / Node 运行时兼容、终端环境碎片化。

---

### Qwen Code

**定位：** 正在从 CLI 走向 daemon 化、Web Shell、多 Agent 平台的工程代理。  
**功能侧重：**

- Managed Agent
- Multi-Agent API
- Web Shell
- MCP 工具生态
- SDK / OpenAPI contract
- workflow 和 child workspace

**目标用户：** 需要 Web Shell、daemon、多 Agent 编排和 Qwen / 本地模型生态的团队。  
**当前短板：** session 恢复一致性、daemon 故障隔离、API contract 稳定性、MCP 注册可靠性。

---

### DeepSeek TUI / Codewhale

**定位：** 处于 runtime 架构拆分期的 TUI / Agent runtime 项目，正在增强可复用 runtime 能力。  
**功能侧重：**

- Runtime / TUI 分层
- Workflow Runtime
- 后台任务可见性
- Provider OAuth
- Windows 路径兼容
- Rust 代码健康治理

**目标用户：** 关注本地 TUI、可嵌入 runtime、多阶段 workflow 的开发者。  
**当前短板：** runtime 边界仍在重构、后台任务 UX、文档与工具面一致性、Windows relocated state root。

---

### Kimi Code CLI

**定位：** 今日无活动，短期难以判断。  
**观察：** 如果后续继续低活跃，可能更多依赖 Moonshot / Kimi 主产品节奏，而不是高频开源社区迭代。

---

## 5. 社区热度与成熟度

### 5.1 今日最活跃梯队

**第一梯队：OpenAI Codex、OpenCode、Pi、Qwen Code**

这些项目同时具备较高 Issue 和 PR 活跃度，且问题集中在核心架构和生产可用性：

- **OpenAI Codex**：Release + 大量 PR，工程化推进明显。
- **OpenCode**：v2 迁移后回归密集，但修复响应快。
- **Pi**：Issue / PR 质量较高，偏高级 Agent runtime 和 Provider 兼容。
- **Qwen Code**：Managed Agent / Web Shell / SDK contract 同时推进，平台化特征明显。

### 5.2 快速发布但问题也集中的项目

**Claude Code、GitHub Copilot CLI、Gemini CLI**

- **Claude Code** 发布 v2.1.296，但今日无 PR 更新；社区反馈集中在 Desktop 和稳定性。
- **GitHub Copilot CLI** 连续发布多个 1.0.96 预发布版本，说明快速迭代中，但 PR 公开活跃度较低。
- **Gemini CLI** Issue 数较少，但 PR 响应快，维护节奏较稳定。

### 5.3 架构重构期项目

**DeepSeek TUI / Codewhale**

当前重点不是大功能发布，而是 Runtime / TUI 拆分、dead_code 清理、路径兼容和 Workflow Runtime 修复。  
这类项目短期可能出现较多内部重构 Issue，但长期有利于形成可复用 runtime 层。

### 5.4 低活跃项目

**Kimi Code CLI**

过去 24 小时无活动，短期社区热度较低。对技术选型者而言，需要观察其后续 release 频率、Issue 响应速度和生态扩展情况。

---

## 6. 值得关注的趋势信号

### 6.1 AI CLI 正在平台化，而不是工具化

从 Qwen Code 的 Managed Agent、Codex 的 Computer Use / Dots、Claude Code 的 Desktop Code tab、Copilot CLI 的 ACP、OpenCode 的 MCP / Code Mode 可以看出，AI CLI 正在变成：

- Agent runtime
- 多端工作台
- 工具调用平台
- 长任务执行器
- 企业策略执行层
- 多 Provider 编排入口

**对开发者的参考价值：** 选型时不要只看模型能力，还要看 runtime、权限、恢复、插件、API contract 是否成熟。

---

### 6.2 长任务可靠性成为核心分水岭

几乎所有工具都出现了长任务相关问题：

- 卡住
- 无法停止
- 后台不可见
- 状态不同步
- 恢复后丢失 branch / checkpoint
- 中断后丢失部分结果
- 子任务未启动但显示 running

**对开发者的参考价值：** 如果用于真实工程自动化，应优先评估：

- 是否有任务列表 / task inspector
- 是否支持 cancel / resume / branch
- 是否有 durable transcript
- 是否能恢复工具调用上下文
- 是否能隔离单任务失败

---

### 6.3 Windows 是企业落地的关键短板

Windows 问题不是个别项目现象，而是全生态共性问题。  
涉及 Git Bash、PowerShell、Desktop app、沙箱、路径长度、junction、symlink、winget、Server 环境等。

**对开发者的参考价值：**

- Windows 团队采用前应做专项 PoC。
- 重点测试非 C 盘、长路径、企业代理、Git 凭据、沙箱、本地构建工具。
- 不要默认 macOS / Linux 上稳定就能迁移到 Windows。

---

### 6.4 安全与权限模型进入“可解释性竞争”

越来越多工具已经具备安全拦截，但社区真正需要的是：

- 为什么拒绝？
- 谁做的决策？
- 是否可审批？
- 是否有 review ID？
- 是否可申诉？
- 是否能区分合法审计和真实攻击？
- 是否能为企业策略生成审计日志？

**对开发者的参考价值：** 企业选型时，应把权限决策可观测性纳入关键指标，而不是只看“是否有沙箱”。

---

### 6.5 MCP 和插件生态正在成为扩展标准，但仍不成熟

MCP 工具注册、OAuth、本地 localhost、凭据热更新、401 状态、插件焦点、工具面文档一致性都是高频问题。  
这说明 MCP / 插件已被大量实际使用，但可靠性还处于快速打磨阶段。

**对开发者的参考价值：**

- 构建 MCP 工具时，要关注认证刷新、状态恢复、工具发现和错误提示。
- 不同客户端的 MCP 行为可能不一致，需要兼容测试。
- 插件 UI 能力尚未达到 IDE 插件级成熟度。

---

### 6.6 Multi-Agent 正在从概念走向工程化

Qwen Code 的 agent identity、team record、child workspace；Claude Code 的 subagent autoCompact；Copilot CLI 的 BYOK sub-agent；DeepSeek / Codewhale 的 workflow gate；Pi 的 SDK lifecycle 都说明 Multi-Agent 正在进入实现细节阶段。

**对开发者的参考价值：**

- 未来 Agent 系统需要明确 agent identity、任务树、权限边界、工作区隔离、失败恢复。
- 简单“多个 agent 并发”不够，关键是状态归因和可控中断。
- 多 Agent 平台会推动 API contract、event stream、workspace isolation 变成核心能力。

---

### 6.7 Provider 兼容层会长期复杂化

Pi、OpenCode、Qwen Code、Copilot CLI 都出现了 Provider / 模型路由问题：

- OpenAI-compatible 并不等于完全兼容。
- role、tool call、Responses / Completions API、thinking 参数、cache control、generation guide 都可能不同。
- BYOK 场景下，session 级配置可能与 sub-agent 模型能力冲突。

**对开发者的参考价值：**

- 多模型接入要避免硬编码单一 API 假设。
- 需要按模型能力做 routing 和 feature detection。
- Provider 错误信息应被标准化，否则排障成本很高。

---

## 结论

今日 AI CLI 生态的关键词是：**平台化、长任务、跨平台、权限透明、MCP、Multi-Agent、会话恢复**。  
从成熟度看，OpenAI Codex、Qwen Code、OpenCode、Pi 的社区和工程演进最活跃；Claude Code 和 Copilot CLI 具备强产品入口但仍在补齐 Desktop / 沙箱 / 多端稳定性；Gemini CLI 更偏轻量 CLI 稳定迭代；DeepSeek TUI / Codewhale 处于 runtime 架构重构期；Kimi Code CLI 今日无明显社区信号。  

对技术决策者而言，当前选型不应只比较模型效果，而应重点评估：

1. 长任务是否可靠；
2. Windows / 企业网络是否可用；
3. 沙箱和安全策略是否透明；
4. MCP / 插件生态是否稳定；
5. 会话恢复和任务状态是否一致；
6. 是否支持未来 Multi-Agent 和多 Provider 扩展。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告  
数据截止：2026-10-10  
说明：PR 评论数字段为 `undefined`，以下按题目给出的“热门 PR 排序”及 Issue 评论/👍 综合判断社区关注度。

---

## 1. 热门 Skills 排行

### 1) `mcp-builder`：MCP 2.0 兼容与自定义 Header 支持  
- **PR**：[anthropics/skills#1742](https://github.com/anthropics/skills/pull/1742)  
- **状态**：Open  
- **功能/变更**：修复 `mcp>=2.0.0` 中 `streamablehttp_client` 重命名为 `streamable_http_client` 后导致的导入问题，并支持通过新版 HTTP client 机制配置自定义 headers。  
- **讨论热点**：MCP 生态升级后，现有 skill-builder / mcp-builder 的兼容性、真实 MCP server 连接稳定性、认证 headers 配置方式。  
- **社区信号**：与 Issue [#1390](https://github.com/anthropics/skills/issues/1390) 中 MCP 评测失败问题方向一致，说明 MCP 构建/评测链路是高频痛点。

---

### 2) `skill-creator`：触发评测隔离、Windows 兼容与运行时失败处理  
- **PR**：[anthropics/skills#1298](https://github.com/anthropics/skills/pull/1298)  
- **状态**：Open  
- **功能/变更**：改进 trigger evaluation，解决并发 worker 互相干扰、Windows 下 `select()` 不兼容、运行时失败被误判为非触发等问题。  
- **讨论热点**：Skill 创建质量评测是否可信、触发率是否被低估、跨平台可用性。  
- **社区信号**：与多个 Issue 强相关，包括 [#556](https://github.com/anthropics/skills/issues/556)、[#1352](https://github.com/anthropics/skills/issues/1352)、[#1383](https://github.com/anthropics/skills/issues/1383)，是当前 `skill-creator` 可靠性问题的核心修复方向。

---

### 3) `proofcore-contract-auditor`：智能合约审计与链上存证  
- **PR**：[anthropics/skills#1771](https://github.com/anthropics/skills/pull/1771)  
- **状态**：Open  
- **功能/变更**：新增 Web3 合约审计 Skill，面向 Solidity / Rust 智能合约进行静态分析，并将审计证明锚定到 TON 区块链。  
- **讨论热点**：AI 辅助安全审计、链上可验证审计证明、Web3 开发者工作流自动化。  
- **社区信号**：体现社区对“垂直领域专业 Skill”的需求，尤其是安全、审计、合规类自动化。

---

### 4) `docx`：检测孤立 DOCX 评论  
- **PR**：[anthropics/skills#1734](https://github.com/anthropics/skills/pull/1734)  
- **状态**：Open  
- **功能/变更**：面向 DOCX 文档处理，检测 orphaned comments，即失去正文锚点或上下文的评论。  
- **讨论热点**：文档审阅流程中的边界情况处理、Word 文件结构解析、AI 生成/修改文档后的质量控制。  
- **社区信号**：与 DOCX 修订接受、LibreOffice 超时处理等 PR 共同说明“办公文档可靠处理”是 Skills 仓库的重要需求区。

---

### 5) `md2video-audio`：Markdown 转视频与语音旁白  
- **PR**：[anthropics/skills#1703](https://github.com/anthropics/skills/pull/1703)  
- **状态**：Open  
- **功能/变更**：将 Markdown 文档编译为带有类真人语音旁白的 MP4 视频，结合 Marp 等工具生成演示型视频内容。  
- **讨论热点**：内容生产自动化、低成本视频生成、文档到演示/培训材料的转换。  
- **社区信号**：代表“多模态内容生产 Skill”的增长方向，适合培训、产品说明、技术文档视频化场景。

---

### 6) `notion-spec-to-implementation` / `quantitative-resume-auditor`  
- **PR**：[anthropics/skills#1245](https://github.com/anthropics/skills/pull/1245)  
- **状态**：Open  
- **功能/变更**：  
  - `notion-spec-to-implementation`：将 Notion 中的产品/技术规格转化为可执行开发任务、验收标准和进度跟踪。  
  - `quantitative-resume-auditor`：量化分析简历质量。  
- **讨论热点**：产品规格到工程任务的自动拆解、知识库/项目管理工具与 Claude Code 的连接、职业文档评估。  
- **社区信号**：工作流自动化和企业协作是社区长期关注点。

---

### 7) `document-typography`：AI 生成文档排版质量控制  
- **PR**：[anthropics/skills#514](https://github.com/anthropics/skills/pull/514)  
- **状态**：Open  
- **功能/变更**：检测并修复 AI 生成文档中的排版问题，例如孤行、寡行、标题悬挂、编号错位等。  
- **讨论热点**：文档交付质量、AI 生成内容的专业化排版、长文档质量检查。  
- **社区信号**：文档类 Skills 不仅停留在“生成”，正在转向“可交付质量控制”。

---

### 8) `AWT`：AI 驱动的端到端测试 Skill  
- **PR**：[anthropics/skills#822](https://github.com/anthropics/skills/pull/822)  
- **状态**：Open  
- **功能/变更**：引入 AI Watch Tester，支持基于视觉和浏览器控制的 E2E 测试，强调零代码测试生成。  
- **讨论热点**：自动化测试生成、浏览器操作、视觉理解、质量保障。  
- **社区信号**：与 webapp-testing 相关修复 PR 一起表明，测试自动化是 Claude Code Skills 的重要落地方向。

---

## 2. 社区需求趋势

### 趋势一：Skill 安全、信任边界与命名空间治理  
- **代表 Issue**：[Security: Community skills distributed under anthropic/ namespace enable trust boundary abuse #492](https://github.com/anthropics/skills/issues/492)  
- **信号**：43 条评论，是当前最热 Issue。  
- **需求总结**：社区强烈希望区分官方 Skills 与社区 Skills，避免用户误以为社区 Skill 是 Anthropic 官方发布，从而授予过高权限。  
- **潜在方向**：Skill 签名、官方/社区命名空间隔离、权限提示、Marketplace 审核机制、安全标签。

---

### 趋势二：组织级 Skill 分享与企业协作  
- **代表 Issue**：[Enable org-wide skill sharing in Claude.ai #228](https://github.com/anthropics/skills/issues/228)  
- **信号**：16 条评论，8 个 👍。  
- **需求总结**：用户希望在组织内部直接共享 Skill，而不是手动下载 `.skill` 文件再通过 Slack/Teams 分发。  
- **潜在方向**：组织 Skill Library、共享链接、企业级 Skill 管理、权限和版本控制。

---

### 趋势三：`skill-creator` 评测链路可靠性  
- **代表 Issues**：  
  - [run_eval.py: claude -p never triggers skills/commands #556](https://github.com/anthropics/skills/issues/556)  
  - [skill-creator: run_eval.py parallel workers cross-match skill UUIDs #1352](https://github.com/anthropics/skills/issues/1352)  
  - [skill-creator: silent benchmark failures #1383](https://github.com/anthropics/skills/issues/1383)  
- **需求总结**：社区希望 Skill 创建、触发评测、benchmark 结果更加可信，避免 0% trigger rate、并发误判、Windows 不兼容等问题。  
- **潜在方向**：标准化评测框架、隔离执行环境、跨平台兼容、可解释评测报告。

---

### 趋势四：文档处理与办公自动化  
- **代表 PR / Issue**：  
  - [Detect orphaned docx comments #1734](https://github.com/anthropics/skills/pull/1734)  
  - [fix(docx): report LibreOffice timeout as an error #1792](https://github.com/anthropics/skills/pull/1792)  
  - [Add document-typography skill #514](https://github.com/anthropics/skills/pull/514)  
  - [Add ODT skill #486](https://github.com/anthropics/skills/pull/486)  
- **需求总结**：社区不仅需要生成文档，还需要可靠读取、转换、审阅、排版和修复 Office / OpenDocument 文件。  
- **潜在方向**：DOCX/ODT/PDF 一体化处理、修订模式处理、评论处理、格式质量检测。

---

### 趋势五：测试生成与 Web 应用质量保障  
- **代表 PR**：  
  - [AWT E2E testing skill #822](https://github.com/anthropics/skills/pull/822)  
  - [webapp-testing: avoid shell=True #1980](https://github.com/anthropics/skills/pull/1980)  
  - [webapp-testing: report textarea and select correctly #1976](https://github.com/anthropics/skills/pull/1976)  
- **需求总结**：社区关注 AI 自动探索 UI、生成 E2E 测试、提升 webapp-testing 的安全性和元素识别准确度。  
- **潜在方向**：零代码测试、浏览器自动化、视觉测试、测试报告生成。

---

### 趋势六：上下文窗口与 Token 经济性  
- **代表 Issue**：[claude-api skill eagerly injects ~156k tokens #1487](https://github.com/anthropics/skills/issues/1487)  
- **需求总结**：大型 Skill 如果一次性注入过多上下文，会迅速耗尽上下文窗口。社区希望 Skill 更懒加载、更模块化。  
- **潜在方向**：按需加载资源、分层文档、索引式检索、最小上下文注入。

---

### 趋势七：Agent 治理、质量门禁与推理校验  
- **代表 Issues**：  
  - [agent-governance #412](https://github.com/anthropics/skills/issues/412)  
  - [Reasoning Quality Gate Pipeline #1385](https://github.com/anthropics/skills/issues/1385)  
  - [compact-memory #1329](https://github.com/anthropics/skills/issues/1329)  
- **需求总结**：社区开始关注 Agent 长流程执行中的治理、记忆压缩、质量门禁、交付前验证。  
- **潜在方向**：任务前校准、对抗审查、交付验证、长期记忆压缩、Agent 审计轨迹。

---

## 3. 高潜力待合并 Skills / PR

### 1) `skill-creator` 评测修复系列  
- **PR**：  
  - [#1298](https://github.com/anthropics/skills/pull/1298)  
  - [#1681](https://github.com/anthropics/skills/pull/1681)  
  - [#1961](https://github.com/anthropics/skills/pull/1961)  
- **状态**：Open  
- **落地潜力**：高  
- **原因**：多个热门 Issue 均指向 `skill-creator` 的评测、打包、Viewer 安全问题。该 Skill 是创建其他 Skills 的基础设施，修复优先级应较高。

---

### 2) `mcp-builder` 兼容与评测修复  
- **PR**：[mcp-builder MCP 2.0 support #1742](https://github.com/anthropics/skills/pull/1742)  
- **相关 Issue**：[mcp-builder evaluation.py scores 0/N #1390](https://github.com/anthropics/skills/issues/1390)  
- **状态**：Open  
- **落地潜力**：高  
- **原因**：MCP 正成为 Claude Code 外部工具集成的重要接口，版本兼容和真实服务器评测能力直接影响开发者采用。

---

### 3) `docx` 文档审阅与修订处理增强  
- **PR**：  
  - [Detect orphaned docx comments #1734](https://github.com/anthropics/skills/pull/1734)  
  - [fix(docx): report LibreOffice timeout as an error #1792](https://github.com/anthropics/skills/pull/1792)  
- **状态**：Open  
- **落地潜力**：中高  
- **原因**：文档处理是官方 Skills 的核心场景之一，修订、评论、超时错误等都是实际办公流程中的高频问题。

---

### 4) `AWT` / `webapp-testing` 测试自动化方向  
- **PR**：  
  - [AWT AI-powered E2E testing skill #822](https://github.com/anthropics/skills/pull/822)  
  - [webapp-testing: avoid shell=True #1980](https://github.com/anthropics/skills/pull/1980)  
  - [webapp-testing: report textarea and select correctly #1976](https://github.com/anthropics/skills/pull/1976)  
- **状态**：Open  
- **落地潜力**：中高  
- **原因**：AI 自动生成测试是 Claude Code 与工程团队结合的天然场景，但需要先解决安全执行和 DOM 元素识别准确性问题。

---

### 5) `document-typography` / `ODT` 文档质量与格式扩展  
- **PR**：  
  - [document-typography #514](https://github.com/anthropics/skills/pull/514)  
  - [ODT skill #486](https://github.com/anthropics/skills/pull/486)  
- **状态**：Open  
- **落地潜力**：中  
- **原因**：文档类 Skill 已有稳定需求，新增排版质检和 OpenDocument 支持能补足企业文档交付链路。

---

### 6) `notion-spec-to-implementation` 工作流自动化  
- **PR**：[notion-spec-to-implementation and quantitative-resume-auditor #1245](https://github.com/anthropics/skills/pull/1245)  
- **状态**：Open  
- **落地潜力**：中  
- **原因**：将 Notion 规格文档转化为开发任务，契合产品、工程、项目管理协作需求；但该 PR 同时包含多个 Skill，可能需要拆分或收敛范围后更易合并。

---

### 7) `md2video-audio` 内容生产自动化  
- **PR**：[md2video-audio #1703](https://github.com/anthropics/skills/pull/1703)  
- **状态**：Open  
- **落地潜力**：中  
- **原因**：Markdown 到视频/语音是高价值内容生产场景，但依赖链、音频生成质量、跨平台稳定性可能是合并前重点审查点。

---

## 4. Skills 生态洞察

**一句话总结：当前 Claude Code Skills 社区最集中的诉求，是让 Skills 从“可编写、可分享”走向“可信、安全、可评测、可在真实工作流中稳定落地”。**

---

# Claude Code 社区动态日报｜2026-10-10

## 1. 今日速览

过去 24 小时，Claude Code 发布了 **v2.1.296**，重点增强了 Claude Desktop Code tab 的策略管理能力，并为 subagent 增加 `autoCompactWindow` 配置。社区反馈集中在 **Desktop Code tab、Windows Bash、权限管理、插件焦点、模型拒答/误判安全风险** 等方向，显示 Claude Code 在多端体验和自动化稳定性上仍有较多改进空间。

今日没有新的 Pull Request 更新；Issue 活跃度较高，但多数新 Issue 评论数较少，说明反馈主要处于问题上报和待 triage 阶段。

---

## 2. 版本发布

### v2.1.296

链接：https://github.com/anthropics/claude-code/releases/tag/v2.1.296

本次发布主要包含两项更新：

1. **Claude apps gateway 策略增强**
   - 在 `managed.policies[]` 中新增 `code` key。
   - 该配置与 `cli` 使用相同设置，并会应用到 Claude Desktop 的 Code tab。
   - 配合 `desktop` 时，可开启 Claude Desktop 的 gateway mode。
   - 这意味着企业或团队管理员可以更细粒度地统一管理 CLI 与 Desktop Code tab 行为。

2. **Subagent 支持 `autoCompactWindow`**
   - 可在 subagent frontmatter 和 `--agents` 定义中配置 `autoCompactWindow`。
   - 这与上下文压缩、长任务执行、agent 生命周期管理相关。
   - 不过今日也出现了与 `autoCompactWindow` 相关的 thrashing 报告，说明该能力仍需在真实场景中进一步打磨。

---

## 3. 社区热点 Issues

### 1. GitHub integration：仓库未正确连接

链接：https://github.com/anthropics/claude-code/issues/100944

用户反馈已注册 Claude Code 和 GitHub，并安装 GitHub App，但在首次使用时仓库没有连接成功。  
**重要性**：GitHub 集成是 Claude Code 工作流入口之一，首次配置失败会直接影响新用户转化。  
**社区反应**：该 Issue 有 1 条评论，是今日少数已有互动的问题，说明集成配置问题具有一定普遍性或支持优先级。

---

### 2. Windows Bash 命令长度被截断，反斜杠被错误处理

链接：https://github.com/anthropics/claude-code/issues/100936

用户在 Windows 11 + Git Bash 环境中报告，Bash tool 命令在约 8,191 字符处被截断，且每次 SessionStart 后环境前缀会增长；同时双反斜杠在进入 shell 前被减半。  
**重要性**：这会影响长命令、脚本注入、路径处理和 Windows 自动化稳定性。  
**社区反应**：已有 1 条评论，且复现环境描述详细，适合工程团队定位。

---

### 3. `autoCompactWindow` 较小时触发 Autocompact thrashing，导致 subagent 被杀

链接：https://github.com/anthropics/claude-code/issues/100932

用户设置 `autoCompactWindow: 100000` 后，仅少量工具调用就触发 “Autocompact is thrashing”，并导致 session 和 subagent 中断。  
**重要性**：v2.1.296 刚刚强化了 subagent 的 `autoCompactWindow` 配置，这个问题直接关系到新功能的可用性。  
**社区反应**：已有 1 条评论，且标签覆盖 `area:core`、`area:agents`、`platform:android`，需要关注是否为跨端问题。

---

### 4. Desktop Code tab：闲置 30 分钟后 Browser pane 标签页自动关闭

链接：https://github.com/anthropics/claude-code/issues/100975

用户反馈 Claude Desktop Code tab 中的 Browser pane tabs 在 30 分钟未查看后会自动关闭，且无法关闭该行为。  
**重要性**：对同时维护多个项目、依赖浏览器上下文的开发者影响较大，容易丢失任务状态。  
**社区反应**：暂无评论，但问题描述清晰，属于典型的开发者体验/会话持久化需求。

---

### 5. Auto mode 的终端提示阻塞 Remote Control 会话

链接：https://github.com/anthropics/claude-code/issues/100974

在 auto mode 下，“Teach auto mode about your environment?” 只出现在终端中，Remote Control 客户端看不到，导致会话表现为卡住；误按 Enter 还会进入 `/auto-mode-setup`。  
**重要性**：Remote Control 是 Claude Code 多端协同的重要能力，终端-only prompt 会破坏远程使用体验。  
**社区反应**：带有 `has repro` 标签，说明该问题具备可复现性，修复优先级应较高。

---

### 6. Desktop Code tab：撤回/编辑消息会杀掉所有后台任务

链接：https://github.com/anthropics/claude-code/issues/100973

用户报告在 macOS Desktop Code tab 中，撤回或编辑消息会终止所有后台任务，包括 rewind 点之前启动的任务；而终端版本保留这些任务。  
**重要性**：这会影响长期运行任务、subagent、后台构建或测试流程，且 Desktop 与终端行为不一致。  
**社区反应**：暂无评论，但引用了此前关闭为 fixed 的问题，可能是回归或修复不完整。

---

### 7. Windows Server 2022 启动挂起，占用约 1 个 CPU core

链接：https://github.com/anthropics/claude-code/issues/100969

用户在 Windows Server 2022 上报告 Claude Code 启动后无输出、进程占用 CPU，即使用干净 `CLAUDE_CONFIG_DIR` 也无法解决。  
**重要性**：影响 Windows Server、CI、远程开发机等非桌面环境的可用性。  
**社区反应**：标记为 `duplicate` 和 `regression`，说明已有类似问题，且可能是近期版本引入。

---

### 8. Desktop 插件 pane 中 `Input` 无法获得键盘焦点

链接：https://github.com/anthropics/claude-code/issues/100966

用户反馈 Desktop app 中插件 pane 的 `Input` 无法获取键盘焦点，即使 `autoFocus` 和 `$.ui.focus` 都显示成功。  
**重要性**：插件生态依赖稳定的 UI 交互能力；输入框无法聚焦会严重限制插件交互场景。  
**社区反应**：带 `has repro`，定位到 `area:plugins` 和 `area:desktop`，对插件开发者影响明显。

---

### 9. 安全分类器误报，阻止认证架构文档工作

链接：https://github.com/anthropics/claude-code/issues/100965

用户在编写自有遗留认证系统的架构文档时，被安全分类器误判拦截。  
**重要性**：安全策略误报会影响企业内部治理、审计、架构文档等合法场景。  
**社区反应**：暂无评论，但同日还有多个 security classifier / safeguards 相关反馈，显示安全误判是高频问题。

---

### 10. 插件 pane 在 prompt 交互后失去焦点，点击也无法恢复

链接：https://github.com/anthropics/claude-code/issues/100958

用户反馈 Claude Code 2.1.295 和 2.1.296 中，插件 pane 在 prompt 获取焦点后无法重新通过点击获得键盘焦点；该行为在 2.1.289 正常。  
**重要性**：这是明确的插件交互回归，影响 hotkey、按钮、面板输入等插件能力。  
**社区反应**：带 `has repro`、`regression`，且给出版本对比，具备较高修复价值。

---

## 4. 重要 PR 进展

过去 24 小时内没有更新的 Pull Request。

链接：https://github.com/anthropics/claude-code/pulls

因此今日无可跟踪的 PR 合并、评审或修复进展。当前社区动态主要集中在 Issue 反馈，尤其是 Desktop Code tab、Windows Bash、插件 UI、权限和安全策略误报。

---

## 5. 功能需求趋势

### 1. Desktop Code tab 体验持续成为重点

相关 Issue：

- Browser pane tabs 自动关闭：https://github.com/anthropics/claude-code/issues/100975
- 编辑消息杀掉后台任务：https://github.com/anthropics/claude-code/issues/100973
- 远程设备删除权限问题：https://github.com/anthropics/claude-code/issues/100962
- 多台电脑切换异常：https://github.com/anthropics/claude-code/issues/100952

趋势判断：  
Claude Desktop Code tab 正在承载越来越多本地开发、远程控制和浏览器辅助能力，但会话持久化、后台任务生命周期、设备切换、权限继承仍需增强。

---

### 2. 插件系统需要更稳定的 UI 与焦点模型

相关 Issue：

- 插件 `Input` 无法获得键盘焦点：https://github.com/anthropics/claude-code/issues/100966
- 插件 pane 失焦后无法恢复：https://github.com/anthropics/claude-code/issues/100958
- 插件被误判为安全风险：https://github.com/anthropics/claude-code/issues/100959

趋势判断：  
插件开发者对 pane、Input、hotkey、focus API 的一致性要求较高。当前焦点管理问题会阻碍更复杂的插件 UI 场景落地。

---

### 3. Windows 平台兼容性仍是高频痛点

相关 Issue：

- Bash 命令长度截断和路径转义问题：https://github.com/anthropics/claude-code/issues/100936
- Windows Server 2022 启动挂起：https://github.com/anthropics/claude-code/issues/100969
- 非 C 盘项目 Bash tool EINVAL：https://github.com/anthropics/claude-code/issues/100957

趋势判断：  
Windows 用户集中遇到 shell、路径、启动、磁盘位置相关问题。Claude Code 若要覆盖企业 Windows 环境，需要进一步强化 Git Bash、PowerShell、非系统盘、Server 版本的兼容测试。

---

### 4. 安全策略误报影响正常开发流程

相关 Issue：

- 安全分类器阻止认证架构文档：https://github.com/anthropics/claude-code/issues/100965
- Opus 5.5 safeguards flagged session：https://github.com/anthropics/claude-code/issues/100964
- README review 插件被标记为安全风险：https://github.com/anthropics/claude-code/issues/100959

趋势判断：  
社区关注点不是简单要求降低安全策略，而是希望安全分类器能够更好地区分合法的内部审计、文档、插件检查与真实风险操作。

---

### 5. Agent 与上下文压缩机制需要更可解释

相关 Issue：

- Autocompact thrashing：https://github.com/anthropics/claude-code/issues/100932
- subagent/background tasks 被中止：https://github.com/anthropics/claude-code/issues/100973

趋势判断：  
随着 subagent 和 autoCompactWindow 配置开放，开发者需要更明确的压缩触发规则、错误信息和恢复机制。当前错误提示可能误导用户将问题归因于文件或工具输出。

---

### 6. GitHub 集成和项目连接仍需降低上手门槛

相关 Issue：

- GitHub integration 首次连接失败：https://github.com/anthropics/claude-code/issues/100944
- Ruflo GitHub integration / plugin 操作疑问：https://github.com/anthropics/claude-code/issues/100951

趋势判断：  
GitHub App 安装、仓库授权、插件命令和项目连接流程仍可能让新用户困惑，需要更清晰的诊断提示与文档引导。

---

## 6. 开发者关注点

### 1. “可控性”和“状态保留”是 Desktop 用户的核心诉求

开发者希望 Claude Desktop Code tab 能像 IDE 一样可靠地保留浏览器标签、后台任务、远程设备状态和权限配置。自动关闭、自动中断、无法切换设备等行为会破坏长期任务流。

---

### 2. 插件开发者需要稳定的前端交互契约

多个 Issue 指向插件 pane 的焦点问题。对插件生态而言，`focus`、`autoFocus`、hotkey、Input 激活等基础能力必须稳定，否则插件很难承载复杂交互。

---

### 3. Windows 支持需要从“可运行”走向“可生产使用”

Windows 用户反馈的问题已经不仅是安装失败，而是命令截断、路径转义、非 C 盘、Server 环境、CPU 占用等工程细节。这些问题会直接影响企业和远程开发环境采用。

---

### 4. 模型与安全策略的“误拒”和“误报”影响信任

今日多个 Issue 涉及模型拒绝基础任务、安全分类器误判、safeguards 标记合法会话。开发者希望 Claude Code 在安全边界上更透明，最好能提供误报申诉、上下文解释和可恢复路径。

---

### 5. Agent 长任务需要更好的生命周期管理

subagent 被 autocompact thrashing 杀掉、Desktop rewind 杀掉所有后台任务等问题，说明 Claude Code 的 agent 生命周期还需要更细粒度控制。开发者更希望看到类似任务隔离、后台任务保留、失败恢复、压缩阈值解释等能力。

---

### 6. GitHub 与远程协作仍需要更低摩擦

从 GitHub integration 到 Remote Control，再到多设备切换，用户正在把 Claude Code 用作跨仓库、跨设备、跨会话的开发代理。当前主要瓶颈是连接状态不透明、配置失败不易诊断、远程 UI 与本地终端行为不一致。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报  
**日期：2026-10-10**  
**仓库：openai/codex**

## 1. 今日速览

过去 24 小时，Codex 社区活跃度较高：发布了稳定补丁版 `rust-v0.162.1`，同时继续推进 `0.163.0-alpha` 系列预发布。社区反馈集中在 **Windows 桌面端沙箱 / Computer Use / 工具调用失败**、**macOS DeviceCheck 403 与工作区加载失败**、以及 **安全检查误拦截与审批链路不透明** 等方向。

PR 侧则以基础设施稳定性为主，覆盖 Windows MXC 沙箱、exec-server 兼容性、code-mode 终止语义、语音会话失败分类、代理回退、输出 token replay 等能力，显示团队正在加强运行时可靠性与可观测性。

---

## 2. 版本发布

### rust-v0.162.1  
链接：<https://github.com/openai/codex/releases/tag/rust-v0.162.1>

本次为 Bug Fix 版本，重点修复：

- **TUI 崩溃问题**：当异步问题包含多行内容时，TUI 可能崩溃；新版本保留换行与完整超链接目标。关联：#51866
- **后台 server 与 CLI feature 设置不一致导致启动失败**：修复运行中的后台服务 feature 设置与 CLI 默认值不一致时造成的启动问题，增强兼容性检查。

### rust-v0.163.0-alpha.5  
链接：<https://github.com/openai/codex/releases/tag/rust-v0.163.0-alpha.5>

`0.163.0` 系列 alpha 版本继续迭代，当前 release notes 较简略，主要用于预发布验证。

### rust-v0.163.0-alpha.4  
链接：<https://github.com/openai/codex/releases/tag/rust-v0.163.0-alpha.4>

同属 `0.163.0` 预发布通道，预计用于验证后续 CLI / runtime / app-server 相关改动。

---

## 3. 社区热点 Issues

### 1. Windows ChatGPT Work 任务停滞，无法从受限桌面控制状态分支  
Issue：[#52776](https://github.com/openai/codex/issues/52776)  
标签：`bug`, `windows-os`, `session`, `computer-use`  
评论数：4

该问题描述了 Windows 上长任务执行中，Highwatch Builder 因桌面控制限制停止工作，并且用户无法从停滞会话中分支继续。  
重要性在于它影响 **长时间自动化任务的可恢复性**，尤其是 Computer Use 场景下的会话管理与权限降级体验。

---

### 2. macOS 桌面端 Annotate 无法在公开 HTTPS 页面打开  
Issue：[#52761](https://github.com/openai/codex/issues/52761)  
标签：`bug`, `app`, `browser`  
评论数：3

用户报告 macOS Codex / ChatGPT 桌面端在公开 HTTPS 页面上无法打开 Annotate。  
该问题涉及浏览器集成与网页标注能力，对使用 Codex 进行网页审阅、调试和资料整理的开发者影响较大。

---

### 3. macOS DeviceCheck registration failed 403  
Issue：[#52746](https://github.com/openai/codex/issues/52746)  
标签：`bug`, `auth`, `app`  
评论数：3

用户反馈历史会话可用，但新聊天入口提示无法加载工作区设置，应用内反馈也失败，日志中出现 `DeviceCheck registration failed (403)`。  
该问题与认证、设备校验和工作区配置加载相关，可能影响新会话创建与反馈提交流程。

---

### 4. S3 一致性修复被安全检查反复阻断，疑似误报  
Issue：[#52773](https://github.com/openai/codex/issues/52773)  
标签：`bug`, `CLI`, `safety-check`  
评论数：2

用户在自有项目中进行 S3 storage consistency 修复时，被 safety checks 多次拦截。  
该问题的重要性在于暴露了 **安全策略误判与开发者生产任务冲突** 的矛盾，社区希望获得更清晰的审核机制与误报申诉路径。

---

### 5. Windows 桌面端连接问题导致应用异常  
Issue：[#52731](https://github.com/openai/codex/issues/52731)  
标签：`bug`, `windows-os`, `app`, `connectivity`  
评论数：2

用户提供了反馈 ID 与 Request ID，报告 Windows 桌面端应用异常。  
虽然摘要信息有限，但结合当天大量 Windows connectivity 报告来看，该问题属于 Windows 客户端稳定性集中爆发的一部分。

---

### 6. Pro 用户希望 Codex 优先保障任务完成，而非单纯追求速度  
Issue：[#52782](https://github.com/openai/codex/issues/52782)  
标签：`enhancement`, `model-behavior`, `rate-limits`, `app`, `session`  
评论数：1

该功能请求来自 Pro 用户，强调复杂软件开发、架构审查和代码审计中，用户更重视 **任务完成率、上下文稳定性和推理质量**，而不是“turbo / ultrafast”式速度优化。  
这是今天最典型的产品方向反馈之一，反映高级用户对 Codex 的定位期待：从快速助手转向可靠工程代理。

---

### 7. Windows 工具安全拒绝缺少可追踪 Review ID，审批不可用  
Issue：[#52779](https://github.com/openai/codex/issues/52779)  
标签：`bug`, `windows-os`, `sandbox`, `app`, `safety-check`  
评论数：1

用户指出 Windows 桌面端出现工具安全拒绝时，没有可追踪的 review ID，也无法触发审批请求。  
这会严重影响调试体验：用户无法判断是策略问题、误报、权限不足还是运行时错误，也难以向支持或工程团队提供复现依据。

---

### 8. Dots 已完成请求仍显示运行 9 天以上，Stop 失败  
Issue：[#52777](https://github.com/openai/codex/issues/52777)  
标签：`bug`, `app`, `dots`  
评论数：1

macOS 桌面端中 dot-delegated activity 已完成，但 UI 仍显示任务运行超过 9 天，且 Stop 无效。  
该问题暴露 Dots 任务状态同步或生命周期管理异常，可能影响用户对后台任务是否仍在消耗资源的判断。

---

### 9. Codex CLI 0.162.1 升级后 TUI bootstrap 失败  
Issue：[#52775](https://github.com/openai/codex/issues/52775)  
标签：`bug`, `TUI`, `CLI`, `app-server`  
评论数：1

用户在 macOS 上升级到 CLI `0.162.1` 后，TUI bootstrap 失败，但通过 `-c log_dir` override 可以绕过。  
该问题与本日 `0.162.1` 发布直接相关，值得关注是否为升级路径、日志目录或 app-server 初始化状态导致的回归。

---

### 10. Windows Desktop 中 Dot 消失，但 Web 端仍可用，桌面 API 返回 Cloudflare 403  
Issue：[#52774](https://github.com/openai/codex/issues/52774)  
标签：`bug`, `windows-os`, `app`, `connectivity`, `dots`  
评论数：1

用户报告 Windows 桌面端侧边栏中的 Dot 消失，但 Web 端同一 Dot 仍在工作，桌面 API 返回 Cloudflare 403 challenge。  
该问题指向桌面端网络认证、Cloudflare challenge 处理、以及 Dots 状态同步之间的兼容性问题。

---

## 4. 重要 PR 进展

### 1. Make pinned transcript prompts clickable  
PR：[#52778](https://github.com/openai/codex/pull/52778)

让 pinned transcript prompt header 支持点击跳转到原始 prompt。  
改动还会结束文本选择、取消搜索并清除 activity focus，提升长对话中的导航体验。

---

### 2. Classify voice session failures and record terminal outcomes  
PR：[#52756](https://github.com/openai/codex/pull/52756)

为语音会话失败添加原因与生命周期阶段分类，并在最终 outcome 明确后记录 session duration。  
该 PR 提升语音功能的可观测性，避免控制发送失败覆盖更具体的 WebRTC 错误。

---

### 3. Make code-mode `exit()` stop the entire cell  
PR：[#52748](https://github.com/openai/codex/pull/52748)

修复 code-mode 中 `exit()` 被 JavaScript `catch` / `finally` / Promise callback 继续执行的问题。  
新行为是 `exit()` 终止整个 cell，且不再产生额外输出或状态变更，提升代码执行语义的一致性。

---

### 4. Add opt-in output token replay for OpenAI requests  
PR：[#52742](https://github.com/openai/codex/pull/52742)

新增默认关闭的 `output_token_replay` feature，用于请求 OpenAI provider 返回 `output.encrypted_content`。  
该能力有助于保留加密消息、工具调用输出、状态与 annotation，为调试、回放和审计提供基础。

---

### 5. Allow model catalogs to override incremental tool notices  
PR：[#52736](https://github.com/openai/codex/pull/52736)

允许 model catalog 覆盖 incremental tool notices，包括工具更新提示、工具或 namespace 移除 header、namespace instruction 更新等消息。  
这有助于不同模型或环境自定义工具提示文案，改善用户理解工具变化的体验。

---

### 6. Add observers for initial exec-server connection attempts  
PR：[#52724](https://github.com/openai/codex/pull/52724)

新增 `Environment::observe_connection_attempts` 和 `ConnectionAttemptOutcome`，用于观测初始 exec-server 连接耗时、成功、失败或取消状态。  
该 PR 对定位“连接卡住”“初始化失败”“远程执行环境不可达”等问题非常关键。

---

### 7. Add opt-in gRPC over stdio for the code-mode host  
PR：[#52723](https://github.com/openai/codex/pull/52723)

为 code-mode host 增加 `grpc+stdio://` 传输方式，并通过默认关闭的 `code_mode_host_grpc` feature flag 启用。  
它共享 lazy HTTP/2 channel 与 host process，同时保持 session state 隔离，属于 code-mode 执行架构的重要演进。

---

### 8. Retry bootstrap GETs through the system proxy after request failures  
PR：[#52702](https://github.com/openai/codex/pull/52702)

修复 bootstrap 阶段的 GET 请求在连接后、收到响应 header 前失败时不会回退到系统代理的问题。  
该改动对账号发现、云配置加载、企业网络或代理环境下的启动稳定性很重要。

---

### 9. Migrate the Windows MXC sandbox to split MXC crates  
PR：[#52707](https://github.com/openai/codex/pull/52707)

将 Windows MXC sandbox 迁移到拆分后的 MXC crates，并改进 PSEC / MXC 可用性检测。  
背景是部分过渡版 Windows 可能存在 PSEC API 符号但并未真正启用 MXC，因此需要验证 native process security environment 是否可创建。

---

### 10. Validate Windows sandbox accounts before password repair  
PR：[#52682](https://github.com/openai/codex/pull/52682)

在执行 Windows sandbox account password repair 前，先验证成功登录的账户，并确保账户未被替换、runtime 目录未被非预期所有者占用。  
该 PR 与当天大量 Windows sandbox / os error 32 / setup refresh 失败反馈高度相关，有助于提升沙箱账户修复流程安全性与可靠性。

---

## 5. 功能需求趋势

### 1. Windows 桌面端与沙箱稳定性  
相关 Issues：  
- [#52757](https://github.com/openai/codex/issues/52757)  
- [#52752](https://github.com/openai/codex/issues/52752)  
- [#52740](https://github.com/openai/codex/issues/52740)  
- [#52735](https://github.com/openai/codex/issues/52735)  
- [#52744](https://github.com/openai/codex/issues/52744)

Windows 上的 sandbox provisioning、ACL、runtime binary 占用、`os error 32`、`CreateProcessSecurityEnvironment`、`helper_unknown_error` 等问题非常集中。  
社区最关心的是：工具执行环境能否稳定初始化，以及失败时是否能给出明确可操作的修复建议。

---

### 2. Computer Use 可用性与窗口捕获能力  
相关 Issues：  
- [#52776](https://github.com/openai/codex/issues/52776)  
- [#52771](https://github.com/openai/codex/issues/52771)  
- [#52754](https://github.com/openai/codex/issues/52754)  
- [#52737](https://github.com/openai/codex/issues/52737)

Windows Computer Use 场景中，窗口捕获超时、native APIs disabled、node_repl timeout、桌面控制限制等问题频繁出现。  
这说明用户已经开始将 Codex 用于真实桌面自动化任务，但底层捕获、权限和执行链路仍需增强。

---

### 3. 安全检查透明度与误报处理  
相关 Issues：  
- [#52773](https://github.com/openai/codex/issues/52773)  
- [#52779](https://github.com/openai/codex/issues/52779)  
- [#52759](https://github.com/openai/codex/issues/52759)

用户希望 safety-check 不仅能拦截风险，也能提供可追踪 review ID、明确拒绝原因、审批入口和误报申诉机制。  
这对使用 Codex 处理企业代码、云存储、凭据流、自动化脚本的开发者尤其关键。

---

### 4. Dots / 长任务状态同步  
相关 Issues：  
- [#52777](https://github.com/openai/codex/issues/52777)  
- [#52774](https://github.com/openai/codex/issues/52774)  
- [#52765](https://github.com/openai/codex/issues/52765)

Dots 相关问题集中在任务状态不同步、桌面端消失但 Web 端仍可用、执行环境文件不可见、Stop 无效等。  
社区期待更可靠的长任务生命周期管理、跨端状态一致性和可恢复机制。

---

### 5. 连接、认证与网络兼容性  
相关 Issues：  
- [#52746](https://github.com/openai/codex/issues/52746)  
- [#52758](https://github.com/openai/codex/issues/52758)  
- [#52749](https://github.com/openai/codex/issues/52749)  
- [#52738](https://github.com/openai/codex/issues/52738)  
- [#52764](https://github.com/openai/codex/issues/52764)

DeviceCheck 403、Cloudflare 403、unknown_country、stream disconnected、reconnect loop 等问题说明 Codex 在复杂网络环境下仍存在兼容性挑战。  
相关 PR 中的系统代理回退与 exec-server 连接观测，正好对应这一类问题。

---

### 6. 高级用户对任务完成质量的要求上升  
相关 Issue：  
- [#52782](https://github.com/openai/codex/issues/52782)

Pro 用户明确提出：希望 Codex 更重视复杂任务的完成率、可靠性、上下文保持和可审计性，而不是只优化响应速度。  
这代表 Codex 社区正在从“代码生成工具”转向“工程代理平台”的使用阶段。

---

## 6. 开发者关注点

1. **Windows 体验是今日最大痛点**  
   大量反馈集中在 Windows 桌面端、沙箱、Computer Use、tool-calls 和 connectivity。尤其是 `os error 32`、runtime 文件占用、setup refresh 失败等问题，直接阻断本地执行能力。

2. **错误信息仍不够可操作**  
   多个 Issue 提到 `helper_unknown_error`、安全拒绝无 review ID、Cloudflare / DeviceCheck 403 缺少解释等情况。开发者希望错误能包含原因、组件、request ID、可复现上下文和下一步建议。

3. **安全策略需要更好的开发者工作流**  
   安全检查误报、审批不可用、凭据 stdin workflow 被阻断等问题说明，当前策略在保护用户的同时，也可能中断合法工程任务。社区希望提供显式审批、审计追踪和申诉通道。

4. **长任务与跨端状态同步需要加强**  
   Dots、Computer Use、ChatGPT Work 等场景中，任务可能跨 Web、桌面端、云执行环境运行。用户最担心的是任务卡住、状态不一致、无法停止或无法分支恢复。

5. **网络与认证边界问题影响新会话创建**  
   macOS DeviceCheck 403、Windows unknown_country、Cloudflare challenge、stream reconnect 等反馈表明，Codex 的启动链路和会话初始化仍需要更强的代理、地区、设备校验兼容性。

6. **CLI / TUI 升级路径需持续验证**  
   `0.162.1` 发布后已有用户报告 TUI bootstrap 异常，虽然存在 workaround，但说明 CLI、app-server、日志目录和后台 server feature 兼容性仍是需要重点回归测试的区域。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报  
**日期：2026-10-10**  
**仓库：google-gemini/gemini-cli**

---

## 1. 今日速览

过去 24 小时 Gemini CLI 发布了 **v0.65.0 nightly** 与 **v0.64.0-preview.1**，重点修复 JSON 响应流错误处理、字符串截断换行符保留，以及 preview 分支补丁同步问题。  
社区反馈主要集中在 **文件系统原子写入边界问题、请求长时间 loading、API 超时配置、Windows 平台测试兼容性** 等稳定性议题。  
PR 侧活跃度较高，多个修复直接回应当天 Issue，显示维护节奏偏向快速修复与发布自动化。

---

## 2. 版本发布

### v0.65.0-nightly.20261010.g9b6e0265d

链接：  
https://github.com/google-gemini/gemini-cli/releases/tag/v0.65.0-nightly.20261010.g9b6e0265d

本次 nightly 主要包含两项修复：

- **CLI JSON 请求处理增强**  
  修复 `fetchJson` 中 JSON parse 失败与 response stream 错误处理问题。  
  相关 PR：[#29658](https://github.com/google-gemini/gemini-cli/pull/29658)

- **字符串截断行为修复**  
  `truncateString` 在截断时保留行终止符，避免破坏原始文本格式。  
  相关 PR：[#29673](https://github.com/google-gemini/gemini-cli/pull/29673)

---

### v0.64.0-preview.1

链接：  
https://github.com/google-gemini/gemini-cli/releases/tag/v0.64.0-preview.1

这是针对 preview 版本的补丁发布，主要通过 cherry-pick 方式将修复合入 `v0.64.0-preview.0` 分支，并生成 `v0.64.0-preview.1`。

相关 PR：  
[#29696](https://github.com/google-gemini/gemini-cli/pull/29696)

---

## 3. 社区热点 Issues

> 数据源中过去 24 小时仅提供 5 条 Issue，以下全部纳入关注。

### 1. `write_file` / `replace` 在长文件名下触发 `ENAMETOOLONG`

Issue：[#29702](https://github.com/google-gemini/gemini-cli/issues/29702)  
状态：Open  
标签：`status/need-triage`, `area/agent`

**问题概述：**  
在原子写入改动之后，`StandardFileSystemService.writeTextFile` 会先写入同目录临时文件，再 rename 到目标文件。临时文件名由原文件名追加 `.<uuid>.tmp` 构成，额外增加约 41 字节，导致原本合法的 215–255 字节文件名超过 `NAME_MAX` 限制。

**为什么重要：**  
这会直接影响 agent 的文件写入能力，尤其是在处理真实项目中较长文件名、生成代码文件或批量替换时，可能导致看似合法的操作失败。

**社区反应：**  
该问题已有 3 条评论，并且很快出现对应修复 PR [#29703](https://github.com/google-gemini/gemini-cli/pull/29703)，说明维护侧响应较快。

---

### 2. 请求一直停留在 loading，无输出

Issue：[#29698](https://github.com/google-gemini/gemini-cli/issues/29698)  
状态：Open  
标签：`area/core`, `status/bot-triaged`, `effort/medium`

**问题概述：**  
用户反馈在笔记本上输入请求后 Gemini CLI 一直处于 loading 状态，始终没有输出。

**为什么重要：**  
这是核心交互路径问题，直接影响 CLI 的可用性。相比局部功能 bug，长时间无响应会让用户难以判断是网络、模型、鉴权还是客户端内部状态异常。

**社区反应：**  
目前评论数为 2，已被 bot triage 并标记为 core 区域，预计需要进一步收集运行环境、日志和网络状态信息。

---

### 3. 希望 60 秒 API headers timeout 可配置

Issue：[#29693](https://github.com/google-gemini/gemini-cli/issues/29693)  
状态：Open  
标签：`area/core`, `status/bot-triaged`, `effort/small`

**问题概述：**  
用户希望新增配置项或环境变量，用于控制 API request headers timeout，例如：

- `model.requestTimeoutMs`
- `GEMINI_API_HEADERS_TIMEOUT_MS`

当前部分长思考请求可能在 60 秒 header timeout 后被丢弃并重放。

**为什么重要：**  
随着模型能力增强，长上下文、复杂推理、多工具调用场景更容易出现响应启动较慢的问题。固定 60 秒超时对高级用户和企业环境不够灵活。

**社区反应：**  
该问题已被标记为 core，并且 effort 为 small，说明实现成本可能较低，但对长任务稳定性提升明显。

---

### 4. GeminiCLI.com 文档 / 安装指引反馈

Issue：[#29694](https://github.com/google-gemini/gemini-cli/issues/29694)  
状态：Open  
标签：`status/need-triage`, `area/documentation`

**问题概述：**  
用户针对 https://geminicli.com/ 提交反馈，涉及 `npm install -g @google/gemini-cli` 与 `gemini` 命令使用体验。

**为什么重要：**  
安装文档是新用户接触 Gemini CLI 的第一入口。任何安装命令、启动命令或说明不清晰的问题，都会直接影响转化和采用。

**社区反应：**  
目前评论较少，仍需 triage。建议维护者确认官网安装流程、npm 包名、命令入口以及常见问题说明是否一致。

---

### 5. Windows 无符号链接权限时 symlink 测试失败

Issue：[#29690](https://github.com/google-gemini/gemini-cli/issues/29690)  
状态：Open  
标签：`status/need-triage`, `area/platform`

**问题概述：**  
在 Windows 环境中，如果未启用 Developer Mode 或进程没有创建符号链接权限，`fileDiscoveryService.symlink.test.ts` 中调用 `fs.symlink()` 会因为 `EPERM` 失败，导致 8 个测试全部失败。

**为什么重要：**  
这是典型跨平台开发体验问题。对贡献者而言，如果本地测试在默认 Windows 环境下失败，会增加参与门槛，也会影响 CI / 下游构建环境。

**社区反应：**  
已有对应 PR [#29691](https://github.com/google-gemini/gemini-cli/pull/29691) 提出在无权限时跳过相关测试，是较直接的兼容性修复方向。

---

## 4. 重要 PR 进展

> 数据源中过去 24 小时仅提供 9 条 PR，以下全部纳入。

### 1. 修复原子写入临时文件名超过 `NAME_MAX`

PR：[#29703](https://github.com/google-gemini/gemini-cli/pull/29703)  
状态：Open  
标签：`area/agent`, `size/m`

**内容：**  
修复写入 215–255 字节长文件名时，由于临时文件追加 UUID 后超过文件系统 `NAME_MAX` 限制而触发 `ENAMETOOLONG` 的问题。

**价值：**  
直接对应 Issue [#29702](https://github.com/google-gemini/gemini-cli/issues/29702)，属于 agent 文件操作可靠性修复。

---

### 2. nightly 版本号自动提升至 `0.65.0-nightly.20261010.g9b6e0265d`

PR：[#29701](https://github.com/google-gemini/gemini-cli/pull/29701)  
状态：Open  
标签：`size/s`, `status/need-issue`

**内容：**  
自动化版本 bump，用于生成当天 nightly release。

**价值：**  
保障 nightly 发布流水线持续推进，降低人工发布成本。

---

### 3. 同步 workspace package.json 与 lockfile 版本，并在 CI 中强制校验

PR：[#29700](https://github.com/google-gemini/gemini-cli/pull/29700)  
状态：Open  
标签：`priority/p2`, `size/l`

**内容：**  
同步 workspace 中 `package.json` 的依赖版本与 `package-lock.json`，并扩展 `scripts/check-lockfile.js`，防止 workspace 间依赖版本与 lockfile 脱节。

**价值：**  
对 Nix 等 hermetic downstream build 工具尤其重要，可提升构建可复现性与依赖一致性。

---

### 4. 修复 Unicode 字符导致的反向搜索高亮偏移

PR：[#29699](https://github.com/google-gemini/gemini-cli/pull/29699)  
状态：Open  
标签：`area/core`, `size/m`

**内容：**  
修复 `Ctrl+R` 反向历史搜索中，遇到 lowercase 后长度扩展的 Unicode 字符时，高亮 substring 偏移错误的问题，例如 `İ` / `U+0130` 会转为 `i\u0307`。

**价值：**  
提升国际化文本和非 ASCII 命令历史搜索体验，避免 UI 高亮错位。

---

### 5. 生成 `v0.64.0-preview.1` changelog

PR：[#29697](https://github.com/google-gemini/gemini-cli/pull/29697)  
状态：Open  
标签：`priority/p3`, `area/documentation`, `size/s`, `maintainer only`

**内容：**  
为 `v0.64.0-preview.1` 自动生成 changelog。

**价值：**  
改善 preview 版本发布透明度，便于用户追踪补丁内容。

---

### 6. cherry-pick preview 补丁并创建 `0.64.0-preview.1`

PR：[#29696](https://github.com/google-gemini/gemini-cli/pull/29696)  
状态：Closed  
标签：`size/l`, `size/xl`, `status/need-issue`

**内容：**  
自动 cherry-pick 指定 commit 到 `v0.64.0-preview.0` 分支，并生成 `0.64.0-preview.1` 补丁版本。

**价值：**  
这是本次 preview 发布的核心补丁流程 PR，已关闭，说明相关发布动作已完成或进入后续自动化阶段。

---

### 7. 修复 Debug Console 高度计算与 terminalBuffer 闪烁

PR：[#29695](https://github.com/google-gemini/gemini-cli/pull/29695)  
状态：Open  
标签：`priority/p2`, `area/core`, `size/l`, `maintainer only`

**内容：**  
修复 `F12` Debug Console 高度 / 布局计算问题，并通过增量渲染与静态 history item memoization 改善 `terminalBuffer` 模式下的闪烁。

**价值：**  
提升调试控制台与终端渲染稳定性，对频繁使用 CLI debug 能力的开发者较关键。

---

### 8. 创建 `zzz-oss-vrp-poc-marker.test.ts`

PR：[#29692](https://github.com/google-gemini/gemini-cli/pull/29692)  
状态：Closed  
标签：`priority/p1`, `size/s`

**内容：**  
该 PR 摘要为空模板式内容，创建了一个测试文件 `zzz-oss-vrp-poc-marker.test.ts`。

**价值：**  
从标题看可能与安全验证、VRP 或 PoC 标记相关。由于已关闭且描述信息不足，建议维护者确认其关闭原因与是否涉及安全流程。

---

### 9. Windows 无符号链接权限时跳过 symlink 测试

PR：[#29691](https://github.com/google-gemini/gemini-cli/pull/29691)  
状态：Open  
标签：`area/platform`, `size/s`

**内容：**  
当 Windows 环境未启用 Developer Mode 或无 `SeCreateSymbolicLinkPrivilege` 权限时，跳过 `fileDiscoveryService.symlink.test.ts` 中依赖 `fs.symlink()` 的测试。

**价值：**  
对应 Issue [#29690](https://github.com/google-gemini/gemini-cli/issues/29690)，可降低 Windows 贡献者运行测试的阻力。

---

## 5. 功能需求趋势

### 1. 请求超时与长任务稳定性

相关 Issue：  
[#29693](https://github.com/google-gemini/gemini-cli/issues/29693)  
[#29698](https://github.com/google-gemini/gemini-cli/issues/29698)

社区开始关注长思考请求、网络等待、headers timeout 与 loading 无输出等问题。  
趋势上看，Gemini CLI 需要更细粒度的请求超时配置、日志提示和失败恢复机制，尤其是在 Vertex AI、复杂推理、慢网络或企业代理环境中。

---

### 2. 文件系统操作可靠性

相关 Issue / PR：  
[#29702](https://github.com/google-gemini/gemini-cli/issues/29702)  
[#29703](https://github.com/google-gemini/gemini-cli/pull/29703)

原子写入提升了安全性，但也暴露了文件名长度边界问题。  
未来文件系统层可能需要更系统地处理：

- 长文件名
- 跨平台路径限制
- 临时文件命名策略
- rename 原子性
- 工具调用失败后的错误提示

---

### 3. 跨平台开发与测试兼容性

相关 Issue / PR：  
[#29690](https://github.com/google-gemini/gemini-cli/issues/29690)  
[#29691](https://github.com/google-gemini/gemini-cli/pull/29691)

Windows 平台仍是测试兼容性重点区域。  
符号链接权限、路径长度、shell 差异、终端渲染等问题会持续影响贡献者体验。

---

### 4. 终端 UI 与交互细节优化

相关 PR：  
[#29699](https://github.com/google-gemini/gemini-cli/pull/29699)  
[#29695](https://github.com/google-gemini/gemini-cli/pull/29695)

近期 PR 显示维护者正在修复较细粒度的终端交互问题，包括：

- Unicode 搜索高亮
- Debug Console 高度
- terminalBuffer 闪烁
- 增量渲染与 memoization

这说明 Gemini CLI 的关注点正在从基础功能扩展到更成熟的 CLI UX。

---

### 5. 发布与依赖治理自动化

相关 PR：  
[#29701](https://github.com/google-gemini/gemini-cli/pull/29701)  
[#29700](https://github.com/google-gemini/gemini-cli/pull/29700)  
[#29696](https://github.com/google-gemini/gemini-cli/pull/29696)  
[#29697](https://github.com/google-gemini/gemini-cli/pull/29697)

自动化 release、preview patch、changelog 生成以及 lockfile 一致性校验成为持续投入方向。  
这对大型 monorepo、下游打包、可复现构建和企业采用都很重要。

---

## 6. 开发者关注点

### 1. “无响应”问题需要更好的可观测性

用户反馈 loading 后无输出，说明 CLI 在请求等待、网络错误、鉴权异常或模型响应延迟时，缺少足够清晰的状态提示。  
建议后续加强：

- verbose 日志
- 请求阶段提示
- timeout 明确报错
- 重试状态展示
- 网络 / 鉴权诊断命令

相关 Issue：  
[#29698](https://github.com/google-gemini/gemini-cli/issues/29698)

---

### 2. 超时策略应允许高级用户配置

固定 60 秒 headers timeout 对长推理任务不够友好。  
开发者希望能够通过 `settings.json` 或环境变量配置超时时间，以适配不同模型、区域、代理和企业网络环境。

相关 Issue：  
[#29693](https://github.com/google-gemini/gemini-cli/issues/29693)

---

### 3. 文件操作需要兼顾安全性与边界条件

原子写入是正确方向，但临时文件名策略需要考虑文件系统限制。  
这类问题对 AI agent 尤其重要，因为 agent 经常自动生成、重写和替换项目文件。

相关 Issue / PR：  
[#29702](https://github.com/google-gemini/gemini-cli/issues/29702)  
[#29703](https://github.com/google-gemini/gemini-cli/pull/29703)

---

### 4. Windows 贡献体验仍需优化

Windows 下 symlink 权限导致测试失败，是典型的本地开发阻塞点。  
对开源项目而言，测试应尽量检测环境能力并优雅跳过，而不是默认失败。

相关 Issue / PR：  
[#29690](https://github.com/google-gemini/gemini-cli/issues/29690)  
[#29691](https://github.com/google-gemini/gemini-cli/pull/29691)

---

### 5. CLI 终端体验正在进入细节打磨阶段

Unicode 搜索、高亮偏移、Debug Console 布局、terminalBuffer 闪烁等问题说明用户已经在较深度地使用 Gemini CLI。  
这些细节优化会显著影响高频开发者的日常体验。

相关 PR：  
[#29699](https://github.com/google-gemini/gemini-cli/pull/29699)  
[#29695](https://github.com/google-gemini/gemini-cli/pull/29695)

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报  
日期：2026-10-10  
仓库：github.com/github/copilot-cli

---

## 1. 今日速览

过去 24 小时 Copilot CLI 连续发布多个 1.0.96 预发布版本，重点围绕模型配置、沙箱交互设置、权限决策可观测性、启动性能和目录访问修复展开。社区反馈主要集中在沙箱权限、ACP 会话性能、Windows/macOS 平台兼容性、BYOK 模型路由以及桌面端项目管理能力等方面。

今日新增和更新的 Issue 数量较多，但大多数仍处于 triage 阶段，评论和点赞较少，说明问题密集出现但尚未形成大规模讨论。

---

## 2. 版本发布

### v1.0.96-2  
链接：<https://github.com/github/copilot-cli/releases/tag/v1.0.96-2>

**修复**
- `/model` 与 `/config model` 中的模型 ID 改为大小写不敏感。
- 保存配置时使用规范化后的 canonical model ID。

**影响**
- 降低用户配置模型时因大小写差异导致失败或配置不一致的概率。
- 对 BYOK、多模型切换和企业策略下的模型管理更友好。

---

### v1.0.96-1  
链接：<https://github.com/github/copilot-cli/releases/tag/v1.0.96-1>

**新增**
- 交互式沙箱设置会提示可能的环境变量密钥。
- 保存前可添加需要 masking 的 hosts。

**修复**
- 企业策略仍在解析期间，保持 `/allow-all` 可用，避免启动早期权限操作受阻。

**影响**
- 沙箱配置的安全性和可用性提升。
- 对企业用户和需要凭据注入、host masking 的开发者较重要。

---

### v1.0.96-0  
链接：<https://github.com/github/copilot-cli/releases/tag/v1.0.96-0>

**改进**
- 位于 Git 仓库中的交互式会话可更快进入输入提示。
- Timeline 现在会显示权限决策来源，包括用户、Assisted Permissions、策略或 unattended fallback。

**修复**
- `/add-dir` 会为当前会话新增目录授予沙箱访问权限。
- `/user` 相关问题修复。

**影响**
- 改善 Git 项目中的启动体验。
- 提升权限系统透明度，便于排查沙箱和策略问题。

---

### v1.0.95  
链接：<https://github.com/github/copilot-cli/releases/tag/v1.0.95>

**主要内容**
- macOS 上可用时使用原生 Microsoft Entra broker authentication，并保留浏览器 fallback。
- `copilot config` 支持 `sandbox credential injectHosts` keys。
- Bash、Zsh、Fish 增加相关 key completion。
- `--context` 现在会应用于新建和恢复的 ACP sessions，避免静默失效。

**影响**
- 企业身份认证体验改善。
- ACP session 的上下文行为更一致。
- 沙箱凭据注入能力进一步增强。

---

## 3. 社区热点 Issues

### 1. ACP session/list 分页性能严重退化  
Issue：[#5108](https://github.com/github/copilot-cli/issues/5108)  
状态：OPEN / triage  
作者：miriver  
社区反应：0 评论，0 👍

**问题概述**  
通过 ACP `copilot --acp --stdio` 调用 `session/list` 时，每一页都会重新扫描全部 session store。对于拥有数千个会话的用户，完整遍历可能耗时数分钟。

**为什么重要**  
ACP 是 Copilot CLI 与外部客户端集成的重要接口。分页接口如果每页都全量扫描，会直接影响 IDE、桌面端或第三方 agent host 的会话加载体验。

---

### 2. Windows 桌面端无法启动内置 Git，导致项目注册失败  
Issue：[#5094](https://github.com/github/copilot-cli/issues/5094)  
状态：OPEN / triage  
作者：cdelossantos-clgx  
社区反应：1 评论，0 👍

**问题概述**  
从 desktop app 1.1.27 开始，Windows 上应用无法 spawn 自带的 `git` binary，报错 `Access is denied, 0x80070005`，导致项目注册全部失败。

**为什么重要**  
这是桌面端 Windows 用户的阻断级问题。Git 是项目发现、注册和上下文管理的基础能力，一旦失败会影响 Copilot CLI/桌面端核心工作流。

---

### 3. macOS 沙箱阻止 Gradle daemon 本地连接  
Issue：[#5105](https://github.com/github/copilot-cli/issues/5105)  
状态：OPEN / triage  
作者：nugarov  
社区反应：0 评论，0 👍

**问题概述**  
即使配置允许 outbound 和 local networking，Gradle daemon 能成功启动并监听 localhost，但 Gradle client 无法连接 daemon。

**为什么重要**  
Java/Kotlin/Android 项目大量依赖 Gradle。该问题表明 macOS sandbox 的本地网络策略可能仍存在边界缺陷，会影响构建、测试和依赖解析等常见开发任务。

---

### 4. BYOK 模式下 sub-agent 使用错误 wire API 导致 400  
Issue：[#5103](https://github.com/github/copilot-cli/issues/5103)  
状态：OPEN / triage  
作者：SivaKesava1  
社区反应：0 评论，0 👍

**问题概述**  
在 BYOK 模式下，`COPILOT_PROVIDER_WIRE_API` 会作用于整个 session，包括使用不同模型族的 sub-agent。如果某些模型只支持 `completions` 或 `responses` 之一，就会出现 400 错误。

**为什么重要**  
多模型和 sub-agent 是高级 agent 工作流的核心能力。该问题暴露出 session 级别 API 配置与模型级能力之间的冲突，影响 BYOK 用户稳定性。

---

### 5. 沙箱 Git 无法使用不同于 Copilot/gh 登录身份的凭据  
Issue：[#5102](https://github.com/github/copilot-cli/issues/5102)  
状态：OPEN / triage  
作者：mxhm  
社区反应：0 评论，0 👍

**问题概述**  
`sandbox.auth.git` 只能使用 Copilot/gh 登录身份，无法提供不同凭据，例如 fine-grained PAT。沙箱还会注入最高优先级的空 `credential.helper`，覆盖用户已有 Git 凭据配置。

**为什么重要**  
企业和开源贡献者经常需要在不同仓库中使用不同身份或 token。当前行为限制了私有仓库、多组织、多账号开发场景。

---

### 6. session 事件 host ack 超时后，事件投递永久失败  
Issue：[#5100](https://github.com/github/copilot-cli/issues/5100)  
状态：OPEN / triage  
作者：ElliotChong-MS  
社区反应：0 评论，0 👍

**问题概述**  
长时间交互会话中，一旦出现 `session host did not acknowledge ... within 120s`，后续 prompt submission 会持续失败，直到 resume session。

**为什么重要**  
这影响长任务、长上下文和工具调用频繁的 agent 使用场景。一次 host ack 超时不应导致整个 session 持续不可用。

---

### 7. 添加 sandbox.userPolicy.filesystem 路径后 sessionStart hook 停止运行  
Issue：[#5098](https://github.com/github/copilot-cli/issues/5098)  
状态：OPEN / triage  
作者：wibeck1  
社区反应：1 评论，0 👍

**问题概述**  
用户添加 `readonlyPaths` 和 `readwritePaths` 后，原本会在 session start 执行的 hook 不再运行。

**为什么重要**  
hook 是自动化、环境初始化和企业策略接入的关键机制。沙箱文件系统策略不应破坏 session 生命周期 hook。

---

### 8. HOME override 导致 VS Code SDK host 误判 script_action_changed  
Issue：[#5107](https://github.com/github/copilot-cli/issues/5107)  
状态：OPEN / triage  
作者：JeanTessier-Michelin  
社区反应：0 评论，0 👍

**问题概述**  
在 VS Code SDK 集成中，只是将 `HOME` 指向一个新建的空目录并执行 `/bin/echo`，shell tool 却拒绝请求并报告 `script_action_changed`。

**为什么重要**  
这可能是权限或脚本安全检测的误报。对于 IDE SDK 集成来说，误拒绝简单命令会显著影响 agent 工具调用可靠性。

---

### 9. Windows winget 安装后使用 /upgrade 会绕过包管理器  
Issue：[#5096](https://github.com/github/copilot-cli/issues/5096)  
状态：OPEN / triage  
作者：ImperiumTakp  
社区反应：0 评论，0 👍

**问题概述**  
Windows 上通过 winget 安装 Copilot CLI 后，如果使用内置 `/upgrade`，新二进制会覆盖 winget command alias，但 winget 和“添加/删除程序”仍停留在旧版本记录。

**为什么重要**  
这会造成安装状态不一致，影响企业软件资产管理、卸载、升级和问题排查。

---

### 10. 非交互模式下 view 拒绝超过 256 字符路径的文件  
Issue：[#5095](https://github.com/github/copilot-cli/issues/5095)  
状态：OPEN / triage  
作者：ericwangffff  
社区反应：0 评论，0 👍

**问题概述**  
Windows 11 已启用 long paths，但非交互 child process 中，`view` 对超过 256 字符的路径返回权限错误，且无法向用户请求权限。

**为什么重要**  
长路径在 monorepo、生成代码、深层依赖目录中很常见。非交互模式下失败会影响自动化、CI-like agent 工作流和 IDE 后台任务。

---

## 4. 重要 PR 进展

过去 24 小时仅有 1 个 PR 更新，未达到 10 个可筛选的重要 PR 数量。

### 1. Create index.html  
PR：[#5106](https://github.com/github/copilot-cli/pull/5106)  
状态：OPEN  
作者：lg3707082-cpu  
社区反应：0 👍

**内容概述**  
该 PR 添加了一个 `index.html` 文件，并通过附件形式提供内容。

**评估**  
当前描述信息较少，尚无法判断其与 Copilot CLI 主线功能、文档或测试的直接关系。建议维护者重点检查变更范围、文件位置、用途说明以及是否符合仓库贡献规范。

---

## 5. 功能需求趋势

### 1. 沙箱权限与凭据注入能力仍是核心关注点  
相关 Issue：  
- [#5105](https://github.com/github/copilot-cli/issues/5105) macOS sandbox 与 Gradle daemon  
- [#5102](https://github.com/github/copilot-cli/issues/5102) sandboxed git 凭据选择  
- [#5098](https://github.com/github/copilot-cli/issues/5098) filesystem policy 影响 sessionStart hook  
- [#5107](https://github.com/github/copilot-cli/issues/5107) HOME override 触发误判  

社区正在集中反馈沙箱在文件系统、网络、本地进程、Git 凭据和安全检测上的边界问题。近期 release 也持续强化 sandbox credential injectHosts、masking hosts 和权限 timeline，说明该方向是当前重点演进区域。

---

### 2. ACP 与 session 管理性能开始受到关注  
相关 Issue：  
- [#5108](https://github.com/github/copilot-cli/issues/5108) `session/list` 分页重复全量扫描  
- [#5100](https://github.com/github/copilot-cli/issues/5100) session event ack 超时后不可恢复  

随着 Copilot CLI 被集成到 IDE、桌面端和第三方 agent host，session 列表、恢复、事件传输的性能和容错性变得更关键。

---

### 3. 多模型、BYOK 与模型路由稳定性需求上升  
相关 Issue：  
- [#5103](https://github.com/github/copilot-cli/issues/5103) BYOK sub-agent wire API 错配  
- [#5097](https://github.com/github/copilot-cli/issues/5097) HydraFusion 路由返回策略外模型并 fallback  
- Release [v1.0.96-2](https://github.com/github/copilot-cli/releases/tag/v1.0.96-2) 修复模型 ID 大小写问题  

用户开始更多使用 BYOK、多模型、sub-agent 和策略化模型选择，因此模型 ID 规范化、API 兼容性和路由透明度变得重要。

---

### 4. Windows/macOS 平台集成问题较多  
相关 Issue：  
- [#5094](https://github.com/github/copilot-cli/issues/5094) Windows desktop bundled git 无法 spawn  
- [#5096](https://github.com/github/copilot-cli/issues/5096) winget 安装与 `/upgrade` 状态不一致  
- [#5095](https://github.com/github/copilot-cli/issues/5095) Windows 长路径问题  
- [#5105](https://github.com/github/copilot-cli/issues/5105) macOS sandbox local networking  

跨平台安装、升级、路径、权限和本地工具调用仍是 Copilot CLI 稳定性的关键挑战。

---

### 5. 桌面端项目与会话组织能力有增强诉求  
相关 Issue：  
- [#5104](https://github.com/github/copilot-cli/issues/5104)

用户希望在桌面端将已有 chat 移入 project 或 sidebar group，并允许工具执行此类组织操作。这表明 Copilot Desktop 的项目管理和会话整理能力正在成为实际工作流需求。

---

## 6. 开发者关注点

1. **沙箱过于严格或行为不透明**  
   开发者希望沙箱既能保障安全，又不阻断 Gradle、Git、HOME override、hook 等正常开发操作。权限决策 timeline 的增强是积极信号，但仍需减少误判和不可解释失败。

2. **企业和多账号场景需要更灵活的凭据模型**  
   当前 sandboxed git 与 Copilot/gh 登录身份绑定过强，难以支持 fine-grained PAT、多组织、多身份访问。

3. **ACP 需要更好的规模化性能**  
   当 session 数量达到数千级时，分页接口重复扫描会严重拖慢客户端体验。ACP 作为集成协议，需要更稳定的索引、缓存或增量读取机制。

4. **长会话容错能力不足**  
   一次 host ack 超时会让 session 进入不可用状态，开发者期望系统能自动恢复、重试或隔离失败事件。

5. **Windows 安装与路径兼容仍需加强**  
   winget、Add/Remove Programs、command alias、长路径和桌面端内置 Git 都是 Windows 用户高频触点。安装状态一致性和原生平台兼容性需要优先处理。

6. **模型路由和 BYOK 需要更细粒度控制**  
   sub-agent 使用不同模型时，应按模型能力选择 wire API，而不是继承 session 级配置。HydraFusion 等自动路由功能也需要更清楚地解释 fallback 原因，避免静默降级。

7. **桌面端会话组织能力不足**  
   用户希望已有 chat 能被移动到 project 或 sidebar group，也希望 agent/tool 能执行这类整理操作，以支持长期项目工作流。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报  
日期：2026-10-10  
数据源：github.com/anomalyco/opencode

## 1. 今日速览

过去 24 小时 OpenCode 社区活跃度较高，主要集中在 **v2 TUI / Desktop 稳定性、Windows 兼容性、MCP/OAuth、计费额度识别、工具调用中断语义** 等方向。  
今日无新 Release，但 Issues 与 PR 均显示 v2 迁移后的回归修复仍是当前维护重点，多个 PR 已围绕权限、安全确认、文件系统、MCP 鉴权和执行中断体验展开。

---

## 2. 社区热点 Issues

### 1. TUI 新会话误报余额不足，但 CLI 正常  
链接：anomalyco/opencode Issue #54244  
状态：OPEN｜评论：4  
该问题反馈在有效 OpenCode Go 订阅下，TUI 新会话提示 “Insufficient account funds / balance”，但 CLI 使用同账号同模型正常。  
重要性在于它直接影响付费用户的核心使用路径，且 Go 用量接近 0%，说明更可能是 TUI 或账户状态同步问题，而非真实额度耗尽。

### 2. Windows TUI 滚轮与窗口缩放严重卡顿  
链接：anomalyco/opencode Issue #54239  
状态：OPEN｜评论：3  
用户报告 v2 TUI 在原生 Windows 上滚动和交互式窗口缩放出现明显输入延迟，而 Desktop GUI 不受影响。  
这是典型的 v2 TUI 性能回归，对 Windows 开发者体验影响较大，也与近期多个 Windows TUI 渲染问题形成关联。

### 3. Windows Desktop 缺少托盘图标，无法从 UI 完全退出  
链接：anomalyco/opencode Issue #54217  
状态：CLOSED｜评论：3  
该 Issue 指出 Windows Desktop 无系统托盘图标，导致用户无法通过 UI 彻底退出应用及后台服务。  
虽然已关闭，但反映出 Desktop 应用在后台服务生命周期管理上的可见性和控制体验仍需改进。

### 4. Windows 上 OpenCode CLI 启动无响应  
链接：anomalyco/opencode Issue #54213  
状态：OPEN｜评论：3  
用户在 Windows 10 Pro 上通过 NPM、winget、choco 安装后，PowerShell 中执行 `opencode` 无任何输出。  
这是高优先级可用性问题，因为它发生在安装后的第一步启动阶段，可能阻断新用户采用。

### 5. MCP 远程服务器 `{env:...}` 凭据在服务重启前解析为空  
链接：anomalyco/opencode Issue #54205  
状态：CLOSED｜评论：3  
问题指向后台服务对全局配置进行无限期缓存，导致新设置的环境变量或外部配置修改不会生效，MCP header token 被发送为空。  
该问题对使用远程 MCP、动态凭据或 CI/多环境配置的用户影响明显，也暴露了服务配置热更新机制不足。

### 6. 拒绝工具调用后被记录为 shutdown，服务重启后会恢复已拒绝回合  
链接：anomalyco/opencode Issue #54180  
状态：OPEN｜标签：reproduced｜评论：3  
当用户拒绝权限请求或取消 question tool call 后，该 turn 被记录为服务器关闭；服务重启后已拒绝的 turn 会被恢复。  
这是较严重的执行语义问题，涉及用户授权边界和会话恢复逻辑，可能导致用户已明确拒绝的操作再次进入执行流。

### 7. v2 配置中的 `instructions` 字段被解析但从未加载  
链接：anomalyco/opencode Issue #54157  
状态：CLOSED｜评论：3  
该 Issue 指出 v2 配置 schema 中仍保留 `instructions` 字段，但运行时代码没有读取或注入这些文件。  
这属于 v2 回归，影响依赖全局上下文、团队规范或项目级 ambient instructions 的高级用户。

### 8. MCP OAuth 在 `*.localhost` 上回归  
链接：anomalyco/opencode Issue #54245  
状态：OPEN｜标签：reproduced｜评论：2  
本地 MCP server 使用 `http://mcp.localhost:18259` 时 OAuth token exchange 被拒绝，提示非 HTTPS token endpoint 不允许发送凭据。  
该问题对本地 MCP 开发、调试和私有工具链集成影响较大，且明确被标记为 MCP client 升级后的回归。

### 9. `experimental.policies` 中 `permission` action 被静默丢弃  
链接：anomalyco/opencode Issue #54214  
状态：OPEN｜标签：reproduced｜评论：2  
用户反馈 v2.0.26 中配置校验器会静默丢弃 `"action": "permission"` 的策略语句，即使文档声明支持。  
这影响安全策略、硬拒绝规则和企业级权限控制，是配置系统与文档不一致的典型问题。

### 10. Code Mode `execute` 与 plugin tool 无超时，慢调用阻塞会话  
链接：anomalyco/opencode Issue #54220  
状态：OPEN｜标签：reproduced｜评论：1  
Code Mode 中 `execute` 和 plugin tool call 没有时间限制，一个慢调用会让整个会话进入忙碌状态，直到用户手动中断。  
该问题与工具后台化、执行中断结果保留等多个 Issue/PR 相关，说明长任务调度与可中断执行是近期核心痛点。

---

## 3. 重要 PR 进展

### 1. 要求 plan 执行 shell 命令前进行确认  
链接：anomalyco/opencode PR #54253  
状态：CLOSED  
该 PR 修复 v2 中 `plan` agent 可在未确认情况下运行 shell 命令的问题。  
这是重要的安全修复，避免 `opencode plan` 执行用户未批准的命令，关联 Issue #53955。

### 2. 文件列表中包含符号链接  
链接：anomalyco/opencode PR #54252  
状态：CLOSED  
修复文件树与 `GET /api/fs/list` 省略 symlink 的问题，扩展 `FileSystem.Entry` schema 以支持符号链接。  
该修复对 monorepo、pnpm workspace、工具链链接目录等场景很重要。

### 3. 中断 execute 时保留已完成的嵌套调用结果  
链接：anomalyco/opencode PR #54251  
状态：OPEN  
该 PR 对应 Issue #54222，目标是在 `execute` 被中断时保留已完成嵌套调用和日志的有限预览。  
这能显著改善 Code Mode 的可观测性，避免用户中断后丢失已完成工作的上下文。

### 4. 将 Agent Relay 添加到 V2 生态插件文档  
链接：anomalyco/opencode PR #54249  
状态：OPEN  
该文档 PR 将 Agent Relay 加入 OpenCode V2 插件生态列表。  
Agent Relay 可连接运行中的 OpenCode 会话与 Claude Code、Codex、Grok 等代理，体现社区对多 Agent 协作和跨工具互操作的兴趣。

### 5. 将 text shimmer 动画改为 opacity pulse  
链接：anomalyco/opencode PR #54248  
状态：OPEN  
该 PR 修复文本 shimmer 使用 `background-position` 导致主线程重绘的问题，改为更轻量的透明度脉冲。  
对 UI 性能和渲染稳定性有帮助，尤其是在长会话或低性能设备上。

### 6. CI 中检查生成的 protocol OpenAPI 文档  
链接：anomalyco/opencode PR #54246  
状态：OPEN  
该 PR 在 Linux unit job 中加入现有 OpenAPI drift check，防止生成协议文档过期。  
这属于工程质量改进，有助于 SDK、API 文档和前后端协议保持一致。

### 7. 恢复 v2 中 `opencode models --refresh` 参数  
链接：anomalyco/opencode PR #54234  
状态：OPEN  
该 PR 修复 v2 CLI 重写后丢失 `models --refresh` 与 `--verbose` 的问题。  
文档仍在宣传这些参数，恢复后可让用户手动刷新模型列表，改善模型管理体验。

### 8. MCP 工具调用 401 后标记服务器需要重新认证  
链接：anomalyco/opencode PR #54226  
状态：OPEN  
当 MCP server 在 token 刷新后仍返回 401 时，该 PR 会将 server 状态标记为 `needs_auth`，而不是继续显示 Connected。  
这能减少无效重试，并给用户明确的重新认证信号。

### 9. 添加 nsq 到生态项目文档  
链接：anomalyco/opencode PR #54224  
状态：OPEN  
该 PR 将 nsq 加入社区生态 Projects 列表。  
虽然是文档类变更，但反映出 OpenCode 周边工具生态仍在扩展。

### 10. 改进 shell 命令无法分析时的错误说明  
链接：anomalyco/opencode PR #54218  
状态：OPEN  
当 portable shell scanner 无法分析命令时，当前错误只返回 reason code。该 PR 计划提供更可理解的说明。  
这对 agent 自动生成 shell 命令的调试体验很重要，能降低用户理解和修复命令的成本。

---

## 4. 功能需求趋势

### 1. TUI / Desktop 体验与跨平台一致性  
多个 Issue 指向 Windows TUI 卡顿、文本不可见、窗口缩放延迟、Desktop 托盘退出、GUI theme picker 不加载自定义主题等问题。  
相关链接：  
- anomalyco/opencode Issue #54239  
- anomalyco/opencode Issue #54173  
- anomalyco/opencode Issue #54217  
- anomalyco/opencode Issue #54235  

趋势判断：v2 UI 体验仍处于快速修复阶段，Windows 原生终端和 Desktop/Web UI 的一致性是近期重点。

### 2. MCP 与 OAuth 可靠性  
MCP 相关问题集中在 OAuth localhost 回归、环境变量凭据缓存、401 后状态不准确等。  
相关链接：  
- anomalyco/opencode Issue #54245  
- anomalyco/opencode Issue #54205  
- anomalyco/opencode PR #54226  

趋势判断：MCP 已成为 OpenCode 生态扩展的重要入口，但认证、配置热更新、本地开发体验仍需打磨。

### 3. 权限、安全策略与工具调用控制  
社区关注点包括 plan 模式 shell 命令确认、experimental policies 权限语句、拒绝工具调用后的恢复语义、未知工具调用状态等。  
相关链接：  
- anomalyco/opencode PR #54253  
- anomalyco/opencode Issue #54214  
- anomalyco/opencode Issue #54180  
- anomalyco/opencode Issue #54238  

趋势判断：随着 OpenCode 执行能力增强，用户对“可控、可审计、可拒绝”的权限模型要求更高。

### 4. Code Mode 长任务管理  
execute、plugin tool、MCP tool 的超时、后台化、中断结果保留成为一组连续需求。  
相关链接：  
- anomalyco/opencode Issue #54220  
- anomalyco/opencode Issue #54221  
- anomalyco/opencode Issue #54222  
- anomalyco/opencode PR #54251  

趋势判断：开发者希望 OpenCode 能更像任务运行器，支持长任务后台运行、部分结果保留和中断恢复。

### 5. 模型与 Provider 支持  
今日有 xAI Grok 原生搜索工具、Kimi endpoint 不可用、Desktop 模型 reasoning tooltip 错误、模型 refresh flag 缺失等反馈。  
相关链接：  
- anomalyco/opencode Issue #54168  
- anomalyco/opencode Issue #54237  
- anomalyco/opencode Issue #54229  
- anomalyco/opencode PR #54234  

趋势判断：用户对模型能力展示、模型列表刷新、Provider 错误可读性和新模型内置工具支持有持续需求。

---

## 5. 开发者关注点

1. **v2 回归问题仍是主线**  
   多个 Issue 明确提到 v2 中缺失 v1 功能或行为变化，包括 `instructions` 未加载、terminal toggle 缺失、`models --refresh` 丢失、TUI 性能下降等。

2. **Windows 体验问题集中爆发**  
   Windows 上 CLI 无响应、TUI 渲染卡顿、默认色文本不可见、Desktop 托盘缺失等反馈密集出现，说明 Windows 平台需要专项稳定性验证。

3. **工具调用生命周期需要更清晰**  
   用户关心工具调用被拒绝、中断、超时、后台化、失败状态上报等细节。当前问题不只是 bug，也涉及 agent 执行模型的用户信任。

4. **MCP 已进入高频使用阶段**  
   认证、OAuth、本地 localhost 开发、环境变量注入、server 状态提示等问题持续出现，表明 MCP 从“可用”进入“可靠性与易用性”阶段。

5. **文档与实现不一致带来摩擦**  
   `experimental.policies`、`models --refresh`、生态插件入口等问题说明，v2 迁移后文档、CLI 行为和配置 schema 需要持续对齐。

6. **付费与额度体验需要更透明**  
   TUI 误报余额不足、Zen credits 低余额不可用等反馈显示，额度、余额、订阅状态在不同入口间的一致性会直接影响用户信任。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-10-10

## 1. 今日速览

过去 24 小时 Pi 社区没有新版本发布，但 Issue 与 PR 活跃度较高，主要集中在 **TUI 交互稳定性、Provider 兼容性、SDK Agent 生命周期、MCP/OAuth、Durable 会话能力** 等方向。  
多个高质量 Issue 已在当天关闭，说明维护节奏较快；同时仍有若干开放 PR 涉及配置 schema、Cloudflare AI Gateway、自定义消息触发 Agent、Codemode 兼容性等核心能力演进。

---

## 2. 社区热点 Issues

### 1. Kimi Code 与官方 CLI / Moonshot 行为不一致，缺少原生工具加载  
- Issue: [#10720](https://github.com/earendil-works/pi/issues/10720)  
- 状态：OPEN  
- 评论数：3  
- 重要性：该问题指出 `kimi-coding` provider 与官方 Kimi Code CLI、Pi 的 `moonshotai` provider 使用路径不一致，影响 Kimi Code 订阅用户的工具能力体验。  
- 社区反应：讨论集中在是否应切换到 OpenAI Chat Completions 兼容接口，以及如何对齐官方行为。  
- 关注点：新模型 / 新 provider 的一致性、工具调用兼容性。

### 2. Bun 安装 Pi 后用 Node 运行，所有扩展因缺少 `jiti` 加载失败  
- Issue: [#10719](https://github.com/earendil-works/pi/issues/10719)  
- 状态：OPEN  
- 评论数：3  
- 重要性：这是典型的运行时 / 包管理器交叉问题。用户通过 Bun 全局安装，但 Pi bin 使用 Node 启动，导致扩展依赖解析失败。  
- 社区反应：报告已确认不是扩展问题，而是 core 层问题。  
- 关注点：Bun / Node 生态兼容、全局安装可靠性、扩展系统健壮性。

### 3. Windows + WezTerm 下终端查询响应片段泄漏进输入框  
- Issue: [#10717](https://github.com/earendil-works/pi/issues/10717)  
- 状态：CLOSED  
- 评论数：3  
- 重要性：终端控制序列被误识别为用户输入，会直接破坏 TUI 的可用性，尤其影响 Windows 与 WezTerm 用户。  
- 社区反应：问题已关闭并标记为 no-action，可能被认为是终端行为或环境问题。  
- 关注点：终端兼容性、输入流过滤、Windows TUI 稳定性。

### 4. `session.prompt()` 在 `agent_settled` 阶段过早 resolve  
- Issue: [#10755](https://github.com/earendil-works/pi/issues/10755)  
- 状态：CLOSED  
- 评论数：2  
- 重要性：该问题涉及 SDK 1.1.0 中 Agent 生命周期事件的时序一致性。调用方以为 prompt 已执行，但实际只是被延迟调度。  
- 社区反应：Issue 当天创建并关闭，说明维护者可能已快速确认或处理。  
- 关注点：SDK Promise 语义、Agent 生命周期、自动化集成可靠性。

### 5. 忽略 abort signal 的工具会永久卡住 run  
- Issue: [#10754](https://github.com/earendil-works/pi/issues/10754)  
- 状态：CLOSED  
- 评论数：2  
- 重要性：如果工具 `execute()` 永不结束且忽略 `signal`，`session.abort()` 无法 settle，TUI stop 也会挂起。  
- 社区反应：问题获得快速处理，反映社区对 Agent 可控性与中断机制非常敏感。  
- 关注点：工具沙箱、取消机制、Agent 运行安全性。

### 6. Durable README 需说明 resume 后 aborted salvage entry 行为  
- Issue: [#10750](https://github.com/earendil-works/pi/issues/10750)  
- 状态：CLOSED  
- 评论数：2  
- 重要性：崩溃恢复后，部分生成内容会作为 `stopReason: "aborted"` 的 assistant entry 被提交。文档缺失会影响开发者正确处理恢复语义。  
- 社区反应：偏文档型改进，已关闭。  
- 关注点：Durable 会话恢复、崩溃一致性、SDK 文档质量。

### 7. Durable `watch()` / `watchEvents` 缺少跨进程事件投递  
- Issue: [#10749](https://github.com/earendil-works/pi/issues/10749)  
- 状态：CLOSED  
- 评论数：2  
- 重要性：用户希望一个进程写入 durable session，另一个进程作为 dashboard 监听事件。当前行为如果仅进程内有效，需要明确文档或提供跨进程机制。  
- 社区反应：体现出 Pi Durable 正被用于更复杂的多进程架构。  
- 关注点：Durable 事件总线、观察者模式、生产级部署。

### 8. Markdown 表格单元格选择会复制整行  
- Issue: [#10746](https://github.com/earendil-works/pi/issues/10746)  
- 状态：CLOSED  
- 评论数：2  
- 重要性：Fullscreen 模式下表格选择体验不佳，会复制相邻单元格和边框字符，影响阅读与引用输出内容。  
- 社区反应：作为 TUI 交互细节问题已关闭。  
- 关注点：终端渲染、文本选择、Markdown 表格体验。

### 9. ChromeOS Crostini 下剪贴板复制与 OSC 52 fallback 问题  
- Issue: [#10743](https://github.com/earendil-works/pi/issues/10743)  
- 状态：CLOSED  
- 评论数：2  
- 重要性：ChromeOS Crostini 用户面临 selection-to-copy 不可用且缺少 OSC 52 fallback 的问题，影响跨环境剪贴板体验。  
- 社区反应：报告详细，说明用户在非常规 Linux 环境中对 Pi 的使用需求增加。  
- 关注点：远程 / 容器终端、剪贴板兼容、OSC 52 支持。

### 10. Groq Qwen3.8 27B 因 `developer` role 返回 HTTP 400  
- Issue: [#10741](https://github.com/earendil-works/pi/issues/10741)  
- 状态：CLOSED  
- 评论数：2  
- 重要性：Provider 向 Groq 的 Qwen 模型发送了不被模板接受的 `developer` role，导致简单请求失败。  
- 社区反应：问题已关闭，显示兼容层对不同 OpenAI-like provider 的 role 映射仍需持续打磨。  
- 关注点：Provider 适配、OpenAI-compatible 差异、Qwen 模型支持。

---

## 3. 重要 PR 进展

### 1. 使用 pi.dev 配置 schema 作为规范来源  
- PR: [#10751](https://github.com/earendil-works/pi/pull/10751)  
- 状态：OPEN  
- 内容：将 pi.dev schema endpoints 作为生成配置 schema 的 canonical `$id`，并在内置主题和示例中使用已发布 theme schema。  
- 价值：提升配置文件、主题、模型、快捷键等 schema 的可发现性与工具链支持，利于 IDE 校验和文档化。

### 2. 支持自定义 Cloudflare AI Gateway 域名与访问凭据  
- PR: [#10747](https://github.com/earendil-works/pi/pull/10747)  
- 状态：OPEN  
- 内容：允许用户配置自定义 Cloudflare AI Gateway domain 与 credentials。  
- 价值：增强企业或私有网关接入能力，解决默认 Cloudflare AI Gateway 配置限制。

### 3. 新增禁用鼠标点击移动光标的选项  
- PR: [#10745](https://github.com/earendil-works/pi/pull/10745)  
- 状态：CLOSED  
- 内容：增加 `editorClickMovesCursor` 设置与 `PI_EDITOR_CLICK_MOVES_CURSOR` 环境变量，用于控制鼠标点击是否移动输入光标。  
- 价值：改善 TUI 鼠标交互，避免选择文本时误移动光标。

### 4. 自定义消息触发的 Agent run 补发 `before_agent_start`  
- PR: [#10739](https://github.com/earendil-works/pi/pull/10739)  
- 状态：OPEN  
- 内容：修复通过 `pi.sendMessage(..., { triggerTurn: true })` 启动 run 时跳过 `before_agent_start` 的问题。  
- 价值：避免系统提示词中途被错误 patch，防止 provider prompt cache 被破坏。

### 5. OpenAI Responses 历史中丢弃孤立 tool result  
- PR: [#10734](https://github.com/earendil-works/pi/pull/10734)  
- 状态：CLOSED  
- 内容：在 `transformMessages` 中清理没有对应 assistant tool call 的 `toolResult`。  
- 价值：修复长工具会话中 OpenAI Responses 因 orphaned tool result 持续 400 的问题，对长上下文工具使用非常关键。

### 6. 修复 CJK 文本中加粗语法在 TUI 渲染异常  
- PR: [#10730](https://github.com/earendil-works/pi/pull/10730)  
- 状态：OPEN  
- 内容：改进中文、日文、韩文文本中 fullwidth punctuation 附近的 Markdown emphasis 解析与渲染。  
- 价值：显著提升 CJK 用户在 TUI 中阅读模型输出的体验。

### 7. Codemode 忽略 Node watch 通知  
- PR: [#10726](https://github.com/earendil-works/pi/pull/10726)  
- 状态：OPEN  
- 内容：修复在 `node --watch` 下 SDK host 的 worker message channel 收到 Node 依赖通知，导致 codemode sandbox bridge 误判消息格式的问题。  
- 价值：提升 Codemode 在开发模式、watch 模式下的稳定性。

### 8. `pi --export` HTML 包含 system prompt  
- PR: [#10718](https://github.com/earendil-works/pi/pull/10718)  
- 状态：OPEN  
- 内容：修复命令行 `pi --export <session.jsonl>` 导出的 HTML 缺少 system prompt，而交互式 `/export` 包含的问题。  
- 价值：提升导出一致性，方便审计、复盘和调试 Agent 行为。

### 9. `pi-env` 启动失败时包含 stderr  
- PR: [#10716](https://github.com/earendil-works/pi/pull/10716)  
- 状态：OPEN  
- 内容：当 daemon 在 hello 前退出时，错误信息不再只有 exit code，而是包含 stderr。  
- 价值：显著改善环境启动失败的可诊断性，尤其是 login shell、远程环境和 profile 初始化失败场景。

### 10. 为 Qwen Token Plan 模型启用显式上下文缓存  
- PR: [#10715](https://github.com/earendil-works/pi/pull/10715)  
- 状态：CLOSED  
- 内容：为 Qwen Token Plan 模型启用 explicit context cache，修复用户在 Model Studio token-plan dashboard 中观察到 0% cache hit 的问题。  
- 价值：降低 token 计划消耗，提高 Qwen provider 成本效率。

---

## 4. 功能需求趋势

### 1. Provider 与模型兼容性仍是核心诉求  
相关 Issue / PR：  
- [#10720](https://github.com/earendil-works/pi/issues/10720) Kimi Code 接口不一致  
- [#10741](https://github.com/earendil-works/pi/issues/10741) Groq Qwen role 不兼容  
- [#10753](https://github.com/earendil-works/pi/issues/10753) Claude Haiku 5.5 thinking 无法关闭  
- [#10715](https://github.com/earendil-works/pi/pull/10715) Qwen Token Plan cache  

趋势：社区希望 Pi 能更准确地适配不同 provider 的“类 OpenAI”接口差异，包括 role 映射、thinking 参数、缓存控制、工具调用协议等。

### 2. TUI 体验正在被大量细节打磨  
相关 Issue / PR：  
- [#10717](https://github.com/earendil-works/pi/issues/10717) Windows / WezTerm 输入泄漏  
- [#10746](https://github.com/earendil-works/pi/issues/10746) Markdown 表格选择问题  
- [#10757](https://github.com/earendil-works/pi/issues/10757) Fullscreen viewport 增长时跳到底部  
- [#10756](https://github.com/earendil-works/pi/issues/10756) `@` 文件补全粘贴后不刷新  
- [#10730](https://github.com/earendil-works/pi/pull/10730) CJK emphasis 渲染修复  

趋势：Pi 的终端交互已经进入精细化阶段，用户不仅关注是否可用，也关注选择、复制、补全、滚动、CJK 渲染等高频操作体验。

### 3. SDK / Agent 生命周期语义需要更稳定  
相关 Issue / PR：  
- [#10755](https://github.com/earendil-works/pi/issues/10755) `session.prompt()` resolve 时机错误  
- [#10754](https://github.com/earendil-works/pi/issues/10754) abort 无法结束不响应 signal 的工具  
- [#10739](https://github.com/earendil-works/pi/pull/10739) custom message run 补发 `before_agent_start`  

趋势：越来越多开发者将 Pi 作为 SDK 和自动化 Agent 框架使用，因此对事件顺序、Promise 行为、abort 语义、prompt cache 稳定性提出更高要求。

### 4. Durable 与长会话能力正在走向生产化  
相关 Issue / PR：  
- [#10750](https://github.com/earendil-works/pi/issues/10750) resume 后 salvage entry 文档  
- [#10749](https://github.com/earendil-works/pi/issues/10749) 跨进程 watch events  
- [#10728](https://github.com/earendil-works/pi/issues/10728) Durable 工具嵌套调用  
- [#10734](https://github.com/earendil-works/pi/pull/10734) 清理孤立 tool result  

趋势：社区正在围绕 Durable 会话构建 dashboard、多进程 worker、长工具链等复杂系统，要求 Pi 提供更清晰的恢复语义、事件模型和工具调用组合能力。

### 5. 配置、安装和环境诊断需求增强  
相关 Issue / PR：  
- [#10719](https://github.com/earendil-works/pi/issues/10719) Bun 安装 + Node 运行导致扩展失败  
- [#10758](https://github.com/earendil-works/pi/issues/10758) Git package pinned SHA 修改后启动不更新  
- [#10751](https://github.com/earendil-works/pi/pull/10751) pi.dev 配置 schema  
- [#10716](https://github.com/earendil-works/pi/pull/10716) pi-env 启动错误包含 stderr  

趋势：开发者希望 Pi 在配置文件、包安装、远程环境启动、Git package 更新等方面提供更强的可解释性和可诊断性。

---

## 5. 开发者关注点

1. **跨运行时兼容性问题突出**  
   Bun 安装、Node 运行、Node watch、QuickJS / Bun bridge 等场景频繁出现边界问题。Pi 需要在多 JS runtime 环境下提供更稳定的依赖解析和 worker 通信机制。  
   参考：[#10719](https://github.com/earendil-works/pi/issues/10719)、[#10726](https://github.com/earendil-works/pi/pull/10726)、[#10748](https://github.com/earendil-works/pi/issues/10748)

2. **终端环境碎片化带来的 TUI 问题仍然高频**  
   Windows、WezTerm、OpenSSH / ConPTY、ChromeOS Crostini 等环境都暴露了输入、剪贴板、OSC 序列、鼠标行为等差异。  
   参考：[#10717](https://github.com/earendil-works/pi/issues/10717)、[#10742](https://github.com/earendil-works/pi/issues/10742)、[#10743](https://github.com/earendil-works/pi/issues/10743)、[#10745](https://github.com/earendil-works/pi/pull/10745)

3. **Provider 适配不能只依赖“OpenAI-compatible”标签**  
   不同厂商在 role、tool call、SSE、finish reason、thinking、cache control 上存在显著差异。开发者希望 Pi 能针对主流模型做更细粒度的 compat 策略。  
   参考：[#10741](https://github.com/earendil-works/pi/issues/10741)、[#10752](https://github.com/earendil-works/pi/issues/10752)、[#10753](https://github.com/earendil-works/pi/issues/10753)、[#10715](https://github.com/earendil-works/pi/pull/10715)

4. **Agent 中断与工具执行隔离是生产使用关键点**  
   工具忽略 abort signal、内置操作不可中断、bridge 数据绕过限制等问题说明用户正在将 Pi 用在更严肃的自动化场景中。  
   参考：[#10754](https://github.com/earendil-works/pi/issues/10754)、[#10748](https://github.com/earendil-works/pi/issues/10748)

5. **文档与错误信息需要更面向调试场景**  
   多个反馈并非单纯 bug，而是希望文档说明边界行为，或在失败时提供 stderr、schema、恢复语义等可诊断信息。  
   参考：[#10750](https://github.com/earendil-works/pi/issues/10750)、[#10751](https://github.com/earendil-works/pi/pull/10751)、[#10716](https://github.com/earendil-works/pi/pull/10716)

---

总体来看，今天 Pi 社区的重点不是大版本发布，而是围绕 **生产可用性、复杂 provider 兼容、TUI 细节体验、SDK 生命周期稳定性** 的集中修复与打磨。对于正在将 Pi 集成进自动化开发流或企业内部工具链的开发者，建议重点关注开放中的 [#10751](https://github.com/earendil-works/pi/pull/10751)、[#10747](https://github.com/earendil-works/pi/pull/10747)、[#10739](https://github.com/earendil-works/pi/pull/10739) 和 [#10726](https://github.com/earendil-works/pi/pull/10726)。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-10-10

## 1. 今日速览

过去 24 小时，Qwen Code 社区围绕 **Managed Agent / Multi-Agent、Web Shell 会话恢复、MCP 工具注册、CI/SDK 契约稳定性** 展开了密集讨论。  
今天发布了 `v0.25.1-preview.1` 与 `v0.25.0-nightly.20261009`，同时多个 PR 正在修复会话恢复、A2A 任务状态、MCP lazy-spawn 工具发现等关键路径问题。  
整体来看，项目正在从 CLI 工具向更复杂的 **daemon 化、多会话、多 Agent、Web Shell 工作台** 演进，社区反馈也集中在可靠性、可恢复性和公共 API 契约上。

---

## 2. 版本发布

### v0.25.1-preview.1

链接：<https://github.com/QwenLM/qwen-code/releases/tag/v0.25.1-preview.1>

本次 preview 版本包含与 Agent 远程 Host 绑定相关的修复：

- 修复 agents 在替换选中的 remote Hosts 时可能丢失 bindings 的问题。
- 包含 core 测试相关的后续修复内容，关联此前 issue closeout。

### v0.25.0-nightly.20261009.085a44f336

链接：<https://github.com/QwenLM/qwen-code/releases/tag/v0.25.0-nightly.20261009.085a44f336>

Nightly 版本同步了类似修复：

- 修复 agents remote Hosts 替换逻辑。
- 包含 core 测试与稳定性相关变更。

---

## 3. 社区热点 Issues

### 1. MCP HTTP server 显示 Connected 但工具整场 session 未注册

Issue：[#13796](https://github.com/QwenLM/qwen-code/issues/13796)  
状态：OPEN  
标签：`priority/P2`, `type/bug`, `category/tools`, `scope/mcp`  
评论数：4

该问题指出 HTTP MCP server 在 `qwen mcp list` 中显示已连接，但 MCP tools 在整个 session 内未被注册。  
重要性在于 MCP 是 Qwen Code 扩展工具生态的关键入口，HTTP transport 的 lazy-spawn / tool discovery 可靠性直接影响工具可用性。社区已有对应修复 PR [#13806](https://github.com/QwenLM/qwen-code/pull/13806)。

---

### 2. file-history snapshot payload 读取逻辑重复且策略不一致

Issue：[#13794](https://github.com/QwenLM/qwen-code/issues/13794)  
状态：OPEN  
标签：`priority/P3`, `category/core`, `scope/session-management`, `type/enhancement`  
评论数：4

该 issue 关注 core 中 `file_history_snapshot` payload gate 与 malformed input 策略重复的问题。  
它不是直接 bug，但影响会话恢复、历史快照、fork remap 等长期可维护性。社区讨论表明维护者正在清理 session-management 内部契约，避免未来恢复逻辑出现隐性分歧。

---

### 3. Multi-Agent API 需要 agent identity 维度

Issue：[#13785](https://github.com/QwenLM/qwen-code/issues/13785)  
状态：OPEN  
标签：`priority/P2`, `type/feature-request`, `roadmap/multi-agent`, `daemon`  
评论数：4

该需求建议在公开 API contract 中加入 agent identity，使多 Agent 执行可以被归因、呈树状结构并可中断。  
这是 Multi-Agent 路线图中的核心设计问题：如果公共 API 无法表达 agent identity，客户端就无法可靠追踪任务来源、子任务树和中断边界。

---

### 4. Web Shell 恢复 session 后 Branch 操作消失

Issue：[#13782](https://github.com/QwenLM/qwen-code/issues/13782)  
状态：OPEN  
标签：`priority/P2`, `type/bug`, `category/core`, `scope/session-management`, `scope/web-shell`  
评论数：4

问题表现为 `qwen serve` 重启后，Web Shell 从磁盘恢复 session 时，历史回答上的 Branch 动作全部消失。  
这直接影响 Web Shell 的交互式探索能力。对应修复 PR [#13814](https://github.com/QwenLM/qwen-code/pull/13814) 已提交，将 branch checkpoint 带入 session load replay。

---

### 5. Managed Agent recovery-blocked session 会阻塞同 daemon 其他 session

Issue：[#13800](https://github.com/QwenLM/qwen-code/issues/13800)  
状态：OPEN  
标签：`priority/P1`, `type/bug`, `category/core`, `scope/session-management`, `daemon`  
评论数：3

这是今日优先级最高的问题之一。一个处于 `recovery_blocked` 状态的 session 会让同一 daemon 上其他 session 的后续 turn 卡住。  
严重性在于它不是单 session 故障，而是 daemon 级联阻塞，可能影响多用户或多任务环境中的整体可用性。

---

### 6. Managed Agent child_run 在进程未启动时长期卡在 dispatch_started

Issue：[#13801](https://github.com/QwenLM/qwen-code/issues/13801)  
状态：OPEN  
标签：`priority/P2`, `type/bug`, `scope/shell`, `roadmap/multi-agent`, `scope/sdk`  
评论数：3

该问题描述 `child_run` 被记录为 running / provisioning，但实际上没有进程 ledger row，也没有 cgroup unit，说明进程从未启动。  
这会造成公共 tasks API 返回错误状态，影响 Managed Agent 调度、监控和故障恢复。

---

### 7. Foundation Models 作为 Fast Model 时出现 unsupported generation guide

Issue：[#13807](https://github.com/QwenLM/qwen-code/issues/13807)  
状态：OPEN  
标签：`priority/P2`, `type/bug`, `category/core`, `scope/content-generation`, `scope/macos`  
评论数：3

用户在 macOS 27.2 使用内置 Foundation Models server 作为 fast model 时，工具摘要正常，但某些生成路径返回 `ERROR 500 An unsupported generation guide was used`。  
这反映出 Qwen Code 在兼容本地模型 / OpenAI-compatible server 时，仍需要处理 provider 能力差异。

---

### 8. SDK Java OpenAPI contract version 缺少回退/停滞检查

Issue：[#13804](https://github.com/QwenLM/qwen-code/issues/13804)  
状态：OPEN  
标签：`priority/P2`, `type/bug`, `category/development`, `scope/ci-cd`, `scope/sdk`  
评论数：3

该 issue 指出 Managed Agent public API 的 OpenAPI `info.version` 可能回退或在 contract 变化时未更新，而 CI 无法发现。  
这对 SDK 使用者非常关键，因为 API 契约版本是客户端生成、兼容性判断和发布治理的基础。对应 PR [#13808](https://github.com/QwenLM/qwen-code/pull/13808) 已提交。

---

### 9. XML tool-call recovery 在大规模 multi-call 响应中性能退化

Issue：[#13787](https://github.com/QwenLM/qwen-code/issues/13787)  
状态：OPEN  
标签：`priority/P3`, `type/bug`, `category/performance`, `scope/latency`  
评论数：3

该问题报告 XML recovery 在包含多个有效 tool calls 的大响应中重复 prefix scan，导致延迟随 block 数增长明显上升。  
虽然优先级为 P3，但它触及高频工具调用场景下的吞吐与交互延迟，值得后续性能优化关注。

---

### 10. Web Shell 编辑权限弹窗渲染完整文件而非 diff 片段

Issue：[#13766](https://github.com/QwenLM/qwen-code/issues/13766)  
状态：OPEN  
标签：`priority/P2`, `type/bug`, `category/ui`, `scope/web-shell`  
评论数：3

Web Shell Desktop 中，一行修改会在 Edit permission dialog 与 pending tool card 中渲染整个文件，而不是变更行及上下文。  
这影响代码审查体验和权限确认效率，尤其是在大文件编辑场景下会增加误判风险。

---

## 4. 重要 PR 进展

### 1. 修复 session load replay 中 Branch points 丢失

PR：[#13814](https://github.com/QwenLM/qwen-code/pull/13814)  
状态：OPEN  
作者：he-yufeng

该 PR 在从磁盘恢复 session 时，为 assistant answer 补上持久化的 branch checkpoint。  
它直接修复 Web Shell 恢复后 Branch 操作消失的问题，关联 issue [#13782](https://github.com/QwenLM/qwen-code/issues/13782)。

---

### 2. MCP readResource lazy-spawn 路径补齐工具发现

PR：[#13806](https://github.com/QwenLM/qwen-code/pull/13806)  
状态：OPEN  
作者：yiliang114

当首次触发 MCP server 启动的是 `readResource` 而非工具调用时，原逻辑只连接 transport 并读取资源，没有执行 tools/prompts/resources discovery。  
该 PR 修复这一 lazy-spawn 分支，解决 HTTP MCP server 连接成功但工具未注册的问题，关联 issue [#13796](https://github.com/QwenLM/qwen-code/issues/13796)。

---

### 3. A2A task 在 transcript read error 时保持 completed 状态

PR：[#13797](https://github.com/QwenLM/qwen-code/pull/13797)  
状态：OPEN  
作者：lorenzozanee

该 PR 修复 transient transcript read error 导致已完成 A2A task 被持久化为 failed 的问题。  
修复后，非 ENOENT 读取错误会被视为 unavailable，后续 poll 可在 transcript 恢复后读取完成结果，避免临时 I/O 问题造成永久失败。

---

### 4. SDK Java API contract version 防回退、防停滞

PR：[#13808](https://github.com/QwenLM/qwen-code/pull/13808)  
状态：OPEN  
作者：wenshao

该 PR 为 Managed Agent public OpenAPI contract 加入版本守卫。  
在 PR 检查中，如果 OpenAPI 文档变更但 `info.version` 未递增，或版本相对 base 分支回退，CI 将失败。该改动提升 SDK API 发布治理能力，关联 issue [#13804](https://github.com/QwenLM/qwen-code/issues/13804)。

---

### 5. Web Shell 增加 “Resume when available”

PR：[#13790](https://github.com/QwenLM/qwen-code/pull/13790)  
状态：CLOSED  
作者：samuelhsin

该 PR 为模型限流或临时额度耗尽场景增加 **Resume when available / 可用时继续** 按钮。  
相比手动点击 Continue execution，它允许用户启动一个可见、可取消的等待流程，在模型恢复可用后继续任务。关联 issue [#13784](https://github.com/QwenLM/qwen-code/issues/13784)。

---

### 6. Managed Agent H4e-a team record contract

PR：[#13811](https://github.com/QwenLM/qwen-code/pull/13811)  
状态：CLOSED  
作者：wenshao

该 PR 是 Managed child-agent Stage H 中 H4e slice 的 record-contract 部分。  
它推进 team record domains、独立 durable owner、close cascade 等设计，为后续团队化 Agent 编排能力奠定持久化契约基础。

---

### 7. Managed Agent child Workspace capability

PR：[#13781](https://github.com/QwenLM/qwen-code/pull/13781)  
状态：OPEN  
作者：wenshao

该 PR 实现 managed child Sessions 的 Workspace capability，作为隔离切片 #13753 的 I1 部分。  
核心目标是让子 session 可以在 Git linked worktree 中运行，为后续工作区隔离、merge policy、child agent 写入能力做准备。

---

### 8. 修复 reactive compaction 使用 server-reported context ceiling

PR：[#13788](https://github.com/QwenLM/qwen-code/pull/13788)  
状态：OPEN  
作者：yiliang114

当 provider 返回 context overflow 错误时，Qwen Code 已能解析 server-reported token ceiling，但 reactive compaction 没有使用该值。  
该 PR 将 compaction sizing 对齐到服务端实际报告的上下文上限，有助于减少重复 overflow 和无效重试。

---

### 9. monorepo 子目录内发现上层 saved workflows

PR：[#13812](https://github.com/QwenLM/qwen-code/pull/13812)  
状态：OPEN  
作者：qqqys

该 PR 让 session 在 monorepo 子目录启动时，也能发现父目录中的 `.qwen/workflows`。  
这对大型仓库很实用：团队可以在 repo 顶层共享 workflow，而开发者在 `packages/a` 等子目录中仍可直接调用。

---

### 10. AutoSkill review 基于 experience signals 触发

PR：[#13805](https://github.com/QwenLM/qwen-code/pull/13805)  
状态：OPEN  
作者：shenyankm

该 PR 调整 AutoSkill review 的触发条件，从原来的 raw tool volume 转向 accepted experience。  
例如需要一定数量的 accepted completed calls、同工具失败恢复信号、mid-turn user steer 等。这有助于减少噪声，让自动技能复盘更接近真实经验积累。

---

## 5. 功能需求趋势

### 1. Multi-Agent / Managed Agent 成为主线

相关 Issues / PR：

- [#13785](https://github.com/QwenLM/qwen-code/issues/13785) Multi-Agent API agent identity
- [#13801](https://github.com/QwenLM/qwen-code/issues/13801) child_run stuck at dispatch_started
- [#13803](https://github.com/QwenLM/qwen-code/issues/13803) workflow child runtime
- [#13753](https://github.com/QwenLM/qwen-code/issues/13753) child Workspace isolation
- [#13781](https://github.com/QwenLM/qwen-code/pull/13781) child Workspace capability
- [#13811](https://github.com/QwenLM/qwen-code/pull/13811) team record contract

社区明显在推动 Qwen Code 从单 Agent CLI 走向多 Agent、子任务、workflow、team record、worktree 隔离的执行平台。

---

### 2. Web Shell 体验与会话恢复持续升温

相关 Issues / PR：

- [#13782](https://github.com/QwenLM/qwen-code/issues/13782) Branch 恢复后消失
- [#13814](https://github.com/QwenLM/qwen-code/pull/13814) session load replay 保留 branch points
- [#13766](https://github.com/QwenLM/qwen-code/issues/13766) 编辑弹窗渲染完整文件
- [#13784](https://github.com/QwenLM/qwen-code/issues/13784) rate-limit 后 Resume when available
- [#13790](https://github.com/QwenLM/qwen-code/pull/13790) Resume when available 实现
- [#13727](https://github.com/QwenLM/qwen-code/issues/13727) 多 daemon Web Shell 连接

Web Shell 已成为重要入口，用户关注点从基础可用转向“恢复后状态一致”“长任务可继续”“多 daemon workspace 切换”“权限 UI 可读性”。

---

### 3. MCP / 工具生态可靠性

相关 Issues / PR：

- [#13796](https://github.com/QwenLM/qwen-code/issues/13796) MCP HTTP server 工具未注册
- [#13806](https://github.com/QwenLM/qwen-code/pull/13806) lazy-spawn 工具发现修复
- [#13730](https://github.com/QwenLM/qwen-code/issues/13730) grep/ripGrep rawOutputSize 缺失
- [#13726](https://github.com/QwenLM/qwen-code/issues/13726) tool result sizing authority defects
- [#13809](https://github.com/QwenLM/qwen-code/issues/13809) tool result size accounting review suggestions

工具调用链路的注册、输出大小、telemetry 计量和注入预算是当前高频维护点，说明 Qwen Code 的工具生态正在进入更严格的工程化阶段。

---

### 4. SDK / Public API 契约治理增强

相关 Issues / PR：

- [#13804](https://github.com/QwenLM/qwen-code/issues/13804) OpenAPI contract version 检查缺失
- [#13808](https://github.com/QwenLM/qwen-code/pull/13808) 防 contract version 回退/停滞
- [#13810](https://github.com/QwenLM/qwen-code/pull/13810) history response 8 MiB limit 回归测试
- [#13802](https://github.com/QwenLM/qwen-code/issues/13802) Stage F fault gates FG7

随着 Managed Agent API 对外暴露，社区开始更关注 public API version、响应大小限制、fault gate、SDK CI 等契约稳定性。

---

### 5. 本地模型与 provider 兼容性

相关 Issue：

- [#13807](https://github.com/QwenLM/qwen-code/issues/13807) macOS Foundation Models fast model 报 unsupported generation guide

Qwen Code 正在适配更多 OpenAI-compatible 或本地模型 provider。社区反馈显示，不同 provider 对 generation guide、tool summary、fast model 能力的支持差异需要更细粒度的兼容层。

---

## 6. 开发者关注点

### 1. 会话恢复的一致性仍是核心痛点

多个问题都指向恢复路径：

- session load replay 丢失 branch marker：[ #13782 ](https://github.com/QwenLM/qwen-code/issues/13782)
- recovery-blocked session 阻塞其他 session：[ #13800 ](https://github.com/QwenLM/qwen-code/issues/13800)
- file history snapshot reader 策略重复：[ #13794 ](https://github.com/QwenLM/qwen-code/issues/13794)
- midstream retry retraction 仍有 race：[ #13765 ](https://github.com/QwenLM/qwen-code/issues/13765)

开发者希望恢复后的 transcript、branch、turn、child task 状态与实时运行时保持一致。

---

### 2. Daemon / Managed Agent 的故障隔离需要加强

社区反馈显示，Managed Agent 的多进程、多 session 场景仍存在级联风险：

- 单个 recovery-blocked session 影响同 daemon 其他 session。
- child_run 在进程未启动时仍保持 running。
- transient transcript read error 会污染 A2A task 状态。
- CI fault gates 正在扩展到更多 channel domains。

这说明 daemon 化后，错误边界、任务状态机和恢复策略变得更加关键。

---

### 3. Web Shell 用户希望获得接近 IDE 的可控体验

高频诉求包括：

- 恢复后仍可 branch。
- 限流后可自动等待并继续。
- diff 权限弹窗只展示相关变更。
- 支持多 daemon / 多 workspace 无刷新切换。

Web Shell 正在从“浏览器终端”演进为更完整的开发控制台。

---

### 4. CI 与验证流程正在被系统化

今日多个 issue / PR 都来自 CI、verify-pr、SDK guard：

- [#13732](https://github.com/QwenLM/qwen-code/issues/13732) verify-pr 增强
- [#13813](https://github.com/QwenLM/qwen-code/pull/13813) verify-pr scope selection 改进
- [#13804](https://github.com/QwenLM/qwen-code/issues/13804) SDK contract version guard
- [#13791](https://github.com/QwenLM/qwen-code/issues/13791)、[#13780](https://github.com/QwenLM/qwen-code/issues/13780)、[#13775](https://github.com/QwenLM/qwen-code/issues/13775) CI failure 自动追踪

维护者正在把经验性 review 规则、CI flaky 处理、API contract 守卫固化为自动化流程。

---

### 5. 性能与可扩展性问题开始浮现

典型案例：

- XML recovery 大响应下重复扫描：[ #13787 ](https://github.com/QwenLM/qwen-code/issues/13787)
- tool result size accounting 系列问题：[ #13726 ](https://github.com/QwenLM/qwen-code/issues/13726)、[ #13730 ](https://github.com/QwenLM/qwen-code/issues/13730)、[ #13809 ](https://github.com/QwenLM/qwen-code/issues/13809)
- reactive compaction 未使用 provider 报告的上下文上限：[ #13788 ](https://github.com/QwenLM/qwen-code/pull/13788)

随着工具调用和长上下文使用增多，性能、上下文预算、输出尺寸治理将成为后续重点。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报（2026-10-10）

## 1. 今日速览

过去 24 小时没有新版本发布，社区主要围绕 **0.10.2 稳定性修复、Runtime/TUI 拆分、工具可见性与 OAuth 工作流** 展开。Issue 侧重点明显偏向架构清理与运行时边界收敛；PR 侧则集中在 Windows 路径兼容、会话阻塞提示、插件安装与登录体验改进。

整体来看，当前项目处于一次较大的内部架构调整期：`codewhale-runtime` 与 TUI 的职责拆分正在连续推进，同时 0.10.2 暴露出的工具面、后台任务、文档一致性问题也在被快速收敛。

---

## 2. 社区热点 Issues

> 过去 24 小时共更新 13 条 Issue，以下为最值得关注的 10 条。

### 1. 后台长任务不可见，且 Full Access 阻塞后台 API  
[#6944](https://github.com/codewhale-hq/Codewhale/issues/6944)  
**状态：OPEN**｜标签：`bug`, `ux`, `v0.10.2`

该问题指出长时间运行的命令会从前台 `bash` 调用“静默”转入后台，但用户缺少足够的可见性与控制能力。对 AI Agent 工具链而言，这会直接影响长任务调试、取消、状态追踪和用户信任。

**重要性：高。** 这是典型的 Agent Runtime UX 问题，影响实际开发任务执行体验。  
**社区反应：** 当前评论较少，主要由维护者提出，尚未形成大规模讨论。

---

### 2. Workflow verify gate 自阻塞导致运行死锁  
[#6945](https://github.com/codewhale-hq/Codewhale/issues/6945)  
**状态：OPEN**｜标签：`bug`, `workflow-runtime`

Workflow 中某个 verify gate 的 `blocks_role` 指向自身角色时，会在运行阶段死锁，而不是在计划准入阶段直接失败。这暴露出工作流编排中的静态校验不足。

**重要性：高。** 对多阶段 Agent Workflow 的可靠性影响明显，尤其是高成本任务在执行前应尽早失败。  
**社区反应：** 暂无评论，属于维护者主动发现的 runtime 级缺陷。

---

### 3. MCP 文档与 0.10.2 实际默认行为不一致  
[#6942](https://github.com/codewhale-hq/Codewhale/issues/6942)  
**状态：CLOSED**｜标签：`documentation`, `tools`, `v0.10.2`

该 Issue 指出网站 MCP 页面、任务卡片仍描述为“默认关闭、只读、无 MCP、30 秒”等旧行为，但代码中已切换到默认开启的 gate 模式。

**重要性：中高。** 文档与实际工具能力不一致，会直接误导开发者配置和安全预期。  
**社区反应：** 已关闭，说明相关文档一致性修复可能已完成或进入可接受状态。

---

### 4. Runtime split RS-14：将强连接 runtime core 移入 `codewhale-runtime`  
[#6941](https://github.com/codewhale-hq/Codewhale/issues/6941)  
**状态：OPEN**｜标签：`agent-ready`, `cleanup`, `tui`

这是 Runtime/TUI 拆分序列中的关键变更，目标是把 `crates/tui` 中强连接的运行时核心迁移到 `codewhale-runtime`。

**重要性：高。** 这是架构拆分的“keystone change”，会影响后续模块边界、复用能力和外部客户端集成。  
**社区反应：** 当前无评论，但属于维护者规划中的核心任务。

---

### 5. Runtime split RS-13：命令目录与快捷键帮助改由非 UI owner 提供  
[#6940](https://github.com/codewhale-hq/Codewhale/issues/6940)  
**状态：OPEN**｜标签：`agent-ready`, `cleanup`, `tui`, `reliability`

该任务要求将命令 catalog 与 keybinding help 从 UI 层剥离，转由 `runtime_api`、`tui_help` 等非 UI owner 提供。

**重要性：中高。** 有助于统一 runtime 对外能力暴露方式，让 TUI、外部客户端、自动化调用共享同一套命令契约。  
**社区反应：** 维护者主导，暂无外部反馈。

---

### 6. Runtime split RS-12：迁移 crate-root helper 与 CLI parse 类型  
[#6939](https://github.com/codewhale-hq/Codewhale/issues/6939)  
**状态：OPEN**｜标签：`agent-ready`, `cleanup`, `tui`, `subagents`, `reliability`

该任务聚焦 runtime 测试依赖的 crate-root helper 与 CLI 解析类型迁移，配合 `module_graph.py --check` 的边界收敛。

**重要性：中。** 属于架构拆分中的基础清理任务，虽然不直接面向用户，但影响测试边界和模块可维护性。  
**社区反应：** 暂无评论。

---

### 7. Runtime split RS-11：处理 test-only upward edges  
[#6938](https://github.com/codewhale-hq/Codewhale/issues/6938)  
**状态：OPEN**｜标签：`workflow-runtime`, `agent-ready`, `cleanup`, `tui`, `subagents`

该 Issue 要求拆分测试支持模块，并迁移使用 UI 类型的测试，避免测试依赖反向约束 runtime crate 拆分。

**重要性：中高。** 测试依赖如果不清理，会阻碍生产代码拆分，是大型 Rust workspace 重构中的常见风险点。  
**社区反应：** 暂无评论，但从描述看已有明确 ratchet 指标。

---

### 8. Runtime split RS-10：迁移 10 个可分离 leaf modules 到 `codewhale-runtime`  
[#6937](https://github.com/codewhale-hq/Codewhale/issues/6937)  
**状态：OPEN**｜标签：`agent-ready`, `cleanup`, `tui`

该任务将 10 个相对独立的 leaf modules 从 TUI 迁移到 runtime，并通过脚本处理 `git mv`、`mod` 调整和路径引用清理。

**重要性：中高。** 这是渐进式拆分的可执行单元，有助于降低一次性重构风险。  
**社区反应：** 暂无评论，偏维护者内部工程任务。

---

### 9. `file_search` 默认激活后，public tool surface 未同步  
[#6934](https://github.com/codewhale-hq/Codewhale/issues/6934)  
**状态：OPEN**｜标签：`bug`, `tools`

Issue 指出 `file_search` 默认启用后，`web/` 中 public tool-surface contract 测试失败，说明原生核心、工具发现边界和前端公开信息不一致。

**重要性：高。** 工具面契约不一致会影响用户对工具可用性的判断，也可能导致前端展示、权限和实际执行行为不匹配。  
**社区反应：** 暂无评论，但测试失败信息明确，修复优先级应较高。

---

### 10. Claude subscription 通过共享 OAuth 与 native Messages route 登录  
[#6932](https://github.com/codewhale-hq/Codewhale/issues/6932)  
**状态：OPEN**

该 Issue 涉及通过共享 OAuth 和 native Anthropic Messages route 支持 Claude subscription sign-in，涵盖 OAuth、provider 激活、CLI auth dispatch、配置凭据生成与存储等多个模块。

**重要性：高。** 这代表项目正在增强商业模型与主流 AI Provider 的登录集成能力。  
**社区反应：** 暂无评论，但从描述看属于已授权实现的 0.10.2 handoff 工作。

---

## 3. 重要 PR 进展

> 过去 24 小时共更新 6 个 PR；由于数据集中只有 6 个 PR，以下全部列出。

### 1. 插件 CLI 安装与应用内 OAuth 登录  
[#6950](https://github.com/codewhale-hq/Codewhale/pull/6950)  
**状态：OPEN**｜作者：LIghtJUNction｜标签：`contribution-gate`

该 PR 在已有 host-managed OAuth AI providers 基础上，补齐两个关键体验：  
- 为插件源码安装提供更简单的 CLI 入口；  
- 支持在应用内完成 OAuth 登录，而不必额外打开独立终端命令。

**影响：** 改善插件生态接入路径和 AI Provider 登录体验，是偏产品化的开发者体验增强。

---

### 2. 修复 relocated state root 下 sub-agent state path 校验  
[#6949](https://github.com/codewhale-hq/Codewhale/pull/6949)  
**状态：OPEN**｜作者：SparkofSpike

该 PR 修复当 `.codewhale` 通过 Windows junction 重定向到其他磁盘时，sub-agent 在 step 0 因路径校验失败而无法运行的问题。

**影响：** 对 Windows 用户尤其重要，解决跨卷状态目录部署下 sub-agent 无法启动的阻断问题。

---

### 3. 会话切换被阻塞时显示具体阻塞任务名称  
[#6948](https://github.com/codewhale-hq/Codewhale/pull/6948)  
**状态：OPEN**｜作者：SparkofSpike

此前当 runtime work 活跃时，新会话启动只提示“当前有运行中任务”，但不说明具体是哪项工作阻塞。该 PR 改进提示信息，帮助用户定位需要等待或取消的任务。

**影响：** 明显改善 TUI 可诊断性，与 Issue #6944 中“后台任务不可见”的 UX 问题方向一致。

---

### 4. 修复 relocated Codewhale home 下 artifact 写入失败  
[#6947](https://github.com/codewhale-hq/Codewhale/pull/6947)  
**状态：OPEN**｜作者：SparkofSpike

该 PR 修复 Windows junction 场景下，session artifact 写入被错误判定为越界的问题。该问题会导致 `/compact` 等依赖 artifact 的功能失败。

**影响：** 提升 Windows 文件系统兼容性，尤其是将 `%USERPROFILE%\.codewhale` 移到其他磁盘的用户。

---

### 5. 删除 30 个失效的 `dead_code` allow  
[#6946](https://github.com/codewhale-hq/Codewhale/pull/6946)  
**状态：OPEN**｜作者：Lstarsky0｜标签：`contribution-gate`

该 PR 通过 `cargo check --workspace --all-targets` 和强制 dead code warning，识别并移除 30 个已经不再覆盖任何警告的 `allow(dead_code)`。

**影响：** 降低技术债，提高 Rust 代码健康度，也有利于后续重构时发现真正的死代码。

---

### 6. 移除 5 个 TUI 模块中的 blanket `dead_code` allow  
[#6943](https://github.com/codewhale-hq/Codewhale/pull/6943)  
**状态：OPEN**｜作者：Lstarsky0｜标签：`contribution-gate`

该 PR 是 #5587 的一部分，针对 5 个 TUI 模块移除宽泛的 `#![allow(dead_code)]`，并逐项确认哪些 allow 已经过期，哪些仍有真实覆盖对象。

**影响：** 继续推进代码库警告治理，有利于 Runtime/TUI 拆分期间保持清晰的依赖和代码使用关系。

---

## 4. 功能需求趋势

### 1. Runtime/TUI 架构拆分成为主线

多个 Issue（[#6941](https://github.com/codewhale-hq/Codewhale/issues/6941)、[#6940](https://github.com/codewhale-hq/Codewhale/issues/6940)、[#6939](https://github.com/codewhale-hq/Codewhale/issues/6939)、[#6938](https://github.com/codewhale-hq/Codewhale/issues/6938)、[#6937](https://github.com/codewhale-hq/Codewhale/issues/6937)）都围绕 `codewhale-runtime` 与 TUI 的边界拆分展开。  
趋势上，项目正在从“终端 UI 内聚运行时能力”转向“runtime 可被 TUI、外部客户端和自动化系统复用”的架构。

### 2. Agent 长任务与后台任务可观测性需求上升

[#6944](https://github.com/codewhale-hq/Codewhale/issues/6944) 和 [#6948](https://github.com/codewhale-hq/Codewhale/pull/6948) 都指向同一个问题：当 Agent 执行长时间任务、后台任务或维护任务时，用户需要知道“正在运行什么、为什么阻塞、如何取消”。  
这说明 TUI 不再只是命令输入界面，而需要更强的 runtime task inspector 能力。

### 3. Workflow Runtime 可靠性成为重点

[#6945](https://github.com/codewhale-hq/Codewhale/issues/6945) 暴露了 verify gate 死锁问题，[#6938](https://github.com/codewhale-hq/Codewhale/issues/6938) 也涉及 workflow-runtime 测试边界。  
社区关注点正在从“能跑”转向“复杂多阶段工作流能否稳定、可验证、早失败”。

### 4. AI Provider 与 OAuth 登录体验持续增强

[#6932](https://github.com/codewhale-hq/Codewhale/issues/6932) 和 [#6950](https://github.com/codewhale-hq/Codewhale/pull/6950) 都涉及 OAuth、AI Provider 登录和 native route。  
趋势上，项目正在增强对 Claude/Anthropic 等主流 AI 服务的原生支持，并减少用户手动配置成本。

### 5. 工具面契约和文档一致性成为 0.10.2 重点修复项

[#6934](https://github.com/codewhale-hq/Codewhale/issues/6934) 关注 `file_search` 默认激活后的 public surface contract；[#6942](https://github.com/codewhale-hq/Codewhale/issues/6942) 关注 MCP 文档与实际行为不一致。  
这说明 0.10.2 中工具能力默认值变化较多，前端展示、文档、测试契约需要同步更新。

### 6. Windows 路径与 relocated state root 兼容性问题集中出现

[#6949](https://github.com/codewhale-hq/Codewhale/pull/6949) 和 [#6947](https://github.com/codewhale-hq/Codewhale/pull/6947) 均修复 Windows junction / relocated `.codewhale` 场景下的路径校验问题。  
这表明越来越多用户将状态目录迁移到其他磁盘，项目需要更稳健地处理 canonical path、junction、workspace root 与 state root 的边界。

---

## 5. 开发者关注点

### 1. 后台任务缺少可见性和可控性

开发者希望在 TUI 中清楚看到正在运行的后台任务、阻塞会话切换的具体任务，以及可取消或恢复的操作入口。当前相关问题集中在 [#6944](https://github.com/codewhale-hq/Codewhale/issues/6944) 与 [#6948](https://github.com/codewhale-hq/Codewhale/pull/6948)。

### 2. Runtime 边界需要更清晰

大量 RS 系列 Issue 说明当前 TUI 与 runtime 耦合仍较深。开发者关注模块所有权、测试依赖、命令契约、帮助系统、CLI parse 类型等是否能从 UI 层剥离，以便支持更通用的 runtime API。

### 3. 工具默认行为变化需要同步到文档和 public surface

`file_search`、MCP、Code mode 等能力的默认行为变化，如果没有同步到文档、Web 展示和 contract test，会导致开发者误判工具能力与权限边界。相关 Issue 包括 [#6934](https://github.com/codewhale-hq/Codewhale/issues/6934)、[#6942](https://github.com/codewhale-hq/Codewhale/issues/6942)。

### 4. Windows 文件系统场景需要更高优先级

多个 PR 说明 Windows junction、跨卷 state root、artifact path containment 等问题已经影响 sub-agent、session artifact、`/compact` 等核心功能。开发者对跨平台路径 canonicalization 的稳定性有明确需求。

### 5. OAuth 与 Provider 登录流程需要更顺滑

插件安装和 AI Provider 登录仍有摩擦。当前方向是通过 CLI 安装入口、应用内 OAuth、共享认证路由降低使用门槛，相关进展见 [#6950](https://github.com/codewhale-hq/Codewhale/pull/6950)、[#6932](https://github.com/codewhale-hq/Codewhale/issues/6932)。

### 6. 代码健康度治理仍在持续

[#6946](https://github.com/codewhale-hq/Codewhale/pull/6946) 和 [#6943](https://github.com/codewhale-hq/Codewhale/pull/6943) 显示维护者正在系统性清理失效的 `dead_code` allow。  
这类工作短期不直接改变功能，但对大型重构、模块拆分和长期可维护性非常关键。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*