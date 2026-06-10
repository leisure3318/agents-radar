# AI CLI 工具社区动态日报 2026-06-10

> 生成时间: 2026-06-10 01:38 UTC | 覆盖工具: 9 个

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

以下为基于你提供的 2026-06-10 社区动态摘要整理的**横向对比分析报告**。  
说明：表中“Issues 数 / PR 数 / Release 情况”均按**本日报中明确列出的条目数**统计；对“摘要生成失败”的项目，因缺少原始数据，统一标注为“无法统计”。

---

## 1) 生态全景

过去 24 小时，AI CLI 工具生态整体呈现出一个非常清晰的态势：**功能继续向 agent 化、工具编排化、企业化演进，但稳定性仍是第一优先级**。  
从 Codex、Gemini CLI、Copilot CLI 的动态看，大家都在补强 **上下文管理、MCP/工具链、会话恢复、跨平台兼容、企业模型接入** 等基础能力。  
与此同时，用户反馈高度集中在 **Windows/WSL/终端交互、上下文压缩、模型路由/配额、启动性能、数据正确性** 等实际可用性问题上。  
这说明 AI CLI 已经不再只是“能对话的终端工具”，而是在向**可长期运行、可接入企业环境、可审计的开发代理平台**过渡。  
当前竞争重点也从“有没有新功能”转向了“**能否稳定进入真实工作流**”。

---

## 2) 各工具活跃度对比

| 工具 | Issues 数 | PR 数 | Release 情况 | 备注 |
|---|---:|---:|---|---|
| Claude Code | 无法统计 | 无法统计 | 无法统计 | 摘要生成失败 |
| OpenAI Codex | 10 | 10 | 4 个发布（1 主版 + 3 alpha） | 功能与基础设施同时快速推进 |
| Gemini CLI | 9 | 10 | 4 个发布（1 稳定版 + 3 预览/补丁） | 迭代频繁，稳定性修复很密集 |
| GitHub Copilot CLI | 10 | 0 | 1 个发布（v1.0.61） | 今日以 Issues 反馈为主 |
| Kimi Code CLI | 1 | 1 | 0 | 样本少，但指向性强 |
| OpenCode | 无法统计 | 无法统计 | 无法统计 | 摘要生成失败 |
| Pi | 无法统计 | 无法统计 | 无法统计 | 摘要生成失败 |
| Qwen Code | 无法统计 | 无法统计 | 无法统计 | 摘要生成失败 |
| DeepSeek TUI | 无法统计 | 无法统计 | 无法统计 | 摘要生成失败 |

---

## 3) 共同关注的功能方向

### 1. Windows / 终端 / 跨平台兼容性
**涉及工具：** Codex、Gemini CLI、Copilot CLI  
**具体诉求：**
- Codex：Windows Desktop 首次输入卡顿、WSL 桥接重建、路径/卸载混乱、Remote SSH 异常
- Gemini CLI：Windows shell guidance、resize 崩溃、终端恢复问题
- Copilot CLI：Windows 下 `code-insiders --wait`、鼠标缩放/终端输入体验问题

**结论：**  
Windows 及终端兼容性仍是 AI CLI 生态的共同短板，且已经从“边缘问题”变成“主流用户体验门槛”。

---

### 2. 上下文管理、会话恢复、长任务稳定性
**涉及工具：** Codex、Gemini CLI、Copilot CLI  
**具体诉求：**
- Codex：context compaction 报错、历史/归档可见性、session segmentation
- Gemini CLI：resume 会话、thinking 卡顿、空会话清理
- Copilot CLI：本地会话恢复、跨实例共享、恢复后空白屏

**结论：**  
AI CLI 的核心竞争点正在从“单轮问答”转向“**长会话持续可用**”。上下文压缩、恢复、分段、续作正在成为基础设施能力。

---

### 3. 工具链 / MCP / 插件 / Agent 编排能力
**涉及工具：** Codex、Gemini CLI、Copilot CLI、Kimi Code CLI  
**具体诉求：**
- Codex：tool-calls、encrypted parameters、MCP 生命周期、tool search handler 缓存
- Gemini CLI：MCP header 编码、MCP OAuth 刷新、tool output 格式统一
- Copilot CLI：hook 上下文注入回归、OpenTelemetry spans、扩展可观测性
- Kimi：PostToolUse hook stderr 进入 LLM 上下文

**结论：**  
各家都在把 CLI 从“聊天壳”升级为“**工具编排平台**”，但稳定性、协议一致性和调试可见性仍是主要挑战。

---

### 4. 企业接入、认证、配额与私网资源
**涉及工具：** Gemini CLI、Copilot CLI、Codex  
**具体诉求：**
- Gemini CLI：Vertex AI 模型映射错误、配额/订阅重置、429
- Copilot CLI：BYOK、Enterprise-managed custom models、私网 `web_fetch`
- Codex：使用额度卡住、模型效率感知下降

**结论：**  
企业场景已成为 AI CLI 的重要战场，关键问题不再只是“能不能跑”，而是“**能不能按企业治理规则稳定运行**”。

---

### 5. 国际化、本地化与编码兼容
**涉及工具：** Codex、Copilot CLI、Gemini CLI（间接）
**具体诉求：**
- Codex：中文本地化不完整
- Copilot CLI：中文字符双重编码
- Gemini CLI：MCP header 非 ASCII 编码修复

**结论：**  
多语言支持和编码正确性正在从“锦上添花”变成“产品可用性的一部分”。

---

## 4) 差异化定位分析

### OpenAI Codex
**功能侧重：**
- 强调 agent 化能力、工具调用能力、上下文压缩质量、MCP 生命周期治理
- 新版重点包括 Web Search、schema 保真、session segmentation、图像 provenance

**目标用户：**
- 需要复杂工具编排、长任务执行、远程/桌面混合工作流的开发者

**技术路线：**
- 明显朝“**多工具、多会话、多模态的开发代理平台**”演进
- 但桌面端、Windows、远程连接的稳定性仍是主要瓶颈

