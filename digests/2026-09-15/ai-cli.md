# AI CLI 工具社区动态日报 2026-09-15

> 生成时间: 2026-09-15 03:54 UTC | 覆盖工具: 9 个

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

# AI CLI 工具生态横向对比分析报告｜2026-09-15

## 1. 生态全景

当前主流 AI CLI 工具正在从“命令行聊天 / 代码助手”快速演进为 **Agent Runtime + Desktop/Web/Remote 多端协同平台**。  
社区反馈显示，用户已开始把这些工具用于长任务、后台任务、多会话并发、企业策略、远程执行、浏览器自动化和多模型接入，因此稳定性、权限治理、会话恢复和可观测性成为共同焦点。  
整体来看，Claude Code、Codex、Qwen Code、OpenCode、Pi 等项目处于高频迭代阶段；Gemini CLI 更强调安全、企业策略和 Agent 执行边界；Kimi Code CLI 今日较平稳，但反馈集中在中文用户体验和协作式 Agent 产品能力。  
行业趋势上，AI CLI 已不再只是开发者个人工具，而是在向 **可嵌入、可审计、可控制、可扩展的开发代理基础设施** 演进。

---

## 2. 各工具活跃度对比

> 注：部分仓库摘要未给出完整新增 Issue 总数，下表按“过去 24 小时摘要中明确统计或列出的数量”汇总。

| 工具 | Issues 活跃度 | PR 活跃度 | Release 情况 | 今日主要主题 |
|---|---:|---:|---|---|
| **Claude Code** | 至少 10 个重点 Issue | 0 | 2 个版本：v2.1.271、v2.1.272 | Remote sessions fast mode、Routines、Desktop/Web、Bash 稳定性、插件更新 |
| **OpenAI Codex** | 至少 10 个重点 Issue | 10 个重点 PR，均为 Closed | 4 个 Rust alpha：0.155.0-alpha.* | Windows Desktop、App Server / daemon、浏览器、沙箱、Spark 模型权限 |
| **Gemini CLI** | 1 个 Issue | 10 个重点 PR，多数 Open | 1 个 nightly | `-p` 挂起、AgentShell timeout、stdin、安全日志、企业 policy |
| **GitHub Copilot CLI** | 至少 10 个重点 Issue | 0 | 3 个版本：v1.0.84-6 到 v1.0.84-8 | Subagent 性能、MCP、沙箱策略、多模型 / BYOK、Agent Factory |
| **Kimi Code CLI** | 2 个 Issue | 0 | 无 | CJK IME 输入、Agent 回复批注与审阅 |
| **OpenCode** | 至少 10 个重点 Issue | 10 个重点 PR | 1 个版本：v1.18.31 | Provider 可用性、长会话、UI 布局、会话恢复、插件 / CodeMode |
| **Pi** | 26 个 Issue 更新 | 10 个 PR 更新 | 无 | 会话可靠性、Provider 扩展、多模态、TUI、扩展 API |
| **Qwen Code** | 至少 10 个重点 Issue | 至少 10 个重点 PR | 4 个版本：v0.23.4、nightly、CUA Driver v0.20.7 / v0.20.8 | ACP / serve、Hooks、Shell 权限、扩展、CUA、平台分发 |
| **DeepSeek TUI** | 至少 10 个重点 Issue | 4 个 PR | 无 | GPUI App-server API、TUI 稳定性、Provider、队列、会话恢复 |

---

## 3. 共同关注的功能方向

### 3.1 会话生命周期与长任务稳定性

多个工具都暴露出长会话、后台任务、恢复和中断处理问题。

| 工具 | 具体诉求 |
|---|---|
| **Claude Code** | Scheduled task 无法自归档、monitor tool 生命周期不足、二进制输出导致 session JSON 损坏、keep-awake 锁不释放 |
| **OpenAI Codex** | Turn 中断后保留 answer / plan、fork 附件复制、App Server 会话状态一致性 |
| **Copilot CLI** | Subagent 后台卡死、session 永久 “In use”、Agent Factory 需要暂停 / 恢复 |
| **OpenCode** | 长时间 “Thinking”、网络中断导致 conversation state 损坏、多轮对话后输出中断 |
| **Pi** | 并发 `pi -c` 写入同一 session、`/resume` 扫描性能差、session 时间戳语义问题 |
| **Qwen Code** | ACP 消息过大导致 session 被销毁、Linux 长任务静默崩溃 |
| **DeepSeek TUI** | running-work accounting、turn queue inspect / cancel、ACP session load 不一致 |

**结论：** 会话已成为 AI CLI 的核心状态资产。谁能提供可靠的恢复、回滚、超时、取消、归档和并发隔离，谁就更适合承载生产级 Agent 工作流。

---

### 3.2 权限、沙箱与企业策略治理

权限边界是今日高频共同主题。

| 工具 | 具体诉求 |
|---|---|
| **Codex** | Windows sandbox、macOS Seatbelt、权限 UI 与运行时不一致 |
| **Gemini CLI** | policy 目录权限校验、sandbox 扩展次数上限、A2A Server 凭据不落日志 |
| **Copilot CLI** | `/sandbox` host allow / deny、managed settings refresh、`allow dev tool access` 可能绕过策略 |
| **Qwen Code** | Shell 特殊空白字符绕过 allow rule、ACP approval mode 被忽略 |
| **OpenCode** | URL 凭证清理、Provider 内容策略错误分类 |
| **DeepSeek TUI** | App-server credential management route、Provider credential inspect / set / clear |
| **Claude Code** | Remote Control 配置被意外翻转、插件自动更新策略不符合 disabled 状态 |

**结论：** AI CLI 正进入企业与受控环境，权限模型需要从“提示用户确认”升级为 **可解释、可审计、可测试、跨平台一致** 的安全体系。

---

### 3.3 多模型、Provider 与 BYOK 兼容性

多模型接入带来的 schema、权限、quota、streaming 差异正在集中爆发。

| 工具 | 具体诉求 |
|---|---|
| **Codex** | Spark 模型 quota 显示充足但不可用，CLI / Desktop 模型列表不同步 |
| **Copilot CLI** | Grok 工具数限制、Gemini malformed MCP schema、BYOK DeepSeek 反序列化失败 |
| **OpenCode** | DeepSeek V4.1 Flash 不可用，自定义 GLM Provider 无限回复 |
| **Pi** | 新增 GMI Cloud、Antigravity Provider，修复 Responses API strict schema |
| **Qwen Code** | MiniMax 拒绝无参数 built-in tools，OpenAI-compatible 工具 schema 兼容性问题 |
| **DeepSeek TUI** | Gemini `/models` 报错，新增 AICraft Provider 模板 |

**结论：** “支持 OpenAI-compatible” 已不足够。下一阶段竞争点是 Provider adapter 的健壮性，包括 tool schema 归一化、错误分类、quota 显示、模型能力探测和 fallback 策略。

---

### 3.4 Hooks、插件、扩展与 Agent 可编程性

插件和 hooks 正从边缘能力变为高级工作流基础设施。

| 工具 | 具体诉求 |
|---|---|
| **Claude Code** | 希望 hooks 暴露 usage / rate-limit 事件；插件 disabled 后不应自动更新 |
| **Copilot CLI** | `/clear` 触发 `sessionEnd` hooks；策略驱动插件 enabled 状态不一致 |
| **Qwen Code** | Hook progress 事件、`/hooks` UI 与 registry 一致性、reload 后 disabled 状态保留 |
| **OpenCode** | 修复插件加载 `@opencode/plugin`，CodeMode 增加二进制类型 |
| **Pi** | provider hooks 应覆盖 summarization；扩展 API 需要 onSpawn、flush、atomic interrupt |
| **DeepSeek TUI** | `/hooks edit` 与外部编辑器 stdin 竞争，App-server 需要 command catalog |

**结论：** Agent 工具正在向“可编程平台”演进，hooks / plugins / extensions 的生命周期、一致性、权限与调试体验会显著影响生态质量。

---

### 3.5 Desktop / Web / Remote 多端化

多个工具都在从 CLI 扩展到桌面、Web、远程 runner 或 App-server。

| 工具 | 具体表现 |
|---|---|
| **Claude Code** | Remote sessions fast mode、Desktop Remote Control、Web artifact live sync |
| **Codex** | Windows Desktop、Chrome extension、App Server daemon、Project mirror sync |
| **Copilot CLI** | VS Code MCP、Agent Factory、CLI 配置侧边栏 |
| **Qwen Code** | CUA Driver、Web Terminal、ACP / serve、VS Code Companion |
| **DeepSeek TUI** | GPUI App-server API、jobs / workflows / files / artifacts |
| **OpenCode** | Desktop Tab 快捷键、VS Code extension、TUI / Desktop 布局争议 |

**结论：** CLI 只是入口之一，底层 Engine / Runtime 才是核心。未来产品形态会围绕同一 Agent Runtime 暴露 CLI、TUI、Desktop、Web、IDE、Remote API 等多个客户端。

---

## 4. 差异化定位分析

### Claude Code

**定位：** Anthropic 官方开发 Agent 平台，正从 CLI 扩展为远程、桌面、Web 和自动化任务平台。  
**功能侧重：**

- Remote sessions / runners
- Routines / scheduled tasks
- Desktop / Web session 管理
- Hooks、插件、prompt caching

**目标用户：** Claude 重度用户、团队开发者、需要远程执行和长期任务的工程团队。  
**技术路线：** 以 Claude 模型能力为核心，向多端 Agent 工作流扩展。当前痛点集中在 session 生命周期、Bash 工具兼容性和自动化任务可靠性。

---

### OpenAI Codex

**定位：** OpenAI 面向代码、桌面自动化、App Server 和 Computer Use 的综合开发 Agent。  
**功能侧重：**

- Rust CLI / daemon / App Server
- Windows sandbox
- Desktop 与浏览器连接
- 附件、fork、会话同步
- Spark / Astra 等模型路由

**目标用户：** ChatGPT / OpenAI 生态用户、Desktop Agent 用户、需要 Computer Use 和本地项目同步的开发者。  
**技术路线：** 强化 Desktop + daemon 架构，通过后台服务管理会话、附件、沙箱和浏览器能力。今日大量 PR 表明底层运行时仍处于快速重构期。

---

### Gemini CLI

**定位：** Google Gemini 生态下偏工程化、企业化和 Agent SDK 化的 CLI。  
**功能侧重：**

- AgentShell、SDK 执行
- A2A Server
- 企业 policy
- 安全日志与凭据治理
- stdin / print mode / timeout

**目标用户：** 需要将 Gemini CLI 嵌入脚本、CI、企业环境或 A2A 服务的开发者。  
**技术路线：** 重视安全边界、策略目录可信性、服务端日志规范和 Agent 执行控制。Issue 数不多，但 PR 指向核心基础设施。

---

### GitHub Copilot CLI

**定位：** GitHub Copilot 生态中的 CLI Agent，强调 MCP、多模型、企业策略和 GitHub 工作流集成。  
**功能侧重：**

- Subagent / Agent Factory
- MCP 集成
- BYOK / 多模型
- 沙箱网络规则
- 托管策略与 hooks

**目标用户：** GitHub / Copilot 企业用户、MCP 重度用户、多模型或 BYOK 用户。  
**技术路线：** 以 GitHub 生态和企业托管策略为核心，向多 agent 工作流扩展。当前最大问题是 subagent 性能、后台任务稳定性和 MCP schema 兼容性。

---

### Kimi Code CLI

**定位：** Moonshot Kimi 生态下的开发辅助入口，当前社区规模和今日活跃度较低。  
**功能侧重：**

- Kimi Web / Work / Code 体验联动
- 中文用户输入体验
- Agent 输出审阅与批注需求

**目标用户：** 中文开发者、Kimi Work / Kimi Code 用户、长文档和方案协作场景用户。  
**技术路线：** 今日反馈更偏产品交互层，而非底层 runtime。IME 问题体现基础国际化体验，可视化批注则显示 Kimi Work 有向协作式 Agent 平台发展的潜力。

---

### OpenCode

**定位：** 开源、高扩展、多 Provider 的 AI coding TUI / Desktop / Agent 平台。  
**功能侧重：**

- Provider 兼容
- TUI / Desktop 体验
- 会话恢复
- 插件与 CodeMode
- 企业可观测性

**目标用户：** 开源社区用户、多模型用户、自定义 Provider 用户、插件开发者。  
**技术路线：** 通过开放 Provider 和插件体系构建生态。当前挑战是快速 UI 改动引发用户争议，以及长会话、Provider 异常和网络中断恢复能力不足。

---

### Pi

**定位：** 高度活跃、偏底层可嵌入的 AI Agent / CLI 工具底座。  
**功能侧重：**

- Provider 扩展
- 会话系统性能
- TUI 边界处理
- 多模态图片上下文
- 扩展 API

**目标用户：** 重度 CLI 用户、Agent runtime 集成者、本地模型 / 多 Provider 用户。  
**技术路线：** 社区响应速度快，问题粒度偏底层工程质量，如 session 文件锁、timestamp、image MIME、provider hooks。成熟度体现在问题定位具体、修复快速，但说明真实使用边界也在快速扩大。

---

### Qwen Code

**定位：** Qwen 模型生态下的 Agent Runtime，强调 ACP / serve / CUA / hooks / 扩展。  
**功能侧重：**

- ACP 协议
- Hooks 系统
- Shell 权限安全
- CUA Driver
- DashScope Batch
- 跨平台分发

**目标用户：** Qwen / DashScope 用户、国内企业开发者、需要可嵌入 Agent Runtime 和批处理能力的团队。  
**技术路线：** 正从 CLI 向协议化 runtime 演进。今日 P1 问题较多，说明功能面快速扩张后，稳定性、安全和第三方模型兼容性成为主要压力点。

---

### DeepSeek TUI

**定位：** 以 TUI 为核心，正在演进为 Engine + GPUI App-server 架构的 DeepSeek 生态工具。  
**功能侧重：**

- App-server API
- GPUI 桌面端
- Session / queue / jobs / workflows
- Provider 管理
- TUI 终端稳定性

**目标用户：** DeepSeek 用户、TUI 爱好者、希望桌面端复用 Engine 状态的开发者。  
**技术路线：** 明确强调“不要在桌面端另造状态”，通过 Engine API 提供命令、凭据、文件、队列、任务等权威状态。当前处于桌面化基础设施补齐阶段。

---

## 5. 社区热度与成熟度

### 高活跃、高迭代工具

| 工具 | 依据 | 判断 |
|---|---|---|
| **Pi** | 26 个 Issue 更新、10 个 PR 更新 | 社区非常活跃，维护响应快，已进入重度真实使用阶段 |
| **Qwen Code** | 多个 Release、至少 10 个重点 PR、多个 P1 Issue | 快速扩张期，runtime / hooks / CUA / ACP 多线并进 |
| **OpenAI Codex** | 4 个 alpha Release、10 个 PR | 底层架构快速重构，尤其是 daemon / App Server / Windows sandbox |
| **OpenCode** | 1 个 Release、10 个 PR、多个高互动 Issue | 开源生态活跃，Provider 与 UI 争议并存 |
| **Claude Code** | 2 个 Release、至少 10 个重点 Issue | 官方迭代快，产品边界扩展导致复杂场景问题增加 |

### 中等活跃、重点明确工具

| 工具 | 依据 | 判断 |
|---|---|---|
| **Gemini CLI** | 1 个 Issue、10 个 PR | 社区新增 Issue 少，但维护重点非常工程化，偏安全和企业 |
| **Copilot CLI** | 3 个 Release、10 个重点 Issue、0 PR | 发布节奏快，问题集中在复杂 agent / MCP / 企业策略 |
| **DeepSeek TUI** | 10 个重点 Issue、4 个 PR | 正处于 GPUI / App-server 能力建设期 |

### 今日较平稳工具

| 工具 | 依据 | 判断 |
|---|---|---|
| **Kimi Code CLI** | 2 个 Issue、无 PR、无 Release | 今日活跃度低，但反馈方向具有产品价值，尤其是中文输入和协作审阅 |

---

## 6. 值得关注的趋势信号

### 趋势一：AI CLI 正在成为 Agent Runtime，而不是单纯 CLI

Claude Code 的 Remote sessions、Codex 的 App Server daemon、Qwen Code 的 ACP / serve、DeepSeek TUI 的 GPUI App-server、Pi 的扩展 API，都说明底层 Runtime 正在成为核心资产。

**对开发者的参考价值：**

- 选型时不要只看 CLI 交互体验，应关注是否支持 API、daemon、remote、session resume、queue、hooks。
- 如果要做团队级集成，应优先选择 runtime 状态模型清晰、可嵌入能力强的工具。

---

### 趋势二：长任务可靠性成为 AI Coding Agent 的分水岭

今日多个工具都出现了挂起、卡死、session corruption、后台任务不结束、网络中断后不可恢复等问题。

典型案例：

- Gemini CLI `-p` 无限挂起
- Claude Code binary output 导致 session 400 JSON 错误
- Copilot CLI subagent 运行不结束
- OpenCode 长时间 “Thinking”
- Qwen Code Linux 静默崩溃
- Pi 并发 session 写入冲突

**对开发者的参考价值：**

- 在 CI、自动化、长任务中使用 AI CLI 时，应主动设置外部 timeout、日志捕获和进程 watchdog。
- 不建议在缺少 session recovery 和 timeout 控制的工具上直接运行关键生产任务。

---

### 趋势三：权限治理从“用户确认”进入“策略系统”阶段

沙箱、Shell allow rule、policy directory、managed settings、approval mode、credential routes 都成为高频主题。

**对开发者的参考价值：**

- 企业采用 AI CLI 时，应重点评估：  
  - Shell 命令解析是否安全  
  - Sandbox 是否跨平台一致  
  - 策略是否可集中托管  
  - 权限 UI 是否等同于运行时真实权限  
  - 日志是否会泄露凭据
- 对安全敏感项目，应优先选择权限模型可审计、测试覆盖充分的工具。

---

### 趋势四：多模型 / BYOK 兼容性仍处于早期混乱阶段

OpenAI-compatible 并不等于完全兼容。MiniMax、DeepSeek、GLM、Grok、Gemini、OpenRouter、Azure 等 Provider 暴露出大量差异。

常见问题包括：

- 无参数 tool schema 被拒绝
- MCP schema malformed 导致 HTTP 400
- quota 显示与实际权限不一致
- 内容策略错误无法分类
- streaming / reasoning chunk 边界不一致

**对开发者的参考价值：**

- 如果依赖 BYOK 或第三方模型，应优先测试 tool calling、streaming、multi-turn、reasoning、image input 等关键路径。
- 工具选型时应关注 Provider adapter 层是否提供模型能力探测和错误归一化。

---

### 趋势五：Hooks / Plugins / Extensions 成为高级用户的关键诉求

多个工具正在增强 hooks、插件、扩展 API 和执行事件。

代表信号：

- Claude Code 希望 usage / rate-limit hook
- Qwen Code 新增 hook-progress
- Pi 修复 summarization provider hooks
- OpenCode 修复插件加载并扩展 CodeMode
- Copilot CLI 修复 sessionEnd hooks

**对开发者的参考价值：**

- 若要构建团队规范、审计、成本追踪、自动化检查或内部工具集成，hooks / plugins 能力比模型本身更重要。
- 应优先选择 hook 触发点完整、事件结构清晰、配置 reload 行为可靠的工具。

---

### 趋势六：Desktop / Web / IDE 化正在加速，但复杂度显著增加

Codex、Claude Code、Qwen Code、OpenCode、DeepSeek TUI 都在走向桌面端、Web 端、IDE 或远程控制。

带来的典型问题包括：

- Windows 文件锁和安装失败
- Chrome extension 安装失败
- Web artifact live sync 不一致
- PTY prebuild 缺失
- Desktop keep-awake 锁不释放
- GPUI 需要 Engine API 支撑

**对开发者的参考价值：**

- 桌面端能力通常意味着更好的交互体验，但也带来安装、签名、权限、文件锁、后台服务和同步一致性问题。
- 评估时应区分“CLI 核心能力成熟”与“Desktop 体验成熟”，二者不一定同步。

---

### 趋势七：可观测性、成本和额度透明度正在成为硬需求

Claude Code 用户要求 usage / rate-limit hook，Codex 用户要求任务预算和 Spark quota 可解释，OpenCode 用户要求 W3C traceparent，Pi 用户关注 provider hooks 和 session timestamp。

**对开发者的参考价值：**

- 团队级 AI 工具落地需要成本账本、quota 监控、trace 关联、错误分类和审计日志。
- 未来 AI CLI 的竞争点会从“能不能生成代码”转向“能不能被运营、监控、审计和治理”。

---

## 总体判断

