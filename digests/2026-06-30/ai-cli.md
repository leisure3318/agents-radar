# AI CLI 工具社区动态日报 2026-06-30

> 生成时间: 2026-06-30 01:34 UTC | 覆盖工具: 9 个

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

以下是基于你提供的 9 个 AI CLI 项目日报，整理出的**横向对比分析报告**。

---

# AI CLI 工具生态横向对比分析报告（2026-06-30）

## 1) 生态全景

过去 24 小时，AI CLI 工具生态明显进入了从“功能扩张”向“工程收敛”过渡的阶段：大家不再只比模型能力，而是集中解决**安全边界、会话连续性、性能稳定性、跨平台一致性**等生产级问题。  
从社区动态看，Claude Code、Codex、Qwen Code、DeepSeek TUI、OpenCode 这类项目都在高频修补核心链路，说明 CLI 正从“聊天入口”演进为“长期运行的 agent 工作台”。  
同时，插件、MCP、daemon、subagent、多模型切换等能力被密集强化，表明生态竞争正在从单点能力转向**可编排、可运维、可治理**。  
总体判断：**AI CLI 已进入“深度可用但仍高压迭代”的阶段**，产品差异正在从模型参数转向工程化体验。

---

## 2) 各工具活跃度对比

> 说明：下表按日报中**今日入选热点 Issues / PR / Release** 统计，便于横向比较。

| 工具 | 今日 Issues | 今日 PR | Release 情况 | 活跃度简评 |
|---|---:|---:|---|---|
| Claude Code | 10 | 3 | 1 个正式版（v2.1.196） | 安全、性能、会话管理问题集中，社区反馈活跃 |
| OpenAI Codex | 10 | 10 | 2 个版本（1 正式维护 + 1 alpha） | 迭代强度最高之一，桌面/远程/权限链路并行修补 |
| Gemini CLI | 10 | 5 | 无 Release | 偏稳定性与兼容性修复，Issue 噪声较高 |
| GitHub Copilot CLI | 2 | 0 | 1 个版本（v1.0.66-2） | 社区问题少，关注点集中在认证与 UI 稳定性 |
| Kimi Code CLI | 1 | 0 | 无 Release | 典型的早期可用性打磨阶段 |
| OpenCode | 10 | 10 | 无 Release | 处于高频修复与架构收敛期，V2/MCP 相关推进明显 |
| Pi | 10 | 4 | 无 Release | 聚焦 agent 稳定性、上下文与 provider 兼容 |
| Qwen Code | 10 | 10 | 1 个 nightly 版本 | nightly 节奏快，daemon/subagent/模型治理并进 |
| DeepSeek TUI | 10 | 10 | 无 Release | release-blocker 密集，TUI 与并发性能修复力度大 |

**合计（基于日报入选项）**：73 个热点 Issues、52 个 PR、5 次 Release。

---

## 3) 共同关注的功能方向

### 3.1 安全边界与误拦截
这是跨项目最一致的主题之一，且普遍从“防护不足”转向“防护过严/误伤”。
- **Claude Code**：`cyber safety false positive`、合法工作流被 `session-halted`
- **Codex**：fake shell 边界、sandbox mode、tool call 幻觉、权限继承问题
- **Gemini CLI**：写入边界收紧、workspace 边界校验
- **Qwen Code**：subagent 输出净化，避免内部标签泄漏
- **DeepSeek TUI**：mode 作为唯一权威，避免权限抽象层误导
- **OpenCode**：`disable-model-invocation`、会话/技能边界控制

**共同诉求**：安全要“准”，而不是只“严”；要支持解释、申诉和可预测行为。

---

### 3.2 会话连续性与状态恢复
很多项目都在解决“能不能不断、断了能不能续”的问题。
- **Claude Code**：transcript 持久化丢失、sandbox OOM、状态损坏
- **Codex**：remote compact 失败、multi-session send 卡死、重连失败
- **OpenCode**：session 恢复、随机停响应、profile reset 后会话丢入口
- **Pi**：重复工具调用循环、compaction 语义与去重
- **Qwen Code**：subagent 输出污染父上下文、transcript 滚动与压缩模型配置
- **DeepSeek TUI**：高 fanout 冻结、事件回压、锁竞争

**共同诉求**：CLI 正在被当作“长期工作环境”，而不是一次性对话工具。

---

### 3.3 模型治理、配额与成本透明
用户越来越关心：我现在到底在用什么模型、消耗多少、为什么被限流。
- **Claude Code**：组织默认模型、Opus 限流可见性
- **Codex**：后台 Chronicle 消耗计划额度、远程延迟与配额感知
- **OpenCode**：订阅状态与额度提示不一致、token 异常消耗
- **Qwen Code**：`/model` 单次覆盖、compaction 模型、认证切换
- **Pi**：上下文窗口、provider 配置、模型选择多样化

**共同诉求**：模型选择和成本控制必须可见、可配置、可审计。

---

### 3.4 扩展生态、MCP、Daemon/Agent 编排
项目普遍在强化“外部集成”和“可编排能力”。
- **Claude Code**：`--plugin-dir` 优先级、hooks 文档补齐、Gateway/GCP 示例
- **Codex**：MCP notifications、app-server、shell approval、WebSocket 预热
- **Gemini CLI**：extension manager、settings 结构兼容、OAuth 认证
- **Qwen Code**：daemon 热更新、MCP prompts、MCP 日志、browser MCP
- **OpenCode**：MCP prompts、server log、stdio 清理
- **Pi**：多 provider 接入、Bedrock bearer token 映射、扩展工具刷新

**共同诉求**：扩展系统必须“可预测、可诊断、可回滚”。

---

### 3.5 跨平台与桌面/TUI 一致性
这类问题几乎每个项目都在碰。
- **Claude Code**：macOS / Windows / IDE / TUI 回归
- **Codex**：Windows 认证、macOS crash、桌面输入锁死
- **Gemini CLI**：认证误判与配置文件兼容
- **Kimi Code CLI**：移动端 Enter 行为、桌面换行体验
- **OpenCode**：Desktop 主进程、设置页、会话可见性
- **DeepSeek TUI**：短终端布局、审批弹窗、Hotbar 默认展示

**共同诉求**：不同终端/桌面环境下的行为必须保持一致，且交互要更像现代 IDE/编辑器，而不是传统命令行。

---

## 4) 差异化定位分析

### Claude Code
- **功能侧重**：安全治理、会话管理、插件/组织模型
- **目标用户**：高级开发者、组织级用户、长期 agent 使用者
- **技术路线**：强调组织默认模型、会话命名、sandbox 安全、hooks/插件扩展
- **特点**：更像“企业可治理的 agent 工作台”

### OpenAI Codex
- **功能侧重**：桌面端、远程会话连续性、权限边界、可观测性
- **目标用户**：多设备工作流用户、桌面重度用户
- **技术路线**：围绕 remote compact、reconnect、WebSocket、MCP、安全边界做工程化强化
- **特点**：更像“跨端可靠运行的生产级 Codex 平台”

### Gemini CLI
- **功能侧重**：配置兼容、扩展生态、文件/路径语义、安全加固
- **目标用户**：偏标准化配置和扩展需求的开发者
- **技术路线**：稳态修复优先，强调 settings、glob、extension manager 的正确性
- **特点**：更像“在收紧边界的成熟 CLI”

### GitHub Copilot CLI
- **功能侧重**：插件共存、LSP 可观测性、GitHub 场景引导
- **目标用户**：GitHub 生态内开发者
- **技术路线**：以集成体验和排障能力为主
- **特点**：公开社区热度较低，但版本节奏稳定，偏产品化落地

### Kimi Code CLI
- **功能侧重**：输入交互、移动端/桌面端体验一致性
- **目标用户**：轻量使用者、移动场景用户
- **技术路线**：先补齐基础交互，再谈扩展能力
- **特点**：仍处于早期可用性打磨阶段

### OpenCode
- **功能侧重**：桌面稳定性、V2/MCP、状态恢复、订阅/额度
- **目标用户**：桌面工作流重度用户、模型编排用户
- **技术路线**：积极重构核心架构，快速补工程能力
- **特点**：更像“高迭代速度的桌面 agent 平台”

### Pi
- **功能侧重**：agent 运行时、上下文/compaction、多 provider 兼容
- **目标用户**：长上下文、多模型、企业/自定义 provider 用户
- **技术路线**：重视上下文工程、provider 适配、运行时一致性
- **特点**：偏“模型中台/可编排 agent”方向

### Qwen Code
- **功能侧重**：daemon、subagent、安全净化、模型切换、MCP/ACP 集成
- **目标用户**：远程自动化、长驻服务、编排型开发者
- **技术路线**：nightly 快速迭代，强调子代理与服务化能力
- **特点**：明显向“可运维的 agent 服务”靠拢

### DeepSeek TUI
- **功能侧重**：TUI 交互、并发性能、权限模型、首登/引导重构
- **目标用户**：终端重度用户、追求高效交互的开发者
- **技术路线**：强 TUI、强并发修复、逐步产品化入口
- **特点**：在“能稳定跑”基础上，开始重塑产品体验与 onboarding

---

## 5) 社区热度与成熟度

### 社区热度更高的项目
从 issue 评论数、PR 密度、问题复杂度看，**Claude Code、Codex、Qwen Code、DeepSeek TUI、OpenCode** 社区最活跃。
- **Claude Code**：评论数高，问题集中且影响面大，典型成熟产品的高压反馈状态
- **Codex**：PR 和 issue 都很密集，且横跨桌面、远程、权限、MCP
- **Qwen Code**：nightly 快速迭代，subagent/daemon 讨论活跃
- **DeepSeek TUI**：release-blocker 多，修复节奏快
- **OpenCode**：工程重构明显，社区反馈与 PR 形成闭环

### 中等活跃、偏稳态修复的项目
- **Gemini CLI**：issue 多，但讨论相对弱，偏 bug 修复和边界收敛
- **Pi**：问题专业度高，更多围绕 runtime/provider/compaction，属于深度用户驱动

### 低热度但不一定低成熟度的项目
- **Copilot CLI**：公开 issue 少、评论少，更像产品化工具，社区表面热度较低
- **Kimi Code CLI**：当前更像早期体验打磨阶段，社区规模尚小

### 成熟度判断
- **工程成熟度高但仍高压迭代**：Claude Code、Codex
- **快速进入生产化阶段**：Qwen Code、OpenCode、DeepSeek TUI
- **稳态打磨型**：Gemini CLI、Pi
- **产品化较强、公开社区较轻**：Copilot CLI
- **早期 UX 校准阶段**：Kimi Code CLI

---

## 6) 值得关注的趋势信号

### 6.1 AI CLI 正从“对话工具”变成“工作操作系统”
多项目都在补：
- 会话持续化
- 状态恢复
- 多 agent 编排
- 远程/daemon 化
- 权限治理

**参考价值**：CLI 不再只是模型入口，而是 agent 的运行容器。

---

### 6.2 安全策略进入“精细化治理”阶段
过去是“防止危险操作”，现在更像是“避免误伤合法工作流”。
- Claude 的误拦截
- Codex 的审批边界
- Gemini 的写权限收紧
- DeepSeek 的模式权威
- Qwen 的输出净化

**参考价值**：未来竞争点之一是“安全准确率”，而不是单纯更严格。

---

### 6.3 长会话、压缩、上下文管理正在成为核心能力
Pi、Codex、Qwen、OpenCode 都在围绕 compaction、context window、thread continuity 做优化。

**参考价值**：谁能更稳定地支持长任务，谁就更适合真实开发场景。

---

### 6.4 成本透明度与配额治理会成为高频痛点
OpenCode 的订阅/额度不一致、Claude 的组织默认模型、Codex 的后台额度消耗，都说明用户越来越在意“看得见的成本”。

**参考价值**：未来产品竞争不只是能力，而是**成本可解释性**。

---

### 6.5 扩展生态的“工程可控性”正在抬升
MCP、hooks、plugin-dir、daemon、subagent、browser tools、LSP logs 都在强化同一件事：**生态可以扩，但必须可控**。

**参考价值**：开发者会优先选择“好排障、好隔离、好回滚”的平台。

---

### 6.6 桌面/TUI 体验仍是分水岭
终端输出、输入锁死、布局裁切、鼠标行为、快捷键冲突，这些看似细碎的问题，实际上直接决定产品口碑。

**参考价值**：AI CLI 的竞争，最后会落到“日常使用是否顺手”。

---

如果你需要，我可以继续把这份报告压缩成：
1. **管理层 1 页简报版**  
2. **开发团队跟进表版**  
3. **按“安全 / 性能 / 交互 / 生态”分类的对比矩阵版**

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止：2026-06-30）