---

### Gemini CLI
**功能侧重：**
- 快速迭代、稳定性修复、Vertex AI 兼容、MCP 工具链、权限与安全加固

**目标用户：**
- Gemini 生态用户、Vertex AI 用户、偏企业/平台化的开发者

**技术路线：**
- 更像是“**兼顾预览速度和工程稳健性的终端 agent**”
- 对认证路径、模型路由、终端交互和安全边界的打磨较深

---

### GitHub Copilot CLI
**功能侧重：**
- 企业集成、会话恢复、Windows 体验、BYOK、自定义模型、可观测性

**目标用户：**
- GitHub / Copilot 体系下的企业开发团队和重度终端用户

**技术路线：**
- 偏“**生产环境可部署的 AI 开发入口**”
- 更关注工作流不被破坏、数据不出错、企业能力可接入

---

### Kimi Code CLI
**功能侧重：**
- 核心编辑工具稳定性、hook 输出可见性

**目标用户：**
- Kimi 生态用户、关注中文/本地开发体验的开发者

**技术路线：**
- 从现有数据看，仍处于**功能打磨和可靠性修复**阶段
- 当前重点很集中，说明产品仍在夯实基础能力

---

### Claude Code / OpenCode / Pi / Qwen Code / DeepSeek TUI
**结论：**
- 由于本次摘要生成失败，**无法基于当前数据可靠判断其活跃度与定位差异**。
- 若补充原始 Issue/PR/Release 数据，可进一步纳入同一维度比较。

---

## 5) 社区热度与成熟度

### 社区最活跃
1. **OpenAI Codex**
   - Issues 与 PR 数都高
   - 同时有主版本、alpha、基础设施与产品体验的并行推进
   - 说明社区活跃度高，且项目处于强迭代阶段

2. **Gemini CLI**
   - Issue、PR、Release 三项都很活跃
   - 既有预览版快速试错，也有稳定版修复
   - 显示出较强的工程节奏与维护节奏

### 讨论热度高，但代码流动相对少
3. **GitHub Copilot CLI**
   - Issues 很集中，但本次没有 PR 更新
   - 说明社区反馈主要聚焦在使用体验、兼容性和企业需求
   - 更像“产品化阶段的反馈收敛”

### 早期或较小样本
4. **Kimi Code CLI**
   - 样本少，但问题非常聚焦
   - 体现为“核心功能稳定性 + 可观测性”优先

### 其它工具
- Claude Code / OpenCode / Pi / Qwen Code / DeepSeek TUI：本次缺少可用摘要，无法判断热度与成熟度。

---

## 6) 值得关注的趋势信号

### 趋势 1：AI CLI 正在进入“稳定性竞赛”阶段
用户已经不满足于“能生成代码”，而是要求：
- 能稳定启动
- 能持续工作
- 能恢复上下文
- 能在 Windows/WSL/Remote SSH 下正常运行

**对开发者的价值：**
> 先解决基础链路和运行时稳定性，再谈高级 agent 能力，否则新功能会迅速被底层问题抵消。

---

### 趋势 2：上下文压缩与会话恢复将成为核心壁垒
Codex、Gemini CLI、Copilot CLI 都在围绕会话恢复、resume、segment、compaction 做文章。

**对开发者的价值：**
> 长任务、长对话、多轮工具调用将成为 AI CLI 的主战场，数据结构、历史持久化和恢复策略会直接影响产品口碑。

---

### 趋势 3：企业接入能力正在成为标配
Vertex AI、BYOK、企业自定义模型、私网访问、配额与计费说明，都是高频需求。

**对开发者的价值：**
> 如果目标是企业落地，模型路由、权限边界、配额行为和私网能力必须优先设计，而不是后补。

---

### 趋势 4：MCP / 插件 / hook 体系需要“可观测、可失败、可恢复”
Codex、Gemini CLI、Copilot CLI、Kimi 都在围绕工具链可见性做改进。

**对开发者的价值：**
> 工具链不只是“能调用”，还要能解释失败原因、暴露 stderr、支持 lifecycle 管理和一致性校验。

---

### 趋势 5：国际化与编码正确性正在从边缘问题变成主问题
中文本地化、非 ASCII header、中文字符编码、非 UTF-8 文件安全性都被明确提及。

**对开发者的价值：**
> 终端 AI 工具已经进入全球化使用阶段，编码/本地化问题会直接影响实际采用率和企业信任度。

---

如果你需要，我可以进一步把这份报告整理成两种版本：
1. **管理层摘要版**：更短、更偏结论  
2. **研发行动版**：按“优先级 / 风险 / 建议动作”拆解成表格

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

⚠️ Skills 摘要生成失败。

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

以下为基于 `github.com/openai/codex` 过去 24 小时数据整理的 **2026-06-10 OpenAI Codex 社区动态日报**。

---

## 1) 今日速览

今天 Codex 的动态核心是 **CLI/核心引擎能力继续增强**，同时社区侧反馈仍明显集中在 **桌面端稳定性、上下文压缩、Windows/WSL、远程连接** 等问题上。  
新版本重点推进了 **内置 Web Search、Schema 保真、工具/插件/MCP 初始化与性能优化**，说明产品在朝更强的 agent 化与工具编排能力演进。  
但从 Issue 热度看，用户对 **更新后回归、模型效率下降、语言本地化缺失、使用额度异常、跨平台体验不稳定** 的抱怨仍然很多。

---

## 2) 版本发布

### `rust-v0.139.0`（主版本）
链接：<https://github.com/openai/codex/releases/tag/rust-v0.139.0>

**主要更新：**
- Code mode 现在可直接调用 **独立 Web Search**，且支持从嵌套 JavaScript tool call 中发起，返回纯文本搜索结果。
- Tool / connector 的输入 schema 现在会保留 `oneOf`、`allOf`。
- 大型 schema 在压缩时会尽量保留更浅层的结构，减少信息丢失。