今日 AI CLI 工具生态呈现出明显的 **平台化、协议化、企业化、多端化** 趋势。  
Claude Code、Codex、Qwen Code、OpenCode、Pi 是当前迭代最活跃的几类工具；Gemini CLI 更偏安全与企业基础设施；Copilot CLI 正在围绕 MCP、Subagent 和企业策略补强；DeepSeek TUI 处于从 TUI 向 GPUI App-server 架构过渡阶段；Kimi Code CLI 今日活跃度较低，但其中文输入和协作审阅需求具有明确产品价值。

对技术决策者而言，短期选型不应只比较模型能力，而应重点关注：

1. 会话与长任务是否可靠  
2. 权限 / 沙箱 / 策略是否可审计  
3. 多模型 Provider 兼容性是否成熟  
4. Hooks / 插件 / API 是否足够开放  
5. Desktop / Web / IDE 多端状态是否一致  
6. 是否具备成本、额度和运行状态可观测性  

这些因素将决定 AI CLI 工具能否从个人效率工具升级为团队级开发基础设施。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告  
数据截止：2026-09-15  
说明：PR 列表按社区评论/关注度排序，但原始数据中评论数字段为 `undefined`，因此以下排行依据给定排序、更新时间、关联 Issue 与主题热度综合判断。

---

## 1. 热门 Skills 排行

