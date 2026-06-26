# AI CLI 工具社区动态日报 2026-06-26

> 生成时间: 2026-06-26 01:38 UTC | 覆盖工具: 9 个

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

下面是基于你提供的 2026-06-26 社区摘要整理的**横向对比分析报告**。  
**统计口径**：按过去 24 小时内各仓库摘要中明确列出的 **活跃 Issues / PR / Release** 计算。

---

# 1) 生态全景

整体来看，AI CLI 工具生态已从“能跑”进入“**稳定性、可观测性、可控性**”竞争阶段。  
今天多数仓库的高频反馈都集中在：**权限/安全误判、会话恢复、成本与 quota 透明、跨平台回归、MCP/扩展生态**。  
这说明用户不再只关心模型能力，而是更关注 CLI 作为“代理工作台”是否能在真实工程环境中长期可靠运行。  
同时，多个项目都在加速引入 **桌面化、TUI 增强、企业级策略控制**，AI CLI 正在向“开发平台”而非单纯聊天工具演进。

---

# 2) 各工具活跃度对比

| 工具 | 今日 Issues 数 | 今日 PR 数 | Release 情况 | 活跃度判断 |
|---|---:|---:|---|---|
| Claude Code | 10 | 0 | 有，v2.1.193 | 问题密集，修复节奏未体现在 PR |
| OpenAI Codex | 10 | 10 | 有，5 个 release/tag 动态 | 高活跃、强迭代 |
| Gemini CLI | 8 | 10 | 有，v0.50.0-preview.1 / v0.49.0 | 高活跃、偏平台化修复 |
| GitHub Copilot CLI | 10 | 0 | 有，v1.0.66-0 | 问题集中，公开修复节奏偏慢 |
| Kimi Code CLI | 2 | 0 | 无 | 小体量、问题集中 |
| OpenCode | 10 | 10 | 有，v1.17.11 | 高活跃、快速迭代 |
| Pi | 10 | 8 | 无 | 功能与稳定性同步推进 |
| Qwen Code | 8 | 10 | 无 | 高活跃、工程治理导向 |
| DeepSeek TUI / CodeWhale | 3 | 10 | 有，v0.8.65 | PR 密集，工程治理强 |

---

# 3) 共同关注的功能方向

## A. 权限、安全与自动化拦截的“可控化”
**代表工具**：Claude Code、OpenCode、DeepSeek TUI、Copilot CLI、Gemini CLI  
**具体诉求**：
- Claude Code：auto-mode、权限块误判、可解释拒绝原因
- OpenCode：plan mode 权限边界、unsafe hotbar dispatch
- DeepSeek TUI：AUTO/YOLO 行为一致性
- Copilot CLI：MCP policy 阻断
- Gemini CLI：依赖安全修复、资源边界控制

**结论**：行业正在从“默认拦住再说”转向“**安全拦截要可解释、可申诉、可配置**”。

## B. 成本、quota、token 透明化
**代表工具**：Claude Code、OpenAI Codex、Copilot CLI、Pi、Qwen Code  
**具体诉求**：
- Claude Code：会话恢复导致额度快速消耗、默认模型升级引发账单爆炸
- OpenAI Codex：quota/token 异常、idle 扣量、账单可信度
- Copilot CLI：月度 AIC quota 可见性
- Pi：context budget、token/cache 统计
- Qwen Code：上下文压缩、长流程成本控制

**结论**：**“成本可预期” 已成为核心产品信任指标**，尤其在付费订阅场景。

## C. 会话连续性与状态恢复
**代表工具**：OpenAI Codex、OpenCode、Copilot CLI、Qwen Code、Pi  
**具体诉求**：
- Codex：resume/world state/agent 状态保留
- OpenCode：session snapshots、revert controls
- Copilot CLI：session 找不回、autopilot 断开
- Qwen Code：session status、session resume
- Pi：`/resume` 后历史丢失、诊断与状态恢复

**结论**：代理型 CLI 正在从“单轮工具”变成“**长会话工作流引擎**”。

## D. MCP / 扩展 / Skills 生态治理
**代表工具**：Gemini CLI、OpenAI Codex、Copilot CLI、Qwen Code、Claude Code、DeepSeek TUI、Kimi Code CLI、Pi  
**具体诉求**：
- Gemini：MCP 资源隔离、扩展索引、skills 可见性
- Codex：MCP runtime、skills、user instructions
- Copilot：MCP policy、skills 迁移
- Qwen：daemon/session 接口扩展
- Claude：权限自动分类
- Pi / Kimi / DeepSeek：外部工具接入稳定性

**结论**：生态正在从“能接工具”走向“**工具可发现、可隔离、可治理**”。

## E. 跨平台稳定性与桌面/TUI 体验
**代表工具**：Claude Code、OpenAI Codex、OpenCode、Qwen Code、Pi、DeepSeek TUI、Kimi Code CLI  
**具体诉求**：
- Windows / macOS / WSL 回归修复
- TUI 鼠标、主题、快捷键、输入框、滚动历史
- Desktop / IDE / 浏览器插件联动稳定性

**结论**：AI CLI 的主战场已经不是“是否支持跨平台”，而是“**跨平台是否足够像原生工具**”。

---

# 4) 差异化定位分析

## Claude Code
- **功能侧重**：安全策略、权限解释、成本控制、跨平台修复
- **目标用户**：重度终端用户、注重安全边界的开发者
- **技术路线**：偏“受控自动化”，强调拦截、审计、可解释性

## OpenAI Codex
- **功能侧重**：平台化能力、World State、MCP、长会话恢复、桌面/浏览器/CLI 多端联动
- **目标用户**：团队型开发者、需要长任务代理的高级用户
- **技术路线**：从 CLI 向“开发代理平台”演进，体系化最强

## Gemini CLI
- **功能侧重**：安全依赖治理、Vertex AI/企业路由、MCP 正确性、启动性能
- **目标用户**：企业云用户、Google 生态开发者
- **技术路线**：更偏云端企业集成与发布链路可靠性

## GitHub Copilot CLI
- **功能侧重**：MCP 管理、session 连续性、可观测性、编辑交互
- **目标用户**：GitHub/Copilot 体系内的重度开发者
- **技术路线**：强调与 IDE/企业策略兼容的受管控代理体验

## Kimi Code CLI
- **功能侧重**：MCP 接入、TUI 渲染稳定性
- **目标用户**：中文用户、轻量 CLI 场景用户
- **技术路线**：当前更像“基础体验打磨期”，生态仍较早期

## OpenCode
- **功能侧重**：桌面化、会话快照/回滚、权限边界、跨平台稳定性
- **目标用户**：桌面端重度用户、需要 IDE 化体验的人群
- **技术路线**：CLI + Desktop 双线推进，产品化节奏很强

## Pi
- **功能侧重**：扩展系统、TUI 细节、主题/配置、RPC/session 可观测性
- **目标用户**：终端重度用户、扩展作者、平台型用户
- **技术路线**：偏“可扩展平台”，工程化与插件化明显

## Qwen Code
- **功能侧重**：Windows 兼容、daemon/session 运维、Web Shell 体验、CI/发布治理
- **目标用户**：工程团队、中文开发者、需要稳定交付的用户
- **技术路线**：工程治理导向很强，关注“可运维、可恢复、可自动化”

## DeepSeek TUI / CodeWhale
- **功能侧重**：AUTO/YOLO 自动化、Hotbar 安全、诊断、迁移与安装
- **目标用户**：偏自动化的 TUI 用户、开源社区用户
- **技术路线**：围绕自动执行链路做治理，强调安全与可诊断性

---

# 5) 社区热度与成熟度

## 社区最活跃 / 迭代最快
- **OpenAI Codex、OpenCode、Gemini CLI、Qwen Code**
- 特征：**Issues + PR 都高频**，且版本发布不断，说明处在快速迭代期
- 共同特征：一边修复稳定性，一边推进平台化能力

## 问题压力高，但公开修复节奏不明显
- **Claude Code、GitHub Copilot CLI**
- 特征：Issues 很密集，但本窗口内 **无 PR 更新**
- 解读：用户压力大，说明产品使用面广；但当前公开修复节奏未同步体现

## 小体量但工程推进明确
- **DeepSeek TUI**
- 特征：Issue 量不大，但 PR 很密、改动聚焦
- 解读：维护节奏偏“治理型”，不是靠社区噪声驱动，而是靠工程重构推进

## 体量较小、反馈集中
- **Kimi Code CLI**
- 特征：Issue 少但问题直指核心体验
- 解读：更像早期打磨阶段，社区规模和反馈面都还有限

---

# 6) 值得关注的趋势信号

## 1. “安全拦截”正在从防御机制变成产品体验问题
开发者不再接受“先拦再说”，而是要求：
- 为什么拦
- 能否申诉
- 能否针对已授权场景放行  
这对权限系统、审计日志和 UI 解释能力提出更高要求。

## 2. 成本透明度正在成为订阅产品的信任底座
默认模型变更、session 恢复、idle 扣量、token 循环都在引发用户焦虑。  
对开发者的启示是：**任何可能改变成本曲线的默认行为，都必须显式提示和可回退**。

## 3. 长会话能力是代理型 CLI 的核心竞争力
快照、恢复、状态保留、World State、session status 成为高频关键词。  
未来竞争点不只是“回答得对不对”，而是“**能否连续做完一整个工程任务**”。

## 4. MCP / Skills / Extensions 正在进入治理阶段
生态已从“接入工具”进入“管理工具”：
- 资源隔离
- 索引可发现性
- policy 控制
- 认证恢复
- 跨 server 防串台  
这意味着平台层能力会越来越重要。

## 5. 跨平台稳定性仍是最大工程成本之一
Windows、WSL、macOS、Linux、ARM64 都在暴露回归。  
对开发团队来说，**平台兼容不是收尾工作，而是主战场**。

## 6. CLI 正在向“桌面化 + 可观测化”演进
很多项目都在补：
- 时间戳
- 诊断信息
- token/cache
- UI 状态可视化
- 主题/快捷键/鼠标交互  
说明用户已经把 AI CLI 当成长期工作台，而不是一次性工具。

---

如果你愿意，我可以继续把这份报告再压缩成两个版本：
1. **适合老板/产品决策层的一页摘要版**
2. **适合研发例会的表格 + 结论版**

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

下面这份报告基于你提供的热门 PR / Issue 列表综合判断。  
**说明**：你给出的 PR 数据里未展示具体评论数，因此“热门排行”按**讨论热度、重复提及程度、对核心链路影响**综合排序；所列 PR 当前状态均为 **Open**。

---

## 1) 热门 Skills 排行（PR）

### 1. [#1298](https://github.com/anthropics/skills/pull/1298) — fix(skill-creator): `run_eval.py` 总是 0% recall
- **功能/影响**：修复 skill 评估与描述优化链路的核心指标失真问题，涉及 eval artifact 安装、Windows 流读取、触发检测、并行 worker。
- **社区热点**：这是当前最核心的“工具链可信度”问题之一；如果 recall 一直是 0%，`run_loop.py` 和 `improve_description.py` 的优化结果就不可靠。
- **状态**：Open

### 2. [#1323](https://github.com/anthropics/skills/pull/1323) — fix(skill-creator): 触发检测漏判真实 skill 名称
- **功能/影响**：修复 `run_eval.py::run_single_query` 无法正确识别 skill 被触发的问题。
- **社区热点**：与 #556 / #1169 同类，说明社区非常关注“技能是否真的被触发”这一基础评测能力。
- **状态**：Open

### 3. [#1099](https://github.com/anthropics/skills/pull/1099) — skill-creator: Windows 下 subprocess pipe 读取崩溃
- **功能/影响**：修复 Windows 环境下 `run_eval.py` 不可用的问题。
- **社区热点**：Windows 兼容性被反复提及，说明不少用户在本地/企业环境中直接跑 Claude Code Skills 工具链。
- **状态**：Open

### 4. [#1050](https://github.com/anthropics/skills/pull/1050) — skill-creator: Windows subprocess + encoding 修复
- **功能/影响**：进一步修复 Windows 下 `subprocess.Popen`、编码等兼容性问题。
- **社区热点**：与 #1099 形成同一条主线，反映“跨平台可用性”是当前高频痛点。
- **状态**：Open