**解读：**
- 这是一次偏“底层能力增强”的版本，重点在 **工具调用表达能力** 和 **上下文压缩质量**。
- 对依赖复杂 tool schema、需要联网检索的 Codex 工作流很关键。

### `rust-v0.140.0-alpha.2`
链接：<https://github.com/openai/codex/releases/tag/rust-v0.140.0-alpha.2>

- 仅标记为 alpha 版本发布，未见更详细变更说明。

### `rust-v0.139.0-alpha.3`
链接：<https://github.com/openai/codex/releases/tag/rust-v0.139.0-alpha.3>

- 仅标记为 alpha 版本发布。

### `rust-v0.139.0-alpha.2`
链接：<https://github.com/openai/codex/releases/tag/rust-v0.139.0-alpha.2>

- 仅标记为 alpha 版本发布。

---

## 3) 社区热点 Issues

> 说明：以下优先选择评论数较多、影响面较大或代表性强的问题。

### 1. CLI 自更新在 Ubuntu 22.04 失败：缺少 musl 包 SHA-256
链接：<https://github.com/openai/codex/issues/27194>  
- **为什么重要**：直接影响 CLI 升级链路，属于安装/自更新基础设施问题。  
- **社区反应**：4 条评论，属于较明确的可复现 bug，影响 Linux 用户升级体验。  
- **关键词**：`bug`, `CLI`, `self-update`, `Ubuntu`, `musl`

### 2. 5 小时使用额度卡在 99% 超过 24 小时
链接：<https://github.com/openai/codex/issues/27189>  
- **为什么重要**：属于计费/额度系统异常，影响付费用户实际可用性。  
- **社区反应**：4 条评论、1 个赞，说明痛点明显且用户愿意持续追踪。  
- **关键词**：`bug`, `rate-limits`, `app`

### 3. Remote SSH 场景下 `context_compaction / invalid_enum_value` 错误
链接：<https://github.com/openai/codex/issues/27267>  
- **为什么重要**：上下文压缩与远程连接结合后出错，直接打断工作流。  
- **社区反应**：3 条评论，属于高优先级可用性问题。  
- **关键词**：`bug`, `context`, `app-server`, `remote`

### 4. Windows 端路径/状态/卸载混乱，留下重复可执行文件和敏感状态
链接：<https://github.com/openai/codex/issues/27230>  
- **为什么重要**：涉及 Windows 运行时、缓存、会话、插件、SQLite 状态治理，影响安装、卸载、排障。  
- **社区反应**：3 条评论，说明问题较系统性。  
- **关键词**：`enhancement`, `windows-os`, `sandbox`, `CLI`, `memory`

### 5. GPT-5.5 上下文压缩过于频繁，导致可用性下降
链接：<https://github.com/openai/codex/issues/27275>  
- **为什么重要**：这是模型行为/上下文管理层面的直接体验问题，影响长任务能力。  
- **社区反应**：1 条评论，但话题敏感，且与模型能力感知强相关。  
- **关键词**：`bug`, `model-behavior`, `context`

### 6. Windows Desktop 首次输入卡住约 8 分钟，反复重试 app-server / node_repl
链接：<https://github.com/openai/codex/issues/27209>  
- **为什么重要**：首轮交互延迟极高，会让用户误判产品“不可用”。  
- **社区反应**：2 条评论，属于高阻塞级别性能问题。  
- **关键词**：`bug`, `windows-os`, `performance`

### 7. CLI tool-calls 报错：encrypted parameters 未配置 encrypted tool use
链接：<https://github.com/openai/codex/issues/27205>  
- **为什么重要**：说明工具调用协议或模型配置存在兼容性问题，影响编排/agent 执行。  
- **社区反应**：2 条评论、2 个赞，表明开发者较关注。  
- **关键词**：`bug`, `CLI`, `tool-calls`

### 8. Windows Desktop WSL 模式反复重建 node_repl bridge 并卡住
链接：<https://github.com/openai/codex/issues/27274>  
- **为什么重要**：WSL 是 Codex Windows 用户的关键工作路径，该问题会阻断终端/桥接能力。  
- **社区反应**：1 条评论，典型环境兼容性故障。  
- **关键词**：`bug`, `windows-os`, `mcp`, `app-server`

### 9. Codex mobile 丢失项目，阻塞移动端任务执行
链接：<https://github.com/openai/codex/issues/27272>  
- **为什么重要**：影响桌面-移动协同，属于多端一致性问题。  
- **社区反应**：1 条评论，说明影响明确但还处于早期跟进阶段。  
- **关键词**：`bug`, `iOS`, `app-server`

### 10. 中文本地化不完整：仍有大量英文 UI 字符串
链接：<https://github.com/openai/codex/issues/27255>  
- **为什么重要**：本地化是产品扩张和非英语用户体验的基础。  
- **社区反应**：1 条评论，但和另一个中文相关 issue 并列出现，说明该需求有持续性。  
- **关键词**：`bug`, `app`, `localization`

---

## 4) 重要 PR 进展

> 说明：以下优先选择对核心架构、性能、工具链、MCP/插件、图像与会话系统影响较大的 PR。

### 1. `#27271` 传播 image asset provenance
链接：<https://github.com/openai/codex/pull/27271>  
- **作用**：把 Responses API 的图像生成 provenance 透传到 app-server v2 的 image-generation thread item。  
- **价值**：增强生成图像的来源可追踪性，利于审计与产品一致性。

### 2. `#27264` 在 rollout 中保存 compact window id
链接：<https://github.com/openai/codex/pull/27264>  
- **作用**：把 compaction window identity 作为 session history 的一部分持久化。  
- **价值**：改善会话恢复与重建一致性，是上下文压缩/续接的重要基础设施。

