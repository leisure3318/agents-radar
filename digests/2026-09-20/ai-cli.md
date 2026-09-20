# AI CLI 工具社区动态日报 2026-09-20

> 生成时间: 2026-09-20 03:56 UTC | 覆盖工具: 9 个

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
**日期：2026-09-20**

## 1. 生态全景

当前 AI CLI 工具生态正从“模型接入与基础对话能力”快速进入 **工程化 Agent 平台** 阶段，核心竞争点转向权限安全、长会话管理、工具调用可靠性、沙箱隔离和多端协同。  
Claude Code、Qwen Code、OpenCode、Pi 等工具的反馈集中在 **权限边界、compaction、session restore、Agent 生命周期**，说明 AI CLI 已经开始承载真实项目中的长周期开发任务。  
OpenAI Codex、Copilot CLI、Gemini CLI 则更突出 **模型路由、多模型兼容、TUI/Transcript、Windows/终端兼容性** 等问题。  
整体来看，社区需求正在从“让 AI 能写代码”升级为“让 AI 可控、可审计、可恢复、可集成地参与软件工程流程”。

---

## 2. 各工具活跃度对比

> 注：下表中的 Issue / PR 数以用户提供摘要中“过去 24 小时可确认的更新数量或重点条目”为准；部分仓库摘要未给出完整总数，因此使用“≥”表示至少数量。

| 工具 | 今日 Issues 活跃度 | 今日 PR 活跃度 | Release 情况 | 今日活跃特征 |
|---|---:|---:|---|---|
| **Claude Code** | ≥10 个重点 Issue | 2 个 PR | 无新 Release | 权限、安全、Remote Control、Agent 调度、Desktop/VS Code 体验活跃 |
| **OpenAI Codex** | ≥10 个重点 Issue | ≥10 个 PR | 3 个 Alpha：`rust-v0.156.0-alpha.7~9` | Rust CLI/TUI 高频迭代，Windows Desktop 与额度问题突出 |
| **Gemini CLI** | ≥10 个 Issue | 4 个 PR | 1 个 nightly：`v0.62.0-nightly.20260920...` | 会话恢复、模型 pin、Telemetry、后台任务稳定性 |
| **GitHub Copilot CLI** | 7 个 Issue | 0 个 PR | 无新 Release | MCP、Ghostty 终端兼容、多模型工具格式、sandbox IDE 集成 |
| **Kimi Code CLI** | 0 | 0 | 无 | 过去 24 小时无活动 |
| **OpenCode** | ≥10 个重点 Issue | ≥10 个 PR | 无明确新 Release | Go 订阅/Free Tier、V2 迁移、长会话性能、Windows/VS Code 兼容 |
| **Pi** | 16 个 Issue | 4 个 PR | 1 个 Release：`v0.86.0` | Prompt cache warming 发布后，compaction/cancellation/tool timeout 快速修复 |
| **Qwen Code** | ≥10 个重点 Issue | ≥10 个 PR | 4 个 Release：`v0.24.1`、nightly、Desktop、TS SDK | Web Shell、daemon、沙箱、权限、workflow retry、session recovery 高速推进 |
| **DeepSeek TUI** | 5 个 Issue | 3 个 PR | 无新 Release | Session/branch 持久化、TUI 渲染、metrics、测试稳定性 |

---

## 3. 共同关注的功能方向

### 3.1 权限、安全与沙箱边界

多个工具都暴露出 AI CLI 在真实开发环境中执行命令、写文件、调用工具时的安全边界问题。

| 工具 | 具体诉求 |
|---|---|
| **Claude Code** | Bash allow rule wildcard 扩权、`deny Bash` 后 Monitor 仍可 shell 执行、worktree 沙箱误拦截 |
| **Qwen Code** | compound shell command 中 `cd` / 引号 / `&` 组合可能绕过写入保护，正在推进 bwrap、Landlock、per-tool sandbox |
| **Copilot CLI** | sandbox 下 `/ide` 因 `kill(pid,0)` 返回 `EPERM` 被误判为进程不存在 |
| **OpenCode** | skill mention 权限检查、插件 ErrorBoundary、自定义 agent 与 Free Tier 边界 |
| **Pi** | bash timeout 单位、find/grep 无 timeout、工具被 kill 后返回空成功 |
| **Gemini CLI** | Podman sandbox 中 folder trust 无法持久化 |

**判断**：权限模型已经成为 AI CLI 的核心基础设施，而不是附属功能。未来工具需要同时具备：细粒度权限、可解释授权、沙箱隔离、命令语义解析和审计日志。

---

### 3.2 长会话、恢复与上下文治理

长会话稳定性是今天最明显的共性主题之一。

| 工具 | 具体诉求 |
|---|---|
| **Gemini CLI** | `--resume` 应恢复“最近活跃”而非“最近创建”的会话 |
| **Claude Code** | Desktop 会话丢失 Project/folder 关联；diff pane 恢复体验修复 |
| **OpenAI Codex** | TUI transcript v2、搜索、复制、分页、历史工具详情恢复 |
| **OpenCode** | 50 轮后 resume/compaction 性能退化；session JSON 过大；prompt cache 失效 |
| **Pi** | compaction 可取消、hook 一致、工具列表不应在压缩后退化 |
| **Qwen Code** | standalone session restore、live-journal repair、workflow retry from history、local notes compaction |
| **DeepSeek TUI** | `/branch` 保存丢失分支结构，foreign session import 后 engine 状态不同步 |

**判断**：AI CLI 正在从“短会话问答工具”变成“长期上下文工作台”。会话恢复、分支历史、压缩策略、transcript 可检索性，将直接决定工具能否服务真实工程项目。

---

### 3.3 Agent 生命周期与成本控制

Agent 自主调度和多 Agent 工作流开始带来新的治理问题。

| 工具 | 具体诉求 |
|---|---|
| **Claude Code** | Agent 主动启动多 Agent 流程消耗 5 小时窗口，无预估/确认；Agent ref 冲突；pinned agent UI 不清理 |
| **OpenAI Codex** | gpt-6-astra 循环、非请求改动、1TB 临时写入；小任务消耗 20–23% 五小时额度 |
| **Gemini CLI** | 后台任务永久 Running，需要 PID watchdog 和 IPC 清理 |
| **Copilot CLI** | background sub-agent stream failure 后没有明确失败状态 |
| **OpenCode** | 非交互式 `opencode run` 加固，避免权限/表单阻塞；长会话 cache 和 compaction 成本问题 |
| **Qwen Code** | workflow retry/rerun from history，跨 session inbound message gate |
| **Pi** | 用户取消后仍进入 retry/recovery/auto-compaction 的问题被重点修复 |

**判断**：Agent 能力越强，越需要预算、并发、失败状态、取消语义和资源上限。未来成熟的 AI CLI 应提供类似“Agent 调度器”的治理能力。

---

### 3.4 TUI / Desktop / Web Shell 交互体验

终端和桌面 UI 已成为竞争重点。

| 工具 | 具体诉求 |
|---|---|
| **OpenAI Codex** | transcript v2、搜索、复制、warning viewer、composer 稳定性、动画可关闭 |
| **Copilot CLI** | Ghostty 视口偏移、macOS Ghostty 崩溃 |
| **Pi** | Windows ConPTY autowrap、剪贴板图片 MIME、鼠标定位、resize 重排 |
| **DeepSeek TUI** | visual-row cursor、painted-column transcript copy、composer tab |
| **Claude Code** | VS Code pinned agent list、Desktop project association |
| **Qwen Code** | Web Shell 搜索、trajectory view、mic level、composer toolbar |
| **OpenCode** | TUI variant 重复、toast 历史、退出确认、VS Code extension 启动契约 |

**判断**：AI CLI 的 UI 形态正在从“命令行输出流”演进为“终端/浏览器/IDE 中的交互式开发控制台”。

---

### 3.5 模型路由、策略过滤与多模型兼容

多模型支持带来了协议和行为一致性挑战。

| 工具 | 具体诉求 |
|---|---|
| **Gemini CLI** | 显式指定 `gemini-3-pro-preview` 不应被静默改写为 3.1 |
| **OpenAI Codex** | Desktop 与 Web 对同一提示策略过滤不同；模型行为循环、降级、误拒 |
| **Copilot CLI** | Gemini continuation 和 `/compact` 在 mixed-model history 中因 tool call 格式失败 |
| **Claude Code** | 正常合规/基础设施讨论被 safeguards 误拦截 |
| **Qwen Code** | agent function description 过长，token 预算浪费；SDK/CLI stream event breaking change |
| **Pi** | thinking level 下不同 sampling 参数需求 |
| **OpenCode** | provider、Azure、Vertex、模型列表发现、V2 provider 迁移问题 |

**判断**：多模型时代下，AI CLI 需要解决的不只是“调用哪个模型”，还包括模型版本 pin、工具协议适配、策略一致性、上下文格式转换和成本透明度。

---

## 4. 差异化定位分析

### Claude Code：安全权限与多端 Agent 工作流驱动

Claude Code 今日重点明显集中在 **权限一致性、Remote Control、多端认证、Agent 生命周期和 Desktop/VS Code 集成**。  
它更像面向专业开发者的“AI coding 工作流平台”，强调 IDE/Desktop/CLI/Mobile Remote Control 的协同。  
但当前痛点也集中在复杂系统交互处：权限规则、远控登录、项目上下文恢复和 Agent 成本控制。

**定位关键词**：企业级开发工作流、多端协同、权限治理、Agent 编排。

---

### OpenAI Codex：Rust CLI/TUI 快速重构与 Desktop 能力扩展

Codex 过去 24 小时连续发布 3 个 Rust alpha，PR 几乎全部围绕 TUI transcript、composer、warning viewer、搜索复制等体验重构。  
同时，Windows Desktop 报告了插件加载失败、renderer 内存泄漏、SandboxService 卡死等问题，说明 Desktop 版能力很强但稳定性压力较大。  
Codex 的差异化在于 **TUI 体验快速升级 + Desktop 插件化能力，如 Browser、Computer Use、Image Gen**。

**定位关键词**：OpenAI 多模态/插件化 Agent、Rust TUI、Desktop 能力、快速预发布迭代。

---

### Gemini CLI：核心语义收敛与企业可观测性

Gemini CLI 今日关注点更偏基础正确性：`--resume` 语义、显式模型 ID 保留、Telemetry JSON 序列化、后台任务状态。  
相比 Codex 和 Qwen 的大规模功能推进，Gemini CLI 更像是在修正 CLI 核心行为契约，尤其强调 **模型版本控制、会话恢复、企业 telemetry**。  
维护响应较快，多个高优先级 Issue 已有对应 PR。

**定位关键词**：Google 模型 CLI、会话正确性、模型 rollout 控制、企业 telemetry。

---

### GitHub Copilot CLI：IDE/MCP 生态连接器，但稳定性仍在 triage

Copilot CLI 今日无 PR 和 Release，Issue 主要集中在 MCP、IDE workspace 发现、Ghostty 终端兼容、多模型 tool call 格式。  
它的差异化在于与 GitHub/Copilot/IDE/MCP 生态的天然连接，但当前问题说明非交互式、sandbox、多模型历史和终端兼容仍需增强。  
从社区动态看，今天更像问题收集期而非集中修复期。

**定位关键词**：GitHub 生态、IDE/MCP 集成、多模型会话、终端兼容。

---

### OpenCode：开放扩展、V2 迁移与商业化订阅压力并存

OpenCode 今日 Issue 和 PR 都很活跃，但热点集中在 Go 订阅、Free Tier、V2 迁移、长会话性能、VS Code/Windows 兼容。  
它的优势是开放扩展和快速修复能力，PR 涵盖插件 ErrorBoundary、非交互模式、Azure 发现、Windows `.cmd`、VS Code 契约。  
但商业化链路与 V2 迁移带来的用户摩擦较明显。

**定位关键词**：开放式 AI coding agent、插件生态、V2 平台化、商业化订阅。

---

### Pi：终端优先、长会话成本优化和可嵌入 SDK

Pi 发布 v0.86.0，核心是 Prompt cache warming，明显聚焦长会话成本和缓存命中。  
社区反馈集中在 compaction/cancellation、extension hook、tool timeout、SDK 全局副作用，说明 Pi 正从 CLI 工具向 **可嵌入、可扩展、长会话友好** 的 agent runtime 演进。  
其工程细节响应非常快，多个 Issue 当日关闭并有 PR 修复。

**定位关键词**：终端 coding agent、prompt cache、compaction、extension API、SDK 嵌入。

---

### Qwen Code：Web Shell / daemon / 沙箱基础设施高速推进

Qwen Code 今日 Release 最多，覆盖 CLI、Desktop、SDK、nightly。  
PR 侧非常活跃，集中在 workflow retry、bwrap/Landlock 沙箱、Web Shell、daemon credential、安全权限、local notes compaction。  
它呈现出明显的平台化路线：CLI + Desktop + Web Shell + daemon + SDK，且在执行沙箱和会话恢复上投入很大。

**定位关键词**：全栈 AI agent 平台、Web Shell、daemon、本地沙箱、workflow 自动化。

---

### DeepSeek TUI：小而精的 TUI 和会话可靠性修复

DeepSeek TUI 今日活动量不大，但问题集中在 session/branch 持久化、foreign session import、TUI 视觉语义、metrics 和测试稳定性。  
它更像一个注重终端交互精准性的工具，近期修复深入到 visual row、painted column、composer tab 等细节。  
社区规模相对较小，但工程议题集中、修复方向明确。

**定位关键词**：TUI 精细体验、会话分支、metrics、贡献者测试稳定性。

---

### Kimi Code CLI：今日无可观测活动

Kimi Code CLI 过去 24 小时无 Issue、PR、Release 活动。  
从今日数据看，无法判断其当前技术重心或社区活跃度。

---

## 5. 社区热度与成熟度

### 高活跃、高速迭代

| 工具 | 依据 |
|---|---|
| **Qwen Code** | 多个 Release，≥10 PR，Web Shell、沙箱、daemon、workflow、SDK 同时推进 |
| **OpenAI Codex** | 3 个 Alpha Release，≥10 PR，Rust/TUI transcript 大规模重构 |
| **OpenCode** | ≥10 PR，Issue 密集，V2/订阅/兼容性/插件快速修复 |
| **Pi** | v0.86.0 发布，16 Issue，多个 compaction/cancellation 问题快速关闭 |

这些工具处于明显的快速迭代阶段，功能推进快，但也更容易出现回归、兼容性和迁移问题。

---

### 中高活跃、问题治理导向

| 工具 | 依据 |
|---|---|
| **Claude Code** | Issue 活跃，安全和权限问题集中，但 PR 仅 2 个 |
| **Gemini CLI** | Issue 与 PR 匹配较好，多个 P2 问题已有修复 PR |
| **Copilot CLI** | 7 个 Issue，但无 PR，当前偏 triage 状态 |

Claude Code 和 Gemini CLI 更偏成熟产品的问题收敛：社区反馈质量高，问题涉及真实工程边界。  
Copilot CLI 今日活跃主要来自 Issue，说明社区在暴露问题，但维护侧当天没有明显代码响应。

---

### 低活跃或小规模聚焦

| 工具 | 依据 |
|---|---|
| **DeepSeek TUI** | 5 Issue、3 PR，问题集中在 TUI 和 session 可靠性 |
| **Kimi Code CLI** | 无活动 |

DeepSeek TUI 社区规模较小，但议题清晰。Kimi 今日没有可分析动态。

---

## 6. 值得关注的趋势信号

### 趋势一：AI CLI 正在从“聊天工具”变成“Agent Runtime”

今天多个项目都在处理后台任务、Agent 调度、workflow retry、多 session、工具调用、沙箱和权限。  
这说明 AI CLI 的核心价值不再只是自然语言生成代码，而是成为可以驱动本地开发环境的 **Agent Runtime**。

**开发者参考**：选型时应关注工具是否支持可靠的任务状态、取消机制、失败恢复、并发控制和审计能力。

---

### 趋势二：权限和沙箱将成为 AI Coding 工具的基础门槛

Claude Code、Qwen Code、Copilot CLI、Pi、OpenCode 都出现权限或执行边界问题。  
尤其是 shell command parsing、Monitor/Bash 间接执行、bwrap/Landlock、sandbox 下 IDE discovery 等问题，说明简单的 allow/deny 已不够。

**开发者参考**：在团队环境中落地 AI CLI 时，应优先评估：  
- 是否支持细粒度工具权限；  
- 是否有沙箱；  
- 是否能限制文件写入范围；  
- 是否能审计命令和工具调用；  
- 是否能解释拒绝或允许原因。

---

### 趋势三：长会话体验成为核心竞争力

Codex 的 transcript v2、Qwen 的 notes compaction、Pi 的 prompt cache warming、OpenCode 的长会话性能、DeepSeek 的 branch/session 保存、Gemini 的 resume 语义，都指向同一方向：长会话正在成为主战场。

**开发者参考**：如果你的使用场景是大型项目、重构、长周期调试，应重点选择具备以下能力的工具：  
- 会话恢复准确；  
- transcript 可搜索和复制；  
- compaction 可控；  
- prompt cache 或上下文压缩有效；  
- 分支历史或回滚机制可靠。

---

### 趋势四：多模型支持带来新的协议复杂度

Gemini 模型 ID 被静默改写、Copilot mixed-model history 触发 Gemini tool call 格式错误、Codex 出现模型策略误拒、Claude Code 模型安全误拦截。  
多模型不是简单换 endpoint，而是涉及工具 schema、历史消息格式、安全策略、模型版本 pin 和成本估算。

**开发者参考**：多模型工具要优先关注：  
- 能否显式 pin 模型版本；  
- 切换模型后历史是否兼容；  
- tool call 是否跨模型适配；  
- 策略拒绝是否可诊断；  
- 是否存在自动降级或静默 rewrite。

---

### 趋势五：Windows、终端和 Desktop 兼容性仍是高风险区

