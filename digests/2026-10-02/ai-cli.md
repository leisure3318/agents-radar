# AI CLI 工具社区动态日报 2026-10-02

> 生成时间: 2026-10-02 04:36 UTC | 覆盖工具: 9 个

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

# AI CLI 工具生态横向对比分析报告  
日期：2026-10-02

## 1. 生态全景

当前 AI CLI 工具正在从“单轮问答式代码助手”快速演进为 **长期运行、多端同步、可扩展、可审批的 Agent 执行平台**。  
Claude Code、Codex、Qwen Code、OpenCode 等都在强化 cloud / hosted / managed session、后台任务、任务接管和多 agent 协作能力。  
与此同时，社区反馈显示生产级使用的核心瓶颈已转向 **会话可靠性、权限安全、MCP/ACP 集成、桌面端稳定性、资源管理和错误可观测性**。  
从发布和 PR 节奏看，Codex、Qwen Code、OpenCode、Pi 处于快速架构演进期；Claude Code、Copilot CLI 更偏向产品化能力扩展与工程体验打磨。

---

## 2. 各工具活跃度对比

> 注：Issues / PR 数量按本次日报中明确列出的过去 24 小时重点条目统计；部分仓库实际更新量可能更高。

| 工具 | 今日重点 Issues | 今日重点 PR | Release 情况 | 今日主要信号 |
|---|---:|---:|---|---|
| Claude Code | 10 | 0 | 1 个：v2.1.287 | 引入 Claude Mods，强化插件与多 agent 扩展能力 |
| OpenAI Codex | 10 | 10 | 8 个 Rust 版本 / alpha 版本 | Cloud Task、Dot、Desktop、TUI 基础设施快速迭代 |
| Gemini CLI | 7 | 5 | 1 个 nightly | 聚焦工具调用可靠性、状态持久化、MCP/ACP 权限 |
| GitHub Copilot CLI | 10 | 1 | 3 个：1.0.91 / 1.0.92 系列 | Sandbox、MCP OAuth、Autopilot 体验持续打磨 |
| Kimi Code CLI | 0 | 0 | 无 | 过去 24 小时无活动 |
| OpenCode | 10 | 10 | 无 | Go 订阅/额度问题升温，v2 稳定性修复密集 |
| Pi | 10 | 8 | 1 个：v1.0.0 | 进入 1.0 后稳定期，Fullscreen TUI 与 Provider 适配活跃 |
| Qwen Code | 10 | 10 | 1 个 nightly | Managed Agent / Hosted Session / Runtime Broker 成为主线 |
| DeepSeek TUI / Codewhale | 1 | 7 | 无 | v0.10.1 集成修复、依赖升级、TUI 组件文档化 |

### 活跃度观察

- **最高工程活跃度**：OpenAI Codex、Qwen Code、OpenCode、Pi。  
- **最高产品信号强度**：Claude Code 的 Claude Mods、Codex 的 Cloud Task/Dot、Qwen Code 的 Managed Agent。  
- **最明显稳定性压力**：Codex Windows / Cloud Task、Claude Desktop / Cloud Session、OpenCode Go 订阅、Qwen Runtime Broker。  
- **相对低活跃**：Kimi Code CLI 今日无活动；DeepSeek TUI 今日 Issue 少，但 PR 维护稳定。

---

## 3. 共同关注的功能方向

### 3.1 Cloud / Hosted / Managed Agent 会话可靠性

相关工具：

- Claude Code
- OpenAI Codex
- OpenCode
- Qwen Code
- Copilot CLI

共同诉求：

- 后台任务能可靠接收完整上下文。
- Cloud session 与本地 session 行为一致。
- 多端任务可恢复、可继续、可追踪。
- Session / thread / task identity 跨端一致。
- Agent 重启、接管、取消、恢复流程不能丢状态。

具体表现：

- Claude Code：`spawn_task` 通过 cloud 启动时 prompt / plan / state 传递不完整。
- Codex：Dot、Cloud Task、desktop、web、iOS 之间任务可见性和 thread resume 不一致。
- Qwen Code：Hosted Turn takeover、Runtime Broker、Managed Session 接管和 generation adoption 是今日主线。
- OpenCode：v2 session、idle eviction、compaction、旧 agent 残留等问题集中出现。
- Copilot CLI：长任务中 UI 停止更新但 `events.jsonl` 继续增长。

结论：  
**Agent 会话生命周期管理正在成为 AI CLI 的核心架构竞争点。**

---

### 3.2 MCP / ACP / 外部工具链集成

相关工具：

- Gemini CLI
- Copilot CLI
- OpenCode
- Qwen Code
- Claude Code
- Codex

共同诉求：

- MCP server 连接状态准确。
- 工具权限请求可解释、可审计。
- 多 server / 多 tool 场景下能区分来源。
- OAuth / re-auth / 网络切换后工具仍可用。
- 工具调用参数需要更强容错。

具体表现：

- Gemini CLI：ACP 模式下 MCP 权限请求缺少 server / tool 信息。
- Copilot CLI：MCP 状态通知过多；MCP OAuth 重新认证后工具定义未变化时需继续可用。
- OpenCode：MCP 网络变化后不自动重连；legacy MCP config 兼容需要保留。
- Qwen Code：Hosted approval 需要展示待执行工具输入。
- Claude Code：IDE / MCP 工具缺失、VS Code terminal mode 连接不稳定。
- Codex：remote MCP Windows env、exec-server、TCP tunnel diagnostics 等基础设施持续增强。

结论：  
MCP / ACP 已从“扩展能力”进入“生产工作流基础设施”，下一阶段重点是 **权限、重连、可观测性和兼容性**。

---

### 3.3 权限、安全与沙箱边界

相关工具：

- Qwen Code
- Copilot CLI
- Gemini CLI
- Pi
- Codex
- Claude Code

共同诉求：

- 工具执行前应有清晰边界。
- Shell / workspace / browser / sandbox 权限需要一致。
- 安全分类器不能误伤正常开发流。
- Secret、CI、OAuth、Broker token 需要更严格的安全模型。

具体表现：

- Qwen Code：Shell permission analyzer phantom-cwd、Runtime Broker 单 token 安全模型、Broker writer credential 设计。
- Copilot CLI：Sandbox CA 管理、Windows sandbox 支持、Linux DNS 解析问题。
- Gemini CLI：安全研究 PR 指向 GitHub Actions artifact chain / secret 暴露风险。
- Pi：npm shrinkwrap 固定存在漏洞的 `brace-expansion`；Bedrock signed thinking block replay 修复。
- Codex：Browser Control 权限误判、Computer Use sandbox / permission 问题。
- Claude Code：safety classifier 误判正常开发工作流。

结论：  
随着 AI CLI 具备真实执行能力，**权限模型和安全边界已成为与模型能力同等重要的基础能力**。

---

### 3.4 长会话、后台任务与资源管理

相关工具：

- Claude Code
- Codex
- Gemini CLI
- OpenCode
- Pi
- Qwen Code
- Copilot CLI

共同诉求：

- 长会话不应发生指令衰减、内存泄漏或状态漂移。
- 后台任务要可恢复、可取消、可观察。
- Renderer、PTY、worker、DB、event projection 等资源必须有界。

具体表现：

- Claude Code：Windows Desktop renderer 占用 7GB RSS / 15GB commit；长会话中规则遵循衰减。
- Codex：消息队列 stuck、Cloud Task resume 失败、Windows app 卡 logo。
- Gemini CLI：GoogleSearch 无超时卡死、macOS PTY 泄漏、高内存 ingest。
- OpenCode：ripgrep 并发限制、reasoning stream 重复检测、旧 agent 重启后残留。
- Pi：idle session 内存占用、compaction summary 膨胀、durable recovery 问题。
- Qwen Code：session store / panel projection 无界增长、Runtime Broker DB 热路径放大。
- Copilot CLI：多 session 下 UI 不刷新但后台事件继续写入。

结论：  
AI CLI 正在进入 **常驻 agent** 阶段，资源有界性和长期稳定性会决定真实生产可用性。

---

### 3.5 诊断、可观测性与错误透明度

相关工具：

- Codex
- OpenCode
- Qwen Code
- Copilot CLI
- Claude Code
- Gemini CLI

共同诉求：

- 不要“失败但无错误”。
- 错误需区分认证、权限、网络、上下文溢出、模型不可用、环境缺失。
- 需要结构化日志、诊断 JSON、可导出的 transcript。

具体表现：

- Codex：TCP tunnel 新增 JSON diagnostics；消息发送失败无回执是高频痛点。
- OpenCode：结构化目录错误、context overflow 分类、provider auth cache refresh。
- Qwen Code：Broker deadline、lease、takeover、approval 状态均需要更强诊断。
- Copilot CLI：status line payload 希望暴露 quota / billing period。
- Claude Code：GitHub integration 无法识别 repo、project not connecting 缺少明确原因。
- Gemini CLI：Nightly eval 无报告仍成功，掩盖真实问题。

结论：  
AI CLI 不再只是交互工具，而是复杂分布式执行系统；**可观测性正在成为开发者信任的关键来源**。

---

## 4. 差异化定位分析

### Claude Code

**定位**：面向专业开发者的高集成度 coding agent。  
**技术路线**：Cloud / Desktop / CLI / IDE / GitHub 深度整合，正在通过 Claude Mods 打开插件深度扩展。  
**差异化优势**：

- Claude Mods 可能形成强插件生态。
- “You should know” 显示其向主动式、多 agent 协作助手演进。
- 与 Claude Web / Cowork / Desktop 的产品闭环较强。

**当前短板**：

- Cloud session 与本地 session 一致性不足。
- Desktop 资源管理和 Windows 稳定性问题突出。
- 长会话规则遵循和偏好保持仍不稳定。

---

### OpenAI Codex

**定位**：跨端 Cloud Task + Desktop + Dot + TUI 的综合型 agent 平台。  
**技术路线**：Rust CLI/TUI、Cloud Thread、exec-server、gRPC、remote / tunnel / computer-use 基础设施快速演进。  
**差异化优势**：

- PR 层面基础设施推进非常密集。
- Cloud thread resume / attach、file streaming、worktree、TCP diagnostics 等能力较系统化。
- Dot / Cloud Task / Computer Use 指向更完整的 AI 工作空间。

**当前短板**：

- 跨端 task identity、placement format、thread resume 一致性仍不稳定。
- Windows 桌面端问题集中。
- 消息队列和发送状态机亟需加强。

---

### Gemini CLI

**定位**：Google 生态下偏 CLI / Agent 执行器方向的工具。  
**技术路线**：Nightly 高频发布，重点打磨 CLI 状态、工具调用、MCP/ACP、沙箱与多模态链路。  
**差异化优势**：

- 对 ACP / MCP 非交互式集成关注较早。
- 多模态工具链修复响应快。
- 状态持久化、chat recording、history windowing 对长会话有价值。

**当前短板**：

- 工具调用超时、PTY 泄漏、高内存 ingest 说明稳定性仍需增强。
- 多模态内容端到端验证仍有缺口。
- CI / eval 质量门禁存在可信度问题。

---

### GitHub Copilot CLI

**定位**：GitHub / Copilot 生态中的终端 agent，强调 Sandbox、Autopilot 和工程工作流融合。  
**技术路线**：围绕 sandbox、MCP、Autopilot、ACP、自定义 agent、Git 元数据进行产品化打磨。  
**差异化优势**：

- 与 GitHub 协作流天然贴合。
- Sandbox CA、Windows sandbox、telemetry flush 等企业环境能力增强。
- 用户对 quota、commit metadata、status line 等专业化需求明显。

**当前短板**：

- Autopilot 权限状态切换存在不一致。
- UI/event stream 同步问题影响长任务信任。
- 自定义 agent 与 ACP 兼容性存在回归。

---

### OpenCode

**定位**：开放、多 provider、偏 power user 的 AI coding agent。  
**技术路线**：v2 session 架构、Provider 兼容、自定义 provider、MCP、compaction、reasoning guard 等快速演进。  
**差异化优势**：

- Provider 生态灵活，适合 OpenAI-compatible、Azure、自建网关等场景。
- 修复 PR 密集，覆盖底层执行、认证缓存、上下文溢出、并发控制。
- 对 agent 内部机制的透明度和可调试性关注较强。

**当前短板**：

- Go 订阅、额度、403、重复扣费问题严重影响付费信任。
- v2 session / location 生命周期仍有迁移摩擦。
- 文档与实现不同步问题仍存在。

---

### Pi

**定位**：终端优先、强调 TUI 体验和 provider 适配的 coding agent。  
**技术路线**：v1.0.0 默认 fullscreen TUI，结合 durable execution、provider catalog、扩展 API 和成本统计。  
**差异化优势**：

- TUI 体验投入明显，fullscreen、inline image、theme、modal、keyboard 行为快速打磨。
- Provider 层细节深入，覆盖 Bedrock、OpenRouter、Cloudflare Workers AI、Anthropic SSE 等。
- durable execution 和 crash recovery 方向具有长期潜力。

**当前短板**：

- v1.0.0 后兼容性和交互回归较多。
- Fullscreen 默认化带来终端兼容压力。
- 扩展 API、生命周期 hook、事件回执仍需完善。

---

### Qwen Code

**定位**：面向 Managed Agent / Hosted Session 的服务化 agent 平台。  
**技术路线**：Runtime Broker、Hosted Harness、Web Shell、Managed Session、权限审批、Runtime worker 是核心架构。  
**差异化优势**：

- 今日议题高度集中在生产级 agent 基础设施。
- 对 session takeover、generation adoption、Broker lease、writer credential 等复杂问题推进深入。
- Web Shell 与 Hosted approval 方向适合多用户、远程和企业场景。

**当前短板**：

- Broker 安全模型、DB 热路径、projection 无界增长等生产风险仍突出。
- Hosted takeover / cancellation / owner 变更复杂度高。
- 权限审批可解释性仍需增强。

---

### DeepSeek TUI / Codewhale

**定位**：TUI / 桌面组件体系与任务执行框架。  
**技术路线**：v0.10.1 集成修复、ratatui 组件目录、依赖维护、视觉一致性。  
**差异化优势**：

- 对 TUI 组件体系化、gallery、视觉规范有明确投入。
- 依赖和构建链路维护稳定。
- 后台 task worker 资源优化正在推进。

**当前短板**：

- 今日社区 Issue 活跃度较低。
- AI agent 能力层面的信号不如 Claude / Codex / Qwen / OpenCode 强。
- 当前更多体现为工程维护和 UI 体系建设。

---

### Kimi Code CLI

**定位**：暂无足够今日信号判断。  
**今日状态**：过去 24 小时无活动。  
**观察建议**：后续需关注是否有 release、MCP / agent、provider、CLI 执行能力等方向更新。

---

## 5. 社区热度与成熟度

### 高活跃、高迭代

| 工具 | 判断 |
|---|---|
| OpenAI Codex | Release 和 PR 都非常密集，说明处于快速基础设施扩展期 |
| Qwen Code | Issue / PR 高度集中于 Managed Agent，架构演进强 |
| OpenCode | PR 修复密集，但付费/额度问题影响用户信任 |
| Pi | v1.0.0 后反馈密集，进入发布后稳定期 |

### 产品成熟度较高，但稳定性压力明显

| 工具 | 判断 |
|---|---|
| Claude Code | 产品形态完整，Claude Mods 是重要生态信号，但 Desktop / Cloud consistency 仍需补强 |
| GitHub Copilot CLI | 与 GitHub / Copilot 生态结合紧密，Sandbox / Autopilot 持续产品化，但长任务和权限状态仍需打磨 |
| Gemini CLI | Nightly 节奏稳定，MCP/ACP、多模态、状态持久化持续增强，但工具调用和资源泄漏仍是短板 |

### 相对低活跃或维护型

| 工具 | 判断 |
|---|---|
| DeepSeek TUI / Codewhale | 今日以依赖、文档、集成修复为主，社区反馈少 |
| Kimi Code CLI | 今日无活动，暂无法判断近期方向 |

### 成熟度分层

| 层级 | 工具 | 特征 |
|---|---|---|
| 产品化平台层 | Claude Code、Codex、Copilot CLI | 多端、cloud、desktop、GitHub/IDE 集成明显 |
| 架构快速演进层 | Qwen Code、OpenCode、Pi | Agent runtime、provider、session、TUI、durable execution 快速迭代 |
| 稳定维护 / 局部建设层 | Gemini CLI、DeepSeek TUI | 特定能力持续增强，部分关键稳定性问题待解 |
| 暂无活动 | Kimi Code CLI | 今日无新增信号 |

---

## 6. 值得关注的趋势信号

### 趋势一：AI CLI 正在变成“分布式 Agent 操作系统”

过去的 CLI 主要处理本地命令和对话；现在的工具开始管理：

- cloud thread
- hosted session
- runtime broker
- background task
- worktree
- browser/computer control
- MCP server
- permission approval
- agent queue

代表工具：

- Codex：Cloud Task / Dot / gRPC thread resume
- Qwen Code：Runtime Broker / Hosted Session / Managed Agent
- Claude Code：Claude Mods / spawn_task / Cowork
- OpenCode：v2 session / location / compaction

对开发者的参考价值：  
选型时不能只看模型效果，还要评估 **会话恢复、任务状态、权限、日志、远程执行和资源隔离能力**。

---

### 趋势二：MCP / ACP 正在成为 AI 开发工具的标准扩展层

多个工具今日都暴露 MCP / ACP 相关问题，说明其已进入真实使用阶段。

代表诉求：

- MCP server 重连
- OAuth re-auth 后工具可用
- 权限请求展示 server / tool
- 自定义 agent 与 ACP 兼容
- remote MCP Windows env 保留

对开发者的参考价值：  
如果团队计划建设内部工具或私有 agent 能力，应优先考虑支持 MCP / ACP 的工具，并关注其 **权限模型、认证恢复和多 server 可观测性**。

---

### 趋势三：Windows 和桌面端成为 AI CLI 的稳定性主战场

今日多个工具出现 Windows / Desktop 问题：

- Claude Code：Windows renderer 内存暴涨、session 消失。
- Codex：Windows app 卡在 logo、browser permission 误判、消息发送消失。
- Copilot CLI：Windows sandbox 支持、Autopilot 权限问题。
- Qwen Code：Windows Vim-mode 剪贴板问题。