### 3. `#27261` 让 MCP connection startup 变为可失败流程
链接：<https://github.com/openai/codex/pull/27261>  
- **作用**：将必需的 MCP server 启动纳入显式失败路径。  
- **价值**：减少“看似启动成功、实际连接不完整”的隐性错误。

### 4. `#27259` 用显式 retirement 替代 MCP manager lock
链接：<https://github.com/openai/codex/pull/27259>  
- **作用**：调整 MCP manager 的并发控制方式，避免锁等待与启动阻塞。  
- **价值**：直接指向启动性能与并发安全优化。

### 5. `#27258` 在 sampling continuations 中缓存 tool search handler
链接：<https://github.com/openai/codex/pull/27258>  
- **作用**：避免每次 continuation 都重建 BM25 tool search index。  
- **价值**：降低重复开销，属于明确的性能优化点。

### 6. `#27256` 为 `request_user_input` 增加 auto-resolution window contract
链接：<https://github.com/openai/codex/pull/27256>  
- **作用**：为模型主动询问用户但不阻塞 turn 的场景建立超时契约。  
- **价值**：有助于将 user input 请求扩展到 default/goal mode。

### 7. `#27252` 澄清 Guardian fail-closed 文案
链接：<https://github.com/openai/codex/pull/27252>  
- **作用**：区分 Guardian 审核失败与策略拒绝的用户提示。  
- **价值**：提升可解释性，减少误解和支持成本。

### 8. `#27250` 接管 MCP connection 生命周期
链接：<https://github.com/openai/codex/pull/27250>  
- **作用**：让 `McpConnectionManager` 负责启动、取消、重配置、退役和关闭。  
- **价值**：这是典型的架构收敛 PR，减少生命周期分散带来的复杂度。

### 9. `#27249` 增加 feature-gated session segmentation
链接：<https://github.com/openai/codex/pull/27249>  
- **作用**：引入实验性 session segmentation，并支持 rollout 文件轮转。  
- **价值**：面向长会话、fork、重建场景的结构化演进。

### 10. `#27241` 在发送模型请求前物化远程图片
链接：<https://github.com/openai/codex/pull/27241>  
- **作用**：可控地将 HTTP(S) 图片下载并转成 canonical inline data URL。  
- **价值**：提升图像输入一致性，减少远程资源不稳定带来的请求失败。

---

## 5) 功能需求趋势

从近 24 小时 Issues 看，社区最关注的方向主要有以下几类：

### 1. 桌面端稳定性与性能
链接示例：<https://github.com/openai/codex/issues/27209>  
- Windows 首次启动慢、WSL 卡顿、远程 SSH 报错、app-server 反复重试等问题集中出现。  
- 说明 Codex 桌面端在复杂环境中的 **启动链路、桥接、RPC、桥接重连** 仍是重点。

### 2. 上下文压缩、会话恢复与历史可见性
链接示例：<https://github.com/openai/codex/issues/27267>  
- 包括 `context_compaction` 报错、历史聊天缺失、归档聊天不可见、session 恢复异常。  
- 用户对“长上下文任务能不能稳定做下去”非常敏感。

### 3. Windows / WSL / Remote SSH 兼容性
链接示例：<https://github.com/openai/codex/issues/27274>  
- 多个问题都与 Windows 平台、WSL2、远程连接、路径规范化、插件桥接有关。  
- 这说明 Windows 生态仍是当前最需要专项打磨的平台之一。

### 4. 额度、计费和模型效率感知
链接示例：<https://github.com/openai/codex/issues/27189>  
- 包括使用量卡住、额度消耗过快、模型“变笨/退化”的反馈。  
- 用户对 token 效率与可用额度非常敏感，属于强体验指标。

### 5. 本地化和多语言 UI
链接示例：<https://github.com/openai/codex/issues/27255>  
- 中文界面仍不完整，且有多条中文相关反馈。  
- 说明非英语用户的产品完成度仍需提升。

### 6. 工具调用、MCP、插件与代理编排能力
链接示例：<https://github.com/openai/codex/issues/27205>  
- CLI tool-calls、encrypted parameters、插件缺失、MCP 启动、工具搜索等问题集中。  
- 显示 Codex 正在从“聊天工具”向“agent 平台”过渡，工具链稳定性变得越来越关键。

### 7. 多端协同与移动端体验
链接示例：<https://github.com/openai/codex/issues/27272>  
- Desktop 与 mobile 的项目/会话同步不完整，影响跨设备连续工作。  
- 多端一致性正在成为新需求。

---

## 6) 开发者关注点

从反馈中可以归纳出开发者最在意的几个痛点：

1. **“能不能稳定跑起来”比“有没有新功能”更重要**  
   - Windows、WSL、Remote SSH、首次启动、桥接重建等问题反复出现，说明基础可用性仍是首要目标。

2. **上下文管理的稳定性正在成为核心门槛**  
   - `context_compaction`、历史丢失、归档异常、长会话退化，都会直接影响 Codex 是否适合做真实开发任务。

3. **工具链复杂度上升后，MCP / 插件 / tool-calls 的一致性变得关键**  
   - 新版在增强工具能力的同时，也带来更多协议兼容、权限、初始化顺序和性能问题。

4. **用户对“模型效率下降”的敏感度很高**  
   - 即使是主观反馈，只要 token 消耗上升、压缩频繁、输出质量下降，就会迅速变成社区热点。

5. **产品国际化与跨端一致性仍有明显缺口**  
   - 中文本地化、移动端项目同步、桌面端历史恢复等，都说明 Codex 还在从“开发者工具”向“通用工作台”演进。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **更适合公众号/周报的精简版**，或  
2. **内部研发跟进版（按严重程度、负责人领域、优先级排序）**。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-06-10）

## 1) 今日速览
过去 24 小时，Gemini CLI 继续保持高频发版节奏：同时发布了 `v0.47.0-preview.0`、`v0.46.0` 以及两个补丁版本，说明项目仍处在快速迭代和稳定性修复并行推进的阶段。  
社区关注点明显集中在 **Vertex AI 模型兼容性、Agent “thinking” 卡顿、终端 resize 崩溃、配额/订阅疑问** 这几类使用痛点上，说明真实使用链路中的稳定性和可用性仍是核心议题。

