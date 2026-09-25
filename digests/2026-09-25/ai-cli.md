# AI CLI 工具社区动态日报 2026-09-25

> 生成时间: 2026-09-25 03:57 UTC | 覆盖工具: 9 个

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

# 2026-09-25 AI CLI 工具生态横向对比分析报告

## 1. 生态全景

当前 AI CLI 工具生态正在从“单一命令行问答/代码生成”快速演进为 **多端协同、Agent 执行、插件/MCP 扩展、托管运行时、桌面/网页工作台** 的复合型开发平台。  
过去 24 小时的社区动态显示，主流项目的共同矛盾已经从“模型能力接入”转向 **稳定性、权限边界、会话生命周期、工具调用一致性、上下文/成本治理和可观测性**。  
Claude Code、Codex、Qwen Code、Gemini CLI 等头部工具都在高频发布或推进核心架构改造；OpenCode、Pi、DeepSeek TUI 则表现出强烈的社区驱动和快速修复节奏。  
整体来看，AI CLI 正在进入“工程化深水区”：谁能更好地处理真实开发环境中的沙箱、权限、并发、审计和多端状态同步，谁就更可能成为开发者长期工作流的一部分。

---

## 2. 各工具活跃度对比

> 注：Issues / PR 数基于摘要中“过去 24 小时更新或重点列出”的数据；部分项目实际更新数可能高于表中热点数量。

| 工具 | Issues 活跃度 | PR 活跃度 | Release 情况 | 今日关键词 |
|---|---:|---:|---|---|
| **Claude Code** | 约 10+ 热点 Issues | 3 个 PR 更新 | 发布 **v2.1.282** | Desktop bridge、GitHub 集成、Linux TUI 回归、telemetry |
| **OpenAI Codex** | 10 个热点 Issues | 10 个重要 PR | 发布 **rust-v0.157.0**，多个 **0.158.0 alpha** | GPT-6、Bedrock、沙箱、MCP、多 Agent、桌面稳定性 |
| **Gemini CLI** | 5 个 Issues | 10 个重要 PR | 发布 **v0.62 nightly** | MCP OAuth、安全、并发文件写入、低延迟 Decision Gate |
| **GitHub Copilot CLI** | 6 个 Issues | 0 个 PR | 发布 **v1.0.89-2 / v1.0.89-3** | 扩展启动、企业自定义模型、插件安装、Windows 主题 |
| **Kimi Code CLI** | 0 | 0 | 无活动 | 暂无社区动态 |
| **OpenCode** | 10 个热点 Issues | 10 个重要 PR | 无新版本 | v2 兼容、MCP 生命周期、上下文压缩、TUI/Desktop |
| **Pi** | 29 条 Issues 更新 | 7 个 PR 更新 | 无新版本 | Provider 兼容、会话生命周期、工具协议、OTel 可观测性 |
| **Qwen Code** | 10 个热点 Issues | 10 个重要 PR | 发布 **v0.24.5 / Desktop v0.24.5 / TS SDK v0.1.15 / nightly** | Managed Runtime、Web Shell、安装权限、Runtime Broker |
| **DeepSeek TUI** | 10 个热点 Issues | 10 个重要 PR | 无新版本 | 子代理、Token 成本、配置治理、onboarding、Web Search |

---

## 3. 共同关注的功能方向

### 3.1 会话生命周期与多端状态同步

多个工具都在处理“会话如何创建、恢复、删除、锁定、跨端可见”的问题。

| 工具 | 具体诉求 |
|---|---|
| **Claude Code** | Desktop / Cowork bridge handshake 失败，设备显示离线；Desktop 与 CLI workspace trust 状态不一致 |
| **Codex** | 旧聊天未出现在侧边栏；VS Code + CLI 会话锁死，提示在其他 App 打开 |
| **OpenCode** | Windows 跨盘符 session 不可见；新增 `session prune`；多 server 共享 DB 恢复问题 |
| **Pi** | `session_shutdown` 卡死；abort 后 follow-up 滞留；session replacement 后扩展崩溃 |
| **Qwen Code** | Web Shell / Desktop 当前 session 无法删除；Live Voice 与普通任务 session 路由混淆 |
| **Copilot CLI** | SDK 扩展 `joinSession()` 在启动期间卡住 |

**判断：** 会话管理已经成为 AI CLI 平台化后的基础能力。未来工具需要提供类似 IDE 的稳定会话模型，而不是临时聊天窗口式管理。

---

### 3.2 MCP / 插件 / 工具调用可靠性

MCP 与插件生态正在成为 AI CLI 扩展能力的核心，但也带来权限、生命周期和协议一致性问题。

| 工具 | 具体诉求 |
|---|---|
| **Gemini CLI** | MCP OAuth `iss` 校验兼容性；MCP 安全边界 |
| **Codex** | MCP binding 复用、tool identity 匹配、工具声明与实际不可用不一致 |
| **Claude Code** | telemetry hooks、插件命名兼容、hooks timeout 后 stdout 不释放 |
| **OpenCode** | MCP session header 缺失、本地 MCP server 未释放、MCP approval 展示问题 |
| **Qwen Code** | MCP approval 空参数显示 `{}`；Managed Runtime v2 tool operations |
| **DeepSeek TUI** | MCP 与插件 Code Mode 的统一权限门控和类型绑定 |
| **Copilot CLI** | MCP 预注册 OAuth clients 遵循 `oauthScopes` |

**判断：** MCP 正在从“工具协议”演变为 AI CLI 的插件总线。其成熟度将直接决定第三方生态质量。

---

### 3.3 沙箱、安全与权限边界

AI Agent 可以执行命令、改文件、安装依赖后，安全边界成为高频关注点。

| 工具 | 具体诉求 |
|---|---|
| **Codex** | Linux bubblewrap / Docker nsfs / gVisor；Git 目录保护；PID namespace；Windows ACL |
| **Gemini CLI** | Windows git 参数校验绕过、checkpoint 路径穿越、sandbox shell 插值风险、扩展禁用失效 |
| **Claude Code** | Windows hooks timeout 后孤儿进程持有 stdout，tool call 无法释放 |
| **Qwen Code** | daemon shell guard、多根 workspace trusted folders、Runtime Broker 异常恢复 |
| **DeepSeek TUI** | 配置校验、API Key 不可见字符处理、测试污染真实用户目录 |
| **OpenCode** | MCP 权限请求展示、Code Mode 执行语义、v2 provider 配置兼容 |

**判断：** AI CLI 的安全问题不再局限于 prompt injection，而是扩展到文件系统、shell、OAuth、插件、沙箱、进程树和配置系统。

---

### 3.4 上下文压缩、Token 成本与 transcript 可观测性

长上下文模型普及后，社区开始强烈关注 token 成本和上下文完整性。

| 工具 | 具体诉求 |
|---|---|
| **Claude Code** | auto-compaction 后 assistant 文本从 transcript 丢失；usage widget token 统计混用 |
| **OpenCode** | context 百分比计算错误；compaction overflow；Plugin API 缺少 token usage |
| **Qwen Code** | 请求真正禁用 auto-compaction；`/context` 估算状态误导；dropped `@` references 可见化 |
| **DeepSeek TUI** | per-request telemetry、cost-based compaction、稳定工具列表；`deepseek-flash` 3.55B tokens 成本画像 |
| **Pi** | 工具集变化导致系统 prompt 位置变化并重新计费；OpenRouter session id 用于账单与追踪 |
| **Codex** | 全屏 transcript 默认启用；会话历史与搜索持久化问题 |

**判断：** transcript 和 token usage 正在从“辅助信息”变成开发者审计、成本控制和复现问题的核心材料。

---

### 3.5 桌面端 / Web Shell / TUI 成为主要入口

多个工具不再只是 CLI，而是在桌面端、Web Shell、VS Code、移动端之间形成多入口产品。

| 工具 | 具体诉求 |
|---|---|
| **Claude Code** | Desktop bridge、Cowork、Desktop trust、Desktop usage widget |
| **Codex** | Mac / Windows App 登录、模型选择器、内置浏览器、Renderer crash、历史侧边栏 |
| **Qwen Code** | Desktop v0.24.5、Web Shell session、Live Voice、新任务路由 |
| **OpenCode** | Desktop session picker、TUI context 显示、session 删除 |
| **Copilot CLI** | Windows 主题适配、语音听写识别 Changes inline comment editor |
| **DeepSeek TUI** | onboarding、footer 状态、模型选择器、Web Search |
| **Pi** | TUI 光标恢复、扩展 console 输出隔离、heredoc 高亮 |

**判断：** “CLI 工具”正在变成“开发工作台”。TUI/桌面/Web 体验的稳定性会越来越影响工具采用率。

---

## 4. 差异化定位分析

### Claude Code：Anthropic 生态下的云端协作型开发工具

**功能侧重：**
- Claude Desktop、Cowork、GitHub integration、telemetry、hooks、agent transcript。
- 重点是 CLI、Desktop、Cloud session 与 GitHub 仓库之间的连接。

**目标用户：**
- Claude 重度用户、团队开发者、依赖 Desktop / Cloud / GitHub 工作流的开发者。

**技术路线：**
- 强调 Desktop bridge、云端会话、项目级配置、插件 hooks 和遥测体系。
- 当前痛点集中在连接链路与多端状态同步。

---

### OpenAI Codex：多模型、多端、强沙箱的全栈 Agent 平台

**功能侧重：**
- GPT-6 Sol/Luna、Bedrock、Computer Use、MCP、多 Agent、沙箱、桌面 App。
- 既覆盖 CLI，也覆盖 VS Code、桌面、移动端和云端能力。

**目标用户：**
- OpenAI 生态用户、Pro/企业开发者、需要多 Agent / 沙箱 / IDE 集成的高级用户。

**技术路线：**
- Rust CLI + 桌面端 + server + sandbox + MCP 工具体系。
- PR 显示其重点在沙箱安全、MCP 性能、多 Agent 指标、套餐识别和容量错误透明化。

---

### Gemini CLI：安全优先、MCP 驱动、快速实验型 CLI

**功能侧重：**
- MCP OAuth、安全边界、并发文件工具、低延迟 Decision Gate、IDE companion。
- 当前最突出的主题是安全修复和核心交互稳定性。

**目标用户：**
- Google/Gemini 生态用户、安全敏感用户、希望使用 MCP 扩展 Gemini 能力的开发者。

**技术路线：**
- 快速 nightly 迭代。
- 安全 PR 密集，包括命令参数校验、路径穿越、sandbox shell 插值、扩展 enablement。
- 同时探索快慢路径分流，降低交互延迟。

---

### GitHub Copilot CLI：企业与 GitHub 工作流集成导向

**功能侧重：**
- GitHub/Copilot 生态、企业自定义模型、插件 marketplace、OAuth scopes、本地会话交互。
- 目前体量相对轻，但企业集成信号明显。

**目标用户：**
- GitHub Copilot 用户、企业 Copilot 管理员、希望接入 OpenAI-compatible provider 的团队。

**技术路线：**
- 与 GitHub 账号、Copilot 权限、插件安装、custom-agent 配置深度绑定。
- 当前短板在扩展生命周期、插件安装体验和跨平台终端细节。

---

### OpenCode：开源多 Provider Agent 工作台，强调 v2 插件与上下文治理

**功能侧重：**
- v2 配置、Plugin API、MCP、Code Mode、session 管理、上下文压缩。
- 支持自定义 provider、插件和桌面/TUI 体验。

**目标用户：**
- 开源工具爱好者、多模型用户、自定义 provider 用户、高度可配置需求用户。

**技术路线：**
- 快速推进 v2 架构，但配置兼容与文档一致性仍在磨合。
- 重点在 MCP 生命周期、上下文窗口、Code Mode JS 兼容性和 session 管理。

---

### Pi：Provider 兼容与扩展生态驱动的高活跃项目

**功能侧重：**
- 多 Provider、扩展 API、TUI、工具协议、OTel 可观测性、HTML 导出。
- 当前关注 Provider 流式兼容、工具结果完整性和生命周期边界。

**目标用户：**
- 多 Provider 高级用户、重度 TUI 用户、需要扩展和 telemetry 的开发者。

**技术路线：**
- 强调 provider compatibility 和扩展生态。
- 今日大量 Issue 被关闭，说明维护响应快，但也暴露了自动关闭机制和社区治理压力。

---

### Qwen Code：向企业托管运行时演进的多端 Agent 平台

**功能侧重：**
- Managed Runtime、Runtime Broker、Hosted Harness、Web Shell、Desktop、SDK。
- 同时关注安装打包、会话管理、IDE multi-root、上下文引用透明度。

**目标用户：**
- Qwen 生态用户、企业/托管运行时用户、Web Shell / Desktop 用户、SDK 集成方。

**技术路线：**
- 明显向受控执行环境和托管 worker 架构推进。
- Java SDK、TypeScript SDK、Desktop、CLI 多线发布，工程化复杂度较高。
- 当前关键风险是安装链路、Runtime Broker 异常恢复和 session state machine。

---

### DeepSeek TUI：长上下文、多代理和成本治理导向的 TUI 工具

**功能侧重：**
- 子代理、compaction、token efficiency、配置 schema、onboarding、Web Search。
- 特别关注大上下文模型下的成本和缓存命中。

**目标用户：**
- DeepSeek 模型用户、TUI 重度用户、长任务/多代理工作流用户、成本敏感开发者。

**技术路线：**
- 从功能扩展转向配置治理、成本优化和产品化体验。
- 数据化成本画像较突出，例如 `deepseek-flash` 占 94.8% 的 3.55B tokens。

---

### Kimi Code CLI：今日无可见动态

**功能侧重 / 成熟度判断：**
- 过去 24 小时无活动，难以从今日数据判断方向。
- 若用于技术选型，需要结合更长周期观察其发布频率、Issue 响应和生态扩展能力。

---

## 5. 社区热度与成熟度

### 5.1 今日最活跃梯队

| 梯队 | 工具 | 判断依据 |
|---|---|---|
| **高活跃 / 快速迭代** | Codex、Qwen Code、OpenCode、DeepSeek TUI、Pi | Issues/PR 密集，多个核心模块同时推进；Codex/Qwen 有正式发布；Pi 有 29 条 Issue 更新 |
| **高关注 / 稳定平台化** | Claude Code、Gemini CLI | 有 release 或 nightly；问题集中在核心链路、安全和稳定性；PR 数相对少但技术重要性高 |
| **中等活跃 / 企业化推进** | Copilot CLI | 有两个 patch release，Issue 数有限，无 PR 更新；关注企业模型和插件生态 |
| **低活跃** | Kimi Code CLI | 今日无活动 |

---

### 5.2 成熟度观察

**Claude Code、Codex、Qwen Code**  
已经明显进入多端平台阶段，问题多集中在 Desktop、Cloud、Web Shell、Runtime、GitHub integration、session bridge 等复杂系统边界。成熟度较高，但系统复杂度也最高。

**Gemini CLI**  
安全意识和维护响应突出，多个 P1 安全 PR 同时推进。当前更像是在快速补齐 Agent CLI 的安全与并发基础设施。

**OpenCode、DeepSeek TUI、Pi**  
社区活跃、修复节奏快，适合喜欢开源可控和多 Provider 的高级用户。但也更容易暴露配置兼容、生命周期、文档与实现不一致等快速演进期问题。

**Copilot CLI**  
生态入口强，企业潜力明显，但今日 PR 活跃度低。其竞争力更多来自 GitHub/Copilot 既有生态，而非社区贡献速度。

---

## 6. 值得关注的趋势信号

### 趋势 1：AI CLI 正在从“命令行工具”变成“Agent Runtime”

今天多个项目都在处理 Runtime Broker、Managed Runtime、background server、multi-agent spawn、sub-agent budget、tool operations、session lifecycle。  
这说明 AI CLI 的核心能力不再是调用模型，而是 **调度模型、工具、沙箱、文件系统、会话和多 Agent 的运行时系统**。

**开发者参考：**
- 选型时应关注工具的运行时可靠性，而不只是模型支持列表。
- 对长任务、自动化、CI/CD 场景，应优先考察 crash recovery、tool result 完整性和 session resume 能力。

---

### 趋势 2：MCP 正在成为事实上的 Agent 插件协议

Claude Code、Codex、Gemini CLI、OpenCode、Qwen Code、Copilot CLI、DeepSeek TUI 都在不同程度上处理 MCP、OAuth、tool identity、approval、session header、permissions。  
MCP 生态越丰富，工具越需要解决协议兼容、安全边界和生命周期管理。

**开发者参考：**
- 构建内部工具时，可以优先考虑 MCP 兼容接口。
- 企业落地时应重点审查 MCP OAuth、scope、tool approval 和日志审计能力。

---

### 趋势 3：沙箱与权限是企业采用的关键门槛

Codex 和 Gemini CLI 的安全修复尤其密集；Qwen、Claude、OpenCode 也都暴露了 shell、hooks、workspace trust、daemon guard 等问题。  
当 AI Agent 拥有写文件、执行 shell、安装依赖、调用浏览器的能力后，权限模型会成为选型核心。

**开发者参考：**
- 不建议在无沙箱、无权限审计的情况下让 Agent 直接操作生产仓库。
- 应优先选择支持 workspace trust、命令审批、沙箱隔离、日志追踪的工具。

---

### 趋势 4：上下文与 Token 成本治理成为刚需

DeepSeek TUI 的 token audit、OpenCode 的 context 百分比、Claude 的 transcript 丢失、Qwen 的 auto-compaction 配置都说明：  
长上下文时代，开发者开始关注 **哪些内容进入上下文、何时压缩、压缩是否丢信息、成本是否可解释**。

**开发者参考：**
- 对大型代码库，应选择能展示 token usage、context pressure、compaction 行为和 transcript 完整性的工具。
- 对审计和复现要求高的团队，应避免使用 transcript 不完整或上下文压缩不可控的工具链。

---

### 趋势 5：多端一致性正在成为新的竞争点

Claude Desktop bridge、Codex Desktop model picker、Qwen Web Shell session、OpenCode Desktop picker、Copilot Windows 主题问题都指向同一件事：  
开发者希望 CLI、Desktop、Web、IDE、Cloud 之间状态一致、权限一致、模型一致、历史一致。

**开发者参考：**
- 如果团队依赖跨设备或远程任务，需重点测试多端 session 同步、模型可见性和权限状态。
- 单机 CLI 可用不代表桌面端和云端协作路径稳定。

---

### 趋势 6：可观测性从“加分项”变成“基础设施”

Pi 引入 OTLP exporter，Claude 增加 telemetry ignored vars 提示，Codex 增加 multi-agent spawn 指标，Qwen 增强 dropped reference 和 clipboard 错误提示，DeepSeek TUI 推进 per-request usage telemetry。  
AI Agent 的失败模式复杂，开发者需要的不只是错误码，而是可追踪、可审计、可复现的执行链路。

**开发者参考：**
- 企业内部落地时应优先考虑支持 OpenTelemetry、transcript 导出、tool log、usage metric 的工具。
- 对自动化 Agent，应记录每次 tool call、上下文输入、模型响应、权限审批和失败原因。

---

## 结论

今日 AI CLI 生态呈现出明显的三条主线：

1. **平台化**：Claude Code、Codex、Qwen Code 正在从 CLI 扩展为桌面、Web、云端、托管运行时一体化平台。  
2. **工程化**：Gemini CLI、Codex、Qwen Code、OpenCode 等项目集中修复沙箱、安全、并发、session、tool call 等真实工程问题。  
3. **可治理化**：DeepSeek TUI、OpenCode、Pi、Claude Code 等工具开始重视 token 成本、transcript 完整性、telemetry、配置 schema 和审计能力。

对技术决策者而言，AI CLI 选型不应只看“支持哪个模型”，而应重点评估：

- 会话和多端状态是否稳定；
- 工具调用和 MCP 生态是否可靠；
- 沙箱与权限模型是否足够安全；
- 上下文压缩和 token 成本是否可控；
- 是否具备可观测性、审计和错误诊断能力；
- 社区是否活跃，回归修复是否及时。

