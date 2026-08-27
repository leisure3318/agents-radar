# AI CLI 工具社区动态日报 2026-08-27

> 生成时间: 2026-08-27 08:05 UTC | 覆盖工具: 9 个

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

下面是一份基于你提供的 9 个 AI CLI 项目日报整理的**横向对比分析**。  
**说明：表格中的 Issue / PR 数量采用日报中披露的“今日热点/重点更新数”口径，非仓库全量增量。**

---

## 1) 生态全景

过去 24 小时，AI CLI 生态的主线已经很清晰：**从“命令行聊天工具”升级为“跨桌面 / 浏览器 / MCP / Web / 多模型工作流平台”**。  
当前竞争焦点不再只是模型能力，而是 **稳定性、会话恢复、权限边界、安全、成本可解释性和跨平台一致性**。  
一个明显信号是：多数项目都在补“基础设施层”的坑——比如 session/history、hook 生命周期、MCP 兼容、Windows/WSL 适配、token/cache 计费。  
同时，**安全问题正在从附加项变成核心能力**：SSRF、token 泄漏、权限绕过、trust/restricted mode 逐渐成为高频议题。  
整体看，生态仍处在**高迭代、强回归压力**阶段，但也在快速向企业可用、可治理、可审计方向成熟。

---

## 2) 各工具活跃度对比

| 工具 | 今日 Issues 动态 | 今日 PR 动态 | Release 情况 | 主要特征 |
|---|---:|---:|---|---|
| Claude Code | 10 个热点 Issue | 0 | **1 个**：v2.1.247 | 回归压力大，集中在 Desktop/Windows/MCP/安全/计费 |
| OpenAI Codex | 10 个热点 Issue | 10 个重点 PR | **10 个发布条目**（含 rust-v0.150.1 / alpha 系列） | 迭代速度最快之一，偏桌面端与会话/权限一致性 |
| Gemini CLI | 4 个热点 Issue | 5 个重点 PR | **1 个**：nightly 安全修复 | 安全优先，强调 trust / restricted mode |
| GitHub Copilot CLI | 10 个热点 Issue | 0 | **3 个**：v1.0.81-12/13/14 | 聚焦会话恢复、hooks、trace、Windows 企业认证 |
| Kimi Code CLI | 1 个热点 Issue | 1 个 PR | 无新 Release | 更新量小，主要修稳定性和取消链路 |
| OpenCode | 10 个热点 Issue | 10 个重点 PR | 无新 Release | 速度快，覆盖桌面/Web/远程控制/模型兼容 |
| Pi | 10 个热点 Issue | 10 个重点 PR | 无新 Release | TUI 和模型推理语义是核心 |
| Qwen Code | 10 个热点 Issue | 10 个重点 PR | **1 个**：v0.22.2 | 多智能体、权限安全、Web Shell 方向活跃 |
| DeepSeek TUI | 4 个热点 Issue | **17 个 PR 更新** | 无新 Release | 以 rescue/回补型修复为主，偏 runtime 与 MCP |

---

## 3) 共同关注的功能方向

### A. 稳定性与回归修复
几乎所有工具都在强调“先跑稳再说”。

- **Claude Code**：transcript 污染、Desktop 死锁、Windows 会话主机退出、API response 中断
- **Codex**：Windows Desktop 无窗口 / 启动挂起 / 历史丢失
- **Copilot CLI**：`--resume` 后 hooks 丢失、autopilot 超时退出、WSL `/copy` 失效
- **Kimi Code CLI**：cron 提醒打断回复、nested task 取消链路
- **OpenCode**：无限工具循环、启动 AbortError、输入粘贴异常
- **Pi**：agent loop rejection、thinking 流卡死、WSL2 渲染异常
- **Qwen Code**：Web UI 与 MCP 加载后无法对话、Agent Team 竞态
- **DeepSeek TUI**：runtime lock、ConfigToml 栈溢出、MCP 登录恢复

**共性诉求**：  
从“功能可用”转向“长时间稳定运行、错误可恢复、状态不丢失”。

---

### B. MCP / 工具链 / 权限边界
MCP 已成为事实上的集成层，但也成为新的高风险面。

- **Claude Code**：OAuth token 原样回显 transcript
- **Gemini CLI**：MCP OAuth SSRF、workspace trust / restricted mode
- **Copilot CLI**：hooks、trace context、MCP schema 兼容
- **Qwen Code**：MCP permission aliases、allow/deny 绕过
- **DeepSeek TUI**：MCP secret provider 作用域、工具投影
- **OpenCode**：tool discovery、WebSocket RPC、provider 兼容

**共性诉求**：  
“**配置一次，全链路生效**” 与 “**默认安全**” 同时成立，尤其要避免权限绕过和敏感信息泄漏。

---

### C. 会话恢复 / 历史一致性 / 状态继承
这是所有重度用户最在意的“可信赖”能力。

- **Codex**：conversation history 消失、local rollout 丢失
- **Copilot CLI**：`--resume`、history 回放、hooks 恢复
- **Kimi Code CLI**：可见 transcript 丢失且不可恢复
- **OpenCode**：长会话卡死、resume / branch 工作流
- **Qwen Code**：session / daemon / Web Shell 状态管理
- **DeepSeek TUI**：session 级 store、usage 持久化
- **Claude Code**：transcript JSONL 污染
- **Pi**：/resume 扫全量文件，性能与体验都受影响

**共性诉求**：  
恢复后不仅要“能接着聊”，还要**历史、权限、hook、上下文、计费状态都一致**。

---

### D. 成本、缓存与可解释性
用户对“为什么这么快耗尽额度 / 为什么又重试 / 为什么重复计费”越来越敏感。

- **Claude Code**：fork/compact 共享前缀重复计费、token reminder 影响缓存命中
- **Codex**：usage metadata 透传、图片预算裁剪
- **OpenCode**：无限循环烧 token、thinking / reasoning 成本
- **Pi**：thinking signature 序列化性能优化
- **Qwen Code**：recursion budget、Goal handoff、任务派发重复
- **DeepSeek TUI**：per-thread usage、context pressure warnings

**共性诉求**：  
需要更强的**用量可观测性、缓存解释、预算控制和成本归因**。

---

### E. Windows / TUI / 跨平台适配
Windows、WSL、终端输入输出仍然是最容易出问题的区域。

- **Claude Code**：Windows/Desktop 主机退出、Chrome 集成、UI 元数据污染
- **Codex**：Windows Desktop 启动与历史问题
- **Copilot CLI**：WSL `/copy`、Windows WAM 登录
- **Pi**：WSL2 / Windows Terminal 换行、PowerShell 命令前缀、fullscreen 交互
- **OpenCode**：粘贴、布局、桌面端输入
- **DeepSeek TUI**：Terminal / MCP / runtime 隔离
- **Gemini CLI**：CLI 崩溃与企业认证也涉及跨平台稳定性

**共性诉求**：  
终端类 AI 工具要做到“像原生应用一样可用”，跨平台一致性已经是核心竞争力。

---

## 4) 差异化定位分析

### Claude Code
- **功能侧重**：Desktop / Chrome / MCP / Skills / Action 级联动
- **目标用户**：重度代理式工作流用户、浏览器自动化、桌面集成用户
- **技术路线**：强调跨应用能力，但当前回归压力明显，偏“高功能密度”路线

### OpenAI Codex
- **功能侧重**：桌面端、权限传递、历史/会话一致性、工具可观测性
- **目标用户**：需要稳定执行链路和企业化使用的开发者
- **技术路线**：更偏“执行平台 + 状态系统”成熟化

### Gemini CLI
- **功能侧重**：安全加固、企业 Workspace 认证、trust/restricted mode
- **目标用户**：企业用户、合规敏感场景
- **技术路线**：明显走“安全默认值更保守”的路线

### GitHub Copilot CLI
- **功能侧重**：会话恢复、hooks、trace、远程 MCP、自动化执行
- **目标用户**：依赖 GitHub/企业身份的开发者与自动化用户
- **技术路线**：强调“可观测、可审计、可继承”的工作流基础设施

### Kimi Code CLI
- **功能侧重**：异步任务、取消链路、对话连续性
- **目标用户**：轻量 CLI 用户、需要稳定交互的开发者
- **技术路线**：体量较小，偏“修正边界条件、补齐可靠性”

### OpenCode
- **功能侧重**：Web / Desktop / 远程控制 / 多账号 / 多模型接入
- **目标用户**：希望 CLI 与 Web 平台联动的高级用户
- **技术路线**：更像“AI 开发工作台”，平台扩展面很广

### Pi
- **功能侧重**：TUI 交互、推理语义、provider 目录、终端原生体验
- **目标用户**：重视终端体验和模型可切换性的用户
- **技术路线**：偏“模型路由 + TUI 打磨”，是典型终端原生产品

### Qwen Code
- **功能侧重**：多智能体、权限控制、Web Shell、daemon/session 管理
- **目标用户**：需要自托管、可编排、多 agent 的团队
- **技术路线**：多智能体和安全边界并重，偏平台化

### DeepSeek TUI
- **功能侧重**：runtime 隔离、MCP、工具投影、会话可观测性
- **目标用户**：偏技术深度用户、重视会话隔离和运行时治理
- **技术路线**：明显处于快速“rescue + 架构收敛”阶段

---

## 5) 社区热度与成熟度

### 社区最活跃
- **OpenAI Codex、OpenCode、Pi、Qwen Code、DeepSeek TUI**
- 特征：Issue 与 PR 同时高频，说明都处于**高迭代**阶段
- 其中：
  - **Codex**：发布和 PR 量都高，迭代节奏最强
  - **OpenCode / Pi / Qwen**：功能面广，社区反馈非常密集
  - **DeepSeek TUI**：PR 数很高，明显在做大规模修复回补

### 回归压力最明显
- **Claude Code**
- 特征：Issue 很多，但同日 PR 为 0，说明当前更像“被问题追着跑”

### 相对成熟、节奏更稳
- **Gemini CLI、GitHub Copilot CLI**
- 特征：聚焦少数关键问题，PR 更偏基础能力与安全/可观测性
- 其中 Gemini 尤其呈现出**安全优先**的工程节奏

### 体量较小、讨论较少
- **Kimi Code CLI**
- 特征：信号少，但问题聚焦，适合观察后续是否进入加速期

---

## 6) 值得关注的趋势信号

### 1. AI CLI 正在平台化，而不是只做“聊天终端”
从桌面、Web、浏览器、远程控制、MCP、hooks 到多账号管理，工具正在向**完整工作台**演进。

### 2. MCP 已成为标准接口，但也是最大攻击面
几乎所有项目都在围绕 MCP 做能力扩展，同时也在修安全问题。  
**结论**：MCP 会继续是核心战场，安全隔离、权限传播、敏感信息处理是必修课。

### 3. “状态一致性”正在成为产品分水岭
会话恢复、历史、hook、权限、计费、context pressure，用户已经不满足于“能执行”，而是要求**恢复后仍一致**。

### 4. Windows / WSL / Terminal 仍是最脆弱的现实环境
从渲染、输入、剪贴板、登录到启动链路，跨平台兼容仍是 AI CLI 最难啃的工程问题之一。

### 5. 成本透明度越来越重要
token usage、cache 命中、fork/compact 计费、循环调用成本，已经从内部指标变成用户投诉点。  
**开发者参考价值**：需要更强的 usage telemetry、预算解释和异常告警。

### 6. 高级用户正在推动“可审计、可治理、可编排”
这类需求在 Copilot、Qwen、Gemini、Claude、DeepSeek 上都很明显。  
**结论**：下一阶段的竞争，不只是模型能力，而是**治理能力 + 可观测性 + 企业可控性**。

---

如果你愿意，我可以继续把这份分析压缩成：
1. **高管汇报版（1 页）**，或  
2. **研发团队晨会版（5 分钟可讲完）**。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下为基于你提供的数据、结合“议题影响面 + 更新活跃度 + 社区反馈强度”整理的 **Claude Code Skills 社区热点报告**。  
> 注：你给出的 PR 列表里“评论数”字段缺失，因此这里的“热门”以公开讨论热度与问题重要性综合判断。

---

## 1) 热门 Skills 排行（PR）