Codex、OpenCode、Gemini、Pi、Copilot CLI 都出现 Windows、Ghostty、ConPTY、winget、nvm shim、renderer 内存、SandboxService 等问题。  
AI CLI 工具虽然常以 Unix-like 开发环境为默认，但真实用户环境高度复杂。

**开发者参考**：团队部署前应在目标环境中验证：  
- Windows/WSL2 支持；  
- 终端兼容性，如 Ghostty、Windows Terminal、tmux、SSH；  
- Desktop 资源占用；  
- 插件加载；  
- 安装器退出码；  
- sandbox 与 IDE 联动。

---

### 趋势六：成本与额度透明度成为用户信任问题

Claude Code、Codex、OpenCode 都出现额度、订阅、窗口消耗、Free Tier、Go 订阅等问题。  
Agent 自动拆任务、重复工具调用、compaction、图片生成、后台任务都可能消耗用户额度，但当前很多工具缺少清晰预估和拆解。

**开发者参考**：对重度用户和团队用户，应优先选择提供以下能力的工具：  
- token / quota 使用明细；  
- Agent 启动前成本预估；  
- 并发和子 Agent 限制；  
- 失败任务是否扣费说明；  
- 订阅状态和额度重置时间透明展示。

---

## 总体结论

今日 AI CLI 工具生态呈现出三个明显分层：

1. **高速平台化工具**：Qwen Code、OpenAI Codex、OpenCode、Pi  
   - 功能推进快，Release/PR 活跃，但伴随较多回归和兼容性问题。

2. **成熟产品型工具**：Claude Code、Gemini CLI、Copilot CLI  
   - 用户反馈集中在权限、安全、多端、模型一致性和工程稳定性，说明已经进入真实生产工作流验证阶段。

3. **小规模精修型工具**：DeepSeek TUI、Kimi Code CLI  
   - DeepSeek TUI 聚焦 TUI 和 session 可靠性；Kimi 今日无活动。

对技术决策者而言，选型不应只看模型能力，而应重点评估 **权限安全、长会话恢复、Agent 可控性、成本透明度、跨平台稳定性和生态集成能力**。这些因素正在成为 AI CLI 工具能否真正进入团队开发流程的关键门槛。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告  
数据截止：2026-09-20  
说明：PR 列表声称按评论数排序，但评论数字段显示为 `undefined`，以下以排序位置、更新时间、Issue 关联度和社区问题热度综合判断关注度。

---

## 1. 热门 Skills 排行

