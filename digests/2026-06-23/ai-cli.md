# AI CLI 工具社区动态日报 2026-06-23

> 生成时间: 2026-06-23 01:33 UTC | 覆盖工具: 9 个

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

以下为基于 9 个 AI CLI 项目社区日报整理的横向对比分析。

---

## 1) 生态全景

过去 24 小时，AI CLI 生态整体呈现出一个非常明确的方向：**从“聊天型命令行工具”转向“可集成、可治理、可部署的 Agent 平台”**。  
社区关注点高度集中在 **跨平台稳定性、MCP/插件生态、provider 兼容性、会话与状态管理、安全策略** 这些“基础设施层”问题上，而不再只是单纯模型效果。  
同时，多数项目都在高频修复回归问题、补齐协议边界和增强可观测性，说明这个赛道已经进入 **快速工程化打磨阶段**。  
从发布节奏看，头部项目普遍保持较高迭代频率，且修复与增强并进，反映出 **用户规模扩大后对稳定性与可控性的要求显著上升**。

---

## 2) 各工具活跃度对比

> 说明：下表按各日报中列出的“今日重点条目”统计，不代表仓库全量数据。

| 工具 | 今日 Issues 数 | 今日 PR 数 | Release 情况 |
|---|---:|---:|---|
| Claude Code | 10 | 3 | 有，`v2.1.186` |
| OpenAI Codex | 10 | 10 | 有，`rust-v0.142.0` + 4 个 alpha 版更新 |
| Gemini CLI | 6 | 7 | 无 |
| GitHub Copilot CLI | 6 | 0 | 有，`v1.0.64-3`、`v1.0.64-2` |
| Kimi Code CLI | 3 | 3 | 有，`1.48.0` |
| OpenCode | 10 | 10 | 无 |
| Pi | 10 | 8 | 有，`v0.79.10` |
| Qwen Code | 10 | 10 | 无 |
| DeepSeek TUI | 10 | 10 | 有，`v0.8.64` |

**直观结论：**
- **高活跃组**：OpenAI Codex、OpenCode、Qwen Code、DeepSeek TUI（Issues/PR 都很密集）
- **中高活跃组**：Pi、Claude Code、Gemini CLI
- **偏精炼迭代组**：Copilot CLI、Kimi Code CLI

---

## 3) 共同关注的功能方向

### A. Agent / tool call 稳定性
多个工具都在修这类问题，说明这是行业共性痛点。
- **Gemini CLI**：SIGINT 后迟发 tool call 仍执行、shell 大输出回传 provider
- **Kimi Code CLI**：重复工具调用死循环防护、子进程挂起
- **Claude Code**：tool call 中断后伪造对话轮次、subagent / hook 语义错误
- **OpenCode**：provider failure 后队列保留、TUI worker 异常处理
- **Qwen Code**：重复提交已完成 shell 结果、tool 参数 schema 与 runtime 不一致

**共同诉求**：取消语义、幂等性、重试边界、错误分类要更严格。

---

### B. MCP / 插件 / 外部工具生态
这是所有头部项目都在发力的方向。
- **Claude Code**：`claude mcp login/logout`，审批卡住问题
- **OpenAI Codex**：MCP HTTP、插件目录、协议兼容检查
- **Gemini CLI**：MCP elicitation（form/url）
- **GitHub Copilot CLI**：`/mcp` registry 安装变量插值
- **Pi**：扩展生命周期、session/daemon 绑定
- **DeepSeek TUI**：MCP、skills、plugins、setup wizard 一体化
- **Qwen Code**：MCP timeout、ACP session bridge 校验

**共同诉求**：MCP 不只是“能连上”，而是要做到 **安装可控、认证可靠、上下文正确、配置可解释**。

---

### C. 多 provider / 多模型兼容
越来越多项目把“provider 适配”当成核心能力，而不是附加功能。
- **OpenCode**：Mistral / Together AI OpenAI-compatible 支持
- **DeepSeek TUI**：Qianfan、DashScope、OpenRouter、SiliconFlow、Together 路由适配
- **Pi**：`provider/model` 复合字符串、Merge Gateway Provider
- **Qwen Code**：OpenAI-compatible 接口、provider 兼容测试
- **Codex**：MCP/插件服务、协议兼容检查
- **Kimi Code CLI**：OpenAI 兼容层参数严格对齐
- **Gemini CLI**：大输出回传 provider 的协议边界
- **Copilot CLI**：模型控制与推理参数更细粒度化

**共同诉求**：provider 生态从“可接入”升级为 **可验证、可路由、可回退**。

---

### D. 会话、状态与恢复
这是 CLI 工具进入重度使用后最容易暴露的问题。
- **Claude Code**：worktree / subagent / remote control session
- **Codex**：session restore、project state、memory generation
- **Pi**：`/login` 后 provider 刷新、session 解析、长连接恢复
- **Qwen Code**：session cursor、maxSessions、sessions list limit
- **DeepSeek TUI**：`--session` 解析、setup resume
- **Copilot CLI**：按名称恢复会话、隐藏不支持 slash 命令
- **OpenCode**：预迁移 session stranded、队列与状态一致性

**共同诉求**：状态不能“看起来像恢复了”，而要 **真正可恢复、可迁移、可追踪**。

---

### E. 企业级安全、sandbox 与策略控制
这已经是 AI CLI 的标配议题。
- **Claude Code**：managed settings、allow/deny 规则、machine-level policy
- **Codex**：Sandbox / permission / security 分类器误报
- **Gemini CLI**：workspace trust、公开工作流安全
- **Copilot CLI**：local sandbox 企业政策文档、代理设置
- **OpenCode**：清理任务防误删、数据安全护栏
- **DeepSeek TUI**：trust / approvals / sandbox / privacy setup step
- **Qwen Code**：AI 自动 triage / PR gate 风险治理

**共同诉求**：默认安全、策略前置、误报可解释、权限链路可靠。

---

## 4) 差异化定位分析

### Claude Code
- **功能侧重**：MCP、agent workflow、远程控制、移动端/浏览器集成、TUI 体验
- **目标用户**：重度开发者、远程协作用户、自动化工作流用户
- **技术路线**：强调跨平台可用性与多工作流集成，偏“通用 Agent CLI 平台”

### OpenAI Codex
- **功能侧重**：桌面端、Windows/WSL、sandbox、插件/skills、app-server 架构
- **目标用户**：桌面端重度用户、Windows 用户、企业团队
- **技术路线**：偏“桌面应用 + 服务端协议栈 + 插件生态”的平台化路线

### Gemini CLI
- **功能侧重**：登录认证、MCP 能力、取消语义、telemetry、sandbox 体验
- **目标用户**：通用 CLI 用户、对 Google 生态有依赖的开发者
- **技术路线**：更强调基础协议正确性和执行边界控制，产品风格偏稳健

### GitHub Copilot CLI
- **功能侧重**：企业网络环境、会话恢复、图片渲染、skills、国际化
- **目标用户**：企业用户、GitHub 生态重度用户、跨语言团队
- **技术路线**：明显偏企业化和可部署性，强调可控成本与合规

### Kimi Code CLI
- **功能侧重**：推理链路稳定性、重复工具调用治理、OpenAI 兼容层
- **目标用户**：需要严格 API 兼容与高可靠 agent 工作流的用户
- **技术路线**：更像“兼容层 + agent 安全边界”的精修路线

### OpenCode
- **功能侧重**：多 provider、TUI/Desktop、插件、状态恢复、安全护栏
- **目标用户**：希望在多模型之间切换的生产用户
- **技术路线**：多提供商适配优先，强调通用性与可恢复性

### Pi
- **功能侧重**：可观测性、扩展能力、provider/model 选择、长会话
- **目标用户**：重度终端用户、需要扩展和自定义的开发者
- **技术路线**：偏“可插拔 + 可观测”的 CLI 平台化

### Qwen Code
- **功能侧重**：参数校验、schema/runtime 一致性、测试稳定性、自动化治理
- **目标用户**：追求稳定工程链路的开发者和团队
- **技术路线**：明显在做“工程硬化”，把 CLI 从可用推向可控

### DeepSeek TUI / CodeWhale
- **功能侧重**：品牌统一、setup wizard、provider 路由、官网/文档一致性
- **目标用户**：新用户、需要多 provider 的开发者、想要完整入口体验的人
- **技术路线**：从单一 TUI 工具升级为“可配置平台”，强调入口整合与文档闭环

---

## 5) 社区热度与成熟度

### 社区热度更高的项目
从今日更新密度看，**OpenAI Codex、OpenCode、Qwen Code、DeepSeek TUI** 最活跃，表现为：
- Issues 和 PR 数量都高
- 主题覆盖面广
- 既有 bug 修复，也有协议/架构增强

这类项目通常意味着：**用户基数更大、场景更复杂、回归暴露更快**。

### 处于快速迭代阶段的项目
- **Qwen Code、DeepSeek TUI、OpenCode、Pi、Kimi Code CLI**
- 特征是：参数硬化、协议对齐、测试补强、功能边界重构很集中

### 更偏“成熟产品继续打磨”的项目
- **Claude Code、OpenAI Codex、GitHub Copilot CLI、Gemini CLI**
- 特征是：已有明确产品路线，当前重点是稳定性、兼容性和企业场景打磨，而不是从零搭建核心能力

> 简单说：  
> **热度最高**的不一定最成熟，但通常说明它们正处在“用户规模扩大后的工程化压力期”。

---

## 6) 值得关注的趋势信号

### 1. Agent 工具链正在从“可调用”走向“可控”
SIGINT、重复 tool call、hook 语义、错误分类、取消后副作用这些问题被密集修复，说明行业已进入 **Agent 行为治理阶段**。  
**对开发者的价值**：后续设计工具链时，必须把幂等性、取消语义、回滚策略、错误分类当成一等公民。

### 2. 多 provider / OpenAI-compatible 适配成为标配能力
DeepSeek TUI、OpenCode、Pi、Qwen Code、Kimi、Codex 都在加强兼容层。  
**对开发者的价值**：模型接入不再只是“支持多少家”，而是要看 **路由、校验、回退和测试矩阵** 是否完整。

### 3. 企业部署与安全边界前置化
proxy、sandbox、policy、trust、approval、allow/deny 已经是高频关键词。  
**对开发者的价值**：如果你的 CLI 没有明确的安全默认值，很难进入企业环境。

### 4. TUI / Desktop / IDE 的边界正在融合
长文本输入、点击链接、图片渲染、远程控制、Hotbar、sidebar、browser integration，说明 CLI 不再只是纯文本界面。  
**对开发者的价值**：交互设计需要同时考虑终端、桌面、IDE 和远程场景的一致体验。

### 5. 文档、站点、配置与运行时一致性成为竞争力
DeepSeek TUI 的站点事实漂移、Qwen 的 schema/runtime 一致性、Copilot 的企业文档需求，都表明“文档正确性”本身已是产品能力的一部分。  
**对开发者的价值**：文档不是附属品，而是可维护性的延伸。

---

如果你需要，我可以继续把这份分析压缩成：
1. **一页纸管理层摘要版**，或  
2. **适合内部晨会的行动项版**。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

下面按**公开 Issue 热度、影响面和问题紧迫度**综合排序说明一下。  
> 注：你给的 PR 数据里“评论数”未完整展示，因此以下排行更偏向“社区关注度 + 修复/落地价值”的综合判断。

## 1) 热门 Skills 排行（PR）