对开发者的参考价值：  
企业和跨平台团队在选型时，应重点验证：

- Windows 安装和更新
- WebView / Chromium 资源释放
- WSL / sandbox / DNS
- 剪贴板、路径、环境变量
- 长时间多 session 稳定性

---

### 趋势四：权限审批从“是否允许”升级为“可解释的安全决策”

简单 yes/no 已经不够，社区开始要求：

- 展示工具输入。
- 展示 server/tool 来源。
- 区分 workspace confinement 与普通权限。
- 明确拒绝原因。
- 支持无头 / hosted / web shell 审批链路。

代表工具：

- Qwen Code
- Gemini CLI
- Copilot CLI
- Claude Code
- OpenCode

对开发者的参考价值：  
在生产环境中使用 AI agent 执行代码、shell、浏览器或文件修改时，应优先选择具备 **细粒度审批、审计日志和边界解释** 的工具。

---

### 趋势五：长会话与常驻 agent 带来资源有界性挑战

多个工具今日出现内存、PTY、renderer、DB、worker、event projection 问题。

典型问题：

- Claude Desktop 7GB RSS / 15GB commit。
- Gemini CLI macOS PTY 泄漏。
- Qwen Managed Session projection 无界增长。
- OpenCode ripgrep fan-out 与旧 agent 残留。
- Pi idle memory 与 compaction summary 膨胀。
- Copilot CLI UI 不刷新但事件继续写入。

对开发者的参考价值：  
评估 AI CLI 时，应增加长压测试场景：

- 8 小时以上运行
- 多 session 并发
- 大仓库搜索
- 长上下文文档 ingest
- 频繁工具调用
- 网络切换与恢复

---

### 趋势六：Provider 兼容和成本透明成为专业用户关注点

Pi、OpenCode、Copilot CLI、Claude Code 都出现成本、quota、provider、model compatibility 相关信号。

具体包括：

- OpenRouter 实际成本回传。
- Bedrock 长上下文价格档位。
- Copilot quota / billing period 状态栏需求。
- OpenCode provider auth cache、custom provider、context overflow 分类。
- Claude Code usage / reset ticket 相关 CLI 诉求。

对开发者的参考价值：  
多模型、多 provider 策略会越来越普遍。团队应关注工具是否支持：

- OpenAI-compatible gateway
- Azure / Bedrock / OpenRouter
- 成本统计
- quota 可视化
- 模型错误分类
- provider 认证刷新

---

## 结论

今日 AI CLI 工具生态的核心关键词是：

**Agent 化、Cloud 化、MCP 化、权限化、可观测化、长期运行化。**

从技术决策角度看：

- 如果重视 **生态闭环与插件扩展**：关注 Claude Code。
- 如果重视 **Cloud Task、跨端和远程执行基础设施**：关注 OpenAI Codex。
- 如果重视 **Managed Agent / Hosted Session 服务化架构**：关注 Qwen Code。
- 如果重视 **多 Provider 和开放可调试性**：关注 OpenCode。
- 如果重视 **TUI 体验和 Provider 细节适配**：关注 Pi。
- 如果重视 **GitHub 工作流与 Sandbox**：关注 GitHub Copilot CLI。
- 如果重视 **Google 生态、MCP/ACP 与 CLI agent 执行器**：关注 Gemini CLI。

短期内，最值得持续跟踪的技术方向是：  
**会话恢复、消息队列、权限审批、MCP 稳定性、Windows 桌面端、资源有界性和结构化诊断能力。**

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告  
数据截止：2026-10-02  
数据说明：PR 列表按评论数排序，但原始评论数字段显示为 `undefined`，因此以下“热度”主要依据给定排序、更新时间、Issue 关联度与主题覆盖面判断。

---

## 1. 热门 Skills 排行

