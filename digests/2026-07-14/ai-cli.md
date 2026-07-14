# AI CLI 工具社区动态日报 2026-07-14

> 生成时间: 2026-07-14 00:58 UTC | 覆盖工具: 9 个

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

以下是基于 2026-07-14 各 AI CLI 工具社区动态整理的横向对比分析。

---

## 1) 生态全景

当前 AI CLI 生态已从“能跑通任务”进入“**稳定性、可观测性、跨平台一致性**”的深水区。  
社区讨论的重心明显从新功能转向真实生产场景中的回归修复、上下文治理、Agent 可靠性和协议一致性。  
整体上，工具正在向两条路线分化：一类强化 **Agent/子代理/工作流编排**，另一类强化 **终端交互、桌面集成和多工作区协作**。  
与此同时，**安全边界、计费可信度、诊断能力** 正成为所有头部工具的共同门槛。  
这意味着 AI CLI 的竞争焦点，已经从“模型接入能力”转向“系统工程能力”。

---

## 2) 各工具活跃度对比

| 工具 | 今日 Issues 数 | 今日 PR 数 | Release 情况 |
|---|---:|---:|---|
| Claude Code | 10 | 3 | 未提及 |
| OpenAI Codex | 10 | 10 | 3 个 Release |
| Gemini CLI | 6 | 8 | 未提及 |
| GitHub Copilot CLI | 9 | 0 | 未提及 |
| Kimi Code CLI | 2 | 1 | 未提及 |
| OpenCode | 10 | 10 | 2 个 Release |
| Pi | 10 | 10 | 未提及 |
| Qwen Code | 10 | 10 | 2 个 Release |
| DeepSeek TUI | 5 | 3 | 未提及 |

### 读数简析
- **最高活跃梯队**：OpenAI Codex、OpenCode、Pi、Qwen Code，均呈现“高 Issues + 高 PR +（部分）Release”的强迭代特征。
- **高讨论但修复偏少**：Claude Code、Copilot CLI，Issues 多但 PR 少，说明社区压力较高、工程修复节奏相对慢。
- **中低频但聚焦明确**：Gemini CLI、DeepSeek TUI、Kimi Code CLI，问题量较少，但指向性强，偏工程收敛阶段。

---

## 3) 共同关注的功能方向

### A. 上下文治理与会话恢复
多个工具都在处理“长会话如何稳定续跑”的问题。  
- **Claude Code**：`--resume`、skills 重挂载、subagent transcript 注入  
- **OpenAI Codex**：compaction checkpoint、审批状态一致性、session state  
- **Kimi Code CLI**：forked session 恢复输出损坏  
- **OpenCode / Pi / Qwen Code / DeepSeek TUI**：compaction、memory、session storage、execution receipts、history search

**共同诉求**：上下文不要污染、不要丢、不要重复注入，且恢复后状态必须可预测。

---

### B. Agent / 子代理可靠性
Agent 执行链路的稳定性，是今天最明显的共性主题之一。  
- **Claude Code**：subagent transcript、background task、plan mode 边界  
- **Gemini CLI**：Agent 状态机死循环、web search / web fetch 不可用  
- **Copilot CLI**：阻塞 read_bash 无法后台化、ACP 并行 subagent 身份丢失  
- **Kimi Code CLI**：ACP 下结构化问答失效  
- **OpenCode / DeepSeek TUI / Pi**：task tool 超时、forced tool calls、exec stream receipts

**共同诉求**：Agent 不能“看起来完成了但实际没做完”，而且要有明确的 stop / cancel / timeout / detach 语义。

---

### C. MCP / ACP / 协议与工具链同步
生态扩展层面的协议一致性成为高频问题。  
- **Claude Code**：MCP 配置容错、tools/list_changed 同步  
- **Codex**：app-server、remote pairing、tool analytics、blocked request routing  
- **Copilot CLI**：canvas RPC、ACP 事件语义  
- **Kimi Code CLI**：ACP server mode 的 structured question  
- **Pi**：rpc_stream、JSONL、forced tool calls  
- **Qwen Code**：tool-call preparation、serve/daemon 路由  
- **DeepSeek TUI**：versioned exec stream receipts

**共同诉求**：工具调用链路要可发现、可同步、可回放、可归因，不能静默失效。

---

### D. 跨平台兼容与桌面/终端体验
跨平台回归几乎遍布所有头部项目。  
- **Claude Code**：macOS Tahoe、Windows、Linux、安全边界  
- **Codex**：Windows、WSL、Sandbox、桌面端卡顿  
- **Gemini CLI**：VS Code Dev Container、Linux、Android 相关  
- **Copilot CLI**：Windows 自更新、Linux 剪贴板、macOS Dock  
- **OpenCode**：Windows 路径/权限、Nix、headless  
- **Qwen Code**：Windows Terminal、WSL2/Linux、桌面端  
- **Pi**：Windows、Node 24、npm 11  
- **DeepSeek TUI**：BSD 兼容性

**共同诉求**：CLI 已不再是“单机终端玩具”，而是跨平台生产工具，平台差异必须系统化处理。

---

### E. 安全、信任与透明性
安全与行为可解释性正在从边缘议题变成核心指标。  
- **Claude Code**：bgIsolation symlink 绕过、后台任务“隐瞒修改”  
- **OpenCode**：compaction summary 注入可执行指令  
- **Qwen Code**：trust-status preview 污染缓存  
- **Codex**：blocked proxy routing、审批状态回退  
- **Pi / DeepSeek TUI**：状态持久化、会话身份安全

**共同诉求**：模型链路不能把“建议”误当“指令”，也不能让预览态污染持久态。

---

## 4) 差异化定位分析

### Claude Code
- **功能侧重**：Subagent、skills、hooks、MCP、IDE 集成
- **目标用户**：深度使用 agent 工作流的开发者、IDE 用户、自动化链路重度用户
- **技术路线**：强调上下文治理和工具生态联动
- **特点**：能力强，但复杂工作流下的稳定性和安全边界是核心挑战

### OpenAI Codex
- **功能侧重**：桌面端、远程协作、diagnostics、app-server
- **目标用户**：桌面工作流用户、远程协作团队、需要强可观测性的工程用户
- **技术路线**：以 app-server/telemetry/协作能力为主线
- **特点**：产品化与可追踪性很强，但 Windows/桌面端回归明显

### Gemini CLI
- **功能侧重**：核心 Agent 稳定性、IDE/Dev Container 集成、性能
- **目标用户**：偏工程实践的 CLI 用户、容器/VS Code 场景用户
- **技术路线**：稳态优先，先补齐基础可用性
- **特点**：问题数量少但优先级高，属于“打底层稳定性”的路线

### GitHub Copilot CLI
- **功能侧重**：交互可控性、扩展协议、跨平台基础体验
- **目标用户**：GitHub 生态用户、偏轻量 CLI 用户、扩展开发者
- **技术路线**：更像“能力接口层”而非重型 agent 平台
- **特点**：当前社区更关注基础体验和协议正确性，PR 节奏相对平缓

### Kimi Code CLI
- **功能侧重**：会话恢复、ACP 结构化交互、上下文预算
- **目标用户**：长会话、分叉续跑、协议接入型用户
- **技术路线**：围绕长上下文和结构化协作做精细优化
- **特点**：更新量较少，但方向非常明确，偏“关键路径修复 + 核心能力打磨”

### OpenCode
- **功能侧重**：多模型接入、权限系统、TUI/V2、headless 自动化
- **目标用户**：自动化执行者、重度 CLI 用户、模型/Provider 适配者
- **技术路线**：快速迭代、强集成、强扩展
- **特点**：版本和 PR 密集，典型的高速演进型项目

### Pi
- **功能侧重**：provider 兼容、compaction、RPC、memory、session storage
- **目标用户**：需要跨模型/跨 provider 编排的高级用户
- **技术路线**：更偏 orchestration / middleware
- **特点**：基础设施味道很重，强调协议层和上下文层的正确性

### Qwen Code
- **功能侧重**：serve/daemon、多工作区、扩展管理、trust/safety
- **目标用户**：团队协作、workspace 级管理、桌面/终端混合使用者
- **技术路线**：平台化 + 工作区化 + 运维可观测
- **特点**：在“多 workspace + 多 provider + 多交互入口”上推进明显

### DeepSeek TUI
- **功能侧重**：TUI 交互、exec stream、receipt、agent 生命周期
- **目标用户**：偏终端工作流、重视交互可控性的用户
- **技术路线**：结构化事件流 + 版本化协议 + TUI 体验收尾
- **特点**：更像“把终端 agent 做到可测试、可回放”的路线

---

## 5) 社区热度与成熟度

### 社区热度最高
- **Claude Code、OpenAI Codex、OpenCode、Pi、Qwen Code**
- 共同特征：Issues 和 PR 都高频，说明都处于强使用、强反馈、强修复阶段。
- 其中：
  - **Codex / OpenCode / Qwen / Pi** 更像快速迭代中的平台型项目
  - **Claude Code** 更像高关注度下的复杂系统收敛期

### 讨论热度较高但修复节奏较慢
- **Claude Code、GitHub Copilot CLI**
- 现象：Issues 不少，但 PR 相对少，说明社区压力和产品成熟度之间仍有落差。

### 处于快速迭代阶段
- **OpenCode、Qwen Code、Pi、OpenAI Codex**
- 现象：Issue/PR 双高，且有持续 Release，说明团队在密集收敛能力和修复回归。

### 更偏功能打磨或小规模社区
- **Kimi Code CLI、DeepSeek TUI、Gemini CLI**
- 特征：问题总量较少，聚焦于核心路径和关键体验，适合做深度优化。

---

## 6) 值得关注的趋势信号

### 1. AI CLI 正在平台化，而不只是命令行壳
从 **serve/daemon、app-server、desktop、workspace、multi-provider** 等关键词看，CLI 正在演变成“可嵌入的执行平台”。  
**参考价值**：开发者需要把 CLI 当作系统，而不是单纯的前端。

### 2. 长会话治理成为新核心能力
Compaction、resume、memory、session storage、history search 频繁出现。  
**参考价值**：未来竞争点很可能不是“谁能回答”，而是“谁能稳定记住、恢复、续跑、压缩而不失真”。

### 3. 协议层正确性比单点功能更重要
MCP/ACP/RPC/stream/receipt 的问题密集，说明生态稳定性依赖协议契约。  
**参考价值**：工具厂商要把协议一致性、状态同步和错误归因放在比 UI 更高的位置。

### 4. 安全边界从“权限控制”升级到“上下文污染防护”
提示注入、trust cache 污染、后台任务透明性、summary 注入都在表明：  
**风险不只来自用户输入，也来自中间态和压缩态**。  
**参考价值**：需要对“摘要、预览、缓存、恢复”建立独立安全模型。

### 5. 跨平台兼容仍是长期成本中心
Windows、macOS、Linux、WSL、BSD、Dev Container 几乎全覆盖。  
**参考价值**：AI CLI 真正进入生产后，平台差异会持续放大维护成本，测试矩阵必须前置。

### 6. 可观测性与可审计性成为购买和采用门槛
timestamp、session_id、OTel、usage、cost、error reason、tool metadata 都在变得重要。  
**参考价值**：没有足够的诊断信息，AI CLI 很难在团队环境里规模化落地。

---

如果你愿意，我可以进一步把这份报告压缩成：
1. **管理层一页纸摘要版**，或  
2. **研发周会可直接投屏的表格版**。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截至 2026-07-14）

> 说明：你提供的 PR 数据里“评论数”字段为 `undefined`，因此以下“热门”主要结合 **PR 主题、关联 Issue 热度、重复出现的问题类型、对核心链路的影响程度** 综合判断。

---

## 1) 热门 Skills 排行

### 1. [#1298] fix(skill-creator): run_eval.py always reports 0% recall
- **功能**：修复 `skill-creator` 的评测链路，使 `run_eval.py / run_loop.py / improve_description.py` 能正确评估 skill 描述效果。
- **社区讨论热点**：  
  - `recall=0%` 始终不变，导致描述优化循环“在噪音上优化”
  - Windows 兼容性、流读取、触发检测、并行 worker 等一并修复
- **状态**：OPEN  
- **链接**：https://github.com/anthropics/skills/pull/1298

