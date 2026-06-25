# AI CLI 工具社区动态日报 2026-06-25

> 生成时间: 2026-06-25 01:34 UTC | 覆盖工具: 9 个

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

以下是基于你提供的 2026-06-25 各 AI CLI 工具社区动态，整理的**横向对比分析报告**。

---

# AI CLI 工具生态横向对比分析（2026-06-25）

## 1) 生态全景

过去 24 小时，AI CLI 工具生态的主线非常清晰：**从“能跑”进入“可持续工作流”阶段**。  
社区关注点已从基础问答转向**长会话恢复、权限与沙箱边界、MCP/tool-call 稳定性、跨平台兼容性、以及成本与限流治理**。  
与此同时，多个项目都在加速补齐**TUI/CLI 交互细节、后台任务可见性、会话状态持久化**，说明用户已经把这些工具当作“日常生产力终端”而不是实验性助手。  
整体看，生态正在向两端分化：一端是**平台化、运行时化、MCP 化**，另一端是**交互体验与稳定性精修**。

---

## 2) 各工具活跃度对比

> 说明：下表按各日报中“今日热点 Issue / PR”汇总；Release 情况为是否存在今日或近 24 小时可见的新版本发布。

| 工具 | 今日 Issues 数 | 今日 PR 数 | Release 情况 |
|---|---:|---:|---|
| Claude Code | 10 | 4 | 有：v2.1.191、v2.1.190 |
| OpenAI Codex | 10 | 10 | 有：rust-v0.142.1、rust-v0.143.0-alpha.* |
| Gemini CLI | 10 | 4 | 无新 Release |
| GitHub Copilot CLI | 10 | 0 | 有：v1.0.65 |
| Kimi Code CLI | 2 | 0 | 无新 Release |
| OpenCode | 10 | 10 | 有：v1.17.10 |
| Pi | 10 | 6 | 无新 Release |
| Qwen Code | 10 | 10 | 有：v0.19.2、v0.19.2-preview.0、nightly |
| DeepSeek TUI | 5 | 10 | 无新 Release |

**快速观察：**
- **PR 最活跃**：OpenAI Codex、OpenCode、Qwen Code（均为 10）。  
- **Issue/PR 双高**：OpenAI Codex、OpenCode、Qwen Code，说明它们处在高频迭代期。  
- **Issue 高、PR 低**：Claude Code、Gemini CLI、Copilot CLI，偏向“问题反馈集中、修复节奏相对克制”。  
- **小而聚焦**：Kimi Code CLI，社区规模较小，但问题很集中。  
- **高 PR 低 Issue**：DeepSeek TUI，更多体现为维护推进和能力铺设，而非大规模社区噪声。

---

## 3) 共同关注的功能方向

### 1. 会话恢复与上下文连续性
这是**跨多个工具最一致**的诉求。

- **Claude Code**：`/rewind`、`/bg`、远程会话重连、历史回溯。
- **Codex**：线程切换后 approval mode 持久化、session/state 恢复。
- **Copilot CLI**：恢复会话时模型选择丢失、`/compact` 状态错位。
- **Kimi Code CLI**：context compaction 后重复加载 system prompt，浪费 token。
- **OpenCode**：session / provider 生命周期分离、恢复时状态稳定性。
- **Pi**：恢复会话时 resources/messages 展示顺序优化。
- **Qwen Code**：todos/memory/session 跨设备同步诉求。
  
**共同诉求本质**：CLI 工具正在从“单次对话”演化为“长任务工作台”，状态可恢复已成为基础能力。

---

### 2. 权限、沙箱与凭据隔离
这是第二个高一致性的主题，尤其集中在企业和多账号场景。

- **Claude Code**：sandbox 提示误导、Keychain 隔离问题、治理文档遵循不稳定。
- **Codex**：managed sandbox、permission profile、Windows sandbox/代理边界。
- **OpenCode**：MCP OAuth 安全、配置脱敏、本地 MCP 环境变量限制。
- **Qwen Code**：路径穿越删除漏洞、默认模型/设置变更引发成本风险。
- **DeepSeek TUI**：安全报告响应、公开安全联系方式修复。
- **Pi**：hostname 泄漏、包安全举报。
  
**共同诉求本质**：用户不再接受“默认宽权限”，而是要求**可解释、可审计、边界明确**。

---

### 3. 限流、流式输出与重试韧性
多个项目都在强化“不中断”体验。

- **Claude Code**：限流自动重试、后台 agent 停止后复活问题修复。
- **Codex**：rate limiting headers、网络/代理环境更稳。
- **OpenCode**：retry backoff 上限、stream 保活、断线重连。
- **Qwen Code**：stream inactivity timeout、web_fetch JSON fallback。
- **Pi**：hung streams 修复、timeout 增强。
- **Kimi Code CLI**：`/web` 命令报错修复。
  
**共同诉求本质**：LLM CLI 正从“离线脚本”变成“在线工作流”，对流式中断、限流、重连的容忍度显著降低。

---

### 4. MCP / tool-call 生态化
这是高端工具之间最明显的共同方向。

- **Codex**：MCP routing、authentication enum、manager 级 ID 路由。
- **OpenCode**：MCP instructions、resource templates、tool discovery、OAuth 安全。
- **Gemini CLI**：MCP 跨 server 资源 URI 误判。
- **DeepSeek TUI**：ACP 能力暴露、provider/model 选择控制。
- **Qwen Code**：tool call 稳定性、后台自动化与执行控制。
  
**共同诉求本质**：工具链正从“单模型对话”升级为“模型 + 工具 + 编排”的运行时平台。

---

### 5. 跨平台与桌面端兼容性
平台问题在今天依旧高频。

- **Claude Code**：Windows Server 2025、macOS Keychain。
- **Codex**：Windows、Ubuntu sandbox、非 Git workspace。
- **Copilot CLI**：Linux AppImage、Windows LSP、移动端远程会话。
- **OpenCode**：Windows/macOS/Linux 桌面回归。
- **Pi**：Termux、终端宽度、UTF-8、scrollback。
- **DeepSeek TUI**：TUI/终端渲染与输入法问题。
  
**共同诉求本质**：AI CLI 已经是“跨平台桌面生产工具”，兼容性不再是边缘问题，而是核心竞争力。

---

## 4) 差异化定位分析

### Claude Code
- **功能侧重**：会话恢复、权限边界、审计正确性、远程任务管理。
- **目标用户**：重度 agent 用户、企业治理/合规场景、长时任务用户。
- **技术路线**：强调会话可信性、后台任务可见性、文档与行为一致性。
- **特点**：更像“可信赖的 AI 工作台”，而不是纯 CLI 助手。

### OpenAI Codex
- **功能侧重**：运行时编排、permission profile、MCP 路由、sandbox 稳定性。
- **目标用户**：power users、自动化工作流用户、平台/集成开发者。
- **技术路线**：底层能力编排很强，明显在向“agent runtime”靠拢。
- **特点**：工程化程度高，偏平台底座。

### Gemini CLI
- **功能侧重**：安装链路、文档反馈、MCP 正确性、成本/重试控制。
- **目标用户**：新用户与中度用户、偏实用的 CLI 使用者。
- **技术路线**：当前更像在补齐“可用性和正确性”的基础工程。
- **特点**：生态噪音偏高，说明产品入口与文档体验仍在磨合期。

### GitHub Copilot CLI
- **功能侧重**：命令行交互、会话恢复、移动端远程体验、跨平台基础稳定性。
- **目标用户**：GitHub 生态用户、终端工作流用户、团队协作用户。
- **技术路线**：偏交互体验与工作流一致性，平台化深度较轻。
- **特点**：更成熟、更产品化，问题集中在 UX 和平台兼容细节。

### Kimi Code CLI
- **功能侧重**：Web 工具稳定性、上下文压缩成本优化。
- **目标用户**：长会话、成本敏感、偏轻量使用者。
- **技术路线**：聚焦少数核心能力，问题较少但指向主流程成本。
- **特点**：社区规模较小，但需求很“硬核”，典型是效率和成本问题。

### OpenCode
- **功能侧重**：MCP 生态、provider 兼容、安全硬化、桌面稳定性。
- **目标用户**：高级开发者、MCP 集成用户、多模型用户。
- **技术路线**：明显在打造“AI 开发平台”，不是单点工具。
- **特点**：功能面最广之一，迭代活跃且平台属性强。

### Pi
- **功能侧重**：TUI 稳定性、并行 agent、可观测性、i18n、provider 扩展。
- **目标用户**：深度终端用户、偏交互效率的开发者、希望做复杂任务的用户。
- **技术路线**：强调体验和运行时双线演进，正向“现代化 agent TUI”升级。
- **特点**：用户体验讨论很强，产品形态较鲜明。

### Qwen Code
- **功能侧重**：成本控制、模型选择稳定、自动化可控性、发布流程治理。
- **目标用户**：重度自动化用户、模型敏感用户、需要稳定产线的开发者。
- **技术路线**：很强调默认行为、自动化任务、可配置性与安全边界。
- **特点**：发布节奏快，且对“默认策略”非常敏感。

### DeepSeek TUI
- **功能侧重**：TUI 稳定性、ACP/provider 暴露、模型数据库、i18n、运行时容错。
- **目标用户**：终端重度用户、需要多 provider 接入的用户。
- **技术路线**：一边补强底层鲁棒性，一边做产品化和国际化整理。
- **特点**：维护动作多，偏“持续工程化打磨”。

---

## 5) 社区热度与成熟度

### 社区更活跃的项目
按**Issue + PR 双活跃度**看，当前最活跃的是：
1. **OpenAI Codex**
2. **OpenCode**
3. **Qwen Code**
4. **Claude Code**
5. **Pi**

这些项目要么 PR 很密集，要么 Issue 与 PR 都在高位，说明都处在高强度迭代中。

### 更接近成熟产品化的项目
- **GitHub Copilot CLI**：版本已发布，问题更偏 UX、平台兼容与协作场景，呈现出较强的产品化特征。
- **Claude Code**：发布节奏稳定，问题集中于可信性、恢复和权限，说明已进入“精修阶段”。
- **Qwen Code**：虽然迭代很快，但已明显在治理模型选择、成本和自动化边界，呈现“产品化加速”特征。

### 更像快速迭代/架构演进中的项目
- **OpenAI Codex**：runtime、MCP、权限、能力编排都在快速重构。
- **OpenCode**：MCP-first、provider-first，明显还在扩展平台边界。
- **Pi**：并行 agent、TUI、i18n、模型生态都在同时推进。
- **DeepSeek TUI**：大量维护型 PR，说明还处于持续打磨和能力铺设阶段。
- **Gemini CLI**：安装噪音和基础正确性问题较多，仍在夯实入口体验。

### 相对小而聚焦
- **Kimi Code CLI**：讨论量少，但问题非常集中，说明产品场景更窄、反馈更聚焦。

---

## 6) 值得关注的趋势信号

### 趋势 1：AI CLI 正从“聊天工具”变成“任务运行时”
信号来自：
- 长会话恢复
- 后台 agent / cron / loop
- 远程会话重连
- 任务状态持久化
- tool-call / MCP 编排

**对开发者的价值**：未来竞争点不只是模型能力，而是**状态机设计、任务调度、恢复机制和可观测性**。

---

### 趋势 2：可信性开始压过“聪明程度”
信号来自：
- fixed/validated 误报
- 审计材料污染
- 治理文档不遵循
- 状态展示不准确
- 任务是否真的完成/停止

**对开发者的价值**：Agent 输出的“正确性、可审计性、可追踪性”已经是产品核心，而不是附加项。

---

### 趋势 3：权限与安全边界会成为采购级指标
信号来自：
- sandbox 误导提示
- Keychain / 凭据隔离
- 路径穿越删除
- 配置脱敏
- MCP OAuth 安全
- 本地环境变量污染

**对开发者的价值**：企业用户会越来越关注“默认是否安全”，而非“是否能配到安全”。

---

### 趋势 4：MCP/tool-call 正在成为 CLI 的通用基础设施
信号来自：
- 多个工具都在推进 MCP 身份、路由、资源模板、工具发现
- 相关问题开始进入安全、生命周期、跨 server、远程重连层面