### 5. [#361](https://github.com/anthropics/skills/pull/361) — 检测 description 中未加引号的 YAML 特殊字符
- **功能/影响**：防止 `description` 中的 `:`、`#`、`{}`、`[]` 等字符导致 YAML 被静默误解析。
- **社区热点**：这类问题直接影响 Skill 元数据质量，属于“看似小、但会导致技能失效”的高优先级修复。
- **状态**：Open

### 6. [#362](https://github.com/anthropics/skills/pull/362) — 修复 UTF-8 多字节字符导致 panic
- **功能/影响**：解决中文/多语言内容在 skill-creator 中的长度计算与截断崩溃。
- **社区热点**：说明社区正在把 Skills 真正用于多语言场景，国际化与字符安全成为基础要求。
- **状态**：Open

### 7. [#514](https://github.com/anthropics/skills/pull/514) — add document-typography skill
- **功能/影响**：新增文档排版质量控制技能，重点处理孤行、寡行、编号错位等问题。
- **社区热点**：非常典型的“文档生产力”诉求，说明用户不满足于“能生成文档”，而是希望“生成可交付文档”。
- **状态**：Open

### 8. [#723](https://github.com/anthropics/skills/pull/723) — add testing-patterns skill
- **功能/影响**：覆盖单测、React 组件测试、测试金字塔/Testing Trophy 等完整测试模式。
- **社区热点**：测试生成和测试规范化是最受欢迎的通用工程技能方向之一，适用面广。
- **状态**：Open

---

## 2) 社区需求趋势

从 Issues 看，社区最期待的新 Skill 方向主要集中在以下几类：