1. **[#1298 fix(skill-creator): run_eval.py 召回率始终为 0%](https://github.com/anthropics/skills/pull/1298)**  
   - **功能**：修复 skill-creator 的评测闭环，让 `run_eval.py / run_loop.py / improve_description.py` 的反馈真实可用。  
   - **社区热点**：直接对应 [Issue #556](https://github.com/anthropics/skills/issues/556) 的“0% recall”核心故障，属于“元技能”基础设施修复。  
   - **状态**：Open

2. **[#1099 skill-creator: 修复 Windows 下 subprocess pipe 读取崩溃](https://github.com/anthropics/skills/pull/1099)**  
   - **功能**：解决 Windows 上 `run_eval.py` 无法正常评估的问题。  
   - **社区热点**：很多用户在 Windows 上看到“not triggered / 0% recall”类假象，影响整个优化流程。  
   - **状态**：Open

3. **[#1050 skill-creator: 修复 Windows subprocess + 编码问题](https://github.com/anthropics/skills/pull/1050)**  
   - **功能**：处理 `claude.cmd`、`PATHEXT`、编码等 Windows 兼容性问题。  
   - **社区热点**：这是 skill-creator 在 Windows 上可用性的关键补丁。  
   - **状态**：Open

4. **[#362 Fix skill-creator UTF-8 panic on multi-byte characters](https://github.com/anthropics/skills/pull/362)**  
   - **功能**：修复多字节字符导致的 Rust panic。  
   - **社区热点**：面向多语言/非 ASCII 内容的稳定性问题，直接影响国际化场景。  
   - **状态**：Open

5. **[#361 Detect unquoted YAML special characters in description fields](https://github.com/anthropics/skills/pull/361)**  
   - **功能**：提前检测 YAML frontmatter 中未加引号的特殊字符。  
   - **社区热点**：避免“看起来写对了、实际被 YAML 静默误解析”的隐蔽错误。  
   - **状态**：Open

6. **[#514 Add document-typography skill](https://github.com/anthropics/skills/pull/514)**  
   - **功能**：为生成文档提供排版质量控制（孤行、寡行、编号对齐等）。  
   - **社区热点**：文档类技能里非常实用，属于“立刻能感知价值”的增强。  
   - **状态**：Open

7. **[#723 feat: add testing-patterns skill](https://github.com/anthropics/skills/pull/723)**  
   - **功能**：覆盖测试策略、单元测试、React 组件测试等工程实践。  
   - **社区热点**：社区很明确地在要“工程提效型 Skills”，测试是高频需求。  
   - **状态**：Open

8. **[#486 Add ODT skill](https://github.com/anthropics/skills/pull/486)**  
   - **功能**：支持 OpenDocument（ODT/ODS）创建、填充、读取和转换。  
   - **社区热点**：面向 LibreOffice / 开放文档标准的企业文档工作流。  
   - **状态**：Open

---

## 2) 社区需求趋势

### A. **“能共享、能协作、能分发”**
- 社区很在意组织内共享 Skills，而不是“下载—发 Slack—手动导入”。  
- 代表需求：**[Issue #228](https://github.com/anthropics/skills/issues/228)**（org-wide skill sharing）

### B. **“先把基础稳定性做好”**
- 目前最集中的反馈不是“想要更多花哨 Skill”，而是：
  - 评测链路失真/不可用（[Issue #556](https://github.com/anthropics/skills/issues/556)、[Issue #1169](https://github.com/anthropics/skills/issues/1169)）
  - Windows 兼容问题（[Issue #1061](https://github.com/anthropics/skills/issues/1061)）
  - YAML / UTF-8 / 子进程等边角稳定性（[Issue #361](https://github.com/anthropics/skills/issues/361)、[Issue #362](https://github.com/anthropics/skills/issues/362)）

### C. **“安全与信任边界”**
- 社区开始明显关注 Skills 的命名空间、权限边界和误导风险。  
- 代表需求：  
  - [Issue #492](https://github.com/anthropics/skills/issues/492)（社区 Skill 冒充官方 `anthropic/` 命名空间）  
  - [Issue #1175](https://github.com/anthropics/skills/issues/1175)（SharePoint / 文档权限与上下文窗口安全）

### D. **“企业系统与平台集成”**
- 不少需求指向 Claude Code 与外部平台的深度对接：  
  - Bedrock 支持：[Issue #29](https://github.com/anthropics/skills/issues/29)  
  - MCP 化/接口化：[Issue #16](https://github.com/anthropics/skills/issues/16)  
  - Skills API / 平台可访问性：[Issue #61](https://github.com/anthropics/skills/issues/61)、[Issue #184](https://github.com/anthropics/skills/issues/184)

### E. **“记忆 / 状态 / 长上下文管理”**
- 长期上下文与持久记忆是明显上升方向。  
- 代表需求：  
  - [Issue #154](https://github.com/anthropics/skills/issues/154)（persistent memory）  
  - [Issue #1329](https://github.com/anthropics/skills/issues/1329)（compact-memory）  
  - [Issue #444](https://github.com/anthropics/skills/issues/444)（AURELION memory/agent 体系）

### F. **“文档与企业工作流自动化”**
- Skills 的落点正在从“单点任务”转向“可重复的业务流程”：  
  - 文档格式、排版、ODT/DOCX/PDF、表单处理  
  - ServiceNow / SharePoint / ITSM 类企业流程  
  - 相关 PR：[#486](https://github.com/anthropics/skills/pull/486)、[#514](https://github.com/anthropics/skills/pull/514)、[#568](https://github.com/anthropics/skills/pull/568)

---

## 3) 高潜力待合并 Skills

这些 PR 更像“近期有机会落地”的修复/增强，因为它们范围清晰、问题明确、能直接解除痛点：

- **[#1298](https://github.com/anthropics/skills/pull/1298)**：修复评测召回率归零，属于技能优化链路的核心修复  
- **[#1099](https://github.com/anthropics/skills/pull/1099)**：Windows 评测崩溃修复，直接影响可用性  
- **[#1050](https://github.com/anthropics/skills/pull/1050)**：Windows subprocess/编码补丁，低风险高收益  
- **[#361](https://github.com/anthropics/skills/pull/361)**：YAML special chars 预检，能显著减少“隐性错配”  
- **[#362](https://github.com/anthropics/skills/pull/362)**：UTF-8 安全修复，国际化场景很实用  
- **[#541](https://github.com/anthropics/skills/pull/541)**：DOCX tracked change / bookmark 冲突修复，属于文档技能的典型可靠性问题  
- **[#538](https://github.com/anthropics/skills/pull/538)**：PDF skill 大小写引用修复，属于易合并的维护型补丁

---

## 4) Skills 生态洞察

**一句话总结：社区当前最集中诉求是——让 Skills 更“可靠、可共享、可治理”，先补齐评测/兼容性/安全边界，再扩展企业文档、测试和工作流自动化能力。**

如果你愿意，我也可以把这份报告进一步整理成：
1. **“PR / Issue 热度矩阵”**，或  
2. **“按方向分类的路线图（文档、测试、企业集成、记忆、安全）”**。

---

# Claude Code 社区动态日报（2026-06-23）

## 1) 今日速览
今天社区讨论仍以 **跨平台稳定性、TUI 交互、MCP/Agent 工作流** 为主，且多个高优先级问题集中在 **iOS/macOS 崩溃、远程控制、浏览器集成**。  
同时，最新版本 **v2.1.186** 继续补强了 **MCP CLI 登录/登出** 与 **/workflows 筛选**，说明官方正在优先优化可用性与远程/自动化场景。  
- Release: [v2.1.186](https://github.com/anthropics/claude-code/releases/tag/v2.1.186)

## 2) 版本发布
### v2.1.186
- 新增 `claude mcp login <name>` / `claude mcp logout <name>`，可直接在 CLI 完成 MCP 认证，无需打开交互式 `/mcp` 菜单。
- 支持 `--no-browser` 与 stdin 重定向，方便通过 SSH 等无浏览器环境完成登录。
- `/workflows` agent 新增状态过滤，按 `f` 可快速筛选任务状态。  
- Release: [v2.1.186](https://github.com/anthropics/claude-code/releases/tag/v2.1.186)

---

## 3) 社区热点 Issues

> 说明：以下优先选取影响面大、评论活跃或问题严重的 Issue。

1. **[#70156](https://github.com/anthropics/claude-code/issues/70156)** — Subagents 在 worktree 中等待 MCP server 审批时卡住  
   - 重要性：直接阻塞 subagent 与 MCP 协作，影响自动化工作流。
   - 社区反应：**4 条评论**，是本批中最活跃的 bug 之一，说明复现与影响都较明确。

2. **[#70144](https://github.com/anthropics/claude-code/issues/70144)** — iPadOS 在 Code tab 打开任意 session 崩溃（SwiftUI 主线程栈溢出）  
   - 重要性：移动端核心入口崩溃，属于高优先级阻断问题。
   - 社区反应：**3 条评论，4 个 👍**，兼具严重性和反馈热度。

3. **[#70165](https://github.com/anthropics/claude-code/issues/70165)** — iOS 1.260618.0 打开 Remote Control session 直接硬崩  
   - 重要性：远程控制链路失效，影响移动端协作场景。
   - 社区反应：已有 **2 条评论**，并标记为 regression，说明版本回归风险较高。

4. **[#70159](https://github.com/anthropics/claude-code/issues/70159)** — macOS 上运行中的 token counter 在输入聚焦后消失且无法召回  
   - 重要性：属于 TUI 可用性问题，但影响成本可视化，使用频率高。
   - 社区反应：**3 条评论**，且 issue 中明确指出此前归类存在误判，说明用户对 UI 组件差异很敏感。

5. **[#70177](https://github.com/anthropics/claude-code/issues/70177)** — macOS 浏览器列表解析失败：`JSON Parse error: Unexpected identifier "Browser"`  
   - 重要性：影响 Chrome/浏览器连接能力，属于关键集成问题。
   - 社区反应：**2 条评论**，问题聚焦明确，容易成为后续修复候选。

6. **[#70157](https://github.com/anthropics/claude-code/issues/70157)** — Zed IDE 集成中 agent 长时间停留在 loading  
   - 重要性：IDE 集成是 Claude Code 的高频使用场景之一，卡加载会直接影响生产力。
   - 社区反应：**2 条评论**，反馈集中在 Zed 场景，说明集成链路稳定性仍需加强。

7. **[#70151](https://github.com/anthropics/claude-code/issues/70151)** — `SubagentStop` hook 错误触发到 main session/agent  
   - 重要性：Hook 语义错误会导致自动化脚本误判，风险较高。
   - 社区反应：**2 条评论**，偏开发者向问题，但对自定义工作流影响很大。

8. **[#70148](https://github.com/anthropics/claude-code/issues/70148)** — tool call 中断后模型生成伪造的对话轮次/工具结果  
   - 重要性：这是模型行为正确性问题，可能影响上下文可信度与调试效率。
   - 社区反应：**2 条评论**，属于“高风险低频”型问题，值得重点跟进。

9. **[#70181](https://github.com/anthropics/claude-code/issues/70181)** — Linux 上 managed settings 被 304 缓存清空，导致 deny/allow 规则失效  
   - 重要性：企业/机房场景的安全策略失效，属于高严重度问题。
   - 社区反应：**1 条评论**，虽然评论不多，但问题直指权限控制链路，影响面大。

10. **[#70186](https://github.com/anthropics/claude-code/issues/70186)** — 希望增加 `gitPollingIntervalMs`，降低/关闭后台 git polling  
   - 重要性：反映多会话仓库下的 IO 争用与 `.git/index.lock` 问题，性能诉求明确。
   - 社区反应：**1 条评论**，但诉求清晰，说明重度用户对资源占用比较敏感。

---

## 4) 重要 PR 进展

> 说明：本次更新中仅观察到 **3 条 PR**，其中以文档修正和命令修复为主。

1. **[#70173](https://github.com/anthropics/claude-code/pull/70173)** — 修复 `/clean_gone` 对 `[gone]` 分支的检测逻辑  
   - 内容：用 `git branch -vv` 识别 gone branches，解决原先 `git branch -v | grep '\[gone\]'` 的误判问题。
   - 价值：这是直接影响 Git 清理命令可用性的修复，属于实用型 bugfix。

2. **[#70074](https://github.com/anthropics/claude-code/pull/70074)** — 修正 plugin-dev README 中过时的 marketplace 名称  
   - 内容：将 `claude-code-marketplace` 更新为 `claude-code-plugins`。
   - 价值：减少新用户在插件文档上的认知偏差，改善 onboarding。

3. **[#70066](https://github.com/anthropics/claude-code/pull/70066)** — 更新 plugin-dev 安装文档  
   - 内容：同步官方插件市场名称，并将示例命令统一到 `claude --plugin-dir`。
   - 价值：进一步统一文档与实际 CLI 入口，降低开发者接入成本。

---

## 5) 功能需求趋势
从今天的 Issue 看，社区关注点主要集中在以下方向：

- **IDE / 编辑器集成稳定性**  
  Zed、Chrome、浏览器连接、Code tab、Remote Control 等问题频繁出现，说明“嵌入式工作流”仍是高价值场景。  
  相关：[#70157](https://github.com/anthropics/claude-code/issues/70157)、[#70177](https://github.com/anthropics/claude-code/issues/70177)、[#70165](https://github.com/anthropics/claude-code/issues/70165)

- **移动端与远程会话可用性**  
  iPadOS/iOS 崩溃与 session 打开失败说明移动端仍处于高风险区。  
  相关：[#70144](https://github.com/anthropics/claude-code/issues/70144)、[#70164](https://github.com/anthropics/claude-code/issues/70164)、[#70153](https://github.com/anthropics/claude-code/issues/70153)

- **MCP 与 Agent 工作流**  
  MCP 登录、审批、subagent 协作、hook 语义都是高频关注点。  
  相关：[#70156](https://github.com/anthropics/claude-code/issues/70156)、[#70151](https://github.com/anthropics/claude-code/issues/70151)、Release [v2.1.186](https://github.com/anthropics/claude-code/releases/tag/v2.1.186)

- **TUI 交互与快捷键一致性**  
  输入框焦点、滚动速度、快捷键在不同 renderer 下表现不一致，说明终端交互细节仍需要打磨。  
  相关：[#70159](https://github.com/anthropics/claude-code/issues/70159)、[#70191](https://github.com/anthropics/claude-code/issues/70191)、[#70174](https://github.com/anthropics/claude-code/issues/70174)

- **企业级安全与权限策略**  
  managed settings、machine-level policy、allow/deny 规则是 HPC/多租户场景的核心需求。  
  相关：[#70181](https://github.com/anthropics/claude-code/issues/70181)、[#70184](https://github.com/anthropics/claude-code/issues/70184)

- **性能与资源占用**  
  Git polling、内存泄漏、长会话上下文丢失等问题，说明重度使用下的稳定性与资源效率仍是痛点。  
  相关：[#70186](https://github.com/anthropics/claude-code/issues/70186)、[#70168](https://github.com/anthropics/claude-code/issues/70168)、[#70175](https://github.com/anthropics/claude-code/issues/70175)

---

## 6) 开发者关注点
今天的反馈里，开发者最关心的痛点主要有：

- **“能不能稳定跑起来”**：移动端、远程控制、IDE 插件、浏览器连接频繁出错，说明集成稳定性仍是首要问题。  
  参考：[#70144](https://github.com/anthropics/claude-code/issues/70144)、[#70165](https://github.com/anthropics/claude-code/issues/70165)、[#70157](https://github.com/anthropics/claude-code/issues/70157)

- **“权限和策略要可靠”**：企业/共享机器环境希望有不可被用户覆盖的机器级策略，且 managed settings 不能被缓存/合并逻辑误伤。  
  参考：[#70181](https://github.com/anthropics/claude-code/issues/70181)、[#70184](https://github.com/anthropics/claude-code/issues/70184)

- **“工作流要更可控”**：background agent 的 resume/takeover、subagent 审批、hook 触发语义都在影响自动化脚本可靠性。  
  参考：[#70156](https://github.com/anthropics/claude-code/issues/70156)、[#70170](https://github.com/anthropics/claude-code/issues/70170)、[#70151](https://github.com/anthropics/claude-code/issues/70151)

- **“终端交互要一致”**：快捷键、焦点恢复、滚动速度、状态栏链接等细节问题，直接影响日常使用体验。  
  参考：[#70159](https://github.com/anthropics/claude-code/issues/70159)、[#70191](https://github.com/anthropics/claude-code/issues/70191)、[#70161](https://github.com/anthropics/claude-code/issues/70161)

- **“性能和上下文别丢”**：多会话 Git polling、内存增长、长周期会话上下文丢失，都是重度用户的明显抱怨点。  
  参考：[#70186](https://github.com/anthropics/claude-code/issues/70186)、[#70168](https://github.com/anthropics/claude-code/issues/70168)、[#70175](https://github.com/anthropics/claude-code/issues/70175)

---

如果你愿意，我可以把这份日报进一步整理成：
1. **更适合公众号/团队周报的简版**，或  
2. **带“风险等级 / 影响范围 / 建议跟进优先级”的管理版**。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-06-23）

## 1. 今日速览
过去 24 小时内，Codex 的社区焦点明显集中在 **桌面端稳定性、Windows/WSL 兼容性、Sandbox/权限链路** 上，相关 Issue 持续出现且多为高影响故障。  
与此同时，仓库主线也在推进 **MCP / 插件体系、协议兼容性、Rollout 预算与记忆管理** 等基础能力，说明产品侧与底层架构都在同步演进。

---

## 2. 版本发布
- [rust-v0.142.0](https://github.com/openai/codex/releases/tag/rust-v0.142.0) —— 本次最有内容的稳定版更新，重点包括：  
  - `/usage` 现在可以查看并兑换 earned usage-limit reset credits，支持确认、重试与刷新可用状态。  
  - `/plugins` 远程插件目录改为按 **OpenAI Curated / Workspace / Shared with me** 分组，提升发现与管理效率。  
- [rust-v0.143.0-alpha.2](https://github.com/openai/codex/releases/tag/rust-v0.143.0-alpha.2) —— alpha 小版本滚动发布，未披露新增功能细节。  
- [rust-v0.143.0-alpha.1](https://github.com/openai/codex/releases/tag/rust-v0.143.0-alpha.1) —— alpha 小版本滚动发布。  
- [rust-v0.142.0-alpha.12](https://github.com/openai/codex/releases/tag/rust-v0.142.0-alpha.12) —— alpha 小版本滚动发布。  
- [rust-v0.142.0-alpha.11](https://github.com/openai/codex/releases/tag/rust-v0.142.0-alpha.11) —— alpha 小版本滚动发布。  

---

## 3. 社区热点 Issues
以下 10 个 Issue 最值得关注：

1. [#29430 CLI (headless/exec): synchronously generate memories for a specific session](https://github.com/openai/codex/issues/29430)  
   - 重要性：补齐 headless/exec 场景下的“会话记忆生成”自动化能力，直接影响 CLI 工作流。  
   - 社区反应：**3 条评论**，属于本轮最明确的功能诉求之一。

2. [#29425 Codex Desktop 26.616 crashes on startup on Windows Insider Canary Build 26200](https://github.com/openai/codex/issues/29425)  
   - 重要性：启动即崩溃，属于桌面端 P0 级可用性问题。  
   - 社区反应：**3 条评论**，说明复现与排障讨论已经展开。

3. [#29475 Codex App incorrectly flags local Windows Defender administration as cybersecurity risk](https://github.com/openai/codex/issues/29475)  
   - 重要性：安全分类器误报，直接影响合法运维动作被阻断。  
   - 社区反应：**2 条评论**，问题明确但影响面很大。

4. [#29462 using custom chat actions opens new tab](https://github.com/openai/codex/issues/29462)  
   - 重要性：影响会话/任务流转，属于桌面端交互缺陷。  
   - 社区反应：**2 条评论**，说明用户已在实际工作流中碰到。

5. [#29448 impossible make new question to an existing or new chat](https://github.com/openai/codex/issues/29448)  
   - 重要性：新问题无法发起，直接卡住核心聊天入口。  
   - 社区反应：**2 条评论**，且属于跨 IDE / app-server 的联动故障。

6. [#29438 Codex project stuck in sidebar: no Remove action, new tasks route into stale project](https://github.com/openai/codex/issues/29438)  
   - 重要性：项目状态管理异常，容易把新任务路由到旧项目。  
   - 社区反应：**2 条评论**，典型“状态残留”问题。

7. [#29422 Codex Desktop appshot fails on Intel Mac because Computer Use service is missing from x64 package](https://github.com/openai/codex/issues/29422)  
   - 重要性：Intel Mac 上 appshot 功能不可用，说明打包矩阵或依赖缺失。  
   - 社区反应：**2 条评论**，兼容性问题较集中。

8. [#29420 Codex windows app, stopped working on widnows after last update](https://github.com/openai/codex/issues/29420)  
   - 重要性：更新后不可用且无法编辑文件，属于回归型大故障。  
   - 社区反应：**2 条评论，1 👍**，用户已经明确表达紧急性。

9. [#29418 codex-windows-sandbox-setup.exe fails with "The specified module could not be found"](https://github.com/openai/codex/issues/29418)  
   - 重要性：Windows 安装/初始化链路失败，会阻断首次使用与修复流程。  
   - 社区反应：**2 条评论，2 👍**，是本批次里反响最强的安装类问题之一。

10. [#29510 Codex app-server can grow to 30-40 GB when local rollout history is huge](https://github.com/openai/codex/issues/29510)  
   - 重要性：app-server 内存膨胀严重，属于性能与稳定性双重问题。  
   - 社区反应：**1 条评论**，但影响足够大，值得优先排查。

---

## 4. 重要 PR 进展
以下 10 个 PR 体现了当前主线演进方向：

1. [#29518 Remove redundant Codex Apps manager flag](https://github.com/openai/codex/pull/29518)  
   - 清理重复状态，减少 Codex Apps manager 中的冗余特性标记。

2. [#29516 Persist Cloudflare affinity cookies for MCP HTTP](https://github.com/openai/codex/pull/29516)  
   - 为 MCP HTTP 保持 Cloudflare 粘性会话 cookie，提升 hosted plugin-service 的连接稳定性。

3. [#29515 define code mode host handshake protocol](https://github.com/openai/codex/pull/29515)  
   - 明确定义 code mode 主机握手协议，强化 session/open-close 的协议边界与校验。

4. [#29514 skip initial rollout budget prefill](https://github.com/openai/codex/pull/29514)  
   - 调整 rollout budget 计费策略，避免首轮 prompt prefill 被重复计费。

5. [#29513 allow image generation with provider auth](https://github.com/openai/codex/pull/29513)  
   - 放宽图像生成功能对 provider-authenticated 后端的接入限制。

6. [#29512 move Codex Apps identity to MCP clients](https://github.com/openai/codex/pull/29512)  
   - 将 Codex Apps 的身份归属下沉到 MCP clients，减少 manager 侧重复状态。

7. [#29511 Remove redundant Codex Apps manager state](https://github.com/openai/codex/pull/29511)  
   - 进一步删减 MCPConnectionManager 中的冗余状态，简化可用性判断逻辑。

8. [#29509 add app-server protocol compatibility check](https://github.com/openai/codex/pull/29509)  
   - 引入 app-server 协议兼容性检查，防止向后不兼容变更进入主线。

9. [#29505 Prewarm Guardian after permission switches](https://github.com/openai/codex/pull/29505)  
   - 在权限策略切换后预热 Guardian review session，减少审批路径冷启动延迟。

10. [#29498 Instrument rollout persistence bytes](https://github.com/openai/codex/pull/29498)  
   - 为 rollout 持久化增加字节数观测埋点，帮助定位存储增长与性能问题。

> 额外值得关注的修复型 PR：  
> - [#29508 Propagate dynamic tool failures in code mode](https://github.com/openai/codex/pull/29508)  
> - [#29507 core: fix world state response item metadata](https://github.com/openai/codex/pull/29507)  
> - [#29501 path-uri: clarify host-native path conversion](https://github.com/openai/codex/pull/29501)  
> - [#29493 mcp: accept foreign absolute cwd for remote stdio](https://github.com/openai/codex/pull/29493)  
> - [#29491 test: run app-server integration tests with Wine exec](https://github.com/openai/codex/pull/29491)

---

## 5. 功能需求趋势
从本批 Issues 看，社区最关注的功能方向主要有：

1. **桌面端与 Windows/WSL 兼容性**  
   - 典型问题集中在启动崩溃、Sandbox 失败、安装器报错、Explorer 路径异常。  
   - 代表 Issue：[#29425](https://github.com/openai/codex/issues/29425), [#29420](https://github.com/openai/codex/issues/29420), [#29418](https://github.com/openai/codex/issues/29418), [#29454](https://github.com/openai/codex/issues/29454)

2. **Sandbox / 权限 / 安全策略可控性**  
   - 用户希望更准确地区分风险与合法操作，减少误拦截。  
   - 代表 Issue：[#29475](https://github.com/openai/codex/issues/29475), [#29503](https://github.com/openai/codex/issues/29503), [#29460](https://github.com/openai/codex/issues/29460)

3. **Session、记忆与工作树管理**  
   - 用户希望会话记忆、工作树、项目状态更一致，且可被 headless 自动化调用。  
   - 代表 Issue：[#29430](https://github.com/openai/codex/issues/29430), [#29459](https://github.com/openai/codex/issues/29459), [#29438](https://github.com/openai/codex/issues/29438)

4. **插件 / Skills / MCP 生态增强**  
   - 远程插件目录、技能包版本、MCP Apps 渲染与身份管理都在持续演进。  
   - 代表 Issue：[#29517](https://github.com/openai/codex/issues/29517), [#29483](https://github.com/openai/codex/issues/29483), [#29450](https://github.com/openai/codex/issues/29450), [#29478](https://github.com/openai/codex/issues/29478)

5. **性能、日志与资源占用治理**  
   - app-server 内存暴涨、TRACE 日志写盘、rollout 历史堆积都在被集中反馈。  
   - 代表 Issue：[#29510](https://github.com/openai/codex/issues/29510), [#29463](https://github.com/openai/codex/issues/29463), [#29498](https://github.com/openai/codex/pull/29498)

6. **IDE / Chat 交互稳定性**  
   - VS Code / JetBrains 扩展、custom chat actions、tool calls 的稳定性仍是高频需求。  
   - 代表 Issue：[#29447](https://github.com/openai/codex/issues/29447), [#29448](https://github.com/openai/codex/issues/29448), [#29462](https://github.com/openai/codex/issues/29462)

---

## 6. 开发者关注点
从反馈内容看，开发者和重度用户当前最在意的痛点是：

- **更新后回归问题偏多**：尤其是 Windows 桌面端，升级后出现崩溃、安装失败、Sandbox 失效、文件编辑不可用。  
  - 参考：[#29420](https://github.com/openai/codex/issues/29420), [#29418](https://github.com/openai/codex/issues/29425)

- **权限与风险判断不够精确**：合法管理操作被误判为安全风险，影响企业/运维场景。  
  - 参考：[#29475](https://github.com/openai/codex/issues/29475), [#29503](https://github.com/openai/codex/issues/29503)

- **状态一致性不足**：项目、会话、工作树、插件状态容易残留或错路由。  
  - 参考：[#29438](https://github.com/openai/codex/issues/29438), [#29459](https://github.com/openai/codex/issues/29459), [#29450](https://github.com/openai/codex/issues/29450)

- **平台兼容与分发链路仍需打磨**：Intel Mac、Windows/WSL、Insider Canary 等边缘环境暴露较多问题。  
  - 参考：[#29422](https://github.com/openai/codex/issues/29422), [#29454](https://github.com/openai/codex/issues/29454), [#29425](https://github.com/openai/codex/issues/29425)

- **可观测性与资源控制需求上升**：内存、日志、rollout 历史体积成为新的关注焦点。  
  - 参考：[#29510](https://github.com/openai/codex/issues/29510), [#29463](https://github.com/openai/codex/issues/29463), [#29498](https://github.com/openai/codex/pull/29498)

---

如果你愿意，我也可以把这份日报进一步整理成 **“管理层摘要版”** 或 **“工程团队行动项版”**。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-06-23）

> 数据来源：`github.com/google-gemini/gemini-cli`  
> 说明：今日无新 Release；Issue 仅更新 6 条，PR 仅更新 7 条，以下覆盖全部相关条目。

---

## 1) 今日速览

今天社区讨论的焦点主要集中在 **登录/认证异常、Agent 执行安全性、以及 CLI 稳定性** 三条主线。  
从 Issue 和 PR 的对应关系看，社区正在快速推进对 **SIGINT 中断后的迟发 tool call 执行**、**大输出回传 provider** 等边界问题的修复，同时也在增强 **MCP 能力、telemetry、A2A 配置合并** 等基础能力。  
整体来看，这是一个“**修 bug + 补能力 + 收紧安全边界**”并行推进的一天。

---

## 2) 版本发布

今日无新 Release。

---

## 3) 社区热点 Issues

> 今日仅有 6 条更新，以下为全部值得关注的 Issue。

### 1. [#28092 Google account not authorized for gemini](https://github.com/google-gemini/gemini-cli/issues/28092)
- **重要性**：直接影响核心登录链路，属于阻断级问题。
- **社区反应**：`priority/p2 + area/security + need-information`，说明问题被快速识别但还缺少关键复现信息。
- **关注点**：普通 Google 账号在 `/auth` 过程中被拒绝授权，涉及账号权限/产品可用性边界。

### 2. [#28101 Unable to log in to Gemini CLI normally](https://github.com/google-gemini/gemini-cli/issues/28101)
- **重要性**：同样是认证入口问题，且带截图证据，通常更容易推动排查。
- **社区反应**：已有 1 个 👍，说明有用户共鸣；同时被 bot-triaged 并要求补充信息。
- **关注点**：登录流程异常可能影响新用户首次体验，是高优先级用户痛点。

### 3. [#28091 Gemini CLI executes a tool side effect after SIGINT cancellation](https://github.com/google-gemini/gemini-cli/issues/28091)
- **重要性**：这是典型的 Agent 取消语义问题，涉及“用户已中断但工具仍继续执行”的安全与一致性风险。
- **社区反应**：有明确复现描述，问题定位很具体，利于快速修复。
- **关注点**：中断后仍产生本地 shell 副作用，可能造成误操作或资源浪费。

### 4. [#28090 Gemini CLI sends large shell output back to the provider](https://github.com/google-gemini/gemini-cli/issues/28090)
- **重要性**：涉及资源边界和协议健壮性，属于较严重的 agent 协议实现缺陷。
- **社区反应**：`priority/p1`，说明优先级非常高；当前为 manual-triage，值得持续跟进。
- **关注点**：大体积 shell 输出被回传给 provider，可能导致成本、性能或上游限制问题。

### 5. [#28097 error](https://github.com/google-gemini/gemini-cli/issues/28097)
- **重要性**：虽然标题简短，但这类“泛错误”常常对应难以复现的核心缺陷。
- **社区反应**：`need-information + effort/medium`，官方要求提供导出的 chat history JSON，说明需要更完整上下文。
- **关注点**：CLI 版本 0.47.0 上报错，可能是近期回归问题。

### 6. [#28095 bug and slow](https://github.com/google-gemini/gemini-cli/issues/28095)
- **重要性**：性能和卡顿类问题直接影响日常使用体验。
- **社区反应**：同样被 bot-triaged 并要求补充 chat history；用户反馈“很慢、卡顿、断断续续”。
- **关注点**：更新后性能回退是社区高频敏感点。

---

## 4) 重要 PR 进展

> 今日仅有 7 个 PR 更新，以下为全部值得关注的 PR。

### 1. [#28096 fix(core): drop late tool calls after SIGINT cancellation](https://github.com/google-gemini/gemini-cli/pull/28096)
- **内容**：修复 SIGINT 后迟到的 provider tool call 仍被执行的问题。
- **意义**：与 Issue #28091 直接对应，是今天最关键的 bugfix 之一。
- **看点**：修正中断语义，避免取消后仍发生副作用。

### 2. [#28090 关联问题：Gemini CLI sends large shell output back to the provider](https://github.com/google-gemini/gemini-cli/issues/28090)
- 这里对应的修复 PR 未在本批数据中直接出现，但该 Issue 本身已被提到为重点问题，建议持续关注后续补丁。

### 2. [#28089 feat(core): implement MCP elicitation (form + url) capability](https://github.com/google-gemini/gemini-cli/pull/28089)
- **内容**：在核心 MCP 客户端实现 elicitation（`form` / `url`）能力。
- **意义**：这是明显的能力增强，面向更完整的 MCP 客户端生态支持。
- **看点**：补齐此前延期的 spec 能力，提升与外部工具/服务的交互水平。

### 3. [#28094 fix(a2a-server): deep-merge user and workspace settings](https://github.com/google-gemini/gemini-cli/pull/28094)
- **内容**：修复 A2A server 中用户配置与工作区配置的浅合并问题，改为深合并。
- **意义**：避免嵌套配置被覆盖，是典型的配置稳定性修复。
- **看点**：对 `tools / telemetry / fileFiltering / experimental` 等嵌套项尤其重要。

### 4. [#28093 fix(core): buffer chat compression telemetry until SDK is initialized](https://github.com/google-gemini/gemini-cli/pull/28093)
- **内容**：将 chat compression telemetry 改为在 SDK 初始化前缓存，再统一上报。
- **意义**：修复初始化时序问题，提升 telemetry 可靠性。
- **看点**：减少早期事件丢失，利于观测和诊断。

### 5. [#28100 fix(vscode-ide-companion): register Disposables leaked by comma operators](https://github.com/google-gemini/gemini-cli/pull/28100)
- **内容**：修复 VS Code IDE companion 中 Disposable 注册泄漏。
- **意义**：偏工程质量和资源清理问题，长期可减少扩展异常。
- **看点**：修复语法级失误（逗号运算符导致只保留最后一个对象）。

### 6. [#28099 fix(cli): show descriptive sandbox label in footer instead of 'current process'](https://github.com/google-gemini/gemini-cli/pull/28099)
- **内容**：将 footer 中的 sandbox 展示从“current process”改为更具描述性的标签。
- **意义**：提升可观察性和用户理解，属于 UX 改善。
- **看点**：对 macOS seatbelt / sandbox-exec 场景更友好。

### 7. [#28098 Update public workflow trust and readme](https://github.com/google-gemini/gemini-cli/pull/28098)
- **状态**：已关闭。
- **内容**：收紧公开工作流对不可信输入的处理，降低 GitHub Actions 中的潜在提权与秘密泄漏风险。
- **意义**：安全治理方向的重要尝试，即使已关闭也值得关注其影响和后续替代方案。
- **看点**：体现项目对 CI/CD 安全边界的重视。

---

## 5) 功能需求趋势

从今日 Issues 的主题分布看，社区关注点主要集中在以下方向：

1. **账号登录与授权可靠性**
   - 代表 Issue：[#28092](https://github.com/google-gemini/gemini-cli/issues/28092)、[#28101](https://github.com/google-gemini/gemini-cli/issues/28101)
   - 说明：认证链路是当前最敏感入口问题，直接影响可用性。

2. **Agent 执行安全与中断一致性**
   - 代表 Issue：[#28091](https://github.com/google-gemini/gemini-cli/issues/28091)、[#28090](https://github.com/google-gemini/gemini-cli/issues/28090)
   - 说明：社区在意工具调用的边界控制，尤其是取消后的副作用、输出回传规模。

3. **性能与稳定性**
   - 代表 Issue：[#28095](https://github.com/google-gemini/gemini-cli/issues/28095)、[#28097](https://github.com/google-gemini/gemini-cli/issues/28097)
   - 说明：更新后变慢、报错、卡顿是高频痛点，属于“感知最强”的问题类别。

4. **配置与集成能力**
   - 代表 PR：[#28094](https://github.com/google-gemini/gemini-cli/pull/28094)、[#28100](https://github.com/google-gemini/gemini-cli/pull/28100)、[#28099](https://github.com/google-gemini/gemini-cli/pull/28099)
   - 说明：用户希望 CLI 在不同环境、扩展、sandbox 下更可控、更透明。

5. **MCP / 外部工具生态支持**
   - 代表 PR：[#28089](https://github.com/google-gemini/gemini-cli/pull/28089)
   - 说明：MCP elicitation 能力是面向未来工具生态的重要扩展。

---

## 6) 开发者关注点

从今天的反馈里，可以看出开发者最需要关注的痛点有：

- **复现信息不足**：多条 issue 被标记为 `need-information`，并要求附上导出的 chat history JSON，说明排障高度依赖上下文。
- **认证链路稳定性**：登录/授权失败是最高优先级用户问题之一，且影响首次使用转化。
- **Agent 边界控制**：SIGINT 之后还能执行 tool call、以及大输出回传 provider，都说明“取消、限流、截断”机制仍需强化。
- **性能回退感知强**：用户对“慢、卡、断断续续”非常敏感，说明任何性能变化都需要更强的回归监控。
- **安全默认值与 CI 风险**：公开工作流、权限、workspace trust 等问题继续受到重视，安全审计已成为项目常态需求。
- **可观测性需求上升**：telemetry 缓冲、sandbox 标签展示等 PR 表明，社区不仅要功能可用，也要“可诊断、可解释”。

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **更适合公众号/周报发布的摘要版**，或  
2. **适合内部研发晨会的要点版**。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# 2026-06-23 GitHub Copilot CLI 社区动态日报

## 1) 今日速览
今天 Copilot CLI 的动作为 **双版本发布 + 小范围社区提案集中出现**：发布侧主要补齐了代理、会话恢复、界面渲染与可观测性能力；社区侧则集中关注 **模型控制、MCP 安装、会话成本、输入体验、企业文档和多语言支持**。  
整体看，这是一次偏“基础体验与可扩展性”同步推进的日子，说明项目正在从核心聊天能力向 **企业化、插件化、可用性细节** 深入。  
- Releases: [v1.0.64-3](https://github.com/github/copilot-cli/releases/tag/v1.0.64-3) / [v1.0.64-2](https://github.com/github/copilot-cli/releases/tag/v1.0.64-2)

---

## 2) 版本发布

### v1.0.64-3
GitHub 链接: [Release v1.0.64-3](https://github.com/github/copilot-cli/releases/tag/v1.0.64-3)

**新增**
- 支持通过用户设置配置 HTTP(S) 代理

**修复**
- 支持按名称恢复会话，即使名称包含空格
- 远程托管会话中隐藏不支持的 slash 命令

**解读**
- 这是典型的“企业网络环境 + 会话可恢复性”增强，能直接提升受限网络下的可用性，也降低多会话管理成本。

### v1.0.64-2
GitHub 链接: [Release v1.0.64-2](https://github.com/github/copilot-cli/releases/tag/v1.0.64-2)

**新增**
- 可隐藏对话滚动条的设置
- CLI 内联图片渲染
- skills 支持 `argument-hint` frontmatter
- OpenTelemetry：成功压缩后的 chat spans 会携带 `gen_ai.conversation.compacted=true`，并将 summary 作为 `CompactionPart` 发出

**解读**
- 这版更偏体验增强与工程可观测性补强：图片渲染、技能参数提示、埋点语义化都说明 CLI 正在向更完整的“多模态交互 + 可观测平台”演进。

---

## 3) 社区热点 Issues

> 说明：今日共更新 6 个 Issue，未达到 10 个，因此以下为全部重点项。

### 1. [#3888] Expose extended thinking as a control independent of reasoning effort
链接: [Issue #3888](https://github.com/github/copilot-cli/issues/3888)

- **重要性**：直接涉及 Anthropic 模型参数的控制粒度。当前 CLI 只暴露 reasoning effort，但用户希望独立控制 extended thinking 的开关。
- **影响面**：这会影响高阶用户对成本、延迟与推理质量的权衡，也关系到模型能力是否能被充分释放。
- **社区反应**：刚提出，当前 **0 评论、0 👍**，但议题本身技术含量高，后续很可能成为模型配置能力的重要讨论点。

### 2. [#3886] Restarting copilot uses AI credits
链接: [Issue #3886](https://github.com/github/copilot-cli/issues/3886)

- **重要性**：这是典型的“使用成本异常”问题，直接影响用户对 `/restart`、`/resume`、`/update` 的信任度。
- **影响面**：会降低会话重启、恢复等高频操作的使用意愿，属于高优先级体验/计费争议点。
- **社区反应**：目前 **0 评论、0 👍**，但从问题描述看属于高敏感度痛点，后续若被复现，关注度大概率会上升。

### 3. [#3887] `/mcp` install from registry does not interpolate `packageArguments` variables
链接: [Issue #3887](https://github.com/github/copilot-cli/issues/3887)

- **重要性**：影响 MCP Registry 安装流程的可用性，属于插件/工具链集成问题。
- **影响面**：变量未插值会导致配置文件写入错误，直接影响 MCP server 安装后的可用性与自动化部署。
- **社区反应**：目前 **0 评论、0 👍**，但这是明确的功能缺陷，修复优先级通常较高。

### 4. [#3885] Long text is not scrolling inside the input
链接: [Issue #3885](https://github.com/github/copilot-cli/issues/3885)

- **重要性**：输入框长文本滚动失效是 CLI 交互中的高频可用性问题。
- **影响面**：会显著增加长 prompt 编辑成本，尤其是复杂任务、代码审查或多行指令场景。
- **社区反应**：当前 **0 评论、0 👍**，但这类问题通常对日常使用影响直接，优先级不低。

### 5. [#3884] [Doc] No document related to enterprise policy enforcement for local sandbox
链接: [Issue #3884](https://github.com/github/copilot-cli/issues/3884)

- **重要性**：企业用户对本地 sandbox 的策略管控与合规说明有明确需求。
- **影响面**：这影响 Copilot CLI 在企业环境中的落地速度，尤其是 MDM / Intune 等管理链路。
- **社区反应**：当前 **0 评论、0 👍**，但属于企业采用门槛问题，文档补齐价值很高。

### 6. [#3883] Feature request: i18n support for the top 10 most-spoken languages
链接: [Issue #3883](https://github.com/github/copilot-cli/issues/3883)

- **重要性**：这是明显的国际化诉求，涉及 UI、提示、错误、帮助文本等全链路本地化。
- **影响面**：如果推进，将显著扩大 Copilot CLI 的全球可达性，尤其是非英语用户群。
- **社区反应**：当前 **1 👍、0 评论**，是今日少数已经获得正向反馈的需求之一，说明有一定共鸣。

---

## 4) 重要 PR 进展

今日更新的 PR 数量为 **0**。  
链接: [GitHub Pull Requests](https://github.com/github/copilot-cli/pulls)

**说明**
- 今日没有可跟踪的 PR 更新，因此本节无具体条目。
- 从当前节奏看，社区主要讨论集中在 Issue 侧，说明仍处于需求收敛与问题暴露阶段。

---

## 5) 功能需求趋势

从今日 Issues 可以看出，社区关注点主要集中在以下方向：

1. **模型控制与推理能力细粒度配置**  
   - 代表：[#3888](https://github.com/github/copilot-cli/issues/3888)  
   - 诉求：将 extended thinking 与 reasoning effort 解耦，提供更精细的模型行为控制。

2. **MCP / 工具链集成稳定性**  
   - 代表：[#3887](https://github.com/github/copilot-cli/issues/3887)  
   - 诉求：注册表安装、变量插值、配置生成等自动化流程要更可靠。

3. **会话管理与成本透明度**  
   - 代表：[#3886](https://github.com/github/copilot-cli/issues/3886)  
   - 诉求：恢复、重启、更新会话时不要产生意外成本，计费行为要可解释。

4. **终端输入与渲染体验**  
   - 代表：[#3885](https://github.com/github/copilot-cli/issues/3885)、Release 中的图片渲染/滚动条设置  
   - 诉求：长文本输入、滚动、富内容显示要更像现代交互工具。

5. **企业可部署性与合规文档**  
   - 代表：[#3884](https://github.com/github/copilot-cli/issues/3884)  
   - 诉求：sandbox、政策、权限、管理方式需要更清晰的官方说明。

6. **国际化 / 本地化**  
   - 代表：[#3883](https://github.com/github/copilot-cli/issues/3883)  
   - 诉求：非英语用户希望获得完整的语言支持，不只是命令行英文原生体验。

---

## 6) 开发者关注点

今日开发者反馈中最突出的痛点与高频需求是：

- **“可控性”**：用户希望对模型推理行为有更细粒度开关，而不是只暴露一个笼统的 effort 参数。  
  - 参考: [#3888](https://github.com/github/copilot-cli/issues/3888)

- **“别乱扣成本”**：会话重启/恢复不应带来额外 AI credits 消耗，尤其在高频交互场景中。  
  - 参考: [#3886](https://github.com/github/copilot-cli/issues/3886)

- **“插件安装要可预期”**：MCP 注册表安装流程需要正确处理变量，否则自动化部署会失真。  
  - 参考: [#3887](https://github.com/github/copilot-cli/issues/3887)

- **“输入体验要像现代编辑器”**：长文本滚动、对话滚动条等细节，直接决定 CLI 是否适合复杂任务。  
  - 参考: [#3885](https://github.com/github/copilot-cli/issues/3885) / [Release v1.0.64-2](https://github.com/github/copilot-cli/releases/tag/v1.0.64-2)

- **“企业环境要能落地”**：代理、sandbox 策略、文档完整性是企业采纳 Copilot CLI 的关键前置条件。  
  - 参考: [#3884](https://github.com/github/copilot-cli/issues/3884) / [Release v1.0.64-3](https://github.com/github/copilot-cli/releases/tag/v1.0.64-3)

- **“国际化需求开始浮现”**：多语言支持已从“可选增强”变成实际社区诉求。  
  - 参考: [#3883](https://github.com/github/copilot-cli/issues/3883)

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发群里的超短版**，或  
2. **适合内部周报的分析版**。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报  
**日期：2026-06-23**  
数据来源：`github.com/MoonshotAI/kimi-cli`

---

## 1) 今日速览
今天社区动态的核心是 **1.48.0 版本发布**，重点修复了空 reasoning 内容的回传问题，并增强了重复工具调用场景下的“提醒 + 强制停止”机制，说明项目正在持续强化推理链路与 agent 稳定性。  
过去 24 小时内新增/更新的讨论主要集中在 **MCP 启动路径、子进程挂起、OpenAI 兼容性参数** 这三类问题，反映出用户对 CLI 在真实工作流中的可用性和兼容性非常敏感。  

---

## 2) 版本发布
### `1.48.0` - [Release 链接](https://github.com/MoonshotAI/kimi-cli/releases/tag/1.48.0)
**已知更新要点：**
- **修复空 reasoning 内容的往返处理**  
  解决 `kosong` 场景下空 reasoning content 无法正确 round-trip 的问题，提升推理链路数据完整性。
- **增强重复工具调用处理**  
  当同一工具调用连续重复时，提醒会分级升级，并在死循环倾向明显时强制停止，减少 agent 陷入无效循环。
- 其余 changelog 在当前数据中被截断，未完整展示。  

---

## 3) 社区热点 Issues
> 说明：过去 24 小时内仅更新了 **3 个 Issue**，以下为全部条目。  
> 社区反馈整体偏早期，**评论数均为 0、点赞数均为 0**，说明问题刚被提报，尚未形成广泛讨论。

### 1. [#2469] `kimi web` 从 CLI 安装目录启动 MCP servers，导致 workspace-relative 工具失效
- 链接：<https://github.com/MoonshotAI/kimi-cli/issues/2469>
- 为什么重要：这是 **工作区相对路径** 和 **MCP 工具启动上下文** 的典型兼容性问题，直接影响 `kimi web` 在多项目环境中的可用性。
- 社区反应：目前无评论/点赞，但从标题看属于会影响真实开发流的高优先级 bug。

### 2. [#2468] Kimi CLI 在 detached child-process tool call 后挂起
- 链接：<https://github.com/MoonshotAI/kimi-cli/issues/2468>
- 为什么重要：涉及 **子进程工具调用后的主流程卡死**，会直接破坏 CLI 交互连续性，是 agent/工具链类产品中非常敏感的稳定性问题。
- 社区反应：当前无跟进讨论，但此类挂起问题通常会迅速影响用户信任。

### 3. [#2465] `OpenAILegacy` 在 thinking off 时发送 `reasoning_effort: null`，违反严格 API 且无法真正关闭 reasoning
- 链接：<https://github.com/MoonshotAI/kimi-cli/issues/2465>
- 为什么重要：这是 **OpenAI 兼容层协议一致性** 问题，涉及 strict API 兼容和参数语义正确性，可能影响第三方模型接入。
- 社区反应：暂无评论，但问题描述较完整，属于容易被维护者快速定位的兼容性缺陷。

---

## 4) 重要 PR 进展
> 说明：过去 24 小时内仅更新了 **3 个 PR**，以下为全部条目。

### 1. [#2471] feat(tools): add Monitor tool for per-line stdout streaming
- 链接：<https://github.com/MoonshotAI/kimi-cli/pull/2471>
- 内容：新增 **Monitor 工具**，用于按行流式输出 stdout，补齐后台任务/长任务的可观测性。
- 价值：这类工具通常能显著提升调试体验，尤其适合需要实时追踪子进程输出的场景。

### 2. [#2467] chore(release): bump kimi-cli to 1.48.0 and kosong to 0.54.0
- 链接：<https://github.com/MoonshotAI/kimi-cli/pull/2467>
- 内容：发布流程 PR，完成 `kimi-cli 1.48.0` 与 `kosong 0.54.0` 的版本提升，并同步 wrapper/pin。
- 价值：说明本次版本发布已完成版本线对齐，是今天最直接的交付动作。

### 3. [#2466] feat(soul): escalate repeated-tool-call reminders and force-stop on dead-end streak
- 链接：<https://github.com/MoonshotAI/kimi-cli/pull/2466>
- 内容：将 repeated-tool-call 处理逻辑引入 `kimi-cli`：重复 3 次后开始持续提醒，并在死循环趋势明显时强制停止。
- 价值：这是典型的 **agent 防循环保护**，可明显降低工具调用卡死和无效轮询风险。

---

## 5) 功能需求趋势
从近 24 小时的 Issues 可以看出，社区最关注的功能方向主要集中在：

1. **MCP / 工具链集成稳定性**
   - `kimi web` 启动 MCP server 的路径问题表明，用户非常在意工作区上下文、相对路径和多项目兼容性。  
   - 相关链接：[#2469](https://github.com/MoonshotAI/kimi-cli/issues/2469)

2. **CLI 执行可靠性与进程管理**
   - 子进程工具调用后挂起，说明大家希望 CLI 在复杂工具链下依然能保持可恢复、可终止、可追踪。  
   - 相关链接：[#2468](https://github.com/MoonshotAI/kimi-cli/issues/2468)

3. **OpenAI 兼容层与严格 API 对齐**
   - `reasoning_effort: null` 这类 wire-level 问题说明，用户非常在意对外部模型/严格 API 的兼容性。  
   - 相关链接：[#2465](https://github.com/MoonshotAI/kimi-cli/issues/2465)

4. **推理链路的可控性**
   - 1.48.0 的修复与 PR #2466 都指向同一主题：避免模型在重复工具调用、空 reasoning、死循环等场景中失控。  
   - 相关链接：[#2466](https://github.com/MoonshotAI/kimi-cli/pull/2466)、[Release 1.48.0](https://github.com/MoonshotAI/kimi-cli/releases/tag/1.48.0)

---

## 6) 开发者关注点
结合今天的反馈，开发者侧最值得关注的痛点/需求是：

- **路径和工作目录语义要一致**  
  `kimi web` 在 CLI 安装目录启动 MCP server 的问题，说明跨目录启动逻辑仍需强化。  
  链接：[#2469](https://github.com/MoonshotAI/kimi-cli/issues/2469)

- **子进程/工具调用不能阻塞主流程**  
  detached child-process 之后挂起属于高优先级稳定性问题，建议重点检查事件循环、stdout/stderr 管道和终止信号处理。  
  链接：[#2468](https://github.com/MoonshotAI/kimi-cli/issues/2468)

- **兼容层参数必须严格符合上游协议**  
  `reasoning_effort: null` 这种“看似关闭、实际无效”的参数传递，容易引发严格 API 拒绝。  
  链接：[#2465](https://github.com/MoonshotAI/kimi-cli/issues/2465)

- **需要更强的 agent 反死循环保护**
  1.48.0 和 #2466 表明维护者已经在修复重复工具调用问题，后续可能还需要更细粒度的阈值、告警和可观测日志。  
  链接：[#2466](https://github.com/MoonshotAI/kimi-cli/pull/2466)、[Release 1.48.0](https://github.com/MoonshotAI/kimi-cli/releases/tag/1.48.0)

- **长任务可观测性正在变重要**
  Monitor 工具 PR 反映出社区对“按行流式 stdout”的需求在增加，便于定位长任务执行过程中的卡顿和异常。  
  链接：[#2471](https://github.com/MoonshotAI/kimi-cli/pull/2471)

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合 Slack/飞书发布的短版**，或  
2. **适合内部周报的表格版**。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-06-23）

## 1) 今日速览
今天社区讨论的重心仍然集中在 **稳定性、提供商兼容性、TUI/桌面体验** 三条主线上：包括性能变慢、模型无响应、插件加载失效、会话恢复异常等问题被持续关注。  
同时，PR 侧也在快速推进一批对日常使用影响很大的修复与增强，例如 `websearch` SSE 处理、清理任务防误删、会话选择器、模型支持扩展等，显示出项目正在围绕“可用性 + 安全性 + 多提供商适配”持续打磨。

---

## 2) 版本发布
无新 Releases。

---

## 3) 社区热点 Issues（精选 10 个）

### 1. [#33466 OpenCode so slow](https://github.com/anomalyco/opencode/issues/33466)
- **为什么重要**：性能直接影响主流程体验，且问题表现为“不同模型、不同机器、不同网络环境都慢”，更像服务端或链路级退化。
- **社区反应**：当天新增并获得 3 条评论，是近期最明确的性能类反馈之一，说明用户感知很强。

### 2. [#33395 DeepSeek V4 Pro (Max) is not showing any response in the official provider](https://github.com/anomalyco/opencode/issues/33395)
- **为什么重要**：影响特定官方提供商可用性，且现象是“无错误但无输出”，排障难度高。
- **社区反应**：已有 3 条评论，说明该问题具备一定复现性，且用户尝试过重装等手段仍未彻底解决。

### 3. [#33455 Plugins from config `plugin` array silently not loaded since v1.17.0](https://github.com/anomalyco/opencode/issues/33455)
- **为什么重要**：插件系统是 OpenCode 扩展生态的重要入口，静默失效会直接破坏用户配置。
- **社区反应**：2 条评论，且问题描述清晰，属于高优先级回归类 bug。

### 4. [#33406 OpenCode Go activo pero la TUI muestra "Insufficient balance" mientras CLI funciona](https://github.com/anomalyco/opencode/issues/33406)
- **为什么重要**：同一账号在 CLI 正常、TUI 异常，说明认证/余额状态在不同客户端间存在不一致。
- **社区反应**：2 条评论，明显属于支付状态与客户端状态同步问题，影响订阅用户信任。

### 5. [#33414 Unable to "cycle"/"select" Agent for model in Desktop UI](https://github.com/anomalyco/opencode/issues/33414)
- **为什么重要**：桌面 UI 中代理选择入口消失，会直接阻断多代理工作流。
- **社区反应**：2 条评论，且用户已经尝试重配快捷键，问题定位较明确。

### 6. [#33379 Agent deletes backups / the only copy of data on broad cleanup tasks](https://github.com/anomalyco/opencode/issues/33379)
- **为什么重要**：这是典型的数据安全高风险问题，涉及误删备份、凭据或唯一副本。
- **社区反应**：2 条评论；随后已出现对应 PR 修复，说明社区对“安全护栏”诉求非常强烈。

### 7. [#33376 [Network connection lost] due to Context overflow at model limit misclassified](https://github.com/anomalyco/opencode/issues/33376)
- **为什么重要**：错误分类会导致本可恢复的上下文溢出被当成网络故障，进而导致会话终止。
- **社区反应**：2 条评论，且描述中已给出详细复盘，属于非常有价值的技术类反馈。

### 8. [#33447 Pre-migration sessions stranded after event-sourcing migration](https://github.com/anomalyco/opencode/issues/33447)
- **为什么重要**：迁移后历史会话不可见、不可续用，影响长期用户数据可访问性。
- **社区反应**：1 条评论，但问题影响面潜在较大，属于数据迁移兼容性问题。

### 9. [#33467 桌面版部分中文汉化问题](https://github.com/anomalyco/opencode/issues/33467)
- **为什么重要**：桌面端国际化细节影响非英文用户体验，尤其是菜单与 aria-label 硬编码。
- **社区反应**：1 条评论，说明是较细但真实的本地化缺口。

### 10. [#33451 [Billing] Go subscription not renewed — $25 paid, only $5 Go received, $20 stuck in Zen balance](https://github.com/anomalyco/opencode/issues/33451)
- **为什么重要**：订阅/账单逻辑直接影响商业闭环与用户留存。
- **社区反应**：2 条评论，且涉及资金流转，通常需要较快确认与修复。

---

## 4) 重要 PR 进展（精选 10 个）

### 1. [#33464 fix(core): replace response.text with collectBoundedResponseBody for websearch SSE handling](https://github.com/anomalyco/opencode/pull/33464)
- **作用**：修复 `websearch` 工具在 SSE 响应场景下读取错误，避免 Tavily/Exa/Parallel 类接口报 400。
- **意义**：直接提升内置搜索工具的兼容性与稳定性。

### 2. [#33463 fix(prompt): guard against deleting backups/credentials on cleanup tasks](https://github.com/anomalyco/opencode/pull/33463)
- **作用**：给“清理/删除旧文件”类任务增加保护，避免误删备份和凭据。
- **意义**：这是高价值安全修复，和用户对“数据不可逆删除”的担忧直接对应。

### 3. [#33462 feat(plugin): expose copilot context choices](https://github.com/anomalyco/opencode/pull/33462)
- **作用**：暴露 GitHub Copilot 的默认上下文与长上下文模型选择。
- **意义**：增强模型选择透明度，也有助于成本与能力平衡。

### 4. [#33460 fix(core): preserve queue after provider failure](https://github.com/anomalyco/opencode/pull/33460)
- **作用**：在 provider 失败时保留队列，不让当前 Session 处理链错误地“吞掉”后续任务。
- **意义**：改善长链路任务的恢复能力，减少会话中断损失。

### 5. [#33458 fix(tui): scope file autocomplete to session](https://github.com/anomalyco/opencode/pull/33458)
- **作用**：把文件自动补全和路径提示限定到当前 session 上下文。
- **意义**：降低跨项目/跨目录误选风险，提升 TUI 使用准确性。

### 6. [#33456 feat(llm): add Mistral AI and Together AI OpenAI-compatible support](https://github.com/anomalyco/opencode/pull/33456)
- **作用**：为 V2 session runner 增加 Mistral/Together AI 的 OpenAI-compatible 支持。
- **意义**：扩大模型生态覆盖，利于多提供商接入。

### 7. [#33454 [contributor] feat(http-recorder): prepare independent beta release](https://github.com/anomalyco/opencode/pull/33454)
- **作用**：为 `@opencode-ai/http-recorder` 建立独立版本生命周期和 beta 发布流程。
- **意义**：有助于模块化演进和独立验证。

### 8. [#33453 fix(provider): default custom models to image input](https://github.com/anomalyco/opencode/pull/33453)
- **作用**：让新建自定义模型默认支持图像输入，并兼容旧版附件能力。
- **意义**：改善多模态模型的开箱即用体验。

### 9. [#33452 [contributor] fix(core): reset steps for promoted prompts](https://github.com/anomalyco/opencode/pull/33452)
- **作用**：当用户输入被提升为模型可见内容时，重置 step allowance。
- **意义**：修正会话推进规则，减少“步数耗尽”带来的体验异常。

### 10. [#33448 fix(tui): preserve worker rejection handling](https://github.com/anomalyco/opencode/pull/33448)
- **作用**：恢复 TUI 后台 worker 的 `unhandledRejection` 处理，避免进程被异常终止。
- **意义**：这是典型稳定性修复，能显著降低桌面/TUI 偶发崩溃风险。

---

## 5) 功能需求趋势
结合今天更新的 Issues 和 PR，社区关注点主要集中在以下方向：

1. **性能与响应时延**
   - 代表：[#33466](https://github.com/anomalyco/opencode/issues/33466)
   - 用户对“慢”“卡”“无响应”的敏感度极高，尤其是在多模型、多机器都出现时。

2. **模型 / Provider 兼容性扩展**
   - 代表：[#33395](https://github.com/anomalyco/opencode/issues/33395)、[#33456](https://github.com/anomalyco/opencode/pull/33456)
   - 社区明显希望覆盖更多供应商与兼容接口，减少 provider-specific 故障。

3. **插件系统可靠性**
   - 代表：[#33455](https://github.com/anomalyco/opencode/issues/33455)、[#33390](https://github.com/anomalyco/opencode/issues/33390)
   - 除了“能用”，用户更在意插件发现、加载和目录化组织方式是否稳定。

4. **TUI / Desktop 可用性**
   - 代表：[#33414](https://github.com/anomalyco/opencode/issues/33414)、[#33467](https://github.com/anomalyco/opencode/issues/33467)、[#33411](https://github.com/anomalyco/opencode/issues/33411)
   - 包括代理选择、中文本地化、滚动提示等，说明 GUI/TUI 细节仍是高频需求。

5. **会话恢复与状态一致性**
   - 代表：[#33447](https://github.com/anomalyco/opencode/issues/33447)、[#33406](https://github.com/anomalyco/opencode/issues/33406)
   - 用户希望历史会话可恢复、订阅/余额状态在不同客户端间一致。

6. **安全护栏与防误操作**
   - 代表：[#33379](https://github.com/anomalyco/opencode/issues/33379)、[#33463](https://github.com/anomalyco/opencode/pull/33463)
   - 对“删除文件”“清理任务”的保护需求非常明确，属于生产级工具的核心诉求。

---

## 6) 开发者关注点
从今天的反馈中，可以提炼出开发者最需要留意的几个痛点：

- **错误分类必须准确**  
  上下文溢出、provider 失败、网络中断这几类错误需要严格区分，否则会导致错误恢复策略失效。  
  参考：[#33376](https://github.com/anomalyco/opencode/issues/33376)

- **插件加载不能静默失败**  
  一旦 `plugin` 配置失效而没有日志，用户会直接认为“系统坏了”。  
  参考：[#33455](https://github.com/anomalyco/opencode/issues/33455)

- **CLI / TUI / Desktop 状态要一致**  
  余额、认证、代理选择、会话状态如果在不同端表现不一致，会快速损伤信任。  
  参考：[#33406](https://github.com/anomalyco/opencode/issues/33406)、[#33414](https://github.com/anomalyco/opencode/issues/33414)

- **长任务和清理任务要有安全边界**  
  “帮我清理一下”不等于“删除备份和唯一副本”，需要默认保护策略。  
  参考：[#33379](https://github.com/anomalyco/opencode/issues/33379)、[#33463](https://github.com/anomalyco/opencode/pull/33463)

- **Provider 兼容性是长期工程**  
  官方提供商、OpenAI-compatible、SSE、MCP 这几类接口都在持续暴露边界问题。  
  参考：[#33395](https://github.com/anomalyco/opencode/issues/33395)、[#33464](https://github.com/anomalyco/opencode/pull/33464)、[#33456](https://github.com/anomalyco/opencode/pull/33456)

如果你需要，我还可以把这份日报进一步整理成：
- **适合内部群发的短版摘要**
- **适合周报/PPT 的表格版**
- **按“Bug / Feature / Security / UX”分类的管理层版本**

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报（2026-06-23）

## 1) 今日速览
今天 Pi 的更新重心集中在 **可观测性与交互体验**：新版本 **v0.79.10** 为扩展压缩事件补充了 `reason` 和 `willRetry`，让扩展能区分手动 `/compact`、阈值自动压缩和溢出重试。  
同时，社区讨论主要围绕 **TUI 可点击性、模型/Provider 选择、会话与认证状态同步、工具调用稳定性** 展开，说明当前用户最在意的是“能否稳定、可解释地工作”。

---

## 2) 版本发布
### v0.79.10
- 新增 **Extension compaction event context**：`session_before_compact` / `session_compact` 事件现在带上 `reason` 与 `willRetry`。  
- 价值：扩展可以更准确地感知压缩来源，避免把手动压缩、自动阈值压缩、overflow 重试混为一谈。  
- GitHub 链接：<https://github.com/badlogic/pi-mono/releases/tag/v0.79.10>

---

## 3) 社区热点 Issues
> 说明：以下挑选的是过去 24 小时内更新、讨论价值最高的 10 个 Issue。多数 Issue 评论数在 1–3 条，说明社区更关注**可复现的具体问题**，而不是泛泛需求。

1. **#5978 - TUI 长 URL 换行后失去可点击性**  
   链接：<https://github.com/earendil-works/pi/issues/5978>  
   为什么重要：影响 OAuth / MCP 授权流程，属于直接阻断型 UX 问题。  
   社区反应：**3 条评论**，属于高可复现、高优先级问题。

2. **#5966 - 删除扩展包无效**  
   链接：<https://github.com/earendil-works/pi/issues/5966>  
   为什么重要：`pi remove` 执行成功但配置未清除，属于扩展生命周期管理 bug。  
   社区反应：**3 条评论**，说明卸载链路存在明显一致性问题。

3. **#5960 - `find` 工具在嵌套 Git 仓库中漏文件**  
   链接：<https://github.com/earendil-works/pi/issues/5960>  
   为什么重要：影响代码搜索与代理工作流，属于核心工具能力缺陷。  
   社区反应：**3 条评论**，反映文件发现逻辑对 `.gitignore` 的处理需要修正。

4. **#5976 - `/model` 意外修改 defaultModel**  
   链接：<https://github.com/earendil-works/pi/issues/5976>  
   为什么重要：命令行为与用户预期不一致，涉及“临时选择”和“默认配置”的边界。  
   社区反应：**2 条评论**，属于典型配置语义争议。

5. **#5973 - OpenAI Codex WebSocket 限制导致会话结束**  
   链接：<https://github.com/earendil-works/pi/issues/5973>  
   为什么重要：连接达到 60 分钟上限后未自动续连，影响长会话稳定性。  
   社区反应：**2 条评论**，体现对长任务不中断的需求。

6. **#5972 - `--model` 支持 `provider/model` 复合字符串**  
   链接：<https://github.com/earendil-works/pi/issues/5972>  
   为什么重要：简化模型传参方式，减少 provider 与 model 的歧义。  
   社区反应：**2 条评论**，属于易用性与兼容性需求。

7. **#5968 - 流式 completion 失败时诊断信息不足**  
   链接：<https://github.com/earendil-works/pi/issues/5968>  
   为什么重要：错误被吞掉会显著增加排障成本，尤其在自定义 provider 上。  
   社区反应：**1 条评论**，但问题描述非常具体，属于高价值故障反馈。

8. **#5971 - `/login` 后新 Provider 不刷新到 `/model` 列表**  
   链接：<https://github.com/earendil-works/pi/issues/5971>  
   为什么重要：认证状态与会话内存态不同步，导致新接入 provider 不可见。  
   社区反应：**1 条评论**，但直接影响新用户接入体验。

9. **#5969 - 增加 Carapace Completion 支持**  
   链接：<https://github.com/earendil-works/pi/issues/5969>  
   为什么重要：Shell 补全是 CLI 工具生态的重要入口，直接影响命令发现率。  
   社区反应：**1 条评论**，属于基础设施型需求。

10. **#5958 - 允许扩展暴露 changelog**  
    链接：<https://github.com/earendil-works/pi/issues/5958>  
    为什么重要：扩展更新后缺少变更说明，影响扩展生态的可维护性。  
    社区反应：**1 个 👍**、**0 评论**，是今天少数明确得到正向反馈的开放需求。

---

## 4) 重要 PR 进展
> 说明：过去 24 小时实际更新到的 PR 共 **8 条**，以下为全部重点 PR。

1. **#5987 - 通过 identity daemon 按 agent 名称解析 `--session`**  
   链接：<https://github.com/earendil-works/pi/pull/5987>  
   作用：让 `--session` 支持直接传 agent name，再由 daemon 映射到 session 文件路径。

2. **#5985 - 新增 Merge Gateway Provider**  
   链接：<https://github.com/earendil-works/pi/pull/5985>  
   作用：把 Merge Gateway 作为内建 OpenAI-compatible provider，降低多模型接入门槛。

3. **#5981 - 将纯文本 URL 自动 linkify**  
   链接：<https://github.com/earendil-works/pi/pull/5981>  
   作用：修复长 OAuth URL 在 TUI 中换行后不可点击的问题，并补充回归测试。

4. **#5979 - 修复 `session-id-readonly.test.ts` 在 clean main 上的失败**  
   链接：<https://github.com/earendil-works/pi/pull/5979>  
   作用：通过 mock 或 dummy API key 解决测试前置条件导致的失败。

5. **#5977 - 为 Anthropic provider 增加显式 `authMode` 覆盖**  
   链接：<https://github.com/earendil-works/pi/pull/5977>  
   作用：替代硬编码的 token 判断方式，提高认证模式可配置性。

6. **#5970 - DeepSeek V4 Pro/Flash 成本优化自动路由扩展**  
   链接：<https://github.com/earendil-works/pi/pull/5970>  
   作用：根据任务复杂度自动路由到不同模型，降低成本。

7. **#5963 - 拒绝格式错误的最终 tool call 参数**  
   链接：<https://github.com/earendil-works/pi/pull/5963>  
   作用：在共享 AI stream 路径中校验最终 JSON，避免 malformed tool call 被执行。

8. **#5962 - 扩展压缩事件增加 reason 与 willRetry**  
   链接：<https://github.com/earendil-works/pi/pull/5962>  
   作用：与本次版本发布同步，增强扩展对 compaction 场景的可观测性。

---

## 5) 功能需求趋势
从今天的 Issue 分布看，社区最关注的方向主要有 5 类：

1. **模型/Provider 兼容性与配置简化**  
   代表：`#5972`、`#5965`、`#5985`、`#5967`  
   关键词：`provider/model` 语法、Provider 命名清晰度、更多内建 provider、Reasoning 等级映射。

2. **会话、认证与状态同步**  
   代表：`#5971`、`#5987`、`#5973`  
   关键词：登录后刷新、session 解析、长连接续接、状态一致性。

3. **TUI / CLI 交互体验**  
   代表：`#5978`、`#5969`、`#5959`、`#5974`  
   关键词：链接可点击、Shell completion、命令文档准确性、PR/Issue body 生成。

4. **核心工具与检索能力**  
   代表：`#5960`、`#5980`  
   关键词：`find` 覆盖范围、嵌套仓库识别、Ollama context length 自动化。

5. **诊断、稳定性与测试可靠性**  
   代表：`#5968`、`#5964`、`#5982`、`#5979`  
   关键词：错误可解释、流式 tool call 校验、测试环境前置条件、CI 稳定性。

---

## 6) 开发者关注点
今天社区反馈暴露出几个高频痛点：

- **状态不同步**：`/login` 后 provider 不立即可见、`/model` 改默认值等问题，说明配置层与运行时状态的边界仍不够清晰。  
- **错误不可诊断**：流式 completion 失败、WebSocket 限制到期后直接结束，会让用户难以判断是模型问题还是框架问题。  
- **工具链体验细节不足**：长 URL、Shell completion、文档链接、PR body 换行等，都是“看似小但影响很大”的开发流畅度问题。  
- **扩展生态 API 在增强**：compaction 事件上下文、changelog 暴露、agent session resume 等需求，说明扩展作者正在向更完整的生命周期钩子和运行时能力推进。  
- **测试与文档漂移**：多条 Issue 指向测试失败、文档链接失效、usage table 漂移，反映项目进入快速迭代后，维护自动化与文档同步成为关键。

---

如果你需要，我也可以把这份日报进一步整理成：
1. **适合发群的超短版**，或  
2. **适合内部周报的分析版**。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报｜2026-06-23

截至今天，过去 24 小时 **没有新 Release**。社区讨论和代码推进高度集中在 **输入校验收紧、会话/工具链稳定性、终端与 IDE 体验修复**，同时也出现了针对 **AI 自动化流程治理** 的增强。

## 1) 今日速览
- 过去一天的热点几乎被一条主线串起来：**把“本该是整数/正数/安全值”的参数全部收紧**，覆盖 session、serve、MCP、LSP、read_file、shell、配置项等多个模块。
- 另一方面，社区也在集中反馈 **终端可视化、工具输出重复、token 统计、web_fetch JSON 支持** 等直接影响使用体验的问题。  
- 值得注意的是，仓库开始正面处理 **AI 生成 PR/自动 triage 的噪音与风险**，说明项目治理也在同步升级。

---

## 2) 社区热点 Issues

### 1. [#5708](https://github.com/QwenLM/qwen-code/issues/5708) session list cursor 可接受负值与不安全值
- **重要性**：涉及 session 分页游标的安全性与正确性，影响 CLI / ACP HTTP 的会话列表行为。
- **社区反应**：**5 条评论**，属于高关注问题；说明会话管理的边界校验正在被集中审视。

### 2. [#5656](https://github.com/QwenLM/qwen-code/issues/5656) 将 tool-use summary 从历史记录移到 loading indicator
- **重要性**：直接影响对话历史的可读性，属于典型的终端 UX 优化需求。
- **社区反应**：**5 条评论**，说明“历史记录噪音”是明显痛点，尤其在 fast-model 场景下。

### 3. [#5713](https://github.com/QwenLM/qwen-code/issues/5713) Alacritty 中光标半不可见
- **重要性**：终端输入光标可见性是高频使用场景的基础体验，影响日常交互。
- **社区反应**：**4 条评论**，说明 Linux/终端用户对可用性很敏感。

### 4. [#5641](https://github.com/QwenLM/qwen-code/issues/5641) 当前 npm latest 版本会重复提交已完成的 shell tool 结果
- **重要性**：属于核心执行链路 bug，会导致工具调用结果重复、影响 agent 行为稳定性。
- **社区反应**：**4 条评论**，可见该问题对实际自动化执行可靠性影响较大。

### 5. [#5634](https://github.com/QwenLM/qwen-code/issues/5634) autofix tier-1 过度信任 LLM 应用的 ready-for-agent 标签
- **重要性**：这是 **自动化安全与工作流可信度** 问题，可能让未经过人工验证的 issue 直接进入后续处理链。
- **社区反应**：**4 条评论**，讨论重点集中在“标签是否能作为可信信号”。

### 6. [#5704](https://github.com/QwenLM/qwen-code/issues/5704) maxSessions 接受小数
- **重要性**：session 容量上限是典型计数参数，小数值会造成语义混乱或边界偏差。
- **社区反应**：**3 条评论**，与近期一系列“整数/正数校验”问题形成明显共振。

### 7. [#5700](https://github.com/QwenLM/qwen-code/issues/5700) sessions list --limit 遇到非法值时静默回退默认值
- **重要性**：CLI 参数不应“悄悄修正”用户输入，否则难以排查问题。
- **社区反应**：**3 条评论**，体现社区对 CLI 可预测性的要求较高。

### 8. [#5698](https://github.com/QwenLM/qwen-code/issues/5698) shell / monitor 参数运行时要求整数，但 schema 却写成 number
- **重要性**：这是典型的 **schema 与运行时校验不一致**，会影响自动化工具调用与文档可信度。
- **社区反应**：**3 条评论**，说明开发者对接口契约一致性很关注。

### 9. [#5611](https://github.com/QwenLM/qwen-code/issues/5611) web_fetch 不能抓取 JSON API，因只发送 text/* Accept
- **重要性**：直接阻断对 GitHub REST API 等 JSON 服务的访问，影响开发类工作流。
- **社区反应**：**3 条评论**，属于高实用价值问题，优先级很高。

### 10. [#5683](https://github.com/QwenLM/qwen-code/issues/5683) 子 agent token 计数准确性异常
- **重要性**：token 统计错误会影响预算、监控和模型使用判断，尤其在本地模型场景更关键。
- **社区反应**：**3 条评论**，说明“可观测性可信度”也是社区关心点。

---

## 3) 重要 PR 进展

### 1. [#5723](https://github.com/QwenLM/qwen-code/pull/5723) 强化 PR gate，防止批量噪音和红旗模式
- **内容**：为 triage 流程加入批量检测、问题存在性检查和红旗模式识别。
- **意义**：针对近期 AI bot 一天提交大量 PR 的情况，属于 **治理层面的关键修复**。

### 2. [#5724](https://github.com/QwenLM/qwen-code/pull/5724) 通过 QWEN_HOME 隔离 ACP 集成测试 agent
- **内容**：给每个测试 agent 分配独立的全局配置目录，避免并行测试互相污染。
- **意义**：明显提升 **CI 稳定性**，减少并发设置竞态。

### 3. [#5728](https://github.com/QwenLM/qwen-code/pull/5728) 为 ACP set_config_option 测试使用确定性 OpenAI provider model
- **内容**：让测试依赖固定模型，避免环境变化导致断言不稳定。
- **意义**：提升 **测试可重复性**，对 ACP 相关验证很重要。

### 4. [#5720](https://github.com/QwenLM/qwen-code/pull/5720) 使用高对比度软件光标
- **内容**：替换终端相关性较强的 reverse-video 光标样式，改善深色主题下的可见性。
- **意义**：直接修复终端 UX 问题，和当前 Alacritty 光标反馈形成呼应。

### 5. [#5709](https://github.com/QwenLM/qwen-code/pull/5709) 拒绝非法 session list cursor
- **内容**：对 cursor 做更严格校验，拒绝负值、空字符串和过大值。
- **意义**：对应 Issue #5708，属于会话分页安全修复。

### 6. [#5707](https://github.com/QwenLM/qwen-code/pull/5707) 拒绝 fractional maxConnections
- **内容**：限制 daemon listener 的连接上限必须是合理整数。
- **意义**：修复 serve 参数边界问题，避免运行时语义偏移。

### 7. [#5705](https://github.com/QwenLM/qwen-code/pull/5705) 拒绝 fractional maxSessions
- **内容**：让 ACP session bridge 的 session 上限回到“计数值”语义。
- **意义**：与 #5704 高度对应，属于会话管理硬化的一部分。

### 8. [#5703](https://github.com/QwenLM/qwen-code/pull/5703) 校验 mcp add timeout
- **内容**：`qwen mcp add --timeout` 改为正整数校验，非法值在参数解析阶段失败。
- **意义**：减少错误配置写入，避免后续 MCP 调用不稳定。

### 9. [#5701](https://github.com/QwenLM/qwen-code/pull/5701) 校验 sessions list limit
- **内容**：`qwen sessions list --limit` 不再对非法显式值静默回退。
- **意义**：提升 CLI 可预期性，与当前社区对参数校验的关注一致。

### 10. [#5699](https://github.com/QwenLM/qwen-code/pull/5699) 声明整数型 tool 参数
- **内容**：将 shell / monitor 中的整数参数 schema 从 `number` 改为 `integer`。
- **意义**：修复接口描述与运行时校验不一致的问题，降低调用方误用风险。

---

## 4) 功能需求趋势

### 1. **参数与配置校验全面收紧**
最明显的趋势是：社区正在集中清理 **fraction / NaN / Infinity / 负值 / 0 / unsafe integer** 等边界输入。  
覆盖范围包括：
- session 管理
- serve / daemon 参数
- MCP timeout
- LSP / read_file / shell / monitor 参数
- extension scope
- cron prompt
- VS Code openFile 位置

### 2. **工具链输出与可观测性更可信**
用户不仅要“能跑”，还要“显示正确”：
- shell 结果重复提交
- token 统计不准确
- tok/s 显示闪烁或消失
- web_fetch 对 JSON API 不兼容

### 3. **终端与 IDE 交互体验持续被放大**
高频反馈集中在：
- 光标可见性
- 对话历史是否太嘈杂
- 位置跳转是否越界
- 输入状态提示是否足够明确

### 4. **AI 自动化治理开始成为新重点**
包括：
- triage 流程的抗噪音能力
- 自动化标签是否能作为可信信号
- AI 辅助 PR 是否会漏测 integration tests
- 测试是否足够 deterministic

---

## 5) 开发者关注点

### 高频痛点 1：**“看似合法、实则不可用”的参数**
大量反馈都在指出：很多参数虽然通过了 `number` 类型检查，但在业务上其实应该是 **整数、正数或安全整数**。  
这类问题会导致：
- 配置静默失真
- 运行时行为偏移
- 调试成本上升

### 高频痛点 2：**schema 与 runtime 不一致**
像 #5698 这种问题说明，开发者非常在意：
- 文档/JSON Schema 是否真实反映运行时约束
- 工具调用方是否能依靠 schema 正确生成参数

### 高频痛点 3：**测试稳定性与并发隔离不足**
PR #5724、#5728 反映出一个现实需求：  
AI 辅助开发带来的一个副作用是测试更容易受环境影响，所以项目开始强化：
- 隔离配置目录
- 固定 provider/model
- 减少并行竞态

### 高频痛点 4：**终端 UX 与可见性细节**
Alacritty 光标、加载态摘要、tok/s 显示，说明开发者并不只关心功能本身，也在意：
- 状态是否清晰
- 输出是否“安静”
- 深色主题下是否可读

### 高频痛点 5：**自动化流程的可信边界**
#5634 和 #5723 表明，社区开始认真对待：
- LLM 生成内容是否可直接触发自动流程
- triage / autofix 是否需要更强的保护阈值

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **更适合公众号/周报的简版**  
2. **更适合内部研发晨会的要点版**  
3. **带“风险等级 / 优先级 / 负责人建议”的行动清单版**

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报（2026-06-23）

## 1) 今日速览
今天社区的主线非常清晰：**从“DeepSeek TUI”向“CodeWhale”统一品牌与能力边界继续收敛**，同时围绕 **provider/model 选择、兼容性校验、setup 向导和文档站点一致性** 这几条线密集推进。  
从 Issues 和 PR 看，维护重点已经从单点功能扩展，转向 **“可用性 + 可维护性 + 兼容性”** 的系统性打磨；不过社区公开讨论热度仍偏弱，更多是维护者主导的规划与修复。

---

## 2) 版本发布
- **[v0.8.64: CodeWhale v0.8.64](https://github.com/Hmbown/DeepSeek-TUI/releases/tag/v0.8.64)**  
  这是一次偏“品牌与分发层”的发布：官方说明明确了 **CodeWhale 才是 canonical 项目名 / 命令名 / npm 包名 / release 资产名**，旧的 `deepseek-tui` npm 包已弃用，不再继续发布；从 `v0.8.x` 的旧命名迁移需要参考 `docs/REBRAND.md`。  
  对用户来说，这意味着后续安装、命令和文档都要按 CodeWhale 新体系理解。

---

## 3) 社区热点 Issues
> 过去 24 小时更新的 41 条 Issues 中，以下 10 条最值得关注。

1. **[#3383](https://github.com/Hmbown/DeepSeek-TUI/issues/3383) v0.8.65：provider-scoped model candidates for /model, picker, and slash completions**  
   这是今天最关键的产品一致性问题之一：`/model`、选择器、slash completions 需要统一按 provider 作用域取候选，避免“裸模型名”隐式切换 provider。  
   **社区反应：** 1 条评论，属于少数有互动的线程之一，说明这类“路由语义”问题确实被重视。

2. **[#3382](https://github.com/Hmbown/DeepSeek-TUI/issues/3382) v0.8.65：Hosted provider offering validation regression for Together DeepSeek routes**  
   这是一个典型的兼容性回归：Together 的 DeepSeek 路由在校验时被误判，说明 provider-scoped offering 与 resolved-route 校验链路还不够稳定。  
   **社区反应：** 1 条评论，直接体现出这个问题具有真实用户影响。

3. **[#3402](https://github.com/Hmbown/DeepSeek-TUI/issues/3402) v0.8.67 EPIC：CodeWhale setup wizard and guided configuration hub**  
   这是一个总入口级 EPIC，目标是把零散的首次配置、`/config`、`/provider`、MCP、skills/plugins、remote setup 等流程统一进一个向导。  
   **重要性：** 这会决定新用户的第一印象，也会影响后续功能是否“可发现、可配置、可验证”。

4. **[#3405](https://github.com/Hmbown/DeepSeek-TUI/issues/3405) v0.8.67 Setup：provider/model step with catalog, auth, picker, and live health checks**  
   这条直接命中首轮配置的最高摩擦点：provider / model 的选择、认证、候选列表和在线健康检查。  
   **重要性：** 它把“模型选择问题”从单纯 UI 问题提升到了配置与健康检查的一体化问题。

5. **[#3404](https://github.com/Hmbown/DeepSeek-TUI/issues/3404) v0.8.67 Setup：implement the setup wizard shell, navigation, resume, and `/setup` entry point**  
   这是整个 setup wizard 的骨架：导航、状态恢复、入口统一都靠它。  
   **重要性：** 没有这个 shell，后续 provider、安全、工具等步骤都只能是碎片化页面。

6. **[#3406](https://github.com/Hmbown/DeepSeek-TUI/issues/3406) v0.8.67 Setup：trust, approvals, sandbox, network, and privacy step**  
   该议题把安全边界前置到首次配置阶段，涉及 workspace trust、approval policy、sandbox、网络访问和隐私设置。  
   **重要性：** 这代表项目越来越重视“安全默认值”而不是事后补救。

7. **[#3415](https://github.com/Hmbown/DeepSeek-TUI/issues/3415) v0.8.69：Add a website fact-drift gate for version, providers, and tool inventory**  
   这是一个很典型的“站点事实漂移”问题：官网快照可能落后于仓库真实状态。  
   **重要性：** 对外网站如果信息陈旧，会直接伤害项目可信度。

8. **[#3419](https://github.com/Hmbown/DeepSeek-TUI/issues/3419) v0.8.69：Add a public Runtime API and integrations page to codewhale.net**  
   这条反映出项目的对外集成面已经扩大：HTTP/SSE、ACP runtime API、VS Code 扩展、Telegram/Feishu 等都需要在官网清晰呈现。  
   **重要性：** 说明社区开始把 CodeWhale 当成一个平台而不是单纯 TUI 工具。

9. **[#3417](https://github.com/Hmbown/DeepSeek-TUI/issues/3417) v0.8.69：Promote existing repo docs into full website documentation with parity checks**  
   当前仓库文档已较丰富，但官网文档层级偏浅，这条任务的目标是把 repo 文档真正“搬上站点”，并加入一致性检查。  
   **重要性：** 这是降低新用户学习成本、减少“GitHub 文档和官网不一致”最直接的动作。

10. **[#3401](https://github.com/Hmbown/DeepSeek-TUI/issues/3401) v0.8.66 Hotbar：end-to-end QA matrix and release gate**  
    Hotbar 牵涉配置、键盘输入、侧边栏、命令调度、MCP/tools、skills/plugins 和 setup wizard，因此需要完整的发布门禁。  
    **重要性：** 这是从“功能能跑”走向“版本可发”的关键一步。

---

## 4) 重要 PR 进展
> 以下 10 个 PR 代表了今天最核心的实现与修复方向。

1. **[#3428](https://github.com/Hmbown/DeepSeek-TUI/pull/3428) fix(tui): scope model candidates to active provider**  
   对应 #3383，核心是让 `/model`、picker、slash completions 只在当前 provider 范围内给候选，避免裸模型字符串引发误切换。

2. **[#3427](https://github.com/Hmbown/DeepSeek-TUI/pull/3427) test(provider): pin SiliconFlow TokenHub route diagnostics**  
   为 SiliconFlow-CN / TokenHub 风格的 OpenAI 兼容网关补回归测试，确保 route、base_url、模型解析稳定。

3. **[#3426](https://github.com/Hmbown/DeepSeek-TUI/pull/3426) fix(tui): accept Together-owned DeepSeek routes**  
   修复 Together provider 下 DeepSeek V4 Pro / Flash 路由的校验与映射问题，避免合法 route 被错误拒绝。

4. **[#3425](https://github.com/Hmbown/DeepSeek-TUI/pull/3425) feat(provider): add Qianfan route fixture**  
   新增百度千帆（Qianfan）作为一等 OpenAI-compatible provider fixture，补齐 API key、base URL、模型环境变量与别名。

5. **[#3424](https://github.com/Hmbown/DeepSeek-TUI/pull/3424) test(provider): document DashScope OpenAI-compatible fixture**  
   为阿里百炼 / DashScope 增加文档与回归样例，覆盖区域化 compatible-mode/v1 base URL 和模型映射。

6. **[#3423](https://github.com/Hmbown/DeepSeek-TUI/pull/3423) docs(provider): document OpenRouter-compatible base URLs**  
   补齐 OpenRouter 兼容网关的文档与示例配置，并同步到 `config.example.toml`，降低接入成本。

7. **[#3422](https://github.com/Hmbown/DeepSeek-TUI/pull/3422) test(tui): cover Codex Responses retry edges**  
   增强 OpenAI Codex / Responses 路径的重试测试，补 503 等瞬时失败场景，提高流式请求可靠性。

8. **[#3381](https://github.com/Hmbown/DeepSeek-TUI/pull/3381) Feat/memory tags**  
   记忆标签能力的新增 PR，说明社区还在继续扩展 agent / memory 相关能力。

9. **[#3379](https://github.com/Hmbown/DeepSeek-TUI/pull/3379) feat(tui): apply file ask rules at runtime**  
   将 `permissions.toml` 里的 file-path ask 规则接入运行时审批链路，强化文件操作的授权控制。

10. **[#3378](https://github.com/Hmbown/DeepSeek-TUI/pull/3378) fix(cli): kill delegated server child on uncatchable dispatcher death**  
    修复 CLI 在不可捕获的 dispatcher 退出场景下遗留子进程的问题，避免 delegated server 孤儿进程。

---

## 5) 功能需求趋势
从今天的 Issues 来看，社区关注点正在收敛到以下几条主线：

- **Provider / Model 兼容性与路由规范化**  
  包括 Together、SiliconFlow、Qianfan、DashScope、OpenRouter 等 OpenAI-compatible 接入，以及 provider-scoped model 解析。

- **首次配置与 setup wizard 一体化**  
  目标是把 provider、工具、安全、Hotbar、远程/移动端等配置入口统一成一个连续流程，降低上手成本。

- **官网与仓库文档的同步与可信度**  
  社区明显在意“官网是否真实反映当前能力”，因此 fact-drift gate、官网文档补齐、官方站点/镜像说明都很热。

- **安全、审批与可恢复性**  
  trust、sandbox、network、privacy、config migration、secret handling、QA matrix 这些关键词反复出现，说明项目正在从“功能型工具”走向“可控型平台”。

- **Hotbar / 快捷操作体系成熟化**  
  Hotbar 不只是 UI 小功能，而是命令、工具、skills、plugins、setup 的入口层能力。

---

## 6) 开发者关注点
今天从反馈里能看到的高频痛点主要有：

- **模型名与 provider 的边界容易混淆**：裸 model string 触发跨 provider 切换的风险很高。  
- **配置路径太分散**：首次使用、后续配置、远程设置、工具与安全设置都在不同入口里，学习成本偏高。  
- **文档/官网容易过时**：仓库更新快，但站点快照、路由说明、术语和实际能力容易漂移。  
- **配置持久化必须“无损”**：要保留注释、未知字段、旧路径、overlay 和 secrets，不能简单重写 TOML。  
- **发布需要更强的 QA 门禁**：尤其是 Hotbar、provider 路由、审批链路、流式重试和子进程生命周期这几类高风险点。

如果你需要，我可以把这份日报再整理成 **“适合发 Slack/飞书的精简版”** 或 **“带趋势图表的周报格式”**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*