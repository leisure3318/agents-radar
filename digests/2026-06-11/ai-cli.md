# AI CLI 工具社区动态日报 2026-06-11

> 生成时间: 2026-06-11 02:03 UTC | 覆盖工具: 9 个

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

以下为基于 2026-06-11 各 AI CLI 工具社区动态的横向对比分析。

---

## 1) 生态全景

当前 AI CLI 生态已经从“能对话”进入到“能长期稳定跑工作流”的阶段，社区关注点高度集中在 **终端交互稳定性、长会话可靠性、MCP/插件兼容性、以及多模型/多 provider 适配**。  
从动态看，几乎所有主流工具都在同时经历两件事：一边快速补齐能力，一边处理新版本带来的回归。  
这说明 AI CLI 正从“实验性工具”向“生产力基础设施”过渡，用户对 **可预测、可审计、可自动化** 的要求显著上升。  
整体上，生态竞争焦点已不再是“谁能接模型”，而是“谁能在复杂本地环境和长任务场景里稳定工作”。

---

## 2) 各工具活跃度对比

> 说明：下表中的 Issues / PR 为**本日报纳入的热点条目数**，用于横向比较当天社区活跃度。

| 工具 | 今日热点 Issues 数 | 今日 PR 数 | Release 情况 |
|---|---:|---:|---|
| Claude Code | 10 | 4 | 有：v2.1.172 |
| OpenAI Codex | 10 | 10 | 有：rust-v0.140.0-alpha.7、alpha.4 |
| Gemini CLI | 10 | 10 | 无新 Release |
| GitHub Copilot CLI | 10 | 0 | 无新 Release |
| Kimi Code CLI | 2 | 1 | 无明显新 Release |
| OpenCode | 10 | 10 | 有：v1.17.3、v1.17.2、v1.17.1 |
| Pi | 10 | 8 | 无新 Release |
| Qwen Code | 10 | 10 | 无新 Release |
| DeepSeek TUI / CodeWhale | 10 | 10 | 有：v0.8.57、v0.8.56 |

---

## 3) 共同关注的功能方向

### 1. 终端 / TUI 稳定性
**涉及工具：** Claude Code、Codex、Gemini CLI、Copilot CLI、Qwen Code、OpenCode、Pi、DeepSeek TUI  
**共同诉求：**
- 输出流不乱、不截断、不重复
- 鼠标/键盘事件正确处理
- tmux、WSL、Windows Terminal、宽字符、滚轮等兼容性更稳
- 终端状态可见、可恢复、不卡死

**结论：**  
TUI 仍然是 AI CLI 的“第一体验面”，也是回归最集中的区域。

---

### 2. 长会话与后台任务管理
**涉及工具：** Claude Code、Codex、OpenCode、Pi、Qwen Code、Kimi Code CLI  
**共同诉求：**
- session 不掉线
- background task 状态准确
- remote-control / daemon / subagent 在长时间运行下可持续
- compact / context window / turn 管理更可靠

**结论：**  
社区已不满足于“单轮问答”，而是要求 CLI 能承担持续运行的 agent 工作流。

---

### 3. MCP / 插件 / 工具链兼容性
**涉及工具：** Claude Code、Codex、Gemini CLI、Copilot CLI、OpenCode、Pi、Qwen Code、DeepSeek TUI  
**共同诉求：**
- MCP server / connector / plugin 动态发现
- 认证刷新、路由刷新、权限同步
- 工具 schema 更宽容，参数转换更稳
- 插件在 UI、会话、后台执行中都能一致生效

**结论：**  
“可扩展”已成为核心卖点，但更关键的是“扩展后是否真的可见、可用、可诊断”。

---

### 4. 上下文、token、成本与可观测性
**涉及工具：** Claude Code、Gemini CLI、OpenCode、Pi、Qwen Code、DeepSeek TUI、Codex  
**共同诉求：**
- token / cost / cache 可视化
- 上下文注入遵守 ignore 规则
- 长会话压缩与恢复逻辑可解释
- 计费、截断、重试、缓存命中更透明

**结论：**  
用户已经开始把 AI CLI 当作“成本可控的生产系统”来使用，而不是纯聊天工具。

---

### 5. 多模型 / 多 provider 兼容
**涉及工具：** OpenCode、Pi、Qwen Code、DeepSeek TUI、Claude Code、Codex、Gemini CLI  
**共同诉求：**
- 不同 provider 的能力映射一致
- 模型 ID、reasoning、thinking、tool call 协议兼容
- 切换模型后行为不漂移
- 云厂商、本地模型、OpenAI-compatible 网关都能稳定接入

**结论：**  
生态正从“单一大模型依赖”转向“多 provider 抽象层”竞争。

---

## 4) 差异化定位分析

### Claude Code
- **侧重：** 终端交互、长会话、代理能力、安全边界
- **用户画像：** 复杂工作流开发者、重度终端用户、企业环境用户
- **技术路线：** 强 agent 化 + TUI 深度集成 + MCP/插件扩展
- **特征：** 功能增强快，但当天回归也最集中，说明处于高强度迭代期

### OpenAI Codex
- **侧重：** Windows/WSL 稳定性、性能、认证/插件链路、TUI 功能完善
- **用户画像：** Windows 开发者、桌面端用户、偏自动化和 IDE 联动用户
- **技术路线：** 桌面端 + Rust 线快速演进，强调性能和平台兼容
- **特征：** PR 多、问题也多，体现出活跃迭代与回归并存

### Gemini CLI
- **侧重：** Agent 响应性、上下文控制、IDE Companion、配置正确性
- **用户画像：** 更关注工作流稳定与上下文治理的开发者
- **技术路线：** 稳态修复优先，增强 shell 输出和后台执行语义
- **特征：** 问题聚焦，方向相对收敛，偏“基础能力打磨”

### GitHub Copilot CLI
- **侧重：** 企业环境、MCP 政策、流式输出、会话/IDE 集成
- **用户画像：** 企业开发者、Copilot 生态用户、IDE/CLI 联动用户
- **技术路线：** 强调与 GitHub/Copilot 体系融合
- **特征：** 今天没有 PR，但 issue 指向明确，说明生态诉求强、产品边界问题突出

### Kimi Code CLI
- **侧重：** Agent 自动化、审批流、协议兼容
- **用户画像：** 希望无人值守执行任务的用户
- **技术路线：** 目前更像协议和状态机打磨期
- **特征：** 社区体量较小，但问题都直指核心执行链路

### OpenCode
- **侧重：** 多 provider 兼容、工具安全、协议层集成、大仓库性能
- **用户画像：** 重度工程化用户、企业/多模型用户、agent 编排用户
- **技术路线：** 更像“AI 编排底座”，强调工具链安全与可迁移性
- **特征：** PR/issue 都很密集，且方向清晰，是高强度迭代型项目

### Pi
- **侧重：** 流式协议、计费准确性、TUI 体验、外部 provider 集成
- **用户画像：** 多 provider 使用者、关注成本与协议正确性的开发者
- **技术路线：** 更偏中间层/协议适配器与开发者平台
- **特征：** 修复节奏快，偏“把基础打牢”

### Qwen Code
- **侧重：** 终端交互、MCP 容错、daemon/web shell、subagent 自动化
- **用户画像：** 中文/本地化场景、重视 CLI 工作台化的用户
- **技术路线：** 从 CLI 向可编排工作台演进，功能面扩展快
- **特征：** 终端事件链和上下文治理是关键战场

### DeepSeek TUI / CodeWhale
- **侧重：** 多模型兼容、TUI 体验、headless 自动化、hooks / config 可迁移
- **用户画像：** 需要多 provider harness 的高级用户
- **技术路线：** 从单模型工具转型为多模型、可迁移、可自动化平台
- **特征：** 品牌重塑明显，正在向更通用的 Agent/CLI 基座发展

---

## 5) 社区热度与成熟度

### 社区最活跃的阵营
从 issue 和 PR 密度看，**OpenCode、Qwen Code、Codex、Claude Code、DeepSeek TUI** 属于当前最活跃的一组。  
其中：
- **OpenCode / Qwen Code / DeepSeek TUI**：PR 密集，功能迭代快，属于“快速演进型”
- **Claude Code / Codex**：issue 压力大，说明用户量和使用深度都高，属于“高关注度+高回归敏感型”

### 成熟度较高但仍在修稳定性的阵营
- **Gemini CLI、Copilot CLI、Pi**
  - 共同特征是：问题更集中在基础稳定性、兼容性和体验一致性
  - 说明产品已进入“成熟工具修边角”阶段，但还未完全摆脱核心链路回归

### 仍处于快速迭代、形态未完全定型的阵营
- **Kimi Code CLI、OpenCode、Qwen Code、DeepSeek TUI**
  - 更强调 agent 自动化、多 provider 支持、协议与状态机打磨
  - 这类项目通常功能成长快，但边界问题也更频繁

---

## 6) 值得关注的趋势信号

### 1. AI CLI 正在从“命令行工具”变成“工作流运行时”
信号来自长会话、后台任务、subagent、daemon、remote-control、自动审批等需求。  
**对开发者的启示：** 要按“运行时系统”标准设计 session、状态、恢复、审计能力，而不是仅按交互工具设计。

### 2. TUI 仍是核心战场，且交互层问题最容易影响口碑
几乎所有工具都在处理输出流、滚轮、tmux、宽字符、焦点、输入法等问题。  
**对开发者的启示：** 交互层需要更强的端到端测试和跨终端兼容矩阵。

### 3. 多模型 / 多 provider 抽象层正在成为竞争壁垒
OpenCode、Pi、Qwen Code、DeepSeek TUI、Claude Code 都在强化 provider 兼容。  
**对开发者的启示：** “兼容多个模型”不再是加分项，而是基础能力；真正难点在于能力映射和一致性。

### 4. MCP / 插件生态进入“可用性验证”阶段
用户不再满足于“能接入”，而是要求动态更新、权限刷新、UI 可见、状态一致。  
**对开发者的启示：** 插件框架要优先补齐可观测性和热更新体验。

### 5. 上下文、token、成本成为企业级使用的核心指标
Claude、Gemini、Pi、Qwen、DeepSeek 都在强调 token、cache、context、billing。  
**对开发者的启示：** 成本可见性会直接影响企业采纳率，必须前置设计。

### 6. 稳定性回归是所有主流工具的共同挑战
Codex、Claude、Copilot、OpenCode、Qwen、Pi 都在反复处理“更新后不可用”问题。  
**对开发者的启示：** 发布治理、灰度策略、回归测试将成为 CLI 产品竞争的关键基础设施。

---

如果你愿意，我可以继续把这份分析整理成：
1. **一页式管理层简报**，或  
2. **按“稳定性 / 生态 / 商业化 / 技术路线”四象限的决策图**。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下为基于 **anthropics/skills**（Claude Code 官方 Skills 仓库）截至 **2026-06-11** 的社区热点报告。  
> 注：你给出的 PR 列表里“评论数”字段多数为空，因此下列 **PR 热度排序** 采用“题目覆盖面 + 更新活跃度 + 社区关注主题”综合判断。

---

## 1) 热门 Skills 排行（Top 7）

| 排名 | Skill / PR | 功能与社区关注点 | 当前状态 | 链接 |
|---|---|---|---|---|
| 1 | **frontend-design 相关增强**（#210 / #1046） | 聚焦 **前端设计 Skill 的可执行性、清晰度、可落地性**。社区最在意的是：Skill 是否能真正指导 Claude 产出稳定、可复用的前端方案，而不是停留在概念说明。 | **OPEN** | [PR #210](https://github.com/anthropics/skills/pull/210) / [PR #1046](https://github.com/anthropics/skills/pull/1046) |
| 2 | **testing-patterns**（#723） | 覆盖 **单元测试、React 组件测试、测试策略** 等完整测试栈。热点在于：测试生成是否能兼顾“覆盖率”和“可维护性”，避免 AI 生成测试过于脆弱。 | **OPEN** | [PR #723](https://github.com/anthropics/skills/pull/723) |
| 3 | **agent-creator + 多工具评估修复**（#1140） | 一边新增 **任务型 agent 生成能力**，一边修复 **多工具并行调用评估**。社区关注点是：Claude 能否稳定地把复杂任务拆成 agent 协作，并且评估链路不失真。 | **OPEN** | [PR #1140](https://github.com/anthropics/skills/pull/1140) |
| 4 | **ODT / OpenDocument 支持**（#486） | 面向 **LibreOffice / ODF / ODT/ODS** 的文档创建、填充、转换。热点集中在 **开放文档格式兼容性**，尤其是企业与开源办公场景。 | **OPEN** | [PR #486](https://github.com/anthropics/skills/pull/486) |
| 5 | **document-typography**（#514） | 解决 AI 生成文档中的 **孤行、寡行、编号错位** 等排版问题。社区关注的是：文档类 Skill 不能只“生成内容”，还要保证“出版级可读性”。 | **OPEN** | [PR #514](https://github.com/anthropics/skills/pull/514) |
| 6 | **shodh-memory**（#154） | 为 AI agent 提供 **跨对话持久记忆**。热点在于：Claude 能否具备更强的长期上下文管理能力，而不是每次对话都“从零开始”。 | **OPEN** | [PR #154](https://github.com/anthropics/skills/pull/154) |
| 7 | **sensory（macOS 自动化）**（#806） | 用 **AppleScript / osascript** 做原生 macOS 自动化，减少对截图式电脑操作的依赖。社区关注点是：本地自动化是否能更稳、更快、更省权限。 | **OPEN** | [PR #806](https://github.com/anthropics/skills/pull/806) |