### A. **技能分发与共享**
- 代表 Issue：
  - [#228](https://github.com/anthropics/skills/issues/228) — 组织内共享 skills
- 趋势判断：用户希望 Skill 能像“组织资产”一样共享，而不是手动导入导出。

### B. **安全、信任边界与治理**
- 代表 Issue：
  - [#492](https://github.com/anthropics/skills/issues/492) — community skills 使用 `anthropic/` 命名空间带来信任边界风险
  - [#412](https://github.com/anthropics/skills/issues/412) — agent governance skill
- 趋势判断：社区越来越在意“谁发布的 skill、能做什么、是否可信”。

### C. **评测、触发与运行稳定性**
- 代表 Issue：
  - [#556](https://github.com/anthropics/skills/issues/556) — `run_eval.py` 0% trigger rate
  - [#1169](https://github.com/anthropics/skills/issues/1169) — description optimization loop recall=0%
  - [#1061](https://github.com/anthropics/skills/issues/1061) — Windows 兼容性问题
- 趋势判断：社区对“技能优化闭环”非常依赖，当前最大需求是让评测链路真实可用。

### D. **文档、知识整理与企业内容处理**
- 代表 Issue：
  - [#1175](https://github.com/anthropics/skills/issues/1175) — SharePoint 文档安全与上下文处理
  - [#147](https://github.com/anthropics/skills/issues/147) — codebase inventory/audit
  - [#95](https://github.com/anthropics/skills/issues/95) — 系统文档与流程图
- 趋势判断：企业用户希望 Skills 直接覆盖“文档治理、审计、知识管理”。

### E. **与外部平台/协议集成**
- 代表 Issue：
  - [#29](https://github.com/anthropics/skills/issues/29) — Bedrock 支持
  - [#16](https://github.com/anthropics/skills/issues/16) — Expose Skills as MCPs
- 趋势判断：社区希望 Skills 不只是本地能力包，而是可嵌入更大 Agent 生态的接口层。

### F. **技能库质量、重复与可发现性**
- 代表 Issue：
  - [#189](https://github.com/anthropics/skills/issues/189) — plugin 安装重复 skills
  - [#61](https://github.com/anthropics/skills/issues/61) — 加载 skills 404
  - [#62](https://github.com/anthropics/skills/issues/62) — skills 消失
- 趋势判断：用户已经进入“用 skill 管理 skill”的阶段，因此安装、加载、重复、丢失等基础问题变得很敏感。

---

## 3) 高潜力待合并 Skills

这些 PR 大多是**修复型、基础设施型**，短期内很可能落地，因为它们直接影响 Skills 生态可用性：

1. [#1298](https://github.com/anthropics/skills/pull/1298) — `run_eval.py` recall=0% 核心修复  
2. [#1323](https://github.com/anthropics/skills/pull/1323) — skill 触发检测修复  
3. [#1099](https://github.com/anthropics/skills/pull/1099) — Windows pipe 崩溃修复  
4. [#1050](https://github.com/anthropics/skills/pull/1050) — Windows subprocess / 编码修复  
5. [#361](https://github.com/anthropics/skills/pull/361) — YAML 解析静默错误防护  
6. [#362](https://github.com/anthropics/skills/pull/362) — UTF-8 / 多字节字符稳定性修复  

> 判断理由：这些 PR 都在修“底座”，且与已公开的高频 Issue 强关联，属于最可能优先合并的一批。

---

## 4) Skills 生态洞察

**一句话总结**：当前社区最集中的诉求是——**让 Skills 从“能写出来”进化为“能稳定触发、可验证、可共享、可跨平台部署的生产级能力体系”**。

---

如果你愿意，我可以进一步把这份报告整理成：
1. **表格版（适合汇报）**
2. **PPT 大纲版**
3. **按“产品/工程/安全”三视角拆解版**

---

# Claude Code 社区动态日报（2026-06-26）

## 1) 今日速览
今天社区讨论最集中在两类问题：**安全/权限自动拦截误判** 与 **成本/模型行为不可控**。与此同时，Windows、macOS、TUI/IDE 相关回归也在持续浮现，说明当前版本在跨平台稳定性和可观测性上仍有明显压力。

---

## 2) 版本发布

### v2.1.193
- 新增 `autoMode.classifyAllShell`：可将所有 Bash/PowerShell 命令都交由 auto-mode 分类器处理，不再只针对“任意代码执行”模式。
- 新增 auto-mode 拒绝原因展示：会写入 transcript、拒绝 toast，以及 `/permissions` 的 recent denials，提升排查透明度。
- 本次变更重点明显偏向 **权限决策可解释性** 与 **自动化命令安全管控**。  
  链接：<https://github.com/anthropics/claude-code/releases/tag/v2.1.193>

---

## 3) 社区热点 Issues

### 1. [#71478] VS Code 扩展恢复超大会话却不提示，快速耗尽 Max 用量
- 影响：会话恢复后直接拉起巨量上下文，容易导致额度被迅速消耗，属于高成本风险问题。
- 社区反应：已有 4 条评论，明显触发了成本焦虑。
- 链接：<https://github.com/anthropics/claude-code/issues/71478>

### 2. [#71481] 默认模型静默升级到 Opus 4.7，6 天产生 $506 意外费用
- 影响：这是典型的“默认行为变化导致账单爆炸”问题，风险很高。
- 社区反应：虽然评论不多，但该问题对订阅与计费信任影响极大。
- 链接：<https://github.com/anthropics/claude-code/issues/71481>

### 3. [#71442] 文档读取请求被过度误判，出现大量 false positive block
- 影响：用户只是“读取/整理文章”，却被安全策略拦截，直接影响基础使用体验。
- 社区反应：已有 2 个赞，说明痛点被不少人共鸣。
- 链接：<https://github.com/anthropics/claude-code/issues/71442>

### 4. [#71482] mesh-agent enrollment 被安全拦截误伤，误读临时 loopback 管理
- 影响：误把授权的防御性操作当成危险行为，属于 auto-mode / harness 误判问题。
- 社区反应：已有 2 条评论，说明这类误伤并非个例。
- 链接：<https://github.com/anthropics/claude-code/issues/71482>

### 5. [#71452] 已授权的 SSH 状态检查仍被安全块阻断
- 影响：用户明确授权的运维动作仍被挡住，直接影响云基础设施排障效率。
- 社区反应：虽只有 2 条评论，但问题类型与 #71482/#71463 一致，呈现连片出现。
- 链接：<https://github.com/anthropics/claude-code/issues/71452>

### 6. [#71465] macOS Terminal.app 中 TUI 鼠标点击失效
- 影响：点击链接、切换 agent 都失灵，属于明显的交互回归。
- 社区反应：已有 2 条评论，且标记为 regression，优先级较高。
- 链接：<https://github.com/anthropics/claude-code/issues/71465>

### 7. [#71464] Windows 下 `context: fork` 的 slash command/skill 输出不渲染
- 影响：fork 子 agent 已执行完成，但结果只写成 `<local-command-stdout>`，前台看不到 assistant 消息。
- 社区反应：已明确复现，属于影响工作流完整性的功能性 bug。
- 链接：<https://github.com/anthropics/claude-code/issues/71464>

### 8. [#71449] Windows 上 `/login` 授权码输入框无法输入
- 影响：登录流程直接不可用，属于阻断级问题。
- 社区反应：带有 repro，说明问题已可稳定触发。
- 链接：<https://github.com/anthropics/claude-code/issues/71449>

### 9. [#71475] Windows MSIX/ARM64 “Relaunch to update” 无法真正完成更新
- 影响：更新后仍停留在旧版本，直到重启/注销才生效，影响发布节奏与修复可达性。
- 社区反应：带有 repro，且描述清楚，容易被快速定位。
- 链接：<https://github.com/anthropics/claude-code/issues/71475>

### 10. [#71486] `/feedback` 希望可不附带 session/context，提供隐私退出选项
- 影响：这是非常明确的隐私与诊断边界诉求，说明用户对数据附带范围敏感。
- 社区反应：虽仅 1 条评论，但属于高频产品设计诉求。
- 链接：<https://github.com/anthropics/claude-code/issues/71486>

---

## 4) 重要 PR 进展
- 过去 24 小时 **没有 PR 更新**，因此暂无可汇总的合入进展。  
- 链接：<https://github.com/anthropics/claude-code/pulls>

---

## 5) 功能需求趋势

从今天的 Issues 看，社区关注点主要集中在以下方向：

1. **权限/安全自动化的误判纠正**
   - 大量 issue 指向 auto-mode、harness、权限块误伤。
   - 代表链接：  
     <https://github.com/anthropics/claude-code/issues/71482>  
     <https://github.com/anthropics/claude-code/issues/71463>  
     <https://github.com/anthropics/claude-code/issues/71452>

2. **成本可控性与账单透明**
   - 会话恢复、默认模型切换、token 消耗都被反复提及。
   - 代表链接：  
     <https://github.com/anthropics/claude-code/issues/71478>  
     <https://github.com/anthropics/claude-code/issues/71481>  
     <https://github.com/anthropics/claude-code/issues/71461>

3. **跨平台稳定性**
   - Windows、macOS、WSL、MSIX/ARM64 都有回归或兼容性问题。
   - 代表链接：  
     <https://github.com/anthropics/claude-code/issues/71465>  
     <https://github.com/anthropics/claude-code/issues/71449>  
     <https://github.com/anthropics/claude-code/issues/71475>  
     <https://github.com/anthropics/claude-code/issues/71473>

4. **TUI / Desktop / IDE 交互体验**
   - 鼠标、快捷键、diff 视图、无障碍、agent view 登录等都在被提需求。
   - 代表链接：  
     <https://github.com/anthropics/claude-code/issues/71484>  
     <https://github.com/anthropics/claude-code/issues/71470>  
     <https://github.com/anthropics/claude-code/issues/71472>  
     <https://github.com/anthropics/claude-code/issues/71488>

5. **模型与输出可靠性**
   - 包括默认模型升级、工具调用渲染错误、API rate limit 报错等。
   - 代表链接：  
     <https://github.com/anthropics/claude-code/issues/71481>  
     <https://github.com/anthropics/claude-code/issues/71487>  
     <https://github.com/anthropics/claude-code/issues/71477>

---

## 6) 开发者关注点

### 高频痛点
- **安全策略误伤太多**：用户已授权的防御性运维、文档阅读、SSH 检查仍频繁被挡。
- **费用不可预测**：默认模型切换、会话恢复、fleet mode/token 激增都在放大成本风险。
- **登录/会话/更新链路不稳定**：`/login`、更新应用、历史会话定位、恢复逻辑都出现问题。
- **交互回归影响生产力**：鼠标、快捷键、diff、agent view 等基础 UI 能力缺失或退化。
- **隐私与可观测性诉求增强**：用户希望 `/feedback`、OTel、denial reason 等信息更可控、可解释。

### 可执行的产品信号
- 需要把 **“安全拦截可解释 + 可申诉”** 做得更细。
- 需要对 **默认模型、自动续费、会话恢复成本** 提供更强的提示与保护。
- 需要优先修复 **Windows/macOS/TUI 的基础交互回归**，否则会直接影响日常使用。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合微信群/Slack 发送的短版**，或  
2. **适合内部周报的分析版（带趋势判断和优先级建议）**。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-06-26）

## 1) 今日速览
过去 24 小时，Codex 主要围绕 **CLI/桌面端稳定性、额度计费异常、跨平台集成问题** 展开，尤其是 Windows 相关问题与 quota/token 异常最集中。  
同时，仓库持续推进 **MCP、World State、TUI、用户指令钩子** 等核心能力演进，说明团队一边修复体验痛点，一边强化平台化能力。

---

## 2) 版本发布
- **rust-v0.142.2**：  
  - MCP tools 默认启用 tool search，提升工具发现能力，并保持对旧模型/旧 provider 的兼容性。  
  - macOS 认证客户端在开启 `respect_system_proxy` 时，可遵循系统代理、PAC、WPAD 配置。  
  - 链接：<https://github.com/openai/codex/releases/tag/rust-v0.142.2>

- **rust-v0.143.0-alpha.25 / alpha.22 / alpha.21**：  
  - 继续发布 alpha 版本，说明 Rust 侧仍在快速迭代中，偏向基础能力与内部实验特性推进。  
  - 链接：  
    - <https://github.com/openai/codex/releases/tag/rust-v0.143.0-alpha.25>  
    - <https://github.com/openai/codex/releases/tag/rust-v0.143.0-alpha.22>  
    - <https://github.com/openai/codex/releases/tag/rust-v0.143.0-alpha.21>

- **codex-zsh-v0.1.0**：  
  - Zsh 相关能力首次以独立版本发布，表明 shell 集成链路在继续产品化。  
  - 链接：<https://github.com/openai/codex/releases/tag/codex-zsh-v0.1.0>

---

## 3) 社区热点 Issues
> 重点挑选近期最值得关注、影响面较大或反馈更集中的问题。

1. **Windows 更新导致严重内存压力与系统不稳定**  
   - Issue：[#30050](https://github.com/openai/codex/issues/30050)  
   - 重要性：这是典型的高优先级桌面端回归，直接影响 Windows 用户可用性。  
   - 社区反应：**5 条评论**，属于过去 24 小时中讨论较活跃的问题之一。

2. **Pro 配额异常快速消耗，疑似 token 循环导致扣量失真**  
   - Issue：[#30086](https://github.com/openai/codex/issues/30086)  
   - 重要性：涉及计费与额度可信度，直接影响付费用户信任。  
   - 社区反应：**4 个赞、3 条评论**，关注度高且指向系统性问题。

3. **订阅/额度异常：刚付费却显示无 token，或 idle 时 quota 持续减少**  
   - Issue：[#30081](https://github.com/openai/codex/issues/30081)  
   - 重要性：这是最敏感的商业体验问题之一，关系到订阅模型是否被正确执行。  
   - 社区反应：**3 个赞、1 条评论**，说明用户对“扣费/扣量异常”非常敏感。

4. **Codex App 在 Windows 上一直转圈、不回复**  
   - Issue：[#30076](https://github.com/openai/codex/issues/30076)  
   - 重要性：属于核心对话链路阻塞，用户无法继续使用。  
   - 社区反应：**3 条评论**，且复现描述明确，便于定位但影响面大。

5. **运行中出现“智能明显下降 / 像被降级” 的模型体验反馈**  
   - Issue：[#30137](https://github.com/openai/codex/issues/30137)  
   - 重要性：反映用户对模型质量、稳定性和版本一致性的主观感知问题。  
   - 社区反应：**2 条评论**，虽然讨论不多，但属于高敏感度体验反馈。

6. **桌面端更新后 GitHub/网络访问在已有线程中失效**  
   - Issue：[#30102](https://github.com/openai/codex/issues/30102)  
   - 重要性：已存在线程更新后失去网络能力，影响长期会话连续性。  
   - 社区反应：**1 个赞**，说明用户认为问题具有代表性。

7. **大体积 Node.js 工作区里 sandbox 极慢，疑似遍历 node_modules**  
   - Issue：[#30084](https://github.com/openai/codex/issues/30084)  
   - 重要性：这是典型的“规模化工作区性能”问题，对真实工程项目影响很大。  
   - 社区反应：属于性能型痛点，通常会持续累积反馈。

8. **`image_gen` 在 0.139.0 后忽略本地参考图，图生图回归**  
   - Issue：[#30121](https://github.com/openai/codex/issues/30121)  
   - 重要性：影响多模态工作流，说明 CLI/沙箱侧的图像输入链路可能退化。  
   - 社区反应：问题描述清晰，便于对比版本回退。

9. **中文 UI 本地化需求**  
   - Issue：[#30060](https://github.com/openai/codex/issues/30060)  
   - 重要性：这是明确的国际化需求，说明 Codex 正在进入更广泛的非英文用户场景。  
   - 社区反应：已有讨论，且诉求直接、可执行。

10. **Chrome 插件连接失败，提示 code-signing identity 缺失**  
    - Issue：[#30155](https://github.com/openai/codex/issues/30155)  
    - 重要性：浏览器插件是关键入口之一，连接失败会直接影响工作流。  
    - 社区反应：新近出现、且带有企业环境特征，值得跟踪。

---

## 4) 重要 PR 进展
> 重点挑选当前仓库里最能代表平台演进方向的 PR。

1. **保留被淘汰 V2 agent 的状态**  
   - PR：[#30154](https://github.com/openai/codex/pull/30154)  
   - 内容：修复 LRU evict 后状态丢失导致的 NotFound 问题，为完成/错误 agent 保留最终状态。  
   - 价值：增强线程与 agent 生命周期一致性。

2. **Resume 时重新注入缺失的 World State 片段**  
   - PR：[#30152](https://github.com/openai/codex/pull/30152)  
   - 内容：恢复时重新加载模型可见的结构化上下文，避免状态丢片。  
   - 价值：提升长会话稳定性与上下文连续性。

3. **让生成图片目录可配置**  
   - PR：[#30149](https://github.com/openai/codex/pull/30149)  
   - 内容：新增 `generated_images_dir` 配置，支持自定义图片产物输出根目录。  
   - 价值：增强企业与高级用户的文件管理灵活性。

4. **在 selected availability 变化但无实际变化时复用 MCP runtime**  
   - PR：[#30148](https://github.com/openai/codex/pull/30148)  
   - 内容：避免无意义重建 MCP runtime。  
   - 价值：减少抖动与资源浪费，偏性能/架构优化。

5. **TUI 使用 managed defaults 创建线程**  
   - PR：[#30147](https://github.com/openai/codex/pull/30147)  
   - 内容：让 TUI 在新建线程时显式消费管理端下发的默认配置。  
   - 价值：提高 managed 模式下默认行为一致性。

6. **合并为单一必需 CI gate**  
   - PR：[#30146](https://github.com/openai/codex/pull/30146)  
   - 内容：把多个 GitHub Actions 状态聚合成一个稳定的 `CI required`。  
   - 价值：降低分散的 CI 维护成本，减少“状态门”碎片化。

7. **修复 terminal rollout durability**  
   - PR：[#30144](https://github.com/openai/codex/pull/30144)  
   - 内容：修正终端事件的持久性问题，避免 TurnComplete/TurnAborted 事件在某些时序下可见性异常。  
   - 价值：直接提升会话事件流可靠性。

8. **允许读取 user-level 的 `code-review-*` skills**  
   - PR：[#30143](https://github.com/openai/codex/pull/30143)  
   - 内容：支持用户在 `$CODEX_HOME/skills/` 下扩展 code review 能力。  
   - 价值：增强个性化审查和可扩展性。

9. **把 process-owned code mode host 接入 core**  
   - PR：[#30142](https://github.com/openai/codex/pull/30142)  
   - 内容：引入 `code_mode_host` feature flag，并实现按需初始化 code-mode session。  
   - 价值：补强 code mode 基础设施。

10. **加载 hook-backed 的 UserInstructions**  
    - PR：[#30141](https://github.com/openai/codex/pull/30141)  
    - 内容：将用户级指令在新会话构建阶段统一解析，并保留回退逻辑。  
    - 价值：这是“可配置行为层”能力的重要一步。

---

## 5) 功能需求趋势
从这些 Issues 可以看出，社区最关注的方向主要有：

- **IDE / 桌面端集成稳定性**  
  - Windows、macOS、VS Code 扩展、Chrome 插件、WSL 等集成链路问题集中出现。  
  - 说明 Codex 正在从“能用”进入“深度嵌入开发环境”的阶段。

- **性能与资源占用**  
  - 内存压力、CPU 飙升、sandbox 变慢、node_modules 遍历等反馈很多。  
  - 大型工程和长时间运行场景下的效率，是当前重要瓶颈。

- **额度 / 计费 / token 统计可信度**  
  - 配额异常、idle 扣量、订阅结束异常、token 不更新等问题多次出现。  
  - 对付费产品来说，这类问题比功能缺失更敏感。

- **会话连续性与状态恢复**  
  - 线程同步、恢复后上下文缺失、已有线程更新后能力退化，都说明“长会话可靠性”很关键。

- **模型体验与输出一致性**  
  - 用户对“模型变弱”“响应异常”“capacity 问题”的反馈，体现对质量稳定性的高度关注。

- **多模态与工具链扩展**  
  - `image_gen`、MCP、remote control、browser plugin 等能力都在被高频使用。  
  - 说明 Codex 正从单一聊天工具向“开发代理平台”演进。

- **国际化与可定制性**  
  - 中文 UI、本地技能、用户指令、生成目录配置等诉求，体现出个性化和全球化需求。

---

## 6) 开发者关注点
从社区反馈里，开发者最常提到的痛点可以概括为：

- **“能不能先稳定再扩展”**：Windows 崩溃、卡转圈、更新后失效，说明基础可用性仍是第一优先级。  
- **“额度为什么对不上”**：token / quota 的异常扣减严重影响信任，尤其是 Pro/Enterprise 用户。  
- **“大项目慢得不可接受”**：大型工作区、sandbox、node_modules 扫描是典型性能雷区。  
- **“恢复会话后别丢状态”**：线程、远程控制、MCP runtime 刷新后的状态一致性问题反复出现。  
- **“集成环境太多，兼容性要更强”**：Windows、macOS、WSL、VS Code、Chrome 插件、代理设置都在暴露边缘问题。  
- **“给高级用户更多控制权”**：本地化、skills、user instructions、生成目录配置等，都是明确的可定制需求。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合公众号/内部周报的精简版**，或  
2. **适合产品/研发例会的表格版**。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-06-26）

## 1) 今日速览
今天 Gemini CLI 的动向主要集中在 **发布链路加固、安全依赖修复、以及核心交互/性能优化** 三条线上：一方面，`v0.50.0-preview.1` 和 `v0.49.0` 持续推进发布节奏；另一方面，社区对 **shell 依赖漏洞、Vertex AI 路由、MCP 资源解析、技能资源可见性** 等基础能力的修复需求明显升温。  
从 Issue 反馈看，用户最关心的仍是 **模型行为可靠性、扩展生态可发现性、以及 CLI 启动/使用体验**。

---

## 2) 版本发布

### v0.50.0-preview.1
重点可见更新集中在 **发布验证与 CI 稳定性**：
- 修复 release 过程中 `npm ci` 忽略脚本的问题  
-  جلوگیری workspace binary shadowing，避免发布验证阶段被本地二进制干扰  
- 还出现了 **tool registry** 相关功能变更（当前公开摘要被截断）

链接：<https://github.com/google-gemini/gemini-cli/releases/tag/v0.50.0-preview.1>

### v0.49.0
本次为正式版本发布，公开可见的变更更偏向 **发布流程与依赖治理**，包括 changelog 自动生成、Dependabot 冷却期启用等。  
从现有信息看，这一版本更多体现为 **稳定性与交付节奏优化**，而非单一大功能宣发。

链接：<https://github.com/google-gemini/gemini-cli/releases/tag/v0.49.0>

---

## 3) 社区热点 Issues
> 说明：过去 24 小时内可见更新的 Issue 共 **8 条**，以下按重要性列出全部重点条目。

1. **#28139 Patch shell command dependencies for public security advisories**  
   安全优先级最高，涉及 `shell-quote`、`simple-git` 等直接运行时依赖的公开漏洞，属于必须尽快处理的供应链风险。当前有 **2 条评论**，且已被标记为 `need-information`，说明团队还在确认影响范围。  
   链接：<https://github.com/google-gemini/gemini-cli/issues/28139>

2. **#28138 Why not refactor gemini-cli but provide a useless agy to us?**  
   这是一条典型的用户体验吐槽，核心矛盾是 **Agent/AGY 使用体验不佳**。虽然标题情绪化，但有 **2 👍、2 条评论**，说明社区对“智能体是否真的好用”是有真实感受和讨论度的。  
   链接：<https://github.com/google-gemini/gemini-cli/issues/28138>

3. **#28141 Extensions gallery: valid extension lusha-oss/lusha-mcp-plugin not indexed in extensions.json despite meeting all requirements**  
   影响扩展生态的可发现性：第三方扩展满足条件却未被索引，会直接伤害生态增长与用户安装路径。当前暂无评论，属于 **低噪声但高影响** 的基础设施问题。  
   链接：<https://github.com/google-gemini/gemini-cli/issues/28141>

4. **#28155 gemini-3.1-pro-preview continues to have similar bug**  
   用户反馈新模型仍存在“写太多代码、偏离原始任务”的问题，说明 **模型指令遵循与任务聚焦能力** 仍未完全满足预期。该类问题直接影响 CLI 的可信度。  
   链接：<https://github.com/google-gemini/gemini-cli/issues/28155>

5. **#28154 gemini-3.1-pro-preview violated policy**  
   这条更偏向 **策略遵循/安全边界** 问题，说明模型在某些场景下仍会触碰不该触碰的行为边界。对生产用户来说，这类反馈优先级很高。  
   链接：<https://github.com/google-gemini/gemini-cli/issues/28154>

6. **#28137 GeminiCLI.com Feedback: [ISSUE]**  
   文档站安装页反馈，虽然看起来是小问题，但属于 **新用户 onboarding** 的关键路径。安装说明一旦有偏差，会直接影响首次体验与转化。  
   链接：<https://github.com/google-gemini/gemini-cli/issues/28137>

7. **#28157 AILQK**  
   内容几乎为空的模板化/占位式 issue，属于 **提交流程噪音**。虽然技术信息有限，但对维护者来说，仍会增加 triage 成本。  
   链接：<https://github.com/google-gemini/gemini-cli/issues/28157>

8. **#28156 AILQK**  
   与上一条类似，属于缺少实质内容的提交，反映出 issue 模板填写质量仍有待提升。  
   链接：<https://github.com/google-gemini/gemini-cli/issues/28156>

---

## 4) 重要 PR 进展

1. **#28153 fix(core): ignore stale update_topic calls after a session reset**  
   解决 `/clear` 或 session reset 后，旧的 `update_topic` tool call 仍写入共享状态的问题，属于 **会话一致性/竞态条件** 修复。  
   链接：<https://github.com/google-gemini/gemini-cli/pull/28153>

2. **#28149 fix(skills): respect .gitignore/.geminiignore in skill resource listing**  
   修复技能资源列表忽略规则失效问题，避免把不该暴露给模型的文件递交出去，属于 **数据边界与安全性** 改进。  
   链接：<https://github.com/google-gemini/gemini-cli/pull/28149>

3. **#28148 fix(docker): copy packed artifacts from the builder stage**  
   修正多阶段 Docker 构建中产物拷贝路径，避免运行时镜像缺少 `.tgz` 包。对容器化发布链路很关键。  
   链接：<https://github.com/google-gemini/gemini-cli/pull/28148>

4. **#28147 fix(ci): prevent bad NPM releases and promote job crashes**  
   修复预览版发布后若测试失败导致的“悬空 NPM 发布”问题，并重排 verify/publish 顺序，属于 **发布安全与交付可靠性** 的关键修复。  
   链接：<https://github.com/google-gemini/gemini-cli/pull/28147>

5. **#28144 fix(cli): detect available editors lazily to avoid slow startup**  
   将编辑器检测从启动时同步探测改为延迟执行，能明显减少 Windows 等环境下的冷启动开销。  
   链接：<https://github.com/google-gemini/gemini-cli/pull/28144>

6. **#28143 fix(core): resolve MCP resources by server to prevent cross-server confusion**  
   修复多个 MCP server 存在同 URI 资源时可能串台的问题，同时限制“always allow”读取范围，属于 **正确性 + 隔离性** 强化。  
   链接：<https://github.com/google-gemini/gemini-cli/pull/28143>

7. **#28142 fix(core): honor GOOGLE_CLOUD_LOCATION for Vertex AI with API key**  
   解决 API key 场景下 `GOOGLE_CLOUD_LOCATION` 被忽略、请求误走 global endpoint 的问题，直接影响 **Vertex AI 区域化部署**。  
   链接：<https://github.com/google-gemini/gemini-cli/pull/28142>

8. **#28140 fix(deps): patch shell command dependency advisories**  
   直接升级 `shell-quote` 和 `simple-git`，针对公开依赖漏洞做补丁修复，是今天最明确的安全修复之一。  
   链接：<https://github.com/google-gemini/gemini-cli/pull/28140>

9. **#28146 docs(hooks): document all three usageMetadata token fields for LLMResponse**  
   补全 hooks 文档，说明 `usageMetadata` 在 Before/AfterModel 场景下实际包含的 token 字段，减少二次开发认知偏差。  
   链接：<https://github.com/google-gemini/gemini-cli/pull/28146>

10. **#28145 Vertex base url update**  
    调整 Vertex AI 基础 URL 和区域路由，面向 US/EU 多区域的正式端点进行修正；虽然当前状态为 closed，但这条线明显是 **企业用户关注的基础架构升级**。  
    链接：<https://github.com/google-gemini/gemini-cli/pull/28145>

---

## 5) 功能需求趋势
从今天的 Issue 主题看，社区关注点正在集中到以下几个方向：

- **安全与依赖治理**：公开漏洞、依赖升级、发布链路安全是高频主题。  
- **模型行为可靠性**：用户持续反馈模型“跑偏”“不遵守策略”“输出过度”的问题。  
- **Vertex AI / 企业部署支持**：区域路由、API key、base URL 等配置一致性需求上升。  
- **扩展与 MCP 生态可用性**：资源解析、扩展索引、技能资源可见性，都是生态层基础能力。  
- **CLI 性能与启动体验**：启动变慢、编辑器探测耗时等问题开始被关注。  
- **文档与新手路径**：安装文档和站点反馈仍是 onboarding 的关键痛点。

---

## 6) 开发者关注点
今天开发者侧最明显的痛点可以概括为：

- **发布流程需要更强的防护**：避免预览版/NPM 发布“成功了但实际上不可用”。  
- **安全补丁要前置**：shell 相关依赖漏洞已经成为明确的优先事项。  
- **模型需要更强的任务收敛能力**：少写、少偏题、少违反策略，是用户真实诉求。  
- **企业配置要一致**：Vertex AI 的区域、endpoint、API key 逻辑不能“看起来支持、实际没生效”。  
- **体验层要减少启动阻塞**：懒加载、资源过滤、文档准确性都直接影响日常使用。  
- **issue 质量参差不齐**：存在不少模板化或信息不足的提交，triage 成本偏高。

如果你需要，我还可以把这份日报进一步整理成：
- **适合微信群/飞书群的一页版**
- **适合内部周报的更正式版**
- **按“安全 / 发布 / 模型 / 生态”四象限重排的分析版**

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# 2026-06-26 GitHub Copilot CLI 社区动态日报

## 1) 今日速览
过去 24 小时内，Copilot CLI 的动态主要集中在 **1.0.66-0 版本发布** 和一批围绕 **MCP、会话体验、输入交互、可观测性** 的问题反馈。整体来看，社区正在从“能用”阶段转向对 **稳定性、可控性、可恢复性** 的更高要求。  
值得注意的是，用户对 **session 恢复、主题适配、自动驾驶模式、时间戳、quota 可见性** 等细节体验的诉求持续升温，而企业场景里对 **MCP policy / telemetry** 的关注也在增加。  

---

## 2) 版本发布

### [v1.0.66-0](https://github.com/github/copilot-cli/releases/tag/v1.0.66-0)
本次发布的新增点，核心围绕 **MCP 管理、响应预算、观测数据** 三个方向：

- 在 MCP 列表视图中增加了 **启用/禁用 MCP server 的开关**
- 增加了 **实验性的 response budget 控制**
- 允许 managed settings 配置 **OpenTelemetry 导出**
- 修复/增强了 **OAuth 认证远程 MCP server** 在会话中 token 刷新后的自动恢复能力

**解读**：  
这版明显在补齐“企业可运营性”和“运行中可控性”，说明 Copilot CLI 正在从交互工具向更可治理的开发代理工具演进。  

---

## 3) 社区热点 Issues

> 说明：以下为过去 24 小时内更新的 10 个 Issue，按关注度与影响面综合挑选。社区互动整体偏轻，但问题指向较明确。

### 1. [#3938 - Preserve user-scoped skills migrated from Claude Code across updates](https://github.com/github/copilot-cli/issues/3938)  
**状态：CLOSED**  
**为什么重要**：涉及从 Claude Code 迁移到 Copilot CLI 的用户级 skills 在更新后丢失，属于高风险数据/配置持久化问题。  
**社区反应**：1 条评论，说明该问题虽不爆炸式发酵，但对迁移用户影响直接，且已被快速关闭，可能有明确修复路径。  

### 2. [#3929 - argument-hint format validation issue](https://github.com/github/copilot-cli/issues/3929)  
**状态：OPEN**  
**为什么重要**：skills 加载失败直接影响插件/skills 生态可用性，且看起来是与格式校验相关的回归或兼容性问题。  
**社区反应**：1 条评论，开发者/用户已给出明确复现上下文，属于“能复现、会阻断”的高优先级 bug。  

### 3. [#3937 - CLI observability gap: /tasks reports no subagents while inline Code-review agent is visibly running](https://github.com/github/copilot-cli/issues/3937)  
**状态：CLOSED**  
**为什么重要**：这是一个典型的 **可观测性不一致** 问题，会影响用户对 agent 状态的判断和信任。  
**社区反应**：无评论但问题描述精确，说明社区对“状态显示不一致”非常敏感；已关闭，可能已修复或纳入跟进。  

### 4. [#3936 - Ctrl+G should expand paste tokens to full text in $EDITOR (Claude Code parity)](https://github.com/github/copilot-cli/issues/3936)  
**状态：OPEN**  
**为什么重要**：这是高频交互路径问题。用户在编辑长 prompt 时，`compactPaste` 的 token 化内容进入 `$EDITOR` 后不可读，直接影响可编辑性。  
**社区反应**：暂无评论，但属于“日常高频、体验影响大”的典型体验缺陷。  

### 5. [#3935 - Copilot CLI 1.0.64 and 1.0.65 on VSCode terminal ignores user theme and defaults to light theme](https://github.com/github/copilot-cli/issues/3935)  
**状态：OPEN**  
**为什么重要**：主题适配是终端工具的基本体验，且发生在 VS Code 终端中，覆盖面很广。  
**社区反应**：暂无评论，但属于明显的回归问题，容易影响视觉可读性与长期使用感受。  

### 6. [#3934 - MCP server 'blocked by policy'](https://github.com/github/copilot-cli/issues/3934)  
**状态：OPEN**  
**为什么重要**：企业场景下的 MCP policy 阻断问题，直接关系到 Copilot CLI 能否进入受管控环境。  
**社区反应**：暂无评论，但这类问题通常意味着“本地可用、企业不可用”，对落地影响极大。  

### 7. [#3933 - Drops out of autopilot after each request](https://github.com/github/copilot-cli/issues/3933)  
**状态：OPEN**  
**为什么重要**：影响 autopilot 连续工作流，是代理式 CLI 的核心使用方式之一。  
**社区反应**：暂无评论，但对重度用户影响明显，属于“主流程稳定性”问题。  

### 8. [#3932 - Display monthly AIC quota and usage in Copilot CLI (like IDE plugins do)](https://github.com/github/copilot-cli/issues/3932)  
**状态：OPEN**  
**为什么重要**：用户希望看到月度 quota，而不是仅 session 级 usage，这反映了成本/额度透明化需求。  
**社区反应**：暂无评论，说明这是“理性需求型”功能，而非 bug，但很可能影响日常使用决策。  

### 9. [#3931 - Where is my session ???!!](https://github.com/github/copilot-cli/issues/3931)  
**状态：OPEN**  
**为什么重要**：session resume 不完整会破坏工作连续性，是 CLI 代理产品最关键的记忆能力之一。  
**社区反应**：暂无评论，但从标题就能看出用户痛点非常强烈，属于高情绪成本问题。  

### 10. [#3930 - Show message timestamps in GitHub Copilot CLI conversations](https://github.com/github/copilot-cli/issues/3930)  
**状态：OPEN**  
**为什么重要**：消息时间戳有助于追踪交互节奏、定位中断点、分析长会话流程，属于可观测性增强。  
**社区反应**：已有 **2 个 👍**，是本轮更新里最明显的正反馈需求，说明用户对“会话时间线”有明确诉求。  

---

## 4) 重要 PR 进展

### 过去 24 小时内 **没有 PR 更新**
- [Copilot CLI Pull Requests](https://github.com/github/copilot-cli/pulls)

**说明**：本期社区动态主要由 Release 和 Issues 驱动，PR 层面暂无新增可追踪进展。  

---

## 5) 功能需求趋势

从本期 Issues 可以提炼出 4 个最强需求方向：

### A. MCP 与插件生态治理
相关问题包括：  
- [#3934](https://github.com/github/copilot-cli/issues/3934) MCP policy 阻断  
- [#3929](https://github.com/github/copilot-cli/issues/3929) skills 格式校验  
- [#3938](https://github.com/github/copilot-cli/issues/3938) skills 迁移持久化  
- Release 中的 MCP 开关、OAuth 恢复能力

**趋势判断**：社区正把 MCP 从“能连接”推进到“可管理、可恢复、可迁移”。  

### B. 会话连续性与恢复能力
相关问题包括：  
- [#3931](https://github.com/github/copilot-cli/issues/3931) session 丢失/不可恢复  
- [#3933](https://github.com/github/copilot-cli/issues/3933) autopilot 断开  
- [#3930](https://github.com/github/copilot-cli/issues/3930) 消息时间戳

**趋势判断**：用户越来越依赖 CLI 处理长上下文任务，因此对 session 记忆、恢复、审计能力的要求明显提升。  

### C. 交互编辑体验
相关问题包括：  
- [#3936](https://github.com/github/copilot-cli/issues/3936) Ctrl+G + `$EDITOR` 兼容性  
- [#3935](https://github.com/github/copilot-cli/issues/3935) 终端主题适配

**趋势判断**：Copilot CLI 已进入“深度日常使用”阶段，细节交互体验开始成为留存关键。  

### D. 透明度与可观测性
相关问题包括：  
- [#3937](https://github.com/github/copilot-cli/issues/3937) subagents 状态不一致  
- [#3932](https://github.com/github/copilot-cli/issues/3932) 月度 quota 透明化  
- Release 中的 OpenTelemetry 导出支持

**趋势判断**：社区正在要求更强的运行时可视化，尤其是在 agent、额度、状态和执行链路层面。  

---

## 6) 开发者关注点

从反馈中能明显看出，开发者/重度用户最关心的是以下几类痛点：

1. **会话不能丢**：resume 不完整、session 不可追踪、历史上下文难恢复。  
2. **代理状态要一致**：autopilot、subagent、任务执行状态必须和真实运行情况对齐。  
3. **MCP 要可控可查**：包括 policy、开关、认证恢复、企业环境兼容性。  
4. **长提示词编辑要顺手**：compact paste、`$EDITOR`、时间戳这些细节直接影响效率。  
5. **额度与成本要透明**：用户希望知道 session 用量，也想看月度 quota，便于规划使用。  
6. **主题与终端兼容要稳定**：VS Code 终端、深色主题等基础体验不能回退。  

---

如果你愿意，我也可以把这份日报进一步整理成 **适合发内部群/Slack 的精简版**，或者输出成 **表格版 CSV/Markdown 模板**。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报  
**日期：2026-06-26**  
数据源：github.com/MoonshotAI/kimi-cli

## 1. 今日速览
今天仓库没有新的 Release，也没有 PR 更新，社区动态主要集中在 **2 条新增/更新的 bug Issue** 上。  
两类问题都指向核心使用体验：一类是 **MCP 工具接入在大规模工具集下的稳定性/兼容性**，另一类是 **CLI 界面渲染抖动与整页重绘问题**，值得维护者优先关注。  
- [#2475 MCP tools](https://github.com/MoonshotAI/kimi-cli/issues/2475)  
- [#2474 界面抖动/重绘问题](https://github.com/MoonshotAI/kimi-cli/issues/2474)

## 2. 版本发布
- **无新 Release**（过去 24 小时未检测到版本发布）

## 3. 社区热点 Issues
> 说明：过去 24 小时仅有 **2 条 Issue 更新**，以下为全部值得关注项。

### 1) [#2475] [bug] MCP tools
- 链接：<https://github.com/MoonshotAI/kimi-cli/issues/2475>
- 重要性：该问题聚焦 **MCP 服务接入 212 个工具** 时的行为，属于典型的“工具规模上升后”的兼容性/性能边界问题。对于依赖 MCP 扩展生态的用户影响较大，可能直接影响可用性。
- 社区反应：当前 **0 评论、0 👍**，讨论尚未展开，但问题描述已足够具体，便于后续复现和定位。
- 关键信息：Kimi Code v0.19.2 / Windows / subscription / k2.7

### 2) [#2474] [bug] kimi code cli界面一直在各种抖动，莫名其妙重新从头渲染整个对话 || kimi code cli interface keeps shaking...
- 链接：<https://github.com/MoonshotAI/kimi-cli/issues/2474>
- 重要性：这是直接影响交互体验的 **UI 稳定性问题**，涉及“界面抖动”和“整个对话被重新渲染”的感知故障，通常意味着渲染循环、状态刷新或消息流更新逻辑存在异常。
- 社区反应：当前 **0 评论、0 👍**，说明尚未形成社区共识，但问题的影响面可能较广，优先级不低。
- 关键信息：0.19.2 / Linux / /login / K2.7 Code thinking

## 4. 重要 PR 进展
> 过去 24 小时 **无 PR 更新**，因此暂无可列出的 PR 进展。

## 5. 功能需求趋势
### 1) MCP / 外部工具生态接入能力
- 从 #2475 可以看出，社区正在把 Kimi Code CLI 用到更复杂的 **MCP 工具链场景** 中，关注点不只是“能连上”，而是“在大量工具下是否稳定、是否可扩展”。
- 链接：[#2475](https://github.com/MoonshotAI/kimi-cli/issues/2475)

### 2) CLI 交互渲染稳定性与性能
- #2474 反映出用户对 **会话渲染抖动、重复重绘、视觉卡顿** 非常敏感。随着对话长度增加，前端/终端渲染效率成为明显痛点。
- 链接：[#2474](https://github.com/MoonshotAI/kimi-cli/issues/2474)

### 3) 多平台兼容性
- 当前问题分别出现在 **Windows** 和 **Linux**，说明社区在不同终端环境下的稳定性预期较高。跨平台一致性仍是基础要求。
- 链接：[#2475](https://github.com/MoonshotAI/kimi-cli/issues/2475) / [#2474](https://github.com/MoonshotAI/kimi-cli/issues/2474)

## 6. 开发者关注点
### 1) 大规模工具接入下的性能与边界控制
- #2475 暗示 MCP 工具数量增大后，可能出现工具枚举、加载、筛选或调用链路上的性能瓶颈。
- 链接：<https://github.com/MoonshotAI/kimi-cli/issues/2475>

### 2) 会话状态管理与渲染刷新策略
- #2474 表明“整页重新渲染”会显著破坏使用体验，开发侧需要重点检查消息流更新、状态变更粒度和终端绘制策略。
- 链接：<https://github.com/MoonshotAI/kimi-cli/issues/2474>

### 3) 版本回归与稳定性验证
- 两个问题都集中在 **v0.19.2**，建议关注是否为该版本引入的回归，尤其是 UI 层和工具层的变更。
- 链接：<https://github.com/MoonshotAI/kimi-cli/issues/2475> / <https://github.com/MoonshotAI/kimi-cli/issues/2474>

### 4) 问题复现信息较完整，但缺少后续互动
- 两个 Issue 都提供了较清晰的环境信息（平台、模型、使用方式），利于复现；但当前 **评论与点赞均为 0**，说明社区讨论尚未启动，维护者响应会更关键。
- 链接：<https://github.com/MoonshotAI/kimi-cli/issues/2475> / <https://github.com/MoonshotAI/kimi-cli/issues/2474>

如需，我也可以把这份日报进一步整理成 **适合内部周报/飞书公告** 的更短版本。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报｜2026-06-26

## 1) 今日速览
今天 OpenCode 的核心动态集中在 **v1.17.11 发布** 与 **桌面端稳定性反馈** 两条线：一方面，新版加入了会话快照与回滚能力，明显增强了“可恢复性”；另一方面，社区继续集中反馈 Windows / WSL / Linux 相关崩溃与回归问题，说明跨平台稳定性仍是当前最高优先级。  
同时，桌面端的交互体验诉求持续升温，围绕 plan/build 切换、查看 AI 思考、会话管理等 IDE 化能力的需求非常活跃。  
- Release: https://github.com/anomalyco/opencode/releases/tag/v1.17.11

## 2) 版本发布
### v1.17.11
- **Core**：新增 **session snapshots / revert controls**，支持将会话回退到更早的消息节点，并包含文件改动回滚能力，属于很强的“误操作保险”能力。  
- **Core 修复**：始终打印 MCP OAuth URL，避免浏览器流程打开失败时无法手动登录。  
- **Desktop**：发布说明显示仍在推进桌面端 UI 改进（摘要中仅显示到 “Add Chrome-sty...”），说明桌面产品线仍在持续打磨。  
- Release: https://github.com/anomalyco/opencode/releases/tag/v1.17.11

## 3) 社区热点 Issues
> 以下挑选过去 24 小时内最值得关注的 10 个 Issue。

1. **#33902 [FEATURE] 用 Tab 在 plan / build 模式间切换**  
   - 重要性：这是典型的“CLI 习惯迁移到 Desktop”的诉求，直接影响高频操作效率。  
   - 社区反应：**6 个评论**，讨论热度高，说明用户对快捷模式切换非常敏感。  
   - 链接：https://github.com/anomalyco/opencode/issues/33902

2. **#33906 [FEATURE] Desktop 中查看 AI thoughts**  
   - 重要性：用户希望更透明地看到 AI 的思考过程，属于“可解释性 / 可观察性”需求。  
   - 社区反应：**6 个评论，已关闭**，说明需求明确且已被快速响应。  
   - 链接：https://github.com/anomalyco/opencode/issues/33906

3. **#33890 Bun 1.3.14 在 Linux x86_64 上 SIGILL 崩溃**  
   - 重要性：这是底层运行时级别崩溃，属于最高优先级稳定性问题。  
   - 社区反应：**5 个评论、4 个 👍**，表明影响范围和关注度都很高。  
   - 链接：https://github.com/anomalyco/opencode/issues/33890

4. **#33901 Windows 升级到 1.17.10 后出现 segmentation fault / panic / MaxListeners**  
   - 重要性：升级后直接崩溃，属于严重回归；会显著影响桌面端可用性。  
   - 社区反应：**4 个评论，已关闭**，说明问题被快速确认并处理。  
   - 链接：https://github.com/anomalyco/opencode/issues/33901

5. **#33887 v1.17.10 在 WSL 上黑屏、无法输入**  
   - 重要性：影响 WSL 用户的基本启动流程，属于阻断式故障。  
   - 社区反应：**4 个评论，仍为 Open**，说明问题尚未完全解决。  
   - 链接：https://github.com/anomalyco/opencode/issues/33887

6. **#33938 升级到 Desktop v1.17.11 后出现 ConfigInvalidError，侧边栏无 sessions**  
   - 重要性：涉及配置读取与会话展示，影响用户对历史数据的访问。  
   - 社区反应：**3 个评论，仍为 Open**，而且描述中提到 Windows 非 git 目录场景，说明问题具有场景复杂性。  
   - 链接：https://github.com/anomalyco/opencode/issues/33938

7. **#33945 Desktop 中调用 ctx_execute(language: "javascript") 导致 Electron 进程崩溃**  
   - 重要性：这会直接打断桌面应用进程，属于工具调用链稳定性问题。  
   - 社区反应：**3 个评论，已关闭**，说明修复响应较快。  
   - 链接：https://github.com/anomalyco/opencode/issues/33945

8. **#33916 Desktop 窗口无法拖拽**  
   - 重要性：桌面窗口交互问题，虽非致命，但会显著影响可用性。  
   - 社区反应：**3 个评论，仍为 Open**，属于典型的 UI/窗口管理回归。  
   - 链接：https://github.com/anomalyco/opencode/issues/33916

9. **#33903 Windows 上重装/降级后仍持续出现 Effect.tryPromise 错误**  
   - 重要性：说明问题并非单次环境污染，可能存在更深层的兼容或网络/运行时问题。  
   - 社区反应：**2 个评论、1 个 👍**，虽然讨论量不大，但问题顽固。  
   - 链接：https://github.com/anomalyco/opencode/issues/33903

10. **#33909 移动项目目录会破坏旧 sessions**  
    - 重要性：会影响项目迁移、重命名后的会话恢复，属于数据绑定与路径稳定性问题。  
    - 社区反应：**2 个评论，仍为 Open**，说明这是一个真实的工作流痛点。  
    - 链接：https://github.com/anomalyco/opencode/issues/33909

## 4) 重要 PR 进展
> 以下挑选过去 24 小时内最重要的 10 个 PR。

1. **#33984 refactor(app): 用 Dropdown 重构 project selector**  
   - 价值：项目选择器改为更标准的下拉组件，通常意味着更稳定的交互和更好的可维护性。  
   - 链接：https://github.com/anomalyco/opencode/pull/33984

2. **#33979 fix(app): 稳定 titlebar tab 对齐**  
   - 价值：修复标题栏 tab 对齐抖动，属于视觉与交互一致性优化。  
   - 链接：https://github.com/anomalyco/opencode/pull/33979

3. **#33977 feat(core): 拆分 MCP timeout 配置**  
   - 价值：将超时拆为 startup / request 两类预算，更适合真实 MCP 服务治理。  
   - 链接：https://github.com/anomalyco/opencode/pull/33977

4. **#33974 fix(app): 在 session settings 中启用 auto-accept**  
   - 价值：增强会话级自动接受能力，减少重复确认成本。  
   - 链接：https://github.com/anomalyco/opencode/pull/33974

5. **#33967 fix(plan-mode): 禁止 bash，并限制 subagent 权限继承**  
   - 价值：补齐 plan mode 的权限边界，避免“规划模式”绕过限制。  
   - 链接：https://github.com/anomalyco/opencode/pull/33967

6. **#33960 fix(tui): TAB 切换共享模型时保留各 agent 的 variant**  
   - 价值：解决多 agent 共用模型时 variant 显示错误的问题，直接影响配置可读性。  
   - 链接：https://github.com/anomalyco/opencode/pull/33960

7. **#33956 fix(app): 在 drafts 上启用 composer shortcuts**  
   - 价值：让新会话草稿页也能使用 composer 快捷键，提升一致性与效率。  
   - 链接：https://github.com/anomalyco/opencode/pull/33956

8. **#33954 refactor(app): 拆分 session composer**  
   - 价值：重构会话 composer，降低耦合，利于后续扩展项目选择与输入区域。  
   - 链接：https://github.com/anomalyco/opencode/pull/33954

9. **#33946 fix(app): session 中使用 tab-scoped servers**  
   - 价值：让认证、文件选择、健康检查、提示词与项目选择都跟随当前 tab 的服务上下文，减少串线。  
   - 链接：https://github.com/anomalyco/opencode/pull/33946

10. **#33950 fix(acp): 在权限弹窗标题中显示真实 tool context**  
    - 价值：提升权限确认的可理解性，减少用户在“到底要授权什么”的困惑。  
    - 链接：https://github.com/anomalyco/opencode/pull/33950

## 5) 功能需求趋势
从今天的 Issues 看，社区关注点非常集中，主要有 5 条主线：

1. **桌面端 IDE 化体验**  
   - 典型诉求：plan/build 切换、查看 AI thoughts、重命名 session、快捷键一致性。  
   - 代表链接：  
     - https://github.com/anomalyco/opencode/issues/33902  
     - https://github.com/anomalyco/opencode/issues/33906  
     - https://github.com/anomalyco/opencode/issues/33932

2. **跨平台稳定性与升级回归**  
   - 典型诉求：Windows / WSL / Linux / Bun 崩溃、黑屏、panic、MaxListeners 溢出。  
   - 代表链接：  
     - https://github.com/anomalyco/opencode/issues/33890  
     - https://github.com/anomalyco/opencode/issues/33901  
     - https://github.com/anomalyco/opencode/issues/33887  
     - https://github.com/anomalyco/opencode/issues/33945

3. **会话可恢复、可回滚、可迁移**  
   - 典型诉求：session snapshots、undo 范围、项目目录移动后还能继续用历史会话。  
   - 代表链接：  
     - https://github.com/anomalyco/opencode/releases/tag/v1.17.11  
     - https://github.com/anomalyco/opencode/issues/33940  
     - https://github.com/anomalyco/opencode/issues/33909

4. **权限与模式控制更精细**  
   - 典型诉求：plan mode 限制、权限提示更清晰、auto-accept、MCP timeout 分层。  
   - 代表链接：  
     - https://github.com/anomalyco/opencode/pull/33967  
     - https://github.com/anomalyco/opencode/pull/33950  
     - https://github.com/anomalyco/opencode/pull/33977

5. **多 agent / 插件 / 配置扩展能力**  
   - 典型诉求：多 agent 并行、插件 skill 可发现、OAuth callback 可配置、provider 过滤规则。  
   - 代表链接：  
     - https://github.com/anomalyco/opencode/issues/33982  
     - https://github.com/anomalyco/opencode/issues/33966  
     - https://github.com/anomalyco/opencode/issues/33896  
     - https://github.com/anomalyco/opencode/pull/33972

## 6) 开发者关注点
综合今天的反馈，开发者最需要盯住的点有四个：

- **升级后的稳定性回归**：Windows / WSL / Linux 都有崩溃与黑屏案例，说明发布后验证和回滚预案很关键。  
  - https://github.com/anomalyco/opencode/issues/33901  
  - https://github.com/anomalyco/opencode/issues/33887  
  - https://github.com/anomalyco/opencode/issues/33890

- **数据与会话安全**：用户在意的是“升级后还能不能找回历史、能不能回退、路径改了会不会坏”。  
  - https://github.com/anomalyco/opencode/releases/tag/v1.17.11  
  - https://github.com/anomalyco/opencode/issues/33909  
  - https://github.com/anomalyco/opencode/issues/33940

- **桌面端交互要接近 CLI 的效率**：Tab 切 mode、快捷键、草稿页操作、会话管理都在向更高频工具体验演进。  
  - https://github.com/anomalyco/opencode/issues/33902  
  - https://github.com/anomalyco/opencode/issues/33906  
  - https://github.com/anomalyco/opencode/issues/33932  
  - https://github.com/anomalyco/opencode/pull/33956

- **配置与权限透明度**：OAuth、MCP timeout、权限弹窗、provider 筛选都在要求“更明确、更可控”。  
  - https://github.com/anomalyco/opencode/releases/tag/v1.17.11  
  - https://github.com/anomalyco/opencode/pull/33977  
  - https://github.com/anomalyco/opencode/pull/33950  
  - https://github.com/anomalyco/opencode/pull/33972

如果你希望，我可以把这份日报进一步整理成 **适合内部周报的管理层版本** 或 **适合技术团队晨会的极简版**。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-06-26

## 1) 今日速览
今天 Pi 社区的讨论重点仍然集中在**长会话稳定性、扩展生态兼容性、以及 TUI 交互体验**三条主线上。当天没有新 Release，但 Issue 和 PR 更新密集，且多条问题被快速关闭，显示出维护节奏较快、反馈闭环较成熟。  
**今日最值得关注的信号**是：官方正在持续补强 coding-agent 的 RPC/会话能力，同时也在推进主题、补全、编译产物和实验性 orchestrator 等基础设施能力。

---

## 2) 社区热点 Issues
> 说明：以下挑选的是今天最值得关注的 10 个 Issue，侧重影响面、讨论热度和对产品方向的指示性。

1. **[#6088](https://github.com/badlogic/pi-mono/issues/6088) fix(coding-agent): remove hardcoded RPC wait timeout**  
   重要性：长时间工具调用会被 60s 硬超时打断，直接影响 MCP/插件型工作流的稳定性。  
   社区反应：已关闭，说明问题定位清晰；属于“高影响、强可复现”的基础可靠性问题。

2. **[#6085](https://github.com/badlogic/pi-mono/issues/6085) 编译后的 binary 无法从子目录解析 npm 包**  
   重要性：这是扩展生态的核心兼容性问题，直接影响 Bun 编译版 Pi 的可用性。  
   社区反应：问题描述非常具体，指向范围比最初想象更广，说明扩展系统仍存在打包/解析边界问题。

3. **[#6065](https://github.com/badlogic/pi-mono/issues/6065) 单文件可执行 binary，避免依赖用户本机 Node 版本**  
   重要性：这是分发体验的关键需求，能显著降低安装和环境碎片化成本。  
   社区反应：有 3 条评论，说明这是开发者/重度用户比较集中的诉求。

4. **[#6075](https://github.com/badlogic/pi-mono/issues/6075) Pi 启动时间过慢**  
   重要性：启动速度直接影响日常使用频率和首次体验，是最典型的产品感知型性能问题。  
   社区反应：虽然只有 1 条评论，但属于“体感强、影响面广”的基础性能反馈。

5. **[#6061](https://github.com/badlogic/pi-mono/issues/6061) MiniMax-M2.7-highspeed 的 context budget 比预期更小**  
   重要性：模型上下文预算和实际可用 token 数不一致，会直接导致长对话失败，属于模型接入层关键问题。  
   社区反应：4 条评论，关注度相对最高之一，说明模型适配问题被反复触达。

6. **[#6079](https://github.com/badlogic/pi-mono/issues/6079) Anthropic oauth 出现 401**  
   重要性：认证失效会造成会话中断，且多会话并发时更容易暴露 token/stale auth 问题。  
   社区反应：描述指向“并发 + auth.json 更新”的状态一致性问题，属于典型生产级痛点。

7. **[#6072](https://github.com/badlogic/pi-mono/issues/6072) session 重渲染会把旧对话刷满终端 scrollback**  
   重要性：这会严重干扰终端阅读体验，尤其在压缩上下文、恢复会话等场景下。  
   社区反应：问题直接关联 TUI 渲染策略，属于交互层可见性很强的 bug。

8. **[#6071](https://github.com/badlogic/pi-mono/issues/6071) 滚动历史时输入框不能固定在底部**  
   重要性：这是典型的交互可用性问题，影响长对话阅读与继续输入的连续性。  
   社区反应：对终端全屏 TUI 的操作模型提出了明确改进诉求，说明重度用户对编辑区定位很敏感。

9. **[#6076](https://github.com/badlogic/pi-mono/issues/6076) 主题设置重启后回到 dark**  
   重要性：配置持久化问题虽然不如核心运行时严重，但会显著拉低“可定制化”体验。  
   社区反应：该问题同时影响内置主题和自定义主题，说明 settings 落盘/读取链路存在一致性缺口。

10. **[#6066](https://github.com/badlogic/pi-mono/issues/6066) /resume 后输入历史丢失，且与 setEditorComponent 扩展相关**  
    重要性：这是扩展 API 顺序和状态恢复的兼容性问题，直接影响扩展作者。  
    社区反应：问题与 `@sysid/pi-vim` 相关，说明“扩展改造编辑器”这一高级用法仍需更稳的生命周期保障。

---

## 3) 重要 PR 进展
> 说明：今天共更新 8 个 PR，以下全部列出。

1. **[#6087](https://github.com/badlogic/pi-mono/pull/6087) fix(coding-agent): remove hardcoded RPC wait timeout**  
   去掉 RPC 客户端 60s 硬等待上限，并增加 `waitTimeoutMs` 配置；对长任务/慢 MCP 特别关键。

2. **[#6084](https://github.com/badlogic/pi-mono/pull/6084) fix(tui): preserve custom widget render order on background tick refreshes**  
   修复后台 tick 刷新时自定义 widget 渲染顺序被打乱的问题，提升 TUI 稳定性和可预测性。

3. **[#6081](https://github.com/badlogic/pi-mono/pull/6081) feat: add #RRGGBBAA alpha support for theme colors**  
   主题颜色支持 8 位 hex，并在加载时完成 alpha 混合，补齐主题可配置能力。

4. **[#6078](https://github.com/badlogic/pi-mono/pull/6078) feat(coding-agent): add get_entries and get_tree RPC commands**  
   为 session manager 暴露只读 RPC 接口，增强外部工具对会话树/条目的可观察性。

5. **[#6074](https://github.com/badlogic/pi-mono/pull/6074) fix(coding-agent): avoid pre-prompt compaction continue**  
   修复预提示压缩后的 continue 流程问题，属于会话恢复链路的稳定性增强。

6. **[#6067](https://github.com/badlogic/pi-mono/pull/6067) fix(prompt): add an overeager scope-discipline rule to the system prompt**  
   在系统 prompt 中补一条范围约束规则，减少 agent 过度改动无关代码。

7. **[#6064](https://github.com/badlogic/pi-mono/pull/6064) feat(experimental): pi orchestrator**  
   新增实验性的 orchestrator package，通过本地 socket 管理多个 pi 实例，属于平台化方向的重要尝试。

8. **[#6063](https://github.com/badlogic/pi-mono/pull/6063) Extension stats**  
   为扩展统计能力提供支持，并顺带修复启动 benchmark 退出时的 OSC 垃圾输出问题。

---

## 4) 功能需求趋势
从今天的 Issues 看，社区最关注的方向主要有以下几类：

- **模型/Provider 兼容性与上下文管理**  
  包括 MiniMax 上下文预算、Anthropic OAuth、Azure/OpenAI Responses 异常、z.ai GLM cache 等，说明多模型接入仍是高频问题。  
  代表链接：[#6061](https://github.com/badlogic/pi-mono/issues/6061)、[#6079](https://github.com/badlogic/pi-mono/issues/6079)、[#6083](https://github.com/badlogic/pi-mono/issues/6083)

- **终端/TUI 交互体验优化**  
  如 scrollback 污染、输入框定位、tmux 下 viewport 跳动、shell autocompletion 等，反映重度终端用户对细节非常敏感。  
  代表链接：[#6072](https://github.com/badlogic/pi-mono/issues/6072)、[#6071](https://github.com/badlogic/pi-mono/issues/6071)、[#6073](https://github.com/badlogic/pi-mono/issues/6073)、[#6086](https://github.com/badlogic/pi-mono/issues/6086)

- **扩展系统与编译版兼容性**  
  包括单文件 binary、npm 解析、flag 透传、编辑器组件生命周期、扩展加载时间、RPC 新接口等，说明 Pi 正在从“单机客户端”走向“可扩展平台”。  
  代表链接：[#6065](https://github.com/badlogic/pi-mono/issues/6065)、[#6085](https://github.com/badlogic/pi-mono/issues/6085)、[#6069](https://github.com/badlogic/pi-mono/issues/6069)、[#6062](https://github.com/badlogic/pi-mono/issues/6062)

- **性能与状态稳定性**  
  启动速度、RPC 超时、session 重渲染、缓存命中、主题持久化等问题说明“快、稳、可恢复”仍是用户最关心的基础体验。  
  代表链接：[#6075](https://github.com/badlogic/pi-mono/issues/6075)、[#6088](https://github.com/badlogic/pi-mono/issues/6088)、[#6076](https://github.com/badlogic/pi-mono/issues/6076)

---

## 5) 开发者关注点
- **长任务不中断**：RPC 超时、工具链执行时长、上下文预算不足，是最直接的开发稳定性痛点。  
  参考：[#6088](https://github.com/badlogic/pi-mono/issues/6088)、[#6061](https://github.com/badlogic/pi-mono/issues/6061)

- **扩展作者需要更稳的 API 边界**：`setEditorComponent`、flag 透传、npm 解析、会话树 RPC 等都指向“扩展开发体验”仍在完善中。  
  参考：[#6066](https://github.com/badlogic/pi-mono/issues/6066)、[#6069](https://github.com/badlogic/pi-mono/issues/6069)、[#6085](https://github.com/badlogic/pi-mono/issues/6085)、[#6078](https://github.com/badlogic/pi-mono/pull/6078)

- **终端 UI 的细节直接影响可用性**：scrollback、tmux、输入框锚定、补全等，看似细节，实际是高频操作路径。  
  参考：[#6072](https://github.com/badlogic/pi-mono/issues/6072)、[#6071](https://github.com/badlogic/pi-mono/issues/6071)、[#6073](https://github.com/badlogic/pi-mono/issues/6073)、[#6086](https://github.com/badlogic/pi-mono/issues/6086)

- **配置与主题要“改了就生效、重启不丢”**：主题持久化、alpha 色彩、加载顺序等问题说明用户对可定制性越来越重视。  
  参考：[#6076](https://github.com/badlogic/pi-mono/issues/6076)、[#6082](https://github.com/badlogic/pi-mono/issues/6082)、[#6081](https://github.com/badlogic/pi-mono/pull/6081)

- **分发与启动成本仍是重点优化对象**：单文件 binary、启动速度、扩展加载耗时都在指向“更轻、更快、更少环境依赖”。  
  参考：[#6065](https://github.com/badlogic/pi-mono/issues/6065)、[#6075](https://github.com/badlogic/pi-mono/issues/6075)、[#6062](https://github.com/badlogic/pi-mono/issues/6062)

如需，我可以把这份日报再加工成 **更适合飞书/Notion 发布的精简版**，或者输出成 **Markdown 表格版**。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报｜2026-06-26

## 1. 今日速览
今天社区讨论明显集中在 **Windows Shell 资源泄漏/性能问题、上下文压缩超时、Web Shell 交互体验** 和 **daemon 会话可观测性** 上，说明产品正在从“可用”向“稳定、顺滑、可运维”阶段推进。  
虽然 **今日没有新 Release**，但 nightly 发布失败、自动修复任务找不到候选工单等信号表明，**交付链路与自动化治理** 仍是当前的重要关注点。

## 2. 社区热点 Issues
> 说明：本次数据中仅有 **8 条更新 Issue**，以下为全部 8 条中最值得关注的条目。

1. **[#5873](https://github.com/QwenLM/qwen-code/issues/5873)｜Windows PowerShell 句柄泄漏导致 OOM**
   - 这是今天最严重的 P1 Bug：用户反馈“每次用工具就新开一个 powershell 且不关闭”，在 Windows 上可稳定复现并最终 OOM。
   - **社区反应**：4 条评论，且带有 `ready-for-agent`，说明问题足够明确、急需快速修复。

2. **[#5867](https://github.com/QwenLM/qwen-code/issues/5867)｜Auto-memory 增加 git-shared “team” 层**
   - 这是一个偏架构/协作向的功能提案，涉及从“个人私有记忆”扩展到“团队共享记忆”。
   - **社区反应**：3 条评论，说明这个方向有讨论热度，同时也触及安全边界与数据隔离问题。

3. **[#5866](https://github.com/QwenLM/qwen-code/issues/5866)｜Web Shell 流式代码块实时语法高亮**
   - 直接改善 Web Shell 中 assistant Markdown 代码块的流式渲染体验，还顺带修复 fence language alias。
   - **社区反应**：2 条评论，属于典型的高感知 UX 改进，且带 `welcome-pr`，适合社区贡献。

4. **[#5863](https://github.com/QwenLM/qwen-code/issues/5863)｜`GET /session/:id/status` 增强会话状态**
   - 目标是让 daemon 对单个 session 的状态返回更丰富的信息，如 turn phase、active tools、pending permissions。
   - **社区反应**：2 条评论，说明有明确的集成需求，尤其适合做调试面板和运维观察。

5. **[#5861](https://github.com/QwenLM/qwen-code/issues/5861)｜上下文压缩请求应使用 `stream=true` 避免网关超时**
   - 这是一个已经关闭的问题，但非常关键：说明此前的压缩请求在模型推理未完成时就可能超时。
   - **社区反应**：2 条评论；问题已通过后续修复路径闭环，属于“已定位并推进修复”的典型案例。

6. **[#5855](https://github.com/QwenLM/qwen-code/issues/5855)｜按 ID 查询单个 session 状态**
   - 这是 daemon/session 管理能力的基础补强，和 #5863 形成上下文链路。
   - **社区反应**：2 条评论，且已关闭，说明该方向已有落地进展。

7. **[#5877](https://github.com/QwenLM/qwen-code/issues/5877)｜v0.19.2-nightly.20260626 发布失败**
   - 这是发布链路的健康信号，虽然是 bot 自动报错，但会直接影响 nightly 分发节奏。
   - **社区反应**：1 条评论；看似轻量，但对交付稳定性影响很大。

8. **[#5875](https://github.com/QwenLM/qwen-code/issues/5875)｜`/skill` 命令自动补全匹配能力不足**
   - 属于交互层面的“可发现性”问题：当前需要前缀精确匹配，用户希望支持任意子串匹配。
   - **社区反应**：1 条评论，需求不复杂，但对实际使用体验提升直接。

## 3. 重要 PR 进展
1. **[#5874](https://github.com/QwenLM/qwen-code/pull/5874)｜优化 `qwen serve` 启动路径，去掉 `spawnSync` 包装**
   - 通过在进程内直接加载 CLI，减少一次 Node 子进程启动，缩短 daemon 启动时间。
   - 这是非常典型的性能优化，收益直接体现在启动延迟上。

2. **[#5869](https://github.com/QwenLM/qwen-code/pull/5869)｜Web Shell 流式代码块高亮 + fence alias 修复**
   - 解决流式代码块在渲染过程中反复闪烁的问题，让高亮更平滑、更接近最终态。
   - 对 Web Shell 的可读性和观感提升明显。

3. **[#5868](https://github.com/QwenLM/qwen-code/pull/5868)｜可配置 auto-compact 阈值 + Stop hook 上下文使用**
   - 让上下文自动压缩更可控，并增强 Stop hook 的上下文利用。
   - 对长对话、长任务场景很重要，属于核心对话管理能力增强。

4. **[#5865](https://github.com/QwenLM/qwen-code/pull/5865)｜让上下文压缩 side-query 支持流式传输**
   - 直接对应 #5861 的超时问题，核心是让压缩摘要请求在模型思考期间保持连接不断开。
   - 这是稳定性修复的关键 PR。

5. **[#5860](https://github.com/QwenLM/qwen-code/pull/5860)｜放宽 autofix 候选 Issue 筛选**
   - 解决“自动修复流程总是找不到工单”的问题，让 scheduled autofix 真正开始做事。
   - 对自动化治理和社区问题吞吐量都有帮助。

6. **[#5856](https://github.com/QwenLM/qwen-code/pull/5856)｜Desktop App 增加语音输入（voice dictation）**
   - 将 `/voice` 能力扩展到桌面端，补齐 CLI/Web Shell 之外的多端一致性。
   - 这是功能面很直观的增强，适合扩大用户场景。

7. **[#5870](https://github.com/QwenLM/qwen-code/pull/5870)｜`@qwen-code /resolve` 支持 fork PR，并收敛为只做冲突解决**
   - 让维护者工具链更适配社区 fork 提交，同时减少 `/resolve` 的职责范围。
   - 对开源协作流程很友好，属于维护体验优化。

8. **[#5862](https://github.com/QwenLM/qwen-code/pull/5862)｜`/resolve` 任务改为 hosted runner**
   - 将冲突修复作业迁移到 `ubuntu-latest`，减少对自建 runner 的依赖。
   - 有利于降低基础设施耦合和排队风险。

9. **[#5859](https://github.com/QwenLM/qwen-code/pull/5859)｜将 CodeQL 和 E2E 从每次 push 路径移除**
   - 减少主分支每次合并后的重型 CI 压力，缓解 runner 饱和。
   - 这是纯粹的 CI 资源优化，对整体交付效率影响较大。

10. **[#5854](https://github.com/QwenLM/qwen-code/pull/5854)｜Merge Queue 的 Linux 作业切到 ECS runner**
    - 让 merge queue 的 Linux job 走自建 ECS 池，减少对 GitHub-hosted 的依赖。
    - 对排队时延、成本控制和稳定性都很关键。

## 4. 功能需求趋势
从今天的 Issues 看，社区最关注的方向主要有：

- **性能与稳定性**
  - Windows PowerShell 进程泄漏、上下文压缩超时、serve 启动优化，说明大家对“跑得稳、跑得快”非常敏感。
  - 相关链接：[#5873](https://github.com/QwenLM/qwen-code/issues/5873)、[#5861](https://github.com/QwenLM/qwen-code/issues/5861)、[#5874](https://github.com/QwenLM/qwen-code/pull/5874)

- **Web Shell 交互体验**
  - 包括流式代码块高亮、thinking 状态展示、Markdown 渲染细节等，说明前端可读性仍在持续打磨。
  - 相关链接：[#5866](https://github.com/QwenLM/qwen-code/issues/5866)、[#5869](https://github.com/QwenLM/qwen-code/pull/5869)

- **会话状态可观测性**
  - `/session/:id/status`、active tools、pending permissions、session resume 等需求，体现出用户希望更清楚地观察 agent 正在做什么。
  - 相关链接：[#5863](https://github.com/QwenLM/qwen-code/issues/5863)、[#5855](https://github.com/QwenLM/qwen-code/issues/5855)、[#5852](https://github.com/QwenLM/qwen-code/pull/5852)

- **知识/记忆协作能力**
  - team 级 auto-memory 是一个很明确的方向：从个人记忆走向团队共享，但同时也带来权限与隔离问题。
  - 相关链接：[#5867](https://github.com/QwenLM/qwen-code/issues/5867)

- **命令可发现性与输入效率**
  - `/skill` 自动补全匹配不足，反映出交互命令体系仍有优化空间。
  - 相关链接：[#5875](https://github.com/QwenLM/qwen-code/issues/5875)

- **发布与自动化治理**
  - nightly 发布失败、autofix 找不到工单，说明 CI/CD 与自动化任务的健康度仍需持续关注。
  - 相关链接：[#5877](https://github.com/QwenLM/qwen-code/issues/5877)、[#5860](https://github.com/QwenLM/qwen-code/pull/5860)

## 5. 开发者关注点
- **Windows 平台兼容性与资源回收**：PowerShell 进程不关闭导致 OOM，是当前最尖锐的工程痛点。  
  链接：[#5873](https://github.com/QwenLM/qwen-code/issues/5873)

- **长上下文与摘要链路的可靠性**：压缩请求超时说明模型侧长流程需要更稳的流式处理。  
  链接：[#5861](https://github.com/QwenLM/qwen-code/issues/5861)、[#5865](https://github.com/QwenLM/qwen-code/pull/5865)

- **会话级调试/运维能力**：开发者希望更细粒度地看到 session 当前阶段、工具调用和权限等待状态。  
  链接：[#5863](https://github.com/QwenLM/qwen-code/issues/5863)、[#5855](https://github.com/QwenLM/qwen-code/issues/5855)

- **Web Shell 的即时反馈体验**：流式代码高亮、thinking 摘要、Markdown 呈现都在持续打磨。  
  链接：[#5866](https://github.com/QwenLM/qwen-code/issues/5866)、[#5869](https://github.com/QwenLM/qwen-code/pull/5869)、[#5864](https://github.com/QwenLM/qwen-code/pull/5864)

- **自动化与 CI 资源效率**：runner 路由、CodeQL/E2E 拆分、autofix 候选筛选，说明维护侧在强力治理基础设施成本。  
  链接：[#5859](https://github.com/QwenLM/qwen-code/pull/5859)、[#5854](https://github.com/QwenLM/qwen-code/pull/5854)、[#5860](https://github.com/QwenLM/qwen-code/pull/5860)

如果你愿意，我也可以把这份日报进一步整理成 **“适合发到飞书/企业微信的简版”** 或 **“管理层摘要版”**。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# 2026-06-26 DeepSeek TUI 社区动态日报

## 1) 今日速览
今天的社区动态主要由 **v0.8.65 的重命名/迁移公告** 和一批围绕 **自动审批、Hotbar 安全、诊断可观测性** 的修复/重构 PR 组成。  
Issue 层面集中暴露了三类问题：**YOLO/AUTO 自动化链路失效、安装脚本不可用、Windows 环境变量继承异常**，说明用户最关注的是“能装、能跑、能自动化”。  
PR 层面则显示项目正在从功能扩展转向 **流程治理、稳定性和可观测性** 的系统补强。

---

## 2) 版本发布
- **v0.8.65**：本次发布的核心是 **品牌与包名切换**。`CodeWhale` 已成为 canonical project / command / npm package / release asset，旧的 `deepseek-tui` npm 包已弃用，不再继续发布。  
  **迁移建议**：从 v0.8.x 的 `deepseek` / `deepseek-tui` 命名迁移到 `CodeWhale`，按仓库中的 `docs/REBRAND.md` 执行。  
  链接：<https://github.com/Hmbown/DeepSeek-TUI/releases/tag/v0.8.65>

---

## 3) 社区热点 Issues
> 说明：过去 24 小时**仅更新 3 条 Issue**，以下为全部活跃 Issue。三条均已关闭，评论数都很少（各 1 条、👍 为 0），说明社区反馈虽然不多，但问题指向非常明确。

1. **#3606 Agent 在 YOLO 模式下仍要求确认**  
   影响自动执行链路的可靠性：`approval_mode AUTO` 下仍弹确认，会直接破坏“无人值守”体验。已关闭，社区反馈聚焦在升级后行为回归。  
   链接：<https://github.com/Hmbown/CodeWhale/issues/3606>

2. **#3582 install.sh 端点返回 HTML 而不是 shell 脚本**  
   这是典型的“安装入口失效”问题，会直接阻断新用户安装，属于高优先级可用性故障。虽然反响不大，但对首次接触项目的影响很大。  
   链接：<https://github.com/Hmbown/CodeWhale/issues/3582>

3. **#3572 Windows 用户级环境变量未被 codewhale shell 继承**  
   影响 `exec_shell` 等工具调用在 Windows 下的构建/运行环境，属于跨平台兼容性关键问题。已关闭，表明维护者已着手修复。  
   链接：<https://github.com/Hmbown/CodeWhale/issues/3572>

---

## 4) 重要 PR 进展
> 下面选取今日最值得关注的 10 个 PR，覆盖审批链路、Hotbar 安全、诊断、资源可观测性和测试/文档治理。

1. **#3619 `fix(tui): show proposed file changes in approvals`**  
   在审批卡片里展示 `write_file` / `edit_file` / `apply_patch` 的拟议变更预览，减少用户审批成本，提升可审查性。  
   链接：<https://github.com/Hmbown/CodeWhale/pull/3619>

2. **#3618 `fix(tui): reuse live auto approval for follow-up paths`**  
   把后续路径也接入 live auto-approval，避免 YOLO 与显式 `ApprovalMode::Auto` 行为不一致，是自动化稳定性的关键补丁。  
   链接：<https://github.com/Hmbown/CodeWhale/pull/3618>

3. **#3616 `fix(tui): surface resource usage in turn metadata`**  
   给每轮对话补充上下文压力、token 总量、cache 总量和资源占用信息，提升模型侧和用户侧的资源可见性。  
   链接：<https://github.com/Hmbown/CodeWhale/pull/3616>

4. **#3615 `fix(tui): harden session diagnostics classifier`**  
   强化会话诊断分类器，避免把真实工具句柄误替换掉，也减少空 `error/stderr` 对分类结果的干扰。  
   链接：<https://github.com/Hmbown/CodeWhale/pull/3615>

5. **#3613 `fix(tui): honor auto approval mode in dispatch`**  
   让 dispatch 阶段真正尊重 `approval_mode AUTO`，并统一 bang-shell 命令的自动审批逻辑，直接修复 #3606 这类回归。  
   链接：<https://github.com/Hmbown/CodeWhale/pull/3613>

6. **#3612 `fix(tui): gate unsafe hotbar dispatch paths`**  
   为 Hotbar 分发路径加安全门，阻止未完成安全接线的 MCP/skill/plugin 动作直接注册或执行，属于风险控制型修复。  
   链接：<https://github.com/Hmbown/CodeWhale/pull/3612>

7. **#3610 `feat(tui): add redacted session failure diagnostics`**  
   新增隐私优先的会话失败诊断能力，提供 `codewhale session-diagnostics <path>` 与 `--json` 输出，便于用户提交更高质量 bug。  
   链接：<https://github.com/Hmbown/CodeWhale/pull/3610>

8. **#3617 `test(tui): add token cache report fixtures`**  
   补充 cache 统计相关 fixture，针对高 token / cache 问题建立回归样本，说明团队正在加强性能与配额可观测性验证。  
   链接：<https://github.com/Hmbown/CodeWhale/pull/3617>

9. **#3609 `docs(tui): add prompt mode audit matrix`**  
   记录 Agent / Plan / YOLO 的提示词尺寸和执行锚点，配合测试防止 prompt 体积膨胀和模式覆盖错位。  
   链接：<https://github.com/Hmbown/CodeWhale/pull/3609>

10. **#3608 `refactor(tui): route hotbar actions through source adapters`**  
    将 Hotbar 动作源抽象成适配层，统一 app / slash / MCP / skill / plugin 的入口路径，为后续扩展和治理打基础。  
    链接：<https://github.com/Hmbown/CodeWhale/pull/3608>

---

## 5) 功能需求趋势
结合今日 Issues 与 PR 方向，社区最关注的功能趋势主要有 4 类：

1. **自动审批 / YOLO 稳定性**  
   用户希望在 `AUTO`、YOLO、bang-shell 等场景下保持一致、无确认打断的自动执行体验。  
   代表链接：<https://github.com/Hmbown/CodeWhale/issues/3606> / <https://github.com/Hmbown/CodeWhale/pull/3613>

2. **安装与迁移可用性**  
   安装脚本可用性、旧包名迁移、发布入口一致性，都是新用户能否顺利上手的关键。  
   代表链接：<https://github.com/Hmbown/CodeWhale/issues/3582> / <https://github.com/Hmbown/DeepSeek-TUI/releases/tag/v0.8.65>

3. **跨平台兼容性，尤其是 Windows**  
   Windows 用户环境变量继承问题说明主流桌面环境仍有适配压力，`exec_shell` 可靠性是重点。  
   代表链接：<https://github.com/Hmbown/CodeWhale/issues/3572>

4. **可观测性与诊断能力**  
   资源使用、token/cache、会话失败分类等能力持续增强，说明用户对“定位问题”的需求在快速上升。  
   代表链接：<https://github.com/Hmbown/CodeWhale/pull/3616> / <https://github.com/Hmbown/CodeWhale/pull/3610> / <https://github.com/Hmbown/CodeWhale/pull/3617>

---

## 6) 开发者关注点
从今日反馈看，开发者最需要重点关注的痛点是：

- **自动化链路一致性**：`AUTO`、YOLO、dispatch、follow-up path 之间的策略必须统一，否则会直接破坏“无交互执行”体验。  
  链接：<https://github.com/Hmbown/CodeWhale/issues/3606> / <https://github.com/Hmbown/CodeWhale/pull/3618>

- **安装与迁移门槛**：发布页、安装脚本、包名重命名必须保持清晰，否则新用户和升级用户都容易卡住。  
  链接：<https://github.com/Hmbown/CodeWhale/issues/3582> / <https://github.com/Hmbown/DeepSeek-TUI/releases/tag/v0.8.65>

- **平台兼容性**：Windows shell 环境、环境变量继承、子进程执行语义仍是实际使用中的高频问题。  
  链接：<https://github.com/Hmbown/CodeWhale/issues/3572>

- **诊断与可见性**：维护者正在补齐诊断分类、资源使用、token/cache 报告，说明“可定位、可解释”成为高优先级需求。  
  链接：<https://github.com/Hmbown/CodeWhale/pull/3615> / <https://github.com/Hmbown/CodeWhale/pull/3616> / <https://github.com/Hmbown/CodeWhale/pull/3610>

- **Hotbar 安全与配置治理**：Hotbar 相关 PR 密集，反映出用户对快捷入口、持久化、推荐机制和安全边界都有较强需求。  
  链接：<https://github.com/Hmbown/CodeWhale/pull/3612> / <https://github.com/Hmbown/CodeWhale/pull/3608>

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **更适合公众号/社区公告的简版**，或  
2. **适合内部研发周报的分析版**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*