| 排名 | PR / Skill | 功能概述 | 社区讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | [#1298 skill-creator eval 修复](https://github.com/anthropics/skills/pull/1298) | 修复 `run_eval.py` 长期误报 `recall=0%`，并处理 Windows 流读取、触发检测、并行 worker 问题 | 这是“Skills 评估链路失真”的核心问题，直接影响 `run_loop.py` / `improve_description.py` 的优化效果 | OPEN |
| 2 | [#1602 评估/基准稳定性修复](https://github.com/anthropics/skills/pull/1602) | 修复序列化、benchmark 指标、编码、脚本稳定性等多项问题 | 关注点集中在“评测结果是否可信”“跨平台能否稳定跑通” | OPEN |
| 3 | [#514 document-typography](https://github.com/anthropics/skills/pull/514) | 为生成文档提供排版质检：孤行、寡行、编号对齐等 | 社区非常关注“文档看起来像不像专业交付物”这一类细节质量 | OPEN |
| 4 | [#541 docx tracked changes 修复](https://github.com/anthropics/skills/pull/541) | 修复 DOCX 追踪修订与书签 ID 冲突导致的文档损坏 | 讨论焦点是 OOXML 低层细节、文档可读性和不损坏原文件 | OPEN |
| 5 | [#538 PDF skill 路径大小写修复](https://github.com/anthropics/skills/pull/538) | 修复 `SKILL.md` 中对大小写敏感文件名的错误引用 | 典型的跨平台兼容问题，说明社区在意“能否在真实文件系统上可用” | OPEN |
| 6 | [#1367 self-audit](https://github.com/anthropics/skills/pull/1367) | 输出前做机械性文件校验 + 四维推理审计 | 热点在“让 Claude 自己先验收自己”，属于质量门控型能力 | OPEN |
| 7 | [#723 testing-patterns](https://github.com/anthropics/skills/pull/723) | 覆盖单元测试、React 测试、测试哲学等 | 社区持续关注“如何让 Claude 生成更靠谱的测试” | OPEN |
| 8 | [#568 ServiceNow](https://github.com/anthropics/skills/pull/568) | 面向 ServiceNow 的广覆盖平台 Skill，含脚本、架构、SecOps、ITAM/SAM、FSM 等 | 体现企业用户对“平台型垂直技能”的强需求 | OPEN |

---

## 2) 社区需求趋势

### A. 可靠性 / 可验证性：先把 Skills “跑对”
- 典型诉求是：评估必须可信、触发必须准确、脚本必须跨平台可运行。  
- 代表性 Issue：
  - [#556 run_eval.py 0% trigger rate](https://github.com/anthropics/skills/issues/556)
  - [#492 安全边界与命名空间冒用](https://github.com/anthropics/skills/issues/492)
  - [#189 重复技能导致上下文污染](https://github.com/anthropics/skills/issues/189)

### B. 文档办公类 Skills 仍是最刚需方向
- 社区最常见的高价值需求集中在：Word / PDF / ODT / 排版 / 书签 / 修订 / 空白字符处理。  
- 代表性 Issue：
  - [#12 避免 docx/ooxml 空白重排](https://github.com/anthropics/skills/issues/12)
  - [#29 Bedrock 使用问题](https://github.com/anthropics/skills/issues/29)
  - 相关 PR：[#514](https://github.com/anthropics/skills/pull/514)、[#538](https://github.com/anthropics/skills/pull/538)、[#541](https://github.com/anthropics/skills/pull/541)

### C. “自我审查 / 质量门控”正在变成主流方向
- 社区不只要“生成”，更要“生成后自检、验收、回滚”。  
- 代表性 Issue：
  - [#1385 Reasoning Quality Gate Pipeline](https://github.com/anthropics/skills/issues/1385)
  - [#1329 compact-memory](https://github.com/anthropics/skills/issues/1329)
  - 相关 PR：[#1367 self-audit](https://github.com/anthropics/skills/pull/1367)、[#723 testing-patterns](https://github.com/anthropics/skills/pull/723)

### D. 企业集成与行业垂直技能需求上升
- 社区明显在要“能直接落地到组织流程”的 Skills，而不只是通用 demo。  
- 代表性 Issue：
  - [#228 组织级共享 Skills](https://github.com/anthropics/skills/issues/228)
  - [#16 将 Skills 暴露为 MCP](https://github.com/anthropics/skills/issues/16)
  - [#1175 SharePoint Online 安全与上下文顾虑](https://github.com/anthropics/skills/issues/1175)

---

## 3) 高潜力待合并 Skills

以下 PR 具备“问题明确、改动相对收敛、近期落地概率高”的特征：

1. [#1607 claude-api 退休模型 ID 更新](https://github.com/anthropics/skills/pull/1607)  
   - 属于低风险维护型修复，容易合并，且直接影响高频使用的 API Skill。

2. [#539 skill-creator YAML 引号校验](https://github.com/anthropics/skills/pull/539)  
   - 典型“小改动、高收益”，可防止 description 解析静默失败。

3. [#538 PDF 大小写引用修复](https://github.com/anthropics/skills/pull/538)  
   - 明确的跨平台 bug fix，修复面非常具体。

4. [#541 DOCX tracked change ID 冲突修复](https://github.com/anthropics/skills/pull/541)  
   - 文档损坏类 bug 通常优先级高，且有清晰根因。

5. [#1602 评估链稳定性修复](https://github.com/anthropics/skills/pull/1602)  
   - 影响面大，虽然改动较多，但属于核心基础设施修复，具备较强合并价值。

---

## 4) Skills 生态洞察

**一句话总结：**  
当前社区对 Skills 最集中的诉求是——**让 Claude 不只是“会调用技能”，而是“技能可验证、可交付、可跨平台稳定运行，并能覆盖真实办公/企业工作流”**。

---

如果你愿意，我还可以把这份报告进一步整理成：
1) **适合发公众号/博客的版本**，或  
2) **一页式表格版（适合汇报）**。

---

# Claude Code 社区动态日报（2026-08-27）

## 1) 今日速览
今天 Claude Code 迎来 **v2.1.247** 发布，新增了 **SendFeedback** 工具，方便在会话出错时生成反馈草稿并从 `/feedback` 发送。  
不过，社区反馈几乎被一波 **稳定性、Windows/Desktop、MCP、浏览器扩展、安全与计费异常** 的问题覆盖，说明本轮更新后端到前端都有较高的回归压力。  
**Release:** https://github.com/anthropics/claude-code/releases/tag/v2.1.247

---

## 2) 版本发布

### v2.1.247
**Release 链接：** https://github.com/anthropics/claude-code/releases/tag/v2.1.247

**主要更新：**
- 新增 `SendFeedback` 工具：当会话出错时，Claude 可先生成反馈草稿，用户确认后从 `/feedback` 直接发送
- 新增部分配置/提示相关字段：`{id, text, cooldownSessions, priority}`、`tipsFile`、`label` 等（release notes 在当前数据中截断）

**解读：**
- 这次发布明显在补齐“错误上报闭环”，对提升问题定位效率有帮助
- 但从同日 issues 看，版本切换后出现了多起回归，尤其集中在 **CLI / Action / Desktop / Windows** 场景

---

## 3) 社区热点 Issues

### 1. #90002 — Code tab 写入 UI render 元数据到 transcript JSONL，导致 API 400 且无法彻底清理
**链接：** https://github.com/anthropics/claude-code/issues/90002  
**为什么重要：**
- 属于 **核心数据污染** 问题：把 `start_timestamp/stop_timestamp/flags` 这类 UI 元数据写进 transcript，直接导致后续请求报 400
- 影响面大，且“全量清理后仍复发”，说明问题可能在生成链路而非单一文件损坏  
**社区反应：**
- 3 条评论，是当天较活跃的 bug 之一
- 典型高优先级回归，容易触发持续性故障

### 2. #90007 — Windows/桌面会话主机反复退出，杀死后台任务
**链接：** https://github.com/anthropics/claude-code/issues/90007  
**为什么重要：**
- 直接影响 **后台任务连续性**，对 Desktop + MCP 场景尤其致命
- 描述中出现 “torn down with N live background task(s)” ，说明会话宿主生命周期管理存在严重缺陷  
**社区反应：**
- 2 条评论，且带有明确环境与复现信息
- 适合尽快定位到桌面运行时或文件系统 relay 相关回归

### 3. #90010 — security-guidance 插件把 OAuth token 原样回显到 transcript
**链接：** https://github.com/anthropics/claude-code/issues/90010  
**为什么重要：**
- 这是 **高危安全问题**：将 `accessToken` / `refreshToken` 直接写入对话文本
- 一旦进入 transcript，可能造成凭据泄漏、审计污染、二次传播  
**社区反应：**
- 虽然目前只有 1 条评论，但属于必须优先处理的安全缺陷
- 建议尽快封堵插件读取/回显敏感凭证的路径

### 4. #90003 — GitHub Actions 中 Claude Code 2.1.247 初始化后立即失败
**链接：** https://github.com/anthropics/claude-code/issues/90003  
**为什么重要：**
- 这是 **CI/CD 回归**，影响 claude-code-action 用户自动化流水线
- 从 last known-good 2.1.246 到 2.1.247 的变更高度可疑  
**社区反应：**
- 已 CLOSED，但问题描述完整，且提到 10 次运行全部失败，说明影响广泛
- 对自动化用户很敏感，值得追踪关闭原因与修复版本

### 5. #90001 — Claude in Chrome 的 tabGroupId 在多次 MCP 调用间抖动
**链接：** https://github.com/anthropics/claude-code/issues/90001  
**为什么重要：**
- 影响 **浏览器扩展 / Chrome 集成**，会让已列出的标签页在执行动作时找不到目标页面
- 属于多步骤工作流中的定位不稳定问题  
**社区反应：**
- 目前无评论，但复现链条清楚，属于标准集成回归
- 对“浏览器自动化”场景很关键

### 6. #90021 — Desktop 在 MCP 重新注册时主进程死锁
**链接：** https://github.com/anthropics/claude-code/issues/90021  
**为什么重要：**
- 是 **主进程级别死锁**，会导致整套 Electron 桌面应用卡死
- 且 force-quit 会丢失尚未持久化的会话内容，数据风险高  
**社区反应：**
- 目前无评论，但问题定位明确，影响严重
- 对 Desktop 的稳定性是红线级问题

### 7. #90005 — “API response stopped arriving” 一天内出现 33 次
**链接：** https://github.com/anthropics/claude-code/issues/90005  
**为什么重要：**
- 高频网络/流式响应中断，直接损害核心使用体验
- 关键点在于“无归因信息”，这会大幅增加排障成本  
**社区反应：**
- 目前无评论，但频次高到足以形成明显服务质量事件
- 很适合纳入 telemetry/诊断增强优先级

### 8. #90009 — /fork 在 /compact 后首次分叉导致共享前缀被重复计费
**链接：** https://github.com/anthropics/claude-code/issues/90009  
**为什么重要：**
- 属于 **计费/缓存语义错误**，会直接影响用户成本
- 该问题发生在“压缩后再分叉”的边界路径，说明 prompt cache 生命周期管理可能有缺陷  
**社区反应：**
- 无评论，但问题叙述完整，且涉及“fork 的价值主张被破坏”
- 对重度用户尤其敏感

### 9. #90018 — totalTokensReminder 导致 tool loops 中 prompt-cache floor
**链接：** https://github.com/anthropics/claude-code/issues/90018  
**为什么重要：**
- 这是典型的 **成本 + 性能退化** 问题
- 默认提醒机制可能破坏增量缓存命中，造成循环工具调用成本抬升  
**社区反应：**
- 无评论，但复现逻辑较强，属于可验证的回归
- 对长任务、代理循环场景影响更明显

### 10. #90004 — 条件技能（paths:）在 auto 模式下永远无法激活
**链接：** https://github.com/anthropics/claude-code/issues/90004  
**为什么重要：**
- 这是 **功能失效型 bug**：技能触发逻辑和 auto 模式工具策略互相冲突
- 会直接削弱 skills 体系的可用性与自动化价值  
**社区反应：**
- 无评论，但问题描述指向非常具体的触发链
- 对依赖 skills 做任务编排的用户影响较大

---

## 4) 重要 PR 进展
**过去 24 小时无 PR 更新。**  
**PR 列表：** https://github.com/anthropics/claude-code/pulls

> 说明：当前数据源显示 PR 更新数为 0，因此本节无法挑选 10 个有效 PR。

---

## 5) 功能需求趋势

从今天的 Issues 看，社区关注点主要集中在以下方向：

1. **IDE / 桌面 / 浏览器集成稳定性**
   - Desktop 主进程死锁、Chrome 扩展 not connected、tabGroupId 抖动、MCP 重新注册失败
   - 反映出“跨应用协作”仍是高价值但高故障率区域  
   **相关 Issue：**
   - https://github.com/anthropics/claude-code/issues/90021
   - https://github.com/anthropics/claude-code/issues/90013
   - https://github.com/anthropics/claude-code/issues/90001

2. **Windows 平台兼容性**
   - 会话宿主退出、UI 元数据污染、工作区连接失败等问题集中出现
   - Windows 似乎是今天最集中的问题平台之一  
   **相关 Issue：**
   - https://github.com/anthropics/claude-code/issues/90007
   - https://github.com/anthropics/claude-code/issues/90002
   - https://github.com/anthropics/claude-code/issues/90019

3. **安全与权限边界**
   - 插件/Hook 对敏感信息的处理不安全，尤其是 OAuth token 回显
   - 说明“工具链可扩展”之后，安全隔离需求被进一步放大  
   **相关 Issue：**
   - https://github.com/anthropics/claude-code/issues/90010
   - https://github.com/anthropics/claude-code/issues/90014

4. **成本与计费可解释性**
   - session limit、weekly usage、prompt cache、fork 计费等问题密集
   - 用户非常在意“为什么这么快耗尽额度”以及“是否重复计费”  
   **相关 Issue：**
   - https://github.com/anthropics/claude-code/issues/90015
   - https://github.com/anthropics/claude-code/issues/90011
   - https://github.com/anthropics/claude-code/issues/90009
   - https://github.com/anthropics/claude-code/issues/90018
   - https://github.com/anthropics/claude-code/issues/90022

5. **技能系统与自动化工作流**
   - 条件 skills、`/code-review --fix`、PreToolUse hook 等链路都在暴露工具编排问题
   - 社区希望自动模式更可靠、规则更可预测  
   **相关 Issue：**
   - https://github.com/anthropics/claude-code/issues/90004
   - https://github.com/anthropics/claude-code/issues/90020
   - https://github.com/anthropics/claude-code/issues/90014

6. **产品体验细节**
   - 本地化 tip/hint、聊天时间戳、hover feedback、跨会话 memory 等改进被提出
   - 说明用户已经开始从“能用”转向“更顺手、更可控”  
   **相关 Issue：**
   - https://github.com/anthropics/claude-code/issues/89980
   - https://github.com/anthropics/claude-code/issues/90008
   - https://github.com/anthropics/claude-code/issues/90026
   - https://github.com/anthropics/claude-code/issues/90025

---

## 6) 开发者关注点

### 高频痛点
- **回归密集**：2.1.247 发布后，同日出现多起跨平台回归，尤其是 Windows/Desktop/MCP/Chrome 集成
- **诊断信息不足**：不少问题只有“API stopped arriving / no model response / opaque internal error”，缺少可操作的归因
- **安全边界薄弱**：插件和 hook 读取/回显敏感信息的风险需要优先治理
- **成本异常敏感**：session limit、token reminder、fork/compact 计费异常都在影响用户信任
- **自动化链路脆弱**：Skills、Hooks、Action、browser automation 等功能一旦失效，会直接影响高级用户工作流

### 值得优先跟进的方向
- 增强 **transcript / hook / plugin** 的敏感信息脱敏与校验
- 提升 **Windows 与 Desktop** 的稳定性测试覆盖
- 为 **计费与缓存** 增加更强的可观测性和解释日志
- 给 **MCP / Chrome / Action** 等集成场景补充更明确的错误归因

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合公众号/周报风格的精简版**，或  
2. **适合团队晨会的 1 页要点版**。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# 2026-08-27 OpenAI Codex 社区动态日报

## 1) 今日速览
今天最值得关注的是 **稳定性与数据可靠性**：`rust-v0.150.1` 主要修复了 remote compaction 对保留图片的 token 预算处理，避免上下文被图片挤爆；同时社区大量反馈集中在 **Windows Desktop 启动异常、无窗口/Headless、会话历史丢失** 等阻断性问题上。  
另一方面，Codex 正在持续强化 **任务互联、MCP/工具调用、历史与权限传递** 这条主线，说明产品能力在扩展，但也带来了更多“跨层一致性”问题。  
相关链接：[rust-v0.150.1](https://github.com/openai/codex/releases/tag/rust-v0.150.1) · [#41059](https://github.com/openai/codex/issues/41059) · [#41048](https://github.com/openai/codex/issues/41048) · [#41049](https://github.com/openai/codex/issues/41049)

---

## 2) 版本发布

- **[rust-v0.150.1](https://github.com/openai/codex/releases/tag/rust-v0.150.1)**  
  重点修复：remote compaction 默认把 **retained images** 纳入 token budget，必要时自动裁剪旧图片，降低上下文膨胀风险。  
  关联修复：[#41003](https://github.com/openai/codex/pull/41003)

- **[rust-v0.150.0](https://github.com/openai/codex/releases/tag/rust-v0.150.0)**  
  主要新增：
  - 可用 `@` 引用其他 Codex 任务，并从终端读取/创建/消息化任务；
  - `/copy` 支持选择 **完整回复 / 单个代码块 / 引用块**；
  - 未命名终端任务会获得更具描述性的标题。

- **alpha 版本持续迭代**  
  - [rust-v0.151.0-alpha.5](https://github.com/openai/codex/releases/tag/rust-v0.151.0-alpha.5)  
  - [rust-v0.151.0-alpha.4](https://github.com/openai/codex/releases/tag/rust-v0.151.0-alpha.4)  
  - [rust-v0.151.0-alpha.3](https://github.com/openai/codex/releases/tag/rust-v0.151.0-alpha.3)  
  - [rust-v0.151.0-alpha.2](https://github.com/openai/codex/releases/tag/rust-v0.151.0-alpha.2)

- **0.150 分支前序版本补丁继续回流**  
  - [rust-v0.150.0-alpha.13](https://github.com/openai/codex/releases/tag/rust-v0.150.0-alpha.13)  
  - [rust-v0.150.0-alpha.12.2](https://github.com/openai/codex/releases/tag/rust-v0.150.0-alpha.12.2)  
  - [rust-v0.150.0-alpha.12.1](https://github.com/openai/codex/releases/tag/rust-v0.150.0-alpha.12.1)  
  - [rust-v0.150.0-alpha.12](https://github.com/openai/codex/releases/tag/rust-v0.150.0-alpha.12)

---

## 3) 社区热点 Issues

1. **[#41059](https://github.com/openai/codex/issues/41059) — Windows Desktop 在外部 CLI workaround 后仍保持 headless（OPEN，8 评论）**  
   重要性：直接影响桌面端可用性，属于“启动后无 UI”的阻断级问题。  
   社区反应：评论集中在复现路径、窗口句柄和启动流程排查，说明问题较难定位。

2. **[#41049](https://github.com/openai/codex/issues/41049) — code-mode host 在握手阶段退出，5.6 模型不可用（OPEN，8 评论）**  
   重要性：本地执行通道/握手失败会影响任务启动与工具调用，是核心执行链路问题。  
   社区反应：高评论量表明多人在验证是否为模型、平台或本地环境共性故障。

3. **[#41056](https://github.com/openai/codex/issues/41056) — Windows Desktop 启动后可能长时间无主窗口（OPEN，3 评论，1 👍）**  
   重要性：启动延迟高达数分钟，明显影响交互体验。  
   社区反应：已有点赞和多条补充描述，说明这是用户能直接感知的卡顿问题。

4. **[#41048](https://github.com/openai/codex/issues/41048) — Windows Desktop 本地 rollout JSONL 丢失，但 thread 记录仍在（OPEN，2 评论）**  
   重要性：这是典型的数据丢失问题，影响历史对话可恢复性。  
   社区反应：关注点集中在“记录在、内容不在”的不一致状态，风险较高。

5. **[#41080](https://github.com/openai/codex/issues/41080) — 多个会话的 conversation history 消失（OPEN，2 评论）**  
   重要性：涉及会话历史完整性，直接影响回溯与审计。  
   社区反应：用户反馈较明确，指向远程会话或同步链路异常。

6. **[#41064](https://github.com/openai/codex/issues/41064) — Windows 启动挂起且高 CPU，禁用多模块 preload 可恢复（OPEN，2 评论）**  
   重要性：既有性能问题，也可能是启动链路中的兼容性回归。  
   社区反应：已有较强的“可复现 workaround”，对修复定位很有价值。

7. **[#41054](https://github.com/openai/codex/issues/41054) — In-app Browser 入口消失，快捷键无效，打开请求排队（OPEN，2 评论）**  
   重要性：浏览器能力是 Codex 桌面端的重要工作流入口。  
   社区反应：反馈集中在 UI 入口缺失和任务队列堆积，属于功能退化。

8. **[#41068](https://github.com/openai/codex/issues/41068) — Full Access + 项目提示规则仍因 approval_policy=never 被硬拒（OPEN，2 评论）**  
   重要性：权限策略与用户预期不一致，会直接阻断自动化工作流。  
   社区反应：评论反映出“配置已开但仍被拦截”的一致性问题。

9. **[#41074](https://github.com/openai/codex/issues/41074) — 新建任务未继承 no-approval full access（OPEN，1 评论）**  
   重要性：任务继承的权限缺失会破坏多任务/委派式使用场景。  
   社区反应：虽然评论不多，但问题点非常明确，属于配置传播缺陷。

10. **[#41065](https://github.com/openai/codex/issues/41065) — Windows 客户端 7 天流量约 106 GB（OPEN，1 评论）**  
    重要性：异常网络流量可能意味着轮询、重试或同步逻辑失控。  
    社区反应：用户已开始从系统层面观察到资源异常，值得尽快排查。

---

## 4) 重要 PR 进展

1. **[#41087](https://github.com/openai/codex/pull/41087) — Expose response usage metadata in completion events**  
   将 `usage_metadata.amount` 透传到 completion events，并覆盖 SSE/WebSocket、常规 turn 和 remote compaction，便于做成本与用量统计。

2. **[#41072](https://github.com/openai/codex/pull/41072) — Forward model confirmation policies to actor MCP tools**  
   把 Browser/Computer Use 的确认策略随模型目录消息传给 actor MCP tools，减少工具侧策略缺失。

3. **[#41070](https://github.com/openai/codex/pull/41070) — Clarify when to send asynchronous user messages**  
   细化 `send_user_message_async` 的语义，帮助系统区分“需要立即打断用户”的消息与普通进度信息。

4. **[#41062](https://github.com/openai/codex/pull/41062) — Forward truncation policies to the history notes backend**  
   将输出截断策略传递给 history/notes backend，保证后端裁剪行为与前端/调用方一致。

5. **[#41058](https://github.com/openai/codex/pull/41058) — Track Code Mode tool call metadata completeness**  
   标记 Code Mode cell 的工具调用元数据是否完整，方便消费端判断数据可用性。

6. **[#41050](https://github.com/openai/codex/pull/41050) — Add developer instructions for persistent mode**  
   为 `ReasoningEffort::Persistent` 注入持续性/跟进式开发指令，并允许模型元数据覆盖。

7. **[#41046](https://github.com/openai/codex/pull/41046) — Preserve tool authority for TUI delegation prompts**  
   委派 prompt 保留 TUI 工具的 authority，避免被错误记录成普通用户输入。

8. **[#41041](https://github.com/openai/codex/pull/41041) — Encrypt sensitive history and notes tool arguments**  
   对 history/notes 的敏感参数启用加密标记，提升数据传输与存储安全性。

9. **[#41003](https://github.com/openai/codex/pull/41003) — Backport retained-image compaction budgeting to 0.150**  
   将 retained-image budgeting 回补到 0.150 稳定线，确保保留图片计入 remote compaction 预算。

10. **[#41002](https://github.com/openai/codex/pull/41002) — Support standalone tool outputs in `turn/start`**  
    允许 `turn/start` 直接携带独立 tool output 来启动/推进会话，增强历史持久化与工具驱动能力。

---

## 5) 功能需求趋势

- **桌面端稳定性与启动链路修复**  
  Windows 上的 headless、无窗口、启动挂起、浏览器入口消失等问题高频出现。  
  代表链接：[#41059](https://github.com/openai/codex/issues/41059) · [#41056](https://github.com/openai/codex/issues/41056) · [#41064](https://github.com/openai/codex/issues/41064) · [#41054](https://github.com/openai/codex/issues/41054)

- **会话与历史数据可靠性**  
  用户非常在意 transcript、thread history、cloud recents 的完整性与可恢复性。  
  代表链接：[#41048](https://github.com/openai/codex/issues/41048) · [#41080](https://github.com/openai/codex/issues/41080) · [#41067](https://github.com/openai/codex/issues/41067)

- **执行/权限配置继承一致性**  
  Full Access、no-approval、task 创建、MCP 工具、subagent 之间的策略传播需求明显。  
  代表链接：[#41068](https://github.com/openai/codex/issues/41068) · [#41074](https://github.com/openai/codex/issues/41074) · [#41061](https://github.com/openai/codex/issues/41061) · [#41085](https://github.com/openai/codex/issues/41085)

- **MCP / Browser / IDE 集成能力增强**  
  社区持续要求更灵活的 MCP 环境变量、浏览器 sandbox 稳定性、IDE 路径处理和工具调用能力。  
  代表链接：[#41069](https://github.com/openai/codex/issues/41069) · [#41055](https://github.com/openai/codex/issues/41055) · [#41063](https://github.com/openai/codex/issues/41063)

- **性能与资源占用治理**  
  高 CPU、异常网络流量、WAL 增长等问题开始出现，说明“后台进程健康度”成为新关注点。  
  代表链接：[#41064](https://github.com/openai/codex/issues/41064) · [#41065](https://github.com/openai/codex/issues/41065) · [#41085](https://github.com/openai/codex/issues/41085)

- **工作流效率与可操作性**  
  用户希望在当前会话内直接恢复、复制、分支、组织项目，而不是频繁跳出当前工作流。  
  代表链接：[#41076](https://github.com/openai/codex/issues/41076) · [#41083](https://github.com/openai/codex/issues/41083) · [#41082](https://github.com/openai/codex/issues/41082)

---

## 6) 开发者关注点

- **优先修复“启动即不可用”类问题**：Windows 桌面端的 headless、无窗口、长时间卡启动，已经成为最影响日常使用的故障面。  
  参考：[#41059](https://github.com/openai/codex/issues/41059) · [#41056](https://github.com/openai/codex/issues/41056) · [#41073](https://github.com/openai/codex/issues/41073)

- **历史与数据一致性是高风险主题**：本地 transcript 丢失、云端历史缺失、线程投影停滞，都会直接打击用户信任。  
  参考：[#41048](https://github.com/openai/codex/issues/41048) · [#41080](https://github.com/openai/codex/issues/41080) · [#41079](https://github.com/openai/codex/issues/41079)

- **权限/确认策略需要更强的一致性**：从 Desktop 到 MCP、从 task 创建到 subagent，用户都在要求“配置一次，全链路生效”。  
  参考：[#41068](https://github.com/openai/codex/issues/41068) · [#41074](https://github.com/openai/codex/issues/41074) · [#41061](https://github.com/openai/codex/issues/41061)

- **执行链路的可观测性与稳定性正在变得关键**：握手失败、工具调用元数据不完整、队列消息丢失，都会让调试成本上升。  
  参考：[#41049](https://github.com/openai/codex/issues/41049) · [#41060](https://github.com/openai/codex/issues/41060) · [#41058](https://github.com/openai/codex/pull/41058)

- **性能/资源使用已经进入用户感知层面**：高 CPU、异常流量、WAL 膨胀，说明需要更细粒度的后台运行治理。  
  参考：[#41064](https://github.com/openai/codex/issues/41064) · [#41065](https://github.com/openai/codex/issues/41065) · [#41085](https://github.com/openai/codex/issues/41085)

- **用户希望更多“不中断当前任务”的效率功能**：例如会话内 `/resume`、copy 细分、branch 保留上下文、项目分组等。  
  参考：[#41076](https://github.com/openai/codex/issues/41076) · [#41083](https://github.com/openai/codex/issues/41083) · [#41082](https://github.com/openai/codex/issues/41082) · [#41002](https://github.com/openai/codex/pull/41002)

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合公众号/内部周报的精简版**，或  
2. **适合 Slack / 飞书群发送的短消息版**。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-08-27）

> 数据范围：过去 24 小时内更新的 GitHub Release / Issues / PRs  
> 仓库：`google-gemini/gemini-cli`

## 1) 今日速览
今天的动态明显偏向**安全加固与稳定性修复**：Nightly 版本发布中直接修复了 MCP OAuth 相关的 SSRF 风险，同时社区也集中反馈了企业 Workspace 认证失败、CLI 崩溃等可用性问题。  
PR 侧则继续围绕**trust / restricted mode、输入状态管理、GitHub 仓库解析**等基础能力打补丁，说明项目当前重点仍是“先稳住核心体验”。

---

## 2) 版本发布
### [v0.59.0-nightly.20260827.g3c311beac](https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0-nightly.20260827.g3c311beac)
- 主要更新：修复 **MCP OAuth metadata discovery / authentication** 中的 **SSRF** 风险。  
- 影响判断：这是一个偏高优先级的安全修复，说明团队正在加强 CLI 在外部协议与认证链路上的安全边界。  
- 关联 PR：[#29081](https://github.com/google-gemini/gemini-cli/pull/29081)

---

## 3) 社区热点 Issues
> 过去 24 小时内仅有 4 条更新 Issue，以下为全部值得关注项。

1. **[#29101 Authentication failure blocking Enterprise Workspace accounts](https://github.com/google-gemini/gemini-cli/issues/29101)**  
   - 重要性：企业 Workspace 账号认证失败，直接阻塞真实生产环境使用，属于高优先级故障。  
   - 社区反应：已有 **2 条评论、1 个 👍**，说明问题影响面不小，且已引起讨论。  
   - 关注点：企业账号、GCP Project 配置、认证链路回归。  

2. **[#29103 gemini cli keeps crashing](https://github.com/google-gemini/gemini-cli/issues/29103)**  
   - 重要性：CLI 崩溃属于高影响稳定性问题，尤其用户场景是“legacy code base investigation”，对工作流打击很大。  
   - 社区反应：目前 **0 评论**，但属于典型“使用即中断”问题，值得尽快 triage。  
   - 关注点：崩溃复现、聊天历史 JSON 附件、agent 执行稳定性。  

3. **[#29096 Feature Request: Install agent bot for setup assistance](https://github.com/google-gemini/gemini-cli/issues/29096)**  
   - 重要性：虽然已关闭，但它反映了社区对**安装/初始化引导自动化**的明确需求。  
   - 社区反应：无评论，说明是单点需求，但方向具有产品价值。  
   - 关注点：依赖检查、平台化安装向导、常见问题自诊断。  

4. **[#29100 Gemini lolo](https://github.com/google-gemini/gemini-cli/issues/29100)**  
   - 重要性：该 Issue 已被 bot-triaged，信息量较低。  
   - 社区反应：无评论、无明显正文，更多像噪声/低信号条目。  
   - 关注点：当前不构成产品主线，但反映出社区问题提交质量参差不齐。  

---

## 4) 重要 PR 进展
> 过去 24 小时内可见的关键 PR 仅 5 条（含发布关联修复），以下为全部关键项。

1. **[#29081 fix(core): prevent SSRF in MCP OAuth metadata discovery and authentication](https://github.com/google-gemini/gemini-cli/pull/29081)**  
   - 内容：修复 MCP OAuth 元数据发现与认证流程中的 SSRF 风险。  
   - 意义：安全性最高的变更之一，属于必须尽快合入的硬修复。  

2. **[#29099 fix(core): enforce fail-closed workspace trust and filter mcpServers in restricted mode](https://github.com/google-gemini/gemini-cli/pull/29099)**  
   - 内容：在不可信/受限环境中采用 fail-closed 的 workspace trust 策略，并过滤仓库内定义的 `mcpServers`。  
   - 意义：强化受限环境安全边界，避免启动阶段执行未预期进程。  

3. **[#29098 fix(cli): keep useInputHistoryStore state updaters pure](https://github.com/google-gemini/gemini-cli/pull/29098)**  
   - 内容：修复 React state updater 内的副作用，保持状态更新函数纯净。  
   - 意义：提升 CLI 前端/交互状态稳定性，避免并发或重复调用导致异常。  

4. **[#29097 fix(extensions): strip only a trailing .git suffix when parsing GitHub repo names](https://github.com/google-gemini/gemini-cli/pull/29097)**  
   - 内容：修正 GitHub 仓库名解析逻辑，只移除尾部 `.git`，避免误伤中间片段。  
   - 意义：修复仓库 URL / release 获取错误，减少扩展生态中的兼容性问题。  

5. **[#29102 chore/release: bump version to 0.59.0-nightly.20260827.g3c311beac](https://github.com/google-gemini/gemini-cli/pull/29102)**  
   - 内容：自动化 nightly 版本号升级。  
   - 意义：说明发布流水线保持正常节奏，且新安全修复已纳入 nightly。  

---

## 5) 功能需求趋势
从近期 Issues 里可以看出，社区关注点主要集中在以下方向：

- **企业/Workspace 认证稳定性**  
  - 代表：[#29101](https://github.com/google-gemini/gemini-cli/issues/29101)  
  - 说明：企业用户对认证可靠性要求极高，任何回归都会直接影响可用性。

- **安全边界与 trust / restricted mode**  
  - 代表：[#29099](https://github.com/google-gemini/gemini-cli/pull/29099)、[#29081](https://github.com/google-gemini/gemini-cli/pull/29081)  
  - 说明：MCP、OAuth、workspace trust 这些链路正在成为重点安全治理对象。

- **稳定性与崩溃修复**  
  - 代表：[#29103](https://github.com/google-gemini/gemini-cli/issues/29103)、[#29098](https://github.com/google-gemini/gemini-cli/pull/29098)  
  - 说明：用户对“能否持续跑完任务”非常敏感，状态管理和执行稳定性是核心体验。

- **更好的安装与上手引导**  
  - 代表：[#29096](https://github.com/google-gemini/gemini-cli/issues/29096)  
  - 说明：社区希望减少配置成本，尤其是依赖检查、跨平台安装与故障诊断。

- **GitHub 集成与仓库解析正确性**  
  - 代表：[#29097](https://github.com/google-gemini/gemini-cli/pull/29097)  
  - 说明：CLI 与 GitHub 生态的打通仍是重要使用路径，解析准确性直接影响自动化能力。

---

## 6) 开发者关注点
结合今日反馈，开发者最需要重点关注的是：

- **认证链路回归**：企业 Workspace 账号无法登录会迅速放大成生产阻塞。  
  - 参考：[#29101](https://github.com/google-gemini/gemini-cli/issues/29101)

- **安全默认值要更保守**：trust / restricted mode 需要持续收紧，避免外部配置带来执行风险。  
  - 参考：[#29099](https://github.com/google-gemini/gemini-cli/pull/29099)、[#29081](https://github.com/google-gemini/gemini-cli/pull/29081)

- **崩溃和状态副作用问题**：用户对 CLI 的容错和任务连续性很敏感。  
  - 参考：[#29103](https://github.com/google-gemini/gemini-cli/issues/29103)、[#29098](https://github.com/google-gemini/gemini-cli/pull/29098)

- **降低上手门槛**：安装引导、依赖检测、常见问题诊断仍是高频需求。  
  - 参考：[#29096](https://github.com/google-gemini/gemini-cli/issues/29096)

- **生态兼容性细节**：GitHub repo 解析这种“看似小、实际常踩坑”的问题会显著影响扩展与自动化体验。  
  - 参考：[#29097](https://github.com/google-gemini/gemini-cli/pull/29097)

---

如果你希望，我可以把这份日报再整理成 **“适合发 Slack / 飞书的一页版”**，或者输出成 **Markdown 表格版**。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# 2026-08-27 GitHub Copilot CLI 社区动态日报  
数据源：`github.com/github/copilot-cli`

## 1) 今日速览
今天的动态以 **连续小版本发布** 和 **会话/插件/工具链稳定性问题** 为主。最新几个 release 明显在修复“恢复会话”“Hook 生命周期”“Windows 远程 MCP 登录”等核心体验，说明团队仍在集中处理 **会话续接、可观测性与跨平台兼容性**。  
与此同时，过去 24 小时新更新的 Issues 主要集中在 **自动化执行、MCP/模型兼容、剪贴板与终端集成**，属于典型的高频开发者痛点。

---

## 2) 版本发布
### 最新 Releases（过去 24 小时）
- **v1.0.81-14**  
  GitHub 链接：<https://github.com/github/copilot-cli/releases/tag/v1.0.81-14>  
  - 改进：恢复大会话时，先展示最近历史，边加载边补全旧消息，提升“继续聊”响应速度。
  - 修复：重复调用 `read_agent` 时，现在会稳定返回完整 turn history，除非显式提供 `since_turn`。

- **v1.0.81-13**  
  GitHub 链接：<https://github.com/github/copilot-cli/releases/tag/v1.0.81-13>  
  - 新增：Hooks 可接收当前 OpenTelemetry trace context，输入会带上 `traceparent`，必要时还包含 `tracestate`；命令类 hooks 也会获得相关环境变量。
  - 修复：修正了子 agent 中 hooks 的 `hook.start` / `hook.end` 生命周期事件问题。

- **v1.0.81-12**  
  GitHub 链接：<https://github.com/github/copilot-cli/releases/tag/v1.0.81-12>  
  - 新增：Windows 上受 Microsoft Entra ID 保护的远程 MCP 服务器可通过 WAM（Windows Authentication Manager）登录，通常无需额外弹窗。
  - 其他平台、`--device-code` 以及未安装 broker library 的机器仍保持原有浏览器登录流程。

**版本观察：**  
近期发布重点很明确：**会话恢复、Hook/Trace 可观测性、Windows 企业身份认证**。这是在把 Copilot CLI 往“更可控、更适合企业和插件生态”的方向推进。

---

## 3) 社区热点 Issues
> 说明：以下挑选 10 个过去 24 小时内最值得关注的 Issue，并结合严重性、范围、反馈量进行判断。  
> 当前多数 Issue 仍处于“新报出/待 triage”阶段，评论与点赞普遍较少。

1. **插件 Hook 在 `--resume` 恢复会话时未加载**  
   GitHub 链接：<https://github.com/github/copilot-cli/issues/4629>  
   - 重要性：直接影响恢复会话后的插件能力，属于“恢复态行为不一致”的核心问题。
   - 社区反应：当前 0 评论、0 👍，但场景明确，容易影响依赖 hooks 的用户。

2. **Autopilot 后台任务超时会在子 agent 完成后仍退出父进程**  
   GitHub 链接：<https://github.com/github/copilot-cli/issues/4628>  
   - 重要性：这是非交互模式的稳定性问题，容易导致自动化任务中途失败。
   - 社区反应：0 评论、0 👍；属于高影响但尚待确认的流程控制 bug。

3. **`TaskShellProgress` 需要暴露 `large_output_file_path` 以读取完整输出**  
   GitHub 链接：<https://github.com/github/copilot-cli/issues/4630>  
   - 重要性：当前 `recentOutput` 是滚动窗口，客户端只能看到“尾部样本”，不适合调试与 UI 展示。
   - 社区反应：0 评论、0 👍；这是明显的可观测性/工具输出能力诉求。

4. **创建文件工具在文件内容过大时返回无效响应并陷入重试**  
   GitHub 链接：<https://github.com/github/copilot-cli/issues/4626>  
   - 重要性：会引发创建文件失败、重复调用甚至死循环，直接影响自动化任务可靠性。
   - 社区反应：0 评论、0 👍；属于“功能边界 + 错误处理”问题。

5. **Gemini 模型在 MCP 工具数组 schema 含联合类型时返回 400**  
   GitHub 链接：<https://github.com/github/copilot-cli/issues/4623>  
   - 重要性：这类问题会让某些 MCP 工具在 Gemini 下完全不可用，属于模型兼容性阻断。
   - 社区反应：0 评论、0 👍；影响面可能很大，且涉及 schema 兼容策略。

6. **支持可配置的用户级 agents/skills/hooks/instructions 发现路径**  
   GitHub 链接：<https://github.com/github/copilot-cli/issues/4622>  
   - 重要性：对企业统一配置、XDG 风格目录、托管环境很关键，是“可管理性”诉求。
   - 社区反应：0 评论、0 👍；明显来自重度使用者和平台化部署场景。

7. **Rubber duck reviews 缺少可审计记录**  
   GitHub 链接：<https://github.com/github/copilot-cli/issues/4621>  
   - 重要性：涉及审计、可追溯性和结果留痕，适合企业合规场景。
   - 社区反应：0 评论、0 👍；这是偏“治理能力”的需求，不是纯 UI 改进。

8. **GitHub 主题无法固定为深色或浅色**  
   GitHub 链接：<https://github.com/github/copilot-cli/issues/4620>  
   - 重要性：影响长期使用体验和视觉一致性，尤其对暗色模式偏好用户。
   - 社区反应：0 评论、0 👍；属于易感知但非阻断的个性化需求。

9. **WSL 下 `/copy` 命令不可用**  
   GitHub 链接：<https://github.com/github/copilot-cli/issues/4619>  
   - 重要性：WSL 是开发者高频环境，这类剪贴板问题会直接破坏交互效率。
   - 社区反应：0 评论、0 👍；典型的 Linux/WSL 兼容性痛点。

10. **唤醒睡眠后的会话中 `/yolo` 失效，需要重启会话**  
    GitHub 链接：<https://github.com/github/copilot-cli/issues/4618>  
    - 重要性：影响会话权限状态和自动执行能力，是“状态恢复后权限漂移”问题。
    - 社区反应：0 评论、0 👍；属于高风险行为退化，值得优先排查。

---

## 4) 重要 PR 进展
**过去 24 小时无 PR 更新（0 条）**。  
GitHub 链接：<https://github.com/github/copilot-cli/pulls>

---

## 5) 功能需求趋势
从今天的 Issues 里可以看出，社区关注点主要集中在以下方向：

1. **会话恢复与状态一致性**
   - `--resume`、`/yolo`、autopilot、子 agent 行为一致性问题突出。
   - 说明用户希望 Copilot CLI 在“断线/休眠/恢复”后仍保持同一执行语义。

2. **工具输出可观测性**
   - 包括完整 shell 输出、文件创建响应、read_agent 历史回放。
   - 开发者希望从“只看尾部日志”升级到“可追完整过程”。

3. **MCP 与模型兼容性**
   - Gemini 对 schema 的兼容问题、远程 MCP 的认证登录方式都在被关注。
   - 表明 MCP 正在成为 CLI 能力扩展的关键接口层。

4. **跨平台集成与系统适配**
   - Wayland、WSL、macOS、Windows WAM/Entra ID 都有真实问题。
   - Copilot CLI 的“跨平台可用性”仍是社区重点。

5. **插件/Hook/配置体系可管理性**
   - Hooks 生命周期、trace 上下文、用户级发现路径、恢复会话时插件加载等问题集中出现。
   - 说明生态化与企业化部署需求正在增强。

6. **可审计与企业治理**
   - Rubber duck review 留痕、trace correlation、配置路径可控等需求，体现出合规与追责诉求。

---

## 6) 开发者关注点
结合今天的反馈，开发者最该关注的痛点是：

- **恢复态可靠性不足**：会话恢复后，hooks、权限、插件状态可能不一致。
- **自动化任务容错不够**：大输出、空响应、超时退出会导致任务中断或重复执行。
- **模型/协议兼容性脆弱**：尤其是 MCP schema 与不同模型供应商之间的适配。
- **平台差异仍明显**：剪贴板、登录、终端行为在 WSL/Wayland/Windows/macOS 上差异较大。
- **可观测性需求在上升**：社区开始明确要求完整输出、trace 关联和审计留痕，而不是只看最终结果。

---

如果你希望，我也可以把这份日报进一步整理成：
1. **适合团队晨会的 1 页简版**，或  
2. **适合发到内部飞书/Slack 的精简消息版**。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-08-27）

数据来源：`github.com/MoonshotAI/kimi-cli`  
统计窗口：过去 24 小时

---

## 1) 今日速览

今天社区动态整体偏少，**没有新版本发布**，但出现了 1 条值得关注的 Issue 和 1 个修复型 PR。  
当前讨论焦点集中在两类稳定性问题：**异步提醒/会话展示的可恢复性**，以及 **取消链路下的任务清理**。这说明项目正在持续处理 CLI 在复杂交互场景中的边界问题。

---

## 2) 版本发布

- **无新 Releases**

---

## 3) 社区热点 Issues

> 本期过去 24 小时内仅更新 1 条 Issue，因此以下为全部重点项。

### 1. [#2620] Cron fire mid-reply swallows the previous assistant reply; unrecoverable via Ctrl+O
- 链接：<https://github.com/MoonshotAI/kimi-cli/issues/2620>
- 状态：OPEN
- 关注原因：这是一个**高影响的可用性问题**。当 cron 提醒在助手回复尚未处理完时触发，上一条回复会从可见 transcript 中消失，且无法通过 Ctrl+O 恢复。
- 社区反应：当前**0 评论、0 👍**，说明问题刚被提出，但从描述看属于会直接影响对话连续性和用户信任的缺陷。
- 影响判断：这类问题会破坏 CLI 的“可回看、可追溯”体验，尤其在长对话、自动提醒、后台任务并发出现时更明显。

**其余 Issue：** 过去 24 小时内无更多更新。

---

## 4) 重要 PR 进展

> 本期过去 24 小时内仅更新 1 个 PR，因此以下为全部重点项。

### 1. [#2619] fix(soul): cancel nested task on outer cancellation
- 链接：<https://github.com/MoonshotAI/kimi-cli/pull/2619>
- 状态：OPEN
- 主要内容：
  - 将初始 `asyncio.wait()` 纳入 `run_soul` 生命周期清理
  - 外层协程取消时，取消并等待内部 nested task / cancel-event task
  - 增加取消场景的回归测试
- 重要性：这是一个典型的**异步任务取消治理**修复，能降低任务泄漏、悬挂协程、状态不一致等风险。
- 关联问题：修复 `#2615`
- 社区反馈：当前暂无公开评论信息，但从提交内容看属于明确的稳定性增强。

**其余 PR：** 过去 24 小时内无更多更新。

---

## 5) 功能需求趋势

基于本期更新内容，社区关注方向可归纳为：

1. **交互稳定性与会话一致性**
   - 重点在于输出内容不能丢失、转场不能打断、历史记录必须可恢复。

2. **异步与取消机制健壮性**
   - 对 nested task、取消信号、后台事件的处理要求更高，说明 CLI 逐步承载更复杂的并发场景。

3. **提醒/自动触发场景的可预测性**
   - cron、提醒、自动事件与人工对话同时存在时，需要更严格的状态切换和 UI/TTY 管理。

---

## 6) 开发者关注点

从 Issue 和 PR 可以看出，开发者当前最需要关注的是：

- **防止 transcript 被异步事件覆盖或替换**
  - 这类问题会直接影响用户对对话历史的信任。

- **完善取消链路的资源回收**
  - nested task、wait 任务、事件任务都需要在外层取消时正确清理。

- **增强回归测试覆盖**
  - 当前 PR 已开始补充取消场景测试，说明项目正在将边界条件纳入常规验证。

---

如你需要，我也可以把这份日报进一步整理成：
1. **适合发群的短版摘要**，或  
2. **适合周报/站会的表格版**。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-08-27）

## 1) 今日速览
今天 OpenCode 社区的讨论明显集中在两条主线：**Agent 稳定性与异常恢复**，以及 **桌面端/CLI 的可用性修补**。从 Issue 到 PR 的节奏很快，尤其是 Bedrock 兼容性、启动中断、命令行参数解析、长文本粘贴等问题，已经有一批对应修复 PR 跟进。  
同时，社区对 **V2/2.0 的平台能力** 也在持续加码，包括 WebSocket RPC、移动端远程控制、ACP 命令发现、多账号管理和模型选择 API 等。

---

## 2) 社区热点 Issues

1. **子 Agent 进入“同样工具调用”无限循环，50 分钟持续烧 token**
   - 链接：[#45442](https://github.com/anomalyco/opencode/issues/45442)
   - 这类问题直接影响成本和可靠性，属于最高优先级的稳定性缺陷；目前 3 条评论，说明复现价值高、影响面大。

2. **Web UI 长会话卡死，持续重试但没有诊断与恢复能力**
   - 链接：[#45456](https://github.com/anomalyco/opencode/issues/45456)
   - 会话级故障持续数小时，且报错被“无脑重试”掩盖，属于典型的生产可用性问题；已有 2 条评论，表明社区对恢复机制很敏感。

3. **启动阶段按 Ctrl+C 退出后，TUI 打印 AbortError 堆栈**
   - 链接：[#45409](https://github.com/anomalyco/opencode/issues/45409)
   - 这是高频交互中的“噪音错误”，虽然不一定阻断功能，但严重影响体验；2 条评论，并已被多个 PR 追着修。

4. **`opencode run -f FILE "<prompt>"` 会把 prompt 吞成文件路径**
   - 链接：[#45501](https://github.com/anomalyco/opencode/issues/45501)
   - CLI 参数解析错误，属于“看起来像小问题、实际阻断任务启动”的典型 Bug；2 条评论，且很快有修复 PR 跟上。

5. **输入框偶发无法粘贴文本**
   - 链接：[#45430](https://github.com/anomalyco/opencode/issues/45430)
   - 这是直接影响日常使用的输入链路问题，尤其在长提示词场景下很致命；已有 2 条评论，说明复现并不罕见。

6. **右侧“Revisión”面板无法折叠，侧边栏开关还被禁用**
   - 链接：[#45441](https://github.com/anomalyco/opencode/issues/45441)
   - 反映出桌面端布局控制不够灵活，屏幕空间被硬性占用；2 条评论，属于明显的 UI/UX 痛点。

7. **GPT-5.6 在 Amazon Bedrock 上的 reasoning 变体失败**
   - 链接：[#45405](https://github.com/anomalyco/opencode/issues/45405)
   - 这是模型兼容性问题，直接影响新模型可用性；2 条评论，并已出现对应修复 PR，说明社区响应很快。

8. **Web UI 缺少多账号管理/切换能力**
   - 链接：[#45484](https://github.com/anomalyco/opencode/issues/45484)
   - 多账号是实际团队使用中的刚需，CLI 已支持但 Web 端缺失，形成明显能力断层；1 条评论但产品价值很高。

9. **工作区子目录缺少多仓库变更跟踪**
   - 链接：[#45498](https://github.com/anomalyco/opencode/issues/45498)
   - 对 mono-repo / 多仓库工作流很关键，尤其适合 IDE/桌面端场景；1 条评论，但属于中长期平台能力。

10. **远程控制 RC：希望支持二维码配对和手机接入**
    - 链接：[#45437](https://github.com/anomalyco/opencode/issues/45437)
    - 这是明显的产品扩展方向，说明社区开始期待“类 Claude Code 的移动遥控能力”；虽然只有 2 条评论，但战略意义较强。

---

## 3) 重要 PR 进展

1. **修复 Bedrock GPT-5.6 reasoning 变体**
   - 链接：[#45520](https://github.com/anomalyco/opencode/pull/45520)
   - 将 `@ai-sdk/amazon-bedrock` 升级到 4.0.165，直接对齐 Issue #45405，解决推理字段兼容错误。

2. **启动阶段不再打印 Ctrl+C 的 AbortError 栈**
   - 链接：[#45518](https://github.com/anomalyco/opencode/pull/45518)
   - 将启动时的取消请求视为正常退出路径，减少 TUI 退出噪音，对应 Issue #45409。

3. **统一 thinking 状态与 reasoning 设置**
   - 链接：[#45515](https://github.com/anomalyco/opencode/pull/45515)
   - 调整“Thinking / Reasoning”展示逻辑，使其更贴近 Figma Model 的 Hidden / Compact / Full 语义。

4. **`agent list` 默认改为摘要输出，完整规则放到 `--verbose`**
   - 链接：[#45513](https://github.com/anomalyco/opencode/pull/45513)
   - 解决输出过长、难以阅读的问题，对应 Issue #45496，明显提升命令行可用性。

5. **合并 Go 使用统计中重复的模型行**
   - 链接：[#45512](https://github.com/anomalyco/opencode/pull/45512)
   - 统一按“模型 + 解析后的倍率”聚合，修复重复展示问题，对应 Issue #45502。

6. **修复 `opencode run -f` 把位置参数吞进文件列表**
   - 链接：[#45510](https://github.com/anomalyco/opencode/pull/45510)
   - 明确保留 positional message，避免 CLI 解析误吞 prompt，对应 Issue #45501。

7. **MCP 选择器切换作用域收敛到 workspace**
   - 链接：[#45509](https://github.com/anomalyco/opencode/pull/45509)
   - 避免同名 MCP 在错误目录下被切换，提升多工作区场景的准确性。

8. **桌面端改用 WebSocket RPC 请求服务端**
   - 链接：[#45508](https://github.com/anomalyco/opencode/pull/45508)
   - 这是 2.0/架构层的重要改造，为桌面与服务端解耦、实时通信和后续能力扩展打基础。

9. **修复 `sap-ai-core` 的 finish_reason 归一化与 assistant prefill 清理**
   - 链接：[#45507](https://github.com/anomalyco/opencode/pull/45507)
   - 解决该模型链路中的 400 错误与消息格式问题，增强供应商适配稳定性。

10. **修复桌面端多行粘贴导致的 renderer OOM**
    - 链接：[#45497](https://github.com/anomalyco/opencode/pull/45497)
    - 针对大段粘贴触发的输入事件风暴做保护，降低内存爆掉的风险，属于高优先级体验修复。

---

## 4) 功能需求趋势

1. **Agent 稳定性与循环保护**
   - 典型诉求：避免无限工具调用、减少重复动作、提升失败后的自动收敛能力。
   - 代表 Issue：[#45442](https://github.com/anomalyco/opencode/issues/45442)、[#45385](https://github.com/anomalyco/opencode/issues/45385)

2. **桌面/Web 端交互完整性**
   - 典型诉求：面板可折叠、文件树默认可见、粘贴输入稳定、布局更符合多窗口使用。
   - 代表 Issue：[#45441](https://github.com/anomalyco/opencode/issues/45441)、[#45487](https://github.com/anomalyco/opencode/issues/45430)

3. **模型与供应商兼容性**
   - 典型诉求：新模型及时适配、SDK 升级、reasoning/finish_reason 等协议细节一致。
   - 代表 Issue：[#45405](https://github.com/anomalyco/opencode/issues/45405)、[#45395](https://github.com/anomalyco/opencode/issues/45395)

4. **多账号 / 多提供商管理**
   - 典型诉求：Web UI 也要支持账号查看、切换、状态感知，而不只是 CLI。
   - 代表 Issue：[#45484](https://github.com/anomalyco/opencode/issues/45484)

5. **远程协作与移动端接入**
   - 典型诉求：二维码配对、手机远程控制、会话同步。
   - 代表 Issue：[#45437](https://github.com/anomalyco/opencode/issues/45437)

6. **工作区、worktree、多仓库支持**
   - 典型诉求：在 mono-repo / 子目录 / worktree 场景下，项目选择、变更跟踪、会话归属更准确。
   - 代表 Issue：[#45498](https://github.com/anomalyco/opencode/issues/45498)、[#45392](https://github.com/anomalyco/opencode/issues/45392)

7. **命令行与工具发现的可发现性**
   - 典型诉求：命令参数更稳、工具 discovery 文档统一、ACP 命令能被客户端正确发现。
   - 代表 Issue：[#45501](https://github.com/anomalyco/opencode/issues/45501)、[#45504](https://github.com/anomalyco/opencode/issues/45504)、[#45521](https://github.com/anomalyco/opencode/issues/45521)

---

## 5) 开发者关注点

- **优先级正在向“稳定性兜底”倾斜**：无限循环、退出异常、长会话卡死、启动恢复失败，都是会被迅速修补的高优先级问题。  
- **CLI / TUI 的边界条件仍是主要故障源**：参数吞并、长输出、粘贴、快捷退出等交互细节，仍在持续暴露问题。  
- **模型适配必须跟上供应商变化**：Bedrock、SAP AI Core、OpenAI 变体等一旦 SDK 或协议变化，就会立刻影响可用性。  
- **Web/桌面能力差距在收敛，但仍有空白**：多账号管理、面板折叠、远程控制、WebSocket RPC 是明显的下一步方向。  
- **文档与实际行为一致性需要持续修正**：像 `instructions`、tool discovery、`/compact` 这种“文档说法 vs 实际行为”的问题，已经成为社区高频反馈点。  

如果你愿意，我也可以把这份日报进一步整理成：
- **适合发群公告的精简版**
- **适合内部周报的分析版**
- **带“风险等级/优先级”的运维版**

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

以下为 **2026-08-27** 的 Pi 社区动态日报（基于 `github.com/badlogic/pi-mono` 近 24 小时数据整理）。

---

## 1. 今日速览

今天社区的讨论明显集中在 **AI 推理兼容性、TUI 交互体验、以及扩展/代理链路稳定性** 三个方向：一方面，Z.AI / GLM、Mistral、DeepSeek 等模型的 thinking 行为和 catalog 更新持续受到关注；另一方面，Windows、Terminal、WSL 等环境下的显示与输入问题仍然是高频痛点。  
同时，多个高价值修复已进入 PR 流程，涵盖 **agent loop 异常处理、思考流序列化性能、工具输出兼容性、以及模型目录补全**，说明项目正同时推进“可用性修复”和“生态适配”。

---

## 2. 版本发布

**过去 24 小时无新 Release。**

---

## 3. 社区热点 Issues

下面挑选 10 个最值得关注的 Issue，按“影响面 + 讨论热度 + 解决优先级”综合排序。

### 1) [#8675] TUI 文本在 WSL2/Windows Terminal 下按“每个词一行”渲染
- 链接：[#8675](https://github.com/badlogic/pi-mono/issues/8675)
- 重要性：直接影响主界面可读性，属于阻塞级体验问题；对长消息、工具输出和助手回答都造成严重排版异常。
- 社区反应：评论数 2，且有 **3 个点赞**，说明问题复现明确、共鸣强。
- 关键词：TUI、换行、WSL2、Windows Terminal、布局渲染

### 2) [#8673] Thinking block / Markdown 的软换行被当成硬换行
- 链接：[#8673](https://github.com/badlogic/pi-mono/issues/8673)
- 重要性：直接影响 reasoning trace 的可读性，是“模型输出解释性”问题，不只是样式问题。
- 社区反应：评论数 2，已有明确 root cause 指向 `marked` 的 CommonMark 行为。
- 关键词：thinking block、Markdown、可读性、渲染语义

### 3) [#8688] Windows 上 powershell tool 命令前多了一个 stray `.`
- 链接：[#8688](https://github.com/badlogic/pi-mono/issues/8688)
- 重要性：属于 Windows 平台上的命令执行故障，会直接导致首词解析错误，影响工具调用成功率。
- 社区反应：评论数 3，是本批次中较受关注的 Windows bug 之一。
- 关键词：Windows、PowerShell、工具执行、编码前缀

### 4) [#8705] agentLoop / agentLoopContinue 未捕获 rejection，导致 EventStream 悬挂
- 链接：[#8705](https://github.com/badlogic/pi-mono/issues/8705)
- 重要性：涉及代理主循环的异常恢复，属于可靠性核心问题；如果处理不好，前端流会“卡死不结束”。
- 社区反应：评论数 2，属于典型“高影响、低噪音”的稳定性 bug。
- 关键词：agent loop、异常处理、EventStream、流式输出

### 5) [#8706] Z.AI forced-thinking 模型在 thinking 关闭时仍泄漏 reasoning
- 链接：[#8706](https://github.com/badlogic/pi-mono/issues/8706)
- 重要性：涉及模型输出隐私/预期一致性，thinking 关闭却泄漏 reasoning，会破坏用户控制。
- 社区反应：评论数 2，且与 PR #8707 同步推进，说明修复优先级高。
- 关键词：Z.AI、GLM、thinking、reasoning 泄漏

### 6) [#8711] OpenRouter GLM-5.3-flash thinking 流导致 TUI 100% CPU 并冻结
- 链接：[#8711](https://github.com/badlogic/pi-mono/issues/8711)
- 重要性：典型性能/稳定性问题，直接拖垮交互；长时间运行后 CPU 占满，影响很大。
- 社区反应：虽仅 1 条评论，但问题描述具体，且属于高优先级性能故障。
- 关键词：性能、CPU 占满、thinking stream、OpenRouter

### 7) [#8678] Prompt 选择后的文本不能直接编辑
- 链接：[#8678](https://github.com/badlogic/pi-mono/issues/8678)
- 重要性：属于高频输入体验优化，影响编辑器“像不像正常文本框”。
- 社区反应：与鼠标选区、光标定位类反馈形成一个明显的 UX 需求簇。
- 关键词：编辑器、鼠标、选区、可编辑性

### 8) [#8701] Fullscreen 模式下点击 prompt 编辑区不能定位光标
- 链接：[#8701](https://github.com/badlogic/pi-mono/issues/8701)
- 重要性：基础交互缺失，影响全屏模式可用性；与 #8678 同属编辑链路问题。
- 社区反应：1 条评论，但属于“易感知、低门槛”的用户体验需求。
- 关键词：fullscreen、鼠标点击、光标定位

### 9) [#8716] Fullscreen 模式滚轮固定 1 行/格，滚动过慢
- 链接：[#8716](https://github.com/badlogic/pi-mono/issues/8716)
- 重要性：滚动速度直接影响长对话浏览效率，且当前实现不支持设置化。
- 社区反应：1 条评论，属于偏功能化的交互请求，但非常具体。
- 关键词：滚轮、fullscreen、可配置性、阅读效率

### 10) [#8710] /resume 为了搜索而全量解析所有 session 文件
- 链接：[#8710](https://github.com/badlogic/pi-mono/issues/8710)
- 重要性：属于明显的性能与扩展性问题；会拖慢“快速切换最近会话”的主路径。
- 社区反应：1 条评论，但问题定位很清晰，且与会话规模增长强相关。
- 关键词：resume、会话加载、索引优化、性能

---

## 4. 重要 PR 进展

以下挑选 10 个最重要的 PR，覆盖修复、能力补齐和生态扩展。

### 1) [#8704] fix(agent): end event stream on unhandled loop rejection
- 链接：[#8704](https://github.com/badlogic/pi-mono/pull/8704)
- 内容：修复 agent loop 未捕获 rejection 导致流挂起的问题，增强代理主循环的错误收尾能力。
- 价值：直接对应 Issue #8705，属于核心稳定性修复。

### 2) [#8707] fix(ai): keep zai thinking enabled for forced-thinking models (off === null)
- 链接：[#8707](https://github.com/badlogic/pi-mono/pull/8707)
- 内容：修复 forced-thinking 的 Z.AI 模型在 thinking 关闭时被错误发送 `disabled` 的问题。
- 价值：对应 Issue #8706，保障模型思考控制语义正确。

### 3) [#8719] fix(ai): treat whitespace-only tool results as empty output
- 链接：[#8719](https://github.com/badlogic/pi-mono/pull/8719)
- 内容：避免 Windows shell 等场景下仅含空白的工具结果被送入 provider，防止 OpenAI-compatible 接口 400。
- 价值：提升 tool message 兼容性，是跨平台稳定性的关键补丁。

### 4) [#8690] feat(ai): add GLM-5.3 Flash to Z.AI catalogs
- 链接：[#8690](https://github.com/badlogic/pi-mono/pull/8690)
- 内容：将 GLM-5.3 Flash 加入 Z.AI 目录，补齐最新模型支持。
- 价值：对应新模型接入需求，保持模型生态更新速度。

### 5) [#8699] fix(tui): remove coding-agent config reads from pi-tui
- 链接：[#8699](https://github.com/badlogic/pi-mono/pull/8699)
- 内容：清理 pi-tui 对 coding-agent 配置的冗余读取，减少耦合。
- 价值：改善架构边界，降低配置来源冲突风险。

### 6) [#8696] fix(tui): handle Apple Terminal meta arrows
- 链接：[#8696](https://github.com/badlogic/pi-mono/pull/8696)
- 内容：修复 Apple Terminal 的 Option+arrow 序列识别，提升 macOS 终端可用性。
- 价值：增强终端输入兼容性，覆盖典型 macOS 用户。

### 7) [#8694] fix(ai): expose low reasoning effort for DeepSeek V4 Pro
- 链接：[#8694](https://github.com/badlogic/pi-mono/pull/8694)
- 内容：为 DeepSeek V4 Pro 暴露 `low` thinking level，和 V4 Flash 行为对齐。
- 价值：补齐推理档位，提升模型能力可控性。

### 8) [#8674] fix(tui): render markdown soft line breaks as spaces, not hard breaks
- 链接：[#8674](https://github.com/badlogic/pi-mono/pull/8674)
- 内容：修复 Markdown 软换行被误渲染为硬换行的问题。
- 价值：对应 Issue #8673，是提升 TUI 文本可读性的基础修复。

### 9) [#8671] fix(ai): serialize thinking signature once
- 链接：[#8671](https://github.com/badlogic/pi-mono/pull/8671)
- 内容：将 reasoning_details 的 thinkingSignature 改为单次序列化，避免 O(n²) 累积开销。
- 价值：同时解决性能和流式处理复杂度问题，对长思考流尤其关键。

### 10) [#8664] feat(ai): promote NVIDIA InferenceHub to a built-in provider
- 链接：[#8664](https://github.com/badlogic/pi-mono/pull/8664)
- 内容：将 NVIDIA InferenceHub 提升为内建 provider。
- 价值：扩大官方支持面，增强企业/多模型接入能力。

---

## 5. 功能需求趋势

从近 24 小时 Issues 看，社区最关注的功能方向主要有：

1. **模型与推理策略适配**
   - 包括 Z.AI / GLM、Mistral、DeepSeek、Qwen、OpenRouter 新模型接入与 thinking 行为对齐。
   - 典型需求：`low/off/high/max` 档位映射、forced-thinking 兼容、reasoning 泄漏控制。

2. **TUI / 终端交互体验优化**
   - 终端换行、软换行、鼠标点击定位、滚轮速度、Option+Arrow 等问题集中出现。
   - 说明 Pi 的核心用户仍高度依赖终端交互，且对“像原生终端一样顺手”非常敏感。

3. **Windows / macOS / WSL 兼容性**
   - Windows PowerShell、cmd、WSL2、Apple Terminal 的输入输出兼容问题占比高。
   - 这表明跨平台适配仍是社区高频诉求。

4. **Agent / RPC / Extension API 的稳定性与可预测性**
   - 关注点包括 stream rejection、队列控制、RPC 元数据、before_agent_start、exec 行为等。
   - 社区希望扩展系统具备更明确的生命周期和更稳定的错误语义。

5. **性能与会话管理**
   - /resume 全量解析、thinking 流 CPU 占满、长会话重绘、思考签名 O(n²) 等都指向性能压力。
   - 说明随着使用强度增加，Pi 正进入“需要优化大会话/长流式场景”的阶段。

---

## 6. 开发者关注点

从反馈中可以归纳出开发者最常见的痛点与高频需求：

- **输出语义一致性**：thinking 开/关、forced-thinking、reasoning_signature 等需要严格对齐 provider 预期，避免“看起来能跑、实际语义错位”。
- **跨平台命令执行可靠性**：Windows PowerShell、npm global CLI、空白 tool result 等问题反复出现，说明工具执行链路仍是薄弱点。
- **流式异常必须可收口**：agent loop rejection、EventStream 悬挂、reasoning_details 逐 token 重写，都体现出对流式路径健壮性的强需求。
- **TUI 需要更强的原生感**：换行、光标定位、鼠标选择、滚动速度等，都是影响日常使用频率的关键细节。
- **扩展/API 需要更明确的契约**：get_commands 元数据、steer/follow_up 行为、队列控制和 preflight 事件都在要求更完整的开发者接口定义。
- **模型目录必须跟上平台变化**：新模型（GLM-5.3 Flash、qwen3.8-flash）和 provider（NVIDIA InferenceHub）更新节奏非常快，目录同步能力已成为产品竞争力的一部分。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合直接发 Slack/飞书的短版**，或  
2. **更偏管理层阅读的“结论 + 风险 + 建议”版**。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报｜2026-08-27

## 1) 今日速览
今天的核心动向是 **v0.22.2 发布**，其中最重要的架构变更是把“持久 Node REPL”拆成独立 MCP server，属于明确的 breaking change。  
社区讨论则集中在三类高频问题：**权限/安全绕过、Agent Team 并发一致性、以及 qwen serve / Web Shell 交互稳定性**；同时，CI 可靠性和自定义模型兼容性也在持续被关注。

## 2) 版本发布
- [v0.22.2](https://github.com/QwenLM/qwen-code/releases/tag/v0.22.2)  
  关键变化：**`refactor(node-repl)!`**，将 persistent Node REPL 作为独立 MCP server 提供（[PR #9499](https://github.com/QwenLM/qwen-code/pull/9499)）。  
  公开信息中还显示：
  - [desktop-v0.2.2](https://github.com/QwenLM/qwen-code/releases/tag/v0.22.2)
  - [cua-driver-rs-v0.20.1](https://github.com/QwenLM/qwen-code/releases/tag/v0.22.2)（macOS/Linux/Windows/Node.js 预构建产物）

## 3) 社区热点 Issues
1. [#10227 自定义模型供应商无法对话](https://github.com/QwenLM/qwen-code/issues/10227)  
   影响：自定义 provider 直接卡在请求 schema 校验，属于**模型接入阻塞**。  
   社区反应：**5 条评论**，是今天最活跃的 issue 之一，说明复现和影响都比较明确。

2. [#10218 permissions.allow 语义变化：0.22.1 起未覆盖工具直接禁用](https://github.com/QwenLM/qwen-code/issues/10218)  
   影响：`allow` 从“自动批准列表”变成“注册表白名单”，会改变已有配置行为，兼容性风险很高。  
   社区反应：**4 条评论**，且带有 `need-retesting`，说明文档与实际行为存在明显落差。

3. [#10199 security: lossy MCP permission aliases can authorize tools from a different server](https://github.com/QwenLM/qwen-code/issues/10199)  
   影响：MCP 权限别名可能把不同 server/tool 误匹配到同一个规则上，属于**潜在越权问题**。  
   社区反应：**2 条评论**，但优先级是 **P1**，安全敏感度极高。

4. [#10196 Variable-expanded shell redirects can bypass explicit Write deny rules through Bash allow rules](https://github.com/QwenLM/qwen-code/issues/10196)  
   影响：shell 重定向目标如果通过变量展开，可能绕过写入拒绝规则。  
   社区反应：**2 条评论**，属于典型的权限层绕过修复需求。

5. [#10192 security: Bash allow rules can be bypassed by command substitution hidden in leading environment assignments](https://github.com/QwenLM/qwen-code/issues/10192)  
   影响：环境变量前缀里隐藏命令替换，可使原本需要确认的命令被误判为允许。  
   社区反应：**2 条评论**，同样是 **P1** 安全问题。

6. [#10254 CI: merge queue has not run since 2026-07-02 and main has no required checks](https://github.com/QwenLM/qwen-code/issues/10254)  
   影响：合并队列长期未运行，且主分支缺少强制检查，容易让语义冲突静默进入 main。  
   社区反应：**2 条评论**，但对整个交付链路影响很大。

7. [#10210 Agent Team: team_delete can report success after filesystem cleanup fails](https://github.com/QwenLM/qwen-code/issues/10210)  
   影响：清理失败却返回成功，会制造“看似删除成功、实际残留”的一致性问题。  
   社区反应：**4 条评论**，说明多人已关注到这个生命周期缺陷。

8. [#10209 Agent Team: stale reclaim can delete a newer live team generation](https://github.com/QwenLM/qwen-code/issues/10209)  
   影响：并发回收旧 team 名称时，可能误删新一代 live team，属于**高风险竞态**。  
   社区反应：**3 条评论**，而且属于 multi-agent 核心生命周期路径。

9. [#10208 Agent Team: failed concurrent spawn can persist a ghost member](https://github.com/QwenLM/qwen-code/issues/10208)  
   影响：并发 spawn 失败后可能留下“幽灵成员”，影响 roster 持久化和后续调度。  
   社区反应：**3 条评论**，问题定位已经比较深入。

10. [#10228 After starting `qwen serve --token xxx`, once MCP is loaded, it becomes impossible to have a conversation in Web UI page](https://github.com/QwenLM/qwen-code/issues/10228)  
    影响：Web UI 在加载 MCP 后直接失去会话能力，属于**严重交互阻塞**。  
    社区反应：**2 条评论**，但复现路径清晰，用户体验影响很直接。

## 4) 重要 PR 进展
1. [#10260 [OPEN] fix(goal): stamp the wind-down hand-off only when its turn was delivered](https://github.com/QwenLM/qwen-code/pull/10260)  
   解决 Goal 交接标记时机问题，避免“未真正投递却提前标记”的状态污染。

2. [#10259 [OPEN] refactor(core): hold Goal sends to the caller's recursion budget](https://github.com/QwenLM/qwen-code/pull/10259)  
   收紧 Goal 的递归预算归属，避免绕过调用方预算约束。

3. [#10258 [OPEN] feat(web-shell): show GitHub-style state icons for session PR bindings](https://github.com/QwenLM/qwen-code/pull/10258)  
   为 Web Shell 中绑定的 PR 状态增加 GitHub 风格图标，提高可读性。

4. [#10257 [OPEN] fix(channel): preserve source metadata on resume](https://github.com/QwenLM/qwen-code/pull/10257)  
   修复 daemon channel session resume 时 source 元数据丢失的问题。

5. [#10253 [OPEN] fix(ci): keep web-shell visuals comment on upload failure](https://github.com/QwenLM/qwen-code/pull/10253)  
   修复视觉素材上传失败时，PR 评论整块丢失的问题，增强 CI 输出鲁棒性。

6. [#10251 [OPEN] fix(review): warn on self-targeted asset publishing](https://github.com/QwenLM/qwen-code/pull/10251)  
   给 `publish-assets` 增加自指向仓库的警告，避免把资源发回被审查仓库。

7. [#10249 [OPEN] fix(review): strip ANSI from gh JSON output](https://github.com/QwenLM/qwen-code/pull/10249)  
   解决 `gh api` 彩色输出导致 JSON 解析失败的问题，并覆盖 NDJSON 路径。

8. [#10245 [OPEN] fix(core): report teammate result settled before event bridge attach](https://github.com/QwenLM/qwen-code/pull/10245)  
   修复 teammate 初始结果在事件桥接挂载前丢失的问题，补齐 Agent Team 时序缺口。

9. [#10237 [OPEN] fix(core): prevent duplicate task owner dispatch](https://github.com/QwenLM/qwen-code/pull/10237)  
   阻止同一任务被重复分配给不同 teammate，避免双重派发。

10. [#10236 [OPEN] fix(core): make stale team reclaim generation-safe](https://github.com/QwenLM/qwen-code/pull/10236)  
    让 stale reclaim 过程具备 generation safety，减少误删新 team 的风险。

## 5) 功能需求趋势
- **权限与安全硬化**：社区持续在追问 shell/MCP/Git 权限边界，重点集中在 allow/deny 规则的准确性与可解释性。  
  代表问题：[#10218](https://github.com/QwenLM/qwen-code/issues/10218)、[#10199](https://github.com/QwenLM/qwen-code/issues/10199)、[#10196](https://github.com/QwenLM/qwen-code/issues/10196)、[#10192](https://github.com/QwenLM/qwen-code/issues/10192)

- **Agent Team 并发与生命周期一致性**：多条 issue 都指向 team spawn、reclaim、delete、事件桥接等竞态问题，说明 multi-agent 仍是核心演进区。  
  代表问题：[#10210](https://github.com/QwenLM/qwen-code/issues/10210)、[#10209](https://github.com/QwenLM/qwen-code/issues/10209)、[#10208](https://github.com/QwenLM/qwen-code/issues/10208)、[#10211](https://github.com/QwenLM/qwen-code/issues/10211)

- **Web Shell / daemon 会话管理体验**：session 重命名、MCP 加载后不可对话、消息归类错误等问题持续出现，表明 Web Shell 仍在快速打磨。  
  代表问题：[#10228](https://github.com/QwenLM/qwen-code/issues/10228)、[#10246](https://github.com/QwenLM/qwen-code/issues/10246)、[#10248](https://github.com/QwenLM/qwen-code/issues/10248)、[#10261](https://github.com/QwenLM/qwen-code/issues/10261)

- **自定义模型与多模态兼容性**：模型供应商接入、模态元数据识别、schema 兼容等问题，说明“更多模型可用”仍是重要诉求。  
  代表问题：[#10227](https://github.com/QwenLM/qwen-code/issues/10227)、[#10194](https://github.com/QwenLM/qwen-code/issues/10194)

- **CI / 发布链路可靠性**：merge queue、E2E 网络可达性、PR 资源发布稳定性等问题表明，交付可靠性是团队的持续痛点。  
  代表问题：[#10254](https://github.com/QwenLM/qwen-code/issues/10254)、[#10242](https://github.com/QwenLM/qwen-code/issues/10242)、[#10229](https://github.com/QwenLM/qwen-code/pull/10229)、[#10253](https://github.com/QwenLM/qwen-code/pull/10253)

## 6) 开发者关注点
- **权限系统需要更强的回归保护**：`permissions.allow` 语义变化和 shell/MCP 绕过类问题并存，说明权限层既要防越权，也要避免误伤老配置。  
  参考：[#10218](https://github.com/QwenLM/qwen-code/issues/10218)、[#10199](https://github.com/QwenLM/qwen-code/issues/10199)、[#10196](https://github.com/QwenLM/qwen-code/issues/10196)

- **Agent Team 的竞态问题集中暴露**：spawn / reclaim / delete / event bridge 多点同时出错，开发者正在围绕生命周期一致性补洞。  
  参考：[#10210](https://github.com/QwenLM/qwen-code/issues/10210)、[#10209](https://github.com/QwenLM/qwen-code/issues/10208)、[#10211](https://github.com/QwenLM/qwen-code/issues/10211)

- **Web Shell 体验仍是高频反馈区**：MCP、session、重命名、消息归类等问题表明前端/daemon 协同路径还在快速收敛。  
  参考：[#10228](https://github.com/QwenLM/qwen-code/issues/10228)、[#10246](https://github.com/QwenLM/qwen-code/issues/10246)、[#10248](https://github.com/QwenLM/qwen-code/issues/10248)

- **CI 稳定性与发布可观测性需要继续加强**：主分支检查、E2E 网络依赖、视觉资源发布失败后的容错，都是当前交付链路的薄弱点。  
  参考：[#10254](https://github.com/QwenLM/qwen-code/issues/10254)、[#10242](https://github.com/QwenLM/qwen-code/issues/10242)、[#10253](https://github.com/QwenLM/qwen-code/pull/10253)

如果你愿意，我也可以把这份日报进一步整理成 **“适合发群的短版”** 或 **“适合周报汇总的长版”**。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

以下为 **2026-08-27 DeepSeek TUI 社区动态日报**（基于过去 24 小时 GitHub 更新数据整理）。

## 1. 今日速览
今天社区讨论与开发重心仍集中在 **TUI 体验恢复、Runtime 会话隔离、MCP/工具链兼容性** 三条主线。与此同时，多条“rescue”型 PR 被推上 current main，说明项目正处于 **将已验证修复迁移回主线** 的阶段。  
- 重点链接：  
  - [Issues 更新](https://github.com/Hmbown/DeepSeek-TUI/issues)  
  - [PR 更新](https://github.com/Hmbown/DeepSeek-TUI/pulls)

## 2. 社区热点 Issues
> 说明：今天仅有 **4 条 Issue 更新**，以下为全部更新项。

1. **#5627 Add Xquik to the reviewed MCP recommendations**  
   - 链接：<https://github.com/Hmbown/DeepSeek-TUI/issues/5627>  
   - 重要性：反映 **MCP 推荐源覆盖不足**，用户可通过通用命令连接，但在“推荐项”里找不到，属于明显的可发现性问题。  
   - 社区反应：已收到 **2 条评论**，说明问题虽小但影响实际使用路径。  

2. **#5630 [bug] Bug 0.9.12 integration: runtime store owner lock**  
   - 链接：<https://github.com/Hmbown/DeepSeek-TUI/issues/5630>  
   - 重要性：涉及 **机器级单 owner lock**，会阻止同机多个会话运行，属于高优先级的稳定性/并发问题。  
   - 社区反应：**1 条评论**，并已被后续修复 PR 直接对接。  

3. **#5637 Design: scope MCP secret providers to the owning runtime**  
   - 链接：<https://github.com/Hmbown/DeepSeek-TUI/issues/5637>  
   - 重要性：讨论 **MCP 凭据/密钥的作用域**，涉及线程安全、生命周期与宿主环境隔离，是架构级设计议题。  
   - 社区反应：新建即引发架构讨论，当前 **0 评论**，但属于后续实现的关键前置。  

4. **#5633 [enhancement] Design: unify route-specific tool projection before request dispatch**  
   - 链接：<https://github.com/Hmbown/DeepSeek-TUI/issues/5633>  
   - 重要性：聚焦 **不同路由下工具 schema 和 wire shape 的统一投影**，影响请求构造、预览、诊断一致性。  
   - 社区反应：**0 评论**，但已被多个 PR 作为设计依据引用，说明其是核心技术方案讨论点。  

## 3. 重要 PR 进展
> 说明：今天共有 17 条 PR 更新，以下挑选 10 条最值得关注的进展。

1. **#5646 fix(tui): rescue route-specific tool projection**  
   - 链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/5646>  
   - 说明：将 #5633 中关于 **路由特定工具投影** 的修复救回当前主线，并保留贡献者原始补丁结构。  

2. **#5645 feat(tui): rescue lifecycle outbox and extract exec agent**  
   - 链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/5645>  
   - 说明：补上 **生命周期 outbox**（JSONL/webhook）与执行 agent 拆分，增强会话事件可观测性。  

3. **#5644 fix(config): shelter ConfigToml parses on a 16 MiB stack**  
   - 链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/5644>  
   - 说明：修复 **ConfigToml 解析在 debug 构建下栈溢出**，属于配置保存/引导流程的稳定性修复。  

4. **#5643 fix(tui): recover MCP login and restore welcome motion**  
   - 链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/5643>  
   - 说明：恢复 **MCP 登录失败后的正确回退路径**，并修复欢迎动画/文案交互，直接影响新用户体验。  

5. **#5642 fix(git): keep read-only probes off the user index lock**  
   - 链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/5642>  
   - 说明：避免只读 Git 探测触发 `.git/index.lock` 竞争，降低与用户工作区冲突。  

6. **#5641 feat(runtime-api): rescue per-thread usage with CNY coverage**  
   - 链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/5641>  
   - 说明：新增 **线程级 usage 接口**，并按 session 成本持久化，服务于计费/用量展示。  

7. **#5638 fix(runtime): scope the thread store per session (#5630)**  
   - 链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/5638>  
   - 说明：把 runtime store 默认根目录改为 **session 级隔离**，直接修复同机多进程冲突。  

8. **#5636 fix(tui): degrade incompatible Moonshot tools per request**  
   - 链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/5636>  
   - 说明：对 Moonshot 工具兼容性失败做 **按工具降级**，而不是整单失败，提升请求成功率。  

9. **#5635 feat(web): embed tsnet for codewhale web --tailscale**  
   - 链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/5635>  
   - 说明：引入可选的 **Tailscale Web 暴露能力**，同时保持默认 loopback-only，更偏部署能力增强。  

10. **#5629 fix(tui): persist context pressure warnings**  
    - 链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/5629>  
    - 说明：将 **上下文压力告警** 从临时滚动内容提升为持久状态，改善长会话可见性。  

## 4. 功能需求趋势
从今日 Issues 与 PR 可以看出，社区关注点正在向以下方向集中：

- **IDE / TUI 交互恢复与可用性提升**  
  - 关键词：欢迎动效、登录恢复、上下文告警、消息发送/队列文案。  
  - 相关链接：  
    - [#5643](https://github.com/Hmbown/DeepSeek-TUI/pull/5643)  
    - [#5629](https://github.com/Hmbown/DeepSeek-TUI/pull/5629)

- **Runtime 会话隔离与并发稳定性**  
  - 关键词：session 级 store、owner lock、multi-session、usage 持久化。  
  - 相关链接：  
    - [#5630](https://github.com/Hmbown/DeepSeek-TUI/issues/5630)  
    - [#5638](https://github.com/Hmbown/DeepSeek-TUI/pull/5638)  
    - [#5641](https://github.com/Hmbown/DeepSeek-TUI/pull/5641)

- **MCP 兼容性、认证与密钥作用域设计**  
  - 关键词：OAuth 恢复、secret provider、MCP 推荐项、工具投影。  
  - 相关链接：  
    - [#5627](https://github.com/Hmbown/DeepSeek-TUI/issues/5627)  
    - [#5637](https://github.com/Hmbown/DeepSeek-TUI/issues/5637)  
    - [#5643](https://github.com/Hmbown/DeepSeek-TUI/pull/5643)  
    - [#5646](https://github.com/Hmbown/DeepSeek-TUI/pull/5646)

- **工具链/模型路由兼容性治理**  
  - 关键词：Moonshot、tool_choice、route-specific projection、兼容工具保留。  
  - 相关链接：  
    - [#5633](https://github.com/Hmbown/DeepSeek-TUI/issues/5633)  
    - [#5636](https://github.com/Hmbown/DeepSeek-TUI/pull/5636)  
    - [#5646](https://github.com/Hmbown/DeepSeek-TUI/pull/5646)

- **性能与构建稳定性**  
  - 关键词：栈溢出、Git 锁争用、CI 超时、只读探测。  
  - 相关链接：  
    - [#5644](https://github.com/Hmbown/DeepSeek-TUI/pull/5644)  
    - [#5642](https://github.com/Hmbown/DeepSeek-TUI/pull/5642)  
    - [#5640](https://github.com/Hmbown/DeepSeek-TUI/pull/5640)

- **Web / 部署能力与企业化准备**  
  - 关键词：web tailscale、launch readiness、legal/pricing 页面。  
  - 相关链接：  
    - [#5635](https://github.com/Hmbown/DeepSeek-TUI/pull/5635)  
    - [#5628](https://github.com/Hmbown/DeepSeek-TUI/pull/5628)  
    - [#5639](https://github.com/Hmbown/DeepSeek-TUI/pull/5639)

- **模型目录与价格信息完善**  
  - 关键词：OpenRouter、新模型条目、priced model、上下文长度。  
  - 相关链接：  
    - [#5631](https://github.com/Hmbown/DeepSeek-TUI/pull/5631)

## 5. 开发者关注点
今天的反馈集中暴露出几个高频痛点：

- **同机多会话冲突**：runtime owner lock 与 store root 共享问题，说明并发隔离仍是核心诉求。  
  - 参考：[#5630](https://github.com/Hmbown/DeepSeek-TUI/issues/5630)、[#5638](https://github.com/Hmbown/DeepSeek-TUI/pull/5638)

- **MCP / 工具调用链不够稳**：推荐项缺失、登录恢复路径不明确、不同路由工具 shape 不一致。  
  - 参考：[#5627](https://github.com/Hmbown/DeepSeek-TUI/issues/5627)、[#5633](https://github.com/Hmbown/DeepSeek-TUI/issues/5633)、[#5643](https://github.com/Hmbown/DeepSeek-TUI/pull/5643)

- **长会话可观测性不足**：上下文压力警告、usage 统计、生命周期事件需要更持久的呈现。  
  - 参考：[#5629](https://github.com/Hmbown/DeepSeek-TUI/pull/5629)、[#5641](https://github.com/Hmbown/DeepSeek-TUI/pull/5641)、[#5645](https://github.com/Hmbown/DeepSeek-TUI/pull/5645)

- **构建与运行时健壮性问题**：debug 栈溢出、Git lock 竞争、CI timeout 说明稳定性仍需持续修补。  
  - 参考：[#5644](https://github.com/Hmbown/DeepSeek-TUI/pull/5644)、[#5642](https://github.com/Hmbown/DeepSeek-TUI/pull/5642)、[#5640](https://github.com/Hmbown/DeepSeek-TUI/pull/5640)

- **路由/模型兼容性需要“降级而非失败”**：社区倾向于让不兼容工具局部退化，保留可用能力。  
  - 参考：[#5636](https://github.com/Hmbown/DeepSeek-TUI/pull/5636)、[#5646](https://github.com/Hmbown/DeepSeek-TUI/pull/5646)

如果你愿意，我也可以把这份日报进一步整理成 **适合直接发到 Slack/飞书的短版**，或者输出成 **Markdown 表格版**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*