---

## 2) 社区需求趋势

### A. **Skills 分发与共享能力**
社区强烈希望 Skills 不只是“本地安装”，而是能 **组织内共享、库化管理、统一分发**。  
代表 Issue：  
- [#228 org-wide skill sharing](https://github.com/anthropics/skills/issues/228)  
- [#189 duplicate skills from plugins](https://github.com/anthropics/skills/issues/189)

### B. **Skills 触发、评估与稳定性**
很多反馈集中在：**Skill 触发不稳定、评估结果失真、Windows/编码/跨平台兼容问题**。  
这说明社区不仅要“有 Skill”，更要 **可验证、可重复、可调试**。  
代表 Issue：  
- [#556 run_eval.py 触发率 0%](https://github.com/anthropics/skills/issues/556)  
- [#1169 description-optimisation recall=0%](https://github.com/anthropics/skills/issues/1169)  
- [#61 loading skills 报 404](https://github.com/anthropics/skills/issues/61)  

### C. **安全、信任边界与企业治理**
企业用户最关心的是：**社区 Skill 如何避免冒充官方、如何定义权限边界、如何嵌入内部文档系统**。  
代表 Issue：  
- [#492 anthropic/namespace trust boundary abuse](https://github.com/anthropics/skills/issues/492)  
- [#1175 SharePoint Online 文档安全与上下文窗口](https://github.com/anthropics/skills/issues/1175)  
- [#1156 portability label honesty](https://github.com/anthropics/skills/issues/1156)

### D. **平台适配与生态互操作**
社区希望 Skills 能更自然地接入 **Bedrock、MCP、开放文档格式、多文件引用** 等生态。  
代表 Issue：  
- [#29 Usage with Bedrock](https://github.com/anthropics/skills/issues/29)  
- [#16 Expose Skills as MCPs](https://github.com/anthropics/skills/issues/16)  
- [#1220 multi-file preload / inline bundling](https://github.com/anthropics/skills/issues/1220)

### E. **高频生产力方向：文档、测试、自动化、设计**
从 PR/Issue 组合看，社区最想要的还是这些“高频刚需”：
- **文档生成/排版**：ODT、PDF、typography  
- **测试生成**：testing-patterns  
- **前端/设计**：frontend-design  
- **自动化**：macOS automation、workflow builder  
- **代理/记忆**：agent-creator、memory

---

## 3) 高潜力待合并 Skills

以下是更可能近期落地、且对社区价值较高的 PR：

1. **frontend-design 相关优化**  
   价值高、覆盖面大，属于官方最容易形成“标准模板”的方向。  
   [PR #210](https://github.com/anthropics/skills/pull/210)

2. **testing-patterns**  
   直接命中开发者刚需，且适用面广，落地后很可能成为高频使用 Skill。  
   [PR #723](https://github.com/anthropics/skills/pull/723)

3. **ODT 支持**  
   企业文档场景强需求，能补齐开放格式生态。  
   [PR #486](https://github.com/anthropics/skills/pull/486)

4. **document-typography**  
   属于“提升输出质量”的高价值增强，容易形成差异化。  
   [PR #514](https://github.com/anthropics/skills/pull/514)

5. **agent-creator + 多工具评估修复**  
   如果评估链路稳定，这类 meta-skill 很可能成为后续技能体系的基础模块。  
   [PR #1140](https://github.com/anthropics/skills/pull/1140)

6. **sensory（macOS 自动化）**  
   对本地自动化用户非常有吸引力，尤其是替代截图式电脑使用。  
   [PR #806](https://github.com/anthropics/skills/pull/806)

> 补充：**skill-creator 体系稳定性修复** 也是高优先级合并候选，虽然不一定是“新 Skill”，但它是整个生态的底座。  
> 相关 PR：[#361](https://github.com/anthropics/skills/pull/361)、[#362](https://github.com/anthropics/skills/pull/362)、[#539](https://github.com/anthropics/skills/pull/539)、[#1050](https://github.com/anthropics/skills/pull/1050)、[#1099](https://github.com/anthropics/skills/pull/1099)

---

## 4) Skills 生态洞察

**一句话总结：**
> 当前社区最集中的诉求，是让 Claude Code Skills 从“可用的示例集合”升级为 **可分发、可验证、可治理、可跨平台复用** 的生产级能力体系。

如果你愿意，我可以进一步把这些数据整理成：
- **“技能赛道热度图”**
- **“按行业场景分类的 Skills 机会清单”**
- **“PR/Issue 风险与合并优先级矩阵”**

---

# Claude Code 社区动态日报  
**日期：2026-06-11**  
数据源：github.com/anthropics/claude-code

---

## 1) 今日速览
今天社区讨论的核心仍然是 **稳定性回归与交互体验问题**：TUI 渲染、tmux/WSL 兼容、后台任务状态、模型/工具调用异常等问题集中出现，且多为 `v2.1.172` 相关反馈。  
同时，**会话级能力与安全边界** 也成为热点，包括 remote-control 连接超时、MCP 连接器热更新不可见、上下文污染/安全误判等，说明用户对长会话和复杂工作流的可靠性要求正在明显提高。

---

## 2) 版本发布

### [v2.1.172](https://github.com/anthropics/claude-code/releases/tag/v2.1.172)
**更新要点：**
- 子代理现在可以继续生成自己的子代理，最多支持 5 层嵌套
- Amazon Bedrock 在未设置 `AWS_REGION` 时，会从 `~/.aws` 配置读取区域，符合 AWS SDK 的优先级；`/status` 会显示区域来源
- 浏览某些“mark”内容时新增了搜索栏

**解读：**
这次发布明显偏向 **代理能力增强** 和 **云环境兼容性优化**。不过从当天 Issues 看，新版本同时带来了不少回归，尤其是 TUI/终端交互相关问题。

---

## 3) 社区热点 Issues（10 个）

### 1. [#67289 TUI alternate-screen 破坏 tmux scroll-back](https://github.com/anthropics/claude-code/issues/67289)
**为什么重要：**  
这是典型的高频工作流回归：tmux 用户无法回看会话上方内容，直接影响排障、审阅和长对话工作。  
**社区反应：**  
虽然评论数不多（2 条），但这是“可用性致命伤”级别的问题，而且被标记为 `duplicate`，说明已有同类反馈聚集。

### 2. [#67282 Remote Control 会话约 41 分钟必死](https://github.com/anthropics/claude-code/issues/67282)
**为什么重要：**  
`--remote-control` 适合无人值守/长任务场景，固定 41 分钟掉线会严重破坏自动化和持续运行。  
**社区反应：**  
评论数虽少，但描述非常明确，且给出了连续 11+ 次测量，可信度高、影响面大。

### 3. [#67295 长 `/compact` 会话中反复出现 “tool call was malformed”](https://github.com/anthropics/claude-code/issues/67295)
**为什么重要：**  
这类模型工具调用解析错误会让长会话直接卡住，属于影响核心交互链路的稳定性问题。  
**社区反应：**  
虽然只有 1 条评论，但它发生在长文档处理场景中，且用户已切换模型作为 workaround，说明问题已影响实际生产使用。

### 4. [#67293 后台任务面板把已死亡 Bash 任务显示为 Running](https://github.com/anthropics/claude-code/issues/67293)
**为什么重要：**  
状态面板失真会让用户误判任务是否真的在执行，直接影响并发调度和人工介入判断。  
**社区反应：**  
问题可在重启后仍存在，说明不是瞬时 UI bug，而可能是状态持久化/同步问题，值得优先排查。

### 5. [#67290 会话中新增的 MCP connector 无法被当前 session 发现](https://github.com/anthropics/claude-code/issues/67290)
**为什么重要：**  
这反映出 MCP 工具注册表只在 session 启动时加载，影响动态扩展能力。  
**社区反应：**  
虽然只有 1 条评论，但这是非常明确的产品能力缺口，尤其会影响多人协作和运行中扩展工具链。

### 6. [#67283 Bridged session 上下文污染/安全问题](https://github.com/anthropics/claude-code/issues/67283)
**为什么重要：**  
这是当天最敏感的问题之一：模型上下文中出现了磁盘 transcript 不存在的内容，并且呈现“数据外传指令”形态，涉及安全与可信性。  
**社区反应：**  
用户给出了连续 3 天、4 个 session 的复现叙述，问题严重性高，尽管评论少，但风险属性极强。

### 7. [#67267 no-comment AskUserQuestion 后文本块被静默丢失](https://github.com/anthropics/claude-code/issues/67267)
**为什么重要：**  
“渲染丢失 + transcript 丢失”意味着数据链路不一致，容易造成对话记录不完整。  
**社区反应：**  
这是可复现的核心数据完整性问题，且在 tmux 环境中也出现，说明与终端渲染链路耦合较深。

### 8. [#67299 显式 `--model` 旧 Opus ID 被静默重映射](https://github.com/anthropics/claude-code/issues/67299)
**为什么重要：**  
用户明确指定模型却被悄悄替换，会导致实验结果不可靠，也不利于可审计性。  
**社区反应：**  
问题本身很“隐蔽”，当前评论数为 0，但从“silent remap”描述来看，属于高优先级的正确性问题。

### 9. [#67296 VS Code 的 Manage Plugins 显示 No plugins available](https://github.com/anthropics/claude-code/issues/67296)
**为什么重要：**  
插件生态是扩展能力的重要入口，这个问题会直接让 VS Code 用户误以为没有可用插件。  
**社区反应：**  
该问题带有回归性质，并指向 `64KB JSON truncation`，说明此前修复可能被重新引入，值得尽快回归验证。

### 10. [#67300 v2.1.172 回归：WSL2 中滚轮被当成方向键](https://github.com/anthropics/claude-code/issues/67300)
**为什么重要：**  
这是明显的输入设备映射回归，直接影响 Linux/WSL 用户的基础交互。  
**社区反应：**  
尽管刚提交、暂无评论，但它与最新版本强相关，且属于“基础操作失效”，通常优先级会比较高。

---

## 4) 重要 PR 进展（本次仅更新到 4 条）

> 说明：本次抓取到的最新 PR 仅 4 条，以下为全部纳入。

### 1. [#67084 fix Hookify prompt fields and warning context](https://github.com/anthropics/claude-code/pull/67084)
**内容：**
- 将旧的 `event: prompt` / `pattern:` 规则映射到新的 `UserPromptSubmit.prompt`
- 保留 `user_prompt` 作为兼容别名
- 为支持上下文的 hook 事件增加 `hookSpecificOutput.additionalContext`

**价值：**  
这是典型的 hook/扩展机制兼容性修复，有助于减少旧规则失效带来的集成问题。

### 2. [#66964 Add /this-session plugin — live session token & cost monitor](https://github.com/anthropics/claude-code/pull/66964)
**内容：**
- 新增 `/this-session` 插件和 slash command
- 在对话中实时显示当前 session 的 token 消耗、成本、缓存状态等

**价值：**  
非常贴近长会话用户的真实需求，尤其适合追踪成本、上下文缓存和 token 使用情况。

### 3. [#66854 toekn](https://github.com/anthropics/claude-code/pull/66854)
**内容：**
- 当前抓取数据中未提供完整摘要，标题信息不足以判断具体实现

**价值：**  
从更新频率看属于活跃提交，但建议后续结合 PR 详情进一步确认其功能方向。

### 4. [#66813 fix(#66806): 安全测试/漏洞赏金相关拒答文案修复](https://github.com/anthropics/claude-code/pull/66813)
**内容：**
- 调整 Claude Code 对 bug bounty / security testing 相关请求的标准拒答与提示文案
- 强调合法漏洞应通过 Anthropic 官方渠道报告

**价值：**  
这类修复体现了产品在安全政策表达上的持续打磨，能减少误导性回复和合规风险。

---

## 5) 功能需求趋势

从今天的 Issues 里，可以看出社区关注点主要集中在以下几个方向：

1. **终端/TUI 可靠性**
   - tmux 回滚、alternate-screen、渲染丢字、滚轮输入异常等问题高频出现  
   - 代表 Issue：[#67289](https://github.com/anthropics/claude-code/issues/67289)、[#67267](https://github.com/anthropics/claude-code/issues/67267)、[#67300](https://github.com/anthropics/claude-code/issues/67300)

2. **长会话与后台任务管理**
   - remote-control 超时、auto-compact 过早触发、后台任务状态不一致  
   - 代表 Issue：[#67282](https://github.com/anthropics/claude-code/issues/67282)、[#67293](https://github.com/anthropics/claude-code/issues/67293)、[#67259](https://github.com/anthropics/claude-code/issues/67259)

3. **模型与工具调用稳定性**
   - malformed tool call、显式模型参数被重映射、工具结果/上下文丢失  
   - 代表 Issue：[#67295](https://github.com/anthropics/claude-code/issues/67295)、[#67299](https://github.com/anthropics/claude-code/issues/67299)、[#67267](https://github.com/anthropics/claude-code/issues/67267)

4. **MCP / 插件生态的动态可见性**
   - session 中途添加 connector、插件市场显示异常、VS Code 插件列表截断  
   - 代表 Issue：[#67290](https://github.com/anthropics/claude-code/issues/67290)、[#67296](https://github.com/anthropics/claude-code/issues/67296)

5. **安全与权限边界**
   - 上下文污染、headless 模式权限不生效、security flag 误判  
   - 代表 Issue：[#67283](https://github.com/anthropics/claude-code/issues/67283)、[#67268](https://github.com/anthropics/claude-code/issues/67268)、[#67273](https://github.com/anthropics/claude-code/issues/67273)

6. **模型选择与版本兼容**
   - 新模型可用性、旧模型 ID 兼容映射、Desktop/CLI 选择不一致  
   - 代表 Issue：[#67298](https://github.com/anthropics/claude-code/issues/67298)、[#67271](https://github.com/anthropics/claude-code/issues/67271)、[#67260](https://github.com/anthropics/claude-code/issues/67260)

---

## 6) 开发者关注点

### 高频痛点
- **终端兼容性问题反复出现**：tmux、WSL2、macOS、Windows Desktop 的边界行为不稳定，说明跨平台渲染与输入处理仍是重点风险区。  
- **长会话可靠性不足**：compact、remote-control、background tasks、session state 多处有一致性问题，用户对“持续运行不掉线、不丢状态”的要求很强。  
- **工具链动态更新能力不足**：MCP connector、插件市场、模型可用性等变化没有实时反映到当前 session 中，影响灵活性。  
- **安全与上下文一致性担忧上升**：出现 transcript 与模型上下文不一致的反馈，说明用户开始高度关注数据边界和可审计性。  
- **版本回归感知明显**：多条 issue 都直接指向 `v2.1.172` 或提到“previously fixed again”，社区对稳定性回归非常敏感。

### 开发建议方向
- 优先排查 **TUI/终端输入输出链路** 的回归
- 增强 **session 生命周期管理** 与状态同步
- 提升 **MCP / plugin / model 变更的热更新能力**
- 对 **模型 ID、权限规则、上下文来源** 提供更明确的可解释性和日志输出

---

如果你愿意，我可以把这份日报进一步整理成：
1. **适合周报的简版摘要**，或  
2. **内部技术雷达格式（按稳定性/性能/安全/生态分类）**。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# 2026-06-11 OpenAI Codex 社区动态日报

## 1) 今日速览
过去 24 小时，Codex 社区反馈仍然高度集中在**桌面端稳定性、性能回退、Windows/WSL 兼容**三条主线，且多起问题与近期更新直接相关。与此同时，仓库侧继续推进 **TUI 体验、认证/插件链路、上下文管理**等基础能力，说明团队在“修稳定性”的同时也在补齐平台能力。

---

## 2) 版本发布
- [rust-v0.140.0-alpha.7](https://github.com/openai/codex/releases/tag/rust-v0.140.0-alpha.7)  
  仅从 Release 标题看，这是 Rust 线的一个 alpha 预览版，当前公开信息未附更细 changelog。

- [rust-v0.140.0-alpha.4](https://github.com/openai/codex/releases/tag/rust-v0.140.0-alpha.4)  
  同样属于 alpha 迭代版，说明 Rust 版本仍在快速小步推进中。

---

## 3) 社区热点 Issues

1. [#27491 Severe streaming slowdown in Codex: Fast mode outputs only a few characters every several seconds and then stalls](https://github.com/openai/codex/issues/27491)  
   **重要性：** 直接打击最核心的交互体验——Fast mode 变成“慢速模式”，属于明显性能回退。  
   **社区反应：** 6 条评论，是今天最热的 issue 之一，说明复现和影响面都较高。

2. [#27437 Codex is unusable on Windows - Not Responding. - June 10 2026](https://github.com/openai/codex/issues/27437)  
   **重要性：** 启动后无响应属于高优先级可用性问题，可能影响大量 Windows 用户。  
   **社区反应：** 3 条评论，属于典型“更新后无法使用”的强烈反馈。

3. [#27394 High CPU usage after update.](https://github.com/openai/codex/issues/27394)  
   **重要性：** 更新后 CPU 飙高会直接导致卡顿、耗电和风扇噪音，往往意味着后台循环或资源泄漏。  
   **社区反应：** 3 条评论，表明问题并非个例。

4. [#27506 [Windows] App crashes ~1s after launch when Windows user profile path contains non-ASCII (Korean) characters](https://github.com/openai/codex/issues/27506)  
   **重要性：** 明确的编码/路径兼容性 bug，影响国际化用户与企业环境部署。  
   **社区反应：** 2 条评论，属于复现明确、定位价值高的问题。

5. [#27492 Codex App automations can disappear or show daily schedules as weekly-all-days](https://github.com/openai/codex/issues/27492)  
   **重要性：** 自动化配置丢失或 RRULE 解析异常，影响定时任务可信度。  
   **社区反应：** 2 条评论，说明用户已经注意到持久化/调度层异常。

6. [#27493 Computer Use bundled plugin is usable on Windows but not reflected in plugin list/UI](https://github.com/openai/codex/issues/27493)  
   **重要性：** “功能可用但 UI 不可见”会严重增加排障成本，也会误导用户以为插件失效。  
   **社区反应：** 3 条评论；且该 issue 已关闭，可能已有修复，但仍值得关注回归风险。

7. [#27453 Codex Windows app: project chats disappear after update and after first response](https://github.com/openai/codex/issues/27453)  
   **重要性：** 涉及会话/项目聊天丢失，属于数据可见性和持久化问题，用户感知很强。  
   **社区反应：** 虽然只有 1 条评论，但这是“数据消失”类高风险反馈。

8. [#27497 Codex Desktop hangs at 100% CPU before window creation when ChatGPT auth.json is present](https://github.com/openai/codex/issues/27497)  
   **重要性：** 启动前就卡死，且与 auth.json 强相关，说明认证读取路径可能存在死锁或循环。  
   **社区反应：** 1 条评论，但问题严重，属于“致命启动链路”级别。

9. [#27486 Seeing auth_revoked errors when trying to use Linear Plugin in Codex Despite being connected to the plugin](https://github.com/openai/codex/issues/27486)  
   **重要性：** 插件认证失效会直接影响 MCP/第三方集成可用性。  
   **社区反应：** 1 条评论，说明这是较新的集成问题，值得持续跟踪。

10. [#27402 codex is broken in wsl integration after the update](https://github.com/openai/codex/issues/27402)  
    **重要性：** WSL 集成回归会影响大量 Windows 开发者的真实工作流。  
    **社区反应：** 1 条评论、1 个 👍，信号虽少但很明确：用户已经感受到工作流中断。

---

## 4) 重要 PR 进展

1. [#27489 core: cache turn diff rendering](https://github.com/openai/codex/pull/27489)  
   **内容：** 缓存 turn diff 渲染，减少每次 patch 后重复渲染/序列化。  
   **价值：** 直接针对性能热点，属于能明显降低 UI/渲染开销的优化。  
   **状态：** 已关闭，推测已合入。

2. [#27488 Add new context window tool](https://github.com/openai/codex/pull/27488)  
   **内容：** 增加“模型可请求的新上下文窗口”工具。  
   **价值：** 让模型能主动开启干净上下文，而不必依赖压缩摘要路径，提升长会话可控性。

3. [#27504 Add secret auth storage configuration](https://github.com/openai/codex/pull/27504)  
   **内容：** 增加 secret auth 存储配置层。  
   **价值：** 直接回应 Windows Credential Manager 容量限制问题，对大体积认证数据更友好。

4. [#27503 Refresh credentialed routes during session](https://github.com/openai/codex/pull/27503)  
   **内容：** 会话中刷新 credentialed routes，并由 proxy 负责 hook 编译。  
   **价值：** 插件变更后路由能及时更新，减少“插件装了但路由没刷新”的失配问题。

5. [#27510 [3 of 3] Support images in TUI goals](https://github.com/openai/codex/pull/27510)  
   **内容：** 让 `/goal` 支持图片输入。  
   **价值：** 补齐 TUI 目标定义的多模态能力，对复杂任务描述很关键。

6. [#27509 [2 of 3] Support long pasted text in TUI goals](https://github.com/openai/codex/pull/27509)  
   **内容：** 支持 TUI 目标中长文本粘贴。  
   **价值：** 解决长文本粘贴被截断/丢失的问题，提升实际可用性。

7. [#27508 [1 of 3] Support long raw TUI goal objectives](https://github.com/openai/codex/pull/27508)  
   **内容：** 放宽 `thread/goal/set` 对目标文本长度的限制。  
   **价值：** 为长目标、复杂约束、任务说明提供基础支持。

8. [#27499 Promote TUI unified mentions in composer to default mentions feature](https://github.com/openai/codex/pull/27499)  
   **内容：** 将统一 mention 弹窗升级为默认体验。  
   **价值：** 说明 TUI 交互正在从“可选新特性”走向稳定默认方案。

9. [#27498 Route image extension reads through turn environments v2](https://github.com/openai/codex/pull/27498)  
   **内容：** 图片读取改走 turn environments v2。  
   **价值：** 让图像扩展读取适配环境化文件系统/沙箱上下文，增强可移植性。

10. [#27495 [tpp][codex] pass agent path metadata to MCP tools call](https://github.com/openai/codex/pull/27495)  
    **内容：** 给 MCP 调用补充 `agent_path` 元数据。  
    **价值：** 对多 agent / subagent 场景更友好，有助于追踪调用上下文。

---

## 5) 功能需求趋势

1. **Windows / WSL 兼容与稳定性是第一优先级**  
   大量 issue 指向 Windows 启动崩溃、Not Responding、WSL 集成失效、路径编码问题。  
   代表链接：[#27437](https://github.com/openai/codex/issues/27437)、[#27506](https://github.com/openai/codex/issues/27506)、[#27402](https://github.com/openai/codex/issues/27402)、[#27453](https://github.com/openai/codex/issues/27453)

2. **性能回退与资源占用问题持续高发**  
   典型表现包括 streaming slowdown、CPU 100%、更新后高 CPU。  
   代表链接：[#27491](https://github.com/openai/codex/issues/27491)、[#27394](https://github.com/openai/codex/issues/27394)、[#27497](https://github.com/openai/codex/issues/27497)

3. **认证 / 插件 / MCP 链路可靠性需求上升**  
   用户关注“已连接但不可用”“auth_revoked”“路由不刷新”等问题。  
   代表链接：[#27493](https://github.com/openai/codex/issues/27493)、[#27486](https://github.com/openai/codex/issues/27486)、[#27463](https://github.com/openai/codex/issues/27463)

4. **会话持久化、上下文与自动化管理需要更强一致性**  
   聊天消失、自动化配置错乱、context compaction/schema 失配，都说明状态管理链路仍是薄弱点。  
   代表链接：[#27453](https://github.com/openai/codex/issues/27453)、[#27492](https://github.com/openai/codex/issues/27492)、[#27511](https://github.com/openai/codex/issues/27511)、[#27423](https://github.com/openai/codex/issues/27423)

5. **模型行为可控性与配置一致性仍有需求**  
   包括默认行为覆盖 repo 指令、模型 provider 配置不生效、思考强度变化等。  
   代表链接：[#27496](https://github.com/openai/codex/issues/27496)、[#27398](https://github.com/openai/codex/issues/27398)、[#27457](https://github.com/openai/codex/issues/27457)

---

## 6) 开发者关注点

- **最核心痛点：更新后回归频繁，且集中在“能不能用”层面。**  
  Windows 无响应、启动崩溃、CPU 飙高、流式卡顿，说明发布后的回归控制仍是社区最敏感的话题。  
  参考：[#27437](https://github.com/openai/codex/issues/27437)、[#27394](https://github.com/openai/codex/issues/27394)、[#27491](https://github.com/openai/codex/issues/27491)

- **跨平台与本地环境兼容性需求强烈。**  
  非 ASCII 路径、WSL、sandbox、Intel macOS entitlement 等问题反复出现，表明开发者非常在意“本地工作流是否被打断”。  
  参考：[#27506](https://github.com/openai/codex/issues/27506)、[#27402](https://github.com/openai/codex/issues/27402)、[#27422](https://github.com/openai/codex/issues/27422)

- **插件与认证体系需要更透明的诊断能力。**  
  现阶段常见问题不是“完全没功能”，而是“功能存在但状态不一致”，这对排障和信任都很伤。  
  参考：[#27493](https://github.com/openai/codex/issues/27493)、[#27486](https://github.com/openai/codex/issues/27486)、[#27497](https://github.com/openai/codex/issues/27497)

- **状态持久化与上下文管理是长期基础能力。**  
  聊天记录消失、自动化列表异常、context_compaction schema 不匹配，都会直接影响开发者对 Codex 可靠性的判断。  
  参考：[#27453](https://github.com/openai/codex/issues/27453)、[#27492](https://github.com/openai/codex/issues/27492)、[#27423](https://github.com/openai/codex/issues/27423)

- **大家希望 Codex 的“默认行为”更可预测。**  
  包括遵循仓库指令、保持模型配置一致、避免隐藏的模式切换或策略漂移。  
  参考：[#27496](https://github.com/openai/codex/issues/27496)、[#27398](https://github.com/openai/codex/issues/27398)、[#27457](https://github.com/openai/codex/issues/27457)

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发到 Slack/飞书的超短版**，或  
2. **适合内部周报的分析版**。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## 1. 今日速览
今天仓库**没有新 Release**，社区讨论主要集中在三条主线：**Agent/执行流程卡顿或无响应、上下文与配置处理的正确性、以及 IDE/扩展生态问题**。  
PR 侧则以**shell 输出流稳定性修复**和**一轮依赖/测试链升级**为主，说明项目当前重点在“稳态修复 + 工具链维护”。

## 2. 版本发布
今日无新 Release。

---

## 3. 社区热点 Issues

- [#27790](https://github.com/google-gemini/gemini-cli/issues/27790) `fix(vscode-ide-companion): comma operator in activate() leaks two Disposables`（OPEN，3 评论）  
  **重要性**：VS Code Companion 扩展存在资源泄漏，属于 IDE 集成的基础稳定性问题，影响长期运行体验。  
  **社区反应**：已有少量跟进，说明问题可复现且值得尽快修复。

- [#27785](https://github.com/google-gemini/gemini-cli/issues/27785) `thinking too long, do nothing`（OPEN，3 评论）  
  **重要性**：直接指向 Agent 在“思考/生成”阶段卡死或无动作，是最影响可用性的核心问题之一。  
  **社区反应**：反馈较集中，但当前仍缺少足够的复现材料。

- [#27836](https://github.com/google-gemini/gemini-cli/issues/27836) `gemini CLI doenst start to thinking to answer my questions`（OPEN，2 评论）  
  **重要性**：与 #27785 同类，说明“无法进入有效推理/响应”可能不是孤立故障。  
  **社区反应**：已有用户补充截图，但仍处于信息收集中。

- [#27843](https://github.com/google-gemini/gemini-cli/issues/27843) `Gemini CIL stopped responding during execution`（OPEN，0 评论）  
  **重要性**：执行中失去响应，属于命令链路稳定性问题，可能影响真实工作流。  
  **社区反应**：目前尚无评论，属于新冒出来的待确认故障。

- [#27787](https://github.com/google-gemini/gemini-cli/issues/27787) `fix(core): session_context should respect .gitignore and .geminiignore`（OPEN，1 评论）  
  **重要性**：关系到上下文注入是否会把不该进入模型的文件带入，直接影响**隐私、token 成本和上下文质量**。  
  **社区反应**：问题明确，属于高价值的核心行为修正。

- [#27789](https://github.com/google-gemini/gemini-cli/issues/27789) `gemini-3.5-flash is defined in Gemini CLI model configuration but is not available for selection or use`（OPEN，0 评论）  
  **重要性**：模型“配置里有、界面/命令里不可用”会显著影响用户对可用模型的信任。  
  **社区反应**：暂无评论，但属于模型支持/权限层面的高优先级问题。

- [#27838](https://github.com/google-gemini/gemini-cli/issues/27838) `Extension not listed in Gemini CLI gallery despite meeting all requirements`（OPEN，1 评论）  
  **重要性**：影响扩展生态曝光和分发，涉及 Gemini CLI 的插件市场/扩展目录可发现性。  
  **社区反应**：已有提交者说明本地验证通过，问题更像平台侧收录/索引异常。

- [#27786](https://github.com/google-gemini/gemini-cli/issues/27786) `Custom theme border.default/border.focused are documented but ignored`（OPEN，1 评论）  
  **重要性**：文档与实现不一致，会直接削弱主题系统可信度，影响可定制化体验。  
  **社区反应**：问题表述清晰，属于“文档承诺未兑现”的典型反馈。

- [#27840](https://github.com/google-gemini/gemini-cli/issues/27840) `gemini --version prints version twice with GEMINI_CLI_NO_RELAUNCH=1`（CLOSED，2 评论）  
  **重要性**：虽是表层输出问题，但暴露了启动/重拉起逻辑在特殊环境变量下的边界处理。  
  **社区反应**：讨论不多，已关闭，属于快速收敛的小修复。

- [#27837](https://github.com/google-gemini/gemini-cli/issues/27837) `CLI exits non-zero on settings.json with trailing comma`（CLOSED，2 评论）  
  **重要性**：配置容错能力不足会让用户在常见 JSON 格式错误上遭遇“非 0 退出 + 缺少清晰提示”。  
  **社区反应**：问题明确且已关闭，说明已进入修复/处理流程。

---

## 4. 重要 PR 进展

- [#27842](https://github.com/google-gemini/gemini-cli/pull/27842) `fix(core): never let shell exit results hang on the output drain (#25166)`（OPEN）  
  **内容**：修复 shell 命令已结束但 CLI 仍卡在“等待输入/输出刷新”的问题。  
  **价值**：直接提升命令执行可靠性，属于核心交互链路的高优先级修复。

- [#27839](https://github.com/google-gemini/gemini-cli/pull/27839) `fix(core): make read_background_output delay abort-aware`（OPEN）  
  **内容**：让后台输出读取在取消时真正响应 abort，避免 spinner 持续转动、提示队列堆积。  
  **价值**：改善取消语义与异步控制，减少“看似取消、实际未停”的体验问题。

- [#27827](https://github.com/google-gemini/gemini-cli/pull/27827) `chore(deps): bump zod from 3.25.76 to 4.4.3`（CLOSED）  
  **内容**：升级 schema/校验核心库。  
  **价值**：影响配置、输入校验与类型安全，是一次重要的基础依赖更新。

- [#27824](https://github.com/google-gemini/gemini-cli/pull/27824) `chore(deps): bump vitest from 3.2.4 to 4.1.8`（CLOSED）  
  **内容**：升级测试框架主版本。  
  **价值**：对测试体系和后续稳定性保障很关键，通常伴随较大兼容性调整。

- [#27828](https://github.com/google-gemini/gemini-cli/pull/27828) `chore(deps-dev): bump chrome-devtools-mcp from 0.19.0 to 1.1.1`（CLOSED）  
  **内容**：升级 Chrome DevTools MCP 相关依赖。  
  **价值**：涉及浏览器调试/自动化能力，属于开发者工具链的重要更新。

- [#27826](https://github.com/google-gemini/gemini-cli/pull/27826) `chore(deps): bump https-proxy-agent from 7.0.6 to 9.0.0`（CLOSED）  
  **内容**：更新 HTTPS 代理支持库。  
  **价值**：对代理环境、企业网络和连接稳定性有直接影响。

- [#27819](https://github.com/google-gemini/gemini-cli/pull/27819) `chore(deps): bump http-proxy-agent from 7.0.2 to 9.0.0`（CLOSED）  
  **内容**：同步升级 HTTP 代理支持库。  
  **价值**：与上一个 PR 形成配套，增强网络兼容性。

- [#27818](https://github.com/google-gemini/gemini-cli/pull/27818) `chore(deps-dev): bump eslint-plugin-react-hooks from 5.2.0 to 7.1.1`（CLOSED）  
  **内容**：升级前端/React Hooks 相关 lint 规则。  
  **价值**：提升代码规范一致性，减少潜在 Hook 使用错误。

- [#27831](https://github.com/google-gemini/gemini-cli/pull/27831) `chore(deps-dev): bump @vitest/coverage-v8 from 3.2.4 to 4.1.8`（CLOSED）  
  **内容**：升级覆盖率统计工具。  
  **价值**：支撑测试质量度量，属于测试基础设施维护。

- [#27833](https://github.com/google-gemini/gemini-cli/pull/27833) `chore(deps): bump comment-json from 4.2.5 to 5.0.0`（CLOSED）  
  **内容**：升级支持注释 JSON 的解析库。  
  **价值**：与配置解析链路相关，和近期 settings 解析类问题有一定关联。

---

## 5. 功能需求趋势

- **Agent 稳定性/响应性**：社区最集中地在反馈“thinking 卡住”“执行中无响应”“shell 结果挂起”等问题。  
  相关链接：[#27785](https://github.com/google-gemini/gemini-cli/issues/27785)、[#27836](https://github.com/google-gemini/gemini-cli/issues/27836)、[#27843](https://github.com/google-gemini/gemini-cli/issues/27843)

- **上下文控制与隐私边界**：用户希望 session_context 严格遵守忽略规则，避免无关或敏感文件进入模型上下文。  
  相关链接：[#27787](https://github.com/google-gemini/gemini-cli/issues/27787)

- **IDE/扩展生态可用性**：VS Code companion 的资源管理、扩展目录收录、生态曝光都在被持续关注。  
  相关链接：[#27790](https://github.com/google-gemini/gemini-cli/issues/27790)、[#27838](https://github.com/google-gemini/gemini-cli/issues/27838)

- **模型支持与可见性**：用户不仅关心“有没有模型”，更关心“能不能选到、能不能用”。  
  相关链接：[#27789](https://github.com/google-gemini/gemini-cli/issues/27789)

- **配置与主题系统的健壮性**：文档、实现和解析容错都被放大检视，尤其是 settings 和 theme 配置。  
  相关链接：[#27786](https://github.com/google-gemini/gemini-cli/issues/27786)、[#27837](https://github.com/google-gemini/gemini-cli/issues/27837)、[#27840](https://github.com/google-gemini/gemini-cli/issues/27840)

---

## 6. 开发者关注点

- **优先解决“卡住/无响应”类问题**：这是当前最影响口碑的故障类型，涉及 Agent 状态机、输出管道和取消逻辑。  
  相关链接：[#27785](https://github.com/google-gemini/gemini-cli/issues/27785)、[#27842](https://github.com/google-gemini/gemini-cli/pull/27842)、[#27839](https://github.com/google-gemini/gemini-cli/pull/27839)

- **提升错误可解释性**：用户希望看到的是“为什么失败”，而不是“直接退出/沉默无响应”。  
  相关链接：[#27837](https://github.com/google-gemini/gemini-cli/issues/27837)、[#27836](https://github.com/google-gemini/gemini-cli/issues/27836)

- **让上下文构建更可控**：严格遵守 `.gitignore` / `.geminiignore`，减少 token 浪费和隐私风险。  
  相关链接：[#27787](https://github.com/google-gemini/gemini-cli/issues/27787)

- **模型选择透明化**：配置中声明的模型应与实际可选/可用状态一致，避免“看得到、用不了”。  
  相关链接：[#27789](https://github.com/google-gemini/gemini-cli/issues/27789)

- **文档与实现一致性**：主题属性、扩展收录规则等说明要和实际行为对齐。  
  相关链接：[#27786](https://github.com/google-gemini/gemini-cli/issues/27786)、[#27838](https://github.com/google-gemini/gemini-cli/issues/27838)

如果你愿意，我可以把这份日报进一步整理成**适合公众号/内部周报的精简版**，或者输出成**Markdown 表格版**。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-06-11）

## 1) 今日速览
今天社区讨论仍以**稳定性回归**和**工作流可用性**为主：终端流式渲染错乱、Windows 崩溃、认证/会话异常等问题集中出现，说明 1.0.61 前后版本的体验稳定性仍是核心焦点。与此同时，**MCP、插件配置、IDE/会话集成**相关需求持续升温，用户对“更可控、更自动化、更少歧义”的 CLI 工作流期待明显增强。  
参考：[#3749](https://github.com/github/copilot-cli/issues/3749)、[#3745](https://github.com/github/copilot-cli/issues/3745)、[#3752](https://github.com/github/copilot-cli/issues/3752)

## 2) 版本发布
- **无新 Releases**  
  参考：[Releases](https://github.com/github/copilot-cli/releases)

## 3) 社区热点 Issues（10 个）
1. **[#3756](https://github.com/github/copilot-cli/issues/3756)** - 第三方 MCP Server 被组织 Copilot policy 禁用（已关闭）  
   重要性：直接阻断企业/团队使用第三方 MCP，是 MCP 落地的关键门槛。  
   社区反应：当天创建并关闭，且明确指向历史同类问题，说明这是高优先级阻塞项。

2. **[#3749](https://github.com/github/copilot-cli/issues/3749)** - 终端流式渲染输出错乱，字符重复/截断  
   重要性：影响最基础的 CLI 输出可信度，涉及“思考”和最终回答两段输出。  
   社区反应：**2 条评论、2 👍**，属于较明显的体验痛点。

3. **[#3755](https://github.com/github/copilot-cli/issues/3755)** - reasoning/thinking 流式文本重复、重叠、拼接错乱  
   重要性：影响实时可读性，尤其在开启 showReasoning 时更明显。  
   社区反应：虽评论不多，但问题描述具体，属于可复现性较强的 UI/渲染类缺陷。

4. **[#3745](https://github.com/github/copilot-cli/issues/3745)** - Windows 1.0.61 反复 0xC0000005 崩溃回归  
   重要性：这是典型的版本回归，且已影响到连续多次崩溃，直接影响可用性。  
   社区反应：问题严重但目前互动不多，属于“高危低噪音”故障。

5. **[#3747](https://github.com/github/copilot-cli/issues/3747)** - 触发 `WAITFOR DELAY` 后进入不可恢复超时状态  
   重要性：这是典型“poison pill”问题，会让模型/会话进入故障状态。  
   社区反应：已有 **1 👍**，说明社区对这类稳定性边界问题有共鸣。

6. **[#3742](https://github.com/github/copilot-cli/issues/3742)** - 嵌套目录下 `.github/copilot/settings.json` 无法覆盖 `enabledPlugins`  
   重要性：影响配置继承与工作区隔离，是团队级配置治理问题。  
   社区反应：当前讨论较少，但问题涉及版本回退，值得持续跟踪。

7. **[#3746](https://github.com/github/copilot-cli/issues/3746)** - 非交互/程序化使用时报“无认证信息”  
   重要性：影响自动化、脚本化、CI 场景，是 CLI 核心使用方式之一。  
   社区反应：尚无明显互动，但对开发者工作流影响大。

8. **[#3750](https://github.com/github/copilot-cli/issues/3750)** - 1.0.61 硬编码颜色破坏浅色主题  
   重要性：属于明显的 UI 回归，影响可读性与可访问性。  
   社区反应：虽然互动少，但截图证据直观，定位价值高。

9. **[#3740](https://github.com/github/copilot-cli/issues/3740)** - 从 VS Code Copilot Session 面板打开 CLI Chat 失败  
   重要性：直接影响 IDE 与 CLI 的联动，是“右侧会话面板”入口问题。  
   社区反应：属于高频工作流阻断，优先级应不低。

10. **[#3752](https://github.com/github/copilot-cli/issues/3752)** - MCP 工具调用需要更直接的 power-user shortcut  
    重要性：这是明确的效率诉求，反映用户希望减少 LLM 解释层、提升可控性。  
    社区反应：属于功能型需求，指向未来交互方式优化。

## 4) 重要 PR 进展
- **过去 24 小时无 PR 更新**，因此本日报暂无可列出的 PR 条目。  
  参考：[仓库 PR 列表](https://github.com/github/copilot-cli/pulls)

## 5) 功能需求趋势
- **MCP 能力增强与可控调用**：包括第三方 MCP 支持、工具直调语法、企业策略兼容性。  
  代表 Issue：[#3756](https://github.com/github/copilot-cli/issues/3756)、[#3752](https://github.com/github/copilot-cli/issues/3752)

- **终端渲染与实时输出稳定性**：流式输出、thinking/reasoning 显示、终端通知等基础体验仍是核心。  
  代表 Issue：[#3749](https://github.com/github/copilot-cli/issues/3749)、[#3755](https://github.com/github/copilot-cli/issues/3755)、[#3748](https://github.com/github/copilot-cli/issues/3748)

- **会话与工作流效率**：`--resume`、会话面板、agent/skills 交互都在追求更少操作、更好键盘流。  
  代表 Issue：[#3754](https://github.com/github/copilot-cli/issues/3754)、[#3740](https://github.com/github/copilot-cli/issues/3740)、[#3751](https://github.com/github/copilot-cli/issues/3751)

- **配置继承与插件治理**：本地 `.github/copilot/settings.json`、enabledPlugins、skills 目录发现性等问题，反映出多层配置的复杂性。  
  代表 Issue：[#3742](https://github.com/github/copilot-cli/issues/3742)、[#3739](https://github.com/github/copilot-cli/issues/3739)、[#3741](https://github.com/github/copilot-cli/issues/3741)

- **模型稳定性与资源消耗**：不同模型在 OOM、超时、毒性输入上的表现差异，说明模型选择和容错机制仍需加强。  
  代表 Issue：[#3744](https://github.com/github/copilot-cli/issues/3744)、[#3747](https://github.com/github/copilot-cli/issues/3747)

## 6) 开发者关注点
- **回归问题优先级高**：1.0.61 相关的 Windows 崩溃、配色异常、渲染错乱，说明发布后回归监控很关键。  
  参考：[#3745](https://github.com/github/copilot-cli/issues/3745)、[#3750](https://github.com/github/copilot-cli/issues/3750)、[#3749](https://github.com/github/copilot-cli/issues/3749)

- **CLI 必须稳定服务自动化场景**：非交互认证、会话恢复、错误退出码都在影响脚本/CI 用户。  
  参考：[#3746](https://github.com/github/copilot-cli/issues/3746)、[#3754](https://github.com/github/copilot-cli/issues/3754)

- **MCP/插件是下一阶段重点**：用户不仅要“能用”，还要“可控、可解释、可组合”。  
  参考：[#3756](https://github.com/github/copilot-cli/issues/3756)、[#3752](https://github.com/github/copilot-cli/issues/3752)、[#3742](https://github.com/github/copilot-cli/issues/3742)

- **键盘优先与无障碍体验被持续强调**：箭头导航、鼠标选择、列表滚动位置等细节，直接影响专业用户效率。  
  参考：[#3743](https://github.com/github/copilot-cli/issues/3743)、[#3751](https://github.com/github/copilot-cli/issues/3751)、[#3741](https://github.com/github/copilot-cli/issues/3741)

- **模型输出的可读性与可信度是底线**：流式文本错乱会放大用户对“AI 不稳定”的感知。  
  参考：[#3749](https://github.com/github/copilot-cli/issues/3749)、[#3755](https://github.com/github/copilot-cli/issues/3755)

如果你愿意，我还可以把这份日报再整理成**“管理层摘要版”**或**“研发跟踪表格版”**。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-06-11）

## 1) 今日速览
今天社区更新以 **Bug 反馈** 为主，新增/更新的两个 Issue 都集中在 agent 执行链路的可靠性问题：一个是 **yolo 模式仍然弹出审批**，另一个是 **最后一个 Todo 无法完成**。  
PR 方面仅有 1 个已关闭修复，聚焦于 **reasoning_content 的空内容回传兼容性**，说明项目近期仍在持续打磨对话/推理消息的协议一致性。

---

## 2) 社区热点 Issues

> 本日仅有 2 条更新中的 Issue，且均为高相关性的运行时 Bug，建议重点关注。

### 1. [#2448] Kimi CLI 在 yolo 模式下仍会要求审批
- 链接：<https://github.com/MoonshotAI/kimi-cli/issues/2448>
- 状态：OPEN
- 关键词：`yolo mode`、`approval`、`权限控制`、`agent 自动化`
- 为什么重要：
  - 直接影响 **自动执行模式** 的核心体验；yolo 模式如果仍频繁弹窗审批，会削弱“无人值守执行”的价值。
  - 这类问题通常涉及 **权限策略、工具调用拦截、会话状态机** 等底层逻辑，修复优先级高。
- 社区反应：
  - 当前 **0 评论、0 👍**，说明还处于早期暴露阶段，但问题本身对核心用户路径影响较大，值得尽快排查。

### 2. [#2447] 最后一个 Todo 项目永远无法完成
- 链接：<https://github.com/MoonshotAI/kimi-cli/issues/2447>
- 状态：OPEN
- 关键词：`Todo`、`任务收敛`、`agent 循环`、`执行完成判定`
- 为什么重要：
  - 这会影响任务流的 **最终收敛**，属于 agent 工作流中最关键的“结束条件”问题。
  - 如果最后一项一直无法完成，可能导致 **死循环、状态不一致、任务面板卡住**，直接影响可靠性。
- 社区反应：
  - 同样 **0 评论、0 👍**，但从问题描述看更像是稳定性缺陷，建议结合 yolo 模式问题一起排查，可能共享同一套状态/完成判定逻辑。

---

## 3) 重要 PR 进展

> 本日仅有 1 条 PR 更新，且已关闭。

### 1. [#2446] fix(kosong): round-trip empty reasoning content
- 链接：<https://github.com/MoonshotAI/kimi-cli/pull/2446>
- 状态：CLOSED
- 主要内容：
  - 在存在 `ThinkPart` 的情况下，即使文本为空，也保留 `reasoning_content`。
  - 对于从未包含 reasoning content 的消息，不再补写 `reasoning_content`。
  - 同步修复 Kimi 与 OpenAI legacy provider 的转换路径，保证行为一致。
- 价值判断：
  - 这是一次 **协议/数据结构兼容性修复**，对消息转换、上下游 provider 互通很关键。
  - 附带回归测试，说明修复是面向生产稳定性的，能降低推理链路中“空 reasoning”引发的格式漂移问题。
- 社区反馈：
  - 当前未见明显讨论热度，但从修复面看属于底层质量改进，值得纳入后续版本验证范围。

---

## 4) 功能需求趋势

从本日全部 Issue 来看，社区关注点明显集中在以下方向：

1. **Agent 自动化与审批机制**
   - yolo 模式是否真正“无审批”执行，是用户对 CLI 自动化能力的核心诉求。
   - 说明社区希望减少人工确认，提升批量任务和无人值守场景效率。

2. **任务流收敛与 Todo 执行可靠性**
   - “最后一个 Todo 不完成”暴露出 agent 任务管理的收尾逻辑问题。
   - 用户关注的不只是“能做”，更是“能正确结束”。

3. **消息/推理协议兼容性**
   - PR 反映出 reasoning content 的空值回传、provider 转换一致性仍是重点。
   - 说明社区对 **模型输出格式稳定性** 和 **多 provider 兼容** 非常敏感。

4. **跨环境稳定性**
   - Issue 中出现 Debian、API key / moonshot.ai 两类使用方式，说明问题并非单一环境特有。
   - 社区更期待 CLI 在不同平台、不同订阅/接入方式下表现一致。

---

## 5) 开发者关注点

今天开发者最需要关注的痛点可以概括为三类：

- **权限逻辑异常**
  - yolo 模式仍触发审批，可能是工具调用拦截、策略判断或会话状态恢复有误。
  - 建议优先检查审批开关与执行上下文的传递链路。

- **任务完成判定缺陷**
  - Todo 最后一项无法完成，通常意味着状态机、计划执行器或完成条件判断存在边界问题。
  - 这类问题会显著影响 agent 的可信度和可用性。

- **provider 兼容性与消息结构一致性**
  - `reasoning_content` 的 round-trip 问题表明，消息转换层仍需强化对空值、缺字段、legacy 路径的兼容处理。
  - 对于多模型、多 provider 场景，这是稳定性基础。

---

如需，我可以把这份日报进一步整理成：
- **适合发群/发邮件的精简版**
- **适合内部周报的分析版**
- **带“风险等级/优先级”的运维跟踪版**

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-06-11）

## 1) 今日速览
OpenCode 今天的动态核心仍然围绕 **稳定性修复、工具链正确性、以及模型/协议兼容性** 展开：一方面，桌面端崩溃、远程配置失效、超大仓库卡死等问题被快速修补；另一方面，社区对 V1/V2 工具行为一致性、ACP 集成、以及各类模型提供商适配提出了大量改进需求。  
从 Issue/PR 结构看，今天的讨论明显偏向 **“让 OpenCode 在更多环境里可用且可预测”**，而不是单纯增加新功能。  
链接：<https://github.com/anomalyco/opencode>

---

## 2) 版本发布

### v1.17.3
- 修复 **1.17.2 桌面端崩溃** 问题，属于紧急热修。  
链接：<https://github.com/anomalyco/opencode/releases/tag/v1.17.3>

### v1.17.2
- Core：
  - 远程配置鉴权过期后，改为提示重新登录，而不是直接加载失败。
  - 恢复 subagent 使用各自权限配置的能力。
- Desktop：
  - 修复 Linux 启动器与图标标识，避免固定应用启动异常。  
链接：<https://github.com/anomalyco/opencode/releases/tag/v1.17.2>

### v1.17.1
- Core：
  - References 支持带 usage 描述，可在新文档中展示，并可在 `@` 自动补全中隐藏。
  - 旧配置键 `reference` 继续兼容新键 `references`。  
链接：<https://github.com/anomalyco/opencode/releases/tag/v1.17.1>

---

## 3) 社区热点 Issues（10 个）

> 说明：以下优先选择 **评论数更高、影响面更广、或直接暴露产品风险** 的问题。

1. **#31747 fff 扫描在 Home 目录含 OneDrive File Provider 树时超时**  
   - 重要性：直接影响启动/会话初始化，属于高影响的性能与兼容性问题。  
   - 社区反应：**4 条评论**，且已关闭，说明有人快速定位并跟进。  
   链接：<https://github.com/anomalyco/opencode/issues/31747>

2. **#31789 背景 subagent 完成后触发无限重分发循环**  
   - 重要性：会造成任务调度失控，属于典型的流程级 bug。  
   - 社区反应：**2 条评论**，已关闭，说明问题被确认并修复节奏较快。  
   链接：<https://github.com/anomalyco/opencode/issues/31789>

3. **#31774 V1 shell 工具缺少破坏性命令保护**  
   - 重要性：安全风险最高之一，`rm -rf /` 这类命令可直接执行。  
   - 社区反应：**2 条评论**，仍在讨论中，说明安全边界是强需求。  
   链接：<https://github.com/anomalyco/opencode/issues/31774>

4. **#31772 V1 工具错误被 Effect.orDie 静默吞掉**  
   - 重要性：AI 看不到工具错误会导致诊断、重试和自修复能力下降。  
   - 社区反应：**2 条评论**，开放状态，属于底层可观测性问题。  
   链接：<https://github.com/anomalyco/opencode/issues/31772>

5. **#31757 context 达到上限后，provider 返回空输出导致无限重试**  
   - 重要性：会让会话卡死并持续重试，属于稳定性问题。  
   - 社区反应：**2 条评论**，已关闭，说明已被快速修正。  
   链接：<https://github.com/anomalyco/opencode/issues/31757>

6. **#31797 超大仓库中 session 因 snapshot git add --all 挂死**  
   - 重要性：对大型 monorepo/Chromium 这类用户是致命性能瓶颈。  
   - 社区反应：**1 条评论**，已关闭，但影响面很大。  
   链接：<https://github.com/anomalyco/opencode/issues/31797>

7. **#31791 question tool UI 不支持拖拽/粘贴图片**  
   - 重要性：直接影响多模态问答体验，尤其是截图协作场景。  
   - 社区反应：**2 条评论**，开放状态，属于明显的交互补强需求。  
   链接：<https://github.com/anomalyco/opencode/issues/31791>

8. **#31776 V1 apply_patch 会静默覆盖外部文件变更**  
   - 重要性：属于数据一致性风险，可能引入不可见的代码丢失。  
   - 社区反应：**1 条评论**，开放状态，开发者关注度较高。  
   链接：<https://github.com/anomalyco/opencode/issues/31776>

9. **#31766 LM Studio 动态模型发现 URL 拼接错误（double /v1）**  
   - 重要性：本地 OpenAI-compatible 生态用户会直接无法拉取模型列表。  
   - 社区反应：**1 条评论**，已关闭，说明兼容性问题已被确认。  
   链接：<https://github.com/anomalyco/opencode/issues/31766>

10. **#31812 xfyun 引擎 busy 时不重试**  
   - 重要性：对国内 provider 的可靠性影响直接，属于请求重试策略问题。  
   - 社区反应：**1 条评论**，开放中，且已带 `needs:compliance` 标签，说明进入修复流程。  
   链接：<https://github.com/anomalyco/opencode/issues/31812>

---

## 4) 重要 PR 进展（10 个）

1. **#31798 修复超大仓库 snapshot 卡顿：复用源 git objects，避免重新 hash**  
   - 价值：直接解决 #31797 的核心性能瓶颈。  
   链接：<https://github.com/anomalyco/opencode/pull/31798>

2. **#31799 修复命令行参数错误时只打印 help，不提示 usage 错误**  
   - 价值：提升 CLI 可用性，减少“用户不知道哪里错了”的困扰。  
   链接：<https://github.com/anomalyco/opencode/pull/31799>

3. **#31809 修正 Write/Edit 工具说明中“必须先 Read”的误导性描述**  
   - 价值：减少模型被错误提示误导，提升工具链可信度。  
   链接：<https://github.com/anomalyco/opencode/pull/31809>

4. **#31808 处理 `decodeDataUrl` 中非编码 `%` 导致的 URIError**  
   - 价值：修复数据 URL 解析脆弱点，增强输入健壮性。  
   链接：<https://github.com/anomalyco/opencode/pull/31808>

5. **#31806 移除 shell timeout 中未文档化的 +100ms buffer**  
   - 价值：统一超时语义，避免用户配置与实际行为不一致。  
   链接：<https://github.com/anomalyco/opencode/pull/31806>

6. **#31805 修复 TUI scoped shutdown 时退出尾声(epilogue)被清掉的问题**  
   - 价值：改善退出体验，避免用户看不到 session 结束信息。  
   链接：<https://github.com/anomalyco/opencode/pull/31805>

7. **#31802 MCP 认证与调试时保留自定义 headers**  
   - 价值：增强 MCP 兼容性，利于 OAuth 与调试流程。  
   链接：<https://github.com/anomalyco/opencode/pull/31802>

8. **#31783 ACP 的 edit 权限请求中补上 diff content block**  
   - 价值：修复 ACP 客户端无法正确展示 diff 审批内容的问题。  
   链接：<https://github.com/anomalyco/opencode/pull/31783>

9. **#31794 处理非 base64 data URL 的错误百分号编码**  
   - 价值：和 #31808 同类，属于输入解析层的稳定性增强。  
   链接：<https://github.com/anomalyco/opencode/pull/31794>

10. **#31760 为 opencode provider 的 smallOptions() 补充支持**  
    - 价值：修复自动 session title 生成在特定 provider 下失效的问题。  
    链接：<https://github.com/anomalyco/opencode/pull/31760>

---

## 5) 功能需求趋势

### 1. 工具链安全性与正确性
社区对 V1/V2 工具的一致性、错误透传、stale content 检查、安全命令保护的要求很高。  
代表性 Issues：  
- <https://github.com/anomalyco/opencode/issues/31774>  
- <https://github.com/anomalyco/opencode/issues/31772>  
- <https://github.com/anomalyco/opencode/issues/31776>  
- <https://github.com/anomalyco/opencode/issues/31768>

### 2. 大仓库与性能优化
超大仓库初始化、snapshot、文件树扫描、缓存失效等问题反复出现，说明 OpenCode 在企业级 monorepo 场景下的性能仍是重点。  
代表性 Issues：  
- <https://github.com/anomalyco/opencode/issues/31797>  
- <https://github.com/anomalyco/opencode/issues/31747>  
- <https://github.com/anomalyco/opencode/issues/31804>

### 3. 模型提供商兼容性持续扩展
GitLab Duo、Bedrock、LM Studio、MiniMax、xfyun、OpenAI-compatible 网关等适配需求密集，说明社区正把 OpenCode 用在更复杂的多 provider 环境中。  
代表性 Issues：  
- <https://github.com/anomalyco/opencode/issues/31782>  
- <https://github.com/anomalyco/opencode/issues/31766>  
- <https://github.com/anomalyco/opencode/issues/31749>  
- <https://github.com/anomalyco/opencode/issues/31812>  
- <https://github.com/anomalyco/opencode/issues/31755>

### 4. ACP / 协议层集成更细化
用户不仅要“能接”，还要求 session 级别模型选择、权限请求 payload、headers 透传等更精细的控制。  
代表性 Issues：  
- <https://github.com/anomalyco/opencode/issues/31750>  
- <https://github.com/anomalyco/opencode/issues/31781>  
- <https://github.com/anomalyco/opencode/issues/31783>

### 5. 多模态与交互体验增强
图片拖拽/粘贴、会话恢复 banner、文件树缓存等需求表明，用户正在把 OpenCode 作为日常工作台而非纯命令行工具。  
代表性 Issues：  
- <https://github.com/anomalyco/opencode/issues/31791>  
- <https://github.com/anomalyco/opencode/issues/31813>  
- <https://github.com/anomalyco/opencode/issues/31804>

---

## 6) 开发者关注点

1. **错误必须可见、可诊断**  
   静默吞错、无限重试、只打印 help 不提示根因，这类问题都在削弱 AI 工具的“可调试性”。  
   相关链接：<https://github.com/anomalyco/opencode/issues/31772>、<https://github.com/anomalyco/opencode/issues/31757>、<https://github.com/anomalyco/opencode/pull/31799>

2. **工具行为描述要与真实实现一致**  
   文档/提示词里的误导会直接影响模型决策，社区对 Write/Edit/Shell 的说明一致性非常敏感。  
   相关链接：<https://github.com/anomalyco/opencode/issues/31768>、<https://github.com/anomalyco/opencode/pull/31809>

3. **安全边界要求更严格**  
   尤其是 shell、patch、编辑工具，用户希望默认具备破坏性命令保护与 stale 检测。  
   相关链接：<https://github.com/anomalyco/opencode/issues/31774>、<https://github.com/anomalyco/opencode/issues/31776>

4. **跨平台兼容性仍是高频痛点**  
   Linux 启动器、Windows 编码、macOS Unicode、容器里的 xdg-open、OneDrive 文件树，说明平台差异仍会持续影响体验。  
   相关链接：<https://github.com/anomalyco/opencode/issues/31747>、<https://github.com/anomalyco/opencode/issues/31765>、<https://github.com/anomalyco/opencode/issues/31786>、<https://github.com/anomalyco/opencode/issues/31815>

5. **多 provider/多协议接入需要更稳的兼容层**  
   社区不只在追求“支持”，更在追求“各家都能稳定跑”。  
   相关链接：<https://github.com/anomalyco/opencode/issues/31766>、<https://github.com/anomalyco/opencode/issues/31812>、<https://github.com/anomalyco/opencode/issues/31749>、<https://github.com/anomalyco/opencode/issues/31782>

6. **更强的会话与子代理编排能力**  
   /goal、subagent 权限、后台任务 attach、会话恢复等诉求都表明，OpenCode 正在向更自治的 Agent 工作流演进。  
   相关链接：<https://github.com/anomalyco/opencode/issues/31762>、<https://github.com/anomalyco/opencode/issues/31789>、<https://github.com/anomalyco/opencode/issues/31813>

---

如果你希望，我还可以把这份日报进一步整理成：
1. **适合发群的超短版**，或  
2. **带“风险等级/优先级”标注的管理层版**。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报（2026-06-11）

## 1) 今日速览
今天的社区讨论几乎全部集中在**稳定性修复、流式协议兼容、TUI 崩溃修复和成本/计费准确性**四条主线上，且大量问题已在当天闭环，说明维护节奏较快。与此同时，社区也在持续推动**新模型/新平台接入**（如 Palantir Foundry、Bedrock、Codex）和**开发者可用性**增强（如 RPC、扩展事件、登录体验）。

## 2) 版本发布
**无新 Releases。**

---

## 3) 社区热点 Issues（精选 10 条）

> 说明：本日更新 Issue 共 22 条，以下挑选最值得关注的 10 条。多数 Issue 已关闭，体现出“提报—修复—合并”的处理效率较高；评论数普遍不高，但问题描述较明确、可复现性强。

1. **[#5611 GitLab Duo Anthropic streams hit observed ~90s cutoff before message_stop](https://github.com/badlogic/pi-mono/issues/5611)**  
   - **重要性**：暴露了 Anthropic 流式结束条件与 retry 机制的冲突，可能导致完整对话被重复重试，直接影响稳定性与成本。  
   - **社区反应**：3 条评论，属于本日讨论度最高的 Issue 之一；已关闭，说明修复优先级较高。

2. **[#5612 Switching models mid-session (DeepSeek V4 → Kimi K2.6) causes Connection error and tool-calling stops](https://github.com/badlogic/pi-mono/issues/5612)**  
   - **重要性**：涉及会话中切换模型后的连接错误和工具调用失效，属于核心交互链路问题。  
   - **社区反应**：虽仅 1 条评论，但这是典型的“高影响、低噪音”故障场景，尤其影响长会话用户。

3. **[#5601 [bug] [GHC] Trying to login to ghc subscription fails with unhelpful error](https://github.com/badlogic/pi-mono/issues/5601)**  
   - **重要性**：登录/订阅流程失败且报错不友好，直接影响新用户接入与订阅转化。  
   - **社区反应**：3 条评论，说明该问题在真实用户路径上有明确痛点；已关闭。

4. **[#5605 MiniMax-M3: cache_control ignored on Anthropic endpoint (full input billing); broken thinking on openai-completions](https://github.com/badlogic/pi-mono/issues/5605)**  
   - **重要性**：同时涉及**缓存失效导致成本翻倍**和**推理模式异常**，属于“功能正确性 + 计费准确性”的双重问题。  
   - **社区反应**：2 条评论；已关闭，显示开发侧已快速处理。

5. **[#5592 [bug] Anthropic streams wait for transport EOF after message_stop](https://github.com/badlogic/pi-mono/issues/5592)**  
   - **重要性**：流式协议结束条件处理不当，会导致响应迟迟不结束，影响延迟、连接释放和后续请求。  
   - **社区反应**：2 条评论；该 Issue 也直接对应了后续 PR 修复，属于典型“问题—修复”闭环。

6. **[#5591 Fable 5: Anthropic stop_reason: "refusal" surfaces as bare "Error: Unknown error", discarding the refusal explanation](https://github.com/badlogic/pi-mono/issues/5591)**  
   - **重要性**：模型明确拒答时，Pi 却丢失了原始拒答说明，属于可观测性与错误语义损失问题。  
   - **社区反应**：当前 0 评论但为 OPEN，值得持续跟踪；对排障和合规场景都很关键。

7. **[#5604 [pi-tui] WorkflowEditor crash: TypeError: value.startsWith is not a function](https://github.com/badlogic/pi-mono/issues/5604)**  
   - **重要性**：这是会直接终止进程的 TUI 硬崩溃，影响极大。  
   - **社区反应**：1 条评论，问题定位清晰；已关闭，说明已纳入高优先级修复。

8. **[#5599 Bug: getTextOutput crashes when result.content is undefined](https://github.com/badlogic/pi-mono/issues/5599)**  
   - **重要性**：通用渲染链路崩溃，且触发条件是内容字段缺失，说明对边界数据的防御不足。  
   - **社区反应**：1 条评论；已关闭，属于基础健壮性补丁。

9. **[#5607 Startup 'Update Available' banner recommends `pi update` even on installs that can't self-update](https://github.com/badlogic/pi-mono/issues/5607)**  
   - **重要性**：更新提示误导用户执行不可用命令，会制造“更新失败”的假问题。  
   - **社区反应**：1 条评论；已关闭，属于体验型修复，但影响面广。

10. **[#5606 RPC mode: missing clear_queue command?](https://github.com/badlogic/pi-mono/issues/5606)**  
   - **重要性**：RPC 模式缺少清队列能力，限制了自动化和外部集成的可控性。  
   - **社区反应**：1 条评论；已关闭，体现 SDK/RPC 可用性在继续补齐。

---

## 4) 重要 PR 进展（本日更新 8 条）

> 说明：今日更新 PR 共 8 条，以下为全部重点项。整体趋势是：**把 Issue 快速转化为修复 PR，并集中补齐流式、TUI、Bedrock、登录体验等关键链路**。

1. **[#5609 feat(providers): add Palantir Foundry LLM proxy and OAuth provider](https://github.com/badlogic/pi-mono/pull/5609)**  
   - 新增 Palantir Foundry LLM 代理与 OAuth Provider，补齐企业代理接入能力。

2. **[#5600 fix(ai): honor Codex SSE header timeout setting](https://github.com/badlogic/pi-mono/pull/5600)**  
   - 修复 Codex SSE 头部等待超时硬编码问题，使 timeout 配置真正生效。

3. **[#5594 Fix Anthropic stream finalization on message_stop](https://github.com/badlogic/pi-mono/pull/5594)**  
   - 修复 Anthropic 流在 `message_stop` 时的结束逻辑，直接对应 #5592 的问题。

4. **[#5589 fix(tui): stabilize overlay compositing at wide char boundary](https://github.com/badlogic/pi-mono/pull/5589)**  
   - 修复宽字符边界上的 overlay 叠加偏移问题，提升 CJK/TUI 排版稳定性。

5. **[#5587 feat(coding-agent): add experimental first-time setup flow](https://github.com/badlogic/pi-mono/pull/5587)**  
   - 增加首次启动引导流程，面向新用户的配置与分析授权体验更完整。

6. **[#5586 fix(ai/bedrock): use resolved apiKey as a bearer-token fallback](https://github.com/badlogic/pi-mono/pull/5586)**  
   - 修复 Bedrock 认证优先级问题，让 `models.json` 中的 apiKey 可作为 bearer token 回退。

7. **[#5585 fix(tui): wrap CJK text at character boundaries in editor](https://github.com/badlogic/pi-mono/pull/5585)**  
   - 修复编辑器中 CJK 文本换行边界错误，改善多语言输入体验。

8. **[#5583 fix(coding-agent): preserve clickable subscription login URLs](https://github.com/badlogic/pi-mono/pull/5583)**  
   - 修复订阅登录 URL 因左侧 padding 被断开的问题，提升可点击性与登录成功率。

---

## 5) 功能需求趋势
从今天的 Issues 看，社区最关注的功能方向主要集中在：

- **模型/Provider 扩展**：Palantir Foundry、Bedrock、MiniMax、GitLab Duo、DeepSeek/Kimi 切换等，说明用户对“多模型、多代理、多企业网关”兼容要求很高。  
- **流式协议与长连接稳定性**：Anthropic/Codex 等 SSE 流结束条件、header timeout、message_stop 处理，仍是高频问题。  
- **TUI/编辑器体验与崩溃修复**：宽字符、CJK、overlay、自动补全、粘贴行为等问题说明 TUI 仍是核心交互面。  
- **计费与缓存准确性**：cache_control、prompt-cache writes、maxTokens 等问题反映社区对成本可控性非常敏感。  
- **可扩展性与集成能力**：RPC 的清队列、扩展事件、登录流程优化，体现开发者对自动化与插件化能力的需求持续上升。  
- **新手引导与可用性**：更新提示、自助登录、首次设置等“入口体验”被持续打磨。

---

## 6) 开发者关注点
今天开发者反馈的高频痛点可归纳为以下几类：

- **“看似成功，实际失败” 的隐性错误**：例如 Anthropic 流提前结束、拒答信息丢失、登录后给出不友好错误。  
- **边界数据导致的硬崩溃**：`undefined`、非字符串 `value`、宽字符边界、空内容渲染等问题反复出现，说明渲染层需要更强的防御式编程。  
- **多模型/多协议兼容复杂度上升**：不同 provider 的 SSE、超时、缓存、认证差异在快速累积，平台需要更统一的抽象层。  
- **成本与计费透明性**：缓存计费、token 上限、输入/输出价格映射是开发者和企业用户都非常在意的部分。  
- **插件化与自动化诉求增强**：RPC、extension event、clear_queue 等需求表明 Pi 正在从“交互式工具”走向“可编排平台”。  
- **本地化与多语言体验**：CJK 换行、宽字符对齐、Termux 粘贴等问题说明国际化使用场景正在增多。

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合 Slack/飞书推送的短版**，或  
2. **适合周报的分析版**（附趋势判断与优先级建议）。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# 2026-06-11 Qwen Code 社区动态日报

## 1. 今日速览
过去 24 小时没有新 Release，但社区讨论和提交都很活跃，焦点主要集中在 **CLI 交互稳定性**、**MCP 工具兼容性**、**上下文/内存管理** 以及 **后台子代理审批流**。  
同时，Web Shell 与 Daemon 侧也有多项体验优化在推进；此外，夜间版发布流程出现了一次失败（#4978），说明 CI/CD 仍需持续关注。

## 2. 社区热点 Issues

1. **[#4973](https://github.com/QwenLM/qwen-code/issues/4973)** — terminal drops to cooked mode（P1）  
   这是最严重的交互故障之一：最后一个 `ink useInput` 失活后，终端会退回 cooked mode，导致输入“全部失效直到回车”。问题直接阻断 CLI 使用，优先级最高，说明修复诉求非常明确。

2. **[#4942](https://github.com/QwenLM/qwen-code/issues/4942)** — VP mode 下滚动输入与 Composer 冲突（P2，4 条评论）  
   Virtualized History 模式里，聊天历史滚动和 Composer 输入无法共存，影响最常见的响应后浏览场景。评论数最多，说明这是一个高频、可复现的核心体验问题。

3. **[#4974](https://github.com/QwenLM/qwen-code/issues/4974)** — SGR mouse wheel 序列泄漏成输入文本（P2，2 条评论）  
   鼠标滚轮事件被双重消费，部分终端字节序列会“漏进输入框”。这类问题会直接破坏交互可信度，也和 #4942 一起指向终端事件管线的稳定性问题。

4. **[#4966](https://github.com/QwenLM/qwen-code/issues/4966)** — SchemaValidator 缺少 numeric string coercion，导致 MCP 工具失败（P2，2 条评论）  
   LLM 经常把数字参数写成字符串，严格的 MCP server 会因此报错。这个问题很典型，反映出模型输出与工具 schema 之间仍需更强的兼容层。

5. **[#4964](https://github.com/QwenLM/qwen-code/issues/4964)** — max_tokens 截断后的恢复能力不足（P2，2 条评论）  
   用户希望系统能从“上一次因 token 上限被截断”的状态中恢复，而不是直接失败。对长输出、长工具链和复杂任务场景都很关键。

6. **[#4976](https://github.com/QwenLM/qwen-code/issues/4976)** — 自动生成的 memory 干扰正常 CLI 调用（P2，2 条评论）  
   用户反馈 memory 机制开始“反向干扰”工具调用，说明记忆/上下文自动注入已经影响到主流程。这个问题对生产使用者尤其敏感。

7. **[#4930](https://github.com/QwenLM/qwen-code/issues/4930)** — `env` 被误纳入只读命令白名单，存在任意命令执行风险（P1，已关闭，1 条评论）  
   这是本期最值得警惕的安全问题之一。虽然已关闭，但它暴露出 shell allowlist 的边界需要更严格的审计和测试。

8. **[#4941](https://github.com/QwenLM/qwen-code/issues/4941)** — QWEN.md 长度告警应随模型上下文窗口缩放（P2，in-review，2 条评论）  
   社区在推动更“智能”的上下文治理：不是简单限制文件大小，而是根据模型上下文窗口动态提示。反映出用户对上下文管理可解释性的需求很强。

9. **[#4928](https://github.com/QwenLM/qwen-code/issues/4928)** — 后台 subagent 遇到权限请求不应直接 auto-deny，应回传父会话排队审批（P2，2 条评论）  
   这是后台自动化可用性的关键需求。用户希望 background agent 能“继续工作但等待审批”，而不是因交互确认直接被否决。

10. **[#4951](https://github.com/QwenLM/qwen-code/issues/4951)** — statusline 中的 in/out tokens 统计是否准确（P3，2 条评论）  
    虽然是提问型 issue，但它暴露出用户对 token 计量和上下文消耗的强烈关注。说明可观测性和计费/消耗感知仍是重要痛点。

## 3. 重要 PR 进展

1. **[#4979](https://github.com/QwenLM/qwen-code/pull/4979)** — 修复批准后恢复 tool call 时的 teammate 身份丢失  
   解决协作场景中的消息归属问题：当批准恢复工具调用后，消息会正确归因到原 teammate，而不是 leader。

2. **[#4971](https://github.com/QwenLM/qwen-code/pull/4971)** — 减少交互式工具输出的常驻内存  
   针对大体积工具输出的显示数据做压缩和裁剪，降低 CLI、聊天记录和子代理摘要的内存占用。

3. **[#4970](https://github.com/QwenLM/qwen-code/pull/4970)** — 稳定 truncated tool retry 的 key 计算  
   让重试跟踪忽略用户可见错误信息里附加的截断提示，避免同一 schema 错误被误判成不同错误。

4. **[#4967](https://github.com/QwenLM/qwen-code/pull/4967)** — MCP 工具参数支持 numeric string 自动转型  
   为 `SchemaValidator` 补齐 `"3" -> 3` 的数值字符串 coercion，提升对模型输出格式的容错能力。

5. **[#4965](https://github.com/QwenLM/qwen-code/pull/4965)** — 新增 `POST /workspace/reload`，统一热重载 settings  
   Daemon 侧支持一次性热重载全部设置，替代更窄的 env reload 路径，适合多会话和统一配置变更。

6. **[#4963](https://github.com/QwenLM/qwen-code/pull/4963)** — 默认启用 fork subagents  
   将 fork subagent 从实验性开关变成默认可用能力，降低后台工作流的使用门槛。

7. **[#4959](https://github.com/QwenLM/qwen-code/pull/4959)** — 修复 VP scroll 在 idle prompt 下的可用性与 viewport 高度  
   为 Virtual Viewport 相关交互补齐按键判定和布局修正，是 #4942 一类问题的重要配套修复。

8. **[#4954](https://github.com/QwenLM/qwen-code/pull/4954)** — Daemon 模式下按 session 隔离统计数据  
   修正 `/session/:id/stats` 返回全局累加的问题，改为真正的会话级指标隔离。

9. **[#4961](https://github.com/QwenLM/qwen-code/pull/4961)** — 通过 MCP 为 `qwen serve` 提供 A2UI 界面能力  
   为 Web 客户端引入 A2UI surface 的桥接与 action endpoint，是服务端交互能力的重要扩展。

10. **[#4977](https://github.com/QwenLM/qwen-code/pull/4977)** — Web Shell 将 thinking 输出折叠为 5 行窗口  
    改善长思考流的可读性，避免界面被推得过长，同时保留展开/折叠能力，属于高频 UX 优化。

## 4. 功能需求趋势

从本期 Issues 来看，社区最关注的方向主要有 5 个：

- **终端交互稳定性**：raw mode、鼠标滚轮、VP/Composer 共存、按键映射等问题集中爆发，说明 CLI 交互链路仍是核心战场。  
- **MCP 兼容性与容错**：包括数字字符串转型、schema 校验、allowed/denied policy 等，用户希望工具调用更“像生产系统”。  
- **上下文与 token 管理**：QWEN.md 告警、token 统计、截断恢复、hard/auto threshold 等问题反复出现。  
- **后台子代理与自动化审批**：社区希望 subagent 能默认可用，并支持“审批上浮/排队”，而不是直接失败。  
- **安全与 shell 边界**：`env` 白名单、Linux/SSH 下复制能力等问题，显示出远程/受限环境里的安全与可用性仍是重点。

## 5. 开发者关注点

- **交互层脆弱点多**：终端 raw mode、mouse tracking、viewport 的边界问题频繁出现，建议优先补强端到端交互测试。  
- **工具调用需要更强容错**：模型输出格式不稳定是常态，MCP/SchemaValidator 需要继续向“宽进严出”演进。  
- **上下文治理必须可解释**：用户不仅关心“能不能跑”，也关心“为什么 token 这么快涨、什么时候会 compaction”。  
- **后台自动化的审批体验仍不顺**：用户希望 subagent 可以继续排队等待，而不是因为交互确认被动中断。  
- **内存与输出留存要控住**：大工具输出、thinking 流、history 记录都在放大资源压力，减存储和限展示会成为持续主题。  
- **跨环境兼容性仍需加强**：SSH/Linux、无图形依赖、不同终端特性下的可用性，是实际落地时的高频痛点。

如果你愿意，我可以把这份日报进一步整理成 **更适合公众号/Slack 发布的精简版**，或输出为 **Markdown 表格版**。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# 2026-06-11 DeepSeek TUI / CodeWhale 社区动态日报

## 1) 今日速览
- 过去 24 小时内，项目进入明显的 **CodeWhale 重命名与迁移期**：v0.8.57 进一步确认新项目名、命令名与 npm 包名为 CodeWhale，旧的 `deepseek-tui` / `deepseek` 线路正式进入弃用阶段。  
  相关链接：[# 发布页 v0.8.57](https://github.com/Hmbown/CodeWhale/releases/tag/v0.8.57)
- 社区讨论重心集中在 **多模型/多 provider 兼容性、TUI 性能与交互体验、以及 headless 自动化能力** 三条主线，且大量 v0.8.58 相关 PR 已开始铺开。  
  相关链接：[# Issues 总览](https://github.com/Hmbown/CodeWhale/issues) / [# PR 总览](https://github.com/Hmbown/CodeWhale/pulls)

## 2) 版本发布
### v0.8.57
- 核心变化是 **项目品牌正式切换到 CodeWhale**：canonical project、command、npm package、release asset 全部统一为 CodeWhale。
- 对旧用户明确给出迁移指引：`deepseek-tui` 旧包后续不再继续发布，建议按 `docs/REBRAND.md` 迁移。  
  链接：[# v0.8.57](https://github.com/Hmbown/CodeWhale/releases/tag/v0.8.57)

### v0.8.56
- 本次 release 标题为 **Community Harvest**，重点聚焦：
  - localization
  - providers
  - prefix-cache stability
  - fixes
- 说明项目近期在“社区反馈回收 + 稳定性修复”上持续推进。  
  链接：[# v0.8.56](https://github.com/Hmbown/CodeWhale/releases/tag/v0.8.56)

---

## 3) 社区热点 Issues
> 说明：以下优先选择“评论较多、影响面较大、或被标记为 release-blocker/高优先级”的议题。

1. **#3007 [bug] provider rejection 误指向用户未传入的 `--provider`**
   - 重要性：这类错误会直接误导用户排查方向，尤其当 provider 来自 config/env 时，诊断体验很差。
   - 社区反应：已有 2 条评论，说明这是个立即可复现、且值得快速修正的交互问题。  
   链接：[#3007](https://github.com/Hmbown/CodeWhale/issues/3007)

2. **#3004 [enhancement] api_key 支持脚本动态获取**
   - 重要性：直击安全与 dotfiles 管理痛点，避免明文写入 `config.toml` / `.env`。
   - 社区反应：2 条评论，属于典型“高实用性、低争议”的配置增强需求。  
   链接：[#3004](https://github.com/Hmbown/CodeWhale/issues/3004)

3. **#3019 [bug, enhancement] Codex/Responses client 可靠性与重试补齐**
   - 重要性：OpenAI Codex 通道目前被指出缺少与其他 provider 同级的重试/backoff 保护，影响稳定性与并行能力。
   - 社区反应：已被直接拉到 v0.8.58 轨道，说明问题已上升为路线级修复。  
   链接：[#3019](https://github.com/Hmbown/CodeWhale/issues/3019)

4. **#3012 [enhancement] 自动加载全局 `~/.codewhale/instructions.md`**
   - 重要性：对多项目用户很关键，可作为跨项目默认上下文层。
   - 社区反应：1 条评论，表明需求明确但仍在方案讨论阶段。  
   链接：[#3012](https://github.com/Hmbown/CodeWhale/issues/3012)

5. **#2990 [bug] 电脑睡眠后流式响应中断**
   - 重要性：会导致当前 turn 丢失，属于“工作流中断型”问题。
   - 社区反应：1 条评论，说明这是一个单点但高影响的运行时稳定性 bug。  
   链接：[#2990](https://github.com/Hmbown/CodeWhale/issues/2990)

6. **#2989 [bug] Ollama + qwen3-coder:30b 任务提前结束却显示 completed**
   - 重要性：状态机与实际执行结果不一致，容易误导自动化任务判断。
   - 社区反应：1 条评论，代表社区已识别到“假完成”风险。  
   链接：[#2989](https://github.com/Hmbown/CodeWhale/issues/2989)

7. **#2988 [question] 各发布渠道是否已在 v0.8.54 后暂停同步？**
   - 重要性：反映出 npm / crates / GitHub Releases 的版本不同步问题，直接影响安装与升级预期。
   - 社区反应：1 条评论，属于典型的发布链路透明度诉求。  
   链接：[#2988](https://github.com/Hmbown/CodeWhale/issues/2988)

8. **#2983 [enhancement] 保守并行执行只读工具**
   - 重要性：如果落地，会显著改善多工具调用的吞吐和响应时间，属于 Agent 效率优化核心项。
   - 社区反应：1 条评论，需求方向清晰，技术收益高。  
   链接：[#2983](https://github.com/Hmbown/CodeWhale/issues/2983)

9. **#2982 [enhancement] busy / free 状态展示不清晰**
   - 重要性：直接关系到 TUI 的可用性，用户很难判断任务是否在运行。
   - 社区反应：1 条评论，典型的交互可感知性问题。  
   链接：[#2982](https://github.com/Hmbown/CodeWhale/issues/2982)

10. **#3033 [bug, release-blocker] 多 subagent 并发下 TUI 冻结**
   - 重要性：被标记为 release-blocker，说明这是发布前必须解决的核心稳定性问题。
   - 社区反应：目前暂无评论，但优先级极高，说明问题重要性已无需“社区发酵”即可成立。  
   链接：[#3033](https://github.com/Hmbown/CodeWhale/issues/3033)

---

## 4) 重要 PR 进展
> 说明：以下优先选择“直接对应热点 Issue、覆盖关键能力面、或对下一版本影响较大”的 PR。

1. **#3052 feat(config): verbosity 支持 normal / concise**
   - 作用：减少 agent 反复提示和模式宣告，提升非交互模式下的可读性。  
   链接：[#3052](https://github.com/Hmbown/CodeWhale/pull/3052)

2. **#3051 feat(voice): 新增 `/voice` 语音转文字输入**
   - 作用：把语音输入接入现有 composer，属于明显的交互增强。  
   链接：[#3051](https://github.com/Hmbown/CodeWhale/pull/3051)

3. **#3050 fix(reasoning): Atlascloud / Moonshot / Ollama 的 reasoning-effort 贯通**
   - 作用：修复“用户切换 thinking 但 wire 上无变化”的静默失效问题。  
   链接：[#3050](https://github.com/Hmbown/CodeWhale/pull/3050)

4. **#3049 feat(hooks): JSON decision contract + glob matcher + project-local hooks**
   - 作用：把 hooks 从“硬拒绝”提升到“决策层”，增强可编排性与可移植性。  
   链接：[#3049](https://github.com/Hmbown/CodeWhale/pull/3049)

5. **#3048 feat(prompts): 参数化模型事实**
   - 作用：修正 constitution prompt 中硬编码 DeepSeek V4 假设，提升多模型适配能力。  
   链接：[#3048](https://github.com/Hmbown/CodeWhale/pull/3048)

6. **#3047 fix(providers): Moonshot/OpenAI/Atlascloud/Ollama 改为模型驱动 capability lookup**
   - 作用：修正 provider 能力矩阵与真实模型能力不一致的问题。  
   链接：[#3047](https://github.com/Hmbown/CodeWhale/pull/3047)

7. **#3046 fix(reasoning): Moonshot/Kimi reasoning-content 支持补齐**
   - 作用：让 Kimi/Moonshot 的 thinking trace 正确进入 Thinking block。  
   链接：[#3046](https://github.com/Hmbown/CodeWhale/pull/3046)

8. **#3045 fix(subagent): 子代理模型校验不再硬编码 DeepSeek**
   - 作用：开放非 DeepSeek provider 使用自有 model id 的能力。  
   链接：[#3045](https://github.com/Hmbown/CodeWhale/pull/3045)

9. **#3042 feat(exec): `--allowed-tools` / `--disallowed-tools` / `--max-turns` / `--append-system-prompt`**
   - 作用：补齐 `codewhale exec` 的脚本化与 CI/无人值守能力。  
   链接：[#3042](https://github.com/Hmbown/CodeWhale/pull/3042)

10. **#3040 feat(tui): sidebar 行可点击**
   - 作用：增强 Tasks/Agents 面板的鼠标交互，提升 TUI 可操作性。  
   链接：[#3040](https://github.com/Hmbown/CodeWhale/pull/3040)

---

## 5) 功能需求趋势
从近 24 小时 Issues 看，社区最关注的方向主要有 5 类：

1. **多模型 / 多 provider 兼容性**
   - 代表议题：#3019、#3023、#3024、#3025、#3016、#3018、#3046、#3047、#3045  
   - 趋势判断：社区正在从“只支持 DeepSeek”转向“真正的 all-model harness”。

2. **TUI 交互与可见性优化**
   - 代表议题：#2982、#3031、#3030、#3029、#3028、#3032、#3033  
   - 趋势判断：用户很在意“状态是否清楚、信息是否冗余、界面是否卡顿”。

3. **性能与并发稳定性**
   - 代表议题：#2983、#2990、#3033、#3035  
   - 趋势判断：随着 subagent 与工具调用增多，UI redraw、流式连接、并发调度成为关键瓶颈。

4. **Headless / 自动化 / CI 能力**
   - 代表议题：#3027、#3021、#3022、#3042、#3044  
   - 趋势判断：`exec` 正在从“辅助命令”向“自动化执行底座”演进。

5. **配置、安全与可迁移性**
   - 代表议题：#3004、#3012、#2985、#3013  
   - 趋势判断：用户希望 secrets 更安全、默认配置更合理、旧版本迁移更平滑。

---

## 6) 开发者关注点
从反馈密度和议题走向看，开发者当前最需要重点关注以下痛点：

- **错误信息要指向真正原因，而不是误导用户**
  - 典型问题：provider rejection、子代理模型错误、工具不可用错误。  
  - 代表 Issue：[#3007](https://github.com/Hmbown/CodeWhale/issues/3007)、[#3020](https://github.com/Hmbown/CodeWhale/issues/3020)

- **多 provider 的行为不能“看起来支持，实际上静默失效”**
  - 典型问题：reasoning-effort、thinking block、model capability、context window。  
  - 代表 Issue：[#3024](https://github.com/Hmbown/CodeWhale/issues/3024)、[#3023](https://github.com/Hmbown/CodeWhale/issues/3023)、[#3016](https://github.com/Hmbown/CodeWhale/issues/3016)

- **TUI 要在高并发 subagent 场景下保持可用**
  - 典型问题：冻结、渲染阻塞、busy 状态不清晰、日志过载。  
  - 代表 Issue：[#3033](https://github.com/Hmbown/CodeWhale/issues/3033)、[#2982](https://github.com/Hmbown/CodeWhale/issues/2982)、[#3031](https://github.com/Hmbown/CodeWhale/issues/3031)

- **自动化执行需要更强的参数化与安全边界**
  - 典型问题：allowed/disallowed tools、turn cap、system prompt append、hooks 决策模型。  
  - 代表 PR：[#3042](https://github.com/Hmbown/CodeWhale/pull/3042)、[#3049](https://github.com/Hmbown/CodeWhale/pull/3049)

- **迁移与发布体系要更透明**
  - 典型问题：旧包弃用、渠道版本不同步、release flow 与 main 分支不同步。  
  - 代表 Issue：[#2988](https://github.com/Hmbown/CodeWhale/issues/2988)、[#2985](https://github.com/Hmbown/CodeWhale/issues/2985)、[#3013](https://github.com/Hmbown/CodeWhale/pull/3013)

如果你愿意，我也可以把这份日报再整理成 **“适合发 Slack / 飞书群的短版”**，或生成 **表格版** 方便直接贴到周报里。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*