> 说明：你提供的 PR 列表未显示完整评论数，我以下按“讨论影响面、问题重复出现频率、对核心工具链的影响”综合排序。

---

## 1) 热门 Skills 排行（PR）

### 1. [#1298](https://github.com/anthropics/skills/pull/1298) — `fix(skill-creator): run_eval.py always reports 0% recall`
- **功能**：修复 `run_eval.py` 将所有 Skill 评估为 `recall=0%` 的核心问题，并改进 Windows 流读取、触发检测、并行 worker。
- **社区热点**：这是 Skill 生成/优化闭环的“底层评测基座”问题，直接影响 `run_loop.py` / `improve_description.py` 的有效性。
- **状态**：**OPEN**

### 2. [#1323](https://github.com/anthropics/skills/pull/1323) — `run_eval trigger detection misses real skill name`
- **功能**：修复 `run_eval` 无法识别真实 Skill 触发、遇到首个非 Skill tool 就提前退出的问题。
- **社区热点**：社区关注点集中在“为什么明明应该触发却始终不触发”，属于优化循环失真问题。
- **状态**：**OPEN**

### 3. [#1099](https://github.com/anthropics/skills/pull/1099) — `run_eval.py crash on Windows when reading from subprocess pipe`
- **功能**：修复 Windows 下 `run_eval.py` 通过 subprocess pipe 读取崩溃的问题。
- **社区热点**：Windows 用户反馈集中，说明 Skills 生态对跨平台可用性诉求很强。
- **状态**：**OPEN**

### 4. [#1050](https://github.com/anthropics/skills/pull/1050) — `Windows subprocess + encoding bugs`
- **功能**：修复 `claude.cmd` 解析、`PATHEXT`、编码等 Windows 兼容问题。
- **社区热点**：与 #1099 同属“Windows 不能用/不稳定”系列，说明不是个别 bug，而是平台假设问题。
- **状态**：**OPEN**

### 5. [#361](https://github.com/anthropics/skills/pull/361) — `Detect unquoted YAML special characters in description fields`
- **功能**：在 YAML 前置解析前，检测未加引号的 `description/compatibility` 特殊字符，避免静默误解析。
- **社区热点**：这是“技能定义文件易错、难排查”的典型痛点，很多 Skill 失效并非逻辑错，而是元数据错。
- **状态**：**OPEN**

### 6. [#362](https://github.com/anthropics/skills/pull/362) — `Fix skill-creator UTF-8 panic on multi-byte characters`
- **功能**：修复多字节字符导致的长度校验/截断问题，避免 Rust panic。
- **社区热点**：反映出全球化输入、中文/日文内容、emoji 等多语言场景的兼容需求。
- **状态**：**OPEN**

### 7. [#539](https://github.com/anthropics/skills/pull/539) — `warn on unquoted description with YAML special characters`
- **功能**：进一步增强 `quick_validate.py` 对未加引号 description 的预警。
- **社区热点**：与 #361 同类，说明社区对“前置校验”和“失败前提示”的需求非常强。
- **状态**：**OPEN**

### 8. [#514](https://github.com/anthropics/skills/pull/514) — `Add document-typography skill`
- **功能**：新增文档排版质量控制 Skill，处理孤行、寡行、编号对齐等问题。
- **社区热点**：这是非常典型的“高频办公痛点”方向，说明用户希望 Claude 生成的文档不仅能写，还要“像样”。
- **状态**：**OPEN**

---

## 2) 社区需求趋势（从 Issues 提炼）