### 1. `skill-creator` 稳定性与触发评估修复  
- PR：[#1298](https://github.com/anthropics/skills/pull/1298)  
- 状态：Open  
- 功能/变更：修复 Skill 触发评估中的误判、Windows subprocess 管道兼容性、运行时失败被错误视为“未触发”等问题。  
- 社区讨论热点：  
  - Skill 创建与评估流程是否可靠。  
  - Windows 环境下评估工具链不稳定。  
  - 触发率评估会直接影响 Skill 优化质量。  
- 关联 Issue：[#556](https://github.com/anthropics/skills/issues/556)、[#1383](https://github.com/anthropics/skills/issues/1383)

---

### 2. `mcp-builder` 兼容 MCP v2 与自定义 Header  
- PR：[#1742](https://github.com/anthropics/skills/pull/1742)  
- 状态：Open  
- 功能/变更：适配 `mcp>=2.0.0` 中 `streamable_http_client` 的导入变更，并支持自定义 HTTP headers。  
- 社区讨论热点：  
  - MCP 协议版本升级带来的兼容性问题。  
  - 真实 MCP Server 连接与评估失败。  
  - 企业 API / 私有服务接入时对 Header 鉴权的需求。  
- 关联 Issue：[#1668](https://github.com/anthropics/skills/issues/1668)、[#1390](https://github.com/anthropics/skills/issues/1390)

---

### 3. `proofcore-contract-auditor` 智能合约审计  
- PR：[#1771](https://github.com/anthropics/skills/pull/1771)  
- 状态：Open  
- 功能/变更：新增面向 Web3 开发者的智能合约审计 Skill，支持 Solidity / Rust 静态分析，并将审计证明锚定到 TON Blockchain。  
- 社区讨论热点：  
  - AI 辅助智能合约安全审计。  
  - 审计结果可验证、可公证、可追溯。  
  - Web3 / 区块链场景是否适合进入官方 Skills 集合。  

---

### 4. `docx` 文档批注与修订处理增强  
- PR：[#1734](https://github.com/anthropics/skills/pull/1734)、[#1792](https://github.com/anthropics/skills/pull/1792)、[#541](https://github.com/anthropics/skills/pull/541)  
- 状态：Open  
- 功能/变更：  
  - 检测孤立的 DOCX comments。  
  - LibreOffice 超时时正确报错并校验输出。  
  - 避免 tracked changes 与 bookmarks 的 `w:id` 冲突导致文档损坏。  
- 社区讨论热点：  
  - AI 生成/修改 Word 文档的可靠性。  
  - DOCX OOXML 细节导致的文件损坏风险。  
  - 企业文档工作流中对修订、批注、格式完整性的要求。  

---

### 5. `md2video-audio` Markdown 转视频与配音  
- PR：[#1703](https://github.com/anthropics/skills/pull/1703)  
- 状态：Open  
- 功能/变更：将 Markdown 文档通过 Marp 转为演示幻灯片，再生成带拟人语音的 MP4 视频。  
- 社区讨论热点：  
  - 文档到视频的自动化内容生产。  
  - 低成本生成教学、汇报、营销视频。  
  - 多模态内容生产 Skill 的扩展潜力。  

---

### 6. `notion-spec-to-implementation` 与 `quantitative-resume-auditor`  
- PR：[#1245](https://github.com/anthropics/skills/pull/1245)  
- 状态：Open  
- 功能/变更：  
  - `notion-spec-to-implementation`：将 Notion 产品/技术规格转为 Claude Code 可执行任务。  
  - `quantitative-resume-auditor`：量化分析简历质量。  
- 社区讨论热点：  
  - 产品规格到代码实现的端到端工作流自动化。  
  - 项目管理系统与 Claude Code 的连接。  
  - AI 在招聘、简历优化等知识工作场景中的应用。  

---

### 7. `pyxel` 复古游戏开发  
- PR：[#525](https://github.com/anthropics/skills/pull/525)  
- 状态：Open  
- 功能/变更：新增 Pyxel Skill，用于创建、调试、验证 Python 复古游戏，支持 headless 运行、输入驱动测试、帧级检查等。  
- 社区讨论热点：  
  - AI 辅助游戏开发。  
  - 可视化/交互式程序的自动验证。  
  - 游戏类 Skill 是否能形成更通用的 GUI 测试能力。  

---

### 8. `AWT` AI 驱动端到端测试  
- PR：[#822](https://github.com/anthropics/skills/pull/822)  
- 状态：Open  
- 功能/变更：新增 AI Watch Tester Skill，让 Claude 具备视觉和浏览器控制能力，用于自动生成与执行 E2E 测试。  
- 社区讨论热点：  
  - 零代码测试生成。  
  - 浏览器自动化与视觉验证。  
  - QA / 前端测试工作流自动化。  

---

## 2. 社区需求趋势

### 趋势一：Skill 分发、权限与信任边界成为最高优先级  
- 代表 Issue：[#492](https://github.com/anthropics/skills/issues/492)  
- 需求：明确官方 Skill 与社区 Skill 的命名空间、权限边界和信任模型。  
- 说明：社区担心第三方 Skill 使用 `anthropic/` 命名空间造成“官方背书”误解，从而诱导用户授予高权限。

---

### 趋势二：组织级 Skill 管理与共享  
- 代表 Issue：[#228](https://github.com/anthropics/skills/issues/228)  
- 需求：在 Claude.ai / Claude Code 中支持组织级 Skill Library、团队共享链接、统一安装与更新。  
- 说明：企业用户不希望通过 Slack / Teams 手动分发 `.skill` 文件，期待类似内部插件市场的能力。

---

### 趋势三：Skill 创建、评估与调试工具链成熟化  
- 代表 Issue：[#556](https://github.com/anthropics/skills/issues/556)、[#1383](https://github.com/anthropics/skills/issues/1383)、[#202](https://github.com/anthropics/skills/issues/202)  
- 需求：更可靠的触发评估、benchmark、Windows 兼容性、错误可见性与最佳实践模板。  
- 说明：社区不仅需要更多 Skill，也需要能稳定创建、测试、优化 Skill 的工程化工具链。

---

### 趋势四：文档处理仍是最强刚需场景之一  
- 代表 PR：[#1734](https://github.com/anthropics/skills/pull/1734)、[#1792](https://github.com/anthropics/skills/pull/1792)、[#514](https://github.com/anthropics/skills/pull/514)、[#486](https://github.com/anthropics/skills/pull/486)  
- 需求：DOCX、PDF、ODT、排版、批注、修订、模板填充、格式检查等。  
- 说明：企业文档自动化是 Skills 的核心落地场景，但社区对可靠性和格式完整性要求很高。

---

### 趋势五：测试生成、质量门禁与代码安全审查升温  
- 代表 PR / Issue：  
  - AWT E2E 测试：[#822](https://github.com/anthropics/skills/pull/822)  
  - testing-patterns：[#723](https://github.com/anthropics/skills/pull/723)  
  - reasoning quality gate：[#1385](https://github.com/anthropics/skills/issues/1385)  
  - agent-governance：[#412](https://github.com/anthropics/skills/issues/412)  
- 需求：测试模式、E2E 自动化、AI 输出校验、安全审查、治理流程。  
- 说明：社区希望 Skills 不只是“生成代码”，还要参与验证、审计和上线前风险控制。

---

### 趋势六：上下文窗口与 Token 成本管理  
- 代表 Issue：[#1487](https://github.com/anthropics/skills/issues/1487)、[#1329](https://github.com/anthropics/skills/issues/1329)  
- 需求：减少 Skill 注入 token、压缩长期代理状态、避免大型 Skill 一次性占满上下文。  
- 说明：随着 Skill 复杂度提高，如何按需加载、精简说明和管理记忆成为关键问题。

---

## 3. 高潜力待合并 Skills

### `md2video-audio`：文档到视频自动化  
- PR：[#1703](https://github.com/anthropics/skills/pull/1703)  
- 状态：Open  
- 潜力判断：覆盖内容生产、教育培训、营销材料生成等高频场景，且工作流清晰，容易形成可见价值。

---

### `AWT`：AI 驱动 E2E 测试  
- PR：[#822](https://github.com/anthropics/skills/pull/822)  
- 状态：Open  
- 潜力判断：测试自动化是开发团队强需求，若能稳定接入浏览器和视觉能力，可能成为 Claude Code 的高价值工程 Skill。

---

### `testing-patterns`：系统化测试方法论  
- PR：[#723](https://github.com/anthropics/skills/pull/723)  
- 状态：Open  
- 潜力判断：相比工具型 E2E Skill，它更偏通用测试规范，可补齐 Claude Code 在单测、组件测试、集成测试中的指导能力。

---

### `notion-spec-to-implementation`：从产品规格到实现任务  
- PR：[#1245](https://github.com/anthropics/skills/pull/1245)  
- 状态：Open  
- 潜力判断：直接连接 PM 文档与代码执行，是典型的“工作流自动化”Skill，适合团队协作与 Claude Code 落地。

---

### `pyxel`：AI 辅助游戏开发  
- PR：[#525](https://github.com/anthropics/skills/pull/525)  
- 状态：Open  
- 潜力判断：虽然是垂直场景，但包含 headless 运行、帧检查、状态验证等机制，对 GUI / 游戏 / 交互式应用测试有外溢价值。

---

### `blast-radius`：批量/破坏性操作前的风险检查  
- PR：[#1776](https://github.com/anthropics/skills/pull/1776)  
- 状态：Open  
- 潜力判断：非常契合企业生产环境中的“防误删、防误发、防误操作”需求，可作为高风险操作前的安全检查清单。

---

### `proofcore-contract-auditor`：智能合约审计  
- PR：[#1771](https://github.com/anthropics/skills/pull/1771)  
- 状态：Open  
- 潜力判断：Web3 安全审计具备高价值，但是否合并可能取决于官方对链上证明、第三方协议依赖和安全声明边界的评估。

---

## 4. Skills 生态洞察

当前社区在 Skills 层面最集中的诉求是：**让 Skills 从“可分享的提示词/流程说明”升级为可治理、可评估、可安全分发、可嵌入企业工作流的工程化能力模块。**

---

# Claude Code 社区动态日报  
**日期：2026-10-02**  
**仓库：anthropics/claude-code**

---

## 1. 今日速览

过去 24 小时，Claude Code 发布了 **v2.1.287**，重点引入 **Claude Mods**，允许插件更深度地修改 Claude Code 行为，并新增内置 mod「You should know」，用于在后台提醒用户和 Claude 可能遗漏的问题。  

Issue 侧反馈集中在 **Cloud / Cowork 体验、桌面端稳定性、模型指令遵循、IDE/MCP 集成、Windows 性能与会话数据可靠性** 等方向。今日没有新的 Pull Request 更新。

---

## 2. 版本发布

### v2.1.287  
链接：https://github.com/anthropics/claude-code/releases/tag/v2.1.287

**主要变化：**

- **新增 Claude Mods**
  - 插件现在可以修改更深层的 Claude Code 行为。
  - 这意味着 Claude Code 的扩展能力进一步增强，插件不再只局限于浅层 UI 或命令扩展，而可能影响 agent 工作流、上下文处理或运行时行为。

- **新增内置 mod：You should know**
  - 一个内置辅助 agent，会在后台观察会话并提醒用户或 Claude 可能遗漏的事项。
  - 启用方式：
    ```bash
    /plugin enable cc-plugin-you-should-know@builtin
    ```
  - 该功能体现了 Claude Code 正在向「多 agent 协作」和「主动式开发辅助」方向演进。

**技术观察：**  
Claude Mods 的引入可能成为 Claude Code 插件生态的重要拐点。后续社区很可能围绕自定义审查器、项目规范守卫、上下文监控、自动化工作流 agent 等方向构建扩展。

---

## 3. 社区热点 Issues

### 1. spawn_task 通过 cloud 启动时丢失任务上下文  
Issue：https://github.com/anthropics/claude-code/issues/98836  
状态：Closed  
标签：bug, area:agents  
评论数：3

该问题报告称，`spawn_task` 创建的后台任务 chip 在通过 cloud session 启动时，可能没有正确带入完整 prompt / brief。虽然该 Issue 已关闭，但它暴露出 **本地 session 与 cloud session 在 agent 任务传递上的一致性问题**。

**为什么重要：**  
`spawn_task` 是多 agent / 后台任务流的关键能力。如果 cloud 启动路径丢失上下文，会直接影响任务拆分、异步开发和长任务执行的可靠性。

---

### 2. Desktop Code tab 中工具调用间的 Claude 说明被折叠或改写  
Issue：https://github.com/anthropics/claude-code/issues/98863  
状态：Closed / Duplicate  
标签：platform:macos, area:ui, area:desktop  
评论数：2

用户反馈，Claude 在工具调用之间写下的短说明会被折叠进 “Ran N commands”，较长说明则只显示为改写后的摘要，导致用户无法直接看到 Claude 原始意图。

**为什么重要：**  
这影响开发者对 agent 行为的可解释性。对于代码修改、命令执行、文件写入等操作，开发者需要看到 Claude 原始推理说明或执行意图，而不是被 UI 聚合隐藏。

---

### 3. project not connecting  
Issue：https://github.com/anthropics/claude-code/issues/98857  
状态：Open  
标签：bug  
评论数：2

用户报告项目无法连接，并附带 Claude Code 内部 Project ID 与 Thread ID。

**为什么重要：**  
项目连接问题通常直接阻断 Claude Code 的使用路径，尤其对依赖 cloud project / cowork 的用户影响较大。该类问题也可能与认证、项目状态、后端通道或 GitHub 集成相关。

---

### 4. claude.ai Cowork 横幅提示反复出现  
Issue：https://github.com/anthropics/claude-code/issues/98850  
状态：Open  
标签：enhancement, user-experience, area:claude-code-web, area:cowork, platform:web  
评论数：2

用户反馈，在 claude.ai Cowork Web 端关闭过的信息横幅会反复出现，希望提供一个全局设置来关闭非关键提示。

**为什么重要：**  
这属于典型的开发体验问题。对于高频使用 Cowork 的用户，重复弹出的非关键通知会造成认知干扰，降低工作流效率。

---

### 5. GitHub integration 无法识别 repository  
Issue：https://github.com/anthropics/claude-code/issues/98866  
状态：Open  
标签：github-integration  
评论数：1

用户反馈无法使用 Claude Code，因为系统提示没有 repository。

**为什么重要：**  
GitHub 集成是 Claude Code 的核心入口之一。仓库识别失败会影响代码读取、PR 创建、Issue 分析、云端任务运行等一系列能力。

---

### 6. spawn_task via cloud：prompt 到达但 plan 未保留  
Issue：https://github.com/anthropics/claude-code/issues/98837  
状态：Closed  
标签：bug, area:agents  
评论数：1

这是 #98836 的修正 / 后续说明。用户指出 cloud session 实际收到了 prompt 文本，但背后的计划或任务结构没有被保留。

**为什么重要：**  
该问题更精确地指向 agent 编排中的「计划状态传递」问题。对复杂任务而言，prompt 文本只是表层，plan / state / intent 的连续性才是后台 agent 能否正确执行的关键。

---

### 7. macOS TUI 启动时识别未知 TERM_PROGRAM 导致约 3 秒延迟  
Issue：https://github.com/anthropics/claude-code/issues/98832  
状态：Open  
标签：bug, has repro, platform:macos, area:tui  
评论数：1

用户通过 A/B 测试发现，仅改变 `TERM_PROGRAM` 环境变量即可复现启动延迟：`TERM_PROGRAM=herdr` 约增加 3 秒，而 `TERM_PROGRAM=ghostty` 可立即启动。

**为什么重要：**  
这是一个具备清晰复现路径的性能问题。终端启动延迟会影响 CLI 高频使用体验，也说明 Claude Code 对终端环境识别可能存在阻塞路径或 fallback 成本过高。

---

### 8. Windows Desktop 多项目会话消失，项目目录被判定为“另一台电脑”  
Issue：https://github.com/anthropics/claude-code/issues/98828  
状态：Open  
标签：bug, platform:windows, area:cowork, data-loss, area:desktop  
评论数：1

用户报告 Claude Desktop Windows MSIX 版本中，约十几个项目的 session 同时消失，项目文件夹被提示位于“另一台电脑”。

**为什么重要：**  
该问题带有 **data-loss** 标签，严重程度较高。会话历史、项目绑定和本地路径识别是桌面端的基础能力，一旦失效会破坏用户对长期项目协作的信任。

---

### 9. `claude --bg` 继承 daemon 首次启动终端环境，而不是当前 shell 环境  
Issue：https://github.com/anthropics/claude-code/issues/98872  
状态：Open  
评论数：0

用户反馈，`claude --bg` 创建的新后台会话继承的是正在运行的 `claude daemon` 的环境变量，而不是当前调用 shell 的环境。daemon 会长期保留首次启动终端的环境。

**为什么重要：**  
这会导致后台任务读取错误的 PATH、token、代理设置、项目变量或工具链配置。对于多项目、多 shell、多语言环境的开发者尤其容易造成隐蔽错误。

---

### 10. Windows Desktop renderer 进程未释放导致 7GB RSS / 15GB commit  
Issue：https://github.com/anthropics/claude-code/issues/98864  
状态：Open  
标签：bug, has repro, platform:windows, perf:memory, area:desktop  
评论数：0

用户报告 Windows Claude Desktop 在 9 个 session、单窗口、单 pane 下保留 22 个 Chromium renderer 进程，内存占用达到 7GB RSS / 15GB commit，切换 session 后也不释放。

**为什么重要：**  
这是严重的桌面端性能与资源管理问题。随着 Claude Code Desktop 面向长时间、多 session 使用场景，renderer 生命周期管理将直接影响可用性。

---

## 4. 重要 PR 进展

过去 24 小时内没有新的 Pull Request 更新。  
PR 列表：暂无。

---

## 5. 功能需求趋势

### 1. Cloud / Cowork 工作流稳定性  
相关 Issues：  
- https://github.com/anthropics/claude-code/issues/98836  
- https://github.com/anthropics/claude-code/issues/98837  
- https://github.com/anthropics/claude-code/issues/98850  
- https://github.com/anthropics/claude-code/issues/98867  
- https://github.com/anthropics/claude-code/issues/98869  

社区正在高频反馈 cloud session、Cowork、后台任务 chip、技能保存卡片等体验问题。核心诉求是：  
- cloud 与本地 session 行为一致  
- agent 状态 / plan 能完整传递  
- Cowork 不要强制打断用户工作流  
- 用户偏好应被系统级尊重  

---

### 2. 桌面端稳定性与资源管理  
相关 Issues：  
- https://github.com/anthropics/claude-code/issues/98828  
- https://github.com/anthropics/claude-code/issues/98864  
- https://github.com/anthropics/claude-code/issues/98871  
- https://github.com/anthropics/claude-code/issues/98863  

桌面端问题覆盖 Windows、macOS、Linux：  
- Windows session 消失与内存暴涨  
- Linux 内置浏览器 WebAuthn / FIDO2 PIN 不弹出  
- macOS UI 折叠 Claude 原始说明  
- Chromium renderer 生命周期管理不足  

趋势表明，Claude Desktop 正在进入更多真实生产环境，稳定性和可观测性成为关键诉求。

---

### 3. 模型指令遵循与偏好保持  
相关 Issues：  
- https://github.com/anthropics/claude-code/issues/98870  
- https://github.com/anthropics/claude-code/issues/98848  
- https://github.com/anthropics/claude-code/issues/98868  
- https://github.com/anthropics/claude-code/issues/98869  

用户集中反馈模型在较长会话中忽略 `claude.md`、语言偏好、用户明确禁用的行为或代码审查要求。  

主要痛点：  
- 长会话后指令衰减  
- 用户语言偏好不稳定  
- 项目级规则未持续生效  
- 系统提示与用户偏好冲突时缺少透明解释  

---

### 4. IDE / MCP / GitHub 集成可靠性  
相关 Issues：  
- https://github.com/anthropics/claude-code/issues/98858  
- https://github.com/anthropics/claude-code/issues/98866  
- https://github.com/anthropics/claude-code/issues/98849  

开发者仍高度依赖 Claude Code 与 IDE、MCP、GitHub 的连接质量。今日反馈包括：  
- VS Code terminal mode 下 daemon-hosted session 无法保持 IDE 连接  
- `mcp__ide__*` 工具缺失  
- GitHub repository 无法识别  
- Web 端 GitHub integration 失败  

这说明「工具上下文连接」仍是 Claude Code 生产力体验的关键瓶颈。

---

### 5. CLI / TUI 体验改进  
相关 Issues：  
- https://github.com/anthropics/claude-code/issues/98832  
- https://github.com/anthropics/claude-code/issues/98852  
- https://github.com/anthropics/claude-code/issues/98853  
- https://github.com/anthropics/claude-code/issues/98865  
- https://github.com/anthropics/claude-code/issues/98872  

社区希望 CLI/TUI 更贴近开发者日常使用方式：  
- 背景会话应继承当前 shell 环境  
- `/usage` 或 slash command 支持兑换 reset ticket  
- slash command 执行后恢复之前的 prompt suggestion  
- 支持用户主动分享 session transcript 给 Anthropic 改进模型  
- 减少启动性能损耗  

---

### 6. 安全分类器与结构化输出可靠性  
相关 Issues：  
- https://github.com/anthropics/claude-code/issues/98861  
- https://github.com/anthropics/claude-code/issues/98847  
- https://github.com/anthropics/claude-code/issues/98860  

出现多起与模型输出可靠性相关的反馈：  
- 正常开发工作流被 safety classifier 误判  
- 简单 “hi” 被 cyber safeguard 拦截  
- `--json-schema` 下长 StructuredOutput 少一个右花括号，strict enforcement 未捕获  

这类问题会影响自动化 pipeline、结构化代理调用和 CI 工作流中的可信度。

---

## 6. 开发者关注点

### 1. Agent 工作流的一致性与可恢复性  
`spawn_task`、cloud session、daemon background session 等问题显示，开发者越来越依赖 Claude Code 的多 agent / 后台任务能力。但当前痛点在于：  
- 本地与 cloud 行为不一致  
- prompt、plan、state 传递边界不清晰  
- 后台任务继承环境不可预测  

---

### 2. 长会话中的规则遵循仍不稳定  
多个用户反馈 Claude 在会话进行一段时间后忽略 `claude.md`、语言偏好或保存偏好。对团队开发来说，这会影响代码风格、审查规范、语言一致性和项目约束执行。

---

### 3. 桌面端正在暴露生产级负载问题  
Windows Desktop 的内存问题、session 消失问题，以及 Linux WebAuthn 失败都说明桌面端已进入多 session、长时间运行、企业认证等更复杂场景。社区希望桌面端具备更强的资源释放、会话恢复和认证兼容能力。

---

### 4. 集成链路仍是生产力核心瓶颈  
GitHub、VS Code、MCP、IDE connection 一旦失效，Claude Code 的上下文能力会明显下降。开发者希望集成状态可见、错误原因明确，并能自动恢复连接。

---

### 5. 用户希望拥有更多控制权  
今天多条功能请求指向同一方向：开发者希望能更明确地控制 Claude Code 的行为，包括：  
- 关闭非关键通知  
- 控制 session URL attribution  
- CLI 内兑换 reset ticket  
- 恢复 prompt suggestion  
- 决定是否分享 transcript  
- 禁止 Cowork 强制展示保存卡片  

---

## 总结

今天最值得关注的是 **v2.1.287 引入 Claude Mods**，这为 Claude Code 插件生态和深度行为扩展打开了新空间。同时，社区反馈显示 Claude Code 在 **cloud agent 编排、桌面端稳定性、IDE/GitHub 集成、模型长期指令遵循** 方面仍有明显改进空间。  

短期看，开发者最期待的是更可靠的后台任务、更稳定的桌面端、更可控的 Cowork 体验，以及更透明的集成错误处理。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报  
**日期：2026-10-02**  
**仓库：github.com/openai/codex**

## 1. 今日速览

过去 24 小时 Codex 发布节奏较快，出现多个 Rust alpha 版本以及稳定版 `rust-v0.160.0`，重点改进包括任务浏览、Linux 终端文本选择/粘贴，以及非项目目录下的 session 启动体验。  
社区反馈主要集中在 **Codex Desktop / Dot / Cloud Tasks 的跨端一致性、Windows 客户端稳定性、消息队列与发送可靠性、Computer Use 可用性** 等方向。  
PR 侧则以基础设施增强为主，包括 exec-server 文件流式写入、TUI worktree 工具、权限目录统一、云线程 gRPC 客户端、TCP tunnel 诊断等。

---

## 2. 版本发布

### rust-v0.162.0-alpha.3  
链接：https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.3  
继续推进 0.162.0 alpha 线，当前 release note 未提供详细变更。

### rust-v0.162.0-alpha.2  
链接：https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.2  
0.162.0 alpha 迭代版本，未披露具体变更。

### rust-v0.162.0-alpha.1  
链接：https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.1  
0.162.0 alpha 首个版本，可能用于验证下一轮 Rust CLI / TUI / agent 基础设施变更。

### rust-v0.160.0  
链接：https://github.com/openai/codex/releases/tag/rust-v0.160.0  

主要更新：

- Agent command center 支持通过键盘可访问的 **“Show more”** 操作浏览更早任务。  
- Linux X11 本地终端 fullscreen 模式下支持选择 transcript 文本并使用中键粘贴。  
- 支持在项目外启动 session，并使用 workspace 默认配置。  

这次稳定版更偏向 **交互体验与可访问性改进**，尤其对 TUI 高频用户和 Linux 桌面开发者较有价值。

### rust-v0.161.0-alpha.8 / alpha.9 / alpha.12 / alpha.13  
链接：  
- https://github.com/openai/codex/releases/tag/rust-v0.161.0-alpha.8  
- https://github.com/openai/codex/releases/tag/rust-v0.161.0-alpha.9  
- https://github.com/openai/codex/releases/tag/rust-v0.161.0-alpha.12  
- https://github.com/openai/codex/releases/tag/rust-v0.161.0-alpha.13  

0.161.0 alpha 系列持续迭代，release note 未提供详细内容。

---

## 3. 社区热点 Issues

### 1. DOT 任务创建、断连通知与 Luna schema 多重异常  
Issue：https://github.com/openai/codex/issues/50127  
状态：OPEN｜评论：7  
标签：bug, model-behavior, app, connectivity, app-server, dots  

该 Issue 是今日讨论度最高的问题，集中描述 Dot workflow 中任务创建返回 `UNKNOWN`、断连通知滞后、任务读取语义不清以及 Luna schema 失败等问题。  
重要性在于它不是单点 UI bug，而是涉及 **Dot、任务系统、连接状态、后端 schema** 的复合型稳定性问题，可能影响用户对 Codex Cloud Task 的信任度。

### 2. VS Code 扩展在 Codex 工作时应保留并可视化排队 follow-up prompt  
Issue：https://github.com/openai/codex/issues/50139  
状态：OPEN｜评论：4  
标签：enhancement, extension  

用户希望 Codex 正在执行任务时，后续输入能够被明确接收、排队并可见。  
这是典型的 IDE agent UX 问题：开发者常在 agent 执行中补充指令，如果没有明确队列反馈，容易造成重复提交、上下文丢失或误判任务状态。该需求与多个“消息 stuck / queue 不工作”反馈形成呼应。

### 3. Cloud task 在 desktop、web、iOS、dot 间可见性和读写行为不一致  
Issue：https://github.com/openai/codex/issues/50136  
状态：OPEN｜评论：4  
标签：bug, codex-web, app-server, dots  

该问题指出 dot 创建的任务可被 dot 读取和继续，但不一定出现在 web 或 iOS 任务列表；反向路径也存在不一致。  
这是今日最关键的跨端一致性问题之一，直接影响 Codex Cloud Task 是否能作为统一任务对象在多端协作中可靠使用。

### 4. Windows 11 上 ChatGPT/Codex 桌面应用卡在 OpenAI logo  
Issue：https://github.com/openai/codex/issues/50156  
状态：OPEN｜评论：3  
标签：bug, windows-os, app  

Windows 11 build 26200 用户反馈应用启动后 renderer 无法继续渲染，长期停留在 OpenAI logo。  
此类问题属于客户端可用性阻断级 bug，且与 #50133 的 Windows 10 类似问题形成模式，说明 Windows 桌面端启动链路需要重点排查。

### 5. Windows Codex Chrome 权限在成功 browser control 后反复被拒绝  
Issue：https://github.com/openai/codex/issues/50153  
状态：OPEN｜评论：3  
标签：bug, windows-os, app, browser  

用户报告浏览器自动化曾可正常工作，但随后对新站点访问被安全策略拒绝，并错误归因为用户拒绝授权。  
重要性在于 Browser Control 是 Computer Use / agent 自动化的关键能力，权限状态误判会显著降低自动化任务可靠性。

### 6. 同一任务可接收 assistant continuation，但用户直接输入仍显示排队且无法发送  
Issue：https://github.com/openai/codex/issues/50142  
状态：OPEN｜评论：2  
标签：bug, app, session  

该问题说明在更新并完整重启后，同一任务仍存在用户消息无法正常发送的问题。  
它与 VS Code queue 需求、Windows 消息消失、extension message stuck 等问题同属 **消息提交/队列状态机** 方向，值得作为一类问题聚合分析。

### 7. Codex Web 提交消息时报错：Unable to determine project root for task  
Issue：https://github.com/openai/codex/issues/50178  
状态：OPEN｜评论：1  
标签：bug, codex-web  

用户在私有仓库重新配置环境后，Codex Web 因 cloud provisioning failure 无法确定 project root。  
这类问题影响 Codex Web 的 onboarding 和环境恢复能力，尤其对私有仓库、云环境重建、CI-like agent 场景影响较大。

### 8. dot cloud computer 持续 Offline/Unavailable，computer-control 连接被拒绝  
Issue：https://github.com/openai/codex/issues/50172  
状态：OPEN｜评论：1  
标签：bug, app, connectivity, computer-use  

该 Issue 指出 dot 聊天仍可用，但 dot 的云电脑无法操作，computer-control 连接反复被拒绝。  
这反映出 Dot 的 conversational layer 与 computer-control layer 可能存在状态分裂，用户能“对话”但无法“执行”，是 Computer Use 体验中的高优先级故障。

### 9. dot 无法继续已有 Windows 本地连接任务：placement format version 2 / CloudThreadNotFoundError  
Issue：https://github.com/openai/codex/issues/50171  
状态：OPEN｜评论：1  
标签：bug, windows-os, app, app-server, remote  

问题涉及 dot、Windows desktop app、本地连接任务以及 CloudThreadNotFoundError。  
这与 #50157、#50168 中的 placement format / cloud thread 问题相互印证，显示 cloud thread resume / attach / placement schema 仍是近期重点风险区。

### 10. Windows 消息点击 Send 后消失，无响应也无错误，重复多次后偶尔成功  
Issue：https://github.com/openai/codex/issues/50154  
状态：OPEN｜评论：1｜👍：1  
标签：bug, windows-os, app  

用户反馈消息发送后直接消失，没有错误提示，重复 5–6 次后才成功。  
该问题虽评论不多，但获得点赞，并且严重影响基本交互可信度。对开发者而言，“无错误、无回执”的失败模式比显式报错更难排查。

---

## 4. 重要 PR 进展

### 1. exec-server 支持可写文件流  
PR：https://github.com/openai/codex/pull/50177  
状态：CLOSED  

新增 `fileWriteStreaming` 能力，支持通过 `fs/open` 的 `mode: "replace"` 创建或截断文件，并通过 `fs/writeBlock` 按偏移写入数据块。  
这为 agent 执行环境中的大文件生成、分块写入、远程文件编辑提供了更稳健的底层能力。

### 2. 升级 `age` 至 0.12.1 并移除过时安全例外  
PR：https://github.com/openai/codex/pull/50166  
状态：CLOSED  

升级本地 secrets storage 相关依赖，移除针对 `RUSTSEC-2026-0173` 的例外。  
该 PR 属于供应链安全改进，减少未维护依赖带来的长期风险。

### 3. 限制 exec-server 中正在进行的文件 open 数量  
PR：https://github.com/openai/codex/pull/50162  
状态：CLOSED  

此前 per-connection 的 128 个 file read handle 限制只在文件打开后检查，pending open 不受限。  
该 PR 在 poll file-open future 前预留 semaphore permit，使 pending opens 也计入限制，有助于防止资源耗尽。

### 4. TUI 新增 managed worktree 工具  
PR：https://github.com/openai/codex/pull/50148  
状态：CLOSED  

在启用 worktrees feature 且本地项目可信、attachment storage 可用时，通过 MCP 暴露：

- `create_worktree`
- `get_worktree_creation_status`
- `list_worktrees`

这对多分支、多任务并行开发非常重要，可让 agent 更安全地在独立 worktree 中执行修改。

### 5. TUI 权限快捷操作改用 server permission catalog  
PR：https://github.com/openai/codex/pull/50140  
状态：CLOSED  

将权限快捷操作与连接服务器的权限目录保持一致，避免本地配置与 server catalog 不一致。  
这对模型特定权限、auto-review 要求、安全策略一致性有明显价值。

### 6. TCP tunnel 新增 opt-in JSON diagnostics  
PR：https://github.com/openai/codex/pull/50131  
状态：CLOSED  

新增 `codex tcp-tunnel --diagnostics-json`，以 NDJSON 形式输出版本化诊断信息，覆盖 startup、CONNECT、transport、control 等失败类型。  
该能力可显著提升远程连接、代理、隧道问题的可观测性，同时避免泄露凭据和原始地址信息。

### 7. 为 remote MCP server 保留 Windows 环境变量  
PR：https://github.com/openai/codex/pull/50129  
状态：CLOSED  

修复 Codex 在 Unix 侧启动 Windows executor 上的 stdio MCP server 时，Windows 运行时和临时目录变量可能被 Unix 默认 allowlist 过滤的问题。  
这对跨平台远程执行和 Windows MCP 集成非常关键。

### 8. 暴露 running turn 下一步所选模型  
PR：https://github.com/openai/codex/pull/50128  
状态：CLOSED  

新增 `CodexThread::current_turn_model`，可返回指定 running turn 下一步使用的模型 slug。  
这对调试动态模型选择、观察 agent 执行策略、解释行为差异有帮助。

### 9. 新增 cloud thread resume / attach 原生 gRPC 客户端  
PR：https://github.com/openai/codex/pull/50113  
状态：CLOSED  

新增 `codex-cloud-client`，支持通过 HTTP/2 调用 `ThreadService.Resume` 和 live `ThreadService.Attach`。  
结合今日大量 cloud thread / dot / task resume 相关 Issue，这一底层能力非常值得关注，可能是后续跨端任务恢复稳定性的基础设施。

### 10. 保留 queued agent mail，避免 session eviction 丢失队列消息  
PR：https://github.com/openai/codex/pull/50087  
状态：CLOSED  

该 PR 让未读的 queue-only messages 不再阻止 idle agent unload，同时在 agent session eviction 后保留 pending mail。  
这与社区今日对 prompt queue、follow-up message、消息 stuck 的关注高度相关，有助于提升多 agent / 长会话场景的可靠性。

---

## 5. 功能需求趋势

### 1. 消息队列与 follow-up prompt 可视化  
相关 Issue：  
- https://github.com/openai/codex/issues/50139  
- https://github.com/openai/codex/issues/50124  
- https://github.com/openai/codex/issues/50142  
- https://github.com/openai/codex/issues/50175  
- https://github.com/openai/codex/issues/50154  

开发者希望在 Codex 正忙时，后续输入能够：

- 明确显示是否已接收；
- 可见地排队；
- 支持取消或编辑；
- 失败时给出明确错误；
- 不要出现“消息消失但无响应”的状态。

这是当前 IDE extension、desktop app、agent session 共同暴露的高频需求。

### 2. 跨端 Cloud Task / Dot / Codex Web 一致性  
相关 Issue：  
- https://github.com/openai/codex/issues/50136  
- https://github.com/openai/codex/issues/50168  
- https://github.com/openai/codex/issues/50157  
- https://github.com/openai/codex/issues/50171  

社区希望任务在 desktop、web、iOS、dot、remote session 之间具备一致的：

- 可见性；
- 读取能力；
- 继续对话能力；
- thread identity；
- placement format 兼容性。

目前 CloudThreadNotFoundError、unsupported placement format、任务列表不同步是核心痛点。

### 3. Windows 桌面端稳定性  
相关 Issue：  
- https://github.com/openai/codex/issues/50156  
- https://github.com/openai/codex/issues/50133  
- https://github.com/openai/codex/issues/50153  
- https://github.com/openai/codex/issues/50145  
- https://github.com/openai/codex/issues/50167  
- https://github.com/openai/codex/issues/50125  

Windows 相关反馈覆盖启动、WebView2、浏览器权限、Computer Use overlay、WSL2 exec、更新后需重启等。  
这说明 Windows 已是 Codex Desktop 的重点使用平台，但稳定性和诊断能力仍需加强。

### 4. Computer Use / Browser Control 可用性  
相关 Issue：  
- https://github.com/openai/codex/issues/50172  
- https://github.com/openai/codex/issues/50130  
- https://github.com/openai/codex/issues/50150  
- https://github.com/openai/codex/issues/50153  
- https://github.com/openai/codex/issues/50176  

主要关注点包括：

- cloud computer offline；
- native connection refused；
- browser target closed；
- sandbox 启动失败；
- 权限校验错误；
- 预览隐藏后仍持续下载流量。

Computer Use 的核心需求已经从“能否使用”转向“长时间是否稳定、状态是否可解释、资源是否可控”。

### 5. 诊断、可观测性与错误透明度  
相关 PR：  
- https://github.com/openai/codex/pull/50131  
- https://github.com/openai/codex/pull/50128  
- https://github.com/openai/codex/pull/50140  

相关 Issue：  
- https://github.com/openai/codex/issues/50154  
- https://github.com/openai/codex/issues/50178  
- https://github.com/openai/codex/issues/50126  

用户对“失败但无错误”“权限被拒但原因不明”“连接不可用但不知道是哪层失败”的容忍度很低。  
Codex 需要更多结构化诊断、明确错误码和可导出的调试信息。

---

## 6. 开发者关注点

### 1. 基础消息发送必须更可靠  
多个 Issue 指向同一个问题：用户输入后，系统不知道是“已发送、排队、丢失、被拒绝、还是仍在等待”。  
对于 agent 工具而言，消息通道是最基础的控制面，一旦不可预测，开发者就会失去对任务执行的信心。

### 2. Dot 与 Cloud Task 的对象模型需要统一  
当前社区反馈显示 dot、Codex Cloud、desktop local task、remote session、iOS/web task list 之间存在身份、可见性、placement format 不一致问题。  
开发者真正需要的是一个稳定的 thread/task identity，可以跨端恢复、继续、追踪。

### 3. Windows 是高优先级稳定性战场  
今日 Windows 相关问题数量明显偏高，覆盖 app 启动、browser control、WSL2、Computer Use、WebView2、权限与更新流程。  
建议后续重点增强 Windows 端日志收集、启动诊断、权限状态可视化和自动修复机制。

### 4. TUI / CLI 正在快速增强，但需要保持交互一致性  
`rust-v0.160.0` 和多项 TUI PR 显示 CLI/TUI 方向仍在积极迭代，包括 worktree、权限、loading、fullscreen composer 等。  
开发者会期待这些能力与 Desktop / VS Code extension 的行为保持一致，尤其是权限、队列、任务状态和文件操作能力。

### 5. Cloud / Remote / MCP 场景正在成为主线  
PR 中出现 cloud gRPC client、remote MCP Windows env、TCP tunnel diagnostics、exec-server file streaming 等基础设施增强。  
这说明 Codex 正在强化远程执行与云端 agent 能力；对应地，社区也更关注连接失败、环境变量、project root、thread resume 等底层可靠性问题。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-10-02）

数据源：[`google-gemini/gemini-cli`](https://github.com/google-gemini/gemini-cli)

## 1. 今日速览

今日 Gemini CLI 发布了新的 nightly 版本 `v0.64.0-nightly.20261002.gc9096a847`，重点修复聊天记录增量写入、历史窗口控制，以及 CLI 状态持久化的原子性与损坏恢复问题。  
社区反馈主要集中在稳定性与非交互式/Agent 场景：包括 GoogleSearch 工具无超时导致卡死、macOS PTY 泄漏、高内存占用、MCP/ACP 权限提示信息不足，以及工具返回图片内容丢失等问题。  
PR 方面，多个修复已跟进对应 Issue，尤其是 MCP 权限请求增强、图片 `functionResponse.parts` 保留、gVisor 沙箱 IPC fallback 等，显示项目近期重点在可靠性、沙箱兼容和 Agent 工具链体验上。

---

## 2. 版本发布

### [`v0.64.0-nightly.20261002.gc9096a847`](https://github.com/google-gemini/gemini-cli/releases/tag/v0.64.0-nightly.20261002.gc9096a847)

本次 nightly 版本包含两项关键修复：

1. **ChatRecordingService 增量记录与历史窗口优化**  
   - PR: [#29568](https://github.com/google-gemini/gemini-cli/pull/29568)  
   - 实现 append-only delta patching，避免聊天记录频繁重写。
   - 引入 bounded history windowing，降低长会话记录带来的性能与内存压力。

2. **CLI 状态持久化可靠性增强**  
   - 修复 CLI 状态写入的原子性问题。
   - 在状态文件损坏时支持从备份恢复。
   - 这类修复对长期运行、异常退出、断电或并发写入场景较重要。

---

## 3. 社区热点 Issues

> 过去 24 小时内共更新 7 条 Issue，因此本日报仅列出全部 7 条，而非 10 条。

### 1. GoogleSearch 工具无超时导致 CLI 无限卡在 `Thinking...`

- Issue: [#29594](https://github.com/google-gemini/gemini-cli/issues/29594)
- 状态：Open
- 标签：`priority/p1`, `area/agent`, `kind/bug`
- 重要性：高

该问题描述内置 `GoogleSearch` 工具调用后可能无限停留在 `Thinking...` 状态，不超时、不报错，也不把控制权交还给用户。  
这是一个 P1 级 Agent 可靠性问题，直接影响 CLI 在自动化任务和交互式任务中的可用性。对工具调用框架而言，超时、取消、错误恢复机制是基础能力，因此该问题值得优先关注。

社区反应：目前评论数为 0，但已被标记为 P1，说明维护侧已认可其严重性。

---

### 2. macOS 下已完成 shell 命令后 PTY master 泄漏

- Issue: [#29592](https://github.com/google-gemini/gemini-cli/issues/29592)
- 状态：Open
- 标签：`area/core`, `effort/large`
- 重要性：高

用户反馈 Gemini CLI `0.62.0` 在 macOS 上每执行一个普通 shell 命令后，会保留一个 `/dev/ptmx` master，最终耗尽主机 PTY 限制，导致无法打开新的终端或登录会话。  
该问题被认为可能是旧问题 [#15945](https://github.com/google-gemini/gemini-cli/issues/15945) 在 [#25079](https://github.com/google-gemini/gemini-cli/pull/25079) 后的回归。

社区反应：目前评论数较少，但该问题影响系统资源，且可能导致宿主机终端能力被耗尽，属于高风险稳定性问题。

---

### 3. 高内存占用：PDF/Markdown ingest 场景达到 7.28 GB

- Issue: [#29591](https://github.com/google-gemini/gemini-cli/issues/29591)
- 状态：Open
- 标签：`area/core`, `effort/large`
- 重要性：高

用户在使用 `gemini-3-flash-preview` 进行 LLM wiki ingest 时上传了两个 80 页 PDF 和一个短 Markdown 文件，模型思考约 18 分钟后触发高内存告警，内存达到 7.28 GB。  
该问题暴露出长上下文、多文档摄取、模型 fallback 和 token 耗尽场景下的资源管理压力。

社区反应：目前只有少量讨论，但这类问题对于企业文档处理、知识库构建和长任务 Agent 非常关键。

---

### 4. `read_file` 读取图片后未真正传给模型

- Issue: [#29589](https://github.com/google-gemini/gemini-cli/issues/29589)
- 状态：Open
- 标签：`area/core`, `effort/small`
- 重要性：高

用户发现通过 `read_file` 读取图片时，工具显示成功，但模型只收到 `"Binary content provided (1 item(s))."`，没有实际图片内容，因此会“凭空描述”它并未看到的图像。  
根因指向 `stripToolCallIdPrefixes` 丢弃了 `functionResponse.parts`。

社区反应：该问题已有对应修复 PR [#29590](https://github.com/google-gemini/gemini-cli/pull/29590)，说明反馈已被快速响应。

---

### 5. ACP 模式下 MCP 工具权限请求缺少服务器与工具信息

- Issue: [#29595](https://github.com/google-gemini/gemini-cli/issues/29595)
- 状态：Open
- 标签：`area/non-interactive`, `effort/small`
- 重要性：中高

在 `gemini --acp` 场景下，ACP 客户端通过 `session/new` 提供自定义 MCP server 时，每次工具调用权限请求都没有足够信息说明“哪个 server、哪个 tool”正在请求授权。  
这会导致客户端无法可靠地区分不同 MCP server，也无法提前授权自有 server。

社区反应：已有对应 PR [#29596](https://github.com/google-gemini/gemini-cli/pull/29596)，修复方向明确。

---

### 6. `formatDuration()` 在单位边界附近显示异常

- Issue: [#29600](https://github.com/google-gemini/gemini-cli/issues/29600)
- 状态：Open
- 标签：`priority/p3`, `area/core`, `kind/bug`, `help wanted`, `effort/small`
- 重要性：中

`formatDuration()` 会先基于原始值选择单位，再进行四舍五入，导致边界附近出现 `"1000ms"`、`"60.0s"` 这类不自然显示。  
例如 `999.6ms` 可能应显示为 `1.0s`，而不是 `1000ms`。

社区反应：评论数为 7，是今日讨论最多的 Issue。虽然优先级为 P3，但作为 UI/UX 细节问题，适合社区贡献者快速修复。

---

### 7. Nightly evals 无报告时仍显示成功

- Issue: [#29598](https://github.com/google-gemini/gemini-cli/issues/29598)
- 状态：Open
- 标签：`status/need-triage`, `area/platform`
- 重要性：中

`scripts/aggregate_evals.js` 在找不到 eval 报告时打印 `"No reports found."` 并以 `process.exit(0)` 成功退出，但代码注释表明“如果当前没有报告，实际上说明出了问题”。  
这会导致 CI / nightly eval 汇总任务在缺少评估报告时仍显示绿色，掩盖真实问题。

社区反应：暂无评论，但对发布质量、回归检测和自动化评估可信度有直接影响。

---

## 4. 重要 PR 进展

> 过去 24 小时内共更新 5 条 PR，因此本日报仅列出全部 5 条，而非 10 条。

### 1. 增强 ACP 权限请求：包含 MCP server 和 tool 名称

- PR: [#29596](https://github.com/google-gemini/gemini-cli/pull/29596)
- 状态：Open
- 标签：`area/non-interactive`, `size/m`
- 关联 Issue: [#29595](https://github.com/google-gemini/gemini-cli/issues/29595)

该 PR 在 ACP 客户端审批 MCP 工具调用时，新增 server name 和 tool name 信息。  
此前权限请求只有类似 `list_items (my-server MCP Server)` 的标题，客户端难以判断真实请求来源。该改动有助于提升非交互式 Agent、外部客户端集成和多 MCP server 场景下的安全性与可审计性。

---

### 2. 修复工具响应中图片内容丢失问题

- PR: [#29590](https://github.com/google-gemini/gemini-cli/pull/29590)
- 状态：Open
- 标签：`area/core`, `size/s`
- 关联 Issue: [#29589](https://github.com/google-gemini/gemini-cli/issues/29589)

该 PR 修复 `stripToolCallIdPrefixes()` 在重建带前缀的 `functionResponse` 时丢弃 `parts` 的问题。  
这对于截图读取、图片分析、多模态工具调用非常关键，因为 `functionResponse.parts` 中承载了由工具返回的图片等二进制内容。

---

### 3. gVisor / runsc 沙箱环境下支持 IPC socket fallback

- PR: [#29597](https://github.com/google-gemini/gemini-cli/pull/29597)
- 状态：Open
- 标签：`priority/p2`, `area/extensions`, `size/l`, `maintainer only`

该 PR 针对 `GEMINI_SANDBOX=runsc` 场景修复 Companion / extension 通信问题。  
由于 gVisor 的 user-space Netstack 会隔离容器 loopback，阻止容器访问宿主机 `127.0.0.1`，因此该 PR 增加 stdio IPC fallback，并修复容器 host/token 配置。

这对受限沙箱、企业安全环境、容器化开发者工具集成具有较高价值。

---

### 4. Nightly 自动版本提升至 `0.64.0-nightly.20261002.gc9096a847`

- PR: [#29599](https://github.com/google-gemini/gemini-cli/pull/29599)
- 状态：Open
- 标签：`size/s`, `status/need-issue`

这是 nightly 发布流程中的自动版本 bump PR。  
虽然功能变化不大，但反映出项目仍保持高频 nightly 发布节奏，便于社区快速验证最新修复。

---

### 5. 安全研究：`workflow_run` artifact chain PoC

- PR: [#29601](https://github.com/google-gemini/gemini-cli/pull/29601)
- 状态：Open
- 标签：`size/xs`, `status/need-issue`

该 PR 是一个负责任披露性质的安全研究 PoC，只在 `scripts/build.js` 中添加 3 行 `console.log`，用于打印 `GEMINI_API_KEY` 和 `GITHUB_TOKEN` 是否存在于环境变量中。  
作者声明不会泄露、记录或传输任何密钥。

该 PR 的意义在于验证 GitHub Actions `workflow_run` / artifact chain 相关安全边界，维护者需要谨慎审查 CI 权限、artifact 信任链和 secret 暴露风险。

---

## 5. 功能需求趋势

### 1. Agent 工具调用需要更强的超时与恢复机制

相关 Issue：

- [#29594](https://github.com/google-gemini/gemini-cli/issues/29594)

GoogleSearch 工具无限卡死表明，Agent 工具链需要统一的 timeout、cancel、error propagation 和 session recovery 机制。  
随着 Gemini CLI 越来越多承担 Agent 执行器角色，工具调用的可靠性会成为核心体验指标。

---

### 2. MCP / ACP 非交互式集成正在成为重点场景

相关 Issue / PR：

- [#29595](https://github.com/google-gemini/gemini-cli/issues/29595)
- [#29596](https://github.com/google-gemini/gemini-cli/pull/29596)

社区正在推动 ACP 客户端、MCP server、自定义工具生态的精细化权限控制。  
需求重点包括：

- 权限请求中明确 server/tool 来源
- 客户端可预授权可信 MCP server
- 多 server 同名工具冲突识别
- 非交互式 Agent 的安全审批流程

---

### 3. 多模态工具链可靠性受到关注

相关 Issue / PR：

- [#29589](https://github.com/google-gemini/gemini-cli/issues/29589)
- [#29590](https://github.com/google-gemini/gemini-cli/pull/29590)

图片读取后未进入模型上下文的问题说明，多模态内容在工具响应传递链路中仍存在边界缺陷。  
未来需求可能集中在：

- 图片、PDF、二进制内容的端到端验证
- 工具响应 schema 更严格的测试覆盖
- 模型上下文中实际收到内容的可观测性

---

### 4. 长任务与大文档处理对内存管理提出更高要求

相关 Issue：

- [#29591](https://github.com/google-gemini/gemini-cli/issues/29591)

PDF ingest、LLM wiki 构建、长时间推理和 fallback 模型切换等场景，会持续放大 Gemini CLI 的内存与上下文管理压力。  
社区可能会期待：

- 更清晰的资源上限配置
- 长任务进度可视化
- 文件 ingest 分块策略优化
- 内存告警后的自动降级或恢复机制

---

### 5. 沙箱与容器化兼容性需求上升

相关 PR：

- [#29597](https://github.com/google-gemini/gemini-cli/pull/29597)

gVisor/runsc 场景下的 IPC fallback 表明，Gemini CLI 正被用于更严格的隔离环境中。  
这类需求通常来自企业开发、安全执行环境、CI/CD Agent 和远程容器开发。

---

### 6. CI / eval 质量门禁需要更可信

相关 Issue：

- [#29598](https://github.com/google-gemini/gemini-cli/issues/29598)

Nightly evals 在没有报告时仍然成功，会削弱自动化评估的可信度。  
社区对高频发布项目的期待是：CI 不仅“绿色”，还应能准确反映测试和评估是否真正执行。

---

## 6. 开发者关注点

### 1. 稳定性是今日最突出的主题

多个问题都直接影响 CLI 可用性：

- GoogleSearch 工具卡死：[#29594](https://github.com/google-gemini/gemini-cli/issues/29594)
- macOS PTY 泄漏：[#29592](https://github.com/google-gemini/gemini-cli/issues/29592)
- 高内存占用：[#29591](https://github.com/google-gemini/gemini-cli/issues/29591)

开发者希望 Gemini CLI 在长会话、工具调用、shell 执行和文档摄取场景下更加可控、可恢复。

---

### 2. 非交互式 Agent 使用者需要更安全、可审计的权限模型

ACP + MCP 场景暴露出的主要痛点是：权限请求信息不足，客户端无法精确判断调用来源。  
相关修复 [#29596](https://github.com/google-gemini/gemini-cli/pull/29596) 说明维护者已开始补齐这一能力。

---

### 3. 多模态能力不仅要“支持”，还要保证链路完整

`read_file` 图片未传给模型的问题反映出：工具执行成功不等于模型实际收到了内容。  
这对截图理解、视觉调试、浏览器自动化、多模态 Agent 都是关键基础能力。

---

### 4. 社区也在关注小而明确的 DX / UX 问题

`formatDuration()` 边界显示异常虽然不是严重 bug，但已有 7 条评论，说明开发者对 CLI 输出质量和细节一致性仍较敏感。  
相关 Issue：[#29600](https://github.com/google-gemini/gemini-cli/issues/29600)

---

### 5. 安全与供应链风险进入社区视野

安全研究 PR [#29601](https://github.com/google-gemini/gemini-cli/pull/29601) 指向 GitHub Actions 工作流、artifact chain 和 secret 可见性问题。  
随着 Gemini CLI 作为开发者工具被集成进更多 CI/CD 与 Agent 工作流，构建链路安全会变得越来越重要。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报  
日期：2026-10-02  
仓库：github.com/github/copilot-cli

## 1. 今日速览

过去 24 小时 Copilot CLI 连续发布了多个 1.0.91 / 1.0.92 系列版本，重点围绕 Sandbox CA 管理、Windows 沙箱支持、遥测退出刷新以及 MCP OAuth 重新认证后的稳定性修复。  
社区反馈主要集中在 MCP 通知噪音、Autopilot 行为、沙箱网络 / 权限、ACP 自定义 Agent、工具调用兼容性等方向，显示 Copilot CLI 正在从“可用”进入“高频工程工作流中的稳定性打磨”阶段。

---

## 2. 版本发布

### v1.0.92-0  
链接：<https://github.com/github/copilot-cli/releases/tag/v1.0.92-0>

**修复内容**
- 修复 MCP 工具在 OAuth 重新认证后，如果工具定义未变化，仍能继续正常工作的问题。
- 该修复对依赖外部 MCP Server 的用户较重要，尤其是长会话、企业认证、远程工具链集成场景。

### v1.0.91  
链接：<https://github.com/github/copilot-cli/releases/tag/v1.0.91>

**主要更新**
- 新增 `copilot sandbox ca` 命令集：
  - `check`
  - `create`
  - `trust`
  - `rotate`
  - `remove`
- 支持代理 CA 信任的检查、创建、信任、轮换与移除。
- 支持 Windows 下无人值守 CA 配置。
- `/sandbox ca install` 被拆分为更明确的 `create` 与 `trust`。
- Session timeline 在中断回合结束后会清理 busy 状态。
- Sandboxed commands 开始支持 Windows。

**影响**
- Sandbox 体系继续增强，尤其是企业代理、HTTPS 检查、受控网络环境下的可用性。
- Windows 支持进一步成熟，说明 Copilot CLI 正在扩展到更多主流开发环境。

### v1.0.91-1  
链接：<https://github.com/github/copilot-cli/releases/tag/v1.0.91-1>

**新增**
- 同样引入 `copilot sandbox ca` 系列命令。

**改进**
- CLI 关闭时会在退出前刷新 pending telemetry，并设置有界延迟，降低遥测数据丢失概率。
- 对排查 CLI 稳定性、使用行为和错误路径有帮助。

---

## 3. 社区热点 Issues

### 1. MCP 状态通知过于冗长，希望增加关闭选项  
Issue：[#5034](https://github.com/github/copilot-cli/issues/5034)  
状态：Open，triage  
作者：smritiy  
评论：1，👍 0

用户希望增加类似 `mcp.showStatusNotifications: false` 的设置，用于隐藏 MCP 连接、断开、工具可用性等状态通知。

**重要性**
- MCP 已成为 Copilot CLI 扩展工具能力的重要入口。
- 当用户配置多个 MCP Server 时，启动和会话过程中的状态通知可能干扰核心对话体验。

**社区反应**
- 已有初步讨论，虽然互动量不高，但该需求代表了“信息密度可控”的体验优化方向。

---

### 2. grep 工具静默忽略 `n` 参数，导致缺失行号  
Issue：[#5038](https://github.com/github/copilot-cli/issues/5038)  
状态：Open，triage  
作者：nefayran  
评论：0，👍 0

内置 grep 工具仅在收到 `"-n": true` 时返回行号；如果模型传入 `n` 而非 `-n`，工具不会报错，只是静默忽略，导致结果没有行号。

**重要性**
- 这是典型的 Agent 工具调用鲁棒性问题。
- 模型在生成工具参数时可能丢失短横线，工具层如果不做兼容或报错，会影响代码定位质量。
- 用户提到在 1.0.90 的 664 次 headless benchmark 中观察到模型确实会出现该类参数退化。

**社区反应**
- 暂无评论，但该问题对自动化评测、Headless 模式和代码修复任务影响较大。

---

### 3. 剪贴板粘贴的图片在 rewind 后丢失  
Issue：[#5037](https://github.com/github/copilot-cli/issues/5037)  
状态：Open，triage  
作者：david8128  
评论：0，👍 0

用户反馈从剪贴板粘贴的截图首次可用，但在执行 rewind 后，对话中的图片丢失。

**重要性**
- 多模态输入已成为 AI 编程工具的重要能力。
- Rewind 是会话回滚机制，如果不能正确保留图片上下文，会破坏调试截图、UI 问题定位、错误截图分析等工作流。

**社区反应**
- 暂无评论，但该问题涉及会话状态一致性和附件生命周期管理。

---

### 4. CLI 更新停止，但 `events.jsonl` 持续增长  
Issue：[#5035](https://github.com/github/copilot-cli/issues/5035)  
状态：Open，triage  
作者：logar16  
评论：0，👍 0

用户在多个会话运行时观察到部分 session 不再更新 UI，尽管底层 agent 仍在工作，`events.jsonl` 继续增长。

**重要性**
- 这是严重的可观测性 / UI 同步问题。
- 对长任务、多会话开发者影响明显：任务可能仍在执行，但用户无法确认进度或结果。
- 也可能与事件流消费、前端刷新、会话状态机有关。

**社区反应**
- 暂无评论，但属于高优先级稳定性问题。

---

### 5. 希望关闭 Autopilot 模式中的 “Task complete” 摘要  
Issue：[#5033](https://github.com/github/copilot-cli/issues/5033)  
状态：Open，triage  
作者：reginaldStjohn  
评论：0，👍 0

Autopilot 模式每次回答后都会输出 “Task complete” 摘要，用户希望提供开关关闭。

**重要性**
- 与 #5034 类似，反映用户希望减少重复性输出。
- 对高频任务、脚本化使用、终端空间有限的场景很有价值。

**社区反应**
- 暂无评论，但该需求与 CLI 输出精简、自动化友好高度相关。

---

### 6. Agent 创建的 commit 可能因 `Copilot-Session` 破坏共同作者识别  
Issue：[#5032](https://github.com/github/copilot-cli/issues/5032)  
状态：Open，triage  
作者：mwiemer-microsoft  
评论：0，👍 0

用户指出 commit message 中 `Copilot-Session` 出现在 `Co-authored-by` 之后，可能导致 GitHub 无法正确识别共同作者。

**重要性**
- 影响 Copilot App / CLI 自动提交生成的 Git 元数据质量。
- 对开源协作、审计、贡献归属和企业合规都有影响。
- 这类问题虽小，但会直接影响开发者对自动提交功能的信任。

**社区反应**
- 暂无评论，但问题描述包含具体 PR 和 commit 证据，便于复现和修复。

---

### 7. 任务运行中开启 Autopilot 后，工具调用开始出现权限错误  
Issue：[#5031](https://github.com/github/copilot-cli/issues/5031)  
状态：Open，triage  
作者：dpazos-infragistics  
评论：0，👍 0

当用户在长任务运行过程中开启 Autopilot，后续工具调用开始失败，错误为：

> Permission denied and could not request permission from user

**重要性**
- 涉及权限模型和运行时状态切换。
- 如果 Autopilot 权限策略只在任务启动时初始化，中途切换可能导致 harness 与 UI 状态不一致。
- 对长任务、自动修复、批量修改场景影响明显。

**社区反应**
- 暂无评论，但这是 Autopilot 模式稳定性的核心问题之一。

---

### 8. ACP 模式下 task tool 无法启动自定义 Agent  
Issue：[#5030](https://github.com/github/copilot-cli/issues/5030)  
状态：Open，triage  
作者：DCarretero59  
评论：0，👍 0

从 1.0.89 开始，在 `copilot --acp` 模式下，task tool 无法启动 `~/.copilot/agents` 中的自定义 Agent，报错：

> Unsupported native sessions host effect 'custom_agent_prompt'

**重要性**
- ACP 模式和自定义 Agent 是 Copilot CLI 高级扩展能力的重要部分。
- 如果自定义 Agent 无法启动，会影响团队定制工作流、专用代码审查 Agent、项目级自动化 Agent 等场景。
- 该问题还暗示 native session host effect 与 ACP 支持之间存在兼容断层。

**社区反应**
- 暂无评论，但 regression 信息明确，版本范围清晰。

---

### 9. 希望在 status line payload 中暴露 quota 使用量和账期时间  
Issue：[#5029](https://github.com/github/copilot-cli/issues/5029)  
状态：Open，triage  
作者：rca-umb  
评论：0，👍 0

用户希望 `statusLine.command` 收到的 JSON payload 中包含更详细的账户配额、用量和 billing period 信息，而不仅是当前的 `cost.total_premium_requests`。

**重要性**
- 反映用户对成本和额度可观测性的需求增强。
- 对企业用户、重度用户、CI/headless 自动化使用者尤其重要。
- 如果状态栏能展示剩余额度、账期重置时间，可减少意外超限或成本不透明问题。

**社区反应**
- 暂无评论，但这是 Copilot CLI 走向专业化、企业化使用的重要增强方向。

---

### 10. Linux Sandbox 使用 systemd-resolved stub resolver 时 DNS 失效  
Issue：[#5027](https://github.com/github/copilot-cli/issues/5027)  
状态：Open，triage  
作者：kien-truong  
评论：0，👍 0

当 Linux 主机使用 `systemd-resolved` stub resolver 时，Sandbox 共享宿主机 `/etc/resolv.conf`，其中 nameserver 为 `127.0.0.53`。该地址在沙箱内部不可达，导致 DNS 解析失败。

**重要性**
- 影响 Linux Sandbox 的基础网络可用性。
- `systemd-resolved` 在现代 Linux 发行版中非常常见，因此影响面可能较广。
- DNS 失败会导致包管理、依赖安装、网络请求、远程 API 调用等全部受阻。

**社区反应**
- 暂无评论，但这是 Sandbox 生产可用性必须解决的基础设施问题。

---

## 4. 重要 PR 进展

过去 24 小时仅有 1 个 PR 更新。

### 1. 更新 README 中的默认模型版本说明  
PR：[#5036](https://github.com/github/copilot-cli/pull/5036)  
状态：Open  
作者：mjgard  
评论：未提供，👍 0

该 PR 更新 README 文档，使默认模型说明与当前 Copilot CLI 实际行为保持一致。

**重要性**
- 虽然是文档更新，但默认模型信息直接影响用户对性能、能力、成本和行为差异的理解。
- 对新用户和评估 Copilot CLI 的团队有实际帮助。
- 文档与产品行为保持一致，有助于减少误解和重复 Issue。

---

## 5. 功能需求趋势

### 1. 输出降噪与可配置性增强  
相关 Issue：  
- [#5034](https://github.com/github/copilot-cli/issues/5034)  
- [#5033](https://github.com/github/copilot-cli/issues/5033)

用户希望能够关闭 MCP 状态通知、Autopilot “Task complete” 摘要等重复性输出。  
这说明 Copilot CLI 在高频使用后，用户开始关注终端信息密度、可读性和可配置性。

### 2. Sandbox 稳定性和跨平台支持  
相关 Issue / Release：  
- [#5027](https://github.com/github/copilot-cli/issues/5027)  
- [v1.0.91](https://github.com/github/copilot-cli/releases/tag/v1.0.91)

Sandbox 正在快速增强，尤其是 Windows 支持、代理 CA 管理、Linux DNS 等问题。  
未来社区关注点预计会集中在网络、证书、权限、文件系统隔离和企业代理兼容性上。

### 3. Autopilot 权限与交互模型  
相关 Issue：  
- [#5031](https://github.com/github/copilot-cli/issues/5031)  
- [#5033](https://github.com/github/copilot-cli/issues/5033)

Autopilot 正在成为核心使用模式，但权限切换、任务结束提示、长任务状态同步等细节还需要打磨。  
用户不仅要求“自动执行”，还要求执行过程稳定、可控、低噪音。

### 4. MCP 与外部工具链集成体验  
相关 Issue / Release：  
- [#5034](https://github.com/github/copilot-cli/issues/5034)  
- [v1.0.92-0](https://github.com/github/copilot-cli/releases/tag/v1.0.92-0)

MCP 相关反馈既包括稳定性修复，也包括状态通知管理。  
这表明 MCP 已进入真实使用阶段，用户开始关心认证恢复、工具可用性、通知体验等工程化问题。

### 5. Agent 扩展能力与 ACP 兼容性  
相关 Issue：  
- [#5030](https://github.com/github/copilot-cli/issues/5030)

自定义 Agent 在 ACP 模式下的回归问题说明，高级用户正在构建更复杂的 Agent 工作流。  
后续可能需要更稳定的 Agent API、Host effect 兼容层和版本兼容策略。

### 6. 成本、额度和状态可观测性  
相关 Issue：  
- [#5029](https://github.com/github/copilot-cli/issues/5029)

用户希望在状态栏中看到 quota、billing period、剩余额度等信息。  
这反映 Copilot CLI 的使用频率和成本敏感度正在上升，尤其是团队和企业用户。

---

## 6. 开发者关注点

### 1. 长会话稳定性仍是核心痛点  
Issue [#5035](https://github.com/github/copilot-cli/issues/5035) 显示，事件流仍在写入但 UI 不更新的问题会严重影响长时间任务的可信度。  
这类问题对 Agent 型工具尤其关键，因为用户需要确认任务是否仍在推进。

### 2. 工具调用需要更强的容错能力  
Issue [#5038](https://github.com/github/copilot-cli/issues/5038) 表明，模型生成的参数可能并不完全符合工具 schema。  
开发者期望 CLI 工具层能够提供参数别名、明确报错或自动纠正，而不是静默失败。

### 3. Autopilot 的运行时状态切换需要更一致  
Issue [#5031](https://github.com/github/copilot-cli/issues/5031) 暴露了任务执行期间切换 Autopilot 后权限状态不一致的问题。  
这说明权限模型、用户授权和后台 harness 之间需要更清晰的同步机制。

### 4. Sandbox 需要适配真实企业与 Linux 环境  
近期发布的 Sandbox CA 命令和 Issue [#5027](https://github.com/github/copilot-cli/issues/5027) 都指向同一趋势：  
开发者希望 Sandbox 不只是隔离执行环境，还要能稳定适配代理、证书、DNS、Windows/Linux 差异。

### 5. 用户希望减少重复输出，提高信噪比  
MCP 状态通知和 Autopilot 完成摘要都被用户认为可能过于冗长。  
这说明在 CLI 场景中，默认输出策略需要兼顾新手可见性和重度用户效率。

### 6. 元数据和协作细节会影响信任  
Issue [#5032](https://github.com/github/copilot-cli/issues/5032) 反映出自动生成 commit 时的元数据顺序问题。  
这类细节会影响贡献归属、审计和协作体验，是 AI 编程工具进入真实团队工作流后必须重视的问题。

---

## 总结

今日 Copilot CLI 的核心关键词是：**Sandbox 增强、MCP 稳定性、Autopilot 可控性、工具调用鲁棒性、输出降噪**。  
版本层面，1.0.91 / 1.0.92 系列继续强化沙箱和 MCP；社区反馈层面，开发者更关注长任务稳定性、权限一致性、网络环境兼容和状态可观测性。整体来看，Copilot CLI 正在快速从功能扩展阶段进入工程化体验优化阶段。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报｜2026-10-02

## 1. 今日速览

过去 24 小时 OpenCode 没有新版本发布，但 Issue 与 PR 活跃度很高，重点集中在 **OpenCode Go 订阅/额度异常、MCP 稳定性、v2 会话与压缩逻辑、Provider/模型兼容性** 等方向。  
社区反馈中，付费订阅相关问题明显升温，多条 Issue 被标记为 `needs:compliance`；与此同时，维护者和贡献者提交了大量修复 PR，覆盖 ripgrep 并发、compaction、Provider 认证缓存、上下文溢出识别等核心稳定性问题。

---

## 2. 社区热点 Issues

### 1. OpenCode Go 订阅状态异常：订阅消失或无法加载  
- Issue: [#52595](https://github.com/anomalyco/opencode/issues/52595)  
- 状态：Open  
- 评论数：5  
- 重要性：这是今日评论最多的问题之一，用户反馈 Go 订阅仅持续半天或状态异常，涉及付费体验与合规处理。  
- 社区反应：多名用户在相近时间反馈类似问题，说明 Go 订阅系统可能存在批量性计费或状态同步异常。

### 2. MCP 网络变化后不自动重连  
- Issue: [#52564](https://github.com/anomalyco/opencode/issues/52564)  
- 状态：Open  
- 评论数：5  
- 重要性：用户在 VPN 切换或网络 socket reset 后，MCP server 不会自动重连，TUI 长时间显示 stale `Error`。  
- 社区反应：该问题影响长时间运行的 `opencode serve --service` 场景，对 MCP 工具链可靠性影响较大。

### 3. Go 订阅支付后返回 403  
- Issue: [#52596](https://github.com/anomalyco/opencode/issues/52596)  
- 状态：Open  
- 评论数：4  
- 重要性：用户称前一天已付费，次日无法使用并收到 403。  
- 社区反应：与 #52595、#52592、#52605 等问题形成明显聚类，说明订阅授权链路需要重点排查。

### 4. 用户被重复收费 / 额度未正确重置  
- Issue: [#52592](https://github.com/anomalyco/opencode/issues/52592)  
- 状态：Open  
- 评论数：4  
- 重要性：用户称同一天被扣费两次，但账户未显示额外额度。  
- 社区反应：涉及支付、账户余额和额度恢复，属于高优先级用户信任问题。

### 5. 中文用户反馈使用额度异常  
- Issue: [#52623](https://github.com/anomalyco/opencode/issues/52623)  
- 状态：Open  
- 评论数：3  
- 重要性：用户表示数小时未使用 API，但 5 小时额度、周额度、月额度均显示异常耗尽。  
- 社区反应：说明额度统计或同步可能存在误判，对高频用户影响明显。

### 6. 重启后旧 agent 实例仍在后台运行  
- Issue: [#52638](https://github.com/anomalyco/opencode/issues/52638)  
- 状态：Open  
- 评论数：2  
- 重要性：用户在 `opencode upgrade` 后发现旧 agent loop 没有停止，可能造成重复任务、资源泄漏或状态冲突。  
- 社区反应：该问题直接影响 v2.0.21 的升级体验和长任务稳定性。

### 7. ACP tool diff 生成逻辑不完整  
- Issue: [#52636](https://github.com/anomalyco/opencode/issues/52636)  
- 状态：Open  
- 评论数：2  
- 重要性：ACP completed `tool_call_update` diff 仅从 tool input 的 `oldString/newString` 生成，导致 write/patch 与插件 edit 工具无法输出 diff。  
- 社区反应：这是对工具调用可观测性和 IDE/ACP 集成质量影响较大的问题。

### 8. idle eviction 导致 pending question 被静默取消  
- Issue: [#52599](https://github.com/anomalyco/opencode/issues/52599)  
- 状态：Open  
- 评论数：2  
- 重要性：location 空闲 60 分钟被回收后，pending question form 只收到 `{ status: "cancelled" }`，没有原因或问题内容。  
- 社区反应：该问题影响客户端对表单取消原因的展示，也增加调试和用户理解成本。

### 9. idle eviction 中断 tool 时丢失失败原因  
- Issue: [#52597](https://github.com/anomalyco/opencode/issues/52597)  
- 状态：Open  
- 评论数：2  
- 重要性：run 因 60 分钟空闲回收被中断时，tool failure 只显示通用的 “Tool execution interrupted”，没有暴露 `reason: "inactivity"`。  
- 社区反应：与 #52599 一起反映出 v2 location 生命周期与错误解释能力仍需加强。

### 10. v2 `/share` 和 `/unshare` 文档存在但功能未实现  
- Issue: [#52575](https://github.com/anomalyco/opencode/issues/52575)  
- 状态：Open  
- 评论数：2  
- 重要性：用户指出 v2.0.21 中 `/share` 与 `/unshare` 仍是 hardcoded stubs，但文档、keybind schema、命令提示已暴露。  
- 社区反应：反映出文档与实现不同步，会误导用户使用尚不可用的会话分享能力。

---

## 3. 重要 PR 进展

### 1. 限制 ripgrep 并发并处理退出错误  
- PR: [#52671](https://github.com/anomalyco/opencode/pull/52671)  
- 状态：Open  
- 内容：为 ripgrep 子进程增加并发上限 `MAX_CONCURRENT_RIPGREP = 4`，防止工具调用无限 fan-out，同时在进程异常退出时正确失败。  
- 影响：有助于改善大型代码库搜索时的性能稳定性和资源占用。

### 2. 修复 resumed compaction summary 绑定错误  
- PR: [#52670](https://github.com/anomalyco/opencode/pull/52670)  
- 状态：Open  
- 内容：修复 compaction 被取消后，新 prompt 到来导致 `lastUser.id` 指向错误用户消息的问题。  
- 影响：提升会话压缩恢复逻辑的正确性，减少上下文摘要错位。

### 3. 检测并中止退化重复 reasoning stream  
- PR: [#52669](https://github.com/anomalyco/opencode/pull/52669)  
- 状态：Open  
- 内容：新增 reasoning guard，用于识别模型陷入重复推理输出的异常模式并中止。  
- 影响：可减少长时间无效推理、token 浪费和 UI 卡死风险。

### 4. 返回结构化目录可用性错误  
- PR: [#52668](https://github.com/anomalyco/opencode/pull/52668)  
- 状态：Open  
- 内容：在 project/config discovery 前验证本地目录，对目录不存在返回 404，对权限不足返回 403，并保留 macOS EPERM 信息。  
- 影响：改善 server/location 初始化错误的可诊断性。

### 5. 保留 legacy MCP config 结构  
- PR: [#52667](https://github.com/anomalyco/opencode/pull/52667)  
- 状态：Open  
- 内容：在 `mcp add` 写入配置时，保留已有 legacy flat `mcp.<name>` map，同时继续支持 v2 的 `mcp.servers`。  
- 影响：降低 MCP 配置迁移风险，避免升级破坏旧配置。

### 6. 修复外部路径探测的 FileAccess.resolve 行为  
- PR: [#52666](https://github.com/anomalyco/opencode/pull/52666)  
- 状态：Open  
- 内容：将 external-path 的 kind detection 与 resolve 逻辑通过 `Environment.files` 路由，而不是使用 process-local `FSUtil.Service`。  
- 影响：提升远程/沙箱环境中文件访问的一致性。

### 7. 支持 max reasoning effort 并识别超大 payload 错误  
- PR: [#52665](https://github.com/anomalyco/opencode/pull/52665)  
- 状态：Open  
- 内容：OpenAI reasoning effort 增加 `max` 支持，并改进 oversized payload 错误分类。  
- 影响：增强新模型 reasoning 参数兼容性，也让上下文或 payload 超限问题更容易定位。

### 8. 刷新 Provider 认证缓存  
- PR: [#52654](https://github.com/anomalyco/opencode/pull/52654)  
- 状态：Open  
- 内容：为 provider instance state 增加 `authFingerprint`，在外部认证信息变化时刷新缓存状态。  
- 影响：解决用户更新 API key 或认证信息后 provider 状态未及时更新的问题。

### 9. 恢复 v2 自定义 Provider 创建能力  
- PR: [#52653](https://github.com/anomalyco/opencode/pull/52653)  
- 状态：Closed  
- 内容：修复 v2 中自定义 provider 表单不可用的问题，改为写入 native provider config，并通过 credential store 保存 API key。  
- 影响：对使用 OpenAI-compatible、自建网关或企业模型服务的开发者非常关键。

### 10. 将 opencode-go 不可解析 400 归类为上下文溢出  
- PR: [#52651](https://github.com/anomalyco/opencode/pull/52651)  
- 状态：Open  
- 内容：处理 opencode-go upstream 返回的 opaque HTTP 400，例如仅包含 `{"model":"deepseek-v4.1-flash"}` 的情况，并归类为 context overflow。  
- 影响：改善 Go 模型错误提示，帮助用户区分模型不可用、上下文超限和一般请求失败。

---

## 4. 功能需求趋势

### 1. 订阅、额度与账户系统稳定性  
相关 Issue:  
- [#52595](https://github.com/anomalyco/opencode/issues/52595)  
- [#52596](https://github.com/anomalyco/opencode/issues/52596)  
- [#52592](https://github.com/anomalyco/opencode/issues/52592)  
- [#52623](https://github.com/anomalyco/opencode/issues/52623)  
- [#52605](https://github.com/anomalyco/opencode/issues/52605)  

今日最明显的趋势是 OpenCode Go 订阅和额度异常。用户反馈包括订阅消失、403、重复扣费、额度未重置、无法加载订阅状态等。短期内需要优先排查 billing、entitlement、usage metering 与前端展示的一致性。

### 2. MCP 连接可靠性与配置兼容  
相关 Issue / PR:  
- [#52564](https://github.com/anomalyco/opencode/issues/52564)  
- [#52563](https://github.com/anomalyco/opencode/issues/52563)  
- [#52667](https://github.com/anomalyco/opencode/pull/52667)  

社区继续关注 MCP server 在网络变化、CLI 探测、配置迁移中的可靠性。核心诉求是：断线自动重连、健康状态准确展示、v1/v2 配置平滑兼容。

### 3. v2 会话生命周期与 compaction 正确性  
相关 Issue / PR:  
- [#52638](https://github.com/anomalyco/opencode/issues/52638)  
- [#52599](https://github.com/anomalyco/opencode/issues/52599)  
- [#52597](https://github.com/anomalyco/opencode/issues/52597)  
- [#52628](https://github.com/anomalyco/opencode/issues/52628)  
- [#52670](https://github.com/anomalyco/opencode/pull/52670)  

v2 的 session、location、compaction、idle eviction 仍是高频问题源。用户需要更清晰的取消原因、更安全的压缩恢复机制，以及重启/升级时可靠终止旧 agent。

### 4. Provider 与模型兼容性  
相关 Issue / PR:  
- [#52617](https://github.com/anomalyco/opencode/issues/52617)  
- [#52616](https://github.com/anomalyco/opencode/issues/52616)  
- [#52601](https://github.com/anomalyco/opencode/issues/52601)  
- [#52654](https://github.com/anomalyco/opencode/pull/52654)  
- [#52653](https://github.com/anomalyco/opencode/pull/52653)  
- [#52651](https://github.com/anomalyco/opencode/pull/52651)  

用户对 Azure、Fledge Alpha、OpenAI-compatible gateway、自定义 provider 的兼容性有持续需求。尤其是严格网关、认证缓存、模型列表刷新和错误分类，是 Provider 层需要加强的方向。

### 5. UI/UX 与可观测性增强  
相关 Issue:  
- [#52636](https://github.com/anomalyco/opencode/issues/52636)  
- [#52645](https://github.com/anomalyco/opencode/issues/52645)  
- [#52613](https://github.com/anomalyco/opencode/issues/52613)  
- [#52619](https://github.com/anomalyco/opencode/issues/52619)  

社区希望工具调用 diff、主题 token、web 渲染行为、插件日志能力更加完善。尤其是 ACP diff 与 plugin logging，直接影响开发者调试体验。

---

## 5. 开发者关注点

1. **付费服务可信度成为首要风险**  
   Go 订阅、重复扣费、额度异常集中爆发，说明 billing 与 usage metering 的一致性需要更透明的诊断和恢复机制。

2. **长时间运行场景的稳定性仍需加强**  
   MCP 断线不重连、agent 重启后残留、idle eviction 信息不完整，都会影响 OpenCode 作为常驻开发 agent 的可靠性。

3. **v2 迁移过程中存在兼容性摩擦**  
   自定义 provider、MCP legacy config、`/share` 文档与实现不一致，显示 v2 功能面还在快速补齐中。

4. **模型与 Provider 生态正在扩大，错误分类必须更精细**  
   Azure、Cohere、Fledge、opencode-go、OpenAI-compatible 网关等场景越来越多，社区需要更准确的模型不可用、上下文溢出、认证失效、payload 过大等错误解释。

5. **开发者需要更好的可观测性与调试入口**  
   包括 tool diff、plugin 日志、structured server errors、compaction 阻塞原因等。今天多个 Issue/PR 都指向同一个方向：OpenCode 不仅要“能运行”，还要“可解释、可诊断、可恢复”。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报（2026-10-02）

## 1. 今日速览

Pi 在过去 24 小时内发布了 **v1.0.0**，核心变化是 TUI 默认进入 fullscreen 模式，并引入更精简的 coding agent 体验。  
社区反馈非常集中：一方面围绕 **fullscreen TUI 的交互、渲染和兼容性** 出现多条问题；另一方面，**AI Provider / Bedrock / OpenAI / Cloudflare Workers AI** 相关能力也在快速迭代。  
从 Issue 与 PR 看，Pi 1.0.0 进入发布后稳定期，当前重点是修复迁移回归、完善模型支持、降低资源占用与提升扩展开发体验。

---

## 2. 版本发布

### v1.0.0

链接：<https://github.com/earendil-works/pi/releases/tag/v1.0.0>

本次发布标志着 Pi 进入 1.0 阶段，主要变化包括：

- **TUI 默认 fullscreen**
  - 现在 Pi 的终端 UI 默认以全屏模式运行。
  - 如需保留终端原有 scrollback，可将 `tuiMode` 设置为 `"regular"`。
  - 相关文档：<https://github.com/earendil-works/pi/blob/v1.0.0/packages/coding-agent/docs/settings.md#terminal-and-display>

- **更精简的 coding agent**
  - Release 摘要显示本次版本包含 coding agent 精简方向的改动。
  - 从当日 Issues 来看，1.0.0 后社区主要在验证 fullscreen TUI、durable harness、扩展 API、模型适配器等关键路径的稳定性。

---

## 3. 社区热点 Issues

### 1. pi-coding-agent shrinkwrap 固定了存在漏洞的 brace-expansion 版本

链接：<https://github.com/earendil-works/pi/issues/10288>  
状态：Closed  
评论：4

该 Issue 指出 `@earendil-works/pi-coding-agent` 发布的 `npm-shrinkwrap.json` 将 `brace-expansion` 固定在受多个 GHSA 安全公告影响的版本上。  
这是过去 24 小时内评论最多的 Issue，安全供应链问题对 CLI / Agent 工具影响较大，值得关注。Issue 已关闭，说明维护者可能已处理或确认修复路径。

---

### 2. pi-durable 希望 host 能感知 harness 仅处于 sleep 状态

链接：<https://github.com/earendil-works/pi/issues/10325>  
状态：Closed  
评论：2

该 Issue 聚焦 `pi-durable` 的调度语义：当 deferred result 进入 poll 阶段后，当前实现会在进程内 `runtime.sleep(pollAt)`，导致 scheduler 可能无法准确区分“正在工作”和“只是等待”。  
这对 durable execution、外部调度器、长时间任务恢复都很重要。Issue 已关闭，说明相关设计可能已被采纳或已有替代实现。

---

### 3. v1.0.0 CodingTools 缺少 replay，导致 crash recovery 中断 read

链接：<https://github.com/earendil-works/pi/issues/10320>  
状态：Closed  
评论：2

该问题针对 `@earendil-works/pi-durable` 1.0.0：工具执行记录中 `replay` 语义与恢复阶段不一致，导致 crash recovery 时 read 操作被中断。  
这是 1.0.0 稳定性相关的关键问题，影响 durable harness 的恢复可靠性。Issue 已关闭，表明修复优先级较高。

---

### 4. fullscreen 模式下是否应重新考虑 Home / End 默认行为

链接：<https://github.com/earendil-works/pi/issues/10314>  
状态：Closed  
评论：2，👍 1

社区反馈 fullscreen TUI 中 Home / End 行为发生变化：过去用于行编辑，现在在 fullscreen 模式下用于滚动到顶部 / 底部。  
该问题虽不属于严重 bug，但反映出 1.0.0 默认 fullscreen 后，键位习惯成为用户体验迁移的重点。已有少量点赞和讨论。

---

### 5. Modal confirm 对话框会丢弃正在输入的 prompt，Enter 直接确认 Yes

链接：<https://github.com/earendil-works/pi/issues/10312>  
状态：Closed  
评论：2

该 Issue 描述在 `ctx.ui.confirm()` modal 打开时，用户在 prompt editor 输入的内容会被静默丢弃；按 Enter 也会触发默认的 “Yes” 而非提交输入。  
这属于高风险交互问题，可能导致误确认、输入丢失或不可预期操作。已关闭，说明维护者对 TUI modal 输入焦点问题响应较快。

---

### 6. 空闲 Pi session 占用约 140 MiB PSS+SwapPss，希望降低内存

链接：<https://github.com/earendil-works/pi/issues/10308>  
状态：Closed  
评论：2

用户提出 idle session 内存占用较高，并准备实现第一步优化：将 `highlight.js` grammars 从 eager load 改为 lazy load。  
这反映出社区开始关注 Pi 在长期运行、多个 session、低资源环境下的性能表现。Issue 已关闭，但该方向值得继续跟踪。

---

### 7. Anthropic SSE 解码器遇到空行会派发空 frame，导致 turn 失败

链接：<https://github.com/earendil-works/pi/issues/10303>  
状态：Closed  
评论：2

该问题指向 Anthropic Messages API 的 SSE decoder：在没有 `data:` 行时遇到空行仍触发 event dispatch，可能导致空 frame 破坏当前 turn。  
这是 provider 协议兼容性问题，影响 Anthropic 相关模型调用稳定性。Issue 已关闭，说明维护者对模型适配层 bug 处理积极。

---

### 8. codemode 第二次嵌套调用在 read 大文件时失败，hash token 泄漏进 evaluated source

链接：<https://github.com/earendil-works/pi/issues/10301>  
状态：Closed  
评论：2

该 Issue 描述 codemode 中两个嵌套 tool call，在其中一个读取大文件时出现 `SyntaxError`，原因是 read 输出中的 hash 前缀泄漏进待执行源码。  
这类问题直接影响 Pi 作为 coding agent 执行复杂脚本、组合工具调用的可靠性。Issue 已关闭，说明核心执行路径的 bug 已被快速处理。

---

### 9. quietStartup 希望支持 `"headeronly"` 选项

链接：<https://github.com/earendil-works/pi/issues/10296>  
状态：Closed  
评论：2

社区希望将 boolean `quietStartup` 改为 `"off" | "headeronly" | "all"`，从而允许隐藏资源列表但保留 logo header 和快捷键提示。  
这代表用户对启动体验的细粒度定制需求：既想减少噪音，又不希望完全失去关键提示。Issue 已关闭，可能已被接受或已有替代配置。

---

### 10. Kitty image encoder 对非 PNG 图片错误声明格式，导致终端静默丢弃

链接：<https://github.com/earendil-works/pi/issues/10292>  
状态：Closed  
评论：2

该问题指出 `encodeKitty()` 硬编码 Kitty graphics format `f=100`，即 PNG；当实际输入是 JPEG / WebP / GIF / BMP 时，终端会将其视作错误 PNG 并静默丢弃。  
随着 fullscreen TUI 与内联图片能力增强，终端图像协议兼容性变得更关键。Issue 已关闭，说明图像渲染路径正在快速修复。

---

## 4. 重要 PR 进展

> 过去 24 小时内共有 8 个 PR 更新，以下全部列出。

### 1. 修复 Bedrock 上 OpenAI 模型长上下文价格档位

链接：<https://github.com/earendil-works/pi/pull/10329>  
状态：Open

PR 为 Bedrock 中的 OpenAI GPT 模型补充 `cost.tiers`。此前超过 272k input tokens 的请求仍按短上下文价格估算，导致成本统计偏低。  
该修复对长上下文场景很重要，尤其是使用 Bedrock 代理 OpenAI 模型的大型代码库分析任务。

---

### 2. Bedrock 支持丢弃不匹配的 thinking block，避免 replay 后 400

链接：<https://github.com/earendil-works/pi/pull/10328>  
状态：Open  
关联 Issue：<https://github.com/earendil-works/pi/issues/10324>

PR 为 Bedrock adaptive thinking 请求增加 `block_binding: { prefix_mismatch_behavior: "drop_block" }`，并启用 `thinking-binding-controls-2026-08-01` beta。  
当 system prompt 或工具列表变化后，旧的 signed thinking block 不再导致 400，而是被安全丢弃。这提升了 Bedrock 上对话恢复和配置变更后的稳定性。

---

### 3. 添加 Cloudflare Clef classifiers 到 Workers AI

链接：<https://github.com/earendil-works/pi/pull/10322>  
状态：Closed

该 PR 将 Cloudflare 的 Clef 决策模型加入 Workers AI classifier catalog：

- `@cf/cloudflare/clef`
- `@cf/cloudflare/clef-flash`

这增强了 Pi 对 Cloudflare Workers AI 分类模型的支持，适用于安全分类、决策模型、轻量策略判断等场景。

---

### 4. 添加 Cloudflare Clef classifiers 到 Workers AI，另一实现版本

链接：<https://github.com/earendil-works/pi/pull/10316>  
状态：Closed

该 PR 与 #10322 目标相同，也是在 Workers AI catalog 中增加 Clef / Clef Flash。  
两个相近 PR 的出现说明社区对 Cloudflare Workers AI 生态支持有明确需求，尤其是可作为 classifier 的低成本模型。

---

### 5. coding-agent：为 Radius 登录增加动画和介绍

链接：<https://github.com/earendil-works/pi/pull/10295>  
状态：Closed

该 PR 改进 `/login` 菜单中的 “Sign in with Radius” 展示体验，包括焦点状态下的多色动画，以及 Radius 介绍内容。  
这属于产品体验优化，表明 Pi 正在加强登录、账户体系和新用户引导。

---

### 6. coding-agent：系统主题中保持 pastel palette 的柔和效果

链接：<https://github.com/earendil-works/pi/pull/10293>  
状态：Closed  
关联 Issue：<https://github.com/earendil-works/pi/issues/10255>

该 PR 修复系统主题中 pastel 调色板过度偏离的问题。  
实现上保留 bell-curve falloff，并限制 OKLCH chroma，使颜色保持柔和，同时不改变亮度和色相，因此不会破坏对比度。  
这是 TUI 视觉一致性和可读性方面的改进。

---

### 7. coding-agent：修复 read offset / limit 为字符串时行号显示错误

链接：<https://github.com/earendil-works/pi/pull/10290>  
状态：Closed  
关联 Issue：<https://github.com/earendil-works/pi/issues/9887>

部分模型会将 `read` 工具的 `offset` 和 `limit` 参数以字符串形式传入，导致行范围计算时发生字符串拼接。  
该 PR 对字符串类型进行 coercion，避免出现错误的行号显示。  
这类兼容性修复对多模型生态很重要，因为不同模型的 tool call 参数类型稳定性并不一致。

---

### 8. AI：使用 OpenRouter 返回的实际总成本

链接：<https://github.com/earendil-works/pi/pull/10286>  
状态：Open

OpenRouter 会返回每次请求的实际计费金额，而 Pi 当前的 catalog 估算可能因 OpenRouter 路由到不同 provider 而产生偏差。  
该 PR 改为使用 OpenRouter reported total cost，有助于提升成本统计准确性，尤其适用于多 provider 动态路由场景。

---

## 5. 功能需求趋势

### 1. Fullscreen TUI 成为 1.0 后最集中的反馈区域

相关 Issues：

- Home / End 默认行为讨论：<https://github.com/earendil-works/pi/issues/10314>
- Modal confirm 丢输入：<https://github.com/earendil-works/pi/issues/10312>
- inline image 滚动后塌缩：<https://github.com/earendil-works/pi/issues/10319>
- 失焦时隐藏光标：<https://github.com/earendil-works/pi/issues/10323>
- 终端 resize 后 ENOTTY 退出：<https://github.com/earendil-works/pi/issues/10313>

趋势判断：  
v1.0.0 默认 fullscreen 后，终端 UI 从“增强模式”变成“默认入口”，因此键位、焦点、图像、resize、滚动行为都成为高优先级稳定性问题。

---

### 2. 多模型与 Provider 适配持续扩展

相关 Issues / PR：

- Bedrock thinking block replay 400：<https://github.com/earendil-works/pi/issues/10324>
- Bedrock thinking block 修复 PR：<https://github.com/earendil-works/pi/pull/10328>
- Bedrock OpenAI 长上下文计费：<https://github.com/earendil-works/pi/pull/10329>
- OpenAI Responses WebSocket with API keys：<https://github.com/earendil-works/pi/issues/10311>
- OpenRouter 实际成本统计：<https://github.com/earendil-works/pi/pull/10286>
- Cloudflare Clef classifiers：<https://github.com/earendil-works/pi/pull/10322>

趋势判断：  
Pi 的 provider 层正在向更复杂的企业使用场景扩展，包括 Bedrock、OpenRouter、Cloudflare Workers AI、OpenAI Responses WebSocket 等。

---

### 3. Durable execution 与 crash recovery 可靠性被持续验证

相关 Issues：

- pi-durable sleep 状态外部可感知：<https://github.com/earendil-works/pi/issues/10325>
- CodingTools replay 缺失导致 recovery 中断：<https://github.com/earendil-works/pi/issues/10320>

趋势判断：  
社区不仅在使用 Pi 做交互式 coding，也在探索长期运行、可恢复、可调度的 agent 工作流。durable harness 的状态语义、replay 策略和恢复逻辑会继续成为重点。

---

### 4. 扩展系统与 API 可观测性需求上升

相关 Issues：

- prompt hook after native virtual model resolution：<https://github.com/earendil-works/pi/issues/10318>
- queue_update 事件，让 injected input 被 discard 可观测：<https://github.com/earendil-works/pi/issues/10317>
- ChatGPT OAuth ID token 未持久化，扩展无法访问账户身份：<https://github.com/earendil-works/pi/issues/10300>
- 恢复 extensions.md 文档信息：<https://github.com/earendil-works/pi/issues/10297>

趋势判断：  
开发者正在基于 Pi 构建更复杂的扩展，需要更明确的生命周期 hook、事件回执、身份信息访问和完整文档。

---

### 5. 性能与资源占用开始受到关注

相关 Issues：

- idle session 内存占用约 140 MiB：<https://github.com/earendil-works/pi/issues/10308>
- compaction summary 文件列表重复且无界：<https://github.com/earendil-works/pi/issues/10306>
- max_tokens 在 system prompt / tool set 变化后估算错误：<https://github.com/earendil-works/pi/issues/10307>

趋势判断：  
Pi 使用场景正在从短会话扩展到长会话、大项目和持续运行，内存、上下文估算、summary 压缩质量都会直接影响可用性和成本。

---

## 6. 开发者关注点

### 1. 1.0.0 升级后的兼容性与回归

多个 Issue 直接指向 v1.0.0：

- durable replay 行为变化：<https://github.com/earendil-works/pi/issues/10320>
- `pi-agent-core` 不再导出 `./node`，影响 pi-subagents：<https://github.com/earendil-works/pi/issues/10315>
- fullscreen TUI 默认行为变化：<https://github.com/earendil-works/pi/issues/10314>

开发者主要担心升级后已有扩展、subagent、工具调用链路出现不兼容。

---

### 2. TUI 默认 fullscreen 后，交互细节必须更稳定

开发者反馈集中在：

- 键盘行为是否符合直觉
- modal 是否会吞输入
- 图片滚动渲染是否稳定
- tmux / 多 pane 环境下焦点是否清晰
- resize 是否会导致退出

这些都是 terminal-first AI coding tool 的关键体验指标。

---

### 3. Provider 行为差异导致成本、上下文与 replay 问题

Bedrock、OpenRouter、Anthropic、OpenAI Responses 等 provider 的协议差异持续暴露问题：

- SSE frame 解析边界
- signed thinking block 与 prompt/tool binding
- 长上下文价格档位
- OpenRouter 实际计费与 Pi 估算不一致
- WebSocket transport 与 API key 支持

开发者希望 Pi 不只是“能调用模型”，还要在成本、恢复、上下文变化和协议细节上足够可靠。

---

### 4. 扩展开发者需要更完整的生命周期和事件机制

当前痛点包括：

- 注入消息后缺少 receipt / queue update
- native virtual model resolution 后缺少 prompt hook
- OAuth identity 不易被扩展访问
- 扩展文档信息缺失

这说明 Pi 的扩展生态正在进入更高阶阶段，开发者需要可观测、可组合、可调试的 API。

---

### 5. 长会话与大项目使用下，资源管理成为核心诉求

开发者开始关注：

- idle 内存占用
- compaction summary 膨胀
- 文件列表重复
- token 预算估算错误
- 大文件 read 与 codemode 嵌套调用稳定性

这些问题会影响 Pi 在真实工程仓库中的长期生产力表现。

---

## 总结

2026-10-02 的 Pi 社区动态可以概括为：**v1.0.0 发布后进入快速稳定期**。  
最活跃的反馈集中在 fullscreen TUI、durable recovery、provider 适配、扩展 API 和资源管理。  
从 PR 进展看，维护者与社区正在快速补齐 Bedrock / OpenRouter / Cloudflare Workers AI 等模型生态能力，同时修复 1.0.0 带来的交互和兼容性问题。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-10-02）

## 1. 今日速览

过去 24 小时，Qwen Code 社区的焦点高度集中在 **Managed Agent / Hosted Session / Runtime Broker** 相关能力上，尤其是会话接管、权限审批、Broker 安全、租约一致性与性能放大问题。与此同时，Web Shell、Memory、LSP、CI 稳定性和 Windows Vim 模式等开发体验问题也持续被修复和跟进。

今日新增 nightly 版本 `v0.24.7-nightly.20261001.a7deb01bcb`，主要包含 Code Mode 文案与 lazy tool discovery 的对齐，以及权限审批相关修复。

---

## 2. 版本发布

### v0.24.7-nightly.20261001.a7deb01bcb

链接：<https://github.com/QwenLM/qwen-code/releases/tag/v0.24.7-nightly.20261001.a7deb01bcb>

本次 nightly 版本包含以下关键变更：

- `fix(core)`：对齐 Code Mode 文案与 lazy tool discovery 行为  
  相关 PR：<https://github.com/QwenLM/qwen-code/pull/12990>
- `fix(permissions)`：修复权限审批逻辑中对已批准状态的处理问题

整体来看，该版本属于偏稳定性与体验一致性的 nightly 更新，为后续 Managed Agent 和权限流相关改动打基础。

---

## 3. 社区热点 Issues

### 1. Runtime Broker 跨进程 admit/release 竞态与单 token 安全问题

Issue：<https://github.com/QwenLM/qwen-code/issues/13183>

- 优先级：P1
- 类型：Bug / Security / SDK
- 评论数：3

该 Issue 指出 `runtime-broker` 存在跨进程 admit/release 竞态、共享单线程续租机制以及单 token HTTP 安全模型问题。由于 Runtime Broker 是 Managed Agent 底层运行时的关键组件，这类一致性与安全问题会直接影响多进程、多租户场景下的可靠性。

社区反应虽然评论数不高，但优先级为 P1，说明维护者已将其视为核心阻塞问题。

---

### 2. Shell 权限分析器仍存在 phantom-cwd 入口

Issue：<https://github.com/QwenLM/qwen-code/issues/13139>

- 优先级：P1
- 类型：Bug / Security / Shell
- 评论数：3

该问题涉及 shell permission analyzer 对特殊 quoting / escaping 场景下 `cd` 目标的错误推断，可能产生虚假的 cwd 状态。此前相关问题已有修复，但仍有残留入口。

这是典型的安全边界问题，尤其影响命令执行权限判断。P1 优先级表明社区对 Shell 权限模型的准确性仍高度敏感。

---

### 3. Managed Agent 重试循环无终态，可能导致投影永久卡死

Issue：<https://github.com/QwenLM/qwen-code/issues/13182>

- 优先级：P2
- 类型：Bug / Core / SDK / Daemon
- 评论数：4

该 Issue 指出 Managed Agent 栈中的异步 retry loop 缺乏明确终态，某些投影逻辑可能永久 wedged。涉及 Java Broker 与消息投影路径。

该问题重要在于它影响长期运行服务的自愈能力。如果失败状态无法收敛，Managed Agent 在生产环境中可能出现难以恢复的“半死”状态。

---

### 4. Managed Agent Broker 认证与 writer 凭证设计

Issue：<https://github.com/QwenLM/qwen-code/issues/13180>

- 优先级：P2
- 类型：Feature Request / Security / Credential Security
- 评论数：4

该需求要求为 Managed Agent Runtime Broker 增加认证与凭证层，避免继续依赖客户端传入的信任信息。核心方向包括：

- 租户 / actor 身份来自认证主体
- writer 凭证由 Broker 颁发
- 加强多租户隔离与授权边界

这是 Managed Agent 走向生产级部署的关键能力之一，社区讨论活跃度较高。

---

### 5. Agent Host 越界 workspace 调用应先触发 confinement guard

Issue：<https://github.com/QwenLM/qwen-code/issues/13157>

- 优先级：P2
- 状态：Blocked
- 类型：Bug / Core / Session Management / Sandbox
- 评论数：5

当前 Agent Host 中，超出 workspace 的工具调用会先进入普通权限流，导致在无交互客户端的 PLAN-mode 下被自动拒绝，并结束整个 Host run。Issue 建议先执行 confinement guard，避免无效权限提示直接终止运行。

该问题对无头运行、远程 agent-host 和自动化执行场景影响较大，评论数在今日 Issues 中较高。

---

### 6. Hosted approval Action 应展示待执行工具输入

Issue：<https://github.com/QwenLM/qwen-code/issues/13160>

- 优先级：P2
- 类型：Feature Request / Web Shell / Multi-agent
- 评论数：4

该需求建议在 Hosted permission Action 中携带待审批工具调用的输入预览，使审批者能够看到具体将执行什么。

这是人机协作审批链路中的关键可用性与安全需求。对于远程 Hosted Session、多用户审批和 Web Shell 场景而言，仅显示“是否允许”而不展示输入会降低可信度。

---

### 7. Managed Agent Session Store 与 Panel Projection 存在无界增长

Issue：<https://github.com/QwenLM/qwen-code/issues/13184>

- 优先级：P2
- 类型：Bug / Performance / Memory Usage / Web Shell
- 评论数：3

该 Issue 指出 Managed Agent 持久层和 UI projection 层默认会随时间无界增长，包括 session events、UI panel projection 等。

对于 daemon / web-shell 长时间运行场景，这会导致内存、存储和查询性能劣化。该问题反映社区开始关注 Managed Agent 的生产可运维性。

---

### 8. Managed Agent 数据库热路径存在放大问题

Issue：<https://github.com/QwenLM/qwen-code/issues/13181>

- 优先级：P2
- 类型：Bug / Performance / SDK
- 评论数：3

该问题指出 Managed Agent Runtime Broker 的多个热路径会显著放大数据库工作量，包括：

- snapshot rewrite
- SSE
- list 查询
- publication 路径

部分操作还会在持有行锁时执行高成本工作。该问题对高并发 session 场景的吞吐与延迟影响明显。

---

### 9. MEMORY.md 索引截断导致链接目标损坏

Issue：<https://github.com/QwenLM/qwen-code/issues/13145>

- 优先级：P2
- 类型：Bug / Memory
- 评论数：4

Memory index builder 当前会按整行 150 字符截断，可能截断 Markdown 链接中的 path，导致 `MEMORY.md` 索引链接不可用并留下悬挂省略号。

这是 Memory 功能可用性问题，影响长期知识管理体验。相关修复 PR 已经出现，说明维护者响应较快。

---

### 10. Vim-mode Windows 剪贴板粘贴失效

Issue：<https://github.com/QwenLM/qwen-code/issues/13197>

- 类型：Bug / CLI / Windows / Vim Mode
- 评论数：1

该 Issue 反馈 Windows 下 Vim mode 的剪贴板读取存在静默失败、CRLF 污染和 linewise 检测错误问题。涉及 `packages/cli/src/ui/hooks/vim.ts` 中 win32 分支。

虽然评论数暂时较少，但这是典型的跨平台开发者体验问题，对 Windows 用户影响直接。

---

## 4. 重要 PR 进展

### 1. 修复 Hosted Hook Runtime 错误释放问题

PR：<https://github.com/QwenLM/qwen-code/pull/13195>

该 PR 修复 Hosted Hook session 在清理 earlier owners 时误释放不应释放的 Runtime owner 的问题。新的逻辑仅释放 Hosted Harness 可能创建的 Runtime owners，并跳过 `hook_operation` 等生命周期 Hook 自身创建的 activation。

对应 Issue：<https://github.com/QwenLM/qwen-code/issues/13193>

---

### 2. 支持归档和删除已关闭的 workspace sessions

PR：<https://github.com/QwenLM/qwen-code/pull/13194>

该 PR 实现 Workspace-bound Hosted Sessions 的 archive / unarchive / delete 能力，覆盖 public 和 WebShell lifecycle routes。

主要能力：

- 已 CLOSED 的 Session 可归档
- ARCHIVED Session 可恢复为 CLOSED
- CLOSED 或 ARCHIVED Session 可删除
- 保留 permanent close fence

对应 Issue：<https://github.com/QwenLM/qwen-code/issues/13164>

---

### 3. 修复 Managed writer 与 publication epoch deadline

PR：<https://github.com/QwenLM/qwen-code/pull/13192>

该 PR 修复 JDBC、JVM 和数据库时区不一致时，Managed writer lease 与 tool publication grant 返回错误 Unix epoch deadline 的问题。

这是 Broker 租约与权限有效期语义的正确性修复，对跨时区部署和生产环境尤其重要。

---

### 4. 修复 Hosted Turn takeover 的关键问题

PR：<https://github.com/QwenLM/qwen-code/pull/13188>

该 PR 关闭 #13083 post-merge review 中的三个 Critical findings，涉及 Hosted Turn takeover / G1 failover。

特点：

- 每个 Critical finding 都有单元测试覆盖
- 调整现有测试以增强证明力
- 聚焦 takeover 过程中的关键正确性问题

相关 Issue：<https://github.com/QwenLM/qwen-code/issues/13187>

---

### 5. 强化 Managed Agent commit retry、worker containment 与 panel polling

PR：<https://github.com/QwenLM/qwen-code/pull/13179>

该 PR 包含三项 Hosted Managed session path 的稳健性修复：

- worker 拒绝解析后越出 workspace 的相对路径
- 强化 commit retry 行为
- 改善 panel polling 相关逻辑

对应安全与稳定性方向，尤其与 workspace confinement 相关。

---

### 6. Hosted Harness 进入 G3：支持新 generation 接管

PR：<https://github.com/QwenLM/qwen-code/pull/13174>

该 PR 实现 G3 proposal 的前两步，使 Hosted Session 不再固定绑定首次服务它的 Hosted Harness process generation。Harness 重启后，Java control plane 可以采用下一代 generation，而不是让 bound session 全部失败。

这是 Hosted Session 高可用与重启恢复能力的重要进展。

---

### 7. Passive takeover 时采用 Runtime Session

PR：<https://github.com/QwenLM/qwen-code/pull/13173>

该 PR 修复 Hosted Turn takeover 的 cancellation 路径：在 passive takeover load 后，先 acquire Runtime Session，再读取或释放它。

这可以解决 owner 变化后 cancellation takeover 无法完成的问题。

对应 Issue：<https://github.com/QwenLM/qwen-code/issues/13171>

---

### 8. 稳定 Hosted Browser Smoke Gates

PR：<https://github.com/QwenLM/qwen-code/pull/13172>

该 PR 改善 CI 稳定性：

- Hosted Chromium/WebKit 依赖安装限制为 30 分钟
- WebShell job 设置 60 分钟预算
- APT HTTP/HTTPS 增加连接超时与重试
- 保留 transcript、browser smoke gates 和 artifact upload

这是典型的 CI flake 修复，有助于减少非代码问题导致的失败。

---

### 9. Hosted turns 支持 Workspace 项目上下文

PR：<https://github.com/QwenLM/qwen-code/pull/13168>

该 PR 让 Hosted model turns 能够读取 Workspace 的项目说明，例如：

- `QWEN.md`
- `AGENTS.md`

当前 Hosted turn 使用 `safeMode: true`，会跳过 context-file discovery，因此无法获得项目上下文。该 PR 修复这一体验缺口，对 Hosted Agent 的代码理解质量有直接帮助。

---

### 10. Managed Session 工具运行于 Runtime worker

PR：<https://github.com/QwenLM/qwen-code/pull/13167>

该 PR 实现 ordinary-host Managed engine 设计中的 M5a，即 Runtime-backed tools 的第一阶段。

新增能力包括：

- Managed session 支持 Read
- Write
- Edit
- foreground Shell
- 工具调用在 Runtime worker 中执行
- 调用前进行准备与权限检查

这是 Managed Agent 从架构设计走向可执行工具能力的重要阶段性进展。

---

## 5. 功能需求趋势

### 1. Managed Agent 生产化能力成为主线

今日大部分高优先级 Issue 和 PR 都围绕 Managed Agent 展开，包括：

- Runtime Broker 正确性
- Hosted Session takeover
- Runtime worker 执行
- Broker 认证
- writer credentials
- session archive / delete
- generation adoption
- retry terminal states

趋势表明社区正在从“功能可用”转向“长期运行、可恢复、可审计、可授权”。

---

### 2. 权限审批与安全边界持续加强

多个议题集中在权限流与安全边界：

- Shell permission analyzer
- workspace confinement
- Hosted approval 输入预览
- credential security
- WebShell workspace trust
- 单 token HTTP 安全模型

这说明 Qwen Code 的 agentic 工具执行能力越强，社区越关注“模型能做什么、谁批准、边界在哪里”。

---

### 3. Web Shell 正在走向更完整的协作入口

Web Shell 相关需求包括：

- Hosted approval Action 展示工具输入
- workspace trust 无重启授权
- offline retry 保留 authentication fragment
- approval card 权限态修复
- Session Overview / Split View 快捷键
- Memory panel 换行符保持

Web Shell 不再只是展示层，而是正在成为远程会话管理、审批和多 agent 协作的重要入口。

---

### 4. Memory 功能进入可用性打磨阶段

Memory 相关 Issue 和 PR 集中在：

- MEMORY.md 索引链接可解析性
- index budget 去重
- 截断策略避免切断链接或行
- extraction cooldown
- recall selector experiments
- Web Shell Memory panel CRLF 保持

说明 Memory 能力已经进入较细粒度的体验与稳定性优化阶段。

---

### 5. 性能与资源有界性问题开始显性化

性能类问题包括：

- Managed session store 无界增长
- panel projection 无界增长
- Runtime Broker 数据库放大
- SSE / list / snapshot rewrite 热路径
- hook session owner release 低效或误释放

这说明随着 Managed Agent 架构逐渐完整，社区开始关注高并发、长时间运行和资源上限。

---

## 6. 开发者关注点

### 1. 会话接管与失败恢复仍是最大痛点

Hosted Turn takeover、generation adoption、passive takeover、cancellation takeover 等问题频繁出现，说明当前多进程 / 多 generation / owner 变更场景仍复杂且容易出错。开发者最关心的是 session 在 Harness 重启、owner 变化或 Broker 替换后能否继续正确运行。

---

### 2. 权限流需要更透明、更可解释

多个反馈都指向审批体验：

- 审批前看不到工具输入
- 无交互 Host 中权限 prompt 可能错误终止运行
- WebShell 中无权限用户仍可点击 approval action
- shell cwd 推断错误会影响权限判断

开发者希望权限系统不仅安全，还要能解释“为什么允许 / 拒绝”。

---

### 3. Broker 与 Runtime 的安全模型需要升级

当前社区明显关注：

- actor identity 不能来自客户端自报
- writer credentials 应由 Broker 管理
- 单 token HTTP 模型不足
- 多租户隔离需要更强认证边界

这表明 Qwen Code 的 Managed Agent 正在面向更真实的服务化部署场景。

---

### 4. 长时间运行后的资源控制是高频担忧

无界 session event、panel projection、数据库热路径放大、retry loop 无终态等问题都属于长期运行风险。开发者希望系统具备：

- 有界存储
- 可终止 retry
- 可回收 projection
- 可观测失败状态
- 低放大的数据库访问模式

---

### 5. 跨平台与本地开发体验仍需持续修复

Windows Vim-mode 剪贴板、Web Shell offline retry、快捷键、Memory CRLF 等问题说明，本地 CLI 与 Web Shell 的细节体验仍是开发者反馈重点。

尤其是 Windows 和 Web Shell 场景，用户对“看似小问题”的容忍度较低，因为它们直接影响日常使用流畅度。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报  
日期：2026-10-02  
数据源：github.com/Hmbown/DeepSeek-TUI（本日条目链接指向 Hmbown/Codewhale）

## 1. 今日速览

过去 24 小时内没有新版本发布，社区主要活动集中在 `v0.10.1` 集成修复、依赖升级以及 UI/组件展示完善上。  
核心进展是 `v0.10.1 integration, part 2` 继续推进，重点修复任务 worker 轮询与 task-store 锁相关问题；同时，文档与组件图库方向出现新的 follow-up，说明项目正在强化 TUI 组件体系的可视化与可维护性。

---

## 2. 社区热点 Issues

> 过去 24 小时内仅有 1 个 Issue 更新，因此本节按实际数据列出，不额外虚构 10 条。

### #6814 [documentation] Complete codewhale-ratatui component catalogue and rendered README gallery  
链接：https://github.com/Hmbown/Codewhale/issues/6814  
状态：OPEN  
作者：Hmbown  
评论数：0  
👍：0  

**重要性：**  
该 Issue 聚焦 `codewhale-ratatui` 组件目录与 README 渲染图库的补全，属于文档、组件可视化和设计系统建设方向。摘要中提到 founder 要求不同颜色、渐变、完整艺术指导和全组件覆盖，说明这不仅是普通文档补全，而是面向 TUI 组件体系的一次视觉与结构整理。

**当前计划：**  
- 增加可选 atmosphere/color 模块  
- 补充 gallery 与 focused tests  
- 建立统一的 live / rendered 组件展示  
- 覆盖完整 ratatui 组件目录  

**社区反应：**  
暂无评论和点赞，说明该议题目前仍处于维护者主导阶段。但从任务描述看，它可能影响后续组件贡献、主题定制、文档可读性和示例复用。

---

## 3. 重要 PR 进展

> 过去 24 小时内共有 7 个 PR 更新，以下按实际数据全部列出。

### #6815 v0.10.1 integration, part 2: remaining fixes on wave/0.10.1-next  
链接：https://github.com/Hmbown/Codewhale/pull/6815  
状态：OPEN  
作者：Hmbown  

**内容概述：**  
这是 `v0.10.1` 集成工作的第二部分，承接 #6782 合入 `main` 后的后续修复。当前 PR 在 `wave/0.10.1-next` 分支上继续分批提交，并承载相关 hosted CI。

**关键变化：**  
- idle task workers 不再每 200ms 轮询磁盘  
- task-store lock 增加 holder 命名能力  
- 针对 #6728、#6573 相关问题继续修复  

**为什么重要：**  
该 PR 直接关系到下一个补丁版本的稳定性和性能表现，尤其是降低无效磁盘轮询，对桌面/TUI 场景下的资源占用有实际意义。

---

### #6813 build(deps): bump nixpkgs from `6774f7b` to `7a0f122`  
链接：https://github.com/Hmbown/Codewhale/pull/6813  
状态：OPEN  
作者：dependabot[bot]  
标签：dependencies, nix, bot-authored  

**内容概述：**  
更新 `nixpkgs` 依赖，从 `6774f7b` 升级至 `7a0f122`。

**为什么重要：**  
Nix 生态依赖更新通常影响开发环境、CI 构建和可复现构建结果。该类 PR 虽然不是功能变更，但对项目构建稳定性和安全性有基础作用。

---

### #6812 build(deps): bump fenix from `48b35ac` to `e659899`  
链接：https://github.com/Hmbown/Codewhale/pull/6812  
状态：OPEN  
作者：dependabot[bot]  
标签：dependencies, nix, bot-authored  

**内容概述：**  
更新 `fenix` 依赖，从 `48b35ac` 升级到 `e659899`。摘要中提到上游变更包括移除 `x86_64-darwin` from systems。

**为什么重要：**  
`fenix` 与 Rust toolchain 管理相关，可能影响 Rust 构建矩阵、开发环境初始化和 CI 平台覆盖。需要特别关注 macOS x86_64 Darwin 支持是否受影响。

---

### #6811 build(deps): bump react and @types/react in /web  
链接：https://github.com/Hmbown/Codewhale/pull/6811  
状态：OPEN  
作者：dependabot[bot]  
标签：dependencies, javascript, bot-authored  

**内容概述：**  
升级 `/web` 目录下的 React 相关依赖：  
- `react`：19.2.8 → 19.3.0  
- `@types/react`：同步升级  

**为什么重要：**  
React 与类型定义需要同步更新，有助于避免类型不兼容。若项目包含 Web 控制台、文档站或辅助 UI，该 PR 会影响前端构建和运行时兼容性。

---

### #6810 build(deps-dev): bump @types/node from 26.6.1 to 26.6.3 in /web  
链接：https://github.com/Hmbown/Codewhale/pull/6810  
状态：OPEN  
作者：dependabot[bot]  
标签：dependencies, javascript, bot-authored  

**内容概述：**  
升级 `/web` 中的 `@types/node`：  
- 26.6.1 → 26.6.3  

**为什么重要：**  
属于开发时类型依赖更新，主要影响 TypeScript 编译、IDE 类型提示和 Node API 类型校验。风险相对较低，但仍需通过前端类型检查确认兼容性。

---

### #6809 build(deps-dev): bump gt from 2.17.2 to 2.22.4 in /web  
链接：https://github.com/Hmbown/Codewhale/pull/6809  
状态：OPEN  
作者：dependabot[bot]  
标签：dependencies, javascript, bot-authored  

**内容概述：**  
升级 `/web` 中的 `gt`：  
- 2.17.2 → 2.22.4  

**为什么重要：**  
`gt` 与翻译/国际化能力相关。版本跨度较大，可能带来 patch-level 修复和行为变化，需要关注文案生成、i18n 流程或构建产物是否受影响。

---

### #6807 feat(pet): draw the Watch whale with the desktop's whale v2 contour  
链接：https://github.com/Hmbown/Codewhale/pull/6807  
状态：OPEN  
作者：Hmbown  

**内容概述：**  
该 PR 调整 Watch whale 的绘制方式，使其使用桌面端 whale v2 轮廓。摘要中说明这是 owner 直接请求的 parity change，没有关联 tracking issue。

**为什么重要：**  
这是一次视觉一致性改进，目标是在 Watch 与 Desktop 之间统一 whale 形象轮廓。虽然不属于核心功能，但对产品识别、跨端体验一致性和 UI 品质有积极影响。

---

## 4. 功能需求趋势

基于过去 24 小时内的 Issue 与 PR，当前社区关注点主要集中在以下方向：

### 1. TUI 组件体系与视觉规范化  
相关链接：  
- https://github.com/Hmbown/Codewhale/issues/6814  

`codewhale-ratatui` 组件目录、README gallery、颜色/渐变模块和完整艺术指导成为重点。这表明项目正在从“功能可用”向“组件可复用、视觉可维护、文档可展示”演进。

### 2. v0.10.1 稳定性与性能修复  
相关链接：  
- https://github.com/Hmbown/Codewhale/pull/6815  

`v0.10.1` 集成继续推进，尤其关注 idle task worker 的磁盘轮询问题。这反映出开发者正在优化后台任务执行效率，降低不必要的资源消耗。

### 3. 构建环境与依赖可维护性  
相关链接：  
- https://github.com/Hmbown/Codewhale/pull/6813  
- https://github.com/Hmbown/Codewhale/pull/6812  
- https://github.com/Hmbown/Codewhale/pull/6811  
- https://github.com/Hmbown/Codewhale/pull/6810  
- https://github.com/Hmbown/Codewhale/pull/6809  

Dependabot 批量更新 Nix、Rust toolchain 相关依赖和 Web 前端依赖，说明项目对构建链路、前端依赖和类型系统保持持续维护。

### 4. 跨端视觉一致性  
相关链接：  
- https://github.com/Hmbown/Codewhale/pull/6807  

Watch whale 与 Desktop whale v2 contour 对齐，说明项目在关注不同端之间的品牌形象和 UI 细节一致性。

---

## 5. 开发者关注点

### 构建与工具链兼容性  
Nixpkgs、fenix、React、Node types 等依赖同时更新，开发者需要重点关注 CI 是否稳定、不同平台构建是否一致，尤其是 `fenix` 上游移除 `x86_64-darwin` 的影响。

### 后台任务性能  
`idle task workers` 取消每 200ms 磁盘轮询，说明此前可能存在资源占用或 I/O 频率过高的问题。对于长期运行的 TUI/桌面工具，这类优化会直接改善用户体验。

### 文档与组件可发现性  
#6814 反映出组件文档、README gallery 和渲染示例仍需完善。对外部贡献者而言，完整组件目录和可视化示例可以降低上手成本，也有利于统一 UI 风格。

### UI 品质与品牌一致性  
#6807 显示维护者正在处理更细粒度的视觉一致性问题。虽然这类改动不一定影响核心逻辑，但对成熟工具的产品感和用户认知非常重要。

---

## 总结

今日 DeepSeek TUI 社区没有新版本发布，但 `v0.10.1` 后续集成、性能修复、依赖升级和 UI 文档体系建设均在推进。整体看，项目当前重点从单点功能开发转向稳定性、构建可靠性、组件体系化和跨端视觉一致性。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*