### 1. skill-creator 修复与评估稳定性  
- **PR**：[#1298 fix(skill-creator): isolate trigger evals and handle Windows and runtime failures](https://github.com/anthropics/skills/pull/1298)  
- **状态**：Open  
- **功能/变更**：修复 Skill 触发评估中的误判、Windows 子进程兼容性、运行时失败被错误视为“未触发”等问题。  
- **社区讨论热点**：  
  - Skill 触发率评估是否可信  
  - Windows 平台兼容性  
  - 自动化评测是否会掩盖真实错误  
- **关联需求**：Issue [#556](https://github.com/anthropics/skills/issues/556) 反映 `run_eval.py` 触发率为 0%，说明社区非常关注 Skill 创建与评估链路的可靠性。

---

### 2. mcp-builder：适配 MCP v2 与自定义 Headers  
- **PR**：[#1742 fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers](https://github.com/anthropics/skills/pull/1742)  
- **状态**：Open  
- **功能/变更**：适配 `mcp>=2.0.0` 中 `streamable_http_client` 的新导入路径，并支持通过新 API 配置自定义 HTTP headers。  
- **社区讨论热点**：  
  - MCP v2 兼容性  
  - 企业 API 鉴权场景  
  - Skill 与 MCP 生态的联动  
- **关联需求**：Issue [#1668](https://github.com/anthropics/skills/issues/1668)；同时 Issue [#16](https://github.com/anthropics/skills/issues/16) 也提出将 Skills 暴露为 MCP 的方向。

---

### 3. DOCX 评论与 Office 文档处理增强  
- **PR**：[#1734 Detect orphaned docx comments](https://github.com/anthropics/skills/pull/1734)  
- **状态**：Open  
- **功能/变更**：检测 DOCX 中孤立的评论对象，提升文档审阅、批注和修订场景的可靠性。  
- **社区讨论热点**：  
  - DOCX 结构一致性  
  - 批注、修订、书签等 OOXML 元素的冲突  
  - 企业文档自动化的安全与正确性  
- **相关 PR**：  
  - [#541 fix(docx): prevent tracked change w:id collision with existing bookmarks](https://github.com/anthropics/skills/pull/541)  
  - [#1765 fix(office): decode redlining diffs as UTF-8](https://github.com/anthropics/skills/pull/1765)

---

### 4. document-typography：文档排版质量控制  
- **PR**：[#514 Add document-typography skill](https://github.com/anthropics/skills/pull/514)  
- **状态**：Open  
- **功能/变更**：用于检查 AI 生成文档中的排版问题，例如孤行、寡行、标题悬挂、编号错位等。  
- **社区讨论热点**：  
  - AI 生成文档的专业排版质量  
  - 面向报告、合同、提案等正式文档的自动质检  
  - “用户不一定会明确要求，但交付质量需要默认保证”的 Skill 设计理念  
- **趋势意义**：表明社区不只关注生成内容，也开始关注最终交付物的专业质量。

---

### 5. ODT / OpenDocument Skill  
- **PR**：[#486 Add ODT skill — OpenDocument text creation and template filling and parse ODT to HTML](https://github.com/anthropics/skills/pull/486)  
- **状态**：Open  
- **功能/变更**：支持创建、填充、读取和转换 `.odt` / `.ods` / ODF 文件，覆盖 LibreOffice 与开放文档标准场景。  
- **社区讨论热点**：  
  - 非 Microsoft Office 文档格式支持  
  - 开源办公套件与 ISO 标准文档工作流  
  - 模板填充、文档解析、HTML 转换  
- **趋势意义**：文档类 Skills 正从 DOCX/PDF 扩展到更开放、更跨平台的格式。

---

### 6. pyxel：复古游戏开发 Skill  
- **PR**：[#525 Add pyxel skill for retro game development](https://github.com/anthropics/skills/pull/525)  
- **状态**：Open  
- **功能/变更**：面向 Pyxel 复古游戏引擎，支持像素风、8-bit、Python 小游戏的创建、运行、截图检查和迭代。  
- **社区讨论热点**：  
  - Claude Code 辅助游戏原型开发  
  - MCP 工具与视觉反馈循环  
  - 创意编码与互动内容生成  
- **趋势意义**：说明 Skills 不仅服务企业工作流，也在扩展到创意开发与多媒体生成。

---

### 7. md2video-audio：Markdown 转视频与语音  
- **PR**：[#1703 Add md2video-audio skill](https://github.com/anthropics/skills/pull/1703)  
- **状态**：Open  
- **功能/变更**：将 Markdown 文档转换为带语音旁白的 MP4 视频，使用 Marp 生成幻灯片，并结合音频生成流程。  
- **社区讨论热点**：  
  - 低成本内容生产自动化  
  - 文档到演示视频的端到端转化  
  - 教程、课程、内部培训材料生成  
- **趋势意义**：内容生产类 Skills 正从“写文档”走向“生成可发布媒体资产”。

---

### 8. Hivemind：零成本多 Agent 编排  
- **PR**：[#1628 Add Hivemind: Zero-Cost Multi-Agent Orchestration Skill](https://github.com/anthropics/skills/pull/1628)  
- **状态**：Open  
- **功能/变更**：让 Claude Code 将机械性任务委派给基于免费模型的 headless `opencode` worker，Claude Code 负责规划、审核与合并。  
- **社区讨论热点**：  
  - 多 Agent 协作  
  - 成本控制  
  - 主 Agent 与 worker 的职责边界  
  - 上下文资源优化  
- **趋势意义**：反映社区正在探索“Claude 作为高级调度器，低成本模型执行子任务”的新工作模式。

---

## 2. 社区需求趋势

### 趋势一：Skill 安全、信任边界与命名空间治理  
- **代表 Issue**：[#492 Security: Community skills distributed under anthropic/ namespace enable trust boundary abuse](https://github.com/anthropics/skills/issues/492)  
- **关注点**：社区 Skill 使用 `anthropic/` 命名空间可能造成官方背书错觉，进而诱导用户授予高权限。  
- **需求方向**：  
  - 官方/社区 Skill 明确区分  
  - Skill 权限提示与签名机制  
  - 安全审计与可信来源标识  
- **相关 PR**：[#83 Add skill-quality-analyzer and skill-security-analyzer](https://github.com/anthropics/skills/pull/83)

---

### 趋势二：组织级 Skill 分享与企业协作  
- **代表 Issue**：[#228 Enable org-wide skill sharing in Claude.ai](https://github.com/anthropics/skills/issues/228)  
- **关注点**：当前 Skill 分享依赖手动下载、发送、上传，难以在组织内规模化分发。  
- **需求方向**：  
  - 组织级 Skill Library  
  - 内部 Skill Marketplace  
  - 权限管理、版本管理、共享链接  
- **潜在影响**：这是企业采用 Claude Code Skills 的关键基础能力。

---

### 趋势三：Skill 创建、触发与评估体系可靠性  
- **代表 Issues**：  
  - [#556 run_eval.py: claude -p never triggers skills/commands](https://github.com/anthropics/skills/issues/556)  
  - [#202 skill-creator should be updated to best practice](https://github.com/anthropics/skills/issues/202)  
- **关注点**：Skill 触发不稳定、评估链路不透明、skill-creator 过于文档化而非操作化。  
- **需求方向**：  
  - 更可靠的触发测试  
  - 更清晰的 Skill 编写规范  
  - 面向 Claude 执行的 Skill 模板，而非面向人类阅读的说明书  
- **相关 PR**：[#1298](https://github.com/anthropics/skills/pull/1298)、[#539](https://github.com/anthropics/skills/pull/539)

---

### 趋势四：MCP 与 Skills 的深度融合  
- **代表 Issues**：  
  - [#16 Expose Skills as MCPs](https://github.com/anthropics/skills/issues/16)  
  - [#1390 mcp-builder evaluation.py scores 0/N against any real MCP server](https://github.com/anthropics/skills/issues/1390)  
- **关注点**：社区希望 Skills 不只是提示与流程封装，而能和 MCP 一样形成可调用、可组合的软件接口。  
- **需求方向**：  
  - Skill ↔ MCP 转换  
  - MCP Builder 稳定性  
  - MCP 工具评估与调试体验  
- **相关 PR**：[#1742](https://github.com/anthropics/skills/pull/1742)、[#1724](https://github.com/anthropics/skills/pull/1724)、[#1602](https://github.com/anthropics/skills/pull/1602)

---

### 趋势五：文档生成、审阅与格式处理仍是核心场景  
- **代表 Issues / PRs**：  
  - [#1487 claude-api skill eagerly injects ~156k tokens](https://github.com/anthropics/skills/issues/1487)  
  - [#486 ODT skill](https://github.com/anthropics/skills/pull/486)  
  - [#514 document-typography](https://github.com/anthropics/skills/pull/514)  
  - [#541 DOCX tracked change fix](https://github.com/anthropics/skills/pull/541)  
- **关注点**：文档格式、审阅、批注、排版、上下文消耗、Office 兼容性。  
- **需求方向**：  
  - 更强的 Office / ODF / PDF 支持  
  - 文档质量自动检查  
  - 更节省上下文的文档处理策略

---

### 趋势六：Agent 治理、质量门禁与多 Agent 编排  
- **代表 Issues**：  
  - [#412 Skill proposal: agent-governance](https://github.com/anthropics/skills/issues/412)  
  - [#1385 Reasoning Quality Gate Pipeline](https://github.com/anthropics/skills/issues/1385)  
  - [#1329 compact-memory](https://github.com/anthropics/skills/issues/1329)  
- **关注点**：Agent 安全、推理质量、长任务记忆压缩、多 Agent 工作流。  
- **需求方向**：  
  - 任务前校准  
  - 对抗式审查  
  - 交付前验证  
  - 上下文压缩与长期状态管理  
- **相关 PR**：[#1628 Hivemind](https://github.com/anthropics/skills/pull/1628)

---

## 3. 高潜力待合并 Skills

以下 PR 均处于 Open 状态，且具备较高社区关注度或与高热 Issue 直接相关，可能是近期优先落地对象。

| Skill / PR | 当前状态 | 潜力判断 |
|---|---:|---|
| [#1298 skill-creator trigger eval fixes](https://github.com/anthropics/skills/pull/1298) | Open | 基础设施级修复，直接影响 Skill 创建、测试和质量评估，优先级高 |
| [#1742 mcp-builder MCP v2 support](https://github.com/anthropics/skills/pull/1742) | Open | MCP 生态升级带来的兼容性需求明确，落地价值高 |
| [#1734 Detect orphaned docx comments](https://github.com/anthropics/skills/pull/1734) | Open | 文档审阅场景刚需，适合并入 Office/DOCX Skill 修复链 |
| [#514 document-typography](https://github.com/anthropics/skills/pull/514) | Open | 面向最终交付质量，适用范围广，文档生成场景价值明显 |
| [#486 ODT skill](https://github.com/anthropics/skills/pull/486) | Open | 补齐 OpenDocument / LibreOffice 生态，对跨平台办公用户有吸引力 |
| [#525 pyxel skill](https://github.com/anthropics/skills/pull/525) | Open | 创意编码方向明确，并且长期保持更新，适合拓展 Skills 应用边界 |
| [#1703 md2video-audio](https://github.com/anthropics/skills/pull/1703) | Open | Markdown 到视频的自动化链路具备内容生产价值，适合教育、培训、营销场景 |
| [#1628 Hivemind](https://github.com/anthropics/skills/pull/1628) | Open | 多 Agent 与成本优化方向前沿，但可能需要更多安全与执行边界审查 |

---

## 4. Skills 生态洞察

**一句话总结：当前 Claude Code Skills 社区最集中的诉求，是让 Skills 从“可分享的提示/流程包”升级为“安全可信、可评估、可组织分发、可与 MCP/Agent 工作流深度集成的生产级自动化能力”。**

---

# Claude Code 社区动态日报  
日期：2026-09-15  
数据源：github.com/anthropics/claude-code

## 1. 今日速览

过去 24 小时 Claude Code 连续发布 v2.1.271 与 v2.1.272，重点包括 Remote sessions 的 fast mode 支持、全屏 `/config` 鼠标滚轮支持，以及后续 bug fix 与可靠性改进。  
社区反馈集中在会话稳定性、计划任务 / Routines、Desktop 与 Web 体验、插件自动更新、终端 / Bash 工具调用异常等方向，说明 Claude Code 正在从 CLI 工具扩展为跨桌面、云端、远程执行和自动化任务平台后，边界场景明显增多。  
过去 24 小时无 Pull Request 更新。

---

## 2. 版本发布

### v2.1.272  
链接：https://github.com/anthropics/claude-code/releases/tag/v2.1.272

**更新内容：**

- Bug fixes and reliability improvements
- 该版本看起来是紧随 v2.1.271 的稳定性修复版本，可能用于处理近期快速迭代后暴露的问题。

### v2.1.271  
链接：https://github.com/anthropics/claude-code/releases/tag/v2.1.271

**更新内容：**

- Remote sessions 支持 fast mode：
  - 适用于 cloud 与 self-hosted runners。
  - session 内输入 `/fast` 或使用 host 的 fast-mode 设置，在组织策略允许时生效。
- 全屏 `/config` 面板新增鼠标支持：
  - 鼠标滚轮可滚动设置项。

**分析：**

v2.1.271 的重点是提升远程会话效率和配置面板可用性。fast mode 被扩展到远程执行环境，说明 Claude Code 正在强化云端 / 自托管 runner 的交互式开发体验。

---

## 3. 社区热点 Issues

### 1. Function hooks 缺少 session usage / rate-limit 变化事件  
Issue：#94424  
链接：https://github.com/anthropics/claude-code/issues/94424  
状态：OPEN  
标签：enhancement, area:hooks  
社区反应：1 条评论，0 👍

**为什么重要：**  
用户正在构建显示上下文窗口占用、5 小时 / 7 天额度窗口、单轮成本账本等工具，目前需要轮询 `$.session.usage()`。该需求希望增加事件型 hook，让使用量或限流窗口变化时主动通知。

**分析：**  
这反映出 Claude Code 插件 / mod 生态开始关注可观测性与成本追踪。若官方提供事件机制，可显著降低外部工具的轮询成本，并改善额度监控体验。

---

### 2. Scheduled task 无法归档自身 session  
Issue：#94418  
链接：https://github.com/anthropics/claude-code/issues/94418  
状态：OPEN  
标签：bug, platform:macos, area:routines  
社区反应：1 条评论，0 👍

**为什么重要：**  
计划任务最后调用 `archive_session("self")` 后，session 没有被归档，且没有错误提示。对于自动化任务来说，无法自我清理会导致 session 列表膨胀，也会影响长期运行的工作流。

**分析：**  
Routines / scheduled tasks 正在成为 Claude Code 自动化能力的重要组成部分。此类 silent failure 会降低用户对自动任务可靠性的信任。

---

### 3. 二进制工具输出后 session 永久 400 JSON 错误  
Issue：#94408  
链接：https://github.com/anthropics/claude-code/issues/94408  
状态：OPEN  
标签：duplicate, platform:macos, area:bash  
社区反应：1 条评论，0 👍

**为什么重要：**  
用户报告长时间运行的 CLI session 在工具输出二进制内容后持续出现：

```text
API Error: 400 The request body is not valid JSON: unexpected end of data
```

并且后续 turn、fork、恢复操作均无法修复。

**分析：**  
这是严重的 session corruption 问题。Claude Code 大量依赖 shell / Bash 工具输出，如果某类输出能破坏整个会话，将直接影响长任务、调试任务和生产级使用体验。

---

### 4. Monitor tool 不遵守 persistent flag，实际生命周期约 30 分钟  
Issue：#94393  
链接：https://github.com/anthropics/claude-code/issues/94393  
状态：OPEN  
标签：bug, has repro, platform:linux, area:tools  
社区反应：1 条评论，4 👍

**为什么重要：**  
该 issue 有可复现信息，并获得今日最高点赞。用户指出 monitor tool 的 `timeout_ms` schema 上限为 3600000，但实际生命周期约 30 分钟，即使 session 活跃也会终止。

**分析：**  
这影响长时间监控、日志跟踪、构建观察、服务健康检查等场景。对 DevOps 和 agent 长任务执行非常关键。

---

### 5. 插件自动更新会处理已禁用插件，并在版本比较前重新 clone URL 源  
Issue：#94429  
链接：https://github.com/anthropics/claude-code/issues/94429  
状态：OPEN  
标签：bug, has repro, platform:macos, area:plugins  
社区反应：0 条评论，0 👍

**为什么重要：**  
用户指出 disabled plugins 仍会触发 auto-update，且 `source:"url"` 的插件在版本比较前就会重新 clone repo。该问题可能造成无谓网络请求、磁盘临时目录膨胀和性能下降。

**分析：**  
随着插件生态扩大，插件生命周期管理将成为核心基础能力。禁用状态、缓存策略、版本比较顺序等细节会直接影响开发者对插件系统的信任。

---

### 6. Linux 下运行 `nmcli` 导致 Claude Code 挂起  
Issue：#94428  
链接：https://github.com/anthropics/claude-code/issues/94428  
状态：OPEN  
标签：bug, platform:linux, area:bash  
社区反应：0 条评论，0 👍

**为什么重要：**  
`nmcli` 是 Linux 网络管理常用命令。如果运行该命令导致 Claude Code hang，会影响网络诊断、服务器配置和本地开发环境管理。

**分析：**  
该问题属于 Bash 工具兼容性。Claude Code 需要稳定处理交互式、长输出、阻塞式或特殊 TTY 行为的命令。

---

### 7. Remote Control 自动启用配置被无故从 true 变为 false  
Issue：#94427  
链接：https://github.com/anthropics/claude-code/issues/94427  
状态：OPEN  
标签：bug, platform:windows, area:desktop  
社区反应：0 条评论，0 👍

**为什么重要：**  
用户报告 Windows Desktop 中 `rcAutoEnable` 在没有本地配置变更的情况下从 `enable=true` 变成 `enable=false`。

**分析：**  
Remote Control 是跨设备 / 桌面控制体验的关键能力。配置状态被意外翻转可能导致用户误以为远程能力失效，尤其影响多机器工作流。

---

### 8. Claude Code Web artifact db live sync reload 后不更新页面  
Issue：#94426  
链接：https://github.com/anthropics/claude-code/issues/94426  
状态：OPEN  
标签：bug, area:claude-code-web, platform:web  
社区反应：0 条评论，0 👍

**为什么重要：**  
Web 端 artifact db 的 live sync 在页面 reload 后不能正确传递更新，影响基于 artifact 的交互式应用或数据展示。

**分析：**  
Claude Code Web 正在承载更多 UI、artifact 和云端工作流能力。同步一致性是 Web 体验的底层要求。

---

### 9. Desktop Linux keep-awake hold 在 re-adopted / stalled session 后不释放  
Issue：#94420  
链接：https://github.com/anthropics/claude-code/issues/94420  
状态：OPEN  
标签：bug, has repro, platform:linux, area:desktop  
社区反应：0 条评论，0 👍

**为什么重要：**  
启用 “Keep computer awake while Claude works” 后，如果 Code session 被重新接管或卡住，Desktop 持有的 keep-awake 锁不会释放，导致系统数小时无法自动休眠。

**分析：**  
这是桌面端资源生命周期管理问题。对笔记本用户和长时间后台任务场景影响明显，也涉及电源管理和系统体验。

---

### 10. CLAUDE.md / auto-memory 未按文档成为跨 session 共享缓存层  
Issue：#94417  
链接：https://github.com/anthropics/claude-code/issues/94417  
状态：OPEN  
标签：bug, has repro, area:core  
社区反应：0 条评论，0 👍

**为什么重要：**  
用户指出 CLAUDE.md / auto-memory 实际被放在第一个 user message 的首个 content block 中，并没有独立 `cache_control`，因此无法像文档描述那样作为同目录并行 session 的共享缓存层。

**分析：**  
这直接关系到 prompt caching 的成本和性能。项目上下文缓存若不能复用，会提高 token 成本、降低多 session 并行效率。

---

## 4. 重要 PR 进展

过去 24 小时无 Pull Request 更新。

链接：https://github.com/anthropics/claude-code/pulls

**观察：**

- 今日主要活动集中在 release 与 issue 反馈。
- v2.1.271 / v2.1.272 的连续发布表明维护团队仍在快速迭代稳定性与远程会话能力。
- 无公开 PR 可能意味着核心开发仍以内部分支或非公开流程推进。

---

## 5. 功能需求趋势

### 1. 会话可观测性与成本追踪  
相关 Issue：  
- #94424：https://github.com/anthropics/claude-code/issues/94424  
- #94417：https://github.com/anthropics/claude-code/issues/94417  

开发者希望更好地追踪 session usage、rate-limit 窗口、上下文占用、成本账本与缓存命中情况。  
这说明 Claude Code 已进入更重度、长期、多人或多 session 使用阶段，用户开始关注运行成本和资源透明度。

---

### 2. Routines / Scheduled Tasks 的可靠性  
相关 Issue：  
- #94418：https://github.com/anthropics/claude-code/issues/94418  
- #94415：https://github.com/anthropics/claude-code/issues/94415  
- #94410：https://github.com/anthropics/claude-code/issues/94410  
- #94409：https://github.com/anthropics/claude-code/issues/94409  
- #94411：https://github.com/anthropics/claude-code/issues/94411  

计划任务相关问题较多，包括自归档失败、设备休眠后任务永久 disabled、幽灵任务每分钟触发、云端 routine schedule 无法编辑、Windows 上特定模型下任务无法保存等。

**趋势判断：**  
Routines 正从实验性自动化能力转向实际工作流基础设施，但目前在生命周期、状态恢复、跨设备一致性和错误提示方面仍需加强。

---

### 3. Desktop 跨平台体验与资源管理  
相关 Issue：  
- #94420：https://github.com/anthropics/claude-code/issues/94420  
- #94419：https://github.com/anthropics/claude-code/issues/94419  
- #94427：https://github.com/anthropics/claude-code/issues/94427  
- #94412：https://github.com/anthropics/claude-code/issues/94412  
- #94406：https://github.com/anthropics/claude-code/issues/94406  

用户反馈覆盖 Linux、macOS、Windows Desktop，包括 keep-awake 锁不释放、点击 “+ New” 却回到旧 session、Remote Control 配置变化、Windows MSIX 配置存储限制、语音听写丢词等。

**趋势判断：**  
Claude Desktop 与 Claude Code 的融合正在增加复杂性。用户需要稳定的跨平台桌面体验，尤其是 session 管理、远程控制、权限配置和系统资源释放。

---

### 4. Bash / Shell 工具调用稳定性  
相关 Issue：  
- #94408：https://github.com/anthropics/claude-code/issues/94408  
- #94428：https://github.com/anthropics/claude-code/issues/94428  
- #94416：https://github.com/anthropics/claude-code/issues/94416  

问题包括二进制输出导致 session JSON 损坏、`nmcli` 挂起、Windows VS Code 扩展每次 Bash / PowerShell 调用弹出空白终端窗口。

**趋势判断：**  
工具调用是 Claude Code 的核心路径。对复杂输出、交互式命令、不同平台 shell 行为的兼容性，是后续稳定性的关键。

---

### 5. Web 与云端同步能力  
相关 Issue：  
- #94426：https://github.com/anthropics/claude-code/issues/94426  
- #94423：https://github.com/anthropics/claude-code/issues/94423  
- #94409：https://github.com/anthropics/claude-code/issues/94409  

Web 端出现 artifact live sync、重复 name / role setup、Cloud Routine schedule 无法编辑等问题。

**趋势判断：**  
Claude Code Web 正承担更多云端开发与协作入口的职责。同步状态、初始化流程、API 与 UI 一致性会是重点改进方向。

---

### 6. 插件系统治理  
相关 Issue：  
- #94429：https://github.com/anthropics/claude-code/issues/94429  

插件自动更新、禁用状态、缓存与 clone 行为被社区关注。

**趋势判断：**  
随着插件生态增长，用户需要更可控、更可预期的插件管理机制，包括禁用插件不更新、版本检查更轻量、临时目录清理、网络访问可控等。

---

## 6. 开发者关注点

### 1. “静默失败” 是高频痛点  
多个 issue 提到操作发生但无错误提示，例如：

- scheduled task 调用 `archive_session("self")` 后无效果：#94418  
  https://github.com/anthropics/claude-code/issues/94418
- Cloud Routine schedule 无法编辑：#94409  
  https://github.com/anthropics/claude-code/issues/94409
- Remote Control 配置状态变化不透明：#94427  
  https://github.com/anthropics/claude-code/issues/94427

开发者希望 Claude Code 在工具调用、任务保存、session 生命周期变化时提供明确错误、日志和恢复建议。

---

### 2. 长任务与后台任务仍不够稳  
相关问题包括 monitor 工具生命周期不足、scheduled tasks 恢复失败、Desktop keep-awake 不释放、幽灵任务重复触发等。  
这说明用户正在让 Claude Code 执行更长时间、更自动化的任务，但底层调度和资源生命周期仍需增强。

---

### 3. 多设备 / 远程 session 需要更清晰的身份标识  
Issue #94421 提到 session 列表在多台机器上同步显示，但 UI 没有标明 session 绑定到哪台物理机器。  
链接：https://github.com/anthropics/claude-code/issues/94421

这对远程开发非常重要，因为 session 的 shell、文件系统和进程都绑定到创建它的机器。缺少机器标识会导致误操作和上下文混淆。

---

### 4. Prompt caching 与 CLAUDE.md 复用能力影响成本  
Issue #94417 指出项目上下文没有按预期成为共享缓存层。  
链接：https://github.com/anthropics/claude-code/issues/94417

对于大型代码库、多 session 并行开发、团队协作场景，缓存层是否正确工作直接影响响应速度与 token 成本。

---

### 5. Windows 与 Linux 平台问题增多  
今日多个 issue 来自 Windows / Linux：

- Windows VS Code Bash / PowerShell 弹窗：#94416  
  https://github.com/anthropics/claude-code/issues/94416
- Windows Remote Control 配置变化：#94427  
  https://github.com/anthropics/claude-code/issues/94427
- Linux `nmcli` hang：#94428  
  https://github.com/anthropics/claude-code/issues/94428
- Linux keep-awake 锁不释放：#94420  
  https://github.com/anthropics/claude-code/issues/94420
- Linux monitor tool 生命周期问题：#94393  
  https://github.com/anthropics/claude-code/issues/94393

Claude Code 正在面向更广泛平台使用，跨平台一致性和系统集成质量将成为社区重点关注方向。

---

### 6. 用户对模型行为与验证可靠性有明显不满  
相关 Issue：

- Opus 在 audit analysis 中产生 false claims：#94414  
  https://github.com/anthropics/claude-code/issues/94414
- Agent validation checks 在 broken deployments 上错误通过：#94413  
  https://github.com/anthropics/claude-code/issues/94413
- 项目任务和 routine development work 效果不佳：#94404  
  https://github.com/anthropics/claude-code/issues/94404

开发者希望 agent 不只是“看起来完成”，而是能基于真实部署、测试和验证结果给出可靠结论。验证闭环、测试执行和错误识别能力仍是关键诉求。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报  
**日期：2026-09-15**  
**数据源：github.com/openai/codex**

---

## 1. 今日速览

过去 24 小时 Codex 仓库发布了 4 个 Rust alpha 版本，版本号集中在 `0.155.0-alpha.*`，显示团队正在进行高频迭代与候选验证。社区反馈主要集中在 Windows Desktop、浏览器/Computer Use、模型可用性、沙箱权限、App Server 会话一致性等方向，尤其是 Windows 端启动、扩展安装、远程连接和 Spark 模型访问问题较为突出。

---

## 2. 版本发布

过去 24 小时共有 4 个新 Release：

- [`rust-v0.155.0-alpha.6`](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.6)  
  发布 `0.155.0-alpha.6`，属于 Rust 版本线的 alpha 迭代。

- [`rust-v0.155.0-alpha.5`](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.5)  
  发布 `0.155.0-alpha.5`。

- [`rust-v0.155.0-alpha.4`](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.4)  
  发布 `0.155.0-alpha.4`。

- [`rust-v0.155.0-alpha.2.4`](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.2.4)  
  发布 `0.155.0-alpha.2.4`。

**观察：** 当前 Release 描述较简略，但结合 PR 动态来看，本轮 alpha 可能围绕 App Server、Windows 沙箱、daemon 包管理、附件处理、工具调用事件与运行时稳定性进行密集验证。

---

## 3. 社区热点 Issues

### 1. Windows Desktop 启动因 EPERM 失败  
- Issue：[#45593](https://github.com/openai/codex/issues/45593)  
- 状态：Open  
- 标签：`bug`, `windows-os`, `app`  
- 评论数：2  
- 重要性：用户报告 Windows 11 上 Desktop 启动反复失败，错误出现在 bundled executable `rename_staging` 阶段，且 ProcMon 改变时序后可成功启动，暗示存在文件锁、权限或安装器竞态问题。  
- 社区反应：评论数不高，但问题影响应用可启动性，优先级应较高。

### 2. Codex CLI 0.154.0 无法使用 `gpt-5.3-codex-spark`  
- Issue：[#45590](https://github.com/openai/codex/issues/45590)  
- 状态：Open  
- 标签：`bug`, `CLI`  
- 评论数：2  
- 重要性：Pro 用户在 macOS 上无法通过 CLI 使用 Spark 模型，涉及模型路由、模型列表同步或权限识别。  
- 社区反应：与其他 Spark quota 问题形成呼应，说明新模型可用性是当前高频痛点。

### 3. Windows 无法安装 Chrome connection extension  
- Issue：[#45589](https://github.com/openai/codex/issues/45589)  
- 状态：Open  
- 标签：`bug`, `windows-os`, `extension`, `app`, `browser`  
- 评论数：2  
- 重要性：桌面应用的浏览器连接功能依赖 Chrome 扩展，用户在 Web Store 看到“This item cannot be purchased or downloaded”，可能涉及地区、发布渠道、扩展权限或商店配置。  
- 社区反应：浏览器自动化是 Codex Desktop 的关键能力，安装失败会直接阻断 Computer Use 场景。

### 4. 自定义权限显示与运行时配置不一致  
- Issue：[#45586](https://github.com/openai/codex/issues/45586)  
- 状态：Open  
- 标签：`bug`, `sandbox`, `app`, `app-server`  
- 评论数：2  
- 重要性：用户在 macOS 上报告 Codex 自定义权限 profile 的 UI 展示与实际运行时权限不一致，涉及 workspace root、write target 和 sandbox 继承逻辑。  
- 社区反应：该问题对高级用户影响较大，尤其是需要精细控制目录访问和写权限的开发工作流。

### 5. 自定义 Responses Provider 中 `tool_search` 暴露空 schema  
- Issue：[#45585](https://github.com/openai/codex/issues/45585)  
- 状态：Open  
- 标签：`bug`, `custom-model`, `tool-calls`, `app`  
- 评论数：2  
- 重要性：使用 DeepSeek 等 strict Responses provider 时，`tool_search` 调用后线程永久失败，原因是 deferred tools 以空 schema 暴露。  
- 社区反应：对自定义模型和第三方 provider 生态影响明显，关系到 Codex 的开放模型兼容性。

### 6. Windows Browser 初始化失败，缺少 `browser-service.mjs` 或插件版本不匹配  
- Issue：[#45584](https://github.com/openai/codex/issues/45584)  
- 状态：Open  
- 标签：`bug`, `windows-os`, `app`, `skills`, `browser`  
- 评论数：2  
- 重要性：用户报告 Windows Codex 内置 Browser 无法初始化，不能读取已打开网页。问题指向打包资源缺失或 browser plugin / app 版本不一致。  
- 社区反应：与 #45589、#45576 一起显示 Windows 浏览器集成是今日最集中的问题区域之一。

### 7. `gpt-6-astra/low` 在正常 bug triage 中触发 cyber_policy  
- Issue：[#45553](https://github.com/openai/codex/issues/45553)  
- 状态：Open  
- 标签：`bug`, `model-behavior`, `app`, `safety-check`  
- 评论数：2  
- 重要性：用户报告良性 bug triage 被安全策略反复拦截，而 Sol continuation 不受影响，说明模型/策略组合可能存在误报。  
- 社区反应：安全误报会直接影响开发者对 Codex 作为代码审查与调试助手的信任。

### 8. 希望支持可强制执行的任务预算与更清晰的用量控制  
- Issue：[#45536](https://github.com/openai/codex/issues/45536)  
- 状态：Open  
- 标签：`enhancement`, `rate-limits`, `app`  
- 评论数：2  
- 重要性：付费用户希望对单个任务的额度消耗设置预算上限，并获得更明确的用量提示。  
- 社区反应：虽然评论数有限，但与 Spark quota、Pro 额度不可用等问题相互印证，说明“可预测成本/额度控制”是社区强需求。

### 9. ChatGPT Project mirror sync 在 Windows 上失败  
- Issue：[#45596](https://github.com/openai/codex/issues/45596)  
- 状态：Open  
- 标签：`bug`, `windows-os`, `app`  
- 评论数：1  
- 重要性：用户报告 Work helpers 占用 mirror directory 后，ChatGPT project mirror sync 失败。该问题影响 Projects 与本地工作区同步，是桌面开发体验的基础能力。  
- 社区反应：目前讨论较少，但涉及项目同步和文件占用，可能与 Windows 文件锁问题同源。

### 10. Spark quota 显示 100% 剩余但模型不可用  
- Issue：[#45594](https://github.com/openai/codex/issues/45594)  
- 状态：Open  
- 标签：`bug`, `windows-os`, `auth`, `rate-limits`, `CLI`  
- 评论数：1  
- 重要性：ChatGPT Pro 用户看到 Spark 五小时和周额度均为 100%，但 Desktop 与 CLI 均无法使用模型，手动指定模型名返回 HTTP 400。  
- 社区反应：与 #45590、#45566 形成同类问题，显示模型授权、额度展示和实际 API 可用性之间存在不一致。

---

## 4. 重要 PR 进展

### 1. CLI 支持显式替换 daemon package  
- PR：[#45580](https://github.com/openai/codex/pull/45580)  
- 状态：Closed  
- 内容：新增 `codex app-server daemon update --from-cli`，允许从当前 CLI 复制并 pin 完整 package，包括降级和本地构建。  
- 意义：增强 CLI 与 app-server daemon 的版本管理能力，便于开发者排查版本不一致和本地构建验证问题。

### 2. 非临时 fork 复制当前线程附件  
- PR：[#45579](https://github.com/openai/codex/pull/45579)  
- 状态：Closed  
- 内容：创建 non-ephemeral fork 时复制源线程当前附件，为副本生成新的 attachment ID 和时间戳，同时保留资源 identity 与 payload。  
- 意义：提升会话 fork 的完整性，避免分支会话丢失上下文文件。

### 3. Windows sandbox 服务重启后恢复注册刷新  
- PR：[#45559](https://github.com/openai/codex/pull/45559)  
- 状态：Closed  
- 内容：修复 sandbox provisioning service 重启导致注册刷新中断的问题。  
- 意义：对 Windows sandbox 稳定性非常关键，尤其对应今日多个 Windows 启动、权限和沙箱相关反馈。

### 4. 从完整本地 CLI package 补齐缺失 daemon 安装  
- PR：[#45558](https://github.com/openai/codex/pull/45558)  
- 状态：Closed  
- 内容：允许 daemon lifecycle commands 使用完整 CLI package 提供 daemon executable 和 helper，而不强依赖单独安装器。  
- 意义：降低 daemon 安装缺失导致 app-server 不可用的概率，也提升本地开发和恢复能力。

### 5. 新增附件上传与解析 API  
- PR：[#45556](https://github.com/openai/codex/pull/45556)  
- 状态：Closed  
- 内容：将 `AttachmentStore::persist` 替换为 `upload` 和 `resolve`，支持返回 inline bytes 或 file ID，并按需生成 download URL。  
- 意义：完善附件生命周期，为跨线程、fork、远程会话和文件上下文传递提供更稳健的底层能力。

### 6. SDK CI 使用共享 Bazel cache preparation  
- PR：[#45554](https://github.com/openai/codex/pull/45554)  
- 状态：Closed  
- 内容：SDK workflow 切换到 `prepare-bazel-ci`，使用专门的 `sdk` cache scope。  
- 意义：提升 CI 缓存命中率和构建稳定性，减少 SDK 开发反馈周期。

### 7. Windows sandbox 支持可选 registered package execution  
- PR：[#45550](https://github.com/openai/codex/pull/45550)  
- 状态：Closed  
- 内容：通过 `CODEX_WINDOWS_REGISTERED_CORE=1` 启用 registered runner，基于 service-recorded execution aliases 启动。  
- 意义：为 Windows sandbox 执行路径提供更受控的 package 注册模式，增强安全边界和可验证性。

### 8. Turn 终止时保留流式 answer 与 plan  
- PR：[#45549](https://github.com/openai/codex/pull/45549)  
- 状态：Closed  
- 内容：在 interrupted 或 failed turns 中 flush 并 consolidate answer / plan streams，避免 transcript 丢失内容。  
- 意义：直接改善会话可靠性，可缓解“执行中断后历史不完整”类问题。

### 9. Seatbelt 遵守预处理 Unix socket 权限  
- PR：[#45548](https://github.com/openai/codex/pull/45548)  
- 状态：Closed  
- 内容：Seatbelt 使用 prepared context 中的 `allow_unix_sockets` 和相关权限，而不是忽略或继承过宽权限。  
- 意义：强化 macOS sandbox 网络/Unix socket 权限控制，减少权限展示与实际行为不一致的风险。

### 10. daemon package 从 standalone CLI installation 中拆分  
- PR：[#45546](https://github.com/openai/codex/pull/45546)  
- 状态：Closed  
- 内容：新增专用 daemon package，避免 daemon 更新与用户可见 CLI 安装强耦合。  
- 意义：改善 CLI 与后台服务版本生命周期管理，是今日 daemon/package 管理系列改动的核心之一。

---

## 5. 功能需求趋势

### 1. Windows Desktop 稳定性与安装体验  
相关 Issues：  
- [#45593](https://github.com/openai/codex/issues/45593)  
- [#45596](https://github.com/openai/codex/issues/45596)  
- [#45595](https://github.com/openai/codex/issues/45595)  
- [#45591](https://github.com/openai/codex/issues/45591)  

趋势：Windows 用户集中反馈启动失败、配置残留、mirror sync、sandbox checkpoint 等问题。结合多个 Windows sandbox PR，说明团队正在加强 Windows 端运行时、服务注册和包管理能力。

### 2. 浏览器与 Computer Use 集成  
相关 Issues：  
- [#45589](https://github.com/openai/codex/issues/45589)  
- [#45584](https://github.com/openai/codex/issues/45584)  
- [#45576](https://github.com/openai/codex/issues/45576)  
- [#45571](https://github.com/openai/codex/issues/45571)  

趋势：社区关注 Chrome 扩展安装、browser backend 初始化、tab 操作失败、URL restriction 等问题。浏览器能力已成为 Codex Desktop 的关键入口，但当前在 Windows 和 macOS 上都存在边界条件与兼容性问题。

### 3. 新模型与额度可用性  
相关 Issues：  
- [#45590](https://github.com/openai/codex/issues/45590)  
- [#45594](https://github.com/openai/codex/issues/45594)  
- [#45566](https://github.com/openai/codex/issues/45566)  
- [#45536](https://github.com/openai/codex/issues/45536)  

趋势：`gpt-5.3-codex-spark` 可见性、HTTP 400、quota 显示与实际不可用之间的不一致成为高频问题。用户不仅希望模型可用，也希望能清楚理解额度、限制和任务消耗。

### 4. 沙箱权限与安全策略可解释性  
相关 Issues：  
- [#45586](https://github.com/openai/codex/issues/45586)  
- [#45582](https://github.com/openai/codex/issues/45582)  
- [#45553](https://github.com/openai/codex/issues/45553)  
- [#45545](https://github.com/openai/codex/issues/45545)  

趋势：开发者希望安全策略既严格又可解释，避免良性代码审查、bug triage 或本地离线任务被误判。权限 UI 与运行时行为的一致性也是重点。

### 5. 会话、附件与远程同步  
相关 Issues：  
- [#45592](https://github.com/openai/codex/issues/45592)  
- [#45583](https://github.com/openai/codex/issues/45583)  
- [#45577](https://github.com/openai/codex/issues/45577)  
- [#45565](https://github.com/openai/codex/issues/45565)  
- [#45541](https://github.com/openai/codex/issues/45541)  

趋势：会话队列、历史引用、远程同步、手机配对、语音 reconnect 后上下文丢失等问题集中出现。PR #45579、#45556、#45549 也显示团队正在补强附件和会话状态管理。

### 6. Skills 与项目级能力管理  
相关 Issues：  
- [#45551](https://github.com/openai/codex/issues/45551)  
- [#45552](https://github.com/openai/codex/issues/45552)  

趋势：社区希望 Desktop App 支持 Project-scoped Skills 视图，能够查看当前 Project 可用、嵌入或限定的 Skills。该需求说明用户正在把 Codex 用于更长期、更结构化的项目工作流。

---

## 6. 开发者关注点

1. **Windows 端仍是稳定性重点区域**  
   启动失败、文件锁、sandbox 注册、Chrome 扩展、远程配对、mirror sync 等问题密集出现。Windows 用户对“开箱即用”的期望与当前运行时复杂度之间仍有差距。

2. **模型权限与额度展示需要更透明**  
   多个 Pro 用户反馈 Spark quota 显示充足但模型不可用，或 CLI 与 Desktop 模型列表不一致。开发者需要明确知道：模型是否开放、为何不可用、何时恢复、额度如何计算。

3. **安全检查误报影响正常开发工作流**  
   bug triage、离线代码审查、Daybreak access warning 等场景被安全策略干扰。社区希望提供更清晰的误报申诉、恢复机制和策略解释。

4. **浏览器自动化链路仍需打磨**  
   Chrome extension、browser-service、tab 操作、URL 限制等问题表明 Computer Use 的浏览器能力在真实环境中面临安装、版本、权限、网络策略等多重变量。

5. **App Server / daemon 生命周期成为底层关键点**  
   今日多个 PR 围绕 daemon package、CLI package、app-server update、附件 store 和会话状态展开，说明 Codex 正在强化桌面端与后台服务之间的版本和状态一致性。

6. **高级用户需要更细粒度的权限与任务控制**  
   自定义 sandbox 权限、项目级 Skills、任务预算、额度上限等需求反映出 Codex 正从“单次助手”向“长期开发代理”演进，用户希望拥有更强的可控性、可审计性和可预测性。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-09-15）

数据源：[`google-gemini/gemini-cli`](https://github.com/google-gemini/gemini-cli)

---

## 1. 今日速览

过去 24 小时，Gemini CLI 发布了新的 nightly 版本 `v0.61.0-nightly.20260915.g9c1b0a610`，同时社区提交了多项围绕 **核心稳定性、安全策略、A2A Server、Agent/SDK 执行行为** 的修复 PR。

今日最值得关注的是一个 P1 级 Issue：`-p` print mode 在所有推理调用中无限挂起，且无错误、无超时反馈；这与多个 PR 中围绕超时、stdin、AgentShell 执行边界的修复方向高度相关。

---

## 2. 版本发布

### v0.61.0-nightly.20260915.g9c1b0a610

- Release：[`v0.61.0-nightly.20260915.g9c1b0a610`](https://github.com/google-gemini/gemini-cli/releases/tag/v0.61.0-nightly.20260915.g9c1b0a610)
- Changelog：[`compare v0.61.0-nightly.20260914...v0.61.0-nightly.20260915`](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260914.g9c1b0a610...v0.61.0-nightly.20260915.g9c1b0a610)

本次为 nightly 自动发布，对应 PR 是版本号递增：  
[`#29337 chore/release: bump version to 0.61.0-nightly.20260915.g9c1b0a610`](https://github.com/google-gemini/gemini-cli/pull/29337)

从过去 24 小时的 PR 看，本轮 nightly 相关开发重点集中在：

- Agent / SDK 执行超时与环境变量传递
- CLI 输入流处理与 print mode 稳定性
- 企业策略目录权限安全校验
- A2A Server 日志安全与任务 metadata endpoint 行为修复
- `.gitignore` 嵌套规则解析修复

---

## 3. 社区热点 Issues

> 过去 24 小时仅有 1 条 Issue 更新，因此本节按实际数据列出，不虚构 10 条。

### 1. `-p` print mode 在所有推理调用中无限挂起

- Issue：[`#29325 CLI 1.2.2: -p print mode hangs indefinitely on all inference`](https://github.com/google-gemini/gemini-cli/issues/29325)
- 状态：Open
- 标签：`priority/p1`、`area/agent`、`kind/bug`、`status/manual-triage`、`effort/medium`
- 作者：`dkiaulakis`
- 评论数：1

**问题概述：**  
用户反馈在 CLI `1.2.2` 中执行：

```bash
agy -p "Hi"
```

会在所有推理调用中无限挂起，持续 5 分钟以上无响应、无错误、无超时信息。该问题据称已由两个用户独立确认。

**为什么重要：**

- `-p` print mode 通常用于脚本、CI、自动化管道等非交互场景。
- 无限挂起会导致自动化任务阻塞，且没有 timeout/error，使故障难以诊断。
- 该问题被标记为 P1，说明维护者已将其视为高优先级稳定性缺陷。

**社区反应：**

- 当前互动量较低，仅 1 条评论、0 个点赞。
- 但从标签看，项目维护侧已进入人工 triage 阶段，优先级较高。

**相关观察：**  
今日多个 PR 与该类问题存在潜在关联，例如 AgentShell timeout、stdin 读取、CLI 输入保留等，说明近期开发重点正在向“命令执行可控性”和“无响应场景治理”倾斜。

---

## 4. 重要 PR 进展

以下精选过去 24 小时内最值得关注的 10 个 PR。

---

### 1. 修复 AgentLoopContext 对象展开时属性丢失问题

- PR：[`#29335 fix(core): ensure AgentLoopContext properties are preserved across object spread`](https://github.com/google-gemini/gemini-cli/pull/29335)
- 状态：Open
- 标签：`priority/p1`、`area/core`、`size/m`、`maintainer only`
- 作者：`diegogodinezr`

**内容概述：**  
该 PR 修复 `Config` 类实现 `AgentLoopContext` 时，部分关键属性通过 prototype getter 暴露，导致对象展开时属性无法被保留的问题。

涉及属性包括：

- `config`
- `promptId`
- `toolRegistry`
- `messageBus`
- `geminiClient`
- `sandboxManager`
- `promptRegistry`
- `resourceRegistry`

**重要性：**  
这是核心 Agent Loop 上下文问题，可能影响工具调用、消息总线、资源注册、sandbox 管理等核心流程。P1 级别说明其影响范围较大。

---

### 2. A2A Server 日志安全：遵守 LOG_LEVEL 并避免凭据泄露

- PR：[`#29328 fix(a2a-server): honour LOG_LEVEL and keep credentials out of the log`](https://github.com/google-gemini/gemini-cli/pull/29328)
- 状态：Open
- 标签：`priority/p1`、`area/security`、`size/l`
- 作者：`L4XB`

**内容概述：**

- 修复 A2A Server logger 硬编码 `info` 日志级别的问题。
- 使其正确读取 `LOG_LEVEL`。
- 避免将 credentials 等敏感信息写入日志。

**重要性：**  
这是安全优先级较高的修复。对于企业部署、云环境和长期运行服务，日志泄露凭据属于高风险问题。

---

### 3. 强化非系统 policy 目录的写权限安全校验

- PR：[`#29336 fix(core): secure non-system policy directories against write permissions`](https://github.com/google-gemini/gemini-cli/pull/29336)
- 状态：Open
- 标签：`priority/p2`、`area/enterprise`、`size/l`
- 作者：`KirollosTadros`

**内容概述：**

- 将 `isDirectorySecure` 校验从仅系统目录扩展到所有 policy 层级。
- 支持 POSIX 和 Windows 下的 `allowUserOwnership`。
- 对 default、user、workspace policy 目录启用当前用户所有权校验。
- 强化企业策略配置目录的权限边界。

**重要性：**  
Gemini CLI 的企业化使用依赖可信 policy 配置。若用户或工作区 policy 目录权限过宽，可能导致策略被篡改。

---

### 4. 校验按约定发现的 policy 目录权限

- PR：[`#29333 fix(core): vet the permissions of policy directories found by convention`](https://github.com/google-gemini/gemini-cli/pull/29333)
- 状态：Open
- 标签：`priority/p2`、`area/enterprise`、`size/m`
- 作者：`L4XB`

**内容概述：**  
此前 `filterSecurePolicyDirectories` 仅对 system policy directory 运行 `isDirectorySecure`，而 user/workspace 目录因为路径约定被直接读取。该 PR 扩展权限校验，避免不安全目录被信任。

**重要性：**  
与 `#29336` 方向一致，说明 policy 目录权限安全已成为近期企业功能的重点风险面。

---

### 5. 限制单次调用扩展 sandbox 的次数

- PR：[`#29332 fix(core): bound how often one call may expand the sandbox`](https://github.com/google-gemini/gemini-cli/pull/29332)
- 状态：Open
- 标签：`priority/p2`、`area/core`、`size/m`
- 作者：`L4XB`

**内容概述：**  
当工具持续返回 `sandbox_expansion_required` 时，`_execute` 会递归调用自身，缺乏轮次上限，最终可能导致进程内存耗尽。

**重要性：**

- 修复潜在无限递归 / OOM 问题。
- 提升工具执行的安全边界。
- 对 Agent 工具调用稳定性影响较大。

---

### 6. SDK AgentShell 支持 env 与 timeoutSeconds

- PR：[`#29327 fix(sdk): honour AgentShellOptions env and timeoutSeconds`](https://github.com/google-gemini/gemini-cli/pull/29327)
- 状态：Open
- 标签：`priority/p2`、`area/agent`、`size/m`
- 作者：`L4XB`

**内容概述：**  
`SdkAgentShell.exec` 接收 `AgentShellOptions`，但此前忽略了其中两个重要字段：

- `env`
- `timeoutSeconds`

修复后，调用方传入的环境变量会被传递到进程，`timeoutSeconds` 也会真正限制命令执行时间。

**重要性：**  
该修复与今日 P1 Issue 中“无超时、无限挂起”的用户痛点高度相关。对于 SDK 集成和 Agent 自动化执行，这是非常关键的可靠性修复。

---

### 7. CLI 输入处理：保留 logger 返回前已输入内容，并只读取一次

- PR：[`#29330 fix(cli): keep input typed before the logger answers, and read it once`](https://github.com/google-gemini/gemini-cli/pull/29330)
- 状态：Open
- 标签：`priority/p2`、`area/core`、`size/m`
- 作者：`L4XB`

**内容概述：**  
该 PR 修复与 React 状态更新相关的副作用问题：`setPastSessionMessages` 被放在 `setCurrentSessionMessages` updater 内部调用，违反 React 的纯函数更新约束。

同时，测试回归中还发现输入读取行为存在实际问题，因此进行了额外修复。

**重要性：**  
该问题直接影响 CLI 交互体验，尤其是在日志响应、用户输入、会话消息状态交错时，可能导致输入丢失或状态异常。

---

### 8. CLI stdin 截断后暂停读取，并在放弃时给出提示

- PR：[`#29329 fix(cli): pause stdin after truncation, and say when it gives up on it`](https://github.com/google-gemini/gemini-cli/pull/29329)
- 状态：Open
- 标签：`priority/p2`、`area/core`、`size/s`
- 作者：`L4XB`

**内容概述：**  
此前在输入被截断后调用 `process.stdin.destroy()`，会导致 stdin 在进程生命周期内无法再次读取。该 PR 改为暂停 stdin，并在无法继续处理时明确提示。

**重要性：**

- 避免不可逆地破坏 stdin。
- 改善管道输入、长文本输入、自动化场景下的 CLI 行为。
- 与 print mode / 非交互调用的稳定性有间接关联。

---

### 9. 修复 A2A Server task metadata endpoint 对不支持 store 的响应处理

- PR：[`#29334 fix(a2a-server): add early return on unsupported store in tasks metadata endpoint`](https://github.com/google-gemini/gemini-cli/pull/29334)
- 状态：Open
- 标签：`size/m`、`status/need-issue`
- 作者：`jesussamuel-byte`

**内容概述：**  
当 A2A Server 使用非 in-memory task storage 配置时，task metadata endpoint 会返回 HTTP 501。该 PR 在返回 501 后添加 early return，避免后续重复响应处理。

**重要性：**  
这是典型的 HTTP endpoint 控制流修复，可避免重复写响应、异常日志或不一致行为。

---

### 10. 修复嵌套 `.gitignore` 中 trailing slash pattern 的解析

- PR：[`#29323 fix(core): handle trailing-slash patterns in nested .gitignore correctly`](https://github.com/google-gemini/gemini-cli/pull/29323)
- 状态：Open
- 标签：`priority/p2`、`area/core`、`size/l`
- 作者：`dylanyunlon`
- 关联 Issue：[`#29290`](https://github.com/google-gemini/gemini-cli/issues/29290)

**内容概述：**  
修复嵌套 `.gitignore` 中类似以下规则的匹配问题：

```gitignore
build/
node_modules/
dist/
```

此前这些 trailing slash pattern 会被错误地锚定到 `.gitignore` 所在目录，而不是在其下方任意深度匹配。

**重要性：**  
Gemini CLI 在代码仓库上下文中运行时，文件过滤和 ignore 规则非常关键。错误解析 `.gitignore` 可能导致上下文污染、漏读或误读文件。

---

## 5. 功能需求趋势

基于过去 24 小时的 Issues 和 PR，可以观察到以下趋势：

### 1. 非交互模式与自动化调用稳定性

相关链接：

- [`#29325`](https://github.com/google-gemini/gemini-cli/issues/29325)
- [`#29327`](https://github.com/google-gemini/gemini-cli/pull/29327)
- [`#29329`](https://github.com/google-gemini/gemini-cli/pull/29329)
- [`#29330`](https://github.com/google-gemini/gemini-cli/pull/29330)

社区对 `-p` print mode、stdin、timeout、SDK shell 执行行为的关注上升。Gemini CLI 正在从交互式工具向脚本化、CI/CD、Agent 自动化场景扩展，因此“必须有响应、必须可超时、必须可诊断”成为核心诉求。

---

### 2. Agent 执行边界与 sandbox 安全

相关链接：

- [`#29332`](https://github.com/google-gemini/gemini-cli/pull/29332)
- [`#29335`](https://github.com/google-gemini/gemini-cli/pull/29335)
- [`#29327`](https://github.com/google-gemini/gemini-cli/pull/29327)

Agent 执行链路正在加强边界控制，包括：

- 防止 sandbox 扩展无限递归
- 保证 AgentLoopContext 属性可靠传递
- 支持执行超时与环境变量

这反映出 Gemini CLI 的 Agent 能力正在走向更复杂的工具调用与更严格的运行时治理。

---

### 3. 企业策略与权限安全

相关链接：

- [`#29336`](https://github.com/google-gemini/gemini-cli/pull/29336)
- [`#29333`](https://github.com/google-gemini/gemini-cli/pull/29333)

企业使用场景下，policy 目录的可信性变得更重要。近期 PR 明显聚焦于 policy directory 权限校验，尤其是 user/workspace 层级的策略配置安全。

---

### 4. A2A Server 服务化能力完善

相关链接：

- [`#29328`](https://github.com/google-gemini/gemini-cli/pull/29328)
- [`#29334`](https://github.com/google-gemini/gemini-cli/pull/29334)

A2A Server 相关修复集中在：

- 日志级别配置
- 凭据脱敏
- HTTP endpoint 控制流正确性

说明 Gemini CLI 的服务化、Agent-to-Agent 场景仍在快速打磨中。

---

### 5. 仓库上下文与文件过滤准确性

相关链接：

- [`#29323`](https://github.com/google-gemini/gemini-cli/pull/29323)
- [`#29324`](https://github.com/google-gemini/gemini-cli/pull/29324)

`.gitignore` 规则解析问题受到关注，尤其是嵌套目录中的 trailing slash pattern。对于 AI 编程工具来说，准确构建上下文窗口是生成质量和安全性的基础。

---

## 6. 开发者关注点

### 1. “挂起但无反馈”是当前最突出的体验问题

Issue [`#29325`](https://github.com/google-gemini/gemini-cli/issues/29325) 暴露出 CLI 在推理调用异常时缺少 timeout、错误提示和恢复机制。对于自动化调用者而言，静默挂起比显式失败更难处理。

---

### 2. SDK / Agent 执行需要更强的可控性

PR [`#29327`](https://github.com/google-gemini/gemini-cli/pull/29327) 显示开发者期望：

- 能设置命令超时
- 能传递环境变量
- 能避免长时间或永久阻塞

这类能力是将 Gemini CLI 嵌入更大系统时的基础需求。

---

### 3. CLI 输入流处理仍是高频稳定性区域

PR [`#29329`](https://github.com/google-gemini/gemini-cli/pull/29329) 和 [`#29330`](https://github.com/google-gemini/gemini-cli/pull/29330) 都指向 stdin、用户输入、状态更新之间的复杂交互。开发者更关注 CLI 在长输入、管道输入、日志输出并发时是否可靠。

---

### 4. 企业部署关注权限边界和配置可信性

PR [`#29336`](https://github.com/google-gemini/gemini-cli/pull/29336) 与 [`#29333`](https://github.com/google-gemini/gemini-cli/pull/29333) 说明，企业场景下不仅需要功能可用，还需要明确的权限模型和策略目录安全保证。

---

### 5. A2A Server 需要达到生产级日志与错误处理标准

PR [`#29328`](https://github.com/google-gemini/gemini-cli/pull/29328) 和 [`#29334`](https://github.com/google-gemini/gemini-cli/pull/29334) 表明，服务端形态正在补齐生产级要求：

- 日志级别可配置
- 敏感信息不落盘
- HTTP 响应控制流清晰
- 不支持能力时明确返回错误

---

## 总结

今天 Gemini CLI 的社区动态以“稳定性、安全性、可自动化”为主线。虽然新增 Issue 数量不多，但唯一的 P1 Issue 指向了非常关键的 print mode 挂起问题；与此同时，多个 PR 正在修复 timeout、stdin、Agent 执行、sandbox、安全日志和 policy 权限等底层能力。

对于开发者而言，近期值得重点关注 nightly 版本中这些修复是否合入，尤其是与非交互调用、CI 集成、SDK AgentShell、企业 policy 安全相关的变更。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报  
**日期：2026-09-15**  
**仓库：** https://github.com/github/copilot-cli

## 1. 今日速览

过去 24 小时 Copilot CLI 连续发布了 **v1.0.84-6 到 v1.0.84-8** 多个小版本，重点围绕配置入口、沙箱网络规则、Agent Factory 暂停/恢复、模型列表刷新以及 Claude adaptive thinking 兼容性进行改进。  
社区 Issue 主要集中在 **子代理工作流性能、后台 agent 卡死、托管策略刷新、沙箱权限、MCP/OAuth、BYOK 与多模型工具兼容性** 等方向，反映出 Copilot CLI 在复杂 agent / MCP / 企业策略场景下的稳定性仍是当前焦点。

---

## 2. 版本发布

### v1.0.84-8  
链接：https://github.com/github/copilot-cli/releases/tag/v1.0.84-8

**新增**
- 将 `transcriptView` 设置为 `concise`，把工具活动聚合为可展开的工作摘要，降低长会话中的信息噪音。

**改进**
- 支持在 `/factories` 对话框中暂停与恢复 Agent Factory 运行。

**修复**
- 登录、切换账号或登出后，模型列表现在会正确刷新。

**影响解读**
- 该版本明显改善了长时间 agent 会话的可读性，也增强了 Agent Factory 的可控性。
- 模型列表刷新修复对多账号、企业账号和 BYOK 用户较重要。

---

### v1.0.84-7  
链接：https://github.com/github/copilot-cli/releases/tag/v1.0.84-7

**修复**
- 修复发送给 Claude adaptive-only 模型的 thinking shape：现在会保持 adaptive，而不是失败。
- 当 thinking 被关闭时，会降低 reasoning effort，并将 reasoning effort 上限限制为 `high`。
- `/clear` 关闭会话时会运行 `sessionEnd` hooks。

**影响解读**
- 主要面向 Claude 模型兼容性与生命周期 hook 的一致性。
- 对依赖 hook 做清理、审计或自动化收尾的团队有实际价值。

---

### v1.0.84-6  
链接：https://github.com/github/copilot-cli/releases/tag/v1.0.84-6

**新增**
- 新增 `/config`，可在 CLI 中打开侧边栏配置界面。
- 新增 `/sandbox` 网络 host allow / deny 规则，且不会替换已配置的上游代理。

**改进**
- 对原生 shell 重定向和部分支持的 in-place `sed` 操作应用托管 Edit / Write 规则。

**影响解读**
- `/config` 降低了 CLI 配置门槛。
- `/sandbox` 网络规则增强了企业或安全敏感环境下的细粒度管控能力。
- 对 shell 重定向和 `sed` 的规则覆盖说明 Copilot CLI 正在强化“真实开发命令”场景下的权限治理。

---

## 3. 社区热点 Issues

### 1. 子代理工作流延迟与 review-loop 开销过高  
Issue：https://github.com/github/copilot-cli/issues/4849  
状态：OPEN，评论：5，👍：0

用户反馈 subagent 驱动的实现、审查、修复、复审流程非常慢，agent 启动、任务交接和循环 review 可能让小规模代码变更耗时数分钟。  
**重要性：** 这是今天互动最多的 Issue，直接指向 Copilot CLI agent 化工作流的核心体验。  
**社区反应：** 已有 5 条评论，说明性能与工作流效率是当前开发者的高优先级关注点。

---

### 2. 后台 subagent 停止工具活动后仍无限运行  
Issue：https://github.com/github/copilot-cli/issues/4850  
状态：OPEN，评论：1，👍：0

用户报告后台 review subagent 在工具调用停止后仍显示运行，状态停留在 100 个 completed tool calls、0 个 completed turns，超过 15 分钟无结果返回。  
**重要性：** 这可能导致父会话阻塞、资源浪费和用户无法判断任务是否失败。  
**社区反应：** 虽然评论不多，但与 #4849 一起构成了 subagent 稳定性和可观测性的重点问题。

---

### 3. Warp 终端中颜色不尊重 terminal theme  
Issue：https://github.com/github/copilot-cli/issues/4843  
状态：OPEN，评论：2，👍：0

Copilot CLI 在 macOS Warp 终端中根据系统浅色/深色模式调整颜色，而不是根据终端主题，导致深色终端配浅色文本假设时可读性下降。  
**重要性：** CLI 工具的视觉适配直接影响高频使用体验，尤其是 Warp 等现代终端用户。  
**社区反应：** 已有 2 条评论，说明该问题具备一定复现和讨论价值。

---

### 4. 托管设置自动刷新破坏 IDE MCP reload，并禁用 `/allow-all`  
Issue：https://github.com/github/copilot-cli/issues/4847  
状态：OPEN，评论：0，👍：0

长时间运行的 Copilot CLI 会话连接 VS Code 时，自动 managed-settings refresh 可能在重载 IDE 动态贡献的 MCP server 时失败，并影响 Computer Use policy 与 `/allow-all`。  
**重要性：** 该问题涉及 IDE 集成、MCP 动态重载、企业托管策略和权限模式，复杂度较高。  
**社区反应：** 暂无评论，但对使用 VS Code + MCP + 企业策略的用户风险较大。

---

### 5. 启用 “allow dev tool access” 后部分命令绕过沙箱策略  
Issue：https://github.com/github/copilot-cli/issues/4846  
状态：OPEN，评论：0，👍：0

用户反馈在启用 sandbox 与 “allow dev tool access” 后，某些命令如 `python` 可能忽略用户文件系统策略。  
**重要性：** 这是安全边界问题，涉及沙箱策略的可信度。  
**社区反应：** 暂无评论，但安全相关 Issue 通常需要优先评估。

---

### 6. 策略驱动的 `enabledPlugins` 安装插件但保持 `"enabled": false`  
Issue：https://github.com/github/copilot-cli/issues/4837  
状态：OPEN，评论：1，👍：0

通过设备/MDM 或仓库级配置启用插件时，插件会被安装到磁盘，但 `~/.copilot/config.json` 中仍记录为 `"enabled": false`，导致技能不生效。  
**重要性：** 影响企业集中配置和插件分发能力，可能使管理员以为策略已生效但实际不可用。  
**社区反应：** 已有评论，且复现范围覆盖 device/MDM 与 repo-level settings。

---

### 7. 自定义 agent 的 plan-mode 会话 Plan 面板为空  
Issue：https://github.com/github/copilot-cli/issues/4841  
状态：OPEN，评论：1，👍：0

显式调用自定义 agent 并使用内置 `exit_plan_mode` 工具时，Plan 侧边栏只显示 recommended-action bubbles，不显示 plan 文本；`summary` 有值但 `plan_content` 为空。  
**重要性：** 自定义 agent 与计划模式是高级 agent 工作流的重要组成，UI 数据映射问题会影响可解释性。  
**社区反应：** 已有评论，说明高级 agent 定制用户已经遇到实际阻塞。

---

### 8. 会话永久卡在 “In use” 状态  
Issue：https://github.com/github/copilot-cli/issues/4845  
状态：OPEN，评论：0，👍：0

用户报告多个会话未被标记为不再使用，无法自动回到 session list，每次都需要 `/resume`，并接受“正在其他地方使用”的误报。  
**重要性：** 会话状态管理是多会话 CLI 使用体验的基础，误判会降低恢复和并行工作的可靠性。  
**社区反应：** 暂无评论，但与后台 agent 卡死、sessionEnd hook 修复方向相关。

---

### 9. 并发 MCP OAuth token refresh 取消其中一个 reconnect  
Issue：https://github.com/github/copilot-cli/issues/4842  
状态：OPEN，评论：0，👍：0

当两个远程 HTTP MCP server 几乎同时收到 `401` OAuth challenge 时，并发后台 token refresh / reconnect 可能取消其中一个，前台显示类似硬失败的错误，尽管之后可能自愈。  
**重要性：** MCP 生态中远程服务越来越常见，OAuth 并发刷新稳定性会影响多工具链集成体验。  
**社区反应：** 暂无评论，但该问题定位较具体，具备较高工程诊断价值。

---

### 10. 多模型工具/schema 兼容性问题：Grok、Gemini、Deepseek/BYOK  
相关 Issues：  
- Grok 4.5 工具数超过 350 时报 HTTP 400：https://github.com/github/copilot-cli/issues/4836  
- Gemini Flash 遇到 malformed MCP array enum 导致所有请求 HTTP 400：https://github.com/github/copilot-cli/issues/4835  
- BYOK Deepseek 不再工作，tool type `custom` 反序列化失败：https://github.com/github/copilot-cli/issues/4840  

**重要性：** 这些问题都指向 Copilot CLI 在多模型、多 provider、MCP tool schema 转换中的兼容性边界。  
**社区反应：** 当前评论较少，但对 BYOK 用户、MCP 重度用户和非 OpenAI/GitHub 默认模型用户影响明显。

---

## 4. 重要 PR 进展

过去 24 小时内无更新的 Pull Request。  
仓库 PR 页面：https://github.com/github/copilot-cli/pulls

**观察：**
- 今日开发动态主要体现在 releases 与 issues，而非 PR 更新。
- 多个 release 快速迭代，说明维护团队可能通过内部分支或非公开 PR 流程推进修复。
- 社区侧新增问题较多，短期内预计后续 PR 会集中在 subagent 稳定性、MCP、沙箱权限和多模型兼容性上。

---

## 5. 功能需求趋势

### 1. Agent / Subagent 工作流性能与可控性
相关 Issues：  
- https://github.com/github/copilot-cli/issues/4849  
- https://github.com/github/copilot-cli/issues/4850  
- https://github.com/github/copilot-cli/issues/4841  

社区正在关注 subagent 启动慢、交接慢、review-loop 反复消耗时间、后台 agent 不结束、plan-mode 面板数据缺失等问题。  
这说明 Copilot CLI 用户已经从简单问答进入更复杂的多 agent 自动化开发场景，性能、可观测性和失败恢复成为关键诉求。

---

### 2. MCP 集成稳定性与协议演进
相关 Issues：  
- https://github.com/github/copilot-cli/issues/4842  
- https://github.com/github/copilot-cli/issues/4834  
- https://github.com/github/copilot-cli/issues/4835  
- https://github.com/github/copilot-cli/issues/4836  

MCP 相关问题覆盖 OAuth token refresh、协议版本 2026-07-28 MRTR/input_required、schema 兼容性和工具数量限制。  
趋势上看，用户正在把 Copilot CLI 接入更多外部系统，MCP 的协议兼容性、错误提示质量和模型侧 schema 适配会越来越重要。

---

### 3. 企业策略、托管设置与权限治理
相关 Issues：  
- https://github.com/github/copilot-cli/issues/4847  
- https://github.com/github/copilot-cli/issues/4846  
- https://github.com/github/copilot-cli/issues/4844  
- https://github.com/github/copilot-cli/issues/4837  

托管设置刷新、`--yolo` / `/allow-all`、沙箱策略、插件启用策略之间出现多处边界问题。  
这反映出 Copilot CLI 正在进入企业级受控环境，但权限策略、启动时序和动态刷新机制仍需要更强一致性。

---

### 4. 多模型与 BYOK 兼容性
相关 Issues：  
- https://github.com/github/copilot-cli/issues/4840  
- https://github.com/github/copilot-cli/issues/4836  
- https://github.com/github/copilot-cli/issues/4835  

Deepseek、Grok、Gemini 等模型暴露了 tool schema、tool count、provider API 差异等问题。  
用户对 BYOK 和多模型接入的需求明确，但当前痛点在于错误信息不透明、预校验不足以及 provider 差异适配不完善。

---

### 5. CLI 用户体验与界面可配置性
相关 Issues：  
- https://github.com/github/copilot-cli/issues/4843  
- https://github.com/github/copilot-cli/issues/4848  
- https://github.com/github/copilot-cli/issues/4839  
- https://github.com/github/copilot-cli/issues/4845  

终端颜色、反馈提交流程文案、任务栏图标开关、会话状态误判等问题说明用户开始关注长期使用中的细节体验。  
这些不是核心推理能力问题，但会显著影响高频开发者的接受度。

---

## 6. 开发者关注点

### 性能：subagent 工作流过慢
最明显的痛点来自 #4849。开发者希望减少 agent 启动、任务 handoff、review/fix/re-review 的往返时间。对实际工程任务而言，自动化流程如果比人工修改慢，会削弱 agent 工作流价值。  
链接：https://github.com/github/copilot-cli/issues/4849

### 稳定性：后台任务和会话状态容易卡住
#4850 和 #4845 分别暴露了后台 subagent 长时间运行不结束、会话卡在 “In use” 的问题。开发者需要更可靠的任务生命周期管理，以及明确的取消、恢复、超时和诊断机制。  
链接：  
- https://github.com/github/copilot-cli/issues/4850  
- https://github.com/github/copilot-cli/issues/4845

### 安全与权限：沙箱、托管策略和 bypass 模式存在边界问题
#4846、#4847、#4844 都显示权限模型在复杂状态下可能不一致。企业用户尤其关心 sandbox 是否真的生效，managed settings 是否会意外改变运行中会话能力。  
链接：  
- https://github.com/github/copilot-cli/issues/4846  
- https://github.com/github/copilot-cli/issues/4847  
- https://github.com/github/copilot-cli/issues/4844

### MCP：外部工具生态接入仍需增强
MCP 相关问题覆盖 OAuth、协议版本和 schema 兼容性。开发者希望 Copilot CLI 在调用失败前能做更好的 schema 校验、工具数量检查和协议能力协商。  
链接：  
- https://github.com/github/copilot-cli/issues/4842  
- https://github.com/github/copilot-cli/issues/4834  
- https://github.com/github/copilot-cli/issues/4835  
- https://github.com/github/copilot-cli/issues/4836

### 多模型：错误信息和 provider 适配需要更清晰
Grok、Gemini、Deepseek/BYOK 问题都体现了一个共同诉求：当模型或 provider 不支持某种 tool schema 或参数时，CLI 应提前给出明确错误，而不是暴露底层 HTTP 400 或 JSON 反序列化错误。  
链接：  
- https://github.com/github/copilot-cli/issues/4840  
- https://github.com/github/copilot-cli/issues/4836  
- https://github.com/github/copilot-cli/issues/4835

### 体验：CLI 长期使用需要更多可配置项
Warp 颜色主题、任务栏图标关闭、反馈提交流程文案等问题说明 Copilot CLI 已被部分用户作为长期常驻工具使用。此时，可配置性、可读性和低打扰体验会变得越来越重要。  
链接：  
- https://github.com/github/copilot-cli/issues/4843  
- https://github.com/github/copilot-cli/issues/4839  
- https://github.com/github/copilot-cli/issues/4848

---

## 总结

今天 Copilot CLI 的主线是 **快速小版本迭代 + 社区集中反馈复杂 agent 场景问题**。版本发布增强了配置、沙箱网络规则、Agent Factory 控制和模型兼容性；而社区 Issues 则表明，开发者最关心的是 subagent 性能、后台任务可靠性、MCP 集成、多模型/BYOK 兼容以及企业权限策略的一致性。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报｜2026-09-15

数据来源：[`MoonshotAI/kimi-cli`](https://github.com/MoonshotAI/kimi-cli)  
统计范围：过去 24 小时内更新的 Releases / Issues / Pull Requests

---

## 1. 今日速览

过去 24 小时内，Kimi Code CLI 仓库暂无新版本发布，也没有新的 Pull Request 更新。社区新增/更新了 2 个 Issue，重点集中在 **CJK 输入法交互体验** 与 **Kimi Work 中 Agent 回复的审阅反馈机制** 两个方向。

其中，IME 组合输入时误触发送的问题对中文、日文、韩文用户影响较直接，属于高优先级体验缺陷；另一条功能需求则反映出用户希望 Kimi Work 从“对话式协作”进一步增强为“可审阅、可批注、可迭代”的 Agent 工作流平台。

---

## 2. 版本发布

过去 24 小时内暂无新 Release。

---

## 3. 社区热点 Issues

> 注：过去 24 小时内仅有 2 条 Issue 更新，因此本节不虚构补足 10 条，仅列出当前数据中值得关注的 Issue。

### 1. `kimi web` 在 IME 组词状态下按 Enter 被误判为发送消息

- Issue：[#2643](https://github.com/MoonshotAI/kimi-cli/issues/2643)
- 状态：OPEN
- 作者：[@wangjin1982](https://github.com/wangjin1982)
- 创建时间：2026-09-14
- 评论数：0
- 👍：0

**问题概述：**  
用户在 `kimi web` 输入框中使用中文、日文、韩文等 IME 输入法时，如果仍处于 composition 组词状态，按下 Enter 本应确认候选词上屏，但当前被识别为“发送消息”，导致未完成内容被直接发送。

**为什么重要：**

- 直接影响 CJK 用户的基础输入体验。
- 属于典型的 Web 输入框 IME 事件处理问题，通常需要正确区分 `compositionstart` / `compositionend` / `keydown Enter`。
- 对 AI Chat / Agent 类产品而言，误发送会破坏上下文质量，甚至导致用户需要重新解释意图。

**社区反应：**  
目前暂无评论和点赞，但该问题具备较强的普适性，建议优先排查。尤其是面向中文用户的产品中，IME 兼容性属于基础可用性要求。

---

### 2. Kimi Work 会话内支持对 Agent 回复进行可视化批注与审阅反馈

- Issue：[#2642](https://github.com/MoonshotAI/kimi-cli/issues/2642)
- 状态：OPEN
- 作者：[@Zhywleo](https://github.com/Zhywleo)
- 创建时间：2026-09-14
- 评论数：0
- 👍：0

**需求概述：**  
用户希望 Kimi Work 支持对 Agent 的任意一条回复进行逐段可视化批注，尤其是计划、报告、方案类长文本。批注内容应能结构化返回给 Agent，用于下一轮修订，而不是只能由用户在输入框中用自然语言描述修改意见。

**为什么重要：**

- 反映了用户对 Agent 工作流“审阅—反馈—修订”闭环的需求。
- 对长文档、方案、报告、代码审查、需求分析等场景价值较高。
- 有助于 Kimi Work 从普通对话工具演进为协作式生产力平台。
- 如果批注能结构化传递给 Agent，可显著提升多轮修订效率和指令精度。

**社区反应：**  
目前暂无评论和点赞，但该需求方向具有产品战略意义，尤其适合 Kimi Work、Kimi Code、Agent 编辑器等场景联动设计。

---

## 4. 重要 PR 进展

过去 24 小时内暂无 Pull Request 更新。

---

## 5. 功能需求趋势

基于过去 24 小时内更新的 Issues，当前社区反馈主要体现出以下方向：

### 1. 输入体验与国际化兼容性

代表 Issue：[#2643](https://github.com/MoonshotAI/kimi-cli/issues/2643)

IME 组合输入问题说明，Kimi Web / CLI 周边产品在多语言输入场景下仍需加强细节处理。尤其对于中文、日文、韩文用户，输入法事件兼容性会直接影响产品可用性。

值得关注的改进方向：

- 正确识别 `isComposing` 状态。
- 在 composition 未结束前禁止 Enter 触发发送。
- 增加 CJK 输入法下的端到端测试。
- 明确 Shift+Enter、Enter、Ctrl+Enter 等快捷键行为。

---

### 2. Agent 回复的结构化审阅与反馈

代表 Issue：[#2642](https://github.com/MoonshotAI/kimi-cli/issues/2642)

用户不再满足于单纯通过聊天框追加修改意见，而是希望直接对 Agent 生成内容进行可视化批注，并将批注结构化返回给 Agent。这体现出 Agent 产品从“生成答案”向“协同编辑与交付成果”演进的趋势。

潜在功能方向包括：

- 对 Agent 回复逐段批注。
- 高亮文本后添加修改意见。
- 批注与原文片段绑定。
- 将批注转化为结构化修订指令。
- 支持接受、拒绝、合并修改建议。
- 支持报告、方案、代码解释等长文本的审阅工作流。

---

### 3. Kimi Work 与 Kimi Code 的协作边界可能进一步融合

代表 Issue：[#2642](https://github.com/MoonshotAI/kimi-cli/issues/2642)

虽然该需求主要面向 Kimi Work，但用户也将 Kimi Code 团队列为反馈对象，说明开发者正在期待 Kimi 的不同产品形态之间具备更一致的 Agent 交互体验。

可能的趋势：

- Kimi Work 承担文档、方案、审阅类工作流。
- Kimi Code 承担代码生成、修改、审查类工作流。
- 二者在“批注—修订—确认”的交互范式上存在共通需求。

---

## 6. 开发者关注点

### 1. 基础输入行为需要更稳定

IME Enter 误发送问题虽然看似是前端交互细节，但对开发者和中文用户影响明显。开发者在使用 AI 工具时通常会输入复杂上下文、代码片段、中文说明，一旦误发送，会造成上下文污染和操作中断。

建议优先级：高  
相关 Issue：[#2643](https://github.com/MoonshotAI/kimi-cli/issues/2643)

---

### 2. 长回复的修改反馈成本较高

当前用户对 Agent 长回复提出修改意见时，通常只能在输入框中描述“第几段怎么改”“某个部分不对”。这类方式容易产生歧义，也增加用户表达成本。

可视化批注能力可以解决以下问题：

- 精确指出需要修改的位置。
- 降低用户反馈成本。
- 让 Agent 更准确理解修订范围。
- 改善长文档、多轮方案迭代体验。

相关 Issue：[#2642](https://github.com/MoonshotAI/kimi-cli/issues/2642)

---

### 3. 用户期待更接近专业协作工具的 Agent 体验

从可视化批注需求可以看出，开发者和高频用户希望 Kimi 不只是“问答工具”，而是能够参与真实工作流，包括方案撰写、审阅、修订、交付等环节。

这意味着后续产品能力可能需要关注：

- 多轮修改历史管理。
- Agent 输出的版本对比。
- 局部修改与全局重写的区分。
- 批注数据结构化。
- 审阅意见可追踪、可关闭、可复用。

相关 Issue：[#2642](https://github.com/MoonshotAI/kimi-cli/issues/2642)

---

## 总结

今日 Kimi Code CLI 社区动态较为平稳，无 Release 和 PR 更新。Issue 方面，社区反馈集中在两个关键方向：一是 **CJK IME 输入体验修复**，属于基础可用性问题；二是 **Agent 回复的可视化批注与审阅反馈**，代表了更高级的协作式 Agent 产品需求。

建议团队优先关注 [#2643](https://github.com/MoonshotAI/kimi-cli/issues/2643) 的输入法兼容问题，同时将 [#2642](https://github.com/MoonshotAI/kimi-cli/issues/2642) 作为 Kimi Work / Kimi Code 后续交互升级的重要需求参考。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报｜2026-09-15

## 1. 今日速览

过去 24 小时，OpenCode 社区讨论集中在 **v1.18.31 后的稳定性、模型可用性、会话恢复与新布局争议** 上。DeepSeek V4.1 Flash 不可用、“Thinking” 卡死、多会话性能瓶颈、网络中断导致会话损坏等问题成为主要热点。

开发侧则持续推进 **会话状态修复、Desktop/TUI 体验改进、插件加载、AI Provider 错误分类、CodeMode 能力扩展** 等方向，多个 PR 针对近期用户反馈快速响应。

---

## 2. 版本发布

### v1.18.31

链接：[Release v1.18.31](https://github.com/anomalyco/opencode/releases/tag/v1.18.31)

本次发布主要聚焦稳定性修复：

- **Core**
  - 修复 ACP session 在加载、恢复或 fork 时，未正确恢复：
    - session model
    - effort
    - mode
    - reasoning chunk 边界
  - 该修复对长会话、分叉会话和 agent 状态一致性较重要。

- **TUI**
  - 启动时如果远程配置认证失败，现在会明确显示错误，并以失败状态退出。
  - 有助于减少“静默失败”或启动后行为异常的问题。

- **Extensions**
  - Release 信息中仅显示到 “Improvemen”，完整内容可能被截断，需等待更完整的 changelog。

---

## 3. 社区热点 Issues

### 1. DeepSeek V4.1 Flash 不可用

链接：[Issue #49041](https://github.com/anomalyco/opencode/issues/49041)

- 状态：Open
- 评论：9
- 👍：3

用户反馈 DeepSeek V4.1 Flash 无响应，OpenCode 一直 spinning，无模型输出，而 DeepSeek V4 Pro 正常。该问题评论数和点赞数均较高，说明影响面可能较广。

**重要性：**  
这是典型的 Provider / 模型可用性问题，直接影响使用体验，也暴露出 OpenCode 对上游模型异常的超时、错误提示和 fallback 机制仍有改进空间。

---

### 2. Windows Defender 将 OpenCode 标记为木马

链接：[Issue #49047](https://github.com/anomalyco/opencode/issues/49047)

- 状态：Closed
- 评论：6

有用户报告 OpenCode 可执行文件或更新流程被 Windows Defender / Antivirus 标记为 Trojan。虽然 Issue 已关闭，但安全软件误报会严重影响 Windows 用户信任度。

**重要性：**  
涉及发行包签名、安装器可信度、二进制分发链路和安全说明。对桌面端增长尤其关键。

---

### 3. 自定义 Provider 下模型陷入自我回复循环

链接：[Issue #49008](https://github.com/anomalyco/opencode/issues/49008)

- 状态：Open
- 评论：5

用户通过自定义 Provider 接入 GLM-5.3-Flash 后，模型在短消息后陷入无限回复循环，甚至会持续数小时。

**重要性：**  
反映 OpenCode 在自定义 Provider、消息角色映射、停止条件、stream 边界处理方面可能存在兼容性问题。也提示需要更强的 runaway response 保护机制。

---

### 4. 希望对外发 LLM HTTP 请求传播 W3C traceparent

链接：[Issue #49038](https://github.com/anomalyco/opencode/issues/49038)

- 状态：Open
- 评论：4

用户希望 OpenCode 在调用 LLM Provider 时传播 W3C `traceparent` header，以便在 AI Gateway、代理层或企业可观测性系统中串联 trace。

**重要性：**  
这是偏企业级和平台工程场景的需求，说明 OpenCode 正被用于更复杂的生产链路。可观测性、审计、分布式追踪会成为后续企业采用的关键能力。

---

### 5. 新布局争议：要求恢复旧布局

链接：[Issue #49021](https://github.com/anomalyco/opencode/issues/49021)

- 状态：Open
- 评论：4
- 👍：2

用户明确要求 “Bring back the old layout”。类似反馈还出现在 #49043、#49031、#49029 等 Issue 中。

**重要性：**  
新 Sidebar / Tabbed Layout 对部分老用户工作流造成冲击。UI 重构后的可发现性、项目/会话管理方式、兼容旧习惯，是当前社区情绪热点。

---

### 6. 多轮对话后输出中断

链接：[Issue #49092](https://github.com/anomalyco/opencode/issues/49092)

- 状态：Open
- 评论：3

用户反馈多轮对话后，模型在输出自然语言并调用工具时异常终止，之后不再输出。

**重要性：**  
这类问题通常与 tool call、streaming、reasoning chunk、消息状态机有关。考虑到 v1.18.31 刚修复 ACP session 和 reasoning chunk 边界，该问题值得继续跟踪。

---

### 7. 使用数小时后模型卡在 “Thinking”

链接：[Issue #49033](https://github.com/anomalyco/opencode/issues/49033)

- 状态：Open
- 评论：3
- 👍：1

用户反馈 OpenCode 使用几小时后，任何模型都会无限停留在 “Thinking”，切换模型无效，也没有错误提示。

**重要性：**  
这是严重的长时间运行稳定性问题，可能涉及后台服务状态、请求队列、连接池、会话状态或资源泄漏。

---

### 8. 多会话负载下 CLI 服务无响应

链接：[Issue #49095](https://github.com/anomalyco/opencode/issues/49095)

- 状态：Open
- 评论：2

用户反馈运行 5 个以上并发 session 时，OpenCode service 严重退化，单个 Node.js 进程出现单核 CPU 饱和，导致创建和切换 session 变慢。

**重要性：**  
这是架构级性能问题。随着 OpenCode 用于更复杂的 agent workflow，多会话并发、后台服务扩展性和任务隔离将成为重点。

---

### 9. Windows 11 + 网络盘项目路径下会话内容不显示

链接：[Issue #49093](https://github.com/anomalyco/opencode/issues/49093)

- 状态：Open
- 评论：2

用户在 Windows 11 上将项目放在网络驱动器后，新聊天窗口无法显示会话历史。

**重要性：**  
路径、文件监听、数据库存储、网络盘一致性等问题会影响企业 Windows 环境。该问题与 #49082 中 iCloud 同步导致项目移动后不可用也有相似性。

---

### 10. 网络中断导致 conversation state 损坏

链接：[Issue #49083](https://github.com/anomalyco/opencode/issues/49083)

- 状态：Open
- 评论：1

用户反馈临时网络中断后，同一 conversation 后续消息持续失败，错误中提到 `reasoning encrypted_content was not issued to this caller`，线程永久不可用。

**重要性：**  
这是高优先级稳定性问题。网络异常不应导致会话不可恢复，OpenCode 需要更健壮的 stream 中断恢复、状态回滚和 provider error 隔离机制。

---

## 4. 重要 PR 进展

### 1. 修复 session 更新时间未随 step 生命周期刷新

链接：[PR #49105](https://github.com/anomalyco/opencode/pull/49105)

- 状态：Open
- 类型：Bug fix
- 关联：Closes #36893

该 PR 修复 session row 的 `time_updated` 只在 move、agent/model switch、revert 时更新，而在 turn 过程中不更新的问题。

**价值：**  
有助于会话排序、最近活动展示和历史管理准确性。

---

### 2. CodeMode 内置能力统一 interpreter context

链接：[PR #49104](https://github.com/anomalyco/opencode/pull/49104)

- 状态：Open
- 类型：Refactor

将 CodeMode built-ins 使用的多个重叠 interpreter 视图统一为一个 `ctx` 对象。

**价值：**  
无行为变更，但降低后续扩展 interpreter 和内置 API 的维护成本。

---

### 3. Desktop 增加 macOS 标准 Tab 快捷键

链接：[PR #49103](https://github.com/anomalyco/opencode/pull/49103)

- 状态：Open
- 类型：Desktop UX fix

为 Mac 桌面端添加：

- 上一个 Tab：`⌘⇧[`
- 下一个 Tab：`⌘⇧]`

同时让 tab-cycle commands 更可发现、可在 Shortcuts 设置中重映射。

**价值：**  
直接回应 Tabbed Layout 使用体验问题，改善 macOS 用户工作流。

---

### 4. 按 Provider Code 分类 Content Policy 错误

链接：[PR #49099](https://github.com/anomalyco/opencode/pull/49099)

- 状态：Open
- 类型：AI error handling

新增对不同 Provider 内容安全错误的结构化识别，包括：

- Azure `content_filter`
- Azure `ResponsibleAIPolicyViolation`
- OpenRouter `content_policy_violation`
- OpenRouter `refusal`

**价值：**  
提升错误可解释性，减少将内容策略拒绝误判为普通上游失败的问题。

---

### 5. 修复 Bun 可执行包中 loose plugin 无法导入 `@opencode/plugin`

链接：[PR #49097](https://github.com/anomalyco/opencode/pull/49097)

- 状态：Open
- 类型：Plugin fix

修复 `.opencode/plugins/foo.ts`、用户配置目录 plugin 或绝对路径 plugin 在 Bun 打包环境中无法解析 `@opencode/plugin` 的问题。

**价值：**  
对插件生态非常重要，降低社区自定义插件的接入门槛。

---

### 6. TUI 退出时重置终端模式并正确定位 epilogue

链接：[PR #49089](https://github.com/anomalyco/opencode/pull/49089)

- 状态：Open
- 类型：TUI fix
- 关联：Fixes #48776，Refs #38860

修复 TUI 退出后终端模式可能残留异常、session epilogue 覆盖 shell 内容的问题。

**价值：**  
改善终端可靠性，是高频 CLI/TUI 用户非常关注的基础体验。

---

### 7. 清理 URL 凭证并保护 browser attachments context

链接：[PR #49087](https://github.com/anomalyco/opencode/pull/49087)

- 状态：Open
- 类型：Bug fix
- 关联：Closes #49086

通过 `history.replaceState()` 清理 document URL 中敏感信息，并加强 browser attachments context 防护。

**价值：**  
偏安全与隐私修复，减少凭证泄露风险。

---

### 8. VS Code Extension 对齐 v2 CLI 并处理 symlink shims

链接：[PR #49084](https://github.com/anomalyco/opencode/pull/49084)

- 状态：Open
- 类型：Bug fix / Refactor
- 关联：Closes #49085

使 VS Code extension 适配 OpenCode v2 CLI 约定，例如 `--port` 移除后的行为，并增强 symlink shim 解析。

**价值：**  
提高 IDE 集成稳定性，是 OpenCode 进入日常开发环境的重要路径。

---

### 9. CodeMode 增加 Uint8Array、TextEncoder、TextDecoder

链接：[PR #49076](https://github.com/anomalyco/opencode/pull/49076)

- 状态：Open
- 类型：Feature

为 CodeMode 引入首个二进制类型支持：

- `Uint8Array`
- `TextEncoder`
- `TextDecoder`

并明确 bytes 在 program、extensions、tool boundary 之间的传递规则。

**价值：**  
扩展 CodeMode 能力，为处理二进制数据、编码转换、插件交互打基础。

---

### 10. 修复 client service startup failure 暴露不清晰

链接：[PR #49069](https://github.com/anomalyco/opencode/pull/49069)

- 状态：Open
- 类型：Bug fix
- 关联：Closes #49034

修复后台服务启动失败时，真实错误可能被丢弃，只显示泛化 timeout 的问题。

**价值：**  
与 #49009、端口冲突、服务启动诊断相关。能显著提升 CLI 问题排查效率。

---

## 5. 功能需求趋势

### 1. 布局与会话管理体验

相关 Issues：

- [#49021](https://github.com/anomalyco/opencode/issues/49021)
- [#49043](https://github.com/anomalyco/opencode/issues/49043)
- [#49031](https://github.com/anomalyco/opencode/issues/49031)
- [#49029](https://github.com/anomalyco/opencode/issues/49029)

社区对新布局反应明显分化。核心诉求包括：

- 恢复旧布局或提供切换选项
- 更清晰的项目 / session 列表
- 更好的 vertical tabs 支持
- 避免升级后旧项目和历史会话“消失”

---

### 2. Provider / 模型兼容性与稳定性

相关 Issues：

- [#49041](https://github.com/anomalyco/opencode/issues/49041)
- [#49008](https://github.com/anomalyco/opencode/issues/49008)
- [#49028](https://github.com/anomalyco/opencode/issues/49028)
- [#49062](https://github.com/anomalyco/opencode/issues/49062)
- [#49022](https://github.com/anomalyco/opencode/issues/49022)

用户集中反馈：

- DeepSeek V4.1 Flash 不可用
- GLM 5.3 Flash 自定义 Provider 行为异常
- PDF / 图片等多模态输入支持不一致
- 某些模型声明调用 subagent 后停滞
- 上游请求失败提示不足

---

### 3. 长会话与中断恢复能力

相关 Issues：

- [#49033](https://github.com/anomalyco/opencode/issues/49033)
- [#49083](https://github.com/anomalyco/opencode/issues/49083)
- [#49092](https://github.com/anomalyco/opencode/issues/49092)
- [#49044](https://github.com/anomalyco/opencode/issues/49044)

社区希望 OpenCode 在长时间运行和异常中断下更可靠，包括：

- 避免长时间 “Thinking”
- 网络中断后 conversation 可恢复
- 长 turn 不应被 300s headers timeout 杀死
- 工具调用和自然语言混合输出不能导致状态损坏

---

### 4. 企业级可观测性与合规

相关 Issues / PR：

- [#49038](https://github.com/anomalyco/opencode/issues/49038)
- [#49037](https://github.com/anomalyco/opencode/issues/49037)
- [PR #49099](https://github.com/anomalyco/opencode/pull/49099)

趋势包括：

- W3C trace context / `traceparent`
- AI Gateway trace 串联
- Provider 内容策略错误分类
- 合规类错误清晰表达

这表明 OpenCode 正被更多团队放入企业代理、网关和审计链路中。

---

### 5. 插件和扩展生态

相关 PR / Issues：

- [PR #49097](https://github.com/anomalyco/opencode/pull/49097)
- [PR #49074](https://github.com/anomalyco/opencode/pull/49074)
- [#49091](https://github.com/anomalyco/opencode/issues/49091)

主要方向：

- 插件加载可靠性
- `/connect` 中提供交互式自定义 Provider 注册
- 社区插件生态文档扩展
- 图片生成类插件加入 ecosystem

---

### 6. Desktop / IDE 集成体验

相关 Issues / PR：

- [#49096](https://github.com/anomalyco/opencode/issues/49096)
- [#49059](https://github.com/anomalyco/opencode/issues/49059)
- [PR #49103](https://github.com/anomalyco/opencode/pull/49103)
- [PR #49084](https://github.com/anomalyco/opencode/pull/49084)

社区关注：

- Desktop 缩放行为
- Windows arm64 安装器问题
- macOS 标准快捷键
- VS Code extension 与 v2 CLI 对齐

---

## 6. 开发者关注点

### 1. 稳定性仍是第一优先级

多个 Issue 指向：

- 模型卡死
- 请求无响应
- 输出中断
- 网络中断后会话不可恢复
- 后台服务启动错误不透明

开发者希望 OpenCode 在失败时能够明确报错、可恢复、可重试，而不是无限等待。

---

### 2. 新 UI 改动需要兼容旧工作流

新布局带来的反馈非常集中。用户并非只反对 UI 变化，而是担心：

- 项目切换效率下降
- 会话列表不再直观
- 旧 session 不易发现
- tabbed workflow 不适合多项目并行开发

建议后续提供 layout preference、legacy mode 或更强的 session navigator。

---

### 3. Provider 抽象需要更健壮

自定义 Provider、DeepSeek、GLM、OpenRouter、Azure 等场景暴露了差异：

- 错误结构不同
- 多模态能力声明与实际支持不一致
- 内容策略错误分类不同
- streaming / tool call 边界行为不同

Provider adapter 层仍是高价值改进区域。

---

### 4. 企业用户开始关注可观测性、安全和合规

`traceparent`、ContentPolicy 分类、URL 凭证清理、认证错误显示等反馈显示，OpenCode 正逐渐进入更严肃的工程环境。

这类用户关注的不只是功能是否可用，还包括：

- trace 是否可关联
- 错误是否可审计
- 凭证是否可能泄露
- 安全软件是否信任二进制

---

### 5. 插件与 CodeMode 正在成为扩展核心

CodeMode 的 `Uint8Array` / `TextEncoder` / `TextDecoder`、插件 SDK 加载修复、社区图片生成插件文档，都说明 OpenCode 生态正在从“内置功能”转向“可编程扩展”。

后续值得关注：

- 插件沙箱与权限模型
- Provider 注册体验
- 多模态插件能力
- CodeMode 与 tools / extensions 的边界设计

---

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报  
日期：2026-09-15  
数据源：GitHub `badlogic/pi-mono` / `earendil-works/pi`

## 1. 今日速览

过去 24 小时 Pi 社区活跃度较高，共有 26 条 Issue 更新、10 个 PR 更新，但没有新的 Release。今日重点集中在 **Coding Agent 会话可靠性、TUI 交互稳定性、Provider 兼容性、图片与大上下文处理、模型切换体验** 等方向。

值得注意的是，大部分 Issue 已在当天关闭，说明维护团队对边界 bug 和扩展 API 诉求响应较快；同时多个 PR 围绕 Provider 扩展、会话性能、工具执行可观测性和 Responses API 兼容性展开，反映出 Pi 正在持续增强其作为 AI 开发工具底座的稳定性与集成能力。

---

## 2. 社区热点 Issues

### 1. Compaction 可能因遗漏 thinking 消息导致上下文溢出  
链接：[#9602](https://github.com/earendil-works/pi/issues/9602)  
该问题指出，在长会话中使用本地 Qwen / llama.cpp 时，压缩逻辑可能错误包含此前请求中已省略的 thinking messages，导致上下文或输出限制被击穿。  
重要性在于这直接影响长会话、推理模型和本地模型场景下的稳定性。Issue 已关闭，说明该问题已被快速处理或归档。

### 2. tool_execution_end 监听器异常会导致工具结果丢失  
链接：[#9599](https://github.com/earendil-works/pi/issues/9599)  
当 `Agent.subscribe()` 的 `tool_execution_end` listener 抛错时，已完成工具的 `toolResult` 未写入 `agent.state.messages`，造成历史记录中只有 tool call 而没有结果。  
这是 Agent Loop 可靠性问题，可能影响后续上下文、审计和工具调用链一致性。该 Issue 有 2 条评论并已关闭，属于高优先级基础设施问题。

### 3. 并发 `pi -c` 运行会写入同一个 session 文件  
链接：[#9596](https://github.com/earendil-works/pi/issues/9596)  
用户报告在同一目录中同时启动两个 `pi -c` 任务时，两个进程会解析到同一个 session 文件并交错写入，没有锁也没有提示。  
该问题对 CI、脚本化调用、并发 Agent 工作流影响明显，可能导致会话污染和不可预期上下文继承。Issue 已关闭，但暴露出 session 层并发控制需求。

### 4. 恢复含多张大图片的会话后 base64 图片损坏  
链接：[#9590](https://github.com/earendil-works/pi/issues/9590)  
在包含多个多 MB 图片工具结果的 transcript 中恢复会话时，Pi 构造请求时可能生成损坏的 base64 图片，导致 Provider 返回 400，并且后续请求持续失败。  
这是图片工具、会话恢复和多模态上下文结合时的严重问题。对使用截图、图片读取、视觉模型的开发者影响较大。

### 5. TUI 在极窄宽度下遇到 CJK 字符会无限递归崩溃  
链接：[#9606](https://github.com/earendil-works/pi/issues/9606)  
`wordWrapLine()` 在 `maxWidth=1` 且字符宽度大于布局宽度时，会以相同参数递归调用，最终导致 `RangeError: Maximum call stack size exceeded`。  
该问题说明 TUI 对 Unicode grapheme、CJK 宽字符和极端布局的处理仍有边界缺陷。已关闭，属于终端 UI 稳定性修复方向。

### 6. Agent 级 retry 未遵守 429 的 Retry-After  
链接：[#9595](https://github.com/earendil-works/pi/issues/9595)  
用户反馈 Provider 返回 429 且带有 `Retry-After: 30` 时，Pi 仍在约 2 秒后重试，未尊重服务端限流建议。  
这对 OpenAI-compatible Provider、聚合服务和企业内部网关非常关键，错误的重试策略可能放大限流问题并增加调用成本。

### 7. `/new` 会静默重置用户已选择的模型  
链接：[#9592](https://github.com/earendil-works/pi/issues/9592)  
执行 `/new` 后，当前模型会回到启动默认值或首个可用模型，但没有任何提示。  
该问题影响多模型工作流，尤其是用户在会话中临时切换到更适合当前任务的模型后，可能在新会话中误用默认模型。

### 8. Ctrl+P 在 scoped models 仅有一个模型时不会切换  
链接：[#9580](https://github.com/earendil-works/pi/issues/9580)  
当 scoped models 中只剩一个模型，且与当前模型不同，按 `Ctrl+P` 只提示 “Only one model in scope”，但没有切换过去。  
这是一个典型 UX bug，影响通过 scope 限定模型集合的高级用户。相关修复 PR 已出现并关闭，说明该问题已被快速响应。

### 9. `/resume` 在 session 很多时启动过慢  
链接：[#9576](https://github.com/earendil-works/pi/issues/9576)  
用户反馈当 session 文件达到数百个以上时，`/resume` 需要 10-15 秒甚至更久才显示选择器，因为它会一次性读取和解析所有 session 文件。  
该问题反映 Pi 在长期使用后的性能退化，建议优先展示最近会话、后台加载其余会话，是一个明确的性能优化方向。

### 10. Session 时间戳使用本地时间却带 `Z` 后缀  
链接：[#9609](https://github.com/earendil-works/pi/issues/9609)  
session `.jsonl` 中的时间戳值为本地时间，但格式带有 `Z`，语义上表示 UTC，可能导致跨时区排序、同步和审计错误。  
该问题虽小，但对日志处理、外部分析工具和可重复调试非常重要。Issue 已关闭，说明维护者已处理或确认。

---

## 3. 重要 PR 进展

### 1. 修复 summarization stream 未应用 provider hooks  
链接：[#9607](https://github.com/earendil-works/pi/pull/9607)  
该 PR 修复 direct summarization 调用，包括 compaction 和 branch summary，未触发 `before_provider_request` 扩展 hook 的问题。  
这对于依赖请求拦截、鉴权、审计、路由或自定义 payload 修改的扩展非常重要。

### 2. 新增 GMI Cloud Provider  
链接：[#9605](https://github.com/earendil-works/pi/pull/9605)  
该 PR 将 GMI Cloud 作为内置 Provider 加入 Pi。GMI Cloud 是 OpenAI Chat Completions 兼容的聚合服务，复用 `openai-completions` 实现。  
这继续扩大 Pi 的模型接入生态，降低用户配置第三方模型服务的门槛。

### 3. BashOperations 支持上报 shell PID  
链接：[#9604](https://github.com/earendil-works/pi/pull/9604)  
新增可选 `onSpawn(pid)` 回调，在 shell 子进程创建后立即将 PID 通知调用方。  
该能力适合 headless server、桌面应用、进程树监控、安全沙箱和任务管理器等高级集成场景。

### 4. 精确 session ID 查询避免扫描整个 transcript  
链接：[#9601](https://github.com/earendil-works/pi/pull/9601)  
该 PR 优化通过 session ID 查找 session header 的路径，避免加载完整 transcript。  
这与 `/resume` 性能问题高度相关，能够改善历史会话数量较多时的响应速度。目前 PR 仍为开放状态，值得继续关注。

### 5. 新增 Gemini-only Antigravity Provider  
链接：[#9594](https://github.com/earendil-works/pi/pull/9594)  
该 PR 添加 Google Antigravity 作为一等 OAuth Provider，用于恢复 subscription-backed Gemini 访问。  
该功能面向 Gemini 用户和依赖 Google 生态的开发者，是 Provider 多样化的重要补充。

### 6. 导出 image bytes MIME detector  
链接：[#9591](https://github.com/earendil-works/pi/pull/9591)  
该 PR 导出 `detectSupportedImageMimeType`，允许扩展基于内存中的图片字节流检测 MIME 类型，而不必依赖文件路径。  
这对 sandbox、远程文件系统、流式读取工具和自定义 Read Tool 扩展很有价值。

### 7. 修复 OpenAI Responses API user input item 缺少 type  
链接：[#9589](https://github.com/earendil-works/pi/pull/9589)  
该 PR 修复 Pi 构造 Responses API 请求时，user input item 缺少必需 `type` 字段的问题。  
该 bug 会导致严格实现的 Responses endpoint 返回 400，是 Provider 兼容性方面的重要修复。

### 8. scoped models 仅有一个模型时正确切换  
链接：[#9584](https://github.com/earendil-works/pi/pull/9584)  
该 PR 修复 `Ctrl+P` 在 scoped models 只有一个模型但不同于当前模型时不切换的问题。  
该修复直接对应 Issue [#9580](https://github.com/earendil-works/pi/issues/9580)，提升多模型工作流体验。

### 9. 早期版本的 scoped model 修复 PR  
链接：[#9582](https://github.com/earendil-works/pi/pull/9582)  
该 PR 同样针对 scoped model 单模型切换问题，但被后续 PR [#9584](https://github.com/earendil-works/pi/pull/9584) 取代。  
虽然已关闭，但体现了社区对模型切换 UX 问题的快速迭代。

### 10. Prompt template frontmatter 解析失败时给出警告  
链接：[#9581](https://github.com/earendil-works/pi/pull/9581)  
此前 `prompts/*.md` 中 YAML frontmatter 解析失败时会被静默丢弃，导致自定义 prompt 命令消失且无提示。  
该 PR 增加诊断 warning，与 Skill 的错误提示机制保持一致，有助于开发者快速定位配置问题。

---

## 4. 功能需求趋势

### 1. Provider 与模型生态继续扩张  
相关链接：  
- [#9605 GMI Cloud Provider](https://github.com/earendil-works/pi/pull/9605)  
- [#9594 Antigravity Provider](https://github.com/earendil-works/pi/pull/9594)  
- [#9597 Wallaby Provider 请求](https://github.com/earendil-works/pi/issues/9597)  
- [#9575 Agnes AI Provider 请求](https://github.com/earendil-works/pi/issues/9575)  

社区持续推动更多 OpenAI-compatible、Gemini、聚合服务和新模型平台接入。Pi 的 Provider 层正在成为用户关注重点，尤其是 API key 管理、OAuth、Responses API 兼容和第三方 endpoint 适配。

### 2. 会话系统的可靠性与性能成为高频主题  
相关链接：  
- [#9596 并发 session 写入冲突](https://github.com/earendil-works/pi/issues/9596)  
- [#9576 /resume 性能问题](https://github.com/earendil-works/pi/issues/9576)  
- [#9601 精确 session ID 查询优化](https://github.com/earendil-works/pi/pull/9601)  
- [#9609 时间戳格式问题](https://github.com/earendil-works/pi/issues/9609)  
- [#9574 允许 flush pending session entries](https://github.com/earendil-works/pi/issues/9574)  

这表明 Pi 的重度用户已经积累了大量会话，并开始遇到日志一致性、并发写入、恢复性能、时间戳准确性等长期运行问题。

### 3. 多模态与图片上下文处理问题增多  
相关链接：  
- [#9590 base64 图片损坏](https://github.com/earendil-works/pi/issues/9590)  
- [#9579 图片恢复预算固定为 16 MiB](https://github.com/earendil-works/pi/issues/9579)  
- [#9608 导出 buffer-based MIME detector](https://github.com/earendil-works/pi/issues/9608)  
- [#9591 导出图片 MIME 检测工具](https://github.com/earendil-works/pi/pull/9591)  

随着图片工具和视觉模型使用增加，社区开始关注图片大小限制、base64 完整性、MIME 检测、Provider request body limit 等底层问题。

### 4. TUI / 终端交互边界问题持续暴露  
相关链接：  
- [#9606 CJK 字符导致 wordWrapLine 无限递归](https://github.com/earendil-works/pi/issues/9606)  
- [#9603 /thinking autocomplete 信息不足](https://github.com/earendil-works/pi/issues/9603)  
- [#9600 Ctrl+Y 丢失 large-paste 内容](https://github.com/earendil-works/pi/issues/9600)  
- [#9586 Kitty images 在 Herdr 中导致 ghosting](https://github.com/earendil-works/pi/issues/9586)  
- [#9583 Windows ConPTY loader 绘制错位](https://github.com/earendil-works/pi/issues/9583)  

终端环境差异、Unicode 宽字符、图片协议、Windows ConPTY、剪贴板/大粘贴处理，仍是 Pi TUI 层的复杂挑战。

### 5. 扩展 API 与可嵌入能力诉求增强  
相关链接：  
- [#9578 Extension API: atomic interrupt](https://github.com/earendil-works/pi/issues/9578)  
- [#9604 BashOperations onSpawn(pid)](https://github.com/earendil-works/pi/pull/9604)  
- [#9607 provider hooks for summarization](https://github.com/earendil-works/pi/pull/9607)  
- [#9574 SessionManager.flush()](https://github.com/earendil-works/pi/issues/9574)  

用户不仅在使用 Pi 的 CLI/TUI，也在将其嵌入桌面应用、headless 服务、自动化系统和自定义 Agent 平台。因此，生命周期控制、进程信息、hook 一致性和 session 持久化 API 变得更加重要。

---

## 5. 开发者关注点

### 1. 长会话与上下文压缩仍是核心稳定性问题  
多个 Issue 指向 compaction、summarization、图片上下文和 thinking 消息处理。对于长任务 Agent 来说，任何上下文遗漏、重复、污染或压缩错误都可能导致任务失败或成本上升。

代表链接：  
- [#9602](https://github.com/earendil-works/pi/issues/9602)  
- [#9607](https://github.com/earendil-works/pi/pull/9607)  
- [#9579](https://github.com/earendil-works/pi/issues/9579)

### 2. Provider 兼容性需要更细粒度控制  
开发者希望 Pi 更好地适配 OpenAI-compatible 服务、内部网关、无 Bearer Authorization 的环境、Responses API 严格实现以及不同 request size / retry policy。  
这说明 Pi 的 Provider 抽象需要继续增强配置能力，而不仅仅是新增 provider 名称。

代表链接：  
- [#9587](https://github.com/earendil-works/pi/issues/9587)  
- [#9589](https://github.com/earendil-works/pi/pull/9589)  
- [#9595](https://github.com/earendil-works/pi/issues/9595)  
- [#9605](https://github.com/earendil-works/pi/pull/9605)

### 3. 会话文件是可靠性和性能瓶颈  
并发写入、恢复速度、flush 机制、时间戳语义和 transcript 扫描都被社区集中提及。  
对于把 Pi 当作长期开发助手的用户来说，session 不只是历史记录，而是工作流状态的一部分。

代表链接：  
- [#9596](https://github.com/earendil-works/pi/issues/9596)  
- [#9576](https://github.com/earendil-works/pi/issues/9576)  
- [#9601](https://github.com/earendil-works/pi/pull/9601)  
- [#9609](https://github.com/earendil-works/pi/issues/9609)

### 4. TUI 的跨平台一致性仍需打磨  
Windows、Kitty graphics、terminal multiplexer、CJK 宽字符、large paste、autocomplete 等问题集中出现，说明 Pi 的终端体验已经覆盖更多复杂使用环境。  
这类问题通常不影响核心 Agent 能力，但会显著影响开发者日常使用体验。

代表链接：  
- [#9606](https://github.com/earendil-works/pi/issues/9606)  
- [#9583](https://github.com/earendil-works/pi/issues/9583)  
- [#9586](https://github.com/earendil-works/pi/issues/9586)  
- [#9600](https://github.com/earendil-works/pi/issues/9600)

### 5. 模型选择与配置透明度需要提升  
`/new` 静默重置模型、`Ctrl+P` 不切换唯一 scoped model、prompt template YAML 错误静默失败，这些问题共同指向一个痛点：用户需要更明确的状态反馈和配置诊断。

代表链接：  
- [#9592](https://github.com/earendil-works/pi/issues/9592)  
- [#9580](https://github.com/earendil-works/pi/issues/9580)  
- [#9584](https://github.com/earendil-works/pi/pull/9584)  
- [#9581](https://github.com/earendil-works/pi/pull/9581)

---

总体来看，9 月 15 日的 Pi 社区动态以 **稳定性修复、Provider 扩展、会话系统优化、TUI 边界处理和扩展 API 完善** 为主。虽然没有新版本发布，但 Issue 与 PR 的密集关闭表明项目维护节奏较快，社区反馈也越来越偏向真实生产/长期使用场景。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报  
**日期：2026-09-15**  
**仓库：QwenLM/qwen-code**

---

## 1. 今日速览

过去 24 小时 Qwen Code 社区活跃度较高：发布了 **v0.23.4** 正式版与 nightly 版本，同时 CUA Driver 连续发布 `v0.20.7 / v0.20.8` 预构建二进制包。  
社区讨论重点集中在 **ACP/serve 会话稳定性、Shell 权限安全、Hooks 系统完善、扩展管理、Windows/macOS/Linux 平台兼容性** 等方向。  
Issue 侧 P1 问题较多，尤其是 MiniMax 工具参数错误、Linux 静默崩溃、ACP 通道异常、Web Terminal PTY 打包缺失等，值得开发者重点关注。

---

## 2. 版本发布

### v0.23.4  
链接：https://github.com/QwenLM/qwen-code/releases/tag/v0.23.4

本次正式版包含一项值得注意的 Breaking Change：

- **移除 channel 中可配置的 message-prefix 过滤机制**  
  之后符合条件的消息将直接遵循普通的发送者、群组、提及与配对策略，不再依赖前缀过滤。

由于 Release Notes 截断，完整变更需查看 GitHub Release 页面。

---

### v0.23.4-nightly.20260914.f024b37689  
链接：https://github.com/QwenLM/qwen-code/releases/tag/v0.23.4-nightly.20260914.f024b37689

Nightly 版本包含测试与修复相关变更，例如：

- 记录 Windows inode gate 所隐藏的测试情况，并恢复部分跳过测试。
- 包含 CUA 相关修复，Release Notes 内容显示有 `fix(cua)` 变更。

---

### cua-driver-rs v0.20.8 / v0.20.7  
链接：  
- https://github.com/QwenLM/qwen-code/releases/tag/cua-driver-rs-v0.20.8  
- https://github.com/QwenLM/qwen-code/releases/tag/cua-driver-rs-v0.20.7

CUA Driver 继续发布预构建二进制：

- **macOS**：codesigned + notarized universal binary，并提供 `QwenCuaDriver.app`
- **Linux**：未签名，支持 x86_64 / arm64，glibc 2.31+
- **Windows**：未签名 UIAccess worker + native SDK payload，支持 x86_64 / arm64

这说明 Qwen Code 的 Computer Use / CUA 能力仍在快速迭代，平台分发和输入控制能力是近期重点。

---

## 3. 社区热点 Issues

### 1. MiniMax 参数校验导致内置工具调用失败  
Issue：https://github.com/QwenLM/qwen-code/issues/11834  
评论数：6｜状态：Open｜优先级：P1

用户在 Qwen Code 0.23.3 中遇到：

```text
API Error: 400 invalid params, function parameters is empty (2013)
```

该问题与 MiniMax 对“无参数工具”的处理有关，后续也出现了重复 Issue #11905。它影响内容生成主路径，且评论数最高，说明已有多名用户关注或复现。

---

### 2. Linux 上 0.23.3 间歇性静默崩溃  
Issue：https://github.com/QwenLM/qwen-code/issues/11849  
评论数：5｜状态：Open｜优先级：P1

用户反馈 Qwen Code 在长任务中会无提示退出回到 bash，怀疑与 background shell 或 subagent completion 有关。  
这是稳定性层面的高优先级问题，尤其影响长上下文任务和多代理执行体验。

---

### 3. ACP 模式忽略 approval mode，工具自动执行  
Issue：https://github.com/QwenLM/qwen-code/issues/11887  
评论数：4｜状态：Open｜优先级：P2

用户报告 `qwen --acp` 在限制性审批模式下仍会自动执行文件写入和 Shell 命令，且未发送 `session/request_permission`。  
该问题涉及 **ACP 协议安全边界与客户端权限控制**，虽然标记为 P2，但对 IDE / 外部客户端集成非常关键。

---

### 4. ACP available_commands_update 过大导致 session 被销毁  
Issue：https://github.com/QwenLM/qwen-code/issues/11908  
评论数：3｜状态：Open｜优先级：P1

当 `available_commands_update` 通知超过 `MAX_JSON_NODES` 后，ACP bridge 将其判定为非法 ndjson 消息并关闭通道，随后所有请求返回：

```text
No session with id
```

这是 serve/acp 会话管理的严重稳定性问题，影响外部协议桥接与长生命周期会话。

---

### 5. MiniMax 拒绝无参数 built-in tools  
Issue：https://github.com/QwenLM/qwen-code/issues/11905  
评论数：3｜状态：Open｜优先级：P1

该 Issue 明确指出 MiniMax-M3 在 Qwen Code 0.23.4 中拒绝 parameterless built-in tools，错误码同样是 2013。  
与 #11834 形成交叉验证，说明 **第三方 OpenAI-compatible / Chat API 的工具 schema 兼容性** 已成为用户痛点。

---

### 6. Hook 禁用状态在 reload 后丢失  
Issue：https://github.com/QwenLM/qwen-code/issues/11902  
评论数：3｜状态：Open｜优先级：P3

Hooks 注册表 reload 时会保留 enabled 状态，但当前匹配 key 包含 command 等字段；当命令变化后，禁用状态无法正确继承。  
这说明 Hooks 系统正在进入“真实工作流管理”阶段，用户开始关注配置热加载、状态一致性等细节。

---

### 7. `/hooks` Ink UI 与实际 Hook registry 不一致  
Issue：https://github.com/QwenLM/qwen-code/issues/11901  
评论数：3｜状态：Open｜优先级：P3

当前 Ink UI 的 `/hooks` 对话框自行读取 settings，而不是读取 session 实际运行的 hooks listing。  
这会导致 UI 展示与执行状态不一致，是 Hooks 体验统一化的重要改进点。

---

### 8. VS Code IDE Companion 的 ACP 权限请求并发问题  
Issue：https://github.com/QwenLM/qwen-code/issues/11899  
评论数：3｜状态：Open｜优先级：P3

旧版 ACP transport 每个 webview 只保留一个 pending permission request。第二个请求到来时，会强制取消第一个请求。  
这对 VS Code 集成体验影响明显，尤其在多工具并发或 agent 自动化场景下。

---

### 9. Web Terminal PTY 缺失导致 macOS standalone 不可用  
Issue：https://github.com/QwenLM/qwen-code/issues/11872  
评论数：3｜状态：Open｜优先级：P1

Standalone 包声明了 `@lydell/node-pty`，但没有实际打包预构建依赖；macOS 代码签名还会阻止用户本地安装的 prebuild。  
该问题直接导致 Web Terminal 显示：

```text
[Error: PTY not available]
```

与 PR #11881 形成对应修复，是平台分发质量的关键问题。

---

### 10. Shell 权限解析存在安全风险：特殊空白字符可绕过 allow rule  
Issue：https://github.com/QwenLM/qwen-code/issues/11851  
评论数：3｜状态：Open｜优先级：P1

`isAsyncOperator` 使用 JavaScript `\s` 判断空白，导致 `\r`、`\v`、`\f`、`\u00a0` 等被当作 bash word separators，可能让 Bash allow rule 覆盖第二条命令。  
这是典型的 Shell 解析安全边界问题，重要性高，并已有修复 PR #11865 跟进。

---

## 4. 重要 PR 进展

### 1. Hook 执行进度事件  
PR：https://github.com/QwenLM/qwen-code/pull/11906  
状态：Closed

新增 `hook-progress` MessageBus 消息，Hook 开始与结束时都会上报事件名、显示名、类型、批次位置和状态信息。  
这为 UI 展示 Hook 执行状态、调试自动化流程打下基础。

---

### 2. 打开 `/hooks` 时重新加载 Hook registry  
PR：https://github.com/QwenLM/qwen-code/pull/11904  
状态：Open

该 PR 让 `/hooks` 菜单打开前重新读取 user/workspace settings，并调用 `HookSystem.reload()`。  
它直接回应了 Hooks 热加载与 UI 一致性问题，对动态配置体验很重要。

---

### 3. OpenTUI 支持完整 `/hooks` 浏览器  
PR：https://github.com/QwenLM/qwen-code/pull/11903  
状态：Closed

将 OpenTUI 中原本简单的 “Hooks enabled: yes/no” 替换为只读 Hooks 浏览器。  
用户可以从 event、matcher、hook 列表逐级查看详情，提升 OpenTUI 与 Ink UI 的功能一致性。

---

### 4. 删除第一代 Stop-hook Goal 实现  
PR：https://github.com/QwenLM/qwen-code/pull/11900  
状态：Open

删除第一代 Goal 实现，包括 blocking Stop hook、transcript judge 和 in-memory store。  
该 PR 移除了大量旧代码：约 1,139 行生产代码和 2,260 行测试，说明 Goal / Stop Hook 机制正在重构。

---

### 5. Windows review cleanup 测试修复  
PR：https://github.com/QwenLM/qwen-code/pull/11893  
状态：Closed

通过 mock `realpathSync` 修复 review cleanup 测试在 Windows 下 cwd witness 不稳定的问题。  
这是 CI 稳定性修复，和近期 Windows 测试失败问题相关。

---

### 6. Windows 扩展更新 / 卸载目录锁 fallback  
PR：https://github.com/QwenLM/qwen-code/pull/11889  
状态：Open

当 Windows 上扩展目录被锁定，无法通过 rename 移动目录时，事务切换为 copy fallback。  
该 PR 对应 Issue #11883，解决 Windows 用户扩展更新和卸载 `EPERM` 的痛点。

---

### 7. `/extensions` 更新进度与状态清理  
PR：https://github.com/QwenLM/qwen-code/pull/11886  
状态：Open

扩展更新过程中增加 loading 状态，并在更新成功后清除 “Update Now” 提示。  
这是 UI 反馈类改进，对扩展生态体验很重要。

---

### 8. Standalone 包打包 node-pty prebuilds  
PR：https://github.com/QwenLM/qwen-code/pull/11881  
状态：Closed

修复 standalone archives 未包含 `@lydell/node-pty` prebuild 的问题，使 Web Terminal 能正常工作。  
该 PR 直接解决 Web Shell / Desktop Web Terminal 的 PTY 可用性问题，尤其影响 macOS 分发。

---

### 9. DashScope Batch API：新增 `qwen batch` 命令  
PR：https://github.com/QwenLM/qwen-code/pull/11874  
状态：Open

新增：

- `qwen batch submit`
- `qwen batch status`
- `qwen batch fetch`
- `qwen batch cancel`
- headless `--batch` 模式

该功能面向大量独立单轮请求，利用 DashScope Batch API 降低成本并使用独立 quota，是面向批处理开发流的重要增强。

---

### 10. Shell 权限解析安全修复：限制 isAsyncOperator 空白字符范围  
PR：https://github.com/QwenLM/qwen-code/pull/11865  
状态：Open

将 `isAsyncOperator` 中的空白判断从 JavaScript `/\s/` 缩小为更贴近 shell 语义的 space/tab/newline。  
该 PR 对应安全 Issue #11851，防止特殊空白字符导致 allow rule 错误覆盖后续命令。

---

## 5. 功能需求趋势

### 1. ACP / serve / daemon 协议成为集成核心  
相关 Issues：  
- https://github.com/QwenLM/qwen-code/issues/11887  
- https://github.com/QwenLM/qwen-code/issues/11908  
- https://github.com/QwenLM/qwen-code/issues/11867  
- https://github.com/QwenLM/qwen-code/issues/11868  
- https://github.com/QwenLM/qwen-code/issues/11869  

社区正在关注 ACP 权限协议、serve session 生命周期、daemon protocol 规范化、event/journal 外部化，以及 Java control plane vertical slice。  
这表明 Qwen Code 正从 CLI 工具向 **可嵌入、可远程控制、可协议化集成的 agent runtime** 演进。

---

### 2. Hooks 系统进入快速完善期  
相关 Issues / PR：  
- https://github.com/QwenLM/qwen-code/issues/11901  
- https://github.com/QwenLM/qwen-code/issues/11902  
- https://github.com/QwenLM/qwen-code/issues/11862  
- https://github.com/QwenLM/qwen-code/pull/11904  
- https://github.com/QwenLM/qwen-code/pull/11906  

Hooks 相关讨论集中在：

- UI 与实际执行 registry 一致性
- reload 后状态保留
- matcher 边界处理
- Hook progress 可观测性
- OpenTUI / Ink UI 对齐

这说明 Hooks 已逐渐成为高级自动化工作流的关键能力。

---

### 3. 平台分发与跨平台稳定性需求上升  
相关 Issues / PR：  
- https://github.com/QwenLM/qwen-code/issues/11872  
- https://github.com/QwenLM/qwen-code/issues/11883  
- https://github.com/QwenLM/qwen-code/issues/11817  
- https://github.com/QwenLM/qwen-code/pull/11881  
- https://github.com/QwenLM/qwen-code/pull/11889  

Windows、macOS、Linux 都有平台特定问题出现：

- Windows：文件锁、EPERM、inode / bigint stat、测试不稳定
- macOS：代码签名影响 node-pty prebuild
- Linux：Ink 渲染崩溃、窗口层级问题、CUA 输入适配

这说明 Qwen Code 的用户环境正在多样化，打包和测试矩阵需要持续增强。

---

### 4. 扩展生态体验正在被重点打磨  
相关 Issues / PR：  
- https://github.com/QwenLM/qwen-code/issues/11884  
- https://github.com/QwenLM/qwen-code/issues/11885  
- https://github.com/QwenLM/qwen-code/issues/11896  
- https://github.com/QwenLM/qwen-code/pull/11886  
- https://github.com/QwenLM/qwen-code/pull/11889  

社区关注点包括：

- 扩展更新过程缺少进度反馈
- 更新成功后状态未清理
- 扩展目录丢失后无法卸载或重装
- Windows 上更新 / 卸载失败
- symlink 越界复制与安装授权安全策略

扩展系统正在从“可用”走向“可维护、可审计、跨平台可靠”。

---

### 5. Shell 权限与安全边界持续被审视  
相关 Issues / PR：  
- https://github.com/QwenLM/qwen-code/issues/11851  
- https://github.com/QwenLM/qwen-code/issues/11882  
- https://github.com/QwenLM/qwen-code/issues/11815  
- https://github.com/QwenLM/qwen-code/pull/11865  

高频主题包括：

- shell comment 语义
- compound command splitter 一致性
- allow rule 覆盖范围
- 特殊空白字符处理
- Bash 与其他 shell 的语义差异

这类问题直接影响 agent 执行命令时的权限安全，是 Qwen Code 作为 coding agent 必须持续加强的核心领域。

---

## 6. 开发者关注点

### 1. 稳定性：长任务、后台 shell、subagent 容易触发崩溃  
Linux 静默退出、Ink React error、session 被 ACP 消息击穿等问题表明，长任务和多组件并发仍是主要风险区。  
相关链接：  
- https://github.com/QwenLM/qwen-code/issues/11849  
- https://github.com/QwenLM/qwen-code/issues/11873  
- https://github.com/QwenLM/qwen-code/issues/11908  

---

### 2. 权限与安全：Shell 解析必须更接近真实 shell  
多个 Issue 指出当前命令拆分、注释识别、空白字符处理存在边界问题。  
开发者希望 Qwen Code 的 permission rule 与真实 shell 行为更一致，避免误放行或误拦截。  
相关链接：  
- https://github.com/QwenLM/qwen-code/issues/11851  
- https://github.com/QwenLM/qwen-code/issues/11882  
- https://github.com/QwenLM/qwen-code/issues/11815  

---

### 3. 第三方模型兼容性：工具 schema 需要更健壮  
MiniMax 对 parameterless tools 的拒绝暴露出不同模型供应商在 tool calling schema 上的差异。  
开发者期望 Qwen Code 对 OpenAI-compatible API、MiniMax、DeepSeek 等模型有更可靠的适配。  
相关链接：  
- https://github.com/QwenLM/qwen-code/issues/11834  
- https://github.com/QwenLM/qwen-code/issues/11905  
- https://github.com/QwenLM/qwen-code/issues/11894  

---

### 4. UI 可观测性：操作需要明确反馈  
扩展更新无进度、Hook 执行不可见、模型选择窗口层级异常等问题说明，开发者希望 CLI/TUI 不只是能执行，还要能清晰表达当前状态。  
相关链接：  
- https://github.com/QwenLM/qwen-code/issues/11884  
- https://github.com/QwenLM/qwen-code/issues/11888  
- https://github.com/QwenLM/qwen-code/pull/11906  

---

### 5. 跨平台交付：Windows 和 macOS 仍是高摩擦环境  
Windows 文件锁、NTFS 大 file id、CI 测试差异，macOS codesign 与本地 prebuild 冲突，都是近期反复出现的痛点。  
相关链接：  
- https://github.com/QwenLM/qwen-code/issues/11883  
- https://github.com/QwenLM/qwen-code/issues/11877  
- https://github.com/QwenLM/qwen-code/issues/11872  
- https://github.com/QwenLM/qwen-code/pull/11881  

---

### 6. Agent Runtime 方向：协议化、批处理和外部控制面需求增强  
`qwen batch`、daemon protocol spec、Java control plane、event/journal 外部化等需求显示，社区正在把 Qwen Code 用作更大系统中的 agent runtime，而不仅是交互式 CLI。  
相关链接：  
- https://github.com/QwenLM/qwen-code/pull/11874  
- https://github.com/QwenLM/qwen-code/issues/11867  
- https://github.com/QwenLM/qwen-code/issues/11868  
- https://github.com/QwenLM/qwen-code/issues/11869

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报｜2026-09-15

## 1. 今日速览

过去 24 小时没有新版本发布，但 v0.9.14 相关工作明显提速：核心维护者集中补齐 GPUI / App-server 所需的运行时 API，包括队列、凭据、命令目录、通知、Jobs、Workflows、Files 等能力。  
社区反馈的重点仍集中在 TUI 稳定性与桌面化能力：终端冻结、作业控制、外部编辑器输入竞争、ACP 会话恢复、Gemini 模型列表等问题值得关注。  
PR 侧，#6175 继续推进 v0.9.14 第二批修复；同时有外部贡献者提交 AICraft Provider 与 Weixin Bridge 修复，说明集成生态仍在扩展。

---

## 2. 社区热点 Issues

### 1. App-server typed command catalog route（APPS-28）
- 链接：[#6183](https://github.com/Hmbown/DeepSeek-TUI/issues/6183)
- 状态：OPEN
- 重要性：GPUI 需要复用 TUI 已有的 slash command 定义，包括命令名、参数、可用性与帮助信息，避免桌面端重复维护命令表。
- 社区反应：暂无评论，但这是 GPUI 命令面板和 composer 能力的基础设施需求。

### 2. App-server credential management route（APPS-48）
- 链接：[#6182](https://github.com/Hmbown/DeepSeek-TUI/issues/6182)
- 状态：OPEN
- 重要性：桌面端需要通过 Engine 管理凭据的 inspect / set / clear，而不是绕过 TUI 凭据存储路径。
- 社区反应：暂无评论，但与首次配置、Provider 管理、安全边界直接相关。

### 3. App-server session notice surface and running-work accounting
- 链接：[#6180](https://github.com/Hmbown/DeepSeek-TUI/issues/6180)
- 状态：OPEN
- 重要性：为后台可运行客户端补齐 session notice 与 running work 统计，支撑窗口关闭、应用退出、后台任务提醒等桌面体验。
- 社区反应：暂无评论，但属于 v0.9.14 面向 GPUI 的关键能力。

### 4. App-server turn queue inspect and cancel
- 链接：[#6176](https://github.com/Hmbown/DeepSeek-TUI/issues/6176)
- 状态：OPEN
- 重要性：GPUI 需要真实队列语义：运行中提交、查看待处理任务、取消未开始任务。否则桌面端只能拒绝输入或自行实现一套队列。
- 社区反应：暂无评论，但该问题直接影响多轮交互和桌面端 UX。

### 5. App-server queue semantics routes（APPS-30）
- 链接：[#6177](https://github.com/Hmbown/DeepSeek-TUI/issues/6177)
- 状态：OPEN
- 重要性：要求定义 pending input、queued follow-ups、parked work 等队列概念，并提供 list / pause / resume / cancel API。
- 社区反应：暂无评论；与 #6176 互为配套，是队列控制面的更抽象设计任务。

### 6. ACP session/new 返回的 sessionId 无法被 session/load 解析
- 链接：[#6174](https://github.com/Hmbown/DeepSeek-TUI/issues/6174)
- 状态：OPEN
- 重要性：ACP 客户端创建会话后无法恢复，会破坏 session resume 的基本工作流。
- 社区反应：已有 1 条评论，说明该问题已被注意到；影响协议一致性与客户端集成可靠性。

### 7. Gemini: /models generates error
- 链接：[#6173](https://github.com/Hmbown/DeepSeek-TUI/issues/6173)
- 状态：OPEN
- 重要性：Gemini Provider 的 `/models` 列表获取失败，会影响模型发现、自动补全和配置体验。
- 社区反应：已有 1 条评论；该问题延续了 #6018 的上下文，说明 Provider 兼容性仍是活跃痛点。

### 8. TUI 无 job-control handshake，后台进程组可能被 SIGTTIN 挂起
- 链接：[#6169](https://github.com/Hmbown/DeepSeek-TUI/issues/6169)
- 状态：OPEN
- 重要性：TUI 仅在启动时检查前台终端所有权，缺少 SIGTSTP / SIGTTIN / SIGCONT 处理。进程组进入后台后可能被挂起，同时终端仍保留 raw / mouse / paste 模式。
- 社区反应：已有 1 条评论；这是较底层但高风险的终端稳定性问题。

### 9. `/hooks edit` 启动编辑器时未暂停 TUI 输入线程
- 链接：[#6165](https://github.com/Hmbown/DeepSeek-TUI/issues/6165)
- 状态：OPEN
- 重要性：外部编辑器与 TUI 同时读取 stdin，导致用户输入被拆分到 editor 与 composer，严重影响 hooks 配置体验。
- 社区反应：已有 1 条评论；反映 TUI 与外部进程协作仍需完善。

### 10. App-server: GET /v1/artifacts 和 GET /v1/files
- 链接：[#6163](https://github.com/Hmbown/DeepSeek-TUI/issues/6163)
- 状态：OPEN
- 重要性：GPUI Preview / Files 目前因缺失 HTTP API 而 fail closed。Issue 明确要求不要在桌面端另造文件存储，而应复用 workspace root 下的 Engine / runtime 能力。
- 社区反应：已有 2 条评论；这是 GPUI 文件浏览、预览和 artifact 展示的基础能力。

---

## 3. 重要 PR 进展

> 过去 24 小时内更新的 PR 共 4 条，因此本节列出全部重要 PR。

### 1. v0.9.14 slice run 2: lazy MCP, session recovery + picker UX, launch remedy row
- 链接：[#6175](https://github.com/Hmbown/DeepSeek-TUI/pull/6175)
- 状态：OPEN
- 作者：Hmbown
- 内容：v0.9.14 第二批 stacked slice，包含 9 个 issue slice 和 1 个 lint 修复。覆盖 lazy MCP、session recovery、picker UX、launch remedy row 等内容。
- 价值：这是当前主线维护工作的核心 PR，继续围绕稳定性和用户体验补齐 v0.9.14 里程碑。

### 2. feat(providers): add AICraft OpenAI-compatible provider template
- 链接：[#6171](https://github.com/Hmbown/DeepSeek-TUI/pull/6171)
- 状态：OPEN
- 作者：BX166
- 内容：新增 AICraft Provider 模板，采用 OpenAI-compatible provider descriptor-row 模式，包含默认 base URL 与 template id。
- 价值：扩展 Provider 生态，降低用户接入 AICraft API 的配置成本。
- 备注：health digest 建议优先批准该贡献门禁。

### 3. fix(weixin-bridge): make the Weixin bridge runnable and simplify its Quick Start
- 链接：[#6170](https://github.com/Hmbown/DeepSeek-TUI/pull/6170)
- 状态：OPEN
- 作者：VincentCorleone
- 内容：修复 Weixin bridge 文档与运行路径问题，补充实际启动方式，并处理首条微信消息相关问题。
- 价值：提升 Weixin 集成的可用性，减少用户按 README 操作却无法运行的情况。

### 4. v0.9.14: console-freeze, approval-death, compaction, and session-retention fixes
- 链接：[#6161](https://github.com/Hmbown/DeepSeek-TUI/pull/6161)
- 状态：CLOSED
- 作者：Hmbown
- 内容：修复 `/mcp` 在 running turn 中导致控制台冻结、unattended approval runs 因 idle-timeout 静默死亡、compaction retention 中 orphaned `tool_result` 缺口等问题。
- 价值：解决多个高影响稳定性问题，是 v0.9.14 可靠性修复的重要组成。

---

## 4. 功能需求趋势

### 1. GPUI / Desktop App-server API 补齐成为主线
相关 Issues：
- [#6183](https://github.com/Hmbown/DeepSeek-TUI/issues/6183) typed command catalog
- [#6182](https://github.com/Hmbown/DeepSeek-TUI/issues/6182) credential management
- [#6181](https://github.com/Hmbown/DeepSeek-TUI/issues/6181) session notice 与 background scheduling
- [#6177](https://github.com/Hmbown/DeepSeek-TUI/issues/6177) queue semantics routes
- [#6166](https://github.com/Hmbown/DeepSeek-TUI/issues/6166) jobs API
- [#6167](https://github.com/Hmbown/DeepSeek-TUI/issues/6167) workflows API
- [#6163](https://github.com/Hmbown/DeepSeek-TUI/issues/6163) artifacts / files API
- [#6168](https://github.com/Hmbown/DeepSeek-TUI/issues/6168) instructions API

趋势判断：项目正在从纯 TUI 形态向 Engine + GPUI 客户端架构演进。核心诉求是让桌面端复用 Engine 权威状态，而不是在 GPUI 内重复实现文件、队列、凭据、工作流或命令系统。

### 2. 终端稳定性与输入控制仍是高频痛点
相关 Issues：
- [#6169](https://github.com/Hmbown/DeepSeek-TUI/issues/6169) job-control handshake 缺失
- [#6165](https://github.com/Hmbown/DeepSeek-TUI/issues/6165) `$EDITOR` 与 TUI stdin 竞争
- [#6159](https://github.com/Hmbown/DeepSeek-TUI/issues/6159) `/mcp` 后控制台冻结，已关闭
- [#6160](https://github.com/Hmbown/DeepSeek-TUI/issues/6160) terminal byte contract

趋势判断：随着 TUI 功能变复杂，终端所有权、输入线程暂停、PTY / ConPTY、raw mode 恢复等底层能力成为稳定性关键。

### 3. Provider 与模型生态继续扩展
相关 Issues / PR：
- [#6173](https://github.com/Hmbown/DeepSeek-TUI/issues/6173) Gemini `/models` 报错
- [#6171](https://github.com/Hmbown/DeepSeek-TUI/pull/6171) AICraft Provider 模板
- [#6179](https://github.com/Hmbown/DeepSeek-TUI/issues/6179) Provider credential set / clear metadata

趋势判断：用户对多 Provider 支持、模型列表发现、凭据来源透明性有持续需求。Provider 接入不仅是新增 endpoint，还涉及安全、配置来源和 UI 可解释性。

### 4. 会话恢复、通知与后台任务管理需求增强
相关 Issues：
- [#6174](https://github.com/Hmbown/DeepSeek-TUI/issues/6174) ACP session load 不一致
- [#6180](https://github.com/Hmbown/DeepSeek-TUI/issues/6180) running-work accounting
- [#6181](https://github.com/Hmbown/DeepSeek-TUI/issues/6181) notice kinds into snapshots
- [#6162](https://github.com/Hmbown/DeepSeek-TUI/issues/6162) canceled runs 缺少 transcript receipt，已关闭

趋势判断：桌面端需要准确知道哪些任务仍在运行、哪些 session 可恢复、哪些通知应展示。状态投影和持久化语义正在成为架构重点。

### 5. 远程开发能力开始进入需求池
相关 Issue：
- [#6158](https://github.com/Hmbown/DeepSeek-TUI/issues/6158) SSH remote workspaces

趋势判断：社区希望桌面版支持通过 SSH 连接 Linux 远程工作区。这类能力如果落地，将使 DeepSeek TUI / GPUI 更接近 IDE 级工作流。

---

## 5. 开发者关注点

### 1. “不要在桌面端另造一套状态”是核心设计原则
多个 App-server Issue 明确提出：GPUI 不应自建文件存储、任务队列、job registry、workflow executor 或 credential store，而应通过 Engine / runtime API 访问权威状态。这说明维护者正在强调单一事实源，避免 TUI 与桌面端状态分叉。

### 2. TUI 输入与终端生命周期需要系统性治理
`/mcp` 冻结、`/hooks edit` 输入竞争、job-control 缺失、ConPTY 合约等问题显示，当前问题不只是单点 bug，而是 TUI 与终端、外部编辑器、子进程、后台进程组之间缺少统一握手机制。

### 3. GPUI 需要更完整的 Engine snapshot
通知类型、后台工作、队列、jobs、workflows、unread、instructions、files 都在要求进入 runtime API 或 snapshot surface。开发者关注的不是单个 UI 页面，而是桌面端能否可靠地观察和控制 Engine 状态。

### 4. Provider 可用性仍影响首次体验
Gemini `/models` 报错和 AICraft 模板新增表明，模型 Provider 的发现、配置、凭据管理、错误提示仍是社区活跃区域。尤其是桌面端首次配置 Provider，需要隐藏密钥值但展示 configured / source / writable 等元信息。

### 5. 会话 ID、transcript receipt、run settled 状态需要更严格一致性
ACP sessionId 前缀不一致、canceled run 无 transcript receipt 等问题都属于协议或状态投影不一致。对于多客户端和会话恢复场景，这类问题会直接影响可靠性。

### 6. 外部集成文档质量仍需补强
Weixin Bridge PR 说明集成组件不仅要能编译，还要“按文档可运行”。路径、环境变量、启动命令、首条消息处理等细节会明显影响采用率。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*