### A. 安全与信任边界
- **核心诉求**：社区非常在意“社区 Skill 冒充官方 Skill”“命名空间边界”“权限可信度”。
- **代表 Issue**：
  - [#492](https://github.com/anthropics/skills/issues/492) — Community skills under `anthropic/` namespace enable trust boundary abuse
- **趋势判断**：Skills 正从“功能集合”走向“可分发软件”，安全治理需求开始上升。

### B. Skill 分享、分发与组织协作
- **核心诉求**：希望支持组织内共享、直接分发、统一安装，不再靠手动下载上传。
- **代表 Issue**：
  - [#228](https://github.com/anthropics/skills/issues/228) — Enable org-wide skill sharing in Claude.ai
- **趋势判断**：企业用户更看重“共享能力”而不是单机安装。

### C. 评测/触发/优化链路可靠性
- **核心诉求**：`run_eval.py`、`run_loop.py`、`improve_description.py` 的触发判定和 recall 统计不可信。
- **代表 Issue**：
  - [#556](https://github.com/anthropics/skills/issues/556) — run_eval.py 0% trigger rate
  - [#1169](https://github.com/anthropics/skills/issues/1169) — description-optimisation loop recall=0%
- **趋势判断**：社区已经进入“自动调优 Skill 描述”的阶段，底层评测准确性成为刚需。

### D. 跨平台兼容，尤其是 Windows
- **核心诉求**：Windows 下 subprocess、编码、pipe、命令解析问题频繁出现。
- **代表 Issue**：
  - [#1061](https://github.com/anthropics/skills/issues/1061) — Windows compatibility failures
- **趋势判断**：Skills 生态已不是 macOS/Linux 小圈子工具，跨平台工程化是硬需求。

### E. Skills 工程化：文档、测试、审查、治理类通用技能最受欢迎
- **核心诉求**：用户更偏向“通用生产力技能”，而不是小众垂直技能。
- **代表方向**：
  - 测试生成/测试模式
  - 自我审计 / 质量门禁
  - 代码库盘点 / 清理
  - 文档排版 / Office 格式处理
- **趋势判断**：社区对“把 Claude 变成更可靠的工程助手”兴趣高于娱乐型或单点功能型 Skill。

### F. 安装可见性、重复内容、加载失败等产品体验问题
- **核心诉求**：Skill 消失、重复安装、404/Not found、站点重定向等问题影响使用信心。
- **代表 Issue**：
  - [#62](https://github.com/anthropics/skills/issues/62) — skills disappeared
  - [#189](https://github.com/anthropics/skills/issues/189) — duplicate skills from plugins
  - [#61](https://github.com/anthropics/skills/issues/61) — Not found error when loading Skills
- **趋势判断**：生态成熟度不只是“能不能写 Skill”，还包括“能不能稳定发现、安装、管理 Skill”。

---

## 3) 高潜力待合并 Skills

### 更可能近期落地的修复型 PR
这些 PR 属于“直接修核心链路”的问题，通常最容易推进合并：

- [#1323](https://github.com/anthropics/skills/pull/1323) — 触发检测修复
- [#1298](https://github.com/anthropics/skills/pull/1298) — eval 结果恒为 0% 的根因修复
- [#1099](https://github.com/anthropics/skills/pull/1099) — Windows pipe 崩溃修复
- [#1050](https://github.com/anthropics/skills/pull/1050) — Windows subprocess / 编码修复
- [#361](https://github.com/anthropics/skills/pull/361) — YAML 特殊字符静默误解析防护
- [#362](https://github.com/anthropics/skills/pull/362) — UTF-8 多字节字符崩溃修复
- [#539](https://github.com/anthropics/skills/pull/539) — YAML 前置告警增强
- [#538](https://github.com/anthropics/skills/pull/538) — PDF Skill 文件引用大小写修复

### 更有产品化潜力的新增 Skill
这些更像“下一批会被用户采用的高频通用 Skill”：

- [#514](https://github.com/anthropics/skills/pull/514) — document-typography
- [#723](https://github.com/anthropics/skills/pull/723) — testing-patterns
- [#1367](https://github.com/anthropics/skills/pull/1367) — self-audit

---

## 4) Skills 生态洞察

**一句话总结：**  
当前社区最集中的诉求是——**先把 Skills 的分发、评测、校验、跨平台兼容和安全治理做稳，再扩展高频办公/工程通用型 Skills。**

如果你愿意，我可以把这份报告进一步整理成：
1. **“管理层汇报版”一页摘要**，或  
2. **“按主题分组的 PR/Issue 雷达图”**。

---

以下是基于 `anthropics/claude-code` 过去 24 小时 GitHub 数据整理的 **2026-06-30 Claude Code 社区动态日报**。

---

## 1) 今日速览
Claude Code 今天的核心变化有两条：一是发布了 **v2.1.196**，新增了组织默认模型与更易识别的会话默认名称；二是 Issues 侧集中爆发了 **安全误拦截、Sandbox 性能/OOM、桌面端与 TUI 回归** 等问题。  
从社区反馈看，开发者最在意的是：**合法工作流被误判阻断**、**资源占用和状态一致性问题**、以及 **模型/配额/会话管理的可见性不足**。  

---

## 2) 版本发布

### v2.1.196
- 新增 **Organization default models** 支持：组织管理员可在 org console 设置，未手动选择模型时会在 `/model` 中显示为 **“Org default”** 或 **“Role default”**。  
- 新增 **会话启动时的可读默认名称**，更利于识别与后续消息检索。  

GitHub Release: [v2.1.196](https://github.com/anthropics/claude-code/releases/tag/v2.1.196)

---

## 3) 社区热点 Issues

> 本次挑选 10 个最值得关注的 Issue，优先覆盖：高评论数、严重性高、复现明确、或代表性强的问题。

### 1. 安全过滤误拦截：读取无人机遥测数据被阻断
- [#72373](https://github.com/anthropics/claude-code/issues/72373)  
- 重要性：这是典型的 **安全策略误杀**，直接导致合法工作流被 `session-halted`。对做嵌入式、机器人、视频/遥测 UI 的开发者影响很大。  
- 社区反应：**3 条评论**，带有明确 request ID 和可复现描述，说明不是单点偶发，而是可验证的系统性问题。

### 2. Sandbox 递归枚举 workspace 导致内存失控并 OOM
- [#72367](https://github.com/anthropics/claude-code/issues/72367)  
- 重要性：Sandbox 模式在首轮对话就递归扫入深层 `node_modules`，导致 **RSS 无界增长**，属于明显的性能/稳定性缺陷。  
- 社区反应：**3 条评论**；虽然该 Issue 已关闭，但用户明确指出 **2.1.195 仍可复现**，且关联了更早的历史问题，说明痛点长期存在。

### 3. 误判 ffmpeg 参数为高风险操作
- [#72355](https://github.com/anthropics/claude-code/issues/72355)  
- 重要性：同样是 **cyber safety false positive**，但场景更贴近常见开发任务：调整视频宽高比。说明误拦截不局限于“明显敏感”内容。  
- 社区反应：**3 条评论**，并且被标为 duplicate，表明社区中已有多个相似案例。

### 4. 争取“可选、用户筛选、PII 脱敏”的训练数据贡献机制
- [#72393](https://github.com/anthropics/claude-code/issues/72393)  
- 重要性：这是一个偏战略性的安全/隐私诉求，反映用户希望在 **数据贡献** 上有更强的控制权与可见性。  
- 社区反应：**2 条评论**，话题较新，但方向明确，属于高价值的产品/合规议题。

### 5. Opus 专属限流未体现在使用仪表盘中
- [#72372](https://github.com/anthropics/claude-code/issues/72372)  
- 重要性：这会造成 **“看起来还有额度，实际上已被限流”** 的误导体验，直接影响成本判断与任务调度。  
- 社区反应：**2 条评论**，且已关闭；说明问题已被确认但用户仍关心 UI/计量是否真正对齐模型配额。

### 6. `--plugin-dir` 无法覆盖同名 marketplace 插件
- [#72369](https://github.com/anthropics/claude-code/issues/72369)  
- 重要性：这是插件系统的 **优先级/解析顺序** 问题，会影响本地插件调试、隔离和版本控制。  
- 社区反应：**2 条评论**，是很典型的“机制应明确、行为要可预测”的开发者诉求。

### 7. 左侧栏需要 Pinned / Current Works / Recents 组织会话
- [#72366](https://github.com/anthropics/claude-code/issues/72366)  
- 重要性：随着会话变多，当前 UI 的会话管理能力不足，用户希望更像现代 IDE 一样按工作流组织上下文。  
- 社区反应：**2 条评论**，属于高频操作场景优化，说明用户已经开始把 Claude Code 当作“持续工作空间”而非一次性对话工具。

### 8. Agent 执行循环导致状态损坏
- [#72356](https://github.com/anthropics/claude-code/issues/72356)  
- 重要性：这是 **agent 稳定性/状态机一致性** 问题，且发生在 `platform:intellij` 场景，影响 IDE 内工作流。  
- 社区反应：**2 条评论**，带 `needs-repro`，说明现阶段更像复杂边界条件 bug，但影响面可能不小。

### 9. 继承 `CLAUDE_CODE_CHILD_SESSION` 的交互会话跳过本地 transcript 持久化
- [#72347](https://github.com/anthropics/claude-code/issues/72347)  
- 重要性：这是明确的 **数据丢失风险**，会导致会话记录、审计与复盘能力缺失。  
- 社区反应：**1 条评论**，但描述非常具体，且带有“Claude 自己诊断”的说明，可信度较高。

### 10. 会话/工具上下文中混入类似 prompt injection 的破坏性指令
- [#72395](https://github.com/anthropics/claude-code/issues/72395)  
- 重要性：这类问题直接触及 **上下文完整性与安全边界**，一旦成立，影响会比普通误拦截更严重。  
- 社区反应：**1 条评论**，属于较新的安全类报告，值得持续跟踪。

---

## 4) 重要 PR 进展

> 过去 24 小时内更新的 PR 只有 3 条，因此本节按“重要性”全部列出。

### 1. GCP 示例：Agent Platform 品牌重命名与 README 清理
- [#72363](https://github.com/anthropics/claude-code/pull/72363)  
- 内容：对 `examples/gateway/gcp/` 的文档和注释做纯文本更新，将 Vertex AI 相关表述统一替换为 **Agent Platform**，并保留首次出现的旧名便于检索。  
- 价值：降低文档歧义，帮助外部用户跟上产品命名变化。

### 2. 为 Google Cloud 提供 Claude Gateway 示例部署资产
- [#72361](https://github.com/anthropics/claude-code/pull/72361)  
- 内容：补充运行 Claude Gateway on GCP 的参考部署材料，对应正式文档中的 walkthrough。  
- 价值：提升 **可落地性**，让云端集成从“可读文档”走向“可直接部署的参考实现”。

### 3. hooks 文档补充 Bash tool_input 的额外字段
- [#72264](https://github.com/anthropics/claude-code/pull/72264)  
- 内容：为 hooks 示例补充说明 `PreToolUse` 的 Bash payload 不只包含 `command`，还包括 `run_in_background / description / timeout` 等字段。  
- 价值：减少二次开发误解，属于对插件/扩展生态很重要的文档修复。

---

## 5) 功能需求趋势

从今日 Issues 里，可以提炼出以下几个最受关注的方向：

### 1. 安全策略要“更准、更可解释”
- 大量 `cyber` 误拦截，且都表现为 **合法开发任务被 session-halted**。  
- 说明社区最希望的是：**少误杀、可申诉、可解释**，而不是单纯更严格的过滤。  
- 相关代表：[#72373](https://github.com/anthropics/claude-code/issues/72373)、[#72355](https://github.com/anthropics/claude-code/issues/72355)

### 2. Sandbox / Agent 稳定性与性能
- 典型问题包括 **OOM**、**状态损坏**、**循环执行异常**、以及 **transcript 丢失**。  
- 这说明 Claude Code 正在从“聊天工具”进入“长期工作代理”阶段，用户对可靠性的要求显著提高。  
- 代表：[#72367](https://github.com/anthropics/claude-code/issues/72367)、[#72356](https://github.com/anthropics/claude-code/issues/72356)、[#72347](https://github.com/anthropics/claude-code/issues/72347)

### 3. 会话管理与工作区组织
- 用户希望有更强的 **Pinned / Recents / Current Works**、更好的 session 命名、以及项目搬迁后的上下文处理。  
- 这说明社区在推动 Claude Code 向“多会话、多项目”的生产力工具演进。  
- 代表：[#72366](https://github.com/anthropics/claude-code/issues/72366)、[#72359](https://github.com/anthropics/claude-code/issues/72359)

### 4. 模型选择、配额与成本透明度
- 组织默认模型、单次 prompt 切换模型、Opus 限流可见性、自动 agent 消耗 token 等问题，都是 **成本控制与模型治理** 需求。  
- 代表：[#72372](https://github.com/anthropics/claude-code/issues/72372)、[#72362](https://github.com/anthropics/claude-code/issues/72362)、[#72398](https://github.com/anthropics/claude-code/issues/72398)

### 5. 插件、权限与扩展生态的确定性
- `--plugin-dir` 覆盖规则、agent view 权限说明、hooks payload 字段说明，都指向同一件事：**扩展机制要可预测、可文档化**。  
- 代表：[#72369](https://github.com/anthropics/claude-code/issues/72369)、[#72385](https://github.com/anthropics/claude-code/issues/72385)、[#72264](https://github.com/anthropics/claude-code/pull/72264)

### 6. 跨平台桌面/TUI 一致性
- macOS、Windows、Linux、iTerm2、tmux、JetBrains/IDE 场景里都有细碎但影响体验的回归。  
- 说明当前的优先级已不只是“能跑”，而是 **在不同终端/桌面环境下行为一致**。  
- 代表：[#72397](https://github.com/anthropics/claude-code/issues/72397)、[#72396](https://github.com/anthropics/claude-code/issues/72396)、[#72389](https://github.com/anthropics/claude-code/issues/72389)

---

## 6) 开发者关注点

今天社区反馈里，开发者最在意的痛点可以归纳为四类：

1. **合法任务被安全策略误拦截**  
   尤其是视频、遥测、网络/硬件相关工作流，影响最直接。

2. **Agent/Sandbox 的稳定性和资源控制**  
   包括 OOM、状态损坏、循环执行、以及 transcript 丢失，属于“会影响信任”的问题。

3. **模型、配额、权限的透明度不足**  
   用户希望更清楚地知道：当前用的是什么模型、为何被限流、谁在消耗 token、权限边界在哪里。

4. **跨平台 UI/终端回归频繁**  
   桌面端、TUI、iTerm2、tmux、Windows shell、IDE 集成都出现反馈，说明多端一致性仍是高压区。

---

如果你需要，我也可以把这份日报进一步整理成：
- **适合内部周报的精简版**
- **适合产品/研发同步的表格版**
- **按“安全 / 性能 / UI / 插件 / 模型”分类的管理层摘要版**

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# 2026-06-30 OpenAI Codex 社区动态日报  
来源仓库：[openai/codex](https://github.com/openai/codex)

## 1) 今日速览
今天社区讨论几乎被**稳定性、会话续接和桌面端可用性**占满：远程 compact、重连、多会话发送、输入锁死等问题密集出现，说明 Codex Desktop/CLI 在长会话与跨设备工作流上的体验仍是高优先级。  
版本侧，**0.142.4** 只是维护性更新、未见用户可见变化；同时发布了 **0.143.0-alpha.31**，表明主线仍在快速迭代中。  
与此同时，PR 侧集中修补了**权限边界、MCP 兼容、远程延迟、启动可靠性**等底层问题，方向非常明确。

---

## 2) 版本发布
- [rust-v0.142.4 / 0.142.4](https://github.com/openai/codex/releases/tag/rust-v0.142.4)  
  仅有 Chores，未识别到面向用户的变更，属于偏维护型发布。

- [rust-v0.143.0-alpha.31](https://github.com/openai/codex/releases/tag/rust-v0.143.0-alpha.31)  
  Alpha 小版本发布，当前公开信息较少，但说明内部迭代仍在推进。

---

## 3) 社区热点 Issues
1. [#30596 Remote compact consistently fails for a long GPT-5.5 session and blocks thread continuation](https://github.com/openai/codex/issues/30596)  
   - **重要性**：远程 compact 失败会直接阻断线程继续，是“会话能不能接着用”的核心问题。  
   - **社区反应**：4 条评论，为今日评论最多的问题之一，说明复现和影响都比较明确。  
   - 状态：**CLOSED**

2. [#30615 Memory Phase 2 ignores sandbox_mode=danger-full-access and starts nested macOS sandbox-exec](https://github.com/openai/codex/issues/30615)  
   - **重要性**：内存阶段与沙箱策略冲突，可能导致内存工件无法生成或运行环境异常。  
   - **社区反应**：3 条评论，且涉及 macOS sandbox 这种高敏感底层路径。  
   - 状态：**OPEN**

3. [#30595 macOS: Same ChatGPT account works on Windows but fails with X-OpenAI-Internal-Codex-Responses-Lite on Codex CLI](https://github.com/openai/codex/issues/30595)  
   - **重要性**：同一账号在 macOS/Windows 行为不一致，属于认证与路由层面的跨平台缺陷。  
   - **社区反应**：3 条评论，问题描述直接指向平台差异。  
   - 状态：**OPEN**

4. [#30589 gpt-5.5 Code Mode crashes with SIGTRAP (EXC_BREAKPOINT in v8::Isolate::New) on macOS — hardened runtime blocks V8 JIT](https://github.com/openai/codex/issues/30589)  
   - **重要性**：这是会直接让 Code Mode 崩溃的启动级故障，影响面广。  
   - **社区反应**：2 条评论，但问题技术定位非常清晰，属于高优先级 crash。  
   - 状态：**CLOSED**

5. [#30582 Codex entered a hallucination during a Tool Call](https://github.com/openai/codex/issues/30582)  
   - **重要性**：模型在工具调用中出现幻觉，会破坏工具链可信度和结果可解释性。  
   - **社区反应**：3 条评论，属于模型行为类高关注问题。  
   - 状态：**OPEN**

6. [#30639 Codex Desktop (macOS): Chronicle runs continuous background screen-recording summaries every 10 min, draining plan limits; disabling doesn't immediately stop capture](https://github.com/openai/codex/issues/30639)  
   - **重要性**：后台功能持续消耗配额，直接关系到用户成本和产品信任。  
   - **社区反应**：2 条评论，痛点集中在“后台行为不可控”。  
   - 状态：**OPEN**

7. [#30626 Codex Desktop create_thread from an SSH-host executor can spawn children on local host and lose completion handoffs](https://github.com/openai/codex/issues/30626)  
   - **重要性**：SSH 远程项目场景下，任务可能跑偏到本地主机并丢失 handoff，影响自动化可靠性。  
   - **社区反应**：2 条评论，说明远程编排问题已被真实用户撞到。  
   - 状态：**OPEN**

8. [#30617 [Bug] Desktop multi-session send never completes (outgoing_message.rs:563 missing turn/completed event)](https://github.com/openai/codex/issues/30617)  
   - **重要性**：多会话发送卡死会直接导致新线程不可用，属于桌面端高严重度问题。  
   - **社区反应**：2 条评论，且与 Windows/多会话强相关。  
   - 状态：**OPEN**

9. [#30602 Codex Desktop on macOS becomes completely unable to accept input (total lock-out); only Force Quit restores it](https://github.com/openai/codex/issues/30602)  
   - **重要性**：输入完全不可用是最严重的桌面端故障之一，几乎等同于应用失效。  
   - **社区反应**：2 条评论，属于强烈可复现的可用性阻断。  
   - 状态：**OPEN**

10. [#30590 Windows Codex App times out during model thinking and remote pairing/reconnect](https://github.com/openai/codex/issues/30590)  
    - **重要性**：模型思考和远程配对/重连超时，说明连接与会话恢复链路不稳。  
    - **社区反应**：2 条评论，典型的 Windows 端连接类痛点。  
    - 状态：**OPEN**

---

## 4) 重要 PR 进展
1. [#30642 Accept empty HTTP responses for MCP notifications](https://github.com/openai/codex/pull/30642)  
   允许 MCP notification 的成功空响应被视为已接受，同时继续要求请求类接口返回 body，补齐 HTTP/JSON-RPC 兼容性。

2. [#30632 perf: trace and reduce remote first-turn latency](https://github.com/openai/codex/pull/30632)  
   为远程首轮和命令延迟增加端到端 tracing，并移除若干可避免等待，目标是降低首轮响应时间。

3. [#30631 [codex core] Harden fake shell approval boundaries](https://github.com/openai/codex/pull/30631)  
   加固伪 shell/嵌套路径的审批边界，防止安全命令被错误继承信任。

4. [#30628 [codex] Trust only system PowerShell parsers on Windows](https://github.com/openai/codex/pull/30628)  
   Windows 上仅信任系统 PowerShell parser，避免仓库内同名二进制绕过审批与安全边界。

5. [#30627 elicitations: Move to shared ElicitationService](https://github.com/openai/codex/pull/30627)  
   将 elicitation 逻辑收敛到共享服务，避免用户输入等待与模型继续执行的时序错配。

6. [#30621 [codex] Trace startup WebSocket prewarm](https://github.com/openai/codex/pull/30621)  
   给启动预热和 WebSocket warmup 加 trace，提升启动阶段可观测性和排障能力。

7. [#30618 [code-reviewed] fix(core): prevent tool-search rollout poisoning](https://github.com/openai/codex/pull/30618)  
   防止异常 `tool_search_call.arguments` 被持久化并在后续会话中反复污染。

8. [#30611 app-server: bound outbound requests by their total deadline](https://github.com/openai/codex/pull/30611)  
   让 outbound 请求严格受总 deadline 约束，减少排队后“超时后才执行”的误导性行为。

9. [#30604 Apply current permissions before goal continuations](https://github.com/openai/codex/pull/30604)  
   在 goal continuation 之前应用当前审批/沙箱/权限上下文，减少状态不一致。

10. [#30601 Make app-server OTEL startup best effort](https://github.com/openai/codex/pull/30601)  
    OpenTelemetry 初始化失败不再阻断 app-server 启动，提高整体可用性。

---

## 5) 功能需求趋势
- **远程会话、重连与线程连续性**  
  用户最关心的是“别断、能续、handoff 别丢”。相关问题集中在 remote compact、SSH 远程执行、multi-session send、remote pairing/reconnect。  
  代表链接：[#30596](https://github.com/openai/codex/issues/30596)、[#30626](https://github.com/openai/codex/issues/30626)、[#30617](https://github.com/openai/codex/issues/30617)、[#30590](https://github.com/openai/codex/issues/30590)

- **桌面端资源消耗与后台行为可控性**  
  Chronicle 持续录屏摘要、token 消耗过快、磁盘高频扫描等问题，反映用户希望后台任务更透明、更可关闭、计费更可解释。  
  代表链接：[#30639](https://github.com/openai/codex/issues/30639)、[#30633](https://github.com/openai/codex/issues/30633)、[#30612](https://github.com/openai/codex/issues/30612)

- **权限、沙箱与安全边界一致性**  
  审批边界、sandbox mode、PowerShell parser、tool-call 安全都在被密集检视，社区希望“默认安全”但不要误伤正常开发。  
  代表链接：[#30615](https://github.com/openai/codex/issues/30615)、[#30589](https://github.com/openai/codex/issues/30589)、[#30634](https://github.com/openai/codex/issues/30634)、[#30582](https://github.com/openai/codex/issues/30582)

- **跨平台一致性与桌面可用性**  
  macOS / Windows 的认证、输入、渲染、连接行为仍存在明显差异，说明桌面端的统一体验仍是长期需求。  
  代表链接：[#30595](https://github.com/openai/codex/issues/30595)、[#30602](https://github.com/openai/codex/issues/30602)、[#30640](https://github.com/openai/codex/issues/30640)、[#30583](https://github.com/openai/codex/issues/30583)

---

## 6) 开发者关注点
- **长会话可靠性优先级最高**：远程 compact、重连、会话续接、multi-session send 的问题反复出现，说明“不中断”比单次能力更关键。  
  参考：[#30596](https://github.com/openai/codex/issues/30596)、[#30617](https://github.com/openai/codex/issues/30617)

- **安全边界必须可预测**：fake shell、PowerShell parser、sandbox mode、goal continuation 等 PR/Issue 表明，审批和执行边界是当前最敏感的系统区域。  
  参考：[#30631](https://github.com/openai/codex/pull/30631)、[#30628](https://github.com/openai/codex/pull/30628)、[#30615](https://github.com/openai/codex/issues/30615)

- **后台功能需要“可见、可控、可停止”**：用户对 Chronicle、磁盘扫描、token 消耗过快的抱怨，核心是缺少透明控制。  
  参考：[#30639](https://github.com/openai/codex/issues/30639)、[#30612](https://github.com/openai/codex/issues/30612)、[#30633](https://github.com/openai/codex/issues/30633)

- **跨平台体验仍需收敛**：macOS/Windows 在认证路由、输入响应、连接恢复上的差异，正在成为阻碍主流使用的现实问题。  
  参考：[#30595](https://github.com/openai/codex/issues/30595)、[#30602](https://github.com/openai/codex/issues/30602)、[#30590](https://github.com/openai/codex/issues/30590)

- **模型行为与工具结果可信度要继续强化**：工具调用幻觉、误判安全、rollout poisoning 等问题，都会直接损害开发者对 Codex 的信任。  
  参考：[#30582](https://github.com/openai/codex/issues/30582)、[#30618](https://github.com/openai/codex/pull/30618)、[#30634](https://github.com/openai/codex/issues/30634)

如果你愿意，我可以把这份日报进一步整理成 **“管理层摘要版”** 或 **“适合发到群里的超短版”**。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-06-30）

## 1) 今日速览
今天 Gemini CLI 没有新版本发布，社区讨论重心主要落在 **配置兼容性、文件/路径语义、扩展生态稳定性** 和 **认证错误处理** 上。  
同时，PR 侧出现了几条比较明确的安全与稳定性修复，说明项目当前处于“**修 bug + 收紧边界**”的阶段。  
此外，多个标题/摘要异常的工单被 bot triage，反映出 issue 入口仍有一定噪声。

---

## 2) 社区热点 Issues（10 条）

1. **#28208 PandaDoc extension not appearing in gallery despite matching documented requirements**  
   链接：https://github.com/google-gemini/gemini-cli/issues/28208  
   重要性：影响扩展生态的可发现性，可能涉及 gallery 索引或发布链路问题。  
   社区反应：当前 0 评论，但该问题此前已有同类工单被自动关闭，说明需求持续存在。  

2. **#28207 bug: ignore patterns in ls tool do not work for path-relative/nested globs**  
   链接：https://github.com/google-gemini/gemini-cli/issues/28207  
   重要性：直接影响 `ls` 工具的过滤准确性，属于典型的路径/Glob 语义 bug。  
   社区反应：0 评论，但作者已定位到具体代码行，技术可复现性较强。  

3. **#28206 bug: JSON.parse in cli/index.ts fails to parse settings.json with comments**  
   链接：https://github.com/google-gemini/gemini-cli/issues/28206  
   重要性：配置文件带注释是常见场景，这个问题会影响大量用户的本地配置体验。  
   社区反应：0 评论，属于“高频但尚未进入讨论”的基础兼容性问题。  

4. **#28205 bug: Gracefully handle failed extension updates in extension-manager.ts**  
   链接：https://github.com/google-gemini/gemini-cli/issues/28205  
   重要性：涉及扩展升级失败时的回滚/恢复策略，关系到扩展系统可靠性。  
   社区反应：0 评论，属于需要尽快补强的运行时健壮性问题。  

5. **#28204 enhancement: Ensure a2a-server is compatible with V2 nested settings structure**  
   链接：https://github.com/google-gemini/gemini-cli/issues/28204  
   重要性：配置结构迁移问题，影响旧版/新版设置共存与升级路径。  
   社区反应：0 评论，但问题描述完整，说明需求明确、落地路径清晰。  

6. **#28203 bug: isAuthenticationError falsely matches port numbers or non-auth messages containing '401'**  
   链接：https://github.com/google-gemini/gemini-cli/issues/28203  
   重要性：错误分类失准会误导用户排障，影响 auth 相关 UX。  
   社区反应：0 评论，属于“逻辑准确性”型问题，通常修复收益高。  

7. **#28214 Smrupchusakdi859@gmail.com**  
   链接：https://github.com/google-gemini/gemini-cli/issues/28214  
   重要性：标题/摘要信息不完整，但已有 2 条评论，说明仍在持续跟进。  
   社区反应：`need-information`，属于“信息不足但活跃”的报障。  

8. **#28213 Master / Payload URL**  
   链接：https://github.com/google-gemini/gemini-cli/issues/28213  
   重要性：内容异常、疑似低质量或自动化提交，属于 issue 噪声治理信号。  
   社区反应：`bot-triaged`，1 条评论，自动化介入明显。  

9. **#28211 Payload URL**  
   链接：https://github.com/google-gemini/gemini-cli/issues/28211  
   重要性：带 `priority/p3`，虽然正文信息异常，但说明该类提交已进入优先级体系。  
   社区反应：`bot-triaged`，1 条评论，仍偏低信号。  

10. **#28209 GeminiCLI.com Feedback: [ISSUE]**  
    链接：https://github.com/google-gemini/gemini-cli/issues/28209  
    重要性：来自反馈入口的工单，若内容质量不稳定，会影响真实问题的分流效率。  
    社区反应：`bot-triaged`，1 条评论，明显是自动筛分后的结果。  

---

## 3) 重要 PR 进展（今日共 5 条，以下为全部更新项）

1. **#28215 Harden file-write scope: stop sandbox/auto-accept writes to .gemini and .gitconfig**  
   链接：https://github.com/google-gemini/gemini-cli/pull/28215  
   重点：收紧文件写入权限，避免 prompt injection 下的 sandbox escape 风险。  
   价值：这是明显的安全加固，优先级很高。  

2. **#28216 Refactor: exclude transient CI configuration files from workspace context**  
   链接：https://github.com/google-gemini/gemini-cli/pull/28216  
   重点：将 CI 动态生成的 `gha-creds-*.json` 排除在 workspace context 之外。  
   价值：减少工作区误判，避免把临时凭据文件当成真实项目文件。  

3. **#28202 fix: forward SIGINT/SIGTERM/SIGQUIT to child process during relaunch**  
   链接：https://github.com/google-gemini/gemini-cli/pull/28202  
   重点：relaunch 过程中正确向子进程转发信号，避免 Ctrl+C 后子进程残留。  
   价值：改善更新/重启流程的可控性与终止一致性。  

4. **#28201 fix: remove double-wrapping of VS Code disposables causing subscription leak**  
   链接：https://github.com/google-gemini/gemini-cli/pull/28201  
   重点：修复 VS Code IDE Companion 扩展中的 disposable 泄漏问题。  
   价值：降低长时间运行后的资源泄漏风险，提升 IDE 集成稳定性。  

5. **#28200 fix: sanitize trailing periods from URLs in auth error messages**  
   链接：https://github.com/google-gemini/gemini-cli/pull/28200  
   重点：去掉认证错误消息中 URL 末尾多余句号，避免终端超链接失效。  
   价值：小修复但很实用，改善可点击链接体验。  

---

## 4) 功能需求趋势

1. **配置兼容与迁移是当前高频需求**  
   代表问题：`settings.json` 注释兼容、V2 nested settings、旧配置迁移。  
   相关链接：  
   - https://github.com/google-gemini/gemini-cli/issues/28206  
   - https://github.com/google-gemini/gemini-cli/issues/28204  

2. **文件/路径语义的准确性被持续关注**  
   包括 glob ignore、workspace 识别、CI 临时文件排除等。  
   相关链接：  
   - https://github.com/google-gemini/gemini-cli/issues/28207  
   - https://github.com/google-gemini/gemini-cli/pull/28216  

3. **扩展生态的发现、更新与回滚可靠性**  
   用户关心扩展是否能被发现、更新失败是否可恢复。  
   相关链接：  
   - https://github.com/google-gemini/gemini-cli/issues/28208  
   - https://github.com/google-gemini/gemini-cli/issues/28205  

4. **认证错误与提示文案的可读性仍在打磨**  
   包括 401 误判和 URL 文本格式化。  
   相关链接：  
   - https://github.com/google-gemini/gemini-cli/issues/28203  
   - https://github.com/google-gemini/gemini-cli/pull/28200  

5. **安全边界收紧正在成为明确方向**  
   涉及写权限限制、prompt injection 防护、workspace 边界校验。  
   相关链接：  
   - https://github.com/google-gemini/gemini-cli/pull/28215  
   - https://github.com/google-gemini/gemini-cli/issues/28205  

---

## 5) 开发者关注点

- **边界条件 bug 密集**：注释型 JSON、嵌套配置、Glob 路径、401 文案误判，说明核心代码对“非理想输入”的容错仍需加强。  
  链接：https://github.com/google-gemini/gemini-cli/issues/28206

- **更新/重启/扩展加载链路需要更强的幂等性与回滚能力**：扩展更新失败、relaunch 信号转发、VS Code disposable 泄漏都指向同一类问题。  
  链接：https://github.com/google-gemini/gemini-cli/issues/28205  
  链接：https://github.com/google-gemini/gemini-cli/pull/28202  
  链接：https://github.com/google-gemini/gemini-cli/pull/28201  

- **安全加固优先级很高**：写权限收敛和 workspace 边界检查是近期值得持续跟踪的主题。  
  链接：https://github.com/google-gemini/gemini-cli/pull/28215  
  链接：https://github.com/google-gemini/gemini-cli/pull/28216  

- **issue 入口噪声较大**：`Payload URL`、空摘要等工单出现频繁，建议加强 issue 模板校验与自动化过滤。  
  链接：https://github.com/google-gemini/gemini-cli/issues/28209  
  链接：https://github.com/google-gemini/gemini-cli/issues/28211  
  链接：https://github.com/google-gemini/gemini-cli/issues/28213  

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合内部周报的精简版**，或  
2. **适合公众号/博客发布的分析版**。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报  
**日期：2026-06-30**  
数据源：`github.com/github/copilot-cli`

---

## 1) 今日速览
过去 24 小时，Copilot CLI 新发了一个版本 **v1.0.66-2**，更新重点集中在 **插件/集成扩展、LSP 日志可观测性、GitHub 仓库场景下的 gh CLI 依赖引导** 等方向。  
社区侧新增的两个 Issue 都指向 **稳定性与兼容性**：一个是 Windows 上的 MCP OAuth 重新认证失败，另一个是终端 UI 首次加载时输出鼠标移动字符流，说明当前用户最关心的仍是 **认证链路可靠性** 和 **交互体验稳定性**。

---

## 2) 版本发布
### [v1.0.66-2](https://github.com/github/copilot-cli/releases/tag/v1.0.66-2)
**新增内容：**
- 允许不同插件中同名技能共存
- 允许集成读取和写入 CLI 用户设置
- 可通过 `/lsp logs` 和 `read_agent` 查看 LSP server 日志
- 在 GitHub 仓库场景下，当本机缺少 `gh` CLI 时提示安装
- 增加 GitHub attachment 变体到 prompt 渲染流程

**解读：**
- 这次发布明显偏向 **可扩展性 + 可运维性 + 使用引导**。
- “同名技能共存”说明插件生态开始更重视 **隔离与兼容**。
- “LSP logs 可查看”对排障非常关键，意味着开发者工具链正在补齐 **诊断能力**。
- 提示安装 `gh CLI` 则是在降低 GitHub 场景下的使用门槛。

---

## 3) 社区热点 Issues
> 说明：过去 24 小时仅有 **2 个更新的 Issue**，以下为全部重点条目。当前均为 **OPEN / triage**，且都没有评论，说明问题已被提交但仍处于待确认阶段。

### 3.1 [#3973](https://github.com/github/copilot-cli/issues/3973)
**标题：** MCP OAuth re-auth repeatedly fails on Windows when the cached loopback redirect port is in an excluded TCP port range  
**为什么重要：**
- 这是一个典型的 **Windows 平台兼容性 + OAuth 认证恢复** 问题。
- 涉及 MCP server 的 re-auth 失败，并且会卡在缓存注册状态，影响用户反复认证。
- 若无法恢复，用户可能需要手动清理注册信息，属于高摩擦故障。

**社区反应：**
- 当前 **0 评论、0 👍**，但问题描述具体，通常会引发后续平台兼容修复优先级提升。
- 这类 bug 往往影响的是 **真实生产使用路径**，不是边缘场景。

**链接：** [github/copilot-cli Issue #3973](https://github.com/github/copilot-cli/issues/3973)

---

### 3.2 [#3972](https://github.com/github/copilot-cli/issues/3972)
**标题：** UI is often displaying a continuous stream of characters representing my mouse movements  
**为什么重要：**
- 直接影响 CLI 的 **核心交互 UI**，属于“可用性”级别问题。
- 首次加载就出现“鼠标移动字符流”，说明终端输入/渲染链路可能存在异常。
- 这类问题容易显著降低用户对产品稳定性的信任。

**社区反应：**
- 当前 **0 评论、0 👍**，属于早期报障。
- 但因为涉及 UI 渲染故障，通常会被归类为 **高优先级体验问题**。

**链接：** [github/copilot-cli Issue #3972](https://github.com/github/copilot-cli/issues/3972)

---

## 4) 重要 PR 进展
### 今日无 PR 更新
过去 24 小时内 **没有更新的 Pull Request**，因此本日报不列出 PR 进展项。

**PR 页面：** [github.com/github/copilot-cli/pulls](https://github.com/github/copilot-cli/pulls)

---

## 5) 功能需求趋势
从当前 Issues 可以提炼出社区最关注的方向主要有：

1. **MCP / OAuth 认证稳定性**  
   - 特别是在 **Windows** 上的 loopback redirect、端口排除、缓存注册恢复等细节。

2. **终端 UI 渲染可靠性**  
   - 用户对“首次加载就异常输出”的容忍度很低，说明 CLI 交互层的稳定性仍是重点。

3. **跨平台兼容与异常恢复**  
   - 不只是“能不能用”，更是“出错后能否自愈、能否恢复”。

4. **可观测性与排障能力**  
   - 结合新版本加入的 `/lsp logs`，说明社区和维护者都越来越重视 **日志可见性**。

---

## 6) 开发者关注点
综合今天的版本和 Issue，可以看到开发者最需要关注的痛点是：

- **Windows 平台认证链路脆弱**：MCP OAuth 的 re-auth 失败会影响持续使用。
- **UI/TTY 输出异常**：终端界面出现“鼠标轨迹字符流”属于明显的交互缺陷。
- **缓存状态清理机制不足**：认证注册信息一旦异常，恢复成本偏高。
- **诊断能力仍在补强**：本次 release 新增 LSP 日志查看，侧面说明排障需求很强。
- **生态扩展需要更强隔离**：同名技能共存、集成读写用户设置，说明插件化能力正在深化。

---

如需，我可以继续把这份日报整理成 **适合发到飞书/Slack 的精简版**，或者补成 **“带风险等级和优先级建议”的管理层摘要版**。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-06-30）
数据来源：`github.com/MoonshotAI/kimi-cli`

## 1) 今日速览
今天仓库没有新的 Release，也没有 PR 更新，社区活动主要集中在一个新提的增强需求上：**移动端回车发送、桌面端换行快捷键的输入交互问题**。  
这类反馈通常意味着产品已进入“可用性打磨”阶段，社区开始关注更细的输入体验与跨设备一致性。

---

## 2) 社区热点 Issues

> 说明：本期过去 24 小时内仅有 **1 条 Issue 更新**，因此以下为全部有效热点。

### 1. #2479 [OPEN] [enhancement] Bad usage of return and enter for desktop and mobile
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/2479
- 重要性：这是一个典型的**输入交互/可用性**问题，直接影响 CLI 在手机和桌面端的实际使用体验。  
- 关键诉求：  
  - **移动端**：按 Enter 会直接发送 prompt，导致手机上输入长内容非常不方便。  
  - **桌面端**：当前换行需要 **Shift + Enter**，用户认为这一逻辑不够顺手。  
- 社区反应：目前 **0 评论、0 点赞**，说明讨论还处于早期，但问题本身非常具体，后续很可能会影响更多移动端用户。

> 其余 Issue：本期无更多更新。

---

## 3) 重要 PR 进展

> 说明：本期过去 24 小时内 **无 PR 更新**。

- PR 列表：https://github.com/MoonshotAI/kimi-cli/pulls

---

## 4) 功能需求趋势

从本期 Issue 可以提炼出以下社区关注方向：

1. **输入交互优化**
   - 重点集中在 Enter / Shift+Enter 的行为设计。
   - 这说明用户希望 CLI 在“提交”和“换行”之间有更符合直觉的映射。

2. **移动端可用性**
   - 目前反馈明确指出手机输入体验不佳。
   - 表明社区希望 Kimi Code CLI 不只是桌面/终端工具，也能适配移动场景。

3. **跨平台一致性**
   - 同一输入逻辑在桌面和移动端表现不同，容易造成学习成本。
   - 社区更倾向于统一、可预测的交互方式。

---

## 5) 开发者关注点

结合当前反馈，开发者侧应重点关注：

- **回车键默认行为是否过于激进**
  - 是否应区分“发送”和“换行”场景。
- **移动端输入效率**
  - 手机端长文本输入是否需要更友好的编辑模式。
- **桌面端编辑器式体验**
  - 用户对换行、提交、快捷键组合的预期是否与现状一致。
- **交互一致性与可发现性**
  - 是否需要在 UI 文案、帮助提示或快捷键说明中明确输入规则。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发到团队群的精简版**，或  
2. **适合周报/晨会的表格版**。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-06-30）

## 1. 今日速览
过去 24 小时内，OpenCode 社区的讨论仍然高度集中在 **Desktop 稳定性、会话状态恢复、订阅/额度识别** 以及 **V2/MCP 相关能力完善** 上。  
今天没有新 Release，但 PR 侧推进较快，尤其是 **MCP prompts、MCP 日志、V2 核心修复与 TUI 交互优化**，显示团队正在持续打磨新架构。  
整体来看，社区反馈以“实际可用性问题”为主，说明当前版本在桌面端体验和状态一致性上仍有较强改进需求。

---

## 2. 版本发布
- **今日无新 Release**。

---

## 3. 社区热点 Issues（10 个）

1. **[#34536 JavaScript error occurred in the main process](https://github.com/anomalyco/opencode/issues/34536)**  
   桌面端主进程报错，直接影响启动和运行稳定性，是典型的高优先级崩溃类问题。评论虽只有 2 条，但属于“阻断使用”的严重故障。

2. **[#34532 Persistent red status dot in OpenCode Desktop after tool-loader failure](https://github.com/anomalyco/opencode/issues/34532)**  
   工具加载失败后红点状态无法恢复，用户只能靠重装解决，说明状态机或错误恢复机制存在缺陷。社区反馈较集中，属于强烈的可观测性/恢复性问题。

3. **[#34471 Desktop loses access to existing sessions after profile reset](https://github.com/anomalyco/opencode/issues/34471)**  
   配置重置后历史会话在 Desktop/Web 中消失，但数据库仍在，属于“数据还在、入口丢了”的高风险状态一致性问题。对用户信任影响很大。

4. **[#34537 异常消耗我的token](https://github.com/anomalyco/opencode/issues/34537)**  
   用户反馈一次失败/卡死后 token 被大量消耗，属于成本敏感型问题，影响面会非常大。虽然只有 1 条评论，但场景非常典型，容易引发更多同类反馈。

5. **[#34507 Cannot open Settings in Opencode Desktop v1.17.11 on Mac](https://github.com/anomalyco/opencode/issues/34507)**  
   设置页无法打开，直接影响配置和排障流程；该 Issue 还获得了 2 个 👍，说明用户共鸣较强。属于桌面端核心入口问题。

6. **[#34483 I subcribed, but open code is still saying "Free usage exceeded, subscribe to go"](https://github.com/anomalyco/opencode/issues/34483)**  
   订阅状态与额度提示不一致，属于商业化/权限识别问题。虽然评论少，但会直接影响付费用户体验和转化信任。

7. **[#34473 Opencode randomly stops responses](https://github.com/anomalyco/opencode/issues/34473)**  
   响应随机中断且无明确错误提示，属于典型“交互流程断裂”问题。对 TUI/Desktop 的连续对话体验破坏明显。

8. **[#34457 UX Regression: Can't View Session Details of Incomplete Task Call](https://github.com/anomalyco/opencode/issues/34457)**  
   子代理或工具调用未完成时无法查看详情，影响故障定位和上下文追踪。对复杂任务流用户尤其关键。

9. **[#34523 V2: MCP OAuth token refresh concurrency (cross-location/cross-process race)](https://github.com/anomalyco/opencode/issues/34523)**  
   V2 的 MCP OAuth 刷新并发风险是架构层面的隐患，当前虽是“预留问题”，但对多位置/多进程场景非常关键。属于未来稳定性风险点。

10. **[#34498 Respect disable-model-invocation: true in SKILL.md frontmatter](https://github.com/anomalyco/opencode/issues/34498)**  
    社区希望技能文件前置元数据能真正控制模型调用行为，说明“可编排性”和“安全边界”需求在上升。该需求有助于更好地适配 Claude Code 等同类工作流。

---

## 4. 重要 PR 进展（10 个）

1. **[#34540 fix(session): replace throw error with logWarning during summary generation](https://github.com/anomalyco/opencode/pull/34540)**  
   将 summary 生成期间的硬错误改为警告，减少流程被直接打断，属于明显的稳定性修复。

2. **[#34539 [needs:compliance] feat(app): add Reveal in Finder context menu](https://github.com/anomalyco/opencode/pull/34539)**  
   为桌面文件树增加“在 Finder 中显示”，提升 macOS 桌面集成体验。

3. **[#34538 fix(provider): forward agent temperature for config-defined custom models](https://github.com/anomalyco/opencode/pull/34538)**  
   修复自定义模型温度参数透传，提升自定义模型与代理行为的一致性。

4. **[#34534 [contributor] fix(client): singularize generated api groups](https://github.com/anomalyco/opencode/pull/34534)**  
   调整生成式 API 分组命名，降低客户端调用歧义，并同步迁移调用点。

5. **[#34533 [beta] fix(app): stabilize session timeline layout continuity](https://github.com/anomalyco/opencode/pull/34533)**  
   聚焦会话时间线连续性、滚动锚点和虚拟列表稳定性，是典型的 TUI/桌面交互体验增强。

6. **[#34531 feat(core): support mcp prompts](https://github.com/anomalyco/opencode/pull/34531)**  
   为 MCP 增加 prompt 列表与按服务器取 prompt 能力，是 V2/MCP 生态的重要补齐。

7. **[#34530 fix(tui): queue busy prompts after interrupt](https://github.com/anomalyco/opencode/pull/34530)**  
   处理中断后“忙碌提示”的队列行为，改善高频交互场景下的 TUI 响应逻辑。

8. **[#34529 feat(core): log mcp server messages](https://github.com/anomalyco/opencode/pull/34529)**  
   增加 MCP 服务端日志透传，增强可观测性，便于排查集成问题。

9. **[#34527 fix(core): repair v2 unit test failures](https://github.com/anomalyco/opencode/pull/34527)**  
   修复 V2 Linux/Windows 单测失败，说明核心架构正在向稳定可合并状态推进。

10. **[#34525 fix(core): clean up mcp stdio descendants](https://github.com/anomalyco/opencode/pull/34525)**  
    优化 stdio MCP 进程清理，避免子进程残留，属于基础设施层的重要健壮性修复。

---

## 5. 功能需求趋势

从今日 Issues 看，社区关注点主要集中在以下方向：

- **Desktop 稳定性与会话恢复**  
  例如主进程报错、设置页打不开、红点状态残留、会话历史丢失等，说明用户最在意“能否持续稳定使用”。

- **额度/订阅/计费一致性**  
  “已订阅但仍提示免费额度不足”“异常消耗 token”等问题表明，用户对费用透明度和状态同步非常敏感。

- **V2 / MCP 能力完善**  
  MCP OAuth 并发、prompt 支持、日志输出、异步更新等需求明显增多，V2 相关基础能力正成为社区焦点。

- **模型行为可控性**  
  包括 `disable-model-invocation`、compaction 控制、reasoning/variant 支持等，用户希望更细粒度地控制模型调用行为。

- **复杂工作流下的可观测性与回溯能力**  
  如 session details、tool call 失败后的可见性、随机中断问题，反映出用户对排障能力的依赖在提升。

---

## 6. 开发者关注点

- **优先修复桌面端“入口级”问题**：设置页、主进程错误、状态异常、会话历史可见性，都是直接影响留存的关键点。  
- **加强失败恢复与状态一致性**：很多问题不是“功能缺失”，而是“状态错乱后无法自愈”。  
- **控制 token/费用风险**：失败重试、卡死、异常循环对成本的放大效应已经被用户明确感知。  
- **V2/MCP 需要更完整的工程化能力**：包括并发安全、日志、prompt 刷新、stdio 清理、测试稳定性。  
- **自定义模型和代理行为要更可配置**：温度、推理、工具调用、compaction 等参数控制将持续成为重点需求。

如需，我可以把这份日报进一步整理成 **“管理层简报版”** 或 **“技术团队跟进版”**。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

以下为 **2026-06-30 Pi 社区动态日报**（基于过去 24 小时 GitHub 更新）。

---

## 1) 今日速览

今天 Pi 的讨论重点仍集中在 **Agent 运行时稳定性、上下文/思考块处理、模型/Provider 兼容性** 三条主线。  
从 Issue 分布看，社区对 **重复工具调用卡死、compaction 语言适配、上下文窗口配置、图片/认证传输异常** 等问题关注度较高，说明产品已进入“深度可用”阶段，开始暴露更多边界条件。  
PR 方面，修复型改动占主导，重点围绕 **历史消息回放、工具结果显示、Bedrock 认证映射、消息展示体验** 展开。  

---

## 2) 版本发布

**过去 24 小时无新 Release。**

---

## 3) 社区热点 Issues

> 注：以下按“影响范围 + 讨论热度 + 问题代表性”筛选。

### 1. 重复工具调用可能在 Agent 会话中无限循环
- 链接：[#6158](https://github.com/earendil-works/pi/issues/6158)
- 关键词：`bug`, `no-action`, agent session, tool loop
- 为什么重要：这是典型的 **Agent 调度稳定性问题**。在多步任务中反复执行同一目录检查命令，说明状态推进或停止条件可能存在缺陷。
- 社区反应：**3 条评论**，是本批 Issue 中讨论最活跃的之一；虽无点赞，但问题描述具体，复现信号强。

### 2. 企业用户希望增加管理员级配置源
- 链接：[#6159](https://github.com/earendil-works/pi/issues/6159)
- 关键词：`admin settings`, enterprise, /etc, /Library, %ProgramData%
- 为什么重要：这直接指向 **企业部署与管控能力**，属于从个人工具走向团队/组织级产品的关键需求。
- 社区反应：**2 条评论**，反馈不算多，但需求明确，说明企业场景已开始出现。

### 3. compaction summary 应使用会话语言，并在更新时去重
- 链接：[#6157](https://github.com/earendil-works/pi/issues/6157)
- 关键词：`compaction`, `non-English`, `dedup`
- 为什么重要：影响 **多语言用户体验** 和 **压缩摘要质量**。如果摘要语言与会话语言不一致，会明显削弱可读性。
- 社区反应：**2 条评论**，属于较专业的改进需求，关注点集中在 prompts 设计和状态更新逻辑。

### 4. MiniMax M3 上下文窗口希望提升到 1M
- 链接：[#6171](https://github.com/earendil-works/pi/issues/6171)
- 关键词：`contextWindow`, MiniMax, 1M
- 为什么重要：模型上下文配置直接影响 **长任务、长对话、代码审查** 等场景的可用性。
- 社区反应：**1 条评论**，需求非常明确，且属于模型能力配置层面的关键参数。

### 5. 90k thinking block 被错误计入上下文，影响 compaction
- 链接：[#6166](https://github.com/earendil-works/pi/issues/6166)
- 关键词：`thinking block`, `context`, `compaction`
- 为什么重要：这是一个 **token 预算和上下文管理** 问题，直接影响长思考链场景下的会话续航。
- 社区反应：**1 条评论**，问题技术性强，说明使用者已在真实长链路任务中遇到瓶颈。

### 6. 希望新增 Scaleway Generative APIs 作为 LLM Provider
- 链接：[#6165](https://github.com/earendil-works/pi/issues/6165)
- 关键词：`new provider`, `Scaleway`, `EU`, `zero data retention`
- 为什么重要：反映社区对 **更多模型供应商、区域合规、数据驻留** 的需求。
- 社区反应：**1 条评论，1 个赞**，是少数带有明显正反馈的需求之一，说明有实际市场动机。

### 7. Kimi Coding provider 图片 base64 传输损坏
- 链接：[#6164](https://github.com/earendil-works/pi/issues/6164)
- 关键词：`image base64`, `Kimi Coding`, `invalid base64`
- 为什么重要：影响 **多模态输入链路**，一旦图片附件损坏，Figma/截图/视觉辅助类工作流会直接失效。
- 社区反应：**1 条评论**，属于典型集成兼容 bug，复现价值高。

### 8. Bedrock apiKey 认证应映射到 bearer token 环境变量
- 链接：[#6163](https://github.com/earendil-works/pi/issues/6163)
- 关键词：`Bedrock`, `auth`, `bearer token`
- 为什么重要：这属于 **云厂商认证适配** 的关键修复，影响 AWS Bedrock 的可用性与安全传参方式。
- 社区反应：**1 条评论**，问题清晰且已有对应 PR 跟进，成熟度较高。

### 9. 扩展工具变更应在同一 run 的下一次 provider 请求前生效
- 链接：[#6162](https://github.com/earendil-works/pi/issues/6162)
- 关键词：`extension tool`, `active tools`, `runtime state`
- 为什么重要：关系到 **工具状态刷新时机**，会影响 Agent 在同一轮运行中的工具选择正确性。
- 社区反应：**0 条评论**，但属于运行时一致性问题，优先级不低。

### 10. 关闭 padding 的助手消息显示开关
- 链接：[#6168](https://github.com/earendil-works/pi/issues/6168)
- 关键词：`UI`, `padding`, `assistant messages`
- 为什么重要：这是 **交互与可复制性体验** 改进。对经常复制对话内容的开发者来说很实用。
- 社区反应：**0 条评论，1 个赞**，说明需求简单但有明确用户痛点。

---

## 4) 重要 PR 进展

> 注：过去 24 小时实际更新的 PR 仅 4 条，以下为全部重要 PR。

### 1. 避免回放历史 inline 图片
- 链接：[#6170](https://github.com/earendil-works/pi/pull/6170)
- 状态：CLOSED
- 作用：修复历史会话上下文重建时重复 replay 图片逃逸串的问题，减少历史内容污染。
- 价值：对 **长会话回放、截图类工具结果、上下文清理** 很关键。

### 2. 关闭助手消息 padding
- 链接：[#6169](https://github.com/earendil-works/pi/pull/6169)
- 状态：OPEN
- 作用：实现用户请求的“助手消息不加 padding”选项，改善复制和阅读体验。
- 价值：直接对应 Issue #6168，属于轻量但高频的 UX 优化。

### 3. 修复 Bedrock apiKey -> bearer token 环境映射
- 链接：[#6161](https://github.com/earendil-works/pi/pull/6161)
- 状态：CLOSED
- 作用：将 Amazon Bedrock provider 的 apiKey 映射到 `AWS_BEARER_TOKEN_BEDROCK`，避免重复/错误透传。
- 价值：这是 **云模型认证适配** 的关键修复，覆盖 stream 与 streamSimple 路径。

### 4. 空工具结果返回空字符串，而不是“(see attached image)”
- 链接：[#6156](https://github.com/earendil-works/pi/pull/6156)
- 状态：CLOSED
- 作用：修正工具调用返回空文本时的错误占位输出，避免误导模型。
- 价值：提升 **工具结果语义准确性**，减少模型将无图结果误判为图片内容。

---

## 5) 功能需求趋势

从全部 Issue 看，社区当前最关注的方向可以归纳为以下几类：

### 1. Agent 稳定性与运行时一致性
- 代表问题：[#6158](https://github.com/earendil-works/pi/issues/6158)、[#6162](https://github.com/earendil-works/pi/issues/6162)
- 趋势判断：用户正在把 Pi 用于更复杂的多步骤任务，因此 **防循环、状态刷新、会话推进** 成为核心诉求。

### 2. 上下文管理与 compaction 质量
- 代表问题：[#6157](https://github.com/earendil-works/pi/issues/6157)、[#6166](https://github.com/earendil-works/pi/issues/6166)、[#6171](https://github.com/earendil-works/pi/issues/6171)
- 趋势判断：长上下文、思考块、摘要语言和去重策略，说明用户越来越依赖 Pi 处理 **长任务与复杂推理链**。

### 3. 多模型 / 多 Provider 接入
- 代表问题：[#6165](https://github.com/earendil-works/pi/issues/6165)、[#6163](https://github.com/earendil-works/pi/issues/6163)、[#6164](https://github.com/earendil-works/pi/issues/6164)
- 趋势判断：社区非常关注 **模型可选性、区域合规、认证兼容、多模态传输稳定性**。

### 4. 企业化与可管理性
- 代表问题：[#6159](https://github.com/earendil-works/pi/issues/6159)
- 趋势判断：管理员级配置、统一策略覆盖，说明 Pi 正在进入 **组织内部部署** 的使用场景。

### 5. 交互体验微调
- 代表问题：[#6168](https://github.com/earendil-works/pi/issues/6168)
- 趋势判断：用户希望更方便复制、阅读和复用对话内容，说明 **日常高频使用体验** 也在被持续打磨。

---

## 6) 开发者关注点

结合 Issue/PR 的反馈，可以看到开发者最常提到的痛点是：

1. **Agent 容易在工具调用和状态切换上出错**  
   - 典型表现：重复调用、工具变更不生效、运行时状态不同步。  
   - 关联链接：[#6158](https://github.com/earendil-works/pi/issues/6158)、[#6162](https://github.com/earendil-works/pi/issues/6162)

2. **长上下文场景下 token 与思考块管理不够精细**  
   - 典型表现：thinking block 被算入上下文、压缩摘要语言不对、去重策略不足。  
   - 关联链接：[#6157](https://github.com/earendil-works/pi/issues/6157)、[#6166](https://github.com/earendil-works/pi/issues/6166)

3. **Provider 兼容性仍是集成痛点**  
   - 典型表现：Bedrock 认证映射、Kimi 图片 base64、模型上下文窗口配置。  
   - 关联链接：[#6163](https://github.com/earendil-works/pi/issues/6163)、[#6164](https://github.com/earendil-works/pi/issues/6164)、[#6171](https://github.com/earendil-works/pi/issues/6171)

4. **企业与团队使用场景开始显现**  
   - 典型表现：管理员配置、统一策略、可控默认值。  
   - 关联链接：[#6159](https://github.com/earendil-works/pi/issues/6159)

5. **细节 UX 对高频用户很重要**  
   - 典型表现：消息 padding、历史图片回放、空结果显示。  
   - 关联链接：[#6168](https://github.com/earendil-works/pi/issues/6168)、[#6170](https://github.com/earendil-works/pi/pull/6170)、[#6156](https://github.com/earendil-works/pi/pull/6156)

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合公众号/飞书群的短版**  
2. **适合内部周报的正式版**  
3. **带“风险等级/优先级”标签的运维版**

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-06-30）

## 1) 今日速览
今天的核心动态是一个新的 nightly 版本发布：**v0.19.3-nightly.20260630.e00fe6a27**，release notes 里明确提到 **daemon 文档刷新**，以及一项 **core 的可配置 auto-** 能力更新（原始数据中该条目被截断）。  
与此同时，社区关注点明显集中在 **subagent 输出安全、内存/OOM、认证切换、web-shell 体验、MCP/Daemon 集成** 这几条主线上，说明项目正在向“更稳定、更可运维、更适合远程/多端使用”演进。  
- Release: [v0.19.3-nightly.20260630.e00fe6a27](https://github.com/QwenLM/qwen-code/releases/tag/v0.19.3-nightly.20260630.e00fe6a27)

---

## 2) 版本发布
### [v0.19.3-nightly.20260630.e00fe6a27](https://github.com/QwenLM/qwen-code/releases/tag/v0.19.3-nightly.20260630.e00fe6a27)
- 本次 release notes 显示：
  - `docs(daemon)`: 刷新 daemon 文档，覆盖近期 PR 的第二波更新
  - `feat(core)`: 新增可配置的 auto-… 能力（该条在源数据中截断，无法完整确认具体功能名）
- 这类 nightly 版本通常意味着：文档、核心行为和运维能力仍在快速迭代中，适合关注 daemon / 自动化能力的用户持续跟进。

---

## 3) 社区热点 Issues（10 个）

1. **[#6004 安装 MCP 过程中直接闪退](https://github.com/QwenLM/qwen-code/issues/6004)**  
   - 关键词：`mcp`、`performance`、`memory-usage`、`macos`、`P2`  
   - 重要性：安装 MCP 时出现崩溃且伴随长时间 GC / 内存飙升，这是典型的稳定性与资源控制问题。  
   - 社区反应：**7 条评论**，是过去 24 小时里讨论最集中的 issue 之一，说明复现与定位价值都很高。

2. **[#6007 GLM-5.2 会把 thinking text 当作普通输出泄漏](https://github.com/QwenLM/qwen-code/issues/6007)**  
   - 关键词：`core`、`token-management`、`model-switching`  
   - 重要性：推理过程泄漏到最终输出，会直接影响模型兼容性和用户信任。  
   - 社区反应：**3 条评论**，且已有对应修复 PR 在推进，说明这是明确的高优先级缺陷。

3. **[#6014 新版本不再显示 agent 读取了哪个文件](https://github.com/QwenLM/qwen-code/issues/6014)**  
   - 关键词：`ui`、`rendering`  
   - 重要性：这是一个明显的可观测性退化问题，影响用户对 agent 行为的理解与审计。  
   - 社区反应：**2 条评论**，属于“看起来小，但直接影响使用感知”的 UI 回归。

4. **[#6010 feat(daemon): 支持热更新 channel](https://github.com/QwenLM/qwen-code/issues/6010)**  
   - 关键词：`daemon`、`session-management`、`integration`  
   - 重要性：面向 DingTalk / Feishu / WeChat / Telegram / QQ Bot 等通道的热更新能力，决定了 daemon 的运维效率。  
   - 社区反应：**2 条评论**，说明大家对后台长驻与渠道管理场景有较强需求。

5. **[#6000 feat(web-shell): 移动端侧边栏与会话列表响应式优化](https://github.com/QwenLM/qwen-code/issues/6000)**  
   - 关键词：`web-shell`、`ui`、`session-management`  
   - 重要性：移动端访问 `qwen serve` 的可用性短板被直接指出，属于远程办公/移动使用场景的核心体验问题。  
   - 社区反应：**2 条评论**，需求明确且场景强烈。

6. **[#5990 [loop] 增加 bare /loop 的自主模式](https://github.com/QwenLM/qwen-code/issues/5990)**  
   - 关键词：`cli`、`interactive`、`background-automation`  
   - 重要性：社区在推动“离线/无人值守”的自动执行能力，希望 agent 能继续维护 PR、修复 CI、续跑未完成任务。  
   - 社区反应：**2 条评论**，属于自动化方向的代表性需求。

7. **[#5979 /auth 修改模型供应商配置后，新会话仍报 401](https://github.com/QwenLM/qwen-code/issues/5979)**  
   - 关键词：`authentication`、`configuration`、`api-keys`、`windows`  
   - 重要性：认证配置在新会话中不生效，会直接破坏“修改即生效”的预期。  
   - 社区反应：**2 条评论**，且状态为 `in-review`，说明问题已被认真对待。

8. **[#6024 复制代码块时不应把行号带进剪贴板](https://github.com/QwenLM/qwen-code/issues/6024)**  
   - 关键词：`cli`、`ui`、`rendering`  
   - 重要性：这是典型的高频交互细节问题，影响代码复制的可直接使用性。  
   - 社区反应：**1 条评论**，但属于容易引发大量用户感知的细节回归。

9. **[#6023 子 agent 最终结果泄漏 `<analysis>/<summary>` 标签并破坏 daemon UI 渲染](https://github.com/QwenLM/qwen-code/issues/6023)**  
   - 关键词：`markdown`、`rendering`、`session-management`  
   - 重要性：内部标签泄漏到父上下文，不仅影响渲染，还可能污染后续对话内容。  
   - 社区反应：**1 条评论**，问题边界清晰，且和 subagent 安全/净化强相关。

10. **[#6020 `read_file` 在 ACP skill 读取时返回 `[object Object]`](https://github.com/QwenLM/qwen-code/issues/6020)**  
    - 关键词：`core`、`tools`、`file-operations`  
    - 重要性：错误信息不可读会显著降低排障效率，尤其是在 `qwen serve` / ACP 场景下。  
    - 社区反应：**1 条评论**，但属于“工具链可诊断性”问题，值得优先修复。

---

## 4) 重要 PR 进展（10 个）

1. **[#6027 Sanitize subagent result tags](https://github.com/QwenLM/qwen-code/pull/6027)**  
   - 作用：清理子 agent 的最终结果，将 `<analysis>` 等内部痕迹从父 agent 上下文中移除。  
   - 价值：直接对应上面的 #6023，是 subagent 安全输出的关键修复。

2. **[#6026 fix(core): Allow subagents to exit plan mode](https://github.com/QwenLM/qwen-code/pull/6026)**  
   - 作用：修复 subagent 的 approval-mode / plan-mode 状态管理，让其在 `exit_plan_mode` 后真正退出。  
   - 价值：提升多 agent 协作的可控性，减少“卡在计划模式”的流程问题。

3. **[#6025 feat(web-shell): friendlier Esc interruption + queued-prompt UX](https://github.com/QwenLM/qwen-code/pull/6025)**  
   - 作用：增强 WebShell 中 Esc 中断体验，并优化排队提示与队列处理。  
   - 价值：改善长对话/流式输出期间的可中断性和用户心智负担。

4. **[#6022 feat(cli): support inline one-shot model override in /model](https://github.com/QwenLM/qwen-code/pull/6022)**  
   - 作用：支持 `/model <model-id> <prompt>` 单次覆盖模型。  
   - 价值：让用户按任务粒度切换模型，更适合“某个问题用特定模型临时处理”的工作流。

5. **[#6021 fix(core): Handle ACP read_file local roots](https://github.com/QwenLM/qwen-code/pull/6021)**  
   - 作用：修正 ACP-backed `read_file` 对本地根目录的处理逻辑。  
   - 价值：直接对应 #6020，提升技能文件、临时输出、扩展文件等本地读取兼容性。

6. **[#6019 feat(cli): add /model --compaction for configurable chat compression model](https://github.com/QwenLM/qwen-code/pull/6019)**  
   - 作用：为 `/model` 增加 `--compaction`，可单独配置聊天压缩模型。  
   - 价值：对长会话管理和成本控制很关键，属于“模型能力配置化”的进阶能力。

7. **[#6018 Avoid full-history clones in OOM-prone paths](https://github.com/QwenLM/qwen-code/pull/6018)**  
   - 作用：减少在错误上报和 forked-agent cache 场景中的大对象深拷贝。  
   - 价值：这是直接针对 OOM 风险的性能修复，和 #6004 的资源问题同属一类高优先级方向。

8. **[#6015 fix(cli): make the non-VP transcript scrollable during multi-agent runs](https://github.com/QwenLM/qwen-code/pull/6015)**  
   - 作用：修复默认 transcript 在多 agent 场景下无法正常上翻的问题。  
   - 价值：对 `/review` 等多 agent fan-out 场景非常重要，影响调试与可读性。

9. **[#6013 fix(core): Keep serve health responsive before runtime load](https://github.com/QwenLM/qwen-code/pull/6013)**  
   - 作用：让 `qwen serve` 在启动阶段优先响应 `/health`，推迟较重的 runtime graph 加载。  
   - 价值：提升服务启动和健康检查的响应性，利于部署与编排系统接入。

10. **[#6006 fix(cli): load browser MCP tools by default](https://github.com/QwenLM/qwen-code/pull/6006)**  
    - 作用：默认启用 browser MCP 路径，自动注册 tunneled `chrome-devtools` 服务器。  
    - 价值：强化浏览器自动化/调试路径，降低首次使用门槛。

---

## 5) 功能需求趋势
从近 24 小时的 Issues 看，社区最关注的方向主要有以下几类：

1. **Daemon / Serve 的可部署性增强**  
   - 热更新 channel、TLS/HTTPS、健康检查、移动端访问等需求很集中。  
   - 相关链接：[#6010](https://github.com/QwenLM/qwen-code/issues/6010)、[#6001](https://github.com/QwenLM/qwen-code/issues/6001)、[#6000](https://github.com/QwenLM/qwen-code/issues/6000)

2. **多模型与模型切换能力更灵活**  
   - `/auth`、`/model`、compaction、单次 override 等需求说明用户希望“按任务选择模型”。  
   - 相关链接：[#5979](https://github.com/QwenLM/qwen-code/issues/5979)、[#6007](https://github.com/QwenLM/qwen-code/issues/6007)、[#6022](https://github.com/QwenLM/qwen-code/pull/6022)、[#6019](https://github.com/QwenLM/qwen-code/pull/6019)

3. **Subagent / multi-agent 稳定性与输出净化**  
   - 子 agent 标签泄漏、plan mode 退出、multi-agent transcript 等问题频繁出现。  
   - 相关链接：[#6023](https://github.com/QwenLM/qwen-code/issues/6023)、[#6009](https://github.com/QwenLM/qwen-code/pull/6009)、[#6027](https://github.com/QwenLM/qwen-code/pull/6027)、[#6026](https://github.com/QwenLM/qwen-code/pull/6026)

4. **性能与内存控制**  
   - OOM、闪退、大历史克隆、长时间运行后的稳定性是明显痛点。  
   - 相关链接：[#6004](https://github.com/QwenLM/qwen-code/issues/6004)、[#6018](https://github.com/QwenLM/qwen-code/pull/6018)

5. **WebShell / TUI 的交互体验提升**  
   - 移动端 sidebar、队列提示、Esc 中断、鼠标支持、复制行为等，说明 UI 仍在快速打磨。  
   - 相关链接：[#6000](https://github.com/QwenLM/qwen-code/issues/6000)、[#6024](https://github.com/QwenLM/qwen-code/issues/6024)、[#6025](https://github.com/QwenLM/qwen-code/pull/6025)、[#6011](https://github.com/QwenLM/qwen-code/pull/6011)

6. **MCP / ACP / 浏览器集成的可用性**  
   - 安装、读取、默认加载、日志可读性等问题说明集成层仍是重点。  
   - 相关链接：[#6004](https://github.com/QwenLM/qwen-code/issues/6004)、[#6020](https://github.com/QwenLM/qwen-code/issues/6020)、[#6006](https://github.com/QwenLM/qwen-code/pull/6006)

---

## 6) 开发者关注点
综合今天的社区反馈，开发者最应该盯住的痛点是：

- **不要让内部推理痕迹泄漏到用户可见输出**：这是模型输出治理的底线。  
  - 参考：[#6007](https://github.com/QwenLM/qwen-code/issues/6007)、[#6027](https://github.com/QwenLM/qwen-code/pull/6027)

- **降低长会话和多 agent 场景的内存风险**：避免大对象深拷贝、控制 OOM、优化历史管理。  
  - 参考：[#6004](https://github.com/QwenLM/qwen-code/issues/6004)、[#6018](https://github.com/QwenLM/qwen-code/pull/6018)

- **让配置变更真正“即时生效”**：尤其是 `/auth`、`/model`、compaction 这类会影响后续会话的设置。  
  - 参考：[#5979](https://github.com/QwenLM/qwen-code/issues/5979)、[#6022](https://github.com/QwenLM/qwen-code/pull/6022)、[#6019](https://github.com/QwenLM/qwen-code/pull/6019)

- **提升 daemon/web-shell 的部署与远程可用性**：HTTPS、health check、移动端、channel 热更新都是实际落地需求。  
  - 参考：[#6001](https://github.com/QwenLM/qwen-code/issues/6001)、[#6010](https://github.com/QwenLM/qwen-code/issues/6010)、[#6013](https://github.com/QwenLM/qwen-code/pull/6013)

- **把“可读日志”和“可解释 UI”当作一等公民**：文件读取、工具输出、复制内容、滚动行为都直接影响排障效率。  
  - 参考：[#6020](https://github.com/QwenLM/qwen-code/issues/6020)、[#5997](https://github.com/QwenLM/qwen-code/issues/5997)、[#6024](https://github.com/QwenLM/qwen-code/issues/6024)、[#6015](https://github.com/QwenLM/qwen-code/pull/6015)

如果你希望，我还可以把这份日报进一步整理成：
1. **适合发群的精简版**，或  
2. **带“风险等级 / 优先级 / 影响面”评分的分析版**。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报（2026-06-30）

过去 24 小时仓库更新明显偏向 **v0.8.66 收尾** 与 **v0.8.67 方向铺垫**：一方面集中修复权限/审批、TUI 布局、Hotbar 默认行为与发布门禁；另一方面开始系统性重构 `/constitution`、Fleet setup、文档映射和多模型支持。  
同时，**子代理高并发导致的卡顿/冻结** 成为最核心的性能主题，相关问题已被拆成多条 PR 快速推进。

---

## 1) 今日速览

- **主线很清晰：先稳再扩。** 过去一天里，维护重点不是新功能堆叠，而是把权限语义、TUI 可视性、事件回压、锁竞争等“会让用户误判产品状态”的问题先清掉。  
- **性能与一致性是最高优先级。** 多个 release-blocker issue/PR 直接围绕 sub-agent fanout 冻结、审批弹窗裁切、后台锁阻塞展开，说明当前版本的核心目标是把交互稳定性拉回可控范围。  
- **v0.8.67 方向开始成形。** `/constitution`、WHALE.md 去留、首登/更新流程、Hotbar 引导、文档地图同步等问题，已经从“修 bug”进入“重塑产品入口”的阶段。

---

## 2) 社区热点 Issues

> 本期共 24 条更新，整体讨论量不算高，但不少是 **release-blocker**，属于“问题明确、快速闭环”的类型。

1. **[#3790 Permissions are over-abstracted: make the MODE the single authority](https://github.com/Hmbown/DeepSeek-TUI/issues/3790)**  
   重要性：这是权限体系的“总问题”，核心是把 **mode 作为唯一权威**，避免 auto-review/Auto 等抽象层覆盖用户预期。  
   社区反应：**3 条评论**，是本期最有讨论度的议题；随后迅速出现对应 PR，说明共识较强。

2. **[#3800 v0.8.66: Release gate for multi sub-agent fanout freeze](https://github.com/Hmbown/DeepSeek-TUI/issues/3800)**  
   重要性：高 fanout 下 TUI 近似“假死”的总门禁问题，直接影响可用性。  
   社区反应：**1 条评论**，但它是多个子问题的母 issue，带动一串拆分修复，属于典型的高优先级性能治理入口。

3. **[#3799 v0.8.66: Fix TUI modal and text overflow layout systemically](https://github.com/Hmbown/DeepSeek-TUI/issues/3799)**  
   重要性：不仅是某个弹窗，而是 **TUI 布局与文本容器系统性溢出**。  
   社区反应：**1 条评论**，说明短终端/复杂文本场景下的问题已经被真实用户场景验证。

4. **[#3807 v0.8.66: Ship Hotbar hidden by default until setup opt-in](https://github.com/Hmbown/DeepSeek-TUI/issues/3807)**  
   重要性：涉及默认 UX 和“新装即见”是否会污染主界面。  
   社区反应：**1 条评论**，争议不大，偏产品决策型问题；很快有 PR 落地“默认隐藏”。

5. **[#3766 v0.8.66: Correct approval UI copy for session-scoped approvals](https://github.com/Hmbown/DeepSeek-TUI/issues/3766)**  
   重要性：这是**信任边界文案**问题，用户需要明确知道“always”到底持续多久。  
   社区反应：**1 条评论**，说明审批文案准确性被视为可信度底线。

6. **[#3806 v0.8.67 Setup: make /constitution the primary constitution management surface](https://github.com/Hmbown/DeepSeek-TUI/issues/3806)**  
   重要性：直接定义 v0.8.67 的入口形态，决定用户是否要理解内部上下文结构。  
   社区反应：**暂无评论**，但属于产品方向级需求，影响面大。

7. **[#3811 v0.8.67 Docs: center /constitution and user-global constitution in the docs map](https://github.com/Hmbown/DeepSeek-TUI/issues/3811)**  
   重要性：文档地图要跟上新的 constitution 叙事，否则“产品已变、文档未变”。  
   社区反应：**暂无评论**，更像维护侧的结构性补齐。

8. **[#3798 v0.8.67 Setup: remove deprecated WHALE.md discovery and docs surface](https://github.com/Hmbown/DeepSeek-TUI/issues/3798)**  
   重要性：清理旧的指令入口，避免用户继续依赖已过时的知识面。  
   社区反应：**暂无评论**，属于架构清理型任务。

9. **[#3792 v0.8.67 Setup: make first-run onboarding feel like starting CodeWhale, not editing config](https://github.com/Hmbown/DeepSeek-TUI/issues/3792)**  
   重要性：首登体验从“改配置”转向“启动产品”，这会显著影响新用户留存。  
   社区反应：**暂无评论**，但方向明确，属于体验升级主线。

10. **[#3791 Redesign /fleet setup: progressive "agent team" setup](https://github.com/Hmbown/DeepSeek-TUI/issues/3791)**  
    重要性：Fleet setup 被认为不该像“六列配置矩阵”，而应像“代理团队编排”。  
    社区反应：**暂无评论**，但代表了一个更大的交互范式调整需求。

---

## 3) 重要 PR 进展

1. **[#3817 fix(tui): preserve standing YOLO authority for runtime continuations](https://github.com/Hmbown/DeepSeek-TUI/pull/3817)**  
   解决 runtime continuation / 子代理接力时 YOLO 权限被误降级的问题，确保模式权威不被中间层篡改。

2. **[#3797 fix(tui): make the mode authoritative for YOLO — drop publish prompt carve-out](https://github.com/Hmbown/DeepSeek-TUI/pull/3797)**  
   直接修复 #3790 的核心症状：YOLO 不应再被 publish-like shell 的特殊例外打断。

3. **[#3816 fix(subagent): persist state off the manager write-lock hot path](https://github.com/Hmbown/DeepSeek-TUI/pull/3816)**  
   将子代理状态持久化移出写锁热路径，减少高 fanout 下的排队和卡顿。

4. **[#3815 feat(tui): hide Hotbar until explicit opt-in](https://github.com/Hmbown/DeepSeek-TUI/pull/3815)**  
   将 Hotbar 改为默认不显示，符合“先干净、后显式启用”的产品策略。

5. **[#3814 fix(tui): keep approval controls visible inline](https://github.com/Hmbown/DeepSeek-TUI/pull/3814)**  
   重做审批弹窗布局，避免长文本在小终端上把操作按钮挤掉。

6. **[#3813 fix(tui): use nonblocking send for ListSubAgents refresh events](https://github.com/Hmbown/DeepSeek-TUI/pull/3813)**  
   把子代理列表刷新事件改为非阻塞发送，缓解事件通道回压导致的 UI 停顿。

7. **[#3812 fix(tui): allow agent starts to join parallel dispatch batches](https://github.com/Hmbown/DeepSeek-TUI/pull/3812)**  
   允许多个 agent 启动真正并行调度，修复“看起来像串行执行”的启动瓶颈。

8. **[#3809 fix(tui): render sub-agent sidebar from a read-only snapshot](https://github.com/Hmbown/DeepSeek-TUI/pull/3809)**  
   侧栏刷新改为只读快照，减少与 completion 更新、持久化之间的锁竞争。

9. **[#3808 fix(tui): try_lock shell manager in async UI refresh paths](https://github.com/Hmbown/DeepSeek-TUI/pull/3808)**  
   避免 async UI 刷新路径使用阻塞锁，降低“刷新线程卡死”的风险。

10. **[#3818 fix(tui): expand active tool run summaries](https://github.com/Hmbown/DeepSeek-TUI/pull/3818)**  
    继续完善进行中的 tool run 展示，提升 transcript 折叠/展开的一致性与可读性。

---

## 4) 功能需求趋势

从本期 Issues 可以看出，社区关注点主要集中在以下几个方向：

- **权限模型简化与可解释性**  
  典型诉求是：mode 必须是单一权威，审批文案要和运行时行为严格一致，不能出现“看起来 always、实际上只是 session-scoped”的错觉。  
  代表 Issue：[#3790](https://github.com/Hmbown/DeepSeek-TUI/issues/3790)、[#3766](https://github.com/Hmbown/DeepSeek-TUI/issues/3766)

- **TUI 稳定性与高并发性能**  
  子代理 fanout 冻结、事件回压、锁竞争、布局裁切，说明用户对“交互不卡顿、信息不丢失”要求非常高。  
  代表 Issue：[#3800](https://github.com/Hmbown/DeepSeek-TUI/issues/3800)、[#3799](https://github.com/Hmbown/DeepSeek-TUI/issues/3799)

- **首登/更新引导的产品化重构**  
  `/constitution` 成为主入口，WHALE.md 退场，first-run 和 update flow 要更像“开始使用产品”，不是“编辑配置文件”。  
  代表 Issue：[#3806](https://github.com/Hmbown/DeepSeek-TUI/issues/3806)、[#3792](https://github.com/Hmbown/DeepSeek-TUI/issues/3792)、[#3798](https://github.com/Hmbown/DeepSeek-TUI/issues/3798)

- **Hotbar 与快捷键的可发现性/可控性**  
  一边要让用户容易发现，一边又要避免默认过度侵入。  
  代表 Issue：[#3807](https://github.com/Hmbown/DeepSeek-TUI/issues/3807)、[#3782](https://github.com/Hmbown/DeepSeek-TUI/issues/3782)

- **多模型与文档一致性**  
  说明仓库正扩展更多 provider/model 组合，文档与事实表必须同步更新。  
  代表 Issue：[#3810](https://github.com/Hmbown/DeepSeek-TUI/issues/3810)、[#3811](https://github.com/Hmbown/DeepSeek-TUI/issues/3811)

---

## 5) 开发者关注点

- **“隐藏行为”正在被系统性清理。**  
  不论是权限绕过、默认显示 Hotbar，还是审批文案与实际行为不一致，开发者都在压缩“用户以为会发生、实际没发生”的空间。

- **UI 线程不能再被阻塞锁拖垮。**  
  多个 PR 同时处理 write-lock、Mutex、bounded channel backpressure，表明当前最直接的工程痛点就是：**高并发下 TUI 不能假死**。

- **交互要从“配置面板”转向“任务导向”。**  
  `/constitution`、Fleet setup、Hotbar、first-run onboarding 都在向“渐进式、引导式、低认知负担”迁移。

- **文档与运行时行为必须强绑定。**  
  版本说明、安装片段、provider/model 列表、constitution 文档地图都在补齐，避免“代码已经变了，文档还停留在旧世界”。

- **release-blocker 仍然是工作重心。**  
  本期很多 issue 都是 v0.8.66 级别的门禁问题，说明维护团队当前更在意“能不能稳定发、发出去是不是对的”，而不是单纯增加功能。

---

如果你愿意，我也可以把这份日报再整理成 **“适合发微信群/飞书的超短版”** 或 **“适合内部周报的表格版”**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*