---

## 2) 版本发布

- **[v0.47.0-preview.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.47.0-preview.0)**  
  主要包含夜间版版本号更新、自动生成 changelog，以及对后端定义的适配更新（Release notes 中可见 “Respect backend def”）。  
  这类 preview 发布表明团队在持续推进新能力，同时保持预览版快速验证。

- **[v0.46.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.46.0)**  
  稳定版发布，重点修复了 **PTY resize 导致的原生崩溃风险**，属于核心稳定性增强。  
  对于频繁在终端中使用 CLI 的开发者，这类修复直接提升了可用性。

- **[v0.46.0-preview.3](https://github.com/google-gemini/gemini-cli/releases/tag/v0.46.0-preview.3)**  
  这是一个补丁预览版，通过 cherry-pick 对上一预览版做修复回补，体现出预览链路的持续收敛。

- **[v0.45.3](https://github.com/google-gemini/gemini-cli/releases/tag/v0.45.3)**  
  稳定分支补丁发布，同样是通过 cherry-pick 快速修复已知问题，说明维护节奏较强。

---

## 3) 社区热点 Issues

> 本次数据中共有 **9 条更新的 Issue**，以下为全部重点项。

1. **[#27759 Vertex AI: flash model router maps to non-existent gemini-3-flash](https://github.com/google-gemini/gemini-cli/issues/27759)**  
   这是今天最关键的阻断性问题之一：Vertex AI 认证下，flash 模型被错误路由到不存在的 `gemini-3-flash`。  
   **重要性**：直接影响 Vertex AI 用户无法使用 flash 系列模型。  
   **社区反应**：`priority/p1`、`help wanted`，并且已有 6 条评论，说明问题已被较快关注和跟进。

2. **[#27766 Thinking Bug](https://github.com/google-gemini/gemini-cli/issues/27766)**  
   用户反馈 Agent 长时间停留在 “thinking” 状态，显著拖慢任务完成。  
   **重要性**：这是典型的体验型性能问题，会直接影响日常使用感受。  
   **社区反应**：已有 3 条评论，且被标记为 `need-information`，表明还在收集复现条件。

3. **[#27764 Terminal Resize Issue](https://github.com/google-gemini/gemini-cli/issues/27764)**  
   `gemini --resume` 后调整终端大小会触发 `ioctl(2) failed, EBADF`。  
   **重要性**：属于核心终端交互路径的稳定性问题。  
   **社区反应**：标记 `possible-duplicate`、`effort/medium`，有 2 条评论，说明问题可能已有人报告过或存在相似案例。

4. **[#27761 Cloud Code Assist API error (429): Individual quota reached](https://github.com/google-gemini/gemini-cli/issues/27761)**  
   用户在订阅/配额显示异常的情况下触发 429，提示个人配额已达上限。  
   **重要性**：涉及计费、配额与模型服务可用性，影响面广。  
   **社区反应**：2 条评论，`need-information`，说明需要进一步厘清账户与产品层配置。

5. **[#27751 Improve shell guidance for Windows hosts](https://github.com/google-gemini/gemini-cli/issues/27751)**  
   建议系统提示对 Windows 主机做平台感知，避免推荐 Unix 风格命令。  
   **重要性**：直接关系到跨平台可用性，尤其是 Windows 用户体验。  
   **社区反应**：`enhancement`，2 条评论，属于明确的产品改进方向。

6. **[#27762 Stuck on thinking](https://github.com/google-gemini/gemini-cli/issues/27762)**  
   与 #27766 类似，用户反馈 Agent 长时间卡在 thinking。  
   **重要性**：说明该类问题可能不是个例，而是一个重复出现的体验痛点。  
   **社区反应**：已关闭，3 条评论，可能已被视为重复或已有处理路径。

7. **[#27756 Not installing](https://github.com/google-gemini/gemini-cli/issues/27756)**  
   用户安装后无法正常进入 CLI，提示 cmdlet 错误。  
   **重要性**：这是最基础的 onboarding 阶段问题，影响新用户转化。  
   **社区反应**：已关闭，1 条评论，说明问题可能被快速定位或归类。

8. **[#27757 AI GOOGLE PRO PLAN - Confused about the reset (refresh) of my plan](https://github.com/google-gemini/gemini-cli/issues/27757)**  
   用户对 Pro Plan 的重置周期（5 小时还是 24 小时）存在疑问。  
   **重要性**：反映配额、订阅和使用规则文档不清晰。  
   **社区反应**：虽无评论，但属于高频账户/配额类问题。

9. **[#27773 Gh](https://github.com/google-gemini/gemini-cli/issues/27773)**  
   标题较短、内容不完整，属于手动 triage 的疑问类条目。  
   **重要性**：说明仍有一些低上下文的社区反馈需要维护者人工澄清。  
   **社区反应**：`manual-triage`，目前无评论。

---

## 4) 重要 PR 进展

1. **[#27760 fix: use gemini-3.5-flash for all auth types including Vertex AI](https://github.com/google-gemini/gemini-cli/pull/27760)**  
   这是对 #27759 的直接修复：统一所有认证类型下的 flash 模型默认映射，避免 Vertex AI 路由到不存在的模型名。

2. **[#27771 Fix MCP header encoding for non-ASCII values](https://github.com/google-gemini/gemini-cli/pull/27771)**  
   修复 MCP HTTP transport 中 header 值的编码问题，避免 Unicode 值导致 discovery 失败。  
   对国际化场景和第三方 MCP 服务兼容性很关键。

3. **[#27772 refactor(core): standardize tool output formatting](https://github.com/google-gemini/gemini-cli/pull/27772)**  
   统一 `mcp-tool`、`shell`、`web-fetch` 的输出格式，减少不一致的数据结构。  
   有助于提升 Agent 对外部工具结果的处理稳定性。

4. **[#27767 fix(cli): prevent path traversal vulnerabilities during skill install](https://github.com/google-gemini/gemini-cli/pull/27767)**  
   修复技能安装/链接/卸载中的路径穿越漏洞。  
   这是偏安全方向的重要修补，影响本地文件系统安全。

5. **[#27754 fix(a2a-server): add missing return after 501 response in GET /tasks/metadata](https://github.com/google-gemini/gemini-cli/pull/27754)**  
   修复 A2A server 在返回 501 后继续执行导致 `ERR_HTTP_HEADERS_SENT` 的问题。  
   属于典型的服务端健壮性修复。

6. **[#27753 ci: validate workflow_run origin before consuming the E2E artifact](https://github.com/google-gemini/gemini-cli/pull/27753)**  
   解决 fork 场景下的 E2E artifact poisoning 风险。  
   这类 CI 安全修复对开源项目尤其重要。

7. **[#27763 docs: document read_file 20MB file size limit](https://github.com/google-gemini/gemini-cli/pull/27763)**  
   为 `read_file` 工具补充 20MB 限制文档。  
   属于降低误用、减少支持成本的高价值文档 PR。

8. **[#27755 test(a2a-server): migrate process.env to vi.stubEnv()](https://github.com/google-gemini/gemini-cli/pull/27755)**  
   按项目约定整理测试环境变量写法，提升测试一致性。  
   虽是测试维护，但有助于长期可维护性。

9. **[#27752 fix(core): refresh MCP OAuth with stored client ID](https://github.com/google-gemini/gemini-cli/pull/27752)**  
   修复动态注册 client ID 场景下的 MCP OAuth token 刷新逻辑。  
   对 MCP 服务接入体验非常关键。

10. **[#27770 Avoid persisting empty resume sessions](https://github.com/google-gemini/gemini-cli/pull/27770)**  
    避免空会话或仅命令会话被写入 resume 历史。  
    直接改善 `/resume` 的可用性和历史列表质量。

---

## 5) 功能需求趋势

1. **模型与认证兼容性持续是主线**
   - 代表问题：[#27759](https://github.com/google-gemini/gemini-cli/issues/27759)、[#27760](https://github.com/google-gemini/gemini-cli/pull/27760)
   - 趋势判断：社区希望 Gemini CLI 在 AI Studio、Vertex AI、企业账号等不同认证路径下，模型映射保持一致且可预期。

2. **Agent 性能与“思考”时长优化需求明显**
   - 代表问题：[#27766](https://github.com/google-gemini/gemini-cli/issues/27766)、[#27762](https://github.com/google-gemini/gemini-cli/issues/27762)
   - 趋势判断：用户对响应速度非常敏感，尤其是“thinking”阶段的可解释性和时长控制。

3. **终端交互稳定性与恢复能力**
   - 代表问题：[#27764](https://github.com/google-gemini/gemini-cli/issues/27764)、相关修复：[v0.46.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.46.0)
   - 趋势判断：resize、resume、PTY 这些基础交互路径是高频使用场景，必须优先稳定。

4. **跨平台体验，尤其是 Windows**
   - 代表问题：[#27751](https://github.com/google-gemini/gemini-cli/issues/27751)
   - 趋势判断：社区开始更明确地要求平台感知型提示词与命令建议，而不是默认 Unix 生态。

5. **配额、订阅、计费规则需要更清晰**
   - 代表问题：[#27761](https://github.com/google-gemini/gemini-cli/issues/27761)、[#27757](https://github.com/google-gemini/gemini-cli/issues/27757)
   - 趋势判断：用户对“为什么 0% 还会 429”“多久重置”这类问题非常在意，文档和产品提示应加强。

---

## 6) 开发者关注点

1. **先修“阻断性问题”，再谈体验优化**
   - 例如 Vertex AI flash 路由错误、429、resume/resize 崩溃，这些问题直接影响可用性。  
   - 参考：[#27759](https://github.com/google-gemini/gemini-cli/issues/27759)、[#27764](https://github.com/google-gemini/gemini-cli/issues/27764)、[#27761](https://github.com/google-gemini/gemini-cli/issues/27761)

2. **Agent 行为需要更可控、更可解释**
   - “thinking 太久”类反馈表明用户对 Agent 内部状态缺少预期。  
   - 参考：[#27766](https://github.com/google-gemini/gemini-cli/issues/27766)、[#27762](https://github.com/google-gemini/gemini-cli/issues/27762)

3. **安全与供应链防护正在被强化**
   - 路径穿越、CI artifact poisoning、OAuth 刷新等 PR 说明项目在补齐安全边界。  
   - 参考：[#27767](https://github.com/google-gemini/gemini-cli/pull/27767)、[#27753](https://github.com/google-gemini/gemini-cli/pull/27753)、[#27752](https://github.com/google-gemini/gemini-cli/pull/27752)

4. **文档与提示词工程的重要性上升**
   - `read_file` 限制、Windows shell 指南、resume 行为等都说明：减少误解比单纯加功能更能降低支持成本。  
   - 参考：[#27763](https://github.com/google-gemini/gemini-cli/pull/27763)、[#27751](https://github.com/google-gemini/gemini-cli/issues/27751)、[#27770](https://github.com/google-gemini/gemini-cli/pull/27770)

---

如果你希望，我也可以把这份日报进一步整理成：
- **适合公众号/飞书群的精简版**
- **面向研发周报的管理层摘要版**
- **按“问题 / 风险 / 机会”三栏的分析版**

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

以下为 **2026-06-10 GitHub Copilot CLI 社区动态日报**（基于 `github.com/github/copilot-cli` 过去 24 小时数据）。

## 1) 今日速览
今天的动态以 **v1.0.61 发布后的稳定性反馈** 为主，社区关注点集中在 Windows 兼容性、模型接入能力、会话恢复与工具链数据正确性。  
新版本带来了 `/settings` 交互式设置面板、`/agents` 与新建 Agent 向导的 UI 优化，但同时也暴露出一些回归和企业场景需求，说明产品正在从“可用”向“可部署、可集成、可审计”阶段推进。

---

## 2) 版本发布
### v1.0.61（2026-06-09）
发布链接：<https://github.com/github/copilot-cli/releases/tag/v1.0.61>

本次更新重点：
- **`/agents` 选择器与 Create New Agent 向导 UI 优化**：边框、标题、输入样式更统一。
- **修复会话恢复后屏幕空白**：提升交互稳定性。
- **新增 `/settings` 交互式对话框**：可集中浏览和编辑用户设置。
- **本地会话恢复相关修复**：原始摘要在数据中被截断，但可见仍围绕会话恢复场景做了改进。

---

## 3) 社区热点 Issues
> 说明：以下优先选取对使用体验、企业接入和数据正确性影响最大的 10 个 Issue。

### 1. #3733 Windows: `Ctrl+G` cannot launch `code-insiders --wait`
链接：<https://github.com/github/copilot-cli/issues/3733>  
**重要性**：影响 Windows 用户从 Copilot CLI 快速切换到 VS Code Insiders 的核心工作流，属于高频交互链路故障。  
**社区反应**：当前 **1 条评论、1 个 👍**，说明已有明确用户反馈并引起关注。

### 2. #3736 Thinking Tokens/Text never appears with BYOK models regardless of endpoint type
链接：<https://github.com/github/copilot-cli/issues/3736>  
**重要性**：BYOK 模型下“Thinking”信息缺失，会削弱可解释性、排障能力和用户对模型行为的感知。  
**社区反应**：**0 评论、0 👍**，但这类问题通常对企业/自建模型用户影响较大，值得优先跟进。

### 3. #3731 Allow option to restore web_fetch access to private networks
链接：<https://github.com/github/copilot-cli/issues/3731>  
**重要性**：企业内部模板、规范和资源常位于私网，`web_fetch` 被限制后会直接影响 agent 读取内部知识。  
**社区反应**：**0 评论、0 👍**，但需求很明确，属于企业落地型诉求。

### 4. #3730 Support Enterprise-Managed Custom Models in Copilot CLI
链接：<https://github.com/github/copilot-cli/issues/3730>  
**重要性**：这是企业级模型治理的关键能力，涉及 Copilot Admin 中配置的自定义模型/兼容 OpenAI endpoint 能否在 CLI 可用。  
**社区反应**：**0 评论、0 👍**，但从产品战略上看优先级很高。

### 5. #3729 Share Local sessions accross different GH Copilot CLI instances
链接：<https://github.com/github/copilot-cli/issues/3729>  
**重要性**：会话跨机器/跨实例续作是增强生产力的重要需求，尤其适合多设备开发者。  
**社区反应**：**0 评论、0 👍**，属于典型的“体验增强型”需求。

### 6. #3727 Regression in v1.0.60: `userPromptSubmitted` hook additionalContext no longer injected into planner
链接：<https://github.com/github/copilot-cli/issues/3727>  
**重要性**：这是明确的版本回归，影响插件/Hook 扩展链路，直接关系到自定义上下文注入是否生效。  
**社区反应**：**0 评论、0 👍**，但附带了 v1.0.59 vs v1.0.60 的明确回归边界，便于定位。

### 7. #3732 edit tool corrupts non-UTF-8 bytes
链接：<https://github.com/github/copilot-cli/issues/3732>  
**重要性**：这是数据损坏级别的问题，涉及非 UTF-8 文件被静默破坏，风险高于普通文本渲染 bug。  
**社区反应**：**0 评论、0 👍**，但一旦命中会影响文件完整性，优先级应较高。

### 8. #3726 Chinese characters double-encoded in VS Code terminal clipboard
链接：<https://github.com/github/copilot-cli/issues/3726>  
**重要性**：直接影响中文用户复制/粘贴体验，是多语言支持和终端输出可用性的关键问题。  
**社区反应**：**0 评论、0 👍**，但对中文社区的实际使用影响明显。

### 9. #3725 Add skill-level spans to OpenTelemetry traces
链接：<https://github.com/github/copilot-cli/issues/3725>  
**重要性**：这是可观测性与调试能力增强需求，能帮助追踪 skill 调用链路、定位工具调用归因。  
**社区反应**：**0 评论、0 👍**，属于开发者向的基础设施增强诉求。

### 10. #3735 Windows Terminal Feature Ctrl+Mouse wheel/pinch zoom is circumvented
链接：<https://github.com/github/copilot-cli/issues/3735>  
**重要性**：影响 Windows Terminal 的缩放/触控板体验，属于输入层兼容性问题，虽不致命但影响日常舒适度。  
**社区反应**：**0 评论、0 👍**，与 #3733 一起说明 Windows 终端交互仍是集中反馈区。

---

## 4) 重要 PR 进展
### 过去 24 小时无 PR 更新
PR 列表为空，因此暂无可选的 PR 进展可总结。  
PR 页面：<https://github.com/github/copilot-cli/pulls>

---

## 5) 功能需求趋势
从全部 Issue 看，社区关注的方向主要集中在：

1. **Windows/终端交互兼容性**
   - `Ctrl+G`、鼠标缩放、输入法/剪贴板等基础交互问题集中出现。
   - 说明 Copilot CLI 在 Windows 终端场景仍需继续打磨。

2. **企业级模型与接入能力**
   - BYOK、Enterprise-managed custom models、私网 `web_fetch` 都指向企业部署诉求。
   - 社区希望 CLI 更好适配企业 AI 治理和内网资源访问。

3. **会话与状态管理**
   - 本地会话恢复、跨实例共享、恢复后空白屏等问题表明会话生命周期是核心体验之一。
   - 用户期待更连续、更可迁移的工作流。

4. **工具链正确性与数据安全**
   - `edit` 工具破坏非 UTF-8 文件、中文双重编码等问题，反映出对数据完整性的强烈关注。
   - 这类问题优先级通常高于纯 UI 优化。

5. **可观测性与扩展性**
   - OpenTelemetry spans、hook context 注入回归说明开发者希望更强的调试和插件扩展能力。
   - Copilot CLI 正在从单一交互工具演进为可集成平台。

---

## 6) 开发者关注点
当前开发者反馈的高频痛点可以概括为：

- **“别破坏我的工作流”**：Windows 终端、外部编辑器启动、复制粘贴、缩放等基础操作不能被打断。
- **“企业环境要能用”**：私网访问、自定义模型、BYOK、企业管理模型支持是落地关键。
- **“会话要可延续”**：本地会话恢复、跨机器共享、恢复后状态一致性是生产力诉求。
- **“别默默损坏数据”**：非 UTF-8 文件、中文编码、插件上下文丢失等问题需要更强的数据正确性保障。
- **“要能看得见、查得到”**：OpenTelemetry、技能级 tracing、hook 调试能力是高级用户和平台团队的刚需。

如果你愿意，我也可以把这份日报进一步整理成 **适合公众号/内部周报风格的精简版**，或输出成 **表格版（Issue / 影响 / 反应 / 建议优先级）**。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报  
**日期：2026-06-10**  
**数据源：github.com/MoonshotAI/kimi-cli**

## 1) 今日速览
今天社区更新量不大，但信号很明确：**一条高优先级 bug 暴露了新版本中 Edit tool 的稳定性问题**，同时**一个 PR 正在增强 hook stderr 的可见性**，说明项目当前的重点集中在“工具调用可靠性”和“调试可观测性”上。  
截至目前，过去 24 小时内未见新的 Release 发布。

---

## 2) 版本发布
**无新版本发布。**

---

## 3) 社区热点 Issues
> 过去 24 小时内仅有 1 条更新中的 Issue，因此本节按“最值得关注”完整列出。

### 1. [#2443] [bug] Edit tool keeps failing in new kimi-code  
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/2443  
- **状态**：OPEN  
- **作者**：iaindooley  
- **更新时间**：2026-06-09  
- **为什么重要**：  
  这是一个直接影响核心编辑能力的 bug。Issue 指出在 **Kimi Code v0.12.0**、`/login`、模型 **k2.6**、平台 **debian** 下，Edit tool 频繁失败，属于典型的“主功能不可用”问题。  
- **社区反应如何**：  
  当前 **0 评论、0 👍**，说明问题刚被提出，尚未形成讨论，但从内容看对 CLI 的实际使用影响较大，值得优先排查。  

> 注：本周期内没有更多更新中的 Issue，因此无法从当前数据中筛选出 10 条独立问题；若后续有更多更新，可进一步扩展为趋势榜单。

---

## 4) 重要 PR 进展
> 过去 24 小时内仅有 1 条更新中的 PR，以下为本周期最重要的进展。

### 1. [#2445] feat(hooks): surface PostToolUse hook stderr to LLM context  
- **链接**：https://github.com/MoonshotAI/kimi-cli/pull/2445  
- **状态**：OPEN  
- **作者**：zwpdbh  
- **更新时间**：2026-06-10  
- **功能/修复内容**：  
  该 PR 将 **PostToolUse hook** 从“fire-and-forget”改为“awaited”，并把 hook 的 **stderr** 收集后附加到工具结果中，让 LLM 能立即看到 hook 输出。  
- **重要性**：  
  这是一项典型的**可观测性增强**，能帮助模型更快感知工具链内部错误，减少“工具执行了但模型不知道发生了什么”的问题，对排障和稳定性改进都很关键。  

> 注：本周期内只有这一条 PR 更新，因此未能形成 10 条 PR 榜单。

---

## 5) 功能需求趋势
结合当前更新内容，社区关注点主要集中在以下方向：

1. **工具调用稳定性 / 编辑能力可靠性**  
   - 代表信号：`Edit tool keeps failing`  
   - 说明用户最关心的是 CLI 的核心编辑闭环是否稳定可用。

2. **Hook 可观测性与调试能力**  
   - 代表信号：`surface PostToolUse hook stderr to LLM context`  
   - 说明开发者希望错误信息能更及时进入上下文，降低排障成本。

3. **新版本兼容性与回归控制**  
   - 代表信号：`Kimi Code v0.12.0` 下的功能失败  
   - 说明版本升级后功能回归是当前需要重点关注的问题。

4. **平台与模型适配**  
   - 代表信号：`debian`、`k2.6`、`/login` 场景下的异常  
   - 说明用户在不同平台/模型组合上的一致性体验仍是关注焦点。

---

## 6) 开发者关注点
从今天的反馈中，可以提炼出以下开发者最应关注的痛点：

- **Edit tool 的失败问题属于高优先级稳定性缺陷**  
  这是直接影响生产使用的核心能力，建议优先复现并定位错误链路。  
  链接：https://github.com/MoonshotAI/kimi-cli/issues/2443

- **工具链输出需要更强的可见性**  
  当前 PR 显示团队正在解决“hook stderr 不易被 LLM 感知”的问题，这类改动能显著提升调试效率。  
  链接：https://github.com/MoonshotAI/kimi-cli/pull/2445

- **版本升级后的回归风险需要关注**  
  问题出现在 v0.12.0，建议后续对关键路径增加回归测试，尤其是 Edit tool、hook 执行、模型交互等链路。

- **当前数据样本较少，但问题指向性很强**  
  虽然过去 24 小时更新不多，但集中暴露的是“核心工具可靠性”和“错误反馈可见性”两大主题。

---

如果你愿意，我也可以把这份日报进一步整理成：  
1) **适合内部群发的精简版**，或  
2) **带“风险等级 / 优先级 / 影响面”标签的运维分析版**。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

⚠️ 摘要生成失败。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*