**对开发者的价值**：谁能把 MCP 做成稳定、可控、可审计的运行时，谁就更接近下一代 AI 开发平台。

---

### 趋势 5：跨平台稳定性仍是“最后一公里”
信号来自：
- Windows、macOS、Linux、Termux、AppImage、Defender、Keychain、Bubblewrap 等问题反复出现

**对开发者的价值**：CLI 工具一旦进入真实生产环境，平台碎片化会迅速放大，必须把兼容性当成一线能力。

---

### 趋势 6：成本治理正在前置到产品设计阶段
信号来自：
- token 浪费
- 默认模型切换
- 无限重试/无限 quota 消耗
- 流式中断与重试策略
- reasoning token 统计

**对开发者的价值**：未来 AI CLI 的竞争，不只是效果，更是**可预测成本**。

---

如果你愿意，我还可以继续把这份报告压缩成：
1. **一页纸决策摘要版**，或  
2. **按“机会 / 风险 / 优先级”重排的管理层版本**。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下为基于你提供的数据整理的 **Claude Code Skills 社区热点报告**。  
**说明：PR 导出里未显示具体评论数，以下“热门 PR”按议题热度、关联 issue 讨论强度与影响面综合排序。**

---

## 1) 热门 Skills 排行

1. **[PR #1298](https://github.com/anthropics/skills/pull/1298)** — `skill-creator` / `run_eval` 评估链路修复  
   - **功能**：把 eval artifact 作为真实 skill 安装，修复 Windows 流读取、trigger detection、并行 worker 等问题。  
   - **社区热点**：这是“技能优化循环”为何总是 `recall=0%` 的核心修复，直接影响 `run_loop.py` / `improve_description.py`。  
   - **状态**：Open

2. **[PR #1099](https://github.com/anthropics/skills/pull/1099)** — `run_eval.py` Windows pipe 崩溃修复  
   - **功能**：解决 Windows 上 subprocess pipe 读取异常。  
   - **社区热点**：Windows 用户无法正常跑 skill 评估/优化，属于高优先级可用性问题。  
   - **状态**：Open

3. **[PR #1323](https://github.com/anthropics/skills/pull/1323)** — `run_eval` skill trigger detection 修复  
   - **功能**：修复“识别不到 skill 已触发、遇到第一个非 Skill 工具就退出”的逻辑。  
   - **社区热点**：和 #556/#1169 指向同一类问题：评估结果被系统性打成 `recall=0%`。  
   - **状态**：Open

4. **[PR #1050](https://github.com/anthropics/skills/pull/1050)** — `skill-creator` Windows 子进程与编码修复  
   - **功能**：修复 `claude.cmd` 启动、编码、Windows 兼容性等问题。  
   - **社区热点**：说明技能创作工具链在 Windows 上仍是明显痛点。  
   - **状态**：Open

5. **[PR #361](https://github.com/anthropics/skills/pull/361)** — YAML 特殊字符未加引号检测  
   - **功能**：在解析前检查 `description`/`compatibility` 等字段是否因 `:` `#` 等字符导致 YAML 误解析。  
   - **社区热点**：这是“技能元数据静默损坏”的典型问题，直接影响 skill 可加载性。  
   - **状态**：Open

6. **[PR #362](https://github.com/anthropics/skills/pull/362)** — UTF-8 多字节字符崩溃修复  
   - **功能**：把长度校验改成 byte-aware，避免 Rust panic。  
   - **社区热点**：对国际化文本、中文/日文内容的稳定性非常关键。  
   - **状态**：Open

7. **[PR #514](https://github.com/anthropics/skills/pull/514)** — `document-typography` 新技能  
   - **功能**：为 AI 生成文档提供排版质量控制，处理孤行、寡行、编号对齐等问题。  
   - **社区热点**：社区对“生成文档的可交付质量”需求很强，尤其是正式文档场景。  
   - **状态**：Open

8. **[PR #723](https://github.com/anthropics/skills/pull/723)** — `testing-patterns` 新技能  
   - **功能**：覆盖单元测试、React 组件测试、测试金字塔/Testing Trophy 等完整测试体系。  
   - **社区热点**：反映出社区对“自动生成高质量测试”的持续需求。  
   - **状态**：Open

---

## 2) 社区需求趋势

1. **评估/优化链路可靠性**  
   - `run_eval`、`run_loop`、`improve_description` 的正确性是高频诉求。  
   - 代表问题：**[Issue #556](https://github.com/anthropics/skills/issues/556)**、**[Issue #1169](https://github.com/anthropics/skills/issues/1169)**、**[Issue #1061](https://github.com/anthropics/skills/issues/1061)**

2. **Windows 兼容性**  
   - 社区多次反馈 subprocess、编码、pipe 读取等问题。  
   - 代表问题：**[Issue #1061](https://github.com/anthropics/skills/issues/1061)**、**[Issue #556](https://github.com/anthropics/skills/issues/556)**

3. **Skills 分发、共享与安装体验**  
   - 期待 org 级共享、直接分发链接、避免重复安装与插件内容冲突。  
   - 代表问题：**[Issue #228](https://github.com/anthropics/skills/issues/228)**、**[Issue #189](https://github.com/anthropics/skills/issues/189)**

4. **安全边界与命名空间治理**  
   - 社区对 `anthropic/` 命名空间被社区技能“借壳”的信任风险非常敏感。  
   - 代表问题：**[Issue #492](https://github.com/anthropics/skills/issues/492)**

5. **更偏实战的“生产力技能”**  
   - 新需求集中在：测试生成、文档排版、代码库审计、长期记忆、部署自动化、治理类技能。  
   - 代表问题：**[Issue #412](https://github.com/anthropics/skills/issues/412)**、**[Issue #147](https://github.com/anthropics/skills/issues/147)**、**[Issue #154](https://github.com/anthropics/skills/issues/154)**、**[Issue #1329](https://github.com/anthropics/skills/issues/1329)**

---

## 3) 高潜力待合并 Skills

这些 PR 以“修复工具链 + 解决高频痛点”为主，落地概率最高：

- **[PR #1298](https://github.com/anthropics/skills/pull/1298)**：修复 `run_eval` 评估失真，属于基础设施级补丁。  
- **[PR #1323](https://github.com/anthropics/skills/pull/1323)**：补上 trigger detection 漏洞，和 #556/#1169 强相关。  
- **[PR #1099](https://github.com/anthropics/skills/pull/1099)**：Windows 兼容性关键修复，阻塞面明确。  
- **[PR #1050](https://github.com/anthropics/skills/pull/1050)**：同样属于 Windows 必修补丁，变更小、收益高。  
- **[PR #361](https://github.com/anthropics/skills/pull/361)**、**[PR #362](https://github.com/anthropics/skills/pull/362)**：分别解决 YAML 误解析与 UTF-8 崩溃，属于“高稳定性、低争议”修复。  
- **[PR #514](https://github.com/anthropics/skills/pull/514)**、**[PR #723](https://github.com/anthropics/skills/pull/723)**：新技能方向明确，分别对应文档质量与测试生成两大高频场景。

---

## 4) Skills 生态洞察

**一句话总结：社区当前最集中的诉求是——先把 Skills 基础设施做稳定、可评估、跨平台可用，再持续扩展到文档质量、测试生成、协作共享和安全治理等“可交付型”技能。**

---

# Claude Code 社区动态日报（2026-06-25）
数据源：`github.com/anthropics/claude-code`

## 1) 今日速览
今天最重要的变化是 **v2.1.191 已发布**，重点修复了会话回溯（`/rewind`）、流式输出滚动跳动、以及后台 agent 被停止后“复活”的问题。  
社区讨论则明显集中在三类主题：**Agent 可信度/审计正确性、权限与沙箱边界、以及会话/远程任务的可恢复性与可见性**。  
同时，今天新增了不少文档补丁型 Issue，说明新版本行为已经开始对文档同步提出压力。

---

## 2) 版本发布

### v2.1.191
- 新增 `/rewind`：支持从执行 `/clear` 之前的对话状态恢复。
- 修复流式响应时，阅读历史输出会自动跳到底部的问题。
- 修复后台 agent 停止后又“复活”的问题。

链接：  
- [v2.1.191 Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.191)

### v2.1.190
- 主要是常规 bug fix 和可靠性改进。

链接：  
- [v2.1.190 Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.190)

---

## 3) 社区热点 Issues（10 个）

> 说明：以下优先挑选了今天最能代表社区关注方向的 Issue。多数条目评论数不高，但都指向明确、可复现的产品痛点。

1. **[#70713](https://github.com/anthropics/claude-code/issues/70713)**  
   **Agent 误报“fixed/validated”且参与修改审计材料**  
   重要性：直接触及 **Agent 可信度、状态报告准确性、审计边界**，属于高风险质量问题。  
   社区反应：当前仅 2 条评论，但问题描述非常具体，说明这是“高严重度、低噪音”的信任类反馈。

2. **[#70715](https://github.com/anthropics/claude-code/issues/70715)**  
   **Claude Code 未能在关键决策点稳定遵循用户治理文档**  
   重要性：与企业治理、合规和规则执行一致性强相关。  
   社区反应：暂无评论，但属于典型的“模型行为不稳定”问题，值得优先关注。

3. **[#70700](https://github.com/anthropics/claude-code/issues/70700)**  
   **Windows Server 2025 累积更新导致 MSIX 注册失效**  
   重要性：典型的 **Windows 兼容性/部署链路故障**，对企业桌面部署影响较大。  
   社区反应：已有 2 条评论，说明该问题不是孤例，且复现条件很明确。

4. **[#70711](https://github.com/anthropics/claude-code/issues/70711)**  
   **sandbox 允许路径内仍弹权限提示，容易误导用户放宽 sandbox**  
   重要性：涉及 **权限模型正确性**，如果提示不准，用户会被训练去添加不必要的 `permissions.allow`。  
   社区反应：已有 1 条评论，属于“交互误导型”安全问题。

5. **[#70697](https://github.com/anthropics/claude-code/issues/70697)**  
   **macOS 上 CLAUDE_CONFIG_DIR 不能隔离 Keychain 凭据**  
   重要性：涉及账号隔离、配置隔离和凭据安全，影响多环境/多账号使用场景。  
   社区反应：已有 repro，说明问题路径较清晰，适合尽快修复。

6. **[#70693](https://github.com/anthropics/claude-code/issues/70693)**  
   **foreground session 生成的 PR，在 `/bg` 后未正确链接到 agents-view**  
   重要性：后台/前台会话切换后，任务归属和可追踪性出问题，影响协作与审计。  
   社区反应：已有 1 条评论，场景很具体，偏向产品一致性问题。

7. **[#70686](https://github.com/anthropics/claude-code/issues/70686)**  
   **终止的远程会话留下的后台任务仍显示 Running，且无法清理**  
   重要性：属于典型的 **状态悬挂/资源残留**，会影响远程控制和多会话管理。  
   社区反应：评论不多，但问题对“远程会话管理”是硬伤级别。

8. **[#70677](https://github.com/anthropics/claude-code/issues/70677)**  
   **希望把转录拆成双栏：assistant 输出与 tool-call 输出分离**  
   重要性：长任务、工具密集型场景下，当前单线性 transcript 可读性不足。  
   社区反应：这类 UI 改进通常不靠大量评论，但很能代表资深用户的效率诉求。

9. **[#70678](https://github.com/anthropics/claude-code/issues/70678)**  
   **聊天中用户消息的上下跳转键位导航需求**  
   重要性：提升长对话中的回顾效率，属于高频使用场景的生产力优化。  
   社区反应：需求清晰，评论虽少，但很典型地反映了键盘流用户的诉求。

10. **[#70679](https://github.com/anthropics/claude-code/issues/70679)**  
    **“Server is temporarily limiting requests” 应自动指数退避重试**  
    重要性：直接关系到 **API 限流场景下的会话连续性**，也是今天 PR 中最相关的修复方向。  
    社区反应：该 Issue 已被关闭为 duplicate，但有 1 个 👍，说明需求真实且已被多次提出。

---

## 4) 重要 PR 进展

> 说明：当前数据中，过去 24 小时内可见且更新的 PR 仅 4 个，因此以下为全部列出。

1. **[PR #70634](https://github.com/anthropics/claude-code/pull/70634)**  
   **fix: handle server rate limiting during normal usage**  
   重点：修复正常使用时遇到服务端限流的处理逻辑，和今天的限流类 Issue 高度相关。

2. **[PR #70633](https://github.com/anthropics/claude-code/pull/70633)**  
   **fix: Handle rate limiting headers for Anthropic API**  
   重点：补齐 Anthropic API 的限流头处理，通常会影响重试策略、退避时机与错误提示质量。

3. **[PR #70582](https://github.com/anthropics/claude-code/pull/70582)**  
   **fix: the application accepts user-controlled urls... in llm.py**  
   重点：修复 `plugins/security-guidance/hooks/llm.py` 中的高危安全问题，属于安全优先级较高的修补。

4. **[PR #70538](https://github.com/anthropics/claude-code/pull/70538)**  
   **fix: sanitize subprocess call in gitutil.py**  
   重点：修复 `plugins/security-guidance/hooks/gitutil.py` 的子进程调用安全问题，降低命令注入/参数污染风险。

---

## 5) 功能需求趋势

从今天的 Issues 看，社区关注正在明显向以下方向集中：

- **会话恢复与历史回溯**
  - `/rewind`、`/bg`、远程会话重新接入、用户消息跳转等需求集中出现。
  - 说明用户已经把 Claude Code 当作“长时任务工作台”，而不是单次问答工具。

- **权限、沙箱与凭据隔离**
  - 关键词包括：sandbox、permissions、Keychain、managed settings、auto mode。
  - 社区希望权限模型更准确、提示更可信、隔离更彻底。

- **稳定性与限流友好性**
  - rate limit、后台 agent 状态、远程任务残留、Windows 兼容性问题都在今天出现。
  - 说明“不中断、可恢复、可重试”是当前体验核心。

- **UI/可用性优化**
  - transcript 分栏、键盘导航、状态提示、文档提示等都在补足高频使用场景。
  - 这类需求表明资深用户正进入深度使用阶段，对效率细节更敏感。

- **Agent 可信与治理**
  - 包括“已验证”误报、治理文档未被正确遵循、审计材料混淆等。
  - 这是从“能用”走向“可托付”的关键门槛。

---

## 6) 开发者关注点

今天的反馈里，开发者最该留意的痛点有：

- **状态报告不能“看起来对”，必须“真的对”**  
  尤其是 fixed/validated、审计结果、任务完成状态这类高信任信息。

- **权限提示与实际权限边界要一致**  
  否则用户会被误导去做更宽的 allow 配置，反而扩大风险面。

- **文档更新要跟上行为变更**  
  今天大量 doc issue 都是在补 v2.1.191 新行为的说明，说明文档同步节奏需要加强。

- **远程/后台/多会话状态管理仍是高风险区**  
  包括 `/bg`、remote-control、terminated session、agents-view 联动等。

- **限流和网络抖动下的体验还需要继续打磨**  
  自动重试、指数退避、提示一致性，已经成为明确的社区期待。

- **跨平台兼容性仍然是桌面产品的硬指标**  
  macOS Keychain、Windows Server/MSIX、Linux sandbox 等问题都在今天出现。

如果你希望，我也可以把这份日报进一步整理成 **适合发到团队群的“精简版”**，或输出成 **Markdown 表格版**。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-06-25）

## 1) 今日速览
过去 24 小时，Codex 社区讨论明显集中在 **Windows / sandbox / 网络代理兼容性**、**线程与权限状态持久化**、以及 **MCP / tool-calls 的稳定性** 上。  
同时，仓库在能力编排、MCP 身份/路由、以及执行器准备流程上持续推进，说明团队正在强化 Codex 的底层运行时与多环境一致性。  

---

## 2) 版本发布
- [rust-v0.142.1](https://github.com/openai/codex/releases/tag/rust-v0.142.1) —— 新增 **Windows 系统代理认证支持**，覆盖 PAC、WPAD、静态代理和绕过规则；这对企业网络、受限网络环境下的登录与连通性很关键。  
- [rust-v0.143.0-alpha.15](https://github.com/openai/codex/releases/tag/rust-v0.143.0-alpha.15) / [rust-v0.143.0-alpha.14](https://github.com/openai/codex/releases/tag/rust-v0.143.0-alpha.14) —— 继续发布 alpha 版本，但当前展示信息里没有细化 changelog，说明仍处在快速迭代阶段。  

---

## 3) 社区热点 Issues

1. [#29915 Permission / approval mode does not persist when changed on existing threads](https://github.com/openai/codex/issues/29915)  
   - 重要性：影响**既有线程**中的权限/approval 模式切换，属于“工作流状态不一致”的高优先级问题。  
   - 社区反应：**4 条评论**，是当前最活跃的 issue 之一，说明痛点明确且容易复现。

2. [#29922 Feature: an agent-callable `monitor` tool that wakes Codex on background events](https://github.com/openai/codex/issues/29922)  
   - 重要性：这是一个高价值能力需求，核心是让 Codex 能对 **日志、文件、CI、构建** 的后台事件被动唤醒，减少 polling。  
   - 社区反应：**2 条评论**，表明对“后台感知/事件驱动”需求已有共识。

3. [#29908 apply_patch and managed sandbox fail with Bubblewrap loopback/userns errors on Ubuntu 24.04](https://github.com/openai/codex/issues/29908)  
   - 重要性：直接影响 Linux sandbox 执行链路，属于 **工具调用前置失败**，会阻断 apply_patch 和普通命令。  
   - 社区反应：**2 条评论**，主要集中在环境与复现信息，问题定位价值高。

4. [#29876 Excessive disk writes / SSD wear concern on macOS Codex app and JetBrains ACP](https://github.com/openai/codex/issues/29876)  
   - 重要性：涉及 **磁盘写入过多** 和潜在 SSD 损耗，属于性能与可靠性双重风险。  
   - 社区反应：**2 条评论**，且横跨 macOS App 与 JetBrains ACP，说明不是单点问题。

5. [#29866 Codex IDE chat loses SSH/network access after idle/resume in same conversation](https://github.com/openai/codex/issues/29866)  
   - 重要性：影响远程/SSH 会话恢复，属于 IDE 集成场景下的 **连接保持与续航** 问题。  
   - 社区反应：**2 条评论**，说明交互式远程工作流存在稳定性隐患。

6. [#29857 codex exec silently auto-cancels MCP tool calls regardless of default_tools_approval_mode](https://github.com/openai/codex/issues/29857)  
   - 重要性：`codex exec` 与 MCP 审批策略不一致，影响非交互场景自动化可靠性。  
   - 社区反应：**2 条评论**，是 CLI 自动化用户会直接遇到的问题。

7. [#29858 Windows: Opening Codex tab in non-Git workspace causes continuous git.exe spawning and high Defender CPU](https://github.com/openai/codex/issues/29858)  
   - 重要性：Windows 下在非 Git 工作区也触发持续 `git.exe`，属于典型的 **后台资源误用** 问题。  
   - 社区反应：**2 条评论**，且与 Defender CPU 飙高相关，用户感知非常强。

8. [#29854 Codex Windows app-server saturates upload bandwidth and causes packet loss](https://github.com/openai/codex/issues/29854)  
   - 重要性：直接影响网络带宽与连接质量，可能造成上传拥塞和丢包。  
   - 社区反应：**2 条评论**，属于影响面较大的 Windows 性能问题。

9. [#29933 curated-plugin sync runs `git reset --hard` against the user's project repo](https://github.com/openai/codex/issues/29933)  
   - 重要性：带有潜在破坏性，涉及用户项目仓库被执行 `git reset --hard`，风险极高。  
   - 社区反应：**1 条评论**，虽然讨论不多，但安全/数据完整性优先级很高。

10. [#29848 BUG Codex Windows 404 Not Found Model not found gpt-5.5](https://github.com/openai/codex/issues/29848)  
    - 重要性：模型不可用直接影响核心功能可用性，属于“服务发现/模型路由”层面的关键障碍。  
    - 社区反应：**2 条评论**，说明这是用户可见的明确故障。

---

## 4) 重要 PR 进展

1. [#29946 Activate selected capabilities at sampling boundaries](https://github.com/openai/codex/pull/29946)  
   - 在采样边界激活已选能力，避免线程启动时阻塞，强化 runtime 预热流程。

2. [#29945 Inspect turn hooks before runtime preparation](https://github.com/openai/codex/pull/29945)  
   - 将 turn hook 检查前置到 runtime 准备之前，优化会话启动与拦截时机。

3. [#29944 Route MCP elicitation IDs across managers](https://github.com/openai/codex/pull/29944)  
   - 为 MCP elicitation ID 增加 manager 级路由，解决多 manager 场景下的 ID 冲突问题。

4. [#29943 Prepare selected capability runtime snapshots](https://github.com/openai/codex/pull/29943)  
   - 引入按 generation 组织的 capability snapshot，提升能力发布的一致性与可缓存性。

5. [#29941 core: expose permission profile to shell tools](https://github.com/openai/codex/pull/29941)  
   - 让 shell tools 能感知当前命名 permission profile，支持嵌套命令保持一致的 sandbox/network 语义。

6. [#29934 Emit app name and template ID in MCP app context](https://github.com/openai/codex/pull/29934)  
   - 在 MCP 上下文中补充 appName 与 templateId，提升工具调用审计和上下文识别能力。

7. [#29931 Share executor-bound capability roots across consumers](https://github.com/openai/codex/pull/29931)  
   - 让多个消费者共享同一 executor 绑定的 capability root，减少重复解析与不一致风险。

8. [#29930 Track selected capability readiness per executor](https://github.com/openai/codex/pull/29930)  
   - 按 executor 跟踪能力就绪状态，为动态 executor 提供更清晰的源事实。

9. [#29926 Persist selected capability bindings across thread reloads](https://github.com/openai/codex/pull/29926)  
   - 将 selectedCapabilityRoots 持久化到 session metadata，解决线程重载后丢失能力绑定的问题。

10. [#29924 Represent MCP authentication with an enum](https://github.com/openai/codex/pull/29924)  
    - 用枚举表达 MCP 认证类型，清晰区分 OAuth 与 ChatGPT session 流程，增强配置模型表达力与安全边界。

---

## 5) 功能需求趋势
从今天的 Issues 看，社区最关注的方向主要有以下几类：

- [**Windows 平台兼容性**](https://github.com/openai/codex/issues/29858)  
  代理、sandbox、文件系统、Defender、网络连接等问题集中爆发，说明 Windows 端仍是核心优化区。

- [**Sandbox / 命令执行稳定性**](https://github.com/openai/codex/issues/29908)  
  Bubblewrap、apply_patch、fs-helper、managed sandbox 等链路需要更强的容错与环境适配。

- [**会话与线程状态持久化**](https://github.com/openai/codex/issues/29915)  
  权限模式、ghost conversation、session 恢复、compaction 后状态异常，都是“状态一致性”相关诉求。

- [**性能与资源占用**](https://github.com/openai/codex/issues/29876)  
  磁盘写入、CPU、上传带宽、内存分配等问题反复出现，社区对轻量化和后台开销非常敏感。

- [**MCP / tool-calls 自动化能力**](https://github.com/openai/codex/issues/29857)  
  用户希望 Codex 更像“可被后台事件驱动的 agent”，而不是完全依赖轮询和显式交互。

- [**IDE / App / CLI 多端一致性**](https://github.com/openai/codex/issues/29866)  
  Desktop、CLI、VS Code、JetBrains、remote session 的行为差异正在成为体验痛点。

---

## 6) 开发者关注点
结合今天的反馈，开发者最该优先关注的是：

- [**权限/审批状态不要在线程间丢失**](https://github.com/openai/codex/issues/29915)  
- [**MCP tool-call 审批策略要在 CLI 与交互端保持一致**](https://github.com/openai/codex/issues/29857)  
- [**Windows 上的 sandbox、代理、网络与 Git 探测要降低副作用**](https://github.com/openai/codex/issues/29858)  
- [**资源占用要可控：磁盘、CPU、带宽、内存**](https://github.com/openai/codex/issues/29876)  
- [**会话恢复、重载、compaction 后的状态完整性**](https://github.com/openai/codex/issues/29868)  
- [**后台事件唤醒与长任务监控能力**](https://github.com/openai/codex/issues/29922)  
- [**模型可用性与限额提示要更透明**](https://github.com/openai/codex/issues/29848)  

如果你愿意，我可以把这份日报进一步整理成 **适合内部周报/晨会的精简版**，或输出为 **Markdown 表格版**。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-06-25）

## 今日速览
今天没有新 Release，社区动向几乎全部集中在 Issues 与小型修复 PR 上。  
最值得关注的是两个高优先级技术问题：一个是 **cascade trajectory manager 可能因缺失 task log 导致无限重试和 quota 消耗**，另一个是 **MCP 资源跨服务器查找存在 URI 误判风险**。与此同时，`geminicli.com` 与安装页相关的重复反馈仍然占据大量讨论，说明文档与反馈入口的可用性仍是社区高频痛点。

## 社区热点 Issues
> 本日更新的 14 个 Issue 中，绝大多数都与文档/安装反馈重复提交有关；以下选取 10 个最值得关注的代表条目。

1. **[#28135](https://github.com/google-gemini/gemini-cli/issues/28135) — Cascade trajectory manager 可能无限消耗 quota**  
   这是今天最严重的技术问题之一：用户指出 AGY migration 后，manager 会因缺失 task log 进入无上限重试循环。  
   **重要性：** 直接关系到资源消耗与成本风险。  
   **社区反应：** `OPEN + need-triage`，已有 2 条评论和 1 个赞，说明问题已引起注意。

2. **[#28128](https://github.com/google-gemini/gemini-cli/issues/28128) — MCP 跨服务器资源 URI 混淆**  
   `findResourceByUri` 的 fallback 逻辑可能跨所有 server 盲扫资源，存在资源定位错误的风险。  
   **重要性：** 属于多服务器场景下的正确性问题，可能影响 MCP 资源读取一致性。  
   **社区反应：** 当前无评论，但已进入 `need-triage`，属于值得尽快确认的架构级 bug。

3. **[#28129](https://github.com/google-gemini/gemini-cli/issues/28129) — 非交互模式下的 cross-repo PR 创建能力诉求**  
   用户希望 `gh pr create -H user:branch` 能覆盖更通用的跨仓库 PR 流程。  
   **重要性：** 反映了高级用户对自动化 GitHub 工作流的需求。  
   **社区反应：** `enhancement`，已有 1 条评论，说明需求明确但仍在收敛中。

4. **[#28117](https://github.com/google-gemini/gemini-cli/issues/28117) — 安装文档/反馈页重复问题簇**  
   该条反馈被标记为与多个历史问题重复，集中在安装与文档链路。  
   **重要性：** 反映官方站点与安装流程仍在持续制造重复反馈。  
   **社区反应：** `bot-triaged`，未见实质讨论，典型的高噪音重复问题。

5. **[#28118](https://github.com/google-gemini/gemini-cli/issues/28118) — `geminicli.com` 反馈页重复提交**  
   用户在官网反馈页提交的内容被识别为多个历史安装问题的重复。  
   **重要性：** 说明官网反馈入口与安装文档的关联问题仍未完全消解。  
   **社区反应：** `possible-duplicate + bot-triaged`，有 2 条评论，但仍以重复标记为主。

6. **[#28119](https://github.com/google-gemini/gemini-cli/issues/28119) — 安装页反馈重复簇**  
   指向 `https://geminicli.com/docs/get-started/installation/` 的安装反馈，仍然与既有问题高度重叠。  
   **重要性：** 安装页面是新用户第一接触点，这类重复反馈会显著放大支持成本。  
   **社区反应：** `bot-triaged`，评论较少，但重复链条明显。

7. **[#28120](https://github.com/google-gemini/gemini-cli/issues/28120) — 安装页重复反馈继续出现**  
   同样来自安装页面，且被标记为多个已知问题的重复。  
   **重要性：** 表明安装文档中的核心困惑点尚未被完全修正。  
   **社区反应：** `bot-triaged`，低讨论度，但属于高频噪音来源。

8. **[#28121](https://github.com/google-gemini/gemini-cli/issues/28121) — `gcloud config list account` 相关安装问题**  
   用户在安装流程中卡在 `gcloud config list account` 这一步。  
   **重要性：** 直接影响安装成功率，且对 GCP 环境依赖较强的用户尤其敏感。  
   **社区反应：** `need-information`，已有 1 条评论，说明仍需补充环境信息定位。

9. **[#28133](https://github.com/google-gemini/gemini-cli/issues/28133) — 官网反馈页重复举报（安装/文档相关）**  
   这类问题继续出现在 `geminicli.com` 反馈入口中，且与多个历史 issue 重叠。  
   **重要性：** 代表官网反馈机制仍在持续产出重复噪音。  
   **社区反应：** 2 条评论，已被 `possible-duplicate` 与 `bot-triaged` 处理。

10. **[#28134](https://github.com/google-gemini/gemini-cli/issues/28134) — 官网反馈页重复举报（另一条同类）**  
   与 #28133 同类，明显是官网安装反馈的重复簇延续。  
   **重要性：** 说明重复问题不是个例，而是持续性集中爆发。  
   **社区反应：** 同样为 `possible-duplicate + bot-triaged`，2 条评论，未见新信息。

## 重要 PR 进展
> 今日仅有 4 条 PR 更新，以下全部列出。

1. **[#28132](https://github.com/google-gemini/gemini-cli/pull/28132) — 修复 release verification 中 workspace binary 被 shadowing 的问题**  
   **状态：** 已关闭。  
   **价值：** 避免 CI 在发布验证阶段误跑 workspace 源码，而不是已发布的 NPM 包，提升发布可信度。

2. **[#28131](https://github.com/google-gemini/gemini-cli/pull/28131) — 修复 `NO_PROXY` 环境下的测试失败**  
   **状态：** Open，`need-issue`。  
   **价值：** 强化测试在不同网络环境中的稳定性，减少环境变量带来的偶发失败。

3. **[#28130](https://github.com/google-gemini/gemini-cli/pull/28130) — 改善 “Install source not found” 错误信息**  
   **状态：** 已关闭。  
   **价值：** 让安装源缺失时的报错更可操作，降低新用户排障成本。

4. **[#28126](https://github.com/google-gemini/gemini-cli/pull/28126) — 多行编辑片段显示省略号优化**  
   **状态：** Open。  
   **价值：** 改善编辑确认 UI 对多行修改的表达，减少用户误判变更范围。

## 功能需求趋势
从今天的 Issues 看，社区关注点非常集中：

1. **安装与文档体验优化**  
   大量问题都来自 `geminicli.com` 与安装页面，说明新用户上手路径仍是首要痛点。  
   重点诉求：更清晰的安装步骤、减少重复反馈、改善错误指引。

2. **运行时稳定性与资源控制**  
   #28135 反映出用户对“无限重试、无上限 quota 消耗”非常敏感。  
   重点诉求：更强的重试保护、任务日志一致性、成本可控。

3. **MCP 多服务器场景的正确性**  
   #28128 暗示跨 server 资源解析需要更严格的作用域隔离。  
   重点诉求：资源 URI 解析不能依赖模糊 fallback。

4. **非交互式 GitHub 工作流自动化**  
   #28129 显示用户希望 CLI 更好支持跨仓库 PR 这类高级协作场景。  
   重点诉求：面向 power users 的 GitHub automation 能力。

## 开发者关注点
- **重复文档反馈过多**：安装页与官网反馈入口持续产生 duplicate，说明需要更强的去重、路由和引导机制。  
- **资源正确性优先级上升**：MCP 资源跨 server 查找、cascade retry loop 都属于“看似边缘、实际高风险”的稳定性问题。  
- **测试与发布链路在补强**：`NO_PROXY`、release verification、错误信息改善，说明团队在持续收紧 CI/发布质量。  
- **用户希望更少“猜测式排障”**：无论是安装错误还是编辑确认 UI，社区都倾向于更明确、更可执行的提示。  

如果你希望，我也可以把这份日报再压缩成 **“管理层摘要版”** 或整理成 **适合 Slack/飞书发布的短消息格式**。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

以下为 **2026-06-25 GitHub Copilot CLI 社区动态日报**（基于过去 24 小时 GitHub 数据）：

---

## 1. 今日速览
过去 24 小时内，Copilot CLI 重点围绕 **会话体验修复、命令行交互优化、跨平台兼容性** 展开，且已发布 **v1.0.65**。同时，社区集中反馈了多个高频痛点：`/cd`、`/compact`、会话恢复、终端渲染、移动端远程会话能力，以及 Linux/Windows 平台问题。  
链接：
- Release v1.0.65：https://github.com/github/copilot-cli/releases/tag/v1.0.65
- Issues 总览：https://github.com/github/copilot-cli/issues

---

## 2. 版本发布
### v1.0.65（2026-06-24）
本次版本以 **稳定性与交互修复** 为主：
- `/cd` 现在会 **持久化工作目录**，恢复会话时可回到原目录，并能在新目录中发现自定义 agents。
- 以斜杠开头的字符串参数（如 `--body "/azp run"`）不再错误触发文件系统权限提示。
- 还有一项与全屏时间线相关的 UI 修复（发行说明在当前数据中被截断）。

链接：
- Release v1.0.65：https://github.com/github/copilot-cli/releases/tag/v1.0.65

---

## 3. 社区热点 Issues
下面挑选 10 个最值得关注的 Issue，优先覆盖了影响面大、讨论价值高、或与新版本直接相关的问题。

### 1) 恢复会话时模型选择为空
- Issue #3913（已关闭）  
- 重要性：这是典型的“会话恢复可用性”问题，直接影响用户继续上次上下文工作的能力。
- 社区反应：有 3 条评论，且已关闭，说明问题被较快定位/处理。
- 链接：https://github.com/github/copilot-cli/issues/3913

### 2) `/cd` 自动补全的键盘交互不一致
- Issue #3918（开放）  
- 重要性：`/cd` 是本次 release 的重点功能，补全/确认/退出菜单的行为不一致会显著降低可用性。
- 社区反应：暂无评论，但属于高频基础交互问题，后续很可能继续被追踪。
- 链接：https://github.com/github/copilot-cli/issues/3918

### 3) 之前的 prompt 在编辑后丢失
- Issue #3926（开放）  
- 重要性：这是输入编辑流程的数据一致性问题，会直接影响用户体验和历史记录可信度。
- 社区反应：新近提交但尚无评论，说明问题较新，值得观察。
- 链接：https://github.com/github/copilot-cli/issues/3926

### 4) Linux AppImage 泄漏 `LD_LIBRARY_PATH`，导致 git HTTPS 失败
- Issue #3925（开放）  
- 重要性：这是阻断级平台问题，影响会话创建和 Git HTTPS 通信，属于“安装即不可用”级别。
- 社区反应：暂无评论，但从描述看影响较大，应该是优先级较高的兼容性缺陷。
- 链接：https://github.com/github/copilot-cli/issues/3925

### 5) 手机端远程会话无法发送 `!shell` 命令
- Issue #3924（已关闭）  
- 重要性：体现了移动端与桌面端能力不对齐的问题，影响远程协作场景。
- 社区反应：1 条评论，说明需求明确、场景具体。
- 链接：https://github.com/github/copilot-cli/issues/3924

### 6) 手机端远程会话无法上传文件/图片
- Issue #3923（已关闭）  
- 重要性：文件/图片输入是 AI 助手的重要输入方式，缺失会大幅削弱移动端实用性。
- 社区反应：1 条评论，说明这是清晰的产品预期缺口。
- 链接：https://github.com/github/copilot-cli/issues/3923

### 7) 手机端远程会话无法发送 `/` slash 命令
- Issue #3922（已关闭）  
- 重要性：`/compact`、`/cd`、`/help` 等是 CLI 核心操作，移动端不支持会导致功能断层。
- 社区反应：1 条评论，说明社区对移动端功能对齐有明确期待。
- 链接：https://github.com/github/copilot-cli/issues/3922

### 8) Markdown 渲染：两个 em-dash 触发误判删除线
- Issue #3920（已关闭）  
- 重要性：属于输出渲染正确性问题，会影响 agent 输出的可读性与专业感。
- 社区反应：1 条评论，问题虽小但直接影响展示质量。
- 链接：https://github.com/github/copilot-cli/issues/3920

### 9) `/compact` 的活动指示器与消息队列状态错位
- Issue #3915（开放）  
- 重要性：这类上下文压缩与消息流状态问题，容易让用户误判消息是否已送达模型。
- 社区反应：尚无评论，但涉及核心交互链路，值得持续关注。
- 链接：https://github.com/github/copilot-cli/issues/3915

### 10) 企业/组织级本地 CLI 配置管理需求
- Issue #3909（开放）  
- 重要性：这是面向企业落地的关键能力，涉及组织统一配置、环境变量下发和治理能力。
- 社区反应：暂无评论，但从题目看属于中长期平台能力建设方向。
- 链接：https://github.com/github/copilot-cli/issues/3909

---

## 4. 重要 PR 进展
过去 24 小时内 **没有 PR 更新**（共 0 条），因此本节无可列举的 PR 进展。

- PR 列表：https://github.com/github/copilot-cli/pulls

---

## 5. 功能需求趋势
从全部 Issues 来看，社区关注点主要集中在以下几个方向：

1. **会话恢复与上下文连续性**
   - 如模型选择恢复、session-state 目录异常、`/compact` 行为一致性等。
   - 代表 Issue：#3913、#3908、#3915  
   - 链接：
     - https://github.com/github/copilot-cli/issues/3913
     - https://github.com/github/copilot-cli/issues/3908
     - https://github.com/github/copilot-cli/issues/3915

2. **命令行交互与键盘体验**
   - `/cd` 补全、历史 prompt 编辑、queued/pending 语义、插件安装的自动补全需求都很集中。
   - 代表 Issue：#3926、#3918、#3919、#3917  
   - 链接：
     - https://github.com/github/copilot-cli/issues/3926
     - https://github.com/github/copilot-cli/issues/3918
     - https://github.com/github/copilot-cli/issues/3919
     - https://github.com/github/copilot-cli/issues/3917

3. **移动端/远程会话能力补齐**
   - 社区明显希望 GitHub Mobile 上的远程 Copilot CLI 体验接近桌面端，包括命令、文件、图片输入。
   - 代表 Issue：#3922、#3923、#3924  
   - 链接：
     - https://github.com/github/copilot-cli/issues/3922
     - https://github.com/github/copilot-cli/issues/3923
     - https://github.com/github/copilot-cli/issues/3924

4. **跨平台稳定性与安装/网络问题**
   - Linux AppImage、Windows LSP、HTTPS/git 依赖等问题表明平台兼容仍是关键痛点。
   - 代表 Issue：#3925、#3912  
   - 链接：
     - https://github.com/github/copilot-cli/issues/3925
     - https://github.com/github/copilot-cli/issues/3912

5. **模型能力与 BYOK 支持**
   - BYOK 报错、模型选择空白、`/changelog summarize` 是否消耗 token 等问题，说明模型层能力与计费/性能预期仍在磨合。
   - 代表 Issue：#3911、#3910、#3913  
   - 链接：
     - https://github.com/github/copilot-cli/issues/3911
     - https://github.com/github/copilot-cli/issues/3910
     - https://github.com/github/copilot-cli/issues/3913

6. **企业治理与高级工作流**
   - 包括 org 级配置、worktree 规则、`/diff` base branch 选择等，体现了向团队/企业场景延伸的需求。
   - 代表 Issue：#3909、#3914、#3903  
   - 链接：
     - https://github.com/github/copilot-cli/issues/3909
     - https://github.com/github/copilot-cli/issues/3914
     - https://github.com/github/copilot-cli/issues/3903

---

## 6. 开发者关注点
从开发者反馈看，当前高频痛点主要有：

- **会话状态可靠性**：恢复会话后模型选择、工作目录、session-state 目录等细节仍会影响连续工作体验。  
  链接：https://github.com/github/copilot-cli/issues/3913

- **命令交互的可预测性**：`/cd`、`/compact`、历史编辑、插件管理都在要求更一致的键盘与菜单行为。  
  链接：https://github.com/github/copilot-cli/issues/3918

- **移动端远程协作缺口**：用户希望在 GitHub Mobile 上完成与桌面一致的命令、文件、图片输入。  
  链接：https://github.com/github/copilot-cli/issues/3922

- **平台兼容与环境污染问题**：Linux AppImage 的 `LD_LIBRARY_PATH` 泄漏、Windows LSP 异常说明发布形态仍需强化。  
  链接：https://github.com/github/copilot-cli/issues/3925

- **输出展示的正确性**：Markdown 渲染、输入框截断、活动指示器错位等 UI 细节会直接影响专业工具的可信度。  
  链接：https://github.com/github/copilot-cli/issues/3920

- **企业级治理诉求上升**：组织统一配置、本地环境变量下发、仓库/分支工作流约束等需求开始变得更明确。  
  链接：https://github.com/github/copilot-cli/issues/3909

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **更适合发 Slack/飞书的短版**，或  
2. **适合管理层阅读的“影响面 + 风险等级”版**。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报  
**日期：2026-06-25**  
**数据源：github.com/MoonshotAI/kimi-cli**

## 1) 今日速览
过去 24 小时内，仓库没有新版本发布，社区主要关注点集中在 **Web 工具链稳定性** 和 **上下文压缩后的 token 浪费** 两类问题上。  
整体来看，Issue 数量不多，但都指向核心使用体验：一个是会直接影响工作流的 `/web` 报错，另一个是可能持续拉高推理成本的上下文重载问题。

---

## 2) 版本发布
**无新 Releases。**  
过去 24 小时内未检测到版本更新。

---

## 3) 社区热点 Issues

> 说明：过去 24 小时内仅有 **2 条更新 Issue**，以下为全部热点。

### 1. [#2472] Context compaction 后重新加载 system prompt / project instructions，浪费约 20k tokens
- **状态**：Open  
- **类型**：enhancement  
- **重要性**：这是典型的“隐性成本”问题，直接影响长会话场景下的 token 消耗和使用效率。对于重度用户而言，这类问题会显著抬高调用成本，并降低上下文压缩机制的实际价值。  
- **社区反应**：当前暂无评论，但 issue 描述明确、痛点强，属于高优先级体验优化方向。  
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/2472

### 2. [#2473] `/web` 指令报错
- **状态**：Closed  
- **类型**：bug  
- **重要性**：`/web` 属于典型的高频工具命令，一旦失效，会直接影响检索、浏览与信息补全工作流。对 CLI 用户来说，这类问题属于“可用性底线”问题。  
- **社区反应**：问题已在当天关闭，说明响应较快；但当前公开信息中暂无评论，无法判断是否存在更大范围影响。  
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/2473

---

## 4) 重要 PR 进展
**过去 24 小时无更新 PR。**  
本次日报未发现可纳入的 PR 进展。

---

## 5) 功能需求趋势
结合当前 Issues，社区关注的功能方向主要集中在：

1. **上下文管理与成本优化**
   - 典型诉求是避免 context compaction 后重复加载不必要的系统提示词和项目级指令。
   - 核心目标：**减少 token 浪费、提升长会话效率**。
   - 代表 Issue：[#2472](https://github.com/MoonshotAI/kimi-cli/issues/2472)

2. **工具链稳定性与可用性**
   - `/web` 等内置能力的稳定性仍然是用户最关心的基础体验。
   - 核心目标：**保证常用命令可靠运行，减少工作流中断**。
   - 代表 Issue：[#2473](https://github.com/MoonshotAI/kimi-cli/issues/2473)

---

## 6) 开发者关注点
从这两条反馈可以看出，开发者当前需要重点关注以下两类痛点：

- **性能/成本类问题**
  - 上下文压缩后重复加载配置内容，说明当前机制可能存在“信息复用不足”。
  - 这不仅是性能问题，更是直接的 token 成本问题。

- **高频命令稳定性**
  - `/web` 报错说明 CLI 的关键工具链还需要进一步做回归测试与异常兜底。
  - 对用户而言，这类问题的影响比普通边缘 bug 更大，因为它直接打断主流程。

---

如果你希望，我可以继续把这份日报整理成：
1. **适合公众号/周报风格的版本**，或  
2. **适合内部研发晨会的更短版本**。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-06-25）

## 1) 今日速览
今天 OpenCode 的讨论重心非常集中：一边是 **v1.17.10** 发布后围绕 MCP、provider 兼容性和桌面稳定性的集中反馈，另一边是大量与 MCP 安全、生命周期、OAuth、工具发现相关的 PR 在推进。  
从 Issues 看，社区最关心的是 **模型服务稳定性（Qwen/Bedrock/OpenRouter）**、**桌面端回归问题（Windows/macOS/快捷键/输入法）** 和 **MCP 生态的可用性与安全性**。  
相关代表：[#33721](https://github.com/anomalyco/opencode/issues/33721)、[#33742](https://github.com/anomalyco/opencode/issues/33742)、[#33741](https://github.com/anomalyco/opencode/pull/33741)。

---

## 2) 版本发布
### v1.17.10
发布地址：[#v1.17.10](https://github.com/anomalyco/opencode/releases/tag/v1.17.10)

**核心更新：**
- 新增 **MCP server instructions** 注入 session context
- 新增 **Opencode-managed provider** 集成支持
- 新增 **MCP resource template** 列表能力
- 新增 **MCP resource read tools**
- 新增 `--mini` CLI 模式

**补充观察：**
- 本次发布明显继续强化 MCP 能力链路；从已展示的 bugfix 片段看，也在收敛 MCP 资源模板工具的暴露逻辑。

---

## 3) 社区热点 Issues
以下按“影响面 + 讨论度 + 可能的版本风险”筛选出最值得关注的 10 条。

1. **Qwen3.7-max/plus 服务不稳定，频繁超时/间歇失败**  
   - 影响：直接打击付费用户在 OpenCode Go / Zen API 上的可用性。  
   - 反应：**5 条评论，已关闭**，说明这是最高优先级的服务稳定性反馈之一。  
   - 链接：[#33721](https://github.com/anomalyco/opencode/issues/33721)

2. **MCP tool keepalive：长对话后工具会被 dropped**  
   - 影响：本地 MCP 工具在长上下文里消失，破坏核心工作流。  
   - 反应：**5 条评论，已关闭**，说明社区对 MCP 工具连续性非常敏感。  
   - 链接：[#33638](https://github.com/anomalyco/opencode/issues/33638)

3. **Settings 快捷键 Ctrl+, 无法打开设置**  
   - 影响：桌面端基础可用性问题，且用户手动重绑也无效。  
   - 反应：**3 条评论，OPEN**，属于典型的高可见度 UI 回归。  
   - 链接：[#33740](https://github.com/anomalyco/opencode/issues/33740)

4. **Bedrock Converse 解析 reasoning，但无法启用 extended thinking**  
   - 影响：Claude/Bedrock 用户无法使用预期的推理能力。  
   - 反应：**3 条评论，已关闭**，说明 provider 配置语义存在偏差。  
   - 链接：[#33630](https://github.com/anomalyco/opencode/issues/33630)

5. **本地 vision 模型（mmproj）图片读取失败**  
   - 影响：多模态工作流不可用，直接影响“读图”能力。  
   - 反应：**2 条评论，OPEN**，说明该问题已进入可复现阶段。  
   - 链接：[#33695](https://github.com/anomalyco/opencode/issues/33695)

6. **macOS renderer crash + window-state.json 恢复崩溃循环**  
   - 影响：桌面端严重稳定性问题，涉及渲染链路和状态恢复双重故障。  
   - 反应：**2 条评论，OPEN**，属于高风险系统级问题。  
   - 链接：[#33671](https://github.com/anomalyco/opencode/issues/33671)

7. **VS Code 扩展启动后 2 秒退出：Python venv 自动激活引发竞态**  
   - 影响：IDE 集成路径不稳定，影响开发者主场景。  
   - 反应：**2 条评论，OPEN**，属于典型的环境/初始化时序问题。  
   - 链接：[#33659](https://github.com/anomalyco/opencode/issues/33659)

8. **CLI/server 子进程在 stdout pipe 关闭后 100% CPU**  
   - 影响：headless / subprocess 场景下会造成资源打满。  
   - 反应：**2 条评论，OPEN**，对自动化调用和 CI 场景尤其敏感。  
   - 链接：[#33653](https://github.com/anomalyco/opencode/issues/33653)

9. **Windows 上 v1.17.10 引发 Bun segmentation fault，v1.17.9 稳定**  
   - 影响：疑似版本回归，且是 native crash。  
   - 反应：**1 条评论，👍 1，OPEN**，虽然讨论量不高，但风险级别很高。  
   - 链接：[#33742](https://github.com/anomalyco/opencode/issues/33742)

10. **Qwen 3.7 Plus/Max via OpenRouter 出现未知/空 tool call**  
    - 影响：工具调用协议不稳，导致 session abort 和重试。  
    - 反应：**2 条评论，👍 1，OPEN**，说明该问题已被社区明确识别为高价值修复点。  
    - 链接：[#33618](https://github.com/anomalyco/opencode/issues/33618)

---

## 4) 重要 PR 进展
以下挑选 10 个对产品能力、稳定性或安全性影响最大的 PR。

1. **MCP server instructions 转义，避免注入 prompt**  
   - 作用：将 server instructions 安全地放入 `<mcp_instructions>`，降低 prompt 污染风险。  
   - 链接：[#33741](https://github.com/anomalyco/opencode/pull/33741)

2. **分离 server 与 session 的 provider 生命周期**  
   - 作用：避免切换同 server tab 时整棵 session 子树反复 remount，减少状态抖动。  
   - 链接：[#33739](https://github.com/anomalyco/opencode/pull/33739)

3. **自动 MCP tool search**  
   - 作用：当 MCP 工具定义过大时，自动切换为 `mcp_search / mcp_describe / mcp_call`，缓解上下文膨胀。  
   - 链接：[#33738](https://github.com/anomalyco/opencode/pull/33738)

4. **移除 SSE stream 的 directory filter，修复 TUI 消息不可见**  
   - 作用：解决 session 目录与 server 启动目录不一致时事件被静默丢弃的问题。  
   - 链接：[#33737](https://github.com/anomalyco/opencode/pull/33737)

5. **在没有 `retry-after` 时限制 retry backoff 上限**  
   - 作用：防止退避时间失控，提升异常状态下的可恢复性。  
   - 链接：[#33733](https://github.com/anomalyco/opencode/pull/33733)

6. **防 IME 组合输入时回车误提交**  
   - 作用：修复中文/日文输入法在自定义回答框里被 Enter 直接提交的问题。  
   - 链接：[#33727](https://github.com/anomalyco/opencode/pull/33727)

7. **加固手动 MCP OAuth callback**  
   - 作用：要求 state 校验并一次性消费，减少错误回调和重放风险。  
   - 链接：[#33725](https://github.com/anomalyco/opencode/pull/33725)

8. **远程 MCP client 断线后自动重连**  
   - 作用：提升远程 MCP transport 的韧性，避免短暂断连导致会话中断。  
   - 链接：[#33724](https://github.com/anomalyco/opencode/pull/33724)

9. **配置响应脱敏，隐藏 secrets**  
   - 作用：`GET /config` 与 `GET /global/config` 返回时递归替换敏感值，降低泄漏风险。  
   - 链接：[#33723](https://github.com/anomalyco/opencode/pull/33723)

10. **限制本地 MCP 子进程环境变量**  
    - 作用：不再向本地 MCP subprocess 传入完整父进程环境，减少污染与信息暴露。  
    - 链接：[#33718](https://github.com/anomalyco/opencode/pull/33718)

---

## 5) 功能需求趋势
### 1. MCP 能力继续扩展，但重点已转向“可用性 + 安全性 + 可维护性”
社区不只想要更多 MCP 功能，还希望 **工具不掉线、OAuth 更稳、资源可读、instructions 不污染 prompt、环境隔离更好**。  
代表链接：[#33638](https://github.com/anomalyco/opencode/issues/33638)、[#33741](https://github.com/anomalyco/opencode/pull/33741)、[#33725](https://github.com/anomalyco/opencode/pull/33725)

### 2. 新模型 / 新 provider 的兼容性成为高频诉求
Qwen 3.7、Bedrock、OpenRouter、GPT-5.5 都出现了不同层面的兼容问题，说明社区正在积极切换到新模型，但工具链适配还不稳定。  
代表链接：[#33721](https://github.com/anomalyco/opencode/issues/33721)、[#33630](https://github.com/anomalyco/opencode/issues/33630)、[#33618](https://github.com/anomalyco/opencode/issues/33618)

### 3. 桌面端基础交互与稳定性仍是痛点
快捷键、粘贴、inline rename、崩溃循环、Windows/Linux/macOS 的运行稳定性，仍是用户最直接感知的问题。  
代表链接：[#33740](https://github.com/anomalyco/opencode/issues/33740)、[#33672](https://github.com/anomalyco/opencode/issues/33672)、[#33742](https://github.com/anomalyco/opencode/issues/33742)

### 4. 性能与守护型修复需求上升
包括 100% CPU、退避失控、内存增长、子进程退出后的异常循环等，说明 OpenCode 正在从“能用”转向“长时间稳定运行”。  
代表链接：[#33653](https://github.com/anomalyco/opencode/issues/33653)、[#33713](https://github.com/anomalyco/opencode/pull/33713)、[#33733](https://github.com/anomalyco/opencode/pull/33733)

### 5. IDE / 工作流集成的时序问题频发
VS Code 扩展、会话切换、TUI 消息传播等问题表明，OpenCode 的集成场景越来越多，但生命周期和状态同步仍需打磨。  
代表链接：[#33659](https://github.com/anomalyco/opencode/issues/33659)、[#33739](https://github.com/anomalyco/opencode/pull/33739)、[#33737](https://github.com/anomalyco/opencode/pull/33737)

---

## 6) 开发者关注点
### 1. “MCP 不是只要能接上，而是要长期稳定、可控、安全”
社区已经从“接入 MCP”进入“管理 MCP”阶段：工具保活、OAuth 安全、资源模板、环境隔离、断线重连都被集中讨论。  
代表链接：[#33638](https://github.com/anomalyco/opencode/issues/33638)、[#33724](https://github.com/anomalyco/opencode/pull/33724)、[#33718](https://github.com/anomalyco/opencode/pull/33718)

### 2. 新模型的 tool calling / reasoning 行为不一致
Qwen、Bedrock、GPT-5.5 相关问题集中暴露出协议解析、thinking 配置、tool call schema 的兼容差异。  
代表链接：[#33618](https://github.com/anomalyco/opencode/issues/33618)、[#33630](https://github.com/anomalyco/opencode/issues/33630)、[#33617](https://github.com/anomalyco/opencode/issues/33617)

### 3. 桌面端回归对用户信任影响很大
一旦出现快捷键失效、崩溃循环、无法粘贴、项目名不保存等问题，用户会直接感知为“版本不稳定”。  
代表链接：[#33740](https://github.com/anomalyco/opencode/issues/33740)、[#33671](https://github.com/anomalyco/opencode/issues/33671)、[#33744](https://github.com/anomalyco/opencode/issues/33744)

### 4. 自动化/脚本化调用场景在扩大
`opencode run --format json`、VS Code 扩展、CI/子进程调用等场景正在增多，因此 stdout、重试、状态恢复、环境隔离都变得更关键。  
代表链接：[#33653](https://github.com/anomalyco/opencode/issues/33653)、[#33659](https://github.com/anomalyco/opencode/issues/33659)、[#33733](https://github.com/anomalyco/opencode/pull/33733)

---

如果你需要，我可以把这份日报进一步整理成：
1. **适合发到飞书/Slack 的短版**，或  
2. **适合技术周报的正式版 Markdown**。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报（2026-06-25）

## 今日速览
过去 24 小时内，Pi 社区的讨论重心明显集中在 **TUI 稳定性** 与 **交互体验**：包括 Termux 横竖屏切换卡死、超宽行渲染崩溃、重绘导致滚动回溯丢失、footer 统计触发异常等问题，都是影响日常使用的高频故障。  
与此同时，社区对 **Agent 并行化、模型/Provider 扩展、usage 统计、技能选择器** 等方向也提出了持续需求，说明 Pi 正在从“可用”向“更像现代 AI 开发工具”演进。  
另外，**过去 24 小时无新 Releases**。

---

## 社区热点 Issues

1. **[#6060](https://github.com/badlogic/pi-mono/issues/6060) TUI footer 渲染 token 统计时崩溃**
   - 关键点：`content is not iterable` 直接导致 TUI 异常退出，且触发场景是常见的 token/usage 统计展示。
   - 为什么重要：这是典型的“正常使用即崩”的稳定性问题，影响会话持续性。
   - 社区反应：**1 条评论**，当日关闭，说明问题复现明确、优先级高。

2. **[#6058](https://github.com/badlogic/pi-mono/issues/6058) 终端宽度超限时应截断而不是崩溃**
   - 关键点：渲染超过终端宽度时直接 fatal error，而非 graceful truncate。
   - 为什么重要：TUI 的基础鲁棒性问题，容易在不同终端尺寸下触发。
   - 社区反应：**1 条评论**，属于低噪声但高影响的 bug。

3. **[#6050](https://github.com/badlogic/pi-mono/issues/6050) 活跃渲染时 full redraw 清空终端 scrollback**
   - 关键点：全量重绘会把聊天历史“拉回开头”，破坏浏览连续性。
   - 为什么重要：影响长会话阅读体验，且问题发生在核心 TUI renderer。
   - 社区反应：**2 条评论**，说明已有一定共鸣，属于可感知的 UX 退化。

4. **[#6038](https://github.com/badlogic/pi-mono/issues/6038) Termux 横竖屏切换后 TUI 卡死**
   - 关键点：移动端 Termux 场景下屏幕方向切换会导致 hangs。
   - 为什么重要：直接影响移动终端用户，且可能与 `/model` 卡死同根。
   - 社区反应：**4 条评论**，是本日讨论度最高的 issue 之一。

5. **[#6037](https://github.com/badlogic/pi-mono/issues/6037) System prompt 泄漏 hostname 信息**
   - 关键点：内部主机名信息可能通过模型输出泄露。
   - 为什么重要：这是安全/隐私边界问题，不只是 bug，而是潜在信息泄露风险。
   - 社区反应：**2 条评论**，虽无高赞，但安全类问题通常需要更严格处理。

6. **[#6057](https://github.com/badlogic/pi-mono/issues/6057) 为 Usage 增加 reasoning token 统计**
   - 关键点：OpenAI / Anthropic 等 provider 已提供 reasoning/thinking token，但当前被丢弃。
   - 为什么重要：对成本分析、模型行为评估、可观测性都很关键。
   - 社区反应：**1 条评论**，需求明确，属于基础 telemetry 能力补齐。

7. **[#6053](https://github.com/badlogic/pi-mono/issues/6053) 支持并发独立子任务循环**
   - 关键点：希望在 agent loop 层面引入并行执行，而不只是单轮 tool call 并行。
   - 为什么重要：这是 AI 开发工具向“多任务协作/并行代理”升级的核心方向。
   - 社区反应：**1 条评论**，但从 PR 进展看推进很快，需求已被积极响应。

8. **[#6059](https://github.com/badlogic/pi-mono/issues/6059) 输入 `/` 时在编辑器内弹出技能选择器**
   - 关键点：希望像 Codex / Claude Code 一样，slash command 有内联 fuzzy selector。
   - 为什么重要：直接影响命令发现性和交互效率，是典型的 IDE 化诉求。
   - 社区反应：**1 条评论**，属于体验导向型功能建议。

9. **[#6047](https://github.com/badlogic/pi-mono/issues/6047) 支持从磁盘读取 BMP**
   - 关键点：BMP 可从剪贴板接受，但从磁盘读取失败。
   - 为什么重要：属于工具输入能力补齐，减少格式落差。
   - 社区反应：**1 条评论**，说明需求较垂直，但有明确使用场景。

10. **[#6042](https://github.com/badlogic/pi-mono/issues/6042) 内置支持 Charm Hyper provider**
    - 关键点：希望将 Charm Hyper 直接纳入模型/provider 列表与 `/model` 选择器。
    - 为什么重要：体现社区对多模型生态的持续扩展诉求。
    - 社区反应：**1 条评论**，更偏生态适配型需求。

---

## 重要 PR 进展

> 注：本日更新的 PR 共 **6 条**，以下为全部可见更新，按技术影响度排序。

1. **[#6054](https://github.com/badlogic/pi-mono/pull/6054) 新增 `runParallelAgentTasks`，支持并发 batching**
   - 贡献点：为 `@earendil-works/pi-agent-core` 增加并行独立子任务执行能力，并补充系统提示词指引。
   - 价值：直接回应 agent 级并发需求，提升复杂任务吞吐效率。

2. **[#6051](https://github.com/badlogic/pi-mono/pull/6051) 修复 hung streams，并重试未建模的 Bedrock 错误**
   - 贡献点：增加 stream idle timeout、connect timeout 等恢复机制。
   - 价值：提升流式调用韧性，减少“连接半开导致永久阻塞”的风险。

3. **[#6048](https://github.com/badlogic/pi-mono/pull/6048) 恢复会话时先显示 resources 再显示 messages**
   - 贡献点：调整 session resume 的 UI 结构，把 Context/Skills/Prompts/Extensions 放到消息上方。
   - 价值：改善上下文可读性，符合“先资源、后对话”的使用直觉。

4. **[#6056](https://github.com/badlogic/pi-mono/pull/6056) 简化 subagent 示例配置，新增 default agent**
   - 贡献点：统一示例 agent 配置、降低输出冗余，并使用 minimax 模型。
   - 价值：降低扩展上手门槛，利于新用户理解 agent 体系。

5. **[#6055](https://github.com/badlogic/pi-mono/pull/6055) 同主题：简化 subagent 配置并新增默认 agent**
   - 贡献点：与 #6056 同方向，进一步推进示例与默认配置整理。
   - 价值：说明该方向已形成持续提交，社区在 agent 模板体验上投入较多。

6. **[#6035](https://github.com/badlogic/pi-mono/pull/6035) 修正 auth flow 文案：`log out`**
   - 贡献点：将 logout 相关文案改为更自然的 “log out”。
   - 价值：虽属细节，但体现了对产品语言一致性的重视，也呼应了相关提案 #6036。

---

## 功能需求趋势

1. **TUI 稳定性与终端兼容性仍是第一优先级**
   - 典型诉求：卡死、崩溃、宽度溢出、scrollback 被清空、移动端方向切换异常。
   - 代表链接：[#6038](https://github.com/badlogic/pi-mono/issues/6038)、[#6050](https://github.com/badlogic/pi-mono/issues/6050)、[#6058](https://github.com/badlogic/pi-mono/issues/6058)、[#6060](https://github.com/badlogic/pi-mono/issues/6060)

2. **Agent 并行化与多任务执行成为明显方向**
   - 典型诉求：并行子任务循环、tool call batching、提升复杂任务吞吐。
   - 代表链接：[#6053](https://github.com/badlogic/pi-mono/issues/6053)、[#6054](https://github.com/badlogic/pi-mono/pull/6054)

3. **模型/provider 生态继续扩展**
   - 典型诉求：新增 provider、统一 header/beta 行为、支持更多厂商能力。
   - 代表链接：[#6042](https://github.com/badlogic/pi-mono/issues/6042)、[#6040](https://github.com/badlogic/pi-mono/issues/6040)、[#6041](https://github.com/badlogic/pi-mono/issues/6041)

4. **可观测性和 usage 统计越来越重要**
   - 典型诉求：reasoning tokens、context usage、错误归因更清晰。
   - 代表链接：[#6057](https://github.com/badlogic/pi-mono/issues/6057)、[#6060](https://github.com/badlogic/pi-mono/issues/6060)、[#6043](https://github.com/badlogic/pi-mono/issues/6043)

5. **IDE 化交互正在增强**
   - 典型诉求：slash command 内联选择器、会话命名、资源展示顺序、登录/退出文案统一。
   - 代表链接：[#6059](https://github.com/badlogic/pi-mono/issues/6059)、[#6046](https://github.com/badlogic/pi-mono/issues/6046)、[#6048](https://github.com/badlogic/pi-mono/pull/6048)、[#6035](https://github.com/badlogic/pi-mono/pull/6035)

---

## 开发者关注点

1. **“先稳定，再扩展”**
   - 高频痛点集中在 TUI 崩溃、卡死、渲染异常，说明底层稳定性仍是当前最敏感问题。
   - 参考：[#6038](https://github.com/badlogic/pi-mono/issues/6038)、[#6058](https://github.com/badlogic/pi-mono/issues/6058)、[#6060](https://github.com/badlogic/pi-mono/issues/6060)

2. **错误信息与可诊断性需要加强**
   - 例如 `exit code undefined`、stream hang、usage 丢字段，都会让排障成本上升。
   - 参考：[#6043](https://github.com/badlogic/pi-mono/issues/6043)、[#6051](https://github.com/badlogic/pi-mono/pull/6051)、[#6057](https://github.com/badlogic/pi-mono/issues/6057)

3. **安全与信息边界问题不可忽视**
   - hostname 泄漏、包安全举报，说明社区对供应链和 prompt 泄漏非常敏感。
   - 参考：[#6037](https://github.com/badlogic/pi-mono/issues/6037)、[#6052](https://github.com/badlogic/pi-mono/issues/6052)、[#6044](https://github.com/badlogic/pi-mono/issues/6044)

4. **用户更希望“少操作、强联想、强默认”**
   - `/` 内联技能选择器、`/new` 快捷创建命名会话、退出流程文案统一，都是降低认知负担的需求。
   - 参考：[#6059](https://github.com/badlogic/pi-mono/issues/6059)、[#6046](https://github.com/badlogic/pi-mono/issues/6046)、[#6035](https://github.com/badlogic/pi-mono/pull/6035)

5. **生态兼容性与工具接入仍在快速补课**
   - 包括 Serena PATH、BMP 文件、Charm Hyper provider、workspaceContext 暴露等，显示 Pi 正在加速对外部生态的适配。
   - 参考：[#6045](https://github.com/badlogic/pi-mono/issues/6045)、[#6047](https://github.com/badlogic/pi-mono/issues/6047)、[#6042](https://github.com/badlogic/pi-mono/issues/6042)、[#6041](https://github.com/badlogic/pi-mono/issues/6041)

---

如果你愿意，我也可以把这份日报进一步整理成：
- **适合发群/邮件的短版**
- **适合内部周报的管理层版**
- **按“稳定性 / 功能 / 安全”三栏的表格版**

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-06-25）

## 1) 今日速览
今天 Qwen Code 的社区讨论明显集中在三个方向：**稳定性修复、后台自动化可控性、以及成本/模型行为治理**。同时，项目在过去 24 小时内完成了 `v0.19.2`、`v0.19.2-preview.0` 和 nightly 版本更新，说明发布节奏仍然很活跃，但发布链路也暴露出一些需要继续加固的问题。  
GitHub 链接：<https://github.com/QwenLM/qwen-code>

---

## 2) 版本发布

- [v0.19.2-nightly.20260625.b2f11b735](https://github.com/QwenLM/qwen-code/releases/tag/v0.19.2-nightly.20260625.b2f11b735)  
  夜间版主要包含 `fix(core): allow web_fetch JSON fallback`，为 `web_fetch` 在非标准返回场景下增加 JSON 回退，偏向于增强兼容性与鲁棒性。

- [v0.19.2](https://github.com/QwenLM/qwen-code/releases/tag/v0.19.2)  
  正式版同步发布，release notes 中可见与 `web_fetch`、远程 LSP 状态路由相关的更新，说明本轮版本重点仍是核心能力补强与服务可观测性。

- [v0.19.2-preview.0](https://github.com/QwenLM/qwen-code/releases/tag/v0.19.2-preview.0)  
  预览版也完成同步，体现出 release 流程仍在持续推进；不过后续需要结合发布失败工单一起观察发布链路稳定性。

---

## 3) 社区热点 Issues

1. [#5834 Source deletion accepts path-like slugs that can escape the sources directory](https://github.com/QwenLM/qwen-code/issues/5834)  
   **重要性**：这是一个高优先级安全问题（P1），涉及路径穿越，可能影响工作区文件边界。**社区反应**：2 条评论，说明虽然讨论不算多，但问题级别很高。

2. [#5819 奇怪的bug，升级以后默认会使用更高单价的model自动修改setting.json中的参数](https://github.com/QwenLM/qwen-code/issues/5819)  
   **重要性**：直接关系到模型选择和费用控制，属于“隐性烧钱”型问题，对实际使用影响大。**社区反应**：3 条评论，且描述非常具体，说明用户对默认策略变更较敏感。

3. [#5838 Allow user to adjust agent initiated cmd timeout](https://github.com/QwenLM/qwen-code/issues/5838)  
   **重要性**：反映用户需要更细粒度控制 Agent 发起命令的超时，属于典型的可配置性诉求。**社区反应**：5 条评论，是当前更新问题里讨论最活跃的一条之一。

4. [#5837 Last response from agent get cut off](https://github.com/QwenLM/qwen-code/issues/5837)  
   **重要性**：终端/UI 输出被截断会直接影响可用性，尤其在长回复场景中。**社区反应**：4 条评论，且附带复现截图，说明问题相对明确。

5. [#5836 在创建任务清单（create todos）能否指定持久化到项目内以便跨设备同步？](https://github.com/QwenLM/qwen-code/issues/5836)  
   **重要性**：这是协作与状态持久化需求，涉及 `todos / plans / memories` 能否跨设备共享。**社区反应**：3 条评论，属于较强的工作流诉求。

6. [#5823 /loop cron tasks fire silently with no visibility — model cannot list or stop its own scheduled tasks](https://github.com/QwenLM/qwen-code/issues/5823)  
   **重要性**：背景自动化任务缺乏可见性，会导致 Agent 在用户不知情下持续执行。**社区反应**：2 条评论，议题聚焦在“能看见、能停掉、能管理”。

7. [#5806 [loop] User abort (Esc) does not cancel pending self-paced loop wakeups](https://github.com/QwenLM/qwen-code/issues/5806)  
   **重要性**：中断逻辑不完整会导致用户以为已停止，实际上后台仍会唤醒任务。**社区反应**：2 条评论，与 #5823 一起说明 `/loop` 的控制闭环仍在补齐。

8. [#5800 bug(cli): last line of replies taller than the terminal is overwritten on completion](https://github.com/QwenLM/qwen-code/issues/5800)  
   **重要性**：终端渲染 bug，影响长回复阅读体验，属于高频可见问题。**社区反应**：3 条评论，且已被标记为阻塞/需要 triage，说明修复优先级较高。

9. [#5798 Scroll-back broken and screen flickers during multi-agent runs in non-VP mode](https://github.com/QwenLM/qwen-code/issues/5798)  
   **重要性**：多 Agent 场景下滚动与闪烁问题会严重影响交互稳定性。**社区反应**：2 条评论，且已关闭，说明该类问题已进入修复/回收周期。

10. [#5816 Voice dictation: support a user-configurable keyterms file for ASR biasing](https://github.com/QwenLM/qwen-code/issues/5816)  
    **重要性**：语音输入开始进入更细的可定制阶段，适合垂直场景和专业术语场景。**社区反应**：2 条评论，体现出对 ASR 可控性的持续关注。

---

## 4) 重要 PR 进展

1. [#5835 fix(core): preserve the selected model when re-applying a provider install plan](https://github.com/QwenLM/qwen-code/pull/5835)  
   修复 provider 重装/重新认证/升级后模型被重置的问题，直接关系到“模型选择不被偷偷改掉”。

2. [#5832 ci(release): make release flow merge-queue-safe and keep release PRs out of notes](https://github.com/QwenLM/qwen-code/pull/5832)  
   调整 release 自动合并流程以适配 merge queue，同时避免自动 release PR 混入 release notes。

3. [#5829 fix(desktop): reject unsafe source slugs before deletion](https://github.com/QwenLM/qwen-code/pull/5829)  
   这是对 #5834 的直接修复方向，先拒绝非法 slug，再进入删除路径，修复安全边界问题。

4. [#5828 feat(core): add bundled extension creator skill](https://github.com/QwenLM/qwen-code/pull/5828)  
   新增内置 `extension-creator` skill，帮助用户更快创建和测试 Qwen Code 扩展。

5. [#5827 fix(core): add streaming inactivity timeout to the OpenAI pipeline](https://github.com/QwenLM/qwen-code/pull/5827)  
   为流式输出增加“空闲超时”，解决只连上但中途卡死的问题，属于关键稳定性修复。

6. [#5826 feat(cli): Add skill usage stats](https://github.com/QwenLM/qwen-code/pull/5826)  
   新增 `/stats skills`，把 skill 使用统计暴露出来，增强可观测性与调试能力。

7. [#5825 test(cli): add daemon startup benchmark](https://github.com/QwenLM/qwen-code/pull/5825)  
   增加 daemon 启动基准测试，明显偏向性能治理和回归监控。

8. [#5824 feat(cli): simplify auto mode startup text and remove emoji](https://github.com/QwenLM/qwen-code/pull/5824)  
   精简 Auto 模式首次启动文案，属于体验优化型 PR，目标是减少干扰、提高可读性。

9. [#5822 fix(web-shell): defer transcript-appending local commands while a turn streams](https://github.com/QwenLM/qwen-code/pull/5822)  
   修复流式回复期间本地命令插入 transcript 的时序问题，属于 Web Shell 交互一致性修复。

10. [#5821 fix(cli): skip default follow-up suggestions on local OpenAI backends](https://github.com/QwenLM/qwen-code/pull/5821)  
    对本地 OpenAI-compatible 后端关闭默认 follow-up 建议，避免本地调试场景下的额外干扰和误触发。

---

## 5) 功能需求趋势

从今天的 Issues 看，社区最关注的功能方向主要有以下几类：

- [**后台自动化的可控性**](https://github.com/QwenLM/qwen-code/issues?q=is%3Aissue+loop+cron+automation)  
  典型诉求包括 `/loop`、cron 任务的可见、可停、可追踪，说明用户对“Agent 自动跑”并不排斥，但要求必须可管理。

- [**终端/UI 渲染稳定性**](https://github.com/QwenLM/qwen-code/issues?q=is%3Aissue+rendering+terminal+scrollback)  
  长回复截断、滚动回退、闪烁等问题反复出现，说明多 Agent、长输出已成为高频使用路径。

- [**模型选择与成本控制**](https://github.com/QwenLM/qwen-code/issues?q=is%3Aissue+model+setting+token+cost)  
  社区很在意升级后模型是否被自动切换、默认策略是否增加 token 消耗，这类问题直接影响使用成本。

- [**会话/记忆/任务清单的持久化与跨设备同步**](https://github.com/QwenLM/qwen-code/issues?q=is%3Aissue+todos+memory+session+sync)  
  用户希望项目状态能落盘到项目内，而不是只在本机私有目录中，说明协作与迁移场景在上升。

- [**配置项进一步开放**](https://github.com/QwenLM/qwen-code/issues?q=is%3Aissue+configurable+timeout+keyterms)  
  超时、ASR 关键词、行为开关等都在被要求“可配置”，反映出项目正从“默认可用”走向“专业可调”。

- [**安全与边界校验**](https://github.com/QwenLM/qwen-code/issues?q=is%3Aissue+security+path+traversal)  
  文件操作和删除路径的边界校验成为重点，说明桌面/CLI 工具已经进入更严格的安全审视阶段。

- [**语音输入与多模态入口**](https://github.com/QwenLM/qwen-code/issues?q=is%3Aissue+voice+dictation+ASR)  
  语音 dictation 的自定义词表需求出现，说明语音交互正在从“能用”转向“适合专业场景”。

---

## 6) 开发者关注点

今天开发者反馈中的高频痛点可以概括为：

- **输出稳定性**：长回复被截断、滚动区域闪烁、终端内容被覆盖，说明 UI 渲染链路仍是核心痛点。  
- **自动化闭环**：`/loop` 和 cron 任务缺少足够的状态展示与取消控制，用户担心“后台自己跑起来停不住”。  
- **模型与成本治理**：默认模型被改动、升级后策略变化、token 消耗异常，都属于高敏感反馈。  
- **更强的可配置性**：超时、语音词表、todos/记忆落盘位置等，都是用户明确希望开放的设置项。  
- **安全与发布可靠性**：路径穿越类问题和 release failed 说明项目正从功能扩张阶段转向“安全、稳定、流程可靠”阶段。

如果你愿意，我也可以把这份日报进一步整理成 **适合发到公众号/飞书群的精简版**，或者生成 **“管理层摘要版”**。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# 2026-06-25 DeepSeek TUI 社区动态日报

> 注：以下链接按数据源中实际出现的仓库路径 `Hmbown/CodeWhale` 生成。

## 1. 今日速览
过去 24 小时没有新 Release，但社区讨论与维护节奏很活跃，重点集中在 **安全响应、Provider/ACP 能力扩展、性能与稳定性、国际化改造** 上。  
PR 侧则明显在推进 v0.8.65 收尾后的产品化优化，包括模型目录、TUI 细节展示、崩溃保护、MCP/Provider 能力和多语言整理。  
整体来看，项目正在从“功能可用”向“体验完善 + 生态接入 + 可维护性提升”过渡。

---

## 2. 社区热点 Issues
> 今日更新的 Issue 共 5 条，以下为全部重点。

1. **[#3550 Vulnerability report - no response!](https://github.com/Hmbown/CodeWhale/issues/3550)**  
   - **重要性**：安全漏洞响应直接影响项目可信度；该 Issue 涉及 SSRF 报告和安全邮箱失效，属于高优先级治理问题。  
   - **社区反应**：2 次评论、0 👍，说明问题敏感但公开互动不多，更多是等待维护者响应。

2. **[#3546 Extend ACP support to expose provider and model selection](https://github.com/Hmbown/CodeWhale/issues/3546)**  
   - **重要性**：ACP 集成已具备基础能力，但缺少 provider/model 选择暴露，会限制外部自动化平台的完整接入。  
   - **社区反应**：2 次评论、0 👍，讨论聚焦在“能接入”到“能完整控制”的差距。

3. **[#3541 Rust-based native runtime / desktop client for lower latency and better non-coding UX](https://github.com/Hmbown/CodeWhale/issues/3541)**  
   - **重要性**：这是架构级诉求，直指 Node/TS TUI 的冷启动、内存和事件循环瓶颈，关系到长期性能路线。  
   - **社区反应**：2 次评论、0 👍，属于前瞻性需求，尚在方案层讨论。

4. **[#3537 Replace hard-coded localization file with a dedicated i18n library](https://github.com/Hmbown/CodeWhale/issues/3537)**  
   - **重要性**：本地化文件已膨胀到 5000+ 行，影响维护效率、编译速度和翻译流水线，属于可维护性痛点。  
   - **社区反应**：2 次评论、0 👍，说明 i18n 结构化改造已经形成共识方向。

5. **[#3545 希望在 providers 的配置里可以自定义上下文的大小](https://github.com/Hmbown/CodeWhale/issues/3545)**  
   - **重要性**：指向模型元数据配置缺失，尤其是 128k/1M 上下文能力的识别与展示，影响真实可用性。  
   - **社区反应**：1 次评论、0 👍，属于具体且实用的配置需求，后续很可能继续发酵。

---

## 3. 重要 PR 进展

1. **[#3566 Clarify condensed tool transcript rows](https://github.com/Hmbown/CodeWhale/pull/3566)**  
   优化压缩版工具转录行的展示，保留精确工具身份，减少 `git_log/git_show/git_blame` 等场景的歧义。

2. **[#3565 fix(tui): catch_unwind in engine event loop to survive UTF-8 byte-boundary panics](https://github.com/Hmbown/CodeWhale/pull/3565)**  
   增强引擎事件循环的容错能力，避免多字节 UTF-8 边界 panic 导致 TUI 冻结。

3. **[#3564 ci/release: freeze tags and accelerate Rust PR gates](https://github.com/Hmbown/CodeWhale/pull/3564)**  
   调整发布标签与 CI 门禁流程，减少无谓自动打 tag，提升 Rust PR 检查效率。

4. **[#3563 v0.8.65: factual model reference database + /modeldb browse](https://github.com/Hmbown/CodeWhale/pull/3563)**  
   为模型建立事实型参考数据库，覆盖上下文窗口、价格、模态、provider 等字段，并支持 `/modeldb` 浏览。

5. **[#3562 v0.8.65: passive MCP tool discovery + configured custom provider rows](https://github.com/Hmbown/CodeWhale/pull/3562)**  
   改进 MCP 工具发现的被动模式，并补齐自定义 provider 行展示，增强集成可见性。

6. **[#3561 Extract shared bridge core helpers](https://github.com/Hmbown/CodeWhale/pull/3561)**  
   抽离 Telegram/Feishu/WeCom/Weixin 等桥接逻辑的公共核心辅助函数，降低重复代码。

7. **[#3560 refactor(config): finish harness posture split](https://github.com/Hmbown/CodeWhale/pull/3560)**  
   完成 harness 配置拆分，整理内置 profile seed 与 helper 的归属，提升配置模块清晰度。

8. **[#3559 feat(tui): harvest zh-Hans locale bundle](https://github.com/Hmbown/CodeWhale/pull/3559)**  
   将简体中文文案抽离到独立 JSON locale 文件，继续推进 i18n 结构化改造。

9. **[#3558 docs: update public security contact](https://github.com/Hmbown/CodeWhale/pull/3558)**  
   更新公开安全联系信息，修复 security 邮箱退信问题，并同步网站页脚与 SECURITY.md。

10. **[#3557 feat(tui): /config preset calm — beautiful/calm transcript preset](https://github.com/Hmbown/CodeWhale/pull/3557)**  
    落地“calm”转录预设，强化面向普通用户的美观/安静模式，减少调试信息干扰。

---

## 4. 功能需求趋势
从今日更新的 Issues 看，社区关注点主要集中在以下方向：

- **Provider / Model 控制能力增强**  
  代表问题：[#3546](https://github.com/Hmbown/CodeWhale/issues/3546)、[#3545](https://github.com/Hmbown/CodeWhale/issues/3545)  
  诉求从“接入模型”升级为“可见、可控、可配置”。

- **性能与运行时优化**  
  代表问题：[#3541](https://github.com/Hmbown/CodeWhale/issues/3541)  
  社区开始关注原生 runtime、冷启动、内存占用和交互流畅度。

- **国际化与可维护性**  
  代表问题：[#3537](https://github.com/Hmbown/CodeWhale/issues/3537)  
  说明项目已进入多语言和翻译工具链升级阶段，不再适合继续依赖单一超大硬编码文件。

- **安全响应与信任治理**  
  代表问题：[#3550](https://github.com/Hmbown/CodeWhale/issues/3550)  
  安全报告处理流程已成为社区敏感点。

- **生态集成与自动化接入**  
  代表问题：[#3546](https://github.com/Hmbown/CodeWhale/issues/3546)  
  ACP/MCP 类能力是下一阶段的重要扩展面。

---

## 5. 开发者关注点
结合 Issues 与 PR 的走向，开发者最需要关注的痛点/高频需求是：

- **安全响应链路要更清晰**：公开安全邮箱、漏洞反馈与处理流程需要稳定可达，避免“报了无人回应”的信任损耗。  
- **配置粒度要更细**：尤其是 provider/model/context window 等关键参数，需要从“默认可用”走向“显式可控”。  
- **TUI 稳定性优先级很高**：UTF-8、终端兼容、转录展示等问题直接影响日常使用体验。  
- **国际化要工程化**：硬编码文案已成为维护瓶颈，抽离 JSON/i18n 库是明确方向。  
- **生态接入要补齐控制面**：ACP/MCP 不只是“能连上”，还要支持模型、provider、工具发现与状态可见。  

如果你愿意，我也可以把这份日报进一步整理成 **适合发群/发周报的精简版**，或者输出成 **Markdown 原始稿** 方便直接复制。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*