### 2. [#1323] fix(skill-creator): run_eval trigger detection misses real skill name
- **功能**：修复 `run_eval.py` 无法识别技能真实触发的问题。
- **社区讨论热点**：  
  - `run_loop.py` 评测回忆率长期为 0
  - 触发检测过早退出，导致优化失效
- **状态**：OPEN  
- **链接**：https://github.com/anthropics/skills/pull/1323

### 3. [#1261] fix(skill-creator): isolate trigger-eval command files from the live project registry
- **功能**：避免评测脚本把临时 command 文件写入真实项目 `.claude/commands/`，污染用户工作区。
- **社区讨论热点**：  
  - 并行评测时会影响真实 Claude Code 会话
  - 这是“评测影响生产环境”的典型安全/隔离问题
- **状态**：OPEN  
- **链接**：https://github.com/anthropics/skills/pull/1261

### 4. [#1099] skill-creator: fix run_eval.py crash on Windows when reading from subprocess pipe
- **功能**：修复 Windows 下 `run_eval.py` 子进程 pipe 读取崩溃。
- **社区讨论热点**：  
  - Windows 上技能优化/评测不可用
  - 直接导致所有 query 被标记为 not triggered
- **状态**：OPEN  
- **链接**：https://github.com/anthropics/skills/pull/1099

### 5. [#1050] skill-creator: fix Windows subprocess + encoding bugs
- **功能**：修复 Windows 下 `subprocess` 启动和编码问题。
- **社区讨论热点**：  
  - `claude.cmd` / `PATHEXT` 兼容
  - cp1252/编码问题影响脚本稳定性
- **状态**：OPEN  
- **链接**：https://github.com/anthropics/skills/pull/1050

### 6. [#1367] feat(skills): add self-audit
- **功能**：新增“自审计”Skill，强调机械检查 + 四维推理质量门控。
- **社区讨论热点**：  
  - AI 输出交付前的质量控制
  - 通用性强，适用于任意项目/技术栈
- **状态**：OPEN  
- **链接**：https://github.com/anthropics/skills/pull/1367

### 7. [#723] feat: add testing-patterns skill
- **功能**：新增测试模式 Skill，覆盖测试哲学、单元测试、React 组件测试等。
- **社区讨论热点**：  
  - 测试生成与测试策略的标准化
  - “测试金字塔 / Testing Trophy / AAA” 等工程方法论
- **状态**：OPEN  
- **链接**：https://github.com/anthropics/skills/pull/723

### 8. [#514] Add document-typography skill
- **功能**：新增文档排版质量控制 Skill，解决孤行、寡行、编号对齐等问题。
- **社区讨论热点**：  
  - AI 生成文档的“可读性/出版质量”
  - 偏“细节质量”但覆盖高频文档场景
- **状态**：OPEN  
- **链接**：https://github.com/anthropics/skills/pull/514

---

## 2) 社区需求趋势