短期内最值得关注的项目动态包括：  
**Claude Code 的 Desktop bridge / GitHub integration 修复、Codex 的沙箱与 MCP 体系、Gemini CLI 的安全 PR 合入、Qwen Code 的 Managed Runtime、OpenCode v2 兼容性、DeepSeek TUI 的 token 成本治理，以及 Pi 的 Provider 兼容和 OTel 可观测性。**

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告  
数据截止：2026-09-25  
数据来源：`github.com/anthropics/skills` Issues / Pull Requests  
说明：PR 列表虽标注“按评论数排序”，但评论数字段为 `undefined`，因此以下以排序位置、更新时间、Issue 关联度和主题热度综合判断社区关注度。

---

## 1. 热门 Skills 排行

### 1. `skill-creator` 修复与评估隔离
- PR：[#1298](https://github.com/anthropics/skills/pull/1298)  
- 状态：OPEN  
- 功能：修复 `skill-creator` 的触发评估问题，包括并发 worker 命令探测冲突、Windows 管道 `select()` 失败、运行时异常被误判为非触发等问题。  
- 社区讨论热点：  
  - Skill 触发评估准确性  
  - Windows 兼容性  
  - 负样例误判与评估可信度  
- 关联 Issue：[#556](https://github.com/anthropics/skills/issues/556) 提到 `run_eval.py` 中 skills/commands 触发率为 0%。  
- 关注原因：这是 Skills 生态的“元能力”问题，直接影响所有 Skill 的创建、测试与质量验证。

---

### 2. `proofcore-contract-auditor` 智能合约审计
- PR：[#1771](https://github.com/anthropics/skills/pull/1771)  
- 状态：OPEN  
- 功能：新增 Web3 智能合约审计 Skill，支持 Solidity 与 Rust 合约静态分析，并将加密审计证明锚定到 TON Blockchain。  
- 社区讨论热点：  
  - 智能合约安全审计  
  - Web3 开发者工作流  
  - 审计证明、链上存证与可验证性  
- 关注原因：安全审计类 Skill 具备高价值场景，且 Web3/合约安全是天然适合 Agent 自动化辅助的领域。

---

### 3. `mcp-builder` MCP 2.x 兼容修复
- PR：[#1742](https://github.com/anthropics/skills/pull/1742)  
- 状态：OPEN  
- 功能：修复 `mcp-builder` 对 `mcp>=2.0.0` 的兼容问题，包括 `streamablehttp_client` 改名为 `streamable_http_client`，以及自定义 HTTP headers 的新配置方式。  
- 社区讨论热点：  
  - MCP 2.x API 变更兼容  
  - 自定义 headers 支持  
  - MCP server 连接与评估稳定性  
- 关联 Issue：[#1668](https://github.com/anthropics/skills/issues/1668)、[#1390](https://github.com/anthropics/skills/issues/1390)  
- 关注原因：MCP 是 Claude Code 生态的重要扩展层，`mcp-builder` 的稳定性直接影响工具接入和 Agent 工程化。

---

### 4. `md2video-audio` Markdown 转视频与语音
- PR：[#1703](https://github.com/anthropics/skills/pull/1703)  
- 状态：OPEN  
- 功能：将 Markdown 文档转换为带有类真人配音的专业 MP4 视频，基于 Marp 生成幻灯片，并整合音频生成流程。  
- 社区讨论热点：  
  - 文档到视频的自动化内容生产  
  - 零成本视频生成  
  - 教程、汇报、课程材料自动生成  
- 关注原因：代表 Skills 从代码辅助扩展到内容创作自动化，是高频办公与教育场景。

---

### 5. `pyxel` 复古游戏开发
- PR：[#525](https://github.com/anthropics/skills/pull/525)  
- 状态：OPEN  
- 功能：新增 Pyxel Skill，用于 Python 复古游戏的创建、调试、验证，包括无头运行、输入驱动测试、帧检查与状态验证。  
- 社区讨论热点：  
  - 游戏开发辅助  
  - 可视化输出验证  
  - Headless 测试与状态检查  
- 关注原因：该 PR 创建较早但持续更新到 2026-09-22，显示长期关注和维护潜力。

---

### 6. `AWT` AI-powered E2E 测试
- PR：[#822](https://github.com/anthropics/skills/pull/822)  
- 状态：OPEN  
- 功能：引入 AWT，即 AI Watch Tester，为 Claude 提供视觉与浏览器控制能力，用于自动生成和执行端到端测试。  
- 社区讨论热点：  
  - 零代码 E2E 测试生成  
  - 浏览器自动化  
  - AI 视觉辅助测试  
- 关注原因：测试自动化是 Claude Code 用户的核心刚需之一，该 Skill 覆盖前端与产品质量验证场景。

---

### 7. `docx` 文档处理修复集合
- PR：[#1792](https://github.com/anthropics/skills/pull/1792)、[#1790](https://github.com/anthropics/skills/pull/1790)、[#1734](https://github.com/anthropics/skills/pull/1734)、[#541](https://github.com/anthropics/skills/pull/541)  
- 状态：OPEN  
- 功能：围绕 DOCX 文档处理修复多个问题，包括：
  - LibreOffice 超时应报告错误并验证输出  
  - 缺失 `document.xml.rels` 时自动创建  
  - 检测孤立 DOCX comments  
  - 避免 tracked changes 与 bookmarks 的 `w:id` 冲突  
- 社区讨论热点：  
  - Word 文档可靠性  
  - OOXML 结构正确性  
  - 批注、修订、书签等复杂文档元素处理  
- 关注原因：文档类 Skills 是官方仓库中的高频基础能力，社区对稳定性和文件不损坏的要求很高。

---

### 8. `testing-patterns` 测试模式 Skill
- PR：[#723](https://github.com/anthropics/skills/pull/723)  
- 状态：OPEN  
- 功能：新增覆盖完整测试栈的 Skill，包括测试哲学、Testing Trophy、单元测试、React 组件测试、命名规范、边界情况等。  
- 社区讨论热点：  
  - 测试最佳实践  
  - 前端组件测试  
  - 单元测试与集成测试的边界  
- 关注原因：与 AWT 一起反映社区对“自动测试生成 + 测试质量指导”的持续需求。

---

## 2. 社区需求趋势

### 趋势一：Skills 安全、命名空间与信任边界
- Issue：[#492](https://github.com/anthropics/skills/issues/492)  
- 核心诉求：社区 Skill 不应以 `anthropic/` 命名空间分发，避免用户误以为是官方 Skill，从而授予过高权限。  
- 方向判断：社区非常关注 Skill Marketplace 的信任模型、权限边界和官方/第三方身份区分。

---

### 趋势二：组织级共享与企业分发
- Issue：[#228](https://github.com/anthropics/skills/issues/228)  
- 核心诉求：希望 Claude.ai 支持组织内 Skill 共享，避免通过 Slack/Teams 手动传 `.skill` 文件。  
- 方向判断：Skills 正从个人效率工具走向团队资产，需要企业级分发、权限管理和共享库。

---

### 趋势三：Skill 创建、验证与质量评估
- Issue：[#556](https://github.com/anthropics/skills/issues/556)、[#202](https://github.com/anthropics/skills/issues/202)  
- PR：[#1298](https://github.com/anthropics/skills/pull/1298)、[#83](https://github.com/anthropics/skills/pull/83)、[#539](https://github.com/anthropics/skills/pull/539)  
- 核心诉求：  
  - Skill 触发评估要准确  
  - `skill-creator` 应更符合最佳实践  
  - 需要自动化质量、安全分析 Skill  
- 方向判断：社区正在从“写 Skill”转向“系统性验证 Skill 是否可靠”。

---

### 趋势四：MCP 集成与工具协议化
- Issue：[#16](https://github.com/anthropics/skills/issues/16)、[#1390](https://github.com/anthropics/skills/issues/1390)  
- PR：[#1742](https://github.com/anthropics/skills/pull/1742)  
- 核心诉求：  
  - 将 Skills 暴露为 MCP  
  - 修复 MCP server 评估问题  
  - 兼容 MCP 2.x  
- 方向判断：社区希望 Skill 不只是提示词包，而是能与 MCP 工具生态互操作的标准化 Agent 能力单元。

---

### 趋势五：测试自动化与质量门禁
- Issue：[#1385](https://github.com/anthropics/skills/issues/1385)  
- PR：[#822](https://github.com/anthropics/skills/pull/822)、[#723](https://github.com/anthropics/skills/pull/723)  
- 核心诉求：  
  - 自动生成 E2E 测试  
  - 引入测试模式与最佳实践  
  - 加入推理质量门禁、对抗审查和交付验证  
- 方向判断：开发者希望 Claude Code 不只是写代码，还能系统性验证代码和输出质量。

---

### 趋势六：文档处理与办公自动化
- Issue：[#189](https://github.com/anthropics/skills/issues/189)、[#1487](https://github.com/anthropics/skills/issues/1487)、[#1175](https://github.com/anthropics/skills/issues/1175)  
- PR：[#514](https://github.com/anthropics/skills/pull/514)、[#486](https://github.com/anthropics/skills/pull/486)、[#1792](https://github.com/anthropics/skills/pull/1792)  
- 核心诉求：  
  - DOCX、PDF、ODT 等文档格式稳定处理  
  - 文档排版质量控制  
  - SharePoint / 企业文档的安全与上下文窗口控制  
- 方向判断：文档类 Skill 是最接近企业落地的方向，但稳定性、安全性和 token 控制仍是痛点。

---

### 趋势七：Agent 记忆、治理与安全工作流
- Issue：[#1329](https://github.com/anthropics/skills/issues/1329)、[#412](https://github.com/anthropics/skills/issues/412)  
- 核心诉求：  
  - 使用 compact-memory 降低长任务中的上下文占用  
  - 为 AI Agent 系统提供治理、安全模式、审计轨迹和策略执行  
- 方向判断：社区开始关注长程 Agent 的状态管理、安全治理和可审计性。

---

## 3. 高潜力待合并 Skills

### 1. `mcp-builder` 兼容修复
- PR：[#1742](https://github.com/anthropics/skills/pull/1742)  
- 状态：OPEN  
- 潜力判断：修复明确、关联 Issue 清晰、属于已有核心 Skill 的兼容性补丁，合并优先级可能较高。

---

### 2. `docx` LibreOffice 超时与输出验证修复
- PR：[#1792](https://github.com/anthropics/skills/pull/1792)  
- 状态：OPEN  
- 潜力判断：修复具体且影响文档可靠性，更新至数据截止当天，显示维护活跃。

---

### 3. `docx` comment relationships 修复
- PR：[#1790](https://github.com/anthropics/skills/pull/1790)  
- 状态：OPEN  
- 潜力判断：解决缺失 `document.xml.rels` 导致 comment 功能异常的问题，属于低风险、高确定性的缺陷修复。

---

### 4. `AWT` AI E2E 测试 Skill
- PR：[#822](https://github.com/anthropics/skills/pull/822)  
- 状态：OPEN  
- 潜力判断：测试自动化需求强，且与 Claude Code 浏览器/视觉能力结合紧密，具备成为高价值开发工作流 Skill 的潜力。

---

### 5. `testing-patterns` 测试最佳实践 Skill
- PR：[#723](https://github.com/anthropics/skills/pull/723)  
- 状态：OPEN  
- 潜力判断：覆盖通用开发测试场景，可与 AWT 形成互补：一个负责执行自动化测试，一个负责测试策略和代码质量。

---

### 6. `pyxel` 复古游戏开发 Skill
- PR：[#525](https://github.com/anthropics/skills/pull/525)  
- 状态：OPEN  
- 潜力判断：长期维护且更新活跃，具备清晰验证流程，包括 headless 运行和帧级检查，适合展示 Claude Code 在可视化编程中的能力。

---

### 7. `md2video-audio` Markdown 转视频 Skill
- PR：[#1703](https://github.com/anthropics/skills/pull/1703)  
- 状态：OPEN  
- 潜力判断：面向内容生产自动化，应用场景广，适合课程、汇报、教程和产品说明视频生成。

---

### 8. `blast-radius` 批量/破坏性操作风险检查
- PR：[#1776](https://github.com/anthropics/skills/pull/1776)  
- 状态：OPEN  
- 潜力判断：聚焦大规模删除、批量邮件、权限撤销等高风险操作前的检查清单，契合 Agent 安全与防事故需求。

---

## 4. Skills 生态洞察

当前 Claude Code Skills 社区最集中的诉求是：**让 Skills 从“可用的提示词包”升级为“可信、可验证、可共享、可集成 MCP、并能稳定支撑企业级工作流的 Agent 能力模块”。**

---

# Claude Code 社区动态日报  
**日期：2026-09-25**  
**数据源：github.com/anthropics/claude-code**

---

## 1. 今日速览

过去 24 小时，Claude Code 发布了 **v2.1.282**，主要改进终端宽屏阅读体验，并增强对项目设置中被忽略 telemetry 变量的可见性。  
社区反馈的重点集中在 **Desktop / Cowork 设备桥连接异常、GitHub 集成重连失败、Windows 与 macOS 桌面端稳定性、TUI 输入冻结** 等问题上，其中 Windows / macOS 的 bridge handshake 相关问题讨论最活跃。  
PR 方面主要围绕 **telemetry hooks、插件命名兼容、测试插件事件流** 展开，显示 Claude Code 插件与遥测机制仍在快速收敛。

---

## 2. 版本发布

### v2.1.282  
链接：<https://github.com/anthropics/claude-code/releases/tag/v2.1.282>

本次版本更新较小，但对终端使用体验和诊断透明度有直接影响：

- 新增 `maxProseWidth` 设置  
  - 可限制 Claude 在宽终端中的普通文本宽度。
  - 表格和代码块仍保持完整终端宽度。
  - 对经常在超宽屏终端中阅读长回答的开发者较有价值。

- 新增 telemetry 相关提示  
  - 启动提示、`/status`、`claude doctor` 会列出项目设置文件中被忽略的 telemetry 变量。
  - 有助于排查 telemetry 配置未生效、团队策略覆盖或本地设置冲突等问题。

值得注意的是，v2.1.282 发布后出现了与 TUI 输入冻结相关的回归报告，需关注后续 patch。

---

## 3. 社区热点 Issues

### 1. Windows Desktop bridge handshake 长时间无响应  
Issue：[#96911](https://github.com/anthropics/claude-code/issues/96911)  
状态：OPEN  
标签：`bug`, `platform:windows`, `area:cowork`, `area:desktop`  
评论数：10

该问题是今日讨论最热的 bug。用户报告 Windows Desktop 打开 WebSocket 后发送 connect frame，但长达约 18 分钟无法收到 `authenticated` 响应，最终 handshake timeout。问题在重启和应用更新后仍存在，随后又自行恢复。

重要性在于它影响 **Cowork / Desktop bridge 的基础连接能力**，可能导致云端会话、远程任务、设备联动不可用。虽然目前看起来可能与后端 bridge 或客户端状态机有关，但社区关注度较高。

---

### 2. Windows Desktop 设备显示 “Asleep or app closed”  
Issue：[#96918](https://github.com/anthropics/claude-code/issues/96918)  
状态：OPEN  
标签：`bug`, `platform:windows`, `area:desktop`, `area:routines`  
评论数：8

用户报告已链接电脑一直显示为 “Asleep or app closed”，云会话和计划任务失败，错误为 “not connected to the bridge”。重启、重新登录、移除设备、更新应用均无法解决。

该问题与 #96911 高度相关，指向 **Windows Desktop 与 bridge 服务之间的连接/认证链路问题**。对依赖云任务、scheduled tasks、远程 cowork 的用户影响较大。

---

### 3. v2.1.282 Linux TUI 输入框停止接收键盘输入  
Issue：[#96931](https://github.com/anthropics/claude-code/issues/96931)  
状态：OPEN  
标签：`bug`, `has repro`, `platform:linux`, `area:tui`  
评论数：3

用户报告升级到 v2.1.282 后，交互式会话在 0–90 秒内停止接收键盘输入，通常约 30 秒复现。进程仍存活，但界面不再响应，`Ctrl-C` 也无效；v2.1.281 正常。

这是一个明显的 **版本回归风险**，且带有复现信息。由于 TUI 是 Claude Code 的核心入口之一，该问题值得优先关注，尤其是 Linux 用户可考虑暂时保留在 v2.1.281。

---

### 4. macOS Desktop worktree 信任状态死锁  
Issue：[#96928](https://github.com/anthropics/claude-code/issues/96928)  
状态：OPEN  
标签：`bug`, `has repro`, `platform:macos`, `area:desktop`  
评论数：1

用户报告在已信任 repo 的 git worktree 中启动 Desktop session 时，界面永久卡在 “workspace isn't trusted”，但信任弹窗从不出现，“Try again” 也无法成功。

该问题暴露了 **CLI 与 Desktop 对 trusted workspace 定义不一致** 的问题。随着开发者越来越频繁使用 git worktree、多分支并行开发，这类信任状态同步问题会直接影响 Desktop Code tab 的可用性。

---

### 5. macOS Cowork bridge 更新后握手失败  
Issue：[#96919](https://github.com/anthropics/claude-code/issues/96919)  
状态：OPEN  
标签：`bug`, `platform:macos`, `area:cowork`, `regression`  
评论数：1

用户报告升级到 Desktop 2.9939.2 后，macOS Cowork device bridge 每次打开 WebSocket 后都无法完成 device handshake。

该问题与 Windows 上的 bridge 报告形成呼应，显示 bridge handshake 可能不是单一平台问题。由于标记为 regression，后续是否回滚或热修值得关注。

---

### 6. GitHub integration 大量重连失败  
Issue：[#96960](https://github.com/anthropics/claude-code/issues/96960)  
状态：OPEN  
标签：`bug`, `platform:web`, `github-integration`  
评论数：0

过去 24 小时出现大量 GitHub integration 相关报告，包括无法 reconnect Claude GitHub App、私有仓库不可见、连接页面跳转异常等。#96960 是较完整的报告之一，包含截图。

该类问题影响 Claude Code Web / Cloud 与 GitHub 仓库的连接能力，尤其会阻塞 cloud agent、repo 级任务和自动化工作流。类似报告还包括 #96961、#96957、#96955、#96952、#96951、#96948、#96946、#96944、#96938。

---

### 7. Windows Background Agent 输出文件为空  
Issue：[#96956](https://github.com/anthropics/claude-code/issues/96956)  
状态：OPEN  
标签：`bug`, `platform:windows`, `area:agents`  
评论数：0

用户报告 Windows 11 Home 且未开启 Developer Mode 时，Background Agent 的 `.output` 文件为 0 字节，但启动结果仍称该文件是 “full subagent JSONL transcript”。

该问题影响 **后台 agent 可观测性与调试体验**。如果 transcript 缺失，开发者无法审计 agent 执行过程，也难以定位失败原因。

---

### 8. 自动压缩后 tool call 前的 assistant 文本从 transcript 丢失  
Issue：[#96950](https://github.com/anthropics/claude-code/issues/96950)  
状态：OPEN  
标签：`bug`, `platform:windows`, `area:core`  
评论数：0

用户报告自动 context compaction 后，assistant 在 tool call 前输出的文本会从 transcript 中丢失。

这是核心层面的记录一致性问题。对于依赖 transcript 做审计、复现、调试、agent replay 的开发者来说，消息丢失会破坏上下文完整性，也可能影响后续模型行为。

---

### 9. Windows hooks 超时后 orphaned descendant 持有 stdout，tool call 不释放  
Issue：[#96945](https://github.com/anthropics/claude-code/issues/96945)  
状态：OPEN  
标签：`bug`, `has repro`, `platform:windows`, `area:hooks`  
评论数：0

用户报告 hook 超时后 Claude Code 尝试 kill 进程树，但如果孤儿子进程仍持有 hook 的 stdout，tool call 不会被释放。

这是典型的 Windows 进程管理与管道资源释放问题。对使用 hooks 执行 lint、test、build、security scan 的团队来说，可能导致 Claude Code 卡住或无法继续执行。

---

### 10. Desktop usage widget token 单位混用  
Issue：[#96940](https://github.com/anthropics/claude-code/issues/96940)  
状态：OPEN  
标签：`bug`, `has repro`, `platform:macos`, `area:cost`, `area:desktop`  
评论数：0

用户指出 Desktop usage widget 在合并 `stats-cache.json` 与实时 transcript 统计时，对 cached days 和 live days 使用了不同 token 定义，导致部分模型在 Models tab 中消失。

该问题影响成本统计与模型使用分析。对于团队预算、模型成本追踪、用量归因而言，usage UI 的准确性非常关键。

---

## 4. 重要 PR 进展

> 过去 24 小时内仅有 3 个 PR 更新，因此本节列出全部重要 PR；未强行补足 10 个。

### 1. diff 插件 focus hook 兼容不同注册名  
PR：[#96953](https://github.com/anthropics/claude-code/pull/96953)  
状态：OPEN  
作者：poteat

该 PR 修复 diff 插件中 `ui.focus` hook 对元素来源名称匹配过窄的问题。此前 hook 只识别插件自身常量名 `diff`，但某些构建会将插件注册为 `cc-plugin-diff`，导致 focus hook 无法正确响应。

意义：

- 提升插件在不同构建/注册名下的兼容性。
- 降低 UI hook 因命名不一致失效的概率。
- 对插件体系稳定性有直接帮助。

---

### 2. telemetry / agents-md 测试插件显式调用 collector stream  
PR：[#96930](https://github.com/anthropics/claude-code/pull/96930)  
状态：CLOSED  
作者：poteat

该 PR 仅修改测试，不改变 `hooks/` 下实现。测试插件现在通过名称调用 collector stream，例如监听 `telemetry.log` 时指定 `{ to: 'collector' }`。

意义：

- 强化 telemetry 插件权限边界测试。
- 明确第三方插件只能接触允许的 collector stream。
- 通过事件模拟替代真实 telemetry 行为，降低测试耦合。

---

### 3. telemetry log / mark 改为 hooks 事件实现  
PR：[#96917](https://github.com/anthropics/claude-code/pull/96917)  
状态：CLOSED  
作者：poteat

该 PR 调整 telemetry 模块设计：`$.telemetry.log` 与 `$.telemetry.mark` 的行为从原先 noun 方法实现，迁移为 `telemetry.log` 和 `telemetry.mark` 两个事件 hook。

意义：

- 让 telemetry 行为更符合插件 engine 的事件化架构。
- 在 gate 下检查 entry、入队 row 并返回 `{ value }`。
- 可能为后续 telemetry 权限控制、插件隔离和事件审计打基础。

---

## 5. 功能需求趋势

### 1. TUI 可读性与交互体验增强  
相关 Issue：  
- [#96962](https://github.com/anthropics/claude-code/issues/96962)  
- [#96958](https://github.com/anthropics/claude-code/issues/96958)

社区希望 TUI 在 “极简折叠” 与 “完整 verbose” 之间增加中间显示层级，例如展示 tool command 和前 N 行输出。同时也有人希望终端输入框支持类似 Desktop 的拼写检查红线。

趋势判断：  
Claude Code 的 TUI 已经不仅是命令入口，而是开发者长时间工作的主界面。用户开始要求更细粒度的信息密度控制和编辑体验。

---

### 2. Desktop 与本地开发环境深度集成  
相关 Issue：  
- [#96959](https://github.com/anthropics/claude-code/issues/96959)  
- [#96928](https://github.com/anthropics/claude-code/issues/96928)  
- [#96954](https://github.com/anthropics/claude-code/issues/96954)

用户希望 Desktop Terminal panel 能暴露所属 Code session id，便于脚本或工具判断当前 shell 属于哪个 Claude Code session。与此同时，workspace trust、Auto / Manual mode UI 提示等问题也显示 Desktop 与 CLI 状态同步仍有改进空间。

趋势判断：  
Claude Desktop Code tab 正在从辅助界面变为开发工作台，用户需要更可靠的 session 标识、权限状态与 workspace 状态同步。

---

### 3. GitHub 集成可靠性成为高频痛点  
相关 Issue：  
- [#96961](https://github.com/anthropics/claude-code/issues/96961)  
- [#96960](https://github.com/anthropics/claude-code/issues/96960)  
- [#96957](https://github.com/anthropics/claude-code/issues/96957)  
- [#96955](https://github.com/anthropics/claude-code/issues/96955)  
- [#96946](https://github.com/anthropics/claude-code/issues/96946)

当天大量报告集中在 Claude GitHub App reconnect、仓库不可见、私有 repo 权限缺失、跳转后仍无法连接等问题。

趋势判断：  
随着 Claude Code Web / Cloud 功能使用增加，GitHub 集成已经成为关键路径。连接失败会直接阻断仓库上下文、cloud credits、远程任务和自动化 agent。

---

### 4. Agent 与 transcript 可观测性  
相关 Issue：  
- [#96956](https://github.com/anthropics/claude-code/issues/96956)  
- [#96950](https://github.com/anthropics/claude-code/issues/96950)  
- [#96947](https://github.com/anthropics/claude-code/issues/96947)

用户持续关注 agent 执行记录、transcript 完整性、thinking / visible reply / tool_use 的一致性。Windows 上 Background Agent 输出为空、auto-compaction 后 assistant 文本丢失等问题都指向同一类需求：可复现、可审计、可调试。

趋势判断：  
当 Claude Code 被用于复杂自动化任务后，transcript 不再只是聊天记录，而是执行日志和审计材料。记录一致性会越来越重要。

---

### 5. 权限与安全模式精细化  
相关 Issue：  
- [#96943](https://github.com/anthropics/claude-code/issues/96943)  
- [#96949](https://github.com/anthropics/claude-code/issues/96949)

用户希望 Auto mode 的 allow 配置能稳定生效，也希望有一种安全机制，让 Claude 可以在用户预授权范围内登录开发/测试账号，但模型本身不可见凭据。

趋势判断：  
社区开始要求更细粒度、更可控的 agent 权限模型，尤其是在生产部署、测试账号、模拟器、原生 App QA 等场景。

---

## 6. 开发者关注点

### 1. Bridge / Cowork 连接稳定性是今日最大痛点  
Windows 和 macOS 都出现 device bridge handshake 失败、设备显示离线、cloud session 无法连接的问题。此类问题直接影响 Claude Desktop 与云端协作能力，优先级较高。

代表 Issue：  
- [#96911](https://github.com/anthropics/claude-code/issues/96911)  
- [#96918](https://github.com/anthropics/claude-code/issues/96918)  
- [#96919](https://github.com/anthropics/claude-code/issues/96919)

---

### 2. v2.1.282 可能引入 Linux TUI 回归  
新版本发布后很快出现输入框冻结报告，且 v2.1.281 正常。Linux TUI 用户应关注官方回应或后续 patch。

代表 Issue：  
- [#96931](https://github.com/anthropics/claude-code/issues/96931)

---

### 3. GitHub integration 报告数量异常集中  
多名用户遇到 reconnect GitHub App 失败、私有仓库不可见、连接后无效等问题。虽然单个 Issue 评论数不高，但数量密集，说明可能是系统性或流程性问题。

代表 Issue：  
- [#96960](https://github.com/anthropics/claude-code/issues/96960)  
- [#96961](https://github.com/anthropics/claude-code/issues/96961)  
- [#96955](https://github.com/anthropics/claude-code/issues/96955)

---

### 4. Windows 平台仍有较多边缘稳定性问题  
Windows 相关问题覆盖 Desktop bridge、background agent、hooks timeout、update deadlock、auto mode classifier、transcript 记录等多个模块。

代表 Issue：  
- [#96956](https://github.com/anthropics/claude-code/issues/96956)  
- [#96945](https://github.com/anthropics/claude-code/issues/96945)  
- [#96942](https://github.com/anthropics/claude-code/issues/96942)  
- [#96943](https://github.com/anthropics/claude-code/issues/96943)

---

### 5. 开发者越来越重视审计、成本和状态透明度  
无论是 telemetry 配置提示、usage widget 统计、transcript 丢失，还是 session id 暴露请求，都说明用户正在把 Claude Code 用于更正式的工程流程，需要更强的透明度和可追踪性。

代表 Issue / PR：  
- [#96940](https://github.com/anthropics/claude-code/issues/96940)  
- [#96950](https://github.com/anthropics/claude-code/issues/96950)  
- [#96959](https://github.com/anthropics/claude-code/issues/96959)  
- [#96917](https://github.com/anthropics/claude-code/pull/96917)

---

## 总结

2026-09-25 的 Claude Code 社区动态呈现出两个主线：一是 **v2.1.282 发布后终端体验和 telemetry 诊断继续改进**，二是 **Desktop / Cowork / GitHub integration 等连接型能力出现集中反馈**。  
短期内建议开发者重点关注 v2.1.282 在 Linux TUI 上的稳定性，以及 GitHub App reconnect 和 Desktop bridge handshake 的后续修复进展。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报  
**日期：2026-09-25**  
**项目：github.com/openai/codex**

---

## 1. 今日速览

过去 24 小时 Codex 发布了 **rust-v0.157.0** 及多组 **0.158.0 alpha** 预发布版本，重点包括 GPT-6 Sol/Luna、Amazon Bedrock 支持、全屏 transcript 默认启用、后台 server 自动启动等能力。  
社区反馈集中在 **桌面 App 稳定性、Windows/macOS/Linux 沙箱与 Computer Use、模型选择器、会话/历史记录一致性、速率限制与账号权限** 等方向。PR 侧则持续推进 MCP、沙箱、安全授权、多 Agent 指标、Bedrock、构建性能和图像编辑能力。

---

## 2. 版本发布

### rust-v0.157.0  
链接：https://github.com/openai/codex/releases/tag/rust-v0.157.0

主要更新：

- **新增 GPT-6 Sol 与 GPT-6 Luna**
  - 支持新模型接入。
  - 包含 Amazon Bedrock 支持。
  - 为旧模型提供迁移提示。
- **全屏 transcript 默认启用**
  - 改善终端/会话阅读体验。
  - 新增 Shift-click 扩展文本选择。
- **自动后台 server 启动**
  - 针对符合条件的环境自动启动 background server，降低首次使用门槛。

### rust-v0.158.0-alpha.7 ~ alpha.12  
链接示例：  
- https://github.com/openai/codex/releases/tag/rust-v0.158.0-alpha.12  
- https://github.com/openai/codex/releases/tag/rust-v0.158.0-alpha.11  
- https://github.com/openai/codex/releases/tag/rust-v0.158.0-alpha.10  

这些 alpha 版本集中于下一版迭代验证，Release note 信息较简略，但结合当天 PR 可见重点方向包括 MCP 调用路径优化、沙箱修复、多 Agent 指标、账号套餐识别、Bedrock Runtime 兼容性等。

---

## 3. 社区热点 Issues

### 1. Mac App 无法连接账号，提示无权限  
Issue：https://github.com/openai/codex/issues/47969  
状态：OPEN｜评论：4

用户反馈 Mac App 前一天可用，当前无法正常工作，重新登录、清缓存、检查权限均无效。  
**重要性：** 这是典型的账号/授权回归问题，影响 App 基础可用性。评论数最高，说明社区已有共鸣或排查互动。

---

### 2. 请求恢复项目侧边栏中可见的 Commit / Push 按钮  
Issue：https://github.com/openai/codex/issues/47897  
状态：OPEN｜评论：3｜👍：3

用户希望 Codex App 恢复项目侧边栏中的 Commit 和 Push 显式按钮，而不是隐藏到无标签的省略号菜单中。  
**重要性：** 反映开发者对“高频 Git 操作可达性”的强需求。点赞数较高，属于 UX 回归类热点。

---

### 3. Windows 内置浏览器阻止本地 HTML 文件  
Issue：https://github.com/openai/codex/issues/47992  
状态：OPEN｜评论：2

Windows Codex App 内置浏览器拒绝打开本地 HTML 文件，报 “Browser Use URL policy”。  
**重要性：** 直接影响本地 Web 开发、预览和自动化测试场景，尤其是前端开发者常见工作流。

---

### 4. Windows Desktop 模型选择器缺少 GPT-6 Astra/Sol/Luna  
Issue：https://github.com/openai/codex/issues/47972  
状态：OPEN｜评论：2

用户指出 CLI 与移动端 Work 中可见 GPT-6 Astra/Sol/Luna，但 Windows Desktop model picker 中缺失。  
**重要性：** 新模型发布后的跨端一致性问题。若不同客户端模型可用性不一致，会影响迁移和用户信任。

---

### 5. 请求移除 5 小时用量限制  
Issue：https://github.com/openai/codex/issues/47928  
状态：CLOSED｜评论：2

用户认为滚动 5 小时限制会打断长时间开发、调试和代码审查任务。  
**重要性：** 速率限制仍是重度开发者关注焦点，尤其是 Pro/高价订阅用户对连续工作流稳定性要求更高。

---

### 6. Linux VS Code 扩展沙箱在 Docker nsfs mount 下失败  
Issue：https://github.com/openai/codex/issues/47987  
状态：OPEN｜评论：1

VS Code 扩展 26.917.62051 中，Linux sandbox 遇到 Docker `nsfs` mount 时出现 “mountinfo path is not absolute”。  
**重要性：** 容器化开发环境是 AI 编程工具的核心使用场景，该问题可能影响 VS Code + Docker/Dev Container 用户。

---

### 7. Windows Codex App 工具能力声明与实际不可用不一致  
Issue：https://github.com/openai/codex/issues/47983  
状态：OPEN｜评论：1

用户报告 Windows App 中 `read_thread/list_threads` 被声明但不可用，同时 rate-limit RPC 返回 `-32603`。  
**重要性：** 涉及 MCP/tool-calls 能力注册、运行时一致性与错误处理，对 Agent 工具链可靠性影响较大。

---

### 8. 旧聊天未出现在侧边栏  
Issue：https://github.com/openai/codex/issues/47978  
状态：OPEN｜评论：1

macOS 桌面端 Recents 侧边栏中旧聊天历史缺失。  
**重要性：** 会话历史可见性直接影响项目连续性。与其他“搜索仅覆盖近期聊天”“项目文档持久化疑似丢失”等问题共同指向会话管理可靠性。

---

### 9. VS Code + CLI 会话锁死，提示在其他 App 打开  
Issue：https://github.com/openai/codex/issues/47977  
状态：OPEN｜评论：1

同一个 Codex conversation 在 VS Code 扩展和 CLI 中均无法继续，提示 “This is open in another app”。分支和编辑也不可用。  
**重要性：** 多客户端并发/锁管理问题会造成工作流中断，是 IDE 集成稳定性的关键问题。

---

### 10. gVisor 作为 Linux 沙箱选项的功能建议  
Issue：https://github.com/openai/codex/issues/47973  
状态：OPEN｜👍：1

gVisor 相关贡献者建议将 gVisor 作为 bubblewrap 之外的 Linux sandbox 选项，并指出 OpenAI 已在 ChatGPT 代码执行沙箱中使用 gVisor。  
**重要性：** 这是高价值基础设施方向建议，可能提升 Codex 在 Linux/容器环境下的隔离能力与安全边界。

---

## 4. 重要 PR 进展

### 1. 为 exec-server 增加启动阶段 PID namespace 继承  
PR：https://github.com/openai/codex/pull/47989  
状态：CLOSED

解决容器禁止新 `/proc` mount 时，sandbox fallback 中 PID namespace 与 `/proc` 暴露 PID 不一致的问题。  
**价值：** 改善容器/受限环境下的进程管理可靠性。

---

### 2. 复用等价 MCP binding 的 handler  
PR：https://github.com/openai/codex/pull/47988  
状态：CLOSED

当 MCP catalog 刷新但工具元数据未变化时，复用 handler，避免重建工具搜索索引。  
**价值：** 提升 MCP 工具体系性能，减少无意义重建。

---

### 3. 增加 multi-agent spawn 延迟与失败指标  
PR：https://github.com/openai/codex/pull/47984  
状态：CLOSED

新增多 Agent 启动阶段耗时指标，包括 residency reservation、fork context、child creation、durability wait、input admission 等。  
**价值：** 为多 Agent 性能调优和故障定位提供可观测性基础。

---

### 4. 直接基于 advertised tool identities 准备 MCP 调用  
PR：https://github.com/openai/codex/pull/47981  
状态：CLOSED

MCP 调用不再构建完整 runtime binding，而是从当前 server client 与 catalog 中匹配已声明工具。  
**价值：** 降低 MCP 调用路径复杂度，减少 stale binding 或工具身份不一致风险。

---

### 5. 防止语音恢复时旧答案重新出现  
PR：https://github.com/openai/codex/pull/47975  
状态：CLOSED

过滤 speech recovery 中已过期或已播报的语音答案，避免旧答案作为文本出现在新问题下。  
**价值：** 改善语音交互一致性，避免上下文污染。

---

### 6. 跨 writable roots 保留 Git 目录保护  
PR：https://github.com/openai/codex/pull/47974  
状态：CLOSED

处理 `.git` 指针解析到另一个 writable root 的情况，确保 Git 目录保护不会被 Seatbelt/bubblewrap 授权绕过。  
**价值：** 强化仓库元数据安全，降低 sandbox 写权限误放大的风险。

---

### 7. 增加 Pro Max 套餐支持并更新 Pro 展示名  
PR：https://github.com/openai/codex/pull/47971  
状态：CLOSED

新增 `promax` 识别，更新认证、账号响应、后端 rate limit schema 与客户端类型；展示名包括 Pro、Pro (More)、Pro (Max)。  
**价值：** 说明 Codex 正在适配更细分的订阅与限额体系，也回应社区对用量限制的关注。

---

### 8. 暴露运行中 turn 的当前环境选择  
PR：https://github.com/openai/codex/pull/47970  
状态：CLOSED

新增 `CodexThread::current_turn_environment_selections(expected_turn_id)`，让运行中的 turn 能反映后续环境设置更新。  
**价值：** 改善长任务执行过程中的环境状态同步能力。

---

### 9. 将 Flex capacity failure 作为独立终止错误暴露  
PR：https://github.com/openai/codex/pull/47967  
状态：CLOSED

识别 HTTP 429、streamed error、`response.failed` 中的 `flex_unavailable`，以 “Flex capacity unavailable.” 结束正常 turn，不再盲目重试。  
**价值：** 提升容量不足场景下的错误透明度，减少用户误判为模型卡死或网络失败。

---

### 10. 支持 image edit request 中的文件引用  
PR：https://github.com/openai/codex/pull/47956  
状态：CLOSED

`ImageEditRequest` 支持 `image_url` 与 `file_id`，使最近对话中的图片文件引用也可用于图像编辑。  
**价值：** 增强多模态工作流，修复对话内图片编辑失败的问题。

---

## 5. 功能需求趋势

### 1. 新模型支持与跨端一致性  
相关 Issue：  
- https://github.com/openai/codex/issues/47972  
- https://github.com/openai/codex/issues/47931  

GPT-6 Astra/Sol/Luna 发布后，用户开始关注不同客户端之间的模型可见性差异。CLI、移动端、桌面端的模型 picker 一致性成为明显需求。

---

### 2. 桌面 App 的稳定性与可恢复性  
相关 Issue：  
- https://github.com/openai/codex/issues/47969  
- https://github.com/openai/codex/issues/47985  
- https://github.com/openai/codex/issues/47948  
- https://github.com/openai/codex/issues/47993  

反馈覆盖账号连接失败、Renderer crash、启动时 CPU/SSD 饱和、macOS 锁屏被唤醒等。桌面端正在成为 Codex 主要入口之一，其稳定性问题对整体体验影响明显。

---

### 3. Sandbox 与容器化开发环境  
相关 Issue：  
- https://github.com/openai/codex/issues/47987  
- https://github.com/openai/codex/issues/47950  
- https://github.com/openai/codex/issues/47941  
- https://github.com/openai/codex/issues/47973  

Linux bubblewrap、Docker nsfs、Windows ACL、gVisor 等话题集中出现，说明社区高度关注 Codex 在真实开发环境中的隔离、权限和可执行性。

---

### 4. MCP / Tool-calls 可靠性  
相关 Issue：  
- https://github.com/openai/codex/issues/47983  
- https://github.com/openai/codex/issues/47910  
- https://github.com/openai/codex/issues/47991  

工具声明与实际可用性不一致、tool call 长时间停滞、Computer Use screenshotId 不匹配等问题表明 Agent 工具链仍是高频故障点。

---

### 5. 会话历史、搜索与项目持久化  
相关 Issue：  
- https://github.com/openai/codex/issues/47978  
- https://github.com/openai/codex/issues/47930  
- https://github.com/openai/codex/issues/47994  
- https://github.com/openai/codex/issues/47963  

用户希望历史聊天完整可见、搜索覆盖所有会话、项目文档可靠持久化，并在 Windows/iOS/iPad/桌面之间保持项目分组一致。

---

### 6. 用量限制与套餐体验  
相关 Issue：  
- https://github.com/openai/codex/issues/47928  
- https://github.com/openai/codex/issues/47893  
- https://github.com/openai/codex/issues/47983  

社区对 Pro/Plus 订阅下的限额透明度、错误提示、实际可用时长存在不满。PR #47971 和 #47967 表明官方也在调整套餐识别与容量错误表达。

---

## 6. 开发者关注点

### 1. “可用性回归”比新增功能更受关注  
尽管新版本引入 GPT-6 Sol/Luna、Bedrock、全屏 transcript 等功能，但 Issues 中最集中的反馈仍是：App 登录失败、模型 picker 不显示、旧聊天丢失、工具调用卡死、沙箱无法启动等基础稳定性问题。

### 2. 桌面端成为主要矛盾点  
Windows 与 macOS App 相关问题数量明显偏高，涉及权限、浏览器、Computer Use、Renderer、性能和会话历史。桌面端需要更强的诊断能力和故障恢复机制。

### 3. Agent 工具链需要更透明的状态反馈  
多位用户报告 tool calls 长时间无响应、MCP 工具声明不可用、rate-limit RPC 报内部错误。开发者需要明确知道：工具是否注册成功、是否正在执行、失败原因是什么、是否可以安全重试。

### 4. 沙箱兼容性已成为企业/高级用户采用关键  
Docker、Btrfs、bubblewrap、Windows ACL、gVisor 等问题说明 Codex 不再只是本地 CLI 工具，而是要适配复杂开发栈。更灵活的 sandbox backend 和更好的错误诊断将直接影响采用率。

### 5. 会话连续性和项目记忆是高频刚需  
旧聊天不可见、搜索范围有限、跨设备项目分组不一致、疑似文档持久化问题，都会破坏长期项目使用体验。开发者期待 Codex 像 IDE 一样可靠保存上下文，而不是只作为临时聊天窗口。

### 6. 价格/限额透明度需要加强  
Pro 用户“一条命令后触发限制”等反馈显示，限额机制与用户预期存在落差。未来需要更清楚的 quota 展示、容量错误分类、重试建议和套餐差异说明。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报  
日期：2026-09-25  
仓库：google-gemini/gemini-cli

## 1. 今日速览

过去 24 小时 Gemini CLI 发布了新的 nightly 版本 `v0.62.0-nightly.20260925.gbedef96ef`，主要延续 v0.61 系列变更，并修复 MCP 启用配置识别相关问题。  
社区讨论重点集中在 **MCP OAuth 兼容性、安全边界、并发文件写入一致性、交互式终端卡顿、低延迟响应机制** 等方向。  
PR 活跃度较高，多个 P1 级修复聚焦安全与核心体验，显示项目正在快速收敛 v0.61 后暴露的问题。

---

## 2. 版本发布

### v0.62.0-nightly.20260925.gbedef96ef

链接：<https://github.com/google-gemini/gemini-cli/releases/tag/v0.62.0-nightly.20260925.gbedef96ef>

本次 nightly 版本主要包含：

- 自动生成并合入 `v0.61.0-preview.1` 与 `v0.61.0` 的 changelog
- 修复 CLI 对 MCP 启用配置的判断逻辑：
  - 区分“缺失 MCP enablement 配置”
  - 与“配置格式损坏 / malformed”两类情况
- 为后续 v0.62.0 nightly 迭代做版本推进

整体来看，这是一次偏维护型的 nightly 发布，重点在于稳定 v0.61 之后的 MCP 配置处理逻辑。

---

## 3. 社区热点 Issues

> 过去 24 小时内更新的 Issue 共 5 条，因此本节仅列出全部 5 条，并按技术价值排序。未凑满 10 条。

### 1. MCP OAuth 对缺失 `iss` 参数的处理过于严格

- Issue：[#29477](https://github.com/google-gemini/gemini-cli/issues/29477)
- 状态：Open
- 标签：`priority/p1`, `area/security`, `kind/bug`
- 重要性：高

该问题指出，自 v0.61.0 起，`/mcp auth <server>` 在某些 MCP 服务器上认证失败。原因是 Gemini CLI 对 RFC 9207 中 authorization response 的 `iss` 参数进行了强校验，但部分授权服务器虽然在 RFC 8414 metadata 中声明了 `issuer`，却没有返回 `iss`。

这会影响 MCP OAuth 生态兼容性，尤其是已有授权服务器并未声明 `authorization_response_iss_parameter_supported` 的场景。该问题已被标记为 P1 安全相关 bug，并已有对应 PR 推进。

社区反应：暂无评论，但优先级较高，维护者响应迅速。

---

### 2. 为 npm 安装引入 PkgDiet 依赖安全守卫

- Issue：[#29478](https://github.com/google-gemini/gemini-cli/issues/29478)
- 状态：Open
- 标签：`priority/p3`, `area/security`, `kind/enhancement`
- 重要性：中高

该功能请求建议内置 PkgDiet skill，使 Gemini CLI 在执行 `npm install` 前自动拦截并检查依赖包的健康度、bundle size、弃用状态以及潜在恶意风险。

这一需求反映了社区对 **AI Agent 自动安装依赖时的供应链安全** 的关注。对于具备自主执行命令能力的 CLI Agent 来说，依赖安装是高风险操作，引入 MCP 级别的依赖审查机制具有实际价值。

社区反应：已有评论，标签已完成 bot triage，但优先级暂为 P3。

---

### 3. 在大模型启动前增加快速响应路径

- Issue：[#29483](https://github.com/google-gemini/gemini-cli/issues/29483)
- 状态：Open
- 标签：`status/need-triage`
- 重要性：中高

该 Issue 提出在主模型响应前增加一个更快的简单消息处理机制。作者提到他们已在 Gemini CLI 的一个 fork 中实现类似能力，目标是让简单消息无需等待完整大模型“唤醒”，从而提升交互速度。

这一问题与 PR [#29482](https://github.com/google-gemini/gemini-cli/pull/29482) 的 “Decision Gate” 思路高度相关，反映社区正在探索 **多层推理路径 / 快慢模型分流 / 低延迟交互** 的方向。

社区反应：暂无评论，仍待 triage，但从对应 PR 的规模看该方向值得关注。

---

### 4. 攻击性反馈：Gemini 体验不满

- Issue：[#29485](https://github.com/google-gemini/gemini-cli/issues/29485)
- 状态：Closed
- 标签：`status/need-triage`
- 重要性：低

该 Issue 内容主要为攻击性表达和情绪化反馈，缺少可执行的 bug 信息或复现步骤。已关闭。

虽然技术价值较低，但它反映出部分用户对 Gemini CLI 或 Gemini 模型体验存在强烈不满。对于维护者而言，此类反馈通常需要通过社区治理与 issue 模板引导来降低噪音。

社区反应：有 4 条评论，已关闭。

---

### 5. 攻击性反馈：要求删除 Gemini

- Issue：[#29486](https://github.com/google-gemini/gemini-cli/issues/29486)
- 状态：Closed
- 标签：`status/need-triage`
- 重要性：低

该 Issue 同样以攻击性语言表达对 Gemini 的不满，并未提供具体问题细节。已关闭。

从社区运营角度看，这类 Issue 增加了维护成本，也提示项目可能需要继续强化 issue 模板、自动分类、行为准则提醒和无效 Issue 关闭流程。

社区反应：有 2 条评论，已关闭。

---

## 4. 重要 PR 进展

### 1. 串行化文件工具操作，并实现原子写入

- PR：[#29495](https://github.com/google-gemini/gemini-cli/pull/29495)
- 状态：Open
- 标签：`priority/p1`, `area/core`, `size/l`
- 重要性：高

该 PR 修复核心文件工具在并发执行时的竞态问题，尤其是 parallel sub-agents 或批量调度场景下多个工具同时读写同一路径导致的 lost update、diff 不准确、文件覆盖等问题。

核心改动包括：

- 对文件工具操作进行序列化
- 让文件写入更接近原子操作
- 降低并发 agent 修改代码时出现静默数据损坏的风险

这是一个对 Agent 可靠性非常关键的修复。

---

### 2. 修复 MCP OAuth 对 `iss` 缺失的误拒绝

- PR：[#29488](https://github.com/google-gemini/gemini-cli/pull/29488)
- 状态：Open
- 标签：`priority/p1`, `area/security`, `size/m`
- 重要性：高

该 PR 对应 Issue [#29477](https://github.com/google-gemini/gemini-cli/issues/29477)，修正 MCP OAuth 流程中对 RFC 9207 `iss` 参数的判断逻辑。

修复重点：

- 仅当授权服务器明确声明 `authorization_response_iss_parameter_supported` 时，才因缺失 `iss` 拒绝回调
- 提升与现有 OAuth / MCP 服务端的兼容性
- 保留必要的安全校验，避免过度放宽认证流程

这是 v0.61.0 后 MCP 认证兼容性的关键回归修复。

---

### 3. 修复 Windows 命令安全中 git 参数校验绕过

- PR：[#29480](https://github.com/google-gemini/gemini-cli/pull/29480)
- 状态：Open
- 标签：`priority/p1`, `area/security`, `size/m`
- 重要性：高

该 PR 修复 Windows 命令安全机制中对 `git` 参数的校验不足问题。此前类似 `git diff --output=<path>` 的命令可能绕过权限提示，并静默覆盖任意文件。

安全影响：

- 防止 prompt injection 诱导 agent 执行危险 git 参数
- 避免 `--output` 等写文件参数绕过用户确认
- 加强 Windows 平台命令执行安全边界

对于具备命令执行能力的 AI CLI 来说，这是一个重要安全修补。

---

### 4. 防止 checkpoint legacy 路径穿越

- PR：[#29479](https://github.com/google-gemini/gemini-cli/pull/29479)
- 状态：Open
- 标签：`priority/p1`, `area/security`, `size/m`
- 重要性：高

该 PR 修复 checkpoint 加载与删除逻辑中的路径穿越风险。此前类似 `x/../../secret` 的 tag 可能解析到 checkpoints 目录之外，从而读取或删除非预期 `.json` 文件。

修复方向：

- 将 legacy checkpoint 路径限制在 checkpoints 目录内
- 防止 `deleteCheckpoint` 删除外部文件
- 防止 `loadCheckpoint` 读取外部文件

这是典型的文件系统边界安全修复。

---

### 5. 避免 sandbox 构建与网络设置中的 shell 插值风险

- PR：[#29492](https://github.com/google-gemini/gemini-cli/pull/29492)
- 状态：Open
- 标签：`area/security`, `size/m`
- 重要性：高

该 PR 修复 `BUILD_SANDBOX=1` 场景下 sandbox 构建命令使用 shell string 拼接路径的问题。若 checkout 路径或 Dockerfile 路径中包含 shell metacharacters，可能造成命令注入。

修复价值：

- 避免 `execSync` shell 字符串插值风险
- 增强本地构建 sandbox 的安全性
- 对 CI、本地开发环境均有意义

---

### 6. 修复 resume 会话时工具响应被重复注入历史

- PR：[#29490](https://github.com/google-gemini/gemini-cli/pull/29490)
- 状态：Open
- 标签：`priority/p1`, `area/core`, `size/l`
- 重要性：高

该 PR 修复使用 `-r` 恢复会话时，tool response turns 被重复加入 client history 的问题。

影响：

- 避免模型在恢复会话后看到重复工具结果
- 降低上下文污染
- 改善长会话、工具调用密集会话的稳定性

对于 CLI Agent 的 session resume 功能而言，这是核心体验修复。

---

### 7. 修复扩展启用配置不可读时导致所有扩展重新启用

- PR：[#29481](https://github.com/google-gemini/gemini-cli/pull/29481)
- 状态：Open
- 标签：`priority/p1`, `area/core`, `size/m`
- 重要性：高

该 PR 指出，当 `extension-enablement.json` 不可读时，CLI 会静默重新启用所有被用户禁用的扩展；随后用户执行 enable / disable / remove 操作还可能覆盖文件内容。

由于扩展可以贡献 MCP servers、tools、commands 和 hooks，这一行为具有安全与可控性风险。

修复价值：

- 尊重用户对扩展的禁用选择
- 避免错误恢复为“全部启用”
- 防止配置文件被进一步破坏

---

### 8. 修复交互模式下按 Enter 卡住的问题

- PR：[#29476](https://github.com/google-gemini/gemini-cli/pull/29476)
- 状态：Open
- 标签：`priority/p1`, `area/core`, `size/m`, `size/l`
- 重要性：中高

该 PR 修复在集成终端、IDE companion integration 开启时，用户在工具确认提示中按 `Enter` 看起来无响应的问题。

修复重点：

- 解耦用户确认事件发布与 IDE 集成路径
- 改善 file edit approval 等确认流程
- 提升交互式 TUI 的可用性

这是影响日常使用体验的高优先级修复。

---

### 9. 为 Flash-Lite 模型禁用 High ThinkingLevel 继承

- PR：[#29489](https://github.com/google-gemini/gemini-cli/pull/29489)
- 状态：Open
- 标签：`priority/p2`, `area/agent`, `size/m`
- 重要性：中高

该 PR 防止 Flash-Lite 模型继承 `ThinkingLevel.HIGH`，新增 `chat-base-3-flash-lite`，并设置 `thinkingBudget: 0`。

意义：

- 保持 Flash-Lite 模型低延迟、轻量化定位
- 避免不必要的 thinking 开销
- 改善 fast path / low-cost model 使用体验

这与社区关注的低延迟响应趋势一致。

---

### 10. 添加可选 Decision Gate 快速决策层

- PR：[#29482](https://github.com/google-gemini/gemini-cli/pull/29482)
- 状态：Open
- 标签：`size/l`, `size/xl`, `status/need-issue`
- 重要性：中高

该 PR 增加一个位于主模型前的可选快速 Decision Gate。它会在数十毫秒内判断用户消息类型，对于简单消息可走更短路径，从而减少等待主模型完整响应的延迟。

潜在价值：

- 提升简单问答和控制类消息的响应速度
- 降低主模型调用成本
- 为 Gemini CLI 引入多级推理架构雏形

该 PR 体量较大，仍需进一步讨论设计边界、准确率、可观测性和失败回退机制。

---

## 5. 功能需求趋势

### 1. MCP 生态兼容性与安全并重

相关 Issue / PR：

- [#29477](https://github.com/google-gemini/gemini-cli/issues/29477)
- [#29488](https://github.com/google-gemini/gemini-cli/pull/29488)

MCP 已成为 Gemini CLI 扩展能力的重要方向，但 OAuth、server metadata、issuer 校验等细节正在暴露兼容性问题。社区需求不是简单放宽安全规则，而是在遵循标准的同时兼容现实中的服务器实现。

---

### 2. AI Agent 的供应链安全

相关 Issue：

- [#29478](https://github.com/google-gemini/gemini-cli/issues/29478)

PkgDiet dependency guardrail 的提议说明开发者担心 Agent 自动安装依赖时引入恶意包、废弃包或过重依赖。未来类似 npm、pip、cargo、go modules 的安装前安全检查可能会成为 AI CLI 的标配能力。

---

### 3. 低延迟交互与快慢路径分流

相关 Issue / PR：

- [#29483](https://github.com/google-gemini/gemini-cli/issues/29483)
- [#29482](https://github.com/google-gemini/gemini-cli/pull/29482)
- [#29489](https://github.com/google-gemini/gemini-cli/pull/29489)

社区正在探索让 Gemini CLI 对简单消息更快响应，而不是所有请求都进入完整大模型路径。Decision Gate、Flash-Lite thinking budget、fast decider 等方案都指向同一个目标：降低交互延迟。

---

### 4. 并发 Agent 执行的可靠性

相关 PR：

- [#29495](https://github.com/google-gemini/gemini-cli/pull/29495)
- [#29494](https://github.com/google-gemini/gemini-cli/pull/29494)
- [#29493](https://github.com/google-gemini/gemini-cli/pull/29493)

随着 parallel sub-agents 和批量 tool execution 的使用增加，文件写入一致性成为关键问题。社区和贡献者开始关注工具层面的锁、原子写、diff 准确性与 shadow repository 一致性。

---

### 5. 交互式 CLI 与 IDE 集成体验

相关 PR：

- [#29476](https://github.com/google-gemini/gemini-cli/pull/29476)
- [#29487](https://github.com/google-gemini/gemini-cli/pull/29487)

Enter 卡住、stdin pause / resume 状态异常等问题说明 Gemini CLI 在 TUI、集成终端、IDE companion 同时工作时仍有边界问题。随着 CLI 与 IDE 的结合更紧密，输入流、焦点管理、确认流程会成为持续优化点。

---

## 6. 开发者关注点

### 1. 安全边界是当前最高频关注点

过去 24 小时多个重要 PR 都与安全相关：

- Windows git 参数绕过：[#29480](https://github.com/google-gemini/gemini-cli/pull/29480)
- checkpoint 路径穿越：[#29479](https://github.com/google-gemini/gemini-cli/pull/29479)
- sandbox shell 插值：[#29492](https://github.com/google-gemini/gemini-cli/pull/29492)
- MCP OAuth `iss` 校验：[#29488](https://github.com/google-gemini/gemini-cli/pull/29488)
- 扩展配置异常导致禁用失效：[#29481](https://github.com/google-gemini/gemini-cli/pull/29481)

这表明开发者最担心的是：AI Agent 一旦拥有文件、shell、MCP、扩展能力，任何默认信任或边界遗漏都会变成高风险问题。

---

### 2. 并发执行带来新的数据一致性问题

PR [#29495](https://github.com/google-gemini/gemini-cli/pull/29495) 说明，在多工具并发、sub-agent 并行执行场景下，传统 CLI 的文件读写假设已经不够。开发者需要 Gemini CLI 提供更强的操作序列化、路径级锁和原子写保障。

---

### 3. 用户希望 CLI 更“即时”

Issue [#29483](https://github.com/google-gemini/gemini-cli/issues/29483) 与 PR [#29482](https://github.com/google-gemini/gemini-cli/pull/29482) 显示，开发者对“每句话都等待大模型完整响应”的体验并不满意。简单消息、确认类消息、路由类消息适合走更快路径。

---

### 4. 会话恢复与上下文管理仍需打磨

PR [#29490](https://github.com/google-gemini/gemini-cli/pull/29490) 反映 resume session 场景下上下文重放存在重复 tool response 的问题。对于长期使用 Gemini CLI 的开发者来说，会话恢复的准确性直接影响模型判断质量。

---

### 5. 社区治理与 Issue 质量仍是维护压力

Issue [#29485](https://github.com/google-gemini/gemini-cli/issues/29485) 和 [#29486](https://github.com/google-gemini/gemini-cli/issues/29486) 属于攻击性或低信息密度反馈，已关闭。  
这类 Issue 虽不具备技术价值，但会消耗维护者精力。后续可能需要更严格的 issue 模板、自动关闭策略和社区行为规范提醒。

---

## 总结

今天 Gemini CLI 的核心关键词是：**安全、MCP、并发可靠性、低延迟交互**。  
v0.62 nightly 继续推进 v0.61 后的稳定化工作，而多个 P1 PR 表明项目正在快速修复 OAuth、文件系统、命令执行和扩展配置方面的边界问题。对开发者而言，近期最值得关注的是 MCP OAuth 修复、文件工具原子写入、Windows 命令安全和 Decision Gate 低延迟方案的后续合入情况。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报  
日期：2026-09-25  
仓库：github.com/github/copilot-cli

## 1. 今日速览

过去 24 小时内，Copilot CLI 连续发布了 `v1.0.89-2` 与 `v1.0.89-3`，重点修复交互表单、OAuth scopes、会话撤回等体验问题。社区反馈主要集中在 **扩展启动阻塞、企业自定义模型选择、插件安装、Windows 主题适配、文档字段不一致** 等方向，显示出 Copilot CLI 在企业化、插件生态和跨平台体验上的磨合仍在继续。

今日无新的 Pull Request 更新。

---

## 2. 版本发布

### v1.0.89-3  
链接：https://github.com/github/copilot-cli/releases/tag/v1.0.89-3

**修复内容**
- 修复 ask-user 表单中多个问题的自定义 `Other` 答案未能正确隔离的问题。
- 该修复主要影响多步骤交互式表单场景，可避免不同问题之间的自定义输入互相串扰。

### v1.0.89-2  
链接：https://github.com/github/copilot-cli/releases/tag/v1.0.89-2

**新增内容**
- MCP 预注册 OAuth clients 现在会遵循配置的 `oauthScopes`。
- 本地会话中，当聊天输入框为空时，按 `Esc Esc` 可以撤回模型尚未开始回答的 prompt，并将其从对话中移除。

**改进内容**
- Windows 支持版本上的沙箱命令能力有所改进。当前 release note 内容被截断，具体细节仍需查看完整发布说明。

**技术影响**
- OAuth scopes 支持对 MCP 集成和企业安全控制较重要。
- `Esc Esc` 撤回 prompt 改善了本地交互会话的可控性，尤其适合误提交或需要快速中断的开发场景。

---

## 3. 社区热点 Issues

> 数据源过去 24 小时内共更新 6 条 Issue，因此以下列出全部 6 条，而非强行补足 10 条。

### 1. 1.0.88 回归：`joinSession()` 在扩展启动期间卡住  
Issue：[#4966](https://github.com/github/copilot-cli/issues/4966)  
状态：OPEN  
作者：heshihao0813  
评论：0，👍：0

**问题概述**  
从 `1.0.88` 开始，SDK 扩展在 CLI 启动阶段调用 `joinSession()` 时，`session.resume` 请求无响应，导致扩展启动等待 30 秒超时，进而拖慢 `-i` 交互模式启动。

**为什么重要**  
这是典型的扩展生命周期阻塞问题，会直接影响基于 SDK 的插件或扩展生态。如果扩展无法可靠加入会话，第三方集成体验会明显下降。

**社区反应**  
目前暂无评论和点赞，但由于涉及启动超时与回归，优先级值得关注。

---

### 2. 企业管理的自定义模型显示在 `/model` 中但无法选择  
Issue：[#4960](https://github.com/github/copilot-cli/issues/4960)  
状态：OPEN  
作者：jorgegarciarey  
评论：1，👍：0

**问题概述**  
企业通过 OpenAI-compatible provider 配置的自定义模型会显示在 `/model` 选择器中，标记为 `(preview) (custom)`，但用户选择后无法真正切换。

**为什么重要**  
这直接影响企业自定义模型接入能力。对于希望将 Copilot CLI 连接到内部模型、私有网关或合规模型平台的团队来说，这是核心阻塞。

**社区反应**  
已有 1 条评论，说明该问题可能已进入初步排查或 triage 阶段。

---

### 3. `plugin install` 在使用 Git LFS 的仓库中失败  
Issue：[#4962](https://github.com/github/copilot-cli/issues/4962)  
状态：OPEN  
作者：Dpetters  
评论：0，👍：0

**问题概述**  
当 marketplace plugin 使用 `github` source，并从大仓库中的某个 `path` 安装时，`copilot plugin install` 会 clone 整个仓库，并触发 Git LFS smudge，导致下载所有 LFS 文件。一旦有 LFS object 缺失，安装就会失败。

**为什么重要**  
这会显著影响插件分发体验，尤其是大型 monorepo、含二进制资源或模型文件的仓库。插件安装应尽可能轻量、可预测，避免被无关 LFS 内容阻塞。

**社区反应**  
暂无评论和点赞，但该问题对插件生态可用性影响较大。

---

### 4. Windows 下主题跟随 OS apps theme 而非终端背景，导致文字不可读  
Issue：[#4961](https://github.com/github/copilot-cli/issues/4961)  
状态：OPEN  
作者：alex-z0  
评论：0，👍：0

**问题概述**  
在 Windows 上，Copilot CLI 根据系统 apps theme 判断明暗模式，而不是根据终端实际背景判断。若系统主题在会话中切换，但终端仍为深色背景，CLI 会按浅色背景重绘文本，导致可读性下降。

**为什么重要**  
这是跨平台终端体验问题，尤其影响 Windows 用户和使用 Auto Dark Mode 的开发者。CLI 工具的配色应优先保证终端内的可读性。

**社区反应**  
暂无评论和点赞，但问题明确指出在 `1.0.89-1` 中仍然存在。

---

### 5. custom-agent 文档字段 `reasoningEffort` 与实际可用字段不一致  
Issue：[#4963](https://github.com/github/copilot-cli/issues/4963)  
状态：OPEN  
作者：Yagouus  
评论：0，👍：0

**问题概述**  
Copilot CLI custom-agent reference 文档中说明 frontmatter 字段为 `reasoningEffort`，但在 `1.0.88` 中实际生效的是 `reasoning-effort`。

**为什么重要**  
这是文档与实现不一致的问题，会影响开发者配置自定义 agent，尤其是调优推理强度相关行为时容易踩坑。

**社区反应**  
暂无评论和点赞，但该类问题通常修复成本低、对开发者体验提升明显。

---

### 6. 内置语音听写无法识别 Changes inline comment editor  
Issue：[#4964](https://github.com/github/copilot-cli/issues/4964)  
状态：CLOSED  
作者：cirvine-MSFT  
评论：1，👍：0

**问题概述**  
Copilot 的内置语音听写无法将 Changes 画布中的 inline comment editor 识别为文本输入框，即使编辑器已经打开并聚焦，也会报错。

**为什么重要**  
这影响无障碍输入、语音工作流以及代码审查中的评论体验。虽然该 Issue 已关闭，但它暴露了 Copilot 相关输入场景中对富文本/嵌入式编辑器识别的边界问题。

**社区反应**  
已有 1 条评论，并已关闭，可能已被转移、确认不适用或完成处理。

---

## 4. 重要 PR 进展

过去 24 小时内无 Pull Request 更新。

---

## 5. 功能需求趋势

### 1. 企业自定义模型与模型选择能力  
相关 Issue：[#4960](https://github.com/github/copilot-cli/issues/4960)

企业用户正在尝试通过 OpenAI-compatible provider 接入自定义模型，但模型显示与实际选择之间存在断层。趋势上看，社区对以下能力有较高期待：

- `/model` 选择器完整支持企业托管模型。
- 自定义模型状态、权限、preview 标记更加清晰。
- 模型不可用时提供明确错误信息，而不是静默失败或无法选择。

### 2. 扩展与 SDK 会话生命周期稳定性  
相关 Issue：[#4966](https://github.com/github/copilot-cli/issues/4966)

`joinSession()` 启动阶段阻塞说明扩展 API 的生命周期管理仍是关键关注点。开发者需要：

- 扩展启动时的稳定 session resume 行为。
- 避免 CLI 与 extension ready 状态互相等待。
- 更短、更可诊断的超时机制。
- 对回归问题提供明确版本说明和 workaround。

### 3. 插件安装与 Marketplace 生态体验  
相关 Issue：[#4962](https://github.com/github/copilot-cli/issues/4962)

插件安装因 Git LFS 和整仓 clone 失败，说明当前 plugin installer 对大型仓库和 monorepo 支持还不够精细。社区可能期待：

- 支持 sparse checkout。
- 安装时禁用或延迟 Git LFS smudge。
- 只拉取插件路径相关内容。
- 对缺失 LFS object 提供可恢复机制。

### 4. Windows 终端体验与跨平台适配  
相关 Issue：[#4961](https://github.com/github/copilot-cli/issues/4961)

Windows 用户反馈主题选择依据不符合终端实际显示环境。未来需求可能集中在：

- 根据终端背景色而不是 OS apps theme 判断主题。
- 会话中动态主题变化时保持可读性。
- 提供手动主题 override。
- 改善 Windows Terminal、PowerShell、cmd 等环境下的一致性。

### 5. 自定义 Agent 配置与文档准确性  
相关 Issue：[#4963](https://github.com/github/copilot-cli/issues/4963)

custom-agent frontmatter 字段命名不一致反映出文档与实现同步问题。开发者关注：

- 配置字段命名稳定。
- 文档示例可直接运行。
- 对旧字段/新字段提供兼容或 warning。
- Agent 配置错误时给出明确诊断。

### 6. 可访问性与多模态输入体验  
相关 Issue：[#4964](https://github.com/github/copilot-cli/issues/4964)

语音听写不能识别 inline comment editor，说明语音输入、无障碍能力和复杂编辑器控件之间仍有适配空间。趋势上看，Copilot 相关工具需要更好覆盖：

- inline editor。
- review comment editor。
- Changes canvas。
- 非标准文本输入组件。

---

## 6. 开发者关注点

### 1. 回归风险仍是主要痛点  
`1.0.88` 引入的 `joinSession()` 卡顿问题显示，CLI 的快速迭代可能带来 SDK/扩展层面的兼容性回归。开发者希望关键扩展 API 有更强的稳定性保障。

相关 Issue：[#4966](https://github.com/github/copilot-cli/issues/4966)

### 2. 企业集成路径需要更可靠  
自定义模型可见但不可选，会让企业用户难以判断是权限、配置、provider 兼容性还是 CLI bug。企业场景需要更透明的诊断能力。

相关 Issue：[#4960](https://github.com/github/copilot-cli/issues/4960)

### 3. 插件安装应避免拉取无关内容  
当前 `plugin install` 对 Git LFS 仓库的处理较重，可能造成安装慢、失败率高、网络成本不可控。插件生态要成熟，需要更轻量的安装机制。

相关 Issue：[#4962](https://github.com/github/copilot-cli/issues/4962)

### 4. 终端可读性是基础体验  
Windows 主题判断错误会直接影响 CLI 可用性。相比自动跟随系统主题，开发者更关注终端内实际显示效果和手动控制能力。

相关 Issue：[#4961](https://github.com/github/copilot-cli/issues/4961)

### 5. 文档与实现不一致会降低信任  
`reasoningEffort` 与 `reasoning-effort` 的不一致虽然看似小问题，但会让开发者在 agent 配置中浪费大量排查时间。配置型功能尤其需要文档精确。

相关 Issue：[#4963](https://github.com/github/copilot-cli/issues/4963)

---

## 总结

今日 Copilot CLI 的核心动态集中在小版本快速修复与社区问题反馈。发布侧主要改善 OAuth scopes、会话撤回和表单输入体验；社区侧则集中暴露了扩展启动、企业自定义模型、插件安装、Windows 显示和文档一致性等问题。整体来看，Copilot CLI 正在向更复杂的企业化和生态化场景扩展，但稳定性、可诊断性和跨平台一致性仍是近期开发者最关注的方向。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报  
日期：2026-09-25  
仓库：anomalyco/opencode

## 1. 今日速览

过去 24 小时 OpenCode 社区主要围绕 **v2 稳定性、配置兼容、MCP 生命周期、上下文压缩与 TUI/桌面端体验** 展开。Issue 侧出现多起与 v2.0.16 相关的回归或行为不一致问题；PR 侧则有较多针对 Code Mode、上下文窗口、会话管理、Windows 路径和前端体验的修复在推进。

今天没有新版本发布，但社区贡献活跃，多个 Issue 已有对应 PR，例如 Windows 全局会话路径、上下文百分比显示、Skill frontmatter 缓存污染等，显示维护节奏较快。

---

## 2. 社区热点 Issues

### 1. Plugin API 无法读取 token usage，影响上下文裁剪插件  
Issue：[#51265](https://github.com/anomalyco/opencode/issues/51265)  
状态：Open  
作者：famewolf  
评论：1  

该问题指出 OpenCode 2.0.x 的 Plugin API 不再暴露 token usage 数据，导致类似 DCP 的上下文裁剪插件无法工作。对于依赖插件实现自动压缩、上下文治理和成本控制的高级用户来说影响较大。  
社区反应目前评论不多，但该问题标记了 `needs:compliance` 和 `v2`，说明它可能涉及 v2 API 兼容性与插件生态稳定性。

---

### 2. tinyfish websearch provider 每次搜索返回 HTTP 400  
Issue：[#51263](https://github.com/anomalyco/opencode/issues/51263)  
状态：Open  
作者：sogeisetsu  
评论：1  

内置 `websearch` 工具在使用 `tinyfish` provider 时稳定失败，原因疑似是后续 MCP 请求缺少 `Mcp-Session-Id` header。  
该问题重要性在于它影响内置联网搜索能力，也暴露出 MCP session 生命周期和协议实现细节可能存在遗漏。

---

### 3. v2 配置中的 `instructions` 未被加载  
Issue：[#51262](https://github.com/anomalyco/opencode/issues/51262)  
状态：Closed  
作者：pkuqiuning  
评论：1  

OpenCode v2 接受 `opencode.json` 中的 `instructions` 数组配置，但实际 session context 只扫描 `AGENTS.md`，导致配置项形同虚设。  
这是一个典型的 v2 配置兼容性问题，虽然目前已关闭，但对依赖集中化配置指令的团队用户影响明显。

---

### 4. v2.0.16 忽略 native `providers` 配置块  
Issue：[#51252](https://github.com/anomalyco/opencode/issues/51252)  
状态：Open  
作者：alamaby  
评论：1  

该 Issue 指出 OpenCode v2.0.16 虽然接受文档中的 `providers` 配置 map，但 provider discovery 实际忽略这些条目；相同定义放在 v1 的 `provider` map 下却能加载。  
这直接影响自定义模型提供商接入，也说明 v2 配置迁移路径仍有不一致点。

---

### 5. MCP 本地服务器按 session 启动但未释放  
Issue：[#51249](https://github.com/anomalyco/opencode/issues/51249)  
状态：Open  
作者：4Liberty  
评论：1  

报告称后台服务会为每个 session / directory 启动新的本地 MCP server，但 session 结束后不会释放，导致进程数持续增长，只有服务重启才会清理。  
这是一个重要的资源泄漏问题，尤其影响配置多个本地 stdio MCP server 的长期运行环境。

---

### 6. 请求 Plugin API 支持注册自定义 provider 图标  
Issue：[#51233](https://github.com/anomalyco/opencode/issues/51233)  
状态：Open  
作者：nunnsy  
评论：1  

目前通过插件或配置添加的自定义 provider 在模型选择器中只能显示通用 fallback icon。该功能请求希望 Plugin API 支持注册自定义图标。  
该需求虽然不是核心功能缺陷，但反映出社区正在关注插件生态的产品化体验和多 provider 可识别性。

---

### 7. 升级到 Go tier 并耗尽额度后无法回退免费版  
Issue：[#51219](https://github.com/anomalyco/opencode/issues/51219)  
状态：Open  
作者：preparacaoeautossuficienciapt  
评论：1  

用户反馈升级到 Go tier 并耗尽 credits 后，无法继续使用 free tier，而是被完全锁定。  
这是计费和访问控制层面的体验问题，对付费转化和用户信任影响较大。

---

### 8. Skill frontmatter YAML 无效时被静默丢弃，疑似 gray-matter 缓存污染  
Issue：[#51218](https://github.com/anomalyco/opencode/issues/51218)  
状态：Open  
作者：b00pka  
评论：1  

在长时间运行的 `opencode serve` 中，frontmatter 为无效 YAML 的 `SKILL.md` 会被静默丢弃，且与 gray-matter 的 module-global cache 有关。  
该问题重要在于它既影响 Skill 加载可靠性，也缺少日志提示，增加排障难度。对应修复 PR 已出现：[#51245](https://github.com/anomalyco/opencode/pull/51245)。

---

### 9. Windows 跨盘符 global-project session 无法在桌面 picker 中显示  
Issue：[#51258](https://github.com/anomalyco/opencode/issues/51258)  
状态：Open  
作者：1624318455  
评论：0  

Windows 下通过 `opencode web` 或 API 创建的 session，如果目标目录与 server 进程 cwd 不在同一盘符且不是 git repo，可能在 Desktop TUI `/sessions` picker 中不可见。  
这是 Windows 路径解析和 session 存储逻辑问题，已有对应修复 PR：[#51260](https://github.com/anomalyco/opencode/pull/51260)。

---

### 10. TUI context 百分比对 split-window 模型显示不准确  
Issue：[#51251](https://github.com/anomalyco/opencode/issues/51251)  
状态：Open  
作者：manjeetsharma0796  
评论：0  

对于同时具有 `context` 和较小 `input` limit 的模型，TUI 当前使用 `limit.context` 计算上下文百分比，而 compaction 使用 `limit.input`，导致用户看到的百分比低估真实输入窗口压力。  
该问题直接影响用户判断何时接近压缩阈值，已有对应 PR：[#51250](https://github.com/anomalyco/opencode/pull/51250)。

---

## 3. 重要 PR 进展

### 1. 修复 Code Mode 中 thisArg、computed key toString 与 ToPrimitive 处理  
PR：[#51264](https://github.com/anomalyco/opencode/pull/51264)  
状态：Open  
作者：rekram1-node  

该 PR 修复解释器中若干 JavaScript 语义缺口，包括 iteration callback 的 `thisArg`、computed key 的 `toString`、`String` / `Number` 参数的 ToPrimitive 转换等。  
对 Code Mode 执行复杂 JS 逻辑、模型生成脚本的兼容性有直接提升。

---

### 2. 修复 Windows global session 路径锚定问题  
PR：[#51260](https://github.com/anomalyco/opencode/pull/51260)  
状态：Open  
作者：1624318455  
关联 Issue：[#51258](https://github.com/anomalyco/opencode/issues/51258)  

该 PR 将 Windows global-project session 的路径锚定到 session 所在 drive root，而不是 server 进程所在盘符。  
这可修复跨盘符目录下 API 创建 session 在桌面会话选择器不可见的问题。

---

### 3. 保留 OpenAPI 中 optional 字段描述  
PR：[#51259](https://github.com/anomalyco/opencode/pull/51259)  
状态：Open  
作者：CodewithJha  
关联 Issue：[#51174](https://github.com/anomalyco/opencode/issues/51174)  

该 PR 修复 schema 生成 OpenAPI 时 optional 字段描述丢失的问题。  
对 SDK 生成、API 文档质量和外部集成体验有帮助。

---

### 4. Code Mode 新增 WeakMap 与 WeakSet 支持  
PR：[#51257](https://github.com/anomalyco/opencode/pull/51257)  
状态：Open  
作者：rekram1-node  

该 PR 将 `WeakMap` 和 `WeakSet` 加入 Code Mode 的 program globals。  
这对模型生成的图遍历、对象缓存、循环引用检测等代码非常实用，可减少 `ReferenceError: Unknown identifier`。

---

### 5. CLI 新增 v2 session prune 命令  
PR：[#51255](https://github.com/anomalyco/opencode/pull/51255)  
状态：Open  
作者：DEAD1nsane  

为 v2 CLI 添加 `opencode session prune <duration>`，用于清理旧 session family，并支持预览、确认和相关安全检查。  
这回应了社区对 session 管理和存储清理的需求，也与桌面端“删除 session”功能诉求方向一致。

---

### 6. CLI 新增 session prune 命令  
PR：[#51254](https://github.com/anomalyco/opencode/pull/51254)  
状态：Open  
作者：DEAD1nsane  

与 #51255 类似，该 PR 也实现 `opencode session prune <duration>`。  
当前看起来可能存在 v1/v2 或实现分支差异，后续需要关注维护者如何合并或取舍。

---

### 7. 修复 TUI context 百分比使用错误 limit  
PR：[#51250](https://github.com/anomalyco/opencode/pull/51250)  
状态：Open  
作者：manjeetsharma0796  
关联 Issue：[#51251](https://github.com/anomalyco/opencode/issues/51251)  

该 PR 将 TUI context 百分比计算改为使用有效输入窗口限制，而不是总 context 限制。  
这能让 split-window 模型的压缩风险显示更准确。

---

### 8. 修复 EffectFlock heartbeat 时间戳不刷新  
PR：[#51248](https://github.com/anomalyco/opencode/pull/51248)  
状态：Open  
作者：RRiiiccckkk  
关联 Issue：[#51179](https://github.com/anomalyco/opencode/issues/51179)  

EffectFlock heartbeat effect 创建时捕获了初始时间戳，后续 interval 重复使用旧时间。该 PR 修复 heartbeat 时间刷新。  
这类底层锁和心跳问题通常会影响并发服务、会话恢复和资源协调的稳定性。

---

### 9. 绕过 gray-matter content cache 解析 frontmatter  
PR：[#51245](https://github.com/anomalyco/opencode/pull/51245)  
状态：Open  
作者：holny  
关联 Issue：[#51218](https://github.com/anomalyco/opencode/issues/51218)  

该 PR 修复 gray-matter 在解析失败前写入 module-global cache 导致缓存污染的问题。  
修复后，无效 YAML frontmatter 不应在后续加载中被静默缓存为异常状态，有助于 Skill 系统可靠性。

---

### 10. 修复模型限制适配与 compaction overflow 恢复  
PR：[#51238](https://github.com/anomalyco/opencode/pull/51238)  
状态：Open  
作者：rekram1-node  

该 PR 调整 primary output limit、compaction output limit 与模型 catalog / 剩余上下文之间的适配，并将默认自动 compaction 触发点设为可用输入窗口的 90%。  
这与近期多个上下文压缩、模型输入窗口和 compaction 错误 Issue 高度相关，是今天较核心的稳定性 PR 之一。

---

## 4. 功能需求趋势

### 1. v2 配置与插件生态兼容性  
相关 Issues：  
- [#51265](https://github.com/anomalyco/opencode/issues/51265) Plugin API 缺少 token usage  
- [#51252](https://github.com/anomalyco/opencode/issues/51252) native providers 配置被忽略  
- [#51233](https://github.com/anomalyco/opencode/issues/51233) 自定义 provider 图标  
- [#51234](https://github.com/anomalyco/opencode/issues/51234) slash command frontmatter 支持 model variants  

社区明显关注 v2 迁移后的扩展接口稳定性，尤其是 provider、plugin、instructions、slash command 等可配置能力。

---

### 2. MCP 集成稳定性与权限流  
相关 Issues：  
- [#51263](https://github.com/anomalyco/opencode/issues/51263) tinyfish MCP header 缺失  
- [#51249](https://github.com/anomalyco/opencode/issues/51249) MCP 本地服务进程未释放  
- [#51224](https://github.com/anomalyco/opencode/issues/51224) 并行 Code Mode permission ask 被 orphan  
- [#51223](https://github.com/anomalyco/opencode/issues/51223) MCP 工具权限请求在 TUI 不显示  

MCP 已经成为 OpenCode 工作流核心组件，但 session 管理、权限可见性和资源释放仍是高频痛点。

---

### 3. 上下文窗口、compaction 与模型限制治理  
相关 Issues / PR：  
- [#51251](https://github.com/anomalyco/opencode/issues/51251) context 百分比计算错误  
- [#51202](https://github.com/anomalyco/opencode/issues/51202) GPT-6 Luna compaction error  
- [#51238](https://github.com/anomalyco/opencode/pull/51238) 模型限制与 compaction overflow 修复  
- [#51235](https://github.com/anomalyco/opencode/pull/51235) compaction 触发阈值调整  

随着长上下文模型和 split-window 模型增多，用户越来越关注 OpenCode 如何准确展示、管理和压缩上下文。

---

### 4. TUI / Desktop 交互体验改进  
相关 Issues：  
- [#51256](https://github.com/anomalyco/opencode/issues/51256) Desktop 无法删除 session  
- [#51229](https://github.com/anomalyco/opencode/issues/51229) reasoning bubbles 与 tool output collapse  
- [#51228](https://github.com/anomalyco/opencode/issues/51228) TUI list render 栈溢出  
- [#51222](https://github.com/anomalyco/opencode/issues/51222) client-side slash command 被发送给模型  
- [#51221](https://github.com/anomalyco/opencode/issues/51221) Linux 原生 DBus 通知需求  

用户不仅关注功能是否可用，也开始要求更清晰的 UI 状态、更低噪音的推理展示和更符合平台习惯的桌面体验。

---

### 5. 会话生命周期与多进程一致性  
相关 Issues：  
- [#51258](https://github.com/anomalyco/opencode/issues/51258) Windows 跨盘符 session 不可见  
- [#51216](https://github.com/anomalyco/opencode/issues/51216) Windows desktop background service 被误杀  
- [#51213](https://github.com/anomalyco/opencode/issues/51213) 多 server 共享 DB 时错误恢复运行中的 session  
- [#51255](https://github.com/anomalyco/opencode/pull/51255) v2 session prune  

会话存储、恢复、清理和跨客户端可见性正在成为桌面端与 API 并用场景中的关键问题。

---

## 5. 开发者关注点

1. **v2 行为与文档不一致**  
   多个 Issue 指向 v2 配置项“schema 接受但运行时忽略”的问题，例如 `instructions`、`providers`。这会增加迁移成本，也降低用户对配置文档的信任。

2. **插件 API 需要稳定且可观测**  
   token usage、provider metadata、图标注册等需求说明社区正在构建更复杂的插件和自定义 provider。缺少底层数据会限制生态扩展。

3. **MCP 需要更完善的生命周期管理**  
   包括 session header、server 进程释放、permission ask 展示和并发 ask 处理。当前问题多集中在“能启动但不够稳定、不可见或无法回收”。

4. **上下文压缩逻辑仍是高风险区域**  
   split-window 模型、长上下文模型、自动 compaction 阈值和输出限制都需要更精细处理。错误的 UI 百分比会直接误导开发者操作。

5. **Windows 与桌面端问题较集中**  
   跨盘符路径、后台服务 watchdog、Desktop session 管理等反馈显示 Windows 桌面场景仍需重点打磨。

6. **TUI 可读性和可控性需求上升**  
   开发者希望能折叠 reasoning、收起工具输出、正确执行 slash command，并避免渲染崩溃。这类体验问题会直接影响高频交互效率。

7. **会话清理与存储治理成为新需求**  
   多个 session 相关问题和 `session prune` PR 表明，随着使用量增加，用户需要更明确的 session 生命周期和清理工具。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-09-25

## 1. 今日速览

过去 24 小时，Pi 社区没有新版本发布，但 Issue 活跃度很高，共有 29 条 Issue 更新，其中多数已被关闭，说明维护侧对缺陷与提案处理节奏较快。今日重点集中在 **会话生命周期、TUI 稳定性、模型/Provider 兼容性、工具调用可靠性、遥测与导出能力** 等方向。

值得注意的是，多条问题指向 Pi 在复杂运行场景下的边界行为：如退出卡死、光标隐藏、并行工具调用中断丢结果、follow-up 消息在 abort 后滞留，以及 OpenRouter / Anthropic / Vertex AI 等多 Provider 兼容问题。

---

## 3. 社区热点 Issues

### 1. 维护响应与自动关闭机制引发不满  
**Issue:** [#10008](https://github.com/earendil-works/pi/issues/10008)  
**状态:** Closed  
**作者:** erazortt  

该 Issue 直接质疑项目是否认真处理 Bug 报告，认为已有问题被自动关闭但未得到实质跟进。虽然技术内容不多，但它反映出社区对 Issue 生命周期、自动关闭策略和维护透明度的关注。

**重要性:**  
- 关系到开源项目治理与社区信任。  
- 可能影响后续 Bug 报告质量和用户参与度。  

**社区反应:**  
评论数 4，是今日互动较多的 Issue 之一。

---

### 2. session_shutdown 不返回导致退出卡死  
**Issue:** [#9997](https://github.com/earendil-works/pi/issues/9997)  
**状态:** Closed  
**作者:** aisensiy  

当扩展的 `session_shutdown` handler 永不 resolve 时，Pi 退出流程会卡住，TUI 保持显示，进程几乎无 CPU 占用，也没有反馈。

**重要性:**  
- 直接影响扩展生态稳定性。  
- 暴露出生命周期 hook 缺少超时、诊断和恢复机制。  
- 对长期运行的 agent / TUI 工具尤为关键。

**社区反应:**  
评论数 3，属于今日较受关注的运行时稳定性问题。

---

### 3. 常规模式退出后光标隐藏  
**Issue:** [#10026](https://github.com/earendil-works/pi/issues/10026)  
**状态:** Closed  
**作者:** michaelmjhhhh  

在 regular mode 下退出 Pi 时，如果扩展在 `session_shutdown` 中关闭 overlay，可能导致 shell 光标不可见。

**重要性:**  
- 属于终端状态清理问题，影响用户体验。  
- 与早前 fullscreen 模式下的类似问题有关，说明退出清理路径仍有边界漏洞。  

**社区反应:**  
评论数 2，问题已关闭，可能已有修复或处理结论。

---

### 4. session replacement 后扩展在 session_start 崩溃  
**Issue:** [#10025](https://github.com/earendil-works/pi/issues/10025)  
**状态:** Closed  
**作者:** FlameFires  

在 Windows + pi-web-ui 环境下，多个扩展在 `session_start` 后因 stale context 的 `assertActive` 抛错而崩溃。同时错误中引用的 `withSession` API 在当前版本中并不存在。

**重要性:**  
- 影响扩展兼容性和 Web UI 使用体验。  
- 暴露 API 文档、错误提示与实际发布版本之间可能不一致。  
- 对扩展开发者影响较大。

**社区反应:**  
评论数 2，涉及多个第三方扩展。

---

### 5. 运行中变更工具集导致系统提示头移动并重新计费  
**Issue:** [#10024](https://github.com/earendil-works/pi/issues/10024)  
**状态:** Closed  
**作者:** tinoy1336  

在 run 进行中改变已选工具集，会导致系统 prompt 的头部位置变化，使下一次请求从该位置重新计费。

**重要性:**  
- 涉及 token 计费、上下文缓存和 prompt 稳定性。  
- 对使用长上下文和付费模型的用户影响较大。  
- 指向工具选择应在 run 生命周期内冻结的问题。

**社区反应:**  
评论数 2，属于成本与上下文一致性相关的重要缺陷。

---

### 6. OpenRouter 压缩/摘要请求丢失 x-session-id  
**Issue:** [#10022](https://github.com/earendil-works/pi/issues/10022)  
**状态:** Closed  
**作者:** Shoshkin  

OpenRouter 的 compaction 与 branch-summary 请求在 `cacheRetention: "none"` 时未携带 `x-session-id`，导致日志中 `session_id: null`，无法归入对应会话，也无法获得 sticky routing。

**重要性:**  
- 影响 OpenRouter 用户的日志追踪、分析和路由稳定性。  
- 对多请求链路可观测性和账单排查很关键。  

**社区反应:**  
评论数 2，问题定位较清晰。

---

### 7. Anthropic subscription 在整点/半点 UTC 附近挂起  
**Issue:** [#10019](https://github.com/earendil-works/pi/issues/10019)  
**状态:** Closed  
**作者:** brianh014  

使用 Anthropic subscription 时，Pi 偶发冻结，服务端返回 200 和 ping，但没有 `message_start`。用户需要手动取消或重启会话。

**重要性:**  
- 影响 Anthropic 订阅用户稳定性。  
- 指向流式响应处理应对异常 SSE 状态的容错能力。  
- 与 Claude Code 对比时暴露出体验差距。

**社区反应:**  
评论数 2，属于 Provider 兼容性重点问题。

---

### 8. Bash 截断提示对超长最后一行报告 0B  
**Issue:** [#10015](https://github.com/earendil-works/pi/issues/10015)  
**状态:** Closed  
**作者:** init-new-world  

当 bash 输出最后一条有内容行超过 50KB 且以换行结尾时，Pi 的截断提示错误显示为 0B。

**重要性:**  
- 影响工具输出可读性和调试准确性。  
- 对处理大日志、大文件输出的 agent 场景较常见。  

**社区反应:**  
评论数 2，复现步骤明确。

---

### 9. 扩展 console.error 破坏交互式 TUI  
**Issue:** [#10002](https://github.com/earendil-works/pi/issues/10002)  
**状态:** Open  
**作者:** autopeasant  

扩展在交互式 Pi 会话中调用 `console.error()` 时，会直接写入终端，绕过 Pi 的 TUI renderer，造成布局错乱，直到下一次 redraw 才可能恢复。

**重要性:**  
- 当前仍为 Open，是值得继续关注的问题。  
- 影响扩展开发调试体验。  
- 说明扩展 stdout/stderr 需要被隔离、捕获或重定向到 Pi 内部日志系统。  

**社区反应:**  
评论数 1，但问题对扩展生态基础设施较关键。

---

### 10. triggerTurn follow-up 在 run abort 后滞留  
**Issue:** [#10017](https://github.com/earendil-works/pi/issues/10017)  
**状态:** Open  
**作者:** HyeokjaeLee  

当 run 正在 streaming 时调用 `sendMessage(..., { deliverAs: "followUp", triggerTurn: true })`，如果当前 run 被 abort，follow-up 会留在低层队列中，直到下一次用户输入才会被读取。

**重要性:**  
- 当前仍为 Open，但已有对应 PR。  
- 影响 agent 自动续跑、扩展驱动对话和异步任务编排。  
- 属于事件循环和会话调度层面的核心问题。

**社区反应:**  
暂无评论，但技术影响面较大。

---

## 4. 重要 PR 进展

> 过去 24 小时共有 7 条 PR 更新，未达到 10 条，因此以下覆盖全部重要 PR。

### 1. 流式鲁棒性、reasoning 限制、压缩有效性与编辑恢复修复  
**PR:** [#10027](https://github.com/earendil-works/pi/pull/10027)  
**状态:** Closed  
**作者:** rahulrajaram  

该 PR 汇总了多个在日常使用 OpenAI-compatible providers，尤其是 OpenRouter 和本地网关时发现的修复，覆盖 streaming robustness、reasoning clamp、compaction validity 和 edit recovery。

**价值:**  
- 提升 OpenAI-compatible provider 的可靠性。  
- 改善长会话、压缩和编辑恢复路径。  
- 对高频使用 Pi 的开发者较有实际意义。

---

### 2. Bash heredoc 与内联脚本高亮  
**PR:** [#10021](https://github.com/earendil-works/pi/pull/10021)  
**状态:** Open  
**作者:** mitsuhiko  

为 bash 调用中的 heredoc 和 inline scripts 增加语法高亮。作者指出新一代 Opus/Fable 模型有时更倾向直接生成脚本而非使用内置 edit 工具。

**价值:**  
- 改善 TUI 中复杂 shell 片段的可读性。  
- 适配模型使用行为变化。  
- 有助于用户审查 agent 即将执行的脚本。

---

### 3. HTML 导出支持隐藏消息切换  
**PR:** [#10020](https://github.com/earendil-works/pi/pull/10020)  
**状态:** Closed  
**作者:** rwachtler  

为 HTML exports 增加隐藏 `CustomMessage` 的显示/隐藏按钮，并保留工具与 thinking toggle 的状态。

**价值:**  
- 改善会话导出后的可读性和审查体验。  
- 对分享、归档、调试长会话有帮助。  
- 修复关联 Issue [#8896](https://github.com/earendil-works/pi/issues/8896)。

---

### 4. abort 后存在 wake follow-up 时恢复运行  
**PR:** [#10016](https://github.com/earendil-works/pi/pull/10016)  
**状态:** Open  
**作者:** HyeokjaeLee  

修复 `triggerTurn` follow-up 在当前 run abort 后无法被消费的问题。该 PR 与 Issue [#10017](https://github.com/earendil-works/pi/issues/10017) 对应。

**价值:**  
- 改善 agent loop 的调度可靠性。  
- 对扩展、自动任务和异步 follow-up 场景非常重要。  
- 当前仍 Open，值得继续跟踪。

---

### 5. 新增 pi-otel OTLP/HTTP exporter  
**PR:** [#10009](https://github.com/earendil-works/pi/pull/10009)  
**状态:** Closed  
**作者:** turian  

新增 `@earendil-works/pi-otel` 包，为现有 telemetry contract 提供 OTLP/HTTP exporter，实现 Issue [#10006](https://github.com/earendil-works/pi/issues/10006)。

**价值:**  
- 强化 Pi 的可观测性能力。  
- 支持与 OpenTelemetry 生态集成。  
- 对企业、本地网关和复杂 agent 部署很有意义。

---

### 6. 修复并行工具调用 abort 时 tool_result 丢失  
**PR:** [#9995](https://github.com/earendil-works/pi/pull/9995)  
**状态:** Closed  
**作者:** xrwang8  

修复 `executeToolCallsParallel` 在 abort 信号触发后，尚未执行到的工具调用没有生成 synthetic error result，导致 `tool_use` block 缺少对应 `tool_result` 的问题。

**价值:**  
- 保证工具调用协议完整性。  
- 避免模型上下文中出现不匹配的 tool_use / tool_result。  
- 对 Anthropic 等严格要求工具结果匹配的 API 尤为重要。

---

### 7. Google Vertex AI Provider 支持 Anthropic Claude  
**PR:** [#9993](https://github.com/earendil-works/pi/pull/9993)  
**状态:** Closed  
**作者:** unrealandychan  

为 Google Vertex AI provider 增加 Anthropic Claude 模型支持，包括 Claude Opus、Claude Sonnet、Claude Haiku 等。

**价值:**  
- 扩展企业用户通过 Google Cloud 使用 Claude 的路径。  
- 增强 Pi 多 Provider、多模型兼容性。  
- 对已经使用 ADC 或 Google Cloud API key 的团队很实用。

---

## 5. 功能需求趋势

### 1. Provider 与模型兼容性持续升温

相关 Issues / PR：  
- [#10019](https://github.com/earendil-works/pi/issues/10019) Anthropic subscription 流式挂起  
- [#10022](https://github.com/earendil-works/pi/issues/10022) OpenRouter session id 丢失  
- [#10010](https://github.com/earendil-works/pi/issues/10010) opencode-go 模型目录过期  
- [#9993](https://github.com/earendil-works/pi/pull/9993) Vertex AI 支持 Anthropic Claude  

社区对多 Provider 支持的要求正在从“能调用”转向“稳定、可观测、可计费追踪、支持最新模型”。

---

### 2. 会话生命周期与 agent loop 稳定性成为核心关注点

相关 Issues / PR：  
- [#9997](https://github.com/earendil-works/pi/issues/9997) shutdown handler 卡死  
- [#10017](https://github.com/earendil-works/pi/issues/10017) follow-up 在 abort 后滞留  
- [#10016](https://github.com/earendil-works/pi/pull/10016) abort 后恢复 queued follow-up  
- [#10000](https://github.com/earendil-works/pi/issues/10000) 首轮失败时 session 文件未写入  

开发者越来越关注 Pi 在异常中断、首轮失败、退出清理、异步 follow-up 等边界场景下的可恢复性。

---

### 3. 工具调用一致性与协议正确性需求增强

相关 Issues / PR：  
- [#9994](https://github.com/earendil-works/pi/issues/9994) 并行工具 abort 时丢 tool_result  
- [#9995](https://github.com/earendil-works/pi/pull/9995) 修复 tool_result drop  
- [#10003](https://github.com/earendil-works/pi/issues/10003) Anthropic Messages 转换产生相邻 user messages  
- [#10024](https://github.com/earendil-works/pi/issues/10024) 工具集变化导致系统 prompt 变动和重新计费  

这类问题说明 Pi 用户已经在复杂 agent 工作流中频繁触发协议边界，工具调用的“形式正确性”变得和功能本身同样重要。

---

### 4. 扩展生态需要更稳定的运行沙箱与 API

相关 Issues：  
- [#10025](https://github.com/earendil-works/pi/issues/10025) stale context 与不存在的 `withSession` API  
- [#10002](https://github.com/earendil-works/pi/issues/10002) 扩展 console 输出破坏 TUI  
- [#10012](https://github.com/earendil-works/pi/issues/10012) PiManifest 支持 `agents` 资源类型  
- [#10013](https://github.com/earendil-works/pi/issues/10013) `pi-ai` OAuth flows 以 subpaths 导出  

扩展开发者希望获得更稳定的 API、更清晰的生命周期、更完整的资源分发机制，以及更安全的输出隔离。

---

### 5. 可观测性与审计能力需求明显上升

相关 Issues / PR：  
- [#10006](https://github.com/earendil-works/pi/issues/10006) 请求新增 OTLP/HTTP exporter  
- [#10009](https://github.com/earendil-works/pi/pull/10009) 新增 `pi-otel`  
- [#10001](https://github.com/earendil-works/pi/issues/10001) 导出构建 OpenAI completions 请求体的函数  
- [#10020](https://github.com/earendil-works/pi/pull/10020) HTML 导出支持隐藏消息切换  

用户不仅需要运行 agent，还需要审计请求、追踪 session、导出日志、分析成本与复现问题。

---

## 6. 开发者关注点

### 1. 稳定退出与异常恢复仍是痛点

多个 Issue 指向退出、abort、shutdown、session_start 等生命周期边界问题。开发者希望 Pi 在扩展失控、Provider 卡住或用户中断时，能够给出明确反馈，并保证 session、工具结果和终端状态不会损坏。

代表链接：  
- [#9997](https://github.com/earendil-works/pi/issues/9997)  
- [#10026](https://github.com/earendil-works/pi/issues/10026)  
- [#10017](https://github.com/earendil-works/pi/issues/10017)  

---

### 2. Token 成本与上下文稳定性受到高度关注

工具集变化导致系统 prompt 位置移动、超大项目消耗千万级 token、首轮失败导致 session 丢失等问题，说明用户非常关心成本可控性与上下文可解释性。

代表链接：  
- [#10024](https://github.com/earendil-works/pi/issues/10024)  
- [#9998](https://github.com/earendil-works/pi/issues/9998)  
- [#10000](https://github.com/earendil-works/pi/issues/10000)  

---

### 3. 多模型、多 Provider 支持进入深水区

社区不仅要求支持最新模型，还要求兼容各 Provider 的特殊行为，例如 Anthropic SSE、OpenRouter session routing、Vertex AI 上的 Claude、opencode-go 模型 catalog 更新等。

代表链接：  
- [#10019](https://github.com/earendil-works/pi/issues/10019)  
- [#10022](https://github.com/earendil-works/pi/issues/10022)  
- [#10010](https://github.com/earendil-works/pi/issues/10010)  
- [#9993](https://github.com/earendil-works/pi/pull/9993)  

---

### 4. TUI 体验需要更强隔离与可读性

终端光标隐藏、扩展日志污染 TUI、tool rows 过多、heredoc 高亮等反馈显示，Pi 的 TUI 已成为开发者日常工作核心界面，渲染稳定性和可读性需要持续优化。

代表链接：  
- [#10002](https://github.com/earendil-works/pi/issues/10002)  
- [#10011](https://github.com/earendil-works/pi/issues/10011)  
- [#10021](https://github.com/earendil-works/pi/pull/10021)  
- [#10026](https://github.com/earendil-works/pi/issues/10026)  

---

### 5. 扩展与包生态需要标准化能力

开发者希望 Pi 包可以声明 agent definitions，`pi-ai` 可以提供更细粒度 subpath exports，OAuth、telemetry、request payload 构建等能力也需要以稳定 API 暴露。

代表链接：  
- [#10012](https://github.com/earendil-works/pi/issues/10012)  
- [#10013](https://github.com/earendil-works/pi/issues/10013)  
- [#10001](https://github.com/earendil-works/pi/issues/10001)  
- [#10009](https://github.com/earendil-works/pi/pull/10009)  

---

## 总结

今日 Pi 社区的主线不是新功能发布，而是围绕 **稳定性、Provider 兼容性、工具协议正确性、扩展生态和可观测性** 的集中修复与讨论。当前最值得继续跟踪的是仍处于 Open 状态的 [#10017](https://github.com/earendil-works/pi/issues/10017)、[#10016](https://github.com/earendil-works/pi/pull/10016)、[#10021](https://github.com/earendil-works/pi/pull/10021) 和 [#10002](https://github.com/earendil-works/pi/issues/10002)，它们分别对应 agent loop 调度、TUI 可读性和扩展输出隔离等关键能力。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报｜2026-09-25

## 1. 今日速览

过去 24 小时，Qwen Code 发布了 **v0.24.5**，并同步推出 **Desktop v0.24.5** 与 **TypeScript SDK v0.1.15**，重点覆盖 channels 权限解耦、Java SDK Hosted Harness、托管运行时与若干稳定性修复。  
社区讨论集中在 **安装/自更新可靠性、Web Shell 会话管理、Runtime Broker、Managed Runtime、VS Code 多根工作区支持** 等方向，其中两个 P1 问题值得优先关注：自更新后 ripgrep 失去执行权限，以及 shell-mode 并发模型回合问题。  
PR 侧持续活跃，Runtime v2 tool operations、Web Shell 状态持久化、Linux 剪贴板错误提示、`@` 引用失败可见性、CI 稳定性与 Desktop 包结构调整都有新进展。

---

## 2. 版本发布

### v0.24.5

链接：[Release v0.24.5](https://github.com/QwenLM/qwen-code/releases/tag/v0.24.5)

本次正式版声明 **无已知 Breaking Changes**。

主要变化：

- **channels 权限模型调整**
  - `feat(channels): decouple group-member access from senderPolicy`
  - 将 group-member 访问控制与 `senderPolicy` 解耦，有助于后续更灵活地管理 channel 访问与发送策略。
  - 相关 PR：[QwenLM/qwen-code#12475](https://github.com/QwenLM/qwen-code/pull/12475)

---

### v0.24.5-nightly.20260924.ffea2d024e

链接：[Nightly Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.24.5-nightly.20260924.ffea2d024e)

主要变化：

- Java SDK 新增 Hosted Harness private client
  - 相关 PR：[QwenLM/qwen-code#12654](https://github.com/QwenLM/qwen-code/pull/12654)
- Java 测试侧继续固定 Runtime Broker guard 行为，提升托管运行时相关测试的确定性。

---

### SDK TypeScript v0.1.15

链接：[sdk-typescript-v0.1.15](https://github.com/QwenLM/qwen-code/releases/tag/sdk-typescript-v0.1.15)

主要变化：

- TypeScript SDK 随包绑定 CLI 版本 **0.24.5**。
- 说明中也出现历史 bundled CLI 版本记录，表明 SDK 发布流程继续与 CLI 构建版本保持联动。

---

### Qwen Code Desktop v0.24.5

链接：[desktop-v0.24.5](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.24.5)

主要变化：

- 修复 Serve session 创建失败时诊断信息丢失问题。
  - 相关 PR：[QwenLM/qwen-code#12331](https://github.com/QwenLM/qwen-code/pull/12331)
- 引入 Java SDK / managed runtime 相关能力，为 Desktop 与托管执行环境整合继续铺路。

---

## 3. 社区热点 Issues

### 1. 自更新后 vendored ripgrep 丢失执行权限，导致 EACCES

- Issue：[QwenLM/qwen-code#12668](https://github.com/QwenLM/qwen-code/issues/12668)
- 状态：OPEN
- 标签：P1、bug、platform、installation、packaging
- 评论：4

该问题发生在自更新安装路径 `~/.qwen/updates/npm/.../versions/0.24.5/` 下，vendored ripgrep binary 丢失 executable bit，导致所有 ripgrep 调用失败。  
重要性很高，因为 ripgrep 是代码搜索与上下文构建的基础依赖，一旦不可用会直接影响 CLI / IDE / agent 的代码理解能力。社区已有多轮反馈，建议作为 v0.24.5 之后的高优先级补丁处理。

---

### 2. Shell-mode 命令执行期间未保持 session busy，可能引入并发模型回合

- Issue：[QwenLM/qwen-code#12664](https://github.com/QwenLM/qwen-code/issues/12664)
- 状态：OPEN
- 标签：P1、bug、ui、interactive、session-management、shell
- 评论：3

用户通过 `!` shell 模式提交命令时，命令运行期间 `streamingState` 仍显示为 `Idle`，导致队列 drain 机制可能允许下一条消息进入模型回合，形成并发写入或状态竞争。  
该问题影响交互式 CLI 的一致性与安全性，尤其是在 shell 命令修改工作区或产生长时间输出时。虽然评论数不高，但优先级已标为 P1，值得核心维护者尽快处理。

---

### 3. Runtime Broker 在主机重启场景下 LOST binding 被永久 pin 住

- Issue：[QwenLM/qwen-code#12670](https://github.com/QwenLM/qwen-code/issues/12670)
- 状态：OPEN
- 标签：P2、bug、core、daemon、sdk、need-discussion
- 评论：3

在 Runtime Broker 与 worker 被强杀、dispatch lease 过期后，新 Broker 仍可能卡在 LOST binding 状态，影响执行恢复。  
该问题暴露了 Runtime Broker 对异常中断、主机重启和执行证据恢复的边界处理不足。随着 Managed Runtime 和 Hosted Harness 能力推进，这类可靠性问题会变得越来越关键。

---

### 4. VS Code multi-root workspace 下 daemon shell guard 只支持单目录

- Issue：[QwenLM/qwen-code#12628](https://github.com/QwenLM/qwen-code/issues/12628)
- 状态：OPEN
- 标签：P2、feature-request、cli、shell、trusted-folders、vscode、ide-integration、daemon
- 评论：4

当前 Qwen Code 在 VS Code 多根工作区中只绑定第一个 folder，其他 folder 中的写操作或 git 命令会被 daemon shell guard 拦截。  
该需求直接关系到 IDE 集成可用性。多仓库、多包 monorepo、多服务项目是开发者常见工作流，因此 multi-root 支持很可能成为 IDE roadmap 中的重要能力。

---

### 5. Live Voice session 中点击 New task 错误调用 `/live/new`

- Issue：[QwenLM/qwen-code#12620](https://github.com/QwenLM/qwen-code/issues/12620)
- 状态：OPEN
- 标签：P2、bug、ui、session-management、web-shell
- 评论：4

当浏览器处于 Live Voice session 页面时，点击 **New task** 会发送 `POST /live/new`，而不是创建普通 session。如果 Live Voice 当前不可用，用户只看到 “Live Voice is unavailable” toast。  
这属于 Web Shell 会话路由与 UI 状态耦合问题，影响新任务入口的可靠性，也反映出 Live 模式与普通任务模式之间仍需更清晰的边界。

---

### 6. Web Shell / Desktop 不能删除当前选中的 session

- Issue：[QwenLM/qwen-code#12619](https://github.com/QwenLM/qwen-code/issues/12619)
- 状态：OPEN
- 标签：P2、bug、ui、session-management、web-shell
- 评论：4

当前 Web Shell 和 Desktop 中，被选中的 session 无法删除，sidebar 会禁用 active row 的删除操作。  
这是一个高频工作流问题：用户通常先打开 session 查看内容，再决定是否删除。该问题已经衍生出后续设计讨论与 follow-up issue，说明社区对 session 管理体验较为敏感。

---

### 7. 需要真正禁用 auto-compaction 的开关

- Issue：[QwenLM/qwen-code#12597](https://github.com/QwenLM/qwen-code/issues/12597)
- 状态：OPEN
- 标签：P2、feature-request、configuration、token-management、context-performance
- 评论：4

用户希望新增明确配置，例如：

```json
{
  "context": {
    "autoCompaction": {
      "enabled": false
    }
  }
}
```

关闭后应跳过 warn / auto / hard 三层自动压缩，仅保留手动 `/compact`。  
该需求说明部分开发者希望对上下文窗口、token 使用和压缩时机拥有更强控制权，尤其是在调试、审计或长任务场景中。

---

### 8. managed scratch workspace root 需要独立于 QWEN_HOME 配置

- Issue：[QwenLM/qwen-code#12618](https://github.com/QwenLM/qwen-code/issues/12618)
- 状态：OPEN
- 标签：P3、feature-request、configuration、settings、daemon、cli
- 评论：4

Qwen Serve 当前将 managed scratch workspace 放在 `$QWEN_HOME/scratch-workspaces` 下。当 `QWEN_HOME` 位于用户 home 下时，动态注册 home directory 作为 workspace 会与 managed scratch 支持产生冲突。  
该问题体现出企业部署、受控环境和本地开发环境之间对目录布局的不同要求。未来可能需要更细粒度的 workspace root / scratch root 配置策略。

---

### 9. MCP approval 空参数仍在 subtitle 显示 `{}`

- Issue：[QwenLM/qwen-code#12629](https://github.com/QwenLM/qwen-code/issues/12629)
- 状态：OPEN
- 标签：P3、bug、ui、mcp、web-shell
- 评论：3

此前 PR 已移除 card body 中的 `{}`，但真实环境验证发现 subtitle 仍显示空参数 `{}`。  
虽然是 UI 细节问题，但 MCP approval 是用户确认工具调用的关键界面。空参数展示不清晰会降低可读性，并可能影响用户对工具调用内容的判断。

---

### 10. hosted endpoint 不需要 API Key 时如何配置 modelProviders

- Issue：[QwenLM/qwen-code#12662](https://github.com/QwenLM/qwen-code/issues/12662)
- 状态：OPEN
- 标签：P3、documentation、configuration、integration
- 评论：3

用户询问如果 hosted endpoint 从不要求 key，应如何放入 `modelProviders`，因为当前配置模型中每个 provider 都带有 `envKey`。  
该问题本质上是模型提供方配置文档的缺口。随着私有部署、企业内网 endpoint 和免密网关增多，Qwen Code 需要更清楚地说明无凭证或外部认证场景的配置方式。

---

## 4. 重要 PR 进展

### 1. Web Shell 未读 completion 标记跨刷新持久化

- PR：[QwenLM/qwen-code#12672](https://github.com/QwenLM/qwen-code/pull/12672)
- 状态：OPEN
- 作者：zonemeen

该 PR 将 Web Shell sidebar 中已观察到的 unread completion markers 存入 `localStorage`，使页面刷新后仍能保留未读完成状态。打开 session 或开始新 turn 会清除对应 marker，并且清除状态同样跨刷新保留。  
这是会话体验改进，尤其适合长时间运行任务、多 session 并行观察等场景。

---

### 2. Managed Runtime worker 挂载 v2 tool operations

- PR：[QwenLM/qwen-code#12671](https://github.com/QwenLM/qwen-code/pull/12671)
- 状态：OPEN
- 作者：doudouOUC

该 PR 将 v2 `execute` / `status` / `cancel` 操作挂载到 Managed Runtime worker，与 `attest` 并列。首批支持普通工具包括：

- `read_file`
- `write_file`
- `edit`
- foreground `run_shell_command`

这是 Managed Runtime 执行能力落地的重要一步，意味着托管 worker 将不只是 attestation 目标，而开始承载真实工具执行生命周期。

---

### 3. Linux 剪贴板工具存在但查询失败时给出通知

- PR：[QwenLM/qwen-code#12666](https://github.com/QwenLM/qwen-code/pull/12666)
- 状态：OPEN
- 作者：yiliang114

在 Linux 上，如果检测到 `wl-paste` 或 `xclip`，但实际查询剪贴板失败、超时或无法 spawn，之前图片粘贴会被静默吞掉。  
该 PR 改为显式通知用户，提升 Linux 桌面环境下图片粘贴问题的可诊断性，尤其适用于 Wayland / X11 状态异常场景。

---

### 4. 被丢弃的 `@` 引用不再静默失败

- PR：[QwenLM/qwen-code#12665](https://github.com/QwenLM/qwen-code/pull/12665)
- 状态：OPEN
- 作者：SachinD6

当 `@` 引用因以下原因被 resolver 拒绝时，将向用户报告，而不是静默丢弃：

- 超出 workspace
- 校验与读取之间内容发生变化
- 快照失败
- 文件不可读或不存在
- 被 git / qwen ignore 过滤
- server reference 无法解析

该改动提升了上下文构建透明度，有助于开发者理解模型为什么“没看到”某些文件。

---

### 5. TypeScript SDK v0.1.15 自动发布 PR

- PR：[QwenLM/qwen-code#12663](https://github.com/QwenLM/qwen-code/pull/12663)
- 状态：CLOSED
- 作者：qwen-code-ci-bot

自动发布 TypeScript SDK v0.1.15，绑定 CLI 0.24.5。  
该 PR 说明 SDK 发布链路继续与 CLI release 自动化联动，有助于下游集成保持版本一致。

---

### 6. v0.24.5 自动发布 PR

- PR：[QwenLM/qwen-code#12661](https://github.com/QwenLM/qwen-code/pull/12661)
- 状态：CLOSED
- 作者：qwen-code-review-bot

自动发布 v0.24.5，负责同步 package 版本与 CHANGELOG。  
这是本日正式版本发布的主流程 PR，标志 v0.24.5 已进入主线发布状态。

---

### 7. 本地 review round 无法 anchor 时仍持久化 findings ledger

- PR：[QwenLM/qwen-code#12660](https://github.com/QwenLM/qwen-code/pull/12660)
- 状态：CLOSED
- 作者：wenshao

该 PR 修复本地或 file-path review round 无法 anchor cache 时 findings ledger 丢失的问题。  
现在即使 working tree 移动、hash 过程中出现变化或 anchor 不可用，也会写入包含 findings ledger 的 cache candidate。该修复对应 Issue [#12657](https://github.com/QwenLM/qwen-code/issues/12657)，提升自动 review / audit 流程的可追溯性。

---

### 8. Java Runtime Broker lease renewal 测试等待 advanced time 后续约

- PR：[QwenLM/qwen-code#12656](https://github.com/QwenLM/qwen-code/pull/12656)
- 状态：OPEN
- 作者：wenshao

该 PR 修复 `RuntimeBrokerServiceTest` 中两个 lease renewal 测试的竞态问题，避免 macOS SDK Java job 出现非相关失败。  
虽然是测试修复，但对 Runtime Broker 的 CI 稳定性很重要，特别是在 Managed Runtime 相关 PR 增多后，测试 flakiness 会显著拖慢合并效率。

---

### 9. Java Runtime evidence 用于调和 UNKNOWN tool executions

- PR：[QwenLM/qwen-code#12655](https://github.com/QwenLM/qwen-code/pull/12655)
- 状态：CLOSED
- 作者：wenshao

该 PR 实现 Stage C original-execution lookup 与 `UNKNOWN` execution reconciliation，基于 Runtime evidence 恢复工具执行状态。  
这与 Runtime Broker / Managed Runtime 的可靠执行语义密切相关，有助于在异常状态下提升执行记录的准确性。

---

### 10. Java SDK 新增 Hosted Harness private client

- PR：[QwenLM/qwen-code#12654](https://github.com/QwenLM/qwen-code/pull/12654)
- 状态：CLOSED
- 作者：doudouOUC

该 PR 添加 Java control-plane transport，用于 Hosted Harness private protocol。初始化 `HostedHarnessClient` 时会进行：

- capability negotiation
- capability digest 校验
- process boot identity pinning

该能力进入 nightly release，说明 Hosted Harness / 托管执行环境正在从协议设计推进到 SDK 客户端落地阶段。

---

## 5. 功能需求趋势

### 1. IDE 集成与多工作区支持

代表 Issue：

- [#12628：VS Code multi-root workspace 支持](https://github.com/QwenLM/qwen-code/issues/12628)

社区开始从“单项目目录”使用方式转向更复杂的 IDE 场景。多根 workspace、trusted folders、daemon shell guard 的协同会成为 IDE integration 的关键议题。

---

### 2. 会话管理体验持续成为 Web Shell / Desktop 重点

代表 Issues：

- [#12620：Live Voice session 中 New task 路由错误](https://github.com/QwenLM/qwen-code/issues/12620)
- [#12619：不能删除当前选中的 session](https://github.com/QwenLM/qwen-code/issues/12619)
- [#12669：当前 no-workspace session 删除流程改进](https://github.com/QwenLM/qwen-code/issues/12669)

Web Shell 和 Desktop 正在承担更多主界面职责，社区关注点从“功能可用”转向“会话生命周期是否符合直觉”。

---

### 3. Runtime Broker / Managed Runtime 可靠性

代表 Issues / PR：

- [#12670：LOST binding 被永久 pin](https://github.com/QwenLM/qwen-code/issues/12670)
- [#12671：Managed Runtime worker 挂载 v2 tool operations](https://github.com/QwenLM/qwen-code/pull/12671)
- [#12655：从 Runtime evidence 调和 UNKNOWN executions](https://github.com/QwenLM/qwen-code/pull/12655)

托管运行时相关工作正在进入执行路径与异常恢复阶段。接下来重点可能包括 lease、reconciliation、crash recovery、host reboot、worker lifecycle 等。

---

### 4. 配置系统更细粒度化

代表 Issues：

- [#12597：真正禁用 auto-compaction](https://github.com/QwenLM/qwen-code/issues/12597)
- [#12618：scratch workspace root 独立配置](https://github.com/QwenLM/qwen-code/issues/12618)
- [#12662：无 API Key hosted endpoint 的 modelProviders 配置](https://github.com/QwenLM/qwen-code/issues/12662)

开发者希望 Qwen Code 在上下文压缩、工作区目录、模型 provider 认证方式上提供更可控、更明确的配置能力。

---

### 5. 可观测性与错误反馈增强

代表 PR / Issues：

- [#12665：报告 dropped @-references](https://github.com/QwenLM/qwen-code/pull/12665)
- [#12666：Linux clipboard query 失败时通知](https://github.com/QwenLM/qwen-code/pull/12666)
- [#12606：/context 估算状态展示误导](https://github.com/QwenLM/qwen-code/issues/12606)

社区明显不满足于“失败但无提示”的体验，更希望工具能解释上下文为何缺失、操作为何失败、估算信息是否可靠。

---

### 6. 安装、打包与发布链路稳定性

代表 Issues / PR：

- [#12668：自更新后 ripgrep 执行权限丢失](https://github.com/QwenLM/qwen-code/issues/12668)
- [#12649：pin linux-arm64 node-pty prebuild 并在 release 缺失时失败](https://github.com/QwenLM/qwen-code/pull/12649)
- [#12650：yamllint fallback 到 pinned 版本](https://github.com/QwenLM/qwen-code/pull/12650)
- [#12648：CI checkout 前信任 workspace safe.directory](https://github.com/QwenLM/qwen-code/pull/12648)

跨平台二进制、self-update、CI runner 环境差异仍是 Qwen Code 工程化中的高频风险点。

---

## 6. 开发者关注点

### 安装后基础工具不可用是最高优先级痛点

`ripgrep` 权限丢失会直接破坏代码搜索与上下文收集链路。对于 AI 编程工具而言，这类底层依赖不可用会被用户感知为“模型能力下降”或“工具不可用”，需要在 packaging / self-update 流程中增加权限保持与安装后校验。

相关链接：[Issue #12668](https://github.com/QwenLM/qwen-code/issues/12668)

---

### 交互式会话需要更严格的并发状态控制

shell-mode 未设置 busy 导致模型回合并发进入，说明 CLI / Web Shell / daemon 之间的 session state machine 仍需统一。开发者期望命令执行、模型 streaming、队列 drain、用户输入之间有清晰的互斥规则。

相关链接：[Issue #12664](https://github.com/QwenLM/qwen-code/issues/12664)

---

### Web Shell 用户体验问题正在集中浮现

包括当前 session 删除、Live Voice 与 New task 路由冲突、MCP approval 空参数展示、completion marker 刷新丢失等。  
这说明 Web Shell 正逐渐成为高频入口，用户已经开始关注细节一致性、状态持久化和信息展示质量。

相关链接：

- [Issue #12619](https://github.com/QwenLM/qwen-code/issues/12619)
- [Issue #12620](https://github.com/QwenLM/qwen-code/issues/12620)
- [Issue #12629](https://github.com/QwenLM/qwen-code/issues/12629)
- [PR #12672](https://github.com/QwenLM/qwen-code/pull/12672)

---

### 企业化 / 托管运行时能力进入深水区

Hosted Harness、Managed Runtime、Runtime Broker、execution reconciliation 等工作持续推进，但同时也暴露 host reboot、lease、LOST binding、UNKNOWN execution 等复杂问题。  
这类问题不只是 bug，更关系到 Qwen Code 能否在受控环境、远程 worker 和企业 agent 平台中稳定运行。

相关链接：

- [PR #12654](https://github.com/QwenLM/qwen-code/pull/12654)
- [PR #12671](https://github.com/QwenLM/qwen-code/pull/12671)
- [Issue #12670](https://github.com/QwenLM/qwen-code/issues/12670)

---

### 开发者希望“失败可解释”，而不是静默降级

`@` 引用被丢弃、剪贴板查询失败、`/context` token 估算展示异常等问题共同指向一个趋势：开发者需要更透明的上下文与工具调用诊断。  
对于 AI coding agent，输入上下文的完整性直接影响输出质量，因此可观测性本身就是核心功能。

相关链接：

- [PR #12665](https://github.com/QwenLM/qwen-code/pull/12665)
- [PR #12666](https://github.com/QwenLM/qwen-code/pull/12666)
- [Issue #12606](https://github.com/QwenLM/qwen-code/issues/12606)

---

### 配置灵活性成为高级用户的主要诉求

禁用 auto-compaction、配置 scratch workspace root、支持无 API Key provider 等反馈表明，高级用户和企业用户希望将 Qwen Code 纳入自己的运行规范中，而不是被固定默认行为约束。

相关链接：

- [Issue #12597](https://github.com/QwenLM/qwen-code/issues/12597)
- [Issue #12618](https://github.com/QwenLM/qwen-code/issues/12618)
- [Issue #12662](https://github.com/QwenLM/qwen-code/issues/12662)

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报｜2026-09-25

## 1. 今日速览

过去 24 小时没有新版本发布，但 Issue 与 PR 活动非常密集：社区重点集中在 **子代理上下文/压缩、首次运行体验、配置校验、凭据处理、Web 搜索质量、模型选择器与 Token 成本优化**。  
维护者在一天内关闭了多项关键缺陷 PR，同时新增了一批系统性审计 Issue，显示项目正在从功能扩展转向 **稳定性、可观测性、配置治理和长任务可靠性** 的强化阶段。

---

## 3. 社区热点 Issues

### 1. #6504 子代理 100k 单步输入上限导致任务被杀死，且不会像父任务一样压缩继续  
链接：https://github.com/Hmbown/DeepSeek-TUI/issues/6504  
状态：Closed｜评论：3｜👍：0

该问题是过去 24 小时讨论最多的 Issue。核心问题是子代理在 `deepseek-flash` 这类大上下文模型下，仍被 `MAX_CHILD_STEP_INPUT_TOKENS = 100_000` 限制，导致长探索任务直接失败。  
重要性在于它影响多代理工作流的可靠性：父代理可以 compact 后继续，而子代理不能，行为不一致。该问题已关闭，说明已有对应修复或处理路径。

---

### 2. #6566 首次运行体验缺失：新用户看不到 onboarding，首条消息可能丢失或重复  
链接：https://github.com/Hmbown/DeepSeek-TUI/issues/6566  
状态：Open｜评论：0｜👍：0

这是面向新用户体验的关键问题。审计发现首次运行没有清晰 onboarding，provider picker、key error、approval card 等界面偏开发者化。  
重要性在于它直接影响转化率和上手体验，尤其是终端 AI 工具对首次配置 API Key、模型、权限审批的引导要求较高。

---

### 3. #6565 后台任务状态展示混乱：footer 显示 step chatter，agent 名称不一致  
链接：https://github.com/Hmbown/DeepSeek-TUI/issues/6565  
状态：Open｜评论：0｜👍：0

该 Issue 指向后台代理执行时的可观测性问题：footer、右侧状态、agent 名称和 needs-you 状态之间不一致。  
这对长任务、多代理执行尤其重要，因为用户需要快速判断“谁在做什么、是否需要我处理、是否卡住”。当前反馈显示 UI 状态层仍需统一。

---

### 4. #6564 会话内设置管理：通过自然语言提出配置变更，并逐项审批  
链接：https://github.com/Hmbown/DeepSeek-TUI/issues/6564  
状态：Open｜评论：0｜👍：0

这是一个重要功能方向：用户不再手动编辑配置文件，而是通过 `/settings <what you want>` 描述需求，由工具生成具体配置变更，并通过 approval card 逐项确认。  
它反映出项目正在尝试把配置管理从“CLI/文件驱动”升级为“对话式、可审计、可回滚”的交互模型。

---

### 5. #6563 `codewhale config set` 会静默接受拼写错误和未知 key  
链接：https://github.com/Hmbown/DeepSeek-TUI/issues/6563  
状态：Open｜评论：0｜👍：0

配置写入缺少 schema 校验，会导致用户写入无效配置却没有任何提示。例如 `flase` 或未知 key 都能成功落盘。  
这是典型的开发者体验和可靠性问题：配置错误不会立即暴露，而是在运行时表现为“设置无效”。该 Issue 已有对应 PR #6568 跟进。

---

### 6. #6562 MCP 与插件的 Code Mode：发现机制、类型绑定与统一权限门控  
链接：https://github.com/Hmbown/DeepSeek-TUI/issues/6562  
状态：Open｜评论：0｜👍：0

该设计 Issue 关注 MCP 和插件在 Code Mode 下的集成方式，包括不重复 pin schema、通过共享 gate 进行类型化绑定。  
重要性在于 MCP 调用虽然占比不高，但 schema token 成本明显，且工具调用权限、安全边界、类型提示都与未来扩展能力相关。

---

### 7. #6542 高频工具错误：edit old-text mismatch、cwd 越界、无 goal 时 update_goal  
链接：https://github.com/Hmbown/DeepSeek-TUI/issues/6542  
状态：Open｜评论：0｜👍：0

该 Issue 来自 token-efficiency audit，指出工具调用错误率约 5%，其中 edit mismatch、子代理 cwd 写入范围冲突、无目标时更新 goal 是主要来源。  
这类问题会直接浪费 token、降低自动化成功率，也影响用户对 agent 执行能力的信任。已有 PR #6548 对部分错误提示和行为进行修复。

---

### 8. #6541 Token 效率：请求级用量遥测、基于成本的压缩触发、稳定工具列表  
链接：https://github.com/Hmbown/DeepSeek-TUI/issues/6541  
状态：Open｜评论：0｜👍：0

该 Issue 给出了非常关键的成本画像：`deepseek-flash` 占 94.8% 的 3.55B tokens，平均请求约 363k tokens。  
重点方向包括 per-request telemetry、cost-based compaction、稳定工具列表和减少静态前缀。这说明项目进入大上下文模型的成本优化阶段，缓存命中率和 compaction 策略成为核心议题。

---

### 9. #6532 TinyFish 搜索后端与共享配额账本  
链接：https://github.com/Hmbown/DeepSeek-TUI/issues/6532  
状态：Closed｜评论：1｜👍：0

该 Issue 提议加入 TinyFish 作为 Web Search backend，并通过 SQLite ledger 管理 30/min、500/h、12000/day 的共享配额。  
重要性在于搜索能力正在从“是否可用”演进到“可控、可降级、可解释”。当配额耗尽时需要明确 fallback，而不是静默失败。

---

### 10. #6530 为所有 `config.toml` key 建立统一声明表，并提供一次性配置迁移  
链接：https://github.com/Hmbown/DeepSeek-TUI/issues/6530  
状态：Open｜评论：0｜👍：0

该 Issue 与 #6563、#6564 一起构成配置系统重构主线。目标是为所有配置 key 建立声明式 schema，并生成文档与 CLI 提示。  
重要性在于它可减少死配置、遗留配置和拼写错误，同时为未来对话式设置、迁移和校验打基础。

---

## 4. 重要 PR 进展

### 1. #6568 校验 `config set` 的设置值，防止拼写错误和未知 key  
链接：https://github.com/Hmbown/DeepSeek-TUI/pull/6568  
状态：Open

该 PR 直接修复 #6563，引入基于 `SETTINGS_SCHEMA` 的配置校验。  
它将阻止类似 `flase`、未知 key 等错误配置静默写入，是配置系统可靠性的重要补丁。

---

### 2. #6567 更新官网 header 与安装 hero，适配 GPUI beta 设计语言  
链接：https://github.com/Hmbown/DeepSeek-TUI/pull/6567  
状态：Closed

该 PR 更新官网视觉与安装入口，包括 header、图标控制、移动端菜单，以及 shell/npm 安装方式的复制体验。  
虽然不直接影响 TUI 核心，但对新用户引导和产品一致性有明显帮助。

---

### 3. #6552 修复 DSH 集成测试污染真实 `~/.codewhale/audit.log`  
链接：https://github.com/Hmbown/DeepSeek-TUI/pull/6552  
状态：Closed

该 PR 修复测试环境未使用 hermetic home，导致 integration audit 写入真实用户目录的问题。  
这是测试隔离和隐私安全层面的关键修复，避免开发者本地状态被测试污染。

---

### 4. #6551 修复 rustc 1.89 下 `#[expect(dead_code)]` 失败，并新增 MSRV CI  
链接：https://github.com/Hmbown/DeepSeek-TUI/pull/6551  
状态：Closed

该 PR 解决 #6543 中 rustc 1.89 编译失败问题，并加入 MSRV CI。  
意义在于提升构建矩阵稳定性，避免不同 Rust 版本下 lint 行为差异导致 main 分支变红。

---

### 5. #6550 处理粘贴 API Key 中的不可见字符，并增强鉴权错误信息  
链接：https://github.com/Hmbown/DeepSeek-TUI/pull/6550  
状态：Open

该 PR 修复 #6528：对粘贴的 API Key 进行规范化，移除 Unicode 空白、控制字符、BOM、ZWSP 等不可见字符。  
同时鉴权错误会明确 provider、host、key source 和修复建议，有助于降低新手配置失败率。

---

### 6. #6549 子代理预算耗尽时保留 deterministic digest 作为交付物  
链接：https://github.com/Hmbown/DeepSeek-TUI/pull/6549  
状态：Closed

该 PR 修复 #6536：当子代理因预算限制中断时，会把 deterministic digest 写入私有 result artifact，而不是只放在 hand-back prompt 中。  
这提高了长任务失败时的可恢复性，避免模型后续报告失败导致中间成果完全丢失。

---

### 7. #6548 改进工具错误：edit mismatch 提供上下文，cwd 错误命名 root，空 goal 更新变 no-op  
链接：https://github.com/Hmbown/DeepSeek-TUI/pull/6548  
状态：Closed

该 PR 针对 #6542 中的高频工具错误做局部修复。  
改进点包括：编辑失败时返回最接近的文件区域、指出空白差异；cwd 越界时明确 workspace root；无 goal 时 `update_goal` 不再产生噪音错误。整体能减少 agent 自我修复成本。

---

### 8. #6544 修复 compaction：停止 fallback window 的误判 emergency pass，并复用缓存前缀  
链接：https://github.com/Hmbown/DeepSeek-TUI/pull/6544  
状态：Closed

该 PR 修复 #6540 中 15/16 次 compaction 失败的问题。  
核心是避免在 fallback window 上产生 false emergency pass，并复用当前 turn 的 cache prefix。该改动直接影响长上下文场景下的成本、成功率和缓存命中率。

---

### 9. #6538 Web fetch/search 修复：保留真实内容、尊重 pinned search、处理图片降级提示  
链接：https://github.com/Hmbown/DeepSeek-TUI/pull/6538  
状态：Closed

该 PR 修复 #6531，覆盖网页内容抽取、搜索后端选择、native answer 处理和图片提示。  
它提升了 Web fetch/search 的可用性，尤其是文档页、列表页、form 包裹页面等实际场景下的内容保真。

---

### 10. #6537 `/model` 展示当前、pin/Fleet 与最近使用模型，移除 legacy `enabled_models`  
链接：https://github.com/Hmbown/DeepSeek-TUI/pull/6537  
状态：Closed

该 PR 修复 #6533，使模型选择器更贴近真实使用情况。  
默认列表现在优先显示当前 route、pin/Fleet 模型和最近使用模型，避免旧模型残留、常用模型缺失的问题。对多模型工作流用户影响明显。

---

## 5. 功能需求趋势

### 1. 长上下文与子代理可靠性

多个 Issue/PR 聚焦子代理预算、compaction、digest handoff 和后台任务状态展示。  
代表链接：  
- https://github.com/Hmbown/DeepSeek-TUI/issues/6504  
- https://github.com/Hmbown/DeepSeek-TUI/issues/6536  
- https://github.com/Hmbown/DeepSeek-TUI/issues/6565  
- https://github.com/Hmbown/DeepSeek-TUI/pull/6549  

趋势判断：DeepSeek TUI 正在强化“长任务不中断、失败有产物、状态可解释”的 agent runtime 能力。

---

### 2. Token 成本、缓存命中与 compaction 策略

#6541 和 #6540 显示社区已开始关注大上下文模型的实际成本，尤其是 `deepseek-flash` 的高 token 占比与 cache miss 成本。  
代表链接：  
- https://github.com/Hmbown/DeepSeek-TUI/issues/6541  
- https://github.com/Hmbown/DeepSeek-TUI/issues/6540  
- https://github.com/Hmbown/DeepSeek-TUI/pull/6544  

趋势判断：未来会更重视 per-request telemetry、cost-aware compaction、静态 prompt 缩减和稳定工具列表。

---

### 3. 配置系统治理与对话式设置

配置相关 Issue 密集出现，包括未知 key 校验、统一声明表、配置迁移、会话内设置提案。  
代表链接：  
- https://github.com/Hmbown/DeepSeek-TUI/issues/6563  
- https://github.com/Hmbown/DeepSeek-TUI/issues/6564  
- https://github.com/Hmbown/DeepSeek-TUI/issues/6530  
- https://github.com/Hmbown/DeepSeek-TUI/pull/6568  

趋势判断：配置系统正从“自由写 TOML”转向“schema 声明、CLI 校验、对话式提案、审批执行”。

---

### 4. 新用户 onboarding 与凭据配置体验

首次运行、API Key 粘贴、鉴权错误说明成为近期重要 UX 改进点。  
代表链接：  
- https://github.com/Hmbown/DeepSeek-TUI/issues/6566  
- https://github.com/Hmbown/DeepSeek-TUI/issues/6528  
- https://github.com/Hmbown/DeepSeek-TUI/pull/6550  

趋势判断：项目正在补齐从安装到首次成功调用模型之间的体验断点。

---

### 5. Web Search / Fetch 能力质量提升

Web 内容抽取、搜索 provider 优先级、TinyFish 后端和配额账本显示出搜索能力正在被产品化。  
代表链接：  
- https://github.com/Hmbown/DeepSeek-TUI/issues/6531  
- https://github.com/Hmbown/DeepSeek-TUI/issues/6532  
- https://github.com/Hmbown/DeepSeek-TUI/pull/6538  

趋势判断：搜索不再只是简单工具调用，而是需要质量控制、provider 路由、配额治理和 fallback 透明度。

---

### 6. 模型路由、模型能力与选择器体验

多模型相关需求包括官方 route 的 image capability、模型 picker 最近使用、pin/Fleet、per-model capability override、Auto router。  
代表链接：  
- https://github.com/Hmbown/DeepSeek-TUI/issues/6529  
- https://github.com/Hmbown/DeepSeek-TUI/pull/6537  
- https://github.com/Hmbown/DeepSeek-TUI/pull/6521  
- https://github.com/Hmbown/DeepSeek-TUI/pull/6539  

趋势判断：用户希望工具更准确理解模型能力，并在多模型、多 provider 环境中提供更智能的路由与选择体验。

---

## 6. 开发者关注点

### 1. “静默失败”问题仍是高频痛点

包括配置错误静默写入、web fetch 无可读内容、compaction false pass、工具错误信息不可操作等。  
开发者希望系统在失败时提供明确原因、上下文和修复建议，而不是只返回泛化错误。

---

### 2. 长任务执行需要更强的恢复与可观测性

子代理被预算杀死、hand-back 失败丢失成果、footer 状态混乱，说明多代理长任务需要更好的中间产物持久化、任务状态一致性和用户提示。

---

### 3. 配置与模型能力需要统一 schema

当前存在 legacy key、未知 key、能力目录错误、手动维护模型能力与实际 provider 不一致等问题。  
开发者关注点已经从“能不能配置”转向“配置是否可验证、可迁移、可解释”。

---

### 4. Token 成本已经成为产品质量指标

平均请求 36 万 token、cache miss 成本高、compaction 失败等数据表明，token 效率不仅是性能问题，也是经济性问题。  
后续 per-request usage telemetry 和 cost-based trigger 很可能成为核心能力。

---

### 5. 测试隔离与 CI 稳定性受到重视

#6551、#6552、#6547、#6535 等 PR 表明维护者正在修复 main red、MSRV、Windows installer、测试污染真实用户目录等工程基础设施问题。  
这对外部贡献者很重要：稳定的 CI 和可复现测试环境能降低贡献成本。

---

### 6. 新用户体验需要从“开发者工具”走向“产品化工具”

onboarding 缺失、API Key 粘贴不可见字符、provider 错误信息不清晰、官网安装入口更新，都指向同一趋势：  
DeepSeek TUI 正在从面向熟练开发者的 CLI 工具，逐步补齐面向更广泛用户的引导、错误解释和默认体验。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*