| 排名 | Skill / PR | 功能定位 | 社区讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | `skill-creator` 修复触发评估 | 修复 Skill 创建与触发评估流程，隔离 trigger eval、处理 Windows 与运行时失败 | 触发检测误报、0% recall、Windows 子进程兼容性，是社区最核心的基础设施问题之一 | OPEN |
|  | [PR #1298](https://github.com/anthropics/skills/pull/1298) |  |  |  |
| 2 | `proofcore-contract-auditor` | 面向 Web3 的智能合约静态审计 Skill，支持 Solidity / Rust，并将审计证明锚定到 TON 区块链 | 安全审计、链上证明、Web3 开发者工作流 | OPEN |
|  | [PR #1771](https://github.com/anthropics/skills/pull/1771) |  |  |  |
| 3 | `mcp-builder` 修复 | 修复 MCP v2 `streamable_http_client` 导入变化与自定义 HTTP headers 支持 | MCP 生态兼容性、真实服务器评估失败、HTTP 客户端配置 | OPEN |
|  | [PR #1742](https://github.com/anthropics/skills/pull/1742) |  |  |  |
| 4 | `md2video-audio` | 将 Markdown 直接编译为带真人风格旁白的 MP4 视频 | 内容自动化、文档转视频、低成本多媒体生成 | OPEN |
|  | [PR #1703](https://github.com/anthropics/skills/pull/1703) |  |  |  |
| 5 | `docx` 评论检测修复 | 检测 DOCX 中孤立 / 异常评论 | Office 文档可靠性、批注结构完整性、企业文档处理 | OPEN |
|  | [PR #1734](https://github.com/anthropics/skills/pull/1734) |  |  |  |
| 6 | `pyxel` | 面向 Python 复古游戏开发的 Skill，支持实现、调试、无头运行和帧检查 | 游戏开发、可验证运行、视觉状态检查 | OPEN |
|  | [PR #525](https://github.com/anthropics/skills/pull/525) |  |  |  |
| 7 | `document-typography` | 对生成文档做排版质量控制，防止孤行、寡行、编号错位等问题 | AI 生成文档质量、专业排版、长文档交付 | OPEN |
|  | [PR #514](https://github.com/anthropics/skills/pull/514) |  |  |  |
| 8 | `awt` / AI Watch Tester | AI 驱动的端到端测试 Skill，支持浏览器控制和零代码测试生成 | 自动化测试、视觉测试、E2E 生成、前端 QA | OPEN |
|  | [PR #822](https://github.com/anthropics/skills/pull/822) |  |  |  |

---

## 2. 社区需求趋势

### 2.1 Skill 分发、权限与信任边界

社区最热 Issue 指向 Skill 生态治理问题：社区 Skill 以 `anthropic/` namespace 分发，可能被误认为官方 Skill，形成信任边界风险。

- [Issue #492](https://github.com/anthropics/skills/issues/492)  
  关注点：官方 / 社区 Skill 区分、命名空间隔离、权限授权安全。
- [Issue #228](https://github.com/anthropics/skills/issues/228)  
  关注点：组织内 Skill 共享、企业 Skill 库、统一分发机制。

**趋势判断：** 企业用户开始把 Skills 当作可复用能力资产，因此对权限、来源可信度和组织级共享的需求明显上升。

---

### 2.2 Skill 触发与评估基础设施

多个高热 Issue 和 PR 都集中在 Skill 触发失败、评估不准、0% trigger rate 等问题。

- [Issue #556](https://github.com/anthropics/skills/issues/556)  
  `run_eval.py` 中 `claude -p` 无法触发 Skills / Commands。
- [Issue #1390](https://github.com/anthropics/skills/issues/1390)  
  `mcp-builder` 对真实 MCP server 评估全部失败。
- [PR #1769](https://github.com/anthropics/skills/pull/1769)  
  修复 `skill-creator` trigger detection 一直报告 0% recall。
- [PR #1298](https://github.com/anthropics/skills/pull/1298)  
  修复 trigger eval 隔离、Windows 兼容与运行时失败处理。

**趋势判断：** 社区不只需要更多 Skill，更需要可靠的创建、测试、评估和触发机制。

---

### 2.3 文档与 Office 工作流

DOCX、PDF、ODT、排版、批注、修订痕迹等相关 PR 数量较多，说明文档自动化仍是 Skills 的核心场景。

代表 PR：

- [PR #514](https://github.com/anthropics/skills/pull/514) — `document-typography`
- [PR #486](https://github.com/anthropics/skills/pull/486) — `odt`
- [PR #541](https://github.com/anthropics/skills/pull/541) — DOCX tracked change ID collision 修复
- [PR #1790](https://github.com/anthropics/skills/pull/1790) — DOCX comment relationship 修复
- [PR #1765](https://github.com/anthropics/skills/pull/1765) — Office redlining UTF-8 修复

**趋势判断：** 社区高度关注“AI 生成文档能否稳定用于真实办公流程”。

---

### 2.4 自动化测试与质量保障

E2E 测试、质量门禁、Skill 自身质量分析等方向逐渐升温。

- [PR #822](https://github.com/anthropics/skills/pull/822) — AI Watch Tester，AI 驱动 E2E 测试
- [Issue #1385](https://github.com/anthropics/skills/issues/1385) — Reasoning Quality Gate Pipeline
- [PR #83](https://github.com/anthropics/skills/pull/83) — `skill-quality-analyzer` 与 `skill-security-analyzer`

**趋势判断：** 社区希望 Skills 不只是执行任务，还能帮助 Claude 做自检、测试、评审和交付验证。

---

### 2.5 MCP 化与外部系统集成

MCP 相关 Issue / PR 活跃，说明社区期待 Skills 与外部工具、API、服务更标准化地连接。

- [Issue #16](https://github.com/anthropics/skills/issues/16) — Expose Skills as MCPs
- [PR #1742](https://github.com/anthropics/skills/pull/1742) — `mcp-builder` 支持 MCP v2 变更
- [PR #1724](https://github.com/anthropics/skills/pull/1724) — `mcp-builder` 默认模型更新

**趋势判断：** Skills 与 MCP 的边界正在靠近，社区希望 Skill 能成为可复用、可调用、可部署的 AI 软件接口。

---

## 3. 高潜力待合并 Skills

以下 PR 均为 OPEN，且具备较高讨论度、近期更新或明确解决现有 Issue，可能成为近期落地重点。

### 1. `skill-creator` 触发评估修复  
[PR #1298](https://github.com/anthropics/skills/pull/1298)

解决 trigger eval 误判、Windows 管道问题、运行时失败被误当成非触发等问题。  
**潜力原因：** 直接影响所有 Skill 的创建与优化质量，是生态级基础设施修复。

---

### 2. `mcp-builder` MCP v2 兼容修复  
[PR #1742](https://github.com/anthropics/skills/pull/1742)

修复 `mcp>=2.0.0` 中 `streamable_http_client` 命名变更与自定义 headers 配置。  
**潜力原因：** MCP 是 Claude Code 外部工具集成的关键方向，该 PR 直接解决版本兼容阻塞。

---

### 3. `AWT` AI Watch Tester  
[PR #822](https://github.com/anthropics/skills/pull/822)

为 Claude 提供浏览器控制和视觉能力，用于自动生成和运行 E2E 测试。  
**潜力原因：** 自动化测试是开发者高频需求，且与 Claude Code 编程场景高度契合。

---

### 4. `md2video-audio`  
[PR #1703](https://github.com/anthropics/skills/pull/1703)

将 Markdown 转为带语音旁白的 MP4 视频。  
**潜力原因：** 把文档、演示、培训材料自动转视频，覆盖内容生产与企业培训场景。

---

### 5. `proofcore-contract-auditor`  
[PR #1771](https://github.com/anthropics/skills/pull/1771)

对 Solidity / Rust 智能合约做静态分析，并将审计证明锚定到 TON 区块链。  
**潜力原因：** 结合安全审计与链上证明，定位明确，适合 Web3 开发者工作流。

---

### 6. `document-typography`  
[PR #514](https://github.com/anthropics/skills/pull/514)

对 AI 生成文档进行排版质量控制。  
**潜力原因：** 文档生成是 Skills 最成熟的应用场景之一，该 Skill 能提升最终交付质量。

---

### 7. `pyxel` 复古游戏开发 Skill  
[PR #525](https://github.com/anthropics/skills/pull/525)

支持使用 Python / Pyxel 创建、调试和验证复古游戏。  
**潜力原因：** 具备明确开发闭环：实现、运行、帧检查、状态验证，适合 Claude Code 代理式开发。

---

## 4. Skills 生态洞察

**一句话总结：**  
当前 Claude Code Skills 社区最集中的诉求，是把 Skills 从“可分享的提示与脚本包”升级为“可信、可评估、可治理、可集成的企业级自动化能力单元”。

---

# Claude Code 社区动态日报  
**日期：2026-09-20**  
**仓库：anthropics/claude-code**

## 1. 今日速览

过去 24 小时没有新版本发布，但 Issue 活跃度较高，重点集中在 **权限安全、Remote Control / Desktop 登录、Agent 调度、VS Code 体验、模型误拦截** 等方向。  
今日最值得关注的是多个带有 `has repro` 的权限与 Agent 问题，说明社区正在从“功能可用性”转向更细粒度的 **安全边界、可预测性与工程稳定性** 反馈。

---

## 2. 版本发布

过去 24 小时暂无新的 Release。

---

## 3. 社区热点 Issues

### 1. Bash allow-rules 中引号内 `*` 被错误解释为通配符  
- Issue：[#95614](https://github.com/anthropics/claude-code/issues/95614)  
- 状态：OPEN  
- 标签：`bug`, `has repro`, `area:security`, `area:permissions`, `platform:wsl`  
- 重要性：这是一个权限规则重放问题。用户在批准 Bash 命令时，引号内本应作为字面量的 `*` 会在后续匹配中被当作位置通配符，可能导致“总是允许”的权限范围被意外放大。  
- 社区反应：评论数 2，是今日评论最多的 Issue；虽然点赞不多，但安全与权限相关，优先级较高。

### 2. 重新登录提示未说明具体实例与 CLI 登录要求  
- Issue：[#95620](https://github.com/anthropics/claude-code/issues/95620)  
- 状态：OPEN  
- 标签：`bug`, `has repro`, `platform:macos`, `area:auth`  
- 重要性：涉及 Desktop、CLI、Mobile Remote Control 多端联动时的认证提示不清晰。用户无法判断是哪一个 Claude Code 实例需要重新登录，也不清楚是否必须在 CLI 中执行登录。  
- 社区反应：已有评论，说明多端远程控制场景下认证 UX 仍存在明显摩擦。

### 3. macOS Desktop Remote Control 启用失败，返回 HTTP 403  
- Issue：[#95619](https://github.com/anthropics/claude-code/issues/95619)  
- 状态：OPEN  
- 标签：`duplicate`, `platform:macos`, `area:auth`, `area:desktop`  
- 重要性：Remote Control 在桌面端 Code session 中启用失败，但 CLI session 可正常连接，说明 Desktop 与 CLI 的远控授权路径可能不一致。  
- 社区反应：已被标记为 duplicate，表明类似问题并非孤例。

### 4. Desktop 会话静默丢失 Project / folder 关联  
- Issue：[#95624](https://github.com/anthropics/claude-code/issues/95624)  
- 状态：OPEN  
- 标签：`bug`, `platform:macos`, `area:ui`, `area:desktop`  
- 重要性：项目上下文是 Claude Code 进行文件级开发工作的基础。会话在正常单设备使用中丢失项目目录关联，可能直接影响工具调用、上下文恢复与用户信任。  
- 社区反应：暂无评论，但问题影响核心 Desktop 工作流。

### 5. VS Code 扩展中 pinned agent 列表不清理、不滚动并压缩对话区  
- Issue：[#95622](https://github.com/anthropics/claude-code/issues/95622)  
- 状态：OPEN  
- 标签：`bug`, `platform:macos`, `platform:vscode`, `area:agent-view`  
- 重要性：自 2.1.275 引入后台任务显示后，Agent 列表 UI 可能累积已完成任务，导致聊天区域被压缩。该问题影响 VS Code 内多 Agent 工作流的可用性。  
- 社区反应：暂无评论，但与近期 Agent Map / background tasks 功能直接相关。

### 6. 禁用 Bash 后 Monitor 仍可执行任意 shell  
- Issue：[#95615](https://github.com/anthropics/claude-code/issues/95615)  
- 状态：OPEN  
- 标签：`bug`, `has repro`, `platform:macos`, `area:security`, `area:permissions`  
- 重要性：用户通过 `--disallowedTools Bash` 或 `permissions.deny: ["Bash"]` 禁用 Bash 后，`Monitor.command` 仍可能通过 shell 执行命令。这暴露出工具权限模型的一致性问题。  
- 社区反应：暂无评论，但安全边界清晰度很关键，值得优先关注。

### 7. Worktree 隔离错误拒绝包含特定 shell 词的只读命令  
- Issue：[#95611](https://github.com/anthropics/claude-code/issues/95611)  
- 状态：OPEN  
- 标签：`bug`, `has repro`, `area:bash`, `area:agents`, `area:sandbox`  
- 重要性：在 `EnterWorktree` 隔离会话中，只要 argv 任意位置包含特定 shell 词就会被拒绝，即使命令并非 git 操作、也没有写入行为。这可能造成沙箱策略过度拦截。  
- 社区反应：暂无评论，但复现清晰，影响自动化 Agent 在隔离工作区内执行诊断命令。

### 8. ListAgents 为两个 live session 分配相同短引用  
- Issue：[#95610](https://github.com/anthropics/claude-code/issues/95610)  
- 状态：OPEN  
- 标签：`bug`, `has repro`, `area:agents`  
- 重要性：Agent 列表中的短 ref 用于区分同名会话。如果两个 live session 出现相同 ref，用户或父 Agent 可能无法可靠寻址目标 Agent。  
- 社区反应：暂无评论，但这类标识冲突会直接影响多 Agent 协作可靠性。

### 9. Linux Desktop OAuth 回调被当作重复投递丢弃  
- Issue：[#95599](https://github.com/anthropics/claude-code/issues/95599)  
- 状态：OPEN  
- 标签：`bug`, `has repro`, `platform:linux`, `area:auth`, `area:desktop`  
- 重要性：Linux Desktop 在登录过期后，浏览器 OAuth 回调无法恢复登录，导致 `/login` 无效。认证恢复失败会阻塞整个桌面端使用。  
- 社区反应：暂无评论，但 Linux Desktop 用户会受到较大影响。

### 10. Agent 主动发起多 Agent 运行耗尽 5 小时窗口且无预估或警告  
- Issue：[#95600](https://github.com/anthropics/claude-code/issues/95600)  
- 状态：OPEN  
- 标签：`enhancement`, `area:cost`, `area:agents`  
- 重要性：用户反馈 Claude Code 主动启动多 Agent 审查流程，快速消耗 Max 计划的 5 小时窗口，却没有成本预估、确认或警告。  
- 社区反应：暂无评论，但该问题触及使用成本、Agent 自主性边界与用户控制权，是产品体验上的高价值反馈。

---

## 4. 重要 PR 进展

过去 24 小时仅有 2 个 PR 更新，未达到 10 个。以下为全部重要 PR：

### 1. Telemetry：补全通过 `$` 收集的行并批量发送，仅服务内置插件  
- PR：[#95618](https://github.com/anthropics/claude-code/pull/95618)  
- 状态：OPEN  
- 作者：poteat  
- 内容概要：该 PR 调整 telemetry 模块，使其在 Claude Code analytics 开启时运行，并且仅作用于 Claude Code 内置插件。它会检查调用来源 `next.origin`，拒绝用户安装或管理员列出的插件上报，并记录原因。  
- 影响分析：  
  - 强化遥测数据边界，避免第三方或管理员配置插件被误纳入内置插件遥测。  
  - 改善 telemetry row 的完整性和批处理逻辑。  
  - 与隐私、可观测性、插件治理相关，适合重点关注。

### 2. Diff：恢复会话含编辑时自动打开 diff pane，`/clear` 后保持一致行为  
- PR：[#95587](https://github.com/anthropics/claude-code/pull/95587)  
- 状态：OPEN  
- 作者：poteat  
- 内容概要：修复 diff 模块与内置面板行为不一致的问题。恢复或继续一个已有编辑记录的 session 时，在宽度可知后自动打开 diff pane；`/clear` 后 pane 行为也与引擎启动状态保持一致。  
- 影响分析：  
  - 改善恢复会话时的编辑可见性。  
  - 减少 diff panel 与内置 UI 状态不一致导致的困惑。  
  - 对长会话、恢复会话、代码审查场景有实际帮助。

---

## 5. 功能需求趋势

### 1. 权限系统更精细、更可解释  
相关 Issue：  
- [#95614](https://github.com/anthropics/claude-code/issues/95614)  
- [#95615](https://github.com/anthropics/claude-code/issues/95615)  
- [#95617](https://github.com/anthropics/claude-code/issues/95617)  
- [#95608](https://github.com/anthropics/claude-code/issues/95608)  

趋势说明：用户希望 Bash、Monitor、MCP、WebFetch、WebSearch 等工具的权限策略更加一致，尤其是在 Remote Control、Desktop restart、wildcard allow rule 等复杂场景下，权限行为需要可预测、可审计。

### 2. Remote Control 与多端认证体验仍是痛点  
相关 Issue：  
- [#95620](https://github.com/anthropics/claude-code/issues/95620)  
- [#95619](https://github.com/anthropics/claude-code/issues/95619)  
- [#95609](https://github.com/anthropics/claude-code/issues/95609)  
- [#95599](https://github.com/anthropics/claude-code/issues/95599)  

趋势说明：Desktop、CLI、Mobile Remote Control 之间的认证状态、会话绑定、OAuth 回调处理仍不够稳定。用户不仅需要“能连接”，还需要明确知道哪一端出错、如何恢复。

### 3. Agent 工作流需要更强的可控性与状态一致性  
相关 Issue：  
- [#95622](https://github.com/anthropics/claude-code/issues/95622)  
- [#95612](https://github.com/anthropics/claude-code/issues/95612)  
- [#95610](https://github.com/anthropics/claude-code/issues/95610)  
- [#95601](https://github.com/anthropics/claude-code/issues/95601)  
- [#95600](https://github.com/anthropics/claude-code/issues/95600)  

趋势说明：随着 Claude Code 的 Agent 能力增强，社区反馈开始集中在 Agent 生命周期、重复通知、重复 spawning、任务寻址、成本消耗与 UI 呈现上。多 Agent 能力正在从“新功能”进入“工程化治理”阶段。

### 4. Desktop App 稳定性与项目上下文恢复需求提升  
相关 Issue：  
- [#95624](https://github.com/anthropics/claude-code/issues/95624)  
- [#95623](https://github.com/anthropics/claude-code/issues/95623)  
- [#95588](https://github.com/anthropics/claude-code/issues/95588)  
- [#95599](https://github.com/anthropics/claude-code/issues/95599)  

趋势说明：Desktop 用户反馈涉及项目关联丢失、Linux 冻结、Windows MSIX 更新受阻、Linux OAuth 恢复失败等问题。桌面端已成为 Claude Code 的重要入口，稳定性要求明显提高。

### 5. 模型安全策略误拦截仍影响开发体验  
相关 Issue：  
- [#95584](https://github.com/anthropics/claude-code/issues/95584)  
- [#95603](https://github.com/anthropics/claude-code/issues/95603)  
- [#95602](https://github.com/anthropics/claude-code/issues/95602)  
- [#95621](https://github.com/anthropics/claude-code/issues/95621)  

趋势说明：用户报告合规讨论、视频帧旋转、基础设施配置等正常开发内容被安全策略误判。另有 Sonnet 5 输出行为异常，说明模型层面的安全过滤与交互质量仍是高频关注点。

---

## 6. 开发者关注点

### 1. “权限允许”与“实际执行”之间需要严格一致  
开发者对 Claude Code 的信任很大程度取决于权限系统是否可预测。今日多个 Issue 都指向同一问题：  
- 用户配置了 `deny Bash`，但其他工具仍可经 shell 执行。  
- 用户批准了某条 Bash allow rule，但 wildcard 语义可能被扩大。  
- MCP 第一次调用可能忽略 wildcard allow rule。  

这类问题建议优先处理，因为它们涉及安全边界，而不仅是交互体验。

### 2. Remote Control 需要更好的诊断信息  
当前错误如 HTTP 403、连接超时、登录过期等，对用户来说缺少上下文。开发者希望看到：  
- 是 CLI、Desktop 还是 Mobile 端需要操作；  
- 当前绑定的是哪个 host / session；  
- 失败是认证问题、权限问题还是网络问题；  
- 应该执行 `/login`、`/remote-control` 还是重新授权 Desktop。

### 3. Agent 自主性需要配套成本控制  
Agent 可以主动拆分任务、启动多 Agent 审查或 mutation run，但用户希望在资源消耗前获得：  
- 预计耗时；  
- 预计 token / plan window 消耗；  
- 是否允许启动大量子 Agent；  
- 是否限制并发数或最大任务数。  

这对 Max / Pro 用户尤其重要。

### 4. IDE 与 Desktop UI 需要处理长任务与恢复场景  
VS Code 的 agent list、Desktop 的 project association、diff pane 恢复行为都显示出一个趋势：Claude Code 正在承载更长、更复杂的开发会话。UI 需要更好地支持：  
- 长会话恢复；  
- 已完成 Agent 清理；  
- 滚动与折叠；  
- 项目上下文稳定绑定；  
- diff / edit 状态一致恢复。

### 5. 模型误拦截需要更直接的反馈路径  
多条 Issue 反映正常开发讨论被 safeguards 拦截。开发者希望：  
- 明确是哪类策略触发；  
- 提供可上报的 feedback ID；  
- 区分 Claude Code、Claude.ai、API 等产品路径；  
- 减少对合规、安全、基础设施话题的误伤。

---

今日整体来看，Claude Code 社区反馈的重点已经从“新增能力”转向 **安全权限一致性、多端连接可靠性、Agent 可控性与长会话工程体验**。对于团队开发者和重度用户而言，建议重点跟踪权限相关 Issue 与 Remote Control / Agent 生命周期问题的后续修复。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-09-20）

## 1. 今日速览

过去 24 小时，Codex 仓库连续发布 `rust-v0.156.0-alpha.7` 至 `alpha.9` 三个 Alpha 版本，说明 Rust/CLI 侧仍在高频迭代。社区反馈主要集中在 Windows Desktop 稳定性、模型行为退化、额度消耗异常、TUI 交互变化以及 Browser / Computer Use / Image Gen 插件加载失败等问题。PR 侧则几乎全部围绕 TUI transcript、composer、warning viewer 与交互体验重构展开，显示终端体验正在经历一轮系统性升级。

---

## 2. 版本发布

### rust-v0.156.0-alpha.9  
- 链接：openai/codex Release `rust-v0.156.0-alpha.9`
- 说明：过去 24 小时内最新 Alpha 版本，属于 `0.156.0` 系列预发布迭代。
- 观察：仓库未提供详细 changelog，但结合同期 PR，可推测重点仍在 Rust CLI / TUI 体验、transcript 渲染与交互稳定性。

### rust-v0.156.0-alpha.8  
- 链接：openai/codex Release `rust-v0.156.0-alpha.8`
- 说明：`0.156.0` 系列连续 Alpha 版本之一。
- 观察：高频 Alpha 发布表明当前主线仍处于快速验证阶段，建议生产环境用户谨慎升级。

### rust-v0.156.0-alpha.7  
- 链接：openai/codex Release `rust-v0.156.0-alpha.7`
- 说明：`0.156.0` 早期 Alpha 版本。
- 观察：与后续 alpha.8 / alpha.9 间隔较短，可能包含 TUI 与 CLI 相关修复的连续验证。

---

## 3. 社区热点 Issues

### 1. gpt-6-astra 在 CLI 中陷入长时间循环并产生巨大临时写入  
- 链接：openai/codex Issue #46700  
- 状态：OPEN  
- 标签：`bug`, `model-behavior`, `windows-os`, `CLI`, `performance`  
- 重要性：用户报告 `gpt-6-astra max` 无法完成简单计划，出现自相矛盾循环、非请求改动，并向 `/tmp` 写入约 1 TB 数据。  
- 社区反应：3 条评论，属于今日讨论度最高的问题之一。该问题同时涉及模型行为、性能与资源安全，优先级较高。

### 2. 语音听写能力希望“自由可用”  
- 链接：openai/codex Issue #46701  
- 状态：OPEN  
- 标签：`enhancement`, `rate-limits`, `app`  
- 重要性：用户从无障碍角度提出语音听写不应被严格计入 agentic 额度或受限，强调可访问性需求。  
- 社区反应：3 条评论。虽然是功能诉求，但与 accessibility、额度策略和产品边界相关，可能引发后续设计讨论。

### 3. Codex App 单个小型 UI 任务消耗 20–23% 五小时额度  
- 链接：openai/codex Issue #46689  
- 状态：OPEN  
- 标签：`bug`, `rate-limits`, `app`  
- 重要性：用户报告一个小任务消耗大量配额，反映 Codex Desktop 在任务规划、工具调用或模型选择上的效率问题。  
- 社区反应：3 条评论。与近期多条额度消耗问题相互印证，是当前社区最敏感的痛点之一。

### 4. 图片右键“Save As”时报错  
- 链接：openai/codex Issue #46742  
- 状态：OPEN  
- 标签：`bug`, `app`  
- 重要性：影响桌面端对图片内容的基础操作，尤其是 GIF / inline image 的保存路径。  
- 社区反应：2 条评论。问题范围相对具体，但属于高频基础 UX 场景。

### 5. TUI 新动画无法关闭引发干扰  
- 链接：openai/codex Issue #46735  
- 状态：CLOSED  
- 标签：`enhancement`, `TUI`, `CLI`  
- 重要性：用户升级到 v0.155.1 后反馈 prompt 区域动画分散注意力，要求提供禁用方式。  
- 社区反应：2 条评论。该问题与同期 PR #46752 的“animated Codex logo”形成呼应，说明动画类 UI 改动需要更强的可配置性。

### 6. GPT Pro 在 ChatGPT / Codex App 中出现 “Thinking failed”  
- 链接：openai/codex Issue #46686  
- 状态：OPEN  
- 标签：`bug`, `app`  
- 重要性：Pro 用户无法正常发起请求，影响核心可用性。  
- 社区反应：2 条评论；另有重复 Issue #46687 已关闭，说明问题可能被合并追踪。

### 7. Windows Desktop 对无害提示误报 `invalid_prompt`，Web 端正常  
- 链接：openai/codex Issue #46756  
- 状态：OPEN  
- 标签：`bug`, `windows-os`, `app`  
- 重要性：用户报告 GPT-6 Astra 和 GPT-5.6 Sol 在 Windows Desktop 中拒绝无害提示，而 Codex Web 可正常处理。  
- 社区反应：1 条评论。该问题指向桌面端策略过滤、请求封装或模型路由差异。

### 8. 无害技术问题触发策略误报并自动降级模型  
- 链接：openai/codex Issue #46753  
- 状态：OPEN  
- 标签：`bug`, `model-behavior`, `app`, `config`  
- 重要性：用户反馈正常技术问题被错误标记，并触发自动模型降级，影响开发者对模型输出一致性的信任。  
- 社区反应：1 条评论。与 #46756 一起构成“策略误判 / 模型路由异常”的趋势。

### 9. Windows 26.915.4065.0 无法加载 Browser / Computer Use / Image Gen 插件  
- 链接：openai/codex Issue #46744  
- 状态：OPEN  
- 标签：`bug`, `windows-os`, `app`, `skills`, `computer-use`, `browser`, `imagen`  
- 重要性：更新后 openai-bundled plugins 加载失败，导致 Browser、Computer Use、Image Gen 不可用。  
- 社区反应：1 条评论。影响范围大，涉及多个关键能力，是 Windows 桌面版当前最值得关注的问题之一。

### 10. Windows Renderer 内存泄漏增长至 4–7 GB 并崩溃  
- 链接：openai/codex Issue #46690  
- 状态：OPEN  
- 标签：`bug`, `windows-os`, `app`, `performance`  
- 重要性：用户报告 26.915.4065.0 在轻负载下 renderer 快速涨到 4–7 GB 后崩溃，回退到 26.903.9818.0 后稳定。  
- 社区反应：1 条评论。该问题对 Windows Desktop 稳定性影响严重，也提示新版可能存在资源管理回归。

---

## 4. 重要 PR 进展

### 1. 为新会话和 onboarding 添加动态 Codex Logo  
- 链接：openai/codex PR #46752  
- 状态：CLOSED  
- 内容：在新会话 composer 上方空白区域渲染旋转 Codex Logo，并在输入、失焦或其他视图下暂停 / 隐藏。  
- 影响：改善初始界面视觉体验，但与用户对动画干扰的反馈相冲突，后续可能需要提供关闭选项。

### 2. TUI 增加 warning footer 与专用 warnings viewer  
- 链接：openai/codex PR #46751  
- 状态：CLOSED  
- 内容：在 TUI footer 中显示去重后的 warning 数量，并提供单独查看入口。  
- 影响：避免 warning 混入实时对话，同时提升诊断信息可发现性。

### 3. 保留启动阶段草稿，并在 session ready 后提交  
- 链接：openai/codex PR #46750  
- 状态：CLOSED  
- 内容：修复启动 composer 可编辑但提交被忽略的问题，并在启动失败时保留用户已输入文本。  
- 影响：提升 CLI / TUI 启动阶段可靠性，减少用户输入丢失。

### 4. 稳定 TUI transcript 与 composer 交互  
- 链接：openai/codex PR #46749  
- 状态：CLOSED  
- 内容：区分持久状态与临时提示，确保建议、提示、命令提交和历史阅读之间不互相破坏上下文。  
- 影响：改善在阅读旧记录时提交命令、查看输出的体验。

### 5. 增加紧凑 transcript 浏览与 prompt 导航  
- 链接：openai/codex PR #46739  
- 状态：CLOSED  
- 内容：支持双击 `Esc` 进入紧凑 prompt 浏览，使用方向键选择 prompt、滚动历史，并可切换详情或回退到指定 prompt。  
- 影响：强化长会话中的导航能力，适合复杂调试和多轮开发任务。

### 6. 增加 transcript 搜索与按 activity 控制详情  
- 链接：openai/codex PR #46734  
- 状态：CLOSED  
- 内容：支持大小写不敏感的增量文本搜索，可按需加载旧历史；支持在 activity 层面控制详情展开。  
- 影响：显著提升长 transcript 的可检索性，是 TUI 面向重度用户的重要增强。

### 7. 将交互式 transcript 集成进 alternate-screen TUI  
- 链接：openai/codex PR #46733  
- 状态：CLOSED  
- 内容：在启用 `features.transcript_v2` 且支持 alternate-screen 时，在 composer 上方渲染历史与实时输出，并支持滚动、选择、复制、链接和分页加载。  
- 影响：这是 TUI transcript v2 的核心集成 PR，标志着终端界面从简单输出流向交互式工作台演进。

### 8. transcript viewer 支持选择与复制  
- 链接：openai/codex PR #46732  
- 状态：CLOSED  
- 内容：支持鼠标选择、单词 / 行选择、拖拽自动滚动、键盘选择、复制文本以及修饰点击打开链接。  
- 影响：解决终端 transcript 难以复用内容的问题，对开发者复制命令、错误日志、patch 片段非常实用。

### 9. 渲染动态工具活动并保持 TUI 历史顺序  
- 链接：openai/codex PR #46731  
- 状态：CLOSED  
- 内容：保留动态工具项，确保 replay 工具活动与 live 输出一致，并在并发工具完成时保持 transcript 顺序。  
- 影响：提升工具调用可解释性，减少 live 和 persisted transcript 不一致带来的困惑。

### 10. 恢复 persisted TUI transcript 中的丰富工具详情  
- 链接：openai/codex PR #46710  
- 状态：CLOSED  
- 内容：加载历史 transcript 时复用更丰富的 history cells，保留命令、MCP 调用、patch、agent activity 等细节。  
- 影响：改善会话恢复后的上下文完整性，对排查历史任务和审计工具行为很重要。

---

## 5. 功能需求趋势

### 1. Windows Desktop 稳定性成为最大焦点  
相关 Issue：  
- openai/codex Issue #46744  
- openai/codex Issue #46690  
- openai/codex Issue #46754  
- openai/codex Issue #46748  
- openai/codex Issue #46703  

趋势：Windows 用户集中报告插件加载失败、renderer 内存泄漏、SandboxService 启动卡死、WSL interop 崩溃、node_repl 缺失等问题。当前 Windows Desktop 26.915.x 系列疑似存在多处回归。

### 2. 模型行为与策略过滤一致性问题升温  
相关 Issue：  
- openai/codex Issue #46700  
- openai/codex Issue #46756  
- openai/codex Issue #46753  
- openai/codex Issue #46747  
- openai/codex Issue #46716  

趋势：用户反馈 gpt-6-astra / gpt-5.6-sol 在 Codex Desktop 中出现循环、质量下降、无害内容误拒、历史消息误当作当前指令等问题。社区关注点从“模型是否可用”转向“模型在 Codex agent 环境中是否稳定、可控、一致”。

### 3. 额度消耗与 rate limit 透明度需求增强  
相关 Issue：  
- openai/codex Issue #46689  
- openai/codex Issue #46707  
- openai/codex Issue #46724  
- openai/codex Issue #46737  
- openai/codex Issue #46701  

趋势：Plus / Pro 用户频繁反馈简单任务消耗大量额度、图片生成失败仍可能扣额度、模型容量提示不一致等。社区希望 Codex 能提供更透明的用量拆解、工具调用预算和失败扣费解释。

### 4. TUI transcript 正在成为重点建设方向  
相关 PR：  
- openai/codex PR #46733  
- openai/codex PR #46734  
- openai/codex PR #46732  
- openai/codex PR #46739  
- openai/codex PR #46731  

趋势：官方过去 24 小时大量 PR 都围绕 transcript v2、搜索、复制、紧凑浏览、工具活动渲染展开。Codex CLI 正在向更成熟的终端交互式 IDE 体验靠拢。

### 5. Browser / Computer Use / Image Gen 插件化能力仍不稳定  
相关 Issue：  
- openai/codex Issue #46744  
- openai/codex Issue #46748  
- openai/codex Issue #46743  
- openai/codex Issue #46737  

趋势：用户报告 Browser、Chrome、Computer Use、Image Gen 出现不可用、node_repl 缺失、连接失败或附件错误。插件化能力是 Codex Desktop 的差异化功能，但当前稳定性仍需加强。

---

## 6. 开发者关注点

1. **稳定性优先级高于新视觉效果**  
   TUI 和 Desktop 都在引入新交互与动画，但用户对 prompt 动画干扰、renderer 崩溃、插件不可用的反馈显示，开发者更关注可预测性和稳定性。

2. **额度消耗需要可解释**  
   多个 Issue 指向“简单任务消耗大量 quota”。开发者希望知道消耗来自模型推理、工具调用、重试、图片生成还是后台 agent 行为。

3. **模型路由和策略过滤必须跨端一致**  
   同一账号、同一提示在 Web 可用但 Desktop 拒绝，会削弱用户对 Codex Desktop 的信任。需要更清晰的错误信息和策略诊断。

4. **Windows 是当前回归最集中的平台**  
   Windows 11、WSL2、AppX、SandboxService、node_repl、Chrome 集成等问题密集出现，建议 Windows 用户谨慎升级到 26.915.x，并保留可回退版本。

5. **长会话管理和 transcript 可用性正在快速改善**  
   官方 PR 明显聚焦 transcript 搜索、复制、分页、活动详情、顺序一致性。这对复杂代码任务、审计工具行为、回溯历史决策非常关键。

6. **agent 行为需要更强约束**  
   用户反馈包括自循环、非请求改动、过量工具调用、历史消息误用等。开发者希望 Codex 提供更好的任务边界、工具预算、确认机制和中止恢复能力。

---

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报  
**日期：2026-09-20**  
**仓库：google-gemini/gemini-cli**

---

## 1. 今日速览

过去 24 小时，Gemini CLI 发布了新的 nightly 版本 `v0.62.0-nightly.20260920.gcfbcaa8df`，并同步出现自动版本 bump PR。社区讨论重点集中在 **会话恢复逻辑、Gemini 3/3.1 模型选择行为、后台任务挂起、Telemetry JSON 序列化** 等核心稳定性问题上。

值得关注的是，多个高优先级 bug 已有对应修复 PR 提交，说明维护节奏较快；但 Windows 安装、Podman 沙箱、文件夹信任持久化等平台兼容性问题仍在持续暴露。

---

## 2. 版本发布

### v0.62.0-nightly.20260920.gcfbcaa8df

- 类型：Nightly Release
- 发布时间：2026-09-20
- Release 链接：  
  https://github.com/google-gemini/gemini-cli/releases/tag/v0.62.0-nightly.20260920.gcfbcaa8df
- Changelog：  
  https://github.com/google-gemini/gemini-cli/compare/v0.62.0-nightly.20260919.gcfbcaa8df...v0.62.0-nightly.20260920.gcfbcaa8df

本次为 nightly 自动发布，数据中未提供详细功能变更说明。结合当日 PR，主要可能包含版本号更新及近期核心修复的准备工作，例如会话恢复、模型 ID 保留、Telemetry 序列化等方向。

---

## 3. 社区热点 Issues

### 1. `--resume` 恢复了“最近创建”而非“最近活跃”的会话

- Issue：[#29410](https://github.com/google-gemini/gemini-cli/issues/29410)
- 状态：Open
- 标签：`priority/p2`, `area/core`, `kind/bug`
- 作者：soroush5
- 评论数：5

该问题指出，裸用 `gemini --resume` 时，CLI 会恢复最近创建的会话，而不是最近实际使用的会话。对于长期主会话加临时实验会话的工作流，这会导致后续对话被错误写入旧的临时会话。

重要性较高，因为它直接影响开发者日常使用中的上下文连续性和会话管理可靠性。该问题已有对应修复 PR [#29411](https://github.com/google-gemini/gemini-cli/pull/29411)，社区反馈较积极。

---

### 2. 后台任务因 IPC 管道泄漏和缺少 PID watchdog 导致永久 Running

- Issue：[#29405](https://github.com/google-gemini/gemini-cli/issues/29405)
- 状态：Open
- 标签：`priority/p2`, `area/agent`, `kind/bug`, `status/need-information`
- 作者：jyongchul

该问题描述 agent 工具通过 `run_command` / `manage_task` 异步执行后台任务时，任务可能永久停留在 `RUNNING` 状态，即使底层 OS 子进程已经失败或退出。

这属于 agent 执行可靠性问题，影响自动化任务、长时间运行命令和复杂工具链集成。当前需要更多信息，说明维护者可能仍在确认复现路径和根因。

---

### 3. 显式指定 `gemini-3-pro-preview` 被静默改写为 `gemini-3.1-pro-preview`

- Issue：[#29417](https://github.com/google-gemini/gemini-cli/issues/29417)
- 状态：Open
- 标签：`priority/p2`, `area/core`, `kind/bug`
- 作者：Pcmhacker-piro

用户通过 `--model gemini-3-pro-preview` 显式指定模型时，在 Gemini 3.1 rollout 开启后，CLI 会静默改写为 `gemini-3.1-pro-preview`。这违反了用户显式 pin 模型版本的预期。

该问题对可复现性、成本控制、quota 管理和评测一致性都很关键。已有修复 PR [#29420](https://github.com/google-gemini/gemini-cli/pull/29420)，方向是仅让 `auto` / `pro` 等别名参与 rollout，而保留用户明确指定的模型 ID。

---

### 4. Telemetry 文件输出中共享引用被误判为 `[Circular]`

- Issue：[#29406](https://github.com/google-gemini/gemini-cli/issues/29406)
- 状态：Open
- 标签：`priority/p2`, `area/enterprise`, `kind/bug`
- 作者：yupengtang

当设置 `GEMINI_TELEMETRY_TARGET=local` 和 `GEMINI_TELEMETRY_OUTFILE` 后，Telemetry 文件中大量 metric 字段如 `endTime`、histogram `boundaries` 被写成 `[Circular]`。

该问题主要影响企业环境中的可观测性、审计和离线分析。已有修复 PR [#29407](https://github.com/google-gemini/gemini-cli/pull/29407)，通过区分“真实循环引用”和“重复共享引用”来避免误序列化。

---

### 5. Windows 11 通过 winget 安装后 `gemini --help` 退出码为 5

- Issue：[#29416](https://github.com/google-gemini/gemini-cli/issues/29416)
- 状态：Closed
- 标签：`area/core`, `status/need-triage`
- 作者：Hmoute-Oussama

该问题报告在 Windows 11 上通过 `winget install Google.GeminiCLI` 安装后，运行 `gemini --help` 会输出帮助信息但退出码为 5。

虽然该 Issue 已关闭，但它指向 Windows 安装包或 CLI binary 行为不一致的问题。对于依赖退出码的脚本、CI 或健康检查而言，这类问题影响较大。

---

### 6. Windows 11 fresh install 后 `gemini --help` 退出码异常

- Issue：[#29415](https://github.com/google-gemini/gemini-cli/issues/29415)
- 状态：Closed
- 标签：`area/core`, `status/need-triage`
- 作者：Hmoute-Oussama

与 #29416 类似，该 Issue 同样聚焦 Windows 11 fresh install 后 `gemini --help` 返回 exit code 5 的问题，并明确提到上一版本工作正常。

该问题虽然关闭，但重复出现说明 Windows 发布/安装路径近期可能存在回归风险。建议维护者进一步合并重复报告并追踪 installer / CLI 包装层问题。

---

### 7. Windows 11 fresh install 后帮助命令异常的另一个重复报告

- Issue：[#29413](https://github.com/google-gemini/gemini-cli/issues/29413)
- 状态：Closed
- 标签：`area/core`, `status/need-triage`
- 作者：Hmoute-Oussama

该 Issue 再次报告 `gemini --help` 在 Windows 11 fresh install 后退出码为 5。虽然描述较简洁，但与 #29415、#29416 构成同一类平台兼容性信号。

其重要性在于说明 Windows 发行链路可能有较高噪音，需要明确是安装器问题、二进制入口问题，还是 help 命令自身的 exit code 处理问题。

---

### 8. Podman 沙箱内文件夹信任选择无法持久化

- Issue：[#29408](https://github.com/google-gemini/gemini-cli/issues/29408)
- 状态：Open
- 标签：`area/platform`, `status/need-triage`
- 作者：21vedansh

用户报告在 Podman sandbox 中运行 Gemini CLI 时，即使选择 Trust folder，信任状态也不会持久化到宿主机。每次从同一目录启动都会重复弹出信任提示。

该问题影响容器化开发、沙箱执行和安全信任模型体验。随着 AI CLI 越来越多地运行在隔离环境中，folder trust 与 host/container 状态同步会成为重要设计点。

---

### 9. Papers with Code evals 验证请求

- Issue：[#29409](https://github.com/google-gemini/gemini-cli/issues/29409)
- 状态：Open
- 标签：`area/unknown`, `status/need-triage`
- 作者：NielsRogge

该 Issue 来自 Hugging Face 开源团队成员，主要请求在 Papers with Code 上验证论文和评测结果。

这不是典型 bug，但涉及项目生态展示、研究引用和评测可见性。对 Gemini CLI 来说，其直接技术优先级可能不高，但有助于提升项目在开源/研究社区中的可发现性。

---

### 10. GeminiCLI.com 文档页面反馈

- Issue：[#29418](https://github.com/google-gemini/gemini-cli/issues/29418)
- 状态：Open
- 标签：`priority/p3`, `area/site`, `kind/question`
- 作者：masiotolokang-maker

该 Issue 针对 GeminiCLI.com 安装文档页面提出反馈，但描述较不清晰，包含“make videos”等模糊诉求。

虽然技术价值有限，但它反映出文档站点可能需要更明确的反馈模板、问题分类和社区引导机制。当前优先级较低，适合由 triage 进一步确认是否有效。

---

## 4. 重要 PR 进展

> 过去 24 小时内共有 4 个 PR 更新，未达到 10 个，因此以下列出全部重要 PR。

### 1. 修复显式 Gemini 3 Pro Preview 模型 ID 被覆盖的问题

- PR：[#29420](https://github.com/google-gemini/gemini-cli/pull/29420)
- 状态：Open
- 标签：`priority/p2`, `area/core`, `size/m`
- 作者：FanouZeng-TT
- 关联 Issue：[#29417](https://github.com/google-gemini/gemini-cli/issues/29417)

该 PR 修复用户显式指定 `--model gemini-3-pro-preview` 时被 Gemini 3.1 rollout 逻辑静默改写的问题。

核心思路是：  
- `auto` / `pro` 等别名可以跟随 rollout；
- 用户明确指定的完整模型 ID 应保持不变。

这对模型版本可控性、实验复现和企业环境配置稳定性非常重要。

---

### 2. Nightly 版本号自动更新

- PR：[#29419](https://github.com/google-gemini/gemini-cli/pull/29419)
- 状态：Open
- 标签：`size/s`, `status/need-issue`
- 作者：gemini-cli-robot

这是 nightly release 的自动版本 bump PR，将版本推进到 `0.62.0-nightly.20260920.gcfbcaa8df`。

该 PR 属于发布工程常规动作，主要服务于自动化构建和 nightly 版本分发。虽然功能影响有限，但对发布链路连续性很关键。

---

### 3. 修复 `--resume` 选择最近活跃会话的逻辑

- PR：[#29411](https://github.com/google-gemini/gemini-cli/pull/29411)
- 状态：Open
- 标签：`priority/p2`, `area/core`, `size/m`
- 作者：soroush5
- 关联 Issue：[#29410](https://github.com/google-gemini/gemini-cli/issues/29410)

该 PR 将裸 `--resume` 的会话选择逻辑从“最近开始的会话”改为“最近活跃的会话”。

修复后，长期主会话不会再被较新但已不活跃的临时会话覆盖。作者还补充了测试，确认新测试在修复前失败、修复后通过。

这是一个直接改善日常开发体验的核心修复。

---

### 4. 修复 Telemetry JSON 序列化中的共享引用处理

- PR：[#29407](https://github.com/google-gemini/gemini-cli/pull/29407)
- 状态：Open
- 标签：`priority/p2`, `area/enterprise`, `size/m`
- 作者：Oscar-Williams
- 关联 Issue：[#29406](https://github.com/google-gemini/gemini-cli/issues/29406)

该 PR 修复 Telemetry 文件输出时共享引用被误判为循环引用的问题。

主要变更包括：  
- 使用“当前递归路径”的 ancestor tracking 替代全局 `WeakSet`；
- 仅对真实循环引用输出 `[Circular]`；
- 保留重复 OpenTelemetry 数组的真实值。

该修复对企业用户尤其重要，因为 Telemetry 文件常用于监控、调试、审计和离线分析。

---

## 5. 功能需求趋势

### 1. 会话管理与上下文连续性

代表 Issue / PR：  
- [#29410](https://github.com/google-gemini/gemini-cli/issues/29410)  
- [#29411](https://github.com/google-gemini/gemini-cli/pull/29411)

社区希望 Gemini CLI 在多会话场景下能更准确地理解“最近会话”的含义。对于开发者而言，AI CLI 已经不只是一次性命令工具，而是带有长期上下文的工作台，因此会话恢复逻辑的准确性越来越重要。

---

### 2. 新模型支持与显式模型版本控制

代表 Issue / PR：  
- [#29417](https://github.com/google-gemini/gemini-cli/issues/29417)  
- [#29420](https://github.com/google-gemini/gemini-cli/pull/29420)

Gemini 3 / 3.1 rollout 暴露出一个重要需求：自动升级和显式 pin 版本之间必须有清晰边界。开发者希望默认别名可以自动跟进新模型，但明确指定的模型版本不应被静默替换。

这类需求对评测、兼容性测试、企业成本控制和输出稳定性都非常关键。

---

### 3. Agent 后台任务执行可靠性

代表 Issue：  
- [#29405](https://github.com/google-gemini/gemini-cli/issues/29405)

后台任务进入“Forever Running”说明 agent 执行模型在进程生命周期管理上仍有改进空间。社区关注点包括：

- 子进程退出检测；
- IPC 管道清理；
- PID watchdog；
- 任务状态回收；
- 异常任务的可观测性。

随着 CLI agent 承担更多自动化开发任务，该方向会持续升温。

---

### 4. 企业级可观测性与 Telemetry 质量

代表 Issue / PR：  
- [#29406](https://github.com/google-gemini/gemini-cli/issues/29406)  
- [#29407](https://github.com/google-gemini/gemini-cli/pull/29407)

企业用户对本地 Telemetry 输出质量有明确需求。JSON 序列化错误会直接影响监控、报表和审计可信度。

未来可能会看到更多围绕以下方向的需求：

- OpenTelemetry 兼容性；
- 本地日志格式稳定性；
- 指标字段 schema 固定；
- 更好的调试导出能力。

---

### 5. 平台兼容性与安装体验

代表 Issues：  
- [#29413](https://github.com/google-gemini/gemini-cli/issues/29413)  
- [#29415](https://github.com/google-gemini/gemini-cli/issues/29415)  
- [#29416](https://github.com/google-gemini/gemini-cli/issues/29416)  
- [#29408](https://github.com/google-gemini/gemini-cli/issues/29408)

Windows winget 安装和 Podman sandbox 场景都出现了兼容性问题。社区关注点主要包括：

- 安装后基础命令可用性；
- exit code 一致性；
- 容器/沙箱内的配置持久化；
- host 与 sandbox 之间的信任状态同步。

这表明 Gemini CLI 的使用场景正在从本地单机扩展到多平台、容器化和受控企业环境。

---

### 6. 文档与社区生态呈现

代表 Issues：  
- [#29418](https://github.com/google-gemini/gemini-cli/issues/29418)  
- [#29409](https://github.com/google-gemini/gemini-cli/issues/29409)

文档站点反馈和 Papers with Code 验证请求说明，项目不仅需要核心功能，也需要更成熟的社区入口、文档体验和外部生态展示。

---

## 6. 开发者关注点

### 1. “显式配置不应被静默覆盖”

模型 ID 被自动 rewrite 是今日最明显的开发者痛点之一。开发者愿意接受默认行为随 rollout 更新，但不能接受明确传入的参数被无提示替换。

相关链接：  
- [#29417](https://github.com/google-gemini/gemini-cli/issues/29417)  
- [#29420](https://github.com/google-gemini/gemini-cli/pull/29420)

---

### 2. 长期会话需要更可靠的恢复机制

`--resume` 问题说明开发者正在将 Gemini CLI 用于持续性任务和长期上下文管理。会话选择逻辑需要符合用户心智模型，即“最近活跃”优先于“最近创建”。

相关链接：  
- [#29410](https://github.com/google-gemini/gemini-cli/issues/29410)  
- [#29411](https://github.com/google-gemini/gemini-cli/pull/29411)

---

### 3. Agent 后台任务需要更强的进程生命周期治理

后台任务永久 Running 会造成用户无法判断任务真实状态，也可能导致资源泄漏或自动化流程阻塞。开发者需要更明确的任务失败、超时和回收机制。

相关链接：  
- [#29405](https://github.com/google-gemini/gemini-cli/issues/29405)

---

### 4. 企业用户重视日志和 Telemetry 的结构化正确性

Telemetry 中出现 `[Circular]` 会破坏数据可用性。企业用户不仅需要功能可用，还需要输出格式稳定、可机器解析、可用于审计和监控。

相关链接：  
- [#29406](https://github.com/google-gemini/gemini-cli/issues/29406)  
- [#29407](https://github.com/google-gemini/gemini-cli/pull/29407)

---

### 5. Windows 与容器化环境仍是兼容性重点

Windows winget 安装后的异常退出码，以及 Podman sandbox 中 folder trust 无法持久化，说明跨平台一致性仍需加强。

相关链接：  
- [#29413](https://github.com/google-gemini/gemini-cli/issues/29413)  
- [#29415](https://github.com/google-gemini/gemini-cli/issues/29415)  
- [#29416](https://github.com/google-gemini/gemini-cli/issues/29416)  
- [#29408](https://github.com/google-gemini/gemini-cli/issues/29408)

---

## 总结

今日 Gemini CLI 社区的主线是 **核心稳定性修复与模型版本控制语义收敛**。`--resume`、模型 ID 保留、Telemetry 序列化等问题都有对应 PR 推进，显示维护响应较快。

接下来值得持续关注的方向包括：Gemini 3.1 rollout 对模型选择逻辑的影响、agent 后台任务的进程治理、Windows 安装链路，以及容器化环境下的信任与配置持久化。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报  
**日期：2026-09-20**  
**仓库：github.com/github/copilot-cli**

## 1. 今日速览

过去 24 小时内，GitHub Copilot CLI 没有新版本发布，也没有新的 Pull Request 更新，但社区新增 / 更新了 7 个 Issue，主要集中在 **终端兼容性、MCP 工具调用稳定性、模型请求格式、IDE 集成与错误处理** 等方面。  
其中，Ghostty 终端相关问题连续出现，既有视口偏移，也有 macOS 下终端崩溃，显示 Copilot CLI 在不同终端环境中的兼容性仍是开发者关注重点。

---

## 2. 社区热点 Issues

> 过去 24 小时共 7 条 Issue 更新；以下为全部值得关注的问题。

### 1. Non-interactive MCP tool call hangs after progress notification until idle timeout  
- **Issue**：[#4910](https://github.com/github/copilot-cli/issues/4910)  
- **状态**：OPEN / triage  
- **作者**：niteshj11  
- **评论**：3  
- **重要性**：高  
- **概要**：非交互式 Copilot CLI 中，已发现的 Azure MCP 工具调用在发送初始 progress notification 后卡住，未返回 tool result，约 5 分钟后 WebSocket 因 `idle timeout` 关闭。相同工具和 payload 在其他场景下可立即成功。  
- **为什么重要**：MCP 是 Copilot CLI 扩展外部工具能力的关键通道。非交互模式通常用于脚本、CI/CD 或自动化任务，若工具调用卡死，会直接影响自动化可靠性。  
- **社区反应**：目前评论数为 3，是今日讨论度最高的问题，说明已有进一步排查或复现信息交流。

---

### 2. Text selection shifts the viewport on Linux; footer reads obsolete copy_on_select  
- **Issue**：[#4913](https://github.com/github/copilot-cli/issues/4913)  
- **状态**：OPEN / triage  
- **作者**：michael3lyb  
- **评论**：1  
- **重要性**：中高  
- **概要**：在 macOS 上通过 Ghostty + SSH + tmux 查看 Linux 会话时，普通鼠标文本选择会导致 transcript 和 composer 发生一行视口偏移。双击选词可能选中相邻行。此外 footer 仍显示过时的 `copy_on_select` 文案。  
- **为什么重要**：终端 UI 的稳定性直接影响 CLI 工具的可用性，尤其是在远程开发、tmux 和现代终端组合下。该问题也暴露出文案与配置状态可能不同步。  
- **社区反应**：已有 1 条评论，问题描述较细，具备复现环境，有助于定位 TUI 渲染或鼠标事件处理问题。

---

### 3. Copilot CLI 1.0.86 reliably crashes Ghostty 1.3.1 on macOS; Terminal.app unaffected  
- **Issue**：[#4915](https://github.com/github/copilot-cli/issues/4915)  
- **状态**：OPEN / triage  
- **作者**：anthonyproctor  
- **评论**：0  
- **重要性**：高  
- **概要**：Copilot CLI 1.0.86 在 macOS 的 Ghostty 1.3.1 中运行时，会在数秒内稳定导致 Ghostty 崩溃，五次尝试均复现，并影响所有 tab 和子进程；同一命令在 Terminal.app 中运行正常。Copilot 日志中未见 panic 或 OOM。  
- **为什么重要**：这是严重的终端兼容性问题。虽然崩溃发生在终端侧，但 Copilot CLI 可能触发了某类控制序列、渲染行为或 I/O 模式边界条件。  
- **社区反应**：暂无评论，但复现率高且影响面大，值得优先关注。

---

### 4. Gemini continuation and /compact fail with "Tool name is required" on mixed-model history  
- **Issue**：[#4914](https://github.com/github/copilot-cli/issues/4914)  
- **状态**：OPEN / triage  
- **作者**：michael3lyb  
- **评论**：0  
- **重要性**：高  
- **概要**：在长时间运行、混合模型历史的 Copilot CLI 会话中，使用 Gemini 继续对话或执行 `/compact` 时失败，返回：`400 Tool name is required for Gemini requests`，错误码为 `invalid_tool_call_format`。  
- **为什么重要**：混合模型会话和上下文压缩是长会话工作流的重要能力。该问题表明不同模型供应商对 tool call 格式要求不一致，历史消息转换或压缩流程可能存在兼容性缺陷。  
- **社区反应**：暂无评论，但对多模型用户和长会话用户影响明显。

---

### 5. GPT-6 Astra: HTTP 422 cyber-risk rejection during local heap-OOM debugging  
- **Issue**：[#4912](https://github.com/github/copilot-cli/issues/4912)  
- **状态**：OPEN / triage  
- **作者**：kondv  
- **评论**：0  
- **重要性**：中高  
- **概要**：在 Windows 11 x64、Copilot CLI `1.0.84-5`、模型 `gpt-6-astra` 下，用户调试 Copilot CLI 自身 JavaScript heap OOM 时，请求被 HTTP 422 拒绝，并提示需要加入 Trusted Access for Cyber。用户表示任务是本地崩溃调试，而非网络安全任务。  
- **为什么重要**：这涉及模型侧安全策略的误判问题。若本地调试、崩溃分析、内存排查被错误归类为 cyber-risk，会显著影响开发者排障体验。  
- **社区反应**：暂无评论，但该问题可能反映新模型策略与开发工具场景之间的适配不足。

---

### 6. Background sub-agent stream failures end the turn without a failure status  
- **Issue**：[#4911](https://github.com/github/copilot-cli/issues/4911)  
- **状态**：OPEN / triage  
- **作者**：kondv  
- **评论**：0  
- **重要性**：高  
- **概要**：当模型流式响应提前结束时，CLI 会显示 5 次重试和约 5-6 秒总重试等待，但最终没有明确失败状态，导致当前 turn 直接结束。该问题在 `gpt-6-astra` 和 Anthropic 模型上均观察到，涉及版本包括 `1.0.84-5`、`1.0.81-0`、`1.0.79-9`。  
- **为什么重要**：背景 sub-agent 是复杂任务拆解和异步执行的基础能力。流失败后缺少明确状态，会让用户难以判断任务是否完成、失败还是被静默丢弃。  
- **社区反应**：暂无评论，但该问题跨模型、跨版本出现，说明可能是 CLI 层通用错误处理缺陷。

---

### 7. /ide finds no workspaces under the CLI sandbox: kill(pid,0) EPERM misread as a dead process  
- **Issue**：[#4909](https://github.com/github/copilot-cli/issues/4909)  
- **状态**：OPEN / triage  
- **作者**：sysid  
- **评论**：0  
- **重要性**：高  
- **概要**：当 Copilot CLI 启用自身 sandbox 后，`/ide` 总是提示 “No active IDE workspaces found.” 即使兼容 IDE 正在运行、lock file 有效，且 IDE 的 MCP socket 在 sandbox 内可访问。问题原因可能是 `kill(pid,0)` 返回 `EPERM` 时被误判为进程不存在。  
- **为什么重要**：IDE 集成是 Copilot CLI 连接真实开发上下文的重要入口。sandbox 环境下误判 IDE 进程状态，会导致工作区发现失败，影响 MCP 与 IDE 协作能力。  
- **社区反应**：暂无评论，但问题定位较明确，可能具备较高修复可行性。

---

## 3. 重要 PR 进展

过去 24 小时内没有 Pull Request 更新。  
因此今日没有可跟踪的功能合入、修复合入或代码审查进展。

---

## 4. 功能需求趋势

### 1. MCP 与工具调用稳定性  
相关 Issue：[#4910](https://github.com/github/copilot-cli/issues/4910)、[#4909](https://github.com/github/copilot-cli/issues/4909)  
社区关注点集中在 MCP 工具调用和 IDE/MCP socket 发现能力上。非交互式 MCP 工具调用卡死，以及 sandbox 下 IDE workspace 无法发现，都说明 MCP 通道在自动化和隔离环境中仍需要更强的状态管理与错误诊断。

### 2. 终端兼容性与 TUI 渲染  
相关 Issue：[#4913](https://github.com/github/copilot-cli/issues/4913)、[#4915](https://github.com/github/copilot-cli/issues/4915)  
Ghostty 相关问题今日出现两起：一是文本选择导致视口偏移，二是 Copilot CLI 触发 Ghostty 在 macOS 下稳定崩溃。现代终端、SSH、tmux、多标签环境下的控制序列兼容性，正在成为 Copilot CLI TUI 的关键质量点。

### 3. 多模型与长会话兼容性  
相关 Issue：[#4914](https://github.com/github/copilot-cli/issues/4914)、[#4911](https://github.com/github/copilot-cli/issues/4911)  
混合模型历史、Gemini tool call 格式、`/compact` 上下文压缩、背景 sub-agent 流式失败等问题表明，不同模型后端在消息格式、工具调用协议、错误返回语义上仍存在适配挑战。

### 4. 错误处理与可观测性  
相关 Issue：[#4911](https://github.com/github/copilot-cli/issues/4911)、[#4912](https://github.com/github/copilot-cli/issues/4912)、[#4910](https://github.com/github/copilot-cli/issues/4910)  
多个问题都体现出错误反馈不足：工具调用卡到 idle timeout、sub-agent 流失败没有最终失败状态、模型请求被安全策略拒绝但场景解释不充分。开发者需要更清晰的错误边界、失败状态和诊断信息。

### 5. Sandbox 与权限模型  
相关 Issue：[#4909](https://github.com/github/copilot-cli/issues/4909)  
sandbox 下进程探测返回 `EPERM` 被误判为 dead process，说明 CLI 在受限权限环境中的系统调用解释仍需完善。随着安全隔离默认化，权限边界内的 IDE 和工具发现能力会越来越重要。

---

## 5. 开发者关注点

1. **非交互模式的可靠性不足**  
   - 代表问题：[#4910](https://github.com/github/copilot-cli/issues/4910)  
   - 开发者希望 Copilot CLI 能稳定用于脚本化、CI/CD 和自动化任务，而不是在工具调用中静默等待到超时。

2. **终端环境差异带来的稳定性风险**  
   - 代表问题：[#4913](https://github.com/github/copilot-cli/issues/4913)、[#4915](https://github.com/github/copilot-cli/issues/4915)  
   - Ghostty、tmux、SSH、macOS/Linux 混合环境暴露出 TUI 对终端行为依赖较强，用户期望更稳健的渲染和输入处理。

3. **模型切换和混合历史场景不够平滑**  
   - 代表问题：[#4914](https://github.com/github/copilot-cli/issues/4914)  
   - 长会话中切换模型、压缩上下文、继续历史对话时，工具调用格式需要跨模型兼容，否则会阻断持续工作流。

4. **失败状态不明确，排障成本高**  
   - 代表问题：[#4911](https://github.com/github/copilot-cli/issues/4911)  
   - 用户需要明确知道 background sub-agent 是失败、取消、重试耗尽还是部分完成，而不是 turn 直接结束。

5. **安全策略误判影响常规开发调试**  
   - 代表问题：[#4912](https://github.com/github/copilot-cli/issues/4912)  
   - 本地 OOM、崩溃和内存调试不应被误归类为 cyber-risk。开发工具场景需要更细粒度的安全策略识别。

6. **IDE 集成在 sandbox 下仍有边界问题**  
   - 代表问题：[#4909](https://github.com/github/copilot-cli/issues/4909)  
   - 开发者希望即便启用 sandbox，CLI 仍能正确发现 IDE workspace、读取 lock file，并连接 MCP socket。

---

## 总结

今日 Copilot CLI 社区没有发布和 PR 更新，主要动态来自 Issue 反馈。整体来看，开发者最关心的是 **MCP 稳定性、终端兼容性、多模型会话一致性、错误可观测性以及 sandbox 下的 IDE 集成**。这些问题多数处于 triage 阶段，后续是否会形成集中修复，值得持续跟踪。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报｜2026-09-20

## 1. 今日速览

过去 24 小时 OpenCode 社区的关注点高度集中在 **Go 订阅 / Free Tier 配额异常、V2 迁移兼容性、长会话性能与稳定性** 上。Issue 数量活跃，但多数仍处于开放状态，社区反馈呈现出“付费能力不可用”“免费额度重置异常”“V2 升级破坏既有工作流”的集中投诉。

PR 侧则以 **CLI / TUI 稳定性修复、V2 兼容性、插件隔离、服务重启可靠性、Windows 兼容性** 为主，说明维护者和贡献者正在快速响应近期由 V2、订阅体系和运行时差异引发的问题。

---

## 2. 社区热点 Issues

### 1. Go 订阅付款成功但未到账  
[#50054](https://github.com/anomalyco/opencode/issues/50054)  
用户通过 Stripe / UPI 支付 OpenCode Go 订阅后被扣款，但未获得订阅或收据，并请求退款。  
**重要性**：涉及付费链路和信任问题，是商业化产品的高优先级问题。  
**社区反应**：该 Issue 在过去 24 小时内评论数最高之一，说明订阅异常正在引发用户关注。

---

### 2. Custom Agents 使用 Free Tier 报错  
[#50081](https://github.com/anomalyco/opencode/issues/50081)  
用户在 OpenCode 内使用自定义 agent 配置时，触发错误：`OpenCode's free tier can only be used from within OpenCode`。  
**重要性**：直接影响自定义 agent 场景，说明 Free Tier 的调用路径校验可能与插件 / agent 配置存在冲突。  
**社区反应**：已有评论跟进，属于 Free Tier 使用边界问题中的典型案例。

---

### 3. Free usage exceeded，要求订阅 Go  
[#50079](https://github.com/anomalyco/opencode/issues/50079)  
用户反馈 OpenCode 不可用，界面提示免费额度已用尽并要求订阅 Go。  
**重要性**：与多条 Free Tier / Go 订阅 Issue 形成聚集，可能不是单个用户问题，而是额度系统或服务端状态异常。  
**社区反应**：有用户跟进，且同类问题在当天集中出现。

---

### 4. 软件打开后不显示模型  
[#50070](https://github.com/anomalyco/opencode/issues/50070)  
用户反馈打开 OpenCode 后始终不显示模型。  
**重要性**：模型列表不可用会阻断核心使用路径，可能与账号状态、Console、Provider 或 V2 模型发现机制相关。  
**社区反应**：虽描述简短，但与多条“无模型 / Go 不可用 / Console 异常”问题高度相关。

---

### 5. 长会话约 50 轮后启动和压缩性能严重下降  
[#50065](https://github.com/anomalyco/opencode/issues/50065)  
用户反馈会话约 50 轮后，resume、bootstrap、compaction 延迟显著增加，并呈超线性恶化。  
**重要性**：长上下文和多轮 agent 工作流是 OpenCode 的核心场景，性能退化会影响真实项目使用。  
**社区反应**：该 Issue 已关闭，说明可能已有处理、重复归并或维护者已作出判断，但它与后续更严重的 session JSON / heap 问题趋势一致。

---

### 6. 切换自定义主 agent 后 prompt cache 失效  
[#50055](https://github.com/anomalyco/opencode/issues/50055)  
用户发现从 `plan` 切换到禁止 `execute` / `subagent` 的自定义 `ask` agent 后，下一轮请求重新发送完整上下文，缓存命中为 0。  
**重要性**：Prompt cache 失效会显著增加延迟和成本，尤其影响长会话和高 token 项目。  
**社区反应**：已有评论，且相关 PR 中也出现了工具可用性变更公告机制，说明该方向正在被修复。

---

### 7. Desktop 输出内部参数 / 工具文本并卡在 Thinking  
[#50049](https://github.com/anomalyco/opencode/issues/50049)  
Desktop 聊天中出现 `parameterparameter...`、XML-like 工具参数等内部文本，随后卡在 Thinking。  
**重要性**：说明模型输出解析、工具调用流或 UI 渲染状态机可能存在异常，属于高影响体验问题。  
**社区反应**：已有评论，表明不是简单展示问题，而可能影响会话可恢复性。

---

### 8. VS Code 扩展与 CLI 2.0.10 不兼容  
[#50043](https://github.com/anomalyco/opencode/issues/50043)  
VS Code 扩展 `sst-dev.opencode-v2` 无法打开面板，提示 server 启动超时，疑似 stdout marker 与 server auth 不匹配。  
**重要性**：IDE 集成是开发者入口之一，扩展与 CLI 版本错配会直接破坏工作流。  
**社区反应**：已有对应修复 PR [#50047](https://github.com/anomalyco/opencode/pull/50047)，说明问题已进入处理阶段。

---

### 9. Windows 下 npm / npx 被 Notepad 打开  
[#50040](https://github.com/anomalyco/opencode/issues/50040)  
在 Windows + nvm 环境中，OpenCode 调用 `npm` 或 `npx` 时打开 `npm.ps1` 到 Notepad，而不是执行命令。  
**重要性**：影响 Windows 开发者的命令执行能力，TUI 和 WebChat 都受影响。  
**社区反应**：已有对应修复 PR [#50050](https://github.com/anomalyco/opencode/pull/50050)，属于快速响应问题。

---

### 10. MCP OAuth issuer 尾部斜杠导致连接失败  
[#50036](https://github.com/anomalyco/opencode/issues/50036)  
Remote MCP server 的 authorization server issuer 带尾部 `/` 时，在 2.0.4+ 被判定 issuer mismatch。  
**重要性**：影响 MCP OAuth 兼容性，尤其是 JumpCloud 等标准 OAuth 元数据场景。  
**社区反应**：已有对应修复 PR [#50046](https://github.com/anomalyco/opencode/pull/50046)，说明维护者倾向于兼容尾部斜杠差异。

---

## 3. 重要 PR 进展

### 1. 服务重启失败时 fail closed  
[#50075](https://github.com/anomalyco/opencode/pull/50075)  
修复 `service restart` 在无法停止旧服务时仍尝试启动新服务的问题。  
**价值**：避免端口复用、旧进程残留和新服务错误连接到旧实例，提升 CLI 服务管理可靠性。

---

### 2. Session 层 drain 失败分类与 skill 权限检查  
[#50071](https://github.com/anomalyco/opencode/pull/50071)  
修复 terminal drain 失败被误判的问题，并检查 `@mention` skill 权限。  
**价值**：增强 session 执行错误可见性，避免真实失败被吞掉，同时提高 skill 调用安全性。

---

### 3. TUI 默认 variant 重复显示修复  
[#50069](https://github.com/anomalyco/opencode/pull/50069)  
当 provider 本身也提供 `default` variant 时，TUI 菜单会出现重复 Default 项，该 PR 修复此问题。  
**价值**：改善模型 / provider 选择体验，减少配置歧义。

---

### 4. 非交互式运行模式加固  
[#50068](https://github.com/anomalyco/opencode/pull/50068)  
增强 `opencode run` 的退出状态判断、默认 web search provider 选择，以及非交互场景下权限 / 表单阻塞处理。  
**价值**：对 CI、自动化脚本、批处理 agent 场景非常重要，可减少无人值守任务卡死。

---

### 5. 核心层公告顶层工具可用性变化  
[#50067](https://github.com/anomalyco/opencode/pull/50067)  
跟踪模型可见的直接工具名称，并在后续请求中只公告新增或移除的工具。  
**价值**：有助于减少上下文污染，改善工具可用性变化时的 prompt 行为；也与 prompt cache 失效问题相关。

---

### 6. Azure 资源发现与校验  
[#50053](https://github.com/anomalyco/opencode/pull/50053)  
新增后台发现 Azure resources / deployments 的能力，并在保存 API key 或 Azure CLI 连接前校验访问权限。  
**价值**：提升 Azure 模型接入体验，减少用户配置错误，并提供更明确的错误反馈。

---

### 7. `opencode -s` 打开 V2 session selector  
[#50052](https://github.com/anomalyco/opencode/pull/50052)  
在未提供 session ID 时，`opencode -s` 可直接打开 TUI `/sessions` 列表。  
**价值**：改善 V2 会话入口体验，尤其适合多会话开发者。

---

### 8. Windows 下优先使用 `.cmd` 而非 nvm `.ps1` shim  
[#50050](https://github.com/anomalyco/opencode/pull/50050)  
修复 Windows 环境中 `npm.ps1` / `npx.ps1` 被当作文档打开的问题，改为优先解析 `.cmd`。  
**价值**：直接解决 Windows 开发者无法执行 npm / npx 的高影响问题。对应 Issue：[#50040](https://github.com/anomalyco/opencode/issues/50040)。

---

### 9. TUI 插件 Slot 增加 ErrorBoundary  
[#50048](https://github.com/anomalyco/opencode/pull/50048)  
为插件 Slot 渲染增加 ErrorBoundary，避免第三方插件崩溃拖垮整个 TUI。  
**价值**：提升插件生态稳定性，隔离第三方插件风险。对应 Issue：[#50027](https://github.com/anomalyco/opencode/issues/50027)。

---

### 10. VS Code 扩展启动契约修复  
[#50047](https://github.com/anomalyco/opencode/pull/50047)  
让前台 `opencode serve` 输出 VS Code 扩展等待的 `opencode server listening` 标记，并调整认证行为。  
**价值**：修复 VS Code 扩展与 CLI 2.0.10 的兼容性问题。对应 Issue：[#50043](https://github.com/anomalyco/opencode/issues/50043)。

---

## 4. 功能需求趋势

### 1. 订阅、配额与账号状态透明化  
相关 Issue：  
- [#50054](https://github.com/anomalyco/opencode/issues/50054)  
- [#50079](https://github.com/anomalyco/opencode/issues/50079)  
- [#50091](https://github.com/anomalyco/opencode/issues/50091)  
- [#50093](https://github.com/anomalyco/opencode/issues/50093)  
- [#50085](https://github.com/anomalyco/opencode/issues/50085)  

用户希望更清晰地看到 Go 订阅状态、免费额度重置时间、用量统计、失败原因和支付状态。目前多条反馈显示，用户无法判断是额度耗尽、账号未同步、Console workspace 未加载，还是订阅未生效。

---

### 2. V2 迁移兼容性与回退能力  
相关 Issue：  
- [#50076](https://github.com/anomalyco/opencode/issues/50076)  
- [#50078](https://github.com/anomalyco/opencode/issues/50078)  
- [#50087](https://github.com/anomalyco/opencode/issues/50087)  
- [#50077](https://github.com/anomalyco/opencode/issues/50077)  

V2 带来了 Console、Dashboard、Provider、数据迁移等多方面变化，但社区反馈显示升级过程中缺少足够透明度和兼容保障。用户尤其关注：API key 是否继续可用、V1 数据是否可迁移、模型配置是否保持一致。

---

### 3. 长会话性能与存储优化  
相关 Issue：  
- [#50065](https://github.com/anomalyco/opencode/issues/50065)  
- [#50089](https://github.com/anomalyco/opencode/issues/50089)  
- [#50014](https://github.com/anomalyco/opencode/issues/50014)  

长会话 resume、compaction、export 和 diff 存储成为高频痛点。特别是 `summary.diffs[].patch` 导致单 session 数百 MB JSON、多 GB heap 峰值的问题，说明 OpenCode 需要更强的增量存储、懒加载和导出完整性保障。

---

### 4. IDE / 编辑器集成稳定性  
相关 Issue / PR：  
- [#50043](https://github.com/anomalyco/opencode/issues/50043)  
- [#50047](https://github.com/anomalyco/opencode/pull/50047)  

VS Code 扩展与 CLI 版本契约不一致的问题暴露了 IDE 集成对 server 启动协议、认证策略、stdout marker 的强依赖。后续可能需要更稳定的扩展协议或版本兼容矩阵。

---

### 5. 插件生态与错误隔离  
相关 Issue / PR：  
- [#50027](https://github.com/anomalyco/opencode/issues/50027)  
- [#50048](https://github.com/anomalyco/opencode/pull/50048)  
- [#50080](https://github.com/anomalyco/opencode/issues/50080)  

插件安装失败、插件渲染崩溃、错误信息为空等问题显示插件生态正在扩张，但错误隔离和诊断能力仍需加强。

---

### 6. TUI 可用性与交互增强  
相关 Issue / PR：  
- [#50088](https://github.com/anomalyco/opencode/issues/50088)  
- [#50082](https://github.com/anomalyco/opencode/issues/50082)  
- [#50086](https://github.com/anomalyco/opencode/issues/50086)  
- [#50074](https://github.com/anomalyco/opencode/pull/50074)  

用户提出了退出确认、toast 历史、垂直标签页新标签位置、标签栏隐藏等需求。这表明 TUI / Desktop 已进入更细粒度体验优化阶段。

---

## 5. 开发者关注点

1. **Free Tier / Go 订阅链路稳定性不足**  
   多个用户反馈订阅未到账、免费额度不重置、Go 订阅无法识别、Console 显示 Subscribe。账号状态同步与错误提示需要优先改进。

2. **V2 迁移带来的破坏性变化较多**  
   Dashboard v2、API key、Provider、Vertex AI Anthropic、OpenCode Go 模型发现、V1 数据迁移都出现反馈，开发者希望获得更明确的迁移说明和兼容承诺。

3. **长会话成本和性能问题正在放大**  
   Prompt cache 失效、session resume 变慢、diff JSON 过大、export 不完整，都指向同一个问题：OpenCode 对长上下文工作流的状态管理仍需优化。

4. **错误信息可诊断性不足**  
   插件安装出现空 `NpmInstallFailedError`、模型列表为空但无明确原因、Console workspace 加载失败但用户无法自查，说明日志和 UI 诊断能力有待增强。

5. **跨平台兼容性仍是现实痛点**  
   Windows nvm `.ps1` shim、NixOS 版本识别、VS Code 扩展启动协议、MCP OAuth issuer 校验，均说明 OpenCode 的运行环境矩阵越来越复杂。

6. **插件和 agent 自定义能力需要更强隔离与权限模型**  
   自定义 agent 触发 Free Tier 限制、插件崩溃导致 TUI 崩溃、skill mention 权限检查等反馈表明，OpenCode 需要在开放扩展能力的同时强化安全边界和失败隔离。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-09-20

## 1. 今日速览

过去 24 小时，Pi 发布了 **v0.86.0**，核心新增能力是 **Prompt cache warming**，用于在长时间工具调用或空闲期间维持高价值 prompt cache，降低重复上下文成本。  
社区反馈主要集中在 **自动压缩 / summarization 的取消链路、TUI 交互稳定性、SDK 嵌入副作用、工具超时机制、扩展 API 能力边界** 等开发者体验问题上。  
Issue 和 PR 大多已快速关闭，说明维护侧响应较快，但也暴露出 0.86.0 版本在压缩、扩展和运行时集成方面仍有若干回归与边界问题。

---

## 2. 版本发布

### v0.86.0

链接：[v0.86.0 Release](https://github.com/earendil-works/pi/releases/tag/v0.86.0)

#### 主要更新

- **Prompt cache warming**
  - 新增 prompt cache 保活能力。
  - 可在长时间 tool run 期间保持有价值的 prompt cache 存活。
  - 也可配置在 idle 状态下进行成本感知的刷新。
  - 对长上下文、多轮 agent 工作流、昂贵上下文预热场景较有价值。
  - 文档：[Cache Warming](https://github.com/earendil-works/pi/blob/v0.86.0/packages/coding-agent/docs/settings.md#cache-warming)

#### 观察

v0.86.0 的方向明显偏向 **降低长会话成本、提升 agent 连续运行稳定性**。不过今日多个 Issue 也显示，新版本在 compaction、extension、SDK 嵌入方面引入或暴露了一些兼容性问题。

---

## 3. 社区热点 Issues

> 今日共更新 16 个 Issue，以下挑选 10 个最值得关注的问题。整体社区反应以快速复现和修复为主，点赞数不高，但评论集中，说明多为维护者和高级用户发现的具体工程问题。

### 1. 自动压缩等待认证期间无法显示进度或取消

- Issue：[ #9777 Auto-compaction authentication wait has no progress or cancellation controller](https://github.com/earendil-works/pi/issues/9777)
- 状态：Closed
- 评论：4
- 重要性：
  - 自动 compaction 在等待 `_getSummarizationRequestAuth()` 时，没有发出 `compaction_start`，也没有创建 abort controller。
  - 用户执行取消操作时，`abortCompaction()` 无效，认证完成后仍会继续压缩。
  - 影响长会话中用户对 agent 行为的控制权。
- 社区反应：
  - 评论数较高，且已有对应 PR 修复，属于高优先级稳定性问题。

---

### 2. summarization / compaction 请求未触发 `before_provider_request`

- Issue：[ #9773 before_provider_request does not fire for summarization/compaction requests](https://github.com/earendil-works/pi/issues/9773)
- 状态：Closed
- 评论：4
- 重要性：
  - `before_provider_request` 被文档描述为 provider 请求前触发，可替换 payload。
  - 但 compaction / branch-summary 请求未触发该 hook。
  - 影响扩展、审计、请求改写、企业代理网关等场景。
- 社区反应：
  - 评论活跃，说明 extension API 的一致性是社区关注点。

---

### 3. compaction 与 pending input 之间仍存在取消缺口

- Issue：[ #9783 Cancellation gaps after de2de549b](https://github.com/earendil-works/pi/issues/9783)
- 状态：Closed
- 评论：3
- 重要性：
  - 修复部分 auth 问题后，between-turn compaction 与用户输入之间仍存在取消路径不一致。
  - Escape 在某些阶段只会调用 `abortCompaction()`，而不会停止整个 session。
  - 关系到 agent 在自动恢复、自动压缩、用户中断之间的状态机正确性。
- 社区反应：
  - 与 #9777、#9781、#9779 形成一组问题，说明 cancellation 设计正在被系统性梳理。

---

### 4. 0.86.0 压缩后工具列表退化，只剩部分中途更新的工具

- Issue：[ #9789 0.86.0: after compaction, request tools collapse to surviving mid-conversation tool updates](https://github.com/earendil-works/pi/issues/9789)
- 状态：Closed
- 评论：1
- 重要性：
  - 用户报告在 extension 执行 compaction 后，模型无法再调用 `read/edit/powershell` 等工具。
  - 只剩 task-management 类工具可用。
  - 这是 agent 可用性的核心问题，尤其影响扩展生态。
- 社区反应：
  - 虽评论不多，但属于严重回归类问题，值得关注 0.86.x 后续补丁。

---

### 5. SDK 导入后修改全局 undici dispatcher，破坏嵌入宿主 fetch 行为

- Issue：[ #9787 importing the SDK installs pi's nested undici as process-global dispatcher](https://github.com/earendil-works/pi/issues/9787)
- 状态：Closed
- 评论：1
- 重要性：
  - 在 Fastify 等宿主应用中 programmatic import Pi SDK 时，Pi 的 nested `undici` 被设置为 process-global dispatcher。
  - 可能破坏宿主原生 fetch 的 abort / streaming 行为。
  - 对将 Pi 作为库嵌入服务端应用的开发者影响较大。
- 社区反应：
  - 反映出 Pi 正在从 CLI 工具扩展到 SDK 嵌入场景，运行时副作用需更严格隔离。

---

### 6. find / grep 工具缺少超时机制，进程被杀后可能返回空成功

- Issue：[ #9770 find and grep tools have no timeout mechanism](https://github.com/earendil-works/pi/issues/9770)
- 状态：Closed
- 评论：2
- 重要性：
  - `find`、`grep` 不像 `bash` 有 per-call timeout。
  - 被外部 kill 后可能返回无错误的空结果，误导模型。
  - 对代码搜索、文件定位、自动修复任务的可靠性影响很大。
- 社区反应：
  - 工具执行可靠性是 agent 系统的基础能力，该问题虽小但影响面广。

---

### 7. bash timeout 参数单位混淆，可能导致超长执行时间

- Issue：[ #9785 bash timeout param: seconds-vs-ms confusion yields multi-hour ceilings](https://github.com/earendil-works/pi/issues/9785)
- 状态：Closed
- 评论：1
- 重要性：
  - `timeout` 参数以秒传入后乘以 1000，但上限为 `2_147_483_647` ms。
  - 单位语义不清，可能造成多小时级别的执行上限。
  - 缺少默认值或合理最大值会影响安全性与资源控制。
- 社区反应：
  - 与 #9770 一起表明社区正在集中关注 tool execution 的超时、失败语义和资源边界。

---

### 8. Extension API 缺少 provider-specific response fields 支持

- Issue：[ #9784 Missing support for provider-specific fields in responses in the Extension API](https://github.com/earendil-works/pi/issues/9784)
- 状态：Closed
- 评论：1
- 重要性：
  - 当前 `AssistantMessage` 抽象可能丢失 provider 自定义响应字段。
  - 扩展无法访问诸如推理信息、供应商特定 metadata、额外 token 字段等。
  - 对高级 provider 集成、观测、调试和自定义 UI 都有影响。
- 社区反应：
  - 这是 extension API 表达能力的问题，预计会持续出现类似诉求。

---

### 9. TUI 粘贴图片逻辑在 X11 下可能将文本剪贴板写成伪 PNG

- Issue：[ #9786 TUI paste writes clipboard text to fake .png](https://github.com/earendil-works/pi/issues/9786)
- 状态：Closed
- 评论：1
- 重要性：
  - 在 X11 环境下，`xclip -t image/png` 可能从不支持图片的 clipboard owner 中读到任意文本。
  - 导致 TUI 将文本误认为图片数据。
  - 涉及剪贴板 MIME 探测的鲁棒性。
- 社区反应：
  - 虽为平台特定问题，但对 Linux 桌面用户和多模态输入体验重要。

---

### 10. 文档称 package manifest 支持 glob / exclusion，但实现只解析字面路径

- Issue：[ #9788 docs/packages.md claims manifest supports globs and !exclusions](https://github.com/earendil-works/pi/issues/9788)
- 状态：Closed
- 评论：1
- 重要性：
  - 文档与实现不一致。
  - `resolveExtensionEntries` 实际只 resolve literal paths。
  - 会误导扩展包开发者，影响 package authoring 体验。
- 社区反应：
  - 表明 Pi package / extension 生态仍在完善阶段，文档准确性变得越来越重要。

---

## 4. 重要 PR 进展

> 过去 24 小时仅有 4 个 PR 更新，因此本节列出全部重要 PR，而非强行补足 10 个。

### 1. 修复 prompt 取消后仍进入 recovery / retry / auto-compaction

- PR：[ #9781 fix(coding-agent): stop recovery after prompt cancellation](https://github.com/earendil-works/pi/pull/9781)
- 状态：Closed
- 作者：tryingET
- 关联 Issue：[#9340](https://github.com/earendil-works/pi/issues/9340)
- 内容：
  - 修复在 assistant 失败后的 `message_end` 中调用 `AgentSession.abort()`，仍可能触发 retry 或 automatic compaction 的问题。
  - 明确取消 prompt 与取消 compaction 是两条不同路径。
- 价值：
  - 改善 agent 状态机一致性。
  - 减少用户取消后系统继续执行的反直觉行为。

---

### 2. 暴露可取消的 auto-compaction authentication 等待阶段

- PR：[ #9779 fix(coding-agent): expose cancellable auto-compaction auth](https://github.com/earendil-works/pi/pull/9779)
- 状态：Closed
- 作者：tryingET
- 关联 Issue：[#9777](https://github.com/earendil-works/pi/issues/9777)
- 内容：
  - 在自动压缩等待认证期间暴露可取消状态。
  - 解决 auth pending 阶段没有 compaction indicator、无 abort controller 的问题。
- 价值：
  - 直接提升长会话中 compaction 的可观测性和可控性。
  - 是今日最关键的稳定性修复之一。

---

### 3. 按 thinking level 配置采样参数

- PR：[ #9776 Per thinking sampling parameters](https://github.com/earendil-works/pi/pull/9776)
- 状态：Open
- 作者：mrexodia
- 内容：
  - 引入 `samplingParamsByThinkingLevel`。
  - 支持针对不同 thinking / non-thinking 模式配置不同 sampling 参数。
  - 可覆盖现有 `samplingParams`。
  - 作者还 cherry-pick 了 #9505 并修复相关问题。
- 价值：
  - 对 open models 尤其重要，因为不同模型常建议 thinking 与 non-thinking 使用不同 temperature、top_p 等参数。
  - 有助于提高模型输出质量和可控性。
- 观察：
  - 这是当前少数仍开放的功能型 PR，值得后续跟踪。

---

### 4. 修复 TUI 主屏 scrollback 清理 / replay 与 ConPTY 自动换行漂移

- PR：[ #9772 fix(tui): stop main-screen scrollback clear/replay and ConPTY autowrap drift](https://github.com/earendil-works/pi/pull/9772)
- 状态：Closed
- 作者：treatux
- 内容：
  - 修复 main-screen renderer 中的两个问题：
    1. 禁用渲染期间 autowrap，解决 Windows Terminal / pwsh / ConPTY 下的 eager wrap 问题。
    2. 调整 main-screen scrollback clear / replay 行为。
- 价值：
  - 提升 Windows 终端环境下 TUI 渲染稳定性。
  - 与今日多个 TUI 相关 Issue 共同表明终端兼容性仍是重点。

---

## 5. 功能需求趋势

### 1. Compaction / summarization 可控性增强

相关 Issue / PR：

- [#9777](https://github.com/earendil-works/pi/issues/9777)
- [#9773](https://github.com/earendil-works/pi/issues/9773)
- [#9783](https://github.com/earendil-works/pi/issues/9783)
- [#9789](https://github.com/earendil-works/pi/issues/9789)
- [#9779](https://github.com/earendil-works/pi/pull/9779)
- [#9781](https://github.com/earendil-works/pi/pull/9781)

趋势判断：

- 社区正在高度关注自动压缩的生命周期管理。
- 重点需求包括：
  - 可取消；
  - 有进度反馈；
  - hook 行为一致；
  - 不破坏工具列表；
  - 不在用户取消后继续执行。
- 这说明 Pi 的长上下文会话能力已进入深水区，自动 compaction 不只是优化功能，而是核心交互路径。

---

### 2. Extension API 与 provider 抽象能力

相关 Issue：

- [#9773](https://github.com/earendil-works/pi/issues/9773)
- [#9784](https://github.com/earendil-works/pi/issues/9784)
- [#9788](https://github.com/earendil-works/pi/issues/9788)
- [#9789](https://github.com/earendil-works/pi/issues/9789)

趋势判断：

- 扩展开发者希望 Pi 暴露更完整的 provider 请求 / 响应生命周期。
- 当前痛点集中在：
  - compaction 请求未触发标准 hook；
  - provider-specific response fields 丢失；
  - extension manifest 文档与实现不一致；
  - extension compaction 后工具可用性异常。
- 这反映出 Pi 的 extension 生态正在变复杂，单一抽象层可能不足以满足高级集成。

---

### 3. Tool execution 的超时、失败语义与资源边界

相关 Issue：

- [#9770](https://github.com/earendil-works/pi/issues/9770)
- [#9785](https://github.com/earendil-works/pi/issues/9785)

趋势判断：

- 开发者希望每个 tool 都有明确的 timeout、错误语义和资源上限。
- 当前关注点包括：
  - `find` / `grep` 缺少 timeout；
  - 进程被杀后不能返回“空成功”；
  - `bash` timeout 参数单位应清晰；
  - 应有默认值与 sane max。
- 对 coding agent 来说，工具结果是模型决策依据，错误语义不准确会直接导致模型误判。

---

### 4. TUI / 终端体验持续优化

相关 Issue / PR：

- [#9774](https://github.com/earendil-works/pi/issues/9774)
- [#9778](https://github.com/earendil-works/pi/issues/9778)
- [#9769](https://github.com/earendil-works/pi/issues/9769)
- [#9786](https://github.com/earendil-works/pi/issues/9786)
- [#9772](https://github.com/earendil-works/pi/pull/9772)

趋势判断：

- 社区对 TUI 细节体验要求很高。
- 需求覆盖：
  - 设备码登录显示 QR code；
  - 输入框鼠标定位；
  - 终端 resize 后及时重排；
  - 剪贴板图片探测；
  - Windows ConPTY 渲染兼容。
- Pi 作为终端优先的 agent 工具，TUI 稳定性和跨平台兼容性仍是核心竞争力。

---

### 5. 新模型和 thinking 参数支持

相关 Issue / PR：

- [#9771](https://github.com/earendil-works/pi/issues/9771)
- [#9776](https://github.com/earendil-works/pi/pull/9776)

趋势判断：

- 社区持续推动对新模型的快速适配。
- 特别是 open models 与多 thinking level 模式下，需要更细粒度的 sampling 参数管理。
- `samplingParamsByThinkingLevel` 代表 Pi 正在向更精细的模型运行策略演进。

---

### 6. SDK 嵌入与 headless / RPC 使用场景

相关 Issue：

- [#9787](https://github.com/earendil-works/pi/issues/9787)
- [#9768](https://github.com/earendil-works/pi/issues/9768)

趋势判断：

- 用户不再只把 Pi 当作 CLI 使用，而是通过 SDK、RPC、ACP adapter 等方式嵌入到更复杂系统中。
- 这要求 Pi：
  - 避免修改 process-global 状态；
  - 保证 RPC state 一致；
  - 明确 CLI 与 SDK 初始化边界；
  - 提供更强的 headless 可观测性。

---

## 6. 开发者关注点

### 1. “取消”必须真正停止后续自动行为

多个 Issue 和 PR 显示，用户最不能接受的是：已经按下 Escape 或调用 `abort()`，但系统仍继续 retry、recovery、auth wait 或 compaction。

代表链接：

- [#9777](https://github.com/earendil-works/pi/issues/9777)
- [#9783](https://github.com/earendil-works/pi/issues/9783)
- [#9781](https://github.com/earendil-works/pi/pull/9781)
- [#9779](https://github.com/earendil-works/pi/pull/9779)

---

### 2. 自动 compaction 正在成为稳定性关键路径

v0.86.0 引入 prompt cache warming 后，长会话体验进一步增强，但 compaction 相关问题也更突出。  
开发者需要 compaction 行为：

- 可见；
- 可取消；
- 不破坏 tool schema；
- 与 extension hook 一致；
- 不导致会话状态退化。

代表链接：

- [#9773](https://github.com/earendil-works/pi/issues/9773)
- [#9789](https://github.com/earendil-works/pi/issues/9789)

---

### 3. 工具执行结果必须可信

`find`、`grep`、`bash` 相关反馈说明，agent 工具层需要更严格的执行合约。  
开发者希望看到：

- 统一 timeout；
- 明确单位；
- 默认上限；
- 被 kill 时返回错误而不是空成功；
- 不让模型基于错误结果继续推理。

代表链接：

- [#9770](https://github.com/earendil-works/pi/issues/9770)
- [#9785](https://github.com/earendil-works/pi/issues/9785)

---

### 4. Extension API 需要更完整、更透明

扩展作者希望 Pi 不要过度压平 provider 能力。  
当前最常见诉求是：

- 请求 hook 覆盖所有 provider 调用；
- 响应中保留 provider-specific fields；
- 文档与实现一致；
- extension 不应影响核心工具可用性。

代表链接：

- [#9784](https://github.com/earendil-works/pi/issues/9784)
- [#9788](https://github.com/earendil-works/pi/issues/9788)

---

### 5. TUI 细节仍是高频反馈区

开发者对终端体验的要求已经从“能用”转向“稳定、跨平台、细节正确”。  
高频点包括：

- 登录流程便利性；
- 鼠标定位；
- resize 重排；
- clipboard MIME 判断；
- Windows ConPTY 渲染。

代表链接：

- [#9774](https://github.com/earendil-works/pi/issues/9774)
- [#9778](https://github.com/earendil-works/pi/issues/9778)
- [#9769](https://github.com/earendil-works/pi/issues/9769)
- [#9786](https://github.com/earendil-works/pi/issues/9786)
- [#9772](https://github.com/earendil-works/pi/pull/9772)

---

## 总结

今日 Pi 社区的主线是 **v0.86.0 发布后的长会话能力增强与稳定性修复并行推进**。Prompt cache warming 是重要的新能力，但社区反馈显示，围绕 compaction、cancellation、extension hook、tool timeout 和 SDK 嵌入隔离的工程细节仍需持续打磨。整体来看，Pi 正从终端 coding agent 向更可嵌入、更可扩展、更长会话友好的开发工具演进。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-09-20）

## 1. 今日速览

过去 24 小时，Qwen Code 发布了 **v0.24.1**、Desktop v0.24.1 与 TypeScript SDK v0.1.13，核心变化包括移除 `active_goal` 流事件、Web Shell / daemon 体验改进，以及多项 CLI、权限与会话相关修复。  
社区讨论重点集中在 **CI 稳定性、Web Shell 会话恢复、daemon 本地控制、安全权限边界、上下文与 token 管理、沙箱执行能力** 等方向。  
PR 侧活跃度很高，新增多项 Web Shell 交互改进、bwrap / Landlock 执行沙箱、会话历史重试、跨会话消息治理与本地 notes 压缩能力。

---

## 2. 版本发布

### v0.24.1  
链接：<https://github.com/QwenLM/qwen-code/releases/tag/v0.24.1>

本次正式版包含一个需要关注的破坏性变更：

- **Breaking Change**
  - `refactor(goal)!`: 停止发送 `active_goal` stream event  
    相关 PR：<https://github.com/QwenLM/qwen-code/pull/12181>

这意味着依赖 `active_goal` 事件的上层集成、客户端或自动化监听逻辑需要同步调整。

---

### v0.24.1-nightly.20260919.c1c00cbaab  
链接：<https://github.com/QwenLM/qwen-code/releases/tag/v0.24.1-nightly.20260919.c1c00cbaab>

Nightly 版本继续聚焦基础设施与核心稳定性，包括：

- CI Docker cache 回收与 review scratch 目录清理  
  PR：<https://github.com/QwenLM/qwen-code/pull/12135>
- core 层若干稳定性修复

---

### sdk-typescript-v0.1.13  
链接：<https://github.com/QwenLM/qwen-code/releases/tag/sdk-typescript-v0.1.13>

TypeScript SDK v0.1.13 捆绑 CLI 版本：

- Bundled CLI Version: `0.24.1`

对使用 SDK 集成 Qwen Code CLI 的开发者而言，应关注 CLI 0.24.1 的兼容性变化，尤其是 stream event 的调整。

---

### desktop-v0.24.1  
链接：<https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.24.1>

Desktop 版本同步升级至 0.24.1，主要变化包括：

- 修复 CLI 中 ACP permission queue 的 session 作用域问题  
  PR：<https://github.com/QwenLM/qwen-code/pull/11802>
- 增加 shared output modes
- Web Shell / daemon / Desktop 协同体验继续增强

---

## 3. 社区热点 Issues

### 1. Workflow retry-from-history 后续硬化拆分  
Issue：<https://github.com/QwenLM/qwen-code/issues/12287>

该 Issue 将 workflow 从历史记录重试相关的硬化工作从大型 PR 中拆分出来，涉及 runner resume 语义、checkpoint schema、daemon 边界等核心机制。  
重要性在于它影响后台自动化与工作流可恢复能力，是 Qwen Code 向更可靠自动化代理演进的关键部分。当前已有多轮讨论，说明维护者希望将复杂改动拆细审查，降低合并风险。

---

### 2. daemon Local Control 启用时端口冲突  
Issue：<https://github.com/QwenLM/qwen-code/issues/12277>

`qwen serve` 使用 `--port 0` 获取临时端口后，在启用 Local Control 时可能因 LAN interface 上端口占用导致 `EADDRINUSE`。  
该问题直接影响 Qwen Code Desktop 的 daemon 模式与局域网 Web Shell 访问，是桌面端和远程控制体验中的高优先级稳定性问题。

---

### 3. 安全权限：引用解析导致受保护路径写入绕过  
Issue：<https://github.com/QwenLM/qwen-code/issues/12246>

该问题描述了 compound shell command 中 `cd` 与 `;` / `&` 等操作符解析不一致时，权限系统可能将受保护写入解析到错误路径。  
这是 **P1 安全问题**，涉及 shell 权限边界和写入保护规则，优先级最高。相关修复 PR 已出现：<https://github.com/QwenLM/qwen-code/pull/12280>。

---

### 4. MCP inline media 依据声明 MIME 而非实际字节判断  
Issue：<https://github.com/QwenLM/qwen-code/issues/12290>

`boundInlineImageParts` 目前根据 MCP server 声明的 MIME label 判断是否接收与如何标记 inline media，而非根据实际 bytes 判断。  
该问题影响 MCP 工具链的安全性、鲁棒性和 media 处理准确性，尤其在第三方 MCP server 场景下容易产生边界绕过或错误标注。

---

### 5. agent 函数描述过长，占用大量 token  
Issue：<https://github.com/QwenLM/qwen-code/issues/12272>

社区反馈 `agent` function description 约 2000 tokens，且每轮都发送，造成 token budget 浪费。  
该问题代表用户对 **上下文成本控制** 的强烈关注，尤其在长会话、多工具调用和复杂代理场景中，prompt overhead 会直接影响模型有效上下文容量与成本。

---

### 6. Windows CI 因 bwrap 测试失败  
Issue：<https://github.com/QwenLM/qwen-code/issues/12270>

新引入的 bwrap execution suite 在 Windows 上运行并抛出 `Sandbox assets are missing`，导致 Windows nightly lane 持续失败。  
该问题反映出跨平台测试隔离不足，尤其是 Linux-specific sandbox 能力需要在 Windows 上明确跳过或替代。相关自动修复 PR：<https://github.com/QwenLM/qwen-code/pull/12282>。

---

### 7. standalone session 自动恢复走错 workspace endpoint  
Issue：<https://github.com/QwenLM/qwen-code/issues/12237>

0.24.0 中 standalone session 可通过 `/standalone/sessions/:id/load` 正常加载，但启动自动恢复与 delayed reload 会错误调用 workspace endpoint，导致 404。  
该问题直接影响 Web Shell session restore 体验，是会话管理路线上的重要稳定性缺陷。

---

### 8. Web Shell live-journal repair 可能丢失 prompt settlement  
Issue：<https://github.com/QwenLM/qwen-code/issues/12230>

该 Issue 指出 live-journal repair 成功后，可能永久丢失某个客户端未接收 prompt 的 settlement。  
这类问题影响 Web Shell 与 daemon 之间的会话一致性，尤其在断线恢复、多客户端或异步 prompt 场景中风险较高。

---

### 9. 增加跨 workspace session catalog API  
Issue：<https://github.com/QwenLM/qwen-code/issues/12249>

社区希望 daemon 提供一个 API，可一次性列出多个 workspace 的 session history，而不是逐 workspace 请求。  
这反映出用户正在将 Qwen Code 用作多项目、多工作区的长期任务管理工具，对 session catalog、SDK API 和 daemon 聚合能力有更高需求。

---

### 10. Web Shell 当前会话内搜索与跳转  
Issue：<https://github.com/QwenLM/qwen-code/issues/12231>

该功能请求希望在 Web Shell 当前 conversation 中增加搜索能力，并支持跳转到匹配消息。  
随着会话变长、工具调用增多，开发者需要更好的历史检索与导航能力。这与 session management、context recovery、trajectory view 等需求方向一致。

---

## 4. 重要 PR 进展

### 1. retry / rerun workflow runs from persisted history  
PR：<https://github.com/QwenLM/qwen-code/pull/12291>

该 PR 替代此前过大的 #12190，聚焦从持久化历史中重试和重新运行 workflow。  
它是后台自动化能力的重要增强，为失败恢复、断点续跑和历史任务复用提供基础。

---

### 2. 修复 shell 写入权限绕过  
PR：<https://github.com/QwenLM/qwen-code/pull/12280>

修复 `cd`、引号和异步操作符组合导致 Write deny rules 被绕过的问题。  
该 PR 对应 P1 安全 Issue #12246，是今日最重要的安全修复之一。

---

### 3. 将 runtime tools 路由到 bwrap  
PR：<https://github.com/QwenLM/qwen-code/pull/12269>

在 #12067 基础上增加 per-tool bwrap confinement 的 runtime integration layer。  
Shell、Monitor、Write、Edit 等工具将通过共享执行边界运行，强化工具级沙箱隔离能力。

---

### 4. 将 bwrap sandboxing 移至 tool execution  
PR：<https://github.com/QwenLM/qwen-code/pull/12267>

该 PR 暴露 `tools.executionSandbox` 策略，并将支持的 shell entrypoints 路由到共享 runtime execution boundary。  
它标志着沙箱能力从“整个 CLI 级别”向“单工具执行级别”演进，更适合细粒度权限控制。

---

### 5. 增加 Landlock execution fallback  
PR：<https://github.com/QwenLM/qwen-code/pull/12278>

新增 Landlock filesystem backend，允许在特定条件下作为 bwrap 的 fallback。  
这有助于提升 Linux 环境下的沙箱兼容性，也说明项目正在构建多 backend 的执行隔离架构。

---

### 6. 本地 notes compaction 与策略选择器  
PR：<https://github.com/QwenLM/qwen-code/pull/12276>

新增 opt-in 的 local notes compaction strategy，用户可在 `/settings` 或 `settings.json` 中选择 `summary` 或 `notes`。  
该能力服务于长任务跨上下文窗口持续推进，与 session history recovery、context performance 路线高度相关。

---

### 7. Web Shell 麦克风音量显示  
PR：<https://github.com/QwenLM/qwen-code/pull/12294>

在浏览器 Live Voice call 中显示 microphone level，让用户确认 daemon 是否能收到声音。  
这是 Web Shell 多模态交互体验的细节优化，有助于提升语音功能的可用性与可调试性。

---

### 8. 跨 session inbound message 按目标 session 设置判断  
PR：<https://github.com/QwenLM/qwen-code/pull/12292>

跨会话消息的 gate 现在会根据目标 session 的设置逐条判断，而不是读取进程级统一设置。  
该改动提升多 session 场景下的安全性与行为一致性，尤其对 daemon 长驻、多客户端连接场景重要。

---

### 9. 不持久化被拒绝 daemon URL credentials  
PR：<https://github.com/QwenLM/qwen-code/pull/12285>

修复 Web Shell 在 daemon override 被拒绝后，仍可能将 URL fragment credential 存储到 page origin storage key 的问题。  
这是一个凭据处理安全修复，降低错误目标凭据被持久化的风险。

---

### 10. 增加 Azerbaijani UI 语言支持  
PR：<https://github.com/QwenLM/qwen-code/pull/12284>

新增 `az` locale，包含 1874 条字符串，并注册到 CLI i18n 与 VS Code IDE Companion 设置 schema。  
该 PR 对应 Issue #12283，说明社区在本地化与国际化方面持续扩展。

---

## 5. 功能需求趋势

### 1. 会话管理与恢复能力持续升温

相关 Issue / PR：

- 跨 workspace session catalog：<https://github.com/QwenLM/qwen-code/issues/12249>
- Web Shell 会话内搜索：<https://github.com/QwenLM/qwen-code/issues/12231>
- standalone session restore 404：<https://github.com/QwenLM/qwen-code/issues/12237>
- live-journal repair settlement 丢失：<https://github.com/QwenLM/qwen-code/issues/12230>
- workflow retry from history：<https://github.com/QwenLM/qwen-code/pull/12291>

趋势判断：  
Qwen Code 用户正在从“单次对话式使用”转向“长期任务、可恢复 session、多 workspace 历史管理”。会话可靠性、历史检索、断点续跑将是接下来重要方向。

---

### 2. 上下文与 token 管理成为高频痛点

相关 Issue / PR：

- `agent` function description 过长：<https://github.com/QwenLM/qwen-code/issues/12272>
- local notes compaction：<https://github.com/QwenLM/qwen-code/issues/12257>
- notes compaction PR：<https://github.com/QwenLM/qwen-code/pull/12276>
- CJK context estimate 修复：<https://github.com/QwenLM/qwen-code/pull/12273>

趋势判断：  
用户开始关注每轮 prompt overhead、CJK token 估算准确性、长任务压缩策略等细节。未来可能需要更精细的 context accounting、工具描述按需注入、agent descriptor 压缩等优化。

---

### 3. Web Shell 正在成为核心交互界面

相关 Issue / PR：

- 当前会话内搜索：<https://github.com/QwenLM/qwen-code/issues/12231>
- Trajectory view：<https://github.com/QwenLM/qwen-code/issues/12293>
- microphone level：<https://github.com/QwenLM/qwen-code/pull/12294>
- composer toolbar 重排：<https://github.com/QwenLM/qwen-code/pull/12299>
- queued prompt binding recovery：<https://github.com/QwenLM/qwen-code/pull/12279>

趋势判断：  
Web Shell 不再只是辅助界面，而是在向完整任务控制台演进。用户需要更好的会话导航、执行轨迹、语音反馈、prompt 队列恢复和 UI 信息架构。

---

### 4. 沙箱与权限边界成为核心工程方向

相关 Issue / PR：

- shell permission bypass：<https://github.com/QwenLM/qwen-code/issues/12246>
- bwrap runtime integration：<https://github.com/QwenLM/qwen-code/pull/12269>
- tool execution sandbox：<https://github.com/QwenLM/qwen-code/pull/12267>
- Landlock fallback：<https://github.com/QwenLM/qwen-code/pull/12278>
- Windows bwrap test failure：<https://github.com/QwenLM/qwen-code/issues/12270>

趋势判断：  
随着 Qwen Code 更深入执行 shell、文件写入和工具调用，权限模型和执行沙箱正在成为基础设施级能力。当前重点是从 coarse-grained CLI sandbox 过渡到 per-tool sandbox。

---

### 5. CI / 测试基础设施压力明显

相关 Issue：

- Main CI failed on cc9bb988477f：<https://github.com/QwenLM/qwen-code/issues/12295>
- Main CI failed on e75b8e53b033：<https://github.com/QwenLM/qwen-code/issues/12296>
- Main CI failed on 8589f7133198：<https://github.com/QwenLM/qwen-code/issues/12289>
- artifact download flake：<https://github.com/QwenLM/qwen-code/issues/12274>
- review adapter pnpm 问题：<https://github.com/QwenLM/qwen-code/issues/12275>

趋势判断：  
CI flake、依赖安装失败、artifact 下载失败和平台差异问题频繁出现。项目规模扩大后，自动分类、机器可读错误记录和测试分层会越来越重要。

---

## 6. 开发者关注点

### 1. “稳定可恢复”的长任务体验

开发者反复反馈 Web Shell reload、daemon restore、workflow retry、session catalog 等场景中的一致性问题。  
这说明核心用户正在运行更长、更复杂的任务，单次失败或刷新不应导致状态丢失。

---

### 2. Token 预算浪费开始影响实际体验

`agent` 描述过长、context category 统计、CJK token 估算等问题说明用户对上下文窗口利用率非常敏感。  
未来需要减少固定 prompt 开销，并提升 `/context` 等诊断工具的可信度。

---

### 3. 安全边界需要适配真实 shell 语义

Issue #12246 显示，权限系统不能只处理简单命令，还需要正确理解引用、compound command、background operator 和路径解析。  
对 AI coding agent 而言，shell permission model 是高风险区域，需要持续 fuzzing、fixture 和审计。

---

### 4. Web Shell 用户希望获得“可观察性”

Trajectory view、会话内搜索、麦克风音量显示等需求表明，开发者不仅想让 agent 执行任务，还希望知道它如何执行、在哪里耗时、调用了哪些工具、是否真的接收到输入。  
这类可观察性能力会显著影响调试效率和信任感。

---

### 5. 跨平台支持仍是工程挑战

bwrap 在 Windows 上测试失败、git remote fixture 在 Windows 中被解释为 drive-like path，说明 Linux-first 能力需要更严格的平台隔离。  
在引入沙箱、文件系统权限和 shell 行为相关能力时，Windows / macOS / Linux 的差异需要更早进入设计阶段。

---

### 6. 本地化与分发需求在增长

Azerbaijani 语言支持、Chrome Web Store 发布请求等说明社区正在从核心开发者用户扩展到更广泛人群。  
项目后续需要更成熟的 release workflow、extension distribution 和 i18n 维护机制。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报  
日期：2026-09-20  
数据源：GitHub `Hmbown/DeepSeek-TUI`

## 1. 今日速览

过去 24 小时内，社区没有新版本发布，但 Issue 与 PR 活动集中在 **会话/分支持久化、TUI 输入体验、测试稳定性、metrics 可观测性** 等核心开发者体验问题上。  
最值得关注的是：分支结构保存丢失问题已关闭并有后续 PR 跟进；TUI 光标、复制、Tab 处理等交互问题已有多个修复 PR 合并或关闭；测试栈溢出仍处于 Open 状态，可能影响 CI 与本地开发效率。

---

## 2. 版本发布

过去 24 小时内无新 Release。

---

## 3. 社区热点 Issues

> 注：过去 24 小时内更新的 Issue 共 5 条，因此本日报仅列出全部 5 条，而非强行扩展至 10 条。

### 1. `#6367` `[bug] /branch` 保存路径会丢弃分支结构  
状态：Closed  
作者：SparkofSpike  
评论：5  
链接：https://github.com/Hmbown/DeepSeek-TUI/issues/6367

该问题指出 `/branch <entry_id>` 在界面上看似可用，也能写出正确的 session 文件，但后续通过 snapshot 路径保存时，会根据 active-path messages 重建 journal，导致废弃分支和 entry id 丢失。  
重要性较高，因为它直接影响会话分支、历史回溯和多路径推理记录的可靠性。Issue 已关闭，并且已有后续 PR `#6369` 继续处理 session import 后的 engine 同步问题。

---

### 2. `#6362` `[bug] configured_model_api_tests` 导致测试线程栈溢出  
状态：Open  
作者：AdityaVG13  
评论：1  
链接：https://github.com/Hmbown/DeepSeek-TUI/issues/6362

该问题影响 `crates/tui/src/runtime_api.rs` 中的多个测试，表现为测试线程栈溢出并触发 SIGABRT，导致 `cargo test -p codewhale-tui --lib` 无法完成。  
这是当前仍未关闭的关键问题，直接影响本地开发、CI gate 与贡献者验证流程，优先级应较高。

---

### 3. `#6368` `[bug] metrics` compaction 有 reader 无 writer，rollup 显示无数据  
状态：Closed  
作者：7jrxt42BxFZo4iAnN4CX  
评论：1  
链接：https://github.com/Hmbown/DeepSeek-TUI/issues/6368

该问题指出 compaction 已有诊断 schema 和读取路径，但缺少真正的数据生产者，导致 `codewhale metrics` 在存在 compaction artifacts 的情况下仍显示 “no data”。  
重要性在于可观测性与诊断链路不完整：如果 metrics 无法反映真实压缩行为，开发者很难定位性能、存储或历史压缩相关问题。

---

### 4. `#6364` marketplace skill 覆盖与 WhaleWiki onboarding/change review 改进  
状态：Closed  
作者：Hmbown  
评论：0  
链接：https://github.com/Hmbown/DeepSeek-TUI/issues/6364

该 Issue 来自 founder-requested audit，关注 marketplace 缺少 14 个 Core skill 目录，以及 WhaleWiki 在 onboarding 和变更审查方面的可用性。  
它体现出项目正在补齐知识库、技能市场与贡献者导览能力，对新贡献者进入项目、理解变更上下文有实际价值。

---

### 5. `#6366` Medical Billing Services in Florida  
状态：Closed  
作者：medicalbilling-usa  
评论：2  
链接：https://github.com/Hmbown/DeepSeek-TUI/issues/6366

该 Issue 内容为医疗账单服务推广，与项目技术主题无关，疑似广告/垃圾信息。  
社区已关闭该 Issue，说明维护者对仓库噪音进行了处理，有助于保持 Issue tracker 的信噪比。

---

## 4. 重要 PR 进展

> 注：过去 24 小时内更新的 PR 共 3 条，因此本日报仅列出全部 3 条。

### 1. `#6369` `fix(session): synchronize the engine after foreign session import`  
状态：Open  
作者：AdityaVG13  
链接：https://github.com/Hmbown/DeepSeek-TUI/pull/6369

该 PR 是 `#6367` 的后续修复。它处理 `/resume <file>` 和 inline JSON import 导入外部会话后，engine 仍停留在旧 session 历史上的问题。  
核心价值在于确保 session id、transcript 与 engine 内部状态一致，避免用户恢复或导入会话后出现上下文错乱、后续消息写入旧历史等问题。

---

### 2. `#6365` `fix(tui): painted-column transcript copy and composer tabs, setup ink test`  
状态：Closed  
作者：AdityaVG13  
链接：https://github.com/Hmbown/DeepSeek-TUI/pull/6365

该 PR 主要修复 TUI 中 transcript copy 与 composer tab 的显示/复制一致性问题，并补充 setup ink 测试。  
从摘要看，作者先探索了 tab-stop 模型，随后基于 ratatui 源码验证后改为 painted column 语义，说明该修复关注终端渲染的真实显示列，而不是简单字符宽度。对 TUI 文本编辑和复制体验有直接改善。

---

### 3. `#6363` `fix(tui,exec): visual-row cursor, history detach, explicit ink, headless input withhold`  
状态：Closed  
作者：AdityaVG13  
链接：https://github.com/Hmbown/DeepSeek-TUI/pull/6363

该 PR 包含 6 个单一目的提交，并配有聚焦回归测试。修复点包括 composer 光标按 visual row 移动、history detach、显式 ink、headless input withhold 等。  
这是一次偏底层交互质量的批量修复，提升 TUI 输入、历史记录处理和无头执行模式下的稳定性，适合视为近期 TUI 可用性改进的基础补丁集。

---

## 5. 功能需求趋势

从过去 24 小时的 Issues 与 PR 看，社区关注点主要集中在以下方向：

### 1. 会话恢复与分支历史的可靠性

`#6367` 和 `#6369` 都围绕 session、branch、resume、foreign import 展开。  
趋势表明，用户正在更深入地使用多分支会话、历史恢复和外部 session 导入能力，因此系统需要更强的一致性保障：  
- 分支结构不能在后续保存中丢失  
- entry id 需要稳定保留  
- session import 后 engine 状态必须同步  
- transcript 与运行时上下文不能分裂

相关链接：  
- https://github.com/Hmbown/DeepSeek-TUI/issues/6367  
- https://github.com/Hmbown/DeepSeek-TUI/pull/6369

---

### 2. TUI 编辑体验与终端渲染一致性

`#6363`、`#6365` 反映出 TUI 交互已经进入较精细的修复阶段，关注点不再只是功能可用，而是：  
- 光标是否按视觉行移动  
- tab 是否按终端实际绘制列处理  
- transcript 复制是否与屏幕显示一致  
- ink/rendering 语义是否明确  
- headless 模式下输入是否正确保留或阻断

相关链接：  
- https://github.com/Hmbown/DeepSeek-TUI/pull/6363  
- https://github.com/Hmbown/DeepSeek-TUI/pull/6365

---

### 3. 测试稳定性与贡献者开发体验

`#6362` 显示当前 TUI lib 测试存在栈溢出问题，会导致整个测试二进制 abort。  
这类问题对贡献者影响较大，因为它会阻塞本地验证和 CI 合入流程。后续可能需要优化测试结构、降低递归深度、调整线程栈或拆分重型测试。

相关链接：  
- https://github.com/Hmbown/DeepSeek-TUI/issues/6362

---

### 4. Metrics 与运行时诊断能力

`#6368` 暴露 compaction metrics 存在“读取路径已定义但没有写入者”的问题。  
这说明项目正在补强运行时可观测性，但部分指标链路还未闭环。后续重点可能包括：  
- 统一 runtime event schema  
- 确保 compaction、exec、item lifecycle 都有 producer  
- 让 CLI metrics 能真实反映本地 artifacts 与执行行为

相关链接：  
- https://github.com/Hmbown/DeepSeek-TUI/issues/6368

---

### 5. Marketplace / WhaleWiki / Onboarding 基础设施

`#6364` 表明维护者正在审查 skill marketplace 与 WhaleWiki 的完整性。  
该方向偏项目生态与知识管理，目标是降低新贡献者理解项目、复盘变更、使用核心技能包的成本。

相关链接：  
- https://github.com/Hmbown/DeepSeek-TUI/issues/6364

---

## 6. 开发者关注点

### 1. Session 状态一致性是当前最关键的可靠性问题

分支保存和外部 session 导入问题说明，用户对会话历史的依赖正在增强。一旦 branch、entry id 或 engine context 不一致，会直接破坏 TUI 作为长期 AI 开发助手的可信度。

---

### 2. TUI 的“视觉语义”正在成为修复重点

近期 PR 多次提到 visual row、painted columns、composer tabs、transcript copy。这说明开发者已经在处理终端 UI 中更细粒度的问题：字符宽度、Tab 渲染、复制结果和屏幕显示是否一致。

---

### 3. 测试体系需要尽快恢复稳定

`#6362` 仍处于 Open 状态，并且会导致整个 lib test binary abort。这类问题会放大维护成本，尤其是在 PR 活跃时，会影响所有贡献者的验证效率。

---

### 4. 可观测性链路需要 producer/consumer 闭环

`#6368` 反映 metrics 设计和实际事件生产之间存在断层。对于 compaction、exec、runtime item 等行为，只有 schema 和 reader 不够，还需要稳定的数据写入路径和端到端测试。

---

### 5. 仓库需要持续处理垃圾 Issue

`#6366` 是明显的非技术广告内容。虽然已关闭，但说明公开仓库仍需依赖维护者或自动化规则清理噪音，以免影响真实问题的 triage 效率。

---

## 今日结论

今天 DeepSeek TUI 社区没有版本发布，但开发活动集中在核心体验与可靠性修复上。短期最值得关注的是 `#6369` 的 session engine 同步修复能否合入，以及 `#6362` 测试栈溢出问题何时解决。整体来看，项目正在从“功能可用”阶段转向“会话可靠、TUI 精准、诊断闭环、贡献友好”的工程化阶段。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*