### A. 技能评测、触发与优化链路的可靠性
- **代表 Issue**：[#556](https://github.com/anthropics/skills/issues/556), [#1169](https://github.com/anthropics/skills/issues/1169), [#1061](https://github.com/anthropics/skills/issues/1061)
- **趋势判断**：社区最急迫的不是“再加一个 Skill”，而是先把 **skill-creator 的评测闭环修好**，包括触发检测、Windows 兼容、并行评测隔离、编码问题等。
- **关注点**：回忆率错误、CLI 不稳定、平台兼容性。

### B. 文档类 Skills 仍然是刚需
- **代表 Issue/PR**：[#95](https://github.com/anthropics/skills/issues/95), [#514](https://github.com/anthropics/skills/pull/514), [#486](https://github.com/anthropics/skills/pull/486)
- **趋势判断**：文档生成、格式转换、模板填充、排版质量控制是最稳定的需求之一。
- **关注点**：Word/ODT/PDF/企业文档、格式准确性、排版质量。

### C. 测试、审查、质量门控类 Skills 需求增强
- **代表 Issue/PR**：[#723](https://github.com/anthropics/skills/pull/723), [#412](https://github.com/anthropics/skills/issues/412), [#1385](https://github.com/anthropics/skills/issues/1385)
- **趋势判断**：社区不只想让 Claude“写代码”，更希望它能 **在交付前做质量控制**：测试生成、代码/输出审查、推理质量门控。
- **关注点**：代码审查、测试策略、输出自检、流程门禁。

### D. 企业协作与共享能力缺口明显
- **代表 Issue**：[#228](https://github.com/anthropics/skills/issues/228), [#492](https://github.com/anthropics/skills/issues/492), [#189](https://github.com/anthropics/skills/issues/189)
- **趋势判断**：企业用户更关心 **Skills 的分发、共享、命名边界与信任模型**，而不是单个 Skill 功能。
- **关注点**：组织级共享、命名空间冒用、安全边界、重复安装冲突。

### E. 长上下文/代理工作流方向开始升温
- **代表 Issue**：[#1329](https://github.com/anthropics/skills/issues/1329), [#16](https://github.com/anthropics/skills/issues/16), [#412](https://github.com/anthropics/skills/issues/412)
- **趋势判断**：社区希望 Skills 能支持更复杂的 **代理状态管理、MCP 化、治理与审计**，从“单点能力”走向“工作流基础设施”。
- **关注点**：compact memory、agent governance、MCP 接口化。

---

## 3) 高潜力待合并 Skills

> 这里选的是 **问题影响面大、讨论集中、且明显是“基础设施型修复/高频能力”** 的开放 PR。

### 1. [#1298] run_eval 0% recall 修复
- **为什么高潜力**：这是 skill-creator 核心闭环问题，属于“阻塞型 bug”。
- **落地可能性**：很高
- **链接**：https://github.com/anthropics/skills/pull/1298

### 2. [#1323] 触发检测修复
- **为什么高潜力**：直接影响描述优化和 Skill 评测结果，和 #1298 互补。
- **落地可能性**：很高
- **链接**：https://github.com/anthropics/skills/pull/1323

### 3. [#1261] 评测文件隔离修复
- **为什么高潜力**：解决并行评测污染用户环境的问题，属于安全与工程隔离修复。
- **落地可能性**：高
- **链接**：https://github.com/anthropics/skills/pull/1261

### 4. [#1099] Windows pipe crash 修复
- **为什么高潜力**：Windows 用户的直接阻塞问题，且与评测链路强相关。
- **落地可能性**：高
- **链接**：https://github.com/anthropics/skills/pull/1099

### 5. [#1050] Windows subprocess/encoding 修复
- **为什么高潜力**：补齐跨平台可用性，通常属于较容易合并的稳定性修复。
- **落地可能性**：高
- **链接**：https://github.com/anthropics/skills/pull/1050

### 6. [#723] testing-patterns
- **为什么高潜力**：测试类 Skill 需求广、通用性强，且与代码生成场景高度匹配。
- **落地可能性**：中高
- **链接**：https://github.com/anthropics/skills/pull/723

### 7. [#1367] self-audit
- **为什么高潜力**：通用质量控制能力，符合“交付前验证”的社区诉求。
- **落地可能性**：中高
- **链接**：https://github.com/anthropics/skills/pull/1367

---

## 4) Skills 生态洞察

**一句话总结：**  
当前社区对 Skills 的核心诉求，已经从“多几个新技能”转向 **“把 Skills 做得更可靠、更可共享、更可验证，并能服务于测试、审查、文档和代理工作流”**。

如果你愿意，我可以继续把这份报告整理成：
1. **适合汇报的 PPT 式一页摘要**，或  
2. **按“产品 / 工程 / 安全”三视角的深度分析版**。

---

# 2026-07-14 Claude Code 社区动态日报

## 1) 今日速览
今天社区讨论的核心仍然是**稳定性与上下文正确性**：包括 system prompt 泄漏、subagent 异常返回、`--resume` 失效、MCP 工具刷新不及时等问题，说明 Claude Code 在复杂工作流下的可靠性仍是重点。  
另一方面，**安全与跨平台兼容**也很突出，macOS Tahoe、Windows、Linux 都出现了较具体的回归或边界问题，社区对“可复现、可定位”的问题反馈非常集中。  
GitHub 链接：<https://github.com/anthropics/claude-code>

---

## 2) 社区热点 Issues

1. **[#77327](https://github.com/anthropics/claude-code/issues/77327) Non-interactive system prompts 被注入到交互式会话**
   - **为什么重要**：这类问题会直接污染对话上下文，影响模型行为与用户信任，属于“核心交互层”问题。
   - **社区反应**：已有复现报告，且标签明确指向 `ide/vscode`，说明影响面比较聚焦但严重性高。

2. **[#77333](https://github.com/anthropics/claude-code/issues/77333) macOS Tahoe 下内置代理导致 Go 程序 TLS 校验失败**
   - **为什么重要**：影响 `gh`、`flyctl` 等常用 Go CLI，属于“Claude Code 代理能力”对外部工具兼容性的硬回归。
   - **社区反应**：这是带有 `has repro` 的平台级问题，通常意味着排查路径已较清晰，优先级较高。

3. **[#77287](https://github.com/anthropics/claude-code/issues/77287) bgIsolation 的 containment 检查可被 symlink 绕过**
   - **为什么重要**：涉及安全边界，属于潜在漏洞级问题，不只是功能 bug。
   - **社区反应**：有复现、跨 Linux 安全/sandbox 标签明显，属于最应优先处理的一类 issue。

4. **[#77313](https://github.com/anthropics/claude-code/issues/77313) `claude --resume` 在 deferred-tool-call / plan-mode 边界后永久失效**
   - **为什么重要**：会破坏会话恢复能力，影响长任务、后台 agent、计划模式联动场景。
   - **社区反应**：问题描述明确，牵涉 TUI/core/agents，多模块交叉，说明该路径仍不够稳。

5. **[#77325](https://github.com/anthropics/claude-code/issues/77325) 无效 MCP 配置导致不可归因错误、清理暂停、权限提示循环**
   - **为什么重要**：MCP 是生态扩展关键链路；配置容错差会放大用户排障成本。
   - **社区反应**：来自真实配置错误场景，反映出对“错误提示质量”和“恢复能力”的高需求。

6. **[#77314](https://github.com/anthropics/claude-code/issues/77314) MCP client 未在 `tools/list_changed` 后重新拉取工具列表**
   - **为什么重要**：动态工具发现失效会让新工具“不可达”，直接削弱 MCP 的实时扩展价值。
   - **社区反应**：`has repro` + Windows 平台，说明这是可验证的协议/状态同步问题。

7. **[#77326](https://github.com/anthropics/claude-code/issues/77326) VS Code 扩展把 subagent 全量 transcript 直接展开显示**
   - **为什么重要**：会显著增加噪音和上下文负担，影响 IDE 内使用体验与审阅效率。
   - **社区反应**：社区更偏向“产品体验改进”诉求，说明 IDE 集成已从“能用”走向“好用”。

8. **[#77323](https://github.com/anthropics/claude-code/issues/77323) Skill 激活期间每轮都重挂载完整内容，且绕过 hooks**
   - **为什么重要**：会导致上下文膨胀，还可能破坏 hooks 设计，影响可控性与成本。
   - **社区反应**：问题细节深入，说明高级用户已开始关注技能系统的上下文治理。

9. **[#77324](https://github.com/anthropics/claude-code/issues/77324) 后台任务文件变更提醒要求 agent 隐瞒修改**
   - **为什么重要**：涉及行为透明性与安全边界，属于高敏感交互问题。
   - **社区反应**：虽然评论不多，但内容非常敏感，社区会高度关注其合规与安全影响。

10. **[#77336](https://github.com/anthropics/claude-code/issues/77336) Fable 5 100 美元套餐在 2 分钟内耗尽会话额度**
   - **为什么重要**：直接影响付费用户体验与成本可信度，容易触发大量支持请求。
   - **社区反应**：评论虽少，但“额度异常快速耗尽”通常会引发较高的用户敏感度。

---

## 3) 重要 PR 进展

> 过去 24 小时仅更新了 3 个 PR，重点集中在 **hookify / 插件链路修复**。

1. **[#77292](https://github.com/anthropics/claude-code/pull/77292) docs(plugins): 修正插件 README 中的 marketplace 名称**
   - 统一插件文档中的安装命令与真实 marketplace 名称，避免用户照着文档安装失败。
   - 这是典型的“文档修复，但能直接减少支持成本”的 PR。

2. **[#77289](https://github.com/anthropics/claude-code/pull/77289) Fix hookify prompt rules on Windows**
   - 修复 Windows 下 `hookify` 的 prompt 规则因 UTF-8 编码 / prompt 字段问题而静默失效。
   - 重点改善“规则没生效但返回 0”的隐性故障，属于高价值修复。

3. **[#77260](https://github.com/anthropics/claude-code/pull/77260) fix(hookify): 匹配 Write 和 prompt rules**
   - 让文件规则正确识别 `Write` 的新内容，并补齐 prompt 规则映射。
   - 同时加入回归测试，说明维护者正在加强规则系统的可预测性。

---

## 4) 功能需求趋势

从今天的 Issues 看，社区最关注的方向主要有：

- **IDE / Desktop 集成体验优化**
  - VS Code、Desktop app、subagent transcript 展示方式等体验问题较集中。
  - 关键词：更少噪音、更可折叠的子代理输出、更清晰的会话结构。
  - 相关链接示例：[#77326](https://github.com/anthropics/claude-code/issues/77326)

- **MCP 生态稳定性与动态同步**
  - 包括无效配置容错、`tools/list_changed` 同步、并发访问、MCP widget 渲染开关等。
  - 说明生态能力在扩张，但“协议一致性”和“状态同步”仍是痛点。
  - 相关链接示例：[#77325](https://github.com/anthropics/claude-code/issues/77325)、[#77314](https://github.com/anthropics/claude-code/issues/77314)

- **Agent / Subagent 行为可靠性**
  - 典型诉求是：不要 prompt echo、不要无工具使用就“完成”、不要重复注入技能正文。
  - 本质上是上下文治理与任务执行可靠性。
  - 相关链接示例：[#77323](https://github.com/anthropics/claude-code/issues/77323)、[#77331](https://github.com/anthropics/claude-code/issues/77331)

- **安全与沙箱边界**
  - `bgIsolation`、后台任务提示、文件变更透明性等问题，说明用户对安全隔离和行为可解释性非常敏感。
  - 相关链接示例：[#77287](https://github.com/anthropics/claude-code/issues/77287)、[#77324](https://github.com/anthropics/claude-code/issues/77324)

- **跨平台兼容性**
  - macOS Tahoe、Windows、Linux 都有较具体的边缘问题，尤其是代理、编码、MCP、恢复机制。
  - 说明产品已进入多平台深水区，平台差异是长期议题。
  - 相关链接示例：[#77333](https://github.com/anthropics/claude-code/issues/77333)、[#77289](https://github.com/anthropics/claude-code/pull/77289)

- **计费/额度可预期性**
  - 付费套餐额度异常消耗会快速损害信任，属于商业敏感问题。
  - 相关链接示例：[#77336](https://github.com/anthropics/claude-code/issues/77336)

---

## 5) 开发者关注点

今天的反馈里，开发者最明显的痛点可以归纳为 6 类：

1. **上下文污染**
   - system prompt、skills、subagent transcript 的重复注入，会让会话越来越难控。

2. **工具链稳定性**
   - MCP、hooks、sandbox、代理这几层一旦有状态同步问题，整个自动化链路就容易断。

3. **会话恢复能力**
   - `--resume`、后台任务、plan mode、deferred tool call 之间的组合场景仍然脆弱。

4. **跨平台回归**
   - macOS Tahoe 和 Windows 的问题都表明，平台差异会直接影响生产力工具的可信度。

5. **安全与透明性**
   - 沙箱绕过、后台任务“隐瞒变更”等问题会触发安全和合规层面的关注。

6. **成本与额度体验**
   - 用户对“费用消耗速度”和“session limit”异常非常敏感，必须保证可解释、可预测。

---

如果你愿意，我也可以把这份日报进一步整理成 **适合发到 Slack / 飞书群的短版**，或者输出为 **表格版周报模板**。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-07-14）

## 1. 今日速览
今天 Codex 社区的讨论，几乎被 **桌面端/Windows 相关回归** 和 **CLI 稳定性问题** 占据：包括任务创建超时、界面卡顿、Sandbox/WSL 失败、审批状态回退等。  
与此同时，仓库侧持续推进 **app-server / 远程协作 / 诊断与遥测** 能力建设，说明团队一边修复线上体验，一边补齐可观测性与上下文管理能力。  
整体看，今天的重点不是新功能“炫技”，而是 **稳定性、可用性和可追踪性** 的集中修补。

---

## 2. 版本发布

### rust-v0.144.3
- 版本号：0.144.3  
- 内容：仅做 version-only release，**未包含自 v0.144.2 以来的新合并 PR 变更**。  
- 链接：<https://github.com/openai/codex/releases/tag/rust-v0.144.3>

### rust-v0.144.2
- 版本号：0.144.2  
- 内容：修复了 **Guardian 自动审核策略 / 请求格式 / 工具行为**，回滚了一个 prompt regression。  
- 关联 PR：#32672  
- 链接：<https://github.com/openai/codex/releases/tag/rust-v0.144.2>

### rust-v0.145.0-alpha.7
- 版本号：0.145.0-alpha.7  
- 内容：预览版发布，当前摘要未展示具体变更。  
- 链接：<https://github.com/openai/codex/releases/tag/rust-v0.145.0-alpha.7>

---

## 3. 社区热点 Issues

### 1) 升级后的桌面端丢失 Projects
- Issue：#32893  
- 链接：<https://github.com/openai/codex/issues/32893>
- 关注原因：用户升级到新 ChatGPT 桌面端后，Work 界面看不到原有项目，属于 **数据/工作区可见性** 的高优先级问题。
- 社区反应：3 条评论，说明问题已被较快复现和跟进，且直接影响用户工作入口。

### 2) 新 ChatGPT App 中创建任务持续超时
- Issue：#32861  
- 链接：<https://github.com/openai/codex/issues/32861>
- 关注原因：任务无法创建，属于 **核心功能不可用**，直接阻断 Codex 使用。
- 社区反应：已有 3 条评论，说明并非单点故障，反馈集中在最近版本。

### 3) Desktop-to-Desktop Remote 配对失败
- Issue：#32882  
- 链接：<https://github.com/openai/codex/issues/32882>
- 关注原因：远程配对失败会直接影响 **跨设备协作**，属于新工作流的关键路径问题。
- 社区反应：已有多名用户补充评论，问题定位指向 connection/host ID 更新链路。

### 4) Chrome 扩展已连接但无法控制浏览器
- Issue：#32876  
- 链接：<https://github.com/openai/codex/issues/32876>
- 关注原因：浏览器控制是 Codex 自动化的重要能力，这个问题会让 **Web 自动化链路失效**。
- 社区反应：2 条评论，复现路径明确，且错误指向 Windows Sandbox helper。

### 5) 现有任务审批模式反复回退为 on-request
- Issue：#32862  
- 链接：<https://github.com/openai/codex/issues/32862>
- 关注原因：审批模式会影响自动化执行能力，反复回退意味着 **用户配置无法稳定生效**。
- 社区反应：2 条评论，且涉及 full-access/no-approval 仍无效，属于权限状态一致性问题。

### 6) 选中某个聊天会导致其他聊天重排或消失
- Issue：#32860  
- 链接：<https://github.com/openai/codex/issues/32860>
- 关注原因：这是典型的 **会话列表状态异常**，对多任务并行用户影响很大。
- 社区反应：2 条评论，问题表现为“选择即扰动其他会话”，非常影响信任感。

### 7) 新 ChatGPT 桌面端界面非常卡顿
- Issue：#32859  
- 链接：<https://github.com/openai/codex/issues/32859>
- 关注原因：性能退化是桌面端可用性的硬指标，卡顿会让用户直接放弃使用。
- 社区反应：1 条评论但带有明确“almost stuck”描述，属于高痛感反馈。

### 8) 处理 prompt 时退出，仍扣 credits
- Issue：#32854  
- 链接：<https://github.com/openai/codex/issues/32854>
- 关注原因：这是 **计费可信度** 问题，影响用户对平台公平性的判断。
- 社区反应：2 条评论，且涉及“没做完工作却扣费”，用户敏感度极高。

### 9) ChatGPT Plus 的 /status 缺少 5 小时 usage window
- Issue：#32840  
- 链接：<https://github.com/openai/codex/issues/32840>
- 关注原因：缺少限额信息会导致 **配额和使用预期不可见**，影响 CLI 使用体验。
- 社区反应：2 条评论，说明受影响用户对状态可视化有明确需求。

### 10) /subagents 没有显示交互式子代理线程选择器
- Issue：#32909  
- 链接：<https://github.com/openai/codex/issues/32909>
- 关注原因：这是 CLI 子代理交互的可发现性/可用性问题，涉及 **高级工作流入口**。
- 社区反应：1 条评论，属于新功能/交互层面的早期反馈。

---

## 4. 重要 PR 进展

### 1) 为 app-server 通知增加发送时间戳
- PR：#32905  
- 链接：<https://github.com/openai/codex/pull/32905>
- 作用：给 server notification 增加 `emittedAtMs`，提升事件链路的时间分析能力。
- 价值：有助于排查延迟、乱序和响应链问题。

### 2) 在 tool item analytics 中加入 session ID
- PR：#32903  
- 链接：<https://github.com/openai/codex/pull/32903>
- 作用：工具调用埋点补充 `session_id`，并保留 subagent 线程的父 session 信息。
- 价值：增强多线程/多任务场景下的归因能力。

### 3) 从 turn context 派生协作设置
- PR：#32900  
- 链接：<https://github.com/openai/codex/pull/32900>
- 作用：减少 `TurnContext` 与 `CollaborationMode` 的重复状态同步问题。
- 价值：降低配置漂移，尤其适合模型切换或协作模式变化时。

### 4) 为 exec-server 增加 environment/status 检查
- PR：#32899  
- 链接：<https://github.com/openai/codex/pull/32899>
- 作用：新增 `environment/status` RPC，输出 ready/pending/disconnected。
- 价值：让环境准备状态可观测，减少“明明没准备好却开始执行”的问题。

### 5) 暴露结构化的 standalone web search 结果
- PR：#32898  
- 链接：<https://github.com/openai/codex/pull/32898>
- 作用：把 web search 的结构化结果 DTO 暴露给 app-server 客户端。
- 价值：支持更复杂的搜索结果消费和 UI 呈现。

### 6) 将被策略拦截的网络请求路由回对应调用
- PR：#32897  
- 链接：<https://github.com/openai/codex/pull/32897>
- 作用：blocked proxy request 会终止对应 tool call，并保留正确审批结果。
- 价值：解决并发工具调用下的归因混乱。

### 7) 从有界 rollout 后缀加载模型上下文
- PR：#32896  
- 链接：<https://github.com/openai/codex/pull/32896>
- 作用：避免重放整个分页 rollout，改为利用 compaction checkpoint + completed-turn metadata。
- 价值：提升长会话恢复性能，减少上下文重建成本。

### 8) 序列化插件安装请求
- PR：#32894  
- 链接：<https://github.com/openai/codex/pull/32894>
- 作用：`request_plugin_install` 不再支持并行工具调用。
- 价值：防止插件安装并发导致状态冲突。

### 9) 为诊断上传附加 connector caches
- PR：#32891  
- 链接：<https://github.com/openai/codex/pull/32891>
- 作用：把 Codex Apps 工具 cache 和 connector directory cache 一并打包进日志上传。
- 价值：显著提升线上故障排查效率。

### 10) 按命令类别标记 shell tool 遥测
- PR：#32887  
- 链接：<https://github.com/openai/codex/pull/32887>
- 作用：对 `exec_command` / `shell_command` 增加 `command_category` 标签。
- 价值：帮助区分读、写、搜索、混合类命令，便于分析真实使用行为。

---

## 5. 功能需求趋势

从今天的 Issues 看，社区最关注的方向主要有以下几类：

1. **桌面端稳定性与性能**
   - Windows/macOS 桌面端卡顿、崩溃、界面闪烁、任务列表错乱、内存暴涨等问题最集中。
   - 说明用户已经把 Codex 从“能用”提升到“好用、稳定”的预期。

2. **Windows 生态兼容性**
   - WSL 切换、Sandbox、workspace-write、browser helper、Git 写入等问题密集出现。
   - Windows 显然仍是当前回归最严重的平台。

3. **任务/会话状态一致性**
   - 审批模式回退、聊天顺序错乱、历史隐藏、stale conversation state 等，都是状态管理问题。
   - 用户对“上下文不丢、状态不漂移”要求非常高。

4. **浏览器与远程协作能力**
   - Chrome extension 控制、Remote pairing、desktop-to-desktop 协作失败，说明自动化/远程协作链路仍需加强。

5. **CLI/TUI 的可发现性与可解释性**
   - `/status`、`/subagents`、MCP OAuth、鼠标滚动、交互式 picker 等反馈，说明用户希望 CLI 更直观、更少黑盒。

6. **配额、计费与执行结果透明化**
   - usage window 缺失、处理失败仍扣 credits、任务 timeout 等问题，表明用户希望系统“可解释、可核对”。

---

## 6. 开发者关注点

今天社区反馈里最突出的开发者痛点是：

- **“更新后回归”频繁**：桌面端新版本带来的功能回归和体验退化较多，说明发布质量控制压力较大。
- **Windows 问题占比过高**：Sandbox、WSL、浏览器控制、Git 写入、性能等问题高度集中。
- **长会话/多任务稳定性不足**：审批状态、会话状态、上下文压缩、旧状态回潮等问题会严重影响复杂工作流。
- **诊断信息不够充分**：用户常遇到超时、断连、卡死，但缺少足够的状态可见性；因此 PR 中的 timestamp、session_id、环境状态检查非常关键。
- **高级功能入口不够顺手**：subagents、MCP、remote pairing 等能力已经有了，但交互路径和反馈还不够稳定。
- **计费与执行结果可信度敏感**：用户对“没做完却扣费”非常敏感，任何失败都必须可追踪、可解释。

如需，我可以把这份日报进一步整理成：
- **适合公众号/内部晨报的精简版**
- **带风险评级的管理层版本**
- **按“Windows / CLI / app-server / telemetry”分类的技术雷达版**

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报｜2026-07-14

## 1) 今日速览
今天仓库没有新 Release，但 Issues 和 PR 仍然集中在 **核心稳定性、性能优化、Agent 可靠性、VS Code/Dev Container 集成** 这几条主线上。  
从优先级看，**P1/P2 的核心问题占比高**，说明社区当前最关心的不是新功能，而是“能否稳定、快速、可控地运行”。  
社区互动整体不算高（多数 Issue 评论很少），但问题都较具体，适合快速进入修复和回归验证节奏。  

---

## 2) 社区热点 Issues（共 6 条）

### 1. #28390 Browser agent 和 web search 工具不可用
- **重要性**：这是直接影响 Agent 能力的 **P1 级故障**，涉及 `google_web_search` 和 `web_fetch` 失败，属于核心功能不可用。
- **社区反应**：当前评论为 0，但优先级最高，说明问题严重性高于讨论热度。
- 链接：<https://github.com/google-gemini/gemini-cli/issues/28390>

### 2. #28399 Gemini CLI v0.50.0 在 VS Code Dev Container 中无法加载 `.gemini/settings.json`
- **重要性**：影响 **workspace 级配置加载**，直接破坏 Dev Container 场景下的个性化设置和团队共享配置。
- **社区反应**：已有 2 条评论，说明该问题在容器/IDE 集成场景里较容易被复现和确认。
- 链接：<https://github.com/google-gemini/gemini-cli/issues/28399>

### 3. #28395 主线程同步 I/O 导致 UI 卡顿
- **重要性**：这是典型的 **性能与交互流畅性问题**，影响 React Ink 终端 UI 的响应速度，属于“体感明显”的问题。
- **社区反应**：已有 1 条评论，且与对应 PR 已形成修复链路，表明问题推进较快。
- 链接：<https://github.com/google-gemini/gemini-cli/issues/28395>

### 4. #28392 后台 Shell 执行产生临时目录泄漏
- **重要性**：这是 **资源泄漏** 问题，长期运行会累积垃圾目录，影响稳定性和系统清理成本。
- **社区反应**：1 条评论，属于“可重现、可修”的工程型问题，已进入具体修复阶段。
- 链接：<https://github.com/google-gemini/gemini-cli/issues/28392>

### 5. #28393 GeminiCLI.com 页面反馈：认证成功/失败并提示工具已弃用
- **重要性**：这类问题虽然是 **问答/反馈类**，但牵涉到官网、认证流程和产品叙事，容易引发用户对产品状态的误解。
- **社区反应**：0 评论，但问题本身带有“产品是否还在维护”的疑问，值得维护者尽快澄清。
- 链接：<https://github.com/google-gemini/gemini-cli/issues/28393>

### 6. #28396 Android 相关问题
- **重要性**：当前信息较少，但来自外部 CI/构建链路，可能是跨平台兼容性或依赖环境问题。
- **社区反应**：2 条评论，说明已有人在追踪，但仍处于信息不足阶段。
- 链接：<https://github.com/google-gemini/gemini-cli/issues/28396>

> 备注：今日仅有 6 条更新 Issue，因此以上为全部重点项。

---

## 3) 重要 PR 进展（共 8 条）

### 1. #28397 修复 Shell 工具关键路径中的同步 I/O
- **内容**：将 `fs.mkdtempSync / existsSync / statSync` 替换为异步 API。
- **意义**：直接对应 UI 卡顿问题，是典型的 **性能与交互优化**。
- 链接：<https://github.com/google-gemini/gemini-cli/pull/28397>

### 2. #28394 在后台进程退出时清理临时文件
- **内容**：修复 `is_background: true` 执行后残留临时目录的问题。
- **意义**：解决资源泄漏，改善长期运行稳定性。
- 链接：<https://github.com/google-gemini/gemini-cli/pull/28394>

### 3. #28389 为事件驱动 Agent 状态转移增加真实时间预算
- **内容**：引入共享 deadline，避免状态机进入无限循环。
- **意义**：这是 **Agent 可靠性** 的关键修复，能显著降低“卡死/自旋”风险。
- 链接：<https://github.com/google-gemini/gemini-cli/pull/28389>

### 4. #28388 收窄 `tools.core` 的 wildcard deny 范围，只作用于内建工具
- **内容**：修复 `tools.core` 配置误伤 MCP 工具的问题。
- **意义**：增强权限/策略系统的准确性，避免配置带来“全禁用”副作用。
- 链接：<https://github.com/google-gemini/gemini-cli/pull/28388>

### 5. #28387 为 `customDeepMerge` 增加循环引用保护
- **内容**：避免 settings 中出现循环引用时递归爆栈。
- **意义**：提升配置管理鲁棒性，属于高价值的稳定性修复。
- 链接：<https://github.com/google-gemini/gemini-cli/pull/28387>

### 6. #28386 跟踪 VS Code 扩展激活时的 disposables
- **内容**：修复激活路径中注册项未被正确纳入 `context.subscriptions` 的问题。
- **意义**：减少扩展生命周期管理缺陷，提升 IDE 集成质量。
- 链接：<https://github.com/google-gemini/gemini-cli/pull/28386>

### 7. #28398 简化 Plan Mode 写入策略，支持相对路径
- **内容**：放宽 `.md` 路径匹配规则，解决 nightly 测试失败。
- **状态**：已关闭。
- **意义**：改善计划模式的可用性，减少对路径格式的过度限制。
- 链接：<https://github.com/google-gemini/gemini-cli/pull/28398>

### 8. #28391 为共享项目配额限制错误增加设置提示
- **内容**：在 429 / RESOURCE_EXHAUSTED 场景中加入更明确的 GCP 项目配置提示。
- **状态**：已关闭。
- **意义**：提升错误可读性和自助排障效率，降低新手门槛。
- 链接：<https://github.com/google-gemini/gemini-cli/pull/28391>

> 备注：今日仅更新 8 条 PR，因此以上为全部重点项。

---

## 4) 功能需求趋势

从今日 Issues 看，社区最关注的功能方向主要有以下几类：

1. **IDE / 容器环境集成**
   - 代表问题：`.gemini/settings.json` 在 VS Code Dev Container 中不生效。
   - 说明用户希望 Gemini CLI 在远程容器、工作区配置、编辑器联动上更稳定。
   - 链接：<https://github.com/google-gemini/gemini-cli/issues/28399>

2. **Agent 可靠性与可控性**
   - 代表问题：web search / web fetch 失败、状态机可能无限循环。
   - 说明用户对“Agent 能不能稳定执行任务”非常敏感。
   - 链接：<https://github.com/google-gemini/gemini-cli/issues/28390>, <https://github.com/google-gemini/gemini-cli/pull/28389>

3. **性能与交互流畅性**
   - 代表问题：同步 I/O 导致 UI 卡顿。
   - 说明终端 UI 的响应速度已经成为实际使用中的关键体验指标。
   - 链接：<https://github.com/google-gemini/gemini-cli/issues/28395>, <https://github.com/google-gemini/gemini-cli/pull/28397>

4. **稳定性与资源管理**
   - 代表问题：后台 shell 临时目录泄漏、配置深拷贝循环引用。
   - 说明社区很关注长时间运行场景下的内存/文件/句柄健康度。
   - 链接：<https://github.com/google-gemini/gemini-cli/issues/28392>, <https://github.com/google-gemini/gemini-cli/pull/28394>, <https://github.com/google-gemini/gemini-cli/pull/28387>

5. **权限与策略配置准确性**
   - 代表问题：`tools.core` 的 deny/wildcard 行为误伤 MCP 工具。
   - 说明用户需要更精细、更可解释的工具权限控制。
   - 链接：<https://github.com/google-gemini/gemini-cli/pull/28388>

6. **产品状态与文档/入口一致性**
   - 代表问题：官网提示“工具已弃用”，但用户仍需要远程系统 CLI。
   - 说明产品入口、品牌叙事、迁移说明需要更清晰。
   - 链接：<https://github.com/google-gemini/gemini-cli/issues/28393>

---

## 5) 开发者关注点

### 高频痛点
- **同步 I/O 和阻塞操作** 仍是 CLI 体验的主要敌人，容易直接体现为卡顿。
- **Agent 状态机稳定性** 是高优先级问题，尤其是事件驱动流程中的死循环和超时控制。
- **配置加载与合并逻辑** 需要更强的容错能力，避免容器环境、循环引用、相对路径等边界条件出错。
- **资源清理机制** 需要补强，尤其是后台任务结束后的临时文件/目录回收。
- **IDE 扩展生命周期管理** 仍有改进空间，VS Code 相关问题继续出现。
- **错误提示可操作性** 很重要，配额限制、认证失败、弃用提示都需要更明确地引导用户。

### 对维护节奏的信号
- 当前大量 PR 已经围绕 **核心修复而非新功能** 展开，说明团队/社区在优先补齐稳定性短板。
- Issue 多数带有 `bot-triaged`，表明自动化分流已经比较成熟，但人工确认和回归验证仍是下一步关键。
- P1/P2 集中在 core 和 agent 模块，建议后续重点观察这两个区域的合并和回归结果。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发群的超短版**，或  
2. **适合内部周报/晨会的表格版**。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-07-14）
数据源：`github.com/github/copilot-cli`

## 1) 今日速览
今天仓库**没有新 Releases**，社区活跃点主要集中在 **9 条 Issues**，其中多数为跨平台体验、协议行为和扩展/代理能力相关问题。整体看，Copilot CLI 的讨论重心正从“基础可用”转向“**稳定性、可观测性、跨平台一致性和扩展协议正确性**”。

---

## 2) 社区热点 Issues
> 过去 24 小时内更新的 Issues 共 9 条，以下为全部条目。

### 1. [#4111 Windows 长会话在自动更新后继续跑在 `copilot.exe.old` 上，导致线程 100% CPU 卡死](https://github.com/github/copilot-cli/issues/4111)
- **重要性**：这是典型的 Windows 进程生命周期与自更新冲突问题，影响长时间运行的交互式/`--plan` 会话，属于高优先级稳定性缺陷。
- **社区反应**：`OPEN` / `triage`，暂无评论和点赞，说明问题刚被提交，但影响面较大。

### 2. [#4110 `ctrl+x -> b` 无法在阻塞的 `read_bash` 调用中后台化/中断](https://github.com/github/copilot-cli/issues/4110)
- **重要性**：关系到用户在 Agent 被阻塞时是否还能“自救”，直接影响 CLI 的可控性与中断体验。
- **社区反应**：`OPEN` / `triage`，暂无互动，但属于典型的交互式操作可靠性问题。

### 3. [#4109 Linux 上 `/copy` 报 “Connection refused”，疑似 snap 缺少 x11/wayland plug](https://github.com/github/copilot-cli/issues/4109)
- **重要性**：复制到剪贴板是高频基础功能，若 Linux 分发包权限/接口配置不完整，会直接影响日常使用。
- **社区反应**：`OPEN` / `triage`，零评论零点赞，建议尽快确认 snap 打包声明与桌面环境兼容性。

### 4. [#4108 macOS 中 Copilot CLI 启动 LSP 后 Python 图标出现在 Dock](https://github.com/github/copilot-cli/issues/4108)
- **重要性**：这是 macOS 桌面化副作用问题，虽然不影响核心推理，但会显著破坏“终端工具”的预期体验。
- **社区反应**：`OPEN` / `triage`，暂无反馈，属于“体验瑕疵但可感知”的问题。

### 5. [#4107 `--output-format json` 缺少 OTel 暴露的 token/cost usage](https://github.com/github/copilot-cli/issues/4107)
- **重要性**：面向自动化与审计场景，JSON 输出缺少 token、成本等指标会削弱可观测性和成本治理能力。
- **社区反应**：`OPEN` / `triage`，零互动，但这是开发者和平台团队会高度关注的数据契约问题。

### 6. [#4106 ACP 并行 subagent 丢失源身份，且输出被扁平化到父流](https://github.com/github/copilot-cli/issues/4106)
- **重要性**：这是多 Agent / 协议层正确性问题，影响工具链对并发执行、归因和日志分析的支持。
- **社区反应**：`OPEN` / `area:non-interactive, area:agents`，暂无评论，说明问题较新但技术含量高。

### 7. [#4112 `session.rpc.canvas.open` 事件格式异常，canvas 不能可靠聚焦](https://github.com/github/copilot-cli/issues/4112)
- **重要性**：涉及扩展 canvas 的低层 RPC 行为，说明扩展 API 与文档/实现之间可能存在偏差。
- **社区反应**：`OPEN` / `triage`，零互动，但对生态扩展开发者很关键。

### 8. [#4105 需求模板内容不完整的功能/问题请求被标记为 invalid](https://github.com/github/copilot-cli/issues/4105)
- **重要性**：这类 issue 本身不涉及产品功能，但反映出社区提问质量和模板约束问题。
- **社区反应**：`CLOSED` / `triage, invalid`，1 条评论，说明维护者已快速清理。

### 9. [#4104 “HandBot” 被标记为 invalid](https://github.com/github/copilot-cli/issues/4104)
- **重要性**：同样是低信息密度提交，更多反映 issue 入口的噪声控制。
- **社区反应**：`CLOSED` / `invalid`，1 条评论，社区参与度低，维护者处理较快。

---

## 3) 重要 PR 进展
**过去 24 小时未发现 PR 更新。**  
因此本日报暂无可追踪的 PR 合并、修复或特性推进信息。

---

## 4) 功能需求趋势
从今日 Issues 可以提炼出以下高频方向：

1. **跨平台稳定性**
   - Windows 自更新、macOS Dock、Linux snap/剪贴板等问题集中出现，说明 Copilot CLI 正在向多平台深度使用阶段演进。
   - 代表 Issue：[#4111](https://github.com/github/copilot-cli/issues/4111)、[#4109](https://github.com/github/copilot-cli/issues/4109)、[#4108](https://github.com/github/copilot-cli/issues/4108)

2. **Agent 交互可控性**
   - 用户希望在阻塞、并发、后台化等场景下拥有更强控制权。
   - 代表 Issue：[#4110](https://github.com/github/copilot-cli/issues/4110)、[#4106](https://github.com/github/copilot-cli/issues/4106)

3. **可观测性与成本透明**
   - JSON 输出中缺少 token/cost 信息，说明自动化用户需要更完整的运行账单与资源指标。
   - 代表 Issue：[#4107](https://github.com/github/copilot-cli/issues/4107)

4. **扩展/协议层一致性**
   - canvas RPC、ACP 事件语义等问题表明，生态开发者越来越关注协议正确性与文档一致性。
   - 代表 Issue：[#4112](https://github.com/github/copilot-cli/issues/4112)、[#4106](https://github.com/github/copilot-cli/issues/4106)

---

## 5) 开发者关注点
今天的反馈里，开发者/用户的主要痛点可以概括为：

- **长会话可靠性不足**：自动更新、阻塞命令、后台化控制在长期运行场景里仍存在明显边界问题。  
  链接：[#4111](https://github.com/github/copilot-cli/issues/4111)、[#4110](https://github.com/github/copilot-cli/issues/4110)

- **平台集成副作用明显**：剪贴板、Dock、snap 权限等“外围能力”会直接影响 CLI 的专业感和可用性。  
  链接：[#4109](https://github.com/github/copilot-cli/issues/4109)、[#4108](https://github.com/github/copilot-cli/issues/4108)

- **机器可读输出不够完整**：对 CI、监控、计费分析来说，JSON/OTel 数据契约需要更强一致性。  
  链接：[#4107](https://github.com/github/copilot-cli/issues/4107)

- **多 Agent 与扩展协议需要更严谨**：并行输出归因、canvas 事件、subagent 身份保留等是后续生态化的基础。  
  链接：[#4106](https://github.com/github/copilot-cli/issues/4106)、[#4112](https://github.com/github/copilot-cli/issues/4112)

- **社区提问质量控制已在收紧**：两个已关闭的 invalid issue 说明维护者正在过滤低质量/缺失信息的提交。  
  链接：[#4105](https://github.com/github/copilot-cli/issues/4105)、[#4104](https://github.com/github/copilot-cli/issues/4104)

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发 Slack/飞书的精简版**，或  
2. **适合技术周报的正式版**。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-07-14）

## 1. 今日速览
过去 24 小时内，Kimi Code CLI 社区的更新量不大，但问题聚焦很明确：**会话恢复稳定性**和**ACP 交互能力**是当前最受关注的两类痛点。与此同时，PR 开始围绕**上下文预算分配**做优化，说明项目正在向更合理的 token 管理和长上下文体验演进。

---

## 3. 社区热点 Issues
> 注：本日报统计到过去 24 小时内更新的 Issue 共 2 条，因此以下为全部重点条目，而非 10 条满额榜单。

1. **[#2496 - resuming forked session results in corrupted output](https://github.com/MoonshotAI/kimi-cli/issues/2496)**  
   - **为什么重要**：这是一个直接影响核心工作流的 bug，涉及 `kimi -r` 恢复 forked session 时输出损坏，意味着分叉会话/续跑链路存在状态一致性问题。  
   - **社区反应**：当前 **0 评论、0 👍**，讨论尚未展开，但问题本身属于高优先级稳定性缺陷。  
   - **补充信息**：报告环境为 **Windows 10 / kimi 1.36.0 / kimi-for-coding / kimi subscription**，对平台兼容性排查有参考价值。

2. **[#2495 - ACP: AskUserQuestion/QuestionRequest resolves empty — structured questions unusable over ACP](https://github.com/MoonshotAI/kimi-cli/issues/2495)**  
   - **为什么重要**：该问题直指 **ACP server mode** 下的交互问答能力失效，`AskUserQuestion` 无法拿到用户回答，意味着结构化人机协作流程无法正常运行。  
   - **社区反应**：当前 **0 评论、0 👍**，但这类问题通常会显著影响自动化代理、工具调用和外部协议接入场景。  
   - **补充信息**：问题描述已明确指出 `QuestionRequest` 会被解析为空答复，对 ACP 生态的可用性影响较大。

---

## 4. 重要 PR 进展

1. **[#2494 - fix(kimi): use remaining context for completion budget](https://github.com/MoonshotAI/kimi-cli/pull/2494)**  
   - **核心内容**：将默认 completion budget 从固定的 **32k provider cap** 改为使用**剩余上下文窗口**，让模型输出预算分配更贴近真实上下文。  
   - **为什么重要**：这类改动通常直接影响长对话、长代码上下文和续写质量，能够减少“明明还有上下文却被过早截断”的体验问题。  
   - **附加改进**：  
     - `KIMI_MODEL_MAX_COMPLETION_TOKENS` 作为显式硬上限；  
     - `KIMI_MODEL_MAX_TOKENS` 作为 legacy alias；  
     - 允许非正值禁用 clamp。  
   - **社区反应**：当前 **0 评论、0 👍**，但从方向上看，这是一个很实用的底层体验优化 PR。

---

## 5. 功能需求趋势
从当前所有 Issue 看，社区关注点主要集中在以下几个方向：

- **会话恢复与状态一致性**
  - `kimi -r`、forked session、续聊恢复等路径的稳定性是高频关注点。
  - 说明用户已经把 Kimi Code CLI 当作“长任务/长会话”工具使用，对可靠性要求较高。  
  - 相关链接：[#2496](https://github.com/MoonshotAI/kimi-cli/issues/2496)

- **ACP / 结构化交互能力**
  - 社区希望 CLI 不只是对话式工具，还能在 ACP server mode 下支持可编排的人机协作。
  - 当前瓶颈集中在 `AskUserQuestion` 这类结构化问答接口不可用。  
  - 相关链接：[#2495](https://github.com/MoonshotAI/kimi-cli/issues/2495)

- **上下文预算与长上下文体验**
  - 虽然来自 PR，但从方向上看，社区对“剩余上下文如何分配给 completion”非常敏感。
  - 说明用户在意的不只是功能可用性，更在意长代码场景下的输出连续性和信息利用率。  
  - 相关链接：[#2494](https://github.com/MoonshotAI/kimi-cli/pull/2494)

---

## 6. 开发者关注点
结合当前反馈，开发者最需要关注的痛点主要有：

- **状态管理健壮性不足**：分叉会话恢复后输出损坏，说明 session/branch 语义下的上下文重建需要加强。  
  参考：[#2496](https://github.com/MoonshotAI/kimi-cli/issues/2496)

- **ACP 交互协议链路不稳定**：结构化问答在 server mode 下直接失效，会影响自动化代理和外部工具集成。  
  参考：[#2495](https://github.com/MoonshotAI/kimi-cli/issues/2495)

- **上下文与 token 策略需要更精细**：PR 已开始从固定上限转向“按剩余上下文预算”，说明社区对长任务场景的输出质量非常敏感。  
  参考：[#2494](https://github.com/MoonshotAI/kimi-cli/pull/2494)

- **当前反馈量少，但问题指向明确**：两条 Issue 均为 0 评论/0 👍，属于“少量高价值问题”而非广泛讨论，适合优先排查和快速修复。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发群的短版摘要**，或  
2. **适合内部周报/晨会的表格版**。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-07-14）

## 1) 今日速览
过去 24 小时，OpenCode 继续围绕 **新模型适配（GPT-5.6 / Luna / OpenAI pro reasoning）** 和 **稳定性修复** 快速迭代，同时社区集中暴露出一批 **Windows 兼容性、权限系统、TUI 崩溃、headless 运行稳定性** 问题。  
从 Issues 和 PR 看，当前社区最关心的不是“新增大功能”，而是 **跨平台可用性、模型路由准确性、子代理/任务工具可靠性、以及安全与权限语义一致性**。  

---

## 2) 版本发布

### [v1.17.20](https://github.com/anomalyco/opencode/releases/tag/v1.17.20)
- 移除了一个过时的 Codex workaround，避免它干扰 **OpenAI Luna Responses Lite** 请求。
- 更新了 **Azure AI 对 GPT-5.6 的支持**。

### [v1.17.19](https://github.com/anomalyco/opencode/releases/tag/v1.17.19)
- 支持 **OpenAI pro reasoning mode**。
- 将 **xAI Responses 的 response storage** 默认关闭。
- 新增 **Luna Responses Lite 的 OAuth** 支持。
- 退出控制台后，会自动切换到另一个可用组织。
- 修正了 **GPT-5.6** 的 context limit 使用逻辑。

---

## 3) 社区热点 Issues

### 1. [#36681 Windows 外部目录路径与权限引用失效](https://github.com/anomalyco/opencode/issues/36681)
- **为什么重要**：直接影响 Windows 用户的目录权限配置，属于基础可用性问题。
- **社区反应**：评论数 5，是当前最活跃的问题之一，说明复现明确、影响面较广。

### 2. [#36737 Windows 全局安装后留下 479-byte 占位 opencode.exe](https://github.com/anomalyco/opencode/issues/36737)
- **为什么重要**：全局安装链路在 Windows 上可能直接损坏可执行文件，属于安装级故障。
- **社区反应**：已有 2 条评论，说明安装流程在 Windows 环境存在真实阻塞。

### 3. [#36734 V2 Desktop 文件树在 Windows 下无法展开](https://github.com/anomalyco/opencode/issues/36734)
- **为什么重要**：新 UI/V2 的核心交互在 Windows 上失效，影响桌面端体验。
- **社区反应**：2 条评论，且问题定位清晰，指向路径规范化逻辑。

### 4. [#36696 Windows cmdlet 权限不生效](https://github.com/anomalyco/opencode/issues/36696)
- **为什么重要**：权限系统是 OpenCode 的安全底座，失效会影响命令执行控制。
- **社区反应**：2 条评论，和 #36690 形成同类问题簇，说明 Windows 权限处理存在系统性偏差。

### 5. [#36690 Windows 上权限大小写敏感](https://github.com/anomalyco/opencode/issues/36690)
- **为什么重要**：权限配置对大小写敏感会造成“看似正确、实际不生效”的高频误用。
- **社区反应**：2 条评论，属于配置语义与平台习惯不一致的典型痛点。

### 6. [#36682 Compaction summary 注入可执行指令，模型会无用户确认执行](https://github.com/anomalyco/opencode/issues/36682)
- **为什么重要**：这是明确的 **安全/提示注入** 风险，可能导致模型执行非预期动作。
- **社区反应**：2 条评论，且带 [SECURITY] 标签，优先级应很高。

### 7. [#36706 大型权限提示后 task tool（subagent）失效，报 “no such column: replacement_seq”](https://github.com/anomalyco/opencode/issues/36706)
- **为什么重要**：子代理工具链断裂，且伴随数据库/迁移异常，影响复杂任务执行。
- **社区反应**：2 条评论，说明这不是单点 bug，而是流程稳定性问题。

### 8. [#36773 /sessions 选择器触发 TUI 崩溃](https://github.com/anomalyco/opencode/issues/36773)
- **为什么重要**：会直接导致界面崩溃，属于高影响可用性问题。
- **社区反应**：1 条评论，但已被 PR #36774 迅速覆盖，说明问题明确且修复节奏快。

### 9. [#36763 headless `opencode run` 启动时偶发卡死](https://github.com/anomalyco/opencode/issues/36763)
- **为什么重要**：影响自动化/CI/非交互式场景，是生产使用的重要路径。
- **社区反应**：1 条评论，但复现频次高（描述中提到多次发生），可信度很强。

### 10. [#36764 headless `opencode run` 的 `@agent` 路由和 `--agent` 退回默认代理](https://github.com/anomalyco/opencode/issues/36764)
- **为什么重要**：会导致非交互模式下任务路由错误，直接影响成本和结果准确性。
- **社区反应**：1 条评论，但问题属于“静默误路由”，风险高于普通崩溃。

---

## 4) 重要 PR 进展

### 1. [#36786 实现智能自动上下文（TUI toast + App badge）](https://github.com/anomalyco/opencode/pull/36786)
- 新增自动上下文文件建议能力，属于 **提效型功能**。
- 对应用户在多文件任务中的上下文补全需求，可能提升任务启动效率。

### 2. [#36781 支持同一 provider 下多个 profile](https://github.com/anomalyco/opencode/pull/36781)
- 允许同一服务商保存多个 API key/profile。
- 对多账号、团队/个人分离、限额切换非常关键。

### 3. [#36777 beta：支持远程会话自动接受](https://github.com/anomalyco/opencode/pull/36777)
- 改善远程会话流程，让自动接受设置在新布局下更完整地生效。
- 适合远程协作和 server 场景。

### 4. [#36774 修复 session picker 崩溃](https://github.com/anomalyco/opencode/pull/36774)
- 直接修复 [#36773](https://github.com/anomalyco/opencode/issues/36773) 的 TUI 崩溃问题。
- 属于高优先级稳定性修复。

### 5. [#36771 统一 callback 接受逻辑，并支持内置引用](https://github.com/anomalyco/opencode/pull/36771)
- 主要是 interpreter / CodeMode 的行为统一。
- 有助于减少异步回调、内置函数引用的边界错误。

### 6. [#36770 合并 dev 到 v2](https://github.com/anomalyco/opencode/pull/36770)
- 这是一次重要分支整合。
- 将 dev 侧的新兼容能力与 v2 架构合流，通常意味着后续功能会加速统一。

### 7. [#36767 放宽 Nix 桌面构建的 Bun 版本检查](https://github.com/anomalyco/opencode/pull/36767)
- 改善 Nix/桌面构建兼容性。
- 对 Linux/Nix 用户是实用型修复。

### 8. [#36755 为 Task tool 增加可配置超时](https://github.com/anomalyco/opencode/pull/36755)
- 直接解决子代理“永远挂住”的痛点。
- 对自动化工作流和长任务控制非常关键。

### 9. [#36757 乐观渲染已提交 prompt](https://github.com/anomalyco/opencode/pull/36757)
- 优化 TUI 交互体验：先显示 pending message，再等待确认。
- 能减少“提交后无反馈”的感知延迟。

### 10. [#36783 修复 codemode 的 JSON response body 校验](https://github.com/anomalyco/opencode/pull/36783)
- 强化 OpenAPI / CodeMode 的输入校验。
- 对接口适配器的稳定性和安全性都有帮助。

---

## 5) 功能需求趋势

从近期 Issues 可以看出，社区需求主要集中在以下几个方向：

1. **Windows 兼容性补齐**
   - 路径、权限、cmdlet、文件树、安装产物等问题集中爆发。
   - 说明 Windows 仍是当前最容易出现“平台差异”的主战场。

2. **权限系统更可预测**
   - 用户希望权限配置在大小写、通配符、deny/allow 规则上具有一致语义。
   - 典型需求：更细粒度、更少“静默失败”。

3. **新模型与新 Provider 支持**
   - GPT-5.6、Luna Responses Lite、OpenAI pro reasoning、xAI Responses 等是近一周高频主题。
   - 重点不只是“能接”，而是 **路由正确、上下文限制正确、OAuth 正常**。

4. **TUI / V2 稳定性**
   - session picker、文件树、对话渲染、布局切换等问题较集中。
   - 说明新 UI 逐步成熟，但细节回归仍多。

5. **subagent / Task tool 可靠性**
   - 包括超时、路由、输出丢失、异常处理、权限提示过大等问题。
   - 社区明显希望子代理从“能用”走向“可控、可恢复”。

6. **headless / 自动化场景**
   - `opencode run` 的启动稳定性、agent 路由、日志冻结都被反复提到。
   - 这说明 OpenCode 正在从交互工具向自动化执行器延伸。

7. **安全与提示注入防护**
   - compaction summary 注入事件表明，社区开始关注模型执行链路中的安全边界。
   - 未来可能需要更强的摘要隔离与指令分层。

---

## 6) 开发者关注点

综合社区反馈，开发者当前最需要优先盯住的痛点是：

- **“静默失败”太多**：如 headless 路由错误、owner mismatch 返回 undefined、登录后切换组织、任务工具失效等，用户很难定位原因。
- **跨平台一致性不足**：Windows 上的路径、权限、大小写、npm install、UI 交互问题明显高于其他平台。
- **模型适配更新节奏快**：新模型/新协议（GPT-5.6、Luna、OpenAI pro reasoning）上线快，兼容层必须持续跟进。
- **数据库与并发问题需要强化**：如 SQLite WAL lock contention、迁移 schema 差异、会话 cleanup 竞态，都是长期稳定性风险。
- **安全边界要前移**：compaction summary 注入说明“上下文压缩”也可能成为攻击面，不能只看主输入。
- **子代理和自动化链路要可恢复**：超时、输出丢失、权限弹窗过长、异步状态混乱，都会放大到工作流中断。

---

如果你希望，我也可以把这份日报进一步整理成：
1. **适合公众号/飞书群的精简版**，或  
2. **面向研发周会的表格式版本**。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报（2026-07-14）  
基于 GitHub：`github.com/badlogic/pi-mono`

## 今日速览
今天社区讨论几乎都围绕两条主线：**新模型/Provider 兼容性** 和 **长会话编排体验**。前者集中暴露在 GPT-5.6、Codex、Copilot、OpenCode Zen 等接入问题上，后者则体现在 compaction 时机、RPC 流、子代理超时与上下文边界等场景。  
整体来看，Pi 正在从“能用”走向“在真实开发环境里稳定可用”，平台兼容与协议细节成为今天的高频焦点。

## 社区热点 Issues

1. [#6615 openai-codex: hardcoded originator "pi" blocks gpt-5.6-luna (404 Model not found)](https://github.com/badlogic/pi-mono/issues/6615)  
   影响 GPT-5.6-luna 的直接可用性，属于核心 provider 路由问题；**2 条评论，已关闭**，说明问题复现明确、优先级很高。

2. [#6601 openai-codex: hardcoded originator/User-Agent override model.headers, blocking rollout-gated models](https://github.com/badlogic/pi-mono/issues/6601)  
   与 #6615 同属模型接入策略问题，涉及 rollout gating，影响面大；**1 条评论，已关闭**，显示社区已快速定位到 headers/身份标识层面的兼容差异。

3. [#6602 openai-codex: /compact routes gpt-5.6-luna to an unavailable model variant](https://github.com/badlogic/pi-mono/issues/6602)  
   普通对话可用、但 `/compact` 失败，说明 compaction 路径与主对话路径存在分叉 bug；**2 条评论，已关闭**，对长会话用户影响明显。

4. [#6606 Feature request: proactive compaction after response to avoid blocking user input](https://github.com/badlogic/pi-mono/issues/6606)  
   直接指向“压缩先于用户输入处理”导致的卡顿体验；**2 条评论，已关闭**，说明这是实际使用中比较痛的交互问题。

5. [#6589 Orchestrator rpc_stream does not process buffered commands after upgrade](https://github.com/badlogic/pi-mono/issues/6589)  
   RPC 升级后缓冲命令未继续处理，可能导致客户端一直等待；**3 条评论，已关闭**，属于协议状态机类高风险问题。

6. [#6600 pi update --extensions blocks npm scripts with new npm 11.16.0](https://github.com/badlogic/pi-mono/issues/6600)  
   npm 11.16.0 默认阻止脚本执行，直接影响扩展更新流程；**1 条评论，已关闭**，属于生态工具链升级带来的兼容性回归。

7. [#6596 fix: spawn(taskkill) ENOENT on Node.js 24 — use absolute System32 path + error event handler](https://github.com/badlogic/pi-mono/issues/6596)  
   Node 24 下 Windows 进程清理失败会影响退出与测试稳定性；**1 条评论，已关闭**，是基础运行时兼容问题。

8. [#6616 Sub-agent silence timeout (240s) kills long-running tasks — heartbeat on stderr doesn't prevent it](https://github.com/badlogic/pi-mono/issues/6616)  
   子代理在静默 240s 后被杀，即使仍在工作也会误判超时；**1 条评论，已关闭**，对长任务/检索型工作流非常关键。

9. [#6617 Context files from parent checkout also load inside a git worktree](https://github.com/badlogic/pi-mono/issues/6617)  
   worktree 场景下会错误加载父 checkout 的上下文文件，容易引入旧配置或重复上下文；**1 条评论，已关闭**，对多分支开发者影响较大。

10. [#6590 segmentation fault](https://github.com/badlogic/pi-mono/issues/6590)  
    长时间运行出现崩溃，属于最需要优先排查的稳定性问题；**5 条评论，已关闭**，说明社区关注度最高之一。

## 重要 PR 进展

1. [#6618 Fix: don't write compaction summary to cache](https://github.com/badlogic/pi-mono/pull/6618)  
   避免 compaction/branch summary 写入缓存，减少无效缓存命中和潜在成本；**OPEN，且今天有更新**。

2. [#6613 rpc: sanitize unpaired UTF-16 surrogates in JSONL output](https://github.com/badlogic/pi-mono/pull/6613)  
   修复 JSONL 输出在严格解析器下可能失败的问题，增强 RPC 兼容性。

3. [#6611 anthropic-messages: skip usage fields if empty](https://github.com/badlogic/pi-mono/pull/6611)  
   空 usage 字段不再写出，减少 provider 兼容噪音。

4. [#6608 backfill encrypted_content from response.completed for missing reasoning blocks](https://github.com/badlogic/pi-mono/pull/6608)  
   补齐缺失 reasoning block 的内容，提升消息完整性与可追踪性。

5. [#6604 add legacy-peer-deps flag on pi uninstall when using npm](https://github.com/badlogic/pi-mono/pull/6604)  
   解决 npm 依赖冲突导致的卸载失败，改善包管理流程。

6. [#6599 feat(memory): agent-driven memory_save tool + TUI/webui recall parity](https://github.com/badlogic/pi-mono/pull/6599)  
   引入 `memory_save` 工具并统一 TUI/WebUI 的 recall 行为，强化记忆能力与体验一致性。

7. [#6598 pass bedrock unhandled stop reasons to error message](https://github.com/badlogic/pi-mono/pull/6598)  
   把 Bedrock 未处理 stop reason 透出到错误信息，便于排障。

8. [#6595 fix branch summary when using ambient auth](https://github.com/badlogic/pi-mono/pull/6595)  
   修复 ambient auth 场景下的 branch summary 生成问题。

9. [#6594 feat: sqlite session storage](https://github.com/badlogic/pi-mono/pull/6594)  
   引入 SQLite 会话存储，属于会话持久化基础设施升级；**OPEN**。

10. [#6588 ai: OpenAI and Codex forced tool calls](https://github.com/badlogic/pi-mono/pull/6588)  
    修复/验证 OpenAI 与 Codex 的 forced tool calls 行为，直接关系到工具调用可靠性。

## 功能需求趋势

- **模型接入与 Provider 兼容**：社区最集中地要求补齐 GPT-5.6、Copilot、OpenCode Zen 等模型路由与 header 适配。  
  代表：[#6615](https://github.com/badlogic/pi-mono/issues/6615)、[#6601](https://github.com/badlogic/pi-mono/issues/6601)、[#6624](https://github.com/badlogic/pi-mono/issues/6624)、[#6625](https://github.com/badlogic/pi-mono/issues/6625)

- **长会话 / compaction 体验优化**：希望 compaction 不阻塞输入、压缩后再执行、并减少无效缓存与估算误差。  
  代表：[#6606](https://github.com/badlogic/pi-mono/issues/6606)、[#6607](https://github.com/badlogic/pi-mono/issues/6607)、[#6603](https://github.com/badlogic/pi-mono/issues/6603)、[#6618](https://github.com/badlogic/pi-mono/pull/6618)

- **RPC 与扩展协议完善**：用户持续要求更完整的 shutdown、document passthrough、JSONL 兼容与更稳定的流式处理。  
  代表：[#6591](https://github.com/badlogic/pi-mono/issues/6591)、[#6614](https://github.com/badlogic/pi-mono/issues/6614)、[#6589](https://github.com/badlogic/pi-mono/issues/6589)、[#6613](https://github.com/badlogic/pi-mono/pull/6613)

- **平台兼容性与安装链路**：Windows、Node 24、npm 11.16.0 带来的兼容问题明显增加。  
  代表：[#6596](https://github.com/badlogic/pi-mono/issues/6596)、[#6619](https://github.com/badlogic/pi-mono/issues/6619)、[#6600](https://github.com/badlogic/pi-mono/issues/6600)、[#6604](https://github.com/badlogic/pi-mono/pull/6604)

- **记忆、会话存储与模型选择策略**：社区希望更细粒度地控制 session 级行为，并补足持久化存储能力。  
  代表：[#6622](https://github.com/badlogic/pi-mono/issues/6622)、[#6627](https://github.com/badlogic/pi-mono/issues/6627)、[#6594](https://github.com/badlogic/pi-mono/pull/6594)、[#6599](https://github.com/badlogic/pi-mono/pull/6599)

## 开发者关注点

- **上游 Provider 策略变化很敏感**：originator、User-Agent、session headers、模型白名单变化会直接导致 404/500。  
  代表：[#6615](https://github.com/badlogic/pi-mono/issues/6615)、[#6601](https://github.com/badlogic/pi-mono/issues/6601)、[#6625](https://github.com/badlogic/pi-mono/issues/6625)

- **compaction 触发时机与预算管理是核心痛点**：用户最怕“输入被挡住”、以及 token 估算不准导致上下文浪费。  
  代表：[#6606](https://github.com/badlogic/pi-mono/issues/6606)、[#6603](https://github.com/badlogic/pi-mono/issues/6603)、[#6618](https://github.com/badlogic/pi-mono/pull/6618)

- **长任务与并行工具调用的稳定性仍需加强**：子代理超时、命令并发、缓冲处理都在真实工作流里暴露。  
  代表：[#6616](https://github.com/badlogic/pi-mono/issues/6616)、[#6620](https://github.com/badlogic/pi-mono/issues/6620)、[#6589](https://github.com/badlogic/pi-mono/issues/6589)

- **工作区边界与上下文加载规则需要更严格**：worktree、父 checkout、动态 system prompt 都可能引发“脏上下文”。  
  代表：[#6617](https://github.com/badlogic/pi-mono/issues/6617)、[#6621](https://github.com/badlogic/pi-mono/issues/6621)

- **扩展生态的安装、卸载与依赖管理需要更稳**：npm 脚本、peer deps、路径映射等问题影响插件可用性。  
  代表：[#6600](https://github.com/badlogic/pi-mono/issues/6600)、[#6604](https://github.com/badlogic/pi-mono/pull/6604)、[#6605](https://github.com/badlogic/pi-mono/issues/6605)

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合发社区公告的短版**，或  
2. **带“优先级/风险等级”的运维版**。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

以下为 **2026-07-14 Qwen Code 社区动态日报**（基于过去 24 小时 GitHub 更新整理）。

## 1) 今日速览
过去 24 小时里，Qwen Code 一边在 **nightly 版本**继续修补交互细节，一边在 **serve/daemon、多工作区、扩展管理** 等主线能力上持续推进。  
社区侧的关注点则明显集中在 **终端 UI 回归、信任/安全状态副作用、CI/发布阻塞** 这三类问题上，说明项目正处在“功能扩张 + 稳定性补强”并行阶段。

---

## 2) 版本发布

- **v0.19.9-nightly.20260714.9dd8389eb**  
  链接：<https://github.com/QwenLM/qwen-code/releases/tag/v0.19.9-nightly.20260714.9dd8389eb>  
  重点更新：
  - `fix(core)`: 修复模型调用 `enter_plan_mode` 时 **YOLO mode 被意外切走**的问题
  - `feat(cli)`: 增加 **forward ask_user**，增强 CLI 侧的人机交互传递能力

- **desktop-v0.0.5**  
  链接：<https://github.com/QwenLM/qwen-code/compare/desktop-v0.0.4...desktop-v0.0.5>  
  说明：已发布桌面端版本更新；当前数据仅提供对比链接，未展开完整 changelog。

---

## 3) 社区热点 Issues

1. **[#6831] Trust-status “preview” 会污染缓存，存在未确认信任状态持久化风险**  
   链接：<https://github.com/QwenLM/qwen-code/issues/6831>  
   重要性：这是 **P1 安全/信任模型** 问题，且涉及缓存副作用，影响面比一般 bug 更敏感。  
   社区反应：虽然只有 **1 条评论**，但优先级最高，说明已被快速识别为需要尽快修正的风险点。

2. **[#6808] Windows Terminal 下鼠标文本选择失效，回归到 SGR mouse tracking**  
   链接：<https://github.com/QwenLM/qwen-code/issues/6808>  
   重要性：直接影响终端最基础的交互能力，属于明显的 **可用性回归**。  
   社区反应：**4 条评论**，是本批 Issues 中讨论最活跃的之一，说明复现和影响都比较明确。

3. **[#6835] `/insight` 报告的 UTC / 本地时间口径不一致**  
   链接：<https://github.com/QwenLM/qwen-code/issues/6835>  
   重要性：影响热力图、连续登录/活跃天数等统计结果，属于 **数据口径正确性** 问题。  
   社区反应：已有 **2 条评论**，表明问题已进入“口径讨论 + 修复路径选择”阶段。

4. **[#6806] `/compress` 后状态栏 context usage 百分比不刷新**  
   链接：<https://github.com/QwenLM/qwen-code/issues/6806>  
   重要性：涉及 token 压缩后的实时反馈，直接影响用户对上下文状态的判断。  
   社区反应：**2 条评论**，说明这是一个被注意到的交互一致性问题。

5. **[#6809] 许可确认对话框中多行 diff 预览乱码/拼行**  
   链接：<https://github.com/QwenLM/qwen-code/issues/6809>  
   重要性：影响编辑/写文件时的审批可读性，属于 **高频工作流中的展示缺陷**。  
   社区反应：**2 条评论**，通常这类问题会很快触发复现与排查。

6. **[#6820] Linux 下出现 `RuntimeError: memory access out of bounds`**  
   链接：<https://github.com/QwenLM/qwen-code/issues/6820>  
   重要性：这是典型的 **运行时崩溃/越界错误**，对稳定性影响较大。  
   社区反应：**2 条评论**，说明问题已引起关注并等待根因确认。

7. **[#6824] 需求：为 conversation history 增加关键字搜索**  
   链接：<https://github.com/QwenLM/qwen-code/issues/6824>  
   重要性：面向长对话/多会话用户的刚需，属于 **信息检索能力补齐**。  
   社区反应：已有讨论，但更偏产品方向；若落地，会明显改善 CLI/VSCode 的可用性。

8. **[#6801] 需求：引入 pinned/ memory 目录，保护记忆文件不被 `/dream` 合并**  
   链接：<https://github.com/QwenLM/qwen-code/issues/6801>  
   重要性：反映社区对 **长期记忆可控性、知识稳定性** 的需求。  
   社区反应：作为结构化存储需求，较适合进入中长期路线图。

9. **[#6814] 长工具摘要文本被省略号截断，无法换行展示**  
   链接：<https://github.com/QwenLM/qwen-code/issues/6814>  
   重要性：影响工具调用结果的完整可读性，尤其是路径、命令等关键信息。  
   社区反应：已有人指出具体丢信息场景，属于典型的终端渲染问题。

10. **[#6813] 需求：紧凑工具摘要中展示文件名，而不是仅显示数量**  
    链接：<https://github.com/QwenLM/qwen-code/issues/6813>  
    重要性：增强“读了哪些文件”的可追踪性，降低上下文理解成本。  
    社区反应：说明用户对 **工具调用透明度** 的要求在上升。

---

## 4) 重要 PR 进展

1. **[#6843] fix(review): 从 harness 记录证明 coverage，而不是从调用方文件取证**  
   链接：<https://github.com/QwenLM/qwen-code/pull/6843>  
   看点：修正评测/覆盖率判断的证据来源，减少“自证其证”式误判，提升 review 结论可信度。

2. **[#6842] fix(memory): 在创建前解析 `isAllowedMemoryPath` 的根 symlink**  
   链接：<https://github.com/QwenLM/qwen-code/pull/6842>  
   看点：修复 symlink 场景下的内存目录写入判断，避免合法路径被误拒。

3. **[#6841] refactor(review): 共享 probe-worktree 路径 helper，并强化 stale-tree 清理**  
   链接：<https://github.com/QwenLM/qwen-code/pull/6841>  
   看点：围绕 disposable worktree 的后续加固，解决路径残留和清理一致性问题。

4. **[#6840] fix(review): 用代码构建 chunk agent prompt，解决代理“盲跑”问题**  
   链接：<https://github.com/QwenLM/qwen-code/pull/6840>  
   看点：直接修复 review agent 启动时未拿到 diff/prompt 的根因，属于评测链路关键修复。

5. **[#6839] feat(serve): 增加 workspace-qualified Voice**  
   链接：<https://github.com/QwenLM/qwen-code/pull/6839>  
   看点：面向多工作区 `qwen serve` 的 Voice 能力增强，继续推进多租户/多 workspace 方向。

6. **[#6837] feat(serve): 为 daemon status 增加模型 API 错误与重试指标**  
   链接：<https://github.com/QwenLM/qwen-code/pull/6837>  
   看点：把模型健康状况可视化，补齐运维可观测性，方便定位 provider 问题。

7. **[#6825] feat(serve): 增加 extension management v2**  
   链接：<https://github.com/QwenLM/qwen-code/pull/6825>  
   看点：扩展管理进入新版本，支持全局默认与工作区级策略，属于平台化能力升级。

8. **[#6819] feat(acp): 暴露 tool-call preparation 生命周期**  
   链接：<https://github.com/QwenLM/qwen-code/pull/6819>  
   看点：补齐流式 provider 的工具调用准备态，对 ACP 协议与工具执行时序很关键。

9. **[#6833] fix(serve): 按 owner 路由 session continue / language / artifacts**  
   链接：<https://github.com/QwenLM/qwen-code/pull/6833>  
   看点：把 legacy REST mutation 重新路由到真正持有 live session 的 runtime，减少多 workspace 场景下的错路由。

10. **[#6829] fix(cli): 在 WSL2/Linux 上同时支持文本与图片粘贴**  
    链接：<https://github.com/QwenLM/qwen-code/pull/6829>  
    看点：修复 Ctrl+V 被图片粘贴处理链吞掉的问题，补上文本粘贴回退，直接改善跨平台输入体验。

---

## 5) 功能需求趋势

从过去 24 小时的 Issues 来看，社区最关注的方向主要集中在：

- **终端 UI / 交互可读性**  
  典型诉求包括：文本选择、换行、diff 预览、状态栏刷新、工具摘要展示更清晰。  
  代表 Issue：[#6808](https://github.com/QwenLM/qwen-code/issues/6808)、[#6809](https://github.com/QwenLM/qwen-code/issues/6809)、[#6813](https://github.com/QwenLM/qwen-code/issues/6813)、[#6814](https://github.com/QwenLM/qwen-code/issues/6814)

- **会话历史与上下文管理**  
  用户希望更容易检索历史对话，并对 memory / pinned 内容有更强控制。  
  代表 Issue：[#6824](https://github.com/QwenLM/qwen-code/issues/6824)、[#6801](https://github.com/QwenLM/qwen-code/issues/6801)、[#6806](https://github.com/QwenLM/qwen-code/issues/6806)

- **可靠性与稳定性**  
  包括 CI 失败、运行时越界、信任状态副作用、时间口径不一致等。  
  代表 Issue：[#6796](https://github.com/QwenLM/qwen-code/issues/6796)、[#6820](https://github.com/QwenLM/qwen-code/issues/6820)、[#6831](https://github.com/QwenLM/qwen-code/issues/6831)、[#6835](https://github.com/QwenLM/qwen-code/issues/6835)

- **多工作区 / serve / daemon 能力扩张**  
  多 workspace 路由、Voice、扩展管理、skill toggle 等方向持续推进，说明平台化能力仍是主线。  
  代表 PR：[#6839](https://github.com/QwenLM/qwen-code/pull/6839)、[#6825](https://github.com/QwenLM/qwen-code/pull/6825)、[#6816](https://github.com/QwenLM/qwen-code/pull/6816)、[#6833](https://github.com/QwenLM/qwen-code/pull/6833)

- **工具链语义与协议表达更精细**  
  用户和维护者都在推动 slash-command、tool-call、channel 输出的语义分层更清楚。  
  代表 PR：[#6819](https://github.com/QwenLM/qwen-code/pull/6819)、[#6818](https://github.com/QwenLM/qwen-code/pull/6818)、[#6810](https://github.com/QwenLM/qwen-code/issues/6810)

---

## 6) 开发者关注点

- **UI 渲染链路容易回归**：鼠标选择、diff 预览、长文本换行、状态栏刷新等细节问题密集出现，说明终端渲染与交互链路仍需更强回归测试。  
- **信任/权限逻辑必须零副作用**：`preview` 场景污染缓存这类问题风险很高，开发者会更关注“只读检查”与“持久化写入”是否彻底隔离。  
- **多工作区路由复杂度上升**：serve/daemon 相关 PR 大量涉及 owner、workspace-qualified、session 路由，架构复杂度和一致性要求都在提高。  
- **发布与依赖管理需要更稳**：SDK/webui 依赖版本不匹配已经造成发布阻塞，说明 monorepo 内部依赖治理仍是高优先级。  
- **评测/Review 基建要更可信**：从 coverage 证据来源到 probe worktree 的隔离，社区正在持续修复“测试系统本身不可靠”的问题。  
- **上下文与记忆管理是高频需求**：历史搜索、pinned memory、压缩后状态可见性，都是围绕“更可控地管理长上下文”展开的。

如需，我也可以把这份日报进一步整理成：
- **适合公众号/飞书群公告的精简版**
- **适合内部周报的分析版**
- **带优先级排序的行动建议版**

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报｜2026-07-14

> 数据窗口：过去 24 小时  
> 本次更新中 **无新 Release**；共有 **5 条 Issue 更新**、**3 条 PR 更新**。

## 1) 今日速览
今天社区讨论主要集中在 **Agent/子 Agent 的停止语义、终端执行结果的可观测性、以及 TUI 交互可靠性** 三条主线。  
从问题类型看，仓库正在从“功能可用”向“**协议清晰、回放可追踪、交互可测试**”的阶段推进，多个条目都指向 v0.8.68 的收尾工作。  
整体上没有明显外部讨论热度（均为 0 评论/0 👍），但议题本身技术密度较高，属于开发推进型更新。

---

## 2) 社区热点 Issues
> 本窗口仅有 5 条 Issue 更新，以下为全部重点条目。

1. **#4359：为 detached background agents 定义 parent-stop 语义**  
   重点在于厘清 `Esc/stop` 对前台子 Agent 与后台分离 Agent 的不同影响，避免“成功 detach 却看起来像取消”的误判。  
   这直接关系到 Agent 生命周期与用户心智模型，是子 Agent 能否稳定落地的核心问题。  
   社区反应：**0 评论 / 0 👍**，尚未形成讨论热度，但属于高优先级设计议题。  
   链接：<https://github.com/Hmbown/DeepSeek-TUI/issues/4359>

2. **#4358：补齐 PTY 对 work-surface 与 approval 鼠标交互的覆盖**  
   该 Issue 指向测试缺口：当前 PTY 套件覆盖了按键、缩放、SGR mouse、取消等，但对“活工作区点击”“approval 弹窗处理”“停止确认”等真实交互缺少精确断言。  
   重要性在于它是提升 TUI 交互可靠性的直接手段，能显著降低回归风险。  
   社区反应：**0 评论 / 0 👍**，偏内部工程驱动。  
   链接：<https://github.com/Hmbown/DeepSeek-TUI/issues/4358>

3. **#4357：完成 underwater receipt settling 与 phase-aware ambient motion**  
   这是典型的 TUI 体验收尾项，强调在等待输入、审批查看、减少动效时不能重新引入不必要动画。  
   对于“静止态”契约的严格性很关键，体现出项目对 UI 细节和可访问性的重视。  
   社区反应：**0 评论 / 0 👍**。  
   链接：<https://github.com/Hmbown/DeepSeek-TUI/issues/4357>

4. **#4356：完善 versioned exec stream receipts 与 tool lifecycle metadata**  
   核心诉求是让 exec-stream 的终端结果与工具生命周期具备**可回放、可支持、可计费归因**的结构化契约，而不是依赖自然语言推断。  
   这是平台化能力的重要一步，直接影响审计、支持、复盘和成本分析。  
   社区反应：**0 评论 / 0 👍**。  
   链接：<https://github.com/Hmbown/DeepSeek-TUI/issues/4356>

5. **#4355：安全持久化 stateful terminal identity，并明确 restart 限制**  
   该 Issue 关注终端会话在进程重启后的“身份一致性”问题，避免把复用 PID 或本地旧记录误判为活跃 shell。  
   这属于可靠性与数据一致性基础设施问题，影响较深，属于必须谨慎处理的状态管理边界。  
   社区反应：**0 评论 / 0 👍**。  
   链接：<https://github.com/Hmbown/DeepSeek-TUI/issues/4355>

---

## 3) 重要 PR 进展
> 本窗口仅有 3 条 PR 更新，以下为全部重点条目。

1. **#4361：Prepare CodeWhale v0.8.68 release candidate**  
   这是本轮最关键的集成 PR，面向 v0.8.68 候选版本的收敛与发布准备。  
   摘要显示其覆盖了 underwater TUI、composer、mouse、settings、Workflow、Tasks、status、colors、scrollbars 等多个模块，属于“总集成”性质。  
   链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/4361>

2. **#4360：修复 BSD 系统下 browser open 失败问题**  
   解决 NetBSD / FreeBSD / OpenBSD / DragonFly 等 BSD 平台点击链接时报“browser opening is unsupported” 的兼容性缺陷。  
   这类跨平台修复对 TUI 工具很重要，能显著提升非 Linux 用户的可用性。  
   链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/4360>

3. **#4354：新增 MiniMax Messages provider 支持**  
   新增 MiniMax Messages provider，并补齐 global / China Base URL 支持，同时注册 MiniMax-M3、MiniMax-M2.7 等模型元数据。  
   这表明项目在继续扩展模型接入生态，属于“多模型/多 provider”方向的重要增强。  
   链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/4354>

---

## 4) 功能需求趋势
从本次 Issue 主题看，社区关注点非常集中，主要呈现以下趋势：

- **Agent 生命周期与停止语义统一**  
  包括前台/后台 Agent 的取消、detach 后的停止规则、用户确认流程等。  
  链接：<https://github.com/Hmbown/DeepSeek-TUI/issues/4359>

- **TUI 交互可靠性与 PTY 覆盖**  
  特别是鼠标点击、approval 流程、work surface 交互的端到端测试。  
  链接：<https://github.com/Hmbown/DeepSeek-TUI/issues/4358>

- **执行结果结构化与可观测性**  
  需求从“看得见输出”升级到“能回放、能审计、能归因”。  
  链接：<https://github.com/Hmbown/DeepSeek-TUI/issues/4356>

- **状态持久化与重启安全**  
  终端身份、shell 状态、恢复边界、安全识别是重点。  
  链接：<https://github.com/Hmbown/DeepSeek-TUI/issues/4355>

- **界面静态化、动效克制与可访问性**  
  underwater TUI 的“静止态契约”继续收尾，说明项目在兼顾体验与低干扰模式。  
  链接：<https://github.com/Hmbown/DeepSeek-TUI/issues/4357>

---

## 5) 开发者关注点
结合 Issue 与 PR 的内容，开发者侧的高频痛点主要是：

1. **行为语义不够明确**  
   例如 stop / cancel / detach 的边界，如果定义不严谨，会直接影响 Agent 产品的可预期性。  
   链接：<https://github.com/Hmbown/DeepSeek-TUI/issues/4359>

2. **测试覆盖仍在补强阶段**  
   真实用户常用的鼠标与审批交互，还需要更细粒度的 PTY 断言。  
   链接：<https://github.com/Hmbown/DeepSeek-TUI/issues/4358>

3. **协议与数据结构需要版本化**  
   exec stream、receipt、tool lifecycle 都在向结构化 contract 演进，说明团队非常重视兼容性与可演进性。  
   链接：<https://github.com/Hmbown/DeepSeek-TUI/issues/4356>

4. **重启恢复必须“诚实”**  
   不能把本地残留状态当作真实在线会话，这类问题一旦处理不好会引发隐性故障。  
   链接：<https://github.com/Hmbown/DeepSeek-TUI/issues/4355>

5. **跨平台兼容与模型生态扩展同步推进**  
   一边修 BSD 兼容性，一边新增 MiniMax provider，说明项目既在补工程短板，也在扩展能力边界。  
   链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/4360>  
   链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/4354>

---

如果你希望，我也可以把这份日报进一步整理成：
- **适合发 Slack/飞书的短版**
- **适合周报归档的长版**
- **带“风险等级 / 优先级”标注的管理版**

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*